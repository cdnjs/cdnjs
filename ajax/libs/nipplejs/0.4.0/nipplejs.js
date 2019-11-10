(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nipplejs = f()}})(function(){var define,module,exports;
'use strict';

// Constants
var isTouch = !!('ontouchstart' in window);
var isPointer = window.PointerEvent ? true : false;
var isMSPointer = window.MSPointerEvent ? true : false;
var events = {
    touch: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    },
    mouse: {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    },
    pointer: {
        start: 'pointerdown',
        move: 'pointermove',
        end: 'pointerup'
    },
    MSPointer: {
        start: 'MSPointerDown',
        move: 'MSPointerMove',
        end: 'MSPointerUp'
    }
};
var handlers = {};
var toBind;
var secondBind = {};
if (isPointer) {
    toBind = events.pointer;
} else if (isMSPointer) {
    toBind = events.MSPointer;
} else if (isTouch) {
    toBind = events.touch;
    secondBind = events.mouse;
} else {
    toBind = events.mouse;
}
///////////////////////
///      UTILS      ///
///////////////////////

var u = {};
u.distance = function (p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;

    return Math.sqrt((dx * dx) + (dy * dy));
};

u.angle = function(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;

    return u.degrees(Math.atan2(dy, dx));
};

u.findCoord = function(p, d, a) {
    var b = {x: 0, y: 0};
    a = u.radians(a);
    b.x = p.x - d * Math.cos(a);
    b.y = p.y - d * Math.sin(a);
    return b;
};

u.radians = function(a) {
    return a * (Math.PI / 180);
};

u.degrees = function(a) {
    return a * (180 / Math.PI);
};

u.bindEvt = function (el, type, handler) {
    if (el.addEventListener) {
        el.addEventListener(type, handler, false);
    } else if (el.attachEvent) {
        el.attachEvent(type, handler);
    }
};

u.unbindEvt = function (el, type, handler) {
    if (el.removeEventListener) {
        el.removeEventListener(type, handler);
    } else if (el.detachEvent) {
        el.detachEvent(type, handler);
    }
};

u.trigger = function (el, type, data) {
    var evt = new CustomEvent(type, data);
    el.dispatchEvent(evt);
};

u.prepareEvent = function (evt) {
    evt.preventDefault();
    return isTouch ? evt.changedTouches : evt;
};

u.getScroll = function () {
    var x = (window.pageXOffset !== undefined) ?
        window.pageXOffset :
        (document.documentElement || document.body.parentNode || document.body)
            .scrollLeft;

    var y = (window.pageYOffset !== undefined) ?
        window.pageYOffset :
        (document.documentElement || document.body.parentNode || document.body)
            .scrollTop;
    return {
        x: x,
        y: y
    };
};

u.applyPosition = function (el, pos) {
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';
};
///////////////////////
///   SUPER CLASS   ///
///////////////////////
///
var Super = function () {
    this.handlers = {};
};

// Basic event system.
Super.prototype.on = function (arg, cb) {
    var self = this;
    var types = arg.split(/[ ,]+/g);
    var type;

    for (var i = 0; i < types.length; i += 1) {
        type = types[i];
        self.handlers[type] = self.handlers[type] || [];
        self.handlers[type].push(cb);
    }
    return self;
};

Super.prototype.off = function (type, cb) {
    var self = this;
    if (cb === undefined) {
        self.handlers[type] = [];
    } else if (self.handlers[type] && self.handlers[type].indexOf(cb) >= 0) {
        self.handlers[type].splice(self.handlers[type].indexOf(cb), 1);
    }
    return self;
};

Super.prototype.trigger = function (arg, data) {
    var self = this;
    var types = arg.split(/[ ,]+/g);
    var type;

    for (var i = 0; i < types.length; i += 1) {
        type = types[i];
        if (self.handlers[type] && self.handlers[type].length) {
            self.handlers[type].forEach(function (handler) {
                handler.call(self, {
                    type: type,
                    target: self
                }, data);
            });
        }
    }
};
///////////////////////
///   THE NIPPLE    ///
///////////////////////

var Nipple = function (manager, options) {
    this.identifier = options.identifier;
    this.position = options.position;
    this.backPosition = options.backPosition;
    this.frontPosition = options.frontPosition;
    this.manager = manager;
    this.config(options);
    this.buildEl()
        .stylize();

    return {
        el: this.ui.el,
        on: this.on.bind(this),
        off: this.off.bind(this),
        show: this.show.bind(this),
        hide: this.hide.bind(this),
        add: this.addToDom.bind(this),
        remove: this.removeFromDom.bind(this),
        computeDirection: this.computeDirection.bind(this),
        trigger: this.trigger.bind(this),
        position: this.position,
        backPosition: this.backPosition,
        frontPosition: this.frontPosition,
        ui: this.ui,
        identifier: this.identifier,
        options: this.options
    };
};

Nipple.prototype = new Super();

// Configure Nipple instance.
Nipple.prototype.config = function (options) {
    this.options = {};

    // Defaults
    this.options.size = 100;
    this.options.threshold = 0.1;
    this.options.color = 'white';
    this.options.fadeTime = 250;

    // Overwrites
    for (var i in options) {
        if (this.options.hasOwnProperty(i)) {
            this.options[i] = options[i];
        }
    }

    return this;
};

// Build the dom element of the Nipple instance.
Nipple.prototype.buildEl = function (options) {
    this.ui = {};
    this.ui.el = document.createElement('div');
    this.ui.back = document.createElement('div');
    this.ui.front = document.createElement('div');

    this.ui.el.className = 'nipple';
    this.ui.back.className = 'back';
    this.ui.front.className = 'front';

    this.ui.el.setAttribute('id', 'nipple_' + this.identifier);

    this.ui.el.appendChild(this.ui.back);
    this.ui.el.appendChild(this.ui.front);

    return this;
};

// Apply CSS to the Nipple instance.
Nipple.prototype.stylize = function () {
    this.styles = {};
    this.styles.el = {
        width: this.options.size + 'px',
        height: this.options.size + 'px',
        position: 'absolute',
        opacity: 0,
        display: 'none',
        'transition': 'opacity ' + this.options.fadeTime + 'ms',
        'webkitTransition': 'opacity ' + this.options.fadeTime + 'ms',
        'MozTransition': 'opacity ' + this.options.fadeTime + 'ms',
        'oTransition': 'opacity ' + this.options.fadeTime + 'ms',
        'zIndex': 999
    };

    this.styles.back = {
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
        background: this.options.color,
        'borderRadius': '50%',
        'webkitBorderRadius': '50%',
        'MozBorderRadius': '50%',
        'opacity': '.5'
    };

    this.styles.front = {
        width: '50%',
        height: '50%',
        position: 'absolute',
        display: 'block',
        background: this.options.color,
        'borderRadius': '50%',
        'webkitBorderRadius': '50%',
        'MozBorderRadius': '50%',
        'opacity': '.5'
    };

    // Apply styles
    for (var i in this.ui) {
        if (this.ui.hasOwnProperty(i)) {
            for (var j in this.styles[i]) {
                this.ui[i].style[j] = this.styles[i][j];
            }
        }
    }

    return this;
};

// Inject the Nipple instance into DOM.
Nipple.prototype.addToDom = function () {
    this.manager.options.zone.appendChild(this.ui.el);
    return this;
};

// Remove the Nipple instance from DOM.
Nipple.prototype.removeFromDom = function () {
    this.manager.options.zone.removeChild(this.ui.el);
    return this;
};

// Fade in the Nipple instance.
Nipple.prototype.show = function (cb) {
    var self = this;

    clearTimeout(self.removeTimeout);
    clearTimeout(self.showTimeout);

    self.ui.el.style.opacity = 0;
    self.addToDom();
    self.ui.el.style.display = 'block';

    setTimeout(function () {
        self.ui.el.style.opacity = 1;
    }, 0);

    if (typeof cb === 'function') {
        self.showTimeout = setTimeout(function () {
            self.trigger('shown', self);
            self.manager.trigger('shown ' + self.identifier + ':shown', self);
            cb.call(this);
        }, self.options.fadeTime);
    }

    return self;
};

// Fade out the Nipple instance.
Nipple.prototype.hide = function (cb) {
    var self = this;

    self.ui.el.style.opacity = 0;
    clearTimeout(self.removeTimeout);
    clearTimeout(self.showTimeout);

    self.removeTimeout = setTimeout(
        function () {
            self.ui.el.style.display = 'none';
            if (typeof cb === 'function') {
                cb.call(this);
            }
            self.trigger('hidden', self);
            self.manager.trigger('hidden ' + self.identifier + ':hidden', self);
            self.removeFromDom();
        },
        self.options.fadeTime
    );

    return self;
};

Nipple.prototype.computeDirection = function (obj) {
    var rAngle = obj.angle.radian;
    var angle45 = Math.PI / 4;
    var angle90 = Math.PI / 2;
    var direction, directionX, directionY;

    // Angular direction
    //     \  UP /
    //      \   /
    // LEFT       RIGHT
    //      /   \
    //     /DOWN \
    //
    if (rAngle > angle45 && rAngle < (angle45 * 3)) {
        direction = 'up';
    } else if (rAngle > -angle45 && rAngle <= angle45) {
        direction = 'left';
    } else if (rAngle > (-angle45 * 3) && rAngle <= -angle45) {
        direction = 'down';
    } else {
        direction = 'right';
    }

    // Plain direction
    //    UP                 |
    // _______               | RIGHT
    //                  LEFT |
    //   DOWN                |
    if (rAngle > -angle90 && rAngle < angle90) {
        directionX = 'left';
    } else {
        directionX = 'right';
    }

    if (rAngle > 0) {
        directionY = 'up';
    } else {
        directionY = 'down';
    }

    if (obj.force > this.options.threshold) {
        var oldDirection = {};
        for (var i in this.direction) {
            if (this.direction.hasOwnProperty(i)) {
                oldDirection[i] = this.direction[i];
            }
        }
        var same = true;

        this.direction = {
            x: directionX,
            y: directionY,
            angle: direction
        };

        obj.direction = this.direction;

        for (var i in oldDirection) {
            if (oldDirection[i] !== this.direction[i]) {
                same = false;
            }
        }

        if (same) {
            return;
        }

        if (oldDirection.x !== this.direction.x ||
            oldDirection.y !== this.direction.y) {
            this.trigger('plain', obj);
            this.manager.trigger('plain ' + this.identifier + ':plain', obj);
        }

        if (oldDirection.x !== this.direction.x) {
            this.trigger('plain:' + directionX, obj);
            this.manager.trigger('plain:' + directionX + ' ' +
                this.identifier + ':plain:' + directionX, obj);
        }

        if (oldDirection.y !== this.direction.y) {
            this.trigger('plain:' + directionY, obj);
            this.manager.trigger('plain:' + directionY + ' ' +
                this.identifier + ':plain:' + directionY, obj);
        }

        if (oldDirection.angle !== this.direction.angle) {
            this.trigger('dir dir:' + direction, obj);
            this.manager.trigger('dir dir:' + direction + ' ' +
                this.identifier + ':dir ' +
                this.identifier + ':dir:' + direction, obj);
        }
    }
};
///////////////////////
///     MANAGER     ///
///////////////////////

var Manager = function (options) {
    var self = this;
    self.config(options);
    self.nipples = [];
    self.bindEvt(self.options.zone, 'start');

    self.nipples.on = self.on.bind(self);
    self.nipples.off = self.off.bind(self);
    self.nipples.options = self.options;
    self.nipples.get = function (id) {
        for (var i = 0, max = self.nipples.length; i < max; i += 1) {
            if (self.nipples[i].identifier === id) {
                return self.nipples[i];
            }
        }
    };

    return this.nipples;
};

// Extend Super.
Manager.prototype = new Super();

// Configure Manager.
Manager.prototype.config = function (options) {
    this.options = {};
    this.nippleOptions = {};

    // Defaults
    this.options.zone = document.body;
    this.options.multitouch = false;
    this.options.maxNumberOfNipples = 1;
    this.nippleOptions.size = 100;
    this.nippleOptions.threshold = 0.1;
    this.nippleOptions.color = 'white';
    this.nippleOptions.fadeTime = 250;

    // Overwrites
    for (var i in options) {
        if (this.options.hasOwnProperty(i)) {
            this.options[i] = options[i];
        } else if (this.nippleOptions.hasOwnProperty(i)) {
            this.nippleOptions[i] = options[i];
        }
    }

    return this;
};

// Bind internal events for the Manager.
Manager.prototype.bindEvt = function (el, type) {
    var self = this;

    handlers[type] = function () {
        self['on' + type].apply(self, arguments);
    };

    u.bindEvt(el, toBind[type], handlers[type]);

    if (secondBind[type]) {
        // Support for both touch and mouse at the same time.
        u.bindEvt(el, secondBind[type], handlers[type]);
    }

    return self;
};

// Unbind internal events for the Manager
Manager.prototype.unbindEvt = function (el, type) {
    u.unbindEvt(el, toBind[type], handlers[type]);
    handlers[type] = undefined;

    return this;
};

Manager.prototype.onstart = function (evt) {
    evt = u.prepareEvent(evt);

    this.box = this.options.zone.getBoundingClientRect();

    // If we have touches and multitouch
    if (evt.length && this.options.multitouch &&
        this.nipples.length < this.options.maxNumberOfNipples) {

        for (var i = 0, max = evt.length; i < max; i += 1) {
            this.processOnStart(evt[i]);
        }
    // if we don't already have a nipple in place.
    } else if (this.nipples.length === 0) {

        this.processOnStart(evt[0] || evt);

    } else {

        return false;

    }

    if (!this.started) {
        this.bindEvt(document, 'move')
            .bindEvt(document, 'end');
        this.started = true;
    }

    return false;
};

Manager.prototype.processOnStart = function (evt) {
    var identifier = (evt.identifier !== undefined ?
        evt.identifier :
        evt.pointerId) || 0;

    if (this.nipples.get(identifier)) {
        return;
    }

    var scroll = u.getScroll();
    var position = {
        x: evt.pageX,
        y: evt.pageY
    };
    var backPosition = {
        x: position.x -
            (scroll.x + this.box.left + this.nippleOptions.size / 2),
        y: position.y -
            (scroll.y + this.box.top + this.nippleOptions.size / 2)
    };
    var frontPosition = {
        x: this.nippleOptions.size / 4,
        y: this.nippleOptions.size / 4
    };
    var nipple = new Nipple(this, {
        color: this.nippleOptions.color,
        size: this.nippleOptions.size,
        threshold: this.nippleOptions.threshold,
        fadeTime: this.nippleOptions.fadeTime,
        identifier: identifier,
        position: position,
        backPosition: backPosition,
        frontPosition: frontPosition
    });

    u.applyPosition(nipple.ui.el, nipple.backPosition);
    u.applyPosition(nipple.ui.front, nipple.frontPosition);

    nipple.show();
    this.nipples.push(nipple);
    this.trigger('added ' + identifier + ':added', nipple);
    nipple.trigger('start', nipple);
    this.trigger('start ' + identifier + ':start', nipple);
};

Manager.prototype.onmove = function (evt) {
    evt = u.prepareEvent(evt);
    var toSends = [];

    if (evt.length && this.options.multitouch) {
        for (var i = 0, max = evt.length; i < max; i += 1) {
            toSends.push(this.processOnMove(evt[i]));
        }
    } else {
        toSends.push(this.processOnMove(evt[0] || evt));
    }

    return false;
};

Manager.prototype.processOnMove = function (evt) {
    var identifier = (evt.identifier !== undefined ?
        evt.identifier :
        evt.pointerId) || 0;
    var nipple = this.nipples.get(identifier);

    if (!nipple) {
        console.error('MOVE: Couldn\'t find the nipple n°' + identifier + '.');
        console.error(this.nipples);
        return;
    }

    var size = nipple.options.size / 2;
    var pos = {
        x: evt.pageX,
        y: evt.pageY
    };
    var dist = u.distance(pos, nipple.position);
    var angle = u.angle(pos, nipple.position);
    var rAngle = u.radians(angle);
    var force = dist / size;

    if (dist > size) {
        dist = size;
        pos = u.findCoord(nipple.position, dist, angle);
    }

    nipple.frontPosition = {
        x: pos.x - nipple.position.x + nipple.options.size / 4,
        y: pos.y - nipple.position.y + nipple.options.size / 4
    };

    u.applyPosition(nipple.ui.front, nipple.frontPosition);

    var toSend = {
        identifier: nipple.identifier,
        position: pos,
        force: force,
        pressure: evt.force || evt.pressure || evt.webkitForce,
        distance: dist,
        angle: {
            radian: rAngle,
            degree: angle
        },
        instance: nipple
    };

    nipple.computeDirection(toSend);

    // Offset angles to follow units circle.
    toSend.angle = {
        radian: u.radians(180 - angle),
        degree: 180 - angle
    };

    nipple.trigger('move', toSend);
    this.trigger('move ' + identifier + ':move', toSend);
    return toSend;
};

Manager.prototype.onend = function (evt) {
    evt = u.prepareEvent(evt);

    if (evt.length && this.options.multitouch) {
        for (var i = 0, max = evt.length; i < max; i += 1) {
            this.processOnEnd(evt[i]);
        }
    } else {
        this.processOnEnd(evt[0] || evt);
    }

    if (!this.nipples.length) {
        this.unbindEvt(document, 'move')
            .unbindEvt(document, 'end');
        this.started = false;
    }

    return false;
};

Manager.prototype.processOnEnd = function (evt) {
    var identifier = (evt.identifier !== undefined ?
        evt.identifier :
        evt.pointerId) || 0;
    var self = this;
    var nipple = self.nipples.get(identifier);

    if (!nipple) {
        console.error('END: Couldn\'t find the nipple n°' + identifier + '.');
        console.error(self.nipples);
        return;
    }
    nipple.hide(function () {
        nipple.trigger('removed', nipple);
        self.trigger('removed ' + identifier + ':removed', nipple);
    });
    nipple.trigger('end', nipple);
    self.trigger('end ' + identifier + ':end', nipple);
    var index = self.nipples.indexOf(nipple);
    self.nipples.splice(index, 1);
};
return {
    create: function (options) {
        return new Manager(options);
    }
};

});
