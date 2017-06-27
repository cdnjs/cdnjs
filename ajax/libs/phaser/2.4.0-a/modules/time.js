/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* This is the core internal game clock.
*
* It manages the elapsed time and calculation of elapsed values, used for game object motion and tweens,
* and also handles the standard Timer pool.
*
* To create a general timed event, use the master {@link Phaser.Timer} accessible through {@link Phaser.Time.events events}.
*
* @class Phaser.Time
* @constructor
* @param {Phaser.Game} game A reference to the currently running game.
*/
Phaser.Time = function (game) {

    /**
    * @property {Phaser.Game} game - Local reference to game.
    * @protected
    */
    this.game = game;

    /**
    * The `Date.now()` value when the time was last updated.
    * @property {integer} time
    * @protected
    */
    this.time = 0;

    /**
    * The `now` when the previous update occurred.
    * @property {number} prevTime
    * @protected
    */
    this.prevTime = 0;

    /**
    * An increasing value representing cumulative milliseconds since an undisclosed epoch.
    *
    * While this value is in milliseconds and can be used to compute time deltas,
    * it must must _not_ be used with `Date.now()` as it may not use the same epoch / starting reference.
    *
    * The source may either be from a high-res source (eg. if RAF is available) or the standard Date.now;
    * the value can only be relied upon within a particular game instance.
    *
    * @property {number} now
    * @protected
    */
    this.now = 0;

    /**
    * Elapsed time since the last time update, in milliseconds, based on `now`.
    *
    * This value _may_ include time that the game is paused/inactive.
    *
    * _Note:_ This is updated only once per game loop - even if multiple logic update steps are done.
    * Use {@link Phaser.Timer#physicsTime physicsTime} as a basis of game/logic calculations instead.
    *
    * @property {number} elapsed
    * @see Phaser.Time.time
    * @protected
    */
    this.elapsed = 0;

    /**
    * The time in ms since the last time update, in milliseconds, based on `time`.
    *
    * This value is corrected for game pauses and will be "about zero" after a game is resumed.
    *
    * _Note:_ This is updated once per game loop - even if multiple logic update steps are done.
    * Use {@link Phaser.Timer#physicsTime physicsTime} as a basis of game/logic calculations instead.
    *
    * @property {integer} elapsedMS
    * @protected
    */
    this.elapsedMS = 0;

    /**
    * The physics update delta, in fractional seconds.
    *
    * This should be used as an applicable multiplier by all logic update steps (eg. `preUpdate/postUpdate/update`)
    * to ensure consistent game timing. Game/logic timing can drift from real-world time if the system
    * is unable to consistently maintain the desired FPS.
    *
    * With fixed-step updates this is normally equivalent to `1.0 / desiredFps`.
    *
    * @property {number} physicsElapsed
    */
    this.physicsElapsed = 0;

    /**
    * The physics update delta, in milliseconds - equivalent to `physicsElapsed * 1000`.
    *
    * @property {number} physicsElapsedMS
    */
    this.physicsElapsedMS = 0;

    /**
    * The desired frame rate of the game.
    *
    * This is used is used to calculate the physic/logic multiplier and how to apply catch-up logic updates.
    *
    * @property {number} desiredFps
    * @default
    */
    this.desiredFps = 60;

    /**
    * The suggested frame rate for your game, based on an averaged real frame rate.
    * This value is only populated if `Time.advancedTiming` is enabled.
    *
    * _Note:_ This is not available until after a few frames have passed; use it after a few seconds (eg. after the menus)
    *
    * @property {number} suggestedFps
    * @default
    */
    this.suggestedFps = null;

    /**
    * Scaling factor to make the game move smoothly in slow motion
    * - 1.0 = normal speed
    * - 2.0 = half speed
    * @property {number} slowMotion
    * @default
    */
    this.slowMotion = 1.0;

    /**
    * If true then advanced profiling, including the fps rate, fps min/max, suggestedFps and msMin/msMax are updated.
    * @property {boolean} advancedTiming
    * @default
    */
    this.advancedTiming = false;

    /**
    * Advanced timing result: The number of render frames record in the last second.
    *
    * Only calculated if {@link Phaser.Time#advancedTiming advancedTiming} is enabled.
    * @property {integer} frames
    * @readonly
    */
    this.frames = 0;

    /**
    * Advanced timing result: Frames per second.
    *
    * Only calculated if {@link Phaser.Time#advancedTiming advancedTiming} is enabled.
    * @property {number} fps
    * @readonly
    */
    this.fps = 0;

    /**
    * Advanced timing result: The lowest rate the fps has dropped to.
    *
    * Only calculated if {@link Phaser.Time#advancedTiming advancedTiming} is enabled.
    * This value can be manually reset.
    * @property {number} fpsMin
    */
    this.fpsMin = 1000;

    /**
    * Advanced timing result: The highest rate the fps has reached (usually no higher than 60fps).
    *
    * Only calculated if {@link Phaser.Time#advancedTiming advancedTiming} is enabled.
    * This value can be manually reset.
    * @property {number} fpsMax
    */
    this.fpsMax = 0;

    /**
    * Advanced timing result: The minimum amount of time the game has taken between consecutive frames.
    *
    * Only calculated if {@link Phaser.Time#advancedTiming advancedTiming} is enabled.
    * This value can be manually reset.
    * @property {number} msMin
    * @default
    */
    this.msMin = 1000;

    /**
    * Advanced timing result: The maximum amount of time the game has taken between consecutive frames.
    *
    * Only calculated if {@link Phaser.Time#advancedTiming advancedTiming} is enabled.
    * This value can be manually reset.
    * @property {number} msMax
    */
    this.msMax = 0;

    /**
    * Records how long the game was last paused, in milliseconds.
    * (This is not updated until the game is resumed.)
    * @property {number} pauseDuration
    */
    this.pauseDuration = 0;

    /**
    * @property {number} timeToCall - The value that setTimeout needs to work out when to next update
    * @protected
    */
    this.timeToCall = 0;

    /**
    * @property {number} timeExpected - The time when the next call is expected when using setTimer to control the update loop
    * @protected
    */
    this.timeExpected = 0;

    /**
    * A {@link Phaser.Timer} object bound to the master clock (this Time object) which events can be added to.
    * @property {Phaser.Timer} events
    */
    this.events = new Phaser.Timer(this.game, false);

    /**
    * @property {number} _frameCount - count the number of calls to time.update since the last suggestedFps was calculated
    * @private
    */
    this._frameCount = 0;

    /**
    * @property {number} _elapsedAcumulator - sum of the elapsed time since the last suggestedFps was calculated
    * @private
    */
    this._elapsedAccumulator = 0;

    /**
    * @property {number} _started - The time at which the Game instance started.
    * @private
    */
    this._started = 0;

    /**
    * @property {number} _timeLastSecond - The time (in ms) that the last second counter ticked over.
    * @private
    */
    this._timeLastSecond = 0;

    /**
    * @property {number} _pauseStarted - The time the game started being paused.
    * @private
    */
    this._pauseStarted = 0;

    /**
    * @property {boolean} _justResumed - Internal value used to recover from the game pause state.
    * @private
    */
    this._justResumed = false;

    /**
    * @property {Phaser.Timer[]} _timers - Internal store of Phaser.Timer objects.
    * @private
    */
    this._timers = [];

};

