/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * https://github.com/wenzhixin/bootstrap-show-password
 * version: 1.0.1
 */

!function ($) {

    'use strict';

    // PASSWORD CLASS DEFINITION
    // ======================

    var Password = function(element, options) {
        this.options   = options;
        this.$element  = $(element);
        this.isShown = false;

        this.init();
    };

    Password.DEFAULTS = {
        white: false, // v2
        message: 'Click here to show/hide password'
    };

    Password.prototype.init = function() {
        // Create the text, icon and assign
        this.$element.wrap('<div class="input-append input-group" />');

        this.$text = $('<input type="text" />')
            .insertAfter(this.$element)
            .attr('class', this.$element.attr('class'))
            .attr('placeholder', this.$element.attr('placeholder'))
            .css('display', this.$element.css('display'))
            .val(this.$element.val()).hide();

        this.$icon = $([
            '<span tabindex="100" title="' + this.options.message + '" class="add-on input-group-addon">',
            '<i class="icon-eye-open' + (this.options.white ? ' icon-white' : '') +
                ' glyphicon glyphicon-eye-open"></i>',
            '</span>'
        ].join('')).insertAfter(this.$text).css('cursor', 'pointer');

        // events
        this.$text.off('keyup').on('keyup', $.proxy(function() {
            this.$element.val(this.$text.val());
        }, this));

        this.$icon.off('click').on('click', $.proxy(function() {
            this.$text.val(this.$element.val());
            this.toggle();
        }, this));
    };

    Password.prototype.toggle = function(_relatedTarget) {
        this[!this.isShown ? 'show' : 'hide']();
    };

    Password.prototype.show = function(_relatedTarget) {
        var e = $.Event('show.bs.password', {relatedTarget: _relatedTarget});
        this.$element.trigger(e);

        this.isShown = true;
        this.$element.hide();
        this.$text.show();
        this.$icon.find('i')
            .removeClass('icon-eye-open glyphicon-eye-open')
            .addClass('icon-eye-close glyphicon-eye-close');

        // v3 input-group
        this.$element.before(this.$text);
    };

    Password.prototype.hide = function(_relatedTarget) {
        var e = $.Event('hide.bs.password', {relatedTarget: _relatedTarget});
        this.$element.trigger(e);

        this.isShown = false;
        this.$element.show();
        this.$text.hide();
        this.$icon.find('i')
            .removeClass('icon-eye-close glyphicon-eye-close')
            .addClass('icon-eye-open glyphicon-eye-open');

        // v3 input-group
        this.$text.before(this.$element);
    };


    // PASSWORD PLUGIN DEFINITION
    // =======================

    var old = $.fn.password;

    $.fn.password = function(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('bs.password'),
                options = $.extend({}, Password.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) {
                $this.data('bs.password', (data = new Password(this, options)));
            }

            if (typeof option === 'string') {
                data[option](_relatedTarget);
            }
        });
    };

    $.fn.password.Constructor = Password;


    // PASSWORD NO CONFLICT
    // =================

    $.fn.password.noConflict = function() {
        $.fn.password = old;
        return this;
    };
    
    $(function () {
        $('[data-toggle="password"]').password();
    });

}(window.jQuery);
