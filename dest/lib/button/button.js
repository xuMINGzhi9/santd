"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _wave = _interopRequireDefault(require("../core/util/wave"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file san-button按钮
 * @author fuqiangqiang@baidu.com
 */
var PREFIX_CLASS = (0, _util.classCreator)('btn')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    disabled: _san.DataTypes.bool,
    ghost: _san.DataTypes.bool,
    href: _san.DataTypes.string,
    htmlType: _san.DataTypes.oneOf(['submit', 'button', 'reset']),
    icon: _san.DataTypes.string,
    loading: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.object]),
    shape: _san.DataTypes.oneOf(['circle', 'circle-outline', 'round']),
    size: _san.DataTypes.oneOf(['small', 'default', 'large']),
    target: _san.DataTypes.string,
    type: _san.DataTypes.oneOf(['default', 'primary', 'ghost', 'dashed', 'danger', 'link']),
    block: _san.DataTypes.bool,
    noWave: _san.DataTypes.bool
  },
  components: {
    's-icon': _icon["default"],
    's-wave': _wave["default"]
  },
  computed: {
    classes: function classes() {
      // 处理class
      var data = this.data;
      var type = data.get('type');
      var shape = data.get('shape');
      var size = data.get('sizeMap')[data.get('size')];
      var clazz = [PREFIX_CLASS];
      type && clazz.push("".concat(PREFIX_CLASS, "-").concat(type));
      shape && clazz.push("".concat(PREFIX_CLASS, "-").concat(shape));
      size && clazz.push("".concat(PREFIX_CLASS, "-").concat(size));
      !shape && clazz.push("".concat(PREFIX_CLASS, "-icon-only"));
      data.get('loading') === true && clazz.push("".concat(PREFIX_CLASS, "-loading"));
      data.get('block') && clazz.push("".concat(PREFIX_CLASS, "-block"));
      data.get('ghost') && clazz.push("".concat(PREFIX_CLASS, "-background-ghost"));
      return clazz;
    }
  },
  initData: function initData() {
    return {
      disabled: false,
      icons: null,
      loading: false,
      sizeMap: {
        large: 'lg',
        small: 'sm'
      },
      noWave: false
    };
  },
  updated: function updated() {
    var _this = this;

    var loading = this.data.get('loading');

    if (loading && loading.delay) {
      this.delayTimeout = window.setTimeout(function () {
        return _this.data.set('loading', true);
      }, loading.delay);
    }
  },
  btnClick: function btnClick(e) {
    if (this.data.get('loading')) {
      return;
    } // 模拟a的动作


    var href = this.data.get('href');

    if (href) {
      var node = document.createElement('a');
      node.href = href;
      node.target = this.data.get('target') || '_self';
      node.click();
    }

    this.fire('click', e);
  },
  handleFocus: function handleFocus(e) {
    this.dispatch('santd_button_trigger', {
      action: 'handleFocus',
      e: e
    });
  },
  handleBlur: function handleBlur(e) {
    this.dispatch('santd_button_trigger', {
      action: 'handleBlur',
      e: e
    });
  },
  template: "\n        <button\n            autofocus=\"{{autofocus}}\"\n            autocomplete=\"{{autocomplete}}\"\n            form=\"{{form}}\"\n            formaction=\"{{formaction}}\"\n            formenctype=\"{{formenctype}}\"\n            formmethod=\"{{formmethod}}\"\n            formnovalidate=\"{{formnovalidate}}\"\n            formtarget=\"{{formtarget}}\"\n            name=\"{{name}}\"\n            value=\"{{value}}\"\n            type=\"{{htmlType || 'button'}}\"\n            disabled=\"{{disabled}}\"\n            class=\"{{classes}}\"\n            on-click=\"btnClick($event)\"\n            on-focus=\"handleFocus\"\n            on-blur=\"handleBlur\"\n        >\n            <span>\n                <s-icon s-if=\"loading === true\" type=\"loading\" />\n                <s-icon s-elif=\"icon\" type=\"{{icon}}\" />\n                <slot />\n            </span>\n            <s-wave s-if=\"!noWave && type !== 'link'\" />\n        </button>\n    "
});

exports["default"] = _default;