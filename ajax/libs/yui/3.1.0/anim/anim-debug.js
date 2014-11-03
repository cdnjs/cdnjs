YUI.add('anim-base', function(Y) {

/**
* The Animation Utility provides an API for creating advanced transitions.
* @module anim
*/

/**
* Provides the base Anim class, for animating numeric properties.
*
* @module anim
* @submodule anim-base
*/

    /**
     * A class for constructing animation instances.
     * @class Anim
     * @for Anim
     * @constructor
     * @extends Base
     */

    var RUNNING = 'running',
        START_TIME = 'startTime',
        ELAPSED_TIME = 'elapsedTime',
        /**
        * @for Anim
        * @event start
        * @description fires when an animation begins.
        * @param {Event} ev The start event.
        * @type Event.Custom
        */
        START = 'start',

        /**
        * @event tween
        * @description fires every frame of the animation.
        * @param {Event} ev The tween event.
        * @type Event.Custom
        */
        TWEEN = 'tween',

        /**
        * @event end
        * @description fires after the animation completes.
        * @param {Event} ev The end event.
        * @type Event.Custom
        */
        END = 'end',
        NODE = 'node',
        PAUSED = 'paused',
        REVERSE = 'reverse', // TODO: cleanup
        ITERATION_COUNT = 'iterationCount',

        NUM = Number;

    var _running = {},
        _instances = {},
        _timer;

    Y.Anim = function() {
        Y.Anim.superclass.constructor.apply(this, arguments);
        _instances[Y.stamp(this)] = this;
    };

    Y.Anim.NAME = 'anim';

    /**
     * Regex of properties that should use the default unit.
     *
     * @property RE_DEFAULT_UNIT
     * @static
     */
    Y.Anim.RE_DEFAULT_UNIT = /^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;

    /**
     * The default unit to use with properties that pass the RE_DEFAULT_UNIT test.
     *
     * @property DEFAULT_UNIT
     * @static
     */
    Y.Anim.DEFAULT_UNIT = 'px';

    Y.Anim.DEFAULT_EASING = function (t, b, c, d) {
        return c * t / d + b; // linear easing
    };

    /**
     * Time in milliseconds passed to setInterval for frame processing 
     *
     * @property intervalTime
     * @default 20
     * @static
     */
    Y.Anim._intervalTime = 20;

    /**
     * Bucket for custom getters and setters
     *
     * @property behaviors
     * @static
     */
    Y.Anim.behaviors = {
        left: {
            get: function(anim, attr) {
                return anim._getOffset(attr);
            }
        }
    };

    Y.Anim.behaviors.top = Y.Anim.behaviors.left;

    /**
     * The default setter to use when setting object properties.
     *
     * @property DEFAULT_SETTER
     * @static
     */
    Y.Anim.DEFAULT_SETTER = function(anim, att, from, to, elapsed, duration, fn, unit) {
        unit = unit || '';
        anim._node.setStyle(att, fn(elapsed, NUM(from), NUM(to) - NUM(from), duration) + unit);
    };

    /**
     * The default getter to use when getting object properties.
     *
     * @property DEFAULT_GETTER
     * @static
     */
    Y.Anim.DEFAULT_GETTER = function(anim, prop) {
        return anim._node.getComputedStyle(prop);
    };

    Y.Anim.ATTRS = {
        /**
         * The object to be animated.
         * @attribute node
         * @type Node
         */
        node: {
            setter: function(node) {
                node = Y.one(node);
                this._node = node;
                if (!node) {
                    Y.log(node + ' is not a valid node', 'warn', 'Anim');
                }
                return node;
            }
        },

        /**
         * The length of the animation.  Defaults to "1" (second).
         * @attribute duration
         * @type NUM
         */
        duration: {
            value: 1
        },

        /**
         * The method that will provide values to the attribute(s) during the animation. 
         * Defaults to "Easing.easeNone".
         * @attribute easing
         * @type Function
         */
        easing: {
            value: Y.Anim.DEFAULT_EASING,

            setter: function(val) {
                if (typeof val === 'string' && Y.Easing) {
                    return Y.Easing[val];
                }
            }
        },

        /**
         * The starting values for the animated properties. 
         * Fields may be strings, numbers, or functions.
         * If a function is used, the return value becomes the from value.
         * If no from value is specified, the DEFAULT_GETTER will be used. 
         * @attribute from
         * @type Object
         * supports any unit, provided it matches the "to" (or default)
         * unit (e.g. "{width: 10em', color: 'rgb(0, 0 0)', borderColor: '#ccc'}".
         * If using the default ('px' for length-based units), the unit may be omitted  (
         * (e.g. "{width: 100}, borderColor: 'ccc'}", which defaults to pixels 
         * and hex, respectively).
         */
        from: {},

        /**
         * The ending values for the animated properties. 
         * Fields may be strings, numbers, or functions.
         * @attribute to
         * @type Object
         * supports any unit, provided it matches the "from" (or default)
         * unit (e.g. "{width: '50%', color: 'red', borderColor: '#ccc'}".
         * If using the default ('px' for length-based units), the unit may be omitted (
         * (e.g. "{width: 100}, borderColor: 'ccc'}", which defaults to pixels 
         * and hex, respectively).
         */
        to: {},

        /**
         * Date stamp for the first frame of the animation.
         * @attribute startTime
         * @type Int
         * @default 0 
         * @readOnly
         */
        startTime: {
            value: 0,
            readOnly: true
        },

        /**
         * Current time the animation has been running.
         * @attribute elapsedTime
         * @type Int
         * @default 0 
         * @readOnly
         */
        elapsedTime: {
            value: 0,
            readOnly: true
        },

        /**
         * Whether or not the animation is currently running.
         * @attribute running 
         * @type Boolean
         * @default false 
         * @readOnly
         */
        running: {
            getter: function() {
                return !!_running[Y.stamp(this)];
            },
            value: false,
            readOnly: true
        },

        /**
         * The number of times the animation should run 
         * @attribute iterations
         * @type Int
         * @default 1 
         */
        iterations: {
            value: 1
        },

        /**
         * The number of iterations that have occurred.
         * Resets when an animation ends (reaches iteration count or stop() called). 
         * @attribute iterationCount
         * @type Int
         * @default 0
         * @readOnly
         */
        iterationCount: {
            value: 0,
            readOnly: true
        },

        /**
         * How iterations of the animation should behave. 
         * Possible values are "normal" and "alternate".
         * Normal will repeat the animation, alternate will reverse on every other pass.
         *
         * @attribute direction
         * @type String
         * @default "normal"
         */
        direction: {
            value: 'normal' // | alternate (fwd on odd, rev on even per spec)
        },

        /**
         * Whether or not the animation is currently paused.
         * @attribute paused 
         * @type Boolean
         * @default false 
         * @readOnly
         */
        paused: {
            readOnly: true,
            value: false
        },

        /**
         * If true, animation begins from last frame
         * @attribute reverse
         * @type Boolean
         * @default false 
         */
        reverse: {
            value: false
        }


    };

    /**
     * Runs all animation instances.
     * @method run
     * @static
     */    
    Y.Anim.run = function() {
        for (var i in _instances) {
            if (_instances[i].run) {
                _instances[i].run();
            }
        }
    };

    /**
     * Pauses all animation instances.
     * @method pause
     * @static
     */    
    Y.Anim.pause = function() {
        for (var i in _running) { // stop timer if nothing running
            if (_running[i].pause) {
                _running[i].pause();
            }
        }
        Y.Anim._stopTimer();
    };

    /**
     * Stops all animation instances.
     * @method stop
     * @static
     */    
    Y.Anim.stop = function() {
        for (var i in _running) { // stop timer if nothing running
            if (_running[i].stop) {
                _running[i].stop();
            }
        }
        Y.Anim._stopTimer();
    };
    
    Y.Anim._startTimer = function() {
        if (!_timer) {
            _timer = setInterval(Y.Anim._runFrame, Y.Anim._intervalTime);
        }
    };

    Y.Anim._stopTimer = function() {
        clearInterval(_timer);
        _timer = 0;
    };

    /**
     * Called per Interval to handle each animation frame.
     * @method _runFrame
     * @private
     * @static
     */    
    Y.Anim._runFrame = function() {
        var done = true;
        for (var anim in _running) {
            if (_running[anim]._runFrame) {
                done = false;
                _running[anim]._runFrame();
            }
        }

        if (done) {
            Y.Anim._stopTimer();
        }
    };

    Y.Anim.RE_UNITS = /^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;

    var proto = {
        /**
         * Starts or resumes an animation.
         * @method run
         * @chainable
         */    
        run: function() {
            if (this.get(PAUSED)) {
                this._resume();
            } else if (!this.get(RUNNING)) {
                this._start();
            }
            return this;
        },

        /**
         * Pauses the animation and
         * freezes it in its current state and time.
         * Calling run() will continue where it left off.
         * @method pause
         * @chainable
         */    
        pause: function() {
            if (this.get(RUNNING)) {
                this._pause();
            }
            return this;
        },

        /**
         * Stops the animation and resets its time.
         * @method stop
         * @chainable
         */    
        stop: function(finish) {
            if (this.get(RUNNING) || this.get(PAUSED)) {
                this._end(finish);
            }
            return this;
        },

        _added: false,

        _start: function() {
            this._set(START_TIME, new Date() - this.get(ELAPSED_TIME));
            this._actualFrames = 0;
            if (!this.get(PAUSED)) {
                this._initAnimAttr();
            }
            _running[Y.stamp(this)] = this;
            Y.Anim._startTimer();

            this.fire(START);
        },

        _pause: function() {
            this._set(START_TIME, null);
            this._set(PAUSED, true);
            delete _running[Y.stamp(this)];

            /**
            * @event pause
            * @description fires when an animation is paused.
            * @param {Event} ev The pause event.
            * @type Event.Custom
            */
            this.fire('pause');
        },

        _resume: function() {
            this._set(PAUSED, false);
            _running[Y.stamp(this)] = this;

            /**
            * @event resume
            * @description fires when an animation is resumed (run from pause).
            * @param {Event} ev The pause event.
            * @type Event.Custom
            */
            this.fire('resume');
        },

        _end: function(finish) {
            var duration = this.get('duration') * 1000;
            if (finish) { // jump to last frame
                this._runAttrs(duration, duration, this.get(REVERSE));
            }

            this._set(START_TIME, null);
            this._set(ELAPSED_TIME, 0);
            this._set(PAUSED, false);

            delete _running[Y.stamp(this)];
            this.fire(END, {elapsed: this.get(ELAPSED_TIME)});
        },

        _runFrame: function() {
            var d = this._runtimeAttr.duration,
                t = new Date() - this.get(START_TIME),
                reverse = this.get(REVERSE),
                done = (t >= d),
                attribute,
                setter;
                
            this._runAttrs(t, d, reverse);
            this._actualFrames += 1;
            this._set(ELAPSED_TIME, t);

            this.fire(TWEEN);
            if (done) {
                this._lastFrame();
            }
        },

        _runAttrs: function(t, d, reverse) {
            var attr = this._runtimeAttr,
                customAttr = Y.Anim.behaviors,
                easing = attr.easing,
                lastFrame = d,
                attribute,
                setter,
                i;

            if (reverse) {
                t = d - t;
                lastFrame = 0;
            }

            for (i in attr) {
                if (attr[i].to) {
                    attribute = attr[i];
                    setter = (i in customAttr && 'set' in customAttr[i]) ?
                            customAttr[i].set : Y.Anim.DEFAULT_SETTER;

                    if (t < d) {
                        setter(this, i, attribute.from, attribute.to, t, d, easing, attribute.unit); 
                    } else {
                        setter(this, i, attribute.from, attribute.to, lastFrame, d, easing, attribute.unit); 
                    }
                }
            }


        },

        _lastFrame: function() {
            var iter = this.get('iterations'),
                iterCount = this.get(ITERATION_COUNT);

            iterCount += 1;
            if (iter === 'infinite' || iterCount < iter) {
                if (this.get('direction') === 'alternate') {
                    this.set(REVERSE, !this.get(REVERSE)); // flip it
                }
                /**
                * @event iteration
                * @description fires when an animation begins an iteration.
                * @param {Event} ev The iteration event.
                * @type Event.Custom
                */
                this.fire('iteration');
            } else {
                iterCount = 0;
                this._end();
            }

            this._set(START_TIME, new Date());
            this._set(ITERATION_COUNT, iterCount);
        },

        _initAnimAttr: function() {
            var from = this.get('from') || {},
                to = this.get('to') || {},
                attr = {
                    duration: this.get('duration') * 1000,
                    easing: this.get('easing')
                },
                customAttr = Y.Anim.behaviors,
                node = this.get(NODE), // implicit attr init
                unit, begin, end;

            Y.each(to, function(val, name) {
                if (typeof val === 'function') {
                    val = val.call(this, node);
                }

                begin = from[name];
                if (begin === undefined) {
                    begin = (name in customAttr && 'get' in customAttr[name])  ?
                            customAttr[name].get(this, name) : Y.Anim.DEFAULT_GETTER(this, name);
                } else if (typeof begin === 'function') {
                    begin = begin.call(this, node);
                }

                var mFrom = Y.Anim.RE_UNITS.exec(begin);
                var mTo = Y.Anim.RE_UNITS.exec(val);

                begin = mFrom ? mFrom[1] : begin;
                end = mTo ? mTo[1] : val;
                unit = mTo ? mTo[2] : mFrom ?  mFrom[2] : ''; // one might be zero TODO: mixed units

                if (!unit && Y.Anim.RE_DEFAULT_UNIT.test(name)) {
                    unit = Y.Anim.DEFAULT_UNIT;
                }

                if (!begin || !end) {
                    Y.error('invalid "from" or "to" for "' + name + '"', 'Anim');
                    return;
                }

                attr[name] = {
                    from: begin,
                    to: end,
                    unit: unit
                };

            }, this);

            this._runtimeAttr = attr;
        },


        // TODO: move to computedStyle? (browsers dont agree on default computed offsets)
        _getOffset: function(attr) {
            var node = this._node,
                val = node.getComputedStyle(attr),
                get = (attr === 'left') ? 'getX': 'getY',
                set = (attr === 'left') ? 'setX': 'setY';

            if (val === 'auto') {
                var position = node.getStyle('position');
                if (position === 'absolute' || position === 'fixed') {
                    val = node[get]();
                    node[set](val);
                } else {
                    val = 0;
                }
            }

            return val;
        }
    };

    Y.extend(Y.Anim, Y.Base, proto);


}, '@VERSION@' ,{requires:['base-base', 'node-style']});
YUI.add('anim-color', function(Y) {

/**
 * Adds support for color properties in <code>to</code>
 * and <code>from</code> attributes.
 * @module anim
 * @submodule anim-color
 */

var NUM = Number;

Y.Anim.behaviors.color = {
    set: function(anim, att, from, to, elapsed, duration, fn) {
        from = Y.Color.re_RGB.exec(Y.Color.toRGB(from));
        to = Y.Color.re_RGB.exec(Y.Color.toRGB(to));

        if (!from || from.length < 3 || !to || to.length < 3) {
            Y.error('invalid from or to passed to color behavior');
        }

        anim._node.setStyle(att, 'rgb(' + [
            Math.floor(fn(elapsed, NUM(from[1]), NUM(to[1]) - NUM(from[1]), duration)),
            Math.floor(fn(elapsed, NUM(from[2]), NUM(to[2]) - NUM(from[2]), duration)),
            Math.floor(fn(elapsed, NUM(from[3]), NUM(to[3]) - NUM(from[3]), duration))
        ].join(', ') + ')');
    },
    
    // TODO: default bgcolor const
    get: function(anim, att) {
        var val = anim._node.getComputedStyle(att);
        val = (val === 'transparent') ? 'rgb(255, 255, 255)' : val;
        return val;
    }
};

Y.each(['backgroundColor',
        'borderColor',
        'borderTopColor',
        'borderRightColor', 
        'borderBottomColor', 
        'borderLeftColor'],
        function(v, i) {
            Y.Anim.behaviors[v] = Y.Anim.behaviors.color;
        }
);


}, '@VERSION@' ,{requires:['anim-base']});
YUI.add('anim-curve', function(Y) {

/**
 * Adds support for the <code>curve</code> property for the <code>to</code> 
 * attribute.  A curve is zero or more control points and an end point.
 * @module anim
 * @submodule anim-curve
 */

Y.Anim.behaviors.curve = {
    set: function(anim, att, from, to, elapsed, duration, fn) {
        from = from.slice.call(from);
        to = to.slice.call(to);
        var t = fn(elapsed, 0, 100, duration) / 100;
        to.unshift(from);
        anim._node.setXY(Y.Anim.getBezier(to, t));
    },

    get: function(anim, att) {
        return anim._node.getXY();
    }
};

/**
 * Get the current position of the animated element based on t.
 * Each point is an array of "x" and "y" values (0 = x, 1 = y)
 * At least 2 points are required (start and end).
 * First point is start. Last point is end.
 * Additional control points are optional.     
 * @for Anim
 * @method getBezier
 * @static
 * @param {Array} points An array containing Bezier points
 * @param {Number} t A number between 0 and 1 which is the basis for determining current position
 * @return {Array} An array containing int x and y member data
 */
Y.Anim.getBezier = function(points, t) {  
    var n = points.length;
    var tmp = [];

    for (var i = 0; i < n; ++i){
        tmp[i] = [points[i][0], points[i][1]]; // save input
    }
    
    for (var j = 1; j < n; ++j) {
        for (i = 0; i < n - j; ++i) {
            tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
            tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1]; 
        }
    }

    return [ tmp[0][0], tmp[0][1] ]; 

};


}, '@VERSION@' ,{requires:['anim-xy']});
YUI.add('anim-easing', function(Y) {

/*
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright 2001 Robert Penner All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * The easing module provides methods for customizing
 * how an animation behaves during each run.
 * @class Easing
 * @module anim
 * @submodule anim-easing
 */

Y.Easing = {

    /**
     * Uniform speed between points.
     * @for Easing
     * @method easeNone
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeNone: function (t, b, c, d) {
        return c*t/d + b;
    },
    
    /**
     * Begins slowly and accelerates towards end. (quadratic)
     * @method easeIn
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeIn: function (t, b, c, d) {
        return c*(t/=d)*t + b;
    },

    /**
     * Begins quickly and decelerates towards end.  (quadratic)
     * @method easeOut
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeOut: function (t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    
    /**
     * Begins slowly and decelerates towards end. (quadratic)
     * @method easeBoth
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeBoth: function (t, b, c, d) {
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    
    /**
     * Begins slowly and accelerates towards end. (quartic)
     * @method easeInStrong
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeInStrong: function (t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    
    /**
     * Begins quickly and decelerates towards end.  (quartic)
     * @method easeOutStrong
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeOutStrong: function (t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    
    /**
     * Begins slowly and decelerates towards end. (quartic)
     * @method easeBothStrong
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    easeBothStrong: function (t, b, c, d) {
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },

    /**
     * Snap in elastic effect.
     * @method elasticIn
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} a Amplitude (optional)
     * @param {Number} p Period (optional)
     * @return {Number} The computed value for the current animation frame
     */

    elasticIn: function (t, b, c, d, a, p) {
        var s;
        if (t === 0) {
            return b;
        }
        if ( (t /= d) === 1 ) {
            return b+c;
        }
        if (!p) {
            p = d* 0.3;
        }
        
        if (!a || a < Math.abs(c)) {
            a = c; 
            s = p/4;
        }
        else {
            s = p/(2*Math.PI) * Math.asin (c/a);
        }
        
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },

    /**
     * Snap out elastic effect.
     * @method elasticOut
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} a Amplitude (optional)
     * @param {Number} p Period (optional)
     * @return {Number} The computed value for the current animation frame
     */
    elasticOut: function (t, b, c, d, a, p) {
        var s;
        if (t === 0) {
            return b;
        }
        if ( (t /= d) === 1 ) {
            return b+c;
        }
        if (!p) {
            p=d * 0.3;
        }
        
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p/(2*Math.PI) * Math.asin (c/a);
        }
        
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    
    /**
     * Snap both elastic effect.
     * @method elasticBoth
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} a Amplitude (optional)
     * @param {Number} p Period (optional)
     * @return {Number} The computed value for the current animation frame
     */
    elasticBoth: function (t, b, c, d, a, p) {
        var s;
        if (t === 0) {
            return b;
        }
        
        if ( (t /= d/2) === 2 ) {
            return b+c;
        }
        
        if (!p) {
            p = d*(0.3*1.5);
        }
        
        if ( !a || a < Math.abs(c) ) {
            a = c; 
            s = p/4;
        }
        else {
            s = p/(2*Math.PI) * Math.asin (c/a);
        }
        
        if (t < 1) {
            return -0.5*(a*Math.pow(2,10*(t-=1)) * 
                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) * 
                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },


    /**
     * Backtracks slightly, then reverses direction and moves to end.
     * @method backIn
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} s Overshoot (optional)
     * @return {Number} The computed value for the current animation frame
     */
    backIn: function (t, b, c, d, s) {
        if (s === undefined) {
            s = 1.70158;
        }
        if (t === d) {
            t -= 0.001;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },

    /**
     * Overshoots end, then reverses and comes back to end.
     * @method backOut
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} s Overshoot (optional)
     * @return {Number} The computed value for the current animation frame
     */
    backOut: function (t, b, c, d, s) {
        if (typeof s === 'undefined') {
            s = 1.70158;
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    
    /**
     * Backtracks slightly, then reverses direction, overshoots end, 
     * then reverses and comes back to end.
     * @method backBoth
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @param {Number} s Overshoot (optional)
     * @return {Number} The computed value for the current animation frame
     */
    backBoth: function (t, b, c, d, s) {
        if (typeof s === 'undefined') {
            s = 1.70158; 
        }
        
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },

    /**
     * Bounce off of start.
     * @method bounceIn
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    bounceIn: function (t, b, c, d) {
        return c - Y.Easing.bounceOut(d-t, 0, c, d) + b;
    },
    
    /**
     * Bounces off end.
     * @method bounceOut
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    bounceOut: function (t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    
    /**
     * Bounces off start and end.
     * @method bounceBoth
     * @param {Number} t Time value used to compute current value
     * @param {Number} b Starting value
     * @param {Number} c Delta between start and end values
     * @param {Number} d Total length of animation
     * @return {Number} The computed value for the current animation frame
     */
    bounceBoth: function (t, b, c, d) {
        if (t < d/2) {
            return Y.Easing.bounceIn(t * 2, 0, c, d) * 0.5 + b;
        }
        return Y.Easing.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
};


}, '@VERSION@' ,{requires:['anim-base']});
YUI.add('anim-node-plugin', function(Y) {

/**
 *  Binds an Anim instance to a Node instance
 * @module anim
 * @class Plugin.NodeFX
 * @extends Base
 * @submodule anim-node-plugin
 */

var NodeFX = function(config) {
    config = (config) ? Y.merge(config) : {};
    config.node = config.host;
    NodeFX.superclass.constructor.apply(this, arguments);
};

NodeFX.NAME = "nodefx";
NodeFX.NS = "fx";

Y.extend(NodeFX, Y.Anim);

Y.namespace('Plugin');
Y.Plugin.NodeFX = NodeFX;


}, '@VERSION@' ,{requires:['node-pluginhost', 'anim-base']});
YUI.add('anim-scroll', function(Y) {

/**
 * Adds support for the <code>scroll</code> property in <code>to</code>
 * and <code>from</code> attributes.
 * @module anim
 * @submodule anim-scroll
 */

var NUM = Number;

//TODO: deprecate for scrollTop/Left properties?
Y.Anim.behaviors.scroll = {
    set: function(anim, att, from, to, elapsed, duration, fn) {
        var
            node = anim._node, 
            val = ([
            fn(elapsed, NUM(from[0]), NUM(to[0]) - NUM(from[0]), duration),
            fn(elapsed, NUM(from[1]), NUM(to[1]) - NUM(from[1]), duration)
        ]);

        if (val[0]) {
            node.set('scrollLeft', val[0]);
        }

        if (val[1]) {
            node.set('scrollTop', val[1]);
        }
    },
    get: function(anim) {
        var node = anim._node;
        return [node.get('scrollLeft'), node.get('scrollTop')];
    }
};



}, '@VERSION@' ,{requires:['anim-base']});
YUI.add('anim-xy', function(Y) {

/**
 * Adds support for the <code>xy</code> property in <code>from</code> and 
 * <code>to</code> attributes.
 * @module anim
 * @submodule anim-xy
 */

var NUM = Number;

Y.Anim.behaviors.xy = {
    set: function(anim, att, from, to, elapsed, duration, fn) {
        anim._node.setXY([
            fn(elapsed, NUM(from[0]), NUM(to[0]) - NUM(from[0]), duration),
            fn(elapsed, NUM(from[1]), NUM(to[1]) - NUM(from[1]), duration)
        ]);
    },
    get: function(anim) {
        return anim._node.getXY();
    }
};



}, '@VERSION@' ,{requires:['anim-base', 'node-screen']});


YUI.add('anim', function(Y){}, '@VERSION@' ,{use:['anim-base', 'anim-color', 'anim-curve', 'anim-easing', 'anim-node-plugin', 'anim-scroll', 'anim-xy'], skinnable:false});

