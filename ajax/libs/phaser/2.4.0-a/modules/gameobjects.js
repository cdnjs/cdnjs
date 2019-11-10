/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The GameObjectFactory is a quick way to create many common game objects
* using {@linkcode Phaser.Game#add `game.add`}.
*
* Created objects are _automatically added_ to the appropriate Manager, World, or manually specified parent Group.
*
* @class Phaser.GameObjectFactory
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
*/
Phaser.GameObjectFactory = function (game) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    * @protected
    */
    this.game = game;

    /**
    * @property {Phaser.World} world - A reference to the game world.
    * @protected
    */
    this.world = this.game.world;

};

Phaser.GameObjectFactory.prototype = {

    /**
    * Adds an existing display object to the game world.
    * 
    * @method Phaser.GameObjectFactory#existing
    * @param {any} object - An instance of Phaser.Sprite, Phaser.Button or any other display object.
    * @return {any} The child that was added to the World.
    */
    existing: function (object) {

        return this.world.add(object);

    },

    /**
    * Create a new `Image` object.
    * 
    * An Image is a light-weight object you can use to display anything that doesn't need physics or animation.
    * 
    * It can still rotate, scale, crop and receive input events. 
    * This makes it perfect for logos, backgrounds, simple buttons and other non-Sprite graphics.
    *
    * @method Phaser.GameObjectFactory#image
    * @param {number} [x=0] - The x coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
    * @param {number} [y=0] - The y coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
    * @param {string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture} [key] - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param {string|number} [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
    * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @returns {Phaser.Image} The newly created Image object.
    */
    image: function (x, y, key, frame, group) {

        if (group === undefined) { group = this.world; }

        return group.add(new Phaser.Image(this.game, x, y, key, frame));

    },

    /**
    * Create a new Sprite with specific position and sprite sheet key.
    *
    * At its most basic a Sprite consists of a set of coordinates and a texture that is used when rendered.
    * They also contain additional properties allowing for physics motion (via Sprite.body), input handling (via Sprite.input),
    * events (via Sprite.events), animation (via Sprite.animations), camera culling and more. Please see the Examples for use cases.
    *
    * @method Phaser.GameObjectFactory#sprite
    * @param {number} [x=0] - The x coordinate of the sprite. The coordinate is relative to any parent container this sprite may be in.
    * @param {number} [y=0] - The y coordinate of the sprite. The coordinate is relative to any parent container this sprite may be in.
    * @param {string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture} [key] - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param {string|number} [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
    * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @returns {Phaser.Sprite} The newly created Sprite object.
    */
    sprite: function (x, y, key, frame, group) {

        if (group === undefined) { group = this.world; }

        return group.create(x, y, key, frame);

    },

    /**
    * Create a tween on a specific object.
    * 
    * The object can be any JavaScript object or Phaser object such as Sprite.
    *
    * @method Phaser.GameObjectFactory#tween
    * @param {object} object - Object the tween will be run on.
    * @return {Phaser.Tween} The newly created Phaser.Tween object.
    */
    tween: function (object) {

        return this.game.tweens.create(object);

    },

    /**
    * A Group is a container for display objects that allows for fast pooling, recycling and collision checks.
    *
    * @method Phaser.GameObjectFactory#group
    * @param {any} [parent] - The parent Group or DisplayObjectContainer that will hold this group, if any. If set to null the Group won't be added to the display list. If undefined it will be added to World by default.
    * @param {string} [name='group'] - A name for this Group. Not used internally but useful for debugging.
    * @param {boolean} [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
    * @param {boolean} [enableBody=false] - If true all Sprites created with `Group.create` or `Group.createMulitple` will have a physics body created on them. Change the body type with physicsBodyType.
    * @param {number} [physicsBodyType=0] - If enableBody is true this is the type of physics body that is created on new Sprites. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA, etc.
    * @return {Phaser.Group} The newly created Group.
    */
    group: function (parent, name, addToStage, enableBody, physicsBodyType) {

        return new Phaser.Group(this.game, parent, name, addToStage, enableBody, physicsBodyType);

    },

    /**
    * A Group is a container for display objects that allows for fast pooling, recycling and collision checks.
    * 
    * A Physics Group is the same as an ordinary Group except that is has enableBody turned on by default, so any Sprites it creates
    * are automatically given a physics body.
    *
    * @method Phaser.GameObjectFactory#physicsGroup
    * @param {number} [physicsBodyType=Phaser.Physics.ARCADE] - If enableBody is true this is the type of physics body that is created on new Sprites. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA, etc.
    * @param {any} [parent] - The parent Group or DisplayObjectContainer that will hold this group, if any. If set to null the Group won't be added to the display list. If undefined it will be added to World by default.
    * @param {string} [name='group'] - A name for this Group. Not used internally but useful for debugging.
    * @param {boolean} [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
    * @return {Phaser.Group} The newly created Group.
    */
    physicsGroup: function (physicsBodyType, parent, name, addToStage) {

        return new Phaser.Group(this.game, parent, name, addToStage, true, physicsBodyType);

    },

    /**
    * A SpriteBatch is a really fast version of a Phaser Group built solely for speed.
    * Use when you need a lot of sprites or particles all sharing the same texture.
    * The speed gains are specifically for WebGL. In Canvas mode you won't see any real difference.
    *
    * @method Phaser.GameObjectFactory#spriteBatch
    * @param {Phaser.Group|null} parent - The parent Group that will hold this Sprite Batch. Set to `undefined` or `null` to add directly to game.world.
    * @param {string} [name='group'] - A name for this Sprite Batch. Not used internally but useful for debugging.
    * @param {boolean} [addToStage=false] - If set to true this Sprite Batch will be added directly to the Game.Stage instead of the parent.
    * @return {Phaser.SpriteBatch} The newly created Sprite Batch.
    */
    spriteBatch: function (parent, name, addToStage) {

        if (parent === undefined) { parent = null; }
        if (name === undefined) { name = 'group'; }
        if (addToStage === undefined) { addToStage = false; }

        return new Phaser.SpriteBatch(this.game, parent, name, addToStage);

    },

    /**
    * Creates a new Sound object.
    *
    * @method Phaser.GameObjectFactory#audio
    * @param {string} key - The Game.cache key of the sound that this object will use.
    * @param {number} [volume=1] - The volume at which the sound will be played.
    * @param {boolean} [loop=false] - Whether or not the sound will loop.
    * @param {boolean} [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under WebAudio.
    * @return {Phaser.Sound} The newly created sound object.
    */
    audio: function (key, volume, loop, connect) {

        return this.game.sound.add(key, volume, loop, connect);

    },

    /**
    * Creates a new Sound object.
    *
    * @method Phaser.GameObjectFactory#sound
    * @param {string} key - The Game.cache key of the sound that this object will use.
    * @param {number} [volume=1] - The volume at which the sound will be played.
    * @param {boolean} [loop=false] - Whether or not the sound will loop.
    * @param {boolean} [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under WebAudio.
    * @return {Phaser.Sound} The newly created sound object.
    */
    sound: function (key, volume, loop, connect) {

        return this.game.sound.add(key, volume, loop, connect);

    },

    /**
     * Creates a new AudioSprite object.
     *
     * @method Phaser.GameObjectFactory#audioSprite
     * @param {string} key - The Game.cache key of the sound that this object will use.
     * @return {Phaser.AudioSprite} The newly created AudioSprite object.
     */
    audioSprite: function (key) {

        return this.game.sound.addSprite(key);

    },

    /**
    * Creates a new TileSprite object.
    *
    * @method Phaser.GameObjectFactory#tileSprite
    * @param {number} x - The x coordinate of the TileSprite. The coordinate is relative to any parent container this TileSprite may be in.
    * @param {number} y - The y coordinate of the TileSprite. The coordinate is relative to any parent container this TileSprite may be in.
    * @param {number} width - The width of the TileSprite.
    * @param {number} height - The height of the TileSprite.
    * @param {string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture} key - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param {string|number} [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
    * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return {Phaser.TileSprite} The newly created TileSprite object.
    */
    tileSprite: function (x, y, width, height, key, frame, group) {

        if (group === undefined) { group = this.world; }

        return group.add(new Phaser.TileSprite(this.game, x, y, width, height, key, frame));

    },

    /**
    * Creates a new Rope object.
    *
    * Example usage: https://github.com/codevinsky/phaser-rope-demo/blob/master/dist/demo.js
    *
    * @method Phaser.GameObjectFactory#rope
    * @param {number} [x=0] - The x coordinate of the Rope. The coordinate is relative to any parent container this rope may be in.
    * @param {number} [y=0] - The y coordinate of the Rope. The coordinate is relative to any parent container this rope may be in.
    * @param {string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture} [key] - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param {string|number} [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
    * @param {Array} points - An array of {Phaser.Point}.
    * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return {Phaser.Rope} The newly created Rope object.
    */
    rope: function (x, y, key, frame, points, group) {

        if (group === undefined) { group = this.world; }

        return group.add(new Phaser.Rope(this.game, x, y, key, frame, points));

    },

    /**
    * Creates a new Text object.
    *
    * @method Phaser.GameObjectFactory#text
    * @param {number} [x=0] - The x coordinate of the Text. The coordinate is relative to any parent container this text may be in.
    * @param {number} [y=0] - The y coordinate of the Text. The coordinate is relative to any parent container this text may be in.
    * @param {string} [text=''] - The text string that will be displayed.
    * @param {object} [style] - The style object containing style attributes like font, font size , etc.
    * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return {Phaser.Text} The newly created text object.
    */
    text: function (x, y, text, style, group) {

        if (group === undefined) { group = this.world; }

        return group.add(new Phaser.Text(this.game, x, y, text, style));

    },

    /**
    * Creates a new Button object.
    *
    * @method Phaser.GameObjectFactory#button
    * @param {number} [x=0] - The x coordinate of the Button. The coordinate is relative to any parent container this button may be in.
    * @param {number} [y=0] - The y coordinate of the Button. The coordinate is relative to any parent container this button may be in.
    * @param {string} [key] - The image key as defined in the Game.Cache to use as the texture for this button.
    * @param {function} [callback] - The function to call when this button is pressed
    * @param {object} [callbackContext] - The context in which the callback will be called (usually 'this')
    * @param {string|number} [overFrame] - This is the frame or frameName that will be set when this button is in an over state. Give either a number to use a frame ID or a string for a frame name.
    * @param {string|number} [outFrame] - This is the frame or frameName that will be set when this button is in an out state. Give either a number to use a frame ID or a string for a frame name.
    * @param {string|number} [downFrame] - This is the frame or frameName that will be set when this button is in a down state. Give either a number to use a frame ID or a string for a frame name.
    * @param {string|number} [upFrame] - This is the frame or frameName that will be set when this button is in an up state. Give either a number to use a frame ID or a string for a frame name.
    * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return {Phaser.Button} The newly created Button object.
    */
    button: function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) {

        if (group === undefined) { group = this.world; }

        return group.add(new Phaser.Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame));

    },

    /**
    * Creates a new Graphics object.
    *
    * @method Phaser.GameObjectFactory#graphics
    * @param {number} [x=0] - The x coordinate of the Graphic. The coordinate is relative to any parent container this object may be in.
    * @param {number} [y=0] - The y coordinate of the Graphic. The coordinate is relative to any parent container this object may be in.
    * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return {Phaser.Graphics} The newly created graphics object.
    */
    graphics: function (x, y, group) {

        if (group === undefined) { group = this.world; }

        return group.add(new Phaser.Graphics(this.game, x, y));

    },

    /**
    * Create a new Emitter.
    *
    * A particle emitter can be used for one-time explosions or for
    * continuous effects like rain and fire. All it really does is launch Particle objects out
    * at set intervals, and fixes their positions and velocities accordingly.
    *
    * @method Phaser.GameObjectFactory#emitter
    * @param {number} [x=0] - The x coordinate within the Emitter that the particles are emitted from.
    * @param {number} [y=0] - The y coordinate within the Emitter that the particles are emitted from.
    * @param {number} [maxParticles=50] - The total number of particles in this emitter.
    * @return {Phaser.Particles.Arcade.Emitter} The newly created emitter object.
    */
    emitter: function (x, y, maxParticles) {

        return this.game.particles.add(new Phaser.Particles.Arcade.Emitter(this.game, x, y, maxParticles));

    },

    /**
    * Create a new RetroFont object.
    *
    * A RetroFont can be used as a texture for an Image or Sprite and optionally add it to the Cache.
    * A RetroFont uses a bitmap which contains fixed with characters for the font set. You use character spacing to define the set.
    * If you need variable width character support then use a BitmapText object instead. The main difference between a RetroFont and a BitmapText
    * is that a RetroFont creates a single texture that you can apply to a game object, where-as a BitmapText creates one Sprite object per letter of text.
    * The texture can be asssigned or one or multiple images/sprites, but note that the text the RetroFont uses will be shared across them all,
    * i.e. if you need each Image to have different text in it, then you need to create multiple RetroFont objects.
    *
    * @method Phaser.GameObjectFactory#retroFont
    * @param {string} font - The key of the image in the Game.Cache that the RetroFont will use.
    * @param {number} characterWidth - The width of each character in the font set.
    * @param {number} characterHeight - The height of each character in the font set.
    * @param {string} chars - The characters used in the font set, in display order. You can use the TEXT_SET consts for common font set arrangements.
    * @param {number} charsPerRow - The number of characters per row in the font set.
    * @param {number} [xSpacing=0] - If the characters in the font set have horizontal spacing between them set the required amount here.
    * @param {number} [ySpacing=0] - If the characters in the font set have vertical spacing between them set the required amount here.
    * @param {number} [xOffset=0] - If the font set doesn't start at the top left of the given image, specify the X coordinate offset here.
    * @param {number} [yOffset=0] - If the font set doesn't start at the top left of the given image, specify the Y coordinate offset here.
    * @return {Phaser.RetroFont} The newly created RetroFont texture which can be applied to an Image or Sprite.
    */
    retroFont: function (font, characterWidth, characterHeight, chars, charsPerRow, xSpacing, ySpacing, xOffset, yOffset) {

        return new Phaser.RetroFont(this.game, font, characterWidth, characterHeight, chars, charsPerRow, xSpacing, ySpacing, xOffset, yOffset);

    },

    /**
    * Create a new BitmapText object.
    *
    * BitmapText objects work by taking a texture file and an XML file that describes the font structure.
    * It then generates a new Sprite object for each letter of the text, proportionally spaced out and aligned to 
    * match the font structure.
    * 
    * BitmapText objects are less flexible than Text objects, in that they have less features such as shadows, fills and the ability 
    * to use Web Fonts. However you trade this flexibility for pure rendering speed. You can also create visually compelling BitmapTexts by 
    * processing the font texture in an image editor first, applying fills and any other effects required.
    *
    * To create multi-line text insert \r, \n or \r\n escape codes into the text string.
    *
    * To create a BitmapText data files you can use:
    *
    * BMFont (Windows, free): http://www.angelcode.com/products/bmfont/
    * Glyph Designer (OS X, commercial): http://www.71squared.com/en/glyphdesigner
    * Littera (Web-based, free): http://kvazars.com/littera/
    *
    * @method Phaser.GameObjectFactory#bitmapText
    * @param {number} x - X coordinate to display the BitmapText object at.
    * @param {number} y - Y coordinate to display the BitmapText object at.
    * @param {string} font - The key of the BitmapText as stored in Phaser.Cache.
    * @param {string} [text=''] - The text that will be rendered. This can also be set later via BitmapText.text.
    * @param {number} [size=32] - The size the font will be rendered at in pixels.
    * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return {Phaser.BitmapText} The newly created bitmapText object.
    */
    bitmapText: function (x, y, font, text, size, group) {

        if (group === undefined) { group = this.world; }

        return group.add(new Phaser.BitmapText(this.game, x, y, font, text, size));

    },

    /**
    * Creates a new Phaser.Tilemap object.
    *
    * The map can either be populated with data from a Tiled JSON file or from a CSV file.
    * To do this pass the Cache key as the first parameter. When using Tiled data you need only provide the key.
    * When using CSV data you must provide the key and the tileWidth and tileHeight parameters.
    * If creating a blank tilemap to be populated later, you can either specify no parameters at all and then use `Tilemap.create` or pass the map and tile dimensions here.
    * Note that all Tilemaps use a base tile size to calculate dimensions from, but that a TilemapLayer may have its own unique tile size that overrides it.
    *
    * @method Phaser.GameObjectFactory#tilemap
    * @param {string} [key] - The key of the tilemap data as stored in the Cache. If you're creating a blank map either leave this parameter out or pass `null`.
    * @param {number} [tileWidth=32] - The pixel width of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param {number} [tileHeight=32] - The pixel height of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param {number} [width=10] - The width of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    * @param {number} [height=10] - The height of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    * @return {Phaser.Tilemap} The newly created tilemap object.
    */
    tilemap: function (key, tileWidth, tileHeight, width, height) {

        return new Phaser.Tilemap(this.game, key, tileWidth, tileHeight, width, height);

    },

    /**
    * A dynamic initially blank canvas to which images can be drawn.
    *
    * @method Phaser.GameObjectFactory#renderTexture
    * @param {number} [width=100] - the width of the RenderTexture.
    * @param {number} [height=100] - the height of the RenderTexture.
    * @param {string} [key=''] - Asset key for the RenderTexture when stored in the Cache (see addToCache parameter).
    * @param {boolean} [addToCache=false] - Should this RenderTexture be added to the Game.Cache? If so you can retrieve it with Cache.getTexture(key)
    * @return {Phaser.RenderTexture} The newly created RenderTexture object.
    */
    renderTexture: function (width, height, key, addToCache) {

        if (key === undefined || key === '') { key = this.game.rnd.uuid(); }
        if (addToCache === undefined) { addToCache = false; }

        var texture = new Phaser.RenderTexture(this.game, width, height, key);

        if (addToCache)
        {
            this.game.cache.addRenderTexture(key, texture);
        }

        return texture;

    },

    /**
    * Create a Video object.
    *
    * This will return a Phaser.Video object which you can pass to a Sprite to be used as a texture.
    *
    * @method Phaser.GameObjectFactory#video
    * @param {string|null} [key=null] - The key of the video file in the Phaser.Cache that this Video object will play. Set to `null` or leave undefined if you wish to use a webcam as the source. See `startMediaStream` to start webcam capture.
    * @param {string|null} [url=null] - If the video hasn't been loaded then you can provide a full URL to the file here (make sure to set key to null)
    * @return {Phaser.Video} The newly created Video object.
    */
    video: function (key, url) {

        return new Phaser.Video(this.game, key, url);

    },

    /**
    * Create a BitmapData object.
    *
    * A BitmapData object can be manipulated and drawn to like a traditional Canvas object and used to texture Sprites.
    *
    * @method Phaser.GameObjectFactory#bitmapData
    * @param {number} [width=256] - The width of the BitmapData in pixels.
    * @param {number} [height=256] - The height of the BitmapData in pixels.
    * @param {string} [key=''] - Asset key for the BitmapData when stored in the Cache (see addToCache parameter).
    * @param {boolean} [addToCache=false] - Should this BitmapData be added to the Game.Cache? If so you can retrieve it with Cache.getBitmapData(key)
    * @return {Phaser.BitmapData} The newly created BitmapData object.
    */
    bitmapData: function (width, height, key, addToCache) {

        if (addToCache === undefined) { addToCache = false; }
        if (key === undefined || key === '') { key = this.game.rnd.uuid(); }

        var texture = new Phaser.BitmapData(this.game, key, width, height);

        if (addToCache)
        {
            this.game.cache.addBitmapData(key, texture);
        }

        return texture;

    },

    /**
    * A WebGL shader/filter that can be applied to Sprites.
    *
    * @method Phaser.GameObjectFactory#filter
    * @param {string} filter - The name of the filter you wish to create, for example HueRotate or SineWave.
    * @param {any} - Whatever parameters are needed to be passed to the filter init function.
    * @return {Phaser.Filter} The newly created Phaser.Filter object.
    */
    filter: function (filter) {

        var args = Array.prototype.splice.call(arguments, 1);

        var filter = new Phaser.Filter[filter](this.game);

        filter.init.apply(filter, args);

        return filter;

    },

    /**
    * Add a new Plugin into the PluginManager.
    *
    * The Plugin must have 2 properties: `game` and `parent`. Plugin.game is set to the game reference the PluginManager uses, and parent is set to the PluginManager.
    *
    * @method Phaser.GameObjectFactory#plugin
    * @param {object|Phaser.Plugin} plugin - The Plugin to add into the PluginManager. This can be a function or an existing object.
    * @param {...*} parameter - Additional parameters that will be passed to the Plugin.init method.
    * @return {Phaser.Plugin} The Plugin that was added to the manager.
    */
    plugin: function (plugin) {

        return this.game.plugins.add(plugin);

    }

};

