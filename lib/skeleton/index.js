"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 skeleton
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/skeleton-cn/
 */
var prefixCls = (0, _util.classCreator)('skeleton')();

var widthUnit = _san.DataTypes.oneOfType([_san.DataTypes.number, _san.DataTypes.string]);

var _default = _san["default"].defineComponent({
  template: "\n        <div style=\"display: table; width: 100%;\">\n            <slot s-if=\"!(loading || undefined === loading)\" />\n            <div s-if=\"loading || undefined === loading\" class=\"{{classes}}\">\n                <div s-if=\"avatar\" class=\"".concat(prefixCls, "-header\">\n                    <span class=\"{{getAvatarClasses(avatar.shape || 'circle', avatar.size || 'large')}}\" />\n                </div>\n                <div s-if=\"title || paragraph\" class=\"").concat(prefixCls, "-content\">\n                    <h3 class=\"").concat(prefixCls, "-title\" style=\"width: {{title.width || !avatar ? '38%' : '50%'}}\" s-if=\"title\" />\n                    <ul class=\"").concat(prefixCls, "-paragraph\">\n                        <li s-for=\"row, index in rowList\" style=\"{{getParagraphStyle(index)}}\" />\n                    </ul>\n                </div>\n            </div>\n        </div>\n    "),
  dataTypes: {
    active: _san.DataTypes.bool,
    avatar: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.shape({
      size: _san.DataTypes.oneOf(['large', 'small', 'default']),
      shape: _san.DataTypes.oneOf(['circle', 'square'])
    })]),
    loading: _san.DataTypes.bool,
    paragraph: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.shape({
      rows: _san.DataTypes.number,
      width: _san.DataTypes.oneOfType([widthUnit, _san.DataTypes.arrayOf(widthUnit)])
    })]),
    title: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.shape({
      width: widthUnit
    })])
  },
  getAvatarClasses: function getAvatarClasses(shape, size) {
    var avatarPrefixCls = "".concat(prefixCls, "-avatar");
    var classArr = [avatarPrefixCls];
    shape && classArr.push("".concat(avatarPrefixCls, "-").concat(shape));
    size && classArr.push("".concat(avatarPrefixCls, "-").concat(size));
    return classArr;
  },
  getParagraphStyle: function getParagraphStyle(index) {
    var _this$data$get = this.data.get('paragraph'),
        width = _this$data$get.width,
        _this$data$get$rows = _this$data$get.rows,
        rows = _this$data$get$rows === void 0 ? 2 : _this$data$get$rows;

    if (Array.isArray(width)) {
      return "width: ".concat(width[index], ";");
    } // last paragraph


    if (rows - 1 === index) {
      return "width: ".concat(width, ";");
    }

    return undefined;
  },
  computed: {
    classes: function classes() {
      var loading = this.data.get('loading');

      if (loading || undefined === loading) {
        var active = this.data.get('active');
        var avatar = this.data.get('avatar');
        var classArr = [prefixCls];
        avatar && classArr.push("".concat(prefixCls, "-with-avatar"));
        active && classArr.push("".concat(prefixCls, "-active"));
        return classArr;
      }
    },
    rowList: function rowList() {
      var paragraph = this.data.get('paragraph') || {};
      var avatar = this.data.get('avatar');
      var title = this.data.get('title');
      var rows = paragraph.rows || (!avatar && title ? 3 : 2);
      return new Array(rows);
    }
  },
  initData: function initData() {
    return {
      avatar: false,
      paragraph: true,
      title: true
    };
  }
});

exports["default"] = _default;