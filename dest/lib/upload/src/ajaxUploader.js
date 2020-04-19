"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _san = _interopRequireWildcard(require("san"));

var _request = _interopRequireDefault(require("./request"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file Santd upload ajax uploader file
 * @author mayihui@baidu.com
 **/
var _default = _san["default"].defineComponent({
  dataTypes: {
    id: _san.DataTypes.string,
    component: _san.DataTypes.string,
    prefixCls: _san.DataTypes.string,
    multiple: _san.DataTypes.bool,
    directory: _san.DataTypes.bool,
    disabled: _san.DataTypes.bool,
    accept: _san.DataTypes.string,
    data: _san.DataTypes.oneOfType([_san.DataTypes.object, _san.DataTypes.func]),
    action: _san.DataTypes.oneOfType([_san.DataTypes.string, _san.DataTypes.func]),
    headers: _san.DataTypes.object,
    beforeUpload: _san.DataTypes.func,
    customRequest: _san.DataTypes.func,
    withCredentials: _san.DataTypes.bool,
    openFileDialogOnClick: _san.DataTypes.bool
  },
  initData: function initData() {
    return {
      uid: (0, _util.getUid)(),
      reqs: {}
    };
  },
  attached: function attached() {
    this._isMounted = true;
  },
  detached: function detached() {
    this._isMounted = false;
    this.abort();
  },
  handleClick: function handleClick(e) {
    var openFileDialogOnClick = this.data.get('openFileDialogOnClick');

    if (openFileDialogOnClick) {
      var el = this.ref('fileInput');
      el && el.click();
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    var openFileDialogOnClick = this.data.get('openFileDialogOnClick');

    if (openFileDialogOnClick) {
      if (e.key === 'Enter') {
        var el = this.ref('fileInput');
        el && el.click();
      }
    }
  },
  uploadFiles: function uploadFiles(files, e) {
    var _this = this;

    var postFiles = Array.prototype.slice.call(files);
    postFiles.map(function (file) {
      file.uid = (0, _util.getUid)();
      return file;
    }).forEach(function (file) {
      _this.upload(file, postFiles, e);
    });
  },
  upload: function upload(file, fileList, e) {
    var _this2 = this;

    if (!this.data.get('beforeUpload')) {
      // always async in case use react state to keep fileList
      return setTimeout(function () {
        return _this2.post(file, e);
      }, 0);
    }

    var before = this.data.get('beforeUpload')(file, fileList, e);

    if (before && before.then) {
      before.then(function (processedFile) {
        var processedFileType = Object.prototype.toString.call(processedFile);

        if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
          return _this2.post(processedFile, e);
        }

        return _this2.post(file, e);
      })["catch"](function (e) {
        console && console.log(e); // eslint-disable-line
      });
    } else if (before !== false) {
      setTimeout(function () {
        return _this2.post(file, e);
      }, 0);
    }
  },
  post: function post(file, event) {
    var _this3 = this;

    if (!this._isMounted) {
      return;
    }

    var data = this.data.get('data');

    if (typeof data === 'function') {
      data = data(file);
    }

    new Promise(function (resolve) {
      var action = _this3.data.get('action');

      if (typeof action === 'function') {
        return resolve(action(file));
      }

      resolve(action);
    }).then(function (action) {
      var uid = file.uid;

      var request = _this3.data.get('customRequest') || _request["default"];

      var req = request({
        action: action,
        filename: _this3.data.get('name'),
        file: file,
        data: data,
        headers: _this3.data.get('headers'),
        withCredentials: _this3.data.get('withCredentials'),
        onProgress: function onProgress(e) {
          _this3.fire('progress', {
            e: e,
            file: file
          });
        },
        onSuccess: function onSuccess(ret, xhr) {
          var reqs = _this3.data.get('reqs');

          delete reqs[uid];

          _this3.data.set('reqs', reqs);

          _this3.fire('success', {
            ret: ret,
            file: file,
            xhr: xhr,
            e: event
          });
        },
        onError: function onError(err, ret) {
          var reqs = _this3.data.get('reqs');

          delete reqs[uid];

          _this3.data.set('reqs', reqs);

          _this3.fire('error', {
            err: err,
            ret: ret,
            file: file,
            e: event
          });
        }
      });

      _this3.data.set('reqs[' + uid + ']', req);

      _this3.fire('start', file);
    });
  },
  handleFileDrop: function handleFileDrop(e) {
    var _this4 = this;

    e.preventDefault();

    if (e.type === 'dragover') {
      return;
    }

    if (this.data.get('directory')) {
      (0, _util.traverseFileTree)(e.dataTransfer.items, this.uploadFiles, function (innerFile) {
        return (0, _util.attrAccept)(innerFile, _this4.data.get('accept'));
      }, e);
    } else {
      var files = Array.prototype.slice.call(e.dataTransfer.files).filter(function (file) {
        return (0, _util.attrAccept)(file, _this4.data.get('accept'));
      });
      this.uploadFiles(files, e);
    }
  },
  handleChange: function handleChange(e) {
    var files = e.target.files;
    this.uploadFiles(files, e);
    this.reset();
  },
  abort: function abort(file) {
    var reqs = this.data.get('reqs');

    if (file) {
      var uid = file;

      if (file && file.uid) {
        uid = file.uid;
      }

      if (reqs[uid]) {
        reqs[uid].abort();
        delete reqs[uid];
      }
    } else {
      Object.keys(reqs).forEach(function (uid) {
        if (reqs[uid] && reqs[uid].abort) {
          reqs[uid].abort();
        }

        delete reqs[uid];
      });
    }

    this.data.set('reqs', reqs);
  },
  reset: function reset() {
    this.data.set('uid', (0, _util.getUid)());
    var fileInput = this.ref('fileInput');
    fileInput.value = null;
  },
  template: "\n        <div\n            class=\"{{prefixCls}} {{disabled ? prefixCls + '-disabled' : ''}}\"\n            role=\"button\"\n            tabIndex=\"0\"\n            on-click=\"handleClick\"\n            on-keydown=\"handleKeyDown\"\n            on-drop=\"handleFileDrop\"\n            on-dragover=\"handleFileDrop\"\n        >\n            <input\n                id=\"{{id}}\"\n                type=\"file\"\n                s-ref=\"fileInput\"\n                key=\"{{uid}}\"\n                style=\"display: none;\"\n                accept=\"{{accept}}\"\n                directory=\"{{directory ? 'directory' : null}}\"\n                webkitdirectory=\"{{directory ? 'webkitdirectory' : null}}\"\n                multiple=\"{{multiple}}\"\n                on-change=\"handleChange\"\n            />\n            <slot />\n        </div>\n    "
});

exports["default"] = _default;