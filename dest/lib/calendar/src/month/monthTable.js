"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _index = require("../util/index");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd calendar month table file
 * @author mayihui@baidu.com
 **/
var ROW = 4;
var COL = 3;

var _default = _san["default"].defineComponent({
  dataTypes: {
    disabledDate: _san.DataTypes.func,
    value: _san.DataTypes.object,
    defaultValue: _san.DataTypes.object
  },
  computed: {
    months: function months() {
      var value = this.data.get('value');
      var months = [];
      var index = 0;

      for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
        months[rowIndex] = [];

        for (var colIndex = 0; colIndex < COL; colIndex++) {
          var current = value.clone();
          current.month(index);
          var content = (0, _index.getMonthName)(current);
          months[rowIndex][colIndex] = {
            value: index,
            content: content,
            title: content,
            current: current
          };
          index++;
        }
      }

      return months;
    }
  },
  getContentClass: function getContentClass(monthData) {
    var value = this.data.get('value');
    var today = (0, _index.getTodayTime)(value);
    var disabledDate = this.data.get('disabledDate');
    var prefixCls = this.data.get('prefixCls');
    var currentMonth = value.month();
    var disabled = false;

    if (disabledDate) {
      var testValue = value.clone();
      testValue.month(monthData.value);
      disabled = disabledDate(testValue);
    }

    var classArr = ["".concat(prefixCls, "-cell")];
    var isEqu = today.year() === value.year() && monthData.value === today.month();
    disabled && classArr.push("".concat(prefixCls, "-cell-disabled"));
    monthData.value === currentMonth && classArr.push("".concat(prefixCls, "-selected-cell"));
    isEqu && classArr.push("".concat(prefixCls, "-current-cell"));
    return classArr;
  },
  handleChooseMonth: function handleChooseMonth(monthData) {
    var value = this.data.get('value');
    var disabledDate = this.data.get('disabledDate');
    var disabled = false;

    if (disabledDate) {
      var testValue = value.clone();
      testValue.month(monthData.value);
      disabled = disabledDate(testValue);
    }

    if (!disabled) {
      var next = value.clone();
      next.month(monthData.value);
      this.fire('select', next);
    }
  },
  getMonth: function getMonth(monthData) {
    return (0, _index.getMonthName)(monthData.current);
  },
  template: "\n        <table class=\"{{prefixCls}}-table\" cellSpacing=\"0\" role=\"grid\">\n            <tbody class=\"{{prefixCls}}-tbody\">\n                <tr\n                    s-for=\"month, index in months\"\n                    role=\"row\"\n                >\n                    <td\n                        s-for=\"monthData in month\"\n                        role=\"gridcell\"\n                        title=\"{{monthData.title}}\"\n                        class=\"{{getContentClass(monthData)}}\"\n                        on-click=\"handleChooseMonth(monthData)\"\n                    >\n                        <slot\n                            name=\"monthRender\"\n                            var-rootPrefixCls=\"{{rootPrefixCls}}\"\n                            var-month=\"{{getMonth(monthData)}}\"\n                            var-value=\"{{monthData.current}}\"\n                            s-if=\"hasMonthRender\"\n                        />\n                        <a class=\"{{prefixCls}}-month\" s-else>{{getMonth(monthData)}}</a>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
});

exports["default"] = _default;