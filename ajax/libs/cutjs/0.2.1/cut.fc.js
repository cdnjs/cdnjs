/*
 * CutJS 0.2.1
 * Copyright (c) 2013-2014 Ali Shakiba, Piqnt LLC and other contributors
 * Available under the MIT license
 * @license
 */

DEBUG = (typeof DEBUG === "undefined" || DEBUG) && console;

function Cut() {
    if (!(this instanceof Cut)) {
        if (typeof arguments[0] === "function") {
            return Cut.Loader.load.apply(Cut.Loader, arguments);
        } else if (typeof arguments[0] === "object") {
            return Cut.Texture.add.apply(Cut.Texture, arguments);
        }
    }
    Cut._stats.create++;
    this._id = "";
    this._visible = true;
    this._parent = null;
    this._next = null;
    this._prev = null;
    this._first = null;
    this._last = null;
    this._pin = new Cut.Pin(this);
    this._cutouts = [];
    this._tickBefore = [];
    this._tickAfter = [];
    this._alpha = 1;
}

Cut._create = function() {
    if (typeof Object.create == "function") {
        return function() {
            return Object.create.apply(null, arguments);
        };
    } else {
        var F = function() {};
        return function(proto) {
            if (arguments.length > 1) {
                throw Error("Second argument is not supported!");
            }
            if (proto === null || typeof proto != "object") {
                throw Error("Invalid prototype!");
            }
            F.prototype = proto;
            return new F();
        };
    }
}();

Cut._stats = {
    create: 0,
    tick: 0,
    paint: 0,
    paste: 0
};

Cut.create = function() {
    return new Cut();
};

Cut.prototype.render = function(context) {
    Cut._stats.tick = Cut._stats.paint = Cut._stats.paste = 0;
    var now = Cut._now();
    var elapsed = this._lastTime ? now - this._lastTime : 0;
    this._lastTime = now;
    this._tick(elapsed);
    this._paint(context);
    Cut._stats.fps = 1e3 / (Cut._now() - now);
};

Cut.prototype.MAX_ELAPSE = Infinity;

Cut.prototype._tick = function(elapsed) {
    if (!this._visible) {
        return;
    }
    if (elapsed > this.MAX_ELAPSE) {
        elapsed = this.MAX_ELAPSE;
    }
    this._pin.tick();
    var length = this._tickBefore.length;
    for (var i = 0; i < length; i++) {
        Cut._stats.tick++;
        this._tickBefore[i].call(this, elapsed);
    }
    var child, next = this._first;
    while (child = next) {
        next = child._next;
        child._tick(elapsed);
    }
    var length = this._tickAfter.length;
    for (var i = 0; i < length; i++) {
        Cut._stats.tick++;
        this._tickAfter[i].call(this, elapsed);
    }
};

Cut.prototype.tick = function(ticker, before) {
    if (before) {
        this._tickBefore.push(ticker);
    } else {
        this._tickAfter.push(ticker);
    }
};

Cut.prototype.untick = function(ticker) {
    var i;
    if (!ticker) {} else if ((i = this._tickBefore.indexOf(ticker)) >= 0) {
        this._tickBefore.splice(i, 1);
    } else if ((i = this._tickAfter.indexOf(ticker)) >= 0) {
        this._tickAfter.splice(i, 1);
    }
};

Cut.prototype._paint = function(context) {
    if (!this._visible) {
        return;
    }
    Cut._stats.paint++;
    var m = this._pin.absoluteMatrix();
    context.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);
    this._alpha = this._pin._alpha * (this._parent ? this._parent._alpha : 1);
    var alpha = this._pin._textureAlpha * this._alpha;
    if (context.globalAlpha != alpha) {
        context.globalAlpha = alpha;
    }
    var length = this._cutouts.length;
    for (var i = 0; i < length; i++) {
        this._cutouts[i].paste(context);
    }
    if (context.globalAlpha != this._alpha) {
        context.globalAlpha = this._alpha;
    }
    var child, next = this._first;
    while (child = next) {
        next = child._next;
        child._paint(context);
    }
};

Cut.prototype.toString = function() {
    return "[" + this._id + "]";
};

Cut.prototype.id = function(id) {
    if (!arguments.length) {
        return this._id;
    }
    this._id = id;
    return this;
};

Cut.prototype.attr = function(name, value) {
    if (arguments.length < 2) {
        return this._attrs ? this._attrs[name] : undefined;
    }
    (this._attrs ? this._attrs : this._attrs = {})[name] = value;
    return this;
};

Cut.prototype.on = Cut.prototype.listen = function(types, listener) {
    if (typeof listener !== "function") {
        return this;
    }
    types = (Cut._isArray(types) ? types.join(" ") : types).split(/\s+/);
    for (var i = 0; i < types.length; i++) {
        var type = types[i];
        if (type) {
            this._listeners = this._listeners || {};
            this._listeners[type] = this._listeners[type] || [];
            this._listeners[type].push(listener);
            this._listenOn(type);
        }
    }
    return this;
};

Cut.prototype.listeners = function(type) {
    return this._listeners && this._listeners[type];
};

Cut.prototype.publish = function(name, args) {
    var listeners = this.listeners(name);
    if (!listeners || !listeners.length) {
        return 0;
    }
    for (var l = 0; l < listeners.length; l++) {
        listeners[l].apply(this, args);
    }
    return listeners.length;
};

Cut.prototype.trigger = function(name, args) {
    this.publish(name, args);
    return this;
};

Cut.prototype.visit = function(visitor) {
    var reverse = visitor.reverse;
    var visible = visitor.visible;
    if (visitor.start && visitor.start(this)) {
        return;
    }
    var child, next = reverse ? this.last(visible) : this.first(visible);
    while (child = next) {
        next = reverse ? child.prev(visible) : child.next(visible);
        if (child.visit(visitor, reverse)) {
            return true;
        }
    }
    return visitor.end && visitor.end(this);
};

Cut.prototype.visible = function(visible) {
    if (!arguments.length) {
        return this._visible;
    }
    this._visible = visible;
    this._parent && (this._parent._ts_children = Cut._TS++);
    this._ts_pin = Cut._TS++;
    this.touch();
    return this;
};

Cut.prototype.hide = function() {
    return this.visible(false);
};

Cut.prototype.show = function() {
    return this.visible(true);
};

Cut.prototype.parent = function() {
    return this._parent;
};

Cut.prototype.next = function(visible) {
    var next = this._next;
    while (next && visible && !next._visible) {
        next = next._next;
    }
    return next;
};

Cut.prototype.prev = function(visible) {
    var prev = this._prev;
    while (prev && visible && !prev._visible) {
        prev = prev._prev;
    }
    return prev;
};

Cut.prototype.first = function(visible) {
    var next = this._first;
    while (next && visible && !next._visible) {
        next = next._next;
    }
    return next;
};

Cut.prototype.last = function(visible) {
    var prev = this._last;
    while (prev && visible && !prev._visible) {
        prev = prev._prev;
    }
    return prev;
};

Cut.prototype.append = function() {
    for (var i = 0; i < arguments.length; i++) {
        if (!Cut._isCut(arguments[i])) {
            throw "It is not a Cut node!";
        }
        arguments[i].appendTo(this);
    }
    return this;
};

Cut.prototype.prepend = function() {
    for (var i = 0; i < arguments.length; i++) {
        if (!Cut._isCut(arguments[i])) {
            throw "It is not a Cut node!";
        }
        arguments[i].prependTo(this);
    }
    return this;
};

Cut.prototype.appendTo = function(parent) {
    if (!parent) {
        throw "Parent is null!";
    }
    if (!Cut._isCut(parent)) {
        throw "It is not a Cut node!";
    }
    this.remove();
    if (parent._last) {
        parent._last._next = this;
        this._prev = parent._last;
    }
    this._parent = parent;
    parent._last = this;
    if (!parent._first) {
        parent._first = this;
    }
    this._parent._listenOn(this);
    this._ts_parent = Cut._TS++;
    parent._ts_children = Cut._TS++;
    parent.touch();
    return this;
};

Cut.prototype.prependTo = function(parent) {
    if (!parent) {
        throw "Parent is null!";
    }
    if (!Cut._isCut(parent)) {
        throw "It is not a Cut node!";
    }
    this.remove();
    if (parent._first) {
        parent._first._prev = this;
        this._next = parent._first;
    }
    this._parent = parent;
    parent._first = this;
    if (!parent._last) {
        parent._last = this;
    }
    this._parent._listenOn(this);
    this._ts_parent = Cut._TS++;
    parent._ts_children = Cut._TS++;
    parent.touch();
    return this;
};

