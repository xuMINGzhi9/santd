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

/**
 * @file Santd collapse panel file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('collapse')();

var PanelContent = _san["default"].defineComponent({
  dataTypes: {
    isActive: _san.DataTypes.bool,
    destroyInactivePanel: _san.DataTypes.bool,
    forceRender: _san.DataTypes.bool,
    role: _san.DataTypes.string
  },
  template: "\n        <div class=\"".concat(prefixCls, "-content ").concat(prefixCls, "-content-{{isActive ? 'active' : 'inactive'}}\" role=\"{{role}}\">\n            <div\n                s-if=\"forceRender || isActive || !destroyInactivePanel\"\n                class=\"").concat(prefixCls, "-content-box\"\n            >\n                <slot />\n            </div>\n        </div>\n    ")
});

var _default = _san["default"].defineComponent({
  dataTypes: {
    prefixCls: _san.DataTypes.string,
    header: _san.DataTypes.string,
    headerClass: _san.DataTypes.string,
    showArrow: _san.DataTypes.bool,
    isActive: _san.DataTypes.bool,
    destroyInactivePanel: _san.DataTypes.bool,
    disabled: _san.DataTypes.bool,
    accordion: _san.DataTypes.bool,
    forceRender: _san.DataTypes.bool,
    panelKey: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number])
  },
  initData: function initData() {
    return {
      showArrow: true,
      isActive: false,
      destroyInactivePanel: false,
      headerClass: '',
      forceRender: false
    };
  },
  computed: {
    classes: function classes() {
      var classArr = [];
      this.data.get('isActive') && classArr.push("".concat(prefixCls, "-item-active"));
      this.data.get('disabled') && classArr.push("".concat(prefixCls, "-item-disabled"));
      !this.data.get('showArrow') && classArr.push("".concat(prefixCls, "-no-arrow"));
      return classArr;
    }
  },
  inited: function inited() {
    this.data.set('hasExpandIcon', !!this.sourceSlots.named[this.data.get('expandIcon')]);
  },
  attached: function attached() {
    this.dispatch('santd_panel_add', this);
  },
  components: {
    's-panelcontent': PanelContent,
    's-icon': _icon["default"]
  },
  handleItemClick: function handleItemClick() {
    if (this.data.get('disabled')) {
      return;
    }

    this.dispatch('santd_panel_click', this.data.get('panelKey'));
  },
  handleKeyPress: function handleKeyPress(e) {
    if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
      this.handleItemClick();
    }
  },
  template: "\n        <div class=\"".concat(prefixCls, "-item {{classes}}\">\n            <div\n                class=\"").concat(prefixCls, "-header {{headerClass}}\"\n                role=\"{{accordion ? 'tab': 'button'}}\"\n                tabIndex=\"{{disabled ? -1 : 0}}\"\n                aria-expanded=\"{{isActive}}\"\n                on-click=\"handleItemClick\"\n                on-keypress=\"handleKeyPress\"\n            >\n                <s-icon\n                    s-if=\"!hasExpandIcon && showArrow\"\n                    type=\"{{expandIcon || 'right'}}\"\n                    rotate=\"{{isActive ? 90 : 0}}\"\n                    class=\"").concat(prefixCls, "-arrow\"\n                />\n                <slot\n                    s-else-if=\"showArrow\"\n                    name=\"{{expandIcon}}\"\n                    var-isActive=\"{{isActive}}\"\n                />\n                {{header}}<slot name=\"header\" />\n                <div class=\"").concat(prefixCls, "-extra\"><slot name=\"extra\" /></div>\n            </div>\n            <s-panelcontent\n                s-if=\"forceRender || isActive\"\n                force-render=\"{{forceRender}}\"\n                is-active=\"{{isActive}}\"\n                destroy-inactive-panel=\"{{destroyInactivePanel}}\"\n            >\n                <slot />\n            </s-panelcontent>\n        </div>\n    ")
});

exports["default"] = _default;