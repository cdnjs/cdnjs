/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Phaser.Input is the Input Manager for all types of Input across Phaser, including mouse, keyboard, touch and MSPointer.
* The Input manager is updated automatically by the core game loop.
*
* @class Phaser.Input
* @constructor
* @param {Phaser.Game} game - Current game instance.
*/
Phaser.Input = function (game) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property {HTMLCanvasElement} hitCanvas - The canvas to which single pixels are drawn in order to perform pixel-perfect hit detection.
    * @default
    */
    this.hitCanvas = null;

    /**
    * @property {CanvasRenderingContext2D} hitContext - The context of the pixel perfect hit canvas.
    * @default
    */
    this.hitContext = null;

    /**
    * An array of callbacks that will be fired every time the activePointer receives a move event from the DOM.
    * To add a callback to this array please use `Input.addMoveCallback`.
    * @property {array} moveCallbacks
    * @protected
    */
    this.moveCallbacks = [];

    /**
    * @property {number} pollRate - How often should the input pointers be checked for updates? A value of 0 means every single frame (60fps); a value of 1 means every other frame (30fps) and so on.
    * @default
    */
    this.pollRate = 0;

    /**
    * When enabled, input (eg. Keyboard, Mouse, Touch) will be processed - as long as the individual sources are enabled themselves.
    *
    * When not enabled, _all_ input sources are ignored. To disable just one type of input; for example, the Mouse, use `input.mouse.enabled = false`.
    * @property {boolean} enabled
    * @default
    */
    this.enabled = true;

    /**
    * @property {number} multiInputOverride - Controls the expected behavior when using a mouse and touch together on a multi-input device.
    * @default
    */
    this.multiInputOverride = Phaser.Input.MOUSE_TOUCH_COMBINE;

    /**
    * @property {Phaser.Point} position - A point object representing the current position of the Pointer.
    * @default
    */
    this.position = null;

    /**
    * @property {Phaser.Point} speed - A point object representing the speed of the Pointer. Only really useful in single Pointer games; otherwise see the Pointer objects directly.
    */
    this.speed = null;

    /**
    * A Circle object centered on the x/y screen coordinates of the Input.
    * Default size of 44px (Apples recommended "finger tip" size) but can be changed to anything.
    * @property {Phaser.Circle} circle
    */
    this.circle = null;

    /**
    * @property {Phaser.Point} scale - The scale by which all input coordinates are multiplied; calculated by the ScaleManager. In an un-scaled game the values will be x = 1 and y = 1.
    */
    this.scale = null;

    /**
    * @property {integer} maxPointers - The maximum number of Pointers allowed to be active at any one time. A value of -1 is only limited by the total number of pointers. For lots of games it's useful to set this to 1.
    * @default -1 (Limited by total pointers.)
    */
    this.maxPointers = -1;

    /**
    * @property {number} tapRate - The number of milliseconds that the Pointer has to be pressed down and then released to be considered a tap or click.
    * @default
    */
    this.tapRate = 200;

    /**
    * @property {number} doubleTapRate - The number of milliseconds between taps of the same Pointer for it to be considered a double tap / click.
    * @default
    */
    this.doubleTapRate = 300;

    /**
    * @property {number} holdRate - The number of milliseconds that the Pointer has to be pressed down for it to fire a onHold event.
    * @default
    */
    this.holdRate = 2000;

    /**
    * @property {number} justPressedRate - The number of milliseconds below which the Pointer is considered justPressed.
    * @default
    */
    this.justPressedRate = 200;

    /**
    * @property {number} justReleasedRate - The number of milliseconds below which the Pointer is considered justReleased .
    * @default
    */
    this.justReleasedRate = 200;

    /**
    * Sets if the Pointer objects should record a history of x/y coordinates they have passed through.
    * The history is cleared each time the Pointer is pressed down.
    * The history is updated at the rate specified in Input.pollRate
    * @property {boolean} recordPointerHistory
    * @default
    */
    this.recordPointerHistory = false;

    /**
    * @property {number} recordRate - The rate in milliseconds at which the Pointer objects should update their tracking history.
    * @default
    */
    this.recordRate = 100;

    /**
    * The total number of entries that can be recorded into the Pointer objects tracking history.
    * If the Pointer is tracking one event every 100ms; then a trackLimit of 100 would store the last 10 seconds worth of history.
    * @property {number} recordLimit
    * @default
    */
    this.recordLimit = 100;

    /**
    * @property {Phaser.Pointer} pointer1 - A Pointer object.
    */
    this.pointer1 = null;

    /**
    * @property {Phaser.Pointer} pointer2 - A Pointer object.
    */
    this.pointer2 = null;

    /**
    * @property {Phaser.Pointer} pointer3 - A Pointer object.
    */
    this.pointer3 = null;

    /**
    * @property {Phaser.Pointer} pointer4 - A Pointer object.
    */
    this.pointer4 = null;

    /**
    * @property {Phaser.Pointer} pointer5 - A Pointer object.
    */
    this.pointer5 = null;

    /**
    * @property {Phaser.Pointer} pointer6 - A Pointer object.
    */
    this.pointer6 = null;

    /**
    * @property {Phaser.Pointer} pointer7 - A Pointer object.
    */
    this.pointer7 = null;

    /**
    * @property {Phaser.Pointer} pointer8 - A Pointer object.
    */
    this.pointer8 = null;

    /**
    * @property {Phaser.Pointer} pointer9 - A Pointer object.
    */
    this.pointer9 = null;

    /**
    * @property {Phaser.Pointer} pointer10 - A Pointer object.
    */
    this.pointer10 = null;

    /**
    * An array of non-mouse pointers that have been added to the game.
    * The properties `pointer1..N` are aliases for `pointers[0..N-1]`.
    * @property {Phaser.Pointer[]} pointers
    * @public
    * @readonly
    */
    this.pointers = [];

    /**
    * The most recently active Pointer object.
    * 
    * When you've limited max pointers to 1 this will accurately be either the first finger touched or mouse.
    * 
    * @property {Phaser.Pointer} activePointer
    */
    this.activePointer = null;

    /**
    * The mouse has its own unique Phaser.Pointer object which you can use if making a desktop specific game.
    * 
    * @property {Pointer} mousePointer
    */
    this.mousePointer = null;

    /**
    * The Mouse Input manager.
    * 
    * You should not usually access this manager directly, but instead use Input.mousePointer or Input.activePointer 
    * which normalizes all the input values for you, regardless of browser.
    * 
    * @property {Phaser.Mouse} mouse
    */
    this.mouse = null;

    /**
    * The Keyboard Input manager.
    * 
    * @property {Phaser.Keyboard} keyboard
    */
    this.keyboard = null;

    /**
    * The Touch Input manager.
    * 
    * You should not usually access this manager directly, but instead use Input.activePointer 
    * which normalizes all the input values for you, regardless of browser.
    * 
    * @property {Phaser.Touch} touch
    */
    this.touch = null;

    /**
    * The MSPointer Input manager.
    * 
    * You should not usually access this manager directly, but instead use Input.activePointer 
    * which normalizes all the input values for you, regardless of browser.
    * 
    * @property {Phaser.MSPointer} mspointer
    */
    this.mspointer = null;

    /**
    * The Gamepad Input manager.
    * 
    * @property {Phaser.Gamepad} gamepad
    */
    this.gamepad = null;

    /**
    * If the Input Manager has been reset locked then all calls made to InputManager.reset, 
    * such as from a State change, are ignored.
    * @property {boolean} resetLocked
    * @default
    */
    this.resetLocked = false;

    /**
    * A Signal that is dispatched each time a pointer is pressed down.
    * @property {Phaser.Signal} onDown
    */
    this.onDown = null;

    /**
    * A Signal that is dispatched each time a pointer is released.
    * @property {Phaser.Signal} onUp
    */
    this.onUp = null;

    /**
    * A Signal that is dispatched each time a pointer is tapped.
    * @property {Phaser.Signal} onTap
    */
    this.onTap = null;

    /**
    * A Signal that is dispatched each time a pointer is held down.
    * @property {Phaser.Signal} onHold
    */
    this.onHold = null;

    /**
    * You can tell all Pointers to ignore any Game Object with a `priorityID` lower than this value.
    * This is useful when stacking UI layers. Set to zero to disable.
    * @property {number} minPriorityID
    * @default
    */
    this.minPriorityID = 0;

    /**
    * A list of interactive objects. The InputHandler components add and remove themselves from this list.
    * @property {Phaser.ArraySet} interactiveItems
    */
    this.interactiveItems = new Phaser.ArraySet();

    /**
    * @property {Phaser.Point} _localPoint - Internal cache var.
    * @private
    */
    this._localPoint = new Phaser.Point();

    /**
    * @property {number} _pollCounter - Internal var holding the current poll counter.
    * @private
    */
    this._pollCounter = 0;

    /**
    * @property {Phaser.Point} _oldPosition - A point object representing the previous position of the Pointer.
    * @private
    */
    this._oldPosition = null;

    /**
    * @property {number} _x - x coordinate of the most recent Pointer event
    * @private
    */
    this._x = 0;

    /**
    * @property {number} _y - Y coordinate of the most recent Pointer event
    * @private
    */
    this._y = 0;

};

/**
* @constant
* @type {number}
*/
Phaser.Input.MOUSE_OVERRIDES_TOUCH = 0;

/**
* @constant
* @type {number}
*/
Phaser.Input.TOUCH_OVERRIDES_MOUSE = 1;

/**
* @constant
* @type {number}
*/
Phaser.Input.MOUSE_TOUCH_COMBINE = 2;

/**
* The maximum number of pointers that can be added. This excludes the mouse pointer.
* @constant
* @type {integer}
*/
Phaser.Input.MAX_POINTERS = 10;

Phaser.Input.prototype = {

    /**
    * Starts the Input Manager running.
    *
    * @method Phaser.Input#boot
    * @protected
    */
    boot: function () {

        this.mousePointer = new Phaser.Pointer(this.game, 0);
        this.addPointer();
        this.addPointer();

        this.mouse = new Phaser.Mouse(this.game);
        this.touch = new Phaser.Touch(this.game);
        this.mspointer = new Phaser.MSPointer(this.game);

        if (Phaser.Keyboard)
        {
            this.keyboard = new Phaser.Keyboard(this.game);
        }

        if (Phaser.Gamepad)
        {
            this.gamepad = new Phaser.Gamepad(this.game);
        }

        this.onDown = new Phaser.Signal();
        this.onUp = new Phaser.Signal();
        this.onTap = new Phaser.Signal();
        this.onHold = new Phaser.Signal();

        this.scale = new Phaser.Point(1, 1);
        this.speed = new Phaser.Point();
        this.position = new Phaser.Point();
        this._oldPosition = new Phaser.Point();

        this.circle = new Phaser.Circle(0, 0, 44);

        this.activePointer = this.mousePointer;

        this.hitCanvas = document.createElement('canvas');
        this.hitCanvas.width = 1;
        this.hitCanvas.height = 1;
        this.hitContext = this.hitCanvas.getContext('2d');

        this.mouse.start();
        this.touch.start();
        this.mspointer.start();
        this.mousePointer.active = true;

        if (this.keyboard)
        {
            this.keyboard.start();
        }

        var _this = this;

        this._onClickTrampoline = function (event) {
            _this.onClickTrampoline(event);
        };

        this.game.canvas.addEventListener('click', this._onClickTrampoline, false);

    },

    /**
    * Stops all of the Input Managers from running.
    *
    * @method Phaser.Input#destroy
    */
    destroy: function () {

        this.mouse.stop();
        this.touch.stop();
        this.mspointer.stop();

        if (this.keyboard)
        {
            this.keyboard.stop();
        }

        if (this.gamepad)
        {
            this.gamepad.stop();
        }

        this.moveCallbacks = [];

        this.game.canvas.removeEventListener('click', this._onClickTrampoline);

    },

    /**
    * Adds a callback that is fired every time the activePointer receives a DOM move event such as a mousemove or touchmove.
    *
    * The callback will be sent 4 parameters: The Pointer that moved, the x position of the pointer, the y position and the down state.
    * 
    * It will be called every time the activePointer moves, which in a multi-touch game can be a lot of times, so this is best
    * to only use if you've limited input to a single pointer (i.e. mouse or touch).
    * 
    * The callback is added to the Phaser.Input.moveCallbacks array and should be removed with Phaser.Input.deleteMoveCallback.
    * 
    * @method Phaser.Input#addMoveCallback
    * @param {function} callback - The callback that will be called each time the activePointer receives a DOM move event.
    * @param {object} context - The context in which the callback will be called.
    */
    addMoveCallback: function (callback, context) {

        this.moveCallbacks.push({ callback: callback, context: context });

    },

    /**
    * Removes the callback from the Phaser.Input.moveCallbacks array.
    * 
    * @method Phaser.Input#deleteMoveCallback
    * @param {function} callback - The callback to be removed.
    * @param {object} context - The context in which the callback exists.
    */
    deleteMoveCallback: function (callback, context) {

        var i = this.moveCallbacks.length;

        while (i--)
        {
            if (this.moveCallbacks[i].callback === callback && this.moveCallbacks[i].context === context)
            {
                this.moveCallbacks.splice(i, 1);
                return;
            }
        }

    },

    /**
    * Add a new Pointer object to the Input Manager.
    * By default Input creates 3 pointer objects: `mousePointer` (not include in part of general pointer pool), `pointer1` and `pointer2`.
    * This method adds an additional pointer, up to a maximum of Phaser.Input.MAX_POINTERS (default of 10).
    *
    * @method Phaser.Input#addPointer
    * @return {Phaser.Pointer|null} The new Pointer object that was created; null if a new pointer could not be added.
    */
    addPointer: function () {

        if (this.pointers.length >= Phaser.Input.MAX_POINTERS)
        {
            console.warn("Phaser.Input.addPointer: Maximum limit of " + Phaser.Input.MAX_POINTERS + " pointers reached.");
            return null;
        }

        var id = this.pointers.length + 1;
        var pointer = new Phaser.Pointer(this.game, id);

        this.pointers.push(pointer);
        this['pointer' + id] = pointer;

        return pointer;

    },

    /**
    * Updates the Input Manager. Called by the core Game loop.
    * 
    * @method Phaser.Input#update
    * @protected
    */
    update: function () {

        if (this.keyboard)
        {
            this.keyboard.update();
        }

        if (this.pollRate > 0 && this._pollCounter < this.pollRate)
        {
            this._pollCounter++;
            return;
        }

        this.speed.x = this.position.x - this._oldPosition.x;
        this.speed.y = this.position.y - this._oldPosition.y;

        this._oldPosition.copyFrom(this.position);
        this.mousePointer.update();

        if (this.gamepad && this.gamepad.active)
        {
            this.gamepad.update();
        }

        for (var i = 0; i < this.pointers.length; i++)
        {
            this.pointers[i].update();
        }

        this._pollCounter = 0;

    },

    /**
    * Reset all of the Pointers and Input states.
    *
    * The optional `hard` parameter will reset any events or callbacks that may be bound.
    * Input.reset is called automatically during a State change or if a game loses focus / visibility.
    * To control control the reset manually set {@link Phaser.InputManager.resetLocked} to `true`.
    *
    * @method Phaser.Input#reset
    * @public
    * @param {boolean} [hard=false] - A soft reset won't reset any events or callbacks that are bound. A hard reset will.
    */
    reset: function (hard) {

        if (!this.game.isBooted || this.resetLocked)
        {
            return;
        }

        if (hard === undefined) { hard = false; }

        this.mousePointer.reset();

        if (this.keyboard)
        {
            this.keyboard.reset(hard);
        }

        if (this.gamepad)
        {
            this.gamepad.reset();
        }

        for (var i = 0; i < this.pointers.length; i++)
        {
            this.pointers[i].reset();
        }

        if (this.game.canvas.style.cursor !== 'none')
        {
            this.game.canvas.style.cursor = 'inherit';
        }

        if (hard)
        {
            this.onDown.dispose();
            this.onUp.dispose();
            this.onTap.dispose();
            this.onHold.dispose();
            this.onDown = new Phaser.Signal();
            this.onUp = new Phaser.Signal();
            this.onTap = new Phaser.Signal();
            this.onHold = new Phaser.Signal();
            this.moveCallbacks = [];
        }

        this._pollCounter = 0;

    },

    /**
    * Resets the speed and old position properties.
    *
    * @method Phaser.Input#resetSpeed
    * @param {number} x - Sets the oldPosition.x value.
    * @param {number} y - Sets the oldPosition.y value.
    */
    resetSpeed: function (x, y) {

        this._oldPosition.setTo(x, y);
        this.speed.setTo(0, 0);

    },

    /**
    * Find the first free Pointer object and start it, passing in the event data.
    * This is called automatically by Phaser.Touch and Phaser.MSPointer.
    *
    * @method Phaser.Input#startPointer
    * @protected
    * @param {any} event - The event data from the Touch event.
    * @return {Phaser.Pointer} The Pointer object that was started or null if no Pointer object is available.
    */
    startPointer: function (event) {

        if (this.maxPointers >= 0 && this.countActivePointers(this.maxPointers) >= this.maxPointers)
        {
            return null;
        }

        if (!this.pointer1.active)
        {
            return this.pointer1.start(event);
        }

        if (!this.pointer2.active)
        {
            return this.pointer2.start(event);
        }

        for (var i = 2; i < this.pointers.length; i++)
        {
            var pointer = this.pointers[i];

            if (!pointer.active)
            {
                return pointer.start(event);
            }
        }

        return null;

    },

    /**
    * Updates the matching Pointer object, passing in the event data.
    * This is called automatically and should not normally need to be invoked.
    *
    * @method Phaser.Input#updatePointer
    * @protected
    * @param {any} event - The event data from the Touch event.
    * @return {Phaser.Pointer} The Pointer object that was updated; null if no pointer was updated.
    */
    updatePointer: function (event) {

        if (this.pointer1.active && this.pointer1.identifier === event.identifier)
        {
            return this.pointer1.move(event);
        }

        if (this.pointer2.active && this.pointer2.identifier === event.identifier)
        {
            return this.pointer2.move(event);
        }

        for (var i = 2; i < this.pointers.length; i++)
        {
            var pointer = this.pointers[i];

            if (pointer.active && pointer.identifier === event.identifier)
            {
                return pointer.move(event);
            }
        }

        return null;

    },

    /**
    * Stops the matching Pointer object, passing in the event data.
    *
    * @method Phaser.Input#stopPointer
    * @protected
    * @param {any} event - The event data from the Touch event.
    * @return {Phaser.Pointer} The Pointer object that was stopped or null if no Pointer object is available.
    */
    stopPointer: function (event) {

        if (this.pointer1.active && this.pointer1.identifier === event.identifier)
        {
            return this.pointer1.stop(event);
        }

        if (this.pointer2.active && this.pointer2.identifier === event.identifier)
        {
            return this.pointer2.stop(event);
        }

        for (var i = 2; i < this.pointers.length; i++)
        {
            var pointer = this.pointers[i];

            if (pointer.active && pointer.identifier === event.identifier)
            {
                return pointer.stop(event);
            }
        }

        return null;

    },

    /**
    * Returns the total number of active pointers, not exceeding the specified limit
    *
    * @name Phaser.Input#countActivePointers
    * @private
    * @property {integer} [limit=(max pointers)] - Stop counting after this.
    * @return {integer} The number of active pointers, or limit - whichever is less.
    */
    countActivePointers: function (limit) {

        if (limit === undefined) { limit = this.pointers.length; }

        var count = limit;

        for (var i = 0; i < this.pointers.length && count > 0; i++)
        {
            var pointer = this.pointers[i];

            if (pointer.active)
            {
                count--;
            }
        }

        return (limit - count);

    },

    /**
    * Get the first Pointer with the given active state.
    *
    * @method Phaser.Input#getPointer
    * @param {boolean} [isActive=false] - The state the Pointer should be in - active or inactive?
    * @return {Phaser.Pointer} A Pointer object or null if no Pointer object matches the requested state.
    */
    getPointer: function (isActive) {

        if (isActive === undefined) { isActive = false; }

        for (var i = 0; i < this.pointers.length; i++)
        {
            var pointer = this.pointers[i];

            if (pointer.active === isActive)
            {
                return pointer;
            }
        }

        return null;

    },

    /**
    * Get the Pointer object whos `identifier` property matches the given identifier value.
    *
    * The identifier property is not set until the Pointer has been used at least once, as its populated by the DOM event.
    * Also it can change every time you press the pointer down, and is not fixed once set.
    * Note: Not all browsers set the identifier property and it's not part of the W3C spec, so you may need getPointerFromId instead.
    *
    * @method Phaser.Input#getPointerFromIdentifier
    * @param {number} identifier - The Pointer.identifier value to search for.
    * @return {Phaser.Pointer} A Pointer object or null if no Pointer object matches the requested identifier.
    */
    getPointerFromIdentifier: function (identifier) {

        for (var i = 0; i < this.pointers.length; i++)
        {
            var pointer = this.pointers[i];

            if (pointer.identifier === identifier)
            {
                return pointer;
            }
        }

        return null;

    },

    /**
    * Get the Pointer object whos `pointerId` property matches the given value.
    *
    * The pointerId property is not set until the Pointer has been used at least once, as its populated by the DOM event.
    * Also it can change every time you press the pointer down if the browser recycles it.
    *
    * @method Phaser.Input#getPointerFromId
    * @param {number} pointerId - The `pointerId` (not 'id') value to search for.
    * @return {Phaser.Pointer} A Pointer object or null if no Pointer object matches the requested identifier.
    */
    getPointerFromId: function (pointerId) {

        for (var i = 0; i < this.pointers.length; i++)
        {
            var pointer = this.pointers[i];

            if (pointer.pointerId === pointerId)
            {
                return pointer;
            }
        }

        return null;

    },

    /**
    * This will return the local coordinates of the specified displayObject based on the given Pointer.
    *
    * @method Phaser.Input#getLocalPosition
    * @param {Phaser.Sprite|Phaser.Image} displayObject - The DisplayObject to get the local coordinates for.
    * @param {Phaser.Pointer} pointer - The Pointer to use in the check against the displayObject.
    * @return {Phaser.Point} A point containing the coordinates of the Pointer position relative to the DisplayObject.
    */
    getLocalPosition: function (displayObject, pointer, output) {

        if (output === undefined) { output = new Phaser.Point(); }

        var wt = displayObject.worldTransform;
        var id = 1 / (wt.a * wt.d + wt.c * -wt.b);

        return output.setTo(
            wt.d * id * pointer.x + -wt.c * id * pointer.y + (wt.ty * wt.c - wt.tx * wt.d) * id,
            wt.a * id * pointer.y + -wt.b * id * pointer.x + (-wt.ty * wt.a + wt.tx * wt.b) * id
        );

    },

    /**
    * Tests if the pointer hits the given object.
    *
    * @method Phaser.Input#hitTest
    * @param {DisplayObject} displayObject - The displayObject to test for a hit.
    * @param {Phaser.Pointer} pointer - The pointer to use for the test.
    * @param {Phaser.Point} localPoint - The local translated point.
    */
    hitTest: function (displayObject, pointer, localPoint) {

        if (!displayObject.worldVisible)
        {
            return false;
        }

        this.getLocalPosition(displayObject, pointer, this._localPoint);

        localPoint.copyFrom(this._localPoint);

        if (displayObject.hitArea && displayObject.hitArea.contains)
        {
            return (displayObject.hitArea.contains(this._localPoint.x, this._localPoint.y));
        }
        else if (displayObject instanceof Phaser.TileSprite)
        {
            var width = displayObject.width;
            var height = displayObject.height;
            var x1 = -width * displayObject.anchor.x;

            if (this._localPoint.x >= x1 && this._localPoint.x < x1 + width)
            {
                var y1 = -height * displayObject.anchor.y;

                if (this._localPoint.y >= y1 && this._localPoint.y < y1 + height)
                {
                    return true;
                }
            }
        }
        else if (displayObject instanceof PIXI.Sprite)
        {
            var width = displayObject.texture.frame.width;
            var height = displayObject.texture.frame.height;
            var x1 = -width * displayObject.anchor.x;

            if (this._localPoint.x >= x1 && this._localPoint.x < x1 + width)
            {
                var y1 = -height * displayObject.anchor.y;

                if (this._localPoint.y >= y1 && this._localPoint.y < y1 + height)
                {
                    return true;
                }
            }
        }
        else if (displayObject instanceof Phaser.Graphics)
        {
            for (var i = 0; i < displayObject.graphicsData.length; i++)
            {
                var data = displayObject.graphicsData[i];

                if (!data.fill)
                {
                    continue;
                }

                //  Only deal with fills..
                if (data.shape && data.shape.contains(this._localPoint.x, this._localPoint.y))
                {
                    return true;
                }
            }
        }

        //  Didn't hit the parent, does it have any children?

        for (var i = 0, len = displayObject.children.length; i < len; i++)
        {
            if (this.hitTest(displayObject.children[i], pointer, localPoint))
            {
                return true;
            }
        }

        return false;
    },

    /**
    * Used for click trampolines. See {@link Phaser.Pointer.addClickTrampoline}.
    *
    * @method Phaser.Input#onClickTrampoline
    * @private
    */
    onClickTrampoline: function () {

        // It might not always be the active pointer, but this does work on
        // Desktop browsers (read: IE) with Mouse or MSPointer input.
        this.activePointer.processClickTrampolines();

    }

};

