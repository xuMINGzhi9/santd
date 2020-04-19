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
 * @file 组件 rate 里面的小星星
 * @author panming <panming@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('rate-star')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    value: _san.DataTypes.number,
    index: _san.DataTypes.number,
    allowHalf: _san.DataTypes.bool,
    disabled: _san.DataTypes.bool,
    character: _san.DataTypes.any,
    focused: _san.DataTypes.bool
  },
  computed: {
    classes: function classes() {
      var data = this.data;
      var index = data.get('index');
      var value = data.get('value');
      var allowHalf = data.get('allowHalf');
      var focused = data.get('focused');
      var starValue = index + 1;
      var classArr = [prefixCls];
      focused && classArr.push("".concat(prefixCls, "-focused"));
      starValue <= value && classArr.push("".concat(prefixCls, "-full"));
      allowHalf && value + 0.5 === starValue && classArr.push("".concat(prefixCls, "-half"));
      return classArr;
    }
  },
  initData: function initData() {
    return {
      value: 0,
      index: 0,
      allowHalf: true,
      disabled: false
    };
  },
  onHover: function onHover(e) {
    e.starIndex = this.data.get('index');
    this.fire('hover', e);
  },
  onClick: function onClick(e) {
    e.starIndex = this.data.get('index');
    this.fire('click', e);
    this.data.set('focused', !this.data.get('focused'));
  },
  template: "\n        <li\n            class=\"{{classes}}\"\n            on-click=\"onClick\"\n            on-mousemove=\"onHover\"\n        >\n            <div class=\"".concat(prefixCls, "-first\">\n                <slot name=\"starCharacter\" />\n            </div>\n            <div class=\"").concat(prefixCls, "-second\">\n                <slot name=\"starCharacter\" />\n            </div>\n        </li>\n    ")
});

exports["default"] = _default;