"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _steps = _interopRequireDefault(require("./steps"));

var _step = _interopRequireDefault(require("./step"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* @file 步骤条steps入口文件
* @author fuqiangqiang@baidu.com
*/
_steps["default"].Step = _step["default"];
var _default = _steps["default"];
exports["default"] = _default;