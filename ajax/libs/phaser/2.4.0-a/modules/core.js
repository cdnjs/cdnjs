/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Camera is your view into the game world. It has a position and size and renders only those objects within its field of view.
* The game automatically creates a single Stage sized camera on boot. Move the camera around the world with Phaser.Camera.x/y
*
* @class Phaser.Camera
* @constructor
* @param {Phaser.Game} game - Game reference to the currently running game.
* @param {number} id - Not being used at the moment, will be when Phaser supports multiple camera
* @param {number} x - Position of the camera on the X axis
* @param {number} y - Position of the camera on the Y axis
* @param {number} width - The width of the view rectangle
* @param {number} height - The height of the view rectangle
*/
Phaser.Camera = function (game, id, x, y, width, height) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property {Phaser.World} world - A reference to the game world.
    */
    this.world = game.world;

    /**
    * @property {number} id - Reserved for future multiple camera set-ups.
    * @default
    */
    this.id = 0;

    /**
    * Camera view.
    * The view into the world we wish to render (by default the game dimensions).
    * The x/y values are in world coordinates, not screen coordinates, the width/height is how many pixels to render.
    * Sprites outside of this view are not rendered if Sprite.autoCull is set to `true`. Otherwise they are always rendered.
    * @property {Phaser.Rectangle} view
    */
    this.view = new Phaser.Rectangle(x, y, width, height);

    /**
    * The Camera is bound to this Rectangle and cannot move outside of it. By default it is enabled and set to the size of the World.
    * The Rectangle can be located anywhere in the world and updated as often as you like. If you don't wish the Camera to be bound
    * at all then set this to null. The values can be anything and are in World coordinates, with 0,0 being the top-left of the world.
    * 
    * @property {Phaser.Rectangle} bounds - The Rectangle in which the Camera is bounded. Set to null to allow for movement anywhere.
    */
    this.bounds = new Phaser.Rectangle(x, y, width, height);

    /**
    * @property {Phaser.Rectangle} deadzone - Moving inside this Rectangle will not cause the camera to move.
    */
    this.deadzone = null;

    /**
    * @property {boolean} visible - Whether this camera is visible or not.
    * @default
    */
    this.visible = true;

    /**
    * @property {boolean} roundPx - If a Camera has roundPx set to `true` it will call `view.floor` as part of its update loop, keeping its boundary to integer values. Set this to `false` to disable this from happening.
    * @default
    */
    this.roundPx = true;

    /**
    * @property {boolean} atLimit - Whether this camera is flush with the World Bounds or not.
    */
    this.atLimit = { x: false, y: false };

    /**
    * @property {Phaser.Sprite} target - If the camera is tracking a Sprite, this is a reference to it, otherwise null.
    * @default
    */
    this.target = null;

    /**
    * @property {PIXI.DisplayObject} displayObject - The display object to which all game objects are added. Set by World.boot
    */
    this.displayObject = null;

    /**
    * @property {Phaser.Point} scale - The scale of the display object to which all game objects are added. Set by World.boot
    */
    this.scale = null;

    /**
    * @property {number} totalInView - The total number of Sprites with `autoCull` set to `true` that are visible by this Camera.
    * @readonly
    */
    this.totalInView = 0;

    /**
    * @property {Phaser.Point} _targetPosition - Internal point used to calculate target position
    * @private
    */
    this._targetPosition = new Phaser.Point();

    /**
    * @property {number} edge - Edge property.
    * @private
    * @default
    */
    this._edge = 0;

    /**
    * @property {Phaser.Point} position - Current position of the camera in world.
    * @private
    * @default
    */
    this._position = new Phaser.Point();

};

/**
* @constant
* @type {number}
*/
Phaser.Camera.FOLLOW_LOCKON = 0;

/**
* @constant
* @type {number}
*/
Phaser.Camera.FOLLOW_PLATFORMER = 1;

/**
* @constant
* @type {number}
*/
Phaser.Camera.FOLLOW_TOPDOWN = 2;

/**
* @constant
* @type {number}
*/
Phaser.Camera.FOLLOW_TOPDOWN_TIGHT = 3;

Phaser.Camera.prototype = {

    /**
    * Camera preUpdate. Sets the total view counter to zero.
    *
    * @method Phaser.Camera#preUpdate
    */
    preUpdate: function () {

        this.totalInView = 0;

    },

    /**
    * Tell the camera which sprite to follow.
    * 
    * If you find you're getting a slight "jitter" effect when following a Sprite it's probably to do with sub-pixel rendering of the Sprite position.
    * This can be disabled by setting `game.renderer.renderSession.roundPixels = true` to force full pixel rendering.
    * 
    * @method Phaser.Camera#follow
    * @param {Phaser.Sprite|Phaser.Image|Phaser.Text} target - The object you want the camera to track. Set to null to not follow anything.
    * @param {number} [style] - Leverage one of the existing "deadzone" presets. If you use a custom deadzone, ignore this parameter and manually specify the deadzone after calling follow().
    */
    follow: function (target, style) {

        if (style === undefined) { style = Phaser.Camera.FOLLOW_LOCKON; }

        this.target = target;

        var helper;

        switch (style) {

            case Phaser.Camera.FOLLOW_PLATFORMER:
                var w = this.width / 8;
                var h = this.height / 3;
                this.deadzone = new Phaser.Rectangle((this.width - w) / 2, (this.height - h) / 2 - h * 0.25, w, h);
                break;

            case Phaser.Camera.FOLLOW_TOPDOWN:
                helper = Math.max(this.width, this.height) / 4;
                this.deadzone = new Phaser.Rectangle((this.width - helper) / 2, (this.height - helper) / 2, helper, helper);
                break;

            case Phaser.Camera.FOLLOW_TOPDOWN_TIGHT:
                helper = Math.max(this.width, this.height) / 8;
                this.deadzone = new Phaser.Rectangle((this.width - helper) / 2, (this.height - helper) / 2, helper, helper);
                break;

            case Phaser.Camera.FOLLOW_LOCKON:
                this.deadzone = null;
                break;

            default:
                this.deadzone = null;
                break;
        }

    },

    /**
    * Sets the Camera follow target to null, stopping it from following an object if it's doing so.
    *
    * @method Phaser.Camera#unfollow
    */
    unfollow: function () {

        this.target = null;

    },

    /**
    * Move the camera focus on a display object instantly.
    * @method Phaser.Camera#focusOn
    * @param {any} displayObject - The display object to focus the camera on. Must have visible x/y properties.
    */
    focusOn: function (displayObject) {

        this.setPosition(Math.round(displayObject.x - this.view.halfWidth), Math.round(displayObject.y - this.view.halfHeight));

    },

    /**
    * Move the camera focus on a location instantly.
    * @method Phaser.Camera#focusOnXY
    * @param {number} x - X position.
    * @param {number} y - Y position.
    */
    focusOnXY: function (x, y) {

        this.setPosition(Math.round(x - this.view.halfWidth), Math.round(y - this.view.halfHeight));

    },

    /**
    * Update focusing and scrolling.
    * @method Phaser.Camera#update
    */
    update: function () {

        if (this.target)
        {
            this.updateTarget();
        }

        if (this.bounds)
        {
            this.checkBounds();
        }

        if (this.roundPx)
        {
            this.view.floor();
        }

        this.displayObject.position.x = -this.view.x;
        this.displayObject.position.y = -this.view.y;

    },

    /**
    * Internal method
    * @method Phaser.Camera#updateTarget
    * @private
    */
    updateTarget: function () {

        this._targetPosition.copyFrom(this.target);

        if (this.target.parent)
        {
            this._targetPosition.multiply(this.target.parent.worldTransform.a, this.target.parent.worldTransform.d);
        }

        if (this.deadzone)
        {
            this._edge = this._targetPosition.x - this.view.x;

            if (this._edge < this.deadzone.left)
            {
                this.view.x = this._targetPosition.x - this.deadzone.left;
            }
            else if (this._edge > this.deadzone.right)
            {
                this.view.x = this._targetPosition.x - this.deadzone.right;
            }

            this._edge = this._targetPosition.y - this.view.y;

            if (this._edge < this.deadzone.top)
            {
                this.view.y = this._targetPosition.y - this.deadzone.top;
            }
            else if (this._edge > this.deadzone.bottom)
            {
                this.view.y = this._targetPosition.y - this.deadzone.bottom;
            }
        }
        else
        {
            this.view.x = this._targetPosition.x - this.view.halfWidth;
            this.view.y = this._targetPosition.y - this.view.halfHeight;
        }

    },

    /**
    * Update the Camera bounds to match the game world.
    * @method Phaser.Camera#setBoundsToWorld
    */
    setBoundsToWorld: function () {

        this.bounds.copyFrom(this.game.world.bounds);

    },

    /**
    * Method called to ensure the camera doesn't venture outside of the game world.
    * @method Phaser.Camera#checkBounds
    */
    checkBounds: function () {

        this.atLimit.x = false;
        this.atLimit.y = false;

        //  Make sure we didn't go outside the cameras bounds
        if (this.view.x <= this.bounds.x)
        {
            this.atLimit.x = true;
            this.view.x = this.bounds.x;
        }

        if (this.view.right >= this.bounds.right)
        {
            this.atLimit.x = true;
            this.view.x = this.bounds.right - this.width;
        }

        if (this.view.y <= this.bounds.top)
        {
            this.atLimit.y = true;
            this.view.y = this.bounds.top;
        }

        if (this.view.bottom >= this.bounds.bottom)
        {
            this.atLimit.y = true;
            this.view.y = this.bounds.bottom - this.height;
        }

    },

    /**
    * A helper function to set both the X and Y properties of the camera at once
    * without having to use game.camera.x and game.camera.y.
    *
    * @method Phaser.Camera#setPosition
    * @param {number} x - X position.
    * @param {number} y - Y position.
    */
    setPosition: function (x, y) {

        this.view.x = x;
        this.view.y = y;

        if (this.bounds)
        {
            this.checkBounds();
        }

    },

    /**
    * Sets the size of the view rectangle given the width and height in parameters.
    *
    * @method Phaser.Camera#setSize
    * @param {number} width - The desired width.
    * @param {number} height - The desired height.
    */
    setSize: function (width, height) {

        this.view.width = width;
        this.view.height = height;

    },

    /**
    * Resets the camera back to 0,0 and un-follows any object it may have been tracking.
    *
    * @method Phaser.Camera#reset
    */
    reset: function () {

        this.target = null;
        this.view.x = 0;
        this.view.y = 0;

    }

};

Phaser.Camera.prototype.constructor = Phaser.Camera;

/**
* The Cameras x coordinate. This value is automatically clamped if it falls outside of the World bounds.
* @name Phaser.Camera#x
* @property {number} x - Gets or sets the cameras x position.
*/
Object.defineProperty(Phaser.Camera.prototype, "x", {

    get: function () {
        return this.view.x;
    },

    set: function (value) {

        this.view.x = value;

        if (this.bounds)
        {
            this.checkBounds();
        }
    }

});

/**
* The Cameras y coordinate. This value is automatically clamped if it falls outside of the World bounds.
* @name Phaser.Camera#y
* @property {number} y - Gets or sets the cameras y position.
*/
Object.defineProperty(Phaser.Camera.prototype, "y", {

    get: function () {
        return this.view.y;
    },

    set: function (value) {

        this.view.y = value;

        if (this.bounds)
        {
            this.checkBounds();
        }
    }

});

/**
* The Cameras position. This value is automatically clamped if it falls outside of the World bounds.
* @name Phaser.Camera#position
* @property {Phaser.Point} position - Gets or sets the cameras xy position using Phaser.Point object.
*/
Object.defineProperty(Phaser.Camera.prototype, "position", {

    get: function () {
        this._position.set(this.view.centerX, this.view.centerY);
        return this._position;
    },

    set: function (value) {

        if (typeof value.x !== "undefined") { this.view.x = value.x; }
        if (typeof value.y !== "undefined") { this.view.y = value.y; }

        if (this.bounds)
        {
            this.checkBounds();
        }
    }

});

/**
* The Cameras width. By default this is the same as the Game size and should not be adjusted for now.
* @name Phaser.Camera#width
* @property {number} width - Gets or sets the cameras width.
*/
Object.defineProperty(Phaser.Camera.prototype, "width", {

    get: function () {
        return this.view.width;
    },

    set: function (value) {
        this.view.width = value;
    }

});

