/*!
 * glidejs
 * Version: 2.0.9
 * Glide is a responsive and touch-friendly jQuery slider. Based on CSS3 transitions with fallback to older broswers. It's simple, lightweight and fast.
 * Author: Jędrzej Chałubek <jedrzej.chalubek@gmail.com>
 * Site: http://http://glide.jedrzejchalubek.com/
 * Licensed under the MIT license
 */

;(function($, window, document, undefined){
/**
 * Animation module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Animation}
 */
var Animation = function(Glide, Core) {

    /**
     * Animation offset value.
     *
     * @var {Number}
     */
    var offset;

    /**
     * Animation constructor.
     */
    function Animation() {

    }

    /**
     * Make configured animation type.
     *
     * @param  {Number} displacement
     * @return {self}
     */
    Animation.prototype.make = function(displacement) {
        // Do not run if we have only one slide.
        if (! Core.Run.canProcess()) {
            return Core.Arrows.disable();
        }

        // Parse displacement to integer before use.
        offset = (typeof displacement !== 'undefined') ? parseInt(displacement) : 0;

        // Animation actual translate animation
        this[Glide.options.type]();

        return this;
    };


    /**
     * After animation callback.
     *
     * @param  {Function} callback
     * @return {Integer}
     */
    Animation.prototype.after = function(callback) {
        return setTimeout(function() {
            callback();
        }, Glide.options.animationDuration + 20);
    };


    /**
     * Slider animation type.
     *
     * @return {Void}
     */
    Animation.prototype.slider = function() {

        var translate = Glide[Glide.size] * (Glide.current - 1);
        var shift = Core.Clones.shift - Glide.paddings;

        // If we are on the first slide.
        if (Core.Run.isStart()) {
            if (Glide.options.centered) {
                shift = Math.abs(shift);
            }
            // Shift is zero.
            else {
                shift = 0;
            }
            // Hide previous arrow.
            Core.Arrows.disable('prev');
        }

        // If we are on the last slide.
        else if (Core.Run.isEnd()) {
            if (Glide.options.centered) {
                shift = Math.abs(shift);
            }
            // Double and absolute shift.
            else {
                shift = Math.abs(shift * 2);
            }
            // Hide next arrow.
            Core.Arrows.disable('next');
        }

        // We are not on the edge cases.
        else {
            // Absolute shift
            shift = Math.abs(shift);
            // Show arrows.
            Core.Arrows.enable();
        }

        // Apply translate to
        // the slider track.
        Glide.track.css({
            'transition': Core.Transition.get('all'),
            'transform': Core.Translate.set(Glide.axis, translate - shift - offset)
        });

    };


    /**
     * Carousel animation type
     *
     * @return {Void}
     */
    Animation.prototype.carousel = function() {

        // Get translate value by multiplying two
        // slider size and current slide number.
        var translate = Glide[Glide.size] * Glide.current;

        // Get animation shift.
        var shift;

        // Calculate animation shift.
        if (Glide.options.centered) {
            // Decrease clones shift with slider
            // paddings, because slider is centered.
            shift = Core.Clones.shift - Glide.paddings;
        } else {
            // Shif is only clones shift.
            shift = Core.Clones.shift;
        }

        // The flag is set and direction is previous,
        // so we are on the first slide and need
        // to make offset translate.
        if (Core.Run.isOffset('<')) {

            // Translate is 0 (left edge of the track).
            translate = 0;

            // Take off flag.
            Core.Run.flag = false;

            // Clear transition and jump to last slide,
            // after offset animation is done.
            this.after(function() {
                Glide.track.css({
                    'transition': Core.Transition.clear('all'),
                    'transform': Core.Translate.set(Glide.axis, Glide[Glide.size] * Glide.length + shift)
                });
            });

        }


        // The flag is set and direction is next,
        // so we're on the last slide and need
        // to make offset translate.
        if (Core.Run.isOffset('>')) {

            // Translate is slides width * length with addtional
            // offset (right edge of the track).
            translate = (Glide[Glide.size] * Glide.length) + Glide[Glide.size];

            // Reset flag
            Core.Run.flag = false;

            // Clear transition and jump to the first slide,
            // after offset animation is done.
            this.after(function() {
                Glide.track.css({
                    'transition': Core.Transition.clear('all'),
                    'transform': Core.Translate.set(Glide.axis, Glide[Glide.size] + shift)
                });
            });

        }

        /**
         * Actual translate apply to wrapper
         * overwrite transition (can be pre-cleared)
         */
        Glide.track.css({
            'transition': Core.Transition.get('all'),
            'transform': Core.Translate.set(Glide.axis, translate + shift - offset)
        });

    };


    /**
     * Slideshow animation type.
     *
     * @return {Void}
     */
    Animation.prototype.slideshow = function() {

        Glide.slides.css('transition', Core.Transition.get('opacity'))
            .eq(Glide.current - 1).css('opacity', 1)
            .siblings().css('opacity', 0);

    };

    // Return class.
    return new Animation();

};
;/**
 * Api module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Api}
 */
var Api = function(Glide, Core) {

    /**
     * Api constructor.
     */
    function Api() {

    }

    /**
     * Api instance.
     *
     * @return {Object}
     */
    Api.prototype.instance = function() {

        return {

            /**
             * Get current slide index.
             *
             * @return {Integer}
             */
            current: function() {
                return Glide.current;
            },


            /**
             * Go to specifed slide.
             *
             * @param  {String} distance
             * @param  {Function} callback
             * @return {Void}
             */
            go: function(distance, callback) {
                Core.Run.pause();
                Core.Run.make(distance, callback);
                Core.Run.play();
            },


            /**
             * Jump without animation to specifed slide
             *
             * @param  {String} distance
             * @param  {Function} callback
             * @return {Void}
             */
            jump: function(distance, callback) {

                // Let know that we want jumping.
                Core.Transition.jumping = true;

                // Take off jumping flag,
                // after animation.
                Core.Animation.after(function() {

                    Core.Transition.jumping = false;
                });

                // Move slider.
                Core.Run.make(distance, callback);

            },


            /**
             * Move slider by passed distance.
             *
             * @param  {Integer} distance
             * @return {Void}
             */
            move: function(distance) {
                Core.Transition.jumping = true;
                Core.Animation.make(distance);
                Core.Transition.jumping = false;
            },


            /**
             * Start autoplay.
             *
             * @return {Void}
             */
            start: function(interval) {

                // We want running, turn on flag.
                Core.Run.running = true;

                // Set autoplay duration.
                Glide.options.autoplay = parseInt(interval);

                // Run autoplay.
                Core.Run.play();

            },


            /**
             * Run autoplay.
             *
             * @return {Boolean}
             */
            play: function() {
                return Core.Run.play();
            },


            /**
             * Pause autoplay.
             *
             * @return {Integer}
             */
            pause: function() {
                return Core.Run.pause();
            },


            /**
             * Destroy slider.
             *
             * @return {Void}
             */
            destroy: function() {

                Core.Run.pause();
                Core.Clones.remove();
                Core.Helper.removeStyles([Glide.track, Glide.slides]);
                Core.Bullets.remove();
                Glide.slider.removeData('glide_api');

                Core.Events.unbind();
                Core.Touch.unbind();
                Core.Arrows.unbind();
                Core.Bullets.unbind();

                Glide.destroyed = true;

                delete Glide.slider;
                delete Glide.track;
                delete Glide.slides;
                delete Glide.width;
                delete Glide.length;

            },


            /**
             * Refresh slider.
             *
             * @return {Void}
             */
            refresh: function() {
                Core.Run.pause();
                Glide.collect();
                Glide.setup();
                Core.Clones.remove().init();
                Core.Bullets.remove().init();
                Core.Build.init();
                Core.Run.make('=' + parseInt(Glide.options.startAt), Core.Run.play());
            },

        };

    };


    // Return class.
    return new Api();


};
;/**
 * Arrows module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Arrows}
 */
var Arrows = function(Glide, Core) {


    /**
     * Arrows constructor.
     */
    function Arrows() {
        this.build();
        this.bind();
    }


    /**
     * Build arrows. Gets DOM elements.
     *
     * @return {Void}
     */
    Arrows.prototype.build = function() {
        this.wrapper = Glide.slider.find('.' + Glide.options.classes.arrows);
        this.items = this.wrapper.children();
    };


    /**
     * Disable next/previous arrow and enable another.
     *
     * @param {String} type
     * @return {Void}
     */
    Arrows.prototype.disable = function(type) {
        var classes = Glide.options.classes;

        if (!type) {
            return this.disableBoth();
        }

        this.items.filter('.' + classes['arrow' + Core.Helper.capitalise(type)])
            .unbind('click.glide touchstart.glide')
            .addClass(classes.disabled)
            .siblings()
            .bind('click.glide touchstart.glide', this.click)
            .bind('mouseenter.glide', this.hover)
            .bind('mouseleave.glide', this.hover)
            .removeClass(classes.disabled);
    };

    /**
     * Disable both arrows.
     *
     * @return {Void}
     */
    Arrows.prototype.disableBoth = function() {
        this.items
            .unbind('click.glide touchstart.glide')
            .addClass(Glide.options.classes.disabled);
    };


    /**
     * Show both arrows.
     *
     * @return {Void}
     */
    Arrows.prototype.enable = function() {
        this.bind();

        this.items.removeClass(Glide.options.classes.disabled);
    };

    /**
     * Arrow click event.
     *
     * @param {Object} event
     * @return {Void}
     */
    Arrows.prototype.click = function(event) {
        event.preventDefault();

        if (!Core.Events.disabled) {
            Core.Run.pause();
            Core.Run.make($(this).data('glide-dir'));
            Core.Animation.after(function() {
                Core.Run.play();
            });
        }
    };

    /**
     * Arrows hover event.
     *
     * @param {Object} event
     * @return {Void}
     */
    Arrows.prototype.hover = function(event) {
        if (!Core.Events.disabled) {

            switch (event.type) {
                // Start autoplay on mouse leave.
                case 'mouseleave':
                    Core.Run.play();
                    break;
                // Pause autoplay on mouse enter.
                case 'mouseenter':
                    Core.Run.pause();
                    break;
            }

        }
    };

    /**
     * Bind arrows events.
     *
     * @return {Void}
     */
    Arrows.prototype.bind = function() {
        this.items
            .on('click.glide touchstart.glide', this.click)
            .on('mouseenter.glide', this.hover)
            .on('mouseleave.glide', this.hover);
    };


    /**
     * Unbind arrows events.
     *
     * @return {Void}
     */
    Arrows.prototype.unbind = function() {
        this.items
            .off('click.glide touchstart.glide')
            .off('mouseenter.glide')
            .off('mouseleave.glide');
    };


    // Return class.
    return new Arrows();

};
;/**
 * Build module.
 *
 * @param {[type]} Glide
 * @param {[type]} Core
 * @return {Build}
 */
var Build = function(Glide, Core) {

    // Build constructor.
    function Build() {
        this.init();
    }

    /**
     * Init slider builder.
     *
     * @return {Void}
     */
    Build.prototype.init = function() {
        // Build proper slider type
        this[Glide.options.type]();

        // Set slide active class
        this.active();

        // Set slides height
        Core.Height.set();
    };

    /**
     * Check slider type.
     *
     * @param  {String} name
     * @return {Boolean}
     */
    Build.prototype.isType = function(name) {
        return Glide.options.type === name;
    };

    /**
     * Check slider mode.
     *
     * @param  {String} name
     * @return {Boolean}
     */
    Build.prototype.isMode = function(name) {
        return Glide.options.mode === name;
    };

    /**
     * Build slider type.
     *
     * @return {Void}
     */
    Build.prototype.slider = function() {

        // Turn on jumping flag.
        Core.Transition.jumping = true;

        // Apply slides width.
        Glide.slides[Glide.size](Glide[Glide.size]);

        // Apply translate.
        Glide.track.css(Glide.size, Glide[Glide.size] * Glide.length);

        // If mode is vertical apply height.
        if (this.isMode('vertical')) {
            Core.Height.set(true);
        }

        // Go to startup position.
        Core.Animation.make();

        // Turn off jumping flag.
        Core.Transition.jumping = false;

    };

    /**
     * Build carousel type.
     *
     * @return {Void}
     */
    Build.prototype.carousel = function() {

        // Turn on jumping flag.
        Core.Transition.jumping = true;

        // Update shift for carusel type.
        Core.Clones.shift = (Glide[Glide.size] * Core.Clones.items.length / 2) - Glide[Glide.size];

        // Apply slides width.
        Glide.slides[Glide.size](Glide[Glide.size]);

        // Apply translate.
        Glide.track.css(Glide.size, (Glide[Glide.size] * Glide.length) + Core.Clones.getGrowth());

        // If mode is vertical apply height.
        if (this.isMode('vertical')) {
            Core.Height.set(true);
        }

        // Go to startup position.
        Core.Animation.make();

        // Append clones.
        Core.Clones.append();

        // Turn off jumping flag.
        Core.Transition.jumping = false;

    };

    /**
     * Build slideshow type.
     *
     * @return {Void}
     */
    Build.prototype.slideshow = function() {

        // Turn on jumping flag
        Core.Transition.jumping = true;

        // Go to startup position
        Core.Animation.make();

        // Turn off jumping flag
        Core.Transition.jumping = false;

    };

    /**
     * Set active class to current slide.
     *
     * @return {Void}
     */
    Build.prototype.active = function() {

        Glide.slides
            .eq(Glide.current - 1).addClass(Glide.options.classes.active)
            .siblings().removeClass(Glide.options.classes.active);

    };

    // Return class.
    return new Build();

};
;/**
 * Bullets module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Bullets}
 */
var Bullets = function(Glide, Core) {

    /**
     * Bullets constructor.
     */
    function Bullets() {
        this.init();
        this.bind();
    }

    /**
     * Init bullets builder.
     *
     * @return {self}
     */
    Bullets.prototype.init = function() {
        this.build();
        this.active();

        return this;
    };

    /**
     * Get DOM and setup bullets.
     *
     * @return {Void}
     */
    Bullets.prototype.build = function() {

        // Get bullets wrapper.
        this.wrapper = Glide.slider.children('.' + Glide.options.classes.bullets);

        // Set class and direction to each bullet.
        for (var i = 1; i <= Glide.length; i++) {
            $('<button>', {
                'class': Glide.options.classes.bullet,
                'data-glide-dir': '=' + i
            }).appendTo(this.wrapper);
        }

        // Get all bullets.
        this.items = this.wrapper.children();

    };

    /**
     * Handle active class. Adding and removing active class.
     *
     * @return {Void}
     */
    Bullets.prototype.active = function() {
        this.items.eq(Glide.current - 1)
            .addClass('active')
            .siblings().removeClass('active');
    };

    /**
     * Delete all bullets.
     *
     * @return {self}
     */
    Bullets.prototype.remove = function() {
        this.items.remove();

        return this;
    };

    /**
     * Bullet click event.
     *
     * @param {Object} event
     */
    Bullets.prototype.click = function(event) {
        event.preventDefault();

        if (!Core.Events.disabled) {
            Core.Run.pause();
            Core.Run.make($(this).data('glide-dir'));
            Core.Animation.after(function() {
                Core.Run.play();
            });
        }
    };

    /**
     * Bullets hover event.
     *
     * @param {Object} event
     * @return {Void}
     */
    Bullets.prototype.hover = function(event) {
        if (!Core.Events.disabled) {

            switch (event.type) {
                // Start autoplay on mouse leave.
                case 'mouseleave':
                    Core.Run.play();
                    break;
                // Pause autoplay on mouse enter.
                case 'mouseenter':
                    Core.Run.pause();
                    break;
            }

        }
    };

    /**
     * Bind bullets events.
     *
     * @return {Void}
     */
    Bullets.prototype.bind = function() {
        this.wrapper
            .on('click.glide touchstart.glide', 'button', this.click)
            .on('mouseenter.glide', 'button', this.hover)
            .on('mouseleave.glide', 'button', this.hover);
    };

    /**
     * Unbind bullets events.
     *
     * @return {Void}
     */
    Bullets.prototype.unbind = function() {
        this.wrapper
            .off('click.glide touchstart.glide', 'button')
            .off('mouseenter.glide', 'button')
            .off('mouseleave.glide', 'button');
    };

    // Return class.
    return new Bullets();

};
;/**
 * Clones module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Void}
 */
var Clones = function(Glide, Core) {

    /**
     * Clones position map.
     *
     * @type {Array}
     */
    var map = [0, 1];

    /**
     * Clones order pattern.
     *
     * @type {Array}
     */
    var pattern;

    /**
     * Clones constructor.
     */
    function Clones() {
        this.items = [];
        this.shift = 0;

        this.init();
    }

    /**
     * Init clones builder.
     *
     * @return {self}
     */
    Clones.prototype.init = function() {

        // Map clones order pattern.
        this.map();

        // Collect slides to clone
        // with created pattern.
        this.collect();

        return this;

    };

    /**
     * Generate clones pattern.
     *
     * @return {Void}
     */
    Clones.prototype.map = function() {
        var i;
        pattern = [];

        for (i = 0; i < map.length; i++) {
            pattern.push(-1 - i, i);
        }
    };

    /**
     * Collect clones with pattern.
     *
     * @return {Void}
     */
    Clones.prototype.collect = function() {
        var item;
        var i;

        for (i = 0; i < pattern.length; i++) {
            item = Glide.slides.eq(pattern[i])
                .clone().addClass(Glide.options.classes.clone);

            this.items.push(item);
        }
    };

    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    Clones.prototype.append = function() {
        var i;
        var item;

        for (i = 0; i < this.items.length; i++) {
            item = this.items[i][Glide.size](Glide[Glide.size]);

            // Append clone if pattern position is positive.
            if (pattern[i] >= 0) {
                item.appendTo(Glide.track);
            // Prepend clone if pattern position is negative.
            } else {
                item.prependTo(Glide.track);
            }
        }
    };

    /**
     * Remove all cloned slides.
     *
     * @return {self}
     */
    Clones.prototype.remove = function() {
        var i;

        for (i = 0; i < this.items.length; i++) {
            this.items[i].remove();
        }

        return this;
    };

    /**
     * Get size grow caused by clones.
     *
     * @return {Number}
     */
    Clones.prototype.getGrowth = function() {
        return Glide.width * this.items.length;
    };

    // Return class.
    return new Clones();

};
;/**
 * Glide core.
 *
 * @param {Object} Glide
 * @param {Object} Modules
 * @return {Core}
 */
var Core = function(Glide, Modules) {

    /**
     * Core constructor. Construct modules and
     * inject Glide and Core as dependency.
     *
     * @return {Void}
     */
    function Core() {

        for (var module in Modules) {
            this[module] = new Modules[module](Glide, this);
        }

    }

    // Return class.
    return new Core();

};
;/**
 * Events module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Events}
 */
var Events = function(Glide, Core) {

    /**
     * Collection of triggers.
     *
     * @type {Object}
     */
    var triggers = $('[data-glide-trigger]');

    /**
     * Events constructor.
     */
    function Events() {
        this.disabled = false;
        this.prevented = false;

        this.keyboard();
        this.hoverpause();
        this.resize();
        this.bindTriggers();
        this.bindAnchors();
        this.bindImages();
    }

    /**
     * Bind keyboard events.
     *
     * @return {Void}
     */
    Events.prototype.keyboard = function() {
        if (Glide.options.keyboard) {
            $(window).on('keyup.glide', function(event) {
                if (event.keyCode === 39) {
                    Core.Run.make('>');
                }
                if (event.keyCode === 37) {
                    Core.Run.make('<');
                }
            });
        }
    };

    /**
     * Bind hoverpause event.
     *
     * @return {Void}
     */
    Events.prototype.hoverpause = function() {

        if (Glide.options.hoverpause) {

            Glide.track
                .on('mouseover.glide', function() {
                    Core.Run.pause();
                    Core.Events.trigger('mouseOver');
                })
                .on('mouseout.glide', function() {
                    Core.Run.play();
                    Core.Events.trigger('mouseOut');
                });

        }

    };

    /**
     * Bind resize window event.
     *
     * @return {Void}
     */
    Events.prototype.resize = function() {

        $(window).on('resize.glide.' + Glide.uuid, Core.Helper.throttle(function() {
            if(!Glide.destroyed) {
                Core.Transition.jumping = true;
                Glide.setup();
                Core.Build.init();
                Core.Run.make('=' + Glide.current, false);
                Core.Run.play();
                Core.Transition.jumping = false;
            }
        }, Glide.options.throttle));

    };

    /**
     * Bind triggers events.
     *
     * @return {Void}
     */
    Events.prototype.bindTriggers = function() {
        if (triggers.length) {
            triggers
                .off('click.glide touchstart.glide')
                .on('click.glide touchstart.glide', this.handleTrigger);
        }
    };

    /**
     * Hande trigger event.
     *
     * @param {Object} event
     * @return {Void}
     */
    Events.prototype.handleTrigger = function(event) {
        event.preventDefault();

        var targets = $(this).data('glide-trigger').split(" ");

        if (!this.disabled) {
            for (var el in targets) {
                var target = $(targets[el]).data('glide_api');
                target.pause();
                target.go($(this).data('glide-dir'), this.activeTrigger);
                target.play();
            }
        }
    };

    /**
     * Bind events to anchors inside track.
     *
     * @return {Void}
     */
    Events.prototype.bindAnchors = function() {
        Glide.track.on('click.glide', 'a', function(e) {
            if (this.prevented) {
                e.preventDefault();
            }
        }.bind(this));
    };

    /**
     * Bind events to images inside track.
     *
     * @return {Void}
     */
    Events.prototype.bindImages = function() {
        Glide.track.on('dragstart.glide', 'img', function(e) {
            if (this.prevented) {
                e.preventDefault();
            }
        }.bind(this));
    };

    /**
     * Detach anchors clicks inside track.
     *
     * @return {self}
     */
    Events.prototype.detachClicks = function(event) {
        Glide.track.find('a').each(function(i, a) {
            $(a)
                .attr('data-href', $(a).attr('href'))
                .removeAttr('href');
        });

        return this;
    };

    /**
     * Attach anchors clicks inside track.
     *
     * @return {self}
     */
    Events.prototype.attachClicks = function(event) {
        Glide.track.find('a').each(function(i, a) {
            $(a)
                .attr('href', $(a).attr('data-href'))
                .removeAttr('data-href');
        });

        Core.Animation.after(function() {
            this.prevented = false;
        }.bind(this));

        return this;
    };

    /**
     * Prevent anchors clicks inside track.
     *
     * @return {self}
     */
    Events.prototype.preventClicks = function() {
        this.prevented = true;

        return this;
    };

    /*
     * Call event function with parameters.
     *
     * @param {Function} func
     * @return {self}
     */
    Events.prototype.call = function(func) {
        if ((func !== 'undefined') && (typeof func === 'function')) {
            func(this.getParams());
        }

        return this;
    };

    /**
     * Trigger event.
     *
     * @param  {String} name
     * @return {self}
     */
    Events.prototype.trigger = function(name) {
        Glide.slider.trigger(name + ".glide", [this.getParams()]);

        return this;
    };

    /**
     * Get parameters for events callback.
     *
     * @return {Object}
     */
    Events.prototype.getParams = function() {
        return {
            index: Glide.current,
            length: Glide.slides.length,
            current: Glide.slides.eq(Glide.current - 1),
            slider: Glide.slider,
            swipe: {
                distance: (Core.Touch.distance || 0)
            }
        };
    };

    /*
     * Unbind all events.
     *
     * @return {Void}
     */
    Events.prototype.unbind = function() {

        Glide.track
            .off('click.glide', 'a')
            .off('dragstart.glide', 'img')
            .off('keyup.glide')
            .off('mouseover.glide')
            .off('mouseout.glide');

        triggers
            .off('click.glide touchstart.glide');

        $(window)
            .off('keyup.glide')
            .off('resize.glide.' + Glide.uuid);

    };

    /**
     * Disable all events.
     *
     * @return {self}
     */
    Events.prototype.disable = function() {
        this.disabled = true;

        return this;
    };

    /**
     * Enable all events.
     *
     * @return {self}
     */
    Events.prototype.enable = function() {
        this.disabled = false;

        return this;
    };

    // Return class.
    return new Events();

};
;/**
 * Height module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Height}
 */
var Height = function(Glide, Core) {

    /**
     * Height constructor.
     */
    function Height() {
        if (Glide.options.autoheight) {
            Glide.wrapper.css({
                'transition': Core.Transition.get('height'),
            });
        }
    }

    /**
     * Get current slide height.
     *
     * @return {Number}
     */
    Height.prototype.get = function() {
        var offset = (Glide.axis === 'y') ? Glide.paddings * 2 : 0;

        return Glide.slides.eq(Glide.current - 1).height() + offset;
    };

    /**
     * Set slider height.
     *
     * @param {Boolean} force Force height setting even if option is turn off.
     * @return {Boolean}
     */
    Height.prototype.set = function(force) {
        return (Glide.options.autoheight || force) ? Glide.wrapper.height(this.get()) : false;
    };

    // @return Height
    return new Height();

};
;/**
 * helper module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Helper}
 */
var Helper = function(Glide, Core) {

    /**
     * Helper constructor.
     */
    function Helper() {
    }

    /**
     * If slider axis is vertical (y axis) return vertical value
     * else axis is horizontal (x axis) so return horizontal value.
     *
     * @param  {Mixed} hValue
     * @param  {Mixed} vValue
     * @return {Mixed}
     */
    Helper.prototype.byAxis = function(hValue, vValue) {
        if (Glide.axis === 'y') {
            return vValue;
        }

        return hValue;
    };

    /**
     * Capitalise string.
     *
     * @param  {String} s
     * @return {String}
     */
    Helper.prototype.capitalise = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    /**
     * Get time.
     *
     * @version Underscore.js 1.8.3
     * @source http://underscorejs.org/
     * @copyright (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors. Underscore may be freely distributed under the MIT license.
     * @return {String}
     */
    Helper.prototype.now = Date.now || function() {
        return new Date().getTime();
    };

    /**
     * Throttle.
     *
     * @version Underscore.js 1.8.3
     * @source http://underscorejs.org/
     * @copyright (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors. Underscore may be freely distributed under the MIT license.
     */
    Helper.prototype.throttle = function(func, wait, options) {
        var that = this;
        var context;
        var args;
        var result;
        var timeout = null;
        var previous = 0;
        if (!options) {
            options = {};
        }
        var later = function() {
            previous = options.leading === false ? 0 : that.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        };
        return function() {
            var now = that.now();
            if (!previous && options.leading === false) {
                previous = now;
            }
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) {
                    context = args = null;
                }
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };

    /**
     * Remove transition.
     *
     * @return {Void}
     */
    Helper.prototype.removeStyles = function(elements) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].removeAttr('style');
        }
    };

    // Return class.
    return new Helper();

};
;/**
 * Run module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Run}
 */
