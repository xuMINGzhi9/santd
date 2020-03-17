"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd transfer render list body file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('transfer')('list');

var _default = _san["default"].defineComponent({
  handleItemSelect: function handleItemSelect(item) {
    if (this.data.get('disabled') || item.disabled) {
      return;
    }

    var selectedKeys = this.data.get('selectedKeys');
    var checked = selectedKeys.indexOf(item.key) >= 0;
    this.fire('itemSelect', {
      selectedKey: item.key,
      checked: !checked
    });
  },
  handleScroll: function handleScroll(e) {
    this.fire('scroll', e);
  },
  components: {
    's-checkbox': _checkbox["default"]
  },
  template: "\n            <ul class=\"".concat(prefixCls, "-content\" on-scroll=\"handleScroll\">\n                <li\n                    s-for=\"item in filteredItems\"\n                    class=\"").concat(prefixCls, "-content-item {{disabled || item.disabled ? '").concat(prefixCls, "-content-item-disabled' : ''}}\"\n                    title=\"{{item.title}}\"\n                    on-click=\"handleItemSelect(item)\"\n                >\n                    <s-checkbox checked=\"{{item.checked}}\" disabled=\"{{disabled || item.disabled}}\" />\n                    <slot var-item=\"{{item}}\" s-if=\"hasRender\" />\n                    <span class=\"").concat(prefixCls, "-content-item-text\" s-else>{{item.title}}</span>\n                </li>\n            </ul>\n        ")
});

exports["default"] = _default;