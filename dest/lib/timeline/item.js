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
 * @file 组件 timeline
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('timeline')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    color: _san.DataTypes.string,
    pending: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      color: 'blue',
      pending: false
    };
  },
  inited: function inited() {
    this.data.set('hasDot', !!this.sourceSlots.named.dot);
    this.dispatch('santd_timeline_addItem', this);
  },
  getDotStyle: function getDotStyle(color) {
    if (!/blue|red|green|gray/.test(color)) {
      return {
        'border-color': color
      };
    }
  },
  template: "\n        <li class=\"".concat(prefixCls, "-item {{pending ? '").concat(prefixCls, "-item-pending' : ''}}\">\n            <div class=\"").concat(prefixCls, "-item-tail\" />\n            <div\n                class=\"").concat(prefixCls, "-item-head ").concat(prefixCls, "-item-head-{{color}} {{hasDot ? '").concat(prefixCls, "-item-head-custom' : ''}}\"\n                style=\"{{getDotStyle(color)}}\"\n            >\n                <slot name=\"dot\" />\n            </div>\n            <div class=\"").concat(prefixCls, "-item-content\"><slot /></div>\n        </li>\n    ")
});

exports["default"] = _default;