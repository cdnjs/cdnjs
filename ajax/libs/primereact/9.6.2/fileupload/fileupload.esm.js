import * as React from 'react';
import { PrimeReactContext, localeOption } from 'primereact/api';
import { classNames, ObjectUtils, mergeProps, IconUtils, DomHandler } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { Button } from 'primereact/button';
import { PlusIcon } from 'primereact/icons/plus';
import { TimesIcon } from 'primereact/icons/times';
import { UploadIcon } from 'primereact/icons/upload';
import { Messages } from 'primereact/messages';
import { ProgressBar } from 'primereact/progressbar';
import { Ripple } from 'primereact/ripple';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

var BadgeBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Badge',
    value: null,
    severity: null,
    size: null,
    style: null,
    className: null,
    children: undefined
  }
});

var Badge = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = BadgeBase.getProps(inProps, context);
  var _BadgeBase$setMetaDat = BadgeBase.setMetaData({
      props: props
    }),
    ptm = _BadgeBase$setMetaDat.ptm;
  var elementRef = React.useRef(null);
  var className = classNames('p-badge p-component', _defineProperty({
    'p-badge-no-gutter': ObjectUtils.isNotEmpty(props.value) && String(props.value).length === 1,
    'p-badge-dot': ObjectUtils.isEmpty(props.value),
    'p-badge-lg': props.size === 'large',
    'p-badge-xl': props.size === 'xlarge'
  }, "p-badge-".concat(props.severity), props.severity !== null), props.className);
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
    className: className
  }, BadgeBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("span", rootProps, props.value);
}));
Badge.displayName = 'Badge';

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
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var FileUpload = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
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
  var _FileUploadBase$setMe = FileUploadBase.setMetaData({
      props: props,
      state: {
        progress: progressState,
        uploading: uploadingState,
        uploadedFiles: uploadedFilesState,
        files: filesState,
        focused: focusedState
      }
    }),
    ptm = _FileUploadBase$setMe.ptm;
  var fileInputRef = React.useRef(null);
  var messagesRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var duplicateIEEvent = React.useRef(false);
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
  var clearIEInput = function clearIEInput() {
    if (fileInputRef.current) {
      duplicateIEEvent.current = true; //IE11 fix to prevent onFileChange trigger again
      fileInputRef.current.value = '';
    }
  };
  var formatSize = function formatSize(bytes) {
    if (bytes === 0) {
      return '0 B';
    }
    var k = 1000,
      dm = 3,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  var onFileSelect = function onFileSelect(event) {
    // give caller a chance to stop the selection
    if (props.onBeforeSelect && props.onBeforeSelect({
      originalEvent: event,
      files: filesState
    }) === false) {
      return;
    }
    if (event.type !== 'drop' && isIE11() && duplicateIEEvent.current) {
      duplicateIEEvent.current = false;
      return;
    }
    var currentFiles = filesState && props.multiple ? _toConsumableArray(filesState) : [];
    var selectedFiles = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (var i = 0; i < selectedFiles.length; i++) {
      var file = selectedFiles[i];
      if ((!props.multiple || !isFileSelected(file)) && validate(file)) {
        if (isImage(file)) {
          file.objectURL = window.URL.createObjectURL(file);
        }
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
    if (event.type !== 'drop' && isIE11()) {
      clearIEInput();
    } else {
      clearInput();
    }
    if (props.mode === 'basic' && currentFiles.length > 0) {
      fileInputRef.current.style.display = 'none';
    }
  };
  var isFileSelected = function isFileSelected(file) {
    return filesState.some(function (f) {
      return f.name + f.type + f.size === file.name + file.type + file.size;
    });
  };
  var isIE11 = function isIE11() {
    return !!window['MSInputMethodContext'] && !!document['documentMode'];
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
          } else {
            if (props.onError) {
              props.onError({
                xhr: xhr,
                files: files
              });
            }
          }
          setUploadedFilesState(function (prevUploadedFiles) {
            return [].concat(_toConsumableArray(prevUploadedFiles), _toConsumableArray(files));
          });
          clear();
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
    if (event.which === 13) {
      // enter
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
      DomHandler.addClass(contentRef.current, 'p-fileupload-highlight');
      event.stopPropagation();
      event.preventDefault();
    }
  };
  var _onDragLeave = function onDragLeave(event) {
    if (!disabled) {
      event.dataTransfer.dropEffect = 'copy';
      DomHandler.removeClass(contentRef.current, 'p-fileupload-highlight');
    }
  };
  var _onDrop = function onDrop(event) {
    if (props.disabled) {
      return;
    }
    DomHandler.removeClass(contentRef.current, 'p-fileupload-highlight');
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
    var chooseClassName = classNames('p-button p-fileupload-choose p-component', {
      'p-disabled': disabled,
      'p-focus': focusedState,
      'p-button-icon-only': iconOnly
    }, className);
    var labelClassName = 'p-button-label p-clickable';
    var iconClassName = classNames('p-button-icon p-clickable', {
      'p-button-icon-left': !iconOnly
    });
    var chooseButtonLabelProps = mergeProps({
      className: labelClassName
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
      className: iconClassName
    }, ptm('chooseIcon'));
    var icon = _icon || /*#__PURE__*/React.createElement(PlusIcon, chooseIconProps);
    var chooseIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, chooseIconProps), {
      props: props
    });
    var chooseButtonProps = mergeProps({
      className: chooseClassName,
      style: style,
      onClick: choose,
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e);
      },
      onFocus: onFocus,
      onBlur: onBlur,
      tabIndex: 0
    }, ptm('chooseButton'));
    return /*#__PURE__*/React.createElement("span", chooseButtonProps, input, chooseIcon, label, /*#__PURE__*/React.createElement(Ripple, null));
  };
  var onRemoveClick = function onRemoveClick(e, badgeOptions, index) {
    if (badgeOptions.severity === 'warning') remove(e, index);else removeUploadedFiles(e, index);
  };
  var createFile = function createFile(file, index, badgeOptions) {
    var key = file.name + file.type + file.size;
    var thumbnailProps = mergeProps({
      role: 'presentation',
      className: 'p-fileupload-file-thumbnail',
      src: file.objectURL,
      width: props.previewWidth
    }, ptm('thumbnail'));
    var preview = isImage(file) ? /*#__PURE__*/React.createElement("img", _extends({}, thumbnailProps, {
      alt: file.name
    })) : null;
    var detailsProps = mergeProps(ptm('details'));
    var fileSizeProps = mergeProps(ptm('fileSize'));
    var fileNameProps = mergeProps({
      className: 'p-fileupload-filename'
    }, ptm('fileName'));
    var actionsProps = mergeProps(ptm('actions'));
    var fileName = /*#__PURE__*/React.createElement("div", fileNameProps, file.name);
    var size = /*#__PURE__*/React.createElement("div", fileSizeProps, formatSize(file.size));
    var contentBody = /*#__PURE__*/React.createElement("div", detailsProps, /*#__PURE__*/React.createElement("div", fileNameProps, " ", file.name), /*#__PURE__*/React.createElement("span", fileSizeProps, formatSize(file.size)), /*#__PURE__*/React.createElement(Badge, {
      className: "p-fileupload-file-badge",
      value: badgeOptions.value,
      severity: badgeOptions.severity,
      pt: ptm('badge')
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
      pt: ptm('removeButton')
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
      className: 'p-fileupload-row'
    }, ptm('file'));
    return /*#__PURE__*/React.createElement("div", fileProps, content);
  };
  var createFiles = function createFiles() {
    var badgeOptions = {
      severity: 'warning',
      value: 'Pending'
    };
    var content = filesState.map(function (file, index) {
      return createFile(file, index, badgeOptions);
    });
    return /*#__PURE__*/React.createElement("div", null, content);
  };
  var createUploadedFiles = function createUploadedFiles() {
    var badgeOptions = {
      severity: 'success',
      value: 'Completed'
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
      return ObjectUtils.getJSXElement(props.progressBarTemplate, props);
    }
    return /*#__PURE__*/React.createElement(ProgressBar, {
      value: progressState,
      showValue: false,
      pt: ptm('progressbar')
    });
  };
  var createAdvanced = function createAdvanced() {
    var className = classNames('p-fileupload p-fileupload-advanced p-component', props.className);
    var headerClassName = classNames('p-fileupload-buttonbar', props.headerClassName);
    var contentClassName = classNames('p-fileupload-content', props.contentClassName);
    var chooseButton = createChooseButton();
    var emptyContent = createEmptyContent();
    var uploadButton, cancelButton, filesList, uplaodedFilesList, progressBar;
    if (!props.auto) {
      var uploadOptions = props.uploadOptions;
      var cancelOptions = props.cancelOptions;
      var uploadLabel = !uploadOptions.iconOnly ? uploadButtonLabel : '';
      var cancelLabel = !cancelOptions.iconOnly ? cancelButtonLabel : '';
      var uploadIconClassName = classNames('p-button-icon p-c', {
        'p-button-icon-left': !uploadOptions.iconOnly
      });
      var uploadIconProps = mergeProps({
        className: uploadIconClassName
      }, ptm('uploadIcon'));
      var uploadIcon = IconUtils.getJSXIcon(uploadOptions.icon || /*#__PURE__*/React.createElement(UploadIcon, uploadIconProps), _objectSpread({}, uploadIconProps), {
        props: props
      });
      var cancelIconClassName = classNames('p-button-icon p-c', {
        'p-button-icon-left': !cancelOptions.iconOnly
      });
      var cancelIconProps = mergeProps({
        className: cancelIconClassName
      }, ptm('cancelIcon'));
      var cancelIcon = IconUtils.getJSXIcon(cancelOptions.icon || /*#__PURE__*/React.createElement(TimesIcon, cancelIconProps), _objectSpread({}, cancelIconProps), {
        props: props
      });
      uploadButton = /*#__PURE__*/React.createElement(Button, {
        type: "button",
        label: uploadLabel,
        icon: uploadIcon,
        onClick: upload,
        disabled: uploadDisabled,
        style: uploadOptions.style,
        className: uploadOptions.className,
        pt: ptm('uploadButton')
      });
      cancelButton = /*#__PURE__*/React.createElement(Button, {
        type: "button",
        label: cancelLabel,
        icon: cancelIcon,
        onClick: clear,
        disabled: cancelDisabled,
        style: cancelOptions.style,
        className: cancelOptions.className,
        pt: ptm('cancelButton')
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
      className: headerClassName,
      style: props.headerStyle
    }, ptm('buttonbar'));
    var header = /*#__PURE__*/React.createElement("div", buttonbarProps, chooseButton, uploadButton, cancelButton);
    if (props.headerTemplate) {
      var defaultContentOptions = {
        className: headerClassName,
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
      className: className,
      style: props.style
    }, FileUploadBase.getOtherProps(props), ptm('root'));
    var contentProps = mergeProps({
      ref: contentRef,
      className: contentClassName,
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
      }
    }, ptm('content'));
    return /*#__PURE__*/React.createElement("div", rootProps, header, /*#__PURE__*/React.createElement("div", contentProps, progressBar, /*#__PURE__*/React.createElement(Messages, {
      ref: messagesRef
    }), hasFiles ? filesList : null, hasUploadedFiles ? uplaodedFilesList : null, emptyContent));
  };
  var createBasic = function createBasic() {
    var chooseOptions = props.chooseOptions;
    var className = classNames('p-fileupload p-fileupload-basic p-component', props.className);
    var buttonClassName = classNames('p-button p-component p-fileupload-choose', {
      'p-fileupload-choose-selected': hasFiles,
      'p-disabled': disabled,
      'p-focus': focusedState
    }, chooseOptions.className);
    var labelClassName = 'p-button-label p-clickable';
    var labelProps = mergeProps({
      className: labelClassName
    }, ptm('label'));
    var chooseLabel = chooseOptions.iconOnly ? /*#__PURE__*/React.createElement("span", _extends({}, labelProps, {
      dangerouslySetInnerHTML: {
        __html: '&nbsp;'
      }
    })) : /*#__PURE__*/React.createElement("span", labelProps, chooseButtonLabel);
    var label = props.auto ? chooseLabel : /*#__PURE__*/React.createElement("span", labelProps, hasFiles ? filesState[0].name : chooseLabel);
    var iconClassName = classNames('p-button-icon', {
      'p-button-icon-left': !chooseOptions.iconOnly
    });
    var chooseIconProps = mergeProps({
      className: iconClassName
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
      className: className,
      style: props.style
    }, FileUploadBase.getOtherProps(props), ptm('root'));
    var basicButtonProps = mergeProps({
      className: buttonClassName,
      style: chooseOptions.style,
      tabIndex: 0,
      onMouseUp: onSimpleUploaderClick,
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e);
      },
      onFocus: onFocus,
      onBlur: onBlur
    }, FileUploadBase.getOtherProps(props), ptm('basicButton'));
    return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement(Messages, {
      ref: messagesRef,
      pt: ptm('message')
    }), /*#__PURE__*/React.createElement("span", basicButtonProps, chooseIcon, label, input, /*#__PURE__*/React.createElement(Ripple, null)));
  };
  if (props.mode === 'advanced') return createAdvanced();else if (props.mode === 'basic') return createBasic();
}));
FileUpload.displayName = 'FileUpload';

export { FileUpload };
