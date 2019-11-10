/*!
 * Bootstrap Confirmation v1.0.7
 * https://github.com/tavicu/bs-confirmation
 */
+function ($) {
    'use strict';

    //var for check event at body can have only one.
    var event_body = false;

    // CONFIRMATION PUBLIC CLASS DEFINITION
    // ===============================
    var Confirmation = function (element, options) {
        var that = this;

        this.init('confirmation', element, options);

        if (options.selector) {
            $(element).on('click.bs.confirmation', options.selector, function(e) {
                e.preventDefault();
            });
        } else {
            $(element).on('show.bs.confirmation', function(event) {
                that.runCallback(that.options.onShow, event, that.$element);

                that.$element.addClass('open');

                if (that.options.singleton) {
                    $(that.options.all_selector).not(that.$element).each(function() {
                        if ($(this).hasClass('open')) {
                            $(this).confirmation('hide');
                        }
                    });
                }
            }).on('hide.bs.confirmation', function(event) {
                that.runCallback(that.options.onHide, event, that.$element);

                that.$element.removeClass('open');
            }).on('shown.bs.confirmation', function(e) {
                if (!that.isPopout() && !event_body) {
                    return;
                }

                event_body = $('body').on('click', function (e) {
                    if (that.$element.is(e.target)) return;
                    if (that.$element.has(e.target).length) return;
                    if ($('.popover').has(e.target).length) return;

                    that.hide();
                    that.inState.click = false;

                    $('body').unbind(e);

                    event_body = false;

                    return;
                });
            }).on('click.bs.confirmation', function(e) {
                e.preventDefault();
            });
        }
    }

    if (!$.fn.popover || !$.fn.tooltip) throw new Error('Confirmation requires popover.js and tooltip.js');

    Confirmation.VERSION  = '1.0.7'

    Confirmation.DEFAULTS = $.extend({}, $.fn.popover.Constructor.DEFAULTS, {
        placement       : 'right',
        title           : 'Are you sure?',
        btnOkClass      : 'btn btn-sm btn-danger',
        btnOkLabel      : 'Delete',
        btnOkIcon       : 'glyphicon glyphicon-ok',
        btnCancelClass  : 'btn btn-sm btn-default',
        btnCancelLabel  : 'Cancel',
        btnCancelIcon   : 'glyphicon glyphicon-remove',
        href            : '#',
        target          : '_self',
        singleton       : true,
        popout          : true,
        onShow          : function(event, element) {},
        onHide          : function(event, element) {},
        onConfirm       : function(event, element) {},
        onCancel        : function(event, element) {},
        template        :   '<div class="popover"><div class="arrow"></div>'
                            + '<h3 class="popover-title"></h3>'
                            + '<div class="popover-content">'
                            + ' <a data-apply="confirmation">Yes</a>'
                            + ' <a data-dismiss="confirmation">No</a>'
                            + '</div>'
                            + '</div>'
    });


    // NOTE: CONFIRMATION EXTENDS popover.js
    // ================================
    Confirmation.prototype = $.extend({}, $.fn.popover.Constructor.prototype);

    Confirmation.prototype.constructor = Confirmation;

    Confirmation.prototype.getDefaults = function () {
        return Confirmation.DEFAULTS;
    }

    Confirmation.prototype.setContent = function () {
        var that       = this;
        var $tip       = this.tip();
        var title      = this.getTitle();
        var $btnOk     = $tip.find('[data-apply="confirmation"]');
        var $btnCancel = $tip.find('[data-dismiss="confirmation"]');
        var options    = this.options

        $btnOk.addClass(this.getBtnOkClass())
            .html(this.getBtnOkLabel())
            .prepend($('<i></i>').addClass(this.getBtnOkIcon()), " ")
            .attr('href', this.getHref())
            .attr('target', this.getTarget())
            .off('click').on('click', function(event) {
                that.runCallback(that.options.onConfirm, event, that.$element);

                // If the button is a submit one
                if (that.$element.attr('type') == 'submit') {
                    var form       = that.$element.closest('form');
                    var novalidate = form.attr('novalidate') !== undefined;

                    if (novalidate || form[0].checkValidity()) {
                        form.submit();
                    }
                }

                that.hide();
                that.inState.click = false;

                that.$element.trigger($.Event('confirm.bs.confirmation'));
            });

        $btnCancel.addClass(this.getBtnCancelClass())
            .html(this.getBtnCancelLabel())
            .prepend($('<i></i>').addClass(this.getBtnCancelIcon()), " ")
            .off('click').on('click', function(event) {
                that.runCallback(that.options.onCancel, event, that.$element);

                that.hide();
                that.inState.click = false;

                that.$element.trigger($.Event('cancel.bs.confirmation'));
            });

        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);

        $tip.removeClass('fade top bottom left right in');

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
    }

    Confirmation.prototype.getBtnOkClass = function () {
        return this.$element.data('btnOkClass') ||
                (typeof this.options.btnOkClass == 'function' ? this.options.btnOkClass.call(this, this.$element) : this.options.btnOkClass);
    }

    Confirmation.prototype.getBtnOkLabel = function () {
        return this.$element.data('btnOkLabel') ||
                (typeof this.options.btnOkLabel == 'function' ? this.options.btnOkLabel.call(this, this.$element) : this.options.btnOkLabel);
    }

    Confirmation.prototype.getBtnOkIcon = function () {
        return this.$element.data('btnOkIcon') ||
                (typeof this.options.btnOkIcon == 'function' ?  this.options.btnOkIcon.call(this, this.$element) : this.options.btnOkIcon);
    }

    Confirmation.prototype.getBtnCancelClass = function () {
        return this.$element.data('btnCancelClass') ||
                (typeof this.options.btnCancelClass == 'function' ? this.options.btnCancelClass.call(this, this.$element) : this.options.btnCancelClass);
    }

    Confirmation.prototype.getBtnCancelLabel = function () {
        return this.$element.data('btnCancelLabel') ||
                (typeof this.options.btnCancelLabel == 'function' ? this.options.btnCancelLabel.call(this, this.$element) : this.options.btnCancelLabel);
    }

    Confirmation.prototype.getBtnCancelIcon = function () {
        return this.$element.data('btnCancelIcon') ||
                (typeof this.options.btnCancelIcon == 'function' ? this.options.btnCancelIcon.call(this, this.$element) : this.options.btnCancelIcon);
    }

    Confirmation.prototype.getTitle = function () {
        return this.$element.data('confirmation-title') ||
                this.$element.data('title') ||
                this.$element.attr('title') ||
                (typeof this.options.title == 'function' ? this.options.title.call(this, this.$element) : this.options.title);
    }

    Confirmation.prototype.getHref = function () {
        return this.$element.data('href') ||
                this.$element.attr('href') ||
                (typeof this.options.href == 'function' ? this.options.href.call(this, this.$element) : this.options.href);
    }

    Confirmation.prototype.getTarget = function () {
        return this.$element.data('target') ||
                this.$element.attr('target') ||
                (typeof this.options.target == 'function' ? this.options.target.call(this, this.$element) : this.options.target);
    }

    Confirmation.prototype.isPopout = function () {
        var popout = this.$element.data('popout') ||
                        (typeof this.options.popout == 'function' ? this.options.popout.call(this, this.$element) : this.options.popout);

        if (popout == 'false') popout = false;

        return popout
    }

    Confirmation.prototype.runCallback = function (callback, event, element) {
        if (typeof callback == 'function') {
            callback.call(this, event, element);
        } else if (typeof callback == 'string') {
            eval(callback);
        }
    }


    // CONFIRMATION PLUGIN DEFINITION
    // =========================
    var old = $.fn.confirmation;

    $.fn.confirmation = function (option) {
        var that = this;

        return this.each(function () {
            var $this            = $(this);
            var data             = $this.data('bs.confirmation');
            var options          = typeof option == 'object' && option;

            options              = options || {};
            options.all_selector = that.selector;

            if (!data && option == 'destroy') return;
            if (!data) $this.data('bs.confirmation', (data = new Confirmation(this, options)));
            if (typeof option == 'string') data[option]();
        });
    }

    $.fn.confirmation.Constructor = Confirmation


    // CONFIRMATION NO CONFLICT
    // ===================
    $.fn.confirmation.noConflict = function () {
        $.fn.confirmation = old;

        return this;
    }
}(jQuery);
