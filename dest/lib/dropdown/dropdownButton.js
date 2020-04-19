"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file DropdownButton button按钮控制dropdown
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('dropdown-button')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    type: _san.DataTypes.string,
    htmlType: _san.DataTypes.string,
    disabled: _san.DataTypes.bool,
    icon: _san.DataTypes.string,
    href: _san.DataTypes.string
  },
  components: {
    's-dropdown': _dropdown["default"],
    's-icon': _icon["default"],
    's-button': _button["default"],
    's-button-group': _button["default"].Group
  },
  handleLeftButton: function handleLeftButton(e) {
    e.stopPropagation();
    this.fire('click', e);
  },
  handleVisibleChange: function handleVisibleChange(value) {
    this.fire('visibleChange', value);
  },
  template: "\n        <span>\n            <s-button-group class=\"".concat(prefixCls, "\" size=\"{{size}}\">\n                <s-button\n                    on-click=\"handleLeftButton\"\n                    disabled=\"{{disabled}}\"\n                    htmlType=\"{{htmlType}}\"\n                    href=\"{{href}}\"\n                ><slot /></s-button>\n                <s-dropdown\n                    align=\"{{align}}\"\n                    disabled=\"{{disabled}}\"\n                    trigger=\"{{disabled ? [] : trigger}}\"\n                    placement=\"{{placement}}\"\n                    getPopupContainer=\"{{getPopupContainer}}\"\n                    on-visibleChange=\"handleVisibleChange\"\n                    style=\"display:inline-block;\"\n                >\n                    <slot slot=\"overlay\" var-prefixCls=\"{{prefixCls}}\" name=\"overlay\" />\n                    <s-button disabled=\"{{disabled}}\"><s-icon type=\"{{type || 'ellipsis'}}\" /></s-button>\n                </s-dropdown>\n            </s-button-group>\n        </span>\n    ")
});

exports["default"] = _default;