"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('card')();

var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"".concat(prefixCls, "-grid\"><slot /></div>\n    ")
});

exports["default"] = _default;