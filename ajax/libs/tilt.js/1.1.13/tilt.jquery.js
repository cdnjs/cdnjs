'use strict';

(function ($) {
    $.fn.tilt = function (options) {

        /**
         * RequestAnimationFrame
         */
        var requestTick = function requestTick() {
            if (this.ticking) return;
            requestAnimationFrame(updateTransforms.bind(this));
            this.ticking = true;
        };

        /**
         * Bind mouse movement evens on instance
         */
        var bindEvents = function bindEvents() {
            $(this).on('mousemove', mouseMove);
            $(this).on('mouseenter', mouseEnter);
            if (this.settings.reset) $(this).on('mouseleave', mouseLeave);
        };

        /**
         * Set transition only on mouse leave and mouse enter so it doesn't influence mouse move transforms
         */
        var setTransition = function setTransition() {
            var _this = this;

            if (this.timeout !== undefined) clearTimeout(this.timeout);
            $(this).css({ 'transition': this.settings.speed + 'ms ' + this.settings.easing });
            if (this.settings.glare) this.glareElement.css({ 'transition': 'opacity ' + this.settings.speed + 'ms ' + this.settings.easing });
            this.timeout = setTimeout(function () {
                $(_this).css({ 'transition': '' });
                if (_this.settings.glare) _this.glareElement.css({ 'transition': '' });
            }, this.settings.speed);
        };

        /**
         * When user mouse enters tilt element
         */
        var mouseEnter = function mouseEnter(event) {
            this.ticking = false;
            $(this).css({ 'will-change': 'transform' });
            setTransition.call(this);

            // Trigger change event
            $(this).trigger("tilt.mouseEnter");
        };

        /**
         * Return the x,y position of the muose on the tilt element
         * @returns {{x: *, y: *}}
         */
        var getMousePositions = function getMousePositions(event) {
            if (typeof event === "undefined") {
                event = {
                    pageX: $(this).offset().left + $(this).outerWidth() / 2,
                    pageY: $(this).offset().top + $(this).outerHeight() / 2
                };
            }
            return { x: event.pageX, y: event.pageY };
        };

        /**
         * When user mouse moves over the tilt element
         */
        var mouseMove = function mouseMove(event) {
            this.mousePositions = getMousePositions(event);
            requestTick.call(this);
        };

        /**
         * When user mouse leaves tilt element
         */
        var mouseLeave = function mouseLeave() {
            setTransition.call(this);
            this.reset = true;
            requestTick.call(this);

            // Trigger change event
            $(this).trigger("tilt.mouseLeave");
        };

        /**
         * Get tilt values
         *
         * @returns {{x: tilt value, y: tilt value}}
         */
        var getValues = function getValues() {
            var width = $(this).width();
            var height = $(this).height();
            var left = $(this).offset().left;
            var top = $(this).offset().top;
            var percentageX = (this.mousePositions.x - left) / width;
            var percentageY = (this.mousePositions.y - top) / height;
            // x or y position inside instance / width of instance = percentage of position inside instance * the max tilt value
            var tiltX = (this.settings.maxTilt / 2 - percentageX * this.settings.maxTilt).toFixed(2);
            var tiltY = (percentageY * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(2);
            // angle
            var angle = Math.atan2(this.mousePositions.x - (left + width / 2), -(this.mousePositions.y - (top + height / 2))) * (180 / Math.PI);
            // Return x & y tilt values
            return { tiltX: tiltX, tiltY: tiltY, 'percentageX': percentageX * 100, 'percentageY': percentageY * 100, angle: angle };
        };

        /**
         * Update tilt transforms on mousemove
         */
        var updateTransforms = function updateTransforms() {
            this.transforms = getValues.call(this);

            if (this.reset) {
                this.reset = false;
                $(this).css('transform', 'perspective(' + this.settings.perspective + 'px) rotateX(0deg) rotateY(0deg)');

                // Rotate glare if enabled
                if (this.settings.glare) {
                    this.glareElement.css('transform', 'rotate(180deg) scale(1.75)');
                    this.glareElement.css('opacity', '' + this.settings.maxGlare / 4);
                }

                return;
            } else {
                $(this).css('transform', 'perspective(' + this.settings.perspective + 'px) rotateX(' + (this.settings.axis === 'x' ? 0 : this.transforms.tiltY) + 'deg) rotateY(' + (this.settings.axis === 'y' ? 0 : this.transforms.tiltX) + 'deg) scale3d(' + this.settings.scale + ',' + this.settings.scale + ',' + this.settings.scale + ')');

                // Rotate glare if enabled
                if (this.settings.glare) {
                    this.glareElement.css('transform', 'rotate(' + this.transforms.angle + 'deg) scale(1.75)');
                    this.glareElement.css('opacity', '' + this.transforms.percentageY * this.settings.maxGlare / 100);
                }
            }

            // Trigger change event
            $(this).trigger("change", [this.transforms]);

            this.ticking = false;
        };

        /**
         * Prepare elements
         */
        var prepareGlare = function prepareGlare() {
            var glarePrerender = this.settings.glarePrerender;

            // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
            if (!glarePrerender)
                // Create glare element
                $(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>');

            // Store glare selector if glare is enabled
            this.glareElementWrapper = $(this).find(".js-tilt-glare");
            this.glareElement = $(this).find(".js-tilt-glare-inner");

            // Remember? We assume all css is already set, so just return
            if (glarePrerender) return;

            // Abstracted re-usable glare styles
            var stretch = {
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%'
            };

            // Style glare wrapper
            this.glareElementWrapper.css(stretch).css({
                'overflow': 'hidden'
            });

            // Style glare element
            this.glareElement.css(stretch).css({
                'background-image': 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
                'opacity': '' + this.settings.maxGlare / 2,
                'transform': 'rotate(180deg) scale(1.75)'
            });
        };

        /**
         * Public methods
         */
        $.fn.tilt.destroy = function () {
            $(this).each(function () {
                $(this).find('.js-tilt-glare').remove();
                $(this).css({ 'will-change': '', 'transform': '' });
                $(this).off('mousemove mouseenter mouseleave');
            });
        };

        $.fn.tilt.getValues = function () {
            var results = [];
            $(this).each(function () {
                this.mousePositions = getMousePositions.call(this);
                results.push(getValues.call(this));
            });
            return results;
        };

        $.fn.tilt.reset = function () {
            $(this).each(function () {
                var _this2 = this;

                this.mousePositions = getMousePositions.call(this);
                this.settings = $(this).data('settings');
                mouseLeave.call(this);
                setTimeout(function () {
                    _this2.reset = false;
                }, this.settings.transition);
            });
        };

        /**
         * Loop every instance
         */
        return this.each(function () {
            var _this3 = this;

            /**
             * Default settings merged with user settings
             * Can be set trough data attributes or as parameter.
             * @type {*}
             */
            this.settings = $.extend({
                maxTilt: $(this).is('[data-tilt-max]') ? $(this).data('tilt-max') : 20,
                perspective: $(this).is('[data-tilt-perspective]') ? $(this).data('tilt-perspective') : 300,
                easing: $(this).is('[data-tilt-easing]') ? $(this).data('tilt-easing') : 'cubic-bezier(.03,.98,.52,.99)',
                scale: $(this).is('[data-tilt-scale]') ? $(this).data('tilt-scale') : '1',
                speed: $(this).is('[data-tilt-speed]') ? $(this).data('tilt-speed') : '400',
                transition: $(this).is('[data-tilt-transition]') ? $(this).data('tilt-transition') : true,
                axis: $(this).is('[data-tilt-axis]') ? $(this).data('tilt-axis') : null,
                reset: $(this).is('[data-tilt-reset]') ? $(this).data('tilt-reset') : true,
                glare: $(this).is('[data-tilt-glare]') ? $(this).data('tilt-glare') : false,
                maxGlare: $(this).is('[data-tilt-maxglare]') ? $(this).data('tilt-maxglare') : 1
            }, options);

            this.init = function () {
                // Store settings
                $(_this3).data('settings', _this3.settings);

                // Prepare element
                if (_this3.settings.glare) prepareGlare.call(_this3);

                // Bind events
                bindEvents.call(_this3);
            };

            // Init
            this.init();
        });
    };

    /**
     * Auto load
     */
    $('[data-tilt]').tilt();
})(jQuery);
//# sourceMappingURL=tilt.jquery.js.map
