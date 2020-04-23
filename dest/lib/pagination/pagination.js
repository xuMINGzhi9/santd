"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _input = _interopRequireDefault(require("../input"));

var _keyCode = _interopRequireDefault(require("../core/util/keyCode"));

var _pager = _interopRequireDefault(require("./pager"));

var _options = _interopRequireDefault(require("./options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd pagination main file
 **/
var prevTemplate = "\n    <li\n        title=\"{{showTitle ? locale.prev_page : ''}}\"\n        on-click=\"handlePrev\"\n        on-keypress=\"runIfEnterPrev\"\n        tabIndex=\"{{hasPrev ? 0 : ''}}\"\n        class=\"{{hasPrev ? '' : prefixCls + '-disabled'}} {{prefixCls + '-prev'}}\"\n        aria-disabled=\"{{!hasPrev}}\"\n    >\n        <slot name=\"itemRender\" var-type=\"{{'prev'}}\" s-if=\"{{itemRender}}\" />\n        <slot name=\"prevIcon\" s-else />\n    </li>\n";
var nextTemplate = "\n    <li\n        title=\"{{showTitle ? locale.next_page : ''}}\"\n        on-click=\"handleNext\"\n        on-keypress=\"runIfEnterNext\"\n        tabIndex=\"{{hasNext ? 0 : ''}}\"\n        class=\"{{hasNext ? '' : prefixCls + '-disabled'}} {{prefixCls + '-next'}}\"\n        aria-disabled=\"{{!hasNext}}\"\n    >\n        <slot name=\"itemRender\" var-type=\"{{'next'}}\" s-if=\"{{itemRender}}\" />\n        <slot name=\"nextIcon\" s-else />\n    </li>\n";
var simpleTemplate = "\n    ".concat(prevTemplate, "\n    <li\n        title=\"{{showTitle ? current + '/' + allPages : ''}}\"\n        class=\"{{prefixCls + '-simple-pager'}}\"\n    >\n        <input\n            type=\"text\"\n            value=\"{{currentInputValue}}\"\n            size=\"3\"\n            ok-keydown=\"handleKeyDown\"\n            on-keyup=\"handleKeyUp\"\n            on-change=\"handleKeyUp\"\n        />\n        <span class=\"{{prefixCls + '-slash'}}\">/</span>\n        {{allPages}}\n    </li>\n    ").concat(nextTemplate, "\n    <li\n        s-if=\"showQuickJumper && showQuickJumper.goButton\"\n        title=\"{{showTitle ? locale.jump_to + current + '/' + allPages : ''}}\"\n        class=\"{{prefixCls + '-simple-pager'}}\"\n    >\n        <button\n            s-if=\"hasGoButton\"\n            type=\"button\"\n            on-click=\"handleGoTo\"\n            on-keyup=\"handleGoTo\"\n        >{{locale.jump_to_confirm}}</button>\n        <span s-else on-click=\"handleGoTo\" on-keyup=\"handleGoTo\">{{showQuickJumper.goButton}}</span>\n    </li>\n\n");

var _default = _san["default"].defineComponent({
  DataTypes: {
    prefixCls: _san.DataTypes.string,
    current: _san.DataTypes.number,
    defaultCurrent: _san.DataTypes.number,
    total: _san.DataTypes.number,
    pageSize: _san.DataTypes.number,
    defaultPageSize: _san.DataTypes.number,
    hideOnSinglePage: _san.DataTypes.bool,
    showSizeChanger: _san.DataTypes.bool,
    showLessItems: _san.DataTypes.bool,
    selectSizeChange: _san.DataTypes.func,
    showPrevNextJumpers: _san.DataTypes.bool,
    showQuiclJumper: _san.DataTypes.oneOfType([_san.DataTypes.bool, _san.DataTypes.object]),
    showTitle: _san.DataTypes.bool,
    pageSizeOptions: _san.DataTypes.array,
    showTotal: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      defaultCurrent: 1,
      total: 0,
      defaultPageSize: 10,
      onChange: function onChange() {},
      selectPrefixCls: 'select',
      prefixCls: 'pagination',
      selectComponentClass: null,
      hideOnSinglePage: false,
      showPrevNextJumpers: true,
      showQuickJumper: false,
      showSizeChanger: false,
      showLessItems: false,
      showTitle: true,
      pageSizeOptions: [10, 20, 30, 40],
      onShowSizeChange: function onShowSizeChange() {}
    };
  },
  inited: function inited() {
    var current = this.data.get('current') || this.data.get('defaultCurrent');
    var pageSize = this.data.get('pageSize') || this.data.get('defaultPageSize');
    this.data.set('current', current);
    this.data.set('currentInputValue', current);
    this.data.set('pageSize', pageSize);
    this.data.get('hasGoButton', typeof this.data.get('showQuickJumper.goButton') === 'boolean');
  },
  components: {
    's-input': _input["default"],
    's-pager': _pager["default"],
    's-options': _options["default"]
  },
  computed: {
    classes: function classes() {
      var simple = this.data.get('simple');
      var prefixCls = this.data.get('prefixCls');
      var size = this.data.get('size');
      var disabled = this.data.get('disabled');
      var classArr = [prefixCls];

      if (simple) {
        classArr.push(prefixCls + '-simple');
        disabled && classArr.push("".concat(prefixCls, "-disabled"));
        return classArr;
      }

      size === 'small' && classArr.push('mini');
      disabled && classArr.push("".concat(prefixCls, "-disabled"));
      return classArr;
    },
    hasPrev: function hasPrev() {
      return this.data.get('current') > 1;
    },
    hasNext: function hasNext() {
      return this.data.get('current') < this.data.get('allPages');
    },
    allPages: function allPages() {
      return Math.floor((this.data.get('total') - 1) / this.data.get('pageSize')) + 1;
    },
    pageList: function pageList() {
      var allPages = this.data.get('allPages');
      var pageBufferSize = this.data.get('showLessItems') ? 1 : 2;
      var current = this.data.get('current');
      var prefixCls = this.data.get('prefixCls');
      var pageList = [];

      if (allPages <= 5 + pageBufferSize * 2) {
        for (var i = 1; i <= allPages; i++) {
          pageList.push({
            type: 'page',
            page: i
          });
        }
      } else {
        var left = Math.max(1, current - pageBufferSize);
        var right = Math.min(current + pageBufferSize, allPages);

        if (current - 1 <= pageBufferSize) {
          right = 1 + pageBufferSize * 2;
        }

        if (allPages - current <= pageBufferSize) {
          left = allPages - pageBufferSize * 2;
        }

        for (var _i = left; _i <= right; _i++) {
          pageList.push({
            type: 'page',
            page: _i
          });
        }

        if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
          pageList.length && (pageList[0].className = prefixCls + '-item-after-jump-prev');
          pageList.unshift({
            type: 'jumpPrev'
          });
        }

        if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
          pageList.length && (pageList[pageList.length - 1].className = prefixCls + '-item-before-jump-next');
          pageList.push({
            type: 'jumpNext'
          });
        }

        if (left !== 1) {
          pageList.unshift({
            type: 'page',
            page: 1
          });
        }

        if (right !== allPages) {
          pageList.push({
            type: 'page',
            page: allPages
          });
        }
      }

      return pageList;
    },
    totalText: function totalText() {
      var showTotal = this.data.get('showTotal');
      var total = this.data.get('total');
      var current = this.data.get('current');
      var pageSize = this.data.get('pageSize');

      if (showTotal) {
        return showTotal(total, [total === 0 ? 0 : (current - 1) * pageSize + 1, current * pageSize > total ? total : current * pageSize]);
      }

      return false;
    }
  },
  isValid: function isValid(page) {
    return typeof page === 'number' && isFinite(page) && Math.floor(page) === page && page >= 1 && page !== this.data.get('current');
  },
  handlePrev: function handlePrev() {
    this.data.get('hasPrev') && this.handleChange(this.data.get('current') - 1);
  },
  handleNext: function handleNext() {
    this.data.get('hasNext') && this.handleChange(this.data.get('current') + 1);
  },
  handleJumpPrev: function handleJumpPrev() {
    var jumpPrevPage = Math.max(1, this.data.get('current') - (this.data.get('showLessItems') ? 3 : 5));
    this.handleChange(jumpPrevPage);
  },
  handleJumpNext: function handleJumpNext() {
    var current = this.data.get('current');
    var allPages = this.data.get('allPages');
    var jumpNextPage = Math.min(allPages, current + (this.data.get('showLessItems') ? 3 : 5));
    this.handleChange(jumpNextPage);
  },
  handleKeyDown: function handleKeyDown(e) {
    if (e.keyCode === _keyCode["default"].ARROW_UP || e.keyCode === _keyCode["default"].ARROW_DOWN) {
      e.preventDefault();
    }
  },
  handleKeyUp: function handleKeyUp(e) {
    var inputValue = e.target.value;
    var currentInputValue = this.data.get('currentInputValue');
    var value;
    value = isNaN(Number(inputValue)) ? currentInputValue : Number(inputValue);

    if (value !== currentInputValue) {
      this.data.set('currentInputValue', value);
    }

    if (e.keyCode === _keyCode["default"].ENTER) {
      this.handleChange(value);
    } else if (e.keyCode === _keyCode["default"].ARROW_UP) {
      this.handleChange(value - 1);
    } else if (e.keyCode === _keyCode["default"].ARROW_DOWN) {
      this.handleChange(value + 1);
    }
  },
  runIfEnter: function runIfEnter(event, callback) {
    if (event.key === 'Enter' || event.charCode === 13) {
      for (var _len = arguments.length, restParams = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        restParams[_key - 2] = arguments[_key];
      }

      callback.apply(void 0, restParams);
    }
  },
  runIfEnterPrev: function runIfEnterPrev(e) {
    this.runIfEnter(e, this.prev);
  },
  runIfEnterNext: function runIfEnterNext(e) {
    this.runIfEnter(e, this.next);
  },
  runIfEnterJumpPrev: function runIfEnterJumpPrev(e) {
    this.runIfEnter(e, this.jumpPrev);
  },
  runIfEnterJumpNext: function runIfEnterJumpNext(e) {
    this.runIfEnter(e, this.jumpNext);
  },
  handleChange: function handleChange(page) {
    var disabled = this.data.get('disabled');

    if (this.isValid(page) && !disabled) {
      var allPages = this.data.get('allPages');

      if (page > allPages) {
        page = allPages;
      }

      this.data.set('current', page);
      this.data.set('currentInputValue', page);
      var pageSize = this.data.get('pageSize');
      this.fire('change', {
        page: page,
        pageSize: pageSize
      });
    }
  },
  handleChangeSize: function handleChangeSize(size) {
    var current = this.data.get('current');
    var total = this.data.get('total');
    var newCurrent = Math.floor((total - 1) / size) + 1;
    current = current > newCurrent ? newCurrent : current;

    if (newCurrent === 0) {
      current = this.data.get('current');
    }

    this.data.set('pageSize', size);
    this.data.set('current', current);
    this.data.set('currentInputValue', current);
    this.fire('showSizeChange', {
      current: current,
      pageSize: size
    });
  },
  handleGoTo: function handleGoTo(e) {
    if (e.keyCode === _keyCode["default"].ENTER || e.type === 'click') {
      this.handleChange(this.data.get('currentInputValue'));
    }
  },
  template: "<ul class=\"{{classes}}\">\n        <template s-if=\"simple && (hideOnSinglePage !== true || total > pageSize)\">\n            ".concat(simpleTemplate, "\n        </template>\n        <template s-else-if=\"hideOnSinglePage !== true || total > pageSize\">\n            <li\n                s-if=\"totalText\"\n                class=\"{{prefixCls}}-total-text\"\n            >\n                {{totalText}}\n            </li>\n            ").concat(prevTemplate, "\n            <template s-for=\"item in pageList\">\n            <s-pager\n                s-if=\"item.type === 'page'\"\n                key=\"{{item.page}}\"\n                page=\"{{item.page}}\"\n                active=\"{{current === item.page}}\"\n                rootPrefixCls=\"{{prefixCls}}\"\n                showTitle=\"{{showTitle}}\"\n                locale=\"{{locale}}\"\n                on-click=\"handleChange\"\n                on-keyPress=\"runIfEnter\"\n                itemRender=\"{{itemRender}}\"\n            ><slot name=\"itemRender\" slot=\"itemRender\" var-type=\"{{type}}\" var-page=\"{{page}}\" /></s-pager>\n            <li\n                s-if=\"item.type === 'jumpPrev'\"\n                class=\"{{prefixCls}}-jump-prev {{prefixCls}}-jump-prev-custom-icon\"\n                tabIndex=\"0\"\n                key=\"prev\"\n                on-click=\"handleJumpPrev\"\n                on-keypress=\"runIfEnterJumpPrev\"\n            >\n                <slot name=\"jumpPrevIcon\" />\n            </li>\n            <li\n                s-if=\"item.type === 'jumpNext'\"\n                class=\"{{prefixCls}}-jump-next {{prefixCls}}-jump-next-custom-icon\"\n                tabIndex=\"0\"\n                key=\"next\"\n                on-click=\"handleJumpNext\"\n                on-keypress=\"runIfEnterJumpNext\"\n            >\n                <slot name=\"jumpNextIcon\" />\n            </li>\n            </template>\n            ").concat(nextTemplate, "\n            <s-options\n                rootPrefixCls=\"{{prefixCls}}\"\n                size=\"{{size}}\"\n                selectComponentClass=\"{{selectComponentClass}}\"\n                selectPrefixCls=\"{{selectPrefixCls}}\"\n                showSizeChanger=\"{{showSizeChanger}}\"\n                current=\"{{current}}\"\n                pageSize=\"{{pageSize}}\"\n                pageSizeOptions=\"{{pageSizeOptions}}\"\n                quickGo=\"{{showQuickJumper && total > pageSize}}\"\n                goButton=\"{{showQuickJumper.goButton}}\"\n                locale=\"{{locale}}\"\n                disabled=\"{{disabled}}\"\n                on-changeSize=\"handleChangeSize\"\n                on-quickGo=\"handleChange\"\n            >\n            </s-options>\n        </template>\n    </ul>")
});

exports["default"] = _default;