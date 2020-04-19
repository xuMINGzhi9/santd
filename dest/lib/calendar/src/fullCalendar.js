"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _base = _interopRequireDefault(require("./base"));

var _dateTable = _interopRequireDefault(require("./date/dateTable"));

var _monthTable = _interopRequireDefault(require("./month/monthTable"));

var _inherits = _interopRequireDefault(require("../../core/util/inherits"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd full calendar source file
 * @author mayihui@baidu.com
 **/
var _default = (0, _inherits["default"])(_san["default"].defineComponent({
  components: {
    's-datetable': _dateTable["default"],
    's-monthtable': _monthTable["default"]
  },
  initData: function initData() {
    return {
      defaultType: 'date',
      fullscreen: false,
      showTypeSwitch: true,
      showHeader: true
    };
  },
  inited: function inited() {
    var type = this.data.get('type');
    var defaultType = this.data.get('defaultType');
    var value = this.data.get('value');
    var defaultValue = this.data.get('defaultValue');
    var selectedValue = this.data.get('selectedValue');
    var defaultSelectedValue = this.data.get('defaultSelectedValue');
    this.data.set('type', type || defaultType);
    this.data.set('value', value || defaultValue || (0, _moment["default"])());
    this.data.set('selectedValue', selectedValue || defaultSelectedValue);
    this.data.set('hasMonthCellRender', !!this.sourceSlots.named.customMonthCellRender);
    this.data.set('hasDateCellRender', !!this.sourceSlots.named.customDateCellRender);
  },
  handleSelect: function handleSelect(value) {
    this.data.set('value', value);
    this.fire('select', value);
  },
  handleMonthSelect: function handleMonthSelect(value) {
    this.data.set('value', value);
    this.fire('select', value);
  },
  setType: function setType(type) {
    this.data.set('type', type);
    this.fire('typeChange', type);
  },
  template: "\n        <div\n            class=\"{{prefixCls}} {{prefixCls}}-full {{fullscreen ? prefixCls + '-fullscreen': ''}}\"\n            tabIndex=\"0\"\n        >\n            <calendarheader\n                s-if=\"showHeader\"\n                prefixCls=\"{{prefixCls}}\"\n                key=\"calendar-header\"\n                type=\"{{type}}\"\n                value=\"{{value}}\"\n                locale=\"{{locale}}\"\n                showTypeSwitch=\"{{showTypeSwitch}}\"\n                fullscreen=\"{{fullscreen}}\"\n                on-typeChange=\"setType\"\n                on-valueChange=\"setValue\"\n            />\n            <div key=\"calendar-body\" class=\"{{prefixCls}}-calendar-body\">\n            <s-datetable\n                s-if=\"type === 'date'\"\n                locale=\"{{locale}}\"\n                prefixCls=\"{{prefixCls}}\"\n                value=\"{{value}}\"\n                disabledDate=\"{{disabledDate}}\"\n                hasDateRender=\"{{hasDateCellRender}}\"\n                on-select=\"handleSelect\"\n            >\n                <slot\n                    name=\"customDateCellRender\"\n                    slot=\"dateRender\"\n                    var-rootPrefixCls=\"{{rootPrefixCls}}\"\n                    var-prefixCls=\"{{prefixCls}}\"\n                    var-date=\"{{date}}\"\n                    var-value=\"{{value}}\"\n                />\n            </s-datetable>\n            <s-monthtable\n                s-else\n                locale=\"{{locale}}\"\n                prefixCls=\"{{prefixCls}}-month-panel\"\n                rootPrefixCls=\"{{prefixCls}}\"\n                value=\"{{value}}\"\n                disabledDate=\"{{disabledDate}}\"\n                hasMonthRender=\"{{hasMonthCellRender}}\"\n                on-select=\"handleMonthSelect\"\n            >\n                <slot\n                    name=\"customMonthCellRender\"\n                    slot=\"monthRender\"\n                    var-rootPrefixCls=\"{{rootPrefixCls}}\"\n                    var-prefixCls=\"{{prefixCls}}\"\n                    var-month=\"{{month}}\"\n                    var-value=\"{{value}}\"\n                />\n            </s-monthtable>\n            </div>\n        </div>\n    "
}), _base["default"]);

exports["default"] = _default;