var Run = function(Glide, Core) {

    /**
     * Run constructor.
     */
    function Run() {

        // Running flag. It's in use when autoplay is disabled
        // via options, but we want start autoplay via api.
        this.running = false;

        // Flag for offcanvas animation to cloned slides
        this.flag = false;

        // Start running.
        this.play();
    }

    /**
     * Setup and start autoplay run.
     *
     * @return {Integer/Undefined}
     */
    Run.prototype.play = function() {

        var that = this;

        if (! this.canProcess()) {
            return;
        }

        if (Glide.options.autoplay || this.running) {

            if (typeof this.interval === 'undefined') {
                this.interval = setInterval(function() {
                    that.pause();
                    that.make('>');
                    that.play();
                }, this.getInterval());
            }

        }

        return this.interval;

    };

    /**
     * Get autoplay interval cunfigured on each slide.
     *
     * @return {Number}
     */
    Run.prototype.getInterval = function() {
        return parseInt(Glide.slides.eq(Glide.current - 1).data('glide-autoplay')) || Glide.options.autoplay;
    };

    /**
     * Pasue autoplay animation and clear interval.
     *
     * @return {Integer/Undefined}
     */
    Run.prototype.pause = function() {

        if (Glide.options.autoplay || this.running) {
            if (this.interval >= 0) {
                this.interval = clearInterval(this.interval);
            }
        }

        return this.interval;

    };

    /**
     * Check if we are on the first slide.
     *
     * @return {Boolean}
     */
    Run.prototype.isStart = function() {
        return Glide.current === 1;
    };

    /**
     * Check if we are on the last slide.
     *
     * @return {Boolean}
     */
    Run.prototype.isEnd = function() {
        return Glide.current === Glide.length;
    };

    /**
     * Check if we are making offset run.
     *
     * @return {Boolean}
     */
    Run.prototype.isOffset = function(direction) {
        return this.flag && this.direction === direction;
    };

    /**
     * Run move animation.
     *
     * @param {String} move Code in pattern {direction}{steps} eq. "=3"
     * @param {Function} callback
     * @return {Void}
     */
    Run.prototype.make = function(move, callback) {

        // Store scope.
        var that = this;

        // Extract move direction.
        this.direction = move.substr(0, 1);

        // Extract move steps.
        this.steps = (move.substr(1)) ? move.substr(1) : 0;

        // Do not run if we have only one slide.
        if (! this.canProcess()) {
            return this.stop();
        }

        // Stop autoplay until hoverpause is not set.
        if (!Glide.options.hoverpause) {
            this.pause();
        }

        // Disable events and call before transition callback.
        if (callback !== false) {
            Core.Events.disable()
                .call(Glide.options.beforeTransition)
                .trigger('beforeTransition');
        }

        // Based on direction.
        switch (this.direction) {

            case '>':
                // When we at last slide and move forward and steps are
                // number, set flag and current slide to first.
                if (this.isEnd()) {
                    Glide.current = 1;
                    this.flag = true;
                }
                // When steps is not number, but '>'
                // scroll slider to end.
                else if (this.steps === '>') {
                    Glide.current = Glide.length;
                }
                // Otherwise change normally.
                else {
                    Glide.current = Glide.current + 1;
                }
                break;

            case '<':
                // When we at first slide and move backward and steps
                // are number, set flag and current slide to last.
                if (this.isStart()) {
                    Glide.current = Glide.length;
                    this.flag = true;
                }
                // When steps is not number, but '<'
                // scroll slider to start.
                else if (this.steps === '<') {
                    Glide.current = 1;
                }
                // Otherwise change normally.
                else {
                    Glide.current = Glide.current - 1;
                }
                break;

            case '=':
                // Jump to specifed slide.
                Glide.current = parseInt(this.steps);
                break;

        }

        // Set slides height.
        Core.Height.set();

        // Set active bullet.
        Core.Bullets.active();

        // Run actual translate animation.
        Core.Animation.make().after(function() {

            // Set active flags.
            Core.Build.active();

            // Enable events and call callbacks.
            if (callback !== false) {
                Core.Events.enable()
                    .call(callback)
                    .call(Glide.options.afterTransition)
                    .trigger('afterTransition');
            }

            // Start autoplay until hoverpause is not set.
            if (!Glide.options.hoverpause) {
                that.play();
            }

        });

        // Trigger durning animation event.
        Core.Events
            .call(Glide.options.duringTransition)
            .trigger('duringTransition');

    };

    /**
     * Stop slider from running.
     *
     * @return {void}
     */
    Run.prototype.stop = function() {
        this.pause();
    };

    /**
     * Stop slider from running.
     *
     * @return {void}
     */
    Run.prototype.canProcess = function() {
        return Glide.slides.length > 1;
    };

    // Return class.
    return new Run();

};
;/**
 * Touch module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Touch}
 */
