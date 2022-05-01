/**
* PhotoSwipe Deep Zoom plugin
* v1.1.2
* by Dmytro Semenov
* https://github.com/dimsemenov/photoswipe-deep-zoom-plugin
*/
function getTileKey(x, y, z) {
  return x + '_' + y + '_' + z;
}

function slideIsTiled(slide) {
  if (slide.data.tileUrl) {
    return true;
  }
  return false;
}

const LOAD_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
};

const DECODING_STATE = {
  IDLE: 'idle',
  DECODING: 'decoding',
  DECODED: 'decoded'
};

class TileImage {
  constructor(url, x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.key = getTileKey(x, y, z);

    this.url = url;
    this.hasParent = false; // the Image has an Tile that uses it
    this.loadState = LOAD_STATE.IDLE;
    this.decodingState = DECODING_STATE.IDLE;
    this.styles = undefined;
   
    this._createImage();
  }

  isLoaded() {
    return this.loadState === LOAD_STATE.LOADED;
  }

  isDecoded() {
    return this.decodingState === DECODING_STATE.DECODED;
  }

  setStyles(styles) {
    if (styles) {
      this.styles = styles;
      for(let name in this.styles) {
        this.imageElement.style[name] = this.styles[name];
      }
    }
  }

  tileDetached() {
    this.hasParent = false;
    if (this.decodingState !== DECODING_STATE.DECODING) {
      this.decodingState = DECODING_STATE.IDLE;
    }

  }

  tileAttached() {
    this.hasParent = true;
  }

  _createImage() {
    this.imageElement = new Image();
    this.imageElement.setAttribute('role', 'presentation');
    this.imageElement.setAttribute('alt', '');
    this.setStyles(this.styles);
  }

  decode() {
    if (this.loadState === LOAD_STATE.LOADED) {
      // if image is loaded and decoded, just exit
      if (this.decodingState === DECODING_STATE.DECODED) {
        this._onDecoded();
        return;
      }

      // if image is decoding, just wait for it
      if (this.decodingState === DECODING_STATE.DECODING) {
        return;
      }

      // start decoding
      if (this.decodingState === DECODING_STATE.IDLE) {
        this._startDecode();
      }
    } else if (this.loadState === LOAD_STATE.LOADING) {
      if (this.decodingState === DECODING_STATE.DECODING) {
        // if image is decoding, just wait for it
        return;
      }
    } else {
      // this.loadState === LOAD_STATE.IDLE || this.loadState === LOAD_STATE.ERROR
      
      // Image is not loaded yet, or needs a reload
      this._startDecode();
    }
  }

  _startDecode() {
    if (this.loadState === LOAD_STATE.ERROR) {
      this._createImage();
    }

    if (!this.imageElement.src) {
      this.imageElement.src = this.url;
    }

    this.decodingState = DECODING_STATE.DECODING;
    if (this.loadState !== LOAD_STATE.LOADED) {
      this.loadState = LOAD_STATE.LOADING;
    }
    if ('decode' in this.imageElement) {
      this.imageElement.decode().then(() => {
        this._onDecoded();
      }).catch((error) => {
        this._onDecodeError();
      });
    } else {
      if (this.loadState === LOAD_STATE.LOADED) {
        this._onDecoded();
      } else {
        this.imageElement.onload = () => {
          this._onDecoded();
        };
        this.imageElement.onerror = (e) => {
          this._onDecodeError();
        };
      }
    }
  }

  _onDecoded() {
    // If image has no parent, it won't be added to dom, 
    // thus it's not guaranteed that it's decoded
    this.decodingState = this.hasParent 
      ? DECODING_STATE.DECODED
      : DECODING_STATE.IDLE;
    
    this.loadState = LOAD_STATE.LOADED;

    if (this.onDecoded) {
      this.onDecoded(this);
    }
  }

  _onDecodeError() {
    this.decodingState = DECODING_STATE.IDLE;
    this.loadState = LOAD_STATE.ERROR;
    if (this.onError) {
      this.onError(this);
    }
  }

  destroy() {
    if (this.imageElement) {
      this.imageElement.onload = null;
      this.imageElement.onerror = null;
      this.imageElement = null;
    }
    this.onError = null;
    this.onDecoded = null;
  }

  
}

class Tile {
  constructor(x, y, z, tiler) {
    this.tiler = tiler;
    this.tiledLayer = tiler.getLayer(z);

    this.x = x;
    this.y = y;
    this.z = z;

    this.isPlaceholder = false;
    this.isInActiveLayer = false;
    this.isAttached = false;
    this.isDestroyed = false;
    this.isFullyDisplayed = false;
  }

  _initImage() {
    if (this.tileImage) {
      return;
    }

    const imageStyles = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 'auto',
      height: 'auto',
      pointerEvents: 'none',
      // This helps with scaling up images in safari
      imageRendering: '-webkit-optimize-contrast'
    };

    imageStyles.willChange = 'transform';

    // debug
    if (window.pswpDebug && window.pswpDebug.display_layer_borders) {
      let colors = ['red','blue','green','white','yellow','purple','black','orange','violet'];
      colors = colors.concat(colors).concat(colors).concat(colors).concat(colors);
      imageStyles.outline = 'solid 5px ' + colors[this.z];
      imageStyles.outlineOffset = '-5px';
    }

    // size
    const tileSize = this.tiler.getBaseTileWidth(this.z);
    const overlap = this.tiler.overlap;
    const xOffset = (this.x > 0 ? this.x * tileSize - overlap : 0);
    const yOffset = (this.y > 0 ? this.y * tileSize - overlap : 0);
    imageStyles.transform = 'translate(' + xOffset + 'px, ' + yOffset + 'px)';

