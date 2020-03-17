"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _radio = _interopRequireDefault(require("./radio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd radio group file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('radio')();

var _default = _san["default"].defineComponent({
  DataTypes: {
    defaultValue: _san.DataTypes.oneOf([_san.DataTypes.string, _san.DataTypes.number]),
    value: _san.DataTypes.oneOf([_san.DataTypes.string, _san.DataTypes.number]),
    options: _san.DataTypes.array,
    disabled: _san.DataTypes.bool,
    name: _san.DataTypes.string
  },
  components: {
    's-radio': _radio["default"]
  },
  initData: function initData() {
    return {
      buttonStyle: 'outline',
      options: [],
      disabled: false
    };
  },
  computed: {
    radios: function radios() {
      var options = this.data.get('options');
      var value = this.data.get('value');
      var disabled = this.data.get('disabled');
      return options.map(function (option) {
        var radioOption = typeof option === 'string' ? {
          label: option,
          value: option
        } : {
          label: option.label,
          value: option.value
        };
        radioOption.disabled = option.disabled != null ? option.disabled : disabled;
        radioOption.checked = value === radioOption.value;
        return radioOption;
      });
    }
  },
  inited: function inited() {
    this.radios = [];
    this.data.set('value', this.data.get('value') || this.data.get('defaultValue') || '');
  },
  disposed: function disposed() {
    this.radios = null;
  },
  updated: function updated() {
    var value = this.data.get('value');
    var disabled = this.data.get('disabled');
    var name = this.data.get('name');
    this.radios && this.radios.forEach(function (child) {
      child.data.set('checked', value === child.data.get('value'));
      child.data.set('disabled', child.data.get('disabled') || disabled);
      child.data.set('name', name);
    });
  },
  messages: {
    santd_radio_toggleOption: function santd_radio_toggleOption(payload) {
      var option = payload.value;
      this.data.set('value', option.value);
      this.fire('change', option.event);
      this.dispatch('UI:form-item-interact', {
        fieldValue: option.value,
        type: 'change',
        e: payload.value.e
      });
    },
    santd_radio_add: function santd_radio_add(payload) {
      // 当没有options数据的时候才去收集子checkbox
      if (!this.data.get('options').length) {
        this.radios.push(payload.value);
      }
    }
  },
  attached: function attached() {
    this.updated();
  },
  template: "\n        <div class=\"".concat(prefixCls, "-group ").concat(prefixCls, "-group-{{buttonStyle}} {{size ? '").concat(prefixCls, "-group-' + size : ''}}\">\n            <s-radio\n                s-if=\"{{radios.length}}\"\n                s-for=\"radio in radios\"\n                prefixCls=\"").concat(prefixCls, "\"\n                disabled=\"{{radio.disabled}}\"\n                value=\"{{radio.value}}\"\n                checked=\"{{radio.checked}}\"\n                name=\"{{name}}\"\n            >{{radio.label}}</s-radio>\n            <slot />\n        </div>\n    ")
});

exports["default"] = _default;