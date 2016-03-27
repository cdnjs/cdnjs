/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2013 - 2016
 * @version 4.0.0
 *
 * A simple yet powerful JQuery star rating plugin that allows rendering fractional star ratings and supports
 * Right to Left (RTL) input.
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) { // jshint ignore:line
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jshint ignore:line
    } else { // noinspection JSUnresolvedVariable
        if (typeof module === 'object' && module.exports) { // jshint ignore:line
            // Node/CommonJS
            // noinspection JSUnresolvedVariable
            module.exports = factory(require('jquery')); // jshint ignore:line
        } else {
            // Browser globals
            factory(window.jQuery);
        }
    }
}(function ($) {
    "use strict";

    $.fn.ratingLocales = {};

    var NAMESPACE, DEFAULT_MIN, DEFAULT_MAX, DEFAULT_STEP, isEmpty, getCss, addCss, validateAttr, getDecimalPlaces,
        applyPrecision, handler, Rating;
    NAMESPACE = '.rating';
    DEFAULT_MIN = 0;
    DEFAULT_MAX = 5;
    DEFAULT_STEP = 0.5;
    isEmpty = function (value, trim) {
        return value === null || value === undefined || value.length === 0 || (trim && $.trim(value) === '');
    };
    getCss = function (condition, css) {
        return condition ? ' ' + css : '';
    };
    addCss = function ($el, css) {
        $el.removeClass(css).addClass(css);
    };
    validateAttr = function ($input, vattr, options) {
        return options.vattr || $input.data(vattr) || $input.attr(vattr);
    };
    getDecimalPlaces = function (num) {
        var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    };
    applyPrecision = function (val, precision) {
        return parseFloat(val.toFixed(precision));
    };
    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event.split(' ').join(NAMESPACE + ' ') + NAMESPACE;
        $el.off(ev).on(ev, callback);
    };
    Rating = function (element, options) {
        this.$element = $(element);
        this.init(options);
    };
    Rating.prototype = {
        constructor: Rating,
        _parseAttr: function (vattr, options) {
            var self = this, $el = self.$element, elType = $el.attr('type'), finalVal, val, chk;
            if (elType === 'range' || elType === 'number') {
                val = validateAttr($el, vattr, options);
                switch (vattr) {
                    case 'min':
                        chk = DEFAULT_MIN;
                        break;
                    case 'max':
                        chk = DEFAULT_MAX;
                        break;
                    default:
                        chk = DEFAULT_STEP;
                }
                finalVal = isEmpty(val) ? chk : val;
                return parseFloat(finalVal);
            }
            return parseFloat(options[vattr]);
        },
        setDefault: function (key, val) {
            var self = this;
            if (isEmpty(self[key])) {
                self[key] = val;
            }
        },
        getPosition: function (e) {
            var pageX = isEmpty(e.pageX) ? e.originalEvent.touches[0].pageX : e.pageX;
            return pageX - this.$rating.offset().left;
        },
        listenClick: function (e, callback) {
            e.stopPropagation();
            e.preventDefault();
            if (e.handled !== true) {
                callback(e);
                e.handled = true;
            } else {
                return false;
            }
        },
        starClick: function (e) {
            var self = this, pos;
            self.listenClick(e, function (ev) {
                if (self.inactive) {
                    return false;
                }
                pos = self.getPosition(ev);
                self.setStars(pos);
                self.$element.trigger('change').trigger('rating.change', [self.$element.val(), self.$caption.html()]);
                self.starClicked = true;
            });
        },
        starMouseMove: function (e) {
            var self = this, pos, out;
            if (!self.hoverEnabled || self.inactive || (e && e.isDefaultPrevented())) {
                return;
            }
            self.starClicked = false;
            pos = self.getPosition(e);
            out = self.calculate(pos);
            self.toggleHover(out);
            self.$element.trigger('rating.hover', [out.val, out.caption, 'stars']);
        },
        starMouseLeave: function (e) {
            var self = this, out;
            if (!self.hoverEnabled || self.inactive || self.starClicked || (e && e.isDefaultPrevented())) {
                return;
            }
            out = self.cache;
            self.toggleHover(out);
            self.$element.trigger('rating.hoverleave', ['stars']);
        },
        clearClick: function (e) {
            var self = this;
            self.listenClick(e, function () {
                if (!self.inactive) {
                    self.clear();
                    self.clearClicked = true;
                }
            });
        },
        clearMouseMove: function (e) {
            var self = this, caption, val, width, out;
            if (!self.hoverEnabled || self.inactive || !self.hoverOnClear || (e && e.isDefaultPrevented())) {
                return;
            }
            self.clearClicked = false;
            caption = '<span class="' + self.clearCaptionClass + '">' + self.clearCaption + '</span>';
            val = self.clearValue;
            width = self.getWidthFromValue(val) || 0;
            out = {caption: caption, width: width, val: val};
            self.toggleHover(out);
            self.$element.trigger('rating.hover', [val, caption, 'clear']);
        },
        clearMouseLeave: function (e) {
            var self = this, out;
            if (!self.hoverEnabled || self.inactive || self.clearClicked || !self.hoverOnClear || (e && e.isDefaultPrevented())) {
                return;
            }
            out = self.cache;
            self.toggleHover(out);
            self.$element.trigger('rating.hoverleave', ['clear']);
        },
        resetForm: function (e) {
            var self = this;
            if (e && e.isDefaultPrevented()) {
                return;
            }
            if (!self.inactive) {
                self.reset();
            }
        },
        initTouch: function (e) {
            var self = this, flag = (e.type === "touchend");
            self.setTouch(e, flag);
        },
        listen: function () {
            var self = this, $form = self.$element.closest('form'), $rating = self.$rating, $clear = self.$clear;
            handler($rating, 'touchstart touchmove touchend', $.proxy(self.initTouch, self));
            handler($rating, 'click touchstart', $.proxy(self.starClick, self));
            handler($rating, 'mousemove', $.proxy(self.starMouseMove, self));
            handler($rating, 'mouseleave', $.proxy(self.starMouseLeave, self));
            if (self.showClear) {
                handler($clear, 'click touchstart', $.proxy(self.clearClick, self));
                handler($clear, 'mousemove', $.proxy(self.clearMouseMove, self));
                handler($clear, 'mouseleave', $.proxy(self.clearMouseLeave, self));
            }
            if ($form.length) {
                handler($form, 'reset', $.proxy(self.resetForm, self));
            }
        },
        destroy: function () {
            var self = this, $el = self.$element;
            if (!isEmpty(self.$container)) {
                self.$container.before($el).remove();
            }
            $.removeData($el.get(0));
            $el.off('rating').removeClass('hide');
        },
        create: function (options) {
            var self = this, $el = self.$element;
            options = options || self.options || {};
            self.destroy();
            $el.rating(options);
        },
        setTouch: function (e, flag) {
            //noinspection JSUnresolvedVariable
            var self = this, ev, touches, pos, out, caption, w, width, isTouchCapable = 'ontouchstart' in window ||
                (window.DocumentTouch && document instanceof window.DocumentTouch);
            if (!isTouchCapable || self.inactive) {
                return;
            }
            ev = e.originalEvent;
            //noinspection JSUnresolvedVariable
            touches = !isEmpty(ev.touches) ? ev.touches : ev.changedTouches;
            pos = self.getPosition(touches[0]);
            if (flag) {
                self.setStars(pos);
                self.$element.trigger('change').trigger('rating.change', [self.$element.val(), self.$caption.html()]);
                self.starClicked = true;
            } else {
                out = self.calculate(pos);
                caption = out.val <= self.clearValue ? self.fetchCaption(self.clearValue) : out.caption;
                w = self.getWidthFromValue(self.clearValue);
                width = out.val <= self.clearValue ? w + '%' : out.width;
                self.$caption.html(caption);
                self.$filledStars.css('width', width);
            }
        },
        initSlider: function (options) {
            var self = this;
            if (isEmpty(self.$element.val())) {
                self.$element.val(0);
            }
            self.initialValue = self.$element.val();
            self.setDefault('min', self._parseAttr('min', options));
            self.setDefault('max', self._parseAttr('max', options));
            self.setDefault('step', self._parseAttr('step', options));
            if (isNaN(self.min) || isEmpty(self.min)) {
                self.min = DEFAULT_MIN;
            }
            if (isNaN(self.max) || isEmpty(self.max)) {
                self.max = DEFAULT_MAX;
            }
            if (isNaN(self.step) || isEmpty(self.step) || self.step === 0) {
                self.step = DEFAULT_STEP;
            }
            self.diff = self.max - self.min;
        },
        init: function (options) {
            var self = this, $el = self.$element.addClass('hide');
            self.options = options;
            $.each(options, function (key, value) {
                self[key] = value;
            });
            self.starClicked = false;
            self.clearClicked = false;
            self.initSlider(options);
            self.checkDisabled();
            if (self.displayOnly) {
                self.inactive = true;
                self.showClear = false;
                self.showCaption = false;
            }
            self.generateRating();
            self.listen();
            $el.removeClass('rating-loading');
        },
        initHighlight: function (v) {
            var self = this, w, cap = self.$caption ? self.$caption.html() : self.defaultCaption;
            if (!v) {
                v = self.$element.val();
            }
            w = self.getWidthFromValue(v) + '%';
            self.$filledStars.width(w);
            self.cache = {caption: cap, width: w, val: v};
        },
        getContainerCss: function () {
            var self = this;
            return 'rating-container' +
                getCss(self.theme, 'theme-' + self.theme) +
                getCss(self.rtl, 'rating-rtl') +
                getCss(self.size, 'rating-' + self.size) +
                getCss(self.animate, 'rating-animate') +
                getCss(self.disabled || self.readonly, 'rating-disabled') +
                getCss(self.containerClass, self.containerClass);
        },
        checkDisabled: function () {
            var self = this, $el = self.$element, opts = self.options;
            self.disabled = opts.disabled === undefined ? $el.attr('disabled') || false : opts.disabled;
            self.readonly = opts.readonly === undefined ? $el.attr('readonly') || false : opts.readonly;
            self.inactive = (self.disabled || self.readonly);
            $el.attr({disabled: self.disabled, readonly: self.readonly});
        },
        addContent: function (type, content) {
            var self = this, $container = self.$container, $el = type === 'clear' ? self.$clear : self.$caption;
            if (!isEmpty($el)) {
                return null;
            }
            if (self.rtl) {
                return type === 'clear' ? $container.append(content) : $container.prepend(content);
            } else {
                return type === 'clear' ? $container.prepend(content) : $container.append(content);
            }
        },
        generateRating: function () {
            var self = this, $el = self.$element, $rating, $container, w;
            if (self.$container !== undefined) {
                self.$container.before(self.$element).remove();
            }
            $container = self.$container = $(document.createElement("div")).insertBefore($el);
            if (self.rtl || $el.attr('dir') === 'rtl') {
                self.rtl = true;
                $el.attr('dir', 'rtl');
            }
            addCss($container, self.getContainerCss());
            self.$rating = $rating = $(document.createElement("div")).attr('class', 'rating').appendTo($container)
                .append(self.getStars('empty')).append(self.getStars('filled'));
            self.$emptyStars = $rating.find('.empty-stars');
            self.$filledStars = $rating.find('.filled-stars');
            self.renderCaption();
            self.renderClear();
            self.initHighlight();
            $container.append($el);
            if (self.rtl) {
                w = Math.max(self.$emptyStars.outerWidth(), self.$filledStars.outerWidth());
                self.$emptyStars.width(w);
            }
        },
        getStars: function (type) {
            var self = this, stars = '<span class="' + type + '-stars">', i;
            for (i = 1; i <= self.stars; i++) {
                stars += '<span class="star">' + self[type + 'Star'] + '</span>';
            }
            return stars + '</span>';
        },
        getClearClass: function () {
            return this.clearButtonBaseClass + ' ' + ((this.inactive) ? '' : this.clearButtonActiveClass);
        },
        renderClear: function () {
            var self = this, css, $clr = self.clearElement ? $(self.clearElement) : '';
            if (!self.showClear) {
                return '';
            }
            css = self.getClearClass();
            if ($clr.length) {
                addCss($clr, css);
                $clr.attr({"title": self.clearButtonTitle}).html(self.clearButton);
                self.$clear = $clr;
                return '';
            }
            self.addContent('clear',
                '<div class="' + css + '" title="' + self.clearButtonTitle + '">' + self.clearButton + '</div>');
            self.$clear = self.$container.find('.' + self.clearButtonBaseClass);
        },
        renderCaption: function () {
            var self = this, val = self.$element.val(), html, $cap = self.captionElement ? $(self.captionElement) : '';
            if (!self.showCaption) {
                return '';
            }
            html = self.fetchCaption(val);
            if ($cap.length) {
                addCss($cap, 'caption');
                $cap.html(html);
                self.$caption = $cap;
                return;
            }
            self.addContent('caption', '<div class="caption">' + html + '</div>');
            self.$caption = self.$container.find(".caption");
        },
        fetchCaption: function (rating) {
            var self = this, val = parseFloat(rating) || self.clearValue, css, cap, capVal, cssVal, caption,
                vCap = self.starCaptions, vCss = self.starCaptionClasses;
            if (val && val !== self.clearValue) {
                val = applyPrecision(val, getDecimalPlaces(self.step));
            }
            cssVal = typeof vCss === "function" ? vCss(val) : vCss[val];
            capVal = typeof vCap === "function" ? vCap(val) : vCap[val];
            cap = isEmpty(capVal) ? self.defaultCaption.replace(/\{rating}/g, val) : capVal;
            css = isEmpty(cssVal) ? self.clearCaptionClass : cssVal;
            caption = (val === self.clearValue) ? self.clearCaption : cap;
            return '<span class="' + css + '">' + caption + '</span>';
        },
        getWidthFromValue: function (val) {
            var self = this, min = self.min, max = self.max, factor, $r = self.$emptyStars,
                w1 = $r.outerWidth(), w2 = $r.width();
            if (!val) {
                val = 0;
            }
            if (val <= min || min === max) {
                return 0;
            }
            factor = w1 ? w2 / w1 : 1;
            if (val >= max) {
                return 100;
            }
            return (val - min) * factor * 100 / (max - min);
        },
        getValueFromPosition: function (pos) {
            var self = this, precision = getDecimalPlaces(self.step), val, factor, maxWidth = self.$rating.width();
            factor = (self.diff * pos) / (maxWidth * self.step);
            factor = self.rtl ? Math.floor(factor) : Math.ceil(factor);
            val = applyPrecision(parseFloat(self.min + factor * self.step), precision);
            val = Math.max(Math.min(val, self.max), self.min);
            return self.rtl ? (self.max - val) : val;
        },
        toggleHover: function (out) {
            var self = this, w, width, caption;
            if (!out) {
                return;
            }
            if (self.hoverChangeStars) {
                w = self.getWidthFromValue(self.clearValue);
                width = out.val <= self.clearValue ? w + '%' : out.width;
                self.$filledStars.css('width', width);
            }
            if (self.hoverChangeCaption) {
                caption = out.val <= self.clearValue ? self.fetchCaption(self.clearValue) : out.caption;
                if (caption) {
                    self.$caption.html(caption + '');
                }
            }
        },
        calculate: function (pos) {
            var self = this, defaultVal = isEmpty(self.$element.val()) ? 0 : self.$element.val(),
                val = arguments.length ? self.getValueFromPosition(pos) : defaultVal,
                caption = self.fetchCaption(val), width = self.getWidthFromValue(val);
            width += '%';
            return {caption: caption, width: width, val: val};
        },
        setStars: function (pos) {
            var self = this, out = arguments.length ? self.calculate(pos) : self.calculate();
            self.$element.val(out.val);
            self.$filledStars.css('width', out.width);
            self.$caption.html(out.caption);
            self.cache = out;
        },
        clear: function () {
            var self = this, $el = self.$element,
                title = '<span class="' + self.clearCaptionClass + '">' + self.clearCaption + '</span>';
            if (!self.inactive) {
                self.$caption.html(title);
            }
            $el.val(self.clearValue);
            self.setStars();
            $el.trigger('change').trigger('rating.clear');
        },
        reset: function () {
            var self = this, $el = self.$element;
            $el.val(self.initialValue);
            self.setStars();
            $el.trigger('rating.reset');
        },
        update: function (val) {
            var self = this;
            if (!arguments.length) {
                return;
            }
            self.$element.val(val);
            self.setStars();
        },
        refresh: function (options) {
            var self = this;
            if (!arguments.length) {
                return;
            }
            self.$rating.off('rating');
            if (self.$clear !== undefined) {
                self.$clear.off();
            }
            self.init($.extend(true, self.options, options));
            if (self.showClear) {
                self.$clear.show();
            } else {
                self.$clear.hide();
            }
            if (self.showCaption) {
                self.$caption.show();
            } else {
                self.$caption.hide();
            }
            self.$element.trigger('rating.refresh');
        }
    };

    $.fn.rating = function (option) {
        var args = Array.apply(null, arguments), retvals = [];
        args.shift();
        this.each(function () {
            var self = $(this), data = self.data('rating'), options = typeof option === 'object' && option,
                lang = options.language || self.data('language') || 'en', loc = {}, opts;

            if (!data) {
                if (lang !== 'en' && !isEmpty($.fn.ratingLocales[lang])) {
                    loc = $.fn.ratingLocales[lang];
                }
                opts = $.extend(true, {}, $.fn.rating.defaults, $.fn.ratingLocales.en, loc, options, self.data());
                data = new Rating(this, opts);
                self.data('rating', data);
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

    $.fn.rating.defaults = {
        theme: '',
        language: 'en',
        stars: 5,
        filledStar: '<i class="glyphicon glyphicon-star"></i>',
        emptyStar: '<i class="glyphicon glyphicon-star-empty"></i>',
        containerClass: '',
        size: 'md',
        animate: true,
        displayOnly: false,
        rtl: false,
        showClear: true,
        showCaption: true,
        starCaptionClasses: {
            0.5: 'label label-danger',
            1: 'label label-danger',
            1.5: 'label label-warning',
            2: 'label label-warning',
            2.5: 'label label-info',
            3: 'label label-info',
            3.5: 'label label-primary',
            4: 'label label-primary',
            4.5: 'label label-success',
            5: 'label label-success'
        },
        clearButton: '<i class="glyphicon glyphicon-minus-sign"></i>',
        clearButtonBaseClass: 'clear-rating',
        clearButtonActiveClass: 'clear-rating-active',
        clearCaptionClass: 'label label-default',
        clearValue: null,
        captionElement: null,
        clearElement: null,
        hoverEnabled: true,
        hoverChangeCaption: true,
        hoverChangeStars: true,
        hoverOnClear: true
    };

    $.fn.ratingLocales.en = {
        defaultCaption: '{rating} Stars',
        starCaptions: {
            0.5: 'Half Star',
            1: 'One Star',
            1.5: 'One & Half Star',
            2: 'Two Stars',
            2.5: 'Two & Half Stars',
            3: 'Three Stars',
            3.5: 'Three & Half Stars',
            4: 'Four Stars',
            4.5: 'Four & Half Stars',
            5: 'Five Stars'
        },
        clearButtonTitle: 'Clear',
        clearCaption: 'Not Rated'
    };

    $.fn.rating.Constructor = Rating;

    /**
     * Convert automatically inputs with class 'rating' into Krajee's star rating control.
     */
    $(document).ready(function () {
        var $input = $('input.rating');
        if ($input.length) {
            $input.removeClass('rating-loading').addClass('rating-loading').rating();
        }
    });
}));