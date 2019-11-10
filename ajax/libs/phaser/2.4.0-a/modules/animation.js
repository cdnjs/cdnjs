/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Animation Manager is used to add, play and update Phaser Animations.
* Any Game Object such as Phaser.Sprite that supports animation contains a single AnimationManager instance.
*
* @class Phaser.AnimationManager
* @constructor
* @param {Phaser.Sprite} sprite - A reference to the Game Object that owns this AnimationManager.
*/
Phaser.AnimationManager = function (sprite) {

    /**
    * @property {Phaser.Sprite} sprite - A reference to the parent Sprite that owns this AnimationManager.
    */
    this.sprite = sprite;

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = sprite.game;

    /**
    * The currently displayed Frame of animation, if any.
    * This property is only set once an Animation starts playing. Until that point it remains set as `null`.
    * 
    * @property {Phaser.Frame} currentFrame
    * @default
    */
    this.currentFrame = null;

    /**
    * @property {Phaser.Animation} currentAnim - The currently displayed animation, if any.
    * @default
    */
    this.currentAnim = null;

    /**
    * @property {boolean} updateIfVisible - Should the animation data continue to update even if the Sprite.visible is set to false.
    * @default
    */
    this.updateIfVisible = true;

    /**
    * @property {boolean} isLoaded - Set to true once animation data has been loaded.
    * @default
    */
    this.isLoaded = false;

    /**
    * @property {Phaser.FrameData} _frameData - A temp. var for holding the currently playing Animations FrameData.
    * @private
    * @default
    */
    this._frameData = null;

    /**
    * @property {object} _anims - An internal object that stores all of the Animation instances.
    * @private
    */
    this._anims = {};

    /**
    * @property {object} _outputFrames - An internal object to help avoid gc.
    * @private
    */
    this._outputFrames = [];

};

Phaser.AnimationManager.prototype = {

    /**
    * Loads FrameData into the internal temporary vars and resets the frame index to zero.
    * This is called automatically when a new Sprite is created.
    *
    * @method Phaser.AnimationManager#loadFrameData
    * @private
    * @param {Phaser.FrameData} frameData - The FrameData set to load.
    * @param {string|number} frame - The frame to default to.
    * @return {boolean} Returns `true` if the frame data was loaded successfully, otherwise `false`
    */
    loadFrameData: function (frameData, frame) {

        if (frameData === undefined)
        {
            return false;
        }

        if (this.isLoaded)
        {
            //   We need to update the frameData that the animations are using
            for (var anim in this._anims)
            {
                this._anims[anim].updateFrameData(frameData);
            }
        }

        this._frameData = frameData;

        if (frame === undefined || frame === null)
        {
            this.frame = 0;
        }
        else
        {
            if (typeof frame === 'string')
            {
                this.frameName = frame;
            }
            else
            {
                this.frame = frame;
            }
        }

        this.isLoaded = true;

        return true;
    },

    /**
    * Loads FrameData into the internal temporary vars and resets the frame index to zero.
    * This is called automatically when a new Sprite is created.
    *
    * @method Phaser.AnimationManager#copyFrameData
    * @private
    * @param {Phaser.FrameData} frameData - The FrameData set to load.
    * @param {string|number} frame - The frame to default to.
    * @return {boolean} Returns `true` if the frame data was loaded successfully, otherwise `false`
    */
    copyFrameData: function (frameData, frame) {

        this._frameData = frameData.clone();

        if (this.isLoaded)
        {
            //   We need to update the frameData that the animations are using
            for (var anim in this._anims)
            {
                this._anims[anim].updateFrameData(this._frameData);
            }
        }

        if (frame === undefined || frame === null)
        {
            this.frame = 0;
        }
        else
        {
            if (typeof frame === 'string')
            {
                this.frameName = frame;
            }
            else
            {
                this.frame = frame;
            }
        }

        this.isLoaded = true;

        return true;
    },

    /**
    * Adds a new animation under the given key. Optionally set the frames, frame rate and loop.
    * Animations added in this way are played back with the play function.
    *
    * @method Phaser.AnimationManager#add
    * @param {string} name - The unique (within this Sprite) name for the animation, i.e. "run", "fire", "walk".
    * @param {Array} [frames=null] - An array of numbers/strings that correspond to the frames to add to this animation and in which order. e.g. [1, 2, 3] or ['run0', 'run1', run2]). If null then all frames will be used.
    * @param {number} [frameRate=60] - The speed at which the animation should play. The speed is given in frames per second.
    * @param {boolean} [loop=false] - Whether or not the animation is looped or just plays once.
    * @param {boolean} [useNumericIndex=true] - Are the given frames using numeric indexes (default) or strings?
    * @return {Phaser.Animation} The Animation object that was created.
    */
    add: function (name, frames, frameRate, loop, useNumericIndex) {

        frames = frames || [];
        frameRate = frameRate || 60;

        if (loop === undefined) { loop = false; }

        //  If they didn't set the useNumericIndex then let's at least try and guess it
        if (useNumericIndex === undefined)
        {
            if (frames && typeof frames[0] === 'number')
            {
                useNumericIndex = true;
            }
            else
            {
                useNumericIndex = false;
            }
        }

        this._outputFrames = [];

        this._frameData.getFrameIndexes(frames, useNumericIndex, this._outputFrames);

        this._anims[name] = new Phaser.Animation(this.game, this.sprite, name, this._frameData, this._outputFrames, frameRate, loop);

        this.currentAnim = this._anims[name];

        //  This shouldn't be set until the Animation is played, surely?
        // this.currentFrame = this.currentAnim.currentFrame;

        if (this.sprite.tilingTexture)
        {
            this.sprite.refreshTexture = true;
        }

        return this._anims[name];

    },

    /**
    * Check whether the frames in the given array are valid and exist.
    *
    * @method Phaser.AnimationManager#validateFrames
    * @param {Array} frames - An array of frames to be validated.
    * @param {boolean} [useNumericIndex=true] - Validate the frames based on their numeric index (true) or string index (false)
    * @return {boolean} True if all given Frames are valid, otherwise false.
    */
    validateFrames: function (frames, useNumericIndex) {

        if (useNumericIndex === undefined) { useNumericIndex = true; }

        for (var i = 0; i < frames.length; i++)
        {
            if (useNumericIndex === true)
            {
                if (frames[i] > this._frameData.total)
                {
                    return false;
                }
            }
            else
            {
                if (this._frameData.checkFrameName(frames[i]) === false)
                {
                    return false;
                }
            }
        }

        return true;

    },

    /**
    * Play an animation based on the given key. The animation should previously have been added via `animations.add`
    * 
    * If the requested animation is already playing this request will be ignored. 
    * If you need to reset an already running animation do so directly on the Animation object itself.
    *
    * @method Phaser.AnimationManager#play
    * @param {string} name - The name of the animation to be played, e.g. "fire", "walk", "jump".
    * @param {number} [frameRate=null] - The framerate to play the animation at. The speed is given in frames per second. If not provided the previously set frameRate of the Animation is used.
    * @param {boolean} [loop=false] - Should the animation be looped after playback. If not provided the previously set loop value of the Animation is used.
    * @param {boolean} [killOnComplete=false] - If set to true when the animation completes (only happens if loop=false) the parent Sprite will be killed.
    * @return {Phaser.Animation} A reference to playing Animation instance.
    */
    play: function (name, frameRate, loop, killOnComplete) {

        if (this._anims[name])
        {
            if (this.currentAnim === this._anims[name])
            {
                if (this.currentAnim.isPlaying === false)
                {
                    this.currentAnim.paused = false;
                    return this.currentAnim.play(frameRate, loop, killOnComplete);
                }

                return this.currentAnim;
            }
            else
            {
                if (this.currentAnim && this.currentAnim.isPlaying)
                {
                    this.currentAnim.stop();
                }

                this.currentAnim = this._anims[name];
                this.currentAnim.paused = false;
                this.currentFrame = this.currentAnim.currentFrame;
                return this.currentAnim.play(frameRate, loop, killOnComplete);
            }
        }

    },

    /**
    * Stop playback of an animation. If a name is given that specific animation is stopped, otherwise the current animation is stopped.
    * The currentAnim property of the AnimationManager is automatically set to the animation given.
    *
    * @method Phaser.AnimationManager#stop
    * @param {string} [name=null] - The name of the animation to be stopped, e.g. "fire". If none is given the currently running animation is stopped.
    * @param {boolean} [resetFrame=false] - When the animation is stopped should the currentFrame be set to the first frame of the animation (true) or paused on the last frame displayed (false)
    */
    stop: function (name, resetFrame) {

        if (resetFrame === undefined) { resetFrame = false; }

        if (typeof name === 'string')
        {
            if (this._anims[name])
            {
                this.currentAnim = this._anims[name];
                this.currentAnim.stop(resetFrame);
            }
        }
        else
        {
            if (this.currentAnim)
            {
                this.currentAnim.stop(resetFrame);
            }
        }

    },

    /**
    * The main update function is called by the Sprites update loop. It's responsible for updating animation frames and firing related events.
    *
    * @method Phaser.AnimationManager#update
    * @protected
    * @return {boolean} True if a new animation frame has been set, otherwise false.
    */
    update: function () {

        if (this.updateIfVisible && !this.sprite.visible)
        {
            return false;
        }

        if (this.currentAnim && this.currentAnim.update())
        {
            this.currentFrame = this.currentAnim.currentFrame;
            return true;
        }

        return false;

    },

    /**
    * Advances by the given number of frames in the current animation, taking the loop value into consideration.
    *
    * @method Phaser.AnimationManager#next
    * @param {number} [quantity=1] - The number of frames to advance.
    */
    next: function (quantity) {

        if (this.currentAnim)
        {
            this.currentAnim.next(quantity);
            this.currentFrame = this.currentAnim.currentFrame;
        }

    },

    /**
    * Moves backwards the given number of frames in the current animation, taking the loop value into consideration.
    *
    * @method Phaser.AnimationManager#previous
    * @param {number} [quantity=1] - The number of frames to move back.
    */
    previous: function (quantity) {

        if (this.currentAnim)
        {
            this.currentAnim.previous(quantity);
            this.currentFrame = this.currentAnim.currentFrame;
        }

    },

    /**
    * Returns an animation that was previously added by name.
    *
    * @method Phaser.AnimationManager#getAnimation
    * @param {string} name - The name of the animation to be returned, e.g. "fire".
    * @return {Phaser.Animation} The Animation instance, if found, otherwise null.
    */
    getAnimation: function (name) {

        if (typeof name === 'string')
        {
            if (this._anims[name])
            {
                return this._anims[name];
            }
        }

        return null;

    },

    /**
    * Refreshes the current frame data back to the parent Sprite and also resets the texture data.
    *
    * @method Phaser.AnimationManager#refreshFrame
    */
    refreshFrame: function () {

        //  TODO
        this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);

    },

    /**
    * Destroys all references this AnimationManager contains.
    * Iterates through the list of animations stored in this manager and calls destroy on each of them.
    *
    * @method Phaser.AnimationManager#destroy
    */
    destroy: function () {

        var anim = null;

        for (var anim in this._anims)
        {
            if (this._anims.hasOwnProperty(anim))
            {
                this._anims[anim].destroy();
            }
        }

        this._anims = {};
        this._outputFrames = [];
        this._frameData = null;
        this.currentAnim = null;
        this.currentFrame = null;
        this.sprite = null;
        this.game = null;

    }

};

