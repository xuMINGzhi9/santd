"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _Dialog = _interopRequireDefault(require("../modal/Dialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 notification/Notice
 * @author baozhixin <baozhixin@baidu.com>
 */
var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"{{noticeClass}}\"\n            style=\"{{style | css}}\"\n            on-click=\"handleClick\"\n            on-mouseenter=\"clearCloseTimer\"\n            on-mouseleave=\"startCloseTimer\"\n        >\n            <div class=\"{{prefixCls}}-notice-content\" s-ref=\"content\"><slot/></div>\n            <a s-if=\"closable\" on-click=\"handleClose\" class=\"{{prefixCls}}-notice-close\" tabIndex=\"0\">\n                <slot name=\"close-icon\">\n                    <span class=\"{{prefixCls}}-notice-close-x\">\u5173\u95ED</span>\n                </slot>\n            </a>\n        </div>\n    ",
  dataTypes: {
    duration: _san.DataTypes.number,
    closable: _san.DataTypes.bool,
    prefixCls: _san.DataTypes.string,
    update: _san.DataTypes.bool
  },
  computed: {
    noticeClass: function noticeClass() {
      var data = this.data;
      var closable = data.get('closable');
      var componentClass = data.get('prefixCls') + '-notice';
      var classArr = [componentClass];
      closable && classArr.push("".concat(componentClass, "-closable"));
      return classArr;
    }
  },
  filters: _Dialog["default"],
  initData: function initData() {
    return {
      duration: 1.5,
      style: {
        right: '50%'
      }
    };
  },
  attached: function attached() {
    var _this = this;

    this.startCloseTimer();
    this.watch('duration', function (duration) {
      _this.startCloseTimer();
    });
  },
  updated: function updated() {
    if (this.data.get('update')) {
      this.startCloseTimer();
    }
  },
  handleClick: function handleClick(e) {
    e.preventDefault();
    this.fire('click', e);
  },
  handleClose: function handleClose(e) {
    e && (e.preventDefault(), e.stopPropagation());
    this.clearCloseTimer();
    this.fire('close', e);
  },
  clearCloseTimer: function clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  },
  startCloseTimer: function startCloseTimer() {
    var _this2 = this;

    var duration = this.data.get('duration');
    this.clearCloseTimer();

    if (duration) {
      this.closeTimer = setTimeout(function () {
        _this2.handleClose();
      }, duration * 1e3);
    }
  }
});

exports["default"] = _default;