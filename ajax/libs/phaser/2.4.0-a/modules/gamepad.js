/**
* @author       @karlmacklin <tacklemcclean@gmail.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Gamepad class handles gamepad input and dispatches gamepad events.
*
* Remember to call `gamepad.start()`.
*
* HTML5 GAMEPAD API SUPPORT IS AT AN EXPERIMENTAL STAGE!
* At moment of writing this (end of 2013) only Chrome supports parts of it out of the box. Firefox supports it
* via prefs flags (about:config, search gamepad). The browsers map the same controllers differently.
* This class has constants for Windows 7 Chrome mapping of XBOX 360 controller.
*
* @class Phaser.Gamepad
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
*/
Phaser.Gamepad = function (game) {

    /**
    * @property {Phaser.Game} game - Local reference to game.
    */
    this.game = game;

    /**
    * @property {object} _gamepadIndexMap - Maps the browsers gamepad indices to our Phaser Gamepads
    * @private
    */
    this._gamepadIndexMap = {};

    /**
    * @property {Array} _rawPads - The raw state of the gamepads from the browser
    * @private
    */
    this._rawPads = [];

    /**
    * @property {boolean} _active - Private flag for whether or not the API is polled
    * @private
    * @default
    */
    this._active = false;

    /**
    * Gamepad input will only be processed if enabled.
    * @property {boolean} enabled
    * @default
    */
    this.enabled = true;

    /**
    * Whether or not gamepads are supported in the current browser. Note that as of Dec. 2013 this check is actually not accurate at all due to poor implementation.
    * @property {boolean} _gamepadSupportAvailable - Are gamepads supported in this browser or not?
    * @private
    */
    this._gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || (navigator.userAgent.indexOf('Firefox/') != -1) || !!navigator.getGamepads;

    /**
    * Used to check for differences between earlier polls and current state of gamepads.
    * @property {Array} _prevRawGamepadTypes
    * @private
    * @default
    */
    this._prevRawGamepadTypes = [];

    /**
    * Used to check for differences between earlier polls and current state of gamepads.
    * @property {Array} _prevTimestamps
    * @private
    * @default
    */
    this._prevTimestamps = [];

    /**
    * @property {object} callbackContext - The context under which the callbacks are run.
    */
    this.callbackContext = this;

    /**
    * @property {function} onConnectCallback - This callback is invoked every time any gamepad is connected
    */
    this.onConnectCallback = null;

    /**
    * @property {function} onDisconnectCallback - This callback is invoked every time any gamepad is disconnected
    */
    this.onDisconnectCallback = null;

    /**
    * @property {function} onDownCallback - This callback is invoked every time any gamepad button is pressed down.
    */
    this.onDownCallback = null;

    /**
    * @property {function} onUpCallback - This callback is invoked every time any gamepad button is released.
    */
    this.onUpCallback = null;

    /**
    * @property {function} onAxisCallback - This callback is invoked every time any gamepad axis is changed.
    */
    this.onAxisCallback = null;

    /**
    * @property {function} onFloatCallback - This callback is invoked every time any gamepad button is changed to a value where value > 0 and value < 1.
    */
    this.onFloatCallback = null;

    /**
    * @property {function} _ongamepadconnected - Private callback for Firefox gamepad connection handling
    * @private
    */
    this._ongamepadconnected = null;

    /**
    * @property {function} _gamepaddisconnected - Private callback for Firefox gamepad connection handling
    * @private
    */
    this._gamepaddisconnected = null;

    /**
    * @property {Array<Phaser.SinglePad>} _gamepads - The four Phaser Gamepads.
    * @private
    */
    this._gamepads = [
        new Phaser.SinglePad(game, this),
        new Phaser.SinglePad(game, this),
        new Phaser.SinglePad(game, this),
        new Phaser.SinglePad(game, this)
    ];

};

