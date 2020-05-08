"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileToObject = fileToObject;
exports.genPercentAdd = genPercentAdd;
exports.getFileItem = getFileItem;
exports.removeFileItem = removeFileItem;
exports.previewImage = previewImage;
exports.isImageUrl = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file Santd upload utils file
 **/
// Fix IE file.status problem
// via coping a new Object
function fileToObject(file) {
  return _objectSpread(_objectSpread({}, file), {}, {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file
  });
}

function genPercentAdd() {
  var k = 0.1;
  var i = 0.01;
  var end = 0.98;
  return function (s) {
    var start = s;

    if (start >= end) {
      return start;
    }

    start += k;
    k = k - i;

    if (k < 0.001) {
      k = 0.001;
    }

    return start;
  };
}

function getFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(function (item) {
    return item[matchKey] === file[matchKey];
  })[0];
}

function removeFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  var removed = fileList.filter(function (item) {
    return item[matchKey] !== file[matchKey];
  });

  if (removed.length === fileList.length) {
    return null;
  }

  return removed;
} // ==================== Default Image Preview ====================


var extname = function extname(url) {
  if (!url) {
    return '';
  }

  var temp = url.split('/');
  var filename = temp[temp.length - 1];
  var filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

var isImageFileType = function isImageFileType(type) {
  return !!type && type.indexOf('image/') === 0;
};

var isImageUrl = function isImageUrl(file) {
  if (isImageFileType(file.type)) {
    return true;
  }

  var url = file.thumbUrl || file.url;
  var extension = extname(url);

  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp|dpg)$/i.test(extension)) {
    return true;
  } else if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  } else if (extension) {
    // other file types which have extension
    return false;
  }

  return true;
};

exports.isImageUrl = isImageUrl;
var MEASURE_SIZE = 200;

function previewImage(file) {
  return new Promise(function (resolve) {
    if (!isImageFileType(file.type)) {
      resolve('');
      return;
    }

    var canvas = document.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = "\n            position: fixed;\n            left: 0;\n            top: 0;\n            width: ".concat(MEASURE_SIZE, "px;\n            height: ").concat(MEASURE_SIZE, "px;\n            z-index: 9999;\n            display: none;\n        ");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var img = new Image();

    img.onload = function () {
      var width = img.width,
          height = img.height;
      var drawWidth = MEASURE_SIZE;
      var drawHeight = MEASURE_SIZE;
      var offsetX = 0;
      var offsetY = 0;

      if (width < height) {
        drawHeight = height * (MEASURE_SIZE / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (MEASURE_SIZE / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      var dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      resolve(dataURL);
    };

    img.src = window.URL.createObjectURL(file);
  });
}