"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _util = require("../core/util");

var _item = _interopRequireDefault(require("./item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
* @file 分页组件
*/
var prefixCls = (0, _util.classCreator)('breadcrumb')();

function getPath(path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  path = (path || '').replace(/^\//, '');
  Object.keys(params).forEach(function (key) {
    path = path.replace(":".concat(key), params[key]);
  });
  return path;
}

var Breadcrumb = _san["default"].defineComponent({
  components: {
    's-breadcrumb-item': _item["default"]
  },
  dataTypes: {
    separator: _san.DataTypes.string,
    routes: _san.DataTypes.array
  },
  initData: function initData() {
    return {
      separator: '/',
      paths: []
    };
  },
  getPaths: function getPaths(path, params) {
    var paths = this.data.get('paths');
    var result = getPath(path, params);
    result && paths.push(result);
    return paths;
  },
  getHref: function getHref(paths) {
    return "#/".concat(paths.join('/'));
  },
  getBreadcrumbName: function getBreadcrumbName(route) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!route.breadcrumbName) {
      return null;
    }

    var paramsKeys = Object.keys(params).join('|');
    var name = route.breadcrumbName.replace(new RegExp(":(".concat(paramsKeys, ")"), 'g'), function (replacement, key) {
      return params[key] || replacement;
    });
    return name;
  },
  messages: {
    santd_breadcrumb_add: function santd_breadcrumb_add(payload) {
      var separator = this.data.get('separator');

      if (separator) {
        payload.value.data.set('separator', separator);
      }
    }
  },
  template: "\n        <div class=\"".concat(prefixCls, "\">\n            <slot name=\"item\" \n                s-if=\"routes && routes.length\"\n                s-for=\"route, index in routes\"\n                var-separator=\"separator\"\n                var-index=\"index\"\n                var-route=\"route\"\n                var-params=\"params\"\n                var-paths=\"getPaths(route.path, params)\"\n            >\n                <s-breadcrumb-item separator=\"{{separator}}\" href=\"{{routes.length - 1 > index ? getHref(paths) : ''}}\">\n                    {{getBreadcrumbName(route, params)}}\n                </s-breadcrumb-item>\n            </slot>\n            <slot s-else />\n        </div>\n    ")
});

Breadcrumb.Item = _item["default"];
var _default = Breadcrumb;
exports["default"] = _default;