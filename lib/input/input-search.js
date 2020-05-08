"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

var _button = _interopRequireDefault(require("../button"));

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('input')();

var _default = _san["default"].defineComponent({
  dataTypes: _objectSpread(_objectSpread({}, _base["default"].prototype.dataTypes), {}, {
    enterButton: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.bool])
  }),
  components: {
    's-icon': _icon["default"],
    's-button': _button["default"]
  },
  searchClick: function searchClick() {
    var inputValue = this.ref('input').value;
    this.fire('search', inputValue);
  },
  computed: {
    classes: function classes() {
      var enterButton = this.data.get('enterButton');
      var size = this.data.get('size');
      var classArr = ["".concat(prefixCls, "-search"), "".concat(prefixCls, "-affix-wrapper")];
      !!enterButton && classArr.push("".concat(prefixCls, "-search-enter-button"));
      !!size && classArr.push("".concat(prefixCls, "-affix-wrapper-").concat(size));
      return classArr;
    }
  },
  template: "\n        <span class=\"{{classes}}\">\n            ".concat(_base["default"].prototype.template, "\n            <span s-if=\"enterButton\" class=\"").concat(prefixCls, "-suffix\" on-click=\"searchClick()\">\n                <s-button type=\"primary\" class=\"").concat(prefixCls, "-search-button\" size=\"{{size}}\">\n                    <s-icon s-if=\"enterButton === true\" type=\"search\" />\n                    <span s-else>{{enterButton}}</span>\n                </s-button>\n            </span>\n            <span s-else class=\"").concat(prefixCls, "-suffix\" on-click=\"searchClick()\">\n                <s-icon class=\"").concat(prefixCls, "-search-icon\" type=\"search\" />\n            <span>\n        </span>\n    ")
}, _base["default"]);

exports["default"] = _default;