"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd timepicker header file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  dataTypes: {
    format: _san.DataTypes.string,
    prefixCls: _san.DataTypes.string,
    placeholder: _san.DataTypes.string,
    value: _san.DataTypes.object,
    inputReadOnly: _san.DataTypes.bool,
    hourOptions: _san.DataTypes.array,
    minuteOptions: _san.DataTypes.array,
    secondOptions: _san.DataTypes.array,
    disabledHours: _san.DataTypes.func,
    disabledMinutes: _san.DataTypes.func,
    disabledSeconds: _san.DataTypes.func,
    defaultOpenValue: _san.DataTypes.object,
    focusOnOpen: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      invalid: false,
      inputReadOnly: false
    };
  },
  computed: {
    showTime: function showTime() {
      var value = this.data.get('value');
      var format = this.data.get('format');
      return value && value.format(format);
    }
  },
  attached: function attached() {
    var focusOnOpen = this.data.get('focusOnOpen');

    if (focusOnOpen) {
      this.ref('input').focus();
      this.ref('input').select();
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    if (e.keyCode === 27) {
      this.fire('esc', e);
    }

    this.fire('keydown', e);
  },
  handleChange: function handleChange(e) {
    var inputValue = e.target.value;

    var _this$data$get = this.data.get(),
        format = _this$data$get.format,
        hourOptions = _this$data$get.hourOptions,
        minuteOptions = _this$data$get.minuteOptions,
        secondOptions = _this$data$get.secondOptions,
        disabledHours = _this$data$get.disabledHours,
        disabledMinutes = _this$data$get.disabledMinutes,
        disabledSeconds = _this$data$get.disabledSeconds;

    if (inputValue) {
      var originalValue = this.data.get('value');
      var value = this.data.get('value') || this.data.get('defaultOpenValue');
      var parsed = (0, _moment["default"])(inputValue, format, true);

      if (!parsed.isValid()) {
        this.data.set('invalid', true);
        return;
      }

      value.hour(parsed.hour()).minute(parsed.minute()).second(parsed.second()); // if time value not allowed, response warning.

      if (hourOptions.indexOf(value.hour()) < 0 || minuteOptions.indexOf(value.minute()) < 0 || secondOptions.indexOf(value.second()) < 0) {
        this.data.set('invalid', true);
        return;
      } // if time value is disabled, response warning.


      var disabledHourOptions = disabledHours();
      var disabledMinuteOptions = disabledMinutes(value.hour());
      var disabledSecondOptions = disabledSeconds(value.hour(), value.minute());

      if (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0 || disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0 || disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0) {
        this.data.set('invalid', true);
        return;
      }

      if (originalValue) {
        if (originalValue.hour() !== value.hour() || originalValue.minute() !== value.minute() || originalValue.second() !== value.second()) {
          var changedValue = originalValue.clone();
          changedValue.hour(value.hour());
          changedValue.minute(value.minute());
          changedValue.second(value.second());
          this.fire('change', changedValue);
        }
      } else if (originalValue !== value) {
        this.fire('change', value);
      }
    } else {
      this.fire('change', null);
    }

    this.data.set('invalid', false);
  },
  template: "<div class=\"{{prefixCls}}-input-wrap\">\n        <input\n            class=\"{{prefixCls}}-input {{invalid ? prefixCls + '-input-invalid' : ''}}\"\n            value=\"{{showTime}}\"\n            placeholder=\"{{placeholder}}\"\n            readOnly=\"{{!!inputReadOnly}}\"\n            on-change=\"handleChange\"\n            on-keydown=\"handleKeyDown\"\n            s-ref=\"input\"\n        />\n    </div>"
});

exports["default"] = _default;