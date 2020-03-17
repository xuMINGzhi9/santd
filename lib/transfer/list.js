"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _renderListBody = _interopRequireDefault(require("./renderListBody"));

var _search = _interopRequireDefault(require("./search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('transfer')('list');

var matchFilter = function matchFilter(item, filterValue, filterOption) {
  if (filterOption) {
    return filterOption(filterValue, item);
  }

  return item.title.indexOf(filterValue) >= 0;
};

var _default = _san["default"].defineComponent({
  dataTypes: {
    titleText: _san.DataTypes.string,
    dataSource: _san.DataTypes.array,
    filterOption: _san.DataTypes.func,
    checkedKeys: _san.DataTypes.array,
    showSearch: _san.DataTypes.bool,
    searchPlaceholder: _san.DataTypes.string,
    itemUnit: _san.DataTypes.string,
    itemsUnit: _san.DataTypes.string,
    disabled: _san.DataTypes.bool,
    direction: _san.DataTypes.string,
    showSelectAll: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      filterValue: '',
      checkedKeys: []
    };
  },
  computed: {
    getFilteredItems: function getFilteredItems() {
      var dataSource = this.data.get('dataSource');
      var filterValue = this.data.get('filterValue') || '';
      var filterOption = this.data.get('filterOption');
      var selectedKeys = this.data.get('checkedKeys') || [];
      return dataSource.filter(function (item) {
        return matchFilter(item, filterValue.trim(), filterOption);
      }).map(function (item) {
        item.checked = selectedKeys.includes(item.key);
        return _objectSpread({}, item);
      });
    },
    getCheckStatus: function getCheckStatus() {
      var filteredItems = this.data.get('getFilteredItems');
      var checkedKeys = this.data.get('checkedKeys');

      if (checkedKeys.length === 0) {
        return 'none';
      } else if (filteredItems.every(function (item) {
        return checkedKeys.indexOf(item.key) >= 0 || !!item.disabled;
      })) {
        return 'all';
      }

      return 'part';
    }
  },
  handleItemSelectAll: function handleItemSelectAll() {
    var filteredItems = this.data.get('getFilteredItems');
    var getCheckStatus = this.data.get('getCheckStatus');
    var selectedKeys = filteredItems.filter(function (item) {
      return !item.disabled;
    }).map(function (_ref) {
      var key = _ref.key;
      return key;
    });
    this.fire('itemSelectAll', {
      selectedKeys: selectedKeys,
      checkAll: !(getCheckStatus === 'all')
    });
  },
  handleItemSelect: function handleItemSelect(prop) {
    this.fire('itemSelect', prop);
  },
  handleScroll: function handleScroll(e) {
    this.fire('scroll', e);
  },
  handleFilter: function handleFilter(value) {
    this.data.set('filterValue', value);
    this.fire('filter', value);
  },
  handleClear: function handleClear() {
    this.data.set('filterValue', '');
    this.fire('clear');
  },
  components: {
    's-checkbox': _checkbox["default"],
    's-search': _search["default"],
    's-renderlist': _renderListBody["default"]
  },
  messages: {
    santd_transfer_itemSelect: function santd_transfer_itemSelect(payload) {
      this.fire('itemSelect', payload.value);
    },
    santd_transfer_itemSelectAll: function santd_transfer_itemSelectAll(payload) {
      this.fire('itemSelectAll', {
        selectedKeys: payload.value.selectedKeys,
        checkAll: payload.value.checkAll
      });
    }
  },
  template: "<div class=\"".concat(prefixCls, " {{hasFooter ? '").concat(prefixCls, "-with-footer' : ''}}\">\n        <div class=\"").concat(prefixCls, "-header\">\n            <s-checkbox\n                s-if=\"showSelectAll !== false\"\n                disabled=\"{{disabled}}\"\n                checked=\"{{getCheckStatus === 'all'}}\"\n                indeterminate=\"{{getCheckStatus === 'part'}}\"\n                on-change=\"handleItemSelectAll\"\n            />\n            <span class=\"").concat(prefixCls, "-header-selected\">\n                <span>\n                    {{checkedKeys.length > 0 ? checkedKeys.length + '/' : ''}}\n                    {{getFilteredItems.length}} {{dataSource.length > 1 ? itemsUnit : itemUnit}}\n                </span>\n                <span class=\"").concat(prefixCls, "-header-title\">{{titleText}}</span>\n            </span>\n        </div>\n        <div class=\"").concat(prefixCls, "-body {{showSearch ? '").concat(prefixCls, "-body-with-search' : ''}}\">\n            <div s-if=\"showSearch\" class=\"").concat(prefixCls, "-body-search-wrapper\">\n                <s-search\n                    placeholder=\"{{searchPlaceholder}}\"\n                    value=\"{{filterValue}}\"\n                    disabled=\"{{disabled}}\"\n                    on-change=\"handleFilter\"\n                    on-clear=\"handleClear\"\n                />\n            </div>\n            <div class=\"").concat(prefixCls, "-body-customize-wrapper\" s-if=\"hasRenderList\">\n                <slot\n                    name=\"renderList\"\n                    var-direction=\"{{direction}}\"\n                    var-filteredItems=\"{{getFilteredItems}}\"\n                    var-disabled=\"{{disabled}}\"\n                    var-selectedKeys=\"{{checkedKeys}}\"\n                    var-targetKeys=\"{{targetKeys}}\"\n                />\n            </div>\n            <template s-else>\n                <s-renderlist\n                    s-if=\"getFilteredItems.length\"\n                    prefixCls=\"").concat(prefixCls, "\"\n                    direction=\"{{direction}}\"\n                    filteredItems=\"{{getFilteredItems}}\"\n                    disabled=\"{{disabled}}\"\n                    selectedKeys=\"{{checkedKeys}}\"\n                    targetKeys=\"{{targetKeys}}\"\n                    filteredRenderItems=\"{{getFilteredItems}}\"\n                    hasRender=\"{{hasRender}}\"\n                    on-itemSelect=\"handleItemSelect\"\n                    on-itemSelectAll=\"handleItemSelectAll\"\n                    on-scroll=\"handleScroll\"\n                ><slot name=\"render\" var-item=\"{{item}}\" /></s-renderlist>\n                <div s-else class=\"").concat(prefixCls, "-body-not-found\"><slot name=\"notfoundcontent\" /></div>\n            </template>\n        </div>\n        <div class=\"").concat(prefixCls, "-footer\" s-if=\"hasFooter\"><slot name=\"footer\" /></div>\n    </div>")
});

exports["default"] = _default;