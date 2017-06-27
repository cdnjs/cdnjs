// tipsy, facebook style tooltips for jquery
// version 1.0.2
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

(function($, window, undefined) {

    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
    }

    function isElementInDOM(ele) {
        while (ele = ele.parentNode) {
            if (ele == document) return true;
        }
        return false;
    }

	// Returns true if it is a DOM element
	// http://stackoverflow.com/a/384380/999
	function isElement(o){
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
			o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
		);	
	}

    var tipsyIDcounter = 0;
    function tipsyID() {
        return "tipsyuid" + (tipsyIDcounter++);
    }

    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
    }

    Tipsy.prototype = {
        show: function() {
            if (!isElementInDOM(this.$element[0])) {
                return;
            }

            if (isElement(this.$element) && !this.$element.is(':visible')) { 
                return; 
            }
            
            var title;
            if (this.enabled && (title = this.getTitle())) {
                var $tip = this.tip();

                $tip.find('.tipsy-inner' + this.options.theme)[this.options.html ? 'html' : 'text'](title);

                $tip[0].className = 'tipsy' + this.options.theme; // reset classname in case of dynamic gravity
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                }

                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);

                var pos = $.extend({}, this.$element.offset());

                // If the element is contained in a SVG object, use getBBox
                if (this.$element.parents('svg').size() > 0) {
                    pos = $.extend(pos, this.$element[0].getBBox());
                } else {
                    pos = $.extend(pos, {
                        width: this.$element[0].offsetWidth || 0,
                        height: this.$element[0].offsetHeight || 0
                    });
                }

                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);

                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                    default:
                        break;
                }

                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }

                $tip.css(tp).addClass('tipsy-' + gravity + this.options.theme);
                $tip.find('.tipsy-arrow' + this.options.theme)[0].className = 'tipsy-arrow' + this.options.theme + ' tipsy-arrow-' + gravity.charAt(0) + this.options.theme;
                $tip.css({width: (actualWidth - 10) + 'px'});

                if (this.options.fade) {
                    if(this.options.shadow)
                        $(".tipsy-inner").css({'box-shadow': '0px 0px '+this.options.shadowBlur+'px '+this.options.shadowSpread+'px rgba(0, 0, 0, '+this.options.shadowOpacity+')', '-webkit-box-shadow': '0px 0px '+this.options.shadowBlur+'px '+this.options.shadowSpread+'px rgba(0, 0, 0, '+this.options.shadowOpacity+')'});
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity}, this.options.fadeInTime);
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }

                if (this.options.aria) {
                    var $tipID = tipsyID();
                    $tip.attr("id", $tipID);
                    this.$element.attr("aria-describedby", $tipID);
                }
            }
        },

        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(this.options.fadeOutTime, function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
            if (this.options.aria) {
                this.$element.removeAttr("aria-describedby");
            }
        },

        fixTitle: function() {
            var $e = this.$element,
                id = maybeCall(this.options.id, this.$element[0]);
            if ($e.prop('title') || typeof($e.prop('original-title')) != 'string') {
                $e.prop('original-title', $e.prop('title') || '').removeAttr('title');
                // add aria-describedby pointing to the tooltip's id
                $e.attr('aria-describedby', id);
                // if it doesn't already have a tabindex, force the trigger element into the tab cycle
                // to make it keyboard accessible with tabindex=0. this automatically makes elements
                // that are not normally keyboard accessible (div or span) that have been tipsy-fied
                // also operable with the keyboard.
                if ($e.attr('tabindex') === undefined) {
                    $e.attr('tabindex', 0);
                }
            }
        },

        getTitle: function() {
            var title, $e = this.$element, o = this.options;
            this.fixTitle();
            if (typeof o.title == 'string') {
                title = $e.prop(o.title == 'title' ? 'original-title' : o.title);
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },

        tip: function() {
            var id = maybeCall(this.options.id, this.$element[0]);

            if (!this.$tip) {
                // generate tooltip, with appropriate ARIA role and an 'id' (can be set in options),
                // so it can be targetted by aria-describedby in the trigger element
                this.$tip = $('<div class="tipsy' + this.options.theme + '" id="'+id+'" role="tooltip"></div>').html('<div class="tipsy-arrow' + this.options.theme + '"></div><div class="tipsy-inner' + this.options.theme + '"></div>').attr("role","tooltip");
                this.$tip.data('tipsy-pointee', this.$element[0]);
            }
            return this.$tip;
        },

        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },

        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };

    $.fn.tipsy = function(options) {

        $.fn.tipsy.enable();

        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            var tipsy = this.data('tipsy');
            if (tipsy) tipsy[options]();
            return this;
        }

        options = $.extend({}, $.fn.tipsy.defaults, options);

        // Establish theme
        options.theme = (options.theme && options.theme !== '') ? '-' + options.theme : '';

        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }

        function enter() {
            if ($.fn.tipsy.enabled !== true) {
                return;
            }
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn === 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function() {
                    if (tipsy.hoverState == 'in' && isElementInDOM(tipsy.$element)) {
                        tipsy.show();
                    }
                }, options.delayIn);
            }
        }

        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut === 0) {
                tipsy.hide();
            } else {
                setTimeout(function() { if (tipsy.hoverState == 'out' || !tipsy.$element || !tipsy.$element.is(':visible')) tipsy.hide(); }, options.delayOut);
            }
        }

        if (!options.live) this.each(function() { get(this); });

        if (options.trigger != 'manual') {
            // one of the biggest changes from 1.0.0a: by default, bind to BOTH mouseenter/mouseleave AND focus/blur
            // this ensures out-of-the-box keyboard accessibility, showing tooltips when users TAB to a (focusable) element
            // sites that still use 'hover' will also get this new interactive behavior automatically, only those who
            // explicitly set 'focus' will only get focus/blur (for forms, for instance)

            if (options.live && options.live !== true) {
                if (options.trigger != 'focus') {
                    $(this).on('mouseenter', options.live, enter);
                    $(this).on('mouseleave', options.live, leave);
                }
                if (options.trigger != 'blur') {
                    $(this).on('focus', options.live, enter);
                    $(this).on('blur', options.live, leave);
                }
            } else {
                if (options.live && !$.live) {
                    //live === true and using jQuery >= 1.9
                    throw "Since jQuery 1.9, pass selector as live argument. eg. $(document).tipsy({live: 'a.live'});";
                }
                var binder = options.live ? 'live' : 'bind';
                if (options.trigger != 'focus') {
                    this[binder]('mouseenter', enter)[binder]('mouseleave', leave);
                }
                if (options.trigger != 'blur') {
                    this[binder]('focus', enter)[binder]('blur', leave);
                }
            }
        }

        return this;

    };

    $.fn.tipsy.defaults = {
        aria: false,
        className: null,
        id: 'tipsy',
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fadeInTime: 400,
        fadeOutTime: 400, 
        shadow: false,
        shadowBlur: 8,
        shadowOpacity: 1,
        shadowSpread: 0,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'interactive',
        theme: ''
    };

    $.fn.tipsy.revalidate = function() {
      $('.tipsy').each(function() {
        var pointee = $.data(this, 'tipsy-pointee');
        if (!pointee || !isElementInDOM(pointee)) {
          $(this).remove();
        }
      });
    };

    $.fn.tipsy.enable = function() {
        $.fn.tipsy.enabled = true;
    };

    $.fn.tipsy.disable = function() {
        $.fn.tipsy.enabled = false;
    };

    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).prop('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };

    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };

    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };

    $.fn.tipsy.autoNWNE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'ne' : 'nw';
    };

    $.fn.tipsy.autoSWSE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'se' : 'sw';
    };

    /**
     * yields a closure of the supplied parameters, producing a function that takes
     * no arguments and is suitable for use as an autogravity function like so:
     *
     * @param marginNorth (int) - distance from the viewable region top edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param marginEast (int) - distance from the viewable region right edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
     *        if there are no viewable region edges effecting the tooltip's
     *        gravity. It will try to vary from this minimally, for example,
     *        if 'sw' is preferred and an element is near the right viewable
     *        region edge, but not the top edge, it will set the gravity for
     *        that element's tooltip to be 'se', preserving the southern
     *        component.
     */
    $.fn.tipsy.autoBounds = function(marginNorth, marginEast, prefer) {
        return function() {
            var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
                boundTop = $(document).scrollTop() + marginNorth,
                boundLeft = $(document).scrollLeft() + marginEast,
                $this = $(this);

            if ($this.offset().top < boundTop) dir.ns = 'n';
            if ($this.offset().left < boundLeft) dir.ew = 'w';
            if ($(window).width() + $(document).scrollLeft() - $this.offset().left < marginEast) dir.ew = 'e';
            if ($(window).height() + $(document).scrollTop() - $this.offset().top < marginNorth) dir.ns = 's';

            return dir.ns + (dir.ew ? dir.ew : '');
        };
    };

    /**
     * Improved version of autoBounds for automatic placement of chunky tips
     * The original autoBounds failed in two regards: 1. it would never return a 'w' or 'e', gravity even if they
     * were preferred and/or optimal, 2. it only respected the margin between the left hand side of an element and
     * left hand side of the viewport, and the top of an element and the top of the viewport. This version checks
     * to see if the bottom of an element is too close to the bottom of the screen, similarly for the right hand side
     */
    $.fn.tipsy.autoBounds2 = function(margin, prefer) {
        return function() {
            var dir = {},
                boundTop = $(document).scrollTop() + margin,
                boundLeft = $(document).scrollLeft() + margin,
                $this = $(this);

            // bi-directional string (ne, se, sw, etc...)
            if (prefer.length > 1) {
                dir.ns = prefer[0];
                dir.ew = prefer[1];
            } else {
                // single direction string (e, w, n or s)
                if (prefer[0] == 'e' || prefer[0] == 'w') {
                    dir.ew = prefer[0];
                } else {
                    dir.ns = prefer[0];
                }
            }

            if ($this.offset().top < boundTop) dir.ns = 'n';
            if ($this.offset().left < boundLeft) dir.ew = 'w';
            if ($(window).width() + $(document).scrollLeft() - ($this.offset().left + $this.width()) < margin) dir.ew = 'e';
            if ($(window).height() + $(document).scrollTop() - ($this.offset().top + $this.height()) < margin) dir.ns = 's';

            if (dir.ns) {
                return dir.ns + (dir.ew ? dir.ew : '');
            }
            return dir.ew;
        }
    };
    
})(jQuery, window);
