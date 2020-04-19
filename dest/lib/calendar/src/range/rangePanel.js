"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _calendarHeader = _interopRequireDefault(require("../calendar/calendarHeader"));

var _dateTable = _interopRequireDefault(require("../date/dateTable"));

var _dateInput = _interopRequireDefault(require("../date/dateInput"));

var _index = require("../util/index");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd calendar range panel file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  components: {
    's-calendarheader': _calendarHeader["default"],
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
    var value = this.data.get('value');
    var defaultValue = this.data.get('defaultValue');
    var selectedValue = this.data.get('selectedValue');
    var defaultSelectedValue = this.data.get('defaultSelectedValue');
    this.data.set('mode', mode || 'date');
    this.data.set('value', value || defaultValue || (0, _moment["default"])());
    this.data.set('selectedValue', selectedValue || defaultSelectedValue);
  },
  handleDateTableSelect: function handleDateTableSelect(value) {
    this.fire('select', value);
  },
  handleDateInputChange: function handleDateInputChange(value) {
    this.fire('inputChange', value);
  },
  handlePanelChange: function handlePanelChange(_ref) {
    var value = _ref.value,
        mode = _ref.mode;
    this.fire('panelChange', {
      value: value,
      mode: mode
    });
  },
  handleValueChange: function handleValueChange(value) {
    this.fire('valueChange', value);
  },
  handleDayHover: function handleDayHover(value) {
    this.fire('dayHover', value);
  },
  handleInputChange: function handleInputChange(value) {
    this.fire('inputChange', value);
  },
  handleDateInputClear: function handleDateInputClear() {
    this.fire('clear');
  },
  dateInputValue: function dateInputValue() {
    var selectedValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var direction = this.data.get('direction');
    var value = selectedValue[direction === 'left' ? 0 : 1];
    return value && value.clone();
  },
  getTimeConfig: function getTimeConfig(selectedValue, disabledTime, mode) {
    var showTimePicker = this.data.get('showTimePicker');

    if (showTimePicker && disabledTime) {
      var config = (0, _index.getTimeConfig)(selectedValue, disabledTime);
      return config[mode];
    }
  },
  template: "\n        <div class=\"{{prefixCls}}-range-part {{prefixCls}}-range-{{direction}}\">\n            <div class=\"{{prefixCls}}-panel\" key=\"panel\">\n                <s-dateinput\n                    s-if=\"showDateInput\"\n                    format=\"{{format}}\"\n                    locale=\"{{locale}}\"\n                    prefixCls=\"{{prefixCls}}\"\n                    disabledDate=\"{{disabledDate}}\"\n                    placeholder=\"{{placeholder}}\"\n                    disabledTime=\"{{disabledTime}}\"\n                    value=\"{{value || defaultValue}}\"\n                    showClear=\"{{false}}\"\n                    selectedValue=\"{{dateInputValue(selectedValue)}}\"\n                    on-clear=\"handleDateInputClear\"\n                    on-change=\"handleDateInputChange\"\n                />\n                <div>\n                    <s-calendarheader\n                        locale=\"{{locale}}\"\n                        mode=\"{{mode}}\"\n                        value=\"{{value || defaultValue}}\"\n                        showTimePicker=\"{{showTimePicker}}\"\n                        prefixCls=\"{{prefixCls}}\"\n                        enableNext=\"{{enableNext}}\"\n                        enablePrev=\"{{enablePrev}}\"\n                        disabledMonth=\"{{disabledMonth}}\"\n                        on-valueChange=\"handleValueChange\"\n                        on-panelChange=\"handlePanelChange\"\n                    />\n                    <div class=\"{{prefixCls}}-time-picker\" s-if=\"showTimePicker\">\n                        <div class=\"{{prefixCls}}-time-picker-panel\">\n                            <slot name=\"timepicker\" />\n                        </div>\n                    </div>\n                    <div class=\"{{prefixCls}}-body\">\n                        <s-datetable\n                            locale=\"{{locale}}\"\n                            value=\"{{value || defaultValue}}\"\n                            hoverValue=\"{{hoverValue}}\"\n                            showTimePicker=\"{{showTimePicker}}\"\n                            selectedValue=\"{{selectedValue}}\"\n                            prefixCls=\"{{prefixCls}}\"\n                            disabledDate=\"{{disabledDate}}\"\n                            showWeekNumber=\"{{showWeekNumber}}\"\n                            hasDateRender=\"{{hasDateRender}}\"\n                            on-select=\"handleDateTableSelect\"\n                            on-dayHover=\"handleDayHover\"\n                        >\n                            <slot name=\"dateRender\" slot=\"dateRender\" var-current=\"{{current}}\" />\n                        </s-datetable>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "
});

exports["default"] = _default;