/*
    The MIT License (MIT)

    Copyright (c) 2015-2016 Rene Tanczos <gravmatt@gmail.com>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

/*! Copyright (c) 2015-2016 Rene Tanczos <gravmatt@gmail.com> - The MIT License (MIT) */
(function(window, document, undefined) {
var force = function() {
    'use strict';

    var scrollCache = [],
        isAnimating = false,
        animationCache = [],
        isScrolling = false,
        currentJumpLoop,
        transitionTimeout,
        hashLinkElements,
        jsEasing = {
        	swing: function (t, b, c, d) {
                // default
        		return this.easeOutQuad(t, b, c, d);
        	},
        	easeInQuad: function (t, b, c, d) {
        		return c*(t/=d)*t + b;
        	},
        	easeOutQuad: function (t, b, c, d) {
        		return -c *(t/=d)*(t-2) + b;
        	},
        	easeInOutQuad: function (t, b, c, d) {
        		if ((t/=d/2) < 1) return c/2*t*t + b;
        		return -c/2 * ((--t)*(t-2) - 1) + b;
        	},
        	easeInCubic: function (t, b, c, d) {
        		return c*(t/=d)*t*t + b;
        	},
        	easeOutCubic: function (t, b, c, d) {
        		return c*((t=t/d-1)*t*t + 1) + b;
        	},
        	easeInOutCubic: function (t, b, c, d) {
        		if ((t/=d/2) < 1) return c/2*t*t*t + b;
        		return c/2*((t-=2)*t*t + 2) + b;
        	},
        	easeInQuart: function (t, b, c, d) {
        		return c*(t/=d)*t*t*t + b;
        	},
        	easeOutQuart: function (t, b, c, d) {
        		return -c * ((t=t/d-1)*t*t*t - 1) + b;
        	},
        	easeInOutQuart: function (t, b, c, d) {
        		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        		return -c/2 * ((t-=2)*t*t*t - 2) + b;
        	},
        	easeInQuint: function (t, b, c, d) {
        		return c*(t/=d)*t*t*t*t + b;
        	},
        	easeOutQuint: function (t, b, c, d) {
        		return c*((t=t/d-1)*t*t*t*t + 1) + b;
        	},
        	easeInOutQuint: function (t, b, c, d) {
        		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        		return c/2*((t-=2)*t*t*t*t + 2) + b;
        	},
        	easeInSine: function (t, b, c, d) {
        		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        	},
        	easeOutSine: function (t, b, c, d) {
        		return c * Math.sin(t/d * (Math.PI/2)) + b;
        	},
        	easeInOutSine: function (t, b, c, d) {
        		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        	},
        	easeInExpo: function (t, b, c, d) {
        		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        	},
        	easeOutExpo: function (t, b, c, d) {
        		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        	},
        	easeInOutExpo: function (t, b, c, d) {
        		if (t==0) return b;
        		if (t==d) return b+c;
        		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        	},
        	easeInCirc: function (t, b, c, d) {
        		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        	},
        	easeOutCirc: function (t, b, c, d) {
        		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        	},
        	easeInOutCirc: function (t, b, c, d) {
        		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        	},
        	easeInElastic: function (t, b, c, d) {
        		var s=1.70158;var p=0;var a=c;
        		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        		if (a < Math.abs(c)) { a=c; var s=p/4; }
        		else var s = p/(2*Math.PI) * Math.asin (c/a);
        		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        	},
        	easeOutElastic: function (t, b, c, d) {
        		var s=1.70158;var p=0;var a=c;
        		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        		if (a < Math.abs(c)) { a=c; var s=p/4; }
        		else var s = p/(2*Math.PI) * Math.asin (c/a);
        		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        	},
        	easeInOutElastic: function (t, b, c, d) {
        		var s=1.70158;var p=0;var a=c;
        		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        		if (a < Math.abs(c)) { a=c; var s=p/4; }
        		else var s = p/(2*Math.PI) * Math.asin (c/a);
        		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        	},
        	easeInBack: function (t, b, c, d, s) {
        		if (s == undefined) s = 1.70158;
        		return c*(t/=d)*t*((s+1)*t - s) + b;
        	},
        	easeOutBack: function (t, b, c, d, s) {
        		if (s == undefined) s = 1.70158;
        		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        	},
        	easeInOutBack: function (t, b, c, d, s) {
        		if (s == undefined) s = 1.70158;
        		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        	},
        	easeInBounce: function (t, b, c, d) {
        		return c - this.easeOutBounce (d-t, 0, c, d) + b;
        	},
        	easeOutBounce: function (t, b, c, d) {
        		if ((t/=d) < (1/2.75)) {
        			return c*(7.5625*t*t) + b;
        		} else if (t < (2/2.75)) {
        			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        		} else if (t < (2.5/2.75)) {
        			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        		} else {
        			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        		}
        	},
        	easeInOutBounce: function (t, b, c, d) {
        		if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
        		return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
        	}
        },

        cssEasing = {
        	swing: function () {
            // default
        		return this.easeOutQuad();
        	},
        	easeInQuad: function () {
        		return '0.55, 0.085, 0.68, 0.53';
        	},
        	easeOutQuad: function () {
        		return '0.25, 0.46, 0.45, 0.94';
        	},
        	easeInOutQuad: function () {
        		return '0.455, 0.03, 0.515, 0.955';
        	},
        	easeInCubic: function () {
        		return '0.55, 0.055, 0.675, 0.19';
        	},
        	easeOutCubic: function () {
        		return '0.215, 0.61, 0.355, 1';
        	},
        	easeInOutCubic: function () {
        		return '0.645, 0.045, 0.355, 1';
        	},
        	easeInQuart: function () {
        		return '0.895, 0.03, 0.685, 0.22';
        	},
        	easeOutQuart: function () {
        		return '0.165, 0.84, 0.44, 1';
        	},
        	easeInOutQuart: function () {
        		return '0.77, 0, 0.175, 1';
        	},
        	easeInQuint: function () {
        		return '0.755, 0.05, 0.855, 0.06';
        	},
        	easeOutQuint: function () {
        		return '0.23, 1, 0.32, 1';
        	},
        	easeInOutQuint: function () {
        		return '0.86, 0, 0.07, 1';
        	},
        	easeInSine: function () {
        		return '0.47, 0, 0.745, 0.715';
        	},
        	easeOutSine: function () {
        		return '0.39, 0.575, 0.565, 1';
        	},
        	easeInOutSine: function () {
        		return '0.445, 0.05, 0.55, 0.95';
        	},
        	easeInExpo: function () {
        		return '0.95, 0.05, 0.795, 0.035';
        	},
        	easeOutExpo: function () {
        		return '0.19, 1, 0.22, 1';
        	},
        	easeInOutExpo: function () {
        		return '1, 0, 0, 1';
        	},
        	easeInCirc: function () {
        		return '0.6, 0.04, 0.98, 0.335';
        	},
        	easeOutCirc: function () {
        		return '0.075, 0.82, 0.165, 1';
        	},
        	easeInOutCirc: function () {
        		return '0.785, 0.135, 0.15, 0.86';
        	}
        },


        opt = {
            hashLinkPattern: 'a[href*="#"]:not([href="#"])',
            frames: 60,
            valueUnitRegEx: /^([\-]{0,1}[0-9\.]+)([a-z%]{0,3})$/,
            moveDuration: 1000,
            moveEasing: 'swing',
            jumpDuration: 1000,
            scrollEasing: 'swing',
            cacheJumps: true,
            cssTransitions: true
        },

        config = function(options) {
            options && Object.keys(options).forEach(function(key) {
                opt[key] = options[key];
            });
        },

        hasTransitionSupport = function() {
            var s = document.documentElement.style;
            return (
                s.webkitTransition !== undefined ||
                s.MozTransition !== undefined ||
                s.OTransition !== undefined ||
                s.MsTransition !== undefined ||
                s.transition !== undefined
            );
        },

        setTransition = function(element, trans) {
            element.style.webkitTransition !== undefined && (element.style.webkitTransition = trans);
            element.style.MozTransition !== undefined && (element.style.MozTransition = trans);
            element.style.OTransition !== undefined && (element.style.OTransition = trans);
            element.style.MsTransition !== undefined && (element.style.MsTransition = trans);
            element.style.transition !== undefined && (element.style.transition = trans);
        },

        isStyleProperty = function(propName) {
            return propName in document.documentElement.style;
        },

        /*
            Converts the CSS property name into a JS style name.

            Example:
                from CSS:   font-family
                to JS:      fontFamily
        */
        toJsStyle = function(value) {
            return value.replace(/(\-[a-z]{1})/g, function(match) {return match.slice(-1).toUpperCase()})
        },

        /*
            @target string/object
                can be a selector/id or object

            @options object
                if duration or done is undefined, options contains informations about the animation
                but if duration and done is set, options are the style properties (target properties)
                to be animated.

            @duration number
                Duration of the animation.

            @done function
                will be executed after the animation finished.
        */
        move = function(target, options, duration, done) {

            var callback; // executes when the animation is done

            if(options.isJump) {
                // abort the current scroll animations if caching is false and a new scroll event was started
                (!opt.cacheJumps && isScrolling) && (clearInterval(currentJumpLoop));
                // cache the target if scrolling is active and a scrolling animation is currently running
                if(opt.cacheJumps && isScrolling) {
                    scrollCache.push({target: target});
                    return;
                }
                isScrolling = true;

                callback = function() {
                    isScrolling = false;
                    if(opt.cacheJumps && scrollCache.length > 0) {
                        var nextEvent = scrollCache.shift();
                        jump(nextEvent.target);
                    }
                };
            }
            else {
                // executed when its not a jump
                if(isAnimating) {
                    animationCache.push({target: target, options: options, duration: duration, done: done});
                    return;
                }
                isAnimating = true;

                callback = function() {
                    isAnimating = false;
                    var next = animationCache.shift();
                    next && move(next.target, next.options, next.duration, next.done);
                };
            }

            var el = (typeof target === 'string') ? document.querySelector(target) : target;
            var o = {};
            o.properties = options.properties || options;
            o.duration = duration || options.duration || (options.isJump ? opt.jumpDuration : opt.moveDuration);
            o.done = done || options.done;
            o.easing = options.easing || (options.isJump ? opt.scrollEasing : opt.moveEasing);
            o.isJump = options.isJump;

            // dont care about the target property. has something to do with the jump function
            (typeof options.target === 'string') ? (options.target = document.querySelector(options.target)) : (o.target = options.target);

            var isStyle = true;
            Object.keys(o.properties).forEach(function(key) {
                isStyle = isStyleProperty(key);
            });

            // CSS transition check
            if(opt.cssTransitions && isStyle && hasTransitionSupport() && o.easing in cssEasing) {
                //console.log('css transitions supported');

                Object.keys(o.properties).forEach(function(key) {
                    var trans = 'all ' + o.duration + 'ms cubic-bezier(' + cssEasing[o.easing]() + ')';

                    setTransition(el, trans);

                    var stylename = toJsStyle(key);

                    el.style[toJsStyle(key)] = o.properties[key];

                    // kill the previous transition when its not finished
                    clearTimeout(transitionTimeout);

                    // should remove the transition after its finished
                    transitionTimeout = setTimeout(function() {
                        setTransition(el, '');
                        callback();
                        o.done && o.done();
                    }, o.duration);
                });

                return;
            }

            var anims = [],
                finished = 0;

            Object.keys(o.properties).forEach(function(key) {
                var val = o.properties[key].match(opt.valueUnitRegEx);
                anims.push({
                    style: toJsStyle(key),
                    value: parseInt(val[1]),
                    suffix: val[2] || '',
                    duration: o.duration,
                    rawValue:  o.properties[key]
                });
            });

            anims.forEach(function(anim) {
                var currentFrame = 0,
                    valueObj;

                if(isStyle)
                    valueObj = el.style[anim.style].match(opt.valueUnitRegEx);
                else
                    valueObj = (el[anim.style] + '').match(opt.valueUnitRegEx);

                // in case no value is set
                if(!valueObj) valueObj = ['0', '0', ''];

                var initValue = isStyle ? (parseInt(valueObj[1]) || 0) : window.scrollY,
                    change = anim.value - (initValue || 0),
                    currentTime = 0,
                    timeSteps = Math.ceil(anim.duration / opt.frames),
                    loopId;

                loopId = setInterval(function() {
                    if(currentFrame < opt.frames) {
                        var v = jsEasing[o.easing](currentTime, initValue, change, anim.duration);

                        if(isStyle)
                            el.style[anim.style] = v + anim.suffix;
                        else if(anim.style in el) {
                            if(o.target)
                                if(anim.style == 'scrollTop') {
                                  window.scrollTo(0, v)
                                }
                                else {
                                  o.target[anim.style] = v + anim.suffix;
                                }
                            else
                                el[anim.style] = v + anim.suffix;
                        }
                        else
                            // break loop (nothing to animate)
                            currentTime = opt.frames;
                    }
                    else {
                        clearInterval(loopId);
                        finished++;
                        callback();
                        (finished === anims.length && o.done) && o.done();
                    }
                    currentTime += timeSteps;
                    currentFrame++;
                }, timeSteps);

                o.isJump && (currentJumpLoop = loopId);
            });
        },

        jump = function(target, options) {
          var el = (typeof target === 'string') ? document.querySelector(target) : target;
          var o = options || {};

          move(el, {
              properties: {
                scrollTop: el.offsetTop + ''
              },
              duration: o.duration || opt.jumpDuration,
              easing: o.easing || opt.scrollEasing,
              done: o.setHash ? function() {
                  window.location.hash = el.id;
                  o.done && o.done();
                } : o.done,
              target: document.body,
              isJump: true
          });
        },

        // Bind all  subscribe all hash link clicks on the page and animates the jump to this position
        bindHashes = function() {
            hashLinkElements = document.querySelectorAll(opt.hashLinkPattern);

            [].forEach.call(hashLinkElements, function(el) {
        		el.addEventListener('click', function(ev) {
        			if (window.location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && window.location.hostname == this.hostname) {
        		        var target = document.querySelector(this.hash);
                    target && jump(target);
                    ev.preventDefault();
        		    }
        		}, false)
        	});
        },

        // unbind all hash links
        unbindHashes = function() {
            [].forEach.call(hashLinkElements, function(el) {
                el.removeEventListener('click');
            });
            hashLinkElements = null;
        };

        return {
            opt: opt,
            config: config,
            hasTransitionSupport: hasTransitionSupport,
            toJsStyle: toJsStyle,
            move: move,
            jump: jump,
            bindHashes: bindHashes,
            unbindHashes: unbindHashes,
            setTransition: setTransition
        };
    }();

    // extend the jquery object
    var jq = window.$ || window.jQuery;
    jq && (jq.fn.extend({
        move: function (options, duration, done) {
          return this.each(function() {
              force.move(this, options, duration, done);
          });
        },
        jump: function(options) {
          return this.each(function() {
            force.jump(this, options);
          });
        }
    }));

    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    	// Expose force as module.exports in loaders that implement the Node
    	// module pattern (including browserify). Do not create the global, since
    	// the user will be storing it themselves locally, and globals are frowned
    	// upon in the Node module world.
    	module.exports = force;
    } else {
    	// Eexpose force to the global object as usual
    	window.force = force;

    	// Register as a named AMD module
    	if ( typeof define === "function" && define.amd ) {
    		define( "force", [], function () { return force; } );
    	}
    }
})(window, document);
