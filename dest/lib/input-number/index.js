"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _inputHandler = _interopRequireDefault(require("./inputHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file input-number
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('input-number')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    autoFocus: _san.DataTypes.bool,
    defaultValue: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    disabled: _san.DataTypes.bool,
    max: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    min: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    precision: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    size: _san.DataTypes.oneOf(['default', 'small', 'large']),
    step: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    value: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number])
  },
  components: {
    'input-handler': _inputHandler["default"]
  },
  computed: {
    outClasses: function outClasses() {
      var focused = this.data.get('autoFocus');
      var disabled = this.data.get('disabled');
      var size = this.data.get('size');
      var classArr = [prefixCls];
      focused && classArr.push("".concat(prefixCls, "-focused"));
      disabled && classArr.push("".concat(prefixCls, "-disabled"));
      size === 'large' && classArr.push("".concat(prefixCls, "-lg"));
      size === 'small' && classArr.push("".concat(prefixCls, "-sm"));
      return classArr;
    }
  },
  initData: function initData() {
    return {
      disabled: false,
      size: 'default',
      step: 1,
      inputDisplayValue: 1
    };
  },
  messages: {
    santd_inputnumber_up: function santd_inputnumber_up() {
      // 拿到当前的value，然后通过step，进行+step
      this.valueWillHandle('up', 'change');
    },
    santd_inputnumber_down: function santd_inputnumber_down() {
      this.valueWillHandle('down', 'change');
    }
  },
  inited: function inited() {
    var _this = this;

    var defaultValue = this.data.get('defaultValue') || this.data.get('value') || '';
    this.data.set('inputDisplayValue', this.inputDisplayValueFormat(defaultValue));
    this.watch('value', function (value) {
      _this.data.set('inputDisplayValue', _this.inputDisplayValueFormat(value));
    });
  },
  valueWillHandle: function valueWillHandle(direction, moving) {
    var parser = this.data.get('parser');
    var step = this.data.get('step');
    var inputValue = this.getValueFromEvent(this.data.get('inputDisplayValue'));
    inputValue = typeof parser === 'function' ? parser(inputValue) : inputValue;
    this.stepFn(inputValue, step, direction, moving);
  },

  /**
  * 计算上一步/下一步数值
  * @param {string| number} num 要处理前的input-value
  * @param {number} ratio  每一次要处理的区间
  * @param {string} type 是要加还是减操作
  * @param {string} fireEvent 要触发的自定义事件
  */
  stepFn: function stepFn(num) {
    var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var type = arguments.length > 2 ? arguments[2] : undefined;
    var fireEvent = arguments.length > 3 ? arguments[3] : undefined;

    if (this.data.get('disabled')) {
      return false;
    }

    var max = +this.data.get('max');
    var min = +this.data.get('min');
    var value = this.getCurrentValidValue(num, max, min) || 0;

    if (this.isNotCompleteNumber(value)) {
      return false;
    }

    var val = this.getStep(value, ratio, max, min, type);
    this.setStatus(val, max, min, fireEvent);
  },

  /**
  * 动态设置value并fire事件
  *
  * @param {number| string} val value值
  * @param {number} max 最大值
  * @param {number} min 最小值
  * @param {string} fireEvent 向外fire的自定义事件名
  */
  setStatus: function setStatus(val, max, min, fireEvent) {
    if (this.isNotCompleteNumber(val)) {
      return false;
    }

    this.data.set('upDisabledConfirm', val >= max);
    this.data.set('downDisabledConfirm', val <= min);
    val <= max && val >= min && this.fire(fireEvent, val);
    val = val > max ? max : val < min ? min : val;
    this.data.set('inputDisplayValue', this.inputDisplayValueFormat(val), {
      force: true
    });
  },
  getStep: function getStep(val, rat, max, min, type) {
    // 获取到最大精度
    var precisionFactor = this.getPrecisionFactor(val, rat);
    var precision = Math.abs(this.getMaxPrecision(val, rat));
    var result;

    if (typeof val === 'number') {
      var value = type === 'up' ? val + Number(rat) : val - Number(rat);
      result = (precisionFactor * value / precisionFactor).toFixed(precision);
    } else {
      result = min === -Infinity ? rat : min;
    }

    return this.toNumber(result);
  },
  toNumber: function toNumber(num) {
    if (this.isNotCompleteNumber(num)) {
      return num;
    }

    var precision = this.data.get('precision');
    return Number(precision ? Number(num).toFixed(precision) : num);
  },
  getPrecision: function getPrecision(value) {
    var valueString = value.toString();

    if (valueString.indexOf('e-') >= 0) {
      return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }

    return valueString.indexOf('.') >= 0 ? valueString.length - valueString.indexOf('.') - 1 : 0;
  },
  // 获取数值精度，如：value=1.21, step=1.1
  getMaxPrecision: function getMaxPrecision(currentValue, ratio) {
    var precision = this.data.get('precision');

    if (precision) {
      return precision;
    }

    var ratioPrecision = this.getPrecision(ratio);
    var step = this.data.get('step');
    var stepPrecision = this.getPrecision(step); // 处理现有value精度

    var currentValuePrecision = this.getPrecision(currentValue); // 返回小数位后最大精度

    return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
  },
  getPrecisionFactor: function getPrecisionFactor(currentValue) {
    var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var precision = this.getMaxPrecision(currentValue, ratio);
    return Math.pow(10, precision);
  },
  getCurrentValidValue: function getCurrentValidValue(num, max, min) {
    return this.toNumber(!this.isNotCompleteNumber(num) ? this.getValidValue(num, max, min) : num);
  },
  getValidValue: function getValidValue(value, max, min) {
    var val = parseFloat(value, 10);

    if (isNaN(val)) {
      return value;
    }

    return val > max ? max : val < min ? min : val;
  },
  // 判断number
  isNotCompleteNumber: function isNotCompleteNumber(num) {
    return isNaN(num) || num === '' || num === null || num && num.toString().indexOf('.') === num.toString().length - 1;
  },
  inputDisplayValueFormat: function inputDisplayValueFormat(num) {
    var formatter = this.data.get('formatter');
    var decimalSeparator = this.data.get('decimalSeparator');

    if (num.toString() === '-0') {
      return '-0';
    }

    if (decimalSeparator !== undefined) {
      num = num.toString().replace('.', decimalSeparator);
    }

    if (formatter && typeof formatter === 'function') {
      return this.data.get('formatter')(num);
    }

    return num;
  },
  onFocus: function onFocus(e) {
    this.fire('focus', e);
  },
  onBlur: function onBlur(e) {
    var max = this.data.get('max');
    var min = this.data.get('min');
    var formatter = this.data.get('formatter');
    var parser = this.data.get('parser');
    var input = this.getValueFromEvent(e.target.value);

    if (typeof formatter === 'function' && typeof parser === 'function') {
      input = parser(input);
    }

    var value = this.getCurrentValidValue(input, max, min);
    var newValue = this.isNotCompleteNumber(parseFloat(value, 10)) ? undefined : parseFloat(value, 10); // hack 如果传入的值不合法，则默认为最小值

    if (!newValue) {
      newValue = min;
    }

    this.setStatus(newValue, max, min, 'change');
    this.fire('blur', newValue);
  },
  onKeyDown: function onKeyDown(e) {
    var step = this.data.get('step');
    var inputValue = e.target.value;

    if (e.keyCode === 38) {
      this.stepFn(inputValue, step, 'up', 'keydown');
    } else if (e.keyCode === 40) {
      this.stepFn(inputValue, step, 'down', 'keydown');
    }
  },
  getValueFromEvent: function getValueFromEvent(value) {
    var decimalSeparator = this.data.get('decimalSeparator');
    return decimalSeparator ? value.replace(decimalSeparator, '.') : value;
  },
  onKeyUp: function onKeyUp(e) {
    this.fire('keyup', e);
  },
  onChange: function onChange(e) {
    // 记录input时的change，并fire出去
    var formatter = this.data.get('formatter');
    var parser = this.data.get('parser');
    var input = e.target.value;
    var formatInput;
    input = this.getValueFromEvent(input);

    if (typeof formatter === 'function' && typeof parser === 'function') {
      input = parser(input);
    }

    formatInput = this.inputDisplayValueFormat(input);
    this.data.set('inputDisplayValue', formatInput);
    this.fire('change', input);
    this.dispatch('UI:form-item-interact', {
      fieldValue: input,
      type: 'change',
      e: e
    });
  },
  focus: function focus() {
    this.ref('realInput').focus();
  },
  blur: function blur() {
    this.ref('realInput').blur();
  },
  attached: function attached() {
    var _this2 = this;

    this.nextTick(function () {
      if (_this2.data.get('autoFocus') && !_this2.data.get('disabled')) {
        _this2.focus();
      }
    });
  },
  template: "\n        <div class=\"{{outClasses}}\">\n            <div class=\"".concat(prefixCls, "-handler-wrap\">\n                <input-handler\n                    direction=\"up\"\n                    disabled=\"{{upDisabledConfirm}}\"\n                    prefixCls=\"").concat(prefixCls, "\"\n                />\n                <input-handler\n                    direction=\"down\"\n                    disabled=\"{{downDisabledConfirm}}\"\n                    prefixCls=\"").concat(prefixCls, "\"\n                />\n            </div>\n            <div\n                class=\"").concat(prefixCls, "-input-wrap\"\n                role=\"spinbutton\"\n                aria-valuemin=\"{{min}}\"\n                aria-valuemax=\"{{max}}\"\n                aria-valuenow=\"{{defaultValue}}\"\n            >\n                <input\n                    s-ref=\"realInput\"\n                    type=\"text\"\n                    class=\"").concat(prefixCls, "-input\"\n                    on-focus=\"onFocus($event)\"\n                    on-blur=\"onBlur($event)\"\n                    on-keydown=\"onKeyDown($event)\"\n                    on-keyup=\"onKeyUp($event)\"\n                    disabled=\"{{disabled}}\"\n                    step=\"{{step}}\"\n                    max=\"{{max}}\"\n                    min=\"{{min}}\"\n                    name=\"{{inputName}}\"\n                    on-input=\"onChange($event)\"\n                    autoComplete='off'\n                    value=\"{{inputDisplayValue}}\"\n                >\n            </div>\n        </div>\n    ")
});

exports["default"] = _default;