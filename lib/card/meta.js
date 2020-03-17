"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('card')();

var _default = _san["default"].defineComponent({
  template: "\n    \t<div class=\"".concat(prefixCls, "-meta\">\n            <div s-if=\"isAvatar\" class=\"").concat(prefixCls, "-meta-avatar\">\n                <slot name=\"avatar\" />\n            </div>\n            <div s-if=\"isTitle || isDes || title || description\" class=\"").concat(prefixCls, "-meta-detail\">\n                <div s-if=\"isTitle || title\" class=\"").concat(prefixCls, "-meta-title\">\n                    <slot name=\"title\" />{{title}}\n                </div>\n                <div s-if=\"isDes || description}}\" class=\"").concat(prefixCls, "-meta-description\">\n                    <slot name=\"description\" />{{description}}\n                </div>\n            </div>\n        </div>\n    "),
  inited: function inited() {
    this.data.set('isAvatar', !!this.sourceSlots.named.avatar);
    this.data.set('isDes', !!this.sourceSlots.named.description);
    this.data.set('isTitle', !!this.sourceSlots.named.title);
  }
});

exports["default"] = _default;