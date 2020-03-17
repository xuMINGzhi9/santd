"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd calendar year table file
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
    years: function years() {
      var startYear = this.data.get('startYear');
      var previousYear = startYear - 1;
      var years = [];
      var index = 0;

      for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
        years[rowIndex] = [];

        for (var colIndex = 0; colIndex < COL; colIndex++) {
          var year = previousYear + index;
          var content = String(year);
          years[rowIndex][colIndex] = {
            content: content,
            year: year,
            title: content
          };
          index++;
        }
      }

      return years;
    }
  },
  getContentClass: function getContentClass(yearData) {
    var value = this.data.get('value');
    var currentYear = value.year();
    var startYear = this.data.get('startYear');
    var endYear = this.data.get('endYear');
    var prefixCls = this.data.get('prefixCls');
    var classArr = ["".concat(prefixCls, "-cell")];
    yearData.year === currentYear && classArr.push("".concat(prefixCls, "-selected-cell"));
    yearData.year < startYear && classArr.push("".concat(prefixCls, "-last-decade-cell"));
    yearData.year > endYear && classArr.push("".concat(prefixCls, "-next-decade-cell"));
    return classArr;
  },
  handleChooseYear: function handleChooseYear(yearData) {
    var startYear = this.data.get('startYear');
    var endYear = this.data.get('endYear');

    if (yearData.year < startYear) {
      this.goYear(-10);
    } else if (yearData.year > endYear) {
      this.goYear(10);
    } else {
      this.chooseYear(yearData.year);
    }
  },
  goYear: function goYear(year) {
    var value = this.data.get('value').clone();
    value.add(year, 'year');
    this.data.set('value', value);
  },
  chooseYear: function chooseYear(year) {
    var _this = this;

    var value = this.data.get('value').clone();
    value.year(year);
    value.month(this.data.get('value').month());
    this.fire('select', value);
    this.nextTick(function () {
      _this.data.set('refresh', Math.random(), {
        force: true
      });
    });
  },
  template: "\n        <table class=\"{{prefixCls}}-table\" cellSpacing=\"0\" role=\"grid\">\n            <tbody class=\"{{prefixCls}}-tbody\">\n                <tr\n                    s-for=\"year, index in years\"\n                    key=\"{{index}}\"\n                    role=\"row\"\n                >\n                    <td\n                        s-for=\"yearData in year\"\n                        role=\"gridcell\"\n                        key=\"{{yearData.content}}\"\n                        title=\"{{yearData.title}}\"\n                        class=\"{{getContentClass(yearData)}}\"\n                        on-click=\"handleChooseYear(yearData)\"\n                    >\n                        <a class=\"{{prefixCls}}-year\">{{yearData.content}}</a>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
});

exports["default"] = _default;