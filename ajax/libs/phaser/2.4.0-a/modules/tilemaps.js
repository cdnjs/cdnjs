/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* An Image Collection is a special tileset containing mulitple images, with no slicing into each image.
*
* Image Collections are normally created automatically when Tiled data is loaded.
*
* @class Phaser.ImageCollection
* @constructor
* @param {string} name - The name of the image collection in the map data.
* @param {integer} firstgid - The first image index this image collection contains.
* @param {integer} [width=32] - Width of widest image (in pixels).
* @param {integer} [height=32] - Height of tallest image (in pixels).
* @param {integer} [margin=0] - The margin around all images in the collection (in pixels).
* @param {integer} [spacing=0] - The spacing between each image in the collection (in pixels).
* @param {object} [properties={}] - Custom Image Collection properties.
*/
Phaser.ImageCollection = function (name, firstgid, width, height, margin, spacing, properties) {

    if (width === undefined || width <= 0) { width = 32; }
    if (height === undefined || height <= 0) { height = 32; }
    if (margin === undefined) { margin = 0; }
    if (spacing === undefined) { spacing = 0; }

    /**
    * The name of the Image Collection.
    * @property {string} name
    */
    this.name = name;

    /**
    * The Tiled firstgid value.
    * This is the starting index of the first image index this Image Collection contains.
    * @property {integer} firstgid
    */
    this.firstgid = firstgid | 0;

    /**
    * The width of the widest image (in pixels).
    * @property {integer} imageWidth
    * @readonly
    */
    this.imageWidth = width | 0;

    /**
    * The height of the tallest image (in pixels).
    * @property {integer} imageHeight
    * @readonly
    */
    this.imageHeight = height | 0;

    /**
    * The margin around the images in the collection (in pixels).
    * Use `setSpacing` to change.
    * @property {integer} imageMarge
    * @readonly
    */
    // Modified internally
    this.imageMargin = margin | 0;

    /**
    * The spacing between each image in the collection (in pixels).
    * Use `setSpacing` to change.
    * @property {integer} imageSpacing
    * @readonly
    */
    this.imageSpacing = spacing | 0;

    /**
    * Image Collection-specific properties that are typically defined in the Tiled editor.
    * @property {object} properties
    */
    this.properties = properties || {};

    /**
    * The cached images that are a part of this collection.
    * @property {array} images
    * @readonly
    */
    // Modified internally
    this.images = [];

    /**
    * The total number of images in the image collection.
    * @property {integer} total
    * @readonly
    */
    // Modified internally
    this.total = 0;
};

Phaser.ImageCollection.prototype = {

    /**
    * Returns true if and only if this image collection contains the given image index.
    *
    * @method Phaser.ImageCollection#containsImageIndex
    * @param {integer} imageIndex - The image index to search for.
    * @return {boolean} True if this Image Collection contains the given index.
    */
    containsImageIndex: function (imageIndex) {

        return (
            imageIndex >= this.firstgid &&
            imageIndex < (this.firstgid + this.total)
        );

    },

    /**
    * Add an image to this Image Collection.
    *
    * @method Phaser.ImageCollection#addImage
    * @param {integer} gid - The gid of the image in the Image Collection.
    * @param {string} image - The the key of the image in the Image Collection and in the cache.
    */
    addImage: function (gid, image) {

        this.images.push({ gid: gid, image: image });
        this.total++;

    }

};

Phaser.ImageCollection.prototype.constructor = Phaser.ImageCollection;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Tile is a representation of a single tile within the Tilemap.
*
* @class Phaser.Tile
* @constructor
* @param {object} layer - The layer in the Tilemap data that this tile belongs to.
* @param {number} index - The index of this tile type in the core map data.
* @param {number} x - The x coordinate of this tile.
* @param {number} y - The y coordinate of this tile.
* @param {number} width - Width of the tile.
* @param {number} height - Height of the tile.
*/
Phaser.Tile = function (layer, index, x, y, width, height) {

    /**
    * @property {object} layer - The layer in the Tilemap data that this tile belongs to.
    */
    this.layer = layer;

    /**
    * @property {number} index - The index of this tile within the map data corresponding to the tileset, or -1 if this represents a blank/null tile.
    */
    this.index = index;

    /**
    * @property {number} x - The x map coordinate of this tile.
    */
    this.x = x;

    /**
    * @property {number} y - The y map coordinate of this tile.
    */
    this.y = y;
    
    /**
    * @property {number} rotation - The rotation angle of this tile.
    */
    this.rotation = 0;

    /**
    * @property {boolean} flipped - Whether this tile is flipped (mirrored) or not.
    */
    this.flipped = false;
    
    /**
    * @property {number} x - The x map coordinate of this tile.
    */
    this.worldX = x * width;

    /**
    * @property {number} y - The y map coordinate of this tile.
    */
    this.worldY = y * height;

    /**
    * @property {number} width - The width of the tile in pixels.
    */
    this.width = width;

    /**
    * @property {number} height - The height of the tile in pixels.
    */
    this.height = height;

    /**
    * @property {number} width - The width of the tile in pixels.
    */
    this.centerX = Math.abs(width / 2);

    /**
    * @property {number} height - The height of the tile in pixels.
    */
    this.centerY = Math.abs(height / 2);

    /**
    * @property {number} alpha - The alpha value at which this tile is drawn to the canvas.
    */
    this.alpha = 1;

    /**
    * @property {object} properties - Tile specific properties.
    */
    this.properties = {};

    /**
    * @property {boolean} scanned - Has this tile been walked / turned into a poly?
    */
    this.scanned = false;

    /**
    * @property {boolean} faceTop - Is the top of this tile an interesting edge?
    */
    this.faceTop = false;

    /**
    * @property {boolean} faceBottom - Is the bottom of this tile an interesting edge?
    */
    this.faceBottom = false;

    /**
    * @property {boolean} faceLeft - Is the left of this tile an interesting edge?
    */
    this.faceLeft = false;

    /**
    * @property {boolean} faceRight - Is the right of this tile an interesting edge?
    */
    this.faceRight = false;

    /**
    * @property {boolean} collideLeft - Indicating collide with any object on the left.
    * @default
    */
    this.collideLeft = false;

    /**
    * @property {boolean} collideRight - Indicating collide with any object on the right.
    * @default
    */
    this.collideRight = false;

    /**
    * @property {boolean} collideUp - Indicating collide with any object on the top.
    * @default
    */
    this.collideUp = false;

    /**
    * @property {boolean} collideDown - Indicating collide with any object on the bottom.
    * @default
    */
    this.collideDown = false;

    /**
    * @property {function} collisionCallback - Tile collision callback.
    * @default
    */
    this.collisionCallback = null;

    /**
    * @property {object} collisionCallbackContext - The context in which the collision callback will be called.
    * @default
    */
    this.collisionCallbackContext = this;

};

Phaser.Tile.prototype = {

    /**
    * Check if the given x and y world coordinates are within this Tile.
    *
    * @method Phaser.Tile#containsPoint
    * @param {number} x - The x coordinate to test.
    * @param {number} y - The y coordinate to test.
    * @return {boolean} True if the coordinates are within this Tile, otherwise false.
    */
    containsPoint: function (x, y) {

        return !(x < this.worldX || y < this.worldY || x > this.right || y > this.bottom);

    },

    /**
    * Check for intersection with this tile.
    *
    * @method Phaser.Tile#intersects
    * @param {number} x - The x axis in pixels.
    * @param {number} y - The y axis in pixels.
    * @param {number} right - The right point.
    * @param {number} bottom - The bottom point.
    */
    intersects: function (x, y, right, bottom) {

        if (right <= this.worldX)
        {
            return false;
        }

        if (bottom <= this.worldY)
        {
            return false;
        }

        if (x >= this.worldX + this.width)
        {
            return false;
        }

        if (y >= this.worldY + this.height)
        {
            return false;
        }

        return true;

    },

    /**
    * Set a callback to be called when this tile is hit by an object.
    * The callback must true true for collision processing to take place.
    *
    * @method Phaser.Tile#setCollisionCallback
    * @param {function} callback - Callback function.
    * @param {object} context - Callback will be called within this context.
    */
    setCollisionCallback: function (callback, context) {

        this.collisionCallback = callback;
        this.collisionCallbackContext = context;

    },

    /**
    * Clean up memory.
    *
    * @method Phaser.Tile#destroy
    */
    destroy: function () {

        this.collisionCallback = null;
        this.collisionCallbackContext = null;
        this.properties = null;

    },

    /**
    * Sets the collision flags for each side of this tile and updates the interesting faces list.
    *
    * @method Phaser.Tile#setCollision
    * @param {boolean} left - Indicating collide with any object on the left.
    * @param {boolean} right - Indicating collide with any object on the right.
    * @param {boolean} up - Indicating collide with any object on the top.
    * @param {boolean} down - Indicating collide with any object on the bottom.
    */
    setCollision: function (left, right, up, down) {

        this.collideLeft = left;
        this.collideRight = right;
        this.collideUp = up;
        this.collideDown = down;

        this.faceLeft = left;
        this.faceRight = right;
        this.faceTop = up;
        this.faceBottom = down;

    },

    /**
    * Reset collision status flags.
    *
    * @method Phaser.Tile#resetCollision
    */
    resetCollision: function () {

        this.collideLeft = false;
        this.collideRight = false;
        this.collideUp = false;
        this.collideDown = false;

        this.faceTop = false;
        this.faceBottom = false;
        this.faceLeft = false;
        this.faceRight = false;

    },

    /**
    * Is this tile interesting?
    *
    * @method Phaser.Tile#isInteresting
    * @param {boolean} collides - If true will check any collides value.
    * @param {boolean} faces - If true will check any face value.
    * @return {boolean} True if the Tile is interesting, otherwise false.
    */
    isInteresting: function (collides, faces) {

        if (collides && faces)
        {
            //  Does this tile have any collide flags OR interesting face?
            return (this.collideLeft || this.collideRight || this.collideUp || this.collideDown || this.faceTop || this.faceBottom || this.faceLeft || this.faceRight || this.collisionCallback);
        }
        else if (collides)
        {
            //  Does this tile collide?
            return (this.collideLeft || this.collideRight || this.collideUp || this.collideDown);
        }
        else if (faces)
        {
            //  Does this tile have an interesting face?
            return (this.faceTop || this.faceBottom || this.faceLeft || this.faceRight);
        }

        return false;

    },

    /**
    * Copies the tile data and properties from the given tile to this tile.
    *
    * @method Phaser.Tile#copy
    * @param {Phaser.Tile} tile - The tile to copy from.
    */
    copy: function (tile) {

        this.index = tile.index;
        this.alpha = tile.alpha;
        this.properties = tile.properties;

        this.collideUp = tile.collideUp;
        this.collideDown = tile.collideDown;
        this.collideLeft = tile.collideLeft;
        this.collideRight = tile.collideRight;

        this.collisionCallback = tile.collisionCallback;
        this.collisionCallbackContext = tile.collisionCallbackContext;

    }

};

Phaser.Tile.prototype.constructor = Phaser.Tile;

/**
* @name Phaser.Tile#collides
* @property {boolean} collides - True if this tile can collide on any of its faces.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "collides", {

    get: function () {
        return (this.collideLeft || this.collideRight || this.collideUp || this.collideDown);
    }

});

/**
* @name Phaser.Tile#canCollide
* @property {boolean} canCollide - True if this tile can collide on any of its faces or has a collision callback set.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "canCollide", {

    get: function () {
        return (this.collideLeft || this.collideRight || this.collideUp || this.collideDown || this.collisionCallback);
    }

});

/**
* @name Phaser.Tile#left
* @property {number} left - The x value in pixels.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "left", {

    get: function () {
        return this.worldX;
    }

});

/**
* @name Phaser.Tile#right
* @property {number} right - The sum of the x and width properties.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "right", {

    get: function () {
        return this.worldX + this.width;
    }

});

/**
* @name Phaser.Tile#top
* @property {number} top - The y value.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "top", {

    get: function () {
        return this.worldY;
    }

});

/**
* @name Phaser.Tile#bottom
* @property {number} bottom - The sum of the y and height properties.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "bottom", {

    get: function () {
        return this.worldY + this.height;
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Creates a new Phaser.Tilemap object. The map can either be populated with data from a Tiled JSON file or from a CSV file.
* To do this pass the Cache key as the first parameter. When using Tiled data you need only provide the key.
* When using CSV data you must provide the key and the tileWidth and tileHeight parameters.
* If creating a blank tilemap to be populated later, you can either specify no parameters at all and then use `Tilemap.create` or pass the map and tile dimensions here.
* Note that all Tilemaps use a base tile size to calculate dimensions from, but that a TilemapLayer may have its own unique tile size that overrides it.
* A Tile map is rendered to the display using a TilemapLayer. It is not added to the display list directly itself.
* A map may have multiple layers. You can perform operations on the map data such as copying, pasting, filling and shuffling the tiles around.
*
* @class Phaser.Tilemap
* @constructor
* @param {Phaser.Game} game - Game reference to the currently running game.
* @param {string} [key] - The key of the tilemap data as stored in the Cache. If you're creating a blank map either leave this parameter out or pass `null`.
* @param {number} [tileWidth=32] - The pixel width of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
* @param {number} [tileHeight=32] - The pixel height of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
* @param {number} [width=10] - The width of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
* @param {number} [height=10] - The height of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
*/
Phaser.Tilemap = function (game, key, tileWidth, tileHeight, width, height) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property {string} key - The key of this map data in the Phaser.Cache.
    */
    this.key = key;

    var data = Phaser.TilemapParser.parse(this.game, key, tileWidth, tileHeight, width, height);

    if (data === null)
    {
        return;
    }

    /**
    * @property {number} width - The width of the map (in tiles).
    */
    this.width = data.width;

    /**
    * @property {number} height - The height of the map (in tiles).
    */
    this.height = data.height;

    /**
    * @property {number} tileWidth - The base width of the tiles in the map (in pixels).
    */
    this.tileWidth = data.tileWidth;

    /**
    * @property {number} tileHeight - The base height of the tiles in the map (in pixels).
    */
    this.tileHeight = data.tileHeight;

    /**
    * @property {string} orientation - The orientation of the map data (as specified in Tiled), usually 'orthogonal'.
    */
    this.orientation = data.orientation;

    /**
    * @property {number} format - The format of the map data, either Phaser.Tilemap.CSV or Phaser.Tilemap.TILED_JSON.
    */
    this.format = data.format;

    /**
    * @property {number} version - The version of the map data (as specified in Tiled, usually 1).
    */
    this.version = data.version;

    /**
    * @property {object} properties - Map specific properties as specified in Tiled.
    */
    this.properties = data.properties;

    /**
    * @property {number} widthInPixels - The width of the map in pixels based on width * tileWidth.
    */
    this.widthInPixels = data.widthInPixels;

    /**
    * @property {number} heightInPixels - The height of the map in pixels based on height * tileHeight.
    */
    this.heightInPixels = data.heightInPixels;

    /**
    * @property {array} layers - An array of Tilemap layer data.
    */
    this.layers = data.layers;

    /**
    * @property {array} tilesets - An array of Tilesets.
    */
    this.tilesets = data.tilesets;
    
    /**
    * @property {array} imagecollections - An array of Image Collections.
    */
    this.imagecollections = data.imagecollections;

    /**
    * @property {array} tiles - The super array of Tiles.
    */
    this.tiles = data.tiles;

    /**
    * @property {array} objects - An array of Tiled Object Layers.
    */
    this.objects = data.objects;

    /**
    * @property {array} collideIndexes - An array of tile indexes that collide.
    */
    this.collideIndexes = [];

    /**
    * @property {array} collision - An array of collision data (polylines, etc).
    */
    this.collision = data.collision;

    /**
    * @property {array} images - An array of Tiled Image Layers.
    */
    this.images = data.images;

    /**
    * @property {number} currentLayer - The current layer.
    */
    this.currentLayer = 0;

    /**
    * @property {array} debugMap - Map data used for debug values only.
    */
    this.debugMap = [];

    /**
    * @property {array} _results - Internal var.
    * @private
    */
    this._results = [];

    /**
    * @property {number} _tempA - Internal var.
    * @private
    */
    this._tempA = 0;

    /**
    * @property {number} _tempB - Internal var.
    * @private
    */
    this._tempB = 0;

};

