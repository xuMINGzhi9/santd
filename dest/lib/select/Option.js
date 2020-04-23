"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file select/Option
 * @author
 */
var _default = _san["default"].defineComponent({
  isSelectOption: true,
  template: "\n        <template>\n            <slot/>\n        </template>\n    ",
  dataTypes: {
    disabled: _san.DataTypes.bool,
    label: _san.DataTypes.string,
    title: _san.DataTypes.string,
    value: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number])
  },
  initData: function initData() {
    return {
      disabled: false
    };
  },
  attached: function attached() {
    this.dispatch('select:updateOptions');
  },
  updated: function updated() {
    this.dispatch('select:updateOptions');
  },
  detached: function detached() {
    this.dispatch('select:updateOptions');
  }
});

exports["default"] = _default;