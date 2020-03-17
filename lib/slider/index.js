"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _handle = _interopRequireDefault(require("./src/handle"));

var _steps = _interopRequireDefault(require("./src/steps"));

var _marks = _interopRequireDefault(require("./src/marks"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var prefixCls = (0, _util.classCreator)('slider')();

function tipFormatter(value) {
  return String(value);
}

function ensureValueInRange(val, min, max) {
  if (val < min) {
    return min;
  }

  if (val > max) {
    return max;
  }

  return val;
}

function ensureValuePrecision(val, step, marks, min, max) {
  var points = Object.keys(marks).map(parseFloat);

  if (step !== null) {
    var maxSteps = Math.floor((max - min) / step);
    var steps = Math.min((val - min) / step, maxSteps);
    points.push(Math.round(steps) * step + min);
  }

  var diffs = points.map(function (point) {
    return Math.abs(val - point);
  });
  var closestPoint = points[diffs.indexOf(Math.min.apply(Math, _toConsumableArray(diffs)))];

  if (!isFinite(closestPoint)) {
    closestPoint = 0;
  }

  return step === null ? closestPoint : closestPoint.toFixed(getPrecision(step)) - 0;
}

function getPrecision(step) {
  var stepString = String(step);
  var precision = 0;
  var dotIndex = stepString.indexOf('.');

  if (dotIndex >= 0) {
    precision = stepString.length - dotIndex - 1;
  }

  return precision;
}

function isEventFromHandle(eventTarget, handles) {
  for (var key in handles) {
    if (!handles.hasOwnProperty[key]) {
      var handle = handles[key];

      if (handle && handle.el === eventTarget) {
        return true;
      }
    }
  }

  return false;
}

function getHandleCenterPosition(vertical, eventTarget) {
  var coords = eventTarget.getBoundingClientRect();
  return vertical ? coords.top + coords.height * 0.5 : window.pageXOffset + coords.left + coords.width * 0.5;
}

var _default = _san["default"].defineComponent({
  template: "<div\n        style=\"{{vertical ? 'height: 100%;' : ''}}\"\n        class=\"".concat(prefixCls, " {{classes}}\"\n        on-mousedown=\"rootMouseDown\"\n        on-focus=\"rootFocus\"\n    >\n        <div class=\"").concat(prefixCls, "-rail\" />\n        <div\n            s-if=\"included\"\n            class=\"").concat(prefixCls, "-track{{track.index ? ' ").concat(prefixCls, "-track-' + track.index : ''}}\"\n            style=\"{{vertical ? 'bottom' : 'left'}}:{{track.offset}}%;{{vertical ? 'height' : 'width'}}:{{track.len}}%;\"\n        ></div>\n        <s-steps\n            vertical=\"{{vertical}}\"\n            marks=\"{{marks}}\"\n            dots=\"{{dots}}\"\n            step=\"{{step}}\"\n            included=\"{{included}}\"\n            max=\"{{max}}\"\n            min=\"{{min}}\"\n            dotStyle=\"{{dotStyle}}\"\n            activeDotStyle=\"{{activeDotStyle}}\"\n        />\n        <s-handle\n            s-for=\"v, i in handles trackBy i\"\n            s-ref=\"handle-{{i}}\"\n            index=\"{{i + 1}}\"\n            vertical=\"{{vertical}}\"\n            offset=\"{{(v - min) / (max - min) * 100}}\"\n            value=\"{{v}}\"\n            dragging=\"{{i === handleIndex}}\"\n            tabIndex=\"{{0}}\"\n            min=\"{{min}}\"\n            max=\"{{max}}\"\n            disabled=\"{{disabled}}\"\n            tooltipVisible=\"{{tooltipVisible || activeHandleIndex === i}}\"\n            tipFormatter=\"{{tipFormatter}}\"\n            on-mouseenter=\"native:updateActiveHandleIndex(i, true)\"\n            on-mouseleave=\"native:updateActiveHandleIndex(i, false)\"\n        />\n        <s-marks\n            vertical=\"{{vertical}}\"\n            marks=\"{{marks}}\"\n            included=\"{{included}}\"\n            max=\"{{max}}\"\n            min=\"{{min}}\"\n        />\n    </div>"),
  components: {
    's-steps': _steps["default"],
    's-marks': _marks["default"],
    's-handle': _handle["default"]
  },
  messages: {
    santd_slider_handle_save: function santd_slider_handle_save(payload) {
      var component = payload.value;
      var index = component.data.get('index') || 0;
      this.handlesRefs[index] = component;
    }
  },
  computed: {
    classes: function classes() {
      var disabled = this.data.get('disabled');
      var vertical = this.data.get('vertical');
      var marks = this.data.get('marks');
      var classArr = [];
      Object.keys(marks).length && classArr.push("".concat(prefixCls, "-with-marks"));
      disabled && classArr.push("".concat(prefixCls, "-disabled"));
      vertical && classArr.push("".concat(prefixCls, "-vertical"));
      return classArr;
    },
    track: function track() {
      var range = this.data.get('range');
      var value = this.data.get('value');
      var min = this.data.get('min');
      var max = this.data.get('max');

      if (value != null) {
        return range ? {
          offset: (value[0] - min) / (max - min) * 100,
          len: (value[1] - value[0] - min) / (max - min) * 100,
          index: 1
        } : {
          offset: 0,
          len: (value - min) / (max - min) * 100
        };
      }
    },
    handles: function handles() {
      var value = this.data.get('value');
      return this.data.get('range') ? value : [value];
    }
  },
  initData: function initData() {
    return {
      min: 0,
      max: 100,
      step: 1,
      marks: {},
      included: true,
      disabled: false,
      dots: false,
      vertical: false,
      trackStyle: [{}],
      handleStyle: [{}],
      railStyle: {},
      dotStyle: {},
      activeDotStyle: {},
      tipFormatter: tipFormatter
    };
  },
  inited: function inited() {
    var _this = this;

    this.handlesRefs = {};

    var _this$data$get = this.data.get(),
        min = _this$data$get.min,
        value = _this$data$get.value,
        range = _this$data$get.range;

    if (value == null) {
      value = this.data.get('defaultValue') || (range ? [min, min] : min);
    } else if (range) {
      value = value.map(function (v) {
        return _this.correctValue(v);
      });
    } else {
      value = this.correctValue(value);
    }

    this.data.set('value', value);
  },
  correctValue: function correctValue(value) {
    var _this$data$get2 = this.data.get(),
        min = _this$data$get2.min,
        max = _this$data$get2.max,
        step = _this$data$get2.step,
        marks = _this$data$get2.marks;

    return ensureValuePrecision(ensureValueInRange(value, min, max), step, marks, min, max);
  },
  rootBlur: function rootBlur(e) {
    if (!this.data.get('disabled')) {
      this.handleEnd();
      this.fire('blur', e);
    }
  },
  rootFocus: function rootFocus(e) {
    var disabled = this.data.get('disabled');

    if (!disabled && isEventFromHandle(e.target, this.handlesRefs)) {
      e.stopPropagation();
      e.preventDefault();
      var vertical = this.data.get('vertical');
      var handlePosition = getHandleCenterPosition(vertical, e.target);
      this.dragOffset = 0;
      this.handleStart(handlePosition);
      this.fire('focus', e);
    }
  },
  rootMouseDown: function rootMouseDown(e) {
    if (!this.data.get('disabled')) {
      if (e.button !== 0) {
        return;
      }

      var vertical = this.data.get('vertical');
      var position = vertical ? e.clientY : e.pageX;

      if (!isEventFromHandle(e, this.handlesRefs)) {
        this.dragOffset = 0;
      } else {
        var handlePosition = getHandleCenterPosition(vertical, e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
      }

      this.removeDocMouseListeners();
      this.handleStart(position);
      this.addDocMouseListeners();
    }
  },
  handleStart: function handleStart(position) {
    if (this.data.get('range')) {
      var values = this.data.get('value');
      this.fire('beforeChange', values);
      var value = this.calcValueByPos(position);
      var handleIndex = 0;

      if (values[0] === values[1]) {
        handleIndex = value < values[1] ? 0 : 1;
      } else if (Math.abs(values[0] - value) > Math.abs(values[1] - value)) {
        handleIndex = 1;
      }

      this.data.set('handleIndex', handleIndex);
      this.data.set('value[' + handleIndex + ']', value);
      this.fire('change', this.data.get('value'));
    } else {
      this.fire('beforeChange', this.data.get('value'));
      this.data.set('handleIndex', 0);
      var max = this.data.get('max');

      var _value = Math.min(this.calcValueByPos(position), max);

      this.data.set('value', _value);
      this.fire('change', _value);
    }
  },
  updateActiveHandleIndex: function updateActiveHandleIndex(index, visible) {
    this.data.set('activeHandleIndex', visible ? index : null);
  },
  handleMouseMove: function handleMouseMove(e) {
    if (!this.el) {
      this.handleEnd();
      return;
    }

    var position = this.data.get('vertical') ? e.clientY : e.pageX;
    this.handleMove(e, position - this.dragOffset);
  },
  handleMove: function handleMove(e, position) {
    e.stopPropagation();
    e.preventDefault();
    var value = this.calcValueByPos(position);

    if (this.data.get('range')) {
      var handleIndex = this.data.get('handleIndex');
      var values = this.data.get('value').slice(0);

      if (values[handleIndex] !== value) {
        values[handleIndex] = value;

        if (values[0] > values[1]) {
          this.data.set('handleIndex', handleIndex ? 0 : 1);
          values = [values[1], values[0]];
        }

        this.data.set('value', values);
        this.fire('change', values);
      }
    } else {
      value = Math.min(value, this.data.get('max'));

      if (value !== this.data.get('value')) {
        this.data.set('value', value);
        this.fire('change', value);
      }
    }
  },
  handleEnd: function handleEnd() {
    this.removeDocMouseListeners();
    var handleIndex = this.data.get('handleIndex');

    if (this.data.get('handleIndex') != null) {
      this.data.set('handleIndex', null);
      this.ref('handle-' + handleIndex).clickFocus();
      this.fire('afterChange', this.data.get('value'));
    }
  },
  addDocMouseListeners: function addDocMouseListeners() {
    if (this.el) {
      this._mouseMoveHandler = this.handleMouseMove.bind(this);
      this._endHandler = this.handleEnd.bind(this);
      this.el.ownerDocument.addEventListener('mousemove', this._mouseMoveHandler);
      this.el.ownerDocument.addEventListener('mouseup', this._endHandler);
    }
  },
  removeDocMouseListeners: function removeDocMouseListeners() {
    if (this.el && this._endHandler) {
      this.el.ownerDocument.removeEventListener('mousemove', this._mouseMoveHandler);
      this.el.ownerDocument.removeEventListener('mouseup', this._endHandler);
      this._endHandler = this._mouseMoveHandler = null;
    }
  },
  getSliderStart: function getSliderStart() {
    var rect = this.el.getBoundingClientRect();
    return this.data.get('vertical') ? rect.top : rect.left + window.pageXOffset;
  },
  getSliderLength: function getSliderLength() {
    var slider = this.el;

    if (!slider) {
      return 0;
    }

    var coords = slider.getBoundingClientRect();
    return this.data.get('vertical') ? coords.height : coords.width;
  },
  calcValueByPos: function calcValueByPos(position) {
    var _this$data$get3 = this.data.get(),
        vertical = _this$data$get3.vertical,
        min = _this$data$get3.min,
        max = _this$data$get3.max;

    var ratio = Math.abs(Math.max(position - this.getSliderStart(), 0) / this.getSliderLength());
    var value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
    return this.correctValue(value);
  }
});

exports["default"] = _default;