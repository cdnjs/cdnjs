/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 2.1.0
 *
 * File input styled for Bootstrap 3.0 that utilizes HTML5 File Input's advanced 
 * features including the FileReader API. This plugin is inspired by the blog article at
 * http://www.abeautifulsite.net/blog/2013/08/whipping-file-inputs-into-shape-with-bootstrap-3/
 * and Jasny's File Input plugin http://jasny.github.io/bootstrap/javascript/#fileinput
 * 
 * The plugin drastically enhances the file input to preview multiple files on the client before
 * upload. In addition it provides the ability to preview content of images and text files. 
 * 
 * Author: Kartik Visweswaran
 * Copyright: 2013, Kartik Visweswaran, Krajee.com
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    var MAIN_TEMPLATE_1 = '{preview}\n' +
            '<div class="input-group {class}">\n' +
            '   {caption}\n' +
            '   <div class="input-group-btn">\n' +
            '       {remove}\n' +
            '       {upload}\n' +
            '       {browse}\n' +
            '   </div>\n' +
            '</div>',

        MAIN_TEMPLATE_2 = '{preview}\n{remove}\n{upload}\n{browse}\n',

        PREVIEW_TEMPLATE = '<div class="file-preview {class}">\n' +
            '   <div class="close fileinput-remove text-right">&times;</div>\n' +
            '   <div class="file-preview-thumbnails"></div>\n' +
            '   <div class="clearfix"></div>' +
            '   <div class="file-preview-status text-center text-success"></div>\n' +
            '</div>',

        CAPTION_TEMPLATE = '<div tabindex="-1" class="form-control file-caption {class}">\n' +
            '   <span class="glyphicon glyphicon-file kv-caption-icon"></span><div class="file-caption-name"></div>\n' +
            '</div>',

        MODAL_TEMPLATE = '<div id="{id}" class="modal fade">\n' +
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
            '</div>\n',

        IMAGE_TEMPLATE = '<div class="file-preview-frame" id="{previewId}">\n' +
            '   {content}\n' +
            '</div>\n',

        TEXT_TEMPLATE = '<div class="file-preview-frame" id="{previewId}">\n' +
            '   <div class="file-preview-text" title="{caption}">\n' +
            '       {strText}\n' +
            '   </div>\n' +
            '</div>\n',

        OTHER_TEMPLATE = '<div class="file-preview-frame" id="{previewId}">\n' +
            '   <div class="file-preview-other">\n' +
            '       <h2><i class="glyphicon glyphicon-file"></i></h2>\n' +
            '           {caption}\n' +
            '   </div>\n' +
            '</div>',

        isEmpty = function (value, trim) {
            return value === null || value === undefined || value == []
                || value === '' || trim && $.trim(value) === '';
        },
        isArray = Array.isArray || function (a) {
            return Object.prototype.toString.call(a) === '[object Array]';
        },
        getValue = function (options, param, value) {
            return (isEmpty(options) || isEmpty(options[param])) ? value : options[param];
        },
        getElement = function (options, param, value) {
            return (isEmpty(options) || isEmpty(options[param])) ? value : $(options[param]);
        },
        isImageFile = function (type, name) {
            return (typeof type !== "undefined") ? type.match('image.*') : name.match(/\.(gif|png|jpe?g)$/i);
        },
        isTextFile = function (type, name) {
            return (typeof type !== "undefined") ? type.match('text.*') : name.match(/\.(txt|md|csv|htm|html|php|ini)$/i);
        },
        uniqId = function () {
            return Math.round(new Date().getTime() + (Math.random() * 100));
        },
        hasFileAPISupport = function () {
            return window.File && window.FileReader && window.FileList && window.Blob;
        },
        vUrl = window.URL || window.webkitURL;

    var FileInput = function (element, options) {
        this.$element = $(element);
        if (hasFileAPISupport()) {
            this.init(options);
            this.listen();
        } else {
            this.$element.removeClass('file-loading');
        }
    };

    FileInput.prototype = {
        constructor: FileInput,
        init: function (options) {
            var self = this;
            self.reader = null;
            self.showCaption = options.showCaption;
            self.showPreview = options.showPreview;
            self.maxFileSize = options.maxFileSize;
            self.maxFileCount = options.maxFileCount;
            self.msgSizeTooLarge = options.msgSizeTooLarge;
            self.msgFilesTooMany = options.msgFilesTooMany;
            self.msgFileNotFound = options.msgFileNotFound;
            self.msgFileNotReadable = options.msgFileNotReadable;
            self.msgFilePreviewAborted = options.msgFilePreviewAborted;
            self.msgFilePreviewError = options.msgFilePreviewError;
            self.msgValidationError = options.msgValidationError;
            self.msgErrorClass = options.msgErrorClass;
            self.initialDelimiter = options.initialDelimiter;
            self.initialPreview = options.initialPreview;
            self.initialCaption = options.initialCaption;
            self.initialPreviewCount = options.initialPreviewCount;
            self.initialPreviewContent = options.initialPreviewContent;
            self.overwriteInitial = options.overwriteInitial;
            self.showRemove = options.showRemove;
            self.showUpload = options.showUpload;
            self.captionClass = options.captionClass;
            self.previewClass = options.previewClass;
            self.mainClass = options.mainClass;
            if (isEmpty(options.mainTemplate)) {
                self.mainTemplate = self.showCaption ? MAIN_TEMPLATE_1 : MAIN_TEMPLATE_2;
            } else {
                self.mainTemplate = options.mainTemplate;
            }
            self.previewTemplate = (self.showPreview) ? options.previewTemplate : '';
            self.previewGenericTemplate = options.previewGenericTemplate;
            self.previewImageTemplate = options.previewImageTemplate;
            self.previewTextTemplate = options.previewTextTemplate;
            self.previewOtherTemplate = options.previewOtherTemplate;
            self.captionTemplate = options.captionTemplate;
            self.browseLabel = options.browseLabel;
            self.browseIcon = options.browseIcon;
            self.browseClass = options.browseClass;
            self.removeLabel = options.removeLabel;
            self.removeIcon = options.removeIcon;
            self.removeClass = options.removeClass;
            self.uploadLabel = options.uploadLabel;
            self.uploadIcon = options.uploadIcon;
            self.uploadClass = options.uploadClass;
            self.uploadUrl = options.uploadUrl;
            self.msgLoading = options.msgLoading;
            self.msgProgress = options.msgProgress;
            self.msgSelected = options.msgSelected;
            self.previewFileType = options.previewFileType;
            self.wrapTextLength = options.wrapTextLength;
            self.wrapIndicator = options.wrapIndicator;
            self.isError = false;
            self.isDisabled = self.$element.attr('disabled') || self.$element.attr('readonly');
            if (isEmpty(self.$element.attr('id'))) {
                self.$element.attr('id', uniqId());
            }
            if (typeof self.$container == 'undefined') {
                self.$container = self.createContainer();
            } else {
                self.refreshContainer();
            }
            self.$captionContainer = getElement(options, 'elCaptionContainer', self.$container.find('.file-caption'));
            self.$caption = getElement(options, 'elCaptionText', self.$container.find('.file-caption-name'));
            self.$previewContainer = getElement(options, 'elPreviewContainer', self.$container.find('.file-preview'));
            self.$preview = getElement(options, 'elPreviewImage', self.$container.find('.file-preview-thumbnails'));
            self.$previewStatus = getElement(options, 'elPreviewStatus', self.$container.find('.file-preview-status'));
            var content = self.initialPreview;
            self.initialPreviewCount = isArray(content) ? content.length : (content.length > 0 ? content.split(self.initialDelimiter).length : 0)
            self.initPreview();
            self.original = {
                preview: self.$preview.html(),
                caption: self.$caption.html()
            };
            self.options = options;
            self.$element.removeClass('file-loading');
        },
        listen: function () {
            var self = this, $el = self.$element, $cap = self.$captionContainer, $btnFile = self.$btnFile;
            $el.on('change', $.proxy(self.change, self));
            $btnFile.on('click', function (ev) {
                self.clear(false);
                $cap.focus();
            });
            $($el[0].form).on('reset', $.proxy(self.reset, self));
            self.$container.on('click', '.fileinput-remove:not([disabled])', $.proxy(self.clear, self));
        },
        refresh: function (options) {
            var self = this, params = (arguments.length) ? $.extend(self.options, options) : self.options;
            self.init(params);
        },
        initPreview: function () {
            var self = this, html = '', content = self.initialPreview, len = self.initialPreviewCount,
                cap = self.initialCaption.length, previewId = "preview-" + uniqId(),
                caption = (cap > 0) ? self.initialCaption : self.msgSelected.replace("{n}", len);
            if (isArray(content) && len > 0) {
                for (var i = 0; i < len; i++) {
                    previewId += '-' + i;
                    html += self.previewGenericTemplate.replace("{previewId}", previewId).replace("{content}", content[i]);
                }
                if (len > 1 && cap == 0) {
                    caption = self.msgSelected.replace("{n}", len);
                }
            } else if (len > 0) {
                var fileList = content.split(self.initialDelimiter);
                for (var i = 0; i < len; i++) {
                    previewId += '-' + i;
                    html += self.previewGenericTemplate.replace("{previewId}", previewId).replace("{content}", fileList[i]);
                }
                if (len > 1 && cap == 0) {
                    caption = self.msgSelected.replace("{n}", len);
                }
            } else if (cap > 0) {
                self.$caption.html(caption);
                self.$captionContainer.attr('title', caption);
                return;
            } else {
                return;
            }
            self.initialPreviewContent = html;
            self.$preview.html(html);
            self.$caption.html(caption);
            self.$captionContainer.attr('title', caption);
            self.$container.removeClass('file-input-new');
        },
        clear: function (e) {
            var self = this;
            if (e) {
                e.preventDefault();
            }
            if (self.reader instanceof FileReader) {
                self.reader.abort();
            }
            self.$element.val('');
            self.resetErrors(true);
            if (e !== false) {
                self.$element.trigger('change');
                self.$element.trigger('fileclear');
            }
            if (self.overwriteInitial) {
                self.initialPreviewCount = 0;
            }
            if (!self.overwriteInitial && !isEmpty(self.initialPreviewContent)) {
                self.showFileIcon();
                self.$preview.html(self.original.preview);
                self.$caption.html(self.original.caption);
                self.$container.removeClass('file-input-new');
            } else {
                self.$preview.html('');
                var cap = (!self.overwriteInitial && self.initialCaption.length > 0) ?
                    self.original.caption : '';
                self.$caption.html(cap);
                self.$captionContainer.attr('title', '');
                self.$container.removeClass('file-input-new').addClass('file-input-new');
            }
            self.hideFileIcon();
            self.$element.trigger('filecleared');
            self.$captionContainer.focus();
        },
        reset: function (e) {
            var self = this;
            self.clear(false);
            self.$preview.html(self.original.preview);
            self.$caption.html(self.original.caption);
            self.$container.find('.fileinput-filename').text('');
            self.$element.trigger('filereset');
            if (self.initialPreview.length > 0) {
                self.$container.removeClass('file-input-new');
            }
        },
        disable: function (e) {
            var self = this;
            self.isDisabled = true;
            self.$element.attr('disabled', 'disabled');
            self.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .kv-fileinput-upload").attr("disabled", true);
        },
        enable: function (e) {
            var self = this;
            self.isDisabled = false;
            self.$element.removeAttr('disabled');
            self.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .kv-fileinput-upload").removeAttr("disabled");
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
            var self = this, $error = self.$previewContainer.find('.kv-fileinput-error');
            self.isError = false;
            if (fade) {
                $error.fadeOut('slow');
            } else {
                $error.remove();
            }
        },
        showError: function (msg, file, previewId, index) {
            var self = this, $error = self.$previewContainer.find('.kv-fileinput-error');
            if (isEmpty($error.attr('class'))) {
                self.$previewContainer.append(
                    '<div class="kv-fileinput-error ' + self.msgErrorClass + '">' + msg + '</div>'
                );
            } else {
                $error.html(msg);
            }
            $error.hide();
            $error.fadeIn(800);
            self.$element.trigger('fileerror', [file, previewId, index]);
            self.$element.val('');
            return true;
        },
        errorHandler: function (evt, caption) {
            var self = this;
            switch (evt.target.error.code) {
                case evt.target.error.NOT_FOUND_ERR:
                    self.addError(self.msgFileNotFound.replace('{name}', caption));
                    break;
                case evt.target.error.NOT_READABLE_ERR:
                    self.addError(self.msgFileNotReadable.replace('{name}', caption));
                    break;
                case evt.target.error.ABORT_ERR:
                    self.addError(self.msgFilePreviewAborted.replace('{name}', caption));
                    break;
                default:
                    self.addError(self.msgFilePreviewError.replace('{name}', caption));
            }
        },
        loadImage: function (file, caption) {
            var self = this, $img = $(document.createElement("img"));
            $img.attr({
                src: vUrl.createObjectURL(file),
                class: 'file-preview-image',
                title: caption,
                alt: caption,
                onload: function (e) {
                    vUrl.revokeObjectURL($img.src);
                }
            });
            // autosize if image width exceeds preview width
            if ($img.width() >= self.$preview.width()) {
                $img.attr({width: "100%", height: "auto"});
            }
            var $imgContent = $(document.createElement("div")).append($img);
            return $imgContent.html();
        },
        readFiles: function (files) {
            this.reader = new FileReader();
            var self = this, $el = self.$element, $preview = self.$preview, reader = self.reader,
                $container = self.$previewContainer, $status = self.$previewStatus, msgLoading = self.msgLoading,
                msgProgress = self.msgProgress, msgSelected = self.msgSelected, fileType = self.previewFileType,
                wrapLen = parseInt(self.wrapTextLength), wrapInd = self.wrapIndicator,
                previewInitId = "preview-" + uniqId(), numFiles = files.length;

            function readFile(i) {
                if (i >= numFiles) {
                    $container.removeClass('loading');
                    $status.html('');
                    return;
                }
                var previewId = previewInitId + "-" + i;
                var file = files[i], caption = file.name, isImg = isImageFile(file.type, file.name),
                    isTxt = isTextFile(file.type, file.name), fileSize = (file.size ? file.size : 0) / 1000;
                fileSize = fileSize.toFixed(2);
                if (self.maxFileSize > 0 && fileSize > self.maxFileSize) {
                    var msg = self.msgSizeTooLarge.replace('{name}', caption).replace('{size}', fileSize).replace('{maxSize}', self.maxFileSize);
                    self.isError = self.showError(msg, file, previewId, i);
                    return;
                }
                if ($preview.length > 0 && (fileType == "any" ? (isImg || isTxt) : (fileType == "text" ? isTxt : isImg)) && typeof FileReader !== "undefined") {
                    $status.html(msgLoading.replace('{index}', i + 1).replace('{files}', numFiles));
                    $container.addClass('loading');
                    reader.onerror = function (evt) {
                        self.errorHandler(evt, caption);
                    };
                    reader.onload = function (theFile) {
                        var content = '', modal = '';
                        if (isTxt) {
                            var strText = theFile.target.result;
                            if (strText.length > wrapLen) {
                                var id = uniqId(), height = window.innerHeight * .75,
                                    modal = MODAL_TEMPLATE.replace("{id}", id).replace("{title}", caption).replace("{body}", strText).replace("{height}", height);
                                wrapInd = wrapInd.replace("{title}", caption).replace("{dialog}", "$('#" + id + "').modal('show')");
                                strText = strText.substring(0, (wrapLen - 1)) + wrapInd;
                            }
                            content = self.previewTextTemplate.replace("{previewId}", previewId).replace("{caption}", caption).replace("{strText}", strText) + modal;
                        } else {
                            content = self.previewImageTemplate.replace("{previewId}", previewId).replace("{content}", self.loadImage(file, caption));
                        }
                        $preview.append("\n" + content);
                    };
                    reader.onloadend = function (e) {
                        var msg = msgProgress.replace('{index}', i + 1).replace('{files}', numFiles).replace('{percent}', 100).replace('{name}', file.name);
                        setTimeout(function () {
                            $status.html(msg);
                        }, 1000);
                        setTimeout(function () {
                            readFile(i + 1)
                        }, 1500);
                        $el.trigger('fileloaded', [file, previewId, i]);
                    };
                    reader.onprogress = function (data) {
                        if (data.lengthComputable) {
                            var progress = parseInt(((data.loaded / data.total) * 100), 10);
                            var msg = msgProgress.replace('{index}', i + 1).replace('{files}', numFiles).replace('{percent}', progress).replace('{name}', file.name);
                            setTimeout(function () {
                                $status.html(msg);
                            }, 1000);
                        }
                    };
                    if (isTxt) {
                        reader.readAsText(file);
                    } else {
                        reader.readAsArrayBuffer(file);
                    }
                } else {
                    $preview.append("\n" + self.previewOtherTemplate.replace("{previewId}", previewId).replace("{caption}", caption));
                    $el.trigger('fileloaded', [file, previewId, i]);
                    setTimeout(readFile(i + 1), 1000);
                }
            }

            readFile(0);
        },
        change: function (e) {
            var self = this, $el = self.$element, label = $el.val().replace(/\\/g, '/').replace(/.*\//, ''),
                total = 0, $preview = self.$preview, files = $el.get(0).files, msgSelected = self.msgSelected,
                numFiles = !isEmpty(files) ? (files.length + self.initialPreviewCount) : 1, tfiles;
            self.hideFileIcon();
            if (e.target.files === undefined) {
                tfiles = e.target && e.target.value ? [
                    {name: e.target.value.replace(/^.+\\/, '')}
                ] : [];
            } else {
                tfiles = e.target.files;
            }
            if (tfiles.length === 0) {
                return;
            }
            self.resetErrors();
            $preview.html('');
            if (!self.overwriteInitial) {
                $preview.html(self.initialPreviewContent);
            }
            var total = tfiles.length;
            if (self.maxFileCount > 0 && total > self.maxFileCount) {
                var msg = self.msgFilesTooMany.replace('{m}', self.maxFileCount).replace('{n}', total);
                self.isError = self.showError(msg, null, null, null);
                self.$captionContainer.find('.kv-caption-icon').hide();
                self.$caption.html(self.msgValidationError);
                self.$container.removeClass('file-input-new');
                return;
            }
            self.readFiles(files);
            self.reader = null;
            var log = numFiles > 1 ? msgSelected.replace('{n}', numFiles) : label;
            if (self.isError) {
                self.$captionContainer.find('.kv-caption-icon').hide();
                log = self.msgValidationError;
            } else {
                self.showFileIcon();
            }
            self.$caption.html(log);
            self.$captionContainer.attr('title', log);
            self.$container.removeClass('file-input-new');
            $el.trigger('fileselect', [numFiles, label]);
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
            var self = this;
            var preview = self.previewTemplate.replace('{class}', self.previewClass);
            var css = self.isDisabled ? self.captionClass + ' file-caption-disabled' : self.captionClass;
            var caption = self.captionTemplate.replace('{class}', css + ' kv-fileinput-caption');
            return self.mainTemplate.replace('{class}', self.mainClass).
                replace('{preview}', preview).
                replace('{caption}', caption).
                replace('{upload}', self.renderUpload()).
                replace('{remove}', self.renderRemove()).
                replace('{browse}', self.renderBrowse());
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
            return '<button type="button" class="' + css + '"' + status + '>' + self.removeIcon + self.removeLabel + '</button>';
        },
        renderUpload: function () {
            var self = this, css = self.uploadClass + ' kv-fileinput-upload', content = '', status = '';
            if (!self.showUpload) {
                return '';
            }
            if (self.isDisabled) {
                status = ' disabled ';
            }
            if (isEmpty(self.uploadUrl)) {
                content = '<button type="submit" class="' + css + '"' + status + '>' + self.uploadIcon + self.uploadLabel + '</button>';
            } else {
                content = '<a href="' + self.uploadUrl + '" class="' + self.uploadClass + '"' + status + '>' + self.uploadIcon + self.uploadLabel + '</a>';
            }
            return content;
        }
    }

    $.fn.fileinput = function (options) {
        return this.each(function () {
            var $this = $(this), data = $this.data('fileinput')
            if (!data) {
                $this.data('fileinput', (data = new FileInput(this, options)))
            }
            if (typeof options == 'string') {
                data[options]()
            }
        })
    };

    //FileInput plugin definition
    $.fn.fileinput = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('fileinput'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('fileinput', (data = new FileInput(this, $.extend({}, $.fn.fileinput.defaults, options, $(this).data()))));
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
        captionClass: '',
        previewClass: '',
        mainClass: '',
        mainTemplate: null,
        initialDelimiter: '*$$*',
        initialPreview: '',
        initialCaption: '',
        initialPreviewCount: 0,
        initialPreviewContent: '',
        overwriteInitial: true,
        previewTemplate: PREVIEW_TEMPLATE,
        previewGenericTemplate: IMAGE_TEMPLATE,
        previewImageTemplate: IMAGE_TEMPLATE,
        previewTextTemplate: TEXT_TEMPLATE,
        previewOtherTemplate: OTHER_TEMPLATE,
        captionTemplate: CAPTION_TEMPLATE,
        browseLabel: 'Browse &hellip;',
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i> &nbsp;',
        browseClass: 'btn btn-primary',
        removeLabel: 'Remove',
        removeIcon: '<i class="glyphicon glyphicon-ban-circle"></i> ',
        removeClass: 'btn btn-default',
        uploadLabel: 'Upload',
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i> ',
        uploadClass: 'btn btn-default',
        uploadUrl: null,
        maxFileSize: 0,
        maxFileCount: 0,
        msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>. Please retry your upload!',
        msgFilesTooMany: 'Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>. Please retry your upload!',
        msgFileNotFound: 'File "{name}" not found!',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
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
        elPreviewStatus: null
    };

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