"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _util = require("../core/util");

var _track = _interopRequireDefault(require("./track"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 carousel
 * @author chenkai13 <chenkai13@baidu.com>
 */
var prefixCls = (0, _util.classCreator)('carousel')();

var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"".concat(prefixCls, " {{vertical ? '").concat(prefixCls, "-vertical' : ''}}\">\n            <div class=\"slick-slider slick-initialized {{vertical ? 'slick-vertical' : ''}}\" style=\"opacity:{{showCompo ? '1' : '0'}}\">\n                <div class=\"slick-list\"\n                    style=\"{{vertical && clientHeight ? 'height:' + clientHeight + 'px' : ''}}\">\n                    <s-track\n                        clientWidth=\"{{clientWidth}}\"\n                        vertical=\"{{vertical}}\"\n                        slickIndex=\"{{slickIndex}}\"\n                        speed=\"{{speed}}\"\n                        easing=\"{{easing}}\"\n                        animating=\"{{animating}}\"\n                        on-init=\"handleInit\"\n                        on-transitionend=\"animationEnd\"\n                    ><slot />\n                    </s-track>\n                </div>\n                <ul class=\"slick-dots slick-dots-{{dotPosition}}\" style=\"display: block;\" s-if=\"dots\">\n                    <li s-for=\"dot in slickDots\" class=\"{{dot === curIndex ? 'slick-active' : ''}}\">\n                        <button on-click=\"handleChange(dot)\">{{dot}}</button>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    "),
  initData: function initData() {
    return {
      clientWidth: 0,
      clientHeight: 0,
      curIndex: 0,
      slickIndex: 1,
      slickDots: [],
      dontAnimate: false,
      animating: false,
      dots: true,
      easing: 'linear',
      dotPosition: 'bottom',
      effect: 'scrollx',
      autoplay: false,
      autoplaySpeed: 3000,
      speed: 500
    };
  },
  components: {
    's-track': _track["default"]
  },
  computed: {
    vertical: function vertical() {
      var dotPosition = this.data.get('dotPosition');
      return dotPosition === 'left' || dotPosition === 'right';
    }
  },
  next: function next() {
    var _this$data$get = this.data.get(),
        curIndex = _this$data$get.curIndex,
        slickDots = _this$data$get.slickDots;

    this.handleChange((curIndex + 1) % slickDots.length);
  },
  prev: function prev() {
    var _this$data$get2 = this.data.get(),
        curIndex = _this$data$get2.curIndex,
        slickDots = _this$data$get2.slickDots;

    curIndex--;
    this.handleChange(curIndex > -1 ? curIndex : slickDots.length - 1);
  },
  goTo: function goTo() {
    var slideNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var len = this.data.get('slickDots').length;
    var index = Math.min(Math.max(0, slideNumber), len - 1);
    this.handleChange(index);
  },
  handleInit: function handleInit(e) {
    var _this = this;

    this.data.set('slickDots', e.slickDots);
    setTimeout(function () {
      _this.data.set('clientHeight', e.clientHeight);

      _this.data.set('showCompo', true);
    }, 0);
  },
  attached: function attached() {
    var _this2 = this;

    var clientWidth = this.el.clientWidth;
    this.data.set('clientWidth', clientWidth);
    var autoplay = this.data.get('autoplay');
    var autoplaySpeed = this.data.get('autoplaySpeed');

    if (autoplay && !this.autoplayTimer) {
      this.autoplayTimer = setInterval(function () {
        _this2.handleChange(_this2.data.get('curIndex') + 1);
      }, autoplaySpeed);
    }
  },
  detached: function detached() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  },
  handleChange: function handleChange(index) {
    var _this3 = this;

    var len = this.data.get('slickDots').length;
    var curIndex = this.data.get('curIndex');
    var slickIndex = index + 1;

    if (index >= len) {
      index = 0;
      setTimeout(function () {
        _this3.data.set('slickIndex', 1);
      }, this.data.get('speed') * 2);
    }

    this.fire('beforeChange', {
      from: curIndex,
      to: index
    });
    this.data.set('curIndex', index);
    this.data.set('slickIndex', slickIndex);
    this.data.set('animating', true);
    this.fire('afterChange', index);
  },
  animationEnd: function animationEnd() {
    this.data.set('animating', false);
  }
});

exports["default"] = _default;