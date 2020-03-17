"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file select 头部selector部分
* @author fuqiangqiang@baidu.com
*/
var prefixCls = (0, _util.classCreator)('select')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    placeholder: _san.DataTypes.string,
    title: _san.DataTypes.any,
    disabled: _san.DataTypes.bool,
    inputValue: _san.DataTypes.string,
    emptyValue: _san.DataTypes.string
  },
  components: {
    's-icon': _icon["default"]
  },
  computed: {
    placeholderStyles: function placeholderStyles() {
      var title = this.data.get('title') || this.data.get('inputValue');
      return {
        display: title ? 'none' : 'block',
        'user-select': 'none'
      };
    },
    mulClasses: function mulClasses() {
      var disabled = this.data.get('disabled');
      var classArr = ["".concat(prefixCls, "-selection__choice__content")];
      disabled && classArr.push("".concat(prefixCls, "-selection__choice__disabled"));
      return classArr;
    },
    multipleValue: function multipleValue() {
      var value = this.data.get('value').concat();
      var result;
      var maxTagCount = this.data.get('maxTagCount') || Number.MAX_VALUE;
      var maxTagPlaceholder = this.data.get('maxTagPlaceholder');
      result = value.filter(function (item, index) {
        return index < maxTagCount;
      });
      value.length > maxTagCount && result.push({
        title: "+ ".concat(value.length, " ").concat(maxTagPlaceholder || '...')
      });
      return result;
    }
  },
  initData: function initData() {
    return {
      placeholder: '',
      title: '',
      maxTagCount: 50,
      disabled: false
    };
  },
  closeHandler: function closeHandler(e) {
    var value = e.currentTarget.getAttribute('title');
    e.stopPropagation();
    this.dispatch('closeBtnClick', value);
  },
  query: function query(_query, e) {
    this.dispatch('queryInput', {
      value: _query,
      event: e
    });
  },
  inputChange: function inputChange(e) {
    var value = e.target.value;
    e.target.style.width = value.length * 10 + 10 + 'px';
    this.data.set('inputValue', value);
    this.query(value, e);
    this.dispatch('inputSearch', value);
  },
  inputKeyDown: function inputKeyDown(e) {
    var value = e.target.value;

    if (e.keyCode === _keyCode["default"].ENTER && value) {} // this.dispatch('keyEnter', {value, event: e});
    // 处理del键时的删除事件


    if (e.keyCode === _keyCode["default"].BACKSPACE) {
      if (value === '') {
        this.dispatch('handleBackspace', e);
      }
    }
  },
  removeValue: function removeValue(e, index) {
    e.stopPropagation();
    this.fire('removeValue', index);
  },
  template: "\n            <ul>\n                <li\n                    s-for=\"value, index in multipleValue\"\n                    class=\"".concat(prefixCls, "-selection__choice\"\n                    style=\"user-select: none;\"\n                >\n                    <div class=\"{{mulClasses}}\">\n                        <template s-if=\"value.title\">\n                            {{value.title}}\n                        </template>\n                        <slot s-else />\n                    </div>\n                    <span\n                        s-if=\"!disabled && index < maxTagCount\"\n                        class=\"").concat(prefixCls, "-selection__choice__remove\"\n                        title=\"{{content}}\"\n                        on-click=\"removeValue($event, index)\"\n                    >\n                        <s-icon type=\"close\"></s-icon>\n                    </span>\n                </li>\n                <!--input\u4F4D\u7F6E-->\n                <li class=\"").concat(prefixCls, "-search ").concat(prefixCls, "-search--inline\" key=\"__input\">\n                    <div class=\"").concat(prefixCls, "-search__field__wrap\">\n                        <input\n                            s-ref=\"importInput\"\n                            autoComplete=\"off\"\n                            class=\"").concat(prefixCls, "-search__field\"\n                            on-input=\"inputChange($event)\"\n                            on-keydown=\"inputKeyDown($event)\"\n                            value=\"{{ emptyValue }}\"\n                            >\n                        <span class=\"").concat(prefixCls, "-search__field__mirror\">\n                            {{inputValue}}&nbsp;\n                        </span>\n                    </div>\n                </li>\n            </ul>\n    ")
});

exports["default"] = _default;