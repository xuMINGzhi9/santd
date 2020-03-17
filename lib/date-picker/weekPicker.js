"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _calendar = _interopRequireDefault(require("../calendar/src/calendar"));

var _moment = _interopRequireDefault(require("moment"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

var _trigger = _interopRequireDefault(require("../core/trigger"));

var _placements = _interopRequireDefault(require("../calendar/src/placements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd week picker createpicker file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('calendar')();

var _default = _san["default"].defineComponent({
  computed: {
    displayValue: function displayValue() {
      var value = this.data.get('value');
      var format = this.data.get('format');
      return value && value.format(format);
    }
  },
  initData: function initData() {
    return {
      allowClear: true,
      format: 'gggg-wo',
      placements: _placements["default"],
      trigger: 'click'
    };
  },
  inited: function inited() {
    this.data.set('defaultValue', this.data.get('defaultPickerValue') || (0, _moment["default"])());
    this.data.set('hasExtraFooter', !!this.sourceSlots.named.renderExtraFooter);
    this.data.set('hasSuffixIcon', !!this.sourceSlots.named.suffixIcon);
  },
  handleCalendarChange: function handleCalendarChange(data) {
    this.data.set('value', data.value);
  },
  handleOpenChange: function handleOpenChange(open) {
    this.data.set('open', open);
    this.fire('openChange', open);
  },
  handleClearSelection: function handleClearSelection(e) {
    e.preventDefault();
    e.stopPropagation();
    this.data.set('value', null);
    this.fire('change', {
      date: null,
      dateString: null
    });
  },
  handleChange: function handleChange(data) {
    var value = data.value;
    var cause = data.cause || {};
    var format = this.data.get('format');
    this.data.set('value', value, {
      force: true
    });
    this.fire('change', {
      date: value,
      dateString: value && value.format(format)
    });

    if (cause.source === 'keyboard' || cause.source === 'dateInputSelect' || !this.data.get('showTime') && cause.source !== 'dateInput' || cause.source === 'todayButton') {
      this.handleOpenChange(false);
    }
  },
  components: {
    's-icon': _icon["default"],
    's-trigger': _trigger["default"],
    's-calendar': _calendar["default"]
  },
  template: "<span\n            id=\"{{id}}\"\n            class=\"{{pickerClass}}\"\n        >\n            <s-trigger\n                prefixCls=\"".concat(prefixCls, "-picker-container\"\n                popupTransitionName=\"{{transitionName}}\"\n                dropdownClassName=\"{{dropdownClassName}}\"\n                getCalendarContainer=\"{{getCalendarContainer}}\"\n                visible=\"{{open}}\"\n                action=\"{{disabled ? [] : trigger}}\"\n                builtinPlacements=\"{{placements}}\"\n                popupPlacement=\"bottomLeft\"\n                on-visibleChange=\"handleOpenChange\"\n            >\n                <s-calendar\n                    slot=\"popup\"\n                    style=\"{{popupStyle}}\"\n                    showWeekNumber=\"{{true}}\"\n                    format=\"{{format}}\"\n                    showDateInput=\"{{false}}\"\n                    showToday=\"{{false}}\"\n                    disabledDate=\"{{disabledDate}}\"\n                    value=\"{{value || defaultValue}}\"\n                    locale=\"{{locale.lang}}\"\n                    localeCode=\"{{localeCode}}\"\n                    hasExtraFooter=\"{{hasExtraFooter}}\"\n                    on-select=\"handleChange\"\n                    on-panelChange=\"handleCalendarChange\"\n                    on-clear=\"handleClearSelection\"\n                >\n                    <slot name=\"renderExtraFooter\" slot=\"renderExtraFooter\" />\n                </s-calendar>\n                <input\n                    disabled=\"{{disabled}}\"\n                    readOnly\n                    value=\"{{displayValue}}\"\n                    placeholder=\"{{placeholder || locale.lang.placeholder}}\"\n                    class=\"{{pickerInputClass}}\"\n                    tabIndex=\"{{tabIndex}}\"\n                    name=\"{{name}}\"\n                    style=\"{{inputStyle}}\"\n                    s-ref=\"input\"\n                />\n                <s-icon\n                    s-if=\"!disabled && allowClear && value\"\n                    type=\"close-circle\"\n                    class=\"").concat(prefixCls, "-picker-clear\"\n                    theme=\"filled\"\n                    on-click=\"handleClearSelection\"\n                />\n                <span class=\"{{prefixCls}}-picker-icon\" s-if=\"hasSuffixIcon\">\n                    <slot name=\"suffixIcon\" />\n                </span>\n                <s-icon class=\"").concat(prefixCls, "-picker-icon\" type=\"calendar\" s-else />\n            </s-trigger>\n        </span>\n    ")
});

exports["default"] = _default;