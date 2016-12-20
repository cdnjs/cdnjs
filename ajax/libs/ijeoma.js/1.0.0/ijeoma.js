(function(window, undefined) {
    MOTION = function(duration, delay) {
        this._name = '';

        this._playTime = 0;
        this._time = 0;
        this._duration = (typeof duration === 'undefined') ? 0 : duration;
        this._delayTime = (typeof delay === 'undefined') ? 0 : delay;

        this._repeatTime = 0;
        this._repeatDuration = 0;

        this._reverseTime = 0;

        this._timeScale = 1;

        this._isPlaying = false;
        this._isRepeating = false;
        this._isRepeatingDelay = false;
        this._isReversing = false;
        this._isSeeking = false;

        this._hasController = false;
        this._useOnce = MOTION._useOnce;

        this._onStart = null;
        this._onEnd = null;
        this._onUpdate = null;
        this._onRepeat = null;

        MOTION._add(this);
    };

    MOTION.REVISION = '1';

    MOTION.ABSOLUTE = 'absolute';
    MOTION.RELATIVE = 'relative';

    MOTION.LINEAR = 'linear';
    MOTION.COSINE = 'cosine';
    MOTION.CUBIC = 'cubic';
    MOTION.HERMITE = 'hermite';

    MOTION._motions = [];

    MOTION._performance = (typeof window !== undefined && window.performance !== undefined && window.performance.now !== undefined) ? window.performance : Date;
    MOTION._useOnce = false;
    MOTION._time = 0;

    MOTION.playAll = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].play();
    };

    MOTION.stopAll = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].stop();
    };

    MOTION.resumeAll = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].resume();
    };

    MOTION.pauseAll = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].pause();
    };

    MOTION.seekAll = function(t) {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].seek(t);
    };

    MOTION.repeatAll = function(duration) {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].repeat(duration);
    };

    MOTION.reverseAll = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].reverse();
    };

    MOTION.timeScaleAll = function(t) {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].timeScale(t);
    };

    MOTION.useOnce = function(useOnce) {
        MOTION._useOnce = (typeof useOnce !== 'undefined') ? useOnce : true;

        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].useOnce(MOTION._useOnce);
    };

    MOTION._add = function(child) {
        MOTION._motions.push(child);
    };

    MOTION.remove = function(child) {
        var i = MOTION._motions.indexOf(child);
        MOTION._motions.splice(i, 1);
    };

    MOTION.removeAll = function(child) {
        MOTION._motions = [];
    };

    MOTION.update = function(time) {
        if (typeof time == 'undefined') return false;

        MOTION._time = typeof time !== undefined ? time : this._performance.now();

        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i]._update();
    };

    MOTION.autoUpdate = function() {
        _isAutoUpdating = true;

        return this;
    };

    MOTION.noAutoUpdate = function() {
        _isAutoUpdating = false;

        return this;
    };

    MOTION.time = function() {
        return MOTION._time;
    }

    MOTION.isPlaying = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            if (MOTION._motions[i].isPlaying())
                return true;

        return false;
    };

    MOTION.prototype.constructor = MOTION;

    MOTION.prototype.play = function() {
        this.dispatchStartedEvent();

        this.seek(0);
        this.resume();

        this._repeatTime = 0;

        return this;
    };

    MOTION.prototype.stop = function() {
        this.seek(1);
        this.pause();

        this._repeatTime = 0;

        this.dispatchEndedEvent();

        if (this._useOnce && !this._hasController)
            MOTION.remove(this);
        else
            return this;
    };

    MOTION.prototype.pause = function() {
        this._isPlaying = false;

        this._playTime = this._time;

        return this;
    };

    MOTION.prototype.resume = function() {
        this._isPlaying = true;

        this._playTime = MOTION._time - this._playTime;

        return this;
    };

    MOTION.prototype.seek = function(value) {
        this._isPlaying = false;
        this._isSeeking = true;

        this._playTime = (this._delayTime + this._duration) * value;

        this.setTime(this._playTime);

        this.dispatchChangedEvent();

        this._isSeeking = false;

        return this;
    };

    MOTION.prototype.repeat = function(duration) {
        this._isRepeating = true;
        this._repeatDuration = (typeof duration !== 'undefined') ? duration : 0;

        return this;
    };

    MOTION.prototype.noRepeat = function() {
        this._isRepeating = false;
        this._repeatDuration = 0;

        return this;
    };

    MOTION.prototype.reverse = function() {
        this._isReversing = true;

        return this;
    };

    MOTION.prototype.noReverse = function() {
        this._isReversing = false;

        return this;
    };

    MOTION.prototype._update = function(time) {
        if (this._isPlaying) {
            if (typeof time == 'undefined')
                this._updateTime();
            else
                this.setTime(time);

            this.dispatchChangedEvent();

            if (!this._isInsidePlayingTime(this._time) && !this._isInsideDelayingTime(this._time)) {
                this._reverseTime = (this._reverseTime === 0) ? this._duration : 0;

                if (this._isRepeating && (this._repeatDuration === 0 || this._repeatTime < this._repeatDuration)) {
                    this.seek(0);
                    this.resume();

                    this._repeatTime++;

                    if (!this._isRepeatingDelay)
                        this._delayTime = 0;

                    this.dispatchRepeatedEvent();
                } else {

                    this.stop();
                }
            }
        }
    };

    MOTION.prototype._updateTime = function() {
        this._time = (MOTION._time - this._playTime) * this._timeScale;

        if (this._isReversing && this._reverseTime !== 0)
            this._time = this._reverseTime - this._time;
    };

    MOTION.prototype.setName = function(name) {
        this._name = name;

        return this;
    };

    MOTION.prototype.name = MOTION.prototype.setName;

    MOTION.prototype.getName = function() {
        return this._name;
    };

    MOTION.prototype.setTime = function(time) {
        this._time = time * this._timeScale;

        if (this._isReversing && this._reverseTime !== 0) this._time = this._reverseTime - this._time;

        return this;
    };

    MOTION.prototype.getTime = function() {
        return (this._time < this._delayTime) ? 0 : (this._time - this._delayTime);
    };

    MOTION.prototype.time = MOTION.prototype.getTime;

    MOTION.prototype.setTimeScale = function(timeScale) {
        this._timeScale = timeScale;

        return this;
    };

    MOTION.prototype.timeScale = MOTION.prototype.setTimeScale;

    MOTION.prototype.getTimeScale = function() {
        return this._timeScale;
    };

    MOTION.prototype.getPosition = function() {
        return this.getTime() / this._duration;
    };

    MOTION.prototype.position = MOTION.prototype.getPosition;

    MOTION.prototype.setDuration = function(_duration) {
        this._duration = _duration;

        return this;
    };

    MOTION.prototype.getDuration = function() {
        return this._duration;
    };

    MOTION.prototype.duration = MOTION.prototype.getDuration;

    MOTION.prototype.getRepeatTime = function() {
        return this._repeatTime;
    };

    MOTION.prototype.repeatTime = MOTION.prototype.getRepeatTime;

    MOTION.prototype.setDelay = function(delay) {
        this._delayTime = delay;

        return this;
    };

    MOTION.prototype.delay = MOTION.prototype.setDelay;

    MOTION.prototype.noDelay = function() {
        this._delayTime = 0;

        return this;
    };

    MOTION.prototype.getDelay = function() {
        return this._delayTime;
    };

    MOTION.prototype.repeatDelay = function(duration) {
        this.repeat(duration);
        this._isRepeatingDelay = true;

        return this;
    };

    MOTION.prototype.noRepeatDelay = function() {
        this.noRepeat();
        this._isRepeatingDelay = false;

        return this;
    };

    MOTION.prototype.isDelaying = function() {
        return (this._time <= this._delayTime);
    };

    MOTION.prototype.isPlaying = function() {
        return this._isPlaying;
    };

    MOTION.prototype._isInsideDelayingTime = function(value) {
        return (value >= 0 && value < this._delayTime);
    };

    MOTION.prototype._isInsidePlayingTime = function(value) {
        return (value >= this._delayTime && value < this._delayTime + this._duration);
    };

    MOTION.prototype._isAbovePlayingTime = function(value) {
        return value >= this._delayTime + this._duration;
    };

    MOTION.prototype.useOnce = function(useOnce) {
        this._useOnce = (typeof useOnce !== 'undefined') ? useOnce : true;

        return this;
    }

    MOTION._map = function(n, start1, end1, start2, end2) {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
    };

    MOTION.prototype.onStart = function(func) {
        this._onStart = func;

        return this;
    };

    MOTION.prototype.onEnd = function(func) {
        this._onEnd = func;

        return this;
    };

    MOTION.prototype.onUpdate = function(func) {
        this._onUpdate = func;

        return this;
    };

    MOTION.prototype.onRepeat = function(func) {
        this._onRepeat = func;

        return this;
    };

    MOTION.prototype.dispatchStartedEvent = function() {
        if (this._onStart)
            this._onStart();
    };

    MOTION.prototype.dispatchEndedEvent = function() {
        if (this._onEnd)
            this._onEnd();
    };

    MOTION.prototype.dispatchChangedEvent = function() {
        if (this._onUpdate)
            this._onUpdate();
    };

    MOTION.prototype.dispatchRepeatedEvent = function() {
        if (this._onRepeat)
            this._onRepeat();
    };

    window.MOTION = MOTION;

    if (typeof Object.create != 'function') {
        Object.create = (function() {
            var Object = function() {};
            return function(prototype) {
                if (arguments.length > 1) {
                    throw Error('Second argument not supported');
                }
                if (typeof prototype != 'object') {
                    throw TypeError('Argument must be an object');
                }
                Object.prototype = prototype;
                var result = new Object();
                Object.prototype = null;
                return result;
            };
        })();
    }
})(window);
;(function(MOTION, undefined) {
    MOTION.Quad = function() {};
    MOTION.Quad.In = function(t) {
        return (t /= 1) * t;
    };
    MOTION.Quad.Out = function(t) {
        return -(t /= 1) * (t - 2);
    };
    MOTION.Quad.InOut = function(t) {
        if ((t /= 1 / 2) < 1) return .5 * t * t;
        return -.5 * ((--t) * (t - 2) - 1);
    };
    MOTION.Cubic = function() {};
    MOTION.Cubic.In = function(t) {
        return (t /= 1) * t * t;
    };
    MOTION.Cubic.Out = function(t) {
        return ((t = t / 1 - 1) * t * t + 1);
    };
    MOTION.Cubic.InOut = function(t) {
        if ((t /= 1 / 2) < 1) return .5 * t * t * t;
        return .5 * ((t -= 2) * t * t + 2);
    };
    MOTION.Quart = function() {};
    MOTION.Quart.In = function(t) {
        return (t /= 1) * t * t * t;
    };
    MOTION.Quart.Out = function(t) {
        return -((t = t / 1 - 1) * t * t * t - 1);
    };
    MOTION.Quart.InOut = function(t) {
        if ((t /= 1 / 2) < 1) return .5 * t * t * t * t;
        return -.5 * ((t -= 2) * t * t * t - 2);
    };
    MOTION.Quint = function() {};
    MOTION.Quint.In = function(t) {
        return (t /= 1) * t * t * t * t;
    };
    MOTION.Quint.Out = function(t) {
        return ((t = t / 1 - 1) * t * t * t * t + 1);
    };
    MOTION.Quint.InOut = function(t) {
        if ((t /= 1 / 2) < 1) return .5 * t * t * t * t * t;
        return .5 * ((t -= 2) * t * t * t * t + 2);
    };
    MOTION.Sine = function() {};
    MOTION.Sine.In = function(t) {
        return -Math.cos(t / 1 * (Math.PI / 2)) + 1;
    };
    MOTION.Sine.Out = function(t) {
        return Math.sin(t / 1 * (Math.PI / 2));
    };
    MOTION.Sine.InOut = function(t) {
        return -.5 * (Math.cos(Math.PI * t / 1) - 1);
    };
    MOTION.Expo = function() {};
    MOTION.Expo.In = function(t) {
        return (t == 0) ? 0 : Math.pow(2, 10 * (t / 1 - 1));
    };
    MOTION.Expo.Out = function(t) {
        return (t == 1) ? 1 : (-Math.pow(2, -10 * t / 1) + 1);
    };
    MOTION.Expo.InOut = function(t) {
        if (t == 0) return 0;
        if (t == 1) return 1;
        if ((t /= 1 / 2) < 1) return .5 * Math.pow(2, 10 * (t - 1));
        return .5 * (-Math.pow(2, -10 * --t) + 2);
    };
    MOTION.Circ = function() {};
    MOTION.Circ.In = function(t) {
        return -(Math.sqrt(1 - (t /= 1) * t) - 1);
    };
    MOTION.Circ.Out = function(t) {
        return Math.sqrt(1 - (t = t / 1 - 1) * t);
    };
    MOTION.Circ.InOut = function(t) {
        if ((t /= 1 / 2) < 1) return -.5 * (Math.sqrt(1 - t * t) - 1);
        return .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    };
    MOTION.Elastic = function() {};
    MOTION.Elastic.In = function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if ((t /= 1) == 1) return 1;
        if (!p) p = .3;
        if (a < Math.abs(1)) {
            a = 1;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
    };
    MOTION.Elastic.Out = function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if ((t /= 1) == 1) return 1;
        if (!p) p = .3;
        if (a < Math.abs(1)) {
            a = 1;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
    };
    MOTION.Elastic.InOut = function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if ((t /= 1 / 2) == 2) return 1;
        if (!p) p = (.3 * 1.5);
        if (a < Math.abs(1)) {
            a = 1;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * .5 + 1;
    };
    MOTION.Back = function() {};
    MOTION.Back.In = function(t, s) {
        if (s == undefined) s = 1.70158;
        return (t /= 1) * t * ((s + 1) * t - s);
    };
    MOTION.Back.Out = function(t, s) {
        if (s == undefined) s = 1.70158;
        return ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
    };
    MOTION.Back.InOut = function(t, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= 1 / 2) < 1) return .5 * (t * t * (((s *= (1.525)) + 1) * t - s));
        return .5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
    };
    MOTION.Bounce = function() {};
    MOTION.Bounce.In = function(t) {
        return 1 - MOTION.Bounce.Out(1 - t, 0);
    };
    MOTION.Bounce.Out = function(t) {
        if ((t /= 1) < (1 / 2.75)) {
            return (7.5625 * t * t);
        } else if (t < (2 / 2.75)) {
            return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
        } else if (t < (2.5 / 2.75)) {
            return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
        } else {
            return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
        }
    };
    MOTION.Bounce.InOut = function(t) {
        if (t < .5) return MOTION.Bounce.In(t * 2, 0) * .5;
        return MOTION.Bounce.Out(t * 2 - 1, 0) * .5 + .5;
    }
})(MOTION);
;(function(MOTION, undefined) {  
    MOTION.Linear = function(y1, y2, t) {
        return (y1 * (1 - t) + y2 * t);
    };

    MOTION.Smoothstep = function(y1, y2, t) {
        // return (y1 * (1 - t) + y2 * t);
        // ((x) * (x) * (3 - 2 * (x)))
    };

    MOTION.Cosine = function(y1, y2, t) {
        var t2 = (1 - PApplet.cos(t * PConstants.PI)) / 2;
        return (y1 * (1 - t2) + y2 * t2);
    };

    // MOTION.Cubic = function(y0, y1, y2, y3, t) {
    //     var a0, a1, a2, a3, t2;
    //     t2 = t * t;
    //     a0 = y3 - y2 - y0 + y1;
    //     a1 = y0 - y1 - a0;
    //     a2 = y2 - y0;
    //     a3 = y1;
    //     //http://paulbourke.net/miscellaneous/interpolation/
    //     //     a0 = -0.5*y0 + 1.5*y1 - 1.5*y2 + 0.5*y3;
    //     // a1 = y0 - 2.5*y1 + 2*y2 - 0.5*y3;
    //     // a2 = -0.5*y0 + 0.5*y2;
    //     // a3 = y1;
    //     return (a0 * t * t2 + a1 * t2 + a2 * t + a3);
    // };

    /*
     * Tension: 1 is high, 0 normal, -1 is low Bias: 0 is even, positive is
     * towards first segment, negative towards the other
     */
    MOTION.Hermite = function(y0, y1, y2, y3, t, tension, bias) {
        var m0, m1, t2, t3;
        var a0, a1, a2, a3;
        t2 = t * t;
        t3 = t2 * t;
        m0 = (y1 - y0) * (1 + bias) * (1 - tension) / 2;
        m0 += (y2 - y1) * (1 - bias) * (1 - tension) / 2;
        m1 = (y2 - y1) * (1 + bias) * (1 - tension) / 2;
        m1 += (y3 - y2) * (1 - bias) * (1 - tension) / 2;
        a0 = 2 * t3 - 3 * t2 + 1;
        a1 = t3 - 2 * t2 + t;
        a2 = t3 - t2;
        a3 = -2 * t3 + 3 * t2;
        return (a0 * y1 + a1 * m0 + a2 * m1 + a3 * y2);
    };
})(MOTION);
;(function(MOTION, undefined) {
    MOTION.MotionController = function(motions) {
        MOTION.call(this);

        this._motions = [];
        this._valueMode = null;

        if (motions) this.addAll(motions);
    };

    MOTION.MotionController.prototype = Object.create(MOTION.prototype);
    MOTION.MotionController.prototype.constructor = MOTION.MotionController;

    MOTION.MotionController.prototype.reverse = function() {
        MOTION.prototype.reverse.call(this);

        for (var i = 0; i < this._motions.length; i++)
            this._motions[i].reverse();

        return this;
    };

    MOTION.MotionController.prototype._updateMotions = function() {
        for (var i = 0; i < this._motions.length; i++) {
            var m = this._motions[i];

            if (this._isSeeking) {
                if (m._isInsidePlayingTime(this.getTime()))
                    m.seek(MOTION._map(this.getTime(), 0, m.getDelay() + m.getDuration(), 0, 1));
                else if (m._isAbovePlayingTime(this.getTime()))
                    m.seek(1);
                else
                    m.seek(0);
            } else if (m._isInsidePlayingTime(this.getTime())) {
                if (m.isPlaying())
                    m._update(this.getTime(), false);
                else
                    m.play();
            } else if (m.isPlaying())
                m.stop();
        }
    };

    MOTION.MotionController.prototype._updateDuration = function() {
        for (var i = 0; i < this._motions.length; i++)
            this._duration = Math.max(this._duration, this._motions[i].getDelay() + this._motions[i].getDuration());
    };

    MOTION.MotionController.prototype.getPosition = function() {
        return this.getTime() / this._duration;
    };

    MOTION.MotionController.prototype.get = function(name) {
        if (typeof arguments[0] === 'number') {
            return this._motions[arguments[0]];
        } else if (typeof arguments[0] === 'string') {
            for (var j = 0; j < this._motions.length; j++)
                if (this._motions[j]._name === arguments[0])
                    return this._motions[j];
        }

        return this._motions;
    };

    MOTION.MotionController.prototype.getCount = function() {
        return this._motions.length;
    };

    MOTION.MotionController.prototype.count = MOTION.MotionController.prototype.getCount;

    MOTION.MotionController.prototype.setEasing = function(easing) {
        this._easing = (typeof easing == 'undefined') ? (function(t) {
            return t;
        }) : easing;

        for (var i = 0; i < this._motions.length; i++) {
            if (this._motions[i] instanceof MOTION.Tween) {
                this._motions[i].easing(this._easing);
            }
        }

        return this;
    };

    MOTION.MotionController.prototype.easing = MOTION.MotionController.prototype.setEasing;

    MOTION.MotionController.prototype.getEasing = function() {
        return this._easing;
    };

    MOTION.MotionController.prototype.add = function(motion) {
        this.insert(motion, 0);
        return this;
    };

    MOTION.MotionController.prototype.insert = function(motion, time) {
        motion.delay(time);
        if (this._valueMode) motion.valueMode(this._valueMode);
        motion._hasController = true;

        this._motions.push(motion);

        MOTION.remove(motion);

        this._updateDuration();

        return this;
    };

    MOTION.MotionController.prototype.remove = function(motion) {
        var i;

        if (typeof arguments[0] === 'number') {
            i = arguments[0];
        } else if (typeof arguments[0] === 'string') {
            for (var j = 0; j < this._motions.length; j++)
                if (this._motions[j]._name === arguments[0])
                    motion = this._motions[j];
        } else if (typeof arguments[0] === 'object') {
            i = this._motions.indexOf(motion);
        }

        if (i != -1) {
            this._motions.splice(i, 1);
            this._updateDuration();
        }

        return this;
    };

    MOTION.MotionController.prototype.addAll = function(motions) {
        for (var i = 0; i < motions.length; i++)
            this.add(motions[i]);

        return this;
    };

    MOTION.MotionController.prototype.removeAll = function() {
        for (var i = 0; i < this._motions.length; i++)
            this.remove(this._motions[i]);

        return this;
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this._updateMotions();
        MOTION.prototype.dispatchChangedEvent.call(this);
    };
})(MOTION)
;(function(MOTION, undefined) {
    MOTION.Parallel = function(motions) {
        MOTION.MotionController.call(this, name, motions);
    };

    MOTION.Parallel.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Parallel.prototype.constructor = MOTION.Parallel;

    MOTION.Parallel.prototype._updateMotions = function() {
        for (var i = 0; i < this._motions.length; i++) {
            var m = this._motions[i];

            if (this._isSeeking) {
                if (m._isInsidePlayingTime(this.getTime()))
                    m.seek(MOTION._map(this.getTime(), 0, m.getDelay() + m.getDuration(), 0, 1));
                else if (m._isAbovePlayingTime(this.getTime()))
                    m.seek(1);
                else
                    m.seek(0);
            } else if (m._isInsidePlayingTime(this.getTime())) {
                if (m.isPlaying())
                    m._update(this.getTime(), false);
                else
                    m.play();
            } else if (m.isPlaying()) {
                if (this._isReversing && i < this._motions.length - 1)
                    m.seek(1);
                else
                    for (var i = 0; i < this._motions.length; i++)
                        this._motions[i].stop();
            }
        }
    };
})(MOTION);
;(function(MOTION, undefined) {

    MOTION._properties = [];

    MOTION.Property = function(object, field, values) {
        this._object = (typeof arguments[0] === 'object') ? object : window;
        this._field = (typeof arguments[0] === 'object') ? field : arguments[0];

        var values = (typeof arguments[0] === 'object') ? values : arguments[1];
        this._start = (values instanceof Array) ? values[0] : ((typeof this._object[this._field] == 'undefined') ? 0 : this._object[this._field]);
        this._end = this._object[this._field] = (values instanceof Array) ? values[1] : values;

        this._position = 0;

        var found = MOTION._properties.filter(function(d) {
            return d.object == this._object && d.field == this._field;
        }, this);

        if (found.length == 1) {
            this._order = ++found[0].count;
        } else {
            MOTION._properties.push({
                object: this._object,
                field: this._field,
                count: 1
            })
            this._order = 1;
        }
    };

    MOTION.Property.prototype.update = function(position) {
        this._position = position;

        if ((this._position > 0 && this._position <= 1) || (this._position == 0 && this._order == 1))
            this._object[this._field] = MOTION.Linear(this._start, this._end, this._position);
        else {

        }
    };

    MOTION.Property.prototype._updateArray = function(position) {
        var segmentTRange = 1 / (this._end.length - 1);

        if (position < 1) {
            segmentPointIndex = Math.floor((this._end.length - 1) * position);
            segmentT = MOTION._map((position % segmentTRange), 0, segmentTRange, 0, 1);
        } else {
            segmentPointIndex = (this._end.length - 2);
            segmentT = 1;
        }

        var v1, v2, v3, v4;

        v2 = this._end[segmentPointIndex];
        v3 = this._end[segmentPointIndex + 1];
        v1 = v4 = 0;

        if (segmentPointIndex == 0) {
            var segmentBegin = this._end[0];
            var segmentEnd = this._end[1];
            var segmentSlope = segmentEnd - segmentBegin;
            v1 = segmentEnd - segmentSlope;
        } else {
            v1 = this._end[segmentPointIndex - 1];
        }
        
        if ((segmentPointIndex + 1) == this._end.length - 1) {
            var segmentBegin = this._end[this._end.length - 2];
            var segmentEnd = this._end[this._end.length - 1];
            var segmentSlope = segmentEnd - segmentBegin;
            v4 = segmentEnd + segmentSlope;
        } else {
            v4 = this._end[segmentPointIndex + 2];
        }

        // if (this._interpolation === MOTION.LINEAR) {
        return MOTION.Linear(v2.y, v3.y, segmentT);
        // } else if (this._interpolation === MOTION.COSINE) {
        // return MOTION.Cosine(v2.y, v3.y, segmentT);
        // } else if (this._interpolation === MOTION.CUBIC) {
        //     return MOTION.Cubic(v1.y, v2.y, v3.y, v4.y, segmentT);
        // } else if (this._interpolation === MOTION.HERMITE) {
        //     return MOTION.Hermite(v1.y, v2.y, v3.y, v4.y, segmentT, tension, bias);
        // }
    };

    MOTION.Property.prototype.getStart = function() {
        return this._start;
    };

    MOTION.Property.prototype.setStart = function(start) {
        if (typeof start === 'undefined') {
            if (typeof this._object[this._field] === 'undefined')
                this._start = 0;
            else
                this._start = this._object[this._field];
        } else
            this._start = start;
        return this;
    };


    MOTION.Property.prototype.start = MOTION.Property.prototype.setStart;

    MOTION.Property.prototype.getEnd = function() {
        return this._end;
    };

    MOTION.Property.prototype.setEnd = function(end) {
        this._end = end;
        return this;
    };

    MOTION.Property.prototype.end = MOTION.Property.prototype.setEnd;

    MOTION.Property.prototype.getPosition = function() {
        return this._position;
    };

    MOTION.Property.prototype.position = MOTION.Property.prototype.getPosition;

    MOTION.Property.prototype.setPosition = function(position) {
        this._position = position;
        this.update();
        return this;
    };

    MOTION.Property.prototype.getValue = function() {
        return this._object[this._field];
    };

    MOTION.Property.prototype.value = MOTION.Property.prototype.getValue;

    MOTION.NumberProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end);
    };

    MOTION.NumberProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.NumberProperty.prototype.constrctor = MOTION.NumberProperty;
})(MOTION);
;(function(MOTION, undefined) {
    MOTION.Sequence = function(children) {
        MOTION.MotionController.call(this, children);

        this._current = null;
        this._currentIndex = 0;
    };

    MOTION.Sequence.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Sequence.prototype.constructor = MOTION.Sequence;

    MOTION.Sequence.prototype.add = function(child) {
        MOTION.MotionController.prototype.insert.call(this, child, this._duration);

        return this;
    };

    MOTION.Sequence.prototype.getCurrentIndex = function() {
        return this._currentIndex;
    };

    MOTION.Sequence.prototype.currentIndex = MOTION.Sequence.prototype.getCurrentIndex;

    MOTION.Sequence.prototype.getCurrent = function() {
        return this._current;
    };

    MOTION.Sequence.prototype.current = MOTION.Sequence.prototype.getCurrent;

    MOTION.MotionController.prototype.dispatchStartedEvent = function() {
        this._current = null;
        this._currentIndex = 0;

        MOTION.prototype.dispatchStartedEvent.call(this)
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this._updateMotions();

        if (this._isPlaying) {
            for (var i = 0; i < this._motions.length; i++) {
                var c = this._motions[i];

                if (c._isInsidePlayingTime(this._time)) {
                    this._currentIndex = i;
                    this._current = c;

                    break;
                }
            }
        }

        MOTION.prototype.dispatchChangedEvent.call(this)
    };

    MOTION.MotionController.prototype.dispatchRepeatedEvent = function() {
        this._current = null;
        this._currentIndex = 0;

        MOTION.prototype.dispatchRepeatedEvent.call(this)
    };
})(MOTION);
;(function(MOTION, undefined) {
    MOTION.Keyframe = function(time, motions) {
        MOTION.MotionController.call(this, motions)
        this.delay(time);
    };

    MOTION.Keyframe.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Keyframe.prototype.constructor = MOTION.Keyframe;

    MOTION.Timeline = function() {
        MOTION.MotionController.call(this);
    };

    MOTION.Timeline.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Timeline.prototype.constructor = MOTION.Timeline;


    MOTION.Timeline.prototype.play = function(time) { 
        if (typeof arguments[0] == 'undefined') {
            MOTION.MotionController.prototype.play.call(this);
        } else if (typeof arguments[0] == 'number') {
            this.seek(arguments[0] / this._duration);
            this.resume();
        } else if (typeof arguments[0] == 'string') {
            for (var i = 0; i < this._motions.length; i++)
                if (this._motions[i]._name === arguments[0]) {
                    this.seek(this._motions[i] / this._duration);
                    this.resume();
                }
        } else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.resume();
        }

        return this;
    };

    MOTION.Timeline.prototype.stop = function(time) {
        if (typeof arguments[0] == 'undefined')
            MOTION.MotionController.prototype.stop.call(this);
        else if (typeof arguments[0] == 'number') {
            this.seek(arguments[0] / this._duration);
            this.pause();
        } else if (typeof arguments[0] == 'string') {
            for (var i = 0; i < this._motions.length; i++)
                if (this._motions[i]._name === arguments[0]) {
                    this.seek(this._motions[i] / this._duration);
                    this.pause();
                }
        } else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.pause();
        }

        return this;
    };

    MOTION.Timeline.prototype.add = function(motion, time) {
        if (motion instanceof MOTION.Keyframe) {
            if (typeof time == 'undefined')
                this.insert(motion, motion.getDelay());
            else
                this.insert(motion, time);
        } else {
            if (typeof time == 'undefined') {
                this._motions[this._motions.indexOf(c)] = c;
            } else {
                var key = time + '';

                var k = new MOTION.Keyframe(time + '');
                k.add(motion);

                this.insert(k, time);
            }
        }

        return this;
    };

    MOTION.Timeline.prototype.getCurrent = function(index) {
        var current = [];

        for (var i = 0; i < this._motions.length; i++)
            if (this._motions[i].isInsidePlayingTime(this.getTime()))
                current.push(this._motions[i]);

        if (current.length == 0)
            return null;
        else
            return current;
    };

    MOTION.Timeline.prototype.current = MOTION.Timeline.prototype.getCurrent
})(MOTION)
;(function(MOTION, undefined) {
    MOTION.Tween = function(object, property, end, duration, delay, easing) {
        this._properties = [];
        this._valueMode = MOTION.ABSOLUTE;

        this._easing = function(t) {
            return t;
        };
        this._inpterpolation = MOTION.Linear;

        if (typeof arguments[0] === 'object') {
            MOTION.call(this, arguments[3], arguments[4]);
            this.addProperty(arguments[0], arguments[1], arguments[2]);

            if (typeof arguments[5] !== 'undefined')
                this.setEasing(arguments[5]);
        } else if (typeof arguments[0] === 'string') {
            MOTION.call(this, arguments[2], arguments[3]);
            this.addProperty(arguments[0], arguments[1]);

            if (typeof arguments[4] !== 'undefined')
                this.setEasing(arguments[4]);
        } else {
            MOTION.call(this, arguments[0], arguments[1]);

            if (typeof arguments[2] !== 'undefined')
                this.setEasing(arguments[2]);
        }
    };

    MOTION.Tween.prototype = Object.create(MOTION.prototype);
    MOTION.Tween.prototype.constrctor = MOTION.Tween;

    MOTION.Tween.prototype._updateProperties = function() {
        for (var i = 0; i < this._properties.length; i++)
            this._properties[i].update(this._easing(this.position()));
    };

    MOTION.Tween.prototype.addProperty = function(object, property, end) {
        if (arguments[0] instanceof MOTION.Property)
            p = arguments[0];
        else if (typeof arguments[0] === 'object')
            p = new MOTION.NumberProperty(object, property, end);
        else
            p = new MOTION.NumberProperty(arguments[0], arguments[1]);

        this._properties.push(p);

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;


    MOTION.Tween.prototype.remove = function(child) {
        var i;

        if (typeof arguments[0] === 'number') {
            i = arguments[0];
        } else if (typeof arguments[0] === 'name') {
            i = this._properties.indexOf(property);
        } else if (typeof arguments[0] === 'object') {
            for (var j = 0; j < this._properties.length; j++)
                if (this._properties[j]._field === arguments[0])
                    j = i;
        }

        if (i && i != -1)
            this._properties.splice(i, 1);

        return this;
    };

    MOTION.Tween.prototype.getProperty = function() {
        if (typeof arguments[0] === 'string') {
            for (var j = 0; j < this._properties.length; j++)
                if (this._properties[j]._field === arguments[0])
                    return this._properties[j];
        } else if (typeof arguments[0] === 'number') {
            return this._properties[arguments[0]];
        } else {
            return this._properties;
        }
    };

    MOTION.Tween.prototype.get = MOTION.Tween.prototype.getProperty;

    MOTION.Tween.prototype.getCount = function() {
        return this._properties.length;
    };

    MOTION.Tween.prototype.count = MOTION.Tween.prototype.getCount;

    MOTION.Tween.prototype.setEasing = function(easing) { 
        this._easing = easing;
        return this;
    };

    MOTION.Tween.prototype.easing = MOTION.Tween.prototype.setEasing;

    MOTION.Tween.prototype.getEasing = function() {
        return this._easing;
    };

    MOTION.Tween.prototype.noEasing = function() {
        this._easing = function(t) {
            return t;
        };
        return this;
    };

    MOTION.Tween.prototype.setInterpolation = function(inpterpolation) {
        this._inpterpolation = inpterpolation;
        return this;
    };

    MOTION.Tween.prototype.interpolation = MOTION.Tween.prototype.setInterpolation;

    MOTION.Tween.prototype.getInterpolation = function() {
        return this._inpterpolation;
    };

    MOTION.Tween.prototype.relative = function() {
        this.setValueMode(MOTION.RELATIVE);

        return this;
    };

    MOTION.Tween.prototype.absolute = function() {
        this.setValueMode(MOTION.ABSOLUTE);

        return this;
    };

    MOTION.Tween.prototype.setValueMode = function(_valueMode) {
        this._valueMode = _valueMode;

        return this;
    };

    MOTION.Tween.prototype.valueMode = MOTION.Tween.prototype.setValueMode;

    MOTION.Tween.prototype.getValueMode = function() {
        return this._valueMode;
    };

    MOTION.Tween.prototype.dispatchStartedEvent = function() {
        if (this._valueMode == MOTION.RELATIVE)
            for (var i = 0; i < this._properties.length; i++) {
                this._properties[i].setStart();
            }

        if (this._onStart)
            this._onStart(this._object);
    };

    MOTION.Tween.prototype.dispatchEndedEvent = function() {  
        if (this._onEnd)
            this._onEnd(this._object);
    };

    MOTION.Tween.prototype.dispatchChangedEvent = function() {
        this._updateProperties();

        if (this._onUpdate)
            this._onUpdate(this._object);
    };

    MOTION.Tween.prototype.dispatchRepeatedEvent = function() {
        if (this._onRepeat)
            this._onRepeat(this._object);
    };
})(MOTION);