var Touch = function(Glide, Core) {

    /**
     * Touch event object.
     *
     * @var {Object}
     */
    var touch;

    /**
     * Touch constructor.
     */
    function Touch() {

        this.dragging = false;

        // Bind touch event.
        if (Glide.options.touchDistance) {
            Glide.track.on({
                'touchstart.glide': $.proxy(this.start, this)
            });
        }

        // Bind mouse drag event.
        if (Glide.options.dragDistance) {
            Glide.track.on({
                'mousedown.glide': $.proxy(this.start, this)
            });
        }

    }

    /**
     * Unbind touch events.
     *
     * @return {Void}
     */
    Touch.prototype.unbind = function() {
        Glide.track
            .off('touchstart.glide mousedown.glide')
            .off('touchmove.glide mousemove.glide')
            .off('touchend.glide touchcancel.glide mouseup.glide mouseleave.glide');
    };

    /**
     * Start touch event.
     *
     * @param {Object} event
     * @return {Void}
     */
    Touch.prototype.start = function(event) {

        // Escape if events disabled
        // or already dragging.
        if (!Core.Events.disabled && !this.dragging) {

            // Store event.
            if (event.type === 'mousedown') {
                touch = event.originalEvent;
            } else {
                touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
            }

            // Turn off jumping flag.
            Core.Transition.jumping = true;

            // Get touch start points.
            this.touchStartX = parseInt(touch.pageX);
            this.touchStartY = parseInt(touch.pageY);
            this.touchSin = null;
            this.dragging = true;

            Glide.track.on({
                'touchmove.glide mousemove.glide': Core.Helper.throttle($.proxy(this.move, this), Glide.options.throttle),
                'touchend.glide touchcancel.glide mouseup.glide mouseleave.glide': $.proxy(this.end, this)
            });

            // Detach clicks inside track.
            Core.Events
                .detachClicks()
                .call(Glide.options.swipeStart)
                .trigger('swipeStart');
            // Pause if autoplay.
            Core.Run.pause();

        }

    };

    /**
     * Touch move event.
     *
     * @param  {Object} event
     * @return {Void}
     */
    Touch.prototype.move = function(event) {

        // Escape if events not disabled
        // or not dragging.
        if (!Core.Events.disabled && this.dragging) {

            // Store event.
            if (event.type === 'mousemove') {
                touch = event.originalEvent;
            } else {
                touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
            }

            // Calculate start, end points.
            var subExSx = parseInt(touch.pageX) - this.touchStartX;
            var subEySy = parseInt(touch.pageY) - this.touchStartY;
            // Bitwise subExSx pow.
            var powEX = Math.abs(subExSx << 2);
            // Bitwise subEySy pow.
            var powEY = Math.abs(subEySy << 2);
            // Calculate the length of the hypotenuse segment.
            var touchHypotenuse = Math.sqrt(powEX + powEY);
            // Calculate the length of the cathetus segment.
            var touchCathetus = Math.sqrt(Core.Helper.byAxis(powEY, powEX));

            // Calculate the sine of the angle.
            this.touchSin = Math.asin(touchCathetus / touchHypotenuse);
            // Save distance.
            this.distance = Core.Helper.byAxis(
                (touch.pageX - this.touchStartX),
                (touch.pageY - this.touchStartY)
            );

            // Make offset animation.
            // While angle is lower than 45 degree.
            if ((this.touchSin * 180 / Math.PI) < 45) {
                Core.Animation.make(Core.Helper.byAxis(subExSx, subEySy));
            }

            // Prevent clicks inside track.
            Core.Events
                .preventClicks()
                .call(Glide.options.swipeMove)
                .trigger('swipeMove');

            // While mode is vertical, we don't want to block scroll when we reach start or end of slider
            // In that case we need to escape before preventing default event.
            if (Core.Build.isMode('vertical')) {
                if (Core.Run.isStart() && subEySy > 0) {
                    return;
                }
                if (Core.Run.isEnd() && subEySy < 0) {
                    return;
                }
            }

            // While angle is lower than 45 degree.
            if ((this.touchSin * 180 / Math.PI) < 45) {
                // Prevent propagation.
                event.stopPropagation();
                // Prevent scrolling.
                event.preventDefault();
                // Add dragging class.
                Glide.track.addClass(Glide.options.classes.dragging);
            // Else escape from event, we don't want move slider.
            } else {
                return;
            }

        }

    };

    /**
     * Touch end event.
     *
     * @todo Check edge cases for slider type
     * @param {Onject} event
     */
    Touch.prototype.end = function(event) {

        // Escape if events not disabled
        // or not dragging.
        if (!Core.Events.disabled && this.dragging) {

            // Set distance limiter.
            var distanceLimiter;

            // Store event.
            if (event.type === 'mouseup' || event.type === 'mouseleave') {
                touch = event.originalEvent;
            } else {
                touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
            }

            // Calculate touch distance.
            var touchDistance = Core.Helper.byAxis(
                (touch.pageX - this.touchStartX),
                (touch.pageY - this.touchStartY)
            );

            // Calculate degree.
            var touchDeg = this.touchSin * 180 / Math.PI;

            // Turn off jumping flag.
            Core.Transition.jumping = false;

            // If slider type is slider.
            if (Core.Build.isType('slider')) {

                // Prevent slide to right on first item (prev).
                if (Core.Run.isStart()) {
                    if (touchDistance > 0) {
                        touchDistance = 0;
                    }
                }

                // Prevent slide to left on last item (next).
                if (Core.Run.isEnd()) {
                    if (touchDistance < 0) {
                        touchDistance = 0;
                    }
                }

            }

            // Switch distance limit base on event type.
            if (event.type === 'mouseup' || event.type === 'mouseleave') {
                distanceLimiter = Glide.options.dragDistance;
            } else {
                distanceLimiter = Glide.options.touchDistance;
            }

            // While touch is positive and greater than
            // distance set in options move backward.
            if (touchDistance > distanceLimiter && touchDeg < 45) {
                Core.Run.make('<');
            }
            // While touch is negative and lower than negative
            // distance set in options move forward.
            else if (touchDistance < -distanceLimiter && touchDeg < 45) {
                Core.Run.make('>');
            }
            // While swipe don't reach distance apply previous transform.
            else {
                Core.Animation.make();
            }

            // After animation.
            Core.Animation.after(function() {
                // Enable events.
                Core.Events.enable();
                // If autoplay start auto run.
                Core.Run.play();
            });

            // Unset dragging flag.
            this.dragging = false;

            // Disable other events.
            Core.Events
                .attachClicks()
                .disable()
                .call(Glide.options.swipeEnd)
                .trigger('swipeEnd');

            // Remove dragging class and unbind events.
            Glide.track
                .removeClass(Glide.options.classes.dragging)
                .off('touchmove.glide mousemove.glide')
                .off('touchend.glide touchcancel.glide mouseup.glide mouseleave.glide');

        }

    };

    // Return class.
    return new Touch();

};
;/**
 * Transition module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Transition}
 */
