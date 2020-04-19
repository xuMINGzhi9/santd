"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"public-DraftEditorPlaceholder-root\">\n            <div class=\"public-DraftEditorPlaceholder-inner\"><slot /></div>\n        </div>\n    "
});

exports["default"] = _default;