Phaser.AnimationManager.prototype.constructor = Phaser.AnimationManager;

/**
* @name Phaser.AnimationManager#frameData
* @property {Phaser.FrameData} frameData - The current animations FrameData.
* @readonly
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'frameData', {

    get: function () {
        return this._frameData;
    }

});

/**
* @name Phaser.AnimationManager#frameTotal
* @property {number} frameTotal - The total number of frames in the currently loaded FrameData, or -1 if no FrameData is loaded.
* @readonly
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'frameTotal', {

    get: function () {

        return this._frameData.total;
    }

});

/**
* @name Phaser.AnimationManager#paused
* @property {boolean} paused - Gets and sets the paused state of the current animation.
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'paused', {

    get: function () {

        return this.currentAnim.isPaused;

    },

    set: function (value) {

        this.currentAnim.paused = value;

    }

});

/**
* @name Phaser.AnimationManager#name
* @property {string} name - Gets the current animation name, if set.
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'name', {

    get: function () {

        if (this.currentAnim)
        {
            return this.currentAnim.name;
        }

    }

});

/**
* @name Phaser.AnimationManager#frame
* @property {number} frame - Gets or sets the current frame index and updates the Texture Cache for display.
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'frame', {

    get: function () {

        if (this.currentFrame)
        {
            return this.currentFrame.index;
        }

    },

    set: function (value) {

        if (typeof value === 'number' && this._frameData && this._frameData.getFrame(value) !== null)
        {
            this.currentFrame = this._frameData.getFrame(value);

            if (this.currentFrame)
            {
                this.sprite.setFrame(this.currentFrame);
            }
        }

    }

});

/**
* @name Phaser.AnimationManager#frameName
* @property {string} frameName - Gets or sets the current frame name and updates the Texture Cache for display.
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'frameName', {

    get: function () {

        if (this.currentFrame)
        {
            return this.currentFrame.name;
        }

    },

    set: function (value) {

        if (typeof value === 'string' && this._frameData && this._frameData.getFrameByName(value) !== null)
        {
            this.currentFrame = this._frameData.getFrameByName(value);

            if (this.currentFrame)
            {
                this._frameIndex = this.currentFrame.index;

                this.sprite.setFrame(this.currentFrame);
            }
        }
        else
        {
            console.warn('Cannot set frameName: ' + value);
        }
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* An Animation instance contains a single animation and the controls to play it.
* 
* It is created by the AnimationManager, consists of Animation.Frame objects and belongs to a single Game Object such as a Sprite.
*
* @class Phaser.Animation
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {Phaser.Sprite} parent - A reference to the owner of this Animation.
* @param {string} name - The unique name for this animation, used in playback commands.
* @param {Phaser.FrameData} frameData - The FrameData object that contains all frames used by this Animation.
* @param {number[]|string[]} frames - An array of numbers or strings indicating which frames to play in which order.
* @param {number} [frameRate=60] - The speed at which the animation should play. The speed is given in frames per second.
* @param {boolean} [loop=false] - Whether or not the animation is looped or just plays once.
* @param {boolean} loop - Should this animation loop when it reaches the end or play through once.
*/
Phaser.Animation = function (game, parent, name, frameData, frames, frameRate, loop) {

    if (loop === undefined) { loop = false; }

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property {Phaser.Sprite} _parent - A reference to the parent Sprite that owns this Animation.
    * @private
    */
    this._parent = parent;

    /**
    * @property {Phaser.FrameData} _frameData - The FrameData the Animation uses.
    * @private
    */
    this._frameData = frameData;

    /**
    * @property {string} name - The user defined name given to this Animation.
    */
    this.name = name;

    /**
    * @property {array} _frames
    * @private
    */
    this._frames = [];
    this._frames = this._frames.concat(frames);

    /**
    * @property {number} delay - The delay in ms between each frame of the Animation, based on the given frameRate.
    */
    this.delay = 1000 / frameRate;

    /**
    * @property {boolean} loop - The loop state of the Animation.
    */
    this.loop = loop;

    /**
    * @property {number} loopCount - The number of times the animation has looped since it was last started.
    */
    this.loopCount = 0;

    /**
    * @property {boolean} killOnComplete - Should the parent of this Animation be killed when the animation completes?
    * @default
    */
    this.killOnComplete = false;

    /**
    * @property {boolean} isFinished - The finished state of the Animation. Set to true once playback completes, false during playback.
    * @default
    */
    this.isFinished = false;

    /**
    * @property {boolean} isPlaying - The playing state of the Animation. Set to false once playback completes, true during playback.
    * @default
    */
    this.isPlaying = false;

    /**
    * @property {boolean} isPaused - The paused state of the Animation.
    * @default
    */
    this.isPaused = false;

    /**
    * @property {boolean} _pauseStartTime - The time the animation paused.
    * @private
    * @default
    */
    this._pauseStartTime = 0;

    /**
    * @property {number} _frameIndex
    * @private
    * @default
    */
    this._frameIndex = 0;

    /**
    * @property {number} _frameDiff
    * @private
    * @default
    */
    this._frameDiff = 0;

    /**
    * @property {number} _frameSkip
    * @private
    * @default
    */
    this._frameSkip = 1;

    /**
    * @property {Phaser.Frame} currentFrame - The currently displayed frame of the Animation.
    */
    this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);

    /**
    * @property {Phaser.Signal} onStart - This event is dispatched when this Animation starts playback.
    */
    this.onStart = new Phaser.Signal();

    /**
    * This event is dispatched when the Animation changes frame. 
    * By default this event is disabled due to its intensive nature. Enable it with: `Animation.enableUpdate = true`.
    * @property {Phaser.Signal|null} onUpdate
    * @default
    */
    this.onUpdate = null;

    /**
    * @property {Phaser.Signal} onComplete - This event is dispatched when this Animation completes playback. If the animation is set to loop this is never fired, listen for onAnimationLoop instead.
    */
    this.onComplete = new Phaser.Signal();

    /**
    * @property {Phaser.Signal} onLoop - This event is dispatched when this Animation loops.
    */
    this.onLoop = new Phaser.Signal();

    //  Set-up some event listeners
    this.game.onPause.add(this.onPause, this);
    this.game.onResume.add(this.onResume, this);

};

