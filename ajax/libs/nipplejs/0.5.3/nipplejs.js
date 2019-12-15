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
    return evt.type.match(/^touch/) ? evt.changedTouches : evt;
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
    if (pos.x && pos.y) {
        el.style.left = pos.x + 'px';
        el.style.top = pos.y + 'px';
    } else if (pos.top || pos.right || pos.bottom || pos.left) {
        el.style.top = pos.top;
        el.style.right = pos.right;
        el.style.bottom = pos.bottom;
        el.style.left = pos.left;
    }
};

u.getTransitionStyle = function (property, values, time) {
    var obj = u.configStylePropertyObject(property);
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (typeof values === 'string') {
                obj[i] = values + ' ' + time;
            } else {
                var st = '';
                for (var j = 0, max = values.length; j < max; j += 1) {
                    st += values[j] + ' ' + time + ', ';
                }
                obj[i] = st.slice(0, -2);
            }
        }
    }
    return obj;
};

u.getVendorStyle = function (property, value) {
    var obj = u.configStylePropertyObject(property);
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            obj[i] = value;
        }
    }
    return obj;
};

u.configStylePropertyObject = function (prop) {
    var obj = {};
    obj[prop] = '';
    var vendors = ['webkit', 'Moz', 'o'];
    vendors.forEach(function (vendor) {
        obj[vendor + prop.charAt(0).toUpperCase() + prop.slice(1)] = '';
    });
    return obj;
};

