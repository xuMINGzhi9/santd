"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _icon = _interopRequireDefault(require("../icon"));

var _menu = _interopRequireDefault(require("../menu"));

var _util = require("./util");

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var formatOptionInfo = function formatOptionInfo(option, optionsInfo) {
  var value = option.data.get('value');
  var info = optionsInfo[(0, _util.getMapKey)(value)];
  return {
    content: option.el.innerHTML.trim(),
    title: (0, _util.toTitle)(info.title),
    value: value,
    disabled: info.disabled
  };
};

var filterOption = function filterOption(input, child, context) {
  var defaultFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _util.defaultFilterFn;
  var backfillValue = context.backfillValue,
      value = context.value;
  var lastValue = value[value.length - 1];

  if (!input || lastValue && lastValue === backfillValue) {
    return true;
  }

  var filterFn = context.filterOption;

  if ('filterOption' in context) {
    if (filterFn === true) {
      filterFn = defaultFilter;
    }
  } else {
    filterFn = defaultFilter;
  }

  if (!filterFn) {
    return true;
  } else if (typeof filterFn === 'function') {
    return filterFn(input, child, context.optionFilterProp);
  } else if (child.data.get('disabled')) {
    return false;
  }

  return true;
};

var _default = _san["default"].defineComponent({
  template: "\n        <div id=\"{{context.ariaId}}\"\n            style=\"overflow: auto; transform: translateZ(0);\"\n            on-mousedown=\"preventDefaultEvent\"\n            on-mouseleave=\"handleMouseLeave\"\n            on-scroll=\"capture:handlePopupScroll\"\n        >\n            <s-menu\n                multiple=\"{{multiple}}\"\n                prefixCls=\"".concat(_util.dropdownPrefixCls, "\"\n                role=\"listbox\"\n                selectedKeys=\"{{selectedKeys}}\"\n                style=\"{{context.dropdownMenuStyle}}\"\n                on-click=\"handleEvent($event, 'click')\"\n                on-select=\"handleEvent($event, 'select')\"\n                on-deselect=\"handleEvent($event, 'deselect')\"\n            >\n                <s-menu-group\n                    s-if=\"context.optionGroups.length\"\n                    s-for=\"groupInfo in menuGroups\"\n                    title=\"{{groupInfo.title}}\"\n                    prefixCls=\"").concat(_util.dropdownPrefixCls, "-menu\"\n                >\n                    <s-menu-item\n                        s-for=\"item in groupInfo.menuItems\"\n                        class=\"{{item | getItemClass(activeKey)}}\"\n                        disabled=\"{{item.disabled}}\"\n                        value=\"{{item.value}}\"\n                        key=\"{{item.value}}\"\n                        role=\"option\"\n                        rootPrefixCls=\"").concat(_util.dropdownPrefixCls, "-menu\"\n                    >\n                        {{item.content | raw}}\n                        <slot s-if=\"multiple\" name=\"menuItemSelectedIcon\"/>\n                        <slot s-if=\"item.empty\" name=\"notFoundContent\"/>\n                    </s-menu-item>\n                </s-menu-group>\n                <s-menu-item\n                    s-else\n                    s-for=\"item in menuItems\"\n                    class=\"{{item | getItemClass(activeKey)}}\"\n                    disabled=\"{{item.disabled}}\"\n                    value=\"{{item.value}}\"\n                    key=\"{{item.value}}\"\n                    role=\"option\"\n                    rootPrefixCls=\"").concat(_util.dropdownPrefixCls, "-menu\"\n                >\n                    {{item.content | raw}}\n                    <slot s-if=\"multiple\" name=\"menuItemSelectedIcon\"/>\n                    <slot s-if=\"item.empty\" name=\"notFoundContent\"/>\n                </s-menu-item>\n            </s-menu>\n            <slot/>\n        </div>\n    "),
  components: {
    's-icon': _icon["default"],
    's-menu': _menu["default"],
    's-menu-item': _menu["default"].Item,
    's-menu-group': _menu["default"].MenuItemGroup
  },
  dataTypes: {
    context: _san.DataTypes.object,
    inputValue: _san.DataTypes.string
  },
  computed: {
    menuGroups: function menuGroups() {
      var context = this.data.get('context');
      var optionGroups = context.optionGroups,
          optionsInfo = context.optionsInfo;
      return optionGroups.map(function (og) {
        var title = og.group.data.get('label');
        var menuItems = og.options.map(function (option) {
          return formatOptionInfo(option, optionsInfo);
        });
        return {
          title: title,
          menuItems: menuItems
        };
      });
    },
    menuItems: function menuItems() {
      var context = this.data.get('context');
      var options = context.options,
          optionsInfo = context.optionsInfo,
          modeConfig = context.modeConfig,
          notFoundContent = context.notFoundContent,
          value = context.value;
      var inputValue = this.data.get('inputValue');
      var menuItems = options.filter(function (option) {
        return filterOption(inputValue, option, context);
      }).map(function (option) {
        return formatOptionInfo(option, optionsInfo);
      });

      if (modeConfig.tags) {
        var childrenKeys = menuItems.map(function (item) {
          return item.value;
        });
        var inputValues = value.filter(function (val) {
          return childrenKeys.indexOf(val) < 0 && val.indexOf(inputValue) >= 0;
        });
        inputValues.sort(function (val1, val2) {
          return val1.length - val2.length;
        });
        inputValues.forEach(function (val) {
          menuItems.push({
            content: val,
            value: val
          });
        });

        if (inputValue && menuItems.map(function (optionInfo) {
          return optionInfo.value;
        }).indexOf(inputValue) < 0) {
          menuItems.unshift({
            content: inputValue,
            value: inputValue
          });
        }
      }

      if (!menuItems.length && (notFoundContent || notFoundContent === undefined)) {
        return [{
          content: '',
          disabled: true,
          empty: true,
          value: 'NOT_FOUND'
        }];
      }

      return menuItems;
    },
    multiple: function multiple() {
      var mode = this.data.get('context.modeConfig');
      return mode && (mode.multiple || mode.tags);
    },
    selectedKeys: function selectedKeys() {
      var selectedKeys = [];
      var value = this.data.get('context.value');

      if (value === null || value === undefined) {
        return [];
      }

      var options = this.data.get('context.options');
      options.forEach(function (item) {
        var itemValue = item.data.get('value');

        if (value.indexOf(itemValue) > -1) {
          selectedKeys.push(itemValue);
        }
      }); // add for tags

      var modeConfig = this.data.get('context.modeConfig');

      if (modeConfig.tags) {
        value.forEach(function (val) {
          if (selectedKeys.indexOf(val) < 0) {
            selectedKeys.push(val);
          }
        });
      }

      return selectedKeys;
    }
  },
  filters: {
    getItemClass: function getItemClass(item, activeKey) {
      var klass = "".concat(_util.prefixCls, "-unselectable");

      if (item.value === activeKey) {
        klass += " ".concat(_util.dropdownPrefixCls, "-menu-item-active");
      }

      return klass;
    }
  },
  messages: {
    'santd_menu_itemMouseEnter': function santd_menu_itemMouseEnter(_ref) {
      var value = _ref.value;
      this.data.set('activeKey', value.key);
    }
  },
  initData: function initData() {
    return {
      activeKey: '',
      context: {},
      inputValue: ''
    };
  },
  inited: function inited() {
    var _this = this;

    this.resetActiveKey();
    this.owner.watch('realOpen', function (open) {
      if (open) {
        _this.resetActiveKey();
      }
    });
    this.owner.watch('inputValue', function (value) {
      _this.data.set('activeKey', value);
    });
  },
  getActiveItem: function getActiveItem() {
    var activeKey = this.data.get('activeKey');

    if (!activeKey) {
      return null;
    }

    var menuItems = this.data.get('menuItems').filter(function (item) {
      return !item.disabled && item.value === activeKey;
    });
    return menuItems.length ? menuItems[0] : null;
  },
  resetActiveKey: function resetActiveKey() {
    var activeKey = '';

    var _this$data$get = this.data.get(),
        menuItems = _this$data$get.menuItems,
        selectedKeys = _this$data$get.selectedKeys;

    if (selectedKeys.length) {
      activeKey = selectedKeys[0];
    } else if (this.owner.data.get('defaultActiveFirstOption')) {
      var tmpArr = menuItems.filter(function (item) {
        return !item.disabled;
      });

      if (tmpArr.length) {
        activeKey = tmpArr[0].value;
      }
    }

    this.data.set('activeKey', activeKey);
  },
  // direction: -1 UP, 1 DOWN
  updateActiveKey: function updateActiveKey() {
    var activeItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var activeKey = '';
    var menuItems = this.data.get('menuItems').filter(function (item) {
      return !item.disabled;
    });

    if (menuItems.length) {
      if (!activeItem) {
        activeKey = menuItems[0].value;
      } else if (direction) {
        var max = menuItems.length - 1;
        var index = menuItems.findIndex(function (item) {
          return item.value === activeItem.value;
        });

        if (index >= 0) {
          index += direction;

          if (index < 0) {
            index = max;
          } else if (index > max) {
            index = 0;
          }

          activeKey = menuItems[index].value;
        }
      }

      this.data.set('activeKey', activeKey);
    }
  },
  handlePopupScroll: function handlePopupScroll(e) {
    this.owner.fire('popup-scroll', event);
  },
  handleEvent: function handleEvent(e, type) {
    var multiple = this.data.get('multiple');

    if (multiple) {
      if (type === 'select') {
        this.handleMenuSelect(e);
      } else if (type === 'deselect') {
        this.handleMenuDeselect(e);
      }
    } else if (type === 'select') {
      this.handleMenuSelect(e);
    }
  },
  handleMouseLeave: function handleMouseLeave() {// this.data.set('activeKey', '');
  },
  handleMenuSelect: function handleMenuSelect(_ref2) {
    var item = _ref2.item;

    if (!item) {
      return;
    }

    var context = this.data.get('context');
    var skipTrigger = false;
    var autoClearSearchValue = context.autoClearSearchValue,
        backfillValue = context.backfillValue,
        modeConfig = context.modeConfig,
        value = context.value;
    var selectedValue = item.value || item.data.get('value') || item.data.get('key');
    var lastValue = value[value.length - 1];
    var optionLabelProp = this.owner.getOptionLabelProp(context);

    if (modeConfig.multiple || modeConfig.tags) {
      if (value.indexOf(selectedValue) > -1) {
        skipTrigger = true;
      } else {
        value = [].concat(_toConsumableArray(value), [selectedValue]);
      }
    } else {
      if (!modeConfig.combobox && lastValue !== undefined && lastValue === selectedValue && selectedValue !== backfillValue) {
        skipTrigger = true;
      } else {
        value = [selectedValue];
      }

      this.owner.setOpenState(false, {
        needFocus: true,
        fireSearch: false
      });
    }

    if (!skipTrigger) {
      this.owner.fireChange(value);
    }

    this.owner.fireSelect(selectedValue);

    if (!skipTrigger) {
      var inputValue = modeConfig.combobox ? (0, _util.getPropValue)(item, optionLabelProp) : '';

      if (autoClearSearchValue) {
        this.owner.setInputValue(inputValue, false);
      } else {
        this.owner.setInputValue(selectedValue, true);
      }
    }
  },
  handleMenuDeselect: function handleMenuDeselect(_ref3) {
    var item = _ref3.item;
    var value = item.value || item.data.get('value');
    this.owner.removeSelected(value);
    var autoClearSearchValue = this.data.get('context.autoClearSearchValue');

    if (autoClearSearchValue) {
      this.owner.setInputValue('');
    }
  },
  handleKeyDown: function handleKeyDown(e, callback) {
    var keyCode = e.keyCode;
    var activeItem = this.getActiveItem();

    if (keyCode === _keyCode["default"].ENTER) {
      if (activeItem) {
        var modeConfig = this.data.get('context.modeConfig');

        if (modeConfig.single) {
          this.handleMenuSelect({
            item: activeItem
          });
        } else if (modeConfig.tags || modeConfig.multiple) {
          var selectedKeys = this.data.get('selectedKeys');

          if (selectedKeys.indexOf(activeItem.value) >= 0) {
            this.handleMenuDeselect({
              item: activeItem
            });
          } else {
            this.handleMenuSelect({
              item: activeItem
            });
          }
        }
      }

      return;
    }

    if (keyCode === _keyCode["default"].UP || keyCode === _keyCode["default"].DOWN) {
      this.updateActiveKey(activeItem, keyCode === _keyCode["default"].UP ? -1 : 1);
      e.preventDefault();

      if (typeof callback === 'function') {
        callback(activeItem);
      }
    }
  },
  preventDefaultEvent: _util.preventDefaultEvent
});

exports["default"] = _default;