    this.tileImage = this.tiler.manager.decodingQueue.getOrCreateImage(
      this.tiler.getTileUrl(this.x, this.y, this.z),
      this.x,
      this.y,
      this.z
    );
    if (this.isInActiveLayer && this.isPlaceholder) {
      this.tileImage.isLowRes = true;
    }
    this.tileImage.setStyles(imageStyles);
  }

  attach() {
    if (!this.isAttached) {
      this.isAttached = true;
      this.load();
    }
  }

  detach() {
    if (this.isAttached) {
      this.tileImage.tileDetached();
      if (this.tileImage.imageElement && this.tileImage.imageElement.parentNode) {
        this.tileImage.imageElement.remove();
      }

      this.isAttached = false;
      this.isFading = false;
      this.isFullyDisplayed = false;
    }

    if (this.fadeRaf) {
      cancelAnimationFrame(this.fadeRaf);
      this.fadeRaf = null;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  canBeDisplayed() {
    return this.tileImage && this.tileImage.loadState === LOAD_STATE.LOADED;  }

  destroy() {
    this.detach();

    this.placeholderTile = null;

    this.isDestroyed = true;
  }

  load() {
    this._initImage();
    this.tileImage.tileAttached();
    this.tileImage.onDecoded = () => {
      this._onImageDecoded();
    };
    this.tileImage.onError = () => {
      this._onImageError();
    };
    this.tiler.manager.decodingQueue.loadImage(this.tileImage);
  }

  _onImageDecoded(e) {
    this._addToDOM();
  }

  _onImageError() {
    // remove tile image from cache
    this.tiler.manager.decodingQueue.cache.removeByKey(this.tileImage.key);
  }

  _addToDOM() {
    if (!this.isAttached) {
      // since decoding is async, it may happen after tile is detached
      return;
    }

    // todo
    const fadeInDuration = this.tiler.options.fadeInDuration;

    if (this.tileImage.imageElement.parentNode) {
      return;
    }

    if (!fadeInDuration 
        || this.tiledLayer.isLowRes 
        || this.isPlaceholder) {
      this.tileImage.imageElement.style.opacity = 1;
      this.tileImage.imageElement.style.transition = 'none';
      this.tiledLayer.addTileToDOMWithRaf(this, () => {
        this.isFullyDisplayed = true;
        this.triggerDisplayed();
      });
      return;
    }

    this.isFading = true;

    this.tileImage.imageElement.style.opacity = 0;
    this.tileImage.imageElement.style.transition = 'opacity ' + fadeInDuration + 'ms linear';
    this.tiledLayer.addTileToDOMWithRaf(this, () => {
      this.fadeRaf = requestAnimationFrame(() => {
        this.tileImage.imageElement.style.opacity = 1;
        this.timeout = setTimeout(() => {
          if (this.isAttached) {
            this.timeout = null;
            this.tileImage.imageElement.transition = 'none';
            this.isFading = false;
            this.isFullyDisplayed = true;
            this.triggerDisplayed();
          }
        }, fadeInDuration + 200);
        this.fadeRaf = null;
      });
    });
  }

  triggerDisplayed() {
    this.tiler.onTileDisplayed(this);
  }
}

class TileImagesCache {
  constructor(limit) {
    this.limit = limit;
    this._items = [];
  }

  /**
   * @param {TileImage} tileImage 
   */
  add(tileImage) {
    // no need to destroy, as we're just moving the item to the end of arr
    this.removeByKey(tileImage.key);
    this._items.push(tileImage);

    if (this._items.length > this.limit) {

      // Destroy the first image that has no parent and isn't from low-res layer
      const indexToRemove = this._items.findIndex(item => !item.hasParent && !item.isLowRes);
      if (indexToRemove !== -1) {
        let removedItem = this._items.splice(indexToRemove, 1)[0];
        removedItem.destroy();
      }
    }
  }

  /**
   * Removes an image from cache, does not destroy() it, just removes.
   * 
   * @param {String} key 
   */
  removeByKey(key) {
    const indexToRemove = this._items.findIndex(item => item.key === key);
    if (indexToRemove !== -1) {
      this._items.splice(indexToRemove, 1);
    }
  }

  getByKey(key) {
    return this._items.find(tileImage => tileImage.key === key);
  }

  destroy() {
    this._items = null;
  }
}

class DecodingQueue {
  constructor(options) {
    this.images = [];
    this.maxDecodingCount = options.maxDecodingCount;
    this.minBatchRequestCount = options.minBatchRequestCount; 
    this.cacheLimit = options.cacheLimit;

    this._imagesDecodingCount = 0;
    this.cache = new TileImagesCache(this.cacheLimit);
  }

  /**
   * @param {TileImage} tileImage 
   */
  cacheImage(tileImage) {
    if (tileImage.loadState !== LOAD_STATE.ERROR) {
      this.cache.add(tileImage);
    }
  }

  hasLoadedImage(x, y, z) {
    let image = this.getImage(x, y, z);

    if (image && image.loadState === LOAD_STATE.LOADED) {
      return true;
    }

    return false;
  }

  getImage(x, y, z) {
    let image = this.cache.getByKey( getTileKey(x, y, z) );
    if (!image) {
      image = this.images.find((item) => {
        return item.x === x && item.y === y && item.z === z;
      });
    }
    return image;
  }

  getOrCreateImage(url, x, y, z) {
    let image = this.getImage(x, y, z);

    if (!image) {
      image = new TileImage(url, x, y, z);
    }

    return image;
  }

  /**
   * 
   * @param {TileImage} imag
   */
  loadImage(image) {
    // The queue already contains this image
    if (this.images.includes(image)) {
      return;
    }

    this.images.push(image);

    if (!this._rafLoop) {
      this.refresh();
    }
  }

  refresh() {
    this._imagesDecodingCount = 0;
    this._imagesLoadingCount = 0;

    this.images = this.images.filter((image) => {
      if (image.loadState === LOAD_STATE.ERROR) {
        // remove if loaded with an error
        return false;
      }
      
      if (image.loadState === LOAD_STATE.LOADED && image.decodingState === DECODING_STATE.DECODED) {
        // remove if image is fully loaded and decoded
        return false;
      }

      if (!image.hasParent && image.decodingState === DECODING_STATE.IDLE) {
        // image not started decoding yet, and has no parent Tile that is attached,
        // we can safely remove it from queue
        return false;
      }

      if (image.loadState === LOAD_STATE.LOADING) {
        this._imagesLoadingCount++;
      }

      if (image.decodingState === DECODING_STATE.DECODING) {
        this._imagesDecodingCount++;
        return true;
      } 

      return true;
    });

    // Decode images that were loaded before, 
    // but then were removed, and now are added back
    this.images.forEach((image) => {
      if (image.hasParent 
        && image.decodingState === DECODING_STATE.IDLE
        && image.loadState === LOAD_STATE.LOADED) {
        // Instantly decode low-res images ignoring max count
        if (this._imagesDecodingCount < this.maxDecodingCount 
            || image.isLowRes) {
          this._decodeImage(image);
        }
      }
    });

    // Make sure we run requests simultaneously
    if (this._imagesLoadingCount < this.minBatchRequestCount) {
      // This should send network requests to load images
      this.images.forEach((image) => {
        if (image.hasParent 
          && image.decodingState !== DECODING_STATE.DECODING
          && this._imagesDecodingCount < this.maxDecodingCount) {
          this._decodeImage(image);
        }
      });
    }
    

    if (this.images.length === 0) {
      this.stop();
    } else {
      this._loop();
    }
  }

  _decodeImage(image) {
    this._imagesDecodingCount++;
    image.decode();
    this.cacheImage(image);
  }

  _loop() {
    this._rafLoop = requestAnimationFrame(() => {
      this.refresh();
    });
  }

  stop() {
    if (this._rafLoop) {
      cancelAnimationFrame(this._rafLoop);
      this._rafLoop = null;
    }
  }
  

  /**
   * Add to queue
   * 
   * @param {Array} tiles 
   */
  add(tiles) {
    const tilesThatWereLoadedBefore = [];
    const activeLayerTiles = [];
    const otherTiles = [];

    // todo: make tiles load from center?

    tiles.forEach((tile) => {
      if (tile.imageLoaded || tile.imageLoading) {
        tilesThatWereLoadedBefore.push(tile);
      } else if(tile.isInActiveLayer) {
        activeLayerTiles.push(tile);
      } else {
        otherTiles.push(tile);
      }
    });

    tilesThatWereLoadedBefore.sort(function(tile1, tile2) {
      return tile1.z - tile2.z;
    });

    this.images = this.images
      .concat(tilesThatWereLoadedBefore)
      .concat(activeLayerTiles)
      .concat(otherTiles);
  }

  clear() {
    this.images = [];
    this.stop();
  }

  destroy() {
    this.clear();
    this.cache.destroy();
    this.cache = undefined;
    this.images = [];
  }
}

class TilesManager {
  constructor(tiler) {
    this.tiler = tiler;
    this.tiles = {};
    this.decodingQueue = new DecodingQueue(tiler.options);
  }

  getOrCreateTile(x, y, z) {
    const key = getTileKey(x, y, z);
    let tile = this.getTileByKey(key);
    if (!tile) {
      tile = new Tile(x, y, z, this.tiler);
    }
    this.tiles[key] = tile;
    return tile;
  }

  getTileByKey(key) {
    return this.tiles[key];
  }

  getTile(x, y, z) {
    return this.getTileByKey( getTileKey(x, y, z) );
  }

  _detachTile(x, y, z) {
    const key = getTileKey(x, y, z);
    if (this.tiles[key]) {
      this.tiles[key].detach();
      delete this.tiles[key];
    }
  }

  /**
   * Show tile below the main one
   * (it's generally displayed until the main tile is loaded)
   * 
   * @param {Integer} x 
   * @param {Integer} y 
   * @param {Integer} z 
   * @returns Tile|false
   */
  showPlaceholderTileBelow(x, y, z) {
    x = Math.floor(x / 2);
    y = Math.floor(y / 2);
    z -= 1;

    if (z < 0) {
      return false;
    }

    const parentImage = this.decodingQueue.getImage(x, y, z);
    if (parentImage && parentImage.isLoaded()) {
      this.createPlaceholderTile(x, y, z);
      if (parentImage.isDecoded()) {
        return true;
      }
    }

    return this.showPlaceholderTileBelow(x, y, z);
  }

  createPlaceholderTile(x, y, z) {
    const tile = this.getOrCreateTile(x, y, z);
    tile.isPlaceholder = true;
  }


  showPlaceholderTilesAbove(x, y, z, maxZ) {
    z += 1;

    if (z > maxZ) {
      return false;
    }

    let visibleChildTilesCount = 0;
    for (let childX = x * 2; childX < (x * 2 + 2); childX++) {
			for (let childY = y * 2; childY < (y * 2 + 2); childY++) {
        let childImage = this.decodingQueue.getImage(childX, childY, z);
        if (childImage && childImage.isLoaded()) {
          this.createPlaceholderTile(childX, childY, z);
          if (childImage.isDecoded()) {
            visibleChildTilesCount++;
          }
        }
			}
		}

    // if all 4 tiles are visible - it means viewport is covered,
    // otherwise try to display a layer above:
    if (visibleChildTilesCount < 4) {
      for (let childX = x * 2; childX < (x * 2 + 2); childX++) {
        for (let childY = y * 2; childY < (y * 2 + 2); childY++) {
          this.showPlaceholderTilesAbove(childX, childY, z, maxZ);
        }
      }
    }
  }

  displayTiles() {
    let tilesToAttach = [];
    for(let key in this.tiles) {
      let tile = this.tiles[key];
      if (tile.isInActiveLayer || tile.isPlaceholder) {
        if (tile.isAttached) ; else {
          tilesToAttach.push(tile);
        }
      }
    }


    const tilesThatWereLoadedBefore = [];
    const activeLayerTiles = [];
    const otherTiles = [];

    tilesToAttach.forEach((tile) => {
      if (tile.imageLoaded || tile.imageLoading) {
        tilesThatWereLoadedBefore.push(tile);
      } else if(tile.isInActiveLayer) {
        activeLayerTiles.push(tile);
      } else {
        otherTiles.push(tile);
      }
    });

    tilesThatWereLoadedBefore.sort(function(tile1, tile2) {
      return tile1.z - tile2.z;
    });

    tilesToAttach = [];
    tilesToAttach = tilesToAttach
      .concat(tilesThatWereLoadedBefore)
      .concat(activeLayerTiles)
      .concat(otherTiles);

    tilesToAttach.forEach((tile) => {
      tile.attach();
      this.decodingQueue.cacheImage(tile.tileImage);
    });
  }

  destroyUnusedTiles() {
    for(let key in this.tiles) {
      let tile = this.tiles[key];
      if (!tile.isPlaceholder && !tile.isInActiveLayer) {
        this._detachTile(tile.x, tile.y, tile.z);
      }
    }
  }

  activeTilesLoaded() {
    for(let key in this.tiles) {
      let tile = this.tiles[key];
      if (tile.isInActiveLayer && !tile.isFullyDisplayed && !tile.isFading) {
        return false;
      }
    }
    return true;
  }

  resetTilesRelations() {
    for(let key in this.tiles) {
      let tile = this.tiles[key];
      tile.isPlaceholder = false;
      tile.isInActiveLayer = false;
    }
  }

  destroy() {
    for(let key in this.tiles) {
      let tile = this.tiles[key];
      tile.destroy();
    }
    this.decodingQueue.destroy();
    //this.queue.destroy();
    this.tiles = {};
  }
}

function getTileCoordinateByPosition(pos, tileSize, maxTiles) {
  let tileCoordinate = Math.floor(pos / tileSize);
  tileCoordinate = Math.max(tileCoordinate, 0);
  tileCoordinate = Math.min(tileCoordinate, maxTiles - 1);
  return tileCoordinate;
}

class TiledLayer {
  /**
   * @param {Tiler}
   * @param {Integer} z             In dzi, each layer (z) item corresponds to folder
   * @param {Number} scale          Layer scale relative to the original (largest) size
   *                                (1 is original image)
   * @param {Number} originalWidth  Total width of the layer (if none tiles are scaled)
   * @param {Number} originalHeight Total height of the layer
   * @param {Integer} numXTiles     Number of horizontal tiles
   * @param {Integer} numYTiles     Number of vertical tiles
   */
  constructor(tiler, z, scale, originalWidth, originalHeight, numXTiles, numYTiles) {
    this.tiler = tiler;
    this.z = z;
    this.scale = scale;
    this.originalWidth = originalWidth;
    this.originalHeight = originalHeight;
    this.numXTiles = numXTiles;
    this.numYTiles = numYTiles;

    this.tileScale = 1;
    this.element = undefined;
    this.preventNewTiles = false;

    this.isActive = false;
  }

  activate() {
    if (!this.isActive) {
      this.isActive = true;

      if (!this.element) {
        this.element = document.createElement('div');
        this.element.className = 'pswp__deepzoom-tiles-container';
        this.element.style.position = 'absolute';
        this.element.style.left = 0;
        this.element.dataset.z = this.z;
        this.element.style.top = 0;

        this.element.style.zIndex = this.z * 10 + 10; // todo: configurable zindex
        this.tiler.slide.container.appendChild(this.element);
      }
    }
  }

  addTileToDOMWithRaf(tile, onAdded) {
    requestAnimationFrame(() => {
      if (tile.isAttached 
          && tile.tileImage.imageElement 
          && !tile.tileImage.imageElement.parentNode) {
        this.element.appendChild(tile.tileImage.imageElement);
        if (onAdded) {
          onAdded();
        }
      }
    });
  }

  updateScale() {
    this.tileScale = this.tiler.width / this.originalWidth;
    if (this.element) {
      this.element.style.transform = 'scale('+this.tileScale+')';
    }
  }

  updateTilesVisibility(isLowRes) {
    if (!this.isActive) {
      return [];
    }

    this.updateScale();
    
    let tileCoordinatesToAttach = this.getTileCoordinatesInViewport();
    
    // mark tiles to attach
    tileCoordinatesToAttach.forEach((coordinate) => {
      let tile = this.tiler.manager.getOrCreateTile(coordinate.x, coordinate.y, this.z);
      tile.isInActiveLayer = true;
      tile.isPlaceholder = isLowRes ? true : false;
      if (!isLowRes) {
        if (!tile.canBeDisplayed() || !tile.isFullyDisplayed) {
          this.tiler.manager.showPlaceholderTileBelow(tile.x, tile.y, tile.z);
          this.tiler.manager.showPlaceholderTilesAbove(tile.x, tile.y, tile.z, this.z + 1);
        }
      }
    });
  }

  getTileCoordinatesInViewport() {
    const { slide } = this.tiler;
    const scale = slide.currZoomLevel / (slide.currentResolution || slide.zoomLevels.initial);

    const tileWidth = this.tiler.getBaseTileHeight(this.z) * this.tileScale * scale;
    const tileHeight = tileWidth;

    const tileLeft = slide.pan.x;
    const tileTop = slide.pan.y;

    const viewportRight = this.tiler.pswp.viewportSize.x;
    const viewportBottom = this.tiler.pswp.viewportSize.y;

    const leftTileX = getTileCoordinateByPosition(-tileLeft, tileWidth, this.numXTiles);
    const rightTileX = getTileCoordinateByPosition(viewportRight - tileLeft, tileWidth, this.numXTiles);

    const topTileY = getTileCoordinateByPosition(-tileTop, tileHeight, this.numYTiles);
    const bottomTileY = getTileCoordinateByPosition(viewportBottom - tileTop, tileHeight, this.numYTiles);

    //const tilesToAttach = [];
    const tileCoordinates = [];
    for(let y = topTileY; y <= bottomTileY; y++) {
      for(let x = leftTileX; x <= rightTileX; x++) {
        tileCoordinates.push({x, y, z: this.z});
      }
    }

    return tileCoordinates;
  }
  

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = undefined;
    }
  }
}

