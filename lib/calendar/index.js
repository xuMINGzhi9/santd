"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _moment = _interopRequireDefault(require("moment"));

var _util = require("../core/util");

var _radio = _interopRequireDefault(require("../radio"));

var _select = _interopRequireDefault(require("../select"));

var _fullCalendar = _interopRequireDefault(require("./src/fullCalendar"));

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('fullcalendar')();

function getMonthsLocale(value) {
  var current = value.clone();
  var localeData = value.localeData();
  var months = [];

  for (var i = 0; i < 12; i++) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  return months;
}

var _default = _san["default"].defineComponent({
  initData: function initData() {
    return {
      prefixCls: prefixCls,
      fullscreen: true,
      mode: 'month',
      yearSelectOffset: 10,
      yearSelectTotal: 20,
      componentName: 'Calendar'
    };
  },
  computed: _objectSpread(_objectSpread({}, _receiver["default"].computed), {}, {
    classes: function classes() {
      var fullscreen = this.data.get('fullscreen');
      var classArr = [prefixCls];
      fullscreen && classArr.push("".concat(prefixCls, "-fullscreen"));
      return classArr;
    },
    month: function month() {
      var value = this.data.get('value');
      return value && String(value.month());
    },
    months: function months() {
      var value = this.data.get('value');
      var validRange = this.data.get('validRange');
      var options = [];
      var months = value && getMonthsLocale(value) || [];
      var start = 0;
      var end = 12;

      if (validRange) {
        var _validRange = _slicedToArray(validRange, 2),
            rangeStart = _validRange[0],
            rangeEnd = _validRange[1];

        var currentYear = value.get('year');

        if (rangeEnd.get('year') === currentYear) {
          end = rangeEnd.get('month') + 1;
        }

        if (rangeStart.get('year') === currentYear) {
          start = rangeStart.get('month');
        }
      }

      for (var index = start; index < end; index++) {
        options.push({
          value: String(index),
          label: months[index]
        });
      }

      return options;
    },
    year: function year() {
      var value = this.data.get('value');
      return value && String(value.year());
    },
    years: function years() {
      var year = this.data.get('year');
      var yearSelectTotal = this.data.get('yearSelectTotal');
      var yearSelectOffset = this.data.get('yearSelectOffset');
      var validRange = this.data.get('validRange');
      var locale = this.data.get('locale').lang;
      var start = year - yearSelectOffset;
      var end = start + yearSelectTotal;

      if (validRange) {
        start = validRange[0].get('year');
        end = validRange[1].get('year') + 1;
      }

      var options = [];

      for (var index = start; index < end; index++) {
        options.push({
          label: index + (locale.year === '年' ? '年' : ''),
          value: String(index)
        });
      }

      return options;
    }
  }),
  setValue: function setValue(value, way) {
    var prevValue = this.data.get('value').clone();
    var mode = this.data.get('mode');
    this.data.set('value', value);

    if (way === 'select') {
      if (prevValue && prevValue.month() !== value.month()) {
        this.handlePanelChange(value, mode);
      }

      this.fire('select', value);
    } else if (way === 'changePanel') {
      this.handlePanelChange(value, mode);
    }
  },
  handleMonthChange: function handleMonthChange(month) {
    var value = this.data.get('value').clone();
    value.month(month);
    this.setValue(value, 'changePanel');
  },
  handleYearChange: function handleYearChange(year) {
    var value = this.data.get('value').clone();
    value.year(year);
    this.setValue(value, 'changePanel');
  },
  handlePanelChange: function handlePanelChange(value, mode) {
    this.fire('panelChange', {
      value: value,
      mode: mode
    });

    if (value !== this.data.get('value')) {
      this.fire('change', value);
    }
  },
  inited: function inited() {
    var _this = this;

    _receiver["default"].inited.call(this);

    var defaultValue = this.data.get('defaultValue');
    var value = this.data.get('value') || defaultValue || (0, _moment["default"])();
    var localeCode = this.data.get('localeCode');

    if (localeCode) {
      _moment["default"].locale(localeCode);

      value.locale(localeCode);
    }

    this.data.set('value', value);
    this.data.set('hasHeaderRender', !!this.sourceSlots.named.headerRender);
    this.watch('localeCode', function (val) {
      _moment["default"].locale(val);

      value.locale(val);

      _this.data.set('value', value, {
        force: true
      });
    });
  },
  components: {
    's-calendar': _fullCalendar["default"],
    's-radio': _radio["default"],
    's-radiogroup': _radio["default"].Group,
    's-radiobutton': _radio["default"].Button,
    's-select': _select["default"],
    's-selectoption': _select["default"].Option
  },
  handleHeaderTypeChange: function handleHeaderTypeChange(e) {
    var mode = e.target.value;
    this.data.set('mode', mode);
    this.handlePanelChange(this.data.get('value'), mode);
  },
  handleSelect: function handleSelect(value) {
    this.setValue(value.selectedValue || value, 'select');
  },
  getDateRange: function getDateRange(validRange, disabledDate) {
    if (!validRange) {
      return disabledDate;
    }

    return function (current) {
      if (!current) {
        return false;
      }

      var _validRange2 = _slicedToArray(validRange, 2),
          startDate = _validRange2[0],
          endDate = _validRange2[1];

      var inRange = !current.isBetween(startDate, endDate, 'days', '[]');

      if (disabledDate) {
        return disabledDate(current) || inRange;
      }

      return inRange;
    };
  },
  template: "\n        <div class=\"{{classes}}\">\n            <slot\n                s-if=\"hasHeaderRender\"\n                name=\"headerRender\"\n                var-type=\"{{mode}}\"\n                var-value=\"{{value}}\"\n                var-locale=\"{{locale.lang}}\"\n                on-typeChange=\"handleHeaderTypeChange\"\n                on-yearChange=\"handleYearChange\"\n                on-monthChange=\"handleMonthChange\"\n            />\n            <div class=\"{{prefixCls}}-header\" s-else>\n                <s-select\n                    size=\"{{fullscreen ? 'default' : 'small'}}\"\n                    dropdownMatchSelectWidth=\"{{false}}\"\n                    class=\"{{prefixCls}}-year-select\"\n                    value=\"{{year}}\"\n                    style=\"display:inline-block; min-width: 80px;\"\n                    on-change=\"handleYearChange\"\n                >\n                    <s-selectoption s-for=\"year in years\" value=\"{{year.value}}\" locale=\"{{locale}}\">\n                        {{year.label}}\n                    </s-selectoption>\n                </s-select>\n                <s-select\n                    s-if=\"mode !== 'year'\"\n                    size=\"{{fullscreen ? 'default' : 'small'}}\"\n                    dropdownMatchSelectWidth=\"{{false}}\"\n                    class=\"{{prefixCls}}-month-select\"\n                    value=\"{{month}}\"\n                    style=\"display:inline-block; min-width: 80px;\"\n                    on-change=\"handleMonthChange\"\n                >\n                    <s-selectoption s-for=\"month in months\" value=\"{{month.value}}\" locale=\"{{locale}}\">\n                        {{month.label}}\n                    </s-selectoption>\n                </s-select>\n                <s-radiogroup\n                    value=\"{{mode}}\"\n                    size=\"{{fullscreen ? 'default' : 'small'}}\"\n                    on-change=\"handleHeaderTypeChange\"\n                    name=\"calendarmode\"\n                >\n                    <s-radiobutton value=\"month\">{{locale.lang.month}}</s-radiobutton>\n                    <s-radiobutton value=\"year\">{{locale.lang.year}}</s-radiobutton>\n                </s-radiogroup>\n            </div>\n            <s-calendar\n                disabledDate=\"{{getDateRange(validRange, disabledDate)}}\"\n                type=\"{{mode === 'year' ? 'month' : 'date'}}\"\n                prefixCls=\"{{prefixCls}}\"\n                showHeader=\"{{false}}\"\n                value=\"{{value}}\"\n                locale=\"{{locale.lang}}\"\n                fullscreen=\"{{fullscreen}}\"\n                on-select=\"handleSelect\"\n            >\n            <div class=\"{{prefixCls}}-date\" slot=\"customDateCellRender\">\n                <div class=\"{{prefixCls}}-value\">{{date}}</div>\n                <div class=\"{{prefixCls}}-content\">\n                    <slot name=\"dateCellRender\" var-value=\"{{value}}\" />\n                </div>\n            </div>\n            <div class=\"{{rootPrefixCls}}-month\" slot=\"customMonthCellRender\">\n                <div class=\"{{rootPrefixCls}}-value\">{{month}}</div>\n                <div class=\"{{rootPrefixCls}}-content\">\n                    <slot name=\"monthCellRender\" var-value=\"{{value}}\"/>\n                </div>\n            </div>\n            </s-calendar>\n        </div>\n    "
});

exports["default"] = _default;