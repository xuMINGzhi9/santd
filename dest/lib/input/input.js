"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _base = _interopRequireDefault(require("./base"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file input 输入框组件
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('input')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    addonAfter: _san.DataTypes.string,
    addonBefore: _san.DataTypes.string,
    prefix: _san.DataTypes.string,
    suffix: _san.DataTypes.string,
    defaultValue: _san.DataTypes.any,
    placeholder: _san.DataTypes.string,
    disabled: _san.DataTypes.bool,
    inputType: _san.DataTypes.oneOf(['inputGroup', 'inputFix']),
    id: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    size: _san.DataTypes.oneOf(['large', 'default', 'small']),
    type: _san.DataTypes.string,
    value: _san.DataTypes.any
  },
  components: {
    's-icon': _icon["default"]
  },
  inited: function inited() {
    this.data.set('value', this.data.get('value') || this.data.get('defaultValue') || '');
    this.data.set('hasAddonBefore', this.data.get('addonBefore') || !!this.sourceSlots.named.addonBefore);
    this.data.set('hasAddonAfter', this.data.get('addonAfter') || !!this.sourceSlots.named.addonAfter);
    this.data.set('hasPrefix', this.data.get('prefix') || !!this.sourceSlots.named.prefix);
    this.data.set('hasSuffix', this.data.get('suffix') || !!this.sourceSlots.named.suffix);
  },
  handleIconClear: function handleIconClear() {
    this.data.set('value', '');
  },
  template: "\n        <span class=\"{{value && allowClear ? '".concat(prefixCls, "-affix-wrapper' : ''}}\">\n            <span class=\"").concat(prefixCls, "-group-wrapper {{size ? '").concat(prefixCls, "-group-wrapper-' + size: ''}}\" s-if=\"hasAddonBefore || hasAddonAfter\">\n                <span class=\"").concat(prefixCls, "-wrapper ").concat(prefixCls, "-group\">\n                    <span class=\"").concat(prefixCls, "-group-addon\" s-if=\"hasAddonBefore\">\n                        <slot name=\"addonBefore\" s-if=\"!addonBefore\" />\n                        <template s-else>{{addonBefore}}</template>\n                    </span>\n                    ").concat(_base["default"].prototype.template, "\n                    <span class=\"").concat(prefixCls, "-group-addon\" s-if=\"hasAddonAfter\">\n                        <slot name=\"addonAfter\" s-if=\"!addonAfter\" />\n                        <template s-else>{{addonAfter}}</template>\n                    </span>\n                </span>\n            </span>\n            <span class=\"").concat(prefixCls, "-affix-wrapper {{size ? '").concat(prefixCls, "-affix-wrapper-' + size: ''}}\" s-else-if=\"hasPrefix || hasSuffix\">\n                <span class=\"").concat(prefixCls, "-prefix\" s-if=\"hasPrefix\">\n                    <slot name=\"prefix\" s-if=\"!prefix\" />\n                    <template s-else>{{prefix}}</template>\n                </span>\n                ").concat(_base["default"].prototype.template, "\n                <span class=\"").concat(prefixCls, "-suffix\" s-if=\"hasSuffix\">\n                    <slot name=\"suffix\" s-if=\"!suffix\" />\n                    <template s-else>{{suffix}}</template>\n                </span>\n            </span>\n            <template s-else>\n                ").concat(_base["default"].prototype.template, "\n            </template>\n            <span\n                class=\"").concat(prefixCls, "-suffix\"\n                s-if=\"value && allowClear\"\n                on-click=\"handleIconClear\"\n            >\n                <s-icon type=\"close-circle\" />\n            </span>\n        </span>\n    ")
}, _base["default"]);

exports["default"] = _default;