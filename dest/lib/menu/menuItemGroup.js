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
* @file menuItemGroup component
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('menu')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    title: _san.DataTypes.any
  },
  computed: {
    // 因为menu有其他组件调用传入prefixCls，所以这里需要重新设置menu prefixCls
    groupPrefixCls: function groupPrefixCls() {
      var rootPrefixCls = this.data.get('prefixCls');
      return (rootPrefixCls ? rootPrefixCls : prefixCls) + '-item-group';
    }
  },
  initData: function initData() {
    return {
      inlineIndent: 24
    };
  },
  inited: function inited() {
    this.items = [];
  },
  itemGroupClick: function itemGroupClick(e) {
    e.stopPropagation();
  },
  getTitleStyle: function getTitleStyle(mode, level) {
    var inlineIndent = this.data.get('inlineIndent');
    return mode === 'inline' ? "padding-left: ".concat(inlineIndent * level, "px;") : '';
  },
  updated: function updated() {
    var level = this.data.get('level');
    this.items.forEach(function (item) {
      item.data.set('level', level + 1);
    });
  },
  messages: {
    santd_menu_addItem: function santd_menu_addItem(payload) {
      this.items.push(payload.value);
      this.dispatch('santd_menu_addItem', payload.value);
    }
  },
  attached: function attached() {
    this.dispatch('santd_menu_addItem', this);
  },
  template: "\n        <li class=\"{{groupPrefixCls}}\" on-click=\"itemGroupClick($event)\">\n            <div\n                class=\"{{groupPrefixCls}}-title\"\n                style=\"{{getTitleStyle(mode, level)}}\"\n            >\n                <slot name=\"title\" s-if=\"!title\" />\n                <template s-else>{{title}}</template>\n            </div>\n            <ul class=\"{{groupPrefixCls}}-list\">\n                <slot />\n            </ul>\n        </li>\n    "
});

exports["default"] = _default;