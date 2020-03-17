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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var prefixCls = (0, _util.classCreator)('menu')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    mode: _san.DataTypes.oneOf(['vertical', 'horizontal', 'inline']),
    theme: _san.DataTypes.oneOf(['light', 'dark']),
    defaultSelectedKeys: _san.DataTypes.array,
    defaultOpenKeys: _san.DataTypes.array,
    inlineCollapsed: _san.DataTypes.bool,
    openKeys: _san.DataTypes.array,
    inlineIndent: _san.DataTypes.number,
    multiple: _san.DataTypes.bool,
    selectable: _san.DataTypes.bool,
    selectedKeys: _san.DataTypes.array,
    subMenuCloseDelay: _san.DataTypes.number,
    subMenuOpenDelay: _san.DataTypes.number,
    forceSubMenuRender: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      mode: 'vertical',
      theme: 'light',
      inlineIndent: 24,
      multiple: false,
      selectable: true,
      subMenuCloseDelay: 0.1,
      subMenuOpenDelay: 0,
      defaultOpenKeys: [],
      level: 1
    };
  },
  computed: {
    rootPrefixCls: function rootPrefixCls() {
      var rootPrefixCls = this.data.get('prefixCls');
      return rootPrefixCls ? rootPrefixCls + '-menu' : prefixCls;
    },
    classes: function classes() {
      var mode = this.data.get('mode');
      var theme = this.data.get('theme');
      var inlineCollapsed = this.data.get('inlineCollapsed');
      var menuPrefixCls = this.data.get('rootPrefixCls');
      var classArr = [menuPrefixCls, "".concat(menuPrefixCls, "-root")];
      !!mode && classArr.push("".concat(menuPrefixCls, "-").concat(mode));
      !!theme && classArr.push("".concat(menuPrefixCls, "-").concat(theme));
      inlineCollapsed && classArr.push("".concat(menuPrefixCls, "-inline-collapsed"));
      return classArr;
    }
  },
  inited: function inited() {
    this.items = [];
    this.subMenus = [];
    this.data.set('selectedKeys', this.data.get('selectedKeys') || this.data.get('defaultSelectedKeys') || []);
    this.data.set('openKeys', this.data.get('openKeys') || this.data.get('defaultOpenKeys') || []);
  },
  attached: function attached() {
    this.updateItems();
  },
  updated: function updated() {
    this.updateItems();
  },
  updateItems: function updateItems() {
    var _this = this;

    var paramsArr = ['mode', 'level', 'selectedKeys', 'openKeys', 'rootPrefixCls', 'multiple'];
    this.items.forEach(function (item) {
      paramsArr.forEach(function (param) {
        item.data.set(param, _this.data.get(param), {
          force: true
        });
      });
    });
  },
  handleSelect: function handleSelect(selectInfo) {
    if (!this.data.get('selectable')) {
      return;
    }

    var selectedKeys = this.data.get('selectedKeys');
    var selectedKey = selectInfo.key;
    var multiple = this.data.get('multiple');
    selectedKeys = multiple ? [].concat(_toConsumableArray(selectedKeys), [selectedKey]) : [selectedKey];
    this.data.set('selectedKeys', selectedKeys);
    this.updateItems();
    this.fire('select', _objectSpread({}, selectInfo, {
      selectedKeys: selectedKeys
    }));
  },
  handleDeselect: function handleDeselect(selectInfo) {
    if (!this.data.get('selectable')) {
      return;
    }

    var selectedKeys = this.data.get('selectedKeys');
    var selectedKey = selectInfo.key;
    var index = selectedKeys.indexOf(selectedKey);

    if (index !== -1) {
      selectedKeys.splice(index, 1);
    }

    this.data.set('selectedKeys', selectedKeys);
    this.updateItems();
    this.fire('deselect', _objectSpread({}, selectInfo, {
      selectedKeys: selectedKeys
    }));
  },
  handleOpenChange: function handleOpenChange(event) {
    var openKeys = this.data.get('openKeys').concat();
    var changed = false;

    if (event.open) {
      if (!openKeys.includes(event.key)) {
        openKeys.push(event.key);
        changed = true;
      }
    } else {
      var index = openKeys.indexOf(event.key);

      if (index !== -1) {
        openKeys.splice(index, 1);
        changed = true;
      }
    }

    if (changed) {
      var prevOpenKeys = this.data.get('openKeys').concat();
      this.data.set('openKeys', openKeys);
      this.updateItems();
      this.fire('openChange', {
        openKeys: openKeys,
        prevOpenKeys: prevOpenKeys
      });
    }
  },
  messages: {
    santd_menu_addItem: function santd_menu_addItem(payload) {
      this.items.push(payload.value);
    },
    santd_menu_itemSelect: function santd_menu_itemSelect(payload) {
      this.handleSelect(payload.value);
    },
    santd_menu_itemDeselect: function santd_menu_itemDeselect(payload) {
      this.handleDeselect(payload.value);
    },
    santd_menu_itemClick: function santd_menu_itemClick(payload) {
      this.fire('click', payload.value);
      this.dispatch('santd_menu_itemClick', payload.value);
    },
    santd_menu_openChange: function santd_menu_openChange(payload) {
      this.handleOpenChange(payload.value);
    }
  },
  template: "\n        <ul class=\"{{classes}}\" role=\"{{role || 'menu'}}\"><slot/></ul>\n    "
});

exports["default"] = _default;