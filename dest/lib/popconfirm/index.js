"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _button = _interopRequireDefault(require("../button"));

var _icon = _interopRequireDefault(require("../icon"));

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('popover')();

var _default = _san["default"].defineComponent({
  initData: function initData() {
    return _objectSpread({}, _tooltip["default"].prototype.initData(), {
      componentName: 'Popconfirm',
      transitionName: 'zoom-big',
      trigger: 'click',
      okType: 'primary'
    });
  },
  inited: function inited() {
    _receiver["default"].inited.call(this);

    this.data.set('hasIcon', !!this.sourceSlots.named.icon);
  },
  computed: _objectSpread({}, _receiver["default"].computed, {}, _tooltip["default"].prototype.computed),
  components: _objectSpread({}, _tooltip["default"].prototype.components, {
    's-button': _button["default"],
    's-icon': _icon["default"]
  }),
  handleCancel: function handleCancel(e) {
    this.fire('cancel', e);
    this.close(e);
  },
  handleConfirm: function handleConfirm(e) {
    this.fire('confirm', e);
    this.close(e);
  },
  close: function close(e) {
    this.ref('trigger').close(e);
  },
  template: "<span>\n        <s-trigger\n            prefixCls=\"".concat(prefixCls, "\"\n            action=\"{{action}}\"\n            builtinPlacements=\"{{builtinPlacements}}\"\n            popupPlacement=\"{{placement}}\"\n            popupAlign=\"{{popupAlign}}\"\n            popupTransitionName=\"{{transitionName}}\"\n            defaultPopupVisible=\"{{defaultVisible}}\"\n            getPopupContainer=\"{{getPopupContainer}}\"\n            mouseEnterDelay=\"{{mouseEnterDelay}}\"\n            mouseLeaveDelay=\"{{mouseLeaveDelay}}\"\n            popupClassName=\"{{overlayClassName}}\"\n            popupStyle=\"{{overlayStyle}}\"\n            action=\"{{trigger}}\"\n            visible=\"{{visible}}\"\n            on-visibleChange=\"handleVisibleChange\"\n            s-ref=\"trigger\"\n        >\n            <slot />\n            <template slot=\"popup\">\n                <div class=\"").concat(prefixCls, "-arrow\"></div>\n                <div class=\"").concat(prefixCls, "-inner\" id=\"{{id}}\" role=\"popconfirm\">\n                    <div class=\"").concat(prefixCls, "-inner-content\">\n                            <div class=\"").concat(prefixCls, "-message\">\n                                <slot name=\"icon\" s-if=\"hasIcon\" />\n                                <s-icon type=\"{{icon || 'exclamation-circle'}}\" theme=\"filled\" s-else />\n                                <div class=\"").concat(prefixCls, "-message-title\">\n                                    <slot name=\"title\" s-if=\"!title\" />\n                                    <template s-else>{{title}}</template>\n                                </div>\n                            </div>\n                            <div class=\"").concat(prefixCls, "-buttons\">\n                                <s-button on-click=\"handleCancel\" size=\"small\" noWave>\n                                    {{cancelText || locale.cancelText}}\n                                </s-button>\n                                <s-button on-click=\"handleConfirm\" type=\"{{okType}}\" size=\"small\" noWave>\n                                    {{okText || locale.okText}}\n                                </s-button>\n                            </div>\n                    </div>\n                </div>\n            </template>\n        </s-trigger>\n    </span>")
}, _tooltip["default"]);

exports["default"] = _default;