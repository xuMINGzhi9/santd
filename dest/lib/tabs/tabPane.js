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
 * @file Santd tabs tabPane file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('tabs')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    active: _san.DataTypes.bool,
    forceRender: _san.DataTypes.bool,
    key: _san.DataTypes.string
  },
  inited: function inited() {
    this.dispatch('santd_tabs_addTabPane', this);
  },
  detached: function detached() {
    this.dispatch('santd_tabs_removeTabPane', this.data.get('key'));
  },
  template: "\n        <div\n            role=\"tabpanel\"\n            aria-hidden=\"{{active ? false : true}}\"\n            class=\"".concat(prefixCls, "-tabpane ").concat(prefixCls, "-tabpane-{{active ? 'active' : 'inactive'}}\"\n        >\n            <slot s-if=\"active || forceRender\"></slot>\n        </div>\n    ")
});

exports["default"] = _default;