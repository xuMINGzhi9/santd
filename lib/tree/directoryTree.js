"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _tree = _interopRequireWildcard(require("./tree"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var calcRangeKeys = function calcRangeKeys(root) {
  var expandedKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var startKey = arguments.length > 2 ? arguments[2] : undefined;
  var endKey = arguments.length > 3 ? arguments[3] : undefined;
  var keys = [];
  var record;

  if (!startKey || !endKey) {
    return keys;
  }

  if (startKey && startKey === endKey) {
    return [startKey];
  }

  (0, _tree.traverseNodesKey)(root, function (key) {
    if (record === false) {
      return false;
    }

    if (key === startKey || key === endKey) {
      keys.push(key);

      if (record === undefined) {
        record = true;
      } else if (record === true) {
        record = false;
        return false;
      }
    } else if (record === true) {
      keys.push(key);
    }

    if (expandedKeys.indexOf(key) === -1) {
      return false;
    }

    return true;
  });
  return keys;
};

var _default = _san["default"].defineComponent({
  dataTypes: {
    expandAction: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.bool]),
    autoExpandParent: _san.DataTypes.bool,
    blockNode: _san.DataTypes.bool,
    checkable: _san.DataTypes.bool,
    checkedKeys: _san.DataTypes.array,
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
    switcherIcon: _san.DataTypes.func,
    showLine: _san.DataTypes.bool
  },
  components: {
    's-tree': _tree["default"],
    's-icon': _icon["default"]
  },
  initData: function initData() {
    return {
      expandAction: 'click',
      showIcon: true
    };
  },
  handleNodeSelect: function handleNodeSelect(selectedKeys, info) {
    var _this$data$get = this.data.get(),
        multiple = _this$data$get.multiple,
        expandedKeys = _this$data$get.expandedKeys;

    var nativeEvent = info.nativeEvent;
    var ctrlPick = nativeEvent.ctrlKey || nativeEvent.metaKey;
    var shiftPick = nativeEvent.shiftKey;
    var eventKey = info.node.data.get('key');
    var newSelectedKeys = [];

    if (multiple && ctrlPick) {
      newSelectedKeys = selectedKeys;
      this.lastSelectedKey = eventKey;
      this.cachedSelectedKeys = newSelectedKeys;
    } else if (multiple && shiftPick) {
      newSelectedKeys = Array.from(new Set([].concat(_toConsumableArray(this.cachedSelectedKeys || []), _toConsumableArray(calcRangeKeys(this.ref('tree').treeNodes, expandedKeys, eventKey, this.lastSelectedKey)))));
    } else {
      newSelectedKeys = [info.node.data.get('key')];
      this.lastSelectedKey = eventKey;
      this.cachedSelectedKeys = newSelectedKeys;
    }

    this.data.set('selectedKeys', newSelectedKeys);
    this.fire('select', {
      selectedKeys: newSelectedKeys,
      info: {
        selected: true,
        node: info.node,
        nativeEvent: info.nativeEvent
      }
    });
  },
  // 点击具体item
  handleNodeClick: function handleNodeClick(_ref) {
    var selectedKeys = _ref.selectedKeys,
        info = _ref.info;
    this.handleNodeSelect(selectedKeys, info);

    if (info.node.data.get('hasChild')) {
      this.handleDebounceExpand(selectedKeys, info);
    }
  },
  handleNodeExpand: function handleNodeExpand(_ref2) {
    var expandedKeys = _ref2.expandedKeys,
        info = _ref2.info;
    this.data.set('expandedKeys', expandedKeys);
  },
  // 处理展开
  handleDebounceExpand: function handleDebounceExpand(selectedKeys, info) {
    var expandAction = this.data.get('expandAction');

    if (expandAction === 'click') {
      this.expandFolderNode(info);
    }

    this.fire('expand', {
      expandedKeys: this.data.get('expandedKeys'),
      info: info
    });
  },
  // 处理多选
  handleNodeCheck: function handleNodeCheck(payload) {
    this.fire('check', payload);
  },
  // 处理数据加载完毕
  handleNodeLoaded: function handleNodeLoaded(payload) {
    this.fire('load', payload);
  },
  handleExpandAll: function handleExpandAll(expandedKeys) {
    this.data.set('expandedKeys', expandedKeys);
  },
  expandFolderNode: function expandFolderNode(info) {
    var isLeaf = !info.node.data.get('hasChild');
    var nativeEvent = info.nativeEvent;

    if (isLeaf || nativeEvent.shiftKey || nativeEvent.metaKey || nativeEvent.ctrlKey) {
      // 说明不是要展开，而是要选中某项
      return false;
    }

    info.node.handleNodeExpand(event);
  },
  template: "\n        <div>\n            <s-tree\n                autoExpandParent=\"{{autoExpandParent}}\"\n                blockNode=\"{{blockNode}}\"\n                checkable=\"{{checkable}}\"\n                checkedKeys=\"{{checkedKeys}}\"\n                defaultCheckedKeys=\"{{defaultCheckedKeys}}\"\n                defaultExpandAll=\"{{defaultExpandAll}}\"\n                defaultExpandedKeys=\"{{defaultExpandedKeys}}\"\n                defaultSelectedKeys=\"{{defaultSelectedKeys}}\"\n                disabled=\"{{disabled}}\"\n                expandedKeys=\"{{expandedkeys}}\"\n                loadData=\"{{loadData}}\"\n                multiple=\"{{multiple}}\"\n                selectable=\"{{selectable}}\"\n                selectedKeys=\"{{selectedKeys}}\"\n                showIcon=\"{{showIcon}}\"\n                showLine=\"{{showLine}}\"\n                isDirectory=\"{{true}}\"\n                on-select=\"handleNodeClick\"\n                on-expand=\"handleNodeExpand\"\n                on-expandAll=\"handleExpandAll\"\n                on-check=\"handleNodeCheck\"\n                on-load=\"handleNodeLoaded\"\n                s-ref=\"tree\"\n            >\n                <slot />\n            </s-tree>\n        </div>\n    "
});

exports["default"] = _default;