var Transition = function(Glide, Core) {

    /**
     * Transition constructor.
     */
    function Transition() {
        this.jumping = false;
    }

    /**
     * Get transition settings.
     *
     * @param {String} property
     * @return {String}
     */
    Transition.prototype.get = function(property) {
        if (!this.jumping) {
            return property + ' ' + Glide.options.animationDuration + 'ms ' + Glide.options.animationTimingFunc;
        }

        return this.clear('all');
    };

    /**
     * Clear transition settings.
     *
     * @param {String} property
     * @return {String}
     */
    Transition.prototype.clear = function(property) {
        return property + ' 0ms ' + Glide.options.animationTimingFunc;
    };

    // Return class.
    return new Transition();

};
;/**
 * Translate module.
 *
 * @param {Object} Glide
 * @param {Object} Core
 * @return {Translate}
 */
var Translate = function(Glide, Core) {

    /**
     * Translate axes map.
     *
     * @type {Object}
     */
    var axes = {
        x: 0,
        y: 0,
        z: 0
    };

    /**
     * Translate Translate Constructor
     */
    function Translate() {
    }

    /**
     * Set translate.
     *
     * @param  {String} axis
     * @param  {Integer} value
     * @return {String}
     */
    Translate.prototype.set = function(axis, value) {
        axes[axis] = parseInt(value);

        return 'translate3d(' + (-1 * axes.x) + 'px, ' + (-1 * axes.y) + 'px, ' + (-1 * axes.z) + 'px)';
    };

    // Return class.
    return new Translate();

};
;/**
 * Construct Glide. Initialize slider, extends
 * defaults and returning public api.
 *
 * @param {Object} element
 * @param {Object} options
 */