Phaser.Animation.prototype = {

    /**
    * Plays this animation.
    *
    * @method Phaser.Animation#play
    * @param {number} [frameRate=null] - The framerate to play the animation at. The speed is given in frames per second. If not provided the previously set frameRate of the Animation is used.
    * @param {boolean} [loop=false] - Should the animation be looped after playback. If not provided the previously set loop value of the Animation is used.
    * @param {boolean} [killOnComplete=false] - If set to true when the animation completes (only happens if loop=false) the parent Sprite will be killed.
    * @return {Phaser.Animation} - A reference to this Animation instance.
    */
    play: function (frameRate, loop, killOnComplete) {

        if (typeof frameRate === 'number')
        {
            //  If they set a new frame rate then use it, otherwise use the one set on creation
            this.delay = 1000 / frameRate;
        }

        if (typeof loop === 'boolean')
        {
            //  If they set a new loop value then use it, otherwise use the one set on creation
            this.loop = loop;
        }

        if (typeof killOnComplete !== 'undefined')
        {
            //  Remove the parent sprite once the animation has finished?
            this.killOnComplete = killOnComplete;
        }

        this.isPlaying = true;
        this.isFinished = false;
        this.paused = false;
        this.loopCount = 0;

        this._timeLastFrame = this.game.time.time;
        this._timeNextFrame = this.game.time.time + this.delay;

        this._frameIndex = 0;
        this.updateCurrentFrame(false, true);

        this._parent.events.onAnimationStart$dispatch(this._parent, this);

        this.onStart.dispatch(this._parent, this);

        this._parent.animations.currentAnim = this;
        this._parent.animations.currentFrame = this.currentFrame;

        return this;

    },

    /**
    * Sets this animation back to the first frame and restarts the animation.
    *
    * @method Phaser.Animation#restart
    */
    restart: function () {

        this.isPlaying = true;
        this.isFinished = false;
        this.paused = false;
        this.loopCount = 0;

        this._timeLastFrame = this.game.time.time;
        this._timeNextFrame = this.game.time.time + this.delay;

        this._frameIndex = 0;

        this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);

        this._parent.setFrame(this.currentFrame);

        this._parent.animations.currentAnim = this;
        this._parent.animations.currentFrame = this.currentFrame;

        this.onStart.dispatch(this._parent, this);

    },

    /**
    * Sets this animations playback to a given frame with the given ID.
    *
    * @method Phaser.Animation#setFrame
    * @param {string|number} [frameId] - The identifier of the frame to set. Can be the name of the frame, the sprite index of the frame, or the animation-local frame index.
    * @param {boolean} [useLocalFrameIndex=false] - If you provide a number for frameId, should it use the numeric indexes of the frameData, or the 0-indexed frame index local to the animation.
    */
    setFrame: function(frameId, useLocalFrameIndex) {

        var frameIndex;

        if (useLocalFrameIndex === undefined)
        {
            useLocalFrameIndex = false;
        }

        //  Find the index to the desired frame.
        if (typeof frameId === "string")
        {
            for (var i = 0; i < this._frames.length; i++)
            {
                if (this._frameData.getFrame(this._frames[i]).name === frameId)
                {
                    frameIndex = i;
                }
            }
        }
        else if (typeof frameId === "number")
        {
            if (useLocalFrameIndex)
            {
                frameIndex = frameId;
            }
            else
            {
                for (var i = 0; i < this._frames.length; i++)
                {
                    if (this._frames[i] === frameIndex)
                    {
                        frameIndex = i;
                    }
                }
            }
        }

        if (frameIndex)
        {
            //  Set the current frame index to the found index. Subtract 1 so that it animates to the desired frame on update.
            this._frameIndex = frameIndex - 1;

            //  Make the animation update at next update
            this._timeNextFrame = this.game.time.time;

            this.update();
        }

    },

    /**
    * Stops playback of this animation and set it to a finished state. If a resetFrame is provided it will stop playback and set frame to the first in the animation.
    * If `dispatchComplete` is true it will dispatch the complete events, otherwise they'll be ignored.
    *
    * @method Phaser.Animation#stop
    * @param {boolean} [resetFrame=false] - If true after the animation stops the currentFrame value will be set to the first frame in this animation.
    * @param {boolean} [dispatchComplete=false] - Dispatch the Animation.onComplete and parent.onAnimationComplete events?
    */
    stop: function (resetFrame, dispatchComplete) {

        if (resetFrame === undefined) { resetFrame = false; }
        if (dispatchComplete === undefined) { dispatchComplete = false; }

        this.isPlaying = false;
        this.isFinished = true;
        this.paused = false;

        if (resetFrame)
        {
            this.currentFrame = this._frameData.getFrame(this._frames[0]);
            this._parent.setFrame(this.currentFrame);
        }

        if (dispatchComplete)
        {
            this._parent.events.onAnimationComplete$dispatch(this._parent, this);
            this.onComplete.dispatch(this._parent, this);
        }

    },

    /**
    * Called when the Game enters a paused state.
    *
    * @method Phaser.Animation#onPause
    */
    onPause: function () {

        if (this.isPlaying)
        {
            this._frameDiff = this._timeNextFrame - this.game.time.time;
        }

    },

    /**
    * Called when the Game resumes from a paused state.
    *
    * @method Phaser.Animation#onResume
    */
    onResume: function () {

        if (this.isPlaying)
        {
            this._timeNextFrame = this.game.time.time + this._frameDiff;
        }

    },

    /**
    * Updates this animation. Called automatically by the AnimationManager.
    *
    * @method Phaser.Animation#update
    */
    update: function () {

        if (this.isPaused)
        {
            return false;
        }

        if (this.isPlaying && this.game.time.time >= this._timeNextFrame)
        {
            this._frameSkip = 1;

            //  Lagging?
            this._frameDiff = this.game.time.time - this._timeNextFrame;

            this._timeLastFrame = this.game.time.time;

            if (this._frameDiff > this.delay)
            {
                //  We need to skip a frame, work out how many
                this._frameSkip = Math.floor(this._frameDiff / this.delay);
                this._frameDiff -= (this._frameSkip * this.delay);
            }

            //  And what's left now?
            this._timeNextFrame = this.game.time.time + (this.delay - this._frameDiff);

            this._frameIndex += this._frameSkip;

            if (this._frameIndex >= this._frames.length)
            {
                if (this.loop)
                {
                    // Update current state before event callback
                    this._frameIndex %= this._frames.length;
                    this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);

                    //  Instead of calling updateCurrentFrame we do it here instead
                    if (this.currentFrame)
                    {
                        this._parent.setFrame(this.currentFrame);
                    }

                    this.loopCount++;
                    this._parent.events.onAnimationLoop$dispatch(this._parent, this);
                    this.onLoop.dispatch(this._parent, this);

                    if (this.onUpdate)
                    {
                        this.onUpdate.dispatch(this, this.currentFrame);

                        // False if the animation was destroyed from within a callback
                        return !!this._frameData;
                    }
                    else
                    {
                        return true;
                    }
                }
                else
                {
                    this.complete();
                    return false;
                }
            }
            else
            {
                return this.updateCurrentFrame(true);
            }
        }

        return false;

    },

    /**
    * Changes the currentFrame per the _frameIndex, updates the display state,
    * and triggers the update signal.
    *
    * Returns true if the current frame update was 'successful', false otherwise.
    *
    * @method Phaser.Animation#updateCurrentFrame
    * @private
    * @param {boolean} signalUpdate - If true the `Animation.onUpdate` signal will be dispatched.
    * @param {boolean} fromPlay - Was this call made from the playing of a new animation?
    * @return {boolean} True if the current frame was updated, otherwise false.
    */
    updateCurrentFrame: function (signalUpdate, fromPlay) {

        if (fromPlay === undefined) { fromPlay = false; }

        if (!this._frameData)
        {
            // The animation is already destroyed, probably from a callback
            return false;
        }
            
        //  Previous index
        var idx = this.currentFrame.index;

        this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);

        if (this.currentFrame && (fromPlay || (!fromPlay && idx !== this.currentFrame.index)))
        {
            this._parent.setFrame(this.currentFrame);
        }

        if (this.onUpdate && signalUpdate)
        {
            this.onUpdate.dispatch(this, this.currentFrame);

            // False if the animation was destroyed from within a callback
            return !!this._frameData;
        }
        else
        {
            return true;
        }

    },

    /**
    * Advances by the given number of frames in the Animation, taking the loop value into consideration.
    *
    * @method Phaser.Animation#next
    * @param {number} [quantity=1] - The number of frames to advance.
    */
    next: function (quantity) {

        if (quantity === undefined) { quantity = 1; }

        var frame = this._frameIndex + quantity;

        if (frame >= this._frames.length)
        {
            if (this.loop)
            {
                frame %= this._frames.length;
            }
            else
            {
                frame = this._frames.length - 1;
            }
        }

        if (frame !== this._frameIndex)
        {
            this._frameIndex = frame;
            this.updateCurrentFrame(true);
        }

    },

    /**
    * Moves backwards the given number of frames in the Animation, taking the loop value into consideration.
    *
    * @method Phaser.Animation#previous
    * @param {number} [quantity=1] - The number of frames to move back.
    */
    previous: function (quantity) {

        if (quantity === undefined) { quantity = 1; }

        var frame = this._frameIndex - quantity;

        if (frame < 0)
        {
            if (this.loop)
            {
                frame = this._frames.length + frame;
            }
            else
            {
                frame++;
            }
        }

        if (frame !== this._frameIndex)
        {
            this._frameIndex = frame;
            this.updateCurrentFrame(true);
        }

    },

    /**
    * Changes the FrameData object this Animation is using.
    *
    * @method Phaser.Animation#updateFrameData
    * @param {Phaser.FrameData} frameData - The FrameData object that contains all frames used by this Animation.
    */
    updateFrameData: function (frameData) {

        this._frameData = frameData;
        this.currentFrame = this._frameData ? this._frameData.getFrame(this._frames[this._frameIndex % this._frames.length]) : null;

    },

    /**
    * Cleans up this animation ready for deletion. Nulls all values and references.
    *
    * @method Phaser.Animation#destroy
    */
    destroy: function () {

        if (!this._frameData)
        {
            // Already destroyed
            return;
        }

        this.game.onPause.remove(this.onPause, this);
        this.game.onResume.remove(this.onResume, this);

        this.game = null;
        this._parent = null;
        this._frames = null;
        this._frameData = null;
        this.currentFrame = null;
        this.isPlaying = false;

        this.onStart.dispose();
        this.onLoop.dispose();
        this.onComplete.dispose();

        if (this.onUpdate)
        {
            this.onUpdate.dispose();
        }

    },

    /**
    * Called internally when the animation finishes playback.
    * Sets the isPlaying and isFinished states and dispatches the onAnimationComplete event if it exists on the parent and local onComplete event.
    *
    * @method Phaser.Animation#complete
    */
    complete: function () {

        this._frameIndex = this._frames.length - 1;
        this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);

        this.isPlaying = false;
        this.isFinished = true;
        this.paused = false;

        this._parent.events.onAnimationComplete$dispatch(this._parent, this);

        this.onComplete.dispatch(this._parent, this);

        if (this.killOnComplete)
        {
            this._parent.kill();
        }

    }

};