Phaser.Input.prototype.constructor = Phaser.Input;

/**
* The X coordinate of the most recently active pointer.
* This value takes game scaling into account automatically. See Pointer.screenX/clientX for source values.
* @name Phaser.Input#x
* @property {number} x
*/
Object.defineProperty(Phaser.Input.prototype, "x", {

    get: function () {
        return this._x;
    },

    set: function (value) {
        this._x = Math.floor(value);
    }

});

/**
* The Y coordinate of the most recently active pointer.
* This value takes game scaling into account automatically. See Pointer.screenY/clientY for source values.
* @name Phaser.Input#y
* @property {number} y
*/
Object.defineProperty(Phaser.Input.prototype, "y", {

    get: function () {
        return this._y;
    },

    set: function (value) {
        this._y = Math.floor(value);
    }

});

/**
* True if the Input is currently poll rate locked.
* @name Phaser.Input#pollLocked
* @property {boolean} pollLocked
* @readonly
*/
Object.defineProperty(Phaser.Input.prototype, "pollLocked", {

    get: function () {
        return (this.pollRate > 0 && this._pollCounter < this.pollRate);
    }

});

/**
* The total number of inactive Pointers.
* @name Phaser.Input#totalInactivePointers
* @property {number} totalInactivePointers
* @readonly
*/
Object.defineProperty(Phaser.Input.prototype, "totalInactivePointers", {

    get: function () {
        return this.pointers.length - this.countActivePointers();
    }

});

/**
* The total number of active Pointers, not counting the mouse pointer.
* @name Phaser.Input#totalActivePointers
* @property {integers} totalActivePointers
* @readonly
*/
Object.defineProperty(Phaser.Input.prototype, "totalActivePointers", {

    get: function () {
        return this.countActivePointers();
    }

});

/**
* The world X coordinate of the most recently active pointer.
* @name Phaser.Input#worldX
* @property {number} worldX - The world X coordinate of the most recently active pointer.
* @readonly
*/
Object.defineProperty(Phaser.Input.prototype, "worldX", {

    get: function () {
        return this.game.camera.view.x + this.x;
    }

});

