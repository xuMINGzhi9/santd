"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tr_TR = _interopRequireDefault(require("../pagination/locale/tr_TR"));

var _tr_TR2 = _interopRequireDefault(require("../date-picker/locale/tr_TR"));

var _tr_TR3 = _interopRequireDefault(require("../timepicker/locale/tr_TR"));

var _tr_TR4 = _interopRequireDefault(require("../calendar/locale/tr_TR"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'tr',
  Pagination: _tr_TR["default"],
  DatePicker: _tr_TR2["default"],
  TimePicker: _tr_TR3["default"],
  Calendar: _tr_TR4["default"],
  global: {
    placeholder: 'Lütfen seçiniz'
  },
  Table: {
    filterTitle: 'Menü Filtrele',
    filterConfirm: 'Tamam',
    filterReset: 'Sıfırla',
    selectAll: 'Hepsini Seç',
    selectInvert: 'Tersini Seç',
    sortTitle: 'Sırala'
  },
  Modal: {
    okText: 'Tamam',
    cancelText: 'İptal',
    justOkText: 'Tamam'
  },
  Popconfirm: {
    okText: 'Tamam',
    cancelText: 'İptal'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Arama',
    itemUnit: 'Öğe',
    itemsUnit: 'Öğeler'
  },
  Upload: {
    uploading: 'Yükleniyor...',
    removeFile: 'Dosyayı kaldır',
    uploadError: 'Yükleme Hatası',
    previewFile: 'Dosyayı Önizle'
  },
  Empty: {
    description: 'Veri Yok'
  },
  Icon: {
    icon: 'icon'
  },
  Text: {
    edit: 'düzenle',
    copy: 'kopyala',
    copied: 'kopyalandı',
    expand: 'genişlet'
  }
};
exports["default"] = _default;