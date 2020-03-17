"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _moment = _interopRequireDefault(require("moment"));

var _index = require("../util/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd calendar date table file
 * @author mayihui@baidu.com
 **/
var ROW = 6;
var COL = 7;

function isSameDay(one, two) {
  return one && two && one.isSame(two, 'day');
}

function beforeCurrentMonthYear(current, today) {
  if (current.year() < today.year()) {
    return 1;
  }

  return current.year() === today.year() && current.month() < today.month();
}

function afterCurrentMonthYear(current, today) {
  if (current.year() > today.year()) {
    return 1;
  }

  return current.year() === today.year() && current.month() > today.month();
}

var _default = _san["default"].defineComponent({
  dataTypes: {
    disabledDate: _san.DataTypes.func,
    renderFooter: _san.DataTypes.func,
    rootPrefixCls: _san.DataTypes.string,
    value: _san.DataTypes.object,
    defaultValue: _san.DataTypes.object
  },
  computed: {
    dates: function dates() {
      /* eslint-disable no-unused-vars */
      var prefixCls = this.data.get('prefixCls');
      var locale = this.data.get('locale');
      var value = this.data.get('value') || (0, _moment["default"])();
      var today = (0, _index.getTodayTime)(value);
      var selectedValue = this.data.get('selectedValue');
      var hoverValue = this.data.get('hoverValue');
      var disabledDate = this.data.get('disabledDate');
      var month = value.clone();
      month.date(1);
      var day = month.day();
      var lastMonthDiffDay = (day + 7 - value.localeData().firstDayOfWeek()) % 7;
      var lastMonth = month.clone();
      lastMonth.add(0 - lastMonthDiffDay, 'days');
      var dataTable = [];
      var passed = 0;
      var current;

      for (var i = 0; i < ROW; i++) {
        dataTable[i] = {
          isCurrentWeek: false,
          isActiveWeek: false
        };
        dataTable[i].current = [];

        for (var j = 0; j < COL; j++) {
          current = lastMonth;

          if (passed) {
            current = current.clone();
            current.add(passed, 'days');
          }

          dataTable[i].current.push({
            data: current
          });
          dataTable[i].week = current.week(); // 开始处理各种样式

          var next = null;
          var last = null;

          if (j < COL - 1) {
            next = current.clone().add(passed + 1, 'days');
          }

          if (j > 0) {
            last = current.clone().add(passed - 1, 'days');
          }

          var className = ["".concat(prefixCls, "-cell")];
          var disabled = false;
          var selected = false;

          if (isSameDay(current, today)) {
            className.push("".concat(prefixCls, "-today"));
            dataTable[i].isCurrentWeek = true;
          }

          var isBeforeCurrentMonthYear = beforeCurrentMonthYear(current, value);
          var isAfterCurrentMonthYear = afterCurrentMonthYear(current, value);

          if (selectedValue && Array.isArray(selectedValue)) {
            var rangeValue = hoverValue.length ? hoverValue : selectedValue;

            if (!isBeforeCurrentMonthYear && !isAfterCurrentMonthYear) {
              var startValue = rangeValue[0];
              var endValue = rangeValue[1];

              if (startValue) {
                if (isSameDay(current, startValue)) {
                  selected = true;
                  dataTable[i].isActiveWeek = true;
                  className.push("".concat(prefixCls, "-selected-start-date"));
                }
              }

              if (startValue || endValue) {
                if (isSameDay(current, endValue)) {
                  selected = true;
                  dataTable[i].isActiveWeek = true;
                  className.push("".concat(prefixCls, "-selected-end-date"));
                } else if (!startValue && current.isBefore(endValue, 'day') || !endValue && current.isAfter(startValue, 'day') || current.isAfter(startValue, 'day') && current.isBefore(endValue, 'day')) {
                  className.push("".concat(prefixCls, "-in-range-cell"));
                }
              }
            }
          } else if (isSameDay(current, value)) {
            selected = true;
            dataTable[i].isActiveWeek = true;
          }

          isSameDay(current, selectedValue) && className.push("".concat(prefixCls, "-selected-date"));
          isBeforeCurrentMonthYear && className.push("".concat(prefixCls, "-last-month-cell"));
          isAfterCurrentMonthYear && className.push("".concat(prefixCls, "-next-month-btn-day"));
          current.clone().endOf('month').date() === current.date() && className.push(" ".concat(prefixCls, "-last-day-of-month"));

          if (disabledDate) {
            if (disabledDate(current, value)) {
              disabled = true;
              (!last || !disabledDate(last, value)) && className.push("".concat(prefixCls, "-disabled-cell-first-of-row"));
              (!next || !disabledDate(next, value)) && className.push("".concat(prefixCls, "-disabled-cell-last-of-row"));
            }
          }

          selected && className.push("".concat(prefixCls, "-selected-day"));
          disabled && className.push("".concat(prefixCls, "-disabled-cell"));
          dataTable[i].current[j].className = className.join(' ');
          dataTable[i].current[j].selected = selected;
          dataTable[i].current[j].disabled = disabled;
          passed++;
        }
      }

      return dataTable;
    },
    weeks: function weeks() {
      var locale = this.data.get('locale');
      var value = this.data.get('value') || (0, _moment["default"])();
      var localeData = value.localeData();
      var firstDayOfWeek = localeData.firstDayOfWeek();
      var weekDays = [];
      var veryShortWeekdays = [];
      var now = (0, _moment["default"])();

      for (var dateColIndex = 0; dateColIndex < COL; dateColIndex++) {
        var index = (firstDayOfWeek + dateColIndex) % COL;
        now.day(index);
        veryShortWeekdays[dateColIndex] = localeData.weekdaysMin(now);
        weekDays[dateColIndex] = localeData.weekdaysShort(now);
      }

      return {
        veryShortWeekdays: veryShortWeekdays,
        weekDays: weekDays
      };
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
  getTrClassName: function getTrClassName(date) {
    var prefixCls = this.data.get('prefixCls');
    var classArr = [];
    date.isCurrentWeek && classArr.push("".concat(prefixCls, "-current-week"));
    date.isActiveWeek && classArr.push("".concat(prefixCls, "-active-week"));
    return classArr;
  },
  getTitleString: function getTitleString(current) {
    return (0, _index.getTitleString)(current.data);
  },
  handleClick: function handleClick(disabled, value) {
    if (!disabled) {
      this.fire('select', value);
    }
  },
  handleMouseEnter: function handleMouseEnter(disabled, value) {
    this.fire('dayHover', value);
  },
  getDate: function getDate(value) {
    return value.date();
  },
  template: "\n        <table class=\"{{prefixCls}}-table\" cellspacing=\"0\" role=\"grid\">\n            <thead>\n                <tr role=\"row\">\n                    <th\n                        s-if=\"showWeekNumber\"\n                        role=\"columnheader\"\n                        class=\"{{prefixCls}}-column-header {{prefixCls}}-week-number-header\"\n                    >\n                        <span class=\"{{prefixCls}}-column-header-inner\">x</span>\n                    </th>\n                    <th\n                        s-for=\"day, index in weeks.weekDays\"\n                        role=\"columnheader\"\n                        title=\"{{day}}\"\n                        class=\"{{prefixCls}}-column-header\"\n                    >\n                        <span class=\"{{prefixCls}}-column-header-inner\">\n                            {{weeks.veryShortWeekdays[index]}}\n                        </span>\n                    </th>\n                </tr>\n            </thead>\n            <tbody class=\"{{prefixCls}}-tbody\">\n                <tr\n                    s-for=\"date, index in dates\"\n                    role=\"row\"\n                    class=\"{{getTrClassName(date)}}\"\n                >\n                    <td\n                        s-if=\"showWeekNumber\"\n                        role=\"gridcell\"\n                        class=\"{{prefixCls}}-week-number-cell\"\n                    >\n                        {{date.week}}\n                    </td>\n                    <td\n                        s-for=\"current in date.current\"\n                        role=\"gridcell\"\n                        title=\"{{getTitleString(current)}}\"\n                        class=\"{{current.className}}\"\n                        on-click=\"handleClick(current.disabled, current.data)\"\n                        on-mouseenter=\"handleMouseEnter(current.disabled, current.data)\"\n                    >\n                        <slot\n                            s-if=\"hasDateRender\"\n                            name=\"dateRender\"\n                            var-current=\"{{current.data}}\"\n                            var-date=\"{{getDate(current.data)}}\"\n                            var-value=\"{{current.data}}\"\n                        />\n                        <div class=\"{{prefixCls}}-date\" s-else>{{getDate(current.data)}}</div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
});

exports["default"] = _default;