Phaser.GameObjectFactory.prototype.constructor = Phaser.GameObjectFactory;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The GameObjectCreator is a quick way to create common game objects _without_ adding them to the game world.
* The object creator can be accessed with {@linkcode Phaser.Game#make `game.make`}.
*
* @class Phaser.GameObjectCreator
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
*/
Phaser.GameObjectCreator = function (game) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    * @protected
    */
    this.game = game;

    /**
    * @property {Phaser.World} world - A reference to the game world.
    * @protected
    */
    this.world = this.game.world;

};

Phaser.GameObjectCreator.prototype = {

    /**
    * Create a new Image object.
    *
    * An Image is a light-weight object you can use to display anything that doesn't need physics or animation.
    * It can still rotate, scale, crop and receive input events. This makes it perfect for logos, backgrounds, simple buttons and other non-Sprite graphics.
    *
    * @method Phaser.GameObjectCreator#image
    * @param {number} x - X position of the image.
    * @param {number} y - Y position of the image.
    * @param {string|Phaser.RenderTexture|PIXI.Texture} key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
    * @param {string|number} [frame] - If the sprite uses an image from a texture atlas or sprite sheet you can pass the frame here. Either a number for a frame ID or a string for a frame name.
    * @returns {Phaser.Image} the newly created sprite object.
    */
    image: function (x, y, key, frame) {

        return new Phaser.Image(this.game, x, y, key, frame);

    },

    /**
    * Create a new Sprite with specific position and sprite sheet key.
    *
    * @method Phaser.GameObjectCreator#sprite
    * @param {number} x - X position of the new sprite.
    * @param {number} y - Y position of the new sprite.
    * @param {string|Phaser.RenderTexture|PIXI.Texture} key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
    * @param {string|number} [frame] - If the sprite uses an image from a texture atlas or sprite sheet you can pass the frame here. Either a number for a frame ID or a string for a frame name.
    * @returns {Phaser.Sprite} the newly created sprite object.
    */
    sprite: function (x, y, key, frame) {

        return new Phaser.Sprite(this.game, x, y, key, frame);

    },

    /**
    * Create a tween object for a specific object.
    *
    * The object can be any JavaScript object or Phaser object such as Sprite.
    *
    * @method Phaser.GameObjectCreator#tween
    * @param {object} obj - Object the tween will be run on.
    * @return {Phaser.Tween} The Tween object.
    */
    tween: function (obj) {

        return new Phaser.Tween(obj, this.game, this.game.tweens);

    },

    /**
    * A Group is a container for display objects that allows for fast pooling, recycling and collision checks.
    *
    * @method Phaser.GameObjectCreator#group
    * @param {any} parent - The parent Group or DisplayObjectContainer that will hold this group, if any.
    * @param {string} [name='group'] - A name for this Group. Not used internally but useful for debugging.
    * @param {boolean} [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
    * @param {boolean} [enableBody=false] - If true all Sprites created with `Group.create` or `Group.createMulitple` will have a physics body created on them. Change the body type with physicsBodyType.
    * @param {number} [physicsBodyType=0] - If enableBody is true this is the type of physics body that is created on new Sprites. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA, etc.
    * @return {Phaser.Group} The newly created Group.
    */
    group: function (parent, name, addToStage, enableBody, physicsBodyType) {

        return new Phaser.Group(this.game, parent, name, addToStage, enableBody, physicsBodyType);

    },

    /**
    * Create a new SpriteBatch.
    *
    * @method Phaser.GameObjectCreator#spriteBatch
    * @param {any} parent - The parent Group or DisplayObjectContainer that will hold this group, if any.
    * @param {string} [name='group'] - A name for this Group. Not used internally but useful for debugging.
    * @param {boolean} [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
    * @return {Phaser.SpriteBatch} The newly created group.
    */
    spriteBatch: function (parent, name, addToStage) {

        if (name === undefined) { name = 'group'; }
        if (addToStage === undefined) { addToStage = false; }

        return new Phaser.SpriteBatch(this.game, parent, name, addToStage);

    },

    /**
    * Creates a new Sound object.
    *
    * @method Phaser.GameObjectCreator#audio
    * @param {string} key - The Game.cache key of the sound that this object will use.
    * @param {number} [volume=1] - The volume at which the sound will be played.
    * @param {boolean} [loop=false] - Whether or not the sound will loop.
    * @param {boolean} [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under WebAudio.
    * @return {Phaser.Sound} The newly created text object.
    */
    audio: function (key, volume, loop, connect) {

        return this.game.sound.add(key, volume, loop, connect);

    },

    /**
     * Creates a new AudioSprite object.
     *
     * @method Phaser.GameObjectCreator#audioSprite
     * @param {string} key - The Game.cache key of the sound that this object will use.
     * @return {Phaser.AudioSprite} The newly created AudioSprite object.
     */
    audioSprite: function (key) {

        return this.game.sound.addSprite(key);

    },

    /**
    * Creates a new Sound object.
    *
    * @method Phaser.GameObjectCreator#sound
    * @param {string} key - The Game.cache key of the sound that this object will use.
    * @param {number} [volume=1] - The volume at which the sound will be played.
    * @param {boolean} [loop=false] - Whether or not the sound will loop.
    * @param {boolean} [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under WebAudio.
    * @return {Phaser.Sound} The newly created text object.
    */
    sound: function (key, volume, loop, connect) {

        return this.game.sound.add(key, volume, loop, connect);

    },

    /**
    * Creates a new TileSprite object.
    *
    * @method Phaser.GameObjectCreator#tileSprite
    * @param {number} x - The x coordinate (in world space) to position the TileSprite at.
    * @param {number} y - The y coordinate (in world space) to position the TileSprite at.
    * @param {number} width - The width of the TileSprite.
    * @param {number} height - The height of the TileSprite.
    * @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the TileSprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
    * @param {string|number} frame - If this TileSprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
    * @return {Phaser.TileSprite} The newly created tileSprite object.
    */
    tileSprite: function (x, y, width, height, key, frame) {

        return new Phaser.TileSprite(this.game, x, y, width, height, key, frame);

    },

    /**
    * Creates a new Rope object.
    *
    * @method Phaser.GameObjectCreator#rope
    * @param {number} x - The x coordinate (in world space) to position the Rope at.
    * @param {number} y - The y coordinate (in world space) to position the Rope at.
    * @param {number} width - The width of the Rope.
    * @param {number} height - The height of the Rope.
    * @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the TileSprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
    * @param {string|number} frame - If this Rope is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
    * @return {Phaser.Rope} The newly created rope object.
    */
    rope: function (x, y, key, frame, points) {

        return new Phaser.Rope(this.game, x, y, key, frame, points);

    },

    /**
    * Creates a new Text object.
    *
    * @method Phaser.GameObjectCreator#text
    * @param {number} x - X position of the new text object.
    * @param {number} y - Y position of the new text object.
    * @param {string} text - The actual text that will be written.
    * @param {object} style - The style object containing style attributes like font, font size , etc.
    * @return {Phaser.Text} The newly created text object.
    */
    text: function (x, y, text, style) {

        return new Phaser.Text(this.game, x, y, text, style);

    },

    /**
    * Creates a new Button object.
    *
    * @method Phaser.GameObjectCreator#button
    * @param {number} [x] X position of the new button object.
    * @param {number} [y] Y position of the new button object.
    * @param {string} [key] The image key as defined in the Game.Cache to use as the texture for this button.
    * @param {function} [callback] The function to call when this button is pressed
    * @param {object} [callbackContext] The context in which the callback will be called (usually 'this')
    * @param {string|number} [overFrame] This is the frame or frameName that will be set when this button is in an over state. Give either a number to use a frame ID or a string for a frame name.
    * @param {string|number} [outFrame] This is the frame or frameName that will be set when this button is in an out state. Give either a number to use a frame ID or a string for a frame name.
    * @param {string|number} [downFrame] This is the frame or frameName that will be set when this button is in a down state. Give either a number to use a frame ID or a string for a frame name.
    * @param {string|number} [upFrame] This is the frame or frameName that will be set when this button is in an up state. Give either a number to use a frame ID or a string for a frame name.
    * @return {Phaser.Button} The newly created button object.
    */
    button: function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {

        return new Phaser.Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    },

    /**
    * Creates a new Graphics object.
    *
    * @method Phaser.GameObjectCreator#graphics
    * @param {number} [x=0] - X position of the new graphics object.
    * @param {number} [y=0] - Y position of the new graphics object.
    * @return {Phaser.Graphics} The newly created graphics object.
    */
    graphics: function (x, y) {

        return new Phaser.Graphics(this.game, x, y);

    },

    /**
    * Creat a new Emitter.
    *
    * An Emitter is a lightweight particle emitter. It can be used for one-time explosions or for
    * continuous effects like rain and fire. All it really does is launch Particle objects out
    * at set intervals, and fixes their positions and velocities accorindgly.
    *
    * @method Phaser.GameObjectCreator#emitter
    * @param {number} [x=0] - The x coordinate within the Emitter that the particles are emitted from.
    * @param {number} [y=0] - The y coordinate within the Emitter that the particles are emitted from.
    * @param {number} [maxParticles=50] - The total number of particles in this emitter.
    * @return {Phaser.Emitter} The newly created emitter object.
    */
    emitter: function (x, y, maxParticles) {

        return new Phaser.Particles.Arcade.Emitter(this.game, x, y, maxParticles);

    },

    /**
    * Create a new RetroFont object.
    *
    * A RetroFont can be used as a texture for an Image or Sprite and optionally add it to the Cache.
    * A RetroFont uses a bitmap which contains fixed with characters for the font set. You use character spacing to define the set.
    * If you need variable width character support then use a BitmapText object instead. The main difference between a RetroFont and a BitmapText
    * is that a RetroFont creates a single texture that you can apply to a game object, where-as a BitmapText creates one Sprite object per letter of text.
    * The texture can be asssigned or one or multiple images/sprites, but note that the text the RetroFont uses will be shared across them all,
    * i.e. if you need each Image to have different text in it, then you need to create multiple RetroFont objects.
    *
    * @method Phaser.GameObjectCreator#retroFont
    * @param {string} font - The key of the image in the Game.Cache that the RetroFont will use.
    * @param {number} characterWidth - The width of each character in the font set.
    * @param {number} characterHeight - The height of each character in the font set.
    * @param {string} chars - The characters used in the font set, in display order. You can use the TEXT_SET consts for common font set arrangements.
    * @param {number} charsPerRow - The number of characters per row in the font set.
    * @param {number} [xSpacing=0] - If the characters in the font set have horizontal spacing between them set the required amount here.
    * @param {number} [ySpacing=0] - If the characters in the font set have vertical spacing between them set the required amount here.
    * @param {number} [xOffset=0] - If the font set doesn't start at the top left of the given image, specify the X coordinate offset here.
    * @param {number} [yOffset=0] - If the font set doesn't start at the top left of the given image, specify the Y coordinate offset here.
    * @return {Phaser.RetroFont} The newly created RetroFont texture which can be applied to an Image or Sprite.
    */
    retroFont: function (font, characterWidth, characterHeight, chars, charsPerRow, xSpacing, ySpacing, xOffset, yOffset) {

        return new Phaser.RetroFont(this.game, font, characterWidth, characterHeight, chars, charsPerRow, xSpacing, ySpacing, xOffset, yOffset);

    },

    /**
    * Create a new BitmapText object.
    *
    * BitmapText objects work by taking a texture file and an XML file that describes the font structure.
    * It then generates a new Sprite object for each letter of the text, proportionally spaced out and aligned to 
    * match the font structure.
    * 
    * BitmapText objects are less flexible than Text objects, in that they have less features such as shadows, fills and the ability 
    * to use Web Fonts. However you trade this flexibility for pure rendering speed. You can also create visually compelling BitmapTexts by 
    * processing the font texture in an image editor first, applying fills and any other effects required.
    *
    * To create multi-line text insert \r, \n or \r\n escape codes into the text string.
    *
    * To create a BitmapText data files you can use:
    *
    * BMFont (Windows, free): http://www.angelcode.com/products/bmfont/
    * Glyph Designer (OS X, commercial): http://www.71squared.com/en/glyphdesigner
    * Littera (Web-based, free): http://kvazars.com/littera/
    *
    * @method Phaser.GameObjectCreator#bitmapText
    * @param {number} x - X coordinate to display the BitmapText object at.
    * @param {number} y - Y coordinate to display the BitmapText object at.
    * @param {string} font - The key of the BitmapText as stored in Phaser.Cache.
    * @param {string} [text=''] - The text that will be rendered. This can also be set later via BitmapText.text.
    * @param {number} [size=32] - The size the font will be rendered at in pixels.
    * @param {string} [align='left'] - The alignment of multi-line text. Has no effect if there is only one line of text.
    * @return {Phaser.BitmapText} The newly created bitmapText object.
    */
    bitmapText: function (x, y, font, text, size, align) {

        return new Phaser.BitmapText(this.game, x, y, font, text, size, align);

    },

    /**
    * Creates a new Phaser.Tilemap object.
    *
    * The map can either be populated with data from a Tiled JSON file or from a CSV file.
    * To do this pass the Cache key as the first parameter. When using Tiled data you need only provide the key.
    * When using CSV data you must provide the key and the tileWidth and tileHeight parameters.
    * If creating a blank tilemap to be populated later, you can either specify no parameters at all and then use `Tilemap.create` or pass the map and tile dimensions here.
    * Note that all Tilemaps use a base tile size to calculate dimensions from, but that a TilemapLayer may have its own unique tile size that overrides it.
    *
    * @method Phaser.GameObjectCreator#tilemap
    * @param {string} [key] - The key of the tilemap data as stored in the Cache. If you're creating a blank map either leave this parameter out or pass `null`.
    * @param {number} [tileWidth=32] - The pixel width of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param {number} [tileHeight=32] - The pixel height of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param {number} [width=10] - The width of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    * @param {number} [height=10] - The height of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    */
    tilemap: function (key, tileWidth, tileHeight, width, height) {

        return new Phaser.Tilemap(this.game, key, tileWidth, tileHeight, width, height);

    },

    /**
    * A dynamic initially blank canvas to which images can be drawn.
    *
    * @method Phaser.GameObjectCreator#renderTexture
    * @param {number} [width=100] - the width of the RenderTexture.
    * @param {number} [height=100] - the height of the RenderTexture.
    * @param {string} [key=''] - Asset key for the RenderTexture when stored in the Cache (see addToCache parameter).
    * @param {boolean} [addToCache=false] - Should this RenderTexture be added to the Game.Cache? If so you can retrieve it with Cache.getTexture(key)
    * @return {Phaser.RenderTexture} The newly created RenderTexture object.
    */
    renderTexture: function (width, height, key, addToCache) {

        if (key === undefined || key === '') { key = this.game.rnd.uuid(); }
        if (addToCache === undefined) { addToCache = false; }

        var texture = new Phaser.RenderTexture(this.game, width, height, key);

        if (addToCache)
        {
            this.game.cache.addRenderTexture(key, texture);
        }

        return texture;

    },

    /**
    * Create a BitmpaData object.
    *
    * A BitmapData object can be manipulated and drawn to like a traditional Canvas object and used to texture Sprites.
    *
    * @method Phaser.GameObjectCreator#bitmapData
    * @param {number} [width=256] - The width of the BitmapData in pixels.
    * @param {number} [height=256] - The height of the BitmapData in pixels.
    * @param {string} [key=''] - Asset key for the BitmapData when stored in the Cache (see addToCache parameter).
    * @param {boolean} [addToCache=false] - Should this BitmapData be added to the Game.Cache? If so you can retrieve it with Cache.getBitmapData(key)
    * @return {Phaser.BitmapData} The newly created BitmapData object.
    */
    bitmapData: function (width, height, key, addToCache) {

        if (addToCache === undefined) { addToCache = false; }
        if (key === undefined || key === '') { key = this.game.rnd.uuid(); }

        var texture = new Phaser.BitmapData(this.game, key, width, height);

        if (addToCache)
        {
            this.game.cache.addBitmapData(key, texture);
        }

        return texture;

    },

    /**
    * A WebGL shader/filter that can be applied to Sprites.
    *
    * @method Phaser.GameObjectCreator#filter
    * @param {string} filter - The name of the filter you wish to create, for example HueRotate or SineWave.
    * @param {any} - Whatever parameters are needed to be passed to the filter init function.
    * @return {Phaser.Filter} The newly created Phaser.Filter object.
    */
    filter: function (filter) {

        var args = Array.prototype.splice.call(arguments, 1);

        var filter = new Phaser.Filter[filter](this.game);

        filter.init.apply(filter, args);

        return filter;

    }

};

