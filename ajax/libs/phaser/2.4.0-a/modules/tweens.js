/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Phaser.Game has a single instance of the TweenManager through which all Tween objects are created and updated.
* Tweens are hooked into the game clock and pause system, adjusting based on the game state.
*
* TweenManager is based heavily on tween.js by http://soledadpenades.com.
* The difference being that tweens belong to a games instance of TweenManager, rather than to a global TWEEN object.
* It also has callbacks swapped for Signals and a few issues patched with regard to properties and completion errors.
* Please see https://github.com/sole/tween.js for a full list of contributors.
* 
* @class Phaser.TweenManager
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
*/
Phaser.TweenManager = function (game) {

    /**
    * @property {Phaser.Game} game - Local reference to game.
    */
    this.game = game;

    /**
    * @property {array<Phaser.Tween>} _tweens - All of the currently running tweens.
    * @private
    */
    this._tweens = [];

    /**
    * @property {array<Phaser.Tween>} _add - All of the tweens queued to be added in the next update.
    * @private
    */
    this._add = [];

    this.easeMap = {

        "Power0": Phaser.Easing.Power0,
        "Power1": Phaser.Easing.Power1,
        "Power2": Phaser.Easing.Power2,
        "Power3": Phaser.Easing.Power3,
        "Power4": Phaser.Easing.Power4,

        "Linear": Phaser.Easing.Linear.None,
        "Quad": Phaser.Easing.Quadratic.Out,
        "Cubic": Phaser.Easing.Cubic.Out,
        "Quart": Phaser.Easing.Quartic.Out,
        "Quint": Phaser.Easing.Quintic.Out,
        "Sine": Phaser.Easing.Sinusoidal.Out,
        "Expo": Phaser.Easing.Exponential.Out,
        "Circ": Phaser.Easing.Circular.Out,
        "Elastic": Phaser.Easing.Elastic.Out,
        "Back": Phaser.Easing.Back.Out,
        "Bounce": Phaser.Easing.Bounce.Out,

        "Quad.easeIn": Phaser.Easing.Quadratic.In,
        "Cubic.easeIn": Phaser.Easing.Cubic.In,
        "Quart.easeIn": Phaser.Easing.Quartic.In,
        "Quint.easeIn": Phaser.Easing.Quintic.In,
        "Sine.easeIn": Phaser.Easing.Sinusoidal.In,
        "Expo.easeIn": Phaser.Easing.Exponential.In,
        "Circ.easeIn": Phaser.Easing.Circular.In,
        "Elastic.easeIn": Phaser.Easing.Elastic.In,
        "Back.easeIn": Phaser.Easing.Back.In,
        "Bounce.easeIn": Phaser.Easing.Bounce.In,

        "Quad.easeOut": Phaser.Easing.Quadratic.Out,
        "Cubic.easeOut": Phaser.Easing.Cubic.Out,
        "Quart.easeOut": Phaser.Easing.Quartic.Out,
        "Quint.easeOut": Phaser.Easing.Quintic.Out,
        "Sine.easeOut": Phaser.Easing.Sinusoidal.Out,
        "Expo.easeOut": Phaser.Easing.Exponential.Out,
        "Circ.easeOut": Phaser.Easing.Circular.Out,
        "Elastic.easeOut": Phaser.Easing.Elastic.Out,
        "Back.easeOut": Phaser.Easing.Back.Out,
        "Bounce.easeOut": Phaser.Easing.Bounce.Out,

        "Quad.easeInOut": Phaser.Easing.Quadratic.InOut,
        "Cubic.easeInOut": Phaser.Easing.Cubic.InOut,
        "Quart.easeInOut": Phaser.Easing.Quartic.InOut,
        "Quint.easeInOut": Phaser.Easing.Quintic.InOut,
        "Sine.easeInOut": Phaser.Easing.Sinusoidal.InOut,
        "Expo.easeInOut": Phaser.Easing.Exponential.InOut,
        "Circ.easeInOut": Phaser.Easing.Circular.InOut,
        "Elastic.easeInOut": Phaser.Easing.Elastic.InOut,
        "Back.easeInOut": Phaser.Easing.Back.InOut,
        "Bounce.easeInOut": Phaser.Easing.Bounce.InOut

    };

    this.game.onPause.add(this._pauseAll, this);
    this.game.onResume.add(this._resumeAll, this);

};

Phaser.TweenManager.prototype = {

    /**
    * Get all the tween objects in an array.
    * @method Phaser.TweenManager#getAll
    * @returns {Phaser.Tween[]} Array with all tween objects.
    */
    getAll: function () {

        return this._tweens;

    },

    /**
    * Remove all tweens running and in the queue. Doesn't call any of the tween onComplete events.
    * @method Phaser.TweenManager#removeAll
    */
    removeAll: function () {

        for (var i = 0; i < this._tweens.length; i++)
        {
            this._tweens[i].pendingDelete = true;
        }

        this._add = [];

    },
    
    /**
    * Remove all tweens from a specific object, array of objects or Group.
    * 
    * @method Phaser.TweenManager#removeFrom
    * @param {object|object[]|Phaser.Group} obj - The object you want to remove the tweens from.
    * @param {boolean} [children=true] - If passing a group, setting this to true will remove the tweens from all of its children instead of the group itself.
    */
    removeFrom: function (obj, children) {
        
        if (children === undefined) { children = true; }

        var i;
        var len;

        if (Array.isArray(obj))
        {
            for (i = 0, len = obj.length; i < len; i++)
            {
                this.removeFrom(obj[i]);
            }
        }
        else if (obj.type === Phaser.GROUP && children)
        {
            for (var i = 0, len = obj.children.length; i < len; i++)
            {
                this.removeFrom(obj.children[i]);
            }
        }
        else
        {
            for (i = 0, len = this._tweens.length; i < len; i++)
            {
                if (obj === this._tweens[i].target)
                {
                    this.remove(this._tweens[i]);
                }
            }

            for (i = 0, len = this._add.length; i < len; i++)
            {
                if (obj === this._add[i].target)
                {
                    this.remove(this._add[i]);
                }
            }
        }
        
    },

    /**
    * Add a new tween into the TweenManager.
    *
    * @method Phaser.TweenManager#add
    * @param {Phaser.Tween} tween - The tween object you want to add.
    * @returns {Phaser.Tween} The tween object you added to the manager.
    */
    add: function (tween) {

        tween._manager = this;
        this._add.push(tween);

    },

    /**
    * Create a tween object for a specific object. The object can be any JavaScript object or Phaser object such as Sprite.
    *
    * @method Phaser.TweenManager#create
    * @param {object} object - Object the tween will be run on.
    * @returns {Phaser.Tween} The newly created tween object.
    */
    create: function (object) {

        return new Phaser.Tween(object, this.game, this);

    },

    /**
    * Remove a tween from this manager.
    *
    * @method Phaser.TweenManager#remove
    * @param {Phaser.Tween} tween - The tween object you want to remove.
    */
    remove: function (tween) {

        var i = this._tweens.indexOf(tween);

        if (i !== -1)
        {
            this._tweens[i].pendingDelete = true;
        }
        else
        {
            i = this._add.indexOf(tween);

            if (i !== -1)
            {
                this._add[i].pendingDelete = true;
            }
        }

    },

    /**
    * Update all the tween objects you added to this manager.
    *
    * @method Phaser.TweenManager#update
    * @returns {boolean} Return false if there's no tween to update, otherwise return true.
    */
    update: function () {

        var addTweens = this._add.length;
        var numTweens = this._tweens.length;

        if (numTweens === 0 && addTweens === 0)
        {
            return false;
        }

        var i = 0;

        while (i < numTweens)
        {
            if (this._tweens[i].update(this.game.time.time))
            {
                i++;
            }
            else
            {
                this._tweens.splice(i, 1);

                numTweens--;
            }
        }

        //  If there are any new tweens to be added, do so now - otherwise they can be spliced out of the array before ever running
        if (addTweens > 0)
        {
            this._tweens = this._tweens.concat(this._add);
            this._add.length = 0;
        }

        return true;

    },

    /**
    * Checks to see if a particular Sprite is currently being tweened.
    *
    * @method Phaser.TweenManager#isTweening
    * @param {object} object - The object to check for tweens against.
    * @returns {boolean} Returns true if the object is currently being tweened, false if not.
    */
    isTweening: function(object) {

        return this._tweens.some(function(tween) {
            return tween.target === object;
        });

    },

    /**
    * Private. Called by game focus loss. Pauses all currently running tweens.
    *
    * @method Phaser.TweenManager#_pauseAll
    * @private
    */
    _pauseAll: function () {

        for (var i = this._tweens.length - 1; i >= 0; i--)
        {
            this._tweens[i]._pause();
        }

    },

    /**
    * Private. Called by game focus loss. Resumes all currently paused tweens.
    *
    * @method Phaser.TweenManager#_resumeAll
    * @private
    */
    _resumeAll: function () {

        for (var i = this._tweens.length - 1; i >= 0; i--)
        {
            this._tweens[i]._resume();
        }

    },

    /**
    * Pauses all currently running tweens.
    *
    * @method Phaser.TweenManager#pauseAll
    */
    pauseAll: function () {

        for (var i = this._tweens.length - 1; i >= 0; i--)
        {
            this._tweens[i].pause();
        }

    },

    /**
    * Resumes all currently paused tweens.
    *
    * @method Phaser.TweenManager#resumeAll
    */
    resumeAll: function () {

        for (var i = this._tweens.length - 1; i >= 0; i--)
        {
            this._tweens[i].resume(true);
        }

    }

};

