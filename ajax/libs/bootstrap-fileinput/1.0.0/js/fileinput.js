/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2013
 * @version 1.0.0
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
        '</div>';

    var MAIN_TEMPLATE_2 = '{preview}\n{remove}\n{upload}\n{browse}\n';

    var PREVIEW_TEMPLATE = '<div class="file-preview {class}">\n' +
        '   <div class="file-preview-status text-center text-success"></div>\n' +
        '   <div class="close fileinput-remove text-right">&times;</div>\n' +
        '   <div class="file-preview-thumbnails"></div>\n' +
        '   <div class="clearfix"></div>' +
        '</div>';

    var CAPTION_TEMPLATE = '<div class="form-control file-caption {class}">\n' +
        '   <span class="glyphicon glyphicon-file"></span> <span class="file-caption-name"></span>\n' +
        '</div>';

    var MODAL_TEMPLATE = '<div id="{id}" class="modal fade">\n' +
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
        '</div>\n';

    var isEmpty = function (value, trim) {
        return value === null || value === undefined || value == []
            || value === '' || trim && $.trim(value) === '';
    };
    var getValue = function (options, param, value) {
        return (isEmpty(options) || isEmpty(options[param])) ? value : options[param];
    };
    var isImageFile = function (type, name) {
        return (typeof type !== "undefined") ? type.match('image.*') : name.match(/\.(gif|png|jpe?g)$/i);
    };
    var isTextFile = function (type, name) {
        return (typeof type !== "undefined") ? type.match('text.*') : name.match(/\.(txt|md|csv|htm|html|php|ini)$/i);
    };
    var uniqId = function () {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    };
    var FileInput = function (element, options) {
        this.$element = $(element);
        this.showCaption = options.showCaption;
        this.showPreview = options.showPreview;
        this.showRemove = options.showRemove;
        this.showUpload = options.showUpload;
        this.captionClass = options.captionClass;
        this.previewClass = options.previewClass;
        this.mainClass = options.mainClass;
        if (isEmpty(options.mainTemplate)) {
            this.mainTemplate = this.showCaption ? MAIN_TEMPLATE_1 : MAIN_TEMPLATE_2;
        }
        else {
            this.mainTemplate = options.mainTemplate;
        }
        this.previewTemplate = (this.showPreview) ? options.previewTemplate : '';        
        this.captionTemplate = options.captionTemplate;
        this.browseLabel = options.browseLabel;
        this.browseIcon = options.browseIcon;
        this.browseClass = options.browseClass;
        this.removeLabel = options.removeLabel;
        this.removeIcon = options.removeIcon;
        this.removeClass = options.removeClass;
        this.uploadLabel = options.uploadLabel;
        this.uploadIcon = options.uploadIcon;
        this.uploadClass = options.uploadClass;
        this.uploadUrl = options.uploadUrl;
        this.msgLoading = options.msgLoading;
        this.msgProgress = options.msgProgress;
        this.msgSelected = options.msgSelected;
        this.previewFileType = options.previewFileType;
        this.wrapTextLength = options.wrapTextLength;
        this.wrapIndicator = options.wrapIndicator;
        this.isDisabled = this.$element.attr('disabled') || this.$element.attr('readonly');
        if (isEmpty(this.$element.attr('id'))) {
            this.$element.attr('id', uniqId());
        }
        this.$container = this.createContainer();
        /* Initialize plugin option parameters */
        this.$captionContainer = getValue(options, 'elCaptionContainer', this.$container.find('.file-caption'));
        this.$caption = getValue(options, 'elCaptionText', this.$container.find('.file-caption-name'));
        this.$previewContainer = getValue(options, 'elPreviewContainer', this.$container.find('.file-preview'));
        this.$preview = getValue(options, 'elPreviewImage', this.$container.find('.file-preview-thumbnails'));
        this.$previewStatus = getValue(options, 'elPreviewStatus', this.$container.find('.file-preview-status'));
        this.$name = this.$element.attr('name') || options.name;
        this.$hidden = this.$container.find('input[type=hidden][name="' + this.$name + '"]');
        if (this.$hidden.length === 0) {
            this.$hidden = $('<input type="hidden" />');
            this.$container.prepend(this.$hidden);
        }
        this.original = {
            preview: this.$preview.html(),
            hiddenVal: this.$hidden.val()
        };
        this.listen()
    };

    FileInput.prototype = {
        constructor: FileInput,
        listen: function () {
            var self = this;
            self.$element.on('change', $.proxy(self.change, self));
            $(self.$element[0].form).on('reset', $.proxy(self.reset, self));
            self.$container.find('.fileinput-remove').on('click', $.proxy(self.clear, self));
        },
        trigger: function (e) {
            var self = this;
            self.$element.trigger('click');
            e.preventDefault();
        },
        clear: function (e) {
            var self = this;
            if (e) {
                e.preventDefault();
            }

            self.$hidden.val('');
            self.$hidden.attr('name', self.name);
            self.$element.attr('name', '');
            self.$element.val('');
            if (e !== false) {
                self.$element.trigger('change');
                self.$element.trigger('fileclear');
            }
            self.$preview.html('');
            self.$caption.html('');
            self.$container.removeClass('file-input-new').addClass('file-input-new');
        },
        reset: function (e) {
            var self = this;
            self.clear(false);
            self.$hidden.val(self.original.hiddenVal);
            self.$preview.html(self.original.preview);
            self.$container.find('.fileinput-filename').text('');
            self.$element.trigger('filereset');
        },
        change: function (e) {
            var self = this;
            var elem = self.$element, files = elem.get(0).files, numFiles = files ? files.length : 1,
                label = elem.val().replace(/\\/g, '/').replace(/.*\//, ''), preview = self.$preview,
                container = self.$previewContainer, status = self.$previewStatus, msgLoading = self.msgLoading,
                msgProgress = self.msgProgress, msgSelected = self.msgSelected, tfiles,
                fileType = self.previewFileType, wrapLen = parseInt(self.wrapTextLength),
                wrapInd = self.wrapIndicator;

            if (e.target.files === undefined) {
                tfiles = e.target && e.target.value ? [
                    {name: e.target.value.replace(/^.+\\/, '')}
                ] : [];
            }
            else {
                tfiles = e.target.files;
            }
            if (tfiles.length === 0) {
                return;
            }
            preview.html('');
            var total = tfiles.length, self = self;
            for (var i = 0; i < total; i++) {
                (function (file) {
                    var caption = file.name;
                    var isImg = isImageFile(file.type, file.name);
                    var isTxt = isTextFile(file.type, file.name);
                    if (preview.length > 0 && (fileType == "any" ? (isImg || isTxt) : (fileType == "text" ? isTxt : isImg)) && typeof FileReader !== "undefined") {
                        var reader = new FileReader();
                        status.html(msgLoading);
                        container.addClass('loading');
                        reader.onload = function (theFile) {
                            var content = '', modal = "";
                            if (isTxt) {
                                var strText = theFile.target.result;
                                if (strText.length > wrapLen) {
                                    var id = uniqId(), height = window.innerHeight * .75,
                                        modal = MODAL_TEMPLATE.replace("{id}", id).replace("{title}", caption).replace("{body}", strText).replace("{height}", height);
                                    wrapInd = wrapInd.replace("{title}", caption).replace("{dialog}", "$('#" + id + "').modal('show')");
                                    strText = strText.substring(0, (wrapLen - 1)) + wrapInd;
                                }
                                content = '<div class="file-preview-frame"><div class="file-preview-text" title="' + caption + '">' + strText + '</div></div>' + modal;
                            }
                            else {
                                content = '<div class="file-preview-frame"><img src="' + theFile.target.result + '" class="file-preview-image" title="' + caption + '" alt="' + caption + '"></div>';
                            }
                            preview.append("\n" + content);
                            if (i >= total - 1) {
                                container.removeClass('loading');
                                status.html('');
                            }
                        };
                        reader.onprogress = function (data) {
                            if (data.lengthComputable) {
                                var progress = parseInt(((data.loaded / data.total) * 100), 10);
                                var msg = msgProgress.replace('{percent}', progress).replace('{file}', file.name);
                                status.html(msg);
                            }
                        };
                        if (isTxt) {
                            reader.readAsText(file);
                        }
                        else {
                            reader.readAsDataURL(file);
                        }
                    }
                    else {
                        preview.append("\n" + '<div class="file-preview-frame"><div class="file-preview-other"><h2><i class="glyphicon glyphicon-file"></i></h2>' + caption + '</div></div>');
                    }
                })(tfiles[i]);
            }
            var log = numFiles > 1 ? msgSelected.replace('{n}', numFiles) : label;
            self.$caption.html(log);
            self.$container.removeClass('file-input-new');
            elem.trigger('fileselect', [numFiles, label]);
        },
        createContainer: function () {
            var self = this;
            var container = $(document.createElement("div")).attr({"class": 'file-input file-input-new'}).html(self.renderMain());
            self.$element.before(container);
            container.find('.btn-file').append(self.$element);
            return container;
        },
        renderMain: function () {
            var self = this;
            var preview = self.previewTemplate.replace('{class}', self.previewClass);
            var css = self.isDisabled ? self.captionClass + ' file-caption-disabled' : self.captionClass;
            var caption = self.captionTemplate.replace('{class}', css);
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
            var self = this, content = '', status = '';
            if (!self.showUpload) {
                return '';
            }
            if (self.isDisabled) {
                status = ' disabled ';
            }
            if (isEmpty(self.uploadUrl)) {
                content = '<button type="submit" class="' + self.uploadClass + '"' + status + '>' + self.uploadIcon + self.uploadLabel + '</button>';
            }
            else {
                content = '<a href="' + self.uploadUrl + '" class="' + self.uploadClass + '"' + status + '>' + self.uploadIcon + self.uploadLabel + '</a>';
            }
            return content;
        },
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
        previewTemplate: PREVIEW_TEMPLATE,
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
        msgLoading: 'Loading &hellip;',
        msgProgress: 'Loaded {percent}% of {file}',
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
    $(function () {
        var $element = $('input.file[type=file]');
        if ($element.length > 0) {
            $element.fileinput();
        }

    });

})(window.jQuery);