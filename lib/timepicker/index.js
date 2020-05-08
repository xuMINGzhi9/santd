"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _trigger = _interopRequireDefault(require("../core/trigger"));

var _placements = _interopRequireDefault(require("./placements"));

var _moment = _interopRequireDefault(require("moment"));

var _panel = _interopRequireDefault(require("./panel"));

var _icon = _interopRequireDefault(require("../icon"));

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('time-picker')();

var noop = function noop() {};

var _default = _san["default"].defineComponent({
  dataTypes: {
    clearText: _san.DataTypes.string,
    value: _san.DataTypes.object,
    defaultOpenValue: _san.DataTypes.object,
    inputReadOnly: _san.DataTypes.bool,
    disabled: _san.DataTypes.bool,
    allowClear: _san.DataTypes.bool,
    defaultValue: _san.DataTypes.object,
    open: _san.DataTypes.bool,
    defaultOpen: _san.DataTypes.bool,
    align: _san.DataTypes.object,
    popupPlacement: _san.DataTypes.string,
    transitionName: _san.DataTypes.string,
    getPopupContainer: _san.DataTypes.func,
    timePlaceholder: _san.DataTypes.string,
    format: _san.DataTypes.string,
    showHour: _san.DataTypes.bool,
    showMinute: _san.DataTypes.bool,
    showSecond: _san.DataTypes.bool,
    popupClassName: _san.DataTypes.string,
    popupStyle: _san.DataTypes.object,
    disabledHours: _san.DataTypes.func,
    disabledMinutes: _san.DataTypes.func,
    disabledSeconds: _san.DataTypes.func,
    hideDisabledOptions: _san.DataTypes.bool,
    name: _san.DataTypes.string,
    autoComplete: _san.DataTypes.string,
    use12Hours: _san.DataTypes.bool,
    hourStep: _san.DataTypes.number,
    minuteStep: _san.DataTypes.number,
    secondStep: _san.DataTypes.number,
    focusOnOpen: _san.DataTypes.bool,
    autoFocus: _san.DataTypes.bool,
    id: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      clearText: 'clear',
      defaultOpen: false,
      inputReadOnly: false,
      popupClassName: '',
      popupStyle: {},
      id: '',
      align: {},
      defaultOpenValue: (0, _moment["default"])(),
      allowClear: true,
      showHour: true,
      showMinute: true,
      showSecond: true,
      disabledHours: noop,
      disabledMinutes: noop,
      disabledSeconds: noop,
      hideDisabledOptions: false,
      builtinPlacements: _placements["default"],
      action: ['click'],
      popupPlacement: 'bottomLeft',
      use12Hours: false,
      autoFocus: false,
      transitionName: 'slide-up',
      componentName: 'TimePicker'
    };
  },
  computed: _objectSpread(_objectSpread({}, _receiver["default"].computed), {}, {
    getFormat: function getFormat() {
      var format = this.data.get('format');
      var showHour = this.data.get('showHour');
      var showMinute = this.data.get('showMinute');
      var showSecond = this.data.get('showSecond');
      var use12Hours = this.data.get('use12Hours');

      if (format) {
        return format;
      }

      if (use12Hours) {
        var fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter(function (item) {
          return !!item;
        }).join(':');
        return fmtString.concat(' a');
      }

      return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter(function (item) {
        return !!item;
      }).join(':');
    },
    displayValue: function displayValue() {
      var value = this.data.get('value');
      var getFormat = this.data.get('getFormat');
      return value && value.format(getFormat);
    },
    getPopupClassName: function getPopupClassName() {
      var showHour = this.data.get('showHour');
      var showMinute = this.data.get('showMinute');
      var showSecond = this.data.get('showSecond');
      var use12Hours = this.data.get('use12Hours');
      var popupClassName = this.data.get('popupClassName');
      var selectColumnCount = 0;
      showHour && selectColumnCount++;
      showMinute && selectColumnCount++;
      showSecond && selectColumnCount++;
      use12Hours && selectColumnCount++;
      var classArr = [popupClassName, "".concat(prefixCls, "-panel-column-").concat(selectColumnCount)];
      (!showHour || !showMinute || !showSecond) && !use12Hours && classArr.push("".concat(prefixCls, "-panel-narrow"));
      return classArr.join(' ');
    },
    defaultFormat: function defaultFormat() {
      var format = this.data.get('format');
      var use12Hours = this.data.get('use12Hours');

      if (format) {
        return format;
      } else if (use12Hours) {
        return 'h:mm:ss a';
      }

      return 'HH:mm:ss';
    },
    showHour: function showHour() {
      var format = this.data.get('defaultFormat');
      return format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1;
    },
    showMinute: function showMinute() {
      var format = this.data.get('defaultFormat');
      return format.indexOf('m') > -1;
    },
    showSecond: function showSecond() {
      var format = this.data.get('defaultFormat');
      return format.indexOf('s') > -1;
    }
  }),
  inited: function inited() {
    var open = this.data.get('open');
    var defaultOpen = this.data.get('defaultOpen');
    var value = this.data.get('value');
    var defaultValue = this.data.get('defaultValue');

    _receiver["default"].inited.bind(this)();

    this.data.set('open', open || defaultOpen);
    this.data.set('value', value || defaultValue);
    this.data.set('hasSuffixIcon', !!this.sourceSlots.named.suffixIcon);
    this.data.set('hasClearIcon', !!this.sourceSlots.named.clearIcon);
    this.data.set('hasAddon', !!this.sourceSlots.named.addon);
  },
  components: {
    's-trigger': _trigger["default"],
    's-icon': _icon["default"],
    's-panel': _panel["default"]
  },
  setValue: function setValue(value) {
    this.data.set('value', value);

    if (value) {
      this.handleChange(value);
    }
  },
  handleVisibleChange: function handleVisibleChange(visible) {
    this.data.set('open', visible);
    this.fire('openChange', visible);
  },
  handleKeyDown: function handleKeyDown(e) {
    if (e.keyCode === 40) {
      this.handleVisibleChange(true);
    }
  },
  handleClear: function handleClear(e) {
    e.stopPropagation();
    this.fire('click');
    this.setValue(null);
    this.handleVisibleChange(false);
    this.dispatch('UI:form-item-interact', {
      fieldValue: '',
      type: 'change',
      e: e
    });
  },
  handleChange: function handleChange(value) {
    this.data.set('value', value.clone());
    var format = this.data.get('format') || 'HH:mm:ss';
    this.fire('change', {
      time: value,
      timeString: value && value.format(format) || ''
    });
    this.dispatch('UI:form-item-interact', {
      fieldValue: value,
      type: 'change'
    });
  },
  focus: function focus() {
    this.ref('picker').focus();
  },
  blur: function blur() {
    this.ref('picker').blur();
  },
  template: "<span>\n        <s-trigger\n            popupClassName=\"{{getPopupClassName}}\"\n            popupStyle=\"{{popupStyle}}\"\n            popupAlign=\"{{align}}\"\n            builtinPlacements=\"{{builtinPlacements}}\"\n            popupPlacement=\"{{popupPlacement}}\"\n            action=\"{{disabled ? [] : action}}\"\n            destroyPopupOnHide\n            getPopupContainer=\"{{getPopupContainer}}\"\n            popupTransitionName=\"{{transitionName}}\"\n            visible=\"{{open}}\"\n            on-visibleChange=\"handleVisibleChange\"\n        >\n            <span class=\"".concat(prefixCls, " {{size ? '").concat(prefixCls, "-' + size : ''}}\">\n                <input\n                    class=\"").concat(prefixCls, "-input\"\n                    type=\"text\"\n                    placeholder=\"{{placeholder || locale.placeholder}}\"\n                    name=\"{{name}}\"\n                    value=\"{{displayValue}}\"\n                    disabled=\"{{disabled}}\"\n                    autoComplete=\"{{autoComplete}}\"\n                    readOnly=\"{{!!inputReadOnly}}\"\n                    id=\"{{id}}\"\n                    on-keydown=\"handleKeyDown\"\n                    s-ref=\"picker\"\n                />\n                <span class=\"").concat(prefixCls, "-icon\">\n                    <slot name=\"suffixIcon\" s-if=\"hasSuffixIcon\" />\n                    <s-icon s-else type=\"clock-circle\" class=\"").concat(prefixCls, "-clock-icon\" />\n                </span>\n                <template s-if=\"!disabled && allowClear && value\">\n                    <slot name=\"clearIcon\" s-if=\"hasClearIcon\" />\n                    <s-icon s-else type=\"close-circle\" class=\"").concat(prefixCls, "-clear\" theme=\"filled\" on-click=\"handleClear\"/>\n                </template>\n            </span>\n            <s-panel\n                slot=\"popup\"\n                prefixCls=\"").concat(prefixCls, "-panel\"\n                placeholder=\"{{placeholder}}\"\n                disabledHours=\"{{disabledHours}}\"\n                disabledMinutes=\"{{disabledMinutes}}\"\n                disabledSeconds=\"{{disabledSeconds}}\"\n                hideDisabledOptions=\"{{hideDisabledOptions}}\"\n                inputReadOnly=\"{{inputReadOnly}}\"\n                showHour=\"{{showHour}}\"\n                showMinute=\"{{showMinute}}\"\n                showSecond=\"{{showSecond}}\"\n                defaultOpenValue=\"{{defaultOpenValue}}\"\n                clearText=\"{{clearText}}\"\n                use12Hours=\"{{use12Hours}}\"\n                focusOnOpen=\"{{focusOnOpen}}\"\n                hourStep=\"{{hourStep}}\"\n                minuteStep=\"{{minuteStep}}\"\n                secondStep=\"{{secondStep}}\"\n                format=\"{{getFormat}}\"\n                value=\"{{value}}\"\n                hasAddon=\"{{hasAddon}}\"\n                on-change=\"handleChange\"\n            >\n                <slot name=\"addon\" slot=\"addon\" />\n            </s-panel>\n        </s-trigger>\n    </span>")
});

exports["default"] = _default;