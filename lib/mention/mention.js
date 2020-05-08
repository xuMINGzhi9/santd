"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _placeHolder = _interopRequireDefault(require("./placeHolder"));

var _suggestions = _interopRequireDefault(require("./suggestions"));

var _index = require("./utils/index");

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('mention')();

var _default = _san["default"].defineComponent({
  components: {
    's-placeholder': _placeHolder["default"],
    's-suggestions': _suggestions["default"]
  },
  dataTypes: {
    autoFocus: _san.DataTypes.bool,
    defaultValue: _san.DataTypes.string,
    defaultSuggestions: _san.DataTypes.any,
    disabled: _san.DataTypes.bool,
    loading: _san.DataTypes.bool,
    multiLines: _san.DataTypes.bool,
    notFoundContent: _san.DataTypes.string,
    placeholder: _san.DataTypes.string,
    placement: _san.DataTypes.string,
    prefix: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.array]),
    readOnly: _san.DataTypes.bool,
    suggestions: _san.DataTypes.any,
    suggestionStyle: _san.DataTypes.string,
    value: _san.DataTypes.string
  },
  initData: function initData() {
    return {
      placeholder: '',
      readOnly: false,
      disabled: false,
      suggestions: [],
      filteredSuggestions: [],
      isShowSug: false,
      notFoundContent: '无匹配结果，轻敲空格完成输入',
      multiLines: false,
      placement: 'bottom',
      prefix: '@',
      value: ''
    };
  },
  computed: {
    editorStyle: function editorStyle() {
      var multiLines = !!this.data.get('multiLines');
      var baseStyle = multiLines ? this.data.get('baseStyle') : {};
      return _objectSpread(_objectSpread({}, baseStyle), {}, {
        outline: 'none',
        'white-space': 'pre-wrap',
        'overflow-wrap': 'break-word'
      });
    }
  },
  messages: {
    santd_mention_itemSelect: function santd_mention_itemSelect(e) {
      var _this$data$get = this.data.get(),
          value = _this$data$get.value,
          start = _this$data$get.start,
          end = _this$data$get.end;

      var newInputValue = (0, _index.insertString)(value, start, end, e.value); // 点击下拉选项后，设置输入框的值

      this.setInputValue(newInputValue);
      (0, _index.setCursorPosition)(this.ref('mention-editor'), newInputValue.length);
      this.fire('select', e.value);
      this.fire('change', newInputValue);
    }
  },
  inited: function inited() {
    var _this$data$get2 = this.data.get(),
        value = _this$data$get2.value,
        defaultValue = _this$data$get2.defaultValue,
        suggestions = _this$data$get2.suggestions,
        defaultSuggestions = _this$data$get2.defaultSuggestions;

    var initValue = value || defaultValue || '';
    var initSuggestions = defaultSuggestions && defaultSuggestions.length > 0 && suggestions.length === 0 ? defaultSuggestions : suggestions;
    this.data.set('value', initValue);
    this.data.set('suggestions', initSuggestions);
  },
  attached: function attached() {
    var _this = this;

    var _this$data$get3 = this.data.get(),
        value = _this$data$get3.value,
        autoFocus = _this$data$get3.autoFocus;

    this.setInputValue(value);
    autoFocus && (0, _index.setCursorPosition)(this.ref('mention-editor'), 0);
    this.watch('value', function (val) {
      var refs = _this.ref('mention-editor');

      if (refs && val === '') {
        refs.innerText = val;
      }
    });
  },
  setInputValue: function setInputValue(val) {
    this.data.set('value', val);
    this.ref('mention-editor').innerText = val;
  },
  onFocus: function onFocus(e) {
    this.fire('focus', e);
  },
  onBlur: function onBlur(e) {
    var $this = this; // 为了解决输入框blur事件和下拉框选择点击事件冲突，blur事件设置了延迟

    setTimeout(function () {
      $this.hideSug();
    }, 300);
    this.dispatch('UI:form-item-interact', {
      fieldValue: e.target.textContent,
      type: 'blur',
      e: e
    });
    this.fire('blur', e);
  },
  onInput: function onInput(e) {
    // 如果只是回车
    if (this.multilDown) {
      return null;
    }

    this.showList(e);
    this.fire('change', e.target.textContent);
    this.dispatch('UI:form-item-interact', {
      fieldValue: e.target.textContent,
      type: 'change',
      e: e
    });
  },
  onKeydown: function onKeydown(e) {
    var keyCode = e.keyCode;
    var multiLines = this.data.get('multiLines');

    if (keyCode === 13 && multiLines) {
      this.multilDown = true;
    } else if (keyCode === 13 && !multiLines) {
      e.preventDefault();
    } else {
      this.multilDown = false;
    }
  },
  showList: function showList(e) {
    this.data.set('value', e.target.textContent);

    if (!e.target.textContent) {
      return this.hideSug();
    }

    this.buildSugList();
  },
  hideSug: function hideSug() {
    this.data.set('isShowSug', false);
  },
  // 匹配到的检索列表
  buildSugList: function buildSugList() {
    // 获取检索词（光标左右非空白符的文字）
    var _this$data$get4 = this.data.get(),
        value = _this$data$get4.value,
        prefix = _this$data$get4.prefix; // 需要先获取到上面行的字符数，而且，如果是同一行，不能加，只能在回车后的第一次才能加上


    var preLineOffset = this.ref('mention-editor').innerText.length;
    var anchorOffset = window.getSelection().anchorOffset; // 光标位置

    if (anchorOffset === 1) {
      anchorOffset += preLineOffset;
    }

    var startPos = value.slice(0, anchorOffset).search(/\S+$/);
    var endPos = value.slice(anchorOffset).search(/(\s|$)/);
    this.data.set('start', startPos + 1);
    this.data.set('end', anchorOffset + endPos + 1);
    var word = value.slice(startPos, anchorOffset + endPos); // 设置下拉框位置position的值,

    var rect = (0, _index.getSearchWordPos)(this.ref('mention-editor'));
    this.data.set('position', rect); // suggestionsRegExp正则匹配出前缀符和检索文字

    var suggestionsRegExp = (0, _index.getRegExp)(prefix); // 生成前缀的正则

    var matchArr = suggestionsRegExp.exec(word);

    if (!matchArr) {
      return this.hideSug();
    } // 显示下拉框


    this.data.set('isShowSug', true); // 将正则匹配得到的前缀符和检索文字作为搜索词传入onSearchChange函数

    this.onSearchChange(matchArr[3], matchArr[2]);
  },
  onSearchChange: function onSearchChange(value, trigger) {
    var searchValue = value.toLowerCase();
    var filteredSuggestions = (this.data.get('defaultSuggestions') || []).filter(function (suggestion) {
      return suggestion.toLowerCase().indexOf(searchValue) !== -1;
    });
    this.fire('searchChange', {
      value: value,
      trigger: trigger
    });
    this.data.set('suggestions', filteredSuggestions);
  },
  focus: function focus() {
    this.ref('mention-editor').focus();
  },
  blur: function blur() {
    this.ref('mention-editor').blur();
  },
  template: "\n        <div class=\"".concat(prefixCls, "-wrapper {{disabled ? 'disabled' : ''}}\">\n            <div class=\"").concat(prefixCls, "-editor\">\n                <s-placeholder s-if=\"{{!value && placeholder}}\">{{placeholder}}</s-placeholder>\n                <div s-ref=\"mention-editor\"\n                    style=\"{{editorStyle}}\"\n                    class=\"").concat(prefixCls, "-editor-wrapper\"\n                    contenteditable=\"{{!disabled && !readOnly}}\"\n                    on-focus=\"onFocus($event)\"\n                    on-blur=\"onBlur($event)\"\n                    on-keydown=\"onKeydown($event)\"\n                    on-input=\"onInput($event)\"\n                >\n                </div>\n            </div>\n            <s-suggestions\n                isShowSug=\"{{isShowSug}}\"\n                loading=\"{{loading}}\"\n                suggestions=\"{{suggestions}}\"\n                style=\"{{suggestionStyle}}\"\n                placement=\"{{placement}}\"\n                position=\"{{position}}\"\n                notFoundContent=\"{{notFoundContent}}\"\n            >\n            </s-suggestions>\n        </div>\n    ")
});

exports["default"] = _default;