"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("../core/util");

var _td = _interopRequireDefault(require("./td"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file santd Table 表格组件 td 模板
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('table')();
var _default = {
  template: "\n        <tbody class=\"".concat(prefixCls, "-tbody\">\n            <template s-for=\"item, index in renderData\" s-if=\"renderData.length\">\n            <tr\n                class=\"").concat(prefixCls, "-row\"\n                style=\"display: {{item.level === 0 || item.expanded ? '' : 'none;'}}\"\n                on-click=\"handleRowClick(item)\"\n            >\n                ").concat(_td["default"].template, "\n            </tr>\n            <tr\n                s-if=\"hasExpandedRowRender\"\n                class=\"").concat(prefixCls, "-expanded-row\"\n                style=\"display: {{item.expanded ? '' : 'none'}}\"\n            >\n                <td></td>\n                <td colspan=\"{{tdColumns.length}}\" >\n                    <slot name=\"expandedRowRender\" var-record=\"{{item}}\"/>\n                </td>\n            </tr>\n            </template>\n        </tbody>\n    ")
};
exports["default"] = _default;