"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _radio = _interopRequireDefault(require("./radio"));

var _group = _interopRequireDefault(require("./group"));

var _radioButton = _interopRequireDefault(require("./radioButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 radio
 * @author chenkai13 <chenkai13@baidu.com>
 */
_radio["default"].Group = _group["default"];
_radio["default"].Button = _radioButton["default"];
var _default = _radio["default"];
exports["default"] = _default;