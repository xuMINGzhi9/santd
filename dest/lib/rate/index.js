"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

var _util = require("../core/util");

var _dom = require("../core/util/dom");

var _icon = _interopRequireDefault(require("../icon"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _star = _interopRequireDefault(require("./star"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 rate
 * @author panming <panming@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('rate')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    disabled: _san.DataTypes.bool,
    value: _san.DataTypes.number,
    // 传入组件的值，受控
    defaultValue: _san.DataTypes.number,
    // 传入组件的默认值
    count: _san.DataTypes.number,
    // 星星的个数
    allowHalf: _san.DataTypes.bool,
    // 半星
    allowClear: _san.DataTypes.bool,
    // 点击和当前相同的分数时清空评分
    character: _san.DataTypes.any,
    // 显示的内容
    tabIndex: _san.DataTypes.number,
    autoFocus: _san.DataTypes.bool
  },
  components: {
    's-star': _star["default"],
    's-icon': _icon["default"],
    's-tooltip': _tooltip["default"]
  },
  initData: function initData() {
    return {
      disabled: false,
      allowClear: true,
      autoFocus: false,
      allowHalf: false,
      value: undefined,
      focused: false,
      cleanedValue: null,
      hoverValue: undefined,
      defaultValue: 0,
      count: 5,
      starsProps: [],
      sValue: undefined,
      // 组件内维护的分数值
      characterIsString: false
    };
  },
  inited: function inited() {
    var data = this.data;
    var value = data.get('value') === undefined ? data.get('defaultValue') : data.get('value');
    data.set('value', value);
    data.set('sValue', value);
  },
  attached: function attached() {
    var _this = this;

    var hasSlot = Boolean(this.slot('character')[0] && this.slot('character')[0].children.length);

    if (!hasSlot) {
      this.data.set('characterIsString', true);
    }

    this.nextTick(function () {
      if (_this.data.get('autoFocus') && !_this.data.get('disabled')) {
        _this.focus();
      }
    });
  },
  computed: {
    starsProps: function starsProps() {
      var data = this.data;
      var hoverValue = data.get('hoverValue');
      var sValue = data.get('sValue') || data.get('value');
      var starsProps = [];

      for (var i = 0; i < data.get('count'); i++) {
        var starProps = {
          index: i,
          disabled: false,
          allowHalf: true,
          value: hoverValue === undefined ? sValue : hoverValue,
          focused: data.get('focused'),
          ref: "stars".concat(i)
        };
        starsProps.push(starProps);
      }

      return starsProps;
    }
  },
  onHover: function onHover(event) {
    if (this.data.get('disabled')) {
      return;
    }

    var hoverValue = this.getStarValue(event.starIndex, event.pageX);
    var cleanedValue = this.data.get('cleanedValue');

    if (hoverValue !== cleanedValue) {
      this.data.set('hoverValue', hoverValue);
      this.data.set('cleanedValue', null);
    }

    this.fire('hoverChange', hoverValue);
  },
  onMouseLeave: function onMouseLeave() {
    if (this.data.get('disabled')) {
      return;
    }

    this.data.set('hoverValue', undefined);
    this.data.set('cleanedValue', null);
    this.fire('hoverChange', undefined);
  },
  onClick: function onClick(event) {
    if (this.data.get('disabled')) {
      return;
    }

    var value = this.getStarValue(event.starIndex, event.pageX);
    var isReset = false;

    if (this.data.get('allowClear')) {
      isReset = value === this.data.get('sValue');
    }

    this.onMouseLeave();
    this.changeValue(isReset ? 0 : value, event);
    this.data.set('cleanedValue', isReset ? value : null);
  },
  onFocus: function onFocus() {
    if (this.data.get('disabled')) {
      return;
    }

    this.data.set('focused', true);
    this.fire('focus');
  },
  onBlur: function onBlur() {
    if (this.data.get('disabled')) {
      return;
    }

    this.data.set('focused', false);
    this.fire('blur');
  },
  onKeyDown: function onKeyDown(event) {
    if (this.data.get('disabled')) {
      return;
    }

    var count = this.count,
        allowHalf = this.allowHalf;
    var sValue = this.data.get('sValue');

    if (event.keyCode === _keyCode["default"].RIGHT && sValue < count) {
      if (allowHalf) {
        sValue += 0.5;
      } else {
        sValue += 1;
      }

      this.changeValue(sValue, event);
      event.preventDefault();
    } else if (event.keyCode === _keyCode["default"].LEFT && sValue > 0) {
      if (allowHalf) {
        sValue -= 0.5;
      } else {
        sValue -= 1;
      }

      this.changeValue(sValue, event);
      event.preventDefault();
    }

    this.fire('keydown', event);
  },
  getStarDOM: function getStarDOM(index) {
    return this.ref("stars".concat(index)).el;
  },
  getStarValue: function getStarValue(index, x) {
    var value = +index + 1;

    if (this.data.get('allowHalf')) {
      var starEle = this.getStarDOM(index);
      var leftDis = (0, _dom.getOffset)(starEle).left;
      var width = starEle.clientWidth;

      if (x - leftDis < width / 2) {
        value -= 0.5;
      }
    }

    return value;
  },
  focus: function focus() {
    if (!this.data.get('disabled')) {
      this.el.focus();
    }
  },
  blur: function blur() {
    if (!this.data.get('disabled')) {
      this.el.blur();
    }
  },
  changeValue: function changeValue(value, e) {
    this.data.set('sValue', value);
    this.data.set('value', value);
    this.fire('change', value);
    this.dispatch('UI:form-item-interact', {
      fieldValue: value,
      type: 'change',
      e: e
    });
  },
  template: "\n        <ul\n            class=\"".concat(prefixCls, "{{disabled ? ' ").concat(prefixCls, "-disabled' : ''}}\"\n            on-mouseleave=\"onMouseLeave\"\n            tabIndex=\"{{tabIndex}}\"\n            on-focus=\"onFocus\"\n            on-blur=\"onBlur\"\n            on-keydown=\"onKeyDown\"\n        >\n            <template s-for=\"props, index in starsProps\">\n                <s-tooltip title=\"{{tooltips[index]}}\" s-if=\"{{tooltips}}\">\n                    <s-star\n                        s-ref=\"{{props.ref}}\"\n                        index=\"{{props.index}}\"\n                        focused=\"{{props.focused}}\"\n                        value=\"{{props.value}}\"\n                        on-hover=\"onHover\"\n                        on-click=\"onClick\"\n                        character=\"{{character}}\"\n                        characterIsString=\"{{characterIsString}}\"\n                    >\n                        <template s-if=\"characterIsString && character\" slot=\"starCharacter\">\n                            {{character}}\n                        </template>\n                        <template s-else-if=\"!characterIsString\" slot=\"starCharacter\">\n                            <slot name=\"character\" />\n                        </template>\n                        <s-icon type=\"star\" theme=\"filled\" s-else=\"!character\" slot=\"starCharacter\" />\n                    </s-star>\n                </s-tooltip>\n                <s-star\n                    s-else\n                    s-ref=\"{{props.ref}}\"\n                    index=\"{{props.index}}\"\n                    focused=\"{{props.focused}}\"\n                    value=\"{{props.value}}\"\n                    on-hover=\"onHover\"\n                    on-click=\"onClick\"\n                    character=\"{{character}}\"\n                    characterIsString=\"{{characterIsString}}\"\n                >\n                    <template s-if=\"{{characterIsString && character}}\" slot=\"starCharacter\">\n                        {{character}}\n                    </template>\n                    <template s-else-if=\"{{!characterIsString}}\" slot=\"starCharacter\">\n                        <slot name=\"character\" />\n                    </template>\n                    <s-icon type=\"star\" theme=\"filled\" s-else=\"!character\" slot=\"starCharacter\" />\n                </s-star>\n            </template>\n        </ul>\n    ")
});

exports["default"] = _default;