Phaser.GameObjectCreator.prototype.constructor = Phaser.GameObjectCreator;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Sprites are the lifeblood of your game, used for nearly everything visual.
*
* At its most basic a Sprite consists of a set of coordinates and a texture that is rendered to the canvas.
* They also contain additional properties allowing for physics motion (via Sprite.body), input handling (via Sprite.input),
* events (via Sprite.events), animation (via Sprite.animations), camera culling and more. Please see the Examples for use cases.
*
* @class Phaser.Sprite
* @constructor
* @extends PIXI.Sprite
* @extends Phaser.Component.Core
* @extends Phaser.Component.Angle
* @extends Phaser.Component.Animation
* @extends Phaser.Component.AutoCull
* @extends Phaser.Component.Bounds
* @extends Phaser.Component.BringToTop
* @extends Phaser.Component.Crop
* @extends Phaser.Component.Delta
* @extends Phaser.Component.Destroy
* @extends Phaser.Component.FixedToCamera
* @extends Phaser.Component.Health
* @extends Phaser.Component.InCamera
* @extends Phaser.Component.InputEnabled
* @extends Phaser.Component.InWorld
* @extends Phaser.Component.LifeSpan
* @extends Phaser.Component.LoadTexture
* @extends Phaser.Component.Overlap
* @extends Phaser.Component.PhysicsBody
* @extends Phaser.Component.Reset
* @extends Phaser.Component.ScaleMinMax
* @extends Phaser.Component.Smoothed
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} x - The x coordinate (in world space) to position the Sprite at.
* @param {number} y - The y coordinate (in world space) to position the Sprite at.
* @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param {string|number} frame - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
Phaser.Sprite = function (game, x, y, key, frame) {

    x = x || 0;
    y = y || 0;
    key = key || null;
    frame = frame || null;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.SPRITE;

    /**
    * @property {number} physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    PIXI.Sprite.call(this, PIXI.TextureCache['__default']);

    Phaser.Component.Core.init.call(this, game, x, y, key, frame);

};

Phaser.Sprite.prototype = Object.create(PIXI.Sprite.prototype);
Phaser.Sprite.prototype.constructor = Phaser.Sprite;

Phaser.Component.Core.install.call(Phaser.Sprite.prototype, [
    'Angle',
    'Animation',
    'AutoCull',
    'Bounds',
    'BringToTop',
    'Crop',
    'Delta',
    'Destroy',
    'FixedToCamera',
    'Health',
    'InCamera',
    'InputEnabled',
    'InWorld',
    'LifeSpan',
    'LoadTexture',
    'Overlap',
    'PhysicsBody',
    'Reset',
    'ScaleMinMax',
    'Smoothed'
]);

Phaser.Sprite.prototype.preUpdatePhysics = Phaser.Component.PhysicsBody.preUpdate;
Phaser.Sprite.prototype.preUpdateLifeSpan = Phaser.Component.LifeSpan.preUpdate;
Phaser.Sprite.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.Sprite.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
*
* @method
* @memberof Phaser.Sprite
* @return {boolean} True if the Sprite was rendered, otherwise false.
*/
Phaser.Sprite.prototype.preUpdate = function() {

    if (!this.preUpdatePhysics() || !this.preUpdateLifeSpan() || !this.preUpdateInWorld())
    {
        return false;
    }

    return this.preUpdateCore();

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* An Image is a light-weight object you can use to display anything that doesn't need physics or animation.
* It can still rotate, scale, crop and receive input events. This makes it perfect for logos, backgrounds, simple buttons and other non-Sprite graphics.
*
* @class Phaser.Image
* @extends PIXI.Sprite
* @extends Phaser.Component.Core
* @extends Phaser.Component.Angle
* @extends Phaser.Component.Animation
* @extends Phaser.Component.AutoCull
* @extends Phaser.Component.Bounds
* @extends Phaser.Component.BringToTop
* @extends Phaser.Component.Crop
* @extends Phaser.Component.Destroy
* @extends Phaser.Component.FixedToCamera
* @extends Phaser.Component.InputEnabled
* @extends Phaser.Component.LifeSpan
* @extends Phaser.Component.LoadTexture
* @extends Phaser.Component.Overlap
* @extends Phaser.Component.Reset
* @extends Phaser.Component.Smoothed
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} [x=0] - The x coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
* @param {number} [y=0] - The y coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
* @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} [key] - The texture used by the Image during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture, BitmapData or PIXI.Texture.
* @param {string|number} [frame] - If this Image is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
Phaser.Image = function (game, x, y, key, frame) {

    x = x || 0;
    y = y || 0;
    key = key || null;
    frame = frame || null;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.IMAGE;

    PIXI.Sprite.call(this, PIXI.TextureCache['__default']);

    Phaser.Component.Core.init.call(this, game, x, y, key, frame);

};

