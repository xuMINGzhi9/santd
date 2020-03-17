"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _index = require("./util/index");

var _select = _interopRequireDefault(require("../../select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd full calendar header file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  dataTypes: {
    value: _san.DataTypes.object,
    locale: _san.DataTypes.object,
    yearSelectOffset: _san.DataTypes.number,
    yearSelectTotal: _san.DataTypes.number,
    Select: _san.DataTypes.func,
    prefixCls: _san.DataTypes.string,
    type: _san.DataTypes.string,
    showTypeSwitch: _san.DataTypes.bool,
    headerComponents: _san.DataTypes.array
  },
  initData: function initData() {
    return {
      yearSelectOffset: 10,
      yearSelectTotal: 20
    };
  },
  computed: {
    month: function month() {
      return String(this.data.get('value').month());
    },
    year: function year() {
      return String(this.data.get('value').year());
    },
    months: function months() {
      var value = this.data.get('value').clone();
      var result = [];

      for (var i = 0; i < 12; i++) {
        value.month(i);
        result.push({
          label: (0, _index.getMonthName)(value),
          value: String(i)
        });
      }

      return result;
    },
    years: function years() {
      var yearSelectOffset = this.data.get('yearSelectOffset');
      var yearSelectTotal = this.data.get('yearSelectTotal');
      var year = this.data.get('year');
      var start = Number(year) - yearSelectOffset;
      var end = start + yearSelectTotal;
      var result = [];

      for (var i = start; i < end; i++) {
        result.push({
          label: i,
          value: String(i)
        });
      }

      return result;
    }
  },
  components: {
    's-select': _select["default"],
    's-option': _select["default"].Option
  },
  handleChangeTypeToDate: function handleChangeTypeToDate() {
    this.fire('typeChange', 'date');
  },
  handleChangeTypeToMonth: function handleChangeTypeToMonth() {
    this.fire('typeChange', 'month');
  },
  handleChangeMonth: function handleChangeMonth(month) {
    var value = this.data.get('value').clone();
    value.month(parseInt(month, 10));
    this.fire('valueChange', value);
  },
  handleChangeYear: function handleChangeYear(year) {
    var value = this.data.get('value').clone();
    value.year(parseInt(year, 10));
    this.fire('valueChange', value);
  },
  template: "\n        <div class=\"{{prefixCls}}-header\">\n            <span class=\"{{prefixCls}}-header-switcher\" s-if=\"showTypeSwitch\">\n                <span class=\"{{prefixCls}}-header-switcher-focus\" s-if=\"type === 'date'\">{{locale.month}}</span>\n                <span\n                    s-else\n                    class=\"{{prefixCls}}-header-switcher-normal\"\n                    on-click=\"handleChangeTypeToDate\"\n                >{{locale.month}}</span>\n                <span class=\"{{prefixCls}}-header-switcher-focus\" s-if=\"type === 'month'\">{{locale.year}}</span>\n                <span\n                    s-else\n                    class=\"{{prefixCls}}-header-switcher-normal\"\n                    on-click=\"handleChangeTypeToMonth\"\n                >{{locale.year}}</span>\n            </span>\n            <s-select\n                s-if=\"type !== 'month'\"\n                class=\"{{prefixCls}}-header-month-select\"\n                value=\"{{month}}\"\n                showSearch=\"{{false}}\"\n                on-change=\"handleChangeMonth\"\n            >\n                <s-option s-for=\"month in months\" value=\"{{month.value}}\">{{month.label}}</s-option>\n            </s-select>\n            <s-select\n                class=\"{{prefixCls}}-header-year-select\"\n                value=\"{{year}}\"\n                showSearch=\"{{false}}\"\n            >\n                <s-option s-for=\"year in years\" value=\"{{year.value}}\">{{year.label}}</s-option>\n            </s-select>\n        </div>\n    "
});

exports["default"] = _default;