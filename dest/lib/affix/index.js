"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _dom = require("../core/util/dom");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 组件 affix
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */
var outerCls = (0, _util.classCreator)('affix-outer')();
var innerCls = (0, _util.classCreator)('affix')();

var _default = _san["default"].defineComponent({
  dataTypes: {
    offsetTop: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number]),
    offsetBottom: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.number])
  },
  initData: function initData() {
    return {
      affix: false,
      styles: {},
      offsetTop: 0,
      outerStyles: {}
    };
  },
  attached: function attached() {
    if (!this._scroller) {
      this._scroller = this.handleScroll.bind(this);
      (0, _dom.on)(window, 'scroll', this._scroller);
      (0, _dom.on)(window, 'resize', this._scroller);
    }
  },
  disposed: function disposed() {
    if (this._scroller) {
      (0, _dom.off)(window, 'scroll', this._scroller);
      (0, _dom.off)(window, 'resize', this._scroller);
      this._scroller = null;
    }
  },
  handleScroll: function handleScroll() {
    var elOffset = (0, _dom.getOffset)(this.el);
    var scrollTop = (0, _dom.getScrollTop)();
    var innerEl = this.ref('inner');
    var offsetTop = +this.data.get('offsetTop');
    var offsetBottom = +this.data.get('offsetBottom');
    var isAffixBottom = offsetBottom >= 0;
    var affix = this.data.get('affix');
    var affixTo = null;
    var styles = {};
    var outerStyles = {};

    if (isAffixBottom) {
      var winBottomPos = window.innerHeight + scrollTop;
      var elBottomAffixPos = elOffset.top + offsetBottom + innerEl.offsetHeight;

      if (elBottomAffixPos > winBottomPos && !affix) {
        affixTo = true;
        styles = {
          position: 'fixed',
          bottom: "".concat(offsetBottom, "px")
        };
      } else if (elBottomAffixPos < winBottomPos && affix) {
        affixTo = false;
      }
    } else {
      var elTopAffixPos = elOffset.top - offsetTop;

      if (elTopAffixPos <= scrollTop && !affix) {
        affixTo = true;
        styles = {
          position: 'fixed',
          top: "".concat(offsetTop, "px")
        };
      } else if (elTopAffixPos > scrollTop && affix) {
        affixTo = false;
      }
    }

    if (affixTo != null) {
      if (affixTo === true) {
        outerStyles = {
          width: innerEl.clientWidth + 'px',
          height: innerEl.clientHeight + 'px'
        };
        styles.left = "".concat(elOffset.left, "px");
        styles.width = "".concat(elOffset.width, "px");
      }

      this.data.set('outerStyles', outerStyles);
      this.data.set('styles', styles);
      this.data.set('affix', affixTo);
      this.fire('change', affixTo);
    }
  },
  template: "\n        <div class=\"".concat(outerCls, "\" style=\"{{outerStyles}}\">\n            <div class=\"{{affix ? '").concat(innerCls, "' : ''}}\" style=\"{{styles}}\" s-ref=\"inner\">\n                <slot></slot>\n            </div>\n        </div>\n    ")
});

exports["default"] = _default;