Phaser.Time.prototype = {

    /**
    * Called automatically by Phaser.Game after boot. Should not be called directly.
    *
    * @method Phaser.Time#boot
    * @protected
    */
    boot: function () {

        this._started = Date.now();
        this.time = Date.now();
        this.events.start();

    },

    /**
    * Adds an existing Phaser.Timer object to the Timer pool.
    *
    * @method Phaser.Time#add
    * @param {Phaser.Timer} timer - An existing Phaser.Timer object.
    * @return {Phaser.Timer} The given Phaser.Timer object.
    */
    add: function (timer) {

        this._timers.push(timer);

        return timer;

    },

    /**
    * Creates a new stand-alone Phaser.Timer object.
    *
    * @method Phaser.Time#create
    * @param {boolean} [autoDestroy=true] - A Timer that is set to automatically destroy itself will do so after all of its events have been dispatched (assuming no looping events).
    * @return {Phaser.Timer} The Timer object that was created.
    */
    create: function (autoDestroy) {

        if (autoDestroy === undefined) { autoDestroy = true; }

        var timer = new Phaser.Timer(this.game, autoDestroy);

        this._timers.push(timer);

        return timer;

    },

    /**
    * Remove all Timer objects, regardless of their state and clears all Timers from the {@link Phaser.Time#events events} timer.
    *
    * @method Phaser.Time#removeAll
    */
    removeAll: function () {

        for (var i = 0; i < this._timers.length; i++)
        {
            this._timers[i].destroy();
        }

        this._timers = [];

        this.events.removeAll();

    },

    /**
    * Updates the game clock and if enabled the advanced timing data. This is called automatically by Phaser.Game.
    *
    * @method Phaser.Time#update
    * @protected
    * @param {number} time - The current relative timestamp; see {@link Phaser.Time#now now}.
    */
    update: function (time) {

        if (this.game.raf._isSetTimeOut)
        {
            this.updateSetTimeout(time);
        }
        else
        {
            this.updateRAF(time);
        }

        if (this.advancedTiming)
        {
            this.updateAdvancedTiming();
        }

        //  Paused but still running?
        if (!this.game.paused)
        {
            //  Our internal Phaser.Timer
            this.events.update(this.time);

            if (this._timers.length)
            {
                this.updateTimers();
            }
        }

    },

    /**
    * setTimeOut specific time update handler.
    * Called automatically by Time.update.
    *
    * @method Phaser.Time#updateSetTimeout
    * @private
    * @param {number} time - The current relative timestamp; see {@link Phaser.Time#now now}.
    */
    updateSetTimeout: function (time) {

        //  Set to the old Date.now value
        var previousDateNow = this.time;

        //  With SetTimeout the time value is always the same as Date.now, so no need to get it again
        this.time = time;

        //  Adjust accordingly.
        this.elapsedMS = this.time - previousDateNow;

        // 'now' is currently still holding the time of the last call, move it into prevTime
        this.prevTime = this.now;

        // update 'now' to hold the current time
        this.now = time;

        // elapsed time between previous call and now
        this.elapsed = this.now - this.prevTime;

        // time to call this function again in ms in case we're using timers instead of RequestAnimationFrame to update the game
        this.timeToCall = Math.floor(Math.max(0, (1000.0 / this.desiredFps) - (this.timeCallExpected - time)));

        // time when the next call is expected if using timers
        this.timeCallExpected = time + this.timeToCall;

        //  Set the physics elapsed time... this will always be 1 / this.desiredFps because we're using fixed time steps in game.update now
        this.physicsElapsed = 1 / this.desiredFps;

        this.physicsElapsedMS = this.physicsElapsed * 1000;

    },

    /**
    * raf specific time update handler.
    * Called automatically by Time.update.
    *
    * @method Phaser.Time#updateRAF
    * @private
    * @param {number} time - The current relative timestamp; see {@link Phaser.Time#now now}.
    */
    updateRAF: function (time) {

        //  Set to the old Date.now value
        var previousDateNow = this.time;

        // this.time always holds Date.now, this.now may hold the RAF high resolution time value if RAF is available (otherwise it also holds Date.now)
        this.time = Date.now();

        //  Adjust accordingly.
        this.elapsedMS = this.time - previousDateNow;

        // 'now' is currently still holding the time of the last call, move it into prevTime
        this.prevTime = this.now;

        // update 'now' to hold the current time
        this.now = time;

        // elapsed time between previous call and now
        this.elapsed = this.now - this.prevTime;

        //  Set the physics elapsed time... this will always be 1 / this.desiredFps because we're using fixed time steps in game.update now
        this.physicsElapsed = 1 / this.desiredFps;

        this.physicsElapsedMS = this.physicsElapsed * 1000;

    },

    /**
    * Handles the updating of the Phaser.Timers (if any)
    * Called automatically by Time.update.
    *
    * @method Phaser.Time#updateTimers
    * @private
    */
    updateTimers: function () {

        //  Any game level timers
        var i = 0;
        var len = this._timers.length;

        while (i < len)
        {
            if (this._timers[i].update(this.time))
            {
                i++;
            }
            else
            {
                //  Timer requests to be removed
                this._timers.splice(i, 1);
                len--;
            }
        }

    },

    /**
    * Handles the updating of the advanced timing values (if enabled)
    * Called automatically by Time.update.
    *
    * @method Phaser.Time#updateAdvancedTiming
    * @private
    */
    updateAdvancedTiming: function () {

        // count the number of time.update calls
        this._frameCount++;
        this._elapsedAccumulator += this.elapsed;

        // occasionally recalculate the suggestedFps based on the accumulated elapsed time
        if (this._frameCount >= this.desiredFps * 2)
        {
            // this formula calculates suggestedFps in multiples of 5 fps
            this.suggestedFps = Math.floor(200 / (this._elapsedAccumulator / this._frameCount)) * 5;
            this._frameCount = 0;
            this._elapsedAccumulator = 0;
        }

        this.msMin = Math.min(this.msMin, this.elapsed);
        this.msMax = Math.max(this.msMax, this.elapsed);

        this.frames++;

        if (this.now > this._timeLastSecond + 1000)
        {
            this.fps = Math.round((this.frames * 1000) / (this.now - this._timeLastSecond));
            this.fpsMin = Math.min(this.fpsMin, this.fps);
            this.fpsMax = Math.max(this.fpsMax, this.fps);
            this._timeLastSecond = this.now;
            this.frames = 0;
        }

    },

    /**
    * Called when the game enters a paused state.
    *
    * @method Phaser.Time#gamePaused
    * @private
    */
    gamePaused: function () {

        this._pauseStarted = Date.now();

        this.events.pause();

        var i = this._timers.length;

        while (i--)
        {
            this._timers[i]._pause();
        }

    },

    /**
    * Called when the game resumes from a paused state.
    *
    * @method Phaser.Time#gameResumed
    * @private
    */
    gameResumed: function () {

        // Set the parameter which stores Date.now() to make sure it's correct on resume
        this.time = Date.now();

        this.pauseDuration = this.time - this._pauseStarted;

        this.events.resume();

        var i = this._timers.length;

        while (i--)
        {
            this._timers[i]._resume();
        }

    },

    /**
    * The number of seconds that have elapsed since the game was started.
    *
    * @method Phaser.Time#totalElapsedSeconds
    * @return {number} The number of seconds that have elapsed since the game was started.
    */
    totalElapsedSeconds: function() {
        return (this.time - this._started) * 0.001;
    },

    /**
    * How long has passed since the given time.
    *
    * @method Phaser.Time#elapsedSince
    * @param {number} since - The time you want to measure against.
    * @return {number} The difference between the given time and now.
    */
    elapsedSince: function (since) {
        return this.time - since;
    },

    /**
    * How long has passed since the given time (in seconds).
    *
    * @method Phaser.Time#elapsedSecondsSince
    * @param {number} since - The time you want to measure (in seconds).
    * @return {number} Duration between given time and now (in seconds).
    */
    elapsedSecondsSince: function (since) {
        return (this.time - since) * 0.001;
    },

    /**
    * Resets the private _started value to now and removes all currently running Timers.
    *
    * @method Phaser.Time#reset
    */
    reset: function () {

        this._started = this.time;
        this.removeAll();

    }

};