Phaser.TweenManager.prototype.constructor = Phaser.TweenManager;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Tween allows you to alter one or more properties of a target object over a defined period of time.
* This can be used for things such as alpha fading Sprites, scaling them or motion.
* Use `Tween.to` or `Tween.from` to set-up the tween values. You can create multiple tweens on the same object
* by calling Tween.to multiple times on the same Tween. Additional tweens specified in this way become "child" tweens and
* are played through in sequence. You can use Tween.timeScale and Tween.reverse to control the playback of this Tween and all of its children.
*
* @class Phaser.Tween
* @constructor
* @param {object} target - The target object, such as a Phaser.Sprite or Phaser.Sprite.scale.
* @param {Phaser.Game} game - Current game instance.
* @param {Phaser.TweenManager} manager - The TweenManager responsible for looking after this Tween.
*/
Phaser.Tween = function (target, game, manager) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property {object} target - The target object, such as a Phaser.Sprite or property like Phaser.Sprite.scale.
    */
    this.target = target;

    /**
    * @property {Phaser.TweenManager} manager - Reference to the TweenManager responsible for updating this Tween.
    */
    this.manager = manager;

    /**
    * @property {Array} timeline - An Array of TweenData objects that comprise the different parts of this Tween.
    */
    this.timeline = [];

    /**
    * If set to `true` the current tween will play in reverse.
    * If the tween hasn't yet started this has no effect.
    * If there are child tweens then all child tweens will play in reverse from the current point.
    * @property {boolean} reverse
    * @default
    */
    this.reverse = false;

    /**
    * The speed at which the tweens will run. A value of 1 means it will match the game frame rate. 0.5 will run at half the frame rate. 2 at double the frame rate, etc.
    * If a tweens duration is 1 second but timeScale is 0.5 then it will take 2 seconds to complete.
    *
    * @property {number} timeScale
    * @default
    */
    this.timeScale = 1;

    /**
    * @property {number} repeatCounter - If the Tween and any child tweens are set to repeat this contains the current repeat count.
    */
    this.repeatCounter = 0;

    /**
    * @property {boolean} pendingDelete - True if this Tween is ready to be deleted by the TweenManager.
    * @default
    * @readonly
    */
    this.pendingDelete = false;

    /**
    * The onStart event is fired when the Tween begins. If there is a delay before the tween starts then onStart fires after the delay is finished.
    * It will be sent 2 parameters: the target object and this tween.
    * @property {Phaser.Signal} onStart
    */
    this.onStart = new Phaser.Signal();

    /**
    * The onLoop event is fired if the Tween or any child tween loops.
    * It will be sent 2 parameters: the target object and this tween.
    * @property {Phaser.Signal} onLoop
    */
    this.onLoop = new Phaser.Signal();

    /**
    * The onRepeat event is fired if the Tween and all of its children repeats. If this tween has no children this will never be fired.
    * It will be sent 2 parameters: the target object and this tween.
    * @property {Phaser.Signal} onRepeat
    */
    this.onRepeat = new Phaser.Signal();

    /**
    * The onChildComplete event is fired when the Tween or any of its children completes.
    * Fires every time a child completes unless a child is set to repeat forever.
    * It will be sent 2 parameters: the target object and this tween.
    * @property {Phaser.Signal} onChildComplete
    */
    this.onChildComplete = new Phaser.Signal();

    /**
    * The onComplete event is fired when the Tween and all of its children completes. Does not fire if the Tween is set to loop or repeatAll(-1).
    * It will be sent 2 parameters: the target object and this tween.
    * @property {Phaser.Signal} onComplete
    */
    this.onComplete = new Phaser.Signal();

    /**
    * @property {boolean} isRunning - If the tween is running this is set to true, otherwise false. Tweens that are in a delayed state or waiting to start are considered as being running.
    * @default
    */
    this.isRunning = false;

    /**
    * @property {number} current - The current Tween child being run.
    * @default
    * @readonly
    */
    this.current = 0;

    /**
    * @property {object} properties - Target property cache used when building the child data values.
    */
    this.properties = {};

    /**
    * @property {Phaser.Tween} chainedTween - If this Tween is chained to another this holds a reference to it.
    */
    this.chainedTween = null;

    /**
    * @property {boolean} isPaused - Is this Tween paused or not?
    * @default
    */
    this.isPaused = false;

    /**
    * @property {function} _onUpdateCallback - An onUpdate callback.
    * @private
    * @default null
    */
    this._onUpdateCallback = null;

    /**
    * @property {object} _onUpdateCallbackContext - The context in which to call the onUpdate callback.
    * @private
    * @default null
    */
    this._onUpdateCallbackContext = null;

    /**
    * @property {number} _pausedTime - Private pause timer.
    * @private
    * @default
    */
    this._pausedTime = 0;

    /**
    * @property {boolean} _codePaused - Was the Tween paused by code or by Game focus loss?
    * @private
    */
    this._codePaused = false;

    /**
    * @property {boolean} _hasStarted - Internal var to track if the Tween has started yet or not.
    * @private
    */
    this._hasStarted = false;
};

