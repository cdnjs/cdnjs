/*!
 * =============================================================
 * dropify v0.1.1 - Override your input files with style.
 * https://github.com/JeremyFagis/dropify
 *
 * (c) 2015 - Jeremy FAGIS <jeremy@fagis.fr> (http://fagis.fr)
 * =============================================================
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.Dropify = factory(root.$);
  }
}(this, function($) {
var pluginName = "dropify";

function Dropify(element, options) {
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        return;
    }

    var defaults = {
        defaultFile: '',
        maxFileSize: 0,
        messages: {
            defaultMessage: 'Drag and drop a file here or click',
            replaceMessage: 'Drag and drop or click to replace',
            removeMessage:  'Remove',
            errorMessage:   'Sorry, this file is too large'
        },
        tpl: {
            wrap:        '<div class="dropify-wrapper"></div>',
            message:     '<div class="dropify-message"><span class="file-icon" /> <p>defaultMessage</p></div>',
            preview:     '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">replaceMessage</p></div></div></div>',
            filename:    '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
            clearButton: '<button type="button" class="dropify-clear">removeMessage</button>',
            error:       '<p class="dropify-error">errorMessage</p>'
        }
    };

    this.element         = element;
    this.input           = $(this.element);
    this.wrapper         = null;
    this.preview         = null;
    this.filenameWrapper = null;
    this.settings        = $.extend(true, defaults, options, this.input.data());
    this.imgFileFormats  = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
    this.file            = null;
    this.filename        = null;
    this.isDisabled      = false;

    this.onChange = this.onChange.bind(this);

    this.translate();
    this.createElements();
    this.setSize();

    this.input.on('change', this.onChange);
}

Dropify.prototype.onChange = function()
{
    this.resetPreview();
    this.setFilename(this.input.val());
    this.readUrl(this.element);
};

Dropify.prototype.createElements = function()
{
    this.input.wrap($(this.settings.tpl.wrap));
    this.wrapper = this.input.parent();

    var messageWrapper = $(this.settings.tpl.message).insertBefore(this.input);
    $(this.settings.tpl.error).appendTo(messageWrapper);

    if (this.isTouchDevice() === true) {
        this.wrapper.addClass('touch-fallback');
    }

    if (this.input.attr('disabled')) {
        this.isDisabled = true;
        this.wrapper.addClass('disabled');
    }

    this.preview = $(this.settings.tpl.preview);
    this.preview.insertAfter(this.input);

    if (this.isDisabled === false) {
        this.clearButton = $(this.settings.tpl.clearButton);
        this.clearButton.insertAfter(this.input);

        this.clearButton.on('click', function(){
            this.clearElement();
        }.bind(this));
    }

    this.filenameWrapper = $(this.settings.tpl.filename);
    this.filenameWrapper.prependTo(this.preview.find('.dropify-infos-inner'));

    var defaultFile = this.settings.defaultFile || '';

    if (defaultFile.trim() != '') {
        this.setFilename(defaultFile);
        this.setPreview(defaultFile);
    }
};

Dropify.prototype.readUrl = function(input)
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        this.file = input.files[0];

        if (this.checkFileSize()) {
            reader.onload = function(e) {
                this.setPreview(e.target.result, this.file.name);
            }.bind(this);

            reader.readAsDataURL(this.file);
        } else {
            this.wrapper.addClass('has-error');
            this.resetPreview();
            this.clearElement();
        }
    }
};

Dropify.prototype.setPreview = function(src)
{
    this.wrapper.removeClass('has-error').addClass('has-preview');
    var render = this.preview.children('.dropify-render');

    if (this.isImage() === true) {
        $('<img />').attr('src', src).appendTo(render);
    } else {
        $('<i />').attr('class', 'dropify-font-file').appendTo(render);
        $('<span class="dropify-extension" />').html(this.getFileType()).appendTo(render);
    }

    this.preview.fadeIn();
};

Dropify.prototype.resetPreview = function()
{
    this.wrapper.removeClass('has-preview');
    var render = this.preview.children('.dropify-render');
    render.find('.dropify-extension').remove();
    render.find('i').remove();
    render.find('img').remove();
    this.preview.hide();
};

Dropify.prototype.getFilename = function(src)
{
    var filename = src.split('\\').pop();
    if (filename == src) {
        filename = src.split('/').pop();
    }

    return src != "" ? filename : '';
};

Dropify.prototype.setFilename = function(filename)
{
    var filename = this.getFilename(filename);
    this.filename = filename;
    this.filenameWrapper.children('.dropify-filename-inner').html(filename);
};

Dropify.prototype.clearElement = function()
{
    this.file = null;
    this.input.val('');
    this.resetPreview();
};

Dropify.prototype.setSize = function()
{
    if (this.settings.height) {
        this.wrapper.height(this.settings.height);
    }
};

Dropify.prototype.isTouchDevice = function()
{
    return (('ontouchstart' in window)
         || (navigator.MaxTouchPoints > 0)
         || (navigator.msMaxTouchPoints > 0));
};

Dropify.prototype.getFileType = function()
{
    return this.filename.split('.').pop().toLowerCase();
};

Dropify.prototype.isImage = function()
{
    if (this.imgFileFormats.indexOf(this.getFileType()) != "-1") {
        return true;
    }

    return false;
};

Dropify.prototype.translate = function()
{
    for (var name in this.settings.tpl) {
        for (var key in this.settings.messages) {
            this.settings.tpl[name] = this.settings.tpl[name].replace(key, this.settings.messages[key]);
        }
    }
};

Dropify.prototype.checkFileSize = function()
{
    if (this.maxFileSizeToByte() === 0 || this.file.size <= this.maxFileSizeToByte()) {
        return true;
    }

    return false;
};

Dropify.prototype.maxFileSizeToByte = function()
{
    var value = 0;

    if (this.settings.maxFileSize !== 0) {
        var unit  = this.settings.maxFileSize.slice(-1).toUpperCase(),
            kb    = 1024,
            mb    = kb * 1024,
            gb    = mb * 1024;

        if (unit === 'K') {
            value = parseFloat(this.settings.maxFileSize) * kb;
        } else if (unit === 'M') {
            value = parseFloat(this.settings.maxFileSize) * mb;
        } else if (unit === 'G') {
            value = parseFloat(this.settings.maxFileSize) * gb;
        }
    }

    return value;
};

$.fn[pluginName] = function(options) {
    this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data(this, "plugin_" + pluginName, new Dropify(this, options));
        }
    });

    return this;
};


return Dropify;
}));
