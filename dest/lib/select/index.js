"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Select = _interopRequireDefault(require("./Select"));

var _Option = _interopRequireDefault(require("./Option"));

var _OptGroup = _interopRequireDefault(require("./OptGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 select 下拉选择器
 * @author
 */
_Select["default"].Option = _Option["default"];
_Select["default"].OptGroup = _OptGroup["default"];
var _default = _Select["default"];
exports["default"] = _default;