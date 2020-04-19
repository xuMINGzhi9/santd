"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 track
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
var _default = _san["default"].defineComponent({
  template: "\n        <div class=\"slick-track\"\n            style=\"opacity: 1;{{trackStyle}}\"\n            on-transitionend=\"animationEnd\"\n        >\n            <slot/>\n        </div>\n    ",
  initData: function initData() {
    return {
      clientHeight: 0
    };
  },
  inited: function inited() {
    this.slickTracks = [];
    this.slickDots = [];
  },
  disposed: function disposed() {
    this.slickTracks = null;
    this.slickDots = null;
  },
  computed: {
    trackStyle: function trackStyle() {
      var vertical = this.data.get('vertical');
      var count = this.data.get('tracksCount');
      var easing = this.data.get('easing');
      var speed = this.data.get('speed');
      var slickIndex = this.data.get('slickIndex');
      var clientHeight = this.data.get('clientHeight');
      var clientWidth = this.data.get('clientWidth');
      var style = this.data.get('animating') ? "transition:transform ".concat(speed, "ms ").concat(easing, " 0s;") : '';

      if (vertical) {
        if (clientHeight) {
          style += "\n                        transform: translate3d(0px, -".concat(clientHeight * slickIndex, "px, 0px);\n                        height: ").concat(clientHeight * count, "px;\n                    ");
        }
      } else {
        style += "\n                    width: ".concat(clientWidth * count, "px;\n                    transform: translate3d(-").concat(clientWidth * slickIndex, "px, 0px, 0px);\n                ");
      }

      return style;
    }
  },
  attached: function attached() {
    var _this = this;

    var clientHeight = this.data.get('clientHeight');
    var children = this.el.children;
    var len = children.length;
    var postNode;
    var preNode;

    for (var i = 0; i < len; i++) {
      var node = children[i];
      var wrapper = document.createElement('div');
      wrapper.className = 'slick-slide';
      wrapper.style.outline = 'none';
      wrapper.tabIndex = -1;
      var cNode = node.cloneNode(true);
      cNode.style = 'width: 100%; display: inline-block;';
      wrapper.appendChild(cNode);
      this.el.replaceChild(wrapper, node);
      this.slickTracks.push(wrapper);
      this.slickDots.push(i);

      if (!i) {
        postNode = wrapper.cloneNode(true);
      }

      if (i === children.length - 1) {
        preNode = wrapper.cloneNode(true);
        this.el.insertBefore(preNode, this.slickTracks[0]);
        this.el.appendChild(postNode);
        this.slickTracks.unshift(preNode);
        this.slickTracks.push(postNode);
      }

      clientHeight = clientHeight || wrapper.clientHeight;
    }

    this.data.set('clientHeight', clientHeight);
    this.data.set('tracksCount', len + 2);
    this.watch('clientWidth', function (value) {
      _this.slickTracks.forEach(function (trackEl) {
        trackEl.style.width = value + 'px';
      });
    });
    this.fire('init', {
      slickDots: this.slickDots,
      slickTracks: this.slickTracks,
      clientHeight: clientHeight
    });
  },
  animationEnd: function animationEnd() {
    this.fire('transitionend');
  }
});

exports["default"] = _default;