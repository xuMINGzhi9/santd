"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _util = require("../core/util");

var _pagination = _interopRequireDefault(require("./pagination"));

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* @file 分页组件
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('pagination')();

var prevIcon = _san["default"].defineComponent({
  components: {
    's-icon': _icon["default"]
  },
  template: "<a class=\"".concat(prefixCls, "-item-link\">\n        <s-icon type=\"left\" />\n      </a>")
});

var nextIcon = _san["default"].defineComponent({
  components: {
    's-icon': _icon["default"]
  },
  template: "<a class=\"".concat(prefixCls, "-item-link\">\n        <s-icon type=\"right\" />\n      </a>")
});

var jumpPrevIcon = _san["default"].defineComponent({
  components: {
    's-icon': _icon["default"]
  },
  template: "<a class=\"".concat(prefixCls, "-item-link\">\n        <div class=\"").concat(prefixCls, "-item-container\">\n            <s-icon class=\"").concat(prefixCls, "-item-link-icon\" type=\"double-left\" />\n            <span class=\"").concat(prefixCls, "-item-ellipsis\">\u2022\u2022\u2022</span>\n        </div>\n      </a>")
});

var jumpNextIcon = _san["default"].defineComponent({
  components: {
    's-icon': _icon["default"]
  },
  template: "<a class=\"".concat(prefixCls, "-item-link\">\n        <div class=\"").concat(prefixCls, "-item-container\">\n            <s-icon class=\"").concat(prefixCls, "-item-link-icon\" type=\"double-right\" />\n            <span class=\"").concat(prefixCls, "-item-ellipsis\">\u2022\u2022\u2022</span>\n        </div>\n      </a>")
});

var _default = _san["default"].defineComponent({
  components: {
    pagination: _pagination["default"],
    previcon: prevIcon,
    nexticon: nextIcon,
    jumpprevicon: jumpPrevIcon,
    jumpnexticon: jumpNextIcon
  },
  handleShowSizeChange: function handleShowSizeChange(payload) {
    this.fire('showSizeChange', payload);
  },
  handleChange: function handleChange(payload) {
    this.fire('change', payload);
  },
  inited: function inited() {
    this.data.set('itemRender', !!this.sourceSlots.named.itemRender);

    _receiver["default"].inited.call(this);
  },
  initData: function initData() {
    return {
      componentName: 'Pagination'
    };
  },
  computed: _receiver["default"].computed,
  template: "\n        <div>\n            <pagination\n                defaultCurrent=\"{{defaultCurrent}}\"\n                defaultPageSize=\"{{defaultPageSize}}\"\n                hideOnSinglePage=\"{{hideOnSinglePage}}\"\n                current=\"{{current}}\"\n                total=\"{{total}}\"\n                simple=\"{{simple}}\"\n                pageSize=\"{{pageSize}}\"\n                showQuickJumper=\"{{showQuickJumper}}\"\n                showSizeChanger=\"{{showSizeChanger}}\"\n                prefixCls=\"".concat(prefixCls, "\"\n                size=\"{{size}}\"\n                showTotal=\"{{showTotal}}\"\n                itemRender=\"{{itemRender}}\"\n                locale=\"{{locale}}\"\n                disabled=\"{{disabled}}\"\n                on-showSizeChange=\"handleShowSizeChange\"\n                on-change=\"handleChange\"\n            >\n                <previcon slot=\"prevIcon\" />\n                <nexticon slot=\"nextIcon\" />\n                <jumpprevicon slot=\"jumpPrevIcon\" />\n                <jumpnexticon slot=\"jumpNextIcon\" />\n                <slot slot=\"itemRender\" name=\"itemRender\" var-type=\"{{type}}\" var-page=\"{{page}}\" />\n            </pagination>\n        </div>\n    ")
});

exports["default"] = _default;