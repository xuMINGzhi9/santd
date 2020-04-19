"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _base = _interopRequireDefault(require("./base"));

var _rangePanel = _interopRequireDefault(require("./range/rangePanel"));

var _todayButton = _interopRequireDefault(require("./calendar/todayButton"));

var _okButton = _interopRequireDefault(require("./calendar/okButton"));

var _timepickerButton = _interopRequireDefault(require("./calendar/timepickerButton"));

var _tag = _interopRequireDefault(require("../../tag"));

var _inherits = _interopRequireDefault(require("../../core/util/inherits"));

var _moment = _interopRequireDefault(require("moment"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isEmptyArray(arr) {
  return Array.isArray(arr) && (arr.length === 0 || arr.every(function (i) {
    return !i;
  }));
}

function getValueFromSelectedValue(selectedValue) {
  var _selectedValue = _slicedToArray(selectedValue, 2),
      start = _selectedValue[0],
      end = _selectedValue[1];

  if (end && (start === undefined || start === null)) {
    start = end.clone().subtract(1, 'month');
  }

  if (start && (end === undefined || end === null)) {
    end = start.clone().add(1, 'month');
  }

  return [start, end];
}

function normalizeAnchor(data, init) {
  var selectedValue = data.get('selectedValue') || init && data.get('defaultSelectedValue');
  var value = data.get('value') || init && data.get('defaultValue');
  var normalizedValue = value ? getValueFromSelectedValue(value) : getValueFromSelectedValue(selectedValue);
  return !isEmptyArray(normalizedValue) ? normalizedValue : init && [(0, _moment["default"])(), (0, _moment["default"])().add(1, 'months')];
}

var _default = (0, _inherits["default"])(_san["default"].defineComponent({
  initData: function initData() {
    return {
      prefixCls: 'santd-calendar',
      type: 'both',
      seperator: '~',
      defaultSelectedValue: [],
      showToday: true,
      showDateInput: true,
      panelTriggerSource: '',
      hoverValue: [],
      selectedValue: [],
      disabledTime: function disabledTime() {},
      mode: ['date', 'date']
    };
  },
  computed: {
    classes: function classes() {
      var prefixCls = this.data.get('prefixCls');
      var showTimePicker = this.data.get('showTimePicker');
      var showWeekNumber = this.data.get('showWeekNumber');
      var classArr = [prefixCls, "".concat(prefixCls, "-range")];
      showTimePicker && classArr.push("".concat(prefixCls, "-show-time-picker"));
      showWeekNumber && classArr.push("".concat(prefixCls, "-week-number"));
      return classArr;
    },
    hasSelectedValue: function hasSelectedValue() {
      var selectedValue = this.data.get('selectedValue') || [];
      return !!selectedValue[1] && !!selectedValue[0];
    },
    isAllowedDateAndTime: function isAllowedDateAndTime() {
      var selectedValue = this.data.get('selectedValue') || [];
      var disabledDate = this.data.get('disabledDate');
      var disabledStartTime = this.data.get('disabledStartTime');
      var disabledEndTime = this.data.get('disabledEndTime');
      return (0, _util.isAllowedDate)(selectedValue[0], disabledDate, disabledStartTime) && (0, _util.isAllowedDate)(selectedValue[1], disabledDate, disabledEndTime);
    },
    isClosestMonths: function isClosestMonths() {
      var startValue = this.data.get('getStartValue');
      var endValue = this.data.get('getEndValue');
      var nextMonthOfStart = startValue.clone().add(1, 'months');
      return nextMonthOfStart.year() === endValue.year() && nextMonthOfStart.month() === endValue.month();
    },
    disabledStartTime: function disabledStartTime() {
      var disabledTime = this.data.get('disabledTime');
      return function (time) {
        return disabledTime(time, 'start');
      };
    },
    disabledEndTime: function disabledEndTime() {
      var disabledTime = this.data.get('disabledTime');
      return function (time) {
        return disabledTime(time, 'end');
      };
    },
    disabledStartMonth: function disabledStartMonth() {
      var value = this.data.get('value');
      return function (month) {
        return month.isAfter(value[1], 'month');
      };
    },
    disabledEndMonth: function disabledEndMonth() {
      var value = this.data.get('value');
      return function (month) {
        return month.isBefore(value[0], 'month');
      };
    },
    getStartValue: function getStartValue() {
      var selectedValue = this.data.get('selectedValue') || [];
      var showTimePicker = this.data.get('showTimePicker');
      var value = this.data.get('value');
      var mode = this.data.get('mode');
      var panelTriggerSource = this.data.get('panelTriggerSource');

      if (!value) {
        return;
      }

      var startValue = value[0].clone(); // keep selectedTime when select date

      if (selectedValue[0] && this.data.get('showTime')) {
        startValue = startValue.clone();
        (0, _util.syncTime)(selectedValue[0], startValue);
      }

      if (showTimePicker && selectedValue[0]) {
        startValue = selectedValue[0];
      } // Adjust month if date not align


      if (panelTriggerSource === 'end' && mode[0] === 'date' && mode[1] === 'date' && startValue.isSame(value[1], 'month')) {
        startValue = startValue.clone().subtract(1, 'month');
      }

      return startValue;
    },
    getEndValue: function getEndValue() {
      var selectedValue = this.data.get('selectedValue') || [];
      var showTimePicker = this.data.get('showTimePicker');
      var value = this.data.get('value');
      var mode = this.data.get('mode');
      var panelTriggerSource = this.data.get('panelTriggerSource');

      if (!value) {
        return;
      }

      var endValue = value[1] ? value[1].clone() : value[0].clone().add(1, 'month'); // keep selectedTime when select date

      if (selectedValue[1] && this.data.get('showTime')) {
        (0, _util.syncTime)(selectedValue[1], endValue);
      }

      if (showTimePicker) {
        endValue = selectedValue[1] ? selectedValue[1] : this.data.get('getStartValue');
      } // Adjust month if date not align


      if (!showTimePicker && panelTriggerSource !== 'end' && mode[0] === 'date' && mode[1] === 'date' && endValue.isSame(value[0], 'month')) {
        endValue = endValue.clone().add(1, 'month');
      }

      return endValue;
    },
    isTodayInView: function isTodayInView() {
      var startValue = this.data.get('getStartValue');
      var endValue = this.data.get('getEndValue');

      if (!startValue) {
        return;
      }

      var todayTime = (0, _util.getTodayTime)(startValue);
      var thisMonth = todayTime.month();
      var thisYear = todayTime.year();
      return startValue.year() === thisYear && startValue.month() === thisMonth || endValue.year() === thisYear && endValue.month() === thisMonth;
    },
    rangesName: function rangesName() {
      return Object.keys(this.data.get('ranges') || {});
    }
  },
  inited: function inited() {
    var selectedValue = this.data.get('selectedValue') || this.data.get('defaultSelectedValue');
    var value = normalizeAnchor(this.data, true);
    var localeCode = this.data.get('localeCode');
    this.data.set('selectedValue', selectedValue);
    this.data.set('prevSelectedValue', selectedValue);
    this.data.set('firstSelectedValue', null);
    localeCode && _moment["default"].locale(localeCode);
    localeCode && value[0].locale(localeCode);
    localeCode && value[1].locale(localeCode);
    this.data.set('value', value);
  },
  fireSelectValueChange: function fireSelectValueChange(selectedValue, direct, cause) {
    var _this$data$get = this.data.get(),
        showTime = _this$data$get.showTime,
        prevSelectedValue = _this$data$get.prevSelectedValue;

    if (showTime && showTime.defaultValue) {
      var timePickerDefaultValue = showTime.defaultValue;

      if (!prevSelectedValue[0] && selectedValue[0]) {
        (0, _util.syncTime)(timePickerDefaultValue[0], selectedValue[0]);
      }

      if (!prevSelectedValue[1] && selectedValue[1]) {
        (0, _util.syncTime)(timePickerDefaultValue[1], selectedValue[1]);
      }
    }

    if (selectedValue[0] && !selectedValue[1]) {
      this.data.set('firstSelectedValue', selectedValue[0]);
      this.fireHoverValueChange(selectedValue.concat());
    }

    if (direct || selectedValue[0] && selectedValue[1]) {
      this.data.set('prevSelectedValue', selectedValue);
      this.data.set('firstSelectedValue', null);
      this.fireHoverValueChange([]);
      this.fire('select', {
        selectedValue: selectedValue,
        cause: cause
      });
    }
  },
  compare: function compare(v1, v2) {
    if (this.data.get('showTime')) {
      return v1.diff(v2);
    }

    return v1.diff(v2, 'days');
  },
  isMonthYearPanelShow: function isMonthYearPanelShow(mode) {
    return ['month', 'year', 'decade'].indexOf(mode) > -1;
  },
  fireHoverValueChange: function fireHoverValueChange(hoverValue) {
    this.data.set('hoverValue', hoverValue);
    this.fire('hoverChange', hoverValue);
  },
  handleClear: function handleClear() {
    this.fireSelectValueChange([], true);
    this.fire('clear');
  },
  handleRangeSelect: function handleRangeSelect(value) {
    var _this$data$get2 = this.data.get(),
        prevSelectedValue = _this$data$get2.prevSelectedValue,
        firstSelectedValue = _this$data$get2.firstSelectedValue;

    var nextSelectedValue;

    if (!firstSelectedValue) {
      (0, _util.syncTime)(prevSelectedValue[0], value);
      nextSelectedValue = [value];
    } else if (this.compare(firstSelectedValue, value) < 0) {
      (0, _util.syncTime)(prevSelectedValue[1], value);
      nextSelectedValue = [firstSelectedValue, value];
    } else {
      (0, _util.syncTime)(prevSelectedValue[0], value);
      (0, _util.syncTime)(prevSelectedValue[1], firstSelectedValue);
      nextSelectedValue = [value, firstSelectedValue];
    }

    this.fireSelectValueChange(nextSelectedValue);
  },
  handleDayHover: function handleDayHover(value) {
    if (!this.data.get('hoverValue').length) {
      return;
    }

    var _this$data$get3 = this.data.get(),
        firstSelectedValue = _this$data$get3.firstSelectedValue;

    if (!firstSelectedValue) {
      if (this.data.get('hoverValue').length) {
        this.data.set('hoverValue', []);
      }
    } else {
      var hoverValue = this.compare(value, firstSelectedValue) < 0 ? [value, firstSelectedValue] : [firstSelectedValue, value];
      this.fireHoverValueChange(hoverValue);
    }
  },
  handleToday: function handleToday() {
    var startValue = (0, _util.getTodayTime)(this.data.get('value')[0]);
    var endValue = startValue.clone().add(1, 'months');
    this.data.set('value', [startValue, endValue]);
  },
  handleTimePicker: function handleTimePicker(visible) {
    this.data.set('showTimePicker', visible);
  },
  handleOk: function handleOk() {
    var selectedValue = this.data.get('selectedValue');
    var isAllowedDateAndTime = this.data.get('isAllowedDateAndTime');

    if (isAllowedDateAndTime) {
      this.fire('ok', selectedValue);
    }
  },
  handleStartValueChange: function handleStartValueChange(leftValue) {
    this.data.set('value[0]', leftValue);
    this.fire('valueChange', this.data.get('value'));
  },
  handleEndValueChange: function handleEndValueChange(rightValue) {
    this.data.set('value[1]', rightValue);
    this.fire('valueChange', this.data.get('value'));
  },
  handleStartPanelChange: function handleStartPanelChange(_ref) {
    var value = _ref.value,
        mode = _ref.mode;
    var newMode = [mode, this.data.get('mode')[1]];
    var prevValue = this.data.get('value');

    if (!this.data.get('propMode')) {
      this.data.set('mode', newMode);
    }

    this.data.set('panelTriggerSource', 'start');
    var newValue = [value || prevValue[0], prevValue[1]];
    this.fire('panelChange', {
      value: newValue,
      mode: newMode
    });
  },
  handleEndPanelChange: function handleEndPanelChange(_ref2) {
    var value = _ref2.value,
        mode = _ref2.mode;
    var newMode = [this.data.get('mode')[0], mode];
    var prevValue = this.data.get('value');

    if (!this.data.get('propMode')) {
      this.data.set('mode', newMode);
    }

    this.data.set('panelTriggerSource', 'end');
    var newValue = [prevValue[0], value || prevValue[1]];
    this.fire('panelChange', {
      value: newValue,
      mode: newMode
    });
  },
  handleInputSelect: function handleInputSelect(direction, value, cause) {
    if (!value) {
      return;
    }

    var originalValue = this.data.get('selectedValue');
    var selectedValue = originalValue.concat();
    var index = direction === 'left' ? 0 : 1;
    selectedValue[index] = value;

    if (selectedValue[0] && this.compare(selectedValue[0], selectedValue[1]) > 0) {
      selectedValue[1 - index] = this.data.get('showTimePicker') ? selectedValue[index] : undefined;
    }

    this.fire('inputSelect', selectedValue);
    this.fireSelectValueChange(selectedValue, null, cause || {
      source: 'dateInput'
    });
  },
  handleStartInputChange: function handleStartInputChange(value) {
    this.handleInputSelect('left', value);
  },
  handleEndInputChange: function handleEndInputChange(value) {
    this.handleInputSelect('right', value);
  },
  getTimeConfig: function getTimeConfig(selectedValue, disabledTime, mode) {
    var showTimePicker = this.data.get('showTimePicker');

    if (showTimePicker && disabledTime) {
      var config = (0, _util.getTimeConfig)(selectedValue, disabledTime);
      return config[mode];
    }
  },
  updated: function updated() {
    this.data.set('prevSelectedValue', this.data.get('selectedValue'));
  },
  components: {
    's-rangepanel': _rangePanel["default"],
    's-todaybutton': _todayButton["default"],
    's-timepickerbutton': _timepickerButton["default"],
    's-okbutton': _okButton["default"],
    's-tag': _tag["default"]
  },
  template: "\n        <div class=\"{{classes}}\" tabIndex=\"0\">\n            <div class=\"{{prefixCls}}-panel\">\n                <a\n                    s-if=\"showClear && selectedValue[0] && selectedValue[1]\"\n                    role=\"button\"\n                    on-click=\"handleClear\"\n                >\n                    <span class=\"{{prefixCls}}-clear-btn\" />\n                </a>\n                <div class=\"{{prefixCls}}-date-panel\">\n                    <s-rangepanel\n                        value=\"{{getStartValue}}\"\n                        locale=\"{{locale}}\"\n                        selectedValue=\"{{selectedValue}}\"\n                        hoverValue=\"{{hoverValue}}\"\n                        direction=\"left\"\n                        disabledTime=\"{{disabledStartTime}}\"\n                        disabledMonth=\"{{disabledStartMonth}}\"\n                        format=\"{{getFormat()}}\"\n                        placeholder=\"{{dateInputPlaceholder[0]}}\"\n                        showDateInput=\"{{showDateInput}}\"\n                        showTimePicker=\"{{showTimePicker}}\"\n                        enablePrev\n                        enableNext=\"{{!isClosestMonths || isMonthYearPanelShow(mode[1])}}\"\n                        mode=\"{{mode[0]}}\"\n                        disabledDate=\"{{disabledDate}}\"\n                        hasDateRender=\"{{hasDateRender}}\"\n                        on-select=\"handleRangeSelect\"\n                        on-dayHover=\"handleDayHover\"\n                        on-valueChange=\"handleStartValueChange\"\n                        on-panelChange=\"handleStartPanelChange\"\n                        on-inputChange=\"handleStartInputChange\"\n                    >\n                        <slot name=\"dateRender\" slot=\"dateRender\" var-current=\"{{current}}\" />\n                        <s-timepicker\n                            slot=\"timepicker\"\n                            class=\"{{prefixCls}}-time-picker-column-{{columns}}\"\n                            showHour=\"{{showHour}}\"\n                            showMinute=\"{{showMinute}}\"\n                            showSecond=\"{{showSecond}}\"\n                            use12Hours=\"{{showTime && showTime.use12Hours}}\"\n                            hideDisabledOptions=\"{{showTime && showTime.hideDisabledOptions}}\"\n                            defaultOpenValue=\"{{showTime && showTime.defaultValue && showTime.defaultValue[0] || getStartValue}}\"\n                            prefixCls=\"{{prefixCls}}-time-picker\"\n                            columns=\"{{columns}}\"\n                            disabledHours=\"{{getTimeConfig(selectedValue, disabledStartTime, 'disabledHours')}}\"\n                            disabledMinutes=\"{{getTimeConfig(selectedValue, disabledStartTime, 'disabledMinutes')}}\"\n                            disabledSeconds=\"{{getTimeConfig(selectedValue, disabledStartTime, 'disabledSeconds')}}\"\n                            on-change=\"handleStartInputChange\"\n                            value=\"{{getStartValue}}\"\n                        />\n                    </s-rangepanel>\n                    <span class=\"{{prefixCls}}-range-middle\">{{seperator}}</span>\n                    <s-rangepanel\n                        value=\"{{getEndValue}}\"\n                        locale=\"{{locale}}\"\n                        selectedValue=\"{{selectedValue}}\"\n                        hoverValue=\"{{hoverValue}}\"\n                        direction=\"right\"\n                        disabledTime=\"{{disabledEndTime}}\"\n                        disabledMonth=\"{{disabledEndMonth}}\"\n                        format=\"{{getFormat()}}\"\n                        placeholder=\"{{dateInputPlaceholder[1]}}\"\n                        showDateInput=\"{{showDateInput}}\"\n                        showTimePicker=\"{{showTimePicker}}\"\n                        enableNext\n                        enablePrev=\"{{!isClosestMonths || isMonthYearPanelShow(mode[0])}}\"\n                        mode=\"{{mode[1]}}\"\n                        disabledDate=\"{{disabledDate}}\"\n                        hasDateRender=\"{{hasDateRender}}\"\n                        on-select=\"handleRangeSelect\"\n                        on-dayHover=\"handleDayHover\"\n                        on-valueChange=\"handleEndValueChange\"\n                        on-panelChange=\"handleEndPanelChange\"\n                        on-inputChange=\"handleEndInputChange\"\n                    >\n                        <slot name=\"dateRender\" slot=\"dateRender\" var-current=\"{{current}}\" />\n                        <s-timepicker\n                            slot=\"timepicker\"\n                            class=\"{{prefixCls}}-time-picker-column-{{columns}}\"\n                            showHour=\"{{showHour}}\"\n                            showMinute=\"{{showMinute}}\"\n                            showSecond=\"{{showSecond}}\"\n                            use12Hours=\"{{showTime && showTime.use12Hours}}\"\n                            hideDisabledOptions=\"{{showTime && showTime.hideDisabledOptions}}\"\n                            defaultOpenValue=\"{{showTime && showTime.defaultValue && showTime.defaultValue[1] || getEndValue}}\"\n                            prefixCls=\"{{prefixCls}}-time-picker\"\n                            columns=\"{{columns}}\"\n                            disabledHours=\"{{getTimeConfig(selectedValue, disabledEndTime, 'disabledHours')}}\"\n                            disabledMinutes=\"{{getTimeConfig(selectedValue, disabledEndTime, 'disabledMinutes')}}\"\n                            disabledSeconds=\"{{getTimeConfig(selectedValue, disabledEndTime, 'disabledSeconds')}}\"\n                            on-change=\"handleEndInputChange\"\n                            value=\"{{getEndValue}}\"\n                        />\n                    </s-rangepanel>\n                </div>\n                <div\n                    class=\"{{prefixCls}}-footer {{prefixCls}}-range-bottom {{showTime ? prefixCls + '-footer-show-ok' : ''}}\"\n                    s-if=\"showToday || showTime || hasExtraFooter || ranges\"\n                >\n                    <div class=\"{{prefixCls}}-footer-btn\">\n                        <div s-if=\"rangesName.length\" class=\"{{prefixCls}}-footer-extra {{prefixCls}}-range-quick-selector\">\n                            <s-tag\n                                s-for=\"range in rangesName\"\n                                color=\"blue\"\n                                on-mouseenter=\"native:fireHoverValueChange(ranges[range])\"\n                                on-mouseleave=\"native:fireHoverValueChange([])\"\n                                on-click=\"fireSelectValueChange(ranges[range])\"\n                            >\n                                {{range}}\n                            </s-tag>\n                        </div>\n                        <div class=\"{{prefixCls}}-footer-extra\" s-else-if=\"hasExtraFooter\">\n                            <slot name=\"renderExtraFooter\" />\n                        </div>\n                        <s-todaybutton\n                            s-if=\"showToday\"\n                            disabled=\"{{isTodayInView}}\"\n                            value=\"{{value[0]}}\"\n                            text=\"{{locale.backToToday}}\"\n                            disabledDate=\"{{disabledDate}}\"\n                            locale=\"{{locale}}\"\n                            prefixCls=\"{{prefixCls}}\"\n                            on-today=\"handleToday\"\n                        />\n                        <s-timepickerbutton\n                            s-if=\"showTime\"\n                            locale=\"{{locale}}\"\n                            showTimePicker=\"{{showTimePicker}}\"\n                            disabled=\"{{!hasSelectedValue || !!hoverValue.length}}\"\n                            prefixCls=\"{{prefixCls}}\"\n                            on-openTimePicker=\"handleTimePicker(true)\"\n                            on-closeTimePicker=\"handleTimePicker(false)\"\n                        />\n                        <s-okbutton\n                            s-if=\"showTime\"\n                            locale=\"{{locale}}\"\n                            prefixCls=\"{{prefixCls}}\"\n                            disabled=\"{{!isAllowedDateAndTime || !hasSelectedValue || !!hoverValue.length}}\"\n                            on-ok=\"handleOk\"\n                        />\n                    </div>\n                </div>\n            </div>\n        </div>\n    "
}), _base["default"]);

exports["default"] = _default;