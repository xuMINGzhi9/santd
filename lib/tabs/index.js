"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _tabPane = _interopRequireDefault(require("./tabPane"));

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

var _util = require("../core/util");

var _scrollableInkTabBar = _interopRequireDefault(require("./scrollableInkTabBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var prefixCls = (0, _util.classCreator)('tabs')();

var Tabs = _san["default"].defineComponent({
  dataTypes: {
    destroyInactiveTabPane: _san.DataTypes.bool,
    activeKey: _san.DataTypes.string,
    defaultActiveKey: _san.DataTypes.string,
    hideAdd: _san.DataTypes.bool,
    tabBarStyle: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.object]),
    type: _san.DataTypes.oneOf(['line', 'card', 'editable-card']),
    tabPosition: _san.DataTypes.oneOf(['top', 'right', 'bottom', 'left']),
    size: _san.DataTypes.oneOf(['large', 'default', 'small']),
    animated: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.object]),
    tabBarGutter: _san.DataTypes.number
  },
  initData: function initData() {
    return {
      destroyInactiveTabPane: false,
      tabBarPosition: 'top',
      type: 'line',
      hideAdd: false,
      tabPosition: 'top',
      children: []
    };
  },
  inited: function inited() {
    this.data.set('activeKey', this.data.get('activeKey') || this.data.get('defaultActiveKey'));
    this.data.set('hasRenderTabBar', !!this.sourceSlots.named.renderTabBar);
    this.data.set('hasExtraContent', !!this.sourceSlots.named.tabBarExtraContent);
    this.tabPanes = [];
  },
  computed: {
    classes: function classes() {
      var tabPosition = this.data.get('tabPosition');
      var size = this.data.get('size');
      var type = this.data.get('type');
      var classArr = ["".concat(prefixCls), "".concat(prefixCls, "-").concat(type), "".concat(prefixCls, "-").concat(tabPosition)];
      (tabPosition === 'left' || tabPosition === 'right') && classArr.push("".concat(prefixCls, "-vertical"));
      !!size && classArr.push("".concat(prefixCls, "-").concat(size));
      type.indexOf('card') >= 0 && classArr.push("".concat(prefixCls, "-card"));
      return classArr.join(' ');
    },
    contentClasses: function contentClasses() {
      var animated = this.data.get('hasAnimated').tabPane;
      var tabPosition = this.data.get('tabPosition');
      var type = this.data.get('type') || '';
      var classArr = ["".concat(prefixCls, "-content"), "".concat(prefixCls, "-").concat(tabPosition, "-content")];
      type.indexOf('card') >= 0 && classArr.push(prefixCls + '-card-content');
      animated ? classArr.push("".concat(prefixCls, "-content-animated")) : classArr.push("".concat(prefixCls, "-content-no-animated"));
      return classArr;
    },
    hasAnimated: function hasAnimated() {
      var animated = this.data.get('animated');
      return _typeof(animated) === 'object' ? animated : {
        tabPane: animated,
        inkBar: animated
      };
    },
    props: function props() {
      var activeKey = this.data.get('activeKey');
      var tabBarGutter = this.data.get('tabBarGutter');
      var tabBarPosition = this.data.get('tabBarPosition');
      var type = this.data.get('type');
      var size = this.data.get('size');
      var tabBarData = this.data.get('tabBarData');
      return {
        activeKey: activeKey,
        tabBarGutter: tabBarGutter,
        tabBarPosition: tabBarPosition,
        type: type,
        size: size,
        tabBarData: tabBarData
      };
    }
  },
  getNextActiveKey: function getNextActiveKey(next) {
    var _this = this;

    var activeKey = this.data.get('activeKey');
    var tabPanesLength = this.tabPanes.length;
    var ret = tabPanesLength && this.tabPanes[0].data.get('key');
    this.tabPanes.forEach(function (tabPane, index) {
      if (tabPane.data.get('key') === activeKey) {
        var currentIndex = next ? ++index : --index;

        if (currentIndex < 0) {
          currentIndex = 0;
        }

        if (currentIndex > tabPanesLength - 1) {
          currentIndex = tabPanesLength - 1;
        }

        ret = _this.tabPanes[currentIndex].data.get('key');
      }
    });
    return ret;
  },
  handleTabClick: function handleTabClick(payload) {
    this.setActiveKey(payload.key);
    this.updateTab();
    this.fire('tabClick', payload.key);
  },
  handleNavKeyDown: function handleNavKeyDown(e) {
    var eventKeyCode = e.keyCode;

    if (eventKeyCode === _keyCode["default"].ARROW_RIGHT || eventKeyCode === _keyCode["default"].ARROW_DOWN) {
      e.preventDefault();
      var nextKey = this.getNextActiveKey(true);
      this.handleTabClick({
        key: nextKey
      });
    } else if (eventKeyCode === _keyCode["default"].ARROW_LEFT || eventKeyCode === _keyCode["default"].ARROW_UP) {
      e.preventDefault();
      var previousKey = this.getNextActiveKey(false);
      this.handleTabClick({
        key: previousKey
      });
    }
  },
  handleCreateNewTab: function handleCreateNewTab() {
    this.fire('edit', {
      action: 'add'
    });
  },
  handleRemoveTab: function handleRemoveTab(_ref) {
    var key = _ref.key,
        e = _ref.e;
    e.stopPropagation();

    if (!key) {
      return;
    }

    this.fire('edit', {
      action: 'remove',
      key: key
    });
  },
  setActiveKey: function setActiveKey(key) {
    if (this.data.get('activeKey') !== key) {
      this.data.set('activeKey', key);
    }

    this.fire('change', key);
  },
  updateTab: function updateTab() {
    var activeKey = this.data.get('activeKey');
    var tabBarData = [];
    this.tabPanes.forEach(function (tabPane) {
      var key = tabPane.data.get('key');
      tabPane.data.set('active', activeKey === key);
      tabBarData.push(tabPane.data.get());
    });
    this.data.set('tabBarData', tabBarData);
    this.data.set('tabPanes', this.tabPanes);
  },
  attached: function attached() {
    var _this2 = this;

    this.updateTab();
    this.watch('tabPosition', function (val) {
      _this2.nextTick(function () {
        _this2.updateTab();
      });
    });
  },
  messages: {
    santd_tabs_tabClick: function santd_tabs_tabClick(payload) {
      this.handleTabClick(payload.value);
    },
    santd_tabs_addTabPane: function santd_tabs_addTabPane(payload) {
      this.tabPanes.push(payload.value);
      this.updateTab();
    },
    santd_tabs_removeTabPane: function santd_tabs_removeTabPane(payload) {
      var _this3 = this;

      this.tabPanes.forEach(function (tabPane, index) {
        if (tabPane.data.get('key') === payload.value) {
          _this3.tabPanes.splice(index, 1);
        }
      });
      this.updateTab();
    },
    santd_tabs_prevClick: function santd_tabs_prevClick(payload) {
      this.fire('prevClick', payload.value);
    },
    santd_tabs_nextClick: function santd_tabs_nextClick(payload) {
      this.fire('nextClick', payload.value);
    }
  },
  components: {
    's-tabbar': _scrollableInkTabBar["default"]
  },
  template: "\n        <div class=\"{{classes}}\"><slot name=\"tab\"/>\n            <template s-if=\"tabPosition === 'bottom'\">\n                <div class=\"{{contentClasses}}\"><slot /></div>\n                <slot name=\"renderTabBar\" var-props=\"{{props}}\" s-if=\"hasRenderTabBar\" />\n                <s-tabbar\n                    tabPanes=\"{{tabPanes}}\"\n                    tabBarData=\"{{tabBarData}}\"\n                    activeKey=\"{{activeKey}}\"\n                    tabBarGutter=\"{{tabBarGutter}}\"\n                    tabBarStyle=\"{{tabBarStyle}}\"\n                    tabBarPosition=\"{{tabPosition}}\"\n                    hasExtraContent=\"{{hasExtraContent}}\"\n                    inkBarAnimated=\"{{hasAnimated.inkBar}}\"\n                    on-tabClick=\"handleTabClick\"\n                    on-keydown=\"native:handleNavKeyDown\"\n                    on-createNewTab=\"handleCreateNewTab\"\n                    on-removeTab=\"handleRemoveTab\"\n                    type=\"{{type}}\"\n                    closable=\"{{closable}}\"\n                    hideAdd=\"{{hideAdd}}\"\n                    size=\"{{size}}\"\n                    props=\"{{props}}\"\n                    s-else\n                ><slot name=\"tabBarExtraContent\" slot=\"tabBarExtraContent\" /></s-tabbar>\n            </template>\n            <template s-else>\n                <slot name=\"renderTabBar\" var-props=\"{{props}}\" s-if=\"hasRenderTabBar\" />\n                <s-tabbar\n                    tabPanes=\"{{tabPanes}}\"\n                    tabBarData=\"{{tabBarData}}\"\n                    activeKey=\"{{activeKey}}\"\n                    tabBarGutter=\"{{tabBarGutter}}\"\n                    tabBarStyle=\"{{tabBarStyle}}\"\n                    tabBarPosition=\"{{tabPosition}}\"\n                    hasExtraContent=\"{{hasExtraContent}}\"\n                    inkBarAnimated=\"{{hasAnimated.inkBar}}\"\n                    on-tabClick=\"handleTabClick\"\n                    on-keydown=\"native:handleNavKeyDown\"\n                    on-createNewTab=\"handleCreateNewTab\"\n                    on-removeTab=\"handleRemoveTab\"\n                    type=\"{{type}}\"\n                    closable=\"{{closable}}\"\n                    hideAdd=\"{{hideAdd}}\"\n                    size=\"{{size}}\"\n                    props=\"{{props}}\"\n                    s-else\n                ><slot name=\"tabBarExtraContent\" slot=\"tabBarExtraContent\" /></s-tabbar>\n                <div class=\"{{contentClasses}}\"><slot /></div>\n            </template>\n        </div>\n    "
});

Tabs.TabPane = _tabPane["default"];
Tabs.TabBar = _scrollableInkTabBar["default"];
var _default = Tabs;
exports["default"] = _default;