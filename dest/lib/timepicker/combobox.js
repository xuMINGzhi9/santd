"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _select = _interopRequireDefault(require("./select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd timepicker combobox file
 * @author mayihui@baidu.com
 **/
var formatOption = function formatOption(option, disabledOptions) {
  var value = "".concat(option);

  if (option < 10) {
    value = "0".concat(option);
  }

  var disabled = false;

  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value: value,
    disabled: disabled
  };
};

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
    use12Hours: _san.DataTypes.bool,
    isAM: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      invalid: false,
      inputReadOnly: false
    };
  },
  computed: {
    hourData: function hourData() {
      var value = this.data.get('value') || this.data.get('defaultOpenValue');
      var hour = value.hour();
      var hourOptions = this.data.get('hourOptions');

      var disabledHours = this.data.get('disabledHours') || function () {};

      var showHour = this.data.get('showHour');
      var use12Hours = this.data.get('use12Hours');

      if (!showHour) {
        return false;
      }

      var disabledOptions = disabledHours();
      var hourOptionsAdj;
      var hourAdj;

      if (use12Hours) {
        hourOptionsAdj = [12].concat(hourOptions.filter(function (h) {
          return h < 12 && h > 0;
        }));
        hourAdj = hour % 12 || 12;
      } else {
        hourOptionsAdj = hourOptions;
        hourAdj = hour;
      }

      return {
        options: hourOptionsAdj.map(function (option) {
          return formatOption(option, disabledOptions);
        }),
        selectedIndex: hourOptions.indexOf(hourAdj)
      };
    },
    minuteData: function minuteData() {
      var value = this.data.get('value') || this.data.get('defaultOpenValue');
      var minute = value.minute();
      var minuteOptions = this.data.get('minuteOptions');

      var disabledMinutes = this.data.get('disabledMinutes') || function () {};

      var showMinute = this.data.get('showMinute');

      if (!showMinute) {
        return false;
      }

      var disabledOptions = disabledMinutes(value.hour());
      return {
        options: minuteOptions.map(function (option) {
          return formatOption(option, disabledOptions);
        }),
        selectedIndex: minuteOptions.indexOf(minute)
      };
    },
    secondData: function secondData() {
      var value = this.data.get('value') || this.data.get('defaultOpenValue');
      var second = value.second();
      var secondOptions = this.data.get('secondOptions');

      var disabledSeconds = this.data.get('disabledSeconds') || function () {};

      var showSecond = this.data.get('showSecond');

      if (!showSecond) {
        return false;
      }

      var disabledOptions = disabledSeconds(value.hour(), value.minute());
      return {
        options: secondOptions.map(function (option) {
          return formatOption(option, disabledOptions);
        }),
        selectedIndex: secondOptions.indexOf(second)
      };
    },
    ampmData: function ampmData() {
      var use12Hours = this.data.get('use12Hours');
      var format = this.data.get('format');
      var isAM = this.data.get('isAM');

      if (!use12Hours) {
        return false;
      }

      var options = ['am', 'pm'].map(function (c) {
        return format.match(/\sA/) ? c.toUpperCase() : c;
      }).map(function (c) {
        return {
          value: c
        };
      });
      var selectedIndex = isAM ? 0 : 1;
      return {
        options: options,
        selectedIndex: selectedIndex
      };
    }
  },
  components: {
    's-select': _select["default"]
  },
  handleItemChange: function handleItemChange(_ref) {
    var type = _ref.type,
        itemValue = _ref.itemValue;

    var _this$data$get = this.data.get(),
        defaultOpenValue = _this$data$get.defaultOpenValue,
        use12Hours = _this$data$get.use12Hours,
        propValue = _this$data$get.value,
        isAM = _this$data$get.isAM;

    var value = propValue || defaultOpenValue;

    if (type === 'hour') {
      if (use12Hours) {
        if (isAM) {
          value.hour(+itemValue % 12);
        } else {
          value.hour(+itemValue % 12 + 12);
        }
      } else {
        value.hour(+itemValue);
      }
    } else if (type === 'minute') {
      value.minute(+itemValue);
    } else if (type === 'ampm') {
      var ampm = itemValue.toUpperCase();

      if (use12Hours) {
        if (ampm === 'PM' && value.hour() < 12) {
          value.hour(value.hour() % 12 + 12);
        }

        if (ampm === 'AM') {
          if (value.hour() >= 12) {
            value.hour(value.hour() - 12);
          }
        }
      }

      this.fire('ampmChange', ampm);
    } else {
      value.second(+itemValue);
    }

    this.fire('change', value);
  },
  handleEnterSelectPanel: function handleEnterSelectPanel(range) {
    this.fire('currentSelectPanelChange', range);
  },
  template: "<div class=\"{{prefixCls}}-combobox\">\n        <s-select\n            s-if=\"hourData\"\n            prefixCls=\"{{prefixCls}}\"\n            type=\"hour\"\n            options=\"{{hourData.options}}\"\n            selectedIndex=\"{{hourData.selectedIndex}}\"\n            on-select=\"handleItemChange\"\n            on-mouseenter=\"handleEnterSelectPanel('hour')\"\n        />\n        <s-select\n            s-if=\"minuteData\"\n            prefixCls=\"{{prefixCls}}\"\n            type=\"minute\"\n            options=\"{{minuteData.options}}\"\n            selectedIndex=\"{{minuteData.selectedIndex}}\"\n            on-select=\"handleItemChange\"\n            on-mouseenter=\"handleEnterSelectPanel('minute')\"\n        />\n        <s-select\n            s-if=\"secondData\"\n            prefixCls=\"{{prefixCls}}\"\n            type=\"second\"\n            options=\"{{secondData.options}}\"\n            selectedIndex=\"{{secondData.selectedIndex}}\"\n            on-select=\"handleItemChange\"\n            on-mouseenter=\"handleEnterSelectPanel('second')\"\n        />\n        <s-select\n            s-if=\"ampmData\"\n            prefixCls=\"{{prefixCls}}\"\n            type=\"ampm\"\n            options=\"{{ampmData.options}}\"\n            selectedIndex=\"{{ampmData.selectedIndex}}\"\n            on-select=\"handleItemChange\"\n            on-mouseenter=\"handleEnterSelectPanel('ampm')\"\n        />\n    </div>"
});

exports["default"] = _default;