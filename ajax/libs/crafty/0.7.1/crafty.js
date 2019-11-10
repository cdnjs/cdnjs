/**
 * craftyjs 0.7.1
 * http://craftyjs.com/
 *
 * Copyright 2016, Louis Stowasser
 * Dual licensed under the MIT or GPL licenses.
 */


(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
var Crafty = require('../core/core.js');

/**@
 * #Draggable
 * @category Controls
 * Enable drag and drop of the entity. Listens to events from `MouseDrag` and moves entity accordingly.
 *
 * @see MouseDrag
 */
Crafty.c("Draggable", {
    _origX: null,
    _origY: null,
    _oldX: null,
    _oldY: null,
    _dir: null,

    init: function () {
        this.requires("MouseDrag");
        this.bind("StartDrag", this._startDrag)
            .bind("Dragging", this._drag);
    },

    remove: function() {
        this.unbind("StartDrag", this._startDrag)
            .unbind("Dragging", this._drag);
    },

    /**@
     * #.enableDrag
     * @comp Draggable
     * @sign public this .enableDrag(void)
     *
     * Reenable dragging of entity. Use if `.disableDrag` has been called.
     *
     * @see .disableDrag
     */
    enableDrag: function () {
        this.uniqueBind("Dragging", this._drag);
        return this;
    },

    /**@
     * #.disableDrag
     * @comp Draggable
     * @sign public this .disableDrag(void)
     *
     * Disables entity dragging. Reenable with `.enableDrag()`.
     *
     * @see .enableDrag
     */
    disableDrag: function () {
        this.unbind("Dragging", this._drag);
        return this;
    },

    /**@
     * #.dragDirection
     * @comp Draggable
     * Method used for modifying the drag direction.
     * If direction is set, the entity being dragged will only move along the specified direction.
     * If direction is not set, the entity being dragged will move along any direction.
     *
     * @sign public this .dragDirection()
     * Remove any previously specified direction.
     *
     * @sign public this .dragDirection(vector)
     * @param vector - Of the form of {x: valx, y: valy}, the vector (valx, valy) denotes the move direction.
     *
     * @sign public this .dragDirection(degree)
     * @param degree - A number, the degree (clockwise) of the move direction with respect to the x axis.
     *
     * Specify the dragging direction.
     *
     * @example
     * ~~~
     * this.dragDirection()
     * this.dragDirection({x:1, y:0}) //Horizontal
     * this.dragDirection({x:0, y:1}) //Vertical
     * // Note: because of the orientation of x and y axis,
     * // this is 45 degree clockwise with respect to the x axis.
     * this.dragDirection({x:1, y:1}) //45 degree.
     * this.dragDirection(60) //60 degree.
     * ~~~
     */
    dragDirection: function (dir) {
        if (typeof dir === 'undefined') {
            this._dir = null;
        } else if (("" + parseInt(dir, 10)) == dir) { //dir is a number
            this._dir = {
                x: Math.cos(dir / 180 * Math.PI),
                y: Math.sin(dir / 180 * Math.PI)
            };
        } else {
            if (dir.x === 0 && dir.y === 0) {
                this._dir = { x: 0, y: 0 };
            } else {
                var r = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
                this._dir = {
                    x: dir.x / r,
                    y: dir.y / r
                };
            }
        }
        return this;
    },

    _startDrag: function (e) {
        this._origX = e.realX;
        this._origY = e.realY;
        this._oldX = this._x;
        this._oldY = this._y;
    },

    _drag: function(e) {
        if (this._dir) {
            if (this._dir.x !== 0 || this._dir.y !== 0) {
                var len = (e.realX - this._origX) * this._dir.x + (e.realY - this._origY) * this._dir.y;
                this.x = this._oldX + len * this._dir.x;
                this.y = this._oldY + len * this._dir.y;
            }
        } else {
            this.x = this._oldX + (e.realX - this._origX);
            this.y = this._oldY + (e.realY - this._origY);
        }
    }
});

/**@
 * #Multiway
 * @category Controls
 * @trigger NewDirection - When entity has changed direction due to velocity on either x or y axis a NewDirection event is triggered. The event is triggered once, if direction is different from last frame. - { x: -1 | 0 | 1, y: -1 | 0 | 1 } - New direction
 * @trigger Moved - When entity has moved due to velocity/acceleration on either x or y axis a Moved event is triggered. If the entity has moved on both axes for diagonal movement the event is triggered twice. - { axis: 'x' | 'y', oldValue: Number } - Old position
 *
 * Used to bind keys to directions and have the entity move accordingly.
 *
 * @see Motion, Keyboard
 */
Crafty.c("Multiway", {
    _speed: null,
    
    init: function () {
        this.requires("Motion, Keyboard");

        this._keyDirection = {}; // keyCode -> direction
        this._activeDirections = {}; // direction -> # of keys pressed for that direction
        this._directionSpeed = {}; // direction -> {x: x_speed, y: y_speed}
        this._speed = { x: 150, y: 150 };

        this.bind("KeyDown", this._keydown)
            .bind("KeyUp", this._keyup);
    },

    remove: function() {
        this.unbind("KeyDown", this._keydown)
            .unbind("KeyUp", this._keyup);

        // unapply movement of pressed keys
        this.__unapplyActiveDirections();
    },

    _keydown: function (e) {
        var direction = this._keyDirection[e.key];
        if (direction !== undefined) { // if this is a key we are interested in
            if (this._activeDirections[direction] === 0 && !this.disableControls) { // if key is first one pressed for this direction
                this.vx += this._directionSpeed[direction].x;
                this.vy += this._directionSpeed[direction].y;
            }
            this._activeDirections[direction]++;
        }
    },

    _keyup: function (e) {
        var direction = this._keyDirection[e.key];
        if (direction !== undefined) { // if this is a key we are interested in
            this._activeDirections[direction]--;
            if (this._activeDirections[direction] === 0 && !this.disableControls) { // if key is last one unpressed for this direction
                this.vx -= this._directionSpeed[direction].x;
                this.vy -= this._directionSpeed[direction].y;
            }
        }
    },


    /**@
     * #.multiway
     * @comp Multiway
     * @sign public this .multiway([Number speed,] Object keyBindings)
     * @param speed - A speed in pixels per second
     * @param keyBindings - What keys should make the entity go in which direction. Direction is specified in degrees
     *
     * Constructor to initialize the speed and keyBindings. Component will listen to key events and move the entity appropriately.
     * Can be called while a key is pressed to change direction & speed on the fly.
     *
     * Multiway acts by adding a velocity on key press and removing the same velocity when the respective key is released.
     * This works well in most cases, but can cause undesired behavior if you manipulate velocities by yourself while this component is in effect.
     * If you need to resolve collisions, it's advised to correct the position directly rather than to manipulate the velocity. If you still need to reset the velocity once a collision happens, make sure to re-add the previous velocity once the collision is resolved.
     *
     * @example
     * ~~~
     * this.multiway(150, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
     * this.multiway({x:150,y:75}, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
     * this.multiway({W: -90, S: 90, D: 0, A: 180});
     * ~~~
     *
     * @see Motion, Keyboard
     */
    multiway: function (speed, keys) {
        if (keys) {
            if (speed.x !== undefined && speed.y !== undefined) {
                this._speed.x = speed.x;
                this._speed.y = speed.y;
            } else {
                this._speed.x = speed;
                this._speed.y = speed;
            }
        } else {
            keys = speed;
        }


        if (!this.disableControls) {
            this.__unapplyActiveDirections();
        }

        this._updateKeys(keys);
        this._updateSpeed(this._speed);

        if (!this.disableControls) {
            this.__applyActiveDirections();
        }

        return this;
    },

    /**@
     * #.speed
     * @comp Multiway
     * @sign public this .speed(Object speed)
     * @param speed - New speed the entity has, for x and y axis.
     *
     * Change the speed that the entity moves with, in units of pixels per second.
     *
     * Can be called while a key is pressed to change speed on the fly.
     *
     * @example
     * ~~~
     * this.speed({ x: 150, y: 50 });
     * ~~~
     */
    speed: function (speed) {
        if (!this.disableControls) {
            this.__unapplyActiveDirections();
        }

        this._updateSpeed(speed);

        if (!this.disableControls) {
            this.__applyActiveDirections();
        }

        return this;
    },

    _updateKeys: function(keys) {
        // reset data
        this._keyDirection = {};
        this._activeDirections = {};

        for (var k in keys) {
            var keyCode = Crafty.keys[k] || k;
            // add new data
            var direction = this._keyDirection[keyCode] = keys[k];
            this._activeDirections[direction] = this._activeDirections[direction] || 0;
            if (this.isDown(keyCode)) // add directions of already pressed keys
                this._activeDirections[direction]++;
        }
    },

    _updateSpeed: function(speed) {
        // reset data
        this._directionSpeed = {};

        var direction;
        for (var keyCode in this._keyDirection) {
            direction = this._keyDirection[keyCode];
            // add new data
            this._directionSpeed[direction] = {
                x: Math.round(Math.cos(direction * (Math.PI / 180)) * 1000 * speed.x) / 1000,
                y: Math.round(Math.sin(direction * (Math.PI / 180)) * 1000 * speed.y) / 1000
            };
        }
    },

    __applyActiveDirections: function() {
        for (var direction in this._activeDirections) {
            if (this._activeDirections[direction] > 0) {
                this.vx += this._directionSpeed[direction].x;
                this.vy += this._directionSpeed[direction].y;
            }
        }
    },

    __unapplyActiveDirections: function() {
        for (var direction in this._activeDirections) {
            if (this._activeDirections[direction] > 0) {
                this.vx -= this._directionSpeed[direction].x;
                this.vy -= this._directionSpeed[direction].y;
            }
        }
    },

    /**@
     * #.enableControl
     * @comp Multiway
     * @sign public this .enableControl()
     *
     * Enable the component to listen to key events.
     *
     * @example
     * ~~~
     * this.enableControl();
     * ~~~
     */
    enableControl: function () {
        if (this.disableControls) {
            this.__applyActiveDirections();
        }
        this.disableControls = false;

        return this;
    },

    /**@
     * #.disableControl
     * @comp Multiway
     * @sign public this .disableControl()
     *
     * Disable the component to listen to key events.
     *
     * @example
     * ~~~
     * this.disableControl();
     * ~~~
     */
    disableControl: function () {
        if (!this.disableControls) {
            this.__unapplyActiveDirections();
        }
        this.disableControls = true;

        return this;
    }
});


/**@
 * #Jumper
 * @category Controls
 * @trigger NewDirection - When entity has changed direction due to velocity on either x or y axis a NewDirection event is triggered. The event is triggered once, if direction is different from last frame. - { x: -1 | 0 | 1, y: -1 | 0 | 1 } - New direction
 * @trigger Moved - When entity has moved due to velocity/acceleration on either x or y axis a Moved event is triggered. If the entity has moved on both axes for diagonal movement the event is triggered twice. - { axis: 'x' | 'y', oldValue: Number } - Old position
 * @trigger CheckJumping - When entity is about to jump. This event is triggered with the object the entity is about to jump from (if it exists). Third parties can respond to this event and enable the entity to jump.
 *
 * Make an entity jump in response to key events.
 *
 * @see Supportable, Motion, Keyboard, Gravity
 */
Crafty.c("Jumper", {
    _jumpSpeed: 300,

    /**@
     * #.canJump
     * @comp Jumper
     *
     * The canJump function determines if the entity is allowed to jump or not (e.g. perhaps the entity should be able to double jump).
     * The Jumper component will trigger a "CheckJumping" event.
     * Interested parties can listen to this event and enable the entity to jump by setting `canJump` to true.
     *
     * @example
     * ~~~
     * var player = Crafty.e("2D, Jumper");
     * player.hasDoubleJumpPowerUp = true; // allow player to double jump by granting him a powerup
     * player.bind("CheckJumping", function(ground) {
     *     if (!ground && player.hasDoubleJumpPowerUp) { // allow player to double jump by using up his double jump powerup
     *         player.canJump = true;
     *         player.hasDoubleJumpPowerUp = false;
     *     }
     * });
     * player.bind("LandedOnGround", function(ground) {
     *     player.hasDoubleJumpPowerUp = true; // give player new double jump powerup upon landing
     * });
     * ~~~
     */
    canJump: true,

    /**@
     * #.enableControl
     * @comp Jumper
     * @sign public this .enableControl()
     *
     * Enable the component to listen to key events.
     *
     * @example
     * ~~~
     * this.enableControl();
     * ~~~
     */

    /**@
     * #.disableControl
     * @comp Jumper
     * @sign public this .disableControl()
     *
     * Disable the component to listen to key events.
     *
     * @example
     * ~~~
     * this.disableControl();
     * ~~~
     */

    init: function () {
        this.requires("Supportable, Motion, Keyboard");
        // don't overwrite methods from Multiway if they exist
        this.enableControl = this.enableControl || function() { this.disableControls = false; };
        this.disableControl = this.disableControl || function() { this.disableControls = true; };
    },

    remove: function() {
        this.unbind("KeyDown", this._keydown_jumper);
    },

    _keydown_jumper: function (e) {
        if (this.disableControls) return;

        if (this._jumpKeys[e.key]) {
            var ground = this.ground;
            this.canJump = !!ground;
            this.trigger("CheckJumping", ground);
            if (this.canJump) {
                this.vy = -this._jumpSpeed;
            }
        }
    },

    /**@
     * #.jumper
     * @comp Jumper
     * @sign public this .jumper([Number jumpSpeed,] Array jumpKeys)
     * @param jumpSpeed - Vertical jump speed in pixels per second
     * @param jumpKeys - Keys to listen for and make entity jump in response
     *
     * Constructor to initialize the power of jump and keys to listen to. Component will
     * listen for key events and move the entity appropriately. Used with the
     * `gravity` component will simulate jumping.
     *
     * @example
     * ~~~
     * this.jumper(300, ['UP_ARROW', 'W']);
     * this.jumper(['UP_ARROW', 'W']);
     * ~~~
     *
     * @see Supportable, Motion, Keyboard, Gravity
     */
    jumper: function (jumpSpeed, jumpKeys) {
        if (jumpKeys) {
            this._jumpSpeed = jumpSpeed;
        } else {
            jumpKeys = jumpSpeed;
        }

        this._jumpKeys = {};
        for (var i = 0; i < jumpKeys.length; ++i) {
            var key = jumpKeys[i];
            var keyCode = Crafty.keys[key] || key;
            this._jumpKeys[keyCode] = true;
        }

        this.uniqueBind("KeyDown", this._keydown_jumper);

        return this;
    },

    /**@
     * #.jumpSpeed
     * @comp Jumper
     * @sign public this .jumpSpeed(Number jumpSpeed)
     * @param jumpSpeed - new vertical jump speed
     *
     * Change the vertical jump speed.
     *
     * @example
     * ~~~
     * this.jumpSpeed(300);
     * ~~~
     */
    jumpSpeed: function (jumpSpeed) {
        this._jumpSpeed = jumpSpeed;
        return this;
    }
});

/**@
 * #Fourway
 * @category Controls
 * @trigger NewDirection - When entity has changed direction due to velocity on either x or y axis a NewDirection event is triggered. The event is triggered once, if direction is different from last frame. - { x: -1 | 0 | 1, y: -1 | 0 | 1 } - New direction
 * @trigger Moved - When entity has moved due to velocity/acceleration on either x or y axis a Moved event is triggered. If the entity has moved on both axes for diagonal movement the event is triggered twice. - { axis: 'x' | 'y', oldValue: Number } - Old position
 *
 * Move an entity in four directions by using the
 * arrow keys or `W`, `A`, `S`, `D`.
 *
 * @see Multiway
 */
Crafty.c("Fourway", {

    init: function () {
        this.requires("Multiway");
    },

    /**@
     * #.fourway
     * @comp Fourway
     * @sign public this .fourway([Number speed])
     * @param speed - The speed of motion in pixels per second.
     *
     * Constructor to initialize the speed. Component will listen for key events and move the entity appropriately.
     * This includes `Up Arrow`, `Right Arrow`, `Down Arrow`, `Left Arrow` as well as `W`, `A`, `S`, `D`.
     *
     * The key presses will move the entity in that direction by the speed passed in the argument.
     *
     * @see Multiway
     */
    fourway: function (speed) {
        this.multiway(speed || this._speed, {
            UP_ARROW: -90,
            DOWN_ARROW: 90,
            RIGHT_ARROW: 0,
            LEFT_ARROW: 180,
            W: -90,
            S: 90,
            D: 0,
            A: 180,
            Z: -90,
            Q: 180
        });

        return this;
    }
});

/**@
 * #Twoway
 * @category Controls
 * @trigger NewDirection - When entity has changed direction due to velocity on either x or y axis a NewDirection event is triggered. The event is triggered once, if direction is different from last frame. - { x: -1 | 0 | 1, y: -1 | 0 | 1 } - New direction
 * @trigger Moved - When entity has moved due to velocity/acceleration on either x or y axis a Moved event is triggered. If the entity has moved on both axes for diagonal movement the event is triggered twice. - { axis: 'x' | 'y', oldValue: Number } - Old position
 * @trigger CheckJumping - When entity is about to jump. This event is triggered with the object the entity is about to jump from (if it exists). Third parties can respond to this event and enable the entity to jump.
 *
 * Move an entity left or right using the arrow keys or `D` and `A` and jump using up arrow or `W`.
 *
 * @see Multiway, Jumper
 */
Crafty.c("Twoway", {

    init: function () {
        this.requires("Multiway, Jumper");
    },

    /**@
     * #.twoway
     * @comp Twoway
     * @sign public this .twoway([Number speed[, Number jumpSpeed]])
     * @param speed - A speed in pixels per second
     * @param jumpSpeed - Vertical jump speed in pixels per second
     *
     * Constructor to initialize the speed and power of jump. Component will
     * listen for key events and move the entity appropriately. This includes
     * `Up Arrow`, `Right Arrow`, `Left Arrow` as well as `W`, `A`, `D`. Used with the
     * `gravity` component to simulate jumping.
     *
     * The key presses will move the entity in that direction by the speed passed in
     * the argument. Pressing the `Up Arrow` or `W` will cause the entity to jump.
     *
     * @see Multiway, Jumper
     */
    twoway: function (speed, jumpSpeed) {

        this.multiway(speed || this._speed, {
            RIGHT_ARROW: 0,
            LEFT_ARROW: 180,
            D: 0,
            A: 180,
            Q: 180
        });

        this.jumper(jumpSpeed || speed * 2 || this._jumpSpeed, [
            Crafty.keys.UP_ARROW,
            Crafty.keys.W,
            Crafty.keys.Z
        ]);

        return this;
    }
});

},{"../core/core.js":7}],3:[function(require,module,exports){
var Crafty = require('../core/core.js');


Crafty.extend({
    /**@
     * #Crafty.device
     * @category Misc
     *
     * Methods relating to devices such as tablets or phones
     */
    device: {
        _deviceOrientationCallback: false,
        _deviceMotionCallback: false,

        /**
         * The HTML5 DeviceOrientation event returns three pieces of data:
         *  * alpha the direction the device is facing according to the compass
         *  * beta the angle in degrees the device is tilted front-to-back
         *  * gamma the angle in degrees the device is tilted left-to-right.
         *  * The angles values increase as you tilt the device to the right or towards you.
         *
         * Since Firefox uses the MozOrientationEvent which returns similar data but
         * using different parameters and a different measurement system, we want to
         * normalize that before we pass it to our _deviceOrientationCallback function.
         *
         * @param eventData HTML5 DeviceOrientation event
         */
        _normalizeDeviceOrientation: function (eventData) {
            var data;
            if (window.DeviceOrientationEvent) {
                data = {
                    // gamma is the left-to-right tilt in degrees, where right is positive
                    'tiltLR': eventData.gamma,
                    // beta is the front-to-back tilt in degrees, where front is positive
                    'tiltFB': eventData.beta,
                    // alpha is the compass direction the device is facing in degrees
                    'dir': eventData.alpha,
                    // deviceorientation does not provide this data
                    'motUD': null
                };
            } else if (window.OrientationEvent) {
                data = {
                    // x is the left-to-right tilt from -1 to +1, so we need to convert to degrees
                    'tiltLR': eventData.x * 90,
                    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
                    // We also need to invert the value so tilting the device towards us (forward)
                    // results in a positive value.
                    'tiltFB': eventData.y * -90,
                    // MozOrientation does not provide this data
                    'dir': null,
                    // z is the vertical acceleration of the device
                    'motUD': eventData.z
                };
            }

            Crafty.device._deviceOrientationCallback(data);
        },

        /**
         * @param eventData HTML5 DeviceMotion event
         */
        _normalizeDeviceMotion: function (eventData) {
            var acceleration = eventData.accelerationIncludingGravity,
                facingUp = (acceleration.z > 0) ? +1 : -1;

            var data = {
                // Grab the acceleration including gravity from the results
                'acceleration': acceleration,
                'rawAcceleration': "[" + Math.round(acceleration.x) + ", " + Math.round(acceleration.y) + ", " + Math.round(acceleration.z) + "]",
                // Z is the acceleration in the Z axis, and if the device is facing up or down
                'facingUp': facingUp,
                // Convert the value from acceleration to degrees acceleration.x|y is the
                // acceleration according to gravity, we'll assume we're on Earth and divide
                // by 9.81 (earth gravity) to get a percentage value, and then multiply that
                // by 90 to convert to degrees.
                'tiltLR': Math.round(((acceleration.x) / 9.81) * -90),
                'tiltFB': Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp)
            };

            Crafty.device._deviceMotionCallback(data);
        },

        /**@
         * #Crafty.device.deviceOrientation
         * @comp Crafty.device
         * @sign public Crafty.device.deviceOrientation(Function callback)
         * @param callback - Callback method executed once as soon as device orientation is change
         *
         * Do something with normalized device orientation data:
         * ~~~
         * {
         *   tiltLR    :   'gamma -- the angle in degrees the device is tilted left-to-right.',
         *   tiltFB    :   'beta -- the angle in degrees the device is tilted front-to-back',
         *   dir       :   'alpha -- the direction the device is facing according to the compass',
         *   motUD     :   'The angle's values increase as you tilt the device to the right or towards you.'
         * }
         * ~~~
         *
         * @example
         * ~~~
         * // Get DeviceOrientation event normalized data.
         * Crafty.device.deviceOrientation(function(data){
         *     Crafty.log('data.tiltLR : '+Math.round(data.tiltLR)+', data.tiltFB : '+Math.round(data.tiltFB)+', data.dir : '+Math.round(data.dir)+', data.motUD : '+data.motUD+'');
         * });
         * ~~~
         *
         * See browser support at http://caniuse.com/#search=device orientation.
         */
        deviceOrientation: function (func) {
            this._deviceOrientationCallback = func;
            if (Crafty.support.deviceorientation) {
                if (window.DeviceOrientationEvent) {
                    // Listen for the deviceorientation event and handle DeviceOrientationEvent object
                    Crafty.addEvent(this, window, 'deviceorientation', this._normalizeDeviceOrientation);
                } else if (window.OrientationEvent) {
                    // Listen for the MozOrientation event and handle OrientationData object
                    Crafty.addEvent(this, window, 'MozOrientation', this._normalizeDeviceOrientation);
                }
            }
        },

        /**@
         * #Crafty.device.deviceMotion
         * @comp Crafty.device
         * @sign public Crafty.device.deviceMotion(Function callback)
         * @param callback - Callback method executed once as soon as device motion is change
         *
         * Do something with normalized device motion data:
         * ~~~
         * {
         *     acceleration : 'Grab the acceleration including gravity from the results',
         *     rawAcceleration : 'Display the raw acceleration data',
         *     facingUp : 'Z is the acceleration in the Z axis, and if the device is facing up or down',
         *     tiltLR : 'Convert the value from acceleration to degrees. acceleration.x is the acceleration according to gravity, we'll assume we're on Earth and divide by 9.81 (earth gravity) to get a percentage value, and then multiply that by 90 to convert to degrees.',
         *     tiltFB : 'Convert the value from acceleration to degrees.'
         * }
         * ~~~
         *
         * @example
         * ~~~
         * // Get DeviceMotion event normalized data.
         * Crafty.device.deviceMotion(function(data){
         *     Crafty.log('data.moAccel : '+data.rawAcceleration+', data.moCalcTiltLR : '+Math.round(data.tiltLR)+', data.moCalcTiltFB : '+Math.round(data.tiltFB)+'');
         * });
         * ~~~
         *
         * See browser support at http://caniuse.com/#search=motion.
         */
        deviceMotion: function (func) {
            this._deviceMotionCallback = func;
            if (Crafty.support.devicemotion) {
                if (window.DeviceMotionEvent) {
                    // Listen for the devicemotion event and handle DeviceMotionEvent object
                    Crafty.addEvent(this, window, 'devicemotion', this._normalizeDeviceMotion);
                }
            }
        }
    }
});

},{"../core/core.js":7}],4:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

Crafty.extend({
    over: null, //object mouseover, waiting for out
    mouseObjs: 0,
    mousePos: {},
    lastEvent: null,
    touchObjs: 0,
    selected: false,

    /**@
     * #Crafty.keydown
     * @category Input
     * Check which keys (referred by Unicode values) are currently down.
     *
     * @example
     * ~~~
     * Crafty.c("Keyboard", {
     *   isDown: function (key) {
     *     if (typeof key === "string") {
     *       key = Crafty.keys[key];
     *     }
     *     return !!Crafty.keydown[key];
     *   }
     * });
     * ~~~
     * @see Keyboard, Crafty.keys
     */
     keydown: {},

    detectBlur: function (e) {
        var selected = ((e.clientX > Crafty.stage.x && e.clientX < Crafty.stage.x + Crafty.viewport.width) &&
            (e.clientY > Crafty.stage.y && e.clientY < Crafty.stage.y + Crafty.viewport.height));

        if (!Crafty.selected && selected) {
            Crafty.trigger("CraftyFocus");
        }
        
        if (Crafty.selected && !selected) {
            Crafty.trigger("CraftyBlur");
        }
        
        Crafty.selected = selected;
    },

    /**@
     * #Crafty.multitouch
     * @category Input
     * @sign public this .multitouch(Boolean bool)
     * @param bool - Turns multitouch on and off.  The initial state is off (false).
     *
     * @sign public Boolean .multitouch()
     * @returns Whether multitouch is currently enabled;
     *
     * Enables/disables support for multitouch feature.
     * 
     * If this is set to true, it is expected that your entities have the Touch component instead of Mouse component.
     * If false (default), then only entities with the Mouse component will respond to touch.
     *
     * If no boolean is passed to the function call, it will just return whether multitouch is on or not.
     * 
     * @note The Touch component (and thus the multitouch feature) is currently incompatible with the Draggable component.
     * 
     * @example
     * ~~~
     * Crafty.multitouch(true);
     * 
     * var myEntity1 = Crafty.e('2D, Canvas, Color, Touch')
     *    .attr({x: 100, y: 100, w:200, h:200, z:1 })
     *    .color('black')
     *    .bind('TouchStart',function(e){ alert('big black box was touched', e); }),
     *  myEntity2 = Crafty.e('2D, Canvas, Color, Touch')
     *    .attr({x: 40, y: 150, w:90, h:300, z:2 })
     *    .color('green')
     *    .bind('TouchStart',function(e){ alert('big GREEN box was touched', e); });
     * 
     * Crafty.log("multitouch is "+Crafty.multitouch());
     * ~~~
     * @see Crafty.touchDispatch
     */
    multitouch: function (bool) {
        if (typeof bool !== "boolean") return this._touchHandler.multitouch;
        this._touchHandler.multitouch = bool;
    },
    
    resetKeyDown: function() {
        // Tell all the keys they're no longer held down
        for (var k in Crafty.keys) {
             if (Crafty.keydown[Crafty.keys[k]]) {
                 this.trigger("KeyUp", {
                     key: Crafty.keys[k]
                 });
             }
        }
		
        Crafty.keydown = {};
    },
    
    /**@
     * #Crafty.mouseDispatch
     * @category Input
     *
     * Internal method which dispatches mouse events received by Crafty (crafty.stage.elem).
     * The mouse events get dispatched to the closest entity to the source of the event (if available).
     *
     * You can read more about the MouseEvent, which is the parameter passed to the callback.
     * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
     *
     * This method also sets a global property Crafty.lastEvent, which holds the most recent event that
     * occured (useful for determining mouse position in every frame).
     * 
     * ~~~
     * @example
     * ~~~
     * var newestX = Crafty.lastEvent.realX,
     *     newestY = Crafty.lastEvent.realY;
     * ~~~
     * 
     * Notable properties of a MouseEvent e:
     * ~~~
     * //(x,y) coordinates of mouse event in web browser screen space
     * e.clientX, e.clientY
     * //(x,y) coordinates of mouse event in world/viewport space
     * e.realX, e.realY
     * // Normalized mouse button according to Crafty.mouseButtons
     * e.mouseButton
     * ~~~
     * @see Crafty.touchDispatch
     * @see Crafty.multitouch
     */
    mouseDispatch: function (e) {
        if (!Crafty.mouseObjs) return;
        Crafty.lastEvent = e;

        var maxz = -1,
            tar = e.target ? e.target : e.srcElement,
            closest,
            q,
            i = 0,
            l,
            pos = Crafty.domHelper.translate(e.clientX, e.clientY),
            x, y,
            dupes = {},
            type = e.type;     

        //Normalize button according to http://unixpapa.com/js/mouse.html
        if (typeof e.which === 'undefined') {
            e.mouseButton = (e.button < 2) ? Crafty.mouseButtons.LEFT : ((e.button == 4) ? Crafty.mouseButtons.MIDDLE : Crafty.mouseButtons.RIGHT);
        } else {
            e.mouseButton = (e.which < 2) ? Crafty.mouseButtons.LEFT : ((e.which == 2) ? Crafty.mouseButtons.MIDDLE : Crafty.mouseButtons.RIGHT);
        }

        e.realX = x = Crafty.mousePos.x = pos.x;
        e.realY = y = Crafty.mousePos.y = pos.y;

        closest = Crafty.findClosestEntityByComponent("Mouse", x, y, tar);

        //found closest object to mouse
        if (closest) {
            //click must mousedown and out on tile
            if (type === "mousedown") {
                closest.trigger("MouseDown", e);
            } else if (type === "mouseup") {
                closest.trigger("MouseUp", e);
            } else if (type == "dblclick") {
                closest.trigger("DoubleClick", e);
            } else if (type == "click") {
                closest.trigger("Click", e);
            } else if (type === "mousemove") {
                closest.trigger("MouseMove", e);
                if (this.over !== closest) { //if new mousemove, it is over
                    if (this.over) {
                        this.over.trigger("MouseOut", e); //if over wasn't null, send mouseout
                        this.over = null;
                    }
                    this.over = closest;
                    closest.trigger("MouseOver", e);
                }
            } else closest.trigger(type, e); //trigger whatever it is
        } else {
            if (type === "mousemove" && this.over) {
                this.over.trigger("MouseOut", e);
                this.over = null;
            }
            if (type === "mousedown") {
                Crafty.viewport.mouselook('start', e);
            } else if (type === "mousemove") {
                Crafty.viewport.mouselook('drag', e);
            } else if (type == "mouseup") {
                Crafty.viewport.mouselook('stop');
            }
        }

        if (type === "mousemove") {
            this.lastEvent = e;
        }

    },


    /**@
     * #Crafty.touchDispatch
     * @category Input
     *
     * Internal method which dispatches touch events received by Crafty (crafty.stage.elem).
     * The touch events get dispatched to the closest entity to the source of the event (if available).
     * 
     * By default, touch events are treated as mouse events. To change this behaviour (and enable multitouch)
     * you must use Crafty.multitouch.
     * 
     * If using multitouch feature, this method sets the array Crafty.touchHandler.fingers, which holds data 
     * of the most recent touches that occured (useful for determining positions of fingers in every frame) 
     * as well as last entity touched by each finger. Data is lost as soon as the finger is raised.
     * 
     * You can read about the MouseEvent, which is the parameter passed to the Mouse entity's callback.
     * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
     *
     * You can also read about the TouchEvent.
     * https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
     * 
     * And about the touch point interface, which is the parameter passed to the Touch entity's callback.
     * http://www.w3.org/TR/touch-events/#dfn-active-touch-point
     * 
     * @see Crafty.multitouch
     * @see Crafty.mouseDispatch
     */
    touchDispatch: function (e) {
        if (!Crafty.touchObjs && !Crafty.mouseObjs) return;
        
        if (this._touchHandler.multitouch)
            switch (e.type) {
                case "touchstart":
                    this._touchHandler.handleStart(e);
                    break;
                case "touchmove":
                    this._touchHandler.handleMove(e);
                    break;
                case "touchleave": // touchleave is treated as touchend
                case "touchcancel": // touchcancel is treated as touchend, but triggers a TouchCancel event
                case "touchend":
                    this._touchHandler.handleEnd(e);
                    break;
            }
        else
            this._touchHandler.mimicMouse(e);

        //Don't prevent default actions if target node is input or textarea.
        if (e.target && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA')
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
    },
    
    _touchHandler: {
        fingers: [], // keeps track of touching fingers
        multitouch: false,
        
        handleStart: function (e) {
            var touches = e.changedTouches;
            for (var i = 0, l = touches.length; i < l; i++) {
                var idx = false,
                  pos = Crafty.domHelper.translate(touches[i].clientX, touches[i].clientY),
                  tar = e.target ? e.target : e.srcElement,
                  x, y, closest;
                touches[i].realX = x = pos.x;
                touches[i].realY = y = pos.y;
                closest = this.findClosestTouchEntity(x, y, tar);
                
                if (closest) {
                    closest.trigger("TouchStart", touches[i]);
                    // In case the entity was already being pressed, get the finger index
                    idx = this.fingerDownIndexByEntity(closest);
                }
                var touch = this.setTouch(touches[i], closest);
                if (idx !== false && idx >= 0) {
                    // Recycling finger...
                    this.fingers[idx] = touch;
                } else {
                    this.fingers.push(touch);
                }
            }
        },
            
        handleMove: function (e) {
            var touches = e.changedTouches;
            for (var i = 0, l = touches.length; i < l; i++) {
                var idx = this.fingerDownIndexById(touches[i].identifier),
                  pos = Crafty.domHelper.translate(touches[i].clientX, touches[i].clientY),
                  tar = e.target ? e.target : e.srcElement,
                  x, y, closest;
                touches[i].realX = x = pos.x;
                touches[i].realY = y = pos.y;
                closest = this.findClosestTouchEntity(x, y, tar);
            
                if (idx >= 0) {
                    if(typeof this.fingers[idx].entity !== "undefined")
                        if (this.fingers[idx].entity == closest) {
                            this.fingers[idx].entity.trigger("TouchMove", touches[i]);
                        } else {
                            if (typeof closest === "object") closest.trigger("TouchStart", touches[i]);
                            this.fingers[idx].entity.trigger("TouchEnd");
                        }
                    this.fingers[idx].entity = closest;
                    this.fingers[idx].realX = x;
                    this.fingers[idx].realY = y;
                }
            }
        },
        
        handleEnd: function (e) {
            var touches = e.changedTouches, 
                eventName = e.type == "touchcancel" ? "TouchCancel" : "TouchEnd";
            for (var i = 0, l = touches.length; i < l; i++) {
                var idx = this.fingerDownIndexById(touches[i].identifier);
            
                if (idx >= 0) {
                        if (this.fingers[idx].entity)
                            this.fingers[idx].entity.trigger(eventName);
                        this.fingers.splice(idx, 1);
                }
            }
        },
            
        setTouch: function (touch, entity) {
            return { identifier: touch.identifier, realX: touch.realX, realY: touch.realY, entity: entity };
        },
            
        findClosestTouchEntity: function (x, y, tar) {
            return Crafty.findClosestEntityByComponent("Touch", x, y, tar);
        },
           
        fingerDownIndexById: function(idToFind) {
            for (var i = 0, l = this.fingers.length; i < l; i++) {
                var id = this.fingers[i].identifier;
                
                   if (id == idToFind) {
                       return i;
                   }
                }
            return -1;
        },
            
        fingerDownIndexByEntity: function(entityToFind) {
            for (var i = 0, l = this.fingers.length; i < l; i++) {
                var ent = this.fingers[i].entity;
                
                if (ent == entityToFind) {
                    return i;
                }
            }
            return -1;
        },

        mimicMouse: function (e) {
            var type,
                lastEvent = Crafty.lastEvent;
            if (e.type === "touchstart") type = "mousedown";
            else if (e.type === "touchmove") type = "mousemove";
            else if (e.type === "touchend") type = "mouseup";
            else if (e.type === "touchcancel") type = "mouseup";
            else if (e.type === "touchleave") type = "mouseup";
            if (e.touches && e.touches.length) {
                first = e.touches[0];
            } else if (e.changedTouches && e.changedTouches.length) {
                first = e.changedTouches[0];
            }
            var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1,
              first.screenX,
              first.screenY,
              first.clientX,
              first.clientY,
              false, false, false, false, 0, e.relatedTarget
            );
            first.target.dispatchEvent(simulatedEvent);
            // trigger click when it should be triggered
            if (lastEvent !== null && lastEvent.type == 'mousedown' && type == 'mouseup') {
                type = 'click';
                simulatedEvent = document.createEvent("MouseEvent");
                simulatedEvent.initMouseEvent(type, true, true, window, 1,
                  first.screenX,
                  first.screenY,
                  first.clientX,
                  first.clientY,
                  false, false, false, false, 0, e.relatedTarget
                );
                first.target.dispatchEvent(simulatedEvent);
            }
        },
    },
    
    /**@
     * #Crafty.findClosestEntityByComponent
     * @category Input
     * 
     * @sign public this .findClosestEntityByComponent(String comp, Number x, Number y[, Object target])
     * Finds closest entity with certain component at given coordinates.
     * @param comp - Component name
     * @param x - `x` position where to look for entities
     * @param y - `y` position where to look for entities
     * @param target - Target element wherein to look for entities 
     * 
     * This method is used internally by the .mouseDispatch and .touchDispatch methods, but can be used otherwise for 
     * Canvas entities.
     * 
     * Finds the top most entity (with the highest z) with a given component at a given point (x, y).
     * For having a detection area specified for the enity, add the AreaMap component to the entity expected to be found.
     * 
     * The 'target' argument is only meant to be used by .mouseDispatch and touchDispatch; defaults to Crafty.stage.elem, 
     * thus using this function directly is only worth anything for canvas entities.
     * 
     * Returns the found entity, or undefined if no entity was found.
     * 
     * @example
     * ~~~
     * var coords = { x: 455, y: 267 },
     *     closestText = Crafty.findClosestEntityByComponent("Text", coords.x, coords.y);
     * ~~~
     */
    findClosestEntityByComponent: function (comp, x, y, target) { 
        var tar = target ? target : Crafty.stage.elem,
            closest, q, l, i = 0, maxz = -1, dupes = {};
            
        //if it's a DOM element with component we are done
        if (tar.nodeName != "CANVAS") {
            while (typeof (tar.id) != 'string' && tar.id.indexOf('ent') == -1) {
                tar = tar.parentNode;
            }
            var ent = Crafty(parseInt(tar.id.replace('ent', ''), 10));
            if (ent.__c[comp] && ent.isAt(x, y)){
                closest = ent;
            }
        }
            //else we search for an entity with component
        if (!closest) {
            q = Crafty.map.search({
                _x: x,
                _y: y,
                _w: 1,
                _h: 1
            }, false);

            for (l = q.length; i < l; ++i) {
                
                if (!q[i].__c[comp] || !q[i]._visible){ continue; }

                    var current = q[i],
                        flag = false;

                    //weed out duplicates
                    if (dupes[current[0]]){  continue; }
                    else dupes[current[0]] = true;

                    if (current.mapArea) {
                        if (current.mapArea.containsPoint(x, y)) {
                            flag = true;
                        }
                    } else if (current.isAt(x, y)) flag = true;

                    if (flag && (current._z >= maxz || maxz === -1)) {
                        //if the Z is the same, select the closest GUID
                        if (current._z === maxz && current[0] < closest[0]) {
                            continue; 
                    }
                    maxz = current._z;
                    closest = current;
                }
            }
        }
            
        return closest;
    },

    /**@
     * #Crafty.mouseWheelDispatch
     * @category Input
     * Mouse wheel event triggered by Crafty.
     *
     * @trigger MouseWheelScroll - is triggered when mouse is scrolled on stage - { direction: +1 | -1} - Scroll direction (up | down)
     *
     * Internal method which dispatches mouse wheel events received by Crafty (crafty.stage.elem).
     * The mouse wheel events get dispatched to Crafty, as well as all entities.
     *
     * The native event parameter is passed to the callback.
     * You can read more about the native `mousewheel` event (all browsers except Firefox) https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel
     * or the native `DOMMouseScroll` event (Firefox only) https://developer.mozilla.org/en-US/docs/Web/Events/DOMMouseScroll .
     *
     * Note that the wheel delta properties of the event vary in magnitude across browsers, thus it is recommended to check for `.direction` instead.
     * The `.direction` equals `+1` if wheel was scrolled up, `-1` if wheel was scrolled down.
     * See http://stackoverflow.com/questions/5527601/normalizing-mousewheel-speed-across-browsers .
     *
     * @example
     * ~~~
     * Crafty.bind("MouseWheelScroll", function(evt) {
     *     Crafty.viewport.scale(Crafty.viewport._scale * (1 + evt.direction * 0.1));
     * });
     * ~~~
     */
     mouseWheelDispatch: function(e) {
        e.direction = (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;
        Crafty.trigger("MouseWheelScroll", e);
     },

    /**@
     * #KeyboardEvent
     * @category Input
     * Keyboard Event triggered by Crafty Core
     * @trigger KeyDown - is triggered for each entity when the DOM 'keydown' event is triggered.
     * @trigger KeyUp - is triggered for each entity when the DOM 'keyup' event is triggered.
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Color")
     *   .attr({x: 100, y: 100, w: 50, h: 50})
     *   .color("red")
     *   .bind('KeyDown', function(e) {
     *     if(e.key == Crafty.keys.LEFT_ARROW) {
     *       this.x = this.x-1;
     *     } else if (e.key == Crafty.keys.RIGHT_ARROW) {
     *       this.x = this.x+1;
     *     } else if (e.key == Crafty.keys.UP_ARROW) {
     *       this.y = this.y-1;
     *     } else if (e.key == Crafty.keys.DOWN_ARROW) {
     *       this.y = this.y+1;
     *     }
     *   });
     * ~~~
     *
     * @see Crafty.keys
     */

    /**@
     * #Crafty.eventObject
     * @category Input
     *
     * Event Object used in Crafty for cross browser compatibility
     */

    /**@
     * #.key
     * @comp Crafty.eventObject
     *
     * Unicode of the key pressed
     */
    keyboardDispatch: function (e) {
        // Use a Crafty-standard event object to avoid cross-browser issues
        var original = e,
            evnt = {},
            props = "char charCode keyCode type shiftKey ctrlKey metaKey timestamp".split(" ");
        for (var i = props.length; i;) {
            var prop = props[--i];
            evnt[prop] = original[prop];
        }
        evnt.which = original.charCode !== null ? original.charCode : original.keyCode;
        evnt.key = original.keyCode || original.which;
        evnt.originalEvent = original;
        e = evnt;

        if (e.type === "keydown") {
            if (Crafty.keydown[e.key] !== true) {
                Crafty.keydown[e.key] = true;
                Crafty.trigger("KeyDown", e);
            }
        } else if (e.type === "keyup") {
            delete Crafty.keydown[e.key];
            Crafty.trigger("KeyUp", e);
        }

        //prevent default actions for all keys except backspace and F1-F12 and except actions in INPUT and TEXTAREA.
        //prevent bubbling up for all keys except backspace and F1-F12.
        //Among others this prevent the arrow keys from scrolling the parent page
        //of an iframe hosting the game
        if (Crafty.selected && !(e.key == 8 || e.key >= 112 && e.key <= 135)) {
            if (original.stopPropagation) original.stopPropagation();
            else original.cancelBubble = true;

            //Don't prevent default actions if target node is input or textarea.
            if (original.target && original.target.nodeName !== 'INPUT' && original.target.nodeName !== 'TEXTAREA') {
                if (original.preventDefault) {
                    original.preventDefault();
                } else {
                    original.returnValue = false;
                }
            }
            return false;
        }
    }
});

//initialize the input events onload
Crafty._preBind("Load", function () {
    Crafty.addEvent(this, "keydown", Crafty.keyboardDispatch);
    Crafty.addEvent(this, "keyup", Crafty.keyboardDispatch);

    Crafty.addEvent(this, Crafty.stage.elem, "mousedown", Crafty.mouseDispatch);
    Crafty.addEvent(this, Crafty.stage.elem, "mouseup", Crafty.mouseDispatch);
    Crafty.addEvent(this, document.body, "mouseup", Crafty.detectBlur);
    Crafty.addEvent(this, window, "blur", Crafty.resetKeyDown);
    Crafty.addEvent(this, Crafty.stage.elem, "mousemove", Crafty.mouseDispatch);
    Crafty.addEvent(this, Crafty.stage.elem, "click", Crafty.mouseDispatch);
    Crafty.addEvent(this, Crafty.stage.elem, "dblclick", Crafty.mouseDispatch);

    Crafty.addEvent(this, Crafty.stage.elem, "touchstart", Crafty.touchDispatch);
    Crafty.addEvent(this, Crafty.stage.elem, "touchmove", Crafty.touchDispatch);
    Crafty.addEvent(this, Crafty.stage.elem, "touchend", Crafty.touchDispatch);
    Crafty.addEvent(this, Crafty.stage.elem, "touchcancel", Crafty.touchDispatch);
    Crafty.addEvent(this, Crafty.stage.elem, "touchleave", Crafty.touchDispatch);

    if (Crafty.support.prefix === "Moz") // mouse wheel event for firefox
        Crafty.addEvent(this, Crafty.stage.elem, "DOMMouseScroll", Crafty.mouseWheelDispatch);
    else // mouse wheel event for rest of browsers
        Crafty.addEvent(this, Crafty.stage.elem, "mousewheel", Crafty.mouseWheelDispatch);
});

Crafty._preBind("CraftyStop", function () {
    Crafty.removeEvent(this, "keydown", Crafty.keyboardDispatch);
    Crafty.removeEvent(this, "keyup", Crafty.keyboardDispatch);

    if (Crafty.stage) {
        Crafty.removeEvent(this, Crafty.stage.elem, "mousedown", Crafty.mouseDispatch);
        Crafty.removeEvent(this, Crafty.stage.elem, "mouseup", Crafty.mouseDispatch);
        Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", Crafty.mouseDispatch);
        Crafty.removeEvent(this, Crafty.stage.elem, "click", Crafty.mouseDispatch);
        Crafty.removeEvent(this, Crafty.stage.elem, "dblclick", Crafty.mouseDispatch);

        Crafty.removeEvent(this, Crafty.stage.elem, "touchstart", Crafty.touchDispatch);
        Crafty.removeEvent(this, Crafty.stage.elem, "touchmove", Crafty.touchDispatch);
        Crafty.removeEvent(this, Crafty.stage.elem, "touchend", Crafty.touchDispatch);
        Crafty.removeEvent(this, Crafty.stage.elem, "touchcancel", Crafty.touchDispatch);
        Crafty.removeEvent(this, Crafty.stage.elem, "touchleave", Crafty.touchDispatch);

        if (Crafty.support.prefix === "Moz") // mouse wheel event for firefox
            Crafty.removeEvent(this, Crafty.stage.elem, "DOMMouseScroll", Crafty.mouseWheelDispatch);
        else // mouse wheel event for rest of browsers
            Crafty.removeEvent(this, Crafty.stage.elem, "mousewheel", Crafty.mouseWheelDispatch);
    }

    Crafty.removeEvent(this, document.body, "mouseup", Crafty.detectBlur);
    Crafty.removeEvent(this, window, "blur", Crafty.resetKeyDown);
});

/**@
 * #Mouse
 * @category Input
 *
 * Provides the entity with mouse related events
 *
 * @trigger MouseOver - when the mouse enters - MouseEvent
 * @trigger MouseOut - when the mouse leaves - MouseEvent
 * @trigger MouseDown - when the mouse button is pressed on - MouseEvent
 * @trigger MouseUp - when the mouse button is released on - MouseEvent
 * @trigger Click - when the user clicks - MouseEvent
 * @trigger DoubleClick - when the user double clicks - MouseEvent
 * @trigger MouseMove - when the mouse is over and moves - MouseEvent
 *
 * If you do not add this component, mouse events will not be triggered on an entity.
 *
 * You can read more about the MouseEvent, which is the parameter passed to the callback.
 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
 *
 * Crafty will add the mouseButton property to MouseEvents that match one of
 *
 * - Crafty.mouseButtons.LEFT
 * - Crafty.mouseButtons.RIGHT
 * - Crafty.mouseButtons.MIDDLE
 *
 * @note If you're targeting mobile, you should know that by default Crafty turns touch events into mouse events, 
 * making mouse dependent components work with touch. However, if you need multitouch, you'll have 
 * to make use of the Touch component instead, which can break compatibility with things which directly interact with the Mouse component.
 *
 * @example
 * ~~~
 * var myEntity = Crafty.e('2D, Canvas, Color, Mouse')
 * .attr({x: 10, y: 10, w: 40, h: 40})
 * .color('red')
 * .bind('Click', function(MouseEvent){
 *   alert('clicked', MouseEvent);
 * });
 *
 * myEntity.bind('MouseUp', function(e) {
 *    if( e.mouseButton == Crafty.mouseButtons.RIGHT )
 *        Crafty.log("Clicked right button");
 * })
 * ~~~
 * @see Crafty.mouseDispatch
 * @see Crafty.multitouch
 * @see Crafty.touchDispatch
 * @see Crafty.mouseButtons
 */
Crafty.c("Mouse", {
    init: function () {
        Crafty.mouseObjs++;
        this.requires("AreaMap")
            .bind("Remove", function () {
                Crafty.mouseObjs--;
            });
    }
});

/**@
 * #Touch
 * @category Input
 * Provides the entity with touch related events
 * @trigger TouchStart - when entity is touched - TouchPoint
 * @trigger TouchMove - when finger is moved over entity - TouchPoint
 * @trigger TouchCancel - when a touch event has been disrupted in some way - TouchPoint
 * @trigger TouchEnd - when the finger is raised over the entity, or when finger leaves entity.  (Passes no data) - null
 *
 * To be able to use multitouch, you must enable it with  `Crafty.multitouch(true)`.
 *
 * If you don't need multitouch, you can probably use the Mouse component instead, since by default Crafty will trigger mouse events for touch input.
 *
 * You can read more about the TouchEvent.
 * - [TouchEvent.touches and TouchEvent.changedTouches](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
 * - [TouchPoint](http://www.w3.org/TR/touch-events/#dfn-active-touch-point) is the parameter passed to the event callback in the related touch.
 * 
 *
 * @example
 * ~~~
 * Crafty.multitouch(true);
 * 
 * var myEntity = Crafty.e('2D, Canvas, Color, Touch')
 * .attr({x: 10, y: 10, w: 40, h: 40})
 * .color('green')
 * .bind('TouchStart', function(TouchPoint){
 *   Crafty.log('myEntity has been touched', TouchPoint);
 * }).bind('TouchMove', function(TouchPoint) {
 *   Crafty.log('Finger moved over myEntity at the { x: ' + TouchPoint.realX + ', y: ' + TouchPoint.realY + ' } coordinates.');
 * }).bind('TouchEnd', function() {
 *   Crafty.log('Touch over myEntity has finished.');
 * });
 * ~~~
 * @see Crafty.multitouch
 * @see Crafty.touchDispatch
 * @see Crafty.mouseDispatch
 * @see Crafty.mouseButtons
 */
Crafty.c("Touch", {
    init: function () {
        Crafty.touchObjs++;
        this.requires("AreaMap")
            .bind("Remove", function () {
                Crafty.touchObjs--;
            });
    }
});

/**@
 * #AreaMap
 * @category Input
 * Component used by Mouse and Touch.
 * Can be added to other entities for use with the Crafty.findClosestEntityByComponent method.
 * 
 * @see Crafty.mouseDispatch
 * @see Crafty.touchDispatch
 * @see Crafty.mouseButtons
 * @see Crafty.polygon
 */
Crafty.c("AreaMap", {
    init: function () {
    },

    /**@
     * #.areaMap
     * @comp AreaMap
     *
     * @trigger NewAreaMap - when a new areaMap is assigned - Crafty.polygon
     *
     * @sign public this .areaMap(Crafty.polygon polygon)
     * @param polygon - Instance of Crafty.polygon used to check if the mouse coordinates are inside this region
     *
     * @sign public this .areaMap(Array coordinatePairs)
     * @param coordinatePairs - Array of `x`, `y` coordinate pairs to generate a polygon
     *
     * @sign public this .areaMap(x1, y1,.., xN, yN)
     * @param point# - List of `x`, `y` coordinate pairs to generate a polygon
     *
     * Assign a polygon to the entity so that pointer (mouse or touch) events will only be triggered if
     * the coordinates are inside the given polygon.
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Color, Mouse")
     *     .color("red")
     *     .attr({ w: 100, h: 100 })
     *     .bind('MouseOver', function() {Crafty.log("over")})
     *     .areaMap(0, 0, 50, 0, 50, 50, 0, 50);
     *
     * Crafty.e("2D, Mouse")
     *     .areaMap([0, 0, 50, 0, 50, 50, 0, 50]);
     *
     * Crafty.e("2D, Mouse").areaMap(
     *     new Crafty.polygon([0, 0, 50, 0, 50, 50, 0, 50])
     * );
     * ~~~
     *
     * @see Crafty.polygon
     */
    areaMap: function (poly) {
        //create polygon
        if (arguments.length > 1) {
            //convert args to array to create polygon
            var args = Array.prototype.slice.call(arguments, 0);
            poly = new Crafty.polygon(args);
        } else if (poly.constructor === Array) {
            poly = new Crafty.polygon(poly.slice());
        } else {
            poly = poly.clone();
        }

        poly.shift(this._x, this._y);
        this.mapArea = poly;
        this.attach(this.mapArea);
        this.trigger("NewAreaMap", poly);
        return this;
    }
});

/**@
 * #Button
 * @category Input
 * Provides the entity with touch or mouse functionality, depending on whether this is a pc 
 * or mobile device, and also on multitouch configuration.
 * 
 * @see Crafty.multitouch
 */
Crafty.c("Button", {
    init: function () {
        var req = (!Crafty.mobile || (Crafty.mobile && !Crafty.multitouch())) ? "Mouse" : "Touch";
        this.requires(req);
    }
});

/**@
 * #MouseDrag
 * @category Input
 * Provides the entity with drag and drop mouse events.
 * @trigger Dragging - is triggered each frame the entity is being dragged - MouseEvent
 * @trigger StartDrag - is triggered when dragging begins - MouseEvent
 * @trigger StopDrag - is triggered when dragging ends - MouseEvent
 *
 * @see Mouse
 */
Crafty.c("MouseDrag", {
    _dragging: false,

    //Note: the code is not tested with zoom, etc., that may distort the direction between the viewport and the coordinate on the canvas.
    init: function () {
        this.requires("Mouse");
        this.bind("MouseDown", this._ondown);
    },

    remove: function() {
        this.unbind("MouseDown", this._ondown);
    },

    // When dragging is enabled, this method is bound to the MouseDown crafty event
    _ondown: function (e) {
        if (e.mouseButton !== Crafty.mouseButtons.LEFT) return;
        this.startDrag(e);
    },

    // While a drag is occurring, this method is bound to the mousemove DOM event
    _ondrag: function (e) {
        // ignore invalid 0 position - strange problem on ipad
        if (!this._dragging || e.realX === 0 || e.realY === 0) return false;
        this.trigger("Dragging", e);
    },

    // While a drag is occurring, this method is bound to mouseup DOM event
    _onup: function (e) {
        if (e.mouseButton !== Crafty.mouseButtons.LEFT) return;
        this.stopDrag(e);
    },

    /**@
     * #.startDrag
     * @comp MouseDrag
     * @sign public this .startDrag(void)
     *
     * Make the entity produce drag events, essentially making the entity follow the mouse positions.
     *
     * @see .stopDrag
     */
    startDrag: function (e) {
        if (this._dragging) return;
        this._dragging = true;

        Crafty.addEvent(this, Crafty.stage.elem, "mousemove", this._ondrag);
        Crafty.addEvent(this, Crafty.stage.elem, "mouseup", this._onup);

        // if event undefined, use the last known position of the mouse
        this.trigger("StartDrag", e || Crafty.lastEvent);
        return this;
    },

    /**@
     * #.stopDrag
     * @comp MouseDrag
     * @sign public this .stopDrag(void)
     *
     * Stop the entity from producing drag events, essentially reproducing the drop.
     *
     * @see .startDrag
     */
    stopDrag: function (e) {
        if (!this._dragging) return;
        this._dragging = false;

        Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", this._ondrag);
        Crafty.removeEvent(this, Crafty.stage.elem, "mouseup", this._onup);

        // if event undefined, use the last known position of the mouse
        this.trigger("StopDrag", e || Crafty.lastEvent);
        return this;
    }
});

/**@
 * #Keyboard
 * @category Input
 *
 * Give entities keyboard events (`Keydown` and `Keyup`).
 *
 * In particular, changes to the key state are broadcasted by `KeyboardEvent`s; interested entities can bind to these events.
 *
 * The current state (pressed/released) of a key can also be queried using the `.isDown` method.
 *
 * All available key codes are described in `Crafty.keys`.
 *
 * @see KeyboardEvent
 * @see Crafty.keys
 */
Crafty.c("Keyboard", {
    /**@
     * #.isDown
     * @comp Keyboard
     * @sign public Boolean isDown(String keyName)
     * @param keyName - Name of the key to check. See `Crafty.keys`.
     * @sign public Boolean isDown(Number keyCode)
     * @param keyCode - Key code in `Crafty.keys`.
     *
     * Determine if a certain key is currently down.
     *
     * @example
     * ~~~
     * entity.requires('Keyboard').bind('KeyDown', function () { if (this.isDown('SPACE')) jump(); });
     * ~~~
     *
     * @see Crafty.keys
     */
    isDown: function (key) {
        if (typeof key === "string") {
            key = Crafty.keys[key];
        }
        return !!Crafty.keydown[key];
    }
});


},{"../core/core.js":7}],5:[function(require,module,exports){
var Crafty = require('../core/core.js');


Crafty.extend({
    /**@
     * #Crafty.keys
     * @category Input
     * Object of key names and the corresponding key code.
     *
     * ~~~
     * BACKSPACE: 8,
     * TAB: 9,
     * ENTER: 13,
     * PAUSE: 19,
     * CAPS: 20,
     * ESC: 27,
     * SPACE: 32,
     * PAGE_UP: 33,
     * PAGE_DOWN: 34,
     * END: 35,
     * HOME: 36,
     * LEFT_ARROW: 37,
     * UP_ARROW: 38,
     * RIGHT_ARROW: 39,
     * DOWN_ARROW: 40,
     * INSERT: 45,
     * DELETE: 46,
     * 0: 48,
     * 1: 49,
     * 2: 50,
     * 3: 51,
     * 4: 52,
     * 5: 53,
     * 6: 54,
     * 7: 55,
     * 8: 56,
     * 9: 57,
     * A: 65,
     * B: 66,
     * C: 67,
     * D: 68,
     * E: 69,
     * F: 70,
     * G: 71,
     * H: 72,
     * I: 73,
     * J: 74,
     * K: 75,
     * L: 76,
     * M: 77,
     * N: 78,
     * O: 79,
     * P: 80,
     * Q: 81,
     * R: 82,
     * S: 83,
     * T: 84,
     * U: 85,
     * V: 86,
     * W: 87,
     * X: 88,
     * Y: 89,
     * Z: 90,
     * NUMPAD_0: 96,
     * NUMPAD_1: 97,
     * NUMPAD_2: 98,
     * NUMPAD_3: 99,
     * NUMPAD_4: 100,
     * NUMPAD_5: 101,
     * NUMPAD_6: 102,
     * NUMPAD_7: 103,
     * NUMPAD_8: 104,
     * NUMPAD_9: 105,
     * MULTIPLY: 106,
     * ADD: 107,
     * SUBSTRACT: 109,
     * DECIMAL: 110,
     * DIVIDE: 111,
     * F1: 112,
     * F2: 113,
     * F3: 114,
     * F4: 115,
     * F5: 116,
     * F6: 117,
     * F7: 118,
     * F8: 119,
     * F9: 120,
     * F10: 121,
     * F11: 122,
     * F12: 123,
     * SHIFT: 16,
     * CTRL: 17,
     * ALT: 18,
     * PLUS: 187,
     * COMMA: 188,
     * MINUS: 189,
     * PERIOD: 190,
     * PULT_UP: 29460,
     * PULT_DOWN: 29461,
     * PULT_LEFT: 4,
     * PULT_RIGHT': 5
     * ~~~
     */
    keys: {
        'BACKSPACE': 8,
        'TAB': 9,
        'ENTER': 13,
        'PAUSE': 19,
        'CAPS': 20,
        'ESC': 27,
        'SPACE': 32,
        'PAGE_UP': 33,
        'PAGE_DOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT_ARROW': 37,
        'UP_ARROW': 38,
        'RIGHT_ARROW': 39,
        'DOWN_ARROW': 40,
        'INSERT': 45,
        'DELETE': 46,
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,
        'A': 65,
        'B': 66,
        'C': 67,
        'D': 68,
        'E': 69,
        'F': 70,
        'G': 71,
        'H': 72,
        'I': 73,
        'J': 74,
        'K': 75,
        'L': 76,
        'M': 77,
        'N': 78,
        'O': 79,
        'P': 80,
        'Q': 81,
        'R': 82,
        'S': 83,
        'T': 84,
        'U': 85,
        'V': 86,
        'W': 87,
        'X': 88,
        'Y': 89,
        'Z': 90,
        'NUMPAD_0': 96,
        'NUMPAD_1': 97,
        'NUMPAD_2': 98,
        'NUMPAD_3': 99,
        'NUMPAD_4': 100,
        'NUMPAD_5': 101,
        'NUMPAD_6': 102,
        'NUMPAD_7': 103,
        'NUMPAD_8': 104,
        'NUMPAD_9': 105,
        'MULTIPLY': 106,
        'ADD': 107,
        'SUBSTRACT': 109,
        'DECIMAL': 110,
        'DIVIDE': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'SHIFT': 16,
        'CTRL': 17,
        'ALT': 18,
        'PLUS': 187,
        'COMMA': 188,
        'MINUS': 189,
        'PERIOD': 190,
        'PULT_UP': 29460,
        'PULT_DOWN': 29461,
        'PULT_LEFT': 4,
        'PULT_RIGHT': 5

    },

    /**@
     * #Crafty.mouseButtons
     * @category Input
     * An object mapping mouseButton names to the corresponding button ID.
     * In all mouseEvents, we add the `e.mouseButton` property with a value normalized to match e.button of modern webkit browsers:
     *
     * ~~~
     * LEFT: 0,
     * MIDDLE: 1,
     * RIGHT: 2
     * ~~~
     */
    mouseButtons: {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    }
});
},{"../core/core.js":7}],6:[function(require,module,exports){
/**@
 * #Crafty.easing
 * @category Animation
 * 
 *
 * An object for tracking transitions.  Typically used indirectly through "SpriteAnimation", "Tween", or viewport animations.
 * 
 * If a method allows you to specify the type of easing, you can do so by providing a custom function or a string corresponding to the name of a built-in method.
 *
 * Built-in easing functions are "linear", "smoothStep", "smootherStep", "easeInQuad", "easeOutQuad", and "easeInOutQuad".
 *
 * A custom function will be passed a parameter `t` which will vary between 0 and 1, and should return the progress of the animation between 0 and 1.
 * @example
 * Here is how you might use easing functions with the "Tween" component.
 * ~~~~
 * var e = Crafty.e("2D, Tween");
 * // Use built-in easing functions
 * e.tween({x:100}, 1000, "smoothStep");
 * e.tween({y:100}, 1000, "easeInQuad");
 * // Define a custom easing function: 2t^2 - t
 * e.tween({w:0}, 1000, function(t){return 2*t*t - t;});
 * ~~~
 * @see Tween, SpriteAnimation
 */
var easing = function(duration, easingFn) {
	this.timePerFrame = 1000 / Crafty.timer.FPS();
	this.duration = duration;   //default duration given in ms
	if (typeof easingFn === "function"){
		this.easing_function = easingFn;
	} else if (typeof easingFn === "string" && this.standardEasingFunctions[easingFn]){
		this.easing_function = this.standardEasingFunctions[easingFn];
	} else {
		this.easing_function = this.standardEasingFunctions.linear;
	}
	this.reset();
};


easing.prototype = {
	duration: 0,
	clock:0,
	steps: null,
	complete: false,
	paused: false,

	// init values
	reset: function(){
		this.loops = 1;
		this.clock = 0;
		this.complete = false;
		this.paused = false;
	},

	repeat: function(loopCount){
		this.loops = loopCount;
	},

	setProgress: function(progress, loopCount){
		this.clock = this.duration * progress;
		if (typeof loopCount !== "undefined")
			this.loops = loopCount;

	},

	pause: function(){
		this.paused = true;
	},

	resume: function(){
		this.paused = false;
		this.complete = false;
	},

	// Increment the clock by some amount dt
	// Handles looping and sets a flag on completion
	tick: function(dt){
		if (this.paused || this.complete) return;
		this.clock += dt;
		this.frames = Math.floor(this.clock/this.timePerFrame);
		while (this.clock >= this.duration && this.complete === false){
			this.loops--;
			if (this.loops > 0)
				this.clock -= this.duration;
			else
				this.complete = true;
		}
	},

	// same as value for now; with other time value functions would be more useful
	time: function(){
		return ( Math.min(this.clock/this.duration, 1) );

	},

	// Value is where along the tweening curve we are
	value: function(){
		return this.easing_function(this.time());
	},

	// Easing functions, formulas taken from https://gist.github.com/gre/1650294
	//	and https://en.wikipedia.org/wiki/Smoothstep
	standardEasingFunctions: {
		// no easing, no acceleration
		linear: function (t) { return t; },
		// smooth step; starts and ends with v=0
		smoothStep: function(t){ return (3-2*t)*t*t; },
		// smootherstep; starts and ends with v, a=0
		smootherStep: function(t){ return (6*t*t-15*t+10)*t*t*t; },
		// quadratic curve; starts with v=0
		easeInQuad: function (t) { return t*t; },
		// quadratic curve; ends with v=0
		easeOutQuad: function (t) { return t*(2-t); },
		// quadratic curve; starts and ends with v=0
		easeInOutQuad: function (t) { return t<0.5 ? 2*t*t : (4-2*t)*t-1; }
	}
};

module.exports = easing;
},{}],7:[function(require,module,exports){
var version = require('./version');

/**@
 * #Crafty
 * @category Core
 *
 * `Crafty` is both an object, and a function for selecting entities.
 * Its many methods and properties are discussed individually.
 * Below is the documentation for use as a selector.
 *
 * @sign public EntitySelection Crafty( String selector)
 * @param selector - A string representing which entities to select
 *
 * @sign public Entity Crafty( Number selector )
 * @param selector - An entity's id
 *
 * Select a set of or single entities by components or an entity's ID.
 *
 * Crafty uses syntax similar to jQuery by having a selector engine to select entities by their components.
 *
 * If there is more than one match, the return value is an Array-like object listing the ID numbers of each matching entity. If there is exactly one match, the entity itself is returned. If you're not sure how many matches to expect, check the number of matches via Crafty(...).length. Alternatively, use Crafty(...).each(...), which works in all cases.
 *
 * @note You can treat an entity as if it was a selection of length 1 -- it implements all the same methods.
 *
 * @example
 * ~~~
 *    Crafty("MyComponent")
 *    Crafty("Hello 2D Component")
 *    Crafty("Hello, 2D, Component")
 * ~~~
 *
 * The first selector will return all entities that have the component `MyComponent`. The second will return all entities that have `Hello` and `2D` and `Component` whereas the last will return all entities that have at least one of those components (or).
 *
 * ~~~
 *   Crafty("*")
 * ~~~
 * Passing `*` will select all entities.
 *
 * ~~~
 *   Crafty(1)
 * ~~~
 * Passing an integer will select the entity with that `ID`.
 *
 * To work directly with an array of entities, use the `get()` method on a selection.
 * To call a function in the context of each entity, use the `.each()` method.
 *
 * The event related methods such as `bind` and `trigger` will work on selections of entities.
 *
 * @see Crafty Core#.get
 * @see Crafty Core#.each
 */

var Crafty = function (selector) {
    return new Crafty.fn.init(selector);
};
    // Internal variables
var GUID, frame, components, entities, handlers, onloads,
slice, rlist, rspace, milliSecPerFrame;


components  = {}; // Map of components and their functions
slice       = Array.prototype.slice;
rlist       = /\s*,\s*/;
rspace      = /\s+/;

var initState = function () {
    GUID        = 1; // GUID for entity IDs
    frame       = 0;

    entities    = {}; // Map of entities and their data
    handlers    = {}; // Global event handlers
    onloads     = []; // Temporary storage of onload handlers
};

initState();

/**@
 * #Crafty Core
 * @category Core
 * @trigger NewEntityName - After setting new name for entity - String - entity name
 * @trigger NewComponent - when a new component is added to the entity - String - Component
 * @trigger RemoveComponent - when a component is removed from the entity - String - Component
 * @trigger Remove - when the entity is removed by calling .destroy()
 *
 * A set of methods added to every single entity.
 */
Crafty.fn = Crafty.prototype = {

    init: function (selector) {
        //select entities by component
        if (typeof selector === "string") {
            var elem = 0, //index elements
                e, //entity forEach
                current,
                and = false, //flags for multiple
                or = false,
                del,
                comps,
                score,
                i, l;

            if (selector === '*') {
                i = 0;
                for (e in entities) {
                    // entities is something like {2:entity2, 3:entity3, 11:entity11, ...}
                    // The for...in loop sets e to "2", "3", "11", ... i.e. all
                    // the entity ID numbers. e is a string, so +e converts to number type.
                    this[i] = +e;
                    i++;
                }
                this.length = i;
                // if there's only one entity, return the actual entity
                if (i === 1) {
                    return entities[this[0]];
                }
                return this;
            }

            //multiple components OR
            if (selector.indexOf(',') !== -1) {
                or = true;
                del = rlist;
                //deal with multiple components AND
            } else if (selector.indexOf(' ') !== -1) {
                and = true;
                del = rspace;
            }

            //loop over entities
            for (e in entities) {
                if (!entities.hasOwnProperty(e)) continue; //skip
                current = entities[e];

                if (and || or) { //multiple components
                    comps = selector.split(del);
                    i = 0;
                    l = comps.length;
                    score = 0;

                    for (; i < l; i++) //loop over components
                        if (current.__c[comps[i]]) score++; //if component exists add to score

                        //if anded comps and has all OR ored comps and at least 1
                    if (and && score === l || or && score > 0) this[elem++] = +e;

                } else if (current.__c[selector]) this[elem++] = +e; //convert to int
            }

            //extend all common components
            if (elem > 0 && !and && !or) this.extend(components[selector]);
            if (comps && and)
                for (i = 0; i < l; i++) this.extend(components[comps[i]]);

            this.length = elem; //length is the last index (already incremented)

            // if there's only one entity, return the actual entity
            if (elem === 1) {
                return entities[this[elem - 1]];
            }

        } else { //Select a specific entity

            if (!selector) { //nothin passed creates God entity
                selector = 0;
                if (!(selector in entities)) entities[selector] = this;
            }

            //if not exists, return undefined
            if (!(selector in entities)) {
                this.length = 0;
                return this;
            }

            this[0] = selector;
            this.length = 1;

            //update from the cache
            if (!this.__c) this.__c = {};
            if (!this._callbacks) Crafty._addCallbackMethods(this);

            //update to the cache if NULL
            if (!entities[selector]) entities[selector] = this;
            return entities[selector]; //return the cached selector
        }

        Crafty._addCallbackMethods(this);
        return this;
    },

    /**@
     * #.setName
     * @comp Crafty Core
     * @sign public this .setName(String name)
     * @param name - A human readable name for debugging purposes.
     *
     * @example
     * ~~~
     * this.setName("Player");
     * ~~~
     */
    setName: function (name) {
        var entityName = String(name);

        this._entityName = entityName;

        this.trigger("NewEntityName", entityName);
        return this;
    },

    /**@
     * #.addComponent
     * @comp Crafty Core
     * @sign public this .addComponent(String componentList)
     * @param componentList - A string of components to add separated by a comma `,`
     * @sign public this .addComponent(String Component1[, .., String ComponentN])
     * @param Component# - Component ID to add.
     *
     * Adds a component to the selected entities or entity.
     *
     * Components are used to extend the functionality of entities.
     * This means it will copy properties and assign methods to
     * augment the functionality of the entity.
     *
     * For adding multiple components, you can either pass a string with
     * all the component names (separated by commas), or pass each component name as
     * an argument.
     *
     * If the component has a function named `init` it will be called.
     *
     * If the entity already has the component, the component is skipped (nothing happens).
     *
     * @example
     * ~~~
     * this.addComponent("2D, Canvas");
     * this.addComponent("2D", "Canvas");
     * ~~~
     */
    addComponent: function (id) {
        var comps,
            comp, c = 0;

        //add multiple arguments
        if (arguments.length === 1 && id.indexOf(',') !== -1) {
            comps = id.split(rlist);
        } else {
            comps = arguments;
        }

        //extend the components
        for (; c < comps.length; c++) {
            // If component already exists, continue
            if (this.__c[comps[c]] === true) {
                continue;
            }
            this.__c[comps[c]] = true;
            comp = components[comps[c]];
            // Copy all methods of the component
            this.extend(comp);
            // Add any required components
            if (comp && "required" in comp) {
                this.requires( comp.required );
            }
            // Call constructor function
            if (comp && "init" in comp) {
                comp.init.call(this);
            }
            // Bind events
            if (comp && "events" in comp){
                var auto = comp.events;
                for (var eventName in auto){
                    var fn = typeof auto[eventName] === "function" ? auto[eventName] : comp[auto[eventName]];
                    this.bind(eventName, fn);
                }
            }
        }

        this.trigger("NewComponent", comps);
        return this;
    },

    /**@
     * #.toggleComponent
     * @comp Crafty Core
     * @sign public this .toggleComponent(String ComponentList)
     * @param ComponentList - A string of components to add or remove separated by a comma `,`
     * @sign public this .toggleComponent(String Component1[, .., String componentN])
     * @param Component# - Component ID to add or remove.
     * 
     * Add or Remove Components from an entity.
     *
     * @example
     * ~~~
     * var e = Crafty.e("2D,DOM,Test");
     * e.toggleComponent("Test,Test2"); //Remove Test, add Test2
     * e.toggleComponent("Test,Test2"); //Add Test, remove Test2
     * ~~~
     *
     * ~~~
     * var e = Crafty.e("2D,DOM,Test");
     * e.toggleComponent("Test","Test2"); //Remove Test, add Test2
     * e.toggleComponent("Test","Test2"); //Add Test, remove Test2
     * e.toggleComponent("Test");         //Remove Test
     * ~~~
     */
    toggleComponent: function (toggle) {
        var i = 0,
            l, comps;
        if (arguments.length > 1) {
            l = arguments.length;

            for (; i < l; i++) {
                if (this.has(arguments[i])) {
                    this.removeComponent(arguments[i]);
                } else {
                    this.addComponent(arguments[i]);
                }
            }
            //split components if contains comma
        } else if (toggle.indexOf(',') !== -1) {
            comps = toggle.split(rlist);
            l = comps.length;
            for (; i < l; i++) {
                if (this.has(comps[i])) {
                    this.removeComponent(comps[i]);
                } else {
                    this.addComponent(comps[i]);
                }
            }

            //single component passed
        } else {
            if (this.has(toggle)) {
                this.removeComponent(toggle);
            } else {
                this.addComponent(toggle);
            }
        }

        return this;
    },

    /**@
     * #.requires
     * @comp Crafty Core
     * @sign public this .requires(String componentList)
     * @param componentList - List of components that must be added
     *
     * Makes sure the entity has the components listed. If the entity does not
     * have the component, it will add it.
     *
     * (In the current version of Crafty, this function behaves exactly the same
     * as `addComponent`. By convention, developers have used `requires` for
     * component dependencies -- i.e. to indicate specifically that one component
     * will only work properly if another component is present -- and used
     * `addComponent` in all other situations.)
     *
     * @see .addComponent
     */
    requires: function (list) {
        return this.addComponent(list);
    },

    /**@
     * #.removeComponent
     * @comp Crafty Core
     * @sign public this .removeComponent(String Component[, soft])
     * @param component - Component to remove
     * @param soft - Whether to soft remove it (defaults to `true`)
     *
     * Removes a component from an entity. A soft remove (the default) will only
     * refrain `.has()` from returning true. Hard will remove all
     * associated properties and methods.
     *
     * @example
     * ~~~
     * var e = Crafty.e("2D,DOM,Test");
     * e.removeComponent("Test");        //Soft remove Test component
     * e.removeComponent("Test", false); //Hard remove Test component
     * ~~~
     */
    removeComponent: function (id, soft) {
        var comp = components[id];
        this.trigger("RemoveComponent", id);
        if (comp && "events" in comp){
            var auto = comp.events;
            for (var eventName in auto){
                var fn = typeof auto[eventName] === "function" ? auto[eventName] : comp[auto[eventName]];
                this.unbind(eventName, fn);
            }
        }
        if (comp && "remove" in comp) {
            comp.remove.call(this, false);
        }
        if (soft === false && comp) {
            for (var prop in comp) {
                delete this[prop];
            }
        }
        delete this.__c[id];


        return this;
    },

    /**@
     * #.getId
     * @comp Crafty Core
     * @sign public Number .getId(void)
     * @returns the ID of this entity.
     *
     * For better performance, simply use the this[0] property.
     *
     * @example
     * Finding out the `ID` of an entity can be done by returning the property `0`.
     * ~~~
     *    var ent = Crafty.e("2D");
     *    ent[0]; //ID
     *    ent.getId(); //also ID
     * ~~~
     */
    getId: function () {
        return this[0];
    },

    /**@
     * #.has
     * @comp Crafty Core
     * @sign public Boolean .has(String component)
     * @param component - The name of the component to check
     * @returns `true` or `false` depending on if the
     * entity has the given component.
     *
     * For better performance, simply use the `.__c` object
     * which will be `true` if the entity has the component or
     * will not exist (or be `false`).
     */
    has: function (id) {
        return !!this.__c[id];
    },

    /**@
     * #.attr
     * @comp Crafty Core
     * @trigger Change - when properties change - {key: value}
     *
     * @sign public this .attr(String property, Any value[, Boolean silent[, Boolean recursive]])
     * @param property - Property of the entity to modify
     * @param value - Value to set the property to
     * @param silent - If you would like to supress events
     * @param recursive - If you would like merge recursively
     *
     * Use this method to set any property of the entity.
     *
     * @sign public this .attr(Object map[, Boolean silent[, Boolean recursive]])
     * @param map - Object where each key is the property to modify and the value as the property value
     * @param silent - If you would like to supress events
     * @param recursive - If you would like merge recursively
     *
     * Use this method to set multiple properties of the entity.
     *
     * Setter options:
     * - `silent`: If you want to prevent it from firing events.
     * - `recursive`: If you pass in an object you could overwrite sibling keys, this recursively merges instead of just merging it. This is `false` by default, unless you are using dot notation `name.first`.
     *
     * @sign public Any .attr(String property)
     * @param property - Property of the entity to modify
     * @returns Value - the value of the property
     *
     * Use this method to get any property of the entity. You can also retrieve the property using `this.property`.
     * 
     *
     * @example
     * ~~~
     * this.attr({key: "value", prop: 5});
     * this.attr("key"); // returns "value"
     * this.attr("prop"); // returns 5
     * this.key; // "value"
     * this.prop; // 5
     *
     * this.attr("key", "newvalue");
     * this.attr("key"); // returns "newvalue"
     * this.key; // "newvalue"
     *
     * this.attr("parent.child", "newvalue");
     * this.parent; // {child: "newvalue"};
     * this.attr('parent.child'); // "newvalue"
     * ~~~
     */
    attr: function (key, value, silent, recursive) {
        if (arguments.length === 1 && typeof arguments[0] === 'string') {
            return this._attr_get(key);
        } else {
            return this._attr_set(key, value, silent, recursive);
        }
    },

    /**
     * Internal getter method for data on the entity. Called by `.attr`.
     *
     * example
     * ~~~
     * person._attr_get('name'); // Foxxy
     * person._attr_get('contact'); // {email: 'fox_at_example.com'}
     * person._attr_get('contact.email'); // fox_at_example.com
     * ~~~
     */
    _attr_get: function(key, context) {
        var first, keys, subkey;
        if (typeof context === "undefined" || context === null) {
            context = this;
        }
        if (key.indexOf('.') > -1) {
            keys = key.split('.');
            first = keys.shift();
            subkey = keys.join('.');
            return this._attr_get(keys.join('.'), context[first]);
        } else {
            return context[key];
        }
    },

    /**
     * Internal setter method for attributes on the component. Called by `.attr`.
     *
     * Options:
     *
     * `silent`: If you want to prevent it from firing events.
     *
     * `recursive`: If you pass in an object you could overwrite
     * sibling keys, this recursively merges instead of just
     * merging it. This is `false` by default, unless you are
     * using dot notation `name.first`.
     *
     * example
     * ~~~
     * person._attr_set('name', 'Foxxy', true);
     * person._attr_set('name', 'Foxxy');
     * person._attr_set({name: 'Foxxy'}, true);
     * person._attr_set({name: 'Foxxy'});
     * person._attr_set('name.first', 'Foxxy');
     * ~~~
     */
    _attr_set: function() {
        var data, silent, recursive;
        if (typeof arguments[0] === 'string') {
            data = this._set_create_object(arguments[0], arguments[1]);
            silent = !!arguments[2];
            recursive = arguments[3] || arguments[0].indexOf('.') > -1;
        } else {
            data = arguments[0];
            silent = !!arguments[1];
            recursive = !!arguments[2];
        }

        if (!silent) {
            this.trigger('Change', data);
        }

        if (recursive) {
            this._recursive_extend(data, this);
        } else {
            this.extend.call(this, data);
        }
        return this;
    },

    /**
     * If you are setting a key of 'foo.bar' or 'bar', this creates
     * the appropriate object for you to recursively merge with the
     * current attributes.
     */
    _set_create_object: function(key, value) {
        var data = {}, keys, first, subkey;
        if (key.indexOf('.') > -1) {
            keys = key.split('.');
            first = keys.shift();
            subkey = keys.join('.');
            data[first] = this._set_create_object(subkey, value);
        } else {
            data[key] = value;
        }
        return data;
    },

    /**
     * Recursively puts `new_data` into `original_data`.
     */
    _recursive_extend: function(new_data, original_data) {
        var key;
        for (key in new_data) {
            if (new_data[key].constructor === Object) {
                original_data[key] = this._recursive_extend(new_data[key], original_data[key]);
            } else {
                original_data[key] = new_data[key];
            }
        }
        return original_data;
    },

    /**@
     * #.toArray
     * @comp Crafty Core
     * @sign public this .toArray(void)
     *
     * This method will simply return the found entities as an array of ids.  To get an array of the actual entities, use `get()`.
     * @see .get
     */
    toArray: function () {
        return slice.call(this, 0);
    },

    /**@
    * #.timeout
    * @comp Crafty Core
    * @sign public this .timeout(Function callback, Number delay)
    * @param callback - Method to execute after given amount of milliseconds
    * @param delay - Amount of milliseconds to execute the method
    *
    * The delay method will execute a function after a given amount of time in milliseconds.
    *
    * Essentially a wrapper for `setTimeout`.
    *
    * @example
    * Destroy itself after 100 milliseconds
    * ~~~
    * this.timeout(function() {
         this.destroy();
    * }, 100);
    * ~~~
    */
    timeout: function (callback, duration) {
        this.each(function () {
            var self = this;
            setTimeout(function () {
                callback.call(self);
            }, duration);
        });
        return this;
    },

    /**@
     * #.bind
     * @comp Crafty Core
     * @sign public this .bind(String eventName, Function callback)
     * @param eventName - Name of the event to bind to
     * @param callback - Method to execute when the event is triggered
     *
     * Attach the current entity (or entities) to listen for an event.
     *
     * Callback will be invoked when an event with the event name passed
     * is triggered. Depending on the event, some data may be passed
     * via an argument to the callback function.
     *
     * The first argument is the event name (can be anything) whilst the
     * second argument is the callback. If the event has data, the
     * callback should have an argument.
     *
     * Events are arbitrary and provide communication between components.
     * You can trigger or bind an event even if it doesn't exist yet.
     *
     * Unlike DOM events, Crafty events are executed synchronously.
     *
     * @example
     * ~~~
     * this.attr("triggers", 0); //set a trigger count
     * this.bind("myevent", function() {
     *     this.triggers++; //whenever myevent is triggered, increment
     * });
     * this.bind("EnterFrame", function() {
     *     this.trigger("myevent"); //trigger myevent on every frame
     * });
     * ~~~
     *
     * @see .trigger, .unbind
     */
    bind: function (event, callback) {
        //  To learn how the event system functions, see the comments for Crafty._callbackMethods
        //optimization for 1 entity
        if (this.length === 1) {
            this._bindCallback(event, callback);
        } else {
            for (var i = 0; i < this.length; i++) {
                var e = entities[this[i]];
                if (e) {
                    e._bindCallback(event, callback);
                }
            }
        }
        return this;
    },

    /**@
     * #.uniqueBind
     * @comp Crafty Core
     * @sign public Number .uniqueBind(String eventName, Function callback)
     * @param eventName - Name of the event to bind to
     * @param callback - Method to execute upon event triggered
     * @returns ID of the current callback used to unbind
     *
     * Works like Crafty.bind, but prevents a callback from being bound multiple times.
     *
     * @see .bind
     */
    uniqueBind: function (event, callback) {
        this.unbind(event, callback);
        this.bind(event, callback);

    },

    /**@
     * #.one
     * @comp Crafty Core
     * @sign public Number one(String eventName, Function callback)
     * @param eventName - Name of the event to bind to
     * @param callback - Method to execute upon event triggered
     * @returns ID of the current callback used to unbind
     *
     * Works like Crafty.bind, but will be unbound once the event triggers.
     *
     * @see .bind
     */
    one: function (event, callback) {
        var self = this;
        var oneHandler = function (data) {
            callback.call(self, data);
            self.unbind(event, oneHandler);
        };
        return self.bind(event, oneHandler);

    },

    /**@
     * #.unbind
     * @comp Crafty Core
     * @sign public this .unbind(String eventName[, Function callback])
     * @param eventName - Name of the event to unbind
     * @param callback - Function to unbind
     *
     * Removes binding with an event from current entity.
     *
     * Passing an event name will remove all events bound to
     * that event. Passing a reference to the callback will
     * unbind only that callback.
     * @see .bind, .trigger
     */
    unbind: function (event, callback) {
        //  To learn how the event system functions, see the comments for Crafty._callbackMethods
        var i, e;
        for (i = 0; i < this.length; i++) {
            e = entities[this[i]];
            if (e) {
                e._unbindCallbacks(event, callback);
            }
        }
        return this;
    },

    /**@
     * #.trigger
     * @comp Crafty Core
     * @sign public this .trigger(String eventName[, Object data])
     * @param eventName - Event to trigger
     * @param data - Arbitrary data that will be passed into every callback as an argument
     *
     * Trigger an event with arbitrary data. Will invoke all callbacks with
     * the context (value of `this`) of the current entity object.
     *
     * *Note: This will only execute callbacks within the current entity, no other entity.*
     *
     * The first argument is the event name to trigger and the optional
     * second argument is the arbitrary event data. This can be absolutely anything.
     *
     * Unlike DOM events, Crafty events are exectued synchronously.
     */
    trigger: function (event, data) {
        //  To learn how the event system functions, see the comments for Crafty._callbackMethods
        if (this.length === 1) {
            //find the handlers assigned to the entity
            this._runCallbacks(event, data);
         } else {
            for (var i = 0; i < this.length; i++) {
                var e = entities[this[i]];
                if (e) {
                    e._runCallbacks(event, data);
                }
            }
        }
        return this;
    },

    /**@
     * #.each
     * @comp Crafty Core
     * @sign public this .each(Function method)
     * @param method - Method to call on each iteration
     *
     * Iterates over found entities, calling a function for every entity.
     *
     * The function will be called for every entity and will pass the index
     * in the iteration as an argument. The context (value of `this`) of the
     * function will be the current entity in the iteration.
     *
     * @example
     * Destroy every second 2D entity
     * ~~~
     * Crafty("2D").each(function(i) {
     *     if(i % 2 === 0) {
     *         this.destroy();
     *     }
     * });
     * ~~~
     */
    each: function (func) {
        var i = 0,
            l = this.length;
        for (; i < l; i++) {
            //skip if not exists
            if (!entities[this[i]]) continue;
            func.call(entities[this[i]], i);
        }
        return this;
    },

    /**@
     * #.get
     * @comp Crafty Core
     * @sign public Array .get()
     * @returns An array of entities corresponding to the active selector
     *
     * @sign public Entity .get(Number index)
     * @returns an entity belonging to the current selection
     * @param index - The index of the entity to return.  If negative, counts back from the end of the array.
     *
     *
     * @example
     * Get an array containing every "2D" entity
     * ~~~
     * var arr = Crafty("2D").get()
     * ~~~
     * Get the first entity matching the selector
     * ~~~
     * // equivalent to Crafty("2D").get()[0], but doesn't create a new array
     * var e = Crafty("2D").get(0)
     * ~~~
     * Get the last "2D" entity matching the selector
     * ~~~
     * var e = Crafty("2D").get(-1)
     * ~~~
     *
     */
    get: function(index) {
        var l = this.length;
        if (typeof index !== "undefined") {
            if (index >= l || index+l < 0)
                return undefined;
            if (index>=0)
                return entities[this[index]];
            else
                return entities[this[index+l]];
        } else {
            var i=0, result = [];
            for (; i < l; i++) {
                //skip if not exists
                if (!entities[this[i]]) continue;
                result.push( entities[this[i]] );
            }
            return result;
        }
    },

    /**@
     * #.clone
     * @comp Crafty Core
     * @sign public Entity .clone(void)
     * @returns Cloned entity of the current entity
     *
     * Method will create another entity with the exact same
     * properties, components and methods as the current entity.
     */
    clone: function () {
        var comps = this.__c,
            comp,
            prop,
            clone = Crafty.e();

        for (comp in comps) {
            clone.addComponent(comp);
        }
        for (prop in this) {
            if (prop != "0" && prop != "_global" && prop != "_changed" && typeof this[prop] != "function" && typeof this[prop] != "object") {
                clone[prop] = this[prop];
            }
        }

        return clone;
    },


    /**@
     * #.setter
     * @comp Crafty Core
     * @sign public this .setter(String property, Function callback)
     * @param property - Property to watch for modification
     * @param callback - Method to execute if the property is modified
     *
     * Will watch a property waiting for modification and will then invoke the
     * given callback when attempting to modify.
     *
     * This feature is deprecated; use .defineField() instead.
     * @see .defineField
     */
    setter: function (prop, callback) {
        return this.defineField(prop, function(){}, callback);
    },

    /**@
     * #.defineField
     * @comp Crafty Core
     * @sign public this .defineField(String property, Function getCallback, Function setCallback)
     * @param property - Property name to assign getter & setter to
     * @param getCallback - Method to execute if the property is accessed
     * @param setCallback - Method to execute if the property is mutated
     *
     * Assigns getters and setters to the property. 
     * A getter will watch a property waiting for access and will then invoke the
     * given getCallback when attempting to retrieve.
     * A setter will watch a property waiting for mutation and will then invoke the
     * given setCallback when attempting to modify.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D");
     * ent.defineField("customData", function() { 
     *    return this._customData; 
     * }, function(newValue) { 
     *    this._customData = newValue;
     * });
     *
     * ent.customData = "2" // set customData to 2
     * Crafty.log(ent.customData) // prints 2
     * ~~~
     */
    defineField: function (prop, getCallback, setCallback) {
        Crafty.defineField(this, prop, getCallback, setCallback);
        return this;
    },

    /**@
     * #.destroy
     * @comp Crafty Core
     * @sign public this .destroy(void)
     * Will remove all event listeners and delete all properties as well as removing from the stage
     */
    destroy: function () {
        //remove all event handlers, delete from entities
        this.each(function () {
            var comp;
            this.trigger("Remove");
            for (var compName in this.__c) {
                comp = components[compName];
                if (comp && "remove" in comp)
                    comp.remove.call(this, true);
            }
            this._unbindAll();
            delete entities[this[0]];
        });
    }
};

//give the init instances the Crafty prototype
Crafty.fn.init.prototype = Crafty.fn;


/**@
 * #Crafty.extend
 * @category Core
 * @sign public this Crafty.extend(Object obj)
 * @param obj - An object whose fields will be copied onto Crafty.  This is a shallow copy.
 *
 * Used to extend the Crafty namespace by passing in an object of properties and methods to add.
 *
 * @example
 * ~~~ * 
 * Crafty.extend({
 *   isArray: function(arg){
 *     return Object.prototype.toString.call(arg) === '[object Array]'
 *   }
 * });
 * 
 * Crafty.isArray([4, 5, 6]);  // returns true
 * Crafty.isArray('hi');       // returns false
 * ~~~
 */
Crafty.extend = Crafty.fn.extend = function (obj) {
    var target = this,
        key;

    //don't bother with nulls
    if (!obj) return target;

    for (key in obj) {
        if (target === obj[key]) continue; //handle circular reference
        target[key] = obj[key];
    }

    return target;
};




// How Crafty handles events and callbacks
// -----------------------------------------
// Callbacks are stored in the global object `handlers`, which has properties for each event.  
// These properties point to an object which has a property for each entity listening to the event.
// These in turn are arrays containing the callbacks to be triggered.
// 
// Here is an example of what "handlers" can look like:
//     handlers ===
//         { Move:  {5:[fnA], 6:[fnB, fnC], global:[fnD]},
//         Change: {6:[fnE]}
//         }
// In this example, when the 'Move' event is triggered on entity #6 (e.g.
// entity6.trigger('Move')), it causes the execution of fnB() and fnC(). When
// the Move event is triggered globally (i.e. Crafty.trigger('Move')), it
// will execute fnA, fnB, fnC, fnD.
//
// In this example, "this" is bound to entity #6 whenever fnB() is executed, and
// "this" is bound to Crafty whenever fnD() is executed.
//
// In other words, the structure of "handlers" is:
//
//     handlers[event][objID] === (Array of callback functions)
//
// In addition to the global object, each object participating in the event system has a `_callbacks` property 
// which lists the events that object is listening to.  It allows access to the object's callbacks like this:
//     obj._callbacks[event] === (Array of callback functions)
//
// Objects, which can listen to events (or collections of such objects) have varying logic 
// on how the events are bound/triggered/unbound.  Since the underlying operations on the callback array are the same,
// the single-object operations are implemented in the following object.  
// Calling `Crafty._addCallbackMethods(obj)` on an object will extend that object with these methods.


 
Crafty._callbackMethods = {
    // Add a function to the list of callbacks for an event
    _bindCallback: function(event, fn) {
        // Get handle to event, creating it if necessary
        var callbacks = this._callbacks[event];
        if (!callbacks) {
            callbacks = this._callbacks[event] = ( handlers[event] || ( handlers[event] = {} ) )[this[0]] = [];
            callbacks.context = this;
            callbacks.depth = 0;
        }
        // Push to callback array
        callbacks.push(fn);
    },

    // Process for running all callbacks for the given event
    _runCallbacks: function(event, data) {
        if (!this._callbacks[event]) {
            return;
        }
        var callbacks = this._callbacks[event];

        // Callback loop; deletes dead callbacks, but only when it is safe to do so
        var i, l = callbacks.length;
        // callbacks.depth tracks whether this function was invoked in the middle of a previous iteration through the same callback array
        callbacks.depth++;
        for (i = 0; i < l; i++) {
            if (typeof callbacks[i] === "undefined") {
                if (callbacks.depth <= 1) {
                    callbacks.splice(i, 1);
                    i--;
                    l--;
                    // Delete callbacks object if there are no remaining bound events
                    if (callbacks.length === 0) {
                        delete this._callbacks[event];
                        delete handlers[event][this[0]];
                    }
                }
            } else {
                callbacks[i].call(this, data);
            }
        }
        callbacks.depth--;
    },

    // Unbind callbacks for the given event
    // If fn is specified, only it will be removed; otherwise all callbacks will be
    _unbindCallbacks: function(event, fn) {
        if (!this._callbacks[event]) {
            return;
        }
        var callbacks = this._callbacks[event];
        // Iterate through and delete the callback functions that match
        // They are spliced out when _runCallbacks is invoked, not here
        // (This function might be called in the middle of a callback, which complicates the logic)
        for (var i = 0; i < callbacks.length; i++) {
            if (!fn || callbacks[i] == fn) {
                delete callbacks[i];
            }
        }
    },

    // Completely all callbacks for every event, such as on object destruction
    _unbindAll: function() {
        if (!this._callbacks) return;
        for (var event in this._callbacks) {
            if (this._callbacks[event]) {
                // Remove the normal way, in case we've got a nested loop
                this._unbindCallbacks(event);
                // Also completely delete the registered callback from handlers
                delete handlers[event][this[0]];
            }
        }
    }
};

// Helper function to add the callback methods above to an object, as well as initializing the callbacks object
// it provies the "low level" operations; bind, unbind, and trigger will still need to be implemented for that object
Crafty._addCallbackMethods = function(context) {
    context.extend(Crafty._callbackMethods);
    context._callbacks = {};
};

Crafty._addCallbackMethods(Crafty);

Crafty.extend({
    // Define Crafty's id
    0: "global",
    /**@
     * #Crafty.init
     * @category Core
     * @trigger Load - Just after the viewport is initialised. Before the EnterFrame loops is started
     * @sign public this Crafty.init([Number width, Number height, String stage_elem])
     * @sign public this Crafty.init([Number width, Number height, HTMLElement stage_elem])
     * @param Number width - Width of the stage
     * @param Number height - Height of the stage
     * @param String or HTMLElement stage_elem - the element to use for the stage
     *
     * Sets the element to use as the stage, creating it if necessary.  By default a div with id 'cr-stage' is used, but if the 'stage_elem' argument is provided that will be used instead.  (see `Crafty.viewport.init`)
     *
     * Starts the `EnterFrame` interval. This will call the `EnterFrame` event for every frame.
     *
     * Can pass width and height values for the stage otherwise will default to window size.
     *
     * All `Load` events will be executed.
     *
     * Uses `requestAnimationFrame` to sync the drawing with the browser but will default to `setInterval` if the browser does not support it.
     * @see Crafty.stop,  Crafty.viewport
     */
    init: function (w, h, stage_elem) {
        
        // If necessary, attach any event handlers registered before Crafty started
        if (!this._preBindDone) {
            for(var i = 0; i < this._bindOnInit.length; i++) {

                var preBind = this._bindOnInit[i];
                Crafty.bind(preBind.event, preBind.handler);
            }
        }

        Crafty.viewport.init(w, h, stage_elem);

        //call all arbitrary functions attached to onload
        this.trigger("Load");
        this.timer.init();

        return this;
    },

    // There are some events that need to be bound to Crafty when it's started/restarted, so store them here
    // Switching Crafty's internals to use the new system idiom should allow removing this hack
    _bindOnInit: [],
    _preBindDone: false,
    _preBind: function(event, handler) {
        this._bindOnInit.push({
            event: event,
            handler: handler
        });
    },

    /**@
     * #Crafty.getVersion
     * @category Core
     * @sign public String Crafty.getVersion()
     * @returns Current version of Crafty as a string
     *
     * Return current version of crafty
     *
     * @example
     * ~~~
     * Crafty.getVersion(); //'0.5.2'
     * ~~~
     */
    getVersion: function () {
        return version;
    },

    /**@
     * #Crafty.stop
     * @category Core
     * @trigger CraftyStop - when the game is stopped  - {bool clearState}
     * @sign public this Crafty.stop([bool clearState])
     * @param clearState - if true the stage and all game state is cleared.
     *
     * Stops the EnterFrame interval and removes the stage element.
     *
     * To restart, use `Crafty.init()`.
     * @see Crafty.init
     */
    stop: function (clearState) {
        Crafty.trigger("CraftyStop", clearState);

        this.timer.stop();
        if (clearState) {
            // Remove audio
            Crafty.audio.remove();

            // Remove the stage element, and re-add a div with the same id
            if (Crafty.stage && Crafty.stage.elem.parentNode) {
                var newCrStage = document.createElement('div');
                newCrStage.id = Crafty.stage.elem.id;
                Crafty.stage.elem.parentNode.replaceChild(newCrStage, Crafty.stage.elem);
            }

            // Reset references to the now destroyed graphics layers
            delete Crafty.canvasLayer.context;
            delete Crafty.domLayer._div;
            delete Crafty.webgl.context;

            // reset callbacks, and indicate that prebound functions need to be bound on init again
            Crafty._unbindAll();
            Crafty._addCallbackMethods(Crafty);
            this._preBindDone = false;

            initState();
        }
        return this;
    },

    /**@
     * #Crafty.pause
     * @category Core
     * @trigger Pause - when the game is paused
     * @trigger Unpause - when the game is unpaused
     * @sign public this Crafty.pause(void)
     *
     * Pauses the game by stopping the EnterFrame event from firing. If the game is already paused it is unpaused.
     * You can pass a boolean parameter if you want to pause or unpause no matter what the current state is.
     * Modern browsers pauses the game when the page is not visible to the user. If you want the Pause event
     * to be triggered when that happens you can enable autoPause in `Crafty.settings`.
     *
     * @example
     * Have an entity pause the game when it is clicked.
     * ~~~
     * button.bind("click", function() {
     *     Crafty.pause();
     * });
     * ~~~
     */
    pause: function (toggle) {
        if (arguments.length === 1 ? toggle : !this._paused) {
            this.trigger('Pause');
            this._paused = true;
            setTimeout(function () {
                Crafty.timer.stop();
            }, 0);
            Crafty.keydown = {};
        } else {
            this.trigger('Unpause');
            this._paused = false;
            setTimeout(function () {
                Crafty.timer.init();
            }, 0);
        }
        return this;
    },

    /**@
     * #Crafty.isPaused
     * @category Core
     * @sign public Boolean Crafty.isPaused()
     * @returns Whether the game is currently paused.
     *
     * @example
     * ~~~
     * Crafty.isPaused();
     * ~~~
     */
    isPaused: function () {
        return this._paused;
    },

    /**@
     * #Crafty.timer
     * @category Game Loop
     * Handles game ticks
     */
    timer: (function () {
        /*
         * `window.requestAnimationFrame` or its variants is called for animation.
         * `.requestID` keeps a record of the return value previous `window.requestAnimationFrame` call.
         * This is an internal variable. Used to stop frame.
         */
        var tick, requestID;

        // Internal variables used to control the game loop.  Use Crafty.timer.steptype() to set these.
        var mode = "fixed",
            maxFramesPerStep = 5,
            maxTimestep = 40;

        // variables used by the game loop to track state
        var endTime = 0,
            timeSlip = 0,
            gameTime;

        // Controls the target rate of fixed mode loop.  Set these with the Crafty.timer.FPS function
        var FPS = 50,
            milliSecPerFrame = 1000 / FPS;




        return {
            init: function () {
                // When first called, set the  gametime one frame before now!
                if (typeof gameTime === "undefined")
                    gameTime = (new Date().getTime()) - milliSecPerFrame;

                var onFrame = (typeof window !== "undefined") && (
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    null
                );

                if (onFrame) {
                    tick = function () {
                        Crafty.timer.step();
                        if (tick !== null) {
                            requestID = onFrame(tick);
                        }
                        //Crafty.log(requestID + ', ' + frame)
                    };

                    tick();
                } else {
                    tick = setInterval(function () {
                        Crafty.timer.step();
                    }, 1000 / FPS);
                }
            },

            stop: function () {
                Crafty.trigger("CraftyStopTimer");

                if (typeof tick !== "function") clearInterval(tick);

                var onFrame = (typeof window !== "undefined") && (
                    window.cancelAnimationFrame ||
                    window.cancelRequestAnimationFrame ||
                    window.webkitCancelRequestAnimationFrame ||
                    window.mozCancelRequestAnimationFrame ||
                    window.oCancelRequestAnimationFrame ||
                    window.msCancelRequestAnimationFrame ||
                    null
                );

                if (onFrame) onFrame(requestID);
                tick = null;
            },


            /**@
             * #Crafty.timer.steptype
             * @comp Crafty.timer
             * @sign public void Crafty.timer.steptype(mode [, maxTimeStep])
             * Can be called to set the type of timestep the game loop uses
             * @param mode - the type of time loop.  Allowed values are "fixed", "semifixed", and "variable".  Crafty defaults to "fixed".
             * @param maxTimeStep - For "fixed", sets the max number of frames per step.   For "variable" and "semifixed", sets the maximum time step allowed.
             *
             * * In "fixed" mode, each frame is sent the same value of `dt`, and to achieve the target game speed, mulitiple frame events are triggered before each render.
             * * In "variable" mode, there is only one frame triggered per render.  This recieves a value of `dt` equal to the actual elapsed time since the last frame.
             * * In "semifixed" mode, multiple frames per render are processed, and the total time since the last frame is divided evenly between them.
             *
             */

            steptype: function (newmode, option) {
                if (newmode === "variable" || newmode === "semifixed") {
                    mode = newmode;
                    if (option)
                        maxTimestep = option;

                } else if (newmode === "fixed") {
                    mode = "fixed";
                    if (option)
                        maxFramesPerStep = option;
                } else {
                    throw "Invalid step type specified";
                }


            },

            /**@
             * #Crafty.timer.step
             * @comp Crafty.timer
             * @sign public void Crafty.timer.step()
             * @trigger EnterFrame - Triggered on each frame.  Passes the frame number, and the amount of time since the last frame.  If the time is greater than maxTimestep, that will be used instead.  (The default value of maxTimestep is 50 ms.) - { frame: Number, dt:Number }
             * @trigger ExitFrame - Triggered after each frame.  Passes the frame number, and the amount of time since the last frame.  If the time is greater than maxTimestep, that will be used instead.  (The default value of maxTimestep is 50 ms.) - { frame: Number, dt:Number }
             * @trigger PreRender - Triggered every time immediately before a scene should be rendered
             * @trigger RenderScene - Triggered every time a scene should be rendered
             * @trigger PostRender - Triggered every time immediately after a scene should be rendered
             * @trigger MeasureWaitTime - Triggered at the beginning of each step after the first.  Passes the time the game loop waited between steps. - Number
             * @trigger MeasureFrameTime - Triggered after each frame.  Passes the time it took to advance one frame. - Number
             * @trigger MeasureRenderTime - Triggered after each render. Passes the time it took to render the scene - Number
             *
             * Advances the game by performing a step. A step consists of one/multiple frames followed by a render. The amount of frames depends on the timer's steptype.
             * Specifically it triggers `EnterFrame` & `ExitFrame` events for each frame and `PreRender`, `RenderScene` & `PostRender` events for each render.
             *
             * @see Crafty.timer.steptype
             */
            step: function () {
                var drawTimeStart, dt, lastFrameTime, loops = 0;

                currentTime = new Date().getTime();
                if (endTime > 0)
                    Crafty.trigger("MeasureWaitTime", currentTime - endTime);

                // If we're currently ahead of the current time, we need to wait until we're not!
                if (gameTime + timeSlip >= currentTime) {
                    endTime = currentTime;
                    return;
                }

                var netTimeStep = currentTime - (gameTime + timeSlip);
                // We try to keep up with the target FPS by processing multiple frames per render
                // If we're hopelessly behind, stop trying to catch up.
                if (netTimeStep > milliSecPerFrame * 20) {
                    //gameTime = currentTime - milliSecPerFrame;
                    timeSlip += netTimeStep - milliSecPerFrame;
                    netTimeStep = milliSecPerFrame;
                }

                // Set up how time is incremented
                if (mode === "fixed") {
                    loops = Math.ceil(netTimeStep / milliSecPerFrame);
                    // maxFramesPerStep adjusts how willing we are to delay drawing in order to keep at the target FPS
                    loops = Math.min(loops, maxFramesPerStep);
                    dt = milliSecPerFrame;
                } else if (mode === "variable") {
                    loops = 1;
                    dt = netTimeStep;
                    // maxTimestep is the maximum time to be processed in a frame.  (Large dt => unstable physics)
                    dt = Math.min(dt, maxTimestep);
                } else if (mode === "semifixed") {
                    loops = Math.ceil(netTimeStep / maxTimestep);
                    dt = netTimeStep / loops;
                }

                // Process frames, incrementing the game clock with each frame.
                // dt is determined by the mode
                for (var i = 0; i < loops; i++) {
                    lastFrameTime = currentTime;
                    
                    var frameData = {
                        frame: frame++,
                        dt: dt,
                        gameTime: gameTime
                    };
                    // Everything that changes over time hooks into this event
                    Crafty.trigger("EnterFrame", frameData);
                    // Event that happens after "EnterFrame", e.g. for resolivng collisions applied through movement during "EnterFrame" events
                    Crafty.trigger("ExitFrame", frameData);
                    gameTime += dt;

                    currentTime = new Date().getTime();
                    Crafty.trigger("MeasureFrameTime", currentTime - lastFrameTime);
                }

                //If any frames were processed, render the results
                if (loops > 0) {
                    drawTimeStart = currentTime;
                    Crafty.trigger("PreRender"); // Pre-render setup opportunity
                    Crafty.trigger("RenderScene");
                    Crafty.trigger("PostRender"); // Post-render cleanup opportunity
                    currentTime = new Date().getTime();
                    Crafty.trigger("MeasureRenderTime", currentTime - drawTimeStart);
                }

                endTime = currentTime;
            },
            /**@
             * #Crafty.timer.FPS
             * @comp Crafty.timer
             * @sign public void Crafty.timer.FPS()
             * Returns the target frames per second. This is not an actual frame rate.
             * @sign public void Crafty.timer.FPS(Number value)
             * @param value - the target rate
             * @trigger FPSChange - Triggered when the target FPS is changed by user - Number - new target FPS
             *
             * Sets the target frames per second. This is not an actual frame rate.
             * The default rate is 50.
             */
            FPS: function (value) {
                if (typeof value == "undefined")
                    return FPS;
                else {
                    FPS = value;
                    milliSecPerFrame = 1000 / FPS;
                    Crafty.trigger("FPSChange", value);
                }
            },

            /**@
             * #Crafty.timer.simulateFrames
             * @comp Crafty.timer
             * @sign public this Crafty.timer.simulateFrames(Number frames[, Number timestep])
             * Advances the game state by a number of frames and draws the resulting stage at the end. Useful for tests and debugging.
             * @param frames - number of frames to simulate
             * @param timestep - the duration to pass each frame.  Defaults to milliSecPerFrame (20 ms) if not specified.
             */
            simulateFrames: function (frames, timestep) {
                if (typeof timestep === "undefined")
                    timestep = milliSecPerFrame;
                while (frames-- > 0) {
                    var frameData = {
                        frame: frame++,
                        dt: timestep
                    };
                    Crafty.trigger("EnterFrame", frameData);
                    Crafty.trigger("ExitFrame", frameData);
                }
                Crafty.trigger("PreRender");
                Crafty.trigger("RenderScene");
                Crafty.trigger("PostRender");
            }
        };
    })(),


    /**@
     * #Crafty.e
     * @category Core
     * @trigger NewEntity - When the entity is created and all components are added - { id:Number }
     * @sign public Entity Crafty.e(String componentList)
     * @param componentList - List of components to assign to new entity
     * @sign public Entity Crafty.e(String component1[, .., String componentN])
     * @param component# - Component to add
     *
     * Creates an entity. Any arguments will be applied in the same
     * way `.addComponent()` is applied as a quick way to add components.
     *
     * Any component added will augment the functionality of
     * the created entity by assigning the properties and methods from the component to the entity.
     *
     * @example
     * ~~~
     * var myEntity = Crafty.e("2D, DOM, Color");
     * ~~~
     *
     * @see Crafty.c
     */
    e: function () {
        var id = UID();
        entities[id] = null;
        entities[id] = Crafty(id);

        if (arguments.length > 0) {
            entities[id].addComponent.apply(entities[id], arguments);
        }
        entities[id].setName('Entity #' + id); //set default entity human readable name
        entities[id].addComponent("obj"); //every entity automatically assumes obj

        Crafty.trigger("NewEntity", {
            id: id
        });

        return entities[id];
    },

    /**@
     * #Crafty.c
     * @category Core
     * @sign public void Crafty.c(String name, Object component)
     * @param name - Name of the component
     * @param component - Object with the component's properties and methods
     *
     * Creates a component where the first argument is the ID and the second
     * is the object that will be inherited by entities.
     *
     * Specifically, each time a component is added to an entity, the component properties are copied over to the entity. 
     * * In the case of primitive datatypes (booleans, numbers, strings) the property is copied by value.
     * * In the case of complex datatypes (objects, arrays, functions) the property is copied by reference and will thus reference the components' original property.
     * * (See the two examples below for further explanation)
     * Note that when a component method gets called, the `this` keyword will refer to the current entity the component was added to.
     *
     * A handful of methods or properties are treated specially. They are invoked in partiular contexts, and (in those contexts) cannot be overridden by other components.
     *
     * - `required`: A string listing required components, which will be added to the component before `init()` runs.
     * - `init`: A function to be called when the component is added to an entity
     * - `remove`: A function which will be called just before a component is removed, or before an entity is destroyed. It is passed a single boolean parameter that is `true` if the entity is being destroyed.
     * - `events`: An object whose properties represent functions bound to events equivalent to the property names.  (See the example below.)  The binding occurs directly after the call to `init`, and will be removed directly before `remove` is called.
     *
     * In addition to these hardcoded special methods, there are some conventions for writing components.
     *
     * - Properties or methods that start with an underscore are considered private.
     * - A method with the same name as the component is considered to be a constructor
     * and is generally used when you need to pass configuration data to the component on a per entity basis.
     *
     * @example
     * ~~~
     * Crafty.c("Annoying", {
     *     _message: "HiHi",
     *     init: function() {
     *         this.bind("EnterFrame", function() { alert(this.message); });
     *     },
     *     annoying: function(message) { this.message = message; }
     * });
     *
     * Crafty.e("Annoying").annoying("I'm an orange...");
     * ~~~
     * To attach to the "EnterFrame" event using the `events` property instead:
     * ~~~
     * Crafty.c("Annoying", {
     *     _message: "HiHi",
     *     events: {
     *         "EnterFrame": function(){alert(this.message);}
     *     }
     *     annoying: function(message) { this.message = message; }
     * });
     * ~~~
     *
     *
     * @warning In the examples above the field _message is local to the entity. 
     * That is, if you create many entities with the Annoying component, they can all have different values for _message.
     * That is because it is a simple value, and simple values are copied by value. 
     * If however the field had been an object or array, 
     * the value would have been shared by all entities with the component,
     * because complex types are copied by reference in javascript.
     * This is probably not what you want and the following example demonstrates how to work around it.
     *
     * ~~~
     * Crafty.c("MyComponent", {
     *     _iAmShared: { a: 3, b: 4 },
     *     init: function() {
     *         this._iAmNotShared = { a: 3, b: 4 };
     *     },
     * });
     * ~~~
     *
     * @see Crafty.e
     */
    c: function (compName, component) {
        components[compName] = component;
    },

    /**@
     * #Crafty.trigger
     * @category Core, Events
     * @sign public void Crafty.trigger(String eventName, * data)
     * @param eventName - Name of the event to trigger
     * @param data - Arbitrary data to pass into the callback as an argument
     *
     * This method will trigger every single callback attached to the event name. This means
     * every global event and every entity that has a callback.
     *
     * @see Crafty.bind
     */
    trigger: function (event, data) {

        //  To learn how the event system functions, see the comments for Crafty._callbackMethods
        var hdl = handlers[event] || (handlers[event] = {}),
            h, callbacks;
        //loop over every object bound
        for (h in hdl) {
            // Check whether h needs to be processed
            if (!hdl.hasOwnProperty(h)) continue;
            callbacks = hdl[h];
            if (!callbacks || callbacks.length === 0) continue;

            callbacks.context._runCallbacks(event, data);
        }
    },

    /**@
     * #Crafty.bind
     * @category Core, Events
     * @sign public Function bind(String eventName, Function callback)
     * @param eventName - Name of the event to bind to
     * @param callback - Method to execute upon event triggered
     * @returns callback function which can be used for unbind
     *
     * Binds to a global event. Method will be executed when `Crafty.trigger` is used
     * with the event name.
     *
     * @see Crafty.trigger, Crafty.unbind
     */
    bind: function (event, callback) {

        // To learn how the event system functions, see the comments for Crafty._callbackMethods
        this._bindCallback(event, callback);
        return callback;
    },


    /**@
     * #Crafty.uniqueBind
     * @category Core, Events
     * @sign public Function uniqueBind(String eventName, Function callback)
     * @param eventName - Name of the event to bind to
     * @param callback - Method to execute upon event triggered
     * @returns callback function which can be used for unbind
     *
     * Works like Crafty.bind, but prevents a callback from being bound multiple times.
     *
     * @see Crafty.bind
     */
    uniqueBind: function (event, callback) {
        this.unbind(event, callback);
        return this.bind(event, callback);
    },

    /**@
     * #Crafty.one
     * @category Core, Events
     * @sign public Function one(String eventName, Function callback)
     * @param eventName - Name of the event to bind to
     * @param callback - Method to execute upon event triggered
     * @returns callback function which can be used for unbind
     *
     * Works like Crafty.bind, but will be unbound once the event triggers.
     *
     * @see Crafty.bind
     */
    one: function (event, callback) {
        var self = this;
        var oneHandler = function (data) {
            callback.call(self, data);
            self.unbind(event, oneHandler);
        };
        return self.bind(event, oneHandler);
    },

    /**@
     * #Crafty.unbind
     * @category Core, Events
     * @sign public Boolean Crafty.unbind(String eventName, Function callback)
     * @param eventName - Name of the event to unbind
     * @param callback - Function to unbind
     * @example
     * ~~~
     *    var play_gameover_sound = function () {...};
     *    Crafty.bind('GameOver', play_gameover_sound);
     *    ...
     *    Crafty.unbind('GameOver', play_gameover_sound);
     * ~~~
     *
     * The first line defines a callback function. The second line binds that
     * function so that `Crafty.trigger('GameOver')` causes that function to
     * run. The third line unbinds that function.
     *
     * ~~~
     *    Crafty.unbind('GameOver');
     * ~~~
     *
     * This unbinds ALL global callbacks for the event 'GameOver'. That
     * includes all callbacks attached by `Crafty.bind('GameOver', ...)`, but
     * none of the callbacks attached by `some_entity.bind('GameOver', ...)`.
     */
    unbind: function (event, callback) {
        //  To learn how the event system functions, see the comments for Crafty._callbackMethods
        this._unbindCallbacks(event, callback);
    },

    /**@
     * #Crafty.frame
     * @category Core
     * @sign public Number Crafty.frame(void)
     * @returns the current frame number
     */
    frame: function () {
        return frame;
    },

    components: function () {
        return components;
    },

    isComp: function (comp) {
        return comp in components;
    },

    debug: function (str) {
        // access internal variables - handlers or entities
        if (str === 'handlers') {
            return handlers;
        }
        return entities;
    },

    /**@
     * #Crafty.settings
     * @category Core
     * Modify the inner workings of Crafty through the settings.
     */
    settings: (function () {
        var states = {},
            callbacks = {};

        return {
            /**@
             * #Crafty.settings.register
             * @comp Crafty.settings
             * @sign public void Crafty.settings.register(String settingName, Function callback)
             * @param settingName - Name of the setting
             * @param callback - Function to execute when use modifies setting
             *
             * Use this to register custom settings. Callback will be executed when `Crafty.settings.modify` is used.
             *
             * @see Crafty.settings.modify
             */
            register: function (setting, callback) {
                callbacks[setting] = callback;
            },

            /**@
             * #Crafty.settings.modify
             * @comp Crafty.settings
             * @sign public void Crafty.settings.modify(String settingName, * value)
             * @param settingName - Name of the setting
             * @param value - Value to set the setting to
             *
             * Modify settings through this method.
             *
             * @see Crafty.settings.register, Crafty.settings.get
             */
            modify: function (setting, value) {
                if (!callbacks[setting]) return;
                callbacks[setting].call(states[setting], value);
                states[setting] = value;
            },

            /**@
             * #Crafty.settings.get
             * @comp Crafty.settings
             * @sign public * Crafty.settings.get(String settingName)
             * @param settingName - Name of the setting
             * @returns Current value of the setting
             *
             * Returns the current value of the setting.
             *
             * @see Crafty.settings.register, Crafty.settings.get
             */
            get: function (setting) {
                return states[setting];
            }
        };
    })(),

    /**@
     * #Crafty.defineField
     * @category Core
     * @sign public void Crafty.defineField(Object object, String property, Function getCallback, Function setCallback)
     * @param object - Object to define property on
     * @param property - Property name to assign getter & setter to
     * @param getCallback - Method to execute if the property is accessed
     * @param setCallback - Method to execute if the property is mutated
     *
     * Assigns getters and setters to the property in the given object.
     * A getter will watch a property waiting for access and will then invoke the
     * given getCallback when attempting to retrieve.
     * A setter will watch a property waiting for mutation and will then invoke the
     * given setCallback when attempting to modify.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D");
     * Crafty.defineField(ent, "customData", function() { 
     *    return this._customData; 
     * }, function(newValue) { 
     *    this._customData = newValue;
     * });
     *
     * ent.customData = "2" // set customData to 2
     * Crafty.log(ent.customData) // prints 2
     * ~~~
     * @see Crafty Core#.defineField
     */
    defineField: function(obj, prop, getCallback, setCallback) {
        Object.defineProperty(obj, prop, {
            get: getCallback,
            set: setCallback,
            configurable: false,
            enumerable: true,
        });
    },

    clone: clone
});

/**
 * Return a unique ID
 */

function UID() {
    var id = GUID++;
    //if GUID is not unique
    if (id in entities) {
        return UID(); //recurse until it is unique
    }
    return id;
}

/**@
 * #Crafty.clone
 * @category Core
 * @sign public Object .clone(Object obj)
 * @param obj - an object
 *
 * Deep copy (a.k.a clone) of an object.
 * 
 * @example
 * ~~~
 * // Null or Primitive types
 * Crafty.clone(null); // returns null
 * Crafty.clone(4);    // returns 4
 * 
 * // Objects
 * var globalCount = 0;
 * var obj1 = {
 *   count: 0,
 *   inc: function(){
 *      this.count++;
 *      globalCount++;
 *   },
 *   log: function(){
 *     console.log(this.count + '/' + globalCount);
 *   }
 * };
 * 
 * obj1.inc();
 * obj1.log(); // prints "1/1" to the log
 * 
 * var obj2 = Crafty.clone(obj1);
 * obj2.log(); // prints "1/1" to the log
 * 
 * obj1.inc();
 * obj1.log(); // prints "2/2" to the log
 * obj2.log(); // prints "1/2" to the log
 * ~~~
 */

function clone(obj) {
    if (obj === null || typeof (obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for (var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

// export Crafty
if (typeof define === 'function') { // AMD
    define('crafty', [], function () {
        return Crafty;
    });
}

module.exports = Crafty;

},{"./version":16}],8:[function(require,module,exports){
(function (process){
var Crafty = require('./core');
var document = (typeof window !== "undefined") && window.document;

/**@
 * #Crafty.support
 * @category Misc, Core
 * Determines feature support for what Crafty can do.
 */
(function testSupport() {
    var support = Crafty.support = {},
        ua = (typeof navigator !== "undefined" && navigator.userAgent.toLowerCase()) || (typeof process !== "undefined" && process.version),
        match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(o)pera(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
            /(ms)ie ([\w.]+)/.exec(ua) ||
            /(moz)illa(?:.*? rv:([\w.]+))?/.exec(ua) ||
            /(v)\d+\.(\d+)/.exec(ua) || [],
        mobile = /iPad|iPod|iPhone|Android|webOS|IEMobile/i.exec(ua);

    /**@
     * #Crafty.mobile
     * @comp Crafty.device
     *
     * Determines if Crafty is running on mobile device.
     *
     * If Crafty.mobile is equal true Crafty does some things under hood:
     * ~~~
     * - set viewport on max device width and height
     * - set Crafty.stage.fullscreen on true
     * - hide window scrollbars
     * ~~~
     *
     * @see Crafty.viewport
     */
    if (mobile) Crafty.mobile = mobile[0];

    /**@
     * #Crafty.support.defineProperty
     * @comp Crafty.support
     * Is `Object.defineProperty` supported?
     */
    support.defineProperty = (function () {
        if (!('defineProperty' in Object)) return false;
        try {
            Object.defineProperty({}, 'x', {});
        } catch (e) {
            return false;
        }
        return true;
    })();

    /**@
     * #Crafty.support.audio
     * @comp Crafty.support
     * Is HTML5 `Audio` supported?
     */
    support.audio = (typeof window !== "undefined") && ('canPlayType' in document.createElement('audio'));

    /**@
     * #Crafty.support.prefix
     * @comp Crafty.support
     * Returns the browser specific prefix (`Moz`, `O`, `ms`, `webkit`, `node`).
     */
    support.prefix = (match[1] || match[0]);

    //browser specific quirks
    if (support.prefix === "moz") support.prefix = "Moz";
    if (support.prefix === "o") support.prefix = "O";
    if (support.prefix === "v") support.prefix = "node";

    if (match[2]) {
        /**@
         * #Crafty.support.versionName
         * @comp Crafty.support
         * Version of the browser
         */
        support.versionName = match[2];

        /**@
         * #Crafty.support.version
         * @comp Crafty.support
         * Version number of the browser as an Integer (first number)
         */
        support.version = +(match[2].split("."))[0];
    }

    /**@
     * #Crafty.support.canvas
     * @comp Crafty.support
     * Is the `canvas` element supported?
     */
    support.canvas = (typeof window !== "undefined") && ('getContext' in document.createElement("canvas"));

    /**@
     * #Crafty.support.webgl
     * @comp Crafty.support
     * Is WebGL supported on the canvas element?
     */
    if (support.canvas) {
        var gl;
        try {
            var c = document.createElement("canvas");
            gl = c.getContext("webgl") || c.getContext("experimental-webgl");
            gl.viewportWidth = support.canvas.width;
            gl.viewportHeight = support.canvas.height;
        } catch (e) {}
        support.webgl = !! gl;
    } else {
        support.webgl = false;
    }

    /**@
     * #Crafty.support.css3dtransform
     * @comp Crafty.support
     * Is css3Dtransform supported by browser.
     */
    support.css3dtransform = (typeof window !== "undefined") && ((typeof document.createElement("div").style.Perspective !== "undefined") || (typeof document.createElement("div").style[support.prefix + "Perspective"] !== "undefined"));

    /**@
     * #Crafty.support.deviceorientation
     * @comp Crafty.support
     * Is deviceorientation event supported by browser.
     */
    support.deviceorientation = (typeof window !== "undefined") && ((typeof window.DeviceOrientationEvent !== "undefined") || (typeof window.OrientationEvent !== "undefined"));

    /**@
     * #Crafty.support.devicemotion
     * @comp Crafty.support
     * Is devicemotion event supported by browser.
     */
    support.devicemotion = (typeof window !== "undefined") && (typeof window.DeviceMotionEvent !== "undefined");

})();

module.exports = {
    _events: {},

    /**@
     * #Crafty.addEvent
     * @category Events, Misc
     * @sign public this Crafty.addEvent(Object ctx, HTMLElement obj, String event, Function callback)
     * @param ctx - Context of the callback or the value of `this`
     * @param obj - Element to add the DOM event to
     * @param event - Event name to bind to
     * @param callback - Method to execute when triggered
     *
     * Adds DOM level 3 events to elements. The arguments it accepts are the call
     * context (the value of `this`), the DOM element to attach the event to,
     * the event name (without `on` (`click` rather than `onclick`)) and
     * finally the callback method.
     *
     * If no element is passed, the default element will be `window.document`.
     *
     * Callbacks are passed with event data.
     *
     * @note This is related to DOM events only,  not Crafty's own event system.  
     * Of course, you can trigger Crafty events in the callback function!
     *
     * @example
     * Normally you'd use Crafty's built-in mouse component, but for the sake of an example let's pretend that doesn't exist.  
     * The following code will add a stage-wide MouseDown event listener to the player, and log both which button was pressed
     * and the (x,y) coordinates in viewport/world/game space.
     * ~~~
     * var player = Crafty.e("2D");
     *     player.onMouseDown = function(e) {
     *         Crafty.log(e.mouseButton, e.realX, e.realY);
     *     };
     * Crafty.addEvent(player, Crafty.stage.elem, "mousedown", player.onMouseDown);
     * ~~~
     * @see Crafty.removeEvent
     */
    addEvent: function (ctx, obj, type, callback) {
        if (arguments.length === 3) {
            callback = type;
            type = obj;
            obj = window.document;
        }

        //save anonymous function to be able to remove
        var afn = function (e) {
            callback.call(ctx, e);
        },
            id = ctx[0] || "";

        if (!this._events[id + obj + type + callback]) 
            this._events[id + obj + type + callback] = afn;
        else  {
            return;
        }

        obj.addEventListener(type, afn, false);
        
    },

    /**@
     * #Crafty.removeEvent
     * @category Events, Misc
     * @sign public this Crafty.removeEvent(Object ctx, HTMLElement obj, String event, Function callback)
     * @param ctx - Context of the callback or the value of `this`
     * @param obj - Element the event is on
     * @param event - Name of the event
     * @param callback - Method executed when triggered
     *
     * Removes events attached by `Crafty.addEvent()`. All parameters must
     * be the same that were used to attach the event including a reference
     * to the callback method.
     *
     * @see Crafty.addEvent
     */
    removeEvent: function (ctx, obj, type, callback) {
        if (arguments.length === 3) {
            callback = type;
            type = obj;
            obj = window.document;
        }

        //retrieve anonymous function
        var id = ctx[0] || "",
            afn = this._events[id + obj + type + callback];

        if (afn) {
            obj.removeEventListener(type, afn, false);
            delete this._events[id + obj + type + callback];
        }
    },

    /**@
     * #Crafty.background
     * @category Graphics, Stage
     * @sign public void Crafty.background(String style)
     * @param style - Modify the background with a color or image
     *
     * This method is a shortcut for adding a background
     * style to the stage element, i.e.
     * `Crafty.stage.elem.style.background = ...`
     * 
     * For example, if you want the background to be white,
     * with an image in the center, you might use:
     * ~~~
     * Crafty.background('#FFFFFF url(landscape.png) no-repeat center center');
     * ~~~
     *  
     */
    background: function (style) {
        Crafty.stage.elem.style.background = style;
    }
};

}).call(this,require('_process'))
},{"./core":7,"_process":1}],9:[function(require,module,exports){
var Crafty = require('../core/core.js');

module.exports = {
    /**@
     * #Crafty.assets
     * @category Assets
     * An object containing every asset used in the current Crafty game.
     * The key is the URL and the value is the `Audio` or `Image` object.
     *
     * If loading an asset, check that it is in this object first to avoid loading twice.
     *
     * @example
     * ~~~
     * var isLoaded = !!Crafty.assets["images/sprite.png"];
     * ~~~
     * @see Crafty.load
     */
    assets: {},
    __paths: { audio: "", images: "" },
    /**@
     * #Crafty.paths
     * @category Assets
     * @sign public void Crafty.paths([Object paths])
     * @param paths - Object containing paths for audio and images folders
     *
     * Function to define custom folder for audio and images. You should use
     * this function to avoid typing the same paths again and again when
     * loading assets with the Crafty.load() function.
     *
     * If you do not give a object you get the current paths for both audio
     * and images back.
     *
     * You do not have to define paths.
     *
     * @example
     *
     *
     * Setting folders:
     * ~~~
     * Crafty.paths({ audio: "custom/audio/path/", images: "custom/images/path/" });
     *
     * Crafty.load({
     *   "audio": {
     *     "ray": ['ray.mp3'] // This loads ray.mp3 from custom/audio/path/ray.mp3
     *   }
     * }, function() {
     *   Crafty.log('loaded');
     * });
     * ~~~
     *
     * @see Crafty.load
     */
    paths: function(p) {
        if (typeof p === "undefined") {
            return this.__paths;
        } else {
            if(p.audio)
                this.__paths.audio = p.audio;
            if(p.images)
                this.__paths.images = p.images;
        }
    },

    /**@
     * #Crafty.asset
     * @category Assets
     * @trigger NewAsset - After setting new asset - Object - key and value of new added asset.
     * @sign public void Crafty.asset(String key, Object asset)
     * @param key - asset url.
     * @param asset - `Audio` or `Image` object.
     *
     * Add new asset to assets object.
     *
     * @sign public void Crafty.asset(String key)
     * @param key - asset url.
     *
     *
     * Get asset from assets object.
     *
     * @example
     * ~~~
     * Crafty.asset(key, value);
     * var asset = Crafty.asset(key); //object with key and value fields
     * ~~~
     *
     * @see Crafty.assets
     */
    asset: function (key, value) {
        if (arguments.length === 1) {
            return Crafty.assets[key];
        }

        if (!Crafty.assets[key]) {
            Crafty.assets[key] = value;
            this.trigger("NewAsset", {
                key: key,
                value: value
            });
            return value;
        }
    },
    /**@
     * #Crafty.image_whitelist
     * @category Assets
     *
     * A list of file extensions that can be loaded as images by Crafty.load
     *
     * @example
     * ~~~
     * // add tif extension to list of supported image files
     * Crafty.image_whitelist.push("tif");
     *
     * var assets = {
     *     "sprites": {
     *         "sprite.tif": {   //set a tif sprite
     *            "tile": 64,
     *            "tileh": 32,
     *            "map": { "sprite_car": [0, 0] }
     *         }
     *     },
     *     "audio": {
     *         "jump": "jump.mp3";
     *     }
     * };
     *
     * Crafty.load( assets, // preload the assets
     *     function() {     //when loaded
     *         Crafty.audio.play("jump"); //Play the audio file
     *         Crafty.e('2D, DOM, sprite_car'); // create entity with sprite
     *     },
     *
     *     function(e) { //progress
     *     },
     *
     *     function(e) { //uh oh, error loading
     *     }
     * );
     * ~~~
     *
     * @see Crafty.asset
     * @see Crafty.load
     */
    image_whitelist: ["jpg", "jpeg", "gif", "png", "svg"],
    /**@
     * #Crafty.load
     * @category Assets
     * @sign public void Crafty.load(Object assets, Function onLoad[, Function onProgress[, Function onError]])
     * @param assets - Object JSON formatted (or JSON string), with assets to load (accepts sounds, images and sprites)
     * @param onLoad - Callback when the assets are loaded
     * @param onProgress - Callback when an asset is loaded. Contains information about assets loaded
     * @param onError - Callback when an asset fails to load
     *
     * Preloader for all assets. Takes a JSON formatted object (or JSON string) of files and adds them to the
     * `Crafty.assets` object, as well as setting sprites accordingly.
     *
     * Format must follow the pattern shown in the example below, but it's not required to pass all "audio",
     * "images" and "sprites" properties, only those you'll need. For example, if you don't need to preload
     * sprites, you can omit that property.
     *
     * By default, Crafty will assume all files are in the current path.  For changing these,
     * use the function `Crafty.paths`.
     *
     * Files with suffixes in `image_whitelist` (case insensitive) will be loaded.
     *
     * It's possible to pass the full file path(including protocol), instead of just the filename.ext, in case
     * you want some asset to be loaded from another domain.
     *
     * If `Crafty.support.audio` is `true`, files with the following suffixes `mp3`, `wav`, `ogg` and
     * `mp4` (case insensitive) can be loaded.
     *
     * The `onProgress` function will be passed on object with information about
     * the progress including how many assets loaded, total of all the assets to
     * load and a percentage of the progress.
     * ~~~
     * { loaded: j, total: total, percent: (j / total * 100), src:src }
     * ~~~
     *
     * `onError` will be passed with the asset that couldn't load.
     *
     * When `onError` is not provided, the onLoad is loaded even when some assets are not successfully loaded.
     * Otherwise, onLoad will be called no matter whether there are errors or not.
     *
     * @example
     * ~~~
     * var assetsObj = {
     *     "audio": {
     *         "beep": ["beep.wav", "beep.mp3", "beep.ogg"],
     *         "boop": "boop.wav",
     *         "slash": "slash.wav"
     *     },
     *     "images": ["badguy.bmp", "goodguy.png"],
     *     "sprites": {
     *         "animals.png": {
     *             "tile": 50,
     *             "tileh": 40,
     *             "map": { "ladybug": [0,0], "lazycat": [0,1], "ferociousdog": [0,2] }
     *             "paddingX": 5,
     *             "paddingY": 5,
     *             "paddingAroundBorder": 10
     *         },
     *         "vehicles.png": {
     *             "tile": 150,
     *             "tileh": 75,
     *             "map": { "car": [0,0], "truck": [0,1] }
     *         }
     *     },
     * };
     *
     * Crafty.load(assetsObj, // preload assets
     *     function() { //when loaded
     *         Crafty.scene("main"); //go to main scene
     *         Crafty.audio.play("boop"); //Play the audio file
     *         Crafty.e('2D, DOM, lazycat'); // create entity with sprite
     *     },
     *
     *     function(e) { //progress
     *     },
     *
     *     function(e) { //uh oh, error loading
     *     }
     * );
     * ~~~
     *
     * @see Crafty.paths
     * @see Crafty.assets
     * @see Crafty.image_whitelist
     * @see Crafty.removeAssets
     */
    load: function (data, oncomplete, onprogress, onerror) {

        if (Array.isArray(data)) {
            Crafty.log("Calling Crafty.load with an array of assets no longer works; see the docs for more details.");
        }

        data = (typeof data === "string" ? JSON.parse(data) : data);

        var j = 0,
            total = (data.audio ? Object.keys(data.audio).length : 0) +
              (data.images ? Object.keys(data.images).length : 0) +
              (data.sprites ? Object.keys(data.sprites).length : 0),
            current, fileUrl, obj, type, asset,
            audSupport = Crafty.support.audio,
            paths = Crafty.paths(),
            getExt = function(f) {
                return f.substr(f.lastIndexOf('.') + 1).toLowerCase();
            },
            getFilePath = function(type,f) {
                return (f.search("://") === -1 ? (type == "audio" ? paths.audio + f : paths.images + f) : f);
            },
            // returns null if 'a' is not already a loaded asset, obj otherwise
            isAsset = function(a) {
                return Crafty.asset(a) || null;
            },
            isSupportedAudio = function(f) {
                return Crafty.audio.supports(getExt(f));
            },
            isValidImage = function(f) {
                return Crafty.image_whitelist.indexOf(getExt(f)) != -1;
            },
            onImgLoad = function(obj,url) {
                obj.onload = pro;
                if (Crafty.support.prefix === 'webkit')
                    obj.src = ""; // workaround for webkit bug
                obj.src = url;
            };

        //Progress function

        function pro() {
            var src = this.src;

            //Remove events cause audio trigger this event more than once(depends on browser)
            if (this.removeEventListener)
                this.removeEventListener('canplaythrough', pro, false);

            j++;
            //if progress callback, give information of assets loaded, total and percent
            if (onprogress)
                onprogress({
                    loaded: j,
                    total: total,
                    percent: (j / total * 100),
                    src: src
                });

            if (j === total && oncomplete) oncomplete();
        }
        //Error function

        function err() {
            var src = this.src;
            if (onerror)
                onerror({
                    loaded: j,
                    total: total,
                    percent: (j / total * 100),
                    src: src
                });

            j++;
            if (j === total && oncomplete) oncomplete();
        }

        for (type in data) {
            for(asset in data[type]) {
                if (!data[type].hasOwnProperty(asset))
                    continue; // maintain compatibility to other frameworks while iterating array

                current = data[type][asset];

                if (type === "audio" && audSupport) {
                    if (typeof current === "object") {
                        var files = [];
                        for (var i in current) {
                            fileUrl = getFilePath(type, current[i]);
                            if (!isAsset(fileUrl) && isSupportedAudio(current[i]))
                                files.push(fileUrl);
                        }
                        obj = Crafty.audio.add(asset, files).obj;
                    }
                    else if (typeof current === "string" && isSupportedAudio(current)) {
                        fileUrl = getFilePath(type, current);
                        if (!isAsset(fileUrl))
                            obj = Crafty.audio.add(asset, fileUrl).obj;
                    }

                    //addEventListener is supported on IE9 , Audio as well
                    if (obj && obj.addEventListener)
                        obj.addEventListener('canplaythrough', pro, false);
                } else {
                    asset = (type === "sprites" ? asset : current);
                    fileUrl = getFilePath(type, asset);
                    if (isValidImage(asset)) {
                        obj = isAsset(fileUrl);
                        if (!obj) {
                            obj = new Image();
                            if (type === "sprites")
                                Crafty.sprite(current.tile, current.tileh, fileUrl, current.map,
                                  current.paddingX, current.paddingY, current.paddingAroundBorder);
                            Crafty.asset(fileUrl, obj);
                        }
                        onImgLoad(obj, fileUrl);
                    }
                }
                if (obj)
                    obj.onerror = err;
                else
                    --total;
            }
        }

        // If we aren't trying to handle *any* of the files, that's as complete as it gets!
        if (total === 0)
            oncomplete();

    },
    /**@
     * #Crafty.removeAssets
     * @category Assets
     *
     * @sign public void Crafty.removeAssets(Object assets)
     * @param data - Object JSON formatted (or JSON string), with assets to remove (accepts sounds, images and sprites)
     *
     * Removes assets (audio, images, sprites - and related sprite components) in order to allow the browser
     * to free memory.
     *
     * Recieves a JSON fomatted object (or JSON string) containing 'audio', 'images' and/or 'sprites'
     * properties with assets to be deleted. Follows a similar format as Crafty.load 'data' argument. If
     * you pass the exact same object passed to Crafty.load, that will delete everything loaded that way.
     * For sprites, if you want to keep some specific component, just don't pass that component's name in
     * the sprite 'map'.
     *
     * Note that in order to remove the sprite components related to a given sprite, it's required to
     * pass the 'map' property of that sprite, and although its own properties's values (the properties refer
     * to sprite components) are not used in the removing process, omitting them will cause an error (since
     * 'map' is an object, thus it's properties can NOT omitted - however, they can be null, or undefined).
     * It will work as long as the 'map' objects' properties have any value. Or if you define 'map' itself
     * as an array, like:
     * "map": [ "car", "truck" ] instead of "map": { "car": [0,0], "truck": [0,1] }.
     * This is examplified below ("animals.png" VS. "vehicles.png" sprites).
     *
     * @example
     * ~~~
     * var assetsToRemoveObj = {
     *     "audio": {
     *         "beep": ["beep.wav", "beep.mp3", "beep.ogg"],
     *         "boop": "boop.wav"
     *     },
     *     "images": ["badguy.bmp", "goodguy.png"],
     *     "sprites": {
     *         "animals.png": {
     *             "map": { "ladybug": [0,0], "lazycat": [0,1] },
     *         },
     *         "vehicles.png": {
     *             "map": [ "car", "truck" ]
     *         }
     *     }
     * }
     *
     * Crafty.removeAssets(assetsToRemoveObj);
     * ~~~
     *
     * @see Crafty.load
     */
    removeAssets: function(data) {

        data = (typeof data === "string" ? JSON.parse(data) : data);

        var current, fileUrl, type, asset,
            paths = Crafty.paths(),
            getFilePath = function(type,f) {
                return (f.search("://") === -1 ? (type == "audio" ? paths.audio + f : paths.images + f) : f);
            };

        for (type in data) {
            for (asset in data[type]) {
                if (!data[type].hasOwnProperty(asset))
                    continue; // maintain compatibility to other frameworks while iterating array

                current = data[type][asset];

                if (type === "audio") {
                    if (typeof current === "object") {
                        for (var i in current) {
                            fileUrl = getFilePath(type, current[i]);
                            if (Crafty.asset(fileUrl))
                                Crafty.audio.remove(asset);
                        }
                    }
                    else if (typeof current === "string") {
                        fileUrl = getFilePath(type, current);
                        if (Crafty.asset(fileUrl))
                            Crafty.audio.remove(asset);
                    }
                } else {
                    asset = (type === "sprites" ? asset : current);
                    fileUrl = getFilePath(type, asset);
                    if (Crafty.asset(fileUrl)) {
                        if (type === "sprites")
                            for (var comp in current.map)
                                delete Crafty.components()[comp];
                        delete Crafty.assets[fileUrl];
                    }
                }
            }
        }
    }
};

},{"../core/core.js":7}],10:[function(require,module,exports){
/**@
 * #Model
 * @category Model
 * Model is a component that offers new features for isolating business
 * logic in your application. It offers default values, dirty values,
 * and deep events on your data.
 *
 * All data should be accessed via the appropriate methods `.get`, `.set`,
 * and `.data` for the proper events to be triggered. It is not encouraged
 * to access them directly.
 *
 * Dirty values make it simple to inspect a model and see what values have changed.
 *
 * Deep events allow you to bind to specific fields, like `name` or even deep fields
 * like `contact.email` and get notified when those specific fields are updated.
 *
 * @trigger Change - When any data on the model has changed.
 * @trigger Change[key] - When the specific key on the model has changed.
 * @trigger Change[key.key] - The nested key value has changed.
 * @example
 * ~~~
 * Crafty.c('Person', {
 *   name: 'Fox',
 *   init: function() { this.requires('Model'); }
 * });
 * person = Crafty.e('Person').attr({name: 'blaine'});
 * person.bind('Change[name]', function() {
 *   Crafty.log('name changed!');
 * });
 * person.attr('name', 'blainesch'); // Triggers event
 * person.is_dirty('name'); // true
 * person.changed // name
 * ~~~
 */
module.exports = {
  init: function() {
    this.changed = [];
    this.bind('Change', this._changed_attributes);
    this.bind('Change', this._changed_triggers);
  },

  /**
   * Fires more specific `Change` events.
   *
   * For instance a `Change[name]` may get fired when you
   * update the name data attribute on the model.
   */
  _changed_triggers: function(data, options) {
    var key, trigger_data;
    options = Crafty.extend.call({pre: ''}, options);
    for (key in data) {
      this.trigger('Change[' + options.pre + key + ']', data[key]);
      if (data[key].constructor === Object) {
        this._changed_triggers(data[key], {
          pre: options.pre + key + '.'
        });
      }
    }
  },

  /**
   * Pushes all top-levle changed attribute names to the
   * changed array.
   */
  _changed_attributes: function(data) {
    var key;
    for (key in data) {
      this.changed.push(key);
    }
    return this;
  },

  /**@
   * #.is_dirty
   * @comp Model
   * Helps determine when data or the entire component is "dirty" or has changed attributes.
   *
   * @example
   * ~~~
   * person = Crafty.e('Person').attr({name: 'Fox', age: 24})
   * person.is_dirty() // false
   * person.is_dirty('name') // false
   *
   * person.attr('name', 'Lucky');
   * person.is_dirty(); // true
   * person.is_dirty('name'); // true
   * person.is_dirty('age'); // false
   * person.changed; // ['name']
   * ~~~
   */
  is_dirty: function(key) {
    if (arguments.length === 0) {
      return !!this.changed.length;
    } else {
      return this.changed.indexOf(key) > -1;
    }
  }
};


},{}],11:[function(require,module,exports){
var Crafty = require('../core/core.js');


module.exports = {
    _scenes: {},
    _current: null,

    /**@
     * #Crafty.scene
     * @category Scenes, Stage
     * @trigger SceneChange - just before a new scene is initialized - { oldScene:String, newScene:String }
     * @trigger SceneDestroy - just before the current scene is destroyed - { newScene:String  }
     *
     * @sign public void Crafty.scene(String sceneName, Function init[, Function uninit])
     * @param sceneName - Name of the scene to add
     * @param init - Function to execute when scene is played
     * @param uninit - Function to execute before next scene is played, after entities with `2D` are destroyed
     *
     * This is equivalent to calling `Crafty.defineScene`.
     *
     * @sign public void Crafty.scene(String sceneName[, Data])
     * @param sceneName - Name of scene to play
     * @param Data - The init function of the scene will be called with this data as its parameter.  Can be of any type other than a function.
     *
     * This is equivalent to calling `Crafty.enterScene`.
     *
     * Method to create scenes on the stage. Pass an ID and function to register a scene.
     *
     * To play a scene, just pass the ID. When a scene is played, all
     * previously-created entities with the `2D` component are destroyed. The
     * viewport is also reset.
     *
     * You can optionally specify an arugment that will be passed to the scene's init function.
     *
     * If you want some entities to persist over scenes (as in, not be destroyed)
     * simply add the component `Persist`.
     *
     * @example
     * ~~~
     * Crafty.defineScene("loading", function() {
     *     Crafty.background("#000");
     *     Crafty.e("2D, DOM, Text")
     *           .attr({ w: 100, h: 20, x: 150, y: 120 })
     *           .text("Loading")
     *           .css({ "text-align": "center"})
     *           .textColor("#FFFFFF");
     * });
     *
     * Crafty.defineScene("UFO_dance",
     *              function() {Crafty.background("#444"); Crafty.e("UFO");},
     *              function() {...send message to server...});
     *
     * // An example of an init function which accepts arguments, in this case an object.
     * Crafty.defineScene("square", function(attributes) {
     *     Crafty.background("#000");
     *     Crafty.e("2D, DOM, Color")
     *           .attr(attributes)
     *           .color("red");
     * 
     * });
     *
     * ~~~
     * This defines (but does not play) two scenes as discussed below.
     * ~~~
     * Crafty.enterScene("loading");
     * ~~~
     * This command will clear the stage by destroying all `2D` entities (except
     * those with the `Persist` component). Then it will set the background to
     * black and display the text "Loading".
     * ~~~
     * Crafty.enterScene("UFO_dance");
     * ~~~
     * This command will clear the stage by destroying all `2D` entities (except
     * those with the `Persist` component). Then it will set the background to
     * gray and create a UFO entity. Finally, the next time the game encounters
     * another command of the form `Crafty.scene(scene_name)` (if ever), then the
     * game will send a message to the server.
     * ~~~
     * Crafty.enterScene("square", {x:10, y:10, w:20, h:20});
     * ~~~
     * This will clear the stage, set the background black, and create a red square with the specified position and dimensions.
     * ~~~
     */
    scene: function (name, intro, outro) {
        // If there's one argument, or the second argument isn't a function, play the scene
        if (arguments.length === 1 || typeof(arguments[1]) !== "function") {
            Crafty.enterScene(name, arguments[1]);
            return;
        }
        // Otherwise, this is a call to create a scene
        Crafty.defineScene(name, intro, outro);
    },

    /* 
     * #Crafty.defineScene
     * @category Scenes, Stage
     *
     * @sign public void Crafty.enterScene(String name[, Data])
     * @param name - Name of the scene to run.
     * @param Data - The init function of the scene will be called with this data as its parameter.  Can be of any type other than a function.
     *
     * @see Crafty.enterScene
     * @see Crafty.scene
     */
    defineScene: function(name, init, uninit){
        if (typeof init !== "function")
            throw("Init function is the wrong type.");
        this._scenes[name] = {};
        this._scenes[name].initialize = init;
        if (typeof uninit !== 'undefined') {
            this._scenes[name].uninitialize = uninit;
        }
        return;

    },

    /* 
     * #Crafty.enterScene
     * @category Scenes, Stage
     * @trigger SceneChange - just before a new scene is initialized - { oldScene:String, newScene:String }
     * @trigger SceneDestroy - just before the current scene is destroyed - { newScene:String  }
     *
     * @sign public void Crafty.enterScene(String name[, Data])
     * @param name - Name of the scene to run.
     * @param Data - The init function of the scene will be called with this data as its parameter.  Can be of any type other than a function.
     * 
     * @see Crafty.defineScene
     * @see Crafty.scene
     */
    enterScene: function(name, data){
        if (typeof data === "function")
            throw("Scene data cannot be a function");

        // ---FYI---
        // this._current is the name (ID) of the scene in progress.
        // this._scenes is an object like the following:
        // {'Opening scene': {'initialize': fnA, 'uninitialize': fnB},
        //  'Another scene': {'initialize': fnC, 'uninitialize': fnD}}

        Crafty.trigger("SceneDestroy", {
            newScene: name
        });
        Crafty.viewport.reset();

        Crafty("2D").each(function () {
            if (!this.has("Persist")) this.destroy();
        });
        // uninitialize previous scene
        if (this._current !== null && 'uninitialize' in this._scenes[this._current]) {
            this._scenes[this._current].uninitialize.call(this);
        }
        // initialize next scene
        var oldScene = this._current;
        this._current = name;
        Crafty.trigger("SceneChange", {
            oldScene: oldScene,
            newScene: name
        });
           
        if (this._scenes.hasOwnProperty(name)) {
            this._scenes[name].initialize.call(this, data);
        } else {
            Crafty.error('The scene "' + name + '" does not exist');
        }

        return;

    }
};

},{"../core/core.js":7}],12:[function(require,module,exports){
var Crafty = require('../core/core.js');

try {
  var storage = (typeof window !== "undefined" && window.localStorage) || (new require('node-localstorage').LocalStorage('./localStorage'));
} catch(e) {
  var storage = null;
}


/**@
 * #Storage
 * @category Utilities
 * Very simple way to get and set values, which will persist when the browser is closed also.
 * Storage wraps around HTML5 Web Storage, which is well-supported across browsers and platforms, but limited to 5MB total storage per domain.
 * Storage is also available for node, which is permanently persisted to the `./localStorage` folder - take care of removing entries. Note that multiple Crafty instances use the same storage, so care has to be taken not to overwrite existing entries.
 */
/**@
 * #Crafty.storage
 * @comp Storage
 * @sign Crafty.storage(String key)
 * @param key - a key you would like to get from the storage. 
 * @returns The stored value, or `null` if none saved under that key exists
 *
 * @sign Crafty.storage(String key, String value)
 * @param key - the key you would like to save the data under.
 * @param value - the value you would like to save.
 *
 * @sign Crafty.storage(String key, [Object value, Array value, Boolean value])
 * @param key - the key you would like to save the data under.
 * @param value - the value you would like to save, can be an Object or an Array.
 *
 * `Crafty.storage` is used synchronously to either get or set values. 
 *
 * You can store booleans, strings, objects and arrays.
 *
 * @note Because the underlying method is synchronous, it can cause slowdowns if used frequently during gameplay.
 * You should aim to load or save data at reasonable times such as on level load,
 * or in response to specific user actions.
 *
 * @note If used in a cross-domain context, the localStorage might not be accessible.
 *
 * @example
 * Get an already stored value
 * ~~~
 * var playername = Crafty.storage('playername');
 * ~~~
 *
 * @example
 * Save a value
 * ~~~
 * Crafty.storage('playername', 'Hero');
 * ~~~
 *
 * @example
 * Test to see if a value is already there.
 * ~~~
 * var heroname = Crafty.storage('name');
 * if(!heroname){
 *   // Maybe ask the player what their name is here
 *   heroname = 'Guest';
 * }
 * // Do something with heroname
 * ~~~
 */

var store = function(key, value) {
  var _value = value;

  if(!storage) {
    Crafty.error("Local storage is not accessible.  (Perhaps you are including crafty.js cross-domain?)");
    return false;
  }

  if(arguments.length === 1) {
    try {
      return JSON.parse(storage.getItem(key));
    }
    catch (e) {
      return storage.getItem(key);
    }
  } else {
    if(typeof value === "object") {
      _value = JSON.stringify(value);
    }

    storage.setItem(key, _value);
    
  }

};
/**@
 * #Crafty.storage.remove
 * @comp Storage
 * @sign Crafty.storage.remove(String key)
 * @param key - a key where you will like to delete the value of.
 *
 * Generally you do not need to remove values from localStorage, but if you do
 * store large amount of text, or want to unset something you can do that with
 * this function.
 *
 * @example
 * Get an already stored value
 * ~~~
 * Crafty.storage.remove('playername');
 * ~~~
 *
 */
store.remove = function(key) {
  if(!storage){
    Crafty.error("Local storage is not accessible.  (Perhaps you are including crafty.js cross-domain?)");
    return;
  }
  storage.removeItem(key);
};

module.exports = store;

},{"../core/core.js":7}],13:[function(require,module,exports){
var Crafty = require('../core/core.js');


// Dictionary of existing systems
Crafty._systems = {};

/**@
 * #Crafty.s
 * @category Core
 *
 * Registers a system.
 *
 * @trigger SystemLoaded - When the system has initialized itself - obj - system object
 * @trigger SystemDestroyed - Right before the system is destroyed - obj - system object
 *
 * @sign void Crafty.s(String name, Obj template[, Boolean lazy])
 * Register a system
 * @param name - The name of the system
 * @param template - an object whose methods and properties will be copied to the new system
 * @param lazy - a flag that indicates whether the system should be initialized right away or the first time it is referenced
 *
 * @sign System Crafty.s(String name)
 * Access the named system
 * @param name - The system to return
 * @returns The referenced system.  If the system has not been initialized, it will be before it is returned.
 *
 * Objects which handle entities might want to subscribe to the event system without being entities themselves.  
 * When you declare a system with a template object, all the methods and properties of that template are copied to a new object.
 * This new system will automatically have the following event related methods, which function like those of components: `.bind()`, `unbind()`, `trigger()`, `one()`, `uniqueBind()`, `destroy()`.
 * Much like components, you can also provide `init()` and `remove()` methods, as well as an `events` parameter for automatically binding to events.
 *
 * *Note*: The `init()` method is for setting up the internal state of the system -- if you create entities in it that then reference the system, that'll create an infinite loop.
 */
Crafty.s = function(name, obj, lazy) {
	if (obj) {
		if (lazy === false ) {
			Crafty._systems[name] = new Crafty.CraftySystem(name, obj);
			Crafty.trigger("SystemLoaded", name);
		} else {
			Crafty._registerLazySystem(name, obj);
		}
	} else {
		return Crafty._systems[name];
	}
};



Crafty._registerLazySystem = function(name, obj) {
	// This is a bit of magic to only init a system if it's requested at least once.
	// We define a getter for _systems[name] that will first initialize the system, 
	// and then redefine _systems[name] to ` that getter.
	Object.defineProperty(Crafty._systems, name, {
		get: function() {
			Object.defineProperty(Crafty._systems, name, { 
				value: new Crafty.CraftySystem(name, obj),
				writable: true,
				enumerable: true,
				configurable: true
			});
			Crafty.trigger("SystemLoaded", name);
			return Crafty._systems[name];
		},
		configurable: true
	});

};

// Each system has its properties and methods copied onto an object of this type
Crafty.CraftySystem = (function(){
	systemID = 1;
	return function(name, template) {
		this.name = name;
		if (!template) return this;
		this._systemTemplate = template;
		this.extend(template);

		// Add the "low leveL" callback methods
		Crafty._addCallbackMethods(this);

		// Give this object a global ID.  Used for event handlers.
		this[0] = "system" + (systemID++);
		// Run any instantiation code
		if (typeof this.init === "function") {
			this.init(name);
		}
		// If an events object is provided, bind the listed event handlers
		if ("events" in template){
			var auto = template.events;
			for (var eventName in auto){
				var fn = typeof auto[eventName] === "function" ? auto[eventName] : template[auto[eventName]];
				this.bind(eventName, fn);
			}
		}
	};
})();



Crafty.CraftySystem.prototype = {
	extend: function(obj) {
		// Copy properties and methods of obj
		for (var key in obj) {
			if (typeof this[key] === "undefined") {
				this[key] = obj[key];
			}
		}
	},

	// Event methods
	bind: function(event, callback) {
		this._bindCallback(event, callback);
		return this;
	},

	trigger: function(event, data) {
		this._runCallbacks(event, data);
		return this;
	},

	unbind: function(event, callback) {
		this._unbindCallbacks(event, callback);
		return this;
	},

	one: function (event, callback) {
		var self = this;
		var oneHandler = function (data) {
			callback.call(self, data);
			self.unbind(event, oneHandler);
		};
		return self.bind(event, oneHandler);
	},

	uniqueBind: function(event, callback) {
		this.unbind(event, callback);
		return this.bind(event, callback);
	},

	destroy: function() {
		Crafty.trigger("SystemDestroyed", this);
		// Check the template itself
		if (typeof this.remove === "function") {
			this.remove();
		}
		this._unbindAll();
		delete Crafty._systems[this.name];
	}

};
},{"../core/core.js":7}],14:[function(require,module,exports){
/**@
 * #Delay
 * @category Utilities
 *
 * A component for triggering functions after a given amount of time.
 *
 * This syncs with Crafty's internal clock, and so should generally be preferred to using methods such as `setTimeout`.
 */
module.exports = {
    init: function () {
        this._delays = [];
        this.bind("EnterFrame", function (frameData) {
            var index = this._delays.length;
            while (--index >= 0) {
                var item = this._delays[index];
                if (item === false) {
                    // remove canceled item from array
                    this._delays.splice(index, 1);
                } else {
                    item.accumulator+=frameData.dt;
                    // The while loop handles the (pathological) case where dt>delay
                    while(item.accumulator >= item.delay && item.repeat >= 0){
                        item.accumulator -= item.delay;
                        item.repeat--;
                        item.callback.call(this);
                    }
                    // remove finished item from array
                    if (item.repeat<0){
                        this._delays.splice(index, 1);
                        if(typeof item.callbackOff === "function")
                            item.callbackOff.call(this);
                    }
                }
            }
        });

    },
    /**@
     * #.delay
     * @comp Delay
     * @sign public this.delay(Function callback, Number delay[, Number repeat[, Function callbackOff]])
     * @param callback - Method to execute after given amount of milliseconds. If reference of a
     * method is passed, there's possibility to cancel the delay.
     * @param delay - Amount of milliseconds to execute the method.
     * @param repeat - (optional) How often to repeat the delayed function. A value of 0 triggers the delayed
     * function exactly once. A value n > 0 triggers the delayed function exactly n+1 times. A
     * value of -1 triggers the delayed function indefinitely. Defaults to one execution.
     * @param callbackOff - (optional) Method to execute after delay ends(after all iterations are executed). 
     * If repeat value equals -1, callbackOff will never be triggered.
     *
     * The delay method will execute a function after a given amount of time in milliseconds.
     *
     * It is not a wrapper for `setTimeout`.
     *
     * If Crafty is paused, the delay is interrupted with the pause and then resume when unpaused
     *
     * If the entity is destroyed, the delay is also destroyed and will not have effect.
     *
     * @example
     *
     * The simplest delay
     * ~~~
     * Crafty.log("start");
     * Crafty.e("Delay").delay(function() {
     *   Crafty.log("100ms later");
     * }, 100, 0);
     * ~~~
     *
     * Delay with callbackOff to be executed after all delay iterations
     * ~~~
     * Crafty.log("start");
     * Crafty.e("Delay").delay(function() {
     *   Crafty.log("100ms later");
     * }, 100, 3, function() {
     *   Crafty.log("delay finished");
     * });
     * ~~~
     *
     */
    delay: function (callback, delay, repeat, callbackOff) {
        this._delays.push({
            accumulator: 0,
            callback: callback,
            callbackOff: callbackOff,
            delay: delay,
            repeat: (repeat < 0 ? Infinity : repeat) || 0,
        });
        return this;
    },
    /**@
     * #.cancelDelay
     * @comp Delay
     * @sign public this.cancelDelay(Function callback)
     * @param callback - Method reference passed to .delay
     *
     * The cancelDelay method will cancel a delay set previously.
     *
     * @example
     * ~~~
     * var doSomething = function(){
     *   Crafty.log("doing something");
     * };
     *
     * // execute doSomething each 100 miliseconds indefinetely
     * var ent = Crafty.e("Delay").delay(doSomething, 100, -1);
     *
     * // and some time later, cancel further execution of doSomething
     * ent.cancelDelay(doSomething);
     * ~~~
     */
    cancelDelay: function (callback) {
        var index = this._delays.length;
        while (--index >= 0) {
            var item = this._delays[index];
            if(item && item.callback == callback){
                this._delays[index] = false;
            }
        }
        return this;
    }
};

},{}],15:[function(require,module,exports){
/**@
 * #Tween
 * @category Animation
 * @trigger TweenEnd - when a tween finishes - String - property
 *
 * Component to animate the change in 2D properties over time.
 */
module.exports = {

  init: function(){
    this.tweenGroup = {};
    this.tweenStart = {};
    this.tweens = [];
    this.uniqueBind("EnterFrame", this._tweenTick);

  },

  _tweenTick: function(frameData){
    var tween, v, i;
    for ( i = this.tweens.length-1; i>=0; i--){
      tween = this.tweens[i];
      tween.easing.tick(frameData.dt);
      v  = tween.easing.value();
      this._doTween(tween.props, v);
      if (tween.easing.complete) {
        this.tweens.splice(i, 1);
        this._endTween(tween.props);
      }
    }
  },

  _doTween: function(props, v){
    for (var name in props)
      this[name] = (1-v) * this.tweenStart[name] + v * props[name];

  },



  /**@
  * #.tween
  * @comp Tween
  * @sign public this .tween(Object properties, Number duration[, String|function easingFn])
  * @param properties - Object of numeric properties and what they should animate to
  * @param duration - Duration to animate the properties over, in milliseconds.
  * @param easingFn - A string or custom function specifying an easing.  (Defaults to linear behavior.)  See Crafty.easing for more information.
  *
  * This method will animate numeric properties over the specified duration.
  * These include `x`, `y`, `w`, `h`, `alpha` and `rotation`.
  *
  * The object passed should have the properties as keys and the value should be the resulting
  * values of the properties.  The passed object might be modified if later calls to tween animate the same properties.
  *
  * @example
  * Move an object to 100,100 and fade out over 200 ms.
  * ~~~
  * Crafty.e("2D, Tween")
  *    .attr({alpha: 1.0, x: 0, y: 0})
  *    .tween({alpha: 0.0, x: 100, y: 100}, 200)
  * ~~~
  * @example
  * Rotate an object over 2 seconds, using the "smootherStep" easing function.
  * ~~~
  * Crafty.e("2D, Tween")
  *    .attr({rotation:0})
  *    .tween({rotation:180}, 2000, "smootherStep")
  * ~~~
  *
  * @see Crafty.easing
  *
  */
  tween: function (props, duration, easingFn) {

    var tween = {
      props: props,
      easing: new Crafty.easing(duration, easingFn)
    };

    // Tweens are grouped together by the original function call.
    // Individual properties must belong to only a single group
    // When a new tween starts, if it already belongs to a group, move it to the new one
    // Record the group it currently belongs to, as well as its starting coordinate.
    for (var propname in props){
      if (typeof this.tweenGroup[propname] !== "undefined")
        this.cancelTween(propname);
      this.tweenStart[propname] = this[propname];
      this.tweenGroup[propname] = props;
    }
    this.tweens.push(tween);

    return this;

  },

  /**@
  * #.cancelTween
  * @comp Tween
  * @sign public this .cancelTween(String target)
  * @param target - The property to cancel
  *
  * @sign public this .cancelTween(Object target)
  * @param target - An object containing the properties to cancel.
  *
  * Stops tweening the specified property or properties.
  * Passing the object used to start the tween might be a typical use of the second signature.
  */
  cancelTween: function(target){
    if (typeof target === "string"){
      if (typeof this.tweenGroup[target] == "object" )
        delete this.tweenGroup[target][target];
    } else if (typeof target === "object") {
      for (var propname in target)
        this.cancelTween(propname);
    }

    return this;

  },

  /**@
  * #.pauseTweens
  * @comp Tween
  * @sign public this .pauseTweens()
  *
  * Pauses all tweens associated with the entity
  */
  pauseTweens: function(){
      this.tweens.map(function(e){e.easing.pause();});
  },

  /**@
  * #.resumeTWeens
  * @comp Tween
  * @sign public this .resumeTweens()
  *
  * Resumes all paused tweens associated with the entity
  */
  resumeTweens: function(){
      this.tweens.map(function(e){e.easing.resume();});
  },

  /*
  * Stops tweening the specified group of properties, and fires the "TweenEnd" event.
  */
  _endTween: function(properties){
    for (var propname in properties){
      delete this.tweenGroup[propname];
    }
    this.trigger("TweenEnd", properties);
  }
};

},{}],16:[function(require,module,exports){
module.exports = "0.7.1";
},{}],17:[function(require,module,exports){
var Crafty = require('./core/core');

Crafty.easing = require('./core/animation');
Crafty.extend(require('./core/extensions'));
Crafty.extend(require('./core/loader'));
Crafty.c('Model', require('./core/model'));
Crafty.extend(require('./core/scenes'));
Crafty.storage = require('./core/storage');
Crafty.c('Delay', require('./core/time'));
Crafty.c('Tween', require('./core/tween'));

require('./core/systems');

require('./spatial/2d');
require('./spatial/collision');
require('./spatial/spatial-grid');
require('./spatial/rect-manager');
require('./spatial/math');

require('./graphics/canvas');
require('./graphics/canvas-layer');
require('./graphics/color');
require('./graphics/dom');
require('./graphics/dom-helper');
require('./graphics/dom-layer');
require('./graphics/drawing');
require('./graphics/gl-textures');
require('./graphics/html');
require('./graphics/image');
require('./graphics/particles');
require('./graphics/sprite-animation');
require('./graphics/sprite');
require('./graphics/text');
require('./graphics/viewport');
require('./graphics/webgl');

require('./isometric/diamond-iso');
require('./isometric/isometric');

require('./controls/inputs');
require('./controls/controls');
require('./controls/device');
require('./controls/keycodes');

require('./sound/sound');

require('./debug/debug-layer');
require('./debug/logging');

if(window) window.Crafty = Crafty;

module.exports = Crafty;

},{"./controls/controls":2,"./controls/device":3,"./controls/inputs":4,"./controls/keycodes":5,"./core/animation":6,"./core/core":7,"./core/extensions":8,"./core/loader":9,"./core/model":10,"./core/scenes":11,"./core/storage":12,"./core/systems":13,"./core/time":14,"./core/tween":15,"./debug/debug-layer":18,"./debug/logging":19,"./graphics/canvas":21,"./graphics/canvas-layer":20,"./graphics/color":22,"./graphics/dom":25,"./graphics/dom-helper":23,"./graphics/dom-layer":24,"./graphics/drawing":26,"./graphics/gl-textures":27,"./graphics/html":28,"./graphics/image":29,"./graphics/particles":30,"./graphics/sprite":32,"./graphics/sprite-animation":31,"./graphics/text":33,"./graphics/viewport":34,"./graphics/webgl":35,"./isometric/diamond-iso":36,"./isometric/isometric":37,"./sound/sound":38,"./spatial/2d":39,"./spatial/collision":40,"./spatial/math":41,"./spatial/rect-manager":42,"./spatial/spatial-grid":43}],18:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

/**@
 * #DebugCanvas
 * @category Debug
 * @trigger Draw - when the entity is ready to be drawn to the stage
 * @trigger NoCanvas - if the browser does not support canvas
 *
 * When this component is added to an entity it will be drawn by the DebugCanvas layer.
 *
 * Crafty.debugCanvas.init() will be automatically called if it is not called already to initialize the canvas element.
 *
 * To visualise an object's MBR, use "VisibleMBR".  To visualise a "Collision" object's hitbox, use "WiredHitBox" or "SolidHitBox".
 * @see DebugPolygon,  DebugRectangle
 */
Crafty.c("DebugCanvas", {
    init: function () {
        this.requires("2D");
        if (!Crafty.DebugCanvas.context)
            Crafty.DebugCanvas.init();
        Crafty.DebugCanvas.add(this);
        this._debug = {
            alpha: 1.0,
            lineWidth: 1
        };
        this.bind("RemoveComponent", this.onDebugRemove);
        this.bind("Remove", this.onDebugDestroy);
    },

    // When component is removed
    onDebugRemove: function (id) {
        if (id === "DebugCanvas") {
            Crafty.DebugCanvas.remove(this);
        }
    },

    //When entity is destroyed
    onDebugDestroy: function (id) {
        Crafty.DebugCanvas.remove(this);
    },

    /**@
     * #.debugAlpha
     * @comp DebugCanvas
     * @sign public  .debugAlpha(Number alpha)
     * @param alpha - The alpha level the component will be drawn with
     */
    debugAlpha: function (alpha) {
        this._debug.alpha = alpha;
        return this;
    },

    /**@
     * #.debugFill
     * @comp DebugCanvas
     * @sign public  .debugFill([String fillStyle])
     * @param fillStyle - The color the component will be filled with.  Defaults to "red". Pass the boolean false to turn off filling.
     * @example
     * ~~~
     * var myEntity = Crafty.e("2D, Collision, SolidHitBox ").debugFill("purple")
     * ~~~
     */
    debugFill: function (fillStyle) {
        if (typeof fillStyle === 'undefined')
            fillStyle = "red";
        this._debug.fillStyle = fillStyle;
        return this;
    },

    /**@
     * #.debugStroke
     * @comp DebugCanvas
     * @sign public  .debugStroke([String strokeStyle])
     * @param strokeStyle - The color the component will be outlined with.  Defaults to "red".  Pass the boolean false to turn this off.
     * @example
     * ~~~
     * var myEntity = Crafty.e("2D, Collision, WiredHitBox ").debugStroke("white")
     * ~~~
     */
    debugStroke: function (strokeStyle) {
        if (typeof strokeStyle === 'undefined')
            strokeStyle = "red";
        this._debug.strokeStyle = strokeStyle;
        return this;
    },

    debugDraw: function (ctx) {
        var ga = ctx.globalAlpha;
        var props = this._debug;

        if (props.alpha)
            ctx.globalAlpha = this._debug.alpha;

        if (props.strokeStyle)
            ctx.strokeStyle = props.strokeStyle;

        if (props.lineWidth)
            ctx.lineWidth = props.lineWidth;

        if (props.fillStyle)
            ctx.fillStyle = props.fillStyle;

        this.trigger("DebugDraw");

        ctx.globalAlpha = ga;

    }


});



/**@
 * #DebugRectangle
 * @category Debug
 *
 * A component for rendering an object with a position and dimensions to the debug canvas.
 *
 *
 * ~~~
 * var myEntity = Crafty.e("2D, DebugRectangle")
 *                      .attr({x: 13, y: 37, w: 42, h: 42})
 *                      .debugStroke("green");
 * myEntity.debugRectangle(myEntity)
 *~~~
 * @see DebugCanvas
 */
Crafty.c("DebugRectangle", {
    init: function () {
        this.requires("2D, DebugCanvas");
    },

    /**@
     * #.debugRectangle
     * @comp DebugRectangle
     * @sign public  .debugRectangle(Object rect)
     * @param rect - an object with _x, _y, _w, and _h to draw
     *
     * Sets the rectangle that this component draws to the debug canvas.
     *
     */
    debugRectangle: function (rect) {
        this.debugRect = rect;
        this.unbind("DebugDraw", this.drawDebugRect);
        this.bind("DebugDraw", this.drawDebugRect);
        return this;

    },

    drawDebugRect: function () {

        var ctx = Crafty.DebugCanvas.context;
        var rect = this.debugRect;
        if (rect === null || rect === undefined)
            return;
        if (rect._h && rect._w) {
            if (this._debug.fillStyle)
                ctx.fillRect(rect._x, rect._y, rect._w, rect._h);
            if (this._debug.strokeStyle)
                ctx.strokeRect(rect._x, rect._y, rect._w, rect._h);
        }

    }



});



/**@
 * #VisibleMBR
 * @category Debug
 *
 * Adding this component to an entity will cause it's MBR to be drawn to the debug canvas.
 *
 * The methods of DebugCanvas can be used to control this component's appearance.
 * @see 2D, DebugRectangle, DebugCanvas
 */
Crafty.c("VisibleMBR", {
    init: function () {
        this.requires("DebugRectangle")
            .debugFill("purple")
            .bind("EnterFrame", this._assignRect);
    },

    // Internal method for updating the MBR drawn.
    _assignRect: function () {
        if (this._mbr)
            this.debugRectangle(this._mbr);
        else
            this.debugRectangle(this);

    }


});


/**@
 * #DebugPolygon
 * @category Debug
 *
 * For drawing a polygon to the debug canvas
 *
 * The methods of DebugCanvas can be used to control this component's appearance -- by default it is neither filled nor outlined
 *
 * For debugging hitboxes, use WiredHitBox or SolidHitBox.  For debugging MBR, use VisibleMBR
 *
 * @see DebugCanvas
 */
Crafty.c("DebugPolygon", {
    init: function () {
        this.requires("2D, DebugCanvas");
    },


    /**@
     * #.debugPolygon
     * @comp DebugPolygon
     * @sign public  .debugPolygon(Polygon poly)
     * @param poly - a polygon to render
     *
     * Sets the polygon that this component renders to the debug canvas.
     *
     */
    debugPolygon: function (poly) {
        this.polygon = poly;
        this.unbind("DebugDraw", this.drawDebugPolygon);
        this.bind("DebugDraw", this.drawDebugPolygon);
        return this;
    },

    drawDebugPolygon: function () {
        if (typeof this.polygon === "undefined")
            return;

        var ctx = Crafty.DebugCanvas.context;
        ctx.beginPath();
        var p = this.polygon.points, l = p.length;
        for (var i=0; i<l; i+=2){
            ctx.lineTo(p[i], p[i+1]);
        }
        ctx.closePath();

        if (this._debug.fillStyle)
            ctx.fill();
        if (this._debug.strokeStyle)
            ctx.stroke();
    }
});


/**@
 * #WiredHitBox
 * @category Debug
 *
 * Adding this component to an entity with a Collision component will cause its collision polygon to be drawn to the debug canvas as an outline
 *
 * The methods of DebugCanvas can be used to control this component's appearance.
 * @see DebugPolygon, DebugCanvas
 */
Crafty.c("WiredHitBox", {
    init: function () {
        this.requires("DebugPolygon")
            .debugStroke("red")
            .matchHitBox();
        this.bind("NewHitbox", this.matchHitBox);
    },
    matchHitBox: function () {
        this.debugPolygon(this.map);
    }
});

/**@
 * #SolidHitBox
 * @category Debug
 *
 * Adding this component to an entity with a Collision component will cause its collision polygon to be drawn to the debug canvas, with a default alpha level of 0.7.
 *
 * The methods of DebugCanvas can be used to control this component's appearance.
 * @see DebugPolygon, DebugCanvas
 */
Crafty.c("SolidHitBox", {
    init: function () {
        this.requires("Collision, DebugPolygon")
            .debugFill("orange").debugAlpha(0.7)
            .matchHitBox();
        this.bind("NewHitbox", this.matchHitBox);
    },
    matchHitBox: function () {
        this.debugPolygon(this.map);
    }
});

/**@
 * #WiredAreaMap
 * @category Debug
 *
 * Adding this component to an entity with an AreaMap component will cause its click polygon to be drawn to the debug canvas as an outline.
 * Following click areas exist for an entity (in decreasing order of priority): AreaMap, Hitbox, MBR. Use the appropriate debug components to display them.
 *
 * The methods of DebugCanvas can be used to control this component's appearance.
 * @see DebugPolygon, DebugCanvas
 */
Crafty.c("WiredAreaMap", {
    init: function () {
        this.requires("DebugPolygon")
            .debugStroke("green")
            .matchAreaMap();
        this.bind("NewAreaMap", this.matchAreaMap);
    },
    matchAreaMap: function () {
        this.debugPolygon(this.mapArea);
    }
});

/**@
 * #SolidAreaMap
 * @category Debug
 *
 * Adding this component to an entity with an AreaMap component will cause its click polygon to be drawn to the debug canvas, with a default alpha level of 0.7.
 * Following click areas exist for an entity (in decreasing order of priority): AreaMap, Hitbox, MBR. Use the appropriate debug components to display them.
 *
 * The methods of DebugCanvas can be used to control this component's appearance.
 * @see DebugPolygon, DebugCanvas
 */
Crafty.c("SolidAreaMap", {
    init: function () {
        this.requires("DebugPolygon")
            .debugFill("lime").debugAlpha(0.7)
            .matchAreaMap();
        this.bind("NewAreaMap", this.matchAreaMap);
    },
    matchAreaMap: function () {
        this.debugPolygon(this.mapArea);
    }
});

Crafty.DebugCanvas = {
    context: null,
    entities: [],
    onetimeEntities: [],
    add: function (ent) {
        this.entities.push(ent);
    },

    remove: function (ent) {
        var list = this.entities;
        for (var i = list.length - 1; i >= 0; i--)
            if (list[i] == ent)
                list.splice(i, 1);

    },

    // Mostly copied from canvas.init()
    // Called the first time a "DebugCanvas" component is added to an entity
    // We should consider how to abstract the idea of multiple canvases
    init: function () {
        if (!Crafty.DebugCanvas.context) {
            //check if canvas is supported
            if (!Crafty.support.canvas) {
                Crafty.trigger("NoCanvas");
                Crafty.stop();
                return;
            }

            //create an empty canvas element
            var c;
            c = document.createElement("canvas");
            c.width = Crafty.viewport.width;
            c.height = Crafty.viewport.height;
            c.style.position = 'absolute';
            c.style.left = "0px";
            c.style.top = "0px";
            c.id = "debug-canvas";
            // The debug canvas should be on the very top; the highest a regular zindex can get is ~10000
            c.style.zIndex = 100000;

            Crafty.stage.elem.appendChild(c);
            Crafty.DebugCanvas.context = c.getContext('2d');
            Crafty.DebugCanvas._canvas = c;



        }
        //Bind rendering of canvas context (see drawing.js)
        Crafty.unbind("RenderScene", Crafty.DebugCanvas.renderScene);
        Crafty.bind("RenderScene", Crafty.DebugCanvas.renderScene);

    },


    // copied from drawAll()
    renderScene: function (rect) {
        rect = rect || Crafty.viewport.rect();
        var q = Crafty.DebugCanvas.entities,
            i = 0,
            l = q.length,
            ctx = Crafty.DebugCanvas.context,
            current;

        var view = Crafty.viewport;
        ctx.setTransform(view._scale, 0, 0, view._scale, Math.round(view._x*view._scale), Math.round(view._y*view._scale));

        ctx.clearRect(rect._x, rect._y, rect._w, rect._h);


        //sort the objects by the global Z
        //q.sort(zsort);
        for (; i < l; i++) {
            current = q[i];
            current.debugDraw(ctx);
        }

    }

};

},{"../core/core.js":7}],19:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Crafty.log
 * @category Debug
 *
 * @sign Crafty.log( arguments )
 * @param arguments - arguments which are passed to `console.log`
 *
 * This is a simple wrapper for `console.log`.  You can disable logging messages by setting `Crafty.loggingEnabled` to false.
 * It is recommended to use `Crafty.log`, as `console.log` can crash on IE9.
 */
/**@
 * #Crafty.error
 * @category Debug
 *
 * @sign Crafty.error( arguments )
 * @param arguments - arguments which are passed to `console.error`
 *
 * This is a simple wrapper for `console.error`.  You can disable logging messages by setting `Crafty.loggingEnabled` to false.
 * It is recommended to use `Crafty.error`, as `console.error` can crash on IE9.
 */
Crafty.extend({
	// Allow logging to be disabled
	loggingEnabled: true,
	// In some cases console.log doesn't exist, so provide a wrapper for it
	log: function() {
		if (Crafty.loggingEnabled && console && console.log) {
			console.log.apply(console, arguments);
		}
	},
	error: function() {
		if (Crafty.loggingEnabled && console && console.error) {
			console.error.apply(console, arguments);
		}
	}
});
},{"../core/core.js":7}],20:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Crafty.canvasLayer
 * @category Graphics
 *
 * Collection of mostly private methods to draw entities on a canvas element.
 */
Crafty.extend({
    canvasLayer: {
        _dirtyRects: [],
        _changedObjs: [],
        layerCount: 0,
        _dirtyViewport: false,

        // Sort function for rendering in the correct order
        _sort: function(a, b) {
            return a._globalZ - b._globalZ;
        },

        /**@
         * #Crafty.canvasLayer.add
         * @comp Crafty.canvasLayer
         * @sign public Crafty.canvasLayer.add(ent)
         * @param ent - The entity to add
         *
         * Add an entity to the list of Canvas objects to draw
         */
        add: function add(ent) {
            this._changedObjs.push(ent);
        },
        /**@
         * #Crafty.canvasLayer.context
         * @comp Crafty.canvasLayer
         *
         * This will return the 2D context of the main canvas element.
         * The value returned from `Crafty.canvasLayer._canvas.getContext('2d')`.
         */
        context: null,
        /**@
         * #Crafty.canvasLayer._canvas
         * @comp Crafty.canvasLayer
         *
         * Main Canvas element
         */
         _canvas: null,

        /**@
         * #Crafty.canvasLayer.init
         * @comp Crafty.canvasLayer
         * @sign public void Crafty.canvasLayer.init(void)
         * @trigger NoCanvas - triggered if `Crafty.support.canvas` is false
         *
         * Creates a `canvas` element inside `Crafty.stage.elem`. Must be called
         * before any entities with the Canvas component can be drawn.
         *
         * This method will automatically be called if no `Crafty.canvasLayer.context` is
         * found.
         */
        init: function () {
            //check if canvas is supported
            if (!Crafty.support.canvas) {
                Crafty.trigger("NoCanvas");
                Crafty.stop();
                return;
            }

            // set properties to initial values -- necessary on a restart
            this._dirtyRects = [];
            this._changedObjs = [];
            this.layerCount = 0;

            //create an empty canvas element
            var c;
            c = document.createElement("canvas");
            c.width = Crafty.viewport.width;
            c.height = Crafty.viewport.height;
            c.style.position = 'absolute';
            c.style.left = "0px";
            c.style.top = "0px";

            var canvas = Crafty.canvasLayer;

            Crafty.stage.elem.appendChild(c);
            this.context = c.getContext('2d');
            this._canvas = c;

            //Set any existing transformations
            var zoom = Crafty.viewport._scale;
            if (zoom != 1)
                c.scale(zoom, zoom);

            // Set pixelart to current status, and listen for changes
            this._setPixelart(Crafty._pixelartEnabled);
            Crafty.uniqueBind("PixelartSet", this._setPixelart);

            //Bind rendering of canvas context (see drawing.js)
            Crafty.uniqueBind("RenderScene", this._render);
            
            Crafty.uniqueBind("ViewportResize", this._resize);

            Crafty.bind("InvalidateViewport", function () {
                Crafty.canvasLayer._dirtyViewport = true;
            });
        },


        _render: function() {
            var layer = Crafty.canvasLayer,
                dirtyViewport = layer._dirtyViewport,
                l = layer._changedObjs.length,
                ctx = layer.context;
            if (!l && !dirtyViewport) {
                return;
            }

            if (dirtyViewport) {
                var view = Crafty.viewport;
                ctx.setTransform(view._scale, 0, 0, view._scale, Math.round(view._x*view._scale), Math.round(view._y*view._scale) );
            }

            //if the amount of changed objects is over 60% of the total objects
            //do the naive method redrawing
            // TODO: I'm not sure this condition really makes that much sense!
            if (l / layer.layerCount > 0.6 || dirtyViewport) {
                layer._drawAll();
            } else {
                layer._drawDirty();
            }
            //Clean up lists etc
            layer._clean();
        },

        /**@
         * #Crafty.canvasLayer.drawDirty
         * @comp Crafty.canvasLayer
         * @sign public Crafty.canvasLayer.drawDirty()
         *
         * - Triggered by the "RenderScene" event
         * - If the number of rects is over 60% of the total number of objects
         *  do the naive method redrawing `Crafty.canvasLayer.drawAll` instead
         * - Otherwise, clear the dirty regions, and redraw entities overlapping the dirty regions.
         *
         * @see Canvas#.draw
         */
        _drawDirty: function () {

            var i, j, q, rect,len, obj, ent,
                changed = this._changedObjs,
                l = changed.length,
                dirty = this._dirtyRects,
                rectManager = Crafty.rectManager,
                overlap = rectManager.overlap,
                ctx = this.context,
                dupes = [],
                objs = [];

            // Calculate _dirtyRects from all changed objects, then merge some overlapping regions together
            for (i = 0; i < l; i++) {
                this._createDirty(changed[i]);
            }
            rectManager.mergeSet(dirty);


            l = dirty.length;

            // For each dirty rectangle, find entities near it, and draw the overlapping ones
            for (i = 0; i < l; ++i) { //loop over every dirty rect
                rect = dirty[i];
                dupes.length = 0;
                objs.length = 0;
                if (!rect) continue;

                // Find the smallest rectangle with integer coordinates that encloses rect
                rect._w = rect._x + rect._w;
                rect._h = rect._y + rect._h;
                rect._x = (rect._x > 0) ? (rect._x|0) : (rect._x|0) - 1;
                rect._y = (rect._y > 0) ? (rect._y|0) : (rect._y|0) - 1;
                rect._w -= rect._x;
                rect._h -= rect._y;
                rect._w = (rect._w === (rect._w|0)) ? rect._w : (rect._w|0) + 1;
                rect._h = (rect._h === (rect._h|0)) ? rect._h : (rect._h|0) + 1;

                //search for ents under dirty rect
                q = Crafty.map.search(rect, false);

                //clear the rect from the main canvas
                ctx.clearRect(rect._x, rect._y, rect._w, rect._h);

                //Then clip drawing region to dirty rectangle
                ctx.save();
                ctx.beginPath();
                ctx.rect(rect._x, rect._y, rect._w, rect._h);
                ctx.clip();

                // Loop over found objects removing dupes and adding visible canvas objects to array
                for (j = 0, len = q.length; j < len; ++j) {
                    obj = q[j];

                    if (dupes[obj[0]] || !obj._visible || !obj.__c.Canvas)
                        continue;
                    dupes[obj[0]] = true;
                    objs.push(obj);
                }

                // Sort objects by z level
                objs.sort(this._sort);

                // Then draw each object in that order
                for (j = 0, len = objs.length; j < len; ++j) {
                    obj = objs[j];
                    var area = obj._mbr || obj;
                    if (overlap(area, rect))
                        obj.draw();
                    obj._changed = false;
                }

                // Close rectangle clipping
                ctx.closePath();
                ctx.restore();

            }

            // Draw dirty rectangles for debugging, if that flag is set
            if (Crafty.canvasLayer.debugDirty === true) {
                ctx.strokeStyle = 'red';
                for (i = 0, l = dirty.length; i < l; ++i) {
                    rect = dirty[i];
                    ctx.strokeRect(rect._x, rect._y, rect._w, rect._h);
                }
            }

        },

        /**@
         * #Crafty.canvasLayer.drawAll
         * @comp Crafty.canvasLayer
         * @sign public Crafty.canvasLayer.drawAll([Object rect])
         * @param rect - a rectangular region {_x: x_val, _y: y_val, _w: w_val, _h: h_val}
         *
         * - If rect is omitted, redraw within the viewport
         * - If rect is provided, redraw within the rect
         */
        _drawAll: function (rect) {
            rect = rect || Crafty.viewport.rect();
            var q = Crafty.map.search(rect),
                i = 0,
                l = q.length,
                ctx = this.context,
                current;

            ctx.clearRect(rect._x, rect._y, rect._w, rect._h);

            //sort the objects by the global Z
            q.sort(this._sort);
            for (; i < l; i++) {
                current = q[i];
                if (current._visible && current.__c.Canvas) {
                    current.draw();
                    current._changed = false;
                }
            }
        },

        debug: function() {
            Crafty.log(this._changedObjs);
        },

        /** cleans up current dirty state, stores stale state for future passes */
        _clean: function () {
            var rect, obj, i, l,
                changed = this._changedObjs;
             for (i = 0, l = changed.length; i < l; i++) {
                 obj = changed[i];
                 rect = obj._mbr || obj;
                 if (typeof obj.staleRect === 'undefined')
                     obj.staleRect = {};
                 obj.staleRect._x = rect._x;
                 obj.staleRect._y = rect._y;
                 obj.staleRect._w = rect._w;
                 obj.staleRect._h = rect._h;

                 obj._changed = false;
             }
             changed.length = 0;
             this._dirtyRects.length = 0;
             this._dirtyViewport = false;

        },

         /** Takes the current and previous position of an object, and pushes the dirty regions onto the stack
          *  If the entity has only moved/changed a little bit, the regions are squashed together */
        _createDirty: function (obj) {

            var rect = obj._mbr || obj,
                dirty = this._dirtyRects,
                rectManager = Crafty.rectManager;

            if (obj.staleRect) {
                //If overlap, merge stale and current position together, then return
                //Otherwise just push stale rectangle
                if (rectManager.overlap(obj.staleRect, rect)) {
                    rectManager.merge(obj.staleRect, rect, obj.staleRect);
                    dirty.push(obj.staleRect);
                    return;
                } else {
                  dirty.push(obj.staleRect);
                }
            }

            // We use the intermediate "currentRect" so it can be modified without messing with obj
            obj.currentRect._x = rect._x;
            obj.currentRect._y = rect._y;
            obj.currentRect._w = rect._w;
            obj.currentRect._h = rect._h;
            dirty.push(obj.currentRect);

        },


        // Resize the canvas element to the current viewport
        _resize: function() {
            var c = Crafty.canvasLayer._canvas;
            c.width = Crafty.viewport.width;
            c.height = Crafty.viewport.height;

        },

        _setPixelart: function(enabled) {
            var context = Crafty.canvasLayer.context;
            context.imageSmoothingEnabled = !enabled;
            context.mozImageSmoothingEnabled = !enabled;
            context.webkitImageSmoothingEnabled = !enabled;
            context.oImageSmoothingEnabled = !enabled;
            context.msImageSmoothingEnabled = !enabled;
        }

    }
});
},{"../core/core.js":7}],21:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Canvas
 * @category Graphics
 * @trigger Draw - when the entity is ready to be drawn to the stage - {type: "canvas", pos, co, ctx}
 * @trigger NoCanvas - if the browser does not support canvas
 *
 * When this component is added to an entity it will be drawn to the global canvas element. The canvas element (and hence all Canvas entities) is always rendered below any DOM entities.
 *
 * Crafty.canvasLayer.init() will be automatically called if it is not called already to initialize the canvas element.
 *
 * Create a canvas entity like this
 * ~~~
 * var myEntity = Crafty.e("2D, Canvas, Color")
 *      .color("green")
 *      .attr({x: 13, y: 37, w: 42, h: 42});
 *~~~
 */
Crafty.c("Canvas", {

    init: function () {
        var canvasLayer = Crafty.canvasLayer;
        if (!canvasLayer.context) {
            canvasLayer.init();
        }
        this._drawLayer = canvasLayer;
        this._drawContext = canvasLayer.context;

        //increment the amount of canvas objs
        canvasLayer.layerCount++;
        //Allocate an object to hold this components current region
        this.currentRect = {};
        this._changed = true;
        canvasLayer.add(this);

        this.bind("Invalidate", function (e) {
            //flag if changed
            if (this._changed === false) {
                this._changed = true;
                canvasLayer.add(this);
            }

        });


        this.bind("Remove", function () {
            this._drawLayer.layerCount--;
            this._changed = true;
            this._drawLayer.add(this);
        });
    },

    /**@
     * #.draw
     * @comp Canvas
     * @sign public this .draw([[Context ctx, ]Number x, Number y, Number w, Number h])
     * @param ctx - Canvas 2D context if drawing on another canvas is required
     * @param x - X offset for drawing a segment
     * @param y - Y offset for drawing a segment
     * @param w - Width of the segment to draw
     * @param h - Height of the segment to draw
     *
     * Method to draw the entity on the canvas element. Can pass rect values for redrawing a segment of the entity.
     */

    // Cache the various objects and arrays used in draw:
    drawVars: {
        type: "canvas",
        pos: {},
        ctx: null,
        coord: [0, 0, 0, 0],
        co: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        }


    },

    draw: function (ctx, x, y, w, h) {
        if (!this.ready) return;
        if (arguments.length === 4) {
            h = w;
            w = y;
            y = x;
            x = ctx;
            ctx = this._drawContext;
        }

        var pos = this.drawVars.pos;
        pos._x = (this._x + (x || 0));
        pos._y = (this._y + (y || 0));
        pos._w = (w || this._w);
        pos._h = (h || this._h);


        context = ctx || this._drawContext;
        coord = this.__coord || [0, 0, 0, 0];
        var co = this.drawVars.co;
        co.x = coord[0] + (x || 0);
        co.y = coord[1] + (y || 0);
        co.w = w || coord[2];
        co.h = h || coord[3];

        // If we are going to perform any entity-specific changes to the current context, save the current state
        if (this._flipX || (this._flipY || this._rotation)) {
            context.save();
        }

        // rotate the context about this entity's origin
        if (this._rotation !== 0) {
            context.translate(this._origin.x + this._x, this._origin.y + this._y);
            pos._x = -this._origin.x;
            pos._y = -this._origin.y;
            context.rotate((this._rotation % 360) * (Math.PI / 180));
        }

        // We realize a flipped entity by scaling the context in the opposite direction, then adjusting the position coordinates to match
        if (this._flipX || this._flipY) {
            context.scale((this._flipX ? -1 : 1), (this._flipY ? -1 : 1));
            if (this._flipX) {
                pos._x = -(pos._x + pos._w);
            }
            if (this._flipY) {
                pos._y = -(pos._y + pos._h);
            }
        }

        var globalpha;

        //draw with alpha
        if (this._alpha < 1.0) {
            globalpha = context.globalAlpha;
            context.globalAlpha = this._alpha;
        }

        this.drawVars.ctx = context;
        this.trigger("Draw", this.drawVars);

        // If necessary, restore context
        if (this._rotation !== 0 || (this._flipX || this._flipY)) {
            context.restore();
        }
        if (globalpha) {
            context.globalAlpha = globalpha;
        }
        return this;
    }
});

},{"../core/core.js":7}],22:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;




/**@
 * #Crafty.assignColor
 * @category Graphics
 * @sign Crafty.assignColor(color[, assignee])
 * @param color - a string represenation of the color to assign, in any valid HTML format
 * @param assignee - an object to use instead of creating one from scratch
 * @returns  An object with `_red`, `_green`, and `_blue` properties assigned.
 *           Potentially with `_strength` representing the alpha channel.
 *           If the assignee parameter is passed, that object will be assigned those values and returned.
 */
Crafty.extend({
    assignColor: (function(){
        
        // Create phantom element to assess color
        var element = document.createElement("div");
        element.style.display = "none";
        // Can't attach it til later on, so we need a flag!
        var element_attached = false;
        var dictionary = {
            "aqua":     "#00ffff",
            "black":    "#000000",
            "blue":     "#0000ff",
            "fuchsia":  "#ff00ff",
            "gray":     "#808080",
            "green":    "#00ff00",
            "lime":     "#00ff00",
            "maroon":   "#800000",
            "navy":     "#000080",
            "olive":    "#808000",
            "orange":   "#ffa500",
            "purple":   "#800080",
            "red":      "#ff0000",
            "silver":   "#c0c0c0",
            "teal":     "#008080",
            "white":    "#ffffff",
            "yellow":   "#ffff00"
        };

        function default_value(c){
            c._red = c._blue = c._green = 0;
            return c;
        }

        function hexComponent(component) {
            var hex = component.toString(16);
            if (hex.length==1)
                hex = "0" + hex;
            return hex;
        }

        function rgbToHex(r, g, b){
            return "#" + hexComponent(r) + hexComponent(g) + hexComponent(b);
        }

        function parseHexString(hex, c) {
            var l;
            if (hex.length === 7){
                l=2;
            } else if (hex.length === 4){
                l=1;
            } else {
                return default_value(c);
            }
            c._red = parseInt(hex.substr(1, l), 16);
            c._green = parseInt(hex.substr(1+l, l), 16);
            c._blue = parseInt(hex.substr(1+2*l, l), 16);
            return c;
        }

        var rgb_regex = /rgba?\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,?\s*([0-9.]+)?\)/;

        function parseRgbString(rgb, c) {
            var values = rgb_regex.exec(rgb);
            if( values===null || (values.length != 4 && values.length != 5)) {
                return default_value(c); // return bad result?         
            }
            c._red = Math.round(parseFloat(values[1]));
            c._green = Math.round(parseFloat(values[2]));
            c._blue = Math.round(parseFloat(values[3]));
            if (values[4]) {
                c._strength = parseFloat(values[4]);
            }
            return c;
        }

        function parseColorName(key, c){
            if (typeof dictionary[key] === "undefined"){
                if (element_attached === false){
                    window.document.body.appendChild(element);
                    element_attached = true;
                }
                element.style.color = key;
                var rgb = window.getComputedStyle(element).color;
                parseRgbString(rgb, c);
                dictionary[key] = rgbToHex(c._red, c._green, c._blue);
                //window.document.body.removeChild(element);
            } else {
                parseHexString(dictionary[key], c);
            }
            return c;
        }

        function rgbaString(c){
            return "rgba(" + c._red + ", " + c._green + ", " + c._blue + ", " + c._strength + ")";
        }

        // The actual assignColor function
        return function(color, c){
            c = c || {};
            color = color.trim().toLowerCase();
            var ret = null;
            if (color[0] === '#'){
                ret = parseHexString(color, c);
            } else if (color[0] === 'r' && color[1] === 'g' && color[2] === 'b'){
                ret = parseRgbString(color, c);
            } else {
                ret = parseColorName(color, c);
            }
            c._strength = c._strength || 1.0;
            c._color = rgbaString(c);
        };

    })()
});





// Define some variables required for webgl

var COLOR_VERTEX_SHADER = "attribute vec2 aPosition;\nattribute vec3 aOrientation;\nattribute vec2 aLayer;\nattribute vec4 aColor;\n\nvarying lowp vec4 vColor;\n\nuniform  vec4 uViewport;\n\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\n\nvoid main() {\n  vec2 pos = aPosition;\n  vec2 entityOrigin = aOrientation.xy;\n  mat2 entityRotationMatrix = mat2(cos(aOrientation.z), sin(aOrientation.z), -sin(aOrientation.z), cos(aOrientation.z));\n\n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin;\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aLayer.x) ), 1) );\n  vColor = vec4(aColor.rgb*aColor.a*aLayer.y, aColor.a*aLayer.y);\n}";
var COLOR_FRAGMENT_SHADER = "precision mediump float;\nvarying lowp vec4 vColor;\nvoid main(void) {\n\tgl_FragColor = vColor;\n}";
var COLOR_ATTRIBUTE_LIST = [
    {name:"aPosition", width: 2},
    {name:"aOrientation", width: 3},
    {name:"aLayer", width:2},
    {name:"aColor",  width: 4}
];



/**@
 * #Color
 * @category Graphics
 * Draw a colored rectangle.
 */
Crafty.c("Color", {
    _red: 0,
    _green: 0,
    _blue: 0,
    _strength: 1.0,
    _color: "",
    ready: true,

    init: function () {
        this.bind("Draw", this._drawColor);
        if (this.has("WebGL")){
            this._establishShader("Color", COLOR_FRAGMENT_SHADER, COLOR_VERTEX_SHADER, COLOR_ATTRIBUTE_LIST);
        }
        this.trigger("Invalidate");
    },

    remove: function(){
        this.unbind("Draw", this._drawColor);
        if (this.has("DOM")){
            this._element.style.backgroundColor = "transparent";
        }
        this.trigger("Invalidate");
    },

    // draw function for "Color"
    _drawColor: function(e){
        if (!this._color) { return; }
        if (e.type === "DOM") {
            e.style.backgroundColor = this._color;
            e.style.lineHeight = 0;
        } else if (e.type === "canvas") {
            e.ctx.fillStyle = this._color;
            e.ctx.fillRect(e.pos._x, e.pos._y, e.pos._w, e.pos._h);
        } else if (e.type === "webgl"){
            e.program.writeVector("aColor",
                this._red/255,
                this._green/255,
                this._blue/255,
                this._strength
            );
        }
    },

    /**@
     * #.color
     * @comp Color
     * @trigger Invalidate - when the color changes
     *
     * Will assign the color and opacity, either through a string shorthand, or through explicit rgb values.
     * @sign public this .color(String color[, Float strength])
     * @param color - Color of the rectangle
     * @param strength - the opacity of the rectangle
     *
     * @sign public this .color(r, g, b[, strength])
     * @param r - value for the red channel
     * @param g - value for the green channel
     * @param b - value for the blue channel
     * @param strength - the opacity of the rectangle 
     *
     * @sign public String .color()
     * @return A string representing the current color as a CSS property.
     *
     * @example
     * ```
     * var c = Crafty.e("2D, DOM, Color");
     * c.color("#FF0000");
     * c.color("red");
     * c.color(255, 0, 0);
     * c.color("rgb(255, 0, 0")
     * ```
     * Three different ways of assign the color red.
     * ```
     * var c = Crafty.e("2D, DOM, Color");
     * c.color("#00FF00", 0.5);
     * c.color("rgba(0, 255, 0, 0.5)");
     * ```
     * Two ways of assigning a transparent green color.
     */
    color: function (color) {
        if (arguments.length === 0 ){
            return this._color;
        } else if (arguments.length>=3){
            this._red = arguments[0];
            this._green = arguments[1];
            this._blue = arguments[2];
            if (typeof arguments[3] === "number")
                this._strength = arguments[3];
        } else {
            // First argument is color name
            Crafty.assignColor(color, this);
            // Second argument, if present, is strength of color
            // Note that assignColor will give a default strength of 1.0 if none exists.
            if (typeof arguments[1] == "number")
                this._strength = arguments[1];
        }
        this._color = "rgba(" + this._red + ", " + this._green + ", " + this._blue + ", " + this._strength + ")";
        this.trigger("Invalidate");
        return this;
    }
});


},{"../core/core.js":7}],23:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

Crafty.extend({
    /**@
     * #Crafty.domHelper
     * @category Graphics
     *
     * Collection of utilities for using the DOM.
     */
    domHelper: {
        /**@
         * #Crafty.domHelper.innerPosition
         * @comp Crafty.domHelper
         * @sign public Object Crafty.domHelper.innerPosition(HTMLElement obj)
         * @param obj - HTML element to calculate the position
         * @returns Object with `x` key being the `x` position, `y` being the `y` position
         *
         * Find a DOM elements position including
         * padding and border.
         */
        innerPosition: function (obj) {
            var rect = obj.getBoundingClientRect(),
                x = rect.left + (window.pageXOffset ? window.pageXOffset : document.body.scrollLeft),
                y = rect.top + (window.pageYOffset ? window.pageYOffset : document.body.scrollTop),

                //border left
                borderX = parseInt(this.getStyle(obj, 'border-left-width') || 0, 10) || parseInt(this.getStyle(obj, 'borderLeftWidth') || 0, 10) || 0,
                borderY = parseInt(this.getStyle(obj, 'border-top-width') || 0, 10) || parseInt(this.getStyle(obj, 'borderTopWidth') || 0, 10) || 0;

            x += borderX;
            y += borderY;

            return {
                x: x,
                y: y
            };
        },

        /**@
         * #Crafty.domHelper.getStyle
         * @comp Crafty.domHelper
         * @sign public Object Crafty.domHelper.getStyle(HTMLElement obj, String property)
         * @param obj - HTML element to find the style
         * @param property - Style to return
         *
         * Determine the value of a style on an HTML element. Notation can be
         * in either CSS or JS.
         */
        getStyle: function (obj, prop) {
            var result;
            if (obj.currentStyle)
                result = obj.currentStyle[this.camelize(prop)];
            else if (window.getComputedStyle)
                result = document.defaultView.getComputedStyle(obj, null).getPropertyValue(this.csselize(prop));
            return result;
        },

        /**
         * Used in the Zepto framework
         *
         * Converts CSS notation to JS notation
         */
        camelize: function (str) {
            return str.replace(/-+(.)?/g, function (match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
        },

        /**
         * Converts JS notation to CSS notation
         */
        csselize: function (str) {
            return str.replace(/[A-Z]/g, function (chr) {
                return chr ? '-' + chr.toLowerCase() : '';
            });
        },

        /**@
         * #Crafty.domHelper.translate
         * @comp Crafty.domHelper
         * @sign public Object Crafty.domHelper.translate(Number clientX, Number clientY)
         * @param clientX - clientX position in the browser screen
         * @param clientY - clientY position in the browser screen
         * @return Object `{x: ..., y: ...}` with Crafty coordinates.
         * 
         * The parameters clientX and clientY are pixel coordinates within the visible
         * browser window. This function translates those to Crafty coordinates (i.e.,
         * the coordinates that you might apply to an entity), by taking into account
         * where the stage is within the screen, what the current viewport is, etc.
         */
        translate: function (clientX, clientY) {
            var doc = document.documentElement;
            var body = document.body;

            return {
                x: (clientX - Crafty.stage.x + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 )) / Crafty.viewport._scale - Crafty.viewport._x,
                y: (clientY - Crafty.stage.y + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 )) / Crafty.viewport._scale - Crafty.viewport._y
            };
        }
    }
});
},{"../core/core.js":7}],24:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;


/**@
 * #Crafty.domLayer
 * @category Graphics
 *
 * Collection of mostly private methods to represent entities using the DOM.
 */
Crafty.extend({
    domLayer: {
        _changedObjs: [],
        _dirtyViewport: false,
        _div: null,

        init: function () {
            // Set properties to initial values -- necessary on a restart
            this._changedObjs = [];
            this._dirtyViewport = false;

            // Create the div that will contain DOM elements
            var div = this._div = document.createElement("div");

            Crafty.stage.elem.appendChild(div);
            div.style.position = "absolute";
            div.style.zIndex = "1";
            div.style.transformStyle = "preserve-3d"; // Seems necessary for Firefox to preserve zIndexes?

            // Bind scene rendering (see drawing.js)
            Crafty.uniqueBind("RenderScene", this._render);

            // Layers should generally listen for resize events, but the DOM layers automatically inherit the stage's dimensions

            // Listen for changes in pixel art settings
            // Since window is inited before stage, can't set right away, but shouldn't need to!
            Crafty.uniqueBind("PixelartSet", this._setPixelArt);

            Crafty.uniqueBind("InvalidateViewport", function() {
                Crafty.domLayer._dirtyViewport = true;
            });
        },

        // Handle whether images should be smoothed or not
        _setPixelArt: function(enabled) {
            var style = Crafty.domLayer._div.style;
            var camelize = Crafty.domHelper.camelize;
            if (enabled) {
                style[camelize("image-rendering")] = "optimizeSpeed";   /* legacy */
                style[camelize("image-rendering")] = "-moz-crisp-edges";    /* Firefox */
                style[camelize("image-rendering")] = "-o-crisp-edges";  /* Opera */
                style[camelize("image-rendering")] = "-webkit-optimize-contrast";   /* Webkit (Chrome & Safari) */
                style[camelize("-ms-interpolation-mode")] = "nearest-neighbor";  /* IE */
                style[camelize("image-rendering")] = "optimize-contrast";   /* CSS3 proposed */
                style[camelize("image-rendering")] = "pixelated";   /* CSS4 proposed */
                style[camelize("image-rendering")] = "crisp-edges"; /* CSS4 proposed */
            } else {
                style[camelize("image-rendering")] = "optimizeQuality";   /* legacy */
                style[camelize("-ms-interpolation-mode")] = "bicubic";   /* IE */
                style[camelize("image-rendering")] = "auto";   /* CSS3 */
            }
        },

        /**@
         * #Crafty.domLayer.debug
         * @comp Crafty.domLayer
         * @sign public Crafty.domLayer.debug()
         */
        debug: function () {
            Crafty.log(this._changedObjs);
        },


        /**@
         * #Crafty.domLayer._render
         * @comp Crafty.domLayer
         * @sign public Crafty.domLayer.render()
         *
         * When "RenderScene" is triggered, draws all DOM entities that have been flagged
         *
         * @see DOM#.draw
         */
        _render: function () {
            var layer = Crafty.domLayer;
            var changed = layer._changedObjs;
            // Adjust the viewport
            if (layer._dirtyViewport) {
               layer._setViewport();
               layer._dirtyViewport = false;
            }

            //if no objects have been changed, stop
            if (!changed.length) return;

            var i = 0,
                k = changed.length;
            //loop over all DOM elements needing updating
            for (; i < k; ++i) {
                changed[i].draw()._changed = false;
            }

            //reset DOM array
            changed.length = 0;

        },

        /**@
         * #Crafty.domLayer.add
         * @comp Crafty.domLayer
         * @sign public Crafty.domLayer.add(ent)
         * @param ent - The entity to add
         *
         * Add an entity to the list of DOM object to draw
         */
        add: function add(ent) {
            this._changedObjs.push(ent);
        },

        // Sets the viewport position and scale
        // Called by render when the dirtyViewport flag is set
        _setViewport: function() {
            var style = Crafty.domLayer._div.style,
                view = Crafty.viewport;

            style.transform = style[Crafty.support.prefix + "Transform"] = "scale(" + view._scale + ", " + view._scale + ")";
            style.left = Math.round(view._x * view._scale) + "px";
            style.top = Math.round(view._y * view._scale) + "px";
            style.zIndex = 10;


        }

    }
});
},{"../core/core.js":7}],25:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

/**@
 * #DOM
 * @category Graphics
 *
 * A component which renders entities as DOM nodes, specifically `<div>`s.
 */
Crafty.c("DOM", {
    /**@
     * #._element
     * @comp DOM
     * The DOM element used to represent the entity.
     */
    _element: null,
    //holds current styles, so we can check if there are changes to be written to the DOM
    _cssStyles: null,

    /**@
     * #.avoidCss3dTransforms
     * @comp DOM
     * Avoids using of CSS 3D Transform for positioning when true. Default value is false.
     */
    avoidCss3dTransforms: false,

    init: function () {
        var domLayer = Crafty.domLayer;
        if (!domLayer._div) {
            domLayer.init();
        }
        this._drawLayer = domLayer;

        this._cssStyles = {
            visibility: '',
            left: '',
            top: '',
            width: '',
            height: '',
            zIndex: '',
            opacity: '',
            transformOrigin: '',
            transform: ''
        };
        this._element = document.createElement("div");
        domLayer._div.appendChild(this._element);
        this._element.style.position = "absolute";
        this._element.id = "ent" + this[0];

        this.bind("Invalidate", this._invalidateDOM);
        this.bind("NewComponent", this._updateClass);
        this.bind("RemoveComponent", this._removeClass);

        this._invalidateDOM();

    },

    remove: function(){
        this.undraw();
        this.unbind("NewComponent", this._updateClass);
        this.unbind("RemoveComponent", this._removeClass);
        this.unbind("Invalidate", this._invalidateDOM);
    },

    /**@
     * #.getDomId
     * @comp DOM
     * @sign public this .getId()
     *
     * Get the Id of the DOM element used to represent the entity.
     */
    getDomId: function () {
        return this._element.id;
    },

    // removes a component on RemoveComponent events
    _removeClass: function(removedComponent) {
        var i = 0,
            c = this.__c,
            str = "";
        for (i in c) {
          if(i != removedComponent) {
            str += ' ' + i;
          }
        }
        str = str.substr(1);
        this._element.className = str;
    },

    // adds a class on NewComponent events
    _updateClass: function() {
        var i = 0,
            c = this.__c,
            str = "";
        for (i in c) {
            str += ' ' + i;
        }
        str = str.substr(1);
        this._element.className = str;
    },

    _invalidateDOM: function(){
        if (!this._changed) {
                this._changed = true;
                this._drawLayer.add(this);
            }
    },

    /**@
     * #.DOM
     * @comp DOM
     * @trigger Draw - when the entity is ready to be drawn to the stage - { style:String, type:"DOM", co}
     * @sign public this .DOM(HTMLElement elem)
     * @param elem - HTML element that will replace the dynamically created one
     *
     * Pass a DOM element to use rather than one created. Will set `._element` to this value. Removes the old element.
     */
    DOM: function (elem) {
        if (elem && elem.nodeType) {
            this.undraw();
            this._element = elem;
            this._element.style.position = 'absolute';
        }
        return this;
    },

    /**@
     * #.draw
     * @comp DOM
     * @sign public this .draw(void)
     *
     * Updates the CSS properties of the node to draw on the stage.
     */
    draw: function () {
        var style = this._element.style,
            coord = this.__coord || [0, 0, 0, 0],
            co = {
                x: coord[0],
                y: coord[1],
                w: coord[2],
                h: coord[3]
            },
            prefix = Crafty.support.prefix,
            trans = [];

        if (this._cssStyles.visibility !== this._visible) {
            this._cssStyles.visibility = this._visible;
            if (!this._visible) {
                style.visibility = "hidden";
            } else {
                style.visibility = "visible";
            }
        }

        //utilize CSS3 if supported
        if (Crafty.support.css3dtransform && !this.avoidCss3dTransforms) {
            trans.push("translate3d(" + (~~this._x) + "px," + (~~this._y) + "px,0)");
        } else {
            if (this._cssStyles.left !== this._x) {
                this._cssStyles.left = this._x;
                style.left = ~~ (this._x) + "px";
            }
            if (this._cssStyles.top !== this._y) {
                this._cssStyles.top = this._y;
                style.top = ~~ (this._y) + "px";
            }
        }

        if (this._cssStyles.width !== this._w) {
            this._cssStyles.width = this._w;
            style.width = ~~ (this._w) + "px";
        }
        if (this._cssStyles.height !== this._h) {
            this._cssStyles.height = this._h;
            style.height = ~~ (this._h) + "px";
        }
        if (this._cssStyles.zIndex !== this._z) {
            this._cssStyles.zIndex = this._z;
            style.zIndex = this._z;
        }

        if (this._cssStyles.opacity !== this._alpha) {
            this._cssStyles.opacity = this._alpha;
            style.opacity = this._alpha;
            style[prefix + "Opacity"] = this._alpha;
        }

        if (this._mbr) {
            var origin = this._origin.x + "px " + this._origin.y + "px";
            style.transformOrigin = origin;
            style[prefix + "TransformOrigin"] = origin;
            if (Crafty.support.css3dtransform) trans.push("rotateZ(" + this._rotation + "deg)");
            else trans.push("rotate(" + this._rotation + "deg)");
        }

        if (this._flipX) {
            trans.push("scaleX(-1)");
        }

        if (this._flipY) {
            trans.push("scaleY(-1)");
        }

        if (this._cssStyles.transform != trans.join(" ")) {
            this._cssStyles.transform = trans.join(" ");
            style.transform = this._cssStyles.transform;
            style[prefix + "Transform"] = this._cssStyles.transform;
        }

        this.trigger("Draw", {
            style: style,
            type: "DOM",
            co: co
        });

        return this;
    },

    /**@
     * #.undraw
     * @comp DOM
     * @sign public this .undraw(void)
     *
     * Removes the element from the stage.
     */
    undraw: function () {
        var el = this._element;
        if (el && el.parentNode !== null) {
            el.parentNode.removeChild(el);
        }
        return this;
    },

    /**@
     * #.css
     * @comp DOM
     * @sign public css(String property, String value)
     * @param property - CSS property to modify
     * @param value - Value to give the CSS property
     *
     * @sign public  css(Object map)
     * @param map - Object where the key is the CSS property and the value is CSS value
     *
     * Apply CSS styles to the element.
     *
     * Can pass an object where the key is the style property and the value is style value.
     *
     * For setting one style, simply pass the style as the first argument and the value as the second.
     *
     * The notation can be CSS or JS (e.g. `text-align` or `textAlign`).
     *
     * To return a value, pass the property.
     *
     * Note: For entities with "Text" component, some css properties are controlled by separate functions
     * `.textFont()` and `.textColor()`, and ignore `.css()` settings. See Text component for details.
     *
     * @example
     * ~~~
     * this.css({'text-align': 'center', 'text-decoration': 'line-through'});
     * this.css("textAlign", "center");
     * this.css("text-align"); //returns center
     * ~~~
     */
    css: function (obj, value) {
        var key,
            elem = this._element,
            val,
            style = elem.style;

        //if an object passed
        if (typeof obj === "object") {
            for (key in obj) {
                if (!obj.hasOwnProperty(key)) continue;
                val = obj[key];
                if (typeof val === "number") val += 'px';

                style[Crafty.domHelper.camelize(key)] = val;
            }
        } else {
            //if a value is passed, set the property
            if (value) {
                if (typeof value === "number") value += 'px';
                style[Crafty.domHelper.camelize(obj)] = value;
            } else { //otherwise return the computed property
                return Crafty.domHelper.getStyle(elem, obj);
            }
        }

        this.trigger("Invalidate");

        return this;
    }
});

},{"../core/core.js":7}],26:[function(require,module,exports){
var Crafty = require('../core/core.js');

Crafty.extend({
    /**@
     * #Crafty.pixelart
     * @category Graphics
     * @sign public void Crafty.pixelart(Boolean enabled)
     * @param enabled - whether to preserve sharp edges when rendering images
     *
     * Sets the image smoothing for drawing images (for all layer types).
     *
     * Setting this to true disables smoothing for images, which is the preferred
     * way for drawing pixel art. Defaults to false.
     *
     * This feature is experimental and you should be careful with cross-browser compatibility. 
     * The best way to disable image smoothing is to use the Canvas render method and the Sprite component for drawing your entities.
     *
     * If you want to switch modes in the middle of a scene, 
     * be aware that canvas entities won't be drawn in the new style until something else invalidates them. 
     * (You can manually invalidate all canvas entities with `Crafty("Canvas").trigger("Invalidate");`)
     *
     * @note Firefox_26 currently has a [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=696630) 
     * which prevents disabling image smoothing for Canvas entities that use the Image component. Use the Sprite
     * component instead.
     *
     * @note Webkit (Chrome & Safari) currently has a bug [link1](http://code.google.com/p/chromium/issues/detail?id=134040) 
     * [link2](http://code.google.com/p/chromium/issues/detail?id=106662) that prevents disabling image smoothing
     * for DOM entities.
     *
     * @example
     * This is the preferred way to draw pixel art with the best cross-browser compatibility.
     * ~~~
     * Crafty.canvasLayer.init();
     * Crafty.pixelart(true);
     * 
     * Crafty.sprite(imgWidth, imgHeight, "spriteMap.png", {sprite1:[0,0]});
     * Crafty.e("2D, Canvas, sprite1");
     * ~~~
     */
    _pixelartEnabled: false,
    pixelart: function(enabled) {
        Crafty._pixelartEnabled = enabled;
        Crafty.trigger("PixelartSet", enabled);
    }
});

},{"../core/core.js":7}],27:[function(require,module,exports){
var Crafty = require('../core/core.js');

// An object for wrangling textures
// An assumption here is that doing anything with textures is fairly expensive, so the code should be expressive rather than performant
var TextureManager = Crafty.TextureManager = function(gl, webgl) {
	this.gl = gl;
	this.webgl = webgl;
	// The maximum number of units the environment says it supports 
	this.max_units =  gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
	// An array of textures bound to a texture unit; position corresponds to the unit in question
	this.bound_textures = [];
	// A dictionary of registered textures, so that multiple copies of the same texture aren't generated
	this.registered_textures = {};
	// Try to track which texture is active
	this.active = null;
};

TextureManager.prototype = {

	// Clear out the bound textures and other existing state
	reset: function(){
		var t;
		for (var i = 0; i < this.bound_textures.length; i++){
			t = this.bound_textures[i];
			t.unbind();
		}
		this.bound_textures = [];
		this.active = null;
	},

	// creates a texture out of the given image and repeating state
	// The url is just used to generate a unique id for the texture
	makeTexture: function(url, image, repeating) {
		// gl is the context, webgl the Crafty object containing prefs/etc
        var gl = this.gl, webgl = this.webgl;

        // Check whether a texture that matches the one requested already exists
        var id =  "texture-(r:" + repeating + ")-" + url;
        if (typeof this.registered_textures[id] !== 'undefined')
            return this.registered_textures[id];

        // Create a texture, bind it to the next available unit
        var t = new TextureWrapper(this, id);
        this.registered_textures[id] = t;
        this.bindTexture(t);

        // Set the properties of the texture 
        t.setImage(image);
        t.setFilter(webgl.texture_filter);
        t.setRepeat(repeating);

        return t;
    },

    // Returns the bound texture of smallest size
    // If we have more textures than available units, we should preferentially leave the larger textures bound?
	smallest: function() {
		var min_size = Infinity;
		var index = null;
		for (var i=0; i<this.bound_textures.length; i++) {
			var t = this.bound_textures[i];
			if (t.size < min_size) {
				min_size = t.size;
				index = i;
			}
		}
		return index;
	},

	// Returns either the first empty unit, or the unit of the smallest bound texture
	getAvailableUnit: function() {
		if (this.bound_textures.length < this.max_units) {
			return this.bound_textures.length;
		} else {
			return this.smallest();
		}
	},

	// takes a texture object and, if it isn't associated with a unit, binds it to one
	bindTexture: function(t) {
		// return if the texture is already bound
		if (t.unit !== null) return;
		var i = this.getAvailableUnit();
		if (this.bound_textures[i]){
			this.unbindTexture(this.bound_textures[i]);
		}
		this.bound_textures[i] = t;
		t.bind(i);

	},

	// We don't actually "unbind" the texture -- we just set it's bound state to null
	// This is called before another texture is bound
	unbindTexture: function(t) {
		t.unbind();
	},

	setActiveTexture: function(t) {
		if (this.active === t.id) return;
		this.gl.activeTexture(this.gl[t.name]);
		this.active = t.unit;
	}

};

// An object for abstracting out the gl calls associated with textures
var TextureWrapper = Crafty.TextureWrapper = function(manager, id){
	this.manager = manager;
	this.gl = manager.gl;
	this.glTexture = this.gl.createTexture();
	this.id = id;
	this.active = false;
	this.unit = null;
	this.powerOfTwo = false;
};

TextureWrapper.prototype = {

	// Given a number, binds to the corresponding texture unit
	bind: function(unit) {
		var gl = this.gl;
		this.unit = unit;
		this.name = "TEXTURE" + unit;
		this.manager.setActiveTexture(this);
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	},

	// Check whether this texture is active (important for setting properties)
	isActive: function() {
		return (this.manager.active === this.unit);
	},

	// Since gl doesn't require unbinding, just clears the metadata
	unbind: function() {
		this.unit = null;
		this.name = null;
		if(this.isActive())
			this.manager.active = null;
	},

	// actually loads an image into the texture object; sets the appropriate metadata
	setImage: function(image) {
		if(!this.isActive()) throw("Trying to set image of texture that isn't active");
		this.width = image.width;
		this.height = image.height;
		this.size = image.width * image.height;
		this.powerOfTwo = !((Math.log(image.width)/Math.LN2 != Math.floor(Math.log(image.width)/Math.LN2)) || (Math.log(image.height)/Math.LN2 != Math.floor(Math.log(image.height)/Math.LN2)));
		var gl = this.gl;
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	},

	// Sets the min/mag filters
	setFilter: function(filter) {
		if(!this.isActive()) throw("Trying to set filter of texture that isn't active");
		var gl = this.gl;
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
	},

	// set image wrapping
	setRepeat: function(repeat) {
		if(!this.isActive()) throw("Trying to set repeat property of texture that isn't active");
		if(repeat && !this.powerOfTwo){
			throw("Can't create a repeating image whose dimensions aren't a power of 2 in WebGL contexts");
		}
		var gl = this.gl;
		this.repeatMode = repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.repeatMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.repeatMode);
	},

	// given a shader and pair of uniform names, sets the sampler and dimensions to be used by this texture
	setToProgram: function(shader, sampler_name, dimension_name) {
		if(this.unit === null) throw("Trying to use texture not set to a texture unit.");
		var gl = this.gl;
		gl.useProgram(shader);
        // Set the texture buffer to use
        gl.uniform1i(gl.getUniformLocation(shader, sampler_name), this.unit);
        // Set the image dimensions
        gl.uniform2f(gl.getUniformLocation(shader, dimension_name), this.width, this.height);
	}
};
},{"../core/core.js":7}],28:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #HTML
 * @category Graphics
 *
 * A component which allows for the insertion of arbitrary HTML into a DOM entity.  
 *
 * Adding this to an entity will automatically add the `DOM` component.
 */
Crafty.c("HTML", {
    inner: '',

    init: function () {
        this.requires('2D, DOM');
    },

    /**@
     * #.replace
     * @comp HTML
     * @sign public this .replace(String html)
     * @param html - arbitrary html
     *
     * This method will replace the content of this entity with the supplied html
     *
     * @example
     * Create a link
     * ~~~
     * Crafty.e("HTML")
     *    .attr({x:20, y:20, w:100, h:100})
     *    .replace("<a href='index.html'>Index</a>");
     * ~~~
     */
    replace: function (new_html) {
        this.inner = new_html;
        this._element.innerHTML = new_html;
        return this;
    },

    /**@
     * #.append
     * @comp HTML
     * @sign public this .append(String html)
     * @param html - arbitrary html
     *
     * This method will add the supplied html in the end of the entity
     *
     * @example
     * Create a link
     * ~~~
     * Crafty.e("HTML")
     *    .attr({x:20, y:20, w:100, h:100})
     *    .append("<a href='index.html'>Index</a>");
     * ~~~
     */
    append: function (new_html) {
        this.inner += new_html;
        this._element.innerHTML += new_html;
        return this;
    },

    /**@
     * #.prepend
     * @comp HTML
     * @sign public this .prepend(String html)
     * @param html - arbitrary html
     *
     * This method will add the supplied html in the beginning of the entity
     *
     * @example
     * Create a link
     * ~~~
     * Crafty.e("HTML")
     *    .attr({x:20, y:20, w:100, h:100})
     *    .prepend("<a href='index.html'>Index</a>");
     * ~~~
     */
    prepend: function (new_html) {
        this.inner = new_html + this.inner;
        this._element.innerHTML = new_html + this.inner;
        return this;
    }
});
},{"../core/core.js":7}],29:[function(require,module,exports){
var Crafty = require('../core/core.js');


//
// Define some variables required for webgl

var IMAGE_VERTEX_SHADER = "attribute vec2 aPosition;\nattribute vec3 aOrientation;\nattribute vec2 aLayer;\nattribute vec2 aTextureCoord;\n\nvarying mediump vec3 vTextureCoord;\n\nuniform vec4 uViewport;\nuniform mediump vec2 uTextureDimensions;\n\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\n\nvoid main() {\n  vec2 pos = aPosition;\n  vec2 entityOrigin = aOrientation.xy;\n  mat2 entityRotationMatrix = mat2(cos(aOrientation.z), sin(aOrientation.z), -sin(aOrientation.z), cos(aOrientation.z));\n  \n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin ;\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aLayer.x) ), 1) );\n  vTextureCoord = vec3(aTextureCoord, aLayer.y);\n}";
var IMAGE_FRAGMENT_SHADER = "varying mediump vec3 vTextureCoord;\n  \nuniform sampler2D uSampler;\nuniform mediump vec2 uTextureDimensions;\n\nvoid main(void) {\n  highp vec2 coord =   vTextureCoord.xy / uTextureDimensions;\n  mediump vec4 base_color = texture2D(uSampler, coord);\n  gl_FragColor = vec4(base_color.rgb*base_color.a*vTextureCoord.z, base_color.a*vTextureCoord.z);\n}";
var IMAGE_ATTRIBUTE_LIST = [
    {name:"aPosition", width: 2},
    {name:"aOrientation", width: 3},
    {name:"aLayer", width:2},
    {name:"aTextureCoord",  width: 2}
];

/**@
 * #Image
 * @category Graphics
 * Draw an image with or without repeating (tiling).
 */
Crafty.c("Image", {
    _repeat: "repeat",
    ready: false,

    init: function () {
        this.bind("Draw", this._drawImage);
    },

    remove: function() {
        this.unbind("Draw", this._drawImage);
    },

    /**@
     * #.image
     * @comp Image
     * @trigger Invalidate - when the image is loaded
     * @sign public this .image(String url[, String repeat])
     * @param url - URL of the image
     * @param repeat - If the image should be repeated to fill the entity.  This follows CSS syntax: (`"no-repeat", "repeat", "repeat-x", "repeat-y"`), but defaults to `no-repeat`.
     *
     * Draw the specified image.
     *
     * @note The default value of repeat is `no-repeat`, which is different than the standard CSS default
     *
     * If the width and height are `0` and repeat is set to `no-repeat` the width and
     * height will automatically assume that of the image. This is an
     * easy way to create an image without needing sprites.
     *
     * If set to `no-repeat` and given dimensions larger than that of the image,
     * the exact appearance will depend on what renderer (WebGL, DOM, or Canvas) is used.
     *
     * @example
     * Will default to no-repeat. Entity width and height will be set to the images width and height
     * ~~~
     * var ent = Crafty.e("2D, DOM, Image").image("myimage.png");
     * ~~~
     * Create a repeating background.
     * ~~~
     * var bg = Crafty.e("2D, DOM, Image")
     *              .attr({w: Crafty.viewport.width, h: Crafty.viewport.height})
     *              .image("bg.png", "repeat");
     * ~~~
     *
     * @see Crafty.sprite
     */
    image: function (url, repeat) {
        this.__image = url;
        this._repeat = repeat || "no-repeat";

        this.img = Crafty.asset(url);
        if (!this.img) {
            this.img = new Image();
            Crafty.asset(url, this.img);
            this.img.src = url;
            var self = this;

            this.img.onload = function () {
                self._onImageLoad();
            };
        } else {
            this._onImageLoad();
        }


        this.trigger("Invalidate");

        return this;
    },

    _onImageLoad: function(){

        if (this.has("Canvas")) {
            this._pattern = this._drawContext.createPattern(this.img, this._repeat);
        } else if (this.has("WebGL")) {
            this._establishShader("image:" + this.__image, IMAGE_FRAGMENT_SHADER, IMAGE_VERTEX_SHADER, IMAGE_ATTRIBUTE_LIST);
            this.program.setTexture( this.webgl.makeTexture(this.__image, this.img, (this._repeat!=="no-repeat")));
        }

        if (this._repeat === "no-repeat") {
            this.w = this.w || this.img.width;
            this.h = this.h || this.img.height;
        }



        this.ready = true;
        this.trigger("Invalidate");
    },

    _drawImage: function(e){
        if (e.type === "canvas") {
            //skip if no image
            if (!this.ready || !this._pattern) return;

            var context = e.ctx;

            context.fillStyle = this._pattern;

            context.save();
            context.translate(e.pos._x, e.pos._y);
            context.fillRect(0, 0, e.pos._w, e.pos._h);
            context.restore();
        } else if (e.type === "DOM") {
            if (this.__image) {
              e.style.backgroundImage = "url(" + this.__image + ")";
              e.style.backgroundRepeat = this._repeat;
            }
        } else if (e.type === "webgl") {
            var pos = e.pos;
            // Write texture coordinates
            e.program.writeVector("aTextureCoord",
                0, 0,
                0, pos._h,
                pos._w, 0,
                pos._w, pos._h
            );
        }

    }
});

},{"../core/core.js":7}],30:[function(require,module,exports){
var Crafty = require('../core/core.js'),    
    document = window.document;

/**@
 * #Particles
 * @category Graphics
 * @trigger ParticleEnd - when the particle animation has finished
 *
 * Based on Parcycle by Mr. Speaker, licensed under the MIT, Ported by Leo Koppelkamm
 *
 * @note This requires the canvas element, and won't do anything if the browser doesn't support it!
 *
 * For implementation details, check out the source code.
 */
Crafty.c("Particles", {
    init: function () {
        //We need to clone it
        this._Particles = Crafty.clone(this._Particles);
        this._Particles.parentEntity = this;
    },

    /**@
     * #.particles
     * @comp Particles
     * @sign public this .particles(Object options)
     * @param options - Map of options that specify the behavior and look of the particles.
     *
     * @example
     * ~~~
     * var options = {
     *   maxParticles: 150,
     *   size: 18,
     *   sizeRandom: 4,
     *   speed: 1,
     *   speedRandom: 1.2,
     *   // Lifespan in frames
     *   lifeSpan: 29,
     *   lifeSpanRandom: 7,
     *   // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
     *   angle: 65,
     *   angleRandom: 34,
     *   startColour: [255, 131, 0, 1],
     *   startColourRandom: [48, 50, 45, 0],
     *   endColour: [245, 35, 0, 0],
     *   endColourRandom: [60, 60, 60, 0],
     *   // Only applies when fastMode is off, specifies how sharp the gradients are drawn
     *   sharpness: 20,
     *   sharpnessRandom: 10,
     *   // Random spread from origin
     *   spread: 10,
     *   // How many frames should this last
     *   duration: -1,
     *   // Will draw squares instead of circle gradients
     *   fastMode: false,
     *   gravity: { x: 0, y: 0.1 },
     *   // sensible values are 0-3
     *   jitter: 0,
     *   // Offset for the origin of the particles
     *   originOffset: {x: 0, y: 0}
     * };
     *
     * Crafty.e("2D,Canvas,Particles").particles(options);
     * ~~~
     */
    particles: function (options) {

        if (!Crafty.support.canvas || Crafty.deactivateParticles) return this;

        //If we drew on the main canvas, we'd have to redraw
        //potentially huge sections of the screen every frame
        //So we create a separate canvas, where we only have to redraw
        //the changed particles.
        var c, ctx, relativeX, relativeY, bounding;

        c = document.createElement("canvas");
        c.width = Crafty.viewport.width;
        c.height = Crafty.viewport.height;
        c.style.position = 'absolute';
        c.style.left = "0px";
        c.style.top = "0px";

        Crafty.stage.elem.appendChild(c);

        ctx = c.getContext('2d');

        this._Particles.init(options);

        // Clean up the DOM when this component is removed
        this.bind('Remove', function () {
            Crafty.stage.elem.removeChild(c);
        }).bind("RemoveComponent", function (id) {
            if (id === "particles")
                Crafty.stage.elem.removeChild(c);
        });

        relativeX = this.x + Crafty.viewport.x;
        relativeY = this.y + Crafty.viewport.y;
        this._Particles.position = this._Particles.vectorHelpers.create(relativeX, relativeY);

        var oldViewport = {
            x: Crafty.viewport.x,
            y: Crafty.viewport.y
        };

        this.bind('EnterFrame', function () {
            relativeX = this.x + Crafty.viewport.x;
            relativeY = this.y + Crafty.viewport.y;
            this._Particles.viewportDelta = {
                x: Crafty.viewport.x - oldViewport.x,
                y: Crafty.viewport.y - oldViewport.y
            };

            oldViewport = {
                x: Crafty.viewport.x,
                y: Crafty.viewport.y
            };

            this._Particles.position = this._Particles.vectorHelpers.create(relativeX, relativeY);

            //Selective clearing
            if (typeof Crafty.rectManager.boundingRect == 'function') {
                bounding = Crafty.rectManager.boundingRect(this._Particles.register);
                if (bounding) ctx.clearRect(bounding._x, bounding._y, bounding._w, bounding._h);
            } else {
                ctx.clearRect(0, 0, Crafty.viewport.width, Crafty.viewport.height);
            }

            //This updates all particle colors & positions
            this._Particles.update();

            //This renders the updated particles
            this._Particles.render(ctx);
        });
        return this;
    },
    _Particles: {
        presets: {
            maxParticles: 150,
            size: 18,
            sizeRandom: 4,
            speed: 1,
            speedRandom: 1.2,
            // Lifespan in frames
            lifeSpan: 29,
            lifeSpanRandom: 7,
            // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
            angle: 65,
            angleRandom: 34,
            startColour: [255, 131, 0, 1],
            startColourRandom: [48, 50, 45, 0],
            endColour: [245, 35, 0, 0],
            endColourRandom: [60, 60, 60, 0],
            // Only applies when fastMode is off, specifies how sharp the gradients are drawn
            sharpness: 20,
            sharpnessRandom: 10,
            // Random spread from origin
            spread: 10,
            // How many frames should this last
            duration: -1,
            // Will draw squares instead of circle gradients
            fastMode: false,
            gravity: {
                x: 0,
                y: 0.1
            },
            // sensible values are 0-3
            jitter: 0,
            // offset of particles from origin
            originOffset: {x: 0, y: 0},

            //Don't modify the following
            particles: [],
            active: true,
            particleCount: 0,
            elapsedFrames: 0,
            emissionRate: 0,
            emitCounter: 0,
            particleIndex: 0
        },


        init: function (options) {
            this.position = this.vectorHelpers.create(0, 0);
            if (typeof options == 'undefined') options = {};

            //Create current config by merging given options and presets.
            for (var key in this.presets) {
                if (typeof options[key] != 'undefined') this[key] = options[key];
                else this[key] = this.presets[key];
            }

            this.emissionRate = this.maxParticles / this.lifeSpan;
            this.positionRandom = this.vectorHelpers.create(this.spread, this.spread);
        },

        addParticle: function () {
            if (this.particleCount == this.maxParticles) {
                return false;
            }

            // Take the next particle out of the particle pool we have created and initialize it
            var particle = new this.particle(this.vectorHelpers);
            this.initParticle(particle);
            this.particles[this.particleCount] = particle;
            // Increment the particle count
            this.particleCount++;

            return true;
        },
        RANDM1TO1: function () {
            return Math.random() * 2 - 1;
        },
        initParticle: function (particle) {
            particle.position.x = Crafty.viewport._scale * (this.position.x + this.originOffset.x + this.positionRandom.x * this.RANDM1TO1());
            particle.position.y = Crafty.viewport._scale * (this.position.y + this.originOffset.y + this.positionRandom.y * this.RANDM1TO1());

            var newAngle = (this.angle + this.angleRandom * this.RANDM1TO1()) * (Math.PI / 180); // convert to radians
            var vector = this.vectorHelpers.create(Math.sin(newAngle), -Math.cos(newAngle)); // Could move to lookup for speed
            var vectorSpeed = this.speed + this.speedRandom * this.RANDM1TO1();
            particle.direction = this.vectorHelpers.multiply(vector, vectorSpeed);

            particle.size = Crafty.viewport._scale * (this.size + this.sizeRandom * this.RANDM1TO1());
            particle.size = particle.size < 0 ? 0 : ~~particle.size;
            particle.timeToLive = this.lifeSpan + this.lifeSpanRandom * this.RANDM1TO1();

            particle.sharpness = this.sharpness + this.sharpnessRandom * this.RANDM1TO1();
            particle.sharpness = particle.sharpness > 100 ? 100 : particle.sharpness < 0 ? 0 : particle.sharpness;
            // internal circle gradient size - affects the sharpness of the radial gradient
            particle.sizeSmall = ~~ ((particle.size / 200) * particle.sharpness); //(size/2/100)
            var start = [
                this.startColour[0] + this.startColourRandom[0] * this.RANDM1TO1(),
                this.startColour[1] + this.startColourRandom[1] * this.RANDM1TO1(),
                this.startColour[2] + this.startColourRandom[2] * this.RANDM1TO1(),
                this.startColour[3] + this.startColourRandom[3] * this.RANDM1TO1()
            ];

            var end = [
                this.endColour[0] + this.endColourRandom[0] * this.RANDM1TO1(),
                this.endColour[1] + this.endColourRandom[1] * this.RANDM1TO1(),
                this.endColour[2] + this.endColourRandom[2] * this.RANDM1TO1(),
                this.endColour[3] + this.endColourRandom[3] * this.RANDM1TO1()
            ];

            particle.colour = start;
            particle.deltaColour[0] = (end[0] - start[0]) / particle.timeToLive;
            particle.deltaColour[1] = (end[1] - start[1]) / particle.timeToLive;
            particle.deltaColour[2] = (end[2] - start[2]) / particle.timeToLive;
            particle.deltaColour[3] = (end[3] - start[3]) / particle.timeToLive;
        },
        update: function () {
            if (this.active && this.emissionRate > 0) {
                var rate = 1 / this.emissionRate;
                this.emitCounter++;
                while (this.particleCount < this.maxParticles && this.emitCounter > rate) {
                    this.addParticle();
                    this.emitCounter -= rate;
                }
                this.elapsedFrames++;
                if (this.duration != -1 && this.duration < this.elapsedFrames) {
                    this.stop();
                }
            }

            this.particleIndex = 0;
            this.register = [];
            var draw;
            while (this.particleIndex < this.particleCount) {

                var currentParticle = this.particles[this.particleIndex];

                // If the current particle is alive then update it
                if (currentParticle.timeToLive > 0) {

                    // Calculate the new direction based on gravity
                    currentParticle.direction = this.vectorHelpers.add(currentParticle.direction, this.gravity);
                    currentParticle.position = this.vectorHelpers.add(currentParticle.position, currentParticle.direction);
                    currentParticle.position = this.vectorHelpers.add(currentParticle.position, this.viewportDelta);
                    if (this.jitter) {
                        currentParticle.position.x += this.jitter * this.RANDM1TO1();
                        currentParticle.position.y += this.jitter * this.RANDM1TO1();
                    }
                    currentParticle.timeToLive--;

                    // Update colours
                    var r = currentParticle.colour[0] += currentParticle.deltaColour[0];
                    var g = currentParticle.colour[1] += currentParticle.deltaColour[1];
                    var b = currentParticle.colour[2] += currentParticle.deltaColour[2];
                    var a = currentParticle.colour[3] += currentParticle.deltaColour[3];

                    // Calculate the rgba string to draw.
                    draw = [];
                    draw.push("rgba(" + (r > 255 ? 255 : r < 0 ? 0 : ~~r));
                    draw.push(g > 255 ? 255 : g < 0 ? 0 : ~~g);
                    draw.push(b > 255 ? 255 : b < 0 ? 0 : ~~b);
                    draw.push((a > 1 ? 1 : a < 0 ? 0 : a.toFixed(2)) + ")");
                    currentParticle.drawColour = draw.join(",");

                    if (!this.fastMode) {
                        draw[3] = "0)";
                        currentParticle.drawColourEnd = draw.join(",");
                    }

                    this.particleIndex++;
                } else {
                    // Replace particle with the last active
                    if (this.particleIndex != this.particleCount - 1) {
                        this.particles[this.particleIndex] = this.particles[this.particleCount - 1];
                    }
                    this.particleCount--;
                }
                var rect = {};
                rect._x = ~~currentParticle.position.x;
                rect._y = ~~currentParticle.position.y;
                rect._w = currentParticle.size;
                rect._h = currentParticle.size;

                this.register.push(rect);
            }
        },

        stop: function () {
            this.active = false;
            this.elapsedFrames = 0;
            this.emitCounter = 0;
            this.parentEntity.trigger("ParticleEnd");
        },

        render: function (context) {

            for (var i = 0, j = this.particleCount; i < j; i++) {
                var particle = this.particles[i];
                var size = particle.size;
                var halfSize = size >> 1;

                if (particle.position.x + size < 0 || particle.position.y + size < 0 || particle.position.x - size > Crafty.viewport.width || particle.position.y - size > Crafty.viewport.height) {
                    //Particle is outside
                    continue;
                }
                var x = ~~particle.position.x;
                var y = ~~particle.position.y;

                if (this.fastMode) {
                    context.fillStyle = particle.drawColour;
                } else {
                    var radgrad = context.createRadialGradient(x + halfSize, y + halfSize, particle.sizeSmall, x + halfSize, y + halfSize, halfSize);
                    radgrad.addColorStop(0, particle.drawColour);
                    //0.9 to avoid visible boxing
                    radgrad.addColorStop(0.9, particle.drawColourEnd);
                    context.fillStyle = radgrad;
                }
                context.fillRect(x, y, size, size);
            }
        },
        particle: function (vectorHelpers) {
            this.position = vectorHelpers.create(0, 0);
            this.direction = vectorHelpers.create(0, 0);
            this.size = 0;
            this.sizeSmall = 0;
            this.timeToLive = 0;
            this.colour = [];
            this.drawColour = "";
            this.deltaColour = [];
            this.sharpness = 0;
        },
        vectorHelpers: {
            create: function (x, y) {
                return {
                    "x": x,
                    "y": y
                };
            },
            multiply: function (vector, scaleFactor) {
                vector.x *= scaleFactor;
                vector.y *= scaleFactor;
                return vector;
            },
            add: function (vector1, vector2) {
                vector1.x += vector2.x;
                vector1.y += vector2.y;
                return vector1;
            }
        }
    }
});

},{"../core/core.js":7}],31:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
* #SpriteAnimation
* @category Animation
* @trigger StartAnimation - When an animation starts playing, or is resumed from the paused state - {Reel}
* @trigger AnimationEnd - When the animation finishes - { Reel }
* @trigger FrameChange - Each time the frame of the current reel changes - { Reel }
* @trigger ReelChange - When the reel changes - { Reel }
*
* Used to animate sprites by treating a sprite map as a set of animation frames.
* Must be applied to an entity that has a sprite-map component.
*
* To define an animation, see the `reel` method.  To play an animation, see the `animate` method.
*
* A reel is an object that contains the animation frames and current state for an animation.  The reel object has the following properties:
* @param id: (String) - the name of the reel
* @param frames: (Array) - A list of frames in the format [xpos, ypos]
* @param currentFrame: (Number) - The index of the current frame
* @param easing: (Crafty.easing object) - The object that handles the internal progress of the animation.
* @param duration: (Number) - The duration in milliseconds.
*
* Many animation related events pass a reel object as data.  As typical with events, this should be treated as read only data that might be later altered by the entity.  If you wish to preserve the data, make a copy of it.
*
* @see Crafty.sprite
*/
Crafty.c("SpriteAnimation", {
	/*
	*
	* A map in which the keys are the names assigned to animations defined using
	* the component (also known as reelIDs), and the values are objects describing
	* the animation and its state.
	*/
	_reels: null,

	/*
	* The reelID of the currently active reel (which is one of the elements in `this._reels`).
	* This value is `null` if no reel is active. Some of the component's actions can be invoked
	* without specifying a reel, in which case they will work on the active reel.
	*/
	_currentReelId: null,

	/*
	* The currently active reel.
	* This value is `null` if no reel is active.
	*/
	_currentReel: null,

	/*
	* Whether or not an animation is currently playing.
	*/
	_isPlaying: false,

	/**@
	* #.animationSpeed
	* @comp SpriteAnimation
	*
	* The playback rate of the animation.  This property defaults to 1.
	*/
	animationSpeed: 1,


	init: function () {
		this._reels = {};
	},

	/**@
	* #.reel
	* @comp SpriteAnimation
	* Used to define reels, to change the active reel, and to fetch the id of the active reel.
	*
	* @sign public this .reel(String reelId, Duration duration, Number fromX, Number fromY, Number frameCount)
	* Defines a reel by starting and ending position on the sprite sheet.
	* @param reelId - ID of the animation reel being created
	* @param duration - The length of the animation in milliseconds.
	* @param fromX - Starting `x` position on the sprite map (x's unit is the horizontal size of the sprite in the sprite map).
	* @param fromY - `y` position on the sprite map (y's unit is the horizontal size of the sprite in the sprite map). Remains constant through the animation.
	* @param frameCount - The number of sequential frames in the animation.  If negative, the animation will play backwards.
	*
	* @sign public this .reel(String reelId, Duration duration, Array frames)
	* Defines a reel by an explicit list of frames
	* @param reelId - ID of the animation reel being created
	* @param duration - The length of the animation in milliseconds.
	* @param frames - An array of arrays containing the `x` and `y` values of successive frames: [[x1,y1],[x2,y2],...] (the values are in the unit of the sprite map's width/height respectively).
	*
	* @sign public this .reel(String reelId)
	* Switches to the specified reel.  The sprite will be updated to that reel's current frame
	* @param reelID - the ID to switch to
	*
	* @sign public Reel .reel()
	* @return The id of the current reel
	*
	*
	* A method to handle animation reels.  Only works for sprites built with the Crafty.sprite methods.
	* See the Tween component for animation of 2D properties.
	*
	* To setup an animation reel, pass the name of the reel (used to identify the reel later), and either an
	* array of absolute sprite positions or the start x on the sprite map, the y on the sprite map and then the end x on the sprite map.
	*
	*
	* @example
	* ~~~
	* // Define a sprite-map component
	* Crafty.sprite(16, "images/sprite.png", {
	*     PlayerSprite: [0,0]
	* });
	*
	* // Define an animation on the second row of the sprite map (fromY = 1)
	* // from the left most sprite (fromX = 0) to the fourth sprite
	* // on that row (frameCount = 4), with a duration of 1 second
	* Crafty.e("2D, DOM, SpriteAnimation, PlayerSprite").reel('PlayerRunning', 1000, 0, 1, 4);
	*
	* // This is the same animation definition, but using the alternative method
	* Crafty.e("2D, DOM, SpriteAnimation, PlayerSprite").reel('PlayerRunning', 1000, [[0, 1], [1, 1], [2, 1], [3, 1]]);
	* ~~~
	*/
	reel: function (reelId, duration, fromX, fromY, frameCount) {
		// @sign public this .reel()
		if (arguments.length === 0)
			return this._currentReelId;

		// @sign public this .reel(String reelID)
		if (arguments.length === 1 && typeof reelId === "string"){
			if (typeof this._reels[reelId] === "undefined")
				throw("The specified reel " + reelId + " is undefined.");
			this.pauseAnimation();
			if (this._currentReelId !== reelId) {
				this._currentReelId = reelId;
				this._currentReel = this._reels[reelId];
				// Change the visible sprite
				this._updateSprite();
				// Trigger event
				this.trigger("ReelChange", this._currentReel);
			}
			return this;
		}


		var reel, i, y;

		reel = {
			id: reelId,
			frames: [],
			currentFrame: 0,
			easing: new Crafty.easing(duration),
			defaultLoops: 1
		};

		reel.duration = reel.easing.duration;

		// @sign public this .reel(String reelId, Number duration, Number fromX, Number fromY, Number frameDuration)
		if (typeof fromX === "number") {
			i = fromX;
			y = fromY;
			if (frameCount >= 0) {
				for (; i < fromX + frameCount ; i++) {
					reel.frames.push([i, y]);
				}
			}
			else {
				for (; i > fromX + frameCount; i--) {
					reel.frames.push([i, y]);
				}
			}
		}
		// @sign public this .reel(String reelId, Number duration, Array frames)
		else if (arguments.length === 3 && typeof fromX === "object") {
			reel.frames = fromX;
		}
		else {
			throw "Urecognized arguments. Please see the documentation for 'reel(...)'.";
		}

		this._reels[reelId] = reel;

		return this;
	},

	/**@
	* #.animate
	* @comp SpriteAnimation
	* @sign public this .animate([String reelId] [, Number loopCount])
	* @param reelId - ID of the animation reel to play.  Defaults to the current reel if none is specified.
	* @param loopCount - Number of times to repeat the animation. Use -1 to repeat indefinitely.  Defaults to 1.
	*
	* Play one of the reels previously defined through `.reel(...)`. Simply pass the name of the reel. If you wish the
	* animation to play multiple times in succession, pass in the amount of times as an additional parameter.
	* To have the animation repeat indefinitely, pass in `-1`.
	*
	* If another animation is currently playing, it will be paused.
	*
	* This will always play an animation from the beginning.  If you wish to resume from the current state of a reel, use `resumeAnimation()`.
	*
	* Once an animation ends, it will remain at its last frame.
	*
	*
	* @example
	* ~~~
	* // Define a sprite-map component
	* Crafty.sprite(16, "images/sprite.png", {
	*     PlayerSprite: [0,0]
	* });
	*
	* // Play the animation across 20 frames (so each sprite in the 4 sprite animation should be seen for 5 frames) and repeat indefinitely
	* Crafty.e("2D, DOM, SpriteAnimation, PlayerSprite")
	*     .reel('PlayerRunning', 20, 0, 0, 3) // setup animation
	*     .animate('PlayerRunning', -1); // start animation
	* ~~~
	*/
	animate: function(reelId, loopCount) {

		var pos;


		// switch to the specified reel if necessary
		if (typeof reelId === "string")
			this.reel(reelId);

		var currentReel = this._currentReel;

		if (typeof currentReel === "undefined" || currentReel === null)
			throw("No reel is specified, and there is no currently active reel.");

		this.pauseAnimation(); // This will pause the current animation, if one is playing

		// Handle repeats; if loopCount is undefined and reelID is a number, calling with that signature
		if (typeof loopCount === "undefined")
			if (typeof reelId === "number")
				loopCount = reelId;
			else
				loopCount = 1;

		// set the animation to the beginning
		currentReel.easing.reset();


		// user provided loop count.
		this.loops(loopCount);

		// trigger the necessary events and switch to the first frame
		this._setFrame(0);

		// Start the anim
		this.bind("EnterFrame", this._animationTick);
		this._isPlaying = true;

		this.trigger("StartAnimation", currentReel);
		return this;
	},

	/**@
	* #.resumeAnimation
	* @comp SpriteAnimation
	* @sign public this .resumeAnimation()
	*
	* This will resume animation of the current reel from its current state.
	* If a reel is already playing, or there is no current reel, there will be no effect.
	*/
	resumeAnimation: function() {
		if (this._isPlaying === false &&  this._currentReel !== null) {
			this.bind("EnterFrame", this._animationTick);
			this._isPlaying = true;
			this._currentReel.easing.resume();
			this.trigger("StartAnimation", this._currentReel);
		}
		return this;
	},

	/**@
	* #.pauseAnimation
	* @comp SpriteAnimation
	* @sign public this .pauseAnimation(void)
	*
	* Pauses the currently playing animation, or does nothing if no animation is playing.
	*/
	pauseAnimation: function () {
		if (this._isPlaying === true) {
			this.unbind("EnterFrame", this._animationTick);
			this._isPlaying = false;
			this._reels[this._currentReelId].easing.pause();
		}
		return this;
	},

	/**@
	* #.resetAnimation
	* @comp SpriteAnimation
	* @sign public this .resetAnimation()
	*
	* Resets the current animation to its initial state.  Resets the number of loops to the last specified value, which defaults to 1.
	*
	* Neither pauses nor resumes the current animation.
	*/
	resetAnimation: function(){
		var currentReel = this._currentReel;
		if  (currentReel === null)
			throw("No active reel to reset.");
		this.reelPosition(0);
		currentReel.easing.repeat(currentReel.defaultLoops);
		return this;
   },


	/**@
	* #.loops
	* @comp SpriteAnimation
	* @sign public this .loops(Number loopCount)
	* @param loopCount - The number of times to play the animation
	*
	* Sets the number of times the animation will loop for.
	* If called while an animation is in progress, the current state will be considered the first loop.
	*
	* @sign public Number .loops()
	* @returns The number of loops left.  Returns 0 if no reel is active.
	*/
	loops: function(loopCount) {
		if (arguments.length === 0){
			if (this._currentReel !== null)
				return this._currentReel.easing.loops;
			else
				return 0;
		}

		if (this._currentReel !== null){
			if (loopCount < 0)
				loopCount = Infinity;
			this._currentReel.easing.repeat(loopCount);
			this._currentReel.defaultLoops = loopCount;
		}
		return this;

	},

	/**@
	* #.reelPosition
	* @comp SpriteAnimation
	*
	* @sign public this .reelPosition(Integer position)
	* Sets the position of the current reel by frame number.
	* @param position - the frame to jump to.  This is zero-indexed.  A negative values counts back from the last frame.
	*
	* @sign public this .reelPosition(Number position)
	* Sets the position of the current reel by percent progress.
	* @param position - a non-integer number between 0 and 1
	*
	* @sign public this .reelPosition(String position)
	* Jumps to the specified position.  The only currently accepted value is "end", which will jump to the end of the reel.
	*
	* @sign public Number .reelPosition()
	* @returns The current frame number
	*
	*/
	reelPosition: function(position) {
		if (this._currentReel === null)
			throw("No active reel.");

		if (arguments.length === 0)
			return this._currentReel.currentFrame;

		var progress,
			l = this._currentReel.frames.length;
		if (position === "end")
			position = l - 1;

		if (position < 1 && position > 0) {
			progress = position;
			position = Math.floor(l * progress);
		} else {
			if (position !== Math.floor(position))
				throw("Position " + position + " is invalid.");
			if (position < 0)
				position = l - 1 + position;
			progress = position / l;
		}
		// cap to last frame
		position = Math.min(position, l-1);
		position = Math.max(position, 0);
		this._setProgress(progress);
		this._setFrame(position);

		return this;

	},


	// Bound to "EnterFrame".  Progresses the animation by dt, changing the frame if necessary.
	// dt is multiplied by the animationSpeed property
	_animationTick: function(frameData) {
		var currentReel = this._reels[this._currentReelId];
		currentReel.easing.tick(frameData.dt * this.animationSpeed);
		var progress = currentReel.easing.value();
		var frameNumber = Math.min( Math.floor(currentReel.frames.length * progress), currentReel.frames.length - 1);

		this._setFrame(frameNumber);

		if(currentReel.easing.complete === true){
			this.pauseAnimation();
			this.trigger("AnimationEnd", this._currentReel);
		}
	},





	// Set the current frame and update the displayed sprite
	// The actual progress for the animation must be set seperately.
	_setFrame: function(frameNumber) {
		var currentReel = this._currentReel;
		if (frameNumber === currentReel.currentFrame)
			return;
		currentReel.currentFrame = frameNumber;
		this._updateSprite();
		this.trigger("FrameChange", currentReel);
	},

	// Update the displayed sprite.
	_updateSprite: function() {
		var currentReel = this._currentReel;
		var pos = currentReel.frames[currentReel.currentFrame];
		this.sprite(pos[0], pos[1]); // .sprite will trigger redraw

	},


	// Sets the internal state of the current reel's easing object
	_setProgress: function(progress, repeats) {
		this._currentReel.easing.setProgress(progress, repeats);

	},


	/**@
	* #.isPlaying
	* @comp SpriteAnimation
	* @sign public Boolean .isPlaying([String reelId])
	* @param reelId - The reelId of the reel we wish to examine
	* @returns The current animation state
	*
	* Determines if the specified animation is currently playing. If no reelId is specified,
	* checks if any animation is playing.
	*
	* @example
	* ~~~
	* myEntity.isPlaying() // is any animation playing
	* myEntity.isPlaying('PlayerRunning') // is the PlayerRunning animation playing
	* ~~~
	*/
	isPlaying: function (reelId) {
		if (!this._isPlaying) return false;

		if (!reelId) return !!this._currentReelId;
		return this._currentReelId === reelId;
	},

	/**@
	* #.getReel
	* @comp SpriteAnimation
	* @sign public Reel .getReel()
	* @returns The current reel, or null if there is no active reel
	*
	* @sign public Reel .getReel(reelId)
	* @param reelId - The id of the reel to fetch.
	* @returns The specified reel, or `undefined` if no such reel exists.
	*
	*/
	getReel: function (reelId) {
		if (arguments.length === 0){
			if (!this._currentReelId) return null;
			reelId = this._currentReelId;
		}

		return this._reels[reelId];
	}
});

},{"../core/core.js":7}],32:[function(require,module,exports){
var Crafty = require('../core/core.js');


// Define some variables required for webgl

var SPRITE_VERTEX_SHADER = "attribute vec2 aPosition;\nattribute vec3 aOrientation;\nattribute vec2 aLayer;\nattribute vec2 aTextureCoord;\n\nvarying mediump vec3 vTextureCoord;\n\nuniform vec4 uViewport;\nuniform mediump vec2 uTextureDimensions;\n\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\n\nvoid main() {\n  vec2 pos = aPosition;\n  vec2 entityOrigin = aOrientation.xy;\n  mat2 entityRotationMatrix = mat2(cos(aOrientation.z), sin(aOrientation.z), -sin(aOrientation.z), cos(aOrientation.z));\n  \n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin ;\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aLayer.x) ), 1) );\n  vTextureCoord = vec3(aTextureCoord, aLayer.y);\n}";
var SPRITE_FRAGMENT_SHADER = "varying mediump vec3 vTextureCoord;\n  \nuniform sampler2D uSampler;\nuniform mediump vec2 uTextureDimensions;\n\nvoid main(void) {\n  highp vec2 coord =   vTextureCoord.xy / uTextureDimensions;\n  mediump vec4 base_color = texture2D(uSampler, coord);\n  gl_FragColor = vec4(base_color.rgb*base_color.a*vTextureCoord.z, base_color.a*vTextureCoord.z);\n}";
var SPRITE_ATTRIBUTE_LIST = [
    {name:"aPosition", width: 2},
    {name:"aOrientation", width: 3},
    {name:"aLayer", width:2},
    {name:"aTextureCoord",  width: 2}
];

Crafty.extend({

    /**@
     * #Crafty.sprite
     * @category Graphics
     * @sign public this Crafty.sprite([Number tile, [Number tileh]], String url, Object map[, Number paddingX[, Number paddingY[, Boolean paddingAroundBorder]]])
     * @param tile - Tile size of the sprite map, defaults to 1
     * @param tileh - Height of the tile; if provided, tile is interpreted as the width
     * @param url - URL of the sprite image
     * @param map - Object where the key is what becomes a new component and the value points to a position on the sprite map
     * @param paddingX - Horizontal space in between tiles. Defaults to 0.
     * @param paddingY - Vertical space in between tiles. Defaults to paddingX.
     * @param paddingAroundBorder - If padding should be applied around the border of the sprite sheet. If enabled the first tile starts at (paddingX,paddingY) instead of (0,0). Defaults to false.
     *
     * Generates components based on positions in a sprite image to be applied to entities.
     *
     * Accepts a tile size, URL and map for the name of the sprite and its position.
     *
     * The position must be an array containing the position of the sprite where index `0`
     * is the `x` position, `1` is the `y` position and optionally `2` is the width and `3`
     * is the height. If the sprite map has padding, pass the values for the `x` padding
     * or `y` padding. If they are the same, just add one value.
     *
     * If the sprite image has no consistent tile size, `1` or no argument need be
     * passed for tile size.
     *
     * Entities that add the generated components are also given the `2D` component, and
     * a component called `Sprite`.
     *
     * @example
     * ~~~
     * Crafty.sprite("imgs/spritemap6.png", {flower:[0,0,20,30]});
     * var flower_entity = Crafty.e("2D, DOM, flower");
     * ~~~
     * The first line creates a component called `flower` associated with the sub-image of
     * spritemap6.png with top-left corner (0,0), width 20 pixels, and height 30 pixels.
     * The second line creates an entity with that image. (Note: The `2D` is not really
     * necessary here, because adding the `flower` component automatically also adds the
     * `2D` component.)
     * ~~~
     * Crafty.sprite(50, "imgs/spritemap6.png", {flower:[0,0], grass:[0,1,3,1]});
     * ~~~
     * In this case, the `flower` component is pixels 0 <= x < 50, 0 <= y < 50, and the
     * `grass` component is pixels 0 <= x < 150, 50 <= y < 100. (The `3` means grass has a
     * width of 3 tiles, i.e. 150 pixels.)
     * ~~~
     * Crafty.sprite(50, 100, "imgs/spritemap6.png", {flower:[0,0], grass:[0,1]}, 10);
     * ~~~
     * In this case, each tile is 50x100, and there is a spacing of 10 pixels between
     * consecutive tiles. So `flower` is pixels 0 <= x < 50, 0 <= y < 100, and `grass` is
     * pixels 0 <= x < 50, 110 <= y < 210.
     *
     * @see Sprite
     */
    sprite: function (tile, tileh, url, map, paddingX, paddingY, paddingAroundBorder) {
        var spriteName, temp, x, y, w, h, img;

        //if no tile value, default to 1.
        //(if the first passed argument is a string, it must be the url.)
        if (typeof tile === "string") {
            paddingY = paddingX;
            paddingX = map;
            map = tileh;
            url = tile;
            tile = 1;
            tileh = 1;
        }

        if (typeof tileh == "string") {
            paddingY = paddingX;
            paddingX = map;
            map = url;
            url = tileh;
            tileh = tile;
        }

        //if no paddingY, use paddingX
        if (!paddingY && paddingX) paddingY = paddingX;
        paddingX = parseInt(paddingX || 0, 10); //just incase
        paddingY = parseInt(paddingY || 0, 10);

        var markSpritesReady = function() {
            this.ready = true;
            this.trigger("Invalidate");
        };

        img = Crafty.asset(url);
        if (!img) {
            img = new Image();
            img.src = url;
            Crafty.asset(url, img);
            img.onload = function () {
                //all components with this img are now ready
                for (var spriteName in map) {
                    Crafty(spriteName).each(markSpritesReady);
                }
            };
        }

        var sharedSpriteInit = function() {
            this.requires("2D, Sprite");
            this.__trim = [0, 0, 0, 0];
            this.__image = url;
            this.__coord = [this.__coord[0], this.__coord[1], this.__coord[2], this.__coord[3]];
            this.__tile = tile;
            this.__tileh = tileh;
            this.__padding = [paddingX, paddingY];
            this.__padBorder = paddingAroundBorder;
            this.sprite(this.__coord[0], this.__coord[1], this.__coord[2], this.__coord[3]);
            
            this.img = img;
            //draw now
            if (this.img.complete && this.img.width > 0) {
                this.ready = true;
                this.trigger("Invalidate");
            }

            //set the width and height to the sprite size
            this.w = this.__coord[2];
            this.h = this.__coord[3];

            if (this.has("WebGL")){
                this._establishShader(this.__image, SPRITE_FRAGMENT_SHADER, SPRITE_VERTEX_SHADER, SPRITE_ATTRIBUTE_LIST);
                this.program.setTexture( this.webgl.makeTexture(this.__image, this.img, false) );
            }
        };

        for (spriteName in map) {
            if (!map.hasOwnProperty(spriteName)) continue;

            temp = map[spriteName];

            //generates sprite components for each tile in the map
            Crafty.c(spriteName, {
                ready: false,
                __coord: [temp[0], temp[1], temp[2] || 1, temp[3] || 1],

                init: sharedSpriteInit
            });
        }

        return this;
    }
});

/**@
 * #Sprite
 * @category Graphics
 * @trigger Invalidate - when the sprites change
 *
 * A component for using tiles in a sprite map.  
 *
 * This is automatically added to entities which use the components created by `Crafty.sprite` or `Crafty.load`.
 * Since these are also used to define tile size, you'll rarely need to use this components methods directly.
 *
 * @see Crafty.sprite, Crafty.load
 */
Crafty.c("Sprite", {
    __image: '',
    /*
     * #.__tile
     * @comp Sprite
     *
     * Horizontal sprite tile size.
     */
    __tile: 0,
    /*
     * #.__tileh
     * @comp Sprite
     *
     * Vertical sprite tile size.
     */
    __tileh: 0,
    __padding: null,
    __trim: null,
    img: null,
    //ready is changed to true in Crafty.sprite
    ready: false,

    init: function () {
        this.__trim = [0, 0, 0, 0];
        this.bind("Draw", this._drawSprite);
    },

    remove: function(){
        this.unbind("Draw", this._drawSprite);
    },

    _drawSprite: function(e){
        var co = e.co,
                pos = e.pos,
                context = e.ctx;

        if (e.type === "canvas") {
            //draw the image on the canvas element
            context.drawImage(this.img, //image element
                co.x, //x position on sprite
                co.y, //y position on sprite
                co.w, //width on sprite
                co.h, //height on sprite
                pos._x, //x position on canvas
                pos._y, //y position on canvas
                pos._w, //width on canvas
                pos._h //height on canvas
            );
        } else if (e.type === "DOM") {
            // Get scale (ratio of entity dimensions to sprite's dimensions)
            // If needed, we will scale up the entire sprite sheet, and then modify the position accordingly
            var vscale = this._h / co.h,
                hscale = this._w / co.w,
                style = this._element.style,
                bgColor = style.backgroundColor;

            if (bgColor === "initial") bgColor = "";

            // Don't change background if it's not necessary -- this can cause some browsers to reload the image
            // See [this chrome issue](https://code.google.com/p/chromium/issues/detail?id=102706)
            var newBackground = bgColor + " url('" + this.__image + "') no-repeat"; 
            if (newBackground !== style.background) {
                style.background = newBackground;
            }
            style.backgroundPosition = "-" + co.x * hscale + "px -" + co.y * vscale + "px";
            // style.backgroundSize must be set AFTER style.background!
            if (vscale != 1 || hscale != 1) {
                style.backgroundSize = (this.img.width * hscale) + "px" + " " + (this.img.height * vscale) + "px";
            }
        } else if (e.type === "webgl") {
            // Write texture coordinates
            e.program.writeVector("aTextureCoord",
                co.x, co.y,
                co.x, co.y + co.h,
                co.x + co.w, co.y,
                co.x + co.w, co.y + co.h
            );
        }
    },

    /**@
     * #.sprite
     * @comp Sprite
     * @sign public this .sprite(Number x, Number y[, Number w, Number h])
     * @param x - X cell position
     * @param y - Y cell position
     * @param w - Width in cells. Optional.
     * @param h - Height in cells. Optional.
     *
     * Uses a new location on the sprite map as its sprite. If w or h are ommitted, the width and height are not changed.
     *
     * Values should be in tiles or cells (not pixels).
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Sprite")
     *   .sprite(0, 0, 2, 2);
     * ~~~
     */

    /**@
     * #.__coord
     * @comp Sprite
     *
     * The coordinate of the slide within the sprite in the format of [x, y, w, h].
     */
    sprite: function (x, y, w, h) {
        this.__coord = this.__coord || [0, 0, 0, 0];

        this.__coord[0] = x * (this.__tile + this.__padding[0]) + (this.__padBorder ? this.__padding[0] : 0) + this.__trim[0];
        this.__coord[1] = y * (this.__tileh + this.__padding[1]) + (this.__padBorder ? this.__padding[1] : 0) + this.__trim[1];
        if (typeof(w)!=='undefined' && typeof(h)!=='undefined') {
            this.__coord[2] = this.__trim[2] || w * this.__tile || this.__tile;
            this.__coord[3] = this.__trim[3] || h * this.__tileh || this.__tileh;
        }

        this.trigger("Invalidate");
        return this;
    },

    /**@
     * #.crop
     * @comp Sprite
     * @sign public this .crop(Number x, Number y, Number w, Number h)
     * @param x - Offset x position
     * @param y - Offset y position
     * @param w - New width
     * @param h - New height
     *
     * If the entity needs to be smaller than the tile size, use this method to crop it.
     *
     * The values should be in pixels rather than tiles.
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Sprite")
     *   .crop(40, 40, 22, 23);
     * ~~~
     */
    crop: function (x, y, w, h) {
        var old = this._mbr || this.pos();
        this.__trim = [];
        this.__trim[0] = x;
        this.__trim[1] = y;
        this.__trim[2] = w;
        this.__trim[3] = h;

        this.__coord[0] += x;
        this.__coord[1] += y;
        this.__coord[2] = w;
        this.__coord[3] = h;
        this._w = w;
        this._h = h;

        this.trigger("Invalidate", old);
        return this;
    }
});

},{"../core/core.js":7}],33:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Text
 * @category Graphics
 * @trigger Invalidate - when the text is changed
 * @requires Canvas or DOM
 * Component to make a text entity.
 *
 * By default, text will have the style "10px sans-serif".
 *
 * @note An entity with the text component is just text! If you want to write text
 * inside an image, you need one entity for the text and another entity for the image.
 * More tips for writing text inside an image: (1) Use the z-index (from 2D component)
 * to ensure that the text is on top of the image, not the other way around; (2)
 * use .attach() (from 2D component) to glue the text to the image so they move and
 * rotate together.
 *
 * @note For DOM (but not canvas) text entities, various font settings (like
 * text-decoration and text-align) can be set using `.css()` (see DOM component). But
 * you cannot use `.css()` to set the properties which are controlled by `.textFont()`
 * or `.textColor()` -- the settings will be ignored.
 *
 * @note If you use canvas text with glyphs that are taller than standard letters, portions of the glyphs might be cut off.
 */
Crafty.c("Text", {
    _text: "",
    defaultSize: "10px",
    defaultFamily: "sans-serif",
    defaultVariant: "normal",
    defaultLineHeight: "normal",
    ready: true,

    init: function () {
        this.requires("2D");
        this._textFont = {
            "type": "",
            "weight": "",
            "size": this.defaultSize,
            "lineHeight":this.defaultLineHeight,
            "family": this.defaultFamily,
            "variant": this.defaultVariant
        };

        this.bind("Draw", function (e) {
            var font = this._fontString();

            if (e.type === "DOM") {
                var el = this._element,
                    style = el.style;

                style.color = this._textColor;
                style.font = font;
                el.innerHTML = this._text;
            } else if (e.type === "canvas") {
                var context = e.ctx;

                context.save();

                context.textBaseline = "top";
                context.fillStyle = this._textColor || "rgb(0,0,0)";
                context.font = font;

                context.fillText(this._text, e.pos._x, e.pos._y);

                context.restore();
            }
        });
    },

    // takes a CSS font-size string and gets the height of the resulting font in px
    _getFontHeight: (function(){
        // regex for grabbing the first string of letters
        var re = /([a-zA-Z]+)\b/;
        // From the CSS spec.  "em" and "ex" are undefined on a canvas.
        var multipliers = {
            "px": 1,
            "pt": 4/3,
            "pc": 16,
            "cm": 96/2.54,
            "mm": 96/25.4,
            "in": 96,
            "em": undefined,
            "ex": undefined
        };
        return function (font){
            var number = parseFloat(font);
            var match = re.exec(font);
            var unit =  match ? match[1] : "px";
            if (multipliers[unit] !== undefined)
                return Math.ceil(number * multipliers[unit]);
            else
                return Math.ceil(number);
        };
    })(),

    /**@
     * #.text
     * @comp Text
     * @sign public this .text(String text)
     * @param text - String of text that will be inserted into the DOM or Canvas element.
     *
     * @sign public this .text(Function textGenerator)
     * @param textGenerator - A function that returns a string.  
     *        It will be immediately invoked in the context of the entity, with the result used as the text to display.
     *
     * This method will update the text inside the entity.
     *
     * If you need to reference attributes on the entity itself you can pass a function instead of a string.
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Text").attr({ x: 100, y: 100 }).text("Look at me!!");
     *
     * Crafty.e("2D, DOM, Text").attr({ x: 100, y: 100 })
     *     .text(function () { return "My position is " + this._x });
     *
     * Crafty.e("2D, Canvas, Text").attr({ x: 100, y: 100 }).text("Look at me!!");
     *
     * Crafty.e("2D, Canvas, Text").attr({ x: 100, y: 100 })
     *     .text(function () { return "My position is " + this._x });
     * ~~~
     */
    text: function (text) {
        if (!(typeof text !== "undefined" && text !== null)) return this._text;
        if (typeof (text) == "function")
            this._text = text.call(this);
        else
            this._text = text;

        if (this.has("Canvas") )
            this._resizeForCanvas();

        this.trigger("Invalidate");
        return this;
    },

    // Calculates the height and width of text on the canvas
    // Width is found by using the canvas measureText function
    // Height is only estimated -- it calculates the font size in pixels, and sets the height to 110% of that.
    _resizeForCanvas: function(){
        var ctx = this._drawContext;
        ctx.font = this._fontString();
        this.w = ctx.measureText(this._text).width;

        var size = (this._textFont.size || this.defaultSize);
        this.h = 1.1 * this._getFontHeight(size);
    },

    // Returns the font string to use
    _fontString: function(){
        return this._textFont.type + ' ' + this._textFont.variant  + ' ' + this._textFont.weight + ' ' + this._textFont.size  + ' / ' + this._textFont.lineHeight + ' ' + this._textFont.family;
    },
    /**@
     * #.textColor
     * @comp Text
     * @sign public this .textColor(String color)
     * @param color - The color in name, hex, rgb or rgba
     *
     * Change the color of the text. You can use HEX, rgb and rgba colors. 
     *
     * If you want the text to be transparent, you should use rgba where you can define alphaChannel.
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Text").attr({ x: 100, y: 100 }).text("Look at me!!")
     *   .textColor('#FF0000');
     *
     * Crafty.e("2D, Canvas, Text").attr({ x: 100, y: 100 }).text('Look at me!!')
     *   .textColor('rgba(0, 255, 0, 0.5)');
     *
     * Crafty.e("2D, Canvas, Text").attr({ x: 100, y: 100 }).text('Look at me!!')
     *   .textColor('white');
     * ~~~
     * @see Crafty.assignColor
     */
    textColor: function (color) {
        Crafty.assignColor(color, this);
        this._textColor = "rgba(" + this._red + ", " + this._green + ", " + this._blue + ", " + this._strength + ")";
        this.trigger("Invalidate");
        return this;
    },

    /**@
     * #.textFont
     * @comp Text
     * @triggers Invalidate
     * @sign public this .textFont(String key, * value)
     * @param key - Property of the entity to modify
     * @param value - Value to set the property to
     *
     * @sign public this .textFont(Object map)
     * @param map - Object where the key is the property to modify and the value as the property value
     *
     * Use this method to set font property of the text entity.  Possible values are: type, weight, size, family, lineHeight, and variant.
     *
     * When rendered by the canvas, lineHeight and variant will be ignored.
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Text").textFont({ type: 'italic', family: 'Arial' });
     * Crafty.e("2D, Canvas, Text").textFont({ size: '20px', weight: 'bold' });
     *
     * Crafty.e("2D, Canvas, Text").textFont("type", "italic");
     * Crafty.e("2D, Canvas, Text").textFont("type"); // italic
     * ~~~
     */
    textFont: function (key, value) {
        if (arguments.length === 1) {
            //if just the key, return the value
            if (typeof key === "string") {
                return this._textFont[key];
            }

            if (typeof key === "object") {
                for (var propertyKey in key) {
                    if(propertyKey == 'family'){
                        this._textFont[propertyKey] = "'" + key[propertyKey] + "'";
                    } else {
                        this._textFont[propertyKey] = key[propertyKey];
                    }
                }
            }
        } else {
            this._textFont[key] = value;
        }

        if (this.has("Canvas") )
            this._resizeForCanvas();

        this.trigger("Invalidate");
        return this;
    },
    /**@
     * #.unselectable
     * @comp Text
     * @triggers Invalidate
     * @sign public this .unselectable()
     *
     * This method sets the text so that it cannot be selected (highlighted) by dragging.
     * (Canvas text can never be highlighted, so this only matters for DOM text.)
     * Works by changing the css property "user-select" and its variants.
     * 
     * Likewise, this sets the mouseover cursor to be "default" (arrow), not "text" (I-beam)
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Text").text('This text cannot be highlighted!').unselectable();
     * ~~~
     */
    unselectable: function () {
        // http://stackoverflow.com/questions/826782/css-rule-to-disable-text-selection-highlighting
        if (this.has("DOM")) {
            this.css({
                '-webkit-touch-callout': 'none',
                '-webkit-user-select': 'none',
                '-khtml-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none',
                'user-select': 'none',
                'cursor': 'default'
            });
            this.trigger("Invalidate");
        }
        return this;
    }

});
},{"../core/core.js":7}],34:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

Crafty.extend({
    /**@
     * #Crafty.viewport
     * @category Stage
     * @trigger ViewportScroll - when the viewport's x or y coordinates change
     * @trigger ViewportScale - when the viewport's scale changes
     * @trigger ViewportResize - when the viewport's dimension's change
     * @trigger InvalidateViewport - when the viewport changes
     * @trigger StopCamera - when any camera animations should stop, such as at the start of a new animation.
     * @trigger CameraAnimationDone - when a camera animation reaches completion
     *
     * Viewport is essentially a 2D camera looking at the stage. Can be moved or zoomed, which
     * in turn will react just like a camera moving in that direction.
     *
     * There are multiple camera animation methods available - these are the viewport methods with an animation time parameter and the `follow` method.
     * Only one animation can run at a time. Starting a new animation will cancel the previous one and the appropriate events will be fired.
     * 
     * Tip: At any given moment, the stuff that you can see is...
     * 
     * `x` between `(-Crafty.viewport._x)` and `(-Crafty.viewport._x + (Crafty.viewport._width / Crafty.viewport._scale))`
     * 
     * `y` between `(-Crafty.viewport._y)` and `(-Crafty.viewport._y + (Crafty.viewport._height / Crafty.viewport._scale))`
     *
     *
     * @example
     * Prevent viewport from adjusting itself when outside the game world.
     * Scale the viewport so that entities appear twice as large.
     * Then center the viewport on an entity over the duration of 3 seconds.
     * After that animation finishes, start following the entity.
     * ~~~
     * var ent = Crafty.e('2D, DOM').attr({x: 250, y: 250, w: 100, h: 100});
     *
     * Crafty.viewport.clampToEntities = false;
     * Crafty.viewport.scale(2);
     * Crafty.one("CameraAnimationDone", function() {
     *     Crafty.viewport.follow(ent, 0, 0);
     * });
     * Crafty.viewport.centerOn(ent, 3000);
     * ~~~
     */
    viewport: {
        /**@
         * #Crafty.viewport.clampToEntities
         * @comp Crafty.viewport
         *
         * Decides if the viewport functions should clamp to game entities.
         * When set to `true` functions such as Crafty.viewport.mouselook() will not allow you to move the
         * viewport over areas of the game that has no entities.
         * For development it can be useful to set this to false.
         */
        clampToEntities: true,
        _width: 0,
        _height: 0,
        /**@
         * #Crafty.viewport.x
         * @comp Crafty.viewport
         *
         * Will move the stage and therefore every visible entity along the `x`
         * axis in the opposite direction.
         *
         * When this value is set, it will shift the entire stage. This means that entity
         * positions are not exactly where they are on screen. To get the exact position,
         * simply add `Crafty.viewport.x` onto the entities `x` position.
         */
        _x: 0,
        /**@
         * #Crafty.viewport.y
         * @comp Crafty.viewport
         *
         * Will move the stage and therefore every visible entity along the `y`
         * axis in the opposite direction.
         *
         * When this value is set, it will shift the entire stage. This means that entity
         * positions are not exactly where they are on screen. To get the exact position,
         * simply add `Crafty.viewport.y` onto the entities `y` position.
         */
        _y: 0,

        /**@
         * #Crafty.viewport._scale
         * @comp Crafty.viewport
         *
         * This value is the current scale (zoom) of the viewport. When the value is bigger than 1, everything
         * looks bigger (zoomed in). When the value is less than 1, everything looks smaller (zoomed out). This
         * does not alter the size of the stage itself, just the magnification of what it shows.
         * 
         * This is a read-only property: Do not set it directly. Instead, use `Crafty.viewport.scale(...)`
         * or `Crafty.viewport.zoom(...)`
         */

        _scale: 1,

        /**@
         * #Crafty.viewport.bounds
         * @comp Crafty.viewport
         *
         * A rectangle which defines the bounds of the viewport.
         * It should be an object with two properties, `max` and `min`,
         * which are each an object with `x` and `y` properties.
         *
         * If this property is null, Crafty uses the bounding box of all the items
         * on the stage.  This is the initial value.  (To prevent this behavior, set `Crafty.viewport.clampToEntities` to `false`)
         *
         * If you wish to bound the viewport along one axis but not the other, you can use `-Infinity` and `+Infinity` as bounds.
         *
         * @see Crafty.viewport.clampToEntities
         *
         * @example
         * Set the bounds to a 500 by 500 square:
         *
         * ~~~
         * Crafty.viewport.bounds = {min:{x:0, y:0}, max:{x:500, y:500}};
         * ~~~
         */
        bounds: null,

        /**@
         * #Crafty.viewport.scroll
         * @comp Crafty.viewport
         * @sign Crafty.viewport.scroll(String axis, Number val)
         * @param axis - 'x' or 'y'
         * @param val - The new absolute position on the axis
         *
         * Will move the viewport to the position given on the specified axis
         *
         * @example
         * Will move the camera 500 pixels right of its initial position, in effect
         * shifting everything in the viewport 500 pixels to the left.
         *
         * ~~~
         * Crafty.viewport.scroll('_x', 500);
         * ~~~
         */
        scroll: function (axis, val) {
            this[axis] = val;
            Crafty.trigger("ViewportScroll");
            Crafty.trigger("InvalidateViewport");
        },

        rect_object: { _x: 0, _y: 0, _w: 0, _h: 0},

        rect: function () {
            this.rect_object._x = -this._x;
            this.rect_object._y = -this._y;
            this.rect_object._w = this._width / this._scale;
            this.rect_object._h = this._height / this._scale;
            return this.rect_object;
        },

        /**@ 

         * #Crafty.viewport.pan
         * @comp Crafty.viewport
         * @sign public void Crafty.viewport.pan(Number dx, Number dy, Number time[, String|function easingFn])
         * @param Number dx - The distance along the x axis
         * @param Number dy - The distance along the y axis
         * @param Number time - The duration in ms for the entire camera movement
         * @param easingFn - A string or custom function specifying an easing.  (Defaults to linear behavior.)  See Crafty.easing for more information.
         *
         * Pans the camera a given number of pixels over the specified time
         *
         * @example
         * ~~~
         * // pan the camera 100 px right and down over the duration of 2 seconds using linear easing behaviour
         * Crafty.viewport.pan(100, 100, 2000);
         * ~~~
         */
        pan: (function () {
            var tweens = {}, i, bound = false;
            var targetX, targetY, startingX, startingY, easing;

            function enterFrame(e) {
                easing.tick(e.dt);
                var v = easing.value();
                Crafty.viewport.x = (1-v) * startingX + v * targetX;
                Crafty.viewport.y = (1-v) * startingY + v * targetY;
                Crafty.viewport._clamp();

                if (easing.complete){
                    stopPan();
                    Crafty.trigger("CameraAnimationDone");
                }
            }

            function stopPan(){
                Crafty.unbind("EnterFrame", enterFrame);
            }

            Crafty._preBind("StopCamera", stopPan);

            return function (dx, dy, time, easingFn) {
                // Cancel any current camera control
                Crafty.trigger("StopCamera");

                // Handle request to reset
                if (dx == 'reset') {
                   return;
                }

                startingX = Crafty.viewport._x;
                startingY = Crafty.viewport._y;
                targetX = startingX - dx;
                targetY = startingY - dy;

                easing = new Crafty.easing(time, easingFn);

                // bind to event, using uniqueBind prevents multiple copies from being bound
                Crafty.uniqueBind("EnterFrame", enterFrame);
                       
            };
        })(),

        /**@
         * #Crafty.viewport.follow
         * @comp Crafty.viewport
         * @sign public void Crafty.viewport.follow(Object target, Number offsetx, Number offsety)
         * @param Object target - An entity with the 2D component
         * @param Number offsetx - Follow target's center should be offsetx pixels away from viewport's center. Positive values puts target to the right of the screen.
         * @param Number offsety - Follow target's center should be offsety pixels away from viewport's center. Positive values puts target to the bottom of the screen.
         *
         * Follows a given entity with the 2D component. If following target will take a portion of
         * the viewport out of bounds of the world, following will stop until the target moves away.
         *
         * @example
         * ~~~
         * var ent = Crafty.e('2D, DOM').attr({w: 100, h: 100});
         * Crafty.viewport.follow(ent, 0, 0);
         * ~~~
         */
        follow: (function () {
            var oldTarget, offx, offy;

            function change() {
                var scale = Crafty.viewport._scale;
                Crafty.viewport.scroll('_x', -(this.x + (this.w / 2) - (Crafty.viewport.width / 2 / scale) - offx * scale));
                Crafty.viewport.scroll('_y', -(this.y + (this.h / 2) - (Crafty.viewport.height / 2 / scale) - offy * scale));
                Crafty.viewport._clamp();
            }

            function stopFollow(){
                if (oldTarget) {
                    oldTarget.unbind('Move', change);
                    oldTarget.unbind('ViewportScale', change);
                    oldTarget.unbind('ViewportResize', change);
                }
            }

            Crafty._preBind("StopCamera", stopFollow);

            return function (target, offsetx, offsety) {
                if (!target || !target.has('2D'))
                    return;
                Crafty.trigger("StopCamera");

                oldTarget = target;
                offx = (typeof offsetx != 'undefined') ? offsetx : 0;
                offy = (typeof offsety != 'undefined') ? offsety : 0;

                target.bind('Move', change);
                target.bind('ViewportScale', change);
                target.bind('ViewportResize', change);
                change.call(target);
            };
        })(),

        /**@
         * #Crafty.viewport.centerOn
         * @comp Crafty.viewport
         * @sign public void Crafty.viewport.centerOn(Object target, Number time)
         * @param Object target - An entity with the 2D component
         * @param Number time - The duration in ms of the camera motion
         *
         * Centers the viewport on the given entity.
         *
         * @example
         * ~~~
         * var ent = Crafty.e('2D, DOM').attr({x: 250, y: 250, w: 100, h: 100});
         * Crafty.viewport.centerOn(ent, 3000);
         * ~~~
         */
        centerOn: function (targ, time) {
            var x = targ.x + Crafty.viewport.x,
                y = targ.y + Crafty.viewport.y,
                mid_x = targ.w / 2,
                mid_y = targ.h / 2,
                cent_x = Crafty.viewport.width / 2 / Crafty.viewport._scale,
                cent_y = Crafty.viewport.height / 2 / Crafty.viewport._scale,
                new_x = x + mid_x - cent_x,
                new_y = y + mid_y - cent_y;

            Crafty.viewport.pan(new_x, new_y, time);
        },

        /**@
         * #Crafty.viewport.zoom
         * @comp Crafty.viewport
         * @sign public void Crafty.viewport.zoom(Number amt, Number cent_x, Number cent_y, Number time[, String|function easingFn])
         * @param Number amt - amount to zoom in on the target by (eg. 2, 4, 0.5)
         * @param Number cent_x - the center to zoom on
         * @param Number cent_y - the center to zoom on
         * @param Number time - the duration in ms of the entire zoom operation
         * @param easingFn - A string or custom function specifying an easing.  (Defaults to linear behavior.)  See Crafty.easing for more information.
         *
         * Zooms the camera in on a given point. amt > 1 will bring the camera closer to the subject
         * amt < 1 will bring it farther away. amt = 0 will reset to the default zoom level
         * Zooming is multiplicative. To reset the zoom amount, pass 0.
         *
         * @example
         * ~~~
         * // Make the entities appear twice as large by zooming in on the specified coordinates over the duration of 3 seconds using linear easing behavior
         * Crafty.viewport.zoom(2, 100, 100, 3000);
         * ~~~
         */
        zoom: (function () {
            

            function stopZoom(){
                Crafty.unbind("EnterFrame", enterFrame);
            }
            Crafty._preBind("StopCamera", stopZoom);

            var startingZoom, finalZoom, finalAmount, startingX, finalX, startingY, finalY, easing;

            function enterFrame(e){
                var amount, v;

                easing.tick(e.dt);

                // The scaling should happen smoothly -- start at 1, end at finalAmount, and at half way scaling should be by finalAmount^(1/2)
                // Since value goes smoothly from 0 to 1, this fufills those requirements
                amount = Math.pow(finalAmount, easing.value() );

                // The viewport should move in such a way that no point reverses
                // If a and b are the top left/bottom right of the viewport, then the below can be derived from
                //      (a_0-b_0)/(a-b) = amount,
                // and the assumption that both a and b have the same form
                //      a = a_0 * (1-v) + a_f * v,
                //      b = b_0 * (1-v) + b_f * v.
                // This is just an arbitrary parameterization of the only sensible path for the viewport corners to take.
                // And by symmetry they should be parameterized in the same way!  So not much choice here.
                if (finalAmount === 1)
                    v = easing.value();  // prevent NaN!  If zoom is used this way, it'll just become a pan.
                else
                    v = (1/amount - 1 ) / (1/finalAmount - 1);

                // Set new scale and viewport position
                Crafty.viewport.scale( amount * startingZoom );
                Crafty.viewport.scroll("_x", startingX * (1-v) + finalX * v );
                Crafty.viewport.scroll("_y", startingY * (1-v) + finalY * v );
                Crafty.viewport._clamp();

                if (easing.complete){
                    stopZoom();
                    Crafty.trigger("CameraAnimationDone");
                }


            }

            return function (amt, cent_x, cent_y, time, easingFn){
                if (!amt) { // we're resetting to defaults
                    Crafty.viewport.scale(1);
                    return;
                }

                if (arguments.length <= 2) {
                    time = cent_x;
                    cent_x = Crafty.viewport.x - Crafty.viewport.width;
                    cent_y = Crafty.viewport.y - Crafty.viewport.height;
                }

                Crafty.trigger("StopCamera");
                startingZoom = Crafty.viewport._scale;
                finalAmount = amt;
                finalZoom = startingZoom * finalAmount;
                

                startingX = Crafty.viewport.x;
                startingY = Crafty.viewport.y;
                finalX = - (cent_x - Crafty.viewport.width  / (2 * finalZoom) );
                finalY = - (cent_y - Crafty.viewport.height / (2 * finalZoom) );

                easing = new Crafty.easing(time, easingFn);

                Crafty.uniqueBind("EnterFrame", enterFrame);
            };

            
        })(),
        /**@
         * #Crafty.viewport.scale
         * @comp Crafty.viewport
         * @sign public void Crafty.viewport.scale(Number amt)
         * @param Number amt - amount to zoom/scale in on the elements
         *
         * Adjusts the scale (zoom). When `amt` is 1, it is set to the normal scale,
         * e.g. an entity with `this.w == 20` would appear exactly 20 pixels wide.
         * When `amt` is 10, that same entity would appear 200 pixels wide (i.e., zoomed in
         * by a factor of 10), and when `amt` is 0.1, that same entity would be 2 pixels wide
         * (i.e., zoomed out by a factor of `(1 / 0.1)`).
         * 
         * If you pass an `amt` of 0, it is treated the same as passing 1, i.e. the scale is reset.
         *
         * This method sets the absolute scale, while `Crafty.viewport.zoom` sets the scale relative to the existing value.
         * @see Crafty.viewport.zoom
         *
         * @example
         * ~~~
         * Crafty.viewport.scale(2); // Zoom in -- all entities will appear twice as large.
         * ~~~
         */
        scale: (function () {
            return function (amt) {
                this._scale = amt ? amt : 1;
                Crafty.trigger("InvalidateViewport");
                Crafty.trigger("ViewportScale");

            };
        })(),
        /**@
         * #Crafty.viewport.mouselook
         * @comp Crafty.viewport
         * @sign public void Crafty.viewport.mouselook(Boolean active)
         * @param Boolean active - Activate or deactivate mouselook
         *
         * Toggle mouselook on the current viewport.
         * Simply call this function and the user will be able to
         * drag the viewport around.
         *
         * If the user starts a drag, "StopCamera" will be triggered, which will cancel any existing camera animations.
         */
        mouselook: (function () {
            var active = false,
                dragging = false,
                lastMouse = {};
            old = {};
            function stopLook(){
                dragging = false;
            }


            return function (op, arg) {
                if (typeof op == 'boolean') {
                    active = op;
                    if (active) {
                        Crafty.mouseObjs++;
                    } else {
                        Crafty.mouseObjs = Math.max(0, Crafty.mouseObjs - 1);
                    }
                    return;
                }
                if (!active) return;
                switch (op) {
                case 'move':
                case 'drag':
                    if (!dragging) return;
                    diff = {
                        x: arg.clientX - lastMouse.x,
                        y: arg.clientY - lastMouse.y
                    };

                    lastMouse.x = arg.clientX;
                    lastMouse.y = arg.clientY;

                    Crafty.viewport.x += diff.x;
                    Crafty.viewport.y += diff.y;
                    Crafty.viewport._clamp();
                    break;
                case 'start':
                    Crafty.trigger("StopCamera");
                    lastMouse.x = arg.clientX;
                    lastMouse.y = arg.clientY;
                    dragging = true;
                    break;
                case 'stop':
                    dragging = false;
                    break;
                }
            };
        })(),
        _clamp: function () {
            // clamps the viewport to the viewable area
            // under no circumstances should the viewport see something outside the boundary of the 'world'
            if (!this.clampToEntities) return;
            var bound = Crafty.clone(this.bounds) || Crafty.map.boundaries();
            bound.max.x *= this._scale;
            bound.min.x *= this._scale;
            bound.max.y *= this._scale;
            bound.min.y *= this._scale;
            if (bound.max.x - bound.min.x > Crafty.viewport.width) {
                if (Crafty.viewport.x < (-bound.max.x + Crafty.viewport.width) / this._scale) {
                    Crafty.viewport.x = (-bound.max.x + Crafty.viewport.width) / this._scale;
                } else if (Crafty.viewport.x > -bound.min.x) {
                    Crafty.viewport.x = -bound.min.x;
                }
            } else {
                Crafty.viewport.x = -1 * (bound.min.x + (bound.max.x - bound.min.x) / 2 - Crafty.viewport.width / 2);
            }
            if (bound.max.y - bound.min.y > Crafty.viewport.height) {
                if (Crafty.viewport.y < (-bound.max.y + Crafty.viewport.height) / this._scale) {
                    Crafty.viewport.y = (-bound.max.y + Crafty.viewport.height) / this._scale;
                } else if (Crafty.viewport.y > -bound.min.y) {
                    Crafty.viewport.y = -bound.min.y;
                }
            } else {
                Crafty.viewport.y = -1 * (bound.min.y + (bound.max.y - bound.min.y) / 2 - Crafty.viewport.height / 2);
            }
        },

        /**@
         * #Crafty.viewport.init
         * @comp Crafty.viewport
         * @sign public void Crafty.viewport.init([Number width, Number height, String stage_elem])
         * @sign public void Crafty.viewport.init([Number width, Number height, HTMLElement stage_elem])
         * @param Number width - Width of the viewport
         * @param Number height - Height of the viewport
         * @param String or HTMLElement stage_elem - the element to use as the stage (either its id or the actual element).
         *
         * Initialize the viewport. If the arguments 'width' or 'height' are missing, use `window.innerWidth` and `window.innerHeight` (full screen model).
         *
         * The argument 'stage_elem' is used to specify a stage element other than the default, and can be either a string or an HTMLElement.  If a string is provided, it will look for an element with that id and, if none exists, create a div.  If an HTMLElement is provided, that is used directly.  Omitting this argument is the same as passing an id of 'cr-stage'.
         *
         * @see Crafty.device, Crafty.domHelper, Crafty.stage
         */
        init: function (w, h, stage_elem) {
            // setters+getters for the viewport
            this._defineViewportProperties();

            // Set initial values -- necessary on restart
            this._x = 0;
            this._y = 0;
            this._scale = 1;
            this.bounds = null;

            // If no width or height is defined, the width and height is set to fullscreen
            this._width = w || window.innerWidth;
            this._height = h || window.innerHeight;

            //check if stage exists
            if (typeof stage_elem === 'undefined')
                stage_elem = "cr-stage";

            var crstage;
            if (typeof stage_elem === 'string')
                crstage = document.getElementById(stage_elem);
            else if (typeof HTMLElement !== "undefined" ? stage_elem instanceof HTMLElement : stage_elem instanceof Element)
                crstage = stage_elem;
            else
                throw new TypeError("stage_elem must be a string or an HTMLElement");

            /**@
             * #Crafty.stage
             * @category Core
             * The stage where all the DOM entities will be placed.
             */

            /**@
             * #Crafty.stage.elem
             * @comp Crafty.stage
             * The `#cr-stage` div element.
             */

            /**@
             * #Crafty.domLayer._div
             * @comp Crafty.domLayer
             * `Crafty.domLayer._div` is a div inside the `#cr-stage` div that holds all DOM entities.
             * If you use canvas, a `canvas` element is created at the same level in the dom
             * as the the `Crafty.domLayer._div` div. So the hierarchy in the DOM is
             *  
             * ~~~
             * Crafty.stage.elem
             *  - Crafty.domLayer._div (a div HTMLElement)
             *  - Crafty.canvasLayer._canvas (a canvas HTMLElement)
             * ~~~
             */

            //create stage div to contain everything
            Crafty.stage = {
                x: 0,
                y: 0,
                fullscreen: false,
                elem: (crstage ? crstage : document.createElement("div")),
            };

            //fullscreen, stop scrollbars
            if (!w && !h) {
                document.body.style.overflow = "hidden";
                Crafty.stage.fullscreen = true;
            }

            Crafty.addEvent(this, window, "resize", Crafty.viewport.reload);

            Crafty.addEvent(this, window, "blur", function () {
                if (Crafty.settings.get("autoPause")) {
                    if (!Crafty._paused) Crafty.pause();
                }
            });
            Crafty.addEvent(this, window, "focus", function () {
                if (Crafty._paused && Crafty.settings.get("autoPause")) {
                    Crafty.pause();
                }
            });

            //make the stage unselectable
            Crafty.settings.register("stageSelectable", function (v) {
                Crafty.stage.elem.onselectstart = v ? function () {
                    return true;
                } : function () {
                    return false;
                };
            });
            Crafty.settings.modify("stageSelectable", false);

            //make the stage have no context menu
            Crafty.settings.register("stageContextMenu", function (v) {
                Crafty.stage.elem.oncontextmenu = v ? function () {
                    return true;
                } : function () {
                    return false;
                };
            });
            Crafty.settings.modify("stageContextMenu", false);

            Crafty.settings.register("autoPause", function () {});
            Crafty.settings.modify("autoPause", false);

            //add to the body and give it an ID if not exists
            if (!crstage) {
                document.body.appendChild(Crafty.stage.elem);
                Crafty.stage.elem.id = stage_elem;
            }

            var elem = Crafty.stage.elem.style,
                offset;

            //css style
            elem.width = this.width + "px";
            elem.height = this.height + "px";
            elem.overflow = "hidden";


            // resize events
            Crafty.bind("ViewportResize", function(){Crafty.trigger("InvalidateViewport");});

            if (Crafty.mobile) {

                // remove default gray highlighting after touch
                if (typeof elem.webkitTapHighlightColor !== undefined) {
                    elem.webkitTapHighlightColor = "rgba(0,0,0,0)";
                }

                var meta = document.createElement("meta"),
                    head = document.getElementsByTagName("head")[0];

                //hide the address bar
                meta = document.createElement("meta");
                meta.setAttribute("name", "apple-mobile-web-app-capable");
                meta.setAttribute("content", "yes");
                head.appendChild(meta);

                Crafty.addEvent(this, Crafty.stage.elem, "touchmove", function (e) {
                    e.preventDefault();
                });


            }
            
            elem.position = "relative";
            //find out the offset position of the stage
            offset = Crafty.domHelper.innerPosition(Crafty.stage.elem);
            Crafty.stage.x = offset.x;
            Crafty.stage.y = offset.y;

            Crafty.uniqueBind("ViewportResize", this._resize);
        },

        _resize: function(){
            Crafty.stage.elem.style.width = Crafty.viewport.width + "px";
            Crafty.stage.elem.style.height = Crafty.viewport.height + "px";
        },

        // Create setters/getters for x, y, width, height
        _defineViewportProperties: function(){
            Object.defineProperty(this, 'x', {
                set: function (v) {
                    this.scroll('_x', v);
                },
                get: function () {
                    return this._x;
                },
                configurable : true
            });
            Object.defineProperty(this, 'y', {
                set: function (v) {
                    this.scroll('_y', v);
                },
                get: function () {
                    return this._y;
                },
                configurable : true
            });
            Object.defineProperty(this, 'width', {
                set: function (v) {
                    this._width = v;
                    Crafty.trigger("ViewportResize");
                },
                get: function () {
                    return this._width;
                },
                configurable : true
            });
            Object.defineProperty(this, 'height', {
                set: function (v) {
                    this._height = v;
                    Crafty.trigger("ViewportResize");
                },
                get: function () {
                    return this._height;
                },
                configurable : true
            });
        },

        /**@
         * #Crafty.viewport.reload
         * @comp Crafty.stage
         *
         * @sign public Crafty.viewport.reload()
         *
         * Recalculate and reload stage width, height and position.
         * Useful when browser return wrong results on init (like safari on Ipad2).
         * You should also call this method if you insert custom DOM elements that affect Crafty's stage offset.
         *
         */
        reload: function () {
            var w = window.innerWidth,
                h= window.innerHeight,
                offset;


            if (Crafty.stage.fullscreen) {
                this._width = w;
                this._height = h;
                Crafty.trigger("ViewportResize");
            }

            offset = Crafty.domHelper.innerPosition(Crafty.stage.elem);
            Crafty.stage.x = offset.x;
            Crafty.stage.y = offset.y;
        },

        /**@
         * #Crafty.viewport.reset
         * @comp Crafty.stage
         * @trigger StopCamera - called to cancel camera animations
         *
         * @sign public Crafty.viewport.reset()
         *
         * Resets the viewport to starting values, and cancels any existing camera animations.
         * Called when scene() is run.
         */
        reset: function () {
            Crafty.viewport.mouselook("stop");
            Crafty.trigger("StopCamera");
            // Reset viewport position and scale
            Crafty.viewport.scroll("_x", 0);
            Crafty.viewport.scroll("_y", 0);
            Crafty.viewport.scale(1);
        },

        /**@
         * #Crafty.viewport.onScreen
         * @comp Crafty.viewport
         * @sign public Crafty.viewport.onScreen(Object rect)
         * @param rect - A rectangle with field {_x: x_val, _y: y_val, _w: w_val, _h: h_val}
         *
         * Test if a rectangle is completely in viewport
         */
        onScreen: function (rect) {
            return Crafty.viewport._x + rect._x + rect._w > 0 && Crafty.viewport._y + rect._y + rect._h > 0 &&
                Crafty.viewport._x + rect._x < Crafty.viewport.width && Crafty.viewport._y + rect._y < Crafty.viewport.height;
        },
    }
});

},{"../core/core.js":7}],35:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

// Object for abstracting out all the gl calls to handle rendering entities with a particular program
RenderProgramWrapper = function(context, shader){
    this.shader = shader;
    this.context = context;

    this.array_size = 16;
    this.max_size = 1024;
    this._indexArray = new Uint16Array(6 * this.array_size);
    this._indexBuffer = context.createBuffer();
};

RenderProgramWrapper.prototype = {
    // Takes an array of attributes; see Crafty.webgl.getProgramWrapper
    initAttributes: function(attributes){
        this.attributes = attributes;
        this._attribute_table = {};
        var offset = 0;
        for (var i=0; i<attributes.length; i++){
            var a = attributes[i];
            this._attribute_table[a.name] = a;

            a.bytes = a.bytes || Float32Array.BYTES_PER_ELEMENT;
            a.type = a.type || this.context.FLOAT;
            a.offset = offset;
            a.location = this.context.getAttribLocation(this.shader, a.name);

            this.context.enableVertexAttribArray(a.location);

            offset += a.width;
        }

        // Stride is the full width including the last set
        this.stride = offset;

        // Create attribute array of correct size to hold max elements
        this._attributeArray = new Float32Array(this.array_size*4*this.stride);
        this._attributeBuffer = this.context.createBuffer();
        this._registryHoles = [];
        this._registrySize = 0;
    },

    // increase the size of the typed arrays
    // does so by creating a new array of that size and copying the existing one into it
    growArrays: function(size){
        if(this.array_size >= this.max_size) return;

        var newsize = Math.min(size, this.max_size);

        var newAttributeArray = new Float32Array(newsize*4*this.stride);
        var newIndexArray = new Uint16Array(6 * newsize);

        newAttributeArray.set(this._attributeArray);
        newIndexArray.set(this._indexArray);

        this._attributeArray = newAttributeArray;
        this._indexArray = newIndexArray;
        this.array_size = newsize;
    },

    // Add an entity that needs to be rendered by this program
    // Needs to be assigned an index in the buffer
    registerEntity: function(e){
        if (this._registryHoles.length === 0) {
            if (this._registrySize >= this.max_size){
                throw("Number of entities exceeds maximum limit.");
            } else if (this._registrySize >= this.array_size) {
                this.growArrays(2*this.array_size);
            }
            e._glBufferIndex = this._registrySize;
            this._registrySize++;
        } else {
            e._glBufferIndex = this._registryHoles.pop();
        }
    },

    // remove an entity; allow its buffer index to be reused
    unregisterEntity: function(e){
        if (typeof e._glBufferIndex === "number")
            this._registryHoles.push(e._glBufferIndex);
        e._glBufferIndex = null;
    },

    resetRegistry: function(){
        this._maxElement = 0;
        this._registryHoles.length = 0;
    },

    setCurrentEntity: function(ent){
        // offset is 4 * buffer index, because each entity has 4 vertices
        this.ent_offset = ent._glBufferIndex*4;
        this.ent = ent;
    },

    // Called before a batch of entities is prepped for rendering
    switchTo: function(){
        var gl = this.context;
        gl.useProgram(this.shader);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._attributeBuffer);
        var a, attributes = this.attributes;
        // Process every attribute
        for (var i=0; i<attributes.length; i++){
            a = attributes[i];
            gl.vertexAttribPointer(a.location, a.width, a.type, false, this.stride*a.bytes, a.offset*a.bytes);
        }

        // For now, special case the need for texture objects
        var t = this.texture_obj;
        if (t && t.unit === null){
            Crafty.webgl.texture_manager.bindTexture(t);
        }

        this.index_pointer = 0;
    },

    // Sets a texture
    setTexture: function(texture_obj) {
        // Only needs to be done once
        if (this.texture_obj !== undefined)
            return;
        // Set the texture buffer to use
        texture_obj.setToProgram(this.shader, "uSampler", "uTextureDimensions");
        this.texture_obj = texture_obj;
    },

    // adds a set of 6 indices to the index array
    // Corresponds to 2 triangles that make up a rectangle
    addIndices: function(offset){
        var index = this._indexArray, l = this.index_pointer;
        index[0+l] = 0 + offset;
        index[1+l] = 1 + offset;
        index[2+l] = 2 + offset;
        index[3+l] = 1 + offset;
        index[4+l] = 2 + offset;
        index[5+l] = 3 + offset;
        this.index_pointer+=6;
    },


    // Writes data from the attribute and index arrays to the appropriate buffers, and then calls drawElements.
    renderBatch: function(){
        var gl = this.context;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._attributeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._attributeArray, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indexArray, gl.STATIC_DRAW);
        gl.drawElements(gl.TRIANGLES, this.index_pointer, gl.UNSIGNED_SHORT, 0);
    },

    setViewportUniforms: function(viewport){
        var gl = this.context;
        gl.useProgram(this.shader);
        gl.uniform4f(this.shader.viewport, viewport._x, viewport._y, viewport._width/viewport._scale, viewport._height/viewport._scale);
    },

    // Fill in the attribtue with the given arguments, cycling through the data if necessary
    // If the arguments provided match the width of the attribute, that means it'll fill the same values for each of the four vertices.
    // TODO determine if this abstraction is a performance hit!
    writeVector: function (name, x, y){
        var a = this._attribute_table[name];
        var stride = this.stride, offset = a.offset+this.ent_offset*stride, w = a.width;
        var l = (arguments.length-1);
        var data = this._attributeArray;

        for (var r=0; r<4 ; r++)
            for (var c=0; c<w; c++){
                data[offset + stride*r + c] = arguments[ (w*r + c) % l + 1];
            }
        }
};


/**@
 * #WebGL
 * @category Graphics
 * @trigger Draw - when the entity is ready to be drawn to the stage - {type: "canvas", pos, co, ctx}
 * @trigger NoCanvas - if the browser does not support canvas
 *
 * When this component is added to an entity it will be drawn to the global webgl canvas element. Its canvas element (and hence any WebGL entity) is always rendered below any DOM entities.
 *
 * Sprite, Image, SpriteAnimation, and Color all support WebGL rendering.  Text entities will need to use DOM or Canvas for now.
 * 
 * If a webgl context does not yet exist, a WebGL entity will automatically create one by calling `Crafty.webgl.init()` before rendering.
 *
 * @note For better performance, minimize the number of spritesheets used, and try to arrange it so that entities with different spritesheets are on different z-levels.  This is because entities are rendered in z order, and only entities sharing the same texture can be efficiently batched.
 *
 * Create a webgl entity like this
 * ~~~
 * var myEntity = Crafty.e("2D, WebGL, Color")
 *      .color(1, 1, 0, 0.5)
 *      .attr({x: 13, y: 37, w: 42, h: 42});
 *~~~
 */

Crafty.c("WebGL", {
    /**@
     * #.context
     * @comp WebGL
     * 
     * The webgl context this entity will be rendered to.
     */
    init: function () {
        if (!Crafty.webgl.context) {
            Crafty.webgl.init();
        }
        var webgl = this.webgl = Crafty.webgl;
        var gl = webgl.context;

        //increment the amount of canvas objs
        this._changed = true;
        this.bind("Change", this._glChange);
    },

    remove: function(){
        this._changed = true;
        this.unbind(this._glChange);
        // Webgl components need to be removed from their gl program
        if (this.program) {
            this.program.unregisterEntity(this);
        }
    },

    _glChange: function(){
        //flag if changed
        if (this._changed === false) {
            this._changed = true;
        }
    },

    // Cache the various objects and arrays used in draw
    drawVars: {
        type: "webgl",
        pos: {},
        ctx: null,
        coord: [0, 0, 0, 0],
        co: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        }
    },

    /**@
     * #.draw
     * @comp WebGL
     * @sign public this .draw([[Context ctx, ]Number x, Number y, Number w, Number h])
     * @param ctx - Optionally supply a different r 2D context if drawing on another canvas is required
     * @param x - X offset for drawing a segment
     * @param y - Y offset for drawing a segment
     * @param w - Width of the segment to draw
     * @param h - Height of the segment to draw
     *
     * An internal method to draw the entity on the webgl canvas element. Rather then rendering directly, it writes relevent information into a buffer to allow batch rendering.
     */
    draw: function (ctx, x, y, w, h) {

        if (!this.ready) return;

        if (arguments.length === 4) {
            h = w;
            w = y;
            y = x;
            x = ctx;
            ctx = this.webgl.context;
        }

        var pos = this.drawVars.pos;
        pos._x = (this._x + (x || 0));
        pos._y = (this._y + (y || 0));
        pos._w = (w || this._w);
        pos._h = (h || this._h);

        var coord = this.__coord || [0, 0, 0, 0];
        var co = this.drawVars.co;
        co.x = coord[0] + (x || 0);
        co.y = coord[1] + (y || 0);
        co.w = w || coord[2];
        co.h = h || coord[3];

        // Handle flipX, flipY
        // (Just swap the positions of e.g. x and x+w)
        if (this._flipX ) {
           co.x = co.x + co.w;
           co.w = - co.w;
        }
        if (this._flipY ) {
           co.y = co.y + co.h;
           co.h = - co.h;
        }

        //Draw entity
        var gl = this.webgl.context;
        this.drawVars.gl = gl;
        var prog = this.drawVars.program = this.program;

        // The program might need to refer to the current element's index
        prog.setCurrentEntity(this);
        // Write position; x, y, w, h
        prog.writeVector("aPosition",
            this._x, this._y,
            this._x , this._y + this._h,
            this._x + this._w, this._y,
            this._x + this._w, this._y + this._h
        );

        // Write orientation 
        prog.writeVector("aOrientation",
            this._origin.x + this._x,
            this._origin.y + this._y,
            this._rotation * Math.PI / 180
        );

        // Write z, alpha
        prog.writeVector("aLayer",
            this._globalZ,
            this._alpha
        );

        // This should only need to handle *specific* attributes!
        this.trigger("Draw", this.drawVars);

        // Register the vertex groups to be drawn, referring to this entities position in the big buffer
        prog.addIndices(prog.ent_offset);
        
        return this;
    },

    // v_src is optional, there's a default vertex shader that works for regular rectangular entities
    _establishShader: function(compName, f_src, v_src, attributes){
        this.program = this.webgl.getProgramWrapper(compName, f_src, v_src, attributes);
        
        // Needs to know where in the big array we are!
        this.program.registerEntity(this);
        // Shader program means ready
        this.ready = true;
    }
});

/**@
 * #Crafty.webgl
 * @category Graphics
 *
 * A collection of methods to handle webgl contexts.
 */
Crafty.extend({

    webgl: {
        /**@
         * #Crafty.webgl.context
         * @comp Crafty.webgl
         *
         * This will return the context of the webgl canvas element.
         */
        context: null,
        changed_objects: [],
   
       // Create a vertex or fragment shader, given the source and type
       _compileShader: function (src, type){
            var gl = this.context;
            var shader = gl.createShader(type);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
              throw(gl.getShaderInfoLog(shader));
            }
            return shader;
        },

        // Create and return a complete, linked shader program, given the source for the fragment and vertex shaders.
        // Will compile the two shaders and then link them together
        _makeProgram: function (fragment_src, vertex_src){
            var gl = this.context;
            var fragment_shader = this._compileShader(fragment_src, gl.FRAGMENT_SHADER);
            var vertex_shader = this._compileShader(vertex_src, gl.VERTEX_SHADER);

            var shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, vertex_shader);
            gl.attachShader(shaderProgram, fragment_shader);
            gl.linkProgram(shaderProgram);

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
              throw("Could not initialise shaders");
            }
            
            shaderProgram.viewport = gl.getUniformLocation(shaderProgram, "uViewport");
            return shaderProgram;
        },

        programs: {},

        // Will create and return a RenderProgramWrapper for a shader program.
        // name is a unique id, attributes an array of attribute names with their metadata.
        // Each attribute needs at least a `name`  and `width` property:
        // ~~~
        //   [
        //      {name:"aPosition", width: 2},
        //      {name:"aOrientation", width: 3},
        //      {name:"aLayer", width:2},
        //      {name:"aColor",  width: 4}
        //   ]
        // ~~~
        // The "aPositon", "aOrientation", and "aLayer" attributes should be the same for any webgl entity,
        // since they support the basic 2D properties
        getProgramWrapper: function(name, fragment_src, vertex_src, attributes){
            if (this.programs[name] === undefined){
                var shader = this._makeProgram(fragment_src, vertex_src);
                var program = new RenderProgramWrapper(this.context, shader);
                program.name = name;
                program.initAttributes(attributes);
                program.setViewportUniforms(Crafty.viewport);
                this.programs[name] = program;
            }
            return this.programs[name];
        },

        // Make a texture out of the given image element
        // The url is just used as a unique ID
        makeTexture: function(url, image, repeating){
            var webgl = this;
            return webgl.texture_manager.makeTexture(url, image, repeating);
        },

        /**@
         * #Crafty.webgl.init
         * @comp Crafty.webgl
         * @sign public void Crafty.webgl.init(void)
         * @trigger NoWebGL - triggered if `Crafty.support.webgl` is false
         *
         * This will create a `canvas` element inside `Crafty.stage.elem`, used for displaying "WebGL" components.
         *
         * This method will automatically be called by any "WebGL" component if no `Crafty.webgl.context` is
         * found, so it is not neccessary to call this manually.
         */
        init: function () {

            //check if we support webgl is supported
            if (!Crafty.support.webgl) {
                Crafty.trigger("NoWebGL");
                Crafty.stop();
                return;
            }

            // necessary on restart
            this.changed_objects = [];

            //create an empty canvas element
            var c;
            c = document.createElement("canvas");
            c.width = Crafty.viewport.width;
            c.height = Crafty.viewport.height;
            c.style.position = 'absolute';
            c.style.left = "0px";
            c.style.top = "0px";

            Crafty.stage.elem.appendChild(c);

            // Try to get a webgl context
            var gl;
            try {
                gl = c.getContext("webgl", { premultipliedalpha: true }) || c.getContext("experimental-webgl", { premultipliedalpha: true });
                gl.viewportWidth = c.width;
                gl.viewportHeight = c.height;
            } catch(e) {
                Crafty.trigger("NoWebGL");
                Crafty.stop();
                return;
            }

            // assign to this renderer
            this.context = gl;
            this._canvas = c;

            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            
            // These commands allow partial transparency, but require drawing in z-order
            gl.disable(gl.DEPTH_TEST);
            // This particular blend function requires the shader programs to output pre-multiplied alpha
            // This is necessary to match the blending of canvas/dom entities against the background color
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
            

            //Bind rendering of canvas context (see drawing.js)
            var webgl = this;
            Crafty.uniqueBind("RenderScene", webgl.render);
            Crafty.uniqueBind("ViewportResize", webgl._resize);
            Crafty.uniqueBind("InvalidateViewport", function(){webgl.dirtyViewport = true;});
            Crafty.uniqueBind("PixelartSet", webgl._setPixelart);
            webgl._setPixelart(Crafty._pixelartEnabled);
            this.dirtyViewport = true;

            this.texture_manager = new Crafty.TextureManager(gl, this);


        },

        // Called when the viewport resizes
        _resize: function(){
            var c = Crafty.webgl._canvas;
            c.width = Crafty.viewport.width;
            c.height = Crafty.viewport.height;

            var gl = Crafty.webgl.context;
            gl.viewportWidth = c.width;
            gl.viewportHeight = c.height;
        },

        // TODO consider shifting to texturemanager
        _setPixelart: function(enabled) {
            var gl = Crafty.webgl.context;
            if (enabled){
                Crafty.webgl.texture_filter = gl.NEAREST;
            } else {
                Crafty.webgl.texture_filter = gl.LINEAR;
            }
        },

        // convenicne to sort array by global Z
        zsort: function(a, b) {
                return a._globalZ - b._globalZ;
        },

        // Hold an array ref to avoid garbage
        visible_gl: [],

        // Render any entities associated with this context; called in response to a draw event
        render: function(rect){
            rect = rect || Crafty.viewport.rect();
            var webgl = Crafty.webgl,
                gl = webgl.context;

            // Set viewport and clear it
            gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            //Set the viewport uniform variables used by each registered program
            var programs = webgl.programs;
            if (webgl.dirtyViewport){
              for (var comp in programs) {
                  programs[comp].setViewportUniforms(Crafty.viewport);
              }
              webgl.dirtyViewport = false;
            }

            // Search for any entities in the given area (viewport unless otherwise specified)
            var q = Crafty.map.search(rect),
                i = 0,
                l = q.length,
                current;
            //From all potential candidates, build a list of visible entities, then sort by zorder
            var visible_gl = webgl.visible_gl;
            visible_gl.length = 0;
            for (i=0; i < l; i++) {
                current = q[i];
                if (current._visible && current.__c.WebGL && current.program) {
                    visible_gl.push(current);
                }
            }
            visible_gl.sort(webgl.zsort);
            l = visible_gl.length;


            // Now iterate through the z-sorted entities to be rendered
            // Each entity writes it's data into a typed array
            // The entities are rendered in batches, where the entire array is copied to a buffer in one operation
            // A batch is rendered whenever the next element needs to use a different type of program
            // Therefore, you get better performance by grouping programs by z-order if possible.
            // (Each sprite sheet will use a different program, but multiple sprites on the same sheet can be rendered in one batch)
            var batchCount = 0;
            var shaderProgram = null;
            for (i=0; i < l; i++) {
                current = visible_gl[i];
                if (shaderProgram !== current.program){
                  if (shaderProgram !== null){
                    shaderProgram.renderBatch();
                  }

                  shaderProgram = current.program;
                  shaderProgram.index_pointer = 0;
                  shaderProgram.switchTo();
                }
                current.draw();
                current._changed = false;
            }

            if (shaderProgram !== null){
              shaderProgram.renderBatch();
            }
            
        }

    }
});
},{"../core/core.js":7}],36:[function(require,module,exports){
var Crafty = require('../core/core.js');


Crafty.extend({
    /**@
     * #Crafty.diamondIso
     * @category 2D
     * Place entities in a 45deg diamond isometric fashion. It is similar to isometric but has another grid locations
     * In this mode, the x axis and y axis are aligned to the edges of tiles with x increasing being down and to the
     * right and y being down and to the left.
     */
    diamondIso: {
        _tile: {
            width: 0,
            height: 0
        },
        getTileDimensions: function(){
            return {w:this._tile.width,h:this._tile.height};
        },
        _map: {
            width: 0,
            height: 0
        },
        _origin: {
            x: 0,
            y: 0
        },
        _tiles: [],
        getTile: function(x,y,z){
            return this._tiles[x][y][z];
        },
        /**@
         * #Crafty.diamondIso.init
         * @comp Crafty.diamondIso
         * @sign public this Crafty.diamondIso.init(Number tileWidth,Number tileHeight,Number mapWidth,Number mapHeight)
         * @param tileWidth - The size of base tile width's grid space in Pixel
         * @param tileHeight - The size of base tile height grid space in Pixel
         * @param mapWidth - The width of whole map in Tiles
         * @param mapHeight - The height of whole map in Tiles
         * @param x - the x coordinate of the TOP corner of the 0,0 tile
         * @param y - the y coordinate of the TOP corner of the 0,0, tile
         *
         * Method used to initialize the size of the isometric placement.
         * Recommended to use a size alues in the power of `2` (128, 64 or 32).
         * This makes it easy to calculate positions and implement zooming.
         *
         * @example
         * ~~~
         * var iso = Crafty.diamondIso.init(64,128,20,20);
         * ~~~
         *
         * @see Crafty.diamondIso.place
         */
        init: function (tw, th, mw, mh, x, y) {
            this._tile.width = parseInt(tw, 10);
            this._tile.height = parseInt(th, 10) || parseInt(tw, 10) / 2;
            this._tile.r = this._tile.width / this._tile.height;

            this._map.width = parseInt(mw, 10);
            this._map.height = parseInt(mh, 10) || parseInt(mw, 10);
            for (var i=0; i<mw; i++) {
                this._tiles[i]=Array();
                for (var j=0; j<mh; j++){
                this._tiles[i][j]=Array();
                }
            }
            this.x = parseInt(x,10) || 0;
            this.y = parseInt(y,10) || 0;
            this.layerZLevel= (mw+mh+1);
            return this;
        },
        /**@
         * #Crafty.diamondIso.place
         * @comp Crafty.diamondIso
         * @sign public this Crafty.diamondIso.place(Entity tile,Number x, Number y, Number layer)
         * @param x - The `x` position to place the tile
         * @param y - The `y` position to place the tile
         * @param layer - The `z` position to place the tile
         * @param tile - The entity that should be position in the isometric fashion
         *
         * Use this method to place an entity in an isometric grid.
         *
         * @example
         * ~~~
         * var iso = Crafty.diamondIso.init(64,128,20,20);
         * isos.place(Crafty.e('2D, DOM, Color').color('red').attr({w:128, h:128}),1,1,2);
         * ~~~
         *
         * @see Crafty.diamondIso.size
         */
        place: function (obj, x, y, layer) {
            var pos = this.pos2px(x, y);
            //this calculation is weird because tile sprites are h*2
            //for tiles of size h in isometric
            var objHeight = obj.tileHeight;
            var spriteHeight =obj.h/this._tile.height;
            obj.x = pos.x;
            obj.y = pos.y - (spriteHeight-2)*this._tile.height - this._tile.height*layer;
            obj.z = this.getZAtLoc(x,y,layer);
            for (var i=0; i<=spriteHeight-2; i++) {
                var prevTile = this._tiles[x][y][layer+i];
                if (prevTile && prevTile !== obj){
                    prevTile.destroy();
                }
                this._tiles[x][y][layer+i] = obj;
            }
            return this;

        },
        detachTile: function(obj){
            for (var _x=0; _x<this._map.width; _x++){
                for (var _y=0; _y<this._map.height; _y++){
                    var len = this._tiles[_x][_y].length;
                    for(var _z=0; _z<len; _z++){
                        if (this._tiles[_x][_y][_z] && obj === this._tiles[_x][_y][_z]){
                            tHeight=obj.h/this._tile.height;
                            for (var i=0; i<tHeight; i++){
                                this._tiles[_x][_y][_z+i] = undefined;
                            }
                            return {
                                x:_x,
                                y:_y,
                                z:_z
                            };
                        }

                    }
                }
            }
            return false;
        },
        centerAt: function (x, y) {
            var pos = this.pos2px(x, y);
            Crafty.viewport.x = -pos.x + Crafty.viewport.width / 2 - this._tile.width;
            Crafty.viewport.y = -pos.y + Crafty.viewport.height / 2;

        },
        getZAtLoc: function(x,y,layer){
            return this.layerZLevel * layer + x+y;
        },
        pos2px: function (x, y) {
        /* This returns the correct coordinates to place the 
        object's top and left to fit inside the grid, which is
        NOT inside of the tile for an isometric grid.  IF you
        want the top corner of the diamond add tile width/2 */
            return {
                x: this.x + ((x - y - 1) * this._tile.width / 2),
                y: this.y + ((x + y) * this._tile.height / 2)
            };
        },
        px2pos: function (left, top) {
        /* This returns the x/y coordinates on z level 0.
        @TODO add a specifying z level
        */
            var v1 = (top - this.y)/this._tile.height;
            var v2 = (left - this.x)/this._tile.width;
            var x = v1+v2;
            var y = v1-v2;
            inX = x>0 && x<this._map.width;
            inY = y>0 && y<this._map.height;
            if (!inX || !inY){
                return undefined;
            }
            return {
                x: ~~x,
                y: ~~y
            };
        },
        getOverlappingTiles: function(x,y){
        /* This will find all of the tiles that might be at a given x/y in pixels */
                var pos = this.px2pos(x,y);
                var tiles = [];
                var _x = ~~pos.x;
                var _y = ~~pos.y;
                var maxX = this._map.width - _x;
                var maxY = this._map.height - _y;
                var furthest = Math.min(maxX, maxY);
                var obj = this._tiles[_x][_y][1];
                if (obj){
                    tiles.push(obj);
                }
                for (var i=1; i<furthest; i++){
                    var _obj= this._tiles[_x+i][_y+i][i];
                    if (_obj){
                        tiles.push(_obj);
                    }
                }
                return tiles;
        },
        polygon: function (obj) {
            /*I don't know what this is trying to do...*/
            obj.requires("Collision");
            var marginX = 0,
                marginY = 0;
            var points = [
                marginX - 0, obj.h - marginY - this._tile.height / 2,
                marginX - this._tile.width / 2, obj.h - marginY - 0,
                marginX - this._tile.width, obj.h - marginY - this._tile.height / 2,
                marginX - this._tile.width / 2, obj.h - marginY - this._tile.height
            ];
            var poly = new Crafty.polygon(points);
            return poly;

        }
    }

});

},{"../core/core.js":7}],37:[function(require,module,exports){
var Crafty = require('../core/core.js');


Crafty.extend({
    /**@
     * #Crafty.isometric
     * @category 2D
     * Place entities in a 45deg isometric fashion. The alignment of this
     * grid's axes for tile placement is 90 degrees.  If you are looking
     * to have the grid of tile indicies for this.place aligned to the tiles
     * themselves, use DiamondIso instead.
     */
    isometric: {
        _tile: {
            width: 0,
            height: 0
        },
        _elements: {},
        _pos: {
            x: 0,
            y: 0
        },
        _z: 0,
        /**@
         * #Crafty.isometric.size
         * @comp Crafty.isometric
         * @sign public this Crafty.isometric.size(Number tileSize)
         * @param tileSize - The size of the tiles to place.
         *
         * Method used to initialize the size of the isometric placement.
         * Recommended to use a size values in the power of `2` (128, 64 or 32).
         * This makes it easy to calculate positions and implement zooming.
         *
         * @example
         * ~~~
         * var iso = Crafty.isometric.size(128);
         * ~~~
         *
         * @see Crafty.isometric.place
         */
        size: function (width, height) {
            this._tile.width = width;
            this._tile.height = height > 0 ? height : width / 2; //Setup width/2 if height isn't set
            return this;
        },
        /**@
         * #Crafty.isometric.place
         * @comp Crafty.isometric
         * @sign public this Crafty.isometric.place(Number x, Number y, Number z, Entity tile)
         * @param x - The `x` position to place the tile
         * @param y - The `y` position to place the tile
         * @param z - The `z` position or height to place the tile
         * @param tile - The entity that should be position in the isometric fashion
         *
         * Use this method to place an entity in an isometric grid.
         *
         * @example
         * ~~~
         * var iso = Crafty.isometric.size(128);
         * iso.place(2, 1, 0, Crafty.e('2D, DOM, Color').color('red').attr({w:128, h:128}));
         * ~~~
         *
         * @see Crafty.isometric.size
         */
        place: function (x, y, z, obj) {
            var pos = this.pos2px(x, y);
            pos.top -= z * (this._tile.height / 2);
            obj.attr({
                x: pos.left + Crafty.viewport._x,
                y: pos.top + Crafty.viewport._y
            }).z += z;
            return this;
        },
        /**@
         * #Crafty.isometric.pos2px
         * @comp Crafty.isometric
         * @sign public Object Crafty.isometric.pos2px(Number x,Number y)
         * @param x - A position along the x axis
         * @param y - A position along the y axis
         * @return An object with `left` and `top` fields {left Number,top Number}
         *
         * This method converts a position in x and y coordinates to one in pixels
         *
         * @example
         * ~~~
         * var iso = Crafty.isometric.size(128,96);
         * var position = iso.pos2px(100,100); //Object { left=12800, top=4800}
         * ~~~
         */
        pos2px: function (x, y) {
            return {
                left: x * this._tile.width + (y & 1) * (this._tile.width / 2),
                top: y * this._tile.height / 2
            };
        },
        /**@
         * #Crafty.isometric.px2pos
         * @comp Crafty.isometric
         * @sign public Object Crafty.isometric.px2pos(Number left,Number top)
         * @param top - Offset from the top in pixels
         * @param left - Offset from the left in pixels
         * @return An object with `x` and `y` fields representing the position
         *
         * This method converts a position in pixels to x,y coordinates
         *
         * @example
         * ~~~
         * var iso = Crafty.isometric.size(128,96);
         * var px = iso.pos2px(12800,4800);
         * Crafty.log(px); //Object { x=100, y=100}
         * ~~~
         */
        px2pos: function (left, top) {
            return {
                x: -Math.ceil(-left / this._tile.width - (top & 1) * 0.5),
                y: top / this._tile.height * 2
            };
        },
        /**@
         * #Crafty.isometric.centerAt
         * @comp Crafty.isometric
         *
         * @sign public Obect Crafty.isometric.centerAt()
         * @returns An object with `top` and `left` fields represneting the viewport's current center
         *
         * @sign public this Crafty.isometric.centerAt(Number x, Number y)
         * @param x - The x position to center at
         * @param y - The y position to center at
         *
         * This method centers the Viewport at an `x,y` location or gives the current centerpoint of the viewport
         *
         * @example
         * ~~~
         * var iso = Crafty.isometric.size(128,96).centerAt(10,10); //Viewport is now moved
         * //After moving the viewport by another event you can get the new center point
         * Crafty.log(iso.centerAt());
         * ~~~
         */
        centerAt: function (x, y) {
            if (typeof x == "number" && typeof y == "number") {
                var center = this.pos2px(x, y);
                Crafty.viewport._x = -center.left + Crafty.viewport.width / 2 - this._tile.width / 2;
                Crafty.viewport._y = -center.top + Crafty.viewport.height / 2 - this._tile.height / 2;
                return this;
            } else {
                return {
                    top: -Crafty.viewport._y + Crafty.viewport.height / 2 - this._tile.height / 2,
                    left: -Crafty.viewport._x + Crafty.viewport.width / 2 - this._tile.width / 2
                };
            }
        },
        /**@
         * #Crafty.isometric.area
         * @comp Crafty.isometric
         * @sign public Object Crafty.isometric.area()
         * @return An obect with `x` and `y` fields, each of which have a start and end field.
         * In other words, the object has this structure: `{x:{start Number,end Number},y:{start Number,end Number}}`
         *
         * This method returns an object representing the bounds of the viewport
         *
         * @example
         * ~~~
         * var iso = Crafty.isometric.size(128,96).centerAt(10,10); //Viewport is now moved
         * var area = iso.area(); //get the area
         * for(var y = area.y.start;y <= area.y.end;y++){
         *   for(var x = area.x.start ;x <= area.x.end;x++){
         *       iso.place(x,y,0,Crafty.e("2D,DOM,gras")); //Display tiles in the Screen
         *   }
         * }
         * ~~~
         */
        area: function () {
            //Get the center Point in the viewport
            var center = this.centerAt();
            var start = this.px2pos(-center.left + Crafty.viewport.width / 2, -center.top + Crafty.viewport.height / 2);
            var end = this.px2pos(-center.left - Crafty.viewport.width / 2, -center.top - Crafty.viewport.height / 2);
            return {
                x: {
                    start: start.x,
                    end: end.x
                },
                y: {
                    start: start.y,
                    end: end.y
                }
            };
        }
    }
});

},{"../core/core.js":7}],38:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

Crafty.extend({
    /**@
     * #Crafty.audio
     * @category Audio
     *
     * Add sound files and play them. Chooses best format for browser support.
     * Due to the nature of HTML5 audio, three types of audio files will be
     * required for cross-browser capabilities. These formats are MP3, Ogg and WAV.
     * When sound was not muted on before pause, sound will be unmuted after unpause.
     * When sound is muted Crafty.pause() does not have any effect on sound
     *
     * The maximum number of sounds that can be played simultaneously is defined by Crafty.audio.maxChannels.  The default value is 7.
     */
    audio: {

        sounds: {},
        supported: null,
        codecs: { // Chart from jPlayer
            ogg: 'audio/ogg; codecs="vorbis"', //OGG
            wav: 'audio/wav; codecs="1"', // PCM
            webma: 'audio/webm; codecs="vorbis"', // WEBM
            mp3: 'audio/mpeg; codecs="mp3"', //MP3
            m4a: 'audio/mp4; codecs="mp4a.40.2"' // AAC / MP4
        },
        volume: 1, //Global Volume
        muted: false,
        paused: false,
        playCheck: null,
        /**
         * Function to setup supported formats
         **/
        _canPlay: function () {
            this.supported = {};
            // Without support, no formats are supported
            if (!Crafty.support.audio)
                return;
            var audio = this.audioElement(),
                canplay;
            for (var i in this.codecs) {
                canplay = audio.canPlayType(this.codecs[i]);
                if (canplay !== "" && canplay !== "no") {
                    this.supported[i] = true;
                } else {
                    this.supported[i] = false;
                }
            }

        },

        /**@
         * #Crafty.audio.supports
         * @comp Crafty.audio
         * @sign public this Crafty.audio.supports(String extension)
         * @param extension - A file extension to check audio support for
         *
         * Return true if the browser thinks it can play the given file type, otherwise false
         */
        supports: function (extension) {
            // Build cache of supported formats, if necessary
            if (this.supported === null)
                this._canPlay();

            if (this.supported[extension])
                return true;
            else
                return false;
        },

        /**
         * Function to get an Audio Element
         **/
        audioElement: function () {
            //IE does not support Audio Object
            return typeof Audio !== 'undefined' ? new Audio("") : document.createElement('audio');
        },

        /**@
         * #Crafty.audio.create
         * @comp Crafty.audio
         * @sign public this Crafty.audio.create(String id, String url)
         * @param id - A string to refer to sounds
         * @param url - A string pointing to the sound file
         *
         * Creates an audio asset with the given id and resource.  `Crafty.audio.add` is a more flexible interface that allows cross-browser compatibility.
         *
         * If the sound file extension is not supported, returns false; otherwise, returns the audio asset.
         */
        create: function (id, path) {
            //check extension, return if not supported
            var ext = path.substr(path.lastIndexOf('.') + 1).toLowerCase();
            if (!this.supports(ext))
                return false;

            //initiate the audio element
            var audio = this.audioElement();
            audio.id = id;
            audio.preload = "auto";
            audio.volume = Crafty.audio.volume;
            audio.src = path;

            //create an asset and metadata for the audio element
            Crafty.asset(path, audio);
            this.sounds[id] = {
                obj: audio,
                played: 0,
                volume: Crafty.audio.volume
            };
            return this.sounds[id];

        },

        /**@
         * #Crafty.audio.add
         * @comp Crafty.audio
         * @sign public this Crafty.audio.add(String id, String url)
         * @param id - A string to refer to sounds
         * @param url - A string pointing to the sound file
         * @sign public this Crafty.audio.add(String id, Array urls)
         * @param urls - Array of urls pointing to different format of the same sound, selecting the first that is playable
         * @sign public this Crafty.audio.add(Object map)
         * @param map - key-value pairs where the key is the `id` and the value is either a `url` or `urls`
         *
         * Loads a sound to be played. Due to the nature of HTML5 audio,
         * three types of audio files will be required for cross-browser capabilities.
         * These formats are MP3, Ogg and WAV.
         *
         * Passing an array of URLs will determine which format the browser can play and select it over any other.
         *
         * Accepts an object where the key is the audio name and
         * either a URL or an Array of URLs (to determine which type to use).
         *
         * The ID you use will be how you refer to that sound when using `Crafty.audio.play`.
         *
         * @example
         * ~~~
         * //adding audio from an object
         * Crafty.audio.add({
         *   shoot: ["sounds/shoot.wav",
         *           "sounds/shoot.mp3",
         *           "sounds/shoot.ogg"]
         * });
         *
         * //adding a single sound
         * Crafty.audio.add("walk", [
         * "sounds/walk.mp3",
         * "sounds/walk.ogg",
         * "sounds/walk.wav"
         * ]);
         *
         * //only one format
         * Crafty.audio.add("jump", "sounds/jump.mp3");
         * ~~~
         */
        add: function (id, url) {
            if (!Crafty.support.audio)
                return;

            var src,
                a;

            if (arguments.length === 1 && typeof id === "object") {
                for (var i in id) {
                    for (src in id[i]) {
                        a = Crafty.audio.create(i, id[i][src]);
                        if (a){
                            break;
                        }
                    }
                }
            }
            if (typeof id === "string") {
                if (typeof url === "string") {
                    a = Crafty.audio.create(id, url);
                }

                if (typeof url === "object") {
                    for (src in url) {
                        a = Crafty.audio.create(id, url[src]);
                        if (a)
                            break;
                    }
                }

            }
            return a;
        },
        /**@
         * #Crafty.audio.play
         * @comp Crafty.audio
         * @sign public this Crafty.audio.play(String id)
         * @sign public this Crafty.audio.play(String id, Number repeatCount)
         * @sign public this Crafty.audio.play(String id, Number repeatCount, Number volume)
         * @param id - A string to refer to sounds
         * @param repeatCount - Repeat count for the file, where -1 stands for repeat forever.
         * @param volume - volume can be a number between 0.0 and 1.0
         * @returns The audio element used to play the sound.  Null if the call failed due to a lack of open channels.
         *
         * Will play a sound previously added by using the ID that was used in `Crafty.audio.add`.
         * Has a default maximum of 5 channels so that the same sound can play simultaneously unless all of the channels are playing.

         * *Note that the implementation of HTML5 Audio is buggy at best.*
         *
         * @example
         * ~~~
         * Crafty.audio.play("walk");
         *
         * //play and repeat forever
         * Crafty.audio.play("backgroundMusic", -1);
         * Crafty.audio.play("explosion",1,0.5); //play sound once with volume of 50%
         * ~~~
         */
        play: function (id, repeat, volume) {
            if (repeat === 0 || !Crafty.support.audio || !this.sounds[id])
                return;
            var s = this.sounds[id];
            var c = this.getOpenChannel();
            if (!c)
                return null;
            c.id = id;
            c.repeat = repeat;
            var a = c.obj;


            c.volume = s.volume = s.obj.volume = volume || Crafty.audio.volume;

            a.volume = s.volume;
            a.src = s.obj.src;

            if (this.muted)
                a.volume = 0;
            a.play();
            s.played++;
            c.onEnd = function () {
                if (s.played < c.repeat || repeat == -1) {
                    if (this.currentTime)
                        this.currentTime = 0;
                    this.play();
                    s.played++;
                } else {
                    c.active = false;
                    this.pause();
                    this.removeEventListener("ended", c.onEnd, true);
                    this.currentTime = 0;
                    Crafty.trigger("SoundComplete", {
                        id: c.id
                    });
                }

            };
            a.addEventListener("ended", c.onEnd, true);

            return a;
        },



        /**@
         * #Crafty.audio.setChannels
         * @comp Crafty.audio
         * @sign public this Crafty.audio.setChannels(Number n)
         * @param n - The maximum number of channels
         */
        maxChannels: 7,
        setChannels: function (n) {
            this.maxChannels = n;
            if (n < this.channels.length)
                this.channels.length = n;
        },

        channels: [],
        // Finds an unused audio element, marks it as in use, and return it.
        getOpenChannel: function () {
            for (var i = 0; i < this.channels.length; i++) {
                var chan = this.channels[i];
                  /*
                   * Second test looks for stuff that's out of use,
                   * but fallen foul of Chromium bug 280417
                   */
                if (chan.active === false ||
                      chan.obj.ended && chan.repeat <= this.sounds[chan.id].played) {
                    chan.active = true;
                    return chan;
                }
            }
            // If necessary, create a new element, unless we've already reached the max limit
            if (i < this.maxChannels) {
                var c = {
                    obj: this.audioElement(),
                    active: true,
                    // Checks that the channel is being used to play sound id
                    _is: function (id) {
                        return this.id === id && this.active;
                    }
                };
                this.channels.push(c);
                return c;
            }
            // In that case, return null
            return null;
        },

        /**@
         * #Crafty.audio.remove
         * @comp Crafty.audio
         * @sign public this Crafty.audio.remove([String id])
         * @param id - A string to refer to sounds
         *
         * Will stop the sound and remove all references to the audio object allowing the browser to free the memory.
         * If no id is given, all sounds will be removed.
         * 
         * This function uses audio path set in Crafty.path in order to remove sound from the assets object.
         *
         * @example
         * ~~~
         * Crafty.audio.remove("walk");
         * ~~~
         */
        remove: function (id) {
            if (!Crafty.support.audio)
                return;

            var s, filename, audioFolder = Crafty.paths().audio;

            if (!id) {
                for (var i in this.sounds) {
                    s = this.sounds[i];
                    filename = s.obj.src.split('/').pop();
                    Crafty.audio.stop(id);
                    delete Crafty.assets[audioFolder + filename];
                    delete Crafty.assets[s.obj.src];
                    delete Crafty.audio.sounds[id];
                }
                return;
            }
            if (!this.sounds[id])
                return;

            s = this.sounds[id];
            filename = s.obj.src.split('/').pop();
            Crafty.audio.stop(id);
            delete Crafty.assets[audioFolder + filename];
            delete Crafty.assets[s.obj.src];
            delete Crafty.audio.sounds[id];
        },
        /**@
         * #Crafty.audio.stop
         * @comp Crafty.audio
         * @sign public this Crafty.audio.stop([Number ID])
         *
         * Stops any playing sound. if id is not set, stop all sounds which are playing
         *
         * @example
         * ~~~
         * //all sounds stopped playing now
         * Crafty.audio.stop();
         *
         * ~~~
         */
        stop: function (id) {
            if (!Crafty.support.audio)
                return;
            for (var i in this.channels) {
                c = this.channels[i];
                if ( (!id && c.active) || c._is(id) ) {
                    c.active = false;
                    c.obj.pause();
                }
            }
            return;
        },
        /**
         * #Crafty.audio._mute
         * @comp Crafty.audio
         * @sign public this Crafty.audio._mute([Boolean mute])
         *
         * Mute or unmute every Audio instance that is playing.
         */
        _mute: function (mute) {
            if (!Crafty.support.audio)
                return;
            var c;
            for (var i in this.channels) {
                c = this.channels[i];
                c.obj.volume = mute ? 0 : c.volume;
            }
            this.muted = mute;
        },
        /**@
         * #Crafty.audio.toggleMute
         * @comp Crafty.audio
         * @sign public this Crafty.audio.toggleMute()
         *
         * Mute or unmute every Audio instance that is playing. Toggles between
         * pausing or playing depending on the state.
         *
         * @example
         * ~~~
         * //toggle mute and unmute depending on current state
         * Crafty.audio.toggleMute();
         * ~~~
         */
        toggleMute: function () {
            if (!this.muted) {
                this._mute(true);
            } else {
                this._mute(false);
            }

        },
        /**@
         * #Crafty.audio.mute
         * @comp Crafty.audio
         * @sign public this Crafty.audio.mute()
         *
         * Mute every Audio instance that is playing.
         *
         * @example
         * ~~~
         * Crafty.audio.mute();
         * ~~~
         */
        mute: function () {
            this._mute(true);
        },
        /**@
         * #Crafty.audio.unmute
         * @comp Crafty.audio
         * @sign public this Crafty.audio.unmute()
         *
         * Unmute every Audio instance that is playing.
         *
         * @example
         * ~~~
         * Crafty.audio.unmute();
         * ~~~
         */
        unmute: function () {
            this._mute(false);
        },

        /**@
         * #Crafty.audio.pause
         * @comp Crafty.audio
         * @sign public this Crafty.audio.pause(string ID)
         * @param {string} id - The id of the audio object to pause
         *
         * Pause the Audio instance specified by id param.
         *
         * @example
         * ~~~
         * Crafty.audio.pause('music');
         * ~~~
         *
         */
        pause: function (id) {
            if (!Crafty.support.audio || !id || !this.sounds[id])
                return;
            var c;
            for (var i in this.channels) {
                c = this.channels[i];
                if (c._is(id) && !c.obj.paused)
                    c.obj.pause();
            }

        },

        /**@
         * #Crafty.audio.unpause
         * @comp Crafty.audio
         * @sign public this Crafty.audio.unpause(string ID)
         * @param {string} id - The id of the audio object to unpause
         *
         * Resume playing the Audio instance specified by id param.
         *
         * @example
         * ~~~
         * Crafty.audio.unpause('music');
         * ~~~
         *
         */
        unpause: function (id) {
            if (!Crafty.support.audio || !id || !this.sounds[id])
                return;
            var c;
            for (var i in this.channels) {
                c = this.channels[i];
                if (c._is(id) && c.obj.paused)
                    c.obj.play();
            }
        },

        /**@
         * #Crafty.audio.togglePause
         * @comp Crafty.audio
         * @sign public this Crafty.audio.togglePause(string ID)
         * @param {string} id - The id of the audio object to pause/
         *
         * Toggle the pause status of the Audio instance specified by id param.
         *
         * @example
         * ~~~
         * Crafty.audio.togglePause('music');
         * ~~~
         *
         */
        togglePause: function (id) {
            if (!Crafty.support.audio || !id || !this.sounds[id])
                return;
            var c;
            for (var i in this.channels) {
                c = this.channels[i];
                if (c._is(id)) {
                    if (c.obj.paused) {
                        c.obj.play();
                    } else {
                        c.obj.pause();
                    }
                }
            }
        },

        /**@
         * #Crafty.audio.isPlaying
         * @comp Crafty.audio
         * @sign public Boolean Crafty.audio.isPlaying(string ID)
         * @param {string} id - The id of the audio object
         * @return a Boolean indicating whether the audio is playing or not
         *
         * Check if audio with the given ID is playing or not (on at least one channel).
         *
         * @example
         * ~~~
         * var isPlaying = Crafty.audio.isPlaying('music');
         * ~~~
         *
         */
        isPlaying: function(id) {
            if (!Crafty.support.audio)
                return false;

            for (var i in this.channels) {
                if (this.channels[i]._is(id))
                    return true;
            }

            return false;
        }
    }
});

},{"../core/core.js":7}],39:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    HashMap = require('./spatial-grid.js');



/**@
 * #Crafty.map
 * @category 2D
 * Functions related with querying entities.
 * @see Crafty.HashMap
 */
Crafty.map = new HashMap();
var M = Math,
    Mc = M.cos,
    Ms = M.sin,
    PI = M.PI,
    DEG_TO_RAD = PI / 180;

/**@
 * #2D
 * @category 2D
 * Component for any entity that has a position on the stage.
 * @trigger Move - when the entity has moved - { _x:Number, _y:Number, _w:Number, _h:Number } - Old position
 * @trigger Invalidate - when the entity needs to be redrawn
 * @trigger Rotate - when the entity is rotated - { cos:Number, sin:Number, deg:Number, rad:Number, o: {x:Number, y:Number}}
 * @trigger Reorder - when the entity's z index has changed
 */
Crafty.c("2D", {
    /**@
     * #.x
     * @comp 2D
     * The `x` position on the stage. When modified, will automatically be redrawn.
     * Is actually a getter/setter so when using this value for calculations and not modifying it,
     * use the `._x` property.
     * @see ._attr
     */
    _x: 0,
    /**@
     * #.y
     * @comp 2D
     * The `y` position on the stage. When modified, will automatically be redrawn.
     * Is actually a getter/setter so when using this value for calculations and not modifying it,
     * use the `._y` property.
     * @see ._attr
     */
    _y: 0,
    /**@
     * #.w
     * @comp 2D
     * The width of the entity. When modified, will automatically be redrawn.
     * Is actually a getter/setter so when using this value for calculations and not modifying it,
     * use the `._w` property.
     *
     * Changing this value is not recommended as canvas has terrible resize quality and DOM will just clip the image.
     * @see ._attr
     */
    _w: 0,
    /**@
     * #.h
     * @comp 2D
     * The height of the entity. When modified, will automatically be redrawn.
     * Is actually a getter/setter so when using this value for calculations and not modifying it,
     * use the `._h` property.
     *
     * Changing this value is not recommended as canvas has terrible resize quality and DOM will just clip the image.
     * @see ._attr
     */
    _h: 0,
    /**@
     * #.z
     * @comp 2D
     * The `z` index on the stage. When modified, will automatically be redrawn.
     * Is actually a getter/setter so when using this value for calculations and not modifying it,
     * use the `._z` property.
     *
     * A higher `z` value will be closer to the front of the stage. A smaller `z` value will be closer to the back.
     * A global Z index is produced based on its `z` value as well as the GID (which entity was created first).
     * Therefore entities will naturally maintain order depending on when it was created if same z value.
     *
     * `z` is required to be an integer, e.g. `z=11.2` is not allowed.
     * @see ._attr
     */
    _z: 0,
    /**@
     * #.rotation
     * @comp 2D
     * The rotation state of the entity, in clockwise degrees.
     * `this.rotation = 0` sets it to its original orientation; `this.rotation = 10`
     * sets it to 10 degrees clockwise from its original orientation;
     * `this.rotation = -10` sets it to 10 degrees counterclockwise from its
     * original orientation, etc.
     *
     * When modified, will automatically be redrawn. Is actually a getter/setter
     * so when using this value for calculations and not modifying it,
     * use the `._rotation` property.
     *
     * `this.rotation = 0` does the same thing as `this.rotation = 360` or `720` or
     * `-360` or `36000` etc. So you can keep increasing or decreasing the angle for continuous
     * rotation. (Numerical errors do not occur until you get to millions of degrees.)
     *
     * The default is to rotate the entity around its (initial) top-left corner; use
     * `.origin()` to change that.
     *
     * @see ._attr, .origin
     */
    _rotation: 0,
    /**@
     * #.alpha
     * @comp 2D
     * Transparency of an entity. Must be a decimal value between 0.0 being fully transparent to 1.0 being fully opaque.
     */
    _alpha: 1.0,
    /**@
     * #.visible
     * @comp 2D
     * If the entity is visible or not. Accepts a true or false value.
     * Can be used for optimization by setting an entities visibility to false when not needed to be drawn.
     *
     * The entity will still exist and can be collided with but just won't be drawn.
     */
    _visible: true,

    /**@
     * #._globalZ
     * @comp 2D
     * When two entities overlap, the one with the larger `_globalZ` will be on top of the other.
     */
    _globalZ: null,

    _origin: null,
    _mbr: null,
    _entry: null,
    _children: null,
    _parent: null,
    _changed: false,

    
    // Setup   all the properties that we need to define
    _2D_property_definitions: {
        x: {
            set: function (v) {
                this._attr('_x', v);
            },
            get: function () {
                return this._x;
            },
            configurable: true,
            enumerable: true
        },
        _x: {enumerable:false},

        y: {
            set: function (v) {
                this._attr('_y', v);
            },
            get: function () {
                return this._y;
            },
            configurable: true,
            enumerable: true
        },
        _y: {enumerable:false},

        w: {
            set: function (v) {
                this._attr('_w', v);
            },
            get: function () {
                return this._w;
            },
            configurable: true,
            enumerable: true
        },
        _w: {enumerable:false},

        h: {
            set: function (v) {
                this._attr('_h', v);
            },
            get: function () {
                return this._h;
            },
            configurable: true,
            enumerable: true
        },
        _h: {enumerable:false},

        z: {
            set: function (v) {
                this._attr('_z', v);
            },
            get: function () {
                return this._z;
            },
            configurable: true,
            enumerable: true
        },
        _z: {enumerable:false},

        rotation: {
            set: function (v) {
                this._attr('_rotation', v);
            },
            get: function () {
                return this._rotation;
            },
            configurable: true,
            enumerable: true
        },
        _rotation: {enumerable:false},

        alpha: {
            set: function (v) {
                this._attr('_alpha', v);
            },
            get: function () {
                return this._alpha;
            },
            configurable: true,
            enumerable: true
        },
        _alpha: {enumerable:false},

        visible: {
            set: function (v) {
                this._attr('_visible', v);
            },
            get: function () {
                return this._visible;
            },
            configurable: true,
            enumerable: true
        },
        _visible: {enumerable:false}

    },

    _define2DProperties: function () {
        for (var prop in this._2D_property_definitions){
            Object.defineProperty(this, prop, this._2D_property_definitions[prop]);
        }
    },

    init: function () {
        this._globalZ = this[0];
        this._origin = {
            x: 0,
            y: 0
        };

        // offsets for the basic bounding box
        this._bx1 = 0;
        this._bx2 = 0;
        this._by1 = 0;
        this._by2 = 0;

        this._children = [];

        
        // create setters and getters that associate properties such as x/_x
        this._define2DProperties();
        

        //insert self into the HashMap
        this._entry = Crafty.map.insert(this);

        //when object changes, update HashMap
        this.bind("Move", function (e) {
            // Choose the largest bounding region that exists
            var area = this._cbr || this._mbr || this;
            this._entry.update(area);
            // Move children (if any) by the same amount
            if (this._children.length > 0) {
                this._cascade(e);
            }
        });

        this.bind("Rotate", function (e) {
            // Choose the largest bounding region that exists
            var old = this._cbr || this._mbr || this;
            this._entry.update(old);
            // Rotate children (if any) by the same amount
            if (this._children.length > 0) {
                this._cascade(e);
            }
        });

        //when object is removed, remove from HashMap and destroy attached children
        this.bind("Remove", function () {
            if (this._children) {
                for (var i = 0; i < this._children.length; i++) {
                    // delete the child's _parent link, or else the child will splice itself out of
                    // this._children while destroying itself (which messes up this for-loop iteration).
                    delete this._children[i]._parent;

                    // Destroy child if possible (It's not always possible, e.g. the polygon attached
                    // by areaMap has no .destroy(), it will just get garbage-collected.)
                    if (this._children[i].destroy) {
                        this._children[i].destroy();
                    }
                }
                this._children = [];
            }

            if (this._parent) {
                this._parent.detach(this);
            }

            Crafty.map.remove(this);

            this.detach();
        });
    },


    /**@
     * #.offsetBoundary
     * @comp 2D
     * Extends the MBR of the entity by a specified amount.
     * 
     * @trigger BoundaryOffset - when the MBR offset changes
     * @sign public this .offsetBoundary(Number dx1, Number dy1, Number dx2, Number dy2)
     * @param dx1 - Extends the MBR to the left by this amount
     * @param dy1 - Extends the MBR upward by this amount
     * @param dx2 - Extends the MBR to the right by this amount
     * @param dy2 - Extends the MBR downward by this amount
     *
     * @sign public this .offsetBoundary(Number offset)
     * @param offset - Extend the MBR in all directions by this amount
     *
     * You would most likely use this function to ensure that custom canvas rendering beyond the extent of the entity's normal bounds is not clipped.
     */
    offsetBoundary: function(x1, y1, x2, y2){
        if (arguments.length === 1)
            y1 = x2 = y2 = x1;
        this._bx1 = x1;
        this._bx2 = x2;
        this._by1 = y1;
        this._by2 = y2;
        this.trigger("BoundaryOffset");
        this._calculateMBR();
        return this;
    },

    /**
     * Calculates the MBR when rotated some number of radians about an origin point o.
     * Necessary on a rotation, or a resize
     */

    _calculateMBR: function () {
        var ox = this._origin.x + this._x,
            oy = this._origin.y + this._y,
            rad = -this._rotation * DEG_TO_RAD;
        // axis-aligned (unrotated) coordinates, relative to the origin point
        var dx1 = this._x - this._bx1 - ox,
            dx2 = this._x + this._w + this._bx2 - ox,
            dy1 = this._y - this._by1 - oy,
            dy2 = this._y + this._h + this._by2 - oy;

        var ct = Math.cos(rad),
            st = Math.sin(rad);
        // Special case 90 degree rotations to prevent rounding problems
        ct = (ct < 1e-10 && ct > -1e-10) ? 0 : ct;
        st = (st < 1e-10 && st > -1e-10) ? 0 : st;

        // Calculate the new points relative to the origin, then find the new (absolute) bounding coordinates!
        var x0 =   dx1 * ct + dy1 * st,
            y0 = - dx1 * st + dy1 * ct,
            x1 =   dx2 * ct + dy1 * st,
            y1 = - dx2 * st + dy1 * ct,
            x2 =   dx2 * ct + dy2 * st,
            y2 = - dx2 * st + dy2 * ct,
            x3 =   dx1 * ct + dy2 * st,
            y3 = - dx1 * st + dy2 * ct,
            minx = Math.floor(Math.min(x0, x1, x2, x3) + ox),
            miny = Math.floor(Math.min(y0, y1, y2, y3) + oy),
            maxx = Math.ceil(Math.max(x0, x1, x2, x3) + ox),
            maxy = Math.ceil(Math.max(y0, y1, y2, y3) + oy);
        if (!this._mbr) {
            this._mbr = {
                _x: minx,
                _y: miny,
                _w: maxx - minx,
                _h: maxy - miny
            };
        } else {
            this._mbr._x = minx;
            this._mbr._y = miny;
            this._mbr._w = maxx - minx;
            this._mbr._h = maxy - miny;
        }

        // If a collision hitbox exists AND sits outside the entity, find a bounding box for both.
        // `_cbr` contains information about a bounding circle of the hitbox. 
        // The bounds of `_cbr` will be the union of the `_mbr` and the bounding box of that circle.
        // This will not be a minimal region, but since it's only used for the broad phase pass it's good enough. 
        //
        // cbr is calculated by the `_checkBounds` method of the "Collision" component
        if (this._cbr) {
            var cbr = this._cbr;
            var cx = cbr.cx, cy = cbr.cy, r = cbr.r;
            var cx2 = ox + (cx + this._x - ox) * ct + (cy + this._y - oy) * st;
            var cy2 = oy - (cx + this._x - ox) * st + (cy + this._y - oy) * ct;
            cbr._x = Math.min(cx2 - r, minx);
            cbr._y = Math.min(cy2 - r, miny);
            cbr._w = Math.max(cx2 + r, maxx) - cbr._x;
            cbr._h = Math.max(cy2 + r, maxy) - cbr._y;
        }

    },

    /**
     * Handle changes that need to happen on a rotation
     */
    _rotate: function (v) {
        var theta = -1 * (v % 360); //angle always between 0 and 359
        var difference = this._rotation - v;
        // skip if there's no rotation!
        if (difference === 0)
            return;
        else
            this._rotation = v;

        //Calculate the new MBR
        var rad = theta * DEG_TO_RAD,
            o = {
                x: this._origin.x + this._x,
                y: this._origin.y + this._y
            };

        this._calculateMBR();


        //trigger "Rotate" event
        var drad = difference * DEG_TO_RAD,
            // ct = Math.cos(rad),
            // st = Math.sin(rad),
            cos = Math.cos(drad),
            sin = Math.sin(drad);

        this.trigger("Rotate", {
            cos: (-1e-10 < cos && cos < 1e-10) ? 0 : cos, // Special case 90 degree rotations to prevent rounding problems
            sin: (-1e-10 < sin && sin < 1e-10) ? 0 : sin, // Special case 90 degree rotations to prevent rounding problems
            deg: difference,
            rad: drad,
            o: o
        });
    },

    /**@
     * #.area
     * @comp 2D
     * @sign public Number .area(void)
     * Calculates the area of the entity
     */
    area: function () {
        return this._w * this._h;
    },

    /**@
     * #.intersect
     * @comp 2D
     * @sign public Boolean .intersect(Number x, Number y, Number w, Number h)
     * @param x - X position of the rect
     * @param y - Y position of the rect
     * @param w - Width of the rect
     * @param h - Height of the rect
     * @sign public Boolean .intersect(Object rect)
     * @param rect - An object that must have the `_x, _y, _w, _h` values as properties
     *
     * Determines if this entity intersects a rectangle.  If the entity is rotated, its MBR is used for the test.
     */
    intersect: function (x, y, w, h) {
        var rect, mbr = this._mbr || this;
        if (typeof x === "object") {
            rect = x;
        } else {
            rect = {
                _x: x,
                _y: y,
                _w: w,
                _h: h
            };
        }

        return mbr._x < rect._x + rect._w && mbr._x + mbr._w > rect._x &&
            mbr._y < rect._y + rect._h && mbr._y + mbr._h > rect._y;
    },

    /**@
     * #.within
     * @comp 2D
     * @sign public Boolean .within(Number x, Number y, Number w, Number h)
     * @param x - X position of the rect
     * @param y - Y position of the rect
     * @param w - Width of the rect
     * @param h - Height of the rect
     * @sign public Boolean .within(Object rect)
     * @param rect - An object that must have the `_x, _y, _w, _h` values as properties
     *
     * Determines if this current entity is within another rectangle.
     */
    within: function (x, y, w, h) {
        var rect, mbr = this._mbr || this;
        if (typeof x === "object") {
            rect = x;
        } else {
            rect = {
                _x: x,
                _y: y,
                _w: w,
                _h: h
            };
        }

        return rect._x <= mbr._x && rect._x + rect._w >= mbr._x + mbr._w &&
            rect._y <= mbr._y && rect._y + rect._h >= mbr._y + mbr._h;
    },

    /**@
     * #.contains
     * @comp 2D
     * @sign public Boolean .contains(Number x, Number y, Number w, Number h)
     * @param x - X position of the rect
     * @param y - Y position of the rect
     * @param w - Width of the rect
     * @param h - Height of the rect
     * @sign public Boolean .contains(Object rect)
     * @param rect - An object that must have the `_x, _y, _w, _h` values as properties.
     *
     * Determines if the rectangle is within the current entity.  If the entity is rotated, its MBR is used for the test.
     */
    contains: function (x, y, w, h) {
        var rect, mbr = this._mbr || this;
        if (typeof x === "object") {
            rect = x;
        } else {
            rect = {
                _x: x,
                _y: y,
                _w: w,
                _h: h
            };
        }

        return rect._x >= mbr._x && rect._x + rect._w <= mbr._x + mbr._w &&
            rect._y >= mbr._y && rect._y + rect._h <= mbr._y + mbr._h;
    },

    /**@
     * #.pos
     * @comp 2D
     * @sign public Object .pos([Object pos])
     * @param pos - an object to use as output
     *
     * @returns An object with this entity's `_x`, `_y`, `_w`, and `_h` values. 
     *          If an object is passed in, it will be reused rather than creating a new object.
     *
     * @note The keys have an underscore prefix. This is due to the x, y, w, h
     * properties being setters and getters that wrap the underlying properties with an underscore (_x, _y, _w, _h).
     */
    pos: function (pos) {
        pos = pos || {};
        pos._x = (this._x);
        pos._y = (this._y);
        pos._w = (this._w);
        pos._h = (this._h);
        return pos;
    },

    /**@
     * #.mbr
     * @comp 2D
     * @sign public Object .mbr()
     * Returns the minimum bounding rectangle. If there is no rotation
     * on the entity it will return the rect.
     */
    mbr: function (mbr) {
        mbr = mbr || {};
		if (!this._mbr) {
			return this.pos(mbr);
		} else {
            mbr._x = (this._mbr._x);
            mbr._y = (this._mbr._y);
            mbr._w = (this._mbr._w);
            mbr._h = (this._mbr._h);
            return mbr;
        }
    },

    /**@
     * #.isAt
     * @comp 2D
     * @sign public Boolean .isAt(Number x, Number y)
     * @param x - X position of the point
     * @param y - Y position of the point
     *
     * Determines whether a point is contained by the entity. Unlike other methods,
     * an object can't be passed. The arguments require the x and y value.
     *
     * The given point is tested against the first of the following that exists: a mapArea associated with "Mouse", the hitarea associated with "Collision", or the object's MBR.
     */
    isAt: function (x, y) {
        if (this.mapArea) {
            return this.mapArea.containsPoint(x, y);
        } else if (this.map) {
            return this.map.containsPoint(x, y);
        }
        var mbr = this._mbr || this;
        return mbr._x <= x && mbr._x + mbr._w >= x &&
            mbr._y <= y && mbr._y + mbr._h >= y;
    },

    /**@
     * #.move
     * @comp 2D
     * @sign public this .move(String dir, Number by)
     * @param dir - Direction to move (n,s,e,w,ne,nw,se,sw)
     * @param by - Amount to move in the specified direction
     *
     * Quick method to move the entity in a direction (n, s, e, w, ne, nw, se, sw) by an amount of pixels.
     */
    move: function (dir, by) {
        if (dir.charAt(0) === 'n') this.y -= by;
        if (dir.charAt(0) === 's') this.y += by;
        if (dir === 'e' || dir.charAt(1) === 'e') this.x += by;
        if (dir === 'w' || dir.charAt(1) === 'w') this.x -= by;

        return this;
    },

    /**@
     * #.shift
     * @comp 2D
     * @sign public this .shift(Number x, Number y, Number w, Number h)
     * @param x - Amount to move X
     * @param y - Amount to move Y
     * @param w - Amount to widen
     * @param h - Amount to increase height
     *
     * Shift or move the entity by an amount. Use negative values
     * for an opposite direction.
     */
    shift: function (x, y, w, h) {
        if (x) this.x += x;
        if (y) this.y += y;
        if (w) this.w += w;
        if (h) this.h += h;

        return this;
    },

    /**@
     * #._cascade
     * @comp 2D
     * @sign public void ._cascade(e)
     * @param e - An object describing the motion
     *
     * Move or rotate the entity's children according to a certain motion.
     * This method is part of a function bound to "Move": It is used
     * internally for ensuring that when a parent moves, the child also
     * moves in the same way.
     */
    _cascade: function (e) {
        if (!e) return; //no change in position
        var i = 0,
            children = this._children,
            l = children.length,
            obj;
        //rotation
        if (("cos" in e) || ("sin" in e)) {
            for (; i < l; ++i) {
                obj = children[i];
                if ('rotate' in obj) obj.rotate(e);
            }
        } else {
            //use current position
            var dx = this._x - e._x,
                dy = this._y - e._y,
                dw = this._w - e._w,
                dh = this._h - e._h;

            for (; i < l; ++i) {
                obj = children[i];
                obj.shift(dx, dy, dw, dh);
            }
        }
    },

    /**@
     * #.attach
     * @comp 2D
     * @sign public this .attach(Entity obj[, .., Entity objN])
     * @param obj - Child entity(s) to attach
     *
     * Sets one or more entities to be children, with the current entity (`this`)
     * as the parent. When the parent moves or rotates, its children move or
     * rotate by the same amount. (But not vice-versa: If you move a child, it
     * will not move the parent.) When the parent is destroyed, its children are
     * destroyed.
     *
     * For any entity, `this._children` is the array of its children entity
     * objects (if any), and `this._parent` is its parent entity object (if any).
     *
     * As many objects as wanted can be attached, and a hierarchy of objects is
     * possible by attaching.
     */
    attach: function () {
        var i = 0,
            arg = arguments,
            l = arguments.length,
            obj;
        for (; i < l; ++i) {
            obj = arg[i];
            if (obj._parent) {
                obj._parent.detach(obj);
            }
            obj._parent = this;
            this._children.push(obj);
        }

        return this;
    },

    /**@
     * #.detach
     * @comp 2D
     * @sign public this .detach([Entity obj])
     * @param obj - The entity to detach. Left blank will remove all attached entities
     *
     * Stop an entity from following the current entity. Passing no arguments will stop
     * every entity attached.
     */
    detach: function (obj) {
        var i;
        //if nothing passed, remove all attached objects
        if (!obj) {
            for (i = 0; i < this._children.length; i++) {
                this._children[i]._parent = null;
            }
            this._children = [];
            return this;
        }

        //if obj passed, find the handler and unbind
        for (i = 0; i < this._children.length; i++) {
            if (this._children[i] == obj) {
                this._children.splice(i, 1);
            }
        }
        obj._parent = null;

        return this;
    },

    /**@
     * #.origin
     * @comp 2D
     *
     * @sign public this .origin(Number x, Number y)
     * @param x - Pixel value of origin offset on the X axis
     * @param y - Pixel value of origin offset on the Y axis
     *
     * @sign public this .origin(String offset)
     * @param offset - Combination of center, top, bottom, middle, left and right
     *
     * Set the origin point of an entity for it to rotate around.
     *
     * @example
     * ~~~
     * this.origin("top left")
     * this.origin("center")
     * this.origin("bottom right")
     * this.origin("middle right")
     * ~~~
     *
     * @see .rotation
     */
    origin: function (x, y) {
        //text based origin
        if (typeof x === "string") {
            if (x === "centre" || x === "center" || x.indexOf(' ') === -1) {
                x = this._w / 2;
                y = this._h / 2;
            } else {
                var cmd = x.split(' ');
                if (cmd[0] === "top") y = 0;
                else if (cmd[0] === "bottom") y = this._h;
                else if (cmd[0] === "middle" || cmd[1] === "center" || cmd[1] === "centre") y = this._h / 2;

                if (cmd[1] === "center" || cmd[1] === "centre" || cmd[1] === "middle") x = this._w / 2;
                else if (cmd[1] === "left") x = 0;
                else if (cmd[1] === "right") x = this._w;
            }
        }

        this._origin.x = x;
        this._origin.y = y;

        return this;
    },

    /**@
     * #.flip
     * @comp 2D
     * @trigger Invalidate - when the entity has flipped
     * @sign public this .flip(String dir)
     * @param dir - Flip direction
     *
     * Flip entity on passed direction
     *
     * @example
     * ~~~
     * this.flip("X")
     * ~~~
     */
    flip: function (dir) {
        dir = dir || "X";
        if (!this["_flip" + dir]) {
            this["_flip" + dir] = true;
            this.trigger("Invalidate");
        }
        return this;
    },

    /**@
     * #.unflip
     * @comp 2D
     * @trigger Invalidate - when the entity has unflipped
     * @sign public this .unflip(String dir)
     * @param dir - Unflip direction
     *
     * Unflip entity on passed direction (if it's flipped)
     *
     * @example
     * ~~~
     * this.unflip("X")
     * ~~~
     */
    unflip: function (dir) {
        dir = dir || "X";
        if (this["_flip" + dir]) {
            this["_flip" + dir] = false;
            this.trigger("Invalidate");
        }
        return this;
    },

    /**
     * Method for rotation rather than through a setter
     */
    rotate: function (e) {
        var x2, y2;
        x2 =  (this._x + this._origin.x - e.o.x) * e.cos + (this._y + this._origin.y - e.o.y) * e.sin + (e.o.x - this._origin.x);
        y2 =  (this._y + this._origin.y - e.o.y) * e.cos - (this._x + this._origin.x - e.o.x) * e.sin + (e.o.y - this._origin.y);
        this._attr('_rotation', this._rotation - e.deg);
        this._attr('_x', x2 );
        this._attr('_y', y2 );
    },

    /**@
     * #._attr
     * @comp 2D
     * Setter method for all 2D properties including
     * x, y, w, h, alpha, rotation and visible.
     */
    _attr: function (name, value) {
        // Return if there is no change
        if (this[name] === value) {
            return;
        }
        //keep a reference of the old positions
        var old = Crafty.rectManager._pool.copy(this);

        var mbr;
        //if rotation, use the rotate method
        if (name === '_rotation') {
            this._rotate(value); // _rotate triggers "Rotate"
            //set the global Z and trigger reorder just in case
        } else if (name === '_z') {
            var intValue = value <<0;
            value = value==intValue ? intValue : intValue+1;
            this._globalZ = value*100000+this[0]; //magic number 10^5 is the max num of entities
            this[name] = value;
            this.trigger("Reorder");
            //if the rect bounds change, update the MBR and trigger move
        } else if (name === '_x' || name === '_y') {
            // mbr is the minimal bounding rectangle of the entity
            mbr = this._mbr;
            if (mbr) {
                mbr[name] -= this[name] - value;
                // cbr is a non-minmal bounding rectangle that contains both hitbox and mbr
                // It will exist only when the collision hitbox sits outside the entity
                if (this._cbr){
                    this._cbr[name] -= this[name] - value;
                }
            }
            this[name] = value;

            this.trigger("Move", old);

        } else if (name === '_h' || name === '_w') {
            mbr = this._mbr;

            var oldValue = this[name];
            this[name] = value;
            if (mbr) {
                this._calculateMBR();
            }
            if (name === '_w') {
                this.trigger("Resize", {
                    axis: 'w',
                    amount: value - oldValue
                });
            } else if (name === '_h') {
                this.trigger("Resize", {
                    axis: 'h',
                    amount: value - oldValue
                });
            }
            this.trigger("Move", old);

        }

        //everything will assume the value
        this[name] = value;

        // flag for redraw
        this.trigger("Invalidate");

        Crafty.rectManager._pool.recycle(old);
    }
});

/**@
 * #Supportable
 * @category 2D
 * @trigger LandedOnGround - When entity has landed. This event is triggered with the object the entity landed on.
 * @trigger LiftedOffGround - When entity has lifted off. This event is triggered with the object the entity stood on before lift-off.
 * @trigger CheckLanding - When entity is about to land. This event is triggered with the object the entity is about to land on. Third parties can respond to this event and prevent the entity from being able to land.
 *
 * Component that detects if the entity collides with the ground. This component is automatically added and managed by the Gravity component.
 * The appropriate events are fired when the entity state changes (lands on ground / lifts off ground). The current ground entity can also be accessed with `.ground`.
 */
Crafty.c("Supportable", {
    /**@
     * #.ground
     * @comp Supportable
     *
     * Access the ground entity (which may be the actual ground entity if it exists, or `null` if it doesn't exist) and thus whether this entity is currently on the ground or not. 
     * The ground entity is also available through the events, when the ground entity changes.
     */
    _ground: null,
    _groundComp: null,

    /**@
     * #.canLand
     * @comp Supportable
     *
     * The canLand boolean determines if the entity is allowed to land or not (e.g. perhaps the entity should not land if it's not falling).
     * The Supportable component will trigger a "CheckLanding" event. 
     * Interested parties can listen to this event and prevent the entity from landing by setting `canLand` to false.
     *
     * @example
     * ~~~
     * var player = Crafty.e("2D, Gravity");
     * player.bind("CheckLanding", function(ground) {
     *     if (player.y + player.h > ground.y + player.dy) { // forbid landing, if player's feet are not above ground
     *         player.canLand = false;
     *     }
     * });
     * ~~~
     */
    canLand: true,

    init: function () {
        this.requires("2D");
        this.__area = {_x: 0, _y: 0, _w: 0, _h: 0};
        this.defineField("ground", function() { return this._ground; }, function(newValue) {});
    },
    remove: function(destroyed) {
        this.unbind("EnterFrame", this._detectGroundTick);
    },

    /*@
     * #.startGroundDetection
     * @comp Supportable
     * @sign private this .startGroundDetection([comp])
     * @param comp - The name of a component that will be treated as ground
     *
     * This method is automatically called by the Gravity component and should not be called by the user.
     *
     * Enable ground detection for this entity no matter whether comp parameter is specified or not.
     * If comp parameter is specified all entities with that component will stop this entity from falling.
     * For a player entity in a platform game this would be a component that is added to all entities
     * that the player should be able to walk on.
     * 
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Color, Gravity")
     *   .color("red")
     *   .attr({ w: 100, h: 100 })
     *   .gravity("platform");
     * ~~~
     *
     * @see Gravity
     */
    startGroundDetection: function(ground) {
        if (ground) this._groundComp = ground;
        this.uniqueBind("EnterFrame", this._detectGroundTick);

        return this;
    },
    /*@
     * #.stopGroundDetection
     * @comp Supportable
     * @sign private this .stopGroundDetection()
     *
     * This method is automatically called by the Gravity component and should not be called by the user.
     *
     * Disable ground detection for this component. It can be reenabled by calling .startGroundDetection()
     */
    stopGroundDetection: function() {
        this.unbind("EnterFrame", this._detectGroundTick);

        return this;
    },

    _detectGroundTick: function() {
        var groundComp = this._groundComp,
            ground = this._ground,
            overlap = Crafty.rectManager.overlap;

        var pos = this._cbr || this._mbr || this,
            area = this.__area;
        area._x = pos._x;
        area._y = pos._y + 1; // Increase by 1 to make sure map.search() finds the floor
        area._w = pos._w;
        area._h = pos._h;
        // Decrease width by 1px from left and 1px from right, to fall more gracefully
        // area._x++; area._w--;

        if (ground) {
            var garea = ground._cbr || ground._mbr || ground;
            if (!(ground.__c[groundComp] && overlap(garea, area))) {
                this._ground = null;
                this.trigger("LiftedOffGround", ground); // no collision with ground was detected for first time
                ground = null;
            }
        }

        if (!ground) {
            var obj, oarea,
                results = Crafty.map.search(area, false),
                i = 0,
                l = results.length;

            for (; i < l; ++i) {
                obj = results[i];
                oarea = obj._cbr || obj._mbr || obj;
                // check for an intersection with the player
                if (obj !== this && obj.__c[groundComp] && overlap(oarea, area)) {
                    this.canLand = true;
                    this.trigger("CheckLanding", obj); // is entity allowed to land?
                    if (this.canLand) {
                        this._ground = ground = obj;
                        this.y = obj._y - this._h; // snap entity to ground object
                        this.trigger("LandedOnGround", ground); // collision with ground was detected for first time

                        break;
                    }
                }
            }
        }
    }
});

/**@
 * #GroundAttacher
 * @category 2D
 *
 * Component that attaches the entity to the ground when it lands. Useful for platformers with moving platforms.
 * Remove the component to disable the functionality.
 *
 * @see Supportable, Gravity
 *
 * @example
 * ~~~
 * Crafty.e("2D, Gravity, GroundAttacher")
 *     .gravity("Platform"); // entity will land on and move with entites that have the "Platform" component
 * ~~~
 */
Crafty.c("GroundAttacher", {
    _groundAttach: function(ground) {
        ground.attach(this);
    },
    _groundDetach: function(ground) {
        ground.detach(this);
    },

    init: function () {
        this.requires("Supportable");

        this.bind("LandedOnGround", this._groundAttach);
        this.bind("LiftedOffGround", this._groundDetach);
    },
    remove: function(destroyed) {
        this.unbind("LandedOnGround", this._groundAttach);
        this.unbind("LiftedOffGround", this._groundDetach);
    }
});


/**@
 * #Gravity
 * @category 2D
 * @trigger Moved - When entity has moved due to velocity/acceleration on either x or y axis a Moved event is triggered. If the entity has moved on both axes for diagonal movement the event is triggered twice. - { axis: 'x' | 'y', oldValue: Number } - Old position
 * @trigger NewDirection - When entity has changed direction due to velocity on either x or y axis a NewDirection event is triggered. The event is triggered once, if direction is different from last frame. - { x: -1 | 0 | 1, y: -1 | 0 | 1 } - New direction
 * 
 * Adds gravitational pull to the entity.
 *
 * @see Supportable, Motion
 */
Crafty.c("Gravity", {
    _gravityConst: 500,

    init: function () {
        this.requires("2D, Supportable, Motion");

        this.bind("LiftedOffGround", this._startGravity); // start gravity if we are off ground
        this.bind("LandedOnGround", this._stopGravity); // stop gravity once landed
    },
    remove: function(removed) {
        this.unbind("LiftedOffGround", this._startGravity);
        this.unbind("LandedOnGround", this._stopGravity);
    },

    _gravityCheckLanding: function(ground) {
        if (this._dy < 0) 
            this.canLand = false;
    },

    /**@
     * #.gravity
     * @comp Gravity
     * @sign public this .gravity([comp])
     * @param comp - The name of a component that will stop this entity from falling
     *
     * Enable gravity for this entity no matter whether comp parameter is specified or not.
     * If comp parameter is specified all entities with that component will stop this entity from falling.
     * For a player entity in a platform game this would be a component that is added to all entities
     * that the player should be able to walk on.
     * See the Supportable component documentation for additional methods & events that are available.
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Color, Gravity")
     *   .color("red")
     *   .attr({ w: 100, h: 100 })
     *   .gravity("platform");
     * ~~~
     *
     * @see Supportable, Motion
     */
    gravity: function (comp) {
        this.bind("CheckLanding", this._gravityCheckLanding);
        this.startGroundDetection(comp);
        this._startGravity();

        return this;
    },
    /**@
     * #.antigravity
     * @comp Gravity
     * @sign public this .antigravity()
     * Disable gravity for this component. It can be reenabled by calling .gravity()
     */
    antigravity: function () {
        this._stopGravity();
        this.stopGroundDetection();
        this.unbind("CheckLanding", this._gravityCheckLanding);

        return this;
    },

    /**@
     * #.gravityConst
     * @comp Gravity
     * @sign public this .gravityConst(g)
     * @param g - gravitational constant in pixels per second squared
     *
     * Set the gravitational constant to g for this entity. The default is 500. The greater g, the stronger the downwards acceleration.
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Color, Gravity")
     *   .color("red")
     *   .attr({ w: 100, h: 100 })
     *   .gravityConst(5)
     *   .gravity("platform");
     * ~~~
     */
    gravityConst: function (g) {
        if (this._gravityActive) { // gravity active, change acceleration
            this.ay -= this._gravityConst;
            this.ay += g;
        }
        this._gravityConst = g;

        return this;
    },
    _startGravity: function() {
        this._gravityActive = true;
        this.ay += this._gravityConst;
    },
    _stopGravity: function() {
        this.ay = 0;
        this.vy = 0;
        this._gravityActive = false;
    }
});

// This is used to define getters and setters for Motion properties
// For instance
//      __motionProp(entity, "a", "x", true) 
// will define a getter for `ax` which accesses an underlying private property `_ax`
// If the `setter` property is false, setting a value will be a null-op
var __motionProp = function(self, prefix, prop, setter) {
    var publicProp = prefix + prop;
    var privateProp = "_" + publicProp;

    var motionEvent = { key: "", oldValue: 0};
    // getters & setters for public property
    if (setter) {
        Crafty.defineField(self, publicProp, function() { return this[privateProp]; }, function(newValue) {
            var oldValue = this[privateProp];
            if (newValue !== oldValue) {
                this[privateProp] = newValue;

                motionEvent.key = publicProp;
                motionEvent.oldValue = oldValue;
                this.trigger("MotionChange", motionEvent);
            }
        });
    } else {
        Crafty.defineField(self, publicProp, function() { return this[privateProp]; }, function(newValue) {});
    }

    // hide private property
    Object.defineProperty(self, privateProp, {
        value : 0,
        writable : true,
        enumerable : false,
        configurable : false
    });
};

// This defines an alias for a pair of underlying properties which represent the components of a vector
// It takes an object with vector methods, and redefines its x/y properties as getters and setters to properties of self
// This allows you to use the vector's special methods to manipulate the entity's properties, 
// while still allowing you to manipulate those properties directly if performance matters
var __motionVector = function(self, prefix, setter, vector) {
    var publicX = prefix + "x",
        publicY = prefix + "y",
        privateX = "_" + publicX,
        privateY = "_" + publicY;

    if (setter) {
        Crafty.defineField(vector, "x", function() { return self[privateX]; }, function(v) { self[publicX] = v; });
        Crafty.defineField(vector, "y", function() { return self[privateY]; }, function(v) { self[publicY] = v; });
    } else {
        Crafty.defineField(vector, "x", function() { return self[privateX]; }, function(v) {});
        Crafty.defineField(vector, "y", function() { return self[privateY]; }, function(v) {});
    }
    if (Object.seal) { Object.seal(vector); }

    return vector;
};

/**@
 * #AngularMotion
 * @category 2D
 * @trigger Rotated - When entity has rotated due to angular velocity/acceleration a Rotated event is triggered. - Number - Old rotation
 * @trigger NewRotationDirection - When entity has changed rotational direction due to rotational velocity a NewRotationDirection event is triggered. The event is triggered once, if direction is different from last frame. - -1 | 0 | 1 - New direction
 * @trigger MotionChange - When a motion property has changed a MotionChange event is triggered. - { key: String, oldValue: Number } - Motion property name and old value
 *
 * Component that allows rotating an entity by applying angular velocity and acceleration.
 * All angular motion values are expressed in degrees per second (e.g. an entity with `vrotation` of 10 will rotate 10 degrees each second).
 */
Crafty.c("AngularMotion", {
    /**@
     * #.vrotation
     * @comp AngularMotion
     * 
     * A property for accessing/modifying the angular(rotational) velocity. 
     * The velocity remains constant over time, unless the acceleration increases the velocity.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, AngularMotion");
     *
     * var vrotation = ent.vrotation; // retrieve the angular velocity
     * ent.vrotation += 1; // increase the angular velocity
     * ent.vrotation = 0; // reset the angular velocity
     * ~~~
     */
    _vrotation: 0,

    /**@
     * #.arotation
     * @comp AngularMotion
     * 
     * A property for accessing/modifying the angular(rotational) acceleration. 
     * The acceleration increases the velocity over time, resulting in ever increasing speed.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, AngularMotion");
     *
     * var arotation = ent.arotation; // retrieve the angular acceleration
     * ent.arotation += 1; // increase the angular acceleration
     * ent.arotation = 0; // reset the angular acceleration
     * ~~~
     */
    _arotation: 0,

    /**@
     * #.drotation
     * @comp AngularMotion
     * 
     * A number that reflects the change in rotation (difference between the old & new rotation) that was applied in the last frame.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, AngularMotion");
     *
     * var drotation = ent.drotation; // the change of rotation in the last frame
     * ~~~
     */
    _drotation: 0,

    init: function () {
        this.requires("2D");

        __motionProp(this, "v", "rotation", true);
        __motionProp(this, "a", "rotation", true);
        __motionProp(this, "d", "rotation", false);

        this.__oldRotationDirection = 0;

        this.bind("EnterFrame", this._angularMotionTick);
    },
    remove: function(destroyed) {
        this.unbind("EnterFrame", this._angularMotionTick);
    },

    /**@
     * #.resetAngularMotion
     * @comp AngularMotion
     * @sign public this .resetAngularMotion()
     * 
     * Reset all motion (resets velocity, acceleration, motionDelta).
     */
    resetAngularMotion: function() {
        this._drotation = 0;
        this.vrotation = 0;
        this.arotation = 0;

        return this;
    },

    /*
     * s += v * Δt + (0.5 * a) * Δt * Δt
     * v += a * Δt
     */
    _angularMotionTick: function(frameData) {
        var dt = frameData.dt / 1000; // Time in s
        var oldR = this._rotation,
            vr = this._vrotation,
            ar = this._arotation;

        // s += v * Δt + (0.5 * a) * Δt * Δt
        var newR = oldR + vr * dt + 0.5 * ar * dt * dt;
        // v += a * Δt
        this.vrotation = vr + ar * dt;

        // Check if direction of velocity has changed
        var _vr = this._vrotation, dvr = _vr ? (_vr<0 ? -1:1):0; // Quick implementation of Math.sign
        if (this.__oldRotationDirection !== dvr) {
            this.__oldRotationDirection = dvr;
            this.trigger('NewRotationDirection', dvr);
        }

        // Check if velocity has changed
        // Δs = s[t] - s[t-1]
        this._drotation = newR - oldR;
        if (this._drotation !== 0) {
            this.rotation = newR;
            this.trigger('Rotated', oldR);
        }
    }
});

/**@
 * #Motion
 * @category 2D
 * @trigger Moved - When entity has moved due to velocity/acceleration on either x or y axis a Moved event is triggered. If the entity has moved on both axes for diagonal movement the event is triggered twice. - { axis: 'x' | 'y', oldValue: Number } - Old position
 * @trigger NewDirection - When entity has changed direction due to velocity on either x or y axis a NewDirection event is triggered. The event is triggered once, if direction is different from last frame. - { x: -1 | 0 | 1, y: -1 | 0 | 1 } - New direction
 * @trigger MotionChange - When a motion property has changed a MotionChange event is triggered. - { key: String, oldValue: Number } - Motion property name and old value
 *
 * Component that allows moving an entity by applying linear velocity and acceleration.
 * All linear motion values are expressed in pixels per second (e.g. an entity with `vx` of 1 will move 1px on the x axis each second).
 *
 * @note Several methods return Vector2D objects that dynamically reflect the entity's underlying properties.  If you want a static copy instead, use the vector's `clone()` method.
 */
Crafty.c("Motion", {
    /**@
     * #.vx
     * @comp Motion
     * 
     * A property for accessing/modifying the linear velocity in the x axis.
     * The velocity remains constant over time, unless the acceleration changes the velocity.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, Motion");
     *
     * var vx = ent.vx; // retrieve the linear velocity in the x axis
     * ent.vx += 1; // increase the linear velocity in the x axis
     * ent.vx = 0; // reset the linear velocity in the x axis
     * ~~~
     */
    _vx: 0,

    /**@
     * #.vy
     * @comp Motion
     * 
     * A property for accessing/modifying the linear velocity in the y axis.
     * The velocity remains constant over time, unless the acceleration changes the velocity.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, Motion");
     *
     * var vy = ent.vy; // retrieve the linear velocity in the y axis
     * ent.vy += 1; // increase the linear velocity in the y axis
     * ent.vy = 0; // reset the linear velocity in the y axis
     * ~~~
     */
    _vy: 0,

    /**@
     * #.ax
     * @comp Motion
     * 
     * A property for accessing/modifying the linear acceleration in the x axis.
     * The acceleration changes the velocity over time.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, Motion");
     *
     * var ax = ent.ax; // retrieve the linear acceleration in the x axis
     * ent.ax += 1; // increase the linear acceleration in the x axis
     * ent.ax = 0; // reset the linear acceleration in the x axis
     * ~~~
     */
    _ax: 0,

    /**@
     * #.ay
     * @comp Motion
     * 
     * A property for accessing/modifying the linear acceleration in the y axis.
     * The acceleration changes the velocity over time.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, Motion");
     *
     * var ay = ent.ay; // retrieve the linear acceleration in the y axis
     * ent.ay += 1; // increase the linear acceleration in the y axis
     * ent.ay = 0; // reset the linear acceleration in the y axis
     * ~~~
     */
    _ay: 0,

    /**@
     * #.dx
     * @comp Motion
     * 
     * A number that reflects the change in x (difference between the old & new x) that was applied in the last frame.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, Motion");
     *
     * var dx = ent.dx; // the change of x in the last frame
     * ~~~
     */
    _dx: 0,

    /**@
     * #.dy
     * @comp Motion
     * 
     * A number that reflects the change in y (difference between the old & new y) that was applied in the last frame.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, Motion");
     *
     * var dy = ent.dy; // the change of y in the last frame
     * ~~~
     */
    _dy: 0,

    init: function () {
        this.requires("2D");

        __motionProp(this, "v", "x", true);
        __motionProp(this, "v", "y", true);
        this._velocity = __motionVector(this, "v", true, new Crafty.math.Vector2D());
        __motionProp(this, "a", "x", true);
        __motionProp(this, "a", "y", true);
        this._acceleration = __motionVector(this, "a", true, new Crafty.math.Vector2D());
        __motionProp(this, "d", "x", false);
        __motionProp(this, "d", "y", false);
        this._motionDelta = __motionVector(this, "d", false, new Crafty.math.Vector2D());

        this.__movedEvent = {axis: '', oldValue: 0};
        this.__oldDirection = {x: 0, y: 0};

        this.bind("EnterFrame", this._linearMotionTick);
    },
    remove: function(destroyed) {
        this.unbind("EnterFrame", this._linearMotionTick);
    },

    /**@
     * #.resetMotion
     * @comp Motion
     * @sign public this .resetMotion()
     * @return this
     * 
     * Reset all linear motion (resets velocity, acceleration, motionDelta).
     */
    resetMotion: function() {
        this.vx = 0; this.vy = 0;
        this.ax = 0; this.ay = 0;
        this._dx = 0; this._dy = 0;

        return this;
    },

    /**@
     * #.motionDelta
     * @comp Motion
     * @sign public Vector2D .motionDelta()
     * @return A Vector2D with the properties {x, y} that reflect the change in x & y.
     * 
     * Returns the difference between the old & new position that was applied in the last frame.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, Motion");
     *
     * var deltaY = ent.motionDelta().y; // the change of y in the last frame
     * ~~~
     * @see Crafty.math.Vector2D
     */
    motionDelta: function() {
        return this._motionDelta;
    },

    /**@
     * #.velocity
     * @comp Motion
     * Method for accessing/modifying the linear(x,y) velocity. 
     * The velocity remains constant over time, unless the acceleration increases the velocity.
     *
     * @sign public Vector2D .velocity()
     * @return The velocity Vector2D with the properties {x, y} that reflect the velocities in the <x, y> direction of the entity.
     *
     * Returns the current velocity. You can access/modify the properties in order to retrieve/change the velocity.

     * @example
     * ~~~
     * var ent = Crafty.e("2D, Motion");
     *
     * var vel = ent.velocity(); //returns the velocity vector
     * vel.x;       // retrieve the velocity in the x direction
     * vel.x = 0;   // set the velocity in the x direction
     * vel.x += 4   // add to the velocity in the x direction
     * ~~~
     * @see Crafty.math.Vector2D
     */
    velocity: function() {
        return this._velocity;
    },


    /**@
     * #.acceleration
     * @comp Motion
     * Method for accessing/modifying the linear(x,y) acceleration. 
     * The acceleration increases the velocity over time, resulting in ever increasing speed.
     * 
     * @sign public Vector2D .acceleration()
     * @return The acceleration Vector2D with the properties {x, y} that reflects the acceleration in the <x, y> direction of the entity.
     *
     * Returns the current acceleration. You can access/modify the properties in order to retrieve/change the acceleration.
     *
     * @example
     * ~~~
     * var ent = Crafty.e("2D, Motion");
     *
     * var acc = ent.acceleration(); //returns the acceleration object
     * acc.x;       // retrieve the acceleration in the x direction
     * acc.x = 0;   // set the acceleration in the x direction
     * acc.x += 4   // add to the acceleration in the x direction
     * ~~~
     * @see Crafty.math.Vector2D
     */
    acceleration: function() {
        return this._acceleration;
    },

    /*
     * s += v * Δt + (0.5 * a) * Δt * Δt
     * v += a * Δt
     */
    _linearMotionTick: function(frameData) {
        var dt = frameData.dt / 1000; // time in s
        var oldX = this._x, vx = this._vx, ax = this._ax,
            oldY = this._y, vy = this._vy, ay = this._ay;

        // s += v * Δt + (0.5 * a) * Δt * Δt
        var newX = oldX + vx * dt + 0.5 * ax * dt * dt;
        var newY = oldY + vy * dt + 0.5 * ay * dt * dt;
        // v += a * Δt
        this.vx = vx + ax * dt;
        this.vy = vy + ay * dt;

        // Check if direction of velocity has changed
        var oldDirection = this.__oldDirection,
            _vx = this._vx, dvx = _vx ? (_vx<0 ? -1:1):0, // A quick implementation of Math.sign
            _vy = this._vy, dvy = _vy ? (_vy<0 ? -1:1):0;
        if (oldDirection.x !== dvx || oldDirection.y !== dvy) {
            oldDirection.x = dvx;
            oldDirection.y = dvy;
            this.trigger('NewDirection', oldDirection);
        }

        // Check if velocity has changed
        var movedEvent = this.__movedEvent;
        // Δs = s[t] - s[t-1]
        this._dx = newX - oldX;
        this._dy = newY - oldY;
        if (this._dx !== 0) {
            this.x = newX;
            movedEvent.axis = 'x';
            movedEvent.oldValue = oldX;
            this.trigger('Moved', movedEvent);
        }
        if (this._dy !== 0) {
            this.y = newY;
            movedEvent.axis = 'y';
            movedEvent.oldValue = oldY;
            this.trigger('Moved', movedEvent);
        }
    }
});

/**@
 * #Crafty.polygon
 * @category 2D
 *
 * The constructor for a polygon object used for hitboxes and click maps. Takes a set of points as an
 * argument, giving alternately the x and y coordinates of the polygon's vertices in order.
 *
 * The constructor accepts the coordinates as either a single array or as a set of individual arguments.
 * If passed an array, the current implementation will use that array internally -- do not attempt to reuse it.
 *
 * When creating a polygon for an entity, each point should be offset or relative from the entities `x` and `y`
 * (don't include the absolute values as it will automatically calculate this).
 *
 *
 * @example
 * Two ways to create a triangle with vertices at `(50, 0)`, `(100, 100)` and `(0, 100)`.
 * ~~~
 * new Crafty.polygon([50, 0, 100, 100, 0, 100]);
 * new Crafty.polygon(50, 0, 100, 100, 0, 100);
 * ~~~
 */
Crafty.polygon = function (poly) {
    if (arguments.length > 1) {
        poly = Array.prototype.slice.call(arguments, 0);
    }
    this.points = poly;
};

Crafty.polygon.prototype = {
    /**@
     * #.containsPoint
     * @comp Crafty.polygon
     * @sign public Boolean .containsPoint(Number x, Number y)
     * @param x - X position of the point
     * @param y - Y position of the point
     *
     * Method is used to determine if a given point is contained by the polygon.
     *
     * @example
     * ~~~
     * var poly = new Crafty.polygon([50, 0, 100, 100, 0, 100]);
     * poly.containsPoint(50, 50); //TRUE
     * poly.containsPoint(0, 0); //FALSE
     * ~~~
     */
    containsPoint: function (x, y) {
        var p = this.points, l = p.length/2,
            i, j, c = false;

        for (i = 0, j = l - 1; i < l; j = i++) {
            if (((p[2*i+1] > y) != (p[2*j+1] > y)) && (x < (p[2*j] - p[2*i]) * (y - p[2*i+1]) / (p[2*j+1] - p[2*i+1]) + p[2*i])) {
                c = !c;
            }
        }

        return c;
    },

    /**@
     * #.shift
     * @comp Crafty.polygon
     * @sign public void .shift(Number x, Number y)
     * @param x - Amount to shift the `x` axis
     * @param y - Amount to shift the `y` axis
     *
     * Shifts every single point in the polygon by the specified amount.
     *
     * @example
     * ~~~
     * var poly = new Crafty.polygon([50, 0, 100, 100, 0, 100]);
     * poly.shift(5,5);
     * //[[55, 5, 105, 5, 5, 105];
     * ~~~
     */
    shift: function (x, y) {
        var i = 0, p =this.points,
            l = p.length;
        for (; i < l; i+=2) {
            p[i] += x;
            p[i+1] += y;
        }
    },

    /**@
     * #.clone
     * @comp Crafty.polygon
     * @sign public void .clone()
     * 
     * Returns a clone of the polygon.
     *
     * @example
     * ~~~
     * var poly = new Crafty.polygon([50, 0, 100, 100, 0, 100]);
     * var shiftedpoly = poly.clone().shift(5,5);
     * //[55, 5, 105, 5, 5, 105], but the original polygon is unchanged
     * ~~~
     */
    clone: function() {
        //Shallow clone, but points should be full of Number primitives that are copied
        return new Crafty.polygon(this.points.slice(0));
    },

    rotate: function (e) {
        var i = 0, p = this.points,
            l = p.length,
            x, y;

        for (; i < l; i+=2) {

            x = e.o.x + (p[i] - e.o.x) * e.cos + (p[i+1] - e.o.y) * e.sin;
            y = e.o.y - (p[i] - e.o.x) * e.sin + (p[i+1] - e.o.y) * e.cos;

            p[i] = x;
            p[i+1] = y;
        }
    }
};

/**@
 * #Crafty.circle
 * @category 2D
 * Circle object used for hitboxes and click maps. Must pass a `x`, a `y` and a `radius` value.
 *
 *@example
 * ~~~
 * var centerX = 5,
 *     centerY = 10,
 *     radius = 25;
 *
 * new Crafty.circle(centerX, centerY, radius);
 * ~~~
 *
 * When creating a circle for an entity, each point should be offset or relative from the entities `x` and `y`
 * (don't include the absolute values as it will automatically calculate this).
 */
Crafty.circle = function (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    // Creates an octagon that approximate the circle for backward compatibility.
    this.points = [];
    var theta;

    for (var i = 0; i < 16; i+=2) {
        theta = i * Math.PI / 8;
        this.points[i] = this.x + (Math.sin(theta) * radius);
        this.points[i+1] = this.y + (Math.cos(theta) * radius);
    }
};

Crafty.circle.prototype = {
    /**@
     * #.containsPoint
     * @comp Crafty.circle
     * @sign public Boolean .containsPoint(Number x, Number y)
     * @param x - X position of the point
     * @param y - Y position of the point
     *
     * Method is used to determine if a given point is contained by the circle.
     *
     * @example
     * ~~~
     * var circle = new Crafty.circle(0, 0, 10);
     * circle.containsPoint(0, 0); //TRUE
     * circle.containsPoint(50, 50); //FALSE
     * ~~~
     */
    containsPoint: function (x, y) {
        var radius = this.radius,
            sqrt = Math.sqrt,
            deltaX = this.x - x,
            deltaY = this.y - y;

        return (deltaX * deltaX + deltaY * deltaY) < (radius * radius);
    },

    /**@
     * #.shift
     * @comp Crafty.circle
     * @sign public void .shift(Number x, Number y)
     * @param x - Amount to shift the `x` axis
     * @param y - Amount to shift the `y` axis
     *
     * Shifts the circle by the specified amount.
     *
     * @example
     * ~~~
     * var circle = new Crafty.circle(0, 0, 10);
     * circle.shift(5,5);
     * //{x: 5, y: 5, radius: 10};
     * ~~~
     */
    shift: function (x, y) {
        this.x += x;
        this.y += y;

        var i = 0, p = this.points,
            l = p.length,
            current;
        for (; i < l; i+=2) {
            p[i] += x;
            p[i+1] += y;
        }
    },

    rotate: function () {
        // We are a circle, we don't have to rotate :)
    }
};


Crafty.matrix = function (m) {
    this.mtx = m;
    this.width = m[0].length;
    this.height = m.length;
};

Crafty.matrix.prototype = {
    x: function (other) {
        if (this.width != other.height) {
            return;
        }

        var result = [];
        for (var i = 0; i < this.height; i++) {
            result[i] = [];
            for (var j = 0; j < other.width; j++) {
                var sum = 0;
                for (var k = 0; k < this.width; k++) {
                    sum += this.mtx[i][k] * other.mtx[k][j];
                }
                result[i][j] = sum;
            }
        }
        return new Crafty.matrix(result);
    },


    e: function (row, col) {
        //test if out of bounds
        if (row < 1 || row > this.mtx.length || col < 1 || col > this.mtx[0].length) return null;
        return this.mtx[row - 1][col - 1];
    }
};

},{"../core/core.js":7,"./spatial-grid.js":43}],40:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    DEG_TO_RAD = Math.PI / 180;

/**@
 * #Collision
 * @category 2D
 * @trigger HitOn - Triggered when collisions occur. Will not trigger again until collisions of this type cease, or an event is requested once more (using `resetHitChecks(component)`). - { hitData }
 * @trigger HitOff - Triggered when collision with a specific component type ceases - String - componentName
 *
 * Component to detect collision between any two convex polygons.
 *
 * If collision checks are registered for multiple component and collisions with
 * multiple types occur simultaniously, each collision will cause an individual
 * event to fire.
 *
 * @note All data received from events is only valid for the duration of the event's callback.
 * If you wish to preserve the data, make a copy of it.
 *
 * For a description of collision event data (hitData above), see the documentation for
 * `.hit()`.
 *
 */
Crafty.c("Collision", {
    init: function () {
        this.requires("2D");
        this._collisionData = {};

        this.collision();
    },

    // Run by Crafty when the component is removed
    remove: function() {
        this._cbr = null;
        this.unbind("Resize", this._resizeMap);
        this.unbind("Resize", this._checkBounds);
    },

    /**@
     * #.collision
     * @comp Collision
     *
     * @trigger NewHitbox - when a new hitbox is assigned - Crafty.polygon
     *
     * @sign public this .collision([Crafty.polygon polygon])
     * @param polygon - Optional Crafty.polygon object that will act as the hit area.
     *
     * @sign public this .collision([Array coordinatePairs])
     * @param coordinatePairs - Optional array of x, y coordinate pairs to generate a hit area polygon.
     *
     * @sign public this .collision([x1, y1,.., xN, yN])
     * @param point# - Optional list of x, y coordinate pairs to generate a hit area polygon.
     *
     * Constructor that takes a polygon, an array of points or a list of points to use as the hit area,
     * with points being relative to the object's position in its unrotated state.
     *
     * The hit area must be a convex shape and not concave for collision detection to work properly.
     *
     * If no parameter is passed, the x, y, w, h properties of the entity will be used, and the hitbox will be resized when the entity is.
     *
     * If a hitbox is set that is outside of the bounds of the entity itself, there will be a small performance penalty as it is tracked separately.
     *
     * In order for your custom hitbox to have any effect, you have to add the `Collision` component to all other entities this entity needs to collide with using this custom hitbox.
     * On the contrary the collisions will be resolved using the default hitbox. See `.hit()` - `MBR` represents default hitbox collision, `SAT` represents custom hitbox collision.
     *
     * @example
     * ~~~
     * Crafty.e("2D, Collision").collision(
     *     new Crafty.polygon([50, 0,  100, 100,  0, 100])
     * );
     *
     * Crafty.e("2D, Collision").collision([50, 0,  100, 100,  0, 100]);
     *
     * Crafty.e("2D, Collision").collision(50, 0,  100, 100,  0, 100);
     * ~~~
     *
     * @see Crafty.polygon
     */
    collision: function (polygon) {
        // Unbind anything bound to "Resize"
        this.unbind("Resize", this._resizeMap);
        this.unbind("Resize", this._checkBounds);

        if (!polygon) {
            // If no polygon is specified, then a polygon is created that matches the bounds of the entity
            // It will be adjusted on a "Resize" event
            polygon = new Crafty.polygon([0, 0, this._w, 0, this._w, this._h, 0, this._h]);
            this.bind("Resize", this._resizeMap);
            this._cbr = null;
        } else {
            // Otherwise, we set the specified hitbox, converting from a list of arguments to a polygon if necessary
            if (arguments.length > 1) {
                //convert args to array to create polygon
                var args = Array.prototype.slice.call(arguments, 0);
                polygon = new Crafty.polygon(args);
            // Otherwise, we set the specified hitbox, converting from an array of points to a polygon if necessary
            } else if (polygon.constructor === Array) {
                //Clone the array so we don't modify it for anything else that might be using it
                polygon = new Crafty.polygon(polygon.slice());
            // Otherwise, we set the specified hitbox
            } else {
                //Clone the polygon so we don't modify it for anything else that might be using it
                polygon = polygon.clone();
            }
            // Check to see if the polygon sits outside the entity, and set _cbr appropriately
            // On resize, the new bounds will be checked if necessary
            this._findBounds(polygon.points);
        }

        // If the entity is currently rotated, the points in the hitbox must also be rotated
        if (this.rotation) {
            polygon.rotate({
                cos: Math.cos(-this.rotation * DEG_TO_RAD),
                sin: Math.sin(-this.rotation * DEG_TO_RAD),
                o: {
                    x: this._origin.x,
                    y: this._origin.y
                }
            });
        }

        // Finally, assign the hitbox, and attach it to the "Collision" entity
        this.map = polygon;
        this.attach(this.map);
        this.map.shift(this._x, this._y);
        this.trigger("NewHitbox", polygon);
        return this;
    },

    // If the hitbox is set by hand, it might extend beyond the entity.
    // In such a case, we need to track this separately.
    // This function finds a (non-minimal) bounding circle around the hitbox.
    //
    // It uses a pretty naive algorithm to do so, for more complicated options see [wikipedia](http://en.wikipedia.org/wiki/Bounding_sphere).
    _findBounds: function(points) {
        var minX = Infinity, maxX = -Infinity, minY=Infinity, maxY=-Infinity;
        var l = points.length;

        // Calculate the MBR of the points by finding the min/max x and y
        for (var i=0; i<l; i+=2) {
            if (points[i] < minX)
                minX = points[i];
            if (points[i] > maxX)
                maxX = points[i];
            if (points[i+1] < minY)
                minY = points[i+1];
            if (points[i+1] > maxY)
                maxY = points[i+1];
        }

        // This describes a circle centered on the MBR of the points, with a diameter equal to its diagonal
        // It will be used to find a rough bounding box round the points, even if they've been rotated
        var cbr = {
            cx: (minX + maxX) / 2,
            cy: (minY + maxY) / 2,
            r: Math.sqrt((maxX - minX)*(maxX - minX) + (maxY - minY)*(maxY - minY)) / 2
        };

        // We need to worry about resizing, but only if resizing could possibly change whether the hitbox is in or out of bounds
        // Thus if the upper-left corner is out of bounds, then there's no need to recheck on resize
        if (minX >= 0 && minY >= 0) {
            this._checkBounds = function() {
                if (this._cbr === null && this._w < maxX || this._h < maxY) {
                   this._cbr = cbr;
                   this._calculateMBR();
                } else if (this._cbr) {
                    this._cbr = null;
                    this._calculateMBR();
                }
            };
            this.bind("Resize", this._checkBounds);
        }

        // If the hitbox is within the entity, _cbr is null
        // Otherwise, set it, and immediately calculate the bounding box.
        if (minX >= 0 && minY >= 0 && maxX <= this._w && maxY <= this._h) {
            this._cbr = null;
            return false;
        } else {
            this._cbr = cbr;
            this._calculateMBR();
            return true;
        }
    },

    // The default behavior is to match the hitbox to the entity.
    // This function will change the hitbox when a "Resize" event triggers.
    _resizeMap: function (e) {
        var dx, dy, rot = this.rotation * DEG_TO_RAD,
            points = this.map.points;

        // Depending on the change of axis, move the corners of the rectangle appropriately
        if (e.axis === 'w') {
            if (rot) {
                dx = e.amount * Math.cos(rot);
                dy = e.amount * Math.sin(rot);
            } else {
                dx = e.amount;
                dy = 0;
            }

            // "top right" point shifts on change of w
            points[2] += dx;
            points[3] += dy;
        } else {
            if (rot) {
                dy = e.amount * Math.cos(rot);
                dx = -e.amount * Math.sin(rot);
            } else {
                dx = 0;
                dy = e.amount;
            }

            // "bottom left" point shifts on change of h
            points[6] += dx;
            points[7] += dy;
        }

        // "bottom right" point shifts on either change
        points[4] += dx;
        points[5] += dy;
    },

    /**@
     * #.hit
     * @comp Collision
     * @sign public Boolean/Array hit(String component)
     * @param component - Check collision with entities that have this component
     * applied to them.
     * @return `false` if there is no collision. If a collision is detected,
     * returns an Array of collision data objects (see below).
     *
     * Tests for collisions with entities that have the specified component
     * applied to them.
     * If a collision is detected, data regarding the collision will be present in
     * the array returned by this method.
     * If no collisions occur, this method returns false.
     *
     * Following is a description of a collision data object that this method may
     * return: The returned collision data will be an Array of Objects with the
     * type of collision used, the object collided and if the type used was SAT (a polygon was used as the hitbox) then an amount of overlap.
     * ~~~
     * [{
     *    obj: [entity],
     *    type: ["MBR" or "SAT"],
     *    overlap: [number]
     * }]
     * ~~~
     *
     * - **obj:** The entity with which the collision occured.
     * - **type:** Collision detection method used. One of:
     *   - *MBR:* Standard axis aligned rectangle intersection (`.intersect` in the 2D component).
     *   - *SAT:* Collision between any two convex polygons. Used when both colliding entities have the `Collision` component applied to them.
     * - **overlap:** If SAT collision was used, this will signify the overlap percentage between the colliding entities.
     *
     * Keep in mind that both entities need to have the `Collision` component, if you want to check for `SAT` (custom hitbox) collisions between them.
     *
     * If you want more fine-grained control consider using `Crafty.map.search()`.
     *
     * @see 2D
     */
    hit: function (component) {
        var area = this._cbr || this._mbr || this,
            results = Crafty.map.search(area, false),
            i = 0,
            l = results.length,
            dupes = {},
            id, obj, oarea, key,
            overlap = Crafty.rectManager.overlap,
            hasMap = ('map' in this && 'containsPoint' in this.map),
            finalresult = [];

        if (!l) {
            return false;
        }

        for (; i < l; ++i) {
            obj = results[i];
            oarea = obj._cbr || obj._mbr || obj; //use the mbr

            if (!obj) continue;
            id = obj[0];

            //check if not added to hash and that actually intersects
            if (!dupes[id] && this[0] !== id && obj.__c[component] && overlap(oarea, area))
                dupes[id] = obj;
        }

        for (key in dupes) {
            obj = dupes[key];

            if (hasMap && 'map' in obj) {
                var SAT = this._SAT(this.map, obj.map);
                SAT.obj = obj;
                SAT.type = "SAT";
                if (SAT) finalresult.push(SAT);
            } else {
                finalresult.push({
                    obj: obj,
                    type: "MBR"
                });
            }
        }

        if (!finalresult.length) {
            return false;
        }

        return finalresult;
    },

    /**@
     * #.onHit
     * @comp Collision
     * @sign public this .onHit(String component, Function callbackOn[, Function callbackOff])
     * @param component - Component to check collisions for.
     * @param callbackOn - Callback method to execute upon collision with component. Will be passed the results of the collision check in the same format documented for hit().
     * @param callbackOff - Callback method executed once as soon as collision stops.
     *
     * Creates an EnterFrame event calling `.hit()` each frame.  When a collision is detected the `callbackOn` will be invoked.
     * Note that the `callbackOn` will be invoked every frame the collision is active, not just the first time the collision occurs.
     *
     * If you want more fine-grained control consider using `.checkHits()`, `.hit()` or even `Crafty.map.search()`.
     *
     * @see .checkHits
     * @see .hit
     */
    onHit: function (component, callbackOn, callbackOff) {
        var justHit = false;
        this.bind("EnterFrame", function () {
            var hitData = this.hit(component);
            if (hitData) {
                justHit = true;
                callbackOn.call(this, hitData);
            } else if (justHit) {
                if (typeof callbackOff == 'function') {
                    callbackOff.call(this);
                }
                justHit = false;
            }
        });
        return this;
    },

    /**
     * This is a helper method for creating collisions handlers set up by `checkHits`. Do not call this directly.
     *
     * @param {String} component - The name of the component for which this handler checks for collisions.
     * @param {Object} collisionData - Collision data object used to track collisions with the specified component.
     *
     * @see .checkHits
     */
    _createCollisionHandler: function(component, collisionData) {
        return function() {
            var hitData = this.hit(component);

            if (collisionData.occurring === true) {
                if (hitData !== false) {
                    // The collision is still in progress
                    return;
                }

                collisionData.occurring = false;
                this.trigger("HitOff", component);
            } else if (hitData !== false) {
                collisionData.occurring = true;
                this.trigger("HitOn", hitData);
            }
        };
    },

    /**@
     * #.checkHits
     * @comp Collision
     * @sign public this .checkHits(String componentList)
     * @param componentList - A comma seperated list of components to check for collisions with.
     * @sign public this .checkHits(String component1[, .., String componentN])
     * @param component# - A component to check for collisions with.
     *
     * Performs collision checks against all entities that have at least one of
     * the components specified when calling this method. If collisions occur,
     * a "HitOn" event containing the collision information will be fired for the
     * entity on which this method was invoked. See the documentation for `.hit()`
     * for a description of collision data contained in the event.
     * When a collision that was reported ends, a corresponding "HitOff" event
     * will be fired.
     *
     * Calling this method more than once for the same component type will not
     * cause redundant hit checks.
     *
     * If you want more fine-grained control consider using `.hit()` or even `Crafty.map.search()`.
     *
     * @note Hit checks are performed upon entering each new frame (using
     * the *EnterFrame* event). It is entirely possible for object to move in
     * said frame after the checks were performed (even if the more is the
     * result of *EnterFrame*, as handlers run in no particular order). In such
     * a case, the hit events will not fire until the next check is performed in
     * the following frame.
     *
     * @example
     * ~~~
     * Crafty.e("2D, Collision")
     *     .checkHits('Solid') // check for collisions with entities that have the Solid component in each frame
     *     .bind("HitOn", function(hitData) {
     *         Crafty.log("Collision with Solid entity occurred for the first time.");
     *     })
     *     .bind("HitOff", function(comp) {
     *         Crafty.log("Collision with Solid entity ended.");
     *     });
     * ~~~
     *
     * @see .hit
     */
    checkHits: function () {
        var components = arguments;
        var i = 0;

        if (components.length === 1) {
            components = components[0].split(/\s*,\s*/);
        }

        for (; i < components.length; ++i) {
            var component = components[i];
            var collisionData = this._collisionData[component];

            if (collisionData !== undefined) {
                // There is already a handler for collision with this component
                continue;
            }

            this._collisionData[component] = collisionData = { occurring: false, handler: null };
            collisionData.handler = this._createCollisionHandler(component, collisionData);

            this.bind("EnterFrame", collisionData.handler);
        }

        return this;
    },

    /**@
     * #.ignoreHits
     * @comp Collision
     *
     * @sign public this .ignoreHits()
     *
     * @sign public this .ignoreHits(String componentList)
     * @param componentList - A comma separated list of components to stop checking
     * for collisions with.
     *
     * @sign public this .ignoreHits(String component1[, .., String componentN])
     * @param component# - A component to stop checking for collisions with.
     *
     * Stops checking for collisions with all, or certain, components. If called
     * without arguments, this method will cause all collision checks on the
     * entity to cease. To disable checks for collisions with specific
     * components, specify the components as a comma separated string or as
     * a set of arguments.
     *
     * Calling this method with component names for which there are no collision
     * checks has no effect.
     *
     * @example
     * ~~~
     * Crafty.e("2D, Collision")
     *     .checkHits('Solid')
     *     ...
     *     .ignoreHits('Solid'); // stop checking for collisions with entities that have the Solid component
     * ~~~
     */
    ignoreHits: function () {
        var components = arguments;
        var i = 0;
        var collisionData;

        if (components.length === 0) {
            for (collisionData in this._collisionData) {
                this.unbind("EnterFrame", collisionData.handler);
            }

            this._collisionData = {};
        }

        if (components.length === 1) {
            components = components[0].split(/\s*,\s*/);
        }

        for (; i < components.length; ++i) {
            var component = components[i];
            collisionData = this._collisionData[component];

            if (collisionData === undefined) {
                continue;
            }

            this.unbind("EnterFrame", collisionData.handler);
            delete this._collisionData[component];
        }

        return this;
    },

    /**@
     * #.resetHitChecks
     * @comp Collision
     * @sign public this .resetHitChecks()
     * @sign public this .resetHitChecks(String componentList)
     * @param componentList - A comma seperated list of components to re-check
     * for collisions with.
     * @sign public this .resetHitChecks(String component1[, .., String componentN])
     * @param component# - A component to re-check for collisions with.
     *
     * Causes collision events to be received for collisions that are already
     * taking place (normally, an additional event would not fire before said
     * collisions cease and happen another time).
     * If called without arguments, this method will cause all collision checks on the
     * entity to fire events once more. To re-check for collisions with specific
     * components, specify the components as a comma separated string or as
     * a set of arguments.
     *
     * Calling this method with component names for which there are no collision
     * checks has no effect.
     *
     * @example
     * ~~~
     * // this example fires the HitOn event each frame the collision with the Solid entity is active, instead of just the first time the collision occurs.
     * Crafty.e("2D, Collision")
     *     .checkHits('Solid')
     *     .bind("HitOn", function(hitData) {
     *         Crafty.log("Collision with Solid entity was reported in this frame again!");
     *         this.resetHitChecks('Solid'); // fire the HitOn event in the next frame also, if the collision is still active.
     *     })
     * ~~~
     */
    resetHitChecks: function() {
        var components = arguments;
        var i = 0;
        var collisionData;

        if (components.length === 0) {
            for (collisionData in this._collisionData) {
                this._collisionData[collisionData].occurring = false;
            }
        }

        if (components.length === 1) {
            components = components[0].split(/\s*,\s*/);
        }

        for (; i < components.length; ++i) {
            var component = components[i];
            collisionData = this._collisionData[component];

            if (collisionData === undefined) {
                continue;
            }

            collisionData.occurring = false;
        }

        return this;
    },

    _SAT: function (poly1, poly2) {
        var i = 0,
            points1 = poly1.points, points2 = poly2.points,
            l = points1.length/2,
            j, k = points2.length/2,
            nx=0, ny=0,
            length,
            min1, min2,
            max1, max2,
            interval,
            MTV = -Infinity,
            MNx = null,
            MNy = null,
            dot,
            np;

        //loop through the edges of Polygon 1
        for (; i < l; i++) {
            np = (i == l - 1 ? 0 : i + 1);

            //generate the normal for the current edge
            nx = -(points1[2*i+1] - points1[2*np+1]);
            ny = (points1[2*i] - points1[2*np]);

            //normalize the vector
            length = Math.sqrt(nx * nx + ny * ny);
            nx /= length;
            ny /= length;

            //default min max
            min1 = min2 = Infinity;
            max1 = max2 = -Infinity;

            //project all vertices from poly1 onto axis
            for (j = 0; j < l; ++j) {
                dot = points1[2*j] * nx + points1[2*j+1] * ny;
                if (dot > max1) max1 = dot;
                if (dot < min1) min1 = dot;
            }

            //project all vertices from poly2 onto axis
            for (j = 0; j < k; ++j) {
                dot = points2[2*j] * nx + points2[2*j+1] * ny;
                if (dot > max2) max2 = dot;
                if (dot < min2 ) min2 = dot;
            }

            //calculate the minimum translation vector should be negative
            if (min1 < min2) {
                interval = min2 - max1;
                nx = -nx;
                ny = -ny;
            } else {
                interval = min1 - max2;
            }

            //exit early if positive
            if (interval >= 0) {
                return false;
            }

            if (interval > MTV) {
                MTV = interval;
                MNx = nx;
                MNy = ny;
            }
        }

        //loop through the edges of Polygon 2
        for (i = 0; i < k; i++) {
            np = (i == k - 1 ? 0 : i + 1);

            //generate the normal for the current edge
            nx = -(points2[2*i+1] - points2[2*np+1]);
            ny = (points2[2*i] - points2[2*np]);

            //normalize the vector
            length = Math.sqrt(nx * nx + ny * ny);
            nx /= length;
            ny /= length;

            //default min max
            min1 = min2 = Infinity;
            max1 = max2 = -Infinity;

            //project all vertices from poly1 onto axis
            for (j = 0; j < l; ++j) {
                dot = points1[2*j] * nx + points1[2*j+1] * ny;
                if (dot > max1) max1 = dot;
                if (dot < min1) min1 = dot;
            }

            //project all vertices from poly2 onto axis
            for (j = 0; j < k; ++j) {
                dot = points2[2*j] * nx + points2[2*j+1] * ny;
                if (dot > max2) max2 = dot;
                if (dot < min2) min2 = dot;
            }

            //calculate the minimum translation vector should be negative
            if (min1 < min2) {
                interval = min2 - max1;
                nx = -nx;
                ny = -ny;
            } else {
                interval = min1 - max2;
            }

            //exit early if positive
            if (interval >= 0) {
                return false;
            }

            if (interval > MTV) {
                MTV = interval;
                MNx = nx;
                MNy = ny;
            }
        }

        return {
            overlap: MTV,
            normal: {
                x: MNx,
                y: MNy
            }
        };
    }
});

},{"../core/core.js":7}],41:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Crafty.math
 * @category Utilities
 *
 * A set of utility functions for common (and not so common) operations.
 */
Crafty.math = {
    /**@
     * #Crafty.math.abs
     * @comp Crafty.math
     * @sign public this Crafty.math.abs(Number n)
     * @param n - Some value.
     * @return Absolute value.
     *
     * Returns the absolute value.
     */
    abs: function (x) {
        return x < 0 ? -x : x;
    },

    /**@
     * #Crafty.math.amountOf
     * @comp Crafty.math
     * @sign public Number Crafty.math.amountOf(Number checkValue, Number minValue, Number maxValue)
     * @param checkValue - Value that should checked with minimum and maximum.
     * @param minValue - Bottom of the range
     * @param maxValue - Top of the range
     * @return The position of the checked value in a coordinate system normalized such that `minValue` is 0 and `maxValue` is 1.
     *
     * If checkValue is within the range, this will return a number between 0 and 1.
     */
    amountOf: function (checkValue, minValue, maxValue) {
        if (minValue < maxValue)
            return (checkValue - minValue) / (maxValue - minValue);
        else
            return (checkValue - maxValue) / (minValue - maxValue);
    },


    /**@
     * #Crafty.math.clamp
     * @comp Crafty.math
     * @sign public Number Crafty.math.clamp(Number value, Number min, Number max)
     * @param value - A value.
     * @param max - Maximum that value can be.
     * @param min - Minimum that value can be.
     * @return The value between minimum and maximum.
     *
     * Restricts a value to be within a specified range.
     */
    clamp: function (value, min, max) {
        if (value > max)
            return max;
        else if (value < min)
            return min;
        else
            return value;
    },

    /**@
     * #Crafty.math.degToRad
     * Converts angle from degree to radian.
     * @comp Crafty.math
     * @sign public Number degToRad(angleInDeg)
     * @param angleInDeg - The angle in degrees.
     * @return The angle in radians.
     */
    degToRad: function (angleInDeg) {
        return angleInDeg * Math.PI / 180;
    },

    /**@
     * #Crafty.math.distance
     * @comp Crafty.math
     * @sign public Number Crafty.math.distance(Number x1, Number y1, Number x2, Number y2)
     * @param x1 - First x coordinate.
     * @param y1 - First y coordinate.
     * @param x2 - Second x coordinate.
     * @param y2 - Second y coordinate.
     * @return The distance between the two points.
     *
     * Distance between two points.
     */
    distance: function (x1, y1, x2, y2) {
        var squaredDistance = Crafty.math.squaredDistance(x1, y1, x2, y2);
        return Math.sqrt(parseFloat(squaredDistance));
    },

    /**@
     * #Crafty.math.lerp
     * @comp Crafty.math
     * @sign public Number Crafty.math.lerp(Number value1, Number value2, Number amount)
     * @param value1 - One value.
     * @param value2 - Another value.
     * @param amount - Amount of value2 to value1.
     * @return Linear interpolated value.
     *
     * Linear interpolation. Passing amount with a value of 0 will cause value1 to be returned,
     * a value of 1 will cause value2 to be returned.
     */
    lerp: function (value1, value2, amount) {
        return value1 + (value2 - value1) * amount;
    },

    /**@
     * #Crafty.math.negate
     * @comp Crafty.math
     * @sign public Number Crafty.math.negate(Number percent)
     * @param percent - The probability of returning `-1`
     * @return 1 or -1.
     *
     * Returns `1` or `-1` randomly.
     */
    negate: function (percent) {
        if (Math.random() < percent)
            return -1;
        else
            return 1;
    },

    /**@
     * #Crafty.math.radToDeg
     * @comp Crafty.math
     * @sign public Number Crafty.math.radToDeg(Number angle)
     * @param angleInRad - The angle in radian.
     * @return The angle in degree.
     *
     * Converts angle from radian to degree.
     */
    radToDeg: function (angleInRad) {
        return angleInRad * 180 / Math.PI;
    },

    /**@
     * #Crafty.math.randomElementOfArray
     * @comp Crafty.math
     * @sign public Object Crafty.math.randomElementOfArray(Array array)
     * @param array - A specific array.
     * @return A random element of a specific array.
     *
     * Returns a random element of a specific array.
     */
    randomElementOfArray: function (array) {
        return array[Math.floor(array.length * Math.random())];
    },

    /**@
     * #Crafty.math.randomInt
     * @comp Crafty.math
     * @sign public Number Crafty.math.randomInt(Number start, Number end)
     * @param start - Smallest int value that can be returned.
     * @param end - Biggest int value that can be returned.
     * @return A random int.
     *
     * Returns a random int within a specific range.
     */
    randomInt: function (start, end) {
        return start + Math.floor((1 + end - start) * Math.random());
    },

    /**@
     * #Crafty.math.randomNumber
     * @comp Crafty.math
     * @sign public Number Crafty.math.randomInt(Number start, Number end)
     * @param start - Smallest number value that can be returned.
     * @param end - Biggest number value that can be returned.
     * @return A random number.
     *
     * Returns a random number in within a specific range.
     */
    randomNumber: function (start, end) {
        return start + (end - start) * Math.random();
    },

    /**@
     * #Crafty.math.squaredDistance
     * @comp Crafty.math
     * @sign public Number Crafty.math.squaredDistance(Number x1, Number y1, Number x2, Number y2)
     * @param x1 - First x coordinate.
     * @param y1 - First y coordinate.
     * @param x2 - Second x coordinate.
     * @param y2 - Second y coordinate.
     * @return The squared distance between the two points.
     *
     * Squared distance between two points.
     */
    squaredDistance: function (x1, y1, x2, y2) {
        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    },

    /**@
     * #Crafty.math.withinRange
     * @comp Crafty.math
     * @sign public Boolean Crafty.math.withinRange(Number value, Number min, Number max)
     * @param value - The specific value.
     * @param min - Minimum value.
     * @param max - Maximum value.
     * @return Returns true if value is within a specific range.
     *
     * Check if a value is within a specific range.
     */
    withinRange: function (value, min, max) {
        return (value >= min && value <= max);
    }
};

Crafty.math.Vector2D = (function () {
    /**@
     * #Crafty.math.Vector2D
     * @category 2D
     * @class This is a general purpose 2D vector class
     *
     * Vector2D uses the following form:
     * <x, y>
     *
     * @public
     * @sign public {Vector2D} Vector2D();
     * @sign public {Vector2D} Vector2D(Vector2D);
     * @sign public {Vector2D} Vector2D(Number, Number);
     * @param {Vector2D|Number=0} x
     * @param {Number=0} y
     */

    function Vector2D(x, y) {
        if (x instanceof Vector2D) {
            this.x = x.x;
            this.y = x.y;
        } else if (arguments.length === 2) {
            this.x = x;
            this.y = y;
        } else if (arguments.length > 0)
            throw "Unexpected number of arguments for Vector2D()";
    } // class Vector2D

    Vector2D.prototype.x = 0;
    Vector2D.prototype.y = 0;

    /**@
     * #.add
     * @comp Crafty.math.Vector2D
     *
     * Adds the passed vector to this vector
     *
     * @public
     * @sign public {Vector2D} add(Vector2D);
     * @param {vector2D} vecRH
     * @returns {Vector2D} this after adding
     */
    Vector2D.prototype.add = function (vecRH) {
        this.x += vecRH.x;
        this.y += vecRH.y;
        return this;
    }; // add

    /**@
     * #.angleBetween
     * @comp Crafty.math.Vector2D
     *
     * Calculates the angle between the passed vector and this vector, using <0,0> as the point of reference.
     * Angles returned have the range (−π, π].
     *
     * @public
     * @sign public {Number} angleBetween(Vector2D);
     * @param {Vector2D} vecRH
     * @returns {Number} the angle between the two vectors in radians
     */
    Vector2D.prototype.angleBetween = function (vecRH) {
        return Math.atan2(this.x * vecRH.y - this.y * vecRH.x, this.x * vecRH.x + this.y * vecRH.y);
    }; // angleBetween

    /**@
     * #.angleTo
     * @comp Crafty.math.Vector2D
     *
     * Calculates the angle to the passed vector from this vector, using this vector as the point of reference.
     *
     * @public
     * @sign public {Number} angleTo(Vector2D);
     * @param {Vector2D} vecRH
     * @returns {Number} the angle to the passed vector in radians
     */
    Vector2D.prototype.angleTo = function (vecRH) {
        return Math.atan2(vecRH.y - this.y, vecRH.x - this.x);
    };

    /**@
     * #.clone
     * @comp Crafty.math.Vector2D
     *
     * Creates and exact, numeric copy of this vector
     *
     * @public
     * @sign public {Vector2D} clone();
     * @returns {Vector2D} the new vector
     */
    Vector2D.prototype.clone = function () {
        return new Vector2D(this);
    }; // clone

    /**@
     * #.distance
     * @comp Crafty.math.Vector2D
     *
     * Calculates the distance from this vector to the passed vector.
     *
     * @public
     * @sign public {Number} distance(Vector2D);
     * @param {Vector2D} vecRH
     * @returns {Number} the distance between the two vectors
     */
    Vector2D.prototype.distance = function (vecRH) {
        return Math.sqrt((vecRH.x - this.x) * (vecRH.x - this.x) + (vecRH.y - this.y) * (vecRH.y - this.y));
    }; // distance

    /**@
     * #.distanceSq
     * @comp Crafty.math.Vector2D
     *
     * Calculates the squared distance from this vector to the passed vector.
     * This function avoids calculating the square root, thus being slightly faster than .distance( ).
     *
     * @public
     * @sign public {Number} distanceSq(Vector2D);
     * @param {Vector2D} vecRH
     * @returns {Number} the squared distance between the two vectors
     * @see .distance
     */
    Vector2D.prototype.distanceSq = function (vecRH) {
        return (vecRH.x - this.x) * (vecRH.x - this.x) + (vecRH.y - this.y) * (vecRH.y - this.y);
    }; // distanceSq

    /**@
     * #.divide
     * @comp Crafty.math.Vector2D
     *
     * Divides this vector by the passed vector.
     *
     * @public
     * @sign public {Vector2D} divide(Vector2D);
     * @param {Vector2D} vecRH
     * @returns {Vector2D} this vector after dividing
     */
    Vector2D.prototype.divide = function (vecRH) {
        this.x /= vecRH.x;
        this.y /= vecRH.y;
        return this;
    }; // divide

    /**@
     * #.dotProduct
     * @comp Crafty.math.Vector2D
     *
     * Calculates the dot product of this and the passed vectors
     *
     * @public
     * @sign public {Number} dotProduct(Vector2D);
     * @param {Vector2D} vecRH
     * @returns {Number} the resultant dot product
     */
    Vector2D.prototype.dotProduct = function (vecRH) {
        return this.x * vecRH.x + this.y * vecRH.y;
    }; // dotProduct

    /**@
     * #.crossProduct
     * @comp Crafty.math.Vector2D
     *
     * Calculates the z component of the cross product of the two vectors augmented to 3D.
     *
     * @public
     * @sign public {Number} crossProduct(Vector2D);
     * @param {Vector2D} vecRH
     * @returns {Number} the resultant cross product
     */
    Vector2D.prototype.crossProduct = function (vecRH) {
        return this.x * vecRH.y - this.y * vecRH.x;
    }; // crossProduct

    /**@
     * #.equals
     * @comp Crafty.math.Vector2D
     *
     * Determines if this vector is numerically equivalent to the passed vector.
     *
     * @public
     * @sign public {Boolean} equals(Vector2D);
     * @param {Vector2D} vecRH
     * @returns {Boolean} true if the vectors are equivalent
     */
    Vector2D.prototype.equals = function (vecRH) {
        return vecRH instanceof Vector2D &&
            this.x == vecRH.x && this.y == vecRH.y;
    }; // equals

    /**@
     * #.perpendicular
     * @comp Crafty.math.Vector2D
     *
     * Calculates a new vector that is perpendicular to this vector.
     * The perpendicular vector has the same magnitude as this vector and is obtained by a counter-clockwise rotation of 90° of this vector.
     *
     * @public
     * @sign public {Vector2D} perpendicular([Vector2D]);
     * @param {Vector2D} [result] - An optional parameter to save the result in
     * @returns {Vector2D} the perpendicular vector
     */
    Vector2D.prototype.perpendicular = function (result) {
        result = result || new Vector2D();
        return result.setValues(-this.y, this.x);
    }; // perpendicular

    /**@
     * #.getNormal
     * @comp Crafty.math.Vector2D
     *
     * Calculates a new right-handed unit vector that is perpendicular to the line created by this and the passed vector.
     *
     * @public
     * @sign public {Vector2D} getNormal(Vector2D[, Vector2D]);
     * @param {Vector2D} vecRH
     * @param {Vector2D} [result] - An optional parameter to save the result in
     * @returns {Vector2D} the new normal vector
     */
    Vector2D.prototype.getNormal = function (vecRH, result) {
        result = result || new Vector2D();
        return result.setValues(vecRH.y - this.y, this.x - vecRH.x).normalize();
    }; // getNormal

    /**@
     * #.isZero
     * @comp Crafty.math.Vector2D
     *
     * Determines if this vector is equal to <0,0>
     *
     * @public
     * @sign public {Boolean} isZero();
     * @returns {Boolean} true if this vector is equal to <0,0>
     */
    Vector2D.prototype.isZero = function () {
        return this.x === 0 && this.y === 0;
    }; // isZero

    /**@
     * #.magnitude
     * @comp Crafty.math.Vector2D
     *
     * Calculates the magnitude of this vector.
     * Note: Function objects in JavaScript already have a 'length' member, hence the use of magnitude instead.
     *
     * @public
     * @sign public {Number} magnitude();
     * @returns {Number} the magnitude of this vector
     */
    Vector2D.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }; // magnitude

    /**@
     * #.magnitudeSq
     * @comp Crafty.math.Vector2D
     *
     * Calculates the square of the magnitude of this vector.
     * This function avoids calculating the square root, thus being slightly faster than .magnitude( ).
     *
     * @public
     * @sign public {Number} magnitudeSq();
     * @returns {Number} the square of the magnitude of this vector
     * @see .magnitude
     */
    Vector2D.prototype.magnitudeSq = function () {
        return this.x * this.x + this.y * this.y;
    }; // magnitudeSq

    /**@
     * #.multiply
     * @comp Crafty.math.Vector2D
     *
     * Multiplies this vector by the passed vector
     *
     * @public
     * @sign public {Vector2D} multiply(Vector2D);
     * @param {Vector2D} vecRH
     * @returns {Vector2D} this vector after multiplying
     */
    Vector2D.prototype.multiply = function (vecRH) {
        this.x *= vecRH.x;
        this.y *= vecRH.y;
        return this;
    }; // multiply

    /**@
     * #.negate
     * @comp Crafty.math.Vector2D
     *
     * Negates this vector (ie. <-x,-y>)
     *
     * @public
     * @sign public {Vector2D} negate();
     * @returns {Vector2D} this vector after negation
     */
    Vector2D.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }; // negate

    /**@
     * #.normalize
     * @comp Crafty.math.Vector2D
     *
     * Normalizes this vector (scales the vector so that its new magnitude is 1)
     * For vectors where magnitude is 0, <1,0> is returned.
     *
     * @public
     * @sign public {Vector2D} normalize();
     * @returns {Vector2D} this vector after normalization
     */
    Vector2D.prototype.normalize = function () {
        var lng = Math.sqrt(this.x * this.x + this.y * this.y);

        if (lng === 0) {
            // default due East
            this.x = 1;
            this.y = 0;
        } else {
            this.x /= lng;
            this.y /= lng;
        } // else

        return this;
    }; // normalize

    /**@
     * #.scale
     * @comp Crafty.math.Vector2D
     *
     * Scales this vector by the passed amount(s)
     * If scalarY is omitted, scalarX is used for both axes
     *
     * @public
     * @sign public {Vector2D} scale(Number[, Number]);
     * @param {Number} scalarX
     * @param {Number} [scalarY]
     * @returns {Vector2D} this after scaling
     */
    Vector2D.prototype.scale = function (scalarX, scalarY) {
        if (scalarY === undefined)
            scalarY = scalarX;

        this.x *= scalarX;
        this.y *= scalarY;

        return this;
    }; // scale

    /**@
     * #.scaleToMagnitude
     * @comp Crafty.math.Vector2D
     *
     * Scales this vector such that its new magnitude is equal to the passed value.
     *
     * @public
     * @sign public {Vector2D} scaleToMagnitude(Number);
     * @param {Number} mag
     * @returns {Vector2D} this vector after scaling
     */
    Vector2D.prototype.scaleToMagnitude = function (mag) {
        var k = mag / this.magnitude();
        this.x *= k;
        this.y *= k;
        return this;
    }; // scaleToMagnitude

    /**@
     * #.setValues
     * @comp Crafty.math.Vector2D
     *
     * Sets the values of this vector using a passed vector or pair of numbers.
     *
     * @public
     * @sign public {Vector2D} setValues(Vector2D);
     * @sign public {Vector2D} setValues(Number, Number);
     * @param {Number|Vector2D} x
     * @param {Number} y
     * @returns {Vector2D} this vector after setting of values
     */
    Vector2D.prototype.setValues = function (x, y) {
        if (x instanceof Vector2D) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        } // else

        return this;
    }; // setValues

    /**@
     * #.subtract
     * @comp Crafty.math.Vector2D
     *
     * Subtracts the passed vector from this vector.
     *
     * @public
     * @sign public {Vector2D} subtract(Vector2D);
     * @param {Vector2D} vecRH
     * @returns {vector2D} this vector after subtracting
     */
    Vector2D.prototype.subtract = function (vecRH) {
        this.x -= vecRH.x;
        this.y -= vecRH.y;
        return this;
    }; // subtract

    /**@
     * #.toString
     * @comp Crafty.math.Vector2D
     *
     * Returns a string representation of this vector.
     *
     * @public
     * @sign public {String} toString();
     * @returns {String}
     */
    Vector2D.prototype.toString = function () {
        return "Vector2D(" + this.x + ", " + this.y + ")";
    }; // toString

    /**@
     * #.translate
     * @comp Crafty.math.Vector2D
     *
     * Translates (moves) this vector by the passed amounts.
     * If dy is omitted, dx is used for both axes.
     *
     * @public
     * @sign public {Vector2D} translate(Number[, Number]);
     * @param {Number} dx
     * @param {Number} [dy]
     * @returns {Vector2D} this vector after translating
     */
    Vector2D.prototype.translate = function (dx, dy) {
        if (dy === undefined)
            dy = dx;

        this.x += dx;
        this.y += dy;

        return this;
    }; // translate

    /**@
     * #.tripleProduct
     * @comp Crafty.math.Vector2D
     *
     * Calculates the triple product of three vectors.
     * triple vector product = b(a•c) - a(b•c)
     *
     * @public
     * @static
     * @sign public {Vector2D} tripleProduct(Vector2D, Vector2D, Vector2D, [Vector2D]);
     * @param {Vector2D} a
     * @param {Vector2D} b
     * @param {Vector2D} c
     * @param {Vector2D} [result] - An optional parameter to save the result in
     * @return {Vector2D} the triple product as a new vector
     */
    Vector2D.tripleProduct = function (a, b, c, result) {
        result = result || new Crafty.math.Vector2D();
        var ac = a.dotProduct(c);
        var bc = b.dotProduct(c);
        return result.setValues(b.x * ac - a.x * bc, b.y * ac - a.y * bc);
    };

    return Vector2D;
})();

Crafty.math.Matrix2D = (function () {
    /**@
     * #Crafty.math.Matrix2D
     * @category 2D
     *
     * @class This is a 2D Matrix2D class. It is 3x3 to allow for affine transformations in 2D space.
     * The third row is always assumed to be [0, 0, 1].
     *
     * Matrix2D uses the following form, as per the whatwg.org specifications for canvas.transform():
     * [a, c, e]
     * [b, d, f]
     * [0, 0, 1]
     *
     * @public
     * @sign public {Matrix2D} new Matrix2D();
     * @sign public {Matrix2D} new Matrix2D(Matrix2D);
     * @sign public {Matrix2D} new Matrix2D(Number, Number, Number, Number, Number, Number);
     * @param {Matrix2D|Number=1} a
     * @param {Number=0} b
     * @param {Number=0} c
     * @param {Number=1} d
     * @param {Number=0} e
     * @param {Number=0} f
     */
    Matrix2D = function (a, b, c, d, e, f) {
        if (a instanceof Matrix2D) {
            this.a = a.a;
            this.b = a.b;
            this.c = a.c;
            this.d = a.d;
            this.e = a.e;
            this.f = a.f;
        } else if (arguments.length === 6) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.e = e;
            this.f = f;
        } else if (arguments.length > 0)
            throw "Unexpected number of arguments for Matrix2D()";
    }; // class Matrix2D

    Matrix2D.prototype.a = 1;
    Matrix2D.prototype.b = 0;
    Matrix2D.prototype.c = 0;
    Matrix2D.prototype.d = 1;
    Matrix2D.prototype.e = 0;
    Matrix2D.prototype.f = 0;

    /**@
     * #.apply
     * @comp Crafty.math.Matrix2D
     *
     * Applies the matrix transformations to the passed object
     *
     * @public
     * @sign public {Vector2D} apply(Vector2D);
     * @param {Vector2D} vecRH - vector to be transformed
     * @returns {Vector2D} the passed vector object after transforming
     */
    Matrix2D.prototype.apply = function (vecRH) {
        // I'm not sure of the best way for this function to be implemented. Ideally
        // support for other objects (rectangles, polygons, etc) should be easily
        // addable in the future. Maybe a function (apply) is not the best way to do
        // this...?

        var tmpX = vecRH.x;
        vecRH.x = tmpX * this.a + vecRH.y * this.c + this.e;
        vecRH.y = tmpX * this.b + vecRH.y * this.d + this.f;
        // no need to homogenize since the third row is always [0, 0, 1]

        return vecRH;
    }; // apply

    /**@
     * #.clone
     * @comp Crafty.math.Matrix2D
     *
     * Creates an exact, numeric copy of the current matrix
     *
     * @public
     * @sign public {Matrix2D} clone();
     * @returns {Matrix2D}
     */
    Matrix2D.prototype.clone = function () {
        return new Matrix2D(this);
    }; // clone

    /**@
     * #.combine
     * @comp Crafty.math.Matrix2D
     *
     * Multiplies this matrix with another, overriding the values of this matrix.
     * The passed matrix is assumed to be on the right-hand side.
     *
     * @public
     * @sign public {Matrix2D} combine(Matrix2D);
     * @param {Matrix2D} mtrxRH
     * @returns {Matrix2D} this matrix after combination
     */
    Matrix2D.prototype.combine = function (mtrxRH) {
        var tmp = this.a;
        this.a = tmp * mtrxRH.a + this.b * mtrxRH.c;
        this.b = tmp * mtrxRH.b + this.b * mtrxRH.d;
        tmp = this.c;
        this.c = tmp * mtrxRH.a + this.d * mtrxRH.c;
        this.d = tmp * mtrxRH.b + this.d * mtrxRH.d;
        tmp = this.e;
        this.e = tmp * mtrxRH.a + this.f * mtrxRH.c + mtrxRH.e;
        this.f = tmp * mtrxRH.b + this.f * mtrxRH.d + mtrxRH.f;
        return this;
    }; // combine

    /**@
     * #.equals
     * @comp Crafty.math.Matrix2D
     *
     * Checks for the numeric equality of this matrix versus another.
     *
     * @public
     * @sign public {Boolean} equals(Matrix2D);
     * @param {Matrix2D} mtrxRH
     * @returns {Boolean} true if the two matrices are numerically equal
     */
    Matrix2D.prototype.equals = function (mtrxRH) {
        return mtrxRH instanceof Matrix2D &&
            this.a == mtrxRH.a && this.b == mtrxRH.b && this.c == mtrxRH.c &&
            this.d == mtrxRH.d && this.e == mtrxRH.e && this.f == mtrxRH.f;
    }; // equals

    /**@
     * #.determinant
     * @comp Crafty.math.Matrix2D
     *
     * Calculates the determinant of this matrix
     *
     * @public
     * @sign public {Number} determinant();
     * @returns {Number} det(this matrix)
     */
    Matrix2D.prototype.determinant = function () {
        return this.a * this.d - this.b * this.c;
    }; // determinant

    /**@
     * #.invert
     * @comp Crafty.math.Matrix2D
     *
     * Inverts this matrix if possible
     *
     * @public
     * @sign public {Matrix2D} invert();
     * @returns {Matrix2D} this inverted matrix or the original matrix on failure
     * @see .isInvertible
     */
    Matrix2D.prototype.invert = function () {
        var det = this.determinant();

        // matrix is invertible if its determinant is non-zero
        if (det !== 0) {
            var old = {
                a: this.a,
                b: this.b,
                c: this.c,
                d: this.d,
                e: this.e,
                f: this.f
            };
            this.a = old.d / det;
            this.b = -old.b / det;
            this.c = -old.c / det;
            this.d = old.a / det;
            this.e = (old.c * old.f - old.e * old.d) / det;
            this.f = (old.e * old.b - old.a * old.f) / det;
        } // if

        return this;
    }; // invert

    /**@
     * #.isIdentity
     * @comp Crafty.math.Matrix2D
     *
     * Returns true if this matrix is the identity matrix
     *
     * @public
     * @sign public {Boolean} isIdentity();
     * @returns {Boolean}
     */
    Matrix2D.prototype.isIdentity = function () {
        return this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.e === 0 && this.f === 0;
    }; // isIdentity

    /**@
     * #.isInvertible
     * @comp Crafty.math.Matrix2D
     *
     * Determines is this matrix is invertible.
     *
     * @public
     * @sign public {Boolean} isInvertible();
     * @returns {Boolean} true if this matrix is invertible
     * @see .invert
     */
    Matrix2D.prototype.isInvertible = function () {
        return this.determinant() !== 0;
    }; // isInvertible

    /**@
     * #.preRotate
     * @comp Crafty.math.Matrix2D
     *
     * Applies a counter-clockwise pre-rotation to this matrix
     *
     * @public
     * @sign public {Matrix2D} preRotate(Number);
     * @param {number} rads - angle to rotate in radians
     * @returns {Matrix2D} this matrix after pre-rotation
     */
    Matrix2D.prototype.preRotate = function (rads) {
        var nCos = Math.cos(rads);
        var nSin = Math.sin(rads);

        var tmp = this.a;
        this.a = nCos * tmp - nSin * this.b;
        this.b = nSin * tmp + nCos * this.b;
        tmp = this.c;
        this.c = nCos * tmp - nSin * this.d;
        this.d = nSin * tmp + nCos * this.d;

        return this;
    }; // preRotate

    /**@
     * #.preScale
     * @comp Crafty.math.Matrix2D
     *
     * Applies a pre-scaling to this matrix
     *
     * @public
     * @sign public {Matrix2D} preScale(Number[, Number]);
     * @param {Number} scalarX
     * @param {Number} [scalarY] scalarX is used if scalarY is undefined
     * @returns {Matrix2D} this after pre-scaling
     */
    Matrix2D.prototype.preScale = function (scalarX, scalarY) {
        if (scalarY === undefined)
            scalarY = scalarX;

        this.a *= scalarX;
        this.b *= scalarY;
        this.c *= scalarX;
        this.d *= scalarY;

        return this;
    }; // preScale

    /**@
     * #.preTranslate
     * @comp Crafty.math.Matrix2D
     *
     * Applies a pre-translation to this matrix
     *
     * @public
     * @sign public {Matrix2D} preTranslate(Vector2D);
     * @sign public {Matrix2D} preTranslate(Number, Number);
     * @param {Number|Vector2D} dx
     * @param {Number} dy
     * @returns {Matrix2D} this matrix after pre-translation
     */
    Matrix2D.prototype.preTranslate = function (dx, dy) {
        if (typeof dx === "number") {
            this.e += dx;
            this.f += dy;
        } else {
            this.e += dx.x;
            this.f += dx.y;
        } // else

        return this;
    }; // preTranslate

    /**@
     * #.rotate
     * @comp Crafty.math.Matrix2D
     *
     * Applies a counter-clockwise post-rotation to this matrix
     *
     * @public
     * @sign public {Matrix2D} rotate(Number);
     * @param {Number} rads - angle to rotate in radians
     * @returns {Matrix2D} this matrix after rotation
     */
    Matrix2D.prototype.rotate = function (rads) {
        var nCos = Math.cos(rads);
        var nSin = Math.sin(rads);

        var tmp = this.a;
        this.a = nCos * tmp - nSin * this.b;
        this.b = nSin * tmp + nCos * this.b;
        tmp = this.c;
        this.c = nCos * tmp - nSin * this.d;
        this.d = nSin * tmp + nCos * this.d;
        tmp = this.e;
        this.e = nCos * tmp - nSin * this.f;
        this.f = nSin * tmp + nCos * this.f;

        return this;
    }; // rotate

    /**@
     * #.scale
     * @comp Crafty.math.Matrix2D
     *
     * Applies a post-scaling to this matrix
     *
     * @public
     * @sign public {Matrix2D} scale(Number[, Number]);
     * @param {Number} scalarX
     * @param {Number} [scalarY] scalarX is used if scalarY is undefined
     * @returns {Matrix2D} this after post-scaling
     */
    Matrix2D.prototype.scale = function (scalarX, scalarY) {
        if (scalarY === undefined)
            scalarY = scalarX;

        this.a *= scalarX;
        this.b *= scalarY;
        this.c *= scalarX;
        this.d *= scalarY;
        this.e *= scalarX;
        this.f *= scalarY;

        return this;
    }; // scale

    /**@
     * #.setValues
     * @comp Crafty.math.Matrix2D
     *
     * Sets the values of this matrix
     *
     * @public
     * @sign public {Matrix2D} setValues(Matrix2D);
     * @sign public {Matrix2D} setValues(Number, Number, Number, Number, Number, Number);
     * @param {Matrix2D|Number} a
     * @param {Number} b
     * @param {Number} c
     * @param {Number} d
     * @param {Number} e
     * @param {Number} f
     * @returns {Matrix2D} this matrix containing the new values
     */
    Matrix2D.prototype.setValues = function (a, b, c, d, e, f) {
        if (a instanceof Matrix2D) {
            this.a = a.a;
            this.b = a.b;
            this.c = a.c;
            this.d = a.d;
            this.e = a.e;
            this.f = a.f;
        } else {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.e = e;
            this.f = f;
        } // else

        return this;
    }; // setValues

    /**@
     * #.toString
     * @comp Crafty.math.Matrix2D
     *
     * Returns the string representation of this matrix.
     *
     * @public
     * @sign public {String} toString();
     * @returns {String}
     */
    Matrix2D.prototype.toString = function () {
        return "Matrix2D([" + this.a + ", " + this.c + ", " + this.e +
            "] [" + this.b + ", " + this.d + ", " + this.f + "] [0, 0, 1])";
    }; // toString

    /**@
     * #.translate
     * @comp Crafty.math.Matrix2D
     *
     * Applies a post-translation to this matrix
     *
     * @public
     * @sign public {Matrix2D} translate(Vector2D);
     * @sign public {Matrix2D} translate(Number, Number);
     * @param {Number|Vector2D} dx
     * @param {Number} dy
     * @returns {Matrix2D} this matrix after post-translation
     */
    Matrix2D.prototype.translate = function (dx, dy) {
        if (typeof dx === "number") {
            this.e += this.a * dx + this.c * dy;
            this.f += this.b * dx + this.d * dy;
        } else {
            this.e += this.a * dx.x + this.c * dx.y;
            this.f += this.b * dx.x + this.d * dx.y;
        } // else

        return this;
    }; // translate

    return Matrix2D;
})();
},{"../core/core.js":7}],42:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Crafty.rectManager
 * @category 2D
 *
 * Collection of methods for handling rectangles
 */
Crafty.extend({
    /** recManager: an object for managing dirty rectangles. */
   rectManager: {
       /** Finds smallest rectangles that overlaps a and b, merges them into target */
       merge: function (a, b, target) {
           if (typeof target === 'undefined')
               target = {};
           // Doing it in this order means we can use either a or b as the target, with no conflict
           target._h = Math.max(a._y + a._h, b._y + b._h);
           target._w = Math.max(a._x + a._w, b._x + b._w);
           target._x = Math.min(a._x, b._x);
           target._y = Math.min(a._y, b._y);
           target._w -= target._x;
           target._h -= target._y;

           return target;
       },

      /**@
       * #Crafty.rectManager.overlap
       * @comp Crafty.rectManager
       * @sign public Boolean Crafty.rectManager.overlap(Object rectA, Object rectA)
       * @param rectA - An object that must have the `_x, _y, _w, _h` values as properties
       * @param rectB - An object that must have the `_x, _y, _w, _h` values as properties
       * @return true if the rectangles overlap; false otherwise
       *
       * Checks whether two rectangles overlap.
       */
      overlap: function (rectA, rectB) {
        return (rectA._x < rectB._x + rectB._w && rectA._x + rectA._w > rectB._x &&
                rectA._y < rectB._y + rectB._h && rectA._y + rectA._h > rectB._y);
      },

      /**@
      * #Crafty.rectManager.mergeSet
      * @comp Crafty.rectManager
      * @sign public Object Crafty.rectManager.mergeSet(Object set)
      * @param set - an array of rectangular regions
      *
      * Merge any consecutive, overlapping rects into each other.
      * Its an optimization for the redraw regions.
      *
      * The order of set isn't strictly meaningful,
      * but overlapping objects will often cause each other to change,
      * and so might be consecutive.
      */
      mergeSet: function (set) {
          var i = 0;
          while (i < set.length - 1) {
              // If current and next overlap, merge them together into the first, removing the second
              // Then skip the index backwards to compare the previous pair.
              // Otherwise skip forward
              if (this.overlap(set[i], set[i + 1])) {
                  this.merge(set[i], set[i + 1], set[i]);
                  set.splice(i + 1, 1);
                  if (i > 0) {
                    i--;
                  }
              } else {
                  i++;
              }
          }

          return set;
      },

      /**@
       * #Crafty.rectManager.boundingRect
       * @comp Crafty.rectManager
       * @sign public Crafty.rectManager.boundingRect(set)
       * @param set - An array of rectangles
       *
       * - Calculate the common bounding rect of multiple canvas entities.
       * - Returns coords
       */
      boundingRect: function (set) {
          if (!set || !set.length) return;
          var newset = [],
              i = 1,
              l = set.length,
              current, master = set[0],
              tmp;
          master = [master._x, master._y, master._x + master._w, master._y + master._h];
          while (i < l) {
              current = set[i];
              tmp = [current._x, current._y, current._x + current._w, current._y + current._h];
              if (tmp[0] < master[0]) master[0] = tmp[0];
              if (tmp[1] < master[1]) master[1] = tmp[1];
              if (tmp[2] > master[2]) master[2] = tmp[2];
              if (tmp[3] > master[3]) master[3] = tmp[3];
              i++;
          }
          tmp = master;
          master = {
              _x: tmp[0],
              _y: tmp[1],
              _w: tmp[2] - tmp[0],
              _h: tmp[3] - tmp[1]
          };

          return master;
      },

      // Crafty.rectManager._rectPool
      //
      // This is a private object used internally by 2D methods
      // Cascade and _attr need to keep track of an entity's old position,
      // but we want to avoid creating temp objects every time an attribute is set.
      // The solution is to have a pool of objects that can be reused.
      //
      // The current implementation makes a BIG ASSUMPTION:  that if multiple rectangles are requested,
      // the later one is recycled before any preceding ones.  This matches how they are used in the code.
      // Each rect is created by a triggered event, and will be recycled by the time the event is complete.
      _pool: (function () {
          var pool = [],
              pointer = 0;
          return {
              get: function (x, y, w, h) {
                  if (pool.length <= pointer)
                      pool.push({});
                  var r = pool[pointer++];
                  r._x = x;
                  r._y = y;
                  r._w = w;
                  r._h = h;
                  return r;
              },

              copy: function (o) {
                  if (pool.length <= pointer)
                      pool.push({});
                  var r = pool[pointer++];
                  r._x = o._x;
                  r._y = o._y;
                  r._w = o._w;
                  r._h = o._h;
                  return r;
              },

              recycle: function (o) {
                  pointer--;
              }
          };
      })(),

   }


});

},{"../core/core.js":7}],43:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**
 * Spatial HashMap for broad phase collision
 *
 * @author Louis Stowasser
 */

    /**@
     * #Crafty.HashMap.constructor
     * @comp Crafty.HashMap
     * @sign public void Crafty.HashMap([cellsize])
     * @param cellsize - the cell size. If omitted, `cellsize` is 64.
     *
     * Set `cellsize`.
     * And create `this.map`.
     */
    var cellsize,

        HashMap = function (cell) {
            cellsize = cell || 64;
            this.map = {};
        },

        SPACE = " ",
        keyHolder = {};

    HashMap.prototype = {
        /**@
         * #Crafty.map.insert
         * @comp Crafty.map
         * @sign public Object Crafty.map.insert(Object obj)
         * @param obj - An entity to be inserted.
         * @returns An object representing this object's entry in the HashMap
         * 
         * `obj` is inserted in '.map' of the corresponding broad phase cells. An object of the following fields is returned.
         * ~~~
         * {
         *   keys: the object that keep track of cells
         *   obj: The inserted object
         *   map: the HashMap object
         * }
         * ~~~
         */
        insert: function (obj) {
            var keys = HashMap.key(obj),
                entry = new Entry(keys, obj, this),
                i = 0,
                j,
                hash;

            //insert into all x buckets
            for (i = keys.x1; i <= keys.x2; i++) {
                //insert into all y buckets
                for (j = keys.y1; j <= keys.y2; j++) {
                    hash = (i << 16) ^ j;
                    if (!this.map[hash]) this.map[hash] = [];
                    this.map[hash].push(obj);
                }
            }

            return entry;
        },

        /**@
         * #Crafty.map.search
         * @comp Crafty.map
         * @sign public Object Crafty.map.search(Object rect[, Boolean filter])
         * @param rect - the rectangular region to search for entities.
         * @param filter - If false, only performs a broad-phase collision check.  The default value is true.
         *
         * - If `filter` is `false`, just search for all the entries in the give `rect` region by broad phase collision. Entity may be returned duplicated.
         * - If `filter` is `true`, filter the above results by checking that they actually overlap `rect`.
         *
         * The easier usage is with `filter == true`. For performance reason, you may use `filter == false`, and filter the result yourself. See examples in drawing.js and collision.js
         */

        search: function (rect, filter) {
            var keys = HashMap.key(rect, keyHolder),
                i, j, k, l, cell,
                results = [];

            if (filter === undefined) filter = true; //default filter to true

            //search in all x buckets
            for (i = keys.x1; i <= keys.x2; i++) {
                //insert into all y buckets
                for (j = keys.y1; j <= keys.y2; j++) {
                    cell = this.map[(i << 16) ^ j];
                    if (cell) {
                        for (k = 0; k < cell.length; k++)
                            results.push(cell[k]);
                    }
                }
            }

            if (filter) {
                var obj, id, finalresult = [],
                    found = {};
                //add unique elements to lookup table with the entity ID as unique key
                for (i = 0, l = results.length; i < l; i++) {
                    obj = results[i];
                    if (!obj) continue; //skip if deleted
                    id = obj[0]; //unique ID
                    obj = obj._mbr || obj;
                    //check if not added to hash and that actually intersects
                    if (!found[id] && obj._x < rect._x + rect._w && obj._x + obj._w > rect._x &&
                                      obj._y < rect._y + rect._h && obj._y + obj._h > rect._y)
                        found[id] = results[i];
                }

                //loop over lookup table and copy to final array
                for (obj in found) finalresult.push(found[obj]);

                return finalresult;
            } else {
                return results;
            }
        },

        /**@
         * #Crafty.map.remove
         * @comp Crafty.map
         * @sign public void Crafty.map.remove([Object keys, ]Object obj)
         * @param keys - key region. If omitted, it will be derived from obj by `Crafty.HashMap.key`.
         * @param obj - An object to remove from the hashmap
         *
         * Remove an entity in a broad phase map.
         * - The second form is only used in Crafty.HashMap to save time for computing keys again, where keys were computed previously from obj. End users should not call this form directly.
         *
         * @example
         * ~~~
         * Crafty.map.remove(e);
         * ~~~
         */
        remove: function (keys, obj) {
            var i = 0,
                j, hash;

            if (arguments.length == 1) {
                obj = keys;
                keys = HashMap.key(obj, keyHolder);
            }

            //search in all x buckets
            for (i = keys.x1; i <= keys.x2; i++) {
                //insert into all y buckets
                for (j = keys.y1; j <= keys.y2; j++) {
                    hash = (i << 16) ^ j;

                    if (this.map[hash]) {
                        var cell = this.map[hash],
                            m, n = cell.length;
                        //loop over objs in cell and delete
                        for (m = 0; m < n; m++)
                            if (cell[m] && cell[m][0] === obj[0])
                                cell.splice(m, 1);
                    }
                }
            }
        },

        /**@
         * #Crafty.map.refresh
         * @comp Crafty.map
         * @sign public void Crafty.map.remove(Entry entry)
         * @param entry - An entry to update
         *
         * Update an entry's keys, and its position in the broad phrase map.
         *
         * @example
         * ~~~
         * Crafty.map.refresh(e);
         * ~~~
         */
        refresh: function (entry) {
            var keys = entry.keys;
            var obj = entry.obj;
            var cell, i, j, m, n;

            //First delete current object from appropriate cells
            for (i = keys.x1; i <= keys.x2; i++) {
                for (j = keys.y1; j <= keys.y2; j++) {
                    cell = this.map[(i << 16) ^ j];
                    if (cell) {
                        n = cell.length;
                        //loop over objs in cell and delete
                        for (m = 0; m < n; m++)
                            if (cell[m] && cell[m][0] === obj[0])
                                cell.splice(m, 1);
                    }
                }
            }

            //update keys
            HashMap.key(obj, keys);

            //insert into all rows and columns
            for (i = keys.x1; i <= keys.x2; i++) {
                for (j = keys.y1; j <= keys.y2; j++) {
                    cell = this.map[(i << 16) ^ j];
                    if (!cell) cell = this.map[(i << 16) ^ j] = [];
                    cell.push(obj);
                }
            }

            return entry;
        },




        /**@
         * #Crafty.map.boundaries
         * @comp Crafty.map
         * @sign public Object Crafty.map.boundaries()
         * @returns An object with the following structure, which represents an MBR which contains all entities
         *
         * ~~~
         * {
         *   min: {
         *     x: val_x,
         *     y: val_y
         *   },
         *   max: {
         *     x: val_x,
         *     y: val_y
         *   }
         * }
         * ~~~
         */
        boundaries: function () {
            var k, ent,
                hash = {
                    max: {
                        x: -Infinity,
                        y: -Infinity
                    },
                    min: {
                        x: Infinity,
                        y: Infinity
                    }
                },
                coords = {
                    max: {
                        x: -Infinity,
                        y: -Infinity
                    },
                    min: {
                        x: Infinity,
                        y: Infinity
                    }
                };

            //Using broad phase hash to speed up the computation of boundaries.
            for (var h in this.map) {
                if (!this.map[h].length) continue;

                //broad phase coordinate
                var i = h >> 16,
                    j = (h << 16) >> 16;
                if (j < 0) {
                    i = i ^ -1;
                }
                if (i >= hash.max.x) {
                    hash.max.x = i;
                    for (k in this.map[h]) {
                        ent = this.map[h][k];
                        //make sure that this is a Crafty entity
                        if (typeof ent == 'object' && 'requires' in ent) {
                            coords.max.x = Math.max(coords.max.x, ent.x + ent.w);
                        }
                    }
                }
                if (i <= hash.min.x) {
                    hash.min.x = i;
                    for (k in this.map[h]) {
                        ent = this.map[h][k];
                        if (typeof ent == 'object' && 'requires' in ent) {
                            coords.min.x = Math.min(coords.min.x, ent.x);
                        }
                    }
                }
                if (j >= hash.max.y) {
                    hash.max.y = j;
                    for (k in this.map[h]) {
                        ent = this.map[h][k];
                        if (typeof ent == 'object' && 'requires' in ent) {
                            coords.max.y = Math.max(coords.max.y, ent.y + ent.h);
                        }
                    }
                }
                if (j <= hash.min.y) {
                    hash.min.y = j;
                    for (k in this.map[h]) {
                        ent = this.map[h][k];
                        if (typeof ent == 'object' && 'requires' in ent) {
                            coords.min.y = Math.min(coords.min.y, ent.y);
                        }
                    }
                }
            }

            return coords;
        }
    };

    /**@
     * #Crafty.HashMap
     * @category 2D
     * Broad-phase collision detection engine. See background information at
     *
     * - [N Tutorial B - Broad-Phase Collision](http://www.metanetsoftware.com/technique/tutorialB.html)
     * - [Broad-Phase Collision Detection with CUDA](http://http.developer.nvidia.com/GPUGems3/gpugems3_ch32.html)
     * @see Crafty.map
     */

    /**@
     * #Crafty.HashMap.key
     * @comp Crafty.HashMap
     * @sign public Object Crafty.HashMap.key(Object obj)
     * @param obj - an Object that has .mbr() or _x, _y, _w and _h.
     *
     * Get the rectangular region (in terms of the grid, with grid size `cellsize`), where the object may fall in. This region is determined by the object's bounding box.
     * The `cellsize` is 64 by default.
     *
     * @see Crafty.HashMap.constructor
     */
    HashMap.key = function (obj, keys) {
        if (obj._mbr) {
            obj = obj._mbr;
        }
        if (!keys) {
            keys = {};
        }

        keys.x1 = Math.floor(obj._x / cellsize);
        keys.y1 = Math.floor(obj._y / cellsize);
        keys.x2 = Math.floor((obj._w + obj._x) / cellsize);
        keys.y2 = Math.floor((obj._h + obj._y) / cellsize);
        return keys;
    };

    HashMap.hash = function (keys) {
        return keys.x1 + SPACE + keys.y1 + SPACE + keys.x2 + SPACE + keys.y2;
    };

    function Entry(keys, obj, map) {
        this.keys = keys;
        this.map = map;
        this.obj = obj;
    }

    Entry.prototype = {
        update: function (rect) {
            //check if buckets change
            if (HashMap.hash(HashMap.key(rect, keyHolder)) != HashMap.hash(this.keys)) {
                this.map.refresh(this);
            }
        }
    };

    module.exports = HashMap;

},{"../core/core.js":7}]},{},[17]);