Phaser.Tween.prototype = {

    /**
    * Sets this tween to be a `to` tween on the properties given. A `to` tween starts at the current value and tweens to the destination value given.
    * For example a Sprite with an `x` coordinate of 100 could be tweened to `x` 200 by giving a properties object of `{ x: 200 }`.
    * The ease function allows you define the rate of change. You can pass either a function such as Phaser.Easing.Circular.Out or a string such as "Circ".
    * ".easeIn", ".easeOut" and "easeInOut" variants are all supported for all ease types.
    *
    * @method Phaser.Tween#to
    * @param {object} properties - An object containing the properties you want to tween, such as `Sprite.x` or `Sound.volume`. Given as a JavaScript object.
    * @param {number} [duration=1000] - Duration of this tween in ms.
    * @param {function|string} [ease=null] - Easing function. If not set it will default to Phaser.Easing.Default, which is Phaser.Easing.Linear.None by default but can be over-ridden.
    * @param {boolean} [autoStart=false] - Set to `true` to allow this tween to start automatically. Otherwise call Tween.start().
    * @param {number} [delay=0] - Delay before this tween will start in milliseconds. Defaults to 0, no delay.
    * @param {number} [repeat=0] - Should the tween automatically restart once complete? If you want it to run forever set as -1. This only effects this induvidual tween, not any chained tweens.
    * @param {boolean} [yoyo=false] - A tween that yoyos will reverse itself and play backwards automatically. A yoyo'd tween doesn't fire the Tween.onComplete event, so listen for Tween.onLoop instead.
    * @return {Phaser.Tween} This Tween object.
    */
    to: function (properties, duration, ease, autoStart, delay, repeat, yoyo) {

        if (duration === undefined || duration <= 0) { duration = 1000; }
        if (ease === undefined || ease === null) { ease = Phaser.Easing.Default; }
        if (autoStart === undefined) { autoStart = false; }
        if (delay === undefined) { delay = 0; }
        if (repeat === undefined) { repeat = 0; }
        if (yoyo === undefined) { yoyo = false; }

        if (typeof ease === 'string' && this.manager.easeMap[ease])
        {
            ease = this.manager.easeMap[ease];
        }

        if (this.isRunning)
        {
            console.warn('Phaser.Tween.to cannot be called after Tween.start');
            return this;
        }

        this.timeline.push(new Phaser.TweenData(this).to(properties, duration, ease, delay, repeat, yoyo));

        if (autoStart)
        {
            this.start();
        }

        return this;

    },

    /**
    * Sets this tween to be a `from` tween on the properties given. A `from` tween sets the target to the destination value and tweens to its current value.
    * For example a Sprite with an `x` coordinate of 100 tweened from `x` 500 would be set to `x` 500 and then tweened to `x` 100 by giving a properties object of `{ x: 500 }`.
    * The ease function allows you define the rate of change. You can pass either a function such as Phaser.Easing.Circular.Out or a string such as "Circ".
    * ".easeIn", ".easeOut" and "easeInOut" variants are all supported for all ease types.
    *
    * @method Phaser.Tween#from
    * @param {object} properties - An object containing the properties you want to tween., such as `Sprite.x` or `Sound.volume`. Given as a JavaScript object.
    * @param {number} [duration=1000] - Duration of this tween in ms.
    * @param {function|string} [ease=null] - Easing function. If not set it will default to Phaser.Easing.Default, which is Phaser.Easing.Linear.None by default but can be over-ridden.
    * @param {boolean} [autoStart=false] - Set to `true` to allow this tween to start automatically. Otherwise call Tween.start().
    * @param {number} [delay=0] - Delay before this tween will start in milliseconds. Defaults to 0, no delay.
    * @param {number} [repeat=0] - Should the tween automatically restart once complete? If you want it to run forever set as -1. This only effects this induvidual tween, not any chained tweens.
    * @param {boolean} [yoyo=false] - A tween that yoyos will reverse itself and play backwards automatically. A yoyo'd tween doesn't fire the Tween.onComplete event, so listen for Tween.onLoop instead.
    * @return {Phaser.Tween} This Tween object.
    */
    from: function (properties, duration, ease, autoStart, delay, repeat, yoyo) {

        if (duration === undefined) { duration = 1000; }
        if (ease === undefined || ease === null) { ease = Phaser.Easing.Default; }
        if (autoStart === undefined) { autoStart = false; }
        if (delay === undefined) { delay = 0; }
        if (repeat === undefined) { repeat = 0; }
        if (yoyo === undefined) { yoyo = false; }

        if (typeof ease === 'string' && this.manager.easeMap[ease])
        {
            ease = this.manager.easeMap[ease];
        }

        if (this.isRunning)
        {
            console.warn('Phaser.Tween.from cannot be called after Tween.start');
            return this;
        }

        this.timeline.push(new Phaser.TweenData(this).from(properties, duration, ease, delay, repeat, yoyo));

        if (autoStart)
        {
            this.start();
        }

        return this;

    },

    /**
    * Starts the tween running. Can also be called by the autoStart parameter of `Tween.to` or `Tween.from`.
    * This sets the `Tween.isRunning` property to `true` and dispatches a `Tween.onStart` signal.
    * If the Tween has a delay set then nothing will start tweening until the delay has expired.
    *
    * @method Phaser.Tween#start
    * @param {number} [index=0] - If this Tween contains child tweens you can specify which one to start from. The default is zero, i.e. the first tween created.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    start: function (index) {

        if (index === undefined) { index = 0; }

        if (this.game === null || this.target === null || this.timeline.length === 0 || this.isRunning)
        {
            return this;
        }

        //  Populate the tween data
        for (var i = 0; i < this.timeline.length; i++)
        {
            //  Build our master property list with the starting values
            for (var property in this.timeline[i].vEnd)
            {
                this.properties[property] = this.target[property] || 0;

                if (!Array.isArray(this.properties[property]))
                {
                    //  Ensures we're using numbers, not strings
                    this.properties[property] *= 1.0;
                }
            }
        }

        for (var i = 0; i < this.timeline.length; i++)
        {
            this.timeline[i].loadValues();
        }

        this.manager.add(this);

        this.isRunning = true;

        if (index < 0 || index > this.timeline.length - 1)
        {
            index = 0;
        }

        this.current = index;

        this.timeline[this.current].start();

        return this;

    },

    /**
    * Stops the tween if running and flags it for deletion from the TweenManager.
    * If called directly the `Tween.onComplete` signal is not dispatched and no chained tweens are started unless the complete parameter is set to `true`.
    * If you just wish to pause a tween then use Tween.pause instead.
    *
    * @method Phaser.Tween#stop
    * @param {boolean} [complete=false] - Set to `true` to dispatch the Tween.onComplete signal.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    stop: function (complete) {

        if (complete === undefined) { complete = false; }

        this.isRunning = false;

        this._onUpdateCallback = null;
        this._onUpdateCallbackContext = null;

        if (complete)
        {
            this.onComplete.dispatch(this.target, this);

            if (this.chainedTween)
            {
                this.chainedTween.start();
            }
        }

        this.manager.remove(this);

        return this;

    },

    /**
    * Updates either a single TweenData or all TweenData objects properties to the given value.
    * Used internally by methods like Tween.delay, Tween.yoyo, etc. but can also be called directly if you know which property you want to tweak.
    * The property is not checked, so if you pass an invalid one you'll generate a run-time error.
    *
    * @method Phaser.Tween#updateTweenData
    * @param {string} property - The property to update.
    * @param {number|function} value - The value to set the property to.
    * @param {number} [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the delay on all the children.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    updateTweenData: function (property, value, index) {

        if (this.timeline.length === 0) { return this; }

        if (index === undefined) { index = 0; }

        if (index === -1)
        {
            for (var i = 0; i < this.timeline.length; i++)
            {
                this.timeline[i][property] = value;
            }
        }
        else
        {
            this.timeline[index][property] = value;
        }

        return this;

    },

    /**
    * Sets the delay in milliseconds before this tween will start. If there are child tweens it sets the delay before the first child starts.
    * The delay is invoked as soon as you call `Tween.start`. If the tween is already running this method doesn't do anything for the current active tween.
    * If you have not yet called `Tween.to` or `Tween.from` at least once then this method will do nothing, as there are no tweens to delay.
    * If you have child tweens and pass -1 as the index value it sets the delay across all of them.
    *
    * @method Phaser.Tween#delay
    * @param {number} duration - The amount of time in ms that the Tween should wait until it begins once started is called. Set to zero to remove any active delay.
    * @param {number} [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the delay on all the children.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    delay: function (duration, index) {

        return this.updateTweenData('delay', duration, index);

    },

    /**
    * Sets the number of times this tween will repeat.
    * If you have not yet called `Tween.to` or `Tween.from` at least once then this method will do nothing, as there are no tweens to repeat.
    * If you have child tweens and pass -1 as the index value it sets the number of times they'll repeat across all of them.
    * If you wish to define how many times this Tween and all children will repeat see Tween.repeatAll.
    *
    * @method Phaser.Tween#repeat
    * @param {number} total - How many times a tween should repeat before completing. Set to zero to remove an active repeat. Set to -1 to repeat forever.
    * @param {number} [repeat=0] - This is the amount of time to pause (in ms) before the repeat will start.
    * @param {number} [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the repeat value on all the children.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    repeat: function (total, repeatDelay, index) {

        if (repeatDelay === undefined) { repeatDelay = 0; }

        this.updateTweenData('repeatCounter', total, index);

        return this.updateTweenData('repeatDelay', repeatDelay, index);

    },

    /**
    * Sets the delay in milliseconds before this tween will repeat itself.
    * The repeatDelay is invoked as soon as you call `Tween.start`. If the tween is already running this method doesn't do anything for the current active tween.
    * If you have not yet called `Tween.to` or `Tween.from` at least once then this method will do nothing, as there are no tweens to set repeatDelay on.
    * If you have child tweens and pass -1 as the index value it sets the repeatDelay across all of them.
    *
    * @method Phaser.Tween#repeatDelay
    * @param {number} duration - The amount of time in ms that the Tween should wait until it repeats or yoyos once start is called. Set to zero to remove any active repeatDelay.
    * @param {number} [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the repeatDelay on all the children.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    repeatDelay: function (duration, index) {

        return this.updateTweenData('repeatDelay', duration, index);

    },

    /**
    * A Tween that has yoyo set to true will run through from its starting values to its end values and then play back in reverse from end to start.
    * Used in combination with repeat you can create endless loops.
    * If you have not yet called `Tween.to` or `Tween.from` at least once then this method will do nothing, as there are no tweens to yoyo.
    * If you have child tweens and pass -1 as the index value it sets the yoyo property across all of them.
    * If you wish to yoyo this Tween and all of its children then see Tween.yoyoAll.
    *
    * @method Phaser.Tween#yoyo
    * @param {boolean} enable - Set to true to yoyo this tween, or false to disable an already active yoyo.
    * @param {number} [yoyoDelay=0] - This is the amount of time to pause (in ms) before the yoyo will start.
    * @param {number} [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set yoyo on all the children.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    yoyo: function(enable, yoyoDelay, index) {

        if (yoyoDelay === undefined) { yoyoDelay = 0; }

        this.updateTweenData('yoyo', enable, index);

        return this.updateTweenData('yoyoDelay', yoyoDelay, index);

    },

    /**
    * Sets the delay in milliseconds before this tween will run a yoyo (only applies if yoyo is enabled).
    * The repeatDelay is invoked as soon as you call `Tween.start`. If the tween is already running this method doesn't do anything for the current active tween.
    * If you have not yet called `Tween.to` or `Tween.from` at least once then this method will do nothing, as there are no tweens to set repeatDelay on.
    * If you have child tweens and pass -1 as the index value it sets the repeatDelay across all of them.
    *
    * @method Phaser.Tween#yoyoDelay
    * @param {number} duration - The amount of time in ms that the Tween should wait until it repeats or yoyos once start is called. Set to zero to remove any active yoyoDelay.
    * @param {number} [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the yoyoDelay on all the children.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    yoyoDelay: function (duration, index) {

        return this.updateTweenData('yoyoDelay', duration, index);

    },

    /**
    * Set easing function this tween will use, i.e. Phaser.Easing.Linear.None.
    * The ease function allows you define the rate of change. You can pass either a function such as Phaser.Easing.Circular.Out or a string such as "Circ".
    * ".easeIn", ".easeOut" and "easeInOut" variants are all supported for all ease types.
    * If you have child tweens and pass -1 as the index value it sets the easing function defined here across all of them.
    *
    * @method Phaser.Tween#easing
    * @param {function|string} ease - The easing function this tween will use, i.e. Phaser.Easing.Linear.None.
    * @param {number} [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the easing function on all children.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    easing: function (ease, index) {

        if (typeof ease === 'string' && this.manager.easeMap[ease])
        {
            ease = this.manager.easeMap[ease];
        }

        return this.updateTweenData('easingFunction', ease, index);

    },

    /**
    * Sets the interpolation function the tween will use. By default it uses Phaser.Math.linearInterpolation.
    * Also available: Phaser.Math.bezierInterpolation and Phaser.Math.catmullRomInterpolation.
    * The interpolation function is only used if the target properties is an array.
    * If you have child tweens and pass -1 as the index value and it will set the interpolation function across all of them.
    *
    * @method Phaser.Tween#interpolation
    * @param {function} interpolation - The interpolation function to use (Phaser.Math.linearInterpolation by default)
    * @param {object} [context] - The context under which the interpolation function will be run.
    * @param {number} [index=0] - If this tween has more than one child this allows you to target a specific child. If set to -1 it will set the interpolation function on all children.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    interpolation: function (interpolation, context, index) {

        if (context === undefined) { context = Phaser.Math; }

        this.updateTweenData('interpolationFunction', interpolation, index);

        return this.updateTweenData('interpolationContext', context, index);

    },

    /**
    * Set how many times this tween and all of its children will repeat.
    * A tween (A) with 3 children (B,C,D) with a `repeatAll` value of 2 would play as: ABCDABCD before completing.
    * When all child tweens have completed Tween.onLoop will be dispatched.
    *
    * @method Phaser.Tween#repeat
    * @param {number} total - How many times this tween and all children should repeat before completing. Set to zero to remove an active repeat. Set to -1 to repeat forever.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    repeatAll: function (total) {

        if (total === undefined) { total = 0; }

        this.repeatCounter = total;

        return this;

    },

    /**
    * This method allows you to chain tweens together. Any tween chained to this tween will have its `Tween.start` method called
    * as soon as this tween completes. If this tween never completes (i.e. repeatAll or loop is set) then the chain will never progress.
    * Note that `Tween.onComplete` will fire when *this* tween completes, not when the whole chain completes.
    * For that you should listen to `onComplete` on the final tween in your chain.
    *
    * If you pass multiple tweens to this method they will be joined into a single long chain.
    * For example if this is Tween A and you pass in B, C and D then B will be chained to A, C will be chained to B and D will be chained to C.
    * Any previously chained tweens that may have been set will be overwritten.
    *
    * @method Phaser.Tween#chain
    * @param {...Phaser.Tween} tweens - One or more tweens that will be chained to this one.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    chain: function () {

        var i = arguments.length;

        while (i--)
        {
            if (i > 0)
            {
                arguments[i - 1].chainedTween = arguments[i];
            }
            else
            {
                this.chainedTween = arguments[i];
            }
        }

        return this;

    },

    /**
    * Enables the looping of this tween and all child tweens. If this tween has no children this setting has no effect.
    * If `value` is `true` then this is the same as setting `Tween.repeatAll(-1)`.
    * If `value` is `false` it is the same as setting `Tween.repeatAll(0)` and will reset the `repeatCounter` to zero.
    *
    * Usage:
    * game.add.tween(p).to({ x: 700 }, 1000, Phaser.Easing.Linear.None, true)
    * .to({ y: 300 }, 1000, Phaser.Easing.Linear.None)
    * .to({ x: 0 }, 1000, Phaser.Easing.Linear.None)
    * .to({ y: 0 }, 1000, Phaser.Easing.Linear.None)
    * .loop();
    * @method Phaser.Tween#loop
    * @param {boolean} [value=true] - If `true` this tween and any child tweens will loop once they reach the end. Set to `false` to remove an active loop.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    loop: function (value) {

        if (value === undefined) { value = true; }

        if (value)
        {
            this.repeatAll(-1);
        }
        else
        {
            this.repeatCounter = 0;
        }

        return this;

    },

    /**
    * Sets a callback to be fired each time this tween updates.
    *
    * @method Phaser.Tween#onUpdateCallback
    * @param {function} callback - The callback to invoke each time this tween is updated. Set to `null` to remove an already active callback.
    * @param {object} callbackContext - The context in which to call the onUpdate callback.
    * @return {Phaser.Tween} This tween. Useful for method chaining.
    */
    onUpdateCallback: function (callback, callbackContext) {

        this._onUpdateCallback = callback;
        this._onUpdateCallbackContext = callbackContext;

        return this;

    },

    /**
    * Pauses the tween. Resume playback with Tween.resume.
    *
    * @method Phaser.Tween#pause
    */
    pause: function () {

        this.isPaused = true;

        this._codePaused = true;

        this._pausedTime = this.game.time.time;

    },

    /**
    * This is called by the core Game loop. Do not call it directly, instead use Tween.pause.
    *
    * @private
    * @method Phaser.Tween#_pause
    */
    _pause: function () {

        if (!this._codePaused)
        {
            this.isPaused = true;

            this._pausedTime = this.game.time.time;
        }

    },

    /**
    * Resumes a paused tween.
    *
    * @method Phaser.Tween#resume
    */
    resume: function () {

        if (this.isPaused)
        {
            this.isPaused = false;

            this._codePaused = false;

            for (var i = 0; i < this.timeline.length; i++)
            {
                if (!this.timeline[i].isRunning)
                {
                    this.timeline[i].startTime += (this.game.time.time - this._pausedTime);
                }
            }
        }

    },

    /**
    * This is called by the core Game loop. Do not call it directly, instead use Tween.pause.
    * @method Phaser.Tween#_resume
    * @private
    */
    _resume: function () {

        if (this._codePaused)
        {
            return;
        }
        else
        {
            this.resume();
        }

    },

    /**
    * Core tween update function called by the TweenManager. Does not need to be invoked directly.
    *
    * @method Phaser.Tween#update
    * @param {number} time - A timestamp passed in by the TweenManager.
    * @return {boolean} false if the tween and all child tweens have completed and should be deleted from the manager, otherwise true (still active).
    */
    update: function (time) {

        if (this.pendingDelete)
        {
            return false;
        }

        if (this.isPaused)
        {
            return true;
        }

        var status = this.timeline[this.current].update(time);

        if (status === Phaser.TweenData.PENDING)
        {
            return true;
        }
        else if (status === Phaser.TweenData.RUNNING)
        {
            if (!this._hasStarted)
            {
                this.onStart.dispatch(this.target, this);
                this._hasStarted = true;
            }

            if (this._onUpdateCallback !== null)
            {
                this._onUpdateCallback.call(this._onUpdateCallbackContext, this, this.timeline[this.current].value, this.timeline[this.current]);
            }

            //  In case the update callback modifies this tween
            return this.isRunning;
        }
        else if (status === Phaser.TweenData.LOOPED)
        {
            this.onLoop.dispatch(this.target, this);
            return true;
        }
        else if (status === Phaser.TweenData.COMPLETE)
        {
            var complete = false;

            //  What now?
            if (this.reverse)
            {
                this.current--;

                if (this.current < 0)
                {
                    this.current = this.timeline.length - 1;
                    complete = true;
                }
            }
            else
            {
                this.current++;

                if (this.current === this.timeline.length)
                {
                    this.current = 0;
                    complete = true;
                }
            }

            if (complete)
            {
                //  We've reached the start or end of the child tweens (depending on Tween.reverse), should we repeat it?
                if (this.repeatCounter === -1)
                {
                    this.timeline[this.current].start();
                    this.onRepeat.dispatch(this.target, this);
                    return true;
                }
                else if (this.repeatCounter > 0)
                {
                    this.repeatCounter--;

                    this.timeline[this.current].start();
                    this.onRepeat.dispatch(this.target, this);
                    return true;
                }
                else
                {
                    //  No more repeats and no more children, so we're done
                    this.isRunning = false;
                    this.onComplete.dispatch(this.target, this);

                    if (this.chainedTween)
                    {
                        this.chainedTween.start();
                    }

                    return false;
                }
            }
            else
            {
                //  We've still got some children to go
                this.onChildComplete.dispatch(this.target, this);
                this.timeline[this.current].start();
                return true;
            }
        }

    },

    /**
    * This will generate an array populated with the tweened object values from start to end.
    * It works by running the tween simulation at the given frame rate based on the values set-up in Tween.to and Tween.from.
    * It ignores delay and repeat counts and any chained tweens, but does include child tweens.
    * Just one play through of the tween data is returned, including yoyo if set.
    *
    * @method Phaser.Tween#generateData
    * @param {number} [frameRate=60] - The speed in frames per second that the data should be generated at. The higher the value, the larger the array it creates.
    * @param {array} [data] - If given the generated data will be appended to this array, otherwise a new array will be returned.
    * @return {array} An array of tweened values.
    */
    generateData: function (frameRate, data) {

        if (this.game === null || this.target === null)
        {
            return null;
        }

        if (frameRate === undefined) {
            frameRate = 60;
        }

        if (data === undefined) {
            data = [];
        }

        //  Populate the tween data
        for (var i = 0; i < this.timeline.length; i++)
        {
            //  Build our master property list with the starting values
            for (var property in this.timeline[i].vEnd)
            {
                this.properties[property] = this.target[property] || 0;

                if (!Array.isArray(this.properties[property]))
                {
                    //  Ensures we're using numbers, not strings
                    this.properties[property] *= 1.0;
                }
            }
        }

        for (var i = 0; i < this.timeline.length; i++)
        {
            this.timeline[i].loadValues();
        }

        for (var i = 0; i < this.timeline.length; i++)
        {
            data = data.concat(this.timeline[i].generateData(frameRate));
        }

        return data;

    }

};

