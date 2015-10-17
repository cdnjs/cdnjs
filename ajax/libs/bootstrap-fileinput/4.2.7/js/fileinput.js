/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2015
 * @version 4.2.7
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

    $.fn.fileinputLocales = {};

    var isIE, isEdge, handler, previewCache, getNum, hasFileAPISupport, hasDragDropSupport, hasFileUploadSupport, addCss,
        STYLE_SETTING, OBJECT_PARAMS, DEFAULT_PREVIEW, defaultFileActionSettings, tMain1, tMain2, tPreview, tIcon, tClose,
        tCaption, tBtnDefault, tBtnLink, tBtnBrowse, tModal, tProgress, tFooter, tActions, tActionDelete, tActionUpload,
        tZoom, tGeneric, tHtml, tImage, tText, tVideo, tAudio, tFlash, tObject, tOther, defaultLayoutTemplates,
        defaultPreviewTemplates, defaultPreviewTypes, defaultPreviewSettings, defaultFileTypeSettings, isEmpty, isArray,
        isSet, getElement, uniqId, htmlEncode, replaceTags, objUrl, FileInput;

    isIE = function (ver) {
        // check for IE versions < 11
        if (navigator.appName !== 'Microsoft Internet Explorer') {
            return false;
        }
        if (ver === 10) {
            return new RegExp('msie\\s' + ver, 'i').test(navigator.userAgent);
        }
        var div = document.createElement("div"), status;
        div.innerHTML = "<!--[if IE " + ver + "]> <i></i> <![endif]-->";
        status = div.getElementsByTagName("i").length;
        document.body.appendChild(div);
        div.parentNode.removeChild(div);
        return status;
    };
    isEdge = function () {
        return new RegExp('Edge\/[0-9]+', 'i').test(navigator.userAgent);
    };
    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event + '.fileinput';
        $el.off(ev).on(ev, callback);
    };
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
                footer: obj.getLayoutTemplate('footer').replace(/\{progress}/g, obj.renderThumbProgress()),
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
            var ind = 'init_' + i, data = previewCache.data[id], config = data.config[i],
                previewId = data.initId + '-' + ind, out, $tmp, frameClass = ' file-preview-initial';
            /** @namespace config.frameClass */
            /** @namespace config.frameAttr */
            isDisabled = isDisabled === undefined ? true : isDisabled;
            if (data.content[i] === null) {
                return '';
            }
            if (!isEmpty(config) && !isEmpty(config.frameClass)) {
                frameClass += ' ' + config.frameClass;
            }
            out = data.template
                .replace(/\{previewId}/g, previewId)
                .replace(/\{frameClass}/g, frameClass)
                .replace(/\{fileindex}/g, ind)
                .replace(/\{content}/g, data.content[i])
                .replace(/\{footer}/g, previewCache.footer(id, i, isDisabled));
            if (data.tags.length && data.tags[i]) {
                out = replaceTags(out, data.tags[i]);
            }
            if (!isEmpty(config) && !isEmpty(config.frameAttr)) {
                $tmp = $(document.createElement('div')).html(out);
                $tmp.find('.file-preview-initial').attr(config.frameAttr);
                out = $tmp.html();
                $tmp.remove();
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
            var data = $.extend(true, {}, previewCache.data[id]), i, chk;
            if (!content || !content.length) {
                return;
            }
            if (!isArray(content)) {
                content = content.split(data.delimiter);
            }
            chk = content.filter(function (n) {
                return n !== null;
            });
            if (!chk.length) {
                return;
            }
            if (data.content === undefined) {
                data.content = [];
            }
            if (data.config === undefined) {
                data.config = [];
            }
            if (data.tags === undefined) {
                data.tags = [];
            }
            if (append) {
                for (i = 0; i < content.length; i++) {
                    if (content[i]) {
                        data.content.push(content[i]);
                    }
                }
                for (i = 0; i < config.length; i++) {
                    if (config[i]) {
                        data.config.push(config[i]);
                    }
                }
                for (i = 0; i < tags.length; i++) {
                    if (tags[i]) {
                        data.tags.push(tags[i]);
                    }
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
                footer = data.footer.replace(/\{actions}/g, actions);
            return footer.replace(/\{caption}/g, caption)
                .replace(/\{width}/g, width)
                .replace(/\{indicator}/g, '')
                .replace(/\{indicatorTitle}/g, '');
        }
    };
    getNum = function (num, def) {
        def = def || 0;
        if (typeof num === "number") {
            return num;
        }
        if (typeof num === "string") {
            num = parseFloat(num);
        }
        return isNaN(num) ? def : num;
    };
    hasFileAPISupport = function () {
        return window.File && window.FileReader;
    };
    hasDragDropSupport = function () {
        var div = document.createElement('div');
        /** @namespace div.draggable */
        /** @namespace div.ondragstart */
        /** @namespace div.ondrop */
        return !isIE(9) && !isEdge() && // Fix for MS Edge drag & drop support bug
        (div.draggable !== undefined || (div.ondragstart !== undefined && div.ondrop !== undefined));
    };
    hasFileUploadSupport = function () {
        return hasFileAPISupport() && window.FormData;
    };
    addCss = function ($el, css) {
        $el.removeClass(css).addClass(css);
    };
    STYLE_SETTING = 'style="width:{width};height:{height};"';
    OBJECT_PARAMS = '      <param name="controller" value="true" />\n' +
    '      <param name="allowFullScreen" value="true" />\n' +
    '      <param name="allowScriptAccess" value="always" />\n' +
    '      <param name="autoPlay" value="false" />\n' +
    '      <param name="autoStart" value="false" />\n' +
    '      <param name="quality" value="high" />\n';
    DEFAULT_PREVIEW = '<div class="file-preview-other">\n' +
    '   <span class="{previewFileIconClass}">{previewFileIcon}</span>\n' +
    '</div>';
    defaultFileActionSettings = {
        removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>',
        removeClass: 'btn btn-xs btn-default',
        removeTitle: 'Remove file',
        uploadIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
        uploadClass: 'btn btn-xs btn-default',
        uploadTitle: 'Upload file',
        indicatorNew: '<i class="glyphicon glyphicon-hand-down text-warning"></i>',
        indicatorSuccess: '<i class="glyphicon glyphicon-ok-sign text-success"></i>',
        indicatorError: '<i class="glyphicon glyphicon-exclamation-sign text-danger"></i>',
        indicatorLoading: '<i class="glyphicon glyphicon-hand-up text-muted"></i>',
        indicatorNewTitle: 'Not uploaded yet',
        indicatorSuccessTitle: 'Uploaded',
        indicatorErrorTitle: 'Upload Error',
        indicatorLoadingTitle: 'Uploading ...'
    };
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
    '</div>';
    tMain2 = '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n';
    tPreview = '<div class="file-preview {class}">\n' +
    '    {close}' +
    '    <div class="{dropClass}">\n' +
    '    <div class="file-preview-thumbnails">\n' +
    '    </div>\n' +
    '    <div class="clearfix"></div>' +
    '    <div class="file-preview-status text-center text-success"></div>\n' +
    '    <div class="kv-fileinput-error"></div>\n' +
    '    </div>\n' +
    '</div>';
    tClose = '<div class="close fileinput-remove">&times;</div>\n';
    tIcon = '<span class="glyphicon glyphicon-file kv-caption-icon"></span>';
    tCaption = '<div tabindex="500" class="form-control file-caption {class}">\n' +
    '   <div class="file-caption-name"></div>\n' +
    '</div>\n';
    tBtnDefault = '<button type="{type}" tabindex="500" title="{title}" class="{css}"{status}>{icon}{label}</button>';
    tBtnLink = '<a href="{href}" tabindex="500" title="{title}" class="{css}"{status}>{icon}{label}</a>';
    tBtnBrowse = '<div tabindex="500" class="{css}"{status}>{icon}{label}</div>';
    tModal = '<div id="{id}" class="file-preview-detail-modal modal fade" tabindex="-1">\n' +
    '  <div class="modal-dialog modal-lg">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n' +
    '        <h3 class="modal-title">{heading} <small>{title}</small></h3>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '           <pre>{body}</pre>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>';
    tProgress = '<div class="progress">\n' +
    '    <div class="{class}" role="progressbar"' +
    ' aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
    '        {percent}%\n' +
    '     </div>\n' +
    '</div>';
    tFooter = '<div class="file-thumbnail-footer">\n' +
    '    <div class="file-footer-caption" title="{caption}">{caption}</div>\n' +
    '    {progress} {actions}\n' +
    '</div>';
    tActions = '<div class="file-actions">\n' +
    '    <div class="file-footer-buttons">\n' +
    '        {upload}{delete}{other}' +
    '    </div>\n' +
    '    <div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>\n' +
    '    <div class="clearfix"></div>\n' +
    '</div>';
    tActionDelete = '<button type="button" class="kv-file-remove {removeClass}" ' +
    'title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n';
    tActionUpload = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">' +
    '   {uploadIcon}\n</button>\n';
    tZoom = '<button type="button" class="btn btn-default btn-xs btn-block" title="{zoomTitle}: {caption}" onclick="{dialog}">\n' +
    '   {zoomInd}\n' +
    '</button>\n';
    tGeneric = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
    '   {content}\n' +
    '   {footer}\n' +
    '</div>\n';
    tHtml = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
    '    <object class="file-object" data="{data}" type="{type}" width="{width}" height="{height}">\n' +
    '       ' + DEFAULT_PREVIEW + '\n' +
    '    </object>\n' +
    '   {footer}\n' +
    '</div>';
    tImage = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
    '   <img src="{data}" class="file-preview-image" title="{caption}" alt="{caption}" ' + STYLE_SETTING + '>\n' +
    '   {footer}\n' +
    '</div>\n';
    tText = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
    '   <pre class="file-preview-text" title="{caption}" ' + STYLE_SETTING + '>{data}</pre>\n' +
    '   {zoom}\n' +
    '   {footer}\n' +
    '</div>';
    tVideo = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
    ' title="{caption}" ' + STYLE_SETTING + '>\n' +
    '   <video width="{width}" height="{height}" controls>\n' +
    '       <source src="{data}" type="{type}">\n' +
    '       ' + DEFAULT_PREVIEW + '\n' +
    '   </video>\n' +
    '   {footer}\n' +
    '</div>\n';
    tAudio = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
    ' title="{caption}" ' + STYLE_SETTING + '>\n' +
    '   <audio controls>\n' +
    '       <source src="' + '{data}' + '" type="{type}">\n' +
    '       ' + DEFAULT_PREVIEW + '\n' +
    '   </audio>\n' +
    '   {footer}\n' +
    '</div>';
    tFlash = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
    ' title="{caption}" ' + STYLE_SETTING + '>\n' +
    '   <object class="file-object" type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' +
    OBJECT_PARAMS + '       ' + DEFAULT_PREVIEW + '\n' +
    '   </object>\n' +
    '   {footer}\n' +
    '</div>\n';
    tObject = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
    ' title="{caption}" ' + STYLE_SETTING + '>\n' +
    '   <object class="file-object" data="{data}" type="{type}" width="{width}" height="{height}">\n' +
    '       <param name="movie" value="{caption}" />\n' +
    OBJECT_PARAMS + '         ' + DEFAULT_PREVIEW + '\n' +
    '   </object>\n' +
    '   {footer}\n' +
    '</div>';
    tOther = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
    ' title="{caption}" ' + STYLE_SETTING + '>\n' +
    '   <div class="file-preview-other-frame">\n' +
    '   ' + DEFAULT_PREVIEW + '\n' +
    '   </div>\n' +
    '   <div class="file-preview-other-footer">{footer}</div>\n' +
    '</div>';
    defaultLayoutTemplates = {
        main1: tMain1,
        main2: tMain2,
        preview: tPreview,
        close: tClose,
        zoom: tZoom,
        icon: tIcon,
        caption: tCaption,
        modal: tModal,
        progress: tProgress,
        footer: tFooter,
        actions: tActions,
        actionDelete: tActionDelete,
        actionUpload: tActionUpload,
        btnDefault: tBtnDefault,
        btnLink: tBtnLink,
        btnBrowse: tBtnBrowse
    };
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
    };
    defaultPreviewTypes = ['image', 'html', 'text', 'video', 'audio', 'flash', 'object'];
    defaultPreviewSettings = {
        image: {width: "auto", height: "160px"},
        html: {width: "213px", height: "160px"},
        text: {width: "160px", height: "136px"},
        video: {width: "213px", height: "160px"},
        audio: {width: "213px", height: "80px"},
        flash: {width: "213px", height: "160px"},
        object: {width: "160px", height: "160px"},
        other: {width: "160px", height: "160px"}
    };
    defaultFileTypeSettings = {
        image: function (vType, vName) {
            return (vType !== undefined) ? vType.match('image.*') : vName.match(/\.(gif|png|jpe?g)$/i);
        },
        html: function (vType, vName) {
            return (vType !== undefined) ? vType === 'text/html' : vName.match(/\.(htm|html)$/i);
        },
        text: function (vType, vName) {
            return (vType !== undefined && vType.match('text.*')) || vName.match(/\.(txt|md|csv|nfo|ini|json|php|js|css)$/i);
        },
        video: function (vType, vName) {
            return (vType !== undefined && vType.match(/\.video\/(ogg|mp4|webm|3gp)$/i)) || vName.match(/\.(og?|mp4|webm|3gp)$/i);
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
    };
    isEmpty = function (value, trim) {
        return value === undefined || value === null || value.length === 0 || (trim && $.trim(value) === '');
    };
    isArray = function (a) {
        return Array.isArray(a) || Object.prototype.toString.call(a) === '[object Array]';
    };
    isSet = function (needle, haystack) {
        return (typeof haystack === 'object' && needle in haystack);
    };
    getElement = function (options, param, value) {
        return (isEmpty(options) || isEmpty(options[param])) ? value : $(options[param]);
    };
    uniqId = function () {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    };
    htmlEncode = function (str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };
    replaceTags = function (str, tags) {
        var out = str;
        if (!tags) {
            return out;
        }
        $.each(tags, function (key, value) {
            if (typeof value === "function") {
                value = value();
            }
            out = out.split(key).join(value);
        });
        return out;
    };
    objUrl = window.URL || window.webkitURL;
    FileInput = function (element, options) {
        var self = this;
        self.$element = $(element);
        if (!self.validate()) {
            return;
        }
        self.isPreviewable = hasFileAPISupport();
        self.isIE9 = isIE(9);
        self.isIE10 = isIE(10);
        if (self.isPreviewable || self.isIE9) {
            self.init(options);
            self.listen();
        } else {
            self.$element.removeClass('file-loading');
        }
    };

    FileInput.prototype = {
        constructor: FileInput,
        validate: function () {
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
                switch (key) {
                    case 'minFileCount':
                    case 'maxFileCount':
                    case 'maxFileSize':
                        self[key] = getNum(value);
                        break;
                    default:
                        self[key] = value;
                        break;
                }
            });
            self.fileInputCleared = false;
            self.fileBatchCompleted = true;
            if (!self.isPreviewable) {
                self.showPreview = false;
            }
            self.uploadFileAttr = !isEmpty($el.attr('name')) ? $el.attr('name') : 'file_data';
            self.reader = null;
            self.formdata = {};
            self.clearStack();
            self.uploadCount = 0;
            self.uploadStatus = {};
            self.uploadLog = [];
            self.uploadAsyncCount = 0;
            self.loadedImages = [];
            self.totalImagesCount = 0;
            self.ajaxRequests = [];
            self.isError = false;
            self.ajaxAborted = false;
            self.cancelling = false;
            t = self.getLayoutTemplate('progress');
            self.progressTemplate = t.replace('{class}', self.progressClass);
            self.progressCompleteTemplate = t.replace('{class}', self.progressCompleteClass);
            self.dropZoneEnabled = hasDragDropSupport() && self.dropZoneEnabled;
            self.isDisabled = self.$element.attr('disabled') || self.$element.attr('readonly');
            self.isUploadable = hasFileUploadSupport() && !isEmpty(self.uploadUrl);
            self.slug = typeof options.slugCallback === "function" ? options.slugCallback : self.slugDefault;
            self.mainTemplate = self.showCaption ? self.getLayoutTemplate('main1') : self.getLayoutTemplate('main2');
            self.captionTemplate = self.getLayoutTemplate('caption');
            self.previewGenericTemplate = self.getPreviewTemplate('generic');
            if (self.resizeImage && (self.maxImageWidth || self.maxImageHeight)) {
                self.imageCanvas = document.createElement('canvas');
                self.imageCanvasContext = self.imageCanvas.getContext('2d');
            }
            if (isEmpty(self.$element.attr('id'))) {
                self.$element.attr('id', uniqId());
            }
            if (self.$container === undefined) {
                self.$container = self.createContainer();
            } else {
                self.refreshContainer();
            }
            self.$progress = self.$container.find('.kv-upload-progress');
            self.$btnUpload = self.$container.find('.fileinput-upload');
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
            self.$element.removeClass('file-loading');
            if (self.$element.attr('disabled')) {
                self.disable();
            }
        },
        parseError: function (jqXHR, errorThrown, fileName) {
            var self = this, errMsg = $.trim(errorThrown + ''),
                dot = errMsg.slice(-1) === '.' ? '' : '.',
                text = jqXHR.responseJSON !== undefined && jqXHR.responseJSON.error !== undefined ?
                    jqXHR.responseJSON.error : jqXHR.responseText;
            if (self.cancelling && self.msgUploadAborted) {
                errMsg = self.msgUploadAborted;
            }
            if (self.showAjaxErrorDetails && text) {
                text = $.trim(text.replace(/\n\s*\n/g, '\n'));
                text = text.length > 0 ? '<pre>' + text + '</pre>' : '';
                errMsg += dot + text;
            } else {
                errMsg += dot;
            }
            self.cancelling = false;
            return fileName ? '<b>' + fileName + ': </b>' + errMsg : errMsg;
        },
        raise: function (event, params) {
            var self = this, e = $.Event(event);
            if (params !== undefined) {
                self.$element.trigger(e, params);
            } else {
                self.$element.trigger(e);
            }
            if (e.isDefaultPrevented()) {
                return false;
            }
            if (!e.result) {
                return e.result;
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
                case 'filesuccessremove':
                    break;
                // receive data response via `filecustomerror` event`
                default:
                    self.ajaxAborted = e.result;
                    break;
            }
            return true;
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
            if (isEmpty(self.customPreviewTags)) {
                return template;
            }
            return replaceTags(template, self.customPreviewTags);
        },
        parseFilePreviewIcon: function (content, fname) {
            var self = this, ext, icn = self.previewFileIcon;
            if (fname && fname.indexOf('.') > -1) {
                ext = fname.split('.').pop();
                if (self.previewFileIconSettings && self.previewFileIconSettings[ext]) {
                    icn = self.previewFileIconSettings[ext];
                }
                if (self.previewFileExtSettings) {
                    $.each(self.previewFileExtSettings, function (key, func) {
                        if (self.previewFileIconSettings[key] && func(ext)) {
                            icn = self.previewFileIconSettings[key];
                        }
                    });
                }
            }
            if (content.indexOf('{previewFileIcon}') > -1) {
                return content.replace(/\{previewFileIconClass}/g, self.previewFileIconClass).replace(/\{previewFileIcon}/g, icn);
            }
            return content;
        },
        getOutData: function (jqXHR, responseData, filesData) {
            var self = this;
            jqXHR = jqXHR || {};
            responseData = responseData || {};
            filesData = filesData || self.filestack.slice(0) || {};
            return {
                form: self.formdata,
                files: filesData,
                filenames: self.filenames,
                extra: self.getExtraData(),
                response: responseData,
                reader: self.reader,
                jqXHR: jqXHR
            };
        },
        listen: function () {
            var self = this, $el = self.$element, $cap = self.$captionContainer, $btnFile = self.$btnFile,
                $form = $el.closest('form'), $cont = self.$container;
            handler($el, 'change', $.proxy(self.change, self));
            handler($btnFile, 'click', function () {
                self.raise('filebrowse');
                if (self.isError && !self.isUploadable) {
                    self.clear();
                }
                $cap.focus();
            });
            handler($form, 'reset', $.proxy(self.reset, self));
            handler($cont.find('.fileinput-remove:not([disabled])'), 'click', $.proxy(self.clear, self));
            handler($cont.find('.fileinput-cancel'), 'click', $.proxy(self.cancel, self));
            if (self.isUploadable && self.dropZoneEnabled && self.showPreview) {
                self.initDragDrop();
            }
            if (!self.isUploadable) {
                handler($form, 'submit', $.proxy(self.submitForm, self));
            }
            handler(self.$container.find('.fileinput-upload'), 'click', function (e) {
                var $btn = $(this), $form, isEnabled = !$btn.hasClass('disabled') && isEmpty($btn.attr('disabled'));
                if (!self.isUploadable) {
                    if (isEnabled && $btn.attr('type') !== 'submit') {
                        $form = $btn.closest('form');
                        // downgrade to normal form submit if possible
                        if ($form.length) {
                            $form.trigger('submit');
                        }
                        e.preventDefault();
                    }
                    return;
                }
                e.preventDefault();
                if (isEnabled) {
                    self.upload();
                }
            });
        },
        submitForm: function () {
            var self = this, $el = self.$element, files = $el.get(0).files;
            if (files && self.minFileCount > 0 && self.getFileCount(files.length) < self.minFileCount) {
                self.noFilesError({});
                return false;
            }
            return !self.abort({});
        },
        abort: function (params) {
            var self = this, data;
            if (self.ajaxAborted && typeof self.ajaxAborted === "object" && self.ajaxAborted.message !== undefined) {
                data = $.extend(self.getOutData(), params);
                data.abortData = self.ajaxAborted.data || {};
                data.abortMessage = self.ajaxAborted.message;
                self.cancel();
                self.setProgress(100);
                self.showUploadError(self.ajaxAborted.message, data, 'filecustomerror');
                return true;
            }
            return false;
        },
        noFilesError: function (params) {
            var self = this, label = self.minFileCount > 1 ? self.filePlural : self.fileSingle,
                msg = self.msgFilesTooLess.replace('{n}', self.minFileCount).replace('{files}', label),
                $error = self.$errorContainer;
            self.addError(msg);
            self.isError = true;
            self.updateFileDetails(0);
            $error.fadeIn(800);
            self.raise('fileerror', [params]);
            self.clearFileInput();
            addCss(self.$container, 'has-error');
        },
        setProgress: function (p, $el) {
            var self = this, pct = Math.min(p, 100),
                template = pct < 100 ? self.progressTemplate : self.progressCompleteTemplate;
            $el = $el || self.$progress;
            if (!isEmpty(template)) {
                $el.html(template.replace(/\{percent}/g, pct));
            }
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
            var self = this, i = 0, newstack = [], newnames = [];
            self.getThumbs().each(function () {
                var $thumb = $(this), ind = $thumb.attr('data-fileindex'),
                    file = self.filestack[ind];
                if (ind === -1) {
                    return;
                }
                if (file !== undefined) {
                    newstack[i] = file;
                    newnames[i] = self.getFileName(file);
                    $thumb.attr({
                        'id': self.previewInitId + '-' + i,
                        'data-fileindex': i
                    });
                    i++;
                } else {
                    $thumb.attr({
                        'id': 'uploaded-' + uniqId(),
                        'data-fileindex': '-1'
                    });
                }
            });
            self.filestack = newstack;
            self.filenames = newnames;
        },
        destroy: function () {
            var self = this, $cont = self.$container;
            $cont.find('.file-drop-zone').off();
            self.$element.insertBefore($cont).off('.fileinput').removeData();
            $cont.off().remove();
        },
        refresh: function (options) {
            var self = this, $el = self.$element;
            options = options ? $.extend(self.options, options) : self.options;
            self.destroy();
            $el.fileinput(options);
            if ($el.val()) {
                $el.trigger('change.fileinput');
            }
        },
        initDragDrop: function () {
            var self = this, $zone = self.$container.find('.file-drop-zone'),
                allEvents = 'dragenter.fileinput dragover.fileinput drop.fileinput';
            handler($zone, 'dragenter.fileinput dragover.fileinput', function (e) {
                var hasFiles = $.inArray('Files', e.originalEvent.dataTransfer.types) > -1;
                e.stopPropagation();
                e.preventDefault();
                if (self.isDisabled || !hasFiles) {
                    e.originalEvent.dataTransfer.effectAllowed = 'none';
                    e.originalEvent.dataTransfer.dropEffect = 'none';
                    return;
                }
                addCss($(this), 'highlighted');
            }, true);
            handler($zone, 'dragleave', function (e) {
                e.stopPropagation();
                e.preventDefault();
                if (self.isDisabled) {
                    return;
                }
                $(this).removeClass('highlighted');
            });
            handler($zone, 'drop', function (e) {
                e.preventDefault();
                /** @namespace e.originalEvent.dataTransfer */
                if (self.isDisabled || isEmpty(e.originalEvent.dataTransfer.files)) {
                    return;
                }
                self.change(e, 'dragdrop');
                $(this).removeClass('highlighted');
            });
            handler($(document), allEvents, function (e) {
                e.stopPropagation();
                e.preventDefault();
            }, true);
        },
        setFileDropZoneTitle: function () {
            var self = this, $zone = self.$container.find('.file-drop-zone');
            $zone.find('.' + self.dropZoneTitleClass).remove();
            if (!self.isUploadable || !self.showPreview || $zone.length === 0 || self.getFileStack().length > 0 || !self.dropZoneEnabled) {
                return;
            }
            if ($zone.find('.file-preview-frame').length === 0 && isEmpty(self.defaultPreviewContent)) {
                $zone.prepend('<div class="' + self.dropZoneTitleClass + '">' + self.dropZoneTitle + '</div>');
            }
            self.$container.removeClass('file-input-new');
            addCss(self.$container, 'file-input-ajax-new');
        },
        errorsExist: function () {
            var self = this, $err;
            if (self.$errorContainer.find('li').length) {
                return true;
            }
            $err = $(document.createElement('div')).html(self.$errorContainer.html());
            $err.find('span.kv-error-close').remove();
            $err.find('ul').remove();
            return $.trim($err.text()).length ? true : false;
        },
        getMsgSelected: function (n) {
            var self = this, strFiles = n === 1 ? self.fileSingle : self.filePlural;
            return self.msgSelected.replace('{n}', n).replace('{files}', strFiles);
        },
        renderThumbProgress: function () {
            return '<div class="file-thumb-progress hide">' + this.progressTemplate.replace(/\{percent}/g, '0') + '</div>';
        },
        renderFileFooter: function (caption, width) {
            var self = this, config = self.fileActionSettings, footer, out, template = self.getLayoutTemplate('footer');
            if (self.isUploadable) {
                footer = template.replace(/\{actions}/g, self.renderFileActions(true, true, false, false, false));
                out = footer.replace(/\{caption}/g, caption)
                    .replace(/\{width}/g, width)
                    .replace(/\{progress}/g, self.renderThumbProgress())
                    .replace(/\{indicator}/g, config.indicatorNew)
                    .replace(/\{indicatorTitle}/g, config.indicatorNewTitle);
            } else {
                out = template.replace(/\{actions}/g, '')
                    .replace(/\{caption}/g, caption)
                    .replace(/\{progress}/g, '')
                    .replace(/\{width}/g, width)
                    .replace(/\{indicator}/g, '')
                    .replace(/\{indicatorTitle}/g, '');
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
                otherButtons = self.otherActionButtons.replace(/\{dataKey}/g, vKey),
                config = self.fileActionSettings,
                removeClass = disabled ? config.removeClass + ' disabled' : config.removeClass;
            btnDelete = btnDelete
                .replace(/\{removeClass}/g, removeClass)
                .replace(/\{removeIcon}/g, config.removeIcon)
                .replace(/\{removeTitle}/g, config.removeTitle)
                .replace(/\{dataUrl}/g, vUrl)
                .replace(/\{dataKey}/g, vKey);
            if (showUpload) {
                btnUpload = self.getLayoutTemplate('actionUpload')
                    .replace(/\{uploadClass}/g, config.uploadClass)
                    .replace(/\{uploadIcon}/g, config.uploadIcon)
                    .replace(/\{uploadTitle}/g, config.uploadTitle);
            }
            return template
                .replace(/\{delete}/g, btnDelete)
                .replace(/\{upload}/g, btnUpload)
                .replace(/\{other}/g, otherButtons);
        },
        setThumbStatus: function ($thumb, status) {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            var icon = 'indicator' + status, msg = icon + 'Title',
                css = 'file-preview-' + status.toLowerCase(),
                $indicator = $thumb.find('.file-upload-indicator'),
                config = self.fileActionSettings;
            $thumb.removeClass('file-preview-success file-preview-error file-preview-loading');
            if (status === 'Error') {
                $thumb.find('.kv-file-upload').attr('disabled', true);
            }
            $indicator.html(config[icon]);
            $indicator.attr('title', config[msg]);
            $thumb.addClass(css);
        },
        clearPreview: function () {
            var self = this, $thumbs = !self.showUploadedThumbs ? self.$preview.find('.file-preview-frame') :
                self.$preview.find('.file-preview-frame:not(.file-preview-success)');
            $thumbs.remove();
            if (!self.$preview.find('.file-preview-frame').length || !self.showPreview) {
                self.resetUpload();
            }
            self.validateDefaultPreview();
        },
        initPreview: function (isInit) {
            var self = this, cap = self.initialCaption || '', out;
            if (!previewCache.count(self.id)) {
                self.clearPreview();
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
                    var hasFiles = self.isUploadable ? previewCache.count(self.id) : self.$element.get(0).files.length;
                    if (self.$preview.find('.kv-file-remove').length === 0 && !hasFiles) {
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
                    type: 'POST',
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
                        if (isEmpty(data) || isEmpty(data.error)) {
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
                handler($el, 'click', function () {
                    if (!self.validateMinCount()) {
                        return false;
                    }
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
            self.uploadStatus = {};
            self.uploadLog = [];
            self.uploadAsyncCount = 0;
            self.loadedImages = [];
            self.totalImagesCount = 0;
            self.$btnUpload.removeAttr('disabled');
            self.setProgress(0);
            addCss(self.$progress, 'hide');
            self.resetErrors(false);
            self.ajaxAborted = false;
            self.ajaxRequests = [];
            self.resetCanvas();
        },
        resetCanvas: function () {
            var self = this;
            if (self.canvas && self.imageCanvasContext) {
                self.imageCanvasContext.clearRect(0, 0, self.canvas.width, self.canvas.height);
            }
        },
        cancel: function () {
            var self = this, xhr = self.ajaxRequests, len = xhr.length, i;
            if (len > 0) {
                for (i = 0; i < len; i += 1) {
                    self.cancelling = true;
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
        cleanMemory: function ($thumb) {
            var data = $thumb.is('img') ? $thumb.attr('src') : $thumb.find('source').attr('src');
            /** @namespace objUrl.revokeObjectURL */
            objUrl.revokeObjectURL(data);
        },
        hasInitialPreview: function () {
            var self = this;
            return !self.overwriteInitial && previewCache.count(self.id);
        },
        clear: function () {
            var self = this, cap;
            self.$btnUpload.removeAttr('disabled');
            self.getThumbs().find('video,audio,img').each(function () {
                self.cleanMemory($(this));
            });
            self.resetUpload();
            self.clearStack();
            self.clearFileInput();
            self.resetErrors(true);
            self.raise('fileclear');
            if (self.hasInitialPreview()) {
                self.showFileIcon();
                self.resetPreview();
                self.initPreviewDeletes();
                self.$container.removeClass('file-input-new');
            } else {
                self.getThumbs().each(function () {
                    self.clearObjects($(this));
                });
                if (self.isUploadable) {
                    previewCache.data[self.id] = {};
                }
                self.$preview.html('');
                cap = (!self.overwriteInitial && self.initialCaption.length > 0) ? self.initialCaption : '';
                self.setCaption(cap);
                self.$caption.attr('title', '');
                addCss(self.$container, 'file-input-new');
                self.validateDefaultPreview();
            }
            if (self.$container.find('.file-preview-frame').length === 0) {
                if (!self.initCaption()) {
                    self.$captionContainer.find('.kv-caption-icon').hide();
                }
            }
            self.hideFileIcon();
            self.raise('filecleared');
            self.$captionContainer.focus();
            self.setFileDropZoneTitle();
        },
        resetPreview: function () {
            var self = this, out, cap;
            if (previewCache.count(self.id)) {
                out = previewCache.out(self.id);
                self.$preview.html(out.content);
                cap = self.initialCaption ? self.initialCaption : out.caption;
                self.setCaption(cap);
            } else {
                self.clearPreview();
                self.initCaption();
            }
        },
        clearDefaultPreview: function () {
            var self = this;
            self.$preview.find('.file-default-preview').remove();
        },
        validateDefaultPreview: function () {
            var self = this;
            if (!self.showPreview || isEmpty(self.defaultPreviewContent)) {
                return;
            }
            self.$preview.html('<div class="file-default-preview">' + self.defaultPreviewContent + '</div>');
            self.$container.removeClass('file-input-new');
        },
        resetPreviewThumbs: function (isAjax) {
            var self = this, out;
            if (isAjax) {
                self.clearPreview();
                self.clearStack();
                return;
            }
            if (self.hasInitialPreview()) {
                out = previewCache.out(self.id);
                self.$preview.html(out.content);
                self.setCaption(out.caption);
                self.initPreviewDeletes();
            } else {
                self.clearPreview();
            }
        },
        reset: function () {
            var self = this;
            self.resetPreview();
            self.$container.find('.fileinput-filename').text('');
            self.raise('filereset');
            addCss(self.$container, 'file-input-new');
            if (self.$preview.find('.file-preview-frame').length || self.isUploadable && self.dropZoneEnabled) {
                self.$container.removeClass('file-input-new');
            }
            self.setFileDropZoneTitle();
            self.clearStack();
            self.formdata = {};
        },
        disable: function () {
            var self = this;
            self.isDisabled = true;
            self.raise('filedisabled');
            self.$element.attr('disabled', 'disabled');
            self.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").attr("disabled",
                true);
            self.initDragDrop();
        },
        enable: function () {
            var self = this;
            self.isDisabled = false;
            self.raise('fileenabled');
            self.$element.removeAttr('disabled');
            self.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled");
            self.initDragDrop();
        },
        getThumbs: function (css) {
            css = css || '';
            return this.$preview.find('.file-preview-frame:not(.file-preview-initial)' + css);
        },
        getExtraData: function (previewId, index) {
            var self = this, data = self.uploadExtraData;
            if (typeof self.uploadExtraData === "function") {
                data = self.uploadExtraData(previewId, index);
            }
            return data;
        },
        uploadExtra: function (previewId, index) {
            var self = this, data = self.getExtraData(previewId, index);
            if (data.length === 0) {
                return;
            }
            $.each(data, function (key, value) {
                self.formdata.append(key, value);
            });
        },
        setAsyncUploadStatus: function (previewId, pct, total) {
            var self = this, sum = 0;
            self.setProgress(pct, $('#' + previewId).find('.file-thumb-progress'));
            self.uploadStatus[previewId] = pct;
            $.each(self.uploadStatus, function (key, value) {
                sum += value;
            });
            self.setProgress(Math.ceil(sum / total));

        },
        initXhr: function (xhrobj, previewId, fileCount) {
            var self = this;
            if (xhrobj.upload) {
                xhrobj.upload.addEventListener('progress', function (event) {
                    var pct = 0, position = event.loaded || event.position, total = event.total;
                    /** @namespace event.lengthComputable */
                    if (event.lengthComputable) {
                        pct = Math.ceil(position / total * 100);
                    }
                    if (previewId) {
                        self.setAsyncUploadStatus(previewId, pct, fileCount);
                    } else {
                        self.setProgress(Math.ceil(pct));
                    }
                }, false);
            }
            return xhrobj;
        },
        ajaxSubmit: function (fnBefore, fnSuccess, fnComplete, fnError, previewId, index) {
            var self = this, settings;
            self.raise('filepreajax', [previewId, index]);
            self.uploadExtra(previewId, index);
            settings = $.extend({
                xhr: function () {
                    var xhrobj = $.ajaxSettings.xhr();
                    return self.initXhr(xhrobj, previewId, self.getFileStack().length);
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
            var self = this, append, data, index, $newThumb, content, config, tags, i;
            if (!self.showPreview || typeof out !== 'object' || $.isEmptyObject(out)) {
                return;
            }
            if (out.initialPreview !== undefined && out.initialPreview.length > 0) {
                self.hasInitData = true;
                content = out.initialPreview || [];
                config = out.initialPreviewConfig || [];
                tags = out.initialPreviewThumbTags || [];
                append = out.append === undefined || out.append ? true : false;
                self.overwriteInitial = false;
                if ($thumb !== undefined) {
                    if (!allFiles) {
                        index = previewCache.add(self.id, content, config[0], tags[0], append);
                        data = previewCache.get(self.id, index, false);
                        $newThumb = $(data).hide();
                        $thumb.after($newThumb).fadeOut('slow', function () {
                            $newThumb.fadeIn('slow').css('display:inline-block');
                            self.initPreviewDeletes();
                            self.clearFileInput();
                            $thumb.remove();
                        });
                    } else {
                        i = $thumb.attr('data-fileindex');
                        self.uploadCache.content[i] = content[0];
                        self.uploadCache.config[i] = config[0];
                        self.uploadCache.tags[i] = tags[0];
                        self.uploadCache.append = append;
                    }
                } else {
                    previewCache.set(self.id, content, config, tags, append);
                    self.initPreview();
                    self.initPreviewDeletes();
                }
            }
        },
        initSuccessThumbs: function () {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            self.getThumbs('.file-preview-success').each(function () {
                var $thumb = $(this), $remove = $thumb.find('.kv-file-remove');
                $remove.removeAttr('disabled');
                handler($remove, 'click', function () {
                    var out = self.raise('filesuccessremove', [$thumb.attr('id'), $thumb.data('fileindex')]);
                    self.cleanMemory($thumb);
                    if (out === false) {
                        return;
                    }
                    $thumb.fadeOut('slow', function () {
                        $thumb.remove();
                        if (!self.$preview.find('.file-preview-frame').length) {
                            self.reset();
                        }
                    });
                });
            });
        },
        checkAsyncComplete: function () {
            var self = this, previewId, i;
            for (i = 0; i < self.filestack.length; i++) {
                if (self.filestack[i]) {
                    previewId = self.previewInitId + "-" + i;
                    if ($.inArray(previewId, self.uploadLog) === -1) {
                        return false;
                    }
                }
            }
            return (self.uploadAsyncCount === self.uploadLog.length);
        },
        uploadSingle: function (i, files, allFiles) {
            var self = this, total = self.getFileStack().length, formdata = new FormData(), outData,
                previewId = self.previewInitId + "-" + i, $thumb, chkComplete, $btnUpload, $btnDelete,
                hasPostData = self.filestack.length > 0 || !$.isEmptyObject(self.uploadExtraData),
                fnBefore, fnSuccess, fnComplete, fnError, updateUploadLog, params = {id: previewId, index: i};
            self.formdata = formdata;
            if (self.showPreview) {
                $thumb = $('#' + previewId + ':not(.file-preview-initial)');
                $btnUpload = $thumb.find('.kv-file-upload');
                $btnDelete = $thumb.find('.kv-file-remove');
                $('#' + previewId).find('.file-thumb-progress').removeClass('hide');
            }
            if (total === 0 || !hasPostData || ($btnUpload && $btnUpload.hasClass('disabled')) || self.abort(params)) {
                return;
            }
            updateUploadLog = function (i, previewId) {
                self.updateStack(i, undefined);
                self.uploadLog.push(previewId);
                if (self.checkAsyncComplete()) {
                    self.fileBatchCompleted = true;
                }
            };
            chkComplete = function () {
                if (!self.fileBatchCompleted) {
                    return;
                }
                setTimeout(function () {
                    if (self.showPreview) {
                        previewCache.set(
                            self.id,
                            self.uploadCache.content,
                            self.uploadCache.config,
                            self.uploadCache.tags,
                            self.uploadCache.append
                        );
                        if (self.hasInitData) {
                            self.initPreview();
                            self.initPreviewDeletes();
                        }
                    }
                    self.unlock();
                    self.clearFileInput();
                    self.raise('filebatchuploadcomplete', [self.filestack, self.getExtraData()]);
                    self.uploadCount = 0;
                    self.uploadStatus = {};
                    self.uploadLog = [];
                    self.setProgress(100);
                }, 100);
            };
            fnBefore = function (jqXHR) {
                outData = self.getOutData(jqXHR);
                self.fileBatchCompleted = false;
                if (self.showPreview) {
                    if (!$thumb.hasClass('file-preview-success')) {
                        self.setThumbStatus($thumb, 'Loading');
                        addCss($thumb, 'file-uploading');
                    }
                    $btnUpload.attr('disabled', true);
                    $btnDelete.attr('disabled', true);
                }
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
                    if (isEmpty(data) || isEmpty(data.error)) {
                        if (self.showPreview) {
                            self.setThumbStatus($thumb, 'Success');
                            $btnUpload.hide();
                            self.initUploadSuccess(data, $thumb, allFiles);
                        }
                        self.raise('fileuploaded', [outData, previewId, i]);
                        if (!allFiles) {
                            self.resetFileStack();
                            self.updateStack(i, undefined);
                        } else {
                            updateUploadLog(i, previewId);
                        }
                    } else {
                        self.setThumbStatus($thumb, 'Error');
                        self.showUploadError(data.error, params);
                        if (allFiles) {
                            updateUploadLog(i, previewId);
                        }
                    }
                }, 100);
            };
            fnComplete = function () {
                setTimeout(function () {
                    if (self.showPreview) {
                        $btnUpload.removeAttr('disabled');
                        $btnDelete.removeAttr('disabled');
                        $thumb.removeClass('file-uploading');
                    }
                    if (!allFiles) {
                        self.unlock(false);
                    } else {
                        chkComplete();
                    }
                    self.initSuccessThumbs();
                }, 100);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var errMsg = self.parseError(jqXHR, errorThrown, (allFiles ? files[i].name : null));
                setTimeout(function () {
                    if (allFiles) {
                        updateUploadLog(i, previewId);
                    }
                    self.uploadStatus[previewId] = 100;
                    self.setThumbStatus($thumb, 'Error');
                    params = $.extend(params, self.getOutData(jqXHR));
                    self.showUploadError(errMsg, params);
                }, 100);
            };
            formdata.append(self.uploadFileAttr, files[i], self.filenames[i]);
            formdata.append('file_id', i);
            self.ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError, previewId, i);
        },
        uploadBatch: function () {
            var self = this, files = self.filestack, total = files.length, params = {},
                hasPostData = self.filestack.length > 0 || !$.isEmptyObject(self.uploadExtraData),
                setAllUploaded, fnBefore, fnSuccess, fnComplete, fnError;
            self.formdata = new FormData();
            if (total === 0 || !hasPostData || self.abort(params)) {
                return;
            }
            setAllUploaded = function () {
                $.each(files, function (key) {
                    self.updateStack(key, undefined);
                });
                self.clearFileInput();
            };
            fnBefore = function (jqXHR) {
                self.lock();
                var outData = self.getOutData(jqXHR);
                if (self.showPreview) {
                    self.getThumbs().each(function () {
                        var $thumb = $(this), $btnUpload = $thumb.find('.kv-file-upload'),
                            $btnDelete = $thumb.find('.kv-file-remove');
                        if (!$thumb.hasClass('file-preview-success')) {
                            self.setThumbStatus($thumb, 'Loading');
                            addCss($thumb, 'file-uploading');
                        }
                        $btnUpload.attr('disabled', true);
                        $btnDelete.attr('disabled', true);
                    });
                }
                self.raise('filebatchpreupload', [outData]);
                if (self.abort(outData)) {
                    jqXHR.abort();
                    self.setProgress(100);
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                /** @namespace data.errorkeys */
                var outData = self.getOutData(jqXHR, data), $thumbs = self.getThumbs(), key = 0,
                    keys = isEmpty(data) || isEmpty(data.errorkeys) ? [] : data.errorkeys;
                if (isEmpty(data) || isEmpty(data.error)) {
                    self.raise('filebatchuploadsuccess', [outData]);
                    setAllUploaded();
                    if (self.showPreview) {
                        $thumbs.each(function () {
                            var $thumb = $(this), $btnUpload = $thumb.find('.kv-file-upload');
                            $thumb.find('.kv-file-upload').hide();
                            self.setThumbStatus($thumb, 'Success');
                            $thumb.removeClass('file-uploading');
                            $btnUpload.removeAttr('disabled');
                        });
                        self.initUploadSuccess(data);
                    } else {
                        self.reset();
                    }
                } else {
                    if (self.showPreview) {
                        $thumbs.each(function () {
                            var $thumb = $(this), $btnDelete = $thumb.find('.kv-file-remove'),
                                $btnUpload = $thumb.find('.kv-file-upload');
                            $thumb.removeClass('file-uploading');
                            $btnUpload.removeAttr('disabled');
                            $btnDelete.removeAttr('disabled');
                            if (keys.length === 0) {
                                self.setThumbStatus($thumb, 'Error');
                                return;
                            }
                            if ($.inArray(key, keys) !== -1) {
                                self.setThumbStatus($thumb, 'Error');
                            } else {
                                $thumb.find('.kv-file-upload').hide();
                                self.setThumbStatus($thumb, 'Success');
                                self.updateStack(key, undefined);
                            }
                            key++;
                        });
                        self.initUploadSuccess(data);
                    }
                    self.showUploadError(data.error, outData, 'filebatchuploaderror');
                }
            };
            fnComplete = function () {
                self.setProgress(100);
                self.unlock();
                self.initSuccessThumbs();
                self.clearFileInput();
                self.raise('filebatchuploadcomplete', [self.filestack, self.getExtraData()]);
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
                        self.setThumbStatus($thumb, 'Error');
                    }
                });
                self.getThumbs().removeClass('file-uploading');
                self.getThumbs(' .kv-file-upload').removeAttr('disabled');
                self.getThumbs(' .kv-file-delete').removeAttr('disabled');
            };
            $.each(files, function (key, data) {
                if (!isEmpty(files[key])) {
                    self.formdata.append(self.uploadFileAttr, data, self.filenames[key]);
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
                if (isEmpty(data) || isEmpty(data.error)) {
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
                self.clearFileInput();
                self.raise('filebatchuploadcomplete', [self.filestack, self.getExtraData()]);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var outData = self.getOutData(jqXHR), errMsg = self.parseError(jqXHR, errorThrown);
                params.data = outData;
                self.showUploadError(errMsg, outData, 'filebatchuploaderror');
            };
            self.ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError);
        },
        upload: function () {
            var self = this, totLen = self.getFileStack().length, params = {},
                i, outData, len, hasExtraData = !$.isEmptyObject(self.getExtraData());
            if (self.minFileCount > 0 && self.getFileCount(totLen) < self.minFileCount) {
                self.noFilesError(params);
                return;
            }
            if (!self.isUploadable || self.isDisabled || (totLen === 0 && !hasExtraData)) {
                return;
            }
            self.resetUpload();
            self.$progress.removeClass('hide');
            self.uploadCount = 0;
            self.uploadStatus = {};
            self.uploadLog = [];
            self.lock();
            self.setProgress(2);
            if (totLen === 0 && hasExtraData) {
                self.uploadExtraOnly();
                return;
            }
            len = self.filestack.length;
            self.hasInitData = false;
            if (self.uploadAsync) {
                outData = self.getOutData();
                self.raise('filebatchpreupload', [outData]);
                self.fileBatchCompleted = false;
                self.uploadCache = {content: [], config: [], tags: [], append: true};
                self.uploadAsyncCount = self.getFileStack().length;
                for (i = 0; i < len; i++) {
                    self.uploadCache.content[i] = null;
                    self.uploadCache.config[i] = null;
                    self.uploadCache.tags[i] = null;
                }
                for (i = 0; i < len; i++) {
                    if (self.filestack[i] !== undefined) {
                        self.uploadSingle(i, self.filestack, true);
                    }
                }
                return;
            }
            self.uploadBatch();
        },
        initFileActions: function () {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            self.$preview.find('.kv-file-remove').each(function () {
                var $el = $(this), $frame = $el.closest('.file-preview-frame'), hasError,
                    id = $frame.attr('id'), ind = $frame.attr('data-fileindex'), n, cap, status;
                handler($el, 'click', function () {
                    status = self.raise('filepreremove', [id, ind]);
                    if (status === false || !self.validateMinCount()) {
                        return false;
                    }
                    hasError = $frame.hasClass('file-preview-error');
                    self.cleanMemory($frame);
                    $frame.fadeOut('slow', function () {
                        self.updateStack(ind, undefined);
                        self.clearObjects($frame);
                        $frame.remove();
                        if (id && hasError) {
                            self.$errorContainer.find('li[data-file-id="' + id + '"]').fadeOut('fast', function () {
                                $(this).remove();
                                if (!self.errorsExist()) {
                                    self.resetErrors();
                                }
                            });
                        }
                        var filestack = self.getFileStack(true), len = filestack.length, chk = previewCache.count(self.id),
                            hasThumb = self.showPreview && self.$preview.find('.file-preview-frame').length;
                        self.clearFileInput();
                        if (len === 0 && chk === 0 && !hasThumb) {
                            self.reset();
                        } else {
                            n = chk + len;
                            cap = n > 1 ? self.getMsgSelected(n) : (filestack[0] ? self.getFileNames()[0] : '');
                            self.setCaption(cap);
                        }
                        self.raise('fileremoved', [id, ind]);
                    });
                });
            });
            self.$preview.find('.kv-file-upload').each(function () {
                var $el = $(this);
                handler($el, 'click', function () {
                    var $frame = $el.closest('.file-preview-frame'),
                        ind = $frame.attr('data-fileindex');
                    if (!$frame.hasClass('file-preview-error')) {
                        self.uploadSingle(ind, self.filestack, false);
                    }
                });
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
        addError: function (msg) {
            var self = this, $error = self.$errorContainer;
            if (msg && $error.length) {
                $error.html(self.errorCloseButton + msg);
                $error.find('.kv-error-close').off('click').on('click', function () {
                    $error.fadeOut('slow');
                });
            }
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
            self.addError(self.msgFoldersNotAllowed.replace(/\{n}/g, folders));
            $error.fadeIn(800);
            addCss(self.$container, 'has-error');
            self.raise('filefoldererror', [folders]);
        },
        showUploadError: function (msg, params, event) {
            var self = this, $error = self.$errorContainer, ev = event || 'fileuploaderror',
                e = params && params.id ? '<li data-file-id="' + params.id + '">' + msg + '</li>' : '<li>' + msg + '</li>';
            if ($error.find('ul').length === 0) {
                self.addError('<ul>' + e + '</ul>');
            } else {
                $error.find('ul').append(e);
            }
            $error.fadeIn(800);
            self.raise(ev, [params]);
            self.$container.removeClass('file-input-new');
            addCss(self.$container, 'has-error');
            return true;
        },
        showError: function (msg, params, event) {
            var self = this, $error = self.$errorContainer, ev = event || 'fileerror';
            params = params || {};
            params.reader = self.reader;
            self.addError(msg);
            $error.fadeIn(800);
            self.raise(ev, [params]);
            if (!self.isUploadable) {
                self.clearFileInput();
            }
            self.$container.removeClass('file-input-new');
            addCss(self.$container, 'has-error');
            self.$btnUpload.attr('disabled', true);
            return true;
        },
        errorHandler: function (evt, caption) {
            var self = this, err = evt.target.error;
            /** @namespace err.NOT_FOUND_ERR */
            /** @namespace err.SECURITY_ERR */
            /** @namespace err.NOT_READABLE_ERR */
            if (err.code === err.NOT_FOUND_ERR) {
                self.showError(self.msgFileNotFound.replace('{name}', caption));
            } else if (err.code === err.SECURITY_ERR) {
                self.showError(self.msgFileSecured.replace('{name}', caption));
            } else if (err.code === err.NOT_READABLE_ERR) {
                self.showError(self.msgFileNotReadable.replace('{name}', caption));
            } else if (err.code === err.ABORT_ERR) {
                self.showError(self.msgFilePreviewAborted.replace('{name}', caption));
            } else {
                self.showError(self.msgFilePreviewError.replace('{name}', caption));
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
            var self = this, frameClass = '', fname = file ? file.name : '',
                /** @namespace objUrl.createObjectURL */
                data = objUrl.createObjectURL(file), ind = previewId.slice(previewId.lastIndexOf('-') + 1),
                config = self.previewSettings.other || defaultPreviewSettings.other,
                footer = self.renderFileFooter(file.name, config.width),
                previewOtherTemplate = self.parseFilePreviewIcon(self.getPreviewTemplate('other'), fname);
            if (isDisabled === true) {
                if (!self.isUploadable) {
                    footer += '<div class="file-other-error" title="' + self.fileActionSettings.indicatorErrorTitle +
                    '">' + self.fileActionSettings.indicatorError + '</div>';
                }
            }
            self.clearDefaultPreview();
            self.$preview.append("\n" + previewOtherTemplate
                .replace(/\{previewId}/g, previewId)
                .replace(/\{frameClass}/g, frameClass)
                .replace(/\{fileindex}/g, ind)
                .replace(/\{caption}/g, self.slug(file.name))
                .replace(/\{width}/g, config.width)
                .replace(/\{height}/g, config.height)
                .replace(/\{type}/g, file.type)
                .replace(/\{data}/g, data)
                .replace(/\{footer}/g, footer));
            if (isDisabled === true && self.isUploadable) {
                self.setThumbStatus($('#' + previewId), 'Error');
            }
        },
        previewFile: function (i, file, theFile, previewId, data) {
            if (!this.showPreview) {
                return;
            }
            var self = this, cat = self.parseFileType(file), fname = file ? file.name : '', caption = self.slug(fname),
                content, strText, types = self.allowedPreviewTypes, mimes = self.allowedPreviewMimeTypes,
                tmplt = self.getPreviewTemplate(cat), chkTypes = types && types.indexOf(cat) >= 0, id,
                config = isSet(cat, self.previewSettings) ? self.previewSettings[cat] : defaultPreviewSettings[cat],
                chkMimes = mimes && mimes.indexOf(file.type) !== -1,
                footer = self.renderFileFooter(caption, config.width), modal = '',
                ind = previewId.slice(previewId.lastIndexOf('-') + 1);
            if (chkTypes || chkMimes) {
                tmplt = self.parseFilePreviewIcon(tmplt, fname.split('.').pop());
                if (cat === 'text') {
                    strText = htmlEncode(theFile.target.result);
                    id = 'text-' + uniqId();
                    content = tmplt.replace(/\{zoom}/g, self.getLayoutTemplate('zoom'));
                    modal = self.getLayoutTemplate('modal').replace('{id}', id)
                        .replace(/\{title}/g, caption)
                        .replace(/\{body}/g, strText).replace(/\{heading}/g, self.msgZoomModalHeading);
                    content = content.replace(/\{previewId}/g, previewId).replace(/\{caption}/g, caption)
                        .replace(/\{width}/g, config.width).replace(/\{height}/g, config.height)
                        .replace(/\{frameClass}/g, '').replace(/\{zoomInd}/g, self.zoomIndicator)
                        .replace(/\{footer}/g, footer).replace(/\{fileindex}/g, ind)
                        .replace(/\{type}/g, file.type).replace(/\{zoomTitle}/g, self.msgZoomTitle)
                        .replace(/\{dialog}/g, "$('#" + id + "').modal('show')")
                        .replace(/\{data}/g, strText) + modal;
                } else {
                    content = tmplt.replace(/\{previewId}/g, previewId).replace(/\{caption}/g, caption)
                        .replace(/\{frameClass}/g, '').replace(/\{type}/g, file.type).replace(/\{fileindex}/g, ind)
                        .replace(/\{width}/g, config.width).replace(/\{height}/g, config.height)
                        .replace(/\{footer}/g, footer).replace(/\{data}/g, data);
                }
                self.clearDefaultPreview();
                self.$preview.append("\n" + content);
                self.validateImage(i, previewId, caption, file.type);
            } else {
                self.previewDefault(file, previewId);
            }
        },
        slugDefault: function (text) {
            return isEmpty(text) ? '' : text.split(/(\\|\/)/g).pop().replace(/[^\w\u00C0-\u017F\-.\\\/ ]+/g, '');
        },
        readFiles: function (files) {
            this.reader = new FileReader();
            var self = this, $el = self.$element, $preview = self.$preview, reader = self.reader,
                $container = self.$previewContainer, $status = self.$previewStatus, msgLoading = self.msgLoading,
                msgProgress = self.msgProgress, previewInitId = self.previewInitId, numFiles = files.length,
                settings = self.fileTypeSettings, ctr = self.filestack.length, readFile,
                throwError = function (msg, file, previewId, index) {
                    var p1 = $.extend(self.getOutData({}, {}, files), {id: previewId, index: index}),
                        p2 = {id: previewId, index: index, file: file, files: files};
                    self.previewDefault(file, previewId, true);
                    if (self.isUploadable) {
                        self.pushStack(undefined);
                    }
                    setTimeout(readFile(index + 1), 100);
                    self.initFileActions();
                    return self.isUploadable ? self.showUploadError(msg, p1) : self.showError(msg, p2);
                };

            self.loadedImages = [];
            self.totalImagesCount = 0;

            $.each(files, function (key, file) {
                var cat = 'image',
                    func = isSet(cat, self.fileTypeSettings) ? self.fileTypeSettings[cat] : defaultFileTypeSettings[cat];
                if (func && func(file.type)) {
                    self.totalImagesCount++;
                }
            });

            readFile = function (i) {
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
                    msg = self.msgSizeTooLarge.replace('{name}', caption)
                        .replace('{size}', fileSize)
                        .replace('{maxSize}', self.maxFileSize);
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
                        msg = self.msgInvalidFileType.replace('{name}', caption).replace('{types}', strTypes);
                        self.isError = throwError(msg, file, previewId, i);
                        return;
                    }
                }
                if (fileCount === 0 && !isEmpty(fileExt) && isArray(fileExt) && !isEmpty(fileExtExpr)) {
                    chk = caption.match(fileExtExpr);
                    fileCount += isEmpty(chk) ? 0 : chk.length;
                    if (fileCount === 0) {
                        msg = self.msgInvalidFileExtension.replace('{name}', caption).replace('{extensions}',
                            strExt);
                        self.isError = throwError(msg, file, previewId, i);
                        return;
                    }
                }
                if (!self.showPreview) {
                    self.pushStack(file);
                    setTimeout(readFile(i + 1), 100);
                    self.raise('fileloaded', [file, previewId, i, reader]);
                    return;
                }
                if ($preview.length > 0 && FileReader !== undefined) {
                    $status.html(msgLoading.replace('{index}', i + 1).replace('{files}', numFiles));
                    $container.addClass('loading');
                    reader.onerror = function (evt) {
                        self.errorHandler(evt, caption);
                    };
                    reader.onload = function (theFile) {
                        self.previewFile(i, file, theFile, previewId, previewData);
                        self.initFileActions();
                    };
                    reader.onloadend = function () {
                        msg = msgProgress
                            .replace('{index}', i + 1).replace('{files}', numFiles)
                            .replace('{percent}', 50).replace('{name}', caption);
                        setTimeout(function () {
                            $status.html(msg);
                            self.updateFileDetails(numFiles);
                            readFile(i + 1);
                        }, 100);
                        self.raise('fileloaded', [file, previewId, i, reader]);
                    };
                    reader.onprogress = function (data) {
                        if (data.lengthComputable) {
                            var fact = (data.loaded / data.total) * 100, progress = Math.ceil(fact);
                            msg = msgProgress.replace('{index}', i + 1).replace('{files}', numFiles)
                                .replace('{percent}', progress).replace('{name}', caption);
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
                self.pushStack(file);
            };

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
        validateMinCount: function () {
            var self = this, len = self.isUploadable ? self.getFileStack().length : self.$element.get(0).files.length;
            if (self.validateInitialCount && self.minFileCount > 0 && self.getFileCount(len - 1) < self.minFileCount) {
                self.noFilesError({});
                return false;
            }
            return true;
        },
        getFileCount: function (fileCount) {
            var self = this, addCount = 0;
            if (self.validateInitialCount && !self.overwriteInitial) {
                addCount = previewCache.count(self.id);
                fileCount += addCount;
            }
            return fileCount;
        },
        change: function (e) {
            var self = this, $el = self.$element;
            if (!self.isUploadable && isEmpty($el.val()) && self.fileInputCleared) { // IE 11 fix
                self.fileInputCleared = false;
                return;
            }
            self.fileInputCleared = false;
            var tfiles, msg, total, isDragDrop = arguments.length > 1,
                files = isDragDrop ? e.originalEvent.dataTransfer.files : $el.get(0).files,
                isSingleUpload = isEmpty($el.attr('multiple')), i = 0, f, n, folders = 0,
                ctr = self.filestack.length, isAjaxUpload = self.isUploadable, len,
                flagSingle = (isSingleUpload && ctr > 0),
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
            len = tfiles.length;
            total = self.isUploadable ? self.getFileStack().length + len : len;
            total = self.getFileCount(total);
            if (self.maxFileCount > 0 && total > self.maxFileCount) {
                if (!self.autoReplace || len > self.maxFileCount) {
                    n = (self.autoReplace && len > self.maxFileCount) ? len : total;
                    msg = self.msgFilesTooMany.replace('{m}', self.maxFileCount).replace('{n}', n);
                    self.isError = throwError(msg, null, null, null);
                    self.$captionContainer.find('.kv-caption-icon').hide();
                    self.setCaption('', true);
                    self.$container.removeClass('file-input-new file-input-ajax-new');
                    return;
                }
                if (total > self.maxFileCount) {
                    self.resetPreviewThumbs(isAjaxUpload);
                }
            } else {
                if (!isAjaxUpload || flagSingle) {
                    self.resetPreviewThumbs(false);
                    if (flagSingle) {
                        self.clearStack();
                    }
                } else {
                    if (isAjaxUpload && ctr === 0 && (!previewCache.count(self.id) || self.overwriteInitial)) {
                        self.resetPreviewThumbs(true);
                    }
                }
            }
            if (self.isPreviewable) {
                self.readFiles(tfiles);
            } else {
                self.updateFileDetails(1);
            }
            self.showFolderError(folders);
        },
        getFileName: function (file) {
            return file && file.name ? this.slug(file.name) : undefined;
        },
        getFileNames: function (skipNull) {
            var self = this;
            return self.filenames.filter(function (n) {
                return (skipNull ? n !== undefined : n !== undefined && n !== null);
            });
        },
        getFileStack: function (skipNull) {
            var self = this;
            return self.filestack.filter(function (n) {
                return (skipNull ? n !== undefined : n !== undefined && n !== null);
            });
        },
        clearStack: function () {
            var self = this;
            self.filestack = [];
            self.filenames = [];
        },
        updateStack: function (i, file) {
            var self = this;
            self.filestack[i] = file;
            self.filenames[i] = self.getFileName(file);
        },
        pushStack: function (file) {
            var self = this;
            self.filestack.push(file);
            self.filenames.push(self.getFileName(file));
        },
        checkDimensions: function (i, chk, $img, $thumb, fname, type, params) {
            var self = this, msg, dim, tag = chk === 'Small' ? 'min' : 'max',
                limit = self[tag + 'Image' + type], $imgEl, isValid;
            if (isEmpty(limit) || !$img.length) {
                return;
            }
            $imgEl = $img[0];
            dim = (type === 'Width') ? $imgEl.naturalWidth || $imgEl.width : $imgEl.naturalHeight || $imgEl.height;
            isValid = chk === 'Small' ? dim >= limit : dim <= limit;
            if (isValid) {
                return;
            }
            msg = self['msgImage' + type + chk].replace('{name}', fname).replace('{size}', limit);
            self.showUploadError(msg, params);
            self.setThumbStatus($thumb, 'Error');
            self.updateStack(i, null);
        },
        validateImage: function (i, previewId, fname, ftype) {
            var self = this, $preview = self.$preview, params, w1, w2,
                $thumb = $preview.find("#" + previewId), $img = $thumb.find('img');
            fname = fname || 'Untitled';
            if (!$img.length) {
                return;
            }
            handler($img, 'load', function () {
                w1 = $thumb.width();
                w2 = $preview.width();
                if (w1 > w2) {
                    $img.css('width', '100%');
                    $thumb.css('width', '97%');
                }
                params = {ind: i, id: previewId};
                self.checkDimensions(i, 'Small', $img, $thumb, fname, 'Width', params);
                self.checkDimensions(i, 'Small', $img, $thumb, fname, 'Height', params);
                if (!self.resizeImage) {
                    self.checkDimensions(i, 'Large', $img, $thumb, fname, 'Width', params);
                    self.checkDimensions(i, 'Large', $img, $thumb, fname, 'Height', params);
                }
                self.raise('fileimageloaded', [previewId]);
                self.loadedImages.push({ind: i, img: $img, thumb: $thumb, pid: previewId, typ: ftype});
                self.validateAllImages();
                objUrl.revokeObjectURL($img.attr('src'));
            });
        },
        validateAllImages: function () {
            var self = this, i, config, $img, $thumb, pid, ind, params = {}, errFunc;
            if (self.loadedImages.length !== self.totalImagesCount) {
                return;
            }
            self.raise('fileimagesloaded');
            if (!self.resizeImage) {
                return;
            }
            errFunc = self.isUploadable ? self.showUploadError : self.showError;
            for (i = 0; i < self.loadedImages.length; i++) {
                config = self.loadedImages[i];
                $img = config.img;
                $thumb = config.thumb;
                pid = config.pid;
                ind = config.ind;
                params = {id: pid, 'index': ind};
                if (!self.getResizedImage($img[0], config.typ, pid, ind)) {
                    errFunc(self.msgImageResizeError, params, 'fileimageresizeerror');
                    self.setThumbStatus($thumb, 'Error');
                    self.updateStack(ind, undefined);
                }
            }
            self.raise('fileimagesresized');
        },
        getResizedImage: function (image, type, pid, ind) {
            var self = this, width = image.naturalWidth, height = image.naturalHeight, ratio = 1,
                maxWidth = self.maxImageWidth || width, maxHeight = self.maxImageHeight || height,
                isValidImage = (width && height), chkWidth, chkHeight,
                canvas = self.imageCanvas, context = self.imageCanvasContext;
            if (!isValidImage) {
                return false;
            }
            if (width === maxWidth && height === maxHeight) {
                return true;
            }
            type = type || self.resizeDefaultImageType;
            chkWidth = width > maxWidth;
            chkHeight = height > maxHeight;
            if (self.resizePreference === 'width') {
                ratio = chkWidth ? maxWidth / width : (chkHeight ? maxHeight / height : 1);
            } else {
                ratio = chkHeight ? maxHeight / height : (chkWidth ? maxWidth / width : 1);
            }
            self.resetCanvas();
            width *= ratio;
            height *= ratio;
            canvas.width = width;
            canvas.height = height;
            try {
                context.drawImage(image, 0, 0, width, height);
                canvas.toBlob(function (blob) {
                    self.raise('fileimageresized', [pid, ind]);
                    self.filestack[ind] = blob;
                }, type, self.resizeQuality);
                return true;
            }
            catch (err) {
                return false;
            }
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
            var self = this, title, out;
            if (isError) {
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
        },
        initBrowse: function ($container) {
            var self = this;
            self.$btnFile = $container.find('.btn-file');
            self.$btnFile.append(self.$element);
        },
        createContainer: function () {
            var self = this,
                $container = $(document.createElement("div"))
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
            var self = this, dropCss = (self.isUploadable && self.dropZoneEnabled) ? ' file-drop-zone' : 'file-drop-disabled',
                close = !self.showClose ? '' : self.getLayoutTemplate('close'),
                preview = !self.showPreview ? '' : self.getLayoutTemplate('preview')
                    .replace(/\{class}/g, self.previewClass)
                    .replace(/\{dropClass}/g, dropCss),
                css = self.isDisabled ? self.captionClass + ' file-caption-disabled' : self.captionClass,
                caption = self.captionTemplate.replace(/\{class}/g, css + ' kv-fileinput-caption');
            return self.mainTemplate.replace(/\{class}/g, self.mainClass)
                .replace(/\{preview}/g, preview)
                .replace(/\{close}/g, close)
                .replace(/\{caption}/g, caption)
                .replace(/\{upload}/g, self.renderButton('upload'))
                .replace(/\{remove}/g, self.renderButton('remove'))
                .replace(/\{cancel}/g, self.renderButton('cancel'))
                .replace(/\{browse}/g, self.renderButton('browse'));
        },
        renderButton: function (type) {
            var self = this, tmplt = self.getLayoutTemplate('btnDefault'), css = self[type + 'Class'],
                title = self[type + 'Title'], icon = self[type + 'Icon'], label = self[type + 'Label'],
                status = self.isDisabled ? ' disabled' : '', btnType = 'button';
            switch (type) {
                case 'remove':
                    if (!self.showRemove) {
                        return '';
                    }
                    break;
                case 'cancel':
                    if (!self.showCancel) {
                        return '';
                    }
                    css += ' hide';
                    break;
                case 'upload':
                    if (!self.showUpload) {
                        return '';
                    }
                    if (self.isUploadable && !self.isDisabled) {
                        tmplt = self.getLayoutTemplate('btnLink').replace('{href}', self.uploadUrl);
                    } else {
                        btnType = 'submit';
                    }
                    break;
                case 'browse':
                    tmplt = self.getLayoutTemplate('btnBrowse');
                    break;
                default:
                    return '';
            }
            css += type === 'browse' ? ' btn-file' : ' fileinput-' + type + ' fileinput-' + type + '-button';
            return tmplt.replace('{type}', btnType)
                .replace('{css}', css)
                .replace('{title}', title)
                .replace('{status}', status)
                .replace('{icon}', icon)
                .replace('{label}', label);
        }
    }
    ;

//FileInput plugin definition
    $.fn.fileinput = function (option) {
        if (!hasFileAPISupport() && !isIE(9)) {
            return;
        }
        var args = Array.apply(null, arguments), retvals = [];
        args.shift();
        this.each(function () {
            var $this = $(this), data = $this.data('fileinput'), defaults,
                options = typeof option === 'object' && option,
                lang = options.language || $this.data('language') || 'en';

            if (!data) {
                defaults = $.extend({}, $.fn.fileinput.defaults);
                if (lang !== 'en' && !isEmpty($.fn.fileinputLocales[lang])) {
                    defaults = $.extend(defaults, $.fn.fileinputLocales[lang]);
                }
                data = new FileInput(this, $.extend(defaults, options, $this.data()));
                $this.data('fileinput', data);
            }

            if (typeof option === 'string') {
                retvals.push(data[option].apply(data, args));
            }
        });
        switch (retvals.length) {
            case 0:
                return this;
            case 1:
                return retvals[0];
            default:
                return retvals;
        }
    };

    $.fn.fileinput.defaults = {
        language: 'en',
        showCaption: true,
        showPreview: true,
        showRemove: true,
        showUpload: true,
        showCancel: true,
        showClose: true,
        showUploadedThumbs: true,
        autoReplace: false,
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
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewSettings: defaultPreviewSettings,
        fileTypeSettings: defaultFileTypeSettings,
        previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
        previewFileIconClass: 'file-icon-4x',
        previewFileIconSettings: {},
        previewFileExtSettings: {},
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
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: false,
        resizePreference: 'width',
        resizeQuality: 0.92,
        resizeDefaultImageType: 'image/jpeg',
        maxFileSize: 0,
        minFileCount: 0,
        maxFileCount: 0,
        validateInitialCount: false,
        msgValidationErrorClass: 'text-danger',
        msgValidationErrorIcon: '<i class="glyphicon glyphicon-exclamation-sign"></i> ',
        msgErrorClass: 'file-error-message',
        progressThumbClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressCompleteClass: "progress-bar progress-bar-success",
        previewFileType: 'image',
        zoomIndicator: '<i class="glyphicon glyphicon-zoom-in"></i>',
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: '<span class="close kv-error-close">&times;</span>',
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

    $.fn.fileinputLocales.en = {
        fileSingle: 'file',
        filePlural: 'files',
        browseLabel: 'Browse &hellip;',
        removeLabel: 'Remove',
        removeTitle: 'Clear selected files',
        cancelLabel: 'Cancel',
        cancelTitle: 'Abort ongoing upload',
        uploadLabel: 'Upload',
        uploadTitle: 'Upload selected files',
        msgZoomTitle: 'View details',
        msgZoomModalHeading: 'Detailed Preview',
        msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'You must select at least <b>{n}</b> {files} to upload.',
        msgFilesTooMany: 'Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.',
        msgFileNotFound: 'File "{name}" not found!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
        msgUploadAborted: 'The file upload was aborted',
        msgValidationError: 'File Upload Error',
        msgLoading: 'Loading file {index} of {files} &hellip;',
        msgProgress: 'Loading file {index} of {files} - {name} - {percent}% completed.',
        msgSelected: '{n} {files} selected',
        msgFoldersNotAllowed: 'Drag & drop files only! {n} folder(s) dropped were skipped.',
        msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',
        msgImageResizeError: 'Could not get the image dimensions to resize.',
        msgImageResizeException: 'Error while resizing the image.<pre>{errors}</pre>',
        dropZoneTitle: 'Drag & drop files here &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinputLocales.en);

    $.fn.fileinput.Constructor = FileInput;

    /**
     * Convert automatically file inputs with class 'file'
     * into a bootstrap fileinput control.
     */
    $(document).ready(function () {
        var $input = $('input.file[type=file]');
        if ($input.length) {
            $input.fileinput();
        }
    });
})
(window.jQuery);