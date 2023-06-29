'use strict';

var BaseComponent = require('primevue/basecomponent');
var Button = require('primevue/button');
var PlusIcon = require('primevue/icons/plus');
var TimesIcon = require('primevue/icons/times');
var UploadIcon = require('primevue/icons/upload');
var Message = require('primevue/message');
var ProgressBar = require('primevue/progressbar');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var Badge = require('primevue/badge');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var PlusIcon__default = /*#__PURE__*/_interopDefaultLegacy(PlusIcon);
var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
var UploadIcon__default = /*#__PURE__*/_interopDefaultLegacy(UploadIcon);
var Message__default = /*#__PURE__*/_interopDefaultLegacy(Message);
var ProgressBar__default = /*#__PURE__*/_interopDefaultLegacy(ProgressBar);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var Badge__default = /*#__PURE__*/_interopDefaultLegacy(Badge);

var script$1 = {
    extends: BaseComponent__default["default"],
    emits: ['remove'],
    props: {
        files: {
            type: Array,
            default: () => []
        },
        badgeSeverity: {
            type: String,
            default: 'warning'
        },
        badgeValue: {
            type: String,
            default: null
        },
        previewWidth: {
            type: Number,
            default: 50
        },
        templates: {
            type: null,
            default: null
        }
    },
    methods: {
        formatSize(bytes) {
            if (bytes === 0) {
                return '0 B';
            }

            let k = 1000,
                dm = 3,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }
    },
    components: {
        FileUploadButton: Button__default["default"],
        FileUploadBadge: Badge__default["default"],
        TimesIcon: TimesIcon__default["default"]
    }
};

const _hoisted_1$1 = ["alt", "src", "width"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FileUploadBadge = vue.resolveComponent("FileUploadBadge");
  const _component_TimesIcon = vue.resolveComponent("TimesIcon");
  const _component_FileUploadButton = vue.resolveComponent("FileUploadButton");

  return (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.files, (file, index) => {
    return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      key: file.name + file.type + file.size,
      class: "p-fileupload-file"
    }, _ctx.ptm('file')), [
      vue.createElementVNode("img", vue.mergeProps({
        role: "presentation",
        class: "p-fileupload-file-thumbnail",
        alt: file.name,
        src: file.objectURL,
        width: $props.previewWidth
      }, _ctx.ptm('thumbnail')), null, 16, _hoisted_1$1),
      vue.createElementVNode("div", vue.mergeProps({ class: "p-fileupload-file-details" }, _ctx.ptm('details')), [
        vue.createElementVNode("div", vue.mergeProps({ class: "p-fileupload-file-name" }, _ctx.ptm('fileName')), vue.toDisplayString(file.name), 17),
        vue.createElementVNode("span", vue.mergeProps({ class: "p-fileupload-file-size" }, _ctx.ptm('fileSize')), vue.toDisplayString($options.formatSize(file.size)), 17),
        vue.createVNode(_component_FileUploadBadge, {
          value: $props.badgeValue,
          class: "p-fileupload-file-badge",
          severity: $props.badgeSeverity,
          pt: _ctx.ptm('badge')
        }, null, 8, ["value", "severity", "pt"])
      ], 16),
      vue.createElementVNode("div", vue.mergeProps({ class: "p-fileupload-file-actions" }, _ctx.ptm('actions')), [
        vue.createVNode(_component_FileUploadButton, {
          onClick: $event => (_ctx.$emit('remove', index)),
          text: "",
          rounded: "",
          severity: "danger",
          class: "p-fileupload-file-remove",
          pt: _ctx.ptm('removeButton')
        }, {
          icon: vue.withCtx((iconProps) => [
            ($props.templates.fileremoveicon)
              ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.fileremoveicon), {
                  key: 0,
                  class: vue.normalizeClass(iconProps.class),
                  file: file,
                  index: index
                }, null, 8, ["class", "file", "index"]))
              : (vue.openBlock(), vue.createBlock(_component_TimesIcon, vue.mergeProps({
                  key: 1,
                  class: iconProps.class,
                  "aria-hidden": "true"
                }, _ctx.ptm('removeButton')['icon']), null, 16, ["class"]))
          ]),
          _: 2
        }, 1032, ["onClick", "pt"])
      ], 16)
    ], 16))
  }), 128))
}