Phaser.Image.prototype = Object.create(PIXI.Sprite.prototype);
Phaser.Image.prototype.constructor = Phaser.Image;

Phaser.Component.Core.install.call(Phaser.Image.prototype, [
    'Angle',
    'Animation',
    'AutoCull',
    'Bounds',
    'BringToTop',
    'Crop',
    'Destroy',
    'FixedToCamera',
    'InputEnabled',
    'LifeSpan',
    'LoadTexture',
    'Overlap',
    'Reset',
    'Smoothed'
]);

Phaser.Image.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.Image.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
*
* @method Phaser.Image#preUpdate
* @memberof Phaser.Image
*/
Phaser.Image.prototype.preUpdate = function() {

    if (!this.preUpdateInWorld())
    {
        return false;
    }

    return this.preUpdateCore();

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A TileSprite is a Sprite that has a repeating texture. The texture can be scrolled and scaled independently of the TileSprite itself.
* Textures will automatically wrap and are designed so that you can create game backdrops using seamless textures as a source.
* 
* TileSprites have no input handler or physics bodies by default, both need enabling in the same way as for normal Sprites.
*
* You shouldn't ever create a TileSprite any larger than your actual screen size. If you want to create a large repeating background
* that scrolls across the whole map of your game, then you create a TileSprite that fits the screen size and then use the `tilePosition`
* property to scroll the texture as the player moves. If you create a TileSprite that is thousands of pixels in size then it will 
* consume huge amounts of memory and cause performance issues. Remember: use `tilePosition` to scroll your texture and `tileScale` to
* adjust the scale of the texture - don't resize the sprite itself or make it larger than it needs.
*
* An important note about texture dimensions:
*
* When running under Canvas a TileSprite can use any texture size without issue. When running under WebGL the texture should ideally be
* a power of two in size (i.e. 4, 8, 16, 32, 64, 128, 256, 512, etch pixels width by height). If the texture isn't a power of two
* it will be rendered to a blank canvas that is the correct size, which means you may have 'blank' areas appearing to the right and
* bottom of your frame. To avoid this ensure your textures are perfect powers of two.
* 
* TileSprites support animations in the same way that Sprites do. You add and play animations using the AnimationManager. However
* if your game is running under WebGL please note that each frame of the animation must be a power of two in size, or it will receive
* additional padding to enforce it to be so.
*
* @class Phaser.TileSprite
* @constructor
* @extends PIXI.TilingSprite
* @extends Phaser.Component.Core
* @extends Phaser.Component.Angle
* @extends Phaser.Component.Animation
* @extends Phaser.Component.AutoCull
* @extends Phaser.Component.Bounds
* @extends Phaser.Component.BringToTop
* @extends Phaser.Component.Destroy
* @extends Phaser.Component.FixedToCamera
* @extends Phaser.Component.Health
* @extends Phaser.Component.InCamera
* @extends Phaser.Component.InputEnabled
* @extends Phaser.Component.InWorld
* @extends Phaser.Component.LifeSpan
* @extends Phaser.Component.LoadTexture
* @extends Phaser.Component.Overlap
* @extends Phaser.Component.PhysicsBody
* @extends Phaser.Component.Reset
* @extends Phaser.Component.Smoothed
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} x - The x coordinate (in world space) to position the TileSprite at.
* @param {number} y - The y coordinate (in world space) to position the TileSprite at.
* @param {number} width - The width of the TileSprite.
* @param {number} height - The height of the TileSprite.
* @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the TileSprite during rendering. It can be a string which is a reference to the Phaser Image Cache entry, or an instance of a RenderTexture, PIXI.Texture or BitmapData.
* @param {string|number} frame - If this TileSprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
Phaser.TileSprite = function (game, x, y, width, height, key, frame) {

    x = x || 0;
    y = y || 0;
    width = width || 256;
    height = height || 256;
    key = key || null;
    frame = frame || null;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.TILESPRITE;

    /**
    * @property {number} physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    /**
    * @property {Phaser.Point} _scroll - Internal cache var.
    * @private
    */
    this._scroll = new Phaser.Point();

    var def = game.cache.getImage('__default', true);

    PIXI.TilingSprite.call(this, new PIXI.Texture(def.base), width, height);

    Phaser.Component.Core.init.call(this, game, x, y, key, frame);

};

