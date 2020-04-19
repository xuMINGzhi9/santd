"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _input = _interopRequireDefault(require("./input"));

var _inputSearch = _interopRequireDefault(require("./input-search"));

var _textarea = _interopRequireDefault(require("./textarea"));

var _group = _interopRequireDefault(require("./group"));

var _inputPassword = _interopRequireDefault(require("./input-password"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* @file input 入口文件
*/
_input["default"].Search = _inputSearch["default"];
_input["default"].TextArea = _textarea["default"];
_input["default"].Group = _group["default"];
_input["default"].Password = _inputPassword["default"];
var _default = _input["default"];
exports["default"] = _default;