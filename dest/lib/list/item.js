"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _avatar = _interopRequireDefault(require("../avatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file item.js 列表组件每个具体项
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('list')();

var Meta = _san["default"].defineComponent({
  dataTypes: {
    avatar: _san.DataTypes.string,
    title: _san.DataTypes.string,
    description: _san.DataTypes.string
  },
  components: {
    's-avatar': _avatar["default"]
  },
  inited: function inited() {
    this.data.set('hasAvatar', !!(this.sourceSlots.named.avatar || this.data.get('avatar')));
    this.data.set('hasTitle', !!(this.sourceSlots.named.title || this.data.get('title')));
    this.data.set('hasDescription', !!(this.sourceSlots.named.description || this.data.get('description')));
  },
  template: "\n        <div class=\"".concat(prefixCls, "-item-meta\">\n            <div class=\"").concat(prefixCls, "-item-meta-avatar\" s-if=\"hasAvatar\">\n                <s-avatar src=\"{{avatar}}\" s-if=\"avatar\" />\n                <slot name=\"avatar\" s-else/>\n            </div>\n            <div class=\"").concat(prefixCls, "-item-meta-content\" s-if=\"hasDescription || hasTitle\">\n                <h4 class=\"").concat(prefixCls, "-item-meta-title\" s-if=\"hasTitle\">\n                    <template s-if=\"title\">{{title}}</template>\n                    <slot name=\"title\" s-else />\n                </h4>\n                <div class=\"").concat(prefixCls, "-item-meta-description\" s-if=\"hasDescription\">\n                    <template s-if=\"description\">{{description}}</template>\n                    <slot name=\"description\" s-else />\n                </div>\n            </div>\n        </div>\n    ")
});

var actionsTemplate = "\n    <slot />\n    <ul s-if=\"actions\" class=\"".concat(prefixCls, "-item-action\">\n        <li s-for=\"action, index in actions\">\n            <slot name=\"{{action}}\" />\n            <em class=\"").concat(prefixCls, "-item-action-split\" s-if=\"index !== actions.length - 1\" />\n        </li>\n    </ul>\n");

var Item = _san["default"].defineComponent({
  dataTypes: {
    actions: _san.DataTypes.array
  },
  inited: function inited() {
    this.data.set('hasExtra', !!this.sourceSlots.named.extra);
  },
  attached: function attached() {
    this.dispatch('santd_list_addItem', this);
  },
  template: "\n        <div class=\"".concat(prefixCls, "-item\">\n            <template s-if=\"itemLayout === 'vertical' && hasExtra\">\n                <div class=\"").concat(prefixCls, "-item-main\" key=\"content\">").concat(actionsTemplate, "</div>\n                <div class=\"").concat(prefixCls, "-item-extra\" key=\"extra\"><slot name=\"extra\" /></div>\n            </template>\n            <template s-else>\n                ").concat(actionsTemplate, "\n            </template>\n        </div>\n    ")
});

Item.Meta = Meta;
var _default = Item;
exports["default"] = _default;