Phaser.Gamepad.prototype = {

    /**
    * Add callbacks to the main Gamepad handler to handle connect/disconnect/button down/button up/axis change/float value buttons.
    * 
    * @method Phaser.Gamepad#addCallbacks
    * @param {object} context - The context under which the callbacks are run.
    * @param {object} callbacks - Object that takes six different callback methods:
    * onConnectCallback, onDisconnectCallback, onDownCallback, onUpCallback, onAxisCallback, onFloatCallback
    */
    addCallbacks: function (context, callbacks) {

        if (typeof callbacks !== 'undefined')
        {
            this.onConnectCallback = (typeof callbacks.onConnect === 'function') ? callbacks.onConnect : this.onConnectCallback;
            this.onDisconnectCallback = (typeof callbacks.onDisconnect === 'function') ? callbacks.onDisconnect : this.onDisconnectCallback;
            this.onDownCallback = (typeof callbacks.onDown === 'function') ? callbacks.onDown : this.onDownCallback;
            this.onUpCallback = (typeof callbacks.onUp === 'function') ? callbacks.onUp : this.onUpCallback;
            this.onAxisCallback = (typeof callbacks.onAxis === 'function') ? callbacks.onAxis : this.onAxisCallback;
            this.onFloatCallback = (typeof callbacks.onFloat === 'function') ? callbacks.onFloat : this.onFloatCallback;
            this.callbackContext = context;
        }

    },

    /**
    * Starts the Gamepad event handling.
    * This MUST be called manually before Phaser will start polling the Gamepad API.
    *
    * @method Phaser.Gamepad#start
    */
    start: function () {

        if (this._active)
        {
            //  Avoid setting multiple listeners
            return;
        }

        this._active = true;

        var _this = this;

        this._onGamepadConnected = function (event) {
            return _this.onGamepadConnected(event);
        };

        this._onGamepadDisconnected = function (event) {
            return _this.onGamepadDisconnected(event);
        };

        window.addEventListener('gamepadconnected', this._onGamepadConnected, false);
        window.addEventListener('gamepaddisconnected', this._onGamepadDisconnected, false);

    },

    /**
     * Handles the connection of a Gamepad.
     *
     * @method onGamepadConnected
     * @private
     * @param {object} event - The DOM event.
     */
    onGamepadConnected: function (event) {

        var newPad = event.gamepad;
        this._rawPads.push(newPad);
        this._gamepads[newPad.index].connect(newPad);

    },

    /**
     * Handles the disconnection of a Gamepad.
     *
     * @method onGamepadDisconnected
     * @private
     * @param {object} event - The DOM event.
     */
    onGamepadDisconnected: function (event) {

        var removedPad = event.gamepad;

        for (var i in this._rawPads)
        {
            if (this._rawPads[i].index === removedPad.index)
            {
                this._rawPads.splice(i,1);
            }
        }

        this._gamepads[removedPad.index].disconnect();

    },

    /**
    * Main gamepad update loop. Should not be called manually.
    * @method Phaser.Gamepad#update
    * @protected
    */
    update: function () {

        this._pollGamepads();

        this.pad1.pollStatus();
        this.pad2.pollStatus();
        this.pad3.pollStatus();
        this.pad4.pollStatus();

    },

    /**
    * Updating connected gamepads (for Google Chrome). Should not be called manually.
    * 
    * @method Phaser.Gamepad#_pollGamepads
    * @private
    */
    _pollGamepads: function () {

        if (navigator['getGamepads'])
        {
            var rawGamepads = navigator.getGamepads();
        }
        else if (navigator['webkitGetGamepads'])
        {
            var rawGamepads = navigator.webkitGetGamepads();
        }
        else if (navigator['webkitGamepads'])
        {
            var rawGamepads = navigator.webkitGamepads();
        }

        if (rawGamepads)
        {
            this._rawPads = [];

            var gamepadsChanged = false;

            for (var i = 0; i < rawGamepads.length; i++)
            {
                if (typeof rawGamepads[i] !== this._prevRawGamepadTypes[i])
                {
                    gamepadsChanged = true;
                    this._prevRawGamepadTypes[i] = typeof rawGamepads[i];
                }

                if (rawGamepads[i])
                {
                    this._rawPads.push(rawGamepads[i]);
                }

                // Support max 4 pads at the moment
                if (i === 3)
                {
                    break;
                }
            }

            if (gamepadsChanged)
            {
                var validConnections = { rawIndices: {}, padIndices: {} };
                var singlePad;

                for (var j = 0; j < this._gamepads.length; j++)
                {
                    singlePad = this._gamepads[j];

                    if (singlePad.connected)
                    {
                        for (var k = 0; k < this._rawPads.length; k++)
                        {
                            if (this._rawPads[k].index === singlePad.index)
                            {
                                validConnections.rawIndices[singlePad.index] = true;
                                validConnections.padIndices[j] = true;
                            }
                        }
                    }
                }

                for (var l = 0; l < this._gamepads.length; l++)
                {
                    singlePad = this._gamepads[l];

                    if (validConnections.padIndices[l])
                    {
                        continue;
                    }

                    if (this._rawPads.length < 1)
                    {
                        singlePad.disconnect();
                    }

                    for (var m = 0; m < this._rawPads.length; m++)
                    {
                        if (validConnections.padIndices[l])
                        {
                            break;
                        }

                        var rawPad = this._rawPads[m];

                        if (rawPad)
                        {
                            if (validConnections.rawIndices[rawPad.index])
                            {
                                singlePad.disconnect();
                                continue;
                            }
                            else
                            {
                                singlePad.connect(rawPad);
                                validConnections.rawIndices[rawPad.index] = true;
                                validConnections.padIndices[l] = true;
                            }
                        }
                        else
                        {
                            singlePad.disconnect();
                        }
                    }
                }
            }
        }
    },

    /**
    * Sets the deadZone variable for all four gamepads
    * @method Phaser.Gamepad#setDeadZones
    */
    setDeadZones: function (value) {

        for (var i = 0; i < this._gamepads.length; i++)
        {
            this._gamepads[i].deadZone = value;
        }

    },

    /**
    * Stops the Gamepad event handling.
    *
    * @method Phaser.Gamepad#stop
    */
    stop: function () {

        this._active = false;

        window.removeEventListener('gamepadconnected', this._onGamepadConnected);
        window.removeEventListener('gamepaddisconnected', this._onGamepadDisconnected);

    },

    /**
    * Reset all buttons/axes of all gamepads
    * @method Phaser.Gamepad#reset
    */
    reset: function () {

        this.update();

        for (var i = 0; i < this._gamepads.length; i++)
        {
            this._gamepads[i].reset();
        }

    },

    /**
    * Returns the "just pressed" state of a button from ANY gamepad connected. Just pressed is considered true if the button was pressed down within the duration given (default 250ms).
    * @method Phaser.Gamepad#justPressed
    * @param {number} buttonCode - The buttonCode of the button to check for.
    * @param {number} [duration=250] - The duration below which the button is considered as being just pressed.
    * @return {boolean} True if the button is just pressed otherwise false.
    */
    justPressed: function (buttonCode, duration) {

        for (var i = 0; i < this._gamepads.length; i++)
        {
            if (this._gamepads[i].justPressed(buttonCode, duration) === true)
            {
                return true;
            }
        }

        return false;

    },

    /**
    * Returns the "just released" state of a button from ANY gamepad connected. Just released is considered as being true if the button was released within the duration given (default 250ms).
    * @method Phaser.Gamepad#justPressed
    * @param {number} buttonCode - The buttonCode of the button to check for.
    * @param {number} [duration=250] - The duration below which the button is considered as being just released.
    * @return {boolean} True if the button is just released otherwise false.
    */
    justReleased: function (buttonCode, duration) {

        for (var i = 0; i < this._gamepads.length; i++)
        {
            if (this._gamepads[i].justReleased(buttonCode, duration) === true)
            {
                return true;
            }
        }

        return false;

    },

    /**
    * Returns true if the button is currently pressed down, on ANY gamepad.
    * @method Phaser.Gamepad#isDown
    * @param {number} buttonCode - The buttonCode of the button to check for.
    * @return {boolean} True if a button is currently down.
    */
    isDown: function (buttonCode) {

        for (var i = 0; i < this._gamepads.length; i++)
        {
            if (this._gamepads[i].isDown(buttonCode) === true)
            {
                return true;
            }
        }

        return false;
    },

    /**
     * Destroys this object and the associated event listeners.
     *
     * @method Phaser.Gamepad#destroy
     */
    destroy: function () {

        this.stop();

        for (var i = 0; i < this._gamepads.length; i++)
        {
            this._gamepads[i].destroy();
        }

    }

};

