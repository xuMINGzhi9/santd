"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('dropdown')();

var _default = _san["default"].defineComponent({
  handleClick: function handleClick() {
    var value = this.data.get('value');
    var dispatchData = value ? value : this.el.innerText;
    this.dispatch('santd_mention_itemSelect', dispatchData);
  },
  template: "<div class=\"".concat(prefixCls, "-menu-item\" on-click=\"handleClick\">\n            <slot></slot>\n        </div>")
});

exports["default"] = _default;