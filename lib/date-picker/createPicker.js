"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _san = _interopRequireDefault(require("san"));

var _monthCalendar = _interopRequireDefault(require("../calendar/src/monthCalendar"));

var _util = require("../core/util");

var _trigger = _interopRequireDefault(require("../core/trigger"));

var _icon = _interopRequireDefault(require("../icon"));

var _placements = _interopRequireDefault(require("../calendar/src/placements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd date picker createpicker file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('calendar')();

function _default(calendar) {
  return _san["default"].defineComponent({
    computed: {
      displayValue: function displayValue() {
        var value = this.data.get('value');
        var format = this.data.get('format');
        return value && value.format(format);
      },
      calendarClasses: function calendarClasses() {
        var classArr = [];
        var showTime = this.data.get('showTime');
        showTime && classArr.push("".concat(prefixCls, "-time"));
        calendar === _monthCalendar["default"] && classArr.push("".concat(prefixCls, "-month"));
        return classArr.join(' ');
      }
    },
    initData: function initData() {
      return {
        prefixCls: prefixCls,
        allowClear: true,
        showToday: true,
        trigger: 'click',
        placements: _placements["default"]
      };
    },
    inited: function inited() {
      this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
      this.data.set('hasExtraFooter', !!this.sourceSlots.named.renderExtraFooter);
      this.data.set('hasDateRender', !!this.sourceSlots.named.dateRender);
      this.data.set('hasSuffixIcon', !!this.sourceSlots.named.suffixIcon);
    },
    handleChange: function handleChange(data) {
      var format = this.data.get('format');
      var value = data.value;
      var cause = data.cause || {};
      this.data.set('value', value.clone(), {
        force: true
      });
      this.fire('change', {
        date: value,
        dateString: value && value.format(format)
      });
      this.dispatch('UI:form-item-interact', {
        fieldValue: value,
        type: 'change'
      });

      if (cause.source === 'keyboard' || cause.source === 'dateInputSelect' || !this.data.get('showTime') && cause.source !== 'dateInput' || cause.source === 'todayButton') {
        this.handleOpenChange(false);
      }
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
      this.dispatch('UI:form-item-interact', {
        fieldValue: '',
        type: 'change',
        e: e
      });
    },
    handleOk: function handleOk(value) {
      this.data.set('value', value);
      this.fire('ok', value);
      this.handleOpenChange(false);
    },
    components: {
      's-calendar': calendar,
      's-icon': _icon["default"],
      's-trigger': _trigger["default"]
    },
    focus: function focus() {
      this.ref('input').focus();
    },
    blur: function blur() {
      this.ref('input').blur();
    },
    template: "<span\n            id=\"{{id}}\"\n            class=\"{{pickerClass}}\"\n            style=\"{{!showTime && 'min-width:195px;'}}\"\n        >\n            <s-trigger\n                prefixCls=\"".concat(prefixCls, "-picker-container\"\n                popupTransitionName=\"{{transitionName}}\"\n                dropdownClassName=\"{{dropdownClassName}}\"\n                getCalendarContainer=\"{{getCalendarContainer}}\"\n                visible=\"{{open}}\"\n                action=\"{{disabled ? [] : trigger}}\"\n                builtinPlacements=\"{{placements}}\"\n                popupPlacement=\"bottomLeft\"\n                destroyPopupOnHide=\"{{true}}\"\n                on-visibleChange=\"handleOpenChange\"\n            >\n                <s-calendar\n                    slot=\"popup\"\n                    style=\"{{popupStyle}}\"\n                    format=\"{{format}}\"\n                    disabledDate=\"{{disabledDate}}\"\n                    disabledTime=\"{{showTime ? disabledTime : null}}\"\n                    value=\"{{value || defaultValue}}\"\n                    selectedValue=\"{{value}}\"\n                    timePicker=\"{{timePicker}}\"\n                    dateInputPlaceholder=\"{{placeholder || locale.lang.placeholder}}\"\n                    prefixCls=\"").concat(prefixCls, "\"\n                    customClassName=\"{{calendarClasses}}\"\n                    format=\"{{format}}\"\n                    showToday=\"{{showToday}}\"\n                    showTime=\"{{showTime}}\"\n                    locale=\"{{locale.lang}}\"\n                    localeCode=\"{{localeCode}}\"\n                    mode=\"{{mode}}\"\n                    hasExtraFooter=\"{{hasExtraFooter}}\"\n                    hasDateRender=\"{{hasDateRender}}\"\n                    on-select=\"handleChange\"\n                    on-clear=\"handleClearSelection\"\n                    on-ok=\"handleOk\"\n                >\n                    <slot name=\"renderExtraFooter\" slot=\"renderExtraFooter\" />\n                    <slot name=\"dateRender\" slot=\"dateRender\" var-current=\"{{current}}\" />\n                </s-calendar>\n                <input\n                    style=\"{{showTime ? 'min-width: 195px;' : ''}}\"\n                    disabled=\"{{disabled}}\"\n                    readOnly\n                    value=\"{{displayValue}}\"\n                    placeholder=\"{{placeholder || locale.lang.placeholder}}\"\n                    class=\"{{pickerInputClass}}\"\n                    tabIndex=\"{{tabIndex}}\"\n                    name=\"{{name}}\"\n                    autocomplete=\"off\"\n                    s-ref=\"input\"\n                />\n                <s-icon\n                    s-if=\"!disabled && allowClear && value\"\n                    type=\"close-circle\"\n                    class=\"").concat(prefixCls, "-picker-clear\"\n                    theme=\"filled\"\n                    on-click=\"handleClearSelection\"\n                />\n                <span class=\"{{prefixCls}}-picker-icon\" s-if=\"hasSuffixIcon\">\n                    <slot name=\"suffixIcon\" />\n                </span>\n                <s-icon class=\"").concat(prefixCls, "-picker-icon\" type=\"calendar\" s-else />\n            </s-trigger>\n        </span>")
  });
}