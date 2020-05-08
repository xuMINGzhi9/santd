"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _san = _interopRequireDefault(require("san"));

var _index = require("../core/util/index");

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _index.classCreator)('calendar')();
var inputPrefixCls = (0, _index.classCreator)('input')();
var DEFAULT_FORMAT = {
  date: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  week: 'gggg-wo',
  month: 'YYYY-MM'
};

function _default(Picker, pickerType) {
  return _san["default"].defineComponent({
    initData: function initData() {
      return _objectSpread(_objectSpread({}, Picker.prototype.initData()), {}, {
        componentName: 'DatePicker',
        prefixCls: prefixCls,
        transitionName: 'slide-up',
        timeFormat: 'HH:mm:ss'
      });
    },
    inited: function inited() {
      _receiver["default"].inited.bind(this)();

      Picker.prototype.inited.bind(this)();
    },
    computed: _objectSpread(_objectSpread(_objectSpread({}, _receiver["default"].computed), Picker.prototype.computed), {}, {
      format: function format() {
        var format = this.data.get('format');
        var showTime = this.data.get('showTime');
        var mergedPickerType = showTime ? "".concat(pickerType, "Time") : pickerType;
        return format || DEFAULT_FORMAT[mergedPickerType];
      },
      pickerClass: function pickerClass() {
        var size = this.data.get('size');
        var classArr = ["".concat(prefixCls, "-picker")];
        size && classArr.push("".concat(prefixCls, "-picker-").concat(size));
        return classArr.join(' ');
      },
      pickerInputClass: function pickerInputClass() {
        var prefixCls = this.data.get('prefixCls');
        var size = this.data.get('size');
        var disabled = this.data.get('disabled');
        var classArr = ["".concat(prefixCls, "-picker-input"), inputPrefixCls];
        size && classArr.push("".concat(inputPrefixCls, "-").concat(size));
        disabled && classArr.push("".concat(inputPrefixCls, "-disabled"));
        return classArr.join(' ');
      }
    }),
    focus: function focus() {
      this.ref('input').focus();
    },
    blur: function blur() {
      this.ref('input').blur();
    },
    attached: function attached() {
      var autoFocus = this.data.get('autoFocus');
      var disabled = this.data.get('disabled');

      if (autoFocus && !disabled) {
        this.focus();
      }
    }
  }, Picker);
}