Phaser.TileSprite.prototype = Object.create(PIXI.TilingSprite.prototype);
Phaser.TileSprite.prototype.constructor = Phaser.TileSprite;

Phaser.Component.Core.install.call(Phaser.TileSprite.prototype, [
    'Angle',
    'Animation',
    'AutoCull',
    'Bounds',
    'BringToTop',
    'Destroy',
    'FixedToCamera',
    'Health',
    'InCamera',
    'InputEnabled',
    'InWorld',
    'LifeSpan',
    'LoadTexture',
    'Overlap',
    'PhysicsBody',
    'Reset',
    'Smoothed'
]);

Phaser.TileSprite.prototype.preUpdatePhysics = Phaser.Component.PhysicsBody.preUpdate;
Phaser.TileSprite.prototype.preUpdateLifeSpan = Phaser.Component.LifeSpan.preUpdate;
Phaser.TileSprite.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.TileSprite.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
*
* @method Phaser.TileSprite#preUpdate
* @memberof Phaser.TileSprite
*/
Phaser.TileSprite.prototype.preUpdate = function() {

    if (this._scroll.x !== 0)
    {
        this.tilePosition.x += this._scroll.x * this.game.time.physicsElapsed;
    }

    if (this._scroll.y !== 0)
    {
        this.tilePosition.y += this._scroll.y * this.game.time.physicsElapsed;
    }

    if (!this.preUpdatePhysics() || !this.preUpdateLifeSpan() || !this.preUpdateInWorld())
    {
        return false;
    }

    return this.preUpdateCore();

};

