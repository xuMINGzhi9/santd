"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

var _calculateNodeHeight = _interopRequireDefault(require("./calculateNodeHeight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var prefixCls = (0, _util.classCreator)('input')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    defaultValue: _san.DataTypes.string,
    value: _san.DataTypes.string
  },
  attached: function attached() {
    this.resizeTextarea();
  },
  updated: function updated() {
    this.resizeTextarea();
  },
  resizeTextarea: function resizeTextarea() {
    var autosize = this.data.get('autosize');
    var textareaStyles;

    if (!autosize) {
      return;
    } // 如果autosize里面传的是字符串对象，需要进行解析


    if (typeof autosize === 'boolean') {
      textareaStyles = (0, _calculateNodeHeight["default"])(this.el, false, null, null);
    } else if (_typeof(autosize) === 'object') {
      textareaStyles = (0, _calculateNodeHeight["default"])(this.el, false, autosize.minRows, autosize.maxRows);
    }

    this.data.set('styles', textareaStyles);
  },
  handleKeyDown: function handleKeyDown(e) {
    if (e.keyCode === _keyCode["default"].ENTER) {
      this.fire('pressEnter', e.target.value);
    }
  },
  handleTextareaChange: function handleTextareaChange(e) {
    var _this = this;

    this.nextTick(function () {
      _this.resizeTextarea();
    });
    this.fire('inputChange', e.target.value);
    this.dispatch('UI:form-item-interact', {
      fieldValue: e.target.value,
      type: 'change',
      e: e
    });
  },
  handleBlur: function handleBlur(e) {
    this.fire('textareaBlur', e.target.value);
    this.dispatch('UI:form-item-interact', {
      fieldValue: e.target.value,
      type: 'change',
      e: e
    });
  },
  template: "\n        <textarea\n            class=\"".concat(prefixCls, " {{disabled ? '").concat(prefixCls, "-disabled': ''}}\"\n            style=\"{{styles}}\"\n            cols=\"{{cols}}\"\n            rows=\"{{rows}}\"\n            disabled=\"{{disabled}}\"\n            maxlength=\"{{maxlength}}\"\n            name=\"{{name}}\"\n            readonly=\"{{readOnly}}\"\n            autofocus=\"{{autofocus}}\"\n            placeholder=\"{{placeholder}}\"\n            on-input=\"handleTextareaChange($event)\"\n            on-keydown=\"handleKeyDown($event)\"\n            on-blur=\"handleBlur($event)\"\n            value=\"{{value || defaultValue}}\"\n        ></textarea>\n    ")
});

exports["default"] = _default;