script$1.render = render$1;

var script = {
    name: 'FileUpload',
    extends: BaseComponent__default["default"],
    emits: ['select', 'uploader', 'before-upload', 'progress', 'upload', 'error', 'before-send', 'clear', 'remove', 'remove-uploaded-file'],
    props: {
        name: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        },
        mode: {
            type: String,
            default: 'advanced'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        accept: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        auto: {
            type: Boolean,
            default: false
        },
        maxFileSize: {
            type: Number,
            default: null
        },
        invalidFileSizeMessage: {
            type: String,
            default: '{0}: Invalid file size, file size should be smaller than {1}.'
        },
        invalidFileTypeMessage: {
            type: String,
            default: '{0}: Invalid file type, allowed file types: {1}.'
        },
        fileLimit: {
            type: Number,
            default: null
        },
        invalidFileLimitMessage: {
            type: String,
            default: 'Maximum number of files exceeded, limit is {0} at most.'
        },
        withCredentials: {
            type: Boolean,
            default: false
        },
        previewWidth: {
            type: Number,
            default: 50
        },
        chooseLabel: {
            type: String,
            default: null
        },
        uploadLabel: {
            type: String,
            default: null
        },
        cancelLabel: {
            type: String,
            default: null
        },
        customUpload: {
            type: Boolean,
            default: false
        },
        showUploadButton: {
            type: Boolean,
            default: true
        },
        showCancelButton: {
            type: Boolean,
            default: true
        },
        chooseIcon: {
            type: String,
            default: undefined
        },
        uploadIcon: {
            type: String,
            default: undefined
        },
        cancelIcon: {
            type: String,
            default: undefined
        },
        style: null,
        class: null
    },
    duplicateIEEvent: false,
    data() {
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
        onFileSelect(event) {
            if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
                this.duplicateIEEvent = false;

                return;
            }

            this.messages = [];
            this.files = this.files || [];
            let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

            for (let file of files) {
                if (!this.isFileSelected(file)) {
                    if (this.validate(file)) {
                        if (this.isImage(file)) {
                            file.objectURL = window.URL.createObjectURL(file);
                        }

                        this.files.push(file);
                    }
                }
            }

            this.$emit('select', { originalEvent: event, files: this.files });

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
        choose() {
            this.$refs.fileInput.click();
        },
        upload() {
            if (this.customUpload) {
                if (this.fileLimit) {
                    this.uploadedFileCount += this.files.length;
                }

                this.$emit('uploader', { files: this.files });
                this.clear();
            } else {
                let xhr = new XMLHttpRequest();
                let formData = new FormData();

                this.$emit('before-upload', {
                    xhr: xhr,
                    formData: formData
                });

                for (let file of this.files) {
                    formData.append(this.name, file, file.name);
                }

                xhr.upload.addEventListener('progress', (event) => {
                    if (event.lengthComputable) {
                        this.progress = Math.round((event.loaded * 100) / event.total);
                    }

                    this.$emit('progress', {
                        originalEvent: event,
                        progress: this.progress
                    });
                });

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        this.progress = 0;

                        if (xhr.status >= 200 && xhr.status < 300) {
                            if (this.fileLimit) {
                                this.uploadedFileCount += this.files.length;
                            }

                            this.$emit('upload', {
                                xhr: xhr,
                                files: this.files
                            });
                        } else {
                            this.$emit('error', {
                                xhr: xhr,
                                files: this.files
                            });
                        }

                        this.uploadedFiles.push(...this.files);
                        this.clear();
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
        clear() {
            this.files = [];
            this.messages = null;
            this.$emit('clear');

            if (this.isAdvanced) {
                this.clearInputElement();
            }
        },
        onFocus() {
            this.focused = true;
        },
        onBlur() {
            this.focused = false;
        },
        isFileSelected(file) {
            if (this.files && this.files.length) {
                for (let sFile of this.files) {
                    if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size) return true;
                }
            }

            return false;
        },
        isIE11() {
            return !!window['MSInputMethodContext'] && !!document['documentMode'];
        },
        validate(file) {
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
        isFileTypeValid(file) {
            let acceptableTypes = this.accept.split(',').map((type) => type.trim());

            for (let type of acceptableTypes) {
                let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type) : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();

                if (acceptable) {
                    return true;
                }
            }

            return false;
        },
        getTypeClass(fileType) {
            return fileType.substring(0, fileType.indexOf('/'));
        },
        isWildcard(fileType) {
            return fileType.indexOf('*') !== -1;
        },
        getFileExtension(file) {
            return '.' + file.name.split('.').pop();
        },
        isImage(file) {
            return /^image\//.test(file.type);
        },
        onDragEnter(event) {
            if (!this.disabled) {
                event.stopPropagation();
                event.preventDefault();
            }
        },
        onDragOver(event) {
            if (!this.disabled) {
                utils.DomHandler.addClass(this.$refs.content, 'p-fileupload-highlight');
                event.stopPropagation();
                event.preventDefault();
            }
        },
        onDragLeave() {
            if (!this.disabled) {
                utils.DomHandler.removeClass(this.$refs.content, 'p-fileupload-highlight');
            }
        },
        onDrop(event) {
            if (!this.disabled) {
                utils.DomHandler.removeClass(this.$refs.content, 'p-fileupload-highlight');
                event.stopPropagation();
                event.preventDefault();

                const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
                const allowDrop = this.multiple || (files && files.length === 1);

                if (allowDrop) {
                    this.onFileSelect(event);
                }
            }
        },
        onBasicUploaderClick() {
            if (this.hasFiles) this.upload();
            else this.$refs.fileInput.click();
        },
        remove(index) {
            this.clearInputElement();
            let removedFile = this.files.splice(index, 1)[0];

            this.files = [...this.files];
            this.$emit('remove', {
                file: removedFile,
                files: this.files
            });
        },
        removeUploadedFile(index) {
            let removedFile = this.uploadedFiles.splice(index, 1)[0];

            this.uploadedFiles = [...this.uploadedFiles];
            this.$emit('remove-uploaded-file', {
                file: removedFile,
                files: this.uploadedFiles
            });
        },
        clearInputElement() {
            this.$refs.fileInput.value = '';
        },
        clearIEInput() {
            if (this.$refs.fileInput) {
                this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
                this.$refs.fileInput.value = '';
            }
        },
        formatSize(bytes) {
            if (bytes === 0) {
                return '0 B';
            }

            let k = 1000,
                dm = 3,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        isFileLimitExceeded() {
            if (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focused) {
                this.focused = false;
            }

            return this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
        },
        checkFileLimit() {
            if (this.isFileLimitExceeded()) {
                this.messages.push(this.invalidFileLimitMessage.replace('{0}', this.fileLimit.toString()));
            }
        },
        onMessageClose() {
            this.messages = null;
        }
    },
    computed: {
        isAdvanced() {
            return this.mode === 'advanced';
        },
        isBasic() {
            return this.mode === 'basic';
        },
        advancedChooseButtonClass() {
            return [
                'p-button p-component p-fileupload-choose',
                this.class,
                {
                    'p-disabled': this.disabled,
                    'p-focus': this.focused
                }
            ];
        },
        basicChooseButtonClass() {
            return [
                'p-button p-component p-fileupload-choose',
                this.class,
                {
                    'p-fileupload-choose-selected': this.hasFiles,
                    'p-disabled': this.disabled,
                    'p-focus': this.focused
                }
            ];
        },
        basicChooseButtonLabel() {
            return this.auto ? this.chooseButtonLabel : this.hasFiles ? this.files.map((f) => f.name).join(', ') : this.chooseButtonLabel;
        },
        hasFiles() {
            return this.files && this.files.length > 0;
        },
        hasUploadedFiles() {
            return this.uploadedFiles && this.uploadedFiles.length > 0;
        },
        chooseDisabled() {
            return this.disabled || (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount);
        },
        uploadDisabled() {
            return this.disabled || !this.hasFiles || (this.fileLimit && this.fileLimit < this.files.length);
        },
        cancelDisabled() {
            return this.disabled || !this.hasFiles;
        },
        chooseButtonLabel() {
            return this.chooseLabel || this.$primevue.config.locale.choose;
        },
        uploadButtonLabel() {
            return this.uploadLabel || this.$primevue.config.locale.upload;
        },
        cancelButtonLabel() {
            return this.cancelLabel || this.$primevue.config.locale.cancel;
        },
        completedLabel() {
            return this.$primevue.config.locale.completed;
        },
        pendingLabel() {
            return this.$primevue.config.locale.pending;
        }
    },
    components: {
        FileUploadButton: Button__default["default"],
        FileUploadProgressBar: ProgressBar__default["default"],
        FileUploadMessage: Message__default["default"],
        FileContent: script$1,
        PlusIcon: PlusIcon__default["default"],
        UploadIcon: UploadIcon__default["default"],
        TimesIcon: TimesIcon__default["default"]
    },
    directives: {
        ripple: Ripple__default["default"]
    }
};

const _hoisted_1 = ["multiple", "accept", "disabled"];
const _hoisted_2 = ["accept", "disabled", "multiple"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FileUploadButton = vue.resolveComponent("FileUploadButton");
  const _component_FileUploadProgressBar = vue.resolveComponent("FileUploadProgressBar");
  const _component_FileUploadMessage = vue.resolveComponent("FileUploadMessage");
  const _component_FileContent = vue.resolveComponent("FileContent");
  const _directive_ripple = vue.resolveDirective("ripple");

  return ($options.isAdvanced)
    ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        class: "p-fileupload p-fileupload-advanced p-component"
      }, _ctx.ptm('root')), [
        vue.createElementVNode("input", vue.mergeProps({
          ref: "fileInput",
          type: "file",
          onChange: _cache[0] || (_cache[0] = (...args) => ($options.onFileSelect && $options.onFileSelect(...args))),
          multiple: $props.multiple,
          accept: $props.accept,
          disabled: $options.chooseDisabled
        }, _ctx.ptm('input')), null, 16, _hoisted_1),
        vue.createElementVNode("div", vue.mergeProps({ class: "p-fileupload-buttonbar" }, _ctx.ptm('buttonbar')), [
          vue.renderSlot(_ctx.$slots, "header", {
            files: $data.files,
            uploadedFiles: $data.uploadedFiles,
            chooseCallback: $options.choose,
            uploadCallback: $options.upload,
            clearCallback: $options.clear
          }, () => [
            vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
              class: $options.advancedChooseButtonClass,
              style: $props.style,
              onClick: _cache[1] || (_cache[1] = (...args) => ($options.choose && $options.choose(...args))),
              onKeydown: _cache[2] || (_cache[2] = vue.withKeys((...args) => ($options.choose && $options.choose(...args)), ["enter"])),
              onFocus: _cache[3] || (_cache[3] = (...args) => ($options.onFocus && $options.onFocus(...args))),
              onBlur: _cache[4] || (_cache[4] = (...args) => ($options.onBlur && $options.onBlur(...args))),
              tabindex: "0"
            }, _ctx.ptm('chooseButton')), [
              vue.renderSlot(_ctx.$slots, "chooseicon", {}, () => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.chooseIcon ? 'span' : 'PlusIcon'), vue.mergeProps({
                  class: ['p-button-icon p-button-icon-left', $props.chooseIcon],
                  "aria-hidden": "true"
                }, _ctx.ptm('chooseIcon')), null, 16, ["class"]))
              ]),
              vue.createElementVNode("span", vue.mergeProps({ class: "p-button-label" }, _ctx.ptm('chooseButtonLabel')), vue.toDisplayString($options.chooseButtonLabel), 17)
            ], 16)), [
              [_directive_ripple]
            ]),
            ($props.showUploadButton)
              ? (vue.openBlock(), vue.createBlock(_component_FileUploadButton, {
                  key: 0,
                  label: $options.uploadButtonLabel,
                  onClick: $options.upload,
                  disabled: $options.uploadDisabled,
                  pt: _ctx.ptm('uploadButton')
                }, {
                  icon: vue.withCtx((iconProps) => [
                    vue.renderSlot(_ctx.$slots, "uploadicon", {}, () => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.uploadIcon ? 'span' : 'UploadIcon'), vue.mergeProps({
                        class: [iconProps.class, $props.uploadIcon],
                        "aria-hidden": "true"
                      }, _ctx.ptm('uploadButton')['icon']), null, 16, ["class"]))
                    ])
                  ]),
                  _: 3
                }, 8, ["label", "onClick", "disabled", "pt"]))
              : vue.createCommentVNode("", true),
            ($props.showCancelButton)
              ? (vue.openBlock(), vue.createBlock(_component_FileUploadButton, {
                  key: 1,
                  label: $options.cancelButtonLabel,
                  onClick: $options.clear,
                  disabled: $options.cancelDisabled,
                  pt: _ctx.ptm('cancelButton')
                }, {
                  icon: vue.withCtx((iconProps) => [
                    vue.renderSlot(_ctx.$slots, "cancelicon", {}, () => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.cancelIcon ? 'span' : 'TimesIcon'), vue.mergeProps({
                        class: [iconProps.class, $props.cancelIcon],
                        "aria-hidden": "true"
                      }, _ctx.ptm('cancelButton')['icon']), null, 16, ["class"]))
                    ])
                  ]),
                  _: 3
                }, 8, ["label", "onClick", "disabled", "pt"]))
              : vue.createCommentVNode("", true)
          ])
        ], 16),
        vue.createElementVNode("div", vue.mergeProps({
          ref: "content",
          class: "p-fileupload-content",
          onDragenter: _cache[5] || (_cache[5] = (...args) => ($options.onDragEnter && $options.onDragEnter(...args))),
          onDragover: _cache[6] || (_cache[6] = (...args) => ($options.onDragOver && $options.onDragOver(...args))),
          onDragleave: _cache[7] || (_cache[7] = (...args) => ($options.onDragLeave && $options.onDragLeave(...args))),
          onDrop: _cache[8] || (_cache[8] = (...args) => ($options.onDrop && $options.onDrop(...args)))
        }, _ctx.ptm('content')), [
          vue.renderSlot(_ctx.$slots, "content", {
            files: $data.files,
            uploadedFiles: $data.uploadedFiles,
            removeUploadedFileCallback: $options.removeUploadedFile,
            removeFileCallback: $options.remove,
            progress: $data.progress,
            messages: $data.messages
          }, () => [
            ($options.hasFiles)
              ? (vue.openBlock(), vue.createBlock(_component_FileUploadProgressBar, {
                  key: 0,
                  value: $data.progress,
                  showValue: false,
                  pt: _ctx.ptm('progressbar')
                }, null, 8, ["value", "pt"]))
              : vue.createCommentVNode("", true),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.messages, (msg) => {
              return (vue.openBlock(), vue.createBlock(_component_FileUploadMessage, {
                key: msg,
                severity: "error",
                onClose: $options.onMessageClose,
                pt: _ctx.ptm('message')
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(msg), 1)
                ]),
                _: 2
              }, 1032, ["onClose", "pt"]))
            }), 128)),
            ($options.hasFiles)
              ? (vue.openBlock(), vue.createBlock(_component_FileContent, {
                  key: 1,
                  files: $data.files,
                  onRemove: $options.remove,
                  badgeValue: $options.pendingLabel,
                  previewWidth: $props.previewWidth,
                  templates: _ctx.$slots,
                  pt: _ctx.pt
                }, null, 8, ["files", "onRemove", "badgeValue", "previewWidth", "templates", "pt"]))
              : vue.createCommentVNode("", true),
            vue.createVNode(_component_FileContent, {
              files: $data.uploadedFiles,
              onRemove: $options.removeUploadedFile,
              badgeValue: $options.completedLabel,
              badgeSeverity: "success",
              previewWidth: $props.previewWidth,
              templates: _ctx.$slots,
              pt: _ctx.pt
            }, null, 8, ["files", "onRemove", "badgeValue", "previewWidth", "templates", "pt"])
          ]),
          (_ctx.$slots.empty && !$options.hasFiles && !$options.hasUploadedFiles)
            ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                key: 0,
                class: "p-fileupload-empty"
              }, _ctx.ptm('empty')), [
                vue.renderSlot(_ctx.$slots, "empty")
              ], 16))
            : vue.createCommentVNode("", true)
        ], 16)
      ], 16))
    : ($options.isBasic)
      ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 1,
          class: "p-fileupload p-fileupload-basic p-component"
        }, _ctx.ptm('root')), [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.messages, (msg) => {
            return (vue.openBlock(), vue.createBlock(_component_FileUploadMessage, {
              key: msg,
              severity: "error",
              onClose: $options.onMessageClose,
              pt: _ctx.ptm('messages')
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(msg), 1)
              ]),
              _: 2
            }, 1032, ["onClose", "pt"]))
          }), 128)),
          vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
            class: $options.basicChooseButtonClass,
            style: $props.style,
            onMouseup: _cache[12] || (_cache[12] = (...args) => ($options.onBasicUploaderClick && $options.onBasicUploaderClick(...args))),
            onKeydown: _cache[13] || (_cache[13] = vue.withKeys((...args) => ($options.choose && $options.choose(...args)), ["enter"])),
            onFocus: _cache[14] || (_cache[14] = (...args) => ($options.onFocus && $options.onFocus(...args))),
            onBlur: _cache[15] || (_cache[15] = (...args) => ($options.onBlur && $options.onBlur(...args))),
            tabindex: "0"
          }, _ctx.ptm('basicButton')), [
            (!$options.hasFiles || $props.auto)
              ? vue.renderSlot(_ctx.$slots, "uploadicon", { key: 0 }, () => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.uploadIcon ? 'span' : 'UploadIcon'), vue.mergeProps({
                    class: ['p-button-icon p-button-icon-left', $props.uploadIcon],
                    "aria-hidden": "true"
                  }, _ctx.ptm('uploadIcon')), null, 16, ["class"]))
                ])
              : vue.renderSlot(_ctx.$slots, "chooseicon", { key: 1 }, () => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.chooseIcon ? 'span' : 'PlusIcon'), vue.mergeProps({
                    class: ['p-button-icon p-button-icon-left', $props.chooseIcon],
                    "aria-hidden": "true"
                  }, _ctx.ptm('chooseIcon')), null, 16, ["class"]))
                ]),
            vue.createElementVNode("span", vue.mergeProps({ class: "p-button-label" }, _ctx.ptm('label')), vue.toDisplayString($options.basicChooseButtonLabel), 17),
            (!$options.hasFiles)
              ? (vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
                  key: 2,
                  ref: "fileInput",
                  type: "file",
                  accept: $props.accept,
                  disabled: $props.disabled,
                  multiple: $props.multiple,
                  onChange: _cache[9] || (_cache[9] = (...args) => ($options.onFileSelect && $options.onFileSelect(...args))),
                  onFocus: _cache[10] || (_cache[10] = (...args) => ($options.onFocus && $options.onFocus(...args))),
                  onBlur: _cache[11] || (_cache[11] = (...args) => ($options.onBlur && $options.onBlur(...args)))
                }, _ctx.ptm('input')), null, 16, _hoisted_2))
              : vue.createCommentVNode("", true)
          ], 16)), [
            [_directive_ripple]
          ])
        ], 16))
      : vue.createCommentVNode("", true)
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-fileupload-content {\n    position: relative;\n}\n.p-fileupload-content .p-progressbar {\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-button.p-fileupload-choose {\n    position: relative;\n    overflow: hidden;\n}\n.p-fileupload-buttonbar {\n    display: flex;\n    flex-wrap: wrap;\n}\n.p-fileupload > input[type='file'],\n.p-fileupload-basic input[type='file'] {\n    display: none;\n}\n.p-fluid .p-fileupload .p-button {\n    width: auto;\n}\n.p-fileupload-file {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n}\n.p-fileupload-file-thumbnail {\n    flex-shrink: 0;\n}\n.p-fileupload-file-actions {\n    margin-left: auto;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
