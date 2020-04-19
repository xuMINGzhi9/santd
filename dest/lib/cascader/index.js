"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _cascader = _interopRequireDefault(require("./src/cascader"));

var _input = _interopRequireDefault(require("../input"));

var _icon = _interopRequireDefault(require("../icon"));

var _arraytreefilter = _interopRequireDefault(require("./src/arraytreefilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('cascader')();
var inputPrefixCls = (0, _util.classCreator)('input')();

function getFilledFieldNames() {
  var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var names = {
    children: fieldNames.children || 'children',
    label: fieldNames.label || 'label',
    value: fieldNames.value || 'value'
  };
  return names;
}

function flattenTree() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var props = arguments.length > 1 ? arguments[1] : undefined;
  var ancestor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var names = getFilledFieldNames(props.fieldNames);
  var flattenOptions = [];
  var childrenName = names.children;
  options.forEach(function (option) {
    var path = ancestor.concat(option);

    if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
      flattenOptions.push(path);
    }

    if (option[childrenName]) {
      flattenOptions = flattenOptions.concat(flattenTree(option[childrenName], props, path));
    }
  });
  return flattenOptions;
}

var defaultLimit = 50;

function highlightKeyword(str, keyword, prefixCls) {
  return str.split(keyword).map(function (node, index) {
    return index === 0 ? node : "<span class=\"".concat(prefixCls, "-menu-item-keyword\" key=\"seperator\">").concat(keyword, "</span>").concat(node);
  });
}

function defaultFilterOption(inputValue, path, names) {
  return path.some(function (option) {
    return option[names.label].indexOf(inputValue) > -1;
  });
}

function defaultRenderFilteredOption(inputValue, path, prefixCls, names) {
  return path.map(function (option, index) {
    var label = option[names.label];
    var node = label.indexOf(inputValue) > -1 ? highlightKeyword(label, inputValue, prefixCls).join('') : label;
    return index === 0 ? node : ' / ' + node;
  });
}

function defaultSortFilteredOption(a, b, inputValue, names) {
  function callback(elem) {
    return elem[names.label].indexOf(inputValue) > -1;
  }

  return a.findIndex(callback) - b.findIndex(callback);
}

function renderEmpty() {
  return '<div style="text-align: center;">没有内容</div>';
}

