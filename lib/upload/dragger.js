"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _upload = _interopRequireDefault(require("./upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 upload
 * @author chenkai13 <chenkai13@baidu.com>
 */
var _default = _san["default"].defineComponent({
  initData: function initData() {
    var data = _upload["default"].prototype.initData();

    data.type = 'drag';
    return data;
  }
}, _upload["default"]);

exports["default"] = _default;