Phaser.Time.prototype.constructor = Phaser.Time;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Timer is a way to create small re-usable (or disposable) objects that wait for a specific moment in time,
* and then run the specified callbacks.
*
* You can add many events to a Timer, each with their own delays. A Timer uses milliseconds as its unit of time (there are 1000 ms in 1 second).
* So a delay to 250 would fire the event every quarter of a second.
*
* Timers are based on real-world (not physics) time, adjusted for game pause durations.
*
* @class Phaser.Timer
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {boolean} [autoDestroy=true] - If true, the timer will automatically destroy itself after all the events have been dispatched (assuming no looping events).
*/
Phaser.Timer = function (game, autoDestroy) {

    if (autoDestroy === undefined) { autoDestroy = true; }

    /**
    * @property {Phaser.Game} game - Local reference to game.
    * @protected
    */
    this.game = game;

    /**
    * True if the Timer is actively running.
    *
    * Do not modify this boolean - use {@link Phaser.Timer#pause pause} (and {@link Phaser.Timer#resume resume}) to pause the timer.
    * @property {boolean} running
    * @default
    * @readonly
    */
    this.running = false;

    /**
    * If true, the timer will automatically destroy itself after all the events have been dispatched (assuming no looping events).
    * @property {boolean} autoDestroy
    */
    this.autoDestroy = autoDestroy;

    /**
    * @property {boolean} expired - An expired Timer is one in which all of its events have been dispatched and none are pending.
    * @readonly
    * @default
    */
    this.expired = false;

    /**
    * @property {number} elapsed - Elapsed time since the last frame (in ms).
    * @protected
    */
    this.elapsed = 0;

    /**
    * @property {Phaser.TimerEvent[]} events - An array holding all of this timers Phaser.TimerEvent objects. Use the methods add, repeat and loop to populate it.
    */
    this.events = [];

    /**
    * This signal will be dispatched when this Timer has completed which means that there are no more events in the queue.
    *
    * The signal is supplied with one argument, `timer`, which is this Timer object.
    *
    * @property {Phaser.Signal} onComplete
    */
    this.onComplete = new Phaser.Signal();

    /**
    * @property {number} nextTick - The time the next tick will occur.
    * @readonly
    * @protected
    */
    this.nextTick = 0;

    /**
    * @property {number} timeCap - If the difference in time between two frame updates exceeds this value, the event times are reset to avoid catch-up situations.
    */
    this.timeCap = 1000;

    /**
    * @property {boolean} paused - The paused state of the Timer. You can pause the timer by calling Timer.pause() and Timer.resume() or by the game pausing.
    * @readonly
    * @default
    */
    this.paused = false;

    /**
    * @property {boolean} _codePaused - Was the Timer paused by code or by Game focus loss?
    * @private
    */
    this._codePaused = false;

    /**
    * @property {number} _started - The time at which this Timer instance started running.
    * @private
    * @default
    */
    this._started = 0;

    /**
    * @property {number} _pauseStarted - The time the game started being paused.
    * @private
    */
    this._pauseStarted = 0;

    /**
    * @property {number} _pauseTotal - Total paused time.
    * @private
    */
    this._pauseTotal = 0;

    /**
    * @property {number} _now - The current start-time adjusted time.
    * @private
    */
    this._now = Date.now();

    /**
    * @property {number} _len - Temp. array length variable.
    * @private
    */
    this._len = 0;

    /**
    * @property {number} _marked - Temp. counter variable.
    * @private
    */
    this._marked = 0;

    /**
    * @property {number} _i - Temp. array counter variable.
    * @private
    */
    this._i = 0;

    /**
    * @property {number} _diff - Internal cache var.
    * @private
    */
    this._diff = 0;

    /**
    * @property {number} _newTick - Internal cache var.
    * @private
    */
    this._newTick = 0;

};

