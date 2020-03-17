"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.filters = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

var _dom = require("../core/util/dom");

var _Event = _interopRequireDefault(require("../core/util/css-animation/Event"));

var _button = _interopRequireDefault(require("../button"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filters = {
  css: function css(style) {
    if (!style) {
      return '';
    }

    if (typeof style === 'string') {
      return style.replace(/\s+/g, '');
    }

    Object.keys(style).map(function (key) {
      // css样式传入的小驼峰转换为短横线
      if (/([A-Z])/g.test(key)) {
        var kebabKey = key.replace(/([A-Z])/g, function (m) {
          return "-".concat(m.toLowerCase());
        });
        style[kebabKey] = style[key];
        delete style[key];
        return kebabKey;
      }

      return key;
    });
    return style;
  },
  mergeStyle: function mergeStyle(style, zIndex) {
    var zIndexStyle = zIndex ? "z-index:".concat(zIndex, ";") : '';

    if (zIndexStyle) {
      if (/z-index/.test(style)) {
        style = style.replace(/z-index:\d;?/, zIndexStyle);
      } else {
        style += zIndexStyle;
      }
    }

    return style;
  }
};
exports.filters = filters;
var prefixCls = (0, _util.classCreator)('modal')();
var locale = {
  okText: '确定',
  cancelText: '取消',
  justOkText: '知道了'
};
var uuid = 0;
var openCount = 0;
var mousePosition = null;
var mousePositionEventBinded = false;
var bodyIsOverflowing;
var scrollbarWidth;

function getScroll(w, top) {
  var ret = w["page".concat(top ? 'Y' : 'X', "Offset")];
  var method = "scroll".concat(top ? 'Top' : 'Left');

  if (typeof ret !== 'number') {
    var d = w.document;
    ret = d.documentElement[method];

    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }

  return ret;
}

function setTransformOrigin(node, value) {
  var style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
    style["".concat(prefix, "TransformOrigin")] = value;
  });
  style.transformOrigin = value;
}

function offset(el) {
  var rect = el.getBoundingClientRect();
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  var pos = {
    left: rect.left + getScroll(w),
    top: rect.top + getScroll(w, true)
  };
  return pos;
}

var sentinel = _san["default"].defineComponent({
  template: "\n        <div tabindex=\"0\" style=\"width:0px;height:0px;overflow:hidden;\">{{type}}</div>\n    "
});

