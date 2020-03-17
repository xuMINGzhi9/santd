"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tree = _interopRequireDefault(require("./tree"));

var _treeNode = _interopRequireDefault(require("./treeNode"));

var _directoryTree = _interopRequireDefault(require("./directoryTree"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* @file menu入口文件
* @author fuqiangqiang@baidu.com
*/
_tree["default"].TreeNode = _treeNode["default"];
_tree["default"].Directory = _directoryTree["default"];
var _default = _tree["default"];
exports["default"] = _default;