"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _util = require("../core/util");

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('typography')();

var isStyleSupport = function isStyleSupport(styleName) {
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    var styleNameList = Array.isArray(styleName) ? styleName : [styleName];
    var documentElement = window.document.documentElement;
    return styleNameList.some(function (name) {
      return name in documentElement.style;
    });
  }

  return false;
};

var create = function create(tag) {
  var content = "\n        <strong s-if=\"strong\"><slot /></strong>\n        <u s-elif=\"underline\"><slot /></u>\n        <del s-elif=\"delete\"><slot /></del>\n        <code s-elif=\"code\"><slot /></code>\n        <mark s-elif=\"mark\"><slot /></mark>\n        <slot s-else />\n        <s-tooltip title=\"{{copied ? locale.copied : locale.copy}}\" s-if=\"copyable\">\n            <button\n                s-if=\"copyable\"\n                class=\"".concat(prefixCls, "-copy\"\n                style=\"border: 0px; background: transparent; padding: 0px; line-height: inherit;\"\n                on-click=\"handleCopy\">\n                <s-icon type=\"{{copied ? 'check' : 'copy'}}\" />\n            </button>\n        </s-tooltip>\n    ");
  var template;

  if (!tag || tag === 'paragraph') {
    template = "<div class=\"{{classes}}\">".concat(content, "</div>");
  } else if (tag === 'text') {
    template = "<span class=\"{{classes}}\">".concat(content, "</span>");
  } else if (tag === 'title') {
    template = "<span>".concat(content, "</span>");
  }

  return _san["default"].defineComponent({
    template: template,
    initData: function initData() {
      return {
        componentName: 'Text',
        clientRendered: false
      };
    },
    attached: function attached() {
      this.data.set('clientRendered', true);
    },
    inited: _receiver["default"].inited,
    computed: _objectSpread({}, _receiver["default"].computed, {
      getEllipsis: function getEllipsis() {
        var ellipsis = this.data.get('ellipsis');
        return !ellipsis ? {} : _objectSpread({
          rows: 1,
          expandable: false
        }, _typeof(ellipsis) === 'object' ? ellipsis : null);
      },
      canUseCSSEllipsis: function canUseCSSEllipsis() {
        var _this$data$get = this.data.get(),
            clientRendered = _this$data$get.clientRendered,
            copyable = _this$data$get.copyable,
            getEllipsis = _this$data$get.getEllipsis;

        var rows = getEllipsis.rows;
        var expandable = getEllipsis.expandable;

        if (copyable || expandable || !clientRendered) {
          return false;
        }

        if (rows === 1) {
          return isStyleSupport('textOverflow');
        }

        return isStyleSupport('webkitLineClamp');
      },
      classes: function classes() {
        var type = this.data.get('type');
        var disabled = this.data.get('disabled');
        var rows = this.data.get('getEllipsis').rows;
        var cssEllipsis = this.data.get('canUseCSSEllipsis');
        var cssTextOverflow = rows === 1 && cssEllipsis;
        var cssLineClamp = rows && rows > 1 && cssEllipsis;
        var classArr = [prefixCls];
        type === 'secondary' && classArr.push("".concat(prefixCls, "-secondary"));
        type === 'warning' && classArr.push("".concat(prefixCls, "-warning"));
        type === 'danger' && classArr.push("".concat(prefixCls, "-danger"));
        disabled && classArr.push("".concat(prefixCls, "-disabled"));
        rows && classArr.push("".concat(prefixCls, "-ellipsis"));
        cssTextOverflow && classArr.push("".concat(prefixCls, "-ellipsis-single-line"));
        cssLineClamp && classArr.push("".concat(prefixCls, "-ellipsis-multiple-line"));
        return classArr;
      }
    }),
    components: {
      's-icon': _icon["default"],
      's-tooltip': _tooltip["default"]
    },
    handleCopy: function handleCopy() {
      var _this = this;

      var copyable = this.data.get('copyable');

      var copyConfig = _objectSpread({}, _typeof(copyable) === 'object' ? copyable : null);

      if (copyConfig.text == null) {
        var textnode = (0, _util.getComponentChildren)(this.children, function (item) {
          return item.nodeType === _san.NodeType.TEXT;
        });
        copyConfig.text = textnode.reduce(function (total, cur) {
          return !/^\n\s*$/g.test(cur.content) ? total + cur.content : total;
        }, '');
      }

      (0, _copyToClipboard["default"])(copyConfig.text || '');

      if (typeof copyConfig.onCopy === 'function') {
        copyConfig.onCopy();
      }

      this.data.set('copied', true);
      this.copyId = window.setTimeout(function () {
        _this.data.set('copied', false);
      }, 3000);
    }
  });
};

var base = create();
base.create = create;
var _default = base;
exports["default"] = _default;