Phaser.Animation.prototype.constructor = Phaser.Animation;

/**
* @name Phaser.Animation#paused
* @property {boolean} paused - Gets and sets the paused state of this Animation.
*/
Object.defineProperty(Phaser.Animation.prototype, 'paused', {

    get: function () {

        return this.isPaused;

    },

    set: function (value) {

        this.isPaused = value;

        if (value)
        {
            //  Paused
            this._pauseStartTime = this.game.time.time;
        }
        else
        {
            //  Un-paused
            if (this.isPlaying)
            {
                this._timeNextFrame = this.game.time.time + this.delay;
            }
        }

    }

});

/**
* @name Phaser.Animation#frameTotal
* @property {number} frameTotal - The total number of frames in the currently loaded FrameData, or -1 if no FrameData is loaded.
* @readonly
*/
Object.defineProperty(Phaser.Animation.prototype, 'frameTotal', {

    get: function () {
        return this._frames.length;
    }

});

/**
* @name Phaser.Animation#frame
* @property {number} frame - Gets or sets the current frame index and updates the Texture Cache for display.
*/
Object.defineProperty(Phaser.Animation.prototype, 'frame', {

    get: function () {

        if (this.currentFrame !== null)
        {
            return this.currentFrame.index;
        }
        else
        {
            return this._frameIndex;
        }

    },

    set: function (value) {

        this.currentFrame = this._frameData.getFrame(this._frames[value]);

        if (this.currentFrame !== null)
        {
            this._frameIndex = value;
            this._parent.setFrame(this.currentFrame);

            if (this.onUpdate)
            {
                this.onUpdate.dispatch(this, this.currentFrame);
            }
        }

    }

});

