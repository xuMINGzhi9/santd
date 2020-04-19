"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("../core/util");

var _Notification = _interopRequireDefault(require("../notification/Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 组件 message
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/message-cn/
 */
var prefixCls = (0, _util.classCreator)('message')();
var messageInstance;
var key = 1;
var defaultDuration = 3;

var defaultGetContainer = function defaultGetContainer() {
  return document.body;
};

var defaultMaxCount;
var defaultTop;
var defaultTransitionName = 'move-up';

function getMessageInstance() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  if (messageInstance) {
    callback(messageInstance);
    return;
  }

  _Notification["default"].newInstance({
    prefixCls: prefixCls,
    transitionName: defaultTransitionName,
    style: {
      top: "".concat(defaultTop, "px")
    },
    // 覆盖原来的样式
    getContainer: defaultGetContainer,
    maxCount: defaultMaxCount
  }, function (instance) {
    if (messageInstance) {
      callback(messageInstance);
      return;
    }

    messageInstance = instance;
    callback(instance);
  });
}

function notice(args) {
  var duration = args.duration !== undefined ? args.duration : defaultDuration;
  var iconType = {
    info: 'info-circle',
    success: 'check-circle',
    error: 'close-circle',
    warning: 'exclamation-circle',
    loading: 'loading'
  }[args.type];
  var target = key++;
  var closePromise = new Promise(function (resolve) {
    var callback = function callback() {
      if ((0, _util.type)(args.onClose, 'function')) {
        args.onClose();
      }

      return resolve(true);
    };

    getMessageInstance(function (instance) {
      var className = args.type ? " ".concat(prefixCls, "-").concat(args.type) : '';
      var defaultIcon = "\n                <s-icon type=\"".concat(iconType, "\" theme=\"").concat(iconType === 'loading' ? 'outlined' : 'filled', "\" />\n            ");
      var iconNode = args.icon ? args.icon : iconType ? defaultIcon : '';
      instance.notice({
        key: target,
        duration: duration,
        style: {},
        content: "\n                    <div class=\"".concat(prefixCls, "-custom-content").concat(className, "\">\n                        ").concat(iconNode, "\n                        <span>").concat(args.content, "</span>\n                    </div>\n                "),
        onClose: callback
      });
    });
  });

  var result = function result() {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };

  result.then = function (filled, rejected) {
    return closePromise.then(filled, rejected);
  };

  result.promise = closePromise;
  return result;
}

var MessageApi = {
  open: notice,
  config: function config(options) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      messageInstance = null; // delete messageInstance for new defaultTop
    }

    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }

    if (options.prefixCls !== undefined) {
      prefixCls = options.prefixCls;
    }

    if (options.getContainer !== undefined) {
      defaultGetContainer = options.getContainer;
    }

    if (options.transitionName !== undefined) {
      defaultTransitionName = options.transitionName;
      messageInstance = null; // delete messageInstance for new defaultTop
    }

    if (options.maxCount !== undefined) {
      defaultMaxCount = options.maxCount;
      messageInstance = null; // delete messageInstance for new defaultTop
    }
  },
  destroy: function destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  }
};
['success', 'info', 'warning', 'error', 'loading'].forEach(function (type) {
  MessageApi[type] = function (content, duration, onClose) {
    if (typeof duration === 'function') {
      onClose = duration;
      duration = undefined;
    }

    return MessageApi.open({
      content: content,
      duration: duration,
      type: type,
      onClose: onClose
    });
  };
});
MessageApi.warn = MessageApi.warning;
var _default = MessageApi;
exports["default"] = _default;