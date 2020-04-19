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
 * @file Santd calendar decade table file
 * @author mayihui@baidu.com
 **/
var ROW = 4;
var COL = 3;

var _default = _san["default"].defineComponent({
  dataTypes: {
    prefixCls: _san.DataTypes.string,
    value: _san.DataTypes.object,
    defaultValue: _san.DataTypes.object
  },
  computed: {
    decades: function decades() {
      var startYear = this.data.get('startYear');
      var preYear = startYear - 10;
      var decades = [];
      var index = 0;

      for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
        decades[rowIndex] = [];

        for (var colIndex = 0; colIndex < COL; colIndex++) {
          var startDecade = preYear + index * 10;
          var endDecade = preYear + index * 10 + 9;
          decades[rowIndex][colIndex] = {
            startDecade: startDecade,
            endDecade: endDecade
          };
          index++;
        }
      }

      return decades;
    }
  },
  getContentClass: function getContentClass(decadeData) {
    var _this$data$get = this.data.get(),
        prefixCls = _this$data$get.prefixCls,
        value = _this$data$get.value,
        startYear = _this$data$get.startYear,
        endYear = _this$data$get.endYear;

    var startDecade = decadeData.startDecade,
        endDecade = decadeData.endDecade;
    var currentYear = value.year();
    var classArr = ["".concat(prefixCls, "-cell")];
    startDecade <= currentYear && currentYear <= endDecade && classArr.push("".concat(prefixCls, "-selected-cell"));
    startDecade < startYear && classArr.push("".concat(prefixCls, "-last-century-cell"));
    endDecade > endYear && classArr.push("".concat(prefixCls, "-next-century-cell"));
    return classArr;
  },
  handleChooseCentury: function handleChooseCentury(decadeData) {
    var startYear = this.data.get('startYear');
    var endYear = this.data.get('endYear');

    if (decadeData.year < startYear) {
      this.goYear(-100);
    } else if (decadeData.year > endYear) {
      this.goYear(100);
    } else {
      this.chooseDecade(decadeData.startDecade);
    }
  },
  goYear: function goYear(year) {
    var value = this.data.get('value').clone();
    value.add(year, 'year');
    this.data.set('value', value);
  },
  chooseDecade: function chooseDecade(year) {
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
  template: "\n        <table class=\"{{prefixCls}}-table\" cellSpacing=\"0\" role=\"grid\">\n            <tbody class=\"{{prefixCls}}-tbody\">\n                <tr\n                    s-for=\"decade, index in decades\"\n                    role=\"row\"\n                >\n                    <td\n                        s-for=\"decadeData in decade\"\n                        role=\"gridcell\"\n                        class=\"{{getContentClass(decadeData)}}\"\n                        on-click=\"handleChooseCentury(decadeData)\"\n                    >\n                        <a class=\"{{prefixCls}}-decade\">{{decadeData.startDecade}}-{{decadeData.endDecade}}</a>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
});

exports["default"] = _default;