Phaser.Gamepad.prototype.constructor = Phaser.Gamepad;

/**
* If the gamepad input is active or not - if not active it should not be updated from Input.js
* @name Phaser.Gamepad#active
* @property {boolean} active - If the gamepad input is active or not.
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "active", {

    get: function () {
        return this._active;
    }

});

/**
* Whether or not gamepads are supported in current browser.
* @name Phaser.Gamepad#supported
* @property {boolean} supported - Whether or not gamepads are supported in current browser.
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "supported", {

    get: function () {
        return this._gamepadSupportAvailable;
    }

});

/**
* How many live gamepads are currently connected.
* @name Phaser.Gamepad#padsConnected
* @property {number} padsConnected - How many live gamepads are currently connected.
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "padsConnected", {

    get: function () {
        return this._rawPads.length;
    }

});

/**
* Gamepad #1
* @name Phaser.Gamepad#pad1
* @property {Phaser.SinglePad} pad1 - Gamepad #1;
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "pad1", {

    get: function () {
        return this._gamepads[0];
    }

});

/**
* Gamepad #2
* @name Phaser.Gamepad#pad2
* @property {Phaser.SinglePad} pad2 - Gamepad #2
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "pad2", {

    get: function () {
        return this._gamepads[1];
    }

});

/**
* Gamepad #3
* @name Phaser.Gamepad#pad3
* @property {Phaser.SinglePad} pad3 - Gamepad #3
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "pad3", {

    get: function () {
        return this._gamepads[2];
    }

});

/**
* Gamepad #4
* @name Phaser.Gamepad#pad4
* @property {Phaser.SinglePad} pad4 - Gamepad #4
* @readonly
*/
Object.defineProperty(Phaser.Gamepad.prototype, "pad4", {

    get: function () {
        return this._gamepads[3];
    }

});

