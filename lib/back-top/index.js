"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _dom = require("../core/util/dom");

var _util = require("../core/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 back-top
 * @author raowenjuan <raowenjuan@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('back-top')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    visibilityHeight: _san.DataTypes.number,
    target: _san.DataTypes.func
  },
  getCurrentScrollTop: function getCurrentScrollTop() {
    var targetNode = this.data.get('target')();

    if (targetNode === window) {
      return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    }

    return targetNode.scrollTop;
  },
  setScrollTop: function setScrollTop(value) {
    var targetNode = this.data.get('target')();

    if (targetNode === window) {
      document.body.scrollTop = value;
      document.documentElement.scrollTop = value;
    } else {
      targetNode.scrollTop = value;
    }
  },
  scrollToTop: function scrollToTop(e) {
    this.setScrollTop(0);
    this.fire('click', e);
  },
  initData: function initData() {
    return {
      visibilityHeight: 400,
      target: function target() {
        return window;
      },
      visible: false
    };
  },
  inited: function inited() {
    if (this.sourceSlots.noname && this.sourceSlots.noname.length) {
      this.data.set('hasSlot', true);
    }
  },
  handleScroll: function handleScroll() {
    var scrollTop = this.getCurrentScrollTop();
    this.data.set('visible', scrollTop > this.data.get('visibilityHeight'));
  },
  attached: function attached() {
    this._scroll = this.handleScroll.bind(this);
    var node = this.data.get('target')();
    (0, _dom.on)(node, 'scroll', this._scroll);
    this.handleScroll();
  },
  disposed: function disposed() {
    var node = this.data.get('target')();
    (0, _dom.off)(node, 'scroll', this._scroll);
    this._scroll = null;
  },
  template: "\n        <div>\n            <div s-if=\"{{visible}}\" class=\"".concat(prefixCls, "\" on-click=\"scrollToTop($event)\">\n                <div class=\"").concat(prefixCls, "-content\" data-hasSlot=\"{{hasSlot}}\">\n                    <div class=\"").concat(prefixCls, "-icon\" s-if=\"{{!hasSlot}}\"></div>\n                    <slot/>\n                </div>\n            </div>\n        </div>\n    ")
});

exports["default"] = _default;