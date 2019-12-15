(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nipplejs = f()}})(function(){var define,module,exports;
'use strict';

// Constants
var isTouch = !!('ontouchstart' in window);
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
    }
};
var handlers = {};
var toBind = isTouch ? events.touch : events.mouse;

// Utils
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
    return isTouch ? evt.touches[0] : evt;
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

///////////////////////
///   THE NIPPLE    ///
///////////////////////

var Nipple = function (options) {
    this.config(options);
    this.handlers = {};
    this.buildEl()
        .stylize()
        .bindEvt(this.options.zone, 'start');

    return {
        on: this.on.bind(this),
        off: this.off.bind(this),
        el: this.ui.el,
        options: this.options,
        ui: this.ui
    };
};

// Basic event system.
Nipple.prototype.on = function (type, cb) {
    var self = this;
    self.handlers[type] = self.handlers[type] || [];
    self.handlers[type].push(cb);
};

Nipple.prototype.off = function (type, cb) {
    var self = this;
    if (self.handlers[type] && self.handlers[type].indexOf(cb) >= 0) {
        self.handlers[type].splice(self.handlers[type].indexOf(cb), 1);
        return true;
    }
    return false;
};

Nipple.prototype.trigger = function (type, data) {
    var self = this;
    if (self.handlers[type] && self.handlers[type].length) {
        self.handlers[type].forEach(function (handler) {
            handler.call(self, {
                type: type
            }, data);
        });
    }
};

Nipple.prototype.config = function (options) {
    this.options = {};

    // Defaults
    this.options.zone = document.body;
    this.options.size = 100;
    this.options.threshold = 0.1;
    this.options.color = 'white';
    this.options.fadeTime = 250;

    // Overwrites
    for (var i in options) {
        if (options.hasOwnProperty(i)) {
            this.options[i] = options[i];
        }
    }

    return this;
};

Nipple.prototype.buildEl = function (options) {
    this.ui = {};
    this.ui.el = document.createElement('div');
    this.ui.back = document.createElement('div');
    this.ui.front = document.createElement('div');

    this.ui.el.className = 'nipple';
    this.ui.back.className = 'back';
    this.ui.front.className = 'front';

    this.ui.el.appendChild(this.ui.back);
    this.ui.el.appendChild(this.ui.front);

    return this;
};

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

Nipple.prototype.addToDom = function () {
    this.options.zone.appendChild(this.ui.el);
    return this;
};

Nipple.prototype.removeFromDom = function () {
    this.options.zone.removeChild(this.ui.el);
    return this;
};

Nipple.prototype.show = function () {
    var self = this;

    clearTimeout(self.removeTimeout);

    self.ui.el.style.opacity = 0;
    self.addToDom();
    self.ui.el.style.display = 'block';

    setTimeout(function () {
        self.ui.el.style.opacity = 1;
    }, 0);

    return self;
};

Nipple.prototype.hide = function () {
    var self = this;

    self.ui.el.style.opacity = 0;
    clearTimeout(self.removeTimeout);

    self.removeTimeout = setTimeout(
        function () {
            self.ui.el.style.display = 'none';
            self.removeFromDom();
        },
        self.options.fadeTime
    );

    return self;
};

Nipple.prototype.applyPosition = function (el, pos) {
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';

    return this;
};

Nipple.prototype.bindEvt = function (el, type) {
    var self = this;

    handlers[type] = function () {
        self['on' + type].apply(self, arguments);
    };

    u.bindEvt(el, toBind[type], handlers[type]);

    return self;
};

Nipple.prototype.unbindEvt = function (el, type) {
    u.unbindEvt(el, toBind[type], handlers[type]);
    handlers[type] = undefined;

    return this;
};

Nipple.prototype.computeDirection = function (evt, obj) {
    var rAngle = obj.angle.radian;
    var dAngle = obj.angle.degree;
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
    //       U|P
    //LEFT____|___ RIGHT
    //        |
    //      DO|WN
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
        obj.direction = {
            x: directionX,
            y: directionY,
            angle: direction
        };

        this.trigger('dir', obj);
        this.trigger('plain', obj);
        this.trigger('dir:' + direction, obj);
        this.trigger('plain:' + directionX, obj);
        this.trigger('plain:' + directionY, obj);
    }
};

Nipple.prototype.onstart = function (evt) {
    evt = u.prepareEvent(evt);
    var scroll = u.getScroll();
    this.box = this.options.zone.getBoundingClientRect();
    this.pos = {
        x: evt.pageX,
        y: evt.pageY
    };

    this.backPos = {
        x: this.pos.x - (scroll.x + this.box.x + this.options.size / 2),
        y: this.pos.y - (scroll.y + this.box.y + this.options.size / 2)
    };

    this.bindEvt(document, 'move')
        .bindEvt(document, 'end')
        .applyPosition(this.ui.el, this.backPos)
        .applyPosition(this.ui.front, {
            x: this.options.size / 4,
            y: this.options.size / 4
        })
        .show();

    this.trigger('start', {
        position: this.pos
    });
    return false;
};

Nipple.prototype.onmove = function (evt) {
    evt = u.prepareEvent(evt);
    var size = this.options.size / 2;
    var pos = {
        x: evt.pageX,
        y: evt.pageY
    };
    var dist = u.distance(pos, this.pos);
    var angle = u.angle(pos, this.pos);
    var rAngle = u.radians(angle);
    var force = dist / size;

    if (dist > size) {
        dist = size;
        pos = u.findCoord(this.pos, dist, angle);
    }

    this.applyPosition(this.ui.front, {
        x: pos.x - this.pos.x + this.options.size / 4,
        y: pos.y - this.pos.y + this.options.size / 4
    });

    var toSend = {
        position: pos,
        force: force,
        distance: dist,
        angle: {
            radian: rAngle,
            degree: angle
        }
    };

    this.computeDirection(evt, toSend);
    this.trigger('move', toSend);

    return false;
};

Nipple.prototype.onend = function (evt) {
    evt = u.prepareEvent(evt);
    this.unbindEvt(document, 'move')
        .unbindEvt(document, 'end')
        .hide();
    this.trigger('end');
    return false;
};

return {
    create: function (options) {
        return new Nipple(options);
    }
};

});