Phaser.Gamepad.BUTTON_0 = 0;
Phaser.Gamepad.BUTTON_1 = 1;
Phaser.Gamepad.BUTTON_2 = 2;
Phaser.Gamepad.BUTTON_3 = 3;
Phaser.Gamepad.BUTTON_4 = 4;
Phaser.Gamepad.BUTTON_5 = 5;
Phaser.Gamepad.BUTTON_6 = 6;
Phaser.Gamepad.BUTTON_7 = 7;
Phaser.Gamepad.BUTTON_8 = 8;
Phaser.Gamepad.BUTTON_9 = 9;
Phaser.Gamepad.BUTTON_10 = 10;
Phaser.Gamepad.BUTTON_11 = 11;
Phaser.Gamepad.BUTTON_12 = 12;
Phaser.Gamepad.BUTTON_13 = 13;
Phaser.Gamepad.BUTTON_14 = 14;
Phaser.Gamepad.BUTTON_15 = 15;

Phaser.Gamepad.AXIS_0 = 0;
Phaser.Gamepad.AXIS_1 = 1;
Phaser.Gamepad.AXIS_2 = 2;
Phaser.Gamepad.AXIS_3 = 3;
Phaser.Gamepad.AXIS_4 = 4;
Phaser.Gamepad.AXIS_5 = 5;
Phaser.Gamepad.AXIS_6 = 6;
Phaser.Gamepad.AXIS_7 = 7;
Phaser.Gamepad.AXIS_8 = 8;
Phaser.Gamepad.AXIS_9 = 9;

// Below mapping applies to XBOX 360 Wired and Wireless controller on Google Chrome (tested on Windows 7).
// - Firefox uses different map! Separate amount of buttons and axes. DPAD = axis and not a button.
// In other words - discrepancies when using gamepads.

Phaser.Gamepad.XBOX360_A = 0;
Phaser.Gamepad.XBOX360_B = 1;
Phaser.Gamepad.XBOX360_X = 2;
Phaser.Gamepad.XBOX360_Y = 3;
Phaser.Gamepad.XBOX360_LEFT_BUMPER = 4;
Phaser.Gamepad.XBOX360_RIGHT_BUMPER = 5;
Phaser.Gamepad.XBOX360_LEFT_TRIGGER = 6;
Phaser.Gamepad.XBOX360_RIGHT_TRIGGER = 7;
Phaser.Gamepad.XBOX360_BACK = 8;
Phaser.Gamepad.XBOX360_START = 9;
Phaser.Gamepad.XBOX360_STICK_LEFT_BUTTON = 10;
Phaser.Gamepad.XBOX360_STICK_RIGHT_BUTTON = 11;

