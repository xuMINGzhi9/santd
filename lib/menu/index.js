"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _menu = _interopRequireDefault(require("./menu"));

var _subMenu = _interopRequireDefault(require("./subMenu"));

var _menuItem = _interopRequireDefault(require("./menuItem"));

var _menuItemGroup = _interopRequireDefault(require("./menuItemGroup"));

var _divider = _interopRequireDefault(require("./divider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* @file menu入口文件
* @author fuqiangqiang@baidu.com
*/
_menu["default"].Sub = _subMenu["default"];
_menu["default"].Item = _menuItem["default"];
_menu["default"].MenuItemGroup = _menuItemGroup["default"];
_menu["default"].MenuDivider = _divider["default"];
var _default = _menu["default"];
exports["default"] = _default;