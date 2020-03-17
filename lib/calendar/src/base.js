"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _en_US = _interopRequireDefault(require("./locale/en_US"));

var _index = require("./util/index");

var _panel = _interopRequireDefault(require("../../timepicker/panel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd calendar base file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  dataTypes: {
    customClassName: _san.DataTypes.string,
    visible: _san.DataTypes.bool,
    prefixCls: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      visible: true,
      prefixCls: 'calendar',
      locale: _en_US["default"],
      timeFormat: 'HH:mm:ss'
    };
  },
  components: {
    's-timepicker': _panel["default"]
  },
  computed: {
    classes: function classes() {
      var prefixCls = this.data.get('prefixCls');
      var customClassName = this.data.get('customClassName');
      var visible = this.data.get('visible');
      var showWeekNumber = this.data.get('showWeekNumber');
      var classArr = [prefixCls, customClassName];
      !visible && classArr.push("".concat(prefixCls, "-hidden"));
      showWeekNumber && classArr.push("".concat(prefixCls, "-week-number"));
      return classArr;
    },
    showHour: function showHour() {
      var showTime = this.data.get('showTime') || {};
      var format = showTime.format || this.data.get('timeFormat');
      return format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1;
    },
    showMinute: function showMinute() {
      var showTime = this.data.get('showTime') || {};
      var format = showTime.format || this.data.get('timeFormat');
      return format.indexOf('m') > -1;
    },
    showSecond: function showSecond() {
      var showTime = this.data.get('showTime') || {};
      var format = showTime.format || this.data.get('timeFormat');
      return format.indexOf('s') > -1;
    },
    columns: function columns() {
      var showHour = this.data.get('showHour');
      var showMinute = this.data.get('showMinute');
      var showSecond = this.data.get('showSecond');
      var use12Hours = this.data.get('use12Hours');
      var column = 0;
      showHour && ++column;
      showMinute && ++column;
      showSecond && ++column;
      use12Hours && ++column;
      return column;
    }
  },
  getFormat: function getFormat() {
    var _this$data$get = this.data.get(''),
        locale = _this$data$get.locale,
        showTime = _this$data$get.showTime,
        format = _this$data$get.format;

    if (format) {
      return format;
    }

    if (showTime) {
      return locale.dateTimeFormat;
    }

    return locale.dateFormat;
  },
  focus: function focus() {
    if (this.ref('focusEl')) {
      this.ref('focusEl').focus();
    } else if (this.el) {
      this.el.focus();
    }
  },
  handleSelect: function handleSelect(value, cause) {
    if (value) {
      this.setValue(value);
    }

    this.setSelectedValue(value, cause);
  },
  setSelectedValue: function setSelectedValue(selectedValue, cause) {
    this.data.set('selectedValue', selectedValue);
    this.fire('select', {
      selectedValue: selectedValue,
      cause: cause
    });
  },
  setValue: function setValue(value) {
    var originalValue = this.data.get('value');
    this.data.set('value', value);

    if (originalValue && value && !originalValue.isSame(value) || originalValue || value) {
      this.fire('change', value);
    }
  },
  isAllowedDate: function isAllowedDate(value) {
    var disabledDate = this.data.get('disabledDate');
    var disabledTime = this.data.get('disabledTime');
    return (0, _index.isAllowedDate)(value, disabledDate, disabledTime);
  }
});

exports["default"] = _default;