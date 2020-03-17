"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _checkbox = _interopRequireDefault(require("./checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd checkbox group file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('checkbox')();

var _default = _san["default"].defineComponent({
  DataTypes: {
    defaultValue: _san.DataTypes.array,
    value: _san.DataTypes.array,
    options: _san.DataTypes.array,
    disabled: _san.DataTypes.bool,
    name: _san.DataTypes.string
  },
  components: {
    's-checkbox': _checkbox["default"]
  },
  initData: function initData() {
    return {
      options: [],
      disabled: false
    };
  },
  computed: {
    checkboxs: function checkboxs() {
      var options = this.data.get('options');
      var value = this.data.get('value') || [];
      var disabled = this.data.get('disabled');
      return options.map(function (option) {
        if (typeof option === 'string') {
          option = {
            label: option,
            value: option
          };
        }

        option.disabled = option.disabled != null ? option.disabled : disabled;
        option.checked = value.indexOf(option.value) !== -1;
        return option;
      });
    }
  },
  inited: function inited() {
    this.checkboxs = [];
    this.data.set('value', this.data.get('value') || this.data.get('defaultValue') || []);
  },
  disposed: function disposed() {
    this.checkboxs = null;
  },
  updated: function updated() {
    var _this = this;

    var value = this.data.get('value') || [];
    this.checkboxs.forEach(function (child) {
      child.data.set('checked', value.indexOf(child.data.get('value')) !== -1);
      child.data.set('disabled', child.data.get('disabled') || _this.data.get('disabled'));
      child.data.set('name', _this.data.get('name'));
    });
  },
  messages: {
    santd_checkbox_toggleOption: function santd_checkbox_toggleOption(payload) {
      var option = payload.value;
      var optionIndex = this.data.get('value').indexOf(option.value);

      if (optionIndex === -1) {
        this.data.push('value', option.value);
      } else {
        this.data.removeAt('value', optionIndex);
      } // 这里跟ant保持一致，返回包含所有数据的数组


      this.fire('change', this.data.get('value')); // 提交数据给form表单使用

      this.dispatch('UI:form-item-interact', {
        fieldValue: this.data.get('value'),
        type: 'change',
        e: payload.value.e
      });
    },
    santd_checkbox_add: function santd_checkbox_add(payload) {
      // 当没有options数据的时候才去收集子checkbox
      if (!this.data.get('checkboxs').length) {
        this.checkboxs.push(payload.value);
      }
    }
  },
  template: "\n        <div class=\"".concat(prefixCls, "\">\n            <s-checkbox\n                s-if=\"checkboxs.length\"\n                s-for=\"checkbox in checkboxs\"\n                disabled=\"{{checkbox.disabled}}\"\n                value=\"{{checkbox.value}}\"\n                checked=\"{{checkbox.checked}}\"\n                class=\"").concat(prefixCls, "-group-item\"\n                name=\"{{name}}\"\n            >{{checkbox.label}}</s-checkbox>\n            <slot />\n        </div>\n    ")
});

exports["default"] = _default;