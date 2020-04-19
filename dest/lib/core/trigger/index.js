"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _popup = _interopRequireDefault(require("./popup"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isPointsEq(a1, a2, isAlignPoint) {
  if (isAlignPoint) {
    return a1[0] === a2[0];
  }

  return a1[0] === a2[0] && a1[1] === a2[1];
}

function getAlignFromPlacement(builtinPlacements, placementStr, align) {
  var baseAlign = builtinPlacements[placementStr] || {};
  return _objectSpread({}, baseAlign, {}, align);
}

function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
  var points = align.points;

  for (var placement in builtinPlacements) {
    if (builtinPlacements.hasOwnProperty(placement)) {
      if (isPointsEq(builtinPlacements[placement].points, points, isAlignPoint)) {
        return "".concat(prefixCls, "-placement-").concat(placement);
      }
    }
  }

  return '';
}

var documentEventListener = null;

var _default = _san["default"].defineComponent({
  dataTypes: {
    action: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.array]),
    showAction: _san.DataTypes.array,
    hideAction: _san.DataTypes.array,
    getPopupClassNameFromAlign: _san.DataTypes.func,
    popupStyle: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.object]),
    prefixCls: _san.DataTypes.string,
    popupClassName: _san.DataTypes.string,
    popupPlacement: _san.DataTypes.string,
    builtinPlacements: _san.DataTypes.object,
    popupTransitionName: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.object]),
    popupAnimation: _san.DataTypes.object,
    mouseEnterDelay: _san.DataTypes.number,
    mouseLeaveDelay: _san.DataTypes.number,
    zIndex: _san.DataTypes.number,
    focusDelay: _san.DataTypes.number,
    blurDelay: _san.DataTypes.number,
    getPopupContainer: _san.DataTypes.func,
    getDocument: _san.DataTypes.func,
    destroyPopupOnHide: _san.DataTypes.bool,
    mask: _san.DataTypes.bool,
    maskClosable: _san.DataTypes.bool,
    popupAlign: _san.DataTypes.object,
    popupVisible: _san.DataTypes.bool,
    defaultPopupVisible: _san.DataTypes.bool,
    maskTransitionName: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.object]),
    maskAnimation: _san.DataTypes.string,
    alignPoint: _san.DataTypes.bool,
    stretch: _san.DataTypes.string,
    useDomNodeForce: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      prefixCls: 'trigger-popup',
      getPopupClassNameFromAlign: function getPopupClassNameFromAlign() {
        return '';
      },
      getDocument: function getDocument() {
        return window.document;
      },
      popupClassName: '',
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0.1,
      focusDelay: 0,
      blurDelay: 0.15,
      popupStyle: {},
      destroyPopupOnHide: false,
      popupAlign: {},
      defaultPopupVisible: false,
      mask: false,
      maskClosable: true,
      action: [],
      showAction: [],
      hideAction: [],
      show: true,
      state: {},
      useDomNodeForce: false
    };
  },
  computed: {
    getPopupAlign: function getPopupAlign() {
      var popupPlacement = this.data.get('popupPlacement');
      var popupAlign = this.data.get('popupAlign');
      var builtinPlacements = this.data.get('builtinPlacements');

      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }

      return popupAlign;
    },
    getClassNameFromAlign: function getClassNameFromAlign() {
      var that = this;
      return function (align) {
        var className = [];
        var popupPlacement = that.data.get('popupPlacement');
        var builtinPlacements = that.data.get('builtinPlacements');
        var prefixCls = that.data.get('prefixCls');
        var alignPoint = that.data.get('alignPoint');
        var getPopupClassNameFromAlign = that.data.get('getPopupClassNameFromAlign');

        if (popupPlacement && builtinPlacements) {
          className.push(getAlignPopupClassName(builtinPlacements, prefixCls, align, alignPoint));
        }

        if (getPopupClassNameFromAlign) {
          className.push(getPopupClassNameFromAlign(align));
        }

        return className.join(' ');
      };
    }
  },
  inited: function inited() {
    var _this = this;

    var popupVisible = this.data.get('visible') || this.data.get('defaultPopupVisible');
    this.data.set('popupVisible', popupVisible);
    var currentDocument = this.data.get('getDocument')();

    if (!documentEventListener) {
      documentEventListener = currentDocument.addEventListener('mousedown', this.handleDocumentClick.bind(this));
    }

    this.watch('popupVisible', function (val) {
      if (!_this._container) {
        _this.attachPopup();
      }

      _this.nextTick(function () {
        _this._popup.data.set('visible', val);
      });
    });
    this.watch('visible', function (val) {
      _this.data.set('popupVisible', val);
    });
  },
  attached: function attached() {
    if (this.data.get('popupVisible')) {
      this.attachPopup();

      this._popup.data.set('visible', true);
    }
  },
  detached: function detached() {
    this.clearDelayTimer();
    this.removeContainer();
  },
  isClickToShow: function isClickToShow() {
    var action = this.data.get('action');
    var showAction = this.data.get('showAction');
    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
  },
  isClickToHide: function isClickToHide() {
    var action = this.data.get('action');
    var hideAction = this.data.get('hideAction');
    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
  },
  isMouseEnterToShow: function isMouseEnterToShow() {
    var action = this.data.get('action');
    var hideAction = this.data.get('hideAction');
    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseEnter') !== -1;
  },
  isMouseLeaveToHide: function isMouseLeaveToHide() {
    var action = this.data.get('action');
    var hideAction = this.data.get('hideAction');
    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
  },
  isFocusToShow: function isFocusToShow() {
    var action = this.data.get('action');
    var hideAction = this.data.get('hideAction');
    return action.indexOf('focus') !== -1 || hideAction.indexOf('focus') !== -1;
  },
  isBlurToHide: function isBlurToHide() {
    var action = this.data.get('action');
    var hideAction = this.data.get('hideAction');
    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
  },
  isContextMenuToShow: function isContextMenuToShow() {
    var action = this.data.get('action');
    var hideAction = this.data.get('hideAction');
    return action.indexOf('contextMenu') !== -1 || hideAction.indexOf('contextMenu') !== -1;
  },
  setPopupVisible: function setPopupVisible(visible, e) {
    var alignPoint = this.data.get('alignPoint');
    this.clearDelayTimer();

    if (this.data.get('popupVisible') !== visible) {
      // 如果没有外部传入的visible，设置当前的popVisible为visible，否则会进入visible的watch逻辑
      if (this.data.get('visible') === undefined) {
        this.data.set('popupVisible', visible);
      }

      this.fire('visibleChange', visible);
    }

    if (alignPoint && e) {
      this.setpoint(e);
    }
  },
  setPoint: function setPoint(e) {
    var alignPoint = this.data.get('alignPoint');

    if (!e || !alignPoint) {
      return;
    }

    this.data.set('point', {
      pageX: e.pageX,
      pageY: e.pageY
    });
  },
  clearDelayTimer: function clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  },
  handleClick: function handleClick(e, forceTrigger) {
    if (this.isClickToShow() || this.isClickToHide() || forceTrigger) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      var nextVisible = !this.data.get('popupVisible');

      if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
        this.setPopupVisible(nextVisible, e);
      }
    }
  },
  handleMouseDown: function handleMouseDown(e) {
    this.fire('mouseDown', e);
    this.data.set('preClickTime', Date.now());
  },
  handleTouchStart: function handleTouchStart(e) {
    this.fire('touchStart', e);
    this.data.set('preTouchTime', Date.now());
  },
  handleMouseEnter: function handleMouseEnter(e, forceTrigger) {
    if (this.isMouseEnterToShow() || forceTrigger) {
      var mouseEnterDelay = this.data.get('mouseEnterDelay');
      this.fire('mouseEnter', e);
      mouseEnterDelay ? this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e) : this.setPopupVisible(true);
    }
  },
  handleMouseMove: function handleMouseMove(e, forceTrigger) {
    var alignPoint = this.data.get('alignPoint');

    if ((this.isMouseEnterToShow() || forceTrigger) && alignPoint) {
      this.fire('mouseMove', e);
      this.setPoint(e);
    }
  },
  handleMouseLeave: function handleMouseLeave(e) {
    if (this.isMouseLeaveToHide()) {
      this.fire('mouseLeave', e);
      var mouseLeaveDelay = this.data.get('mouseLeaveDelay');
      this.delaySetPopupVisible(false, mouseLeaveDelay);
    }
  },
  handleFocus: function handleFocus(e, forceTrigger) {
    if (this.isFocusToShow() || forceTrigger && !this.isClickToShow()) {
      this.fire('focus', e);
      this.clearDelayTimer();
      this.data.set('focusTime', Date.now());
      this.delaySetPopupVisible(true, this.data.get('focusDelay'));
    }
  },
  handleBlur: function handleBlur(e, forceTrigger) {
    if (this.isBlurToHide() || forceTrigger && !this.isClickToHide()) {
      this.fire('blur', e);
      this.clearDelayTimer();
      this.delaySetPopupVisible(false, this.data.get('blurDelay'));
    }
  },
  handleContextMenu: function handleContextMenu(e) {
    if (this.isContextMenuToShow()) {
      e.preventDefault();
      this.fire('contextMenu', e);
      this.setPopupVisible(true, e);
    }
  },
  handlePopupMouseEnter: function handlePopupMouseEnter() {
    this.fire('popupMouseEnter');
    this.clearDelayTimer();
  },
  handlePopupMouseLeave: function handlePopupMouseLeave(e) {
    if (e.relatedTarget && (0, _util.contains)(this.el, e.relatedTarget)) {
      return;
    }

    this.fire('popupMouseLeave');
    this.delaySetPopupVisible(false, this.data.get('mouseLeaveDelay'));
  },
  handlePopupMouseDown: function handlePopupMouseDown() {
    var _this2 = this;

    this.data.set('hasPopupMouseDown', true);
    clearTimeout(this.mouseDownTimeout);
    this.mouseDownTimeout = setTimeout(function () {
      _this2.data.set('hasPopupMouseDown', false);
    }, 0);
  },
  handleDocumentClick: function handleDocumentClick(e) {
    var target = e.target;
    var root = this.el;
    var hasPopupMouseDown = this.data.get('hasPopupMouseDown');

    if (!(0, _util.contains)(root, target) && !hasPopupMouseDown) {
      this.close(e);
    }
  },
  delaySetPopupVisible: function delaySetPopupVisible(visible, delayS, e) {
    var _this3 = this;

    var delay = delayS * 1000;
    this.clearDelayTimer();

    if (delay) {
      var point = e ? {
        pageX: e.pageX,
        pageY: e.pageY
      } : null;
      this.delayTimer = setTimeout(function () {
        _this3.setPopupVisible(visible, point);

        _this3.clearDelayTimer();
      }, delay);
    } else {
      this.setPopupVisible(visible, event);
    }
  },
  close: function close(e) {
    this.setPopupVisible(false, e);
  },
  getPopupDomNode: function getPopupDomNode() {
    var popupComponent = this.data.get('popupComponent');

    if (popupComponent) {
      return popupComponent.getPopupDomNode();
    }

    return null;
  },
  getContainer: function getContainer() {
    var getPopupContainer = this.data.get('getPopupContainer');
    var getDocument = this.data.get('getDocument');
    var popupContainer = document.createElement('div');
    popupContainer.style.position = 'absolute';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    popupContainer.style.width = '100%';
    var mountNode = getPopupContainer ? getPopupContainer(this.el) : getDocument().body;
    mountNode.appendChild(popupContainer);
    return popupContainer;
  },
  components: {
    's-popup': _popup["default"]
  },
  messages: {
    santd_popup_save: function santd_popup_save(payload) {
      this.data.set('popupComponent', payload.value);
    },
    santd_button_trigger: function santd_button_trigger(payload) {
      var action = payload.value.action;
      var e = payload.value.e;

      if (this[action]) {
        this[action](e, true);
      }
    },
    santd_popup_mouseEnter: function santd_popup_mouseEnter(payload) {
      var e = payload.value;

      if (this.isMouseEnterToShow()) {
        this.handlePopupMouseEnter(e);
      }
    },
    santd_popup_mouseLeave: function santd_popup_mouseLeave(payload) {
      var e = payload.value;

      if (this.isMouseLeaveToHide()) {
        this.handlePopupMouseLeave(e);
      }
    },
    santd_popup_mouseDown: function santd_popup_mouseDown(payload) {
      var e = payload.value;
      this.handlePopupMouseDown(e);
    }
  },
  getRootDomNode: function getRootDomNode(rootDomNode) {
    var useDomNodeForce = this.data.get('useDomNodeForce');
    return rootDomNode || !useDomNodeForce && this.el;
  },
  attachPopup: function attachPopup() {
    this._container = this.getContainer();
    this._popup = new _popup["default"]({
      owner: this,
      source: "\n                <x-popup\n                    prefixCls=\"{{prefixCls}}\"\n                    getRootDomNode=\"{{getRootDomNode(rootDomNode)}}\"\n                    align=\"{{getPopupAlign}}\"\n                    transitionName=\"{{popupTransitionName}}\"\n                    getClassNameFromAlign=\"{{getClassNameFromAlign}}\"\n                    popupClassName=\"{{popupClassName}}\"\n                    popupStyle=\"{{popupStyle}}\"\n                    destroyPopupOnHide=\"{{destroyPopupOnHide}}\"\n                    stretch=\"{{stretch}}\"\n                >\n                    <slot name=\"popup\" />\n                </x-popup>\n            "
    });

    this._popup.attach(this._container);
  },
  removeContainer: function removeContainer() {
    if (this._container) {
      this._container.parentNode.removeChild(this._container);

      this._container = null;
      this.popup = null;
    }
  },
  refresh: function refresh() {
    this._popup && this._popup.refresh();
  },
  template: "<span\n        on-click=\"handleClick\"\n        on-mousedown=\"handleMouseDown\"\n        on-touchstart=\"handleTouchStart\"\n        on-mouseenter=\"handleMouseEnter\"\n        on-mousemove=\"handleMouseMove\"\n        on-mouseleave=\"handleMouseLeave\"\n        on-contextmenu=\"handleContextMenu\"\n    >\n        <slot />\n    </span>"
});

exports["default"] = _default;