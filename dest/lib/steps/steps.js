"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file steps,step的外层容器
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('steps')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    direction: _san.DataTypes.string,
    labelPlacement: _san.DataTypes.string,
    current: _san.DataTypes.number,
    progressDot: _san.DataTypes.bool,
    size: _san.DataTypes.string,
    status: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      direction: 'horizontal',
      labelPlacement: 'horizontal',
      current: 0,
      status: 'process',
      size: '',
      progressDot: false,
      flexSupported: true
    };
  },
  computed: {
    classes: function classes() {
      var direction = this.data.get('direction');
      var size = this.data.get('size');
      var labelPlacement = this.data.get('labelPlacement');
      var hasDot = this.data.get('hasDot');
      var adjustedlabelPlacement = hasDot ? 'vertical' : labelPlacement;
      var flexSupported = this.data.get('flexSupported');
      var classArr = [prefixCls, "".concat(prefixCls, "-").concat(direction)];
      size && classArr.push("".concat(prefixCls, "-").concat(size));
      direction === 'horizontal' && classArr.push("".concat(prefixCls, "-label-").concat(adjustedlabelPlacement));
      !!hasDot && classArr.push("".concat(prefixCls, "-dot"));
      !flexSupported && classArr.push("".concat(prefixCls, "-flex-not-supported"));
      return classArr;
    }
  },
  inited: function inited() {
    this.items = [];
    this.data.set('hasDot', this.data.get('progressDot') || !!this.sourceSlots.named.progressDot);
  },
  updated: function updated() {
    var status = this.data.get('status');
    var current = this.data.get('current'); // 判断是否有change方法

    var hasChange = !!this.listeners.change;
    this.items.forEach(function (item, index) {
      item.data.set('stepNumber', index + 1);
      item.data.set('stepIndex', index);
      status === 'error' && index === current - 1 && item.data.set('class', "".concat(prefixCls, "-next-error"));

      if (index === Number(current)) {
        item.data.set('status', status);
      } else {
        item.data.set('status', index < current ? 'finish' : 'wait');
      }

      item.data.set('hasChange', hasChange);
    });
  },
  attached: function attached() {
    this.updated();
  },
  messages: {
    santd_steps_addStep: function santd_steps_addStep(payload) {
      this.items.push(payload.value);
    },
    santd_steps_clickStep: function santd_steps_clickStep(payload) {
      var current = this.data.get('current');

      if (current !== payload.value) {
        this.fire('change', payload.value);
      }
    }
  },
  template: "<div class=\"{{classes}}\">\n        <slot />\n    </div>"
});

exports["default"] = _default;