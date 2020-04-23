"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _domAlign = require("dom-align");

var _util = require("./util");

var _animate = _interopRequireDefault(require("../util/animate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _san["default"].defineComponent({
  dataTypes: {
    hiddenClassName: _san.DataTypes.string,
    visible: _san.DataTypes.bool,
    prefixCls: _san.DataTypes.string
  },
  handleMouseEnter: function handleMouseEnter(e) {
    this.fire('mouseenter', e);
  },
  handleMouseLeave: function handleMouseLeave(e) {
    this.fire('mouseleave', e);
  },
  handleMouseDown: function handleMouseDown(e) {
    this.fire('mousedown', e);
  },
  handleTouchStart: function handleTouchStart(e) {
    this.fire('touchstart', e);
  },
  initData: function initData() {
    return _objectSpread({}, _animate["default"].prototype.initData(), {
      monitorBufferTime: 50,
      monitorWindowResize: false,
      disabled: false
    });
  },
  attached: function attached() {
    var disabled = this.data.get('disabled');
    var monitorWindowResize = this.data.get('monitorWindowResize');

    if (!disabled && monitorWindowResize) {
      this.startMonitorWindowResize();
    }

    _animate["default"].prototype.attached.bind(this)();
  },
  updated: function updated() {
    var visible = this.data.get('visible');
    var target = this.data.get('target');

    if (!target) {
      return;
    }

    if (visible) {
      this.forceAlign();
    }

    _animate["default"].prototype.updated.bind(this)();
  },
  detached: function detached() {
    this.stopMonitorWindowResize();
  },
  startMonitorWindowResize: function startMonitorWindowResize() {
    if (!this.bufferMonitor) {
      this.bufferMonitor = (0, _util.buffer)(this.forceAlign.bind(this), this.data.get('monitorBufferTime'));
      window.addEventListener('resize', this.bufferMonitor, false);
    }
  },
  stopMonitorWindowResize: function stopMonitorWindowResize() {
    if (this.bufferMonitor) {
      this.bufferMonitor.clear();
      window.removeEventListener('resize', this.bufferMonitor, false);
    }
  },
  forceAlign: function forceAlign() {
    var _this$data$get = this.data.get(),
        disabled = _this$data$get.disabled,
        target = _this$data$get.target,
        align = _this$data$get.align;

    if (!disabled && target) {
      if (target instanceof window.HTMLElement) {
        (0, _domAlign.alignElement)(this.el, target, align);
      } else if (target && _typeof(target) === 'object') {
        (0, _domAlign.alignPoint)(this.el, target, align);
      }

      (0, _util.restoreFocus)(document.activeElement, this.el);
    }
  },
  template: "\n        <div style=\"position: absolute; z-index: 1000; {{popupStyle}}\" class=\"{{visible ? '' : hiddenClassName}}\">\n            <div\n                class=\"{{popupClassName}} {{prefixCls}}-content\"\n                on-mouseenter=\"handleMouseEnter\"\n                on-mouseleave=\"handleMouseLeave\"\n                on-mousedown=\"handleMouseDown\"\n                on-touchstart=\"handleTouchStart\"\n            >\n                <slot />\n            </div>\n       </div>\n    "
}, _animate["default"]);

exports["default"] = _default;