/**
* Number of milliseconds in a minute.
* @constant
* @type {integer}
*/
Phaser.Timer.MINUTE = 60000;

/**
* Number of milliseconds in a second.
* @constant
* @type {integer}
*/
Phaser.Timer.SECOND = 1000;

/**
* Number of milliseconds in half a second.
* @constant
* @type {integer}
*/
Phaser.Timer.HALF = 500;

/**
* Number of milliseconds in a quarter of a second.
* @constant
* @type {integer}
*/
Phaser.Timer.QUARTER = 250;

Phaser.Timer.prototype = {

    /**
    * Creates a new TimerEvent on this Timer.
    *
    * Use {@link Phaser.Timer#add}, {@link Phaser.Timer#add}, or {@link Phaser.Timer#add} methods to create a new event.
    *
    * @method Phaser.Timer#create
    * @private
    * @param {number} delay - The number of milliseconds that should elapse before the Timer will call the given callback. This value should be an integer, not a float. Math.round() is applied to it by this method.
    * @param {boolean} loop - Should the event loop or not?
    * @param {number} repeatCount - The number of times the event will repeat.
    * @param {function} callback - The callback that will be called when the Timer event occurs.
    * @param {object} callbackContext - The context in which the callback will be called.
    * @param {any[]} arguments - The values to be sent to your callback function when it is called.
    * @return {Phaser.TimerEvent} The Phaser.TimerEvent object that was created.
    */
    create: function (delay, loop, repeatCount, callback, callbackContext, args) {

        delay = Math.round(delay);

        var tick = delay;

        if (this._now === 0)
        {
            tick += this.game.time.time;
        }
        else
        {
            tick += this._now;
        }

        var event = new Phaser.TimerEvent(this, delay, tick, repeatCount, loop, callback, callbackContext, args);

        this.events.push(event);

        this.order();

        this.expired = false;

        return event;

    },

    /**
    * Adds a new Event to this Timer.
    *
    * The event will fire after the given amount of `delay` in milliseconds has passed, once the Timer has started running.
    * The delay is in relation to when the Timer starts, not the time it was added. If the Timer is already running the delay will be calculated based on the timers current time.
    *
    * Make sure to call {@link Phaser.Timer#start start} after adding all of the Events you require for this Timer.
    *
    * @method Phaser.Timer#add
    * @param {number} delay - The number of milliseconds that should elapse before the callback is invoked.
    * @param {function} callback - The callback that will be called when the Timer event occurs.
    * @param {object} callbackContext - The context in which the callback will be called.
    * @param {...*} arguments - Additional arguments that will be supplied to the callback.
    * @return {Phaser.TimerEvent} The Phaser.TimerEvent object that was created.
    */
    add: function (delay, callback, callbackContext) {

        return this.create(delay, false, 0, callback, callbackContext, Array.prototype.splice.call(arguments, 3));

    },

    /**
    * Adds a new TimerEvent that will always play through once and then repeat for the given number of iterations.
    *
    * The event will fire after the given amount of `delay` in milliseconds has passed, once the Timer has started running.
    * The delay is in relation to when the Timer starts, not the time it was added. If the Timer is already running the delay will be calculated based on the timers current time.
    *
    * Make sure to call {@link Phaser.Timer#start start} after adding all of the Events you require for this Timer.
    *
    * @method Phaser.Timer#repeat
    * @param {number} delay - The number of milliseconds that should elapse before the Timer will call the given callback.
    * @param {number} repeatCount - The number of times the event will repeat once is has finished playback. A repeatCount of 1 means it will repeat itself once, playing the event twice in total.
    * @param {function} callback - The callback that will be called when the Timer event occurs.
    * @param {object} callbackContext - The context in which the callback will be called.
    * @param {...*} arguments - Additional arguments that will be supplied to the callback.
    * @return {Phaser.TimerEvent} The Phaser.TimerEvent object that was created.
    */
    repeat: function (delay, repeatCount, callback, callbackContext) {

        return this.create(delay, false, repeatCount, callback, callbackContext, Array.prototype.splice.call(arguments, 4));

    },

    /**
    * Adds a new looped Event to this Timer that will repeat forever or until the Timer is stopped.
    *
    * The event will fire after the given amount of `delay` in milliseconds has passed, once the Timer has started running.
    * The delay is in relation to when the Timer starts, not the time it was added. If the Timer is already running the delay will be calculated based on the timers current time.
    *
    * Make sure to call {@link Phaser.Timer#start start} after adding all of the Events you require for this Timer.
    *
    * @method Phaser.Timer#loop
    * @param {number} delay - The number of milliseconds that should elapse before the Timer will call the given callback.
    * @param {function} callback - The callback that will be called when the Timer event occurs.
    * @param {object} callbackContext - The context in which the callback will be called.
    * @param {...*} arguments - Additional arguments that will be supplied to the callback.
    * @return {Phaser.TimerEvent} The Phaser.TimerEvent object that was created.
    */
    loop: function (delay, callback, callbackContext) {

        return this.create(delay, true, 0, callback, callbackContext, Array.prototype.splice.call(arguments, 3));

    },

    /**
    * Starts this Timer running.
    * @method Phaser.Timer#start
    * @param {number} [delay=0] - The number of milliseconds that should elapse before the Timer will start.
    */
    start: function (delay) {

        if (this.running)
        {
            return;
        }

        this._started = this.game.time.time + (delay || 0);

        this.running = true;

        for (var i = 0; i < this.events.length; i++)
        {
            this.events[i].tick = this.events[i].delay + this._started;
        }

    },

    /**
    * Stops this Timer from running. Does not cause it to be destroyed if autoDestroy is set to true.
    * @method Phaser.Timer#stop
    * @param {boolean} [clearEvents=true] - If true all the events in Timer will be cleared, otherwise they will remain.
    */
    stop: function (clearEvents) {

        this.running = false;

        if (clearEvents === undefined) { clearEvents = true; }

        if (clearEvents)
        {
            this.events.length = 0;
        }

    },

    /**
    * Removes a pending TimerEvent from the queue.
    * @param {Phaser.TimerEvent} event - The event to remove from the queue.
    * @method Phaser.Timer#remove
    */
    remove: function (event) {

        for (var i = 0; i < this.events.length; i++)
        {
            if (this.events[i] === event)
            {
                this.events[i].pendingDelete = true;
                return true;
            }
        }

        return false;

    },

    /**
    * Orders the events on this Timer so they are in tick order.
    * This is called automatically when new events are created.
    * @method Phaser.Timer#order
    * @protected
    */
    order: function () {

        if (this.events.length > 0)
        {
            //  Sort the events so the one with the lowest tick is first
            this.events.sort(this.sortHandler);

            this.nextTick = this.events[0].tick;
        }

    },

    /**
    * Sort handler used by Phaser.Timer.order.
    * @method Phaser.Timer#sortHandler
    * @private
    */
    sortHandler: function (a, b) {

        if (a.tick < b.tick)
        {
            return -1;
        }
        else if (a.tick > b.tick)
        {
            return 1;
        }

        return 0;

    },

    /**
    * Clears any events from the Timer which have pendingDelete set to true and then resets the private _len and _i values.
    *
    * @method Phaser.Timer#clearPendingEvents
    * @protected
    */
    clearPendingEvents: function () {

        this._i = this.events.length;

        while (this._i--)
        {
            if (this.events[this._i].pendingDelete)
            {
                this.events.splice(this._i, 1);
            }
        }

        this._len = this.events.length;
        this._i = 0;

    },

    /**
    * The main Timer update event, called automatically by Phaser.Time.update.
    *
    * @method Phaser.Timer#update
    * @protected
    * @param {number} time - The time from the core game clock.
    * @return {boolean} True if there are still events waiting to be dispatched, otherwise false if this Timer can be destroyed.
    */
    update: function (time) {

        if (this.paused)
        {
            return true;
        }

        this.elapsed = time - this._now;
        this._now = time;

        //  spike-dislike
        if (this.elapsed > this.timeCap)
        {
            //  For some reason the time between now and the last time the game was updated was larger than our timeCap.
            //  This can happen if the Stage.disableVisibilityChange is true and you swap tabs, which makes the raf pause.
            //  In this case we need to adjust the TimerEvents and nextTick.
            this.adjustEvents(time - this.elapsed);
        }

        this._marked = 0;

        //  Clears events marked for deletion and resets _len and _i to 0.
        this.clearPendingEvents();

        if (this.running && this._now >= this.nextTick && this._len > 0)
        {
            while (this._i < this._len && this.running)
            {
                if (this._now >= this.events[this._i].tick && !this.events[this._i].pendingDelete)
                {
                    //  (now + delay) - (time difference from last tick to now)
                    this._newTick = (this._now + this.events[this._i].delay) - (this._now - this.events[this._i].tick);

                    if (this._newTick < 0)
                    {
                        this._newTick = this._now + this.events[this._i].delay;
                    }

                    if (this.events[this._i].loop === true)
                    {
                        this.events[this._i].tick = this._newTick;
                        this.events[this._i].callback.apply(this.events[this._i].callbackContext, this.events[this._i].args);
                    }
                    else if (this.events[this._i].repeatCount > 0)
                    {
                        this.events[this._i].repeatCount--;
                        this.events[this._i].tick = this._newTick;
                        this.events[this._i].callback.apply(this.events[this._i].callbackContext, this.events[this._i].args);
                    }
                    else
                    {
                        this._marked++;
                        this.events[this._i].pendingDelete = true;
                        this.events[this._i].callback.apply(this.events[this._i].callbackContext, this.events[this._i].args);
                    }

                    this._i++;
                }
                else
                {
                    break;
                }
            }

            //  Are there any events left?
            if (this.events.length > this._marked)
            {
                this.order();
            }
            else
            {
                this.expired = true;
                this.onComplete.dispatch(this);
            }
        }

        if (this.expired && this.autoDestroy)
        {
            return false;
        }
        else
        {
            return true;
        }

    },

    /**
    * Pauses the Timer and all events in the queue.
    * @method Phaser.Timer#pause
    */
    pause: function () {

        if (!this.running)
        {
            return;
        }

        this._codePaused = true;

        if (this.paused)
        {
            return;
        }

        this._pauseStarted = this.game.time.time;

        this.paused = true;

    },

    /**
    * Internal pause/resume control - user code should use Timer.pause instead.
    * @method Phaser.Timer#_pause
    * @private
    */
    _pause: function () {

        if (this.paused || !this.running)
        {
            return;
        }

        this._pauseStarted = this.game.time.time;

        this.paused = true;

    },

    /**
    * Adjusts the time of all pending events and the nextTick by the given baseTime.
    *
    * @method Phaser.Timer#adjustEvents
    * @protected
    */
    adjustEvents: function (baseTime) {

        for (var i = 0; i < this.events.length; i++)
        {
            if (!this.events[i].pendingDelete)
            {
                //  Work out how long there would have been from when the game paused until the events next tick
                var t = this.events[i].tick - baseTime;

                if (t < 0)
                {
                    t = 0;
                }

                //  Add the difference on to the time now
                this.events[i].tick = this._now + t;
            }
        }

        var d = this.nextTick - baseTime;

        if (d < 0)
        {
            this.nextTick = this._now;
        }
        else
        {
            this.nextTick = this._now + d;
        }

    },

    /**
    * Resumes the Timer and updates all pending events.
    *
    * @method Phaser.Timer#resume
    */
    resume: function () {

        if (!this.paused)
        {
            return;
        }

        var now = this.game.time.time;
        this._pauseTotal += now - this._now;
        this._now = now;

        this.adjustEvents(this._pauseStarted);

        this.paused = false;
        this._codePaused = false;

    },

    /**
    * Internal pause/resume control - user code should use Timer.resume instead.
    * @method Phaser.Timer#_resume
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
    * Removes all Events from this Timer and all callbacks linked to onComplete, but leaves the Timer running.    
    * The onComplete callbacks won't be called.
    *
    * @method Phaser.Timer#removeAll
    */
    removeAll: function () {

        this.onComplete.removeAll();
        this.events.length = 0;
        this._len = 0;
        this._i = 0;

    },

    /**
    * Destroys this Timer. Any pending Events are not dispatched.
    * The onComplete callbacks won't be called.
    *
    * @method Phaser.Timer#destroy
    */
    destroy: function () {

        this.onComplete.removeAll();
        this.running = false;
        this.events = [];
        this._len = 0;
        this._i = 0;

    }

};

