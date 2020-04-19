"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

var _checkbox = _interopRequireDefault(require("../checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file treeNode 树组件
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('tree')();

var getComputedKeys = function getComputedKeys() {
  var targetKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var key = arguments.length > 1 ? arguments[1] : undefined;
  var keysFlag = false;
  targetKeys.forEach(function (defKey) {
    if (defKey === key) {
      keysFlag = true;
    }
  });
  return keysFlag;
};

var paramArr = ['selectedKeys', 'expandedKeys', 'allCheckedKeys', 'allHalfCheckedKeys', 'rootCheckable', 'rootSelecable', 'rootDisabled', 'switcherIcon', 'defaultExpandAll', 'autoExpandParent', 'showLine', 'showIcon'];

var _default = _san["default"].defineComponent({
  components: {
    's-icon': _icon["default"],
    's-checkbox': _checkbox["default"],
    's-tree-node': 'self'
  },
  dataTypes: {
    disableCheckbox: _san.DataTypes.bool,
    disabled: _san.DataTypes.bool,
    icon: _san.DataTypes.any,
    isLeaf: _san.DataTypes.bool,
    key: _san.DataTypes.string,
    selectable: _san.DataTypes.bool,
    title: _san.DataTypes.any
  },
  initData: function initData() {
    return {
      selectable: true,
      disabled: false,
      loading: false,
      hasTitle: true
    };
  },
  computed: {
    selected: function selected() {
      return getComputedKeys(this.data.get('selectedKeys'), this.data.get('key'));
    },
    expanded: function expanded() {
      return getComputedKeys(this.data.get('expandedKeys'), this.data.get('key')) || this.data.get('showExpand');
    },
    checked: function checked() {
      return getComputedKeys(this.data.get('allCheckedKeys'), this.data.get('key'));
    },
    indeterminate: function indeterminate() {
      return getComputedKeys(this.data.get('allHalfCheckedKeys'), this.data.get('key'));
    },
    classes: function classes() {
      var expanded = this.data.get('expanded');
      var disabled = this.data.get('rootDisabled') || this.data.get('disabled');
      var checked = this.data.get('checked');
      var selected = this.data.get('selected');
      var classArr = ["".concat(prefixCls, "-treenode-switcher-").concat(expanded ? 'open' : 'close')];
      disabled && classArr.push("".concat(prefixCls, "-treenode-disabled"));
      checked && classArr.push("".concat(prefixCls, "-treenode-checkbox-checked"));
      selected && !disabled && classArr.push("".concat(prefixCls, "-treenode-selected"));
      return classArr;
    },
    checkboxClass: function checkboxClass() {
      var checked = this.data.get('checked');
      var disabled = this.data.get('rootDisabled') || this.data.get('disabled');
      var classArr = ["".concat(prefixCls, "-checkbox")];
      checked && classArr.push("".concat(prefixCls, "-checkbox-checked"));
      disabled && classArr.push("".concat(prefixCls, "-checkbox-disabled"));
      return classArr;
    },
    titleClass: function titleClass() {
      var disabled = this.data.get('rootDisabled') || this.data.get('disabled');
      var hasChild = this.data.get('hasChild');
      var selected = this.data.get('selected');
      var expanded = this.data.get('expanded');
      var classArr = ["".concat(prefixCls, "-node-content-wrapper"), "".concat(prefixCls, "-node-content-wrapper-").concat(hasChild ? expanded ? 'open' : 'close' : 'normal')];
      selected && !disabled && classArr.push("".concat(prefixCls, "-node-selected"));
      return classArr;
    },
    showExpandIcon: function showExpandIcon() {
      return this.data.get('hasChild') || !this.data.get('isLeaf') && this.data.get('loadData') && !this.data.get('loading');
    }
  },
  inited: function inited() {
    var _this = this;

    this.treeNodes = [];
    this.data.set('hasTitle', !!this.sourceSlots.named.title && this.data.get('hasTitle'));
    this.data.set('hasIcon', !!this.sourceSlots.named.icon);
    var treeData = this.data.get('treeData') || [];
    this.data.set('hasChild', !!treeData.length);
    paramArr.forEach(function (param) {
      return _this.data.set(param, _this.parentComponent.data.get(param));
    });
    var switcherIcon = this.parentComponent.data.get('switcherIcon');

    if (switcherIcon) {
      this.sourceSlots.named.switcherIcon = switcherIcon;
      this.data.set('hasSwitcherIcon', true);
      this.data.set('switcherIcon', switcherIcon);
    }

    this.dispatch('santd_tree_addTreeNode', this);
    this.watch('treeData', function (val) {
      _this.data.set('loading', false);

      _this.dispatch('santd_tree_dataLoaded', {
        loadedKeys: val,
        node: _this
      });
    });
  },
  updated: function updated() {
    var _this2 = this;

    // 每次父组件有数据更新就扔给子节点一份去更新
    this.treeNodes.forEach(function (node) {
      paramArr.forEach(function (param) {
        node.data.set(param, _this2.data.get(param));
      });
    });
  },
  messages: {
    santd_tree_addTreeNode: function santd_tree_addTreeNode(payload) {
      // 每个节点单独管理自己的子节点并dispatch自己到父节点上
      this.treeNodes.push(payload.value);

      if (this.treeNodes.length) {
        this.data.set('hasChild', true);
      }
    }
  },
  // 点击节点时候的事件
  handleNodeClick: function handleNodeClick(e) {
    var disabled = this.data.get('rootDisabled') || this.data.get('disabled');
    var selectable = this.data.get('rootSelectable') || this.data.get('selectable');

    if (disabled || !selectable) {
      return;
    }

    this.dispatch('santd_tree_clickTreeNode', {
      event: 'select',
      nativeEvent: e,
      node: this,
      selected: this.data.get('selected'),
      key: this.data.get('key')
    });
  },
  // 点击复选框时候的事件
  handleNodeCheck: function handleNodeCheck(e) {
    this.dispatch('santd_tree_checkTreeNode', {
      event: 'check',
      checked: e.target.checked,
      nativeEvent: e,
      node: this
    });
  },
  // 点击收起按钮时候的事件
  handleNodeExpand: function handleNodeExpand(e) {
    var isLeaf = this.data.get('isLeaf');
    var key = this.data.get('key');
    var loadData = this.data.get('loadData');

    if (loadData && !this.data.get('treeData') && !isLeaf) {
      this.data.set('loading', true);
      loadData(this);
    }

    var expandedKeys = this.data.get('expandedKeys').concat();
    var index = expandedKeys.indexOf(key);
    index > -1 && expandedKeys.splice(index, 1);
    index === -1 && expandedKeys.push(key);
    this.dispatch('santd_tree_expandTreeNode', {
      event: 'expand',
      expanded: this.data.get('expanded'),
      node: this,
      nativeEvent: e,
      expandedKeys: expandedKeys
    });
  },
  attached: function attached() {
    if (this.data.get('defaultExpandAll') && this.data.get('hasChild')) {
      this.dispatch('santd_tree_expandAll', this.data.get('key'));
    }
  },
  template: "\n        <li class=\"{{classes}}\">\n            <span\n                class=\"".concat(prefixCls, "-switcher ").concat(prefixCls, "-switcher_{{showExpandIcon ? expanded ? 'open' : 'close' : 'noop'}}\"\n                on-click=\"handleNodeExpand\"\n            >\n                <span class=\"").concat(prefixCls, "-switcher-{{showLine ? 'line-icon' : 'icon'}}\" s-if=\"hasSwitcherIcon && showExpandIcon\">\n                    <slot name=\"switcherIcon\" var-expanded=\"{{expanded}}\"/>\n                </span>\n                <s-icon type=\"caret-down\" theme=\"filled\" class=\"").concat(prefixCls, "-switcher-icon\" s-else-if=\"showExpandIcon\" />\n                <s-icon type=\"file\" class=\"").concat(prefixCls, "-switcher-line-icon\" s-else-if=\"showLine\" />\n                <s-icon type=\"loading\" class=\"").concat(prefixCls, "-switcher-loading-icon\" s-if=\"loading\" />\n            </span>\n            <s-checkbox\n                checked=\"{{checked}}\"\n                indeterminate=\"{{indeterminate}}\"\n                s-if=\"{{rootCheckable ? checkable !== undefined ? checkable : true : false}}\"\n                disabled=\"{{rootDisabled || disabled || disableCheckbox}}\"\n                on-change=\"handleNodeCheck\"\n                s-ref=\"checkbox\"\n            />\n            <span class=\"{{titleClass}}\" on-click=\"handleNodeClick($event)\">\n                <span class=\"").concat(prefixCls, "-iconEle ").concat(prefixCls, "-tree-icon__customize\" s-if=\"hasIcon && showIcon\">\n                    <slot name=\"icon\" var-selected=\"{{selected}}\" var-expanded=\"{{expanded}}\" var-isLeaf=\"{{!hasChild}} \"/>\n                </span>\n                <span class=\"").concat(prefixCls, "-title\">\n                    <slot name=\"title\" var-title=\"{{title}}\" s-if=\"hasTitle\" />\n                    <template s-else>{{title}}</template>\n                </span>\n            </span>\n            <ul class=\"").concat(prefixCls, "-child-tree ").concat(prefixCls, "-child-tree-{{expanded ? 'open' : 'close'}}\">\n                <s-tree-node\n                    s-if=\"treeData\"\n                    s-for=\"tree in treeData\"\n                    selectedKeys=\"{{selectedKeys}}\"\n                    allCheckedKeys=\"{{allCheckedKeys}}\"\n                    allHalfCheckedKeys=\"{{allHalfCheckedKeys}}\"\n                    defaultExpandAll=\"{{defaultExpandAll}}\"\n                    autoExpandParent=\"{{autoExpandParent}}\"\n                    showLine=\"{{showLine}}\"\n                    title=\"{{tree.title}}\"\n                    key=\"{{tree.key}}\"\n                    value=\"{{tree.value}}\"\n                    isLeaf=\"{{tree.isLeaf}}\"\n                    checkable=\"{{rootCheckable ? tree.checkable !== undefined ? tree.checkable : true : false}}\"\n                    disabled=\"{{rootDisabled || tree.disabled}}\"\n                    selectable=\"{{rootSelectable || tree.selectable}}\"\n                    loadData=\"{{loadData}}\"\n                    treeData=\"{{tree.children}}\"\n                    hasTitle=\"{{hasTitle}}\"\n                >\n                    <slot name=\"title\" slot=\"title\" var-title=\"{{title}}\" />\n                </s-tree-node>\n                <slot s-else />\n            </ul>\n        </li>\n    ")
});

exports["default"] = _default;