/**
* @constant
* @type {number}
*/
Phaser.Tilemap.CSV = 0;

/**
* @constant
* @type {number}
*/
Phaser.Tilemap.TILED_JSON = 1;

/**
* @constant
* @type {number}
*/
Phaser.Tilemap.NORTH = 0;

/**
* @constant
* @type {number}
*/
Phaser.Tilemap.EAST = 1;

/**
* @constant
* @type {number}
*/
Phaser.Tilemap.SOUTH = 2;

/**
* @constant
* @type {number}
*/
Phaser.Tilemap.WEST = 3;

Phaser.Tilemap.prototype = {

    /**
    * Creates an empty map of the given dimensions and one blank layer. If layers already exist they are erased.
    *
    * @method Phaser.Tilemap#create
    * @param {string} name - The name of the default layer of the map.
    * @param {number} width - The width of the map in tiles.
    * @param {number} height - The height of the map in tiles.
    * @param {number} tileWidth - The width of the tiles the map uses for calculations.
    * @param {number} tileHeight - The height of the tiles the map uses for calculations.
    * @param {Phaser.Group} [group] - Optional Group to add the layer to. If not specified it will be added to the World group.
    * @return {Phaser.TilemapLayer} The TilemapLayer object. This is an extension of Phaser.Image and can be moved around the display list accordingly.
    */
    create: function (name, width, height, tileWidth, tileHeight, group) {

        if (group === undefined) { group = this.game.world; }

        this.width = width;
        this.height = height;

        this.setTileSize(tileWidth, tileHeight);

        this.layers.length = 0;

        return this.createBlankLayer(name, width, height, tileWidth, tileHeight, group);

    },

    /**
    * Sets the base tile size for the map.
    *
    * @method Phaser.Tilemap#setTileSize
    * @param {number} tileWidth - The width of the tiles the map uses for calculations.
    * @param {number} tileHeight - The height of the tiles the map uses for calculations.
    */
    setTileSize: function (tileWidth, tileHeight) {

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.widthInPixels = this.width * tileWidth;
        this.heightInPixels = this.height * tileHeight;

    },

    /**
    * Adds an image to the map to be used as a tileset. A single map may use multiple tilesets.
    * Note that the tileset name can be found in the JSON file exported from Tiled, or in the Tiled editor.
    *
    * @method Phaser.Tilemap#addTilesetImage
    * @param {string} tileset - The name of the tileset as specified in the map data.
    * @param {string|Phaser.BitmapData} [key] - The key of the Phaser.Cache image used for this tileset.
    *     If `undefined` or `null` it will look for an image with a key matching the tileset parameter.
    *     You can also pass in a BitmapData which can be used instead of an Image.
    * @param {number} [tileWidth=32] - The width of the tiles in the Tileset Image. If not given it will default to the map.tileWidth value, if that isn't set then 32.
    * @param {number} [tileHeight=32] - The height of the tiles in the Tileset Image. If not given it will default to the map.tileHeight value, if that isn't set then 32.
    * @param {number} [tileMargin=0] - The width of the tiles in the Tileset Image. If not given it will default to the map.tileWidth value.
    * @param {number} [tileSpacing=0] - The height of the tiles in the Tileset Image. If not given it will default to the map.tileHeight value.
    * @param {number} [gid=0] - If adding multiple tilesets to a blank/dynamic map, specify the starting GID the set will use here.
    * @return {Phaser.Tileset} Returns the Tileset object that was created or updated, or null if it failed.
    */
    addTilesetImage: function (tileset, key, tileWidth, tileHeight, tileMargin, tileSpacing, gid) {

        if (tileset === undefined) { return null; }
        if (tileWidth === undefined) { tileWidth = this.tileWidth; }
        if (tileHeight === undefined) { tileHeight = this.tileHeight; }
        if (tileMargin === undefined) { tileMargin = 0; }
        if (tileSpacing === undefined) { tileSpacing = 0; }
        if (gid === undefined) { gid = 0; }

        //  In-case we're working from a blank map
        if (tileWidth === 0)
        {
            tileWidth = 32;
        }

        if (tileHeight === 0)
        {
            tileHeight = 32;
        }

        var img = null;

        if (key === undefined || key === null)
        {
            key = tileset;
        }

        if (key instanceof Phaser.BitmapData)
        {
            img = key.canvas;
        }
        else
        {
            if (!this.game.cache.checkImageKey(key))
            {
                console.warn('Phaser.Tilemap.addTilesetImage: Invalid image key given: "' + key + '"');
                return null;
            }

            img = this.game.cache.getImage(key);
        }

        var idx = this.getTilesetIndex(tileset);

        if (idx === null && this.format === Phaser.Tilemap.TILED_JSON)
        {
            console.warn('Phaser.Tilemap.addTilesetImage: No data found in the JSON matching the tileset name: "' + key + '"');
            return null;
        }

        if (this.tilesets[idx])
        {
            this.tilesets[idx].setImage(img);
            return this.tilesets[idx];
        }
        else
        {
            var newSet = new Phaser.Tileset(tileset, gid, tileWidth, tileHeight, tileMargin, tileSpacing, {});

            newSet.setImage(img);

            this.tilesets.push(newSet);

            var i = this.tilesets.length - 1;
            var x = tileMargin;
            var y = tileMargin;

            var count = 0;
            var countX = 0;
            var countY = 0;

            for (var t = gid; t < gid + newSet.total; t++)
            {
                this.tiles[t] = [x, y, i];

                x += tileWidth + tileSpacing;

                count++;

                if (count === newSet.total)
                {
                    break;
                }

                countX++;

                if (countX === newSet.columns)
                {
                    x = tileMargin;
                    y += tileHeight + tileSpacing;

                    countX = 0;
                    countY++;

                    if (countY === newSet.rows)
                    {
                        break;
                    }
                }
            }

            return newSet;

        }

        return null;

    },

    /**
    * Creates a Sprite for every object matching the given gid in the map data. You can optionally specify the group that the Sprite will be created in. If none is
    * given it will be created in the World. All properties from the map data objectgroup are copied across to the Sprite, so you can use this as an easy way to
    * configure Sprite properties from within the map editor. For example giving an object a property of alpha: 0.5 in the map editor will duplicate that when the
    * Sprite is created. You could also give it a value like: body.velocity.x: 100 to set it moving automatically.
    *
    * @method Phaser.Tilemap#createFromObjects
    * @param {string} name - The name of the Object Group to create Sprites from.
    * @param {number} gid - The layer array index value, or if a string is given the layer name within the map data.
    * @param {string} key - The Game.cache key of the image that this Sprite will use.
    * @param {number|string} [frame] - If the Sprite image contains multiple frames you can specify which one to use here.
    * @param {boolean} [exists=true] - The default exists state of the Sprite.
    * @param {boolean} [autoCull=false] - The default autoCull state of the Sprite. Sprites that are autoCulled are culled from the camera if out of its range.
    * @param {Phaser.Group} [group=Phaser.World] - Group to add the Sprite to. If not specified it will be added to the World group.
    * @param {object} [CustomClass=Phaser.Sprite] - If you wish to create your own class, rather than Phaser.Sprite, pass the class here. Your class must extend Phaser.Sprite and have the same constructor parameters.
    * @param {boolean} [adjustY=true] - By default the Tiled map editor uses a bottom-left coordinate system. Phaser uses top-left. So most objects will appear too low down. This parameter moves them up by their height.
    */
    createFromObjects: function (name, gid, key, frame, exists, autoCull, group, CustomClass, adjustY) {

        if (exists === undefined) { exists = true; }
        if (autoCull === undefined) { autoCull = false; }
        if (group === undefined) { group = this.game.world; }
        if (CustomClass === undefined) { CustomClass = Phaser.Sprite; }
        if (adjustY === undefined) { adjustY = true; }

        if (!this.objects[name])
        {
            console.warn('Tilemap.createFromObjects: Invalid objectgroup name given: ' + name);
            return;
        }

        var sprite;
        var found = false;

        for (var i = 0, len = this.objects[name].length; i < len; i++)
        {
            if (typeof this.objects[name][i].gid !== 'undefined' && typeof gid === 'number')
            {
                if (this.objects[name][i].gid === gid)
                {
                    found = true;
                }
            }

            if (typeof this.objects[name][i].id !== 'undefined' && typeof gid === 'number')
            {
                if (this.objects[name][i].id === gid)
                {
                    found = true;
                }
            }

            if (typeof this.objects[name][i].name !== 'undefined' && typeof gid === 'string')
            {
                if (this.objects[name][i].name === gid)
                {
                    found = true;
                }
            }

            if (found)
            {
                sprite = new CustomClass(this.game, this.objects[name][i].x, this.objects[name][i].y, key, frame);

                sprite.name = this.objects[name][i].name;
                sprite.visible = this.objects[name][i].visible;
                sprite.autoCull = autoCull;
                sprite.exists = exists;

                sprite.width = this.objects[name][i].width;
                sprite.height = this.objects[name][i].height;

                if (this.objects[name][i].rotation)
                {
                    sprite.angle = this.objects[name][i].rotation;
                }

                if (adjustY)
                {
                    sprite.y -= sprite.height;
                }

                group.add(sprite);

                for (var property in this.objects[name][i].properties)
                {
                    group.set(sprite, property, this.objects[name][i].properties[property], false, false, 0, true);
                }
            }
        }

    },

    /**
    * Creates a Sprite for every object matching the given tile indexes in the map data.
    * You can specify the group that the Sprite will be created in. If none is given it will be created in the World.
    * You can optional specify if the tile will be replaced with another after the Sprite is created. This is useful if you want to lay down special 
    * tiles in a level that are converted to Sprites, but want to replace the tile itself with a floor tile or similar once converted.
    *
    * @method Phaser.Tilemap#createFromTiles
    * @param {integer|Array} tiles - The tile index, or array of indexes, to create Sprites from.
    * @param {integer|Array} replacements - The tile index, or array of indexes, to change a converted tile to. Set to `null` to not change.
    * @param {string} key - The Game.cache key of the image that this Sprite will use.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on.
    * @param {Phaser.Group} [group=Phaser.World] - Group to add the Sprite to. If not specified it will be added to the World group.
    * @param {object} [properties] - An object that contains the default properties for your newly created Sprite. This object will be iterated and any matching Sprite property will be set.
    * @return {integer} The number of Sprites that were created.
    */
    createFromTiles: function (tiles, replacements, key, layer, group, properties) {

        if (typeof tiles === 'number') { tiles = [tiles]; }

        if (replacements === undefined || replacements === null)
        {
            replacements = [];
        }
        else if (typeof replacements === 'number')
        {
            replacements = [replacements];
        }

        layer = this.getLayer(layer);

        if (group === undefined) { group = this.game.world; }
        if (properties === undefined) { properties = {}; }

        if (properties.customClass === undefined)
        {
            properties.customClass = Phaser.Sprite;
        }

        if (properties.adjustY === undefined)
        {
            properties.adjustY = true;
        }

        var lw = this.layers[layer].width;
        var lh = this.layers[layer].height;

        this.copy(0, 0, lw, lh, layer);

        if (this._results.length < 2)
        {
            return 0;
        }

        var total = 0;
        var sprite;

        for (var i = 1, len = this._results.length; i < len; i++)
        {
            if (tiles.indexOf(this._results[i].index) !== -1)
            {
                sprite = new properties.customClass(this.game, this._results[i].worldX, this._results[i].worldY, key);

                for (var property in properties)
                {
                    sprite[property] = properties[property];
                }

                group.add(sprite);
                total++;
            }

        }

        if (replacements.length === 1)
        {
            //  Assume 1 replacement for all types of tile given
            for (i = 0; i < tiles.length; i++)
            {
                this.replace(tiles[i], replacements[0], 0, 0, lw, lh, layer);
            }
        }
        else if (replacements.length > 1)
        {
            //  Assume 1 for 1 mapping
            for (i = 0; i < tiles.length; i++)
            {
                this.replace(tiles[i], replacements[i], 0, 0, lw, lh, layer);
            }
        }

        return total;

    },

    /**
    * Creates a new TilemapLayer object. By default TilemapLayers are fixed to the camera.
    * The `layer` parameter is important. If you've created your map in Tiled then you can get this by looking in Tiled and looking at the Layer name.
    * Or you can open the JSON file it exports and look at the layers[].name value. Either way it must match.
    * If you wish to create a blank layer to put your own tiles on then see Tilemap.createBlankLayer.
    *
    * @method Phaser.Tilemap#createLayer
    * @param {number|string} layer - The layer array index value, or if a string is given the layer name, within the map data that this TilemapLayer represents.
    * @param {number} [width] - The rendered width of the layer, should never be wider than Game.width. If not given it will be set to Game.width.
    * @param {number} [height] - The rendered height of the layer, should never be wider than Game.height. If not given it will be set to Game.height.
    * @param {Phaser.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return {Phaser.TilemapLayer} The TilemapLayer object. This is an extension of Phaser.Sprite and can be moved around the display list accordingly.
    */
    createLayer: function (layer, width, height, group) {

        //  Add Buffer support for the left of the canvas

        if (width === undefined) { width = this.game.width; }
        if (height === undefined) { height = this.game.height; }
        if (group === undefined) { group = this.game.world; }

        var index = layer;

        if (typeof layer === 'string')
        {
            index = this.getLayerIndex(layer);
        }

        if (index === null || index > this.layers.length)
        {
            console.warn('Tilemap.createLayer: Invalid layer ID given: ' + index);
            return;
        }

        return group.add(new Phaser.TilemapLayer(this.game, this, index, width, height));

    },

    /**
    * Creates a new and empty layer on this Tilemap. By default TilemapLayers are fixed to the camera.
    *
    * @method Phaser.Tilemap#createBlankLayer
    * @param {string} name - The name of this layer. Must be unique within the map.
    * @param {number} width - The width of the layer in tiles.
    * @param {number} height - The height of the layer in tiles.
    * @param {number} tileWidth - The width of the tiles the layer uses for calculations.
    * @param {number} tileHeight - The height of the tiles the layer uses for calculations.
    * @param {Phaser.Group} [group] - Optional Group to add the layer to. If not specified it will be added to the World group.
    * @return {Phaser.TilemapLayer} The TilemapLayer object. This is an extension of Phaser.Image and can be moved around the display list accordingly.
    */
    createBlankLayer: function (name, width, height, tileWidth, tileHeight, group) {

        if (group === undefined) { group = this.game.world; }

        if (this.getLayerIndex(name) !== null)
        {
            console.warn('Tilemap.createBlankLayer: Layer with matching name already exists');
            return;
        }

        var layer = {

            name: name,
            x: 0,
            y: 0,
            width: width,
            height: height,
            widthInPixels: width * tileWidth,
            heightInPixels: height * tileHeight,
            alpha: 1,
            visible: true,
            properties: {},
            indexes: [],
            callbacks: [],
            bodies: [],
            data: null

        };

        var row;
        var output = [];

        for (var y = 0; y < height; y++)
        {
            row = [];

            for (var x = 0; x < width; x++)
            {
                // row.push(null);
                row.push(new Phaser.Tile(layer, -1, x, y, tileWidth, tileHeight));
            }

            output.push(row);
        }

        layer.data = output;

        this.layers.push(layer);

        this.currentLayer = this.layers.length - 1;

        var w = layer.widthInPixels;
        var h = layer.heightInPixels;

        if (w > this.game.width)
        {
            w = this.game.width;
        }

        if (h > this.game.height)
        {
            h = this.game.height;
        }

        var output = new Phaser.TilemapLayer(this.game, this, this.layers.length - 1, w, h);
        output.name = name;

        return group.add(output);

    },

    /**
    * Gets the layer index based on the layers name.
    *
    * @method Phaser.Tilemap#getIndex
    * @protected
    * @param {array} location - The local array to search.
    * @param {string} name - The name of the array element to get.
    * @return {number} The index of the element in the array, or null if not found.
    */
    getIndex: function (location, name) {

        for (var i = 0; i < location.length; i++)
        {
            if (location[i].name === name)
            {
                return i;
            }
        }

        return null;

    },

    /**
    * Gets the layer index based on its name.
    *
    * @method Phaser.Tilemap#getLayerIndex
    * @param {string} name - The name of the layer to get.
    * @return {number} The index of the layer in this tilemap, or null if not found.
    */
    getLayerIndex: function (name) {

        return this.getIndex(this.layers, name);

    },

    /**
    * Gets the tileset index based on its name.
    *
    * @method Phaser.Tilemap#getTilesetIndex
    * @param {string} name - The name of the tileset to get.
    * @return {number} The index of the tileset in this tilemap, or null if not found.
    */
    getTilesetIndex: function (name) {

        return this.getIndex(this.tilesets, name);

    },

    /**
    * Gets the image index based on its name.
    *
    * @method Phaser.Tilemap#getImageIndex
    * @param {string} name - The name of the image to get.
    * @return {number} The index of the image in this tilemap, or null if not found.
    */
    getImageIndex: function (name) {

        return this.getIndex(this.images, name);

    },

    /**
    * Gets the object index based on its name.
    *
    * @method Phaser.Tilemap#getObjectIndex
    * @param {string} name - The name of the object to get.
    * @return {number} The index of the object in this tilemap, or null if not found.
    */
    getObjectIndex: function (name) {

        return this.getIndex(this.objects, name);

    },

    /**
    * Sets a global collision callback for the given tile index within the layer. This will affect all tiles on this layer that have the same index.
    * If a callback is already set for the tile index it will be replaced. Set the callback to null to remove it.
    * If you want to set a callback for a tile at a specific location on the map then see setTileLocationCallback.
    *
    * @method Phaser.Tilemap#setTileIndexCallback
    * @param {number|array} indexes - Either a single tile index, or an array of tile indexes to have a collision callback set for.
    * @param {function} callback - The callback that will be invoked when the tile is collided with.
    * @param {object} callbackContext - The context under which the callback is called.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on. If not given will default to this.currentLayer.
    */
    setTileIndexCallback: function (indexes, callback, callbackContext, layer) {

        layer = this.getLayer(layer);

        if (typeof indexes === 'number')
        {
            //  This may seem a bit wasteful, because it will cause empty array elements to be created, but the look-up cost is much
            //  less than having to iterate through the callbacks array hunting down tile indexes each frame, so I'll take the small memory hit.
            this.layers[layer].callbacks[indexes] = { callback: callback, callbackContext: callbackContext };
        }
        else
        {
            for (var i = 0, len = indexes.length; i < len; i++)
            {
                this.layers[layer].callbacks[indexes[i]] = { callback: callback, callbackContext: callbackContext };
            }
        }

    },

    /**
    * Sets a global collision callback for the given map location within the layer. This will affect all tiles on this layer found in the given area.
    * If a callback is already set for the tile index it will be replaced. Set the callback to null to remove it.
    * If you want to set a callback for a tile at a specific location on the map then see setTileLocationCallback.
    *
    * @method Phaser.Tilemap#setTileLocationCallback
    * @param {number} x - X position of the top left of the area to copy (given in tiles, not pixels)
    * @param {number} y - Y position of the top left of the area to copy (given in tiles, not pixels)
    * @param {number} width - The width of the area to copy (given in tiles, not pixels)
    * @param {number} height - The height of the area to copy (given in tiles, not pixels)
    * @param {function} callback - The callback that will be invoked when the tile is collided with.
    * @param {object} callbackContext - The context under which the callback is called.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on. If not given will default to this.currentLayer.
    */
    setTileLocationCallback: function (x, y, width, height, callback, callbackContext, layer) {

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        {
            return;
        }

        for (var i = 1; i < this._results.length; i++)
        {
            this._results[i].setCollisionCallback(callback, callbackContext);
        }

    },

    /**
    * Sets collision the given tile or tiles. You can pass in either a single numeric index or an array of indexes: [ 2, 3, 15, 20].
    * The `collides` parameter controls if collision will be enabled (true) or disabled (false).
    *
    * @method Phaser.Tilemap#setCollision
    * @param {number|array} indexes - Either a single tile index, or an array of tile IDs to be checked for collision.
    * @param {boolean} [collides=true] - If true it will enable collision. If false it will clear collision.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on. If not given will default to this.currentLayer.
    * @param {boolean} [recalculate=true] - Recalculates the tile faces after the update.
    */
    setCollision: function (indexes, collides, layer, recalculate) {

        if (collides === undefined) { collides = true; }
        if (recalculate === undefined) { recalculate = true; }
        
        layer = this.getLayer(layer);

        if (typeof indexes === 'number')
        {
            return this.setCollisionByIndex(indexes, collides, layer, true);
        }
        else if (Array.isArray(indexes))
        {
            //  Collide all of the IDs given in the indexes array
            for (var i = 0; i < indexes.length; i++)
            {
                this.setCollisionByIndex(indexes[i], collides, layer, false);
            }

            if (recalculate)
            {
                //  Now re-calculate interesting faces
                this.calculateFaces(layer);
            }
        }

    },

    /**
    * Sets collision on a range of tiles where the tile IDs increment sequentially.
    * Calling this with a start value of 10 and a stop value of 14 would set collision for tiles 10, 11, 12, 13 and 14.
    * The `collides` parameter controls if collision will be enabled (true) or disabled (false).
    *
    * @method Phaser.Tilemap#setCollisionBetween
    * @param {number} start - The first index of the tile to be set for collision.
    * @param {number} stop - The last index of the tile to be set for collision.
    * @param {boolean} [collides=true] - If true it will enable collision. If false it will clear collision.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on. If not given will default to this.currentLayer.
    * @param {boolean} [recalculate=true] - Recalculates the tile faces after the update.
    */
    setCollisionBetween: function (start, stop, collides, layer, recalculate) {

        if (collides === undefined) { collides = true; }
        if (recalculate === undefined) { recalculate = true; }
        
        layer = this.getLayer(layer);

        if (start > stop)
        {
            return;
        }

        for (var index = start; index <= stop; index++)
        {
            this.setCollisionByIndex(index, collides, layer, false);
        }

        if (recalculate)
        {
            //  Now re-calculate interesting faces
            this.calculateFaces(layer);
        }

    },

    /**
    * Sets collision on all tiles in the given layer, except for the IDs of those in the given array.
    * The `collides` parameter controls if collision will be enabled (true) or disabled (false).
    *
    * @method Phaser.Tilemap#setCollisionByExclusion
    * @param {array} indexes - An array of the tile IDs to not be counted for collision.
    * @param {boolean} [collides=true] - If true it will enable collision. If false it will clear collision.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on. If not given will default to this.currentLayer.
    * @param {boolean} [recalculate=true] - Recalculates the tile faces after the update.
    */
    setCollisionByExclusion: function (indexes, collides, layer, recalculate) {

        if (collides === undefined) { collides = true; }
        if (recalculate === undefined) { recalculate = true; }
        
        layer = this.getLayer(layer);

        //  Collide everything, except the IDs given in the indexes array
        for (var i = 0, len = this.tiles.length; i < len; i++)
        {
            if (indexes.indexOf(i) === -1)
            {
                this.setCollisionByIndex(i, collides, layer, false);
            }
        }

        if (recalculate)
        {
            //  Now re-calculate interesting faces
            this.calculateFaces(layer);
        }

    },

    /**
    * Sets collision values on a tile in the set.
    * You shouldn't usually call this method directly, instead use setCollision, setCollisionBetween or setCollisionByExclusion.
    *
    * @method Phaser.Tilemap#setCollisionByIndex
    * @protected
    * @param {number} index - The index of the tile on the layer.
    * @param {boolean} [collides=true] - If true it will enable collision on the tile. If false it will clear collision values from the tile.
    * @param {number} [layer] - The layer to operate on. If not given will default to this.currentLayer.
    * @param {boolean} [recalculate=true] - Recalculates the tile faces after the update.
    */
    setCollisionByIndex: function (index, collides, layer, recalculate) {

        if (collides === undefined) { collides = true; }
        if (layer === undefined) { layer = this.currentLayer; }
        if (recalculate === undefined) { recalculate = true; }

        if (collides)
        {
            this.collideIndexes.push(index);
        }
        else
        {
            var i = this.collideIndexes.indexOf(index);

            if (i > -1)
            {
                this.collideIndexes.splice(i, 1);
            }
        }

        for (var y = 0; y < this.layers[layer].height; y++)
        {
            for (var x = 0; x < this.layers[layer].width; x++)
            {
                var tile = this.layers[layer].data[y][x];

                if (tile && tile.index === index)
                {
                    if (collides)
                    {
                        tile.setCollision(true, true, true, true);
                    }
                    else
                    {
                        tile.resetCollision();
                    }

                    tile.faceTop = collides;
                    tile.faceBottom = collides;
                    tile.faceLeft = collides;
                    tile.faceRight = collides;
                }
            }
        }

        if (recalculate)
        {
            //  Now re-calculate interesting faces
            this.calculateFaces(layer);
        }

        return layer;

    },

    /**
    * Gets the TilemapLayer index as used in the setCollision calls.
    *
    * @method Phaser.Tilemap#getLayer
    * @protected
    * @param {number|string|Phaser.TilemapLayer} layer - The layer to operate on. If not given will default to this.currentLayer.
    * @return {number} The TilemapLayer index.
    */
    getLayer: function (layer) {

        if (layer === undefined)
        {
            layer = this.currentLayer;
        }
        else if (typeof layer === 'string')
        {
            layer = this.getLayerIndex(layer);
        }
        else if (layer instanceof Phaser.TilemapLayer)
        {
            layer = layer.index;
        }

        return layer;

    },

    /**
    * Turn off/on the recalculation of faces for tile or collision updates. 
    * `setPreventRecalculate(true)` puts recalculation on hold while `setPreventRecalculate(false)` recalculates all the changed layers.
    *
    * @method Phaser.Tilemap#setPreventRecalculate
    * @param {boolean} value - If true it will put the recalculation on hold.
    */
    setPreventRecalculate: function (value) {

        if (value === true && this.preventingRecalculate !== true)
        {
            this.preventingRecalculate = true;
            this.needToRecalculate = {};
        }

        if (value === false && this.preventingRecalculate === true)
        {
            this.preventingRecalculate = false;

            for (var i in this.needToRecalculate)
            {
                this.calculateFaces(i);
            }

            this.needToRecalculate = false;
        }

    },

    /**
    * Internal function.
    *
    * @method Phaser.Tilemap#calculateFaces
    * @protected
    * @param {number} layer - The index of the TilemapLayer to operate on.
    */
    calculateFaces: function (layer) {

        if (this.preventingRecalculate)
        {
            this.needToRecalculate[layer] = true;
            return;
        }
        
        var above = null;
        var below = null;
        var left = null;
        var right = null;

        for (var y = 0, h = this.layers[layer].height; y < h; y++)
        {
            for (var x = 0, w = this.layers[layer].width; x < w; x++)
            {
                var tile = this.layers[layer].data[y][x];

                if (tile)
                {
                    above = this.getTileAbove(layer, x, y);
                    below = this.getTileBelow(layer, x, y);
                    left = this.getTileLeft(layer, x, y);
                    right = this.getTileRight(layer, x, y);

                    if (tile.collides)
                    {
                        tile.faceTop = true;
                        tile.faceBottom = true;
                        tile.faceLeft = true;
                        tile.faceRight = true;
                    }

                    if (above && above.collides)
                    {
                        //  There is a tile above this one that also collides, so the top of this tile is no longer interesting
                        tile.faceTop = false;
                    }

                    if (below && below.collides)
                    {
                        //  There is a tile below this one that also collides, so the bottom of this tile is no longer interesting
                        tile.faceBottom = false;
                    }

                    if (left && left.collides)
                    {
                        //  There is a tile left this one that also collides, so the left of this tile is no longer interesting
                        tile.faceLeft = false;
                    }

                    if (right && right.collides)
                    {
                        //  There is a tile right this one that also collides, so the right of this tile is no longer interesting
                        tile.faceRight = false;
                    }
                }
            }
        }

    },

    /**
    * Gets the tile above the tile coordinates given.
    * Mostly used as an internal function by calculateFaces.
    *
    * @method Phaser.Tilemap#getTileAbove
    * @param {number} layer - The local layer index to get the tile from. Can be determined by Tilemap.getLayer().
    * @param {number} x - The x coordinate to get the tile from. In tiles, not pixels.
    * @param {number} y - The y coordinate to get the tile from. In tiles, not pixels.
    */
    getTileAbove: function (layer, x, y) {

        if (y > 0)
        {
            return this.layers[layer].data[y - 1][x];
        }

        return null;

    },

    /**
    * Gets the tile below the tile coordinates given.
    * Mostly used as an internal function by calculateFaces.
    *
    * @method Phaser.Tilemap#getTileBelow
    * @param {number} layer - The local layer index to get the tile from. Can be determined by Tilemap.getLayer().
    * @param {number} x - The x coordinate to get the tile from. In tiles, not pixels.
    * @param {number} y - The y coordinate to get the tile from. In tiles, not pixels.
    */
    getTileBelow: function (layer, x, y) {

        if (y < this.layers[layer].height - 1)
        {
            return this.layers[layer].data[y + 1][x];
        }

        return null;

    },

    /**
    * Gets the tile to the left of the tile coordinates given.
    * Mostly used as an internal function by calculateFaces.
    *
    * @method Phaser.Tilemap#getTileLeft
    * @param {number} layer - The local layer index to get the tile from. Can be determined by Tilemap.getLayer().
    * @param {number} x - The x coordinate to get the tile from. In tiles, not pixels.
    * @param {number} y - The y coordinate to get the tile from. In tiles, not pixels.
    */
    getTileLeft: function (layer, x, y) {

        if (x > 0)
        {
            return this.layers[layer].data[y][x - 1];
        }

        return null;

    },

    /**
    * Gets the tile to the right of the tile coordinates given.
    * Mostly used as an internal function by calculateFaces.
    *
    * @method Phaser.Tilemap#getTileRight
    * @param {number} layer - The local layer index to get the tile from. Can be determined by Tilemap.getLayer().
    * @param {number} x - The x coordinate to get the tile from. In tiles, not pixels.
    * @param {number} y - The y coordinate to get the tile from. In tiles, not pixels.
    */
    getTileRight: function (layer, x, y) {

        if (x < this.layers[layer].width - 1)
        {
            return this.layers[layer].data[y][x + 1];
        }

        return null;

    },

    /**
    * Sets the current layer to the given index.
    *
    * @method Phaser.Tilemap#setLayer
    * @param {number|string|Phaser.TilemapLayer} layer - The layer to set as current.
    */
    setLayer: function (layer) {

        layer = this.getLayer(layer);

        if (this.layers[layer])
        {
            this.currentLayer = layer;
        }

    },

    /**
    * Checks if there is a tile at the given location.
    *
    * @method Phaser.Tilemap#hasTile
    * @param {number} x - X position to check if a tile exists at (given in tile units, not pixels)
    * @param {number} y - Y position to check if a tile exists at (given in tile units, not pixels)
    * @param {number|string|Phaser.TilemapLayer} layer - The layer to set as current.
    * @return {boolean} True if there is a tile at the given location, otherwise false.
    */
    hasTile: function (x, y, layer) {

        layer = this.getLayer(layer);

        return (this.layers[layer].data[y][x].index > -1);

    },

    /**
    * Removes the tile located at the given coordinates and updates the collision data.
    *
    * @method Phaser.Tilemap#removeTile
    * @param {number} x - X position to place the tile (given in tile units, not pixels)
    * @param {number} y - Y position to place the tile (given in tile units, not pixels)
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to modify.
    * @return {Phaser.Tile} The Tile object that was removed from this map.
    */
    removeTile: function (x, y, layer) {

        layer = this.getLayer(layer);

        if (x >= 0 && x < this.layers[layer].width && y >= 0 && y < this.layers[layer].height)
        {
            if (this.hasTile(x, y, layer))
            {
                var tile = this.layers[layer].data[y][x];

                this.layers[layer].data[y][x] = new Phaser.Tile(this.layers[layer], -1, x, y, this.tileWidth, this.tileHeight);

                this.layers[layer].dirty = true;

                this.calculateFaces(layer);

                return tile;
            }
        }

    },

    /**
    * Removes the tile located at the given coordinates and updates the collision data. The coordinates are given in pixel values.
    *
    * @method Phaser.Tilemap#removeTileWorldXY
    * @param {number} x - X position to insert the tile (given in pixels)
    * @param {number} y - Y position to insert the tile (given in pixels)
    * @param {number} tileWidth - The width of the tile in pixels.
    * @param {number} tileHeight - The height of the tile in pixels.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to modify.
    * @return {Phaser.Tile} The Tile object that was removed from this map.
    */
    removeTileWorldXY: function (x, y, tileWidth, tileHeight, layer) {

        layer = this.getLayer(layer);

        x = this.game.math.snapToFloor(x, tileWidth) / tileWidth;
        y = this.game.math.snapToFloor(y, tileHeight) / tileHeight;

        return this.removeTile(x, y, layer);

    },

    /**
    * Puts a tile of the given index value at the coordinate specified.
    * If you pass `null` as the tile it will pass your call over to Tilemap.removeTile instead.
    *
    * @method Phaser.Tilemap#putTile
    * @param {Phaser.Tile|number|null} tile - The index of this tile to set or a Phaser.Tile object. If null the tile is removed from the map.
    * @param {number} x - X position to place the tile (given in tile units, not pixels)
    * @param {number} y - Y position to place the tile (given in tile units, not pixels)
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to modify.
    * @return {Phaser.Tile} The Tile object that was created or added to this map.
    */
    putTile: function (tile, x, y, layer) {

        if (tile === null)
        {
            return this.removeTile(x, y, layer);
        }

        layer = this.getLayer(layer);

        if (x >= 0 && x < this.layers[layer].width && y >= 0 && y < this.layers[layer].height)
        {
            var index;

            if (tile instanceof Phaser.Tile)
            {
                index = tile.index;

                if (this.hasTile(x, y, layer))
                {
                    this.layers[layer].data[y][x].copy(tile);
                }
                else
                {
                    this.layers[layer].data[y][x] = new Phaser.Tile(layer, index, x, y, tile.width, tile.height);
                }
            }
            else
            {
                index = tile;

                if (this.hasTile(x, y, layer))
                {
                    this.layers[layer].data[y][x].index = index;
                }
                else
                {
                    this.layers[layer].data[y][x] = new Phaser.Tile(this.layers[layer], index, x, y, this.tileWidth, this.tileHeight);
                }
            }

            if (this.collideIndexes.indexOf(index) > -1)
            {
                this.layers[layer].data[y][x].setCollision(true, true, true, true);
            }
            else
            {
                this.layers[layer].data[y][x].resetCollision();
            }

            this.layers[layer].dirty = true;

            this.calculateFaces(layer);

            return this.layers[layer].data[y][x];
        }

        return null;

    },

    /**
    * Puts a tile into the Tilemap layer. The coordinates are given in pixel values.
    *
    * @method Phaser.Tilemap#putTileWorldXY
    * @param {Phaser.Tile|number} tile - The index of this tile to set or a Phaser.Tile object.
    * @param {number} x - X position to insert the tile (given in pixels)
    * @param {number} y - Y position to insert the tile (given in pixels)
    * @param {number} tileWidth - The width of the tile in pixels.
    * @param {number} tileHeight - The height of the tile in pixels.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to modify.
    * @return {Phaser.Tile} The Tile object that was created or added to this map.
    */
    putTileWorldXY: function (tile, x, y, tileWidth, tileHeight, layer) {

        layer = this.getLayer(layer);

        x = this.game.math.snapToFloor(x, tileWidth) / tileWidth;
        y = this.game.math.snapToFloor(y, tileHeight) / tileHeight;

        return this.putTile(tile, x, y, layer);

    },

    /**
    * Searches the entire map layer for the first tile matching the given index, then returns that Phaser.Tile object.
    * If no match is found it returns null.
    * The search starts from the top-left tile and continues horizontally until it hits the end of the row, then it drops down to the next column.
    * If the reverse boolean is true, it scans starting from the bottom-right corner traveling up to the top-left.
    *
    * @method Phaser.Tilemap#searchTileIndex
    * @param {number} index - The tile index value to search for.
    * @param {number} [skip=0] - The number of times to skip a matching tile before returning.
    * @param {number} [reverse=false] - If true it will scan the layer in reverse, starting at the bottom-right. Otherwise it scans from the top-left.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to get the tile from.
    * @return {Phaser.Tile} The first (or n skipped) tile with the matching index.
    */
    searchTileIndex: function (index, skip, reverse, layer) {

        if (skip === undefined) { skip = 0; }
        if (reverse === undefined) { reverse = false; }

        layer = this.getLayer(layer);

        var c = 0;

        if (reverse)
        {
            for (var y = this.layers[layer].height - 1; y >= 0; y--)
            {
                for (var x = this.layers[layer].width - 1; x >= 0; x--)
                {
                    if (this.layers[layer].data[y][x].index === index)
                    {
                        if (c === skip)
                        {
                            return this.layers[layer].data[y][x];
                        }
                        else
                        {
                            c++;
                        }
                    }
                }
            }
        }
        else
        {
            for (var y = 0; y < this.layers[layer].height; y++)
            {
                for (var x = 0; x < this.layers[layer].width; x++)
                {
                    if (this.layers[layer].data[y][x].index === index)
                    {
                        if (c === skip)
                        {
                            return this.layers[layer].data[y][x];
                        }
                        else
                        {
                            c++;
                        }
                    }
                }
            }
        }

        return null;

    },

    /**
    * Gets a tile from the Tilemap Layer. The coordinates are given in tile values.
    *
    * @method Phaser.Tilemap#getTile
    * @param {number} x - X position to get the tile from (given in tile units, not pixels)
    * @param {number} y - Y position to get the tile from (given in tile units, not pixels)
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to get the tile from.
    * @param {boolean} [nonNull=false] - If true getTile won't return null for empty tiles, but a Tile object with an index of -1.
    * @return {Phaser.Tile} The tile at the given coordinates or null if no tile was found or the coordinates were invalid.
    */
    getTile: function (x, y, layer, nonNull) {

        if (nonNull === undefined) { nonNull = false; }

        layer = this.getLayer(layer);

        if (x >= 0 && x < this.layers[layer].width && y >= 0 && y < this.layers[layer].height)
        {
            if (this.layers[layer].data[y][x].index === -1)
            {
                if (nonNull)
                {
                    return this.layers[layer].data[y][x];
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return this.layers[layer].data[y][x];
            }
        }
        else
        {
            return null;
        }

    },

    /**
    * Gets a tile from the Tilemap layer. The coordinates are given in pixel values.
    *
    * @method Phaser.Tilemap#getTileWorldXY
    * @param {number} x - X position to get the tile from (given in pixels)
    * @param {number} y - Y position to get the tile from (given in pixels)
    * @param {number} [tileWidth] - The width of the tiles. If not given the map default is used.
    * @param {number} [tileHeight] - The height of the tiles. If not given the map default is used.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to get the tile from.
    * @param {boolean} [nonNull=false] - If true getTile won't return null for empty tiles, but a Tile object with an index of -1.
    * @return {Phaser.Tile} The tile at the given coordinates.
    */
    getTileWorldXY: function (x, y, tileWidth, tileHeight, layer, nonNull) {

        if (tileWidth === undefined) { tileWidth = this.tileWidth; }
        if (tileHeight === undefined) { tileHeight = this.tileHeight; }

        layer = this.getLayer(layer);

        x = this.game.math.snapToFloor(x, tileWidth) / tileWidth;
        y = this.game.math.snapToFloor(y, tileHeight) / tileHeight;

        return this.getTile(x, y, layer, nonNull);

    },

    /**
    * Copies all of the tiles in the given rectangular block into the tilemap data buffer.
    *
    * @method Phaser.Tilemap#copy
    * @param {integer} x - X position of the top left of the area to copy (given in tiles, not pixels)
    * @param {integer} y - Y position of the top left of the area to copy (given in tiles, not pixels)
    * @param {integer} width - The width of the area to copy (given in tiles, not pixels)
    * @param {integer} height - The height of the area to copy (given in tiles, not pixels)
    * @param {integer|string|Phaser.TilemapLayer} [layer] - The layer to copy the tiles from.
    * @return {array} An array of the tiles that were copied.
    */
    copy: function (x, y, width, height, layer) {

        layer = this.getLayer(layer);

        if (!this.layers[layer])
        {
            this._results.length = 0;
            return;
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = this.layers[layer].width; }
        if (height === undefined) { height = this.layers[layer].height; }
        
        if (x < 0)
        {
            x = 0;
        }

        if (y < 0)
        {
            y = 0;
        }

        if (width > this.layers[layer].width)
        {
            width = this.layers[layer].width;
        }

        if (height > this.layers[layer].height)
        {
            height = this.layers[layer].height;
        }

        this._results.length = 0;

        this._results.push({ x: x, y: y, width: width, height: height, layer: layer });

        for (var ty = y; ty < y + height; ty++)
        {
            for (var tx = x; tx < x + width; tx++)
            {
                this._results.push(this.layers[layer].data[ty][tx]);
            }
        }

        return this._results;

    },

    /**
    * Pastes a previously copied block of tile data into the given x/y coordinates. Data should have been prepared with Tilemap.copy.
    *
    * @method Phaser.Tilemap#paste
    * @param {number} x - X position of the top left of the area to paste to (given in tiles, not pixels)
    * @param {number} y - Y position of the top left of the area to paste to (given in tiles, not pixels)
    * @param {array} tileblock - The block of tiles to paste.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to paste the tiles into.
    */
    paste: function (x, y, tileblock, layer) {

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }

        layer = this.getLayer(layer);

        if (!tileblock || tileblock.length < 2)
        {
            return;
        }

        //  Find out the difference between tileblock[1].x/y and x/y and use it as an offset, as it's the top left of the block to paste
        var diffX = x - tileblock[1].x;
        var diffY = y - tileblock[1].y;

        for (var i = 1; i < tileblock.length; i++)
        {
            this.layers[layer].data[ diffY + tileblock[i].y ][ diffX + tileblock[i].x ].copy(tileblock[i]);
        }

		this.layers[layer].dirty = true;
        this.calculateFaces(layer);

    },

    /**
    * Scans the given area for tiles with an index matching tileA and swaps them with tileB.
    *
    * @method Phaser.Tilemap#swap
    * @param {number} tileA - First tile index.
    * @param {number} tileB - Second tile index.
    * @param {number} x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} width - The width in tiles of the area to operate on.
    * @param {number} height - The height in tiles of the area to operate on.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on.
    */
    swap: function (tileA, tileB, x, y, width, height, layer) {

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        {
            return;
        }

        this._tempA = tileA;
        this._tempB = tileB;

        this._results.forEach(this.swapHandler, this);

        this.paste(x, y, this._results, layer);

    },

    /**
    * Internal function that handles the swapping of tiles.
    *
    * @method Phaser.Tilemap#swapHandler
    * @private
    * @param {number} value
    */
    swapHandler: function (value) {

        if (value.index === this._tempA)
        {
            //  Swap A with B
            value.index = this._tempB;
        }
        else if (value.index === this._tempB)
        {
            //  Swap B with A
            value.index = this._tempA;
        }

    },

    /**
    * For each tile in the given area defined by x/y and width/height run the given callback.
    *
    * @method Phaser.Tilemap#forEach
    * @param {number} callback - The callback. Each tile in the given area will be passed to this callback as the first and only parameter.
    * @param {number} context - The context under which the callback should be run.
    * @param {number} x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} width - The width in tiles of the area to operate on.
    * @param {number} height - The height in tiles of the area to operate on.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on.
    */
    forEach: function (callback, context, x, y, width, height, layer) {

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        {
            return;
        }

        this._results.forEach(callback, context);

        this.paste(x, y, this._results, layer);

    },

    /**
    * Scans the given area for tiles with an index matching `source` and updates their index to match `dest`.
    *
    * @method Phaser.Tilemap#replace
    * @param {number} source - The tile index value to scan for.
    * @param {number} dest - The tile index value to replace found tiles with.
    * @param {number} x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} width - The width in tiles of the area to operate on.
    * @param {number} height - The height in tiles of the area to operate on.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on.
    */
    replace: function (source, dest, x, y, width, height, layer) {

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        {
            return;
        }

        for (var i = 1; i < this._results.length; i++)
        {
            if (this._results[i].index === source)
            {
                this._results[i].index = dest;
            }
        }

        this.paste(x, y, this._results, layer);

    },

    /**
    * Randomises a set of tiles in a given area.
    *
    * @method Phaser.Tilemap#random
    * @param {number} x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} width - The width in tiles of the area to operate on.
    * @param {number} height - The height in tiles of the area to operate on.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on.
    */
    random: function (x, y, width, height, layer) {

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        {
            return;
        }

        var indexes = [];

        for (var t = 1; t < this._results.length; t++)
        {
            if (this._results[t].index)
            {
                var idx = this._results[t].index;

                if (indexes.indexOf(idx) === -1)
                {
                    indexes.push(idx);
                }
            }
        }

        for (var i = 1; i < this._results.length; i++)
        {
            this._results[i].index = this.game.rnd.pick(indexes);
        }

        this.paste(x, y, this._results, layer);

    },

    /**
    * Shuffles a set of tiles in a given area. It will only randomise the tiles in that area, so if they're all the same nothing will appear to have changed!
    *
    * @method Phaser.Tilemap#shuffle
    * @param {number} x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} width - The width in tiles of the area to operate on.
    * @param {number} height - The height in tiles of the area to operate on.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on.
    */
    shuffle: function (x, y, width, height, layer) {

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        {
            return;
        }

        var indexes = [];

        for (var t = 1; t < this._results.length; t++)
        {
            if (this._results[t].index)
            {
                indexes.push(this._results[t].index);
            }
        }

        Phaser.Utils.shuffle(indexes);

        for (var i = 1; i < this._results.length; i++)
        {
            this._results[i].index = indexes[i - 1];
        }

        this.paste(x, y, this._results, layer);

    },

    /**
    * Fills the given area with the specified tile.
    *
    * @method Phaser.Tilemap#fill
    * @param {number} index - The index of the tile that the area will be filled with.
    * @param {number} x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param {number} width - The width in tiles of the area to operate on.
    * @param {number} height - The height in tiles of the area to operate on.
    * @param {number|string|Phaser.TilemapLayer} [layer] - The layer to operate on.
    */
    fill: function (index, x, y, width, height, layer) {

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        {
            return;
        }

        for (var i = 1; i < this._results.length; i++)
        {
            this._results[i].index = index;
        }

        this.paste(x, y, this._results, layer);

    },

    /**
    * Removes all layers from this tile map.
    *
    * @method Phaser.Tilemap#removeAllLayers
    */
    removeAllLayers: function () {

        this.layers.length = 0;
        this.currentLayer = 0;

    },

    /**
    * Dumps the tilemap data out to the console.
    *
    * @method Phaser.Tilemap#dump
    */
    dump: function () {

        var txt = '';
        var args = [''];

        for (var y = 0; y < this.layers[this.currentLayer].height; y++)
        {
            for (var x = 0; x < this.layers[this.currentLayer].width; x++)
            {
                txt += "%c  ";

                if (this.layers[this.currentLayer].data[y][x] > 1)
                {
                    if (this.debugMap[this.layers[this.currentLayer].data[y][x]])
                    {
                        args.push("background: " + this.debugMap[this.layers[this.currentLayer].data[y][x]]);
                    }
                    else
                    {
                        args.push("background: #ffffff");
                    }
                }
                else
                {
                    args.push("background: rgb(0, 0, 0)");
                }
            }

            txt += "\n";
        }

        args[0] = txt;
        console.log.apply(console, args);

    },

    /**
    * Removes all layer data from this tile map and nulls the game reference.
    * Note: You are responsible for destroying any TilemapLayer objects you generated yourself, as Tilemap doesn't keep a reference to them.
    *
    * @method Phaser.Tilemap#destroy
    */
    destroy: function () {

        this.removeAllLayers();
        this.data = [];
        this.game = null;

    }

};