var Glide = function(element, options) {

    /**
     * Default slider options.
     *
     * @type {Object}
     */
    var defaults = {
        autoplay: 4000,
        type: 'carousel',
        mode: 'horizontal',
        startAt: 1,
        hoverpause: true,
        keyboard: true,
        touchDistance: 80,
        dragDistance: 120,
        animationDuration: 400,
        animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
        throttle: 16,
        autoheight: false,
        paddings: 0,
        centered: true,
        classes: {
            base: 'glide',
            wrapper: 'glide__wrapper',
            track: 'glide__track',
            slide: 'glide__slide',
            arrows: 'glide__arrows',
            arrow: 'glide__arrow',
            arrowNext: 'next',
            arrowPrev: 'prev',
            bullets: 'glide__bullets',
            bullet: 'glide__bullet',
            clone: 'clone',
            active: 'active',
            dragging: 'dragging',
            disabled: 'disabled'
        },
        beforeInit: function(event) {},
        afterInit: function(event) {},
        beforeTransition: function(event) {},
        duringTransition: function(event) {},
        afterTransition: function(event) {},
        swipeStart: function(event) {},
        swipeEnd: function(event) {},
        swipeMove: function(event) {},
    };

    // Extend defaults with
    // the init options.
    this.options = $.extend({}, defaults, options);

    // Generate unique slider instance id.
    this.uuid = Math.floor(Math.random() * 1000);

    // Start at slide number specifed in options.
    this.current = parseInt(this.options.startAt);

    // Store main slider DOM element.
    this.element = element;

    // Collect slider DOM and
    // init slider sizes.
    this.collect();
    this.setup();

    // Mark the glide as not destroyed
    this.destroyed = false;

    // Call before init callback.
    this.options.beforeInit({
        index: this.current,
        length: this.slides.length,
        current: this.slides.eq(this.current - 1),
        slider: this.slider
    });

    /**
     * Construct core with modules.
     *
     * @type {Core}
     */
    var Engine = new Core(this, {
        Helper: Helper,
        Translate: Translate,
        Transition: Transition,
        Arrows: Arrows,
        Bullets: Bullets,
        Run: Run,
        Animation: Animation,
        Clones: Clones,
        Height: Height,
        Build: Build,
        Events: Events,
        Touch: Touch,
        Api: Api
    });

    // Call after init callback.
    Engine.Events.call(this.options.afterInit);

    // Return slider Api.
    return Engine.Api.instance();

};


