"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _utils = require("./utils");

var _icon = _interopRequireDefault(require("../icon"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd tabs scrollable tab bar node file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('tabs')();

var prevIcon = _san["default"].defineComponent({
  computed: {
    prevIconType: function prevIconType() {
      var tabPosition = this.data.get('tabPosition');
      var isVertical = tabPosition === 'left' || tabPosition === 'right';
      return isVertical ? 'up' : 'left';
    }
  },
  components: {
    's-icon': _icon["default"]
  },
  template: "<span class=\"".concat(prefixCls, "-tab-prev-icon\">\n        <s-icon type=\"{{prevIconType}}\" class=\"").concat(prefixCls, "-tab-prev-icon-target\"/>\n    </span>")
});

var nextIcon = _san["default"].defineComponent({
  computed: {
    nextIconType: function nextIconType() {
      var tabPosition = this.data.get('tabPosition');
      var isVertical = tabPosition === 'left' || tabPosition === 'right';
      return isVertical ? 'down' : 'right';
    }
  },
  components: {
    's-icon': _icon["default"]
  },
  template: "<span class=\"".concat(prefixCls, "-tab-next-icon\">\n        <s-icon type=\"{{nextIconType}}\" class=\"").concat(prefixCls, "-tab-next-icon-target\"/>\n    </span>")
});

var _default = _san["default"].defineComponent({
  dataTypes: {
    tabBarPosition: _san.DataTypes.oneOf(['left', 'right', 'top', 'bottom']),
    activeKey: _san.DataTypes.string,
    scrollAnimated: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      tabBarPosition: 'left',
      scrollAnimated: true,
      prev: false,
      next: false,
      offset: 0
    };
  },
  handleKeyDown: function handleKeyDown(e) {
    this.fire('keydown', e);
  },
  attached: function attached() {
    var _this = this;

    this.dispatch('santd_tabs_addRef', {
      name: 'container',
      ref: this.el
    });
    this.dispatch('santd_tabs_addRef', {
      name: 'nav',
      ref: this.ref('nav')
    });
    this.dispatch('santd_tabs_addRef', {
      name: 'navWrap',
      ref: this.ref('navWrap')
    });
    this.debouncedResize = (0, _debounce["default"])(function () {
      _this.setNextPrev();

      _this.scrollToActiveTab();
    }, 200);
    this.resizeObserver = new _resizeObserverPolyfill["default"](this.debouncedResize);
    window.setTimeout(function () {
      var refs = _this.data.get('refs');

      _this.resizeObserver.observe(refs.container);
    }, 0);
    this.watch('tabBarPosition', function (val) {
      _this.scrollToActiveTab();
    });
  },
  getScrollWH: function getScrollWH(node) {
    var tabBarPosition = this.data.get('tabBarPosition');
    var prop = 'scrollWidth';

    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'scrollHeight';
    }

    return node[prop];
  },
  getOffsetWH: function getOffsetWH(node) {
    var tabBarPosition = this.data.get('tabBarPosition');
    var prop = 'offsetWidth';

    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'offsetHeight';
    }

    return node[prop];
  },
  getOffsetLT: function getOffsetLT(node) {
    var tabBarPosition = this.data.get('tabBarPosition');
    var prop = 'left';

    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'top';
    }

    return node.getBoundingClientRect()[prop];
  },
  setOffset: function setOffset(offset) {
    var checkNextPrev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var target = Math.min(0, offset);

    if (this.data.get('offset') !== target) {
      this.data.set('offset', target);
      var navOffset = {};
      var tabBarPosition = this.data.get('tabBarPosition');
      var refs = this.data.get('refs');
      var navStyle = refs.nav.style;
      var transformSupported = (0, _utils.isTransform3dSupported)(navStyle);

      if (tabBarPosition === 'left' || tabBarPosition === 'right') {
        if (transformSupported) {
          navOffset = {
            value: "translate3d(0,".concat(target, "px,0)")
          };
        } else {
          navOffset = {
            name: 'top',
            value: "".concat(target, "px")
          };
        }
      } else if (transformSupported) {
        navOffset = {
          value: "translate3d(".concat(target, "px,0,0)")
        };
      } else {
        navOffset = {
          name: 'left',
          value: "".concat(target, "px")
        };
      }

      if (transformSupported) {
        (0, _utils.setTransform)(navStyle, navOffset.value);
      } else {
        navStyle[navOffset.name] = navOffset.value;
      }

      if (checkNextPrev) {
        this.setNextPrev();
      }
    }
  },
  setNextPrev: function setNextPrev() {
    var _this$data$get = this.data.get('refs'),
        nav = _this$data$get.nav,
        navTabsContainer = _this$data$get.navTabsContainer,
        container = _this$data$get.container,
        navWrap = _this$data$get.navWrap;

    var navNodeWH = this.getScrollWH(navTabsContainer || nav);
    var containerWH = this.getOffsetWH(container) + 1;
    var navWrapNodeWH = this.getOffsetWH(navWrap);
    var offset = this.data.get('offset');
    var minOffset = containerWH - navNodeWH;

    var _this$data$get2 = this.data.get(),
        next = _this$data$get2.next,
        prev = _this$data$get2.prev;

    if (minOffset >= 0) {
      next = false;
      this.setOffset(0, false);
      offset = 0;
    } else if (minOffset < offset) {
      next = true;
    } else {
      next = false;
      var realOffset = navWrapNodeWH - navNodeWH;
      this.setOffset(realOffset, false);
      offset = realOffset;
    }

    if (offset < 0) {
      prev = true;
    } else {
      prev = false;
    }

    this.setNext(next);
    this.setPrev(prev);
    return {
      next: next,
      prev: prev
    };
  },
  setPrev: function setPrev(v) {
    var prev = this.data.get('prev');
    prev !== v && this.data.set('prev', v);
  },
  setNext: function setNext(v) {
    var next = this.data.get('next');
    next !== v && this.data.set('next', v);
  },
  scrollToActiveTab: function scrollToActiveTab(e) {
    var _this$data$get3 = this.data.get('refs'),
        activeTab = _this$data$get3.activeTab,
        navWrap = _this$data$get3.navWrap;

    var isNextPrevShown = this.data.get('next') || this.data.get('prev');

    if (e && e.target !== e.currentTarget || !activeTab) {
      return;
    } // when not scrollable or enter scrollable first time, don't emit scrolling


    var needToSroll = isNextPrevShown && this.lastNextPrevShown;
    this.lastNextPrevShown = isNextPrevShown;

    if (!needToSroll) {
      return;
    }

    var activeTabWH = this.getScrollWH(activeTab);
    var navWrapNodeWH = this.getOffsetWH(navWrap);
    var offset = this.data.get('offset');
    var wrapOffset = this.getOffsetLT(navWrap);
    var activeTabOffset = this.getOffsetLT(activeTab);

    if (wrapOffset > activeTabOffset) {
      offset += wrapOffset - activeTabOffset;
      this.setOffset(offset);
    } else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
      offset -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);
      this.setOffset(offset);
    }
  },
  handlePrev: function handlePrev(e) {
    this.dispatch('santd_tabs_prevClick', e);
    var refs = this.data.get('refs');
    var navWrapNode = refs.navWrap;
    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
    var offset = this.data.get('offset');
    this.setOffset(offset + navWrapNodeWH);
  },
  handleNext: function handleNext(e) {
    this.dispatch('santd_tabs_nextClick', e);
    var refs = this.data.get('refs');
    var navWrapNode = refs.navWrap;
    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
    var offset = this.data.get('offset');
    this.setOffset(offset - navWrapNodeWH);
  },
  components: {
    's-icon': _icon["default"],
    's-previcon': prevIcon,
    's-nexticon': nextIcon
  },
  template: "\n        <div\n            class=\"".concat(prefixCls, "-nav-container {{prev || next ? '").concat(prefixCls, "-nav-container-scrolling' : ''}}\"\n            key=\"container\"\n            s-ref=\"container\"\n        >\n            <span\n                unselectable=\"unselectable\"\n                class=\"").concat(prefixCls, "-tab-prev {{prev || next ? '").concat(prefixCls, "-tab-arrow-show' : ''}} {{!prev ? '").concat(prefixCls, "-tab-btn-disabled' : ''}}\"\n                on-click=\"handlePrev\"\n            >\n                <s-previcon prefixCls=\"").concat(prefixCls, "\" tabPosition=\"{{tabBarPosition}}\"></s-previcon>\n            </span>\n            <span\n                unselectable=\"unselectable\"\n                class=\"").concat(prefixCls, "-tab-next {{prev || next ? '").concat(prefixCls, "-tab-arrow-show' : ''}} {{!next ? '").concat(prefixCls, "-tab-btn-disabled' : ''}}\"\n                on-click=\"handleNext\"\n            >\n                <s-nexticon prefixCls=\"").concat(prefixCls, "\" tabPosition=\"{{tabBarPosition}}\"></s-nexticon>\n            </span>\n            <div class=\"").concat(prefixCls, "-nav-wrap\" s-ref=\"navWrap\">\n                <div class=\"").concat(prefixCls, "-nav-scroll\">\n                    <div class=\"").concat(prefixCls, "-nav ").concat(prefixCls, "-nav-{{scrollAnimated ? 'animated' : 'no-animated'}}\" s-ref=\"nav\">\n                        <slot />\n                        <slot name=\"tab\" />\n                    </div>\n                </div>\n            </div>\n        </div>\n    ")
});

exports["default"] = _default;