Cut.prototype.insertNext = function() {
    if (arguments.length) {
        for (var i = 0; i < arguments.length; i++) {
            if (!Cut._isCut(arguments[i])) {
                throw "It is not a Cut node!";
            }
            arguments[i] && arguments[i].insertAfter(this);
        }
    }
    return this;
};

Cut.prototype.insertPrev = function() {
    if (arguments.length) {
        for (var i = 0; i < arguments.length; i++) {
            if (!Cut._isCut(arguments[i])) {
                throw "It is not a Cut node!";
            }
            arguments[i] && arguments[i].insertBefore(this);
        }
    }
    return this;
};

Cut.prototype.insertBefore = function(next) {
    if (!next) {
        throw "Next is null!";
    }
    if (!Cut._isCut(next)) {
        throw "It is not a Cut node!";
    }
    this.remove();
    var parent = next._parent;
    var prev = next._prev;
    next._prev = this;
    prev && (prev._next = this) || parent && (parent._first = this);
    this._parent = parent;
    this._prev = prev;
    this._next = next;
    this._parent._listenOn(this);
    this._ts_parent = Cut._TS++;
    this.touch();
    return this;
};

Cut.prototype.insertAfter = function(prev) {
    if (!prev) {
        throw "Prev is null!";
    }
    if (!Cut._isCut(prev)) {
        throw "It is not a Cut node!";
    }
    this.remove();
    var parent = prev._parent;
    var next = prev._next;
    prev._next = this;
    next && (next._prev = this) || parent && (parent._last = this);
    this._parent = parent;
    this._prev = prev;
    this._next = next;
    this._parent._listenOn(this);
    this._ts_parent = Cut._TS++;
    this.touch();
    return this;
};

Cut.prototype.remove = function() {
    if (arguments.length) {
        for (var i = 0; i < arguments.length; i++) {
            if (!Cut._isCut(arguments[i])) {
                throw "It is not a Cut node!";
            }
            arguments[i] && arguments[i].remove();
        }
        return this;
    }
    if (this._prev) {
        this._prev._next = this._next;
    }
    if (this._next) {
        this._next._prev = this._prev;
    }
    if (this._parent) {
        if (this._parent._first === this) {
            this._parent._first = this._next;
        }
        if (this._parent._last === this) {
            this._parent._last = this._prev;
        }
        this._parent._listenOff(this);
        this._parent._ts_children = Cut._TS++;
        this._parent.touch();
    }
    this._prev = this._next = this._parent = null;
    this._ts_parent = Cut._TS++;
    // this._parent.touch();
    return this;
};

Cut.prototype.empty = function() {
    var child, next = this._first;
    while (child = next) {
        next = child._next;
        child._prev = child._next = child._parent = null;
        this._listenOff(child);
    }
    this._first = this._last = null;
    this._ts_children = Cut._TS++;
    this.touch();
    return this;
};

Cut.prototype._listenOn = function(obj) {
    if (typeof obj === "string") {
        this._listenersCount = this._listenersCount || {};
        if (!this._listenersCount[obj] && this._parent) {
            this._parent._listenOn(obj);
        }
        this._listenersCount[obj] = (this._listenersCount[obj] || 0) + 1;
    } else if (typeof obj === "object") {
        if (obj._listenersCount) {
            for (var type in obj._listenersCount) {
                if (obj._listenersCount[type] > 0) {
                    this._listenOn(type);
                }
            }
        }
    }
};

Cut.prototype._listenOff = function(obj) {
    if (typeof obj === "string") {
        this._listenersCount = this._listenersCount || {};
        if (this._listenersCount[obj] == 1 && this._parent) {
            this._parent._listenOff(obj);
        }
        this._listenersCount[obj] = Math.max((this._listenersCount[obj] || 0) - 1, 0);
    } else if (typeof obj === "object") {
        if (obj._listenersCount) {
            for (var type in obj._listenersCount) {
                if (obj._listenersCount[type] > 0) {
                    this._listenOff(type);
                }
            }
        }
    }
};

Cut.prototype._listens = function(type) {
    return this._listenersCount && this._listenersCount[type] || 0;
};

Cut.prototype.touch = function() {
    this._ts_touch = Cut._TS++;
    this._parent && this._parent.touch();
    return this;
};

Cut.prototype.pin = function() {
    if (!arguments.length) {
        return this._pin;
    }
    var obj = this._pin.update.apply(this._pin, arguments);
    return obj === this._pin ? this : obj;
};

Cut.prototype.matrix = function() {
    return this._pin.absoluteMatrix(this, this._parent ? this._parent._pin : null);
};

Cut.prototype.tween = function(duration, delay) {
    return (this._tween || (this._tween = new Cut.Tween(this))).tween(duration, delay);
};

Cut.Tween = function(cut) {
    var tween = this;
    this._owner = cut;
    this._queue = [];
    this._next = null;
    cut.tick(function(elapsed) {
        if (!tween._queue.length) {
            return;
        }
        this.touch();
        var head = tween._queue[0];
        if (!head.time) {
            head.time = 1;
        } else {
            head.time += elapsed;
        }
        if (head.time < head.delay) {
            return;
        }
        if (!head.start) {
            head.start = {};
            head.keys = {};
            for (var key in head.end) {
                if (typeof (start = cut.pin(key)) === "number") {
                    head.start[key] = start;
                    head.keys[key] = key;
                } else if (typeof (startX = cut.pin(key + "X")) === "number" && typeof (startY = cut.pin(key + "Y")) === "number") {
                    head.start[key + "X"] = startX;
                    head.keys[key + "X"] = key;
                    head.start[key + "Y"] = startY;
                    head.keys[key + "Y"] = key;
                }
            }
        }
        var p = (head.time - head.delay) / head.duration;
        var over = p >= 1;
        p = p > 1 ? 1 : p;
        p = typeof head.easing == "function" ? head.easing(p) : p;
        var q = 1 - p;
        for (var key in head.keys) {
            cut.pin(key, head.start[key] * q + head.end[head.keys[key]] * p);
        }
        if (over) {
            tween._queue.shift();
            head.then && head.then.call(cut);
        }
    }, true);
};

Cut.Tween.prototype.tween = function(duration, delay) {
    this._next = {
        id: Cut._TS++,
        end: {},
        duration: duration || 400,
        delay: delay || 0
    };
    return this;
};

Cut.Tween.prototype.pin = function(pin) {
    if (this._next !== this._queue[this._queue.length - 1]) {
        this._owner.touch();
        this._queue.push(this._next);
    }
    var end = this._next.end;
    if (arguments.length === 1) {
        Cut._extend(end, arguments[0]);
    } else if (arguments.length === 2) {
        end[arguments[0]] = arguments[1];
    }
    return this;
};

Cut.Tween.prototype.clear = function(forward) {
    var tween;
    while (tween = this._queue.shift()) {
        forward && this._owner.pin(tween.end);
    }
    return this;
};

Cut.Tween.prototype.then = function(then) {
    this._next.then = then;
    return this;
};

Cut.Tween.prototype.ease = function(easing) {
    this._next.easing = Cut.Easing(easing);
    return this;
};

Cut.root = function(request, render) {
    return new Cut.Root(request, render);
};

Cut.Root = function(request, render) {
    Cut.String.prototype._super.apply(this, arguments);
    this._paused = true;
    this._render = render;
    this._request = request;
    var self = this;
    var requestCallback = function() {
        if (self._paused === true) {
            return;
        }
        self._mo_touch = self._ts_touch;
        self._render();
        self.request();
        self._mo_touch == self._ts_touch && self.pause();
    };
    this.request = function() {
        this._request.call(null, requestCallback);
    };
    this.on("viewport", function(viewport) {
        this._size = {
            width: viewport.width,
            height: viewport.height
        };
        this._updateViewbox();
        return true;
    });
};

Cut.Root.prototype = Cut._create(Cut.prototype);

Cut.Root.prototype._super = Cut;

Cut.Root.prototype.constructor = Cut.Root;

Cut.Root.prototype.viewbox = function(width, height, mode) {
    this._viewbox = {
        width: width,
        height: height,
        mode: /^(in|out)$/.test(mode) ? mode : "in"
    };
    this._updateViewbox();
    return this;
};

Cut.Root.prototype._updateViewbox = function() {
    var viewbox = this._viewbox;
    var size = this._size;
    if (!size) {} else if (viewbox) {
        this.pin({
            width: viewbox.width,
            height: viewbox.height,
            resizeMode: viewbox.mode,
            resizeWidth: size.width,
            resizeHeight: size.height
        });
    } else {
        this.pin({
            width: size.width,
            height: size.height
        });
    }
};

Cut.Root.prototype.start = function() {
    return this.resume();
};

Cut.Root.prototype.resume = function(force) {
    if (this._paused || force) {
        this._paused = false;
        this.request();
    }
    return this;
};

Cut.Root.prototype.pause = function() {
    this._paused = true;
    return this;
};

