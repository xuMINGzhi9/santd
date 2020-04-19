"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _empty = _interopRequireDefault(require("../empty"));

var _list = _interopRequireDefault(require("./list"));

var _operation = _interopRequireDefault(require("./operation"));

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('transfer')();
var emptyPrefixCls = (0, _util.classCreator)('empty')();

var _default = _san["default"].defineComponent({
  computed: _objectSpread({}, _receiver["default"].computed, {
    classes: function classes() {
      var disabled = this.data.get('disabled');
      var hasRenderList = this.data.get('hasLeftRenderList') || this.data.get('hsaRightRenderList');
      var classArr = [prefixCls];
      disabled && classArr.push("".concat(prefixCls, "-disabled"));
      !!hasRenderList && classArr.push("".concat(prefixCls, "-customize-list"));
      return classArr;
    },
    separateDataSource: function separateDataSource() {
      var dataSource = this.data.get('dataSource');
      var rowKey = this.data.get('rowKey');
      var targetKeys = this.data.get('targetKeys') || [];
      var leftDataSource = [];
      var rightDataSource = new Array(targetKeys.length);
      dataSource.forEach(function (record) {
        if (rowKey) {
          record.key = rowKey(record);
        }

        var indexOfKey = targetKeys.indexOf(record.key);

        if (indexOfKey !== -1) {
          rightDataSource[indexOfKey] = record;
        } else {
          leftDataSource.push(record);
        }
      });
      return {
        leftDataSource: leftDataSource,
        rightDataSource: rightDataSource
      };
    }
  }),
  initData: function initData() {
    return {
      componentName: 'Transfer',
      showSelectAll: true,
      sourceSelectedKeys: [],
      targetSelectedKeys: [],
      operations: []
    };
  },
  inited: function inited() {
    _receiver["default"].inited.call(this);

    this.data.set('hasFooter', !!this.sourceSlots.named.footer);
    this.data.set('hasRender', !!this.sourceSlots.named.render);
    this.data.set('hasLeftRenderList', !!this.sourceSlots.named.leftRenderList);
    this.data.set('hasRightRenderList', !!this.sourceSlots.named.rightRenderList);
  },
  getSelectedKeysName: function getSelectedKeysName(direction) {
    return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
  },
  handleSelectChange: function handleSelectChange(direction, holder) {
    var sourceSelectedKeys = this.data.get('sourceSelectedKeys');
    var targetSelectedKeys = this.data.get('targetSelectedKeys');
    this.fire('selectChange', direction === 'left' ? {
      sourceSelectedKeys: holder,
      targetSelectedKeys: targetSelectedKeys
    } : {
      targetSelectedKeys: holder,
      sourceSelectedKeys: sourceSelectedKeys
    });
  },
  handleItemSelect: function handleItemSelect(direction, selectedKey, checked) {
    var sourceSelectedKeys = this.data.get('sourceSelectedKeys');
    var targetSelectedKeys = this.data.get('targetSelectedKeys');
    var holder = direction === 'left' ? sourceSelectedKeys.slice(0) : targetSelectedKeys.slice(0);
    var index = holder.indexOf(selectedKey);

    if (index > -1) {
      holder.splice(index, 1);
    }

    if (checked) {
      holder.push(selectedKey);
    }

    this.handleSelectChange(direction, holder);
    this.data.set(this.getSelectedKeysName(direction), holder);
  },
  handleLeftItemSelectAll: function handleLeftItemSelectAll(params) {
    this.handleItemSelectAll('left', params.selectedKeys, params.checkAll);
  },
  handleRightItemSelectAll: function handleRightItemSelectAll(params) {
    this.handleItemSelectAll('right', params.selectedKeys, params.checkAll);
  },
  handleItemSelectAll: function handleItemSelectAll(direction, selectedKeys, checkAll) {
    var originalSelectedKeys = this.data.get(this.getSelectedKeysName(direction)) || [];
    var mergedCheckedKeys = [];

    if (checkAll) {
      // Merge current keys with origin key
      mergedCheckedKeys = Array.from(new Set([].concat(_toConsumableArray(originalSelectedKeys), _toConsumableArray(selectedKeys))));
    } else {
      // Remove current keys from origin keys
      mergedCheckedKeys = originalSelectedKeys.filter(function (key) {
        return selectedKeys.indexOf(key) === -1;
      });
    }

    this.handleSelectChange(direction, mergedCheckedKeys);
    this.data.set(this.getSelectedKeysName(direction), mergedCheckedKeys);
  },
  handleLeftItemSelect: function handleLeftItemSelect(_ref) {
    var selectedKey = _ref.selectedKey,
        checked = _ref.checked;
    this.handleItemSelect('left', selectedKey, checked);
  },
  handleRightItemSelect: function handleRightItemSelect(_ref2) {
    var selectedKey = _ref2.selectedKey,
        checked = _ref2.checked;
    this.handleItemSelect('right', selectedKey, checked);
  },
  handleMoveTo: function handleMoveTo(direction) {
    var targetKeys = this.data.get('targetKeys') || [];
    var dataSource = this.data.get('dataSource') || [];
    var sourceSelectedKeys = this.data.get('sourceSelectedKeys');
    var targetSelectedKeys = this.data.get('targetSelectedKeys');
    var moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys; // filter the disabled options

    var newMoveKeys = moveKeys.filter(function (key) {
      return !dataSource.some(function (data) {
        return !!(key === data.key && data.disabled);
      });
    }); // move items to target box

    var newTargetKeys = direction === 'right' ? newMoveKeys.concat(targetKeys) : targetKeys.filter(function (targetKey) {
      return newMoveKeys.indexOf(targetKey) === -1;
    }); // empty checked keys

    var oppositeDirection = direction === 'right' ? 'left' : 'right';
    this.data.set(this.getSelectedKeysName(oppositeDirection), []);
    this.handleSelectChange(oppositeDirection, []);
    this.fire('change', {
      targetKeys: newTargetKeys,
      direction: direction,
      moveKeys: newMoveKeys
    });
  },
  handleScroll: function handleScroll(direction, e) {
    this.fire('scroll', {
      direction: direction,
      e: e
    });
  },
  handleLeftFilter: function handleLeftFilter(value) {
    this.handleFilter('left', value);
  },
  handleRightFilter: function handleRightFilter(value) {
    this.handleFilter('left', value);
  },
  handleFilter: function handleFilter(direction, value) {
    this.fire('searchChange', {
      direction: direction,
      value: value
    });
    this.fire('search', {
      direction: direction,
      value: value
    });
  },
  handleLeftClear: function handleLeftClear() {
    this.handleClear('left');
  },
  handleRightClear: function handleRightClear() {
    this.handleClear('right');
  },
  handleClear: function handleClear(direction) {
    this.fire('search', {
      direction: direction,
      value: ''
    });
  },
  getTitles: function getTitles(titles, index) {
    var locale = this.data.get('locale');
    return (titles || locale && locale.titles || [])[index] || '';
  },
  components: {
    's-list': _list["default"],
    's-operation': _operation["default"],
    's-empty': _empty["default"]
  },
  template: "<div class=\"{{classes}}\">\n        <s-list\n            titleText=\"{{getTitles(titles, 0)}}\"\n            dataSource=\"{{separateDataSource.leftDataSource}}\"\n            filterOption=\"{{filterOption}}\"\n            style=\"{{listStyle}}\"\n            checkedKeys=\"{{sourceSelectedKeys}}\"\n            targetKeys=\"{{targetKeys}}\"\n            showSearch=\"{{showSearch}}\"\n            body=\"{{body}}\"\n            hasRender=\"{{hasRender}}\"\n            hasRenderList=\"{{hasLeftRenderList}}\"\n            hasFooter=\"{{hasFooter}}\"\n            disabled=\"{{disabled}}\"\n            direction=\"left\"\n            showSelectAll=\"{{showSelectAll}}\"\n            searchPlaceholder=\"{{locale.searchPlaceholder}}\"\n            itemUnit=\"{{locale.itemUnit}}\"\n            itemsUnit=\"{{locale.itemsUnit}}\"\n            on-itemSelect=\"handleLeftItemSelect\"\n            on-itemSelectAll=\"handleLeftItemSelectAll\"\n            on-scroll=\"handleScroll('left', $event)\"\n            on-filter=\"handleLeftFilter\"\n            on-clear=\"handleLeftClear\"\n        >\n            <slot name=\"render\" slot=\"render\" var-item=\"{{item}}\" />\n            <slot\n                name=\"leftRenderList\"\n                slot=\"renderList\"\n                var-direction=\"{{direction}}\"\n                var-filteredItems=\"{{filteredItems}}\"\n                var-selectedKeys=\"{{selectedKeys}}\"\n                var-disabled=\"{{disabled}}\"\n                var-targetKeys=\"{{targetKeys}}\"\n            />\n            <slot name=\"footer\" slot=\"footer\" />\n            <s-empty slot=\"notfoundcontent\" image=\"".concat(_empty["default"].PRESENTED_IMAGE_SIMPLE, "\" class=\"").concat(emptyPrefixCls, "-small\"/>\n        </s-list>\n        <s-operation\n            class=\"").concat(prefixCls, "-operation\"\n            rightActive=\"{{sourceSelectedKeys.length > 0}}\"\n            rightArrowText=\"{{operations[0]}}\"\n            leftActive=\"{{targetSelectedKeys.length > 0}}\"\n            leftArrowText=\"{{operations[1]}}\"\n            style=\"{{operationStyle}}\"\n            disabled=\"{{disabled}}\"\n            on-moveToLeft=\"handleMoveTo('left')\"\n            on-moveToRight=\"handleMoveTo('right')\"\n        />\n        <s-list\n            titleText=\"{{getTitles(titles, 1)}}\"\n            dataSource=\"{{separateDataSource.rightDataSource}}\"\n            filterOption=\"{{filterOption}}\"\n            style=\"{{listStyle}}\"\n            checkedKeys=\"{{targetSelectedKeys}}\"\n            targetKeys=\"{{targetKeys}}\"\n            showSearch=\"{{showSearch}}\"\n            body=\"{{body}}\"\n            hasFooter=\"{{hasFooter}}\"\n            hasRender=\"{{hasRender}}\"\n            hasRenderList=\"{{hasRightRenderList}}\"\n            disabled=\"{{disabled}}\"\n            direction=\"right\"\n            showSelectAll=\"{{showSelectAll}}\"\n            searchPlaceholder=\"{{locale.searchPlaceholder}}\"\n            itemUnit=\"{{locale.itemUnit}}\"\n            itemsUnit=\"{{locale.itemsUnit}}\"\n            on-itemSelect=\"handleRightItemSelect\"\n            on-itemSelectAll=\"handleRightItemSelectAll\"\n            on-scroll=\"handleScroll('right', $event)\"\n            on-filter=\"handleRightFilter\"\n            on-clear=\"handleRightClear\"\n        >\n            <slot name=\"render\" slot=\"render\" var-item=\"{{item}}\" />\n            <slot\n                name=\"rightRenderList\"\n                slot=\"renderList\"\n                var-direction=\"{{direction}}\"\n                var-filteredItems=\"{{filteredItems}}\"\n                var-selectedKeys=\"{{selectedKeys}}\"\n                var-disabled=\"{{disabled}}\"\n                var-targetKeys=\"{{targetKeys}}\"\n            />\n            <slot name=\"footer\" slot=\"footer\" />\n            <s-empty slot=\"notfoundcontent\" image=\"").concat(_empty["default"].PRESENTED_IMAGE_SIMPLE, "\" class=\"").concat(emptyPrefixCls, "-small\"/>\n        </s-list>\n    </div>")
});

exports["default"] = _default;