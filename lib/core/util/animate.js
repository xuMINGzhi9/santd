"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _index = _interopRequireWildcard(require("./css-animation/index"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getChildrenFromComponent(children) {
  return children.filter(function (child) {
    return child.nodeType && child.nodeType === 5;
  });
}

var transitionMap = {
  enter: 'transitionEnter',
  appear: 'transitionAppear',
  leave: 'transitionLeave'
};

var _default = _san["default"].defineComponent({
  initData: function initData() {
    return {
      currentlyAnimatingKeys: {},
      transitionEnter: true,
      transitionLeave: true,
      animation: {}
    };
  },
  attached: function attached() {
    var _this = this;

    var slot = this.slotChildren[0];
    var showProp = this.data.get('showProp') || 'visible';
    var children = slot && getChildrenFromComponent(slot.children) || [];
    this.childs = children.length ? children : [this];

    if (showProp) {
      children = this.childs.filter(function (child) {
        return child.data.get(showProp);
      });
    }

    children.forEach(function (child) {
      _this.performAppear(child.id);
    });
  },
  computed: {
    isEnterSupported: function isEnterSupported() {
      var transitionName = this.data.get('transitionName');
      var transitionEnter = this.data.get('transitionEnter');
      var animation = this.data.get('animation');
      return transitionName && transitionEnter || animation && animation.enter;
    },
    isAppearSupported: function isAppearSupported() {
      var transitionName = this.data.get('transitionName');
      var transitionAppear = this.data.get('transitionAppear');
      var animation = this.data.get('animation');
      return transitionName && transitionAppear || animation && animation.appear;
    },
    isLeaveSupported: function isLeaveSupported() {
      var transitionName = this.data.get('transitionName');
      var transitionLeave = this.data.get('transitionLeave');
      var animation = this.data.get('animation');
      return transitionName && transitionLeave || animation && animation.leave;
    }
  },
  updated: function updated() {
    var currentlyAnimatingKeys = this.data.get('currentlyAnimatingKeys');
    var showProp = this.data.get('showProp');
    var keyToEnter;
    var keyToLeave;

    if (showProp) {
      this.childs.forEach(function (child) {
        if (currentlyAnimatingKeys[child.id]) {
          return;
        }

        if (child.data.get(showProp)) {
          keyToEnter = child.id;
        } else {
          keyToLeave = child.id;
        }
      });
    }

    if (keyToEnter) {
      this.performEnter(keyToEnter);
    }

    if (keyToLeave) {
      this.performLeave(keyToLeave);
    }
  },
  performAppear: function performAppear(key) {
    var _this2 = this;

    this.childs.forEach(function (child) {
      if (child.id === key) {
        _this2.data.set('currentlyAnimatingKeys.' + key, true, {
          silent: true
        });

        _this2.componentWillAppear(child, _this2.handleDoneAdding.bind(_this2, key, 'appear', child));
      }
    });
  },
  performEnter: function performEnter(key) {
    var _this3 = this;

    this.childs.forEach(function (child) {
      if (child.id === key) {
        _this3.data.set('currentlyAnimatingKeys.' + key, true, {
          silent: true
        });

        _this3.componentWillEnter(child, _this3.handleDoneAdding.bind(_this3, key, 'enter', child));
      }
    });
  },
  performLeave: function performLeave(key) {
    var _this4 = this;

    this.childs.forEach(function (child) {
      if (child.id === key) {
        child.el.style.display = 'block';

        _this4.data.set('currentlyAnimatingKeys.' + key, true, {
          silent: true
        });

        _this4.componentWillLeave(child, _this4.handleDoneLeaving.bind(_this4, key, 'leave', child));
      }
    });
  },
  componentWillAppear: function componentWillAppear(node, done) {
    var isAppearSupported = this.data.get('isAppearSupported');

    if (isAppearSupported) {
      this.transition(node, 'appear', done);
    } else {
      done();
    }
  },
  componentWillEnter: function componentWillEnter(node, done) {
    var isEnterSupported = this.data.get('isEnterSupported');

    if (isEnterSupported) {
      this.transition(node, 'enter', done);
    } else {
      done();
    }
  },
  componentWillLeave: function componentWillLeave(node, done) {
    var isLeaveSupported = this.data.get('isLeaveSupported');

    if (isLeaveSupported) {
      this.transition(node, 'leave', done);
    } else {
      done();
    }
  },
  transition: function transition(child, animationType, callback) {
    var _this5 = this;

    var transitionName = this.data.get('transitionName');
    var nameIsObj = _typeof(transitionName) === 'object';
    var animation = this.data.get('animation') || {};
    this.stop();

    var end = function end() {
      _this5.stopper = null;
      callback();
    };

    if ((_index.isCssAnimationSupported || !animation[animationType]) && transitionName && this.data.get(transitionMap[animationType])) {
      var name = nameIsObj ? transitionName[animationType] : "".concat(transitionName, "-").concat(animationType);
      var activeName = "".concat(name, "-active");

      if (nameIsObj && transitionName["".concat(animationType, "Active")]) {
        activeName = transitionName["".concat(animationType, "Active")];
      }

      this.stopper = (0, _index["default"])(child.el, {
        name: name,
        active: activeName
      }, end);
    } else {
      this.stopper = animation[animationType](child.el, end);
    }
  },
  handleDoneAdding: function handleDoneAdding(key, animationType) {
    this.data.set('currentlyAnimatingKeys.' + key, false, {
      silent: true
    });
  },
  handleDoneLeaving: function handleDoneLeaving(key, animationType, child) {
    // 解决动画结束后闪一下的问题，设置了子的属性后要到下一次nextTick才会刷新，所以会闪
    child.el && (child.el.style.display = '');
    this.data.set('currentlyAnimatingKeys.' + key, false, {
      silent: true
    });
  },
  stop: function stop() {
    var stopper = this.stopper;

    if (stopper) {
      this.stopper = null;
      stopper.stop();
    }
  },
  template: "\n        <div class=\"{{!visible ? hiddenClassName : ''}}\"><slot /></div>\n    "
});

exports["default"] = _default;