/**
* Sets this TileSprite to automatically scroll in the given direction until stopped via TileSprite.stopScroll().
* The scroll speed is specified in pixels per second.
* A negative x value will scroll to the left. A positive x value will scroll to the right.
* A negative y value will scroll up. A positive y value will scroll down.
*
* @method Phaser.TileSprite#autoScroll
* @memberof Phaser.TileSprite
* @param {number} x - Horizontal scroll speed in pixels per second.
* @param {number} y - Vertical scroll speed in pixels per second.
*/
Phaser.TileSprite.prototype.autoScroll = function(x, y) {

    this._scroll.set(x, y);

};

/**
* Stops an automatically scrolling TileSprite.
*
* @method Phaser.TileSprite#stopScroll
* @memberof Phaser.TileSprite
*/
Phaser.TileSprite.prototype.stopScroll = function() {

    this._scroll.set(0, 0);

};

/**
* Destroys the TileSprite. This removes it from its parent group, destroys the event and animation handlers if present
* and nulls its reference to game, freeing it up for garbage collection.
*
* @method Phaser.TileSprite#destroy
* @memberof Phaser.TileSprite
* @param {boolean} [destroyChildren=true] - Should every child of this object have its destroy method called?
*/
Phaser.TileSprite.prototype.destroy = function(destroyChildren) {

    Phaser.Component.Destroy.prototype.destroy.call(this, destroyChildren);

    PIXI.TilingSprite.prototype.destroy.call(this);

};

/**
* Resets the TileSprite. This places the TileSprite at the given x/y world coordinates, resets the tilePosition and then
* sets alive, exists, visible and renderable all to true. Also resets the outOfBounds state.
* If the TileSprite has a physics body that too is reset.
*
* @method Phaser.TileSprite#reset
* @memberof Phaser.TileSprite
* @param {number} x - The x coordinate (in world space) to position the Sprite at.
* @param {number} y - The y coordinate (in world space) to position the Sprite at.
* @return (Phaser.TileSprite) This instance.
*/
Phaser.TileSprite.prototype.reset = function(x, y) {

    Phaser.Component.Reset.prototype.reset.call(this, x, y);

    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    return this;

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd, Richard Davey
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Rope is a Sprite that has a repeating texture. The texture can be scrolled and scaled and will automatically wrap on the edges as it does so.
* Please note that Ropes, as with normal Sprites, have no input handler or physics bodies by default. Both need enabling.
* Example usage: https://github.com/codevinsky/phaser-rope-demo/blob/master/dist/demo.js
*
* @class Phaser.Rope
* @constructor
* @extends PIXI.Rope
* @extends Phaser.Component.Core
* @extends Phaser.Component.Angle
* @extends Phaser.Component.Animation
* @extends Phaser.Component.AutoCull
* @extends Phaser.Component.Bounds
* @extends Phaser.Component.BringToTop
* @extends Phaser.Component.Crop
* @extends Phaser.Component.Delta
* @extends Phaser.Component.Destroy
* @extends Phaser.Component.FixedToCamera
* @extends Phaser.Component.InputEnabled
* @extends Phaser.Component.InWorld
* @extends Phaser.Component.LifeSpan
* @extends Phaser.Component.LoadTexture
* @extends Phaser.Component.Overlap
* @extends Phaser.Component.PhysicsBody
* @extends Phaser.Component.Reset
* @extends Phaser.Component.ScaleMinMax
* @extends Phaser.Component.Smoothed
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} x - The x coordinate (in world space) to position the Rope at.
* @param {number} y - The y coordinate (in world space) to position the Rope at.
* @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the Rope during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param {string|number} frame - If this Rope is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
* @param {Array} points - An array of {Phaser.Point}.
*/
Phaser.Rope = function (game, x, y, key, frame, points) {

    this.points = [];
    this.points = points;
    this._hasUpdateAnimation = false;
    this._updateAnimationCallback = null;
    x = x || 0;
    y = y || 0;
    key = key || null;
    frame = frame || null;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.ROPE;

    /**
    * @property {Phaser.Point} _scroll - Internal cache var.
    * @private
    */
    this._scroll = new Phaser.Point();

    PIXI.Rope.call(this, PIXI.TextureCache['__default'], this.points);

    Phaser.Component.Core.init.call(this, game, x, y, key, frame);

};

Phaser.Rope.prototype = Object.create(PIXI.Rope.prototype);
Phaser.Rope.prototype.constructor = Phaser.Rope;

Phaser.Component.Core.install.call(Phaser.Rope.prototype, [
    'Angle',
    'Animation',
    'AutoCull',
    'Bounds',
    'BringToTop',
    'Crop',
    'Delta',
    'Destroy',
    'FixedToCamera',
    'InputEnabled',
    'InWorld',
    'LifeSpan',
    'LoadTexture',
    'Overlap',
    'PhysicsBody',
    'Reset',
    'ScaleMinMax',
    'Smoothed'
]);

Phaser.Rope.prototype.preUpdatePhysics = Phaser.Component.PhysicsBody.preUpdate;
Phaser.Rope.prototype.preUpdateLifeSpan = Phaser.Component.LifeSpan.preUpdate;
Phaser.Rope.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.Rope.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
*
* @method Phaser.Rope#preUpdate
* @memberof Phaser.Rope
*/
Phaser.Rope.prototype.preUpdate = function() {

    if (this._scroll.x !== 0)
    {
        this.tilePosition.x += this._scroll.x * this.game.time.physicsElapsed;
    }

    if (this._scroll.y !== 0)
    {
        this.tilePosition.y += this._scroll.y * this.game.time.physicsElapsed;
    }

    if (!this.preUpdatePhysics() || !this.preUpdateLifeSpan() || !this.preUpdateInWorld())
    {
        return false;
    }

    return this.preUpdateCore();

};

/**
* Override and use this function in your own custom objects to handle any update requirements you may have.
*
* @method Phaser.Rope#update
* @memberof Phaser.Rope
*/
Phaser.Rope.prototype.update = function() {

    if (this._hasUpdateAnimation)
    {
        this.updateAnimation.call(this);
    }

};

/**
* Resets the Rope. This places the Rope at the given x/y world coordinates, resets the tilePosition and then
* sets alive, exists, visible and renderable all to true. Also resets the outOfBounds state.
* If the Rope has a physics body that too is reset.
*
* @method Phaser.Rope#reset
* @memberof Phaser.Rope
* @param {number} x - The x coordinate (in world space) to position the Sprite at.
* @param {number} y - The y coordinate (in world space) to position the Sprite at.
* @return (Phaser.Rope) This instance.
*/
Phaser.Rope.prototype.reset = function(x, y) {

    Phaser.Component.Reset.prototype.reset.call(this, x, y);

    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    return this;

};

/**
* A Rope will call it's updateAnimation function on each update loop if it has one
*
* @name Phaser.Rope#updateAnimation
* @property {function} updateAnimation - Set to a function if you'd like the rope to animate during the update phase. Set to false or null to remove it.
*/
Object.defineProperty(Phaser.Rope.prototype, "updateAnimation", {

    get: function () {

        return this._updateAnimation;

    },

    set: function (value) {

        if (value && typeof value === 'function')
        {
            this._hasUpdateAnimation = true;
            this._updateAnimation = value;
        }
        else
        {
            this._hasUpdateAnimation = false;
            this._updateAnimation = null;
        }

    }

});