class Tiler {
  constructor(slide, options) {
    this.slide = slide;
    this.data = slide.data;
    this.pswp = slide.pswp;
    this.options = options;

    this.tileSize = this.data.tileSize || options.tileSize;
    this.tileType = this.data.tileType || this.options.tileType || 'deepzoom';
    this.overlap = this.data.tileOverlap || options.tileOverlap || 0;
    this.maxWidth = this.data.maxWidth;
    this.maxHeight = this.data.maxHeight;

    if (this.options.maxTilePixelRatio > 1 && window.devicePixelRatio > 1) {
      this.tilePixelRatio = Math.min(window.devicePixelRatio, this.options.maxTilePixelRatio);
    } else {
      this.tilePixelRatio = 1;
    }

    this.layers = [];

    this.manager = new TilesManager(this);

    this.blockLoading = false;

    this.activeLayer = undefined;
    this.prevActiveLayer = undefined;

    this._prevProps = {};

    if (this.tileType === 'deepzoom') {
      this.setupDeepzoomLayers();
    } else if (this.tileType === 'zoomify') {
      this.setupZoomifyLayers();
    }
    this.createLayers();
  }

  setupDeepzoomLayers() {
    this.minZoomLayer = 0;
    this.maxZoomLayer = Math.ceil( Math.log( Math.max( this.maxWidth, this.maxHeight ) ) / Math.log( 2 ) );
  }

