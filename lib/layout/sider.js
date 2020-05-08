"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('layout-sider')();
var dimensionMap = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px'
};

if (typeof window !== 'undefined') {
  var matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
    return {
      media: mediaQuery,
      matches: false,
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
  };

  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

var _default = _san["default"].defineComponent({
  dataTypes: {
    collapsedWidth: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    collapsible: _san.DataTypes.bool,
    theme: _san.DataTypes.oneOf(['light', 'dark']),
    width: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    breakpoint: _san.DataTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
    collapsed: _san.DataTypes.bool
  },
  components: {
    's-icon': _icon["default"]
  },
  computed: {
    classes: function classes() {
      // 是否可折叠,如果能折叠，说明需要动态的改变宽度
      var collapsed = this.data.get('collapsed');
      var siderWidth = this.data.get('siderWidth');
      var theme = this.data.get('theme') || 'dark';
      var collapsible = this.data.get('collapsible');
      var trigger = this.data.get('trigger');
      var classArr = [prefixCls, "".concat(prefixCls, "-").concat(theme)];
      collapsed && classArr.push("".concat(prefixCls, "-collapsed"));
      collapsible && trigger !== null && classArr.push("".concat(prefixCls, "-has-trigger"));
      +siderWidth === 0 && classArr.push("".concat(prefixCls, "-zero-width"));
      return classArr;
    },
    styles: function styles() {
      var siderWidth = this.data.get('siderWidth') + 'px';
      var style = this.data.get('style') || {};
      return _objectSpread(_objectSpread({}, style), {}, {
        'flex': "0 0 ".concat(siderWidth),
        'max-width': siderWidth,
        'min-width': siderWidth,
        'width': siderWidth
      });
    },
    siderWidth: function siderWidth() {
      // 确定sider宽度
      return this.data.get('collapsed') || this.data.get('defaultCollapsed') ? +this.data.get('collapsedWidth') : +this.data.get('width');
    }
  },
  initData: function initData() {
    return {
      // componentPropName: 'a-layout-sider',
      // 是否可折叠
      collapsible: false,
      width: 200,
      collapsedWidth: 80,
      mediaChange: false,
      collapsed: false
    };
  },
  attached: function attached() {
    this.dispatch('santd_layout_addSider', this.id);
    var collapsed = this.data.get('collapsed') || this.data.get('defaultCollapsed');
    var collapsedWidth = +this.data.get('collapsedWidth');
    var matchMedia = window && window.matchMedia;
    var breakpoint = this.data.get('breakpoint');
    this.data.set('collapsedWidth', collapsed ? 80 : collapsedWidth);
    collapsed && this.handleMenuCollapsed(true);

    if (matchMedia && breakpoint && breakpoint in dimensionMap) {
      this.mql = matchMedia("(max-width: ".concat(dimensionMap[breakpoint], ")"));
      this.mql.addListener(this.responsiveHandler.bind(this));
      this.responsiveHandler(this.mql);
    }
  },
  responsiveHandler: function responsiveHandler(mql) {
    this.data.set('mediaChange', !!mql.matches);
    this.data.set('collapsed', !!mql.matches);
    this.fire('breakpoint', mql);
  },
  detached: function detached() {
    this.dispatch('santd_layout_removeSider', this.id);
    this.mql && this.mql.removeListener(this.responsiveHandler.bind(this));
  },
  handleMenuCollapsed: function handleMenuCollapsed() {
    var singal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var slot = this.slot()[0];

    if (slot && slot.isInserted && slot.children) {
      slot.children.forEach(function (child) {
        if (child.data && child.data.get('componentPropName') === 'a-menu') {
          child.data.set('inlineCollapsed', singal);
        }
      });
    }
  },
  toggle: function toggle() {
    // 点击进行左侧sider显示和隐藏
    this.data.set('collapsed', !this.data.get('collapsed'));
    this.fire('collapse', this.data.get('collapsed'));
    this.handleMenuCollapsed(false);
  },
  template: "\n        <sider class=\"{{classes}}\" style=\"{{styles}}\">\n            <div class=\"".concat(prefixCls, "-children\">\n                <slot />\n            </div>\n            <span\n                s-if=\"collapsedWidth === 0 && trigger !== 'null' && mediaChange\"\n                class=\"").concat(prefixCls, "-zero-width-trigger\"\n                on-click=\"toggle\"\n            >\n                <s-icon type=\"{{trigger || 'bars'}}\" />\n            </span>\n        </sider>\n    ")
});

exports["default"] = _default;