/**
* @name Phaser.Tween#totalDuration
* @property {Phaser.TweenData} totalDuration - Gets the total duration of this Tween, including all child tweens, in milliseconds.
*/
Object.defineProperty(Phaser.Tween.prototype, 'totalDuration', {

    get: function () {

        var total = 0;

        for (var i = 0; i < this.timeline.length; i++)
        {
            total += this.timeline[i].duration;
        }

        return total;

    }

});

Phaser.Tween.prototype.constructor = Phaser.Tween;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Phaser.Tween contains at least one TweenData object. It contains all of the tween data values, such as the
* starting and ending values, the ease function, interpolation and duration. The Tween acts as a timeline manager for
* TweenData objects and can contain multiple TweenData objects.
*
* @class Phaser.TweenData
* @constructor
* @param {Phaser.Tween} parent - The Tween that owns this TweenData object.
*/
Phaser.TweenData = function (parent) {

    /**
    * @property {Phaser.Tween} parent - The Tween which owns this TweenData.
    */
    this.parent = parent;

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = parent.game;

    /**
    * @property {object} vStart - An object containing the values at the start of the tween.
    * @private
    */
    this.vStart = {};

    /**
    * @property {object} vStartCache - Cached starting values.
    * @private
    */
    this.vStartCache = {};

    /**
    * @property {object} vEnd - An object containing the values at the end of the tween.
    * @private
    */
    this.vEnd = {};

    /**
    * @property {object} vEndCache - Cached ending values.
    * @private
    */
    this.vEndCache = {};

    /**
    * @property {number} duration - The duration of the tween in ms.
    * @default
    */
    this.duration = 1000;

    /**
    * @property {number} percent - A value between 0 and 1 that represents how far through the duration this tween is.
    * @readonly
    */
    this.percent = 0;

    /**
    * @property {number} value - The current calculated value.
    * @readonly
    */
    this.value = 0;

    /**
    * @property {number} repeatCounter - If the Tween is set to repeat this contains the current repeat count.
    */
    this.repeatCounter = 0;

    /**
    * @property {number} repeatDelay - The amount of time in ms between repeats of this tween.
    */
    this.repeatDelay = 0;

    /**
    * @property {boolean} interpolate - True if the Tween will use interpolation (i.e. is an Array to Array tween)
    * @default
    */
    this.interpolate = false;

    /**
    * @property {boolean} yoyo - True if the Tween is set to yoyo, otherwise false.
    * @default
    */
    this.yoyo = false;

    /**
    * @property {number} yoyoDelay - The amount of time in ms between yoyos of this tween.
    */
    this.yoyoDelay = 0;

    /**
    * @property {boolean} inReverse - When a Tween is yoyoing this value holds if it's currently playing forwards (false) or in reverse (true).
    * @default
    */
    this.inReverse = false;

    /**
    * @property {number} delay - The amount to delay by until the Tween starts (in ms). Only applies to the start, use repeatDelay to handle repeats.
    * @default
    */
    this.delay = 0;

    /**
    * @property {number} dt - Current time value.
    */
    this.dt = 0;

    /**
    * @property {number} startTime - The time the Tween started or null if it hasn't yet started.
    */
    this.startTime = null;

    /**
    * @property {function} easingFunction - The easing function used for the Tween.
    * @default Phaser.Easing.Default
    */
    this.easingFunction = Phaser.Easing.Default;

    /**
    * @property {function} interpolationFunction - The interpolation function used for the Tween.
    * @default Phaser.Math.linearInterpolation
    */
    this.interpolationFunction = Phaser.Math.linearInterpolation;

    /**
    * @property {object} interpolationContext - The interpolation function context used for the Tween.
    * @default Phaser.Math
    */
    this.interpolationContext = Phaser.Math;

    /**
    * @property {boolean} isRunning - If the tween is running this is set to `true`. Unless Phaser.Tween a TweenData that is waiting for a delay to expire is *not* considered as running.
    * @default
    */
    this.isRunning = false;

    /**
    * @property {boolean} isFrom - Is this a from tween or a to tween?
    * @default
    */
    this.isFrom = false;

};

