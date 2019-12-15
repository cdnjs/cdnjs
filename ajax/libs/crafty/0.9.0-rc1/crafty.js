/**
 * craftyjs 0.8.0
 * http://craftyjs.com/
 *
 * Copyright 2017, Louis Stowasser
 * Licensed under the MIT license.
 */


(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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

function createDeprecatedAlias(baseObject, oldName, newName) {
    Object.defineProperty(baseObject, oldName, {
        enumerable: false,
        configurable: false,
        get: function() { return baseObject[newName]; },
        set: function(value) { baseObject[newName] = value; }
    });
}

module.exports = {
    defineAliases: function defineAliases(Crafty) {
        createDeprecatedAlias(Crafty, "image_whitelist", "imageWhitelist");
    }
};


},{}],3:[function(require,module,exports){
var Crafty = require('../core/core.js');


// ToggleInput contract
// Must provide an isDown method which returns whether the input is down or not
// May provide a destroy method which can be used for cleanup




// MouseButtonToggleInput
function MouseButtonToggleInput(button) {
    Crafty.mouseObjs++;
    this.button = button;
}

MouseButtonToggleInput.prototype = {
    isDown: function() {
        return Crafty.mouseButtonsDown[this.button];
    },
    destroy: function() {
        Crafty.mouseObjs--;
    }
};

// KeyboardToggleInput
function KeyboardToggleInput(key) {
    this.key = key;
}

KeyboardToggleInput.prototype = {
    isDown: function() {
        return Crafty.keydown[this.key];
    }
};


// ToggleInputGroup
function ToggleInputGroup(inputs) {
    this.inputs = inputs;
}

// Handles a group of inputs that represent the same toggle state
ToggleInputGroup.prototype = {
    timeDown: null,
    isActive: function () {
        for (var i in this.inputs) {
            var input = this.inputs[i];
            if (input.isDown()) {
                if (!this.timeDown) {
                    this.timeDown = Date.now();
                }
                return true;
            }
        }
        delete this.timeDown;
        return false;
    },
    destroy: function() {
        for (var i in this.inputs) {
            if (typeof this.inputs[i].destroy === 'function') {
                this.inputs[i].destroy();
            }
        }
    }
};

// Provides abstractions for specific types of inputs:
// - DirectionalInput: {x, y}
// - TriggerInputDown/TriggerInputUp

/**@
 * #Controls
 * @category Controls
 * @kind System
 * 
 * A built-in system for linking specific inputs to general types of input events.
 * 
 * @note The methods provided by this system are likely to change in future verisons of Crafty, as more input types are supported.
 * 
 * @trigger TriggerInputDown - When a trigger group is activated - {name}
 * @trigger TriggerInputUp - When a trigger group is released - {name, downFor}
 * @trigger DirectionalInput - When a directional input changes - {name, x, y}
 * 
 * 
 */
Crafty.s("Controls", {
    init: function () {
        // internal object to store definitions
        this._dpads = {};
        this._triggers = {};
    },

    events: {
        "EnterFrameInput": function () {
            this.runEvents();
        },
        "KeyDown": function () {
            this.updateTriggers();
        },
        "KeyUp": function () {
            this.updateTriggers();
        },
        "MouseDown": function (e) {
            this.updateTriggers();
        },
        "MouseUp": function (e) {
            this.updateTriggers();
        },
    },

    // Runs through all triggers and updates their status
    updateTriggers: function(e) {
        for (var t in this._triggers) {
            var trigger = this._triggers[t];
            this.updateTriggerInput(trigger);
        }
    },

    runEvents: function () { 
        // Trigger DirectionalInput events for dpads
        for (var d in this._dpads) {
            var dpad = this._dpads[d];
            dpad.oldX = dpad.x;
            dpad.oldY = dpad.y;
            this.updateDpadInput(dpad, dpad.multipleDirectionBehavior);
            this.updateActiveDirection(dpad, dpad.normalize);
            dpad.event.x = dpad.x;
            dpad.event.y = dpad.y;
            if (dpad.x !== dpad.oldX || dpad.y !== dpad.oldY) {
                Crafty.trigger("DirectionalInput", dpad.event);
            }
        }
    },

    getDpad: function (name) {
        return this._dpads[name];
    },

    isTriggerDown: function(name) {
        return this._triggers[name].active;
    },

    /**@
     * #.defineTriggerGroup
     * @comp Controls
     * @kind Method
     * 
     * @sign defineTriggerGroup(string name, obj definition)
     * @param name - a name for the trigger group
     * @param definition - an object which defines the inputs for the trigger
     * 
     * A trigger group is a set of togglable inputs mapped to the same event.  
     * If any of the inputs are down, the trigger is considered down.  If all are up, it is considered up.  
     * When the trigger state changes, a `TriggerInputUp` or `TriggerInputDown` event is fired.
     * 
     * The definition object lists the inputs that are mapped to the trigger:
     * - `keys`: An array of Crafty keycodes
     * - `mouseButtons`: An array of Crafty mouse button codes
     * 
     * @example
     * ~~~
     * // Define a trigger group mapped to the left mouse button and the A and B keys.
     * Crafty.s("Controls").defineTriggerGroup("MyTrigger", {
     *   mouseButtons: [Crafty.mouseButtons.LEFT],
     *   keys: [Crafty.keys.A, Crafty.keys.B]
     * });
     * ~~~
     * 
     * @see Crafty.mouseButtons
     * @see Crafty.keys
     * @see Controllable
     */
    defineTriggerGroup: function(name, definition) {
        var inputs;
        if (Array.isArray(definition)) {
            inputs = definition;
        } else {
            inputs = [];
            if (definition.mouseButtons) {
                for (var b in definition.mouseButtons){
                    inputs.push(new MouseButtonToggleInput(definition.mouseButtons[b]));
                }
            }
            if (definition.keys) {
                for (var k in definition.keys) {
                    inputs.push(new KeyboardToggleInput(definition.keys[k]));
                }
            }
        }
        if (this._triggers[name]) {
            this._triggers[name].input.destroy();
        }
        this._triggers[name] = {
            name: name,
            input: new ToggleInputGroup(inputs),
            downFor: 0,
            active: false
        };
    },

    /**@
     * #.defineDpad
     * @comp Controls
     * @kind Method
     * 
     * @sign defineDpad(string name, obj definition[, obj options])
     * @param name - a name for the dpad input
     * @param definition - an object which defines the inputs and directions for the dpad
     * @param options - a set of options for the dpad
     * 
     * A dpad is a type of directional control which maps a set of triggers to a set of directions.
     * 
     * The options object has two properties:
     * - `normalize` *(bool)*: If true, the directional input will be normalized to a unit vector.  Defaults to false.
     * - `multipleDirectionBehavior` *(string)*: How to behave when multiple directions are active at the same time.  Values are "first", "last", and "all".  Defaults to "all".
     * 
     * @example
     * ~~~
     * // Define a two-direction dpad, with two keys each bound to the right and left directions
     * Crafty.s("Controls").defineDpad("MyDpad", {
     *   {RIGHT_ARROW: 0, LEFT_ARROW: 180, D: 0, A: 180}
     * });
     * ~~~
     * 
     * @see Crafty.keys
     * @see Controllable
     * @see Multiway
     */
    defineDpad: function (name, definition, options) {
        var directionDict = {};
        for (var k in definition) {
            var direction = definition[k];
            var keyCode = Crafty.keys[k] || k;

            // create a mapping of directions to all associated keycodes
            if (!directionDict[direction]) {
                directionDict[direction] = [];
            }
            directionDict[direction].push(new KeyboardToggleInput(keyCode));
        }

        // Create a useful definition from the input format that tracks state
        var parsedDefinition = {};
        for (var d in directionDict) {
            parsedDefinition[d] = {
                input: new ToggleInputGroup(directionDict[d]),
                active: false,
                n: this.parseDirection(d)
            };
        }
        if (typeof options === 'undefined') {
            options = {};
        }
        if (typeof options.normalize === 'undefined') {
            options.normalize = false;
        }
        if (typeof options.multipleDirectionBehavior === 'undefined') {
            options.multipleDirectionBehavior = "all";
        }
        // Create the fully realized dpad object
          // Store the name/definition pair
        if (this._dpads[name]) {
            for (d in this._dpads[name].parsedDefinition) {
                this._dpads[name].parsedDefinition[d].input.destroy();
            }
            delete this._dpads[name];
        }
        this._dpads[name] = {
            name: name,
            directions: parsedDefinition,
            x: 0,
            y: 0,
            oldX: 0,
            oldY: 0,
            event: { x: 0, y: 0, name: name },
            normalize: options.normalize,
            multipleDirectionBehavior: options.multipleDirectionBehavior
        };
    },

    // Takes an amount in degrees and converts it to an x/y object.
    // Clamps to avoid rounding issues with sin/cos
    parseDirection: function (direction) {
        return {
            x: Math.round(Math.cos(direction * (Math.PI / 180)) * 1000) / 1000,
            y: Math.round(Math.sin(direction * (Math.PI / 180)) * 1000) / 1000
        };
    },

    // dpad definition is a map of directions to keys array and active flag
    updateActiveDirection: function (dpad, normalize) {
        dpad.x = 0;
        dpad.y = 0;
        for (var d in dpad.directions) {
            var dir = dpad.directions[d];
            if (!dir.active) continue;
            dpad.x += dir.n.x;
            dpad.y += dir.n.y;
        }

        // Normalize
        if (normalize) {
            var m = Math.sqrt(dpad.x * dpad.x + dpad.y * dpad.y);
            if (m > 0) {
                dpad.x = dpad.x / m;
                dpad.y = dpad.y / m;
            }
        }
    },

    updateTriggerInput: function (trigger) {
        if (!trigger.active) {
            if (trigger.input.isActive()) {
                trigger.downFor = Date.now() - trigger.input.timeDown;
                trigger.active = true;
                Crafty.trigger("TriggerInputDown", trigger);
            }
        } else {
            if (!trigger.input.isActive()) {
                trigger.active = false;
                Crafty.trigger("TriggerInputUp", trigger);
                trigger.downFor = 0;
            }
        }
    },

    // Has to handle three cases concerning multiple active input groups:
    // - "all": all directions are active
    // - "last": one direction at a time, new directions replace old ones
    // - "first": one direction at a time, new directions are ignored while old ones are still active 
    updateDpadInput: function (dpad, multiBehavior) {
        var d, dir;
        var winner;

        for (d in dpad.directions) {
            dir = dpad.directions[d];
            dir.active = false;

            if (dir.input.isActive()) {
                if (multiBehavior === "all") {
                    dir.active = true;
                } else {
                    if (!winner) {
                        winner = dir;
                    } else {
                        if (multiBehavior === "first") {
                            if (winner.input.timeDown > dir.input.timeDown) {
                                winner = dir;
                            }
                        }
                        if (multiBehavior === "last") {
                            if (winner.input.timeDown < dir.input.timeDown) {
                                winner = dir;
                            }
                        }
                    }
                }
            }
        }
        // If we picked a winner, set it active
        if (winner) winner.active = true;
    }
});
},{"../core/core.js":9}],4:[function(require,module,exports){
var Crafty = require('../core/core.js');

/**@
 * #Draggable
 * @category Controls
 * @kind Component
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
        } else if (+dir === dir) { //dir is a number
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

    //Note: the code is not tested with zoom, etc., that may distort the direction between the viewport and the coordinate on the canvas.
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
 * #Controllable
 * @category Controls
 * @kind Component
 *
 * Used to bind methods to generalized input events.
 *
 * Currently supports the events "DirectionalInput", "TriggerInputDown", and "TriggerInputUp".
 *
 */
Crafty.c("Controllable", {
    init: function () {
        this._inputBindings = {
            "DirectionalInput": {},
            "TriggerInputDown": {},
            "TriggerInputUp": {}
        };
    },
    
    events: {
        // We don't want to use dot notation here for the property names
        /* jshint -W069 */
        "DirectionalInput": function (e) {
            if (this._inputBindings["DirectionalInput"][e.name]) {
                this._inputBindings["DirectionalInput"][e.name].call(this, e);
            }
        },

        "TriggerInputDown": function (e) {
            if (this._inputBindings["TriggerInputDown"][e.name]) {
                this._inputBindings["TriggerInputDown"][e.name].call(this, e);
            }
        },

         "TriggerInputUp": function (e) {
            if (this._inputBindings["TriggerInputUp"][e.name]) {
                this._inputBindings["TriggerInputUp"][e.name].call(this, e);
            }
        }
        /* jshint +W069 */
    },

    /**@
     * #.linkInput
     * @comp Controllable
     * @kind Method
     * 
     * @sign public this linkInput(string event, string name, function fn)
     * @param event - the name of the input event
     * @param name - the name of the input
     * @param fn - the function that will be called with the event object
     * 
     * Binds the function to the particular named event trigger.
     * 
     * Currently supports three types of input events.  Each event will have a `name` property.
     * - `DirectionalInput`: The event will have `x` and `y` properties representing the directional input vector, often normalized to a unit vector.  Triggered when the input changes.
     * - `TriggerInputDown`: Occurs when the input is triggered.
     * - `TriggerInputDown`: Occurs when the trigger is released.  The event will have a `downFor` property, indicating how long it had been active.
     * 
     * @example
     * ~~~~
     * // Create a trigger bound to the `b` key
     * Crafty.s("Controls").defineTriggerInput("BlushTrigger", {keys:['b']});
     * // Create a blue square that turns pink when the trigger is pressed
     * Crafty.e("2D, Canvas, Color, Controllable")
     *   .attr({x:10, y:10, h:10, w:10}).color("blue")
     *   .linkInput("TriggerInputDown", "BlushTrigger", function(){this.color('pink');});
     * ~~~
     * 
     * @see .unlinkInput  
     */
    linkInput: function(event, name, fn) {
        this._inputBindings[event][name] = fn;
    },

    /**@
     * #.unlinkInput
     * @comp Controllable
     * @kind Method
     * 
     * @sign public this linkInput(string event, string name)
     * @param event - the name of the input event
     * @param name - the name of the input
     * 
     * Removes a binding setup by linkInput
     * 
     * @see .linkInput
     */
    unlinkInput: function(event, name) {
        delete this._inputBindings[event][name];
    },


    disableControls: false,

    /**@
     * #.enableControl
     * @comp Controllable
     * @kind Method
     * 
     * @sign public this .enableControl()
     *
     * Enable the component to listen to input events.
     *
     * @example
     * ~~~
     * this.enableControl();
     * ~~~
     */
    enableControl: function () {
        this.disableControls = false;
        return this;
    },

    /**@
     * #.disableControl
     * @comp Controllable
     * @kind Method
     * 
     * @sign public this .disableControl()
     *
     * Disable the component from responding to input events.
     *
     * @example
     * ~~~
     * this.disableControl();
     * ~~~
     */
    disableControl: function () {
        this.disableControls = true;
        return this;
    }
});


/**@
 * #Multiway
 * @category Controls
 * @kind Component
 *
 * Used to bind keys to directions and have the entity move accordingly.
 *
 * Multiway acts by listening to directional events, and then setting the velocity each frame based on the current direction and the current speed.
 * 
 * If a speed is not defined for a particular axis (x or y), then the velocity along that axis will not be set.
 *   
 * This behavior works in most cases, but can cause undesired behavior if you manipulate velocities by yourself while this component is in effect.
 * If you need to resolve collisions, it's advised to correct the position directly rather than to manipulate the velocity.
 * If you still need to reset the velocity once a collision happens, make sure to re-add the previous velocity once the collision is resolved.
 *
 * Additionally, this component provides the entity with `Motion` methods & events.
 *
 * @see Motion
 */
Crafty.c("Multiway", {
    _speed: null,
    
    init: function () {
        this.requires("Motion, Controllable");
        this._dpadName = "MultiwayDpad" + this[0];
        this._speed = { x: 150, y: 150 };
        this._direction = {x:0, y:0};
    },

    remove: function() {
        if (!this.disableControls) this.vx = this.vy = 0;
    },

    events: {
        "EnterFrame": function() {
            if (!this.disableControls) {
                if (typeof this._speed.x !== 'undefined' && this._speed.x !== null){
                    this.vx = this._speed.x * this._direction.x;
                }
                if (typeof this._speed.y !== 'undefined' && this._speed.y !== null) {
                    this.vy = this._speed.y * this._direction.y;
                }
            }
        }
    },
   
   // Rather than update the velocity directly in response to changing input, track the input direction separately
   // That makes it easier to enable/disable control
    _updateDirection: function(e) {
        this._direction.x = e.x;
        this._direction.y = e.y;
    },

    /**@
     * #.multiway
     * @comp Multiway
     * @kind Method
     * 
     * @sign public this .multiway([Number speed,] Object keyBindings[, Object options])
     * @param speed - A speed in pixels per second
     * @param keyBindings - What keys should make the entity go in which direction. Direction is specified in degrees
     * @param options - An object with options for `normalize` and `multipleDirectionBehavior`.
     *
     * Constructor to initialize the speed and keyBindings.
     * Component will listen to key events and move the entity appropriately.
     * Can be called while a key is pressed to change direction & speed on the fly.
     *
     * The options parameter controls the behavior of the component, and has the following defaults:
     * 
     *  - `"normalize": false`.  When set to true, the directional input always has a magnitude of 1
     *  - `"multipleDirectionBehavior": "all"` How to resolve multiple active directions.  
     *     Set to "first" or "last" to allow only one active direction at a time.
     *
     *  @example
     * ~~~
     * this.multiway(150, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
     * this.multiway({x:150,y:75}, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
     * this.multiway({W: -90, S: 90, D: 0, A: 180});
     * ~~~
     *
     * @see Crafty.keys
     */         
    multiway: function (speed, keys, options) {
        var inputSystem = Crafty.s("Controls");

        if (keys) {
            this.speed(speed);
        } else {
            keys = speed;
        }
        inputSystem.defineDpad(this._dpadName, keys, options);
        this.linkInput("DirectionalInput", this._dpadName, this._updateDirection);

        return this;
    },

    /**@
     * #.speed
     * @comp Multiway
     * @kind Method
     * 
     * @sign public this .speed(Object speed)
     * @param speed - New speed the entity has, for x and y axis.
     *
     * Change the speed that the entity moves with, in units of pixels per second.
     * Can be called while a key is pressed to change speed on the fly.
     * 
     * If the passed object has only an x or y property, only the velocity along that axis will be controlled.
     *
     * @example
     * ~~~
     * this.speed({ x: 150, y: 50 });
     * ~~~
     */
    speed: function (speed) {
        if (typeof speed === 'object') {
            this._speed.x = speed.x;
            this._speed.y = speed.y;
        } else {
            this._speed.x = speed;
            this._speed.y = speed;
        }
        return this;
    },

    
});


/**@
 * #Jumper
 * @category Controls
 * @kind Component
 * @trigger CheckJumping - When entity is about to jump. This event is triggered with the object the entity is about to jump from (if it exists). Third parties can respond to this event and enable the entity to jump.
 *
 * Make the entity jump in response to key events.
 * Simulates jumping and falling when used with the `Gravity` component.
 *
 * Additionally, this component provides the entity with `Supportable`, `Motion` and `Keyboard` methods & events.
 *
 * @see Supportable, Motion, Keyboard, Gravity
 */
Crafty.c("Jumper", {
    _jumpSpeed: 300,

    /**@
     * #.canJump
     * @comp Jumper
     * @kind Method
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

    init: function () {
        this.requires("Supportable, Motion, Controllable");
    },

    

    remove: function() {
        this.unlinkInput("TriggerInputDown", this._jumpTriggerName);
    },

    _keydown_jumper: function (e) {
        if (this.disableControls) return;
        this.jump();        
    },

    /**@
     * #.jump
     * @comp Jumper
     * @kind Method
     * 
     * @sign public this .jump()
     *
     * Directly trigger the entity to jump.
     *
     */
    jump: function() {
        var ground = this.ground;
        this.canJump = !!ground;
        this.trigger("CheckJumping", ground);
        if (this.canJump) {
            this.vy = -this._jumpSpeed;
        }
        return this;
    },

    /**@
     * #.jumper
     * @comp Jumper
     * @kind Method
     * 
     * @sign public this .jumper([Number jumpSpeed,] Array jumpKeys)
     * @param jumpSpeed - Vertical jump speed in pixels per second
     * @param jumpKeys - Keys to listen for and make entity jump in response
     * 
     * @sign public this .jumper([Number jumpSpeed,] Object jumpInputs)
     * @param jumpSpeed - Vertical jump speed in pixels per second
     * @param jumpInputs - An object with two properties, `keys` and `mouseButtons`.
     *
     * Constructor to initialize the power of jump and keys to listen to.
     * Component will listen for key events and make the entity jump appropriately.
     * 
     * If second argument is an object, the properties `keys` and `mouseButtons` will be used as triggers.
     *
     * @example
     * ~~~
     * this.jumper(300, ['UP_ARROW', 'W']);
     * this.jumper(['UP_ARROW', 'W']);
     * ~~~
     *
     * @see Crafty.keys
     */
    jumper: function (jumpSpeed, jumpKeys) {
        if (jumpKeys) {
            this._jumpSpeed = jumpSpeed;
        } else {
            jumpKeys = jumpSpeed;
        }
        this._jumpTriggerName = "JumpTrigger" + this[0];
        if (Array.isArray(jumpKeys)) {
            var keys = [];
            for (var i = 0; i < jumpKeys.length; ++i) {
                var key = jumpKeys[i];
                var keyCode = Crafty.keys[key] || key;
                keys.push(keyCode);
            }
            Crafty.s("Controls")
                .defineTriggerGroup(this._jumpTriggerName, {keys:keys});
        } else {
            Crafty.s("Controls")
                .defineTriggerGroup(this._jumpTriggerName, jumpKeys);
        }
        
        this.linkInput("TriggerInputDown", this._jumpTriggerName, this._keydown_jumper);

        return this;
    },

    /**@
     * #.jumpSpeed
     * @comp Jumper
     * @kind Method
     * 
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
 * @kind Component
 *
 * Move an entity in four directions by using the
 * `Up Arrow`, `Left Arrow`, `Down Arrow`, `Right Arrow` keys or `W`, `A`, `S`, `D`.
 *
 * This component is a thin wrapper around the `Multiway` component and sets the appropriate key bindings.
 * It is a well suited for games with a top-down (birds-eye) perspective.
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
     * @kind Method
     * 
     * @sign public this .fourway([Number speed])
     * @param speed - The speed of motion in pixels per second.
     *
     * Constructor to initialize the speed.
     * Component will listen for key events and move the entity
     * in the respective direction by the speed passed in the argument.
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
 * @kind Component
 *
 * Move an entity left or right using the `Left Arrow`, `Right Arrow` keys or `D` and `A`
 * and make it jump using `Up Arrow` or `W`.
 * Simulates jumping and falling when used with the `Gravity` component.
 *
 * This component is a thin wrapper around the `Multiway` and `Jumper` components and sets the appropriate key bindings.
 * It is a well suited for side-scrolling platformer type games.
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
     * @kind Method
     * 
     * @sign public this .twoway([Number speed[, Number jumpSpeed]])
     * @param speed - A speed in pixels per second
     * @param jumpSpeed - Vertical jump speed in pixels per second
     *
     * Constructor to initialize the speed and power of jump.
     * Component will listen for key events and move the entity
     * in the respective direction by the speed passed in the argument.
     * Pressing the jump key will cause the entity to jump with the supplied power.
     */
    twoway: function (speed, jumpSpeed) {
        // Set multiway with horizontal speed only
        var hSpeed = speed || this._speed;
        this.multiway({x: hSpeed}, {
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

},{"../core/core.js":9}],5:[function(require,module,exports){
var Crafty = require('../core/core.js');


Crafty.extend({
    /**@
     * #Crafty.device
     * @category Misc
     * @kind Property
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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

},{"../core/core.js":9}],6:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

Crafty.extend({
    over: null, //object mouseover, waiting for out
    mouseObjs: 0,
    mousePos: {},   
    touchObjs: 0,

    /**@
     * #Crafty.lastEvent
     * @category Input
     * @kind Property
     * Check which mouse event occured most recently (useful for determining mouse position in every frame).
     *
     * The native [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) is augmented with additional properties.
     * @example
     * ~~~
     * // (x,y) coordinates of newest mouse event in web-browser (screen) space
     * Crafty.lastEvent.clientX
     * Crafty.lastEvent.clientY
     *
     * //(x,y) coordinates of newest mouse event in world (default viewport) space
     * Crafty.lastEvent.realX
     * Crafty.lastEvent.realY
     *
     * // Normalized mouse button according to Crafty.mouseButtons:
     * // Crafty.mouseButtons.LEFT, Crafty.mouseButtons.RIGHT or Crafty.mouseButtons.MIDDLE
     * Crafty.lastEvent.mouseButton
     * ~~~
     * @see Mouse, Crafty.mouseButtons, Crafty.mouseDispatch
     */

    lastEvent: null,
    /**@
     * #Crafty.keydown
     * @category Input
     * @kind Property
     * Check which keys (referred by `Crafty.keys` key codes) are currently down.
     *
     * @example
     * ~~~
     * // is "Shift" currently pressed?
     * var shiftDown = !!Crafty.keydown[Crafty.keys.SHIFT];
     * ~~~
     * @see Keyboard, Crafty.keys, Crafty.keyboardDispatch
     */
    keydown: {},

    /**@
     * #Crafty.selected
     * @category Input
     * @kind Property
     * @trigger CraftyFocus - is triggered when Crafty's stage gets selected
     * @trigger CraftyBlur - is triggered when Crafty's stage is no longer selected
     *
     * Check whether Crafty's stage (`Crafty.stage.elem`) is currently selected.
     *
     * After a click occurs inside Crafty's stage, this property is set to `true`.
     * After a click occurs outside Crafty's stage, this property is set to `false`.
     *
     * @see Crafty.stage#Crafty.stage.elem
     */
    selected: false,

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
     * @kind Method
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
     * @see Touch
     */
    multitouch: function (bool) {
        if (typeof bool !== "boolean") return this._touchHandler.multitouch;
        this._touchHandler.multitouch = bool;
    },

    resetKeyDown: function () {
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
     * @private
     * @kind Method
     *
     * Internal method which dispatches mouse events received by Crafty.
     *
     * This method processes a native [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) received by `Crafty.stage.elem`,
     * augments it with additional properties and
     * dispatches it to the closest (visible & `Mouse`-enhanced) entity to the source of the event (if available).
     *
     * This method also updates `Crafty.lastEvent`.
     *
     * @see Crafty.mouseButtons, Crafty.lastEvent, Mouse
     */
    mouseButtonsDown: {    },
    mouseDispatch: function (e) {
        if (!Crafty.mouseObjs) return;
        Crafty.lastEvent = e;

        var tar = e.target ? e.target : e.srcElement,
            closest,
            pos = Crafty.domHelper.translate(e.clientX, e.clientY),
            type = e.type;

        //Normalize button according to http://unixpapa.com/js/mouse.html
        if (typeof e.which === 'undefined') {
            e.mouseButton = (e.button < 2) ? Crafty.mouseButtons.LEFT : ((e.button === 4) ? Crafty.mouseButtons.MIDDLE : Crafty.mouseButtons.RIGHT);
        } else {
            e.mouseButton = (e.which < 2) ? Crafty.mouseButtons.LEFT : ((e.which === 2) ? Crafty.mouseButtons.MIDDLE : Crafty.mouseButtons.RIGHT);
        }

        // Set the mouse position based on standard viewport coordinates
        Crafty.mousePos.x = pos.x;
        Crafty.mousePos.y = pos.y;

        // Track button state
        if (type === "mousedown") {
            this.mouseButtonsDown[e.mouseButton] = true;
        }
        if (type === "mouseup") {
            delete this.mouseButtonsDown[e.mouseButton];
        }

        closest = Crafty.findPointerEventTargetByComponent("Mouse", e, tar);
        //found closest object to mouse
        if (closest) {
            //click must mousedown and out on tile
            if (type === "mousedown") {
                closest.trigger("MouseDown", e);
            } else if (type === "mouseup") {
                closest.trigger("MouseUp", e);
            } else if (type === "dblclick") {
                closest.trigger("DoubleClick", e);
            } else if (type === "click") {
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
            } else if (type === "mouseup") {
                Crafty.viewport.mouselook('stop');
            }

            // If nothing in particular was clicked, the controls system should get fed the event
            if (type === "mousedown") {
                Crafty.s("Controls").trigger("MouseDown", e);
            } else if (type === "mouseup") {
                Crafty.s("Controls").trigger("MouseUp", e);
            } else if (type === "dblclick") {
                Crafty.s("Controls").trigger("DoubleClick", e);
            } else if (type === "click") {
                Crafty.s("Controls").trigger("Click", e);
            }
        }

        if (type === "mousemove") {
            this.lastEvent = e;
        }

    },


    /**@
     * #Crafty.touchDispatch
     * @category Input
     * @kind Method
     * @private
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
     * @see Touch
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
                    tar = e.target ? e.target : e.srcElement,
                    closest;
                closest = this.findClosestTouchEntity(touches[i], tar);

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
                    tar = e.target ? e.target : e.srcElement;
                var closest = this.findClosestTouchEntity(touches[i], tar);

                if (idx >= 0) {
                    var finger = this.fingers[idx];
                    if(typeof finger.entity !== "undefined")
                        if (finger.entity === closest) {
                            finger.entity.trigger("TouchMove", touches[i]);
                        } else {
                            if (typeof closest === "object") closest.trigger("TouchStart", touches[i]);
                            finger.entity.trigger("TouchEnd");
                        }
                    finger.entity = closest;
                    finger.realX = touches[i].realX;
                    finger.realY = touches[i].realY;
                }
            }
        },

        handleEnd: function (e) {
            var touches = e.changedTouches, 
                eventName = e.type === "touchcancel" ? "TouchCancel" : "TouchEnd";
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

        findClosestTouchEntity: function (touchEvent, tar) {
            return Crafty.findPointerEventTargetByComponent("Touch", touchEvent, tar);
        },

        fingerDownIndexById: function (idToFind) {
            for (var i = 0, l = this.fingers.length; i < l; i++) {
                var id = this.fingers[i].identifier;
                if (id === idToFind) {
                    return i;
                }
            }
            return -1;
        },

        fingerDownIndexByEntity: function (entityToFind) {
            for (var i = 0, l = this.fingers.length; i < l; i++) {
                var ent = this.fingers[i].entity;

                if (ent === entityToFind) {
                    return i;
                }
            }
            return -1;
        },

        mimicMouse: function (e) {
            var type, first,
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
            if (lastEvent !== null && lastEvent.type === 'mousedown' && type === 'mouseup') {
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
     * #Crafty.findPointerEventTargetByComponent
     * @category Input
     * @kind Method
     * @private
     * 
     * @sign public this .findPointerEventTargetByComponent(String comp, Event e[, Object target])
     * Finds closest entity with certain component at a given event.
     * @param comp - Component name
     * @param e - The pointer event, which will be modifed to add `realX` and `realY` properties 
     * @param target - Target element wherein to look for entities 
     * 
     * This method is used internally by the .mouseDispatch and .touchDispatch methods, but can be used otherwise for 
     * Canvas entities.
     * 
     * Finds the top most entity (with the highest z) with a given component at a given point (x, y) associated with the event.
     * For having a detection area specified for the enity, add the AreaMap component to the entity expected to be found.
     * 
     * The 'target' argument is only meant to be used by .mouseDispatch and touchDispatch; defaults to Crafty.stage.elem, 
     * thus using this function directly is only worth anything for canvas entities.
     * 
     * Returns the found entity, or undefined if no entity was found.  
     * Updates the event object to have two additional properties, `realX` and `realY`, which correspond to the point in the Crafty layer that the event targeted.
     * 
     */
    findPointerEventTargetByComponent: function (comp, e, target) {
        var tar = target ? target : Crafty.stage.elem,
            closest, current, q, l, i, pos, layerPos, maxz = -Infinity;
        var x = e.clientX;
        var y = e.clientY;

        //if it's a DOM element with component we are done
        if (tar.nodeName !== "CANVAS") {
            while (typeof (tar.id) !== 'string' && tar.id.indexOf('ent') === -1) {
                tar = tar.parentNode;
            }
            var ent = Crafty(parseInt(tar.id.replace('ent', ''), 10));
            pos = Crafty.domHelper.translate(x, y, ent._drawLayer);
            if (ent.__c[comp] && ent.isAt(pos.x, pos.y)) {
                closest = ent;
                layerPos = pos;
            }
        }

        //else we search for an entity with component
        if (!closest) {

            // Loop through each layer
            for (var layerIndex in Crafty._drawLayers) {
                var layer = Crafty._drawLayers[layerIndex];

                // Skip a layer if it has no entities listening for pointer events
                if (layer._pointerEntities <= 0) continue;

                // Get the position in this layer
                pos = Crafty.domHelper.translate(x, y, layer);
                q = Crafty.map.search({
                    _x: pos.x,
                    _y: pos.y,
                    _w: 1,
                    _h: 1
                }, false);

                for (i = 0, l = q.length; i < l; ++i) {
                    current = q[i];
                    if (current._visible && current._drawLayer === layer && current._globalZ > maxz &&
                        current.__c[comp] && current.isAt(pos.x, pos.y)) {
                        maxz = current._globalZ;
                        closest = current;
                        layerPos = pos;
                    }
                }
            }
        }
        
        // If the pointer event isn't related to a specific layer, 
        // find the Crafty position in the default coordinate set
        if (!layerPos) {
            layerPos = Crafty.domHelper.translate(x, y);
        }

        // Update the event coordinates and return the event target
        e.realX = layerPos.x;
        e.realY = layerPos.y;
            
        return closest;
    },

    /**@
     * #Crafty.mouseWheelDispatch
     * @category Input
     * @kind Method
     * @private
     *
     * Internal method which dispatches mouse wheel events received by Crafty.
     * @trigger MouseWheelScroll - is triggered when mouse is scrolled on stage - { direction: +1 | -1} - Scroll direction (up | down)
     *
     * This method processes a native [`mousewheel` event](https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel) (all browsers except Firefox)
     * or a native [`DOMMouseScroll` event](https://developer.mozilla.org/en-US/docs/Web/Events/DOMMouseScroll) (Firefox only) received by `Crafty.stage.elem`,
     * augments it with the additional `.direction` property (see below) and dispatches it to the global Crafty object and thus to every entity.
     *
     * Note that the wheel delta properties of the event vary in magnitude across browsers, thus it is recommended to check for `.direction` instead.
     * The `.direction` equals `+1` if wheel was scrolled up, `-1` if wheel was scrolled down
     * (see [details](http://stackoverflow.com/questions/5527601/normalizing-mousewheel-speed-across-browsers)).
     *
     * @example
     * Zoom the viewport (camera) in response to mouse scroll events.
     * ~~~
     * Crafty.bind("MouseWheelScroll", function(evt) {
     *     Crafty.viewport.scale(Crafty.viewport._scale * (1 + evt.direction * 0.1));
     * });
     * ~~~
     *
     * @example
     * Interactive, map-like zooming of the viewport (camera) in response to mouse scroll events.
     * ~~~
     * // sign public void zoomTowards(Number amt, Number posX, Number posY, Number time[, String|function easingFn])
     * // param Number amt - amount to zoom in on the target by (eg. `2`, `4`, `0.5`)
     * // param Number posX - the x coordinate to zoom towards
     * // param Number posY - the y coordinate to zoom towards
     * // param Number time - the duration in ms of the entire zoom operation
     * // param easingFn - A string or custom function specifying an easing.
     * //                   (Defaults to linear behavior.)
     * //                   See `Crafty.easing` for more information.
     * //
     * // Zooms the camera towards a given point, preserving the current center.
     * // `amt > 1` will bring the camera closer to the subject,
     * // `amt < 1` will bring it farther away,
     * // `amt = 0` will reset to the default zoom level.
     * // Zooming is multiplicative. To reset the zoom amount, pass `0`.
     * //
     * // <example>
     * // // Make the entities appear twice as large by zooming in towards (100,100) over the duration of 3 seconds using linear easing behavior
     * // zoomTowards(2, 100, 100, 3000);
     * // </example>
     * //
     * function zoomTowards (amt, posX, posY, time, easingFn) {
     *     var scale = Crafty.viewport._scale,
     *         // current viewport center
     *         centX = -Crafty.viewport._x + Crafty.viewport._width / 2 / scale,
     *         centY = -Crafty.viewport._y + Crafty.viewport._height / 2 / scale,
     *         // direction vector from viewport center to position
     *         deltaX = posX - centX,
     *         deltaY = posY - centY;
     *     var f = amt - 1;
     *
     *     Crafty.viewport.zoom(amt, centX + deltaX * f, centY + deltaY * f, time, easingFn);
     * }
     *
     * // don't restrict panning of viewport in any way
     * Crafty.viewport.clampToEntities = false;
     *
     * // enable panning of viewport by dragging the mouse
     * Crafty.viewport.mouselook(true);
     *
     * // enable interactive map-like zooming by scrolling the mouse
     * Crafty.bind("MouseWheelScroll", function (evt) {
     *     var pos = Crafty.domHelper.translate(evt.clientX, evt.clientY);
     *     zoomTowards(1 + evt.direction/10, pos.x, pos.y, 5);
     * });
     * ~~~
     */
    mouseWheelDispatch: function (e) {
        e.direction = (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;
        Crafty.trigger("MouseWheelScroll", e);
    },

    /**@
     * #Crafty.keyboardDispatch
     * @category Input
     * @kind Method
     * @private
     *
     * Internal method which dispatches keyboard events received by Crafty.
     * @trigger KeyDown - is triggered for each entity when the DOM 'keydown' event is triggered. - { key: `Crafty.keys` keyCode (Number), originalEvent: original KeyboardEvent } - Crafty's KeyboardEvent
     * @trigger KeyUp - is triggered for each entity when the DOM 'keyup' event is triggered. - { key: `Crafty.keys` keyCode (Number), originalEvent: original KeyboardEvent } - Crafty's KeyboardEvent
     *
     * This method processes a native [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) received by `window.document`,
     * wraps it in a custom event object (for cross-browser compatibility) and dispatches it to the global Crafty object and thus to every entity.
     *
     * This method also updates `Crafty.keydown`.
     *
     * @example
     * ~~~
     * Crafty.bind('KeyDown', function(e) {
     *     if (e.key === Crafty.keys.LEFT_ARROW) {
     *       Crafty.viewport.x++;
     *     } else if (e.key === Crafty.keys.RIGHT_ARROW) {
     *       Crafty.viewport.x--;
     *     } else if (e.key === Crafty.keys.UP_ARROW) {
     *       Crafty.viewport.y++;
     *     } else if (e.key === Crafty.keys.DOWN_ARROW) {
     *       Crafty.viewport.y--;
     *     }
     *   });
     * ~~~
     *
     * @see Crafty.keys, Crafty.keydown, Keyboard
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
        if (Crafty.selected && !(e.key === 8 || e.key >= 112 && e.key <= 135)) {
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
 * @kind Component
 *
 * Provides the entity with mouse related events.
 *
 * If you do not add this component, mouse events will not be triggered on the entity.
 *
 * @trigger MouseOver - when the mouse enters - MouseEvent
 * @trigger MouseOut - when the mouse leaves - MouseEvent
 * @trigger MouseDown - when the mouse button is pressed on - MouseEvent
 * @trigger MouseUp - when the mouse button is released on - MouseEvent
 * @trigger Click - when the user clicks - MouseEvent
 * @trigger DoubleClick - when the user double clicks - MouseEvent
 * @trigger MouseMove - when the mouse is over and moves - MouseEvent
 *
 * The event callbacks are triggered with a native [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) parameter,
 * which is further augmented with additional properties:
 * ~~~
 * //(x,y) coordinates of mouse event in web-browser (screen) space
 * e.clientX
 * e.clientY
 *
 * //(x,y) coordinates of mouse event in world (default viewport) space
 * e.realX
 * e.realY
 *
 * // Normalized mouse button according to Crafty.mouseButtons:
 * // Crafty.mouseButtons.LEFT, Crafty.mouseButtons.RIGHT or Crafty.mouseButtons.MIDDLE
 * e.mouseButton
 * ~~~
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
 * @see Crafty.mouseButtons
 * @see Crafty.mouseDispatch
 * @see Crafty.multitouch
 * @see Crafty.touchDispatch
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
 * @kind Component
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
 * @kind Component
 * 
 * Component used by Mouse and Touch.
 * Can be added to other entities for use with the Crafty.findClosestEntityByComponent method.
 * 
 * @see Button
 * @see Crafty.polygon
 */
Crafty.c("AreaMap", {
    init: function () {
        if (this.has("Renderable") && this._drawLayer) {
            this._drawLayer._pointerEntities++;
        }
    },

    remove: function () {
        if (this.has("Renderable") && this._drawLayer) {
            this._drawLayer._pointerEntities--;
        }
    },

    events: {
        "LayerAttached": function (layer) {
            layer._pointerEntities++;
        },
        "LayerDetached": function (layer) {
            layer._pointerEntities--;
        }
    },

    /**@
     * #.areaMap
     * @comp AreaMap
     * @kind Method
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
 * @kind Component
 * 
 * Provides the entity with touch or mouse functionality, depending on whether this is a pc 
 * or mobile device, and also on multitouch configuration.
 *
 * @see Mouse
 * @see Touch
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
 * @kind Component
 * 
 * Provides the entity with drag and drop mouse events.
 * @trigger Dragging - is triggered each frame the entity is being dragged - MouseEvent
 * @trigger StartDrag - is triggered when dragging begins - MouseEvent
 * @trigger StopDrag - is triggered when dragging ends - MouseEvent
 *
 * @see Mouse
 */
Crafty.c("MouseDrag", {
    _dragging: false,

    init: function () {
        this.requires("Mouse");
        this.bind("MouseDown", this._ondown);
    },

    remove: function () {
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
 * @kind Component
 *
 * Provides entity with keyboard events.
 * @trigger KeyDown - is triggered for each entity when the DOM 'keydown' event is triggered. - { key: `Crafty.keys` keyCode (Number), originalEvent: original KeyboardEvent } - Crafty's KeyboardEvent
 * @trigger KeyUp - is triggered for each entity when the DOM 'keyup' event is triggered. - { key: `Crafty.keys` keyCode (Number), originalEvent: original KeyboardEvent } - Crafty's KeyboardEvent
 *
 * In addition to binding to these events, the current state (pressed/released) of a key can also be queried using the `.isDown` method.
 *
 * @example
 * ~~~
 * Crafty.e("2D, DOM, Color, Keyboard")
 *   .attr({x: 100, y: 100, w: 50, h: 50})
 *   .color("red")
 *   .bind('KeyDown', function(e) {
 *     if (e.key == Crafty.keys.LEFT_ARROW) {
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
 * @see Crafty.keydown
 * @see Crafty.keyboardDispatch
 */
Crafty.c("Keyboard", {
    /**@
     * #.isDown
     * @comp Keyboard
     * @kind Method
     * 
     * @sign public Boolean isDown(String keyName)
     * @param keyName - Name of the key to check. See `Crafty.keys`.
     * @sign public Boolean isDown(Number keyCode)
     * @param keyCode - Key code in `Crafty.keys`.
     *
     * Determine if a certain key is currently down.
     *
     * @example
     * ~~~
     * ent.requires('Keyboard')
     *    .bind('EnterFrame', function() {
     *       if (this.isDown('SPACE'))
     *          this.y--;
     *    });
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
},{"../core/core.js":9}],7:[function(require,module,exports){
var Crafty = require('../core/core.js');


Crafty.extend({
    /**@
     * #Crafty.keys
     * @category Input
     * @kind Property
     * 
     * Object of key names and the corresponding Unicode key code.
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
     * @kind Property
     * 
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
},{"../core/core.js":9}],8:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Crafty.easing
 * @category Animation
 * @kind Class
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
},{"../core/core.js":9}],9:[function(require,module,exports){
var version = require('./version');


/**@
 * #Crafty
 * @category Core
 * @kind CoreObject
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
slice, rlist, rspace;


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
 * @kind CoreObject
 * 
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
     * @kind Method
     * 
     * @sign public this .setName(String name)
     * @param name - A human readable name for debugging purposes.
     *
     * Set a human readable name for debugging purposes.
     *
     * @example
     * ~~~
     * var ent = Crafty.e().setName("Player");
     * ~~~
     *
     * @see Crafty Core#.getName
     */
    setName: function (name) {
        var entityName = String(name);
        this._entityName = entityName;
        this.trigger("NewEntityName", entityName);
        return this;
    },

    /**@
     * #.getName
     * @comp Crafty Core
     * @kind Method
     * 
     * @sign public this .getName(String name)
     * @returns A human readable name for debugging purposes.
     *
     * Get the human readable name for debugging purposes.
     *
     * @example
     * ~~~
     * var ent = Crafty.e().setName("Player");
     * var name = ent.getName();
     * ~~~
     *
     * @see Crafty Core#.setName
     */
    getName: function (name) {
        return this._entityName;
    },

    /**@
     * #.addComponent
     * @comp Crafty Core
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
    * @kind Method

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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * Unlike DOM events, Crafty events are executed synchronously.
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
            if (prop !== "0" && prop !== "_global" && prop !== "_changed" && typeof this[prop] !== "function" && typeof this[prop] !== "object") {
                clone[prop] = this[prop];
            }
        }

        return clone;
    },


    /**@
     * #.setter
     * @comp Crafty Core
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
 * @kind Method
 * 
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
            if (!fn || callbacks[i] === fn) {
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
     * @kind Method
     * 
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

        // The viewport will init things like the default graphics layers as well
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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

            //Destroy all systems
            for (var s in Crafty._systems) {
                Crafty._systems[s].destroy();
            }

            // Remove the stage element, and re-add a div with the same id
            if (Crafty.stage && Crafty.stage.elem.parentNode) {
                var newCrStage = document.createElement('div');
                newCrStage.id = Crafty.stage.elem.id;
                Crafty.stage.elem.parentNode.replaceChild(newCrStage, Crafty.stage.elem);
            }

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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind CoreObject
     * 
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
             * @kind Method
             *
             * @trigger NewSteptype - when the current steptype changes - { mode, maxTimeStep } - New steptype
             *
             * Can be called to set the type of timestep the game loop uses.
             * @sign public void Crafty.timer.steptype(mode [, maxTimeStep])
             * @param mode - the type of time loop.  Allowed values are "fixed", "semifixed", and "variable".  Crafty defaults to "fixed".
             * @param maxTimeStep - For "fixed", sets the max number of frames per step.   For "variable" and "semifixed", sets the maximum time step allowed.
             *
             * Can be called to get the type of timestep the game loop uses.
             * @sign public Object Crafty.timer.steptype(void)
             * @returns Object containing the current timestep's properties { mode, maxTimeStep }
             *
             * * In "fixed" mode, each frame is sent the same value of `dt`, and to achieve the target game speed, mulitiple frame events are triggered before each render.
             * * In "variable" mode, there is only one frame triggered per render.  This recieves a value of `dt` equal to the actual elapsed time since the last frame.
             * * In "semifixed" mode, multiple frames per render are processed, and the total time since the last frame is divided evenly between them.
             *
             * @see Crafty.timer.FPS
             */
            steptype: function (newmode, option) {
                // setters
                if (newmode === "variable" || newmode === "semifixed") {
                    mode = newmode;
                    if (option)
                        maxTimestep = option;
                    Crafty.trigger("NewSteptype", {mode: mode, maxTimeStep: maxTimestep});
                } else if (newmode === "fixed") {
                    mode = "fixed";
                    if (option)
                        maxFramesPerStep = option;
                    Crafty.trigger("NewSteptype", {mode: mode, maxTimeStep: maxFramesPerStep});
                } else if (newmode !== undefined) {
                    throw "Invalid step type specified";
                // getter
                } else {
                    return {
                        mode: mode,
                        maxTimeStep: (mode === "variable" || mode === "semifixed") ? maxTimestep : maxFramesPerStep
                    };
                }
            },

            /**@
             * #Crafty.timer.step
             * @comp Crafty.timer
             * @kind Method
             * 
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
             * @see Crafty.timer.FPS
             */
            step: function () {
                var drawTimeStart, dt, lastFrameTime, loops = 0;

                var currentTime = new Date().getTime();
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
                    // Handle any changes due to user input
                    Crafty.trigger("EnterFrameInput", frameData);
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
             * @kind Method
             * 
             * @sign public void Crafty.timer.FPS()
             * Returns the target frames per second. This is not an actual frame rate.
             * @sign public void Crafty.timer.FPS(Number value)
             * @param value - the target rate
             * @trigger FPSChange - Triggered when the target FPS is changed by user - Number - new target FPS
             *
             * Sets the target frames per second. This is not an actual frame rate.
             * The default rate is 50.
             *
             * @see Crafty.timer.steptype
             */
            FPS: function (value) {
                if (typeof value === "undefined")
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
             * @kind Method
             * 
             * @sign public this Crafty.timer.simulateFrames(Number frames[, Number timestep])
             * Advances the game state by a number of frames and draws the resulting stage at the end. Useful for tests and debugging.
             * @param frames - number of frames to simulate
             * @param timestep - the duration to pass each frame.  Defaults to milliSecPerFrame (20 ms) if not specified.
             */
            simulateFrames: function (frames, timestep) {
                timestep = timestep || milliSecPerFrame;
                while (frames-- > 0) {
                    var frameData = {
                        frame: frame++,
                        dt: timestep
                    };
                    Crafty.trigger("EnterFrameInput", frameData);
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind CoreObject
     * 
     * Modify the inner workings of Crafty through the settings.
     */
    settings: (function () {
        var states = {},
            callbacks = {};

        return {
            /**@
             * #Crafty.settings.register
             * @comp Crafty.settings
             * @kind Method
             * 
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
             * @kind Method
             * 
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
             * @kind Method
             * 
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
     * @kind Method
     * 
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
 * @kind Method
 * 
 * @sign public Object .clone(Object obj)
 * @param obj - an object
 *
 * Deep copy (a.k.a clone) of an object.
 * @note This function should be used for plain objects with no cyclic references. To clone an entity use its `.clone` method instead.
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
 *
 * @see Crafty Core#.clone
 */

function clone(obj) {
    if (obj === null || typeof (obj) !== 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for (var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

// export Crafty
if (typeof define === 'function') { // AMD
    define('crafty', [], function () { // jshint ignore:line
        return Crafty;
    });
}

module.exports = Crafty;
},{"./version":18}],10:[function(require,module,exports){
(function (process){
var Crafty = require('../core/core.js');
var document = (typeof window !== "undefined") && window.document;

/**@
 * #Crafty.support
 * @category Misc, Core
 * @kind CoreObject
 * 
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
     * @kind Property
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
     * @kind Property
     * 
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
     * @kind Property
     * 
     * Is HTML5 `Audio` supported?
     */
    support.audio = (typeof window !== "undefined") && ('canPlayType' in document.createElement('audio'));

    /**@
     * #Crafty.support.prefix
     * @comp Crafty.support
     * @kind Property
     * 
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
         * @kind Property
         * 
         * Version of the browser
         */
        support.versionName = match[2];

        /**@
         * #Crafty.support.version
         * @comp Crafty.support
         * @kind Property
         * 
         * Version number of the browser as an Integer (first number)
         */
        support.version = +(match[2].split("."))[0];
    }

    /**@
     * #Crafty.support.canvas
     * @comp Crafty.support
     * @kind Property
     * 
     * Is the `canvas` element supported?
     */
    support.canvas = (typeof window !== "undefined") && ('getContext' in document.createElement("canvas"));

    /**@
     * #Crafty.support.webgl
     * @comp Crafty.support
     * @kind Property
     * 
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
     * @kind Property
     * 
     * Is css3Dtransform supported by browser.
     */
    support.css3dtransform = (typeof window !== "undefined") && ((typeof document.createElement("div").style.Perspective !== "undefined") || (typeof document.createElement("div").style[support.prefix + "Perspective"] !== "undefined"));

    /**@
     * #Crafty.support.deviceorientation
     * @comp Crafty.support
     * @kind Property
     * Is deviceorientation event supported by browser.
     */
    support.deviceorientation = (typeof window !== "undefined") && ((typeof window.DeviceOrientationEvent !== "undefined") || (typeof window.OrientationEvent !== "undefined"));

    /**@
     * #Crafty.support.devicemotion
     * @comp Crafty.support
     * @kind Property
     * 
     * Is devicemotion event supported by browser.
     */
    support.devicemotion = (typeof window !== "undefined") && (typeof window.DeviceMotionEvent !== "undefined");

})();

module.exports = {
    _events: {},

    /**@
     * #Crafty.addEvent
     * @category Events, Misc
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
},{"../core/core.js":9,"_process":1}],11:[function(require,module,exports){
var Crafty = require('../core/core.js');

module.exports = {
    /**@
     * #Crafty.assets
     * @category Assets
     * @kind Property
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * #Crafty.imageWhitelist
     * @category Assets
     * @kind Method
     *
     * A list of file extensions that can be loaded as images by Crafty.load
     *
     * @example
     * ~~~
     * // add tif extension to list of supported image files
     * Crafty.imageWhitelist.push("tif");
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
    imageWhitelist: ["jpg", "jpeg", "gif", "png", "svg"],
    /**@
     * #Crafty.load
     * @category Assets
     * @kind Method
     * 
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
     * Files with suffixes in `imageWhitelist` (case insensitive) will be loaded.
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
     * @see Crafty.imageWhitelist
     * @see Crafty.removeAssets
     */
    load: function (data, oncomplete, onprogress, onerror) {

        if (Array.isArray(data)) {
            Crafty.log("Calling Crafty.load with an array of assets no longer works; see the docs for more details.");
            return;
        }

        data = (typeof data === "string" ? JSON.parse(data) : data);

        var j = 0,
            total = (data.audio ? Object.keys(data.audio).length : 0) +
                (data.images ? Object.keys(data.images).length : 0) +
                (data.sprites ? Object.keys(data.sprites).length : 0),
            current, fileUrl, obj, type, asset,
            paths = Crafty.paths(),
            getExt = function(f) {
                return f.substr(f.lastIndexOf('.') + 1).toLowerCase();
            },
            getFilePath = function(type,f) {
                return (f.search("://") === -1 ? (type === "audio" ? paths.audio + f : paths.images + f) : f);
            },
            // returns null if 'a' is not already a loaded asset, obj otherwise
            isAsset = function(a) {
                return Crafty.asset(a) || null;
            },
            isSupportedAudio = function(f) {
                return Crafty.support.audio && Crafty.audio.supports(getExt(f));
            },
            isValidImage = function(f) {
                return Crafty.imageWhitelist.indexOf(getExt(f)) !== -1;
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
                obj = null;

                if (type === "audio") {
                    if (typeof current === "object") {
                        var files = [];
                        for (var i in current) {
                            fileUrl = getFilePath(type, current[i]);
                            if (!isAsset(fileUrl) && isSupportedAudio(current[i]) && !Crafty.audio.sounds[asset])
                                files.push(fileUrl);
                        }
                        if (files.length > 0)
                            obj = Crafty.audio.add(asset, files);
                    } else if (typeof current === "string") {
                        fileUrl = getFilePath(type, current);
                        if (!isAsset(fileUrl) && isSupportedAudio(current) && !Crafty.audio.sounds[asset])
                            obj = Crafty.audio.add(asset, fileUrl);
                    }
                    //extract actual audio obj if audio creation was successfull
                    if (obj)
                        obj = obj.obj;

                    //addEventListener is supported on IE9 , Audio as well
                    if (obj && obj.addEventListener)
                        obj.addEventListener('canplaythrough', pro, false);
                } else {
                    asset = (type === "sprites" ? asset : current);
                    fileUrl = getFilePath(type, asset);
                    if (!isAsset(fileUrl) && isValidImage(asset)) {
                        obj = new Image();
                        if (type === "sprites")
                            Crafty.sprite(current.tile, current.tileh, fileUrl, current.map,
                              current.paddingX, current.paddingY, current.paddingAroundBorder);
                        Crafty.asset(fileUrl, obj);
                        onImgLoad(obj, fileUrl);
                    }
                }

                if (obj) {
                    obj.onerror = err;
                } else {
                    err.call({src: fileUrl});
                }
            }
        }

        // If we aren't trying to handle *any* of the files, that's as complete as it gets!
        if (total === 0 && oncomplete) oncomplete();

    },
    /**@
     * #Crafty.removeAssets
     * @category Assets
     * @kind Method
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
                return (f.search("://") === -1 ? (type === "audio" ? paths.audio + f : paths.images + f) : f);
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

},{"../core/core.js":9}],12:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Model
 * @category Model
 * @kind Component
 * 
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
    var key;
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
   * @kind Method
   * 
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


},{"../core/core.js":9}],13:[function(require,module,exports){
var Crafty = require('../core/core.js');


module.exports = {
    _scenes: {},
    _current: null,

    /**@
     * #Crafty.scene
     * @category Scenes, Stage
     * @kind Method
     * 
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
     *           .css({ "border": "1px solid red"})
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
     * @kind Method
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
     * @kind Method
     * 
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

},{"../core/core.js":9}],14:[function(require,module,exports){
var Crafty = require('../core/core.js');

try {
  var storage = (typeof window !== "undefined" && window.localStorage) || (new require('node-localstorage').LocalStorage('./localStorage'));
} catch(e) {
  var storage = null;
}


/**@
 * #Storage
 * @category Utilities
 * @kind Property
 * 
 * Very simple way to get and set values, which will persist when the browser is closed also.
 * Storage wraps around HTML5 Web Storage, which is well-supported across browsers and platforms, but limited to 5MB total storage per domain.
 * Storage is also available for node, which is permanently persisted to the `./localStorage` folder - take care of removing entries. Note that multiple Crafty instances use the same storage, so care has to be taken not to overwrite existing entries.
 */
/**@
 * #Crafty.storage
 * @comp Storage
 * @kind Method
 * 
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
 * @kind Method
 * 
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

},{"../core/core.js":9}],15:[function(require,module,exports){
var Crafty = require('../core/core.js');


// Dictionary of existing systems
Crafty._systems = {};

/**@
 * #Crafty.s
 * @category Core
 * @kind Method
 *
 * Registers a system.
 *
 * @trigger SystemLoaded - When the system has initialized itself - obj - system object
 * @trigger SystemDestroyed - Right before the system is destroyed - obj - system object
 *
 * @sign void Crafty.s(String name, Obj template[, Obj options][, Boolean lazy])
 * Register a system
 * @param name - The name of the system
 * @param template - an object whose methods and properties will be copied to the new system
 * @param options - an object whose properties will be deep copied to the new system's options property
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
 * @note The `init()` method is for setting up the internal state of the system -- if you create entities in it that then reference the system, that'll create an infinite loop.
 */
Crafty.s = function(name, obj, options, lazy) {
    if (obj) {
        if (typeof options === "boolean") {
            lazy = options;
            options = null;
        }
        if (lazy === false) {
            Crafty._systems[name] = new Crafty.CraftySystem(name, obj, options);
            Crafty.trigger("SystemLoaded", name);
        } else {
            Crafty._registerLazySystem(name, obj, options);
        }
    } else {
        return Crafty._systems[name];
    }
};

function optionMerge(defaults, specific){
    var options = {};
    // Copy all the specified keys, then all the default keys that aren't specified
    for (var key in specific) {
        options[key] = specific[key];
    }
    for (key in defaults) {
        if (!(key in specific)) {
            options[key] = defaults[key];
        }
    } 
    return options;
}


Crafty._registerLazySystem = function(name, obj, options) {
    // This is a bit of magic to only init a system if it's requested at least once.
    // We define a getter for _systems[name] that will first initialize the system, 
    // and then redefine _systems[name] to remove that getter.
    Object.defineProperty(Crafty._systems, name, {
        get: function() {
            Object.defineProperty(Crafty._systems, name, {
                value: new Crafty.CraftySystem(name, obj, options),
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
Crafty.CraftySystem = (function() {
    var systemID = 1;
    return function(name, template, options) {
        this.name = name;
        if (!template) return this;
        this._systemTemplate = template;
        this.extend(template);
        
        // Overwrite any default options with the passed options object
        // This does a deep copy on the objects, and treats null as a specified value
        this.options = optionMerge(this.options, options);

        // Add the "low leveL" callback methods
        Crafty._addCallbackMethods(this);

        // Give this object a global ID.  Used for event handlers.
        this[0] = "system" + (systemID++);
        // Run any instantiation code
        if (typeof this.init === "function") {
            this.init(name);
        }
        // If an events object is provided, bind the listed event handlers
        if ("events" in template) {
            var auto = template.events;
            for (var eventName in auto) {
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

    one: function(event, callback) {
        var self = this;
        var oneHandler = function(data) {
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
},{"../core/core.js":9}],16:[function(require,module,exports){
/**@
 * #Delay
 * @category Utilities
 * @kind Component
 *
 * A component for triggering functions after a given amount of time.
 *
 * This syncs with Crafty's internal clock, and so should generally be preferred to using methods such as `setTimeout`.
 */
module.exports = {
    init: function () {
        this._delays = [];
        this._delaysPaused = false;
        this.bind("EnterFrame", function (frameData) {
            if (this._delaysPaused) return;
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
     * @kind Method
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
     * @kind Method
     * 
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
            if(item && item.callback === callback){
                this._delays[index] = false;
            }
        }
        return this;
    },
    /**@
     * #.pauseDelays
     * @comp Delay
     * @kind Method
     * 
     * @sign public this.pauseDelays()
     *
     * The pauseDelays method will pause all delays of this
     * entity until resumed.
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
     * // and some time later, the gameplay is paused
     * ent.pauseDelays();
     * ~~~
     */
    pauseDelays: function() {
        this._delaysPaused = true;
    },
    /**@
     * #.resumeDelays
     * @comp Delay
     * @kind Method
     * 
     * @sign public this.resumeDelays()
     *
     * The resumeDelays method will resume earlier paused delays for this
     * entity
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
     * // and some time later, the gameplay is paused (or only
     * // a part of it is frozen)
     * ent.pauseDelays();
     *
     * // the player resumes gameplay
     * ent.resumeDelays();
     * ~~~
     */
    resumeDelays: function() {
        this._delaysPaused = false;
    }
};

},{}],17:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Tween
 * @category Animation
 * @kind Component
 * 
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
  * @kind Method
  *
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
  * @kind Method
  *
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
      if (typeof this.tweenGroup[target] === "object" )
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
  * @kind Method
  *
  * @sign public this .pauseTweens()
  *
  * Pauses all tweens associated with the entity
  */
  pauseTweens: function(){
      this.tweens.map(function(e){e.easing.pause();});
  },

  /**@
  * #.resumeTweens
  * @comp Tween
  * @kind Method
  *
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

},{"../core/core.js":9}],18:[function(require,module,exports){
module.exports = "0.8.0";
},{}],19:[function(require,module,exports){
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
require('./spatial/motion');
require('./spatial/platform');
require('./spatial/collision');
require('./spatial/spatial-grid');
require('./spatial/rect-manager');
require('./spatial/math');

// Needs to be required before any specific layers are
require('./graphics/layers');

require('./graphics/canvas');
require('./graphics/canvas-layer');
require('./graphics/webgl');
require('./graphics/webgl-layer');

require('./graphics/color');
require('./graphics/dom');
require('./graphics/dom-helper');
require('./graphics/dom-layer');
require('./graphics/drawing');
require('./graphics/gl-textures');
require('./graphics/renderable');
require('./graphics/html');
require('./graphics/image');
require('./graphics/particles');
require('./graphics/sprite-animation');
require('./graphics/sprite');
require('./graphics/text');
require('./graphics/viewport');

require('./isometric/diamond-iso');
require('./isometric/isometric');

require('./controls/inputs');
require('./controls/controls-system');
require('./controls/controls');
require('./controls/device');
require('./controls/keycodes');

require('./sound/sound');

require('./debug/debug-layer');
require('./debug/logging');

// Define some aliases for renamed properties
require('./aliases').defineAliases(Crafty);

if(window) window.Crafty = Crafty;

module.exports = Crafty;

},{"./aliases":2,"./controls/controls":4,"./controls/controls-system":3,"./controls/device":5,"./controls/inputs":6,"./controls/keycodes":7,"./core/animation":8,"./core/core":9,"./core/extensions":10,"./core/loader":11,"./core/model":12,"./core/scenes":13,"./core/storage":14,"./core/systems":15,"./core/time":16,"./core/tween":17,"./debug/debug-layer":20,"./debug/logging":21,"./graphics/canvas":23,"./graphics/canvas-layer":22,"./graphics/color":24,"./graphics/dom":27,"./graphics/dom-helper":25,"./graphics/dom-layer":26,"./graphics/drawing":28,"./graphics/gl-textures":29,"./graphics/html":30,"./graphics/image":31,"./graphics/layers":32,"./graphics/particles":33,"./graphics/renderable":34,"./graphics/sprite":36,"./graphics/sprite-animation":35,"./graphics/text":37,"./graphics/viewport":38,"./graphics/webgl":40,"./graphics/webgl-layer":39,"./isometric/diamond-iso":41,"./isometric/isometric":42,"./sound/sound":43,"./spatial/2d":44,"./spatial/collision":45,"./spatial/math":46,"./spatial/motion":47,"./spatial/platform":48,"./spatial/rect-manager":49,"./spatial/spatial-grid":50}],20:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

/**@
 * #DebugCanvas
 * @category Debug
 * @kind Component
 * 
 * @trigger DebugDraw - when the entity is ready to be drawn to the stage
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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

        this.trigger("DebugDraw", ctx);

        ctx.globalAlpha = ga;

    }


});



/**@
 * #DebugRectangle
 * @category Debug
 * @kind Component
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
     * @kind Method
     * 
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

    drawDebugRect: function (ctx) {

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
 * @kind Component
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
 * @kind Component
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
     * @kind Method
     * 
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

    drawDebugPolygon: function (ctx) {
        if (typeof this.polygon === "undefined")
            return;

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
 * @kind Component
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
 * @kind Component
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
 * @kind Component
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
 * @kind Component
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
            if (list[i] === ent)
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

        var lastLayer = null;
        for (; i < l; i++) {
            current = q[i];

            // If necessary, update the view transform to match the current entities layer
            if (lastLayer !== current._drawlayer){
                view = current._drawLayer._viewportRect();
                ctx.setTransform(view._scale, 0, 0, view._scale, Math.round(-view._x*view._scale), Math.round(-view._y*view._scale));
                lastLayer = current._drawLayer;
            }

            current.debugDraw(ctx);
        }

    }

};

},{"../core/core.js":9}],21:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Crafty.log
 * @category Debug
 * @kind Method
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
 * @kind Method
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
		if (Crafty.loggingEnabled && (typeof window !== "undefined" ? window.console : console) && console.log) {
			console.log.apply(console, arguments);
		}
	},
	error: function() {
		if (Crafty.loggingEnabled && (typeof window !== "undefined" ? window.console : console) && console.error) {
			console.error.apply(console, arguments);
		}
	}
});
},{"../core/core.js":9}],22:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #CanvasLayer
 * @category Graphics
 * @kind System
 *
 * An object for creating the canvas layer system.
 *
 * Mostly contains private methods to draw entities on a canvas element.
 */
Crafty._registerLayerTemplate("Canvas", {
    type: "Canvas",
    
    options: {
        xResponse: 1,
        yResponse: 1,
        scaleResponse: 1,
        z: 0
    },
    
    _dirtyRects: [],
    _changedObjs: [],
    layerCount: 0,
    _dirtyViewport: false,

    // Sort function for rendering in the correct order
    _sort: function(a, b) {
        return a._globalZ - b._globalZ;
    },

    /**@
     * #.dirty
     * @comp CanvasLayer
     * @kind Method
     * @private
     * 
     * @sign public .dirty(ent)
     * @param ent - The entity to add
     *
     * Add an entity to the list of Canvas objects that need redrawing
     */
    dirty: function dirty(ent) {
        this._changedObjs.push(ent);
    },
    
    /**@
     * #.attach
     * @comp CanvasLayer
     * @kind Method
     * @private
     * 
     * @sign public .attach(ent)
     * @param ent - The entity to add
     *
     * Sets the entity's draw context to this layer
     */
    attach: function attach(ent) {
        ent._drawContext = this.context;
        //increment the number of canvas objs
        this.layerCount++;
    },
    
    /**@
     * #.detach
     * @comp CanvasLayer
     * @kind Method
     * @private
     * 
     * @sign public .detach(ent)
     * @param ent - The entity to detach
     *
     * Removes an entity to the list of Canvas objects to draw
     */
    detach: function detach(ent) {
        this.dirty(ent);
        ent._drawContext = null;
        //decrement the number of canvas objs
        this.layerCount--;
    },
    

    /**@
     * #.context
     * @comp CanvasLayer
     * @kind Property
     *
     * This will return the 2D context associated with the canvas layer's canvas element.
     */
    context: null,

    /**@
     * #._canvas
     * @comp CanvasLayer
     * @kind Property
     * @private
     *
     * The canvas element associated with the canvas layer.
     */
     _canvas: null,

    // When the system is first created, create the necessary canvas element and initial state
    // Bind to the necessary events
    init: function () {
        //check if canvas is supported
        if (!Crafty.support.canvas) {
            Crafty.trigger("NoCanvas");
            Crafty.stop();
            return;
        }

        // set referenced objects to initial values -- necessary to avoid shared state between systems
        this._dirtyRects = [];
        this._changedObjs = [];

        //create an empty canvas element
        var c;
        c = document.createElement("canvas");
        c.width = Crafty.viewport.width;
        c.height = Crafty.viewport.height;
        c.style.position = 'absolute';
        c.style.left = "0px";
        c.style.top = "0px";
        c.style.zIndex = this.options.z;

        Crafty.stage.elem.appendChild(c);
        this.context = c.getContext('2d');
        this._canvas = c;

        //Set any existing transformations
        var zoom = Crafty.viewport._scale;
        if (zoom !== 1)
            this.context.scale(zoom, zoom);

        // Set pixelart to current status, and listen for changes
        this._setPixelart(Crafty._pixelartEnabled);
        this.uniqueBind("PixelartSet", this._setPixelart);

        //Bind rendering of canvas context (see drawing.js)
        this.uniqueBind("RenderScene", this._render);
        
        this.uniqueBind("ViewportResize", this._resize);

        this.bind("InvalidateViewport", function () {
            this._dirtyViewport = true;
        });
        
        Crafty._addDrawLayerInstance(this);
    },

    // When the system is destroyed, remove related resources
    remove: function() {

        this._canvas.parentNode.removeChild(this._canvas);
        Crafty._removeDrawLayerInstance(this);
    },

    _render: function() {
        var dirtyViewport = this._dirtyViewport,
            l = this._changedObjs.length,
            ctx = this.context;
        if (!l && !dirtyViewport) {
            return;
        }
        
        // Set the camera transforms from the combination of the current viewport parameters and this layers 
        var cameraOptions = this.options;
        if (dirtyViewport && cameraOptions) {
            var view = this._viewportRect();
            var scale = view._scale; 
            var dx = -view._x * scale;
            var dy = -view._y * scale;
            ctx.setTransform(scale, 0, 0, scale, Math.round(dx), Math.round(dy) );
        }

        //if the amount of changed objects is over 60% of the total objects
        //do the naive method redrawing
        // TODO: I'm not sure this condition really makes that much sense!
        if (l / this.layerCount > 0.6 || dirtyViewport) {
            this._drawAll();
        } else {
            this._drawDirty();
        }
        //Clean up lists etc
        this._clean();
    },

    /**@
     * #._drawDirty
     * @comp CanvasLayer
     * @kind Method
     * @private
     * 
     * @sign public ._drawDirty()
     *
     * - Triggered by the "RenderScene" event
     * - If the number of rects is over 60% of the total number of objects
     *  do the naive method redrawing `CanvasLayer.drawAll` instead
     * - Otherwise, clear the dirty regions, and redraw entities overlapping the dirty regions.
     *
     * @see Canvas#.draw
     */
    _drawDirty: function (view) {
        view = view || this._viewportRect();
        var i, j, q, rect,len, obj,
            changed = this._changedObjs,
            l = changed.length,
            dirty = this._dirtyRects,
            rectManager = Crafty.rectManager,
            overlap = rectManager.overlap,
            ctx = this.context,
            dupes = [],
            objs = [];
        
        // Canvas works better with integral coordinates where possible
        view = rectManager.integerBounds(view);
        
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
            rect = rectManager.integerBounds(rect);

            // If a dirty rect doesn't overlap with the viewport, skip to the next one
            if (!overlap(rect, view)) continue;

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

                if (dupes[obj[0]] || !obj._visible || (obj._drawLayer !== this) )
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
        if (this.debugDirty === true) {
            ctx.strokeStyle = 'red';
            for (i = 0, l = dirty.length; i < l; ++i) {
                rect = dirty[i];
                ctx.strokeRect(rect._x, rect._y, rect._w, rect._h);
            }
        }

    },

    /**@
     * #._drawAll
     * @comp CanvasLayer
     * @kind Method
     * @private
     * 
     * @sign public CanvasLayer.drawAll([Object rect])
     * @param rect - a rectangular region {_x: x_val, _y: y_val, _w: w_val, _h: h_val}
     *
     * - If rect is omitted, redraw within the viewport
     * - If rect is provided, redraw within the rect
     */
    _drawAll: function (rect) {
        rect = rect || this._viewportRect();
        rect = Crafty.rectManager.integerBounds(rect);
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
            if (current._visible && current._drawContext === this.context) {
                current.draw(this.context);
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
        var c = this._canvas;
        c.width = Crafty.viewport.width;
        c.height = Crafty.viewport.height;

    },

    _setPixelart: function(enabled) {
        var context = this.context;
        context.imageSmoothingEnabled = !enabled;
        context.mozImageSmoothingEnabled = !enabled;
        context.webkitImageSmoothingEnabled = !enabled;
        context.oImageSmoothingEnabled = !enabled;
        context.msImageSmoothingEnabled = !enabled;
    }

});

},{"../core/core.js":9}],23:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Canvas
 * @category Graphics
 * @kind Component
 * 
 * @trigger Draw - when the entity is ready to be drawn to the stage - {type: "canvas", pos, co, ctx}
 * @trigger NoCanvas - if the browser does not support canvas
 *
 * When this component is added to an entity it will be drawn to the global canvas element. The canvas element (and hence all Canvas entities) is always rendered below any DOM entities.
 *
 * The canvas layer will be automatically initialized if it has not been created yet.
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
        this.requires("Renderable");
        
        //Allocate an object to hold this components current region
        this.currentRect = {};
        
        // Add the default canvas layer if we aren't attached to a custom one
        if (!this._customLayer){
            this._attachToLayer( Crafty.s("DefaultCanvasLayer"));
        }
        
    },

    remove: function() {
        this._detachFromLayer();
    },

    /**@
     * #.draw
     * @comp Canvas
     * @kind Method
     * 
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


        var context = ctx || this._drawContext;
        var coord = this.__coord || [0, 0, 0, 0];
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

},{"../core/core.js":9}],24:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;




/**@
 * #Crafty.assignColor
 * @category Graphics
 * @kind Method
 * 
 * Maps a wide vareity of color representations to a set of simple rgb(a) properties. 
 * 
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
            if (hex.length === 1)
                hex = "0" + hex;
            return hex;
        }

        function rgbToHex(r, g, b){
            return "#" + hexComponent(r) + hexComponent(g) + hexComponent(b);
        }

        function parseHexString(hex, c) {
            var r, g, b,
                l = hex.length;

            if (l === 7) {
                r = hex.substr(1, 2);
                g = hex.substr(3, 2);
                b = hex.substr(5, 2);
            } else if (l === 4) {
                r = hex.substr(1, 1); r += r;
                g = hex.substr(2, 1); g += g;
                b = hex.substr(3, 1); b += b;
            } else {
                return default_value(c);
            }
            c._red = parseInt(r, 16);
            c._green = parseInt(g, 16);
            c._blue = parseInt(b, 16);

            return c;
        }

        var rgb_regex = /rgba?\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,?\s*([0-9.]+)?\)/;

        function parseRgbString(rgb, c) {
            var values = rgb_regex.exec(rgb);
            if( values === null || (values.length !== 4 && values.length !== 5)) {
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


Crafty.defaultShader("Color", new Crafty.WebGLShader(
    "attribute vec2 aPosition;\nattribute vec3 aOrientation;\nattribute vec2 aLayer;\nattribute vec4 aColor;\n\nvarying lowp vec4 vColor;\n\nuniform  vec4 uViewport;\n\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\n\nvoid main() {\n  vec2 pos = aPosition;\n  vec2 entityOrigin = aOrientation.xy;\n  mat2 entityRotationMatrix = mat2(cos(aOrientation.z), sin(aOrientation.z), -sin(aOrientation.z), cos(aOrientation.z));\n\n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin;\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aLayer.x) ), 1) );\n  vColor = vec4(aColor.rgb*aColor.a*aLayer.y, aColor.a*aLayer.y);\n}",
    "precision mediump float;\nvarying lowp vec4 vColor;\nvoid main(void) {\n\tgl_FragColor = vColor;\n}",
    [
        { name: "aPosition",    width: 2 },
        { name: "aOrientation", width: 3 },
        { name: "aLayer",       width: 2 },
        { name: "aColor",       width: 4 }
    ],
    function(e, entity) {
        e.program.writeVector("aColor",
            entity._red/255,
            entity._green/255,
            entity._blue/255,
            entity._strength
        );
    }
));

/**@
 * #Color
 * @category Graphics
 * @kind Component
 * 
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
        if (this._drawLayer) {
            this._setupColor(this._drawLayer);
        }
        this.trigger("Invalidate");
    },

    events: {
        "LayerAttached": "_setupColor"
    },

    remove: function(){
        this.unbind("Draw", this._drawColor);
        if (this.has("DOM")){
            this._element.style.backgroundColor = "transparent";
        }
        this.trigger("Invalidate");
    },

    _setupColor: function(layer) {
        if (layer.type === "WebGL") {
            this._establishShader("Color", Crafty.defaultShader("Color"));
        }
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
            e.program.draw(e, this);
        }
    },

    /**@
     * #.color
     * @comp Color
     * @kind Method
     * 
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
     * c.color("rgb(255, 0, 0)");
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
            if (typeof arguments[1] === "number")
                this._strength = arguments[1];
        }
        this._color = "rgba(" + this._red + ", " + this._green + ", " + this._blue + ", " + this._strength + ")";
        this.trigger("Invalidate");
        return this;
    }
});


},{"../core/core.js":9}],25:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

Crafty.extend({
    /**@
     * #Crafty.domHelper
     * @kind Property
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
         * @kind Method
         * 
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
         * @kind Method
         * 
         * @sign public Object Crafty.domHelper.translate(Number clientX, Number clientY[, DrawLayer layer])
         * @param clientX - clientX position in the browser screen
         * @param clientY - clientY position in the browser screen
         * @param layer - a Crafty draw layer
         * @return Object `{x: ..., y: ...}` with Crafty coordinates.
         * 
         * The parameters clientX and clientY are pixel coordinates within the visible
         * browser window. This function translates those to Crafty coordinates (i.e.,
         * the coordinates that you might apply to an entity), by taking into account
         * where the stage is within the screen, what the current viewport is, etc.
         * 
         * If a draw layer is specified, the returned object will take into account any special scaling rules for that object.
         */
        translate: function (clientX, clientY, layer) {
            var doc = document.documentElement;
            var body = document.body;
            var view;
            // The branch here is to deal with the fact that the viewport position is the distance TO the origin, not from
            // But the _viewportRect is the opposite -- it uses the same convention as a rectangle that matches the viewport in that layer
            // At some point this should be simplified, probably by altering the viewport to use the more intuitive coordinates
            if (layer) {
                view = layer._viewportRect();
                return {
                    x: (clientX - Crafty.stage.x + (doc && doc.scrollLeft || body && body.scrollLeft || 0)) / view._scale + view._x,
                    y: (clientY - Crafty.stage.y + (doc && doc.scrollTop || body && body.scrollTop || 0)) / view._scale + view._y
                };
            } else {
                view = Crafty.viewport;
                return {
                    x: (clientX - Crafty.stage.x + (doc && doc.scrollLeft || body && body.scrollLeft || 0)) / view._scale - view._x,
                    y: (clientY - Crafty.stage.y + (doc && doc.scrollTop || body && body.scrollTop || 0)) / view._scale - view._y
                };
            }
        }
    }
});
},{"../core/core.js":9}],26:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;


/**@
 * #DomLayer
 * @category Graphics
 * @kind System
 *
 * Collection of mostly private methods to represent entities using the DOM.
 */
Crafty._registerLayerTemplate("DOM", {
    type: "DOM",
    options: {
        xResponse: 1,
        yResponse: 1,
        scaleResponse: 1,
        z: 0
    },

    _changedObjs: [],
    _dirtyViewport: false,

    /**@
     * #._div
     * @comp DomLayer
     * @kind Property
     * @private
     * 
     * A div inside the `#cr-stage` div that holds all DOM entities.
     */
    _div: null,

    init: function () {
        // Avoid shared state between systems
        this._changedObjs = [];

        // Create the div that will contain DOM elements
        var div = this._div = document.createElement("div");

        Crafty.stage.elem.appendChild(div);
        div.style.position = "absolute";
        div.style.zIndex = this.options.z;
        div.style.transformStyle = "preserve-3d"; // Seems necessary for Firefox to preserve zIndexes?

        // Bind scene rendering (see drawing.js)
        this.uniqueBind("RenderScene", this._render);

        // Layers should generally listen for resize events, but the DOM layers automatically inherit the stage's dimensions

        // Listen for changes in pixel art settings
        // Since window is inited before stage, can't set right away, but shouldn't need to!
        this.uniqueBind("PixelartSet", this._setPixelArt);

        this.uniqueBind("InvalidateViewport", function() {
            this._dirtyViewport = true;
        });
        Crafty._addDrawLayerInstance(this);
    },

    // Cleanup the DOM when the layer is destroyed
    remove: function() {
        this._div.parentNode.removeChild(this._div);
        Crafty._removeDrawLayerInstance(this);
    },

    // Handle whether images should be smoothed or not
    _setPixelArt: function(enabled) {
        var style = this._div.style;
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
     * #.debug
     * @comp DomLayer
     * @kind Method
     * 
     * @sign public .debug()
     * 
     * Logs the current list of entities that have been invalidated in this layer.
     */
    debug: function () {
        Crafty.log(this._changedObjs);
    },


    /**@
     * #._render
     * @comp DomLayer
     * @kind Method
     * @private
     * 
     * @sign public .render()
     *
     * When "RenderScene" is triggered, draws all DOM entities that have been flagged
     *
     * @see DOM#.draw
     */
    _render: function () {
        var changed = this._changedObjs;
        // Adjust the viewport
        if (this._dirtyViewport) {
           this._setViewport();
           this._dirtyViewport = false;
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
     * #.dirty
     * @comp DomLayer
     * @kind Method
     * @private
     * 
     * @sign public .dirty(ent)
     * @param ent - The entity to mark as dirty
     *
     * Add an entity to the list of DOM object to draw
     */
    dirty: function add(ent) {
        this._changedObjs.push(ent);
    },

    /**@
     * #.attach
     * @comp DomLayer
     * @kind Method
     * @private
     * 
     * @sign public .attach(ent)
     * @param ent - The entity to add
     *
     * Add an entity to the layer
     */
    attach: function attach(ent) {
        ent._drawContext = this.context;
        // attach the entity's div element to the dom layer
        this._div.appendChild(ent._element);
        // set position style and entity id
        ent._element.style.position = "absolute";
        ent._element.id = "ent" + ent[0];
    },
    
    /**@
     * #.detach
     * @comp DomLayer
     * @kind Method
     * @private
     * 
     * @sign public .detach(ent)
     * @param ent - The entity to remove
     *
     * Removes an entity from the layer
     */
    detach: function detach(ent) {
        this._div.removeChild(ent._element);
    },

    // Sets the viewport position and scale
    // Called by render when the dirtyViewport flag is set
    _setViewport: function() {
        var style = this._div.style,
            view = this._viewportRect();

        var scale = view._scale;
        var dx = -view._x * scale;
        var dy = -view._y * scale;

        style.transform = style[Crafty.support.prefix + "Transform"] = "scale(" + scale + ", " + scale + ")";
        style.left = Math.round(dx) + "px";
        style.top = Math.round(dy) + "px";
        style.zIndex = this.options.z;
    }

});
},{"../core/core.js":9}],27:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

/**@
 * #DOM
 * @category Graphics
 * @kind Component
 *
 * A component which renders entities as DOM nodes, specifically `<div>`s.
 */
Crafty.c("DOM", {
    /**@
     * #._element
     * @comp DOM
     * @kind Property
     * The DOM element used to represent the entity.
     */
    _element: null,
    //holds current styles, so we can check if there are changes to be written to the DOM
    _cssStyles: null,

    /**@
     * #.avoidCss3dTransforms
     * @comp DOM
     * @kind Property
     * 
     * Avoids using of CSS 3D Transform for positioning when true. Default value is false.
     */
    avoidCss3dTransforms: false,

    init: function () {
        this.requires("Renderable");
        
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

        // Attach the entity to the dom layer
        if (!this._customLayer){
            this._attachToLayer( Crafty.s("DefaultDOMLayer") );
        }

        this.bind("NewComponent", this._updateClass);
        this.bind("RemoveComponent", this._removeClass);
    },

    remove: function(){
        this._detachFromLayer();
        this.unbind("NewComponent", this._updateClass);
        this.unbind("RemoveComponent", this._removeClass);
    },

    /**@
     * #.getDomId
     * @comp DOM
     * @kind Method
     * 
     * @sign public this .getDomId()
     *
     * Get the Id of the DOM element used to represent the entity.
     */
    getDomId: function () {
        return this._element.id;
    },

    // removes a component on RemoveComponent events
    _removeClass: function(removedComponent) {
        var comp,
            c = this.__c,
            str = "";
        for (comp in c) {
            if (comp !== removedComponent) {
                str += ' ' + comp;
            }
        }
        str = str.substr(1);
        this._element.className = str;
    },

    // adds a class on NewComponent events
    _updateClass: function() {
        var comp,
            c = this.__c,
            str = "";
        for (comp in c) {
            str += ' ' + comp;
        }
        str = str.substr(1);
        this._element.className = str;
    },

    /**@
     * #.DOM
     * @comp DOM
     * @kind Method
     * 
     * @trigger Draw - when the entity is ready to be drawn to the stage - { style:String, type:"DOM", co}
     * @sign public this .DOM(HTMLElement elem)
     * @param elem - HTML element that will replace the dynamically created one
     *
     * Pass a DOM element to use rather than one created. Will set `._element` to this value. Removes the old element.
     * 
     * Will reattach the entity to the current draw layer
     */
    DOM: function (elem) {
        if (elem && elem.nodeType) {
            var layer = this._drawLayer;
            this._detachFromLayer();
            this._element = elem;
            this._attachToLayer(layer);
        }
        return this;
    },

    /**@
     * #.draw
     * @comp DOM
     * @kind Method
     * @private
     * 
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

        if (this._cssStyles.transform !== trans.join(" ")) {
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
     * #.css
     * @comp DOM
     * @kind Method
     * 
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
     * The notation can be CSS or JS (e.g. `border-radius` or `borderRadius`).
     *
     * To return a value, pass the property.
     *
     * Note: For entities with "Text" component, some css properties are controlled by separate functions
     * `.textFont()` and `.textColor()`, and ignore `.css()` settings. See Text component for details.
     *
     * @example
     * ~~~
     * this.css({'border-radius': '5px', 'text-decoration': 'line-through'});
     * this.css("borderRadius", "10px");
     * this.css("border-radius"); //returns 10px
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

},{"../core/core.js":9}],28:[function(require,module,exports){
var Crafty = require('../core/core.js');

Crafty.extend({
    /**@
     * #Crafty.pixelart
     * @category Graphics
     * @kind Method
     * 
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

},{"../core/core.js":9}],29:[function(require,module,exports){
var Crafty = require('../core/core.js');

// An object for wrangling textures
// An assumption here is that doing anything with textures is fairly expensive, so the code should be expressive rather than performant
Crafty.TextureManager = TextureManager;

function TextureManager (gl, webgl) {
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
}

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
        // gl is the context, webgl is the Crafty object containing prefs/etc
        // var gl = this.gl;
        var webgl = this.webgl;

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
Crafty.TextureWrapper = TextureWrapper;

function TextureWrapper (manager, id){
    this.manager = manager;
    this.gl = manager.gl;
    this.glTexture = this.gl.createTexture();
    this.id = id;
    this.active = false;
    this.unit = null;
    this.powerOfTwo = false;
}

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
        this.powerOfTwo = !((Math.log(image.width)/Math.LN2 !== Math.floor(Math.log(image.width)/Math.LN2)) || (Math.log(image.height)/Math.LN2 !== Math.floor(Math.log(image.height)/Math.LN2)));
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
},{"../core/core.js":9}],30:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #HTML
 * @category Graphics
 * @kind Component
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
},{"../core/core.js":9}],31:[function(require,module,exports){
var Crafty = require('../core/core.js');


//
// Define some variables required for webgl


Crafty.defaultShader("Image", new Crafty.WebGLShader(
    "attribute vec2 aPosition;\nattribute vec3 aOrientation;\nattribute vec2 aLayer;\nattribute vec2 aTextureCoord;\n\nvarying mediump vec3 vTextureCoord;\n\nuniform vec4 uViewport;\nuniform mediump vec2 uTextureDimensions;\n\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\n\nvoid main() {\n  vec2 pos = aPosition;\n  vec2 entityOrigin = aOrientation.xy;\n  mat2 entityRotationMatrix = mat2(cos(aOrientation.z), sin(aOrientation.z), -sin(aOrientation.z), cos(aOrientation.z));\n  \n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin ;\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aLayer.x) ), 1) );\n  vTextureCoord = vec3(aTextureCoord, aLayer.y);\n}",
    "varying mediump vec3 vTextureCoord;\n  \nuniform sampler2D uSampler;\nuniform mediump vec2 uTextureDimensions;\n\nvoid main(void) {\n  highp vec2 coord =   vTextureCoord.xy / uTextureDimensions;\n  mediump vec4 base_color = texture2D(uSampler, coord);\n  gl_FragColor = vec4(base_color.rgb*base_color.a*vTextureCoord.z, base_color.a*vTextureCoord.z);\n}",
    [
        { name: "aPosition",     width: 2 },
        { name: "aOrientation",  width: 3 },
        { name: "aLayer",        width: 2 },
        { name: "aTextureCoord", width: 2 }
    ],
    function(e, _entity) {
        var pos = e.pos;
        // Write texture coordinates
        e.program.writeVector("aTextureCoord",
            0, 0,
            0, pos._h,
            pos._w, 0,
            pos._w, pos._h
        );
    }
));

/**@
 * #Image
 * @category Graphics
 * @kind Component
 * 
 * Draw an image with or without repeating (tiling).
 */
Crafty.c("Image", {
    _repeat: "repeat",
    ready: false,

    init: function () {
        this.bind("Draw", this._drawImage);
        this.bind("LayerAttached", this._setupImage);
    },

    remove: function() {
        this.unbind("LayerAttached", this._setupImage);
        this.unbind("Draw", this._drawImage);
    },

    /**@
     * #.image
     * @comp Image
     * @kind Method
     * 
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
                self._setupImage(self._drawLayer);
            };
        } else {
            this._setupImage(this._drawLayer);
        }

        this.trigger("Invalidate");

        return this;
    },

    // called on image change or layer attachment
    _setupImage: function(layer){
        if (!this.img || !layer) return;

        if (layer.type === "Canvas") {
            this._pattern = this._drawContext.createPattern(this.img, this._repeat);
        } else if (layer.type === "WebGL") {
            this._establishShader("image:" + this.__image, Crafty.defaultShader("Image"));
            this.program.setTexture( this._drawLayer.makeTexture(this.__image, this.img, (this._repeat!=="no-repeat")));
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
          e.program.draw(e, this);
        }

    }
});
},{"../core/core.js":9}],32:[function(require,module,exports){
var Crafty = require('../core/core.js');

Crafty.extend({
    _drawLayerTemplates: {},
    _drawLayers: [],
    _addDrawLayerInstance: function (layer) {
        Crafty._drawLayers.push(layer);
        this._drawLayers.sort(function (a, b) { return a.options.z - b.options.z; });
    },

    _removeDrawLayerInstance: function (layer) {
        var i = this._drawLayers.indexOf(layer);
        if (i >= 0) {
            this._drawLayers.splice(i, 1);
        }
        this._drawLayers.sort(function (a, b) { return a.options.z - b.options.z; });
    },

    _registerLayerTemplate: function (type, layerTemplate) {
        this._drawLayerTemplates[type] = layerTemplate;
        var common = this._commonLayerProperties;
        for (var key in common) {
            if (layerTemplate[key]) continue;
            layerTemplate[key] = common[key];
        }
        // A marker to avoid creating temporary objects
        layerTemplate._viewportRectHolder = {};
    },

    _commonLayerProperties: {
        // Based on the camera options, find the Crafty coordinates corresponding to the layer's position in the viewport
        _viewportRect: function () {
            var options = this.options;
            var rect = this._viewportRectHolder;
            var scale = Math.pow(Crafty.viewport._scale, options.scaleResponse);
            var viewport = Crafty.viewport;
            rect._scale = scale;
            rect._w = viewport._width / scale;
            rect._h = viewport._height / scale;

            
            // This particular transformation is designed such that,
            // if a combination pan/scale keeps the center of the screen fixed for a layer with x/y response of 1,
            // then it will also be fixed for layers with other values for x/y response
            // (note that the second term vanishes when either the response or scale are 1)
            rect._x = options.xResponse * (-viewport._x) - 
                0.5 * (options.xResponse - 1) * (1 - 1 / scale) * viewport._width;  
            rect._y = options.yResponse * (-viewport._y) - 
                0.5 * (options.yResponse - 1) * (1 - 1 / scale) * viewport._height; 
            return rect;
        },
        // A tracker for whether any elements in this layer need to listen to mouse/touch events
        _pointerEntities: 0
    },

    /**@
     * #Crafty.createLayer
     * @kind Method
     * @category Graphics
     *
     * @sign public void Crafty.createLayer(string name, string type[, object options])
     * @param name - the name that will refer to the layer
     * @param type - the type of the draw layer to create ('DOM', 'Canvas', or 'WebGL')
     * @param options - this will override the default values of each layer
     *
     * Creates a new system which implements the specified type of layer.  The options (and their default values) are
     *
     * ```
     * {
     *   xResponse: 1,  // How the layer will pan in response to the viewport x position
     *   yResponse: 1,  // How the layer will pan in response to the viewport y position
     *   scaleResponse: 1, // How the layer will scale in response to the viewport scale.  (Layer scale will be scale^scaleResponse.)
     *   z: 0 // The zIndex of the layer relative to other layers
     * }
     * ```
     *
     * Crafty will automatically define three built-in layers: "DefaultDOMLayer", DefaultCanvasLayer",  and "DefaultWebGLLayer".
     * They will have `z` values of `30`, `20`, and `10` respectively, and will be initialized if a "DOM", "Canvas" or "WebGL" component
     * is used with an entity not attached to any user-specified layer.
     * 
     * @note Layers are implemented as systems, so the layer name must be distinct from other systems.
     * 
     * @note By default, layers will persist across scene changes.  You can manually clean up a layer by removing all it's entities and then destroying it.
     *
     * @example
     * ```
     * Crafty.createLayer("MyCanvasLayer", "Canvas")
     * Crafty.e("2D, MyCanvasLayer, Color");
     * ```
     * Define a custom canvas layer, then create an entity that uses the custom layer to render.
     *
     * @example
     * ```
     * Crafty.createLayer("UILayer", "DOM", {scaleResponse: 0, xResponse: 0, yResponse: 0})
     * Crafty.e("2D, UILayer, Text");
     * ```
     * Define a custom DOM layer that will not move with the camera.  (Useful for static UI elements!)
     *
     * @example
     * ```
     * Crafty.createLayer("MyCanvasLayer", "Canvas");
     * Crafty.s("MyCanvasLayer").one("RenderScene", function(){ this.everRendered = true; }); 
     * ```
     * Create a custom layer, and then bind a method to run the first time it renders.
     * * @example
     * ```
     * Crafty("MyCanvasLayer").destroy();
     * Crafty.s("MyCanvasLayer").destroy(); 
     * ```
     * For a previously defined "MyCanvasLayer", destroy it and all the entities rendered by it.
     */
    createLayer: function createLayer(name, type, options) {
        var layerTemplate = this._drawLayerTemplates[type];
        Crafty.s(name, layerTemplate, options);
        Crafty.c(name, {
            init: function () {
                this.requires("Renderable"); 
                
                // Flag to indicate that the base component doesn't need to attach a layer
                this._customLayer = true;
                this.requires(layerTemplate.type);
                this._attachToLayer(Crafty.s(name));
            },

            remove: function () {
                this._detachFromLayer();
            }
        });
    }
});
},{"../core/core.js":9}],33:[function(require,module,exports){
var Crafty = require('../core/core.js'),    
    document = window.document;

/**@
 * #Particles
 * @category Graphics
 * @kind Component
 * 
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
        this._particlesPaused = false;
    },

    /**@
     * #.particles
     * @comp Particles
     * @kind Method
     * 
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
            if (this._particlesPaused) return;
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
            if (typeof Crafty.rectManager.boundingRect === 'function') {
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
            if (typeof options === 'undefined') options = {};

            //Create current config by merging given options and presets.
            for (var key in this.presets) {
                if (typeof options[key] !== 'undefined') this[key] = options[key];
                else this[key] = this.presets[key];
            }

            this.emissionRate = this.maxParticles / this.lifeSpan;
            this.positionRandom = this.vectorHelpers.create(this.spread, this.spread);
        },

        addParticle: function () {
            if (this.particleCount === this.maxParticles) {
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
                if (this.duration !== -1 && this.duration < this.elapsedFrames) {
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
                    if (this.particleIndex !== this.particleCount - 1) {
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
    },
    /**@
     * #.pauseParticles
     * @comp Particles
     * @kind Method
     * 
     * @sign public this.pauseParticles()
     *
     * The pauseParticles will freeze these particles in execution.
     *
     * @example
     * ~~~
     * // start particle animation
     * var ent = Crafty.e("Particles").particles(someParticleConfig);
     *
     * // and some time later, the gameplay is paused (or only
     * // a part of it is frozen)
     * ent.pauseParticles();
     * ~~~
     */
    pauseParticles: function() {
        this._particlesPaused = true;
    },
    /**@
     * #.resumeParticles
     * @comp Particles
     * @kind Method
     * 
     * @sign public this.resumeParticles()
     *
     * The resumeParticles will resume earlier paused particles
     *
     * @example
     * ~~~
     * // start particle animation
     * var ent = Crafty.e("Particles").particles(someParticleConfig);
     *
     * // and some time later, the gameplay is paused (or only
     * // a part of it is frozen)
     * ent.pauseParticles();
     *
     * // and we resume the particles again
     * ent.resumeParticles();
     * ~~~
     */
    resumeParticles: function() {
        this._particlesPaused = false;
    }
});

},{"../core/core.js":9}],34:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Renderable
 * @category Graphics
 * @kind Component
 * 
 * Component for any entity that has a position on the stage.
 * @trigger Invalidate - when the entity needs to be redrawn
 */
Crafty.c("Renderable", {

    // Flag for tracking whether the entity is dirty or not
    _changed: false,
    
    /**@
     * #.alpha
     * @comp Renderable
     * @kind Property
     * 
     * Transparency of an entity. Must be a decimal value between 0.0 being fully transparent to 1.0 being fully opaque.
     */
    _alpha: 1.0,

    /**@
     * #.visible
     * @comp Renderable
     * @kind Property
     * 
     * If the entity is visible or not. Accepts a true or false value.
     * Can be used for optimization by setting an entities visibility to false when not needed to be drawn.
     *
     * The entity will still exist and can be collided with but just won't be drawn.
     */
    _visible: true,

    _setterRenderable: function(name, value) {
        if (this[name] === value) {
            return;
        }

        //everything will assume the value
        this[name] = value;

        // flag for redraw
        this.trigger("Invalidate");
    },

    // Setup all the properties that we need to define
    _graphics_property_definitions: {
        alpha: {
            set: function (v) {
                this._setterRenderable('_alpha', v);
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
                this._setterRenderable('_visible', v);
            },
            get: function () {
                return this._visible;
            },
            configurable: true,
            enumerable: true
        },
        _visible: {enumerable:false}
    },

    _defineRenderableProperites: function () {
        for (var prop in this._graphics_property_definitions){
            Object.defineProperty(this, prop, this._graphics_property_definitions[prop]);
        }
    },

    init: function () {
        // create setters and getters that associate properties such as alpha/_alpha
        this._defineRenderableProperites();
    },

    // Renderable assumes that a draw layer has 3 important methods: attach, detach, and dirty

    // Dirty the entity when it's invalidated
    _invalidateRenderable: function() {
        //flag if changed
        if (this._changed === false) {
            this._changed = true;
            this._drawLayer.dirty(this);
        }
    },

    // Attach the entity to a layer to be rendered
    _attachToLayer: function(layer) {
        if (this._drawLayer) {
            this._detachFromLayer();
        }
        this._drawLayer = layer;
        layer.attach(this);
        this.bind("Invalidate", this._invalidateRenderable);
        this.trigger("LayerAttached", layer);
        this.trigger("Invalidate");
    },

    // Detach the entity from a layer
    _detachFromLayer: function() {
        if (!this._drawLayer) {
            return;
        }
        this._drawLayer.detach(this);
        this.unbind("Invalidate", this._invalidateRenderable);
        this.trigger("LayerDetached", this._drawLayer);
        delete this._drawLayer;
    },

    /**@
     * #.flip
     * @comp Renderable
     * @kind Method
     * 
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
     * @comp Renderable
     * @kind Method
     * 
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
    }
});
},{"../core/core.js":9}],35:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #SpriteAnimation
 * @category Animation
 * @kind Component
 * 
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
     * @kind Method
     * 
     * Used to define reels, to change the active reel, and to fetch the id of the active reel.
     *
     * @sign public this .reel(String reelId, Duration duration, Number fromX, Number fromY, Number frameCount[, Number rowLength])
     * Defines a reel by starting and ending position on the sprite sheet.
     * @param reelId - ID of the animation reel being created
     * @param duration - The length of the animation in milliseconds.
     * @param fromX - Starting `x` position on the sprite map (x's unit is the horizontal size of the sprite in the sprite map).
     * @param fromY - `y` position on the sprite map (y's unit is the horizontal size of the sprite in the sprite map). Remains constant through the animation.
     * @param frameCount - The number of sequential frames in the animation.  If negative, the animation will play backwards.
     * @param rowLength - The number of frames in a sprite sheet row.
     *                    The sequential frames will auto-wrap to a new row when they reach the end of the current row.
     *                    This is an optional argument that defaults to `Infinity`.
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
    reel: function (reelId, duration, fromX, fromY, frameCount, rowLength) {
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


        var reel, i;

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
            rowLength = rowLength || Infinity;

            if (frameCount >= 0) { // forward animation
                for (i = 0; i < frameCount; ++i) {
                    reel.frames.push([fromX, fromY]);

                    if (++fromX >= rowLength) {
                        fromX = 0;
                        fromY++;
                    }
                }
            } else { // backward animation
                for (i = 0; i > frameCount; --i) {
                    reel.frames.push([fromX, fromY]);

                    if (--fromX < 0) {
                        fromX = rowLength - 1;
                        fromY--;
                    }
                }
            }
        }
        // @sign public this .reel(String reelId, Number duration, Array frames)
        else if (arguments.length === 3 && typeof fromX === "object") {
            reel.frames = fromX;
        }
        else {
            throw "Unrecognized arguments. Please see the documentation for 'reel(...)'.";
        }

        this._reels[reelId] = reel;

        return this;
    },

    /**@
     * #.animate
     * @comp SpriteAnimation
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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

},{"../core/core.js":9}],36:[function(require,module,exports){
var Crafty = require('../core/core.js');

// Define some variables required for webgl


Crafty.defaultShader("Sprite", new Crafty.WebGLShader(
    "attribute vec2 aPosition;\nattribute vec3 aOrientation;\nattribute vec2 aLayer;\nattribute vec2 aTextureCoord;\n\nvarying mediump vec3 vTextureCoord;\n\nuniform vec4 uViewport;\nuniform mediump vec2 uTextureDimensions;\n\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\n\nvoid main() {\n  vec2 pos = aPosition;\n  vec2 entityOrigin = aOrientation.xy;\n  mat2 entityRotationMatrix = mat2(cos(aOrientation.z), sin(aOrientation.z), -sin(aOrientation.z), cos(aOrientation.z));\n  \n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin ;\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aLayer.x) ), 1) );\n  vTextureCoord = vec3(aTextureCoord, aLayer.y);\n}",
    "varying mediump vec3 vTextureCoord;\n  \nuniform sampler2D uSampler;\nuniform mediump vec2 uTextureDimensions;\n\nvoid main(void) {\n  highp vec2 coord =   vTextureCoord.xy / uTextureDimensions;\n  mediump vec4 base_color = texture2D(uSampler, coord);\n  gl_FragColor = vec4(base_color.rgb*base_color.a*vTextureCoord.z, base_color.a*vTextureCoord.z);\n}",
    [
        { name: "aPosition",     width: 2 },
        { name: "aOrientation",  width: 3 },
        { name: "aLayer",        width: 2 },
        { name: "aTextureCoord", width: 2 }
    ],
    function(e, _entity) {
        var co = e.co;
        // Write texture coordinates
        e.program.writeVector("aTextureCoord",
            co.x, co.y,
            co.x, co.y + co.h,
            co.x + co.w, co.y,
            co.x + co.w, co.y + co.h
        );
    }
));

Crafty.extend({
    /**@
     * #Crafty.sprite
     * @kind Method
     * 
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
        var spriteName, temp, img;

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

        if (typeof tileh === "string") {
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
            this.__map = map;
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
            this._setupSpriteImage(this._drawLayer);
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
 * @kind Component
 * 
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
        this.bind("LayerAttached", this._setupSpriteImage);
    },

    remove: function(){
        this.unbind("Draw", this._drawSprite);
        this.unbind("LayerAttached", this._setupSpriteImage);
    },
    
    _setupSpriteImage: function(layer) {
        if (!this.__image || !this.img || !layer) return;
        if (layer.type === "WebGL"){
            this._establishShader(this.__image, Crafty.defaultShader("Sprite"));
            this.program.setTexture( layer.makeTexture(this.__image, this.img, false) );
        }
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
            if (vscale !== 1 || hscale !== 1) {
                style.backgroundSize = (this.img.width * hscale) + "px" + " " + (this.img.height * vscale) + "px";
            }
        } else if (e.type === "webgl") {
            // Write texture coordinates
            e.program.draw(e, this);
        }
    },

    /**@
     * #.sprite
     * @comp Sprite
     * @kind Method
     *
     * @sign public this .sprite(Number x, Number y[, Number w, Number h])
     * @param x - X cell position
     * @param y - Y cell position
     * @param w - Width in cells. Optional.
     * @param h - Height in cells. Optional.
     *
     * Uses a new location on the sprite map as its sprite.
     * If w or h are ommitted, the width and height are not changed.
     * Values should be in tiles or cells (not pixels).
     *
     * @sign public this .sprite(String tileName)
     * @param tileName - the name of a tile specified in the sprite map
     *
     * Uses a new location on the sprite map as its sprite.
     * The location is retrieved by name from the previously supplied sprite map.
     * An invalid name will be silently ignored.
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Sprite")
     *   .sprite(0, 0, 2, 2);
     *
     * Crafty.e("2D, DOM, flower")
     *   .sprite('grass');
     * ~~~
     */

    /**@
     * #.__coord
     * @comp Sprite
     * @kind Property
     *
     * The coordinate of the slide within the sprite in the format of [x, y, w, h].
     */
    sprite: function (x, y, w, h) {
        if (typeof x === 'string') { // retrieve location from sprite map by name
            var temp = this.__map[x];
            if (!temp) return this;

            x = temp[0];
            y = temp[1];
            w = temp[2] || 1;
            h = temp[3] || 1;
        }

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
     * @kind Method
     * 
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

},{"../core/core.js":9}],37:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Text
 * @category Graphics
 * @kind Component
 * 
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
 * @note For DOM (but not canvas) text entities, various font settings (such as
 * text-decoration) can be set using `.css()` (see DOM component). But
 * you cannot use `.css()` to set the properties which are controlled by `.textFont()`,
 *  `.textColor()`, or `.textAlign()` -- the settings will be ignored.
 *
 * @note If you use canvas text with glyphs that are taller than standard letters, portions of the glyphs might be cut off.
 */
Crafty.c("Text", {
    _text: "",
    defaultSize: "10px",
    defaultFamily: "sans-serif",
    defaultVariant: "normal",
    defaultLineHeight: "normal",
    defaultTextAlign: "left",
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
        this._textAlign = this.defaultTextAlign;
    },

    events: {
        "Draw": function (e) {
            var font = this._fontString();

            if (e.type === "DOM") {
                var el = this._element,
                    style = el.style;

                style.color = this._textColor;
                style.font = font;
                style.textAlign = this._textAlign;
                el.innerHTML = this._text;
            } else if (e.type === "canvas") {
                var context = e.ctx;

                context.save();

                context.textBaseline = "top";
                context.fillStyle = this._textColor || "rgb(0,0,0)";
                context.font = font;
                context.textAlign = this._textAlign;

                context.fillText(this._text, e.pos._x, e.pos._y);

                context.restore();
            }
        }
    },

    remove: function(){
        // Clean up the dynamic text update
        this.unbind(this._textUpdateEvent, this._dynamicTextUpdate);
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
     * @kind Method
     * 
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
     * If dynamic text generation is turned on, the function will then be reevaluated as necessary.
     * 
     * @see .dynamicTextGeneration
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
    _textGenerator: null,
    text: function (text) {
        if (!(typeof text !== "undefined" && text !== null)) return this._text;
        if (typeof (text) === "function"){
            this._text = text.call(this);
            this._textGenerator = text;
        } else {
            this._text = text;
            this._textGenerator = null;
        }

        if (this.has("Canvas") )
            this._resizeForCanvas();

        this.trigger("Invalidate");
        return this;
    },

    /**@
     * #.dynamicTextGeneration
     * @comp Text
     * @kind Method
     * 
     * @sign public this .dynamicTextGeneration(bool dynamicTextOn[, string textUpdateEvent])
     * @param dynamicTextOn - A flag that indicates whether dyanamic text should be on or off.
     * @param textUpdateEvent - The name of the event which will trigger text to be updated.  Defaults to "EnterFrame".  (This parameter does nothing if dynamicTextOn is false.)
     *
     * Turns on (or off) dynamic text generation for this entity.  While dynamic text generation is on, 
     * if the `.text()` method is called with a text generating function, the text will be updated each frame.
     * 
     * If textUpdateEvent is provided, text generation will be bound to that event instead of "EnterFrame".  
     * 
     * @note Dynamic text generation could cause performance issues when the entity is attached to a Canvas layer.
     *
     * @example
     * ~~~
     * Crafty.e("2D, DOM, Text, Motion").attr({ x: 100, y: 100, vx: 10 })
     *     .text(function () { return "My position is " + this._x })
     *     .dynamicTextGeneration(true)
     * ~~~
     * The above example will update the text with the entities position as it changes.
     */
    _dynamicTextOn: false,
    _textUpdateEvent: null,
    _dynamicTextUpdate: function(){
        if (!this._textGenerator) return;
        this.text(this._textGenerator);
    },
    dynamicTextGeneration: function(dynamicTextOn, textUpdateEvent) {
        this.unbind(this._textUpdateEvent, this._dynamicTextUpdate);
        if (dynamicTextOn) {
            this._textUpdateEvent = textUpdateEvent || "EnterFrame";
            this.bind(this._textUpdateEvent, this._dynamicTextUpdate);
        }
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

        /* Offset the MBR for text alignment*/
        if (this._textAlign === 'left' || this._textAlign === 'start') {
            this.offsetBoundary(0, 0, 0, 0);
        } else if (this._textAlign === 'center') {
            this.offsetBoundary(this.w/2, 0, -this.w/2, 0);
        } else if (this._textAlign === 'end' || this._textAlign === 'right') {
            this.offsetBoundary(this.w, 0, -this.w, 0);
        }
    },

    // Returns the font string to use
    _fontString: function(){
        return this._textFont.type + ' ' + this._textFont.variant  + ' ' + this._textFont.weight + ' ' + this._textFont.size  + ' / ' + this._textFont.lineHeight + ' ' + this._textFont.family;
    },
    /**@
     * #.textColor
     * @comp Text
     * @kind Method
     * 
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
     * #.textAlign
     * @comp Text
     * @kind Method
     * 
     * @sign public this .textAlign(String alignment)
     * @param alignment - The new alignment of the text.
     *
     * Change the alignment of the text. Valid values are 'start', 'end, 'left', 'center', or 'right'.
     */
    textAlign: function(alignment) {
        this._textAlign = alignment;
        if (this.has("Canvas"))
            this._resizeForCanvas();
        this.trigger("Invalidate");
        return this;
    },

    /**@
     * #.textFont
     * @comp Text
     * @kind Method
     * 
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
                    if(propertyKey === 'family'){
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
     * @kind Method
     * 
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

},{"../core/core.js":9}],38:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

Crafty.extend({
    /**@
     * #Crafty.viewport
     * @category Stage
     * @kind Property
     * 
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
         * @kind Property
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
         * @kind Property
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
         * @kind Property
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
         * @kind Property
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
         * @kind Property
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
         * @kind Method
         * 
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

        /**@
         * #Crafty.viewport.rect
         * @comp Crafty.viewport
         * @kind Method
         * 
         * @sign public Object Crafty.viewport.rect([Object out])
         * @param Object out - an optional Object to write the `rect` to
         * @return a rectangle encompassing the currently visible viewport region.
         *         Contains the `_x`,`_y`,`_w`,`_h` properties.
         *
         * Convenience method which returns a `rect` of the currently visible viewport region.
         * With no supplied `out` parameter, this method returns an internally reused object across invocations.
         * If you want to save the viewport region for later use, pass an `out` argument instead, where the region will be written to.
         *
         * @example
         * The `rect` is equivalent to the following properties:
         * ~~~
         * var rect = Crafty.viewport.rect();
         *
         * rect._x === -Crafty.viewport._x
         * rect._y === -Crafty.viewport._y
         * rect._w === Crafty.viewport._width / Crafty.viewport._scale
         * rect._h === Crafty.viewport._height / Crafty.viewport._scale
         * ~~~
         */
        rect: function (out) {
            out = out || this.rect_object;
            out._x = -this._x;
            out._y = -this._y;
            out._w = this._width / this._scale;
            out._h = this._height / this._scale;
            return out;
        },

        /**@ 

         * #Crafty.viewport.pan
         * @comp Crafty.viewport
         * @kind Method
         * 
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
                if (dx === 'reset') {
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
         * @kind Method
         * 
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
                offx = (typeof offsetx !== 'undefined') ? offsetx : 0;
                offy = (typeof offsety !== 'undefined') ? offsety : 0;

                target.bind('Move', change);
                target.bind('ViewportScale', change);
                target.bind('ViewportResize', change);
                change.call(target);
            };
        })(),

        /**@
         * #Crafty.viewport.centerOn
         * @comp Crafty.viewport
         * @kind Method
         * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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

            return function (op, arg) {
                if (typeof op === 'boolean') {
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
                    var diff = {
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
            var bound = Crafty.clone(this.bounds) || Crafty.clone(Crafty.map.boundaries());
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
         * @comp Crafty.stage
         * @kind Method
         * 
         * @sign public void Crafty.viewport.init([Number width, Number height, String stage_elem])
         * @sign public void Crafty.viewport.init([Number width, Number height, HTMLElement stage_elem])
         * @param Number width - Width of the viewport
         * @param Number height - Height of the viewport
         * @param String or HTMLElement stage_elem - the element to use as the stage (either its id or the actual element).
         *
         * Initialize the viewport.
         * If the arguments 'width' or 'height' are missing, use `window.innerWidth` and `window.innerHeight` (full screen model).
         * The argument 'stage_elem' is used to specify a stage element other than the default, and can be either a string or an HTMLElement.  If a string is provided, it will look for an element with that id and, if none exists, create a div.  If an HTMLElement is provided, that is used directly.  Omitting this argument is the same as passing an id of 'cr-stage'.
         *
         * Usually you don't have to initialize the viewport by yourself, it's automatically initialized by calling `Crafty.init()`. Multiple `init`s will create redundant stage elements. Use `Crafty.viewport.width`, `Crafty.viewport.height` or `Crafty.viewport.reload` to adjust the current viewport's dimensions.
         *
         * @see Crafty.device, Crafty.domHelper, Crafty.stage, Crafty.viewport.reload
         */
        init: function (w, h, stage_elem) {
            // Define default graphics layers with default z-layers
            Crafty.createLayer("DefaultCanvasLayer", "Canvas", {z: 20});
            Crafty.createLayer("DefaultDOMLayer", "DOM", {z: 30});
            Crafty.createLayer("DefaultWebGLLayer", "WebGL", {z: 10});
            
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
             * @kind CoreObject
             * 
             * The stage where all the DOM entities will be placed.
             */

            /**@
             * #Crafty.stage.elem
             * @comp Crafty.stage
             * @kind Property
             * 
             * The `#cr-stage` div element.
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
         * @kind Method
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
         * @kind Method
         * 
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
         * @kind Method
         * 
         * @sign public Crafty.viewport.onScreen(Object rect)
         * @param rect - A rectangle with field {_x: x_val, _y: y_val, _w: w_val, _h: h_val}
         *
         * Test if a rectangle is completely in viewport
         */
        onScreen: function (rect) {
            return Crafty.viewport._x + rect._x + rect._w > 0 && Crafty.viewport._y + rect._y + rect._h > 0 &&
                Crafty.viewport._x + rect._x < Crafty.viewport.width && Crafty.viewport._y + rect._y < Crafty.viewport.height;
        }
    }
});

},{"../core/core.js":9}],39:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

// Object for abstracting out all the gl calls to handle rendering entities with a particular program
function RenderProgramWrapper(layer, shader){
    this.shader = shader;
    this.layer = layer;
    this.context = layer.context;
    this.draw = function() { };

    this.array_size = 16;
    this.max_size = 1024;
    this._indexArray = new Uint16Array(6 * this.array_size);
    this._indexBuffer = layer.context.createBuffer();
}

RenderProgramWrapper.prototype = {
    // Takes an array of attributes; see WebGLLayer's getProgramWrapper method
    initAttributes: function(attributes) {
        this.attributes = attributes;
        this._attribute_table = {};
        var offset = 0;
        for (var i = 0; i < attributes.length; i++) {
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
        this._attributeArray = new Float32Array(this.array_size * 4 * this.stride);
        this._attributeBuffer = this.context.createBuffer();
        this._registryHoles = [];
        this._registrySize = 0;
    },

    // increase the size of the typed arrays
    // does so by creating a new array of that size and copying the existing one into it
    growArrays: function(size) {
        if (this.array_size >= this.max_size) return;

        var newsize = Math.min(size, this.max_size);

        var newAttributeArray = new Float32Array(newsize * 4 * this.stride);
        var newIndexArray = new Uint16Array(6 * newsize);

        newAttributeArray.set(this._attributeArray);
        newIndexArray.set(this._indexArray);

        this._attributeArray = newAttributeArray;
        this._indexArray = newIndexArray;
        this.array_size = newsize;
    },

    // Add an entity that needs to be rendered by this program
    // Needs to be assigned an index in the buffer
    registerEntity: function(e) {
        if (this._registryHoles.length === 0) {
            if (this._registrySize >= this.max_size) {
                throw ("Number of entities exceeds maximum limit.");
            } else if (this._registrySize >= this.array_size) {
                this.growArrays(2 * this.array_size);
            }
            e._glBufferIndex = this._registrySize;
            this._registrySize++;
        } else {
            e._glBufferIndex = this._registryHoles.pop();
        }
    },

    // remove an entity; allow its buffer index to be reused
    unregisterEntity: function(e) {
        if (typeof e._glBufferIndex === "number")
            this._registryHoles.push(e._glBufferIndex);
        e._glBufferIndex = null;
    },

    resetRegistry: function() {
        this._maxElement = 0;
        this._registryHoles.length = 0;
    },

    setCurrentEntity: function(ent) {
        // offset is 4 * buffer index, because each entity has 4 vertices
        this.ent_offset = ent._glBufferIndex * 4;
        this.ent = ent;
    },

    // Called before a batch of entities is prepped for rendering
    switchTo: function() {
        var gl = this.context;
        gl.useProgram(this.shader);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._attributeBuffer);
        var a, attributes = this.attributes;
        // Process every attribute
        for (var i = 0; i < attributes.length; i++) {
            a = attributes[i];
            gl.vertexAttribPointer(a.location, a.width, a.type, false, this.stride * a.bytes, a.offset * a.bytes);
        }

        // For now, special case the need for texture objects
        var t = this.texture_obj;
        if (t && t.unit === null) {
            this.layer.texture_manager.bindTexture(t);
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
    addIndices: function(offset) {
        var index = this._indexArray, l = this.index_pointer;
        index[0 + l] = 0 + offset;
        index[1 + l] = 1 + offset;
        index[2 + l] = 2 + offset;
        index[3 + l] = 1 + offset;
        index[4 + l] = 2 + offset;
        index[5 + l] = 3 + offset;
        this.index_pointer += 6;
    },


    // Writes data from the attribute and index arrays to the appropriate buffers, and then calls drawElements.
    renderBatch: function() {
        var gl = this.context;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._attributeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._attributeArray, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indexArray, gl.STATIC_DRAW);
        gl.drawElements(gl.TRIANGLES, this.index_pointer, gl.UNSIGNED_SHORT, 0);
    },

    setViewportUniforms: function(viewport, cameraOptions) {
        var gl = this.context;
        gl.useProgram(this.shader);
        gl.uniform4f(this.shader.viewport, -viewport._x, -viewport._y, viewport._w , viewport._h );
    },

    // Fill in the attribute with the given arguments, cycling through the data if necessary
    // If the arguments provided match the width of the attribute, that means it'll fill the same values for each of the four vertices.
    // TODO determine if this abstraction is a performance hit!
    writeVector: function(name, x, y) {
        var a = this._attribute_table[name];
        var stride = this.stride, offset = a.offset + this.ent_offset * stride, w = a.width;
        var l = (arguments.length - 1);
        var data = this._attributeArray;

        for (var r = 0; r < 4; r++)
            for (var c = 0; c < w; c++) {
                data[offset + stride * r + c] = arguments[(w * r + c) % l + 1];
            }
    }
};

/**@
 * #WebGLLayer
 * @category Graphics
 * @kind System
 *
 * A collection of methods to handle webgl contexts.
 */
Crafty._registerLayerTemplate("WebGL", {
    type: "WebGL",
    // Layer options
    options: {
        xResponse: 1,
        yResponse: 1,
        scaleResponse: 1,
        z: 0
    },
    /**@
     * #.context
     * @comp WebGLLayer
     * @kind Property
     *
     * This will return the context of the webgl canvas element.
     */
    context: null,
    changed_objects: [],

    // Create a vertex or fragment shader, given the source and type
    _compileShader: function(src, type) {
        var gl = this.context;
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw (gl.getShaderInfoLog(shader));
        }
        return shader;
    },

    // Create and return a complete, linked shader program, given the source for the fragment and vertex shaders.
    // Will compile the two shaders and then link them together
    _makeProgram: function(shader) {
        var gl = this.context;
        var fragmentShader = this._compileShader(shader.fragmentCode, gl.FRAGMENT_SHADER);
        var vertexShader = this._compileShader(shader.vertexCode, gl.VERTEX_SHADER);

        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            throw ("Could not initialise shaders");
        }

        shaderProgram.viewport = gl.getUniformLocation(shaderProgram, "uViewport");
        return shaderProgram;
    },

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
    getProgramWrapper: function(name, shader) {
        if (this.programs[name] === undefined) {
            var compiledShader = this._makeProgram(shader);
            var program = new RenderProgramWrapper(this, compiledShader);
            program.name = name;
            program.initAttributes(shader.attributeList);
            program.draw = shader.drawCallback;
            program.setViewportUniforms(this._viewportRect(), this.options);
            this.programs[name] = program;
        }
        return this.programs[name];
    },

    // Make a texture out of the given image element
    // The url is just used as a unique ID
    makeTexture: function(url, image, repeating) {
        return this.texture_manager.makeTexture(url, image, repeating);
    },

    init: function() {

        //check if we support webgl is supported
        if (!Crafty.support.webgl) {
            Crafty.trigger("NoWebGL");
            Crafty.stop();
            return;
        }

        // Avoid shared state between systems
        this.changed_objects = [];
        this.programs = {};

        //create an empty canvas element
        var c;
        c = document.createElement("canvas");
        c.width = Crafty.viewport.width;
        c.height = Crafty.viewport.height;
        c.style.position = 'absolute';
        c.style.left = "0px";
        c.style.top = "0px";
        c.style.zIndex = this.options.z;

        Crafty.stage.elem.appendChild(c);

        // Try to get a webgl context
        var gl;
        try {
            gl = c.getContext("webgl", { premultipliedalpha: true }) || c.getContext("experimental-webgl", { premultipliedalpha: true });
            gl.viewportWidth = c.width;
            gl.viewportHeight = c.height;
        } catch (e) {
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
        this.uniqueBind("RenderScene", this.render);
        this.uniqueBind("ViewportResize", this._resize);
        this.uniqueBind("InvalidateViewport", function() { this.dirtyViewport = true; });
        this.uniqueBind("PixelartSet", this._setPixelart);
        this._setPixelart(Crafty._pixelartEnabled);
        this.dirtyViewport = true;

        this.texture_manager = new Crafty.TextureManager(gl, this);
        Crafty._addDrawLayerInstance(this);
    },

    // Cleanup the DOM when the system is destroyed
    remove: function() {
        this._canvas.parentNode.removeChild(this._canvas);
        Crafty._removeDrawLayerInstance(this);
    },

    // Called when the viewport resizes
    _resize: function() {
        var c = this._canvas;
        c.width = Crafty.viewport.width;
        c.height = Crafty.viewport.height;

        var gl = this.context;
        gl.viewportWidth = c.width;
        gl.viewportHeight = c.height;
    },

    // TODO consider shifting to texturemanager
    _setPixelart: function(enabled) {
        var gl = this.context;
        if (enabled) {
            this.texture_filter = gl.NEAREST;
        } else {
            this.texture_filter = gl.LINEAR;
        }
    },

    // convenicne to sort array by global Z
    zsort: function(a, b) {
        return a._globalZ - b._globalZ;
    },

    // Hold an array ref to avoid garbage
    visible_gl: [],

    // Render any entities associated with this context; called in response to a draw event
    render: function(rect) {
        rect = rect || this._viewportRect();
        var gl = this.context;

        // Set viewport and clear it
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //Set the viewport uniform variables used by each registered program
        var programs = this.programs;
        if (this.dirtyViewport) {
            var view = this._viewportRect();
            for (var comp in programs) {
                programs[comp].setViewportUniforms(view, this.options);
            }
            this.dirtyViewport = false;
        }

        // Search for any entities in the given area (viewport unless otherwise specified)
        var q = Crafty.map.search(rect),
            i = 0,
            l = q.length,
            current;
        //From all potential candidates, build a list of visible entities, then sort by zorder
        var visible_gl = this.visible_gl;
        visible_gl.length = 0;
        for (i = 0; i < l; i++) {
            current = q[i];
            if (current._visible && current.program && (current._drawLayer === this)) {
                visible_gl.push(current);
            }
        }
        visible_gl.sort(this.zsort);
        l = visible_gl.length;


        // Now iterate through the z-sorted entities to be rendered
        // Each entity writes it's data into a typed array
        // The entities are rendered in batches, where the entire array is copied to a buffer in one operation
        // A batch is rendered whenever the next element needs to use a different type of program
        // Therefore, you get better performance by grouping programs by z-order if possible.
        // (Each sprite sheet will use a different program, but multiple sprites on the same sheet can be rendered in one batch)
        var shaderProgram = null;
        for (i = 0; i < l; i++) {
            current = visible_gl[i];
            if (shaderProgram !== current.program) {
                if (shaderProgram !== null) {
                    shaderProgram.renderBatch();
                }

                shaderProgram = current.program;
                shaderProgram.index_pointer = 0;
                shaderProgram.switchTo();
            }
            current.draw();
            current._changed = false;
        }

        if (shaderProgram !== null) {
            shaderProgram.renderBatch();
        }

    },

    /**@
     * #.dirty
     * @comp WebGLLayer
     * @kind Method
     * @private
     * 
     * @sign public .dirty(ent)
     * @param ent - The entity to mark as dirty
     *
     * Add an entity to the list of DOM object to draw
     */
    dirty: function dirty(ent) {
        // WebGL doens't need to do any special tracking of changed objects
    },

    /**@
     * #.attach
     * @comp WebGLLayer
     * @kind Method
     * @private
     * 
     * @sign public .attach(ent)
     * @param ent - The entity to add
     *
     * Add an entity to the layer
     */
    attach: function attach(ent) {
        // WebGL entities really need to be added to a specific program, which is handled in the LayerAttached event by components
        ent._drawContext = this.context;
    },

    /**@
     * #.detach
     * @comp WebGLLayer
     * @kind Method
     * @private
     * 
     * @sign public .detach(ent)
     * @param ent - The entity to remove
     *
     * Removes an entity from the layer
     */
    detach: function detach(ent) {
        // This could, like attach, be handled by components
        // We instead handle it in a central place for now
        if (ent.program) {
            ent.program.unregisterEntity(ent);
        }
    }

});


},{"../core/core.js":9}],40:[function(require,module,exports){
var Crafty = require('../core/core.js');

/**@
 * #WebGL
 * @category Graphics
 * @kind Component
 * 
 * @trigger Draw - when the entity is ready to be drawn to the stage - {type: "canvas", pos, co, ctx}
 * @trigger NoCanvas - if the browser does not support canvas
 *
 * When this component is added to an entity it will be drawn to the global webgl canvas element. Its canvas element (and hence any WebGL entity) is always rendered below any DOM entities.
 *
 * Sprite, Image, SpriteAnimation, and Color all support WebGL rendering.  Text entities will need to use DOM or Canvas for now.
 *
 * If a webgl context does not yet exist, a WebGL entity will automatically create one.
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

Crafty.extend({
    /**@
     * #Crafty.WebGLShader
     * @category Graphics
     * @kind Method
     * 
     * @sign public Crafty.WebGLShader Crafty.WebGLShader(String vertexShaderCode, String fragmentShaderCode, Array attributeList, Function drawCallback(e, entity))
     * @param vertexShaderCode - GLSL code for the vertex shader
     * @param fragmentShaderCode - GLSL code for the fragment shader
     * @param attributeList - List of variable names with their vertex length
     * @param drawCallback - Function that pushes all attribute values to WebGL.
     *
     * Assigns or fetches a default shader for a component.
     *
     * This allows the default shader for a component to be overridden, and therefor allows
     * developers to override the default shader behaviour with more complex shaders.
     *
     * @example
     * Let's say we want to extend sprite to draw the images in grayscale when we
     * set a `grayscale: true` attribute.
     * ~~~
     * var recoloredSprite = new Crafty.WebGLShader(
     *   // The vertex shader
     *   "attribute vec2 aPosition;\n" +
     *   "attribute vec3 aOrientation;\n" +
     *   "attribute vec2 aLayer;\n" +
     *   "attribute vec2 aTextureCoord;\n" +
     *   "attribute vec2 aGrayscale;\n" + // Addition of our grayscale
     *   "varying mediump vec3 vTextureCoord;\n" +
     *   "varying mediump vec2 vGrayscale;\n" + // passing attribute to fragment shader
     *   "uniform vec4 uViewport;\n" +
     *   "uniform mediump vec2 uTextureDimensions;\n" +
     *   "mat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\n" +
     *   "vec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\n" +
     *   "void main() {\n" +
     *   "  vec2 pos = aPosition;\n" +
     *   "  vec2 entityOrigin = aOrientation.xy;\n" +
     *   "  mat2 entityRotationMatrix = mat2(cos(aOrientation.z), sin(aOrientation.z), -sin(aOrientation.z), cos(aOrientation.z));\n" +
     *   "  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin ;\n" +
     *   "  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aLayer.x) ), 1) );\n" +
     *   "  vTextureCoord = vec3(aTextureCoord, aLayer.y);\n" +
     *   "  vGrayscale = aGrayscale;\n" + // Assigning the grayscale for fragment shader
     *   "}",
     *   // The fragment shader
     *   "precision mediump float;\n" +
     *   "varying mediump vec3 vTextureCoord;\n" +
     *   "varying mediump vec2 vGrayscale;\n" +
     *   "uniform sampler2D uSampler;\n " +
     *   "uniform mediump vec2 uTextureDimensions;\n" +
     *   "void main() {\n" +
     *   "  highp vec2 coord =   vTextureCoord.xy / uTextureDimensions;\n" +
     *   "  mediump vec4 base_color = texture2D(uSampler, coord);\n" +
     *   "  if (vGrayscale.x == 1.0) {\n" +
     *   "    mediump float lightness = (0.2126*base_color.r + 0.7152*base_color.g + 0.0722*base_color.b);\n" +
     *   "    lightness *= base_color.a * vTextureCoord.z; // Premultiply alpha\n" +
     *   "    gl_FragColor = vec4(lightness, lightness, lightness, base_color.a*vTextureCoord.z);\n" +
     *   "  } else {\n" +
     *   "    gl_FragColor = vec4(base_color.rgb*base_color.a*vTextureCoord.z, base_color.a*vTextureCoord.z);\n" +
     *   "  }\n" +
     *   "}",
     *   [
     *     { name: "aPosition",     width: 2 },
     *     { name: "aOrientation",  width: 3 },
     *     { name: "aLayer",        width: 2 },
     *     { name: "aTextureCoord", width: 2 },
     *     { name: "aGrayscale",    width: 2 }
     *   ],
     *   function(e, entity) {
     *     var co = e.co;
     *     // Write texture coordinates
     *     e.program.writeVector("aTextureCoord",
     *       co.x, co.y,
     *       co.x, co.y + co.h,
     *       co.x + co.w, co.y,
     *       co.x + co.w, co.y + co.h
     *     );
     *     // Write our grayscale attribute
     *     e.program.writeVector("aGrayscale",
     *       entity.grayscale ? 1.0 : 0.0,
     *       0.0
     *     );
     *   }
     * );
     * ~~~
     *
     * It seems like a lot of work, but most of the above code is the default Crafty shader code.
     * When you get the hang of it, it is really easy to extend for your own effects. And remember
     * you only need to write it once, and suddenly all sprite entities have extra effects available.
     *
     * @see Crafty.defaultShader
     * @see Sprite
     * @see Image
     * @see Color
     * @see WebGL
     */
    WebGLShader: function(vertexCode, fragmentCode, attributeList, drawCallback){
        this.vertexCode = vertexCode;
        this.fragmentCode = fragmentCode;
        this.attributeList = attributeList;
        this.drawCallback = drawCallback;
    },
    /**@
     * #Crafty.defaultShader
     * @category Graphics
     * @kind Method
     * 
     * @sign public Crafty.WebGLShader Crafty.defaultShader(String component[, Crafty.WebGLShader shader])
     * @param component - Name of the component to assign a default shader to
     * @param shader - New default shader to assign to a component
     *
     * Assigns or fetches a default shader for a component.
     *
     * This allows the default shader for a component to be overridden, and therefor allows
     * developers to override the default shader behaviour with more complex shaders.
     *
     * @example
     * Let's say we want to set the grayscale enabled shader from the example of the WebGLShader
     * as default for sprites:
     * ~~~
     * Crafty.defaultShader("Sprite", recoloredSprite);
     * ~~~
     *
     * @see Crafty.WebGLShader
     * @see Sprite
     * @see Image
     * @see Color
     * @see WebGL
     */
    defaultShader: function(component, shader) {
        this._defaultShaders = (this._defaultShaders || {});
        if (arguments.length === 1 ){
            return this._defaultShaders[component];
        }
        this._defaultShaders[component] = shader;
    },

});

Crafty.c("WebGL", {
    /**@
     * #.context
     * @comp WebGL
     * @kind Property
     *
     * The webgl context this entity will be rendered to.
     */
    init: function () {
        this.requires("Renderable");
        // Attach to webgl layer
        if (!this._customLayer){
            this._attachToLayer( Crafty.s("DefaultWebGLLayer") );
        }
    },
 
    remove: function(){
        this._detachFromLayer();
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
     * @kind Method
     * @private
     * 
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
            ctx = this._drawLayer.context;
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
        var gl = this._drawContext;
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
    _establishShader: function(compName, shader){
        this.program = this._drawLayer.getProgramWrapper(compName, shader);

        // Needs to know where in the big array we are!
        this.program.registerEntity(this);
        // Shader program means ready
        this.ready = true;
    }
});

},{"../core/core.js":9}],41:[function(require,module,exports){
var Crafty = require('../core/core.js');


Crafty.extend({
    /**@
     * #Crafty.diamondIso
     * @category 2D
     * @kind CoreObject
     * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
                            var tHeight=obj.h/this._tile.height;
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
            var inX = x>0 && x<this._map.width;
            var inY = y>0 && y<this._map.height;
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

},{"../core/core.js":9}],42:[function(require,module,exports){
var Crafty = require('../core/core.js');


Crafty.extend({
    /**@
     * #Crafty.isometric
     * @category 2D
     * @kind CoreObject
     * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
            obj.x = pos.left + Crafty.viewport._x;
            obj.y = pos.top + Crafty.viewport._y;
            obj.z += z;
            return this;
        },
        /**@
         * #Crafty.isometric.pos2px
         * @comp Crafty.isometric
         * @kind Method
         * 
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
         * @kind Method
         * 
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
         * @kind Method
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
            if (typeof x === "number" && typeof y === "number") {
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
         * @kind Method
         * 
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

},{"../core/core.js":9}],43:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    document = window.document;

Crafty.extend({
    /**@
     * #Crafty.audio
     * @category Audio
     * @kind CoreObject
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
         * @kind Method
         * 
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
         * @kind Method
         * @private
         * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
                if (s.played < c.repeat || c.repeat === -1) {
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
            var c;
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
         * @kind Method
         * @kind private
         * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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
         * @kind Method
         * 
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

},{"../core/core.js":9}],44:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    HashMap = require('./spatial-grid.js');



/**@
 * #Crafty.map
 * @category 2D
 * @kind CoreObject
 * 
 * Functions related with querying entities.
 * @see Crafty.HashMap
 */
Crafty.map = new HashMap();
var M = Math,
    //Mc = M.cos,
    //Ms = M.sin,
    PI = M.PI,
    DEG_TO_RAD = PI / 180;

/**@
 * #2D
 * @category 2D
 * @kind Component
 * 
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
     * @kind Property
     * 
     * The `x` position on the stage. When modified, will automatically be redrawn.
     * Is actually a getter/setter so when using this value for calculations and not modifying it,
     * use the `._x` property.
     * @see ._setter2d
     */
    _x: 0,
    /**@
     * #.y
     * @kind Property
     * 
     * @comp 2D
     * The `y` position on the stage. When modified, will automatically be redrawn.
     * Is actually a getter/setter so when using this value for calculations and not modifying it,
     * use the `._y` property.
     * @see ._setter2d
     */
    _y: 0,
    /**@
     * #.w
     * @comp 2D
     * @kind Property
     * 
     * The width of the entity. When modified, will automatically be redrawn.
     * Is actually a getter/setter so when using this value for calculations and not modifying it,
     * use the `._w` property.
     *
     * Changing this value is not recommended as canvas has terrible resize quality and DOM will just clip the image.
     * @see ._setter2d
     */
    _w: 0,
    /**@
     * #.h
     * @comp 2D
     * @kind Property
     * 
     * The height of the entity. When modified, will automatically be redrawn.
     * Is actually a getter/setter so when using this value for calculations and not modifying it,
     * use the `._h` property.
     *
     * Changing this value is not recommended as canvas has terrible resize quality and DOM will just clip the image.
     * @see ._setter2d
     */
    _h: 0,

    /**@
     * #.z
     * @comp 2D
     * @kind Property
     * 
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
     * #._globalZ
     * @comp 2D
     * @kind Property
     * 
     * When two entities overlap, the one with the larger `_globalZ` will be on top of the other.
     */
    _globalZ: null,

    /**@
     * #.rotation
     * @comp 2D
     * @kind Property
     * 
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
     * @see ._setter2d, .origin
     */
    _rotation: 0,

    _origin: null,
    _mbr: null,
    _entry: null,
    _children: null,
    _parent: null,

    // Setup   all the properties that we need to define
    _2D_property_definitions: {
        x: {
            set: function (v) {
                this._setter2d('_x', v);
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
                this._setter2d('_y', v);
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
                this._setter2d('_w', v);
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
                this._setter2d('_h', v);
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
                this._setter2d('_z', v);
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
                this._setter2d('_rotation', v);
            },
            get: function () {
                return this._rotation;
            },
            configurable: true,
            enumerable: true
        },
        _rotation: {enumerable:false}
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

            Crafty.map.remove(this._entry);

            this.detach();
        });
    },


    /**@
     * #.offsetBoundary
     * @comp 2D
     * @kind Method
     * 
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
        //var theta = -1 * (v % 360); //angle always between 0 and 359
        var difference = this._rotation - v;
        // skip if there's no rotation!
        if (difference === 0)
            return;
        else
            this._rotation = v;

        //Calculate the new MBR
        var //rad = theta * DEG_TO_RAD,
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
     * @kind Method
     * 
     * @sign public Number .area(void)
     * Calculates the area of the entity
     */
    area: function () {
        return this._w * this._h;
    },

    /**@
     * #.intersect
     * @comp 2D
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
     * @sign public Object .pos([Object pos])
     * @param pos - an object to use as output
     * @returns an object with `_x`, `_y`, `_w`, and `_h` properties; if an object is passed in, it will be reused rather than creating a new object.
     *
     * Return an object containing a copy of this entity's bounds (`_x`, `_y`, `_w`, and `_h` values).
     *
     * @note The keys have an underscore prefix. This is due to the x, y, w, h properties
     * being setters and getters that wrap the underlying properties with an underscore (_x, _y, _w, _h).
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
     * @kind Method
     * 
     * @sign public Object .mbr([Object mbr])
     * @param mbr - an object to use as output
     * @returns an object with `_x`, `_y`, `_w`, and `_h` properties; if an object is passed in, it will be reused rather than creating a new object.
     *
     * Return an object containing a copy of this entity's minimum bounding rectangle.
     * The MBR encompasses a rotated entity's bounds.
     * If there is no rotation on the entity it will return its bounds (`.pos()`) instead.
     *
     * @note The keys have an underscore prefix. This is due to the x, y, w, h properties
     * being setters and getters that wrap the underlying properties with an underscore (_x, _y, _w, _h).
     *
     * @see .pos
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * @private
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
            if (this._children[i] === obj) {
                this._children.splice(i, 1);
            }
        }
        obj._parent = null;

        return this;
    },

    /**@
     * #.origin
     * @comp 2D
     * @kind Method
     * 
     * @sign public this .origin(Number x, Number y)
     * @param x - Pixel value of origin offset on the X axis
     * @param y - Pixel value of origin offset on the Y axis
     *
     * @sign public this .origin(String offset)
     * @param offset - Alignment identifier, which is a combination of center, top, bottom, middle, left and right
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
     * The origin should be set before changing the `rotation`,
     * since it does not apply retroactively.
     * Additionally, setting the origin via an alignment identifier works only
     * after the entity's dimensions have been set.
     * These points are shown in the following example:
     *
     * @example
     * ~~~
     * Crafty.e("2D")
     *       .attr({w: 100, h: 100})
     *       .origin('center')
     *       .attr({x: 25, y: 25, rotation: 180});
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

    /**
     * Method for rotation rather than through a setter
     */
    rotate: function (e) {
        var x2, y2;
        x2 =  (this._x + this._origin.x - e.o.x) * e.cos + (this._y + this._origin.y - e.o.y) * e.sin + (e.o.x - this._origin.x);
        y2 =  (this._y + this._origin.y - e.o.y) * e.cos - (this._x + this._origin.x - e.o.x) * e.sin + (e.o.y - this._origin.y);
        this._setter2d('_rotation', this._rotation - e.deg);
        this._setter2d('_x', x2 );
        this._setter2d('_y', y2 );
    },

    // This is a setter method for all 2D properties including
    // x, y, w, h, and rotation.
    _setter2d: function (name, value) {
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

        } else if (name === '_z') {
            var intValue = value << 0;
            value = value === intValue ? intValue : intValue+1;
            this._globalZ = value * 100000 + this[0]; //magic number 10^5 is the max num of entities
            this[name] = value;
            this.trigger("Reorder");
        }

        //everything will assume the value
        this[name] = value;

        // flag for redraw
        this.trigger("Invalidate");

        Crafty.rectManager._pool.recycle(old);
    }
});




/**@
 * #Crafty.polygon
 * @category 2D
 * @kind Class
 *
 * The constructor for a polygon object used for hitboxes and click maps. Takes a set of points as an
 * argument, giving alternately the x and y coordinates of the polygon's vertices in order.
 *
 * For a polygon of `n` edges exactly `n` vertex coordinate pairs should be passed to the constructor.
 * It is advised to pass the vertices in a clockwise order.
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
     * @kind Method
     * 
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
            if (((p[2*i+1] > y) !== (p[2*j+1] > y)) && (x < (p[2*j] - p[2*i]) * (y - p[2*i+1]) / (p[2*j+1] - p[2*i+1]) + p[2*i])) {
                c = !c;
            }
        }

        return c;
    },

    /**@
     * #.shift
     * @comp Crafty.polygon
     * @kind Method
     * 
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
     * @kind Method
     * 
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
    },

    /**@
     * #.intersectRay
     * @comp Crafty.polygon
     * @kind Method
     * 
     * @sign public Number .intersectRay(Object origin, Object direction)
     * @param origin - the point of origin from which the ray will be cast. The object must contain the properties `_x` and `_y`.
     * @param direction - the direction the ray will be cast. It must be normalized. The object must contain the properties `x` and `y`.
     * @returns a Number indicating the distance from the ray's origin to the closest intersection point of the polygon.
     *          Returns `Infinity` if there is no intersection.
     *
     * Find the distance to the closest intersection point of the supplied ray with any of this polygon's segments.
     *
     * @example
     * ~~~
     * var poly = new Crafty.polygon([0,0, 50,0, 50,50, 0,50]);
     *
     * var origin = {_x: -1, _y: 25};
     * var direction = new Crafty.math.Vector2D(1, 0).normalize();;
     *
     * var distance = poly.intersectRay(origin, direction);
     * Crafty.log('Distance from origin to closest intersection point', distance); // logs '1'
     * ~~~
     */

    // Note that for the algorithm to work, the points of the polygon have to be defined
    // either clock-wise or counter-clock-wise
    //
    // Segment-segment intersection is described here: http://stackoverflow.com/a/565282/3041008
    // see dot projection: http://www.wildbunny.co.uk/blog/vector-maths-a-primer-for-games-programmers/vector/#Projection
    //
    // origin = {_x, _y}
    // direction = {x, y}, must be normalized
    // edge = end - start (of segment)
    //
    //
    // # Segment - segment intersection equation
    // origin + d * direction = start + e * edge
    //
    // ## Solving for d
    // (origin + d * direction) x edge = (start + e * edge) x edge
    // edge x edge == 0
    // d = (start − origin) × edge / (direction × edge)
    // d_nominator = (start - origin) x edge =
    //      (start.x - origin.x, start.y - origin.y) x (edge.x, edge.y) =
    //      (start.x - origin.x) * edge.y - (start.y - origin.y) * edge.x
    // d_denominator = direction x edge =
    //      (direction.x, direction.y) x (edge.x, edge.y) =
    //      direction.x * edge.y - direction.y * edge.x
    //
    // ## Solving for e
    // (origin + d * direction) x direction = (start + e * edge) x direction
    // direction x direction == 0
    // edge factor must be in interval [0, 1]
    // e = (start − origin) × direction / (direction × edge)
    // e_nominator = (start − origin) × direction =
    //      (start.x - origin.x) * direction.y - (start.y - origin.y) * direction.x
    // e_denominator = d_denominator
    //
    //
    // # If segments are colinear (both nominator and denominator == 0),
    //    then minDistance is min(d0, d1) >= 0,
    //    get d0, d1 by doing dot projection onto normalized direction vector
    //
    // origin + d0*direction = start
    // d0*direction = (start - origin)
    // -> d0 = (start - origin) • direction =
    //      (start.x - origin.x, start.y - origin.y) • (direction.x, direction.y) =
    //      (start.x - origin.x) * direction.x + (start.y - origin.y) * direction.y
    //
    // origin + d1*direction = end
    // d1*direction = end - origin
    // -> d1 = (end - origin) • direction =
    //      (end.x - origin.x, end.y - origin.y) • (direction.x, direction.y) =
    //      (end.x - origin.x) * direction.x + (end.y - origin.y) * direction.y
    intersectRay: function (origin, direction) {
        var points = this.points,
            minDistance = Infinity;
        var d, d_nom,
            e, e_nom,
            denom;

        var originX = origin._x, directionX = direction.x,
            originY = origin._y, directionY = direction.y;

        var i = 0, l = points.length;
        var startX = points[l - 2], endX, edgeX,
            startY = points[l - 1], endY, edgeY;
        for (; i < l; i += 2) {
            endX = points[i];
            endY = points[i+1];
            edgeX = endX - startX;
            edgeY = endY - startY;

            d_nom = (startX - originX) * edgeY      - (startY - originY) * edgeX;
            e_nom = (startX - originX) * directionY - (startY - originY) * directionX;
            denom = directionX * edgeY - directionY * edgeX;

            if (denom !== 0) {
                d = d_nom / denom;
                e = e_nom / denom;

                if (e >= 0 && e <= 1 && d >= 0 && d < minDistance)
                    minDistance = d;

            } else if (d_nom === 0 || e_nom === 0) {

                d = (startX - originX) * directionX + (startY - originY) * directionY;
                if (d >= 0 && d < minDistance)
                    minDistance = d;

                d = (endX - originX) * directionX + (endY - originY) * directionY;
                if (d >= 0 && d < minDistance)
                    minDistance = d;
            }

            startX = endX;
            startY = endY;
        }

        return minDistance;
    }
};

/**@
 * #Crafty.circle
 * @category 2D
 * @kind Class
 * 
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
     * @kind Method
     * 
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
            deltaX = this.x - x,
            deltaY = this.y - y;

        return (deltaX * deltaX + deltaY * deltaY) < (radius * radius);
    },

    /**@
     * #.shift
     * @comp Crafty.circle
     * @kind Method
     * 
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
            l = p.length;
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
        if (this.width !== other.height) {
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

},{"../core/core.js":9,"./spatial-grid.js":50}],45:[function(require,module,exports){
var Crafty = require('../core/core.js'),
    DEG_TO_RAD = Math.PI / 180,
    EPSILON = 1e-6;

Crafty.extend({
    /**@
     * #Crafty.raycast
     * @category 2D
     * @kind Method
     * 
     * @sign public Array .raycast(Object origin, Object direction[, Number maxDistance][, String comp][, Boolean sort])
     * @param origin - the point of origin from which the ray will be cast. The object must contain the properties `_x` and `_y`.
     * @param direction - the direction the ray will be cast. It must be normalized. The object must contain the properties `x` and `y`.
     * @param maxDistance - the maximum distance up to which intersections will be found.
     *                      This is an optional parameter defaulting to `Infinity`.
     *                      If it's `Infinity` find all intersections.
     *                      If it's negative find only first intersection (if there is one).
     *                      If it's positive find all intersections up to that distance.
     * @param comp - check for intersection with entities that have this component applied to them.
     *               This is an optional parameter that is disabled by default.
     * @param sort - whether to sort the returned array by increasing distance.
     *               May be disabled to slightly improve performance if sorted results are not needed.
     *               Defaults to `true`.
     * @returns an array of raycast-results that may be empty, if no intersection has been found.
     *          Otherwise, each raycast-result looks like `{obj: Entity, distance: Number, x: Number, y: Number}`,
     *          describing which `obj` entity has intersected the ray at intersection point `x`,`y`, `distance` px away from `origin`.
     *
     * Cast a ray from its `origin` in the `direction` and
     * report entities that intersect with it, given the parameter constraints.
     *
     * Raycasting only reports entities, that have the `Collision` component applied to them.
     *
     * @example
     * ~~~
     * Crafty.e("2D, Collision")
     *       .setName('First entity')
     *       .attr({x: 0, y: 0, w: 10, h: 10});
     *
     * Crafty.e("2D, Collision")
     *       .setName('Second entity')
     *       .attr({x: 20, y: 20, w: 10, h: 10});
     *
     * var origin = {_x: -25, _y: -25};
     * var direction = new Crafty.math.Vector2D(1, 1).normalize();
     *
     * var results = Crafty.raycast(origin, direction, -1); // find only 1st intersection
     * Crafty.log('Intersections found', results.length); // logs '1'
     *
     * var result = results[0];
     * Crafty.log('1st intersection:');
     * Crafty.log('Entity name:', result.obj.getName()); // logs 'First entity'
     * Crafty.log('Distance from origin to intersection point', result.distance); // logs '25 * Math.sqrt(2)'
     * Crafty.log('Intersection point:', result.x, result.y); // logs '0' '0'
     * ~~~
     *
     * @see Crafty.polygon#.intersectRay
     * @see Crafty.map#Crafty.map.traverseRay
     */

    // origin = {_x, _y}
    // direction = {x, y}, must be normalized
    //
    // Add approximate ray intersection with bounding rectangle,
    // before doing exact ray intersection if needed in future.
    // https://gist.github.com/mucaho/77846e9fc0cd3c8b600c
    raycast: function(origin, direction) {
        // default parameters
        var comp = 'obj',
            maxDistance = Infinity,
            sort = true;
        // optional arguments
        var argument, type;
        for (var i = 2, l = arguments.length; i < l; ++i) {
            argument = arguments[i];
            type = typeof argument;
            if (type === 'number') maxDistance = argument + EPSILON; // make it inclusive
            else if (type === 'string') comp = argument;
            else if (type === 'boolean') sort = argument;
        }

        var ox = origin._x,
            oy = origin._y,
            dx = direction.x,
            dy = direction.y;


        var alreadyChecked = {},
            results = [];


        if (maxDistance < 0) { // find first intersection

            var closestObj = null,
                minDistance = Infinity;

            // traverse map
            Crafty.map.traverseRay(origin, direction, function(obj, previousCellDistance) {
                // check if we advanced to next cell
                //      then report closest object from previous cell
                //          if intersection point is in previous cell
                if (closestObj && minDistance < previousCellDistance) {
                    results.push({
                        obj: closestObj,
                        distance: minDistance,
                        x: ox + minDistance * dx,
                        y: oy + minDistance * dy
                    });
                    closestObj = null;
                    minDistance = Infinity;

                    return true;
                }

                // object must contain polygon hitbox, the specified component and must not already be checked
                if (!obj.map || !obj.__c[comp] || alreadyChecked[obj[0]]) return;
                alreadyChecked[obj[0]] = true;

                // do exact intersection test
                var distance = obj.map.intersectRay(origin, direction);
                if (distance < minDistance) {
                    closestObj = obj;
                    minDistance = distance;
                }
            });

            // in case traversal ended and we haven't yet pushed nearest intersecting object
            if (closestObj) {
                results.push({
                    obj: closestObj,
                    distance: minDistance,
                    x: ox + minDistance * dx,
                    y: oy + minDistance * dy
                });
            }

        } else { // find intersections up to max distance

            // traverse map
            Crafty.map.traverseRay(origin, direction, function(obj, previousCellDistance) {
                // check if we advanced to next cell
                //      then cancel traversal if previousCellDistance > maxDistance
                if (previousCellDistance > maxDistance) {
                    return true;
                }

                // object must contain polygon hitbox, the specified component and must not already be checked
                if (!obj.map || !obj.__c[comp] || alreadyChecked[obj[0]]) return;
                alreadyChecked[obj[0]] = true;

                // do exact intersection test
                var distance = obj.map.intersectRay(origin, direction);
                if (distance < maxDistance) {
                    results.push({
                        obj: obj,
                        distance: distance,
                        x: ox + distance * dx,
                        y: oy + distance * dy
                    });
                }
            });
        }


        if (sort) results.sort(function(a, b) { return a.distance - b.distance; });


        return results;
    }
});

/**@
 * #Collision
 * @category 2D
 * @kind Component
 * 
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
 * @see 2D
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
     * @kind Method
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

    /**@
     * #.cbr
     * @comp Collision
     * @kind Method
     * 
     * @sign public Object .cbr([Object cbr])
     * @param cbr - an object to use as output
     * @returns an object with `_x`, `_y`, `_w`, and `_h` properties; if an object is passed in, it will be reused rather than creating a new object.
     *
     * Return an object containing a copy of this entity's collision bounding rectangle.
     * The CBR encompasses both the entity's custom collision hitbox and its MBR.
     * If the custom collision hitbox does not sit outside the entity it will return the entity's minimum bounding rectangle (`.mbr()`) instead.
     *
     * @note The keys have an underscore prefix. This is due to the x, y, w, h properties
     * being setters and getters that wrap the underlying properties with an underscore (_x, _y, _w, _h).
     *
     * @see 2D#.mbr
     */
    cbr: function (cbr) {
        cbr = cbr || {};
        if (!this._cbr) {
            return this.mbr(cbr);
        } else {
            cbr._x = (this._cbr._x);
            cbr._y = (this._cbr._y);
            cbr._w = (this._cbr._w);
            cbr._h = (this._cbr._h);
            return cbr;
        }
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
     * @kind Method
     * 
     * @sign public Array .hit(String component)
     * @param component - Check collision with entities that have this component
     * applied to them.
     * @return `null` if there is no collision. If a collision is detected,
     * returns an Array of collision data objects (see below).
     *
     * Tests for collisions with entities that have the specified component
     * applied to them.
     * If a collision is detected, data regarding the collision will be present in
     * the array returned by this method.
     * If no collisions occur, this method returns `null`.
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
     * @example
     * Resolving collisions with static colliders (walls) for moving entity (player).
     * ~~~
     * Crafty.e("2D, Fourway, Collision, player")
     *       .attr({x: 32, y: 32, w: 32, h: 32})
     *       .collision([0, 16, 16, 0, 32, 16, 16, 32])
     *       .fourway()
     *       .bind('Moved', function(evt) { // after player moved
     *         var hitDatas, hitData;
     *         if ((hitDatas = this.hit('wall'))) { // check for collision with walls
     *           hitData = hitDatas[0]; // resolving collision for just one collider
     *           if (hitData.type === 'SAT') { // SAT, advanced collision resolution
     *             // move player back by amount of overlap
     *             this.x -= hitData.overlap * hitData.normal.x;
     *             this.y -= hitData.overlap * hitData.normal.y;
     *           } else { // MBR, simple collision resolution
     *             // move player to position before he moved (on respective axis)
     *             this[evt.axis] = evt.oldValue;
     *           }
     *         }
     *       });
     * ~~~
     *
     * @see Crafty.map#Crafty.map.search
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
            return null;
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
            return null;
        }

        return finalresult;
    },

    /**@
     * #.onHit
     * @comp Collision
     * @kind Method
     * 
     * @sign public this .onHit(String component, Function callbackOn[, Function callbackOff])
     * @param component - Component to check collisions for.
     * @param callbackOn - Callback method to execute upon collision with the component.
     *                     The first argument passed  will be the results of the collision check in the same format documented for `hit()`.
     *                     The second argument passed will be a Boolean indicating whether the collision with a component occurs for the first time.
     * @param callbackOff - Callback method executed once as soon as collision stops.
     *
     * Creates an EnterFrame event calling `.hit()` each frame.  When a collision is detected the `callbackOn` will be invoked.
     *
     * Note that the `callbackOn` will be invoked every frame the collision is active, not just the first time the collision occurs.
     * Use the second argument passed to `callbackOn` to differentiate that, which will be `true` if it's the first time the collision occurs.
     *
     * If you want more fine-grained control consider using `.checkHits()`, `.hit()` or even `Crafty.map.search()`.
     *
     * @example
     * Respond to collisions between player and bullets.
     * ~~~
     * Crafty.e("2D, Collision, player")
     *       .attr({ health: 100 })
     *       .onHit('bullet', function(hitDatas) { // on collision with bullets
     *         for (var i = 0, l = hitDatas.length; i < l; ++i) { // for each bullet hit
     *           hitDatas[i].obj.destroy(); // destroy the bullet
     *           this.health -= 25; // player looses health
     *           if (this.health <= 0) // once player's health depletes
     *             this.destroy(); // player dies
     *         }
     *       });
     * ~~~
     *
     * @see .checkHits
     * @see .hit
     * @see Crafty.map#Crafty.map.search
     */
    onHit: function (component, callbackOn, callbackOff) {
        var justHit = false;
        this.bind("EnterFrame", function () {
            var hitData = this.hit(component);
            if (hitData) {
                callbackOn.call(this, hitData, !justHit);
                justHit = true;
            } else if (justHit) {
                if (typeof callbackOff === 'function') {
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
                if (hitData !== null) {
                    // The collision is still in progress
                    return;
                }

                collisionData.occurring = false;
                this.trigger("HitOff", component);
            } else if (hitData !== null) {
                collisionData.occurring = true;
                this.trigger("HitOn", hitData);
            }
        };
    },

    /**@
     * #.checkHits
     * @comp Collision
     * @kind Method
     * 
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
     * @see Crafty.map#Crafty.map.search
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
     * @kind Method
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
     * @kind Method
     * 
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
            np = (i === l - 1 ? 0 : i + 1);

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
            np = (i === k - 1 ? 0 : i + 1);

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

},{"../core/core.js":9}],46:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Crafty.math
 * @category Utilities
 * @kind CoreObj
 *
 * A set of utility functions for common (and not so common) operations.
 */
Crafty.math = {
    /**@
     * #Crafty.math.abs
     * @comp Crafty.math
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
     * @sign public Number Crafty.math.randomNumber(Number start, Number end)
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Class
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
            this.x === vecRH.x && this.y === vecRH.y;
    }; // equals

    /**@
     * #.perpendicular
     * @comp Crafty.math.Vector2D
     * @kind Method
     * 
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
     * @kind Method
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
     * @kind Method
     * 
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Class
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
    function Matrix2D (a, b, c, d, e, f) {
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
    } // class Matrix2D

    Matrix2D.prototype.a = 1;
    Matrix2D.prototype.b = 0;
    Matrix2D.prototype.c = 0;
    Matrix2D.prototype.d = 1;
    Matrix2D.prototype.e = 0;
    Matrix2D.prototype.f = 0;

    /**@
     * #.apply
     * @comp Crafty.math.Matrix2D
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
            this.a === mtrxRH.a && this.b === mtrxRH.b && this.c === mtrxRH.c &&
            this.d === mtrxRH.d && this.e === mtrxRH.e && this.f === mtrxRH.f;
    }; // equals

    /**@
     * #.determinant
     * @comp Crafty.math.Matrix2D
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
     * @kind Method
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
},{"../core/core.js":9}],47:[function(require,module,exports){
var Crafty = require('../core/core.js');



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
 * @kind Component
 * 
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
     * @kind Property
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
     * @kind Property
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
     * @kind Property
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
     * @kind Method
     * 
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
 * @kind Component
 * 
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
     * @kind Property
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
     * @kind Property
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
     * @kind Property
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
     * @kind Property
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
     * @kind Property
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
     * @kind Property
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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

    /**@
     * #.ccdbr
     * @comp Motion
     * @kind Method
     * 
     * @sign public Object .ccdbr([Object ccdbr])
     * @param ccdbr - an object to use as output
     * @returns an object with `_x`, `_y`, `_w`, and `_h` properties; if an object is passed in, it will be reused rather than creating a new object.
     *
     * Return an object containing the entity's continuous collision detection bounding rectangle.
     * The CCDBR encompasses the motion delta of the entity's bounding rectangle since last frame.
     * The CCDBR is minimal if the entity moved on only one axis since last frame, however it encompasses a non-minimal region if it moved on both axis.
     * For further details, refer to [FAQ#Tunneling](https://github.com/craftyjs/Crafty/wiki/Crafty-FAQ-%28draft%29#why-are-my-bullets-passing-through-other-entities-without-registering-hits).
     *
     * @note The keys have an underscore prefix. This is due to the x, y, w, h properties
     * being setters and getters that wrap the underlying properties with an underscore (_x, _y, _w, _h).
     *
     * @see .motionDelta, Collision#.cbr
     */
    ccdbr: function (ccdbr) {
        var pos = this._cbr || this._mbr || this,
            dx = this._dx,
            dy = this._dy,
            ccdX = 0, ccdY = 0,
            ccdW = dx > 0 ? (ccdX = dx) : -dx,
            ccdH = dy > 0 ? (ccdY = dy) : -dy;

        ccdbr = ccdbr || {};
        ccdbr._x = pos._x - ccdX;
        ccdbr._y = pos._y - ccdY;
        ccdbr._w = pos._w + ccdW;
        ccdbr._h = pos._h + ccdH;

        return ccdbr;
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

},{"../core/core.js":9}],48:[function(require,module,exports){
var Crafty = require('../core/core.js');

/**@
 * #Supportable
 * @category 2D
 * @kind Component
 * 
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
     * @kind Property
     *
     * Access the ground entity (which may be the actual ground entity if it exists, or `null` if it doesn't exist) and thus whether this entity is currently on the ground or not. 
     * The ground entity is also available through the events, when the ground entity changes.
     */
    _ground: null,
    _groundComp: null,
    _preventGroundTunneling: false,

    /**@
     * #.canLand
     * @comp Supportable
     * @kind Property
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
     * @kind Method
     * 
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
     * @kind Method
     * 
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

    /**@
     * #.preventGroundTunneling
     * @comp Supportable
     * @kind Method
     * 
     * @sign this .preventGroundTunneling([Boolean enable])
     * @param enable - Boolean indicating whether to enable continous collision detection or not; if omitted defaults to true
     *
     * Prevent entity from falling through thin ground entities at high speeds. This setting is disabled by default.
     * This is performed by approximating continous collision detection, which may impact performance negatively.
     * For further details, refer to [FAQ#Tunneling](https://github.com/craftyjs/Crafty/wiki/Crafty-FAQ-%28draft%29#why-are-my-bullets-passing-through-other-entities-without-registering-hits).
     *
     * @see Motion#.ccdbr
     */
    preventGroundTunneling: function(enable) {
        if (typeof enable === 'undefined')
            enable = true;
        if (enable)
            this.requires("Motion");
        this._preventGroundTunneling = enable;

        return this;
    },

    _detectGroundTick: function() {
        var groundComp = this._groundComp,
            ground = this._ground,
            overlap = Crafty.rectManager.overlap,
            area;

        if (!this._preventGroundTunneling) {
            var pos = this._cbr || this._mbr || this;
            area = this.__area;
            area._x = pos._x;
            area._y = pos._y;
            area._w = pos._w;
            area._h = pos._h;
        } else {
            area = this.ccdbr(this.__area);
        }
        area._h++; // Increase by 1 to make sure map.search() finds the floor
        // Decrease width by 1px from left and 1px from right, to fall more gracefully
        // area._x++; area._w--;


        // check if we lift-off
        if (ground) {
            var garea = ground._cbr || ground._mbr || ground;
            if (!(ground.__c[groundComp] && Crafty(ground[0]) === ground && overlap(garea, area))) {
                this._ground = null;
                this.trigger("LiftedOffGround", ground); // no collision with ground was detected for first time
                ground = null;
            }
        }

        // check if we land (also possible to land on other ground object in same frame after lift-off from current ground object)
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

                        // snap entity to ground object
                        this.y = ground._y - this._h;
                        if (this._x > ground._x + ground._w)
                            this.x = ground._x + ground._w - 1;
                        else if (this._x + this._w < ground._x)
                            this.x = ground._x - this._w + 1;

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
 * @kind Component
 *
 * Attach the entity to the ground when it lands. Useful for platformers with moving platforms.
 * Remove the component to disable the functionality.
 *
 * Additionally, this component provides the entity with `Supportable` methods & events.
 *
 * @example
 * ~~~
 * Crafty.e("2D, Gravity, GroundAttacher")
 *     .gravity("Platform"); // entity will land on and move with entites that have the "Platform" component
 * ~~~
 *
 * @see Supportable, Gravity
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
 * @kind Component
 * 
 * Adds gravitational pull to the entity.
 *
 * Additionally, this component provides the entity with `Supportable` and `Motion` methods & events.
 *
 * @see Supportable, Motion
 */
Crafty.c("Gravity", {
    _gravityConst: 500,
    _gravityActive: false,

    init: function () {
        this.requires("2D, Supportable, Motion");

        this.bind("LiftedOffGround", this._startGravity); // start gravity if we are off ground
        this.bind("LandedOnGround", this._stopGravity); // stop gravity once landed
    },
    remove: function(destroyed) {
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
     * @kind Method
     * 
     * @sign public this .gravity([comp])
     * @param comp - The name of a component that will stop this entity from falling
     *
     * Enable gravity for this entity no matter whether comp parameter is specified or not.
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
     */
    gravity: function (comp) {
        this.uniqueBind("CheckLanding", this._gravityCheckLanding);
        this.startGroundDetection(comp);
        this._startGravity();

        return this;
    },
    /**@
     * #.antigravity
     * @comp Gravity
     * @kind Method
     * 
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
     * @kind Method
     * 
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
     *   .gravityConst(750)
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
        if (this._gravityActive) return;
        this._gravityActive = true;
        this.ay += this._gravityConst;
    },
    _stopGravity: function() {
        if (!this._gravityActive) return;
        this._gravityActive = false;
        this.ay = 0;
        this.vy = 0;
    }
});


},{"../core/core.js":9}],49:[function(require,module,exports){
var Crafty = require('../core/core.js');


/**@
 * #Crafty.rectManager
 * @category 2D
 * @kind CoreObj
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
       * @kind Method
       * 
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
       * #Crafty.rectManager.integerBounds
       * @comp Crafty.rectManager
       * @kind Method
       * 
       * @sign public Boolean Crafty.rectManager.integerBounds(Object rect)
       * @param rect - An object that must have the `_x, _y, _w, _h` values as properties
       * @return An enclosing rectangle with integer coordinates
       *
       * Calculate the smallest rectangle with integer coordinates that encloses the specified rectangle,
       * modifying the passed object to have those bounds.
       */
      integerBounds: function(rect){
        rect._w = rect._x + rect._w;
        rect._h = rect._y + rect._h;
        rect._x = (rect._x > 0) ? (rect._x|0) : (rect._x|0) - 1;
        rect._y = (rect._y > 0) ? (rect._y|0) : (rect._y|0) - 1;
        rect._w -= rect._x;
        rect._h -= rect._y;
        rect._w = (rect._w === (rect._w|0)) ? rect._w : (rect._w|0) + 1;
        rect._h = (rect._h === (rect._h|0)) ? rect._h : (rect._h|0) + 1;
        return rect;
      },

      /**@
      * #Crafty.rectManager.mergeSet
      * @comp Crafty.rectManager
      * @kind Method
      *
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
       * @kind Method
       * 
       * @sign public Crafty.rectManager.boundingRect(set)
       * @param set - An array of rectangles
       *
       * - Calculate the common bounding rect of multiple canvas entities.
       * - Returns coords
       */
      boundingRect: function (set) {
          if (!set || !set.length) return;
          var i = 1,
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

},{"../core/core.js":9}],50:[function(require,module,exports){
/**
 * Spatial HashMap for broad phase collision
 *
 * @author Louis Stowasser
 */

    /**@
     * #Crafty.HashMap.constructor
     * @comp Crafty.HashMap
     * @kind Class
     * 
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

            this.boundsDirty = false;
            this.boundsHash = {
                max: {
                    x: -Infinity,
                    y: -Infinity
                },
                min: {
                    x: Infinity,
                    y: Infinity
                }
            };
            this.boundsCoords = {
                max: {
                    x: -Infinity,
                    y: -Infinity
                },
                min: {
                    x: Infinity,
                    y: Infinity
                }
            };
        },

        SPACE = " ",
        keyHolder = {};

    HashMap.prototype = {
        /**@
         * #Crafty.map.insert
         * @comp Crafty.map
         * @kind Method
         * 
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

            //mark map boundaries as dirty
            this.boundsDirty = true;

            return entry;
        },

        /**@
         * #Crafty.map.search
         * @comp Crafty.map
         * @kind Method
         * 
         * @sign public Object Crafty.map.search(Object rect[, Boolean filter])
         * @param rect - the rectangular region to search for entities.
         *               This object must contain the properties `_x`,`_y`,`_w`,`_h`.
         * @param filter - If `false`, only performs a broad-phase collision check.  The default value is `true`.
         * @return an (possibly empty) array of entities that have been found in the given region
         *
         * Search for entities in the given region, using their broadphase bounding rectangles.
         *
         * - If `filter` is `false`, just search for all the entries in the give `rect` region by broad phase collision. Entity may be returned duplicated.
         * - If `filter` is `true`, filter the above results by checking that they actually overlap `rect`.
         *
         * The easier usage is with `filter == true`. For performance reason, you may use `filter == false`, and filter the result yourself. See examples in drawing.js and collision.js.
         *
         * @example
         * ~~~
         * // search for entities located in the current visible region of the viewport
         * var results = Crafty.map.search(Crafty.viewport.rect());
         * // iterate over all those entities
         * var ent;
         * for (var i = 0, l = results.length; i < l; ++i) {
         *     // do something with an entity
         *     ent = results[i];
         *     Crafty.log('Found entity with id', ent.getId());
         * }
         * ~~~
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
                    if ((cell = this.map[(i << 16) ^ j])) {
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
                    obj = obj._cbr || obj._mbr || obj;
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
         * @kind Method
         * 
         * @sign public void Crafty.map.remove(Entry entry)
         * @param entry - An entry to remove from the hashmap
         *
         * Remove an entry from the broad phase map.
         *
         * @example
         * ~~~
         * Crafty.map.remove(e);
         * ~~~
         */
        remove: function (entry) {
            var keys = entry.keys;
            var obj = entry.obj;
            var i = 0,
                j, hash;

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

            //mark map boundaries as dirty
            this.boundsDirty = true;
        },

        /**@
         * #Crafty.map.refresh
         * @comp Crafty.map
         * @kind Method
         * 
         * @sign public void Crafty.map.refresh(Entry entry)
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

            //mark map boundaries as dirty
            this.boundsDirty = true;

            return entry;
        },


        /**@
         * #Crafty.map.boundaries
         * @comp Crafty.map
         * @kind Method
         * 
         * @sign public Object Crafty.map.boundaries()
         * @returns An object with the following structure, which represents an MBR which contains all entities
         *
         * Note that the returned object is a reference to the internally used object.
         * Use `Crafty.clone` to get a copy instead.
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
        boundaries: function() {
            this._updateBoundaries();
            return this.boundsCoords;
        },

        /**
         * #Crafty.map._keyBoundaries
         * @comp Crafty.map
         * @kind Method
         * 
         * @sign private Object Crafty.map._keyBoundaries()
         * @returns An object with the following structure, which represents an MBR which contains all hash keys
         *
         * Find boundaries of row/col cell grid keys instead of actual x/y pixel coordinates.
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
        _keyBoundaries: function() {
            this._updateBoundaries();
            return this.boundsHash;
        },

        _updateBoundaries: function() {
            // update map boundaries if they were changed
            if (!this.boundsDirty) return;

            var hash = this.boundsHash;
            hash.max.x = -Infinity;
            hash.max.y = -Infinity;
            hash.min.x = Infinity;
            hash.min.y = Infinity;

            var coords = this.boundsCoords;
            coords.max.x = -Infinity;
            coords.max.y = -Infinity;
            coords.min.x = Infinity;
            coords.min.y = Infinity;

            var k, ent;
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
                        if (typeof ent === 'object' && 'requires' in ent) {
                            coords.max.x = Math.max(coords.max.x, ent.x + ent.w);
                        }
                    }
                }
                if (i <= hash.min.x) {
                    hash.min.x = i;
                    for (k in this.map[h]) {
                        ent = this.map[h][k];
                        if (typeof ent === 'object' && 'requires' in ent) {
                            coords.min.x = Math.min(coords.min.x, ent.x);
                        }
                    }
                }
                if (j >= hash.max.y) {
                    hash.max.y = j;
                    for (k in this.map[h]) {
                        ent = this.map[h][k];
                        if (typeof ent === 'object' && 'requires' in ent) {
                            coords.max.y = Math.max(coords.max.y, ent.y + ent.h);
                        }
                    }
                }
                if (j <= hash.min.y) {
                    hash.min.y = j;
                    for (k in this.map[h]) {
                        ent = this.map[h][k];
                        if (typeof ent === 'object' && 'requires' in ent) {
                            coords.min.y = Math.min(coords.min.y, ent.y);
                        }
                    }
                }
            }

            // mark map boundaries as clean
            this.boundsDirty = false;
        },


        /**@
         * #Crafty.map.traverseRay
         * @comp Crafty.map
         * @kind Method
         * 
         * @sign public void Crafty.map.traverseRay(Object origin, Object direction, Function callback)
         * @param origin - the point of origin from which the ray will be cast. The object must contain the properties `_x` and `_y`.
         * @param direction - the direction the ray will be cast. It must be normalized. The object must contain the properties `x` and `y`.
         * @param callback - a callback that will be called for each object that is encountered along the ray.
         *                   This function is called with two arguments: The first one represents the object encountered;
         *                   the second one represents the distance up to which all objects have been reported so far.
         *                   The callback can return a truthy value in order to stop the traversal early.
         *
         * Traverse the spatial map in the direction of the supplied ray.
         *
         * Given the `origin` and `direction` the ray is cast and the `callback` is called
         * for each object encountered in map cells traversed by the ray.
         *
         * The callback is called for each object that may be intersected by the ray.
         * Whether an actual intersection occurs shall be determined by the callback's implementation.
         *
         * @example
         * ~~~
         * Crafty.e("2D")
         *       .setName('First entity')
         *       .attr({x: 0, y: 0, w: 10, h: 10});
         *
         * Crafty.e("2D")
         *       .setName('Second entity')
         *       .attr({x: 20, y: 20, w: 10, h: 10});
         *
         * var origin = {_x: -25, _y: -25};
         * var direction = new Crafty.math.Vector2D(1, 1).normalize();
         *
         * Crafty.map.traverseRay(origin, direction, function(ent, processedDistance) {
         *   Crafty.log('Encountered entity named', ent.getName()); // logs 'First entity'
         *   Crafty.log('All entities up to', processedDistance, 'px away have been reported thus far.');
         *   Crafty.log('Stopping traversal after encountering the first entity.');
         *   return true;
         * });
         * ~~~
         */

        // See [this tutorial](http://www.flipcode.com/archives/Raytracing_Topics_Techniques-Part_4_Spatial_Subdivisions.shtml) and linked materials
        // Segment-segment intersection is described here: http://stackoverflow.com/a/565282/3041008
        //
        // origin = {_x, _y}
        // direction = {x, y}, must be normalized
        //
        //
        // # Let
        //  edge = end - start
        //  edge x edge == 0
        //
        // # Segment - segment intersection equation
        //  origin + d * direction = start + e * edge
        //
        // # Solving for d
        //  (origin + d * direction) x edge = (start + e * edge) x edge
        //  d = (start − origin) × edge / (direction × edge)
        //
        //      (start.x - origin.x) * edge.y - (start.y - origin.y) * edge.x
        //  d = --------------------------------------------------------------
        //               direction.x * edge.y - direction.y * edge.x
        //
        //
        // # In case ray intersects vertical cell grid edge
        // start = (x, 0)
        // edge = (0, 1)
        //
        //      start.x - origin.x
        //  d = -------------------
        //         direction.x
        //
        // # In case ray intersects horizontal cell grid edge
        // start = (0, y)
        // edge = (1, 0)
        //
        //      start.y - origin.y
        //  d = -------------------
        //         direction.y
        //
        traverseRay: function(origin, direction, callback) {
            var dirX = direction.x,
                dirY = direction.y;
            // copy input data
            // TODO maybe allow HashMap.key search with point only
            origin = {
                _x: origin._x,
                _y: origin._y,
                _w: 0,
                _h: 0
            };


            var keyBounds = this._keyBoundaries();
            var keys = HashMap.key(origin, keyHolder);

            // calculate col & row cell indices
            var currentCol = keys.x1,
                currentRow = keys.y1;
            var minCol = keyBounds.min.x,
                minRow = keyBounds.min.y,
                maxCol = keyBounds.max.x,
                maxRow = keyBounds.max.y;
            // direction to traverse cells
            var stepCol = dirX > 0 ? 1 : (dirX < 0 ? -1 : 0),
                stepRow = dirY > 0 ? 1 : (dirY < 0 ? -1 : 0);


            // first, next cell edge in absolute coordinates
            var firstCellEdgeX = (dirX >= 0) ? (currentCol + 1) * cellsize : currentCol * cellsize,
                firstCellEdgeY = (dirY >= 0) ? (currentRow + 1) * cellsize : currentRow * cellsize;

            // distance from origin to previous cell edge
            var previousDistance = -Infinity;

            // distances to next horizontal and vertical cell edge
            var deltaDistanceX = 0, // distance for the ray to be advanced to cross a whole cell horizontally
                deltaDistanceY = 0, // distance for the ray to be advanced to cross a whole cell vertically
                nextDistanceX = Infinity, // distance we can advance(increase magnitude) ray until we advance to next horizontal cell
                nextDistanceY = Infinity; // distance we can advance(increase magnitude) ray until we advance to next vertical cell

            var norm;
            if (dirX !== 0) {
                norm = 1.0 / dirX;
                nextDistanceX = (firstCellEdgeX - origin._x) * norm;
                deltaDistanceX = (cellsize * stepCol) * norm;
            }
            if (dirY !== 0) {
                norm = 1.0 / dirY;
                nextDistanceY = (firstCellEdgeY - origin._y) * norm;
                deltaDistanceY = (cellsize * stepRow) * norm;
            }


            // advance starting cell to be inside of map bounds
            while ((stepCol === 1 && currentCol < minCol && minCol !== Infinity) || (stepCol === -1 && currentCol > maxCol && maxCol !== -Infinity) ||
                   (stepRow === 1 && currentRow < minRow && minRow !== Infinity) || (stepRow === -1 && currentRow > maxRow && maxRow !== -Infinity)) {

                // advance to closest cell
                if (nextDistanceX < nextDistanceY) {
                    previousDistance = nextDistanceX;

                    currentCol += stepCol;
                    nextDistanceX += deltaDistanceX;
                } else {
                    previousDistance = nextDistanceY;

                    currentRow += stepRow;
                    nextDistanceY += deltaDistanceY;
                }
            }

            var cell;
            // traverse over cells
            // TODO: maybe change condition to `while (currentCol !== endX) || (currentRow !== endY)`
            while ((minCol <= currentCol && currentCol <= maxCol) &&
                   (minRow <= currentRow && currentRow <= maxRow)) {

                // process cell
                if ((cell = this.map[(currentCol << 16) ^ currentRow])) {
                    // check each object inside this cell
                    for (var k = 0; k < cell.length; k++) {
                        // if supplied callback returns true, abort traversal
                        if (callback(cell[k], previousDistance))
                            return;
                    }
                }

                // advance to closest cell
                if (nextDistanceX < nextDistanceY) {
                    previousDistance = nextDistanceX;

                    currentCol += stepCol;
                    nextDistanceX += deltaDistanceX;
                } else {
                    previousDistance = nextDistanceY;

                    currentRow += stepRow;
                    nextDistanceY += deltaDistanceY;
                }
            }
        }

    };

    /**@
     * #Crafty.HashMap
     * @category 2D
     * @kind Class
     * 
     * Broad-phase collision detection engine. See background information at
     *
     * - [N Tutorial B - Broad-Phase Collision](http://www.metanetsoftware.com/technique/tutorialB.html)
     * - [Broad-Phase Collision Detection with CUDA](http://http.developer.nvidia.com/GPUGems3/gpugems3_ch32.html)
     * @see Crafty.map
     */

    /**@
     * #Crafty.HashMap.key
     * @comp Crafty.HashMap
     * @kind Method
     * 
     * @sign public Object Crafty.HashMap.key(Object obj)
     * @param obj - an Object that has .mbr() or _x, _y, _w and _h.
     *
     * Get the rectangular region (in terms of the grid, with grid size `cellsize`), where the object may fall in. This region is determined by the object's bounding box.
     * The `cellsize` is 64 by default.
     *
     * @see Crafty.HashMap.constructor
     */
    HashMap.key = function (obj, keys) {
        obj = obj._cbr || obj._mbr || obj;
        keys = keys || {};

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
            if (HashMap.hash(HashMap.key(rect, keyHolder)) !== HashMap.hash(this.keys)) {
                this.map.refresh(this);
            }
        }
    };

    module.exports = HashMap;

},{}]},{},[19]);
