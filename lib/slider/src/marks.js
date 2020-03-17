"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../../core/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var prefixCls = (0, _util.classCreator)('slider-mark')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    vertical: _san.DataTypes.bool,
    marks: _san.DataTypes.object,
    included: _san.DataTypes.bool,
    max: _san.DataTypes.number,
    min: _san.DataTypes.number
  },
  computed: {
    marksArr: function marksArr() {
      var result = [];
      var marks = this.data.get('marks') || {};
      var markPoints = Object.keys(marks).sort(function (a, b) {
        return a - b;
      });

      for (var i = 0; i < markPoints.length; i++) {
        var point = markPoints[i];
        var mark = marks[point];
        var item = {
          point: point
        };

        if (_typeof(mark) === 'object') {
          item.label = mark.label;
          item.style && (item.style = mark.style);
        } else {
          item.label = mark;
        }

        if (item.label || item.label === 0) {
          result.push(item);
        }
      }

      return result;
    }
  },
  markClass: function markClass(point, included, max, min) {
    if (!included && point === max || included && point <= max && point >= min) {
      return " ".concat(prefixCls, "-text-active");
    }

    return '';
  },
  markStyle: function markStyle(point, vertical, max, min) {
    var offset = (point - min) / (max - min) * 100;
    return vertical ? "margin-bottom:-50%;bottom:".concat(offset, "%;") : "left: ".concat(offset, "%;transform:translateX(-50%);-ms-transform:translateX(-50%)");
  },
  handleClickLabel: function handleClickLabel(e, point) {
    this.fire('clickLabel', {
      e: e,
      point: point
    });
  },
  template: "<div class=\"".concat(prefixCls, "\">\n        <span\n            s-for=\"mark in marksArr trackBy mark.point\"\n            class=\"").concat(prefixCls, "-text{{markClass(mark.point, included, max, min)}}\"\n            style=\"{{mark.style}}{{markStyle(mark.point, vertical, max, min)}}\"\n            on-mousedown=\"handleClickLabel($event, point)\"\n            on-touchstart=\"handleClickLabel($event, point)\"\n        >{{mark.label}}</span>\n    </div>")
});

exports["default"] = _default;