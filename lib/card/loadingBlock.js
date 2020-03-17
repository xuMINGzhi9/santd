"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _grid = require("../grid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefix = (0, _util.classCreator)('card')('loading');

var _default = _san["default"].defineComponent({
  template: "\n    \t<div\n            class=\"".concat(prefix, "-content\"\n        >\n            <s-row gutter=\"8\">\n                <s-col span=\"22\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n            </s-row>\n            <s-row gutter=\"8\">\n                <s-col span=\"8\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n                <s-col span=\"15\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n            </s-row>\n            <s-row gutter=\"8\">\n                <s-col span=\"6\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n                <s-col span=\"18\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n            </s-row>\n            <s-row gutter=\"8\">\n                <s-col span=\"13\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n                <s-col span=\"9\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n            </s-row>\n            <s-row gutter=\"8\">\n                <s-col span=\"4\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n                <s-col span=\"3\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n                <s-col span=\"16\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n            </s-row>\n            <s-row gutter=\"8\">\n                <s-col span=\"8\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n                <s-col span=\"6\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n                <s-col span=\"8\">\n                    <div class=\"").concat(prefix, "-block\" />\n                </s-col>\n            </s-row>\n        </div>\n    "),
  components: {
    's-row': _grid.Row,
    's-col': _grid.Col
  }
});

exports["default"] = _default;