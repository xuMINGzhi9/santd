"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _calendar = _interopRequireDefault(require("../calendar/src/calendar"));

var _monthCalendar = _interopRequireDefault(require("../calendar/src/monthCalendar"));

var _rangePicker = _interopRequireDefault(require("./rangePicker"));

var _createPicker = _interopRequireDefault(require("./createPicker"));

var _wrapPicker = _interopRequireDefault(require("./wrapPicker"));

var _weekPicker = _interopRequireDefault(require("./weekPicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd datepicker
 * @author mayihui@baidu.com
 */
var DatePicker = (0, _wrapPicker["default"])((0, _createPicker["default"])(_calendar["default"]), 'date');
DatePicker.MonthPicker = (0, _wrapPicker["default"])((0, _createPicker["default"])(_monthCalendar["default"]), 'month');
DatePicker.WeekPicker = (0, _wrapPicker["default"])(_weekPicker["default"], 'week');
DatePicker.RangePicker = (0, _wrapPicker["default"])(_rangePicker["default"], 'date');
var _default = DatePicker;
exports["default"] = _default;