var _default = _san["default"].defineComponent({
  components: {
    's-cascader': _cascader["default"],
    's-input': _input["default"],
    's-icon': _icon["default"]
  },
  initData: function initData() {
    return {
      prefixCls: prefixCls,
      allowClear: true,
      disabled: false,
      options: [],
      size: 'default',
      popupPlacement: 'bottomLeft',
      transitionName: 'slide-up',
      dropdownMenuColumnStyle: {}
    };
  },
  computed: {
    pickerClass: function pickerClass() {
      var inputValue = this.data.get('inputValue');
      var disabled = this.data.get('disabled');
      var size = this.data.get('size');
      var showSearch = this.data.get('showSearch');
      var inputFocused = this.data.get('inputFocused');
      var classArr = ["".concat(prefixCls, "-picker")];
      inputValue && classArr.push("".concat(prefixCls, "-picker-with-value"));
      disabled && classArr.push("".concat(prefixCls, "-picker-disabled"));
      size && classArr.push("".concat(prefixCls, "-picker-").concat(size));
      showSearch && classArr.push("".concat(prefixCls, "-picker-show-search"));
      inputFocused && classArr.push("".concat(prefixCls, "-picker-focused"));
      return classArr;
    },
    filteredOptions: function filteredOptions() {
      var _ref2;

      var showSearch = this.data.get('showSearch') || {};
      var notFoundContent = this.data.get('notFoundContent');
      var names = getFilledFieldNames(this.data.get('fieldNames'));
      var _showSearch$filter = showSearch.filter,
          filter = _showSearch$filter === void 0 ? defaultFilterOption : _showSearch$filter,
          _showSearch$render = showSearch.render,
          render = _showSearch$render === void 0 ? defaultRenderFilteredOption : _showSearch$render,
          _showSearch$sort = showSearch.sort,
          sort = _showSearch$sort === void 0 ? defaultSortFilteredOption : _showSearch$sort,
          _showSearch$limit = showSearch.limit,
          limit = _showSearch$limit === void 0 ? defaultLimit : _showSearch$limit;
      var flattenOptions = this.data.get('flattenOptions') || [];
      var inputValue = this.data.get('inputValue'); // Limit the filter if needed

      var filtered;

      if (limit > 0) {
        filtered = [];
        var matchCount = 0; // Perf optimization to filter items only below the limit

        flattenOptions.some(function (path) {
          var match = filter(inputValue, path, names);

          if (match) {
            filtered.push(path);
            matchCount += 1;
          }

          return matchCount >= limit;
        });
      } else {
        filtered = flattenOptions.filter(function (path) {
          return filter(inputValue, path, names);
        });
      }

      filtered.sort(function (a, b) {
        return sort(a, b, inputValue, names);
      });

      if (filtered.length > 0) {
        return filtered.map(function (path) {
          var _ref;

          return _ref = {
            __IS_FILTERED_OPTION: true,
            path: path
          }, _defineProperty(_ref, names.label, render(inputValue, path, prefixCls, names).join('')), _defineProperty(_ref, names.value, path.map(function (o) {
            return o[names.value];
          })), _defineProperty(_ref, "disabled", path.some(function (o) {
            return !!o.disabled;
          })), _ref;
        });
      }

      return [(_ref2 = {}, _defineProperty(_ref2, names.label, notFoundContent || renderEmpty('Cascader')), _defineProperty(_ref2, names.value, 'SAN_CASCADER_NOT_FOUND'), _defineProperty(_ref2, "disabled", true), _ref2)];
    },
    selectedOptions: function selectedOptions() {
      var options = this.data.get('options');
      var names = getFilledFieldNames(this.data.get('fieldNames') || {});
      var value = this.data.get('value') || [];
      var unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
      return (0, _arraytreefilter["default"])(options, function (o, level) {
        return o[names.value] === unwrappedValue[level];
      }, {
        childrenKeyName: names.children
      });
    },
    label: function label() {
      var selectedOptions = this.data.get('selectedOptions');
      var names = getFilledFieldNames(this.data.get('fieldNames') || {});
      return selectedOptions.map(function (o) {
        return o[names.label];
      });
    }
  },
  inited: function inited() {
    var _this = this;

    var value = this.data.get('value');
    var defaultValue = this.data.get('defaultValue');
    this.data.set('value', value || defaultValue || []);
    var loadData = this.data.get('loadData');
    loadData && this.data.set('loadData', loadData.bind(this.parentComponent));
    var showSearch = this.data.get('showSearch');
    var options = this.data.get('options');
    showSearch && this.data.set('flattenOptions', flattenTree(options, this.data.get()));
    this.data.set('hasSlot', this.sourceSlots.noname && this.sourceSlots.noname.filter(function (item) {
      return !item.textExpr;
    }).length);
    this.data.set('hasDisplayRender', !!this.sourceSlots.named.displayRender);
    this.watch('inputValue', function (val) {
      var showSearch = _this.data.get('showSearch');

      _this.data.set('dropdownMenuColumnStyle.width', val && showSearch && showSearch.mathInputWidth === true ? _this.ref('input').el.offsetWidth : 'auto');
    });
  },
  defaultDisplayRender: function defaultDisplayRender(label) {
    return label.join(' / ');
  },
  handleChange: function handleChange(_ref3) {
    var value = _ref3.value,
        selectedOptions = _ref3.selectedOptions;
    this.data.set('inputValue', '');

    if (selectedOptions[0].__IS_FILTERED_OPTION) {
      var unwrappedValue = value[0];
      var unwrappedSelectedOptions = selectedOptions[0].path;
      this.setValue(unwrappedValue, unwrappedSelectedOptions);
      return;
    }

    this.setValue(value, selectedOptions);
  },
  handlePopupVisibleChange: function handlePopupVisibleChange(visible) {
    this.data.set('popupVisible', visible);
    this.data.set('inputFocused', visible);
    this.data.set('inputValue', visible ? this.data.get('inputValue') : '');
    this.fire('popupVisibleChange', visible);
  },
  setValue: function setValue(value) {
    var selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    this.data.set('value', value);
    this.fire('change', {
      value: value,
      selectedOptions: selectedOptions
    });
  },
  handleClearSelection: function handleClearSelection(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.data.get('inputValue')) {
      this.setValue([]);
      this.handlePopupVisibleChange(false);
    } else {
      this.data.set('inputValue', '');
    }
  },
  handleInputChange: function handleInputChange(value) {
    this.data.set('inputValue', value);
  },
  handleInputClick: function handleInputClick(e) {
    var _this$data$get = this.data.get(),
        inputFocused = _this$data$get.inputFocused,
        popupVisible = _this$data$get.popupVisible; // Prevent `Trigger` behaviour.


    if (inputFocused || popupVisible) {
      e.stopPropagation();

      if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
      }
    }
  },
  handleInputBlur: function handleInputBlur() {
    this.data.set('inputFocused', false);
  },
  blur: function blur() {
    this.ref('input').blur();
  },
  focus: function focus() {
    this.ref('input').focus();
  },
  template: "<div>\n        <s-cascader\n            rootPrefixCls=\"{{prefixCls}}\"\n            getPopupContainer=\"{{getPopupContainer}}\"\n            options=\"{{inputValue ? filteredOptions : options}}\"\n            value=\"{{value}}\"\n            visible=\"{{popupVisible}}\"\n            on-visibleChange=\"handlePopupVisibleChange\"\n            on-change=\"handleChange\"\n            dropdownMenuColumnStyle=\"{{dropdownMenuColumnStyle}}\"\n            expandTrigger=\"{{expandTrigger}}\"\n            expandIcon=\"{{expandIcon}}\"\n            loadingIcon=\"{{loadingIcon}}\"\n            changeOnSelect=\"{{changeOnSelect}}\"\n            loadData=\"{{loadData}}\"\n            fieldNames=\"{{fieldNames}}\"\n            transitionName=\"{{transitionName}}\"\n        >\n            <slot s-if=\"hasSlot\" />\n            <span class=\"{{pickerClass}}\" style=\"{{pickerStyle}}\" s-else>\n                <span class=\"{{prefixCls}}-picker-label\">\n                    <slot\n                        s-if=\"hasDisplayRender\"\n                        name=\"displayRender\"\n                        var-label=\"{{label}}\"\n                        var-selectedOptions=\"{{selectedOptions}}\"\n                    />\n                    <template s-else>{{defaultDisplayRender(label)}}</template>\n                </span>\n                <s-input\n                    tabIndex=\"-1\"\n                    inputClasses=\"{{prefixCls}}-input ".concat(inputPrefixCls, "-{{size}}\"\n                    value=\"{{inputValue}}\"\n                    disabled=\"{{disabled}}\"\n                    readOnly=\"{{!showSearch}}\"\n                    autoComplete=\"off\"\n                    autoFocus=\"{{autoFocus}}\"\n                    placeholder=\"{{value && value.length ? '' : placeholder}}\"\n                    on-change=\"handleInputChange\"\n                    on-click=\"handleInputClick\"\n                    on-blur=\"handleInputBlur\"\n                    s-ref=\"input\"\n                />\n                <s-icon\n                    s-if=\"allowClear && !disabled && value.length > 0 || inputValue\"\n                    type=\"close-circle\"\n                    theme=\"filled\"\n                    class=\"{{prefixCls}}-picker-clear\"\n                    on-click=\"handleClearSelection\"\n                />\n                <s-icon\n                    type=\"{{suffixIcon ? suffixIcon : 'down'}}\"\n                    class=\"").concat(prefixCls, "-picker-arrow {{popupVisible ? '").concat(prefixCls, "-picker-arrow-expand' : ''}}\"\n                />\n            </span>\n        </s-cascader>\n    </div>")
});

exports["default"] = _default;