u.extend = function (objA, objB) {
    for (var i in objB) {
        if (objB.hasOwnProperty(i)) {
            objA[i] = objB[i];
        }
    }
};
///////////////////////
///   SUPER CLASS   ///
///////////////////////
///
var Super = function () {};

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
    if (type === undefined) {
        self.handlers = {};
    } else if (cb === undefined) {
        self.handlers[type] = null;
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

Nipple.prototype = new Super();
Nipple.constructor = Nipple;

function Nipple (manager, options) {
    this.handlers = {};
    this.identifier = options.identifier;
    this.position = options.position;
    this.frontPosition = options.frontPosition;
    this.manager = manager;
    this.config(options);
    this.buildEl()
        .stylize();

    this.toReturn = {
        el: this.ui.el,
        on: this.on.bind(this),
        off: this.off.bind(this),
        show: this.show.bind(this),
        hide: this.hide.bind(this),
        add: this.addToDom.bind(this),
        remove: this.removeFromDom.bind(this),
        destroy: this.destroy.bind(this),
        computeDirection: this.computeDirection.bind(this),
        trigger: this.trigger.bind(this),
        position: this.position,
        frontPosition: this.frontPosition,
        ui: this.ui,
        identifier: this.identifier,
        options: this.options
    };

    return this.toReturn;
};

// Configure Nipple instance.
Nipple.prototype.config = function (options) {
    this.options = {};

    // Defaults
    this.options.size = 100;
    this.options.threshold = 0.1;
    this.options.color = 'white';
    this.options.fadeTime = 250;
    this.options.dataOnly = false;
    this.options.restOpacity = 0.5;
    this.options.mode = 'dynamic';

    // Overwrites
    for (var i in options) {
        if (this.options.hasOwnProperty(i)) {
            this.options[i] = options[i];
        }
    }

    if (this.options.mode === 'dynamic') {
        this.options.restOpacity = 0;
    }

    return this;
};

// Build the dom element of the Nipple instance.
Nipple.prototype.buildEl = function (options) {
    if (this.options.dataOnly) {
        return;
    }
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
    if (this.options.dataOnly) {
        return;
    }
    var animTime = this.options.fadeTime + 'ms';
    var borderStyle = u.getVendorStyle('borderRadius', '50%');
    var transitStyle = u.getTransitionStyle('transition', 'opacity', animTime);
    var styles = {};
    styles.el = {
        width: this.options.size + 'px',
        height: this.options.size + 'px',
        position: 'absolute',
        opacity: this.options.restOpacity,
        display: 'block',
        'zIndex': 999
    };

    styles.back = {
        position: 'absolute',
        display: 'block',
        width: '100%',
        height: '100%',
        marginLeft: -this.options.size / 2 + 'px',
        marginTop: -this.options.size / 2 + 'px',
        background: this.options.color,
        'opacity': '.5'
    };

    styles.front = {
        width: '50%',
        height: '50%',
        position: 'absolute',
        display: 'block',
        marginLeft: -this.options.size / 4 + 'px',
        marginTop: -this.options.size / 4 + 'px',
        background: this.options.color,
        'opacity': '.5'
    };

    u.extend(styles.el, transitStyle);
    u.extend(styles.back, borderStyle);
    u.extend(styles.front, borderStyle);

    this.applyStyles(styles);

    return this;
};

Nipple.prototype.applyStyles = function (styles) {
    // Apply styles
    for (var i in this.ui) {
        if (this.ui.hasOwnProperty(i)) {
            for (var j in styles[i]) {
                this.ui[i].style[j] = styles[i][j];
            }
        }
    }

    return this;
};

// Inject the Nipple instance into DOM.
Nipple.prototype.addToDom = function () {
    // We're not adding it if we're dataOnly or already in dom.
    if (this.options.dataOnly || document.contains(this.ui.el)) {
        return;
    }
    this.manager.options.zone.appendChild(this.ui.el);
    return this;
};

// Remove the Nipple instance from DOM.
Nipple.prototype.removeFromDom = function () {
    if (this.options.dataOnly || !document.contains(this.ui.el)) {
        return;
    }
    this.manager.options.zone.removeChild(this.ui.el);
    return this;
};

// Entirely destroy this nipple
Nipple.prototype.destroy = function () {
    clearTimeout(this.removeTimeout);
    clearTimeout(this.showTimeout);
    clearTimeout(this.restTimeout);
    this.off();
    this.removeFromDom();
    this.trigger('destroyed', this.toReturn);
    this.manager.trigger('destroyed ' + this.identifier + ':destroyed',
        this.toReturn);
};

// Fade in the Nipple instance.
Nipple.prototype.show = function (cb) {
    var self = this;

    if (self.options.dataOnly) {
        return;
    }

    clearTimeout(self.removeTimeout);
    clearTimeout(self.showTimeout);
    clearTimeout(self.restTimeout);

    self.addToDom();

    self.restCallback();

    setTimeout(function () {
        self.ui.el.style.opacity = 1;
    }, 0);

    self.showTimeout = setTimeout(function () {
        self.trigger('shown', self.toReturn);
        self.manager.trigger('shown ' + self.identifier + ':shown',
            self.toReturn);
        if (typeof cb === 'function') {
            cb.call(this);
        }
    }, self.options.fadeTime);

    return self;
};

// Fade out the Nipple instance.
Nipple.prototype.hide = function (cb) {
    var self = this;

    if (self.options.dataOnly) {
        return;
    }

    self.ui.el.style.opacity = self.options.restOpacity;

    clearTimeout(self.removeTimeout);
    clearTimeout(self.showTimeout);
    clearTimeout(self.restTimeout);

    self.removeTimeout = setTimeout(
        function () {
            var display = self.options.mode === 'dynamic' ? 'none' : 'block';
            self.ui.el.style.display = display;
            if (typeof cb === 'function') {
                cb.call(self);
            }

            self.trigger('hidden', self.toReturn);
            self.manager.trigger('hidden ' + self.identifier + ':hidden',
                self.toReturn);
        },
        self.options.fadeTime
    );
    self.restPosition();

    return self;
};

Nipple.prototype.restPosition = function (cb) {
    var self = this;
    self.frontPosition = {
        x: 0,
        y: 0
    };
    var animTime = self.options.fadeTime + 'ms';

    var transitStyle = {};
    transitStyle.front = u.getTransitionStyle('transition',
        ['top', 'left'], animTime);

    var styles = {front: {}};
    styles.front = {
        left: self.frontPosition.x + 'px',
        top: self.frontPosition.y + 'px'
    };

    self.applyStyles(transitStyle);
    self.applyStyles(styles);

    self.restTimeout = setTimeout(
        function () {
            if (typeof cb === 'function') {
                cb.call(self);
            }
            self.restCallback();
        },
        self.options.fadeTime
    );
};

Nipple.prototype.restCallback = function () {
    var self = this;
    var transitStyle = {};
    transitStyle.front = u.getTransitionStyle('transition', 'none', '');
    self.applyStyles(transitStyle);
    self.trigger('rested', self.toReturn);
    self.manager.trigger('rested ' + self.identifier + ':rested',
        self.toReturn);
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
            return obj;
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
    return obj;
};
///////////////////////
///     MANAGER     ///
///////////////////////
Manager.prototype = new Super();
Manager.constructor = Manager;

function Manager (options) {
    var self = this;
    self.handlers = {};
    self.pressureIntervals = {};
    self.config(options);
    self.box = this.options.zone.getBoundingClientRect();
    self.nipples = [];
    self.bindEvt(self.options.zone, 'start');
    self.on('destroyed', this.ondestroyed);

    self.nipples.on = self.on.bind(self);
    self.nipples.off = self.off.bind(self);
    self.nipples.options = self.options;
    self.nipples.nippleOptions = self.nippleOptions;
    self.nipples.destroy = self.destroy.bind(self);
    self.nipples.get = function (id) {
        for (var i = 0, max = self.nipples.length; i < max; i += 1) {
            if (self.nipples[i].identifier === id) {
                return self.nipples[i];
            }
        }
    };

    if (self.options.mode === 'static') {
        var nipple = this.createNipple(this.options.position, 0);
        nipple.add();
    }

    // Listen for resize, to reposition every joysticks
    var resizeTimer;
    window.onresize = function (evt) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            var pos;
            var scroll = u.getScroll();
            self.nipples.forEach(function (nipple) {
                pos = nipple.el.getBoundingClientRect();
                nipple.position = {
                    x: scroll.x + pos.left,
                    y: scroll.y + pos.top
                };
            });
        }, 100);
    };

    return self.nipples;
};

