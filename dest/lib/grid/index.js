"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Row", {
  enumerable: true,
  get: function get() {
    return _Row["default"];
  }
});
Object.defineProperty(exports, "Col", {
  enumerable: true,
  get: function get() {
    return _Col["default"];
  }
});
exports["default"] = void 0;

var _Row = _interopRequireDefault(require("./Row"));

var _Col = _interopRequireDefault(require("./Col"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 grid
 */
var _default = {
  Row: _Row["default"],
  Col: _Col["default"]
};
exports["default"] = _default;