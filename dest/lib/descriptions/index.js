"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _responsiveObserve = _interopRequireWildcard(require("../core/util/responsiveObserve"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var prefixCls = (0, _util.classCreator)('descriptions')();
var defaultColumnMap = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1
};

var Item = _san["default"].defineComponent({
  template: '<template></template>'
});

var Descriptions = _san["default"].defineComponent({
  dataTypes: {
    bordered: _san.DataTypes.bool,
    size: _san.DataTypes.string,
    title: _san.DataTypes.string,
    column: _san.DataTypes.oneOfType([_san.DataTypes.number, _san.DataTypes.object]),
    layout: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      size: 'default',
      bordered: false,
      layout: 'horizontal',
      column: defaultColumnMap,
      screens: {}
    };
  },
  attached: function attached() {
    var _this = this;

    var column = this.data.get('column');
    this.token = _responsiveObserve["default"].subscribe(function (screens) {
      if (_typeof(column) !== 'object') {
        return;
      }

      _this.data.set('screens', screens);
    });
  },
  disposed: function disposed() {
    _responsiveObserve["default"].unsubscribe(this.token);
  },
  computed: {
    classes: function classes() {
      var size = this.data.get('size');
      var bordered = this.data.get('bordered');
      var classArr = [prefixCls];
      size !== 'default' && classArr.push("".concat(prefixCls, "-").concat(size));
      bordered && classArr.push("".concat(prefixCls, "-bordered"));
      return classArr;
    },
    getColumn: function getColumn() {
      var column = this.data.get('column');
      var screens = this.data.get('screens');

      if (_typeof(column) === 'object') {
        for (var i = 0; i < _responsiveObserve.responsiveArray.length; i++) {
          var breakpoint = _responsiveObserve.responsiveArray[i];

          if (screens[breakpoint] && column[breakpoint] !== undefined) {
            return column[breakpoint] || defaultColumnMap[breakpoint];
          }
        }
      }

      return typeof column === 'number' ? column : 3;
    }
  },
  inited: function inited() {
    var _this2 = this;

    var column = this.data.get('getColumn');
    var slots = this.sourceSlots.noname || [];
    var totalRowSpan = 0;
    var childrenArray = [];
    var columnArray = [];
    slots.filter(function (slot) {
      return slot.tagName;
    }).forEach(function (slot) {
      var labelIndex = slot.hotspot.props.label;
      var spanIndex = slot.hotspot.props.span;
      slot.label = slot.props[labelIndex] && slot.props[labelIndex].expr.value;
      slot.span = slot.props[spanIndex] && slot.props[spanIndex].expr.value || 1;
      columnArray.push(slot);
      totalRowSpan += slot.props[spanIndex] ? slot.props[spanIndex].expr.value : 1;

      if (totalRowSpan >= column) {
        childrenArray.push(columnArray);
        columnArray = [];
        totalRowSpan = 0;
      }
    });

    if (columnArray.length > 0) {
      childrenArray.push(columnArray);
      columnArray = [];
    }

    this.data.set('childrenArray', childrenArray);
    childrenArray.forEach(function (children, i) {
      children.forEach(function (child, j) {
        _this2.sourceSlots.named["slot_".concat(i, "_").concat(j)] = child.children;
      });
    });
  },
  getColSpan: function getColSpan(i, j, child) {
    var childrenArray = this.data.get('childrenArray');
    var column = this.data.get('getColumn');
    var span = child.span;
    var isLast = i + 1 === childrenArray.length;
    var lastSpan = column - childrenArray[i].length + 1;

    if (isLast && childrenArray[i].length === j + 1) {
      return lastSpan;
    }

    return span || 1;
  },
  template: "<div class=\"{{classes}}\">\n        <div class=\"".concat(prefixCls, "-title\" s-if=\"title\">{{title}}</div>\n        <div class=\"").concat(prefixCls, "-view\">\n            <table>\n                <tbody>\n                    <template s-for=\"children, i in childrenArray\">\n                        <template s-if=\"layout === 'vertical'\">\n                            <tr class=\"").concat(prefixCls, "-row\">\n                                <template s-for=\"child, j in children\">\n                                    <td\n                                        class=\"").concat(prefixCls, "-item-label\"\n                                        colspan=\"{{getColSpan(i, j, child) * 2 - 1}}\" s-if=\"bordered\"\n                                    >\n                                        {{child.label}}\n                                    </td>\n                                    <td colspan=\"{{getColSpan(i, j, child)}}\" class=\"").concat(prefixCls, "-item\" s-else>\n                                        <span class=\"").concat(prefixCls, "-item-label\">{{child.label}}</span>\n                                    </td>\n                                </template>\n                            </tr>\n                            <tr class=\"").concat(prefixCls, "-row\">\n                                <template s-for=\"child, j in children\">\n                                    <td\n                                        class=\"").concat(prefixCls, "-item-content\"\n                                        colspan=\"{{getColSpan(i, j, child) * 2 - 1}}\"\n                                        s-if=\"bordered\"\n                                    >\n                                        <slot name=\"slot_{{i}}_{{j}}\" />\n                                    </td>\n                                    <td colspan=\"{{getColSpan(i, j, child)}}\" class=\"").concat(prefixCls, "-item\" s-else>\n                                        <span class=\"").concat(prefixCls, "-item-content\">\n                                            <slot name=\"slot_{{i}}_{{j}}\" />\n                                        </span>\n                                    </td>\n                                </template>\n                            </tr>\n                        </template>\n                        <tr class=\"").concat(prefixCls, "-row\" s-else>\n                            <template s-for=\"child, j in children\">\n                                <template s-if=\"bordered\">\n                                    <th class=\"").concat(prefixCls, "-item-label {{!label && '").concat(prefixCls, "-item-no-label'}}\">\n                                        {{child.label}}\n                                    </th>\n                                    <td\n                                        class=\"").concat(prefixCls, "-item-content\"\n                                        colspan=\"{{getColSpan(i, j, child) * 2 -1}}\"\n                                    >\n                                        <slot name=\"slot_{{i}}_{{j}}\" />\n                                    </td>\n                                </template>\n                                <td colspan=\"{{getColSpan(i, j, child)}}\" class=\"").concat(prefixCls, "-item\" s-else>\n                                    <span class=\"").concat(prefixCls, "-item-label\">{{child.label}}</span>\n                                    <span class=\"").concat(prefixCls, "-item-content\">\n                                        <slot name=\"slot_{{i}}_{{j}}\" />\n                                    </span>\n                                </td>\n                            </template>\n                        </tr>\n                    </template>\n                </tbody>\n            </table>\n        </div>\n    <div>")
});

Descriptions.Item = Item;
var _default = Descriptions;
exports["default"] = _default;