// Configure Manager.
Manager.prototype.config = function (options) {
    this.options = {};
    this.nippleOptions = {};

    // Defaults
    this.options.zone = document.body;
    this.options.multitouch = false;
    this.options.maxNumberOfNipples = 1;
    this.options.mode = 'dynamic'; //static, semi;
    this.options.position = {top: 0, left: 0};
    this.options.catchDistance = 200;
    this.nippleOptions.size = 100;
    this.nippleOptions.threshold = 0.1;
    this.nippleOptions.color = 'white';
    this.nippleOptions.fadeTime = 250;
    this.nippleOptions.dataOnly = false;
    this.nippleOptions.restOpacity = 0.5;
    this.nippleOptions.mode = this.options.mode;

    // Overwrites
    for (var i in options) {
        if (this.options.hasOwnProperty(i)) {
            this.options[i] = options[i];
        } else if (this.nippleOptions.hasOwnProperty(i)) {
            this.nippleOptions[i] = options[i];
        }
    }

    if (this.options.mode === 'static' || this.options.mode === 'semi') {
        this.options.multitouch = false;
        this.options.maxNumberOfNipples = 1;
    }

    return this;
};

// Nipple Factory
Manager.prototype.createNipple = function (position, identifier) {
    var scroll = u.getScroll();
    var toPutOn = {};

    if (position.x && position.y) {
        toPutOn = {
            x: position.x -
                (scroll.x + this.box.left),
            y: position.y -
                (scroll.y + this.box.top)
        };
    } else if (
            position.top ||
            position.right ||
            position.bottom ||
            position.left
        ) {

        // We need to compute the position X / Y of the joystick.
        var dumb = document.createElement('DIV');
        dumb.style.display = 'hidden';
        dumb.style.top = position.top;
        dumb.style.right = position.right;
        dumb.style.bottom = position.bottom;
        dumb.style.left = position.left;
        dumb.style.position = 'absolute';

        this.options.zone.appendChild(dumb);
        var dumbBox = dumb.getBoundingClientRect();
        this.options.zone.removeChild(dumb);

        toPutOn = position;
        position = {
            x: dumbBox.left + scroll.x,
            y: dumbBox.top + scroll.y
        };
    }

    var frontPosition = {
        x: 0,
        y: 0
    };

    var nipple = new Nipple(this, {
        color: this.nippleOptions.color,
        size: this.nippleOptions.size,
        threshold: this.nippleOptions.threshold,
        fadeTime: this.nippleOptions.fadeTime,
        dataOnly: this.nippleOptions.dataOnly,
        restOpacity: this.nippleOptions.restOpacity,
        mode: this.options.mode,
        identifier: identifier,
        position: position,
        frontPosition: frontPosition
    });

    if (!this.nippleOptions.dataOnly) {
        u.applyPosition(nipple.ui.el, toPutOn);
        u.applyPosition(nipple.ui.front, nipple.frontPosition);
    }

    this.nipples.push(nipple);
    return nipple;
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

    if (secondBind[type]) {
        // Support for both touch and mouse at the same time.
        u.unbindEvt(el, secondBind[type], handlers[type]);
    }

    handlers[type] = undefined;

    return this;
};

