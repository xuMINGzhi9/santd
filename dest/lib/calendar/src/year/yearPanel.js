"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _yearTable = _interopRequireDefault(require("./yearTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd calendar year panel file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  dataTypes: {
    prefixCls: _san.DataTypes.string,
    value: _san.DataTypes.object,
    defaultValue: _san.DataTypes.object
  },
  inited: function inited() {
    this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
  },
  computed: {
    startYear: function startYear() {
      var value = this.data.get('value');
      var currentYear = value.year();
      return parseInt(currentYear / 10, 10) * 10;
    },
    endYear: function endYear() {
      var startYear = this.data.get('startYear');
      return startYear + 9;
    }
  },
  handlePreviousDecade: function handlePreviousDecade() {
    this.goYear(-10);
  },
  handleDecadePanelShow: function handleDecadePanelShow() {
    this.fire('decadePanelShow');
  },
  handleNextDecade: function handleNextDecade() {
    this.goYear(10);
  },
  setAndSelectValue: function setAndSelectValue(value) {
    this.data.set('value', value);
    this.fire('select', value);
  },
  goYear: function goYear(year) {
    var value = this.data.get('value').clone();
    value.add(year, 'year');
    this.data.set('value', value);
  },
  components: {
    's-yeartable': _yearTable["default"]
  },
  template: "<div class=\"{{prefixCls}}-year-panel\">\n        <div>\n            <div class=\"{{prefixCls}}-year-panel-header\">\n                <a\n                    class=\"{{prefixCls}}-year-panel-prev-decade-btn\"\n                    role=\"button\"\n                    on-click=\"handlePreviousDecade\"\n                    title=\"{{locale.previousDecade}}\"\n                    href=\"javascript:;\"\n                />\n                <a\n                    class=\"{{prefixCls}}-year-panel-decade-select\"\n                    role=\"button\"\n                    on-click=\"handleDecadePanelShow\"\n                    title=\"{{locale.decadeSelect}}\"\n                    href=\"javascript:;\"\n                >\n                    <span class=\"{{prefixCls}}-year-panel-decade-select-content\">{{startYear}}-{{endYear}}</span>\n                </a>\n                <a\n                    class=\"{{prefixCls}}-year-panel-next-decade-btn\"\n                    role=\"button\"\n                    on-click=\"handleNextDecade\"\n                    title=\"{{locale.nextDecade}}\"\n                    href=\"javascript:;\"\n                />\n            </div>\n            <div class=\"{{prefixCls}}-year-panel-body\">\n                <s-yeartable\n                    locale=\"{{locale}}\"\n                    value=\"{{value}}\"\n                    cellRender=\"{{cellRender}}\"\n                    contentRender=\"{{contentRender}}\"\n                    prefixCls=\"{{prefixCls}}-year-panel\"\n                    startYear=\"{{startYear}}\"\n                    endYear=\"{{endYear}}\"\n                    on-select=\"setAndSelectValue\"\n                />\n            </div>\n            <div class=\"{{prefixCls}}-year-panel-footer\" s-if=\"hasExtraFooter\">\n                <slot name=\"renderExtraFooter\" />\n            </div>\n        </div>\n    </div>"
});

exports["default"] = _default;