Cut.Root.prototype.touch = function() {
    this.resume();
    return Cut.prototype.touch.apply(this, arguments);
};

Cut.Root.prototype.resize = function(width, height, ratio) {
    this._ratio = ratio || 1;
    var data = {};
    data.width = width;
    data.height = height;
    data.ratio = ratio;
    this.visit({
        start: function(cut) {
            if (!cut._listens("viewport")) {
                return true;
            }
            cut.publish("viewport", [ data ]);
        }
    });
    return this;
};

Cut.image = function(cutout) {
    var image = new Cut.Image();
    cutout && image.image(cutout);
    return image;
};

Cut.Image = function() {
    Cut.Image.prototype._super.apply(this, arguments);
};

Cut.Image.prototype = Cut._create(Cut.prototype);

Cut.Image.prototype._super = Cut;

Cut.Image.prototype.constructor = Cut.Image;

/**
 * @deprecated Use image
 */
Cut.Image.prototype.setImage = function() {
    this.image.apply(this, arguments);
};

Cut.Image.prototype.image = function(cutout) {
    this._cutouts[0] = Cut.Out.select(cutout);
    this._cutouts.length = 1;
    this.pin({
        width: this._cutouts[0] ? this._cutouts[0].dWidth() : 0,
        height: this._cutouts[0] ? this._cutouts[0].dHeight() : 0
    });
    this._cutout = this._cutouts[0].clone();
    return this;
};

Cut.Image.prototype.cropX = function(w, x) {
    return this.image(this._cutouts[0].cropX(w, x));
};

Cut.Image.prototype.cropY = function(h, y) {
    return this.image(this._cutouts[0].cropY(h, y));
};

Cut.Image.prototype._slice = function(i) {
    return this._cutouts[i] || (this._cutouts[i] = this._cutout.clone());
};

Cut.Image.prototype.tile = function(inner) {
    this.untick(this._repeatTicker);
    this._repeatTicker = function() {
        if (this._mo_tile == this._ts_touch) {
            return;
        }
        this._mo_tile = this._ts_touch;
        var bleft = this._cutout._left, bright = this._cutout._right;
        var btop = this._cutout._top, bbottom = this._cutout._bottom;
        var bwidth = this._cutout.dWidth() - bleft - bright;
        var bheight = this._cutout.dHeight() - btop - bbottom;
        var width = this.pin("width");
        width = inner ? width : width - bleft - bright;
        var height = this.pin("height");
        height = inner ? height : height - btop - bbottom;
        var left = inner ? -bleft : 0;
        var top = inner ? -btop : 0;
        var c = 0;
        // top, left
        if (btop && bleft) {
            this._slice(c++).cropX(bleft, 0).cropY(btop, 0).offset(left, top);
        }
        // bottom, left
        if (bbottom && bleft) {
            this._slice(c++).cropX(bleft, 0).cropY(bbottom, bheight + btop).offset(left, top + height + btop);
        }
        // top, right
        if (btop && bright) {
            this._slice(c++).cropX(bright, bwidth + bleft).cropY(btop, 0).offset(left + width + bleft, top);
        }
        // bottom, right
        if (bbottom && bright) {
            this._slice(c++).cropX(bright, bwidth + bleft).cropY(bbottom, bheight + btop).offset(left + width + bleft, top + height + btop);
        }
        var x = left + bleft;
        var r = width;
        while (r > 0) {
            var w = Math.min(bwidth, r);
            r -= bwidth;
            var y = top + btop;
            var b = height;
            while (b > 0) {
                var h = Math.min(bheight, b);
                b -= bheight;
                this._slice(c++).cropX(w, bleft).cropY(h, btop).offset(x, y);
                if (r <= 0) {
                    // left
                    if (bleft) {
                        this._slice(c++).cropX(bleft, 0).cropY(h, btop).offset(left, y);
                    }
                    // right
                    if (bright) {
                        this._slice(c++).cropX(bright, bwidth + bleft).cropY(h, btop).offset(x + w, y);
                    }
                }
                y += h;
            }
            // top
            if (btop) {
                this._slice(c++).cropX(w, bleft).cropY(btop, 0).offset(x, top);
            }
            // bottom
            if (bbottom) {
                this._slice(c++).cropX(w, bleft).cropY(bbottom, bheight + btop).offset(x, y);
            }
            x += w;
        }
        this._cutouts.length = c;
    };
    this.tick(this._repeatTicker);
    return this;
};

Cut.Image.prototype.stretch = function(inner) {
    this.untick(this._repeatTicker);
    this._repeatTicker = function() {
        if (this._mo_stretch == this._pin._ts_transform) {
            return;
        }
        this._mo_stretch = this._pin._ts_transform;
        var oleft = this._cutout._left, oright = this._cutout._right;
        var otop = this._cutout._top, obottom = this._cutout._bottom;
        var owidth = this._cutout.dWidth(), oheight = this._cutout.dHeight();
        var width = this.pin("width"), height = this.pin("height");
        width = inner ? width + oleft + oright : Math.max(width, oleft + oright);
        height = inner ? height + otop + obottom : Math.max(height, otop + obottom);
        var c = 0;
        // top, left
        if (otop && oleft) {
            this._slice(c++).cropX(oleft, 0).cropY(otop, 0).offset(0, 0);
        }
        // bottom, left
        if (obottom && oleft) {
            this._slice(c++).cropX(oleft, 0).cropY(obottom, oheight - obottom).offset(0, height - obottom);
        }
        // top, right
        if (otop && oright) {
            this._slice(c++).cropX(oright, owidth - oright).cropY(otop, 0).offset(width - oright, 0);
        }
        // bottom, right
        if (obottom && oright) {
            this._slice(c++).cropX(oright, owidth - oright).cropY(obottom, oheight - obottom).offset(width - oright, height - obottom);
        }
        // top
        if (otop) {
            this._slice(c++).cropX(owidth - oleft - oright, oleft).cropY(otop, 0).offset(oleft, 0).dWidth(width - oleft - oright);
        }
        // bottom
        if (obottom) {
            this._slice(c++).cropX(owidth - oleft - oright, oleft).cropY(obottom, oheight - obottom).offset(oleft, height - obottom).dWidth(width - oleft - oright);
        }
        // left
        if (oleft) {
            this._slice(c++).cropX(oleft, 0).cropY(oheight - otop - obottom, otop).offset(0, otop).dHeight(height - otop - obottom);
        }
        // right
        if (oright) {
            this._slice(c++).cropX(oright, owidth - oright).cropY(oheight - otop - obottom, otop).offset(width - oright, otop).dHeight(height - otop - obottom);
        }
        // center
        this._slice(c++).cropX(owidth - oleft - oright, oleft).cropY(oheight - otop - obottom, otop).offset(oleft, otop).dWidth(width - oleft - oright).dHeight(height - otop - obottom);
        this._cutouts.length = c;
    };
    this.tick(this._repeatTicker);
    return this;
};

Cut.anim = function(frames, fps) {
    var anim = new Cut.Anim().frames(frames).gotoFrame(0);
    fps && anim.fps(fps);
    return anim;
};

Cut.Anim = function() {
    Cut.Anim.prototype._super.apply(this, arguments);
    this._fps = Cut.Anim.FPS;
    this._ft = 1e3 / this._fps;
    this._time = 0;
    this._frame = 0;
    this._frames = [];
    this._labels = {};
    this.tick(function() {
        if (this._time && this._frames.length > 1) {
            var t = Cut._now() - this._time;
            if (t >= this._ft) {
                var n = t < 2 * this._ft ? 1 : Math.floor(t / this._ft);
                this._time += n * this._ft;
                this.moveFrame(n);
                if (this._repeat && (this._repeat -= n) <= 0) {
                    this.stop();
                    this._callback && this._callback();
                }
            }
            this.touch();
        }
    }, false);
};

Cut.Anim.prototype = Cut._create(Cut.prototype);

Cut.Anim.prototype._super = Cut;

Cut.Anim.prototype.constructor = Cut.Anim;

Cut.Anim.FPS = 22;

Cut.Anim.prototype.fps = function(fps) {
    if (!arguments.length) {
        return this._fps;
    }
    this._fps = fps || Cut.Anim.FPS;
    this._ft = 1e3 / this._fps;
    return this;
};

/**
 * @deprecated Use frames
 */
Cut.Anim.prototype.setFrames = function() {
    this.frames.apply(this, arguments);
};

Cut.Anim.prototype.frames = function(frames) {
    this._time = this._time || 0;
    this._frame = 0;
    this._frames = [];
    this._labels = {};
    frames = Cut.Out.select(frames, true);
    if (frames && frames.length) {
        for (var i = 0; i < frames.length; i++) {
            var cutout = frames[i];
            this._frames.push(cutout);
            this._labels[cutout._name] = i;
        }
    }
    return this;
};

