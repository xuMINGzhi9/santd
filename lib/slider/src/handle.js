"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _tooltip = _interopRequireDefault(require("../../tooltip"));

var _util = require("../../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd slider handle file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('slider-handle')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    vertical: _san.DataTypes.bool,
    offset: _san.DataTypes.number,
    disabled: _san.DataTypes.bool,
    max: _san.DataTypes.number,
    min: _san.DataTypes.number,
    value: _san.DataTypes.number,
    tabIndex: _san.DataTypes.number
  },
  components: {
    's-tooltip': _tooltip["default"]
  },
  computed: {
    isTipVisible: function isTipVisible() {
      var tooltipVisible = this.data.get('tooltipVisible');
      var tipFormatter = this.data.get('tipFormatter');
      var dragging = this.data.get('dragging');
      return tooltipVisible || tipFormatter && dragging;
    },
    title: function title() {
      var tipFormatter = this.data.get('tipFormatter');
      var value = this.data.get('value');
      return tipFormatter ? tipFormatter(value) : '';
    }
  },
  initData: function initData() {
    return {
      clickFocused: false
    };
  },
  attached: function attached() {
    var _this = this;

    if (!this._mouseUpHandler) {
      this._mouseUpHandler = this.handleMouseUp.bind(this);
    }

    this.data.set('rootDomNode', this.ref('handle'));
    document.addEventListener('mouseup', this._mouseUpHandler);
    this.dispatch('santd_slider_handle_save', this);
    this.watch('offset', function (val) {
      _this.nextTick(function () {
        var tooltip = _this.ref('tooltip');

        tooltip.refresh();
      });
    });
  },
  detached: function detached() {
    document.removeEventListener('mouseup', this._mouseUpHandler);
  },
  handleBlur: function handleBlur() {
    this.setClickFocus(false);
  },
  handleKeyDown: function handleKeyDown() {
    this.setClickFocus(false);
  },
  handleMouseDown: function handleMouseDown() {
    this.focus();
  },
  handleMouseUp: function handleMouseUp() {
    if (document.activeElement === this.el) {
      this.setClickFocus(true);
    }
  },
  setClickFocus: function setClickFocus(focused) {
    this.data.set('clickFocused', focused);
  },
  clickFocus: function clickFocus() {
    this.setClickFocus(true);
    this.focus();
  },
  focus: function focus() {
    this.el.focus();
  },
  blur: function blur() {
    this.el.blur();
  },
  template: "\n        <span>\n            <s-tooltip\n                rootDomNode=\"{{rootDomNode}}\"\n                useDomNodeForce=\"{{true}}\"\n                transitionName=\"zoom-down\"\n                title=\"{{title}}\"\n                s-ref=\"tooltip\"\n                visible=\"{{isTipVisible}}\"\n            >\n                <div\n                    s-ref=\"handle\"\n                    tabIndex=\"{{(disabled || tabIndex == null) ? '' : tabIndex}}\"\n                    class=\"".concat(prefixCls, "{{index ? ' ").concat(prefixCls, "-' + index : ''}}{{clickFocused ? ' ").concat(prefixCls, "-click-focused' : ''}}\"\n                    style=\"{{vertical ? 'bottom' : 'left'}}:{{offset}}%;\"\n                    on-blur=\"handleBlur\"\n                    on-keydown=\"handleKeyDown\"\n                    on-mousedown=\"handleMouseDown\"\n                    role=\"slider\"\n                    aria-valuemin=\"{{min}}\"\n                    aria-valuemax=\"{{max}}\"\n                    aria-valuenow=\"{{value}}\"\n                    aria-disabled=\"{{!!disabled}}\"\n                />\n            </s-tooltip>\n        </span>")
});

exports["default"] = _default;