/**
* @constant
* @type {number}
*/
Phaser.TweenData.PENDING = 0;

/**
* @constant
* @type {number}
*/
Phaser.TweenData.RUNNING = 1;

/**
* @constant
* @type {number}
*/
Phaser.TweenData.LOOPED = 2;

/**
* @constant
* @type {number}
*/
Phaser.TweenData.COMPLETE = 3;

Phaser.TweenData.prototype = {

    /**
    * Sets this tween to be a `to` tween on the properties given. A `to` tween starts at the current value and tweens to the destination value given.
    * For example a Sprite with an `x` coordinate of 100 could be tweened to `x` 200 by giving a properties object of `{ x: 200 }`.
    *
    * @method Phaser.TweenData#to
    * @param {object} properties - The properties you want to tween, such as `Sprite.x` or `Sound.volume`. Given as a JavaScript object.
    * @param {number} [duration=1000] - Duration of this tween in ms.
    * @param {function} [ease=null] - Easing function. If not set it will default to Phaser.Easing.Default, which is Phaser.Easing.Linear.None by default but can be over-ridden at will.
    * @param {number} [delay=0] - Delay before this tween will start, defaults to 0 (no delay). Value given is in ms.
    * @param {number} [repeat=0] - Should the tween automatically restart once complete? If you want it to run forever set as -1. This ignores any chained tweens.
    * @param {boolean} [yoyo=false] - A tween that yoyos will reverse itself and play backwards automatically. A yoyo'd tween doesn't fire the Tween.onComplete event, so listen for Tween.onLoop instead.
    * @return {Phaser.TweenData} This Tween object.
    */
    to: function (properties, duration, ease, delay, repeat, yoyo) {

        this.vEnd = properties;
        this.duration = duration;
        this.easingFunction = ease;
        this.delay = delay;
        this.repeatCounter = repeat;
        this.yoyo = yoyo;

        this.isFrom = false;

        return this;

    },

    /**
    * Sets this tween to be a `from` tween on the properties given. A `from` tween sets the target to the destination value and tweens to its current value.
    * For example a Sprite with an `x` coordinate of 100 tweened from `x` 500 would be set to `x` 500 and then tweened to `x` 100 by giving a properties object of `{ x: 500 }`.
    *
    * @method Phaser.TweenData#from
    * @param {object} properties - The properties you want to tween, such as `Sprite.x` or `Sound.volume`. Given as a JavaScript object.
    * @param {number} [duration=1000] - Duration of this tween in ms.
    * @param {function} [ease=null] - Easing function. If not set it will default to Phaser.Easing.Default, which is Phaser.Easing.Linear.None by default but can be over-ridden at will.
    * @param {number} [delay=0] - Delay before this tween will start, defaults to 0 (no delay). Value given is in ms.
    * @param {number} [repeat=0] - Should the tween automatically restart once complete? If you want it to run forever set as -1. This ignores any chained tweens.
    * @param {boolean} [yoyo=false] - A tween that yoyos will reverse itself and play backwards automatically. A yoyo'd tween doesn't fire the Tween.onComplete event, so listen for Tween.onLoop instead.
    * @return {Phaser.TweenData} This Tween object.
    */
    from: function (properties, duration, ease, delay, repeat, yoyo) {

        this.vEnd = properties;
        this.duration = duration;
        this.easingFunction = ease;
        this.delay = delay;
        this.repeatCounter = repeat;
        this.yoyo = yoyo;

        this.isFrom = true;

        return this;

    },

    /**
    * Starts the Tween running.
    *
    * @method Phaser.TweenData#start
    * @return {Phaser.TweenData} This Tween object.
    */
    start: function () {

        this.startTime = this.game.time.time + this.delay;

        if (this.parent.reverse)
        {
            this.dt = this.duration;
        }
        else
        {
            this.dt = 0;
        }

        if (this.delay > 0)
        {
            this.isRunning = false;
        }
        else
        {
            this.isRunning = true;
        }

        if (this.isFrom)
        {
            //  Reverse them all and instant set them
            for (var property in this.vStartCache)
            {
                this.vStart[property] = this.vEndCache[property];
                this.vEnd[property] = this.vStartCache[property];
                this.parent.target[property] = this.vStart[property];
            }
        }

        this.value = 0;
        this.yoyoCounter = 0;

        return this;

    },

    /**
    * Loads the values from the target object into this Tween.
    *
    * @private
    * @method Phaser.TweenData#loadValues
    * @return {Phaser.TweenData} This Tween object.
    */
    loadValues: function () {

        for (var property in this.parent.properties)
        {
            //  Load the property from the parent object
            this.vStart[property] = this.parent.properties[property];

            //  Check if an Array was provided as property value
            if (Array.isArray(this.vEnd[property]))
            {
                if (this.vEnd[property].length === 0)
                {
                    continue;
                }

                if (this.percent === 0)
                {
                    //  Put the start value at the beginning of the array
                    //  but we only want to do this once, if the Tween hasn't run before
                    this.vEnd[property] = [this.vStart[property]].concat(this.vEnd[property]);
                }
            }

            if (typeof this.vEnd[property] !== 'undefined')
            {
                if (typeof this.vEnd[property] === 'string')
                {
                    //  Parses relative end values with start as base (e.g.: +10, -3)
                    this.vEnd[property] = this.vStart[property] + parseFloat(this.vEnd[property], 10);
                }

                this.parent.properties[property] = this.vEnd[property];
            }
            else
            {
                //  Null tween
                this.vEnd[property] = this.vStart[property];
            }

            this.vStartCache[property] = this.vStart[property];
            this.vEndCache[property] = this.vEnd[property];
        }

        return this;

    },

    /**
    * Updates this Tween. This is called automatically by Phaser.Tween.
    *
    * @protected
    * @method Phaser.TweenData#update
    * @param {number} time - A timestamp passed in by the Tween parent.
    * @return {number} The current status of this Tween. One of the Phaser.TweenData constants: PENDING, RUNNING, LOOPED or COMPLETE.
    */
    update: function (time) {

        if (!this.isRunning)
        {
            if (time >= this.startTime)
            {
                this.isRunning = true;
            }
            else
            {
                return Phaser.TweenData.PENDING;
            }
        }
        else
        {
            //  Is Running, but is waiting to repeat
            if (time < this.startTime)
            {
                return Phaser.TweenData.RUNNING;
            }
        }

        if (this.parent.reverse)
        {
            this.dt -= this.game.time.elapsedMS * this.parent.timeScale;
            this.dt = Math.max(this.dt, 0);
        }
        else
        {
            this.dt += this.game.time.elapsedMS * this.parent.timeScale;
            this.dt = Math.min(this.dt, this.duration);
        }

        this.percent = this.dt / this.duration;

        this.value = this.easingFunction(this.percent);

        for (var property in this.vEnd)
        {
            var start = this.vStart[property];
            var end = this.vEnd[property];

            if (Array.isArray(end))
            {
                this.parent.target[property] = this.interpolationFunction.call(this.interpolationContext, end, this.value);
            }
            else
            {
                this.parent.target[property] = start + ((end - start) * this.value);
            }
        }

        if ((!this.parent.reverse && this.percent === 1) || (this.parent.reverse && this.percent === 0))
        {
            return this.repeat();
        }
        
        return Phaser.TweenData.RUNNING;

    },

    /**
    * This will generate an array populated with the tweened object values from start to end.
    * It works by running the tween simulation at the given frame rate based on the values set-up in Tween.to and Tween.from.
    * Just one play through of the tween data is returned, including yoyo if set.
    *
    * @method Phaser.TweenData#generateData
    * @param {number} [frameRate=60] - The speed in frames per second that the data should be generated at. The higher the value, the larger the array it creates.
    * @return {array} An array of tweened values.
    */
    generateData: function (frameRate) {

        if (this.parent.reverse)
        {
            this.dt = this.duration;
        }
        else
        {
            this.dt = 0;
        }

        var data = [];
        var complete = false;
        var fps = (1 / frameRate) * 1000;

        do
        {
            if (this.parent.reverse)
            {
                this.dt -= fps;
                this.dt = Math.max(this.dt, 0);
            }
            else
            {
                this.dt += fps;
                this.dt = Math.min(this.dt, this.duration);
            }

            this.percent = this.dt / this.duration;

            this.value = this.easingFunction(this.percent);

            var blob = {};

            for (var property in this.vEnd)
            {
                var start = this.vStart[property];
                var end = this.vEnd[property];

                if (Array.isArray(end))
                {
                    blob[property] = this.interpolationFunction(end, this.value);
                }
                else
                {
                    blob[property] = start + ((end - start) * this.value);
                }
            }

            data.push(blob);

            if ((!this.parent.reverse && this.percent === 1) || (this.parent.reverse && this.percent === 0))
            {
                complete = true;
            }

        } while (!complete);

        if (this.yoyo)
        {
            var reversed = data.slice();
            reversed.reverse();
            data = data.concat(reversed);
        }

        return data;

    },

    /**
    * Checks if this Tween is meant to repeat or yoyo and handles doing so.
    *
    * @private
    * @method Phaser.TweenData#repeat
    * @return {number} Either Phaser.TweenData.LOOPED or Phaser.TweenData.COMPLETE.
    */
    repeat: function () {

        //  If not a yoyo and repeatCounter = 0 then we're done
        if (this.yoyo)
        {
            //  We're already in reverse mode, which means the yoyo has finished and there's no repeats, so end
            if (this.inReverse && this.repeatCounter === 0)
            {
                return Phaser.TweenData.COMPLETE;
            }

            this.inReverse = !this.inReverse;
        }
        else
        {
            if (this.repeatCounter === 0)
            {
                return Phaser.TweenData.COMPLETE;
            }
        }

        if (this.inReverse)
        {
            //  If inReverse we're going from vEnd to vStartCache
            for (var property in this.vStartCache)
            {
                this.vStart[property] = this.vEndCache[property];
                this.vEnd[property] = this.vStartCache[property];
            }
        }
        else
        {
            //  If not inReverse we're just repopulating the cache again
            for (var property in this.vStartCache)
            {
                this.vStart[property] = this.vStartCache[property];
                this.vEnd[property] = this.vEndCache[property];
            }

            //  -1 means repeat forever, otherwise decrement the repeatCounter
            //  We only decrement this counter if the tween isn't doing a yoyo, as that doesn't count towards the repeat total
            if (this.repeatCounter > 0)
            {
                this.repeatCounter--;
            }
        }

        this.startTime = this.game.time.time;

        if (this.yoyo && this.inReverse)
        {
            this.startTime += this.yoyoDelay;
        }
        else if (!this.inReverse)
        {
            this.startTime += this.repeatDelay;
        }

        if (this.parent.reverse)
        {
            this.dt = this.duration;
        }
        else
        {
            this.dt = 0;
        }

        return Phaser.TweenData.LOOPED;

    }

};

