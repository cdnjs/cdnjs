/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 4.1.4
 *
 * File input styled for Bootstrap 3.0 that utilizes HTML5 File Input's advanced 
 * features including the FileReader API. 
 * 
 * The plugin drastically enhances the HTML file input to preview multiple files on the client before
 * upload. In addition it provides the ability to preview content of images, text, videos, audio, html, 
 * flash and other objects. It also offers the ability to upload and delete files using AJAX, and add 
 * files in batches (i.e. preview, append, or remove before upload).
 * 
 * Author: Kartik Visweswaran
 * Copyright: 2014, Kartik Visweswaran, Krajee.com
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    var isIE = function(ver) {
            var div = document.createElement("div"), status;
            div.innerHTML = "<!--[if IE " + ver + "]><i></i><![endif]-->";
            status = (div.getElementsByTagName("i").length == 1);
            document.body.appendChild(div);
            div.parentNode.removeChild(div);
            return status;
        },
        hasFileAPISupport = function () {
            return window.File && window.FileReader;
        },
        hasDragDropSupport = function() {
            var $div = document.createElement('div');
            return !isIE(9) && (('draggable' in $div) || ('ondragstart' in $div && 'ondrop' in $div));
        },
        hasFileUploadSupport = function () {
            return hasFileAPISupport && window.FormData;
        },
        addCss = function($el, css) {
            $el.removeClass(css).addClass(css);
        },
        STYLE_SETTING = 'style="width:{width};height:{height};"',
        OBJECT_PARAMS = '      <param name="controller" value="true" />\n' +
            '      <param name="allowFullScreen" value="true" />\n' +
            '      <param name="allowScriptAccess" value="always" />\n' +
            '      <param name="autoPlay" value="false" />\n' +
            '      <param name="autoStart" value="false" />\n'+
            '      <param name="quality" value="high" />\n',
        DEFAULT_PREVIEW = '<div class="file-preview-other">\n' +
            '       <i class="glyphicon glyphicon-file"></i>\n' +
            '   </div>';
            
    var defaultFileActionSettings = {
        removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>',
        removeClass: 'btn btn-xs btn-default',
        removeTitle: 'Remove file',
        uploadIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
        uploadClass: 'btn btn-xs btn-default',
        uploadTitle: 'Upload file',
        indicatorNew: '<i class="glyphicon glyphicon-hand-down text-warning"></i>',
        indicatorSuccess: '<i class="glyphicon glyphicon-ok-sign file-icon-large text-success"></i>',
        indicatorError: '<i class="glyphicon glyphicon-exclamation-sign text-danger"></i>',
        indicatorLoading: '<i class="glyphicon glyphicon-hand-up text-muted"></i>',
        indicatorNewTitle: 'Not uploaded yet',
        indicatorSuccessTitle: 'Uploaded',
        indicatorErrorTitle: 'Upload Error',
        indicatorLoadingTitle: 'Uploading ...'
    };
    var defaultLayoutTemplates = {
        main1: '{preview}\n' +
            '<div class="kv-upload-progress hide"></div>\n' +
            '<div class="input-group {class}">\n' +
            '   {caption}\n' +
            '   <div class="input-group-btn">\n' +
            '       {remove}\n' +
            '       {cancel}\n' +
            '       {upload}\n' +
            '       {browse}\n' +
            '   </div>\n' +
            '</div>',
        main2: '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n',
        preview: '<div class="file-preview {class}">\n' +
            '    <div class="close fileinput-remove">&times;</div>\n' +
            '    <div class="{dropClass}">\n' +
            '    <div class="file-preview-thumbnails">\n' +
            '    </div>\n' +
            '    <div class="clearfix"></div>' +
            '    <div class="file-preview-status text-center text-success"></div>\n' +
            '    <div class="kv-fileinput-error"></div>\n' +
            '    </div>\n' +
            '</div>',
        icon: '<span class="glyphicon glyphicon-file kv-caption-icon"></span>',
        caption: '<div tabindex="-1" class="form-control file-caption {class}">\n' +
            '   <div class="file-caption-name"></div>\n' +
            '</div>',
        modal: '<div id="{id}" class="modal fade">\n' +
            '  <div class="modal-dialog modal-lg">\n' +
            '    <div class="modal-content">\n' +
            '      <div class="modal-header">\n' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n' +
            '        <h3 class="modal-title">Detailed Preview <small>{title}</small></h3>\n' +
            '      </div>\n' +
            '      <div class="modal-body">\n' +
            '        <textarea class="form-control" style="font-family:Monaco,Consolas,monospace; height: {height}px;" readonly>{body}</textarea>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>',
        progress: '<div class="progress">\n' +
            '    <div class="progress-bar progress-bar-success progress-bar-striped text-center" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
            '        {percent}%\n' +
            '     </div>\n' +
            '</div>',
        footer: '<div class="file-thumbnail-footer">\n' +
            '    <div class="file-caption-name" style="width:{width}">{caption}</div>\n' +
            '    {actions}\n' +
            '</div>',
        actions: '<div class="file-actions">\n' +
            '    <div class="file-footer-buttons">\n' +
            '        {upload}{delete}{other}' +
            '    </div>\n' +
            '    <div class="file-upload-indicator" tabindex="-1" title="{indicatorTitle}">{indicator}</div>\n' +
            '    <div class="clearfix"></div>\n' +
            '</div>',
        actionDelete: '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n',
        actionUpload: '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">{uploadIcon}</button>\n'
    };
    var defaultPreviewTypes = ['image', 'html', 'text', 'video', 'audio', 'flash', 'object'];
    var defaultPreviewTemplates = {
        generic: '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
            '   {content}\n' +
            '   {footer}\n' +
            '</div>\n',
        html: '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
            '    <object data="{data}" type="{type}" width="{width}" height="{height}">\n' +
            '       ' + DEFAULT_PREVIEW + '\n' +
            '    </object>\n' + 
            '   {footer}\n' +
            '</div>',
        image: '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
            '   <img src="{data}" class="file-preview-image" title="{caption}" alt="{caption}" ' + STYLE_SETTING + '>\n' +
            '   {footer}\n' +
            '</div>\n',
        text: '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
            '   <div class="file-preview-text" title="{caption}" ' + STYLE_SETTING + '>\n' +
            '       {data}\n' + 
            '   </div>\n' + 
            '   {footer}\n' +
            '</div>\n',
        video: '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + STYLE_SETTING + '>\n' +
            '   <video width="{width}" height="{height}" controls>\n' +
            '       <source src="{data}" type="{type}">\n' +
            '       ' + DEFAULT_PREVIEW + '\n' +
            '   </video>\n' + 
            '   {footer}\n' +
            '</div>\n',
        audio: '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + STYLE_SETTING + '>\n' +
            '   <audio controls>\n' +
            '       <source src="{data}" type="{type}">\n' +
            '       ' + DEFAULT_PREVIEW + '\n' +
            '   </audio>\n' + 
            '   {footer}\n' +
            '</div>\n',
        flash: '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + STYLE_SETTING + '>\n' +
            '   <object type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' +
            OBJECT_PARAMS + '       ' + DEFAULT_PREVIEW + '\n' +
            '   </object>\n' + 
            '   {footer}\n' +
            '</div>\n',
        object: '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + STYLE_SETTING + '>\n' +
            '    <object data="{data}" type="{type}" width="{width}" height="{height}">\n' +
            '      <param name="movie" value="{caption}" />\n' +
            OBJECT_PARAMS + '           ' + DEFAULT_PREVIEW + '\n' +
            '   </object>\n' + 
            '   {footer}\n' +
            '</div>',
        other: '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + STYLE_SETTING + '>\n' +
            '   ' + DEFAULT_PREVIEW + '\n' +
            '   {footer}\n' +
            '</div>',
    };
    var defaultPreviewSettings = {
        image: {width: "auto", height: "160px"},
        html: {width: "213px", height: "160px"},
        text: {width: "160px", height: "160px"},
        video: {width: "213px", height: "160px"},
        audio: {width: "213px", height: "80px"},
        flash: {width: "213px", height: "160px"},
        object: {width: "160px", height: "160px"},
        other: {width: "160px", height: "160px"}
    };
    var defaultFileTypeSettings = {
        image: function(vType, vName) {
            return (typeof vType !== "undefined") ? vType.match('image.*') : vName.match(/\.(gif|png|jpe?g)$/i);
        },
        html: function(vType, vName) {
            return (typeof vType !== "undefined") ? vType == 'text/html' : vName.match(/\.(htm|html)$/i);
        },
        text: function(vType, vName) {
            return typeof vType !== "undefined" && vType.match('text.*') || vName.match(/\.(txt|md|csv|nfo|php|ini)$/i);
        },
        video: function (vType, vName) {
            return typeof vType !== "undefined" && vType.match(/\.video\/(ogg|mp4|webm)$/i) || vName.match(/\.(og?|mp4|webm)$/i);
        },
        audio: function (vType, vName) {
            return typeof vType !== "undefined" && vType.match(/\.audio\/(ogg|mp3|wav)$/i) || vName.match(/\.(ogg|mp3|wav)$/i);
        },
        flash: function (vType, vName) {
            return typeof vType !== "undefined" && vType == 'application/x-shockwave-flash' || vName.match(/\.(swf)$/i);
        },
        object: function (vType, vName) {
            return true;
        },
        other: function (vType, vName) {
            return true;
        },
    };
    var isEmpty = function (value, trim) {
            return value === null || value === undefined || value == []
            || value === '' || trim && $.trim(value) === '';
        },
        isArray = function (a) {
            return Array.isArray(a) || Object.prototype.toString.call(a) === '[object Array]';
        },
        isSet = function (needle, haystack) {
            return (typeof haystack == 'object' && needle in haystack);
        },
        getValue = function (options, param, value) {
            return (isEmpty(options) || isEmpty(options[param])) ? value : options[param];
        },
        getElement = function (options, param, value) {
            return (isEmpty(options) || isEmpty(options[param])) ? value : $(options[param]);
        },
        uniqId = function () {
            return Math.round(new Date().getTime() + (Math.random() * 100));
        },
        htmlEncode = function(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        },
        vUrl = window.URL || window.webkitURL;

    var FileInput = function (element, options) {
        this.$element = $(element);
        if (hasFileAPISupport() || isIE(9)) {
            this.init(options);
            this.listen();
        } else {
            this.$element.removeClass('file-loading');
        }
    };

    FileInput.prototype = {
        constructor: FileInput,
        init: function (options) {
            var self = this, $el = self.$element;
            for (key in options) {
                self[key] = options[key];
            }
            if (isEmpty(self.allowedPreviewTypes)) {
                self.allowedPreviewTypes = defaultPreviewTypes;
            }
            self.uploadFileAttr = !isEmpty($el.attr('name')) ? $el.attr('name') : 'file_data';
            self.reader = null;
            self.isIE9 = isIE(9);
            self.isIE10 = isIE(10);
            self.filestack = [];
            self.ajaxRequests = [];
            self.isError = false;
            self.dropZoneEnabled = hasDragDropSupport() && self.dropZoneEnabled;
            self.isDisabled = self.$element.attr('disabled') || self.$element.attr('readonly');
            self.isUploadable = hasFileUploadSupport && !isEmpty(self.uploadUrl);
            self.slug = typeof options.slugCallback == "function" ? options.slugCallback : self.slugDefault;
            self.mainTemplate = self.showCaption ? self.getLayoutTemplate('main1') : self.getLayoutTemplate('main2');
            self.captionTemplate = self.getLayoutTemplate('caption');
            self.previewGenericTemplate = self.getPreviewTemplate('generic');
            if (isEmpty(self.$element.attr('id'))) {
                self.$element.attr('id', uniqId());
            }
            if (typeof self.$container == 'undefined') {
                self.$container = self.createContainer();
            } else {
                self.refreshContainer();
            }
            self.$progress = self.$container.find('.kv-upload-progress');
            self.$btnUpload = self.$container.find('.kv-fileinput-upload')
            self.$captionContainer = getElement(options, 'elCaptionContainer', self.$container.find('.file-caption'));
            self.$caption = getElement(options, 'elCaptionText', self.$container.find('.file-caption-name'));
            self.$previewContainer = getElement(options, 'elPreviewContainer', self.$container.find('.file-preview'));
            self.$preview = getElement(options, 'elPreviewImage', self.$container.find('.file-preview-thumbnails'));
            self.$previewStatus = getElement(options, 'elPreviewStatus', self.$container.find('.file-preview-status'));
            self.$errorContainer = getElement(options, 'elErrorContainer', self.$previewContainer.find('.kv-fileinput-error'));
            if (!isEmpty(self.msgErrorClass)) { 
                addCss(self.$errorContainer, self.msgErrorClass);
            }
            self.$errorContainer.hide();
            self.initialPreviewContent = '';
            var content = self.initialPreview;
            self.initialPreviewCount = isArray(content) ? content.length : (content.length > 0 ? content.split(self.initialPreviewDelimiter).length : 0);
            self.fileActionSettings = $.extend(defaultFileActionSettings, options.fileActionSettings);
            self.previewInitId = "preview-" + uniqId();
            self.initPreview();
            self.initPreviewDeletes();
            self.original = {
                preview: self.$preview.html(),
                caption: self.$caption.html()
            };
            self.autoSizeCaption();
            self.options = options;
            self.setFileDropZoneTitle();
            self.uploadCount = 0;
            self.uploadPercent = 0;
            self.$element.removeClass('file-loading');
        },
        raise: function(event) {
            var self = this;
            if (arguments.length > 1) {
                self.$element.trigger(event, arguments[1]);
            } else {
                self.$element.trigger(event);
            }
        },
        getLayoutTemplate: function(t) {
            var self = this;
            return isSet(t, self.layoutTemplates) ? self.layoutTemplates[t] : defaultLayoutTemplates[t];
        },
        getPreviewTemplate: function(t) {
            var self = this;
            return isSet(t, self.previewTemplates) ? self.previewTemplates[t] : defaultPreviewTemplates[t];
        },
        getOutData: function (formdata) {
            var self = this, responsedata = arguments.length > 1 ? arguments[1] : {},
                filesdata = arguments.length > 2 ? arguments[2] : self.filestack;
            return {
                form: formdata,
                files: filesdata,
                extra: self.getExtraData(),
                response: responsedata,
                reader: self.reader
            };
        },
        listen: function () {
            var self = this, $el = self.$element, $cap = self.$captionContainer, $btnFile = self.$btnFile;
            $el.on('change', $.proxy(self.change, self));
            $(window).off('resize').on('resize', function() {
                setTimeout(function() {
                    self.autoSizeCaption();
                }, 50);  
            });
            $btnFile.off('click').on('click', function (ev) {
                self.raise('filebrowse');
                if (self.isError && !self.isUploadable) {
                    self.clear(false);
                }
                $cap.focus();
            });
            $el.closest('form').off('reset').on('reset', $.proxy(self.reset, self));
            self.$container.off('click')
                .on('click', '.fileinput-remove:not([disabled])', $.proxy(self.clear, self))
                .on('click', '.fileinput-cancel', $.proxy(self.cancel, self));
            if (self.isUploadable && self.dropZoneEnabled && self.showPreview) {
                self.initDragDrop();
            }
            if (!self.isUploadable) {
                return;
            }
            self.$container.find('.kv-fileinput-upload').off('click').on('click', function(e) {
                if (!self.isUploadable) {
                    return;
                }
                e.preventDefault();
                var totLen = self.getFileStack().length;
                if (self.isDisabled || $(this).hasClass('disabled') || !isEmpty($(this).attr('disabled')) || totLen == 0) {
                    return;
                }
                self.resetUpload();
                self.$progress.removeClass('hide');
                self.uploadCount = 0;
                self.uploadPercent = 0;
                var i, len = self.filestack.length, template = self.getLayoutTemplate('progress');
                self.lock();
                self.setProgress(0);
                if ((self.uploadAsync || totLen == 1) && self.showPreview) {
                    var outData = self.getOutData(null);
                    self.raise('filebatchpreupload', [outData]);
                    for (i = 0; i < len; i++) {
                        if (self.filestack[i] !== undefined) {
                            self.upload(i, self.getFileStack(), true);
                        }
                    }
                    setTimeout(function() {
                        $(document).ajaxStop(function() {
                            self.setProgress(100);
                            self.$preview.find('file-preview-frame').removeClass('file-loading');
                            self.unlock();
                            self.clearFileInput();
                            self.raise('filebatchuploadcomplete', [self.filestack, self.getExtraData()]);
                        });
                    }, 100);
                    return;
                }
                self.uploadBatch();
            });
        },
        setProgress: function(percent) {
            var self = this, template = self.getLayoutTemplate('progress'), pct = Math.min(percent, 100);
            self.$progress.html(template.replace(/\{percent\}/g, pct));
        },
        lock: function() {
            var self = this;
            self.resetErrors();
            self.disable();
            if (self.showRemove) {
                addCss(self.$container.find('.fileinput-remove'), 'hide'); 
            }
            if (self.showCancel) {
                self.$container.find('.fileinput-cancel').removeClass('hide');
            }
            self.raise('filelock', [self.filestack, self.getExtraData()]);
        },
        unlock: function() {
            var self = this;
            self.enable();
            if (self.showCancel) {
                addCss(self.$container.find('.fileinput-cancel'), 'hide');
            }
            if (self.showRemove) {
                self.$container.find('.fileinput-remove').removeClass('hide');
            }
            self.raise('fileunlock', [self.filestack, self.getExtraData()]);
        },
        refresh: function (options) {
            var self = this, $el = self.$element,
                params = (arguments.length) ? $.extend(self.options, options) : self.options;
            $el.off();
            self.init(params);
            var $zone = self.$container.find('.file-drop-zone');
            $zone.off('dragenter dragover drop');
            $(document).off('dragenter dragover drop');
            self.listen();
            self.setFileDropZoneTitle();
        },
        initDragDrop: function() {
            var self = this, $zone = self.$container.find('.file-drop-zone');
            $zone.off('dragenter dragover drop');
            $(document).off('dragenter dragover drop');
            $zone.on('dragenter dragover', function (e) {
                e.stopPropagation();
                e.preventDefault();
                if (self.isDisabled) {
                    return;
                }
                addCss($(this), 'highlighted');
            });
            $zone.on('dragleave', function (e) {
                e.stopPropagation();
                e.preventDefault();
                if (self.isDisabled) {
                    return;
                }
                $(this).removeClass('highlighted');
            });
            $zone.on('drop', function (e) {
                e.preventDefault();
                if (self.isDisabled) {
                    return;
                }
                self.change(e, 'dragdrop');
                $(this).removeClass('highlighted');
            });
            $(document).on('dragenter dragover drop', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
        },
        setFileDropZoneTitle: function() {
            var self = this, $zone = self.$container.find('.file-drop-zone');
            $zone.find('.' + self.dropZoneTitleClass).remove();
            if (!self.isUploadable || !self.showPreview ||
                $zone.length == 0 || self.getFileStack().length > 0 || 
                !self.dropZoneEnabled) {
                return;
            }
            if ($zone.find('.file-preview-frame').length == 0) {
                $zone.prepend('<div class="' + self.dropZoneTitleClass + '">' + self.dropZoneTitle + '</div>');
            }
            self.$container.removeClass('file-input-new');
        },
        initFileActions: function() {
            var self = this;
            self.$preview.find('.kv-file-remove').each(function() {
                var $el = $(this), $frame = $el.closest('.file-preview-frame'), 
                    ind = $frame.attr('data-fileindex');
                $el.off('click').on('click', function() {
                    $frame.fadeOut('slow', function() {
                        self.filestack[ind] = undefined;
                        self.clearObjects($frame);
                        $frame.remove();
                        var filestack = self.getFileStack(), len = filestack.length,
                            chk = self.$container.find('.file-preview-initial').length;
                        if (len == 0 && chk == 0) {
                            self.original.preview = '';
                            self.reset();
                        } else {
                            var n = self.initialPreviewCount + len,
                                cap = n > 1 ? self.msgSelected.replace(/\{n\}/g, n) : filestack[0].name;
                            self.setCaption(cap);
                        }
                    });
                });
            });
            self.$preview.find('.kv-file-upload').each(function() {
                var $el = $(this);
                $el.off('click').on('click', function() {
                    var $frame = $el.closest('.file-preview-frame'),
                        ind = $frame.attr('data-fileindex');
                    self.upload(ind, self.getFileStack());
                });
            });
        },
        renderInitFileFooter: function(i) {
            var self = this, hasConfig = self.initialPreviewConfig.length > 0,
                template = self.getLayoutTemplate('footer');
            if (hasConfig && !isEmpty(self.initialPreviewConfig[i])) {
                var config = self.initialPreviewConfig[i],
                    caption = ('caption' in config) ? config.caption : '',
                    width = ('width' in config) ? config.width : 'auto',
                    url = ('url' in config) ? config.url : false,
                    key = ('key' in config) ? config.key : null,
                    disabled = url === false ? true : false,
                    actions = self.initialPreviewShowDelete ? self.renderFileActions(false, true, disabled, url, key) : '',
                    footer = template.replace(/\{actions\}/g, actions);
                return footer.replace(/\{caption\}/g, caption).replace(/\{width\}/g, width)
                    .replace(/\{indicator\}/g, '').replace(/\{indicatorTitle\}/g, '');
            }
            return '';
        },
        renderFileFooter: function(caption, width) {
            var self = this, config = self.fileActionSettings,
                template = self.getLayoutTemplate('footer');
            if (self.isUploadable) {
                var footer = template.replace(/\{actions\}/g, self.renderFileActions(true, true, false, false, false));
                return footer.replace(/\{caption\}/g, caption).replace(/\{width\}/g, width)
                    .replace(/\{indicator\}/g, config.indicatorNew).replace(/\{indicatorTitle\}/g, config.indicatorNewTitle);
            } else {
                return template.replace(/\{actions\}/g, '').replace(/\{caption\}/g, caption).replace(/\{width\}/g, width)
                    .replace(/\{indicator\}/g, '').replace(/\{indicatorTitle\}/g, '');
            }
            return '';
        },
        renderFileActions: function(showUpload, showDelete, disabled, url, key) {
            if (!showUpload && !showDelete) {
                return '';
            }
            var self = this, 
                vUrl = url == false ? '' : ' data-url="' + url + '"',
                vKey = key == false ? '' : ' data-key="' + key + '"',
                btnDelete = self.getLayoutTemplate('actionDelete'), 
                btnUpload = '', 
                template = self.getLayoutTemplate('actions'), 
                otherActionButtons = self.otherActionButtons.replace(/\{dataKey\}/g, vKey),
                config = self.fileActionSettings,
                removeClass = disabled ? config.removeClass + ' disabled' : config.removeClass;
            btnDelete = btnDelete
                .replace(/\{removeClass\}/g, removeClass)
                .replace(/\{removeIcon\}/g, config.removeIcon)
                .replace(/\{removeTitle\}/g, config.removeTitle)
                .replace(/\{dataUrl\}/g, vUrl)
                .replace(/\{dataKey\}/g, vKey);
            if (showUpload) {
                btnUpload = self.getLayoutTemplate('actionUpload')
                    .replace(/\{uploadClass\}/g, config.uploadClass)
                    .replace(/\{uploadIcon\}/g, config.uploadIcon)
                    .replace(/\{uploadTitle\}/g, config.uploadTitle);
            }
            return template
                .replace(/\{delete\}/g, btnDelete)
                .replace(/\{upload\}/g, btnUpload)
                .replace(/\{other\}/g, otherActionButtons);
        },
        getInitialPreview: function(template, content, i) {
            var self = this, ind = 'init_' + i,
                previewId = self.previewInitId + '-' + ind;
                footer = self.renderInitFileFooter(i, false);
            return template
                .replace(/\{previewId\}/g, previewId)
                .replace(/\{frameClass\}/g, ' file-preview-initial')
                .replace(/\{fileindex\}/g, ind)
                .replace(/\{content\}/g, content)
                .replace(/\{footer\}/g, footer);
        },
        initPreview: function () {
            var self = this, html = '', content = self.initialPreview, len = self.initialPreviewCount,
                cap = self.initialCaption.length, previewId = self.previewInitId + '-init_' + i;
                caption = (cap > 0) ? self.initialCaption : self.msgSelected.replace(/\{n\}/g, len);
            if (isArray(content) && len > 0) {
                for (var i = 0; i < len; i++) {
                    html += self.getInitialPreview(self.previewGenericTemplate, content[i], i);
                }
                if (len > 1 && cap == 0) {
                    caption = self.msgSelected.replace(/\{n\}/g, len);
                }
            } else {
                if (len > 0) {
                    var fileList = content.split(self.initialPreviewDelimiter);
                    for (var i = 0; i < len; i++) {
                        html += self.getInitialPreview(self.previewGenericTemplate, content[i], i);
                    }
                    if (len > 1 && cap == 0) {
                        caption = self.msgSelected.replace(/\{n\}/g, len);
                    }
                } else {
                    if (cap > 0) {
                        self.setCaption(caption);
                        return;
                    } else {
                        return;
                    }
                }
            }
            self.initialPreviewContent = html;
            self.$preview.html(html);
            self.setCaption(caption);
            self.$container.removeClass('file-input-new');
        },
        initPreviewDeletes: function() {
            var self = this,
                resetProgress = function() {
                    if (self.$preview.find('.kv-file-remove').length == 0) {
                        self.reset();
                    }
                };
            self.$preview.find('.kv-file-remove').each(function() {
                var $el = $(this), $frame = $el.closest('.file-preview-frame'), 
                    vUrl = $el.attr('data-url'), vKey = $el.attr('data-key'),
                    $content = $(self.initialPreviewContent);
                if (vUrl === undefined || vKey === undefined) {
                    return;
                }
                $el.off('click').on('click', function() {
                    $.ajax({
                        url: vUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: {key: vKey},
                        beforeSend: function() {
                            addCss($frame, 'file-uploading');
                            addCss($el, 'disabled');
                            self.raise('filepredelete', [vKey]);
                        },
                        success: function(data, textStatus, jqXHR) {
                            if(typeof data.error === 'undefined') {
                                self.raise('filedeleted', [vKey]);
                            } else {
                                self.showError(data.error, null, $el.attr('id'), key, 'filedeleteerror');
                                resetProgress();
                            }
                            $frame.removeClass('file-uploading').addClass('file-deleted');
                            $frame.fadeOut('slow', function() {
                                self.clearObjects($frame);
                                $frame.remove();
                                var $content = $(document.createElement('div')).html(self.original.preview);
                                $content.find('.file-preview-frame').each(function() {
                                    var $el = $(this);
                                    if ($el.find('.kv-file-remove').attr('data-key') == vKey) {
                                        $el.remove();
                                    }
                                });
                                self.initialPreviewContent = $content.html();
                                if (self.initialPreviewCount > 0) {
                                    self.initialPreviewCount--;
                                }
                                var caption = (self.initialCaption.length > 0) ? 
                                    self.initialCaption : 
                                    self.msgSelected.replace(/\{n\}/g, self.initialPreviewCount);
                                self.original.preview = $content.html();
                                self.setCaption(caption);
                                self.original.caption = self.$caption.html();
                                $content.remove();
                                resetProgress();
                            });
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            self.showError(errorThrown, null, $el.attr('id'), key, 'filedeleteerror');
                            $frame.removeClass('file-uploading');
                            resetProgress();
                        }
                    });
                });
            });        
        },
        clearObjects: function($el) {
            $el.find('video audio').each(function() {
                 this.pause();
                 delete(this);
                 $(this).remove();
            });
            $el.find('img object div').each(function() {
                delete(this);
                $(this).remove();
            });
        },
        clearFileInput: function() {
            var self = this, $el = self.$element;
            if (isEmpty($el.val())) {
                return;
            }
            // Fix for IE ver < 11, that does not clear file inputs
            // Requires a sequence of steps to prevent IE crashing but
            // still allow clearing of the file input.
            if (self.isIE9 || self.isIE10) {
                var $srcFrm = $el.closest('form'), 
                    $tmpFrm = $(document.createElement('form')),
                    $tmpEl = $(document.createElement('div'));
                $el.before($tmpEl);
                if ($srcFrm.length) {
                    $srcFrm.after($tmpFrm);
                } else {
                    $tmpEl.after($tmpFrm);
                }
                $tmpFrm.append($el).trigger('reset');
                $tmpEl.before($el).remove();
                $tmpFrm.remove();
            } else { // normal input clear behavior for other sane browsers
                $el.val('');
            }
        },
        resetUpload: function() {
            var self = this;
            self.uploadCount = 0;
            self.uploadPercent = 0;
            self.$btnUpload.removeAttr('disabled');
            self.setProgress(0);
            addCss(self.$progress, 'hide');
            self.resetErrors(false);
            self.ajaxRequests = [];
        },
        cancel: function() {
            var self = this, xhr = self.ajaxRequests, len = xhr.length;
            if (len > 0) {
                for (i = 0; i < len; i++) {
                    xhr[i].abort();
                }
                self.$preview.find('file-preview-frame').each(function() {
                    $thumb = $(this), ind = $thumb.attr('data-fileindex');
                    $thumb.removeClass('file-uploading');
                    if (self.filestack[ind] !== undefined) {
                        $thumb.find('.kv-file-upload').removeClass('disabled');
                        $thumb.find('.kv-file-upload').removeClass('disabled');
                    }
                });
                self.unlock();
            }
        },
        clear: function () {
            var self = this, e = arguments.length && arguments[0];
            if (!self.isIE9 && self.reader instanceof FileReader) {
                self.reader.abort();
            }
            self.$btnUpload.removeAttr('disabled');
            self.resetUpload();
            self.filestack = [];
            self.autoSizeCaption();
            self.clearFileInput();
            self.resetErrors(true);
            
            if (e !== false) {
                self.raise('change');
                self.raise('fileclear');
            }
            if (self.overwriteInitial) {
                self.initialPreviewCount = 0;
                self.initialPreviewContent = '';
            }
            if (!self.overwriteInitial && self.initialPreviewContent.length > 0) {
                self.showFileIcon();
                self.$preview.html(self.original.preview);
                self.$caption.html(self.original.caption);
                self.initPreviewDeletes();
                self.$container.removeClass('file-input-new');
            } else {
                self.$preview.find('.file-preview-frame').each(function() {
                    self.clearObjects($(this));
                });
                self.$preview.html('');
                var cap = (!self.overwriteInitial && self.initialCaption.length > 0) ?
                    self.original.caption : '';
                self.$caption.html(cap);
                self.$caption.attr('title', '');
                addCss(self.$container, 'file-input-new');
            }
            if (self.$container.find('.file-preview-frame').length == 0) {
                self.initialCaption = '';
                self.original.caption = '';
                self.$caption.html('');
                self.$captionContainer.find('.kv-caption-icon').hide();
            }
            self.hideFileIcon();
            self.raise('filecleared');
            self.$captionContainer.focus();
            self.setFileDropZoneTitle();
        },
        reset: function () {
            var self = this;
            self.clear(false);
            self.$preview.html(self.original.preview);
            self.$caption.html(self.original.caption);
            self.$container.find('.fileinput-filename').text('');
            self.raise('filereset');
            if (self.initialPreview.length > 0) {
                self.$container.removeClass('file-input-new');
            }
            self.setFileDropZoneTitle();
            if (self.isUploadable) {
                self.resetUpload();
            }
            self.filestack = [];
        },
        disable: function (e) {
            var self = this;
            self.isDisabled = true;
            self.$element.attr('disabled', 'disabled');
            self.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .kv-fileinput-upload").attr("disabled", true);
            self.initDragDrop();
        },
        enable: function (e) {
            var self = this;
            self.isDisabled = false;
            self.$element.removeAttr('disabled');
            self.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .kv-fileinput-upload").removeAttr("disabled");
            self.initDragDrop();
        },
        getExtraData: function() {
            var self = this, data = self.uploadExtraData;
            if (typeof(self.uploadExtraData) == "function") {
                data = self.uploadExtraData();
            }
            return data;
        },
        uploadExtra: function(fd) {
            var self = this, data = self.getExtraData();
            if (data.length == 0) {
                return;
            }
            $.each(data, function(key, value) {
                if (!isEmpty(key) && !isEmpty(value)) {
                    fd.append(key, value);
                }
            });
        },
        initXhr: function(xhrobj, factor) {
            var self = this;
            if (xhrobj.upload) {
                xhrobj.upload.addEventListener('progress', function(event) {
                    var pct = 0, position = event.loaded || event.position, total = event.total;
                    if (event.lengthComputable) {
                        pct = Math.ceil(position / total * factor);
                    }
                    self.uploadPercent = Math.max(pct, self.uploadPercent);
                    self.setProgress(self.uploadPercent);
                }, false);
            }
            return xhrobj;
        },
        upload: function(i, files) {
            var self = this, total = files.length, formdata = new FormData(), 
                previewId = self.previewInitId + "-" + i, $thumb = $('#' + previewId), 
                $btnUpload = $thumb.find('.kv-file-upload'), $btnDelete = $thumb.find('.kv-file-remove'),
                $indicator = $thumb.find('.file-upload-indicator'), config = self.fileActionSettings;
            if (total == 0) {
                return;
            }
            if ($btnUpload.hasClass('disabled')) {
                return;
            }
            var percent,
                allFiles = arguments.length > 2,
                setIndicator = function (icon, msg) {
                    $indicator.html(config[icon]);
                    $indicator.attr('title', config[msg]);
                },
                updateProgress = function() {
                    if (!allFiles || total == 0 || self.uploadPercent >= 100) {
                        return;
                    }
                    self.uploadCount++;
                    var pct = 80 + Math.ceil(self.uploadCount * 20/total);
                    self.uploadPercent = Math.max(pct, self.uploadPercent);
                    self.setProgress(self.uploadPercent);
                    self.initPreviewDeletes();
                },
                resetActions = function() {
                    $btnUpload.removeAttr('disabled');
                    $btnDelete.removeAttr('disabled');
                    $thumb.removeClass('file-uploading');
                };
            formdata.append(self.uploadFileAttr, files[i]);
            formdata.append('file_id', i);
            self.uploadExtra(formdata);
            self.ajaxRequests.push($.ajax({
                xhr: function() {
                    var xhrobj = $.ajaxSettings.xhr();
                    return self.initXhr(xhrobj, 80);
                },
                url: self.uploadUrl,
                type: 'POST',
                dataType: 'json',
                data: formdata,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    var outData = self.getOutData(formdata);
                    setIndicator('indicatorLoading', 'indicatorLoadingTitle');
                    addCss($thumb, 'file-uploading');
                    $btnUpload.attr('disabled', true);
                    $btnDelete.attr('disabled', true);
                    if (!allFiles) {
                        self.lock();
                    }
                    self.raise('filepreupload', [outData, previewId, i])
                },
                success: function(data, textStatus, jqXHR) {
                    var outData = self.getOutData(formdata, data);
                    setTimeout(function() {
                        if(typeof data.error === 'undefined') {
                            setIndicator('indicatorSuccess', 'indicatorSuccessTitle');
                            $btnUpload.hide();
                            $btnDelete.hide();
                            self.filestack[i] = undefined;
                            self.raise('fileuploaded', [outData, previewId, i]);
                        } else {
                            setIndicator('indicatorError', 'indicatorErrorTitle');
                            self.showUploadError(data.error, outData, previewId, i);
                        }
                    }, 100);
                },
                complete: function() {
                    setTimeout(function() {
                        updateProgress();
                        resetActions();
                    }, 100);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    setIndicator('indicatorError', 'indicatorErrorTitle');
                    var outData = self.getOutData(formdata);
                    if (allFiles) {
                        var cap = files[i].name;
                        self.showUploadError('<b>' + cap + '</b>: ' + errorThrown, outData, previewId, i);
                    } else {
                        self.showUploadError(errorThrown, outData, previewId, i);
                    }
                }
            }));
        },
        uploadBatch: function() {
            var self = this, files = self.filestack, total = files.length;
            if (total == 0) {
                return;
            }
            var config = self.fileActionSettings; formdata = new FormData(),
                setIndicator = function (i, icon, msg) {
                    var $indicator = $('#' + self.previewInitId + "-" + i).find('.file-upload-indicator');
                    $indicator.html(config[icon]);
                    $indicator.attr('title', config[msg]);
                },
                enableActions = function (i, disabled) {
                    var $thumb = $('#' + self.previewInitId + "-" + i),
                        $btnUpload = $thumb.find('.kv-file-upload'), 
                        $btnDelete = $thumb.find('.kv-file-delete');
                    $thumb.removeClass('file-uploading');
                    $btnUpload.removeAttr('disabled');
                    $btnDelete.removeAttr('disabled');
                },
                setAllUploaded = function() {
                    $.each(files, function(key, data) {
                        self.filestack[key] = undefined;
                    });
                    self.clearFileInput();
                };
            $.each(files, function(key, data) {
                if (files[key] !== undefined) {
                    formdata.append(self.uploadFileAttr, files[key]);
                }
            });
            self.uploadExtra(formdata);
            $.ajax({
                xhr: function() {
                    var xhrobj = $.ajaxSettings.xhr();
                    return self.initXhr(xhrobj, 98);
                },
                url: self.uploadUrl,
                type: 'POST',
                dataType: 'json',
                data: formdata,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    self.lock();
                    var outData = self.getOutData(formdata);
                    if (!self.showPreview) {
                        return;
                    }
                    self.$preview.find('.file-preview-frame').each(function() {
                        var $thumb = $(this), $btnUpload = $thumb.find('.kv-file-upload'), $btnDelete = $thumb.find('.kv-file-remove');
                        addCss($thumb, 'file-uploading');
                        $btnUpload.attr('disabled', true);
                        $btnDelete.attr('disabled', true);
                    });
                    self.raise('filebatchpreupload', [outData]);
                },
                success: function(data, textStatus, jqXHR) {
                    var outData = self.getOutData(formdata, data);
                    var keys = isEmpty(data.errorkeys) ? [] : data.errorkeys;
                    if(typeof data.error === 'undefined' || isEmpty(data.error)) {
                        self.raise('filebatchuploadsuccess', [outData]);
                        setAllUploaded();
                        if (self.showPreview) {
                            self.$preview.find('.kv-file-upload').hide();
                            self.$preview.find('.kv-file-remove').hide();
                            self.$preview.find('.file-preview-frame').each(function() {
                                var $thumb = $(this), key = $thumb.attr('data-fileindex');
                                setIndicator(key, 'indicatorSuccess', 'indicatorSuccessTitle');
                                enableActions(key);
                            });
                        } else {
                            self.reset();
                        }
                    } else {
                        self.$preview.find('.file-preview-frame').each(function() {
                            var $thumb = $(this), key = $thumb.attr('data-fileindex');
                            enableActions(key);
                            if (keys.length == 0) {
                                setIndicator(key, 'indicatorError', 'indicatorErrorTitle');
                                return;
                            }
                            if ($.inArray(key, keys)) {
                                setIndicator(key, 'indicatorError', 'indicatorErrorTitle');
                            } else {
                                $thumb.find('.kv-file-upload').hide();
                                $thumb.find('.kv-file-remove').hide();
                                setIndicator(key, 'indicatorSuccess', 'indicatorSuccessTitle');
                                self.filestack[key] = undefined;
                            }
                        });
                        self.showUploadError(data.error, outData, null, null, 'filebatchuploaderror');
                    }
                },
                complete: function () {
                    self.setProgress(100);
                    self.unlock();
                    self.raise('filebatchuploadcomplete', [self.filestack, self.getExtraData()]);
                    self.clearFileInput();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var outData = self.getOutData(formdata);
                    self.showUploadError(errorThrown, outData, null, null, 'filebatchuploaderror');
                    self.uploadFileCount = total - 1;
                    self.$preview.find('.file-preview-frame').removeClass('file-uploading');
                    self.$preview.find('.file-preview-frame kv-file-upload').removeAttr('disabled');
                    self.$preview.find('.file-preview-frame kv-file-delete').removeAttr('disabled');
                }
            });
        },
        hideFileIcon: function () {
            if (this.overwriteInitial) {
                this.$captionContainer.find('.kv-caption-icon').hide();
            }
        },
        showFileIcon: function () {
            this.$captionContainer.find('.kv-caption-icon').show();
        },
        resetErrors: function (fade) {
            var self = this, $error = self.$errorContainer;
            self.isError = false;
            self.$container.removeClass('has-error');
            $error.html('');
            if (fade) {
                $error.fadeOut('slow');
            } else {
                $error.hide();
            }
        },
        showUploadError: function (msg, data, previewId, index) {
            var self = this, $error = self.$errorContainer, 
                ev = arguments.length > 4 ? arguments[4] : 'fileuploaderror';
            if ($error.find('ul').length == 0) {
                $error.html('<ul class="text-left"><li>' + msg + '</li></ul>');
            } else {
                $error.find('ul').append('<li>' + msg + '</li>');
            }
            $error.fadeIn(800);
            self.raise(ev, [data, previewId, index]);
            addCss(self.$container, 'has-error');
            return true;
        },
        showError: function (msg, file, previewId, index) {
            var self = this, $error = self.$errorContainer,
                ev = arguments.length > 4 ? arguments[4] : 'fileerror';
            $error.html(msg);
            $error.fadeIn(800);
            self.raise(ev, [file, previewId, index, self.reader]);
            if (!self.isUploadable) {
                self.clearFileInput();
            }
            addCss(self.$container, 'has-error');
            self.$btnUpload.attr('disabled', true);
            return true;
        },
        errorHandler: function (evt, caption) {
            var self = this;
            switch (evt.target.error.code) {
                case evt.target.error.NOT_FOUND_ERR:
                    self.addError(self.msgFileNotFound.replace(/\{name\}/g, caption));
                    break;
                case evt.target.error.NOT_READABLE_ERR:
                    self.addError(self.msgFileNotReadable.replace(/\{name\}/g, caption));
                    break;
                case evt.target.error.ABORT_ERR:
                    self.addError(self.msgFilePreviewAborted.replace(/\{name\}/g, caption));
                    break;
                default:
                    self.addError(self.msgFilePreviewError.replace(/\{name\}/g, caption));
            }
        },
        parseFileType: function(file) {
            var isValid, vType;
            for (var i = 0; i < defaultPreviewTypes.length; i++) {
                cat = defaultPreviewTypes[i];
                isValid = isSet(cat, self.fileTypeSettings) ? self.fileTypeSettings[cat] : defaultFileTypeSettings[cat];
                vType = isValid(file.type, file.name) ? cat : '';
                if (vType != '') {
                    return vType;
                }
            }
            return 'other';
        },
        previewDefault: function(file, previewId) {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            var data = vUrl.createObjectURL(file), $obj = $('#' + previewId), 
                config = self.previewSettings.other,
                footer = self.isUploadable ? 
                    self.renderFileFooter(file.name, config.width) : 
                    self.renderFileFooter(file.name, config.width, false),
                previewOtherTemplate = self.getPreviewTemplate('other'), 
                ind = previewId.slice(previewId.lastIndexOf('-') + 1),
                frameClass = '';
            if (arguments.length > 2) {
                var $err = $(self.msgValidationError);
                frameClass = ' btn disabled';
                footer += '<div class="file-other-error text-danger"><i class="glyphicon glyphicon-exclamation-sign"></i></div>';
            }
            self.$preview.append("\n" + previewOtherTemplate
                .replace(/\{previewId\}/g, previewId)
                .replace(/\{frameClass\}/g, frameClass)
                .replace(/\{fileindex\}/g, ind)
                .replace(/\{caption\}/g, self.slug(file.name))
                .replace(/\{width\}/g, config.width)
                .replace(/\{height\}/g, config.height)
                .replace(/\{type\}/g, file.type)
                .replace(/\{data\}/g, data)
                .replace(/\{footer\}/g, footer));
            $obj.on('load', function(e) {
                vUrl.revokeObjectURL($obj.attr('data'));
            });
        },
        previewFile: function(file, theFile, previewId, data) {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            var cat = self.parseFileType(file), caption = self.slug(file.name), data, obj, content, 
                types = self.allowedPreviewTypes, mimes = self.allowedPreviewMimeTypes, fType = file.type, 
                template = isSet(cat, self.previewTemplates) ? self.previewTemplates[cat] : defaultPreviewTemplates[cat], 
                config = isSet(cat, self.previewSettings) ? self.previewSettings[cat] : defaultPreviewSettings[cat],
                wrapLen = parseInt(self.wrapTextLength), wrapInd = self.wrapIndicator, $preview = self.$preview, 
                chkTypes = types.indexOf(cat) >=0, chkMimes = isEmpty(mimes) || (!isEmpty(mimes) && isSet(file.type, mimes)),
                footer = self.renderFileFooter(caption, config.width), 
                ind = previewId.slice(previewId.lastIndexOf('-') + 1);
            if (chkTypes && chkMimes) {
                if (cat == 'text') {
                    var strText = htmlEncode(theFile.target.result);
                    vUrl.revokeObjectURL(data);
                    if (strText.length > wrapLen) {
                        var id = 'text-' + uniqId(), height = window.innerHeight * .75,
                            modal = self.getLayoutTemplate('modal')
                                .replace(/\{id\}/g, id)
                                .replace(/\{title\}/g, caption)
                                .replace(/\{height\}/g, height)
                                .replace(/\{body\}/g, strText);
                            wrapInd = wrapInd
                                .replace(/\{title\}/g, caption)
                                .replace(/\{dialog\}/g, "$('#" + id + "').modal('show')");
                            strText = strText.substring(0, (wrapLen - 1)) + wrapInd;
                    }
                    content = template
                        .replace(/\{previewId\}/g, previewId).replace(/\{caption\}/g, caption)
                        .replace(/\{frameClass\}/g, '')
                        .replace(/\{type\}/g, file.type).replace(/\{width\}/g, config.width)
                        .replace(/\{height\}/g, config.height).replace(/\{data\}/g, strText)
                        .replace(/\{footer\}/g, footer).replace(/\{fileindex\}/g, ind) + modal;
                } else {
                    content = template
                        .replace(/\{previewId\}/g, previewId).replace(/\{caption\}/g, caption)
                        .replace(/\{frameClass\}/g, '')
                        .replace(/\{type\}/g, file.type).replace(/\{data\}/g, data)
                        .replace(/\{width\}/g, config.width).replace(/\{height\}/g, config.height)
                        .replace(/\{footer\}/g, footer).replace(/\{fileindex\}/g, ind);
                }
                $preview.append("\n" + content);
                self.autoSizeImage(previewId);
            } else {
                self.previewDefault(file, previewId);
            }
        },
        slugDefault: function (text) {
            return isEmpty(text) ? '' : text.split(/(\\|\/)/g).pop().replace(/[^\w-.\\\/ ]+/g,'');
        },
        getFileStack: function() {
            var size = 0, self = this;
            return self.filestack.filter(function(n){ return n != undefined });
        },
        readFiles: function (files) {
            this.reader = new FileReader();
            var self = this, $el = self.$element, $preview = self.$preview, reader = self.reader,
                $container = self.$previewContainer, $status = self.$previewStatus, msgLoading = self.msgLoading,
                msgProgress = self.msgProgress, msgSelected = self.msgSelected, fileType = self.previewFileType,
                wrapLen = parseInt(self.wrapTextLength), wrapInd = self.wrapIndicator,
                previewInitId = self.previewInitId, numFiles = files.length, settings = self.fileTypeSettings,
                isText = isSet('text', settings) ? settings['text'] : defaultFileTypeSettings['text'],
                ctr = self.filestack.length, 
                throwError = function(msg, file, previewId, index) {
                    self.previewDefault(file, previewId, true);
                    var outData = self.getOutData(formdata, {}, files);
                    return self.isUploadable ? self.showUploadError(msg, outData, previewId, index) : self.showError(msg, file, previewId, index);
                };
            function readFile(i) {
                if (isEmpty($el.attr('multiple'))) {
                    numFiles = 1;
                }
                if (i >= numFiles) {
                    $container.removeClass('loading');
                    $status.html('');
                    return;
                }
                var node = ctr + i, previewId = previewInitId + "-" + node, file = files[i], caption = self.slug(file.name), 
                    fileSize = (file.size ? file.size : 0) / 1000, checkFile, 
                    previewData = vUrl.createObjectURL(file), fileCount = 0, j, msg, typ, chk,
                    fileTypes = self.allowedFileTypes, strTypes = isEmpty(fileTypes) ? '' : fileTypes.join(', '), 
                    fileExt = self.allowedFileExtensions, strExt = isEmpty(fileExt) ? '' : fileExt.join(', '),
                    fileExtExpr = isEmpty(fileExt) ? '' : new RegExp('\\.(' + fileExt.join('|') + ')$', 'i');
                fileSize = fileSize.toFixed(2);
                if (self.maxFileSize > 0 && fileSize > self.maxFileSize) {
                    msg = self.msgSizeTooLarge.replace(/\{name\}/g, caption).replace(/\{size\}/g,
                        fileSize).replace(/\{maxSize\}/g, self.maxFileSize);
                    self.isError = throwError(msg, file, previewId, i);
                    return;
                }
                if (!isEmpty(fileTypes) && isArray(fileTypes)) {
                    for (j = 0; j < fileTypes.length; j++) {
                        typ = fileTypes[j];
                        checkFile = settings[typ];
                        chk = (checkFile !== undefined && checkFile(file.type, caption));
                        fileCount += isEmpty(chk) ? 0 : chk.length;
                    }
                    if (fileCount == 0) {
                        msg = self.msgInvalidFileType.replace(/\{name\}/g, caption).replace(/\{types\}/g, strTypes);
                        self.isError = throwError(msg, file, previewId, i);
                        return;
                    }
                }
                if (fileCount == 0 && !isEmpty(fileExt) && isArray(fileExt) && !isEmpty(fileExtExpr)) {
                    chk = caption.match(fileExtExpr);
                    fileCount += isEmpty(chk) ? 0 : chk.length;
                    if (fileCount == 0) {
                        msg = self.msgInvalidFileExtension.replace(/\{name\}/g, caption).replace(/\{extensions\}/g, strExt);
                        self.isError = throwError(msg, file, previewId, i);
                        return;
                    }
                }
                if (!self.showPreview) {
                    self.filestack.push(file);
                    setTimeout(readFile(i + 1), 100);
                    self.raise('fileloaded', [file, previewId, i, reader]);
                    return;
                }
                if ($preview.length > 0 && typeof FileReader !== "undefined") {
                    $status.html(msgLoading.replace(/\{index\}/g, i + 1).replace(/\{files\}/g, numFiles));
                    $container.addClass('loading');
                    reader.onerror = function (evt) {
                        self.errorHandler(evt, caption);
                    };
                    reader.onload = function (theFile) {
                        self.previewFile(file, theFile, previewId, previewData);
                        self.initFileActions();
                    };
                    reader.onloadend = function (e) {
                        var msg = msgProgress
                            .replace(/\{index\}/g, i + 1).replace(/\{files\}/g, numFiles)
                            .replace(/\{percent\}/g, 50).replace(/\{name\}/g, caption);
                        setTimeout(function () {
                            $status.html(msg);
                            vUrl.revokeObjectURL(previewData);
                        }, 100);
                        setTimeout(function () {
                            readFile(i + 1);
                            self.updateFileDetails(numFiles);
                        }, 100);
                        self.raise('fileloaded', [file, previewId, i, reader]);
                    };
                    reader.onprogress = function (data) {
                        if (data.lengthComputable) {
                            var progress = parseInt(((data.loaded / data.total) * 100), 10);
                            var msg = msgProgress
                                .replace(/\{index\}/g, i + 1).replace(/\{files\}/g, numFiles)
                                .replace(/\{percent\}/g, progress).replace(/\{name\}/g, caption);
                            setTimeout(function () {
                                $status.html(msg);
                            }, 100);
                        }
                    };
                    if (isText(file.type, caption)) {
                        reader.readAsText(file, self.textEncoding);
                    } else {
                        reader.readAsArrayBuffer(file);
                    }
                } else {
                    self.previewDefault(file, previewId);
                    setTimeout(function() {
                        readFile(i + 1);
                        self.updateFileDetails(numFiles);
                    }, 100);
                    self.raise('fileloaded', [file, previewId, i, reader]);
                }
                self.filestack.push(file);
            }
            readFile(0);
            self.updateFileDetails(numFiles, false);
        },
        updateFileDetails: function(numFiles) {
            var self = this, msgSelected = self.msgSelected, $el = self.$element, fileStack = self.getFileStack(), 
                name = $el.val() || (fileStack.length && fileStack[0].name) || '', label = self.slug(name),
                n = self.isUploadable ? fileStack.length : numFiles;
                numFiles = self.initialPreviewCount + n,
                log = n > 1 ? msgSelected.replace(/\{n\}/g, numFiles) : label;
            if (self.isError) {
                self.$previewContainer.removeClass('loading');
                self.$previewStatus.html('');
                self.$captionContainer.find('.kv-caption-icon').hide();
                log = self.msgValidationError;
            } else {
                self.showFileIcon();
            }
            self.setCaption(log);
            self.$container.removeClass('file-input-new');
            if (arguments.length == 1) {
                self.raise('fileselect', [numFiles, label]);
            }
        },
        change: function (e) {
            var self = this, $el = self.$element, label = self.slug($el.val()),
                total = 0, $preview = self.$preview, isDragDrop = arguments.length > 1,
                files = isDragDrop ? e.originalEvent.dataTransfer.files : $el.get(0).files, 
                msgSelected = self.msgSelected,
                numFiles = !isEmpty(files) ? (files.length + self.initialPreviewCount) : 1, tfiles,
                ctr = self.filestack.length, isAjaxUpload = (self.isUploadable && ctr != 0),
                throwError = function(msg, file, previewId, index) {
                    var outData = self.getOutData(formdata, {}, files);
                    return self.isUploadable ? self.showUploadError(msg, outData, previewId, index) : self.showError(msg, file, previewId, index);
                };
            self.resetUpload();
            
            self.hideFileIcon();
            self.$container.find('.file-drop-zone .' + self.dropZoneTitleClass).remove();
            if (isDragDrop) {
                tfiles = files;
            } else {
                if (e.target.files === undefined) {
                    tfiles = e.target && e.target.value ? [
                        {name: e.target.value.replace(/^.+\\/, '')}
                    ] : [];
                } else {
                    tfiles = e.target.files;
                }
            }
            if (isEmpty(tfiles) || tfiles.length === 0) {
                if (!isAjaxUpload) {
                    self.clear(false);
                }
                self.raise('fileselectnone');
                return;
            }
            self.resetErrors();
            if (!isAjaxUpload) {                
                if (!self.overwriteInitial) {
                    $preview.html(self.initialPreviewContent);
                } else {
                    $preview.html('');
                }
            }
            var total = self.isUploadable ? self.getFileStack().length + tfiles.length : tfiles.length;
            if (self.maxFileCount > 0 && total > self.maxFileCount) {
                var msg = self.msgFilesTooMany.replace(/\{m\}/g, self.maxFileCount).replace(/\{n\}/g, total);
                self.isError = throwError(msg, null, null, null);
                self.$captionContainer.find('.kv-caption-icon').hide();
                self.$caption.html(self.msgValidationError);
                self.$container.removeClass('file-input-new');
                return;
            }
            if (!self.isIE9) {
                self.readFiles(files);
            } else {
                self.updateFileDetails(1);
            }
            self.reader = null;
        },
        autoSizeImage: function(previewId) {
            var self = this, $preview = self.$preview, 
                $thumb = $preview.find("#" + previewId), 
                $img = $thumb.find('img');
            if (!$img.length) {
                return;
            }
            $img.on('load', function() {
                var w1 = $thumb.width(), w2 = $preview.width();
                if (w1 > w2) {
                    $img.css('width', '100%');
                    $thumb.css('width', '97%');
                }
                var $cap = $img.closest('.file-preview-frame').find('.file-caption-name');
                if ($cap.length) {
                    $cap.width($img.width());
                    $cap.attr('title', $cap.text());
                }
                self.raise('fileimageloaded', previewId);
            });
        },
        autoSizeCaption: function() {
            var self = this;
            if (self.$caption.length == 0 || !self.autoFitCaption) {
                return;
            }
            self.$caption.css('width', 0);
            setTimeout(function() {
                var w = self.$captionContainer.width();
                self.$caption.css('width', 0.98 * w);
            }, 50);
        },
        setCaption: function(content) {
            var self = this, title = $('<div>' + content + '</div>').text(),
                icon = self.layoutTemplates['icon'], 
                out = icon + title;
            if (self.$caption.length == 0) {
                return;
            }
            self.$caption.html(out);
            self.$caption.attr('title', title);
            self.autoSizeCaption();
        },
        initBrowse: function ($container) {
            var self = this;
            self.$btnFile = $container.find('.btn-file');
            self.$btnFile.append(self.$element);
        },
        createContainer: function () {
            var self = this;
            var $container = $(document.createElement("span")).attr({"class": 'file-input file-input-new'}).html(self.renderMain());
            self.$element.before($container);
            self.initBrowse($container);
            return $container;
        },
        refreshContainer: function () {
            var self = this, $container = self.$container;
            $container.before(self.$element);
            $container.html(self.renderMain());
            self.initBrowse($container);
        },
        renderMain: function () {
            var self = this, dropCss = (self.isUploadable && self.dropZoneEnabled) ? ' file-drop-zone' : '';;
            var preview = self.showPreview ? self.getLayoutTemplate('preview')
                .replace(/\{class\}/g, self.previewClass)
                .replace(/\{dropClass\}/g, dropCss)
                 : '';
            var css = self.isDisabled ? self.captionClass + ' file-caption-disabled' : self.captionClass;
            var caption = self.captionTemplate.replace(/\{class\}/g, css + ' kv-fileinput-caption');
            return self.mainTemplate.replace(/\{class\}/g, self.mainClass).
                replace(/\{preview\}/g, preview).
                replace(/\{caption\}/g, caption).
                replace(/\{upload\}/g, self.renderUpload()).
                replace(/\{remove\}/g, self.renderRemove()).
                replace(/\{cancel\}/g, self.renderCancel()).
                replace(/\{browse\}/g, self.renderBrowse());
        },
        renderBrowse: function () {
            var self = this, css = self.browseClass + ' btn-file', status = '';
            if (self.isDisabled) {
                status = ' disabled ';
            }
            return '<div class="' + css + '"' + status + '> ' + self.browseIcon + self.browseLabel + ' </div>';
        },
        renderRemove: function () {
            var self = this, css = self.removeClass + ' fileinput-remove fileinput-remove-button', status = '';
            if (!self.showRemove) {
                return '';
            }
            if (self.isDisabled) {
                status = ' disabled ';
            }
            return '<button type="button" title="' + self.removeTitle + '" class="' + css + '"' + status + '>' + self.removeIcon + self.removeLabel + '</button>';
        },
        renderCancel: function () {
            var self = this, css = self.cancelClass + ' fileinput-cancel fileinput-cancel-button', status = '';
            if (!self.showCancel) {
                return '';
            }
            return '<button type="button" title="' + self.cancelTitle + '" class="hide ' + css + '">' + self.cancelIcon + self.cancelLabel + '</button>';
        },
        renderUpload: function () {
            var self = this, css = self.uploadClass + ' kv-fileinput-upload', content = '', status = '';
            if (!self.showUpload) {
                return '';
            }
            if (self.isDisabled) {
                status = ' disabled ';
            }
            if (!self.isUploadable || self.isDisabled) {
                content = '<button type="submit" title="' + self.uploadTitle + '"class="' + css + '"' + status + '>' + self.uploadIcon + self.uploadLabel + '</button>';
            } else {
                content = '<a href="' + self.uploadUrl + '" title="' + self.uploadTitle + '" class="' + css + '"' + status + '>' + self.uploadIcon + self.uploadLabel + '</a>';
            }
            return content;
        }
    }

    //FileInput plugin definition
    $.fn.fileinput = function (option) {
        if (!hasFileAPISupport() && !isIE(9)) {
          return;
        }
        
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('fileinput'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('fileinput',
                    (data = new FileInput(this, $.extend({}, $.fn.fileinput.defaults, options, $(this).data()))));
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.fileinput.defaults = {
        showCaption: true,
        showPreview: true,
        showRemove: true,
        showUpload: true,
        showCancel: true,
        autoFitCaption: true, 
        mainClass: '',
        previewClass: '',
        captionClass: '',
        mainTemplate: null,
        initialCaption: '',
        initialPreview: '',
        initialPreviewCount: 0,
        initialPreviewDelimiter: '*$$*',
        initialPreviewConfig: [],
        initialPreviewShowDelete: true,
        overwriteInitial: true,
        layoutTemplates: defaultLayoutTemplates,
        previewTemplates: defaultPreviewTemplates,
        allowedPreviewTypes: defaultPreviewTypes,
        allowedPreviewMimeTypes: null,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        previewSettings: defaultPreviewSettings,
        fileTypeSettings: defaultFileTypeSettings,
        browseLabel: 'Browse &hellip;',
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i> &nbsp;',
        browseClass: 'btn btn-primary',
        removeLabel: 'Remove',
        removeTitle: 'Clear selected files',
        removeIcon: '<i class="glyphicon glyphicon-trash"></i> ',
        removeClass: 'btn btn-default',
        cancelLabel: 'Cancel',
        cancelTitle: 'Abort ongoing upload',
        cancelIcon: '<i class="glyphicon glyphicon-ban-circle"></i> ',
        cancelClass: 'btn btn-default',
        uploadLabel: 'Upload',
        uploadTitle: 'Upload selected files',
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i> ',
        uploadClass: 'btn btn-default',
        uploadUrl: null,
        uploadExtraData: [],
        uploadAsync: true,
        maxFileSize: 0,
        maxFileCount: 0,
        msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>. Please retry your upload!',
        msgFilesTooMany: 'Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>. Please retry your upload!',
        msgFileNotFound: 'File "{name}" not found!',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
        msgValidationError: '<span class="text-danger"><i class="glyphicon glyphicon-exclamation-sign"></i> File Upload Error</span>',
        msgErrorClass: 'file-error-message',
        msgLoading: 'Loading  file {index} of {files} &hellip;',
        msgProgress: 'Loading file {index} of {files} - {name} - {percent}% completed.',
        msgSelected: '{n} files selected',
        previewFileType: 'image',
        wrapTextLength: 250,
        wrapIndicator: ' <span class="wrap-indicator" title="{title}" onclick="{dialog}">[&hellip;]</span>',
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        slugCallback: null,
        dropZoneEnabled: true,
        dropZoneTitle: 'Drag & drop files here &hellip;',
        dropZoneTitleClass: 'file-drop-zone-title',
        fileActionSettings: {},
        otherActionButtons: '',
        textEncoding: 'UTF-8'
    };
    
    $.fn.fileinput.Constructor = FileInput;

    /**
     * Convert automatically file inputs with class 'file'
     * into a bootstrap fileinput control.
     */
    $(document).ready(function () {
        var $input = $('input.file[type=file]'), count = $input.attr('type') != null ? $input.length : 0;
        if (count > 0) {
            $input.fileinput();
        }
    });
})(window.jQuery);