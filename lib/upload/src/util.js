"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUid = getUid;
exports.attrAccept = attrAccept;
exports.traverseFileTree = traverseFileTree;

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @file Santd upload util file
 **/
var now = +new Date();
var index = 0;

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function loopFiles(item, callback) {
  var dirReader = item.createReader();
  var fileList = [];

  function sequence() {
    dirReader.readEntries(function (entries) {
      var entryList = Array.prototype.slice.apply(entries);
      fileList = [].concat(_toConsumableArray(fileList), _toConsumableArray(entryList)); // Check if all the file has been viewed

      var isFinished = !entryList.length;

      if (isFinished) {
        callback(fileList);
      } else {
        sequence();
      }
    });
  }

  sequence();
}

function getUid() {
  return "upload-".concat(now, "-").concat(++index);
}

function attrAccept(file, acceptedFiles) {
  if (file && acceptedFiles) {
    var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
    var fileName = file.name || '';
    var mimeType = file.type || '';
    var baseMimeType = mimeType.replace(/\/.*$/, '');
    return acceptedFilesArray.some(function (type) {
      var validType = type.trim();

      if (validType.charAt(0) === '.') {
        return endsWith(fileName.toLowerCase(), validType.toLowerCase());
      } else if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }

      return mimeType === validType;
    });
  }

  return true;
}

function traverseFileTree(files, callback, isAccepted) {
  var innerTraverseFileTree = function innerTraverseFileTree(item) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (item.isFile) {
      item.file(function (file) {
        if (isAccepted(file)) {
          // https://github.com/ant-design/ant-design/issues/16426
          if (item.fullPath && !file.webkitRelativePath) {
            Object.defineProperties(file, {
              webkitRelativePath: {
                writable: true
              }
            });
            file.webkitRelativePath = item.fullPath.replace(/^\//, '');
            Object.defineProperties(file, {
              webkitRelativePath: {
                writable: false
              }
            });
          }

          callback([file]);
        }
      });
    } else if (item.isDirectory) {
      loopFiles(item, function (entries) {
        entries.forEach(function (entryItem) {
          innerTraverseFileTree(entryItem, "".concat(path).concat(item.name, "/"));
        });
      });
    }
  };

  var _iterator = _createForOfIteratorHelper(files),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var file = _step.value;
      innerTraverseFileTree(file.webkitGetAsEntry());
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}