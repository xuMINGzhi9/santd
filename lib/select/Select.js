"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _empty = _interopRequireDefault(require("../empty"));

var _icon = _interopRequireDefault(require("../icon"));

var _trigger = _interopRequireDefault(require("../core/trigger"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _Selector = _interopRequireDefault(require("./Selector"));

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
var sizeMap = {
  large: 'lg',
  small: 'sm'
};
var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var valueType = _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.arrayOf(_san.DataTypes.string), _san.DataTypes.number, _san.DataTypes.arrayOf(_san.DataTypes.number)]);

var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"{{wrapClass}}\"\n            on-mouseenter=\"fireEvent($event, 'mouseenter')\"\n            on-mouseleave=\"fireEvent($event, 'mouseleave')\"\n        >\n            <s-trigger\n                s-ref=\"trigger\"\n                builtinPlacements=\"{{builtinPlacements}}\"\n                getPopupContainer=\"{{getPopupContainer}}\"\n                popupAlign=\"{{dropdownAlign}}\"\n                popupClassName=\"{{popupClassName}}\"\n                popupStyle=\"{{popupStyle}}\"\n                popupPlacement=\"bottomLeft\"\n                popupTransitionName=\"slide-up\"\n                popupVisible=\"{{realOpen}}\"\n                prefixCls=\"".concat(_util.dropdownPrefixCls, "\"\n                showAction=\"{{disabled ? [] : showAction}}\"\n                hideAction=\"{{hideAction}}\"\n                on-visibleChange=\"handleVisibleChange\"\n            >\n                <div\n                    s-ref=\"selection\"\n                    s-bind=\"selectionAttrs\"\n                            class=\"{{selectionClass}}\"\n                    on-blur=\"capture:handleOuterBlur\"\n                    on-focus=\"capture:handleOuterFocus\"\n                    on-keydown=\"handleKeyDown\"\n                    on-mousedown=\"markMouseDown\"\n                    on-mouseup=\"markMouseLeave\"\n                    on-mouseout=\"markMouseLeave\"\n                >\n                    <s-selector context=\"{{context}}\" inputValue=\"{=inputValue=}\" isAutoComplete=\"{{isAutoComplete}}\">\n                        <slot name=\"removeIcon\"/>\n                    </s-selector>\n                    <span\n                        s-if=\"renderClear\"\n                        class=\"").concat(_util.prefixCls, "-selection__clear ").concat(_util.prefixCls, "-unselectable\"\n                        unselectable=\"on\"\n                        on-click=\"handleClearSelection\"\n                        on-mousedown=\"preventDefaultEvent\"\n                    >\n                        <slot name=\"clearIcon\">\n                            <s-icon type=\"close-circle\" theme=\"filled\" class=\"").concat(_util.prefixCls, "-clear-icon\"/>\n                        </slot>\n                    </span>\n                    <span\n                        s-if=\"renderArrow\"\n                        class=\"").concat(_util.prefixCls, "-arrow ").concat(_util.prefixCls, "-unselectable\"\n                        unselectable=\"on\"\n                        on-click=\"handleArrowClick\"\n                    >\n                        <slot name=\"suffixIcon\">\n                            <s-icon s-if=\"loading\" type=\"loading\"/>\n                            <s-icon s-else type=\"down\" class=\"").concat(_util.prefixCls, "-arrow-icon\"/>\n                        </slot>\n                    </span>\n                </div>\n                <s-dropdown-render\n                    s-ref=\"dropdown\"\n                    slot=\"popup\"\n                    context=\"{{context}}\"\n                    inputValue=\"{{inputValue}}\"\n                    visible=\"{{realOpen}}\"\n                >\n                    <slot name=\"dropdownRender\"/>\n                    <slot name=\"menuItemSelectedIcon\" slot=\"menuItemSelectedIcon\">\n                        <s-icon type=\"check\" class=\"").concat(_util.prefixCls, "-selected-icon\"/>\n                    </slot>\n                    <slot name=\"notFoundContent\" slot=\"notFoundContent\">\n                        <template s-if=\"notFoundContent\">{{notFoundContent}}</template>\n                        <s-empty s-else\n                            image=\"").concat(_empty["default"].PRESENTED_IMAGE_SIMPLE, "\"\n                            class=\"").concat(_util.emptyPrefixCls, "-small\"\n                        />\n                    </slot>\n                </s-dropdown-render>\n                <div style=\"display: none;\"><slot/></div>\n            </s-trigger>\n        </div>\n    "),
  components: {
    's-empty': _empty["default"],
    's-icon': _icon["default"],
    's-trigger': _trigger["default"],
    's-dropdown-render': _DropdownMenu["default"],
    's-selector': _Selector["default"]
  },
  dataTypes: {
    allowClear: _san.DataTypes.bool,
    autoClearSearchValue: _san.DataTypes.bool,
    autoFocus: _san.DataTypes.bool,
    defaultActiveFirstOption: _san.DataTypes.bool,
    defaultValue: valueType,
    disabled: _san.DataTypes.bool,
    dropdownClassName: _san.DataTypes.string,
    dropdownMatchSelectWidth: _san.DataTypes.bool,
    dropdownRender: _san.DataTypes.func,
    dropdownStyle: _san.DataTypes.object,
    dropdownMenuStyle: _san.DataTypes.object,
    filterOption: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.func]),
    firstActiveValue: _san.DataTypes.bool,
    getPopupContainer: _san.DataTypes.func,
    labelInValue: _san.DataTypes.bool,
    maxTagCount: _san.DataTypes.number,
    maxTagTextLength: _san.DataTypes.number,
    maxTagPlaceholder: _san.DataTypes.func,
    mode: _san.DataTypes.oneOf(['default', 'multiple', 'tags', 'combobox', SECRET_COMBOBOX_MODE_DO_NOT_USE]),
    notFoundContent: _san.DataTypes.string,
    optionFilterProp: _san.DataTypes.string,
    optionLabelProp: _san.DataTypes.string,
    placeholder: _san.DataTypes.string,
    showArrow: _san.DataTypes.bool,
    showSearch: _san.DataTypes.bool,
    size: _san.DataTypes.oneOf(['default', 'large', 'small']),
    tokenSeparators: _san.DataTypes.arrayOf(_san.DataTypes.string),
    value: valueType,
    defaultOpen: _san.DataTypes.bool,
    open: _san.DataTypes.bool,
    loading: _san.DataTypes.bool
  },
  computed: {
    modeConfig: function modeConfig() {
      var mode = this.data.get('mode');
      var multiple = mode === 'multiple';
      var tags = mode === 'tags';
      var combobox = mode === 'combobox' || mode === SECRET_COMBOBOX_MODE_DO_NOT_USE;
      return {
        multiple: multiple,
        tags: tags,
        combobox: combobox,
        single: !multiple && !tags && !combobox
      };
    },
    wrapClass: function wrapClass() {
      var data = this.data;
      var allowClear = data.get('allowClear');
      var disabled = data.get('disabled');
      var loading = data.get('loading');
      var modeConfig = data.get('modeConfig');
      var open = data.get('open');
      var focused = data.get('_focused');
      var showArrow = data.get('showArrow');
      var size = sizeMap[this.data.get('size')] || '';
      return [_util.prefixCls, "".concat(_util.prefixCls, "-").concat(disabled ? 'disabled' : 'enabled'), allowClear && "".concat(_util.prefixCls, "-allow-clear"), modeConfig.combobox && "".concat(_util.prefixCls, "-combobox"), loading && "".concat(_util.prefixCls, "-loading"), open && "".concat(_util.prefixCls, "-open"), size && "".concat(_util.prefixCls, "-").concat(size), showArrow !== undefined && "".concat(_util.prefixCls, "-").concat(showArrow ? 'show' : 'no', "-arrow"), (open || focused) && "".concat(_util.prefixCls, "-focused")].filter(function (name) {
        return name;
      });
    },
    selectionClass: function selectionClass() {
      var mode = this.data.get('mode');
      return ["".concat(_util.prefixCls, "-selection"), "".concat(_util.prefixCls, "-selection--").concat(mode && mode !== 'default' ? 'multiple' : 'single')];
    },
    selectionAttrs: function selectionAttrs() {
      var data = this.data;
      var modeConfig = data.get('modeConfig');
      return _defineProperty({
        'role': 'combobox',
        'aria-autocomplete': 'list',
        'aria-haspopup': true,
        'aria-controls': data.get('context.ariaId'),
        'aria-expanded': !!data.get('realOpen')
      }, modeConfig.single && 'tabindex', data.get('disabled') ? -1 : 0);
    },
    renderClear: function renderClear() {
      var allowClear = this.data.get('allowClear');
      var value = this.data.get('value');

      if (allowClear && value && value.length) {
        return true;
      }

      return false;
    },
    renderArrow: function renderArrow() {
      // showArrow : Set to true if not multiple by default but keep set value.
      var data = this.data;
      var loading = data.get('loading');
      var modeConfig = data.get('modeConfig');
      var showArrow = data.get('showArrow');

      if (showArrow === undefined) {
        showArrow = !(modeConfig.multiple || modeConfig.tags);
      }

      if (!showArrow && !loading) {
        return false;
      }

      return true;
    },
    hideAction: function hideAction() {
      var data = this.data;
      var disabled = data.get('disabled');

      if (disabled) {
        return [];
      }

      var modeConfig = data.get('modeConfig');
      var showSearch = data.get('showSearch');
      return !showSearch && modeConfig.single ? ['click'] : ['blur'];
    },
    popupClassName: function popupClassName() {
      var data = this.data;
      var dropdownClassName = data.get('dropdownClassName');
      var empty = false;
      var modeConfig = data.get('modeConfig');
      return [dropdownClassName, "".concat(_util.dropdownPrefixCls, "--").concat(modeConfig.single ? 'single' : 'multiple'), empty && "".concat(_util.dropdownPrefixCls, "--empty")].filter(function (name) {
        return name;
      }).join(' ');
    },
    popupStyle: function popupStyle() {
      var data = this.data;
      var dropdownMatchSelectWidth = data.get('dropdownMatchSelectWidth');
      var dropdownStyle = data.get('dropdownStyle') || {};
      var dropdownWidth = data.get('dropdownWidth');
      var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';

      var popupStyle = _objectSpread({}, dropdownStyle);

      if (dropdownWidth) {
        popupStyle[widthProp] = "".concat(dropdownWidth, "px");
      }

      return popupStyle;
    },
    realOpen: function realOpen() {
      var data = this.data;
      var open = data.get('open');
      var modeConfig = data.get('modeConfig');
      var options = data.get('options') || [];
      var showSearch = data.get('showSearch');

      if (!modeConfig.single || !showSearch) {
        if (open && !options.length) {
          open = false;
        }
      }

      return open;
    }
  },
  messages: {
    'select:updateOptions': function selectUpdateOptions() {
      this.updateOptions();
    },
    'select:setInputElement': function selectSetInputElement(_ref2) {
      var inputElement = _ref2.value;
      this.data.set('inputElement', inputElement);
    },
    'select:inputChange': function selectInputChange(_ref3) {
      var event = _ref3.value;
      this.handleInputChange(event);
    },
    'select:inputKeyDown': function selectInputKeyDown(_ref4) {
      var event = _ref4.value;
      this.handleInputKeyDown(event);
    }
  },
  initData: function initData() {
    return {
      // ----- data ----- //
      allowClear: false,
      autoClearSearchValue: true,
      autoFocus: false,
      backfill: false,
      defaultActiveFirstOption: true,
      disabled: false,
      dropdownMatchSelectWidth: true,
      getPopupContainer: function getPopupContainer() {
        return document.body;
      },
      labelInValue: false,
      optionFilterProp: 'value',
      showSearch: false,
      size: 'default',
      tokenSeparators: [],
      loading: false,
      // -- extra data -- //
      builtinPlacements: BUILT_IN_PLACEMENTS,
      context: {},
      dropdownPrefixCls: _util.dropdownPrefixCls,
      dropdownWidth: 0,
      options: [],
      optionGroups: [],
      optionsInfo: {},
      showAction: ['click']
    };
  },
  inited: function inited() {
    var _this = this;

    this.watch('value', function (value) {
      _this.setState({
        value: value
      });
    });
  },
  created: function created() {
    var props = this.props = this.data.get();
    this.setState({
      value: this.getValueFromProps(true),
      open: !!props.defaultOpen,
      backfillValue: '',
      ariaId: (0, _util.generateUUID)()
    });
    this.setDropdownWidth();
  },
  attached: function attached() {
    this.setState({
      inputValue: '',
      ready: true
    });
    var props = this.props;

    if (props.autoFocus || props.open) {
      this.focus();
    }
  },
  updated: function updated() {
    this.setDropdownWidth();
    this.forcePopupAlign();
  },
  detached: function detached() {
    this.clearFocusTime();
    this.clearBlurTime();
    this.clearComboboxTime();
  },
  updateOptions: function updateOptions() {
    var _this$getOptionsFromC = this.getOptionsFromChildren(this.children),
        options = _this$getOptionsFromC.options,
        optionGroups = _this$getOptionsFromC.optionGroups;

    var optionsInfo = this.getOptionsInfo(options);
    this.setState({
      options: options,
      optionGroups: optionGroups,
      optionsInfo: optionsInfo
    });
  },
  findFirstMenuItem: function findFirstMenuItem() {
    var items = this.ref('dropdown').data.get('menuItems');

    if (items.length) {
      return items[0];
    }

    return null;
  },
  getOptionsFromChildren: function getOptionsFromChildren() {
    var _this2 = this;

    var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var optionGroups = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var currGroup = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var hasGroup = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    children.forEach(function (child) {
      if (child) {
        if (child.isSelectOption) {
          options.push(child);
          hasGroup && currGroup.push(child);
        } else if (child.isSelectOptionGroup) {
          currGroup = [];

          _this2.getOptionsFromChildren(child.children || [], options, optionGroups, currGroup, true);

          optionGroups.push({
            group: child,
            options: currGroup
          });
        } else if (child.children && child.children.length) {
          _this2.getOptionsFromChildren(child.children, options, optionGroups, currGroup, hasGroup);
        }
      }
    });
    return {
      options: options,
      optionGroups: optionGroups
    };
  },
  getInputValueForCombobox: function getInputValueForCombobox(props, optionsInfo, useDefaultValue) {
    var value = [];

    if ('value' in props && !useDefaultValue) {
      value = (0, _util.toArray)(props.value);
    }

    if ('defaultValue' in props && useDefaultValue) {
      value = (0, _util.toArray)(props.defaultValue);
    }

    if (value.length) {
      value = value[0];
    } else {
      return '';
    }

    var label = value;

    if (props.labelInValue) {
      label = value.label;
    } else if (optionsInfo[(0, _util.getMapKey)(value)]) {
      label = optionsInfo[(0, _util.getMapKey)(value)].label;
    }

    if (label === undefined) {
      label = '';
    }

    return label;
  },
  getLabelFromOption: function getLabelFromOption(option) {
    var optionLabelProp = this.getOptionLabelProp(this.props);

    if (optionLabelProp === 'children') {
      return option.el ? option.el.textContent.trim() : '';
    }

    return option.data.get(optionLabelProp);
  },
  getOptionInfo: function getOptionInfo(option) {
    var _option$data$get = option.data.get(),
        value = _option$data$get.value,
        title = _option$data$get.title,
        disabled = _option$data$get.disabled;

    var label = this.getLabelFromOption(option);
    return {
      disabled: disabled,
      label: label,
      option: option,
      title: title,
      value: value
    };
  },
  getOptionsInfo: function getOptionsInfo() {
    var _this3 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var optionsInfo = {};
    options.forEach(function (option) {
      var key = (0, _util.getMapKey)(option.data.get('value'));
      optionsInfo[key] = _this3.getOptionInfo(option);
    });
    return optionsInfo;
  },
  getOptionLabelProp: function getOptionLabelProp(props) {
    var optionLabelProp = props.optionLabelProp,
        modeConfig = props.modeConfig;
    return optionLabelProp || (modeConfig.combobox ? 'value' : 'children');
  },
  getValueByInput: function getValueByInput(str) {
    var _this4 = this;

    var _this$data$get = this.data.get(),
        tokenSeparators = _this$data$get.tokenSeparators;

    var nextValue = this.data.get('value');
    var hasNewValue = false;
    (0, _util.splitBySeparators)(str, tokenSeparators).forEach(function (label) {
      if (nextValue.indexOf(label) === -1) {
        nextValue = [].concat(_toConsumableArray(nextValue), [label]);
        hasNewValue = true;

        _this4.fireSelect(label);
      }
    });
    return hasNewValue ? nextValue : undefined;
  },
  getValueFromProps: function getValueFromProps(useDefaultValue) {
    var value = [];
    var props = this.props;

    if ('defaultValue' in props && useDefaultValue) {
      value = (0, _util.toArray)(props.defaultValue);
    }

    if (!value.length) {
      value = (0, _util.toArray)(props.value);
    }

    if (props.labelInValue) {
      value = value.map(function (v) {
        return v.key;
      });
    }

    return value;
  },
  setDropdownWidth: function setDropdownWidth() {
    var width = this.el.offsetWidth;

    if (width !== this.data.get('dropdownWidth')) {
      this.setState({
        dropdownWidth: width
      });
    }
  },
  setInputValue: function setInputValue(inputValue) {
    var fireSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var preInputValue = this.data.get('inputValue');

    if (inputValue !== preInputValue) {
      this.setState({
        inputValue: inputValue
      });
      fireSearch && this.fire('search', inputValue);
    }
  },
  setOpenState: function setOpenState(open) {
    var _this5 = this;

    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var needFocus = config.needFocus,
        fireSearch = config.fireSearch;
    var isAutoComplete = this.data.get('isAutoComplete');
    var props = this.data.get();

    if (props.open === open) {
      this.maybeFocus(open, !!needFocus);
      return;
    }

    this.fire('dropdown-visible-change', open);
    var nextState = {
      open: open,
      backfillValue: ''
    }; // clear search input value when open is false in singleMode.

    if (!open && props.modeConfig.single && props.showSearch && !isAutoComplete) {
      this.setInputValue('', fireSearch);
    }

    if (!open) {
      this.maybeFocus(open, !!needFocus);
    }

    this.setState(_objectSpread({
      open: open
    }, nextState));
    this.nextTick(function () {
      if (open) {
        _this5.maybeFocus(open, !!needFocus);
      }
    });
  },
  setState: function setState(props, config) {
    var _this6 = this;

    if ('context' in props) {
      console.log('context is forbidden to setState'); // eslint-disable-line

      return;
    }

    Object.keys(props).forEach(function (key) {
      var val = props[key];

      _this6.data.set(key, val, config);

      _this6.props[key] = val;
    });
    this.data.set('context', Object.assign({}, this.props, props), config);
  },
  forcePopupAlign: function forcePopupAlign() {
    var _this7 = this;

    if (!this.data.get('open')) {
      return;
    }

    this.nextTick(function () {
      var trigger = _this7.ref('trigger');

      trigger && trigger.refresh();
    });
  },
  maybeFocus: function maybeFocus(open, needFocus) {
    if (needFocus || open) {
      var $input = this.data.get('inputElement');
      var $selection = this.ref('selection');
      var $activeElement = document.activeElement;
      var modeConfig = this.data.get('modeConfig');

      if ($input && (open || !modeConfig.single)) {
        if ($activeElement !== $input) {
          $input.focus();
          this.data.set('_focused', true);
        }
      } else if ($selection && $activeElement !== $selection) {
        $selection.focus();
        this.data.set('_focused', true);
      }
    }
  },
  openIfHasChildren: function openIfHasChildren() {
    var props = this.props;

    if (props.options.length || props.modeConfig.single) {
      this.setOpenState(true);
    }
  },
  removeSelected: function removeSelected(selectedKey, e) {
    // Do not trigger Trigger popup
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    var _this$data$get2 = this.data.get(),
        oldValue = _this$data$get2.value,
        modeConfig = _this$data$get2.modeConfig,
        labelInValue = _this$data$get2.labelInValue;

    var value = oldValue.filter(function (singleValue) {
      return singleValue !== selectedKey;
    });

    if (modeConfig.multiple || modeConfig.tags) {
      var event = selectedKey;

      if (labelInValue) {
        event = {
          key: selectedKey,
          label: selectedKey // this.getLabelBySingleValue(selectedKey)

        };
      }

      this.fire('deselect', event);
    }

    this.fireChange(value);
  },
  fireChange: function fireChange(value) {
    this.setState({
      value: value
    });
    this.fire('change', value);
    this.dispatch('UI:form-item-interact', {
      fieldValue: value,
      type: 'change'
    });
  },
  fireSelect: function fireSelect(value) {
    this.fire('select', value);
  },
  fireEvent: function fireEvent(e, type) {
    this.fire(type, e);
  },
  handleArrowClick: function handleArrowClick(e) {
    e.stopPropagation();
    e.preventDefault();

    var _this$data$get3 = this.data.get(),
        disabled = _this$data$get3.disabled,
        open = _this$data$get3.open;

    if (!disabled) {
      this.setOpenState(!open, {
        needFocus: !open
      });
    }
  },
  handleBackfill: function handleBackfill(item) {
    var _this$props = this.props,
        modeConfig = _this$props.modeConfig,
        backfill = _this$props.backfill;

    if (!backfill || !(modeConfig.single || modeConfig.combobox)) {
      return;
    }

    var key = item.value;

    if (modeConfig.combobox) {
      this.setInputValue(key, false);
    }

    this.setState({
      value: [key],
      backfillValue: key
    });
  },
  handleClearSelection: function handleClearSelection(e) {
    if (this.data.get('disabled')) {
      return;
    }

    var _this$data$get4 = this.data.get(),
        inputValue = _this$data$get4.inputValue,
        value = _this$data$get4.value;

    value = (0, _util.toArray)(value);
    e.stopPropagation();

    if (inputValue || value.length) {
      if (value.length) {
        this.fireChange([]);
      }

      this.setOpenState(false, {
        needFocus: true
      });

      if (inputValue) {
        this.setInputValue('');
      }
    }
  },
  handleInputChange: function handleInputChange(e) {
    var _this8 = this;

    var _this$data$get5 = this.data.get(),
        modeConfig = _this$data$get5.modeConfig,
        tokenSeparators = _this$data$get5.tokenSeparators,
        $input = _this$data$get5.inputElement;

    var val = e.target.value;

    if ((modeConfig.multiple || modeConfig.tags) && tokenSeparators.length && (0, _util.includesSeparators)(val, tokenSeparators)) {
      var nextValue = this.getValueByInput(val);

      if (nextValue !== undefined) {
        this.fireChange(nextValue);
      }

      this.setOpenState(false, {
        needFocus: true
      });
      $input.value = '';
      this.nextTick(function () {
        _this8.setState({
          inputValue: ''
        });
      });
      return;
    }

    this.setInputValue(val);
    this.setState({
      open: true
    });

    if (modeConfig.combobox || this.data.get('isAutoComplete')) {
      this.fireChange([val]);
    }
  },
  handleInputKeyDown: function handleInputKeyDown(e) {
    var _this9 = this;

    var _this$data$get6 = this.data.get(),
        disabled = _this$data$get6.disabled,
        modeConfig = _this$data$get6.modeConfig,
        defaultActiveFirstOption = _this$data$get6.defaultActiveFirstOption,
        realOpen = _this$data$get6.realOpen,
        open = _this$data$get6.open,
        value = _this$data$get6.value;

    if (disabled) {
      return;
    } // magic code


    var keyCode = e.keyCode;

    if ((modeConfig.multiple || modeConfig.tags) && !e.target.value && keyCode === _keyCode["default"].BACKSPACE) {
      e.preventDefault();
      var val = (0, _util.toArray)(value);

      if (val.length) {
        this.removeSelected(val[val.length - 1]);
      }

      return;
    }

    if (keyCode === _keyCode["default"].DOWN) {
      if (!open) {
        this.openIfHasChildren();
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    } else if (keyCode === _keyCode["default"].ENTER && open) {
      // Aviod trigger form submit when select item
      if (realOpen || !modeConfig.combobox) {
        e.preventDefault();
      } // Hard close popup to avoid lock of non option in combobox mode


      if (realOpen && modeConfig.combobox && defaultActiveFirstOption === false) {
        var comboboxTimer = setTimeout(function () {
          _this9.setOpenState(false);
        });
        this.data.set('comboboxTimer', comboboxTimer);
      }
    } else if (keyCode === _keyCode["default"].ESC) {
      if (open) {
        this.setOpenState(false);
        e.preventDefault();
        e.stopPropagation();
      }

      return;
    }

    if (realOpen && this.ref('dropdown')) {
      var $dropdown = this.ref('dropdown');

      if ($dropdown && $dropdown.handleKeyDown) {
        $dropdown.handleKeyDown(e, this.handleBackfill.bind(this));
      }
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    var _this$data$get7 = this.data.get(),
        open = _this$data$get7.open,
        disabled = _this$data$get7.disabled,
        $input = _this$data$get7.inputElement;

    if (disabled) {
      return;
    }

    var keyCode = e.keyCode;

    if (open && !$input) {
      this.handleInputKeyDown(e);
    } else if (keyCode === _keyCode["default"].ENTER || keyCode === _keyCode["default"].DOWN) {
      if (!open) {
        this.setOpenState(true);
      }

      e.preventDefault();
    } else if (keyCode === _keyCode["default"].SPACE) {
      // Not block space if popup is shown
      if (!open) {
        this.setOpenState(true);
        e.preventDefault();
      }
    }
  },
  handleOuterBlur: function handleOuterBlur(e) {
    var _this10 = this;

    if (this.data.get('disabled')) {
      e.preventDefault();
      return;
    }

    var blurTimer = window.setTimeout(function () {
      _this10.data.set('_focused', false);

      var props = _this10.data.get();

      var $input = props.inputElement,
          inputValue = props.inputValue,
          modeConfig = props.modeConfig,
          showSearch = props.showSearch,
          defaultActiveFirstOption = props.defaultActiveFirstOption,
          _mouseDown = props._mouseDown;
      var value = props.value;

      if (modeConfig.single && showSearch && inputValue && defaultActiveFirstOption) {
        var firstOption = _this10.findFirstMenuItem();

        if (firstOption) {
          _this10.fireChange(firstOption.value);
        }
      } else if ((modeConfig.multiple || modeConfig.tags) && inputValue) {
        if (_mouseDown) {
          // need update dropmenu when not blur
          _this10.setInputValue('');
        } else {
          _this10.setState({
            inputValue: ''
          });

          if ($input) {
            $input.value = '';
          }
        }

        var tmpValue = _this10.getValueByInput(inputValue);

        if (tmpValue !== undefined) {
          value = tmpValue;

          _this10.fireChange(value);
        }
      } // if click the rest space of Select in multiple mode


      if ((modeConfig.multiple || modeConfig.tags) && _mouseDown) {
        _this10.maybeFocus(true, true);

        _this10.data.set('_mouseDown', false);

        return;
      }

      _this10.setOpenState(false);

      _this10.fire('blur', value);
    }, 10);
    this.data.set('blurTimer', blurTimer);
  },
  handleOuterFocus: function handleOuterFocus(e) {
    if (this.data.get('disabled')) {
      e.preventDefault();
      return;
    }

    this.clearBlurTime();

    var _this$data$get8 = this.data.get(),
        $input = _this$data$get8.inputElement,
        modeConfig = _this$data$get8.modeConfig,
        _focused = _this$data$get8._focused,
        _mouseDown = _this$data$get8._mouseDown; // eslint-disable-line


    if ($input && e.target === this.ref('selection')) {
      return;
    }

    if (modeConfig.single && e.target === $input) {
      return;
    }

    if (_focused) {
      return;
    }

    this.data.set('_focused', true); // only effect multiple or tag mode

    if (!(modeConfig.multiple || modeConfig.tags) || !_mouseDown) {
      this.timeoutFocus();
    }
  },
  handlePlaceholderClick: function handlePlaceholderClick() {
    var $input = this.data.get('inputElement');

    if ($input) {
      $input.focus();
    }
  },
  handlePopupFocus: function handlePopupFocus() {
    // fix ie scrollbar, focus element again
    this.maybeFocus(true, true);
  },
  handleVisibleChange: function handleVisibleChange(open) {
    if (open && !this.data.get('_focused')) {
      this.clearBlurTime();
      this.timeoutFocus();
      this.data.set('_focused', true);
    }

    this.setOpenState(open);
  },
  preventDefaultEvent: _util.preventDefaultEvent,
  focus: function focus() {
    var modeConfig = this.data.get('modeConfig');
    var $selection = this.ref('selection');

    if (modeConfig.single && $selection) {
      $selection.focus();
    } else {
      var $input = this.data.get('inputElement');
      $input && $input.focus();
    }
  },
  blur: function blur() {
    var modeConfig = this.data.get('modeConfig');
    var $selection = this.ref('selection');

    if (modeConfig.single && $selection) {
      $selection.blur();
    } else {
      var $input = this.data.get('inputElement');
      $input && $input.blur();
    }
  },
  clearBlurTime: function clearBlurTime() {
    var blurTimer = this.data.get('blurTimer');

    if (blurTimer) {
      clearTimeout(blurTimer);
      this.data.set('blurTimer', null);
    }
  },
  clearFocusTime: function clearFocusTime() {
    var focusTimer = this.data.get('focusTimer');

    if (focusTimer) {
      clearTimeout(focusTimer);
      this.data.set('focusTimer', null);
    }
  },
  clearComboboxTime: function clearComboboxTime() {
    var comboboxTimer = this.data.get('comboboxTimer');

    if (comboboxTimer) {
      clearTimeout(comboboxTimer);
      this.data.set('comboboxTimer', null);
    }
  },
  timeoutFocus: function timeoutFocus() {
    var _this11 = this;

    var focusTimer = this.data.get('focusTimer');

    if (focusTimer) {
      this.clearFocusTime();
    }

    this.data.set('focusTimer', window.setTimeout(function () {
      _this11.fire('focus');
    }, 10));
  },
  markMouseDown: function markMouseDown() {
    this.data.set('_mouseDown', true);
  },
  markMouseLeave: function markMouseLeave() {
    this.data.set('_mouseDown', false);
  }
});

exports["default"] = _default;