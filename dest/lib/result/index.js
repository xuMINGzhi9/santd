"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ExceptionMap = exports.IconMap = void 0;

var _san = _interopRequireWildcard(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _util = require("../core/util");

var _noFound = _interopRequireDefault(require("./noFound"));

var _serverError = _interopRequireDefault(require("./serverError"));

var _unauthorized = _interopRequireDefault(require("./unauthorized"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd result component file
 * @author mayihui@baidu.com
 */
var prefixCls = (0, _util.classCreator)('result')();
var IconMap = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'exclamation-circle',
  warning: 'warning'
};
exports.IconMap = IconMap;
var ExceptionMap = {
  404: _noFound["default"],
  500: _serverError["default"],
  403: _unauthorized["default"]
};
exports.ExceptionMap = ExceptionMap;

var Result = _san["default"].defineComponent({
  dataTypes: {
    status: _san.DataTypes.string,
    title: _san.DataTypes.string,
    subTitle: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      status: 'info',
      exceptionMap: ExceptionMap,
      iconMap: IconMap
    };
  },
  components: {
    's-icon': _icon["default"],
    's-nofound': _noFound["default"],
    's-servererror': _serverError["default"],
    's-unauthorized': _unauthorized["default"]
  },
  inited: function inited() {
    this.data.set('hasIcon', !!this.sourceSlots.named.icon);
    this.data.set('hasExtra', !!this.sourceSlots.named.extra); // 由于named slot会留下换行，所以用是否含有children来判断是不是有noname slot;

    var noName = this.sourceSlots.noname || [];
    this.data.set('hasContent', !!noName.filter(function (item) {
      return !!item.children;
    }).length);
  },
  template: "<div class=\"".concat(prefixCls, " ").concat(prefixCls, "-{{status}}\">\n        <div class=\"").concat(prefixCls, "-icon ").concat(prefixCls, "-image\" s-if=\"exceptionMap[status]\">\n            <s-unauthorized s-if=\"status === '403'\" />\n            <s-nofound s-else-if=\"status === '404'\" />\n            <s-servererror s-else-if=\"status === '500'\" />\n        </div>\n        <div class=\"").concat(prefixCls, "-icon\" s-else>\n            <slot name=\"icon\" s-if=\"hasIcon\" />\n            <s-icon theme=\"filled\" type=\"{{iconMap[status]}}\" s-else />\n        </div>\n        <div class=\"").concat(prefixCls, "-title\">{{title}}</div>\n        <div class=\"").concat(prefixCls, "-subtitle\" s-if=\"subTitle\">\"{{subTitle}}\"</div>\n        <div class=\"").concat(prefixCls, "-content\" s-if=\"hasContent\"><slot /></div>\n        <div class=\"").concat(prefixCls, "-extra\" s-if=\"hasExtra\">\n            <slot name=\"extra\" />\n        </div>\n    </div>")
});

Object.keys(ExceptionMap).forEach(function (key) {
  var privateKey = "PRESENTED_IMAGE_".concat(key);
  Result[privateKey] = ExceptionMap[key];
});
var _default = Result;
exports["default"] = _default;