  setupZoomifyLayers() {
    let imageWidth = this.maxWidth;
    let imageHeight = this.maxHeight;

    this._zoomifyLayers = [];
    this._addZoomifyLayer(imageWidth, imageHeight);

    this._totalZoomifyTilesCount = 0;
    while (imageWidth > this.tileSize || imageHeight > this.tileSize) {
      imageWidth = imageWidth / 2;
      imageHeight = imageHeight / 2;
      this._addZoomifyLayer(imageWidth, imageHeight);
    }
    this._zoomifyLayers.reverse();

    this.minZoomLayer = 0;
    this.maxZoomLayer = this._zoomifyLayers.length - 1;
  }

  createLayers() {
    let scale;
    let width;
    let height;

    for(let i = this.minZoomLayer; i <= this.maxZoomLayer; i++) {
      scale = 1 / Math.pow(2, this.maxZoomLayer - i);
      width = Math.ceil(this.maxWidth * scale);
      height = Math.ceil(this.maxHeight * scale);
      
      this.layers.push(new TiledLayer(
        this,
        i,
        scale,
        width,
        height,
        Math.ceil(width / this.getBaseTileWidth(i)),
        Math.ceil(height / this.getBaseTileWidth(i)),
      ));
    }
  }

  getBaseTileWidth(z) {
    return this.tileSize;
  }

