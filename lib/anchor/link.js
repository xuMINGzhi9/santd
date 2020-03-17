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
 * @file Santd anchor link file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('anchor')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    prefixCls: _san.DataTypes.string,
    href: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      href: '#'
    };
  },
  inited: function inited() {
    this.dispatch('santd_link_addInstance', this);
  },
  updated: function updated() {
    this.dispatch('santd_link_add', this.data.get('href'));
  },
  attached: function attached() {
    this.dispatch('santd_link_add', this.data.get('href'));
  },
  detached: function detached() {
    this.dispatch('santd_link_rm', this.data.get('href'));
  },
  handleClick: function handleClick(e) {
    var _this$data$get = this.data.get(),
        href = _this$data$get.href,
        title = _this$data$get.title;

    this.dispatch('santd_link_click', {
      e: e,
      link: {
        href: href,
        title: title
      }
    });
    this.dispatch('santd_link_scrollTo', href);
  },
  messages: {
    santd_link_add: function santd_link_add(payload) {
      var _this = this;

      // 修复子组件多层嵌套时dispatch顺序不正确的问题
      this.nextTick(function () {
        _this.dispatch('santd_link_add', payload.value);
      });
    }
  },
  template: "\n        <div class=\"".concat(prefixCls, "-link {{activeLink === href ? '").concat(prefixCls, "-link-active' : ''}}\">\n            <a\n                class=\"").concat(prefixCls, "-link-title {{activeLink === href ? '").concat(prefixCls, "-link-title-active' : ''}}\"\n                href=\"{{href}}\"\n                title=\"{{title}}\"\n                on-click=\"handleClick\"\n            >\n                {{title}}\n            </a>\n            <slot />\n        </div>\n    ")
});

exports["default"] = _default;