"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _moment = _interopRequireDefault(require("moment"));

var _header = _interopRequireDefault(require("./header"));

var _combobox = _interopRequireDefault(require("./combobox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd timepicker panel file
 * @author mayihui@baidu.com
 **/
function generateOptions(length, disabledOptions, hideDisabledOptions) {
  var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var arr = [];

  for (var value = 0; value < length; value += step) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }

  return arr;
}

function toNearestValidTime(time, hourOptions, minuteOptions, secondOptions) {
  var hour = hourOptions.slice().sort(function (a, b) {
    return Math.abs(time.hour() - a) - Math.abs(time.hour() - b);
  })[0];
  var minute = minuteOptions.slice().sort(function (a, b) {
    return Math.abs(time.minute() - a) - Math.abs(time.minute() - b);
  })[0];
  var second = secondOptions.slice().sort(function (a, b) {
    return Math.abs(time.second() - a) - Math.abs(time.second() - b);
  })[0];
  return (0, _moment["default"])("".concat(hour, ":").concat(minute, ":").concat(second), 'HH:mm:ss');
}

var _default = _san["default"].defineComponent({
  computed: {
    isAM: function isAM() {
      var defaultOpenValue = this.data.get('defaultOpenValue');
      var value = this.data.get('value');
      var realValue = value || defaultOpenValue;
      return realValue.hour() >= 0 && realValue.hour() < 12;
    },
    disabledHourOptions: function disabledHourOptions() {
      var use12Hours = this.data.get('use12Hours');

      var disabledHours = this.data.get('disabledHours') || function () {};

      var disabledOptions = disabledHours();

      if (use12Hours && Array.isArray(disabledOptions)) {
        if (this.data.get('isAM')) {
          disabledOptions = disabledOptions.filter(function (h) {
            return h < 12;
          }).map(function (h) {
            return h === 0 ? 12 : h;
          });
        } else {
          disabledOptions = disabledOptions.map(function (h) {
            return h === 12 ? 12 : h - 12;
          });
        }
      }

      return disabledOptions;
    },
    hourOptions: function hourOptions() {
      var disabledHourOptions = this.data.get('disabledHourOptions');
      var hideDisabledOptions = this.data.get('hideDisabledOptions');
      var hourStep = this.data.get('hourStep');
      return generateOptions(24, disabledHourOptions, hideDisabledOptions, hourStep);
    },
    minuteOptions: function minuteOptions() {
      var value = this.data.get('value');

      var disabledMinutes = this.data.get('disabledMinutes') || function () {};

      var disabledMinuteOptions = disabledMinutes(value ? value.hour() : null);
      var hideDisabledOptions = this.data.get('hideDisabledOptions');
      var minuteStep = this.data.get('minuteStep');
      return generateOptions(60, disabledMinuteOptions, hideDisabledOptions, minuteStep);
    },
    secondOptions: function secondOptions() {
      var value = this.data.get('value');

      var disabledSeconds = this.data.get('disabledSeconds') || function () {};

      var disabledSecondOptions = disabledSeconds(value ? value.hour() : null, value ? value.minute() : null);
      var hideDisabledOptions = this.data.get('hideDisabledOptions');
      var secondStep = this.data.get('secondStep');
      return generateOptions(60, disabledSecondOptions, hideDisabledOptions, secondStep);
    },
    validDefaultOpenValue: function validDefaultOpenValue() {
      var defaultOpenValue = this.data.get('defaultOpenValue');
      var hourOptions = this.data.get('hourOptions');
      var minuteOptions = this.data.get('minuteOptions');
      var secondOptions = this.data.get('secondOptions');
      return defaultOpenValue && toNearestValidTime(defaultOpenValue, hourOptions, minuteOptions, secondOptions);
    }
  },
  components: {
    's-header': _header["default"],
    's-combobox': _combobox["default"]
  },
  handleChange: function handleChange(value) {
    this.data.set('value', value.clone());
    this.fire('change', value);
  },
  handleAmpmChange: function handleAmpmChange(ampm) {
    this.fire('ampmChange', ampm);
  },
  handleCurrentSelectPanelChange: function handleCurrentSelectPanelChange(panel) {
    this.data.set('currentSelectPanel', panel);
  },
  handleEsc: function handleEsc(e) {
    this.fire('esc', e);
  },
  handleKeyDown: function handleKeyDown(e) {
    this.fire('keydown', e);
  },
  template: "<div class=\"{{prefixCls}}-inner\">\n        <s-header\n          clearText=\"{{clearText}}\"\n          prefixCls=\"{{prefixCls}}\"\n          defaultOpenValue=\"{{validDefaultOpenValue}}\"\n          value=\"{{value}}\"\n          currentSelectPanel=\"{{currentSelectPanel}}\"\n          format=\"{{format}}\"\n          placeholder=\"{{placeholder}}\"\n          hourOptions=\"{{hourOptions}}\"\n          minuteOptions=\"{{minuteOptions}}\"\n          secondOptions=\"{{secondOptions}}\"\n          disabledHours=\"{{disabledHours}}\"\n          disabledMinutes=\"{{disabledMinutes}}\"\n          disabledSeconds=\"{{disabledSeconds}}\"\n          focusOnOpen=\"{{focusOnOpen}}\"\n          inputReadOnly=\"{{inputReadOnly}}\"\n          on-esc=\"handleEsc\"\n          on-keydown=\"handleKeyDown\"\n          on-change=\"handleChange\"\n        />\n        <s-combobox\n          prefixCls=\"{{prefixCls}}\"\n          value=\"{{value}}\"\n          defaultOpenValue=\"{{validDefaultOpenValue}}\"\n          format=\"{{format}}\"\n          showHour=\"{{showHour}}\"\n          showMinute=\"{{showMinute}}\"\n          showSecond=\"{{showSecond}}\"\n          hourOptions=\"{{hourOptions}}\"\n          minuteOptions=\"{{minuteOptions}}\"\n          secondOptions=\"{{secondOptions}}\"\n          disabledHours=\"{{disabledHours}}\"\n          disabledMinutes=\"{{disabledMinutes}}\"\n          disabledSeconds=\"{{disabledSeconds}}\"\n          use12Hours=\"{{use12Hours}}\"\n          isAM=\"{{isAM}}\"\n          on-change=\"handleChange\"\n          on-ampmChange=\"handleAmpmChange\"\n          on-currentSelectPanelChange=\"handleCurrentSelectPanelChange\"\n        />\n        <div class=\"{{prefixCls}}-addon\" s-if=\"hasAddon\">\n            <slot name=\"addon\" />\n        </div>\n    </div>"
});

exports["default"] = _default;