  getBaseTileHeight(z) {
    return this.tileSize;
  }

  setSize(width, height, forceUpdate, forceDelay) {
    const { slide } = this;

    const scale = slide.currZoomLevel / (slide.currentResolution || slide.zoomLevels.initial);
    if (scale !== 1) {
      // slide is animating / or zoom gesture is performed
      return;
    }

    // Size of image after it's zoomed
    this.width = width;
    this.height = height;

    let sizeChanged;
    if (width !== this._prevProps.width || height !== this._prevProps.height) {
      sizeChanged = true;
    }
    if (slide.pan.x !== this._prevProps.x || slide.pan.y !== this._prevProps.y) ;

    this._prevProps.width = width;
    this._prevProps.height = height;
    this._prevProps.x = slide.pan.x;
    this._prevProps.y = slide.pan.y;
    
    if (sizeChanged) {
      // Update right away if size is changed to sync with PhotoSwipe core
      this.updateSize();
      if (this._updateSizeRaf) {
        cancelAnimationFrame(this._updateSizeRaf);
        this._updateSizeRaf = undefined;
      }
      return;
    }

    if (this._updateSizeRaf) {
      // update size is already scheduled, just wait
      return;
    }

    this._updateSizeRaf = requestAnimationFrame(() => {
      this._updateSizeRaf = undefined;
      this.updateSize();
    });
  }

  /**
   * Hide the primary image if viewer is zoomed beyond its size.
   * 
   * @returns Boolean True if primary image is visible
   */
  updatePrimaryImageVisibility() {
    if (this.slide.primaryImageWidth
      && this.width) {

      // Do not show tiles if image is smaller than "fit" zoom level
      if (this.width <= Math.round(this.pswp.currSlide.zoomLevels.fit * this.maxWidth)) {
        return true;
      }

      if (this.slide.primaryImageWidth / this.tilePixelRatio >= this.width) {
        return true;
      }
    }

    return false;
  }

  updateSize() {
    const useLowResLayer = this.options.useLowResLayer;

    this.manager.resetTilesRelations();

    let lowResLayer;
    if (useLowResLayer) {
      lowResLayer = this.layers.find((layer) => {
        return layer.originalWidth >= this.tileSize || layer.originalHeight >= this.tileSize;
      });
    }

    const primaryImageVisible = this.updatePrimaryImageVisibility();
    
    if (primaryImageVisible) {
      this.manager.destroyUnusedTiles();
      return;
    }

    // this.slide.image.style.display = 'none';

    // Always display the most optimal layer
    let newActiveLayer = this.layers.find((layer) => {
      return (layer.originalWidth / this.tilePixelRatio) >= this.width;
    });

    if (!newActiveLayer) {
      newActiveLayer = this.layers[this.layers.length - 1];
    }

    this.activeLayer = newActiveLayer;

    this.layers.forEach((layer) => {
      layer.activate();
      if (layer === this.activeLayer) {
        layer.updateTilesVisibility();
      } else if (layer === lowResLayer) {
        layer.updateTilesVisibility(true);
      } else {
        layer.updateScale();
      }
    });

    // Destroy tiles even if loading is blocked,
    // as user can zoom in layer to ridiculous size
    this.manager.destroyUnusedTiles();

    if (!this.blockLoading) {
      this.manager.displayTiles();
    }
  }

