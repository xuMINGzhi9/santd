"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traverseNodesKey = traverseNodesKey;
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _without = _interopRequireDefault(require("lodash/without"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _util = require("../core/util");

var _treeNode = _interopRequireDefault(require("./treeNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file tree.js 树组件
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('tree')();

function traverseNodesKey() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var callback = arguments.length > 1 ? arguments[1] : undefined;

  function processNode(node) {
    var key = node.data.get('key');

    if (callback(key, node) !== false) {
      traverseNodesKey(node.treeNodes, callback);
    }
  }

  root.forEach(processNode);
}

function toggleArrayData(check) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var key = arguments.length > 2 ? arguments[2] : undefined;
  data = data.concat();
  var index = data.indexOf(key);
  check && index === -1 && data.push(key);
  !check && index !== -1 && data.splice(index, 1);
  return data;
}

var _default = _san["default"].defineComponent({
  components: {
    's-tree-node': _treeNode["default"]
  },
  dataTypes: {
    autoExpandParent: _san.DataTypes.bool,
    blockNode: _san.DataTypes.bool,
    checkable: _san.DataTypes.bool,
    checkedKeys: _san.DataTypes.oneOfType([_san.DataTypes.array, _san.DataTypes.object]),
    checkStrictly: _san.DataTypes.bool,
    defaultCheckedKeys: _san.DataTypes.array,
    defaultExpandAll: _san.DataTypes.bool,
    defaultExpandedKeys: _san.DataTypes.array,
    defaultSelectedKeys: _san.DataTypes.array,
    disabled: _san.DataTypes.bool,
    draggable: _san.DataTypes.bool,
    expandedKeys: _san.DataTypes.array,
    loadData: _san.DataTypes.func,
    loadedKeys: _san.DataTypes.array,
    multiple: _san.DataTypes.bool,
    selectedKeys: _san.DataTypes.array,
    showIcon: _san.DataTypes.bool,
    showLine: _san.DataTypes.bool
  },
  computed: {
    classes: function classes() {
      var showLine = this.data.get('showLine');
      var blockNode = this.data.get('blockNode');
      var directory = this.data.get('isDirectory');
      var classArr = [prefixCls];
      showLine && classArr.push("".concat(prefixCls, "-show-line"));
      blockNode && classArr.push("".concat(prefixCls, "-block-node"));
      directory && classArr.push("".concat(prefixCls, "-directory"));
      return classArr;
    }
  },
  initData: function initData() {
    return {
      disabled: false,
      checkable: false,
      selecteable: true,
      autoExpandParent: true,
      halfCheckedKeys: [],
      allCheckedKeys: [],
      allHalfCheckedKeys: [],
      checkStrictly: false
    };
  },
  inited: function inited() {
    var _this = this;

    this.treeNodes = [];
    this.treeNodesArr = [];
    this.multipleItem = [];
    this.selectedNodes = [];
    this.data.set('expandedKeys', this.data.get('expandedKeys') || this.data.get('defaultExpandedKeys') || []); // 如果是checkable的时候不设置默认的selectedKeys

    var selectedKeys = this.data.get('selectedKeys') || this.data.get('defaultSelectedKeys') || [];
    this.data.set('selectedKeys', this.data.get('checkable') ? [] : selectedKeys);
    var checkedKeys = this.data.get('checkedKeys') || this.data.get('defaultCheckedKeys') || [];
    this.data.set('allCheckedKeys', (0, _isPlainObject["default"])(checkedKeys) ? checkedKeys.checked : checkedKeys);
    this.data.set('allHalfCheckedKeys', (0, _isPlainObject["default"])(checkedKeys) ? checkedKeys.halfChecked : []); // checkable selectable disabled分为全局属性和子节点属性，需要分开对待

    this.data.set('rootCheckable', this.data.get('checkable'));
    this.data.set('rootSelectable', this.data.get('selectable'));
    this.data.set('rootDisabled', this.data.get('disabled'));
    this.data.set('switcherIcon', this.sourceSlots.named.switcherIcon);
    this.data.set('hasTitle', !!this.sourceSlots.named.title);
    this.watch('expandedKeys', function (val) {
      // 当外部传入expandedKeys时，自动展开父节点
      if (_this.data.get('autoExpandParent')) {
        _this.autoExpand();
      }
    });
    this.watch('selectedKeys', function (val) {
      _this.updateTreeNodes();
    }); // 受控状态下监听checkedKeys，如果变化fire到上一层处理

    this.watch('checkedKeys', function (val) {
      var checkStrictly = _this.data.get('checkStrictly');

      var checkedKeys = (0, _isPlainObject["default"])(val) ? val.checked : val || [];
      var halfCheckedKeys; // 如果有父子关联，拿到整个链上的数据

      if (!checkStrictly) {
        var allKeys = _this.getAllCheckedKeys(_this.treeNodes, checkedKeys.concat());

        _this.data.set('allCheckedKeys', allKeys.checkedKeys);

        _this.data.set('allHalfCheckedKeys', allKeys.halfCheckedKeys);
      } // 没有关联的话直接返回当前数据
      else {
          halfCheckedKeys = (0, _isPlainObject["default"])(val) ? val.halfChecked : [] || [];

          _this.data.set('allCheckedKeys', checkedKeys);

          _this.data.set('allHalfCheckedKeys', halfCheckedKeys);
        }

      _this.updateTreeNodes();
    }); // 拿到需要传递给子组件的属性名

    this.paramsArr = (0, _without["default"])(Object.keys(this.data.get()), 'disabled', 'checkable', 'selectable', 'classes', 'treeData');
  },
  // 根据传入的checkedKeys值把上下游节点所有符合的值都取到
  getAllCheckedKeys: function getAllCheckedKeys(treeNodes) {
    var checkedKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var checkStrictly = this.data.get('checkStrictly');
    var checkedKey;
    var allKeys = {
      checkedKeys: [],
      halfCheckedKeys: []
    };

    while (checkedKeys.length) {
      checkedKey = checkedKeys.shift();

      if (!allKeys.checkedKeys.includes(checkedKey)) {
        var keys = this.getChangedCheckedKeys(treeNodes, checkedKey, true, [], [], checkStrictly); // 这里需要对数据进行去重

        allKeys.checkedKeys = Array.from(new Set(allKeys.checkedKeys.concat(keys.checkedKeys)));
        allKeys.halfCheckedKeys = keys.halfCheckedKeys;
      }
    }

    return allKeys;
  },
  getCheckedNodes: function getCheckedNodes(treeNodes, keys) {
    var nodes = [];
    traverseNodesKey(treeNodes, function (key, node) {
      if (keys.includes(key)) {
        nodes.push(node);
      }

      return true;
    });
    return nodes;
  },
  getChangedCheckedKeys: function getChangedCheckedKeys(treeNodes, key, isCheck) {
    var _this2 = this;

    var checkedKeys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var halfCheckedKeys = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var checkStrictly = arguments.length > 5 ? arguments[5] : undefined;
    var checkedNodes = this.getCheckedNodes(this.treeNodes, [key]);
    checkedNodes.forEach(function (node) {
      checkedKeys = toggleArrayData(isCheck, checkedKeys, node.data.get('key'));

      if (!checkStrictly) {
        var parent = node.parentComponent; // 找到后不断遍历父节点，把需要改变状态的父节点的key都拿到

        while (parent && parent !== _this2 && !parent.data.get('disabled')) {
          // 先过滤掉是disabled状态的节点
          var _treeNodes = parent.treeNodes.filter(function (node) {
            return !_this2.data.get('disabled') && !node.data.get('disabled');
          });

          var parentKey = parent.data.get('key');

          var allChecked = _treeNodes.every(function (node) {
            return checkedKeys.includes(node.data.get('key'));
          }); // 如果是子是全选状态，把父的key也放到selected中


          checkedKeys = toggleArrayData(allChecked && isCheck, checkedKeys, parentKey);

          var halfChecked = !_treeNodes.every(function (node) {
            return checkedKeys.includes(node.data.get('key'));
          }) && _treeNodes.some(function (node) {
            var key = node.data.get('key');
            return checkedKeys.includes(key) || halfCheckedKeys.includes(key);
          }); // 如果子不是全选是半选，把父放到halfSelectedKeys里面


          halfCheckedKeys = toggleArrayData(halfChecked, halfCheckedKeys, parentKey);
          parent = parent.parentComponent;
        } // 处理完父节点，处理子节点，找到所有的子节点，添加或者删除在checkedKeys里面


        var disabled = _this2.data.get('disabled') || node.data.get('disabled');
        !disabled && traverseNodesKey(node.treeNodes, function (key, node) {
          var disabled = _this2.data.get('disabled') || node.data.get('disabled');

          if (!disabled) {
            checkedKeys = toggleArrayData(isCheck, checkedKeys, key);
          }

          return !disabled;
        });
      }
    });
    return {
      checkedKeys: checkedKeys,
      halfCheckedKeys: halfCheckedKeys
    };
  },
  attached: function attached() {
    var _this3 = this;

    if (this.data.get('autoExpandParent')) {
      this.autoExpand();
      this.updateTreeNodes();
    }

    var checkStrictly = this.data.get('checkStrictly');
    !checkStrictly && this.nextTick(function () {
      var allKeys = _this3.getAllCheckedKeys(_this3.treeNodes, _this3.data.get('allCheckedKeys').concat());

      _this3.data.set('allCheckedKeys', allKeys.checkedKeys);

      _this3.data.set('allHalfCheckedKeys', allKeys.halfCheckedKeys);

      _this3.updateTreeNodes();
    });
  },
  // 自动展开父节点
  autoExpand: function autoExpand() {
    var expandComponents = this.findExpandComponents();
    var expandedKeys = this.data.get('expandedKeys');

    while (expandComponents.length) {
      var expand = expandComponents.pop();

      while (expand !== this) {
        expand = expand.parentComponent;
        var key = expand.data.get('key');

        if (!expandedKeys.includes(key) && key) {
          expandedKeys.push(key);
        }
      }
    }

    this.data.set('expandedKeys', expandedKeys.concat(), {
      silent: true
    });
  },
  // 把父的所有数据更新给子节点
  updateTreeNodes: function updateTreeNodes() {
    var _this4 = this;

    this.treeNodes.forEach(function (node) {
      _this4.paramsArr.forEach(function (param) {
        node.data.set(param, _this4.data.get(param));
      });
    });
  },
  // 找所有展开的节点
  findExpandComponents: function findExpandComponents() {
    var expandComponents = [];
    var expandedKeys = this.data.get('expandedKeys');
    traverseNodesKey(this.treeNodes, function (key, node) {
      if (expandedKeys.includes(key)) {
        expandComponents.push(node);
      }

      return true;
    });
    return expandComponents;
  },
  messages: {
    // 拿到子节点，便于后面传递数据
    santd_tree_addTreeNode: function santd_tree_addTreeNode(payload) {
      this.treeNodes.push(payload.value);
    },
    // 点击节点的处理
    santd_tree_clickTreeNode: function santd_tree_clickTreeNode(payload) {
      var multiple = this.data.get('multiple');
      var key = payload.value.key;
      var selectedKeys = this.data.get('selectedKeys');
      var index = selectedKeys.indexOf(key);
      multiple && index > -1 && this.data.removeAt('selectedKeys', index);
      multiple && index === -1 && this.data.push('selectedKeys', key);
      !multiple && this.data.set('selectedKeys', [key]);
      this.updateTreeNodes();
      this.fire('select', {
        selectedKeys: this.data.get('selectedKeys'),
        info: payload.value
      });
    },
    // check节点的处理
    santd_tree_checkTreeNode: function santd_tree_checkTreeNode(payload) {
      var info = payload.value;
      var key = info.node.data.get('key');
      var checked = info.checked;
      var checkStrictly = this.data.get('checkStrictly');
      var checkedKeys = this.data.get('allCheckedKeys');
      var halfCheckedKeys = checkStrictly ? [] : this.data.get('allHalfCheckedKeys');
      var allKeys = this.getChangedCheckedKeys(this.treeNodes, key, checked, checkedKeys, halfCheckedKeys, checkStrictly); // 非受控状态下，所有数据都走内部的allCheckedKeys和allHalfCheckedKeys

      if (!('checkedKeys' in this.data.get())) {
        checkedKeys = allKeys.checkedKeys;
        halfCheckedKeys = allKeys.halfCheckedKeys;
        this.data.set('allCheckedKeys', checkedKeys);
        this.data.set('allHalfCheckedKeys', halfCheckedKeys);
      } // 受控状态不保存数据，由外部传入的checkedKeys经过处理后拿到
      else {
          checkedKeys = allKeys.checkedKeys;
        }

      this.updateTreeNodes();

      if (payload.value.event === 'check') {
        this.fire('check', {
          checkedKeys: checkedKeys,
          info: payload.value
        });
      }
    },
    // 展开节点的处理
    santd_tree_expandTreeNode: function santd_tree_expandTreeNode(payload) {
      var expandedKeys = payload.value.expandedKeys;
      this.data.set('expandedKeys', expandedKeys, {
        silent: true
      });
      this.updateTreeNodes();
      this.fire('expand', {
        expandedKeys: expandedKeys,
        info: payload.value
      });
    },
    // 展开所有节点
    santd_tree_expandAll: function santd_tree_expandAll(payload) {
      var key = payload.value;
      this.data.push('expandedKeys', key);
      this.updateTreeNodes();
      this.fire('expandAll', this.data.get('expandedKeys'));
    },
    // 加载数据完成时候的处理
    santd_tree_dataLoaded: function santd_tree_dataLoaded(payload) {
      var loadedKeys = payload.value.loadedKeys;
      var node = payload.value.node;
      this.fire('load', {
        loadedKeys: loadedKeys.map(function (keys) {
          return keys.key;
        }),
        info: {
          event: 'load',
          node: node
        }
      });
    }
  },
  template: "\n        <ul class=\"{{classes}}\" unselectable=\"on\" role=\"tree\">\n            <s-tree-node\n                s-if=\"treeData\"\n                s-for=\"tree in treeData\"\n                selectedKeys=\"{{selectedKeys}}\"\n                expandedKeys=\"{{expandedKeys}}\"\n                allCheckedKeys=\"{{allCheckedKeys}}\"\n                allHalfCheckedKeys=\"{{allHalfCheckedKeys}}\"\n                defaultExpandAll=\"{{defaultExpandAll}}\"\n                autoExpandParent=\"{{autoExpandParent}}\"\n                showLine=\"{{showLine}}\"\n                title=\"{{tree.title}}\"\n                key=\"{{tree.key}}\"\n                value=\"{{tree.value}}\"\n                isLeaf=\"{{tree.isLeaf}}\"\n                checkable=\"{{tree.checkable || rootCheckable}}\"\n                disabled=\"{{tree.disabled || rootDisabled}}\"\n                selectable=\"{{tree.selectable || rootSelectable}}\"\n                loadData=\"{{loadData}}\"\n                treeData=\"{{tree.children}}\"\n                hasTitle=\"{{hasTitle}}\"\n            >\n                <slot name=\"title\" slot=\"title\" var-title=\"{{title}}\" />\n            </s-tree-node>\n            <slot s-else />\n        </ul>\n    "
});

exports["default"] = _default;