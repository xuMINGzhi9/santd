"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _select = _interopRequireDefault(require("../select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file autocomplete 自动完成组件
* @author fuqiangqiang@baidu.com
*/
var AutoComplete = _san["default"].defineComponent({
  components: {
    's-select': _select["default"],
    's-select-option': _select["default"].Option
  },
  dataTypes: {
    allowClear: _san.DataTypes.bool,
    autoFocus: _san.DataTypes.bool,
    backfill: _san.DataTypes.bool,
    dataSource: _san.DataTypes.array,
    defaultValue: _san.DataTypes.array,
    disabled: _san.DataTypes.bool,
    filterOption: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.func]),
    placeholder: _san.DataTypes.string,
    value: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.object, _san.DataTypes.array]),
    defaultOpen: _san.DataTypes.bool,
    open: _san.DataTypes.bool
  },
  onSearch: function onSearch(value) {
    this.fire('search', value);
  },
  onSelect: function onSelect(value) {
    this.fire('select', value);
  },
  onChange: function onChange(value) {
    this.fire('change', value);
    this.dispatch('UI:form-item-interact', {
      fieldValue: value,
      type: 'change'
    });
  },
  onBlur: function onBlur(value) {
    this.fire('blur', value);
  },
  onFocus: function onFocus(e) {
    this.fire('focus', e);
  },
  dropdownVisibleChange: function dropdownVisibleChange(val) {
    this.fire('dropdownVisibleChange', val);
  },
  template: "\n        <div>\n            <s-select\n                showSearch=\"{{true}}\"\n                allowClear=\"{{allowClear}}\"\n                autoFocus=\"{{autoFocus}}\"\n                class=\"auto-complete\"\n                style=\"width:100%\"\n                showArrow=\"{{false}}\"\n                placeholder=\"{{placeholder}}\"\n                on-search=\"onSearch\"\n                notFoundContent=\"{{null}}\"\n                autoClearSearchValue=\"{{false}}\"\n                value=\"{{value}}\"\n                filterOption=\"{{filterOption}}\"\n                defaultValue=\"{{defalutValue}}\"\n                open=\"{{open}}\"\n                defaultOpen=\"{{defaultOpen}}\"\n                optionFilterProp=\"children\"\n                isAutoComplete=\"{{true}}\"\n                on-select=\"onSelect\"\n                on-change=\"onChange\"\n                on-blur=\"onBlur\"\n                on-focus=\"onFocus\"\n                on-dropdownVisibleChange=\"dropdownVisibleChange\"\n            >\n                <s-select-option\n                    s-if=\"dataSource\"\n                    s-for=\"data in dataSource\"\n                    value=\"{{data}}\"\n                >\n                    {{data}}\n                </s-select-option>\n                <slot></slot>\n            </s-select>\n        </div>\n    "
});

AutoComplete.Option = _select["default"].Option;
AutoComplete.Group = _select["default"].Group;
var _default = AutoComplete;
exports["default"] = _default;