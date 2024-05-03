'use strict';

var Button = require('primevue/button');
var PlusIcon = require('primevue/icons/plus');
var TimesIcon = require('primevue/icons/times');
var UploadIcon = require('primevue/icons/upload');
var Message = require('primevue/message');
var ProgressBar = require('primevue/progressbar');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var FileUploadStyle = require('primevue/fileupload/style');
var Badge = require('primevue/badge');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var PlusIcon__default = /*#__PURE__*/_interopDefaultLegacy(PlusIcon);
var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
var UploadIcon__default = /*#__PURE__*/_interopDefaultLegacy(UploadIcon);
var Message__default = /*#__PURE__*/_interopDefaultLegacy(Message);
var ProgressBar__default = /*#__PURE__*/_interopDefaultLegacy(ProgressBar);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var FileUploadStyle__default = /*#__PURE__*/_interopDefaultLegacy(FileUploadStyle);
var Badge__default = /*#__PURE__*/_interopDefaultLegacy(Badge);

var script$2 = {
  name: 'BaseFileUpload',
  "extends": BaseComponent__default["default"],
  props: {
    name: {
      type: String,
      "default": null
    },
    url: {
      type: String,
      "default": null
    },
    mode: {
      type: String,
      "default": 'advanced'
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    accept: {
      type: String,
      "default": null
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    auto: {
      type: Boolean,
      "default": false
    },
    maxFileSize: {
      type: Number,
      "default": null
    },
    invalidFileSizeMessage: {
      type: String,
      "default": '{0}: Invalid file size, file size should be smaller than {1}.'
    },
    invalidFileTypeMessage: {
      type: String,
      "default": '{0}: Invalid file type, allowed file types: {1}.'
    },
    fileLimit: {
      type: Number,
      "default": null
    },
    invalidFileLimitMessage: {
      type: String,
      "default": 'Maximum number of files exceeded, limit is {0} at most.'
    },
    withCredentials: {
      type: Boolean,
      "default": false
    },
    previewWidth: {
      type: Number,
      "default": 50
    },
    chooseLabel: {
      type: String,
      "default": null
    },
    uploadLabel: {
      type: String,
      "default": null
    },
    cancelLabel: {
      type: String,
      "default": null
    },
    customUpload: {
      type: Boolean,
      "default": false
    },
    showUploadButton: {
      type: Boolean,
      "default": true
    },
    showCancelButton: {
      type: Boolean,
      "default": true
    },
    chooseIcon: {
      type: String,
      "default": undefined
    },
    uploadIcon: {
      type: String,
      "default": undefined
    },
    cancelIcon: {
      type: String,
      "default": undefined
    },
    style: null,
    "class": null
  },
  style: FileUploadStyle__default["default"],
  provide: function provide() {
    return {
      $pcFileUpload: this,
      $parentInstance: this
    };
  }
};

var script$1 = {
  name: 'FileContent',
  hostName: 'FileUpload',
  "extends": BaseComponent__default["default"],
  emits: ['remove'],
  props: {
    files: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    badgeSeverity: {
      type: String,
      "default": 'warn'
    },
    badgeValue: {
      type: String,
      "default": null
    },
    previewWidth: {
      type: Number,
      "default": 50
    },
    templates: {
      type: null,
      "default": null
    }
  },
  methods: {
    formatSize: function formatSize(bytes) {
      var _this$$primevue$confi;
      var k = 1024;
      var dm = 3;
      var sizes = ((_this$$primevue$confi = this.$primevue.config.locale) === null || _this$$primevue$confi === void 0 ? void 0 : _this$$primevue$confi.fileSizeTypes) || ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      if (bytes === 0) {
        return "0 ".concat(sizes[0]);
      }
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      var formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
      return "".concat(formattedSize, " ").concat(sizes[i]);
    }
  },
  components: {
    Button: Button__default["default"],
    Badge: Badge__default["default"],
    TimesIcon: TimesIcon__default["default"]
  }
};

var _hoisted_1$1 = ["alt", "src", "width"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Badge = vue.resolveComponent("Badge");
  var _component_TimesIcon = vue.resolveComponent("TimesIcon");
  var _component_Button = vue.resolveComponent("Button");
  return vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.files, function (file, index) {
    return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      key: file.name + file.type + file.size,
      "class": _ctx.cx('file')
    }, _ctx.ptm('file')), [vue.createElementVNode("img", vue.mergeProps({
      role: "presentation",
      "class": _ctx.cx('fileThumbnail'),
      alt: file.name,
      src: file.objectURL,
      width: $props.previewWidth
    }, _ctx.ptm('fileThumbnail')), null, 16, _hoisted_1$1), vue.createElementVNode("div", vue.mergeProps({
      "class": _ctx.cx('fileInfo')
    }, _ctx.ptm('fileInfo')), [vue.createElementVNode("div", vue.mergeProps({
      "class": _ctx.cx('fileName')
    }, _ctx.ptm('fileName')), vue.toDisplayString(file.name), 17), vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('fileSize')
    }, _ctx.ptm('fileSize')), vue.toDisplayString($options.formatSize(file.size)), 17)], 16), vue.createVNode(_component_Badge, {
      value: $props.badgeValue,
      "class": vue.normalizeClass(_ctx.cx('fileBadge')),
      severity: $props.badgeSeverity,
      unstyled: _ctx.unstyled,
      pt: _ctx.ptm('fileBadge')
    }, null, 8, ["value", "class", "severity", "unstyled", "pt"]), vue.createElementVNode("div", vue.mergeProps({
      "class": _ctx.cx('fileActions')
    }, _ctx.ptm('fileActions')), [vue.createVNode(_component_Button, {
      onClick: function onClick($event) {
        return _ctx.$emit('remove', index);
      },
      text: "",
      rounded: "",
      severity: "danger",
      "class": vue.normalizeClass(_ctx.cx('fileRemoveButton')),
      unstyled: _ctx.unstyled,
      pt: _ctx.ptm('fileRemoveButton')
    }, {
      icon: vue.withCtx(function (iconProps) {
        return [$props.templates.fileremoveicon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.fileremoveicon), {
          key: 0,
          "class": vue.normalizeClass(iconProps["class"]),
          file: file,
          index: index
        }, null, 8, ["class", "file", "index"])) : (vue.openBlock(), vue.createBlock(_component_TimesIcon, vue.mergeProps({
          key: 1,
          "class": iconProps["class"],
          "aria-hidden": "true"
        }, _ctx.ptm('fileRemoveButton')['icon']), null, 16, ["class"]))];
      }),
      _: 2
    }, 1032, ["onClick", "class", "unstyled", "pt"])], 16)], 16);
  }), 128);
}

