"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _base = _interopRequireDefault(require("./base"));

var _calendarHeader = _interopRequireDefault(require("./calendar/calendarHeader"));

var _calendarFooter = _interopRequireDefault(require("./calendar/calendarFooter"));

var _dateTable = _interopRequireDefault(require("./date/dateTable"));

var _dateInput = _interopRequireDefault(require("./date/dateInput"));

var _inherits = _interopRequireDefault(require("../../core/util/inherits"));

var _moment = _interopRequireDefault(require("moment"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd calendar source file
 * @author mayihui@baidu.com
 **/
var _default = (0, _inherits["default"])(_san["default"].defineComponent({
  components: {
    's-calendarheader': _calendarHeader["default"],
    's-calendarfooter': _calendarFooter["default"],
    's-datetable': _dateTable["default"],
    's-dateinput': _dateInput["default"]
  },
  initData: function initData() {
    return {
      visible: true,
      prefixCls: 'santd-calendar',
      showToday: true,
      showDateInput: true,
      focusablePanel: true
    };
  },
  inited: function inited() {
    var mode = this.data.get('mode');
    var value = this.data.get('value') || this.data.get('defaultValue') || (0, _moment["default"])();
    var selectedValue = this.data.get('selectedValue') || this.data.get('defaultSelectedValue');
    var localeCode = this.data.get('localeCode'); // 如果有国际化编码，对moment进行国际化处理

    localeCode && _moment["default"].locale(localeCode);
    localeCode && value && value.locale(localeCode);
    this.data.set('mode', mode || 'date');
    this.data.set('value', value);
    this.data.set('selectedValue', selectedValue);
  },
  // 处理日期点击事件
  handleDateTableSelect: function handleDateTableSelect(value) {
    var selectedValue = this.data.get('selectedValue');
    var showTime = this.data.get('showTime');

    if (!selectedValue && showTime) {
      var timePickerDefaultValue = showTime.defaultValue || (0, _moment["default"])();

      if (timePickerDefaultValue) {
        (0, _util.syncTime)(timePickerDefaultValue, value);
      }
    }

    this.fire('select', {
      value: value
    });
  },
  // 处理弹出层中的输入框输入事件
  handleDateInputChange: function handleDateInputChange(value) {
    if (value) {
      this.fire('select', {
        value: value,
        cause: {
          source: 'dateInput'
        }
      });
    }
  },
  handlePanelChange: function handlePanelChange(_ref) {
    var value = _ref.value,
        mode = _ref.mode;
    this.data.set('mode', mode);

    if (value) {
      this.data.set('value', value);
    }

    this.fire('panelChange', {
      value: value || this.data.get('value'),
      mode: mode
    });
    this.dispatch('santd_calendar_panelChange', {
      value: value || this.data.get('value'),
      mode: mode
    });

    if (this.onPanelChange) {
      this.onPanelChange(value || this.data.get('value'), mode);
    }
  },
  handleToday: function handleToday() {
    var value = this.data.get('value');
    var now = (0, _util.getTodayTime)(value);
    this.fire('select', {
      value: now,
      cause: {
        source: 'todayButton'
      }
    });
    this.dispatch('santd_calendar_select', {
      value: now,
      cause: {
        source: 'todayButton'
      }
    });
  },
  handleOk: function handleOk() {
    var selectedValue = this.data.get('selectedValue');

    if (this.isAllowedDate(selectedValue)) {
      this.fire('ok', selectedValue);
      this.dispatch('santd_calendar_ok', selectedValue);
    }
  },
  handleOpenTimePicker: function handleOpenTimePicker() {
    this.handlePanelChange({
      value: null,
      mode: 'time'
    });
  },
  handleCloseTimePicker: function handleCloseTimePicker() {
    this.handlePanelChange({
      value: null,
      mode: 'date'
    });
  },
  handleDateInputClear: function handleDateInputClear() {
    this.fire('clear');
  },
  getTimeConfig: function getTimeConfig(selectedValue, disabledTime, mode) {
    var showTimePicker = this.data.get('mode') === 'time';

    if (showTimePicker && disabledTime) {
      var config = (0, _util.getTimeConfig)(selectedValue, disabledTime);
      return config[mode];
    }
  },
  template: "\n        <div\n            class=\"{{classes}}\"\n            tabIndex=\"0\"\n        >\n            <div class=\"{{prefixCls}}-panel\" key=\"panel\">\n                <s-dateinput\n                    s-if=\"showDateInput\"\n                    format=\"{{getFormat()}}\"\n                    value=\"{{value || defaultValue}}\"\n                    locale=\"{{locale}}\"\n                    placeholder=\"{{dateInputPlaceholder}}\"\n                    showClear\n                    disabledTime=\"{{disabledTime}}\"\n                    disabledDate=\"{{disabledDate}}\"\n                    prefixCls=\"{{prefixCls}}\"\n                    selectedValue=\"{{selectedValue}}\"\n                    on-clear=\"handleDateInputClear\"\n                    on-change=\"handleDateInputChange\"\n                    inputMode=\"{{inputMode}}\"\n                />\n                <div class=\"{{prefixCls}}-date-panel\">\n                    <s-calendarheader\n                        locale=\"{{locale}}\"\n                        mode=\"{{mode}}\"\n                        value=\"{{value || defaultValue}}\"\n                        on-valueChange=\"setValue\"\n                        on-panelChange=\"handlePanelChange\"\n                        showTimePicker=\"{{mode === 'time'}}\"\n                        prefixCls=\"{{prefixCls}}\"\n                        hasExtraFooter=\"{{hasExtraFooter}}\"\n                    >\n                        <slot name=\"renderExtraFooter\" slot=\"renderExtraFooter\" />\n                    </s-calendarheader>\n                    <div class=\"{{prefixCls}}-time-picker\" s-if=\"showTime && mode === 'time'\">\n                        <div class=\"{{prefixCls}}-time-picker-panel\">\n                            <s-timepicker\n                                class=\"{{prefixCls}}-time-picker-column-{{columns}}\"\n                                showHour=\"{{showHour}}\"\n                                showMinute=\"{{showMinute}}\"\n                                showSecond=\"{{showSecond}}\"\n                                use12Hours=\"{{showTime && showTime.use12Hours}}\"\n                                hideDisabledOptions=\"{{showTime && showTime.hideDisabledOptions}}\"\n                                defaultOpenValue=\"{{showTime && showTime.defaultValue || value}}\"\n                                prefixCls=\"{{prefixCls}}-time-picker\"\n                                columns=\"{{columns}}\"\n                                disabledHours=\"{{getTimeConfig(selectedValue, disabledTime, 'disabledHours')}}\"\n                                disabledMinutes=\"{{getTimeConfig(selectedValue, disabledTime, 'disabledMinutes')}}\"\n                                disabledSeconds=\"{{getTimeConfig(selectedValue, disabledTime, 'disabledSeconds')}}\"\n                                on-change=\"handleDateInputChange\"\n                                value=\"{{showTime && showTime.defaultValue || value}}\"\n                            />\n                        </div>\n                    </div>\n                    <div class=\"{{prefixCls}}-body\">\n                        <s-datetable\n                            locale=\"{{locale}}\"\n                            value=\"{{value || defaultValue}}\"\n                            selectedValue=\"{{selectedValue}}\"\n                            prefixCls=\"{{prefixCls}}\"\n                            disabledDate=\"{{disabledDate}}\"\n                            showWeekNumber=\"{{showWeekNumber}}\"\n                            hasDateRender=\"{{hasDateRender}}\"\n                            on-select=\"handleDateTableSelect\"\n                        >\n                            <slot name=\"dateRender\" slot=\"dateRender\" var-current=\"{{current}}\" />\n                        </s-datetable>\n                    </div>\n                    <s-calendarfooter\n                        mode=\"{{mode}}\"\n                        locale=\"{{locale}}\"\n                        prefixCls=\"{{prefixCls}}\"\n                        showToday=\"{{showToday}}\"\n                        disabledTime=\"{{disabledTime}}\"\n                        showTimePicker=\"{{mode === 'time'}}\"\n                        showDateInput=\"{{showDateInput}}\"\n                        showTime=\"{{showTime}}\"\n                        selectedValue=\"{{selectedValue}}\"\n                        value=\"{{value}}\"\n                        disabledDate=\"{{disabledDate}}\"\n                        disabled=\"{{!selectedValue || !isAllowedDate(selectedValue)}}\"\n                        hasExtraFooter=\"{{hasExtraFooter}}\"\n                        on-today=\"handleToday\"\n                        on-ok=\"handleOk\"\n                        on-openTimePicker=\"handleOpenTimePicker\"\n                        on-closeTimePicker=\"handleCloseTimePicker\"\n                    >\n                        <slot name=\"renderExtraFooter\" slot=\"renderExtraFooter\" />\n                    </s-calendarfooter>\n                </div>\n            </div>\n        </div>\n    "
}), _base["default"]);

exports["default"] = _default;