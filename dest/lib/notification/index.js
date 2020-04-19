"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Notification = _interopRequireDefault(require("./Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var notificationInstance = {};
var defaultDuration = 4.5;
var defaultTop = 24;
var defaultBottom = 24;
var defaultPlacement = 'topRight'; // 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

var defaultGetContainer = function defaultGetContainer() {
  return document.body;
};

var typeToIcon = {
  success: 'check-circle',
  info: 'info-circle',
  error: 'close-circle',
  warning: 'exclamation-circle'
};

function setNotificationConfig(options) {
  var duration = options.duration,
      placement = options.placement,
      bottom = options.bottom,
      top = options.top,
      getContainer = options.getContainer;

  if (duration !== undefined) {
    defaultDuration = duration;
  }

  if (placement !== undefined) {
    defaultPlacement = placement;
  }

  if (bottom !== undefined) {
    defaultBottom = bottom;
  }

  if (top !== undefined) {
    defaultTop = top;
  }

  if (getContainer !== undefined) {
    defaultGetContainer = getContainer;
  }
}

function getPlacementStyle(placement) {
  var style;

  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top: defaultTop,
        bottom: 'auto'
      };
      break;

    case 'topRight':
      style = {
        right: 0,
        top: defaultTop,
        bottom: 'auto'
      };
      break;

    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom: defaultBottom
      };
      break;

    default:
      style = {
        right: 0,
        top: 'auto',
        bottom: defaultBottom
      };
      break;
  } // 需要加单位px


  Object.keys(style).forEach(function (k) {
    if (!isNaN(style[k]) && style[k] !== 0) {
      style[k] += 'px';
    }
  });
  return style;
}

function getNotificationInstance(prefixCls, placement, callback) {
  var cacheKey = "".concat(prefixCls, "-").concat(placement);

  if (notificationInstance[cacheKey]) {
    callback(notificationInstance[cacheKey]);
    return;
  }

  _Notification["default"].newInstance({
    prefixCls: prefixCls,
    className: "".concat(prefixCls, "-").concat(placement),
    style: getPlacementStyle(placement),
    getContainer: defaultGetContainer,
    closeIcon: "<s-icon slot=\"close-icon\" class=\"".concat(prefixCls, "-close-icon\" type=\"close\"/>")
  }, function (notification) {
    notificationInstance[cacheKey] = notification;
    callback(notification);
  });
}

function notice(args) {
  var btn = args.btn,
      className = args.className,
      description = args.description,
      icon = args.icon,
      key = args.key,
      message = args.message,
      _args$placement = args.placement,
      placement = _args$placement === void 0 ? defaultPlacement : _args$placement,
      _args$style = args.style,
      style = _args$style === void 0 ? {} : _args$style,
      type = args.type,
      onClose = args.onClose,
      onClick = args.onClick,
      props = _objectWithoutProperties(args, ["btn", "className", "description", "icon", "key", "message", "placement", "style", "type", "onClose", "onClick"]);

  var outerPrefixCls = args.prefixCls || 'santd-notification';
  var prefixCls = "".concat(outerPrefixCls, "-notice");
  var duration = args.duration === undefined ? defaultDuration : args.duration;
  var iconNode = '';

  if (icon) {
    iconNode = "<span class=\"".concat(prefixCls, "-icon\">").concat(icon, "</span>"); // mark
  } else if (type) {
    var iconType = typeToIcon[type];
    iconNode = "<s-icon class=\"".concat(prefixCls, "-icon ").concat(prefixCls, "-icon-").concat(type, "\" type=\"").concat(iconType, "\"/>"); // mark
  }

  var autoMarginTag = !description && iconNode ? "<span class=\"".concat(prefixCls, "-message-single-line-auto-margin\"/>") : '';
  var btnNode = btn ? "<span class=\"".concat(prefixCls, "-btn\">").concat(btn, "</span>") : '';
  var contentClass = iconNode ? "".concat(prefixCls, "-with-icon") : '';
  getNotificationInstance(outerPrefixCls, placement, function (notification) {
    notification.notice(_objectSpread({
      content: "\n                <div class=\"".concat(contentClass, "\">\n                    ").concat(iconNode, "\n                    <div class=\"").concat(prefixCls, "-message\">\n                        ").concat(autoMarginTag, "\n                        ").concat(message, "\n                    </div>\n                    <div class=\"").concat(prefixCls, "-description\">").concat(description, "</div>\n                    ").concat(btnNode, "\n                </div>\n            "),
      closable: true,
      className: className,
      duration: duration,
      key: key,
      style: style,
      onClose: onClose,
      onClick: onClick
    }, props));
  });
}

var NotificationApi = {
  config: setNotificationConfig,
  open: notice,
  close: function close(key) {
    Object.keys(notificationInstance).forEach(function (cacheKey) {
      return notificationInstance[cacheKey].removeNotice(key);
    });
  },
  destroy: function destroy() {
    Object.keys(notificationInstance).forEach(function (cacheKey) {
      notificationInstance[cacheKey].destroy();
      delete notificationInstance[cacheKey];
    });
  }
};
['success', 'info', 'warning', 'error'].forEach(function (type) {
  NotificationApi[type] = function (args) {
    return NotificationApi.open(_objectSpread({}, args, {
      type: type
    }));
  };
});
NotificationApi.warn = NotificationApi.warning;
var _default = NotificationApi;
exports["default"] = _default;