"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file select/MultipleSelector
 * @author
 */
var _default = _san["default"].defineComponent({
  template: "\n        <ul>\n            <li s-for=\"item in selectedItems\"\n                class=\"{{item.klass}}\"\n                unselectable=\"on\"\n                role=\"presentation\"\n                title=\"{{item.title}}\"\n                on-mousedown=\"preventDefaultEvent\"\n            >\n                <div class=\"".concat(_util.prefixCls, "-selection__choice__content\">{{item.content}}</div>\n                <span\n                    s-if=\"!item.disabled\"\n                    class=\"").concat(_util.prefixCls, "-selection__choice__remove\"\n                    on-click=\"handleRemoveSelected($event, item)\"\n                >\n                    <slot name=\"removeIcon\">\n                        <i class=\"").concat(_util.prefixCls, "-selection__choice__remove-icon\">\xD7</i>\n                    </slot>\n                </span>\n            </li>\n            <li class=\"").concat(_util.prefixCls, "-search ").concat(_util.prefixCls, "-search--inline\">\n                <slot name=\"input\"/>\n            </li>\n        </ul>\n    "),
  computed: {
    selectedItems: function selectedItems() {
      var _this$data$get = this.data.get('context'),
          maxTagCount = _this$data$get.maxTagCount,
          maxTagPlaceholder = _this$data$get.maxTagPlaceholder,
          maxTagTextLength = _this$data$get.maxTagTextLength,
          _this$data$get$option = _this$data$get.optionsInfo,
          optionsInfo = _this$data$get$option === void 0 ? {} : _this$data$get$option,
          _this$data$get$value = _this$data$get.value,
          value = _this$data$get$value === void 0 ? [] : _this$data$get$value;

      var klass = ["".concat(_util.prefixCls, "-unselectable"), "".concat(_util.prefixCls, "-selection__choice")];
      var klassDisabled = "".concat(_util.prefixCls, "-selection__choice__disabled");
      var selectedValues = value;
      var maxTagPlaceholderItem;

      if (maxTagCount !== undefined && value.length > maxTagCount) {
        selectedValues = selectedValues.slice(0, maxTagCount);
        var omittedValues = value.slice(maxTagCount, value.length);
        var content = "+ ".concat(value.length - maxTagCount, " ...");

        if (maxTagPlaceholder) {
          content = typeof maxTagPlaceholder === 'function' ? maxTagPlaceholder(omittedValues) : maxTagPlaceholder;
        }

        maxTagPlaceholderItem = {
          klass: klass,
          content: content,
          title: (0, _util.toTitle)(content),
          value: 'placeholder',
          disabled: true
        };
      }

      var selectedItems = selectedValues.map(function (val) {
        var info = optionsInfo[(0, _util.getMapKey)(val)] || {
          label: val
        };
        var content = info.label;
        var title = (0, _util.toTitle)(info.title || content);

        if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
          content = "".concat(content.slice(0, maxTagTextLength), "...");
        }

        return {
          klass: info.disabled ? klass.concat(klassDisabled) : klass,
          content: content,
          title: title,
          value: val,
          disabled: info.disabled
        };
      });
      maxTagPlaceholderItem && selectedItems.push(maxTagPlaceholderItem);
      return selectedItems;
    }
  },
  dataTypes: {
    context: _san.DataTypes.object
  },
  initData: function initData() {
    return {
      context: {}
    };
  },
  handleRemoveSelected: function handleRemoveSelected(e, item) {
    var props = this.data.get('context');

    if (props.disabled || item.disabled) {
      return;
    } // Do not trigger Trigger popup


    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    var selectedKey = item.value;
    var oldValue = props.value,
        modeConfig = props.modeConfig;
    var value = oldValue.filter(function (singleValue) {
      return singleValue !== selectedKey;
    });

    if (modeConfig.multiple || modeConfig.tags) {
      var event = selectedKey;

      if (props.labelInValue) {
        event = {
          key: selectedKey,
          label: selectedKey // this.getLabelBySingleValue(selectedKey)

        };
      }

      this.fire('deselect', event);
    }

    this.fire('change', value);
  },
  preventDefaultEvent: _util.preventDefaultEvent
});

exports["default"] = _default;