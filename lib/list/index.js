"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _spin = _interopRequireDefault(require("../spin"));

var _pagination = _interopRequireDefault(require("../pagination"));

var _grid = _interopRequireDefault(require("../grid"));

var _item = _interopRequireDefault(require("./item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('list')();
var contentTemplate = "\n    <div s-if=\"!loading && !hasChildren()\" class=\"".concat(prefixCls, "-empty-text\">\n        <slot name=\"renderEmpty\" s-if=\"hasRenderEmpty\" />\n        <span s-else>\u6CA1\u6709\u6570\u636E</span>\n    </div>\n    <template s-else>\n        <s-row gutter=\"{{grid.gutter}}\" s-if=\"grid\">\n            <s-col\n                span=\"{{getGrid(grid, 'column')}}\"\n                xs=\"{{getGrid(grid, 'xs')}}\"\n                sm=\"{{getGrid(grid, 'sm')}}\"\n                md=\"{{getGrid(grid, 'md')}}\"\n                lg=\"{{getGrid(grid, 'lg')}}\"\n                xl=\"{{getGrid(grid, 'xl')}}\"\n                xxl=\"{{getGrid(grid, 'xxl')}}\"\n                s-for=\"item, index in splitDataSource\"\n            >\n                <slot name=\"renderItem\" var-item=\"{{item}}\" var-index=\"{{index}}\" />\n            </s-col>\n        </s-row>\n        <slot s-for=\"item in splitDataSource\" name=\"renderItem\" var-item=\"{{item}}\" s-else />\n    </template>\n");

var List = _san["default"].defineComponent({
  dataTypes: {
    bordered: _san.DataTypes.bool,
    dataSource: _san.DataTypes.array,
    id: _san.DataTypes.string,
    loading: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.object]),
    pagination: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.object]),
    size: _san.DataTypes.string,
    split: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      dataSource: [],
      bordered: false,
      split: true,
      loading: false,
      pagination: false,
      paginationPosition: 'bottom',
      defaultPaginationProps: {
        current: 1,
        total: 0
      },
      itemChildren: []
    };
  },
  computed: {
    classes: function classes() {
      var size = this.data.get('size');
      var classArr = [prefixCls];
      this.data.get('itemLayout') === 'vertical' && classArr.push("".concat(prefixCls, "-vertical"));
      size === 'large' && classArr.push("".concat(prefixCls, "-lg"));
      size === 'small' && classArr.push("".concat(prefixCls, "-sm"));
      this.data.get('split') && classArr.push("".concat(prefixCls, "-split"));
      this.data.get('bordered') && classArr.push("".concat(prefixCls, "-bordered"));
      this.data.get('loading') && classArr.push("".concat(prefixCls, "-loading"));
      this.data.get('grid') && classArr.push("".concat(prefixCls, "-grid"));
      this.data.get('somethingAfterLastItem') && classArr.push("".concat(prefixCls, "-something-after-last-item"));
      return classArr;
    },
    paginationProps: function paginationProps() {
      var dataSource = this.data.get('dataSource');
      var pagination = this.data.get('pagination');
      return _objectSpread(_objectSpread({}, this.data.get('defaultPaginationProps')), {}, {
        total: dataSource.length,
        current: this.data.get('paginationCurrent'),
        pageSize: this.data.get('pageSize')
      }, pagination || {});
    },
    splitDataSource: function splitDataSource() {
      var dataSource = this.data.get('dataSource');
      var paginationProps = this.data.get('paginationProps');

      if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
        return Array.from(dataSource).splice((paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize);
      }

      return dataSource;
    }
  },
  inited: function inited() {
    var pagination = this.data.get('pagination') || {};
    this.data.set('paginationCurrent', pagination.defaultCurrent || 1);
    this.data.set('paginationSize', pagination.defaultPageSize || 10);
    this.data.set('hasHeader', !!this.sourceSlots.named.header || this.data.get('header'));
    this.data.set('hasFooter', !!this.sourceSlots.named.footer || this.data.get('footer'));
    this.data.set('hasRenderEmpty', !!this.sourceSlots.named.renderEmpty);
    this.data.set('hasLoadMore', !!this.sourceSlots.named.loadMore);
  },
  components: {
    's-spin': _spin["default"],
    's-row': _grid["default"].Row,
    's-col': _grid["default"].Col,
    's-pagination': _pagination["default"]
  },
  getGrid: function getGrid(grid, type) {
    return grid[type] && Math.floor(24 / grid[type]);
  },
  messages: {
    santd_list_addItem: function santd_list_addItem(payload) {
      var item = payload.value;
      item.data.set('itemLayout', this.data.get('itemLayout'));
      this.data.push('itemChildren', item);
    }
  },
  attached: function attached() {
    var dataSource = this.data.get('splitDataSource');
    this.data.get('itemChildren').forEach(function (child, index) {
      child.data.set('item', dataSource[index]);
      child.data.set('index', index);
    });
    this.data.set('somethingAfterLastItem', this.somethingAfterLastItem());
  },
  hasChildren: function hasChildren() {
    var dataSource = this.data.get('dataSource');
    return this.data.get('hasHeader') || this.data.get('hasFooter') || dataSource.length !== 0;
  },
  somethingAfterLastItem: function somethingAfterLastItem() {
    var loadMore = this.data.get('loadMore');
    var pagination = this.data.get('pagination');
    return !!(loadMore || pagination || this.data.get('hasFooter'));
  },
  handlePaginationChange: function handlePaginationChange(payload) {
    var pagination = this.data.get('pagination') || {};
    this.data.set('paginationCurrent', payload.page);
    this.data.set('paginationSize', payload.pageSize);
    pagination.onChange && pagination.onChange(payload.page, payload.pageSize);
  },
  handleShowSizeChange: function handleShowSizeChange(payload) {
    var pagination = this.data.get('pagination') || {};
    this.data.set('paginationCurrent', payload.page);
    this.data.set('paginationSize', payload.pageSize);
    pagination.onShowSizeChange && pagination.onShowSizeChange(payload.page, payload.pageSize);
  },
  template: "\n        <div class=\"{{classes}}\" id=\"{{id}}\">\n            <div\n                class=\"".concat(prefixCls, "-pagination\"\n                s-if=\"(paginationPosition === 'top' || paginationPosition === 'both') && pagination\"\n            >\n                <s-pagination\n                    total=\"{{paginationProps.total}}\"\n                    current=\"{{paginationProps.current}}\"\n                    pageSize=\"{{paginationProps.pageSize}}\"\n                    on-change=\"handlePaginationChange\"\n                    on-showSizeChang=\"handleShowSizeChange\"\n                ></s-pagination>\n            </div>\n            <div class=\"").concat(prefixCls, "-header\" s-if=\"hasHeader\">\n                {{header}}<slot name=\"header\" />\n            </div>\n            <s-spin spinning=\"{{loading}}\" s-if=\"hasLoadMore\">\n                <div slot=\"content\">").concat(contentTemplate, "</div>\n            </s-spin>\n            <template s-else>\n                ").concat(contentTemplate, "\n            </template>\n            <div class=\"").concat(prefixCls, "-footer\" s-if=\"hasFooter\">\n                {{footer}}<slot name=\"footer\" />\n            </div>\n            <slot s-if=\"hasLoadMore\" name=\"loadMore\" />\n            <template s-else>\n                <div\n                    class=\"").concat(prefixCls, "-pagination\"\n                    s-if=\"(paginationPosition === 'bottom' || paginationPosition === 'both') && pagination\"\n                >\n                    <s-pagination\n                        total=\"{{paginationProps.total}}\"\n                        current=\"{{paginationProps.current}}\"\n                        pageSize=\"{{paginationProps.pageSize}}\"\n                        on-change=\"handlePaginationChange\"\n                        on-showSizeChang=\"handleShowSizeChange\"\n                    ></s-pagination>\n                </div>\n            </template>\n        </div>\n    ")
});

List.Item = _item["default"];
var _default = List;
exports["default"] = _default;