script$1.render = render$1;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'FileUpload',
  "extends": script$2,
  inheritAttrs: false,
  emits: ['select', 'uploader', 'before-upload', 'progress', 'upload', 'error', 'before-send', 'clear', 'remove', 'remove-uploaded-file'],
  duplicateIEEvent: false,
  data: function data() {
    return {
      uploadedFileCount: 0,
      files: [],
      messages: [],
      focused: false,
      progress: null,
      uploadedFiles: []
    };
  },
  methods: {
    onFileSelect: function onFileSelect(event) {
      if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
        this.duplicateIEEvent = false;
        return;
      }
      this.messages = [];
      this.files = this.files || [];
      var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      var _iterator = _createForOfIteratorHelper(files),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;
          if (!this.isFileSelected(file)) {
            if (this.validate(file)) {
              if (this.isImage(file)) {
                file.objectURL = window.URL.createObjectURL(file);
              }
              this.files.push(file);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.$emit('select', {
        originalEvent: event,
        files: this.files
      });
      if (this.fileLimit) {
        this.checkFileLimit();
      }
      if (this.auto && this.hasFiles && !this.isFileLimitExceeded()) {
        this.upload();
      }
      if (event.type !== 'drop' && this.isIE11()) {
        this.clearIEInput();
      } else {
        this.clearInputElement();
      }
    },
    choose: function choose() {
      this.$refs.fileInput.click();
    },
    upload: function upload() {
      var _this = this;
      if (this.customUpload) {
        if (this.fileLimit) {
          this.uploadedFileCount += this.files.length;
        }
        this.$emit('uploader', {
          files: this.files
        });
        this.clear();
      } else {
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        this.$emit('before-upload', {
          xhr: xhr,
          formData: formData
        });
        var _iterator2 = _createForOfIteratorHelper(this.files),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var file = _step2.value;
            formData.append(this.name, file, file.name);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        xhr.upload.addEventListener('progress', function (event) {
          if (event.lengthComputable) {
            _this.progress = Math.round(event.loaded * 100 / event.total);
          }
          _this.$emit('progress', {
            originalEvent: event,
            progress: _this.progress
          });
        });
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            var _this$uploadedFiles;
            _this.progress = 0;
            if (xhr.status >= 200 && xhr.status < 300) {
              if (_this.fileLimit) {
                _this.uploadedFileCount += _this.files.length;
              }
              _this.$emit('upload', {
                xhr: xhr,
                files: _this.files
              });
            } else {
              _this.$emit('error', {
                xhr: xhr,
                files: _this.files
              });
            }
            (_this$uploadedFiles = _this.uploadedFiles).push.apply(_this$uploadedFiles, _toConsumableArray(_this.files));
            _this.clear();
          }
        };
        xhr.open('POST', this.url, true);
        this.$emit('before-send', {
          xhr: xhr,
          formData: formData
        });
        xhr.withCredentials = this.withCredentials;
        xhr.send(formData);
      }
    },
    clear: function clear() {
      this.files = [];
      this.messages = null;
      this.$emit('clear');
      if (this.isAdvanced) {
        this.clearInputElement();
      }
    },
    onFocus: function onFocus() {
      this.focused = true;
    },
    onBlur: function onBlur() {
      this.focused = false;
    },
    isFileSelected: function isFileSelected(file) {
      if (this.files && this.files.length) {
        var _iterator3 = _createForOfIteratorHelper(this.files),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var sFile = _step3.value;
            if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size) return true;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      return false;
    },
    isIE11: function isIE11() {
      return !!window['MSInputMethodContext'] && !!document['documentMode'];
    },
    validate: function validate(file) {
      if (this.accept && !this.isFileTypeValid(file)) {
        this.messages.push(this.invalidFileTypeMessage.replace('{0}', file.name).replace('{1}', this.accept));
        return false;
      }
      if (this.maxFileSize && file.size > this.maxFileSize) {
        this.messages.push(this.invalidFileSizeMessage.replace('{0}', file.name).replace('{1}', this.formatSize(this.maxFileSize)));
        return false;
      }
      return true;
    },
    isFileTypeValid: function isFileTypeValid(file) {
      var acceptableTypes = this.accept.split(',').map(function (type) {
        return type.trim();
      });
      var _iterator4 = _createForOfIteratorHelper(acceptableTypes),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var type = _step4.value;
          var acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type) : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
          if (acceptable) {
            return true;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return false;
    },
    getTypeClass: function getTypeClass(fileType) {
      return fileType.substring(0, fileType.indexOf('/'));
    },
    isWildcard: function isWildcard(fileType) {
      return fileType.indexOf('*') !== -1;
    },
    getFileExtension: function getFileExtension(file) {
      return '.' + file.name.split('.').pop();
    },
    isImage: function isImage(file) {
      return /^image\//.test(file.type);
    },
    onDragEnter: function onDragEnter(event) {
      if (!this.disabled) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    onDragOver: function onDragOver(event) {
      if (!this.disabled) {
        !this.isUnstyled && utils.DomHandler.addClass(this.$refs.content, 'p-fileupload-highlight');
        this.$refs.content.setAttribute('data-p-highlight', true);
        event.stopPropagation();
        event.preventDefault();
      }
    },
    onDragLeave: function onDragLeave() {
      if (!this.disabled) {
        !this.isUnstyled && utils.DomHandler.removeClass(this.$refs.content, 'p-fileupload-highlight');
        this.$refs.content.setAttribute('data-p-highlight', false);
      }
    },
    onDrop: function onDrop(event) {
      if (!this.disabled) {
        !this.isUnstyled && utils.DomHandler.removeClass(this.$refs.content, 'p-fileupload-highlight');
        this.$refs.content.setAttribute('data-p-highlight', false);
        event.stopPropagation();
        event.preventDefault();
        var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        var allowDrop = this.multiple || files && files.length === 1;
        if (allowDrop) {
          this.onFileSelect(event);
        }
      }
    },
    onBasicUploaderClick: function onBasicUploaderClick(event) {
      if (this.hasFiles) this.upload();else if (event.button === 0) this.$refs.fileInput.click();
    },
    remove: function remove(index) {
      this.clearInputElement();
      var removedFile = this.files.splice(index, 1)[0];
      this.files = _toConsumableArray(this.files);
      this.$emit('remove', {
        file: removedFile,
        files: this.files
      });
    },
    removeUploadedFile: function removeUploadedFile(index) {
      var removedFile = this.uploadedFiles.splice(index, 1)[0];
      this.uploadedFiles = _toConsumableArray(this.uploadedFiles);
      this.$emit('remove-uploaded-file', {
        file: removedFile,
        files: this.uploadedFiles
      });
    },
    clearInputElement: function clearInputElement() {
      this.$refs.fileInput.value = '';
    },
    clearIEInput: function clearIEInput() {
      if (this.$refs.fileInput) {
        this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
        this.$refs.fileInput.value = '';
      }
    },
    formatSize: function formatSize(bytes) {
      var _this$$primevue$confi;
      var k = 1024;
      var dm = 3;
      var sizes = ((_this$$primevue$confi = this.$primevue.config.locale) === null || _this$$primevue$confi === void 0 ? void 0 : _this$$primevue$confi.fileSizeTypes) || ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      if (bytes === 0) {
        return "0 ".concat(sizes[0]);
      }
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      var formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
      return "".concat(formattedSize, " ").concat(sizes[i]);
    },
    isFileLimitExceeded: function isFileLimitExceeded() {
      if (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focused) {
        this.focused = false;
      }
      return this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
    },
    checkFileLimit: function checkFileLimit() {
      if (this.isFileLimitExceeded()) {
        this.messages.push(this.invalidFileLimitMessage.replace('{0}', this.fileLimit.toString()));
      }
    },
    onMessageClose: function onMessageClose() {
      this.messages = null;
    }
  },
  computed: {
    isAdvanced: function isAdvanced() {
      return this.mode === 'advanced';
    },
    isBasic: function isBasic() {
      return this.mode === 'basic';
    },
    chooseButtonClass: function chooseButtonClass() {
      return [this.cx('chooseButton'), this["class"]];
    },
    basicChooseButtonLabel: function basicChooseButtonLabel() {
      return this.auto ? this.chooseButtonLabel : this.hasFiles ? this.files.map(function (f) {
        return f.name;
      }).join(', ') : this.chooseButtonLabel;
    },
    hasFiles: function hasFiles() {
      return this.files && this.files.length > 0;
    },
    hasUploadedFiles: function hasUploadedFiles() {
      return this.uploadedFiles && this.uploadedFiles.length > 0;
    },
    chooseDisabled: function chooseDisabled() {
      return this.disabled || this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
    },
    uploadDisabled: function uploadDisabled() {
      return this.disabled || !this.hasFiles || this.fileLimit && this.fileLimit < this.files.length;
    },
    cancelDisabled: function cancelDisabled() {
      return this.disabled || !this.hasFiles;
    },
    chooseButtonLabel: function chooseButtonLabel() {
      return this.chooseLabel || this.$primevue.config.locale.choose;
    },
    uploadButtonLabel: function uploadButtonLabel() {
      return this.uploadLabel || this.$primevue.config.locale.upload;
    },
    cancelButtonLabel: function cancelButtonLabel() {
      return this.cancelLabel || this.$primevue.config.locale.cancel;
    },
    completedLabel: function completedLabel() {
      return this.$primevue.config.locale.completed;
    },
    pendingLabel: function pendingLabel() {
      return this.$primevue.config.locale.pending;
    }
  },
  components: {
    Button: Button__default["default"],
    ProgressBar: ProgressBar__default["default"],
    Message: Message__default["default"],
    FileContent: script$1,
    PlusIcon: PlusIcon__default["default"],
    UploadIcon: UploadIcon__default["default"],
    TimesIcon: TimesIcon__default["default"]
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

var _hoisted_1 = ["multiple", "accept", "disabled"];
var _hoisted_2 = ["accept", "disabled", "multiple"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Button = vue.resolveComponent("Button");
  var _component_ProgressBar = vue.resolveComponent("ProgressBar");
  var _component_FileContent = vue.resolveComponent("FileContent");
  var _component_Message = vue.resolveComponent("Message");
  return $options.isAdvanced ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [vue.createElementVNode("input", vue.mergeProps({
    ref: "fileInput",
    type: "file",
    onChange: _cache[0] || (_cache[0] = function () {
      return $options.onFileSelect && $options.onFileSelect.apply($options, arguments);
    }),
    multiple: _ctx.multiple,
    accept: _ctx.accept,
    disabled: $options.chooseDisabled
  }, _ctx.ptm('input')), null, 16, _hoisted_1), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('header')
  }, _ctx.ptm('header')), [vue.renderSlot(_ctx.$slots, "header", {
    files: $data.files,
    uploadedFiles: $data.uploadedFiles,
    chooseCallback: $options.choose,
    uploadCallback: $options.upload,
    clearCallback: $options.clear
  }, function () {
    return [vue.createVNode(_component_Button, {
      label: $options.chooseButtonLabel,
      "class": vue.normalizeClass($options.chooseButtonClass),
      style: vue.normalizeStyle(_ctx.style),
      disabled: _ctx.disabled,
      unstyled: _ctx.unstyled,
      onClick: $options.choose,
      onKeydown: vue.withKeys($options.choose, ["enter"]),
      onFocus: $options.onFocus,
      onBlur: $options.onBlur,
      pt: _ctx.ptm('chooseButton')
    }, {
      icon: vue.withCtx(function (iconProps) {
        return [vue.renderSlot(_ctx.$slots, "chooseicon", {}, function () {
          return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.chooseIcon ? 'span' : 'PlusIcon'), vue.mergeProps({
            "class": [iconProps["class"], _ctx.chooseIcon],
            "aria-hidden": "true"
          }, _ctx.ptm('chooseButton')['icon']), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 8, ["label", "class", "style", "disabled", "unstyled", "onClick", "onKeydown", "onFocus", "onBlur", "pt"]), _ctx.showUploadButton ? (vue.openBlock(), vue.createBlock(_component_Button, {
      key: 0,
      "class": vue.normalizeClass(_ctx.cx('uploadButton')),
      label: $options.uploadButtonLabel,
      onClick: $options.upload,
      disabled: $options.uploadDisabled,
      unstyled: _ctx.unstyled,
      pt: _ctx.ptm('uploadButton')
    }, {
      icon: vue.withCtx(function (iconProps) {
        return [vue.renderSlot(_ctx.$slots, "uploadicon", {}, function () {
          return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.uploadIcon ? 'span' : 'UploadIcon'), vue.mergeProps({
            "class": [iconProps["class"], _ctx.uploadIcon],
            "aria-hidden": "true"
          }, _ctx.ptm('uploadButton')['icon'], {
            "data-pc-section": "uploadbuttonicon"
          }), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 8, ["class", "label", "onClick", "disabled", "unstyled", "pt"])) : vue.createCommentVNode("", true), _ctx.showCancelButton ? (vue.openBlock(), vue.createBlock(_component_Button, {
      key: 1,
      "class": vue.normalizeClass(_ctx.cx('cancelButton')),
      label: $options.cancelButtonLabel,
      onClick: $options.clear,
      disabled: $options.cancelDisabled,
      unstyled: _ctx.unstyled,
      pt: _ctx.ptm('cancelButton')
    }, {
      icon: vue.withCtx(function (iconProps) {
        return [vue.renderSlot(_ctx.$slots, "cancelicon", {}, function () {
          return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.cancelIcon ? 'span' : 'TimesIcon'), vue.mergeProps({
            "class": [iconProps["class"], _ctx.cancelIcon],
            "aria-hidden": "true"
          }, _ctx.ptm('cancelButton')['icon'], {
            "data-pc-section": "cancelbuttonicon"
          }), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 8, ["class", "label", "onClick", "disabled", "unstyled", "pt"])) : vue.createCommentVNode("", true)];
  })], 16), vue.createElementVNode("div", vue.mergeProps({
    ref: "content",
    "class": _ctx.cx('content'),
    onDragenter: _cache[1] || (_cache[1] = function () {
      return $options.onDragEnter && $options.onDragEnter.apply($options, arguments);
    }),
    onDragover: _cache[2] || (_cache[2] = function () {
      return $options.onDragOver && $options.onDragOver.apply($options, arguments);
    }),
    onDragleave: _cache[3] || (_cache[3] = function () {
      return $options.onDragLeave && $options.onDragLeave.apply($options, arguments);
    }),
    onDrop: _cache[4] || (_cache[4] = function () {
      return $options.onDrop && $options.onDrop.apply($options, arguments);
    })
  }, _ctx.ptm('content'), {
    "data-p-highlight": false
  }), [vue.renderSlot(_ctx.$slots, "content", {
    files: $data.files,
    uploadedFiles: $data.uploadedFiles,
    removeUploadedFileCallback: $options.removeUploadedFile,
    removeFileCallback: $options.remove,
    progress: $data.progress,
    messages: $data.messages
  }, function () {
    return [$options.hasFiles ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 0
    }, [vue.createVNode(_component_ProgressBar, {
      value: $data.progress,
      showValue: false,
      unstyled: _ctx.unstyled,
      pt: _ctx.ptm('progressbar')
    }, null, 8, ["value", "unstyled", "pt"]), $options.hasFiles ? (vue.openBlock(), vue.createElementBlock("div", {
      key: 0,
      "class": vue.normalizeClass(_ctx.cx('fileList'))
    }, [vue.createVNode(_component_FileContent, {
      files: $data.files,
      onRemove: $options.remove,
      badgeValue: $options.pendingLabel,
      previewWidth: _ctx.previewWidth,
      templates: _ctx.$slots,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["files", "onRemove", "badgeValue", "previewWidth", "templates", "unstyled", "pt"])], 2)) : vue.createCommentVNode("", true)], 64)) : vue.createCommentVNode("", true), (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.messages, function (msg) {
      return vue.openBlock(), vue.createBlock(_component_Message, {
        key: msg,
        severity: "error",
        onClose: $options.onMessageClose,
        unstyled: _ctx.unstyled,
        pt: _ctx.ptm('message')
      }, {
        "default": vue.withCtx(function () {
          return [vue.createTextVNode(vue.toDisplayString(msg), 1)];
        }),
        _: 2
      }, 1032, ["onClose", "unstyled", "pt"]);
    }), 128)), $options.hasUploadedFiles ? (vue.openBlock(), vue.createElementBlock("div", {
      key: 1,
      "class": vue.normalizeClass(_ctx.cx('fileList'))
    }, [vue.createVNode(_component_FileContent, {
      files: $data.uploadedFiles,
      onRemove: $options.removeUploadedFile,
      badgeValue: $options.completedLabel,
      badgeSeverity: "success",
      previewWidth: _ctx.previewWidth,
      templates: _ctx.$slots,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["files", "onRemove", "badgeValue", "previewWidth", "templates", "unstyled", "pt"])], 2)) : vue.createCommentVNode("", true)];
  }), _ctx.$slots.empty && !$options.hasFiles && !$options.hasUploadedFiles ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('empty')
  }, _ctx.ptm('empty')), [vue.renderSlot(_ctx.$slots, "empty")], 16)) : vue.createCommentVNode("", true)], 16)], 16)) : $options.isBasic ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 1,
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.messages, function (msg) {
    return vue.openBlock(), vue.createBlock(_component_Message, {
      key: msg,
      severity: "error",
      onClose: $options.onMessageClose,
      unstyled: _ctx.unstyled,
      pt: _ctx.ptm('messages')
    }, {
      "default": vue.withCtx(function () {
        return [vue.createTextVNode(vue.toDisplayString(msg), 1)];
      }),
      _: 2
    }, 1032, ["onClose", "unstyled", "pt"]);
  }), 128)), vue.createVNode(_component_Button, vue.mergeProps({
    label: $options.basicChooseButtonLabel,
    "class": $options.chooseButtonClass,
    style: _ctx.style,
    disabled: _ctx.disabled,
    unstyled: _ctx.unstyled,
    onMouseup: $options.onBasicUploaderClick,
    onKeydown: vue.withKeys($options.choose, ["enter"]),
    onFocus: $options.onFocus,
    onBlur: $options.onBlur
  }, _ctx.ptm('button')), {
    icon: vue.withCtx(function (iconProps) {
      return [!$options.hasFiles || _ctx.auto ? vue.renderSlot(_ctx.$slots, "uploadicon", {
        key: 0
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.uploadIcon ? 'span' : 'UploadIcon'), vue.mergeProps({
          "class": [iconProps["class"], _ctx.uploadIcon],
          "aria-hidden": "true"
        }, _ctx.ptm('button')['icon']), null, 16, ["class"]))];
      }) : vue.renderSlot(_ctx.$slots, "chooseicon", {
        key: 1,
        "class": vue.normalizeClass(_ctx.cx('chooseIcon'))
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.chooseIcon ? 'span' : 'PlusIcon'), vue.mergeProps({
          "class": [iconProps["class"], _ctx.cx('chooseIcon'), _ctx.chooseIcon],
          "aria-hidden": "true"
        }, _ctx.ptm('button')['icon']), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["label", "class", "style", "disabled", "unstyled", "onMouseup", "onKeydown", "onFocus", "onBlur"]), !$options.hasFiles ? (vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
    key: 0,
    ref: "fileInput",
    type: "file",
    accept: _ctx.accept,
    disabled: _ctx.disabled,
    multiple: _ctx.multiple,
    onChange: _cache[5] || (_cache[5] = function () {
      return $options.onFileSelect && $options.onFileSelect.apply($options, arguments);
    }),
    onFocus: _cache[6] || (_cache[6] = function () {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[7] || (_cache[7] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    })
  }, _ctx.ptm('input')), null, 16, _hoisted_2)) : vue.createCommentVNode("", true)], 16)) : vue.createCommentVNode("", true);
}

script.render = render;

module.exports = script;
