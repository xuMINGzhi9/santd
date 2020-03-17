"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _nav = _interopRequireDefault(require("./nav"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 suggestions
 * @author raowenjuan <raowenjuan@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('suggestions')();
var prefixDropCls = (0, _util.classCreator)('dropdown')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    placement: _san.DataTypes.string,
    position: _san.DataTypes.object,
    isShowSug: _san.DataTypes.bool,
    loading: _san.DataTypes.bool
  },
  components: {
    's-icon': _icon["default"],
    's-nav': _nav["default"]
  },
  computed: {
    innerStyle: function innerStyle() {
      var isShowSug = this.data.get('isShowSug');
      var position = this.data.get('position');
      var isTop = this.data.get('placement') === 'top';
      return {
        display: isShowSug ? 'block' : 'none',
        left: "".concat(position.left, "px"),
        top: isTop ? 'auto' : "".concat(position.top + position.height, "px"),
        bottom: isTop ? "".concat(position.top + position.height, "px;") : 'auto'
      };
    }
  },
  initData: function initData() {
    return {
      position: {
        left: 0,
        top: 0,
        height: 0
      },
      display: 'none',
      loading: false
    };
  },
  created: function created() {
    var suggestions = this.data.get('suggestions');

    if (typeof suggestions === 'function') {
      this.components.customsuggestions = suggestions;
      this.data.set('customSuggestions', true);
    }
  },
  template: "\n        <div class=\"".concat(prefixCls, "-wrapper\" style=\"{{innerStyle}}\">\n            <div class=\"").concat(prefixCls, "-content ").concat(prefixDropCls, "-menu\" s-ref=\"nav-area\">\n                <customsuggestions s-if=\"{{customSuggestions}}\" />\n                <template s-else>\n                    <s-nav s-if=\"{{suggestions && suggestions.length}}\" s-for=\"item in suggestions\">{{item}}</s-nav>\n                    <s-icon s-else-if=\"{{loading}}\" type=\"loading\" style=\"display:block;margin:0 auto;\" />\n                    <div s-else class=\"").concat(prefixCls, "-notfound\">{{notFoundContent}}</div>\n                </template>\n            </div>\n        </div>\n        ")
});

exports["default"] = _default;