/**
* The Cameras height. By default this is the same as the Game size and should not be adjusted for now.
* @name Phaser.Camera#height
* @property {number} height - Gets or sets the cameras height.
*/
Object.defineProperty(Phaser.Camera.prototype, "height", {

    get: function () {
        return this.view.height;
    },

    set: function (value) {
        this.view.height = value;
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Phaser.Create class is a collection of smaller helper methods that allow you to generate game content
* quickly and easily, without the need for any external files. You can create textures for sprites and in
* coming releases we'll add dynamic sound effect generation support as well (like sfxr).
*
* Access this via `State.create` (or `this.create` from within a State object)
* 
* @class Phaser.Create
* @constructor
* @param {Phaser.Game} game - Game reference to the currently running game.
 */
Phaser.Create = function (game) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property {Phaser.BitmapData} bmd - The internal BitmapData Create uses to generate textures from.
    */
    this.bmd = game.make.bitmapData();

    /**
    * @property {HTMLCanvasElement} canvas - The canvas the BitmapData uses.
    */
    this.canvas = this.bmd.canvas;

    /**
    * @property {CanvasRenderingContext2D} context - The 2d context of the canvas.
    */
    this.ctx = this.bmd.context;

    /**
    * @property {array} palettes - A range of 16 color palettes for use with sprite generation.
    */
    this.palettes = [
        { 0: '#000', 1: '#9D9D9D', 2: '#FFF', 3: '#BE2633', 4: '#E06F8B', 5: '#493C2B', 6: '#A46422', 7: '#EB8931', 8: '#F7E26B', 9: '#2F484E', A: '#44891A', B: '#A3CE27', C: '#1B2632', D: '#005784', E: '#31A2F2', F: '#B2DCEF' },
        { 0: '#000', 1: '#191028', 2: '#46af45', 3: '#a1d685', 4: '#453e78', 5: '#7664fe', 6: '#833129', 7: '#9ec2e8', 8: '#dc534b', 9: '#e18d79', A: '#d6b97b', B: '#e9d8a1', C: '#216c4b', D: '#d365c8', E: '#afaab9', F: '#f5f4eb' },
        { 0: '#000', 1: '#2234d1', 2: '#0c7e45', 3: '#44aacc', 4: '#8a3622', 5: '#5c2e78', 6: '#aa5c3d', 7: '#b5b5b5', 8: '#5e606e', 9: '#4c81fb', A: '#6cd947', B: '#7be2f9', C: '#eb8a60', D: '#e23d69', E: '#ffd93f', F: '#fff' },
        { 0: '#000', 1: '#fff', 2: '#8b4131', 3: '#7bbdc5', 4: '#8b41ac', 5: '#6aac41', 6: '#3931a4', 7: '#d5de73', 8: '#945a20', 9: '#5a4100', A: '#bd736a', B: '#525252', C: '#838383', D: '#acee8b', E: '#7b73de', F: '#acacac' },
        { 0: '#000', 1: '#191028', 2: '#46af45', 3: '#a1d685', 4: '#453e78', 5: '#7664fe', 6: '#833129', 7: '#9ec2e8', 8: '#dc534b', 9: '#e18d79', A: '#d6b97b', B: '#e9d8a1', C: '#216c4b', D: '#d365c8', E: '#afaab9', F: '#fff' }
    ];

};

/**
* A 16 color palette by [Arne](http://androidarts.com/palette/16pal.htm)
* @constant
* @type {number}
*/
Phaser.Create.PALETTE_ARNE = 0;

/**
* A 16 color JMP inspired palette.
* @constant
* @type {number}
*/
Phaser.Create.PALETTE_JMP = 1;

/**
* A 16 color CGA inspired palette.
* @constant
* @type {number}
*/
Phaser.Create.PALETTE_CGA = 2;

/**
* A 16 color C64 inspired palette.
* @constant
* @type {number}
*/
Phaser.Create.PALETTE_C64 = 3;

/**
* A 16 color palette inspired by Japanese computers like the MSX.
* @constant
* @type {number}
*/
Phaser.Create.PALETTE_JAPANESE_MACHINE = 4;

Phaser.Create.prototype = {

    /**
     * Generates a new PIXI.Texture from the given data, which can be applied to a Sprite.
     *
     * This allows you to create game graphics quickly and easily, with no external files but that use actual proper images
     * rather than Phaser.Graphics objects, which are expensive to render and limited in scope.
     *
     * Each element of the array is a string holding the pixel color values, as mapped to one of the Phaser.Create PALETTE consts.
     *
     * For example:
     *
     * `var data = [
     *   ' 333 ',
     *   ' 777 ',
     *   'E333E',
     *   ' 333 ',
     *   ' 3 3 '
     * ];`
     *
     * `game.create.texture('bob', data);`
     *
     * The above will create a new texture called `bob`, which will look like a little man wearing a hat. You can then use it
     * for sprites the same way you use any other texture: `game.add.sprite(0, 0, 'bob');`
     *
     * @method Phaser.Create#texture
     * @param {string} key - The key used to store this texture in the Phaser Cache.
     * @param {array} data - An array of pixel data.
     * @param {integer} [pixelWidth=8] - The width of each pixel.
     * @param {integer} [pixelHeight=8] - The height of each pixel.
     * @param {integer} [palette=0] - The palette to use when rendering the texture. One of the Phaser.Create.PALETTE consts.
     * @return {PIXI.Texture} The newly generated texture.
     */
    texture: function (key, data, pixelWidth, pixelHeight, palette) {

        if (pixelWidth === undefined) { pixelWidth = 8; }
        if (pixelHeight === undefined) { pixelHeight = pixelWidth; }
        if (palette === undefined) { palette = 0; }

        var w = data[0].length * pixelWidth;
        var h = data.length * pixelHeight;

        this.bmd.resize(w, h);
        this.bmd.clear();

        //  Draw it
        for (var y = 0; y < data.length; y++)
        {
            var row = data[y];

            for (var x = 0; x < row.length; x++)
            {
                var d = row[x];

                if (d !== '.' && d !== ' ')
                {
                    this.ctx.fillStyle = this.palettes[palette][d];
                    this.ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
                }
            }
        }

        return this.bmd.generateTexture(key);

    },

    /**
     * Creates a grid texture based on the given dimensions.
     *
     * @method Phaser.Create#grid
     * @param {string} key - The key used to store this texture in the Phaser Cache.
     * @param {integer} width - The width of the grid in pixels.
     * @param {integer} height - The height of the grid in pixels.
     * @param {integer} cellWidth - The width of the grid cells in pixels.
     * @param {integer} cellHeight - The height of the grid cells in pixels.
     * @param {string} color - The color to draw the grid lines in. Should be a Canvas supported color string like `#ff5500` or `rgba(200,50,3,0.5)`.
     * @return {PIXI.Texture} The newly generated texture.
     */
    grid: function (key, width, height, cellWidth, cellHeight, color) {

        this.bmd.resize(width, height);

        this.ctx.fillStyle = color;

        for (var y = 0; y < height; y += cellHeight)
        {
            this.ctx.fillRect(0, y, width, 1);
        }

        for (var x = 0; x < width; x += cellWidth)
        {
            this.ctx.fillRect(x, 0, 1, height);
        }

        return this.bmd.generateTexture(key);

    }

};

Phaser.Create.prototype.constructor = Phaser.Create;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* This is a base State class which can be extended if you are creating your own game.
* It provides quick access to common functions such as the camera, cache, input, match, sound and more.
*
* @class Phaser.State
* @constructor
*/
Phaser.State = function () {

    /**
    * @property {Phaser.Game} game - This is a reference to the currently running Game.
    */
    this.game = null;

    /**
    * @property {string} key - The string based identifier given to the State when added into the State Manager.
    */
    this.key = '';

    /**
    * @property {Phaser.GameObjectFactory} add - A reference to the GameObjectFactory which can be used to add new objects to the World.
    */
    this.add = null;

    /**
    * @property {Phaser.GameObjectCreator} make - A reference to the GameObjectCreator which can be used to make new objects.
    */
    this.make = null;

    /**
    * @property {Phaser.Camera} camera - A handy reference to World.camera.
    */
    this.camera = null;

    /**
    * @property {Phaser.Cache} cache - A reference to the game cache which contains any loaded or generated assets, such as images, sound and more.
    */
    this.cache = null;

    /**
    * @property {Phaser.Input} input - A reference to the Input Manager.
    */
    this.input = null;

    /**
    * @property {Phaser.Loader} load - A reference to the Loader, which you mostly use in the preload method of your state to load external assets.
    */
    this.load = null;

    /**
    * @property {Phaser.Math} math - A reference to Math class with lots of helpful functions.
    */
    this.math = null;

    /**
    * @property {Phaser.SoundManager} sound - A reference to the Sound Manager which can create, play and stop sounds, as well as adjust global volume.
    */
    this.sound = null;

    /**
    * @property {Phaser.ScaleManager} scale - A reference to the Scale Manager which controls the way the game scales on different displays.
    */
    this.scale = null;

    /**
    * @property {Phaser.Stage} stage - A reference to the Stage.
    */
    this.stage = null;

    /**
    * @property {Phaser.Time} time - A reference to the game clock and timed events system.
    */
    this.time = null;

    /**
    * @property {Phaser.TweenManager} tweens - A reference to the tween manager.
    */
    this.tweens = null;

    /**
    * @property {Phaser.World} world - A reference to the game world. All objects live in the Game World and its size is not bound by the display resolution.
    */
    this.world = null;

    /**
    * @property {Phaser.Particles} particles - The Particle Manager. It is called during the core gameloop and updates any Particle Emitters it has created.
    */
    this.particles = null;

    /**
    * @property {Phaser.Physics} physics - A reference to the physics manager which looks after the different physics systems available within Phaser.
    */
    this.physics = null;

    /**
    * @property {Phaser.RandomDataGenerator} rnd - A reference to the seeded and repeatable random data generator.
    */
    this.rnd = null;

};

Phaser.State.prototype = {

    /**
    * init is the very first function called when your State starts up. It's called before preload, create or anything else.
    * If you need to route the game away to another State you could do so here, or if you need to prepare a set of variables
    * or objects before the preloading starts.
    *
    * @method Phaser.State#init
    */
    init: function () {
    },

    /**
    * preload is called first. Normally you'd use this to load your game assets (or those needed for the current State)
    * You shouldn't create any objects in this method that require assets that you're also loading in this method, as
    * they won't yet be available.
    *
    * @method Phaser.State#preload
    */
    preload: function () {
    },

    /**
    * loadUpdate is called during the Loader process. This only happens if you've set one or more assets to load in the preload method.
    *
    * @method Phaser.State#loadUpdate
    */
    loadUpdate: function () {
    },

    /**
    * loadRender is called during the Loader process. This only happens if you've set one or more assets to load in the preload method.
    * The difference between loadRender and render is that any objects you render in this method you must be sure their assets exist.
    *
    * @method Phaser.State#loadRender
    */
    loadRender: function () {
    },

    /**
    * create is called once preload has completed, this includes the loading of any assets from the Loader.
    * If you don't have a preload method then create is the first method called in your State.
    *
    * @method Phaser.State#create
    */
    create: function () {
    },

    /**
    * The update method is left empty for your own use.
    * It is called during the core game loop AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
    * If is called BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
    *
    * @method Phaser.State#update
    */
    update: function () {
    },

    /**
    * The preRender method is called after all Game Objects have been updated, but before any rendering takes place.
    *
    * @method Phaser.State#preRender
    */
    preRender: function () {
    },

    /**
    * Nearly all display objects in Phaser render automatically, you don't need to tell them to render.
    * However the render method is called AFTER the game renderer and plugins have rendered, so you're able to do any
    * final post-processing style effects here. Note that this happens before plugins postRender takes place.
    *
    * @method Phaser.State#render
    */
    render: function () {
    },

    /**
    * If your game is set to Scalemode RESIZE then each time the browser resizes it will call this function, passing in the new width and height.
    *
    * @method Phaser.State#resize
    */
    resize: function () {
    },

    /**
    * This method will be called if the core game loop is paused.
    *
    * @method Phaser.State#paused
    */
    paused: function () {
    },

    /**
    * This method will be called when the core game loop resumes from a paused state.
    *
    * @method Phaser.State#resumed
    */
    resumed: function () {
    },

    /**
    * pauseUpdate is called while the game is paused instead of preUpdate, update and postUpdate.
    *
    * @method Phaser.State#pauseUpdate
    */
    pauseUpdate: function () {
    },

    /**
    * This method will be called when the State is shutdown (i.e. you switch to another state from this one).
    *
    * @method Phaser.State#shutdown
    */
    shutdown: function () {
    }

};

Phaser.State.prototype.constructor = Phaser.State;

/* jshint newcap: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The State Manager is responsible for loading, setting up and switching game states.
*
* @class Phaser.StateManager
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {Phaser.State|Object} [pendingState=null] - A State object to seed the manager with.
*/
Phaser.StateManager = function (game, pendingState) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property {object} states - The object containing Phaser.States.
    */
    this.states = {};

    /**
    * @property {Phaser.State} _pendingState - The state to be switched to in the next frame.
    * @private
    */
    this._pendingState = null;

    if (typeof pendingState !== 'undefined' && pendingState !== null)
    {
        this._pendingState = pendingState;
    }

    /**
    * @property {boolean} _clearWorld - Clear the world when we switch state?
    * @private
    */
    this._clearWorld = false;

    /**
    * @property {boolean} _clearCache - Clear the cache when we switch state?
    * @private
    */
    this._clearCache = false;

    /**
    * @property {boolean} _created - Flag that sets if the State has been created or not.
    * @private
    */
    this._created = false;

    /**
    * @property {any[]} _args - Temporary container when you pass vars from one State to another.
    * @private
    */
    this._args = [];

    /**
    * @property {string} current - The current active State object.
    * @default
    */
    this.current = '';

    /**
    * onStateChange is a Phaser.Signal that is dispatched whenever the game changes state.
    * 
    * It is dispatched only when the new state is started, which isn't usually at the same time as StateManager.start
    * is called because state swapping is done in sync with the game loop. It is dispatched *before* any of the new states
    * methods (such as preload and create) are called, and *after* the previous states shutdown method has been run.
    *
    * The callback you specify is sent two parameters: the string based key of the new state, 
    * and the second parameter is the string based key of the old / previous state.
    * 
    * @property {Phaser.Signal} onStateChange
    */
    this.onStateChange = new Phaser.Signal();

    /**
    * @property {function} onInitCallback - This is called when the state is set as the active state.
    * @default
    */
    this.onInitCallback = null;

    /**
    * @property {function} onPreloadCallback - This is called when the state starts to load assets.
    * @default
    */
    this.onPreloadCallback = null;

    /**
    * @property {function} onCreateCallback - This is called when the state preload has finished and creation begins.
    * @default
    */
    this.onCreateCallback = null;

    /**
    * @property {function} onUpdateCallback - This is called when the state is updated, every game loop. It doesn't happen during preload (@see onLoadUpdateCallback).
    * @default
    */
    this.onUpdateCallback = null;

    /**
    * @property {function} onRenderCallback - This is called post-render. It doesn't happen during preload (see onLoadRenderCallback).
    * @default
    */
    this.onRenderCallback = null;

    /**
    * @property {function} onResizeCallback - This is called if ScaleManager.scalemode is RESIZE and a resize event occurs. It's passed the new width and height.
    * @default
    */
    this.onResizeCallback = null;

    /**
    * @property {function} onPreRenderCallback - This is called before the state is rendered and before the stage is cleared but after all game objects have had their final properties adjusted.
    * @default
    */
    this.onPreRenderCallback = null;

    /**
    * @property {function} onLoadUpdateCallback - This is called when the State is updated during the preload phase.
    * @default
    */
    this.onLoadUpdateCallback = null;

    /**
    * @property {function} onLoadRenderCallback - This is called when the State is rendered during the preload phase.
    * @default
    */
    this.onLoadRenderCallback = null;

    /**
    * @property {function} onPausedCallback - This is called when the game is paused.
    * @default
    */
    this.onPausedCallback = null;

    /**
    * @property {function} onResumedCallback - This is called when the game is resumed from a paused state.
    * @default
    */
    this.onResumedCallback = null;

    /**
    * @property {function} onPauseUpdateCallback - This is called every frame while the game is paused.
    * @default
    */
    this.onPauseUpdateCallback = null;

    /**
    * @property {function} onShutDownCallback - This is called when the state is shut down (i.e. swapped to another state).
    * @default
    */
    this.onShutDownCallback = null;

};

Phaser.StateManager.prototype = {

    /**
    * The Boot handler is called by Phaser.Game when it first starts up.
    * @method Phaser.StateManager#boot
    * @private
    */
    boot: function () {

        this.game.onPause.add(this.pause, this);
        this.game.onResume.add(this.resume, this);

        if (this._pendingState !== null && typeof this._pendingState !== 'string')
        {
            this.add('default', this._pendingState, true);
        }

    },

    /**
    * Adds a new State into the StateManager. You must give each State a unique key by which you'll identify it.
    * The State can be either a Phaser.State object (or an object that extends it), a plain JavaScript object or a function.
    * If a function is given a new state object will be created by calling it.
    *
    * @method Phaser.StateManager#add
    * @param {string} key - A unique key you use to reference this state, i.e. "MainMenu", "Level1".
    * @param {Phaser.State|object|function} state  - The state you want to switch to.
    * @param {boolean} [autoStart=false]  - If true the State will be started immediately after adding it.
    */
    add: function (key, state, autoStart) {

        if (autoStart === undefined) { autoStart = false; }

        var newState;

        if (state instanceof Phaser.State)
        {
            newState = state;
        }
        else if (typeof state === 'object')
        {
            newState = state;
            newState.game = this.game;
        }
        else if (typeof state === 'function')
        {
            newState = new state(this.game);
        }

        this.states[key] = newState;

        if (autoStart)
        {
            if (this.game.isBooted)
            {
                this.start(key);
            }
            else
            {
                this._pendingState = key;
            }
        }

        return newState;

    },

    /**
    * Delete the given state.
    * @method Phaser.StateManager#remove
    * @param {string} key - A unique key you use to reference this state, i.e. "MainMenu", "Level1".
    */
    remove: function (key) {

        if (this.current === key)
        {
            this.callbackContext = null;

            this.onInitCallback = null;
            this.onShutDownCallback = null;

            this.onPreloadCallback = null;
            this.onLoadRenderCallback = null;
            this.onLoadUpdateCallback = null;
            this.onCreateCallback = null;
            this.onUpdateCallback = null;
            this.onPreRenderCallback = null;
            this.onRenderCallback = null;
            this.onResizeCallback = null;
            this.onPausedCallback = null;
            this.onResumedCallback = null;
            this.onPauseUpdateCallback = null;
        }

        delete this.states[key];

    },

    /**
    * Start the given State. If a State is already running then State.shutDown will be called (if it exists) before switching to the new State.
    *
    * @method Phaser.StateManager#start
    * @param {string} key - The key of the state you want to start.
    * @param {boolean} [clearWorld=true] - Clear everything in the world? This clears the World display list fully (but not the Stage, so if you've added your own objects to the Stage they will need managing directly)
    * @param {boolean} [clearCache=false] - Clear the Game.Cache? This purges out all loaded assets. The default is false and you must have clearWorld=true if you want to clearCache as well.
    * @param {...*} parameter - Additional parameters that will be passed to the State.init function (if it has one).
    */
    start: function (key, clearWorld, clearCache) {

        if (clearWorld === undefined) { clearWorld = true; }
        if (clearCache === undefined) { clearCache = false; }

        if (this.checkState(key))
        {
            //  Place the state in the queue. It will be started the next time the game loop begins.
            this._pendingState = key;
            this._clearWorld = clearWorld;
            this._clearCache = clearCache;

            if (arguments.length > 3)
            {
                this._args = Array.prototype.splice.call(arguments, 3);
            }
        }

    },

    /**
    * Restarts the current State. State.shutDown will be called (if it exists) before the State is restarted.
    *
    * @method Phaser.StateManager#restart
    * @param {boolean} [clearWorld=true] - Clear everything in the world? This clears the World display list fully (but not the Stage, so if you've added your own objects to the Stage they will need managing directly)
    * @param {boolean} [clearCache=false] - Clear the Game.Cache? This purges out all loaded assets. The default is false and you must have clearWorld=true if you want to clearCache as well.
    * @param {...*} parameter - Additional parameters that will be passed to the State.init function if it has one.
    */
    restart: function (clearWorld, clearCache) {

        if (clearWorld === undefined) { clearWorld = true; }
        if (clearCache === undefined) { clearCache = false; }

        //  Place the state in the queue. It will be started the next time the game loop starts.
        this._pendingState = this.current;
        this._clearWorld = clearWorld;
        this._clearCache = clearCache;

        if (arguments.length > 2)
        {
            this._args = Array.prototype.splice.call(arguments, 2);
        }

    },

    /**
    * Used by onInit and onShutdown when those functions don't exist on the state
    * @method Phaser.StateManager#dummy
    * @private
    */
    dummy: function () {
    },

    /**
    * preUpdate is called right at the start of the game loop. It is responsible for changing to a new state that was requested previously.
    *
    * @method Phaser.StateManager#preUpdate
    */
    preUpdate: function () {

        if (this._pendingState && this.game.isBooted)
        {
            var previousStateKey = this.current;

            //  Already got a state running?
            this.clearCurrentState();

            this.setCurrentState(this._pendingState);

            this.onStateChange.dispatch(this.current, previousStateKey);

            if (this.current !== this._pendingState)
            {
                return;
            }
            else
            {
                this._pendingState = null;
            }

            //  If StateManager.start has been called from the init of a State that ALSO has a preload, then
            //  onPreloadCallback will be set, but must be ignored
            if (this.onPreloadCallback)
            {
                this.game.load.reset(true);
                this.onPreloadCallback.call(this.callbackContext, this.game);

                //  Is the loader empty?
                if (this.game.load.totalQueuedFiles() === 0 && this.game.load.totalQueuedPacks() === 0)
                {
                    this.loadComplete();
                }
                else
                {
                    //  Start the loader going as we have something in the queue
                    this.game.load.start();
                }
            }
            else
            {
                //  No init? Then there was nothing to load either
                this.loadComplete();
            }
        }

    },

    /**
    * This method clears the current State, calling its shutdown callback. The process also removes any active tweens,
    * resets the camera, resets input, clears physics, removes timers and if set clears the world and cache too.
    *
    * @method Phaser.StateManager#clearCurrentState
    */
    clearCurrentState: function () {

        if (this.current)
        {
            if (this.onShutDownCallback)
            {
                this.onShutDownCallback.call(this.callbackContext, this.game);
            }

            this.game.tweens.removeAll();

            this.game.camera.reset();

            this.game.input.reset(true);

            this.game.physics.clear();

            this.game.time.removeAll();

            this.game.scale.reset(this._clearWorld);

            if (this.game.debug)
            {
                this.game.debug.reset();
            }

            if (this._clearWorld)
            {
                this.game.world.shutdown();

                if (this._clearCache === true)
                {
                    this.game.cache.destroy();
                }
            }
        }

    },

    /**
    * Checks if a given phaser state is valid. A State is considered valid if it has at least one of the core functions: preload, create, update or render.
    *
    * @method Phaser.StateManager#checkState
    * @param {string} key - The key of the state you want to check.
    * @return {boolean} true if the State has the required functions, otherwise false.
    */
    checkState: function (key) {

        if (this.states[key])
        {
            var valid = false;

            if (this.states[key]['preload'] || this.states[key]['create'] || this.states[key]['update'] || this.states[key]['render'])
            {
                valid = true;
            }

            if (valid === false)
            {
                console.warn("Invalid Phaser State object given. Must contain at least a one of the required functions: preload, create, update or render");
                return false;
            }

            return true;
        }
        else
        {
            console.warn("Phaser.StateManager - No state found with the key: " + key);
            return false;
        }

    },

    /**
    * Links game properties to the State given by the key.
    *
    * @method Phaser.StateManager#link
    * @param {string} key - State key.
    * @protected
    */
    link: function (key) {

        this.states[key].game = this.game;
        this.states[key].add = this.game.add;
        this.states[key].make = this.game.make;
        this.states[key].camera = this.game.camera;
        this.states[key].cache = this.game.cache;
        this.states[key].input = this.game.input;
        this.states[key].load = this.game.load;
        this.states[key].math = this.game.math;
        this.states[key].sound = this.game.sound;
        this.states[key].scale = this.game.scale;
        this.states[key].state = this;
        this.states[key].stage = this.game.stage;
        this.states[key].time = this.game.time;
        this.states[key].tweens = this.game.tweens;
        this.states[key].world = this.game.world;
        this.states[key].particles = this.game.particles;
        this.states[key].rnd = this.game.rnd;
        this.states[key].physics = this.game.physics;
        this.states[key].key = key;

    },

    /**
    * Nulls all State level Phaser properties, including a reference to Game.
    *
    * @method Phaser.StateManager#unlink
    * @param {string} key - State key.
    * @protected
    */
    unlink: function (key) {

        if (this.states[key])
        {
            this.states[key].game = null;
            this.states[key].add = null;
            this.states[key].make = null;
            this.states[key].camera = null;
            this.states[key].cache = null;
            this.states[key].input = null;
            this.states[key].load = null;
            this.states[key].math = null;
            this.states[key].sound = null;
            this.states[key].scale = null;
            this.states[key].state = null;
            this.states[key].stage = null;
            this.states[key].time = null;
            this.states[key].tweens = null;
            this.states[key].world = null;
            this.states[key].particles = null;
            this.states[key].rnd = null;
            this.states[key].physics = null;
        }

    },

    /**
    * Sets the current State. Should not be called directly (use StateManager.start)
    *
    * @method Phaser.StateManager#setCurrentState
    * @param {string} key - State key.
    * @private
    */
    setCurrentState: function (key) {

        this.callbackContext = this.states[key];

        this.link(key);

        //  Used when the state is set as being the current active state
        this.onInitCallback = this.states[key]['init'] || this.dummy;

        this.onPreloadCallback = this.states[key]['preload'] || null;
        this.onLoadRenderCallback = this.states[key]['loadRender'] || null;
        this.onLoadUpdateCallback = this.states[key]['loadUpdate'] || null;
        this.onCreateCallback = this.states[key]['create'] || null;
        this.onUpdateCallback = this.states[key]['update'] || null;
        this.onPreRenderCallback = this.states[key]['preRender'] || null;
        this.onRenderCallback = this.states[key]['render'] || null;
        this.onResizeCallback = this.states[key]['resize'] || null;
        this.onPausedCallback = this.states[key]['paused'] || null;
        this.onResumedCallback = this.states[key]['resumed'] || null;
        this.onPauseUpdateCallback = this.states[key]['pauseUpdate'] || null;

        //  Used when the state is no longer the current active state
        this.onShutDownCallback = this.states[key]['shutdown'] || this.dummy;

        //  Reset the physics system, but not on the first state start
        if (this.current !== '')
        {
            this.game.physics.reset();
        }

        this.current = key;
        this._created = false;

        //  At this point key and pendingState should equal each other
        this.onInitCallback.apply(this.callbackContext, this._args);

        //  If they no longer do then the init callback hit StateManager.start
        if (key === this._pendingState)
        {
            this._args = [];
        }

        this.game._kickstart = true;

    },

    /**
     * Gets the current State.
     *
     * @method Phaser.StateManager#getCurrentState
     * @return Phaser.State
     * @public
     */
    getCurrentState: function() {
        return this.states[this.current];
    },

    /**
    * @method Phaser.StateManager#loadComplete
    * @protected
    */
    loadComplete: function () {

        if (this._created === false && this.onCreateCallback)
        {
            this._created = true;
            this.onCreateCallback.call(this.callbackContext, this.game);
        }
        else
        {
            this._created = true;
        }

    },

    /**
    * @method Phaser.StateManager#pause
    * @protected
    */
    pause: function () {

        if (this._created && this.onPausedCallback)
        {
            this.onPausedCallback.call(this.callbackContext, this.game);
        }

    },

    /**
    * @method Phaser.StateManager#resume
    * @protected
    */
    resume: function () {

        if (this._created && this.onResumedCallback)
        {
            this.onResumedCallback.call(this.callbackContext, this.game);
        }

    },

    /**
    * @method Phaser.StateManager#update
    * @protected
    */
    update: function () {

        if (this._created)
        {
            if (this.onUpdateCallback)
            {
                this.onUpdateCallback.call(this.callbackContext, this.game);
            }
        }
        else
        {
            if (this.onLoadUpdateCallback)
            {
                this.onLoadUpdateCallback.call(this.callbackContext, this.game);
            }
        }

    },

    /**
    * @method Phaser.StateManager#pauseUpdate
    * @protected
    */
    pauseUpdate: function () {

        if (this._created)
        {
            if (this.onPauseUpdateCallback)
            {
                this.onPauseUpdateCallback.call(this.callbackContext, this.game);
            }
        }
        else
        {
            if (this.onLoadUpdateCallback)
            {
                this.onLoadUpdateCallback.call(this.callbackContext, this.game);
            }
        }

    },

    /**
    * @method Phaser.StateManager#preRender
    * @protected
    * @param {number} elapsedTime - The time elapsed since the last update.
    */
    preRender: function (elapsedTime) {

        if (this._created && this.onPreRenderCallback)
        {
            this.onPreRenderCallback.call(this.callbackContext, this.game, elapsedTime);
        }

    },

    /**
    * @method Phaser.StateManager#resize
    * @protected
    */
    resize: function (width, height) {

        if (this.onResizeCallback)
        {
            this.onResizeCallback.call(this.callbackContext, width, height);
        }

    },

    /**
    * @method Phaser.StateManager#render
    * @protected
    */
    render: function () {

        if (this._created)
        {
            if (this.onRenderCallback)
            {
                if (this.game.renderType === Phaser.CANVAS)
                {
                    this.game.context.save();
                    this.game.context.setTransform(1, 0, 0, 1, 0, 0);
                    this.onRenderCallback.call(this.callbackContext, this.game);
                    this.game.context.restore();
                }
                else
                {
                    this.onRenderCallback.call(this.callbackContext, this.game);
                }
            }
        }
        else
        {
            if (this.onLoadRenderCallback)
            {
                this.onLoadRenderCallback.call(this.callbackContext, this.game);
            }
        }

    },

    /**
    * Removes all StateManager callback references to the State object, nulls the game reference and clears the States object.
    * You don't recover from this without rebuilding the Phaser instance again.
    * @method Phaser.StateManager#destroy
    */
    destroy: function () {

        this.clearCurrentState();

        this.callbackContext = null;

        this.onInitCallback = null;
        this.onShutDownCallback = null;

        this.onPreloadCallback = null;
        this.onLoadRenderCallback = null;
        this.onLoadUpdateCallback = null;
        this.onCreateCallback = null;
        this.onUpdateCallback = null;
        this.onRenderCallback = null;
        this.onPausedCallback = null;
        this.onResumedCallback = null;
        this.onPauseUpdateCallback = null;

        this.game = null;
        this.states = {};
        this._pendingState = null;
        this.current = '';

    }

};

Phaser.StateManager.prototype.constructor = Phaser.StateManager;

/**
* @name Phaser.StateManager#created
* @property {boolean} created - True if the current state has had its `create` method run (if it has one, if not this is true by default).
* @readOnly
*/
Object.defineProperty(Phaser.StateManager.prototype, "created", {

    get: function () {

        return this._created;

    }

});

/**
* @author       Miller Medeiros http://millermedeiros.github.com/js-signals/
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Signal is an event dispatch mechansim that supports broadcasting to multiple listeners.
*
* Event listeners are uniquely identified by the listener/callback function and the context.
* 
* @class Phaser.Signal
* @constructor
*/
Phaser.Signal = function () {
};

Phaser.Signal.prototype = {

    /**
    * @property {?Array.<Phaser.SignalBinding>} _bindings - Internal variable.
    * @private
    */
    _bindings: null,

    /**
    * @property {any} _prevParams - Internal variable.
    * @private
    */
    _prevParams: null,

    /**
    * Memorize the previously dispatched event?
    *
    * If an event has been memorized it is automatically dispatched when a new listener is added with {@link #add} or {@link #addOnce}.
    * Use {@link #forget} to clear any currently memorized event.
    *
    * @property {boolean} memorize
    */
    memorize: false,

    /**
    * @property {boolean} _shouldPropagate
    * @private
    */
    _shouldPropagate: true,

    /**
    * Is the Signal active? Only active signals will broadcast dispatched events.
    *
    * Setting this property during a dispatch will only affect the next dispatch. To stop the propagation of a signal from a listener use {@link #halt}.
    *
    * @property {boolean} active
    * @default
    */
    active: true,

    /**
    * @property {function} _boundDispatch - The bound dispatch function, if any.
    * @private
    */
    _boundDispatch: true,

    /**
    * @method Phaser.Signal#validateListener
    * @param {function} listener - Signal handler function.
    * @param {string} fnName - Function name.
    * @private
    */
    validateListener: function (listener, fnName) {

        if (typeof listener !== 'function')
        {
            throw new Error('Phaser.Signal: listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
        }

    },

    /**
    * @method Phaser.Signal#_registerListener
    * @private
    * @param {function} listener - Signal handler function.
    * @param {boolean} isOnce - Should the listener only be called once?
    * @param {object} [listenerContext] - The context under which the listener is invoked.
    * @param {number} [priority] - The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0).
    * @return {Phaser.SignalBinding} An Object representing the binding between the Signal and listener.
    */
    _registerListener: function (listener, isOnce, listenerContext, priority, args) {

        var prevIndex = this._indexOfListener(listener, listenerContext);
        var binding;

        if (prevIndex !== -1)
        {
            binding = this._bindings[prevIndex];

            if (binding.isOnce() !== isOnce)
            {
                throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
            }
        }
        else
        {
            binding = new Phaser.SignalBinding(this, listener, isOnce, listenerContext, priority, args);
            this._addBinding(binding);
        }

        if (this.memorize && this._prevParams)
        {
            binding.execute(this._prevParams);
        }

        return binding;

    },

    /**
    * @method Phaser.Signal#_addBinding
    * @private
    * @param {Phaser.SignalBinding} binding - An Object representing the binding between the Signal and listener.
    */
    _addBinding: function (binding) {

        if (!this._bindings)
        {
            this._bindings = [];
        }

        //  Simplified insertion sort
        var n = this._bindings.length;

        do {
            n--;
        }
        while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);

        this._bindings.splice(n + 1, 0, binding);

    },

    /**
    * @method Phaser.Signal#_indexOfListener
    * @private
    * @param {function} listener - Signal handler function.
    * @param {object} [context=null] - Signal handler function.
    * @return {number} The index of the listener within the private bindings array.
    */
    _indexOfListener: function (listener, context) {

        if (!this._bindings)
        {
            return -1;
        }

        if (context === undefined) { context = null; }

        var n = this._bindings.length;
        var cur;

        while (n--)
        {
            cur = this._bindings[n];

            if (cur._listener === listener && cur.context === context)
            {
                return n;
            }
        }

        return -1;

    },

    /**
    * Check if a specific listener is attached.
    *
    * @method Phaser.Signal#has
    * @param {function} listener - Signal handler function.
    * @param {object} [context] - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
    * @return {boolean} If Signal has the specified listener.
    */
    has: function (listener, context) {

        return this._indexOfListener(listener, context) !== -1;

    },

    /**
    * Add an event listener for this signal.
    *
    * An event listener is a callback with a related context and priority.
    *
    * You can optionally provide extra arguments which will be passed to the callback after any internal parameters.
    *
    * For example: `Phaser.Key.onDown` when dispatched will send the Phaser.Key object that caused the signal as the first parameter.
    * Any arguments you've specified after `priority` will be sent as well:
    *
    * `fireButton.onDown.add(shoot, this, 0, 'lazer', 100);`
    *
    * When onDown dispatches it will call the `shoot` callback passing it: `Phaser.Key, 'lazer', 100`.
    *
    * Where the first parameter is the one that Key.onDown dispatches internally and 'lazer', 
    * and the value 100 were the custom arguments given in the call to 'add'.
    *
    * @method Phaser.Signal#add
    * @param {function} listener - The function to call when this Signal is dispatched.
    * @param {object} [listenerContext] - The context under which the listener will be executed (i.e. the object that should represent the `this` variable).
    * @param {number} [priority] - The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added (default = 0)
    * @param {...any} [args=(none)] - Additional arguments to pass to the callback (listener) function. They will be appended after any arguments usually dispatched.
    * @return {Phaser.SignalBinding} An Object representing the binding between the Signal and listener.
    */
    add: function (listener, listenerContext, priority) {

        this.validateListener(listener, 'add');

        var args = [];

        if (arguments.length > 3)
        {
            for (var i = 3; i < arguments.length; i++)
            {
                args.push(arguments[i]);
            }
        }

        return this._registerListener(listener, false, listenerContext, priority, args);

    },

    /**
    * Add a one-time listener - the listener is automatically removed after the first execution.
    *
    * If there is as {@link Phaser.Signal#memorize memorized} event then it will be dispatched and
    * the listener will be removed immediately.
    *
    * @method Phaser.Signal#addOnce
    * @param {function} listener - The function to call when this Signal is dispatched.
    * @param {object} [listenerContext] - The context under which the listener will be executed (i.e. the object that should represent the `this` variable).
    * @param {number} [priority] - The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added (default = 0)
    * @param {...any} [args=(none)] - Additional arguments to pass to the callback (listener) function. They will be appended after any arguments usually dispatched.
    * @return {Phaser.SignalBinding} An Object representing the binding between the Signal and listener.
    */
    addOnce: function (listener, listenerContext, priority) {

        this.validateListener(listener, 'addOnce');

        var args = [];

        if (arguments.length > 3)
        {
            for (var i = 3; i < arguments.length; i++)
            {
                args.push(arguments[i]);
            }
        }

        return this._registerListener(listener, true, listenerContext, priority, args);

    },

    /**
    * Remove a single event listener.
    *
    * @method Phaser.Signal#remove
    * @param {function} listener - Handler function that should be removed.
    * @param {object} [context=null] - Execution context (since you can add the same handler multiple times if executing in a different context).
    * @return {function} Listener handler function.
    */
    remove: function (listener, context) {

        this.validateListener(listener, 'remove');

        var i = this._indexOfListener(listener, context);

        if (i !== -1)
        {
            this._bindings[i]._destroy(); //no reason to a Phaser.SignalBinding exist if it isn't attached to a signal
            this._bindings.splice(i, 1);
        }

        return listener;

    },

    /**
    * Remove all event listeners.
    *
    * @method Phaser.Signal#removeAll
    * @param {object} [context=null] - If specified only listeners for the given context will be removed.
    */
    removeAll: function (context) {

        if (context === undefined) { context = null; }

        if (!this._bindings)
        {
            return;
        }

        var n = this._bindings.length;

        while (n--)
        {
            if (context)
            {
                if (this._bindings[n].context === context)
                {
                    this._bindings[n]._destroy();
                    this._bindings.splice(n, 1);
                }
            }
            else
            {
                this._bindings[n]._destroy();
            }
        }

        if (!context)
        {
            this._bindings.length = 0;
        }

    },

    /**
    * Gets the total number of listeners attached to this Signal.
    *
    * @method Phaser.Signal#getNumListeners
    * @return {integer} Number of listeners attached to the Signal.
    */
    getNumListeners: function () {

        return this._bindings ? this._bindings.length : 0;

    },

    /**
    * Stop propagation of the event, blocking the dispatch to next listener on the queue.
    *
    * This should be called only during event dispatch as calling it before/after dispatch won't affect another broadcast.
    * See {@link #active} to enable/disable the signal entirely.
    *
    * @method Phaser.Signal#halt
    */
    halt: function () {

        this._shouldPropagate = false;

    },

    /**
    * Dispatch / broadcast the event to all listeners.
    *
    * To create an instance-bound dispatch for this Signal, use {@link #boundDispatch}.
    *
    * @method Phaser.Signal#dispatch
    * @param {any} [params] - Parameters that should be passed to each handler.
    */
    dispatch: function () {

        if (!this.active || !this._bindings)
        {
            return;
        }

        var paramsArr = Array.prototype.slice.call(arguments);
        var n = this._bindings.length;
        var bindings;

        if (this.memorize)
        {
            this._prevParams = paramsArr;
        }

        if (!n)
        {
            //  Should come after memorize
            return;
        }

        bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
        this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

        //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
        //reverse loop since listeners with higher priority will be added at the end of the list
        do {
            n--;
        }
        while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);

    },

    /**
    * Forget the currently {@link Phaser.Signal#memorize memorized} event, if any.
    *
    * @method Phaser.Signal#forget
    */
    forget: function() {

        if (this._prevParams)
        {
            this._prevParams = null;
        }

    },

    /**
    * Dispose the signal - no more events can be dispatched.
    *
    * This removes all event listeners and clears references to external objects.
    * Calling methods on a disposed objects results in undefined behavior.
    *
    * @method Phaser.Signal#dispose
    */
    dispose: function () {

        this.removeAll();

        this._bindings = null;
        if (this._prevParams)
        {
            this._prevParams = null;
        }

    },

    /**
    * A string representation of the object.
    *
    * @method Phaser.Signal#toString
    * @return {string} String representation of the object.
    */
    toString: function () {

        return '[Phaser.Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';

    }

};

/**
* Create a `dispatch` function that maintains a binding to the original Signal context.
*
* Use the resulting value if the dispatch function needs to be passed somewhere
* or called independently of the Signal object.
*
* @memberof Phaser.Signal
* @property {function} boundDispatch
*/
Object.defineProperty(Phaser.Signal.prototype, "boundDispatch", {

    get: function () {
        var _this = this;
        return this._boundDispatch || (this._boundDispatch = function () {
            return _this.dispatch.apply(_this, arguments);
        });
    }

});

Phaser.Signal.prototype.constructor = Phaser.Signal;

/**
* @author       Miller Medeiros http://millermedeiros.github.com/js-signals/
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Object that represents a binding between a Signal and a listener function.
* This is an internal constructor and shouldn't be created directly.
* Inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
* 
* @class Phaser.SignalBinding
* @constructor
* @param {Phaser.Signal} signal - Reference to Signal object that listener is currently bound to.
* @param {function} listener - Handler function bound to the signal.
* @param {boolean} isOnce - If binding should be executed just once.
* @param {object} [listenerContext=null] - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
* @param {number} [priority] - The priority level of the event listener. (default = 0).
* @param {...any} [args=(none)] - Additional arguments to pass to the callback (listener) function. They will be appended after any arguments usually dispatched.
*/
Phaser.SignalBinding = function (signal, listener, isOnce, listenerContext, priority, args) {

    /**
    * @property {Phaser.Game} _listener - Handler function bound to the signal.
    * @private
    */
    this._listener = listener;

    if (isOnce)
    {
        this._isOnce = true;
    }

    if (listenerContext != null) /* not null/undefined */
    {
        this.context = listenerContext;
    }

    /**
    * @property {Phaser.Signal} _signal - Reference to Signal object that listener is currently bound to.
    * @private
    */
    this._signal = signal;

    if (priority)
    {
        this._priority = priority;
    }

    if (args && args.length)
    {
        this._args = args;
    }

};

Phaser.SignalBinding.prototype = {

    /**
    * @property {?object} context - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
    */
    context: null,

    /**
    * @property {boolean} _isOnce - If binding should be executed just once.
    * @private
    */
    _isOnce: false,

    /**
    * @property {number} _priority - Listener priority.
    * @private
    */
    _priority: 0,

    /**
    * @property {array} _args - Listener arguments.
    * @private
    */
    _args: null,

    /**
    * @property {number} callCount - The number of times the handler function has been called.
    */
    callCount: 0,

    /**
    * If binding is active and should be executed.
    * @property {boolean} active
    * @default
    */
    active: true,

    /**
    * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute` (curried parameters).
    * @property {array|null} params
    * @default
    */
    params: null,

    /**
    * Call listener passing arbitrary parameters.
    * If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.
    * @method Phaser.SignalBinding#execute
    * @param {any[]} [paramsArr] - Array of parameters that should be passed to the listener.
    * @return {any} Value returned by the listener.
    */
    execute: function(paramsArr) {

        var handlerReturn, params;

        if (this.active && !!this._listener)
        {
            params = this.params ? this.params.concat(paramsArr) : paramsArr;

            if (this._args)
            {
                params = params.concat(this._args);
            }

            handlerReturn = this._listener.apply(this.context, params);

            this.callCount++;

            if (this._isOnce)
            {
                this.detach();
            }
        }

        return handlerReturn;

    },

    /**
    * Detach binding from signal.
    * alias to: @see mySignal.remove(myBinding.getListener());
    * @method Phaser.SignalBinding#detach
    * @return {function|null} Handler function bound to the signal or `null` if binding was previously detached.
    */
    detach: function () {
        return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
    },

    /**
    * @method Phaser.SignalBinding#isBound
    * @return {boolean} True if binding is still bound to the signal and has a listener.
    */
    isBound: function () {
        return (!!this._signal && !!this._listener);
    },

    /**
    * @method Phaser.SignalBinding#isOnce
    * @return {boolean} If SignalBinding will only be executed once.
    */
    isOnce: function () {
        return this._isOnce;
    },

    /**
    * @method Phaser.SignalBinding#getListener
    * @return {function} Handler function bound to the signal.
    */
    getListener: function () {
        return this._listener;
    },

    /**
    * @method Phaser.SignalBinding#getSignal
    * @return {Phaser.Signal} Signal that listener is currently bound to.
    */
    getSignal: function () {
        return this._signal;
    },

    /**
    * Delete instance properties
    * @method Phaser.SignalBinding#_destroy
    * @private
    */
    _destroy: function () {
        delete this._signal;
        delete this._listener;
        delete this.context;
    },

    /**
    * @method Phaser.SignalBinding#toString
    * @return {string} String representation of the object.
    */
    toString: function () {
        return '[Phaser.SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
    }

};

Phaser.SignalBinding.prototype.constructor = Phaser.SignalBinding;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* This is a base Filter class to use for any Phaser filter development.
*
* @class Phaser.Filter
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {object} uniforms - Uniform mappings object
* @param {Array|string} fragmentSrc - The fragment shader code. Either an array, one element per line of code, or a string.
*/
Phaser.Filter = function (game, uniforms, fragmentSrc) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property {number} type - The const type of this object, either Phaser.WEBGL_FILTER or Phaser.CANVAS_FILTER.
    * @default
    */
    this.type = Phaser.WEBGL_FILTER;

    /**
    * An array of passes - some filters contain a few steps this array simply stores the steps in a linear fashion.
    * For example the blur filter has two passes blurX and blurY.
    * @property {array} passes - An array of filter objects.
    * @private
    */
    this.passes = [this];

    /**
    * @property {array} shaders - Array an array of shaders.
    * @private
    */
    this.shaders = [];

    /**
    * @property {boolean} dirty - Internal PIXI var.
    * @default
    */
    this.dirty = true;

    /**
    * @property {number} padding - Internal PIXI var.
    * @default
    */
    this.padding = 0;

    /**
    * @property {Phaser.Point} prevPoint - The previous position of the pointer (we don't update the uniform if the same)
    */
    this.prevPoint = new Phaser.Point();

    /*
    * The supported types are: 1f, 1fv, 1i, 2f, 2fv, 2i, 2iv, 3f, 3fv, 3i, 3iv, 4f, 4fv, 4i, 4iv, mat2, mat3, mat4 and sampler2D.
    */

    var d = new Date();

    /**
    * @property {object} uniforms - Default uniform mappings. Compatible with ShaderToy and GLSLSandbox.
    */
    this.uniforms = {

        resolution: { type: '2f', value: { x: 256, y: 256 }},
        time: { type: '1f', value: 0 },
        mouse: { type: '2f', value: { x: 0.0, y: 0.0 } },
        date: { type: '4fv', value: [ d.getFullYear(),  d.getMonth(),  d.getDate(), d.getHours() *60 * 60 + d.getMinutes() * 60 + d.getSeconds() ] },
        sampleRate: { type: '1f', value: 44100.0 },
        iChannel0: { type: 'sampler2D', value: null, textureData: { repeat: true } },
        iChannel1: { type: 'sampler2D', value: null, textureData: { repeat: true } },
        iChannel2: { type: 'sampler2D', value: null, textureData: { repeat: true } },
        iChannel3: { type: 'sampler2D', value: null, textureData: { repeat: true } }

    };

    //  Copy over/replace any passed in the constructor
    if (uniforms)
    {
        for (var key in uniforms)
        {
            this.uniforms[key] = uniforms[key];
        }
    }

    /**
    * @property {array|string} fragmentSrc - The fragment shader code.
    */
    this.fragmentSrc = fragmentSrc || '';

};

Phaser.Filter.prototype = {

    /**
    * Should be over-ridden.
    * @method Phaser.Filter#init
    */
    init: function () {
        //  This should be over-ridden. Will receive a variable number of arguments.
    },

    /**
    * Set the resolution uniforms on the filter.
    * @method Phaser.Filter#setResolution
    * @param {number} width - The width of the display.
    * @param {number} height - The height of the display.
    */
    setResolution: function (width, height) {

        this.uniforms.resolution.value.x = width;
        this.uniforms.resolution.value.y = height;

    },

    /**
    * Updates the filter.
    * @method Phaser.Filter#update
    * @param {Phaser.Pointer} [pointer] - A Pointer object to use for the filter. The coordinates are mapped to the mouse uniform.
    */
    update: function (pointer) {

        if (typeof pointer !== 'undefined')
        {
            var x = pointer.x / this.game.width;
            var y = 1 - pointer.y / this.game.height;

            if (x !== this.prevPoint.x || y !== this.prevPoint.y)
            {
                this.uniforms.mouse.value.x = x.toFixed(2);
                this.uniforms.mouse.value.y = y.toFixed(2);
                this.prevPoint.set(x, y);
            }
        }

        this.uniforms.time.value = this.game.time.totalElapsedSeconds();

    },

    /**
    * Clear down this Filter and null out references
    * @method Phaser.Filter#destroy
    */
    destroy: function () {

        this.game = null;

    }

};

Phaser.Filter.prototype.constructor = Phaser.Filter;

/**
* @name Phaser.Filter#width
* @property {number} width - The width (resolution uniform)
*/
Object.defineProperty(Phaser.Filter.prototype, 'width', {

    get: function() {
        return this.uniforms.resolution.value.x;
    },

    set: function(value) {
        this.uniforms.resolution.value.x = value;
    }

});

