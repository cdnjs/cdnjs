this.primereact = this.primereact || {};
this.primereact.fileupload = (function (exports, React, api, button, messages, progressbar, ripple, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

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
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
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
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
          ;
        }
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

  function _readOnlyError(name) {
    throw new TypeError("\"" + name + "\" is read-only");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var FileUpload = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _React$useState = React__namespace.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filesState = _React$useState2[0],
      setFilesState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      progressState = _React$useState4[0],
      setProgressState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      focusedState = _React$useState6[0],
      setFocusedState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      uploadingState = _React$useState8[0],
      setUploadingState = _React$useState8[1];
    var fileInputRef = React__namespace.useRef(null);
    var messagesRef = React__namespace.useRef(null);
    var contentRef = React__namespace.useRef(null);
    var duplicateIEEvent = React__namespace.useRef(false);
    var uploadedFileCount = React__namespace.useRef(0);
    var hasFiles = utils.ObjectUtils.isNotEmpty(filesState);
    var disabled = props.disabled || uploadingState;
    var chooseButtonLabel = props.chooseLabel || props.chooseOptions.label || api.localeOption('choose');
    var uploadButtonLabel = props.uploadLabel || props.uploadOptions.label || api.localeOption('upload');
    var cancelButtonLabel = props.cancelLabel || props.cancelOptions.label || api.localeOption('cancel');
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
      var currentFiles = [];
      if (props.multiple) {
        currentFiles = filesState ? _toConsumableArray(filesState) : [];
      }
      var selectedFiles = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      for (var i = 0; i < selectedFiles.length; i++) {
        var file = selectedFiles[i];
        if (!isFileSelected(file) && validate(file)) {
          if (isImage(file)) {
            file.objectURL = window.URL.createObjectURL(file);
          }
          currentFiles.push(file);
        }
      }
      setFilesState(currentFiles);
      if (utils.ObjectUtils.isNotEmpty(currentFiles) && props.auto) {
        upload(currentFiles);
      }
      if (props.onSelect) {
        props.onSelect({
          originalEvent: event,
          files: selectedFiles
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
    var onKeyDown = function onKeyDown(event) {
      if (event.which === 13) {
        // enter
        choose();
      }
    };
    var onDragEnter = function onDragEnter(event) {
      if (!disabled) {
        event.dataTransfer.dropEffect = 'copy';
        event.stopPropagation();
        event.preventDefault();
      }
    };
    var onDragOver = function onDragOver(event) {
      if (!disabled) {
        event.dataTransfer.dropEffect = 'copy';
        utils.DomHandler.addClass(contentRef.current, 'p-fileupload-highlight');
        event.stopPropagation();
        event.preventDefault();
      }
    };
    var onDragLeave = function onDragLeave(event) {
      if (!disabled) {
        event.dataTransfer.dropEffect = 'copy';
        utils.DomHandler.removeClass(contentRef.current, 'p-fileupload-highlight');
      }
    };
    var onDrop = function onDrop(event) {
      if (props.disabled) {
        return;
      }
      utils.DomHandler.removeClass(contentRef.current, 'p-fileupload-highlight');
      event.stopPropagation();
      event.preventDefault();

      // give caller a chance to stop the drop
      if (props.onBeforeDrop && props.onBeforeDrop(event) === false) {
        return;
      }
      var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      var allowDrop = props.multiple || utils.ObjectUtils.isEmpty(filesState) && files && files.length === 1;
      allowDrop && onFileSelect(event);
    };
    var onSimpleUploaderClick = function onSimpleUploaderClick() {
      !disabled && hasFiles ? upload() : fileInputRef.current.click();
    };
    React__namespace.useImperativeHandle(ref, function () {
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
        }
      };
    });
    var createChooseButton = function createChooseButton() {
      var _props$chooseOptions = props.chooseOptions,
        className = _props$chooseOptions.className,
        style = _props$chooseOptions.style,
        _icon = _props$chooseOptions.icon,
        iconOnly = _props$chooseOptions.iconOnly;
      var chooseClassName = utils.classNames('p-button p-fileupload-choose p-component', {
        'p-disabled': disabled,
        'p-focus': focusedState,
        'p-button-icon-only': iconOnly
      }, className);
      var labelClassName = 'p-button-label p-clickable';
      var label = iconOnly ? /*#__PURE__*/React__namespace.createElement("span", {
        className: labelClassName,
        dangerouslySetInnerHTML: {
          __html: '&nbsp;'
        }
      }) : /*#__PURE__*/React__namespace.createElement("span", {
        className: labelClassName
      }, chooseButtonLabel);
      var input = /*#__PURE__*/React__namespace.createElement("input", {
        ref: fileInputRef,
        type: "file",
        onChange: onFileSelect,
        multiple: props.multiple,
        accept: props.accept,
        disabled: chooseDisabled
      });
      var icon = utils.IconUtils.getJSXIcon(_icon || 'pi pi-fw pi-plus', {
        className: 'p-button-icon p-button-icon-left p-clickable'
      }, {
        props: props
      });
      return /*#__PURE__*/React__namespace.createElement("span", {
        className: chooseClassName,
        style: style,
        onClick: choose,
        onKeyDown: onKeyDown,
        onFocus: onFocus,
        onBlur: onBlur,
        tabIndex: 0
      }, input, icon, label, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var createFile = function createFile(file, index) {
      var key = file.name + file.type + file.size;
      var preview = isImage(file) ? /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement("img", {
        alt: file.name,
        role: "presentation",
        src: file.objectURL,
        width: props.previewWidth
      })) : null;
      var fileName = /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-fileupload-filename"
      }, file.name);
      var size = /*#__PURE__*/React__namespace.createElement("div", null, formatSize(file.size));
      var removeButton = /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement(button.Button, {
        type: "button",
        icon: "pi pi-times",
        onClick: function onClick(e) {
          return remove(e, index);
        },
        disabled: disabled
      }));
      var content = /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, preview, fileName, size, removeButton);
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
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(props.itemTemplate, file, defaultContentOptions);
      }
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-fileupload-row",
        key: key
      }, content);
    };
    var createFiles = function createFiles() {
      var content = filesState.map(createFile);
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-fileupload-files"
      }, content);
    };
    var createEmptyContent = function createEmptyContent() {
      return props.emptyTemplate && !hasFiles ? utils.ObjectUtils.getJSXElement(props.emptyTemplate, props) : null;
    };
    var createProgressBarContent = function createProgressBarContent() {
      if (props.progressBarTemplate) {
        return utils.ObjectUtils.getJSXElement(props.progressBarTemplate, props);
      }
      return /*#__PURE__*/React__namespace.createElement(progressbar.ProgressBar, {
        value: progressState,
        showValue: false
      });
    };
    var createAdvanced = function createAdvanced() {
      var otherProps = utils.ObjectUtils.findDiffKeys(props, FileUpload.defaultProps);
      var className = utils.classNames('p-fileupload p-fileupload-advanced p-component', props.className);
      var headerClassName = utils.classNames('p-fileupload-buttonbar', props.headerClassName);
      var contentClassName = utils.classNames('p-fileupload-content', props.contentClassName);
      var chooseButton = createChooseButton();
      var emptyContent = createEmptyContent();
      var uploadButton, cancelButton, filesList, progressBar;
      if (!props.auto) {
        var uploadOptions = props.uploadOptions;
        var cancelOptions = props.cancelOptions;
        var uploadLabel = !uploadOptions.iconOnly ? uploadButtonLabel : '';
        var cancelLabel = !cancelOptions.iconOnly ? cancelButtonLabel : '';
        uploadButton = /*#__PURE__*/React__namespace.createElement(button.Button, {
          type: "button",
          label: uploadLabel,
          icon: uploadOptions.icon || 'pi pi-upload',
          onClick: upload,
          disabled: uploadDisabled,
          style: uploadOptions.style,
          className: uploadOptions.className
        });
        cancelButton = /*#__PURE__*/React__namespace.createElement(button.Button, {
          type: "button",
          label: cancelLabel,
          icon: cancelOptions.icon || 'pi pi-times',
          onClick: clear,
          disabled: cancelDisabled,
          style: cancelOptions.style,
          className: cancelOptions.className
        });
      }
      if (hasFiles) {
        filesList = createFiles();
        progressBar = createProgressBarContent();
      }
      var header = /*#__PURE__*/React__namespace.createElement("div", {
        className: headerClassName,
        style: props.headerStyle
      }, chooseButton, uploadButton, cancelButton);
      if (props.headerTemplate) {
        var defaultContentOptions = {
          className: headerClassName,
          chooseButton: chooseButton,
          uploadButton: uploadButton,
          cancelButton: cancelButton,
          element: header,
          props: props
        };
        header = utils.ObjectUtils.getJSXElement(props.headerTemplate, defaultContentOptions);
      }
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        id: props.id,
        className: className,
        style: props.style
      }, otherProps), header, /*#__PURE__*/React__namespace.createElement("div", {
        ref: contentRef,
        className: contentClassName,
        style: props.contentStyle,
        onDragEnter: onDragEnter,
        onDragOver: onDragOver,
        onDragLeave: onDragLeave,
        onDrop: onDrop
      }, progressBar, /*#__PURE__*/React__namespace.createElement(messages.Messages, {
        ref: messagesRef
      }), filesList, emptyContent));
    };
    var createBasic = function createBasic() {
      var chooseOptions = props.chooseOptions;
      var otherProps = utils.ObjectUtils.findDiffKeys(props, FileUpload.defaultProps);
      var className = utils.classNames('p-fileupload p-fileupload-basic p-component', props.className);
      var buttonClassName = utils.classNames('p-button p-component p-fileupload-choose', {
        'p-fileupload-choose-selected': hasFiles,
        'p-disabled': disabled,
        'p-focus': focusedState
      }, chooseOptions.className);
      var chooseIcon = chooseOptions.icon || utils.classNames({
        'pi pi-plus': !chooseOptions.icon && (!hasFiles || props.auto),
        'pi pi-upload': !chooseOptions.icon && hasFiles && !props.auto
      });
      var labelClassName = 'p-button-label p-clickable';
      var chooseLabel = chooseOptions.iconOnly ? /*#__PURE__*/React__namespace.createElement("span", {
        className: labelClassName,
        dangerouslySetInnerHTML: {
          __html: '&nbsp;'
        }
      }) : /*#__PURE__*/React__namespace.createElement("span", {
        className: labelClassName
      }, chooseButtonLabel);
      var label = props.auto ? chooseLabel : /*#__PURE__*/React__namespace.createElement("span", {
        className: labelClassName
      }, hasFiles ? filesState[0].name : chooseLabel);
      var icon = utils.IconUtils.getJSXIcon(chooseIcon, {
        className: 'p-button-icon p-button-icon-left'
      }, {
        props: props,
        hasFiles: hasFiles
      });
      var input = !hasFiles && /*#__PURE__*/React__namespace.createElement("input", {
        ref: fileInputRef,
        type: "file",
        accept: props.accept,
        multiple: props.multiple,
        disabled: disabled,
        onChange: onFileSelect
      });
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        className: className,
        style: props.style
      }, otherProps), /*#__PURE__*/React__namespace.createElement(messages.Messages, {
        ref: messagesRef
      }), /*#__PURE__*/React__namespace.createElement("span", {
        className: buttonClassName,
        style: chooseOptions.style,
        onMouseUp: onSimpleUploaderClick,
        onKeyDown: onKeyDown,
        onFocus: onFocus,
        onBlur: onBlur,
        tabIndex: 0
      }, icon, label, input, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
    };
    if (props.mode === 'advanced') return createAdvanced();else if (props.mode === 'basic') return createBasic();
  }));
  FileUpload.displayName = 'FileUpload';
  FileUpload.defaultProps = {
    __TYPE: 'FileUpload',
    id: null,
    name: null,
    url: null,
    mode: 'advanced',
    multiple: false,
    accept: null,
    disabled: false,
    auto: false,
    maxFileSize: null,
    invalidFileSizeMessageSummary: '{0}: Invalid file size, ',
    invalidFileSizeMessageDetail: 'maximum upload size is {0}.',
    style: null,
    className: null,
    widthCredentials: false,
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
    onRemove: null
  };

  exports.FileUpload = FileUpload;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.button, primereact.messages, primereact.progressbar, primereact.ripple, primereact.utils);
