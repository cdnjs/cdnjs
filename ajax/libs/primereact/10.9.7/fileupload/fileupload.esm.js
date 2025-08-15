'use client';
import * as React from 'react';
import { PrimeReactContext, localeOption } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps } from 'primereact/hooks';
import { classNames, ObjectUtils, IconUtils, DomHandler } from 'primereact/utils';
import { Button } from 'primereact/button';
import { PlusIcon } from 'primereact/icons/plus';
import { TimesIcon } from 'primereact/icons/times';
import { UploadIcon } from 'primereact/icons/upload';
import { Messages } from 'primereact/messages';
import { ProgressBar } from 'primereact/progressbar';
import { Ripple } from 'primereact/ripple';

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _arrayLikeToArray$1(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray$1(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _unsupportedIterableToArray$1(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
  }
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray$1(r) || _nonIterableSpread();
}

function _readOnlyError(r) {
  throw new TypeError('"' + r + '" is read-only');
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest();
}

var classes$1 = {
  root: function root(_ref) {
    var props = _ref.props;
    return classNames('p-badge p-component', _defineProperty({
      'p-badge-no-gutter': ObjectUtils.isNotEmpty(props.value) && String(props.value).length === 1,
      'p-badge-dot': ObjectUtils.isEmpty(props.value),
      'p-badge-lg': props.size === 'large',
      'p-badge-xl': props.size === 'xlarge'
    }, "p-badge-".concat(props.severity), props.severity !== null));
  }
};
var styles$1 = "\n@layer primereact {\n    .p-badge {\n        display: inline-block;\n        border-radius: 10px;\n        text-align: center;\n        padding: 0 .5rem;\n    }\n    \n    .p-overlay-badge {\n        position: relative;\n    }\n    \n    .p-overlay-badge .p-badge {\n        position: absolute;\n        top: 0;\n        right: 0;\n        transform: translate(50%,-50%);\n        transform-origin: 100% 0;\n        margin: 0;\n    }\n    \n    .p-badge-dot {\n        width: .5rem;\n        min-width: .5rem;\n        height: .5rem;\n        border-radius: 50%;\n        padding: 0;\n    }\n    \n    .p-badge-no-gutter {\n        padding: 0;\n        border-radius: 50%;\n    }\n}\n";
var BadgeBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Badge',
    __parentMetadata: null,
    value: null,
    severity: null,
    size: null,
    style: null,
    className: null,
    children: undefined
  },
  css: {
    classes: classes$1,
    styles: styles$1
  }
});

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Badge = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = BadgeBase.getProps(inProps, context);
  var _BadgeBase$setMetaDat = BadgeBase.setMetaData(_objectSpread$1({
      props: props
    }, props.__parentMetadata)),
    ptm = _BadgeBase$setMetaDat.ptm,
    cx = _BadgeBase$setMetaDat.cx,
    isUnstyled = _BadgeBase$setMetaDat.isUnstyled;
  useHandleStyle(BadgeBase.css.styles, isUnstyled, {
    name: 'badge'
  });
  var elementRef = React.useRef(null);
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var rootProps = mergeProps({
    ref: elementRef,
    style: props.style,
    className: classNames(props.className, cx('root'))
  }, BadgeBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("span", rootProps, props.value);
}));
Badge.displayName = 'Badge';

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return classNames("p-fileupload p-fileupload-".concat(props.mode, " p-component"));
  },
  buttonbar: 'p-fileupload-buttonbar',
  content: 'p-fileupload-content',
  chooseButton: function chooseButton(_ref2) {
    var iconOnly = _ref2.iconOnly,
      disabled = _ref2.disabled,
      focusedState = _ref2.focusedState;
    return classNames('p-button p-fileupload-choose p-component', {
      'p-disabled': disabled,
      'p-focus': focusedState,
      'p-button-icon-only': iconOnly
    });
  },
  label: 'p-button-label p-clickable',
  file: 'p-fileupload-row',
  fileName: 'p-fileupload-filename',
  thumbnail: 'p-fileupload-file-thumbnail',
  chooseButtonLabel: 'p-button-label p-clickable',
  basicButton: function basicButton(_ref3) {
    var disabled = _ref3.disabled,
      focusedState = _ref3.focusedState,
      hasFiles = _ref3.hasFiles;
    return classNames('p-button p-component p-fileupload-choose', {
      'p-fileupload-choose-selected': hasFiles,
      'p-disabled': disabled,
      'p-focus': focusedState
    });
  },
  chooseIcon: function chooseIcon(_ref4) {
    var props = _ref4.props,
      iconOnly = _ref4.iconOnly;
    return props.mode === 'basic' ? classNames('p-button-icon', {
      'p-button-icon-left': !iconOnly
    }) : classNames('p-button-icon p-clickable', {
      'p-button-icon-left': !iconOnly
    });
  },
  uploadIcon: function uploadIcon(_ref5) {
    var iconOnly = _ref5.iconOnly;
    return classNames('p-button-icon p-c', {
      'p-button-icon-left': !iconOnly
    });
  },
  cancelIcon: function cancelIcon(_ref6) {
    var iconOnly = _ref6.iconOnly;
    return classNames('p-button-icon p-c', {
      'p-button-icon-left': !iconOnly
    });
  }
};
var styles = "\n@layer primereact {\n    .p-fileupload-content {\n        position: relative;\n    }\n    \n    .p-fileupload-row {\n        display: flex;\n        align-items: center;\n    }\n    \n    .p-fileupload-row > div {\n        flex: 1 1 auto;\n        width: 25%;\n    }\n    \n    .p-fileupload-row > div:last-child {\n        text-align: right;\n    }\n    \n    .p-fileupload-content > .p-progressbar {\n        width: 100%;\n        position: absolute;\n        top: 0;\n        left: 0;\n    }\n    \n    .p-button.p-fileupload-choose {\n        position: relative;\n        overflow: hidden;\n    }\n    \n    .p-fileupload-buttonbar {\n        display: flex;\n        flex-wrap: wrap;\n    }\n    \n    .p-button.p-fileupload-choose input[type='file'] {\n        display: none;\n    }\n    \n    .p-fileupload-choose.p-fileupload-choose-selected input[type='file'] {\n        display: none;\n    }\n    \n    .p-fileupload-filename {\n        word-break: break-all;\n    }\n    \n    .p-fileupload-file-thumbnail {\n        flex-shrink: 0;\n    }\n    \n    .p-fileupload-file-badge {\n        margin: 0.5rem;\n    }\n    \n    .p-fluid .p-fileupload .p-button {\n        width: auto;\n    }\n}\n";
var FileUploadBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'FileUpload',
    id: null,
    name: null,
    url: null,
    mode: 'advanced',
    multiple: false,
    accept: null,
    removeIcon: null,
    disabled: false,
    auto: false,
    maxFileSize: null,
    invalidFileSizeMessageSummary: '{0}: Invalid file size, ',
    invalidFileSizeMessageDetail: 'maximum upload size is {0}.',
    style: null,
    className: null,
    withCredentials: false,
    previewWidth: 50,
    chooseLabel: null,
    selectedFileLabel: null,
    uploadLabel: null,
    cancelLabel: null,
    chooseOptions: {
      label: null,
      icon: null,
      iconOnly: false,
      className: null,
      style: null
    },
    uploadOptions: {
      label: null,
      icon: null,
      iconOnly: false,
      className: null,
      style: null
    },
    cancelOptions: {
      label: null,
      icon: null,
      iconOnly: false,
      className: null,
      style: null
    },
    customUpload: false,
    headerClassName: null,
    headerStyle: null,
    contentClassName: null,
    contentStyle: null,
    headerTemplate: null,
    itemTemplate: null,
    emptyTemplate: null,
    progressBarTemplate: null,
    onBeforeUpload: null,
    onBeforeSend: null,
    onBeforeDrop: null,
    onBeforeSelect: null,
    onUpload: null,
    onError: null,
    onClear: null,
    onSelect: null,
    onProgress: null,
    onValidationFail: null,
    uploadHandler: null,
    onRemove: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var FileUpload = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = FileUploadBase.getProps(inProps, context);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    uploadedFilesState = _React$useState2[0],
    setUploadedFilesState = _React$useState2[1];
  var _React$useState3 = React.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    filesState = _React$useState4[0],
    setFilesState = _React$useState4[1];
  var _React$useState5 = React.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    progressState = _React$useState6[0],
    setProgressState = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    focusedState = _React$useState8[0],
    setFocusedState = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    uploadingState = _React$useState10[0],
    setUploadingState = _React$useState10[1];
  var metaData = {
    props: props,
    state: {
      progress: progressState,
      uploading: uploadingState,
      uploadedFiles: uploadedFilesState,
      files: filesState,
      focused: focusedState
    }
  };
  var _FileUploadBase$setMe = FileUploadBase.setMetaData(metaData),
    ptm = _FileUploadBase$setMe.ptm,
    cx = _FileUploadBase$setMe.cx,
    isUnstyled = _FileUploadBase$setMe.isUnstyled;
  useHandleStyle(FileUploadBase.css.styles, isUnstyled, {
    name: 'fileupload'
  });
  var fileInputRef = React.useRef(null);
  var messagesRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var uploadedFileCount = React.useRef(0);
  var hasFiles = ObjectUtils.isNotEmpty(filesState);
  var hasUploadedFiles = ObjectUtils.isNotEmpty(uploadedFilesState);
  var disabled = props.disabled || uploadingState;
  var chooseButtonLabel = props.chooseLabel || props.chooseOptions.label || localeOption('choose');
  var uploadButtonLabel = props.uploadLabel || props.uploadOptions.label || localeOption('upload');
  var cancelButtonLabel = props.cancelLabel || props.cancelOptions.label || localeOption('cancel');
  var chooseDisabled = disabled || props.fileLimit && props.fileLimit <= filesState.length + uploadedFileCount;
  var uploadDisabled = disabled || !hasFiles;
  var cancelDisabled = disabled || !hasFiles;
  var isImage = function isImage(file) {
    return /^image\//.test(file.type);
  };
  var remove = function remove(event, index) {
    clearInput();
    var currentFiles = _toConsumableArray(filesState);
    var removedFile = filesState[index];
    currentFiles.splice(index, 1);
    setFilesState(currentFiles);
    if (props.onRemove) {
      props.onRemove({
        originalEvent: event,
        file: removedFile
      });
    }
  };
  var removeUploadedFiles = function removeUploadedFiles(event, index) {
    clearInput();
    var currentUploadedFiles = _toConsumableArray(uploadedFilesState);
    var removedFile = filesState[index];
    currentUploadedFiles.splice(index, 1);
    setUploadedFilesState(currentUploadedFiles);
    if (props.onRemove) {
      props.onRemove({
        originalEvent: event,
        file: removedFile
      });
    }
  };
  var clearInput = function clearInput() {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  var formatSize = function formatSize(bytes) {
    var k = 1024;
    var dm = 3;
    var sizes = localeOption('fileSizeTypes');
    if (bytes <= 0) {
      return "0 ".concat(sizes[0]);
    }
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    var formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return "".concat(formattedSize, " ").concat(sizes[i]);
  };
  var onFileSelect = function onFileSelect(event) {
    // give caller a chance to stop the selection
    if (props.onBeforeSelect && props.onBeforeSelect({
      originalEvent: event,
      files: filesState
    }) === false) {
      return;
    }
    var currentFiles = [];
    if (props.multiple) {
      currentFiles = filesState ? _toConsumableArray(filesState) : [];
    }
    var selectedFiles = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (var i = 0; i < selectedFiles.length; i++) {
      var file = selectedFiles[i];
      var shouldAddFile = props.multiple ? !isFileSelected(file) && validate(file) : validate(file);
      if (shouldAddFile) {
        file.objectURL = window.URL.createObjectURL(file);
        currentFiles.push(file);
      }
    }
    setFilesState(currentFiles);
    if (ObjectUtils.isNotEmpty(currentFiles) && props.auto) {
      upload(currentFiles);
    }
    if (props.onSelect) {
      props.onSelect({
        originalEvent: event,
        files: currentFiles
      });
    }
    clearInput();
    setFocusedState(false);
    if (props.mode === 'basic' && currentFiles.length > 0) {
      fileInputRef.current.style.display = 'none';
    }
  };
  var isFileSelected = function isFileSelected(file) {
    return filesState.some(function (f) {
      return f.name + f.type + f.size === file.name + file.type + file.size;
    });
  };
  var validate = function validate(file) {
    if (props.maxFileSize && file.size > props.maxFileSize) {
      var message = {
        severity: 'error',
        summary: props.invalidFileSizeMessageSummary.replace('{0}', file.name),
        detail: props.invalidFileSizeMessageDetail.replace('{0}', formatSize(props.maxFileSize)),
        sticky: true
      };
      if (props.mode === 'advanced') {
        messagesRef.current.show(message);
      }
      props.onValidationFail && props.onValidationFail(file);
      return false;
    }
    return true;
  };
  var upload = function upload(files) {
    files = files || filesState;
    if (files && files.nativeEvent) {
      files = filesState;
    }
    if (props.customUpload) {
      if (props.fileLimit) {
        uploadedFileCount + files.length, _readOnlyError("uploadedFileCount");
      }
      if (props.uploadHandler) {
        props.uploadHandler({
          files: files,
          options: {
            clear: clear,
            props: props
          }
        });
      }
    } else {
      setUploadingState(true);
      var xhr = new XMLHttpRequest();
      var formData = new FormData();
      if (props.onBeforeUpload) {
        props.onBeforeUpload({
          xhr: xhr,
          formData: formData
        });
      }
      var _iterator = _createForOfIteratorHelper(files),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;
          formData.append(props.name, file, file.name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      xhr.upload.addEventListener('progress', function (event) {
        if (event.lengthComputable) {
          var progress = Math.round(event.loaded * 100 / event.total);
          setProgressState(progress);
          if (props.onProgress) {
            props.onProgress({
              originalEvent: event,
              progress: progress
            });
          }
        }
      });
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          setProgressState(0);
          setUploadingState(false);
          if (xhr.status >= 200 && xhr.status < 300) {
            if (props.fileLimit) {
              uploadedFileCount + files.length, _readOnlyError("uploadedFileCount");
            }
            if (props.onUpload) {
              props.onUpload({
                xhr: xhr,
                files: files
              });
            }
          } else if (props.onError) {
            props.onError({
              xhr: xhr,
              files: files
            });
          }
          clear();
          setUploadedFilesState(function (prevUploadedFiles) {
            return [].concat(_toConsumableArray(prevUploadedFiles), _toConsumableArray(files));
          });
        }
      };
      xhr.open('POST', props.url, true);
      if (props.onBeforeSend) {
        props.onBeforeSend({
          xhr: xhr,
          formData: formData
        });
      }
      xhr.withCredentials = props.withCredentials;
      xhr.send(formData);
    }
  };
  var clear = function clear() {
    setFilesState([]);
    setUploadedFilesState([]);
    setUploadingState(false);
    props.onClear && props.onClear();
    clearInput();
  };
  var choose = function choose() {
    fileInputRef.current.click();
  };
  var onFocus = function onFocus() {
    setFocusedState(true);
  };
  var onBlur = function onBlur() {
    setFocusedState(false);
  };
  var _onKeyDown = function onKeyDown(event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      choose();
    }
  };
  var _onDragEnter = function onDragEnter(event) {
    if (!disabled) {
      event.dataTransfer.dropEffect = 'copy';
      event.stopPropagation();
      event.preventDefault();
    }
  };
  var _onDragOver = function onDragOver(event) {
    if (!disabled) {
      event.dataTransfer.dropEffect = 'copy';
      !isUnstyled() && DomHandler.addClass(contentRef.current, 'p-fileupload-highlight');
      contentRef.current.setAttribute('data-p-highlight', true);
      event.stopPropagation();
      event.preventDefault();
    }
  };
  var _onDragLeave = function onDragLeave(event) {
    if (!disabled) {
      event.dataTransfer.dropEffect = 'copy';
      !isUnstyled() && DomHandler.removeClass(contentRef.current, 'p-fileupload-highlight');
      contentRef.current.setAttribute('data-p-highlight', false);
    }
  };
  var _onDrop = function onDrop(event) {
    if (props.disabled) {
      return;
    }
    !isUnstyled() && DomHandler.removeClass(contentRef.current, 'p-fileupload-highlight');
    contentRef.current.setAttribute('data-p-highlight', false);
    event.stopPropagation();
    event.preventDefault();

    // give caller a chance to stop the drop
    if (props.onBeforeDrop && props.onBeforeDrop(event) === false) {
      return;
    }
    var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    var allowDrop = props.multiple || ObjectUtils.isEmpty(filesState) && files && files.length === 1;
    allowDrop && onFileSelect(event);
  };
  var onSimpleUploaderClick = function onSimpleUploaderClick() {
    !disabled && hasFiles ? upload() : fileInputRef.current.click();
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      upload: upload,
      clear: clear,
      formatSize: formatSize,
      onFileSelect: onFileSelect,
      getInput: function getInput() {
        return fileInputRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      },
      getFiles: function getFiles() {
        return filesState;
      },
      setFiles: function setFiles(files) {
        return setFilesState(files || []);
      },
      getUploadedFiles: function getUploadedFiles() {
        return uploadedFilesState;
      },
      setUploadedFiles: function setUploadedFiles(files) {
        return setUploadedFilesState(files || []);
      }
    };
  });
  var createChooseButton = function createChooseButton() {
    var _props$chooseOptions = props.chooseOptions,
      className = _props$chooseOptions.className,
      style = _props$chooseOptions.style,
      _icon = _props$chooseOptions.icon,
      iconOnly = _props$chooseOptions.iconOnly;
    var chooseButtonLabelProps = mergeProps({
      className: cx('chooseButtonLabel')
    }, ptm('chooseButtonLabel'));
    var label = iconOnly ? /*#__PURE__*/React.createElement("span", _extends({}, chooseButtonLabelProps, {
      dangerouslySetInnerHTML: {
        __html: '&nbsp;'
      }
    })) : /*#__PURE__*/React.createElement("span", chooseButtonLabelProps, chooseButtonLabel);
    var inputProps = mergeProps({
      ref: fileInputRef,
      type: 'file',
      onChange: function onChange(e) {
        return onFileSelect(e);
      },
      multiple: props.multiple,
      accept: props.accept,
      disabled: chooseDisabled
    }, ptm('input'));
    var input = /*#__PURE__*/React.createElement("input", inputProps);
    var chooseIconProps = mergeProps({
      className: cx('chooseIcon', {
        iconOnly: iconOnly
      }),
      'aria-hidden': 'true'
    }, ptm('chooseIcon'));
    var icon = _icon || /*#__PURE__*/React.createElement(PlusIcon, chooseIconProps);
    var chooseIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, chooseIconProps), {
      props: props
    });
    var chooseButtonProps = mergeProps({
      className: classNames(className, cx('chooseButton', {
        iconOnly: iconOnly,
        disabled: disabled,
        className: className,
        focusedState: focusedState
      })),
      style: style,
      onClick: choose,
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e);
      },
      onFocus: onFocus,
      onBlur: onBlur,
      tabIndex: 0,
      'data-p-disabled': disabled,
      'data-p-focus': focusedState
    }, ptm('chooseButton'));
    return /*#__PURE__*/React.createElement("span", chooseButtonProps, input, chooseIcon, label, /*#__PURE__*/React.createElement(Ripple, null));
  };
  var onRemoveClick = function onRemoveClick(e, badgeOptions, index) {
    if (badgeOptions.severity === 'warning') {
      remove(e, index);
    } else {
      removeUploadedFiles(e, index);
    }
  };
  var createFile = function createFile(file, index, badgeOptions) {
    var key = file.name + file.type + file.size;
    var thumbnailProps = mergeProps({
      role: 'presentation',
      className: cx('thumbnail'),
      src: file.objectURL,
      width: props.previewWidth
    }, ptm('thumbnail'));
    var preview = isImage(file) ? /*#__PURE__*/React.createElement("img", _extends({}, thumbnailProps, {
      alt: file.name
    })) : null;
    var detailsProps = mergeProps(ptm('details'));
    var fileSizeProps = mergeProps(ptm('fileSize'));
    var fileNameProps = mergeProps({
      className: cx('fileName')
    }, ptm('fileName'));
    var actionsProps = mergeProps(ptm('actions'));
    var fileName = /*#__PURE__*/React.createElement("div", fileNameProps, file.name);
    var size = /*#__PURE__*/React.createElement("div", fileSizeProps, formatSize(file.size));
    var contentBody = /*#__PURE__*/React.createElement("div", detailsProps, /*#__PURE__*/React.createElement("div", fileNameProps, " ", file.name), /*#__PURE__*/React.createElement("span", fileSizeProps, formatSize(file.size)), /*#__PURE__*/React.createElement(Badge, {
      className: "p-fileupload-file-badge",
      value: badgeOptions.value,
      severity: badgeOptions.severity,
      pt: ptm('badge'),
      __parentMetadata: {
        parent: metaData
      }
    }));
    var removeButton = /*#__PURE__*/React.createElement("div", actionsProps, /*#__PURE__*/React.createElement(Button, {
      type: "button",
      icon: props.removeIcon || /*#__PURE__*/React.createElement(TimesIcon, null),
      text: true,
      rounded: true,
      severity: "danger",
      onClick: function onClick(e) {
        return onRemoveClick(e, badgeOptions, index);
      },
      disabled: disabled,
      pt: ptm('removeButton'),
      __parentMetadata: {
        parent: metaData
      },
      unstyled: isUnstyled()
    }));
    var content = /*#__PURE__*/React.createElement(React.Fragment, null, preview, contentBody, removeButton);
    if (props.itemTemplate) {
      var defaultContentOptions = {
        onRemove: function onRemove(event) {
          return remove(event, index);
        },
        previewElement: preview,
        fileNameElement: fileName,
        sizeElement: size,
        removeElement: removeButton,
        formatSize: formatSize(file.size),
        element: content,
        index: index,
        props: props
      };
      content = ObjectUtils.getJSXElement(props.itemTemplate, file, defaultContentOptions);
    }
    var fileProps = mergeProps({
      key: key,
      className: cx('file')
    }, ptm('file'));
    return /*#__PURE__*/React.createElement("div", fileProps, content);
  };
  var createFiles = function createFiles() {
    var badgeOptions = {
      severity: 'warning',
      value: localeOption('pending') || 'Pending'
    };
    var content = filesState.map(function (file, index) {
      return createFile(file, index, badgeOptions);
    });
    return /*#__PURE__*/React.createElement("div", null, content);
  };
  var createUploadedFiles = function createUploadedFiles() {
    var badgeOptions = {
      severity: 'success',
      value: localeOption('completed') || 'Completed'
    };
    var content = uploadedFilesState && uploadedFilesState.map(function (file, index) {
      return createFile(file, index, badgeOptions);
    });
    return /*#__PURE__*/React.createElement("div", null, content);
  };
  var createEmptyContent = function createEmptyContent() {
    return props.emptyTemplate && !hasFiles && !hasUploadedFiles ? ObjectUtils.getJSXElement(props.emptyTemplate, props) : null;
  };
  var createProgressBarContent = function createProgressBarContent() {
    if (props.progressBarTemplate) {
      var defaultProgressBarTemplateOptions = {
        progress: progressState,
        props: props
      };
      return ObjectUtils.getJSXElement(props.progressBarTemplate, defaultProgressBarTemplateOptions);
    }
    return /*#__PURE__*/React.createElement(ProgressBar, {
      value: progressState,
      showValue: false,
      pt: ptm('progressbar'),
      __parentMetadata: {
        parent: metaData
      }
    });
  };
  var createAdvanced = function createAdvanced() {
    var chooseButton = createChooseButton();
    var emptyContent = createEmptyContent();
    var uploadButton;
    var cancelButton;
    var filesList;
    var uplaodedFilesList;
    var progressBar;
    if (!props.auto) {
      var uploadOptions = props.uploadOptions;
      var cancelOptions = props.cancelOptions;
      var uploadLabel = !uploadOptions.iconOnly ? uploadButtonLabel : '';
      var cancelLabel = !cancelOptions.iconOnly ? cancelButtonLabel : '';
      var uploadIconProps = mergeProps({
        className: cx('uploadIcon', {
          iconOnly: uploadOptions.iconOnly
        }),
        'aria-hidden': 'true'
      }, ptm('uploadIcon'));
      var uploadIcon = IconUtils.getJSXIcon(uploadOptions.icon || /*#__PURE__*/React.createElement(UploadIcon, uploadIconProps), _objectSpread({}, uploadIconProps), {
        props: props
      });
      var cancelIconProps = mergeProps({
        className: cx('cancelIcon', {
          iconOnly: cancelOptions.iconOnly
        }),
        'aria-hidden': 'true'
      }, ptm('cancelIcon'));
      var cancelIcon = IconUtils.getJSXIcon(cancelOptions.icon || /*#__PURE__*/React.createElement(TimesIcon, cancelIconProps), _objectSpread({}, cancelIconProps), {
        props: props
      });
      uploadButton = /*#__PURE__*/React.createElement(Button, {
        type: "button",
        label: uploadLabel,
        "aria-hidden": "true",
        icon: uploadIcon,
        onClick: upload,
        disabled: uploadDisabled,
        style: uploadOptions.style,
        className: uploadOptions.className,
        pt: ptm('uploadButton'),
        __parentMetadata: {
          parent: metaData
        },
        unstyled: isUnstyled()
      });
      cancelButton = /*#__PURE__*/React.createElement(Button, {
        type: "button",
        label: cancelLabel,
        "aria-hidden": "true",
        icon: cancelIcon,
        onClick: clear,
        disabled: cancelDisabled,
        style: cancelOptions.style,
        className: cancelOptions.className,
        pt: ptm('cancelButton'),
        __parentMetadata: {
          parent: metaData
        },
        unstyled: isUnstyled()
      });
    }
    if (hasFiles) {
      filesList = createFiles();
      progressBar = createProgressBarContent();
    }
    if (hasUploadedFiles) {
      uplaodedFilesList = createUploadedFiles();
    }
    var buttonbarProps = mergeProps({
      className: classNames(props.headerClassName, cx('buttonbar')),
      style: props.headerStyle
    }, ptm('buttonbar'));
    var header = /*#__PURE__*/React.createElement("div", buttonbarProps, chooseButton, uploadButton, cancelButton);
    if (props.headerTemplate) {
      var defaultContentOptions = {
        className: classNames('p-fileupload-buttonbar', props.headerClassName),
        chooseButton: chooseButton,
        uploadButton: uploadButton,
        cancelButton: cancelButton,
        element: header,
        props: props
      };
      header = ObjectUtils.getJSXElement(props.headerTemplate, defaultContentOptions);
    }
    var rootProps = mergeProps({
      id: props.id,
      className: classNames(props.className, cx('root')),
      style: props.style
    }, FileUploadBase.getOtherProps(props), ptm('root'));
    var contentProps = mergeProps({
      ref: contentRef,
      className: classNames(props.contentClassName, cx('content')),
      style: props.contentStyle,
      onDragEnter: function onDragEnter(e) {
        return _onDragEnter(e);
      },
      onDragOver: function onDragOver(e) {
        return _onDragOver(e);
      },
      onDragLeave: function onDragLeave(e) {
        return _onDragLeave(e);
      },
      onDrop: function onDrop(e) {
        return _onDrop(e);
      },
      'data-p-highlight': false
    }, ptm('content'));
    return /*#__PURE__*/React.createElement("div", rootProps, header, /*#__PURE__*/React.createElement("div", contentProps, progressBar, /*#__PURE__*/React.createElement(Messages, {
      ref: messagesRef,
      __parentMetadata: {
        parent: metaData
      }
    }), hasFiles ? filesList : null, hasUploadedFiles ? uplaodedFilesList : null, emptyContent));
  };
  var createBasic = function createBasic() {
    var chooseOptions = props.chooseOptions;
    var labelProps = mergeProps({
      className: cx('label')
    }, ptm('label'));
    var chooseLabel = chooseOptions.iconOnly ? /*#__PURE__*/React.createElement("span", _extends({}, labelProps, {
      dangerouslySetInnerHTML: {
        __html: '&nbsp;'
      }
    })) : /*#__PURE__*/React.createElement("span", labelProps, chooseButtonLabel);
    var label = props.auto ? chooseLabel : /*#__PURE__*/React.createElement("span", labelProps, hasFiles ? props.selectedFileLabel || filesState[0].name : chooseLabel);
    var chooseIconProps = mergeProps({
      className: cx('chooseIcon', {
        iconOnly: chooseOptions.iconOnly
      })
    }, ptm('chooseIcon'));
    var icon = chooseOptions.icon ? chooseOptions.icon : !chooseOptions.icon && (!hasFiles || props.auto) ? /*#__PURE__*/React.createElement(PlusIcon, chooseIconProps) : !chooseOptions.icon && hasFiles && !props.auto && /*#__PURE__*/React.createElement(UploadIcon, chooseIconProps);
    var chooseIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, chooseIconProps), {
      props: props,
      hasFiles: hasFiles
    });
    var inputProps = mergeProps({
      ref: fileInputRef,
      type: 'file',
      onChange: function onChange(e) {
        return onFileSelect(e);
      },
      multiple: props.multiple,
      accept: props.accept,
      disabled: disabled
    }, ptm('input'));
    var input = !hasFiles && /*#__PURE__*/React.createElement("input", inputProps);
    var rootProps = mergeProps({
      className: classNames(props.className, cx('root')),
      style: props.style
    }, FileUploadBase.getOtherProps(props), ptm('root'));
    var basicButtonProps = mergeProps({
      className: classNames(chooseOptions.className, cx('basicButton', {
        hasFiles: hasFiles,
        disabled: disabled,
        focusedState: focusedState
      })),
      style: chooseOptions.style,
      tabIndex: 0,
      onClick: onSimpleUploaderClick,
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e);
      },
      onFocus: onFocus,
      onBlur: onBlur
    }, FileUploadBase.getOtherProps(props), ptm('basicButton'));
    return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement(Messages, {
      ref: messagesRef,
      pt: ptm('message'),
      __parentMetadata: {
        parent: metaData
      }
    }), /*#__PURE__*/React.createElement("span", basicButtonProps, chooseIcon, label, input, /*#__PURE__*/React.createElement(Ripple, null)));
  };
  if (props.mode === 'advanced') {
    return createAdvanced();
  } else if (props.mode === 'basic') {
    return createBasic();
  }
}));
FileUpload.displayName = 'FileUpload';

export { FileUpload };