/**
 * Collect DOM and set classes.
 *
 * @return {void}
 */
Glide.prototype.collect = function() {
    var options = this.options;
    var classes = options.classes;

    this.slider = this.element.addClass(classes.base + '--' + options.type).addClass(classes.base + '--' + options.mode);
    this.track = this.slider.find('.' + classes.track);
    this.wrapper = this.slider.find('.' + classes.wrapper);
    this.slides = this.track.find('.' + classes.slide).not('.' + classes.clone);
};


/**
 * Setup slider dementions.
 *
 * @return {Void}
 */
Glide.prototype.setup = function() {

    /**
     * Mode to dimentions (size and axis) mapper.
     *
     * @type {Object}
     */
    var modeToDimensionsMap = {
        horizontal: ['width', 'x'],
        vertical: ['height', 'y'],
    };

    // Get slider size by active mode.
    this.size = modeToDimensionsMap[this.options.mode][0];

    // Get slider axis by active mode.
    this.axis = modeToDimensionsMap[this.options.mode][1];

    // Get slider items length.
    this.length = this.slides.length;

    // Get slider configured paddings.
    this.paddings = this.getPaddings();

    // Set slider size.
    this[this.size] = this.getSize();
};


/**
 * Normalize paddings option value. Parsing
 * strings procents, pixels and numbers.
 *
 * @return {string} Normalized value
 */
Glide.prototype.getPaddings = function() {

    var option = this.options.paddings;

    // If we have a string, we need
    // to parse it to real number.
    if (typeof option === 'string') {

        // Parse string to int.
        var normalized = parseInt(option, 10);

        // Check if string is procentage number.
        var isPercentage = option.indexOf('%') >= 0;

        // If paddings value is procentage. Calculate
        // real number value from slider element.
        if (isPercentage) {
            return parseInt(this.slider[this.size]() * (normalized / 100));
        }

        // Value is number as string, so
        // just return normalized.
        return normalized;
    }

    // Value is number, we don't need
    // to do anything, return.
    return option;

};


/**
 * Get slider size width updated
 * by addtional paddings.
 *
 * @return {number}
 */
Glide.prototype.getSize = function() {
    return this.slider[this.size]() - (this.paddings * 2);
};
;/**
 * Wire Glide to the jQuery.
 *
 * @param  {object} options
 * @return {object}
 */

$.fn.glide = function(options) {

    return this.each(function() {
        if (!$.data(this, 'glide_api')) {
            $.data(this, 'glide_api',
                new Glide($(this), options)
            );
        }
    });

};

})(jQuery, window, document);