var _default = _san["default"].defineComponent({
  template: "\n        <template>\n            <div s-if=\"{{mask && visible}}\"\n                s-transition=\"modalTrans(maskTransitionName)\"\n                class=\"".concat(prefixCls, "-mask\"\n                style=\"{{maskStyle | mergeStyle(zIndex)}}\"></div>\n            <div s-if=\"{{visible || inTransition}}\"\n                s-ref=\"wrap\"\n                tabIndex=\"-1\"\n                role=\"dialog\"\n                aria-labelledby=\"{{title ? titleId : null}}\"\n                class=\"").concat(prefixCls, "-wrap {{wrapClassName}}\"\n                style=\"{{wrapStyle | css | mergeStyle(zIndex)}}\"\n                on-keydown=\"onKeydown\"\n                on-click=\"onMaskClick\"\n            >\n                <div s-if=\"{{visible}}\"\n                    s-transition=\"modalTrans(transitionName, true)\"\n                    s-ref=\"dialog\"\n                    role=\"document\"\n                    class=\"").concat(prefixCls, " {{className}}\"\n                    style=\"{{dialogStyle(width, modalStyle)}}\"\n                >\n                    <sentinel s-ref=\"sentinelStart\" type=\"sentinelStart\"/>\n                    <div class=\"").concat(prefixCls, "-content\">\n                        <button s-if=\"{{closable}}\" aria-label=\"Close\" class=\"").concat(prefixCls, "-close\" on-click=\"close\">\n                            <span class=\"").concat(prefixCls, "-close-x\">\n                                <s-icon class=\"").concat(prefixCls, "-close-icon\" type=\"close\"/>\n                            </span>\n                        </button>\n                        <div s-if=\"{{title}}\" s-ref=\"header\" class=\"").concat(prefixCls, "-header\">\n                            <slot name=\"title\">\n                                <div class=\"").concat(prefixCls, "-title\" id=\"{{titleId}}\">{{title}}</div>\n                            </slot>\n                        </div>\n                        <div s-ref=\"body\" class=\"").concat(prefixCls, "-body\" style=\"{{bodyStyle | css}}\">\n                            <slot/>\n                        </div>\n                        <div s-if=\"{{hasFooter}}\" s-ref=\"footer\" class=\"").concat(prefixCls, "-footer\">\n                            <slot name=\"footer\"/>\n                        </div>\n                    </div>\n                    <sentinel s-ref=\"sentinelEnd\" type=\"sentinelEnd\"/>\n                </div>\n            </div>\n        </template>\n    "),
  dataTypes: {
    test: _san.DataTypes.any
  },
  components: {
    'sentinel': sentinel,
    's-button': _button["default"],
    's-icon': _icon["default"]
  },
  filters: _objectSpread({}, filters),
  dialogStyle: function dialogStyle(width, modalStyle) {
    return "width: ".concat(width, "px; ").concat(filters.css(modalStyle));
  },
  modalTrans: function modalTrans(transitionName, needCallback) {
    var _this = this;

    if (!transitionName) {
      return;
    }

    var callback = function callback() {
      _this.data.set('inTransition', false);

      _this.removeScrollingEffect();

      _this.fire('afterClose');
    };

    return {
      enter: function enter(el, done) {
        var cls = ["".concat(transitionName, "-enter"), "".concat(transitionName, "-enter-active")].join(' ');

        var end = function end() {
          _Event["default"].removeEndEventListener(el, end);

          (0, _dom.removeClass)(el, cls);
          done();
        };

        _Event["default"].addEndEventListener(el, end);

        (0, _dom.addClass)(el, cls);
      },
      leave: function leave(el, done) {
        var cls = ["".concat(transitionName, "-leave"), "".concat(transitionName, "-leave-active")].join(' ');

        var end = function end() {
          _Event["default"].removeEndEventListener(el, end);

          (0, _dom.removeClass)(el, cls);
          needCallback && callback();
          done();
        };

        _Event["default"].addEndEventListener(el, end);

        (0, _dom.addClass)(el, cls);
      }
    };
  },
  initData: function initData() {
    return {
      bodyStyle: {},
      maskStyle: {},
      mask: true,
      visible: false,
      keyboard: true,
      closable: true,
      maskClosable: true,
      destroyOnClose: false,
      width: 520,
      hasFooter: true,
      okType: 'primary',
      confirmloading: false,
      inTransition: false,
      titleId: "santdDialogTitle".concat(uuid++),
      locale: locale
    };
  },
  inited: function inited() {
    var _this2 = this;

    this.watch('visible', function (val) {
      if (val) {
        _this2.addScrollingEffect();

        _this2.nextTick(function () {
          _this2.afterMouseEvent();
        });
      } else {
        _this2.data.set('inTransition', true);
      }
    });
  },
  attached: function attached() {
    var _this3 = this;

    if (!mousePositionEventBinded) {
      // 只有点击事件支持从鼠标位置动画展开
      (0, _dom.on)(document.documentElement, 'click', function (e) {
        mousePosition = {
          x: e.pageX,
          y: e.pageY
        }; // 100ms 内发生过点击事件，则从点击位置动画展示
        // 否则直接 zoom 展示
        // 这样可以兼容非点击方式展开

        setTimeout(function () {
          return mousePosition = null;
        }, 100); // console.log('mousePositionEventBinded', mousePosition);
      });
      mousePositionEventBinded = true;
    }

    this.nextTick(function () {
      if (_this3.data.get('visible')) {
        _this3.addScrollingEffect();

        _this3.afterMouseEvent();
      }
    });
  },
  disposed: function disposed() {
    this.removeScrollingEffect();
  },
  onMaskClick: function onMaskClick(e) {
    if (!this.data.get('maskClosable')) {
      return;
    }

    if (e.target === e.currentTarget) {
      this.close(e);
    }
  },
  onKeydown: function onKeydown(e) {
    if (this.data.get('keyboard') && e.keyCode === _keyCode["default"].ESC) {
      e.stopPropagation();
      this.close(e);
      return;
    } // keep focus inside dialog


    if (this.data.get('visible')) {
      if (e.keyCode === _keyCode["default"].TAB) {
        var activeElement = document.activeElement;
        var sentinelStart = this.ref('sentinelStart');
        var sentinelEnd = this.ref('sentinelEnd');

        if (e.shiftKey) {
          if (activeElement === sentinelStart) {
            sentinelEnd.focus();
          }
        } else if (activeElement === sentinelEnd) {
          sentinelStart.focus();
        }
      }
    }
  },
  close: function close(e) {
    var data = this.data;

    if (data.get('visible') !== undefined) {
      this.fire('close', e);
    }

    data.set('visible', false);
  },
  addScrollingEffect: function addScrollingEffect() {
    openCount++;

    if (openCount !== 1) {
      return;
    }

    this.checkScrollbar();
    this.setScrollbar();
    document.body.style.overflow = 'hidden';
  },
  removeScrollingEffect: function removeScrollingEffect() {
    openCount--;

    if (openCount !== 0) {
      return;
    }

    document.body.style.overflow = '';
    this.resetScrollbar();
  },
  checkScrollbar: function checkScrollbar() {
    var fullWindowWidth = window.innerWidth;

    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }

    bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;

    if (bodyIsOverflowing) {
      scrollbarWidth = (0, _dom.getScrollBarSize)();
    }
  },
  setScrollbar: function setScrollbar() {
    if (bodyIsOverflowing && scrollbarWidth !== undefined) {
      document.body.style.paddingRight = "".concat(scrollbarWidth, "px");
    }
  },
  resetScrollbar: function resetScrollbar() {
    document.body.style.paddingRight = '';
  },
  tryFocus: function tryFocus() {
    // wrap内的元素聚焦之后，wrap才能生效keydown事件监听
    var sentinelStart = this.ref('sentinelStart');
    sentinelStart.el && sentinelStart.el.focus();
  },
  afterMouseEvent: function afterMouseEvent() {
    this.tryFocus();
    var dialogNode = this.ref('dialog');

    if (mousePosition) {
      var elOffset = offset(dialogNode);
      var value = "".concat(mousePosition.x - elOffset.left, "px ").concat(mousePosition.y - elOffset.top, "px");
      setTransformOrigin(dialogNode, value);
    } else {
      setTransformOrigin(dialogNode, '');
    }
  }
});

exports["default"] = _default;