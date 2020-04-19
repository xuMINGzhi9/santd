"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _icon = _interopRequireDefault(require("../icon"));

var _spin = _interopRequireDefault(require("../spin"));

var _pagination = _interopRequireDefault(require("../pagination"));

var _util = require("../core/util");

var _renderEmpty = _interopRequireDefault(require("../core/util/renderEmpty"));

var _dropdown = _interopRequireDefault(require("../dropdown"));

var _menu = _interopRequireDefault(require("../menu"));

var _radio = _interopRequireDefault(require("../radio"));

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _button = _interopRequireDefault(require("../button"));

var _tbody = _interopRequireDefault(require("./tbody"));

var _thead = _interopRequireDefault(require("./thead"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('table')();

function getLeafCount(column) {
  if (!column.children || !column.children.length) {
    return 1;
  }

  var leafCount = 0;
  column.children.forEach(function (item) {
    leafCount += getLeafCount(item);
  });
  return leafCount;
} // 深度遍历数据，并返回所有经过处理的数据


function dfsData(data, callback) {
  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
  level++;
  data.forEach(function (item) {
    item = typeof callback === 'function' ? callback(_objectSpread({}, item), level) : _objectSpread({}, item);
    item && result.push(item);
    dfsData(item && item.children || [], callback, result, level);
  });
  return result;
} // 广度优先遍历，返回一个具有层级关系的二维数组


function bfsData(data, callback) {
  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (!result[level]) {
    result[level] = [];
  }

  var stack = [];
  data.forEach(function (item) {
    item = typeof callback === 'function' ? callback(_objectSpread({}, item), level) : _objectSpread({}, item);
    item && result[level].push(item);

    if (item && item.children) {
      stack = stack.concat(item.children);
    }
  });

  if (stack.length) {
    level++;
    level = bfsData(stack, callback, result, level).level;
  }

  return {
    data: result,
    level: level
  };
}

var colgroupTemplate = "\n    <colgroup>\n        <col s-if=\"rowSelection\" style=\"width: 62px; min-width: 62px;\" />\n        <col s-for=\"column in tdColumns\" style=\"{{column.width ? 'width: ' + column.width + ';' : ''}}\"/>\n    </colgroup>\n";
var tableInnerTemplate = "\n    <div s-if=\"scroll.y\" class=\"".concat(prefixCls, "-header ").concat(prefixCls, "-hide-scrollbar\" s-ref=\"tableHead\" on-scroll=\"handleTableScroll\">\n        <table class=\"{{scroll.x ? '").concat(prefixCls, "-fixed' : ''}}\" style=\"width: {{scroll.x || '100%'}}\">\n            ").concat(colgroupTemplate, "\n            ").concat(_thead["default"].template, "\n        </table>\n    </div>\n    <div\n        class=\"").concat(prefixCls, "-body\"\n        style=\"{{getBodyStyle(scroll)}}\"\n        on-scroll=\"handleTableScroll\"\n        s-ref=\"tableBody\"\n    >\n        <table classs=\"{{scroll.x ? '").concat(prefixCls, "-fixed' : ''}}\" style=\"width: {{scroll.x}}\">\n            ").concat(colgroupTemplate, "\n            <template s-if=\"!scroll.y\">\n                ").concat(_thead["default"].template, "\n            </template>\n            ").concat(_tbody["default"].template, "\n        </table>\n        <div class=\"").concat(prefixCls, "-placeholder\" s-if=\"!renderData.length && !loading\">\n            <s-empty />\n        </div>\n    </div>\n    <div class=\"").concat(prefixCls, "-footer\" s-if=\"hasFooter\">\n        <slot name=\"footer\" s-if=\"!footer\" />\n        <template s-else>{{footer}}</template>\n    </div>\n");

var _default = _san["default"].defineComponent({
  dataTypes: {
    loading: _san.DataTypes.bool,
    scroll: _san.DataTypes.object,
    size: _san.DataTypes.string,
    title: _san.DataTypes.string,
    data: _san.DataTypes.array,
    pagination: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.object])
  },
  initData: function initData() {
    return {
      loading: false,
      scroll: {},
      size: 'default',
      data: [],
      pagination: {
        current: 1,
        pageSize: 10
      },
      selectedKeys: {},
      indentSize: 20,
      expandedKeys: [],
      selectedRows: [],
      selectedRowKeys: [],
      scrollPosition: 'left',
      defaultExpandAllRows: false,
      defaultExpandedRowKeys: [],
      expandRowByClick: false
    };
  },
  computed: {
    classes: function classes() {
      var scroll = this.data.get('scroll');
      var size = this.data.get('size');
      var bordered = this.data.get('bordered');
      var scrollPosition = this.data.get('scrollPosition');
      var classArr = [prefixCls];
      (scroll.x || scroll.y) && classArr.push("".concat(prefixCls, "-fixed-header"));
      bordered && classArr.push("".concat(prefixCls, "-bordered"));
      size && classArr.push("".concat(prefixCls, "-").concat(size));
      scrollPosition && classArr.push("".concat(prefixCls, "-scroll-position-").concat(scrollPosition));
      return classArr;
    }
  },
  inited: function inited() {
    var _this = this;

    this.rowSpanArr = {};
    var data = this.data.get('data').concat() || [];
    this.data.set('expandedRowKeys', this.data.get('expandedRowKeys') || this.data.get('defaultExpandedRowKeys'));
    this.data.set('originalData', data);
    this.initRenderData(data);
    this.processColumns();
    this.data.set('hasTitle', !!this.sourceSlots.named.title || this.data.get('title'));
    this.data.set('hasFooter', !!this.sourceSlots.named.footer || this.data.get('footer'));
    this.data.set('hasExpandedRowRender', !!this.sourceSlots.named.expandedRowRender);
    this.data.set('hasExpandIcon', !!this.sourceSlots.named.expandIcon);
    this.watch('columns', function (val) {
      _this.processColumns(val);

      _this.confirm();

      var sortColumn = _this.data.get('sortColumn');

      sortColumn && _this.runSorter(sortColumn);
    });
    this.watch('rowSelection', function (val) {
      var activeData = _this.getActiveRows(_this.data.get('renderData'));

      var selectedRowKeys = val.selectedRowKeys;

      _this.data.set('selectedRowKeys', selectedRowKeys);

      _this.data.set('selectedRows', activeData.filter(function (item) {
        return selectedRowKeys.includes(item.key);
      }));

      _this.initRenderData();
    });
    this.watch('data', function (val) {
      _this.data.set('originalData', val);

      _this.initRenderData(val);
    });
    this.watch('expandedRowKeys', function (val) {
      _this.initRenderData();
    });
  },
  components: {
    's-spin': _spin["default"],
    's-dropdown': _dropdown["default"],
    's-icon': _icon["default"],
    's-menu': _menu["default"],
    's-menu-item': _menu["default"].Item,
    's-radio': _radio["default"],
    's-button': _button["default"],
    's-checkbox': _checkbox["default"],
    's-pagination': _pagination["default"],
    's-empty': (0, _renderEmpty["default"])('Table')
  },
  // 针对columns中的各种配置项做处理
  processColumns: function processColumns() {
    var _this2 = this;

    var columns = this.data.get('columns');
    var sortColumn;
    var sortColumnIndex;
    var selectedKeys = this.data.get('selectedKeys');
    var thColumns = bfsData(columns, function (column) {
      var leafCount = getLeafCount(column);
      leafCount !== 1 && (column.colspan = leafCount);
      column.filterVisible = false;
      return column;
    }); // 设置th的rowspan

    var level = thColumns.level;
    var thColumnsData = thColumns.data.map(function (thColumn) {
      thColumn.map(function (column, index) {
        if (!column.children) {
          column.rowspan = level + 1;
        }

        var key = column.key || column.dataIndex; // 获取默认的sortColumn

        if (!sortColumn && (column.defaultSortOrder || column.sorter === true) || column.sortOrder) {
          column.sortOrder = column.sortOrder || column.defaultSortOrder;
          sortColumn = column;
          sortColumnIndex = index;
        } // 处理有filteredValue的情况，如果有，扔到selectedKeys里面


        if (column.filteredValue && Array.isArray(column.filteredValue)) {
          var selectedKey = selectedKeys[key] || [];

          _this2.data.set("selectedKeys.".concat(key), selectedKey.concat(column.filteredValue));
        } else if (column.filteredValue === null && selectedKeys[key]) {
          delete selectedKeys[key];

          _this2.data.set('selectedKeys', selectedKeys);
        }

        return column;
      });
      level--;
      return thColumn;
    }); // 深度遍历columns，把children打平供显示数据使用

    var tdColumns = dfsData(columns, function (item) {
      return item;
    }).filter(function (item) {
      return !item.children;
    });

    if (sortColumn) {
      this.data.set('sortColumn', sortColumn);
      this.data.set('sortColumnIndex', sortColumnIndex);
      this.runSorter(sortColumn, sortColumnIndex);
    }

    this.data.set('thColumns', thColumnsData);
    this.data.set('tdColumns', tdColumns);
  },
  initRenderData: function initRenderData(value) {
    var pagination = this.data.get('pagination');
    var data = value || this.data.get('filteredData');

    if (pagination !== false) {
      data = this.getPaginationData(data);
    }

    data = this.getFlattenData(data);

    if (value) {
      this.data.set('filteredData', data);
    }

    this.data.set('renderData', data);
    this.data.set('isTree', data.some(function (item) {
      return item.children;
    }));
  },
  // 获取当前分页的数据
  getPaginationData: function getPaginationData(data) {
    var pageSize = this.data.get('pagination.pageSize');
    var current = this.data.get('pagination.current');

    if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
      data = data.filter(function (item, i) {
        return i >= (current - 1) * pageSize && i < current * pageSize;
      });
    }

    return data;
  },
  // 获取当前column的rolspan和rowspan
  getColumns: function getColumns(columns, item, dataIndex) {
    var _this3 = this;

    var colSpanIndex = 0;
    var colSpan;
    var result = [];
    columns.forEach(function (column, i) {
      var render = column.render;

      var newColumn = _objectSpread({}, column);

      if (render && typeof render === 'function') {
        var itemAttrs = render(item[column.key || column.dataIndex], item, dataIndex);
        newColumn.children = itemAttrs.children || itemAttrs;
        newColumn.attrs = itemAttrs.attrs || {};
      } // 把rowspan的数据存起来，方便后面filter column，把不展示的值过滤出去


      if (newColumn.attrs && newColumn.attrs.rowSpan) {
        _this3.rowSpanArr[i] = {
          startIndex: dataIndex,
          rowSpan: newColumn.attrs && newColumn.attrs.rowSpan
        };
      }

      result.push(newColumn);
    });
    result = result.filter(function (column, index) {
      // 过滤rowspan对应的column,rowspan需要跨行过滤
      if (_this3.rowSpanArr[index]) {
        if (_this3.rowSpanArr[index].startIndex === dataIndex) {
          _this3.rowSpanArr[index].rowSpan = _this3.rowSpanArr[index].rowSpan - 1;
          return true;
        } else if (_this3.rowSpanArr[index].startIndex < dataIndex && _this3.rowSpanArr[index].rowSpan !== 0) {
          _this3.rowSpanArr[index].rowSpan = _this3.rowSpanArr[index].rowSpan - 1;
          return false;
        }
      } // 过滤colspan对应的column,colspan只需要对行前行进行过滤


      if (column.attrs && !!column.attrs.colSpan) {
        colSpan = column.attrs.colSpan;
        colSpanIndex++;
        return true;
      } else if (colSpanIndex < colSpan) {
        colSpanIndex++;
        return false;
      }

      return true;
    });
    return result;
  },
  // 获取th和td的样式
  getThClass: function getThClass(column) {
    var classArr = [];
    var filterIcon = column.scopedSlots && column.scopedSlots.filterIcon;
    var sorter = column.sorter,
        filters = column.filters,
        left = column.left,
        right = column.right;
    (filterIcon || sorter || filters) && classArr.push("".concat(prefixCls, "-column-has-actions"));
    (filterIcon || filters) && classArr.push("".concat(prefixCls, "-column-has-filters"));
    sorter && classArr.push("".concat(prefixCls, "-column-has-sorters"));
    left && classArr.push("".concat(prefixCls, "-left-sticky"));
    right && classArr.push("".concat(prefixCls, "-right-sticky"));
    column.className && classArr.push(column.className);
    return classArr;
  },
  getThStyle: function getThStyle(column) {
    var left = column.left,
        right = column.right;
    var width = column.width || '100%';

    if (left) {
      return "left: ".concat(left, "; min-width: ").concat(width);
    } else if (right) {
      return "right: ".concat(right, "; min-width: ").concat(width);
    }
  },
  getBodyStyle: function getBodyStyle(scroll) {
    if (!scroll) {
      return '';
    }

    var style = '';

    if (scroll.y) {
      style += "max-height: ".concat(scroll.y, "; overflow-y: scroll;");
    }

    if (scroll.x) {
      style += 'overflow-x: auto;';
    }

    return style;
  },
  // 设置filter中输入的值
  setSelectedKeys: function setSelectedKeys(keys, column) {
    var key = column.key || column.dataIndex;
    var selectedKeys = this.data.get('selectedKeys');

    if (keys && keys.length) {
      selectedKeys[key] = keys;
    } else {
      delete selectedKeys[key];
    }

    this.data.set('selectedKeys', selectedKeys, {
      force: true
    });
  },
  // 执行onFilter方法，渲染过滤后的数据
  confirm: function confirm() {
    var _this4 = this;

    var selectedKeys = this.data.get('selectedKeys');
    var thColumns = this.data.get('thColumns');
    var data = this.data.get('originalData');
    var filteredData = [];
    thColumns.forEach(function (thColumn, thIndex) {
      thColumn.forEach(function (column, index) {
        // 如果有onFilter，对数据进行过滤
        var key = column.key || column.dataIndex;

        if (column.onFilter && !(0, _isEmpty["default"])(selectedKeys) && selectedKeys[key]) {
          var filterValue = selectedKeys[key];

          if (!filteredData.length) {
            filterValue.forEach(function (value) {
              filteredData = filteredData.concat(data.filter(function (item) {
                return column.onFilter(value, item);
              }));
            });
          } else {
            var tmpFilteredData = [];
            filterValue.forEach(function (value) {
              tmpFilteredData = [].concat(_toConsumableArray(tmpFilteredData), _toConsumableArray(filteredData.filter(function (item) {
                return column.onFilter(value, item);
              })));
            });
            filteredData = tmpFilteredData;
          }
        }

        _this4.handleFilterVisibleChange(false, column, index, thIndex);
      });
    });
    data = (0, _isEmpty["default"])(selectedKeys) ? data : filteredData;
    this.data.set('filteredData', data);
    this.initRenderData();
    this.handleChange();
  },
  handleRowClick: function handleRowClick(record) {
    if (!this.data.get('expandRowByClick')) {
      return;
    }

    this.data.get('hasExpandedRowRender') && this.handleExpandRow(record);
    'collapsed' in record && this.handleTreeExpand(record);
  },
  // 执行复选框选中时候的操作
  handleSelections: function handleSelections(_ref) {
    var key = _ref.key,
        selectedKeys = _ref.selectedKeys;
    var rowSelection = this.data.get('rowSelection');
    var selections = rowSelection.selections || [];
    var selection = selections.filter(function (selection) {
      return selection.key === key;
    })[0];

    if (selection && selection.handleSelect) {
      var activeRows = this.getActiveRows(this.data.get('renderData'));
      selection.handleSelect(activeRows.map(function (item) {
        return item.key;
      }));
    }

    this.handleRowSelectionVisible(false);
  },
  // sticky的时候滚动数据时body和head的联动
  handleTableScroll: function handleTableScroll(e) {
    if (e.currentTarget === e.target) {
      var tableBody = this.ref('tableBody');
      var tableHead = this.ref('tableHead');
      var target = e.target;
      var scrollPosition;

      if (target === tableBody && tableHead) {
        tableHead.scrollLeft = target.scrollLeft;
      } else if (target === tableHead && tableBody) {
        tableBody.scrollLeft = target.scrollLeft;
      }

      if (tableBody.scrollWith === tableBody.clientWidth && tableBody.scrollWidth !== 0) {
        scrollPosition = '';
      } else if (tableBody.scrollLeft === 0) {
        scrollPosition = 'left';
      } else if (tableBody.scrollWidth === target.scrollLeft + tableBody.clientWidth) {
        scrollPosition = 'right';
      } else {
        scrollPosition = 'middle';
      }

      this.data.set('scrollPosition', scrollPosition);
    }
  },
  // on-change的回调方法
  handleChange: function handleChange() {
    var sortColumn = this.data.get('sortColumn');
    var sorter = sortColumn && {
      column: sortColumn,
      columnKey: sortColumn.key,
      field: sortColumn.key || sortColumn.dataIndex,
      order: sortColumn.sortOrder
    };
    this.fire('change', {
      pagination: this.data.get('pagination'),
      filters: this.data.get('selectedKeys'),
      sorter: sorter
    });
  },
  handleRowSelectionVisible: function handleRowSelectionVisible(visible) {
    this.data.set('rowSelection.visible', visible, {
      force: true
    });
  },
  handleFilterVisibleChange: function handleFilterVisibleChange(visible, column, index, thIndex) {
    this.data.set("thColumns.".concat(thIndex, ".").concat(index, ".filterVisible"), visible);
  },
  // 清除所有的filter
  clearFilter: function clearFilter(column) {
    this.setSelectedKeys([], column);
    this.confirm();
  },
  // 打平数据，用于data有children时候的展示
  getFlattenData: function getFlattenData(data) {
    if (!data) {
      return [];
    }

    var expandedRowKeys = this.data.get('expandedRowKeys');
    var defaultExpandAllRows = this.data.get('defaultExpandAllRows');
    var result = dfsData(data, function (item, level) {
      item.level = level;
      item.children && (item.collapsed = true);

      if (defaultExpandAllRows || expandedRowKeys.includes(item.key)) {
        item.expanded = true;
        item.children && (item.collapsed = false);
      }

      return item;
    });
    return result;
  },
  // 展开有children的数据
  handleTreeExpand: function handleTreeExpand(expandItem) {
    var data = this.data.get('renderData');
    var children = expandItem.children.map(function (item) {
      return item.key;
    });
    data = data.map(function (item) {
      if (expandItem.key === item.key) {
        item.collapsed = !item.collapsed;
      }

      if (children.includes(item.key)) {
        item.expanded = !item.expanded;
      }

      return _objectSpread({}, item);
    });
    this.data.set('renderData', data);
  },
  // 展开当前行
  handleExpandRow: function handleExpandRow(expandItem) {
    var data = this.data.get('renderData');
    data = data.map(function (item) {
      if (expandItem.key === item.key) {
        item.expanded = !item.expanded;
      }

      return _objectSpread({}, item);
    });
    this.data.set('renderData', data);
  },
  hasSorterIcon: function hasSorterIcon(column, name) {
    var sortDirections = column.sortDirections || [];

    if (!sortDirections.length) {
      return true;
    }

    return sortDirections.includes(name);
  },
  runSorter: function runSorter(column, sortColumn) {
    var filteredData = this.data.get('filteredData');
    var data = column.sortOrder ? this.recursiveSort(filteredData, this.getSorterFn(column)) : filteredData;
    this.data.set('renderData', data);
  },
  // 点击排序时候的处理
  handleSorter: function handleSorter(column, columnIndex, thIndex) {
    var sortColumn = this.data.get('sortColumn');
    var sortColumnIndex = this.data.get('sortColumnIndex');
    var sortDirections = column.sortDirections || ['ascend', 'descend'];
    var sortIndex = sortDirections.indexOf(column.sortOrder); // 如果当前点击的是之前已经排序的组件

    if (column === sortColumn) {
      column.sortOrder = sortDirections[sortIndex + 1];
      this.data.set('sortColumn', column);
      this.data.set("thColumns.".concat(thIndex, ".").concat(columnIndex), column, {
        force: true
      });
    } else {
      column.sortOrder = sortDirections[sortIndex + 1];
      sortColumn && (sortColumn.sortOrder = undefined);
      this.data.set("thColumns.".concat(thIndex, ".").concat(sortColumnIndex), sortColumn, {
        force: true
      });
      this.data.set("thColumns.".concat(thIndex, ".").concat(columnIndex), column, {
        force: true
      });
      this.data.set('sortColumn', column);
      this.data.set('sortColumnIndex', columnIndex);
    }

    this.runSorter(column);
    this.handleChange();
  },
  getSorterFn: function getSorterFn(column) {
    if (!column || !column.sortOrder || typeof column.sorter !== 'function') {
      return;
    }

    return function (a, b) {
      var result = column.sorter(a, b, column.sortOrder);

      if (result !== 0) {
        return column.sortOrder === 'descend' ? -result : result;
      }

      return 0;
    };
  },
  recursiveSort: function recursiveSort(data, sorterFn) {
    var _this5 = this;

    var childrenColumnName = this.data.get('childrenColumnName') || 'children';
    return data.sort(sorterFn).map(function (item) {
      return item[childrenColumnName] ? _objectSpread({}, item, _defineProperty({}, childrenColumnName, _this5.recursiveSort(item[childrenColumnName], sorterFn))) : item;
    });
  },
  getFilterChecked: function getFilterChecked() {
    var selectedKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var value = arguments.length > 1 ? arguments[1] : undefined;
    return selectedKeys.indexOf(value.toString()) > -1;
  },
  getCheckboxProps: function getCheckboxProps(item, name) {
    var rowSelection = this.data.get('rowSelection');

    if (rowSelection && typeof rowSelection.getCheckboxProps === 'function') {
      return rowSelection.getCheckboxProps(item)[name];
    }
  },
  getActiveRows: function getActiveRows(data) {
    var _this6 = this;

    // 过滤出不是disabled状态的row
    return data.filter(function (item) {
      return !_this6.getCheckboxProps(item, 'disabled');
    });
  },
  getAllChecked: function getAllChecked(data, selectedRowKeys) {
    var activeRows = this.getActiveRows(data);

    if (!activeRows.length) {
      return false;
    }

    return activeRows.every(function (item) {
      return selectedRowKeys.includes(item.key);
    });
  },
  getAllDisabled: function getAllDisabled(data, selectedRowKeys) {
    var activeRows = this.getActiveRows(data);
    return !activeRows.length;
  },
  handleSelectionChange: function handleSelectionChange(selectedRowKeys, selectedRows) {
    var rowSelection = this.data.get('rowSelection');
    rowSelection.handleChange && rowSelection.handleChange(selectedRowKeys, selectedRows);
  },
  getItemChecked: function getItemChecked(item, selectedRowKeys) {
    return selectedRowKeys.includes(item.key);
  },
  getIndeterminate: function getIndeterminate(selectedRowKeys, data) {
    return !this.getAllChecked(data, selectedRowKeys) && data.some(function (item) {
      return selectedRowKeys.includes(item.key);
    });
  },
  // selection全选时候的操作
  handleSelectionAll: function handleSelectionAll(e) {
    var checked = e.target.checked;
    var handleSelectAll = this.data.get('rowSelection.handleSelectAll');
    var activeRows = this.getActiveRows(this.data.get('renderData'));
    var selectedRows = checked ? activeRows : [];
    var selectedRowKeys = selectedRows.map(function (item) {
      return item.key;
    });
    this.data.set('selectedRowKeys', selectedRowKeys, {
      force: true
    });
    this.data.set('selectedRows', selectedRows);

    if (typeof handleSelectAll === 'function') {
      handleSelectAll(selectedRows, checked);
    }

    this.handleSelectionChange(selectedRowKeys, selectedRows);
  },
  // 复选框单选时候的操作
  handleSelection: function handleSelection(e, item) {
    var selectedRows = this.data.get('selectedRows');
    var selectedRowKeys = this.data.get('selectedRowKeys');
    var handleSelect = this.data.get('rowSelection.handleSelect');
    var index = selectedRowKeys.indexOf(item.key);
    var checked = e.target.checked;

    if (checked && index === -1) {
      selectedRowKeys.push(item.key);
      selectedRows.push(item);
    } else if (!checked && index > -1) {
      selectedRowKeys.splice(index, 1);
      selectedRows.splice(index, 1);
    }

    if (typeof handleSelect === 'function') {
      handleSelect(item, checked, selectedRows, e);
    }

    this.handleSelectionChange(selectedRowKeys, selectedRows);
    this.data.set('selectedRowKeys', selectedRowKeys, {
      force: true
    });
    this.data.set('selectedRows', selectedRows);
  },
  // 点击分页时候的操作
  handlePaginationChange: function handlePaginationChange(payload) {
    this.data.set('pagination.current', payload.page);
    this.initRenderData();
    this.handleChange();
  },
  template: "<div>\n        <s-spin spinning=\"{{loading}}\" delay=\"{{loadingDelay}}\">\n            <template slot=\"content\">\n                <div class=\"{{classes}}\">\n                <div class=\"".concat(prefixCls, "-title\" s-if=\"hasTitle\">\n                    <slot name=\"title\" s-if=\"!title\" />\n                    <template s-else>{{title}}</template>\n                </div>\n                <div class=\"").concat(prefixCls, "-content\">\n                    <div class=\"").concat(prefixCls, "-scroll\" s-if=\"scroll.x || scroll.y\">\n                        ").concat(tableInnerTemplate, "\n                    </div>\n                    <template s-else>").concat(tableInnerTemplate, "</template>\n                </div>\n                </div>\n                <s-pagination\n                    s-if=\"pagination !== false\"\n                    class=\"").concat(prefixCls, "-pagination\"\n                    current=\"{{pagination.current}}\"\n                    pageSize=\"{{pagination.pageSize}}\"\n                    total=\"{{pagination.total || filteredData.length}}\"\n                    on-change=\"handlePaginationChange\"\n                />\n            </template>\n        </s-spin>\n    </div> ")
});

exports["default"] = _default;