"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* @file 具体step
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('steps')();

var _default = _san["default"].defineComponent({
  inited: function inited() {
    var _this = this;

    // 把父节点的progressDot slot添加到自己身上
    this.sourceSlots.named.progressDot = this.parentComponent.sourceSlots.named.progressDot; // 拿到父节点的相关属性值给自己用

    var parentData = this.parentComponent.data.get();
    ['progressDot', 'status', 'hasChange'].forEach(function (key) {
      _this.data.set(key === 'status' ? 'parentStatus' : key, parentData[key]);
    });
    this.data.set('hasTitle', this.data.get('title') || !!this.sourceSlots.named.title);
    this.data.set('hasDescription', this.data.get('description') || !!this.sourceSlots.named.description);
    this.data.set('hasIcon', this.data.get('icon') || !!this.sourceSlots.named.icon);
    this.data.set('hasDot', this.data.get('progressDot') || !!this.sourceSlots.named.progressDot);
    this.watch('hasChange', function (val) {
      val && _this.data.set('accessibilityProps', {
        role: 'button',
        tabIndex: 0
      });
    });
  },
  attached: function attached() {
    this.dispatch('santd_steps_addStep', this);
  },
  components: {
    's-icon': _icon["default"]
  },
  handleClick: function handleClick() {
    var stepIndex = this.data.get('stepIndex');
    this.dispatch('santd_steps_clickStep', stepIndex);
  },
  template: "<div\n        class=\"".concat(prefixCls, "-item ").concat(prefixCls, "-item-{{status}} {{hasIcon ? '").concat(prefixCls, "-item-custom': ''}}\"\n        on-click=\"handleClick\"\n        role=\"{{accessibilityProps.role}}\"\n        tabindex=\"{{accessibilityProps.tabIndex}}\"\n    >\n        <div class=\"").concat(prefixCls, "-item-tail\">{{tailContent}}</div>\n        <div class=\"").concat(prefixCls, "-item-icon\">\n            <span class=\"").concat(prefixCls, "-icon\" s-if=\"hasDot\">\n                <span class=\"").concat(prefixCls, "-icon-dot\" s-if=\"progressDot\" />\n                <slot\n                    s-else\n                    name=\"progressDot\"\n                    var-prefixCls=\"{{'").concat(prefixCls, "'}}\"\n                    var-index=\"{{stepIndex}}\"\n                    var-status=\"{{status}}\"\n                />\n            </span>\n            <span class=\"").concat(prefixCls, "-icon\" s-else-if=\"hasIcon\">\n                <s-icon type=\"{{icon}}\" s-if=\"icon\" />\n                <slot name=\"icon\" s-else />\n            </span>\n            <span class=\"").concat(prefixCls, "-icon\" s-else-if=\"!hasIcon && status === 'finish'\">\n                <s-icon type=\"check\" class=\"").concat(prefixCls, "-finish-icon\" />\n            </span>\n            <span class=\"").concat(prefixCls, "-icon\" s-else-if=\"!hasIcon && status === 'error'\">\n                <s-icon type=\"close\" class=\"").concat(prefixCls, "-error-icon\" />\n            </span>\n            <span class=\"").concat(prefixCls, "-icon\" s-else>{{stepNumber}}</span>\n        </div>\n        <div class=\"").concat(prefixCls, "-item-content\">\n            <div class=\"").concat(prefixCls, "-item-title\" s-if=\"hasTitle\">\n                <template s-if=\"title\">{{title}}</template>\n                <slot name=\"title\" s-else />\n            </div>\n            <div class=\"").concat(prefixCls, "-item-description\" s-if=\"hasDescription\">\n                <template s-if=\"description\">{{description}}</template>\n                <slot name=\"description\" s-else />\n            </div>\n        </div>\n    </div>")
});

exports["default"] = _default;