/**
* @name Phaser.Timer#next
* @property {number} next - The time at which the next event will occur.
* @readonly
*/
Object.defineProperty(Phaser.Timer.prototype, "next", {

    get: function () {
        return this.nextTick;
    }

});

/**
* @name Phaser.Timer#duration
* @property {number} duration - The duration in ms remaining until the next event will occur.
* @readonly
*/
Object.defineProperty(Phaser.Timer.prototype, "duration", {

    get: function () {

        if (this.running && this.nextTick > this._now)
        {
            return this.nextTick - this._now;
        }
        else
        {
            return 0;
        }

    }

});

/**
* @name Phaser.Timer#length
* @property {number} length - The number of pending events in the queue.
* @readonly
*/
Object.defineProperty(Phaser.Timer.prototype, "length", {

    get: function () {
        return this.events.length;
    }

});

/**
* @name Phaser.Timer#ms
* @property {number} ms - The duration in milliseconds that this Timer has been running for.
* @readonly
*/
Object.defineProperty(Phaser.Timer.prototype, "ms", {

    get: function () {

        if (this.running)
        {
            return this._now - this._started - this._pauseTotal;
        }
        else
        {
            return 0;
        }

    }

});

/**
* @name Phaser.Timer#seconds
* @property {number} seconds - The duration in seconds that this Timer has been running for.
* @readonly
*/
Object.defineProperty(Phaser.Timer.prototype, "seconds", {

    get: function () {

        if (this.running)
        {
            return this.ms * 0.001;
        }
        else
        {
            return 0;
        }

    }

});