Phaser.Tilemap.prototype.constructor = Phaser.Tilemap;

/**
* @name Phaser.Tilemap#layer
* @property {number|string|Phaser.TilemapLayer} layer - The current layer object.
*/
Object.defineProperty(Phaser.Tilemap.prototype, "layer", {

    get: function () {

        return this.layers[this.currentLayer];

    },

    set: function (value) {

        if (value !== this.currentLayer)
        {
            this.setLayer(value);
        }

    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A TilemapLayer is a Phaser.Image/Sprite that renders a specific TileLayer of a Tilemap.
*
* Since a TilemapLayer is a Sprite it can be moved around the display, added to other groups or display objects, etc.
*
* By default TilemapLayers have fixedToCamera set to `true`. Changing this will break Camera follow and scrolling behavior.
*
* @class Phaser.TilemapLayer
* @extends Phaser.Sprite
* @constructor
* @param {Phaser.Game} game - Game reference to the currently running game.
* @param {Phaser.Tilemap} tilemap - The tilemap to which this layer belongs.
* @param {integer} index - The index of the TileLayer to render within the Tilemap.
* @param {integer} width - Width of the renderable area of the layer (in pixels).
* @param {integer} height - Height of the renderable area of the layer (in pixels).
*/
Phaser.TilemapLayer = function (game, tilemap, index, width, height) {

    width |= 0;
    height |= 0;

    Phaser.Sprite.call(this, game, 0, 0);

    /**
    * The Tilemap to which this layer is bound.
    * @property {Phaser.Tilemap} map
    * @protected
    * @readonly
    */
    this.map = tilemap;

    /**
    * The index of this layer within the Tilemap.
    * @property {number} index
    * @protected
    * @readonly
    */
    this.index = index;

    /**
    * The layer object within the Tilemap that this layer represents.
    * @property {object} layer
    * @protected
    * @readonly
    */
    this.layer = tilemap.layers[index];

    /**
    * The canvas to which this TilemapLayer draws.
    * @property {HTMLCanvasElement} canvas
    * @protected
    */
    this.canvas = Phaser.Canvas.create(width, height);

    /**
    * The 2d context of the canvas.
    * @property {CanvasRenderingContext2D} context
    * @private
    */
    this.context = this.canvas.getContext('2d');

    this.setTexture(new PIXI.Texture(new PIXI.BaseTexture(this.canvas)));

    /**
    * The const type of this object.
    * @property {number} type
    * @readonly
    * @protected
    * @default Phaser.TILEMAPLAYER
    */
    this.type = Phaser.TILEMAPLAYER;

    /**
    * @property {number} physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.TILEMAPLAYER;

    /**
    * Settings that control standard (non-diagnostic) rendering.
    *
    * @property {boolean} [enableScrollDelta=true] - Delta scroll rendering only draws tiles/edges as they come into view.
    *     This can greatly improve scrolling rendering performance, especially when there are many small tiles.
    *     It should only be disabled in rare cases.
    *
    * @property {?DOMCanvasElement} [copyCanvas=(auto)] - [Internal] If set, force using a separate (shared) copy canvas.
    *     Using a canvas bitblt/copy when the source and destinations region overlap produces unexpected behavior
    *     in some browsers, notably Safari. 
    *
    * @default
    */
    this.renderSettings = {
        enableScrollDelta: false,
        overdrawRatio: 0.20,
        copyCanvas: null
    };

    /**
    * Enable an additional "debug rendering" pass to display collision information.
    *
    * @property {boolean} debug
    * @default
    */
    this.debug = false;

    /**
    * @property {boolean} exists - Controls if the core game loop and physics update this game object or not.
    */
    this.exists = true;

    /**
    * Settings used for debugging and diagnostics.
    *
    * @property {?string} missingImageFill - A tile is rendered as a rectangle using the following fill if a valid tileset/image cannot be found. A value of `null` prevents additional rendering for tiles without a valid tileset image. _This takes effect even when debug rendering for the layer is not enabled._
    *
    * @property {?string} debuggedTileOverfill - If a Tile has `Tile#debug` true then, after normal tile image rendering, a rectangle with the following fill is drawn above/over it. _This takes effect even when debug rendering for the layer is not enabled._
    *
    * @property {boolean} forceFullRedraw - When debug rendering (`debug` is true), and this option is enabled, the a full redraw is forced and rendering optimization is suppressed.
    *
    * @property {number} debugAlpha - When debug rendering (`debug` is true), the tileset is initially rendered with this alpha level. This can make the tile edges clearer.
    *
    * @property {?string} facingEdgeStroke - When debug rendering (`debug` is true), this color/stroke is used to draw "face" edges. A value of `null` disables coloring facing edges.
    *
    * @property {?string} collidingTileOverfill - When debug rendering (`debug` is true), this fill is used for tiles that are collidable. A value of `null` disables applying the additional overfill.
    *
    */
    this.debugSettings = {

        missingImageFill: 'rgb(255,255,255)',
        debuggedTileOverfill: 'rgba(0,255,0,0.4)',

        forceFullRedraw: true,

        debugAlpha: 0.5,
        facingEdgeStroke: 'rgba(0,255,0,1)',
        collidingTileOverfill: 'rgba(0,255,0,0.2)'

    };

    /**
    * Speed at which this layer scrolls horizontally, relative to the camera (e.g. scrollFactorX of 0.5 scrolls half as quickly as the 'normal' camera-locked layers do).
    * @property {number} scrollFactorX
    * @public
    * @default
    */
    this.scrollFactorX = 1;

    /**
    * Speed at which this layer scrolls vertically, relative to the camera (e.g. scrollFactorY of 0.5 scrolls half as quickly as the 'normal' camera-locked layers do)
    * @property {number} scrollFactorY
    * @public
    * @default
    */
    this.scrollFactorY = 1;

    /**
    * If true tiles will be force rendered, even if such is not believed to be required.
    * @property {boolean} dirty
    * @protected
    */
    this.dirty = true;

    /**
    * When ray-casting against tiles this is the number of steps it will jump. For larger tile sizes you can increase this to improve performance.
    * @property {integer} rayStepRate
    * @default
    */
    this.rayStepRate = 4;

    /**
    * Flag controlling if the layer tiles wrap at the edges.
    * @property {boolean} _wrap
    * @private
    */
    this._wrap = false;

    /**
    * Local map data and calculation cache.
    * @property {object} _mc
    * @private
    */
    this._mc = {

        // Used to bypass rendering without reliance on `dirty` and detect changes.
        scrollX: 0,
        scrollY: 0,
        renderWidth: 0,
        renderHeight: 0,

        tileWidth: tilemap.tileWidth,
        tileHeight: tilemap.tileHeight,

        // Collision width/height (pixels)
        // What purpose do these have? Most things use tile width/height directly.
        // This also only extends collisions right and down.       
        cw: tilemap.tileWidth,
        ch: tilemap.tileHeight,

        // Cached tilesets from index -> Tileset
        tilesets: []

    };

    /**
    * The current canvas left after scroll is applied.
    * @property {number} _scrollX
    * @private
    */
    this._scrollX = 0;

    /**
    * The current canvas top after scroll is applied.
    * @propety {number} _scrollY
    * @private
    */
    this._scrollY = 0;

    /**
    * Used for caching the tiles / array of tiles.
    * @property {Phaser.Tile[]} _results
    * @private
    */
    this._results = [];

    if (!game.device.canvasBitBltShift)
    {
        this.renderSettings.copyCanvas = Phaser.TilemapLayer.ensureSharedCopyCanvas();
    }

    this.fixedToCamera = true;

};

Phaser.TilemapLayer.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.TilemapLayer.prototype.constructor = Phaser.TilemapLayer;

Phaser.TilemapLayer.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* The shared double-copy canvas, created as needed.
*
* @private
* @static
*/
Phaser.TilemapLayer.sharedCopyCanvas = null;

/**
* Create if needed (and return) a shared copy canvas that is shared across all TilemapLayers.
*
* Code that uses the canvas is responsible to ensure the dimensions and save/restore state as appropriate.
*
* @protected
* @static
*/
Phaser.TilemapLayer.ensureSharedCopyCanvas = function () {

    if (!this.sharedCopyCanvas)
    {
        this.sharedCopyCanvas = Phaser.Canvas.create(2, 2);
    }

    return this.sharedCopyCanvas;

};

/**
* Automatically called by World.preUpdate.
*
* @method Phaser.Image#preUpdate
* @memberof Phaser.Image
*/
Phaser.TilemapLayer.prototype.preUpdate = function() {

    return this.preUpdateCore();

};

/**
* Automatically called by World.postUpdate. Handles cache updates.
*
* @method Phaser.TilemapLayer#postUpdate
* @protected
*/
Phaser.TilemapLayer.prototype.postUpdate = function () {

    Phaser.Component.FixedToCamera.postUpdate.call(this);

    //  Stops you being able to auto-scroll the camera if it's not following a sprite
    var camera = this.game.camera;

    this.scrollX = camera.x * this.scrollFactorX / this.scale.x;
    this.scrollY = camera.y * this.scrollFactorY / this.scale.y;

    this.render();

};

/**
* Resizes the internal canvas and texture frame used by this TilemapLayer.
*
* This is an expensive call, so don't bind it to a window resize event! But instead call it at carefully
* selected times.
*
* Be aware that no validation of the new sizes takes place and the current map scroll coordinates are not
* modified either. You will have to handle both of these things from your game code if required.
* 
* @method Phaser.TilemapLayer#resize
* @param {number} width - The new width of the TilemapLayer
* @param {number} height - The new height of the TilemapLayer
*/
Phaser.TilemapLayer.prototype.resize = function (width, height) {

    this.canvas.width = width;
    this.canvas.height = height;

    this.texture.frame.resize(width, height);

    this.texture.width = width;
    this.texture.height = height;

    this.texture.crop.width = width;
    this.texture.crop.height = height;

    this.texture.baseTexture.width = width;
    this.texture.baseTexture.height = height;

    this.texture.baseTexture.dirty();
    this.texture.requiresUpdate = true;

    this.texture._updateUvs();

    this.dirty = true;

};

/**
* Sets the world size to match the size of this layer.
*
* @method Phaser.TilemapLayer#resizeWorld
* @public
*/
Phaser.TilemapLayer.prototype.resizeWorld = function () {

    this.game.world.setBounds(0, 0, this.layer.widthInPixels * this.scale.x, this.layer.heightInPixels * this.scale.y);

};

/**
* Take an x coordinate that doesn't account for scrollFactorX and 'fix' it into a scrolled local space.
*
* @method Phaser.TilemapLayer#_fixX
* @private
* @param {number} x - x coordinate in camera space
* @return {number} x coordinate in scrollFactor-adjusted dimensions
*/
Phaser.TilemapLayer.prototype._fixX = function (x) {

    if (x < 0)
    {
        x = 0;
    }

    if (this.scrollFactorX === 1)
    {
        return x;
    }

    return this._scrollX + (x - (this._scrollX / this.scrollFactorX));

};

/**
* Take an x coordinate that _does_ account for scrollFactorX and 'unfix' it back to camera space.
*
* @method Phaser.TilemapLayer#_unfixX
* @private
* @param {number} x - x coordinate in scrollFactor-adjusted dimensions
* @return {number} x coordinate in camera space
*/
Phaser.TilemapLayer.prototype._unfixX = function (x) {

    if (this.scrollFactorX === 1)
    {
        return x;
    }

    return (this._scrollX / this.scrollFactorX) + (x - this._scrollX);

};

/**
* Take a y coordinate that doesn't account for scrollFactorY and 'fix' it into a scrolled local space.
*
* @method Phaser.TilemapLayer#_fixY
* @private
* @param {number} y - y coordinate in camera space
* @return {number} y coordinate in scrollFactor-adjusted dimensions
*/
Phaser.TilemapLayer.prototype._fixY = function (y) {

    if (y < 0)
    {
        y = 0;
    }

    if (this.scrollFactorY === 1)
    {
        return y;
    }

    return this._scrollY + (y - (this._scrollY / this.scrollFactorY));

};

/**
* Take a y coordinate that _does_ account for scrollFactorY and 'unfix' it back to camera space.
*
* @method Phaser.TilemapLayer#_unfixY
* @private
* @param {number} y - y coordinate in scrollFactor-adjusted dimensions
* @return {number} y coordinate in camera space
*/
Phaser.TilemapLayer.prototype._unfixY = function (y) {

    if (this.scrollFactorY === 1)
    {
        return y;
    }

    return (this._scrollY / this.scrollFactorY) + (y - this._scrollY);

};

/**
* Convert a pixel value to a tile coordinate.
*
* @method Phaser.TilemapLayer#getTileX
* @public
* @param {number} x - X position of the point in target tile (in pixels).
* @return {integer} The X map location of the tile.
*/
Phaser.TilemapLayer.prototype.getTileX = function (x) {

    // var tileWidth = this.tileWidth * this.scale.x;
    return Math.floor(this._fixX(x) / this._mc.tileWidth);

};

/**
* Convert a pixel value to a tile coordinate.
*
* @method Phaser.TilemapLayer#getTileY
* @public
* @param {number} y - Y position of the point in target tile (in pixels).
* @return {integer} The Y map location of the tile.
*/
Phaser.TilemapLayer.prototype.getTileY = function (y) {

    // var tileHeight = this.tileHeight * this.scale.y;
    return Math.floor(this._fixY(y) / this._mc.tileHeight);

};

/**
* Convert a pixel coordinate to a tile coordinate.
*
* @method Phaser.TilemapLayer#getTileXY
* @public
* @param {number} x - X position of the point in target tile (in pixels).
* @param {number} y - Y position of the point in target tile (in pixels).
* @param {(Phaser.Point|object)} point - The Point/object to update.
* @return {(Phaser.Point|object)} A Point/object with its `x` and `y` properties set.
*/
Phaser.TilemapLayer.prototype.getTileXY = function (x, y, point) {

    point.x = this.getTileX(x);
    point.y = this.getTileY(y);

    return point;

};

/**
* Gets all tiles that intersect with the given line.
*
* @method Phaser.TilemapLayer#getRayCastTiles
* @public
* @param {Phaser.Line} line - The line used to determine which tiles to return.
* @param {integer} [stepRate=(rayStepRate)] - How many steps through the ray will we check? Defaults to `rayStepRate`.
* @param {boolean} [collides=false] - If true, _only_ return tiles that collide on one or more faces.
* @param {boolean} [interestingFace=false] - If true, _only_ return tiles that have interesting faces.
* @return {Phaser.Tile[]} An array of Phaser.Tiles.
*/
Phaser.TilemapLayer.prototype.getRayCastTiles = function (line, stepRate, collides, interestingFace) {

    if (!stepRate) { stepRate = this.rayStepRate; }
    if (collides === undefined) { collides = false; }
    if (interestingFace === undefined) { interestingFace = false; }

    //  First get all tiles that touch the bounds of the line
    var tiles = this.getTiles(line.x, line.y, line.width, line.height, collides, interestingFace);

    if (tiles.length === 0)
    {
        return [];
    }

    //  Now we only want the tiles that intersect with the points on this line
    var coords = line.coordinatesOnLine(stepRate);
    var results = [];

    for (var i = 0; i < tiles.length; i++)
    {
        for (var t = 0; t < coords.length; t++)
        {
            var tile = tiles[i];
            var coord = coords[t];
            if (tile.containsPoint(coord[0], coord[1]))
            {
                results.push(tile);
                break;
            }
        }
    }

    return results;

};

/**
* Get all tiles that exist within the given area, defined by the top-left corner, width and height. Values given are in pixels, not tiles.
*
* @method Phaser.TilemapLayer#getTiles
* @public
* @param {number} x - X position of the top left corner (in pixels).
* @param {number} y - Y position of the top left corner (in pixels).
* @param {number} width - Width of the area to get (in pixels).
* @param {number} height - Height of the area to get (in pixels).
* @param {boolean} [collides=false] - If true, _only_ return tiles that collide on one or more faces.
* @param {boolean} [interestingFace=false] - If true, _only_ return tiles that have interesting faces.
* @return {array<Phaser.Tile>} An array of Tiles.
*/
Phaser.TilemapLayer.prototype.getTiles = function (x, y, width, height, collides, interestingFace) {

    //  Should we only get tiles that have at least one of their collision flags set? (true = yes, false = no just get them all)
    if (collides === undefined) { collides = false; }
    if (interestingFace === undefined) { interestingFace = false; }

    var fetchAll = !(collides || interestingFace);

    //  Adjust the x,y coordinates for scrollFactor
    x = this._fixX(x);
    y = this._fixY(y);

    //  Convert the pixel values into tile coordinates
    var tx = Math.floor(x / (this._mc.cw * this.scale.x));
    var ty = Math.floor(y / (this._mc.ch * this.scale.y));
    //  Don't just use ceil(width/cw) to allow account for x/y diff within cell
    var tw = Math.ceil((x + width) / (this._mc.cw * this.scale.x)) - tx;
    var th = Math.ceil((y + height) / (this._mc.ch * this.scale.y)) - ty;

    while (this._results.length)
    {
        this._results.pop();
    }

    for (var wy = ty; wy < ty + th; wy++)
    {
        for (var wx = tx; wx < tx + tw; wx++)
        {
            var row = this.layer.data[wy];

            if (row && row[wx])
            {
                if (fetchAll || row[wx].isInteresting(collides, interestingFace))
                {
                    this._results.push(row[wx]);
                }
            }
        }
    }

    return this._results.slice();

};

/**
* Returns the appropriate tileset for the index, updating the internal cache as required.
* This should only be called if `tilesets[index]` evaluates to undefined.
*
* @method Phaser.TilemapLayer#resolveTileset
* @private
* @param {integer} Tile index
* @return {Phaser.Tileset|null} Returns the associated tileset or null if there is no such mapping.
*/
Phaser.TilemapLayer.prototype.resolveTileset = function (tileIndex) {

    var tilesets = this._mc.tilesets;

    //  Try for dense array if reasonable
    if (tileIndex < 2000)
    {
        while (tilesets.length < tileIndex)
        {
            tilesets.push(undefined);
        }
    }

    var setIndex = this.map.tiles[tileIndex] && this.map.tiles[tileIndex][2];

    if (setIndex != null) // number: not null or undefined
    {
        var tileset = this.map.tilesets[setIndex];

        if (tileset && tileset.containsTileIndex(tileIndex))
        {
            return (tilesets[tileIndex] = tileset);
        }
    }

    return (tilesets[tileIndex] = null);

};

/**
* The TilemapLayer caches tileset look-ups.
*
* Call this method of clear the cache if tilesets have been added or updated after the layer has been rendered.
*
* @method Phaser.TilemapLayer#resetTilesetCache
* @public
*/
Phaser.TilemapLayer.prototype.resetTilesetCache = function () {

    var tilesets = this._mc.tilesets;

    while (tilesets.length)
    {
        tilesets.pop();
    }

};

/**
 * This method will set the scale of the tilemap as well as update the underlying block data of this layer
 * 
 * @method Phaser.TilemapLayer#setScale
 * @param {number} [xScale=1] - The scale factor along the X-plane 
 * @param {number} [yScale] - The scale factor along the Y-plane
 */
Phaser.TilemapLayer.prototype.setScale = function (xScale, yScale) {

    xScale = xScale || 1;
    yScale = yScale || xScale;

    for (var y = 0; y < this.layer.data.length; y++)
    {
        var row = this.layer.data[y];

        for (var x = 0; x < row.length; x++)
        {
            var tile = row[x];

            tile.width = this.map.tileWidth * xScale;
            tile.height = this.map.tileHeight * yScale;

            tile.worldX = tile.x * tile.width;
            tile.worldY = tile.y * tile.height;
        }
    }

    this.scale.setTo(xScale, yScale);

};

/**
* Shifts the contents of the canvas - does extra math so that different browsers agree on the result.
*
* The specified (x/y) will be shifted to (0,0) after the copy and the newly exposed canvas area will need to be filled in.
*
* @method Phaser.TilemapLayer#shiftCanvas
* @private
* @param {CanvasRenderingContext2D} context - The context to shift
* @param {integer} x
* @param {integer} y
*/
Phaser.TilemapLayer.prototype.shiftCanvas = function (context, x, y) {

    var canvas = context.canvas;
    var copyW = canvas.width - Math.abs(x);
    var copyH = canvas.height - Math.abs(y);

    //  When x/y non-negative
    var dx = 0;
    var dy = 0;
    var sx = x;
    var sy = y;

    if (x < 0)
    {
        dx = -x;
        sx = 0;
    }

    if (y < 0)
    {
        dy = -y;
        sy = 0;
    }

    var copyCanvas = this.renderSettings.copyCanvas;

    if (copyCanvas)
    {
        // Use a second copy buffer, without slice support, for Safari .. again.
        // Ensure copy canvas is large enough
        if (copyCanvas.width < copyW || copyCanvas.height < copyH)
        {
            copyCanvas.width = copyW;
            copyCanvas.height = copyH;
        }

        var copyContext = copyCanvas.getContext('2d');
        copyContext.clearRect(0, 0, copyW, copyH);
        copyContext.drawImage(canvas, dx, dy, copyW, copyH, 0, 0, copyW, copyH);
        // clear allows default 'source-over' semantics
        context.clearRect(sx, sy, copyW, copyH);
        context.drawImage(copyCanvas, 0, 0, copyW, copyH, sx, sy, copyW, copyH);
    }
    else
    {
        // Avoids a second copy but flickers in Safari / Safari Mobile
        // Ref. https://github.com/photonstorm/phaser/issues/1439
        context.save();
        context.globalCompositeOperation = 'copy';
        context.drawImage(canvas, dx, dy, copyW, copyH, sx, sy, copyW, copyH);
        context.restore();
    }
    
};

/**
* Render tiles in the given area given by the virtual tile coordinates biased by the given scroll factor.
* This will constrain the tile coordinates based on wrapping but not physical coordinates.
*
* @method Phaser.TilemapLayer#renderRegion
* @private
* @param {integer} scrollX - Render x offset/scroll.
* @param {integer} scrollY - Render y offset/scroll.
* @param {integer} left - Leftmost column to render.
* @param {integer} top - Topmost row to render.
* @param {integer} right - Rightmost column to render.
* @param {integer} bottom - Bottommost row to render.
*/
Phaser.TilemapLayer.prototype.renderRegion = function (scrollX, scrollY, left, top, right, bottom) {

    var context = this.context;

    var width = this.layer.width;
    var height = this.layer.height;
    var tw = this._mc.tileWidth;
    var th = this._mc.tileHeight;

    var tilesets = this._mc.tilesets;
    var lastAlpha = NaN;

    if (!this._wrap)
    {
        if (left <= right) // Only adjust if going to render
        {
            left = Math.max(0, left);
            right = Math.min(width - 1, right);
        }
        if (top <= bottom)
        {
            top = Math.max(0, top);
            bottom = Math.min(height - 1, bottom);
        }
    }
   
    // top-left pixel of top-left cell
    var baseX = (left * tw) - scrollX;
    var baseY = (top * th) - scrollY;

    // Fix normStartX/normStartY such it is normalized [0..width/height). This allows a simple conditional and decrement to always keep in range [0..width/height) during the loop. The major offset bias is to take care of negative values.
    var normStartX = (left + ((1 << 20) * width)) % width;
    var normStartY = (top + ((1 << 20) * height)) % height;

    // tx/ty - are pixel coordinates where tile is drawn
    // x/y - is cell location, normalized [0..width/height) in loop
    // xmax/ymax - remaining cells to render on column/row
    var tx, ty, x, y, xmax, ymax;

    context.fillStyle = this.tileColor;

    for (y = normStartY, ymax = bottom - top, ty = baseY;
        ymax >= 0;
        y++, ymax--, ty += th)
    {

        if (y >= height) { y -= height; }

        var row = this.layer.data[y];

        for (x = normStartX, xmax = right - left, tx = baseX;
            xmax >= 0;
            x++, xmax--, tx += tw)
        {

            if (x >= width) { x -= width; }

            var tile = row[x];

            if (!tile || tile.index < 0)
            {
                continue;
            }

            var index = tile.index;

            var set = tilesets[index];

            if (set === undefined)
            {
                set = this.resolveTileset(index);
            }

            //  Setting the globalAlpha is "surprisingly expensive" in Chrome (38)
            if (tile.alpha !== lastAlpha && !this.debug)
            {
                context.globalAlpha = tile.alpha;
                lastAlpha = tile.alpha;
            }

            if (set)
            {
                if (tile.rotation || tile.flipped)
                {
                    context.save();
                    context.translate(tx + tile.centerX, ty + tile.centerY);
                    context.rotate(tile.rotation);

                    if (tile.flipped)
                    {
                        context.scale(-1, 1);
                    }

                    set.draw(context, -tile.centerX, -tile.centerY, index);
                    context.restore();
                }
                else
                {
                    set.draw(context, tx, ty, index);
                }
            }
            else if (this.debugSettings.missingImageFill)
            {
                context.fillStyle = this.debugSettings.missingImageFill;
                context.fillRect(tx, ty, tw, th);
            }

            if (tile.debug && this.debugSettings.debuggedTileOverfill)
            {
                context.fillStyle = this.debugSettings.debuggedTileOverfill;
                context.fillRect(tx, ty, tw, th);
            }
           
        }

    }

};

/**
* Shifts the canvas and render damaged edge tiles.
*
* @method Phaser.TilemapLayer#renderDeltaScroll
* @private
*/
Phaser.TilemapLayer.prototype.renderDeltaScroll = function (shiftX, shiftY) {

    var scrollX = this._mc.scrollX;
    var scrollY = this._mc.scrollY;

    var renderW = this.canvas.width;
    var renderH = this.canvas.height;

    var tw = this._mc.tileWidth;
    var th = this._mc.tileHeight;

    // Only cells with coordinates in the "plus" formed by `left <= x <= right` OR `top <= y <= bottom` are drawn. These coordinates may be outside the layer bounds.

    // Start in pixels
    var left = 0;
    var right = -tw;
    var top = 0;
    var bottom = -th;

    if (shiftX < 0) // layer moving left, damage right
    {
        left = renderW + shiftX; // shiftX neg.
        right = renderW - 1;
    }
    else if (shiftX > 0)
    {
        // left -> 0
        right = shiftX;
    }

    if (shiftY < 0) // layer moving down, damage top
    {
        top = renderH + shiftY; // shiftY neg.
        bottom = renderH - 1;
    }
    else if (shiftY > 0)
    {
        // top -> 0
        bottom = shiftY;
    }

    this.shiftCanvas(this.context, shiftX, shiftY);

    // Transform into tile-space
    left = Math.floor((left + scrollX) / tw);
    right = Math.floor((right + scrollX) / tw);
    top = Math.floor((top + scrollY) / th);
    bottom = Math.floor((bottom + scrollY) / th);

    if (left <= right)
    {
        // Clear left or right edge
        this.context.clearRect(((left * tw) - scrollX), 0, (right - left + 1) * tw, renderH);

        var trueTop = Math.floor((0 + scrollY) / th);
        var trueBottom = Math.floor((renderH - 1 + scrollY) / th);
        this.renderRegion(scrollX, scrollY, left, trueTop, right, trueBottom);
    }

    if (top <= bottom)
    {
        // Clear top or bottom edge
        this.context.clearRect(0, ((top * th) - scrollY), renderW, (bottom - top + 1) * th);

        var trueLeft = Math.floor((0 + scrollX) / tw);
        var trueRight = Math.floor((renderW - 1 + scrollX) / tw);
        this.renderRegion(scrollX, scrollY, trueLeft, top, trueRight, bottom);
    }

};

/**
* Clear and render the entire canvas.
*
* @method Phaser.TilemapLayer#renderFull
* @private
*/
Phaser.TilemapLayer.prototype.renderFull = function () {
    
    var scrollX = this._mc.scrollX;
    var scrollY = this._mc.scrollY;

    var renderW = this.canvas.width;
    var renderH = this.canvas.height;

    var tw = this._mc.tileWidth;
    var th = this._mc.tileHeight;

    var left = Math.floor(scrollX / tw);
    var right = Math.floor((renderW - 1 + scrollX) / tw);
    var top = Math.floor(scrollY / th);
    var bottom = Math.floor((renderH - 1 + scrollY) / th);

    this.context.clearRect(0, 0, renderW, renderH);

    this.renderRegion(scrollX, scrollY, left, top, right, bottom);

};

/**
* Renders the tiles to the layer canvas and pushes to the display.
*
* @method Phaser.TilemapLayer#render
* @protected
*/
Phaser.TilemapLayer.prototype.render = function () {

    var redrawAll = false;

    if (!this.visible)
    {
        return;
    }

    this.context.save();

    if (this.dirty || this.layer.dirty)
    {
        this.layer.dirty = false;
        redrawAll = true;
    }

    var renderWidth = this.canvas.width; // Use Sprite.width/height?
    var renderHeight = this.canvas.height;

    //  Scrolling bias; whole pixels only
    var scrollX = this._scrollX | 0;
    var scrollY = this._scrollY | 0;

    var mc = this._mc;
    var shiftX = mc.scrollX - scrollX; // Negative when scrolling right/down
    var shiftY = mc.scrollY - scrollY;

    if (!redrawAll &&
        shiftX === 0 && shiftY === 0 &&
        mc.renderWidth === renderWidth && mc.renderHeight === renderHeight)
    {
        //  No reason to redraw map, looking at same thing and not invalidated.
        return;
    }

    mc.scrollX = scrollX;
    mc.scrollY = scrollY;

    if (mc.renderWidth !== renderWidth || mc.renderHeight !== renderHeight)
    {
        //  Could support automatic canvas resizing
        mc.renderWidth = renderWidth;
        mc.renderHeight = renderHeight;
    }

    if (this.debug)
    {
        this.context.globalAlpha = this.debugSettings.debugAlpha;

        if (this.debugSettings.forceFullRedraw)
        {
            redrawAll = true;
        }
    }

    if (!redrawAll &&
        this.renderSettings.enableScrollDelta &&
        (Math.abs(shiftX) + Math.abs(shiftY)) < Math.min(renderWidth, renderHeight))
    {
        this.renderDeltaScroll(shiftX, shiftY);
    }
    else
    {
        // Too much change or otherwise requires full render
        this.renderFull();
    }

    if (this.debug)
    {
        this.context.globalAlpha = 1;
        this.renderDebug();
    }

    this.texture.baseTexture.dirty();

    this.dirty = false;

    this.context.restore();

    return true;

};

/**
* Renders a debug overlay on-top of the canvas. Called automatically by render when `debug` is true.
*
* See `debugSettings` for assorted configuration options.
*
* @method Phaser.TilemapLayer#renderDebug
* @private
*/
Phaser.TilemapLayer.prototype.renderDebug = function () {

    var scrollX = this._mc.scrollX;
    var scrollY = this._mc.scrollY;

    var context = this.context;
    var renderW = this.canvas.width;
    var renderH = this.canvas.height;

    var width = this.layer.width;
    var height = this.layer.height;
    var tw = this._mc.tileWidth;
    var th = this._mc.tileHeight;

    var left = Math.floor(scrollX / tw);
    var right = Math.floor((renderW - 1 + scrollX) / tw);
    var top = Math.floor(scrollY / th);
    var bottom = Math.floor((renderH - 1 + scrollY) / th);

    var baseX = (left * tw) - scrollX;
    var baseY = (top * th) - scrollY;

    var normStartX = (left + ((1 << 20) * width)) % width;
    var normStartY = (top + ((1 << 20) * height)) % height;

    var tx, ty, x, y, xmax, ymax;

    context.strokeStyle = this.debugSettings.facingEdgeStroke;

    for (y = normStartY, ymax = bottom - top, ty = baseY;
        ymax >= 0;
        y++, ymax--, ty += th)
    {

        if (y >= height) { y -= height; }

        var row = this.layer.data[y];

        for (x = normStartX, xmax = right - left, tx = baseX;
            xmax >= 0;
            x++, xmax--, tx += tw)
        {

            if (x >= width) { x -= width; }

            var tile = row[x];
            if (!tile || tile.index < 0 || !tile.collides)
            {
                continue;
            }

            if (this.debugSettings.collidingTileOverfill)
            {
                context.fillStyle = this.debugSettings.collidingTileOverfill;
                context.fillRect(tx, ty, this._mc.cw, this._mc.ch);
            }

            if (this.debugSettings.facingEdgeStroke)
            {
                context.beginPath();

                if (tile.faceTop)
                {
                    context.moveTo(tx, ty);
                    context.lineTo(tx + this._mc.cw, ty);
                }

                if (tile.faceBottom)
                {
                    context.moveTo(tx, ty + this._mc.ch);
                    context.lineTo(tx + this._mc.cw, ty + this._mc.ch);
                }

                if (tile.faceLeft)
                {
                    context.moveTo(tx, ty);
                    context.lineTo(tx, ty + this._mc.ch);
                }

                if (tile.faceRight)
                {
                    context.moveTo(tx + this._mc.cw, ty);
                    context.lineTo(tx + this._mc.cw, ty + this._mc.ch);
                }

                context.stroke();
            }
           
        }

    }

};

/**
* Flag controlling if the layer tiles wrap at the edges. Only works if the World size matches the Map size.
*
* @property {boolean} wrap
* @memberof Phaser.TilemapLayer
* @public
* @default false
*/
Object.defineProperty(Phaser.TilemapLayer.prototype, "wrap", {

    get: function () {
        return this._wrap;
    },

    set: function (value) {
        this._wrap = value;
        this.dirty = true;
    }

});

/**
* Scrolls the map horizontally or returns the current x position.
*
* @property {number} scrollX
* @memberof Phaser.TilemapLayer
* @public
*/
Object.defineProperty(Phaser.TilemapLayer.prototype, "scrollX", {

    get: function () {
        return this._scrollX;
    },

    set: function (value) {
        this._scrollX = value;
    }

});

/**
* Scrolls the map vertically or returns the current y position.
*
* @property {number} scrollY
* @memberof Phaser.TilemapLayer
* @public
*/
Object.defineProperty(Phaser.TilemapLayer.prototype, "scrollY", {

    get: function () {
        return this._scrollY;
    },

    set: function (value) {
        this._scrollY = value;
    }

});

/**
* The width of the collision tiles (in pixels).
*
* @property {integer} collisionWidth
* @memberof Phaser.TilemapLayer
* @public
*/
Object.defineProperty(Phaser.TilemapLayer.prototype, "collisionWidth", {

    get: function () {
        return this._mc.cw;
    },

    set: function (value) {
        this._mc.cw = value | 0;
        this.dirty = true;
    }

});

/**
* The height of the collision tiles (in pixels).
*
* @property {integer} collisionHeight
* @memberof Phaser.TilemapLayer
* @public
*/
Object.defineProperty(Phaser.TilemapLayer.prototype, "collisionHeight", {

    get: function () {
        return this._mc.ch;
    },

    set: function (value) {
        this._mc.ch = value | 0;
        this.dirty = true;
    }

});

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Phaser.TilemapParser parses data objects from Phaser.Loader that need more preparation before they can be inserted into a Tilemap.
*
* @class Phaser.TilemapParser
*/
Phaser.TilemapParser = {

    /**
    * Parse tilemap data from the cache and creates a Tilemap object.
    *
    * @method Phaser.TilemapParser.parse
    * @param {Phaser.Game} game - Game reference to the currently running game.
    * @param {string} key - The key of the tilemap in the Cache.
    * @param {number} [tileWidth=32] - The pixel width of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param {number} [tileHeight=32] - The pixel height of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param {number} [width=10] - The width of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    * @param {number} [height=10] - The height of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    * @return {object} The parsed map object.
    */
    parse: function (game, key, tileWidth, tileHeight, width, height) {

        if (tileWidth === undefined) { tileWidth = 32; }
        if (tileHeight === undefined) { tileHeight = 32; }
        if (width === undefined) { width = 10; }
        if (height === undefined) { height = 10; }

        if (key === undefined)
        {
            return this.getEmptyData();
        }

        if (key === null)
        {
            return this.getEmptyData(tileWidth, tileHeight, width, height);
        }

        var map = game.cache.getTilemapData(key);

        if (map)
        {
            if (map.format === Phaser.Tilemap.CSV)
            {
                return this.parseCSV(key, map.data, tileWidth, tileHeight);
            }
            else if (!map.format || map.format === Phaser.Tilemap.TILED_JSON)
            {
                return this.parseTiledJSON(map.data);
            }
        }
        else
        {
            console.warn('Phaser.TilemapParser.parse - No map data found for key ' + key);
        }

    },

    /**
    * Parses a CSV file into valid map data.
    *
    * @method Phaser.TilemapParser.parseCSV
    * @param {string} data - The CSV file data.
    * @param {number} [tileWidth=32] - The pixel width of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param {number} [tileHeight=32] - The pixel height of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @return {object} Generated map data.
    */
    parseCSV: function (key, data, tileWidth, tileHeight) {

        var map = this.getEmptyData();

        //  Trim any rogue whitespace from the data
        data = data.trim();

        var output = [];
        var rows = data.split("\n");
        var height = rows.length;
        var width = 0;

        for (var y = 0; y < rows.length; y++)
        {
            output[y] = [];

            var column = rows[y].split(",");

            for (var x = 0; x < column.length; x++)
            {
                output[y][x] = new Phaser.Tile(map.layers[0], parseInt(column[x], 10), x, y, tileWidth, tileHeight);
            }

            if (width === 0)
            {
                width = column.length;
            }
        }

        map.format = Phaser.Tilemap.CSV;
        map.name = key;
        map.width = width;
        map.height = height;
        map.tileWidth = tileWidth;
        map.tileHeight = tileHeight;
        map.widthInPixels = width * tileWidth;
        map.heightInPixels = height * tileHeight;

        map.layers[0].width = width;
        map.layers[0].height = height;
        map.layers[0].widthInPixels = map.widthInPixels;
        map.layers[0].heightInPixels = map.heightInPixels;
        map.layers[0].data = output;

        return map;

    },

    /**
    * Returns an empty map data object.
    *
    * @method Phaser.TilemapParser.getEmptyData
    * @return {object} Generated map data.
    */
    getEmptyData: function (tileWidth, tileHeight, width, height) {

        var map = {};

        map.width = 0;
        map.height = 0;
        map.tileWidth = 0;
        map.tileHeight = 0;

        if (typeof tileWidth !== 'undefined' && tileWidth !== null) { map.tileWidth = tileWidth; }
        if (typeof tileHeight !== 'undefined' && tileHeight !== null) { map.tileHeight = tileHeight; }
        if (typeof width !== 'undefined' && width !== null) { map.width = width; }
        if (typeof height !== 'undefined' && height !== null) { map.height = height; }

        map.orientation = 'orthogonal';
        map.version = '1';
        map.properties = {};
        map.widthInPixels = 0;
        map.heightInPixels = 0;

        var layers = [];

        var layer = {

            name: 'layer',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            widthInPixels: 0,
            heightInPixels: 0,
            alpha: 1,
            visible: true,
            properties: {},
            indexes: [],
            callbacks: [],
            bodies: [],
            data: []

        };

        //  fill with nulls?

        layers.push(layer);

        map.layers = layers;
        map.images = [];
        map.objects = {};
        map.collision = {};
        map.tilesets = [];
        map.tiles = [];

        return map;

    },

    /**
    * Parses a Tiled JSON file into valid map data.
    * @method Phaser.TilemapParser.parseJSON
    * @param {object} json - The JSON map data.
    * @return {object} Generated and parsed map data.
    */
    parseTiledJSON: function (json) {

        if (json.orientation !== 'orthogonal')
        {
            console.warn('TilemapParser.parseTiledJSON - Only orthogonal map types are supported in this version of Phaser');
            return null;
        }

        //  Map data will consist of: layers, objects, images, tilesets, sizes
        var map = {};

        map.width = json.width;
        map.height = json.height;
        map.tileWidth = json.tilewidth;
        map.tileHeight = json.tileheight;
        map.orientation = json.orientation;
        map.format = Phaser.Tilemap.TILED_JSON;
        map.version = json.version;
        map.properties = json.properties;
        map.widthInPixels = map.width * map.tileWidth;
        map.heightInPixels = map.height * map.tileHeight;

        //  Tile Layers
        var layers = [];

        for (var i = 0; i < json.layers.length; i++)
        {
            if (json.layers[i].type !== 'tilelayer')
            {
                continue;
            }

            var layer = {

                name: json.layers[i].name,
                x: json.layers[i].x,
                y: json.layers[i].y,
                width: json.layers[i].width,
                height: json.layers[i].height,
                widthInPixels: json.layers[i].width * json.tilewidth,
                heightInPixels: json.layers[i].height * json.tileheight,
                alpha: json.layers[i].opacity,
                visible: json.layers[i].visible,
                properties: {},
                indexes: [],
                callbacks: [],
                bodies: []

            };

            if (json.layers[i].properties)
            {
                layer.properties = json.layers[i].properties;
            }

            var x = 0;
            var row = [];
            var output = [];
            var rotation, flipped, flippedVal, gid;

            //  Loop through the data field in the JSON.

            //  This is an array containing the tile indexes, one after the other. -1 = no tile, everything else = the tile index (starting at 1 for Tiled, 0 for CSV)
            //  If the map contains multiple tilesets then the indexes are relative to that which the set starts from.
            //  Need to set which tileset in the cache = which tileset in the JSON, if you do this manually it means you can use the same map data but a new tileset.

            for (var t = 0, len = json.layers[i].data.length; t < len; t++)
            {
                rotation = 0;
                flipped = false;
                gid = json.layers[i].data[t];

                //  If true the current tile is flipped or rotated (Tiled TMX format) 
                if (gid > 0x20000000)
                {
                    flippedVal = 0;

                    // FlippedX
                    if (gid > 0x80000000)
                    {
                        gid -= 0x80000000;
                        flippedVal += 4;
                    }

                    // FlippedY
                    if (gid > 0x40000000)
                    {
                        gid -= 0x40000000;
                        flippedVal += 2;
                    }

                    // FlippedAD
                    if (gid > 0x20000000)
                    {
                        gid -= 0x20000000;
                        flippedVal += 1;
                    }
                   
                    switch (flippedVal)
                    {
                        case 5:
                            rotation = Math.PI/2;
                            break;
                        case 6:
                            rotation = Math.PI;
                            break;
                        case 3:
                            rotation = 3*Math.PI/2;
                            break;
                        case 4:
                            rotation = 0;
                            flipped = true;
                            break;
                        case 7:
                            rotation = Math.PI/2;
                            flipped = true;
                            break;
                        case 2:
                            rotation = Math.PI;
                            flipped = true;
                            break;
                        case 1:
                            rotation = 3*Math.PI/2;
                            flipped = true;
                            break;
                    }
                }

                //  index, x, y, width, height
                if (gid > 0)
                {
                    row.push(new Phaser.Tile(layer, gid, x, output.length, json.tilewidth, json.tileheight));
                    row[row.length - 1].rotation = rotation;
                    row[row.length - 1].flipped = flipped;
                }
                else
                {
                    row.push(new Phaser.Tile(layer, -1, x, output.length, json.tilewidth, json.tileheight));
                }

                x++;

                if (x === json.layers[i].width)
                {
                    output.push(row);
                    x = 0;
                    row = [];
                }
            }

            layer.data = output;

            layers.push(layer);

        }

        map.layers = layers;

        //  Images
        var images = [];

        for (var i = 0; i < json.layers.length; i++)
        {
            if (json.layers[i].type !== 'imagelayer')
            {
                continue;
            }

            var image = {

                name: json.layers[i].name,
                image: json.layers[i].image,
                x: json.layers[i].x,
                y: json.layers[i].y,
                alpha: json.layers[i].opacity,
                visible: json.layers[i].visible,
                properties: {}

            };

            if (json.layers[i].properties)
            {
                image.properties = json.layers[i].properties;
            }

            images.push(image);

        }

        map.images = images;

        //  Tilesets & Image Collections
        var tilesets = [];
        var imagecollections = [];

        for (var i = 0; i < json.tilesets.length; i++)
        {
            //  name, firstgid, width, height, margin, spacing, properties
            var set = json.tilesets[i];

            if (set.image)
            {
                var newSet = new Phaser.Tileset(set.name, set.firstgid, set.tilewidth, set.tileheight, set.margin, set.spacing, set.properties);

                if (set.tileproperties)
                {
                    newSet.tileProperties = set.tileproperties;
                }

                // For a normal sliced tileset the row/count/size information is computed when updated.
                // This is done (again) after the image is set.
                newSet.updateTileData(set.imagewidth, set.imageheight);
                tilesets.push(newSet);
            }
            else
            {
                var newCollection = new Phaser.ImageCollection(set.name, set.firstgid, set.tilewidth, set.tileheight, set.margin, set.spacing, set.properties);
                
                for (var i in set.tiles)
                {
                    var image = set.tiles[i].image;
                    var gid = set.firstgid + parseInt(i, 10);
                    newCollection.addImage(gid, image);
                }

                imagecollections.push(newCollection);
            }

        }

        map.tilesets = tilesets;
        map.imagecollections = imagecollections;

        //  Objects & Collision Data (polylines, etc)
        var objects = {};
        var collision = {};

        function slice (obj, fields) {

            var sliced = {};

            for (var k in fields)
            {
                var key = fields[k];

                if (typeof obj[key] !== 'undefined')
                {
                    sliced[key] = obj[key];
                }
            }

            return sliced;
        }

        for (var i = 0; i < json.layers.length; i++)
        {
            if (json.layers[i].type !== 'objectgroup')
            {
                continue;
            }

            objects[json.layers[i].name] = [];
            collision[json.layers[i].name] = [];

            for (var v = 0, len = json.layers[i].objects.length; v < len; v++)
            {
                //  Object Tiles
                if (json.layers[i].objects[v].gid)
                {
                    var object = {

                        gid: json.layers[i].objects[v].gid,
                        name: json.layers[i].objects[v].name,
                        type: json.layers[i].objects[v].hasOwnProperty("type") ? json.layers[i].objects[v].type : "",
                        x: json.layers[i].objects[v].x,
                        y: json.layers[i].objects[v].y,
                        visible: json.layers[i].objects[v].visible,
                        properties: json.layers[i].objects[v].properties

                    };

                    if (json.layers[i].objects[v].rotation)
                    {
                        object.rotation = json.layers[i].objects[v].rotation;
                    }

                    objects[json.layers[i].name].push(object);
                }
                else if (json.layers[i].objects[v].polyline)
                {
                    var object = {

                        name: json.layers[i].objects[v].name,
                        type: json.layers[i].objects[v].type,
                        x: json.layers[i].objects[v].x,
                        y: json.layers[i].objects[v].y,
                        width: json.layers[i].objects[v].width,
                        height: json.layers[i].objects[v].height,
                        visible: json.layers[i].objects[v].visible,
                        properties: json.layers[i].objects[v].properties

                    };

                    if (json.layers[i].objects[v].rotation)
                    {
                        object.rotation = json.layers[i].objects[v].rotation;
                    }

                    object.polyline = [];

                    //  Parse the polyline into an array
                    for (var p = 0; p < json.layers[i].objects[v].polyline.length; p++)
                    {
                        object.polyline.push([ json.layers[i].objects[v].polyline[p].x, json.layers[i].objects[v].polyline[p].y ]);
                    }

                    collision[json.layers[i].name].push(object);
                    objects[json.layers[i].name].push(object);
                }
                // polygon
                else if (json.layers[i].objects[v].polygon)
                {
                    var object = slice(json.layers[i].objects[v],
                                       ["name", "type", "x", "y", "visible", "rotation", "properties" ]);

                    //  Parse the polygon into an array
                    object.polygon = [];

                    for (var p = 0; p < json.layers[i].objects[v].polygon.length; p++)
                    {
                        object.polygon.push([ json.layers[i].objects[v].polygon[p].x, json.layers[i].objects[v].polygon[p].y ]);
                    }

                    objects[json.layers[i].name].push(object);

                }
                // ellipse
                else if (json.layers[i].objects[v].ellipse)
                {
                    var object = slice(json.layers[i].objects[v],
                                       ["name", "type", "ellipse", "x", "y", "width", "height", "visible", "rotation", "properties" ]);
                    objects[json.layers[i].name].push(object);
                }
                // otherwise it's a rectangle
                else
                {
                    var object = slice(json.layers[i].objects[v],
                                       ["name", "type", "x", "y", "width", "height", "visible", "rotation", "properties" ]);
                    object.rectangle = true;
                    objects[json.layers[i].name].push(object);
                }
            }
        }

        map.objects = objects;
        map.collision = collision;

        map.tiles = [];

        //  Finally lets build our super tileset index
        for (var i = 0; i < map.tilesets.length; i++)
        {
            var set = map.tilesets[i];

            var x = set.tileMargin;
            var y = set.tileMargin;

            var count = 0;
            var countX = 0;
            var countY = 0;

            for (var t = set.firstgid; t < set.firstgid + set.total; t++)
            {
                //  Can add extra properties here as needed
                map.tiles[t] = [x, y, i];

                x += set.tileWidth + set.tileSpacing;

                count++;

                if (count === set.total)
                {
                    break;
                }

                countX++;

                if (countX === set.columns)
                {
                    x = set.tileMargin;
                    y += set.tileHeight + set.tileSpacing;

                    countX = 0;
                    countY++;

                    if (countY === set.rows)
                    {
                        break;
                    }
                }
            }

        }

        // assign tile properties

        var layer;
        var tile;
        var sid;
        var set;

        // go through each of the map layers
        for (var i = 0; i < map.layers.length; i++)
        {
            layer = map.layers[i];

            // rows of tiles
            for (var j = 0; j < layer.data.length; j++)
            {
                row = layer.data[j];

                // individual tiles
                for (var k = 0; k < row.length; k++)
                {
                    tile = row[k];

                    if (tile.index < 0)
                    {
                        continue;
                    }

                    // find the relevant tileset

                    sid = map.tiles[tile.index][2];
                    set = map.tilesets[sid];

                    // if that tile type has any properties, add them to the tile object

                    if (set.tileProperties && set.tileProperties[tile.index - set.firstgid])
                    {
                        tile.properties = Phaser.Utils.mixin(set.tileProperties[tile.index - set.firstgid], tile.properties);
                    }
                }
            }
        }

        return map;

    }

};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Tile set is a combination of an image containing the tiles and collision data per tile.
*
* Tilesets are normally created automatically when Tiled data is loaded.
*
* @class Phaser.Tileset
* @constructor
* @param {string} name - The name of the tileset in the map data.
* @param {integer} firstgid - The first tile index this tileset contains.
* @param {integer} [width=32] - Width of each tile (in pixels).
* @param {integer} [height=32] - Height of each tile (in pixels).
* @param {integer} [margin=0] - The margin around all tiles in the sheet (in pixels).
* @param {integer} [spacing=0] - The spacing between each tile in the sheet (in pixels).
* @param {object} [properties={}] - Custom Tileset properties.
*/
Phaser.Tileset = function (name, firstgid, width, height, margin, spacing, properties) {

    if (width === undefined || width <= 0) { width = 32; }
    if (height === undefined || height <= 0) { height = 32; }
    if (margin === undefined) { margin = 0; }
    if (spacing === undefined) { spacing = 0; }

    /**
    * The name of the Tileset.
    * @property {string} name
    */
    this.name = name;

    /**
    * The Tiled firstgid value.
    * This is the starting index of the first tile index this Tileset contains.
    * @property {integer} firstgid
    */
    this.firstgid = firstgid | 0;

    /**
    * The width of each tile (in pixels).
    * @property {integer} tileWidth
    * @readonly
    */
    this.tileWidth = width | 0;

    /**
    * The height of each tile (in pixels).
    * @property {integer} tileHeight
    * @readonly
    */
    this.tileHeight = height | 0;

    /**
    * The margin around the tiles in the sheet (in pixels).
    * Use `setSpacing` to change.
    * @property {integer} tileMarge
    * @readonly
    */
    // Modified internally
    this.tileMargin = margin | 0;

    /**
    * The spacing between each tile in the sheet (in pixels).
    * Use `setSpacing` to change.
    * @property {integer} tileSpacing
    * @readonly
    */
    this.tileSpacing = spacing | 0;

    /**
    * Tileset-specific properties that are typically defined in the Tiled editor.
    * @property {object} properties
    */
    this.properties = properties || {};

    /**
    * The cached image that contains the individual tiles. Use {@link Phaser.Tileset.setImage setImage} to set.
    * @property {?object} image
    * @readonly
    */
    // Modified internally
    this.image = null;

    /**
    * The number of tile rows in the the tileset.
    * @property {integer}
    * @readonly
    */
    // Modified internally
    this.rows = 0;

    /**
    * The number of tile columns in the tileset.
    * @property {integer} columns
    * @readonly
    */
    // Modified internally
    this.columns = 0;

    /**
    * The total number of tiles in the tileset.
    * @property {integer} total
    * @readonly
    */
    // Modified internally
    this.total = 0;

    /**
    * The look-up table to specific tile image offsets.
    * The coordinates are interlaced such that it is [x0, y0, x1, y1 .. xN, yN] and the tile with the index of firstgid is found at indices 0/1.
    * @property {integer[]} drawCoords
    * @private
    */
    this.drawCoords = [];

};

Phaser.Tileset.prototype = {

    /**
    * Draws a tile from this Tileset at the given coordinates on the context.
    *
    * @method Phaser.Tileset#draw
    * @public
    * @param {CanvasRenderingContext2D} context - The context to draw the tile onto.
    * @param {number} x - The x coordinate to draw to.
    * @param {number} y - The y coordinate to draw to.
    * @param {integer} index - The index of the tile within the set to draw.
    */
    draw: function (context, x, y, index) {

        //  Correct the tile index for the set and bias for interlacing
        var coordIndex = (index - this.firstgid) << 1;

        if (coordIndex >= 0 && (coordIndex + 1) < this.drawCoords.length)
        {
            context.drawImage(
                this.image,
                this.drawCoords[coordIndex],
                this.drawCoords[coordIndex + 1],
                this.tileWidth,
                this.tileHeight,
                x,
                y,
                this.tileWidth,
                this.tileHeight
            );
        }

    },

    /**
    * Returns true if and only if this tileset contains the given tile index.
    *
    * @method Phaser.Tileset#containsTileIndex
    * @public
    * @return {boolean} True if this tileset contains the given index.
    */
    containsTileIndex: function (tileIndex) {

        return (
            tileIndex >= this.firstgid &&
            tileIndex < (this.firstgid + this.total)
        );

    },

    /**
    * Set the image associated with this Tileset and update the tile data.
    *
    * @method Phaser.Tileset#setImage
    * @public
    * @param {Image} image - The image that contains the tiles.
    */
    setImage: function (image) {

        this.image = image;
        this.updateTileData(image.width, image.height);
       
    },

    /**
    * Sets tile spacing and margins.
    *
    * @method Phaser.Tileset#setSpacing
    * @public
    * @param {integer} [margin=0] - The margin around the tiles in the sheet (in pixels).
    * @param {integer} [spacing=0] - The spacing between the tiles in the sheet (in pixels).
    */
    setSpacing: function (margin, spacing) {

        this.tileMargin = margin | 0;
        this.tileSpacing = spacing | 0;

        if (this.image)
        {
            this.updateTileData(this.image.width, this.image.height);
        }

    },

    /**
    * Updates tile coordinates and tileset data.
    *
    * @method Phaser.Tileset#updateTileData
    * @private
    * @param {integer} imageWidth - The (expected) width of the image to slice.
    * @param {integer} imageHeight - The (expected) height of the image to slice.
    */
    updateTileData: function (imageWidth, imageHeight) {

        // May be fractional values
        var rowCount = (imageHeight - this.tileMargin * 2 + this.tileSpacing) / (this.tileHeight + this.tileSpacing);
        var colCount = (imageWidth - this.tileMargin * 2 + this.tileSpacing) / (this.tileWidth + this.tileSpacing);

        if (rowCount % 1 !== 0 || colCount % 1 !== 0)
        {
            console.warn("Phaser.Tileset - image tile area is not an even multiple of tile size");
        }

        // In Tiled a tileset image that is not an even multiple of the tile dimensions
        // is truncated - hence the floor when calculating the rows/columns.
        rowCount = Math.floor(rowCount);
        colCount = Math.floor(colCount);

        if ((this.rows && this.rows !== rowCount) || (this.columns && this.columns !== colCount))
        {
            console.warn("Phaser.Tileset - actual and expected number of tile rows and columns differ");
        }

        this.rows = rowCount;
        this.columns = colCount;
        this.total = rowCount * colCount;

        this.drawCoords.length = 0;

        var tx = this.tileMargin;
        var ty = this.tileMargin;

        for (var y = 0; y < this.rows; y++)
        {
            for (var x = 0; x < this.columns; x++)
            {
                this.drawCoords.push(tx);
                this.drawCoords.push(ty);
                tx += this.tileWidth + this.tileSpacing;
            }

            tx = this.tileMargin;
            ty += this.tileHeight + this.tileSpacing;
        }

    }

};

Phaser.Tileset.prototype.constructor = Phaser.Tileset;