Cut.Anim.prototype.length = function() {
    return this._frames ? this._frames.length : 0;
};

Cut.Anim.prototype.gotoFrame = function(frame, resize) {
    frame = Cut.Math.rotate(frame, this._frames.length) | 0;
    this._frame = frame;
    resize = resize || !this._cutouts[0];
    this._cutouts[0] = this._frames[this._frame];
    if (resize) {
        this.pin({
            width: this._cutouts[0].dWidth(),
            height: this._cutouts[0].dHeight()
        });
    }
    this._ts_frame = Cut._TS++;
    this.touch();
    return this;
};

Cut.Anim.prototype.moveFrame = function(move) {
    return this.gotoFrame(this._frame + move);
};

Cut.Anim.prototype.gotoLabel = function(label, resize) {
    return this.gotoFrame(this._labels[label] || 0, resize);
};

Cut.Anim.prototype.repeat = function(repeat, callback) {
    this._repeat = repeat * this._frames.length - 1;
    this._callback = callback;
    this.play();
    return this;
};

Cut.Anim.prototype.play = function(frame) {
    if (arguments.length) {
        this.gotoFrame(frame);
        this._time = Cut._now();
    } else if (!this._time) {
        this._time = Cut._now();
    }
    return this;
};

Cut.Anim.prototype.stop = function(frame) {
    this._time = null;
    if (arguments.length) {
        this.gotoFrame(frame);
    }
    return this;
};

Cut.string = function(frames) {
    return new Cut.String().frames(frames);
};

Cut.String = function() {
    Cut.String.prototype._super.apply(this, arguments);
    this.row();
};

Cut.String.prototype = Cut._create(Cut.prototype);

Cut.String.prototype._super = Cut;

Cut.String.prototype.constructor = Cut.String;

/**
 * @deprecated Use frames
 */
Cut.String.prototype.setFont = function() {
    this.frames.apply(this, arguments);
};

Cut.String.prototype.frames = function(frames) {
    if (typeof frames == "string") {
        this._frames = function(value) {
            return frames + value;
        };
    } else if (Cut._isFunc(frames)) {
        this._frames = frames;
    }
    return this;
};

/**
 * @deprecated Use value
 */
Cut.String.prototype.setValue = function() {
    this.value.apply(this, arguments);
};

Cut.String.prototype.value = function(value) {
    if (this._value === value) return this;
    this._value = value;
    if (typeof value !== "string" && !Cut._isArray(value)) {
        value = value + "";
    }
    var child = this._first;
    for (var i = 0; i < value.length; i++) {
        var selector = this._frames(value[i]);
        if (child) {
            child.image(selector).show();
        } else {
            child = Cut.image(selector).appendTo(this);
        }
        child = child._next;
    }
    while (child) {
        child.hide();
        child = child._next;
    }
    return this;
};

Cut.row = function(align) {
    return Cut.create().row(align);
};

Cut.prototype.row = function(align) {
    this.sequence("row", align);
    return this;
};

Cut.column = function(align) {
    return Cut.create().column(align);
};

Cut.prototype.column = function(align) {
    this.sequence("column", align);
    return this;
};

Cut.sequence = function(type, align) {
    return new Cut.create().sequence(type, align);
};

Cut.prototype.sequence = function(type, align) {
    this.untick(this._layoutTicker);
    this._layoutTicker = function() {
        if (this._mo_seq == this._ts_touch) {
            return;
        }
        this._mo_seq = this._ts_touch;
        var alignChildren = this._mo_seqAlign != this._ts_children;
        this._mo_seqAlign = this._ts_children;
        var width = 0, height = 0;
        var child, next = this.first(true);
        var first = true;
        while (child = next) {
            next = child.next(true);
            child._pin.relativeMatrix();
            var w = child._pin._boxWidth;
            var h = child._pin._boxHeight;
            if (type == "column") {
                !first && (height += this._spacing || 0);
                child.pin("offsetY") != height && child.pin("offsetY", height);
                width = Math.max(width, w);
                height = height + h;
                alignChildren && child.pin("alignX", align);
            } else if (type == "row") {
                !first && (width += this._spacing || 0);
                child.pin("offsetX") != width && child.pin("offsetX", width);
                width = width + w;
                height = Math.max(height, h);
                alignChildren && child.pin("alignY", align);
            }
            first = false;
        }
        width += 2 * this._padding || 0;
        height += 2 * this._padding || 0;
        this.pin("width") != width && this.pin("width", width);
        this.pin("height") != height && this.pin("height", height);
    };
    this.tick(this._layoutTicker);
    return this;
};

Cut.box = function() {
    return new Cut.create().box();
};

Cut.prototype.box = function() {
    if (this._boxTicker) return this;
    this._boxTicker = function() {
        if (this._mo_box == this._ts_touch) {
            return;
        }
        this._mo_box = this._ts_touch;
        var width = 0, height = 0;
        var child, next = this.first(true);
        while (child = next) {
            next = child.next(true);
            child._pin.relativeMatrix();
            var w = child._pin._boxWidth;
            var h = child._pin._boxHeight;
            width = Math.max(width, w);
            height = Math.max(height, h);
        }
        width += 2 * this._padding || 0;
        height += 2 * this._padding || 0;
        this.pin("width") != width && this.pin("width", width);
        this.pin("height") != height && this.pin("height", height);
    };
    this.tick(this._boxTicker);
    return this;
};

Cut.prototype.padding = function(pad) {
    this._padding = pad;
    return this;
};

Cut.prototype.spacing = function(space) {
    this._spacing = space;
    return this;
};

// TODO use prototype
Cut.Loader = function() {
    var queue = [];
    var roots = [];
    var images = {};
    var started = false;
    function loadImages(loader, callback) {
        var loading = 0;
        var noimage = true;
        var textures = Cut.Texture._list;
        for (var texture in textures) {
            if (textures[texture].getImagePath()) {
                loading++;
                var src = textures[texture].getImagePath();
                var image = loader(src, complete, error);
                Cut.Loader.addImage(image, src);
                noimage = false;
            }
        }
        if (noimage) {
            DEBUG && console.log("No image to load.");
            callback && callback();
        }
        function complete() {
            DEBUG && console.log("Image loaded.");
            done();
        }
        function error(msg) {
            DEBUG && console.log("Error loading image: " + msg);
            done();
        }
        function done() {
            if (--loading <= 0) {
                callback && callback();
            }
        }
    }
    return {
        load: function(app, configs) {
            if (!started) {
                queue.push(arguments);
                return;
            }
            DEBUG && console.log("Init...");
            var root = this.init(function(root, canvas) {
                DEBUG && console.log("Loading app...");
                app(root, canvas);
            }, configs);
            roots.push(root);
            DEBUG && console.log("Loading images...");
            loadImages(this.loadImage, function() {
                DEBUG && console.log("Images loaded.");
                DEBUG && console.log("Start playing...");
                root.start();
            });
        },
        start: function() {
            started = true;
            var args;
            while (args = queue.shift()) {
                this.load.apply(this, args);
            }
        },
        pause: function() {
            for (var i = queue.length - 1; i >= 0; i--) {
                roots[i].pause();
            }
        },
        resume: function() {
            for (var i = queue.length - 1; i >= 0; i--) {
                roots[i].resume();
            }
        },
        getImage: function(src) {
            return images[src];
        },
        addImage: function(image, src) {
            images[src] = image;
            return this;
        }
    };
}();

