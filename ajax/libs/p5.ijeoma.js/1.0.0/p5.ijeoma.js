(function(MOTION, undefined) {
    REVISION = '1';

    _timeMode = MOTION.FRAMES;
    _valueMode = MOTION.ABSOLUTE;

    _isAutoUpdating = true;

    MOTION.SECONDS = p5.SECONDS = "seconds";
    MOTION.FRAMES = p5.FRAMES = "frames";

    _timeMode = MOTION.FRAMES;

    Quad = MOTION.Quad;
    Quad.In = MOTION.Quad.In;
    Quad.Out = MOTION.Quad.Out;
    Quad.InOut = MOTION.Quad.InOut;
    Cubic = MOTION.Cubic;
    Cubic.In = MOTION.Cubic.In;
    Cubic.Out = MOTION.Cubic.Out;
    Cubic.InOut = MOTION.Cubic.InOut;
    Quart = MOTION.Quart;
    Quart.In = MOTION.Quart.In;
    Quart.Out = MOTION.Quart.Out;
    Quart.InOut = MOTION.Quart.InOut;
    Quint = MOTION.Quint;
    Quint.In = MOTION.Quint.In;
    Quint.Out = MOTION.Quint.Out;
    Quint.InOut = MOTION.Quint.InOut;
    Sine = MOTION.Sine;
    Sine.In = MOTION.Sine.In;
    Sine.Out = MOTION.Sine.Out;
    Sine.InOut = MOTION.Sine.InOut;
    Expo = MOTION.Expo;
    Expo.In = MOTION.Expo.In;
    Expo.Out = MOTION.Expo.Out;
    Expo.InOut = MOTION.Expo.InOut;
    Circ = MOTION.Circ;
    Circ.In = MOTION.Circ.In;
    Circ.Out = MOTION.Circ.Out;
    Circ.InOut = MOTION.Circ.InOut;
    Elastic = MOTION.Elastic;
    Elastic.In = MOTION.Elastic.In;
    Elastic.Out = MOTION.Elastic.Out;
    Elastic.InOut = MOTION.Elastic.InOut;
    Back = MOTION.Back;
    Back.In = MOTION.Back.In;
    Back.Out = MOTION.Back.Out;
    Back.InOut = MOTION.Back.InOut;
    Bounce = MOTION.Bounce;
    Bounce.In = MOTION.Bounce.In;
    Bounce.Out = MOTION.Bounce.Out;
    Bounce.InOut = MOTION.Bounce.InOut;

    MOTION.setTimeMode = function(timeMode) {
        _timeMode = timeMode;

        return this;
    };

    MOTION.timeMode = MOTION.setTimeMode;

    MOTION.getTimeMode = function() {
        return _timeMode;
    };

    MOTION.update = function(time) {
        MOTION._time = typeof time !== 'undefined' ? time : (_timeMode === MOTION.SECONDS) ? millis() : frameCount;

        for (var i = 0; i < MOTION._motions.length; i++)
            if (_isAutoUpdating && !MOTION._motions[i]._hasController)
                MOTION._motions[i]._update();
    };

    p5.prototype.registerMethod('pre', MOTION.update);

    MOTION.prototype.resume = function() {
        this._isPlaying = true;
        this._isSeeking = false;

        this._playTime = (_timeMode == MOTION.SECONDS) ? (millis() - this._playTime / 1000) : (frameCount - this._playTime);

        return this;
    };

    MOTION.ColorProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end);
    };

    MOTION.ColorProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.ColorProperty.prototype.constrctor = MOTION.ColorProperty;

    MOTION.ColorProperty.prototype.update = function(position) {
        this._position = position;
        this._object[this._field] = lerpColor(this._start, this._end, this._position);
    };

    MOTION.VectorProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end);
    };

    MOTION.VectorProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.VectorProperty.prototype.constrctor = MOTION.VectorProperty;

    MOTION.VectorProperty.prototype.update = function(position) {
        this._position = position;
        this._object[this._field] = p5.Vector.lerp(this._start, this._end, this._position);
    };

    MOTION.Tween.prototype.addProperty = function(object, property, end) {
        var p;

        if (arguments[0] instanceof MOTION.Property) {
            p = arguments[0];
        } else if (typeof arguments[0] == 'object') {
            if (typeof object[property] !== 'undefined')
                v = (object[property] instanceof Array) ? object[property][0] : object[property];
            else
                v = (end instanceof Array) ? end[0] : end;

            if (typeof v == 'number')
                p = new MOTION.NumberProperty(object, property, end);
            else if (v instanceof p5.Color)
                p = new MOTION.ColorProperty(object, property, end);
            else if (v instanceof p5.Vector)
                p = new MOTION.VectorProperty(object, property, end);
            else
                console.warn('Only numbers, p5.colors and p5.vectors are supported.');
        } else {
            if (typeof window[arguments[0]] !== 'undefined')
                v = (window[arguments[0]] instanceof Array) ? window[arguments[0]][0] : window[arguments[0]];
            else
                v = (end instanceof Array) ? end[0] : end;

            if (typeof v == 'number')
                p = new MOTION.NumberProperty(window, arguments[0], arguments[1]);
            else if (v instanceof p5.Color)
                p = new MOTION.ColorProperty(window, arguments[0], arguments[1]);
            else if (v instanceof p5.Vector)
                p = new MOTION.VectorProperty(window, arguments[0], arguments[1]);
            else
                console.warn('Only numbers, p5.colors and p5.vectors are supported.');
        }

        this._properties.push(p);

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;

    MOTION.Transform = function() {
        this.rotate = 0;
        this.scale = 1;
        this.shearX = 0;
        this.shearY = 0;
        this.translate = createVector(0, 0);
    }
    MOTION.Transform.prototype.constrctor = MOTION.Transform;

    MOTION.Transform.prototype.applyRotate = function() {
        rotate(this.rotate);
    }
    MOTION.Transform.prototype.applyScale = function() {
        scale(this.scale);
    }
    MOTION.Transform.prototype.applyShearX = function() {
        shearX(this.shearX);
    }
    MOTION.Transform.prototype.applyShearY = function() {
        shearY(this.shearY);
    }
    MOTION.Transform.prototype.applyTranslate = function() {
        translate(this.translate.x, this.translate.y)
    }

    p5.prototype.createMotion = function(duration, delay, easing) {
        _current = new MOTION(duration, delay, easing);

        return _current;
    };

    p5.prototype.createTween = function(object, property, end, duration, delay, easing) {
        _current = new MOTION.Tween(object, property, end, duration, delay, easing);

        return _current;
    };

    p5.prototype.createParallel = function(children) {
        _current = new MOTION.Parallel(children);

        return _current;
    };

    p5.prototype.createSequence = function(children) {
        _current = new MOTION.Sequence(children);

        return _current;
    };

    p5.prototype.createTimeline = function(children) {
        _current = new MOTION.Timeline(children);

        return _current;
    };

    var find = function() {
        if (typeof arguments[0] === 'string')
            for (var i = 0; i < MOTION._motions.length; i++)
                if (MOTION._motions._name == arguments[0])
                    return MOTION._motions[i];
    }

    p5.prototype.goto = function(motion) {
        if (typeof arguments[0] === 'number')
            _current = MOTION._motions[arguments[0]];
        else if (typeof arguments[0] === 'string')
            _current = find(arguments[0]);
        else if (typeof arguments[0] === 'object')
            _current = arguments[0];
    };

    p5.prototype.timeMode = function(mode) {
        _timeMode = mode;

        return this;
    };

    p5.prototype.seconds = function() {
        _timeMode = MOTION.SECONDS;

        return this;
    };

    p5.prototype.frames = function() {
        _timeMode = MOTION.FRAMES;

        return this;
    };

    _currentEasing = null;

    p5.prototype.easingMode = function(easing) {
        _currentEasing = easing;

        return this;
    };

    p5.prototype.easing = function(easing) {
        _currentEasing = easing;

        return this;
    };

    p5.prototype.valueMode = function(mode) {
        _valueMode = mode;

        return this;
    };

    p5.prototype.relative = function() {
        _valueMode = MOTION.RELATIVE;

        return this;
    };

    p5.prototype.absolute = function() {
        _valueMode = MOTION.ABSOLUTE;

        return this;
    };

    _current = null;

    p5.prototype.tween = function(object, property, end, duration, delay, easing) {
        var t = new MOTION.Tween(object, property, end, duration, delay, easing).valueMode(_valueMode);

        if (_currentEasing)
            t.easing(_currentEasing)

        if (_current && !_current.isPlaying()) {
            if (_current instanceof MOTION.Timeline && _currentKeyframe)
                _currentKeyframe.add(t);
            else
                _current.add(t);
        } else
            _current = t;

        return t;
    };

    p5.prototype.beginParallel = function(name) {
        _current = new MOTION.Parallel();

        if (typeof name != 'undefined')
            _current.name(name);

        return _current;
    };

    p5.prototype.endParallel = function() {
        _current = null;
    };

    p5.prototype.beginSequence = function(name) {
        _current = new MOTION.Sequence();

        if (typeof name != 'undefined')
            _current.name(name);

        return _current;
    };

    p5.prototype.endSequence = function() {
        _current = null;
    };

    p5.prototype.beginTimeline = function(name) {
        _current = new MOTION.Timeline();

        if (typeof name != 'undefined')
            _current.name(name);

        return _current;
    };

    p5.prototype.endTimeline = function() {
        _current = null;
    };

    _currentKeyframe = null;

    p5.prototype.beginKeyframe = function(name, time) {
        _currentKeyframe = new MOTION.Keyframe();

        if (arguments.length == 1 && typeof arguments[0] != 'undefined') {
            if (typeof arguments[0] == 'number')
                _currentKeyframe.delay(arguments[0]);
            else if (typeof arguments[0] == 'string')
                _currentKeyframe.name(arguments[0]);
        } else if (arguments.length == 2) {
            _currentKeyframe.name(name);
            _currentKeyframe.delay(time);
        }

        return _currentKeyframe;
    };

    p5.prototype.endKeyframe = function() {
        if (_current instanceof MOTION.Timeline)
            _current.add(_currentKeyframe);

        _currentKeyframe = null;
    };

    p5.prototype.play = function(motion) {
        if (typeof arguments[0] === 'string')
            find(arguments[0]).play();
        else if (typeof arguments[0] === 'object')
            arguments[0].play()
    };

    p5.prototype.playAll = MOTION.playAll;

    p5.prototype.stop = function(motion) {
        if (typeof arguments[0] === 'string')
            find(arguments[0]).stop();
        else if (typeof arguments[0] === 'object')
            arguments[0].stop()
    };

    p5.prototype.stopAll = MOTION.stopAll

    p5.prototype.pause = function(motion) {
        if (typeof arguments[0] === 'string')
            find(arguments[0]).pause();
        else if (typeof arguments[0] === 'object')
            arguments[0].pause()
    };

    p5.prototype.pauseAll = MOTION.pauseAll;

    p5.prototype.resume = function(motion) {
        if (typeof arguments[0] === 'string')
            find(arguments[0]).resume();
        else if (typeof arguments[0] === 'object')
            arguments[0].resume()
    };

    p5.prototype.resumeAll = MOTION.resumeAll;

    p5.prototype.seek = function(motion, t) {
        if (typeof arguments[0] === 'string')
            find(arguments[0]).seek(arguments[1]);
        else if (typeof arguments[0] === 'object')
            arguments[0].seek(arguments[1])
    };

    p5.prototype.seekAll = MOTION.seekAll;

    p5.prototype.repeat = function(motion, duration) {
        if (typeof arguments[0] === 'string')
            find(arguments[0]).repeat(arguments[1]);
        else if (typeof arguments[0] === 'object')
            arguments[0].repeat(arguments[1]);
    };

    p5.prototype.repeatAll = MOTION.repeatAll;

    p5.prototype.reverse = function(motion) {
        if (typeof arguments[0] === 'string')
            find(arguments[0]).reverse();
        else if (typeof arguments[0] === 'object')
            arguments[0].reverse();
    };

    p5.prototype.reverseAll = MOTION.reverseAll;

    p5.prototype.useOnce = MOTION.useOnce;

    p5.prototype.onStart = function(func) {
        _current.onStart(func);

        return this;
    };

    p5.prototype.onEnd = function(func) {
        _current.onEnd(func);

        return this;
    };

    p5.prototype.onUpdate = function(func) {
        _current.onUpdate(func);

        return this;
    };

    p5.prototype.onRepeat = function(func) {
        _current.onRepeat(func);

        return this;
    };
})(MOTION);
