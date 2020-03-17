"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("../core/util");

var _th = _interopRequireDefault(require("./th"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file santd Table 表格组件 thead 模板
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('table')();
var dropdownPrefixCls = (0, _util.classCreator)('dropdown')();
var _default = {
  template: "\n        <thead class=\"".concat(prefixCls, "-thead\">\n            <tr class=\"").concat(prefixCls, "-row\" s-for=\"columns, thIndex in thColumns\">\n                <th s-if=\"rowSelection\" class=\"").concat(prefixCls, "-selection-column {{rowSelection.selections ? '").concat(prefixCls, "-selection-column-custom': ''}}\">\n                    <div class=\"").concat(prefixCls, "-selection\">\n                        <s-checkbox\n                            checked=\"{{getAllChecked(renderData, selectedRowKeys)}}\"\n                            disabled=\"{{getAllDisabled(renderData, selectedRowKeys)}}\"\n                            indeterminate=\"{{getIndeterminate(selectedRowKeys, renderData)}}\"\n                            on-change=\"handleSelectionAll($event)\"\n                        />\n                        <s-dropdown\n                            s-if=\"rowSelection.selections\"\n                            style=\"padding:0;\"\n                            trigger=\"hover\"\n                            placement=\"bottomLeft\"\n                            visible=\"{{rowSelection.visible}}\"\n                            on-visibleChange=\"handleRowSelectionVisible\"\n                            dropdownClassName=\"").concat(prefixCls, "-selection-down ").concat(dropdownPrefixCls, "-trigger\"\n                        >\n                            <s-menu prefixCls=\"{{prefixCls}}\" slot=\"overlay\" on-select=\"handleSelections\">\n                                <s-menu-item s-for=\"selection in rowSelection.selections\" key=\"{{selection.key}}\">\n                                    {{selection.text}}\n                                </s-menu-item>\n                            </s-menu>\n                            <s-icon type=\"down\" />\n                         </s-dropdown>\n                    </div>\n                </th>\n                <th s-if=\"hasExpandedRowRender\" class=\"").concat(prefixCls, "-expand-icon-th\"></th>\n                <template s-for=\"column, columnIndex in columns\">\n                    <th class=\"{{getThClass(column)}}\" style=\"{{getThStyle(column)}}\" s-if=\"column.rowspan\" rowspan=\"{{column.rowspan}}\">").concat(_th["default"].template, "</th>\n                    <th class=\"{{getThClass(column)}}\" style=\"{{getThStyle(column)}}\" s-if=\"column.colspan\" colspan=\"{{column.colspan}}\">").concat(_th["default"].template, "</th>\n                </template>\n            </tr>\n        </thead>\n    ")
};
exports["default"] = _default;