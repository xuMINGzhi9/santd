"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _arraytreefilter = _interopRequireDefault(require("./arraytreefilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd cascader menus file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  initData: function initData() {
    return {
      options: [],
      value: [],
      activeValue: [],
      prefixCls: 'cascader-menus',
      visible: false,
      expandTrigger: 'click',
      test: []
    };
  },
  inited: function inited() {
    this.data.set('fieldNames', this.data.get('fieldNames') || this.data.get('defaultFieldNames') || []);
  },
  computed: {
    getActiveOptions: function getActiveOptions() {
      var activeValue = this.data.get('activeValue');
      var options = this.data.get('options');
      var fieldNames = this.data.get('fieldNames');
      return (0, _arraytreefilter["default"])(options, function (o, level) {
        return o[fieldNames.value] === activeValue[level];
      }, {
        childrenKeyName: fieldNames.children
      });
    },
    getShowOptions: function getShowOptions() {
      var options = this.data.get('options');
      var fieldNames = this.data.get('fieldNames');
      var result = this.data.get('getActiveOptions') || [];
      result = result.map(function (activeOption) {
        return activeOption[fieldNames.children];
      }).filter(function (activeOption) {
        return !!activeOption;
      });
      result.unshift(options);
      return result;
    }
  },
  updated: function updated() {
    var _this = this;

    var options = this.data.get('getShowOptions');
    options.forEach(function (option, index) {
      option.forEach(function (item, subIndex) {
        var ref = _this.ref('option' + index + '-' + subIndex);

        ref.className = _this.getMenuItemClass(item, index);
      });
    });
  },
  getFieldName: function getFieldName(name) {
    var fieldNames = this.data.get('fieldNames');
    return fieldNames[name];
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
  getLabel: function getLabel(option, label) {
    return option[this.getFieldName(label)];
  },
  isActiveOption: function isActiveOption(option, menuIndex) {
    var activeValue = this.data.get('activeValue') || [];
    return activeValue[menuIndex] === option[this.getFieldName('value')];
  },
  getMenuItemClass: function getMenuItemClass(option, index) {
    var prefixCls = this.data.get('prefixCls');
    var hasChildren = option[this.getFieldName('children')] && option[this.getFieldName('children')].length > 0;
    var classArr = ["".concat(prefixCls, "-menu-item")];
    (hasChildren || option.isLeaf === false) && classArr.push("".concat(prefixCls, "-menu-item-expand"));
    this.isActiveOption(option, index) && classArr.push("".concat(prefixCls, "-menu-item-active"));
    option.disabled && classArr.push("".concat(prefixCls, "-menu-item-disabled"));
    option.loading && classArr.push("".concat(prefixCls, "-menu-item-loading"));
    return classArr.join(' ');
  },
  getExpandIconNode: function getExpandIconNode(option) {
    var hasChildren = option[this.getFieldName('children')] && option[this.getFieldName('children')].length > 0;

    if ((hasChildren || option.isLeaf === false) && !option.loading) {
      return true;
    }

    return false;
  },
  handleClick: function handleClick(e, option, index) {
    this.dispatch('santd_cascader_menuClick', {
      option: option,
      index: index,
      e: e
    });
  },
  handleMouseEnter: function handleMouseEnter(e, option, index) {
    var expandTrigger = this.data.get('expandTrigger');
    var hasChildren = option[this.getFieldName('children')] && option[this.getFieldName('children')].length > 0;

    if (expandTrigger === 'hover' && (hasChildren || option.isLeaf === false)) {
      this.delayHandleSelect(true, e, option, index);
    }
  },
  handleMouseLeave: function handleMouseLeave(e, option, index) {
    var expandTrigger = this.data.get('expandTrigger');
    var hasChildren = option[this.getFieldName('children')] && option[this.getFieldName('children')].length > 0;

    if (expandTrigger === 'hover' && (hasChildren || option.isLeaf === false)) {
      this.delayHandleSelect();
    }
  },
  delayHandleSelect: function delayHandleSelect(isEnter, e, option, index) {
    var _this3 = this;

    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }

    if (isEnter) {
      this.delayTimer = setTimeout(function () {
        _this3.handleClick(e, option, index);

        _this3.delayTimer = null;
      }, 150);
    }
  },
  template: "<div>\n        <ul\n            s-for=\"options, index in getShowOptions\"\n            class=\"{{prefixCls}}-menu\"\n            key=\"{{index}}\"\n            role=\"menuitem\"\n            style=\"{{dropdownMenuColumnStyle}}\"\n        >\n            <li\n                s-for=\"option, subIndex in options\"\n                key=\"{{getLabel(option, 'value')}}\"\n                class=\"{{getMenuItemClass(options, index)}}\"\n                on-click=\"handleClick($event, option, index)\"\n                on-mouseenter=\"handleMouseEnter($event, option, index)\"\n                on-mouseleave=\"handleMouseLeave($event, option, index)\"\n                s-ref=\"option{{index}}-{{subIndex}}\"\n            >\n                {{getLabel(option, 'label') | raw}}\n                <span class=\"{{prefixCls}}-menu-item-expand-icon\" s-if=\"getExpandIconNode(option)\">{{expandIcon}}</span>\n            </li>\n        </ul>\n    </div>"
});

exports["default"] = _default;