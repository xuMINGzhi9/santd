"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _rangeCalendar = _interopRequireDefault(require("../calendar/src/rangeCalendar"));

var _moment = _interopRequireDefault(require("moment"));

var _util = require("../core/util");

var _trigger = _interopRequireDefault(require("../core/trigger"));

var _placements = _interopRequireDefault(require("../calendar/src/placements"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var prefixCls = (0, _util.classCreator)('calendar')();

function getShowDateFromValue(value, mode) {
  var _value = _slicedToArray(value, 2),
      start = _value[0],
      end = _value[1]; // value could be an empty array, then we should not reset showDate


  if (!start && !end) {
    return;
  }

  if (mode && mode[0] === 'month') {
    return [start, end];
  }

  var newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
  return [start, newEnd];
}

function isEmptyArray(arr) {
  if (Array.isArray(arr)) {
    return arr.length === 0 || arr.every(function (i) {
      return !i;
    });
  }

  return false;
}

function pickerValueAdapter(value) {
  if (!value) {
    return;
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value, value.clone().add(1, 'month')];
}

var _default = _san["default"].defineComponent({
  computed: {
    displayStartValue: function displayStartValue() {
      var value = this.data.get('value');
      var format = this.data.get('format');
      return value && value[0] && value[0].format(format);
    },
    displayEndValue: function displayEndValue() {
      var value = this.data.get('value');
      var format = this.data.get('format');
      return value && value[1] && value[1].format(format);
    },
    calendarClasses: function calendarClasses() {
      var classArr = [];
      var showTime = this.data.get('showTime');
      var ranges = this.data.get('ranges');
      showTime && classArr.push("".concat(prefixCls, "-time"));
      ranges && classArr.push("".concat(prefixCls, "-range-with-ranges"));
      return classArr.join(' ');
    }
  },
  initData: function initData() {
    return {
      allowClear: true,
      showToday: false,
      separator: '~',
      hoverValue: [],
      disabledTime: function disabledTime() {},
      trigger: 'click',
      placements: _placements["default"]
    };
  },
  inited: function inited() {
    var value = this.data.get('value');
    var defaultValue = this.data.get('defaultValue');
    var pickerValue = !value || isEmptyArray(value) ? this.data.get('defaultPickerValue') : value;
    this.data.set('value', value || defaultValue || []);
    this.data.set('showDate', pickerValueAdapter(pickerValue || (0, _moment["default"])()));
    this.data.set('hasExtraFooter', !!this.sourceSlots.named.renderExtraFooter);
    this.data.set('hasDateRender', !!this.sourceSlots.named.dateRender);
    this.data.set('hasSuffixIcon', !!this.sourceSlots.named.suffixIcon);
  },
  handleOpenChange: function handleOpenChange(open) {
    if (open === false) {
      this.data.set('hoverValue', []);
    }

    this.data.set('open', open);
    this.fire('openChange', open);
  },
  handleClearSelection: function handleClearSelection(e) {
    e.preventDefault();
    e.stopPropagation();
    this.data.set('value', []);
    this.handleChange({
      selectedValue: []
    });
    this.dispatch('UI:form-item-interact', {
      fieldValue: '',
      type: 'change',
      e: e
    });
  },
  handleChange: function handleChange(data) {
    var selectedValue = data.selectedValue;
    var cause = data.cause || {};
    this.data.set('value', selectedValue);
    this.data.set('selectedValue', selectedValue);
    this.data.set('showDate', getShowDateFromValue(selectedValue) || this.data.get('showDate'), {
      force: true
    });
    var format = this.data.get('format');

    var _selectedValue = _slicedToArray(selectedValue, 2),
        start = _selectedValue[0],
        end = _selectedValue[1];

    this.fire('change', {
      date: selectedValue,
      dateString: [start && start.format(format) || '', end && end.format(format) || '']
    });
    this.dispatch('UI:form-item-interact', {
      fieldValue: selectedValue,
      type: 'change'
    });

    if (cause.source === 'keyboard' || cause.source === 'dateInputSelect' || !this.data.get('showTime') && cause.source !== 'dateInput' || cause.source === 'todayButton') {
      this.handleOpenChange(false);
    }
  },
  setValue: function setValue(value, hidePanel) {
    this.handleChange(value);

    if (hidePanel || !this.data.get('showTime')) {
      this.data.set('open', false);
    }
  },
  handleRangeClick: function handleRangeClick(value) {
    if (typeof value === 'function') {
      value = value();
    }

    this.setValue(value, true);
    this.fire('ok', value);
    this.fire('openChange', false);
  },
  handleRangeMouseLeave: function handleRangeMouseLeave() {
    if (this.data.get('open')) {
      this.data.set('hoverValue', []);
    }
  },
  handleOk: function handleOk(value) {
    this.fire('ok', value);
    this.handleOpenChange(false);
  },
  handlePanelChange: function handlePanelChange(params) {
    this.fire('panelChange', params);
  },
  components: {
    's-icon': _icon["default"],
    's-trigger': _trigger["default"],
    's-rangecalendar': _rangeCalendar["default"]
  },
  template: "<span\n            id=\"{{id}}\"\n            class=\"{{pickerClass}}\"\n            tabIndex=\"{{disabled ? -1 : 0}}\"\n        >\n\n            <s-trigger\n                prefixCls=\"".concat(prefixCls, "-picker-container\"\n                popupTransitionName=\"{{transitionName}}\"\n                dropdownClassName=\"{{dropdownClassName}}\"\n                getCalendarContainer=\"{{getCalendarContainer}}\"\n                visible=\"{{open}}\"\n                action=\"{{disabled ? [] : trigger}}\"\n                builtinPlacements=\"{{placements}}\"\n                popupPlacement=\"bottomLeft\"\n                destroyPopupOnHide=\"{{true}}\"\n                on-visibleChange=\"handleOpenChange\"\n            >\n                <s-rangecalendar\n                    prefixCls=\"").concat(prefixCls, "\"\n                    style=\"{{popupStyle}}\"\n                    slot=\"popup\"\n                    separator=\"{{separator}}\"\n                    format=\"{{format}}\"\n                    class=\"{{calendarClasses}}\"\n                    showTime=\"{{showTime}}\"\n                    disabledDate=\"{{disabledDate}}\"\n                    disabledTime=\"{{disabledTime}}\"\n                    dateInputPlaceholder=\"{{dateInputPlaceholder || locale.lang.rangePlaceholder}}\"\n                    value=\"{{showDate}}\"\n                    selectedValue=\"{{value}}\"\n                    hoverValue=\"{{hoverValue}}\"\n                    showToday=\"{{showToday}}\"\n                    mode=\"{{mode}}\"\n                    locale=\"{{locale.lang}}\"\n                    localeCode=\"{{localeCode}}\"\n                    hasExtraFooter=\"{{hasExtraFooter}}\"\n                    hasDateRender=\"{{hasDateRender}}\"\n                    ranges=\"{{ranges}}\"\n                    on-select=\"handleChange\"\n                    on-panelChange=\"handlePanelChange\"\n                    on-ok=\"handleOk\"\n                >\n                    <slot name=\"renderExtraFooter\" slot=\"renderExtraFooter\" />\n                    <slot name=\"dateRender\" slot=\"dateRender\" var-current=\"{{current}}\" />\n                </s-rangecalendar>\n                <div class=\"{{pickerInputClass}}\">\n                    <input\n                        disabled=\"{{disabled}}\"\n                        readOnly\n                        value=\"{{displayStartValue}}\"\n                        placeholder=\"{{placeholder && placeholder[0] || locale.lang.rangePlaceholder[0]}}\"\n                        class=\"").concat(prefixCls, "-range-picker-input\"\n                        tabIndex=\"-1\"\n                        style=\"{{inputStyle}}\"\n                    />\n                    <span class=\"").concat(prefixCls, "-range-picker-separator\">{{separator}}</span>\n                    <input\n                        disabled=\"{{disabled}}\"\n                        readOnly\n                        value=\"{{displayEndValue}}\"\n                        placeholder=\"{{placeholder && placeholder[1] || locale.lang.rangePlaceholder[1]}}\"\n                        class=\"").concat(prefixCls, "-range-picker-input\"\n                        tabIndex=\"-1\"\n                        style=\"{{inputStyle}}\"\n                        s-ref=\"input\"\n                    />\n                    <s-icon\n                        s-if=\"!disabled && allowClear && value && (value[0] || value[1])\"\n                        type=\"close-circle\"\n                        class=\"").concat(prefixCls, "-picker-clear\"\n                        theme=\"filled\"\n                        on-click=\"handleClearSelection\"\n                    />\n                    <span class=\"{{prefixCls}}-picker-icon\" s-if=\"hasSuffixIcon\">\n                        <slot name=\"suffixIcon\" />\n                    </span>\n                    <s-icon class=\"").concat(prefixCls, "-picker-icon\" type=\"calendar\" s-else />\n                </div>\n            </s-trigger>\n        </span>")
});

exports["default"] = _default;