// TODO use prototype
Cut.Texture = function(texture) {
    texture.cutouts = texture.cutouts || [];
    var selectionCache = {};
    var imageCache = null;
    this.getImagePath = function() {
        return texture.imagePath;
    };
    function image() {
        if (!imageCache) {
            imageCache = Cut.Loader.getImage(texture.imagePath);
        }
        return imageCache;
    }
    for (var i = 0; i < texture.cutouts.length; i++) {
        map(texture.cutouts[i]);
    }
    function map(cutout) {
        if (!cutout || cutout.isCutout) {
            return cutout;
        }
        if (typeof texture.map === "function") {
            cutout = texture.map(cutout);
        } else if (typeof texture.filter === "function") {
            cutout = texture.filter(cutout);
        }
        var ratio = texture.ratio || 1;
        if (ratio != 1) {
            cutout.x *= ratio, cutout.y *= ratio;
            cutout.width *= ratio, cutout.height *= ratio;
            cutout.top *= ratio, cutout.bottom *= ratio;
            cutout.left *= ratio, cutout.right *= ratio;
        }
        var trim = texture.trim || 0;
        if (trim) {
            cutout.x += trim, cutout.y += trim;
            cutout.width -= 2 * trim, cutout.height -= 2 * trim;
            cutout.top -= trim, cutout.bottom -= trim;
            cutout.left -= trim, cutout.right -= trim;
        }
        return cutout;
    }
    function wrap(cutout) {
        if (!cutout.isCutout) {
            cutout = new Cut.Out(cutout, image, texture.imageRatio);
        }
        return cutout;
    }
    this.select = function(selector, prefix) {
        if (!prefix) {
            // one
            var id = selector + "?";
            var result = selectionCache[id];
            if (typeof result === "undefined") {
                for (var i = 0; i < texture.cutouts.length; i++) {
                    var item = texture.cutouts[i];
                    var name = item._name || item.name;
                    if (name == selector) {
                        result = item;
                        break;
                    }
                }
                if (!result && texture.factory) {
                    result = map(texture.factory(selector));
                }
                selectionCache[id] = result;
            }
            if (!result) {
                throw "Cutout not found: '" + texture.name + ":" + selector + "'";
            }
            return wrap(result);
        } else {
            // many
            var id = selector + "*";
            var results = selectionCache[id];
            if (typeof results === "undefined") {
                results = [];
                var length = selector.length;
                for (var i = 0; i < texture.cutouts.length; i++) {
                    var item = texture.cutouts[i];
                    var name = item._name || item.name;
                    if (name && name.substring(0, length) == selector) {
                        results.push(texture.cutouts[i]);
                    }
                }
                selectionCache[id] = results;
            }
            if (!results.length) {
                throw "Cutouts not found: '" + texture.name + ":" + selector + "'";
            }
            for (var i = 0; i < results.length; i++) {
                results[i] = wrap(results[i]);
            }
            return results;
        }
    };
};

Cut.Texture._list = {};

Cut.Texture.add = function() {
    for (var i = 0; i < arguments.length; i++) {
        var texture = arguments[i];
        Cut.Texture._list[texture.name] = new Cut.Texture(texture);
    }
    return this;
};

/**
 * @deprecated Use Cut();
 */
Cut.addTexture = function() {
    return Cut.Texture.add.apply(Cut.Texture, arguments);
};

Cut.Out = function(def, image, ratio) {
    this.isCutout = true;
    this._image = image;
    this._ratio = ratio || 1;
    this._name = def.name;
    this._x = def.x;
    this._y = def.y;
    this._width = def.width;
    this._height = def.height;
    this._top = def.top || 0;
    this._bottom = def.bottom || 0;
    this._left = def.left || 0;
    this._right = def.right || 0;
    this._reset();
    return this;
};

Cut.Out.prototype._reset = function() {
    this._sx = this._x * this._ratio;
    this._sy = this._y * this._ratio;
    this._sw = this._width * this._ratio;
    this._sh = this._height * this._ratio;
    this._dx = 0;
    this._dy = 0;
    this._dw = this._width;
    this._dh = this._height;
};

Cut.Out.prototype.clone = function() {
    var clone = Cut._create(Cut.Out.prototype);
    for (var attr in this) if (this.hasOwnProperty(attr)) clone[attr] = this[attr];
    clone._reset();
    return clone;
};

Cut.Out.prototype.dWidth = function(width) {
    if (arguments.length) {
        this._dw = width;
        return this;
    }
    return this._dw;
};

Cut.Out.prototype.dHeight = function(height) {
    if (arguments.length) {
        this._dh = height;
        return this;
    }
    return this._dh;
};

Cut.Out.prototype.cropX = function(w, x) {
    x = x || 0;
    w = Math.min(w, this._width - x);
    this._dw = w;
    this._sw = w * this._ratio;
    this._sx = (this._x + x) * this._ratio;
    return this;
};

Cut.Out.prototype.cropY = function(h, y) {
    y = y || 0;
    h = Math.min(h, this._height - y);
    this._dh = h;
    this._sh = h * this._ratio;
    this._sy = (this._y + y) * this._ratio;
    return this;
};

Cut.Out.prototype.offset = function(x, y) {
    this._dx = x;
    this._dy = y;
    return this;
};

Cut.Out.prototype.paste = function(context) {
    Cut._stats.paste++;
    var img = typeof this._image === "function" ? this._image() : this._image;
    try {
        img && context.drawImage(img, // source
        this._sx, this._sy, this._sw, this._sh, // cut
        this._dx, this._dy, this._dw, this._dh);
    } catch (e) {
        if (!this._failed) {
            console.log("Unable to paste: " + this, img);
            this._failed = true;
        }
    }
};

Cut.Out.prototype.toString = function() {
    return "[" + this._name + ": " + this._sx + "x" + this._sy + "-" + this._sw + "x" + this._sh + "" + this._dx + "x" + this._dy + "-" + this._dw + "x" + this._dh + "]";
};

Cut.Out.select = function(selector, prefix) {
    if (typeof selector === "function") {
        return Cut.Out.select(selector());
    }
    if (typeof selector !== "string") {
        return selector;
    }
    var i = selector.indexOf(":");
    if (i < 0) {
        throw "Invalid selector: '" + selector + "'";
        return null;
    }
    var split = [ selector.slice(0, i), selector.slice(i + 1) ];
    var texture = Cut.Texture._list[split[0]];
    if (texture == null) {
        throw "Texture not found: '" + selector + "'";
        return !prefix ? null : [];
    }
    return texture.select(split[1], prefix);
};

Cut.drawing = function() {
    return Cut.image(Cut.Out.drawing.apply(Cut.Out, arguments));
};

// [name], width, height, [ratio], [draw]
// def, [draw]
Cut.Out.drawing = function() {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var def = {};
    var ai = 0;
    if (typeof arguments[ai] === "object") {
        def = arguments[ai++];
    } else {
        if (typeof arguments[ai] === "string") {
            def.name = arguments[ai++];
        }
        def.width = arguments[ai++];
        def.height = arguments[ai++];
        if (typeof arguments[ai] === "number") {
            def.ratio = arguments[ai++];
        }
        def.x = 0;
        def.y = 0;
    }
    def.ratio = def.ratio || 1;
    def.name = def.name || Math.random() * 1e3 | 0;
    canvas.width = Math.ceil(def.width * def.ratio);
    canvas.height = Math.ceil(def.height * def.ratio);
    var cut = new Cut.Out(def, canvas, def.ratio);
    if (typeof arguments[arguments.length - 1] === "function") {
        arguments[arguments.length - 1].call(cut, context, def.ratio);
    }
    return cut;
};

Cut.Pin = function(owner) {
    this._owner = owner;
    this._parent = null;
    // relative to parent
    this._relativeMatrix = new Cut.Matrix();
    // relative to root
    this._absoluteMatrix = new Cut.Matrix();
    this.reset();
};

Cut.Pin.prototype.reset = function() {
    this._textureAlpha = 1;
    this._alpha = 1;
    this._width = 0;
    this._height = 0;
    this._scaleX = 1;
    this._scaleY = 1;
    this._skewX = 0;
    this._skewY = 0;
    this._rotation = 0;
    // scale/skew/rotate center
    this._pivoted = false;
    this._pivotX = null;
    this._pivotY = null;
    // self pin point
    this._handled = false;
    this._handleX = 0;
    this._handleY = 0;
    // parent pin point
    this._aligned = false;
    this._alignX = 0;
    this._alignY = 0;
    // as seen by parent px
    this._offsetX = 0;
    this._offsetY = 0;
    this._boxX = 0;
    this._boxY = 0;
    this._boxWidth = this._width;
    this._boxHeight = this._height;
    this._ts_translate = Cut._TS++;
    this._ts_transform = Cut._TS++;
    this._ts_matrix = Cut._TS++;
};

Cut.Pin.prototype.tick = function() {
    this._parent = this._owner._parent && this._owner._parent._pin;
    if (this._handled && this._mo_handle != this._ts_transform) {
        this._mo_handle = this._ts_transform;
        this._ts_translate = Cut._TS++;
    }
    if (this._aligned && this._parent && this._mo_align != this._parent._ts_transform) {
        this._mo_align = this._parent._ts_transform;
        this._ts_translate = Cut._TS++;
    }
    return this;
};

Cut.Pin.prototype.toString = function() {
    return this._owner.id() + " [" + this._alignX + ", " + this._alignY + "] [" + this._handleX + ", " + this._handleY + "] [" + (this._parent ? this._parent._owner.id() : null) + "]";
};

Cut.Pin.prototype.absoluteMatrix = function() {
    var ts = Math.max(this._ts_transform, this._ts_translate, this._parent ? this._parent._ts_matrix : 0);
    if (this._mo_abs == ts) {
        return this._absoluteMatrix;
    }
    this._mo_abs = ts;
    var abs = this._absoluteMatrix;
    abs.copyFrom(this.relativeMatrix());
    this._parent && abs.concat(this._parent._absoluteMatrix);
    this._ts_matrix = Cut._TS++;
    return abs;
};

