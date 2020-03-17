"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireDefault(require("san"));

var _ajaxUploader = _interopRequireDefault(require("./src/ajaxUploader"));

var _uploadlist = _interopRequireDefault(require("./uploadlist"));

var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));

var _findIndex = _interopRequireDefault(require("lodash/findIndex"));

var _util = require("../core/util");

var _utils = require("./utils");

var _receiver = _interopRequireDefault(require("../localeprovider/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixCls = (0, _util.classCreator)('upload')();
var uploadButtonTemplate = "\n<div\n    class=\"".concat(prefixCls, " ").concat(prefixCls, "-select ").concat(prefixCls, "-select-{{listType}} {{disabled ? '").concat(prefixCls, "-disabled': ''}}\"\n    style=\"{{showButton ? '' : 'display:none;'}}\"\n>\n    <s-upload\n        showButton=\"{{showButton}}\"\n        prefixCls=\"").concat(prefixCls, "\"\n        listType=\"{{listType}}\"\n        action=\"{{action}}\"\n        directory=\"{{directory}}\"\n        beforeUpload=\"{{beforeUpload}}\"\n        customRequest=\"{{customRequest}}\"\n        data=\"{{data}}\"\n        disabled=\"{{disabled}}\"\n        headers=\"{{headers}}\"\n        multiple=\"{{multiple}}\"\n        name=\"{{name}}\"\n        openFileDialogOnClick=\"{{openFileDialogOnClick}}\"\n        beforeUpload=\"{{beforeUploadFunc(beforeUpload, fileList)}}\"\n        s-ref=\"button\"\n        on-start=\"handleStart\"\n        on-error=\"handleError\"\n        on-progress=\"handleProgress\"\n        on-success=\"handleSuccess\"\n    ><slot /></s-upload>\n</div>\n");
var uploadListTemplate = "\n    <s-uploadlist\n        s-if=\"showUploadList\"\n        listType=\"{{listType}}\"\n        fileList=\"{{fileList}}\"\n        previewFile=\"{{previewFile}}\"\n        showRemoveIcon=\"{{!disabled && showRemoveIcon}}\"\n        showPreviewIcon=\"{{showPreviewIcon}}\"\n        locale=\"{{locale}}\"\n        on-remove=\"handleManualRemove\"\n        on-preview=\"handlePreview\"\n    />\n";

var _default = _san["default"].defineComponent({
  computed: _objectSpread({}, _receiver["default"].computed, {
    dragClass: function dragClass() {
      var fileList = this.data.get('fileList') || [];
      var dragState = this.data.get('dragState');
      var disabled = this.data.get('disabled');
      var classArr = [prefixCls, "".concat(prefixCls, "-drag")];
      var uploadingExsit = fileList.some(function (file) {
        return file.status === 'uploading';
      });
      uploadingExsit && classArr.push("".concat(prefixCls, "-drag-uploading"));
      dragState === 'dragover' && classArr.push("".concat(prefixCls, "-drag-hover"));
      disabled && classArr.push("".concat(prefixCls, "-disabled"));
      return classArr;
    }
  }),
  initData: function initData() {
    return {
      componentName: 'Upload',
      type: 'select',
      multiple: false,
      action: '',
      data: {},
      accept: '',
      beforeUpload: function beforeUpload() {
        return true;
      },
      showUploadList: true,
      listType: 'text',
      disabled: false,
      openFileDialogOnClick: true,
      dragState: 'drop',
      showButton: true
    };
  },
  inited: function inited() {
    _receiver["default"].inited.call(this);

    this.data.set('fileList', this.data.get('fileList') || this.data.get('defaultFileList') || []);
  },
  components: {
    's-uploadlist': _uploadlist["default"],
    's-upload': _ajaxUploader["default"]
  },
  beforeUploadFunc: function beforeUploadFunc(beforeUpload, prevFileList) {
    var _this = this;

    return function (file, fileList, e) {
      if (!beforeUpload) {
        return true;
      }

      var result = beforeUpload(file, fileList);

      if (result === false) {
        _this.handleChange({
          file: file,
          fileList: (0, _uniqBy["default"])(prevFileList.concat(fileList.map(_utils.fileToObject)), function (item) {
            return item.uid;
          }),
          e: e
        });

        return false;
      }

      if (result && result.then) {
        return result;
      }

      return true;
    };
  },
  clearProgressTimer: function clearProgressTimer() {
    clearInterval(this.progressTimer);
  },
  autoUpdateProgress: function autoUpdateProgress(file) {
    var _this2 = this;

    var getPercent = (0, _utils.genPercentAdd)();
    var curPercent = 0;
    this.clearProgressTimer();
    this.progressTimer = setInterval(function () {
      curPercent = getPercent(curPercent);

      _this2.handleProgress({
        percent: curPercent * 100,
        file: file
      });
    }, 200);
  },
  handleStart: function handleStart(file) {
    var targetItem = (0, _utils.fileToObject)(file);
    targetItem.status = 'uploading';
    var nextFileList = this.data.get('fileList').concat();
    var fileIndex = (0, _findIndex["default"])(nextFileList, function (_ref) {
      var uid = _ref.uid;
      return uid === targetItem.uid;
    });

    if (fileIndex === -1) {
      nextFileList.push(targetItem);
    } else {
      nextFileList[fileIndex] = targetItem;
    }

    this.handleChange({
      file: targetItem,
      fileList: nextFileList
    }); // fix ie progress

    if (!window.FormData) {
      this.autoUpdateProgress(targetItem);
    }
  },
  handleError: function handleError(_ref2) {
    var err = _ref2.err,
        ret = _ref2.ret,
        file = _ref2.file,
        e = _ref2.e;
    this.clearProgressTimer();
    var fileList = this.data.get('fileList');
    var targetItem = (0, _utils.getFileItem)(file, fileList); // removed

    if (!targetItem) {
      return;
    }

    targetItem.error = err;
    targetItem.response = ret;
    targetItem.status = 'error';
    var fileIndex = (0, _findIndex["default"])(fileList, function (_ref3) {
      var uid = _ref3.uid;
      return uid === targetItem.uid;
    });
    this.data.set('fileList[' + fileIndex + ']', targetItem);
    this.handleChange({
      file: _objectSpread({}, targetItem),
      fileList: fileList,
      e: e
    });
  },
  handleProgress: function handleProgress(_ref4) {
    var e = _ref4.e,
        file = _ref4.file;
    var fileList = this.data.get('fileList');
    var targetItem = (0, _utils.getFileItem)(file, fileList); // removed

    if (!targetItem) {
      return;
    }

    targetItem.percent = e.percent;
    var fileIndex = (0, _findIndex["default"])(fileList, function (_ref5) {
      var uid = _ref5.uid;
      return uid === targetItem.uid;
    });
    this.data.set('fileList[' + fileIndex + ']', targetItem);
    this.handleChange({
      e: e,
      file: _objectSpread({}, targetItem),
      fileList: fileList
    });
  },
  handleSuccess: function handleSuccess(_ref6) {
    var ret = _ref6.ret,
        file = _ref6.file,
        e = _ref6.e;
    this.clearProgressTimer();

    try {
      if (typeof ret === 'string') {
        ret = JSON.parse(ret);
      }
    } catch (e) {}

    var fileList = this.data.get('fileList');
    var targetItem = (0, _utils.getFileItem)(file, fileList); // removed

    if (!targetItem) {
      return;
    }

    targetItem.status = 'done';
    targetItem.response = ret;
    var fileIndex = (0, _findIndex["default"])(fileList, function (_ref7) {
      var uid = _ref7.uid;
      return uid === targetItem.uid;
    });
    this.data.set('fileList[' + fileIndex + ']', targetItem);
    this.handleChange({
      file: _objectSpread({}, targetItem),
      fileList: fileList,
      e: e
    });
  },
  handleChange: function handleChange(info) {
    this.data.set('fileList', Array.from(info.fileList));
    this.fire('change', info);
    this.dispatch('UI:form-item-interact', {
      fieldValue: info,
      type: 'change',
      e: info.e
    });
  },
  handleRemove: function handleRemove(file) {
    var _this3 = this;

    var status = file.status;
    file.status = 'removed';
    var that = this;
    Promise.resolve(function () {
      that.fire('remove', file);
    }()).then(function (ret) {
      // Prevent removing file
      if (ret === false) {
        file.status = status;
        return;
      }

      var removedFileList = (0, _utils.removeFileItem)(file, _this3.data.get('fileList'));

      if (removedFileList) {
        _this3.handleChange({
          file: file,
          fileList: removedFileList
        });
      }
    });
  },
  handleManualRemove: function handleManualRemove(file) {
    var button = this.ref('button');
    var upload = button.ref('upload');

    if (upload) {
      upload.abort(file);
    }

    this.handleRemove(file);
  },
  handlePreview: function handlePreview(file) {
    this.fire('preview', file);
  },
  handleFileDrop: function handleFileDrop(e) {
    this.data.set('dragState', e.type);
  },
  template: "<span>\n        <template s-if=\"type === 'drag'\">\n        <div\n            class=\"{{dragClass}}\"\n            on-drop=\"handleFileDrop\"\n            on-dragover=\"handleFileDrop\"\n            on-dragLeave=\"handleFileDrop\"\n        >\n            <s-upload\n                prefixCls=\"".concat(prefixCls, "\"\n                listType=\"{{listType}}\"\n                action=\"{{action}}\"\n                directory=\"{{directory}}\"\n                beforeUpload=\"{{beforeUpload}}\"\n                customRequest=\"{{customRequest}}\"\n                data=\"{{data}}\"\n                disabled=\"{{disabled}}\"\n                headers=\"{{headers}}\"\n                multiple=\"{{multiple}}\"\n                name=\"{{name}}\"\n                openFileDialogOnClick=\"{{openFileDialogOnClick}}\"\n                beforeUpload=\"{{beforeUploadFunc(beforeUpload, fileList)}}\"\n                s-ref=\"button\"\n                class=\"").concat(prefixCls, "-btn\"\n                on-start=\"handleStart\"\n                on-error=\"handleError\"\n                on-progress=\"handleProgress\"\n                on-success=\"handleSuccess\"\n            ><div class=\"").concat(prefixCls, "-drag-container\"><slot /></div></s-upload>\n        </div>\n        ").concat(uploadListTemplate, "\n        </template>\n        <template s-else-if=\"listType === 'picture-card'\">\n            ").concat(uploadListTemplate, "\n            ").concat(uploadButtonTemplate, "\n        </template>\n        <template s-else>\n            ").concat(uploadButtonTemplate, "\n            ").concat(uploadListTemplate, "\n        </template>\n    </span>")
});

exports["default"] = _default;