/**
* The world Y coordinate of the most recently active pointer.
* @name Phaser.Input#worldY
* @property {number} worldY - The world Y coordinate of the most recently active pointer.
* @readonly
*/
Object.defineProperty(Phaser.Input.prototype, "worldY", {

    get: function () {
        return this.game.camera.view.y + this.y;
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Mouse class is responsible for handling all aspects of mouse interaction with the browser.
*
* It captures and processes mouse events that happen on the game canvas object.
* It also adds a single `mouseup` listener to `window` which is used to capture the mouse being released 
* when not over the game.
*
* You should not normally access this class directly, but instead use a Phaser.Pointer object 
* which normalises all game input for you, including accurate button handling.
*
* @class Phaser.Mouse
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
*/
Phaser.Mouse = function (game) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property {Phaser.Input} input - A reference to the Phaser Input Manager.
    * @protected
    */
    this.input = game.input;

    /**
    * @property {object} callbackContext - The context under which callbacks are called.
    */
    this.callbackContext = this.game;

    /**
    * @property {function} mouseDownCallback - A callback that can be fired when the mouse is pressed down.
    */
    this.mouseDownCallback = null;

    /**
    * @property {function} mouseUpCallback - A callback that can be fired when the mouse is released from a pressed down state.
    */
    this.mouseUpCallback = null;

    /**
    * @property {function} mouseOutCallback - A callback that can be fired when the mouse is no longer over the game canvas.
    */
    this.mouseOutCallback = null;

    /**
    * @property {function} mouseOverCallback - A callback that can be fired when the mouse enters the game canvas (usually after a mouseout).
    */
    this.mouseOverCallback = null;

    /**
     * @property {function} mouseWheelCallback - A callback that can be fired when the mousewheel is used.
     */
    this.mouseWheelCallback = null;

    /**
    * @property {boolean} capture - If true the DOM mouse events will have event.preventDefault applied to them, if false they will propagate fully.
    */
    this.capture = false;

    /**
    * This property was removed in Phaser 2.4 and should no longer be used.
    * Instead please see the Pointer button properties such as `Pointer.leftButton`, `Pointer.rightButton` and so on.
    * Or Pointer.button holds the DOM event button value if you require that.
    * @property {number} button
    * @default
    */
    this.button = -1;

    /**
     * The direction of the _last_ mousewheel usage 1 for up -1 for down.
     * @property {number} wheelDelta
     */
    this.wheelDelta = 0;

    /**
    * Mouse input will only be processed if enabled.
    * @property {boolean} enabled
    * @default
    */
    this.enabled = true;

    /**
    * @property {boolean} locked - If the mouse has been Pointer Locked successfully this will be set to true.
    * @default
    */
    this.locked = false;

    /**
    * @property {boolean} stopOnGameOut - If true Pointer.stop will be called if the mouse leaves the game canvas.
    * @default
    */
    this.stopOnGameOut = false;

    /**
    * @property {Phaser.Signal} pointerLock - This event is dispatched when the browser enters or leaves pointer lock state.
    * @default
    */
    this.pointerLock = new Phaser.Signal();

    /**
    * The browser mouse DOM event. Will be null if no mouse event has ever been received.
    * Access this property only inside a Mouse event handler and do not keep references to it.
    * @property {MouseEvent|null} event
    * @default
    */
    this.event = null;

    /**
    * @property {function} _onMouseDown - Internal event handler reference.
    * @private
    */
    this._onMouseDown = null;

    /**
    * @property {function} _onMouseMove - Internal event handler reference.
    * @private
    */
    this._onMouseMove = null;

    /**
    * @property {function} _onMouseUp - Internal event handler reference.
    * @private
    */
    this._onMouseUp = null;

    /**
    * @property {function} _onMouseOut - Internal event handler reference.
    * @private
    */
    this._onMouseOut = null;

    /**
    * @property {function} _onMouseOver - Internal event handler reference.
    * @private
    */
    this._onMouseOver = null;

    /**
    * @property {function} _onMouseWheel - Internal event handler reference.
    * @private
    */
    this._onMouseWheel = null;

    /**
    * Wheel proxy event object, if required. Shared for all wheel events for this mouse.
    * @property {Phaser.Mouse~WheelEventProxy} _wheelEvent
    * @private
    */
    this._wheelEvent = null;

};

/**
* @constant
* @type {number}
*/
Phaser.Mouse.NO_BUTTON = -1;

/**
* @constant
* @type {number}
*/
Phaser.Mouse.LEFT_BUTTON = 0;

/**
* @constant
* @type {number}
*/
Phaser.Mouse.MIDDLE_BUTTON = 1;

/**
* @constant
* @type {number}
*/
Phaser.Mouse.RIGHT_BUTTON = 2;

/**
* @constant
* @type {number}
*/
Phaser.Mouse.BACK_BUTTON = 3;

/**
* @constant
* @type {number}
*/
Phaser.Mouse.FORWARD_BUTTON = 4;

/**
 * @constant
 * @type {number}
 */
Phaser.Mouse.WHEEL_UP = 1;

/**
 * @constant
 * @type {number}
 */
Phaser.Mouse.WHEEL_DOWN = -1;

Phaser.Mouse.prototype = {

    /**
    * Starts the event listeners running.
    * @method Phaser.Mouse#start
    */
    start: function () {

        if (this.game.device.android && this.game.device.chrome === false)
        {
            //  Android stock browser fires mouse events even if you preventDefault on the touchStart, so ...
            return;
        }

        if (this._onMouseDown !== null)
        {
            //  Avoid setting multiple listeners
            return;
        }

        var _this = this;

        this._onMouseDown = function (event) {
            return _this.onMouseDown(event);
        };

        this._onMouseMove = function (event) {
            return _this.onMouseMove(event);
        };

        this._onMouseUp = function (event) {
            return _this.onMouseUp(event);
        };

        this._onMouseUpGlobal = function (event) {
            return _this.onMouseUpGlobal(event);
        };

        this._onMouseOut = function (event) {
            return _this.onMouseOut(event);
        };

        this._onMouseOver = function (event) {
            return _this.onMouseOver(event);
        };

        this._onMouseWheel = function (event) {
            return _this.onMouseWheel(event);
        };

        var canvas = this.game.canvas;

        canvas.addEventListener('mousedown', this._onMouseDown, true);
        canvas.addEventListener('mousemove', this._onMouseMove, true);
        canvas.addEventListener('mouseup', this._onMouseUp, true);

        if (!this.game.device.cocoonJS)
        {
            window.addEventListener('mouseup', this._onMouseUpGlobal, true);
            canvas.addEventListener('mouseover', this._onMouseOver, true);
            canvas.addEventListener('mouseout', this._onMouseOut, true);
        }

        var wheelEvent = this.game.device.wheelEvent;

        if (wheelEvent)
        {
            canvas.addEventListener(wheelEvent, this._onMouseWheel, true);

            if (wheelEvent === 'mousewheel')
            {
                this._wheelEvent = new WheelEventProxy(-1/40, 1);
            }
            else if (wheelEvent === 'DOMMouseScroll')
            {
                this._wheelEvent = new WheelEventProxy(1, 1);
            }
        }

    },

    /**
    * The internal method that handles the mouse down event from the browser.
    * @method Phaser.Mouse#onMouseDown
    * @param {MouseEvent} event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseDown: function (event) {

        this.event = event;

        if (this.capture)
        {
            event.preventDefault();
        }

        if (this.mouseDownCallback)
        {
            this.mouseDownCallback.call(this.callbackContext, event);
        }

        if (!this.input.enabled || !this.enabled)
        {
            return;
        }

        event['identifier'] = 0;

        this.input.mousePointer.start(event);

    },

    /**
    * The internal method that handles the mouse move event from the browser.
    * @method Phaser.Mouse#onMouseMove
    * @param {MouseEvent} event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseMove: function (event) {

        this.event = event;

        if (this.capture)
        {
            event.preventDefault();
        }

        if (this.mouseMoveCallback)
        {
            this.mouseMoveCallback.call(this.callbackContext, event);
        }

        if (!this.input.enabled || !this.enabled)
        {
            return;
        }

        event['identifier'] = 0;

        this.input.mousePointer.move(event);

    },

    /**
    * The internal method that handles the mouse up event from the browser.
    * @method Phaser.Mouse#onMouseUp
    * @param {MouseEvent} event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseUp: function (event) {

        this.event = event;

        if (this.capture)
        {
            event.preventDefault();
        }

        if (this.mouseUpCallback)
        {
            this.mouseUpCallback.call(this.callbackContext, event);
        }

        if (!this.input.enabled || !this.enabled)
        {
            return;
        }

        event['identifier'] = 0;

        this.input.mousePointer.stop(event);

    },

    /**
    * The internal method that handles the mouse up event from the window.
    * 
    * @method Phaser.Mouse#onMouseUpGlobal
    * @param {MouseEvent} event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseUpGlobal: function (event) {

        if (!this.input.mousePointer.withinGame)
        {
            if (this.mouseUpCallback)
            {
                this.mouseUpCallback.call(this.callbackContext, event);
            }

            event['identifier'] = 0;

            this.input.mousePointer.stop(event);
        }

    },

    /**
    * The internal method that handles the mouse out event from the browser.
    *
    * @method Phaser.Mouse#onMouseOut
    * @param {MouseEvent} event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseOut: function (event) {

        this.event = event;

        if (this.capture)
        {
            event.preventDefault();
        }

        this.input.mousePointer.withinGame = false;

        if (this.mouseOutCallback)
        {
            this.mouseOutCallback.call(this.callbackContext, event);
        }

        if (!this.input.enabled || !this.enabled)
        {
            return;
        }

        if (this.stopOnGameOut)
        {
            event['identifier'] = 0;

            this.input.mousePointer.stop(event);
        }

    },

    /**
     * The internal method that handles the mouse wheel event from the browser.
     *
     * @method Phaser.Mouse#onMouseWheel
     * @param {MouseEvent} event - The native event from the browser.
     */
    onMouseWheel: function (event) {

        if (this._wheelEvent) {
            event = this._wheelEvent.bindEvent(event);
        }

        this.event = event;

        if (this.capture)
        {
            event.preventDefault();
        }

        // reverse detail for firefox
        this.wheelDelta = Phaser.Math.clamp(-event.deltaY, -1, 1);

        if (this.mouseWheelCallback)
        {
            this.mouseWheelCallback.call(this.callbackContext, event);
        }

    },

    /**
    * The internal method that handles the mouse over event from the browser.
    *
    * @method Phaser.Mouse#onMouseOver
    * @param {MouseEvent} event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseOver: function (event) {

        this.event = event;

        if (this.capture)
        {
            event.preventDefault();
        }

        this.input.mousePointer.withinGame = true;

        if (this.mouseOverCallback)
        {
            this.mouseOverCallback.call(this.callbackContext, event);
        }

        if (!this.input.enabled || !this.enabled)
        {
            return;
        }

    },

    /**
    * If the browser supports it you can request that the pointer be locked to the browser window.
    * This is classically known as 'FPS controls', where the pointer can't leave the browser until the user presses an exit key.
    * If the browser successfully enters a locked state the event Phaser.Mouse.pointerLock will be dispatched and the first parameter will be 'true'.
    * @method Phaser.Mouse#requestPointerLock
    */
    requestPointerLock: function () {

        if (this.game.device.pointerLock)
        {
            var element = this.game.canvas;

            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

            element.requestPointerLock();

            var _this = this;

            this._pointerLockChange = function (event) {
                return _this.pointerLockChange(event);
            };

            document.addEventListener('pointerlockchange', this._pointerLockChange, true);
            document.addEventListener('mozpointerlockchange', this._pointerLockChange, true);
            document.addEventListener('webkitpointerlockchange', this._pointerLockChange, true);
        }

    },

    /**
    * Internal pointerLockChange handler.
    * 
    * @method Phaser.Mouse#pointerLockChange
    * @param {Event} event - The native event from the browser. This gets stored in Mouse.event.
    */
    pointerLockChange: function (event) {

        var element = this.game.canvas;

        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element)
        {
            //  Pointer was successfully locked
            this.locked = true;
            this.pointerLock.dispatch(true, event);
        }
        else
        {
            //  Pointer was unlocked
            this.locked = false;
            this.pointerLock.dispatch(false, event);
        }

    },

    /**
    * Internal release pointer lock handler.
    * @method Phaser.Mouse#releasePointerLock
    */
    releasePointerLock: function () {

        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

        document.exitPointerLock();

        document.removeEventListener('pointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('mozpointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('webkitpointerlockchange', this._pointerLockChange, true);

    },

    /**
    * Stop the event listeners.
    * @method Phaser.Mouse#stop
    */
    stop: function () {

        var canvas = this.game.canvas;

        canvas.removeEventListener('mousedown', this._onMouseDown, true);
        canvas.removeEventListener('mousemove', this._onMouseMove, true);
        canvas.removeEventListener('mouseup', this._onMouseUp, true);
        canvas.removeEventListener('mouseover', this._onMouseOver, true);
        canvas.removeEventListener('mouseout', this._onMouseOut, true);

        var wheelEvent = this.game.device.wheelEvent;

        if (wheelEvent)
        {
            canvas.removeEventListener(wheelEvent, this._onMouseWheel, true);
        }

        window.removeEventListener('mouseup', this._onMouseUpGlobal, true);

        document.removeEventListener('pointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('mozpointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('webkitpointerlockchange', this._pointerLockChange, true);

    }

};

Phaser.Mouse.prototype.constructor = Phaser.Mouse;

/* jshint latedef:nofunc */
/**
* A purely internal event support class to proxy 'wheelscroll' and 'DOMMouseWheel'
* events to 'wheel'-like events.
*
* See https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel for choosing a scale and delta mode.
*
* @method Phaser.Mouse#WheelEventProxy
* @private
* @param {number} scaleFactor - Scale factor as applied to wheelDelta/wheelDeltaX or details.
* @param {integer} deltaMode - The reported delta mode.
*/
function WheelEventProxy (scaleFactor, deltaMode) {

    /**
    * @property {number} _scaleFactor - Scale factor as applied to wheelDelta/wheelDeltaX or details.
    * @private
    */
    this._scaleFactor = scaleFactor;

    /**
    * @property {number} _deltaMode - The reported delta mode.
    * @private
    */
    this._deltaMode = deltaMode;

    /**
    * @property {any} originalEvent - The original event _currently_ being proxied; the getters will follow suit.
    * @private
    */
    this.originalEvent = null;

}

WheelEventProxy.prototype = {};
WheelEventProxy.prototype.constructor = WheelEventProxy;

WheelEventProxy.prototype.bindEvent = function (event) {

    // Generate stubs automatically
    if (!WheelEventProxy._stubsGenerated && event)
    {
        var makeBinder = function (name) {

            return function () {
                var v = this.originalEvent[name];
                return typeof v !== 'function' ? v : v.bind(this.originalEvent);
            };

        };

        for (var prop in event)
        {
            if (!(prop in WheelEventProxy.prototype))
            {
                Object.defineProperty(WheelEventProxy.prototype, prop, {
                    get: makeBinder(prop)
                });
            }
        }
        WheelEventProxy._stubsGenerated = true;
    }

    this.originalEvent = event;
    return this;

};

Object.defineProperties(WheelEventProxy.prototype, {
    "type": { value: "wheel" },
    "deltaMode": { get: function () { return this._deltaMode; } },
    "deltaY": {
        get: function () {
            return (this._scaleFactor * (this.originalEvent.wheelDelta || this.originalEvent.detail)) || 0;
        }
    },
    "deltaX": {
        get: function () {
            return (this._scaleFactor * this.originalEvent.wheelDeltaX) || 0;
        }
    },
    "deltaZ": { value: 0 }
});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The MSPointer class handles Microsoft touch interactions with the game and the resulting Pointer objects.
*
* It will work only in Internet Explorer 10+ and Windows Store or Windows Phone 8 apps using JavaScript.
* http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx
*
* You should not normally access this class directly, but instead use a Phaser.Pointer object which 
* normalises all game input for you including accurate button handling.
*
* Please note that at the current time of writing Phaser does not yet support chorded button interactions:
* http://www.w3.org/TR/pointerevents/#chorded-button-interactions
*
* @class Phaser.MSPointer
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
*/
Phaser.MSPointer = function (game) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property {Phaser.Input} input - A reference to the Phaser Input Manager.
    * @protected
    */
    this.input = game.input;

    /**
    * @property {object} callbackContext - The context under which callbacks are called (defaults to game).
    */
    this.callbackContext = this.game;

    /**
    * @property {function} pointerDownCallback - A callback that can be fired on a MSPointerDown event.
    */
    this.pointerDownCallback = null;

    /**
    * @property {function} pointerMoveCallback - A callback that can be fired on a MSPointerMove event.
    */
    this.pointerMoveCallback = null;

    /**
    * @property {function} pointerUpCallback - A callback that can be fired on a MSPointerUp event.
    */
    this.pointerUpCallback = null;

    /**
    * @property {boolean} capture - If true the Pointer events will have event.preventDefault applied to them, if false they will propagate fully.
    */
    this.capture = true;

    /**
    * This property was removed in Phaser 2.4 and should no longer be used.
    * Instead please see the Pointer button properties such as `Pointer.leftButton`, `Pointer.rightButton` and so on.
    * Or Pointer.button holds the DOM event button value if you require that.
    * @property {number} button
    */
    this.button = -1;

    /**
    * The browser MSPointer DOM event. Will be null if no event has ever been received.
    * Access this property only inside a Pointer event handler and do not keep references to it.
    * @property {MSPointerEvent|null} event
    * @default
    */
    this.event = null;

    /**
    * MSPointer input will only be processed if enabled.
    * @property {boolean} enabled
    * @default
    */
    this.enabled = true;

    /**
    * @property {function} _onMSPointerDown - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerDown = null;

    /**
    * @property {function} _onMSPointerMove - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerMove = null;

    /**
    * @property {function} _onMSPointerUp - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerUp = null;

};

Phaser.MSPointer.prototype = {

    /**
    * Starts the event listeners running.
    * @method Phaser.MSPointer#start
    */
    start: function () {

        if (this._onMSPointerDown !== null)
        {
            //  Avoid setting multiple listeners
            return;
        }

        var _this = this;

        if (this.game.device.mspointer)
        {
            this._onMSPointerDown = function (event) {
                return _this.onPointerDown(event);
            };

            this._onMSPointerMove = function (event) {
                return _this.onPointerMove(event);
            };

            this._onMSPointerUp = function (event) {
                return _this.onPointerUp(event);
            };

            var canvas = this.game.canvas;

            canvas.addEventListener('MSPointerDown', this._onMSPointerDown, false);
            canvas.addEventListener('MSPointerMove', this._onMSPointerMove, false);
            canvas.addEventListener('MSPointerUp', this._onMSPointerUp, false);

            //  IE11+ uses non-prefix events
            canvas.addEventListener('pointerDown', this._onMSPointerDown, false);
            canvas.addEventListener('pointerMove', this._onMSPointerMove, false);
            canvas.addEventListener('pointerUp', this._onMSPointerUp, false);

            canvas.style['-ms-content-zooming'] = 'none';
            canvas.style['-ms-touch-action'] = 'none';
        }

    },

    /**
    * The function that handles the PointerDown event.
    * 
    * @method Phaser.MSPointer#onPointerDown
    * @param {PointerEvent} event - The native DOM event.
    */
    onPointerDown: function (event) {

        this.event = event;

        if (this.capture)
        {
            event.preventDefault();
        }

        if (this.pointerDownCallback)
        {
            this.pointerDownCallback.call(this.callbackContext, event);
        }

        if (!this.input.enabled || !this.enabled)
        {
            return;
        }

        event.identifier = event.pointerId;

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        {
            this.input.mousePointer.start(event);
        }
        else
        {
            this.input.startPointer(event);
        }

    },

    /**
    * The function that handles the PointerMove event.
    * @method Phaser.MSPointer#onPointerMove
    * @param {PointerEvent} event - The native DOM event.
    */
    onPointerMove: function (event) {

        this.event = event;

        if (this.capture)
        {
            event.preventDefault();
        }

        if (this.pointerMoveCallback)
        {
            this.pointerMoveCallback.call(this.callbackContext, event);
        }

        if (!this.input.enabled || !this.enabled)
        {
            return;
        }

        event.identifier = event.pointerId;

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        {
            this.input.mousePointer.move(event);
        }
        else
        {
            this.input.updatePointer(event);
        }

    },

    /**
    * The function that handles the PointerUp event.
    * @method Phaser.MSPointer#onPointerUp
    * @param {PointerEvent} event - The native DOM event.
    */
    onPointerUp: function (event) {

        this.event = event;

        if (this.capture)
        {
            event.preventDefault();
        }

        if (this.pointerUpCallback)
        {
            this.pointerUpCallback.call(this.callbackContext, event);
        }

        if (!this.input.enabled || !this.enabled)
        {
            return;
        }

        event.identifier = event.pointerId;

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        {
            this.input.mousePointer.stop(event);
        }
        else
        {
            this.input.stopPointer(event);
        }

    },

    /**
    * Stop the event listeners.
    * @method Phaser.MSPointer#stop
    */
    stop: function () {

        var canvas = this.game.canvas;

        canvas.removeEventListener('MSPointerDown', this._onMSPointerDown);
        canvas.removeEventListener('MSPointerMove', this._onMSPointerMove);
        canvas.removeEventListener('MSPointerUp', this._onMSPointerUp);

        canvas.removeEventListener('pointerDown', this._onMSPointerDown);
        canvas.removeEventListener('pointerMove', this._onMSPointerMove);
        canvas.removeEventListener('pointerUp', this._onMSPointerUp);

    }

};

Phaser.MSPointer.prototype.constructor = Phaser.MSPointer;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       @karlmacklin <tacklemcclean@gmail.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* DeviceButtons belong to both `Phaser.Pointer` and `Phaser.SinglePad` (Gamepad) instances.
*
* For Pointers they represent the various buttons that can exist on mice and pens, such as the left button, right button,
* middle button and advanced buttons like back and forward.
*
* Access them via `Pointer.leftbutton`, `Pointer.rightButton` and so on.
*
* On Gamepads they represent all buttons on the pad: from shoulder buttons to action buttons.
*
* At the time of writing this there are device limitations you should be aware of:
*
* - On Windows, if you install a mouse driver, and its utility software allows you to customize button actions 
*   (e.g., IntelliPoint and SetPoint), the middle (wheel) button, the 4th button, and the 5th button might not be set, 
*   even when they are pressed.
* - On Linux (GTK), the 4th button and the 5th button are not supported.
* - On Mac OS X 10.5 there is no platform API for implementing any advanced buttons.
* 
* @class Phaser.DeviceButton
* @constructor
* @param {Phaser.Pointer|Phaser.SinglePad} parent - A reference to the parent of this button. Either a Pointer or a Gamepad.
* @param {number} buttonCode - The button code this DeviceButton is responsible for.
*/
Phaser.DeviceButton = function (parent, buttonCode) {

    /**
    * @property {Phaser.Pointer|Phaser.SinglePad} parent - A reference to the Pointer or Gamepad that owns this button.
    */
    this.parent = parent;

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = parent.game;

    /**
    * @property {object} event - The DOM event that caused the change in button state.
    * @default
    */
    this.event = null;

    /**
    * @property {boolean} isDown - The "down" state of the button.
    * @default
    */
    this.isDown = false;

    /**
    * @property {boolean} isUp - The "up" state of the button.
    * @default
    */
    this.isUp = true;

    /**
    * @property {number} timeDown - The timestamp when the button was last pressed down.
    * @default
    */
    this.timeDown = 0;

    /**
    * If the button is down this value holds the duration of that button press and is constantly updated.
    * If the button is up it holds the duration of the previous down session.
    * The value is stored in milliseconds.
    * @property {number} duration
    * @default
    */
    this.duration = 0;

    /**
    * @property {number} timeUp - The timestamp when the button was last released.
    * @default
    */
    this.timeUp = 0;

    /**
    * Gamepad only.
    * If a button is held down this holds down the number of times the button has 'repeated'.
    * @property {number} repeats
    * @default
    */
    this.repeats = 0;

    /**
    * True if the alt key was held down when this button was last pressed or released.
    * Not supported on Gamepads.
    * @property {boolean} altKey
    * @default
    */
    this.altKey = false;

    /**
    * True if the shift key was held down when this button was last pressed or released.
    * Not supported on Gamepads.
    * @property {boolean} shiftKey
    * @default
    */
    this.shiftKey = false;

    /**
    * True if the control key was held down when this button was last pressed or released.
    * Not supported on Gamepads.
    * @property {boolean} ctrlKey
    * @default
    */
    this.ctrlKey = false;

    /**
    * @property {number} value - Button value. Mainly useful for checking analog buttons (like shoulder triggers) on Gamepads.
    * @default
    */
    this.value = 0;

    /**
    * @property {number} buttonCode - The buttoncode of this button if a Gamepad, or the DOM button event value if a Pointer.
    */
    this.buttonCode = buttonCode;

    /**
    * This Signal is dispatched every time this DeviceButton is pressed down.
    * It is only dispatched once (until the button is released again).
    * When dispatched it sends 2 arguments: A reference to this DeviceButton and the value of the button.
    * @property {Phaser.Signal} onDown
    */
    this.onDown = new Phaser.Signal();

    /**
    * This Signal is dispatched every time this DeviceButton is released from a down state.
    * It is only dispatched once (until the button is pressed again).
    * When dispatched it sends 2 arguments: A reference to this DeviceButton and the value of the button.
    * @property {Phaser.Signal} onUp
    */
    this.onUp = new Phaser.Signal();

    /**
    * Gamepad only.
    * This Signal is dispatched every time this DeviceButton changes floating value (between, but not exactly, 0 and 1).
    * When dispatched it sends 2 arguments: A reference to this DeviceButton and the value of the button.
    * @property {Phaser.Signal} onFloat
    */
    this.onFloat = new Phaser.Signal();

};

Phaser.DeviceButton.prototype = {

    /**
    * Called automatically by Phaser.Pointer and Phaser.SinglePad.
    * Handles the button down state.
    * 
    * @method Phaser.DeviceButton#start
    * @protected
    * @param {object} [event] - The DOM event that triggered the button change.
    * @param {number} [value] - The button value. Only get for Gamepads.
    */
    start: function (event, value) {

        if (this.isDown)
        {
            return;
        }

        this.isDown = true;
        this.isUp = false;
        this.timeDown = this.game.time.time;
        this.duration = 0;
        this.repeats = 0;

        this.event = event;
        this.value = value;

        this.altKey = event.altKey;
        this.shiftKey = event.shiftKey;
        this.ctrlKey = event.ctrlKey;

        this.onDown.dispatch(this, value);

    },

    /**
    * Called automatically by Phaser.Pointer and Phaser.SinglePad.
    * Handles the button up state.
    * 
    * @method Phaser.DeviceButton#stop
    * @protected
    * @param {object} [event] - The DOM event that triggered the button change.
    * @param {number} [value] - The button value. Only get for Gamepads.
    */
    stop: function (event, value) {

        if (this.isUp)
        {
            return;
        }

        this.isDown = false;
        this.isUp = true;
        this.timeUp = this.game.time.time;

        this.event = event;
        this.value = value;

        this.altKey = event.altKey;
        this.shiftKey = event.shiftKey;
        this.ctrlKey = event.ctrlKey;

        this.onUp.dispatch(this, value);

    },

    /**
    * Called automatically by Phaser.SinglePad.
    * 
    * @method Phaser.DeviceButton#padFloat
    * @protected
    * @param {number} value - Button value
    */
    padFloat: function (value) {

        this.value = value;

        this.onFloat.dispatch(this, value);

    },

    /**
    * Returns the "just pressed" state of this button.
    * Just pressed is considered true if the button was pressed down within the duration given (default 250ms).
    * 
    * @method Phaser.DeviceButton#justPressed
    * @param {number} [duration=250] - The duration in ms below which the button is considered as being just pressed.
    * @return {boolean} True if the button is just pressed otherwise false.
    */
    justPressed: function (duration) {

        duration = duration || 250;

        return (this.isDown && (this.timeDown + duration) > this.game.time.time);

    },

    /**
    * Returns the "just released" state of this button.
    * Just released is considered as being true if the button was released within the duration given (default 250ms).
    * 
    * @method Phaser.DeviceButton#justReleased
    * @param {number} [duration=250] - The duration in ms below which the button is considered as being just released.
    * @return {boolean} True if the button is just released otherwise false.
    */
    justReleased: function (duration) {

        duration = duration || 250;

        return (this.isUp && (this.timeUp + duration) > this.game.time.time);

    },

    /**
    * Resets this DeviceButton, changing it to an isUp state and resetting the duration and repeats counters.
    * 
    * @method Phaser.DeviceButton#reset
    */
    reset: function () {

        this.isDown = false;
        this.isUp = true;

        this.timeDown = this.game.time.time;
        this.duration = 0;
        this.repeats = 0;

        this.altKey = false;
        this.shiftKey = false;
        this.ctrlKey = false;

    },

    /**
    * Destroys this DeviceButton, this disposes of the onDown, onUp and onFloat signals 
    * and clears the parent and game references.
    * 
    * @method Phaser.DeviceButton#destroy
    */
    destroy: function () {

        this.onDown.dispose();
        this.onUp.dispose();
        this.onFloat.dispose();

        this.parent = null;
        this.game = null;

    }

};

Phaser.DeviceButton.prototype.constructor = Phaser.DeviceButton;

/**
* How long the button has been held down.
* If not currently down it returns -1.
* 
* @name Phaser.DeviceButton#duration
* @property {number} duration
* @readonly
*/
Object.defineProperty(Phaser.DeviceButton.prototype, "duration", {

    get: function () {

        if (this.isUp)
        {
            return -1;
        }

        return this.game.time.time - this.timeDown;

    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Pointer object is used by the Mouse, Touch and MSPoint managers and represents a single finger on the touch screen.
*
* @class Phaser.Pointer
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} id - The ID of the Pointer object within the game. Each game can have up to 10 active pointers.
*/
Phaser.Pointer = function (game, id) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property {number} id - The ID of the Pointer object within the game. Each game can have up to 10 active pointers.
    */
    this.id = id;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.POINTER;

    /**
    * @property {boolean} exists - A Pointer object that exists is allowed to be checked for physics collisions and overlaps.
    * @default
    */
    this.exists = true;

    /**
    * @property {number} identifier - The identifier property of the Pointer as set by the DOM event when this Pointer is started.
    * @default
    */
    this.identifier = 0;

    /**
    * @property {number} pointerId - The pointerId property of the Pointer as set by the DOM event when this Pointer is started. The browser can and will recycle this value.
    * @default
    */
    this.pointerId = null;

    /**
    * @property {any} target - The target property of the Pointer as set by the DOM event when this Pointer is started.
    * @default
    */
    this.target = null;

    /**
    * The button property of the most recent DOM event when this Pointer is started.
    * You should not rely on this value for accurate button detection, instead use the Pointer properties
    * `leftButton`, `rightButton`, `middleButton` and so on.
    * @property {any} button
    * @default
    */
    this.button = null;

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its left button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    * 
    * @property {Phaser.DeviceButton} leftButton
    * @default
    */
    this.leftButton = new Phaser.DeviceButton(this, Phaser.Pointer.LEFT_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its middle button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property {Phaser.DeviceButton} middleButton
    * @default
    */
    this.middleButton = new Phaser.DeviceButton(this, Phaser.Pointer.MIDDLE_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its right button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property {Phaser.DeviceButton} rightButton
    * @default
    */
    this.rightButton = new Phaser.DeviceButton(this, Phaser.Pointer.RIGHT_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its X1 (back) button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property {Phaser.DeviceButton} backButton
    * @default
    */
    this.backButton = new Phaser.DeviceButton(this, Phaser.Pointer.BACK_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its X2 (forward) button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property {Phaser.DeviceButton} forwardButton
    * @default
    */
    this.forwardButton = new Phaser.DeviceButton(this, Phaser.Pointer.FORWARD_BUTTON);

    /**
    * If this Pointer is a Pen / Stylus then you can access its eraser button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property {Phaser.DeviceButton} eraserButton
    * @default
    */
    this.eraserButton = new Phaser.DeviceButton(this, Phaser.Pointer.ERASER_BUTTON);

    /**
    * @property {boolean} _holdSent - Local private variable to store the status of dispatching a hold event.
    * @private
    * @default
    */
    this._holdSent = false;

    /**
    * @property {array} _history - Local private variable storing the short-term history of pointer movements.
    * @private
    */
    this._history = [];

    /**
    * @property {number} _nextDrop - Local private variable storing the time at which the next history drop should occur.
    * @private
    */
    this._nextDrop = 0;

    /**
    * @property {boolean} _stateReset - Monitor events outside of a state reset loop.
    * @private
    */
    this._stateReset = false;

    /**
    * @property {boolean} withinGame - true if the Pointer is over the game canvas, otherwise false.
    */
    this.withinGame = false;

    /**
    * @property {number} clientX - The horizontal coordinate of the Pointer within the application's client area at which the event occurred (as opposed to the coordinates within the page).
    */
    this.clientX = -1;

    /**
    * @property {number} clientY - The vertical coordinate of the Pointer within the application's client area at which the event occurred (as opposed to the coordinates within the page).
    */
    this.clientY = -1;

    /**
    * @property {number} pageX - The horizontal coordinate of the Pointer relative to whole document.
    */
    this.pageX = -1;

    /**
    * @property {number} pageY - The vertical coordinate of the Pointer relative to whole document.
    */
    this.pageY = -1;

    /**
    * @property {number} screenX - The horizontal coordinate of the Pointer relative to the screen.
    */
    this.screenX = -1;

    /**
    * @property {number} screenY - The vertical coordinate of the Pointer relative to the screen.
    */
    this.screenY = -1;

    /**
    * @property {number} rawMovementX - The horizontal raw relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.rawMovementX = 0;

    /**
    * @property {number} rawMovementY - The vertical raw relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.rawMovementY = 0;

    /**
    * @property {number} movementX - The horizontal processed relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.movementX = 0;

    /**
    * @property {number} movementY - The vertical processed relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.movementY = 0;

    /**
    * @property {number} x - The horizontal coordinate of the Pointer. This value is automatically scaled based on the game scale.
    * @default
    */
    this.x = -1;

    /**
    * @property {number} y - The vertical coordinate of the Pointer. This value is automatically scaled based on the game scale.
    * @default
    */
    this.y = -1;

    /**
    * @property {boolean} isMouse - If the Pointer is a mouse or pen / stylus this is true, otherwise false.
    */
    this.isMouse = (id === 0);

    /**
    * If the Pointer is touching the touchscreen, or *any* mouse or pen button is held down, isDown is set to true.
    * If you need to check a specific mouse or pen button then use the button properties, i.e. Pointer.rightButton.isDown.
    * @property {boolean} isDown
    * @default
    */
    this.isDown = false;

    /**
    * If the Pointer is not touching the touchscreen, or *all* mouse or pen buttons are up, isUp is set to true.
    * If you need to check a specific mouse or pen button then use the button properties, i.e. Pointer.rightButton.isUp.
    * @property {boolean} isUp
    * @default
    */
    this.isUp = true;

    /**
    * @property {number} timeDown - A timestamp representing when the Pointer first touched the touchscreen.
    * @default
    */
    this.timeDown = 0;

    /**
    * @property {number} timeUp - A timestamp representing when the Pointer left the touchscreen.
    * @default
    */
    this.timeUp = 0;

    /**
    * @property {number} previousTapTime - A timestamp representing when the Pointer was last tapped or clicked.
    * @default
    */
    this.previousTapTime = 0;

    /**
    * @property {number} totalTouches - The total number of times this Pointer has been touched to the touchscreen.
    * @default
    */
    this.totalTouches = 0;

    /**
    * @property {number} msSinceLastClick - The number of milliseconds since the last click or touch event.
    * @default
    */
    this.msSinceLastClick = Number.MAX_VALUE;

    /**
    * @property {any} targetObject - The Game Object this Pointer is currently over / touching / dragging.
    * @default
    */
    this.targetObject = null;

    /**
    * @property {boolean} active - An active pointer is one that is currently pressed down on the display. A Mouse is always active.
    * @default
    */
    this.active = false;

    /**
    * @property {boolean} dirty - A dirty pointer needs to re-poll any interactive objects it may have been over, regardless if it has moved or not.
    * @default
    */
    this.dirty = false;

    /**
    * @property {Phaser.Point} position - A Phaser.Point object containing the current x/y values of the pointer on the display.
    */
    this.position = new Phaser.Point();

    /**
    * @property {Phaser.Point} positionDown - A Phaser.Point object containing the x/y values of the pointer when it was last in a down state on the display.
    */
    this.positionDown = new Phaser.Point();
    
    /**
    * @property {Phaser.Point} positionUp - A Phaser.Point object containing the x/y values of the pointer when it was last released.
    */
    this.positionUp = new Phaser.Point();

    /**
    * A Phaser.Circle that is centered on the x/y coordinates of this pointer, useful for hit detection.
    * The Circle size is 44px (Apples recommended "finger tip" size).
    * @property {Phaser.Circle} circle
    */
    this.circle = new Phaser.Circle(0, 0, 44);

    /**
    * Click trampolines associated with this pointer. See `addClickTrampoline`.
    * @property {object[]|null} _clickTrampolines
    * @private
    */
    this._clickTrampolines = null;

    /**
    * When the Pointer has click trampolines the last target object is stored here
    * so it can be used to check for validity of the trampoline in a post-Up/'stop'.
    * @property {object} _trampolineTargetObject
    * @private
    */
    this._trampolineTargetObject = null;

};

/**
* No buttons at all.
* @constant
* @type {number}
*/
Phaser.Pointer.NO_BUTTON = 0;

/**
* The Left Mouse button, or in PointerEvent devices a Touch contact or Pen contact.
* @constant
* @type {number}
*/
Phaser.Pointer.LEFT_BUTTON = 1;

/**
* The Right Mouse button, or in PointerEvent devices a Pen contact with a barrel button.
* @constant
* @type {number}
*/
Phaser.Pointer.RIGHT_BUTTON = 2;

/**
* The Middle Mouse button.
* @constant
* @type {number}
*/
Phaser.Pointer.MIDDLE_BUTTON = 4;

/**
* The X1 button. This is typically the mouse Back button, but is often reconfigured.
* On Linux (GTK) this is unsupported. On Windows if advanced pointer software (such as IntelliPoint) is installed this doesn't register.
* @constant
* @type {number}
*/
Phaser.Pointer.BACK_BUTTON = 8;

/**
* The X2 button. This is typically the mouse Forward button, but is often reconfigured.
* On Linux (GTK) this is unsupported. On Windows if advanced pointer software (such as IntelliPoint) is installed this doesn't register.
* @constant
* @type {number}
*/
Phaser.Pointer.FORWARD_BUTTON = 16;

/**
* The Eraser pen button on PointerEvent supported devices only.
* @constant
* @type {number}
*/
Phaser.Pointer.ERASER_BUTTON = 32;

Phaser.Pointer.prototype = {

    /**
    * Resets the states of all the button booleans.
    * 
    * @method Phaser.Pointer#resetButtons
    * @protected
    */
    resetButtons: function () {

        this.isDown = false;
        this.isUp = true;

        if (this.isMouse)
        {
            this.leftButton.reset();
            this.middleButton.reset();
            this.rightButton.reset();
            this.backButton.reset();
            this.forwardButton.reset();
            this.eraserButton.reset();
        }

    },

    /**
    * Called when the event.buttons property changes from zero.
    * Contains a button bitmask.
    * 
    * @method Phaser.Pointer#updateButtons
    * @protected
    * @param {MouseEvent} event - The DOM event.
    */
    updateButtons: function (event) {

        this.button = event.button;

        //  This is tested back to IE9, but possibly some browsers may report this differently.
        //  If you find one, please tell us!
        var buttons = event.buttons;

        if (buttons === undefined)
        {
            return;
        }

        //  Note: These are bitwise checks, not booleans

        if (Phaser.Pointer.LEFT_BUTTON & buttons)
        {
            this.leftButton.start(event);
        }
        else
        {
            this.leftButton.stop(event);
        }

        if (Phaser.Pointer.RIGHT_BUTTON & buttons)
        {
            this.rightButton.start(event);
        }
        else
        {
            this.rightButton.stop(event);
        }
                
        if (Phaser.Pointer.MIDDLE_BUTTON & buttons)
        {
            this.middleButton.start(event);
        }
        else
        {
            this.middleButton.stop(event);
        }

        if (Phaser.Pointer.BACK_BUTTON & buttons)
        {
            this.backButton.start(event);
        }
        else
        {
            this.backButton.stop(event);
        }

        if (Phaser.Pointer.FORWARD_BUTTON & buttons)
        {
            this.forwardButton.start(event);
        }
        else
        {
            this.forwardButton.stop(event);
        }

        if (Phaser.Pointer.ERASER_BUTTON & buttons)
        {
            this.eraserButton.start(event);
        }
        else
        {
            this.eraserButton.stop(event);
        }

        //  On OS X (and other devices with trackpads) you have to press CTRL + the pad
        //  to initiate a right-click event, so we'll check for that here
        if (event.ctrlKey && this.leftButton.isDown)
        {
            this.rightButton.start(event);
        }

        this.isUp = true;
        this.isDown = false;

        if (this.leftButton.isDown || this.rightButton.isDown || this.middleButton.isDown || this.backButton.isDown || this.forwardButton.isDown || this.eraserButton.isDown)
        {
            this.isUp = false;
            this.isDown = true;
        }

    },

    /**
    * Called when the Pointer is pressed onto the touchscreen.
    * @method Phaser.Pointer#start
    * @param {any} event - The DOM event from the browser.
    */
    start: function (event) {

        if (event['pointerId'])
        {
            this.pointerId = event.pointerId;
        }

        this.identifier = event.identifier;
        this.target = event.target;

        if (this.isMouse)
        {
            this.updateButtons(event);
        }
        else
        {
            this.isDown = true;
            this.isUp = false;
        }

        this._history = [];
        this.active = true;
        this.withinGame = true;
        this.dirty = false;
        this._clickTrampolines = null;
        this._trampolineTargetObject = null;

        //  Work out how long it has been since the last click
        this.msSinceLastClick = this.game.time.time - this.timeDown;
        this.timeDown = this.game.time.time;
        this._holdSent = false;

        //  This sets the x/y and other local values
        this.move(event, true);

        // x and y are the old values here?
        this.positionDown.setTo(this.x, this.y);

        if (this.game.input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
            this.game.input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
            (this.game.input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && this.game.input.totalActivePointers === 0))
        {
            this.game.input.x = this.x;
            this.game.input.y = this.y;
            this.game.input.position.setTo(this.x, this.y);
            this.game.input.onDown.dispatch(this, event);
            this.game.input.resetSpeed(this.x, this.y);
        }

        this._stateReset = false;
        this.totalTouches++;

        if (this.targetObject !== null)
        {
            this.targetObject._touchedHandler(this);
        }

        return this;

    },

    /**
    * Called by the Input Manager.
    * @method Phaser.Pointer#update
    */
    update: function () {

        if (this.active)
        {
            //  Force a check?
            if (this.dirty)
            {
                if (this.game.input.interactiveItems.total > 0)
                {
                    this.processInteractiveObjects(false);
                }

                this.dirty = false;
            }

            if (this._holdSent === false && this.duration >= this.game.input.holdRate)
            {
                if (this.game.input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
                    this.game.input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
                    (this.game.input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && this.game.input.totalActivePointers === 0))
                {
                    this.game.input.onHold.dispatch(this);
                }

                this._holdSent = true;
            }

            //  Update the droppings history
            if (this.game.input.recordPointerHistory && this.game.time.time >= this._nextDrop)
            {
                this._nextDrop = this.game.time.time + this.game.input.recordRate;

                this._history.push({
                    x: this.position.x,
                    y: this.position.y
                });

                if (this._history.length > this.game.input.recordLimit)
                {
                    this._history.shift();
                }
            }
        }

    },

    /**
    * Called when the Pointer is moved.
    * 
    * @method Phaser.Pointer#move
    * @param {MouseEvent|PointerEvent|TouchEvent} event - The event passed up from the input handler.
    * @param {boolean} [fromClick=false] - Was this called from the click event?
    */
    move: function (event, fromClick) {

        if (this.game.input.pollLocked)
        {
            return;
        }

        if (fromClick === undefined) { fromClick = false; }

        if (event.button !== undefined)
        {
            this.button = event.button;
        }

        if (fromClick)
        {
            this.updateButtons(event);
        }

        this.clientX = event.clientX;
        this.clientY = event.clientY;

        this.pageX = event.pageX;
        this.pageY = event.pageY;

        this.screenX = event.screenX;
        this.screenY = event.screenY;

        if (this.isMouse && this.game.input.mouse.locked && !fromClick)
        {
            this.rawMovementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            this.rawMovementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            this.movementX += this.rawMovementX;
            this.movementY += this.rawMovementY;
        }

        this.x = (this.pageX - this.game.scale.offset.x) * this.game.input.scale.x;
        this.y = (this.pageY - this.game.scale.offset.y) * this.game.input.scale.y;

        this.position.setTo(this.x, this.y);
        this.circle.x = this.x;
        this.circle.y = this.y;

        if (this.game.input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
            this.game.input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
            (this.game.input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && this.game.input.totalActivePointers === 0))
        {
            this.game.input.activePointer = this;
            this.game.input.x = this.x;
            this.game.input.y = this.y;
            this.game.input.position.setTo(this.game.input.x, this.game.input.y);
            this.game.input.circle.x = this.game.input.x;
            this.game.input.circle.y = this.game.input.y;
        }

        this.withinGame = this.game.scale.bounds.contains(this.pageX, this.pageY);

        //  If the game is paused we don't process any target objects or callbacks
        if (this.game.paused)
        {
            return this;
        }

        var i = this.game.input.moveCallbacks.length;

        while (i--)
        {
            this.game.input.moveCallbacks[i].callback.call(this.game.input.moveCallbacks[i].context, this, this.x, this.y, fromClick);
        }

        //  Easy out if we're dragging something and it still exists
        if (this.targetObject !== null && this.targetObject.isDragged === true)
        {
            if (this.targetObject.update(this) === false)
            {
                this.targetObject = null;
            }
        }
        else if (this.game.input.interactiveItems.total > 0)
        {
            this.processInteractiveObjects(fromClick);
        }

        return this;

    },

    /**
    * Process all interactive objects to find out which ones were updated in the recent Pointer move.
    * 
    * @method Phaser.Pointer#processInteractiveObjects
    * @protected
    * @param {boolean} [fromClick=false] - Was this called from the click event?
    * @return {boolean} True if this method processes an object (i.e. a Sprite becomes the Pointers currentTarget), otherwise false.
    */
    processInteractiveObjects: function (fromClick) {

        //  Work out which object is on the top
        var highestRenderOrderID = Number.MAX_VALUE;
        var highestInputPriorityID = -1;
        var candidateTarget = null;

        //  First pass gets all objects that the pointer is over that DON'T use pixelPerfect checks and get the highest ID
        //  We know they'll be valid for input detection but not which is the top just yet

        var currentNode = this.game.input.interactiveItems.first;

        while (currentNode)
        {
            //  Reset checked status
            currentNode.checked = false;

            if (currentNode.validForInput(highestInputPriorityID, highestRenderOrderID, false))
            {
                //  Flag it as checked so we don't re-scan it on the next phase
                currentNode.checked = true;

                if ((fromClick && currentNode.checkPointerDown(this, true)) ||
                    (!fromClick && currentNode.checkPointerOver(this, true)))
                {
                    highestRenderOrderID = currentNode.sprite.renderOrderID;
                    highestInputPriorityID = currentNode.priorityID;
                    candidateTarget = currentNode;
                }
            }

            currentNode = this.game.input.interactiveItems.next;
        }

        //  Then in the second sweep we process ONLY the pixel perfect ones that are checked and who have a higher ID
        //  because if their ID is lower anyway then we can just automatically discount them
        //  (A node that was previously checked did not request a pixel-perfect check.)

        var currentNode = this.game.input.interactiveItems.first;

        while(currentNode)
        {
            if (!currentNode.checked &&
                currentNode.validForInput(highestInputPriorityID, highestRenderOrderID, true))
            {
                if ((fromClick && currentNode.checkPointerDown(this, false)) ||
                    (!fromClick && currentNode.checkPointerOver(this, false)))
                {
                    highestRenderOrderID = currentNode.sprite.renderOrderID;
                    highestInputPriorityID = currentNode.priorityID;
                    candidateTarget = currentNode;
                }
            }

            currentNode = this.game.input.interactiveItems.next;
        }

        //  Now we know the top-most item (if any) we can process it
        if (candidateTarget === null)
        {
            //  The pointer isn't currently over anything, check if we've got a lingering previous target
            if (this.targetObject)
            {
                this.targetObject._pointerOutHandler(this);
                this.targetObject = null;
            }
        }
        else
        {
            if (this.targetObject === null)
            {
                //  And now set the new one
                this.targetObject = candidateTarget;
                candidateTarget._pointerOverHandler(this);
            }
            else
            {
                //  We've got a target from the last update
                if (this.targetObject === candidateTarget)
                {
                    //  Same target as before, so update it
                    if (candidateTarget.update(this) === false)
                    {
                        this.targetObject = null;
                    }
                }
                else
                {
                    //  The target has changed, so tell the old one we've left it
                    this.targetObject._pointerOutHandler(this);

                    //  And now set the new one
                    this.targetObject = candidateTarget;
                    this.targetObject._pointerOverHandler(this);
                }
            }
        }

        return (this.targetObject !== null);

    },

    /**
    * Called when the Pointer leaves the target area.
    *
    * @method Phaser.Pointer#leave
    * @param {MouseEvent|PointerEvent|TouchEvent} event - The event passed up from the input handler.
    */
    leave: function (event) {

        this.withinGame = false;
        this.move(event, false);

    },

    /**
    * Called when the Pointer leaves the touchscreen.
    *
    * @method Phaser.Pointer#stop
    * @param {MouseEvent|PointerEvent|TouchEvent} event - The event passed up from the input handler.
    */
    stop: function (event) {

        if (this._stateReset && this.withinGame)
        {
            event.preventDefault();
            return;
        }

        if (this.isMouse)
        {
            this.updateButtons(event);
        }
        else
        {
            this.isDown = false;
            this.isUp = true;
        }

        this.timeUp = this.game.time.time;

        if (this.game.input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
            this.game.input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
            (this.game.input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && this.game.input.totalActivePointers === 0))
        {
            this.game.input.onUp.dispatch(this, event);

            //  Was it a tap?
            if (this.duration >= 0 && this.duration <= this.game.input.tapRate)
            {
                //  Was it a double-tap?
                if (this.timeUp - this.previousTapTime < this.game.input.doubleTapRate)
                {
                    //  Yes, let's dispatch the signal then with the 2nd parameter set to true
                    this.game.input.onTap.dispatch(this, true);
                }
                else
                {
                    //  Wasn't a double-tap, so dispatch a single tap signal
                    this.game.input.onTap.dispatch(this, false);
                }

                this.previousTapTime = this.timeUp;
            }
        }

        //  Mouse is always active
        if (this.id > 0)
        {
            this.active = false;
        }

        this.withinGame = false;
        this.pointerId = null;
        this.identifier = null;
        
        this.positionUp.setTo(this.x, this.y);
        
        if (this.isMouse === false)
        {
            this.game.input.currentPointers--;
        }

        this.game.input.interactiveItems.callAll('_releasedHandler', this);

        if (this._clickTrampolines)
        {
            this._trampolineTargetObject = this.targetObject;
        }

        this.targetObject = null;

        return this;

    },

    /**
    * The Pointer is considered justPressed if the time it was pressed onto the touchscreen or clicked is less than justPressedRate.
    * Note that calling justPressed doesn't reset the pressed status of the Pointer, it will return `true` for as long as the duration is valid.
    * If you wish to check if the Pointer was pressed down just once then see the Sprite.events.onInputDown event.
    * @method Phaser.Pointer#justPressed
    * @param {number} [duration] - The time to check against. If none given it will use InputManager.justPressedRate.
    * @return {boolean} true if the Pointer was pressed down within the duration given.
    */
    justPressed: function (duration) {

        duration = duration || this.game.input.justPressedRate;

        return (this.isDown === true && (this.timeDown + duration) > this.game.time.time);

    },

    /**
    * The Pointer is considered justReleased if the time it left the touchscreen is less than justReleasedRate.
    * Note that calling justReleased doesn't reset the pressed status of the Pointer, it will return `true` for as long as the duration is valid.
    * If you wish to check if the Pointer was released just once then see the Sprite.events.onInputUp event.
    * @method Phaser.Pointer#justReleased
    * @param {number} [duration] - The time to check against. If none given it will use InputManager.justReleasedRate.
    * @return {boolean} true if the Pointer was released within the duration given.
    */
    justReleased: function (duration) {

        duration = duration || this.game.input.justReleasedRate;

        return (this.isUp && (this.timeUp + duration) > this.game.time.time);

    },

    /**
    * Add a click trampoline to this pointer.
    *
    * A click trampoline is a callback that is run on the DOM 'click' event; this is primarily
    * needed with certain browsers (ie. IE11) which restrict some actions like requestFullscreen
    * to the DOM 'click' event and rejects it for 'pointer*' and 'mouse*' events.
    *
    * This is used internally by the ScaleManager; click trampoline usage is uncommon.
    * Click trampolines can only be added to pointers that are currently down.
    *
    * @method Phaser.Pointer#addClickTrampoline
    * @protected
    * @param {string} name - The name of the trampoline; must be unique among active trampolines in this pointer.
    * @param {function} callback - Callback to run/trampoline.
    * @param {object} callbackContext - Context of the callback.
    * @param {object[]|null} callbackArgs - Additional callback args, if any. Supplied as an array.
    */
    addClickTrampoline: function (name, callback, callbackContext, callbackArgs) {

        if (!this.isDown)
        {
            return;
        }

        var trampolines = (this._clickTrampolines = this._clickTrampolines || []);

        for (var i = 0; i < trampolines.length; i++)
        {
            if (trampolines[i].name === name)
            {
                trampolines.splice(i, 1);
                break;
            }
        }

        trampolines.push({
            name: name,
            targetObject: this.targetObject,
            callback: callback,
            callbackContext: callbackContext,
            callbackArgs: callbackArgs
        });

    },

    /**
    * Fire all click trampolines for which the pointers are still referring to the registered object.
    * @method Phaser.Pointer#processClickTrampolines
    * @private
    */
    processClickTrampolines: function () {

        var trampolines = this._clickTrampolines;

        if (!trampolines)
        {
            return;
        }

        for (var i = 0; i < trampolines.length; i++)
        {
            var trampoline = trampolines[i];

            if (trampoline.targetObject === this._trampolineTargetObject)
            {
                trampoline.callback.apply(trampoline.callbackContext, trampoline.callbackArgs);
            }
        }

        this._clickTrampolines = null;
        this._trampolineTargetObject = null;

    },

    /**
    * Resets the Pointer properties. Called by InputManager.reset when you perform a State change.
    * @method Phaser.Pointer#reset
    */
    reset: function () {

        if (this.isMouse === false)
        {
            this.active = false;
        }

        this.pointerId = null;
        this.identifier = null;
        this.dirty = false;
        this.totalTouches = 0;
        this._holdSent = false;
        this._history.length = 0;
        this._stateReset = true;

        this.resetButtons();

        if (this.targetObject)
        {
            this.targetObject._releasedHandler(this);
        }

        this.targetObject = null;

    },

    /**
     * Resets the movementX and movementY properties. Use in your update handler after retrieving the values.
     * @method Phaser.Pointer#resetMovement
     */
    resetMovement: function() {

        this.movementX = 0;
        this.movementY = 0;

    }

};

Phaser.Pointer.prototype.constructor = Phaser.Pointer;

/**
* How long the Pointer has been depressed on the touchscreen or *any* of the mouse buttons have been held down.
* If not currently down it returns -1.
* If you need to test a specific mouse or pen button then access the buttons directly, i.e. `Pointer.rightButton.duration`.
* 
* @name Phaser.Pointer#duration
* @property {number} duration
* @readonly
*/
Object.defineProperty(Phaser.Pointer.prototype, "duration", {

    get: function () {

        if (this.isUp)
        {
            return -1;
        }

        return this.game.time.time - this.timeDown;

    }

});

/**
* Gets the X value of this Pointer in world coordinates based on the world camera.
* @name Phaser.Pointer#worldX
* @property {number} duration - The X value of this Pointer in world coordinates based on the world camera.
* @readonly
*/
Object.defineProperty(Phaser.Pointer.prototype, "worldX", {

    get: function () {

        return this.game.world.camera.x + this.x;

    }

});

/**
* Gets the Y value of this Pointer in world coordinates based on the world camera.
* @name Phaser.Pointer#worldY
* @property {number} duration - The Y value of this Pointer in world coordinates based on the world camera.
* @readonly
*/
Object.defineProperty(Phaser.Pointer.prototype, "worldY", {

    get: function () {

        return this.game.world.camera.y + this.y;

    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Phaser.Touch handles touch events with your game. Note: Android 2.x only supports 1 touch event at once, no multi-touch.
*
* You should not normally access this class directly, but instead use a Phaser.Pointer object which normalises all game input for you.
*
* @class Phaser.Touch
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
*/
Phaser.Touch = function (game) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * Touch events will only be processed if enabled.
    * @property {boolean} enabled
    * @default
    */
    this.enabled = true;

    /**
    * An array of callbacks that will be fired every time a native touch start event is received from the browser.
    * This is used internally to handle audio and video unlocking on mobile devices.
    * To add a callback to this array please use `Touch.addTouchLockCallback`.
    * @property {array} touchLockCallbacks
    * @protected
    */
    this.touchLockCallbacks = [];

    /**
    * @property {object} callbackContext - The context under which callbacks are called.
    */
    this.callbackContext = this.game;

    /**
    * @property {function} touchStartCallback - A callback that can be fired on a touchStart event.
    */
    this.touchStartCallback = null;

    /**
    * @property {function} touchMoveCallback - A callback that can be fired on a touchMove event.
    */
    this.touchMoveCallback = null;

    /**
    * @property {function} touchEndCallback - A callback that can be fired on a touchEnd event.
    */
    this.touchEndCallback = null;

    /**
    * @property {function} touchEnterCallback - A callback that can be fired on a touchEnter event.
    */
    this.touchEnterCallback = null;

    /**
    * @property {function} touchLeaveCallback - A callback that can be fired on a touchLeave event.
    */
    this.touchLeaveCallback = null;

    /**
    * @property {function} touchCancelCallback - A callback that can be fired on a touchCancel event.
    */
    this.touchCancelCallback = null;

    /**
    * @property {boolean} preventDefault - If true the TouchEvent will have prevent.default called on it.
    * @default
    */
    this.preventDefault = true;

    /**
    * @property {TouchEvent} event - The browser touch DOM event. Will be set to null if no touch event has ever been received.
    * @default
    */
    this.event = null;

    /**
    * @property {function} _onTouchStart - Internal event handler reference.
    * @private
    */
    this._onTouchStart = null;

    /**
    * @property {function} _onTouchMove - Internal event handler reference.
    * @private
    */
    this._onTouchMove = null;

    /**
    * @property {function} _onTouchEnd - Internal event handler reference.
    * @private
    */
    this._onTouchEnd = null;

    /**
    * @property {function} _onTouchEnter - Internal event handler reference.
    * @private
    */
    this._onTouchEnter = null;

    /**
    * @property {function} _onTouchLeave - Internal event handler reference.
    * @private
    */
    this._onTouchLeave = null;

    /**
    * @property {function} _onTouchCancel - Internal event handler reference.
    * @private
    */
    this._onTouchCancel = null;

    /**
    * @property {function} _onTouchMove - Internal event handler reference.
    * @private
    */
    this._onTouchMove = null;

};

Phaser.Touch.prototype = {

    /**
    * Starts the event listeners running.
    * @method Phaser.Touch#start
    */
    start: function () {

        if (this._onTouchStart !== null)
        {
            //  Avoid setting multiple listeners
            return;
        }

        var _this = this;

        if (this.game.device.touch)
        {
            this._onTouchStart = function (event) {
                return _this.onTouchStart(event);
            };

            this._onTouchMove = function (event) {
                return _this.onTouchMove(event);
            };

            this._onTouchEnd = function (event) {
                return _this.onTouchEnd(event);
            };

            this._onTouchEnter = function (event) {
                return _this.onTouchEnter(event);
            };

            this._onTouchLeave = function (event) {
                return _this.onTouchLeave(event);
            };

            this._onTouchCancel = function (event) {
                return _this.onTouchCancel(event);
            };

            this.game.canvas.addEventListener('touchstart', this._onTouchStart, false);
            this.game.canvas.addEventListener('touchmove', this._onTouchMove, false);
            this.game.canvas.addEventListener('touchend', this._onTouchEnd, false);
            this.game.canvas.addEventListener('touchcancel', this._onTouchCancel, false);

            if (!this.game.device.cocoonJS)
            {
                this.game.canvas.addEventListener('touchenter', this._onTouchEnter, false);
                this.game.canvas.addEventListener('touchleave', this._onTouchLeave, false);
            }
        }

    },

    /**
    * Consumes all touchmove events on the document (only enable this if you know you need it!).
    * @method Phaser.Touch#consumeTouchMove
    */
    consumeDocumentTouches: function () {

        this._documentTouchMove = function (event) {
            event.preventDefault();
        };

        document.addEventListener('touchmove', this._documentTouchMove, false);

    },

    /**
    * Adds a callback that is fired when a browser touchstart event is received.
    *
    * This is used internally to handle audio and video unlocking on mobile devices.
    *
    * If the callback returns 'true' then the callback is automatically deleted once invoked.
    *
    * The callback is added to the Phaser.Touch.touchLockCallbacks array and should be removed with Phaser.Touch.removeTouchLockCallback.
    * 
    * @method Phaser.Touch#addTouchLockCallback
    * @param {function} callback - The callback that will be called when a touchstart event is received.
    * @param {object} context - The context in which the callback will be called.
    */
    addTouchLockCallback: function (callback, context) {

        this.touchLockCallbacks.push({ callback: callback, context: context });

    },

    /**
    * Removes the callback at the defined index from the Phaser.Touch.touchLockCallbacks array
    * 
    * @method Phaser.Touch#removeTouchLockCallback
    * @param {function} callback - The callback to be removed.
    * @param {object} context - The context in which the callback exists.
    * @return {boolean} True if the callback was deleted, otherwise false.
    */
    removeTouchLockCallback: function (callback, context) {

        var i = this.touchLockCallbacks.length;

        while (i--)
        {
            if (this.touchLockCallbacks[i].callback === callback && this.touchLockCallbacks[i].context === context)
            {
                this.touchLockCallbacks.splice(i, 1);
                return true;
            }
        }

        return false;

    },

    /**
    * The internal method that handles the touchstart event from the browser.
    * @method Phaser.Touch#onTouchStart
    * @param {TouchEvent} event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchStart: function (event) {

        var i = this.touchLockCallbacks.length;

        while (i--)
        {
            if (this.touchLockCallbacks[i].callback.call(this.touchLockCallbacks[i].context, this, event))
            {
                this.touchLockCallbacks.splice(i, 1);
            }
        }

        this.event = event;

        if (!this.game.input.enabled || !this.enabled)
        {
            return;
        }

        if (this.touchStartCallback)
        {
            this.touchStartCallback.call(this.callbackContext, event);
        }

        if (this.preventDefault)
        {
            event.preventDefault();
        }

        //  event.targetTouches = list of all touches on the TARGET ELEMENT (i.e. game dom element)
        //  event.touches = list of all touches on the ENTIRE DOCUMENT, not just the target element
        //  event.changedTouches = the touches that CHANGED in this event, not the total number of them
        for (var i = 0; i < event.changedTouches.length; i++)
        {
            this.game.input.startPointer(event.changedTouches[i]);
        }

    },

    /**
    * Touch cancel - touches that were disrupted (perhaps by moving into a plugin or browser chrome).
    * Occurs for example on iOS when you put down 4 fingers and the app selector UI appears.
    * @method Phaser.Touch#onTouchCancel
    * @param {TouchEvent} event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchCancel: function (event) {

        this.event = event;

        if (this.touchCancelCallback)
        {
            this.touchCancelCallback.call(this.callbackContext, event);
        }

        if (!this.game.input.enabled || !this.enabled)
        {
            return;
        }

        if (this.preventDefault)
        {
            event.preventDefault();
        }

        //  Touch cancel - touches that were disrupted (perhaps by moving into a plugin or browser chrome)
        //  http://www.w3.org/TR/touch-events/#dfn-touchcancel
        for (var i = 0; i < event.changedTouches.length; i++)
        {
            this.game.input.stopPointer(event.changedTouches[i]);
        }

    },

    /**
    * For touch enter and leave its a list of the touch points that have entered or left the target.
    * Doesn't appear to be supported by most browsers on a canvas element yet.
    * @method Phaser.Touch#onTouchEnter
    * @param {TouchEvent} event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchEnter: function (event) {

        this.event = event;

        if (this.touchEnterCallback)
        {
            this.touchEnterCallback.call(this.callbackContext, event);
        }

        if (!this.game.input.enabled || !this.enabled)
        {
            return;
        }

        if (this.preventDefault)
        {
            event.preventDefault();
        }

    },

    /**
    * For touch enter and leave its a list of the touch points that have entered or left the target.
    * Doesn't appear to be supported by most browsers on a canvas element yet.
    * @method Phaser.Touch#onTouchLeave
    * @param {TouchEvent} event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchLeave: function (event) {

        this.event = event;

        if (this.touchLeaveCallback)
        {
            this.touchLeaveCallback.call(this.callbackContext, event);
        }

        if (this.preventDefault)
        {
            event.preventDefault();
        }

    },

    /**
    * The handler for the touchmove events.
    * @method Phaser.Touch#onTouchMove
    * @param {TouchEvent} event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchMove: function (event) {

        this.event = event;

        if (this.touchMoveCallback)
        {
            this.touchMoveCallback.call(this.callbackContext, event);
        }

        if (this.preventDefault)
        {
            event.preventDefault();
        }

        for (var i = 0; i < event.changedTouches.length; i++)
        {
            this.game.input.updatePointer(event.changedTouches[i]);
        }

    },

    /**
    * The handler for the touchend events.
    * @method Phaser.Touch#onTouchEnd
    * @param {TouchEvent} event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchEnd: function (event) {

        this.event = event;

        if (this.touchEndCallback)
        {
            this.touchEndCallback.call(this.callbackContext, event);
        }

        if (this.preventDefault)
        {
            event.preventDefault();
        }

        //  For touch end its a list of the touch points that have been removed from the surface
        //  https://developer.mozilla.org/en-US/docs/DOM/TouchList
        //  event.changedTouches = the touches that CHANGED in this event, not the total number of them
        for (var i = 0; i < event.changedTouches.length; i++)
        {
            this.game.input.stopPointer(event.changedTouches[i]);
        }

    },

    /**
    * Stop the event listeners.
    * @method Phaser.Touch#stop
    */
    stop: function () {

        if (this.game.device.touch)
        {
            this.game.canvas.removeEventListener('touchstart', this._onTouchStart);
            this.game.canvas.removeEventListener('touchmove', this._onTouchMove);
            this.game.canvas.removeEventListener('touchend', this._onTouchEnd);
            this.game.canvas.removeEventListener('touchenter', this._onTouchEnter);
            this.game.canvas.removeEventListener('touchleave', this._onTouchLeave);
            this.game.canvas.removeEventListener('touchcancel', this._onTouchCancel);
        }

    }

};

Phaser.Touch.prototype.constructor = Phaser.Touch;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Input Handler is bound to a specific Sprite and is responsible for managing all Input events on that Sprite.
*
* @class Phaser.InputHandler
* @constructor
* @param {Phaser.Sprite} sprite - The Sprite object to which this Input Handler belongs.
*/
Phaser.InputHandler = function (sprite) {

    /**
    * @property {Phaser.Sprite} sprite - The Sprite object to which this Input Handler belongs.
    */
    this.sprite = sprite;

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = sprite.game;

    /**
    * @property {boolean} enabled - If enabled the Input Handler will process input requests and monitor pointer activity.
    * @default
    */
    this.enabled = false;

    /**
    * @property {boolean} checked - A disposable flag used by the Pointer class when performing priority checks.
    * @protected
    */
    this.checked = false;

    /**
    * The priorityID is used to determine which game objects should get priority when input events occur. For example if you have
    * several Sprites that overlap, by default the one at the top of the display list is given priority for input events. You can
    * stop this from happening by controlling the priorityID value. The higher the value, the more important they are considered to the Input events.
    * @property {number} priorityID
    * @default
    */
    this.priorityID = 0;

    /**
    * @property {boolean} useHandCursor - On a desktop browser you can set the 'hand' cursor to appear when moving over the Sprite.
    * @default
    */
    this.useHandCursor = false;

    /**
    * @property {boolean} _setHandCursor - Did this Sprite trigger the hand cursor?
    * @private
    */
    this._setHandCursor = false;

    /**
    * @property {boolean} isDragged - true if the Sprite is being currently dragged.
    * @default
    */
    this.isDragged = false;

    /**
    * @property {boolean} allowHorizontalDrag - Controls if the Sprite is allowed to be dragged horizontally.
    * @default
    */
    this.allowHorizontalDrag = true;

    /**
    * @property {boolean} allowVerticalDrag - Controls if the Sprite is allowed to be dragged vertically.
    * @default
    */
    this.allowVerticalDrag = true;

    /**
    * @property {boolean} bringToTop - If true when this Sprite is clicked or dragged it will automatically be bought to the top of the Group it is within.
    * @default
    */
    this.bringToTop = false;

    /**
    * @property {Phaser.Point} snapOffset - A Point object that contains by how far the Sprite snap is offset.
    * @default
    */
    this.snapOffset = null;

    /**
    * @property {boolean} snapOnDrag - When the Sprite is dragged this controls if the center of the Sprite will snap to the pointer on drag or not.
    * @default
    */
    this.snapOnDrag = false;

    /**
    * @property {boolean} snapOnRelease - When the Sprite is dragged this controls if the Sprite will be snapped on release.
    * @default
    */
    this.snapOnRelease = false;

    /**
    * @property {number} snapX - When a Sprite has snapping enabled this holds the width of the snap grid.
    * @default
    */
    this.snapX = 0;

    /**
    * @property {number} snapY - When a Sprite has snapping enabled this holds the height of the snap grid.
    * @default
    */
    this.snapY = 0;

    /**
    * @property {number} snapOffsetX - This defines the top-left X coordinate of the snap grid.
    * @default
    */
    this.snapOffsetX = 0;

    /**
    * @property {number} snapOffsetY - This defines the top-left Y coordinate of the snap grid..
    * @default
    */
    this.snapOffsetY = 0;

    /**
    * Set to true to use pixel perfect hit detection when checking if the pointer is over this Sprite.
    * The x/y coordinates of the pointer are tested against the image in combination with the InputHandler.pixelPerfectAlpha value.
    * This feature only works for display objects with image based textures such as Sprites. It won't work on BitmapText or Rope.
    * Warning: This is expensive, especially on mobile (where it's not even needed!) so only enable if required. Also see the less-expensive InputHandler.pixelPerfectClick.
    * @property {boolean} pixelPerfectOver - Use a pixel perfect check when testing for pointer over.
    * @default
    */
    this.pixelPerfectOver = false;

    /**
    * Set to true to use pixel perfect hit detection when checking if the pointer is over this Sprite when it's clicked or touched.
    * The x/y coordinates of the pointer are tested against the image in combination with the InputHandler.pixelPerfectAlpha value.
    * This feature only works for display objects with image based textures such as Sprites. It won't work on BitmapText or Rope.
    * Warning: This is expensive so only enable if you really need it.
    * @property {boolean} pixelPerfectClick - Use a pixel perfect check when testing for clicks or touches on the Sprite.
    * @default
    */
    this.pixelPerfectClick = false;

    /**
    * @property {number} pixelPerfectAlpha - The alpha tolerance threshold. If the alpha value of the pixel matches or is above this value, it's considered a hit.
    * @default
    */
    this.pixelPerfectAlpha = 255;

    /**
    * @property {boolean} draggable - Is this sprite allowed to be dragged by the mouse? true = yes, false = no
    * @default
    */
    this.draggable = false;

    /**
    * @property {Phaser.Rectangle} boundsRect - A region of the game world within which the sprite is restricted during drag.
    * @default
    */
    this.boundsRect = null;

    /**
    * @property {Phaser.Sprite} boundsSprite - A Sprite the bounds of which this sprite is restricted during drag.
    * @default
    */
    this.boundsSprite = null;

    /**
    * If this object is set to consume the pointer event then it will stop all propagation from this object on.
    * For example if you had a stack of 6 sprites with the same priority IDs and one consumed the event, none of the others would receive it.
    * @property {boolean} consumePointerEvent
    * @default
    */
    this.consumePointerEvent = false;

    /**
    * @property {boolean} scaleLayer - EXPERIMENTAL: Please do not use this property unless you know what it does. Likely to change in the future.
    */
    this.scaleLayer = false;

    /**
    * @property {Phaser.Point} dragOffset - The offset from the Sprites position that dragging takes place from.
    */
    this.dragOffset = new Phaser.Point();

    /**
    * @property {boolean} dragFromCenter - Is the Sprite dragged from its center, or the point at which the Pointer was pressed down upon it?
    */
    this.dragFromCenter = false;

    /**
    * @property {Phaser.Point} dragStartPoint - The Point from which the most recent drag started from. Useful if you need to return an object to its starting position.
    */
    this.dragStartPoint = new Phaser.Point();

    /**
    * @property {Phaser.Point} snapPoint - If the sprite is set to snap while dragging this holds the point of the most recent 'snap' event.
    */
    this.snapPoint = new Phaser.Point();

    /**
    * @property {Phaser.Point} _dragPoint - Internal cache var.
    * @private
    */
    this._dragPoint = new Phaser.Point();

    /**
    * @property {boolean} _dragPhase - Internal cache var.
    * @private
    */
    this._dragPhase = false;

    /**
    * @property {boolean} _wasEnabled - Internal cache var.
    * @private
    */
    this._wasEnabled = false;

    /**
    * @property {Phaser.Point} _tempPoint - Internal cache var.
    * @private
    */
    this._tempPoint = new Phaser.Point();

    /**
    * @property {array} _pointerData - Internal cache var.
    * @private
    */
    this._pointerData = [];

    this._pointerData.push({
        id: 0,
        x: 0,
        y: 0,
        isDown: false,
        isUp: false,
        isOver: false,
        isOut: false,
        timeOver: 0,
        timeOut: 0,
        timeDown: 0,
        timeUp: 0,
        downDuration: 0,
        isDragged: false
    });

};

Phaser.InputHandler.prototype = {

    /**
    * Starts the Input Handler running. This is called automatically when you enable input on a Sprite, or can be called directly if you need to set a specific priority.
    * @method Phaser.InputHandler#start
    * @param {number} priority - Higher priority sprites take click priority over low-priority sprites when they are stacked on-top of each other.
    * @param {boolean} useHandCursor - If true the Sprite will show the hand cursor on mouse-over (doesn't apply to mobile browsers)
    * @return {Phaser.Sprite} The Sprite object to which the Input Handler is bound.
    */
    start: function (priority, useHandCursor) {

        priority = priority || 0;
        if (useHandCursor === undefined) { useHandCursor = false; }

        //  Turning on
        if (this.enabled === false)
        {
            //  Register, etc
            this.game.input.interactiveItems.add(this);
            this.useHandCursor = useHandCursor;
            this.priorityID = priority;

            for (var i = 0; i < 10; i++)
            {
                this._pointerData[i] = {
                    id: i,
                    x: 0,
                    y: 0,
                    isDown: false,
                    isUp: false,
                    isOver: false,
                    isOut: false,
                    timeOver: 0,
                    timeOut: 0,
                    timeDown: 0,
                    timeUp: 0,
                    downDuration: 0,
                    isDragged: false
                };
            }

            this.snapOffset = new Phaser.Point();
            this.enabled = true;
            this._wasEnabled = true;

        }

        this.sprite.events.onAddedToGroup.add(this.addedToGroup, this);
        this.sprite.events.onRemovedFromGroup.add(this.removedFromGroup, this);

        this.flagged = false;

        return this.sprite;

    },

    /**
    * Handles when the parent Sprite is added to a new Group.
    *
    * @method Phaser.InputHandler#addedToGroup
    * @private
    */
    addedToGroup: function () {

        if (this._dragPhase)
        {
            return;
        }

        if (this._wasEnabled && !this.enabled)
        {
            this.start();
        }

    },

    /**
    * Handles when the parent Sprite is removed from a Group.
    *
    * @method Phaser.InputHandler#removedFromGroup
    * @private
    */
    removedFromGroup: function () {

        if (this._dragPhase)
        {
            return;
        }

        if (this.enabled)
        {
            this._wasEnabled = true;
            this.stop();
        }
        else
        {
            this._wasEnabled = false;
        }

    },

    /**
    * Resets the Input Handler and disables it.
    * @method Phaser.InputHandler#reset
    */
    reset: function () {

        this.enabled = false;
        this.flagged = false;

        for (var i = 0; i < 10; i++)
        {
            this._pointerData[i] = {
                id: i,
                x: 0,
                y: 0,
                isDown: false,
                isUp: false,
                isOver: false,
                isOut: false,
                timeOver: 0,
                timeOut: 0,
                timeDown: 0,
                timeUp: 0,
                downDuration: 0,
                isDragged: false
            };
        }
    },

    /**
    * Stops the Input Handler from running.
    * @method Phaser.InputHandler#stop
    */
    stop: function () {

        //  Turning off
        if (this.enabled === false)
        {
            return;
        }
        else
        {
            //  De-register, etc
            this.enabled = false;
            this.game.input.interactiveItems.remove(this);
        }

    },

    /**
    * Clean up memory.
    * @method Phaser.InputHandler#destroy
    */
    destroy: function () {

        if (this.sprite)
        {
            if (this._setHandCursor)
            {
                this.game.canvas.style.cursor = "default";
                this._setHandCursor = false;
            }

            this.enabled = false;

            this.game.input.interactiveItems.remove(this);

            this._pointerData.length = 0;
            this.boundsRect = null;
            this.boundsSprite = null;
            this.sprite = null;
        }

    },

    /**
    * Checks if the object this InputHandler is bound to is valid for consideration in the Pointer move event.
    * This is called by Phaser.Pointer and shouldn't typically be called directly.
    *
    * @method Phaser.InputHandler#validForInput
    * @protected
    * @param {number} highestID - The highest ID currently processed by the Pointer.
    * @param {number} highestRenderID - The highest Render Order ID currently processed by the Pointer.
    * @param {boolean} [includePixelPerfect=true] - If this object has `pixelPerfectClick` or `pixelPerfectOver` set should it be considered as valid?
    * @return {boolean} True if the object this InputHandler is bound to should be considered as valid for input detection.
    */
    validForInput: function (highestID, highestRenderID, includePixelPerfect) {

        if (includePixelPerfect === undefined) { includePixelPerfect = true; }

        if (this.sprite.scale.x === 0 || this.sprite.scale.y === 0 || this.priorityID < this.game.input.minPriorityID)
        {
            return false;
        }

        //   If we're trying to specifically IGNORE pixel perfect objects, then set includePixelPerfect to false and skip it
        if (!includePixelPerfect && (this.pixelPerfectClick || this.pixelPerfectOver))
        {
            return false;
        }

        if (this.priorityID > highestID || (this.priorityID === highestID && this.sprite.renderOrderID < highestRenderID))
        {
            return true;
        }

        return false;

    },

    /**
    * Is this object using pixel perfect checking?
    *
    * @method Phaser.InputHandler#isPixelPerfect
    * @return {boolean} True if the this InputHandler has either `pixelPerfectClick` or `pixelPerfectOver` set to `true`.
    */
    isPixelPerfect: function () {

        return (this.pixelPerfectClick || this.pixelPerfectOver);

    },

    /**
    * The x coordinate of the Input pointer, relative to the top-left of the parent Sprite.
    * This value is only set when the pointer is over this Sprite.
    *
    * @method Phaser.InputHandler#pointerX
    * @param {number} pointer - The index of the pointer to check. You can get this from Phaser.Pointer.id.
    * @return {number} The x coordinate of the Input pointer.
    */
    pointerX: function (pointer) {

        pointer = pointer || 0;

        return this._pointerData[pointer].x;

    },

    /**
    * The y coordinate of the Input pointer, relative to the top-left of the parent Sprite
    * This value is only set when the pointer is over this Sprite.
    *
    * @method Phaser.InputHandler#pointerY
    * @param {number} pointer - The index of the pointer to check. You can get this from Phaser.Pointer.id.
    * @return {number} The y coordinate of the Input pointer.
    */
    pointerY: function (pointer) {

        pointer = pointer || 0;

        return this._pointerData[pointer].y;

    },

    /**
    * If the Pointer is down this returns true. Please note that it only checks if the Pointer is down, not if it's down over any specific Sprite.
    *
    * @method Phaser.InputHandler#pointerDown
    * @param {number} pointer - The index of the pointer to check. You can get this from Phaser.Pointer.id.
    * @return {boolean} - True if the given pointer is down, otherwise false.
    */
    pointerDown: function (pointer) {

        pointer = pointer || 0;

        return this._pointerData[pointer].isDown;

    },

    /**
    * If the Pointer is up this returns true. Please note that it only checks if the Pointer is up, not if it's up over any specific Sprite.
    *
    * @method Phaser.InputHandler#pointerUp
    * @param {number} pointer - The index of the pointer to check. You can get this from Phaser.Pointer.id.
    * @return {boolean} - True if the given pointer is up, otherwise false.
    */
    pointerUp: function (pointer) {

        pointer = pointer || 0;

        return this._pointerData[pointer].isUp;

    },

    /**
    * A timestamp representing when the Pointer first touched the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeDown
    * @param {number} pointer - The index of the pointer to check. You can get this from Phaser.Pointer.id.
    * @return {number}
    */
    pointerTimeDown: function (pointer) {

        pointer = pointer || 0;

        return this._pointerData[pointer].timeDown;

    },

    /**
    * A timestamp representing when the Pointer left the touchscreen.
    * @method Phaser.InputHandler#pointerTimeUp
    * @param {Phaser.Pointer} pointer
    * @return {number}
    */
    pointerTimeUp: function (pointer) {

        pointer = pointer || 0;

        return this._pointerData[pointer].timeUp;

    },

    /**
    * Is the Pointer over this Sprite?
    *
    * @method Phaser.InputHandler#pointerOver
    * @param {number} [index] - The ID number of a Pointer to check. If you don't provide a number it will check all Pointers.
    * @return {boolean} - True if the given pointer (if a index was given, or any pointer if not) is over this object.
    */
    pointerOver: function (index) {

        if (this.enabled)
        {
            if (index === undefined)
            {
                for (var i = 0; i < 10; i++)
                {
                    if (this._pointerData[i].isOver)
                    {
                        return true;
                    }
                }
            }
            else
            {
                return this._pointerData[index].isOver;
            }
        }

        return false;

    },

    /**
    * Is the Pointer outside of this Sprite?
    * @method Phaser.InputHandler#pointerOut
    * @param {number} [index] - The ID number of a Pointer to check. If you don't provide a number it will check all Pointers.
    * @return {boolean} True if the given pointer (if a index was given, or any pointer if not) is out of this object.
    */
    pointerOut: function (index) {

        if (this.enabled)
        {
            if (index === undefined)
            {
                for (var i = 0; i < 10; i++)
                {
                    if (this._pointerData[i].isOut)
                    {
                        return true;
                    }
                }
            }
            else
            {
                return this._pointerData[index].isOut;
            }
        }

        return false;

    },

    /**
    * A timestamp representing when the Pointer first touched the touchscreen.
    * @method Phaser.InputHandler#pointerTimeOver
    * @param {Phaser.Pointer} pointer
    * @return {number}
    */
    pointerTimeOver: function (pointer) {

        pointer = pointer || 0;

        return this._pointerData[pointer].timeOver;

    },

    /**
    * A timestamp representing when the Pointer left the touchscreen.
    * @method Phaser.InputHandler#pointerTimeOut
    * @param {Phaser.Pointer} pointer
    * @return {number}
    */
    pointerTimeOut: function (pointer) {

        pointer = pointer || 0;

        return this._pointerData[pointer].timeOut;

    },

    /**
    * Is this sprite being dragged by the mouse or not?
    * @method Phaser.InputHandler#pointerDragged
    * @param {Phaser.Pointer} pointer
    * @return {boolean} True if the pointer is dragging an object, otherwise false.
    */
    pointerDragged: function (pointer) {

        pointer = pointer || 0;

        return this._pointerData[pointer].isDragged;

    },

    /**
    * Checks if the given pointer is both down and over the Sprite this InputHandler belongs to.
    * Use the `fastTest` flag is to quickly check just the bounding hit area even if `InputHandler.pixelPerfectOver` is `true`.
    *
    * @method Phaser.InputHandler#checkPointerDown
    * @param {Phaser.Pointer} pointer
    * @param {boolean} [fastTest=false] - Force a simple hit area check even if `pixelPerfectOver` is true for this object?
    * @return {boolean} True if the pointer is down, otherwise false.
    */
    checkPointerDown: function (pointer, fastTest) {

        if (!pointer.isDown || !this.enabled || !this.sprite || !this.sprite.parent || !this.sprite.visible || !this.sprite.parent.visible)
        {
            return false;
        }

        //  Need to pass it a temp point, in case we need it again for the pixel check
        if (this.game.input.hitTest(this.sprite, pointer, this._tempPoint))
        {
            if (fastTest === undefined) { fastTest = false; }

            if (!fastTest && this.pixelPerfectClick)
            {
                return this.checkPixel(this._tempPoint.x, this._tempPoint.y);
            }
            else
            {
                return true;
            }
        }

        return false;

    },

    /**
    * Checks if the given pointer is over the Sprite this InputHandler belongs to.
    * Use the `fastTest` flag is to quickly check just the bounding hit area even if `InputHandler.pixelPerfectOver` is `true`.
    *
    * @method Phaser.InputHandler#checkPointerOver
    * @param {Phaser.Pointer} pointer
    * @param {boolean} [fastTest=false] - Force a simple hit area check even if `pixelPerfectOver` is true for this object?
    * @return {boolean}
    */
    checkPointerOver: function (pointer, fastTest) {

        if (!this.enabled || !this.sprite || !this.sprite.parent || !this.sprite.visible || !this.sprite.parent.visible)
        {
            return false;
        }

        //  Need to pass it a temp point, in case we need it again for the pixel check
        if (this.game.input.hitTest(this.sprite, pointer, this._tempPoint))
        {
            if (fastTest === undefined) { fastTest = false; }

            if (!fastTest && this.pixelPerfectOver)
            {
                return this.checkPixel(this._tempPoint.x, this._tempPoint.y);
            }
            else
            {
                return true;
            }
        }

        return false;

    },

    /**
    * Runs a pixel perfect check against the given x/y coordinates of the Sprite this InputHandler is bound to.
    * It compares the alpha value of the pixel and if >= InputHandler.pixelPerfectAlpha it returns true.
    * @method Phaser.InputHandler#checkPixel
    * @param {number} x - The x coordinate to check.
    * @param {number} y - The y coordinate to check.
    * @param {Phaser.Pointer} [pointer] - The pointer to get the x/y coordinate from if not passed as the first two parameters.
    * @return {boolean} true if there is the alpha of the pixel is >= InputHandler.pixelPerfectAlpha
    */
    checkPixel: function (x, y, pointer) {

        //  Grab a pixel from our image into the hitCanvas and then test it
        if (this.sprite.texture.baseTexture.source)
        {
            if (x === null && y === null)
            {
                //  Use the pointer parameter
                this.game.input.getLocalPosition(this.sprite, pointer, this._tempPoint);

                var x = this._tempPoint.x;
                var y = this._tempPoint.y;
            }

            if (this.sprite.anchor.x !== 0)
            {
                x -= -this.sprite.texture.frame.width * this.sprite.anchor.x;
            }

            if (this.sprite.anchor.y !== 0)
            {
                y -= -this.sprite.texture.frame.height * this.sprite.anchor.y;
            }

            x += this.sprite.texture.frame.x;
            y += this.sprite.texture.frame.y;

            if (this.sprite.texture.trim)
            {
                x -= this.sprite.texture.trim.x;
                y -= this.sprite.texture.trim.y;

                //  If the coordinates are outside the trim area we return false immediately, to save doing a draw call
                if (x < this.sprite.texture.crop.x || x > this.sprite.texture.crop.right || y < this.sprite.texture.crop.y || y > this.sprite.texture.crop.bottom)
                {
                    this._dx = x;
                    this._dy = y;
                    return false;
                }
            }

            this._dx = x;
            this._dy = y;

            this.game.input.hitContext.clearRect(0, 0, 1, 1);
            this.game.input.hitContext.drawImage(this.sprite.texture.baseTexture.source, x, y, 1, 1, 0, 0, 1, 1);

            var rgb = this.game.input.hitContext.getImageData(0, 0, 1, 1);

            if (rgb.data[3] >= this.pixelPerfectAlpha)
            {
                return true;
            }
        }

        return false;

    },

    /**
    * Update.
    * 
    * @method Phaser.InputHandler#update
    * @protected
    * @param {Phaser.Pointer} pointer
    */
    update: function (pointer) {

        if (this.sprite === null || this.sprite.parent === undefined)
        {
            //  Abort. We've been destroyed.
            return;
        }

        if (!this.enabled || !this.sprite.visible || !this.sprite.parent.visible)
        {
            this._pointerOutHandler(pointer);
            return false;
        }

        if (this.draggable && this._draggedPointerID === pointer.id)
        {
            return this.updateDrag(pointer);
        }
        else if (this._pointerData[pointer.id].isOver)
        {
            if (this.checkPointerOver(pointer))
            {
                this._pointerData[pointer.id].x = pointer.x - this.sprite.x;
                this._pointerData[pointer.id].y = pointer.y - this.sprite.y;
                return true;
            }
            else
            {
                this._pointerOutHandler(pointer);
                return false;
            }
        }
    },

    /**
    * Internal method handling the pointer over event.
    * 
    * @method Phaser.InputHandler#_pointerOverHandler
    * @private
    * @param {Phaser.Pointer} pointer - The pointer that triggered the event
    */
    _pointerOverHandler: function (pointer) {

        if (this.sprite === null)
        {
            //  Abort. We've been destroyed.
            return;
        }

        if (this._pointerData[pointer.id].isOver === false || pointer.dirty)
        {
            this._pointerData[pointer.id].isOver = true;
            this._pointerData[pointer.id].isOut = false;
            this._pointerData[pointer.id].timeOver = this.game.time.time;
            this._pointerData[pointer.id].x = pointer.x - this.sprite.x;
            this._pointerData[pointer.id].y = pointer.y - this.sprite.y;

            if (this.useHandCursor && this._pointerData[pointer.id].isDragged === false)
            {
                this.game.canvas.style.cursor = "pointer";
                this._setHandCursor = true;
            }

            if (this.sprite && this.sprite.events)
            {
                this.sprite.events.onInputOver$dispatch(this.sprite, pointer);
            }
        }

    },

    /**
    * Internal method handling the pointer out event.
    * 
    * @method Phaser.InputHandler#_pointerOutHandler
    * @private
    * @param {Phaser.Pointer} pointer - The pointer that triggered the event.
    */
    _pointerOutHandler: function (pointer) {

        if (this.sprite === null)
        {
            //  Abort. We've been destroyed.
            return;
        }

        this._pointerData[pointer.id].isOver = false;
        this._pointerData[pointer.id].isOut = true;
        this._pointerData[pointer.id].timeOut = this.game.time.time;

        if (this.useHandCursor && this._pointerData[pointer.id].isDragged === false)
        {
            this.game.canvas.style.cursor = "default";
            this._setHandCursor = false;
        }

        if (this.sprite && this.sprite.events)
        {
            this.sprite.events.onInputOut$dispatch(this.sprite, pointer);
        }

    },

    /**
    * Internal method handling the touched / clicked event.
    * 
    * @method Phaser.InputHandler#_touchedHandler
    * @private
    * @param {Phaser.Pointer} pointer - The pointer that triggered the event.
    */
    _touchedHandler: function (pointer) {

        if (this.sprite === null)
        {
            //  Abort. We've been destroyed.
            return;
        }

        if (!this._pointerData[pointer.id].isDown && this._pointerData[pointer.id].isOver)
        {
            if (this.pixelPerfectClick && !this.checkPixel(null, null, pointer))
            {
                return;
            }

            this._pointerData[pointer.id].isDown = true;
            this._pointerData[pointer.id].isUp = false;
            this._pointerData[pointer.id].timeDown = this.game.time.time;

            if (this.sprite && this.sprite.events)
            {
                this.sprite.events.onInputDown$dispatch(this.sprite, pointer);
            }

            //  It's possible the onInputDown event created a new Sprite that is on-top of this one, so we ought to force a Pointer update
            pointer.dirty = true;

            //  Start drag
            if (this.draggable && this.isDragged === false)
            {
                this.startDrag(pointer);
            }

            if (this.bringToTop)
            {
                this.sprite.bringToTop();
            }
        }

        //  Consume the event?
        return this.consumePointerEvent;

    },

    /**
    * Internal method handling the pointer released event.
    * @method Phaser.InputHandler#_releasedHandler
    * @private
    * @param {Phaser.Pointer} pointer
    */
    _releasedHandler: function (pointer) {

        if (this.sprite === null)
        {
            //  Abort. We've been destroyed.
            return;
        }

        //  If was previously touched by this Pointer, check if still is AND still over this item
        if (this._pointerData[pointer.id].isDown && pointer.isUp)
        {
            this._pointerData[pointer.id].isDown = false;
            this._pointerData[pointer.id].isUp = true;
            this._pointerData[pointer.id].timeUp = this.game.time.time;
            this._pointerData[pointer.id].downDuration = this._pointerData[pointer.id].timeUp - this._pointerData[pointer.id].timeDown;

            //  Only release the InputUp signal if the pointer is still over this sprite
            if (this.checkPointerOver(pointer))
            {
                //  Release the inputUp signal and provide optional parameter if pointer is still over the sprite or not
                if (this.sprite && this.sprite.events)
                {
                    this.sprite.events.onInputUp$dispatch(this.sprite, pointer, true);
                }
            }
            else
            {
                //  Release the inputUp signal and provide optional parameter if pointer is still over the sprite or not
                if (this.sprite && this.sprite.events)
                {
                    this.sprite.events.onInputUp$dispatch(this.sprite, pointer, false);
                }

                //  Pointer outside the sprite? Reset the cursor
                if (this.useHandCursor)
                {
                    this.game.canvas.style.cursor = "default";
                    this._setHandCursor = false;
                }
            }

            //  It's possible the onInputUp event created a new Sprite that is on-top of this one, so we ought to force a Pointer update
            pointer.dirty = true;

            //  Stop drag
            if (this.draggable && this.isDragged && this._draggedPointerID === pointer.id)
            {
                this.stopDrag(pointer);
            }
        }

    },

    /**
    * Updates the Pointer drag on this Sprite.
    * @method Phaser.InputHandler#updateDrag
    * @param {Phaser.Pointer} pointer
    * @return {boolean}
    */
    updateDrag: function (pointer) {

        if (pointer.isUp)
        {
            this.stopDrag(pointer);
            return false;
        }

        var px = this.globalToLocalX(pointer.x) + this._dragPoint.x + this.dragOffset.x;
        var py = this.globalToLocalY(pointer.y) + this._dragPoint.y + this.dragOffset.y;

        if (this.sprite.fixedToCamera)
        {
            if (this.allowHorizontalDrag)
            {
                this.sprite.cameraOffset.x = px;
            }

            if (this.allowVerticalDrag)
            {
                this.sprite.cameraOffset.y = py;
            }

            if (this.boundsRect)
            {
                this.checkBoundsRect();
            }

            if (this.boundsSprite)
            {
                this.checkBoundsSprite();
            }

            if (this.snapOnDrag)
            {
                this.sprite.cameraOffset.x = Math.round((this.sprite.cameraOffset.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.cameraOffset.y = Math.round((this.sprite.cameraOffset.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
                this.snapPoint.set(this.sprite.cameraOffset.x, this.sprite.cameraOffset.y);
            }
        }
        else
        {
            if (this.allowHorizontalDrag)
            {
                this.sprite.x = px;
            }

            if (this.allowVerticalDrag)
            {
                this.sprite.y = py;
            }

            if (this.boundsRect)
            {
                this.checkBoundsRect();
            }

            if (this.boundsSprite)
            {
                this.checkBoundsSprite();
            }

            if (this.snapOnDrag)
            {
                this.sprite.x = Math.round((this.sprite.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.y = Math.round((this.sprite.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
                this.snapPoint.set(this.sprite.x, this.sprite.y);
            }
        }

        this.sprite.events.onDragUpdate.dispatch(this.sprite, pointer, px, py, this.snapPoint);

        return true;

    },

    /**
    * Returns true if the pointer has entered the Sprite within the specified delay time (defaults to 500ms, half a second)
    * @method Phaser.InputHandler#justOver
    * @param {Phaser.Pointer} pointer
    * @param {number} delay - The time below which the pointer is considered as just over.
    * @return {boolean}
    */
    justOver: function (pointer, delay) {

        pointer = pointer || 0;
        delay = delay || 500;

        return (this._pointerData[pointer].isOver && this.overDuration(pointer) < delay);

    },

    /**
    * Returns true if the pointer has left the Sprite within the specified delay time (defaults to 500ms, half a second)
    * @method Phaser.InputHandler#justOut
    * @param {Phaser.Pointer} pointer
    * @param {number} delay - The time below which the pointer is considered as just out.
    * @return {boolean}
    */
    justOut: function (pointer, delay) {

        pointer = pointer || 0;
        delay = delay || 500;

        return (this._pointerData[pointer].isOut && (this.game.time.time - this._pointerData[pointer].timeOut < delay));

    },

    /**
    * Returns true if the pointer has touched or clicked on the Sprite within the specified delay time (defaults to 500ms, half a second)
    * @method Phaser.InputHandler#justPressed
    * @param {Phaser.Pointer} pointer
    * @param {number} delay - The time below which the pointer is considered as just over.
    * @return {boolean}
    */
    justPressed: function (pointer, delay) {

        pointer = pointer || 0;
        delay = delay || 500;

        return (this._pointerData[pointer].isDown && this.downDuration(pointer) < delay);

    },

    /**
    * Returns true if the pointer was touching this Sprite, but has been released within the specified delay time (defaults to 500ms, half a second)
    * @method Phaser.InputHandler#justReleased
    * @param {Phaser.Pointer} pointer
    * @param {number} delay - The time below which the pointer is considered as just out.
    * @return {boolean}
    */
    justReleased: function (pointer, delay) {

        pointer = pointer || 0;
        delay = delay || 500;

        return (this._pointerData[pointer].isUp && (this.game.time.time - this._pointerData[pointer].timeUp < delay));

    },

    /**
    * If the pointer is currently over this Sprite this returns how long it has been there for in milliseconds.
    * @method Phaser.InputHandler#overDuration
    * @param {Phaser.Pointer} pointer
    * @return {number} The number of milliseconds the pointer has been over the Sprite, or -1 if not over.
    */
    overDuration: function (pointer) {

        pointer = pointer || 0;

        if (this._pointerData[pointer].isOver)
        {
            return this.game.time.time - this._pointerData[pointer].timeOver;
        }

        return -1;

    },

    /**
    * If the pointer is currently over this Sprite this returns how long it has been there for in milliseconds.
    * @method Phaser.InputHandler#downDuration
    * @param {Phaser.Pointer} pointer
    * @return {number} The number of milliseconds the pointer has been pressed down on the Sprite, or -1 if not over.
    */
    downDuration: function (pointer) {

        pointer = pointer || 0;

        if (this._pointerData[pointer].isDown)
        {
            return this.game.time.time - this._pointerData[pointer].timeDown;
        }

        return -1;

    },

    /**
    * Allow this Sprite to be dragged by any valid pointer.
    *
    * When the drag begins the Sprite.events.onDragStart event will be dispatched.
    * 
    * When the drag completes by way of the user letting go of the pointer that was dragging the sprite, the Sprite.events.onDragStop event is dispatched.
    *
    * For the duration of the drag the Sprite.events.onDragUpdate event is dispatched. This event is only dispatched when the pointer actually
    * changes position and moves. The event sends 5 parameters: `sprite`, `pointer`, `dragX`, `dragY` and `snapPoint`.
    * 
    * @method Phaser.InputHandler#enableDrag
    * @param {boolean} [lockCenter=false] - If false the Sprite will drag from where you click it minus the dragOffset. If true it will center itself to the tip of the mouse pointer.
    * @param {boolean} [bringToTop=false] - If true the Sprite will be bought to the top of the rendering list in its current Group.
    * @param {boolean} [pixelPerfect=false] - If true it will use a pixel perfect test to see if you clicked the Sprite. False uses the bounding box.
    * @param {boolean} [alphaThreshold=255] - If using pixel perfect collision this specifies the alpha level from 0 to 255 above which a collision is processed.
    * @param {Phaser.Rectangle} [boundsRect=null] - If you want to restrict the drag of this sprite to a specific Rectangle, pass the Phaser.Rectangle here, otherwise it's free to drag anywhere.
    * @param {Phaser.Sprite} [boundsSprite=null] - If you want to restrict the drag of this sprite to within the bounding box of another sprite, pass it here.
    */
    enableDrag: function (lockCenter, bringToTop, pixelPerfect, alphaThreshold, boundsRect, boundsSprite) {

        if (lockCenter === undefined) { lockCenter = false; }
        if (bringToTop === undefined) { bringToTop = false; }
        if (pixelPerfect === undefined) { pixelPerfect = false; }
        if (alphaThreshold === undefined) { alphaThreshold = 255; }
        if (boundsRect === undefined) { boundsRect = null; }
        if (boundsSprite === undefined) { boundsSprite = null; }

        this._dragPoint = new Phaser.Point();
        this.draggable = true;
        this.bringToTop = bringToTop;
        this.dragOffset = new Phaser.Point();
        this.dragFromCenter = lockCenter;

        this.pixelPerfectClick = pixelPerfect;
        this.pixelPerfectAlpha = alphaThreshold;

        if (boundsRect)
        {
            this.boundsRect = boundsRect;
        }

        if (boundsSprite)
        {
            this.boundsSprite = boundsSprite;
        }

    },

    /**
    * Stops this sprite from being able to be dragged. If it is currently the target of an active drag it will be stopped immediately. Also disables any set callbacks.
    * @method Phaser.InputHandler#disableDrag
    */
    disableDrag: function () {

        if (this._pointerData)
        {
            for (var i = 0; i < 10; i++)
            {
                this._pointerData[i].isDragged = false;
            }
        }

        this.draggable = false;
        this.isDragged = false;
        this._draggedPointerID = -1;

    },

    /**
    * Called by Pointer when drag starts on this Sprite. Should not usually be called directly.
    * @method Phaser.InputHandler#startDrag
    * @param {Phaser.Pointer} pointer
    */
    startDrag: function (pointer) {

        var x = this.sprite.x;
        var y = this.sprite.y;

        this.isDragged = true;
        this._draggedPointerID = pointer.id;
        this._pointerData[pointer.id].isDragged = true;

        if (this.sprite.fixedToCamera)
        {
            if (this.dragFromCenter)
            {
                this.sprite.centerOn(pointer.x, pointer.y);
                this._dragPoint.setTo(this.sprite.cameraOffset.x - pointer.x, this.sprite.cameraOffset.y - pointer.y);
            }
            else
            {
                this._dragPoint.setTo(this.sprite.cameraOffset.x - pointer.x, this.sprite.cameraOffset.y - pointer.y);
            }
        }
        else
        {
            if (this.dragFromCenter)
            {
                var bounds = this.sprite.getBounds();

                this.sprite.x = this.globalToLocalX(pointer.x) + (this.sprite.x - bounds.centerX);
                this.sprite.y = this.globalToLocalY(pointer.y) + (this.sprite.y - bounds.centerY);
            }

            this._dragPoint.setTo(this.sprite.x - this.globalToLocalX(pointer.x), this.sprite.y - this.globalToLocalY(pointer.y));
        }

        this.updateDrag(pointer);

        if (this.bringToTop)
        {
            this._dragPhase = true;
            this.sprite.bringToTop();
        }

        this.dragStartPoint.set(x, y);
        this.sprite.events.onDragStart$dispatch(this.sprite, pointer, x, y);

    },

    /**
    * Warning: EXPERIMENTAL
    * @method Phaser.InputHandler#globalToLocalX
    * @param {number} x
    */
    globalToLocalX: function (x) {

        if (this.scaleLayer)
        {
            x -= this.game.scale.grid.boundsFluid.x;
            x *= this.game.scale.grid.scaleFluidInversed.x;
        }

        return x;

    },

    /**
    * Warning: EXPERIMENTAL
    * @method Phaser.InputHandler#globalToLocalY
    * @param {number} y
    */
    globalToLocalY: function (y) {

        if (this.scaleLayer)
        {
            y -= this.game.scale.grid.boundsFluid.y;
            y *= this.game.scale.grid.scaleFluidInversed.y;
        }

        return y;

    },

    /**
    * Called by Pointer when drag is stopped on this Sprite. Should not usually be called directly.
    * @method Phaser.InputHandler#stopDrag
    * @param {Phaser.Pointer} pointer
    */
    stopDrag: function (pointer) {

        this.isDragged = false;
        this._draggedPointerID = -1;
        this._pointerData[pointer.id].isDragged = false;
        this._dragPhase = false;

        if (this.snapOnRelease)
        {
            if (this.sprite.fixedToCamera)
            {
                this.sprite.cameraOffset.x = Math.round((this.sprite.cameraOffset.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.cameraOffset.y = Math.round((this.sprite.cameraOffset.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
            }
            else
            {
                this.sprite.x = Math.round((this.sprite.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.y = Math.round((this.sprite.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
            }
        }

        this.sprite.events.onDragStop$dispatch(this.sprite, pointer);

        if (this.checkPointerOver(pointer) === false)
        {
            this._pointerOutHandler(pointer);
        }

    },

    /**
    * Restricts this sprite to drag movement only on the given axis. Note: If both are set to false the sprite will never move!
    * @method Phaser.InputHandler#setDragLock
    * @param {boolean} [allowHorizontal=true] - To enable the sprite to be dragged horizontally set to true, otherwise false.
    * @param {boolean} [allowVertical=true] - To enable the sprite to be dragged vertically set to true, otherwise false.
    */
    setDragLock: function (allowHorizontal, allowVertical) {

        if (allowHorizontal === undefined) { allowHorizontal = true; }
        if (allowVertical === undefined) { allowVertical = true; }

        this.allowHorizontalDrag = allowHorizontal;
        this.allowVerticalDrag = allowVertical;

    },

    /**
    * Make this Sprite snap to the given grid either during drag or when it's released.
    * For example 16x16 as the snapX and snapY would make the sprite snap to every 16 pixels.
    * @method Phaser.InputHandler#enableSnap
    * @param {number} snapX - The width of the grid cell to snap to.
    * @param {number} snapY - The height of the grid cell to snap to.
    * @param {boolean} [onDrag=true] - If true the sprite will snap to the grid while being dragged.
    * @param {boolean} [onRelease=false] - If true the sprite will snap to the grid when released.
    * @param {number} [snapOffsetX=0] - Used to offset the top-left starting point of the snap grid.
    * @param {number} [snapOffsetY=0] - Used to offset the top-left starting point of the snap grid.
    */
    enableSnap: function (snapX, snapY, onDrag, onRelease, snapOffsetX, snapOffsetY) {

        if (onDrag === undefined) { onDrag = true; }
        if (onRelease === undefined) { onRelease = false; }
        if (snapOffsetX === undefined) { snapOffsetX = 0; }
        if (snapOffsetY === undefined) { snapOffsetY = 0; }

        this.snapX = snapX;
        this.snapY = snapY;
        this.snapOffsetX = snapOffsetX;
        this.snapOffsetY = snapOffsetY;
        this.snapOnDrag = onDrag;
        this.snapOnRelease = onRelease;

    },

    /**
    * Stops the sprite from snapping to a grid during drag or release.
    * @method Phaser.InputHandler#disableSnap
    */
    disableSnap: function () {

        this.snapOnDrag = false;
        this.snapOnRelease = false;

    },


    /**
    * Bounds Rect check for the sprite drag
    * @method Phaser.InputHandler#checkBoundsRect
    */
    checkBoundsRect: function () {

        if (this.sprite.fixedToCamera)
        {
            if (this.sprite.cameraOffset.x < this.boundsRect.left)
            {
                this.sprite.cameraOffset.x = this.boundsRect.left;
            }
            else if ((this.sprite.cameraOffset.x + this.sprite.width) > this.boundsRect.right)
            {
                this.sprite.cameraOffset.x = this.boundsRect.right - this.sprite.width;
            }

            if (this.sprite.cameraOffset.y < this.boundsRect.top)
            {
                this.sprite.cameraOffset.y = this.boundsRect.top;
            }
            else if ((this.sprite.cameraOffset.y + this.sprite.height) > this.boundsRect.bottom)
            {
                this.sprite.cameraOffset.y = this.boundsRect.bottom - this.sprite.height;
            }
        }
        else
        {
            if (this.sprite.left < this.boundsRect.left)
            {
                this.sprite.x = this.boundsRect.x + this.sprite.offsetX;
            }
            else if (this.sprite.right > this.boundsRect.right)
            {
                this.sprite.x = this.boundsRect.right - (this.sprite.width - this.sprite.offsetX);
            }

            if (this.sprite.top < this.boundsRect.top)
            {
                this.sprite.y = this.boundsRect.top + this.sprite.offsetY;
            }
            else if (this.sprite.bottom > this.boundsRect.bottom)
            {
                this.sprite.y = this.boundsRect.bottom - (this.sprite.height - this.sprite.offsetY);
            }
        }

    },

    /**
    * Parent Sprite Bounds check for the sprite drag.
    * @method Phaser.InputHandler#checkBoundsSprite
    */
    checkBoundsSprite: function () {

        if (this.sprite.fixedToCamera && this.boundsSprite.fixedToCamera)
        {
            if (this.sprite.cameraOffset.x < this.boundsSprite.cameraOffset.x)
            {
                this.sprite.cameraOffset.x = this.boundsSprite.cameraOffset.x;
            }
            else if ((this.sprite.cameraOffset.x + this.sprite.width) > (this.boundsSprite.cameraOffset.x + this.boundsSprite.width))
            {
                this.sprite.cameraOffset.x = (this.boundsSprite.cameraOffset.x + this.boundsSprite.width) - this.sprite.width;
            }

            if (this.sprite.cameraOffset.y < this.boundsSprite.cameraOffset.y)
            {
                this.sprite.cameraOffset.y = this.boundsSprite.cameraOffset.y;
            }
            else if ((this.sprite.cameraOffset.y + this.sprite.height) > (this.boundsSprite.cameraOffset.y + this.boundsSprite.height))
            {
                this.sprite.cameraOffset.y = (this.boundsSprite.cameraOffset.y + this.boundsSprite.height) - this.sprite.height;
            }
        }
        else
        {
            if (this.sprite.left < this.boundsSprite.left)
            {
                this.sprite.x = this.boundsSprite.left + this.sprite.offsetX;
            }
            else if (this.sprite.right > this.boundsSprite.right)
            {
                this.sprite.x = this.boundsSprite.right - (this.sprite.width - this.sprite.offsetX);
            }

            if (this.sprite.top < this.boundsSprite.top)
            {
                this.sprite.y = this.boundsSprite.top + this.sprite.offsetY;
            }
            else if (this.sprite.bottom > this.boundsSprite.bottom)
            {
                this.sprite.y = this.boundsSprite.bottom - (this.sprite.height - this.sprite.offsetY);
            }

            // if (this.sprite.x < this.boundsSprite.x)
            // {
            //     this.sprite.x = this.boundsSprite.x;
            // }
            // else if ((this.sprite.x + this.sprite.width) > (this.boundsSprite.x + this.boundsSprite.width))
            // {
            //     this.sprite.x = (this.boundsSprite.x + this.boundsSprite.width) - this.sprite.width;
            // }

            // if (this.sprite.y < this.boundsSprite.y)
            // {
            //     this.sprite.y = this.boundsSprite.y;
            // }
            // else if ((this.sprite.y + this.sprite.height) > (this.boundsSprite.y + this.boundsSprite.height))
            // {
            //     this.sprite.y = (this.boundsSprite.y + this.boundsSprite.height) - this.sprite.height;
            // }
        }

    }

};

Phaser.InputHandler.prototype.constructor = Phaser.InputHandler;
