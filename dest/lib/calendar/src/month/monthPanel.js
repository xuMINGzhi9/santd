"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _monthTable = _interopRequireDefault(require("./monthTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd calendar month panel file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  dataTypes: {
    disabledDate: _san.DataTypes.func,
    prefixCls: _san.DataTypes.string,
    value: _san.DataTypes.object,
    defaultValue: _san.DataTypes.object
  },
  computed: {
    year: function year() {
      var value = this.data.get('value');
      return value && value.year();
    }
  },
  inited: function inited() {
    this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
  },
  handlePreviousYear: function handlePreviousYear() {
    this.fire('changeYear', -1);
  },
  handleYearPanelShow: function handleYearPanelShow() {
    this.fire('yearPanelShow');
  },
  handleNextYear: function handleNextYear() {
    this.fire('changeYear', 1);
  },
  setAndSelectValue: function setAndSelectValue(value) {
    this.data.set('value', value);
    this.fire('select', value);
  },
  components: {
    's-monthtable': _monthTable["default"]
  },
  template: "<div class=\"{{prefixCls}}-month-panel\">\n        <div>\n            <div class=\"{{prefixCls}}-month-panel-header\">\n                <a\n                    class=\"{{prefixCls}}-month-panel-prev-year-btn\"\n                    role=\"button\"\n                    on-click=\"handlePreviousYear\"\n                    title=\"{{locale.previousYear}}\"\n                    href=\"javascript:;\"\n                />\n                <a\n                    class=\"{{prefixCls}}-month-panel-year-select\"\n                    role=\"button\"\n                    on-click=\"handleYearPanelShow\"\n                    title=\"{{locale.yearSelect}}\"\n                    href=\"javascript:;\"\n                >\n                    <span class=\"{{prefixCls}}-month-panel-year-select-content\">{{year}}</span>\n                    <span class=\"{{prefixCls}}-month-panel-year-select-arrow\">x</span>\n                </a>\n                <a\n                    class=\"{{prefixCls}}-month-panel-next-year-btn\"\n                    role=\"button\"\n                    on-click=\"handleNextYear\"\n                    title=\"{{locale.nextYear}}\"\n                    href=\"javascript:;\"\n                />\n            </div>\n            <div class=\"{{prefixCls}}-month-panel-body\">\n                <s-monthtable\n                    disabledDate=\"{{disabledDate}}\"\n                    locale=\"{{locale}}\"\n                    value=\"{{value}}\"\n                    cellRender=\"{{cellRender}}\"\n                    contentRender=\"{{contentRender}}\"\n                    prefixCls=\"{{prefixCls}}-month-panel\"\n                    on-select=\"setAndSelectValue\"\n                />\n            </div>\n            <div class=\"{{prefixCls}}-month-panel-footer\" s-if=\"hasExtraFooter\">\n                <slot name=\"renderExtraFooter\" />\n            </div>\n        </div>\n    </div>"
});

exports["default"] = _default;