"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _todayButton = _interopRequireDefault(require("./todayButton"));

var _okButton = _interopRequireDefault(require("./okButton"));

var _timepickerButton = _interopRequireDefault(require("./timepickerButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd calendar footer file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  dataTypes: {
    prefixCls: _san.DataTypes.string,
    showDateInput: _san.DataTypes.bool,
    disabledDate: _san.DataTypes.func,
    disabledTime: _san.DataTypes.func,
    selectedValue: _san.DataTypes.object,
    value: _san.DataTypes.object,
    mode: _san.DataTypes.string,
    defaultValue: _san.DataTypes.object
  },
  components: {
    's-todaybutton': _todayButton["default"],
    's-okbutton': _okButton["default"],
    's-timepickerbutton': _timepickerButton["default"]
  },
  handleOk: function handleOk() {
    this.fire('ok');
  },
  handleToday: function handleToday() {
    this.fire('today');
  },
  handleCloseTimePicker: function handleCloseTimePicker() {
    this.fire('closeTimePicker');
  },
  handleOpenTimePicker: function handleOpenTimePicker() {
    this.fire('openTimePicker');
  },
  template: "\n        <div class=\"{{prefixCls}}-footer {{showTime ? prefixCls + '-footer-show-ok' : ''}}\">\n            <span\n                s-if=\"showToday || showTime || hasExtraFooter\"\n                class=\"{{prefixCls}}-footer-btn\"\n            >\n                <slot name=\"renderExtraFooter\" />\n                <s-todaybutton\n                    prefixCls=\"{{prefixCls}}\"\n                    value=\"{{value}}\"\n                    s-if=\"showToday\"\n                    locale=\"{{locale}}\"\n                    disabledDate=\"{{disabledDate}}\"\n                    disabledTime=\"{{disabledTime}}\"\n                    on-today=\"handleToday\"\n                />\n                <s-timepickerbutton\n                    s-if=\"showTime\"\n                    locale=\"{{locale}}\"\n                    prefixCls=\"{{prefixCls}}\"\n                    showTimePicker=\"{{showTimePicker}}\"\n                    disabledDate=\"{{disabledDate}}\"\n                    disabledTime=\"{{disabledTime}}\"\n                    on-closeTimePicker=\"handleCloseTimePicker\"\n                    on-openTimePicker=\"handleOpenTimePicker\"\n                />\n                <s-okbutton\n                    prefixCls=\"{{prefixCls}}\"\n                    s-if=\"showTime\"\n                    locale=\"{{locale}}\"\n                    disabled=\"{{disabled}}\"\n                    on-ok=\"handleOk\"\n                />\n            </span>\n        </div>\n    "
});

exports["default"] = _default;