Phaser.Gamepad.XBOX360_DPAD_LEFT = 14;
Phaser.Gamepad.XBOX360_DPAD_RIGHT = 15;
Phaser.Gamepad.XBOX360_DPAD_UP = 12;
Phaser.Gamepad.XBOX360_DPAD_DOWN = 13;

//  On FF 0 = Y, 1 = X, 2 = Y, 3 = X, 4 = left bumper, 5 = dpad left, 6 = dpad right
Phaser.Gamepad.XBOX360_STICK_LEFT_X = 0;
Phaser.Gamepad.XBOX360_STICK_LEFT_Y = 1;
Phaser.Gamepad.XBOX360_STICK_RIGHT_X = 2;
Phaser.Gamepad.XBOX360_STICK_RIGHT_Y = 3;

//  PlayStation 3 controller (masquerading as xbox360 controller) button mappings

Phaser.Gamepad.PS3XC_X = 0;
Phaser.Gamepad.PS3XC_CIRCLE = 1;
Phaser.Gamepad.PS3XC_SQUARE = 2;
Phaser.Gamepad.PS3XC_TRIANGLE = 3;
Phaser.Gamepad.PS3XC_L1 = 4;
Phaser.Gamepad.PS3XC_R1 = 5;
Phaser.Gamepad.PS3XC_L2 = 6; // analog trigger, range 0..1
Phaser.Gamepad.PS3XC_R2 = 7; // analog trigger, range 0..1
Phaser.Gamepad.PS3XC_SELECT = 8;
Phaser.Gamepad.PS3XC_START = 9;
Phaser.Gamepad.PS3XC_STICK_LEFT_BUTTON = 10;
Phaser.Gamepad.PS3XC_STICK_RIGHT_BUTTON = 11;
Phaser.Gamepad.PS3XC_DPAD_UP = 12;
Phaser.Gamepad.PS3XC_DPAD_DOWN = 13;
Phaser.Gamepad.PS3XC_DPAD_LEFT = 14;
Phaser.Gamepad.PS3XC_DPAD_RIGHT = 15;
Phaser.Gamepad.PS3XC_STICK_LEFT_X = 0; // analog stick, range -1..1
Phaser.Gamepad.PS3XC_STICK_LEFT_Y = 1; // analog stick, range -1..1
Phaser.Gamepad.PS3XC_STICK_RIGHT_X = 2; // analog stick, range -1..1
Phaser.Gamepad.PS3XC_STICK_RIGHT_Y = 3; // analog stick, range -1..1

/**
* @author       @karlmacklin <tacklemcclean@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A single Phaser Gamepad
* 
* @class Phaser.SinglePad
* @constructor
* @param {Phaser.Game} game - Current game instance.
* @param {object} padParent - The parent Phaser.Gamepad object (all gamepads reside under this)
*/
Phaser.SinglePad = function (game, padParent) {

    /**
    * @property {Phaser.Game} game - Local reference to game.
    */
    this.game = game;

    /**
    * @property {number} index - The gamepad index as per browsers data
    * @readonly
    */
    this.index = null;

    /**
    * @property {boolean} connected - Whether or not this particular gamepad is connected or not.
    * @readonly
    */
    this.connected = false;

    /**
    * @property {object} callbackContext - The context under which the callbacks are run.
    */
    this.callbackContext = this;

    /**
    * @property {function} onConnectCallback - This callback is invoked every time this gamepad is connected
    */
    this.onConnectCallback = null;

    /**
    * @property {function} onDisconnectCallback - This callback is invoked every time this gamepad is disconnected
    */
    this.onDisconnectCallback = null;

    /**
    * @property {function} onDownCallback - This callback is invoked every time a button is pressed down.
    */
    this.onDownCallback = null;

    /**
    * @property {function} onUpCallback - This callback is invoked every time a gamepad button is released.
    */
    this.onUpCallback = null;

    /**
    * @property {function} onAxisCallback - This callback is invoked every time an axis is changed.
    */
    this.onAxisCallback = null;

    /**
    * @property {function} onFloatCallback - This callback is invoked every time a button is changed to a value where value > 0 and value < 1.
    */
    this.onFloatCallback = null;

    /**
    * @property {number} deadZone - Dead zone for axis feedback - within this value you won't trigger updates.
    */
    this.deadZone = 0.26;

    /**
    * @property {Phaser.Gamepad} padParent - Main Phaser Gamepad object
    * @private
    */
    this._padParent = padParent;

    /**
    * @property {object} _rawPad - The 'raw' gamepad data.
    * @private
    */
    this._rawPad = null;

    /**
    * @property {number} _prevTimestamp - Used to check for differences between earlier polls and current state of gamepads.
    * @private
    */
    this._prevTimestamp = null;

    /**
    * @property {Array} _buttons - Array of Phaser.DeviceButton objects. This array is populated when the gamepad is connected.
    * @private
    */
    this._buttons = [];

    /**
    * @property {number} _buttonsLen - Length of the _buttons array.
    * @private
    */
    this._buttonsLen = 0;

    /**
    * @property {Array} _axes - Current axes state.
    * @private
    */
    this._axes = [];

    /**
    * @property {number} _axesLen - Length of the _axes array.
    * @private
    */
    this._axesLen = 0;

};

