"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 Checkbox
 * @author jinzhan <jinzhan@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('radio')();

var _default = _san["default"].defineComponent({
  template: "\n        <label\n            class=\"{{classes}}\"\n            on-mouseenter=\"handleMouseEnter\"\n            on-mouseleave=\"handleMouseLeave\"\n        >\n            <span class=\"{{inputWrapClasses}}\">\n                <input\n                    name=\"{{name}}\"\n                    type=\"{{type}}\"\n                    class=\"{{prefixCls}}-input\"\n                    readonly=\"{{readOnly}}\"\n                    disabled=\"{{disabled}}\"\n                    tabindex=\"{{tabIndex}}\"\n                    on-click=\"handleClick\"\n                    on-focus=\"handleFocus\"\n                    on-blur=\"handleBlur\"\n                    on-change=\"handleChange\"\n                    autofocus=\"{{autoFocus}}\"\n                    s-ref=\"input\"\n                    value=\"{{value}}\"\n                />\n                <span class=\"{{prefixCls}}-inner\" />\n            </span>\n            <span s-if=\"hasSlot\"><slot /></span>\n        </label>\n    ",
  dataTypes: {
    checked: _san.DataTypes.bool,
    disabled: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      // 这里写入prefixCls,因为groupbutton里需要重写该样式
      prefixCls: prefixCls,
      type: 'radio',
      defaultChecked: false
    };
  },
  inited: function inited() {
    this.data.set('checked', this.data.get('checked') || this.data.get('defaultChecked'));
    this.data.set('hasSlot', !!this.sourceSlots.noname);
  },
  attached: function attached() {
    this.dispatch('santd_radio_add', this);
  },
  computed: {
    classes: function classes() {
      var checked = this.data.get('checked');
      var disabled = this.data.get('disabled');
      var prefixCls = this.data.get('prefixCls');
      var classArr = ["".concat(prefixCls, "-wrapper")];
      checked && classArr.push("".concat(prefixCls, "-wrapper-checked"));
      disabled && classArr.push("".concat(prefixCls, "-wrapper-disabled"));
      return classArr;
    },
    inputWrapClasses: function inputWrapClasses() {
      var checked = this.data.get('checked');
      var disabled = this.data.get('disabled');
      var prefixCls = this.data.get('prefixCls');
      var classArr = [prefixCls];
      checked && classArr.push("".concat(prefixCls, "-checked"));
      disabled && classArr.push("".concat(prefixCls, "-disabled"));
      return classArr;
    }
  },
  handleChange: function handleChange(e) {
    if (this.data.get('disabled')) {
      return;
    }

    this.data.set('checked', e.target.checked);
    this.dispatch('santd_radio_toggleOption', {
      value: this.data.get('value'),
      event: e
    });
  },
  handleClick: function handleClick(e) {
    this.fire('click', e);
  },
  handleBlur: function handleBlur(e) {
    this.fire('blur', e);
  },
  handleFocus: function handleFocus(e) {
    this.fire('focus', e);
  },
  handleMouseEnter: function handleMouseEnter(e) {
    this.fire('mouseenter', e);
  },
  handleMouseLeave: function handleMouseLeave(e) {
    this.fire('mouseleave', e);
  },
  focus: function focus() {
    this.ref('input').focus();
  },
  blur: function blur() {
    this.ref('input').blur();
  }
});

exports["default"] = _default;