Cut.Pin.prototype.relativeMatrix = function() {
    var ts = Math.max(this._ts_transform, this._ts_translate, this._parent ? this._parent._ts_transform : 0);
    if (this._mo_rel == ts) {
        return this._relativeMatrix;
    }
    this._mo_rel = ts;
    var rel = this._relativeMatrix;
    rel.identity();
    if (this._pivoted) {
        rel.translate(-this._pivotX * this._width, -this._pivotY * this._height);
    }
    rel.scale(this._scaleX, this._scaleY);
    rel.skew(this._skewX, this._skewY);
    rel.rotate(this._rotation);
    if (this._pivoted) {
        rel.translate(this._pivotX * this._width, this._pivotY * this._height);
    }
    if (this._pivoted) {
        // set handle on origin
        this._boxX = 0;
        this._boxY = 0;
        this._boxWidth = this._width;
        this._boxHeight = this._height;
    } else {
        // set handle on aabb
        var p, q, m = rel;
        if (m.a > 0 && m.c > 0 || m.a < 0 && m.c < 0) {
            p = 0, q = m.a * this._width + m.c * this._height;
        } else {
            p = m.a * this._width, q = m.c * this._height;
        }
        if (p > q) {
            this._boxX = q;
            this._boxWidth = p - q;
        } else {
            this._boxX = p;
            this._boxWidth = q - p;
        }
        if (m.b > 0 && m.d > 0 || m.b < 0 && m.d < 0) {
            p = 0, q = m.b * this._width + m.d * this._height;
        } else {
            p = m.b * this._width, q = m.d * this._height;
        }
        if (p > q) {
            this._boxY = q;
            this._boxHeight = p - q;
        } else {
            this._boxY = p;
            this._boxHeight = q - p;
        }
    }
    this._x = this._offsetX;
    this._y = this._offsetY;
    this._x -= this._boxX + this._handleX * this._boxWidth;
    this._y -= this._boxY + this._handleY * this._boxHeight;
    if (this._aligned && this._parent) {
        this._parent.relativeMatrix();
        this._x += this._alignX * this._parent._width;
        this._y += this._alignY * this._parent._height;
    }
    rel.translate(this._x, this._y);
    return this._relativeMatrix;
};

Cut.Pin._SINGLE = {};

Cut.Pin.prototype.update = function() {
    if (arguments.length == 1 && typeof arguments[0] === "string") {
        return this["_" + arguments[0]];
    }
    this._transform_flag = false;
    this._translate_flag = false;
    var pin = null, key = null, value = null;
    if (arguments.length == 2 && typeof arguments[0] === "string") {
        for (key in Cut.Pin._SINGLE) {
            delete Cut.Pin._SINGLE[key];
        }
        (pin = Cut.Pin._SINGLE)[arguments[0]] = arguments[1];
    } else if (arguments.length == 1 && typeof arguments[0] === "object") {
        pin = arguments[0];
    }
    // TODO: map write only keys to read/write keys
    if (pin) {
        for (key in pin) {
            if (typeof (value = pin[key]) !== "undefined") {
                if (setter = Cut.Pin._setters[key]) {
                    setter.call(Cut.Pin._setters, this, value, pin);
                }
            }
        }
    }
    if (this._translate_flag) {
        this._translate_flag = false;
        this._ts_translate = Cut._TS++;
    }
    if (this._transform_flag) {
        this._transform_flag = false;
        this._ts_transform = Cut._TS++;
    }
    if (this._owner) {
        this._owner._ts_pin = Cut._TS++;
        this._owner.touch();
    }
    return this;
};

Cut.Pin._setters = {
    alpha: function(pin, value, set) {
        pin._alpha = value;
    },
    textureAlpha: function(pin, value, set) {
        pin._textureAlpha = value;
    },
    width: function(pin, value, set) {
        pin._width_ = value;
        pin._width = value;
        pin._transform_flag = true;
    },
    height: function(pin, value, set) {
        pin._height_ = value;
        pin._height = value;
        pin._transform_flag = true;
    },
    scale: function(pin, value, set) {
        pin._scaleX = value;
        pin._scaleY = value;
        pin._transform_flag = true;
    },
    scaleX: function(pin, value, set) {
        pin._scaleX = value;
        pin._transform_flag = true;
    },
    scaleY: function(pin, value, set) {
        pin._scaleY = value;
        pin._transform_flag = true;
    },
    skew: function(pin, value, set) {
        pin._skewX = value;
        pin._skewY = value;
        pin._transform_flag = true;
    },
    skewX: function(pin, value, set) {
        pin._skewX = value;
        pin._transform_flag = true;
    },
    skewY: function(pin, value, set) {
        pin._skewY = value;
        pin._transform_flag = true;
    },
    rotation: function(pin, value, set) {
        pin._rotation = value;
        pin._transform_flag = true;
    },
    pivot: function(pin, value, set) {
        pin._pivotX = value;
        pin._pivotY = value;
        pin._pivoted = true;
        pin._transform_flag = true;
    },
    pivotX: function(pin, value, set) {
        pin._pivotX = value;
        pin._pivoted = true;
        pin._transform_flag = true;
    },
    pivotY: function(pin, value, set) {
        pin._pivotY = value;
        pin._pivoted = true;
        pin._transform_flag = true;
    },
    offset: function(pin, value, set) {
        pin._offsetX = value;
        pin._offsetY = value;
        pin._translate_flag = true;
    },
    offsetX: function(pin, value, set) {
        pin._offsetX = value;
        pin._translate_flag = true;
    },
    offsetY: function(pin, value, set) {
        pin._offsetY = value;
        pin._translate_flag = true;
    },
    align: function(pin, value, set) {
        this.alignX.apply(this, arguments);
        this.alignY.apply(this, arguments);
    },
    alignX: function(pin, value, set) {
        pin._alignX = value;
        pin._aligned = true;
        pin._translate_flag = true;
        this.handleX(pin, value, set);
    },
    alignY: function(pin, value, set) {
        pin._alignY = value;
        pin._aligned = true;
        pin._translate_flag = true;
        this.handleY(pin, value, set);
    },
    handle: function(pin, value, set) {
        this.handleX(pin, value, set);
        this.handleY(pin, value, set);
    },
    handleX: function(pin, value, set) {
        pin._handleX = value;
        pin._handled = true;
        pin._translate_flag = true;
    },
    handleY: function(pin, value, set) {
        pin._handleY = value;
        pin._handled = true;
        pin._translate_flag = true;
    },
    resizeMode: function(pin, value, set) {
        if (Cut._isNum(set.resizeWidth) && Cut._isNum(set.resizeHeight)) {
            this.resizeWidth(pin, set.resizeWidth, set, true);
            this.resizeHeight(pin, set.resizeHeight, set, true);
            if (value == "out") {
                pin._scaleX = pin._scaleY = Math.max(pin._scaleX, pin._scaleY);
            } else if (value == "in") {
                pin._scaleX = pin._scaleY = Math.min(pin._scaleX, pin._scaleY);
            }
            pin._width = set.resizeWidth / pin._scaleX;
            pin._height = set.resizeHeight / pin._scaleY;
        }
    },
    resizeWidth: function(pin, value, set, force) {
        if (set.resizeMode && !force) {
            return;
        }
        pin._scaleX = value / pin._width_;
        pin._width = pin._width_;
        pin._transform_flag = true;
    },
    resizeHeight: function(pin, value, set, force) {
        if (set.resizeMode && !force) {
            return;
        }
        pin._scaleY = value / pin._height_;
        pin._height = pin._height_;
        pin._transform_flag = true;
    },
    scaleMode: function(pin, value, set) {
        if (Cut._isNum(set.scaleWidth) && Cut._isNum(set.scaleHeight)) {
            this.scaleWidth(pin, set.scaleWidth, set, true);
            this.scaleHeight(pin, set.scaleHeight, set, true);
            if (value == "out") {
                pin._scaleX = pin._scaleY = Math.max(pin._scaleX, pin._scaleY);
            } else if (value == "in") {
                pin._scaleX = pin._scaleY = Math.min(pin._scaleX, pin._scaleY);
            }
        }
    },
    scaleWidth: function(pin, value, set, force) {
        if (set.scaleMode && !force) {
            return;
        }
        pin._scaleX = value / pin._width_;
        pin._transform_flag = true;
    },
    scaleHeight: function(pin, value, set, force) {
        if (set.scaleMode && !force) {
            return;
        }
        pin._scaleY = value / pin._height_;
        pin._transform_flag = true;
    },
    matrix: function(pin, value, set) {
        this.scaleX(pin, value.a, set);
        this.skewX(pin, value.c / value.d, set);
        this.skewY(pin, value.b / value.a, set);
        this.scaleY(pin, value.d, set);
        this.offsetX(pin, value.e, set);
        this.offsetY(pin, value.f, set);
        this.rotation(pin, 0, set);
    }
};

