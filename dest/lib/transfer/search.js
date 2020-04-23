"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd transfer render list body file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('transfer')('list');
var inputPrefixCls = (0, _util.classCreator)('input')();

var _default = _san["default"].defineComponent({
  handleChange: function handleChange(e) {
    this.fire('change', e.target.value);
  },
  handleClear: function handleClear(e) {
    e.preventDefault();
    var disabled = this.data.get('disabled');

    if (!disabled) {
      this.fire('clear', e);
    }
  },
  components: {
    's-icon': _icon["default"]
  },
  template: "\n        <div>\n            <input\n                placeholder=\"{{placeholder}}\"\n                class=\"".concat(inputPrefixCls, " ").concat(prefixCls, "-search\"\n                type=\"text\"\n                on-keyup=\"handleChange\"\n                value=\"{{value}}\"\n            />\n            <a\n                href=\"#\"\n                class=\"").concat(prefixCls, "-search-action\"\n                on-click=\"handleClear\"\n                s-if=\"value && value.length > 0\"\n            >\n                <s-icon type=\"close-circle\" theme=\"filled\" />\n            </a>\n            <span class=\"").concat(prefixCls, "-search-action\" s-else>\n                <s-icon type=\"search\" />\n            </span>\n        </div>\n    ")
});

exports["default"] = _default;