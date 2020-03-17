"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* @file divider 分割线
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('menu')();

var _default = _san["default"].defineComponent({
  template: "\n        <li class=\"".concat(prefixCls, "-item-divider\"></li>\n    ")
});

exports["default"] = _default;