"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _loadingBlock = _interopRequireDefault(require("./loadingBlock"));

var _tabs = _interopRequireDefault(require("../tabs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefix = (0, _util.classCreator)('card')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    type: _san.DataTypes.string,
    title: _san.DataTypes.string,
    size: _san.DataTypes.string,
    tabList: _san.DataTypes.array,
    loading: _san.DataTypes.bool,
    hoverable: _san.DataTypes.bool,
    defaultActiveKey: _san.DataTypes.string,
    activeTabKey: _san.DataTypes.string,
    bordered: _san.DataTypes.bool,
    actions: _san.DataTypes.array
  },
  template: "\n        <div class=\"{{cls}}\">\n            <div s-if=\"showHeader\" class=\"".concat(prefix, "-head\" style=\"{{headStyle}}\">\n                <div class=\"").concat(prefix, "-head-wrapper\">\n                    <div s-if=\"title\" class=\"").concat(prefix, "-head-title\">{{title}}</div>\n                    <div s-if=\"hasExtra\" class=\"").concat(prefix, "-extra\">\n                        <slot name=\"extra\" />\n                    </div>\n                </div>\n                <s-tabs\n                    s-if=\"tabList && tabList.length\"\n                    activeTabKey=\"{{activeTabKey}}\"\n                    defaultActiveKey=\"{{defaultActiveKey}}\"\n                    class=\"").concat(prefix, "-head-tabs\"\n                    size=\"large\"\n                    on-change=\"onTabChange\"\n                >\n                    <s-tabpane\n                        s-for=\"item in tabList\"\n                        tab=\"{{item.tab}}\"\n                        key=\"{{item.key}}\"\n                        disabled=\"{{disabled}}\"\n                    />\n                </s-tabs>\n            </div>\n            <div class=\"").concat(prefix, "-cover\">\n                <slot name=\"cover\" />\n            </div>\n            <div class=\"").concat(prefix, "-body\" style=\"{{bodyStyle}}\">\n                <s-loadingblock s-if=\"loading\" />\n                <slot s-else />\n            </div>\n            <ul s-if=\"actions\" class=\"").concat(prefix, "-actions\">\n                <li s-for=\"action in actions\" style=\"width: {{100 / actions.length}}%\">\n                    <span><slot name=\"{{action}}\"/></span>\n                </li>\n            </ul>\n        </div>\n    "),
  components: {
    's-loadingblock': _loadingBlock["default"],
    's-tabs': _tabs["default"],
    's-tabpane': _tabs["default"].TabPane
  },
  initData: function initData() {
    return {
      bordered: true
    };
  },
  computed: {
    cls: function cls() {
      var loading = this.data.get('loading');
      var bordered = this.data.get('bordered');
      var type = this.data.get('type');
      var tabList = this.data.get('tabList');
      var isContainGrid = this.data.get('isContainGrid');
      var hoverable = !!this.data.get('hoverable');
      var size = this.data.get('size');
      var classArr = [prefix];
      loading && classArr.push("".concat(prefix, "-loading"));
      bordered && classArr.push("".concat(prefix, "-bordered"));
      hoverable && classArr.push("".concat(prefix, "-hoverable"));
      isContainGrid && classArr.push("".concat(prefix, "-contain-grid"));
      tabList && tabList.length && classArr.push("".concat(prefix, "-contain-tabs"));
      !!type && classArr.push("".concat(prefix, "-type-").concat(type));
      !!size && classArr.push("".concat(prefix, "-").concat(size));
      return classArr;
    }
  },
  inited: function inited() {
    var hasExtra = !!this.sourceSlots.named.extra;
    var showHeader = this.data.get('title') || this.data.get('tabList') || hasExtra;
    this.data.set('showHeader', showHeader);
    this.data.set('hasExtra', hasExtra);
  },
  onTabChange: function onTabChange(key) {
    this.fire('tabChange', key);
  }
});

exports["default"] = _default;