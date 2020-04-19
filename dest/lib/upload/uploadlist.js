"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _utils = require("./utils");

var _progress = _interopRequireDefault(require("../progress"));

var _icon = _interopRequireDefault(require("../icon"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _util = require("../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('upload')();

var FileIcon = _san["default"].defineComponent({
  computed: {
    isImage: function isImage() {
      var file = this.data.get('file');
      return (0, _utils.isImageUrl)(file);
    }
  },
  components: {
    's-icon': _icon["default"]
  },
  handlePreview: function handlePreview(file, e) {
    this.fire('preview', {
      file: file,
      e: e
    });
  },
  template: "<span>\n        <template s-if=\"listType === 'picture' || listType === 'picture-card'\">\n            <div\n                s-if=\"listType === 'picture-card' && file.status === 'uploading'\"\n                class=\"".concat(prefixCls, "-list-item-uploading-text\"\n            >{{locale.uploading}}</div>\n            <s-icon\n                s-else-if=\"!file.thumbUrl && !file.url\"\n                class=\"").concat(prefixCls, "-list-item-thumbnail\"\n                type=\"picture\"\n                theme=\"twoTone\"\n            />\n            <a\n                s-else\n                class=\"").concat(prefixCls, "-list-item-thumbnail\"\n                href=\"{{file.url || file.thumUrl}}\"\n                target=\"_blank\"\n                rel=\"noopener noreferrer\"\n                on-click=\"handlePreview(file, $event)\"\n            >\n                <img src=\"{{file.thumbUrl || file.url}}\" alt=\"{{file.name}}\" s-if=\"isImage && (file.thumbUrl || file.url)\" />\n                <s-icon type=\"file\" class=\"").concat(prefixCls, "-list-item-icon\" theme=\"twoTone\" s-else />\n            </a>\n        </template>\n        <s-icon s-else type=\"{{file.status === 'uploading' ? 'loading' : 'paper-clip'}}\" />\n    </span>")
});

var _default = _san["default"].defineComponent({
  dataTypes: {
    listType: _san.DataTypes.string,
    progressAttr: _san.DataTypes.object,
    showRemoveIcon: _san.DataTypes.bool,
    showPreviewIcon: _san.DataTypes.bool,
    previewFile: _san.DataTypes.func
  },
  computed: {
    items: function items() {
      var fileList = this.data.get('fileList');
      var locale = this.data.get('locale');
      return fileList.map(function (file) {
        file.message = file.response && file.response === 'string' ? file.response : file.error && file.error.statusText || locale.uploadError;
        return _objectSpread({}, file);
      });
    }
  },
  initData: function initData() {
    return {
      listType: 'text',
      progressAttr: {
        strokeWidth: 2,
        showInfo: false
      },
      showRemoveIcon: true,
      showPreviewIcon: true,
      previewFile: _utils.previewImage
    };
  },
  updated: function updated() {
    var _this = this;

    var _this$data$get = this.data.get(),
        listType = _this$data$get.listType,
        previewFile = _this$data$get.previewFile,
        fileList = _this$data$get.fileList;

    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }

    fileList.forEach(function (file, index) {
      if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File) || file.thumbUrl !== undefined) {
        return;
      }

      file.thumbUrl = '';

      if (previewFile) {
        previewFile(file.originFileObj).then(function (previewDataUrl) {
          file.thumbUrl = previewDataUrl || '';

          _this.data.set('fileList[' + index + ']', file);
        });
      }
    });
  },
  handleClose: function handleClose(file) {
    this.fire('remove', file);
  },
  handlePreview: function handlePreview(_ref) {
    var file = _ref.file,
        e = _ref.e;

    if (!this.parentComponent.listeners.preview) {
      return;
    }

    e.preventDefault();
    this.fire('preview', file);
  },
  components: {
    's-tooltip': _tooltip["default"],
    's-fileicon': FileIcon,
    's-progress': _progress["default"],
    's-icon': _icon["default"]
  },
  template: "\n        <div class=\"".concat(prefixCls, "-list ").concat(prefixCls, "-list-{{listType}}\">\n            <div\n                s-for=\"file in items trackBy file.uid\"\n                class=\"").concat(prefixCls, "-list-item ").concat(prefixCls, "-list-item-{{file.status}}\"\n            >\n                <div class=\"").concat(prefixCls, "-list-item-info\">\n                    <s-tooltip title=\"{{file.message}}\" s-if=\"file.status === 'error'\">\n                        <s-fileicon\n                            prefixCls=\"").concat(prefixCls, "\"\n                            file=\"{{file}}\"\n                            listType=\"{{listType}}\"\n                            on-preview=\"handlePreview\"\n                        />\n                        <a\n                            s-if=\"file.url\"\n                            target=\"_blank\"\n                            rel=\"noopener noreferrer\"\n                            class=\"").concat(prefixCls, "-list-item-name\"\n                            title=\"{{title.name}}\"\n                            href=\"{{file.url}}\"\n                            on-click=\"handlePreview({file, e: $event})\"\n                        >{{file.name}}</a>\n                        <span\n                            s-else\n                            class=\"").concat(prefixCls, "-list-item-name\"\n                            title=\"{{file.name}}\"\n                            on-click=\"handlePreview({file, e: $event})\"\n                        >\n                            {{file.name}}\n                        </span>\n                    </s-tooltip>\n                    <span s-else>\n                        <s-fileicon\n                            prefixCls=\"").concat(prefixCls, "\"\n                            file=\"{{file}}\"\n                            listType=\"{{listType}}\"\n                            on-preview=\"handlePreview\"\n                        />\n                        <a\n                            s-if=\"file.url\"\n                            target=\"_blank\"\n                            rel=\"noopener noreferrer\"\n                            class=\"").concat(prefixCls, "-list-item-name\"\n                            title=\"{{title.name}}\"\n                            href=\"{{file.url}}\"\n                            on-click=\"handlePreview({file, e: $event})\"\n                        >{{file.name}}</a>\n                        <span\n                            s-else\n                            class=\"").concat(prefixCls, "-list-item-name\"\n                            title=\"{{file.name}}\"\n                            on-click=\"handlePreview({file, e: $event})\"\n                        >\n                            {{file.name}}\n                        </span>\n                    </span>\n                </div>\n                <span\n                    s-if=\"listType === 'picture-card' && file.status !== 'uploading'\"\n                    class=\"").concat(prefixCls, "-list-item-actions\"\n                >\n                    <a\n                        s-if=\"showPreviewIcon\"\n                        href=\"{{file.url || file.thumbUrl}}\"\n                        target=\"_blank\"\n                        rel=\"noopener noreferrer\"\n                        style=\"{{file.url || file.thumbUrl ? '' : style}}\"\n                        title=\"{{locale.previewFile}}\"\n                        on-click=\"handlePreview({file, e: $event})\"\n                    >\n                        <s-icon type=\"eye-o\" />\n                    </a>\n                    <s-icon s-if=\"showRemoveIcon\" type=\"delete\" title=\"{{locale.removeFile}}\" on-click=\"handleClose(file)\" />\n                </span>\n                <s-icon s-else-if=\"showRemoveIcon\" type=\"close\" title=\"{{locale.removeFile}}\" on-click=\"handleClose(file)\" />\n                <div class=\"").concat(prefixCls, "-list-item-progress\" s-if=\"file.status === 'uploading'\">\n                    <s-progress s-if=\"file.percent\" type=\"line\" s-bind=\"{{progressAttr}}\" percent=\"{{file.percent}}\" />\n                </div>\n            </div>\n        </div>\n    ")
});

exports["default"] = _default;