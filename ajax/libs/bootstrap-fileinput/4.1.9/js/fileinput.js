/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2015
 * @version 4.1.9
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
 * Copyright: 2015, Kartik Visweswaran, Krajee.com
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    "use strict";
    String.prototype.repl = function (from, to) {
        return this.split(from).join(to);
    };
    var isIE = function (ver) {
            var div = document.createElement("div"), status;
            div.innerHTML = "<!--[if IE " + ver + "]><i></i><![endif]-->";
            status = (div.getElementsByTagName("i").length === 1);
            document.body.appendChild(div);
            div.parentNode.removeChild(div);
            return status;
        },
        previewCache = {
            data: {},
            init: function (obj) {
                var content = obj.initialPreview, id = obj.id;
                if (content.length > 0 && !isArray(content)) {
                    content = content.split(obj.initialPreviewDelimiter);
                }
                previewCache.data[id] = {
                    content: content,
                    config: obj.initialPreviewConfig,
                    tags: obj.initialPreviewThumbTags,
                    delimiter: obj.initialPreviewDelimiter,
                    template: obj.previewGenericTemplate,
                    msg: function (n) {
                        return obj.getMsgSelected(n);
                    },
                    initId: obj.previewInitId,
                    footer: obj.getLayoutTemplate('footer'),
                    isDelete: obj.initialPreviewShowDelete,
                    caption: obj.initialCaption,
                    actions: function (showUpload, showDelete, disabled, url, key) {
                        return obj.renderFileActions(showUpload, showDelete, disabled, url, key);
                    }
                };
            },
            fetch: function (id) {
                return previewCache.data[id].content.filter(function (n) {
                    return n !== null;
                });
            },
            count: function (id, all) {
                return !!previewCache.data[id] && !!previewCache.data[id].content ?
                    (all ? previewCache.data[id].content.length : previewCache.fetch(id).length) : 0;
            },
            get: function (id, i, isDisabled) {
                var ind = 'init_' + i, data = previewCache.data[id],
                    previewId = data.initId + '-' + ind, out;
                isDisabled = isDisabled === undefined ? true : isDisabled;
                if (data.content[i] === null) {
                    return '';
                }
                out = data.template
                    .repl('{previewId}', previewId)
                    .repl('{frameClass}', ' file-preview-initial')
                    .repl('{fileindex}', ind)
                    .repl('{content}', data.content[i])
                    .repl('{footer}', previewCache.footer(id, i, isDisabled));
                if (data.tags.length && data.tags[i]) {
                    out = replaceTags(out, data.tags[i]);
                }
                return out;
            },
            add: function (id, content, config, tags, append) {
                var data = $.extend(true, {}, previewCache.data[id]), index;
                if (!isArray(content)) {
                    content = content.split(data.delimiter);
                }
                if (append) {
                    index = data.content.push(content) - 1;
                    data.config[index] = config;
                    data.tags[index] = tags;
                } else {
                    index = content.length;
                    data.content = content;
                    data.config = config;
                    data.tags = tags;
                }
                previewCache.data[id] = data;
                return index;
            },
            set: function (id, content, config, tags, append) {
                var data = $.extend(true, {}, previewCache.data[id]), i;
                if (!isArray(content)) {
                    content = content.split(data.delimiter);
                }
                if (append) {
                    for (i = 0; i < content.length; i++) {
                        data.content.push(content[i]);
                    }
                    for (i = 0; i < config.length; i++) {
                        data.config.push(config[i]);
                    }
                    for (i = 0; i < tags.length; i++) {
                        data.tags.push(tags[i]);
                    }
                } else {
                    data.content = content;
                    data.config = config;
                    data.tags = tags;
                }
                previewCache.data[id] = data;
            },
            unset: function (id, index) {
                var chk = previewCache.count(id);
                if (!chk) {
                    return;
                }
                if (chk === 1) {
                    previewCache.data[id].content = [];
                    previewCache.data[id].config = [];
                    return;
                }
                previewCache.data[id].content[index] = null;
                previewCache.data[id].config[index] = null;
            },
            out: function (id) {
                var html = '', data = previewCache.data[id], caption, len = previewCache.count(id, true);
                if (len === 0) {
                    return {content: '', caption: ''};
                }
                for (var i = 0; i < len; i++) {
                    html += previewCache.get(id, i);
                }
                caption = data.msg(previewCache.count(id));
                return {content: html, caption: caption};
            },
            footer: function (id, i, isDisabled) {
                var data = previewCache.data[id];
                isDisabled = isDisabled === undefined ? true : isDisabled;
                if (data.config.length === 0 || isEmpty(data.config[i])) {
                    return '';
                }
                var config = data.config[i],
                    caption = isSet('caption', config) ? config.caption : '',
                    width = isSet('width', config) ? config.width : 'auto',
                    url = isSet('url', config) ? config.url : false,
                    key = isSet('key', config) ? config.key : null,
                    disabled = (url === false) && isDisabled,
                    actions = data.isDelete ? data.actions(false, true, disabled, url, key) : '',
                    footer = data.footer.repl('{actions}', actions);
                return footer
                    .repl('{caption}', caption)
                    .repl('{width}', width)
                    .repl('{indicator}', '')
                    .repl('{indicatorTitle}', '');
            }
        },
        getNum = function (num, def) {
            def = def || 0;
            if (typeof num === "number") {
                return num;
            }
            if (typeof num === "string") {
                num = parseFloat(num);
            }
            return isNaN(num) ? def : num;
        },
        hasFileAPISupport = function () {
            return window.File && window.FileReader;
        },
        hasDragDropSupport = function () {
            var $div = document.createElement('div');
            return !isIE(9) && ($div.draggable !== undefined || ($div.ondragstart !== undefined && $div.ondrop !== undefined));
        },
        hasFileUploadSupport = function () {
            return hasFileAPISupport && window.FormData;
        },
        addCss = function ($el, css) {
            $el.removeClass(css).addClass(css);
        },
        STYLE_SETTING = 'style="width:{width};height:{height};"',
        OBJECT_PARAMS = '      <param name="controller" value="true" />\n' +
            '      <param name="allowFullScreen" value="true" />\n' +
            '      <param name="allowScriptAccess" value="always" />\n' +
            '      <param name="autoPlay" value="false" />\n' +
            '      <param name="autoStart" value="false" />\n' +
            '      <param name="quality" value="high" />\n',
        DEFAULT_PREVIEW = '<div class="file-preview-other">\n' +
            '       {previewFileIcon}\n' +
            '   </div>',
        defaultFileActionSettings = {
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
        },
        tMain1 = '{preview}\n' +
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
        tMain2 = '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n',
        tPreview = '<div class="file-preview {class}">\n' +
            '    <div class="close fileinput-remove">&times;</div>\n' +
            '    <div class="{dropClass}">\n' +
            '    <div class="file-preview-thumbnails">\n' +
            '    </div>\n' +
            '    <div class="clearfix"></div>' +
            '    <div class="file-preview-status text-center text-success"></div>\n' +
            '    <div class="kv-fileinput-error"></div>\n' +
            '    </div>\n' +
            '</div>',
        tIcon = '<span class="glyphicon glyphicon-file kv-caption-icon"></span>',
        tCaption = '<div tabindex="-1" class="form-control file-caption {class}">\n' +
            '   <span class="file-caption-ellipsis">&hellip;</span>\n' +
            '   <div class="file-caption-name"></div>\n' +
            '</div>',
        tModal = '<div id="{id}" class="modal fade">\n' +
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
        tProgress = '<div class="progress">\n' +
            '    <div class="{class}" role="progressbar"' +
            ' aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
            '        {percent}%\n' +
            '     </div>\n' +
            '</div>',
        tFooter = '<div class="file-thumbnail-footer">\n' +
            '    <div class="file-caption-name">{caption}</div>\n' +
            '    {actions}\n' +
            '</div>',
        tActions = '<div class="file-actions">\n' +
            '    <div class="file-footer-buttons">\n' +
            '        {upload}{delete}{other}' +
            '    </div>\n' +
            '    <div class="file-upload-indicator" tabindex="-1" title="{indicatorTitle}">{indicator}</div>\n' +
            '    <div class="clearfix"></div>\n' +
            '</div>',
        tActionDelete = '<button type="button" class="kv-file-remove {removeClass}" ' +
            'title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n',
        tActionUpload = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">' +
            '   {uploadIcon}\n</button>\n',
        tGeneric = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
            '   {content}\n' +
            '   {footer}\n' +
            '</div>\n',
        tHtml = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
            '    <object data="{data}" type="{type}" width="{width}" height="{height}">\n' +
            '       ' + DEFAULT_PREVIEW + '\n' +
            '    </object>\n' +
            '   {footer}\n' +
            '</div>',
        tImage = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
            '   <img src="{data}" class="file-preview-image" title="{caption}" alt="{caption}" ' + STYLE_SETTING + '>\n' +
            '   {footer}\n' +
            '</div>\n',
        tText = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
            '   <div class="file-preview-text" title="{caption}" ' + STYLE_SETTING + '>\n' +
            '       {data}\n' +
            '   </div>\n' +
            '   {footer}\n' +
            '</div>',
        tVideo = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
            ' title="{caption}" ' + STYLE_SETTING + '>\n' +
            '   <video width="{width}" height="{height}" controls>\n' +
            '       <source src="{data}" type="{type}">\n' +
            '       ' + DEFAULT_PREVIEW + '\n' +
            '   </video>\n' +
            '   {footer}\n' +
            '</div>\n',
        tAudio = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
            ' title="{caption}" ' + STYLE_SETTING + '>\n' +
            '   <audio controls>\n' +
            '       <source src="' + '{data}' + '" type="{type}">\n' +
            '       ' + DEFAULT_PREVIEW + '\n' +
            '   </audio>\n' +
            '   {footer}\n' +
            '</div>',
        tFlash = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
            ' title="{caption}" ' + STYLE_SETTING + '>\n' +
            '   <object type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' +
            OBJECT_PARAMS + '       ' + DEFAULT_PREVIEW + '\n' +
            '   </object>\n' +
            '   {footer}\n' +
            '</div>\n',
        tObject = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
            ' title="{caption}" ' + STYLE_SETTING + '>\n' +
            '   <object data="{data}" type="{type}" width="{width}" height="{height}">\n' +
            '       <param name="movie" value="{caption}" />\n' +
            OBJECT_PARAMS + '         ' + DEFAULT_PREVIEW + '\n' +
            '   </object>\n' +
            '   {footer}\n' +
            '</div>',
        tOther = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
            ' title="{caption}" ' + STYLE_SETTING + '>\n' +
            '   ' + DEFAULT_PREVIEW + '\n' +
            '   {footer}\n' +
            '</div>',
        defaultLayoutTemplates = {
            main1: tMain1,
            main2: tMain2,
            preview: tPreview,
            icon: tIcon,
            caption: tCaption,
            modal: tModal,
            progress: tProgress,
            footer: tFooter,
            actions: tActions,
            actionDelete: tActionDelete,
            actionUpload: tActionUpload
        },
        defaultPreviewTemplates = {
            generic: tGeneric,
            html: tHtml,
            image: tImage,
            text: tText,
            video: tVideo,
            audio: tAudio,
            flash: tFlash,
            object: tObject,
            other: tOther
        },
        defaultPreviewTypes = ['image', 'html', 'text', 'video', 'audio', 'flash', 'object'],
        defaultPreviewSettings = {
            image: {width: "auto", height: "160px"},
            html: {width: "213px", height: "160px"},
            text: {width: "160px", height: "160px"},
            video: {width: "213px", height: "160px"},
            audio: {width: "213px", height: "80px"},
            flash: {width: "213px", height: "160px"},
            object: {width: "160px", height: "160px"},
            other: {width: "160px", height: "160px"}
        },
        defaultFileTypeSettings = {
            image: function (vType, vName) {
                return (vType !== undefined) ? vType.match('image.*') : vName.match(/\.(gif|png|jpe?g)$/i);
            },
            html: function (vType, vName) {
                return (vType !== undefined) ? vType === 'text/html' : vName.match(/\.(htm|html)$/i);
            },
            text: function (vType, vName) {
                return (vType !== undefined && vType.match('text.*')) || vName.match(/\.(txt|md|csv|nfo|php|ini)$/i);
            },
            video: function (vType, vName) {
                return (vType !== undefined && vType.match(/\.video\/(ogg|mp4|webm)$/i)) || vName.match(/\.(og?|mp4|webm)$/i);
            },
            audio: function (vType, vName) {
                return (vType !== undefined && vType.match(/\.audio\/(ogg|mp3|wav)$/i)) || vName.match(/\.(ogg|mp3|wav)$/i);
            },
            flash: function (vType, vName) {
                return (vType !== undefined && vType === 'application/x-shockwave-flash') || vName.match(/\.(swf)$/i);
            },
            object: function () {
                return true;
            },
            other: function () {
                return true;
            }
        },
        isEmpty = function (value, trim) {
            return value === null || value === undefined || value.length === 0 || (trim && $.trim(value) === '');
        },
        isArray = function (a) {
            return Array.isArray(a) || Object.prototype.toString.call(a) === '[object Array]';
        },
        isSet = function (needle, haystack) {
            return (typeof haystack === 'object' && needle in haystack);
        },
        getElement = function (options, param, value) {
            return (isEmpty(options) || isEmpty(options[param])) ? value : $(options[param]);
        },
        uniqId = function () {
            return Math.round(new Date().getTime() + (Math.random() * 100));
        },
        htmlEncode = function (str) {
            return String(str).repl('&', '&amp;')
                .repl('"', '&quot;')
                .repl("'", '&#39;')
                .repl('<', '&lt;')
                .repl('>', '&gt;');
        },
        replaceTags = function (str, tags) {
            var out = str;
            tags = tags || {};
            $.each(tags, function (key, value) {
                if (typeof value === "function") {
                    value = value();
                }
                out = out.repl(key, value);
            });
            return out;
        },
        objUrl = window.URL || window.webkitURL,
        FileInput = function (element, options) {
            var self = this;
            self.$element = $(element);
            if (!self.validate()) {
                return;
            }
            if (hasFileAPISupport() || isIE(9)) {
                self.init(options);
                self.listen();
            } else {
                self.$element.removeClass('file-loading');
            }
        };

    FileInput.prototype = {
        constructor: FileInput,
        validate: function() {
            var self = this, $exception;
            if (self.$element.attr('type') === 'file') {
                return true;
            }
            $exception = '<div class="help-block alert alert-warning">' +
                '<h4>Invalid Input Type</h4>' +
                'You must set an input <code>type = file</code> for <b>bootstrap-fileinput</b> plugin to initialize.' +
                '</div>';
            self.$element.after($exception);
            return false;
        },
        init: function (options) {
            var self = this, $el = self.$element, t;
            $.each(options, function (key, value) {
                self[key] = (key === 'maxFileCount' || key === 'maxFileSize') ? getNum(value) : value;
            });
            self.fileInputCleared = false;
            self.fileBatchCompleted = true;
            if (isEmpty(self.allowedPreviewTypes)) {
                self.allowedPreviewTypes = defaultPreviewTypes;
            }
            self.uploadFileAttr = !isEmpty($el.attr('name')) ? $el.attr('name') : 'file_data';
            self.reader = null;
            self.formdata = {};
            self.isIE9 = isIE(9);
            self.isIE10 = isIE(10);
            self.filestack = [];
            self.ajaxRequests = [];
            self.isError = false;
            self.ajaxAborted = false;
            self.dropZoneEnabled = hasDragDropSupport() && self.dropZoneEnabled;
            self.isDisabled = self.$element.attr('disabled') || self.$element.attr('readonly');
            self.isUploadable = hasFileUploadSupport && !isEmpty(self.uploadUrl);
            self.slug = typeof options.slugCallback === "function" ? options.slugCallback : self.slugDefault;
            self.mainTemplate = self.showCaption ? self.getLayoutTemplate('main1') : self.getLayoutTemplate('main2');
            self.captionTemplate = self.getLayoutTemplate('caption');
            self.previewGenericTemplate = self.getPreviewTemplate('generic');
            if (isEmpty(self.$element.attr('id'))) {
                self.$element.attr('id', uniqId());
            }
            if (self.$container === undefined) {
                self.$container = self.createContainer();
            } else {
                self.refreshContainer();
            }
            self.$progress = self.$container.find('.kv-upload-progress');
            self.$btnUpload = self.$container.find('.kv-fileinput-upload');
            self.$captionContainer = getElement(options, 'elCaptionContainer', self.$container.find('.file-caption'));
            self.$caption = getElement(options, 'elCaptionText', self.$container.find('.file-caption-name'));
            self.$previewContainer = getElement(options, 'elPreviewContainer', self.$container.find('.file-preview'));
            self.$preview = getElement(options, 'elPreviewImage', self.$container.find('.file-preview-thumbnails'));
            self.$previewStatus = getElement(options, 'elPreviewStatus', self.$container.find('.file-preview-status'));
            self.$errorContainer = getElement(options, 'elErrorContainer',
                self.$previewContainer.find('.kv-fileinput-error'));
            if (!isEmpty(self.msgErrorClass)) {
                addCss(self.$errorContainer, self.msgErrorClass);
            }
            self.$errorContainer.hide();
            self.fileActionSettings = $.extend(defaultFileActionSettings, options.fileActionSettings);
            self.previewInitId = "preview-" + uniqId();
            self.id = self.$element.attr('id');
            previewCache.init(self);
            self.initPreview(true);
            self.initPreviewDeletes();
            self.options = options;
            self.setFileDropZoneTitle();
            self.uploadCount = 0;
            self.uploadPercent = 0;
            self.$element.removeClass('file-loading');
            t = self.getLayoutTemplate('progress');
            self.progressTemplate = t.replace('{class}', self.progressClass);
            self.progressCompleteTemplate = t.replace('{class}', self.progressCompleteClass);
            self.setEllipsis();
        },
        parseError: function (jqXHR, errorThrown, fileName) {
            var self = this, errMsg = $.trim(errorThrown + ''),
                dot = errMsg.slice(-1) === '.' ? '' : '.',
                text = $(jqXHR.responseText).text();
            if (self.showAjaxErrorDetails) {
                text = $.trim(text.replace(/\n\s*\n/g, '\n'));
                text = text.length > 0 ? '<pre>' + text + '</pre>' : '';
                errMsg += dot + text;
            } else {
                errMsg += dot;
            }
            return fileName ? '<b>' + fileName + ': </b>' + jqXHR : errMsg;
        },
        raise: function (event, params) {
            var self = this, e = $.Event(event), out = false;
            if (params !== undefined) {
                self.$element.trigger(e, params);
            } else {
                self.$element.trigger(e);
            }
            if (e.result) {
                out = true;
            }
            if (!out) {
                return;
            }
            switch (event) {
                // ignore these events
                case 'filebatchuploadcomplete':
                case 'filebatchuploadsuccess':
                case 'fileuploaded':
                case 'fileclear':
                case 'filecleared':
                case 'filereset':
                case 'fileerror':
                case 'filefoldererror':
                case 'fileuploaderror':
                case 'filebatchuploaderror':
                case 'filedeleteerror':
                case 'filecustomerror':
                    break;
                // can trigger filecustomerror to abort upload
                default:
                    self.ajaxAborted = out;
                    break;
            }
        },
        getLayoutTemplate: function (t) {
            var self = this,
                template = isSet(t, self.layoutTemplates) ? self.layoutTemplates[t] : defaultLayoutTemplates[t];
            if (isEmpty(self.customLayoutTags)) {
                return template;
            }
            return replaceTags(template, self.customLayoutTags);
        },
        getPreviewTemplate: function (t) {
            var self = this,
                template = isSet(t, self.previewTemplates) ? self.previewTemplates[t] : defaultPreviewTemplates[t];
            template = template.repl('{previewFileIcon}', self.previewFileIcon);
            if (isEmpty(self.customPreviewTags)) {
                return template;
            }
            return replaceTags(template, self.customPreviewTags);
        },
        getOutData: function (jqXHR, responseData, filesData) {
            var self = this;
            jqXHR = jqXHR || {};
            responseData = responseData || {};
            filesData = filesData || self.filestack.slice(0) || {};
            return {
                form: self.formdata,
                files: filesData,
                extra: self.getExtraData(),
                response: responseData,
                reader: self.reader,
                jqXHR: jqXHR
            };
        },
        setEllipsis: function () {
            var self = this, $capCont = self.$captionContainer, $cap = self.$caption,
                $div = $cap.clone().css('height', 'auto').hide();
            $capCont.parent().before($div);
            $capCont.removeClass('kv-has-ellipsis');
            if ($div.outerWidth() > $cap.outerWidth()) {
                $capCont.addClass('kv-has-ellipsis');
            }
            $div.remove();
        },
        listen: function () {
            var self = this, $el = self.$element, $cap = self.$captionContainer, $btnFile = self.$btnFile,
                $form = $el.closest('form');
            $el.on('change', $.proxy(self.change, self));
            $(window).on('resize', function () {
                self.setEllipsis();
            });
            $btnFile.off('click').on('click', function () {
                self.raise('filebrowse');
                if (self.isError && !self.isUploadable) {
                    self.clear();
                }
                $cap.focus();
            });
            $form.off('reset').on('reset', $.proxy(self.reset, self));
            self.$container.off('click')
                .on('click', '.fileinput-remove:not([disabled])', $.proxy(self.clear, self))
                .on('click', '.fileinput-cancel', $.proxy(self.cancel, self));
            if (self.isUploadable && self.dropZoneEnabled && self.showPreview) {
                self.initDragDrop();
            }
            if (!self.isUploadable) {
                $form.on('submit', $.proxy(self.submitForm, self));
            }
            self.$container.find('.kv-fileinput-upload').off('click').on('click', function (e) {
                if (!self.isUploadable) {
                    return;
                }
                e.preventDefault();
                if (!$(this).hasClass('disabled') && isEmpty($(this).attr('disabled'))) {
                    self.upload();
                }
            });
        },
        submitForm: function () {
            var self = this, $el = self.$element, files = $el.get(0).files;
            if (files && files.length < self.minFileCount && self.minFileCount > 0) {
                self.noFilesError({});
                return false;
            }
            return !self.abort({});
        },
        abort: function (params) {
            var self = this, data;
            if (self.ajaxAborted && typeof self.ajaxAborted === "object" && self.ajaxAborted.message !== undefined) {
                if (self.ajaxAborted.data !== undefined) {
                    data = self.getOutData({}, self.ajaxAborted.data);
                } else {
                    data = self.getOutData();
                }
                data = $.extend(data, params);
                self.showUploadError(self.ajaxAborted.message, data, 'filecustomerror');
                return true;
            }
            return false;
        },
        noFilesError: function (params) {
            var self = this, label = self.minFileCount > 1 ? self.filePlural : self.fileSingle,
                msg = self.msgFilesTooLess.repl('{n}', self.minFileCount).repl('{files}', label),
                $error = self.$errorContainer;
            $error.html(msg);
            self.isError = true;
            self.updateFileDetails(0);
            $error.fadeIn(800);
            self.raise('fileerror', [params]);
            self.clearFileInput();
            addCss(self.$container, 'has-error');
        },
        setProgress: function (p) {
            var self = this, pct = Math.min(p, 100),
                template = pct < 100 ? self.progressTemplate : self.progressCompleteTemplate;
            self.$progress.html(template.repl('{percent}', pct));
        },
        upload: function () {
            var self = this, totLen = self.getFileStack().length, params = {},
                i, outData, len, hasExtraData = !$.isEmptyObject(self.getExtraData());
            if (totLen < self.minFileCount && self.minFileCount > 0) {
                self.noFilesError(params);
                return;
            }
            if (!self.isUploadable || self.isDisabled || (totLen === 0 && !hasExtraData)) {
                return;
            }
            self.resetUpload();
            self.$progress.removeClass('hide');
            self.uploadCount = 0;
            self.uploadPercent = 0;
            self.lock();
            self.setProgress(0);
            if (totLen === 0 && hasExtraData) {
                self.uploadExtraOnly();
                return;
            }
            len = self.filestack.length;
            self.hasInitData = false;
            if (self.uploadAsync && self.showPreview) {
                outData = self.getOutData();
                self.raise('filebatchpreupload', [outData]);
                self.fileBatchCompleted = false;
                self.uploadCache = {content: [], config: [], tags: [], append: true};
                for (i = 0; i < len; i += 1) {
                    if (self.filestack[i] !== undefined) {
                        self.uploadSingle(i, self.filestack, true);
                    }
                }
                return;
            }
            self.uploadBatch();
        },
        lock: function () {
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
        unlock: function (reset) {
            var self = this;
            if (reset === undefined) {
                reset = true;
            }
            self.enable();
            if (self.showCancel) {
                addCss(self.$container.find('.fileinput-cancel'), 'hide');
            }
            if (self.showRemove) {
                self.$container.find('.fileinput-remove').removeClass('hide');
            }
            if (reset) {
                self.resetFileStack();
            }
            self.raise('fileunlock', [self.filestack, self.getExtraData()]);
        },
        resetFileStack: function () {
            var self = this, i = 0, newstack = [];
            self.getThumbs().each(function () {
                var $thumb = $(this), ind = $thumb.attr('data-fileindex'),
                    file = self.filestack[ind];
                if (ind === -1) {
                    return;
                }
                if (file !== undefined) {
                    newstack[i] = file;
                    $thumb.attr({
                        'id': self.previewInitId + '-' + i,
                        'data-fileindex': i
                    });
                    i += 1;
                } else {
                    $thumb.attr({
                        'id': 'uploaded-' + uniqId(),
                        'data-fileindex': '-1'
                    });
                }
            });
            self.filestack = newstack;
        },
        refresh: function (options) {
            var self = this, $el = self.$element, $zone,
                params = (arguments.length) ? $.extend(self.options, options) : self.options;
            $el.off();
            self.init(params);
            $zone = self.$container.find('.file-drop-zone');
            $zone.off('dragenter dragover drop');
            $(document).off('dragenter dragover drop');
            self.listen();
            self.setFileDropZoneTitle();
        },
        initDragDrop: function () {
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
        setFileDropZoneTitle: function () {
            var self = this, $zone = self.$container.find('.file-drop-zone');
            $zone.find('.' + self.dropZoneTitleClass).remove();
            if (!self.isUploadable || !self.showPreview || $zone.length === 0 || self.getFileStack().length > 0 || !self.dropZoneEnabled) {
                return;
            }
            if ($zone.find('.file-preview-frame').length === 0) {
                $zone.prepend('<div class="' + self.dropZoneTitleClass + '">' + self.dropZoneTitle + '</div>');
            }
            self.$container.removeClass('file-input-new');
            addCss(self.$container, 'file-input-ajax-new');
        },
        initFileActions: function () {
            var self = this;
            self.$preview.find('.kv-file-remove').each(function () {
                var $el = $(this), $frame = $el.closest('.file-preview-frame'),
                    ind = $frame.attr('data-fileindex'), n, cap;
                $el.off('click').on('click', function () {
                    $frame.fadeOut('slow', function () {
                        self.filestack[ind] = undefined;
                        self.clearObjects($frame);
                        $frame.remove();
                        var filestack = self.getFileStack(), len = filestack.length,
                            chk = previewCache.count(self.id);
                        self.clearFileInput();
                        if (len === 0 && chk === 0) {
                            self.reset();
                        } else {
                            n = chk + len;
                            cap = n > 1 ? self.getMsgSelected(n) : filestack[0].name;
                            self.setCaption(cap);
                        }
                    });
                });
            });
            self.$preview.find('.kv-file-upload').each(function () {
                var $el = $(this);
                $el.off('click').on('click', function () {
                    var $frame = $el.closest('.file-preview-frame'),
                        ind = $frame.attr('data-fileindex');
                    self.uploadSingle(ind, self.filestack, false);
                });
            });
        },
        getMsgSelected: function (n) {
            var self = this, strFiles = n === 1 ? self.fileSingle : self.filePlural;
            return self.msgSelected.repl('{n}', n).repl('{files}', strFiles);
        },
        renderFileFooter: function (caption, width) {
            var self = this, config = self.fileActionSettings, footer, out,
                template = self.getLayoutTemplate('footer');
            if (self.isUploadable) {
                footer = template.repl('{actions}', self.renderFileActions(true, true, false, false, false));
                out = footer.repl('{caption}', caption)
                    .repl('{width}', width)
                    .repl('{indicator}', config.indicatorNew)
                    .repl('{indicatorTitle}', config.indicatorNewTitle);
            } else {
                out = template.repl('{actions}', '')
                    .repl('{caption}', caption)
                    .repl('{width}', width)
                    .repl('{indicator}', '')
                    .repl('{indicatorTitle}', '');
            }
            out = replaceTags(out, self.previewThumbTags);
            return out;
        },
        renderFileActions: function (showUpload, showDelete, disabled, url, key) {
            if (!showUpload && !showDelete) {
                return '';
            }
            var self = this,
                vUrl = url === false ? '' : ' data-url="' + url + '"',
                vKey = key === false ? '' : ' data-key="' + key + '"',
                btnDelete = self.getLayoutTemplate('actionDelete'),
                btnUpload = '',
                template = self.getLayoutTemplate('actions'),
                otherButtons = self.otherActionButtons.repl('{dataKey}', vKey),
                config = self.fileActionSettings,
                removeClass = disabled ? config.removeClass + ' disabled' : config.removeClass;
            btnDelete = btnDelete
                .repl('{removeClass}', removeClass)
                .repl('{removeIcon}', config.removeIcon)
                .repl('{removeTitle}', config.removeTitle)
                .repl('{dataUrl}', vUrl)
                .repl('{dataKey}', vKey);
            if (showUpload) {
                btnUpload = self.getLayoutTemplate('actionUpload')
                    .repl('{uploadClass}', config.uploadClass)
                    .repl('{uploadIcon}', config.uploadIcon)
                    .repl('{uploadTitle}', config.uploadTitle);
            }
            return template
                .repl('{delete}', btnDelete)
                .repl('{upload}', btnUpload)
                .repl('{other}', otherButtons);
        },
        initPreview: function (isInit) {
            var self = this, cap = self.initialCaption || '', out;
            if (!previewCache.count(self.id)) {
                self.$preview.html('');
                if (isInit) {
                    self.setCaption(cap);
                } else {
                    self.initCaption();
                }
                return;
            }
            out = previewCache.out(self.id);
            cap = isInit && self.initialCaption ? self.initialCaption : out.caption;
            self.$preview.html(out.content);
            self.setCaption(cap);
            if (!isEmpty(out.content)) {
                self.$container.removeClass('file-input-new');
            }
        },
        initPreviewDeletes: function () {
            var self = this, deleteExtraData = self.deleteExtraData || {},
                resetProgress = function () {
                    if (self.$preview.find('.kv-file-remove').length === 0) {
                        self.reset();
                        self.initialCaption = '';
                    }
                };

            self.$preview.find('.kv-file-remove').each(function () {
                var $el = $(this), vUrl = $el.data('url') || self.deleteUrl, vKey = $el.data('key');
                if (isEmpty(vUrl) || vKey === undefined) {
                    return;
                }
                var $frame = $el.closest('.file-preview-frame'), cache = previewCache.data[self.id],
                    settings, params, index = $frame.data('fileindex'), config, extraData;
                index = parseInt(index.replace('init_', ''));
                config = isEmpty(cache.config) && isEmpty(cache.config[index]) ? null : cache.config[index];
                extraData = isEmpty(config) || isEmpty(config.extra) ? deleteExtraData : config.extra;
                if (typeof extraData === "function") {
                    extraData = extraData();
                }
                params = {id: $el.attr('id'), key: vKey, extra: extraData};
                settings = $.extend({
                    url: vUrl,
                    type: 'DELETE',
                    dataType: 'json',
                    data: $.extend({key: vKey}, extraData),
                    beforeSend: function (jqXHR) {
                        self.ajaxAborted = false;
                        self.raise('filepredelete', [vKey, jqXHR, extraData]);
                        if (self.ajaxAborted) {
                            jqXHR.abort();
                        } else {
                            addCss($frame, 'file-uploading');
                            addCss($el, 'disabled');
                        }
                    },
                    success: function (data, textStatus, jqXHR) {
                        var n, cap;
                        if (data === undefined || data.error === undefined) {
                            previewCache.unset(self.id, index);
                            n = previewCache.count(self.id);
                            cap = n > 0 ? self.getMsgSelected(n) : '';
                            self.raise('filedeleted', [vKey, jqXHR, extraData]);
                            self.setCaption(cap);
                        } else {
                            params.jqXHR = jqXHR;
                            params.response = data;
                            self.showError(data.error, params, 'filedeleteerror');
                            $frame.removeClass('file-uploading');
                            $el.removeClass('disabled');
                            resetProgress();
                            return;
                        }
                        $frame.removeClass('file-uploading').addClass('file-deleted');
                        $frame.fadeOut('slow', function () {
                            self.clearObjects($frame);
                            $frame.remove();
                            resetProgress();
                            if (!n && self.getFileStack().length === 0) {
                                self.setCaption('');
                                self.reset();
                            }
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        var errMsg = self.parseError(jqXHR, errorThrown);
                        params.jqXHR = jqXHR;
                        params.response = {};
                        self.showError(errMsg, params, 'filedeleteerror');
                        $frame.removeClass('file-uploading');
                        resetProgress();
                    }
                }, self.ajaxDeleteSettings);
                $el.off('click').on('click', function () {
                    $.ajax(settings);
                });
            });
        },
        clearObjects: function ($el) {
            $el.find('video audio').each(function () {
                this.pause();
                $(this).remove();
            });
            $el.find('img object div').each(function () {
                $(this).remove();
            });
        },
        clearFileInput: function () {
            var self = this, $el = self.$element, $srcFrm, $tmpFrm, $tmpEl;
            if (isEmpty($el.val())) {
                return;
            }
            // Fix for IE ver < 11, that does not clear file inputs
            // Requires a sequence of steps to prevent IE crashing but
            // still allow clearing of the file input.
            if (self.isIE9 || self.isIE10) {
                $srcFrm = $el.closest('form');
                $tmpFrm = $(document.createElement('form'));
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
            self.fileInputCleared = true;
        },
        resetUpload: function () {
            var self = this;
            self.uploadCache = {content: [], config: [], tags: [], append: true};
            self.uploadCount = 0;
            self.uploadPercent = 0;
            self.$btnUpload.removeAttr('disabled');
            self.setProgress(0);
            addCss(self.$progress, 'hide');
            self.resetErrors(false);
            self.ajaxAborted = false;
            self.ajaxRequests = [];
        },
        cancel: function () {
            var self = this, xhr = self.ajaxRequests, len = xhr.length, i;
            if (len > 0) {
                for (i = 0; i < len; i += 1) {
                    xhr[i].abort();
                }
            }
            self.getThumbs().each(function () {
                var $thumb = $(this), ind = $thumb.attr('data-fileindex');
                $thumb.removeClass('file-uploading');
                if (self.filestack[ind] !== undefined) {
                    $thumb.find('.kv-file-upload').removeClass('disabled').removeAttr('disabled');
                    $thumb.find('.kv-file-remove').removeClass('disabled').removeAttr('disabled');
                }
                self.unlock();
            });
        },
        clear: function () {
            var self = this, cap;
            self.$btnUpload.removeAttr('disabled');
            self.resetUpload();
            self.filestack = [];
            self.clearFileInput();
            self.resetErrors(true);
            self.raise('fileclear');
            if (!self.overwriteInitial && previewCache.count(self.id)) {
                self.showFileIcon();
                self.resetPreview();
                self.setEllipsis();
                self.initPreviewDeletes();
                self.$container.removeClass('file-input-new');
            } else {
                self.getThumbs().each(function () {
                    self.clearObjects($(this));
                });
                self.$preview.html('');
                cap = (!self.overwriteInitial && self.initialCaption.length > 0) ? self.initialCaption : '';
                self.setCaption(cap);
                self.setEllipsis();
                self.$caption.attr('title', '');
                addCss(self.$container, 'file-input-new');
            }
            if (self.$container.find('.file-preview-frame').length === 0) {
                if (!self.initCaption()) {
                    self.$captionContainer.find('.kv-caption-icon').hide();
                }
                self.setEllipsis();
            }
            self.hideFileIcon();
            self.raise('filecleared');
            self.$captionContainer.focus();
            self.setFileDropZoneTitle();
        },
        resetPreview: function () {
            var self = this, out;
            if (previewCache.count(self.id)) {
                out = previewCache.out(self.id);
                self.$preview.html(out.content);
                self.setCaption(out.caption);
            } else {
                self.$preview.html('');
                self.initCaption();
            }
        },
        reset: function () {
            var self = this;
            self.clear();
            self.resetPreview();
            self.setEllipsis();
            self.$container.find('.fileinput-filename').text('');
            self.raise('filereset');
            if (self.initialPreview.length > 0) {
                self.$container.removeClass('file-input-new');
            }
            self.setFileDropZoneTitle();
            self.filestack = [];
            self.formdata = {};
        },
        disable: function () {
            var self = this;
            self.isDisabled = true;
            self.raise('filedisabled');
            self.$element.attr('disabled', 'disabled');
            self.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .kv-fileinput-upload").attr("disabled", true);
            self.initDragDrop();
        },
        enable: function () {
            var self = this;
            self.isDisabled = false;
            self.raise('fileenabled');
            self.$element.removeAttr('disabled');
            self.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .kv-fileinput-upload").removeAttr("disabled");
            self.initDragDrop();
        },
        getThumbs: function (css) {
            css = css || '';
            return this.$preview.find('.file-preview-frame:not(.file-preview-initial)' + css);
        },
        getExtraData: function () {
            var self = this, data = self.uploadExtraData;
            if (typeof self.uploadExtraData === "function") {
                data = self.uploadExtraData();
            }
            return data;
        },
        uploadExtra: function () {
            var self = this, data = self.getExtraData();
            if (data.length === 0) {
                return;
            }
            $.each(data, function (key, value) {
                self.formdata.append(key, value);
            });
        },
        initXhr: function (xhrobj, factor) {
            var self = this;
            if (xhrobj.upload) {
                xhrobj.upload.addEventListener('progress', function (event) {
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
        ajaxSubmit: function (fnBefore, fnSuccess, fnComplete, fnError) {
            var self = this, settings;
            self.uploadExtra();
            settings = $.extend({
                xhr: function () {
                    var xhrobj = $.ajaxSettings.xhr();
                    return self.initXhr(xhrobj, 98);
                },
                url: self.uploadUrl,
                type: 'POST',
                dataType: 'json',
                data: self.formdata,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: fnBefore,
                success: fnSuccess,
                complete: fnComplete,
                error: fnError
            }, self.ajaxSettings);
            self.ajaxRequests.push($.ajax(settings));
        },
        initUploadSuccess: function (out, $thumb, allFiles) {
            var self = this, append, data, index, $newThumb, content, config, tags;
            if (typeof out !== 'object' || $.isEmptyObject(out)) {
                return;
            }
            if (out.initialPreview !== undefined && out.initialPreview.length > 0) {
                self.hasInitData = true;
                content = out.initialPreview || [];
                config = out.initialPreviewConfig || [];
                tags = out.initialPreviewThumbTags || [];
                append = out.append === undefined || out.append ? true : false;
                self.overwriteInitial = false;
                if ($thumb !== undefined && !allFiles) {
                    index = previewCache.add(self.id, content, config[0], tags[0], append);
                    data = previewCache.get(self.id, index, false);
                    $newThumb = $(data).hide();
                    $thumb.after($newThumb).fadeOut('slow', function () {
                        $newThumb.fadeIn('slow').css('display:inline-block');
                        self.initPreviewDeletes();
                        self.clearFileInput();
                    });
                } else {
                    if (allFiles) {
                        self.uploadCache.content.push(content[0]);
                        self.uploadCache.config.push(config[0]);
                        self.uploadCache.tags.push(tags[0]);
                        self.uploadCache.append = append;
                    } else {
                        previewCache.set(self.id, content, config, tags, append);
                        self.initPreview();
                        self.initPreviewDeletes();
                    }
                }
            }
        },
        uploadSingle: function (i, files, allFiles) {
            var self = this, total = self.getFileStack().length, formdata = new FormData(), outData,
                previewId = self.previewInitId + "-" + i, $thumb = $('#' + previewId + ':not(.file-preview-initial)'),
                pct, chkComplete, $btnUpload = $thumb.find('.kv-file-upload'), $btnDelete = $thumb.find('.kv-file-remove'),
                $indicator = $thumb.find('.file-upload-indicator'), config = self.fileActionSettings,
                hasPostData = self.filestack.length > 0 || !$.isEmptyObject(self.uploadExtraData),
                setIndicator, updateProgress, resetActions, fnBefore, fnSuccess, fnComplete, fnError,
                params = {id: previewId, index: i};
            self.formdata = formdata;
            if (total === 0 || !hasPostData || $btnUpload.hasClass('disabled') || self.abort(params)) {
                return;
            }
            chkComplete = function () {
                var $thumbs = self.getThumbs('.file-uploading');
                if ($thumbs.length > 0 || self.fileBatchCompleted) {
                    return;
                }
                self.fileBatchCompleted = true;
                setTimeout(function () {
                    previewCache.set(self.id, self.uploadCache.content, self.uploadCache.config, self.uploadCache.tags,
                        self.uploadCache.append);
                    if (self.hasInitData) {
                        self.initPreview();
                        self.initPreviewDeletes();
                    }
                    self.setProgress(100);
                    self.unlock();
                    self.clearFileInput();
                    self.raise('filebatchuploadcomplete', [self.filestack, self.getExtraData()]);
                }, 100);
            };
            setIndicator = function (icon, msg) {
                $indicator.html(config[icon]);
                $indicator.attr('title', config[msg]);
            };
            updateProgress = function () {
                if (!allFiles || total === 0 || self.uploadPercent >= 100) {
                    return;
                }
                self.uploadCount += 1;
                pct = 80 + Math.ceil(self.uploadCount * 20 / total);
                self.uploadPercent = Math.max(pct, self.uploadPercent);
                self.setProgress(self.uploadPercent);
                self.initPreviewDeletes();
            };
            resetActions = function () {
                $btnUpload.removeAttr('disabled');
                $btnDelete.removeAttr('disabled');
                $thumb.removeClass('file-uploading');
            };
            fnBefore = function (jqXHR) {
                outData = self.getOutData(jqXHR);
                setIndicator('indicatorLoading', 'indicatorLoadingTitle');
                addCss($thumb, 'file-uploading');
                $btnUpload.attr('disabled', true);
                $btnDelete.attr('disabled', true);
                if (!allFiles) {
                    self.lock();
                }
                self.raise('filepreupload', [outData, previewId, i]);
                params = $.extend(params, outData);
                if (self.abort(params)) {
                    jqXHR.abort();
                    self.setProgress(100);
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                outData = self.getOutData(jqXHR, data);
                params = $.extend(params, outData);
                setTimeout(function () {
                    if (data.error === undefined) {
                        setIndicator('indicatorSuccess', 'indicatorSuccessTitle');
                        $btnUpload.hide();
                        $btnDelete.hide();
                        self.filestack[i] = undefined;
                        self.raise('fileuploaded', [outData, previewId, i]);
                        self.initUploadSuccess(data, $thumb, allFiles);
                        if (!allFiles) {
                            self.resetFileStack();
                        }
                    } else {
                        setIndicator('indicatorError', 'indicatorErrorTitle');
                        self.showUploadError(data.error, params);
                    }
                }, 100);
            };
            fnComplete = function () {
                setTimeout(function () {
                    updateProgress();
                    resetActions();
                    if (!allFiles) {
                        self.unlock(false);
                    } else {
                        chkComplete();
                    }
                }, 100);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var errMsg = self.parseError(jqXHR, errorThrown, (allFiles ? files[i].name : null));
                setIndicator('indicatorError', 'indicatorErrorTitle');
                params = $.extend(params, self.getOutData(jqXHR));
                self.showUploadError(errMsg, params);
            };
            formdata.append(self.uploadFileAttr, files[i]);
            formdata.append('file_id', i);
            self.ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError);
        },
        uploadBatch: function () {
            var self = this, files = self.filestack, total = files.length, config,
                hasPostData = self.filestack.length > 0 || !$.isEmptyObject(self.uploadExtraData),
                setIndicator, setAllUploaded, enableActions, fnBefore, fnSuccess, fnComplete, fnError,
                params = {};
            self.formdata = new FormData();
            if (total === 0 || !hasPostData || self.abort(params)) {
                return;
            }
            config = self.fileActionSettings;
            setIndicator = function (i, icon, msg) {
                var $indicator = $('#' + self.previewInitId + "-" + i).find('.file-upload-indicator');
                $indicator.html(config[icon]);
                $indicator.attr('title', config[msg]);
            };
            enableActions = function (i) {
                var $thumb = $('#' + self.previewInitId + "-" + i + ':not(.file-preview-initial)'),
                    $btnUpload = $thumb.find('.kv-file-upload'),
                    $btnDelete = $thumb.find('.kv-file-delete');
                $thumb.removeClass('file-uploading');
                $btnUpload.removeAttr('disabled');
                $btnDelete.removeAttr('disabled');
            };
            setAllUploaded = function () {
                $.each(files, function (key) {
                    self.filestack[key] = undefined;
                });
                self.clearFileInput();
            };
            fnBefore = function (jqXHR) {
                self.lock();
                var outData = self.getOutData(jqXHR);
                if (self.showPreview) {
                    self.getThumbs().each(function () {
                        var $thumb = $(this), $btnUpload = $thumb.find('.kv-file-upload'), $btnDelete = $thumb.find('.kv-file-remove');
                        addCss($thumb, 'file-uploading');
                        $btnUpload.attr('disabled', true);
                        $btnDelete.attr('disabled', true);
                    });
                }
                self.raise('filebatchpreupload', [outData]);
                if (self.abort(outData)) {
                    jqXHR.abort();
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                var outData = self.getOutData(jqXHR, data), $thumbs = self.getThumbs(),
                    keys = isEmpty(data.errorkeys) ? [] : data.errorkeys;
                if (data.error === undefined || isEmpty(data.error)) {
                    self.raise('filebatchuploadsuccess', [outData]);
                    setAllUploaded();
                    if (self.showPreview) {
                        $thumbs.find('.kv-file-upload').hide();
                        $thumbs.find('.kv-file-remove').hide();
                        $thumbs.each(function () {
                            var $thumb = $(this), key = $thumb.attr('data-fileindex');
                            setIndicator(key, 'indicatorSuccess', 'indicatorSuccessTitle');
                            enableActions(key);
                        });
                        self.initUploadSuccess(data);
                    } else {
                        self.reset();
                    }
                } else {
                    if (self.showPreview) {
                        $thumbs.each(function () {
                            var $thumb = $(this), key = parseInt($thumb.attr('data-fileindex'), 10);
                            enableActions(key);
                            if (keys.length === 0) {
                                setIndicator(key, 'indicatorError', 'indicatorErrorTitle');
                                return;
                            }
                            if ($.inArray(key, keys) !== -1) {
                                setIndicator(key, 'indicatorError', 'indicatorErrorTitle');
                            } else {
                                $thumb.find('.kv-file-upload').hide();
                                $thumb.find('.kv-file-remove').hide();
                                setIndicator(key, 'indicatorSuccess', 'indicatorSuccessTitle');
                                self.filestack[key] = undefined;
                            }
                        });
                        self.initUploadSuccess(data);
                    }
                    self.showUploadError(data.error, outData, 'filebatchuploaderror');
                }
            };
            fnComplete = function () {
                self.setProgress(100);
                self.unlock();
                self.raise('filebatchuploadcomplete', [self.filestack, self.getExtraData()]);
                self.clearFileInput();
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var outData = self.getOutData(jqXHR), errMsg = self.parseError(jqXHR, errorThrown);
                self.showUploadError(errMsg, outData, 'filebatchuploaderror');
                self.uploadFileCount = total - 1;
                if (!self.showPreview) {
                    return;
                }
                self.getThumbs().each(function () {
                    var $thumb = $(this), key = $thumb.attr('data-fileindex');
                    $thumb.removeClass('file-uploading');
                    if (self.filestack[key] !== undefined) {
                        setIndicator(key, 'indicatorError', 'indicatorErrorTitle');
                    }
                });
                self.getThumbs().removeClass('file-uploading');
                self.getThumbs(' .kv-file-upload').removeAttr('disabled');
                self.getThumbs(' .kv-file-delete').removeAttr('disabled');
            };
            $.each(files, function (key, data) {
                if (!isEmpty(files[key])) {
                    self.formdata.append(self.uploadFileAttr, data);
                }
            });
            self.ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError);
        },
        uploadExtraOnly: function () {
            var self = this, params = {}, fnBefore, fnSuccess, fnComplete, fnError;
            self.formdata = new FormData();
            if (self.abort(params)) {
                return;
            }
            fnBefore = function (jqXHR) {
                self.lock();
                var outData = self.getOutData(jqXHR);
                self.raise('filebatchpreupload', [outData]);
                self.setProgress(50);
                params.data = outData;
                params.xhr = jqXHR;
                if (self.abort(params)) {
                    jqXHR.abort();
                    self.setProgress(100);
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                var outData = self.getOutData(jqXHR, data);
                if (data.error === undefined || isEmpty(data.error)) {
                    self.raise('filebatchuploadsuccess', [outData]);
                    self.clearFileInput();
                    self.initUploadSuccess(data);
                } else {
                    self.showUploadError(data.error, outData, 'filebatchuploaderror');
                }
            };
            fnComplete = function () {
                self.setProgress(100);
                self.unlock();
                self.raise('filebatchuploadcomplete', [self.filestack, self.getExtraData()]);
                self.clearFileInput();
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var outData = self.getOutData(jqXHR), errMsg = self.parseError(jqXHR, errorThrown);
                params.data = outData;
                self.showUploadError(errMsg, outData, 'filebatchuploaderror');
            };
            self.ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError);
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
        showFolderError: function (folders) {
            var self = this, $error = self.$errorContainer;
            if (!folders) {
                return;
            }
            $error.html(self.msgFoldersNotAllowed.repl('{n}', folders));
            $error.fadeIn(800);
            addCss(self.$container, 'has-error');
            self.raise('filefoldererror', [folders]);
        },
        showUploadError: function (msg, params, event) {
            var self = this, $error = self.$errorContainer, ev = event || 'fileuploaderror';
            if ($error.find('ul').length === 0) {
                $error.html('<ul><li>' + msg + '</li></ul>');
            } else {
                $error.find('ul').append('<li>' + msg + '</li>');
            }
            $error.fadeIn(800);
            self.raise(ev, [params]);
            addCss(self.$container, 'has-error');
            return true;
        },
        showError: function (msg, params, event) {
            var self = this, $error = self.$errorContainer, ev = event || 'fileerror';
            params = params || {};
            params.reader = self.reader;
            $error.html(msg);
            $error.fadeIn(800);
            self.raise(ev, [params]);
            if (!self.isUploadable) {
                self.clearFileInput();
            }
            addCss(self.$container, 'has-error');
            self.$btnUpload.attr('disabled', true);
            return true;
        },
        errorHandler: function (evt, caption) {
            var self = this, err = evt.target.error;
            switch (err.code) {
                case err.NOT_FOUND_ERR:
                    self.showError(self.msgFileNotFound.repl('{name}', caption));
                    break;
                case err.SECURITY_ERR:
                    self.showError(self.msgFileSecured.repl('{name}', caption));
                    break;
                case err.NOT_READABLE_ERR:
                    self.showError(self.msgFileNotReadable.repl('{name}', caption));
                    break;
                case err.ABORT_ERR:
                    self.showError(self.msgFilePreviewAborted.repl('{name}', caption));
                    break;
                default:
                    self.showError(self.msgFilePreviewError.repl('{name}', caption));
            }
        },
        parseFileType: function (file) {
            var self = this, isValid, vType, cat, i;
            for (i = 0; i < defaultPreviewTypes.length; i += 1) {
                cat = defaultPreviewTypes[i];
                isValid = isSet(cat, self.fileTypeSettings) ? self.fileTypeSettings[cat] : defaultFileTypeSettings[cat];
                vType = isValid(file.type, file.name) ? cat : '';
                if (!isEmpty(vType)) {
                    return vType;
                }
            }
            return 'other';
        },
        previewDefault: function (file, previewId, isDisabled) {
            if (!this.showPreview) {
                return;
            }
            var self = this, data = objUrl.createObjectURL(file), $obj = $('#' + previewId),
                config = self.previewSettings.other,
                footer = self.renderFileFooter(file.name, config.width),
                previewOtherTemplate = self.getPreviewTemplate('other'),
                ind = previewId.slice(previewId.lastIndexOf('-') + 1),
                frameClass = '';
            if (isDisabled === true) {
                frameClass = ' btn disabled';
                footer += '<div class="file-other-error text-danger"><i class="glyphicon glyphicon-exclamation-sign"></i></div>';
            }
            self.$preview.append("\n" + previewOtherTemplate
                .repl('{previewId}', previewId)
                .repl('{frameClass}', frameClass)
                .repl('{fileindex}', ind)
                .repl('{caption}', self.slug(file.name))
                .repl('{width}', config.width)
                .repl('{height}', config.height)
                .repl('{type}', file.type)
                .repl('{data}', data)
                .repl('{footer}', footer));
            $obj.on('load', function () {
                objUrl.revokeObjectURL($obj.attr('data'));
            });
        },
        previewFile: function (file, theFile, previewId, data) {
            if (!this.showPreview) {
                return;
            }
            var self = this, cat = self.parseFileType(file), caption = self.slug(file.name), content, strText,
                types = self.allowedPreviewTypes, mimes = self.allowedPreviewMimeTypes,
                tmplt = self.getPreviewTemplate(cat),
                config = isSet(cat, self.previewSettings) ? self.previewSettings[cat] : defaultPreviewSettings[cat],
                wrapLen = parseInt(self.wrapTextLength, 10), wrapInd = self.wrapIndicator,
                chkTypes = types.indexOf(cat) >= 0, id, height,
                chkMimes = isEmpty(mimes) || (!isEmpty(mimes) && mimes.indexOf(file.type) !== -1),
                footer = self.renderFileFooter(caption, config.width), modal = '',
                ind = previewId.slice(previewId.lastIndexOf('-') + 1);
            if (chkTypes && chkMimes) {
                if (cat === 'text') {
                    strText = htmlEncode(theFile.target.result);
                    objUrl.revokeObjectURL(data);
                    if (strText.length > wrapLen) {
                        id = 'text-' + uniqId();
                        height = window.innerHeight * 0.75;
                        modal = self.getLayoutTemplate('modal').repl('{id}', id)
                            .repl('{title}', caption)
                            .repl('{height}', height)
                            .repl('{body}', strText);
                        wrapInd = wrapInd
                            .repl('{title}', caption)
                            .repl('{dialog}', "$('#" + id + "').modal('show')");
                        strText = strText.substring(0, (wrapLen - 1)) + wrapInd;
                    }
                    content = tmplt.repl('{previewId}', previewId).repl('{caption}', caption)
                        .repl('{frameClass}', '')
                        .repl('{type}', file.type).repl('{width}', config.width)
                        .repl('{height}', config.height).repl('{data}', strText)
                        .repl('{footer}', footer).repl('{fileindex}', ind) + modal;
                } else {
                    content = tmplt.repl('{previewId}', previewId).repl('{caption}', caption)
                        .repl('{frameClass}', '')
                        .repl('{type}', file.type).repl('{data}', data)
                        .repl('{width}', config.width).repl('{height}', config.height)
                        .repl('{footer}', footer).repl('{fileindex}', ind);
                }
                self.$preview.append("\n" + content);
                self.autoSizeImage(previewId);
            } else {
                self.previewDefault(file, previewId);
            }
        },
        slugDefault: function (text) {
            return isEmpty(text) ? '' : text.split(/(\\|\/)/g).pop().replace(/[^\w\u00C0-\u017F\-.\\\/ ]+/g, '');
        },
        getFileStack: function () {
            var self = this;
            return self.filestack.filter(function (n) {
                return n !== undefined;
            });
        },
        readFiles: function (files) {
            this.reader = new FileReader();
            var self = this, $el = self.$element, $preview = self.$preview, reader = self.reader,
                $container = self.$previewContainer, $status = self.$previewStatus, msgLoading = self.msgLoading,
                msgProgress = self.msgProgress, previewInitId = self.previewInitId, numFiles = files.length,
                settings = self.fileTypeSettings, ctr = self.filestack.length,
                throwError = function (msg, file, previewId, index) {
                    var p1 = $.extend(self.getOutData({}, {}, files), {id: previewId, index: index}),
                        p2 = {id: previewId, index: index, file: file, files: files};
                    self.previewDefault(file, previewId, true);
                    return self.isUploadable ? self.showUploadError(msg, p1) : self.showError(msg, p2);
                };

            function readFile(i) {
                if (isEmpty($el.attr('multiple'))) {
                    numFiles = 1;
                }
                if (i >= numFiles) {
                    if (self.isUploadable && self.filestack.length > 0) {
                        self.raise('filebatchselected', [self.getFileStack()]);
                    } else {
                        self.raise('filebatchselected', [files]);
                    }
                    $container.removeClass('loading');
                    $status.html('');
                    return;
                }
                var node = ctr + i, previewId = previewInitId + "-" + node, isText, file = files[i],
                    caption = self.slug(file.name), fileSize = (file.size || 0) / 1000, checkFile, fileExtExpr = '',
                    previewData = objUrl.createObjectURL(file), fileCount = 0, j, msg, typ, chk,
                    fileTypes = self.allowedFileTypes, strTypes = isEmpty(fileTypes) ? '' : fileTypes.join(', '),
                    fileExt = self.allowedFileExtensions, strExt = isEmpty(fileExt) ? '' : fileExt.join(', ');
                if (!isEmpty(fileExt)) {
                    fileExtExpr = new RegExp('\\.(' + fileExt.join('|') + ')$', 'i');
                }
                fileSize = fileSize.toFixed(2);
                if (self.maxFileSize > 0 && fileSize > self.maxFileSize) {
                    msg = self.msgSizeTooLarge.repl('{name}', caption)
                        .repl('{size}', fileSize)
                        .repl('{maxSize}', self.maxFileSize);
                    self.isError = throwError(msg, file, previewId, i);
                    return;
                }
                if (!isEmpty(fileTypes) && isArray(fileTypes)) {
                    for (j = 0; j < fileTypes.length; j += 1) {
                        typ = fileTypes[j];
                        checkFile = settings[typ];
                        chk = (checkFile !== undefined && checkFile(file.type, caption));
                        fileCount += isEmpty(chk) ? 0 : chk.length;
                    }
                    if (fileCount === 0) {
                        msg = self.msgInvalidFileType.repl('{name}', caption).repl('{types}', strTypes);
                        self.isError = throwError(msg, file, previewId, i);
                        return;
                    }
                }
                if (fileCount === 0 && !isEmpty(fileExt) && isArray(fileExt) && !isEmpty(fileExtExpr)) {
                    chk = caption.match(fileExtExpr);
                    fileCount += isEmpty(chk) ? 0 : chk.length;
                    if (fileCount === 0) {
                        msg = self.msgInvalidFileExtension.repl('{name}', caption).repl('{extensions}',
                            strExt);
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
                if ($preview.length > 0 && FileReader !== undefined) {
                    $status.html(msgLoading.repl('{index}', i + 1).repl('{files}', numFiles));
                    $container.addClass('loading');
                    reader.onerror = function (evt) {
                        self.errorHandler(evt, caption);
                    };
                    reader.onload = function (theFile) {
                        self.previewFile(file, theFile, previewId, previewData);
                        self.initFileActions();
                    };
                    reader.onloadend = function () {
                        msg = msgProgress
                            .repl('{index}', i + 1).repl('{files}', numFiles)
                            .repl('{percent}', 50).repl('{name}', caption);
                        setTimeout(function () {
                            $status.html(msg);
                            objUrl.revokeObjectURL(previewData);
                        }, 100);
                        setTimeout(function () {
                            readFile(i + 1);
                            self.updateFileDetails(numFiles);
                        }, 100);
                        self.raise('fileloaded', [file, previewId, i, reader]);
                    };
                    reader.onprogress = function (data) {
                        if (data.lengthComputable) {
                            var fact = (data.loaded / data.total) * 100, progress = Math.ceil(fact);
                            msg = msgProgress.repl('{index}', i + 1).repl('{files}', numFiles)
                                .repl('{percent}', progress).repl('{name}', caption);
                            setTimeout(function () {
                                $status.html(msg);
                            }, 100);
                        }
                    };
                    isText = isSet('text', settings) ? settings.text : defaultFileTypeSettings.text;
                    if (isText(file.type, caption)) {
                        reader.readAsText(file, self.textEncoding);
                    } else {
                        reader.readAsArrayBuffer(file);
                    }
                } else {
                    self.previewDefault(file, previewId);
                    setTimeout(function () {
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
        updateFileDetails: function (numFiles) {
            var self = this, $el = self.$element, fileStack = self.getFileStack(),
                name = $el.val() || (fileStack.length && fileStack[0].name) || '', label = self.slug(name),
                n = self.isUploadable ? fileStack.length : numFiles,
                nFiles = previewCache.count(self.id) + n,
                log = n > 1 ? self.getMsgSelected(nFiles) : label;
            if (self.isError) {
                self.$previewContainer.removeClass('loading');
                self.$previewStatus.html('');
                self.$captionContainer.find('.kv-caption-icon').hide();
            } else {
                self.showFileIcon();
            }
            self.setCaption(log, self.isError);
            self.$container.removeClass('file-input-new file-input-ajax-new');
            if (arguments.length === 1) {
                self.raise('fileselect', [numFiles, label]);
            }
            if (previewCache.count(self.id)) {
                self.initPreviewDeletes();
            }
        },
        change: function (e) {
            var self = this, $el = self.$element;
            if (!self.isUploadable && isEmpty($el.val()) && self.fileInputCleared) { // IE 11 fix
                self.fileInputCleared = false;
                return;
            }
            self.fileInputCleared = false;
            var tfiles, msg, total, $preview = self.$preview, isDragDrop = arguments.length > 1,
                files = isDragDrop ? e.originalEvent.dataTransfer.files : $el.get(0).files,
                isSingleUpload = isEmpty($el.attr('multiple')), i = 0, f, m, folders = 0,
                ctr = self.filestack.length, isAjaxUpload = self.isUploadable,
                throwError = function (mesg, file, previewId, index) {
                    var p1 = $.extend(self.getOutData({}, {}, files), {id: previewId, index: index}),
                        p2 = {id: previewId, index: index, file: file, files: files};
                    return self.isUploadable ? self.showUploadError(mesg, p1) : self.showError(mesg, p2);
                };
            self.reader = null;
            self.resetUpload();
            self.hideFileIcon();
            if (self.isUploadable) {
                self.$container.find('.file-drop-zone .' + self.dropZoneTitleClass).remove();
            }
            if (isDragDrop) {
                tfiles = [];
                while (files[i]) {
                    f = files[i];
                    if (!f.type && f.size % 4096 === 0) {
                        folders++;
                    } else {
                        tfiles.push(f);
                    }
                    i++;
                }
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
                    self.clear();
                }
                self.showFolderError(folders);
                self.raise('fileselectnone');
                return;
            }
            self.resetErrors();
            if (!isAjaxUpload || (isSingleUpload && ctr > 0)) {
                if (!self.overwriteInitial && previewCache.count(self.id)) {
                    var out = previewCache.out(self.id);
                    $preview.html(out.content);
                    self.setCaption(out.caption);
                    self.initPreviewDeletes();
                } else {
                    $preview.html('');
                }

                if (isSingleUpload && ctr > 0) {
                    self.filestack = [];
                }
            }
            total = self.isUploadable ? self.getFileStack().length + tfiles.length : tfiles.length;
            if (self.maxFileCount > 0 && total > self.maxFileCount) {
                msg = self.msgFilesTooMany.repl('{m}', self.maxFileCount).repl('{n}', total);
                self.isError = throwError(msg, null, null, null);
                self.$captionContainer.find('.kv-caption-icon').hide();
                self.$caption.html(self.msgValidationError);
                self.setEllipsis();
                self.$container.removeClass('file-input-new file-input-ajax-new');
                return;
            }
            if (!self.isIE9) {
                self.readFiles(tfiles);
            } else {
                self.updateFileDetails(1);
            }
            self.showFolderError(folders);
        },
        autoSizeImage: function (previewId) {
            var self = this, $preview = self.$preview,
                $thumb = $preview.find("#" + previewId),
                $img = $thumb.find('img'), w1, w2, $cap;
            if (!$img.length) {
                return;
            }
            $img.on('load', function () {
                w1 = $thumb.width();
                w2 = $preview.width();
                if (w1 > w2) {
                    $img.css('width', '100%');
                    $thumb.css('width', '97%');
                }
                $cap = $img.closest('.file-preview-frame').find('.file-caption-name');
                if ($cap.length) {
                    $cap.width($img.width());
                    $cap.attr('title', $cap.text());
                }
                self.raise('fileimageloaded', previewId);
            });
        },
        initCaption: function () {
            var self = this, cap = self.initialCaption || '';
            if (self.overwriteInitial || isEmpty(cap)) {
                self.$caption.html('');
                return false;
            }
            self.setCaption(cap);
            return true;
        },
        setCaption: function (content, isError) {
            var self = this, err = isError || false, title, out;
            if (err) {
                title = $('<div>' + self.msgValidationError + '</div>').text();
                out = '<span class="' + self.msgValidationErrorClass + '">' +
                self.msgValidationErrorIcon + title + '</span>';
            } else {
                if (isEmpty(content) || self.$caption.length === 0) {
                    return;
                }
                title = $('<div>' + content + '</div>').text();
                out = self.getLayoutTemplate('icon') + title;
            }
            self.$caption.html(out);
            self.$caption.attr('title', title);
            self.$captionContainer.find('.file-caption-ellipsis').attr('title', title);
            self.setEllipsis();
        },
        initBrowse: function ($container) {
            var self = this;
            self.$btnFile = $container.find('.btn-file');
            self.$btnFile.append(self.$element);
        },
        createContainer: function () {
            var self = this,
                $container = $(document.createElement("span"))
                    .attr({"class": 'file-input file-input-new'})
                    .html(self.renderMain());
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
            var self = this, dropCss = (self.isUploadable && self.dropZoneEnabled) ? ' file-drop-zone' : '',
                preview = self.showPreview ? self.getLayoutTemplate('preview').repl('{class}', self.previewClass)
                    .repl('{dropClass}', dropCss) : '',
                css = self.isDisabled ? self.captionClass + ' file-caption-disabled' : self.captionClass,
                caption = self.captionTemplate.repl('{class}', css + ' kv-fileinput-caption');
            return self.mainTemplate.repl('{class}', self.mainClass)
                .repl('{preview}', preview)
                .repl('{caption}', caption)
                .repl('{upload}', self.renderUpload())
                .repl('{remove}', self.renderRemove())
                .repl('{cancel}', self.renderCancel())
                .repl('{browse}', self.renderBrowse());
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
            var self = this, css = self.cancelClass + ' fileinput-cancel fileinput-cancel-button';
            if (!self.showCancel) {
                return '';
            }
            return '<button type="button" title="' + self.cancelTitle + '" class="hide ' + css + '">' + self.cancelIcon + self.cancelLabel + '</button>';
        },
        renderUpload: function () {
            var self = this, css = self.uploadClass + ' kv-fileinput-upload fileinput-upload-button', content = '', status = '';
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
    };

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
                data = new FileInput(this, $.extend({}, $.fn.fileinput.defaults, options, $(this).data()));
                $this.data('fileinput', data);
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
        mainClass: '',
        previewClass: '',
        captionClass: '',
        mainTemplate: null,
        initialCaption: '',
        initialPreview: [],
        initialPreviewDelimiter: '*$$*',
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: true,
        deleteUrl: '',
        deleteExtraData: {},
        overwriteInitial: true,
        layoutTemplates: defaultLayoutTemplates,
        previewTemplates: defaultPreviewTemplates,
        allowedPreviewTypes: defaultPreviewTypes,
        allowedPreviewMimeTypes: null,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewSettings: defaultPreviewSettings,
        fileTypeSettings: defaultFileTypeSettings,
        previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i> &nbsp;',
        browseClass: 'btn btn-primary',
        removeIcon: '<i class="glyphicon glyphicon-trash"></i> ',
        removeClass: 'btn btn-default',
        cancelIcon: '<i class="glyphicon glyphicon-ban-circle"></i> ',
        cancelClass: 'btn btn-default',
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i> ',
        uploadClass: 'btn btn-default',
        uploadUrl: null,
        uploadAsync: true,
        uploadExtraData: {},
        maxFileSize: 0,
        minFileCount: 0,
        maxFileCount: 0,
        msgValidationErrorClass: 'text-danger',
        msgValidationErrorIcon: '<i class="glyphicon glyphicon-exclamation-sign"></i> ',
        msgErrorClass: 'file-error-message',
        progressClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressCompleteClass: "progress-bar progress-bar-success",
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
        dropZoneTitleClass: 'file-drop-zone-title',
        fileActionSettings: {},
        otherActionButtons: '',
        textEncoding: 'UTF-8',
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: true
    };

    $.fn.fileinput.locales = {};

    $.fn.fileinput.locales.en = {
        fileSingle: 'file',
        filePlural: 'files',
        browseLabel: 'Browse &hellip;',
        removeLabel: 'Remove',
        removeTitle: 'Clear selected files',
        cancelLabel: 'Cancel',
        cancelTitle: 'Abort ongoing upload',
        uploadLabel: 'Upload',
        uploadTitle: 'Upload selected files',
        msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>. Please retry your upload!',
        msgFilesTooLess: 'You must select at least <b>{n}</b> {files} to upload. Please retry your upload!',
        msgFilesTooMany: 'Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>. Please retry your upload!',
        msgFileNotFound: 'File "{name}" not found!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
        msgValidationError: 'File Upload Error',
        msgLoading: 'Loading file {index} of {files} &hellip;',
        msgProgress: 'Loading file {index} of {files} - {name} - {percent}% completed.',
        msgSelected: '{n} {files} selected',
        msgFoldersNotAllowed: 'Drag & drop files only! {n} folder(s) dropped were skipped.',
        dropZoneTitle: 'Drag & drop files here &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.en);

    $.fn.fileinput.Constructor = FileInput;

    /**
     * Convert automatically file inputs with class 'file'
     * into a bootstrap fileinput control.
     */
    $(document).ready(function () {
        var $input = $('input.file[type=file]'), count = $input.attr('type') ? $input.length : 0;
        if (count > 0) {
            $input.fileinput();
        }
    });
})(window.jQuery);