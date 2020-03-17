"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _monthPanel = _interopRequireDefault(require("../month/monthPanel"));

var _yearPanel = _interopRequireDefault(require("../year/yearPanel"));

var _decadePanel = _interopRequireDefault(require("../decade/decadePanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd calendar source file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  dataTypes: {
    prefixCls: _san.DataTypes.string,
    value: _san.DataTypes.object,
    showTimePicker: _san.DataTypes.bool,
    locale: _san.DataTypes.object,
    enablePrev: _san.DataTypes.any,
    enableNext: _san.DataTypes.any,
    disabledMonth: _san.DataTypes.func
  },
  initData: function initData() {
    return {
      enablePrev: 1,
      enableNext: 1
    };
  },
  computed: {
    displayYear: function displayYear() {
      var value = this.data.get('value');
      var locale = this.data.get('locale');
      return value && value.format(locale.yearFormat);
    },
    displayMonth: function displayMonth() {
      var value = this.data.get('value');
      var locale = this.data.get('locale');
      var localeData = value && value.localeData();
      return locale.monthFormat ? value && value.format(locale.monthFormat) : localeData && localeData.monthsShort(value);
    },
    displayDay: function displayDay() {
      var value = this.data.get('value');
      var locale = this.data.get('locale');
      return value && value.format(locale.dayFormat);
    }
  },
  handlePreviousYear: function handlePreviousYear() {
    var previous = this.data.get('value').clone();
    previous.add(-1, 'years');
    this.fire('valueChange', previous);
  },
  handleNextYear: function handleNextYear() {
    var next = this.data.get('value').clone();
    next.add(1, 'years');
    this.fire('valueChange', next);
  },
  handlePreviousMonth: function handlePreviousMonth() {
    var previous = this.data.get('value').clone();
    previous.add(-1, 'month');
    this.fire('valueChange', previous);
  },
  handleNextMonth: function handleNextMonth() {
    var next = this.data.get('value').clone();
    next.add(1, 'month');
    this.fire('valueChange', next);
  },
  handleDecadeSelect: function handleDecadeSelect(value) {
    this.fire('panelChange', {
      value: value,
      mode: 'year'
    });
    this.fire('valueChange', value);
  },
  showYearPanel: function showYearPanel(referer) {
    this.data.set('yearPanelReferer', referer);
    this.fire('panelChange', {
      value: null,
      mode: 'year'
    });
  },
  showMonthPanel: function showMonthPanel() {
    this.fire('panelChange', {
      value: null,
      mode: 'month'
    });
  },
  showDecadePanel: function showDecadePanel() {
    this.fire('panelChange', {
      value: null,
      mode: 'decade'
    });
  },
  handleMonthSelect: function handleMonthSelect(value) {
    this.fire('panelChange', {
      value: value,
      mode: 'date'
    });
    this.fire('monthSelect', value);
    this.fire('valueChange', value);
  },
  goYear: function goYear(direction) {
    var next = this.data.get('value').clone();
    next.add(direction, 'years');
    this.fire('valueChange', next);
  },
  handleYearSelect: function handleYearSelect(value) {
    var referer = this.data.get('yearPanelReferer');
    this.data.set('yearPanelReferer', '');
    this.fire('panelChange', {
      value: value,
      mode: referer
    });
    this.fire('valueChange', value);
  },
  components: {
    's-monthpanel': _monthPanel["default"],
    's-yearpanel': _yearPanel["default"],
    's-decadepanel': _decadePanel["default"]
  },
  template: "\n        <div class=\"{{prefixCls}}-header\">\n            <div style=\"position: relative;\">\n                <a\n                    s-if=\"enablePrev && !showTimePicker\"\n                    class=\"{{prefixCls}}-prev-year-btn\"\n                    role=\"button\"\n                    title=\"{{locale.previousYear}}\"\n                    on-click=\"handlePreviousYear\"\n                    href=\"javascript:;\"\n                />\n                <a\n                    s-if=\"enablePrev && !showTimePicker\"\n                    class=\"{{prefixCls}}-prev-month-btn\"\n                    role=\"button\"\n                    title=\"{{locale.previousMonth}}\"\n                    on-click=\"handlePreviousMonth\"\n                    href=\"javascript:;\"\n                />\n                <span class=\"{{prefixCls}}-ym-select\">\n                    <a\n                        class=\"{{prefixCls}}-year-select {{showTimePicker ? prefixCls + '-time-status' : ''}}\"\n                        role=\"button\"\n                        on-click=\"showYearPanel('date')\"\n                        title=\"{{showTimePicker ? '' : locale.yearSelect}}\"\n                    >{{displayYear}}</a>\n                    <a\n                        class=\"{{prefixCls}}-month-select {{showTimePicker ? prefixCls + '-time-status' : ''}}\"\n                        role=\"button\"\n                        on-click=\"showMonthPanel\"\n                        title=\"{{showTimePicker ? '' : locale.monthSelect}}\"\n                    >{{displayMonth}}</a>\n                    <a\n                        s-if=\"showTimePicker\"\n                        class=\"{{prefixCls}}-day-select {{showTimePicker ? prefixCls + '-time-status' : ''}}\"\n                        role=\"button\"\n                    >{{displayDay}}</a>\n                </span>\n                <a\n                    s-if=\"enableNext && !showTimePicker\"\n                    class=\"{{prefixCls}}-next-month-btn\"\n                    role=\"button\"\n                    title=\"{{locale.nextMonth}}\"\n                    on-click=\"handleNextMonth\"\n                    href=\"javascript:;\"\n                />\n                <a\n                    s-if=\"enableNext && !showTimePicker\"\n                    class=\"{{prefixCls}}-next-year-btn\"\n                    role=\"button\"\n                    title=\"{{locale.nextYear}}\"\n                    on-click=\"handleNextYear\"\n                    href=\"javascript:;\"\n                />\n            </div>\n            <s-monthpanel\n                s-if=\"mode === 'month'\"\n                locale=\"{{locale}}\"\n                value=\"{{value}}\"\n                prefixCls=\"{{prefixCls}}\"\n                disabledDate=\"{{disabledMonth}}\"\n                hasExtraFooter=\"{{hasExtraFooter}}\"\n                on-select=\"handleMonthSelect\"\n                on-yearPanelShow=\"showYearPanel('month')\"\n                on-changeYear=\"goYear\"\n            >\n                <slot name=\"renderExtraFooter\" slot=\"renderExtraFooter\" />\n            </s-monthpanel>\n            <s-yearpanel\n                s-if=\"mode === 'year'\"\n                locale=\"{{locale}}\"\n                defaultValue=\"{{value}}\"\n                value=\"{{value}}\"\n                prefixCls=\"{{prefixCls}}\"\n                hasExtraFooter=\"{{hasExtraFooter}}\"\n                on-select=\"handleYearSelect\"\n                on-decadePanelShow=\"showDecadePanel\"\n            >\n                <slot name=\"renderExtraFooter\" slot=\"renderExtraFooter\" />\n            </s-yearpanel>\n            <s-decadepanel\n                s-if=\"mode === 'decade'\"\n                locale=\"{{locale}}\"\n                defaultValue=\"{{value}}\"\n                value=\"{{value}}\"\n                prefixCls=\"{{prefixCls}}\"\n                hasExtraFooter=\"{{hasExtraFooter}}\"\n                on-select=\"handleDecadeSelect\"\n            >\n                <slot name=\"renderExtraFooter\" slot=\"renderExtraFooter\" />\n            </s-decadepanel>\n        </div>\n    "
});

exports["default"] = _default;