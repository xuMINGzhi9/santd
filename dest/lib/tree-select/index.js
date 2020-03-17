"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _treeStrategies = require("./treeStrategies");

var _treeSelect = _interopRequireDefault(require("./tree-select"));

var _treeNode = _interopRequireDefault(require("../tree/treeNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file tree-select 树选中组件
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */
_treeSelect["default"].TreeNode = _treeNode["default"];
_treeSelect["default"].SHOW_ALL = _treeStrategies.SHOW_ALL;
_treeSelect["default"].SHOW_PARENT = _treeStrategies.SHOW_PARENT;
_treeSelect["default"].SHOW_CHILD = _treeStrategies.SHOW_CHILD;
var _default = _treeSelect["default"];
exports["default"] = _default;