Phaser.Timer.prototype.constructor = Phaser.Timer;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A TimerEvent is a single event that is processed by a Phaser.Timer.
*
* It consists of a delay, which is a value in milliseconds after which the event will fire.
* When the event fires it calls a specific callback with the specified arguments.
*
* Use {@link Phaser.Timer#add}, {@link Phaser.Timer#add}, or {@link Phaser.Timer#add} methods to create a new event.
*
* @class Phaser.TimerEvent
* @constructor
* @param {Phaser.Timer} timer - The Timer object that this TimerEvent belongs to.
* @param {number} delay - The delay in ms at which this TimerEvent fires.
* @param {number} tick - The tick is the next game clock time that this event will fire at.
* @param {number} repeatCount - If this TimerEvent repeats it will do so this many times.
* @param {boolean} loop - True if this TimerEvent loops, otherwise false.
* @param {function} callback - The callback that will be called when the TimerEvent occurs.
* @param {object} callbackContext - The context in which the callback will be called.
* @param {any[]} arguments - Additional arguments to be passed to the callback.
*/
Phaser.TimerEvent = function (timer, delay, tick, repeatCount, loop, callback, callbackContext, args) {

    /**
    * @property {Phaser.Timer} timer - The Timer object that this TimerEvent belongs to.
    * @protected
    * @readonly
    */
    this.timer = timer;

    /**
    * @property {number} delay - The delay in ms at which this TimerEvent fires.
    */
    this.delay = delay;

    /**
    * @property {number} tick - The tick is the next game clock time that this event will fire at.
    */
    this.tick = tick;

    /**
    * @property {number} repeatCount - If this TimerEvent repeats it will do so this many times.
    */
    this.repeatCount = repeatCount - 1;

    /**
    * @property {boolean} loop - True if this TimerEvent loops, otherwise false.
    */
    this.loop = loop;

    /**
    * @property {function} callback - The callback that will be called when the TimerEvent occurs.
    */
    this.callback = callback;

    /**
    * @property {object} callbackContext - The context in which the callback will be called.
    */
    this.callbackContext = callbackContext;

    /**
    * @property {any[]} arguments - Additional arguments to be passed to the callback.
    */
    this.args = args;

    /**
    * @property {boolean} pendingDelete - A flag that controls if the TimerEvent is pending deletion.
    * @protected
    */
    this.pendingDelete = false;

};

Phaser.TimerEvent.prototype.constructor = Phaser.TimerEvent;