/**
* @name Phaser.Animation#speed
* @property {number} speed - Gets or sets the current speed of the animation in frames per second. Changing this in a playing animation will take effect from the next frame. Minimum value is 1.
*/
Object.defineProperty(Phaser.Animation.prototype, 'speed', {

    get: function () {

        return Math.round(1000 / this.delay);

    },

    set: function (value) {

        if (value >= 1)
        {
            this.delay = 1000 / value;
        }

    }

});

/**
* @name Phaser.Animation#enableUpdate
* @property {boolean} enableUpdate - Gets or sets if this animation will dispatch the onUpdate events upon changing frame.
*/
Object.defineProperty(Phaser.Animation.prototype, 'enableUpdate', {

    get: function () {

        return (this.onUpdate !== null);

    },

    set: function (value) {

        if (value && this.onUpdate === null)
        {
            this.onUpdate = new Phaser.Signal();
        }
        else if (!value && this.onUpdate !== null)
        {
            this.onUpdate.dispose();
            this.onUpdate = null;
        }

    }

});

/**
* Really handy function for when you are creating arrays of animation data but it's using frame names and not numbers.
* For example imagine you've got 30 frames named: 'explosion_0001-large' to 'explosion_0030-large'
* You could use this function to generate those by doing: Phaser.Animation.generateFrameNames('explosion_', 1, 30, '-large', 4);
*
* @method Phaser.Animation.generateFrameNames
* @static
* @param {string} prefix - The start of the filename. If the filename was 'explosion_0001-large' the prefix would be 'explosion_'.
* @param {number} start - The number to start sequentially counting from. If your frames are named 'explosion_0001' to 'explosion_0034' the start is 1.
* @param {number} stop - The number to count to. If your frames are named 'explosion_0001' to 'explosion_0034' the stop value is 34.
* @param {string} [suffix=''] - The end of the filename. If the filename was 'explosion_0001-large' the prefix would be '-large'.
* @param {number} [zeroPad=0] - The number of zeroes to pad the min and max values with. If your frames are named 'explosion_0001' to 'explosion_0034' then the zeroPad is 4.
* @return {string[]} An array of framenames.
*/
Phaser.Animation.generateFrameNames = function (prefix, start, stop, suffix, zeroPad) {

    if (suffix === undefined) { suffix = ''; }

    var output = [];
    var frame = '';

    if (start < stop)
    {
        for (var i = start; i <= stop; i++)
        {
            if (typeof zeroPad === 'number')
            {
                //  str, len, pad, dir
                frame = Phaser.Utils.pad(i.toString(), zeroPad, '0', 1);
            }
            else
            {
                frame = i.toString();
            }

            frame = prefix + frame + suffix;

            output.push(frame);
        }
    }
    else
    {
        for (var i = start; i >= stop; i--)
        {
            if (typeof zeroPad === 'number')
            {
                //  str, len, pad, dir
                frame = Phaser.Utils.pad(i.toString(), zeroPad, '0', 1);
            }
            else
            {
                frame = i.toString();
            }

            frame = prefix + frame + suffix;

            output.push(frame);
        }
    }

    return output;

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Frame is a single frame of an animation and is part of a FrameData collection.
*
* @class Phaser.Frame
* @constructor
* @param {number} index - The index of this Frame within the FrameData set it is being added to.
* @param {number} x - X position of the frame within the texture image.
* @param {number} y - Y position of the frame within the texture image.
* @param {number} width - Width of the frame within the texture image.
* @param {number} height - Height of the frame within the texture image.
* @param {string} name - The name of the frame. In Texture Atlas data this is usually set to the filename.
*/
Phaser.Frame = function (index, x, y, width, height, name) {

    /**
    * @property {number} index - The index of this Frame within the FrameData set it is being added to.
    */
    this.index = index;

    /**
    * @property {number} x - X position within the image to cut from.
    */
    this.x = x;

    /**
    * @property {number} y - Y position within the image to cut from.
    */
    this.y = y;

    /**
    * @property {number} width - Width of the frame.
    */
    this.width = width;

    /**
    * @property {number} height - Height of the frame.
    */
    this.height = height;

    /**
    * @property {string} name - Useful for Texture Atlas files (is set to the filename value).
    */
    this.name = name;

    /**
    * @property {number} centerX - Center X position within the image to cut from.
    */
    this.centerX = Math.floor(width / 2);

    /**
    * @property {number} centerY - Center Y position within the image to cut from.
    */
    this.centerY = Math.floor(height / 2);

    /**
    * @property {number} distance - The distance from the top left to the bottom-right of this Frame.
    */
    this.distance = Phaser.Math.distance(0, 0, width, height);

    /**
    * @property {boolean} rotated - Rotated? (not yet implemented)
    * @default
    */
    this.rotated = false;

    /**
    * @property {string} rotationDirection - Either 'cw' or 'ccw', rotation is always 90 degrees.
    * @default 'cw'
    */
    this.rotationDirection = 'cw';

    /**
    * @property {boolean} trimmed - Was it trimmed when packed?
    * @default
    */
    this.trimmed = false;

    /**
    * @property {number} sourceSizeW - Width of the original sprite before it was trimmed.
    */
    this.sourceSizeW = width;

    /**
    * @property {number} sourceSizeH - Height of the original sprite before it was trimmed.
    */
    this.sourceSizeH = height;

    /**
    * @property {number} spriteSourceSizeX - X position of the trimmed sprite inside original sprite.
    * @default
    */
    this.spriteSourceSizeX = 0;

    /**
    * @property {number} spriteSourceSizeY - Y position of the trimmed sprite inside original sprite.
    * @default
    */
    this.spriteSourceSizeY = 0;

    /**
    * @property {number} spriteSourceSizeW - Width of the trimmed sprite.
    * @default
    */
    this.spriteSourceSizeW = 0;

    /**
    * @property {number} spriteSourceSizeH - Height of the trimmed sprite.
    * @default
    */
    this.spriteSourceSizeH = 0;

    /**
    * @property {number} right - The right of the Frame (x + width).
    */
    this.right = this.x + this.width;

    /**
    * @property {number} bottom - The bottom of the frame (y + height).
    */
    this.bottom = this.y + this.height;

};

Phaser.Frame.prototype = {

    /**
    * Adjusts of all the Frame properties based on the given width and height values.
    *
    * @method Phaser.Frame#resize
    * @param {integer} width - The new width of the Frame.
    * @param {integer} height - The new height of the Frame.
    */
    resize: function (width, height) {

        this.width = width;
        this.height = height;
        this.centerX = Math.floor(width / 2);
        this.centerY = Math.floor(height / 2);
        this.distance = Phaser.Math.distance(0, 0, width, height);
        this.sourceSizeW = width;
        this.sourceSizeH = height;
        this.right = this.x + width;
        this.bottom = this.y + height;

    },

    /**
    * If the frame was trimmed when added to the Texture Atlas this records the trim and source data.
    *
    * @method Phaser.Frame#setTrim
    * @param {boolean} trimmed - If this frame was trimmed or not.
    * @param {number} actualWidth - The width of the frame before being trimmed.
    * @param {number} actualHeight - The height of the frame before being trimmed.
    * @param {number} destX - The destination X position of the trimmed frame for display.
    * @param {number} destY - The destination Y position of the trimmed frame for display.
    * @param {number} destWidth - The destination width of the trimmed frame for display.
    * @param {number} destHeight - The destination height of the trimmed frame for display.
    */
    setTrim: function (trimmed, actualWidth, actualHeight, destX, destY, destWidth, destHeight) {

        this.trimmed = trimmed;

        if (trimmed)
        {
            this.sourceSizeW = actualWidth;
            this.sourceSizeH = actualHeight;
            this.centerX = Math.floor(actualWidth / 2);
            this.centerY = Math.floor(actualHeight / 2);
            this.spriteSourceSizeX = destX;
            this.spriteSourceSizeY = destY;
            this.spriteSourceSizeW = destWidth;
            this.spriteSourceSizeH = destHeight;
        }

    },

    /**
     * Clones this Frame into a new Phaser.Frame object and returns it.
     * Note that all properties are cloned, including the name, index and UUID.
     *
     * @method Phaser.Frame#clone
     * @return {Phaser.Frame} An exact copy of this Frame object.
     */
    clone: function () {

        var output = new Phaser.Frame(this.index, this.x, this.y, this.width, this.height, this.name);

        for (var prop in this)
        {
            if (this.hasOwnProperty(prop))
            {
                output[prop] = this[prop];
            }
        }

        return output;

    },

    /**
    * Returns a Rectangle set to the dimensions of this Frame.
    *
    * @method Phaser.Frame#getRect
    * @param {Phaser.Rectangle} [out] - A rectangle to copy the frame dimensions to.
    * @return {Phaser.Rectangle} A rectangle.
    */
    getRect: function (out) {

        if (out === undefined)
        {
            out = new Phaser.Rectangle(this.x, this.y, this.width, this.height);
        }
        else
        {
            out.setTo(this.x, this.y, this.width, this.height);
        }

        return out;

    }

};

Phaser.Frame.prototype.constructor = Phaser.Frame;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* FrameData is a container for Frame objects, which are the internal representation of animation data in Phaser.
*
* @class Phaser.FrameData
* @constructor
*/
Phaser.FrameData = function () {

    /**
    * @property {Array} _frames - Local array of frames.
    * @private
    */
    this._frames = [];

    /**
    * @property {Array} _frameNames - Local array of frame names for name to index conversions.
    * @private
    */
    this._frameNames = [];

};

Phaser.FrameData.prototype = {

    /**
    * Adds a new Frame to this FrameData collection. Typically called by the Animation.Parser and not directly.
    *
    * @method Phaser.FrameData#addFrame
    * @param {Phaser.Frame} frame - The frame to add to this FrameData set.
    * @return {Phaser.Frame} The frame that was just added.
    */
    addFrame: function (frame) {

        frame.index = this._frames.length;

        this._frames.push(frame);

        if (frame.name !== '')
        {
            this._frameNames[frame.name] = frame.index;
        }

        return frame;

    },

    /**
    * Get a Frame by its numerical index.
    *
    * @method Phaser.FrameData#getFrame
    * @param {number} index - The index of the frame you want to get.
    * @return {Phaser.Frame} The frame, if found.
    */
    getFrame: function (index) {

        if (index >= this._frames.length)
        {
            index = 0;
        }

        return this._frames[index];

    },

    /**
    * Get a Frame by its frame name.
    *
    * @method Phaser.FrameData#getFrameByName
    * @param {string} name - The name of the frame you want to get.
    * @return {Phaser.Frame} The frame, if found.
    */
    getFrameByName: function (name) {

        if (typeof this._frameNames[name] === 'number')
        {
            return this._frames[this._frameNames[name]];
        }

        return null;

    },

    /**
    * Check if there is a Frame with the given name.
    *
    * @method Phaser.FrameData#checkFrameName
    * @param {string} name - The name of the frame you want to check.
    * @return {boolean} True if the frame is found, otherwise false.
    */
    checkFrameName: function (name) {

        if (this._frameNames[name] == null)
        {
            return false;
        }

        return true;

    },

    /**
     * Makes a copy of this FrameData including copies (not references) to all of the Frames it contains.
     *
     * @method Phaser.FrameData#clone
     * @return {Phaser.FrameData} A clone of this object, including clones of the Frame objects it contains.
     */
    clone: function () {

        var output = new Phaser.FrameData();

        //  No input array, so we loop through all frames
        for (var i = 0; i < this._frames.length; i++)
        {
            output._frames.push(this._frames[i].clone());
        }

        for (var p in this._frameNames)
        {
            if (this._frameNames.hasOwnProperty(p))
            {
                output._frameNames.push(this._frameNames[p]);
            }
        }

        return output;

    },

    /**
    * Returns a range of frames based on the given start and end frame indexes and returns them in an Array.
    *
    * @method Phaser.FrameData#getFrameRange
    * @param {number} start - The starting frame index.
    * @param {number} end - The ending frame index.
    * @param {Array} [output] - If given the results will be appended to the end of this array otherwise a new array will be created.
    * @return {Array} An array of Frames between the start and end index values, or an empty array if none were found.
    */
    getFrameRange: function (start, end, output) {

        if (output === undefined) { output = []; }

        for (var i = start; i <= end; i++)
        {
            output.push(this._frames[i]);
        }

        return output;

    },

    /**
    * Returns all of the Frames in this FrameData set where the frame index is found in the input array.
    * The frames are returned in the output array, or if none is provided in a new Array object.
    *
    * @method Phaser.FrameData#getFrames
    * @param {Array} [frames] - An Array containing the indexes of the frames to retrieve. If the array is empty or undefined then all frames in the FrameData are returned.
    * @param {boolean} [useNumericIndex=true] - Are the given frames using numeric indexes (default) or strings? (false)
    * @param {Array} [output] - If given the results will be appended to the end of this array otherwise a new array will be created.
    * @return {Array} An array of all Frames in this FrameData set matching the given names or IDs.
    */
    getFrames: function (frames, useNumericIndex, output) {

        if (useNumericIndex === undefined) { useNumericIndex = true; }
        if (output === undefined) { output = []; }

        if (frames === undefined || frames.length === 0)
        {
            //  No input array, so we loop through all frames
            for (var i = 0; i < this._frames.length; i++)
            {
                //  We only need the indexes
                output.push(this._frames[i]);
            }
        }
        else
        {
            //  Input array given, loop through that instead
            for (var i = 0; i < frames.length; i++)
            {
                //  Does the input array contain names or indexes?
                if (useNumericIndex)
                {
                    //  The actual frame
                    output.push(this.getFrame(frames[i]));
                }
                else
                {
                    //  The actual frame
                    output.push(this.getFrameByName(frames[i]));
                }
            }
        }

        return output;

    },

    /**
    * Returns all of the Frame indexes in this FrameData set.
    * The frames indexes are returned in the output array, or if none is provided in a new Array object.
    *
    * @method Phaser.FrameData#getFrameIndexes
    * @param {Array} [frames] - An Array containing the indexes of the frames to retrieve. If undefined or the array is empty then all frames in the FrameData are returned.
    * @param {boolean} [useNumericIndex=true] - Are the given frames using numeric indexes (default) or strings? (false)
    * @param {Array} [output] - If given the results will be appended to the end of this array otherwise a new array will be created.
    * @return {Array} An array of all Frame indexes matching the given names or IDs.
    */
    getFrameIndexes: function (frames, useNumericIndex, output) {

        if (useNumericIndex === undefined) { useNumericIndex = true; }
        if (output === undefined) { output = []; }

        if (frames === undefined || frames.length === 0)
        {
            //  No frames array, so we loop through all frames
            for (var i = 0; i < this._frames.length; i++)
            {
                output.push(this._frames[i].index);
            }
        }
        else
        {
            //  Input array given, loop through that instead
            for (var i = 0; i < frames.length; i++)
            {
                //  Does the frames array contain names or indexes?
                if (useNumericIndex)
                {
                    output.push(this._frames[frames[i]].index);
                }
                else
                {
                    if (this.getFrameByName(frames[i]))
                    {
                        output.push(this.getFrameByName(frames[i]).index);
                    }
                }
            }
        }

        return output;

    }

};

Phaser.FrameData.prototype.constructor = Phaser.FrameData;

/**
* @name Phaser.FrameData#total
* @property {number} total - The total number of frames in this FrameData set.
* @readonly
*/
Object.defineProperty(Phaser.FrameData.prototype, "total", {

    get: function () {
        return this._frames.length;
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Responsible for parsing sprite sheet and JSON data into the internal FrameData format that Phaser uses for animations.
*
* @class Phaser.AnimationParser
* @static
*/
Phaser.AnimationParser = {

    /**
    * Parse a Sprite Sheet and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.spriteSheet
    * @param {Phaser.Game} game - A reference to the currently running game.
    * @param {string|Image} key - The Game.Cache asset key of the Sprite Sheet image or an actual HTML Image element.
    * @param {number} frameWidth - The fixed width of each frame of the animation.
    * @param {number} frameHeight - The fixed height of each frame of the animation.
    * @param {number} [frameMax=-1] - The total number of animation frames to extract from the Sprite Sheet. The default value of -1 means "extract all frames".
    * @param {number} [margin=0] - If the frames have been drawn with a margin, specify the amount here.
    * @param {number} [spacing=0] - If the frames have been drawn with spacing between them, specify the amount here.
    * @return {Phaser.FrameData} A FrameData object containing the parsed frames.
    */
    spriteSheet: function (game, key, frameWidth, frameHeight, frameMax, margin, spacing) {

        var img = key;

        if (typeof key === 'string')
        {
            img = game.cache.getImage(key);
        }

        if (img === null)
        {
            return null;
        }

        var width = img.width;
        var height = img.height;

        if (frameWidth <= 0)
        {
            frameWidth = Math.floor(-width / Math.min(-1, frameWidth));
        }

        if (frameHeight <= 0)
        {
            frameHeight = Math.floor(-height / Math.min(-1, frameHeight));
        }

        var row = Math.floor((width - margin) / (frameWidth + spacing));
        var column = Math.floor((height - margin) / (frameHeight + spacing));
        var total = row * column;

        if (frameMax !== -1)
        {
            total = frameMax;
        }

        //  Zero or smaller than frame sizes?
        if (width === 0 || height === 0 || width < frameWidth || height < frameHeight || total === 0)
        {
            console.warn("Phaser.AnimationParser.spriteSheet: '" + key + "'s width/height zero or width/height < given frameWidth/frameHeight");
            return null;
        }

        //  Let's create some frames then
        var data = new Phaser.FrameData();
        var x = margin;
        var y = margin;

        for (var i = 0; i < total; i++)
        {
            data.addFrame(new Phaser.Frame(i, x, y, frameWidth, frameHeight, ''));

            x += frameWidth + spacing;

            if (x + frameWidth > width)
            {
                x = margin;
                y += frameHeight + spacing;
            }
        }

        return data;

    },

    /**
    * Parse the JSON data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.JSONData
    * @param {Phaser.Game} game - A reference to the currently running game.
    * @param {object} json - The JSON data from the Texture Atlas. Must be in Array format.
    * @return {Phaser.FrameData} A FrameData object containing the parsed frames.
    */
    JSONData: function (game, json) {

        //  Malformed?
        if (!json['frames'])
        {
            console.warn("Phaser.AnimationParser.JSONData: Invalid Texture Atlas JSON given, missing 'frames' array");
            console.log(json);
            return;
        }

        //  Let's create some frames then
        var data = new Phaser.FrameData();

        //  By this stage frames is a fully parsed array
        var frames = json['frames'];
        var newFrame;

        for (var i = 0; i < frames.length; i++)
        {
            newFrame = data.addFrame(new Phaser.Frame(
                i,
                frames[i].frame.x,
                frames[i].frame.y,
                frames[i].frame.w,
                frames[i].frame.h,
                frames[i].filename
            ));

            if (frames[i].trimmed)
            {
                newFrame.setTrim(
                    frames[i].trimmed,
                    frames[i].sourceSize.w,
                    frames[i].sourceSize.h,
                    frames[i].spriteSourceSize.x,
                    frames[i].spriteSourceSize.y,
                    frames[i].spriteSourceSize.w,
                    frames[i].spriteSourceSize.h
                );
            }
        }

        return data;

    },

    /**
    * Parse the JSON data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.JSONDataHash
    * @param {Phaser.Game} game - A reference to the currently running game.
    * @param {object} json - The JSON data from the Texture Atlas. Must be in JSON Hash format.
    * @return {Phaser.FrameData} A FrameData object containing the parsed frames.
    */
    JSONDataHash: function (game, json) {

        //  Malformed?
        if (!json['frames'])
        {
            console.warn("Phaser.AnimationParser.JSONDataHash: Invalid Texture Atlas JSON given, missing 'frames' object");
            console.log(json);
            return;
        }

        //  Let's create some frames then
        var data = new Phaser.FrameData();

        //  By this stage frames is a fully parsed array
        var frames = json['frames'];
        var newFrame;
        var i = 0;

        for (var key in frames)
        {
            newFrame = data.addFrame(new Phaser.Frame(
                i,
                frames[key].frame.x,
                frames[key].frame.y,
                frames[key].frame.w,
                frames[key].frame.h,
                key
            ));

            if (frames[key].trimmed)
            {
                newFrame.setTrim(
                    frames[key].trimmed,
                    frames[key].sourceSize.w,
                    frames[key].sourceSize.h,
                    frames[key].spriteSourceSize.x,
                    frames[key].spriteSourceSize.y,
                    frames[key].spriteSourceSize.w,
                    frames[key].spriteSourceSize.h
                );
            }

            i++;
        }

        return data;

    },

    /**
    * Parse the XML data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.XMLData
    * @param {Phaser.Game} game - A reference to the currently running game.
    * @param {object} xml - The XML data from the Texture Atlas. Must be in Starling XML format.
    * @return {Phaser.FrameData} A FrameData object containing the parsed frames.
    */
    XMLData: function (game, xml) {

        //  Malformed?
        if (!xml.getElementsByTagName('TextureAtlas'))
        {
            console.warn("Phaser.AnimationParser.XMLData: Invalid Texture Atlas XML given, missing <TextureAtlas> tag");
            return;
        }

        //  Let's create some frames then
        var data = new Phaser.FrameData();
        var frames = xml.getElementsByTagName('SubTexture');
        var newFrame;

        var name;
        var frame;
        var x;
        var y;
        var width;
        var height;
        var frameX;
        var frameY;
        var frameWidth;
        var frameHeight;

        for (var i = 0; i < frames.length; i++)
        {
            frame = frames[i].attributes;
            
            name = frame.name.value;
            x = parseInt(frame.x.value, 10);
            y = parseInt(frame.y.value, 10);
            width = parseInt(frame.width.value, 10);
            height = parseInt(frame.height.value, 10);

            frameX = null;
            frameY = null;

            if (frame.frameX)
            {
                frameX = Math.abs(parseInt(frame.frameX.value, 10));
                frameY = Math.abs(parseInt(frame.frameY.value, 10));
                frameWidth = parseInt(frame.frameWidth.value, 10);
                frameHeight = parseInt(frame.frameHeight.value, 10);
            }

            newFrame = data.addFrame(new Phaser.Frame(i, x, y, width, height, name));

            //  Trimmed?
            if (frameX !== null || frameY !== null)
            {
                newFrame.setTrim(true, width, height, frameX, frameY, frameWidth, frameHeight);
            }
        }

        return data;

    }

};
