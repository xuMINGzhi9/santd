"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _select = _interopRequireDefault(require("../select"));

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd pagination options file
 **/
var _default = _san["default"].defineComponent({
  components: {
    's-select': _select["default"],
    's-option': _select["default"].Option
  },
  handleChangeSize: function handleChangeSize(value) {
    this.fire('changeSize', Number(value));
  },
  handleChange: function handleChange(e) {
    this.data.set('goInputText', e.target.value);
  },
  handleGo: function handleGo(e) {
    var val = this.data.get('goInputText');

    if (val === '') {
      return;
    }

    val = isNaN(val) ? this.data.get('current') : Number(val);

    if (e.keyCode === _keyCode["default"].ENTER || e.type === 'click') {
      this.data.set('goInputText', '');
      this.fire('quickGo', val);
    }
  },
  template: "\n        <li class=\"{{rootPrefixCls}}-options\">\n            <s-select\n                s-if=\"{{showSizeChanger}}\"\n                prefixCls=\"{{selectPrefixCls}}\"\n                class=\"{{rootPrefixCls}}-options-size-changer\"\n                optionLabelProp=\"children\"\n                defaultValue=\"{{pageSize || pageSizeOptions[0]}}\"\n                size=\"{{size}}\"\n                disabled=\"{{disabled}}\"\n                on-change=\"handleChangeSize\"\n            >\n                <s-option s-for=\"pageSize in pageSizeOptions\" value=\"{{pageSize}}\" locale=\"{{locale}}\">\n                    {{pageSize}} {{locale.items_per_page}}\n                </s-option>\n            </s-select>\n            <div\n                s-if=\"{{quickGo}}\"\n                class=\"{{rootPrefixCls}}-options-quick-jumper\"\n            >\n                {{locale.jump_to}}\n                <input type=\"text\" value=\"{{goInputText}}\" on-change=\"handleChange\" on-keyup=\"handleGo\" disabled=\"{{disabled}}\"/>\n                {{locale.page}}\n                <button s-if=\"{{goButton === true}}\" on-click=\"handleGo\" on-keyup=\"handleGo\" disabled=\"{{disabled}}\">\n                    {{locale.jump_to_confirm}}\n                </button>\n                <span s-else on-click=\"handleGo\" on-keyup=\"handleGo\">{{goButton}}</span>\n            </div>\n        </li>\n    "
});

exports["default"] = _default;