  onTileDisplayed(tile) {
    this.setSize(this.width, this.height, false, true);
  }

  getLayer(z) {
    return this.layers.find((layer) => {
      return layer.z === z;
    });
  }

  getTileUrl(x, y, z) {
    if (this.options.getTileUrlFn) {
      return this.options.getTileUrlFn(this.data, x, y, z);
    }

    switch(this.tileType) {
      case 'deepzoom':
        return this.getDeepzoomTileUrl(x, y, z);
      case 'zoomify':
        return this.getZoomifyTileUrl(x, y, z);
      default:
        return false;
    }
  }

  getDeepzoomTileUrl(x, y, z) {
    return (this.data.tileUrl || this.options.tileUrl)
          .replace('{x}', x)
          .replace('{y}', y)
          .replace('{z}', z);
  }
  
  getZoomifyTileUrl(x, y, z) {
    // Zoomify generator keeps up to 256 images per folder
    // based on the Openseadragon implementation https://github.com/openseadragon/openseadragon
    
    // find the absolute tile number
    let tileNumber = 0;
    for (let i = 0; i < z; i++) {
      tileNumber += this._zoomifyLayers[i].xTilesCount * this._zoomifyLayers[i].yTilesCount;
    }
    tileNumber += this._zoomifyLayers[z].xTilesCount * y + x;

    return (this.data.tileUrl || this.options.tileUrl)
          .replace('{zoomify_group}', Math.floor(tileNumber / 256))
          .replace('{x}', x)
          .replace('{y}', y)
          .replace('{z}', z);
  }

  _addZoomifyLayer(layerWidth, layerHeight) {
    this._zoomifyLayers.push({
      xTilesCount: Math.ceil(layerWidth / this.tileSize),
      yTilesCount: Math.ceil(layerHeight / this.tileSize)
    });
  }

  destroy() {
    clearTimeout(this._setSizeTimeout);
    this._setSizeTimeout = undefined;

    this.layers.forEach((layer) => {
      layer.destroy();
    });

    this.manager.destroy();

    if (this._updateLayersRaf) {
      cancelAnimationFrame(this._updateLayersRaf);
    }
  }
}

class DeepZoomUI {
  constructor(pswp, options) {
    this.pswp = pswp;
    this.options = options;
    
    pswp.on('uiRegister', () => {
      if (options.incrementalZoomButtons) {
        this.addButtons();
      }
    });

    pswp.on('imageClickAction', (e) => {
      if (slideIsTiled(pswp.currSlide)) {
        e.preventDefault();
        this.incrementalZoomIn(e.point);
      }
    });

    pswp.on('doubleTapAction', (e) => {
      if (slideIsTiled(pswp.currSlide)) {
        e.preventDefault();
        this.incrementalZoomIn(e.point);
      }
    });


    pswp.on('keydown', (e) => {
      const origEvent = e.originalEvent;
      let action;
      if (origEvent.keyCode === 187) { // = (+)
        action = 'ZoomIn';
      } else if (origEvent.keyCode === 189) { // -
        action = 'ZoomOut';
      }
      
      if (action && !origEvent.metaKey && !origEvent.altKey && !origEvent.ctrlKey) {
        e.preventDefault();
        origEvent.preventDefault();
        this['incremental' + action](false);
      }
    });

    this.adjustPreloaderBehavior();
  }


  addButtons() {
    this.pswp.ui.registerElement({
      name: 'incrementalZoomIn',
      title: 'Zoom In',
      order: 10,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M17.426 19.926a6 6 0 1 1 1.5-1.5L23 22.5 21.5 24l-4.074-4.074z" id="pswp__icn-incremental-zoom-in"/>'
              + '<path fill="currentColor" d="M11 16v-2h6v2z"/>'
              + '<path fill="currentColor" d="M13 12h2v6h-2z"/>',
        outlineID: 'pswp__icn-incremental-zoom-in'
      },
      onClick: (e, zoomInBtnElement) => {
        this.incrementalZoomIn(false);
        this.updateZoomInButtonState(zoomInBtnElement);
      },
      onInit: (zoomInBtnElement) => {
        pswp.on('zoomPanUpdate', () => {
          this.updateZoomInButtonState(zoomInBtnElement);
        });
      }
    });

