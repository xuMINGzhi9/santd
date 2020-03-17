"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _dom = require("../core/util/dom");

var _Event = _interopRequireDefault(require("../core/util/css-animation/Event"));

var _util = require("../core/util");

var _icon = _interopRequireDefault(require("../icon"));

var _button = _interopRequireDefault(require("../button"));

var _Notice = _interopRequireDefault(require("./Notice"));

var _Dialog = _interopRequireDefault(require("../modal/Dialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Notification = _san["default"].defineComponent({
  template: '<div class="{{prefixCls}}" style="{{style | css}}"></div>',
  dataTypes: {
    prefixCls: _san.DataTypes.string,
    animation: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.object]),
    transitionName: _san.DataTypes.string,
    maxCount: _san.DataTypes.number,
    closeIcon: _san.DataTypes.any
  },
  components: {
    's-icon': _icon["default"],
    's-button': _button["default"]
  },
  computed: {
    getTransitionName: function getTransitionName() {
      var data = this.data;
      var transitionName = data.get('transitionName');
      var animation = data.get('animation');
      var prefixCls = data.get('prefixCls');

      if (!transitionName && animation) {
        transitionName = "".concat(prefixCls, "-").concat(animation);
      }

      return transitionName;
    }
  },
  filters: _Dialog["default"],
  fadeTrans: function fadeTrans(transitionName, disableTransition) {
    return {
      enter: function enter(el, done) {
        if (disableTransition) {
          done();
          return;
        }

        var cls = ["".concat(transitionName, "-enter"), "".concat(transitionName, "-enter-active")].join(' ');

        var end = function end() {
          _Event["default"].removeEndEventListener(el, end);

          (0, _dom.removeClass)(el, cls);
          done();
        };

        _Event["default"].addEndEventListener(el, end);

        (0, _dom.addClass)(el, cls);
      },
      leave: function leave(el, done) {
        if (disableTransition) {
          done();
          return;
        }

        var cls = ["".concat(transitionName, "-leave"), "".concat(transitionName, "-leave-active")].join(' ');

        var end = function end() {
          _Event["default"].removeEndEventListener(el, end);

          (0, _dom.removeClass)(el, cls);
          done();
        };

        _Event["default"].addEndEventListener(el, end);

        (0, _dom.addClass)(el, cls);
      }
    };
  },
  initData: function initData() {
    return {
      prefixCls: 'santd-notification',
      animation: 'fade',
      style: {
        top: '65px',
        left: '50%'
      },
      // maxCount: 3, // @test: 最大notice个数
      notices: {}
    };
  },
  add: function add(notice) {
    var _this = this;

    var data = this.data;
    var key = notice.key = notice.key || (0, _util.guid)();

    var _data$get = data.get(),
        closeIcon = _data$get.closeIcon,
        maxCount = _data$get.maxCount,
        notices = _data$get.notices;

    if (!this.childList) {
      this.childList = [];
    }

    var noticeIndex = this.childList.map(function (v) {
      return v && v.data.get('key');
    }).indexOf(key);
    var method = 'push';

    if (noticeIndex !== -1) {
      notice.disableTrasition = true;
      method = 'splice';
    } else if (maxCount && this.childList.length >= maxCount) {
      method = 'shift';
    }

    notices[key] = notice;
    data.set('notices', notices);
    this.nextTick(function () {
      var child = new _Notice["default"]({
        owner: _this,
        source: "<s-notice\n                    s-transition=\"fadeTrans(getTransitionName, notices['".concat(key, "'].disableTrasition)\"\n                    className=\"{{notices['").concat(key, "'].className}}\"\n                    closable=\"{{notices['").concat(key, "'].closable}}\"\n                    duration=\"{{notices['").concat(key, "'].duration}}\"\n                    prefixCls=\"{{prefixCls}}\"\n                    style=\"{{notices['").concat(key, "'].style | css}}\"\n                    key=\"{{notices['").concat(key, "'].key}}\"\n                    onClose=\"{{notices['").concat(key, "'].onClose}}\"\n                >\n                    ").concat(closeIcon || '', "\n                </s-notice>")
      });
      child.on('close', function (e) {
        _this.remove(notice.key);
      });
      child.on('click', function (e) {
        notice.onClick && notice.onClick();
      });

      if ('splice' === method) {
        // 按key更新流程
        var oldChild = _this.childList[noticeIndex];
        var nextSibling = oldChild.el.nextElementSibling; // 1、隐藏待替换内容

        oldChild.el.style.display = 'none';
        oldChild.un('close'); // 2、因为oldChild和child都会走一遍remove流程，添加child到指定位置并冗余添加一份数据

        child.attach(_this.el, nextSibling);

        _this.childList.splice(noticeIndex + 1, 0, child); // 3、接下来移除oldChild并删除数据


        oldChild.detach();

        _this.childList.splice(noticeIndex, 1);
      } else {
        if ('shift' === method) {
          _this.remove(_this.childList[0].data.get('key'));
        }

        child.attach(_this.el);

        _this.childList.push(child);
      }

      var Content = _san["default"].defineComponent({
        template: notice.content,
        components: {
          's-icon': _icon["default"],
          's-button': _button["default"]
        },
        btnClick: function btnClick() {
          notice.btnClick && notice.btnClick();
        }
      });

      new Content().attach(child.ref('content'));
    });
  },
  remove: function remove(key) {
    var atIndex = -1;
    var atChild = null;
    this.childList.forEach(function (child, index) {
      if (child && child.data.get('key') === key) {
        atIndex = index;
        atChild = child;
      }
    });

    if (-1 === atIndex) {
      return;
    }

    var onClose = atChild.data.get('onClose');
    onClose && onClose();
    atChild.un('close');
    atChild.detach();
    this.childList.splice(atIndex, 1);
    this.data.apply('notices', function (notices) {
      delete notices[key];
      return notices;
    });
  }
});

Notification.newInstance = function (properties, callback) {
  var _ref = properties || {},
      getContainer = _ref.getContainer,
      props = _objectWithoutProperties(_ref, ["getContainer"]);

  var instance = new Notification({
    data: props
  });
  instance.attach(document.body);

  if (getContainer) {
    instance.attach(getContainer());
  } else {
    instance.attach(document.body);
  }

  var called = false;

  function ref(notification) {
    if (called) {
      return;
    }

    called = true;
    callback({
      component: notification,
      notice: function notice(props) {
        notification.add(props);
      },
      removeNotice: function removeNotice(key) {
        notification.remove(key);
      },
      destroy: function destroy() {
        notification.dispose();
      }
    });
  }

  ref(instance);
};

var _default = Notification;
exports["default"] = _default;