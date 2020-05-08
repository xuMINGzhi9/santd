"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _tooltip = _interopRequireDefault(require("../tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('popover')();

var _default = _san["default"].defineComponent({
  initData: function initData() {
    return _objectSpread(_objectSpread({}, _tooltip["default"].prototype.initData()), {}, {
      transitionName: 'zoom-big'
    });
  },
  inited: function inited() {
    this.data.set('hasTitle', this.data.get('title') || !!this.sourceSlots.named.title);
    this.data.set('hasContent', this.data.get('content') || !!this.sourceSlots.named.content);
  },
  template: "<span>\n        <s-trigger\n            prefixCls=\"".concat(prefixCls, "\"\n            action=\"{{action}}\"\n            builtinPlacements=\"{{builtinPlacements}}\"\n            popupPlacement=\"{{placement}}\"\n            popupAlign=\"{{popupAlign}}\"\n            popupTransitionName=\"{{transitionName}}\"\n            defaultPopupVisible=\"{{defaultVisible}}\"\n            getPopupContainer=\"{{getPopupContainer}}\"\n            mouseEnterDelay=\"{{mouseEnterDelay}}\"\n            mouseLeaveDelay=\"{{mouseLeaveDelay}}\"\n            popupClassName=\"{{overlayClassName}}\"\n            popupStyle=\"{{overlayStyle}}\"\n            style=\"{{popoverStyle}}\"\n            action=\"{{trigger}}\"\n            visible=\"{{visible}}\"\n            s-ref=\"trigger\"\n            on-visibleChange=\"handleVisibleChange\"\n        >\n            <slot />\n            <template slot=\"popup\">\n                <div class=\"").concat(prefixCls, "-arrow\"></div>\n                <div class=\"").concat(prefixCls, "-inner\" id=\"{{id}}\" role=\"popover\">\n                    <div class=\"").concat(prefixCls, "-title\" s-if=\"hasTitle\">\n                        <slot name=\"title\" s-if=\"!title\" />\n                        <template s-else>{{title}}</template>\n                    </div>\n                    <div class=\"").concat(prefixCls, "-inner-content\" s-if=\"hasContent\">\n                        <slot name=\"content\" s-if=\"!content\" />\n                        <template s-else>{{content}}</template>\n                    </div>\n                </div>\n            </template>\n        </s-trigger>\n    </span>")
}, _tooltip["default"]);

exports["default"] = _default;