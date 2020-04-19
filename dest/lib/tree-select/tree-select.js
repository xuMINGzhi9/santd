"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

var _tree = _interopRequireDefault(require("../tree"));

var _input = _interopRequireDefault(require("../input"));

var _singleSelector = _interopRequireDefault(require("./single-selector"));

var _multipleSelector = _interopRequireDefault(require("./multiple-selector"));

var _dropdown = _interopRequireDefault(require("../dropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('select')();

var getParentKey = function getParentKey(key, tree) {
  var parentKey;

  for (var i = 0; i < tree.length; i++) {
    var node = tree[i];

    if (node.children) {
      if (node.children.some(function (item) {
        return item.key === key;
      })) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }

  return parentKey;
};
/*const getDefaultFilterOption = optionFilterProp => (searchValue, dataNode) => {
    const value = dataNode[optionFilterProp || 'value'];

    return String(value)
        .toLowerCase()
        .includes(String(searchValue).toLowerCase());
};

const filterData = (searchValue, treeData, {filterOption, optionFilterProp}) => {
    if (filterOption === false) {
        return treeData;
    }

    let filterOptionFunc;

    if (typeof filterOption === 'function') {
        filterOptionFunc = filterOption;
    }
    else {
        filterOptionFunc = getDefaultFilterOption(optionFilterProp);
    }
    function loop(list, keepAll = false) {
        return list.map(data => {
            const children = data.children;
            const match = keepAll || filterOptionFunc(searchValue, data);
            const childList = loop(children || [], match);

            if (match || childList.length) {
                return {
                    ...data,
                    children: childList
                };
            }
            return null;
        }).filter(node => {
            return node;
        });
    }

    return loop(treeData.concat());
};*/


var sizeMap = {
  small: 'sm',
  large: 'lg'
};

var _default = _san["default"].defineComponent({
  dataTypes: {
    allowClear: _san.DataTypes.bool,
    treeData: _san.DataTypes.array,
    autoClearSearchValue: _san.DataTypes.bool,
    defaultValue: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.array]),
    disabled: _san.DataTypes.bool,
    dropdownClassName: _san.DataTypes.string,
    dropdownMatchSelectWidth: _san.DataTypes.bool,
    dropdownStyle: _san.DataTypes.object,
    filterTreeNode: _san.DataTypes.func,
    labelInValue: _san.DataTypes.bool,
    maxTagCount: _san.DataTypes.number,
    maxTagPlaceholder: _san.DataTypes.any,
    multiple: _san.DataTypes.bool,
    placeholder: _san.DataTypes.string,
    searchPlaceholder: _san.DataTypes.string,
    searchValue: _san.DataTypes.string,
    treeIcon: _san.DataTypes.bool,
    showSearch: _san.DataTypes.bool,
    size: _san.DataTypes.oneOf(['default', 'small', 'large']),
    showCheckedStrategy: _san.DataTypes.string,
    treeCheckable: _san.DataTypes.bool,
    treeCheckStrictly: _san.DataTypes.bool,
    treeDefaultExpandAll: _san.DataTypes.bool,
    treeDefaultExpandedKeys: _san.DataTypes.array,
    treeExpandedKeys: _san.DataTypes.array,
    value: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.array])
  },
  components: {
    's-icon': _icon["default"],
    's-tree': _tree["default"],
    's-tree-node': _tree["default"].TreeNode,
    's-single-selector': _singleSelector["default"],
    's-multiple-selector': _multipleSelector["default"],
    's-dropdown': _dropdown["default"],
    's-input-search': _input["default"].Search
  },
  initData: function initData() {
    return {
      multiple: false,
      showSearch: false,
      modeConfig: {
        single: true
      },
      allowClear: false,
      selectedKeys: [],
      checkedKeys: {
        checked: [],
        halfChecked: []
      },
      expandedKeys: [],
      selectedValue: [],
      dropdownMatchSelectWidth: true,
      showCheckedStrategy: 'SHOW_CHILD'
    };
  },
  inited: function inited() {
    var value = this.data.get('value') || this.data.get('defaultValue') || [];
    value = typeof value === 'string' ? [value] : value;
    this.data.set('value', value);
  },
  computed: {
    wrapClass: function wrapClass() {
      var data = this.data;
      var allowClear = data.get('allowClear');
      var disabled = data.get('disabled');
      var loading = data.get('loading');
      var modeConfig = data.get('modeConfig');
      var visible = data.get('visible');
      var focused = data.get('_focused');
      var showArrow = data.get('showArrow');
      var size = sizeMap[this.data.get('size')] || '';
      return [prefixCls, "".concat(prefixCls, "-").concat(disabled ? 'disabled' : 'enabled'), allowClear && "".concat(prefixCls, "-allow-clear"), modeConfig.combobox && "".concat(prefixCls, "-combobox"), loading && "".concat(prefixCls, "-loading"), visible && "".concat(prefixCls, "-open"), size && "".concat(prefixCls, "-").concat(size), showArrow !== undefined && "".concat(prefixCls, "-").concat(showArrow ? 'show' : 'no', "-arrow"), (visible || focused) && "".concat(prefixCls, "-focused")].filter(function (name) {
        return name;
      });
    }
  },
  getRootDomNode: function getRootDomNode() {
    return this.el;
  },
  getData: function getData() {
    var _this = this;

    var treeNodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var dataList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var treeData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    treeNodes.forEach(function (node, index) {
      var _node$data$get = node.data.get(),
          key = _node$data$get.key,
          title = _node$data$get.title,
          value = _node$data$get.value;

      var params = {
        key: key,
        title: title,
        label: title,
        value: value,
        node: node
      };
      dataList.push(params);
      treeData[index] = params;
      treeData[index].children = [];

      if (node.treeNodes) {
        _this.getData(node.treeNodes, dataList, treeData[index].children);
      }
    });
    return {
      dataList: dataList,
      treeData: treeData
    };
  },
  getRenderData: function getRenderData(data, multiple) {
    var _this2 = this;

    var value = [];

    if (data && data.length) {
      data.forEach(function (item, index) {
        value.push(_objectSpread({}, item));

        if (!item.title && item.node.sourceSlots.named.title) {
          _this2.sourceSlots.named["title_".concat(index)] = item.node.sourceSlots.named.title;
        }
      });
    }

    return value;
  },
  repaint: function repaint(multiple) {
    var _this3 = this;

    this.nextTick(function () {
      !multiple ? _this3.ref('singleSelector')._repaintChildren() : '';

      _this3.ref('dropdown').refresh();
    });
    !multiple ? this.handleVisibleChange(false) : null;
  },
  handleInputChange: function handleInputChange(value) {
    // todo
    return;
  },
  handleTreeCheck: function handleTreeCheck(_ref, inited) {
    var checkedKeys = _ref.checkedKeys,
        _ref$info = _ref.info,
        info = _ref$info === void 0 ? {} : _ref$info;
    var checkedData = this.getIncludeData(checkedKeys);
    var filteredData = [];
    var removedKeys = [];
    var showCheckedStrategy = this.data.get('showCheckedStrategy');

    while (checkedData.length) {
      var data = checkedData.shift();
      var node = data.node;
      var key = data.key;

      if (node.treeNodes.length) {
        var allChecked = node.treeNodes.every(function (item) {
          return checkedKeys.includes(item.data.get('key'));
        });

        if (allChecked) {
          if (showCheckedStrategy === 'SHOW_CHILD') {
            removedKeys.push(data.key);
          } else if (showCheckedStrategy === 'SHOW_PARENT') {
            removedKeys = removedKeys.concat(node.treeNodes.map(function (item) {
              return item.data.get('key');
            }));
          }
        }
      }

      if (!removedKeys.includes(key)) {
        filteredData.push(data);
      }
    }

    var selectedValue = this.getRenderData(filteredData);
    this.data.set('selectedValue', selectedValue);
    this.data.set('selectedKeys', []);
    this.data.set('checkedKeys', filteredData.map(function (item) {
      return item.key;
    }));
    !inited && this.repaint(true);

    if (info.checked) {
      this.fire('select', {
        info: info
      });
    }

    !inited && this.fire('change', {
      value: selectedValue.map(function (data) {
        return data.key;
      }),
      node: info.node,
      info: info
    });
  },
  handleTreeSelect: function handleTreeSelect(_ref2) {
    var selectedKeys = _ref2.selectedKeys,
        info = _ref2.info;
    var treeCheckable = this.data.get('treeCheckable');
    var multiple = this.data.get('multiple') || treeCheckable;

    if (treeCheckable) {
      info.node.ref('checkbox').el.click();
      return;
    }

    var selectedData = this.getIncludeData(selectedKeys);
    var selectedValue = this.getRenderData(selectedData);
    this.data.set('selectedValue', selectedValue);
    this.data.set('selectedKeys', selectedValue.map(function (item) {
      return item.key;
    }));
    this.repaint(multiple);

    if (info.selected) {
      this.fire('select', {
        info: info
      });
    }

    this.fire('change', {
      value: selectedKeys,
      node: info.node,
      info: info
    });
  },
  handleTreeExpand: function handleTreeExpand(_ref3) {
    var expandedKeys = _ref3.expandedKeys,
        info = _ref3.info;
    this.fire('expand', expandedKeys);
  },
  handleVisibleChange: function handleVisibleChange(visible) {
    this.data.set('visible', visible);
  },
  handleClearSelection: function handleClearSelection(e) {
    e.stopPropagation();
    this.data.set('selectedValue', []);
    this.data.set('checkedKeys.checked', []);
    this.data.set('selectedKeys', []);
    this.handleVisibleChange(false);
  },
  handleTreeDataLoad: function handleTreeDataLoad() {
    var _this4 = this;

    this.nextTick(function () {
      var data = _this4.getData(_this4.ref('tree').treeNodes);

      _this4.dataList = data.dataList;
      _this4.treeData = data.treeData;
    });
  },
  handleRemoveValue: function handleRemoveValue(index) {
    var treeCheckable = this.data.get('treeCheckable');
    this.data.removeAt(treeCheckable ? 'checkedKeys.checked' : 'selectedKeys', index, {
      force: true
    });
    this.data.removeAt('selectedValue', index);
  },
  getIncludeData: function getIncludeData() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return this.dataList.filter(function (item) {
      return data.includes(item.key);
    });
  },
  attached: function attached() {
    var _this5 = this;

    this.data.set('popupVisible', null);
    this.nextTick(function () {
      _this5.data.set('checkedKeys', _this5.data.get('value'));

      var data = _this5.getData(_this5.ref('tree').treeNodes);

      _this5.dataList = data.dataList;
      _this5.treeData = data.treeData;

      _this5.handleTreeCheck({
        checkedKeys: _this5.data.get('value')
      }, true);
    });
  },
  template: "<div class=\"{{wrapClass}}\">\n        <s-dropdown\n            prefixCls=\"".concat(prefixCls, "-dropdown\"\n            overlayClassName=\"").concat(prefixCls, "-tree-dropdown {{dropdownClassName}}\"\n            trigger=\"click\"\n            stretch=\"minWidth\"\n            rootDomNode=\"{{getRootDomNode()}}\"\n            overlayStyle=\"{{dropdownStyle}}\"\n            dropdownClassName=\"").concat(prefixCls, "-selection ").concat(prefixCls, "-selection--{{multiple || treeCheckable ? 'multiple' : 'single'}}\"\n            visible=\"{{visible}}\"\n            popupVisible=\"{{popupVisible}}\"\n            stretch=\"{{dropdownMatchSelectWidth ? 'minWidth' : undefined}}\"\n            getPopupContainer=\"{{getPopupContainer}}\"\n            on-visibleChange=\"handleVisibleChange\"\n            s-ref=\"dropdown\"\n        >\n            <div class=\"").concat(prefixCls, "-selection__rendered\">\n                <div\n                    s-if=\"placeholder\"\n                    class=\"").concat(prefixCls, "-selection__placeholder ").concat(prefixCls, "-unselectable\"\n                    style=\"display: {{selectedValue.length ? 'none' : 'block'}};\"\n                    unselectable=\"on\"\n                >\n                    {{placeholder}}\n                </div>\n                <s-single-selector\n                    s-if=\"!(multiple || treeCheckable) && selectedValue.length\"\n                    value=\"{{selectedValue}}\"\n                    s-ref=\"singleSelector\"\n                >\n                    <slot name=\"title_{{index}}\" s-for=\"title, index in selectedValue\"/>\n                </s-single-selector>\n                <s-multiple-selector\n                    s-if=\"(multiple || treeCheckable) && selectedValue.length\"\n                    value=\"{{selectedValue}}\"\n                    maxTagCount=\"{{maxTagCount}}\"\n                    maxTagPlaceholder=\"{{maxTagPlaceholder}}\"\n                    s-ref=\"multipleSelector\"\n                    on-removeValue=\"handleRemoveValue\"\n                >\n                    <slot name=\"title_{{index}}\" s-for=\"title, index in selectedValue\" />\n                </s-multiple-selector>\n            </div>\n            <span\n                s-if=\"allowClear && selectedValue.length\"\n                class=\"").concat(prefixCls, "-selection__clear ").concat(prefixCls, "-unselectable\"\n                unselectable=\"on\"\n                on-click=\"handleClearSelection\"\n            >\n                <slot name=\"clearIcon\">\n                    <s-icon type=\"close-circle\" theme=\"filled\" class=\"").concat(prefixCls, "-clear-icon\"/>\n                </slot>\n            </span>\n            <span\n                s-if=\"{{!(multiple || treeCheckable)}}\"\n                class=\"").concat(prefixCls, "-arrow ").concat(prefixCls, "-unselectable\"\n                unselectable=\"on\"\n            >\n                <slot name=\"suffixIcon\">\n                    <s-icon s-if=\"loading\" type=\"loading\"/>\n                    <s-icon s-else type=\"down\" class=\"").concat(prefixCls, "-arrow-icon\"/>\n                </slot>\n            </span>\n            <template slot=\"overlay\">\n                <s-input-search\n                    s-if=\"showSearch\"\n                    on-change=\"handleInputChange\"\n                    placeholder=\"input search\"\n                    class=\"").concat(prefixCls, "-dropdown-search\"\n                />\n                <s-tree\n                    slot=\"overlay\"\n                    defaultExpandAll=\"{{treeDefaultExpandAll}}\"\n                    defaultExpandedKeys=\"{{treeDefaultexpandedKeys}}\"\n                    expandedKeys=\"{{treeExpandedKeys}}\"\n                    disabled=\"{{disabled}}\"\n                    showSearch=\"{{showSearch}}\"\n                    expandedKeys=\"{{expandedKeys}}\"\n                    selectedKeys=\"{{selectedKeys}}\"\n                    checkedKeys=\"{{checkedKeys}}\"\n                    blockNode=\"{{true}}\"\n                    treeData=\"{{treeData}}\"\n                    loadData=\"{{loadData}}\"\n                    multiple=\"{{multiple || treeCheckable}}\"\n                    checkable=\"{{treeCheckable}}\"\n                    on-select=\"handleTreeSelect\"\n                    on-load=\"handleTreeDataLoad\"\n                    on-check=\"handleTreeCheck\"\n                    on-expand=\"handleTreeExpand\"\n                    s-ref=\"tree\"\n                >\n                    <slot />\n                </s-tree>\n            </template>\n        </s-dropdown>\n    </div>")
});

exports["default"] = _default;