Phaser.TweenData.prototype.constructor = Phaser.TweenData;

/* jshint curly: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A collection of easing methods defining ease-in and ease-out curves.
*
* @class Phaser.Easing
*/
Phaser.Easing = {

    /**
    * Linear easing.
    *
    * @class Phaser.Easing.Linear
    */
    Linear: {

        /**
        * Linear Easing (no variation).
        *
        * @method Phaser.Easing.Linear#None
        * @param {number} k - The value to be tweened.
        * @returns {number} k.
        */
        None: function ( k ) {

            return k;

        }

    },

    /**
    * Quadratic easing.
    *
    * @class Phaser.Easing.Quadratic
    */
    Quadratic: {

        /**
        * Ease-in.
        *
        * @method Phaser.Easing.Quadratic#In
        * @param {number} k - The value to be tweened.
        * @returns {number} k^2.
        */
        In: function ( k ) {

            return k * k;

        },

        /**
        * Ease-out.
        *
        * @method Phaser.Easing.Quadratic#Out
        * @param {number} k - The value to be tweened.
        * @returns {number} k* (2-k).
        */
        Out: function ( k ) {

            return k * ( 2 - k );

        },

        /**
        * Ease-in/out.
        *
        * @method Phaser.Easing.Quadratic#InOut
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        InOut: function ( k ) {

            if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
            return - 0.5 * ( --k * ( k - 2 ) - 1 );

        }

    },

    /**
    * Cubic easing.
    *
    * @class Phaser.Easing.Cubic
    */
    Cubic: {

        /**
        * Cubic ease-in.
        *
        * @method Phaser.Easing.Cubic#In
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        In: function ( k ) {

            return k * k * k;

        },

        /**
        * Cubic ease-out.
        *
        * @method Phaser.Easing.Cubic#Out
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        Out: function ( k ) {

            return --k * k * k + 1;

        },

        /**
        * Cubic ease-in/out.
        *
        * @method Phaser.Easing.Cubic#InOut
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        InOut: function ( k ) {

            if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
            return 0.5 * ( ( k -= 2 ) * k * k + 2 );

        }

    },

    /**
    * Quartic easing.
    *
    * @class Phaser.Easing.Quartic
    */
    Quartic: {

        /**
        * Quartic ease-in.
        *
        * @method Phaser.Easing.Quartic#In
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        In: function ( k ) {

            return k * k * k * k;

        },

        /**
        * Quartic ease-out.
        *
        * @method Phaser.Easing.Quartic#Out
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        Out: function ( k ) {

            return 1 - ( --k * k * k * k );

        },

        /**
        * Quartic ease-in/out.
        *
        * @method Phaser.Easing.Quartic#InOut
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        InOut: function ( k ) {

            if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
            return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

        }

    },

    /**
    * Quintic easing.
    *
    * @class Phaser.Easing.Quintic
    */
    Quintic: {

        /**
        * Quintic ease-in.
        *
        * @method Phaser.Easing.Quintic#In
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        In: function ( k ) {

            return k * k * k * k * k;

        },

        /**
        * Quintic ease-out.
        *
        * @method Phaser.Easing.Quintic#Out
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        Out: function ( k ) {

            return --k * k * k * k * k + 1;

        },

        /**
        * Quintic ease-in/out.
        *
        * @method Phaser.Easing.Quintic#InOut
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        InOut: function ( k ) {

            if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
            return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

        }

    },

    /**
    * Sinusoidal easing.
    *
    * @class Phaser.Easing.Sinusoidal
    */
    Sinusoidal: {

        /**
        * Sinusoidal ease-in.
        *
        * @method Phaser.Easing.Sinusoidal#In
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        In: function ( k ) {

            if (k === 0) return 0;
            if (k === 1) return 1;
            return 1 - Math.cos( k * Math.PI / 2 );

        },

        /**
        * Sinusoidal ease-out.
        *
        * @method Phaser.Easing.Sinusoidal#Out
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        Out: function ( k ) {

            if (k === 0) return 0;
            if (k === 1) return 1;
            return Math.sin( k * Math.PI / 2 );

        },

        /**
        * Sinusoidal ease-in/out.
        *
        * @method Phaser.Easing.Sinusoidal#InOut
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        InOut: function ( k ) {

            if (k === 0) return 0;
            if (k === 1) return 1;
            return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

        }

    },

    /**
    * Exponential easing.
    *
    * @class Phaser.Easing.Exponential
    */
    Exponential: {

        /**
        * Exponential ease-in.
        *
        * @method Phaser.Easing.Exponential#In
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        In: function ( k ) {

            return k === 0 ? 0 : Math.pow( 1024, k - 1 );

        },

        /**
        * Exponential ease-out.
        *
        * @method Phaser.Easing.Exponential#Out
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        Out: function ( k ) {

            return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

        },

        /**
        * Exponential ease-in/out.
        *
        * @method Phaser.Easing.Exponential#InOut
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        InOut: function ( k ) {

            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
            return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

        }

    },

    /**
    * Circular easing.
    *
    * @class Phaser.Easing.Circular
    */
    Circular: {

        /**
        * Circular ease-in.
        *
        * @method Phaser.Easing.Circular#In
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        In: function ( k ) {

            return 1 - Math.sqrt( 1 - k * k );

        },

        /**
        * Circular ease-out.
        *
        * @method Phaser.Easing.Circular#Out
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        Out: function ( k ) {

            return Math.sqrt( 1 - ( --k * k ) );

        },

        /**
        * Circular ease-in/out.
        *
        * @method Phaser.Easing.Circular#InOut
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        InOut: function ( k ) {

            if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
            return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

        }

    },

    /**
    * Elastic easing.
    *
    * @class Phaser.Easing.Elastic
    */
    Elastic: {

        /**
        * Elastic ease-in.
        *
        * @method Phaser.Easing.Elastic#In
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        In: function ( k ) {

            var s, a = 0.1, p = 0.4;
            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( !a || a < 1 ) { a = 1; s = p / 4; }
            else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

        },

        /**
        * Elastic ease-out.
        *
        * @method Phaser.Easing.Elastic#Out
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        Out: function ( k ) {

            var s, a = 0.1, p = 0.4;
            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( !a || a < 1 ) { a = 1; s = p / 4; }
            else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

        },

        /**
        * Elastic ease-in/out.
        *
        * @method Phaser.Easing.Elastic#InOut
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        InOut: function ( k ) {

            var s, a = 0.1, p = 0.4;
            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( !a || a < 1 ) { a = 1; s = p / 4; }
            else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
            return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

        }

    },

    /**
    * Back easing.
    *
    * @class Phaser.Easing.Back
    */
    Back: {

        /**
        * Back ease-in.
        *
        * @method Phaser.Easing.Back#In
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        In: function ( k ) {

            var s = 1.70158;
            return k * k * ( ( s + 1 ) * k - s );

        },

        /**
        * Back ease-out.
        *
        * @method Phaser.Easing.Back#Out
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        Out: function ( k ) {

            var s = 1.70158;
            return --k * k * ( ( s + 1 ) * k + s ) + 1;

        },

        /**
        * Back ease-in/out.
        *
        * @method Phaser.Easing.Back#InOut
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        InOut: function ( k ) {

            var s = 1.70158 * 1.525;
            if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
            return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

        }

    },

    /**
    * Bounce easing.
    *
    * @class Phaser.Easing.Bounce
    */
    Bounce: {

        /**
        * Bounce ease-in.
        *
        * @method Phaser.Easing.Bounce#In
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        In: function ( k ) {

            return 1 - Phaser.Easing.Bounce.Out( 1 - k );

        },

        /**
        * Bounce ease-out.
        *
        * @method Phaser.Easing.Bounce#Out
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        Out: function ( k ) {

            if ( k < ( 1 / 2.75 ) ) {

                return 7.5625 * k * k;

            } else if ( k < ( 2 / 2.75 ) ) {

                return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

            } else if ( k < ( 2.5 / 2.75 ) ) {

                return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

            } else {

                return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

            }

        },

        /**
        * Bounce ease-in/out.
        *
        * @method Phaser.Easing.Bounce#InOut
        * @param {number} k - The value to be tweened.
        * @returns {number} The tweened value.
        */
        InOut: function ( k ) {

            if ( k < 0.5 ) return Phaser.Easing.Bounce.In( k * 2 ) * 0.5;
            return Phaser.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

        }

    }

};

Phaser.Easing.Default = Phaser.Easing.Linear.None;
Phaser.Easing.Power0 = Phaser.Easing.Linear.None;
Phaser.Easing.Power1 = Phaser.Easing.Quadratic.Out;
Phaser.Easing.Power2 = Phaser.Easing.Cubic.Out;
Phaser.Easing.Power3 = Phaser.Easing.Quartic.Out;
Phaser.Easing.Power4 = Phaser.Easing.Quintic.Out;
