"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file input-number中上下键处理
* @author fuqiangqiang@baidu.com
*/
var _default = _san["default"].defineComponent({
  dataTypes: {
    prefixCls: _san.DataTypes.string,
    direction: _san.DataTypes.string,
    disabled: _san.DataTypes.bool
  },
  components: {
    's-icon': _icon["default"]
  },
  computed: {
    classes: function classes() {
      var prefixCls = this.data.get('prefixCls');
      var direction = this.data.get('direction');
      var classArr = ["".concat(prefixCls, "-handler"), "".concat(prefixCls, "-handler-").concat(direction)];
      this.data.get('disabled') && direction && classArr.push("".concat(prefixCls, "-handler-").concat(direction, "-disabled"));
      return classArr;
    }
  },
  valueChange: function valueChange(e) {
    this.dispatch('santd_inputnumber_' + this.data.get('direction'));
  },
  template: "\n        <span\n            class=\"{{classes}}\"\n            unselectable=\"unselectable\"\n            role=\"button\"\n            aria-label=\"Decrease Value\"\n            aria-disabled=\"{{disabled || false}}\"\n            on-click=\"valueChange\"\n        >\n            <s-icon type=\"{{direction}}\" class=\"{{prefixCls}}-handler-{{direction}}-inner\" />\n        </span>\n    "
});

exports["default"] = _default;