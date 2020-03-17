"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _index = require("../core/util/index");

var _dom = require("../core/util/dom");

var _affix = _interopRequireDefault(require("../affix"));

var _getRequestAnimationFrame = _interopRequireDefault(require("../core/util/getRequestAnimationFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd anchor file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _index.classCreator)('anchor')();
var sharpMatcherRegx = /#([^#]+)$/;
var anchorContent = "\n    <div class=\"".concat(prefixCls, "-wrapper\" style=\"max-height:{{offsetTop ? 'calc(100vh -' + offsetTop + 'px)' : '100vh'}};{{style}}\">\n        <div class=\"").concat(prefixCls, "{{!affix && !showInkInFixed ? ' fixed' : ''}}\">\n            <div class=\"").concat(prefixCls, "-ink\">\n                <span class=\"").concat(prefixCls, "-ink-ball{{activeLink ? ' visible' : ''}}\" s-ref=\"inkNode\" />\n            </div>\n            <slot/>\n        </div>\n    </div>\n");

function getOffsetTop(element, container) {
  if (!element || !element.getClientRects().length) {
    return 0;
  }

  var rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument.documentElement;
      return rect.top - container.clientTop;
    }

    return rect.top - container.getBoundingClientRect().top;
  }

  return rect.top;
}

function easeInOutCubic(t, b, c, d) {
  var cc = c - b;
  t /= d / 2;

  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }

  return cc / 2 * ((t -= 2) * t * t + 2) + b;
}

function scrollTo(href) {
  var offsetTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var getContainer = arguments.length > 2 ? arguments[2] : undefined;
  var callback = arguments.length > 3 ? arguments[3] : undefined;
  var sharpLinkMatch = sharpMatcherRegx.exec(href);

  if (!sharpLinkMatch) {
    return;
  }

  var targetElement = document.getElementById(sharpLinkMatch[1]);

  if (!targetElement) {
    return;
  }

  var container = getContainer();
  var scrollTop = (0, _dom.getScroll)(container, true);
  var raf = (0, _getRequestAnimationFrame["default"])();
  var eleOffsetTop = getOffsetTop(targetElement, container);
  var targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
  var startTime = Date.now();

  var frameFunc = function frameFunc() {
    var timestamp = Date.now();
    var time = timestamp - startTime;
    var nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);

    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      container.scrollTop = nextScrollTop;
    }

    if (time < 450) {
      raf(frameFunc);
    } else {
      callback();
    }
  };

  raf(frameFunc);
}

function getContainer() {
  return window;
}

var _default = _san["default"].defineComponent({
  autoFillStyleAndId: false,
  dataTypes: {
    offsetTop: _san.DataTypes.number,
    bounds: _san.DataTypes.number,
    affix: _san.DataTypes.bool,
    showInkInFixed: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      getContainer: getContainer,
      affix: true,
      showInkInFixed: false,
      activeLink: null,
      links: []
    };
  },
  inited: function inited() {
    this.linkChildren = [];
  },
  updated: function updated() {
    var _this = this;

    this.nextTick(function () {
      _this.updateInk();
    });
  },
  attached: function attached() {
    var _this2 = this;

    this._handleScroll = this.handleScroll.bind(this);

    if (this._handleScroll) {
      (0, _dom.on)(this.data.get('getContainer')(), 'scroll', this._handleScroll);
    } // this.handleScroll();


    this.watch('activeLink', function (value) {
      _this2.linkChildren.forEach(function (child) {
        child.data.set('activeLink', value);
      });
    });
  },
  disposed: function disposed() {
    this.linkChildren = null;

    if (this._handleScroll) {
      (0, _dom.off)(this.data.get('getContainer')(), 'scroll', this._handleScroll);
      this._handleScroll = null;
    }
  },
  handleScroll: function handleScroll() {
    if (this.data.get('animating')) {
      return;
    }

    var _this$data$get = this.data.get(),
        offsetTop = _this$data$get.offsetTop,
        bounds = _this$data$get.bounds;

    this.data.set('activeLink', this.getCurrentAnchor(offsetTop, bounds));
  },
  updateInk: function updateInk() {
    if (typeof document === 'undefined') {
      return;
    }

    var anchorNode = this.el;
    var linkNode = anchorNode.getElementsByClassName("".concat(prefixCls, "-link-title-active"))[0];

    if (linkNode) {
      this.ref('inkNode').style.top = "".concat(linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5, "px");
    }
  },
  getCurrentAnchor: function getCurrentAnchor() {
    var offsetTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
    var activeLink = '';

    if (document) {
      var container = this.data.get('getContainer')();
      this.data.get('links').forEach(function (link) {
        var sharpLinkMatch = sharpMatcherRegx.exec(link.toString());

        if (!sharpLinkMatch) {
          return;
        }

        var target = document.getElementById(sharpLinkMatch[1]);

        if (target) {
          var top = getOffsetTop(target, container);

          if (top < offsetTop + bounds) {
            activeLink = link;
          }
        }
      });
    }

    return activeLink;
  },
  messages: {
    santd_link_addInstance: function santd_link_addInstance(payload) {
      this.linkChildren.push(payload.value);
    },
    santd_link_add: function santd_link_add(payload) {
      var links = this.data.get('links');

      if (!links.includes(payload.value)) {
        this.data.push('links', payload.value);
      }
    },
    santd_link_rm: function santd_link_rm(payload) {
      var links = this.data.get('links');
      var index = links.indexOf(payload.value);

      if (index !== -1) {
        this.data.removeAt('links', index);
      }
    },
    santd_link_click: function santd_link_click(payload) {
      this.fire('click', {
        e: payload.value.e,
        link: payload.value.link
      });
    },
    santd_link_scrollTo: function santd_link_scrollTo(payload) {
      var _this3 = this;

      var _this$data$get2 = this.data.get(),
          offsetTop = _this$data$get2.offsetTop,
          getContainer = _this$data$get2.getContainer;

      this.data.set('animating', true);
      this.data.set('activeLink', payload.value);
      scrollTo(payload.value, offsetTop, getContainer, function () {
        _this3.data.set('animating', false);
      });
    }
  },
  components: {
    's-affix': _affix["default"]
  },
  template: "\n        <div>\n            <s-affix s-if=\"affix\" offsetTop=\"{{offsetTop}}\">\n                ".concat(anchorContent, "\n            </s-affix>\n            <template s-else>\n                ").concat(anchorContent, "\n            </template>\n        </div>\n    ")
});

exports["default"] = _default;