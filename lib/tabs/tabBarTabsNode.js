"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _utils = require("./utils");

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('tabs')();

var customTab = _san["default"].defineComponent({
  inited: function inited() {
    this.sourceSlots.named.tab = this.data.get('slot');
  },
  template: '<span><slot name="tab" /></span>'
});

var _default = _san["default"].defineComponent({
  computed: {
    tabBars: function tabBars() {
      var tabBarData = this.data.get('tabBarData') || [];
      var tabBarGutter = this.data.get('tabBarGutter');
      var tabBarPosition = this.data.get('tabBarPosition');
      return tabBarData.map(function (tabBar, index) {
        var gutter = tabBarGutter && index === tabBarData.length - 1 ? 0 : tabBarGutter;

        var style = gutter !== undefined && _defineProperty({}, (0, _utils.isVertical)(tabBarPosition) ? 'margin-bottom' : 'margin-right', gutter + 'px');

        var classArr = ["".concat(prefixCls, "-tab")];
        tabBar.active && classArr.push("".concat(prefixCls, "-tab-active"));
        tabBar.disabled && classArr.push("".concat(prefixCls, "-tab-disabled"));
        return _objectSpread({}, tabBar, {
          classes: classArr,
          style: style
        });
      });
    },
    slots: function slots() {
      var tabPanes = this.data.get('tabPanes') || [];
      return tabPanes.map(function (pane) {
        return pane.sourceSlots.named.tab;
      }).filter(function (pane) {
        return pane;
      });
    }
  },
  handleTabClick: function handleTabClick(e, key, disabled) {
    if (disabled) {
      return;
    }

    this.fire('tabClick', {
      key: key,
      e: e
    });
    this.dispatch('santd_tabs_tabClick', {
      key: key,
      e: e
    });
  },
  handleRemoveTab: function handleRemoveTab(key, e) {
    e.stopPropagation();
    this.fire('removeTab', {
      key: key,
      e: e
    });
  },
  attached: function attached() {
    this.dispatch('santd_tabs_addRef', {
      name: 'navTabsContainer',
      ref: this.el
    });
  },
  components: {
    's-icon': _icon["default"],
    's-customtab': customTab
  },
  template: "\n        <div>\n            <div\n                s-for=\"tabBar, index in tabBars trackBy index\"\n                role=\"tab\"\n                aria-disabled=\"{{tabBar.disabled ? true : false}}\"\n                aria-selected=\"{{tabBar.active ? true : false}}\"\n                class=\"{{tabBar.classes}}\"\n                index=\"{{index}}\"\n                style=\"{{tabBar.style}}\"\n                on-click=\"handleTabClick($event, tabBar.key, tabBar.disabled)\"\n            >\n                <div class=\"{{tabBar.closable ? '".concat(prefixCls, "-tab-uncloseable' : ''}}\" s-if=\"type === 'editable-card'\">\n                    <template s-if=\"slots && slots.length\">\n                        <s-customtab slot=\"{{slots[index]}}\" />\n                    </template>\n                    <template s-else>\n                        {{tabBar.tab}}\n                    </template>\n                    <s-icon\n                        type=\"close\"\n                        class=\"").concat(prefixCls, "-close-x\"\n                        s-if=\"tabBar.closable === undefined ? true : tabBar.closable\"\n                        on-click=\"handleRemoveTab(tabBar.key, $event)\"\n                    />\n                </div>\n                <template s-else>\n                    <template s-if=\"slots && slots.length\">\n                        <s-customtab slot=\"{{slots[index]}}\" />\n                    </template>\n                    <template s-else>\n                        {{tabBar.tab}}\n                    </template>\n                </template>\n            </div>\n        </div>\n    ")
});

exports["default"] = _default;