    this.pswp.ui.registerElement({
      name: 'incrementalZoomOut',
      title: 'Zoom Out',
      order: 9,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M17.426 19.926a6 6 0 1 1 1.5-1.5L23 22.5 21.5 24l-4.074-4.074z" id="pswp__icn-incremental-zoom-out"/>'
              + '<path fill="currentColor" d="M11 16v-2h6v2z"/>',
        outlineID: 'pswp__icn-incremental-zoom-out'
      },
      onClick: (e, zoomInBtnElement) => {
        this.incrementalZoomOut(false);
        this.updateZoomOutButtonState(zoomInBtnElement);
      },
      onInit: (zoomInBtnElement) => {
        pswp.on('zoomPanUpdate', () => {
          this.updateZoomOutButtonState(zoomInBtnElement);
        });
      }
    });

    this.pswp.ui.registerElement({
      name: 'zoomToStart',
      title: 'Zoom to start position',
      order: 8,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M11.213 9.587 9.961 7.91l-1.852 5.794 6.082-.127-1.302-1.744a5.201 5.201 0 0 1 7.614 6.768 5.2 5.2 0 0 1-7.103 1.903L12 22.928a8 8 0 1 0-.787-13.34Z" id="pswp__icn-zoom-to-start"/>',
        outlineID: 'pswp__icn-zoom-to-start'
      },
      onClick: (e, zoomToStartBtnElement) => {
        this.zoomToStart();
        this.updateZoomToStartButtonState(zoomToStartBtnElement);
      },
      onInit: (zoomToStartBtnElement) => {
        pswp.on('zoomPanUpdate', () => {
          this.updateZoomToStartButtonState(zoomToStartBtnElement);
        });
      }
    });
  }

  /**
   * Return the closest layer scale
   * 
   * @param {Number} scale 
   */
  getClosestLayerZoomLevel(scale) {
    const { tiler } = this.pswp.currSlide;
    if (!tiler) {
      return scale;
    }
    const layersScale = tiler.layers.map((layer) => layer.scale);
    const closestZoomLevel = layersScale.reduce((prev, curr) => {
      return (
        Math.abs(curr - scale) < Math.abs(prev - scale) 
        ? curr 
        : prev
      );
    });
    return closestZoomLevel;
  }

  adjustPreloaderBehavior() {
    this.pswp.on('afterInit', () => {
      this.preloaderInterval = setInterval(() => {
        if (!document.hidden && pswp.ui.updatePreloaderVisibility) {
          pswp.ui.updatePreloaderVisibility();
        }
      }, 500);
    });

    this.pswp.addFilter('isContentLoading', (isLoading, content) => {
      if (!isLoading && content.slide && content.slide.tiler) {
        return !content.slide.tiler.manager.activeTilesLoaded();
      }
      return isLoading;
    });

    this.pswp.on('destroy', () => {
      if (this.preloaderInterval) {
        clearInterval(this.preloaderInterval);
        this.preloaderInterval = null;
      }
    });
  }

  incrementalZoomIn(point) {
    const { tiler } = this.pswp.currSlide;
    let destZoomLevel;

    if (tiler) {
      destZoomLevel = this.pswp.currSlide.currZoomLevel * 2;
      const closestZoomLevel = this.getClosestLayerZoomLevel(destZoomLevel);
      if (closestZoomLevel > this.pswp.currSlide.currZoomLevel) {
        destZoomLevel = closestZoomLevel;
      }
      destZoomLevel = Math.min(destZoomLevel, this.pswp.currSlide.zoomLevels.secondary);
    } else {
      destZoomLevel = this.pswp.currSlide.zoomLevels.secondary;
    }
    

    this.pswp.zoomTo(
      destZoomLevel, 
      point,
      this.pswp.options.zoomAnimationDuration
    );
  }

  zoomToStart() {
    this.pswp.zoomTo(
      this.pswp.currSlide.zoomLevels.fit, 
      false,
      this.pswp.options.zoomAnimationDuration
    );
  }

  incrementalZoomOut(point) {
    const { tiler } = this.pswp.currSlide;
    let destZoomLevel;

    if (tiler) {
      destZoomLevel = this.pswp.currSlide.currZoomLevel / 2;
      const closestZoomLevel = this.getClosestLayerZoomLevel(destZoomLevel);
      if (closestZoomLevel < this.pswp.currSlide.currZoomLevel) {
        destZoomLevel = closestZoomLevel;
      }
      destZoomLevel = Math.max(destZoomLevel, this.pswp.currSlide.zoomLevels.initial);
    } else {
      destZoomLevel = this.pswp.currSlide.zoomLevels.initial;
    }
    

    this.pswp.zoomTo(
      destZoomLevel, 
      point,
      this.pswp.options.zoomAnimationDuration
    );
  }

  updateZoomInButtonState(el) {
    if (!this.pswp.currSlide.currZoomLevel ||
      !this.pswp.currSlide.isZoomable() ||
      this.pswp.currSlide.currZoomLevel >= this.pswp.currSlide.zoomLevels.secondary) {
      el.setAttribute('disabled', 'disabled');
    } else {
      el.removeAttribute('disabled');
    }
  }

  updateZoomOutButtonState(el) {
    if (!this.pswp.currSlide.currZoomLevel ||
      !this.pswp.currSlide.isZoomable() ||
      this.pswp.currSlide.currZoomLevel <= this.pswp.currSlide.zoomLevels.fit) {
      el.setAttribute('disabled', 'disabled');
    } else {
      el.removeAttribute('disabled');
    }
  }

  updateZoomToStartButtonState(el) {
    if (!this.pswp.currSlide.currZoomLevel ||
      !this.pswp.currSlide.isZoomable() ||
      this.pswp.currSlide.currZoomLevel <= this.pswp.currSlide.zoomLevels.initial * 3) {
      el.setAttribute('disabled', 'disabled');
      el.style.display = 'none';
    } else {
      el.removeAttribute('disabled');
      el.style.display = 'block';
    }
  }
}

const WHEEL_DEBOUNCE_DELAY = 85; // ms

const defaultOptions = {
  fadeInDuration: 150,
  tileWidth: 256,
  tileOverlap: 0,
  incrementalZoomButtons: true,

  maxTilePixelRatio: 2,

  forceWillChange: true,

  cacheLimit: 200,
  maxDecodingCount: 15,
  minBatchRequestCount: 6
};

