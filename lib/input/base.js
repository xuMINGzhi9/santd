"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file input 基础组件
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('input')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    size: _san.DataTypes.string,
    disabled: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      type: 'text'
    };
  },
  inputChange: function inputChange(e) {
    var inputValue = e.target.value;
    this.data.set('value', inputValue);
    this.fire('change', inputValue);
    this.dispatch('UI:form-item-interact', {
      fieldValue: inputValue,
      type: 'change',
      e: e
    });
  },
  keydownHander: function keydownHander(e) {
    if (e.keyCode === _keyCode["default"].ENTER) {
      var inputValue = e.target.value;
      this.data.set('value', inputValue);
      this.fire('pressEnter', inputValue);
      this.dispatch('UI:form-item-interact', {
        fieldValue: inputValue,
        type: 'change',
        e: e
      });
    }
  },
  inputOnBlur: function inputOnBlur(e) {
    var inputValue = e.target.value;
    this.data.set('value', inputValue);
    this.fire('blur', inputValue);
    this.dispatch('UI:form-item-interact', {
      fieldValue: inputValue,
      type: 'blur',
      e: e
    });
  },
  template: "\n        <input\n            placeholder=\"{{placeholder}}\"\n            class=\"".concat(prefixCls, " {{size ? '").concat(prefixCls, "-' + size : ''}} {{disabled ? '").concat(prefixCls, "-disabled' : ''}} {{inputClasses}}\"\n            on-input=\"inputChange($event)\"\n            on-keydown=\"keydownHander($event)\"\n            on-blur=\"inputOnBlur($event)\"\n            value=\"{{value}}\"\n            disabled=\"{{disabled}}\"\n            readonly=\"{{readOnly}}\"\n            id=\"{{id}}\"\n            type=\"{{type}}\"\n            tabindex=\"{{tabIndex}}\"\n            maxlength=\"{{maxLength}}\"\n            s-ref=\"input\"\n        />\n    ")
});

exports["default"] = _default;