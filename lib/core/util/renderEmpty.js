"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _san = _interopRequireDefault(require("san"));

var _empty = _interopRequireDefault(require("../../empty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd render empty file
 **/
function _default(componentName) {
  switch (componentName) {
    case 'Table':
    case 'List':
      return _san["default"].defineComponent({
        initData: function initData() {
          var data = _empty["default"].prototype.initData();

          data.image = _empty["default"].PRESENTED_IMAGE_SIMPLE;
          return data;
        }
      }, _empty["default"]);

    case 'Select':
    case 'TreeSelect':
    case 'Cascader':
    case 'Transfer':
    case 'Mentions':
      return _san["default"].defineComponent({
        initData: function initData() {
          var data = _empty["default"].prototype.initData();

          data.image = _empty["default"].PRESENTED_IMAGE_SIMPLE;
          data.small = true;
          return data;
        }
      }, _empty["default"]);

    default:
      return _empty["default"];
  }
}