/**
* @name Phaser.Filter#height
* @property {number} height - The height (resolution uniform)
*/
Object.defineProperty(Phaser.Filter.prototype, 'height', {

    get: function() {
        return this.uniforms.resolution.value.y;
    },

    set: function(value) {
        this.uniforms.resolution.value.y = value;
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* This is a base Plugin template to use for any Phaser plugin development.
*
* @class Phaser.Plugin
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {any} parent - The object that owns this plugin, usually Phaser.PluginManager.
*/
Phaser.Plugin = function (game, parent) {

    if (parent === undefined) { parent = null; }

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property {any} parent - The parent of this plugin. If added to the PluginManager the parent will be set to that, otherwise it will be null.
    */
    this.parent = parent;

    /**
    * @property {boolean} active - A Plugin with active=true has its preUpdate and update methods called by the parent, otherwise they are skipped.
    * @default
    */
    this.active = false;

    /**
    * @property {boolean} visible - A Plugin with visible=true has its render and postRender methods called by the parent, otherwise they are skipped.
    * @default
    */
    this.visible = false;

    /**
    * @property {boolean} hasPreUpdate - A flag to indicate if this plugin has a preUpdate method.
    * @default
    */
    this.hasPreUpdate = false;

    /**
    * @property {boolean} hasUpdate - A flag to indicate if this plugin has an update method.
    * @default
    */
    this.hasUpdate = false;

    /**
    * @property {boolean} hasPostUpdate - A flag to indicate if this plugin has a postUpdate method.
    * @default
    */
    this.hasPostUpdate = false;

    /**
    * @property {boolean} hasRender - A flag to indicate if this plugin has a render method.
    * @default
    */
    this.hasRender = false;

    /**
    * @property {boolean} hasPostRender - A flag to indicate if this plugin has a postRender method.
    * @default
    */
    this.hasPostRender = false;

};

Phaser.Plugin.prototype = {

    /**
    * Pre-update is called at the very start of the update cycle, before any other subsystems have been updated (including Physics).
    * It is only called if active is set to true.
    * @method Phaser.Plugin#preUpdate
    */
    preUpdate: function () {
    },

    /**
    * Update is called after all the core subsystems (Input, Tweens, Sound, etc) and the State have updated, but before the render.
    * It is only called if active is set to true.
    * @method Phaser.Plugin#update
    */
    update: function () {
    },

    /**
    * Render is called right after the Game Renderer completes, but before the State.render.
    * It is only called if visible is set to true.
    * @method Phaser.Plugin#render
    */
    render: function () {
    },

    /**
    * Post-render is called after the Game Renderer and State.render have run.
    * It is only called if visible is set to true.
    * @method Phaser.Plugin#postRender
    */
    postRender: function () {
    },

    /**
    * Clear down this Plugin and null out references
    * @method Phaser.Plugin#destroy
    */
    destroy: function () {

        this.game = null;
        this.parent = null;
        this.active = false;
        this.visible = false;

    }

};

Phaser.Plugin.prototype.constructor = Phaser.Plugin;

/* jshint newcap: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Plugin Manager is responsible for the loading, running and unloading of Phaser Plugins.
*
* @class Phaser.PluginManager
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
*/
Phaser.PluginManager = function(game) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property {Phaser.Plugin[]} plugins - An array of all the plugins being managed by this PluginManager.
    */
    this.plugins = [];

    /**
    * @property {number} _len - Internal cache var.
    * @private
    */
    this._len = 0;

    /**
    * @property {number} _i - Internal cache var.
    * @private
    */
    this._i = 0;

};

Phaser.PluginManager.prototype = {

    /**
    * Add a new Plugin into the PluginManager.
    * The Plugin must have 2 properties: game and parent. Plugin.game is set to the game reference the PluginManager uses, and parent is set to the PluginManager.
    *
    * @method Phaser.PluginManager#add
    * @param {object|Phaser.Plugin} plugin - The Plugin to add into the PluginManager. This can be a function or an existing object.
    * @param {...*} parameter - Additional arguments that will be passed to the Plugin.init method.
    * @return {Phaser.Plugin} The Plugin that was added to the manager.
    */
    add: function (plugin) {

        var args = Array.prototype.splice.call(arguments, 1);
        var result = false;

        //  Prototype?
        if (typeof plugin === 'function')
        {
            plugin = new plugin(this.game, this);
        }
        else
        {
            plugin.game = this.game;
            plugin.parent = this;
        }

        //  Check for methods now to avoid having to do this every loop
        if (typeof plugin['preUpdate'] === 'function')
        {
            plugin.hasPreUpdate = true;
            result = true;
        }

        if (typeof plugin['update'] === 'function')
        {
            plugin.hasUpdate = true;
            result = true;
        }

        if (typeof plugin['postUpdate'] === 'function')
        {
            plugin.hasPostUpdate = true;
            result = true;
        }

        if (typeof plugin['render'] === 'function')
        {
            plugin.hasRender = true;
            result = true;
        }

        if (typeof plugin['postRender'] === 'function')
        {
            plugin.hasPostRender = true;
            result = true;
        }

        //  The plugin must have at least one of the above functions to be added to the PluginManager.
        if (result)
        {
            if (plugin.hasPreUpdate || plugin.hasUpdate || plugin.hasPostUpdate)
            {
                plugin.active = true;
            }

            if (plugin.hasRender || plugin.hasPostRender)
            {
                plugin.visible = true;
            }

            this._len = this.plugins.push(plugin);

            // Allows plugins to run potentially destructive code outside of the constructor, and only if being added to the PluginManager
            if (typeof plugin['init'] === 'function')
            {
                plugin.init.apply(plugin, args);
            }

            return plugin;
        }
        else
        {
            return null;
        }
    },

    /**
    * Remove a Plugin from the PluginManager. It calls Plugin.destroy on the plugin before removing it from the manager.
    *
    * @method Phaser.PluginManager#remove
    * @param {Phaser.Plugin} plugin - The plugin to be removed.
    */
    remove: function (plugin) {

        this._i = this._len;

        while (this._i--)
        {
            if (this.plugins[this._i] === plugin)
            {
                plugin.destroy();
                this.plugins.splice(this._i, 1);
                this._len--;
                return;
            }
        }

    },

    /**
    * Remove all Plugins from the PluginManager. It calls Plugin.destroy on every plugin before removing it from the manager.
    *
    * @method Phaser.PluginManager#removeAll
    */
    removeAll: function() {

        this._i = this._len;

        while (this._i--)
        {
            this.plugins[this._i].destroy();
        }

        this.plugins.length = 0;
        this._len = 0;

    },

    /**
    * Pre-update is called at the very start of the update cycle, before any other subsystems have been updated (including Physics).
    * It only calls plugins who have active=true.
    *
    * @method Phaser.PluginManager#preUpdate
    */
    preUpdate: function () {

        this._i = this._len;

        while (this._i--)
        {
            if (this.plugins[this._i].active && this.plugins[this._i].hasPreUpdate)
            {
                this.plugins[this._i].preUpdate();
            }
        }

    },

    /**
    * Update is called after all the core subsystems (Input, Tweens, Sound, etc) and the State have updated, but before the render.
    * It only calls plugins who have active=true.
    *
    * @method Phaser.PluginManager#update
    */
    update: function () {

        this._i = this._len;

        while (this._i--)
        {
            if (this.plugins[this._i].active && this.plugins[this._i].hasUpdate)
            {
                this.plugins[this._i].update();
            }
        }

    },

    /**
    * PostUpdate is the last thing to be called before the world render.
    * In particular, it is called after the world postUpdate, which means the camera has been adjusted.
    * It only calls plugins who have active=true.
    *
    * @method Phaser.PluginManager#postUpdate
    */
    postUpdate: function () {

        this._i = this._len;

        while (this._i--)
        {
            if (this.plugins[this._i].active && this.plugins[this._i].hasPostUpdate)
            {
                this.plugins[this._i].postUpdate();
            }
        }

    },

    /**
    * Render is called right after the Game Renderer completes, but before the State.render.
    * It only calls plugins who have visible=true.
    *
    * @method Phaser.PluginManager#render
    */
    render: function () {

        this._i = this._len;

        while (this._i--)
        {
            if (this.plugins[this._i].visible && this.plugins[this._i].hasRender)
            {
                this.plugins[this._i].render();
            }
        }

    },

    /**
    * Post-render is called after the Game Renderer and State.render have run.
    * It only calls plugins who have visible=true.
    *
    * @method Phaser.PluginManager#postRender
    */
    postRender: function () {

        this._i = this._len;

        while (this._i--)
        {
            if (this.plugins[this._i].visible && this.plugins[this._i].hasPostRender)
            {
                this.plugins[this._i].postRender();
            }
        }

    },

    /**
    * Clear down this PluginManager, calls destroy on every plugin and nulls out references.
    *
    * @method Phaser.PluginManager#destroy
    */
    destroy: function () {

        this.removeAll();

        this.game = null;

    }

};

Phaser.PluginManager.prototype.constructor = Phaser.PluginManager;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Stage controls root level display objects upon which everything is displayed.
* It also handles browser visibility handling and the pausing due to loss of focus.
*
* @class Phaser.Stage
* @extends PIXI.Stage
* @constructor
* @param {Phaser.Game} game - Game reference to the currently running game.
 */
Phaser.Stage = function (game) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = game;

    PIXI.Stage.call(this, 0x000000);

    /**
    * @property {string} name - The name of this object.
    * @default
    */
    this.name = '_stage_root';

    /**
    * @property {boolean} disableVisibilityChange - By default if the browser tab loses focus the game will pause. You can stop that behaviour by setting this property to true.
    * @default
    */
    this.disableVisibilityChange = false;

    /**
    * @property {boolean} exists - If exists is true the Stage and all children are updated, otherwise it is skipped.
    * @default
    */
    this.exists = true;

    /**
    * @property {number} currentRenderOrderID - Reset each frame, keeps a count of the total number of objects updated.
    */
    this.currentRenderOrderID = 0;

    /**
    * @property {string} hiddenVar - The page visibility API event name.
    * @private
    */
    this._hiddenVar = 'hidden';

    /**
    * @property {function} _onChange - The blur/focus event handler.
    * @private
    */
    this._onChange = null;

    /**
    * @property {number} _backgroundColor - Stage background color.
    * @private
    */
    this._backgroundColor = 0x000000;

    if (game.config)
    {
        this.parseConfig(game.config);
    }

};

Phaser.Stage.prototype = Object.create(PIXI.Stage.prototype);
Phaser.Stage.prototype.constructor = Phaser.Stage;

/**
* Parses a Game configuration object.
*
* @method Phaser.Stage#parseConfig
* @protected
* @param {object} config -The configuration object to parse.
*/
Phaser.Stage.prototype.parseConfig = function (config) {

    if (config['disableVisibilityChange'])
    {
        this.disableVisibilityChange = config['disableVisibilityChange'];
    }

    if (config['backgroundColor'])
    {
        this.backgroundColor = config['backgroundColor'];
    }

};

/**
* Initialises the stage and adds the event listeners.
* @method Phaser.Stage#boot
* @private
*/
Phaser.Stage.prototype.boot = function () {

    Phaser.DOM.getOffset(this.game.canvas, this.offset);

    Phaser.Canvas.setUserSelect(this.game.canvas, 'none');
    Phaser.Canvas.setTouchAction(this.game.canvas, 'none');

    this.checkVisibility();

};

/**
* This is called automatically after the plugins preUpdate and before the State.update.
* Most objects have preUpdate methods and it's where initial movement and positioning is done.
*
* @method Phaser.Stage#preUpdate
*/
Phaser.Stage.prototype.preUpdate = function () {

    this.currentRenderOrderID = 0;

    //  This can't loop in reverse, we need the orderID to be in sequence
    for (var i = 0; i < this.children.length; i++)
    {
        this.children[i].preUpdate();
    }

};

/**
* This is called automatically after the State.update, but before particles or plugins update.
*
* @method Phaser.Stage#update
*/
Phaser.Stage.prototype.update = function () {

    var i = this.children.length;

    while (i--)
    {
        this.children[i].update();
    }

};

/**
* This is called automatically before the renderer runs and after the plugins have updated.
* In postUpdate this is where all the final physics calculatations and object positioning happens.
* The objects are processed in the order of the display list.
* The only exception to this is if the camera is following an object, in which case that is updated first.
*
* @method Phaser.Stage#postUpdate
*/
Phaser.Stage.prototype.postUpdate = function () {

    if (this.game.world.camera.target)
    {
        this.game.world.camera.target.postUpdate();

        this.game.world.camera.update();

        var i = this.children.length;

        while (i--)
        {
            if (this.children[i] !== this.game.world.camera.target)
            {
                this.children[i].postUpdate();
            }
        }
    }
    else
    {
        this.game.world.camera.update();

        var i = this.children.length;

        while (i--)
        {
            this.children[i].postUpdate();
        }
    }

};

/**
* Updates the transforms for all objects on the display list.
* This overrides the Pixi default as we don't need the interactionManager, but do need the game property check.
* 
* @method Phaser.Stage#updateTransform
*/
Phaser.Stage.prototype.updateTransform = function () {

    this.worldAlpha = 1;

    for (var i = 0; i < this.children.length; i++)
    {
        this.children[i].updateTransform();
    }

};

/**
* Starts a page visibility event listener running, or window.onpagehide/onpageshow if not supported by the browser.
* Also listens for window.onblur and window.onfocus.
* 
* @method Phaser.Stage#checkVisibility
*/
Phaser.Stage.prototype.checkVisibility = function () {

    if (document.webkitHidden !== undefined)
    {
        this._hiddenVar = 'webkitvisibilitychange';
    }
    else if (document.mozHidden !== undefined)
    {
        this._hiddenVar = 'mozvisibilitychange';
    }
    else if (document.msHidden !== undefined)
    {
        this._hiddenVar = 'msvisibilitychange';
    }
    else if (document.hidden !== undefined)
    {
        this._hiddenVar = 'visibilitychange';
    }
    else
    {
        this._hiddenVar = null;
    }

    var _this = this;

    this._onChange = function (event) {
        return _this.visibilityChange(event);
    };

    //  Does browser support it? If not (like in IE9 or old Android) we need to fall back to blur/focus
    if (this._hiddenVar)
    {
        document.addEventListener(this._hiddenVar, this._onChange, false);
    }

    window.onblur = this._onChange;
    window.onfocus = this._onChange;

    window.onpagehide = this._onChange;
    window.onpageshow = this._onChange;
    
    if (this.game.device.cocoonJSApp)
    {
        CocoonJS.App.onSuspended.addEventListener(function () {
            Phaser.Stage.prototype.visibilityChange.call(_this, { type: "pause" });
        });

        CocoonJS.App.onActivated.addEventListener(function () {
            Phaser.Stage.prototype.visibilityChange.call(_this, { type: "resume" });
        });
    }

};

/**
* This method is called when the document visibility is changed.
* 
* @method Phaser.Stage#visibilityChange
* @param {Event} event - Its type will be used to decide whether the game should be paused or not.
*/
Phaser.Stage.prototype.visibilityChange = function (event) {

    if (event.type === 'pagehide' || event.type === 'blur' || event.type === 'pageshow' || event.type === 'focus')
    {
        if (event.type === 'pagehide' || event.type === 'blur')
        {
            this.game.focusLoss(event);
        }
        else if (event.type === 'pageshow' || event.type === 'focus')
        {
            this.game.focusGain(event);
        }

        return;
    }

    if (this.disableVisibilityChange)
    {
        return;
    }

    if (document.hidden || document.mozHidden || document.msHidden || document.webkitHidden || event.type === "pause")
    {
        this.game.gamePaused(event);
    }
    else
    {
        this.game.gameResumed(event);
    }

};

/**
* Sets the background color for the Stage.
*
* The color can be given as a hex string (`'#RRGGBB'`), a CSS color string (`'rgb(r,g,b)'`), or a numeric value (`0xRRGGBB`).
*
* An alpha channel is _not_ supported and will be ignored.
*
* @method Phaser.Stage#setBackgroundColor
* @param {number|string} backgroundColor - The color of the background.
*/
Phaser.Stage.prototype.setBackgroundColor = function(backgroundColor)
{
    var rgb = Phaser.Color.valueToColor(backgroundColor);
    this._backgroundColor = Phaser.Color.getColor(rgb.r, rgb.g, rgb.b);

    this.backgroundColorSplit = [ rgb.r / 255, rgb.g / 255, rgb.b / 255 ];
    this.backgroundColorString = Phaser.Color.RGBtoString(rgb.r, rgb.g, rgb.b, 255, '#');

};

/**
* Destroys the Stage and removes event listeners.
*
* @method Phaser.Stage#destroy
*/
Phaser.Stage.prototype.destroy  = function () {

    if (this._hiddenVar)
    {
        document.removeEventListener(this._hiddenVar, this._onChange, false);
    }

    window.onpagehide = null;
    window.onpageshow = null;

    window.onblur = null;
    window.onfocus = null;

};

/**
* @name Phaser.Stage#backgroundColor
* @property {number|string} backgroundColor - Gets and sets the background color of the stage. The color can be given as a number: 0xff0000 or a hex string: '#ff0000'
*/
Object.defineProperty(Phaser.Stage.prototype, "backgroundColor", {

    get: function () {

        return this._backgroundColor;

    },

    set: function (color) {

        if (!this.game.transparent)
        {
            this.setBackgroundColor(color);
        }

    }

});

/**
* Enable or disable texture smoothing for all objects on this Stage. Only works for bitmap/image textures. Smoothing is enabled by default.
*
* @name Phaser.Stage#smoothed
* @property {boolean} smoothed - Set to true to smooth all sprites rendered on this Stage, or false to disable smoothing (great for pixel art)
*/
Object.defineProperty(Phaser.Stage.prototype, "smoothed", {

    get: function () {

        return PIXI.scaleModes.DEFAULT === PIXI.scaleModes.LINEAR;

    },

    set: function (value) {

        if (value)
        {
            PIXI.scaleModes.DEFAULT = PIXI.scaleModes.LINEAR;
        }
        else
        {
            PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
        }
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Group is a container for {@link DisplayObject display objects} including {@link Phaser.Sprite Sprites} and {@link Phaser.Image Images}.
*
* Groups form the logical tree structure of the display/scene graph where local transformations are applied to children.
* For instance, all children are also moved/rotated/scaled when the group is moved/rotated/scaled.
*
* In addition, Groups provides support for fast pooling and object recycling.
*
* Groups are also display objects and can be nested as children within other Groups.
* 
* @class Phaser.Group
* @extends PIXI.DisplayObjectContainer
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
*     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
* @param {string} [name='group'] - A name for this group. Not used internally but useful for debugging.
* @param {boolean} [addToStage=false] - If true this group will be added directly to the Game.Stage instead of Game.World.
* @param {boolean} [enableBody=false] - If true all Sprites created with {@link #create} or {@link #createMulitple} will have a physics body created on them. Change the body type with {@link #physicsBodyType}.
* @param {integer} [physicsBodyType=0] - The physics body type to use when physics bodies are automatically added. See {@link #physicsBodyType} for values.
*/
Phaser.Group = function (game, parent, name, addToStage, enableBody, physicsBodyType) {

    if (addToStage === undefined) { addToStage = false; }
    if (enableBody === undefined) { enableBody = false; }
    if (physicsBodyType === undefined) { physicsBodyType = Phaser.Physics.ARCADE; }

    /**
    * A reference to the currently running Game.
    * @property {Phaser.Game} game
    * @protected
    */
    this.game = game;

    if (parent === undefined)
    {
        parent = game.world;
    }

    /**
    * A name for this group. Not used internally but useful for debugging.
    * @property {string} name
    */
    this.name = name || 'group';

    /**
    * The z-depth value of this object within its parent container/Group - the World is a Group as well.
    * This value must be unique for each child in a Group.
    * @property {integer} z
    */
    this.z = 0;

    PIXI.DisplayObjectContainer.call(this);

    if (addToStage)
    {
        this.game.stage.addChild(this);
        this.z = this.game.stage.children.length;
    }
    else
    {
        if (parent)
        {
            parent.addChild(this);
            this.z = parent.children.length;
        }
    }

    /**
    * Internal Phaser Type value.
    * @property {integer} type
    * @protected
    */
    this.type = Phaser.GROUP;

    /**
    * @property {number} physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.GROUP;

    /**
    * The alive property is useful for Groups that are children of other Groups and need to be included/excluded in checks like forEachAlive.
    * @property {boolean} alive
    * @default
    */
    this.alive = true;

    /**
    * If exists is true the group is updated, otherwise it is skipped.
    * @property {boolean} exists
    * @default
    */
    this.exists = true;

    /**
    * A group with `ignoreDestroy` set to `true` ignores all calls to its `destroy` method.
    * @property {boolean} ignoreDestroy
    * @default
    */
    this.ignoreDestroy = false;

    /**
    * A Group is that has `pendingDestroy` set to `true` is flagged to have its destroy method 
    * called on the next logic update.
    * You can set it directly to flag the Group to be destroyed on its next update.
    * 
    * This is extremely useful if you wish to destroy a Group from within one of its own callbacks 
    * or a callback of one of its children.
    * 
    * @property {boolean} pendingDestroy
    */
    this.pendingDestroy = false;

    /**
    * The type of objects that will be created when using {@link #create} or {@link #createMultiple}.
    *
    * Any object may be used but it should extend either Sprite or Image and accept the same constructor arguments:
    * when a new object is created it is passed the following parameters to its constructor: `(game, x, y, key, frame)`.
    *
    * @property {object} classType
    * @default {@link Phaser.Sprite}
    */
    this.classType = Phaser.Sprite;

    /**
    * The current display object that the group cursor is pointing to, if any. (Can be set manually.)
    *
    * The cursor is a way to iterate through the children in a Group using {@link #next} and {@link #previous}.
    * @property {?DisplayObject} cursor
    */
    this.cursor = null;

    /**
    * If true all Sprites created by, or added to this group, will have a physics body enabled on them.
    *
    * The default body type is controlled with {@link #physicsBodyType}.
    * @property {boolean} enableBody
    */
    this.enableBody = enableBody;

    /**
    * If true when a physics body is created (via {@link #enableBody}) it will create a physics debug object as well.
    *
    * This only works for P2 bodies.
    * @property {boolean} enableBodyDebug
    * @default
    */
    this.enableBodyDebug = false;

    /**
    * If {@link #enableBody} is true this is the type of physics body that is created on new Sprites.
    *
    * The valid values are {@link Phaser.Physics.ARCADE}, {@link Phaser.Physics.P2}, {@link Phaser.Physics.NINJA}, etc.
    * @property {integer} physicsBodyType
    */
    this.physicsBodyType = physicsBodyType;

    /**
    * If this Group contains Arcade Physics Sprites you can set a custom sort direction via this property.
    * 
    * It should be set to one of the Phaser.Physics.Arcade sort direction constants: 
    * 
    * Phaser.Physics.Arcade.SORT_NONE
    * Phaser.Physics.Arcade.LEFT_RIGHT
    * Phaser.Physics.Arcade.RIGHT_LEFT
    * Phaser.Physics.Arcade.TOP_BOTTOM
    * Phaser.Physics.Arcade.BOTTOM_TOP
    *
    * If set to `null` the Group will use whatever Phaser.Physics.Arcade.sortDirection is set to. This is the default behavior.
    * 
    * @property {integer} physicsSortDirection
    * @default
    */
    this.physicsSortDirection = null;

    /**
    * This signal is dispatched when the group is destroyed.
    * @property {Phaser.Signal} onDestroy
    */
    this.onDestroy = new Phaser.Signal();

    /**
    * @property {integer} cursorIndex - The current index of the Group cursor. Advance it with Group.next.
    * @readOnly
    */
    this.cursorIndex = 0;

    /**
    * A Group that is fixed to the camera uses its x/y coordinates as offsets from the top left of the camera. These are stored in Group.cameraOffset.
    * 
    * Note that the cameraOffset values are in addition to any parent in the display list.
    * So if this Group was in a Group that has x: 200, then this will be added to the cameraOffset.x
    * 
    * @property {boolean} fixedToCamera
    */
    this.fixedToCamera = false;

    /**
    * If this object is {@link #fixedToCamera} then this stores the x/y position offset relative to the top-left of the camera view.
    * If the parent of this Group is also `fixedToCamera` then the offset here is in addition to that and should typically be disabled.
    * @property {Phaser.Point} cameraOffset
    */
    this.cameraOffset = new Phaser.Point();

    /**
    * The hash array is an array belonging to this Group into which you can add any of its children via Group.addToHash and Group.removeFromHash.
    * 
    * Only children of this Group can be added to and removed from the hash.
    * 
    * This hash is used automatically by Phaser Arcade Physics in order to perform non z-index based destructive sorting.
    * However if you don't use Arcade Physics, or this isn't a physics enabled Group, then you can use the hash to perform your own
    * sorting and filtering of Group children without touching their z-index (and therefore display draw order)
    * 
    * @property {array} hash
    */
    this.hash = [];

    /**
    * The property on which children are sorted.
    * @property {string} _sortProperty
    * @private
    */
    this._sortProperty = 'z';

};

Phaser.Group.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Phaser.Group.prototype.constructor = Phaser.Group;

/**
* A returnType value, as specified in {@link #iterate} eg.
* @constant
* @type {integer}
*/
Phaser.Group.RETURN_NONE = 0;

/**
* A returnType value, as specified in {@link #iterate} eg.
* @constant
* @type {integer}
*/
Phaser.Group.RETURN_TOTAL = 1;

/**
* A returnType value, as specified in {@link #iterate} eg.
* @constant
* @type {integer}
*/
Phaser.Group.RETURN_CHILD = 2;

/**
* A sort ordering value, as specified in {@link #sort} eg.
* @constant
* @type {integer}
*/
Phaser.Group.SORT_ASCENDING = -1;

/**
* A sort ordering value, as specified in {@link #sort} eg.
* @constant
* @type {integer}
*/
Phaser.Group.SORT_DESCENDING = 1;

/**
* Adds an existing object as the top child in this group.
*
* The child is automatically added to the top of the group and is displayed on top of every previous child.
*
* If Group.enableBody is set then a physics body will be created on the object, so long as one does not already exist.
*
* Use {@link #addAt} to control where a child is added. Use {@link #create} to create and add a new child.
*
* @method Phaser.Group#add
* @param {DisplayObject} child - The display object to add as a child.
* @param {boolean} [silent=false] - If true the child will not dispatch the `onAddedToGroup` event.
* @return {DisplayObject} The child that was added to the group.
*/
Phaser.Group.prototype.add = function (child, silent) {

    if (silent === undefined) { silent = false; }

    if (child.parent !== this)
    {
        this.addChild(child);

        child.z = this.children.length;

        if (this.enableBody && child.body === null)
        {
            this.game.physics.enable(child, this.physicsBodyType);
        }
        else if (child.body)
        {
            this.addToHash(child);
        }

        if (!silent && child.events)
        {
            child.events.onAddedToGroup$dispatch(child, this);
        }

        if (this.cursor === null)
        {
            this.cursor = child;
        }
    }

    return child;

};

/**
* Adds a child of this Group into the hash array.
* This call will return false if the child is not a child of this Group, or is already in the hash.
*
* @method Phaser.Group#addToHash
* @param {DisplayObject} child - The display object to add to this Groups hash. Must be a member of this Group already and not present in the hash.
* @return {boolean} True if the child was successfully added to the hash, otherwise false.
*/
Phaser.Group.prototype.addToHash = function (child) {

    if (child.parent === this)
    {
        var index = this.hash.indexOf(child);

        if (index === -1)
        {
            this.hash.push(child);
            return true;
        }
    }

    return false;

};

/**
* Removes a child of this Group from the hash array.
* This call will return false if the child is not in the hash.
*
* @method Phaser.Group#removeFromHash
* @param {DisplayObject} child - The display object to remove from this Groups hash. Must be a member of this Group and in the hash.
* @return {boolean} True if the child was successfully removed from the hash, otherwise false.
*/
Phaser.Group.prototype.removeFromHash = function (child) {

    if (child)
    {
        var index = this.hash.indexOf(child);

        if (index !== -1)
        {
            this.hash.splice(index, 1);
            return true;
        }
    }

    return false;

};

/**
* Adds an array of existing Display Objects to this Group.
*
* The Display Objects are automatically added to the top of this Group, and will render on-top of everything already in this Group.
*
* As well as an array you can also pass another Group as the first argument. In this case all of the children from that
* Group will be removed from it and added into this Group.
*
* @method Phaser.Group#addMultiple
* @param {DisplayObject[]|Phaser.Group} children - An array of display objects or a Phaser.Group. If a Group is given then *all* children will be moved from it.
* @param {boolean} [silent=false] - If true the children will not dispatch the `onAddedToGroup` event.
* @return {DisplayObject[]|Phaser.Group} The array of children or Group of children that were added to this Group.
*/
Phaser.Group.prototype.addMultiple = function (children, silent) {

    if (children instanceof Phaser.Group)
    {
        children.moveAll(this, silent);
    }
    else if (Array.isArray(children))
    {
        for (var i = 0; i < children.length; i++)
        {
            this.add(children[i], silent);
        }
    }

    return children;

};

/**
* Adds an existing object to this group.
*
* The child is added to the group at the location specified by the index value, this allows you to control child ordering.
*
* @method Phaser.Group#addAt
* @param {DisplayObject} child - The display object to add as a child.
* @param {integer} [index=0] - The index within the group to insert the child to.
* @param {boolean} [silent=false] - If true the child will not dispatch the `onAddedToGroup` event.
* @return {DisplayObject} The child that was added to the group.
*/
Phaser.Group.prototype.addAt = function (child, index, silent) {

    if (silent === undefined) { silent = false; }

    if (child.parent !== this)
    {
        this.addChildAt(child, index);

        this.updateZ();

        if (this.enableBody && child.body === null)
        {
            this.game.physics.enable(child, this.physicsBodyType);
        }
        else if (child.body)
        {
            this.addToHash(child);
        }

        if (!silent && child.events)
        {
            child.events.onAddedToGroup$dispatch(child, this);
        }

        if (this.cursor === null)
        {
            this.cursor = child;
        }
    }

    return child;

};

/**
* Returns the child found at the given index within this group.
*
* @method Phaser.Group#getAt
* @param {integer} index - The index to return the child from.
* @return {DisplayObject|integer} The child that was found at the given index, or -1 for an invalid index.
*/
Phaser.Group.prototype.getAt = function (index) {

    if (index < 0 || index >= this.children.length)
    {
        return -1;
    }
    else
    {
        return this.getChildAt(index);
    }

};

/**
* Creates a new Phaser.Sprite object and adds it to the top of this group.
*
* Use {@link #classType} to change the type of object creaded.
*
* @method Phaser.Group#create
* @param {number} x - The x coordinate to display the newly created Sprite at. The value is in relation to the group.x point.
* @param {number} y - The y coordinate to display the newly created Sprite at. The value is in relation to the group.y point.
* @param {string} key - The Game.cache key of the image that this Sprite will use.
* @param {integer|string} [frame] - If the Sprite image contains multiple frames you can specify which one to use here.
* @param {boolean} [exists=true] - The default exists state of the Sprite.
* @return {DisplayObject} The child that was created: will be a {@link Phaser.Sprite} unless {@link #classType} has been changed.
*/
Phaser.Group.prototype.create = function (x, y, key, frame, exists) {

    if (exists === undefined) { exists = true; }

    var child = new this.classType(this.game, x, y, key, frame);

    child.exists = exists;
    child.visible = exists;
    child.alive = exists;

    this.addChild(child);

    child.z = this.children.length;

    if (this.enableBody)
    {
        this.game.physics.enable(child, this.physicsBodyType, this.enableBodyDebug);
    }

    if (child.events)
    {
        child.events.onAddedToGroup$dispatch(child, this);
    }

    if (this.cursor === null)
    {
        this.cursor = child;
    }

    return child;

};

/**
* Creates multiple Phaser.Sprite objects and adds them to the top of this group.
*
* Useful if you need to quickly generate a pool of identical sprites, such as bullets.
*
* By default the sprites will be set to not exist and will be positioned at 0, 0 (relative to the group.x/y).
* Use {@link #classType} to change the type of object created.
*
* @method Phaser.Group#createMultiple
* @param {integer} quantity - The number of Sprites to create.
* @param {string} key - The Game.cache key of the image that this Sprite will use.
* @param {integer|string} [frame] - If the Sprite image contains multiple frames you can specify which one to use here.
* @param {boolean} [exists=false] - The default exists state of the Sprite.
*/
Phaser.Group.prototype.createMultiple = function (quantity, key, frame, exists) {

    if (exists === undefined) { exists = false; }

    for (var i = 0; i < quantity; i++)
    {
        this.create(0, 0, key, frame, exists);
    }

};

/**
* Internal method that re-applies all of the children's Z values.
*
* This must be called whenever children ordering is altered so that their `z` indices are correctly updated.
*
* @method Phaser.Group#updateZ
* @protected
*/
Phaser.Group.prototype.updateZ = function () {

    var i = this.children.length;

    while (i--)
    {
        this.children[i].z = i;
    }

};

/**
* Sets the group cursor to the first child in the group.
*
* If the optional index parameter is given it sets the cursor to the object at that index instead.
*
* @method Phaser.Group#resetCursor
* @param {integer} [index=0] - Set the cursor to point to a specific index.
* @return {any} The child the cursor now points to.
*/
Phaser.Group.prototype.resetCursor = function (index) {

    if (index === undefined) { index = 0; }

    if (index > this.children.length - 1)
    {
        index = 0;
    }

    if (this.cursor)
    {
        this.cursorIndex = index;
        this.cursor = this.children[this.cursorIndex];
        return this.cursor;
    }

};

/**
* Advances the group cursor to the next (higher) object in the group.
*
* If the cursor is at the end of the group (top child) it is moved the start of the group (bottom child).
*
* @method Phaser.Group#next
* @return {any} The child the cursor now points to.
*/
Phaser.Group.prototype.next = function () {

    if (this.cursor)
    {
        //  Wrap the cursor?
        if (this.cursorIndex >= this.children.length - 1)
        {
            this.cursorIndex = 0;
        }
        else
        {
            this.cursorIndex++;
        }

        this.cursor = this.children[this.cursorIndex];

        return this.cursor;
    }

};

/**
* Moves the group cursor to the previous (lower) child in the group.
*
* If the cursor is at the start of the group (bottom child) it is moved to the end (top child).
*
* @method Phaser.Group#previous
* @return {any} The child the cursor now points to.
*/
Phaser.Group.prototype.previous = function () {

    if (this.cursor)
    {
        //  Wrap the cursor?
        if (this.cursorIndex === 0)
        {
            this.cursorIndex = this.children.length - 1;
        }
        else
        {
            this.cursorIndex--;
        }

        this.cursor = this.children[this.cursorIndex];

        return this.cursor;
    }

};

/**
* Swaps the position of two children in this group.
*
* Both children must be in this group, a child cannot be swapped with itself, and unparented children cannot be swapped.
*
* @method Phaser.Group#swap
* @param {any} child1 - The first child to swap.
* @param {any} child2 - The second child to swap.
*/
Phaser.Group.prototype.swap = function (child1, child2) {

    this.swapChildren(child1, child2);
    this.updateZ();

};

/**
* Brings the given child to the top of this group so it renders above all other children.
*
* @method Phaser.Group#bringToTop
* @param {any} child - The child to bring to the top of this group.
* @return {any} The child that was moved.
*/
Phaser.Group.prototype.bringToTop = function (child) {

    if (child.parent === this && this.getIndex(child) < this.children.length)
    {
        this.remove(child, false, true);
        this.add(child, true);
    }

    return child;

};

/**
* Sends the given child to the bottom of this group so it renders below all other children.
*
* @method Phaser.Group#sendToBack
* @param {any} child - The child to send to the bottom of this group.
* @return {any} The child that was moved.
*/
Phaser.Group.prototype.sendToBack = function (child) {

    if (child.parent === this && this.getIndex(child) > 0)
    {
        this.remove(child, false, true);
        this.addAt(child, 0, true);
    }

    return child;

};

/**
* Moves the given child up one place in this group unless it's already at the top.
*
* @method Phaser.Group#moveUp
* @param {any} child - The child to move up in the group.
* @return {any} The child that was moved.
*/
Phaser.Group.prototype.moveUp = function (child) {

    if (child.parent === this && this.getIndex(child) < this.children.length - 1)
    {
        var a = this.getIndex(child);
        var b = this.getAt(a + 1);

        if (b)
        {
            this.swap(child, b);
        }
    }

    return child;

};

/**
* Moves the given child down one place in this group unless it's already at the bottom.
*
* @method Phaser.Group#moveDown
* @param {any} child - The child to move down in the group.
* @return {any} The child that was moved.
*/
Phaser.Group.prototype.moveDown = function (child) {

    if (child.parent === this && this.getIndex(child) > 0)
    {
        var a = this.getIndex(child);
        var b = this.getAt(a - 1);

        if (b)
        {
            this.swap(child, b);
        }
    }

    return child;

};

/**
* Positions the child found at the given index within this group to the given x and y coordinates.
*
* @method Phaser.Group#xy
* @param {integer} index - The index of the child in the group to set the position of.
* @param {number} x - The new x position of the child.
* @param {number} y - The new y position of the child.
*/
Phaser.Group.prototype.xy = function (index, x, y) {

    if (index < 0 || index > this.children.length)
    {
        return -1;
    }
    else
    {
        this.getChildAt(index).x = x;
        this.getChildAt(index).y = y;
    }

};

/**
* Reverses all children in this group.
*
* This operaation applies only to immediate children and does not propagate to subgroups.
*
* @method Phaser.Group#reverse
*/
Phaser.Group.prototype.reverse = function () {

    this.children.reverse();
    this.updateZ();

};

/**
* Get the index position of the given child in this group, which should match the child's `z` property.
*
* @method Phaser.Group#getIndex
* @param {any} child - The child to get the index for.
* @return {integer} The index of the child or -1 if it's not a member of this group.
*/
Phaser.Group.prototype.getIndex = function (child) {

    return this.children.indexOf(child);

};

/**
* Replaces a child of this group with the given newChild. The newChild cannot be a member of this group.
*
* @method Phaser.Group#replace
* @param {any} oldChild - The child in this group that will be replaced.
* @param {any} newChild - The child to be inserted into this group.
* @return {any} Returns the oldChild that was replaced within this group.
*/
Phaser.Group.prototype.replace = function (oldChild, newChild) {

    var index = this.getIndex(oldChild);

    if (index !== -1)
    {
        if (newChild.parent)
        {
            if (newChild.parent instanceof Phaser.Group)
            {
                newChild.parent.remove(newChild);
            }
            else
            {
                newChild.parent.removeChild(newChild);
            }
        }

        this.remove(oldChild);

        this.addAt(newChild, index);

        return oldChild;
    }

};

/**
* Checks if the child has the given property.
*
* Will scan up to 4 levels deep only.
*
* @method Phaser.Group#hasProperty
* @param {any} child - The child to check for the existance of the property on.
* @param {string[]} key - An array of strings that make up the property.
* @return {boolean} True if the child has the property, otherwise false.
*/
Phaser.Group.prototype.hasProperty = function (child, key) {

    var len = key.length;

    if (len === 1 && key[0] in child)
    {
        return true;
    }
    else if (len === 2 && key[0] in child && key[1] in child[key[0]])
    {
        return true;
    }
    else if (len === 3 && key[0] in child && key[1] in child[key[0]] && key[2] in child[key[0]][key[1]])
    {
        return true;
    }
    else if (len === 4 && key[0] in child && key[1] in child[key[0]] && key[2] in child[key[0]][key[1]] && key[3] in child[key[0]][key[1]][key[2]])
    {
        return true;
    }

    return false;

};

/**
* Sets a property to the given value on the child. The operation parameter controls how the value is set.
*
* The operations are:
* - 0: set the existing value to the given value; if force is `true` a new property will be created if needed
* - 1: will add the given value to the value already present.
* - 2: will subtract the given value from the value already present.
* - 3: will multiply the value already present by the given value.
* - 4: will divide the value already present by the given value.
*
* @method Phaser.Group#setProperty
* @param {any} child - The child to set the property value on.
* @param {array} key - An array of strings that make up the property that will be set.
* @param {any} value - The value that will be set.
* @param {integer} [operation=0] - Controls how the value is assigned. A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
* @param {boolean} [force=false] - If `force` is true then the property will be set on the child regardless if it already exists or not. If false and the property doesn't exist, nothing will be set.
* @return {boolean} True if the property was set, false if not.
*/
Phaser.Group.prototype.setProperty = function (child, key, value, operation, force) {

    if (force === undefined) { force = false; }

    operation = operation || 0;

    //  As ugly as this approach looks, and although it's limited to a depth of only 4, it's much faster than a for loop or object iteration.

    //  0 = Equals
    //  1 = Add
    //  2 = Subtract
    //  3 = Multiply
    //  4 = Divide

    //  We can't force a property in and the child doesn't have it, so abort.
    //  Equally we can't add, subtract, multiply or divide a property value if it doesn't exist, so abort in those cases too.
    if (!this.hasProperty(child, key) && (!force || operation > 0))
    {
        return false;
    }

    var len = key.length;

    if (len === 1)
    {
        if (operation === 0) { child[key[0]] = value; }
        else if (operation == 1) { child[key[0]] += value; }
        else if (operation == 2) { child[key[0]] -= value; }
        else if (operation == 3) { child[key[0]] *= value; }
        else if (operation == 4) { child[key[0]] /= value; }
    }
    else if (len === 2)
    {
        if (operation === 0) { child[key[0]][key[1]] = value; }
        else if (operation == 1) { child[key[0]][key[1]] += value; }
        else if (operation == 2) { child[key[0]][key[1]] -= value; }
        else if (operation == 3) { child[key[0]][key[1]] *= value; }
        else if (operation == 4) { child[key[0]][key[1]] /= value; }
    }
    else if (len === 3)
    {
        if (operation === 0) { child[key[0]][key[1]][key[2]] = value; }
        else if (operation == 1) { child[key[0]][key[1]][key[2]] += value; }
        else if (operation == 2) { child[key[0]][key[1]][key[2]] -= value; }
        else if (operation == 3) { child[key[0]][key[1]][key[2]] *= value; }
        else if (operation == 4) { child[key[0]][key[1]][key[2]] /= value; }
    }
    else if (len === 4)
    {
        if (operation === 0) { child[key[0]][key[1]][key[2]][key[3]] = value; }
        else if (operation == 1) { child[key[0]][key[1]][key[2]][key[3]] += value; }
        else if (operation == 2) { child[key[0]][key[1]][key[2]][key[3]] -= value; }
        else if (operation == 3) { child[key[0]][key[1]][key[2]][key[3]] *= value; }
        else if (operation == 4) { child[key[0]][key[1]][key[2]][key[3]] /= value; }
    }

    return true;

};

/**
* Checks a property for the given value on the child.
*
* @method Phaser.Group#checkProperty
* @param {any} child - The child to check the property value on.
* @param {array} key - An array of strings that make up the property that will be set.
* @param {any} value - The value that will be checked.
* @param {boolean} [force=false] - If `force` is true then the property will be checked on the child regardless if it already exists or not. If true and the property doesn't exist, false will be returned.
* @return {boolean} True if the property was was equal to value, false if not.
*/
Phaser.Group.prototype.checkProperty = function (child, key, value, force) {

    if (force === undefined) { force = false; }

    //  We can't force a property in and the child doesn't have it, so abort.
    if (!Phaser.Utils.getProperty(child, key) && force)
    {
        return false;
    }

    if (Phaser.Utils.getProperty(child, key) !== value)
    {
        return false;
    }

    return true;

};

/**
* Quickly set a property on a single child of this group to a new value.
*
* The operation parameter controls how the new value is assigned to the property, from simple replacement to addition and multiplication.
*
* @method Phaser.Group#set
* @param {Phaser.Sprite} child - The child to set the property on.
* @param {string} key - The property, as a string, to be set. For example: 'body.velocity.x'
* @param {any} value - The value that will be set.
* @param {boolean} [checkAlive=false] - If set then the child will only be updated if alive=true.
* @param {boolean} [checkVisible=false] - If set then the child will only be updated if visible=true.
* @param {integer} [operation=0] - Controls how the value is assigned. A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
* @param {boolean} [force=false] - If `force` is true then the property will be set on the child regardless if it already exists or not. If false and the property doesn't exist, nothing will be set.
* @return {boolean} True if the property was set, false if not.
*/
Phaser.Group.prototype.set = function (child, key, value, checkAlive, checkVisible, operation, force) {

    if (force === undefined) { force = false; }

    key = key.split('.');

    if (checkAlive === undefined) { checkAlive = false; }
    if (checkVisible === undefined) { checkVisible = false; }

    if ((checkAlive === false || (checkAlive && child.alive)) && (checkVisible === false || (checkVisible && child.visible)))
    {
        return this.setProperty(child, key, value, operation, force);
    }

};

/**
* Quickly set the same property across all children of this group to a new value.
*
* This call doesn't descend down children, so if you have a Group inside of this group, the property will be set on the group but not its children.
* If you need that ability please see `Group.setAllChildren`.
*
* The operation parameter controls how the new value is assigned to the property, from simple replacement to addition and multiplication.
*
* @method Phaser.Group#setAll
* @param {string} key - The property, as a string, to be set. For example: 'body.velocity.x'
* @param {any} value - The value that will be set.
* @param {boolean} [checkAlive=false] - If set then only children with alive=true will be updated. This includes any Groups that are children.
* @param {boolean} [checkVisible=false] - If set then only children with visible=true will be updated. This includes any Groups that are children.
* @param {integer} [operation=0] - Controls how the value is assigned. A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
* @param {boolean} [force=false] - If `force` is true then the property will be set on the child regardless if it already exists or not. If false and the property doesn't exist, nothing will be set.
*/
Phaser.Group.prototype.setAll = function (key, value, checkAlive, checkVisible, operation, force) {

    if (checkAlive === undefined) { checkAlive = false; }
    if (checkVisible === undefined) { checkVisible = false; }
    if (force === undefined) { force = false; }

    key = key.split('.');
    operation = operation || 0;

    for (var i = 0; i < this.children.length; i++)
    {
        if ((!checkAlive || (checkAlive && this.children[i].alive)) && (!checkVisible || (checkVisible && this.children[i].visible)))
        {
            this.setProperty(this.children[i], key, value, operation, force);
        }
    }

};

/**
* Quickly set the same property across all children of this group, and any child Groups, to a new value.
*
* If this group contains other Groups then the same property is set across their children as well, iterating down until it reaches the bottom.
* Unlike with `setAll` the property is NOT set on child Groups itself.
*
* The operation parameter controls how the new value is assigned to the property, from simple replacement to addition and multiplication.
*
* @method Phaser.Group#setAllChildren
* @param {string} key - The property, as a string, to be set. For example: 'body.velocity.x'
* @param {any} value - The value that will be set.
* @param {boolean} [checkAlive=false] - If set then only children with alive=true will be updated. This includes any Groups that are children.
* @param {boolean} [checkVisible=false] - If set then only children with visible=true will be updated. This includes any Groups that are children.
* @param {integer} [operation=0] - Controls how the value is assigned. A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
* @param {boolean} [force=false] - If `force` is true then the property will be set on the child regardless if it already exists or not. If false and the property doesn't exist, nothing will be set.
*/
Phaser.Group.prototype.setAllChildren = function (key, value, checkAlive, checkVisible, operation, force) {

    if (checkAlive === undefined) { checkAlive = false; }
    if (checkVisible === undefined) { checkVisible = false; }
    if (force === undefined) { force = false; }

    operation = operation || 0;

    for (var i = 0; i < this.children.length; i++)
    {
        if ((!checkAlive || (checkAlive && this.children[i].alive)) && (!checkVisible || (checkVisible && this.children[i].visible)))
        {
            if (this.children[i] instanceof Phaser.Group)
            {
                this.children[i].setAllChildren(key, value, checkAlive, checkVisible, operation, force);
            }
            else
            {
                this.setProperty(this.children[i], key.split('.'), value, operation, force);
            }
        }
    }

};

/**
* Quickly check that the same property across all children of this group is equal to the given value.
*
* This call doesn't descend down children, so if you have a Group inside of this group, the property will be checked on the group but not its children.
*
* @method Phaser.Group#checkAll
* @param {string} key - The property, as a string, to be set. For example: 'body.velocity.x'
* @param {any} value - The value that will be checked.
* @param {boolean} [checkAlive=false] - If set then only children with alive=true will be checked. This includes any Groups that are children.
* @param {boolean} [checkVisible=false] - If set then only children with visible=true will be checked. This includes any Groups that are children.
* @param {boolean} [force=false] - If `force` is true then the property will be checked on the child regardless if it already exists or not. If true and the property doesn't exist, false will be returned.
*/
Phaser.Group.prototype.checkAll = function (key, value, checkAlive, checkVisible, force) {

    if (checkAlive === undefined) { checkAlive = false; }
    if (checkVisible === undefined) { checkVisible = false; }
    if (force === undefined) { force = false; }

    for (var i = 0; i < this.children.length; i++)
    {
        if ((!checkAlive || (checkAlive && this.children[i].alive)) && (!checkVisible || (checkVisible && this.children[i].visible)))
        {
            if (!this.checkProperty(this.children[i], key, value, force))
            {
                return false;
            }
        }
    }

    return true;

};

/**
* Adds the amount to the given property on all children in this group.
*
* `Group.addAll('x', 10)` will add 10 to the child.x value for each child.
*
* @method Phaser.Group#addAll
* @param {string} property - The property to increment, for example 'body.velocity.x' or 'angle'.
* @param {number} amount - The amount to increment the property by. If child.x = 10 then addAll('x', 40) would make child.x = 50.
* @param {boolean} checkAlive - If true the property will only be changed if the child is alive.
* @param {boolean} checkVisible - If true the property will only be changed if the child is visible.
*/
Phaser.Group.prototype.addAll = function (property, amount, checkAlive, checkVisible) {

    this.setAll(property, amount, checkAlive, checkVisible, 1);

};

/**
* Subtracts the amount from the given property on all children in this group.
*
* `Group.subAll('x', 10)` will minus 10 from the child.x value for each child.
*
* @method Phaser.Group#subAll
* @param {string} property - The property to decrement, for example 'body.velocity.x' or 'angle'.
* @param {number} amount - The amount to subtract from the property. If child.x = 50 then subAll('x', 40) would make child.x = 10.
* @param {boolean} checkAlive - If true the property will only be changed if the child is alive.
* @param {boolean} checkVisible - If true the property will only be changed if the child is visible.
*/
Phaser.Group.prototype.subAll = function (property, amount, checkAlive, checkVisible) {

    this.setAll(property, amount, checkAlive, checkVisible, 2);

};

/**
* Multiplies the given property by the amount on all children in this group.
*
* `Group.multiplyAll('x', 2)` will x2 the child.x value for each child.
*
* @method Phaser.Group#multiplyAll
* @param {string} property - The property to multiply, for example 'body.velocity.x' or 'angle'.
* @param {number} amount - The amount to multiply the property by. If child.x = 10 then multiplyAll('x', 2) would make child.x = 20.
* @param {boolean} checkAlive - If true the property will only be changed if the child is alive.
* @param {boolean} checkVisible - If true the property will only be changed if the child is visible.
*/
Phaser.Group.prototype.multiplyAll = function (property, amount, checkAlive, checkVisible) {

    this.setAll(property, amount, checkAlive, checkVisible, 3);

};

/**
* Divides the given property by the amount on all children in this group.
*
* `Group.divideAll('x', 2)` will half the child.x value for each child.
*
* @method Phaser.Group#divideAll
* @param {string} property - The property to divide, for example 'body.velocity.x' or 'angle'.
* @param {number} amount - The amount to divide the property by. If child.x = 100 then divideAll('x', 2) would make child.x = 50.
* @param {boolean} checkAlive - If true the property will only be changed if the child is alive.
* @param {boolean} checkVisible - If true the property will only be changed if the child is visible.
*/
Phaser.Group.prototype.divideAll = function (property, amount, checkAlive, checkVisible) {

    this.setAll(property, amount, checkAlive, checkVisible, 4);

};

/**
* Calls a function, specified by name, on all children in the group who exist (or do not exist).
*
* After the existsValue parameter you can add as many parameters as you like, which will all be passed to the child callback.
*
* @method Phaser.Group#callAllExists
* @param {string} callback - Name of the function on the children to call.
* @param {boolean} existsValue - Only children with exists=existsValue will be called.
* @param {...any} parameter - Additional parameters that will be passed to the callback.
*/
Phaser.Group.prototype.callAllExists = function (callback, existsValue) {

    var args;

    if (arguments.length > 2)
    {
        args = [];

        for (var i = 2; i < arguments.length; i++)
        {
            args.push(arguments[i]);
        }
    }

    for (var i = 0; i < this.children.length; i++)
    {
        if (this.children[i].exists === existsValue && this.children[i][callback])
        {
            this.children[i][callback].apply(this.children[i], args);
        }
    }

};

/**
* Returns a reference to a function that exists on a child of the group based on the given callback array.
*
* @method Phaser.Group#callbackFromArray
* @param {object} child - The object to inspect.
* @param {array} callback - The array of function names.
* @param {integer} length - The size of the array (pre-calculated in callAll).
* @protected
*/
Phaser.Group.prototype.callbackFromArray = function (child, callback, length) {

    //  Kinda looks like a Christmas tree

    if (length == 1)
    {
        if (child[callback[0]])
        {
            return child[callback[0]];
        }
    }
    else if (length == 2)
    {
        if (child[callback[0]][callback[1]])
        {
            return child[callback[0]][callback[1]];
        }
    }
    else if (length == 3)
    {
        if (child[callback[0]][callback[1]][callback[2]])
        {
            return child[callback[0]][callback[1]][callback[2]];
        }
    }
    else if (length == 4)
    {
        if (child[callback[0]][callback[1]][callback[2]][callback[3]])
        {
            return child[callback[0]][callback[1]][callback[2]][callback[3]];
        }
    }
    else
    {
        if (child[callback])
        {
            return child[callback];
        }
    }

    return false;

};

/**
* Calls a function, specified by name, on all on children.
*
* The function is called for all children regardless if they are dead or alive (see callAllExists for different options).
* After the method parameter and context you can add as many extra parameters as you like, which will all be passed to the child.
*
* @method Phaser.Group#callAll
* @param {string} method - Name of the function on the child to call. Deep property lookup is supported.
* @param {string} [context=null] - A string containing the context under which the method will be executed. Set to null to default to the child.
* @param {...any} args - Additional parameters that will be passed to the method.
*/
Phaser.Group.prototype.callAll = function (method, context) {

    if (method === undefined)
    {
        return;
    }

    //  Extract the method into an array
    method = method.split('.');

    var methodLength = method.length;

    if (context === undefined || context === null || context === '')
    {
        context = null;
    }
    else
    {
        //  Extract the context into an array
        if (typeof context === 'string')
        {
            context = context.split('.');
            var contextLength = context.length;
        }
    }

    var args;

    if (arguments.length > 2)
    {
        args = [];

        for (var i = 2; i < arguments.length; i++)
        {
            args.push(arguments[i]);
        }
    }

    var callback = null;
    var callbackContext = null;

    for (var i = 0; i < this.children.length; i++)
    {
        callback = this.callbackFromArray(this.children[i], method, methodLength);

        if (context && callback)
        {
            callbackContext = this.callbackFromArray(this.children[i], context, contextLength);

            if (callback)
            {
                callback.apply(callbackContext, args);
            }
        }
        else if (callback)
        {
            callback.apply(this.children[i], args);
        }
    }

};

/**
* The core preUpdate - as called by World.
* @method Phaser.Group#preUpdate
* @protected
*/
Phaser.Group.prototype.preUpdate = function () {

    if (this.pendingDestroy)
    {
        this.destroy();
        return false;
    }

    if (!this.exists || !this.parent.exists)
    {
        this.renderOrderID = -1;
        return false;
    }

    var i = this.children.length;

    while (i--)
    {
        this.children[i].preUpdate();
    }

    return true;

};

/**
* The core update - as called by World.
* @method Phaser.Group#update
* @protected
*/
Phaser.Group.prototype.update = function () {

    var i = this.children.length;

    while (i--)
    {
        this.children[i].update();
    }

};

/**
* The core postUpdate - as called by World.
* @method Phaser.Group#postUpdate
* @protected
*/
Phaser.Group.prototype.postUpdate = function () {

    //  Fixed to Camera?
    if (this.fixedToCamera)
    {
        this.x = this.game.camera.view.x + this.cameraOffset.x;
        this.y = this.game.camera.view.y + this.cameraOffset.y;
    }

    var i = this.children.length;

    while (i--)
    {
        this.children[i].postUpdate();
    }

};


/**
* Find children matching a certain predicate.
*
* For example:
*
*     var healthyList = Group.filter(function(child, index, children) {
*         return child.health > 10 ? true : false;
*     }, true);
*     healthyList.callAll('attack');
*
* Note: Currently this will skip any children which are Groups themselves.
*
* @method Phaser.Group#filter
* @param {function} predicate - The function that each child will be evaluated against. Each child of the group will be passed to it as its first parameter, the index as the second, and the entire child array as the third
* @param {boolean} [checkExists=false] - If true, only existing can be selected; otherwise all children can be selected and will be passed to the predicate.
* @return {Phaser.ArraySet} Returns an array list containing all the children that the predicate returned true for
*/
Phaser.Group.prototype.filter = function (predicate, checkExists) {

    var index = -1;
    var length = this.children.length;
    var results = [];

    while (++index < length)
    {
        var child = this.children[index];

        if (!checkExists || (checkExists && child.exists))
        {
            if (predicate(child, index, this.children))
            {
                results.push(child);
            }
        }
    }

    return new Phaser.ArraySet(results);

};

/**
* Call a function on each child in this group.
*
* Additional arguments for the callback can be specified after the `checkExists` parameter. For example,
*
*     Group.forEach(awardBonusGold, this, true, 100, 500)
*
* would invoke `awardBonusGold` function with the parameters `(child, 100, 500)`.
*
* Note: This check will skip any children which are Groups themselves.
*
* @method Phaser.Group#forEach
* @param {function} callback - The function that will be called for each applicable child. The child will be passed as the first argument.
* @param {object} callbackContext - The context in which the function should be called (usually 'this').
* @param {boolean} [checkExists=false] - If set only children matching for which `exists` is true will be passed to the callback, otherwise all children will be passed.
* @param {...any} [args=(none)] - Additional arguments to pass to the callback function, after the child item.
*/
Phaser.Group.prototype.forEach = function (callback, callbackContext, checkExists) {

    if (checkExists === undefined) { checkExists = false; }

    if (arguments.length <= 3)
    {
        for (var i = 0; i < this.children.length; i++)
        {
            if (!checkExists || (checkExists && this.children[i].exists))
            {
                callback.call(callbackContext, this.children[i]);
            }
        }
    }
    else
    {
        // Assigning to arguments properties causes Extreme Deoptimization in Chrome, FF, and IE.
        // Using an array and pushing each element (not a slice!) is _significantly_ faster.
        var args = [null];

        for (var i = 3; i < arguments.length; i++)
        {
            args.push(arguments[i]);
        }

        for (var i = 0; i < this.children.length; i++)
        {
            if (!checkExists || (checkExists && this.children[i].exists))
            {
                args[0] = this.children[i];
                callback.apply(callbackContext, args);
            }
        }
    }

};

/**
* Call a function on each existing child in this group.
*
* See {@link Phaser.Group#forEach forEach} for details.
*
* @method Phaser.Group#forEachExists
* @param {function} callback - The function that will be called for each applicable child. The child will be passed as the first argument.
* @param {object} callbackContext - The context in which the function should be called (usually 'this').
* @param {...any} [args=(none)] - Additional arguments to pass to the callback function, after the child item.
*/
Phaser.Group.prototype.forEachExists = function (callback, callbackContext) {

    var args;

    if (arguments.length > 2)
    {
        args = [null];

        for (var i = 2; i < arguments.length; i++)
        {
            args.push(arguments[i]);
        }
    }

    this.iterate('exists', true, Phaser.Group.RETURN_TOTAL, callback, callbackContext, args);

};

/**
* Call a function on each alive child in this group.
*
* See {@link Phaser.Group#forEach forEach} for details.
*
* @method Phaser.Group#forEachAlive
* @param {function} callback - The function that will be called for each applicable child. The child will be passed as the first argument.
* @param {object} callbackContext - The context in which the function should be called (usually 'this').
* @param {...any} [args=(none)] - Additional arguments to pass to the callback function, after the child item.
*/
Phaser.Group.prototype.forEachAlive = function (callback, callbackContext) {

    var args;

    if (arguments.length > 2)
    {
        args = [null];

        for (var i = 2; i < arguments.length; i++)
        {
            args.push(arguments[i]);
        }
    }

    this.iterate('alive', true, Phaser.Group.RETURN_TOTAL, callback, callbackContext, args);

};

/**
* Call a function on each dead child in this group.
*
* See {@link Phaser.Group#forEach forEach} for details.
*
* @method Phaser.Group#forEachDead
* @param {function} callback - The function that will be called for each applicable child. The child will be passed as the first argument.
* @param {object} callbackContext - The context in which the function should be called (usually 'this').
* @param {...any} [args=(none)] - Additional arguments to pass to the callback function, after the child item.
*/
Phaser.Group.prototype.forEachDead = function (callback, callbackContext) {

    var args;

    if (arguments.length > 2)
    {
        args = [null];

        for (var i = 2; i < arguments.length; i++)
        {
            args.push(arguments[i]);
        }
    }

    this.iterate('alive', false, Phaser.Group.RETURN_TOTAL, callback, callbackContext, args);

};

/**
* Sort the children in the group according to a particular key and ordering.
*
* Call this function to sort the group according to a particular key value and order.
* For example to depth sort Sprites for Zelda-style game you might call `group.sort('y', Phaser.Group.SORT_ASCENDING)` at the bottom of your `State.update()`.
*
* @method Phaser.Group#sort
* @param {string} [key='z'] - The name of the property to sort on. Defaults to the objects z-depth value.
* @param {integer} [order=Phaser.Group.SORT_ASCENDING] - Order ascending ({@link Phaser.Group.SORT_ASCENDING SORT_ASCENDING}) or descending ({@link Phaser.Group.SORT_DESCENDING SORT_DESCENDING}).
*/
Phaser.Group.prototype.sort = function (key, order) {

    if (this.children.length < 2)
    {
        //  Nothing to swap
        return;
    }

    if (key === undefined) { key = 'z'; }
    if (order === undefined) { order = Phaser.Group.SORT_ASCENDING; }

    this._sortProperty = key;

    if (order === Phaser.Group.SORT_ASCENDING)
    {
        this.children.sort(this.ascendingSortHandler.bind(this));
    }
    else
    {
        this.children.sort(this.descendingSortHandler.bind(this));
    }

    this.updateZ();

};

/**
* Sort the children in the group according to custom sort function.
*
* The `sortHandler` is provided the two parameters: the two children involved in the comparison (a and b).
* It should return -1 if `a > b`, 1 if `a < b` or 0 if `a === b`.
*
* @method Phaser.Group#customSort
* @param {function} sortHandler - The custom sort function.
* @param {object} [context=undefined] - The context in which the sortHandler is called.
*/
Phaser.Group.prototype.customSort = function (sortHandler, context) {

    if (this.children.length < 2)
    {
        //  Nothing to swap
        return;
    }

    this.children.sort(sortHandler.bind(context));

    this.updateZ();

};

/**
* An internal helper function for the sort process.
*
* @method Phaser.Group#ascendingSortHandler
* @protected
* @param {object} a - The first object being sorted.
* @param {object} b - The second object being sorted.
*/
Phaser.Group.prototype.ascendingSortHandler = function (a, b) {

    if (a[this._sortProperty] < b[this._sortProperty])
    {
        return -1;
    }
    else if (a[this._sortProperty] > b[this._sortProperty])
    {
        return 1;
    }
    else
    {
        if (a.z < b.z)
        {
            return -1;
        }
        else
        {
            return 1;
        }
    }

};

/**
* An internal helper function for the sort process.
*
* @method Phaser.Group#descendingSortHandler
* @protected
* @param {object} a - The first object being sorted.
* @param {object} b - The second object being sorted.
*/
Phaser.Group.prototype.descendingSortHandler = function (a, b) {

    if (a[this._sortProperty] < b[this._sortProperty])
    {
        return 1;
    }
    else if (a[this._sortProperty] > b[this._sortProperty])
    {
        return -1;
    }
    else
    {
        return 0;
    }

};

/**
* Iterates over the children of the group performing one of several actions for matched children.
*
* A child is considered a match when it has a property, named `key`, whose value is equal to `value`
* according to a strict equality comparison.
*
* The result depends on the `returnType`:
*
* - {@link Phaser.Group.RETURN_TOTAL RETURN_TOTAL}:
*     The callback, if any, is applied to all matching children. The number of matched children is returned.
* - {@link Phaser.Group.RETURN_NONE RETURN_NONE}:
*     The callback, if any, is applied to all matching children. No value is returned.
* - {@link Phaser.Group.RETURN_CHILD RETURN_CHILD}:
*     The callback, if any, is applied to the *first* matching child and the *first* matched child is returned.
*     If there is no matching child then null is returned.
*
* If `args` is specified it must be an array. The matched child will be assigned to the first
* element and the entire array will be applied to the callback function.
*
* @method Phaser.Group#iterate
* @param {string} key - The child property to check, i.e. 'exists', 'alive', 'health'
* @param {any} value - A child matches if `child[key] === value` is true.
* @param {integer} returnType - How to iterate the children and what to return.
* @param {function} [callback=null] - Optional function that will be called on each matching child. The matched child is supplied as the first argument.
* @param {object} [callbackContext] - The context in which the function should be called (usually 'this').
* @param {any[]} [args=(none)] - The arguments supplied to to the callback; the first array index (argument) will be replaced with the matched child.
* @return {any} Returns either an integer (for RETURN_TOTAL), the first matched child (for RETURN_CHILD), or null.
*/
Phaser.Group.prototype.iterate = function (key, value, returnType, callback, callbackContext, args) {

    if (returnType === Phaser.Group.RETURN_TOTAL && this.children.length === 0)
    {
        return 0;
    }

    var total = 0;

    for (var i = 0; i < this.children.length; i++)
    {
        if (this.children[i][key] === value)
        {
            total++;

            if (callback)
            {
                if (args)
                {
                    args[0] = this.children[i];
                    callback.apply(callbackContext, args);
                }
                else
                {
                    callback.call(callbackContext, this.children[i]);
                }
            }

            if (returnType === Phaser.Group.RETURN_CHILD)
            {
                return this.children[i];
            }
        }
    }

    if (returnType === Phaser.Group.RETURN_TOTAL)
    {
        return total;
    }

    // RETURN_CHILD or RETURN_NONE
    return null;

};

/**
* Get the first display object that exists, or doesn't exist.
*
* @method Phaser.Group#getFirstExists
* @param {boolean} [exists=true] - If true, find the first existing child; otherwise find the first non-existing child.
* @return {any} The first child, or null if none found.
*/
Phaser.Group.prototype.getFirstExists = function (exists) {

    if (typeof exists !== 'boolean')
    {
        exists = true;
    }

    return this.iterate('exists', exists, Phaser.Group.RETURN_CHILD);

};

/**
* Get the first child that is alive (`child.alive === true`).
*
* This is handy for checking if everything has been wiped out, or choosing a squad leader, etc.
*
* @method Phaser.Group#getFirstAlive
* @return {any} The first alive child, or null if none found.
*/
Phaser.Group.prototype.getFirstAlive = function () {

    return this.iterate('alive', true, Phaser.Group.RETURN_CHILD);

};

/**
* Get the first child that is dead (`child.alive === false`).
*
* This is handy for checking if everything has been wiped out, or choosing a squad leader, etc.
*
* @method Phaser.Group#getFirstDead
* @return {any} The first dead child, or null if none found.
*/
Phaser.Group.prototype.getFirstDead = function () {

    return this.iterate('alive', false, Phaser.Group.RETURN_CHILD);

};

/**
* Return the child at the top of this group.
*
* The top child is the child displayed (rendered) above every other child.
*
* @method Phaser.Group#getTop
* @return {any} The child at the top of the Group.
*/
Phaser.Group.prototype.getTop = function () {

    if (this.children.length > 0)
    {
        return this.children[this.children.length - 1];
    }

};

/**
* Returns the child at the bottom of this group.
*
* The bottom child the child being displayed (rendered) below every other child.
*
* @method Phaser.Group#getBottom
* @return {any} The child at the bottom of the Group.
*/
Phaser.Group.prototype.getBottom = function () {

    if (this.children.length > 0)
    {
        return this.children[0];
    }

};

/**
* Get the number of living children in this group.
*
* @method Phaser.Group#countLiving
* @return {integer} The number of children flagged as alive.
*/
Phaser.Group.prototype.countLiving = function () {

    return this.iterate('alive', true, Phaser.Group.RETURN_TOTAL);

};

/**
* Get the number of dead children in this group.
*
* @method Phaser.Group#countDead
* @return {integer} The number of children flagged as dead.
*/
Phaser.Group.prototype.countDead = function () {

    return this.iterate('alive', false, Phaser.Group.RETURN_TOTAL);

};

/**
* Returns a random child from the group.
*
* @method Phaser.Group#getRandom
* @param {integer} [startIndex=0] - Offset from the front of the front of the group (lowest child).
* @param {integer} [length=(to top)] - Restriction on the number of values you want to randomly select from.
* @return {any} A random child of this Group.
*/
Phaser.Group.prototype.getRandom = function (startIndex, length) {

    if (this.children.length === 0)
    {
        return null;
    }

    startIndex = startIndex || 0;
    length = length || this.children.length;

    return Phaser.ArrayUtils.getRandomItem(this.children, startIndex, length);

};

/**
* Removes the given child from this group.
*
* This will dispatch an `onRemovedFromGroup` event from the child (if it has one), and optionally destroy the child.
*
* If the group cursor was referring to the removed child it is updated to refer to the next child.
*
* @method Phaser.Group#remove
* @param {any} child - The child to remove.
* @param {boolean} [destroy=false] - If true `destroy` will be invoked on the removed child.
* @param {boolean} [silent=false] - If true the the child will not dispatch the `onRemovedFromGroup` event.
* @return {boolean} true if the child was removed from this group, otherwise false.
*/
Phaser.Group.prototype.remove = function (child, destroy, silent) {

    if (destroy === undefined) { destroy = false; }
    if (silent === undefined) { silent = false; }

    if (this.children.length === 0 || this.children.indexOf(child) === -1)
    {
        return false;
    }

    if (!silent && child.events && !child.destroyPhase)
    {
        child.events.onRemovedFromGroup$dispatch(child, this);
    }

    var removed = this.removeChild(child);

    this.removeFromHash(child);

    this.updateZ();

    if (this.cursor === child)
    {
        this.next();
    }

    if (destroy && removed)
    {
        removed.destroy(true);
    }

    return true;

};

/**
* Moves all children from this Group to the Group given.
*
* @method Phaser.Group#moveAll
* @param {Phaser.Group} group - The new Group to which the children will be moved to.
* @param {boolean} [silent=false] - If true the children will not dispatch the `onAddedToGroup` event for the new Group.
* @return {Phaser.Group} The Group to which all the children were moved.
*/
Phaser.Group.prototype.moveAll = function (group, silent) {

    if (silent === undefined) { silent = false; }

    if (this.children.length > 0 && group instanceof Phaser.Group)
    {
        do
        {
            group.add(this.children[0], silent);
        }
        while (this.children.length > 0);

        this.hash = [];

        this.cursor = null;
    }

    return group;

};

/**
* Removes all children from this group, but does not remove the group from its parent.
*
* @method Phaser.Group#removeAll
* @param {boolean} [destroy=false] - If true `destroy` will be invoked on each removed child.
* @param {boolean} [silent=false] - If true the children will not dispatch their `onRemovedFromGroup` events.
*/
Phaser.Group.prototype.removeAll = function (destroy, silent) {

    if (destroy === undefined) { destroy = false; }
    if (silent === undefined) { silent = false; }

    if (this.children.length === 0)
    {
        return;
    }

    do
    {
        if (!silent && this.children[0].events)
        {
            this.children[0].events.onRemovedFromGroup$dispatch(this.children[0], this);
        }

        var removed = this.removeChild(this.children[0]);

        this.removeFromHash(removed);

        if (destroy && removed)
        {
            removed.destroy(true);
        }
    }
    while (this.children.length > 0);

    this.hash = [];

    this.cursor = null;

};

/**
* Removes all children from this group whose index falls beteen the given startIndex and endIndex values.
*
* @method Phaser.Group#removeBetween
* @param {integer} startIndex - The index to start removing children from.
* @param {integer} [endIndex] - The index to stop removing children at. Must be higher than startIndex. If undefined this method will remove all children between startIndex and the end of the group.
* @param {boolean} [destroy=false] - If true `destroy` will be invoked on each removed child.
* @param {boolean} [silent=false] - If true the children will not dispatch their `onRemovedFromGroup` events.
*/
Phaser.Group.prototype.removeBetween = function (startIndex, endIndex, destroy, silent) {

    if (endIndex === undefined) { endIndex = this.children.length - 1; }
    if (destroy === undefined) { destroy = false; }
    if (silent === undefined) { silent = false; }

    if (this.children.length === 0)
    {
        return;
    }

    if (startIndex > endIndex || startIndex < 0 || endIndex > this.children.length)
    {
        return false;
    }

    var i = endIndex;

    while (i >= startIndex)
    {
        if (!silent && this.children[i].events)
        {
            this.children[i].events.onRemovedFromGroup$dispatch(this.children[i], this);
        }

        var removed = this.removeChild(this.children[i]);

        this.removeFromHash(removed);

        if (destroy && removed)
        {
            removed.destroy(true);
        }

        if (this.cursor === this.children[i])
        {
            this.cursor = null;
        }

        i--;
    }

    this.updateZ();

};

/**
* Destroys this group.
*
* Removes all children, then removes this group from its parent and nulls references.
*
* @method Phaser.Group#destroy
* @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
* @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
*/
Phaser.Group.prototype.destroy = function (destroyChildren, soft) {

    if (this.game === null || this.ignoreDestroy) { return; }

    if (destroyChildren === undefined) { destroyChildren = true; }
    if (soft === undefined) { soft = false; }

    this.onDestroy.dispatch(this, destroyChildren, soft);

    this.removeAll(destroyChildren);

    this.cursor = null;
    this.filters = null;
    this.pendingDestroy = false;

    if (!soft)
    {
        if (this.parent)
        {
            this.parent.removeChild(this);
        }

        this.game = null;
        this.exists = false;
    }

};

/**
* Total number of existing children in the group.
*
* @name Phaser.Group#total
* @property {integer} total
* @readonly
*/
Object.defineProperty(Phaser.Group.prototype, "total", {

    get: function () {

        return this.iterate('exists', true, Phaser.Group.RETURN_TOTAL);

    }

});

/**
* Total number of children in this group, regardless of exists/alive status.
*
* @name Phaser.Group#length
* @property {integer} length 
* @readonly
*/
Object.defineProperty(Phaser.Group.prototype, "length", {

    get: function () {

        return this.children.length;

    }

});

/**
* The angle of rotation of the group container, in degrees.
*
* This adjusts the group itself by modifying its local rotation transform.
*
* This has no impact on the rotation/angle properties of the children, but it will update their worldTransform
* and on-screen orientation and position.
*
* @name Phaser.Group#angle
* @property {number} angle
*/
Object.defineProperty(Phaser.Group.prototype, "angle", {

    get: function() {
        return Phaser.Math.radToDeg(this.rotation);
    },

    set: function(value) {
        this.rotation = Phaser.Math.degToRad(value);
    }

});

/**
* A display object is any object that can be rendered in the Phaser/pixi.js scene graph.
*
* This includes {@link Phaser.Group} (groups are display objects!),
* {@link Phaser.Sprite}, {@link Phaser.Button}, {@link Phaser.Text}
* as well as {@link PIXI.DisplayObject} and all derived types.
*
* @typedef {object} DisplayObject
*/
// Documentation stub for linking.

/**
* The x coordinate of the group container.
*
* You can adjust the group container itself by modifying its coordinates.
* This will have no impact on the x/y coordinates of its children, but it will update their worldTransform and on-screen position.
* @name Phaser.Group#x
* @property {number} x
*/

/**
* The y coordinate of the group container.
*
* You can adjust the group container itself by modifying its coordinates.
* This will have no impact on the x/y coordinates of its children, but it will update their worldTransform and on-screen position.
* @name Phaser.Group#y
* @property {number} y
*/

/**
* The angle of rotation of the group container, in radians.
*
* This will adjust the group container itself by modifying its rotation.
* This will have no impact on the rotation value of its children, but it will update their worldTransform and on-screen position.
* @name Phaser.Group#rotation
* @property {number} rotation
*/

/**
* The visible state of the group. Non-visible Groups and all of their children are not rendered.
*
* @name Phaser.Group#visible
* @property {boolean} visible
*/

/**
* The alpha value of the group container.
*
* @name Phaser.Group#alpha
* @property {number} alpha
*/

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* "This world is but a canvas to our imagination." - Henry David Thoreau
*
* A game has only one world. The world is an abstract place in which all game objects live. It is not bound
* by stage limits and can be any size. You look into the world via cameras. All game objects live within
* the world at world-based coordinates. By default a world is created the same size as your Stage.
*
* @class Phaser.World
* @extends Phaser.Group
* @constructor
* @param {Phaser.Game} game - Reference to the current game instance.
*/
Phaser.World = function (game) {

    Phaser.Group.call(this, game, null, '__world', false);

    /**
    * The World has no fixed size, but it does have a bounds outside of which objects are no longer considered as being "in world" and you should use this to clean-up the display list and purge dead objects.
    * By default we set the Bounds to be from 0,0 to Game.width,Game.height. I.e. it will match the size given to the game constructor with 0,0 representing the top-left of the display.
    * However 0,0 is actually the center of the world, and if you rotate or scale the world all of that will happen from 0,0.
    * So if you want to make a game in which the world itself will rotate you should adjust the bounds so that 0,0 is the center point, i.e. set them to -1000,-1000,2000,2000 for a 2000x2000 sized world centered around 0,0.
    * @property {Phaser.Rectangle} bounds - Bound of this world that objects can not escape from.
    */
    this.bounds = new Phaser.Rectangle(0, 0, game.width, game.height);

    /**
    * @property {Phaser.Camera} camera - Camera instance.
    */
    this.camera = null;

    /**
    * @property {boolean} _definedSize - True if the World has been given a specifically defined size (i.e. from a Tilemap or direct in code) or false if it's just matched to the Game dimensions.
    * @readonly
    */
    this._definedSize = false;

    /**
    * @property {number} width - The defined width of the World. Sometimes the bounds needs to grow larger than this (if you resize the game) but this retains the original requested dimension.
    */
    this._width = game.width;

    /**
    * @property {number} height - The defined height of the World. Sometimes the bounds needs to grow larger than this (if you resize the game) but this retains the original requested dimension.
    */
    this._height = game.height;

    this.game.state.onStateChange.add(this.stateChange, this);

};

Phaser.World.prototype = Object.create(Phaser.Group.prototype);
Phaser.World.prototype.constructor = Phaser.World;

/**
* Initialises the game world.
*
* @method Phaser.World#boot
* @protected
*/
Phaser.World.prototype.boot = function () {

    this.camera = new Phaser.Camera(this.game, 0, 0, 0, this.game.width, this.game.height);

    this.camera.displayObject = this;

    this.camera.scale = this.scale;

    this.game.camera = this.camera;

    this.game.stage.addChild(this);

};

/**
* Called whenever the State changes or resets.
* 
* It resets the world.x and world.y coordinates back to zero,
* then resets the Camera.
*
* @method Phaser.World#stateChange
* @protected
*/
Phaser.World.prototype.stateChange = function () {

    this.x = 0;
    this.y = 0;

    this.camera.reset();

};

/**
* Updates the size of this world and sets World.x/y to the given values
* The Camera bounds and Physics bounds (if set) are also updated to match the new World bounds.
*
* @method Phaser.World#setBounds
* @param {number} x - Top left most corner of the world.
* @param {number} y - Top left most corner of the world.
* @param {number} width - New width of the game world in pixels.
* @param {number} height - New height of the game world in pixels.
*/
Phaser.World.prototype.setBounds = function (x, y, width, height) {

    this._definedSize = true;
    this._width = width;
    this._height = height;

    this.bounds.setTo(x, y, width, height);

    this.x = x;
    this.y = y;

    if (this.camera.bounds)
    {
        //  The Camera can never be smaller than the game size
        this.camera.bounds.setTo(x, y, Math.max(width, this.game.width), Math.max(height, this.game.height));
    }

    this.game.physics.setBoundsToWorld();

};

/**
* Updates the size of this world. Note that this doesn't modify the world x/y coordinates, just the width and height.
*
* @method Phaser.World#resize
* @param {number} width - New width of the game world in pixels.
* @param {number} height - New height of the game world in pixels.
*/
Phaser.World.prototype.resize = function (width, height) {

    //  Don't ever scale the World bounds lower than the original requested dimensions if it's a defined world size

    if (this._definedSize)
    {
        if (width < this._width)
        {
            width = this._width;
        }

        if (height < this._height)
        {
            height = this._height;
        }
    }

    this.bounds.width = width;
    this.bounds.height = height;

    this.game.camera.setBoundsToWorld();

    this.game.physics.setBoundsToWorld();

};

/**
* Destroyer of worlds.
*
* @method Phaser.World#shutdown
*/
Phaser.World.prototype.shutdown = function () {

    //  World is a Group, so run a soft destruction on this and all children.
    this.destroy(true, true);

};

/**
* This will take the given game object and check if its x/y coordinates fall outside of the world bounds.
* If they do it will reposition the object to the opposite side of the world, creating a wrap-around effect.
* If sprite has a P2 body then the body (sprite.body) should be passed as first parameter to the function.
*
* @method Phaser.World#wrap
* @param {Phaser.Sprite|Phaser.Image|Phaser.TileSprite|Phaser.Text} sprite - The object you wish to wrap around the world bounds.
* @param {number} [padding=0] - Extra padding added equally to the sprite.x and y coordinates before checking if within the world bounds. Ignored if useBounds is true.
* @param {boolean} [useBounds=false] - If useBounds is false wrap checks the object.x/y coordinates. If true it does a more accurate bounds check, which is more expensive.
* @param {boolean} [horizontal=true] - If horizontal is false, wrap will not wrap the object.x coordinates horizontally.
* @param {boolean} [vertical=true] - If vertical is false, wrap will not wrap the object.y coordinates vertically.
*/
Phaser.World.prototype.wrap = function (sprite, padding, useBounds, horizontal, vertical) {

    if (padding === undefined) { padding = 0; }
    if (useBounds === undefined) { useBounds = false; }
    if (horizontal === undefined) { horizontal = true; }
    if (vertical === undefined) { vertical = true; }

    if (!useBounds)
    {
        if (horizontal && sprite.x + padding < this.bounds.x)
        {
            sprite.x = this.bounds.right + padding;
        }
        else if (horizontal && sprite.x - padding > this.bounds.right)
        {
            sprite.x = this.bounds.left - padding;
        }

        if (vertical && sprite.y + padding < this.bounds.top)
        {
            sprite.y = this.bounds.bottom + padding;
        }
        else if (vertical && sprite.y - padding > this.bounds.bottom)
        {
            sprite.y = this.bounds.top - padding;
        }
    }
    else
    {
        sprite.getBounds();

        if (horizontal)
        {
            if ((sprite.x + sprite._currentBounds.width) < this.bounds.x)
            {
                sprite.x = this.bounds.right;
            }
            else if (sprite.x > this.bounds.right)
            {
                sprite.x = this.bounds.left;
            }
        }

        if (vertical)
        {
            if ((sprite.y + sprite._currentBounds.height) < this.bounds.top)
            {
                sprite.y = this.bounds.bottom;
            }
            else if (sprite.y > this.bounds.bottom)
            {
                sprite.y = this.bounds.top;
            }
        }
    }

};

/**
* @name Phaser.World#width
* @property {number} width - Gets or sets the current width of the game world. The world can never be smaller than the game (canvas) dimensions.
*/
Object.defineProperty(Phaser.World.prototype, "width", {

    get: function () {
        return this.bounds.width;
    },

    set: function (value) {

        if (value < this.game.width)
        {
            value = this.game.width;
        }

        this.bounds.width = value;
        this._width = value;
        this._definedSize = true;

    }

});

/**
* @name Phaser.World#height
* @property {number} height - Gets or sets the current height of the game world. The world can never be smaller than the game (canvas) dimensions.
*/
Object.defineProperty(Phaser.World.prototype, "height", {

    get: function () {
        return this.bounds.height;
    },

    set: function (value) {

        if (value < this.game.height)
        {
            value = this.game.height;
        }

        this.bounds.height = value;
        this._height = value;
        this._definedSize = true;

    }

});

/**
* @name Phaser.World#centerX
* @property {number} centerX - Gets the X position corresponding to the center point of the world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "centerX", {

    get: function () {
        return this.bounds.halfWidth;
    }

});

/**
* @name Phaser.World#centerY
* @property {number} centerY - Gets the Y position corresponding to the center point of the world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "centerY", {

    get: function () {
        return this.bounds.halfHeight;
    }

});

/**
* @name Phaser.World#randomX
* @property {number} randomX - Gets a random integer which is lesser than or equal to the current width of the game world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "randomX", {

    get: function () {

        if (this.bounds.x < 0)
        {
            return this.game.rnd.between(this.bounds.x, (this.bounds.width - Math.abs(this.bounds.x)));
        }
        else
        {
            return this.game.rnd.between(this.bounds.x, this.bounds.width);
        }

    }

});

/**
* @name Phaser.World#randomY
* @property {number} randomY - Gets a random integer which is lesser than or equal to the current height of the game world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "randomY", {

    get: function () {

        if (this.bounds.y < 0)
        {
            return this.game.rnd.between(this.bounds.y, (this.bounds.height - Math.abs(this.bounds.y)));
        }
        else
        {
            return this.game.rnd.between(this.bounds.y, this.bounds.height);
        }

    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* WARNING: This is an EXPERIMENTAL class. The API will change significantly in the coming versions and is incomplete.
* Please try to avoid using in production games with a long time to build.
* This is also why the documentation is incomplete.
* 
* FlexGrid is a a responsive grid manager that works in conjunction with the ScaleManager RESIZE scaling mode and FlexLayers
* to provide for game object positioning in a responsive manner.
*
* @class Phaser.FlexGrid
* @constructor
* @param {Phaser.ScaleManager} manager - The ScaleManager.
* @param {number} width - The width of the game.
* @param {number} height - The height of the game.
*/
Phaser.FlexGrid = function (manager, width, height) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = manager.game;

    /**
    * @property {Phaser.ScaleManager} manager - A reference to the ScaleManager.
    */
    this.manager = manager;

    //  The perfect dimensions on which everything else is based
    this.width = width;
    this.height = height;

    this.boundsCustom = new Phaser.Rectangle(0, 0, width, height);
    this.boundsFluid = new Phaser.Rectangle(0, 0, width, height);
    this.boundsFull = new Phaser.Rectangle(0, 0, width, height);
    this.boundsNone = new Phaser.Rectangle(0, 0, width, height);

    /**
    * @property {Phaser.Point} position - 
    * @readonly
    */
    this.positionCustom = new Phaser.Point(0, 0);
    this.positionFluid = new Phaser.Point(0, 0);
    this.positionFull = new Phaser.Point(0, 0);
    this.positionNone = new Phaser.Point(0, 0);

    /**
    * @property {Phaser.Point} scaleFactor - The scale factor based on the game dimensions vs. the scaled dimensions.
    * @readonly
    */
    this.scaleCustom = new Phaser.Point(1, 1);
    this.scaleFluid = new Phaser.Point(1, 1);
    this.scaleFluidInversed = new Phaser.Point(1, 1);
    this.scaleFull = new Phaser.Point(1, 1);
    this.scaleNone = new Phaser.Point(1, 1);

    this.customWidth = 0;
    this.customHeight = 0;
    this.customOffsetX = 0;
    this.customOffsetY = 0;

    this.ratioH = width / height;
    this.ratioV = height / width;

    this.multiplier = 0;

    this.layers = [];

};

Phaser.FlexGrid.prototype = {

    /**
     * Sets the core game size. This resets the w/h parameters and bounds.
     *
     * @method Phaser.FlexGrid#setSize
     * @param {number} width - The new dimensions.
     * @param {number} height - The new dimensions.
     */
    setSize: function (width, height) {

        //  These are locked and don't change until setSize is called again
        this.width = width;
        this.height = height;

        this.ratioH = width / height;
        this.ratioV = height / width;

        this.scaleNone = new Phaser.Point(1, 1);

        this.boundsNone.width = this.width;
        this.boundsNone.height = this.height;

        this.refresh();

    },

    //  Need ability to create your own layers with custom scaling, etc.

    /**
     * A custom layer is centered on the game and maintains its aspect ratio as it scales up and down.
     *
     * @method Phaser.FlexGrid#createCustomLayer
     * @param {number} width - Width of this layer in pixels.
     * @param {number} height - Height of this layer in pixels.
     * @param {PIXI.DisplayObject[]} [children] - An array of children that are used to populate the FlexLayer.
     * @return {Phaser.FlexLayer} The Layer object.
     */
    createCustomLayer: function (width, height, children, addToWorld) {

        if (addToWorld === undefined) { addToWorld = true; }

        this.customWidth = width;
        this.customHeight = height;

        this.boundsCustom.width = width;
        this.boundsCustom.height = height;

        var layer = new Phaser.FlexLayer(this, this.positionCustom, this.boundsCustom, this.scaleCustom);

        if (addToWorld)
        {
            this.game.world.add(layer);
        }

        this.layers.push(layer);

        if (typeof children !== 'undefined' && typeof children !== null)
        {
            layer.addMultiple(children);
        }

        return layer;

    },

    /**
     * A fluid layer is centered on the game and maintains its aspect ratio as it scales up and down.
     *
     * @method Phaser.FlexGrid#createFluidLayer
     * @param {array} [children] - An array of children that are used to populate the FlexLayer.
     * @return {Phaser.FlexLayer} The Layer object.
     */
    createFluidLayer: function (children, addToWorld) {

        if (addToWorld === undefined) { addToWorld = true; }

        var layer = new Phaser.FlexLayer(this, this.positionFluid, this.boundsFluid, this.scaleFluid);

        if (addToWorld)
        {
            this.game.world.add(layer);
        }

        this.layers.push(layer);

        if (typeof children !== 'undefined' && typeof children !== null)
        {
            layer.addMultiple(children);
        }

        return layer;

    },

    /**
     * A full layer is placed at 0,0 and extends to the full size of the game. Children are scaled according to the fluid ratios.
     *
     * @method Phaser.FlexGrid#createFullLayer
     * @param {array} [children] - An array of children that are used to populate the FlexLayer.
     * @return {Phaser.FlexLayer} The Layer object.
     */
    createFullLayer: function (children) {

        var layer = new Phaser.FlexLayer(this, this.positionFull, this.boundsFull, this.scaleFluid);

        this.game.world.add(layer);

        this.layers.push(layer);

        if (typeof children !== 'undefined')
        {
            layer.addMultiple(children);
        }

        return layer;

    },

    /**
     * A fixed layer is centered on the game and is the size of the required dimensions and is never scaled.
     *
     * @method Phaser.FlexGrid#createFixedLayer
     * @param {PIXI.DisplayObject[]} [children] - An array of children that are used to populate the FlexLayer.
     * @return {Phaser.FlexLayer} The Layer object.
     */
    createFixedLayer: function (children) {

        var layer = new Phaser.FlexLayer(this, this.positionNone, this.boundsNone, this.scaleNone);

        this.game.world.add(layer);

        this.layers.push(layer);

        if (typeof children !== 'undefined')
        {
            layer.addMultiple(children);
        }

        return layer;

    },

    /**
     * Resets the layer children references
     *
     * @method Phaser.FlexGrid#reset
     */
    reset: function () {

        var i = this.layers.length;

        while (i--)
        {
            if (!this.layers[i].persist)
            {
                //  Remove references to this class
                this.layers[i].position = null;
                this.layers[i].scale = null;
                this.layers.slice(i, 1);
            }
        }

    },

    /**
     * Called when the game container changes dimensions.
     *
     * @method Phaser.FlexGrid#onResize
     * @param {number} width - The new width of the game container.
     * @param {number} height - The new height of the game container.
     */
    onResize: function (width, height) {

        this.ratioH = width / height;
        this.ratioV = height / width;

        this.refresh(width, height);

    },

    /**
     * Updates all internal vars such as the bounds and scale values.
     *
     * @method Phaser.FlexGrid#refresh
     */
    refresh: function () {

        this.multiplier = Math.min((this.manager.height / this.height), (this.manager.width / this.width));

        this.boundsFluid.width = Math.round(this.width * this.multiplier);
        this.boundsFluid.height = Math.round(this.height * this.multiplier);

        this.scaleFluid.set(this.boundsFluid.width / this.width, this.boundsFluid.height / this.height);
        this.scaleFluidInversed.set(this.width / this.boundsFluid.width, this.height / this.boundsFluid.height);

        this.scaleFull.set(this.boundsFull.width / this.width, this.boundsFull.height / this.height);

        this.boundsFull.width = Math.round(this.manager.width * this.scaleFluidInversed.x);
        this.boundsFull.height = Math.round(this.manager.height * this.scaleFluidInversed.y);

        this.boundsFluid.centerOn(this.manager.bounds.centerX, this.manager.bounds.centerY);
        this.boundsNone.centerOn(this.manager.bounds.centerX, this.manager.bounds.centerY);

        this.positionFluid.set(this.boundsFluid.x, this.boundsFluid.y);
        this.positionNone.set(this.boundsNone.x, this.boundsNone.y);

    },

    /**
     * Fits a sprites width to the bounds.
     *
     * @method Phaser.FlexGrid#fitSprite
     * @param {Phaser.Sprite} sprite - The Sprite to fit.
     */
    fitSprite: function (sprite) {

        this.manager.scaleSprite(sprite);

        sprite.x = this.manager.bounds.centerX;
        sprite.y = this.manager.bounds.centerY;

    },

    /**
     * Call in the render function to output the bounds rects.
     *
     * @method Phaser.FlexGrid#debug
     */
    debug: function () {

        // for (var i = 0; i < this.layers.length; i++)
        // {
        //     this.layers[i].debug();
        // }

        // this.game.debug.text(this.boundsFull.width + ' x ' + this.boundsFull.height, this.boundsFull.x + 4, this.boundsFull.y + 16);
        // this.game.debug.geom(this.boundsFull, 'rgba(0,0,255,0.9', false);

        this.game.debug.text(this.boundsFluid.width + ' x ' + this.boundsFluid.height, this.boundsFluid.x + 4, this.boundsFluid.y + 16);
        this.game.debug.geom(this.boundsFluid, 'rgba(255,0,0,0.9', false);

        // this.game.debug.text(this.boundsNone.width + ' x ' + this.boundsNone.height, this.boundsNone.x + 4, this.boundsNone.y + 16);
        // this.game.debug.geom(this.boundsNone, 'rgba(0,255,0,0.9', false);

        // this.game.debug.text(this.boundsCustom.width + ' x ' + this.boundsCustom.height, this.boundsCustom.x + 4, this.boundsCustom.y + 16);
        // this.game.debug.geom(this.boundsCustom, 'rgba(255,255,0,0.9', false);

    }

};

Phaser.FlexGrid.prototype.constructor = Phaser.FlexGrid;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* WARNING: This is an EXPERIMENTAL class. The API will change significantly in the coming versions and is incomplete.
* Please try to avoid using in production games with a long time to build.
* This is also why the documentation is incomplete.
* 
* A responsive grid layer.
*
* @class Phaser.FlexLayer
* @extends Phaser.Group
* @constructor
* @param {Phaser.FlexGrid} manager - The FlexGrid that owns this FlexLayer.
* @param {Phaser.Point} position - A reference to the Point object used for positioning.
* @param {Phaser.Rectangle} bounds - A reference to the Rectangle used for the layer bounds.
* @param {Phaser.Point} scale - A reference to the Point object used for layer scaling.
*/
Phaser.FlexLayer = function (manager, position, bounds, scale) {

    Phaser.Group.call(this, manager.game, null, '__flexLayer' + manager.game.rnd.uuid(), false);

    /**
    * @property {Phaser.ScaleManager} scale - A reference to the ScaleManager.
    */
    this.manager = manager.manager;

    /**
    * @property {Phaser.FlexGrid} grid - A reference to the FlexGrid that owns this layer.
    */
    this.grid = manager;

    /**
     * Should the FlexLayer remain through a State swap?
     *
     * @type {boolean}
     */
    this.persist = false;

    /**
    * @property {Phaser.Point} position
    */
    this.position = position;

    /**
    * @property {Phaser.Rectangle} bounds
    */
    this.bounds = bounds;

    /**
    * @property {Phaser.Point} scale
    */
    this.scale = scale;

    /**
    * @property {Phaser.Point} topLeft
    */
    this.topLeft = bounds.topLeft;

    /**
    * @property {Phaser.Point} topMiddle
    */
    this.topMiddle = new Phaser.Point(bounds.halfWidth, 0);

    /**
    * @property {Phaser.Point} topRight
    */
    this.topRight = bounds.topRight;

    /**
    * @property {Phaser.Point} bottomLeft
    */
    this.bottomLeft = bounds.bottomLeft;

    /**
    * @property {Phaser.Point} bottomMiddle
    */
    this.bottomMiddle = new Phaser.Point(bounds.halfWidth, bounds.bottom);

    /**
    * @property {Phaser.Point} bottomRight
    */
    this.bottomRight = bounds.bottomRight;

};

Phaser.FlexLayer.prototype = Object.create(Phaser.Group.prototype);
Phaser.FlexLayer.prototype.constructor = Phaser.FlexLayer;

/**
 * Resize.
 *
 * @method Phaser.FlexLayer#resize
 */
Phaser.FlexLayer.prototype.resize = function () {
};

/**
 * Debug.
 *
 * @method Phaser.FlexLayer#debug
 */
Phaser.FlexLayer.prototype.debug = function () {

    this.game.debug.text(this.bounds.width + ' x ' + this.bounds.height, this.bounds.x + 4, this.bounds.y + 16);
    this.game.debug.geom(this.bounds, 'rgba(0,0,255,0.9', false);

    this.game.debug.geom(this.topLeft, 'rgba(255,255,255,0.9');
    this.game.debug.geom(this.topMiddle, 'rgba(255,255,255,0.9');
    this.game.debug.geom(this.topRight, 'rgba(255,255,255,0.9');

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* @classdesc
* The ScaleManager object handles the the scaling, resizing, and alignment of the
* Game size and the game Display canvas.
*
* The Game size is the logical size of the game; the Display canvas has size as an HTML element.
*
* The calculations of these are heavily influenced by the bounding Parent size which is the computed
* dimensions of the Display canvas's Parent container/element - the _effective CSS rules of the
* canvas's Parent element play an important role_ in the operation of the ScaleManager. 
*
* The Display canvas - or Game size, depending {@link #scaleMode} - is updated to best utilize the Parent size.
* When in Fullscreen mode or with {@link #parentIsWindow} the Parent size is that of the visual viewport (see {@link Phaser.ScaleManager#getParentBounds getParentBounds}).
*
* Parent and Display canvas containment guidelines:
*
* - Style the Parent element (of the game canvas) to control the Parent size and
*   thus the Display canvas's size and layout.
*
* - The Parent element's CSS styles should _effectively_ apply maximum (and minimum) bounding behavior.
*
* - The Parent element should _not_ apply a padding as this is not accounted for.
*   If a padding is required apply it to the Parent's parent or apply a margin to the Parent.
*   If you need to add a border, margin or any other CSS around your game container, then use a parent element and
*   apply the CSS to this instead, otherwise you'll be constantly resizing the shape of the game container.
*
* - The Display canvas layout CSS styles (i.e. margins, size) should not be altered/specified as
*   they may be updated by the ScaleManager.
*
* @description
* Create a new ScaleManager object - this is done automatically by {@link Phaser.Game}
*
* The `width` and `height` constructor parameters can either be a number which represents pixels or a string that represents a percentage: e.g. `800` (for 800 pixels) or `"80%"` for 80%.
*
* @class
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number|string} width - The width of the game. See above.
* @param {number|string} height - The height of the game. See above.
*/
Phaser.ScaleManager = function (game, width, height) {

    /**
    * A reference to the currently running game.
    * @property {Phaser.Game} game
    * @protected
    * @readonly
    */
    this.game = game;

    /**
    * Provides access to some cross-device DOM functions.
    * @property {Phaser.DOM} dom
    * @protected
    * @readonly
    */
    this.dom = Phaser.DOM;

    /**
    * _EXPERIMENTAL:_ A responsive grid on which you can align game objects.
    * @property {Phaser.FlexGrid} grid
    * @public
    */
    this.grid = null;

    /**
    * Target width (in pixels) of the Display canvas.
    * @property {number} width
    * @readonly
    */
    this.width = 0;

    /**
    * Target height (in pixels) of the Display canvas.
    * @property {number} height
    * @readonly
    */
    this.height = 0;

    /**
    * Minimum width the canvas should be scaled to (in pixels).
    * Change with {@link #setMinMax}.
    * @property {?number} minWidth
    * @readonly
    * @protected
    */
    this.minWidth = null;

    /**
    * Maximum width the canvas should be scaled to (in pixels).
    * If null it will scale to whatever width the browser can handle.
    * Change with {@link #setMinMax}.
    * @property {?number} maxWidth
    * @readonly
    * @protected
    */
    this.maxWidth = null;

    /**
    * Minimum height the canvas should be scaled to (in pixels).
    * Change with {@link #setMinMax}.
    * @property {?number} minHeight
    * @readonly
    * @protected
    */
    this.minHeight = null;

    /**
    * Maximum height the canvas should be scaled to (in pixels).
    * If null it will scale to whatever height the browser can handle.
    * Change with {@link #setMinMax}.
    * @property {?number} maxHeight
    * @readonly
    * @protected
    */
    this.maxHeight = null;

    /**
    * The offset coordinates of the Display canvas from the top-left of the browser window.
    * The is used internally by Phaser.Pointer (for Input) and possibly other types.
    * @property {Phaser.Point} offset
    * @readonly
    * @protected
    */
    this.offset = new Phaser.Point();

    /**
    * If true, the game should only run in a landscape orientation.
    * Change with {@link #forceOrientation}.
    * @property {boolean} forceLandscape
    * @readonly
    * @default
    * @protected
    */
    this.forceLandscape = false;

    /**
    * If true, the game should only run in a portrait 
    * Change with {@link #forceOrientation}.
    * @property {boolean} forcePortrait
    * @readonly
    * @default
    * @protected
    */
    this.forcePortrait = false;

    /**
    * True if {@link #forceLandscape} or {@link #forcePortrait} are set and do not agree with the browser orientation.
    *
    * This value is not updated immediately.
    *
    * @property {boolean} incorrectOrientation    
    * @readonly
    * @protected
    */
    this.incorrectOrientation = false;

    /**
    * See {@link #pageAlignHorizontally}.
    * @property {boolean} _pageAlignHorizontally
    * @private
    */
    this._pageAlignHorizontally = false;

    /**
    * See {@link #pageAlignVertically}.
    * @property {boolean} _pageAlignVertically
    * @private
    */
    this._pageAlignVertically = false;

    /**
    * This signal is dispatched when the orientation changes _or_ the validity of the current orientation changes.
    * 
    * The signal is supplied with the following arguments:
    * - `scale` - the ScaleManager object
    * - `prevOrientation`, a string - The previous orientation as per {@link Phaser.ScaleManager#screenOrientation screenOrientation}.
    * - `wasIncorrect`, a boolean - True if the previous orientation was last determined to be incorrect.
    *
    * Access the current orientation and validity with `scale.screenOrientation` and `scale.incorrectOrientation`.
    * Thus the following tests can be done:
    *
    *     // The orientation itself changed:
    *     scale.screenOrientation !== prevOrientation
    *     // The orientation just became incorrect:
    *     scale.incorrectOrientation && !wasIncorrect
    *
    * It is possible that this signal is triggered after {@link #forceOrientation} so the orientation
    * correctness changes even if the orientation itself does not change.
    *
    * This is signaled from `preUpdate` (or `pauseUpdate`) _even when_ the game is paused.
    *
    * @property {Phaser.Signal} onOrientationChange
    * @public
    */
    this.onOrientationChange = new Phaser.Signal();

    /**
    * This signal is dispatched when the browser enters an incorrect orientation, as defined by {@link #forceOrientation}.
    *
    * This is signaled from `preUpdate` (or `pauseUpdate`) _even when_ the game is paused.
    *
    * @property {Phaser.Signal} enterIncorrectOrientation
    * @public
    */
    this.enterIncorrectOrientation = new Phaser.Signal();

    /**
    * This signal is dispatched when the browser leaves an incorrect orientation, as defined by {@link #forceOrientation}.
    *
    * This is signaled from `preUpdate` (or `pauseUpdate`) _even when_ the game is paused.
    *
    * @property {Phaser.Signal} leaveIncorrectOrientation
    * @public
    */
    this.leaveIncorrectOrientation = new Phaser.Signal();

    /**
    * If specified, this is the DOM element on which the Fullscreen API enter request will be invoked.
    * The target element must have the correct CSS styling and contain the Display canvas.
    *
    * The elements style will be modified (ie. the width and height might be set to 100%)
    * but it will not be added to, removed from, or repositioned within the DOM.
    * An attempt is made to restore relevant style changes when fullscreen mode is left.
    *
    * For pre-2.2.0 behavior set `game.scale.fullScreenTarget = game.canvas`.
    *
    * @property {?DOMElement} fullScreenTarget
    * @default
    */
    this.fullScreenTarget = null;

    /**
    * The fullscreen target, as created by {@link #createFullScreenTarget}.
    * This is not set if {@link #fullScreenTarget} is used and is cleared when fullscreen mode ends.
    * @property {?DOMElement} _createdFullScreenTarget
    * @private
    */
    this._createdFullScreenTarget = null;

    /**
    * This signal is dispatched when fullscreen mode is ready to be initialized but
    * before the fullscreen request.
    *
    * The signal is passed two arguments: `scale` (the ScaleManager), and an object in the form `{targetElement: DOMElement}`.
    *
    * The `targetElement` is the {@link #fullScreenTarget} element,
    * if such is assigned, or a new element created by {@link #createFullScreenTarget}.
    *
    * Custom CSS styling or resets can be applied to `targetElement` as required.
    *
    * If `targetElement` is _not_ the same element as {@link #fullScreenTarget}:
    * - After initialization the Display canvas is moved onto the `targetElement` for
    *   the duration of the fullscreen mode, and restored to it's original DOM location when fullscreen is exited.
    * - The `targetElement` is moved/re-parented within the DOM and may have its CSS styles updated.
    *
    * The behavior of a pre-assigned target element is covered in {@link Phaser.ScaleManager#fullScreenTarget fullScreenTarget}.
    *
    * @property {Phaser.Signal} onFullScreenInit
    * @public
    */
    this.onFullScreenInit = new Phaser.Signal();

    /**
    * This signal is dispatched when the browser enters or leaves fullscreen mode, if supported.
    *
    * The signal is supplied with a single argument: `scale` (the ScaleManager). Use `scale.isFullScreen` to determine
    * if currently running in Fullscreen mode.
    *
    * @property {Phaser.Signal} onFullScreenChange
    * @public    
    */
    this.onFullScreenChange = new Phaser.Signal();

    /**
    * This signal is dispatched when the browser fails to enter fullscreen mode;
    * or if the device does not support fullscreen mode and `startFullScreen` is invoked.
    *
    * The signal is supplied with a single argument: `scale` (the ScaleManager).
    *
    * @property {Phaser.Signal} onFullScreenError
    * @public
    */
    this.onFullScreenError = new Phaser.Signal();

    /**
    * The _last known_ orientation of the screen, as defined in the Window Screen Web API.
    * See {@link Phaser.DOM.getScreenOrientation} for possible values.
    *
    * @property {string} screenOrientation
    * @readonly
    * @public
    */
    this.screenOrientation = this.dom.getScreenOrientation();

    /**
    * The _current_ scale factor based on the game dimensions vs. the scaled dimensions.
    * @property {Phaser.Point} scaleFactor
    * @readonly
    */
    this.scaleFactor = new Phaser.Point(1, 1);

    /**
    * The _current_ inversed scale factor. The displayed dimensions divided by the game dimensions.
    * @property {Phaser.Point} scaleFactorInversed
    * @readonly
    * @protected
    */
    this.scaleFactorInversed = new Phaser.Point(1, 1);

    /**
    * The Display canvas is aligned by adjusting the margins; the last margins are stored here.
    *
    * @property {Bounds-like} margin
    * @readonly
    * @protected
    */
    this.margin = {left: 0, top: 0, right: 0, bottom: 0, x: 0, y: 0};

    /**
    * The bounds of the scaled game. The x/y will match the offset of the canvas element and the width/height the scaled width and height.
    * @property {Phaser.Rectangle} bounds
    * @readonly
    */
    this.bounds = new Phaser.Rectangle();

    /**
    * The aspect ratio of the scaled Display canvas.
    * @property {number} aspectRatio
    * @readonly
    */
    this.aspectRatio = 0;

    /**
    * The aspect ratio of the original game dimensions.
    * @property {number} sourceAspectRatio
    * @readonly
    */
    this.sourceAspectRatio = 0;

    /**
    * The native browser events from Fullscreen API changes.
    * @property {any} event
    * @readonly
    * @private
    */
    this.event = null;

    /**
    * The edges on which to constrain the game Display/canvas in _addition_ to the restrictions of the parent container.
    *
    * The properties are strings and can be '', 'visual', 'layout', or 'layout-soft'.
    * - If 'visual', the edge will be constrained to the Window / displayed screen area
    * - If 'layout', the edge will be constrained to the CSS Layout bounds
    * - An invalid value is treated as 'visual'
    *
    * @member
    * @property {string} bottom
    * @property {string} right
    * @default
    */
    this.windowConstraints = {
        right: 'layout',
        bottom: ''
    };

    /**
    * Various compatibility settings.
    * A value of "(auto)" indicates the setting is configured based on device and runtime information.
    *
    * A {@link #refresh} may need to be performed after making changes.
    *
    * @protected
    * 
    * @property {boolean} [supportsFullscreen=(auto)] - True only if fullscreen support will be used. (Changing to fullscreen still might not work.)
    *
    * @property {boolean} [orientationFallback=(auto)] - See {@link Phaser.DOM.getScreenOrientation}.
    *
    * @property {boolean} [noMargins=false] - If true then the Display canvas's margins will not be updated anymore: existing margins must be manually cleared. Disabling margins prevents automatic canvas alignment/centering, possibly in fullscreen.
    *
    * @property {?Phaser.Point} [scrollTo=(auto)] - If specified the window will be scrolled to this position on every refresh.
    *
    * @property {boolean} [forceMinimumDocumentHeight=false] - If enabled the document elements minimum height is explicitly set on updates.
    *    The height set varies by device and may either be the height of the window or the viewport.
    *
    * @property {boolean} [canExpandParent=true] - If enabled then SHOW_ALL and USER_SCALE modes can try and expand the parent element. It may be necessary for the parent element to impose CSS width/height restrictions.
    *
    * @property {string} [clickTrampoline=(auto)] - On certain browsers (eg. IE) FullScreen events need to be triggered via 'click' events.
    *     A value of 'when-not-mouse' uses a click trampoline when a pointer that is not the primary mouse is used.
    *     Any other string value (including the empty string) prevents using click trampolines.
    *     For more details on click trampolines see {@link Phaser.Pointer#addClickTrampoline}.
    */
    this.compatibility = {
        supportsFullScreen: false,
        orientationFallback: null,
        noMargins: false,
        scrollTo: null,
        forceMinimumDocumentHeight: false,
        canExpandParent: true,
        clickTrampoline: ''
    };

    /**
    * Scale mode to be used when not in fullscreen.
    * @property {number} _scaleMode
    * @private
    */
    this._scaleMode = Phaser.ScaleManager.NO_SCALE;

    /*
    * Scale mode to be used in fullscreen.
    * @property {number} _fullScreenScaleMode
    * @private
    */
    this._fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    /**
    * If the parent container of the Game canvas is the browser window itself (i.e. document.body),
    * rather than another div, this should set to `true`.
    *
    * The {@link #parentNode} property is generally ignored while this is in effect.
    *
    * @property {boolean} parentIsWindow
    */
    this.parentIsWindow = false;

    /**
    * The _original_ DOM element for the parent of the Display canvas.
    * This may be different in fullscreen - see {@link #createFullScreenTarget}.
    *
    * This should only be changed after moving the Game canvas to a different DOM parent.
    *
    * @property {?DOMElement} parentNode
    */
    this.parentNode = null;

    /**
    * The scale of the game in relation to its parent container.
    * @property {Phaser.Point} parentScaleFactor
    * @readonly
    */
    this.parentScaleFactor = new Phaser.Point(1, 1);

    /**
    * The maximum time (in ms) between dimension update checks for the Canvas's parent element (or window).
    * Update checks normally happen quicker in response to other events.
    *
    * @property {integer} trackParentInterval
    * @default
    * @protected
    * @see {@link Phaser.ScaleManager#refresh refresh}
    */
    this.trackParentInterval = 2000;

    /**
    * This signal is dispatched when the size of the Display canvas changes _or_ the size of the Game changes. 
    * When invoked this is done _after_ the Canvas size/position have been updated.
    *
    * This signal is _only_ called when a change occurs and a reflow may be required.
    * For example, if the canvas does not change sizes because of CSS settings (such as min-width)
    * then this signal will _not_ be triggered.
    *
    * Use this to handle responsive game layout options.
    *
    * This is signaled from `preUpdate` (or `pauseUpdate`) _even when_ the game is paused.
    *
    * @property {Phaser.Signal} onSizeChange
    * @todo Formalize the arguments, if any, supplied to this signal.
    */
    this.onSizeChange = new Phaser.Signal();

    /**
    * The callback that will be called each the parent container resizes.
    * @property {function} onResize
    * @private
    */
    this.onResize = null;

    /**
    * The context in which the {@link #onResize} callback will be called.
    * @property {object} onResizeContext
    * @private
    */
    this.onResizeContext = null;

    /**
    * @property {integer} _pendingScaleMode - Used to retain the scale mode if set from config before Boot.
    * @private
    */
    this._pendingScaleMode = null;

    /**
    * Information saved when fullscreen mode is started.
    * @property {?object} _fullScreenRestore
    * @private
    */
    this._fullScreenRestore = null;

    /**
    * The _actual_ game dimensions, as initially set or set by {@link #setGameSize}.
    * @property {Phaser.Rectangle} _gameSize
    * @private
    */
    this._gameSize = new Phaser.Rectangle();

    /**
    * The user-supplied scale factor, used with the USER_SCALE scaling mode.
    * @property {Phaser.Point} _userScaleFactor
    * @private
    */
    this._userScaleFactor = new Phaser.Point(1, 1);

    /**
    * The user-supplied scale trim, used with the USER_SCALE scaling mode.
    * @property {Phaser.Point} _userScaleTrim
    * @private
    */
    this._userScaleTrim = new Phaser.Point(0, 0);

    /**
    * The last time the bounds were checked in `preUpdate`.
    * @property {number} _lastUpdate
    * @private
    */
    this._lastUpdate = 0;

    /**
    * Size checks updates are delayed according to the throttle.
    * The throttle increases to `trackParentInterval` over time and is used to more
    * rapidly detect changes in certain browsers (eg. IE) while providing back-off safety.
    * @property {integer} _updateThrottle
    * @private
    */
    this._updateThrottle = 0;

    /**
    * The minimum throttle allowed until it has slowed down sufficiently.
    * @property {integer} _updateThrottleReset   
    * @private
    */
    this._updateThrottleReset = 100;

    /**
    * The cached result of the parent (possibly window) bounds; used to invalidate sizing.
    * @property {Phaser.Rectangle} _parentBounds
    * @private
    */
    this._parentBounds = new Phaser.Rectangle();

    /**
    * Temporary bounds used for internal work to cut down on new objects created.
    * @property {Phaser.Rectangle} _parentBounds
    * @private
    */
    this._tempBounds = new Phaser.Rectangle();

    /**
    * The Canvas size at which the last onSizeChange signal was triggered.
    * @property {Phaser.Rectangle} _lastReportedCanvasSize
    * @private
    */
    this._lastReportedCanvasSize = new Phaser.Rectangle();

    /**
    * The Game size at which the last onSizeChange signal was triggered.
    * @property {Phaser.Rectangle} _lastReportedGameSize
    * @private
    */
    this._lastReportedGameSize = new Phaser.Rectangle();

    /**
    * @property {boolean} _booted - ScaleManager booted state.
    * @private
    */
    this._booted = false;

    if (game.config)
    {
        this.parseConfig(game.config);
    }

    this.setupScale(width, height);

};

/**
* A scale mode that stretches content to fill all available space - see {@link Phaser.ScaleManager#scaleMode scaleMode}.
*
* @constant
* @type {integer}
*/
Phaser.ScaleManager.EXACT_FIT = 0;

/**
* A scale mode that prevents any scaling - see {@link Phaser.ScaleManager#scaleMode scaleMode}.
*
* @constant
* @type {integer}
*/
Phaser.ScaleManager.NO_SCALE = 1;

/**
* A scale mode that shows the entire game while maintaining proportions - see {@link Phaser.ScaleManager#scaleMode scaleMode}.
*
* @constant
* @type {integer}
*/
Phaser.ScaleManager.SHOW_ALL = 2;

/**
* A scale mode that causes the Game size to change - see {@link Phaser.ScaleManager#scaleMode scaleMode}.
*
* @constant
* @type {integer}
*/
Phaser.ScaleManager.RESIZE = 3;

/**
* A scale mode that allows a custom scale factor - see {@link Phaser.ScaleManager#scaleMode scaleMode}.
*
* @constant
* @type {integer}
*/
Phaser.ScaleManager.USER_SCALE = 4;

Phaser.ScaleManager.prototype = {

    /**
    * Start the ScaleManager.
    * 
    * @method Phaser.ScaleManager#boot
    * @protected
    */
    boot: function () {

        // Configure device-dependent compatibility

        var compat = this.compatibility;
        
        compat.supportsFullScreen = this.game.device.fullscreen && !this.game.device.cocoonJS;

        //  We can't do anything about the status bars in iPads, web apps or desktops
        if (!this.game.device.iPad && !this.game.device.webApp && !this.game.device.desktop)
        {
            if (this.game.device.android && !this.game.device.chrome)
            {
                compat.scrollTo = new Phaser.Point(0, 1);
            }
            else
            {
                compat.scrollTo = new Phaser.Point(0, 0);
            }
        }

        if (this.game.device.desktop)
        {
            compat.orientationFallback = 'screen';
            compat.clickTrampoline = 'when-not-mouse';
        }
        else
        {
            compat.orientationFallback = '';
            compat.clickTrampoline = '';
        }

        // Configure event listeners

        var _this = this;

        this._orientationChange = function(event) {
            return _this.orientationChange(event);
        };

        this._windowResize = function(event) {
            return _this.windowResize(event);
        };

        // This does not appear to be on the standards track
        window.addEventListener('orientationchange', this._orientationChange, false);
        window.addEventListener('resize', this._windowResize, false);

        if (this.compatibility.supportsFullScreen)
        {
            this._fullScreenChange = function(event) {
                return _this.fullScreenChange(event);
            };

            this._fullScreenError = function(event) {
                return _this.fullScreenError(event);
            };

            document.addEventListener('webkitfullscreenchange', this._fullScreenChange, false);
            document.addEventListener('mozfullscreenchange', this._fullScreenChange, false);
            document.addEventListener('MSFullscreenChange', this._fullScreenChange, false);
            document.addEventListener('fullscreenchange', this._fullScreenChange, false);

            document.addEventListener('webkitfullscreenerror', this._fullScreenError, false);
            document.addEventListener('mozfullscreenerror', this._fullScreenError, false);
            document.addEventListener('MSFullscreenError', this._fullScreenError, false);
            document.addEventListener('fullscreenerror', this._fullScreenError, false);
        }

        this.game.onResume.add(this._gameResumed, this);

        // Initialize core bounds

        this.dom.getOffset(this.game.canvas, this.offset);

        this.bounds.setTo(this.offset.x, this.offset.y, this.width, this.height);

        this.setGameSize(this.game.width, this.game.height);

        // Don't use updateOrientationState so events are not fired
        this.screenOrientation = this.dom.getScreenOrientation(this.compatibility.orientationFallback);

        this.grid = new Phaser.FlexGrid(this, this.width, this.height);

        this._booted = true;

        if (this._pendingScaleMode)
        {
            this.scaleMode = this._pendingScaleMode;
            this._pendingScaleMode = null;
        }

    },

    /**
    * Load configuration settings.
    * 
    * @method Phaser.ScaleManager#parseConfig
    * @protected
    * @param {object} config - The game configuration object.
    */
    parseConfig: function (config) {

        if (config['scaleMode'])
        {
            if (this._booted)
            {
                this.scaleMode = config['scaleMode'];
            }
            else
            {
                this._pendingScaleMode = config['scaleMode'];
            }
        }

        if (config['fullScreenScaleMode'])
        {
            this.fullScreenScaleMode = config['fullScreenScaleMode'];
        }

        if (config['fullScreenTarget'])
        {
            this.fullScreenTarget = config['fullScreenTarget'];
        }

    },

    /**
    * Calculates and sets the game dimensions based on the given width and height.
    *
    * This should _not_ be called when in fullscreen mode.
    * 
    * @method Phaser.ScaleManager#setupScale
    * @protected
    * @param {number|string} width - The width of the game.
    * @param {number|string} height - The height of the game.
    */
    setupScale: function (width, height) {

        var target;
        var rect = new Phaser.Rectangle();

        if (this.game.parent !== '')
        {
            if (typeof this.game.parent === 'string')
            {
                // hopefully an element ID
                target = document.getElementById(this.game.parent);
            }
            else if (this.game.parent && this.game.parent.nodeType === 1)
            {
                // quick test for a HTMLelement
                target = this.game.parent;
            }
        }

        // Fallback, covers an invalid ID and a non HTMLelement object
        if (!target)
        {
            //  Use the full window
            this.parentNode = null;
            this.parentIsWindow = true;

            rect.width = this.dom.visualBounds.width;
            rect.height = this.dom.visualBounds.height;

            this.offset.set(0, 0);
        }
        else
        {
            this.parentNode = target;
            this.parentIsWindow = false;

            this.getParentBounds(this._parentBounds);

            rect.width = this._parentBounds.width;
            rect.height = this._parentBounds.height;

            this.offset.set(this._parentBounds.x, this._parentBounds.y);
        }

        var newWidth = 0;
        var newHeight = 0;

        if (typeof width === 'number')
        {
            newWidth = width;
        }
        else
        {
            //  Percentage based
            this.parentScaleFactor.x = parseInt(width, 10) / 100;
            newWidth = rect.width * this.parentScaleFactor.x;
        }

        if (typeof height === 'number')
        {
            newHeight = height;
        }
        else
        {
            //  Percentage based
            this.parentScaleFactor.y = parseInt(height, 10) / 100;
            newHeight = rect.height * this.parentScaleFactor.y;
        }

        this._gameSize.setTo(0, 0, newWidth, newHeight);

        this.updateDimensions(newWidth, newHeight, false);

    },

    /**
    * Invoked when the game is resumed.
    * 
    * @method Phaser.ScaleManager#_gameResumed
    * @private
    */
    _gameResumed: function () {

        this.queueUpdate(true);

    },

    /**
    * Set the actual Game size.
    * Use this instead of directly changing `game.width` or `game.height`.
    *
    * The actual physical display (Canvas element size) depends on various settings including
    * - Scale mode
    * - Scaling factor
    * - Size of Canvas's parent element or CSS rules such as min-height/max-height;
    * - The size of the Window
    *
    * @method Phaser.ScaleManager#setGameSize
    * @public
    * @param {integer} width - _Game width_, in pixels.
    * @param {integer} height - _Game height_, in pixels.
    */
    setGameSize: function (width, height) {

        this._gameSize.setTo(0, 0, width, height);
        
        if (this.currentScaleMode !== Phaser.ScaleManager.RESIZE)
        {
            this.updateDimensions(width, height, true);
        }

        this.queueUpdate(true);

    },

    /**
    * Set a User scaling factor used in the USER_SCALE scaling mode.
    *
    * The target canvas size is computed by:
    *
    *     canvas.width = (game.width * hScale) - hTrim
    *     canvas.height = (game.height * vScale) - vTrim
    *
    * This method can be used in the {@link Phaser.ScaleManager#setResizeCallback resize callback}.
    *
    * @method Phaser.ScaleManager#setUserScale
    * @param {number} hScale - Horizontal scaling factor.
    * @param {numer} vScale - Vertical scaling factor.
    * @param {integer} [hTrim=0] - Horizontal trim, applied after scaling.
    * @param {integer} [vTrim=0] - Vertical trim, applied after scaling.
    */
    setUserScale: function (hScale, vScale, hTrim, vTrim) {

        this._userScaleFactor.setTo(hScale, vScale);
        this._userScaleTrim.setTo(hTrim | 0, vTrim | 0);
        this.queueUpdate(true);

    },

    /**
    * Sets the callback that will be invoked before sizing calculations.
    *
    * This is the appropriate place to call {@link #setUserScale} if needing custom dynamic scaling.
    *
    * The callback is supplied with two arguments `scale` and `parentBounds` where `scale` is the ScaleManager
    * and `parentBounds`, a Phaser.Rectangle, is the size of the Parent element.
    *
    * This callback
    * - May be invoked even though the parent container or canvas sizes have not changed
    * - Unlike {@link #onSizeChange}, it runs _before_ the canvas is guaranteed to be updated
    * - Will be invoked from `preUpdate`, _even when_ the game is paused    
    *
    * See {@link #onSizeChange} for a better way of reacting to layout updates.
    * 
    * @method Phaser.ScaleManager#setResizeCallback
    * @public
    * @param {function} callback - The callback that will be called each time a window.resize event happens or if set, the parent container resizes.
    * @param {object} context - The context in which the callback will be called.
    */
    setResizeCallback: function (callback, context) {

        this.onResize = callback;
        this.onResizeContext = context;

    },

    /**
    * Signals a resize - IF the canvas or Game size differs from the last signal.
    *
    * This also triggers updates on {@link #grid} (FlexGrid) and, if in a RESIZE mode, `game.state` (StateManager).
    *
    * @method Phaser.ScaleManager#signalSizeChange
    * @private
    */
    signalSizeChange: function () {

        if (!Phaser.Rectangle.sameDimensions(this, this._lastReportedCanvasSize) ||
            !Phaser.Rectangle.sameDimensions(this.game, this._lastReportedGameSize))
        {
            var width = this.width;
            var height = this.height;

            this._lastReportedCanvasSize.setTo(0, 0, width, height);
            this._lastReportedGameSize.setTo(0, 0, this.game.width, this.game.height);

            this.grid.onResize(width, height);

            this.onSizeChange.dispatch(this, width, height);

            // Per StateManager#onResizeCallback, it only occurs when in RESIZE mode.
            if (this.currentScaleMode === Phaser.ScaleManager.RESIZE)
            {
                this.game.state.resize(width, height);
                this.game.load.resize(width, height);
            }
        }

    },

    /**
    * Set the min and max dimensions for the Display canvas.
    * 
    * _Note:_ The min/max dimensions are only applied in some cases
    * - When the device is not in an incorrect orientation; or
    * - The scale mode is EXACT_FIT when not in fullscreen
    *
    * @method Phaser.ScaleManager#setMinMax
    * @public
    * @param {number} minWidth - The minimum width the game is allowed to scale down to.
    * @param {number} minHeight - The minimum height the game is allowed to scale down to.
    * @param {number} [maxWidth] - The maximum width the game is allowed to scale up to; only changed if specified.
    * @param {number} [maxHeight] - The maximum height the game is allowed to scale up to; only changed if specified.
    * @todo These values are only sometimes honored.
    */
    setMinMax: function (minWidth, minHeight, maxWidth, maxHeight) {

        this.minWidth = minWidth;
        this.minHeight = minHeight;

        if (typeof maxWidth !== 'undefined')
        {
            this.maxWidth = maxWidth;
        }

        if (typeof maxHeight !== 'undefined')
        {
            this.maxHeight = maxHeight;
        }

    },

    /**
    * The ScaleManager.preUpdate is called automatically by the core Game loop.
    * 
    * @method Phaser.ScaleManager#preUpdate
    * @protected
    */
    preUpdate: function () {

        if (this.game.time.time < (this._lastUpdate + this._updateThrottle))
        {
            return;
        }

        var prevThrottle = this._updateThrottle;
        this._updateThrottleReset = prevThrottle >= 400 ? 0 : 100;

        this.dom.getOffset(this.game.canvas, this.offset);

        var prevWidth = this._parentBounds.width;
        var prevHeight = this._parentBounds.height;
        var bounds = this.getParentBounds(this._parentBounds);

        var boundsChanged = bounds.width !== prevWidth || bounds.height !== prevHeight;

        // Always invalidate on a newly detected orientation change
        var orientationChanged = this.updateOrientationState();

        if (boundsChanged || orientationChanged)
        {
            if (this.onResize)
            {
                this.onResize.call(this.onResizeContext, this, bounds);
            }

            this.updateLayout();

            this.signalSizeChange();
        }

        // Next throttle, eg. 25, 50, 100, 200..
        var throttle = this._updateThrottle * 2;

        // Don't let an update be too eager about resetting the throttle.
        if (this._updateThrottle < prevThrottle)
        {
            throttle = Math.min(prevThrottle, this._updateThrottleReset);
        }

        this._updateThrottle = Phaser.Math.clamp(throttle, 25, this.trackParentInterval);
        this._lastUpdate = this.game.time.time;

    },

    /**
    * Update method while paused.
    *
    * @method Phaser.ScaleManager#pauseUpdate
    * @private
    */
    pauseUpdate: function () {

        this.preUpdate();

        // Updates at slowest.
        this._updateThrottle = this.trackParentInterval;
        
    },

    /**
    * Update the dimensions taking the parent scaling factor into account.
    *
    * @method Phaser.ScaleManager#updateDimensions
    * @private
    * @param {number} width - The new width of the parent container.
    * @param {number} height - The new height of the parent container.
    * @param {boolean} resize - True if the renderer should be resized, otherwise false to just update the internal vars.
    */
    updateDimensions: function (width, height, resize) {

        this.width = width * this.parentScaleFactor.x;
        this.height = height * this.parentScaleFactor.y;

        this.game.width = this.width;
        this.game.height = this.height;

        this.sourceAspectRatio = this.width / this.height;
        this.updateScalingAndBounds();

        if (resize)
        {
            //  Resize the renderer (which in turn resizes the Display canvas!)
            this.game.renderer.resize(this.width, this.height);

            //  The Camera can never be smaller than the Game size
            this.game.camera.setSize(this.width, this.height);

            //  This should only happen if the world is smaller than the new canvas size
            this.game.world.resize(this.width, this.height);
        }

    },

    /**
    * Update relevant scaling values based on the ScaleManager dimension and game dimensions,
    * which should already be set. This does not change {@link #sourceAspectRatio}.
    * 
    * @method Phaser.ScaleManager#updateScalingAndBounds
    * @private
    */
    updateScalingAndBounds: function () {

        this.scaleFactor.x = this.game.width / this.width;
        this.scaleFactor.y = this.game.height / this.height;

        this.scaleFactorInversed.x = this.width / this.game.width;
        this.scaleFactorInversed.y = this.height / this.game.height;

        this.aspectRatio = this.width / this.height;

        // This can be invoked in boot pre-canvas
        if (this.game.canvas)
        {
            this.dom.getOffset(this.game.canvas, this.offset);
        }

        this.bounds.setTo(this.offset.x, this.offset.y, this.width, this.height);

        // Can be invoked in boot pre-input
        if (this.game.input && this.game.input.scale)
        {
            this.game.input.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
        }

    },

    /**
    * Force the game to run in only one orientation.
    *
    * This enables generation of incorrect orientation signals and affects resizing but does not otherwise rotate or lock the orientation.
    *
    * Orientation checks are performed via the Screen Orientation API, if available in browser. This means it will check your monitor
    * orientation on desktop, or your device orientation on mobile, rather than comparing actual game dimensions. If you need to check the 
    * viewport dimensions instead and bypass the Screen Orientation API then set: `ScaleManager.compatibility.orientationFallback = 'viewport'`
    * 
    * @method Phaser.ScaleManager#forceOrientation
    * @public
    * @param {boolean} forceLandscape - true if the game should run in landscape mode only.
    * @param {boolean} [forcePortrait=false] - true if the game should run in portrait mode only.
    */
    forceOrientation: function (forceLandscape, forcePortrait) {

        if (forcePortrait === undefined) { forcePortrait = false; }

        this.forceLandscape = forceLandscape;
        this.forcePortrait = forcePortrait;

        this.queueUpdate(true);

    },

    /**
    * Classify the orientation, per `getScreenOrientation`.
    * 
    * @method Phaser.ScaleManager#classifyOrientation
    * @private
    * @param {string} orientation - The orientation string, e.g. 'portrait-primary'.
    * @return {?string} The classified orientation: 'portrait', 'landscape`, or null.
    */
    classifyOrientation: function (orientation) {

        if (orientation === 'portrait-primary' || orientation === 'portrait-secondary')
        {
            return 'portrait';
        }
        else if (orientation === 'landscape-primary' || orientation === 'landscape-secondary')
        {
            return 'landscape';
        }
        else
        {
            return null;
        }

    },

    /**
    * Updates the current orientation and dispatches orientation change events.
    * 
    * @method Phaser.ScaleManager#updateOrientationState
    * @private
    * @return {boolean} True if the orientation state changed which means a forced update is likely required.
    */
    updateOrientationState: function () {

        var previousOrientation = this.screenOrientation;
        var previouslyIncorrect = this.incorrectOrientation;
        
        this.screenOrientation = this.dom.getScreenOrientation(this.compatibility.orientationFallback);

        this.incorrectOrientation = (this.forceLandscape && !this.isLandscape) ||
            (this.forcePortrait && !this.isPortrait);

        var changed = previousOrientation !== this.screenOrientation;
        var correctnessChanged = previouslyIncorrect !== this.incorrectOrientation;

        if (correctnessChanged)
        {
            if (this.incorrectOrientation)
            {
                this.enterIncorrectOrientation.dispatch();
            }
            else
            {
                this.leaveIncorrectOrientation.dispatch();
            }
        }

        if (changed || correctnessChanged)
        {
            this.onOrientationChange.dispatch(this, previousOrientation, previouslyIncorrect);
        }

        return changed || correctnessChanged;

    },

    /**
    * window.orientationchange event handler.
    * 
    * @method Phaser.ScaleManager#orientationChange
    * @private
    * @param {Event} event - The orientationchange event data.
    */
    orientationChange: function (event) {

        this.event = event;

        this.queueUpdate(true);

    },

    /**
    * window.resize event handler.
    * 
    * @method Phaser.ScaleManager#windowResize
    * @private
    * @param {Event} event - The resize event data.
    */
    windowResize: function (event) {

        this.event = event;

        this.queueUpdate(true);

    },

    /**
    * Scroll to the top - in some environments. See `compatibility.scrollTo`.
    * 
    * @method Phaser.ScaleManager#scrollTop
    * @private
    */
    scrollTop: function () {

        var scrollTo = this.compatibility.scrollTo;

        if (scrollTo)
        {
            window.scrollTo(scrollTo.x, scrollTo.y);
        }

    },

    /**
    * The "refresh" methods informs the ScaleManager that a layout refresh is required.
    *
    * The ScaleManager automatically queues a layout refresh (eg. updates the Game size or Display canvas layout)
    * when the browser is resized, the orientation changes, or when there is a detected change
    * of the Parent size. Refreshing is also done automatically when public properties,
    * such as {@link #scaleMode}, are updated or state-changing methods are invoked.
    *
    * The "refresh" method _may_ need to be used in a few (rare) situtations when
    *
    * - a device change event is not correctly detected; or
    * - the Parent size changes (and an immediate reflow is desired); or
    * - the ScaleManager state is updated by non-standard means; or
    * - certain {@link #compatibility} properties are manually changed.
    *
    * The queued layout refresh is not immediate but will run promptly in an upcoming `preRender`.
    * 
    * @method Phaser.ScaleManager#refresh
    * @public
    */
    refresh: function () {

        this.scrollTop();
        this.queueUpdate(true);

    },

    /**
    * Updates the game / canvas position and size.
    *
    * @method Phaser.ScaleManager#updateLayout
    * @private
    */
    updateLayout: function () {

        var scaleMode = this.currentScaleMode;

        if (scaleMode === Phaser.ScaleManager.RESIZE)
        {
            this.reflowGame();
            return;
        }

        this.scrollTop();

        if (this.compatibility.forceMinimumDocumentHeight)
        {
            // (This came from older code, by why is it here?)
            // Set minimum height of content to new window height
            document.documentElement.style.minHeight = window.innerHeight + 'px';
        }
        
        if (this.incorrectOrientation)
        {
            this.setMaximum();
        }
        else
        {
            if (scaleMode === Phaser.ScaleManager.EXACT_FIT)
            {
                this.setExactFit();
            }
            else if (scaleMode === Phaser.ScaleManager.SHOW_ALL)
            {
                if (!this.isFullScreen && this.boundingParent &&
                    this.compatibility.canExpandParent)
                {
                    // Try to expand parent out, but choosing maximizing dimensions.                    
                    // Then select minimize dimensions which should then honor parent
                    // maximum bound applications.
                    this.setShowAll(true);
                    this.resetCanvas();
                    this.setShowAll();
                }
                else
                {
                    this.setShowAll();
                }
            }
            else if (scaleMode === Phaser.ScaleManager.NO_SCALE)
            {
                this.width = this.game.width;
                this.height = this.game.height;
            }
            else if (scaleMode === Phaser.ScaleManager.USER_SCALE)
            {
                this.width = (this.game.width * this._userScaleFactor.x) - this._userScaleTrim.x;
                this.height = (this.game.height * this._userScaleFactor.y) - this._userScaleTrim.y;
            }
        }

        if (!this.compatibility.canExpandParent &&
            (scaleMode === Phaser.ScaleManager.SHOW_ALL || scaleMode === Phaser.ScaleManager.USER_SCALE))
        {
            var bounds = this.getParentBounds(this._tempBounds);
            this.width = Math.min(this.width, bounds.width);
            this.height = Math.min(this.height, bounds.height);
        }

        // Always truncate / force to integer
        this.width = this.width | 0;
        this.height = this.height | 0;

        this.reflowCanvas();

    },

    /**
    * Returns the computed Parent size/bounds that the Display canvas is allowed/expected to fill.
    *
    * If in fullscreen mode or without parent (see {@link #parentIsWindow}),
    * this will be the bounds of the visual viewport itself.
    *
    * This function takes the {@link #windowConstraints} into consideration - if the parent is partially outside
    * the viewport then this function may return a smaller than expected size.
    *
    * Values are rounded to the nearest pixel.
    *
    * @method Phaser.ScaleManager#getParentBounds
    * @protected
    * @param {Phaser.Rectangle} [target=(new Rectangle)] - The rectangle to update; a new one is created as needed.
    * @return {Phaser.Rectangle} The established parent bounds.
    */
    getParentBounds: function (target) {

        var bounds = target || new Phaser.Rectangle();
        var parentNode = this.boundingParent;
        var visualBounds = this.dom.visualBounds;
        var layoutBounds = this.dom.layoutBounds;

        if (!parentNode)
        {
            bounds.setTo(0, 0, visualBounds.width, visualBounds.height);
        }
        else
        {
            // Ref. http://msdn.microsoft.com/en-us/library/hh781509(v=vs.85).aspx for getBoundingClientRect
            var clientRect = parentNode.getBoundingClientRect();

            bounds.setTo(clientRect.left, clientRect.top, clientRect.width, clientRect.height);

            var wc = this.windowConstraints;

            if (wc.right)
            {
                var windowBounds = wc.right === 'layout' ? layoutBounds : visualBounds;
                bounds.right = Math.min(bounds.right, windowBounds.width);
            }

            if (wc.bottom)
            {
                var windowBounds = wc.bottom === 'layout' ? layoutBounds : visualBounds;
                bounds.bottom = Math.min(bounds.bottom, windowBounds.height);
            }
        }

        bounds.setTo(
            Math.round(bounds.x), Math.round(bounds.y),
            Math.round(bounds.width), Math.round(bounds.height));

        return bounds;

    },

    /**
    * Update the canvas position/margins - for alignment within the parent container.
    *
    * The canvas margins _must_ be reset/cleared prior to invoking this.
    *
    * @method Phaser.ScaleManager#alignCanvas
    * @private
    * @param {boolean} horizontal - Align horizontally?
    * @param {boolean} vertical - Align vertically?
    */
    alignCanvas: function (horizontal, vertical) {

        var parentBounds = this.getParentBounds(this._tempBounds);
        var canvas = this.game.canvas;
        var margin = this.margin;

        if (horizontal)
        {
            margin.left = margin.right = 0;

            var canvasBounds = canvas.getBoundingClientRect();

            if (this.width < parentBounds.width && !this.incorrectOrientation)
            {
                var currentEdge = canvasBounds.left - parentBounds.x;
                var targetEdge = (parentBounds.width / 2) - (this.width / 2);

                targetEdge = Math.max(targetEdge, 0);

                var offset = targetEdge - currentEdge;

                margin.left = Math.round(offset);
            }

            canvas.style.marginLeft = margin.left + 'px';

            if (margin.left !== 0)
            {
                margin.right = -(parentBounds.width - canvasBounds.width - margin.left);
                canvas.style.marginRight = margin.right + 'px';
            }
        }

        if (vertical)
        {
            margin.top = margin.bottom = 0;

            var canvasBounds = canvas.getBoundingClientRect();
            
            if (this.height < parentBounds.height && !this.incorrectOrientation)
            {
                var currentEdge = canvasBounds.top - parentBounds.y;
                var targetEdge = (parentBounds.height / 2) - (this.height / 2);

                targetEdge = Math.max(targetEdge, 0);
                
                var offset = targetEdge - currentEdge;
                margin.top = Math.round(offset);
            }

            canvas.style.marginTop = margin.top + 'px';

            if (margin.top !== 0)
            {
                margin.bottom = -(parentBounds.height - canvasBounds.height - margin.top);
                canvas.style.marginBottom = margin.bottom + 'px';
            }
        }

        // Silly backwards compatibility..
        margin.x = margin.left;
        margin.y = margin.top;

    },

    /**
    * Updates the Game state / size.
    *
    * The canvas margins may always be adjusted, even if alignment is not in effect.
    * 
    * @method Phaser.ScaleManager#reflowGame
    * @private
    */
    reflowGame: function () {

        this.resetCanvas('', '');

        var bounds = this.getParentBounds(this._tempBounds);
        this.updateDimensions(bounds.width, bounds.height, true);

    },

    /**
    * Updates the Display canvas size.
    *
    * The canvas margins may always be adjusted, even alignment is not in effect.
    * 
    * @method Phaser.ScaleManager#reflowCanvas
    * @private
    */
    reflowCanvas: function () {

        if (!this.incorrectOrientation)
        {
            this.width = Phaser.Math.clamp(this.width, this.minWidth || 0, this.maxWidth || this.width);
            this.height = Phaser.Math.clamp(this.height, this.minHeight || 0, this.maxHeight || this.height);
        }

        this.resetCanvas();

        if (!this.compatibility.noMargins)
        {
            if (this.isFullScreen && this._createdFullScreenTarget)
            {
                this.alignCanvas(true, true);
            }
            else
            {
                this.alignCanvas(this.pageAlignHorizontally, this.pageAlignVertically);
            }
        }

        this.updateScalingAndBounds();

    },

    /**
    * "Reset" the Display canvas and set the specified width/height.
    *
    * @method Phaser.ScaleManager#resetCanvas
    * @private
    * @param {string} [cssWidth=(current width)] - The css width to set.
    * @param {string} [cssHeight=(current height)] - The css height to set.
    */
    resetCanvas: function (cssWidth, cssHeight) {

        if (cssWidth === undefined) { cssWidth = this.width + 'px'; }
        if (cssHeight === undefined) { cssHeight = this.height + 'px'; }

        var canvas = this.game.canvas;

        if (!this.compatibility.noMargins)
        {
            canvas.style.marginLeft = '';
            canvas.style.marginTop = '';
            canvas.style.marginRight = '';
            canvas.style.marginBottom = '';
        }

        canvas.style.width = cssWidth;
        canvas.style.height = cssHeight;

    },

    /**
    * Queues/marks a size/bounds check as needing to occur (from `preUpdate`).
    *
    * @method Phaser.ScaleManager#queueUpdate
    * @private
    * @param {boolean} force - If true resets the parent bounds to ensure the check is dirty.
    */
    queueUpdate: function (force) {

        if (force)
        {
            this._parentBounds.width = 0;
            this._parentBounds.height = 0;
        }

        this._updateThrottle = this._updateThrottleReset;

    },

    /**
    * Reset internal data/state.
    *
    * @method Phaser.ScaleManager#reset
    * @private
    */
    reset: function (clearWorld) {

        if (clearWorld)
        {
            this.grid.reset();
        }

    },

    /**
    * Updates the width/height to that of the window.
    * 
    * @method Phaser.ScaleManager#setMaximum
    * @private
    */
    setMaximum: function () {

        this.width = this.dom.visualBounds.width;
        this.height = this.dom.visualBounds.height;

    },

    /**
    * Updates the width/height such that the game is scaled proportionally.
    * 
    * @method Phaser.ScaleManager#setShowAll
    * @private
    * @param {boolean} expanding - If true then the maximizing dimension is chosen.
    */
    setShowAll: function (expanding) {

        var bounds = this.getParentBounds(this._tempBounds);
        var width = bounds.width;
        var height = bounds.height;

        var multiplier;

        if (expanding)
        {
            multiplier = Math.max((height / this.game.height), (width / this.game.width));
        }
        else
        {
            multiplier = Math.min((height / this.game.height), (width / this.game.width));
        }

        this.width = Math.round(this.game.width * multiplier);
        this.height = Math.round(this.game.height * multiplier);

    },

    /**
    * Updates the width/height such that the game is stretched to the available size.
    * Honors {@link #maxWidth} and {@link #maxHeight} when _not_ in fullscreen.
    *
    * @method Phaser.ScaleManager#setExactFit
    * @private
    */
    setExactFit: function () {

        var bounds = this.getParentBounds(this._tempBounds);

        this.width = bounds.width;
        this.height = bounds.height;

        if (this.isFullScreen)
        {
            // Max/min not honored fullscreen
            return;
        }

        if (this.maxWidth)
        {
            this.width = Math.min(this.width, this.maxWidth);
        }

        if (this.maxHeight)
        {
            this.height = Math.min(this.height, this.maxHeight);
        }

    },

    /**
    * Creates a fullscreen target. This is called automatically as as needed when entering
    * fullscreen mode and the resulting element is supplied to {@link #onFullScreenInit}.
    *
    * Use {@link #onFullScreenInit} to customize the created object.
    *
    * @method Phaser.ScaleManager#createFullScreenTarget
    * @protected
    */
    createFullScreenTarget: function () {

        var fsTarget = document.createElement('div');

        fsTarget.style.margin = '0';
        fsTarget.style.padding = '0';
        fsTarget.style.background = '#000';

        return fsTarget;

    },

    /**
    * Start the browsers fullscreen mode - this _must_ be called from a user input Pointer or Mouse event.
    *
    * The Fullscreen API must be supported by the browser for this to work - it is not the same as setting
    * the game size to fill the browser window. See {@link Phaser.ScaleManager#compatibility compatibility.supportsFullScreen} to check if the current
    * device is reported to support fullscreen mode.
    *
    * The {@link #fullScreenFailed} signal will be dispatched if the fullscreen change request failed or the game does not support the Fullscreen API.
    *
    * @method Phaser.ScaleManager#startFullScreen
    * @public
    * @param {boolean} [antialias] - Changes the anti-alias feature of the canvas before jumping in to fullscreen (false = retain pixel art, true = smooth art). If not specified then no change is made. Only works in CANVAS mode.
    * @param {boolean} [allowTrampoline=undefined] - Internal argument. If `false` click trampolining is suppressed.
    * @return {boolean} Returns true if the device supports fullscreen mode and fullscreen mode was attempted to be started. (It might not actually start, wait for the signals.)
    */
    startFullScreen: function (antialias, allowTrampoline) {

        if (this.isFullScreen)
        {
            return false;
        }

        if (!this.compatibility.supportsFullScreen)
        {
            // Error is called in timeout to emulate the real fullscreenerror event better
            var _this = this;
            setTimeout(function () {
                _this.fullScreenError();
            }, 10);
            return;
        }

        if (this.compatibility.clickTrampoline === 'when-not-mouse')
        {
            var input = this.game.input;

            if (input.activePointer &&
                input.activePointer !== input.mousePointer &&
                (allowTrampoline || allowTrampoline !== false))
            {
                input.activePointer.addClickTrampoline("startFullScreen", this.startFullScreen, this, [antialias, false]);
                return;
            }
        }

        if (typeof antialias !== 'undefined' && this.game.renderType === Phaser.CANVAS)
        {
            this.game.stage.smoothed = antialias;
        }

        var fsTarget = this.fullScreenTarget;
        
        if (!fsTarget)
        {
            this.cleanupCreatedTarget();

            this._createdFullScreenTarget = this.createFullScreenTarget();
            fsTarget = this._createdFullScreenTarget;
        }

        var initData = {
            targetElement: fsTarget
        };

        this.onFullScreenInit.dispatch(this, initData);

        if (this._createdFullScreenTarget)
        {
            // Move the Display canvas inside of the target and add the target to the DOM
            // (The target has to be added for the Fullscreen API to work.)
            var canvas = this.game.canvas;
            var parent = canvas.parentNode;
            parent.insertBefore(fsTarget, canvas);
            fsTarget.appendChild(canvas);
        }

        if (this.game.device.fullscreenKeyboard)
        {
            fsTarget[this.game.device.requestFullscreen](Element.ALLOW_KEYBOARD_INPUT);
        }
        else
        {
            fsTarget[this.game.device.requestFullscreen]();
        }

        return true;

    },

    /**
    * Stops / exits fullscreen mode, if active.
    *
    * @method Phaser.ScaleManager#stopFullScreen
    * @public
    * @return {boolean} Returns true if the browser supports fullscreen mode and fullscreen mode will be exited.
    */
    stopFullScreen: function () {

        if (!this.isFullScreen || !this.compatibility.supportsFullScreen)
        {
            return false;
        }

        document[this.game.device.cancelFullscreen]();

        return true;

    },

    /**
    * Cleans up the previous fullscreen target, if such was automatically created.
    * This ensures the canvas is restored to its former parent, assuming the target didn't move.
    *
    * @method Phaser.ScaleManager#cleanupCreatedTarget
    * @private
    */
    cleanupCreatedTarget: function () {

        var fsTarget = this._createdFullScreenTarget;

        if (fsTarget && fsTarget.parentNode)
        {
            // Make sure to cleanup synthetic target for sure;
            // swap the canvas back to the parent.
            var parent = fsTarget.parentNode;
            parent.insertBefore(this.game.canvas, fsTarget);
            parent.removeChild(fsTarget);
        }

        this._createdFullScreenTarget = null;

    },

    /**
    * Used to prepare/restore extra fullscreen mode settings.
    * (This does move any elements within the DOM tree.)
    *
    * @method Phaser.ScaleManager#prepScreenMode
    * @private
    * @param {boolean} enteringFullscreen - True if _entering_ fullscreen, false if _leaving_.
    */
    prepScreenMode: function (enteringFullscreen) {

        var createdTarget = !!this._createdFullScreenTarget;
        var fsTarget = this._createdFullScreenTarget || this.fullScreenTarget;

        if (enteringFullscreen)
        {
            if (createdTarget || this.fullScreenScaleMode === Phaser.ScaleManager.EXACT_FIT)
            {
                // Resize target, as long as it's not the canvas
                if (fsTarget !== this.game.canvas)
                {
                    this._fullScreenRestore = {
                        targetWidth: fsTarget.style.width,
                        targetHeight: fsTarget.style.height
                    };

                    fsTarget.style.width = '100%';
                    fsTarget.style.height = '100%';
                }
            }
        }
        else
        {
            // Have restore information
            if (this._fullScreenRestore)
            {
                fsTarget.style.width = this._fullScreenRestore.targetWidth;
                fsTarget.style.height = this._fullScreenRestore.targetHeight;

                this._fullScreenRestore = null;
            }

            // Always reset to game size
            this.updateDimensions(this._gameSize.width, this._gameSize.height, true);
            this.resetCanvas();
        }

    },

    /**
    * Called automatically when the browser enters of leaves fullscreen mode.
    *
    * @method Phaser.ScaleManager#fullScreenChange
    * @private
    * @param {Event} [event=undefined] - The fullscreenchange event
    */
    fullScreenChange: function (event) {

        this.event = event;

        if (this.isFullScreen)
        {
            this.prepScreenMode(true);

            this.updateLayout();
            this.queueUpdate(true);

            this.enterFullScreen.dispatch(this.width, this.height);
        }
        else
        {
            this.prepScreenMode(false);

            this.cleanupCreatedTarget();

            this.updateLayout();
            this.queueUpdate(true);

            this.leaveFullScreen.dispatch(this.width, this.height);
        }

        this.onFullScreenChange.dispatch(this);

    },

    /**
    * Called automatically when the browser fullscreen request fails;
    * or called when a fullscreen request is made on a device for which it is not supported.
    *
    * @method Phaser.ScaleManager#fullScreenError
    * @private
    * @param {Event} [event=undefined] - The fullscreenerror event; undefined if invoked on a device that does not support the Fullscreen API.
    */
    fullScreenError: function (event) {

        this.event = event;

        this.cleanupCreatedTarget();

        console.warn('Phaser.ScaleManager: requestFullscreen failed or device does not support the Fullscreen API');

        this.onFullScreenError.dispatch(this);

    },

    /**
    * Takes a Sprite or Image object and scales it to fit the given dimensions.
    * Scaling happens proportionally without distortion to the sprites texture.
    * The letterBox parameter controls if scaling will produce a letter-box effect or zoom the
    * sprite until it fills the given values. Note that with letterBox set to false the scaled sprite may spill out over either
    * the horizontal or vertical sides of the target dimensions. If you wish to stop this you can crop the Sprite.
    *
    * @method Phaser.ScaleManager#scaleSprite
    * @protected
    * @param {Phaser.Sprite|Phaser.Image} sprite - The sprite we want to scale.
    * @param {integer} [width] - The target width that we want to fit the sprite in to. If not given it defaults to ScaleManager.width.
    * @param {integer} [height] - The target height that we want to fit the sprite in to. If not given it defaults to ScaleManager.height.
    * @param {boolean} [letterBox=false] - True if we want the `fitted` mode. Otherwise, the function uses the `zoom` mode.
    * @return {Phaser.Sprite|Phaser.Image} The scaled sprite.
    */
    scaleSprite: function (sprite, width, height, letterBox) {

        if (width === undefined) { width = this.width; }
        if (height === undefined) { height = this.height; }
        if (letterBox === undefined) { letterBox = false; }

        if (!sprite || !sprite['scale'])
        {
            return sprite;
        }

        sprite.scale.x = 1;
        sprite.scale.y = 1;

        if ((sprite.width <= 0) || (sprite.height <= 0) || (width <= 0) || (height <= 0))
        {
            return sprite;
        }

        var scaleX1 = width;
        var scaleY1 = (sprite.height * width) / sprite.width;

        var scaleX2 = (sprite.width * height) / sprite.height;
        var scaleY2 = height;

        var scaleOnWidth = (scaleX2 > width);

        if (scaleOnWidth)
        {
            scaleOnWidth = letterBox;
        }
        else
        {
            scaleOnWidth = !letterBox;
        }

        if (scaleOnWidth)
        {
            sprite.width = Math.floor(scaleX1);
            sprite.height = Math.floor(scaleY1);
        }
        else
        {
            sprite.width = Math.floor(scaleX2);
            sprite.height = Math.floor(scaleY2);
        }

        //  Enable at some point?
        // sprite.x = Math.floor((width - sprite.width) / 2);
        // sprite.y = Math.floor((height - sprite.height) / 2);

        return sprite;

    },

    /**
    * Destroys the ScaleManager and removes any event listeners.
    * This should probably only be called when the game is destroyed.
    *
    * @method Phaser.ScaleManager#destroy
    * @protected
    */
    destroy: function () {

        this.game.onResume.remove(this._gameResumed, this);

        window.removeEventListener('orientationchange', this._orientationChange, false);
        window.removeEventListener('resize', this._windowResize, false);

        if (this.compatibility.supportsFullScreen)
        {
            document.removeEventListener('webkitfullscreenchange', this._fullScreenChange, false);
            document.removeEventListener('mozfullscreenchange', this._fullScreenChange, false);
            document.removeEventListener('MSFullscreenChange', this._fullScreenChange, false);
            document.removeEventListener('fullscreenchange', this._fullScreenChange, false);

            document.removeEventListener('webkitfullscreenerror', this._fullScreenError, false);
            document.removeEventListener('mozfullscreenerror', this._fullScreenError, false);
            document.removeEventListener('MSFullscreenError', this._fullScreenError, false);
            document.removeEventListener('fullscreenerror', this._fullScreenError, false);
        }

    }

};

Phaser.ScaleManager.prototype.constructor = Phaser.ScaleManager;

/**
* The DOM element that is considered the Parent bounding element, if any.
*
* This `null` if {@link #parentIsWindow} is true or if fullscreen mode is entered and {@link #fullScreenTarget} is specified.
* It will also be null if there is no game canvas or if the game canvas has no parent.
*
* @name Phaser.ScaleManager#boundingParent
* @property {?DOMElement} boundingParent
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "boundingParent", {

    get: function () {
        if (this.parentIsWindow ||
            (this.isFullScreen && !this._createdFullScreenTarget))
        {
            return null;
        }

        var parentNode = this.game.canvas && this.game.canvas.parentNode;
        return parentNode || null;
    }

});

/**
* The scaling method used by the ScaleManager when not in fullscreen.
* 
* <dl>
*   <dt>{@link Phaser.ScaleManager.NO_SCALE}</dt>
*   <dd>
*       The Game display area will not be scaled - even if it is too large for the canvas/screen.
*       This mode _ignores_ any applied scaling factor and displays the canvas at the Game size.
*   </dd>
*   <dt>{@link Phaser.ScaleManager.EXACT_FIT}</dt>
*   <dd>
*       The Game display area will be _stretched_ to fill the entire size of the canvas's parent element and/or screen.
*       Proportions are not mainted.
*   </dd>
*   <dt>{@link Phaser.ScaleManager.SHOW_ALL}</dt>
*   <dd>
*       Show the entire game display area while _maintaining_ the original aspect ratio.
*   </dd>
*   <dt>{@link Phaser.ScaleManager.RESIZE}</dt>
*   <dd>
*       The dimensions of the game display area are changed to match the size of the parent container.
*       That is, this mode _changes the Game size_ to match the display size.
*       <p>
*       Any manually set Game size (see {@link #setGameSize}) is ignored while in effect.
*   </dd>
*   <dt>{@link Phaser.ScaleManager.USER_SCALE}</dt>
*   <dd>
*       The game Display is scaled according to the user-specified scale set by {@link Phaser.ScaleManager#setUserScale setUserScale}.
*       <p>
*       This scale can be adjusted in the {@link Phaser.ScaleManager#setResizeCallback resize callback}
*       for flexible custom-sizing needs.
*   </dd>
* </dl>
*
* @name Phaser.ScaleManager#scaleMode
* @property {integer} scaleMode
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "scaleMode", {

    get: function () {

        return this._scaleMode;

    },

    set: function (value) {

        if (value !== this._scaleMode)
        {
            if (!this.isFullScreen)
            {
                this.updateDimensions(this._gameSize.width, this._gameSize.height, true);
                this.queueUpdate(true);
            }

            this._scaleMode = value;
        }

        return this._scaleMode;

    }

});

/**
* The scaling method used by the ScaleManager when in fullscreen.
*
* See {@link Phaser.ScaleManager#scaleMode scaleMode} for the different modes allowed.
*
* @name Phaser.ScaleManager#fullScreenScaleMode
* @property {integer} fullScreenScaleMode
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "fullScreenScaleMode", {

    get: function () {

        return this._fullScreenScaleMode;

    },

    set: function (value) {

        if (value !== this._fullScreenScaleMode)
        {
            // If in fullscreen then need a wee bit more work
            if (this.isFullScreen)
            {
                this.prepScreenMode(false);
                this._fullScreenScaleMode = value;
                this.prepScreenMode(true);

                this.queueUpdate(true);
            }
            else
            {
                this._fullScreenScaleMode = value;
            }
        }

        return this._fullScreenScaleMode;

    }

});

/**
* Returns the current scale mode - for normal or fullscreen operation.
*
* See {@link Phaser.ScaleManager#scaleMode scaleMode} for the different modes allowed.
*
* @name Phaser.ScaleManager#currentScaleMode
* @property {number} currentScaleMode
* @protected
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "currentScaleMode", {

    get: function () {

        return this.isFullScreen ? this._fullScreenScaleMode : this._scaleMode;

    }

});

/**
* When enabled the Display canvas will be horizontally-aligned _in the Parent container_ (or {@link Phaser.ScaleManager#parentIsWindow window}).
*
* To align horizontally across the page the Display canvas should be added directly to page;
* or the parent container should itself be horizontally aligned.
*
* Horizontal alignment is not applicable with the {@link .RESIZE} scaling mode.
*
* @name Phaser.ScaleManager#pageAlignHorizontally
* @property {boolean} pageAlignHorizontally
* @default false
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "pageAlignHorizontally", {

    get: function () {

        return this._pageAlignHorizontally;

    },

    set: function (value) {

        if (value !== this._pageAlignHorizontally)
        {
            this._pageAlignHorizontally = value;
            this.queueUpdate(true);
        }

    }

});

/**
* When enabled the Display canvas will be vertically-aligned _in the Parent container_ (or {@link Phaser.ScaleManager#parentIsWindow window}).
*
* To align vertically the Parent element should have a _non-collapsible_ height, such that it will maintain
* a height _larger_ than the height of the contained Game canvas - the game canvas will then be scaled vertically
* _within_ the remaining available height dictated by the Parent element.
*
* One way to prevent the parent from collapsing is to add an absolute "min-height" CSS property to the parent element.
* If specifying a relative "min-height/height" or adjusting margins, the Parent height must still be non-collapsible (see note).
*
* _Note_: In version 2.2 the minimum document height is _not_ automatically set to the viewport/window height.
* To automatically update the minimum document height set {@link Phaser.ScaleManager#compatibility compatibility.forceMinimumDocumentHeight} to true.
*
* Vertical alignment is not applicable with the {@link .RESIZE} scaling mode.
*
* @name Phaser.ScaleManager#pageAlignVertically
* @property {boolean} pageAlignVertically
* @default false
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "pageAlignVertically", {

    get: function () {

        return this._pageAlignVertically;

    },

    set: function (value) {

        if (value !== this._pageAlignVertically)
        {
            this._pageAlignVertically = value;
            this.queueUpdate(true);
        }

    }

});

/**
* Returns true if the browser is in fullscreen mode, otherwise false.
* @name Phaser.ScaleManager#isFullScreen
* @property {boolean} isFullScreen
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "isFullScreen", {

    get: function () {
        return !!(document['fullscreenElement'] ||
            document['webkitFullscreenElement'] ||
            document['mozFullScreenElement'] ||
            document['msFullscreenElement']);
    }

});

/**
* Returns true if the screen orientation is in portrait mode.
*
* @name Phaser.ScaleManager#isPortrait
* @property {boolean} isPortrait
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "isPortrait", {

    get: function () {
        return this.classifyOrientation(this.screenOrientation) === 'portrait';
    }

});

/**
* Returns true if the screen orientation is in landscape mode.
*
* @name Phaser.ScaleManager#isLandscape
* @property {boolean} isLandscape
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "isLandscape", {

    get: function () {
        return this.classifyOrientation(this.screenOrientation) === 'landscape';
    }

});

/**
* Returns true if the game dimensions are portrait (height > width).
* This is especially useful to check when using the RESIZE scale mode 
* but wanting to maintain game orientation on desktop browsers, 
* where typically the screen orientation will always be landscape regardless of the browser viewport.
*
* @name Phaser.ScaleManager#isGamePortrait
* @property {boolean} isGamePortrait
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "isGamePortrait", {

    get: function () {
        return (this.height > this.width);
    }

});

/**
* Returns true if the game dimensions are landscape (width > height).
* This is especially useful to check when using the RESIZE scale mode 
* but wanting to maintain game orientation on desktop browsers, 
* where typically the screen orientation will always be landscape regardless of the browser viewport.
*
* @name Phaser.ScaleManager#isGameLandscape
* @property {boolean} isGameLandscape
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "isGameLandscape", {

    get: function () {
        return (this.width > this.height);
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* This is where the magic happens. The Game object is the heart of your game,
* providing quick access to common functions and handling the boot process.
* 
* "Hell, there are no rules here - we're trying to accomplish something."
*                                                       Thomas A. Edison
*
* @class Phaser.Game
* @constructor
* @param {number|string} [width=800] - The width of your game in game pixels. If given as a string the value must be between 0 and 100 and will be used as the percentage width of the parent container, or the browser window if no parent is given.
* @param {number|string} [height=600] - The height of your game in game pixels. If given as a string the value must be between 0 and 100 and will be used as the percentage height of the parent container, or the browser window if no parent is given.
* @param {number} [renderer=Phaser.AUTO] - Which renderer to use: Phaser.AUTO will auto-detect, Phaser.WEBGL, Phaser.CANVAS or Phaser.HEADLESS (no rendering at all).
* @param {string|HTMLElement} [parent=''] - The DOM element into which this games canvas will be injected. Either a DOM ID (string) or the element itself.
* @param {object} [state=null] - The default state object. A object consisting of Phaser.State functions (preload, create, update, render) or null.
* @param {boolean} [transparent=false] - Use a transparent canvas background or not.
* @param {boolean} [antialias=true] - Draw all image textures anti-aliased or not. The default is for smooth textures, but disable if your game features pixel art.
* @param {object} [physicsConfig=null] - A physics configuration object to pass to the Physics world on creation.
*/
Phaser.Game = function (width, height, renderer, parent, state, transparent, antialias, physicsConfig) {

    /**
    * @property {number} id - Phaser Game ID (for when Pixi supports multiple instances).
    * @readonly
    */
    this.id = Phaser.GAMES.push(this) - 1;

    /**
    * @property {object} config - The Phaser.Game configuration object.
    */
    this.config = null;

    /**
    * @property {object} physicsConfig - The Phaser.Physics.World configuration object.
    */
    this.physicsConfig = physicsConfig;

    /**
    * @property {string|HTMLElement} parent - The Games DOM parent.
    * @default
    */
    this.parent = '';

    /**
    * The current Game Width in pixels.
    *
    * _Do not modify this property directly:_ use {@link Phaser.ScaleManager#setGameSize} - eg. `game.scale.setGameSize(width, height)` - instead.
    *
    * @property {integer} width
    * @readonly
    * @default
    */
    this.width = 800;

    /**
    * The current Game Height in pixels.
    *
    * _Do not modify this property directly:_ use {@link Phaser.ScaleManager#setGameSize} - eg. `game.scale.setGameSize(width, height)` - instead.
    *
    * @property {integer} height
    * @readonly
    * @default
    */
    this.height = 600;

    /**
    * The resolution of your game. This value is read only, but can be changed at start time it via a game configuration object.
    *
    * @property {integer} resolution
    * @readonly
    * @default
    */
    this.resolution = 1;

    /**
    * @property {integer} _width - Private internal var.
    * @private
    */
    this._width = 800;

    /**
    * @property {integer} _height - Private internal var.
    * @private
    */
    this._height = 600;

    /**
    * @property {boolean} transparent - Use a transparent canvas background or not.
    * @default
    */
    this.transparent = false;

    /**
    * @property {boolean} antialias - Anti-alias graphics. By default scaled images are smoothed in Canvas and WebGL, set anti-alias to false to disable this globally.
    * @default
    */
    this.antialias = true;

    /**
    * @property {boolean} preserveDrawingBuffer - The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
    * @default
    */
    this.preserveDrawingBuffer = false;

    /**
    * @property {PIXI.CanvasRenderer|PIXI.WebGLRenderer} renderer - The Pixi Renderer.
    * @protected
    */
    this.renderer = null;

    /**
    * @property {number} renderType - The Renderer this game will use. Either Phaser.AUTO, Phaser.CANVAS or Phaser.WEBGL.
    * @readonly
    */
    this.renderType = Phaser.AUTO;

    /**
    * @property {Phaser.StateManager} state - The StateManager.
    */
    this.state = null;

    /**
    * @property {boolean} isBooted - Whether the game engine is booted, aka available.
    * @readonly
    */
    this.isBooted = false;

    /**
    * @property {boolean} isRunning - Is game running or paused?
    * @readonly
    */
    this.isRunning = false;

    /**
    * @property {Phaser.RequestAnimationFrame} raf - Automatically handles the core game loop via requestAnimationFrame or setTimeout
    * @protected
    */
    this.raf = null;

    /**
    * @property {Phaser.GameObjectFactory} add - Reference to the Phaser.GameObjectFactory.
    */
    this.add = null;

    /**
    * @property {Phaser.GameObjectCreator} make - Reference to the GameObject Creator.
    */
    this.make = null;

    /**
    * @property {Phaser.Cache} cache - Reference to the assets cache.
    */
    this.cache = null;

    /**
    * @property {Phaser.Input} input - Reference to the input manager
    */
    this.input = null;

    /**
    * @property {Phaser.Loader} load - Reference to the assets loader.
    */
    this.load = null;

    /**
    * @property {Phaser.Math} math - Reference to the math helper.
    */
    this.math = null;

    /**
    * @property {Phaser.Net} net - Reference to the network class.
    */
    this.net = null;

    /**
    * @property {Phaser.ScaleManager} scale - The game scale manager.
    */
    this.scale = null;

    /**
    * @property {Phaser.SoundManager} sound - Reference to the sound manager.
    */
    this.sound = null;

    /**
    * @property {Phaser.Stage} stage - Reference to the stage.
    */
    this.stage = null;

    /**
    * @property {Phaser.Time} time - Reference to the core game clock.
    */
    this.time = null;

    /**
    * @property {Phaser.TweenManager} tweens - Reference to the tween manager.
    */
    this.tweens = null;

    /**
    * @property {Phaser.World} world - Reference to the world.
    */
    this.world = null;

    /**
    * @property {Phaser.Physics} physics - Reference to the physics manager.
    */
    this.physics = null;
    
    /**
    * @property {Phaser.PluginManager} plugins - Reference to the plugin manager.
    */
    this.plugins = null;

    /**
    * @property {Phaser.RandomDataGenerator} rnd - Instance of repeatable random data generator helper.
    */
    this.rnd = null;

    /**
    * @property {Phaser.Device} device - Contains device information and capabilities.
    */
    this.device = Phaser.Device;

    /**
    * @property {Phaser.Camera} camera - A handy reference to world.camera.
    */
    this.camera = null;

    /**
    * @property {HTMLCanvasElement} canvas - A handy reference to renderer.view, the canvas that the game is being rendered in to.
    */
    this.canvas = null;

    /**
    * @property {CanvasRenderingContext2D} context - A handy reference to renderer.context (only set for CANVAS games, not WebGL)
    */
    this.context = null;

    /**
    * @property {Phaser.Utils.Debug} debug - A set of useful debug utilities.
    */
    this.debug = null;

    /**
    * @property {Phaser.Particles} particles - The Particle Manager.
    */
    this.particles = null;

    /**
    * @property {Phaser.Create} create - The Asset Generator.
    */
    this.create = null;

    /**
    * If `false` Phaser will automatically render the display list every update. If `true` the render loop will be skipped.
    * You can toggle this value at run-time to gain exact control over when Phaser renders. This can be useful in certain types of game or application.
    * Please note that if you don't render the display list then none of the game object transforms will be updated, so use this value carefully.
    * @property {boolean} lockRender
    * @default
    */
    this.lockRender = false;

    /**
    * @property {boolean} stepping - Enable core loop stepping with Game.enableStep().
    * @default
    * @readonly
    */
    this.stepping = false;

    /**
    * @property {boolean} pendingStep - An internal property used by enableStep, but also useful to query from your own game objects.
    * @default
    * @readonly
    */
    this.pendingStep = false;

    /**
    * @property {number} stepCount - When stepping is enabled this contains the current step cycle.
    * @default
    * @readonly
    */
    this.stepCount = 0;

    /**
    * @property {Phaser.Signal} onPause - This event is fired when the game pauses.
    */
    this.onPause = null;

    /**
    * @property {Phaser.Signal} onResume - This event is fired when the game resumes from a paused state.
    */
    this.onResume = null;

    /**
    * @property {Phaser.Signal} onBlur - This event is fired when the game no longer has focus (typically on page hide).
    */
    this.onBlur = null;

    /**
    * @property {Phaser.Signal} onFocus - This event is fired when the game has focus (typically on page show).
    */
    this.onFocus = null;

    /**
    * @property {boolean} _paused - Is game paused?
    * @private
    */
    this._paused = false;

    /**
    * @property {boolean} _codePaused - Was the game paused via code or a visibility change?
    * @private
    */
    this._codePaused = false;

    /**
    * The ID of the current/last logic update applied this render frame, starting from 0.
    * The first update is `currentUpdateID === 0` and the last update is `currentUpdateID === updatesThisFrame.`
    * @property {integer} currentUpdateID
    * @protected
    */
    this.currentUpdateID = 0;

    /**
    * Number of logic updates expected to occur this render frame; will be 1 unless there are catch-ups required (and allowed).
    * @property {integer} updatesThisFrame
    * @protected
    */
    this.updatesThisFrame = 1;

    /**
    * @property {number} _deltaTime - Accumulate elapsed time until a logic update is due.
    * @private
    */
    this._deltaTime = 0;

    /**
    * @property {number} _lastCount - Remember how many 'catch-up' iterations were used on the logicUpdate last frame.
    * @private
    */
    this._lastCount = 0;

    /**
    * @property {number} _spiraling - If the 'catch-up' iterations are spiraling out of control, this counter is incremented.
    * @private
    */
    this._spiraling = 0;

    /**
    * @property {boolean} _kickstart - Force a logic update + render by default (always set on Boot and State swap)
    * @private
    */
    this._kickstart = true;

    /**
    * If the game is struggling to maintain the desired FPS, this signal will be dispatched.
    * The desired/chosen FPS should probably be closer to the {@link Phaser.Time#suggestedFps} value.
    * @property {Phaser.Signal} fpsProblemNotifier
    * @public
    */
    this.fpsProblemNotifier = new Phaser.Signal();

    /**
    * @property {boolean} forceSingleUpdate - Should the game loop force a logic update, regardless of the delta timer? Set to true if you know you need this. You can toggle it on the fly.
    */
    this.forceSingleUpdate = false;

    /**
    * @property {number} _nextNotification - The soonest game.time.time value that the next fpsProblemNotifier can be dispatched.
    * @private
    */
    this._nextFpsNotification = 0;

    //  Parse the configuration object (if any)
    if (arguments.length === 1 && typeof arguments[0] === 'object')
    {
        this.parseConfig(arguments[0]);
    }
    else
    {
        this.config = { enableDebug: true };

        if (typeof width !== 'undefined')
        {
            this._width = width;
        }

        if (typeof height !== 'undefined')
        {
            this._height = height;
        }

        if (typeof renderer !== 'undefined')
        {
            this.renderType = renderer;
        }

        if (typeof parent !== 'undefined')
        {
            this.parent = parent;
        }

        if (typeof transparent !== 'undefined')
        {
            this.transparent = transparent;
        }

        if (typeof antialias !== 'undefined')
        {
            this.antialias = antialias;
        }

        this.rnd = new Phaser.RandomDataGenerator([(Date.now() * Math.random()).toString()]);

        this.state = new Phaser.StateManager(this, state);
    }

    this.device.whenReady(this.boot, this);

    return this;

};

Phaser.Game.prototype = {

    /**
    * Parses a Game configuration object.
    *
    * @method Phaser.Game#parseConfig
    * @protected
    */
    parseConfig: function (config) {

        this.config = config;

        if (config['enableDebug'] === undefined)
        {
            this.config.enableDebug = true;
        }

        if (config['width'])
        {
            this._width = config['width'];
        }

        if (config['height'])
        {
            this._height = config['height'];
        }

        if (config['renderer'])
        {
            this.renderType = config['renderer'];
        }

        if (config['parent'])
        {
            this.parent = config['parent'];
        }

        if (config['transparent'])
        {
            this.transparent = config['transparent'];
        }

        if (config['antialias'])
        {
            this.antialias = config['antialias'];
        }

        if (config['resolution'])
        {
            this.resolution = config['resolution'];
        }

        if (config['preserveDrawingBuffer'])
        {
            this.preserveDrawingBuffer = config['preserveDrawingBuffer'];
        }

        if (config['physicsConfig'])
        {
            this.physicsConfig = config['physicsConfig'];
        }

        var seed = [(Date.now() * Math.random()).toString()];

        if (config['seed'])
        {
            seed = config['seed'];
        }

        this.rnd = new Phaser.RandomDataGenerator(seed);

        var state = null;

        if (config['state'])
        {
            state = config['state'];
        }

        this.state = new Phaser.StateManager(this, state);

    },

    /**
    * Initialize engine sub modules and start the game.
    *
    * @method Phaser.Game#boot
    * @protected
    */
    boot: function () {

        if (this.isBooted)
        {
            return;
        }

        this.onPause = new Phaser.Signal();
        this.onResume = new Phaser.Signal();
        this.onBlur = new Phaser.Signal();
        this.onFocus = new Phaser.Signal();

        this.isBooted = true;

        this.math = Phaser.Math;

        this.scale = new Phaser.ScaleManager(this, this._width, this._height);
        this.stage = new Phaser.Stage(this);

        this.setUpRenderer();

        this.world = new Phaser.World(this);
        this.add = new Phaser.GameObjectFactory(this);
        this.make = new Phaser.GameObjectCreator(this);
        this.cache = new Phaser.Cache(this);
        this.load = new Phaser.Loader(this);
        this.time = new Phaser.Time(this);
        this.tweens = new Phaser.TweenManager(this);
        this.input = new Phaser.Input(this);
        this.sound = new Phaser.SoundManager(this);
        this.physics = new Phaser.Physics(this, this.physicsConfig);
        this.particles = new Phaser.Particles(this);
        this.create = new Phaser.Create(this);
        this.plugins = new Phaser.PluginManager(this);
        this.net = new Phaser.Net(this);

        this.time.boot();
        this.stage.boot();
        this.world.boot();
        this.scale.boot();
        this.input.boot();
        this.sound.boot();
        this.state.boot();

        if (this.config['enableDebug'])
        {
            this.debug = new Phaser.Utils.Debug(this);
            this.debug.boot();
        }
        else
        {
            this.debug = { preUpdate: function () {}, update: function () {}, reset: function () {} };
        }

        this.showDebugHeader();

        this.isRunning = true;

        if (this.config && this.config['forceSetTimeOut'])
        {
            this.raf = new Phaser.RequestAnimationFrame(this, this.config['forceSetTimeOut']);
        }
        else
        {
            this.raf = new Phaser.RequestAnimationFrame(this, false);
        }

        this._kickstart = true;

        if (window['focus'])
        {
            if (!window['PhaserGlobal'] || (window['PhaserGlobal'] && !window['PhaserGlobal'].stopFocus))
            {
                window.focus();
            }
        }

        this.raf.start();

    },

    /**
    * Displays a Phaser version debug header in the console.
    *
    * @method Phaser.Game#showDebugHeader
    * @protected
    */
    showDebugHeader: function () {

        if (window['PhaserGlobal'] && window['PhaserGlobal'].hideBanner)
        {
            return;
        }

        var v = Phaser.VERSION;
        var r = 'Canvas';
        var a = 'HTML Audio';
        var c = 1;

        if (this.renderType === Phaser.WEBGL)
        {
            r = 'WebGL';
            c++;
        }
        else if (this.renderType == Phaser.HEADLESS)
        {
            r = 'Headless';
        }

        if (this.device.webAudio)
        {
            a = 'WebAudio';
            c++;
        }

        if (this.device.chrome)
        {
            var args = [
                '%c %c %c Phaser v' + v + ' | Pixi.js ' + PIXI.VERSION + ' | ' + r + ' | ' + a + '  %c %c ' + '%c http://phaser.io %c\u2665%c\u2665%c\u2665',
                'background: #9854d8',
                'background: #6c2ca7',
                'color: #ffffff; background: #450f78;',
                'background: #6c2ca7',
                'background: #9854d8',
                'background: #ffffff'
            ];

            for (var i = 0; i < 3; i++)
            {
                if (i < c)
                {
                    args.push('color: #ff2424; background: #fff');
                }
                else
                {
                    args.push('color: #959595; background: #fff');
                }
            }

            console.log.apply(console, args);
        }
        else if (window['console'])
        {
            console.log('Phaser v' + v + ' | Pixi.js ' + PIXI.VERSION + ' | ' + r + ' | ' + a + ' | http://phaser.io');
        }

    },

    /**
    * Checks if the device is capable of using the requested renderer and sets it up or an alternative if not.
    *
    * @method Phaser.Game#setUpRenderer
    * @protected
    */
    setUpRenderer: function () {

        if (this.config['canvasID'])
        {
            this.canvas = Phaser.Canvas.create(this.width, this.height, this.config['canvasID']);
        }
        else
        {
            this.canvas = Phaser.Canvas.create(this.width, this.height);
        }

        if (this.config['canvasStyle'])
        {
            this.canvas.style = this.config['canvasStyle'];
        }
        else
        {
            this.canvas.style['-webkit-full-screen'] = 'width: 100%; height: 100%';
        }

        if (this.device.cocoonJS)
        {
            if (this.renderType === Phaser.CANVAS)
            {
                this.canvas.screencanvas = true;
            }
            else
            {
                // Some issue related to scaling arise with Cocoon using screencanvas and webgl renderer.
                this.canvas.screencanvas = false;
            }
        }

        if (this.renderType === Phaser.HEADLESS || this.renderType === Phaser.CANVAS || (this.renderType === Phaser.AUTO && this.device.webGL === false))
        {
            if (this.device.canvas)
            {
                if (this.renderType === Phaser.AUTO)
                {
                    this.renderType = Phaser.CANVAS;
                }

                this.renderer = new PIXI.CanvasRenderer(this.width, this.height, { "view": this.canvas,
                                                                                    "transparent": this.transparent,
                                                                                    "resolution": this.resolution,
                                                                                    "clearBeforeRender": true });
                this.context = this.renderer.context;
            }
            else
            {
                throw new Error('Phaser.Game - cannot create Canvas or WebGL context, aborting.');
            }
        }
        else
        {
            //  They requested WebGL and their browser supports it
            this.renderType = Phaser.WEBGL;

            this.renderer = new PIXI.WebGLRenderer(this.width, this.height, { "view": this.canvas,
                                                                                "transparent": this.transparent,
                                                                                "resolution": this.resolution,
                                                                                "antialias": this.antialias,
                                                                                "preserveDrawingBuffer": this.preserveDrawingBuffer });
            this.context = null;

            this.canvas.addEventListener('webglcontextlost', this.contextLost.bind(this), false);
            this.canvas.addEventListener('webglcontextrestored', this.contextRestored.bind(this), false);
        }

        if (this.renderType !== Phaser.HEADLESS)
        {
            this.stage.smoothed = this.antialias;
            
            Phaser.Canvas.addToDOM(this.canvas, this.parent, false);
            Phaser.Canvas.setTouchAction(this.canvas);
        }

    },

    /**
    * Handles WebGL context loss.
    *
    * @method Phaser.Game#contextLost
    * @private
    * @param {Event} event - The webglcontextlost event.
    */
    contextLost: function (event) {

        event.preventDefault();

        this.renderer.contextLost = true;

    },

    /**
    * Handles WebGL context restoration.
    *
    * @method Phaser.Game#contextRestored
    * @private
    */
    contextRestored: function () {

        this.renderer.initContext();

        this.cache.clearGLTextures();

        this.renderer.contextLost = false;

    },

    /**
    * The core game loop.
    *
    * @method Phaser.Game#update
    * @protected
    * @param {number} time - The current time as provided by RequestAnimationFrame.
    */
    update: function (time) {

        this.time.update(time);

        if (this._kickstart)
        {
            this.updateLogic(1.0 / this.time.desiredFps);

            //  Sync the scene graph after _every_ logic update to account for moved game objects                
            this.stage.updateTransform();

            // call the game render update exactly once every frame
            this.updateRender(this.time.slowMotion * this.time.desiredFps);

            this._kickstart = false;

            return;
        }

        // if the logic time is spiraling upwards, skip a frame entirely
        if (this._spiraling > 1 && !this.forceSingleUpdate)
        {
            // cause an event to warn the program that this CPU can't keep up with the current desiredFps rate
            if (this.time.time > this._nextFpsNotification)
            {
                // only permit one fps notification per 10 seconds
                this._nextFpsNotification = this.time.time + 1000 * 10;

                // dispatch the notification signal
                this.fpsProblemNotifier.dispatch();
            }

            // reset the _deltaTime accumulator which will cause all pending dropped frames to be permanently skipped
            this._deltaTime = 0;
            this._spiraling = 0;

            // call the game render update exactly once every frame
            this.updateRender(this.time.slowMotion * this.time.desiredFps);
        }
        else
        {
            // step size taking into account the slow motion speed
            var slowStep = this.time.slowMotion * 1000.0 / this.time.desiredFps;

            // accumulate time until the slowStep threshold is met or exceeded... up to a limit of 3 catch-up frames at slowStep intervals
            this._deltaTime += Math.max(Math.min(slowStep * 3, this.time.elapsed), 0);

            // call the game update logic multiple times if necessary to "catch up" with dropped frames
            // unless forceSingleUpdate is true
            var count = 0;

            this.updatesThisFrame = Math.floor(this._deltaTime / slowStep);

            if (this.forceSingleUpdate)
            {
                this.updatesThisFrame = Math.min(1, this.updatesThisFrame);
            }

            while (this._deltaTime >= slowStep)
            {
                this._deltaTime -= slowStep;
                this.currentUpdateID = count;

                this.updateLogic(1.0 / this.time.desiredFps);

                //  Sync the scene graph after _every_ logic update to account for moved game objects
                this.stage.updateTransform();

                count++;

                if (this.forceSingleUpdate && count === 1)
                {
                    break;
                }
            }

            // detect spiraling (if the catch-up loop isn't fast enough, the number of iterations will increase constantly)
            if (count > this._lastCount)
            {
                this._spiraling++;
            }
            else if (count < this._lastCount)
            {
                // looks like it caught up successfully, reset the spiral alert counter
                this._spiraling = 0;
            }

            this._lastCount = count;

            // call the game render update exactly once every frame unless we're playing catch-up from a spiral condition
            this.updateRender(this._deltaTime / slowStep);
        }

    },

    /**
    * Updates all logic subsystems in Phaser. Called automatically by Game.update.
    *
    * @method Phaser.Game#updateLogic
    * @protected
    * @param {number} timeStep - The current timeStep value as determined by Game.update.
    */
    updateLogic: function (timeStep) {

        if (!this._paused && !this.pendingStep)
        {
            if (this.stepping)
            {
                this.pendingStep = true;
            }

            this.scale.preUpdate();
            this.debug.preUpdate();
            this.world.camera.preUpdate();
            this.physics.preUpdate();
            this.state.preUpdate(timeStep);
            this.plugins.preUpdate(timeStep);
            this.stage.preUpdate();

            this.state.update();
            this.stage.update();
            this.tweens.update(timeStep);
            this.sound.update();
            this.input.update();
            this.physics.update();
            this.particles.update();
            this.plugins.update();

            this.stage.postUpdate();
            this.plugins.postUpdate();
        }
        else
        {
            // Scaling and device orientation changes are still reflected when paused.
            this.scale.pauseUpdate();
            this.state.pauseUpdate();
            this.debug.preUpdate();
        }

    },

    /**
    * Runs the Render cycle.
    * It starts by calling State.preRender. In here you can do any last minute adjustments of display objects as required.
    * It then calls the renderer, which renders the entire display list, starting from the Stage object and working down.
    * It then calls plugin.render on any loaded plugins, in the order in which they were enabled.
    * After this State.render is called. Any rendering that happens here will take place on-top of the display list.
    * Finally plugin.postRender is called on any loaded plugins, in the order in which they were enabled.
    * This method is called automatically by Game.update, you don't need to call it directly.
    * Should you wish to have fine-grained control over when Phaser renders then use the `Game.lockRender` boolean.
    * Phaser will only render when this boolean is `false`.
    *
    * @method Phaser.Game#updateRender
    * @protected
    * @param {number} elapsedTime - The time elapsed since the last update.
    */
    updateRender: function (elapsedTime) {

        if (this.lockRender)
        {
            return;
        }

        this.state.preRender(elapsedTime);
        this.renderer.render(this.stage);

        this.plugins.render(elapsedTime);
        this.state.render(elapsedTime);
        this.plugins.postRender(elapsedTime);

    },

    /**
    * Enable core game loop stepping. When enabled you must call game.step() directly (perhaps via a DOM button?)
    * Calling step will advance the game loop by one frame. This is extremely useful for hard to track down errors!
    *
    * @method Phaser.Game#enableStep
    */
    enableStep: function () {

        this.stepping = true;
        this.pendingStep = false;
        this.stepCount = 0;

    },

    /**
    * Disables core game loop stepping.
    *
    * @method Phaser.Game#disableStep
    */
    disableStep: function () {

        this.stepping = false;
        this.pendingStep = false;

    },

    /**
    * When stepping is enabled you must call this function directly (perhaps via a DOM button?) to advance the game loop by one frame.
    * This is extremely useful to hard to track down errors! Use the internal stepCount property to monitor progress.
    *
    * @method Phaser.Game#step
    */
    step: function () {

        this.pendingStep = false;
        this.stepCount++;

    },

    /**
    * Nukes the entire game from orbit.
    *
    * @method Phaser.Game#destroy
    */
    destroy: function () {

        this.raf.stop();

        this.state.destroy();
        this.sound.destroy();

        this.scale.destroy();
        this.stage.destroy();
        this.input.destroy();
        this.physics.destroy();

        this.state = null;
        this.cache = null;
        this.input = null;
        this.load = null;
        this.sound = null;
        this.stage = null;
        this.time = null;
        this.world = null;
        this.isBooted = false;

        this.renderer.destroy(false);
        Phaser.Canvas.removeFromDOM(this.canvas);

        Phaser.GAMES[this.id] = null;

    },

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#gamePaused
    * @param {object} event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    gamePaused: function (event) {

        //   If the game is already paused it was done via game code, so don't re-pause it
        if (!this._paused)
        {
            this._paused = true;
            this.time.gamePaused();
            this.sound.setMute();
            this.onPause.dispatch(event);

            //  Avoids Cordova iOS crash event: https://github.com/photonstorm/phaser/issues/1800
            if (this.device.cordova && this.device.iOS)
            {
                this.lockRender = true;
            }
        }

    },

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#gameResumed
    * @param {object} event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    gameResumed: function (event) {

        //  Game is paused, but wasn't paused via code, so resume it
        if (this._paused && !this._codePaused)
        {
            this._paused = false;
            this.time.gameResumed();
            this.input.reset();
            this.sound.unsetMute();
            this.onResume.dispatch(event);

            //  Avoids Cordova iOS crash event: https://github.com/photonstorm/phaser/issues/1800
            if (this.device.cordova && this.device.iOS)
            {
                this.lockRender = false;
            }
        }

    },

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#focusLoss
    * @param {object} event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    focusLoss: function (event) {

        this.onBlur.dispatch(event);

        if (!this.stage.disableVisibilityChange)
        {
            this.gamePaused(event);
        }

    },

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#focusGain
    * @param {object} event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    focusGain: function (event) {

        this.onFocus.dispatch(event);

        if (!this.stage.disableVisibilityChange)
        {
            this.gameResumed(event);
        }

    }

};

Phaser.Game.prototype.constructor = Phaser.Game;

/**
* The paused state of the Game. A paused game doesn't update any of its subsystems.
* When a game is paused the onPause event is dispatched. When it is resumed the onResume event is dispatched.
* @name Phaser.Game#paused
* @property {boolean} paused - Gets and sets the paused state of the Game.
*/
Object.defineProperty(Phaser.Game.prototype, "paused", {

    get: function () {
        return this._paused;
    },

    set: function (value) {

        if (value === true)
        {
            if (this._paused === false)
            {
                this._paused = true;
                this.sound.setMute();
                this.time.gamePaused();
                this.onPause.dispatch(this);
            }
            this._codePaused = true;
        }
        else
        {
            if (this._paused)
            {
                this._paused = false;
                this.input.reset();
                this.sound.unsetMute();
                this.time.gameResumed();
                this.onResume.dispatch(this);
            }
            this._codePaused = false;
        }

    }

});

/**
 * 
 * "Deleted code is debugged code." - Jeff Sickel
 *
 * ヽ(〃＾▽＾〃)ﾉ
 * 
*/