Phaser.SinglePad.prototype = {

    /**
    * Add callbacks to this Gamepad to handle connect / disconnect / button down / button up / axis change / float value buttons.
    * 
    * @method Phaser.SinglePad#addCallbacks
    * @param {object} context - The context under which the callbacks are run.
    * @param {object} callbacks - Object that takes six different callbak methods:
    * onConnectCallback, onDisconnectCallback, onDownCallback, onUpCallback, onAxisCallback, onFloatCallback
    */
    addCallbacks: function (context, callbacks) {

        if (typeof callbacks !== 'undefined')
        {
            this.onConnectCallback = (typeof callbacks.onConnect === 'function') ? callbacks.onConnect : this.onConnectCallback;
            this.onDisconnectCallback = (typeof callbacks.onDisconnect === 'function') ? callbacks.onDisconnect : this.onDisconnectCallback;
            this.onDownCallback = (typeof callbacks.onDown === 'function') ? callbacks.onDown : this.onDownCallback;
            this.onUpCallback = (typeof callbacks.onUp === 'function') ? callbacks.onUp : this.onUpCallback;
            this.onAxisCallback = (typeof callbacks.onAxis === 'function') ? callbacks.onAxis : this.onAxisCallback;
            this.onFloatCallback = (typeof callbacks.onFloat === 'function') ? callbacks.onFloat : this.onFloatCallback;
        }

    },

    /**
    * Gets a DeviceButton object from this controller to be stored and referenced locally.
    * The DeviceButton object can then be polled, have events attached to it, etc.
    *
    * @method Phaser.SinglePad#getButton
    * @param {number} buttonCode - The buttonCode of the button, i.e. Phaser.Gamepad.BUTTON_0, Phaser.Gamepad.XBOX360_A, etc.
    * @return {Phaser.DeviceButton} The DeviceButton object which you can store locally and reference directly.
    */
    getButton: function (buttonCode) {

        if (this._buttons[buttonCode])
        {
            return this._buttons[buttonCode];
        }
        else
        {
            return null;
        }

    },

    /**
    * Main update function called by Phaser.Gamepad.
    * 
    * @method Phaser.SinglePad#pollStatus
    */
    pollStatus: function () {

        if (!this.connected || !this.game.input.enabled || !this.game.input.gamepad.enabled || (this._rawPad.timestamp && (this._rawPad.timestamp === this._prevTimestamp)))
        {
            return;
        }

        for (var i = 0; i < this._buttonsLen; i++)
        {
            var rawButtonVal = isNaN(this._rawPad.buttons[i]) ? this._rawPad.buttons[i].value : this._rawPad.buttons[i];

            if (rawButtonVal !== this._buttons[i].value)
            {
                if (rawButtonVal === 1)
                {
                    this.processButtonDown(i, rawButtonVal);
                }
                else if (rawButtonVal === 0)
                {
                    this.processButtonUp(i, rawButtonVal);
                }
                else
                {
                    this.processButtonFloat(i, rawButtonVal);
                }
            }
        }
        
        for (var index = 0; index < this._axesLen; index++)
        {
            var value = this._rawPad.axes[index];

            if ((value > 0 && value > this.deadZone) || (value < 0 && value < -this.deadZone))
            {
                this.processAxisChange(index, value);
            }
            else
            {
                this.processAxisChange(index, 0);
            }
        }

        this._prevTimestamp = this._rawPad.timestamp;

    },

    /**
    * Gamepad connect function, should be called by Phaser.Gamepad.
    * 
    * @method Phaser.SinglePad#connect
    * @param {object} rawPad - The raw gamepad object
    */
    connect: function (rawPad) {

        var triggerCallback = !this.connected;

        this.connected = true;
        this.index = rawPad.index;

        this._rawPad = rawPad;

        this._buttons = [];
        this._buttonsLen = rawPad.buttons.length;

        this._axes = [];
        this._axesLen = rawPad.axes.length;

        for (var a = 0; a < this._axesLen; a++)
        {
            this._axes[a] = rawPad.axes[a];
        }

        for (var buttonCode in rawPad.buttons)
        {
            buttonCode = parseInt(buttonCode, 10);
            this._buttons[buttonCode] = new Phaser.DeviceButton(this, buttonCode);
        }

        if (triggerCallback && this._padParent.onConnectCallback)
        {
            this._padParent.onConnectCallback.call(this._padParent.callbackContext, this.index);
        }

        if (triggerCallback && this.onConnectCallback)
        {
            this.onConnectCallback.call(this.callbackContext);
        }

    },

    /**
    * Gamepad disconnect function, should be called by Phaser.Gamepad.
    * 
    * @method Phaser.SinglePad#disconnect
    */
    disconnect: function () {

        var triggerCallback = this.connected;
        var disconnectingIndex = this.index;

        this.connected = false;
        this.index = null;

        this._rawPad = undefined;

        for (var i = 0; i < this._buttonsLen; i++)
        {
            this._buttons[i].destroy();
        }

        this._buttons = [];
        this._buttonsLen = 0;

        this._axes = [];
        this._axesLen = 0;

        if (triggerCallback && this._padParent.onDisconnectCallback)
        {
            this._padParent.onDisconnectCallback.call(this._padParent.callbackContext, disconnectingIndex);
        }

        if (triggerCallback && this.onDisconnectCallback)
        {
            this.onDisconnectCallback.call(this.callbackContext);
        }

    },

    /**
     * Destroys this object and associated callback references.
     *
     * @method Phaser.SinglePad#destroy
     */
    destroy: function () {

        this._rawPad = undefined;

        for (var i = 0; i < this._buttonsLen; i++)
        {
            this._buttons[i].destroy();
        }

        this._buttons = [];
        this._buttonsLen = 0;

        this._axes = [];
        this._axesLen = 0;

        this.onConnectCallback = null;
        this.onDisconnectCallback = null;
        this.onDownCallback = null;
        this.onUpCallback = null;
        this.onAxisCallback = null;
        this.onFloatCallback = null;

    },

    /**
    * Handles changes in axis.
    * 
    * @method Phaser.SinglePad#processAxisChange
    * @param {object} axisState - State of the relevant axis
    */
    processAxisChange: function (index, value) {

        if (this._axes[index] === value)
        {
            return;
        }

        this._axes[index] = value;

        if (this._padParent.onAxisCallback)
        {
            this._padParent.onAxisCallback.call(this._padParent.callbackContext, this, index, value);
        }

        if (this.onAxisCallback)
        {
            this.onAxisCallback.call(this.callbackContext, this, index, value);
        }

    },

    /**
    * Handles button down press.
    * 
    * @method Phaser.SinglePad#processButtonDown
    * @param {number} buttonCode - Which buttonCode of this button
    * @param {object} value - Button value
    */
    processButtonDown: function (buttonCode, value) {

        if (this._padParent.onDownCallback)
        {
            this._padParent.onDownCallback.call(this._padParent.callbackContext, buttonCode, value, this.index);
        }

        if (this.onDownCallback)
        {
            this.onDownCallback.call(this.callbackContext, buttonCode, value);
        }

        if (this._buttons[buttonCode])
        {
            this._buttons[buttonCode].start(null, value);
        }

    },

    /**
    * Handles button release.
    * 
    * @method Phaser.SinglePad#processButtonUp
    * @param {number} buttonCode - Which buttonCode of this button
    * @param {object} value - Button value
    */
    processButtonUp: function (buttonCode, value) {

        if (this._padParent.onUpCallback)
        {
            this._padParent.onUpCallback.call(this._padParent.callbackContext, buttonCode, value, this.index);
        }

        if (this.onUpCallback)
        {
            this.onUpCallback.call(this.callbackContext, buttonCode, value);
        }

        if (this._buttons[buttonCode])
        {
            this._buttons[buttonCode].stop(null, value);
        }

    },

    /**
    * Handles buttons with floating values (like analog buttons that acts almost like an axis but still registers like a button)
    * 
    * @method Phaser.SinglePad#processButtonFloat
    * @param {number} buttonCode - Which buttonCode of this button
    * @param {object} value - Button value (will range somewhere between 0 and 1, but not specifically 0 or 1.
    */
    processButtonFloat: function (buttonCode, value) {

        if (this._padParent.onFloatCallback)
        {
            this._padParent.onFloatCallback.call(this._padParent.callbackContext, buttonCode, value, this.index);
        }

        if (this.onFloatCallback)
        {
            this.onFloatCallback.call(this.callbackContext, buttonCode, value);
        }

        if (this._buttons[buttonCode])
        {
            this._buttons[buttonCode].padFloat(value);
        }

    },

    /**
    * Returns value of requested axis.
    * 
    * @method Phaser.SinglePad#axis
    * @param {number} axisCode - The index of the axis to check
    * @return {number} Axis value if available otherwise false
    */
    axis: function (axisCode) {

        if (this._axes[axisCode])
        {
            return this._axes[axisCode];
        }

        return false;

    },

    /**
    * Returns true if the button is pressed down.
    * 
    * @method Phaser.SinglePad#isDown
    * @param {number} buttonCode - The buttonCode of the button to check.
    * @return {boolean} True if the button is pressed down.
    */
    isDown: function (buttonCode) {

        if (this._buttons[buttonCode])
        {
            return this._buttons[buttonCode].isDown;
        }

        return false;

    },

    /**
    * Returns true if the button is not currently pressed.
    * 
    * @method Phaser.SinglePad#isUp
    * @param {number} buttonCode - The buttonCode of the button to check.
    * @return {boolean} True if the button is not currently pressed down.
    */
    isUp: function (buttonCode) {

        if (this._buttons[buttonCode])
        {
            return this._buttons[buttonCode].isUp;
        }

        return false;

    },

    /**
    * Returns the "just released" state of a button from this gamepad. Just released is considered as being true if the button was released within the duration given (default 250ms).
    * 
    * @method Phaser.SinglePad#justReleased
    * @param {number} buttonCode - The buttonCode of the button to check for.
    * @param {number} [duration=250] - The duration below which the button is considered as being just released.
    * @return {boolean} True if the button is just released otherwise false.
    */
    justReleased: function (buttonCode, duration) {

        if (this._buttons[buttonCode])
        {
            return this._buttons[buttonCode].justReleased(duration);
        }

    },

    /**
    * Returns the "just pressed" state of a button from this gamepad. Just pressed is considered true if the button was pressed down within the duration given (default 250ms).
    * 
    * @method Phaser.SinglePad#justPressed
    * @param {number} buttonCode - The buttonCode of the button to check for.
    * @param {number} [duration=250] - The duration below which the button is considered as being just pressed.
    * @return {boolean} True if the button is just pressed otherwise false.
    */
    justPressed: function (buttonCode, duration) {

        if (this._buttons[buttonCode])
        {
            return this._buttons[buttonCode].justPressed(duration);
        }

    },

    /**
    * Returns the value of a gamepad button. Intended mainly for cases when you have floating button values, for example
    * analog trigger buttons on the XBOX 360 controller.
    * 
    * @method Phaser.SinglePad#buttonValue
    * @param {number} buttonCode - The buttonCode of the button to check.
    * @return {number} Button value if available otherwise null. Be careful as this can incorrectly evaluate to 0.
    */
    buttonValue: function (buttonCode) {

        if (this._buttons[buttonCode])
        {
            return this._buttons[buttonCode].value;
        }

        return null;

    },

    /**
    * Reset all buttons/axes of this gamepad.
    * 
    * @method Phaser.SinglePad#reset
    */
    reset: function () {

        for (var j = 0; j < this._axes.length; j++)
        {
            this._axes[j] = 0;
        }

    }

};

Phaser.SinglePad.prototype.constructor = Phaser.SinglePad;
