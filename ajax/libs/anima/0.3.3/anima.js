(function() {
  "use strict";
  var a = {};
  a.world = function() {
    return new World();
  };
  a.timeline = function() {
    return new Timeline();
  };
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = a;
  } else if (typeof define === "function" && define.amd) {
    define(a);
  } else {
    window.anima = window.a = a;
  }
  var requestAnimationFrame = window.requestAnimationFrame, cancelAnimationFrame = window.cancelAnimationFrame, vendors = [ "moz", "webkit", "ms" ], i = vendors.length;
  while (--i < vendors.length && !requestAnimationFrame) {
    requestAnimationFrame = window[vendors[i] + "RequestAnimationFrame"];
    cancelAnimationFrame = window[vendors[i] + "CancelAnimationFrame"] || window[vendors[i] + "CancelRequestAnimationFrame"];
  }
  var prefix = ([].slice.call(getComputedStyle(document.documentElement, null)).join("").match(/(-(moz|webkit|ms)-)transform/) || [])[1], transformProperty = getProperty("transform"), animationProperty = getProperty("animation");
  function getProperty(name) {
    return prefix ? prefix + name : name;
  }
  var Vector = {
    set: function(x, y, z) {
      if (Array.isArray(x)) {
        y = x[1];
        z = x[2];
        x = x[0];
      }
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = x;
        z = x;
      }
      return [ x, y, z ];
    },
    length: function(x, y, z) {
      if (Array.isArray(x)) {
        y = x[1];
        z = x[2];
        x = x[0];
      }
      return Math.sqrt(x * x + y * y + z * z);
    },
    add: function(a, b) {
      return [ a[0] + b[0], a[1] + b[1], a[2] + b[2] ];
    },
    sub: function(a, b) {
      return [ a[0] - b[0], a[1] - b[1], a[2] - b[2] ];
    },
    norm: function(x, y, z) {
      if (Array.isArray(x)) {
        y = x[1];
        z = x[2];
        x = x[0];
      }
      var len = this.length(x, y, z);
      if (len !== 0) {
        x /= len;
        y /= len;
        z /= len;
      } else {
        x = 0;
        y = 0;
        z = 0;
      }
      return [ x, y, z ];
    },
    dist: function(a, b) {
      var dx = a[0] - b[0], dy = a[1] - b[1], dz = a[2] - b[2];
      return Math.sqrt(dx * dx + dy * dy + dz + dz);
    },
    cross: function(a, b) {
      var x = a[1] * b[2] - a[2] * b[1], y = a[2] * b[0] - a[0] * b[2], z = a[1] * b[1] - a[1] * b[0];
      return [ x, y, z ];
    },
    clone: function(v) {
      return v.slice();
    },
    scale: function(x, y, z, f) {
      if (Array.isArray(x)) {
        f = y;
        y = x[1];
        z = x[2];
        x = x[0];
      }
      return [ x * f, y * f, z * f ];
    },
    zero: function() {
      return [ 0, 0, 0 ];
    }
  };
  var radians = Math.PI / 180;
  var Matrix = {
    identity: function() {
      return [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
    },
    multiply: function multiply(a, b) {
      var c = this.identity();
      c[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8];
      c[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9];
      c[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10];
      c[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8];
      c[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9];
      c[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10];
      c[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8];
      c[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9];
      c[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10];
      c[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + b[12];
      c[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + b[13];
      c[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + b[14];
      return 2 >= arguments.length ? c : multiply.apply(this, [ c ].concat(Array.prototype.slice.call(arguments, 2)));
    },
    translate: function(tx, ty, tz) {
      if (!(tx || ty || tz)) return this.identity();
      tx || (tx = 0);
      ty || (ty = 0);
      tz || (tz = 0);
      return [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1 ];
    },
    scale: function(sx, sy, sz) {
      if (!(sx || sy || sz)) return this.identity();
      sx || (sx = 1);
      sy || (sy = 1);
      sz || (sz = 1);
      return [ sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1 ];
    },
    rotate: function(ax, ay, az) {
      if (!(ax || ay || az)) return this.identity();
      ax || (ax = 0);
      ay || (ay = 0);
      az || (az = 0);
      ax *= radians;
      ay *= radians;
      az *= radians;
      var sx = Math.sin(ax), cx = Math.cos(ax), sy = Math.sin(ay), cy = Math.cos(ay), sz = Math.sin(az), cz = Math.cos(az);
      return [ cy * cz, cx * sz + sx * sy * cz, sx * sz - cx * sy * cz, 0, -cy * sz, cx * cz - sx * sy * sz, sx * cz + cx * sy * sz, 0, sy, -sx * cy, cx * cy, 0, 0, 0, 0, 1 ];
    },
    rotate3d: function(x, y, z, a) {
      a || (a = 0);
      a *= radians;
      var s = Math.sin(a), c = Math.cos(a), norm = Vector.norm(x, y, z);
      x = norm[0];
      y = norm[1];
      z = norm[2];
      var xx = x * x, yy = y * y, zz = z * z, _c = 1 - c;
      return [ xx + (1 - xx) * c, x * y * _c + z * s, x * z * _c - y * s, 0, x * y * _c - z * s, yy + (1 - yy) * c, y * z * _c + x * s, 0, x * z * _c + y * s, y * z * _c - x * s, zz + (1 - zz) * c, 0, 0, 0, 0, 1 ];
    },
    skew: function(ax, ay) {
      if (!(ax || ay)) return this.identity();
      ax || (ax = 0);
      ay || (ay = 0);
      ax *= radians;
      ay *= radians;
      return [ 1, Math.tan(ay), 0, 0, Math.tan(ax), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
    },
    perspective: function(p) {
      p = -1 / p;
      return [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, p, 0, 0, 0, 1 ];
    },
    parse: function(s) {
      var m = s.match(/\((.+)\)/)[1].split(/,\s?/);
      if (m.length === 6) {
        m.splice(2, 0, "0", "0");
        m.splice(6, 0, "0", "0");
        m.splice(8, 0, "0", "0", "1", "0");
        m.push("0", "1");
      }
      return m;
    },
    inverse: function(m) {
      var a = this.identity(), inv0 = m[5] * m[10] - m[6] * m[9], inv1 = m[1] * m[10] - m[2] * m[9], inv2 = m[1] * m[6] - m[2] * m[5], inv4 = m[4] * m[10] - m[6] * m[8], inv5 = m[0] * m[10] - m[2] * m[8], inv6 = m[0] * m[6] - m[2] * m[4], inv8 = m[4] * m[9] - m[5] * m[8], inv9 = m[0] * m[9] - m[1] * m[8], inv10 = m[0] * m[5] - m[1] * m[4], det = 1 / (m[0] * inv0 - m[1] * inv4 + m[2] * inv8);
      a[0] = det * inv0;
      a[1] = -det * inv1;
      a[2] = det * inv2;
      a[4] = -det * inv4;
      a[5] = det * inv5;
      a[6] = -det * inv6;
      a[8] = det * inv8;
      a[9] = -det * inv9;
      a[10] = det * inv10;
      a[12] = -m[12] * a[0] - m[13] * a[4] - m[14] * a[8];
      a[13] = -m[12] * a[1] - m[13] * a[5] - m[14] * a[9];
      a[14] = -m[12] * a[2] - m[13] * a[6] - m[14] * a[10];
      return a;
    },
    compose: function(translate, rotate, scale) {
      translate || (translate = []);
      rotate || (rotate = []);
      scale || (scale = []);
      var a = this.rotate(rotate[0], rotate[1], rotate[2]);
      if (scale.length) {
        a[0] *= scale[0];
        a[1] *= scale[0];
        a[2] *= scale[0];
        a[4] *= scale[1];
        a[5] *= scale[1];
        a[6] *= scale[1];
        a[8] *= scale[2];
        a[9] *= scale[2];
        a[10] *= scale[2];
      }
      if (translate.length) {
        a[12] = translate[0];
        a[13] = translate[1];
        a[14] = translate[2];
      }
      return a;
    },
    decompose: function(m) {
      var sX = Vector.length(m[0], m[1], m[2]), sY = Vector.length(m[4], m[5], m[6]), sZ = Vector.length(m[8], m[9], m[10]);
      var rX = Math.atan2(-m[9] / sZ, m[10] / sZ) / radians, rY = Math.asin(m[8] / sZ) / radians, rZ = Math.atan2(-m[4] / sY, m[0] / sX) / radians;
      if (m[4] === 1 || m[4] === -1) {
        rX = 0;
        rY = m[4] * -Math.PI / 2;
        rZ = m[4] * Math.atan2(m[6] / sY, m[5] / sY) / radians;
      }
      var tX = m[12], tY = m[13], tZ = m[14];
      return {
        translate: [ tX, tY, tZ ],
        rotate: [ rX, rY, rZ ],
        scale: [ sX, sY, sZ ]
      };
    },
    transpose: function(m) {
      var t;
      t = m[1];
      m[1] = m[4];
      m[4] = t;
      t = m[2];
      m[2] = m[8];
      m[8] = t;
      t = m[6];
      m[6] = m[9];
      m[9] = t;
      t = m[3];
      m[3] = m[12];
      m[12] = t;
      t = m[7];
      m[7] = m[13];
      m[13] = t;
      t = m[11];
      m[11] = m[14];
      m[14] = t;
      return m;
    },
    lookAt: function(eye, target, up) {
      var z = Vector.sub(eye, target);
      z = Vector.norm(z);
      if (Vector.length(z) === 0) z[2] = 1;
      var x = Vector.cross(up, z);
      if (Vector.length(x) === 0) {
        z[0] += 1e-4;
        x = Vector.norm(Vector.cross(up, z));
      }
      var y = Vector.cross(z, x);
      var a = this.identity();
      a[0] = x[0];
      a[1] = x[1];
      a[2] = x[2];
      a[4] = y[0];
      a[5] = y[1];
      a[6] = y[2];
      a[8] = z[0];
      a[9] = z[1];
      a[10] = z[2];
      return a;
    },
    stringify: function(m) {
      for (var i = 0; i < m.length; ++i) if (Math.abs(m[i]) < 1e-6) m[i] = 0;
      return "matrix3d(" + m.join() + ")";
    }
  };
  function EventEmitter() {
    this.handlers = {};
  }
  EventEmitter.prototype.on = function(event, handler) {
    (this.handlers[event] = this.handlers[event] || []).push(handler);
    return this;
  };
  EventEmitter.prototype.off = function(event, handler) {
    var handlers = this.handlers[event];
    if (handler) {
      handlers.splice(handlers.indexOf(handler), 1);
    } else {
      delete this.handlers[event];
    }
    return this;
  };
  EventEmitter.prototype.emit = function(event) {
    var args = Array.prototype.slice.call(arguments, 1), handlers = this.handlers[event];
    if (handlers) {
      for (var i = 0; i < handlers.length; ++i) {
        handlers[i].apply(this, args);
      }
    }
    return this;
  };
  EventEmitter.prototype.listeners = function(event) {
    return this.handlers[event] || [];
  };
  var easings = function() {
    var fn = {
      quad: function(p) {
        return Math.pow(p, 2);
      },
      cubic: function(p) {
        return Math.pow(p, 3);
      },
      quart: function(p) {
        return Math.pow(p, 4);
      },
      quint: function(p) {
        return Math.pow(p, 5);
      },
      expo: function(p) {
        return Math.pow(p, 6);
      },
      sine: function(p) {
        return 1 - Math.cos(p * Math.PI / 2);
      },
      circ: function(p) {
        return 1 - Math.sqrt(1 - p * p);
      },
      back: function(p) {
        return p * p * (3 * p - 2);
      }
    };
    var easings = {
      linear: function(p) {
        return p;
      }
    };
    Object.keys(fn).forEach(function(name) {
      var ease = fn[name];
      easings["ease-in-" + name] = ease;
      easings["ease-out-" + name] = function(p) {
        return 1 - ease(1 - p);
      };
      easings["ease-in-out-" + name] = function(p) {
        return p < .5 ? ease(p * 2) / 2 : 1 - ease(p * -2 + 2) / 2;
      };
    });
    easings.css = {
      linear: "cubic-bezier(0.000, 0.000, 1.000, 1.000)",
      "ease-in-quad": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
      "ease-in-cubic": "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
      "ease-in-quart": "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
      "ease-in-quint": "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
      "ease-in-sine": "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
      "ease-in-expo": "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
      "ease-in-circ": "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
      "ease-in-back": "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
      "ease-out-quad": "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
      "ease-out-cubic": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
      "ease-out-quart": "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
      "ease-out-quint": "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
      "ease-out-sine": "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
      "ease-out-expo": "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
      "ease-out-circ": "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
      "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
      "ease-in-out-quad": "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
      "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
      "ease-in-out-quart": "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
      "ease-in-out-quint": "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
      "ease-in-out-sine": "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
      "ease-in-out-expo": "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
      "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
      "ease-in-out-back": "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
    };
    return easings;
  }();
  function Animation(item, transform, duration, ease, delay) {
    this.item = item;
    this.translate = transform.translate && transform.translate.map(parseFloat);
    this.rotate = transform.rotate && transform.rotate.map(parseFloat);
    this.scale = transform.scale;
    this.opacity = transform.opacity;
    this.start = null;
    this.diff = null;
    this.duration = (transform.duration || duration) | 0;
    this.delay = (transform.delay || delay) | 0;
    this.ease = easings[transform.ease] || easings[ease] || easings.linear;
    this.easeName = ease || "linear";
  }
  Animation.prototype.init = function(tick, force) {
    if (this.start !== null && !force) return;
    this.start = tick + this.delay;
    var state = this.item.state;
    this.initial = {
      translate: state.translate.slice(),
      rotate: state.rotate.slice(),
      scale: state.scale.slice(),
      opacity: state.opacity
    };
  };
  Animation.prototype.run = function(tick) {
    if (tick < this.start) return;
    var percent = (tick - this.start) / this.duration;
    percent = this.ease(percent);
    this.transform(percent);
  };
  Animation.prototype.pause = function() {
    this.diff = Date.now() - this.start;
  };
  Animation.prototype.resume = function() {
    this.start = Date.now() - this.diff;
  };
  Animation.prototype.set = function(type, percent) {
    var state = this.item.state, initial = this.initial;
    if (Array.isArray(this[type])) {
      for (var i = 0; i < 3; ++i) if (this[type][i]) {
        state[type][i] = initial[type][i] + this[type][i] * percent;
      }
    } else if (this[type] !== undefined) {
      state[type] = initial[type] + (this[type] - initial[type]) * percent;
    }
  };
  Animation.prototype.transform = function(percent) {
    this.set("translate", percent);
    this.set("rotate", percent);
    this.set("scale", percent);
    this.set("opacity", percent);
  };
  Animation.prototype.end = function(abort) {
    !abort && this.transform(1);
    this.start = null;
  };
  function CssAnimation(item, animation, duration, ease, delay, generated) {
    this.item = item;
    this.name = animation.name || animation;
    this.start = null;
    this.diff = null;
    this.duration = (animation.duration || duration) | 0;
    this.delay = (animation.delay || delay) | 0;
    this.ease = easings.css[animation.ease] || easings.css[ease] || easings.css.linear;
    this._infinite = false;
    this._generated = generated;
  }
  CssAnimation.prototype.init = function(tick, force) {
    if (this.start !== null && !force) return;
    this.start = tick + this.delay;
    this.item.style(animationProperty, this.name + " " + this.duration + "ms" + " " + this.ease + " " + this.delay + "ms" + (this._infinite ? " infinite" : "") + " " + "forwards");
  };
  CssAnimation.prototype.run = function() {};
  CssAnimation.prototype.pause = function() {
    this.item.style(animationProperty + "PlayState", "paused");
    this.diff = Date.now() - this.start;
  };
  CssAnimation.prototype.resume = function() {
    this.item.style(animationProperty + "PlayState", "running");
    this.start = Date.now() - this.diff;
  };
  CssAnimation.prototype.end = function() {
    if (this._generated) {
      var computed = getComputedStyle(this.item.dom, null), transform = computed[transformProperty], opacity = computed.opacity;
      this.item.style(animationProperty, "");
      this.item.state = Matrix.decompose(Matrix.parse(transform));
      this.item.state.opacity = opacity;
      this.item.style();
    }
    this.start = null;
  };
  function Collection(item) {
    EventEmitter.call(this);
    this.start = null;
    this.item = item;
    this.delay = 0;
    this.duration = 0;
    this.easeName = "linear";
    this.animations = [];
  }
  Collection.prototype = Object.create(EventEmitter.prototype);
  Collection.prototype.constructor = Collection;
  Collection.prototype.add = function(transform, duration, ease, delay, generated) {
    if (Array.isArray(transform)) {
      transform = parallel(this.item, transform);
    } else if (typeof transform == "string" || transform.name != undefined) {
      transform = new CssAnimation(this.item, transform, duration, ease, delay, generated);
    } else if (!(transform instanceof Collection)) {
      transform = new Animation(this.item, transform, duration, ease, delay);
    }
    this.animations.push(transform);
    duration = this.animations.map(function(a) {
      return a.duration + a.delay;
    });
    if (this instanceof Parallel) {
      this.duration = Math.max.apply(null, duration);
    } else {
      this.duration = duration.reduce(function(a, b) {
        return a + b;
      }, 0);
    }
    return this;
    function sequence(item, transforms) {
      var sequence = new Sequence(item);
      transforms.forEach(function(t) {
        sequence.add(t, duration, ease, delay);
      });
      return sequence;
    }
    function parallel(item, transforms) {
      var parallel = new Parallel(item);
      transforms.forEach(function(t) {
        if (Array.isArray(t)) {
          parallel.add(sequence(item, t));
        } else {
          parallel.add(t, duration, ease, delay);
        }
      });
      return parallel;
    }
  };
  Collection.prototype.__defineGetter__("length", function() {
    return this.animations.length;
  });
  Collection.prototype.get = function(index) {
    return this.animations[index];
  };
  Collection.prototype.empty = function() {
    this.animations = [];
  };
  Collection.prototype.animate = function(transform, duration, ease, delay) {
    return this.add(transform, duration, ease, delay);
  };
  Collection.prototype.css = function() {
    return this.item.css();
  };
  function Parallel(item) {
    Collection.call(this, item);
  }
  Parallel.prototype = Object.create(Collection.prototype);
  Parallel.prototype.constructor = Parallel;
  Parallel.prototype.all = function(method) {
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < this.animations.length; ++i) {
      var a = this.animations[i];
      a[method].apply(a, args);
    }
  };
  Parallel.prototype.init = function(tick, force) {
    if (this.start !== null && !force) return;
    this.start = tick;
    this.all("init", tick, force);
    this.emit("start");
  };
  Parallel.prototype.run = function(tick) {
    if (!this.animations.length) return;
    for (var i = 0; i < this.animations.length; ++i) {
      var a = this.animations[i];
      if (a.start + a.duration <= tick) {
        this.animations.splice(i--, 1);
        a.end();
        continue;
      }
      a.run(tick);
    }
    this.item.style();
    if (!this.animations.length) {
      this.end();
    }
  };
  Parallel.prototype.seek = function(tick) {
    this.run(tick);
  };
  Parallel.prototype.pause = function() {
    this.all("pause");
  };
  Parallel.prototype.resume = function() {
    this.all("resume");
  };
  Parallel.prototype.end = function(abort) {
    this.all("end", abort);
    this.emit("end");
  };
  function Sequence(item) {
    Collection.call(this, item);
    this._infinite = false;
  }
  Sequence.prototype = Object.create(Collection.prototype);
  Sequence.prototype.constructor = Sequence;
  Sequence.prototype.init = function(tick, force) {
    if (this.start !== null && !force) return;
    this.start = tick;
    this.animations[0].init(tick, force);
    this.emit("start");
  };
  Sequence.prototype.run = function(tick, a) {
    if (!this.animations.length) return;
    while (this.animations.length !== 0) {
      a = this.animations[0];
      if (a instanceof CssAnimation) {
        a._infinite = this._infinite;
      }
      a.init(tick);
      if (a.start + a.duration <= tick) {
        if (!(this._infinite && a instanceof CssAnimation)) {
          this.animations.shift();
          a.end();
        } else {
          break;
        }
        if (this._infinite && !(a instanceof CssAnimation)) {
          this.animations.push(a);
        }
        continue;
      }
      a.run(tick);
      break;
    }
    if (!(a instanceof CssAnimation)) {
      this.item.style();
    }
    if (!this.animations.length) {
      this.end();
    }
  };
  Sequence.prototype.seek = function(tick) {
    if (this.animations.length === 0) return;
    var time = 0;
    for (var i = 0; i < this.animations.length; ++i) {
      var a = this.animations[i];
      a.init(time, true);
      if (a.start + a.duration <= tick) {
        a.end();
        time += a.delay + a.duration;
        continue;
      }
      a.run(tick);
      this.item.style();
      break;
    }
  };
  Sequence.prototype.infinite = function() {
    this._infinite = true;
    return this;
  };
  Sequence.prototype.pause = function() {
    this.animations.length && this.animations[0].pause();
  };
  Sequence.prototype.resume = function() {
    this.animations.length && this.animations[0].resume();
  };
  Sequence.prototype.end = function(abort) {
    for (var i = 0; i < this.animations.length; ++i) {
      this.animations[i].end(abort);
    }
    this.animations = [];
    this._infinite = false;
    this.emit("end");
  };
  function CSS(item, idle) {
    !document.styleSheets.length && this.createStyleSheet();
    this.stylesheet = document.styleSheets[0];
    this.item = item;
    this.animation = item.animation;
    !idle && this.style();
  }
  CSS.prototype.createStyleSheet = function() {
    var style = document.createElement("style");
    document.getElementsByTagName("head")[0].appendChild(style);
  };
  CSS.prototype.pause = function() {
    this.animation.pause();
  };
  CSS.prototype.resume = function() {
    this.animation.resume();
  };
  CSS.prototype.stop = function() {
    var computed = getComputedStyle(this.item.dom, null), transform = computed[transformProperty], opacity = computed.opacity;
    this.item.style(animationProperty, "");
    this.item.state = Matrix.decompose(Matrix.parse(transform));
    this.item.state.opacity = opacity;
    this.item.style();
    return this;
  };
  CSS.prototype.style = function() {
    var animation = "a" + Date.now() + "r" + Math.floor(Math.random() * 1e3);
    this.stylesheet.insertRule(this.keyframes(animation), 0);
    this.animation.empty();
    this.animation.add(animation, this.animation.duration, "", 0, true);
  };
  CSS.prototype.keyframes = function(name) {
    var time = 0, rule = [ "@" + getProperty("keyframes") + " " + name + "{" ];
    for (var i = 0; i < this.animation.length; ++i) {
      var a = this.animation.get(i), aNext = this.animation.get(i + 1);
      a.init();
      if (a instanceof Animation) {
        i === 0 && rule.push(this.frame(0, easings.css[a.easeName]));
        a.delay && rule.push(this.frame(time += a.delay));
        a.transform(1);
        rule.push(this.frame(time += a.duration, aNext && easings.css[aNext.easeName]));
      } else {
        var frames = [];
        a.animations.forEach(function(a) {
          a.delay && frames.indexOf(a.delay) === -1 && frames.push(a.delay);
          a.duration && frames.indexOf(a.delay + a.duration) === -1 && frames.push(a.delay + a.duration);
        });
        frames = frames.sort(function(a, b) {
          return a - b;
        });
        for (var k = 0; k < frames.length; ++k) {
          var frame = frames[k];
          for (var j = 0; j < a.animations.length; ++j) {
            var pa = a.animations[j];
            if (pa.delay >= frame || pa.delay + pa.duration < frame) continue;
            pa.transform(pa.ease((frame - pa.delay) / pa.duration));
          }
          rule.push(this.frame(time += frame));
        }
      }
    }
    rule.push("}");
    return rule.join("");
  };
  CSS.prototype.percent = function(time) {
    return (time * 100 / this.animation.duration).toFixed(3);
  };
  CSS.prototype.frame = function(time, ease) {
    var percent = this.percent(time);
    return percent + "% {" + (percent ? transformProperty + ":" + this.item.transform() + ";" : "") + (percent ? "opacity:" + this.item.opacity() + ";" : "") + (ease ? getProperty("animation-timing-function") + ":" + ease + ";" : "") + "}";
  };
  function World() {
    EventEmitter.call(this);
    this.items = [];
    this.frame = null;
    this.init();
  }
  World.prototype = Object.create(EventEmitter.prototype);
  World.prototype.constructor = World;
  World.prototype.init = function() {
    var self = this;
    this.frame = requestAnimationFrame(update);
    function update(tick) {
      self.update(tick);
      self.frame = requestAnimationFrame(update);
    }
  };
  World.prototype.update = function(tick) {
    for (var i = 0; i < this.items.length; ++i) {
      this.items[i].update(tick);
    }
  };
  World.prototype.add = function(node, mass, viscosity, edge) {
    var item;
    if (mass) {
      item = new Particle(node, mass, viscosity, edge);
    } else {
      item = new Item(node);
    }
    this.items.push(item);
    return item;
  };
  World.prototype.cancel = function() {
    this.frame && cancelAnimationFrame(this.frame);
    this.frame = 0;
  };
  World.prototype.stop = function() {
    this.cancel();
    for (var i = 0; i < this.items.length; ++i) {
      this.items[i].stop();
    }
  };
  World.prototype.pause = function() {
    this.cancel();
    for (var i = 0; i < this.items.length; ++i) {
      this.items[i].pause();
    }
  };
  World.prototype.resume = function() {
    for (var i = 0; i < this.items.length; ++i) {
      this.items[i].resume();
    }
    this.init();
  };
  function Timeline() {
    World.call(this, true);
    this.currentTime = 0;
    this.start = 0;
  }
  Timeline.prototype = Object.create(World.prototype);
  Timeline.prototype.constructor = Timeline;
  Timeline.prototype.init = function() {
    this.frame = requestAnimationFrame(update);
    var self = this;
    function update(tick) {
      if (self.running) {
        self.currentTime = tick - self.start;
      }
      self.update(self.currentTime);
      self.frame = requestAnimationFrame(update);
    }
  };
  Timeline.prototype.update = function(tick) {
    for (var i = 0, length = this.items.length; i < length; ++i) {
      var item = this.items[i];
      if (this.changed < length || this.running) {
        item.timeline(tick);
        this.changed++;
        this.emit("update", tick);
      } else {
        item.style();
      }
    }
  };
  Timeline.prototype.play = function() {
    this.running = true;
    this.start = Date.now() - this.currentTime;
  };
  Timeline.prototype.pause = function() {
    this.running = false;
  };
  Timeline.prototype.stop = function() {
    this.currentTime = 0;
    this.running = false;
  };
  Timeline.prototype.seek = function(time) {
    this.changed = 0;
    this.currentTime = time;
  };
  function Item(node) {
    EventEmitter.call(this);
    this.dom = node;
    this.init();
  }
  Item.prototype = Object.create(EventEmitter.prototype);
  Item.prototype.constructor = Item;
  Item.prototype.init = function() {
    this.animation = new Sequence(this);
    this.running = true;
    this.state = {
      translate: Vector.zero(),
      rotate: Vector.zero(),
      scale: Vector.set(1),
      opacity: 1
    };
  };
  Item.prototype.update = function(tick) {
    this.animation.run(tick);
  };
  Item.prototype.timeline = function(tick) {
    this.clear();
    this.animation.seek(tick);
  };
  Item.prototype.pause = function() {
    if (!this.running) return;
    this.animation.pause();
    this.running = false;
  };
  Item.prototype.resume = function() {
    if (this.running) return;
    this.animation.resume();
    this.running = true;
  };
  Item.prototype.style = function(property, value) {
    if (property && value) {
      this.dom.style[property] = value;
    } else {
      this.dom.style[transformProperty] = this.transform();
      this.dom.style.opacity = this.opacity();
    }
  };
  Item.prototype.transform = function() {
    return Matrix.stringify(this.matrix());
  };
  Item.prototype.matrix = function() {
    var state = this.state;
    return Matrix.compose(state.translate, state.rotate, state.scale);
  };
  Item.prototype.center = function() {
    return Matrix.decompose(Matrix.inverse(this.matrix()));
  };
  Item.prototype.lookAt = function(vector) {
    var transform = Matrix.decompose(Matrix.lookAt(vector, this.state.translate, Vector.set(0, 1, 0)));
    this.state.rotate = transform.rotate;
  };
  Item.prototype.opacity = function() {
    return this.state.opacity;
  };
  Item.prototype.add = function(type, a) {
    this.state[type][0] += a[0];
    this.state[type][1] += a[1];
    this.state[type][2] += a[2];
    return this;
  };
  Item.prototype.set = function(type, a) {
    this.state[type] = a;
    return this;
  };
  Item.prototype.translate = function(t) {
    return this.add("translate", t);
  };
  Item.prototype.rotate = function(r) {
    return this.add("rotate", r);
  };
  Item.prototype.scale = function(s) {
    return this.add("scale", s);
  };
  Item.prototype.clear = function() {
    this.state.translate = Vector.zero();
    this.state.rotate = Vector.zero();
    this.state.scale = Vector.set(1);
    this.state.opacity = 1;
  };
  Item.prototype.animate = function(transform, duration, ease, delay) {
    return this.animation.add(transform, duration, ease, delay);
  };
  Item.prototype.finish = function(abort) {
    this.animation.end(abort);
    return this;
  };
  Item.prototype.stop = function() {
    return this.finish(true);
  };
  Item.prototype.css = function(idle) {
    return new CSS(this, idle);
  };
  function Constant() {
    var force = Vector.sub(this.state.translate, this.current.position);
    this.current.acceleration = Vector.add(this.current.acceleration, force);
  }
  function Attraction(radius, strength) {
    radius || (radius = 1e3);
    strength || (strength = 100);
    var force = Vector.sub(this.state.translate, this.current.position), distance = Vector.length(force);
    if (distance < radius) {
      force = Vector.scale(Vector.norm(force), 1 - distance * distance / (radius * radius));
      this.current.acceleration = Vector.add(this.current.acceleration, Vector.scale(force, strength));
    }
  }
  function Edge(min, max, bounce) {
    min || (min = Vector.set(0));
    max || (max = Vector.set(0));
    bounce || (bounce = true);
    for (var i = 0; i < 3; ++i) {
      if (this.current.position[i] < min[i] || this.current.position[i] > max[i]) {
        if (bounce) {
          this.previous.position[i] = 2 * this.current.position[i] - this.previous.position[i];
        } else {
          this.current.position[i] = Math.max(min[i], Math.min(max[i], this.current.position[i]));
        }
      }
    }
  }
  function Verlet(delta, drag) {
    var current = this.current, previous = this.previous;
    current.acceleration = Vector.scale(current.acceleration, this.mass);
    current.velocity = Vector.sub(current.position, previous.position);
    if (drag) {
      current.velocity = Vector.scale(current.velocity, drag);
    }
    previous.position = current.position;
    current.position = Vector.add(current.position, Vector.add(current.velocity, Vector.scale(current.acceleration, delta * delta)));
    current.acceleration = Vector.zero();
  }
  function Particle(node, mass, viscosity, edge) {
    Item.call(this, node);
    if (mass === Object(mass)) {
      viscosity = mass.viscosity;
      edge = mass.edge;
      mass = mass.mass;
    }
    mass /= 100;
    mass || (mass = .01);
    viscosity || (viscosity = .1);
    edge || (edge = false);
    this.mass = 1 / mass;
    this.viscosity = viscosity;
    this.edge = edge;
  }
  Particle.prototype = Object.create(Item.prototype);
  Particle.prototype.constructor = Particle;
  Particle.prototype.init = function() {
    Item.prototype.init.call(this);
    this.current = {
      position: Vector.zero(),
      velocity: Vector.zero(),
      acceleration: Vector.zero()
    };
    this.previous = {
      position: Vector.zero(),
      velocity: Vector.zero(),
      acceleration: Vector.zero()
    };
    this.clock = null;
  };
  Particle.prototype.update = function(tick) {
    this.animation.run(tick);
    this.integrate(tick);
    this.style();
  };
  Particle.prototype.timeline = function(tick) {
    this.clear();
    this.animation.seek(tick);
    this.integrate(tick, true);
    this.style();
  };
  Particle.prototype.integrate = function(tick, clamp) {
    this.clock || (this.clock = tick);
    var delta = tick - this.clock;
    if (delta) {
      clamp && (delta = Math.max(-16, Math.min(16, delta)));
      this.clock = tick;
      delta *= .001;
      Constant.call(this);
      this.edge && Edge.call(this, Vector.set(this.edge.min), Vector.set(this.edge.max), this.edge.bounce);
      Verlet.call(this, delta, 1 - this.viscosity);
    }
  };
  Particle.prototype.css = function() {
    throw new Error("CSS is nor supported for physics");
  };
  Particle.prototype.matrix = function() {
    var state = this.state;
    return Matrix.compose(this.current.position, state.rotate, state.scale);
  };
})();