/**
* The segments that make up the rope body as an array of Phaser.Rectangles
*
* @name Phaser.Rope#segments
* @property {Phaser.Rectangles[]} updateAnimation - Returns an array of Phaser.Rectangles that represent the segments of the given rope
*/
Object.defineProperty(Phaser.Rope.prototype, "segments", {

    get: function() {

        var segments = [];
        var index, x1, y1, x2, y2, width, height, rect;

        for (var i = 0; i < this.points.length; i++)
        {
            index = i * 4;

            x1 = this.vertices[index] * this.scale.x;
            y1 = this.vertices[index + 1] * this.scale.y;
            x2 = this.vertices[index + 4] * this.scale.x;
            y2 = this.vertices[index + 3] * this.scale.y;

            width = Phaser.Math.difference(x1, x2);
            height = Phaser.Math.difference(y1, y2);

            x1 += this.world.x;
            y1 += this.world.y;
            rect = new Phaser.Rectangle(x1, y1, width, height);
            segments.push(rect);
        }

        return segments;
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Create a new `Button` object. A Button is a special type of Sprite that is set-up to handle Pointer events automatically.
*
* The four states a Button responds to are:
*
* * 'Over' - when the Pointer moves over the Button. This is also commonly known as 'hover'.
* * 'Out' - when the Pointer that was previously over the Button moves out of it.
* * 'Down' - when the Pointer is pressed down on the Button. I.e. touched on a touch enabled device or clicked with the mouse.
* * 'Up' - when the Pointer that was pressed down on the Button is released again.
*
* A different texture/frame and activation sound can be specified for any of the states.
*
* Frames can be specified as either an integer (the frame ID) or a string (the frame name); the same values that can be used with a Sprite constructor.
*
* @class Phaser.Button
* @constructor
* @extends Phaser.Image
* @param {Phaser.Game} game Current game instance.
* @param {number} [x=0] - X position of the Button.
* @param {number} [y=0] - Y position of the Button.
* @param {string} [key] - The image key (in the Game.Cache) to use as the texture for this Button.
* @param {function} [callback] - The function to call when this Button is pressed.
* @param {object} [callbackContext] - The context in which the callback will be called (usually 'this').
* @param {string|integer} [overFrame] - The frame / frameName when the button is in the Over state.
* @param {string|integer} [outFrame] - The frame / frameName when the button is in the Out state.
* @param {string|integer} [downFrame] - The frame / frameName when the button is in the Down state.
* @param {string|integer} [upFrame] - The frame / frameName when the button is in the Up state.
*/
Phaser.Button = function (game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {

    x = x || 0;
    y = y || 0;
    key = key || null;
    callback = callback || null;
    callbackContext = callbackContext || this;

    Phaser.Image.call(this, game, x, y, key, outFrame);

    /**
    * The Phaser Object Type.
    * @property {number} type
    * @readonly
    */
    this.type = Phaser.BUTTON;

    /**
    * @property {number} physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    /**
    * The name or ID of the Over state frame.
    * @property {string|integer} onOverFrame
    * @private
    */
    this._onOverFrame = null;

    /**
    * The name or ID of the Out state frame.
    * @property {string|integer} onOutFrame
    * @private
    */
    this._onOutFrame = null;

    /**
    * The name or ID of the Down state frame.
    * @property {string|integer} onDownFrame
    * @private
    */
    this._onDownFrame = null;

    /**
    * The name or ID of the Up state frame.
    * @property {string|integer} onUpFrame
    * @private
    */
    this._onUpFrame = null;

    /**
    * The Sound to be played when this Buttons Over state is activated.
    * @property {Phaser.Sound|Phaser.AudioSprite|null} onOverSound
    * @readonly
    */
    this.onOverSound = null;

    /**
    * The Sound to be played when this Buttons Out state is activated.
    * @property {Phaser.Sound|Phaser.AudioSprite|null} onOutSound
    * @readonly
    */
    this.onOutSound = null;

    /**
    * The Sound to be played when this Buttons Down state is activated.
    * @property {Phaser.Sound|Phaser.AudioSprite|null} onDownSound
    * @readonly
    */
    this.onDownSound = null;

    /**
    * The Sound to be played when this Buttons Up state is activated.
    * @property {Phaser.Sound|Phaser.AudioSprite|null} onUpSound
    * @readonly
    */
    this.onUpSound = null;

    /**
    * The Sound Marker used in conjunction with the onOverSound.
    * @property {string} onOverSoundMarker
    * @readonly
    */
    this.onOverSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onOutSound.
    * @property {string} onOutSoundMarker
    * @readonly
    */
    this.onOutSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onDownSound.
    * @property {string} onDownSoundMarker
    * @readonly
    */
    this.onDownSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onUpSound.
    * @property {string} onUpSoundMarker
    * @readonly
    */
    this.onUpSoundMarker = '';

    /**
    * The Signal (or event) dispatched when this Button is in an Over state.
    * @property {Phaser.Signal} onInputOver
    */
    this.onInputOver = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched when this Button is in an Out state.
    * @property {Phaser.Signal} onInputOut
    */
    this.onInputOut = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched when this Button is in an Down state.
    * @property {Phaser.Signal} onInputDown
    */
    this.onInputDown = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched when this Button is in an Up state.
    * @property {Phaser.Signal} onInputUp
    */
    this.onInputUp = new Phaser.Signal();

    /**
    * If true then onOver events (such as onOverSound) will only be triggered if the Pointer object causing them was the Mouse Pointer.
    * The frame will still be changed as applicable.
    * @property {boolean} onOverMouseOnly
    * @default
    */
    this.onOverMouseOnly = false;
    
    /**
    * When true the the texture frame will not be automatically switched on up/down/over/out events.
    * @property {boolean} freezeFrames
    * @default
    */
    this.freezeFrames = false;

    /**
    * When the Button is touched / clicked and then released you can force it to enter a state of "out" instead of "up".
    * @property {boolean} forceOut
    * @default
    */
    this.forceOut = false;

    this.inputEnabled = true;

    this.input.start(0, true);

    this.input.useHandCursor = true;

    this.setFrames(overFrame, outFrame, downFrame, upFrame);

    if (callback !== null)
    {
        this.onInputUp.add(callback, callbackContext);
    }

    //  Redirect the input events to here so we can handle animation updates, etc
    this.events.onInputOver.add(this.onInputOverHandler, this);
    this.events.onInputOut.add(this.onInputOutHandler, this);
    this.events.onInputDown.add(this.onInputDownHandler, this);
    this.events.onInputUp.add(this.onInputUpHandler, this);

    this.events.onRemovedFromWorld.add(this.removedFromWorld, this);

};

Phaser.Button.prototype = Object.create(Phaser.Image.prototype);
Phaser.Button.prototype.constructor = Phaser.Button;

//  State constants; local only. These are tied to property names in Phaser.Button.
var STATE_OVER = 'Over';
var STATE_OUT = 'Out';
var STATE_DOWN = 'Down';
var STATE_UP = 'Up';

/**
* Clears all of the frames set on this Button.
*
* @method Phaser.Button#clearFrames
*/
Phaser.Button.prototype.clearFrames = function () {

    this.setFrames(null, null, null, null);

};

/**
* Called when this Button is removed from the World.
*
* @method Phaser.Button#removedFromWorld
* @protected
*/
Phaser.Button.prototype.removedFromWorld = function () {

    this.inputEnabled = false;

};

/**
* Set the frame name/ID for the given state.
*
* @method Phaser.Button#setStateFrame
* @private
* @param {object} state - See `STATE_*`
* @param {number|string} frame - The number or string representing the frame.
* @param {boolean} switchImmediately - Immediately switch to the frame if it was set - and this is true.
*/
Phaser.Button.prototype.setStateFrame = function (state, frame, switchImmediately)
{
    var frameKey = '_on' + state + 'Frame';

    if (frame !== null) // not null or undefined
    {
        this[frameKey] = frame;

        if (switchImmediately)
        {
            this.changeStateFrame(state);
        }
    }
    else
    {
        this[frameKey] = null;
    }

};

/**
* Change the frame to that of the given state, _if_ the state has a frame assigned _and_ if the frames are not currently "frozen".
*
* @method Phaser.Button#changeStateFrame
* @private
* @param {object} state - See `STATE_*`
* @return {boolean} True only if the frame was assigned a value, possibly the same one it already had.
*/
Phaser.Button.prototype.changeStateFrame = function (state) {

    if (this.freezeFrames)
    {
        return false;
    }

    var frameKey = '_on' + state + 'Frame';
    var frame = this[frameKey];

    if (typeof frame === 'string')
    {
        this.frameName = frame;
        return true;
    }
    else if (typeof frame === 'number')
    {
        this.frame = frame;
        return true;
    }
    else
    {
        return false;
    }

};

/**
* Used to manually set the frames that will be used for the different states of the Button.
*
* Frames can be specified as either an integer (the frame ID) or a string (the frame name); these are the same values that can be used with a Sprite constructor.
*
* @method Phaser.Button#setFrames
* @public
* @param {string|integer} [overFrame] - The frame / frameName when the button is in the Over state.
* @param {string|integer} [outFrame] - The frame / frameName when the button is in the Out state.
* @param {string|integer} [downFrame] - The frame / frameName when the button is in the Down state.
* @param {string|integer} [upFrame] - The frame / frameName when the button is in the Up state.
*/
Phaser.Button.prototype.setFrames = function (overFrame, outFrame, downFrame, upFrame) {

    this.setStateFrame(STATE_OVER, overFrame, this.input.pointerOver());
    this.setStateFrame(STATE_OUT, outFrame, !this.input.pointerOver());
    this.setStateFrame(STATE_DOWN, downFrame, this.input.pointerDown());
    this.setStateFrame(STATE_UP, upFrame, this.input.pointerUp());

};

/**
* Set the sound/marker for the given state.
*
* @method Phaser.Button#setStateSound
* @private
* @param {object} state - See `STATE_*`
* @param {Phaser.Sound|Phaser.AudioSprite} [sound] - Sound.
* @param {string} [marker=''] - Sound marker.
*/
Phaser.Button.prototype.setStateSound = function (state, sound, marker) {

    var soundKey = 'on' + state + 'Sound';
    var markerKey = 'on' + state + 'SoundMarker';

    if (sound instanceof Phaser.Sound || sound instanceof Phaser.AudioSprite)
    {
        this[soundKey] = sound;
        this[markerKey] = typeof marker === 'string' ? marker : '';
    }
    else
    {
        this[soundKey] = null;
        this[markerKey] = '';
    }

};

/**
* Play the sound for the given state, _if_ the state has a sound assigned.
*
* @method Phaser.Button#playStateSound
* @private
* @param {object} state - See `STATE_*`
* @return {boolean} True only if a sound was played.
*/
Phaser.Button.prototype.playStateSound = function (state) {

    var soundKey = 'on' + state + 'Sound';
    var sound = this[soundKey];

    if (sound)
    {
        var markerKey = 'on' + state + 'SoundMarker';
        var marker = this[markerKey];

        sound.play(marker);
        return true;
    }
    else
    {
        return false;
    }

};

/**
* Sets the sounds to be played whenever this Button is interacted with. Sounds can be either full Sound objects, or markers pointing to a section of a Sound object.
* The most common forms of sounds are 'hover' effects and 'click' effects, which is why the order of the parameters is overSound then downSound.
*
* Call this function with no parameters to reset all sounds on this Button.
*
* @method Phaser.Button#setSounds
* @public
* @param {Phaser.Sound|Phaser.AudioSprite} [overSound] - Over Button Sound.
* @param {string} [overMarker] - Over Button Sound Marker.
* @param {Phaser.Sound|Phaser.AudioSprite} [downSound] - Down Button Sound.
* @param {string} [downMarker] - Down Button Sound Marker.
* @param {Phaser.Sound|Phaser.AudioSprite} [outSound] - Out Button Sound.
* @param {string} [outMarker] - Out Button Sound Marker.
* @param {Phaser.Sound|Phaser.AudioSprite} [upSound] - Up Button Sound.
* @param {string} [upMarker] - Up Button Sound Marker.
*/
Phaser.Button.prototype.setSounds = function (overSound, overMarker, downSound, downMarker, outSound, outMarker, upSound, upMarker) {

    this.setStateSound(STATE_OVER, overSound, overMarker);
    this.setStateSound(STATE_OUT, outSound, outMarker);
    this.setStateSound(STATE_DOWN, downSound, downMarker);
    this.setStateSound(STATE_UP, upSound, upMarker);

};

/**
* The Sound to be played when a Pointer moves over this Button.
*
* @method Phaser.Button#setOverSound
* @public
* @param {Phaser.Sound|Phaser.AudioSprite} sound - The Sound that will be played.
* @param {string} [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setOverSound = function (sound, marker) {

    this.setStateSound(STATE_OVER, sound, marker);

};

/**
* The Sound to be played when a Pointer moves out of this Button.
*
* @method Phaser.Button#setOutSound
* @public
* @param {Phaser.Sound|Phaser.AudioSprite} sound - The Sound that will be played.
* @param {string} [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setOutSound = function (sound, marker) {

    this.setStateSound(STATE_OUT, sound, marker);

};

/**
* The Sound to be played when a Pointer presses down on this Button.
*
* @method Phaser.Button#setDownSound
* @public
* @param {Phaser.Sound|Phaser.AudioSprite} sound - The Sound that will be played.
* @param {string} [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setDownSound = function (sound, marker) {

    this.setStateSound(STATE_DOWN, sound, marker);

};

/**
* The Sound to be played when a Pointer has pressed down and is released from this Button.
*
* @method Phaser.Button#setUpSound
* @public
* @param {Phaser.Sound|Phaser.AudioSprite} sound - The Sound that will be played.
* @param {string} [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setUpSound = function (sound, marker) {

    this.setStateSound(STATE_UP, sound, marker);

};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOverHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputOverHandler = function (sprite, pointer) {

    //  If the Pointer was only just released then we don't fire an over event
    if (pointer.justReleased())
    {
        return;
    }

    this.changeStateFrame(STATE_OVER);

    if (this.onOverMouseOnly && !pointer.isMouse)
    {
        return;
    }

    this.playStateSound(STATE_OVER);

    if (this.onInputOver)
    {
        this.onInputOver.dispatch(this, pointer);
    }

};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOutHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputOutHandler = function (sprite, pointer) {

    this.changeStateFrame(STATE_OUT);

    this.playStateSound(STATE_OUT);

    if (this.onInputOut)
    {
        this.onInputOut.dispatch(this, pointer);
    }
};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputDownHandler = function (sprite, pointer) {

    this.changeStateFrame(STATE_DOWN);

    this.playStateSound(STATE_DOWN);

    if (this.onInputDown)
    {
        this.onInputDown.dispatch(this, pointer);
    }
};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputUpHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputUpHandler = function (sprite, pointer, isOver) {

    this.playStateSound(STATE_UP);

    //  Input dispatched early, before state change (but after sound)
    if (this.onInputUp)
    {
        this.onInputUp.dispatch(this, pointer, isOver);
    }

    if (this.freezeFrames)
    {
        return;
    }

    if (this.forceOut)
    {
        this.changeStateFrame(STATE_OUT);
    }
    else
    {
        var changedUp = this.changeStateFrame(STATE_UP);
        if (!changedUp)
        {
            //  No Up frame to show..
            if (isOver)
            {
                this.changeStateFrame(STATE_OVER);
            }
            else
            {
                this.changeStateFrame(STATE_OUT);
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
* The SpriteBatch class is a really fast version of the DisplayObjectContainer built purely for speed, so use when you need a lot of sprites or particles.
* It's worth mentioning that by default sprite batches are used through-out the renderer, so you only really need to use a SpriteBatch if you have over
* 1000 sprites that all share the same texture (or texture atlas). It's also useful if running in Canvas mode and you have a lot of un-rotated or un-scaled
* Sprites as it skips all of the Canvas setTransform calls, which helps performance, especially on mobile devices.
*
* Please note that any Sprite that is part of a SpriteBatch will not have its bounds updated, so will fail checks such as outOfBounds.
*
* @class Phaser.SpriteBatch
* @extends Phaser.Group
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {Phaser.Group|Phaser.Sprite|null} parent - The parent Group, DisplayObject or DisplayObjectContainer that this Group will be added to. If `undefined` or `null` it will use game.world.
* @param {string} [name=group] - A name for this Group. Not used internally but useful for debugging.
* @param {boolean} [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
*/
Phaser.SpriteBatch = function (game, parent, name, addToStage) {

    if (parent === undefined || parent === null) { parent = game.world; }

    PIXI.SpriteBatch.call(this);

    Phaser.Group.call(this, game, parent, name, addToStage);

    /**
    * @property {number} type - Internal Phaser Type value.
    * @protected
    */
    this.type = Phaser.SPRITEBATCH;

};

Phaser.SpriteBatch.prototype = Phaser.Utils.extend(true, Phaser.SpriteBatch.prototype, Phaser.Group.prototype, PIXI.SpriteBatch.prototype);

Phaser.SpriteBatch.prototype.constructor = Phaser.SpriteBatch;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Create a new `Particle` object. Particles are extended Sprites that are emitted by a particle emitter such as Phaser.Particles.Arcade.Emitter.
* 
* @class Phaser.Particle
* @constructor
* @extends Phaser.Sprite
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} x - The x coordinate (in world space) to position the Particle at.
* @param {number} y - The y coordinate (in world space) to position the Particle at.
* @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the Particle during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param {string|number} frame - If this Particle is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
Phaser.Particle = function (game, x, y, key, frame) {

    Phaser.Sprite.call(this, game, x, y, key, frame);

    /**
    * @property {boolean} autoScale - If this Particle automatically scales this is set to true by Particle.setScaleData.
    * @protected
    */
    this.autoScale = false;

    /**
    * @property {array} scaleData - A reference to the scaleData array owned by the Emitter that emitted this Particle.
    * @protected
    */
    this.scaleData = null;

    /**
    * @property {number} _s - Internal cache var for tracking auto scale.
    * @private
    */
    this._s = 0;

    /**
    * @property {boolean} autoAlpha - If this Particle automatically changes alpha this is set to true by Particle.setAlphaData.
    * @protected
    */
    this.autoAlpha = false;

    /**
    * @property {array} alphaData - A reference to the alphaData array owned by the Emitter that emitted this Particle.
    * @protected
    */
    this.alphaData = null;

    /**
    * @property {number} _a - Internal cache var for tracking auto alpha.
    * @private
    */
    this._a = 0;

};

Phaser.Particle.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.Particle.prototype.constructor = Phaser.Particle;

/**
* Updates the Particle scale or alpha if autoScale and autoAlpha are set.
*
* @method Phaser.Particle#update
* @memberof Phaser.Particle
*/
Phaser.Particle.prototype.update = function() {

    if (this.autoScale)
    {
        this._s--;

        if (this._s)
        {
            this.scale.set(this.scaleData[this._s].x, this.scaleData[this._s].y);
        }
        else
        {
            this.autoScale = false;
        }
    }

    if (this.autoAlpha)
    {
        this._a--;

        if (this._a)
        {
            this.alpha = this.alphaData[this._a].v;
        }
        else
        {
            this.autoAlpha = false;
        }
    }

};

/**
* Called by the Emitter when this particle is emitted. Left empty for you to over-ride as required.
*
* @method Phaser.Particle#onEmit
* @memberof Phaser.Particle
*/
Phaser.Particle.prototype.onEmit = function() {
};

/**
* Called by the Emitter if autoAlpha has been enabled. Passes over the alpha ease data and resets the alpha counter.
*
* @method Phaser.Particle#setAlphaData
* @memberof Phaser.Particle
*/
Phaser.Particle.prototype.setAlphaData = function(data) {

    this.alphaData = data;
    this._a = data.length - 1;
    this.alpha = this.alphaData[this._a].v;
    this.autoAlpha = true;

};

/**
* Called by the Emitter if autoScale has been enabled. Passes over the scale ease data and resets the scale counter.
*
* @method Phaser.Particle#setScaleData
* @memberof Phaser.Particle
*/
Phaser.Particle.prototype.setScaleData = function(data) {

    this.scaleData = data;
    this._s = data.length - 1;
    this.scale.set(this.scaleData[this._s].x, this.scaleData[this._s].y);
    this.autoScale = true;

};

/**
* Resets the Particle. This places the Particle at the given x/y world coordinates and then
* sets alive, exists, visible and renderable all to true. Also resets the outOfBounds state and health values.
* If the Particle has a physics body that too is reset.
*
* @method Phaser.Particle#reset
* @memberof Phaser.Particle
* @param {number} x - The x coordinate (in world space) to position the Particle at.
* @param {number} y - The y coordinate (in world space) to position the Particle at.
* @param {number} [health=1] - The health to give the Particle.
* @return (Phaser.Particle) This instance.
*/
Phaser.Particle.prototype.reset = function(x, y, health) {

    Phaser.Component.Reset.prototype.reset.call(this, x, y, health);

    this.alpha = 1;
    this.scale.set(1);

    this.autoScale = false;
    this.autoAlpha = false;

    return this;

};
