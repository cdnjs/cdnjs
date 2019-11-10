(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Tween = global.Tween || {})));
}(this, (function (exports) { 'use strict';

if (Object.assign === undefined) {
  Object.assign = function (first) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    args.map(function (obj) {
      for (var p in obj) {
        first[p] = obj[p];
      }
    });
    return first
  };
}

var ROOT = typeof (window) !== 'undefined' ? window : typeof (global) !== 'undefined' ? global : typeof exports !== 'undefined' ? exports : {};
var _vendor = ['webkit', 'moz', 'ms', 'o'];
var animFrame = 'AnimationFrame';
var rafSuffixForVendor = 'Request' + animFrame;
var cafSuffixForVendor = 'Cancel' + animFrame;
var cafSuffixForVendor2 = 'CancelRequest' + animFrame;
var _timeout = ROOT.setTimeout;
var _clearTimeout = ROOT.clearTimeout;

if (_timeout && ROOT.requestAnimationFrame === undefined) {
  var _raf;
  var now;
  var lastTime = Date.now();
  var frameMs = (50 / 3);
  var fpsSec = frameMs;

  _vendor.map(function (vendor) {
    if ((_raf = ROOT[vendor + rafSuffixForVendor]) === undefined) {
      _raf = function (fn) {
        return _timeout(function () {
          now = Date.now();
          fn(now - lastTime);
          fpsSec = frameMs + (Date.now() - now);
        }, fpsSec)
      };
    }
  });

  if (_raf !== undefined) {
    ROOT.requestAnimationFrame = _raf;
  }
}

if (_clearTimeout && ROOT.cancelAnimationFrame === undefined && (ROOT.cancelAnimationFrame = ROOT.cancelRequestAnimationFrame) === undefined) {
  var _caf;

  _vendor.map(function (vendor) {
    if ((_caf = ROOT[vendor + cafSuffixForVendor]) === undefined && (_caf = ROOT[vendor + cafSuffixForVendor2]) === undefined) {
      _caf = function (fn) {
        return _clearTimeout(fn)
      };
    }
  });

  if (_caf !== undefined) {
    ROOT.cancelAnimationFrame = _caf;
  }
}

if (Array.isArray === undefined) {
  Array.isArray = function (arrayLike) {
    return arrayLike !== undefined && typeof arrayLike === 'object' && arrayLike.length && arrayLike.push !== undefined && arrayLike.splice !== undefined
  };
}

var _tweens = [];
var isStarted = false;
var _autoPlay = false;
var _tick;
var _events = {};
var root = typeof (window) !== "undefined" ? window : typeof (global) !== "undefined" ? global : {};

var getAll = function () {
	return _tweens;
};

var autoPlay = function (state) {
	_autoPlay = state;
};

var removeAll = function () {
	_tweens = [];
};

var emit = function(name, a, b, c, d, e) {
	var this$1 = this;

	var eventFn = _events[name];

	if (eventFn) {
		var i = eventFn.length;
		while (i--) {
			eventFn[i].call(this$1, a, b, c, d, e);
		}
	}
};

var off = function (ev, fn) {
	if (ev === undefined || _events[ev] === undefined) {
		return;
	}
	if (fn !== undefined) {
		var eventsList = _events[name]
			, i = 0;
		while (i < eventsList.length) {
			if (eventsList[i] === fn) {
				eventsList.splice(i, 1);
			}
			i++;
		}
	} else {
		_events[name] = [];
	}
};

var add = function (tween) {
	_tweens.push(tween);

	if (_autoPlay && !isStarted) {
		update();
		isStarted = true;
		emit('start');
	}
	emit('add', tween, _tweens);

};

var on = function (ev, fn) {
	if (_events[ev] === undefined) {
		_events[ev] = [];
	}
	_events[ev].push(fn);
};

var once = function (ev, fn) {
	if (_events[ev] === undefined) {
		_events[ev] = [];
	}
	on(ev, function () {
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		fn.apply(void 0, args);
		off(ev);
	});
};

var remove = function (tween) {
	_tweens.filter(function (tweens) { return tweens !== tween; });
	var i = 0
		, tweenFind;
	while (i < _tweens.length) {
		tweenFind = _tweens[i];
		if (tweenFind === tween) {
			emit('remove', tween, _tweens);
			_tweens.splice(i, 1);
		}
		i++;
	}
};

var now$1 = function () {
	if (typeof (process) !== "undefined" && process.hrtime !== undefined) {
		return function () {
			var time = process.hrtime();

			// Convert [seconds, nanoseconds] to milliseconds.
			return time[0] * 1000 + time[1] / 1000000;
		};
	}
	// In a browser, use window.performance.now if it is available.
	else if (root.performance !== undefined &&
		root.performance.now !== undefined) {

		// This must be bound, because directly assigning this function
		// leads to an invocation exception in Chrome.
		return root.performance.now.bind(root.performance)
	}
	// Use Date.now if it is available.
	else {
		var offset = root.performance && root.performance.timing && root.performance.timing.navigationStart ? root.performance.timing.navigationStart : Date.now();
		return function () {
			return Date.now() - offset;
		}
	}
}();

var update = function (time, preserve) {

	time = time !== undefined ? time : now$1();

	if (_autoPlay) {
		_tick = requestAnimationFrame(update);
	}
	emit('update', time, _tweens);

	if (_tweens.length === 0) {

		isStarted = false;
		cancelAnimationFrame(_tick);
		emit('stop', time);
		return false;

	}

	var i = 0;
	while (i < _tweens.length) {

		if (_tweens[i].update(time) || preserve) {
			i++;
		} else {
			_tweens.splice(i, 1);
		}

	}

	return true;
};

// Normalise time when visiblity is changed ...
if (root.document) {
	var doc = root.document, timeDiff = 0, timePause = 0;
	doc.addEventListener('visibilitychange', function (ev) {
		if (_tweens.length === 0) {
			return false;
		}
		if (document.hidden) {
			timePause = now$1();
		} else {
			timeDiff = now$1() - timePause;
			_tweens.map(function (tween) { return tween._startTime += timeDiff; });

		}
		return true;
	});
}

var Easing = {

	Linear: {

		None: function None(k) {

			return k;

		}

	},

	Quadratic: {

		In: function In(k) {

			return k * k;

		},

		Out: function Out(k) {

			return k * (2 - k);

		},

		InOut: function InOut(k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function In(k) {

			return k * k * k;

		},

		Out: function Out(k) {

			return --k * k * k + 1;

		},

		InOut: function InOut(k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function In(k) {

			return k * k * k * k;

		},

		Out: function Out(k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function InOut(k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function In(k) {

			return k * k * k * k * k;

		},

		Out: function Out(k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function InOut(k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function In(k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function Out(k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function InOut(k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function In(k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function Out(k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function InOut(k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function In(k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function Out(k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function InOut(k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function In(k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

		},

		Out: function Out(k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

		},

		InOut: function InOut(k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

		}

	},

	Back: {

		In: function In(k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function Out(k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function InOut(k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function In(k) {

			return 1 - Easing.Bounce.Out(1 - k);

		},

		Out: function Out(k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function InOut(k) {

			if (k < 0.5) {
				return Easing.Bounce.In(k * 2) * 0.5;
			}

			return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

var Interpolation = {

	Linear: function Linear(v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function Bezier(v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function CatmullRom(v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function Linear(p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function Bernstein(n, i) {

			var fc = Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function() {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

function cloneTween(obj, configs, Constructor_Ex) {
    if ( obj === void 0 ) obj = {};
    if ( configs === void 0 ) configs = {};
    if ( Constructor_Ex === void 0 ) Constructor_Ex = Tween;

    var copyTween = new Constructor_Ex();
	for ( var config in obj ) {
		if (configs[config] !== undefined) {
		copyTween[config] = configs[config];
		} else {
		copyTween[config] = obj[config];
		}
	}
	return copyTween;
}

function joinToString (__array__like) {
	var str = '';
	for ( var i = 0, len = __array__like.length; i < len; i++ ) {
		str += __array__like[i];
	}
	return str;
}

function toNumber(val) {
	var floatedVal = parseFloat(val);
	return typeof floatedVal === "number" && !isNaN(floatedVal) ? floatedVal : val;
}

// Credits:
// @jkroso for string parse library
// Optimized, Extended by @dalisoft
var Number_Match_RegEx = /\s+|([A-Za-z?().,{}:""\[\]#]+)|([-+\/*%]+=)?([-+*\/%]+)?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/gi;

var Tween = function Tween(object, instate) {
    if ( object === void 0 ) object = {};


    this.object = object;
    this._valuesStart = Tween.createEmptyConst(object);
    this._valuesEnd = Tween.createEmptyConst(object);

    this._duration = 1000;
    this._easingFunction = Easing.Linear.None;
    this._interpolationFunction = Interpolation.None;

    this._startTime = 0;
    this._delayTime = 0;
    this._repeat = 0;
    this._r = null;
    this._isPlaying = false;
    this._yoyo = false;
    this._reversed = null;

    this._onStartCallbackFired = false;
    this._pausedTime = null;

    if (instate && instate.to) {

        return new Tween(object).to(instate.to, instate);

    }

    return this;

};
Tween.createEmptyConst = function createEmptyConst (oldObject) {
    return typeof(oldObject) === "number" ? 0 : Array.isArray(oldObject) ? [] : typeof(oldObject) === "object" ? {} :
        '';
};
Tween.checkValidness = function checkValidness (valid) {
    return valid !== undefined && valid !== null && valid !== '' && valid !== NaN && valid !== Infinity;
};
Tween.prototype.isPlaying = function isPlaying () {
    return this._isPlaying;
};
Tween.prototype.isStarted = function isStarted () {
    return this._onStartCallbackFired;
};
Tween.prototype.reverse = function reverse () {

    var ref = this;
        var _reversed = ref._reversed;

    this._reversed = !_reversed;

    return this;
};
Tween.prototype.reversed = function reversed () {
    return this._reversed;
};
Tween.prototype.off = function off$$1 (name, fn) {
    if (!(this._events && this._events[name] !== undefined)) {
            return this;
        }
        if (name !== undefined && fn !== undefined) {
            var eventsList = this._events[name],
                i = 0;
            while (i < eventsList.length) {
                if (eventsList[i] === fn) {
                    eventsList.splice(i, 1);
                }
                i++;
            }
        } else if (name !== undefined && fn === undefined) {
            this._events[name] = [];
        }
        return this;
    };
    Tween.prototype.on = function on$$1 (name, fn) {
        if (!(this._events && this._events[name] !== undefined)) {
			if (!this._events) {
				this._events = {};
			}
            this._events[name] = [];
        }
        this._events[name].push(fn);
        return this;
    };
    Tween.prototype.once = function once$$1 (name, fn) {
            var this$1 = this;

        if (!(this._events && this._events[name] !== undefined)) {
			if (!this._events) {
				this._events = {};
			}
            this._events[name] = [];
        }
        return this.on(name, function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

            fn.call.apply(fn, [ this$1 ].concat( args ));
            this$1.off(name);
        });
    };
    Tween.prototype.emit = function emit$$1 (name, a, b, c, d, e) {
            var this$1 = this;


        var ref = this;
            var _events = ref._events;

			if (!_events) {
				return this;
			}

        var eventFn = _events[name];

        if (!eventFn) {
            return this;
        }

        var i = eventFn.length;
        while (i--) {
            eventFn[i].call(this$1, a, b, c, d, e);
        }
        return this;

    };
    Tween.prototype.pause = function pause () {

        if (!this._isPlaying) {
            return this;
        }

        this._isPlaying = false;

        remove(this);
        this._pausedTime = now$1();

        return this.emit('pause', this.object);
    };
    Tween.prototype.play = function play () {

        if (this._isPlaying) {
            return this;
        }

        this._isPlaying = true;

        this._startTime += now$1() - this._pausedTime;
        add(this);
        this._pausedTime = now$1();

        return this.emit('play', this.object);
    };
    Tween.prototype.restart = function restart (noDelay) {

        this._repeat = this._r;
        this._startTime = now$1() + (noDelay ? 0 : this._delayTime);

        if (!this._isPlaying) {
            add(this);
        }

        return this.emit('restart', this._object);

    };
    Tween.prototype.seek = function seek (time, keepPlaying) {

        this._startTime = now$1() + Math.max(0, Math.min(
            time, this._duration));

        this.emit('seek', time, this._object);

        return keepPlaying ? this : this.pause();

    };
    Tween.prototype.duration = function duration (amount) {

        this._duration = typeof(amount) === "function" ? amount(this._duration) : amount;

        return this;
    };
    Tween.prototype.to = function to (properties, duration) {
            var this$1 = this;
            if ( properties === void 0 ) properties = {};
            if ( duration === void 0 ) duration = 1000;


        if (typeof properties === "number") {
            var _vE = {
                Number: properties
            };
            this._valuesEnd = _vE;
        } else {
            this._valuesEnd = properties;
        }

        if (typeof duration === "number") {
            this._duration = typeof(duration) === "function" ? duration(this._duration) : duration;
        } else if (typeof duration === "object") {
            for (var prop in duration) {
                if (this$1[prop]) {
                    this$1[prop](typeof duration[prop] === "function" ? duration[prop](this$1._duration) : duration);
                }
            }
        }

        return this;

    };
    Tween.prototype.start = function start (time) {
            var this$1 = this;


        var ref = this;
            var _startTime = ref._startTime;
            var _delayTime = ref._delayTime;
            var _valuesEnd = ref._valuesEnd;
            var _valuesStart = ref._valuesStart;
            var object = ref.object;

        _startTime = time !== undefined ? time : now$1();
        _startTime += _delayTime;

        this._startTime = _startTime;

        for (var property in _valuesEnd) {

            if (typeof _valuesEnd[property] === "object") {
                if (Array.isArray(_valuesEnd[property])) {
                    if (typeof object[property] === "number") {
                        this$1._valuesEnd[property] = [object[property]].concat(_valuesEnd[property]);
                    } else {
                        var clonedTween = cloneTween(this$1, {
                                object: object[property],
                                _valuesEnd: _valuesEnd[property],
                                _events: undefined
                            })
                            .start()
                            .stop();

                        this$1._valuesEnd[property] = clonedTween;
                    }
                } else {
                    var clonedTween$1 = cloneTween(this$1, {
                            object: object[property],
                            _valuesEnd: _valuesEnd[property],
                            _events: undefined
                        })
                        .start()
                        .stop();

                    this$1._valuesStart[property] = 1;
                    this$1._valuesEnd[property] = clonedTween$1;
                }
            } else if (typeof _valuesEnd[property] === "string" && typeof object[property] === "string" && Number_Match_RegEx.test(object[property]) && Number_Match_RegEx.test(_valuesEnd[property])) {

                var _get__Start = object[property].match(Number_Match_RegEx);
                _get__Start = _get__Start.map(toNumber);
                var _get__End = _valuesEnd[property].match(Number_Match_RegEx);
                _get__End = _get__End.map(toNumber);
                var clonedTween$2 = cloneTween(this$1, {
                        object: _get__Start,
                        _valuesEnd: _get__End,
                        _events: {}
                    })
                    .start()
                    .stop();

                clonedTween$2.join = true; // For string tweening
                this$1._valuesStart[property] = 1;
                this$1._valuesEnd[property] = clonedTween$2;

            }

            // If value presented as function,
            // we should convert to value again by passing function
            if (typeof object[property] === "function") {
                object[property] = this$1.object[property] = object[property](this$1);
            }

            if (typeof _valuesEnd[property] === "function") {
                this$1._valuesEnd[property] = _valuesEnd[property](this$1);
            }

            // If `to()` specifies a property that doesn't exist in the source object,
            // we should not set that property in the object
            if (Tween.checkValidness(object[property]) === false) {
                continue;
            }

            // If duplicate or non-tweening numerics matched,
            // we should skip from adding to _valuesStart
            if (object[property] === _valuesEnd[property]) {
                continue;
            }

            this$1._valuesStart[property] = object[property];

        }

        add(this);

        this._isPlaying = true;

        return this;

    };
    Tween.prototype.stop = function stop () {

        var ref = this;
            var _isPlaying = ref._isPlaying;
            var object = ref.object;

        if (!_isPlaying) {
            return this;
        }

        remove(this);
        this._isPlaying = false;

        this.stopChainedTweens();
        return this.emit('stop', object);

    };
    Tween.prototype.end = function end () {

        var ref = this;
            var _startTime = ref._startTime;
            var _duration = ref._duration;

        return this.update(_startTime + _duration);

    };
    Tween.prototype.stopChainedTweens = function stopChainedTweens () {

        var ref = this;
            var _chainedTweens = ref._chainedTweens; if ( _chainedTweens === void 0 ) _chainedTweens = [];

        _chainedTweens.map(function (item) { return item.stop(); });

        return this;

    };
    Tween.prototype.delay = function delay (amount) {

        this._delayTime = typeof(amount) === "function" ? amount(this._delayTime) : amount;

        return this;

    };
    Tween.prototype.repeat = function repeat (amount) {

        this._repeat = typeof(amount) === "function" ? amount(this._repeat) : amount;
        this._r = this._repeat;

        return this;

    };
    Tween.prototype.repeatDelay = function repeatDelay (amount) {

        this._repeatDelayTime = typeof(amount) === "function" ? amount(this._repeatDelayTime) : amount;

        return this;

    };
    Tween.prototype.reverseDelay = function reverseDelay (amount) {

        this._reverseDelayTime = typeof(amount) === "function" ? amount(this._reverseDelayTime) : amount;

        return this;

    };
    Tween.prototype.yoyo = function yoyo (state) {

        this._yoyo = typeof(state) === "function" ? state(this._yoyo) : state;

        return this;

    };
    Tween.prototype.easing = function easing (fn) {

        this._easingFunction = fn;

        return this;

    };
    Tween.prototype.interpolation = function interpolation (fn) {

        this._interpolationFunction = fn;

        return this;

    };
    Tween.prototype.chain = function chain () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];


        this._chainedTweens = args;

        return this;

    };
    Tween.prototype.get = function get (time) {
        this.update(time);
        return this.object;
    };
    Tween.prototype.update = function update$$1 (time) {
            var this$1 = this;


        var ref = this;
            var _onStartCallbackFired = ref._onStartCallbackFired;
            var _chainedTweens = ref._chainedTweens;
            var _easingFunction = ref._easingFunction;
            var _interpolationFunction = ref._interpolationFunction;
            var _repeat = ref._repeat;
            var _repeatDelayTime = ref._repeatDelayTime;
            var _reverseDelayTime = ref._reverseDelayTime;
            var _delayTime = ref._delayTime;
            var _yoyo = ref._yoyo;
            var _reversed = ref._reversed;
            var _startTime = ref._startTime;
            var _duration = ref._duration;
            var _valuesStart = ref._valuesStart;
            var _valuesEnd = ref._valuesEnd;
            var object = ref.object;

        var property;
        var elapsed;
        var value;

        time = time !== undefined ? time : now$1();

        if (time < _startTime) {
            return true;
        }

        if (!_onStartCallbackFired) {

            this.emit('start', object);

            this._onStartCallbackFired = true;
        }

        elapsed = (time - _startTime) / _duration;
        elapsed = elapsed > 1 ? 1 : elapsed;
        elapsed = _reversed ? 1 - elapsed : elapsed;

        value = _easingFunction(elapsed);

        for (property in _valuesEnd) {

            // Don't update properties that do not exist in the source object
            if (_valuesStart[property] === undefined) {
                continue;
            }

            var start = _valuesStart[property];
            var end = _valuesEnd[property];

            if (end instanceof Tween) {

                var getValue = end.get(time);

                if (end.join) {

                    object[property] = joinToString(getValue);

                } else {

                    object[property] = getValue;

                }

            } else if (Array.isArray(end)) {

                object[property] = _interpolationFunction(end, value);

            } else if (typeof(end) === 'string') {

                if (end.charAt(0) === '+' || end.charAt(0) === '-') {
                    end = start + parseFloat(end);
                } else {
                    end = parseFloat(end);
                }

                // Protect against non numeric properties.
                if (typeof(end) === 'number') {
                    object[property] = start + (end - start) * value;
                }
            } else if (typeof(end) === 'number') {
                object[property] = start + (end - start) * value;
            }

        }

        this.emit('update', object, value, elapsed);

        if (elapsed === 1 || (_reversed && elapsed === 0)) {

            if (_repeat) {

                if (isFinite(_repeat)) {
                    this._repeat--;
                }

                for (property in _valuesEnd) {

                    if (typeof(_valuesEnd[property]) === 'string' && typeof(_valuesStart[property]) === 'number') {
                        this$1._valuesStart[property] = _valuesStart[property] + parseFloat(_valuesEnd[property]);
                    }

                }

                // Reassign starting values, restart by making startTime = now
                this.emit(_reversed ? 'reverse' : 'repeat', object);

                if (_yoyo) {
                    this._reversed = !_reversed;
                }

                if (!_reversed && _repeatDelayTime) {
                    this._startTime += _duration + _repeatDelayTime;
                } else if (_reversed && _reverseDelayTime) {
                    this._startTime += _duration + _reverseDelayTime;
                } else {
                    this._startTime += _duration;
                }

                return true;

            } else {

                this.emit('complete', object);

                if (_chainedTweens) {
                    _chainedTweens.map(function (tween) { return tween.start(_startTime + _duration); });
                }

                return false;

            }
        }
        return true;
    };

var cache = {
	filter: {
		grayscale: 1,
		brightness: 1,
		sepia: 1,
		invert: 1,
		saturate: 1,
		contrast: 1,
		blur: 1,
		hueRotate: 1,
		dropShadow: 1
	},
	transform: {
		translate: 1,
		translateX: 1,
		translateY: 1,
		translateZ: 1,
		rotate: 1,
		rotateX: 1,
		rotateY: 1,
		rotateZ: 1,
		scale: 1,
		scaleX: 1,
		scaleY: 1,
		scaleZ: 1,
		skew: 1,
		skewX: 1,
		skewY: 1
	}
};

var Plugins = function Plugins () {};

Plugins.DOM = function DOM (Composite) {
	var layer = Composite.domNode,
	style = layer.style;
	return {
		update: function update(Tween, RenderObject) {
			for (var p in RenderObject) {
				style[p] = RenderObject[p];
			}
		}
	}
};
Plugins.Transform = function Transform (Composite) {
	var layer = Composite.domNode,
	style = layer.style;
	return {
		update: function update(Tween, RenderObject) {
			var transform = '';
			for (var p in RenderObject) {
				if (p === 'x' || p === 'y' || p === 'z') {
					transform += ' translate3d( ' + (RenderObject.x || '0px') + ', ' + (RenderObject.y || '0px') + ', ' + (RenderObject.z || '0px') + ')';
				} else if (cache.transform[p]) {
					transform += " " + p + "( " + (RenderObject[p]) + ")";
				}
			}
			if (transform) {
				style.transform = transform;
			}
		}
	}
};
Plugins.Filter = function Filter (Composite) {
	var layer = Composite.domNode,
	style = layer.style;
	return {
		update: function update(Tween, RenderObject) {
			var filter = '';
			for (var p in RenderObject) {
				if (cache.filter[p]) {
					filter += " " + p + "( " + (RenderObject[p]) + ")";
				}
			}
			if (filter) {
				style.webkitFilter = style.filter = filter;
			}
		}
	}
};
Plugins.Scroll = function Scroll (Composite) {
	var layer = Composite.domNode;
	return {
		update: function (Tween, RenderObject) {
			for (var p in RenderObject) {
				layer[p] = RenderObject[p];
			}
		}
	}
};

var Composite = function Composite(domNode) {

	var self = this;

	this.domNode = domNode;
	this.plugins = {};
	var pluginList = this.plugins;

	this.render = function (object) {
		var this$1 = this;


		for (var p in pluginList) {

			pluginList[p] && pluginList[p].update && pluginList[p].update(this$1, object);

		}

		return this;
	};

	this.fetch = function () {
		var this$1 = this;


		if (Object.keys(this.object).length) {

			return this;

		}

		for (var p in pluginList) {

			pluginList[p] && pluginList[p].fetch && pluginList[p].fetch(this$1);

		}

		return this;
	};

	this.init = function (object) {
		var this$1 = this;


		for (var p in pluginList) {

			pluginList[p] && pluginList[p].init && pluginList[p].init(this$1, object);

		}

		return this;
	};

	return this;
};

var prototypeAccessors = { object: {} };
Composite.prototype.applyPlugin = function applyPlugin (name) {
	if (Plugins[name] !== undefined) {
		this.plugins[name] = Plugins[name](this);
	}
	return this;
};
prototypeAccessors.object.set = function (obj) {
	return this.render(obj);
};
Composite.prototype.cloneLayer = function cloneLayer () {
	return cloneTween(this, {}, Composite)
};
Composite.prototype.appendTo = function appendTo (node) {
	node.appendChild(this.domNode);
	return this;
};

Object.defineProperties( Composite.prototype, prototypeAccessors );

var Timeline = function Timeline () {
	this._private = {
		tweens: [],
		fullTime: 0
	};
	return this;
};
Timeline.prototype.add = function add (tween) {
		var this$1 = this;

	if (tween instanceof Tween) {
		this._private.tweens.push(tween);
	} else if (!Array.isArray(tween) && typeof tween === "object") {
		var tweenExample = new Tween({x:0});
			for ( var p in tween ) {
				tweenExample[p](tween[p]);
			}
		this.add(tweenExample);
	} else if (typeof tween === "object") {
		tween.map(function (add) {
			this$1.add(add);
		});
	}
	return this;
};
Timeline.prototype.start = function start () {
		var this$1 = this;

	this._private.tweens.map(function (tween) {
		tween.start(this$1._private.fullTime);
	});
	this._private.fullTime = Math.max.apply(0, this._private.tweens.reduce(function (prev, curr) {
		return curr._duration > prev ? curr._duration : prev;
	}, 0));
	return this;
};

var lin = function (k) { return k; };

function TweenInit (target) {
	var from = target.from;
	var to = target.to;
	var duration = target.duration; if ( duration === void 0 ) duration = 1000;
	var easing = target.easing; if ( easing === void 0 ) easing = lin;
	var events = target.events;
	var instance = target.instance;
	var tweenInstance = new Tween(from, instance).to(to, duration).easing(lin);
	if (events) {
		tweenInstance._events = events;
	}
	target.start = tweenInstance.start.bind(tweenInstance);
}

/* Shims will be deprecated in next update, please update browser */

exports.TweenInit = TweenInit;
exports.getAll = getAll;
exports.removeAll = removeAll;
exports.remove = remove;
exports.add = add;
exports.now = now$1;
exports.update = update;
exports.autoPlay = autoPlay;
exports.on = on;
exports.once = once;
exports.off = off;
exports.emit = emit;
exports.Tween = Tween;
exports.Easing = Easing;
exports.Interpolation = Interpolation;
exports.Composite = Composite;
exports.Timeline = Timeline;
exports.Plugins = Plugins;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Tween.js.map
