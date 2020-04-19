"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _base = _interopRequireDefault(require("./base"));

var _calendarHeader = _interopRequireDefault(require("./calendar/calendarHeader"));

var _inherits = _interopRequireDefault(require("../../core/util/inherits"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd month calendar source file
 * @author mayihui@baidu.com
 **/
var _default = (0, _inherits["default"])(_san["default"].defineComponent({
  initData: function initData() {
    return {
      mode: 'month'
    };
  },
  inited: function inited() {
    var _this = this;

    var value = this.data.get('value') || this.data.get('defaultValue') || (0, _moment["default"])();
    var selectedValue = this.data.get('selectedValue') || this.data.get('defaultSelectedValue');
    var localeCode = this.data.get('localeCode');
    localeCode && value.locale(localeCode);
    this.data.set('value', value);
    this.data.set('selectedValue', selectedValue);
    this.data.set('mode', 'month');
    this.watch('selectedValue', function (val) {
      localeCode && val.locale(localeCode);

      _this.data.set('value', val);
    });
  },
  handleMonthSelect: function handleMonthSelect(value) {
    this.fire('select', {
      value: value
    });
  },
  handlePanelChange: function handlePanelChange(_ref) {
    var value = _ref.value,
        mode = _ref.mode;

    if (mode && mode !== 'date') {
      this.data.set('mode', mode);
    }

    this.fire('panelChange', {
      value: value || this.data.get('value'),
      mode: mode
    });
  },
  components: {
    's-calendarheader': _calendarHeader["default"]
  },
  template: "\n        <div\n            class=\"{{classes}} {{prefixCls}}-month-calendar\"\n            tabIndex=\"0\"\n        >\n            <div class=\"{{prefixCls}}-month-calendar-contnet\">\n                <div class=\"{{prefixCls}}-month-header-wrap\">\n                    <s-calendarheader\n                        prefixCls=\"{{prefixCls}}\"\n                        mode=\"{{mode}}\"\n                        value=\"{{value || defaultValue}}\"\n                        locale=\"{{locale}}\"\n                        disabledMonth=\"{{disabledDate}}\"\n                        hasExtraFooter=\"{{hasExtraFooter}}\"\n                        on-valueChange=\"setValue\"\n                        on-panelChange=\"handlePanelChange\"\n                        on-monthSelect=\"handleMonthSelect\"\n                    >\n                        <slot name=\"renderExtraFooter\" slot=\"renderExtraFooter\" />\n                    </s-calendarheader>\n                </div>\n            </div>\n        </div>\n    "
}), _base["default"]);

exports["default"] = _default;