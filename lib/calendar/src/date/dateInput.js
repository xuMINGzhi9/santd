"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _moment = _interopRequireDefault(require("moment"));

var _index = require("../util/index");

var _keyCode = _interopRequireDefault(require("../../../core/util/keyCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd calendar date input file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  dataTypes: {
    prefixCls: _san.DataTypes.string,
    value: _san.DataTypes.object,
    disabledTime: _san.DataTypes.func,
    format: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.arrayOf(_san.DataTypes.string)]),
    locale: _san.DataTypes.object,
    disabledDate: _san.DataTypes.func,
    placeholder: _san.DataTypes.string,
    selectedValue: _san.DataTypes.object,
    inputMode: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      showDate: '',
      invalid: false,
      hasFocus: true
    };
  },
  inited: function inited() {
    var _this = this;

    var format = this.data.get('format');
    this.data.set('showDate', (0, _index.formatDate)(this.data.get('selectedValue'), format));
    this.watch('selectedValue', function (val) {
      _this.data.set('showDate', (0, _index.formatDate)(val, format));
    });
  },
  attached: function attached() {
    var _this2 = this;

    if (this.data.get('hasFocus')) {
      this.nextTick(function () {
        _this2.ref('input').focus();
      });
    }
  },
  handleClear: function handleClear() {
    this.data.set('showDate', '');
    this.fire('clear');
  },
  handleChange: function handleChange(e) {
    var showDate = e.target.value;

    var _this$data$get = this.data.get(),
        disabledDate = _this$data$get.disabledDate,
        format = _this$data$get.format,
        selectedValue = _this$data$get.selectedValue; // 没有内容，合法并直接退出


    if (!showDate) {
      this.fire('change', null);
      this.data.set('invalid', false);
      this.data.set('showDate', '');
      return;
    } // 不合法直接退出


    var parsed = (0, _moment["default"])(showDate, format, true);

    if (!parsed.isValid()) {
      this.data.set('invalid', true);
      this.data.set('showDate', showDate);
      return;
    }

    var value = this.data.get('value').clone();
    value.year(parsed.year()).month(parsed.month()).date(parsed.date()).hour(parsed.hour()).minute(parsed.minute()).second(parsed.second());

    if (!value || disabledDate && disabledDate(value)) {
      this.data.set('invalid', true);
      this.data.set('showDate', showDate);
      return;
    }

    if (selectedValue !== value || selectedValue && value && !selectedValue.isSame(value)) {
      this.data.set('invalid', false);
      this.data.set('showDate', showDate);
      this.fire('change', value);
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    var disabledDate = this.data.get('disabledDate');
    var value = this.data.get('value');

    if (e.keyCode === _keyCode["default"].ENTER) {
      var validateDate = !disabledDate || !disabledDate(value);

      if (validateDate) {
        this.fire('select', value.clone());
      }
    }
  },
  template: "\n        <div class=\"{{prefixCls}}-input-wrap\">\n            <div class=\"{{prefixCls}}-date-input-wrap\">\n                <input\n                    class=\"{{prefixCls}}-input {{invalid ? prefixCls + '-input-invalid' : ''}}\"\n                    value=\"{{showDate}}\"\n                    disabled=\"{{disabled}}\"\n                    placeholder=\"{{placeholder}}\"\n                    on-change=\"handleChange\"\n                    on-input=\"handleChange\"\n                    on-keydown=\"handleKeyDown\"\n                    inputMode=\"{{inputMode}}\"\n                    s-ref=\"input\"\n                />\n            </div>\n        </div>\n    "
});

exports["default"] = _default;