Cut.Matrix = function(a, b, c, d, e, f) {
    this.changed = true;
    this.a = a || 1;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d || 1;
    this.e = e || 0;
    this.f = f || 0;
};

Cut.Matrix.prototype.toString = function() {
    return "[" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.e + ", " + this.f + "]";
};

Cut.Matrix.prototype.clone = function() {
    return new Cut.Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
};

Cut.Matrix.prototype.copyTo = function(m) {
    m.copyFrom(this);
    return this;
};

Cut.Matrix.prototype.copyFrom = function(m) {
    this.changed = true;
    this.a = m.a;
    this.b = m.b;
    this.c = m.c;
    this.d = m.d;
    this.e = m.e;
    this.f = m.f;
    return this;
};

Cut.Matrix.prototype.identity = function() {
    this.changed = true;
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
    return this;
};

Cut.Matrix.prototype.rotate = function(angle) {
    if (!angle) {
        return this;
    }
    this.changed = true;
    var u = angle ? Math.cos(angle) : 1;
    // android bug may give bad 0 values
    var v = angle ? Math.sin(angle) : 0;
    var a = u * this.a - v * this.b;
    var b = u * this.b + v * this.a;
    var c = u * this.c - v * this.d;
    var d = u * this.d + v * this.c;
    var e = u * this.e - v * this.f;
    var f = u * this.f + v * this.e;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    return this;
};

Cut.Matrix.prototype.translate = function(x, y) {
    if (!x && !y) {
        return this;
    }
    this.changed = true;
    this.e += x;
    this.f += y;
    return this;
};

Cut.Matrix.prototype.scale = function(x, y) {
    if (!(x - 1) && !(y - 1)) {
        return this;
    }
    this.changed = true;
    this.a *= x;
    this.b *= y;
    this.c *= x;
    this.d *= y;
    this.e *= x;
    this.f *= y;
    return this;
};

Cut.Matrix.prototype.skew = function(x, y) {
    if (!x && !y) {
        return this;
    }
    this.changed = true;
    var a = this.a + this.b * x;
    var b = this.b + this.a * y;
    var c = this.c + this.d * x;
    var d = this.d + this.c * y;
    var e = this.e + this.f * x;
    var f = this.f + this.e * y;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    return this;
};

Cut.Matrix.prototype.concat = function(m) {
    this.changed = true;
    var n = this;
    var a = n.a * m.a + n.b * m.c;
    var b = n.b * m.d + n.a * m.b;
    var c = n.c * m.a + n.d * m.c;
    var d = n.d * m.d + n.c * m.b;
    var e = n.e * m.a + m.e + n.f * m.c;
    var f = n.f * m.d + m.f + n.e * m.b;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    return this;
};

Cut.Matrix.prototype.reverse = function() {
    if (this.changed) {
        this.changed = false;
        this.reversed = this.reversed || new Cut.Matrix();
        var z = this.a * this.d - this.b * this.c;
        this.reversed.a = this.d / z;
        this.reversed.b = -this.b / z;
        this.reversed.c = -this.c / z;
        this.reversed.d = this.a / z;
        this.reversed.e = (this.c * this.f - this.e * this.d) / z;
        this.reversed.f = (this.e * this.b - this.a * this.f) / z;
    }
    return this.reversed;
};

Cut.Matrix.prototype.map = function(p, q) {
    q = q || {};
    q.x = this.a * p.x + this.c * p.y + this.e;
    q.y = this.b * p.x + this.d * p.y + this.f;
    return q;
};

Cut.Matrix.prototype.mapX = function(x, y) {
    return this.a * x + this.c * y + this.e;
};

Cut.Matrix.prototype.mapY = function(x, y) {
    return this.b * x + this.d * y + this.f;
};

Cut.Math = {};

Cut.Math.random = function(min, max) {
    if (arguments.length == 0) {
        max = 1, min = 0;
    } else if (arguments.length == 1) {
        max = min, min = 0;
    }
    if (min == max) {
        return min;
    }
    return Math.random() * (max - min) + min;
};

Cut.Math.rotate = function(num, min, max) {
    if (arguments.length < 3) {
        max = min || 0;
        min = 0;
    }
    if (max > min) {
        num = (num - min) % (max - min);
        return num + (num < 0 ? max : min);
    } else {
        num = (num - max) % (min - max);
        return num + (num <= 0 ? min : max);
    }
};

Cut.Math.length = function(x, y) {
    return Math.sqrt(x * x + y * y);
};

Cut._TS = 0;

Cut._isCut = function(obj) {
    return obj instanceof Cut;
};

Cut._isNum = function(x) {
    return typeof x === "number";
};

Cut._isFunc = function(x) {
    return typeof x === "function";
};

Cut._isArray = "isArray" in Array ? Array.isArray : function(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
};

Cut._extend = function(base, extension, attribs) {
    if (attribs) {
        for (var i = 0; i < attribs.length; i++) {
            var attr = attribs[i];
            base[attr] = extension[attr];
        }
    } else {
        for (var attr in extension) {
            base[attr] = extension[attr];
        }
    }
    return base;
};

Cut._now = function() {
    if (typeof performance !== "undefined" && performance.now) {
        return function() {
            return performance.now();
        };
    } else if (Date.now) {
        return function() {
            return Date.now();
        };
    } else {
        return function() {
            return +new Date();
        };
    }
}();

Cut._function = function(value) {
    return typeof value === "function" ? value : function() {
        return value;
    };
};

Cut._options = function(options) {
    options.get = function(name) {
        return typeof this[name] == "function" ? this[name]() : this[name];
    };
    options.extend = function(obj) {
        obj = typeof obj === "object" ? obj : {};
        for (var name in this) {
            obj[name] = name in obj ? obj[name] : this[name];
        }
        return obj;
    };
    options.mixin = function(obj) {
        if (typeof obj === "object") {
            for (var name in obj) {
                this[name] = obj[name];
            }
        }
        return this;
    };
    return options;
};

Cut._status = function(msg) {
    if (!Cut._statusbox) {
        var statusbox = Cut._statusbox = document.createElement("div");
        statusbox.style.position = "absolute";
        statusbox.style.color = "black";
        statusbox.style.background = "white";
        statusbox.style.zIndex = 999;
        statusbox.style.top = "5px";
        statusbox.style.right = "5px";
        statusbox.style.padding = "1px 5px";
        document.body.appendChild(statusbox);
    }
    Cut._statusbox.innerHTML = msg;
};

Cut.Easing = function() {
    function identity(t) {
        return t;
    }
    var easings = {}, modes = {};
    function select(token) {
        if (typeof token === "function") {
            return token;
        }
        if (typeof token !== "string") {
            return identity;
        }
        var match = /^(\w+)(-(in|out|in-out|out-in))?(\((.*)\))?$/i.exec(token);
        if (!match || !match.length) {
            return identity;
        }
        var name = match[1] || "", mode = match[3] || "in", params = match[5];
        mode = modes[mode];
        params = params ? params.replace(/\s+/, "").split(",") : [];
        var easing = easings[name];
        var fn = easing ? easing.fn || easing.fc.apply(easing.fc, params) : identity;
        return mode ? mode(fn) : fn;
    }
    select.addMode = function(mode) {
        var names = mode.name.split(/\s+/);
        for (var i = 0; i < names.length; i++) {
            names[i] && (modes[names[i]] = mode.fn);
        }
    };
    select.add = function(easing) {
        var names = easing.name.split(/\s+/);
        for (var i = 0; i < names.length; i++) {
            names[i] && (easings[names[i]] = easing);
        }
    };
    return select;
}();

Cut.Easing.addMode({
    name: "in",
    fn: function(f) {
        return function(t) {
            return f(t);
        };
    }
});

Cut.Easing.addMode({
    name: "out",
    fn: function(f) {
        return function(t) {
            return 1 - f(1 - t);
        };
    }
});

Cut.Easing.addMode({
    name: "in-out",
    fn: function(f) {
        return function(t) {
            return t < .5 ? f(2 * t) / 2 : 1 - f(2 * (1 - t)) / 2;
        };
    }
});

Cut.Easing.addMode({
    name: "out-in",
    fn: function(f) {
        return function(t) {
            return t < .5 ? 1 - f(2 * (1 - t)) / 2 : f(2 * t) / 2;
        };
    }
});

Cut.Easing.add({
    name: "linear",
    fn: function(t) {
        return t;
    }
});

Cut.Easing.add({
    name: "quad",
    fn: function(t) {
        return t * t;
    }
});

Cut.Easing.add({
    name: "cubic",
    fn: function(t) {
        return t * t * t;
    }
});

