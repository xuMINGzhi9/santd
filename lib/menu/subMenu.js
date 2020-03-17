"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _trigger = _interopRequireDefault(require("../core/trigger"));

var _animate = _interopRequireDefault(require("../core/util/animate"));

var _openAnimation = _interopRequireDefault(require("../core/util/openAnimation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file subMenu component
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('menu')();

function loopMenuItem() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var keys = arguments.length > 1 ? arguments[1] : undefined;
  var ret = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  children.forEach(function (child) {
    if (keys.includes(child.data.get('key'))) {
      ret.find = true;
    } else {
      loopMenuItem(child.items, keys, ret);
    }
  });
  return ret;
}

var builtinPlacements = {
  leftTop: {
    points: ['tr', 'tl'],
    offset: [-4, 0],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  rightTop: {
    points: ['tl', 'tr'],
    offset: [4, 0],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  bottomCenter: {
    points: ['tc', 'bc'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var _default = _san["default"].defineComponent({
  dataTypes: {
    disabled: _san.DataTypes.bool,
    key: _san.DataTypes.string,
    title: _san.DataTypes.any,
    inlineIndent: _san.DataTypes.number
  },
  initData: function initData() {
    return {
      openKeys: [],
      activeKey: [],
      openAnimation: _openAnimation["default"],
      isSubMenu: true,
      inlineIndent: 16,
      builtinPlacements: builtinPlacements,
      trigger: 'hover',
      transitionName: 'zoom-big',
      noSubClick: true
    };
  },
  computed: {
    // 因为menu有其他组件调用传入prefixCls，所以这里需要重新设置menu prefixCls
    menuPrefixCls: function menuPrefixCls() {
      var rootPrefixCls = this.data.get('rootPrefixCls');
      return (rootPrefixCls ? rootPrefixCls : prefixCls) + '-submenu';
    },
    classes: function classes() {
      var menuPrefixCls = this.data.get('menuPrefixCls');
      var mode = this.data.get('mode');
      var isOpen = this.data.get('isOpen');
      var isInlineMode = this.data.get('mode') === 'inline';
      var active = this.data.get('active');
      var disabled = this.data.get('disabled');
      var isChildrenSelected = this.data.get('isChildrenSelected');
      var classArr = [menuPrefixCls, "".concat(menuPrefixCls, "-").concat(mode)];
      isOpen && classArr.push("".concat(menuPrefixCls, "-open"));
      (active || isOpen && !isInlineMode) && classArr.push("".concat(menuPrefixCls, "-active"));
      disabled && classArr.push("".concat(menuPrefixCls, "-disabled"));
      isChildrenSelected && classArr.push("".concat(menuPrefixCls, "-selected"));
      return classArr;
    },
    isOpen: function isOpen() {
      var key = this.data.get('key');
      var noSubClick = this.data.get('noSubClick');
      return this.data.get('openKeys').includes(key) && noSubClick;
    },
    active: function active() {
      var subMenuKey = this.data.get('subMenuKey');

      if (subMenuKey) {
        return this.data.get('activeKey')[subMenuKey] === this.data.get('key');
      }
    }
  },
  inited: function inited() {
    this.items = [];
    this.subMenus = [];
    this.dispatch('santd_menu_addItem', this);
  },
  updated: function updated() {
    var _this = this;

    var paramsArr = ['mode', 'level', 'selectedKeys', 'openKeys', 'inlineIndent', 'rootPrefixCls'];
    this.items.forEach(function (item) {
      paramsArr.forEach(function (param) {
        var data = _this.data.get(param);

        if (param === 'level') {
          data++;
        }

        item.data.set(param, data, {
          force: true
        });
      });
    });
    var ret = loopMenuItem(this.items, this.data.get('selectedKeys'), {});
    this.data.set('isChildrenSelected', !!ret.find);

    if (this.data.get('mode') === 'inline') {
      this.data.set('noSubClick', true);
    }

    var mode = this.data.get('mode');
    this.data.set('triggerSubMenuAction', mode === 'inline' ? 'click' : 'hover');
  },
  messages: {
    santd_menu_addItem: function santd_menu_addItem(payload) {
      this.items.push(payload.value);
    },
    santd_menu_addSubMenu: function santd_menu_addSubMenu(payload) {
      this.subMenus.push(payload.value);
    },
    santd_menu_isSelected: function santd_menu_isSelected(payload) {
      this.data.set('isChildrenSelected', true);
    },
    santd_menu_itemClick: function santd_menu_itemClick(payload) {
      if (this.data.get('mode') !== 'inline') {
        this.data.set('noSubClick', false);
      }

      this.dispatch('santd_menu_itemClick', payload.value);
    }
  },
  components: {
    's-animate': _animate["default"],
    's-trigger': _trigger["default"]
  },
  getTitleStyle: function getTitleStyle(mode, level) {
    var inlineIndent = this.data.get('inlineIndent');
    return mode === 'inline' ? "padding-left: ".concat(inlineIndent * level, "px;") : '';
  },
  triggerOpenChange: function triggerOpenChange(open, type) {
    var _this2 = this;

    var key = this.data.get('key');

    if (type === 'mouseenter') {
      this.mouseenterTimeout = setTimeout(function () {
        _this2.dispatch('santd_menu_openChange', {
          key: key,
          item: _this2,
          trigger: type,
          open: open
        });
      }, 0);
    } else {
      this.dispatch('santd_menu_openChange', {
        key: key,
        item: this,
        trigger: type,
        open: open
      });
    }
  },
  handleTitleClick: function handleTitleClick(e) {
    if (this.data.get('triggerSubMenuAction') === 'hover') {
      return;
    }

    this.triggerOpenChange(!this.data.get('isOpen'), 'click');
  },
  handleVisibleChange: function handleVisibleChange(visible) {
    if (this.data.get('disabled')) {
      return;
    }

    this.data.set('noSubClick', visible);
    this.triggerOpenChange(visible, visible ? 'mouseenter' : 'mouseleave');
  },
  getPopupContainer: function getPopupContainer() {
    var _this3 = this;

    return function () {
      return _this3.el;
    };
  },
  template: "\n        <li class=\"{{classes}}\"\n            role=\"menuitem\"\n        >\n            <template s-if=\"mode === 'inline'\">\n                <div\n                    class=\"{{menuPrefixCls}}-title\"\n                    aria-expanded=\"{{isOpen}}\"\n                    aria-haspopup=\"true\"\n                    title=\"{{title}}\"\n                    style=\"{{getTitleStyle(mode, level)}}\"\n                    on-click=\"handleTitleClick\"\n                >\n                    <slot name=\"title\" s-if=\"!title\" />\n                    <template s-else>{{title}}</template>\n                    <i class=\"{{menuPrefixCls}}-arrow\" />\n                </div>\n                <s-animate hiddenClassName=\"".concat(prefixCls, "-hidden\" showProp=\"visible\" visible=\"{{isOpen}}\" animation=\"{{openAnimation}}\">\n                    <ul class=\"").concat(prefixCls, " {{rootPrefixCls}}-sub ").concat(prefixCls, "-{{mode}}\"><slot /></ul>\n                </s-animate>\n            </template>\n            <s-trigger\n                s-else\n                prefixCls=\"").concat(prefixCls, "\"\n                style=\"display: block;\"\n                popupPlacement=\"{{mode === 'horizontal' ? 'bottomCenter' : 'rightTop'}}\"\n                builtinPlacements=\"{{builtinPlacements}}\"\n                popupAlign=\"{{popupAlign}}\"\n                popupTransitionName=\"{{transitionName}}\"\n                defaultPopupVisible=\"{{defaultVisible}}\"\n                getPopupContainer=\"{{getPopupContainer()}}\"\n                mouseEnterDelay=\"{{mouseEnterDelay}}\"\n                mouseLeaveDelay=\"{{mouseLeaveDelay}}\"\n                popupClassName=\"{{overlayClassName}}\"\n                popupStyle=\"{{overlayStyle}}\"\n                action=\"hover\"\n                visible=\"{{isOpen}}\"\n                stretch=\"{{mode === 'horizontal' ? 'minWidth' : ''}}\"\n                on-visibleChange=\"handleVisibleChange\"\n            >\n                <ul class=\"").concat(prefixCls, " {{rootPrefixCls}}-sub ").concat(prefixCls, "-{{mode}}\" slot=\"popup\"><slot /></ul>\n                <div\n                    class=\"{{menuPrefixCls}}-title\"\n                    aria-expanded=\"{{isOpen}}\"\n                    aria-haspopup=\"true\"\n                    title=\"{{title}}\"\n                    style=\"{{getTitleStyle(mode, level)}}\"\n                    on-click=\"handleTitleClick\"\n                >\n                    <slot name=\"title\" s-if=\"!title\" />\n                    <template s-else>{{title}}</template>\n                    <i class=\"{{menuPrefixCls}}-arrow\" />\n                </div>\n            </s-trigger>\n        </li>\n    ")
});

exports["default"] = _default;