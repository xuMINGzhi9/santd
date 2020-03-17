"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _index = _interopRequireDefault(require("../../core/trigger/index"));

var _placements = _interopRequireDefault(require("./placements"));

var _menus = _interopRequireDefault(require("./menus"));

var _util = require("../../core/util");

var _arraytreefilter = _interopRequireDefault(require("./arraytreefilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd cascader source file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('cascader')();

var _default = _san["default"].defineComponent({
  initData: function initData() {
    return {
      popupAlign: {},
      disabled: false,
      placement: 'bottomLeft',
      builtinPlacements: _placements["default"],
      expandTrigger: 'click',
      trigger: 'click',
      fieldNames: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      expandIcon: '>'
    };
  },
  inited: function inited() {
    var _this = this;

    this.data.set('activeValue', this.data.set('value') || this.data.get('defaultValue') || []);
    this.watch('popupVisible', function (val) {
      if (val) {
        var value = _this.data.get('value');

        value && _this.data.set('activeValue', value);
      }
    });
  },
  computed: {
    popupVisible: function popupVisible() {
      var disabled = this.data.get('disabled');
      return disabled ? false : this.data.get('visible');
    }
  },
  getFieldName: function getFieldName(name) {
    var fieldNames = this.data.get('fieldNames');
    var defaultFieldNames = this.data.get('defaultFieldNames');
    return fieldNames[name] || defaultFieldNames[name];
  },
  getActiveOptions: function getActiveOptions(values) {
    var _this2 = this;

    var activeValue = values || this.data.get('activeValue');
    var options = this.data.get('options');
    return (0, _arraytreefilter["default"])(options, function (o, level) {
      return o[_this2.getFieldName('value')] === activeValue[level];
    }, {
      childrenKeyName: this.getFieldName('children')
    });
  },
  setPopupVisible: function setPopupVisible(visible) {
    this.data.set('popupVisible', visible);
    this.fire('visibleChange', visible);

    if (visible && !this.data.get('popupVisible')) {
      this.data.set('activeValue', this.data.get('value'));
    }
  },
  handleChange: function handleChange(options, props, e) {
    var _this3 = this;

    if (e.type !== 'keydown') {
      this.fire('change', {
        value: options.map(function (o) {
          return o[_this3.getFieldName('value')];
        }),
        selectedOptions: options
      });
      this.setPopupVisible(props.visible);
    }
  },
  handleMenuSelect: function handleMenuSelect(targetOption, menuIndex, e) {
    var _this$data$get = this.data.get(),
        changeOnSelect = _this$data$get.changeOnSelect,
        loadData = _this$data$get.loadData,
        expandTrigger = _this$data$get.expandTrigger;

    if (!targetOption || targetOption.disabled) {
      return;
    }

    var activeValue = this.data.get('activeValue');
    activeValue = activeValue.slice(0, menuIndex + 1);
    activeValue[menuIndex] = targetOption[this.getFieldName('value')];
    var activeOptions = this.getActiveOptions(activeValue);

    if (targetOption.isLeaf === false && !targetOption[this.getFieldName('children')] && loadData) {
      if (changeOnSelect) {
        this.handleChange(activeOptions, {
          visible: true
        }, e);
      }

      this.data.set('activeValue', activeValue);
      loadData(activeOptions);
      return;
    }

    var children = targetOption[this.getFieldName('children')];

    if (!children || !children.length) {
      this.handleChange(activeOptions, {
        visible: false
      }, e);
    } else if (changeOnSelect && (e.type === 'click' || e.type === 'keydown')) {
      if (expandTrigger === 'hover') {
        this.handleChange(activeOptions, {
          visible: false
        }, e);
      } else {
        this.handleChange(activeOptions, {
          visible: true
        }, e);
      }
    }

    this.data.set('activeValue', activeValue);
  },
  messages: {
    santd_cascader_menuClick: function santd_cascader_menuClick(payload) {
      this.handleMenuSelect(payload.value.option, payload.value.index, payload.value.e);
    }
  },
  handleVisibleChange: function handleVisibleChange(visible) {
    this.fire('visibleChange', visible);
  },
  components: {
    's-trigger': _index["default"],
    's-menus': _menus["default"]
  },
  template: "<span>\n        <s-trigger\n            prefixCls=\"".concat(prefixCls, "-menus\"\n            builtinPlacements=\"{{builtinPlacements}}\"\n            popupPlacement=\"{{placement}}\"\n            popupAlign=\"{{popupAlign}}\"\n            popupTransitionName=\"{{transitionName}}\"\n            defaultPopupVisible=\"{{defaultVisible}}\"\n            getPopupContainer=\"{{getPopupContainer}}\"\n            mouseEnterDelay=\"{{mouseEnterDelay}}\"\n            mouseLeaveDelay=\"{{mouseLeaveDelay}}\"\n            popupClassName=\"{{overlayClassName}}\"\n            popupStyle=\"{{overlayStyle}}\"\n            action=\"{{disabled ? [] : trigger}}\"\n            visible=\"{{popupVisible}}\"\n            on-visibleChange=\"handleVisibleChange\"\n        >\n            <slot />\n            <s-menus slot=\"popup\"\n                prefixCls=\"{{rootPrefixCls}}\"\n                options=\"{{options || []}}\"\n                fieldNames=\"{{fieldNames}}\"\n                defaultFieldNames=\"{{defaultFieldNames}}\"\n                activeValue=\"{{activeValue}}\"\n                visible=\"{{visible}}\"\n                expandIcon=\"{{expandIcon}}\"\n                expandTrigger=\"{{expandTrigger}}\"\n                dropdownMenuColumnStyle=\"{{dropdownMenuColumnStyle}}\"\n            />\n        </s-trigger>\n    </span>")
});

exports["default"] = _default;