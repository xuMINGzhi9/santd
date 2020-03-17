"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _base = _interopRequireDefault(require("./base"));

var _title = _interopRequireDefault(require("./title"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('typography')();

var Typography = _san["default"].defineComponent({
  template: "\n        <article class=\"".concat(prefixCls, "\"><slot /></article>\n    ")
});

Typography.Text = _base["default"].create('text');
Typography.Title = _title["default"];
Typography.Paragraph = _base["default"].create('paragraph');
var _default = Typography;
exports["default"] = _default;