class PhotoSwipeDeepZoom {
  constructor(lightbox, options) {
    lightbox.on('init', () => {
      this.handlePhotoSwipeOpen(lightbox.pswp, options);
    });
  }
  handlePhotoSwipeOpen(pswp, options) {
    this.pswp = pswp;
    this.options = {
      ...defaultOptions,
      ...options
    };

    this.ui = new DeepZoomUI(pswp, this.options);
    
    pswp.on('itemData', (e) => {
      this.parseItemData(e.itemData);
    });
    
    pswp.on('zoomLevelsUpdate', (e) => {
      if (e.slideData.tileUrl) {
        // Custom limit for the max zoom
        if (e.slideData.maxZoomWidth) {
          const maxWidth = e.slideData.maxZoomWidth;
          if (maxWidth) {
            const newMaxZoomLevel = maxWidth / e.zoomLevels.elementSize.x;
            e.zoomLevels.max = Math.max(
              e.zoomLevels.initial,
              newMaxZoomLevel
            );
          }
        }

        // For incremental zoom buttons
        e.zoomLevels.secondary = e.zoomLevels.max;
      }
    });

    pswp.on('slideInit', (e) => {
      if (slideIsTiled(e.slide)) {
        this._handleTiledSlideInit(e.slide);
      }
    });

    pswp.on('slideActivate', (e) => {
      if (slideIsTiled(e.slide)) {
        this.createTiler(e.slide);
      }
    });

    pswp.on('slideDeactivate', (e) => {
      if (slideIsTiled(e.slide)) {
        this.destroyTiler(e.slide);
      }
    });

    pswp.on('slideDestroy', (e) => {
      if (slideIsTiled(e.slide)) {
        this.destroyTiler(e.slide);
      }
    });

    pswp.on('appendHeavyContent', (e) => {
      if (slideIsTiled(e.slide)) {
        this._appendHeavyContent(e.slide);
      }
    });

    pswp.on('zoomPanUpdate', (e) => {
      if (slideIsTiled(e.slide)) {
        this._handleZoomPanChange(e.slide);
      }
    });

    pswp.on('imageSizeChange', (e) => {
      if (slideIsTiled(e.slide)) {
        this.updateTilerSize(e.slide);
      }
    });

    pswp.on('change', () => {
      if (slideIsTiled(pswp.currSlide)) {
        this.updateTilerSize(pswp.currSlide);
      }
    });

    pswp.on('loadComplete', (e) => {
      if (slideIsTiled(e.slide) && e.slide.tiler) {
        e.slide.tiler.updatePrimaryImageVisibility();
      }
    });

    // Block tile loading until wheel acion is finished
    // (to prevent unnessesary tile reuqests)
    this._wheelTimeout = undefined;
    pswp.on('wheel', (e) => {
      if (slideIsTiled(pswp.currSlide)) {
        if (pswp.currSlide.tiler) {
          pswp.currSlide.tiler.blockLoading = true;
        } 
        if (this._wheelTimeout) {
          clearTimeout(this._wheelTimeout);
        }
        this._wheelTimeout = setTimeout(() => {
          pswp.currSlide.tiler.blockLoading = false;
          pswp.currSlide.tiler.updateSize();
          this._wheelTimeout = undefined;
        }, WHEEL_DEBOUNCE_DELAY);
      }
    });
  }

  createTiler(slide) {
    if (!slide.tiler) {
      slide.tiler = new Tiler(slide, this.options);
    }
  }

  destroyTiler(slide) {
    if (slide.tiler) {
      slide.tiler.destroy();
      slide.tiler = undefined;
      if (slide.image) {
        slide.image.style.display = 'block';
      }
    }
  }

  _handleTiledSlideInit(slide) {
    if (!slide.primaryImageWidth) {
      slide.primaryImageWidth = slide.width;
      slide.primaryImageHeight = slide.height;
      slide.width = slide.data.maxWidth;
      slide.height = slide.data.maxHeight;
    }
  }

  _appendHeavyContent(slide) {
    this.createTiler(slide);
    this.updateTilerSize(slide);
  }

  _handleZoomPanChange(slide) {
    if (slide.isActive && slide.tiler) {
      this.updateTilerSize(slide);
    }
  }

  updateTilerSize(slide) {
    const scaleMultiplier = slide.currentResolution || slide.zoomLevels.initial;

    if (slide.tiler && slide.isActive) {
      const slideImage = slide.content.element;

      if (slide.placeholder) {
        this._setImgStyles(slide.placeholder.element, 5);
      }

      const width = Math.round(slide.width * scaleMultiplier);
      const height = Math.round(slide.height * scaleMultiplier);

      if (slideImage) {
        this._setImgStyles(slideImage, 7);
        if (width >= slide.primaryImageWidth) {
          if (slideImage.srcset) {
            // adjust sizes attribute so it's based on primary image size,
            // and not based on full (tiled) size
            const prevSizes = parseInt(slideImage.sizes, 10);
            if (prevSizes >= slide.primaryImageWidth) {
              slideImage.sizes = slide.primaryImageWidth + 'px';
              slideImage.dataset.largestUsedSize = width;
            }
          }

          // scale image instead of changing width/height
          slideImage.style.width = slide.primaryImageWidth + 'px';
          slideImage.style.height = slide.primaryImageHeight + 'px';
          const scale  = width / slide.primaryImageWidth;
          slideImage.style.transform = 'scale3d('+scale+','+scale+',1)';
          slideImage.style.transformOrigin = '0 0';
        } else {
          slideImage.style.transform = 'none';
        }
      }

      slide.tiler.setSize(width, height);
    } else {
      if (slide.image) {
        slide.image.style.transform = 'none';
      }
    }
  }
  
  parseItemData(itemData) {
    const element = itemData.element;
    if (!element) {
      return;
    }

    const linkEl = element.tagName === 'A' ? element : element.querySelector('a');
    if (!linkEl) {
      return;
    }

    if (linkEl.dataset.pswpTileUrl) {
      itemData.tileUrl = linkEl.dataset.pswpTileUrl;
    }

    if (linkEl.dataset.pswpTileType) {
      itemData.tileType = linkEl.dataset.pswpTileType;
    }

    if (linkEl.dataset.pswpTileSize) {
      itemData.tileSize = parseInt(linkEl.dataset.pswpTileSize, 10);
    }

    if (linkEl.dataset.pswpMaxWidth) {
      itemData.maxWidth = parseInt(linkEl.dataset.pswpMaxWidth, 10);
    }

    if (linkEl.dataset.pswpMaxZoomWidth) {
      itemData.maxZoomWidth = parseInt(linkEl.dataset.pswpMaxZoomWidth, 10);
    }

    if (linkEl.dataset.pswpMaxHeight) {
      itemData.maxHeight = parseInt(linkEl.dataset.pswpMaxHeight, 10);
    }

    itemData.tileOverlap = parseInt(linkEl.dataset.pswpTileOverlap, 10) || 0;
  }

  _setImgStyles(el, zIndex) {
    if (el && el.tagName === 'IMG') {
      el.style.zIndex = zIndex;
      if (this.options.forceWillChange) {
        el.style.willChange = 'transform';
      }
    }
  }
}

export { PhotoSwipeDeepZoom as default };
