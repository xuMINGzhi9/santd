"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd pagination pager file
 **/
var _default = _san["default"].defineComponent({
  computed: {
    classes: function classes() {
      var prefixCls = this.data.get('rootPrefixCls');
      var page = this.data.get('page');
      var active = this.data.get('active');
      var classArr = ["".concat(prefixCls, "-item"), "".concat(prefixCls, "-item-").concat(page)];
      active && classArr.push("".concat(prefixCls, "-item-active"));
      !page && classArr.push("".concat(prefixCls, "-disabled"));
      return classArr;
    }
  },
  handleClick: function handleClick() {
    this.fire('click', this.data.get('page'));
  },
  handleKeyPress: function handleKeyPress(e) {
    this.fire('keyPress', e, this.data.get('page'));
  },
  template: "<li\n        title=\"{{showTitle ? page : ''}}\"\n        class=\"{{classes}}\"\n        on-click=\"handleClick\"\n        on-keyPress=\"handleKeyPress\"\n        tabIndex=\"0\"\n    >\n        <slot name=\"itemRender\" s-if=\"{{itemRender}}\" var-type=\"{{'page'}}\" var-page=\"{{page}}\" />\n        <a s-else>{{page}}</a>\n    </li>"
});

exports["default"] = _default;