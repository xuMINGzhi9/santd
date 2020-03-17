"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _scrollableTabBarNode = _interopRequireDefault(require("./scrollableTabBarNode"));

var _tabBarTabsNode = _interopRequireDefault(require("./tabBarTabsNode"));

var _utils = require("./utils");

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file Santd tabs scrollable ink tab bar file
 * @author mayihui@baidu.com
 **/
var prefixCls = (0, _util.classCreator)('tabs')();

var _default = _san["default"].defineComponent({
  components: {
    's-scrollabletabbarnode': _scrollableTabBarNode["default"],
    's-tabbartabsnode': _tabBarTabsNode["default"],
    's-icon': _icon["default"]
  },
  initData: function initData() {
    return {
      tabBarPosition: 'top',
      inkBarAnimated: true,
      refs: {}
    };
  },
  computed: {
    classes: function classes() {
      var tabPosition = this.data.get('tabBarPosition');
      var size = this.data.get('size');
      var type = this.data.get('type');
      var classArr = ["".concat(prefixCls, "-bar"), "".concat(prefixCls, "-").concat(tabPosition, "-bar")];
      !!size && classArr.push("".concat(prefixCls, "-").concat(size, "-bar"));
      type && type.indexOf('card') >= 0 && classArr.push("".concat(prefixCls, "-card-bar"));
      return classArr.join(' ');
    }
  },
  messages: {
    santd_tabs_addRef: function santd_tabs_addRef(payload) {
      this.data.set('refs.' + payload.value.name, payload.value.ref);
    }
  },
  handleTabClick: function handleTabClick(payload) {
    this.fire('tabClick', payload);
  },
  handleKeyDown: function handleKeyDown(e) {
    this.fire('keydown', e);
  },
  handleCreateNewTab: function handleCreateNewTab() {
    this.fire('createNewTab');
  },
  handleRemoveTab: function handleRemoveTab(prop) {
    this.fire('removeTab', prop);
  },
  updateInkBar: function updateInkBar(component, init) {
    var refs = this.data.get('refs');
    var rootNode = this.ref('root');
    var wrapNode = refs.nav || rootNode;
    var inkBarNode = this.ref('inkBar');
    var inkBarNodeStyle = inkBarNode && inkBarNode.style;
    var tabsNode = this.ref('tabsNode');
    var tabBarPosition = this.data.get('tabBarPosition');
    var tabBarData = this.data.get('tabBarData') || [];
    var activeTab;
    tabBarData.forEach(function (tabBar, index) {
      if (tabBar.active && tabsNode.children[1].children[index]) {
        activeTab = tabsNode.children[1].children[index].el;
        return;
      }
    });

    if (!inkBarNode || !activeTab) {
      return;
    }

    this.data.set('refs.activeTab', activeTab);
    var transformSupported = (0, _utils.isTransform3dSupported)(inkBarNodeStyle);
    var inkBarStyles = '';

    if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
      var left = (0, _utils.getLeft)(activeTab, wrapNode);
      var width = activeTab.offsetWidth; // use 3d gpu to optimize render

      inkBarStyles = transformSupported ? "transform: translate3d(".concat(left, "px, 0, 0);") : "left: ".concat(left, "px;");
      inkBarStyles += "width: ".concat(width, "px;");
    } else {
      var top = (0, _utils.getTop)(activeTab, wrapNode, true);
      var height = activeTab.offsetHeight;
      inkBarStyles = transformSupported ? "transform: translate3d(0, ".concat(top, "px, 0);") : "top: ".concat(top, "px;");
      inkBarStyles += "height: ".concat(height, "px;");
    }

    this.data.set('inkBarStyles', inkBarStyles);
  },
  attached: function attached() {
    var _this = this;

    this.data.set('refs.root', this.ref('root'));
    window.setTimeout(function () {
      _this.updateInkBar();
    }, 0);
    this.watch('tabBarData', function (val) {
      _this.updateInkBar();
    });
  },
  template: "\n        <div style=\"{{tabBarPosition === 'left' || tabBarPosition === 'right' ? 'height:100%;float:' + tabBarPosition : ''}}\">\n        <slot name=\"tab\" />\n            <div\n                role=\"tablist\"\n                class=\"{{classes}}\"\n                tabIndex=\"0\"\n                on-keydown=\"handleKeyDown\"\n                s-ref=\"root\"\n            >\n                <div\n                    class=\"".concat(prefixCls, "-extra-content\"\n                    style=\"{{tabBarPosition === 'top' || tabBarPosition === 'bottom' ? 'float: right' : ''}}\"\n                >\n                    <template s-if=\"type === 'editable-card' && !hideAdd\">\n                        <s-icon type=\"plus\" class=\"").concat(prefixCls, "-new-tab\" on-click=\"handleCreateNewTab\" />\n                        <slot name=\"tabBarExtraContent\" />\n                    </template>\n                    <slot name=\"tabBarExtraContent\" s-else />\n                </div>\n                <s-scrollabletabbarnode\n                    refs=\"{{refs}}\"\n                    tabBarPosition=\"{{tabBarPosition}}\"\n                >\n                    <s-tabbartabsnode\n                        tabPanes=\"{{tabPanes}}\"\n                        tabBarData=\"{{tabBarData}}\"\n                        type=\"{{type}}\"\n                        closable=\"{{closable}}\"\n                        activeKey=\"{{activeKey}}\"\n                        tabBarGutter=\"{{tabBarGutter}}\"\n                        tabBarPosition=\"{{tabBarPosition}}\"\n                        on-tabClick=\"handleTabClick\"\n                        on-removeTab=\"handleRemoveTab\"\n                        s-ref=\"tabsNode\"\n                    />\n                    <div\n                        class=\"").concat(prefixCls, "-ink-bar ").concat(prefixCls, "-ink-bar-{{inkBarAnimated ? 'animated' : 'no-animated'}}\"\n                        style=\"{{inkBarStyles}}\"\n                        s-ref=\"inkBar\"\n                    />\n                </s-scrollabletabbarnode>\n            </div>\n        </div>\n    ")
});

exports["default"] = _default;