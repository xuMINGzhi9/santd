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
* @file menuItem component
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('menu-item')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    disabled: _san.DataTypes.bool,
    key: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    title: _san.DataTypes.string,
    multiple: _san.DataTypes.bool,
    selectedKeys: _san.DataTypes.array
  },
  computed: {
    classes: function classes() {
      var disabled = this.data.get('disabled');
      var active = this.data.get('active');
      var isSelected = this.data.get('isSelected');
      var rootPrefixCls = this.data.get('rootPrefixCls');
      rootPrefixCls = rootPrefixCls && rootPrefixCls + '-item' || prefixCls;
      var classArr = [rootPrefixCls];
      !disabled && active && classArr.push("".concat(rootPrefixCls, "-active"));
      isSelected && classArr.push("".concat(rootPrefixCls, "-selected"));
      disabled && classArr.push("".concat(rootPrefixCls, "-disabled"));
      return classArr;
    },
    isSelected: function isSelected() {
      var key = this.data.get('key');
      var selectedKeys = this.data.get('selectedKeys') || [];
      return selectedKeys.includes(key);
    },
    active: function active() {
      var key = this.data.get('key');
      var activeKey = this.data.get('activeKey') || {};
      var subMenuKey = this.data.get('subMenuKey');
      return activeKey[subMenuKey] === key;
    }
  },
  inited: function inited() {
    this.dispatch('santd_menu_addItem', this);
  },
  getItemStyle: function getItemStyle(mode, level) {
    var inlineIndent = this.data.get('inlineIndent');
    return mode === 'inline' ? "padding-left: ".concat(inlineIndent * level, "px;") : '';
  },
  handleClick: function handleClick(e) {
    if (this.data.get('disabled')) {
      return;
    }

    var _this$data$get = this.data.get(),
        key = _this$data$get.key,
        multiple = _this$data$get.multiple,
        isSelected = _this$data$get.isSelected;

    var info = {
      key: key,
      keyPath: [key],
      item: this,
      e: e
    };
    this.dispatch('santd_menu_itemClick', info);

    if (multiple) {
      var dispatchName = "santd_menu_".concat(isSelected ? 'itemDeselect' : 'itemSelect');
      this.dispatch(dispatchName, info);
    } else {
      this.dispatch('santd_menu_itemSelect', info);
    }
  },
  handleMouseEnter: function handleMouseEnter(e) {
    if (this.data.get('disabled')) {
      return;
    }

    var key = this.data.get('key');
    this.dispatch('santd_menu_itemHover', {
      key: key,
      hover: true
    });
    this.dispatch('santd_menu_itemMouseEnter', {
      key: key,
      e: e
    });
  },
  handleMouseLeave: function handleMouseLeave(e) {
    if (this.data.get('disabled')) {
      return;
    }

    var key = this.data.get('key');
    this.dispatch('santd_menu_itemHover', {
      key: key,
      hover: false
    });
    this.dispatch('santd_menu_itemMouseLeave', {
      key: key,
      e: e
    });
  },
  template: "\n        <li\n            class=\"{{classes}}\"\n            style=\"{{getItemStyle(mode, level)}}\"\n            role=\"{{role || 'menuitem'}}\"\n            aria-disabled=\"{{disabled}}\"\n            aria-selected=\"{{isSelected}}\"\n            on-click=\"handleClick($event)\"\n            on-mouseleave=\"handleMouseLeave($event)\"\n            on-mouseenter=\"handleMouseEnter($event)\"\n        >\n            <slot />\n        </li>\n    "
});

exports["default"] = _default;