Cut.Easing.add({
    name: "quart",
    fn: function(t) {
        return t * t * t * t;
    }
});

Cut.Easing.add({
    name: "quint",
    fn: function(t) {
        return t * t * t * t * t;
    }
});

Cut.Easing.add({
    name: "sin sine",
    fn: function(t) {
        return 1 - Math.cos(t * Math.PI / 2);
    }
});

Cut.Easing.add({
    name: "exp",
    fn: function(t) {
        return t == 0 ? 0 : Math.pow(2, 10 * (t - 1));
    }
});

Cut.Easing.add({
    name: "circle circ",
    fn: function(t) {
        return 1 - Math.sqrt(1 - t * t);
    }
});

Cut.Easing.add({
    name: "bounce",
    fn: function(t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    }
});

Cut.Easing.add({
    name: "poly",
    fc: function(e) {
        return function(t) {
            return Math.pow(t, e);
        };
    }
});

Cut.Easing.add({
    name: "elastic",
    fc: function(a, p) {
        p = p || .45;
        a = a || 1;
        var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return function(t) {
            return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p);
        };
    }
});

Cut.Easing.add({
    name: "back",
    fc: function(s) {
        s = arguments.length ? s : 1.70158;
        return function(t) {
            return t * t * ((s + 1) * t - s);
        };
    }
});

if (typeof module !== "undefined") {
    module.exports = Cut;
}

if (typeof Cut === "undefined" && typeof require === "function") Cut = require("./cut-core");

DEBUG = (typeof DEBUG === "undefined" || DEBUG) && console;

/**
 * Default loader for web.
 */
window.addEventListener("load", function() {
    DEBUG && console.log("On load.");
    Cut.Loader.start();
}, false);

Cut.Loader.init = function(app, configs) {
    configs = configs || {};
    var canvas = configs.canvas, context = null, full = false;
    var width = 0, height = 0, ratio = 1;
    if (typeof canvas === "string") {
        canvas = document.getElementById(canvas);
    }
    if (!canvas) {
        canvas = document.getElementById("cutjs");
    }
    if (!canvas) {
        full = true;
        DEBUG && console.log("Creating element...");
        canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        var body = document.body;
        body.insertBefore(canvas, body.firstChild);
    }
    context = canvas.getContext("2d");
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    ratio = devicePixelRatio / backingStoreRatio;
    var requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1e3 / 60);
    };
    DEBUG && console.log("Creating root...");
    var root = Cut.root(requestAnimationFrame, function() {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, width, height);
        this.render(context);
    });
    app(root, canvas);
    resize();
    window.addEventListener("resize", resize, false);
    function resize() {
        if (full) {
            width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            height = window.innerHeight > 0 ? window.innerHeight : screen.height;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
        } else {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
        }
        width *= ratio;
        height *= ratio;
        canvas.width = width;
        canvas.height = height;
        DEBUG && console.log("Resize: " + width + " x " + height + " / " + ratio);
        root.resize(width, height, ratio);
    }
    return root;
};

Cut.Loader.loadImage = function(src, handleComplete, handleError) {
    var image = new Image();
    DEBUG && console.log("Loading image: " + src);
    image.onload = handleComplete;
    image.onerror = handleError;
    image.src = src;
    return image;
};

if (typeof Cut === "undefined" && typeof require === "function") Cut = require("./cut-core");

DEBUG = (typeof DEBUG === "undefined" || DEBUG) && console;

Cut.Mouse = function() {
    Cut.Mouse.subscribe.apply(Cut.Mouse, arguments);
};

Cut.Mouse.CLICK = "click";

Cut.Mouse.START = "touchstart mousedown";

Cut.Mouse.MOVE = "touchmove mousemove";

Cut.Mouse.END = "touchend mouseup";

Cut.Mouse.subscribe = function(root, elem, move) {
    elem = elem || document;
    elem.addEventListener("click", mouseClick);
    // TODO: with 'if' mouse doesn't work on touch screen, without 'if' two events
    // on Android
    if ("ontouchstart" in window) {
        elem.addEventListener("touchstart", function(event) {
            mouseStart(event, "touchmove");
        });
        elem.addEventListener("touchend", function(event) {
            mouseEnd(event, "touchmove");
        });
        move && elem.addEventListener("touchmove", mouseMove);
    } else {
        elem.addEventListener("mousedown", function(event) {
            mouseStart(event, "mousemove");
        });
        elem.addEventListener("mouseup", function(event) {
            mouseEnd(event, "mousemove");
        });
        move && elem.addEventListener("mousemove", mouseMove);
    }
    var visitor = null;
    var abs = {
        x: 0,
        y: 0,
        toString: function() {
            return (this.x | 0) + "x" + (this.y | 0);
        }
    };
    var rel = {
        x: 0,
        y: 0,
        toString: function() {
            return abs + " / " + (this.x | 0) + "x" + (this.y | 0);
        }
    };
    var clicked = {
        x: 0,
        y: 0,
        state: 0
    };
    function mouseStart(event, moveName) {
        update(event, elem);
        DEBUG && console.log("Mouse Start: " + event.type + " " + abs);
        !move && elem.addEventListener(moveName, mouseMove);
        event.preventDefault();
        publish(event.type, event);
        clicked.x = abs.x;
        clicked.y = abs.y;
        clicked.state = 1;
    }
    function mouseEnd(event, moveName) {
        try {
            // New xy is not valid/available, last xy is used instead.
            DEBUG && console.log("Mouse End: " + event.type + " " + abs);
            !move && elem.removeEventListener(moveName, mouseMove);
            event.preventDefault();
            publish(event.type, event);
            if (clicked.state == 1 && clicked.x == abs.x && clicked.y == abs.y) {
                DEBUG && console.log("Mouse Click [+]");
                publish("click", event);
                clicked.state = 2;
            } else {
                clicked.state = 0;
            }
        } catch (e) {
            console && console.log(e);
        }
    }
    function mouseMove(event) {
        try {
            update(event, elem);
            // DEBUG && console.log('Mouse Move: ' + event.type + ' ' +
            // abs);
            event.preventDefault();
            publish(event.type, event);
        } catch (e) {
            console && console.log(e);
        }
    }
    function mouseClick(event) {
        try {
            update(event, elem);
            DEBUG && console.log("Mouse Click: " + event.type + " " + abs);
            event.preventDefault();
            if (clicked.state != 2) {
                publish(event.type, event);
            } else {
                DEBUG && console.log("Mouse Click [-]");
            }
        } catch (e) {
            console && console.log(e);
        }
    }
    function publish(type, event) {
        abs.type = type;
        abs.event = event;
        rel.x = abs.x;
        rel.y = abs.y;
        // visitor.count = 0;
        root.visit(visitor);
    }
    visitor = {
        reverse: true,
        visible: true,
        start: function(cut) {
            if (!cut._listens(abs.type)) {
                return true;
            }
        },
        end: function(cut) {
            // visitor.count++;
            var listeners = cut.listeners(abs.type);
            if (!listeners) {
                return;
            }
            cut.matrix().reverse().map(abs, rel);
            if (cut === root || cut.attr("spy")) {} else if (rel.x < 0 || rel.x > cut._pin._width || rel.y < 0 || rel.y > cut._pin._height) {
                return;
            }
            rel.raw = abs.event;
            for (var l = 0; l < listeners.length; l++) {
                if (listeners[l].call(cut, rel)) {
                    return;
                }
            }
        }
    };
    function update(event, elem) {
        var isTouch = false;
        // touch screen events
        if (event.touches) {
            if (event.touches.length) {
                isTouch = true;
                abs.x = event.touches[0].pageX;
                abs.y = event.touches[0].pageY;
            } else {
                return;
            }
        } else {
            // mouse events
            abs.x = event.clientX;
            abs.y = event.clientY;
            // See http://goo.gl/JuVnF2
            if (document.body.scrollLeft || document.body.scrollTop) {} else if (document.documentElement) {
                abs.x += document.documentElement.scrollLeft;
                abs.y += document.documentElement.scrollTop;
            }
        }
        // accounts for border
        abs.x -= elem.clientLeft || 0;
        abs.y -= elem.clientTop || 0;
        var par = elem;
        while (par) {
            abs.x -= par.offsetLeft || 0;
            abs.y -= par.offsetTop || 0;
            if (!isTouch) {
                // touch events offset scrolling with pageX/Y
                // so scroll offset not needed for them
                abs.x += par.scrollLeft || 0;
                abs.y += par.scrollTop || 0;
            }
            par = par.offsetParent;
        }
        // see loader
        abs.x *= root._ratio || 1;
        abs.y *= root._ratio || 1;
    }
};

if (typeof define === 'function' && define.amd) { // AMD
  define('Cut', [], function() {
    return Cut;
  });
}