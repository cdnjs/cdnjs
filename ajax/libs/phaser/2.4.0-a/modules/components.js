/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

Phaser.Component = function () {};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Angle Component provides access to an `angle` property; the rotation of a Game Object in degrees.
*
* @class
*/
Phaser.Component.Angle = function () {};

Phaser.Component.Angle.prototype = {

    /**
    * The angle property is the rotation of the Game Object in *degrees* from its original orientation.
    * 
    * Values from 0 to 180 represent clockwise rotation; values from 0 to -180 represent counterclockwise rotation.
    * 
    * Values outside this range are added to or subtracted from 360 to obtain a value within the range. 
    * For example, the statement player.angle = 450 is the same as player.angle = 90.
    * 
    * If you wish to work in radians instead of degrees you can use the property `rotation` instead. 
    * Working in radians is slightly faster as it doesn't have to perform any calculations.
    *
    * @property {number} angle
    */
    angle: {

        get: function() {

            return Phaser.Math.wrapAngle(Phaser.Math.radToDeg(this.rotation));

        },

        set: function(value) {

            this.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(value));

        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Animation Component provides a `play` method, which is a proxy to the `AnimationManager.play` method.
*
* @class
*/
Phaser.Component.Animation = function () {};

Phaser.Component.Animation.prototype = {

    /**
    * Plays an Animation.
    * 
    * The animation should have previously been created via `animations.add`.
    * 
    * If the animation is already playing calling this again won't do anything.
    * If you need to reset an already running animation do so directly on the Animation object itself or via `AnimationManager.stop`.
    *
    * @method
    * @param {string} name - The name of the animation to be played, e.g. "fire", "walk", "jump". Must have been previously created via 'AnimationManager.add'.
    * @param {number} [frameRate=null] - The framerate to play the animation at. The speed is given in frames per second. If not provided the previously set frameRate of the Animation is used.
    * @param {boolean} [loop=false] - Should the animation be looped after playback. If not provided the previously set loop value of the Animation is used.
    * @param {boolean} [killOnComplete=false] - If set to true when the animation completes (only happens if loop=false) the parent Sprite will be killed.
    * @return {Phaser.Animation} A reference to playing Animation.
    */
    play: function (name, frameRate, loop, killOnComplete) {

        if (this.animations)
        {
            return this.animations.play(name, frameRate, loop, killOnComplete);
        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The AutoCull Component is responsible for providing methods that check if a Game Object is within the bounds of the World Camera.
* It is used by the InWorld component.
*
* @class
*/
Phaser.Component.AutoCull = function () {};

Phaser.Component.AutoCull.prototype = {

    /**
    * A Game Object with `autoCull` set to true will check its bounds against the World Camera every frame.
    * If it is not intersecting the Camera bounds at any point then it has its `renderable` property set to `false`.
    * This keeps the Game Object alive and still processing updates, but forces it to skip the render step entirely.
    * 
    * This is a relatively expensive operation, especially if enabled on hundreds of Game Objects. So enable it only if you know it's required,
    * or you have tested performance and find it acceptable.
    *
    * @property {boolean} autoCull
    * @default
    */
    autoCull: false,

    /**
    * Checks if the Game Objects bounds intersect with the Game Camera bounds.
    * Returns `true` if they do, otherwise `false` if fully outside of the Cameras bounds.
    *
    * @property {boolean} inCamera
    * @readonly
    */
    inCamera: {

        get: function() {

            if (!this.autoCull && !this.checkWorldBounds)
            {
                this._bounds.copyFrom(this.getBounds());
                this._bounds.x += this.game.camera.view.x;
                this._bounds.y += this.game.camera.view.y;
            }

            return this.game.world.camera.view.intersects(this._bounds);

        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Bounds component contains properties related to the bounds of the Game Object.
*
* @class
*/
Phaser.Component.Bounds = function () {};

Phaser.Component.Bounds.prototype = {

    /**
    * The amount the Game Object is visually offset from its x coordinate.
    * This is the same as `width * anchor.x`.
    * It will only be > 0 if anchor.x is not equal to zero.
    *
    * @property {number} offsetX
    * @readOnly
    */
    offsetX: {

        get: function () {

            return this.anchor.x * this.width;

        }

    },

    /**
    * The amount the Game Object is visually offset from its y coordinate.
    * This is the same as `height * anchor.y`.
    * It will only be > 0 if anchor.y is not equal to zero.
    *
    * @property {number} offsetY
    * @readOnly
    */
    offsetY: {

        get: function () {

            return this.anchor.y * this.height;

        }

    },

    /**
    * The left coordinate of the Game Object.
    * This is the same as `x - offsetX`.
    *
    * @property {number} left
    * @readOnly
    */
    left: {

        get: function () {

            return this.x - this.offsetX;

        }

    },

    /**
    * The right coordinate of the Game Object.
    * This is the same as `x + width - offsetX`.
    *
    * @property {number} right
    * @readOnly
    */
    right: {

        get: function () {

            return (this.x + this.width) - this.offsetX;

        }

    },

    /**
    * The y coordinate of the Game Object.
    * This is the same as `y - offsetY`.
    *
    * @property {number} top
    * @readOnly
    */
    top: {

        get: function () {

            return this.y - this.offsetY;

        }

    },

    /**
    * The sum of the y and height properties.
    * This is the same as `y + height - offsetY`.
    *
    * @property {number} bottom
    * @readOnly
    */
    bottom: {

        get: function () {

            return (this.y + this.height) - this.offsetY;

        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The BringToTop Component features quick access to Group sorting related methods.
*
* @class
*/
Phaser.Component.BringToTop = function () {};

/**
* Brings this Game Object to the top of its parents display list.
* Visually this means it will render over the top of any old child in the same Group.
* 
* If this Game Object hasn't been added to a custom Group then this method will bring it to the top of the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return {PIXI.DisplayObject} This instance.
*/
Phaser.Component.BringToTop.prototype.bringToTop = function() {

    if (this.parent)
    {
        this.parent.bringToTop(this);
    }

    return this;

};

/**
* Sends this Game Object to the bottom of its parents display list.
* Visually this means it will render below all other children in the same Group.
* 
* If this Game Object hasn't been added to a custom Group then this method will send it to the bottom of the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return {PIXI.DisplayObject} This instance.
*/
Phaser.Component.BringToTop.prototype.sendToBack = function() {

    if (this.parent)
    {
        this.parent.sendToBack(this);
    }

    return this;

};

/**
* Moves this Game Object up one place in its parents display list.
* This call has no effect if the Game Object is already at the top of the display list.
* 
* If this Game Object hasn't been added to a custom Group then this method will move it one object up within the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return {PIXI.DisplayObject} This instance.
*/
Phaser.Component.BringToTop.prototype.moveUp = function () {

    if (this.parent)
    {
        this.parent.moveUp(this);
    }

    return this;

};

/**
* Moves this Game Object down one place in its parents display list.
* This call has no effect if the Game Object is already at the bottom of the display list.
* 
* If this Game Object hasn't been added to a custom Group then this method will move it one object down within the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return {PIXI.DisplayObject} This instance.
*/
Phaser.Component.BringToTop.prototype.moveDown = function () {

    if (this.parent)
    {
        this.parent.moveDown(this);
    }

    return this;

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Core Component Features.
*
* @class
*/
Phaser.Component.Core = function () {};

/**
* Installs / registers mixin components.
*
* The `this` context should be that of the applicable object instance or prototype.
*
* @method
* @protected
*/
Phaser.Component.Core.install = function (components) {

    // Always install 'Core' first
    Phaser.Utils.mixinPrototype(this, Phaser.Component.Core.prototype);

    this.components = {};

    for (var i = 0; i < components.length; i++)
    {
        var id = components[i];
        var replace = false;

        if (id === 'Destroy')
        {
            replace = true;
        }

        Phaser.Utils.mixinPrototype(this, Phaser.Component[id].prototype, replace);

        this.components[id] = true;
    }

};

/**
* Initializes the mixin components.
*
* The `this` context should be an instance of the component mixin target.
*
* @method
* @protected
*/
Phaser.Component.Core.init = function (game, x, y, key, frame) {

    this.game = game;

    this.key = key;

    this.position.set(x, y);
    this.world = new Phaser.Point(x, y);
    this.previousPosition = new Phaser.Point(x, y);

    this.events = new Phaser.Events(this);

    this._bounds = new Phaser.Rectangle();

    if (this.components.PhysicsBody)
    {
        // Enable-body checks for hasOwnProperty; makes sure to lift property from prototype.
        this.body = this.body;
    }

    if (this.components.Animation)
    {
        this.animations = new Phaser.AnimationManager(this);
    }

    if (this.components.LoadTexture && key !== null)
    {
        this.loadTexture(key, frame);
    }

    if (this.components.FixedToCamera)
    {
        this.cameraOffset = new Phaser.Point(x, y);
    }

};

Phaser.Component.Core.preUpdate = function () {

    if (this.pendingDestroy)
    {
        this.destroy();
        return;
    }

    this.previousPosition.set(this.world.x, this.world.y);
    this.previousRotation = this.rotation;

    if (!this.exists || !this.parent.exists)
    {
        this.renderOrderID = -1;
        return false;
    }

    this.world.setTo(this.game.camera.x + this.worldTransform.tx, this.game.camera.y + this.worldTransform.ty);

    if (this.visible)
    {
        this.renderOrderID = this.game.stage.currentRenderOrderID++;
    }

    if (this.texture)
    {
        this.texture.requiresReTint = false;
    }

    if (this.animations)
    {
        this.animations.update();
    }

    if (this.body)
    {
        this.body.preUpdate();
    }

    for (var i = 0; i < this.children.length; i++)
    {
        this.children[i].preUpdate();
    }

    return true;

};

Phaser.Component.Core.prototype = {

    /**
    * A reference to the currently running Game.
    * @property {Phaser.Game} game
    */
    game: null,

    /**
    * A user defined name given to this Game Object.
    * This value isn't ever used internally by Phaser, it is meant as a game level property.
    * @property {string} name
    * @default
    */
    name: '',

    /**
    * The components this Game Object has installed.
    * @property {object} components
    * @protected
    */
    components: {},

    /**
    * The z depth of this Game Object within its parent Group.
    * No two objects in a Group can have the same z value.
    * This value is adjusted automatically whenever the Group hierarchy changes.
    * @property {number} z
    */
    z: 0,

    /**
    * All Phaser Game Objects have an Events class which contains all of the events that are dispatched when certain things happen to this
    * Game Object, or any of its components.
    * @see Phaser.Events
    * @property {Phaser.Events} events
    */
    events: undefined,

    /**
    * If the Game Object is enabled for animation (such as a Phaser.Sprite) this is a reference to its AnimationManager instance.
    * Through it you can create, play, pause and stop animations.
    * @see Phaser.AnimationManager
    * @property {Phaser.AnimationManager} animations
    */
    animations: undefined,

    /**
    * The key of the image or texture used by this Game Object during rendering.
    * If it is a string it's the string used to retrieve the texture from the Phaser Image Cache.
    * It can also be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * If a Game Object is created without a key it is automatically assigned the key `__default` which is a 32x32 transparent PNG stored within the Cache.
    * If a Game Object is given a key which doesn't exist in the Image Cache it is re-assigned the key `__missing` which is a 32x32 PNG of a green box with a line through it.
    * @property {string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture} key
    */
    key: '',

    /**
    * The world coordinates of this Game Object in pixels.
    * Depending on where in the display list this Game Object is placed this value can differ from `position`, 
    * which contains the x/y coordinates relative to the Game Objects parent.
    * @property {Phaser.Point} world
    */
    world: null,

    /**
    * A debug flag designed for use with `Game.enableStep`.
    * @property {boolean} debug
    * @default
    */
    debug: false,

    /**
    * The position the Game Object was located in the previous frame.
    * @property {Phaser.Point} previousPosition
    * @readOnly
    */
    previousPosition: null,

    /**
    * The rotation the Game Object was in set to in the previous frame. Value is in radians.
    * @property {number} previousRotation
    * @readOnly
    */
    previousRotation: 0,

    /**
    * The render order ID is used internally by the renderer and Input Manager and should not be modified.
    * This property is mostly used internally by the renderers, but is exposed for the use of plugins.
    * @property {number} renderOrderID
    * @readOnly
    */
    renderOrderID: 0,

    /**
    * A Game Object is considered `fresh` if it has just been created or reset and is yet to receive a renderer transform update.
    * This property is mostly used internally by the physics systems, but is exposed for the use of plugins.
    * @property {boolean} fresh
    * @readOnly
    */
    fresh: true,

    /**
    * A Game Object is that is pendingDestroy is flagged to have its destroy method called on the next logic update.
    * You can set it directly to allow you to flag an object to be destroyed on its next update.
    * 
    * This is extremely useful if you wish to destroy an object from within one of its own callbacks 
    * such as with Buttons or other Input events.
    * 
    * @property {boolean} pendingDestroy
    */
    pendingDestroy: false,

    /**
    * @property {Phaser.Rectangle} _bounds - Internal cache var.
    * @private
    */
    _bounds: null,

    /**
    * @property {boolean} _exists - Internal cache var.
    * @private
    */
    _exists: true,

    /**
    * Controls if this Game Object is processed by the core game loop.
    * If this Game Object has a physics body it also controls if its physics body is updated or not.
    * When `exists` is set to `false` it will remove its physics body from the physics world if it has one.
    * It also toggles the `visible` property to false as well.
    *
    * Setting `exists` to true will add its physics body back in to the physics world, if it has one.
    * It will also set the `visible` property to `true`.
    *
    * @property {boolean} exists
    */
    exists: {

        get: function () {

            return this._exists;

        },

        set: function (value) {

            if (value)
            {
                this._exists = true;

                if (this.body && this.body.type === Phaser.Physics.P2JS)
                {
                    this.body.addToWorld();
                }

                this.visible = true;
            }
            else
            {
                this._exists = false;

                if (this.body && this.body.type === Phaser.Physics.P2JS)
                {
                    this.body.removeFromWorld();
                }

                this.visible = false;
            }

        }

    },

    /**
    * Override this method in your own custom objects to handle any update requirements.
    * It is called immediately after `preUpdate` and before `postUpdate`.
    * Remember if this Game Object has any children you should call update on those too.
    *
    * @method
    */
    update: function() {

    },

    /**
    * Internal method called by the World postUpdate cycle.
    *
    * @method
    * @protected
    */
    postUpdate: function() {

        if (this.customRender)
        {
            this.key.render();
        }

        if (this.components.PhysicsBody)
        {
            Phaser.Component.PhysicsBody.postUpdate.call(this);
        }

        if (this.components.FixedToCamera)
        {
            Phaser.Component.FixedToCamera.postUpdate.call(this);
        }

        for (var i = 0; i < this.children.length; i++)
        {
            this.children[i].postUpdate();
        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Crop component provides the ability to crop a texture based Game Object to a defined rectangle, 
* which can be updated in real-time.
*
* @class
*/
Phaser.Component.Crop = function () {};

Phaser.Component.Crop.prototype = {

    /**
    * The Rectangle used to crop the texture this Game Object uses.
    * Set this property via `crop`. 
    * If you modify this property directly you must call `updateCrop` in order to have the change take effect.
    * @property {Phaser.Rectangle} cropRect
    * @default
    */
    cropRect: null,

    /**
    * @property {Phaser.Rectangle} _crop - Internal cache var.
    * @private
    */
    _crop: null,

    /**
    * Crop allows you to crop the texture being used to display this Game Object.
    * Setting a crop rectangle modifies the core texture frame. The Game Object width and height properties will be adjusted accordingly.
    *
    * Cropping takes place from the top-left and can be modified in real-time either by providing an updated rectangle object to this method,
    * or by modifying `cropRect` property directly and then calling `updateCrop`.
    *
    * The rectangle object given to this method can be either a `Phaser.Rectangle` or any other object 
    * so long as it has public `x`, `y`, `width`, `height`, `right` and `bottom` properties.
    * 
    * A reference to the rectangle is stored in `cropRect` unless the `copy` parameter is `true`, 
    * in which case the values are duplicated to a local object.
    *
    * @method
    * @param {Phaser.Rectangle} rect - The Rectangle used during cropping. Pass null or no parameters to clear a previously set crop rectangle.
    * @param {boolean} [copy=false] - If false `cropRect` will be stored as a reference to the given rect. If true it will copy the rect values into a local Phaser Rectangle object stored in cropRect.
    */
    crop: function(rect, copy) {

        if (copy === undefined) { copy = false; }

        if (rect)
        {
            if (copy && this.cropRect !== null)
            {
                this.cropRect.setTo(rect.x, rect.y, rect.width, rect.height);
            }
            else if (copy && this.cropRect === null)
            {
                this.cropRect = new Phaser.Rectangle(rect.x, rect.y, rect.width, rect.height);
            }
            else
            {
                this.cropRect = rect;
            }

            this.updateCrop();
        }
        else
        {
            this._crop = null;
            this.cropRect = null;

            this.resetFrame();
        }

    },

    /**
    * If you have set a crop rectangle on this Game Object via `crop` and since modified the `cropRect` property,
    * or the rectangle it references, then you need to update the crop frame by calling this method.
    *
    * @method
    */
    updateCrop: function() {

        if (!this.cropRect)
        {
            return;
        }

        this._crop = Phaser.Rectangle.clone(this.cropRect, this._crop);
        this._crop.x += this._frame.x;
        this._crop.y += this._frame.y;

        var cx = Math.max(this._frame.x, this._crop.x);
        var cy = Math.max(this._frame.y, this._crop.y);
        var cw = Math.min(this._frame.right, this._crop.right) - cx;
        var ch = Math.min(this._frame.bottom, this._crop.bottom) - cy;

        this.texture.crop.x = cx;
        this.texture.crop.y = cy;
        this.texture.crop.width = cw;
        this.texture.crop.height = ch;

        this.texture.frame.width = Math.min(cw, this.cropRect.width);
        this.texture.frame.height = Math.min(ch, this.cropRect.height);

        this.texture.width = this.texture.frame.width;
        this.texture.height = this.texture.frame.height;

        this.texture._updateUvs();

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Delta component provides access to delta values between the Game Objects current and previous position.
*
* @class
*/
Phaser.Component.Delta = function () {};

Phaser.Component.Delta.prototype = {

    /**
    * Returns the delta x value. The difference between world.x now and in the previous frame.
    * 
    * The value will be positive if the Game Object has moved to the right or negative if to the left.
    *
    * @property {number} deltaX
    * @readonly
    */
    deltaX: {

        get: function() {

            return this.world.x - this.previousPosition.x;

        }

    },

    /**
    * Returns the delta y value. The difference between world.y now and in the previous frame.
    * 
    * The value will be positive if the Game Object has moved down or negative if up.
    *
    * @property {number} deltaY
    * @readonly
    */
    deltaY: {

        get: function() {

            return this.world.y - this.previousPosition.y;

        }

    },

    /**
    * Returns the delta z value. The difference between rotation now and in the previous frame.
    *
    * @property {number} deltaZ - The delta value.
    * @readonly
    */
    deltaZ: {

        get: function() {

            return this.rotation - this.previousRotation;

        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Destroy component is responsible for destroying a Game Object.
*
* @class
*/
Phaser.Component.Destroy = function () {};

Phaser.Component.Destroy.prototype = {

    /**
    * As a Game Object runs through its destroy method this flag is set to true, 
    * and can be checked in any sub-systems or plugins it is being destroyed from.
    * @property {boolean} destroyPhase
    * @readOnly
    */
    destroyPhase: false,

    /**
    * Destroys the Game Object. This removes it from its parent group, destroys the input, event and animation handlers if present
    * and nulls its reference to `game`, freeing it up for garbage collection.
    * 
    * If this Game Object has the Events component it will also dispatch the `onDestroy` event.
    *
    * @method
    * @param {boolean} [destroyChildren=true] - Should every child of this object have its destroy method called as well?
    */
    destroy: function (destroyChildren) {

        if (this.game === null || this.destroyPhase) { return; }

        if (destroyChildren === undefined) { destroyChildren = true; }

        this.destroyPhase = true;

        if (this.events)
        {
            this.events.onDestroy$dispatch(this);
        }

        if (this.parent)
        {
            if (this.parent instanceof Phaser.Group)
            {
                this.parent.remove(this);
            }
            else
            {
                this.parent.removeChild(this);
            }
        }

        if (this.input)
        {
            this.input.destroy();
        }

        if (this.animations)
        {
            this.animations.destroy();
        }

        if (this.body)
        {
            this.body.destroy();
        }

        if (this.events)
        {
            this.events.destroy();
        }

        var i = this.children.length;

        if (destroyChildren)
        {
            while (i--)
            {
                this.children[i].destroy(destroyChildren);
            }
        }
        else
        {
            while (i--)
            {
                this.removeChild(this.children[i]);
            }
        }

        if (this._crop)
        {
            this._crop = null;
        }

        if (this._frame)
        {
            this._frame = null;
        }

        if (Phaser.Video && this.key instanceof Phaser.Video)
        {
            this.key.onChangeSource.remove(this.resizeFrame, this);
        }

        if (Phaser.BitmapText && this._glyphs)
        {
            this._glyphs = [];
        }

        this.alive = false;
        this.exists = false;
        this.visible = false;

        this.filters = null;
        this.mask = null;
        this.game = null;

        //  In case Pixi is still going to try and render it even though destroyed
        this.renderable = false;

        //  Pixi level DisplayObject destroy
        this.transformCallback = null;
        this.transformCallbackContext = null;
        this.hitArea = null;
        this.parent = null;
        this.stage = null;
        this.worldTransform = null;
        this.filterArea = null;
        this._bounds = null;
        this._currentBounds = null;
        this._mask = null;

        this._destroyCachedSprite();

        this.destroyPhase = false;
        this.pendingDestroy = false;

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Events component is a collection of events fired by the parent game object.
*
* For example to tell when a Sprite has been added to a new group:
*
* `sprite.events.onAddedToGroup.add(yourFunction, this);`
*
* Where `yourFunction` is the function you want called when this event occurs.
*
* The Input-related events will only be dispatched if the Sprite has had `inputEnabled` set to `true`
* and the Animation-related events only apply to game objects with animations like {@link Phaser.Sprite}.
*
* @class Phaser.Events
* @constructor
* @param {Phaser.Sprite} sprite - A reference to the game object / Sprite that owns this Events object.
*/
Phaser.Events = function (sprite) {

    /**
    * @property {Phaser.Sprite} parent - The Sprite that owns these events.
    */
    this.parent = sprite;

    // The signals are automatically added by the corresponding proxy properties

};

Phaser.Events.prototype = {

    /**
     * Removes all events.
     *
     * @method Phaser.Events#destroy
     */
    destroy: function () {

        this._parent = null;

        if (this._onDestroy)           { this._onDestroy.dispose(); }
        if (this._onAddedToGroup)      { this._onAddedToGroup.dispose(); }
        if (this._onRemovedFromGroup)  { this._onRemovedFromGroup.dispose(); }
        if (this._onRemovedFromWorld)  { this._onRemovedFromWorld.dispose(); }
        if (this._onKilled)            { this._onKilled.dispose(); }
        if (this._onRevived)           { this._onRevived.dispose(); }
        if (this._onEnterBounds)       { this._onEnterBounds.dispose(); }
        if (this._onOutOfBounds)       { this._onOutOfBounds.dispose(); }

        if (this._onInputOver)         { this._onInputOver.dispose(); }
        if (this._onInputOut)          { this._onInputOut.dispose(); }
        if (this._onInputDown)         { this._onInputDown.dispose(); }
        if (this._onInputUp)           { this._onInputUp.dispose(); }
        if (this._onDragStart)         { this._onDragStart.dispose(); }
        if (this._onDragUpdate)        { this._onDragUpdate.dispose(); }
        if (this._onDragStop)          { this._onDragStop.dispose(); }

        if (this._onAnimationStart)    { this._onAnimationStart.dispose(); }
        if (this._onAnimationComplete) { this._onAnimationComplete.dispose(); }
        if (this._onAnimationLoop)     { this._onAnimationLoop.dispose(); }

    },

    // The following properties are sentinels that will be replaced with getters

    /**
    * @property {Phaser.Signal} onAddedToGroup - This signal is dispatched when the parent is added to a new Group.
    */
    onAddedToGroup: null,

    /**
    * @property {Phaser.Signal} onRemovedFromGroup - This signal is dispatched when the parent is removed from a Group.
    */
    onRemovedFromGroup: null,

    /**
    * @property {Phaser.Signal} onRemovedFromWorld - This signal is dispatched if this item or any of its parents are removed from the game world.
    */
    onRemovedFromWorld: null,

    /**
    * @property {Phaser.Signal} onDestroy - This signal is dispatched when the parent is destroyed.
    */
    onDestroy: null,

    /**
    * @property {Phaser.Signal} onKilled - This signal is dispatched when the parent is killed.
    */
    onKilled: null,

    /**
    * @property {Phaser.Signal} onRevived - This signal is dispatched when the parent is revived.
    */
    onRevived: null,

    /**
    * @property {Phaser.Signal} onOutOfBounds - This signal is dispatched when the parent leaves the world bounds (only if Sprite.checkWorldBounds is true).
    */
    onOutOfBounds: null,

    /**
    * @property {Phaser.Signal} onEnterBounds - This signal is dispatched when the parent returns within the world bounds (only if Sprite.checkWorldBounds is true).
    */
    onEnterBounds: null,

    /**
    * @property {Phaser.Signal} onInputOver - This signal is dispatched if the parent is inputEnabled and receives an over event from a Pointer.
    */
    onInputOver: null,

    /**
    * @property {Phaser.Signal} onInputOut - This signal is dispatched if the parent is inputEnabled and receives an out event from a Pointer.
    */
    onInputOut: null,

    /**
    * @property {Phaser.Signal} onInputDown - This signal is dispatched if the parent is inputEnabled and receives a down event from a Pointer.
    */
    onInputDown: null,

    /**
    * @property {Phaser.Signal} onInputUp - This signal is dispatched if the parent is inputEnabled and receives an up event from a Pointer.
    */
    onInputUp: null,

    /**
    * @property {Phaser.Signal} onDragStart - This signal is dispatched if the parent is inputEnabled and receives a drag start event from a Pointer.
    */
    onDragStart: null,

    /**
    * @property {Phaser.Signal} onDragUpdate - This signal is dispatched if the parent is inputEnabled and receives a drag update event from a Pointer.
    */
    onDragUpdate: null,

    /**
    * @property {Phaser.Signal} onDragStop - This signal is dispatched if the parent is inputEnabled and receives a drag stop event from a Pointer.
    */
    onDragStop: null,

    /**
    * @property {Phaser.Signal} onAnimationStart - This signal is dispatched when the parent has an animation that is played.
    */
    onAnimationStart: null,

    /**
    * @property {Phaser.Signal} onAnimationComplete - This signal is dispatched when the parent has an animation that finishes playing.
    */
    onAnimationComplete: null,

    /**
    * @property {Phaser.Signal} onAnimationLoop - This signal is dispatched when the parent has an animation that loops playback.
    */
    onAnimationLoop: null

};

Phaser.Events.prototype.constructor = Phaser.Events;

// Create an auto-create proxy getter and dispatch method for all events.
// The backing property is the same as the event name, prefixed with '_'
// and the dispatch method is the same as the event name postfixed with '$dispatch'.
for (var prop in Phaser.Events.prototype)
{
    if (!Phaser.Events.prototype.hasOwnProperty(prop) ||
        prop.indexOf('on') !== 0 ||
        Phaser.Events.prototype[prop] !== null)
    {
        continue;
    }

    (function (prop, backing) {
        'use strict';

        // The accessor creates a new Signal; and so it should only be used from user-code.
        Object.defineProperty(Phaser.Events.prototype, prop, {
            get: function () {
                return this[backing] || (this[backing] = new Phaser.Signal());
            }
        });

        // The dispatcher will only broadcast on an already-created signal; call this internally.
        Phaser.Events.prototype[prop + '$dispatch'] = function () {
            return this[backing] ? this[backing].dispatch.apply(this[backing], arguments) : null;
        };

    })(prop, '_' + prop);

}

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The FixedToCamera component enables a Game Object to be rendered relative to the game camera coordinates, regardless 
* of where in the world the camera is. This is used for things like sticking game UI to the camera that scrolls as it moves around the world.
*
* @class
*/
Phaser.Component.FixedToCamera = function () {};

/**
 * The FixedToCamera component postUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.FixedToCamera.postUpdate = function () {

    if (this.fixedToCamera)
    {
        this.position.x = (this.game.camera.view.x + this.cameraOffset.x) / this.game.camera.scale.x;
        this.position.y = (this.game.camera.view.y + this.cameraOffset.y) / this.game.camera.scale.y;
    }

};

Phaser.Component.FixedToCamera.prototype = {

    /**
    * @property {boolean} _fixedToCamera
    * @private
    */
    _fixedToCamera: false,

    /**
    * A Game Object that is "fixed" to the camera uses its x/y coordinates as offsets from the top left of the camera during rendering.
    * 
    * The values are adjusted at the rendering stage, overriding the Game Objects actual world position.
    * 
    * The end result is that the Game Object will appear to be 'fixed' to the camera, regardless of where in the game world
    * the camera is viewing. This is useful if for example this Game Object is a UI item that you wish to be visible at all times 
    * regardless where in the world the camera is.
    * 
    * The offsets are stored in the `cameraOffset` property.
    * 
    * Note that the `cameraOffset` values are in addition to any parent of this Game Object on the display list.
    *
    * Be careful not to set `fixedToCamera` on Game Objects which are in Groups that already have `fixedToCamera` enabled on them.
    *
    * @property {boolean} fixedToCamera
    */
    fixedToCamera: {

        get: function () {

            return this._fixedToCamera;

        },

        set: function (value) {

            if (value)
            {
                this._fixedToCamera = true;
                this.cameraOffset.set(this.x, this.y);
            }
            else
            {
                this._fixedToCamera = false;
            }

        }

    },

    /**
    * The x/y coordinate offset applied to the top-left of the camera that this Game Object will be drawn at if `fixedToCamera` is true.
    * 
    * The values are relative to the top-left of the camera view and in addition to any parent of the Game Object on the display list.
    * @property {Phaser.Point} cameraOffset
    */
    cameraOffset: new Phaser.Point()

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Health component provides the ability for Game Objects to have a `health` property 
* that can be damaged and reset through game code.
* Requires the LifeSpan component.
*
* @class
*/
Phaser.Component.Health = function () {};

Phaser.Component.Health.prototype = {

    /**
    * The Game Objects health value. This is a handy property for setting and manipulating health on a Game Object.
    * 
    * It can be used in combination with the `damage` method or modified directly.
    * 
    * @property {number} health
    * @default
    */
    health: 1,

    /**
    * The Game Objects maximum health value. This works in combination with the `heal` method to ensure
    * the health value never exceeds the maximum.
    * 
    * @property {number} maxHealth
    * @default
    */
    maxHealth: 100,

    /**
    * Damages the Game Object. This removes the given amount of health from the `health` property.
    * 
    * If health is taken below or is equal to zero then the `kill` method is called.
    *
    * @member
    * @param {number} amount - The amount to subtract from the current `health` value.
    * @return {Phaser.Sprite} This instance.
    */
    damage: function(amount) {

        if (this.alive)
        {
            this.health -= amount;

            if (this.health <= 0)
            {
                this.kill();
            }
        }

        return this;

    },

    /**
    * Heal the Game Object. This adds the given amount of health to the `health` property.
    *
    * @member
    * @param {number} amount - The amount to add to the current `health` value. The total will never exceed `maxHealth`.
    * @return {Phaser.Sprite} This instance.
    */
    heal: function(amount) {

        if (this.alive)
        {
            this.health += amount;

            if (this.health > this.maxHealth)
            {
                this.health = this.maxHealth;
            }
        }

        return this;

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The InCamera component checks if the Game Object intersects with the Game Camera.
*
* @class
*/
Phaser.Component.InCamera = function () {};

Phaser.Component.InCamera.prototype = {

    /**
    * Checks if this Game Objects bounds intersects with the Game Cameras bounds.
    * 
    * It will be `true` if they intersect, or `false` if the Game Object is fully outside of the Cameras bounds.
    * 
    * An object outside the bounds can be considered for camera culling if it has the AutoCull component.
    *
    * @property {boolean} inCamera
    * @readonly
    */
    inCamera: {

        get: function() {

            return this.game.world.camera.view.intersects(this._bounds);

        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The InputEnabled component allows a Game Object to have its own InputHandler and process input related events.
*
* @class
*/
Phaser.Component.InputEnabled = function () {};

Phaser.Component.InputEnabled.prototype = {

    /**
    * The Input Handler for this Game Object.
    * 
    * By default it is disabled. If you wish this Game Object to process input events you should enable it with: `inputEnabled = true`.
    * 
    * After you have done this, this property will be a reference to the Phaser InputHandler.
    * @property {Phaser.InputHandler|null} input 
    */
    input: null,

    /**
    * By default a Game Object won't process any input events. By setting `inputEnabled` to true a Phaser.InputHandler is created
    * for this Game Object and it will then start to process click / touch events and more.
    * 
    * You can then access the Input Handler via `this.input`.
    * 
    * Note that Input related events are dispatched from `this.events`, i.e.: `events.onInputDown`.
    * 
    * If you set this property to false it will stop the Input Handler from processing any more input events.
    *
    * @property {boolean} inputEnabled
    */
    inputEnabled: {

        get: function () {

            return (this.input && this.input.enabled);

        },

        set: function (value) {

            if (value)
            {
                if (this.input === null)
                {
                    this.input = new Phaser.InputHandler(this);
                    this.input.start();
                }
                else if (this.input && !this.input.enabled)
                {
                    this.input.start();
                }
            }
            else
            {
                if (this.input && this.input.enabled)
                {
                    this.input.stop();
                }
            }

        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The InWorld component checks if a Game Object is within the Game World Bounds.
* An object is considered as being "in bounds" so long as its own bounds intersects at any point with the World bounds.
* If the AutoCull component is enabled on the Game Object then it will check the Game Object against the Camera bounds as well.
*
* @class
*/
Phaser.Component.InWorld = function () {};

/**
 * The InWorld component preUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.InWorld.preUpdate = function () {

    //  Cache the bounds if we need it
    if (this.autoCull || this.checkWorldBounds)
    {
        this._bounds.copyFrom(this.getBounds());

        this._bounds.x += this.game.camera.view.x;
        this._bounds.y += this.game.camera.view.y;

        if (this.autoCull)
        {
            //  Won't get rendered but will still get its transform updated
            if (this.game.world.camera.view.intersects(this._bounds))
            {
                this.renderable = true;
                this.game.world.camera.totalInView++;
            }
            else
            {
                this.renderable = false;
            }
        }

        if (this.checkWorldBounds)
        {
            //  The Sprite is already out of the world bounds, so let's check to see if it has come back again
            if (this._outOfBoundsFired && this.game.world.bounds.intersects(this._bounds))
            {
                this._outOfBoundsFired = false;
                this.events.onEnterBounds$dispatch(this);
            }
            else if (!this._outOfBoundsFired && !this.game.world.bounds.intersects(this._bounds))
            {
                //  The Sprite WAS in the screen, but has now left.
                this._outOfBoundsFired = true;
                this.events.onOutOfBounds$dispatch(this);

                if (this.outOfBoundsKill)
                {
                    this.kill();
                    return false;
                }
            }
        }
    }

    return true;

};

Phaser.Component.InWorld.prototype = {

    /**
    * If this is set to `true` the Game Object checks if it is within the World bounds each frame. 
    * 
    * When it is no longer intersecting the world bounds it dispatches the `onOutOfBounds` event.
    * 
    * If it was *previously* out of bounds but is now intersecting the world bounds again it dispatches the `onEnterBounds` event.
    * 
    * It also optionally kills the Game Object if `outOfBoundsKill` is `true`.
    * 
    * When `checkWorldBounds` is enabled it forces the Game Object to calculate its full bounds every frame.
    * 
    * This is a relatively expensive operation, especially if enabled on hundreds of Game Objects. So enable it only if you know it's required,
    * or you have tested performance and find it acceptable.
    * 
    * @property {boolean} checkWorldBounds
    * @default
    */
    checkWorldBounds: false,

    /**
    * If this and the `checkWorldBounds` property are both set to `true` then the `kill` method is called as soon as `inWorld` returns false.
    * 
    * @property {boolean} outOfBoundsKill
    * @default
    */
    outOfBoundsKill: false,

    /**
    * @property {boolean} _outOfBoundsFired - Internal state var.
    * @private
    */
    _outOfBoundsFired: false,

    /**
    * Checks if the Game Objects bounds are within, or intersect at any point with the Game World bounds.
    *
    * @property {boolean} inWorld
    * @readonly
    */
    inWorld: {

        get: function () {

            return this.game.world.bounds.intersects(this.getBounds());

        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* LifeSpan Component Features.
*
* @class
*/
Phaser.Component.LifeSpan = function () {};

/**
 * The LifeSpan component preUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.LifeSpan.preUpdate = function () {

    if (this.lifespan > 0)
    {
        this.lifespan -= this.game.time.physicsElapsedMS;

        if (this.lifespan <= 0)
        {
            this.kill();
            return false;
        }
    }

    return true;

};

Phaser.Component.LifeSpan.prototype = {

    /**
    * A useful flag to control if the Game Object is alive or dead.
    * 
    * This is set automatically by the Health components `damage` method should the object run out of health.
    * Or you can toggle it via your game code.
    * 
    * This property is mostly just provided to be used by your game - it doesn't effect rendering or logic updates.
    * However you can use `Group.getFirstAlive` in conjunction with this property for fast object pooling and recycling.
    * @property {boolean} alive
    * @default
    */
    alive: true,

    /**
    * The lifespan allows you to give a Game Object a lifespan in milliseconds.
    * 
    * Once the Game Object is 'born' you can set this to a positive value.
    * 
    * It is automatically decremented by the millisecond equivalent of `game.time.physicsElapsed` each frame.
    * When it reaches zero it will call the `kill` method.
    * 
    * Very handy for particles, bullets, collectibles, or any other short-lived entity.
    *
    * @property {number} lifespan
    * @default
    */
    lifespan: 0,

    /**
    * Brings a 'dead' Game Object back to life, optionally resetting its health value in the process.
    * 
    * A resurrected Game Object has its `alive`, `exists` and `visible` properties all set to true.
    * 
    * It will dispatch the `onRevived` event. Listen to `events.onRevived` for the signal.
    *
    * @method
    * @param {number} [health=1] - The health to give the Game Object. Only set if the GameObject has the Health component.
    * @return {PIXI.DisplayObject} This instance.
    */
    revive: function (health) {

        if (health === undefined) { health = 1; }

        this.alive = true;
        this.exists = true;
        this.visible = true;
 
        if (typeof this.health === 'number')
        {
            this.health = health;
        }

        if (this.events)
        {
            this.events.onRevived$dispatch(this);
        }

        return this;

    },

    /**
    * Kills a Game Object. A killed Game Object has its `alive`, `exists` and `visible` properties all set to false.
    * 
    * It will dispatch the `onKilled` event. You can listen to `events.onKilled` for the signal.
    * 
    * Note that killing a Game Object is a way for you to quickly recycle it in an object pool, 
    * it doesn't destroy the object or free it up from memory.
    * 
    * If you don't need this Game Object any more you should call `destroy` instead.
    *
    * @method
    * @return {PIXI.DisplayObject} This instance.
    */
    kill: function () {

        this.alive = false;
        this.exists = false;
        this.visible = false;

        if (this.events)
        {
            this.events.onKilled$dispatch(this);
        }

        return this;

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The LoadTexture component manages the loading of a texture into the Game Object and the changing of frames.
*
* @class
*/
Phaser.Component.LoadTexture = function () {};

Phaser.Component.LoadTexture.prototype = {

    /**
    * @property {boolean} customRender - Does this texture require a custom render call? (as set by BitmapData, Video, etc)
    * @private
    */
    customRender: false,

    /**
    * @property {Phaser.Rectangle} _frame - Internal cache var.
    * @private
    */
    _frame: null,

    /**
    * Changes the base texture the Game Object is using. The old texture is removed and the new one is referenced or fetched from the Cache.
    * 
    * If your Game Object is using a frame from a texture atlas and you just wish to change to another frame, then see the `frame` or `frameName` properties instead.
    * 
    * You should only use `loadTexture` if you want to replace the base texture entirely.
    * 
    * Calling this method causes a WebGL texture update, so use sparingly or in low-intensity portions of your game, or if you know the new texture is already on the GPU.
    *
    * @method
    * @param {string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture} key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache Image entry, or an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param {string|number} [frame] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
    * @param {boolean} [stopAnimation=true] - If an animation is already playing on this Sprite you can choose to stop it or let it carry on playing.
    */
    loadTexture: function (key, frame, stopAnimation) {

        frame = frame || 0;

        if ((stopAnimation || stopAnimation === undefined) && this.animations)
        {
            this.animations.stop();
        }

        this.key = key;
        this.customRender = false;
        var cache = this.game.cache;

        var setFrame = true;
        var smoothed = !this.texture.baseTexture.scaleMode;

        if (Phaser.RenderTexture && key instanceof Phaser.RenderTexture)
        {
            this.key = key.key;
            this.setTexture(key);
        }
        else if (Phaser.BitmapData && key instanceof Phaser.BitmapData)
        {
            this.customRender = true;

            this.setTexture(key.texture);

            if (cache.hasFrameData(key.key, Phaser.Cache.BITMAPDATA))
            {
                setFrame = !this.animations.loadFrameData(cache.getFrameData(key.key, Phaser.Cache.BITMAPDATA), frame);
            }
        }
        else if (Phaser.Video && key instanceof Phaser.Video)
        {
            this.customRender = true;

            //  This works from a reference, which probably isn't what we need here
            var valid = key.texture.valid;
            this.setTexture(key.texture);
            this.setFrame(key.texture.frame.clone());
            key.onChangeSource.add(this.resizeFrame, this);
            this.texture.valid = valid;
        }
        else if (key instanceof PIXI.Texture)
        {
            this.setTexture(key);
        }
        else
        {
            var img = cache.getImage(key, true);

            this.key = img.key;
            this.setTexture(new PIXI.Texture(img.base));

            setFrame = !this.animations.loadFrameData(img.frameData, frame);
        }
        
        if (setFrame)
        {
            this._frame = Phaser.Rectangle.clone(this.texture.frame);
        }

        if (!smoothed)
        {
            this.texture.baseTexture.scaleMode = 1;
        }

    },

    /**
    * Sets the texture frame the Game Object uses for rendering.
    * 
    * This is primarily an internal method used by `loadTexture`, but is exposed for the use of plugins and custom classes.
    *
    * @method
    * @param {Phaser.Frame} frame - The Frame to be used by the texture.
    */
    setFrame: function (frame) {

        this._frame = frame;

        this.texture.frame.x = frame.x;
        this.texture.frame.y = frame.y;
        this.texture.frame.width = frame.width;
        this.texture.frame.height = frame.height;

        this.texture.crop.x = frame.x;
        this.texture.crop.y = frame.y;
        this.texture.crop.width = frame.width;
        this.texture.crop.height = frame.height;

        if (frame.trimmed)
        {
            if (this.texture.trim)
            {
                this.texture.trim.x = frame.spriteSourceSizeX;
                this.texture.trim.y = frame.spriteSourceSizeY;
                this.texture.trim.width = frame.sourceSizeW;
                this.texture.trim.height = frame.sourceSizeH;
            }
            else
            {
                this.texture.trim = { x: frame.spriteSourceSizeX, y: frame.spriteSourceSizeY, width: frame.sourceSizeW, height: frame.sourceSizeH };
            }

            this.texture.width = frame.sourceSizeW;
            this.texture.height = frame.sourceSizeH;
            this.texture.frame.width = frame.sourceSizeW;
            this.texture.frame.height = frame.sourceSizeH;
        }
        else if (!frame.trimmed && this.texture.trim)
        {
            this.texture.trim = null;
        }

        if (this.cropRect)
        {
            this.updateCrop();
        }

        this.texture.requiresReTint = true;
        
        this.texture._updateUvs();

        if (this.tilingTexture)
        {
            this.refreshTexture = true;
        }

    },

    /**
    * Resizes the Frame dimensions that the Game Object uses for rendering.
    * 
    * You shouldn't normally need to ever call this, but in the case of special texture types such as Video or BitmapData
    * it can be useful to adjust the dimensions directly in this way.
    *
    * @method
    * @param {object} parent - The parent texture object that caused the resize, i.e. a Phaser.Video object.
    * @param {integer} width - The new width of the texture.
    * @param {integer} height - The new height of the texture.
    */
    resizeFrame: function (parent, width, height) {

        this.texture.frame.resize(width, height);
        this.texture.setFrame(this.texture.frame);

    },

    /**
    * Resets the texture frame dimensions that the Game Object uses for rendering.
    *
    * @method
    */
    resetFrame: function () {

        if (this._frame)
        {
            this.setFrame(this._frame);
        }

    },

    /**
    * Gets or sets the current frame index of the texture being used to render this Game Object.
    *
    * To change the frame set `frame` to the index of the new frame in the sprite sheet you wish this Game Object to use,
    * for example: `player.frame = 4`.
    * 
    * If the frame index given doesn't exist it will revert to the first frame found in the texture.
    * 
    * If you are using a texture atlas then you should use the `frameName` property instead.
    * 
    * If you wish to fully replace the texture being used see `loadTexture`.
    * @property {integer} frame
    */
    frame: {

        get: function () {
            return this.animations.frame;
        },

        set: function (value) {
            this.animations.frame = value;
        }

    },

    /**
    * Gets or sets the current frame name of the texture being used to render this Game Object.
    * 
    * To change the frame set `frameName` to the name of the new frame in the texture atlas you wish this Game Object to use, 
    * for example: `player.frameName = "idle"`.
    *
    * If the frame name given doesn't exist it will revert to the first frame found in the texture and throw a console warning.
    * 
    * If you are using a sprite sheet then you should use the `frame` property instead.
    * 
    * If you wish to fully replace the texture being used see `loadTexture`.
    * @property {string} frameName
    */
    frameName: {

        get: function () {
            return this.animations.frameName;
        },

        set: function (value) {
            this.animations.frameName = value;
        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Overlap component allows a Game Object to check if it overlaps with the bounds of another Game Object.
*
* @class
*/
Phaser.Component.Overlap = function () {};

Phaser.Component.Overlap.prototype = {

    /**
    * Checks to see if the bounds of this Game Object overlaps with the bounds of the given Display Object, 
    * which can be a Sprite, Image, TileSprite or anything that extends those such as Button or provides a `getBounds` method and result.
    * 
    * This check ignores the `hitArea` property if set and runs a `getBounds` comparison on both objects to determine the result.
    * 
    * Therefore it's relatively expensive to use in large quantities, i.e. with lots of Sprites at a high frequency.
    * It should be fine for low-volume testing where physics isn't required.
    *
    * @method
    * @param {Phaser.Sprite|Phaser.Image|Phaser.TileSprite|Phaser.Button|PIXI.DisplayObject} displayObject - The display object to check against.
    * @return {boolean} True if the bounds of this Game Object intersects at any point with the bounds of the given display object.
    */
    overlap: function (displayObject) {

        return Phaser.Rectangle.intersects(this.getBounds(), displayObject.getBounds());

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The PhysicsBody component manages the Game Objects physics body and physics enabling.
* It also overrides the x and y properties, ensuring that any manual adjustment of them is reflected in the physics body itself.
*
* @class
*/
Phaser.Component.PhysicsBody = function () {};

/**
 * The PhysicsBody component preUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.PhysicsBody.preUpdate = function () {

    if (this.fresh && this.exists)
    {
        this.world.setTo(this.parent.position.x + this.position.x, this.parent.position.y + this.position.y);
        this.worldTransform.tx = this.world.x;
        this.worldTransform.ty = this.world.y;

        this.previousPosition.set(this.world.x, this.world.y);
        this.previousRotation = this.rotation;

        if (this.body)
        {
            this.body.preUpdate();
        }

        this.fresh = false;

        return false;
    }

    this.previousPosition.set(this.world.x, this.world.y);
    this.previousRotation = this.rotation;

    if (!this._exists || !this.parent.exists)
    {
        this.renderOrderID = -1;
        return false;
    }

    return true;

};

/**
 * The PhysicsBody component postUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.PhysicsBody.postUpdate = function () {

    if (this.exists && this.body)
    {
        this.body.postUpdate();
    }

};

Phaser.Component.PhysicsBody.prototype = {

    /**
    * `body` is the Game Objects physics body. Once a Game Object is enabled for physics you access all associated 
    * properties and methods via it.
    * 
    * By default Game Objects won't add themselves to any physics system and their `body` property will be `null`.
    * 
    * To enable this Game Object for physics you need to call `game.physics.enable(object, system)` where `object` is this object
    * and `system` is the Physics system you are using. If none is given it defaults to `Phaser.Physics.Arcade`.
    * 
    * You can alternatively call `game.physics.arcade.enable(object)`, or add this Game Object to a physics enabled Group.
    *
    * Important: Enabling a Game Object for P2 or Ninja physics will automatically set its `anchor` property to 0.5, 
    * so the physics body is centered on the Game Object.
    * 
    * If you need a different result then adjust or re-create the Body shape offsets manually or reset the anchor after enabling physics.
    *
    * @property {Phaser.Physics.Arcade.Body|Phaser.Physics.P2.Body|Phaser.Physics.Ninja.Body|null} body
    * @default
    */
    body: null,

    /**
    * The position of the Game Object on the x axis relative to the local coordinates of the parent.
    *
    * @property {number} x
    */
    x: {

        get: function () {

            return this.position.x;

        },

        set: function (value) {

            this.position.x = value;

            if (this.body && !this.body.dirty)
            {
                this.body._reset = true;
            }

        }

    },

    /**
    * The position of the Game Object on the y axis relative to the local coordinates of the parent.
    *
    * @property {number} y
    */
    y: {

        get: function () {

            return this.position.y;

        },

        set: function (value) {

            this.position.y = value;

            if (this.body && !this.body.dirty)
            {
                this.body._reset = true;
            }

        }

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Reset component allows a Game Object to be reset and repositioned to a new location.
*
* @class
*/
Phaser.Component.Reset = function () {};

/**
* Resets the Game Object.
* 
* This moves the Game Object to the given x/y world coordinates and sets `fresh`, `exists`, 
* `visible` and `renderable` to true.
*
* If this Game Object has the LifeSpan component it will also set `alive` to true and `health` to the given value.
*
* If this Game Object has a Physics Body it will reset the Body.
*
* @method
* @param {number} x - The x coordinate (in world space) to position the Game Object at.
* @param {number} y - The y coordinate (in world space) to position the Game Object at.
* @param {number} [health=1] - The health to give the Game Object if it has the Health component.
* @return {PIXI.DisplayObject} This instance.
*/
Phaser.Component.Reset.prototype.reset = function (x, y, health) {

    if (health === undefined) { health = 1; }

    this.world.set(x, y);
    this.position.set(x, y);

    this.fresh = true;
    this.exists = true;
    this.visible = true;
    this.renderable = true;

    if (this.components.InWorld)
    {
        this._outOfBoundsFired = false;
    }

    if (this.components.LifeSpan)
    {
        this.alive = true;
        this.health = health;
    }

    if (this.components.PhysicsBody)
    {
        if (this.body)
        {
            this.body.reset(x, y, false, false);
        }
    }

    return this;

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The ScaleMinMax component allows a Game Object to limit how far it can be scaled by its parent.
*
* @class
*/
Phaser.Component.ScaleMinMax = function () {};

Phaser.Component.ScaleMinMax.prototype = {

    /**
    * The callback that will apply any scale limiting to the worldTransform.
    * @property {function} transformCallback
    */
    transformCallback: this.checkTransform,

    /**
    * The context under which `transformCallback` is called.
    * @property {object} transformCallbackContext
    */
    transformCallbackContext: this,

    /**
    * The minimum scale this Game Object will scale down to.
    * 
    * It allows you to prevent a parent from scaling this Game Object lower than the given value.
    * 
    * Set it to `null` to remove the limit.
    * @property {Phaser.Point} scaleMin
    */
    scaleMin: null,

    /**
    * The maximum scale this Game Object will scale up to. 
    * 
    * It allows you to prevent a parent from scaling this Game Object higher than the given value.
    * 
    * Set it to `null` to remove the limit.
    * @property {Phaser.Point} scaleMax
    */
    scaleMax: null,

    /**
     * Adjust scaling limits, if set, to this Game Object.
     *
     * @method
     * @private
     * @param {PIXI.Matrix} wt - The updated worldTransform matrix.
     */
    checkTransform: function (wt) {

        if (this.scaleMin)
        {
            if (wt.a < this.scaleMin.x)
            {
                wt.a = this.scaleMin.x;
            }

            if (wt.d < this.scaleMin.y)
            {
                wt.d = this.scaleMin.y;
            }
        }

        if (this.scaleMax)
        {
            if (wt.a > this.scaleMax.x)
            {
                wt.a = this.scaleMax.x;
            }

            if (wt.d > this.scaleMax.y)
            {
                wt.d = this.scaleMax.y;
            }
        }

    },

    /**
     * Sets the scaleMin and scaleMax values. These values are used to limit how far this Game Object will scale based on its parent.
     * 
     * For example if this Game Object has a `minScale` value of 1 and its parent has a `scale` value of 0.5, the 0.5 will be ignored 
     * and the scale value of 1 will be used, as the parents scale is lower than the minimum scale this Game Object should adhere to.
     * 
     * By setting these values you can carefully control how Game Objects deal with responsive scaling.
     * 
     * If only one parameter is given then that value will be used for both scaleMin and scaleMax:
     * `setScaleMinMax(1)` = scaleMin.x, scaleMin.y, scaleMax.x and scaleMax.y all = 1
     *
     * If only two parameters are given the first is set as scaleMin.x and y and the second as scaleMax.x and y:
     * `setScaleMinMax(0.5, 2)` = scaleMin.x and y = 0.5 and scaleMax.x and y = 2
     *
     * If you wish to set `scaleMin` with different values for x and y then either modify Game Object.scaleMin directly, 
     * or pass `null` for the `maxX` and `maxY` parameters.
     * 
     * Call `setScaleMinMax(null)` to clear all previously set values.
     *
     * @method
     * @param {number|null} minX - The minimum horizontal scale value this Game Object can scale down to.
     * @param {number|null} minY - The minimum vertical scale value this Game Object can scale down to.
     * @param {number|null} maxX - The maximum horizontal scale value this Game Object can scale up to.
     * @param {number|null} maxY - The maximum vertical scale value this Game Object can scale up to.
     */
    setScaleMinMax: function (minX, minY, maxX, maxY) {

        if (minY === undefined)
        {
            //  1 parameter, set all to it
            minY = maxX = maxY = minX;
        }
        else if (maxX === undefined)
        {
            //  2 parameters, the first is min, the second max
            maxX = maxY = minY;
            minY = minX;
        }

        if (minX === null)
        {
            this.scaleMin = null;
        }
        else
        {
            if (this.scaleMin)
            {
                this.scaleMin.set(minX, minY);
            }
            else
            {
                this.scaleMin = new Phaser.Point(minX, minY);
            }
        }

        if (maxX === null)
        {
            this.scaleMax = null;
        }
        else
        {
            if (this.scaleMax)
            {
                this.scaleMax.set(maxX, maxY);
            }
            else
            {
                this.scaleMax = new Phaser.Point(maxX, maxY);
            }
        }

    }

};
/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Smoothed component allows a Game Object to control anti-aliasing of an image based texture.
*
* @class
*/
Phaser.Component.Smoothed = function () {};

Phaser.Component.Smoothed.prototype = {

    /**
    * Enable or disable texture smoothing for this Game Object.
    * 
    * It only takes effect if the Game Object is using an image based texture.
    * 
    * Smoothing is enabled by default.
    *
    * @property {boolean} smoothed
    */
    smoothed: {

        get: function () {

            return !this.texture.baseTexture.scaleMode;

        },

        set: function (value) {

            if (value)
            {
                if (this.texture)
                {
                    this.texture.baseTexture.scaleMode = 0;
                }
            }
            else
            {
                if (this.texture)
                {
                    this.texture.baseTexture.scaleMode = 1;
                }
            }
        }

    }

};