Manager.prototype.onstart = function (evt) {
    evt = u.prepareEvent(evt);
    this.box = this.options.zone.getBoundingClientRect();
    this.scroll = u.getScroll();

    // if we have touches and multitouch
    if (evt.length && this.options.multitouch &&
        this.nipples.length < this.options.maxNumberOfNipples) {

        for (var i = 0, max = evt.length; i < max; i += 1) {
            this.processOnStart(evt[i]);
        }
    // if we don't already have a nipple in place.
    // we process a new one
    } else if (this.nipples.length === 0 || this.options.mode !== 'dynamic') {
        this.processOnStart(evt[0] || evt);
    }

    if (!this.started) {
        this.bindEvt(document, 'move')
            .bindEvt(document, 'end');
        this.started = true;
    }

    return false;
};

Manager.prototype.pressureFn = function (touch, nipple, identifier) {
    var previousPressure = 0;
    clearInterval(this.pressureIntervals[identifier]);
    // Create an interval that will read the pressure every 100ms
    this.pressureIntervals[identifier] = setInterval(function () {
        var pressure = touch.force || touch.pressure ||
            touch.webkitForce || 0;
        if (pressure !== previousPressure) {
            nipple.trigger('pressure', pressure);
            this.trigger('pressure ' +
                nipple.identifier + ':pressure', pressure);
            previousPressure = pressure;
        }
    }.bind(this), 100);
};

Manager.prototype.processOnStart = function (evt) {
    var identifier = (evt.identifier !== undefined ?
        evt.identifier :
        evt.pointerId) || 0;
    var pressure = evt.force || evt.pressure || evt.webkitForce || 0;
    var nipple = this.nipples.get(identifier);

    var position = {
        x: evt.pageX,
        y: evt.pageY
    };

    if (nipple) {
        if (this.options.mode === 'static') {
            nipple.show();
            if (pressure > 0) {
                this.pressureFn(evt, nipple, identifier);
            }
            // We're not 'dynamic' so we process the first touch as a move.
            this.processOnMove(evt);
        }

        if (this.options.mode === 'semi') {
            var distance = u.distance(position, nipple.position);
            if (distance <= this.options.catchDistance) {
                nipple.show();
                if (pressure > 0) {
                    this.pressureFn(evt, nipple, identifier);
                }
                this.processOnMove(evt);
            } else {
                nipple.destroy();
                this.processOnStart(evt);
            }
        }
    } else {
        nipple = this.createNipple(position, identifier);
        this.trigger('added ' + nipple.identifier + ':added', nipple);
        nipple.show();
        if (pressure > 0) {
            this.pressureFn(evt, nipple, identifier);
        }
    }

    nipple.trigger('start', nipple);
    this.trigger('start ' + nipple.identifier + ':start', nipple);
    return nipple;
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
        x: pos.x - nipple.position.x,
        y: pos.y - nipple.position.y
    };

    if (!this.nippleOptions.dataOnly) {
        u.applyPosition(nipple.ui.front, nipple.frontPosition);
    }

    var toSend = {
        identifier: nipple.identifier,
        position: pos,
        force: force,
        pressure: evt.force || evt.pressure || evt.webkitForce || 0,
        distance: dist,
        angle: {
            radian: rAngle,
            degree: angle
        },
        instance: nipple
    };

    toSend = nipple.computeDirection(toSend);

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

    if (!this.nipples.length || this.options.mode !== 'dynamic') {
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

    if (!this.nippleOptions.dataOnly) {
        nipple.hide(function () {
            if (self.options.mode === 'dynamic') {
                nipple.trigger('removed', nipple);
                self.trigger('removed ' + identifier + ':removed', nipple);
                nipple.destroy();
            }
        });
    }

    // Clear the pressure interval reader
    clearInterval(self.pressureIntervals[identifier]);

    nipple.trigger('end', nipple);
    self.trigger('end ' + identifier + ':end', nipple);

    if (this.options.mode === 'dynamic') {
        this.nipples.splice(this.nipples.indexOf(nipple), 1);
    }
};

// Remove destroyed nipple from the list
Manager.prototype.ondestroyed = function(evt, nipple) {
    if (this.nipples.indexOf(nipple) < 0) {
        return false;
    }
    this.nipples.splice(this.nipples.indexOf(nipple), 1);
};

// Cleanly destroy the manager
Manager.prototype.destroy = function () {
    this.unbindEvt(this.options.zone, 'start');
    this.unbindEvt(document, 'move');
    this.unbindEvt(document, 'end');
    this.nipples.forEach(function(nipple) {
        nipple.destroy();
    });
    for (var i in this.pressureIntervals) {
        if (this.pressureIntervals.hasOwnProperty(i)) {
            clearInterval(this.pressureIntervals[i]);
        }
    }
    this.off();
};
return {
    create: function (options) {
        return new Manager(options);
    }
};

});
