"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _placements = _interopRequireDefault(require("./placements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('dropdown')();

var _default = _san["default"].defineComponent({
  initData: function initData() {
    return _objectSpread({}, _tooltip["default"].prototype.initData(), {
      builtinPlacements: _placements["default"],
      placement: 'bottomLeft',
      mouseEnterDelay: 0.15,
      mouseLeaveDelay: 0.1,
      transitionName: '',
      useDomNodeForce: false
    });
  },
  computed: {
    getTransitionName: function getTransitionName() {
      var placement = this.data.get('placement');
      var transitionName = this.data.get('transitionName');
      return transitionName ? transitionName : placement.indexOf('top') >= 0 ? 'slide-down' : 'slide-up';
    }
  },
  messages: {
    santd_menu_itemClick: function santd_menu_itemClick(payload) {
      if (!('visible' in this.data.get())) {
        this.data.set('popupVisible', false, {
          force: true
        });
      }
    }
  },
  getRootDomNode: function getRootDomNode(rootDomNode) {
    var useDomNodeForce = this.data.get('useDomNodeForce');
    return rootDomNode || !useDomNodeForce && this.el;
  },
  template: "<span class=\"".concat(prefixCls, "-trigger\">\n        <s-trigger\n            prefixCls=\"{{prefixCls ? prefixCls : '").concat(prefixCls, "'}}\"\n            action=\"{{action}}\"\n            builtinPlacements=\"{{builtinPlacements}}\"\n            popupPlacement=\"{{placement}}\"\n            popupAlign=\"{{popupAlign}}\"\n            popupTransitionName=\"{{getTransitionName}}\"\n            defaultPopupVisible=\"{{defaultVisible}}\"\n            getPopupContainer=\"{{getPopupContainer}}\"\n            mouseEnterDelay=\"{{mouseEnterDelay}}\"\n            mouseLeaveDelay=\"{{mouseLeaveDelay}}\"\n            popupClassName=\"{{overlayClassName}}\"\n            popupStyle=\"{{overlayStyle}}\"\n            action=\"{{disabled ? [] : trigger}}\"\n            visible=\"{{visible}}\"\n            popupVisible=\"{{popupVisible}}\"\n            on-visibleChange=\"handleVisibleChange\"\n            class=\"{{dropdownClassName}}\"\n            stretch=\"{{stretch}}\"\n            rootDomNode=\"{{getRootDomNode(rootDomNode)}}\"\n            s-ref=\"trigger\"\n        >\n            <slot />\n            <template slot=\"popup\">\n                <slot name=\"overlay\" var-prefixCls=\"{{'").concat(prefixCls, "'}}\" />\n            </template>\n        </s-trigger>\n    </span>")
}, _tooltip["default"]);

exports["default"] = _default;