"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../../core/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('slider-step')();

var calcPoints = function calcPoints(marks, dots, step, min, max) {
  var points = Object.keys(marks).map(parseFloat).sort(function (a, b) {
    return a - b;
  });

  if (dots && step) {
    for (var i = min; i <= max; i += step) {
      if (points.indexOf(i) === -1) {
        points.push(i);
      }
    }
  }

  return points;
};

var _default = _san["default"].defineComponent({
  dataTypes: {
    activeDotStyle: _san.DataTypes.object,
    dotStyle: _san.DataTypes.object,
    min: _san.DataTypes.number,
    max: _san.DataTypes.number,
    included: _san.DataTypes.bool,
    dots: _san.DataTypes.bool,
    step: _san.DataTypes.number,
    marks: _san.DataTypes.object,
    vertical: _san.DataTypes.bool
  },
  computed: {
    points: function points() {
      var marks = this.data.get('marks');
      var dots = this.data.get('dots');
      var step = this.data.get('step');
      var min = this.data.get('min');
      var max = this.data.get('max');
      return calcPoints(marks, dots, step, min, max);
    }
  },
  pointClass: function pointClass(point) {
    var included = this.data.get('included');
    var max = this.data.get('max');
    var min = this.data.get('min');
    var isActive = !included && point === max || included && point <= max && point >= min;
    var classArr = ["".concat(prefixCls, "-dot")];
    isActive && classArr.push("".concat(prefixCls, "-dot-active"));
    return classArr;
  },
  pointStyle: function pointStyle(point) {
    var included = this.data.get('included');
    var vertical = this.data.get('vertical');
    var dotStyle = this.data.get('dotStyle') || {};
    var activeDotStyle = this.data.get('activeDotStyle') || {};
    var max = this.data.get('max');
    var min = this.data.get('min');
    var range = max - min;
    var isActive = !included && point === max || included && point <= max && point >= min;
    var offset = "".concat(Math.abs(point - min) / range * 100, "%");
    var style = vertical ? _objectSpread({
      bottom: offset
    }, dotStyle) : _objectSpread({
      left: offset
    }, dotStyle);

    if (isActive) {
      style = _objectSpread({}, style, {}, activeDotStyle);
    }

    return style;
  },
  template: "<div class=\"".concat(prefixCls, "\">\n        <span\n            s-for=\"point in points\"\n            class=\"{{pointClass(point)}}\"\n            style=\"{{pointStyle(point)}}\"\n        />\n    </div>")
});

exports["default"] = _default;