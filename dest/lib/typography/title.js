"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('typography')();
var baseTemplate = "<s-base \n    copyable=\"{{copyable}}\"\n    delete=\"{{delete}}\"\n    disabled=\"{{disabled}}\"\n    ellipsis=\"{{ellipsis}}\"\n    level=\"{{level}}\"\n    mark=\"{{mark}}\"\n    underline=\"{{underline}}\"\n    type=\"{{type}}\"\n    ><slot /></s-base>\n";

var _default = _san["default"].defineComponent({
  template: "\n        <div>\n            <h2 s-if=\"level === 2\" class=\"".concat(prefixCls, "\">").concat(baseTemplate, "</h2>\n            <h3 s-elif=\"level === 3\" class=\"").concat(prefixCls, "\">").concat(baseTemplate, "</h3>\n            <h4 s-elif=\"level === 4\" class=\"").concat(prefixCls, "\">").concat(baseTemplate, "</h4>\n            <h1 s-else class=\"").concat(prefixCls, "\">").concat(baseTemplate, "</h1>\n        </div>\n    "),
  components: {
    's-base': _base["default"].create('title')
  }
});

exports["default"] = _default;