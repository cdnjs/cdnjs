/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2013
 * @version 1.1.0
 *
 * A simple yet powerful JQuery star rating plugin for Bootstrap.
 * 
 * Built originally for Yii Framework 2.0. But is usable across frameworks & scenarios.
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    var DEFAULT_MIN = 1;
    var DEFAULT_MAX = 5;
    var DEFAULT_STEP = 1;


    var isEmpty = function (value, trim) {
        return typeof value === 'undefined' || value === null || value === undefined || value == []
            || value === '' || trim && $.trim(value) === '';
    };

    var validateAttr = function ($input, vattr, options) {
        var chk = isEmpty($input.data(vattr)) ? $input.attr(vattr) : $input.data(vattr);
        if (chk) {
            return chk;
        }
        return options[vattr];
    };

    // Rating public class definition
    var Rating = function (element, options) {
        this.$element = $(element);
        this.init(options);
    };
    Rating.prototype = {
        constructor: Rating,
        _parseAttr: function (vattr, options) {
            var self = this, $input = self.$element;
            if ($input.attr('type') === 'number') {
                var val = validateAttr($input, vattr, options);
                var chk = DEFAULT_STEP;
                if (vattr === 'min') {
                    chk = DEFAULT_MIN;
                }
                else if (vattr === 'max') {
                    chk = DEFAULT_MAX;
                }
                else if (vattr === 'step') {
                    chk = DEFAULT_STEP;
                }
                var final = isEmpty(val) ? chk : val;
                return parseFloat(final);
            }
            return parseFloat(options[vattr]);
        },
        listen: function () {
            var self = this;
            self.$star.on("click", function (e) {
                if (!self.inactive) {
                    self.change(e);
                }
            });
            self.$clear.on("click", function (e) {
                if (!self.inactive) {
                    self.clear();
                }
            });
        },
        init: function (options) {
            this.options = options;
            this.initialValue = parseFloat(this.$element.val());
            this.min = (typeof options.min !== 'undefined') ? options.min : this._parseAttr('min', options);
            this.max = (typeof options.max !== 'undefined') ? options.max : this._parseAttr('max', options);
            this.step = (typeof options.step !== 'undefined') ? options.step : this._parseAttr('step', options);
            if (isNaN(this.min) || isEmpty(this.min)) {
                this.min = DEFAULT_MIN;
            }
            if (isNaN(this.max) || isEmpty(this.max)) {
                this.max = DEFAULT_MAX;
            }
            if (isNaN(this.step) || isEmpty(this.step) || this.step == 0) {
                this.step = DEFAULT_STEP;
            }
            this.checkDisabled();
            this.rtl = options.rtl;
            this.showClear = options.showClear;
            this.showCaption = options.showCaption;
            this.size = options.size;
            this.defaultCaption = options.defaultCaption;
            this.starCaptions = options.starCaptions;
            this.starCaptionClasses = options.starCaptionClasses;
            this.clearButton = options.clearButton;
            this.clearButtonTitle = options.clearButtonTitle;
            this.clearButtonBaseClass = !isEmpty(options.clearButtonBaseClass) ? options.clearButtonBaseClass : 'clear-rating';
            this.clearButtonActiveClass = !isEmpty(options.clearButtonActiveClass) ? options.clearButtonActiveClass : 'clear-rating-active';
            this.clearCaption = options.clearCaption;
            this.clearCaptionClass = options.clearCaptionClass;
            this.clearValue = options.clearValue;
            this.$clearElement = options.clearElement;
            this.$captionElement = options.captionElement;
            if (typeof this.$container === 'undefined') {
                this.$container = this.createContainer();
                this.$element.before(this.$container);
                this.$element.hide();
            }
            this.$star = this.$container.children("s");
            this.$stars = this.$container.find("s");
            this.$clear = !isEmpty(this.$clearElement) ? this.$clearElement : this.$container.find('.' + this.clearButtonBaseClass);
            this.$caption = !isEmpty(this.$captionElement) ? this.$captionElement : this.$container.find(".caption");
            this.listen();
            $(this.$element[0].form).on("reset", $.proxy(this.reset, this));
            this.$container.attr({"class": this.getContainerClass()});
            if (this.showClear) {
                this.$clear.attr({"class": this.getClearClass()});
            }
        },
        checkDisabled: function () {
            this.disabled = validateAttr(this.$element, 'disabled', this.options);
            this.readonly = validateAttr(this.$element, 'readonly', this.options);
            this.inactive = (this.disabled || this.readonly);
        },
        getContainerClass: function () {
            var self = this, css = (self.rtl) ? 'star-rating-rtl' : 'star-rating';
            css += self.inactive ? ((self.disabled) ? ' ' + css + '-disabled ' : ' ') : ' ' + css + '-active ';
            css += 'rating-' + self.size;
            return css;
        },
        getClearClass: function () {
            return this.clearButtonBaseClass + ' ' + ((this.inactive) ? '' : this.clearButtonActiveClass);
        },
        createContainer: function () {
            var self = this, content = self.renderRating();
            return $(document.createElement("div")).html(content);
        },
        renderRating: function () {
            var self = this, stars = self.renderStars(), clear = self.renderClear(), caption = self.renderCaption();
            return (self.rtl) ? caption + stars + clear : clear + stars + caption;
        },
        renderStars: function () {
            var self = this, begin = '', end = '', step = ((self.step > 0) ? self.step : DEFAULT_STEP);
            var threshold = parseInt(self.max / step);
            for (var i = self.min; i <= self.max; i += step) {
                begin += (!isEmpty(self.$element.val()) && i <= self.$element.val()) ? '<s class="rated">' : '<s>';
                end += '</s>';
            }
            return begin + end;
        },
        renderClear: function () {
            var self = this;
            if (!self.showClear) {
                return '';
            }
            var css = self.getClearClass();
            if (!isEmpty(self.$clearElement)) {
                self.$clearElement.removeClass(css).addClass(css).attr({"title": self.clearButtonTitle});
                self.$clearElement.html(self.clearButton);
                return '';
            }
            return '<div class="' + css + '" title="' + self.clearButtonTitle + '">' + self.clearButton + '</div>';
        },
        renderCaption: function () {
            var self = this, val = self.$element.val();
            if (!self.showCaption) {
                return '';
            }
            var html = self.fetchCaption(val);
            if (!isEmpty(self.$captionElement)) {
                self.$captionElement.removeClass('caption').addClass('caption').attr({"title": self.clearCaption});
                self.$captionElement.html(html);
                return '';
            }
            return '<div class="caption">' + html + '</div>';
        },
        fetchCaption: function (rating) {
            var self = this;
            var val = parseFloat(rating);
            var css = isEmpty(self.starCaptionClasses[val]) ? self.clearCaptionClass : self.starCaptionClasses[val];
            var caption = isEmpty(self.starCaptions[val]) ? self.clearCaption : self.starCaptions[val];
            return '<span class="' + css + '">' + caption + '</span>';
        },
        change: function (e) {
            var self = this;
            var numStars = $(e.target).parentsUntil("div").length + 1;
            numStars = (numStars - 1) * self.step + self.min;
            var hasStars = !isEmpty(self.starCaptions[numStars]);
            var titleClass = (hasStars) ? self.starCaptionClasses[numStars] : self.clearCaptionClass;
            var cap = (hasStars) ? self.starCaptions[numStars] : self.defaultCaption.replace(/\{rating\}/g, numStars);
            var caption = '<span class="' + titleClass + '">' + cap + '</span>';
            self.$element.val(numStars);
            self.$caption.html(caption);
            self.$stars.removeClass('rated');
            $(e.target).removeClass('rated').addClass('rated');
            $(e.target).parentsUntil("div", "s").removeClass('rated').addClass('rated');
            self.$element.trigger('rating.change', [numStars, caption]);
        },
        clear: function () {
            var self = this;
            var title = '<span class="' + self.clearCaptionClass + '">' + self.clearCaption + '</span>';
            self.$stars.removeClass('rated');
            if (!self.inactive) {
                self.$caption.html(title);
            }
            self.$element.val(self.clearValue);
            self.$element.trigger('rating.clear');
        },
        refresh: function (options) {
            var self = this;
            if (arguments.length) {
                var cap = '';
                self.init($.extend(self.options, options));
                if (self.showClear) {
                    self.$clear.show();
                }
                else {
                    self.$clear.hide();
                }
                if (self.showCaption) {
                    self.$caption.show();
                }
                else {
                    self.$caption.hide();
                }
            }
        },
        update: function (val) {
            if (arguments.length) {
                var v = parseFloat(val);
                this.$element.val(v);
                this.initialValue = v;
                this.reset();
            }
        },
        reset: function () {
            var self = this, $container = self.$container, val = self.initialValue, $el = self.$caption;
            var stars = '';
            self.clear();
            if (val) {
                var last = parseInt(val / self.step);
                $container.find('s').addClass('rated');
                for (var i = self.min; i <= last * self.step; i += self.step) {
                    stars += (i === self.min) ? 's' : ' > s';
                }
                $container.find(stars + ' > s').removeClass('rated');
                if ($el) {
                    $el.html(self.fetchCaption(val));
                }
            }
            self.$element.trigger('rating.reset');
        }
    };

    //Star rating plugin definition
    $.fn.rating = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('rating'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('rating', (data = new Rating(this, $.extend({}, $.fn.rating.defaults, options, $(this).data()))));
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.rating.defaults = {
        disabled: false,
        readonly: false,
        rtl: false,
        size: 'md',
        showClear: true,
        showCaption: true,
        defaultCaption: '{rating} Stars',
        starCaptions: {
            1: 'One Star',
            2: 'Two Stars',
            3: 'Three Stars',
            4: 'Four Stars',
            5: 'Five Stars'
        },
        starCaptionClasses: {
            1: 'label label-danger',
            2: 'label label-warning',
            3: 'label label-info',
            4: 'label label-primary',
            5: 'label label-success'
        },
        clearButton: '<i class="glyphicon glyphicon-minus-sign"></i>',
        clearButtonTitle: 'Clear',
        clearButtonBaseClass: 'clear-rating',
        clearButtonActiveClass: 'clear-rating-active',
        clearCaption: 'Not Rated',
        clearCaptionClass: 'label label-default',
        clearValue: 0,
        captionElement: null,
        clearElement: null
    };

    /**
     * Convert automatically number inputs with class 'rating'
     * into the star rating control.
     */
    $(function () {
        var $input = $('input.rating[type=number]');
        if ($input.length > 0) {
            $input.rating();
        }
    });
}(jQuery));