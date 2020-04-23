"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 comment
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('comment')();

var Action = _san["default"].defineComponent({
  template: '<li><slot /></li>'
});

var Comment = _san["default"].defineComponent({
  template: "\n        <div class=\"".concat(prefixCls, "\">\n            <div class=\"").concat(prefixCls, "-inner\">\n                <div class=\"").concat(prefixCls, "-avatar\"><slot name=\"avatar\" /></div>\n                <div class=\"").concat(prefixCls, "-content\">\n                    <div class=\"").concat(prefixCls, "-content-author\" s-if=\"hasAuthor\">\n                        <span class=\"").concat(prefixCls, "-content-author-name\">\n                            <slot name=\"author\" />\n                        </span>\n                        <span class=\"").concat(prefixCls, "-content-author-time\">\n                            <slot name=\"datetime\" />\n                        </span>\n                    </div>\n                    <div class=\"").concat(prefixCls, "-content-detail\">\n                        <slot name=\"content\" />\n                    </div>\n                    <ul class=\"").concat(prefixCls, "-actions\" s-if=\"hasActions\">\n                        <slot name=\"actions\"/>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"").concat(prefixCls, "-nested\" s-if=\"hasNested\">\n                <slot name=\"nested\" />\n            </div>\n        </div>\n    "),
  inited: function inited() {
    var _this$sourceSlots$nam = this.sourceSlots.named,
        author = _this$sourceSlots$nam.author,
        datetime = _this$sourceSlots$nam.datetime,
        actions = _this$sourceSlots$nam.actions,
        nested = _this$sourceSlots$nam.nested;
    this.data.set('hasAuthor', author || datetime);
    this.data.set('hasActions', !!actions);
    this.data.set('hasNested', !!nested);
  }
});

Comment.Action = Action;
var _default = Comment;
exports["default"] = _default;