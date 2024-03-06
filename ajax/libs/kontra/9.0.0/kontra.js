/**
 * @preserve
 * Kontra.js v9.0.0
 */
var kontra = (function () {

  let noop = () => {};

  // style used for DOM nodes needed for screen readers
  let srOnlyStyle =
    'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);';

  /**
   * Append a node directly after the canvas and as the last element of other kontra nodes.
   *
   * @param {HTMLElement} node - Node to append.
   * @param {HTMLCanvasElement} canvas - Canvas to append after.
   */
  function addToDom(node, canvas) {
    let container = canvas.parentNode;

    node.setAttribute('data-kontra', '');
    if (container) {
      let target =
        container.querySelector('[data-kontra]:last-of-type') || canvas;
      container.insertBefore(node, target.nextSibling);
    } else {
      document.body.appendChild(node);
    }
  }

  /**
   * Remove an item from an array.
   *
   * @param {*[]} array - Array to remove from.
   * @param {*} item - Item to remove.
   *
   * @returns {Boolean|undefined} True if the item was removed.
   */
  function removeFromArray(array, item) {
    let index = array.indexOf(item);
    if (index != -1) {
      array.splice(index, 1);
      return true;
    }
  }

  /**
   * A simple event system. Allows you to hook into Kontra lifecycle events or create your own, such as for [Plugins](api/plugin).
   *
   * ```js
   * import { on, off, emit } from 'kontra';
   *
   * function callback(a, b, c) {
   *   console.log({a, b, c});
   * });
   *
   * on('myEvent', callback);
   * emit('myEvent', 1, 2, 3);  //=> {a: 1, b: 2, c: 3}
   * off('myEvent', callback);
   * ```
   * @sectionName Events
   */

  // expose for testing
  let callbacks$2 = {};

  /**
   * There are currently only three lifecycle events:
   * - `init` - Emitted after `kontra.init()` is called.
   * - `tick` - Emitted every frame of [GameLoop](api/gameLoop) before the loops `update()` and `render()` functions are called.
   * - `assetLoaded` - Emitted after an asset has fully loaded using the asset loader. The callback function is passed the asset and the url of the asset as parameters.
   * @sectionName Lifecycle Events
   */

  /**
   * Register a callback for an event to be called whenever the event is emitted. The callback will be passed all arguments used in the `emit` call.
   * @function on
   *
   * @param {String} event - Name of the event.
   * @param {Function} callback - Function that will be called when the event is emitted.
   */
  function on(event, callback) {
    callbacks$2[event] = callbacks$2[event] || [];
    callbacks$2[event].push(callback);
  }

  /**
   * Remove a callback for an event.
   * @function off
   *
   * @param {String} event - Name of the event.
   * @param {Function} callback - The function that was passed during registration.
   */
  function off(event, callback) {
    callbacks$2[event] = (callbacks$2[event] || []).filter(
      fn => fn != callback
    );
  }

  /**
   * Call all callback functions for the event. All arguments will be passed to the callback functions.
   * @function emit
   *
   * @param {String} event - Name of the event.
   * @param {...*} args - Comma separated list of arguments passed to all callbacks.
   */
  function emit(event, ...args) {
    (callbacks$2[event] || []).map(fn => fn(...args));
  }

  /**
   * Functions for initializing the Kontra library and getting the canvas and context
   * objects.
   *
   * ```js
   * import { getCanvas, getContext, init } from 'kontra';
   *
   * let { canvas, context } = init();
   *
   * // or can get canvas and context through functions
   * canvas = getCanvas();
   * context = getContext();
   * ```
   * @sectionName Core
   */

  let canvasEl, context;

  // allow contextless environments, such as using ThreeJS as the main
  // canvas, by proxying all canvas context calls
  let handler$1 = {
    // by using noop we can proxy both property and function calls
    // so neither will throw errors
    get(target, key) {
      // export for testing
      if (key == '_proxy') return true;
      return noop;
    }
  };

  /**
   * Return the canvas element.
   * @function getCanvas
   *
   * @returns {HTMLCanvasElement} The canvas element for the game.
   */
  function getCanvas() {
    return canvasEl;
  }

  /**
   * Return the context object.
   * @function getContext
   *
   * @returns {CanvasRenderingContext2D} The context object the game draws to.
   */
  function getContext() {
    return context;
  }

  /**
   * Initialize the library and set up the canvas. Typically you will call `init()` as the first thing and give it the canvas to use. This will allow all Kontra objects to reference the canvas when created.
   *
   * ```js
   * import { init } from 'kontra';
   *
   * let { canvas, context } = init('game');
   * ```
   * @function init
   *
   * @param {String|HTMLCanvasElement} [canvas] - The canvas for Kontra to use. Can either be the ID of the canvas element or the canvas element itself. Defaults to using the first canvas element on the page.
   * @param {Object} [options] - Game options.
   * @param {Boolean} [options.contextless=false] - If the game will run in an contextless environment. A contextless environment uses a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) for the `canvas` and `context` so all property and function calls will noop.
   *
   * @returns {{canvas: HTMLCanvasElement, context: CanvasRenderingContext2D}} An object with properties `canvas` and `context`. `canvas` it the canvas element for the game and `context` is the context object the game draws to.
   */
  function init$1(canvas, { contextless = false } = {}) {
    // check if canvas is a string first, an element next, or default to
    // getting first canvas on page
    canvasEl =
      document.getElementById(canvas) ||
      canvas ||
      document.querySelector('canvas');

    if (contextless) {
      canvasEl = canvasEl || new Proxy({}, handler$1);
    }

    // @ifdef DEBUG
    if (!canvasEl) {
      throw Error('You must provide a canvas element for the game');
    }
    // @endif

    context = canvasEl.getContext('2d') || new Proxy({}, handler$1);
    context.imageSmoothingEnabled = false;

    emit('init');

    return { canvas: canvasEl, context };
  }

  /**
   * An object for drawing sprite sheet animations.
   *
   * An animation defines the sequence of frames to use from a sprite sheet. It also defines at what speed the animation should run using `frameRate`.
   *
   * Typically you don't create an Animation directly, but rather you would create them from a [SpriteSheet](api/spriteSheet) by passing the `animations` argument.
   *
   * ```js
   * import { SpriteSheet, Animation } from 'kontra';
   *
   * let image = new Image();
   * image.src = 'assets/imgs/character_walk_sheet.png';
   * image.onload = function() {
   *   let spriteSheet = SpriteSheet({
   *     image: image,
   *     frameWidth: 72,
   *     frameHeight: 97
   *   });
   *
   *   // you typically wouldn't create an Animation this way
   *   let animation = Animation({
   *     spriteSheet: spriteSheet,
   *     frames: [1,2,3,6],
   *     frameRate: 30
   *   });
   * };
   * ```
   * @class Animation
   *
   * @param {Object} properties - Properties of the animation.
   * @param {SpriteSheet} properties.spriteSheet - Sprite sheet for the animation.
   * @param {Number[]} properties.frames - List of frames of the animation.
   * @param {Number}  properties.frameRate - Number of frames to display in one second.
   * @param {Boolean} [properties.loop=true] - If the animation should loop.
   * @param {String} [properties.name] - The name of the animation.
   */
  class Animation {
    constructor({ spriteSheet, frames, frameRate, loop = true, name }) {
      let { width, height, margin = 0 } = spriteSheet.frame;

      Object.assign(this, {
        /**
         * The sprite sheet to use for the animation.
         * @memberof Animation
         * @property {SpriteSheet} spriteSheet
         */
        spriteSheet,

        /**
         * Sequence of frames to use from the sprite sheet.
         * @memberof Animation
         * @property {Number[]} frames
         */
        frames,

        /**
         * Number of frames to display per second. Adjusting this value will change the speed of the animation.
         * @memberof Animation
         * @property {Number} frameRate
         */
        frameRate,

        /**
         * If the animation should loop back to the beginning once completed.
         * @memberof Animation
         * @property {Boolean} loop
         */
        loop,

        /**
         * The name of the animation.
         * @memberof Animation
         * @property {String} name
         */
        name,

        /**
         * The width of an individual frame. Taken from the [frame width value](api/spriteSheet#frame) of the sprite sheet.
         * @memberof Animation
         * @property {Number} width
         */
        width,

        /**
         * The height of an individual frame. Taken from the [frame height value](api/spriteSheet#frame) of the sprite sheet.
         * @memberof Animation
         * @property {Number} height
         */
        height,

        /**
         * The space between each frame. Taken from the [frame margin value](api/spriteSheet#frame) of the sprite sheet.
         * @memberof Animation
         * @property {Number} margin
         */
        margin,

        /**
         * If the animation is currently stopped. Stopped animations will not update when the [update()](api/animation#update) function is called.
         *
         * Animations are not considered stopped until either the [stop()](api/animation#stop) function is called or the animation gets to the last frame and does not loop.
         *
         * ```js
         * import { Animation } from 'kontra';
         *
         * let animation = Animation({
         *   // ...
         * });
         * console.log(animation.isStopped);  //=> false
         *
         * animation.start();
         * console.log(animation.isStopped);  //=> false
         *
         * animation.stop();
         * console.log(animation.isStopped);  //=> true
         * ```
         * @memberof Animation
         * @property {Boolean} isStopped
         */
        isStopped: false,

        // f = frame, a = accumulator
        _f: 0,
        _a: 0
      });
    }

    /**
     * Clone an animation so it can be used more than once. By default animations passed to [Sprite](api/sprite) will be cloned so no two sprites update the same animation. Otherwise two sprites who shared the same animation would make it update twice as fast.
     * @memberof Animation
     * @function clone
     *
     * @returns {Animation} A new Animation instance.
     */
    clone() {
      return new Animation(this);
    }

    /**
     * Start the animation.
     * @memberof Animation
     * @function start
     */
    start() {
      this.isStopped = false;

      if (!this.loop) {
        this.reset();
      }
    }

    /**
     * Stop the animation.
     * @memberof Animation
     * @function stop
     */
    stop() {
      this.isStopped = true;
    }

    /**
     * Reset an animation to the first frame.
     * @memberof Animation
     * @function reset
     */
    reset() {
      this._f = 0;
      this._a = 0;
    }

    /**
     * Update the animation.
     * @memberof Animation
     * @function update
     *
     * @param {Number} [dt=1/60] - Time since last update.
     */
    update(dt = 1 / 60) {
      if (this.isStopped) {
        return;
      }

      // if the animation doesn't loop we stop at the last frame
      if (!this.loop && this._f == this.frames.length - 1) {
        this.stop();
        return;
      }

      this._a += dt;

      // update to the next frame if it's time
      while (this._a * this.frameRate >= 1) {
        this._f = ++this._f % this.frames.length;
        this._a -= 1 / this.frameRate;
      }
    }

    /**
     * Draw the current frame of the animation.
     * @memberof Animation
     * @function render
     *
     * @param {Object} properties - Properties to draw the animation.
     * @param {Number} properties.x - X position to draw the animation.
     * @param {Number} properties.y - Y position to draw the animation.
     * @param {Number} [properties.width] - width of the sprite. Defaults to [Animation.width](api/animation#width).
     * @param {Number} [properties.height] - height of the sprite. Defaults to [Animation.height](api/animation#height).
     * @param {CanvasRenderingContext2D} [properties.context] - The context the animation should draw to. Defaults to [core.getContext()](api/core#getContext).
     */
    render({
      x,
      y,
      width = this.width,
      height = this.height,
      context = getContext()
    }) {
      // get the row and col of the frame
      let row = (this.frames[this._f] / this.spriteSheet._f) | 0;
      let col = this.frames[this._f] % this.spriteSheet._f | 0;

      context.drawImage(
        this.spriteSheet.image,
        col * this.width + (col * 2 + 1) * this.margin,
        row * this.height + (row * 2 + 1) * this.margin,
        this.width,
        this.height,
        x,
        y,
        width,
        height
      );
    }
  }

  function factory$b() {
    return new Animation(...arguments);
  }

  /**
   * A promise based asset loader for loading images, audio, and data files. An `assetLoaded` event is emitted after each asset is fully loaded. The callback for the event is passed the asset and the url to the asset as parameters.
   *
   * ```js
   * import { load, on } from 'kontra';
   *
   * let numAssets = 3;
   * let assetsLoaded = 0;
   * on('assetLoaded', (asset, url) => {
   *   assetsLoaded++;
   *
   *   // inform user or update progress bar
   * });
   *
   * load(
   *   'assets/imgs/character.png',
   *   'assets/data/tile_engine_basic.json',
   *   ['/audio/music.ogg', '/audio/music.mp3']
   * ).then(function(assets) {
   *   // all assets have loaded
   * }).catch(function(err) {
   *   // error loading an asset
   * });
   * ```
   * @sectionName Assets
   */

  let imageRegex = /(jpeg|jpg|gif|png|webp)$/;
  let audioRegex = /(wav|mp3|ogg|aac)$/;
  let leadingSlash = /^\//;
  let trailingSlash = /\/$/;
  let dataMap = /*@__PURE__*/ new WeakMap();

  let imagePath = '';
  let audioPath = '';
  let dataPath = '';

  /**
   * Get the full URL from the base.
   *
   * @param {String} url - The URL to the asset.
   * @param {String} base - Base URL.
   *
   * @returns {String}
   */
  function getUrl(url, base) {
    return new URL(url, base).href;
  }

  /**
   * Join a base path and asset path.
   *
   * @param {String} base - The asset base path.
   * @param {String} url - The URL to the asset.
   *
   * @returns {String}
   */
  function joinPath(base, url) {
    return [
      base.replace(trailingSlash, ''),
      base ? url.replace(leadingSlash, '') : url
    ]
      .filter(s => s)
      .join('/');
  }

  /**
   * Get the extension of an asset.
   *
   * @param {String} url - The URL to the asset.
   *
   * @returns {String}
   */
  function getExtension(url) {
    return url.split('.').pop();
  }

  /**
   * Get the name of an asset.
   *
   * @param {String} url - The URL to the asset.
   *
   * @returns {String}
   */
  function getName(url) {
    let name = url.replace('.' + getExtension(url), '');

    // remove leading slash if there is no folder in the path
    // @see https://stackoverflow.com/a/50592629/2124254
    return name.split('/').length == 2
      ? name.replace(leadingSlash, '')
      : name;
  }

  /**
   * Get browser audio playability.
   * @see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/audio.js
   *
   * @param {HTMLMediaElement} audio - Audio element.
   *
   * @returns {object}
   */
  function getCanPlay(audio) {
    return {
      wav: audio.canPlayType('audio/wav; codecs="1"'),
      mp3: audio.canPlayType('audio/mpeg;'),
      ogg: audio.canPlayType('audio/ogg; codecs="vorbis"'),
      aac: audio.canPlayType('audio/aac;')
    };
  }

  /**
   * Object of all loaded image assets by both file name and path. If the base [image path](api/assets#setImagePath) was set before the image was loaded, the file name and path will not include the base image path.
   *
   * ```js
   * import { load, setImagePath, imageAssets } from 'kontra';
   *
   * load('assets/imgs/character.png').then(function() {
   *   // Image asset can be accessed by both
   *   // name: imageAssets['assets/imgs/character']
   *   // path: imageAssets['assets/imgs/character.png']
   * });
   *
   * setImagePath('assets/imgs');
   * load('character_walk_sheet.png').then(function() {
   *   // Image asset can be accessed by both
   *   // name: imageAssets['character_walk_sheet']
   *   // path: imageAssets['character_walk_sheet.png']
   * });
   * ```
   * @property {{[name: String]: HTMLImageElement}} imageAssets
   */
  let imageAssets = {};

  /**
   * Object of all loaded audio assets by both file name and path. If the base [audio path](api/assets#setAudioPath) was set before the audio was loaded, the file name and path will not include the base audio path.
   *
   * ```js
   * import { load, setAudioPath, audioAssets } from 'kontra';
   *
   * load('/audio/music.ogg').then(function() {
   *   // Audio asset can be accessed by both
   *   // name: audioAssets['/audio/music']
   *   // path: audioAssets['/audio/music.ogg']
   * });
   *
   * setAudioPath('/audio');
   * load('sound.ogg').then(function() {
   *   // Audio asset can be accessed by both
   *   // name: audioAssets['sound']
   *   // path: audioAssets['sound.ogg']
   * });
   * ```
   * @property {{[name: String]: HTMLAudioElement}} audioAssets
   */
  let audioAssets = {};

  /**
   * Object of all loaded data assets by both file name and path. If the base [data path](api/assets#setDataPath) was set before the data was loaded, the file name and path will not include the base data path.
   *
   * ```js
   * import { load, setDataPath, dataAssets } from 'kontra';
   *
   * load('assets/data/file.txt').then(function() {
   *   // Audio asset can be accessed by both
   *   // name: dataAssets['assets/data/file']
   *   // path: dataAssets['assets/data/file.txt']
   * });
   *
   * setDataPath('assets/data');
   * load('info.json').then(function() {
   *   // Audio asset can be accessed by both
   *   // name: dataAssets['info']
   *   // path: dataAssets['info.json']
   * });
   * ```
   * @property {{[name: String]: any}} dataAssets
   */
  let dataAssets = {};

  /**
   * Add a global kontra object so TileEngine can access information about the
   * loaded assets when kontra is loaded in parts rather than as a whole (e.g.
   * `import { load, TileEngine } from 'kontra';`)
   */
  function addGlobal() {
    if (!window.__k) {
      window.__k = {
        dm: dataMap,
        u: getUrl,
        d: dataAssets,
        i: imageAssets
      };
    }
  }

  /**
   * Sets the base path for all image assets. If a base path is set, all load calls for image assets will prepend the base path to the URL.
   *
   * ```js
   * import { setImagePath, load } from 'kontra';
   *
   * setImagePath('/imgs');
   * load('character.png');  // loads '/imgs/character.png'
   * ```
   * @function setImagePath
   *
   * @param {String} path - Base image path.
   */
  function setImagePath(path) {
    imagePath = path;
  }

  /**
   * Sets the base path for all audio assets. If a base path is set, all load calls for audio assets will prepend the base path to the URL.
   *
   * ```js
   * import { setAudioPath, load } from 'kontra';
   *
   * setAudioPath('/audio');
   * load('music.ogg');  // loads '/audio/music.ogg'
   * ```
   * @function setAudioPath
   *
   * @param {String} path - Base audio path.
   */
  function setAudioPath(path) {
    audioPath = path;
  }

  /**
   * Sets the base path for all data assets. If a base path is set, all load calls for data assets will prepend the base path to the URL.
   *
   * ```js
   * import { setDataPath, load } from 'kontra';
   *
   * setDataPath('/data');
   * load('file.json');  // loads '/data/file.json'
   * ```
   * @function setDataPath
   *
   * @param {String} path - Base data path.
   */
  function setDataPath(path) {
    dataPath = path;
  }

  /**
   * Load a single Image asset. Uses the base [image path](api/assets#setImagePath) to resolve the URL.
   *
   * Once loaded, the asset will be accessible on the the [imageAssets](api/assets#imageAssets) property.
   *
   * ```js
   * import { loadImage } from 'kontra';
   *
   * loadImage('car.png').then(function(image) {
   *   console.log(image.src);  //=> 'car.png'
   * })
   * ```
   * @function loadImage
   *
   * @param {String} url - The URL to the Image file.
   *
   * @returns {Promise<HTMLImageElement>} A deferred promise. Promise resolves with the Image.
   */
  function loadImage(url) {
    addGlobal();

    return new Promise((resolve, reject) => {
      let resolvedUrl, image, fullUrl;

      resolvedUrl = joinPath(imagePath, url);
      if (imageAssets[resolvedUrl])
        return resolve(imageAssets[resolvedUrl]);

      image = new Image();

      image.onload = function loadImageOnLoad() {
        fullUrl = getUrl(resolvedUrl, window.location.href);
        imageAssets[getName(url)] =
          imageAssets[resolvedUrl] =
          imageAssets[fullUrl] =
            this;
        emit('assetLoaded', this, url);
        resolve(this);
      };

      image.onerror = function loadImageOnError() {
        reject(
          /* @ifdef DEBUG */ 'Unable to load image ' +
            /* @endif */ resolvedUrl
        );
      };

      image.src = resolvedUrl;
    });
  }

  /**
   * Load a single Audio asset. Supports loading multiple audio formats which the loader will use to load the first audio format supported by the browser in the order listed. Uses the base [audio path](api/assets#setAudioPath) to resolve the URL.
   *
   * Once loaded, the asset will be accessible on the the [audioAssets](api/assets#audioAssets) property. Since the loader determines which audio asset to load based on browser support, you should only reference the audio by its name and not by its file path since there's no guarantee which asset was loaded.
   *
   * ```js
   * import { loadAudio, audioAssets } from 'kontra';
   *
   * loadAudio([
   *   '/audio/music.mp3',
   *   '/audio/music.ogg'
   * ]).then(function(audio) {
   *
   *   // access audio by its name only (not by its .mp3 or .ogg path)
   *   audioAssets['/audio/music'].play();
   * })
   * ```
   * @function loadAudio
   *
   * @param {String|String[]} url - The URL to the Audio file.
   *
   * @returns {Promise<HTMLAudioElement>} A deferred promise. Promise resolves with the Audio.
   */
  function loadAudio(url) {
    return new Promise((resolve, reject) => {
      let _url = url,
        audioEl,
        canPlay,
        resolvedUrl,
        fullUrl;

      audioEl = new Audio();
      canPlay = getCanPlay(audioEl);

      // determine the first audio format the browser can play
      url = []
        .concat(url)
        .reduce(
          (playableSource, source) =>
            playableSource
              ? playableSource
              : canPlay[getExtension(source)]
              ? source
              : null,
          0
        ); // 0 is the shortest falsy value

      if (!url) {
        return reject(
          /* @ifdef DEBUG */ 'cannot play any of the audio formats provided ' +
            /* @endif */ _url
        );
      }

      resolvedUrl = joinPath(audioPath, url);
      if (audioAssets[resolvedUrl])
        return resolve(audioAssets[resolvedUrl]);

      audioEl.addEventListener('canplay', function loadAudioOnLoad() {
        fullUrl = getUrl(resolvedUrl, window.location.href);
        audioAssets[getName(url)] =
          audioAssets[resolvedUrl] =
          audioAssets[fullUrl] =
            this;
        emit('assetLoaded', this, url);
        resolve(this);
      });

      audioEl.onerror = function loadAudioOnError() {
        reject(
          /* @ifdef DEBUG */ 'Unable to load audio ' +
            /* @endif */ resolvedUrl
        );
      };

      audioEl.src = resolvedUrl;
      audioEl.load();
    });
  }

  /**
   * Load a single Data asset. Uses the base [data path](api/assets#setDataPath) to resolve the URL.
   *
   * Once loaded, the asset will be accessible on the the [dataAssets](api/assets#dataAssets) property.
   *
   * ```js
   * import { loadData } from 'kontra';
   *
   * loadData('assets/data/tile_engine_basic.json').then(function(data) {
   *   // data contains the parsed JSON data
   * })
   * ```
   * @function loadData
   *
   * @param {String} url - The URL to the Data file.
   *
   * @returns {Promise} A deferred promise. Promise resolves with the contents of the file. If the file is a JSON file, the contents will be parsed as JSON.
   */
  function loadData(url) {
    addGlobal();
    let resolvedUrl, fullUrl;

    resolvedUrl = joinPath(dataPath, url);
    if (dataAssets[resolvedUrl])
      return Promise.resolve(dataAssets[resolvedUrl]);

    return fetch(resolvedUrl)
      .then(response => {
        if (!response.ok) throw response;
        return response
          .clone()
          .json()
          .catch(() => response.text());
      })
      .then(response => {
        fullUrl = getUrl(resolvedUrl, window.location.href);
        if (typeof response == 'object') {
          dataMap.set(response, fullUrl);
        }

        dataAssets[getName(url)] =
          dataAssets[resolvedUrl] =
          dataAssets[fullUrl] =
            response;
        emit('assetLoaded', response, url);
        return response;
      });
  }

  /**
   * Load Image, Audio, or data files. Uses the [loadImage](api/assets#loadImage), [loadAudio](api/assets#loadAudio), and [loadData](api/assets#loadData) functions to load each asset type.
   *
   * ```js
   * import { load } from 'kontra';
   *
   * load(
   *   'assets/imgs/character.png',
   *   'assets/data/tile_engine_basic.json',
   *   ['/audio/music.ogg', '/audio/music.mp3']
   * ).then(function(assets) {
   *   // all assets have loaded
   * }).catch(function(err) {
   *   // error loading an asset
   * });
   * ```
   * @function load
   *
   * @param {...(String|String[])[]} urls - Comma separated list of asset urls to load.
   *
   * @returns {Promise<any[]>} A deferred promise. Resolves with all the loaded assets.
   */
  function load(...urls) {
    addGlobal();

    return Promise.all(
      urls.map(asset => {
        // account for a string or an array for the url
        let extension = getExtension([].concat(asset)[0]);

        return extension.match(imageRegex)
          ? loadImage(asset)
          : extension.match(audioRegex)
          ? loadAudio(asset)
          : loadData(asset);
      })
    );
  }

  /**
   * A group of helpful functions that are commonly used for game development. Includes things such as converting between radians and degrees and getting random integers.
   *
   * ```js
   * import { degToRad } from 'kontra';
   *
   * let radians = degToRad(180);  // => 3.14
   * ```
   * @sectionName Helpers
   */

  /**
   * Convert degrees to radians.
   * @function degToRad
   *
   * @param {Number} deg - Degrees to convert.
   *
   * @returns {Number} The value in radians.
   */
  function degToRad(deg) {
    return (deg * Math.PI) / 180;
  }

  /**
   * Convert radians to degrees.
   * @function radToDeg
   *
   * @param {Number} rad - Radians to convert.
   *
   * @returns {Number} The value in degrees.
   */
  function radToDeg(rad) {
    return (rad * 180) / Math.PI;
  }

  /**
   * Return the angle in radians from one point to another point.
   *
   * ```js
   * import { angleToTarget, Sprite } from 'kontra';
   *
   * let sprite = Sprite({
   *   x: 10,
   *   y: 10,
   *   width: 20,
   *   height: 40,
   *   color: 'blue'
   * });
   *
   * sprite.rotation = angleToTarget(sprite, {x: 100, y: 30});
   *
   * let sprite2 = Sprite({
   *   x: 100,
   *   y: 30,
   *   width: 20,
   *   height: 40,
   *   color: 'red',
   * });
   *
   * sprite2.rotation = angleToTarget(sprite2, sprite);
   * ```
   * @function angleToTarget
   *
   * @param {{x: Number, y: Number}} source - The {x,y} source point.
   * @param {{x: Number, y: Number}} target - The {x,y} target point.
   *
   * @returns {Number} Angle (in radians) from the source point to the target point.
   */
  function angleToTarget(source, target) {
    return Math.atan2(target.y - source.y, target.x - source.x);
  }

  /**
   * Rotate a point by an angle.
   * @function rotatePoint
   *
   * @param {{x: Number, y: Number}} point - The {x,y} point to rotate.
   * @param {Number} angle - Angle (in radians) to rotate.
   *
   * @returns {{x: Number, y: Number}} The new x and y coordinates after rotation.
   */
  function rotatePoint(point, angle) {
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);

    return {
      x: point.x * cos - point.y * sin,
      y: point.x * sin + point.y * cos
    };
  }

  /**
   * Move a point by an angle and distance.
   * @function movePoint
   *
   * @param {{x: Number, y: Number}} point - The {x,y} point to move.
   * @param {Number} angle - Angle (in radians) to move.
   * @param {Number} distance - Distance to move.
   *
   * @returns {{x: Number, y: Number}} The new x and y coordinates after moving.
   */
  function movePoint(point, angle, distance) {
    return {
      x: point.x + Math.cos(angle) * distance,
      y: point.y + Math.sin(angle) * distance
    };
  }

  /**
   * Return a random integer between a minimum (inclusive) and maximum (inclusive) integer.
   * @see https://stackoverflow.com/a/1527820/2124254
   * @function randInt
   *
   * @param {Number} min - Min integer.
   * @param {Number} max - Max integer.
   *
   * @returns {Number} Random integer between min and max values.
   */
  function randInt(min, max) {
    return ((Math.random() * (max - min + 1)) | 0) + min;
  }

  /**
   * Create a seeded random number generator.
   *
   * ```js
   * import { seedRand } from 'kontra';
   *
   * let rand = seedRand('kontra');
   * console.log(rand());  // => always 0.33761959057301283
   * ```
   * @see https://stackoverflow.com/a/47593316/2124254
   * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md
   *
   * @function seedRand
   *
   * @param {String} str - String to seed the random number generator.
   *
   * @returns {() => Number} Seeded random number generator function.
   */
  function seedRand(str) {
    // based on the above references, this was the smallest code yet
    // decent quality seed random function

    // first create a suitable hash of the seed string using xfnv1a
    // @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#addendum-a-seed-generating-functions
    for (var i = 0, h = 2166136261 >>> 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 16777619);
    }
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    let seed = (h += h << 5) >>> 0;

    // then return the seed function and discard the first result
    // @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#lcg-lehmer-rng
    let rand = () =>
      ((2 ** 31 - 1) & (seed = Math.imul(48271, seed))) / 2 ** 31;
    rand();
    return rand;
  }

  /**
   * Linearly interpolate between two values. The function calculates the number between two values based on a percent. Great for smooth transitions.
   *
   * ```js
   * import { lerp } from 'kontra';
   *
   * console.log( lerp(10, 20, 0.5) );  // => 15
   * console.log( lerp(10, 20, 2) );  // => 30
   * ```
   * @function lerp
   *
   * @param {Number} start - Start value.
   * @param {Number} end - End value.
   * @param {Number} percent - Percent to interpolate.
   *
   * @returns {Number} Interpolated number between the start and end values
   */
  function lerp(start, end, percent) {
    return start * (1 - percent) + end * percent;
  }

  /**
   * Return the linear interpolation percent between two values. The function calculates the percent between two values of a given value.
   *
   * ```js
   * import { inverseLerp } from 'kontra';
   *
   * console.log( inverseLerp(10, 20, 15) );  // => 0.5
   * console.log( inverseLerp(10, 20, 30) );  // => 2
   * ```
   * @function inverseLerp
   *
   * @param {Number} start - Start value.
   * @param {Number} end - End value.
   * @param {Number} value - Value between start and end.
   *
   * @returns {Number} Percent difference between the start and end values.
   */
  function inverseLerp(start, end, value) {
    return (value - start) / (end - start);
  }

  /**
   * Clamp a number between two values, preventing it from going below or above the minimum and maximum values.
   * @function clamp
   *
   * @param {Number} min - Min value.
   * @param {Number} max - Max value.
   * @param {Number} value - Value to clamp.
   *
   * @returns {Number} Value clamped between min and max.
   */
  function clamp(min, max, value) {
    return Math.min(Math.max(min, value), max);
  }

  /**
   * Save an item to localStorage. A value of `undefined` will remove the item from localStorage.
   * @function setStoreItem
   *
   * @param {String} key - The name of the key.
   * @param {*} value - The value to store.
   */
  function setStoreItem(key, value) {
    if (value == undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Retrieve an item from localStorage and convert it back to its original type.
   *
   * Normally when you save a value to LocalStorage it converts it into a string. So if you were to save a number, it would be saved as `"12"` instead of `12`. This function enables the value to be returned as `12`.
   * @function getStoreItem
   *
   * @param {String} key - Name of the key of the item to retrieve.
   *
   * @returns {*} The retrieved item.
   */
  function getStoreItem(key) {
    let value = localStorage.getItem(key);

    try {
      value = JSON.parse(value);
    } catch (e) {
      // do nothing
    }

    return value;
  }

  /**
   * Check if two objects collide. Uses a simple [Axis-Aligned Bounding Box (AABB) collision check](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box). Takes into account the objects [anchor](api/gameObject#anchor) and [scale](api/gameObject#scale).
   *
   * **NOTE:** Does not take into account object rotation. If you need collision detection between rotated objects you will need to implement your own `collides()` function. I suggest looking at the Separate Axis Theorem.
   *
   * ```js
   * import { Sprite, collides } from 'kontra';
   *
   * let sprite = Sprite({
   *   x: 100,
   *   y: 200,
   *   width: 20,
   *   height: 40
   * });
   *
   * let sprite2 = Sprite({
   *   x: 150,
   *   y: 200,
   *   width: 20,
   *   height: 20
   * });
   *
   * collides(sprite, sprite2);  //=> false
   *
   * sprite2.x = 115;
   *
   * collides(sprite, sprite2);  //=> true
   * ```
   * @function collides
   *
   * @param {{x: Number, y: Number, width: Number, height: Number}|{world: {x: Number, y: Number, width: Number, height: Number}}} obj1 - Object reference.
   * @param {{x: Number, y: Number, width: Number, height: Number}|{world: {x: Number, y: Number, width: Number, height: Number}}} obj2 - Object to check collision against.
   *
   * @returns {Boolean} `true` if the objects collide, `false` otherwise.
   */
  function collides(obj1, obj2) {
    [obj1, obj2] = [obj1, obj2].map(obj => getWorldRect(obj));

    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  }

  /**
   * Return the world rect of an object. The rect is the world position of the top-left corner of the object and its size. Takes into account the objects anchor and scale.
   * @function getWorldRect
   *
   * @param {{x: Number, y: Number, width: Number, height: Number}|{world: {x: Number, y: Number, width: Number, height: Number}}|{mapwidth: Number, mapheight: Number}} obj - Object to get world rect of.
   *
   * @returns {{x: Number, y: Number, width: Number, height: Number}} The world `x`, `y`, `width`, and `height` of the object.
   */
  function getWorldRect(obj) {
    let { x = 0, y = 0, width, height } = obj.world || obj;

    // take into account tileEngine
    if (obj.mapwidth) {
      width = obj.mapwidth;
      height = obj.mapheight;
    }

    // @ifdef GAMEOBJECT_ANCHOR
    // account for anchor
    if (obj.anchor) {
      x -= width * obj.anchor.x;
      y -= height * obj.anchor.y;
    }
    // @endif

    // @ifdef GAMEOBJECT_SCALE
    // account for negative scales
    if (width < 0) {
      x += width;
      width *= -1;
    }
    if (height < 0) {
      y += height;
      height *= -1;
    }
    // @endif

    return {
      x,
      y,
      width,
      height
    };
  }

  /**
   * Compare two objects world rects to determine how to sort them. Is used as the `compareFunction` to [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
   * @function depthSort
   *
   * @param {{x: Number, y: Number, width: Number, height: Number}|{world: {x: Number, y: Number, width: Number, height: Number}}} obj1 - First object to compare.
   * @param {{x: Number, y: Number, width: Number, height: Number}|{world: {x: Number, y: Number, width: Number, height: Number}}} obj2 - Second object to compare.
   * @param {String} [prop='y'] - Objects [getWorldRect](/api/helpers#getWorldRect) property to compare.
   *
   * @returns {Number} The difference between the objects compare property.
   */
  function depthSort(obj1, obj2, prop = 'y') {
    [obj1, obj2] = [obj1, obj2].map(getWorldRect);
    return obj1[prop] - obj2[prop];
  }

  /**
   * A simple 2d vector object. Takes either separate `x` and `y` coordinates or a Vector-like object.
   *
   * ```js
   * import { Vector } from 'kontra';
   *
   * let vector = Vector(100, 200);
   * let vector2 = Vector({x: 100, y: 200});
   * ```
   * @class Vector
   *
   * @param {Number|{x: number, y: number}} [x=0] - X coordinate of the vector or a Vector-like object. If passing an object, the `y` param is ignored.
   * @param {Number} [y=0] - Y coordinate of the vector.
   */
  class Vector {
    constructor(x = 0, y = 0, vec = {}) {
      if (x.x != undefined) {
        this.x = x.x;
        this.y = x.y;
      }
      else {
        this.x = x;
        this.y = y;
      }

      // @ifdef VECTOR_CLAMP
      // preserve vector clamping when creating new vectors
      if (vec._c) {
        this.clamp(vec._a, vec._b, vec._d, vec._e);

        // reset x and y so clamping takes effect
        this.x = x;
        this.y = y;
      }
      // @endif
    }

    /**
     * Set the x and y coordinate of the vector.
     * @memberof Vector
     * @function set
     *
     * @param {Vector|{x: number, y: number}} vector - Vector to set coordinates from.
     */
    set(vec) {
      this.x = vec.x;
      this.y = vec.y;
    }

    /**
     * Calculate the addition of the current vector with the given vector.
     * @memberof Vector
     * @function add
     *
     * @param {Vector|{x: number, y: number}} vector - Vector to add to the current Vector.
     *
     * @returns {Vector} A new Vector instance whose value is the addition of the two vectors.
     */
    add(vec) {
      return new Vector(this.x + vec.x, this.y + vec.y, this);
    }

    // @ifdef VECTOR_SUBTRACT
    /**
     * Calculate the subtraction of the current vector with the given vector.
     * @memberof Vector
     * @function subtract
     *
     * @param {Vector|{x: number, y: number}} vector - Vector to subtract from the current Vector.
     *
     * @returns {Vector} A new Vector instance whose value is the subtraction of the two vectors.
     */
    subtract(vec) {
      return new Vector(this.x - vec.x, this.y - vec.y, this);
    }
    // @endif

    // @ifdef VECTOR_SCALE
    /**
     * Calculate the multiple of the current vector by a value.
     * @memberof Vector
     * @function scale
     *
     * @param {Number} value - Value to scale the current Vector.
     *
     * @returns {Vector} A new Vector instance whose value is multiplied by the scalar.
     */
    scale(value) {
      return new Vector(this.x * value, this.y * value);
    }
    // @endif

    // @ifdef VECTOR_NORMALIZE
    /**
     * Calculate the normalized value of the current vector. Requires the Vector [length](api/vector#length) function.
     * @memberof Vector
     * @function normalize
     *
     * @returns {Vector} A new Vector instance whose value is the normalized vector.
     */
    // @see https://github.com/jed/140bytes/wiki/Byte-saving-techniques#use-placeholder-arguments-instead-of-var
    normalize(length = this.length() || 1) {
      return new Vector(this.x / length, this.y / length);
    }
    // @endif

    // @ifdef VECTOR_DOT||VECTOR_ANGLE
    /**
     * Calculate the dot product of the current vector with the given vector.
     * @memberof Vector
     * @function dot
     *
     * @param {Vector|{x: number, y: number}} vector - Vector to dot product against.
     *
     * @returns {Number} The dot product of the vectors.
     */
    dot(vec) {
      return this.x * vec.x + this.y * vec.y;
    }
    // @endif

    // @ifdef VECTOR_LENGTH||VECTOR_NORMALIZE||VECTOR_ANGLE
    /**
     * Calculate the length (magnitude) of the Vector.
     * @memberof Vector
     * @function length
     *
     * @returns {Number} The length of the vector.
     */
    length() {
      return Math.hypot(this.x, this.y);
    }
    // @endif

    // @ifdef VECTOR_DISTANCE
    /**
     * Calculate the distance between the current vector and the given vector.
     * @memberof Vector
     * @function distance
     *
     * @param {Vector|{x: number, y: number}} vector - Vector to calculate the distance between.
     *
     * @returns {Number} The distance between the two vectors.
     */
    distance(vec) {
      return Math.hypot(this.x - vec.x, this.y - vec.y);
    }
    // @endif

    // @ifdef VECTOR_ANGLE
    /**
     * Calculate the angle (in radians) between the current vector and the given vector. Requires the Vector [dot](api/vector#dot) and [length](api/vector#length) functions.
     * @memberof Vector
     * @function angle
     *
     * @param {Vector} vector - Vector to calculate the angle between.
     *
     * @returns {Number} The angle (in radians) between the two vectors.
     */
    angle(vec) {
      return Math.acos(this.dot(vec) / (this.length() * vec.length()));
    }
    // @endif

    // @ifdef VECTOR_DIRECTION
    /**
     * Calculate the angle (in radians) of the current vector.
     * @memberof Vector
     * @function direction
     *
     * @returns {Number} The angle (in radians) of the vector.
     */
    direction() {
      return Math.atan2(this.y, this.x);
    }
    // @endif

    // @ifdef VECTOR_CLAMP
    /**
     * Clamp the Vector between two points, preventing `x` and `y` from going below or above the minimum and maximum values. Perfect for keeping a sprite from going outside the game boundaries.
     *
     * ```js
     * import { Vector } from 'kontra';
     *
     * let vector = Vector(100, 200);
     * vector.clamp(0, 0, 200, 300);
     *
     * vector.x += 200;
     * console.log(vector.x);  //=> 200
     *
     * vector.y -= 300;
     * console.log(vector.y);  //=> 0
     *
     * vector.add({x: -500, y: 500});
     * console.log(vector);    //=> {x: 0, y: 300}
     * ```
     * @memberof Vector
     * @function clamp
     *
     * @param {Number} xMin - Minimum x value.
     * @param {Number} yMin - Minimum y value.
     * @param {Number} xMax - Maximum x value.
     * @param {Number} yMax - Maximum y value.
     */
    clamp(xMin, yMin, xMax, yMax) {
      this._c = true;
      this._a = xMin;
      this._b = yMin;
      this._d = xMax;
      this._e = yMax;
    }

    /**
     * X coordinate of the vector.
     * @memberof Vector
     * @property {Number} x
     */
    get x() {
      return this._x;
    }

    /**
     * Y coordinate of the vector.
     * @memberof Vector
     * @property {Number} y
     */
    get y() {
      return this._y;
    }

    set x(value) {
      this._x = this._c ? clamp(this._a, this._d, value) : value;
    }

    set y(value) {
      this._y = this._c ? clamp(this._b, this._e, value) : value;
    }
    // @endif
  }

  function factory$a() {
    return new Vector(...arguments);
  }

  /**
   * This is a private class that is used just to help make the GameObject class more manageable and smaller.
   *
   * It maintains everything that can be changed in the update function:
   * position
   * velocity
   * acceleration
   * ttl
   */
  class Updatable {
    constructor(properties) {
      return this.init(properties);
    }

    init(properties = {}) {
      // --------------------------------------------------
      // defaults
      // --------------------------------------------------

      /**
       * The game objects position vector. Represents the local position of the object as opposed to the [world](api/gameObject#world) position.
       * @property {Vector} position
       * @memberof GameObject
       * @page GameObject
       */
      this.position = factory$a();

      // --------------------------------------------------
      // optionals
      // --------------------------------------------------

      // @ifdef GAMEOBJECT_VELOCITY
      /**
       * The game objects velocity vector.
       * @memberof GameObject
       * @property {Vector} velocity
       * @page GameObject
       */
      this.velocity = factory$a();
      // @endif

      // @ifdef GAMEOBJECT_ACCELERATION
      /**
       * The game objects acceleration vector.
       * @memberof GameObject
       * @property {Vector} acceleration
       * @page GameObject
       */
      this.acceleration = factory$a();
      // @endif

      // @ifdef GAMEOBJECT_TTL
      /**
       * How may frames the game object should be alive.
       * @memberof GameObject
       * @property {Number} ttl
       * @page GameObject
       */
      this.ttl = Infinity;
      // @endif

      // add all properties to the object, overriding any defaults
      Object.assign(this, properties);
    }

    /**
     * Update the position of the game object and all children using their velocity and acceleration. Calls the game objects [advance()](api/gameObject#advance) function.
     * @memberof GameObject
     * @function update
     * @page GameObject
     *
     * @param {Number} [dt] - Time since last update.
     */
    update(dt) {
      this.advance(dt);
    }

    /**
     * Move the game object by its acceleration and velocity. If you pass `dt` it will multiply the vector and acceleration by that number. This means the `dx`, `dy`, `ddx` and `ddy` should be how far you want the object to move in 1 second rather than in 1 frame.
     *
     * If you override the game objects [update()](api/gameObject#update) function with your own update function, you can call this function to move the game object normally.
     *
     * ```js
     * import { GameObject } from 'kontra';
     *
     * let gameObject = GameObject({
     *   x: 100,
     *   y: 200,
     *   width: 20,
     *   height: 40,
     *   dx: 5,
     *   dy: 2,
     *   update: function() {
     *     // move the game object normally
     *     this.advance();
     *
     *     // change the velocity at the edges of the canvas
     *     if (this.x < 0 ||
     *         this.x + this.width > this.context.canvas.width) {
     *       this.dx = -this.dx;
     *     }
     *     if (this.y < 0 ||
     *         this.y + this.height > this.context.canvas.height) {
     *       this.dy = -this.dy;
     *     }
     *   }
     * });
     * ```
     * @memberof GameObject
     * @function advance
     * @page GameObject
     *
     * @param {Number} [dt] - Time since last update.
     *
     */
    advance(dt) {
      // @ifdef GAMEOBJECT_VELOCITY
      // @ifdef GAMEOBJECT_ACCELERATION
      let acceleration = this.acceleration;

      // @ifdef VECTOR_SCALE
      if (dt) {
        acceleration = acceleration.scale(dt);
      }
      // @endif

      this.velocity = this.velocity.add(acceleration);
      // @endif
      // @endif

      // @ifdef GAMEOBJECT_VELOCITY
      let velocity = this.velocity;

      // @ifdef VECTOR_SCALE
      if (dt) {
        velocity = velocity.scale(dt);
      }
      // @endif

      this.position = this.position.add(velocity);
      this._pc();
      // @endif

      // @ifdef GAMEOBJECT_TTL
      this.ttl--;
      // @endif
    }

    // --------------------------------------------------
    // velocity
    // --------------------------------------------------

    // @ifdef GAMEOBJECT_VELOCITY
    /**
     * X coordinate of the velocity vector.
     * @memberof GameObject
     * @property {Number} dx
     * @page GameObject
     */
    get dx() {
      return this.velocity.x;
    }

    /**
     * Y coordinate of the velocity vector.
     * @memberof GameObject
     * @property {Number} dy
     * @page GameObject
     */
    get dy() {
      return this.velocity.y;
    }

    set dx(value) {
      this.velocity.x = value;
    }

    set dy(value) {
      this.velocity.y = value;
    }
    // @endif

    // --------------------------------------------------
    // acceleration
    // --------------------------------------------------

    // @ifdef GAMEOBJECT_ACCELERATION
    /**
     * X coordinate of the acceleration vector.
     * @memberof GameObject
     * @property {Number} ddx
     * @page GameObject
     */
    get ddx() {
      return this.acceleration.x;
    }

    /**
     * Y coordinate of the acceleration vector.
     * @memberof GameObject
     * @property {Number} ddy
     * @page GameObject
     */
    get ddy() {
      return this.acceleration.y;
    }

    set ddx(value) {
      this.acceleration.x = value;
    }

    set ddy(value) {
      this.acceleration.y = value;
    }
    // @endif

    // --------------------------------------------------
    // ttl
    // --------------------------------------------------

    // @ifdef GAMEOBJECT_TTL
    /**
     * Check if the game object is alive.
     * @memberof GameObject
     * @function isAlive
     * @page GameObject
     *
     * @returns {Boolean} `true` if the game objects [ttl](api/gameObject#ttl) property is above `0`, `false` otherwise.
     */
    isAlive() {
      return this.ttl > 0;
    }
    // @endif

    _pc() {}
  }

  /**
   * The base class of most renderable classes. Handles things such as position, rotation, anchor, and the update and render life cycle.
   *
   * Typically you don't create a GameObject directly, but rather extend it for new classes.
   * @class GameObject
   *
   * @param {Object} [properties] - Properties of the game object.
   * @param {Number} [properties.x] - X coordinate of the position vector.
   * @param {Number} [properties.y] - Y coordinate of the position vector.
   * @param {Number} [properties.width] - Width of the game object.
   * @param {Number} [properties.height] - Height of the game object.
   *
   * @param {CanvasRenderingContext2D} [properties.context] - The context the game object should draw to. Defaults to [core.getContext()](api/core#getContext).
   *
   * @param {Number} [properties.dx] - X coordinate of the velocity vector.
   * @param {Number} [properties.dy] - Y coordinate of the velocity vector.
   * @param {Number} [properties.ddx] - X coordinate of the acceleration vector.
   * @param {Number} [properties.ddy] - Y coordinate of the acceleration vector.
   * @param {Number} [properties.ttl=Infinity] - How many frames the game object should be alive. Used by [Pool](api/pool).
   *
   * @param {{x: Number, y: Number}} [properties.anchor={x:0,y:0}] - The x and y origin of the game object. {x:0, y:0} is the top left corner of the game object, {x:1, y:1} is the bottom right corner.
   * @param {GameObject[]} [properties.children] - Children to add to the game object.
   * @param {Number} [properties.opacity=1] - The opacity of the game object.
   * @param {Number} [properties.rotation=0] - The rotation around the anchor in radians.
   * @param {Number} [properties.scaleX=1] - The x scale of the game object.
   * @param {Number} [properties.scaleY=1] - The y scale of the game object.
   *
   * @param {(dt?: Number) => void} [properties.update] - Function called every frame to update the game object.
   * @param {Function} [properties.render] - Function called every frame to render the game object.
   *
   * @param {...*} properties.props - Any additional properties you need added to the game object. For example, if you pass `gameObject({type: 'player'})` then the game object will also have a property of the same name and value. You can pass as many additional properties as you want.
   */
  class GameObject extends Updatable {
    /**
     * @docs docs/api_docs/gameObject.js
     */

    /**
     * Use this function to reinitialize a game object. It takes the same properties object as the constructor. Useful it you want to repurpose a game object.
     * @memberof GameObject
     * @function init
     *
     * @param {Object} properties - Properties of the game object.
     */
    init({
      // --------------------------------------------------
      // defaults
      // --------------------------------------------------

      /**
       * The width of the game object. Represents the local width of the object as opposed to the [world](api/gameObject#world) width.
       * @memberof GameObject
       * @property {Number} width
       */
      width = 0,

      /**
       * The height of the game object. Represents the local height of the object as opposed to the [world](api/gameObject#world) height.
       * @memberof GameObject
       * @property {Number} height
       */
      height = 0,

      /**
       * The context the game object will draw to.
       * @memberof GameObject
       * @property {CanvasRenderingContext2D} context
       */
      context = getContext(),

      render = this.draw,
      update = this.advance,

      // --------------------------------------------------
      // optionals
      // --------------------------------------------------

      // @ifdef GAMEOBJECT_GROUP
      /**
       * The game objects parent object.
       * @memberof GameObject
       * @property {GameObject|null} parent
       */

      /**
       * The game objects children objects.
       * @memberof GameObject
       * @property {GameObject[]} children
       */
      children = [],
      // @endif

      // @ifdef GAMEOBJECT_ANCHOR
      /**
       * The x and y origin of the game object. {x:0, y:0} is the top left corner of the game object, {x:1, y:1} is the bottom right corner.
       * @memberof GameObject
       * @property {{x: Number, y: Number}} anchor
       *
       * @example
       * // exclude-code:start
       * let { GameObject } = kontra;
       * // exclude-code:end
       * // exclude-script:start
       * import { GameObject } from 'kontra';
       * // exclude-script:end
       *
       * let gameObject = GameObject({
       *   x: 150,
       *   y: 100,
       *   width: 50,
       *   height: 50,
       *   color: 'red',
       *   // exclude-code:start
       *   context: context,
       *   // exclude-code:end
       *   render: function() {
       *     this.context.fillStyle = this.color;
       *     this.context.fillRect(0, 0, this.height, this.width);
       *   }
       * });
       *
       * function drawOrigin(gameObject) {
       *   gameObject.context.fillStyle = 'yellow';
       *   gameObject.context.beginPath();
       *   gameObject.context.arc(gameObject.x, gameObject.y, 3, 0, 2*Math.PI);
       *   gameObject.context.fill();
       * }
       *
       * gameObject.render();
       * drawOrigin(gameObject);
       *
       * gameObject.anchor = {x: 0.5, y: 0.5};
       * gameObject.x = 300;
       * gameObject.render();
       * drawOrigin(gameObject);
       *
       * gameObject.anchor = {x: 1, y: 1};
       * gameObject.x = 450;
       * gameObject.render();
       * drawOrigin(gameObject);
       */
      anchor = { x: 0, y: 0 },
      // @endif

      // @ifdef GAMEOBJECT_OPACITY
      /**
       * The opacity of the object. Represents the local opacity of the object as opposed to the [world](api/gameObject#world) opacity.
       * @memberof GameObject
       * @property {Number} opacity
       */
      opacity = 1,
      // @endif

      // @ifdef GAMEOBJECT_ROTATION
      /**
       * The rotation of the game object around the anchor in radians. Represents the local rotation of the object as opposed to the [world](api/gameObject#world) rotation.
       * @memberof GameObject
       * @property {Number} rotation
       */
      rotation = 0,
      // @endif

      // @ifdef GAMEOBJECT_SCALE
      /**
       * The x scale of the object. Represents the local x scale of the object as opposed to the [world](api/gameObject#world) x scale.
       * @memberof GameObject
       * @property {Number} scaleX
       */
      scaleX = 1,

      /**
       * The y scale of the object. Represents the local y scale of the object as opposed to the [world](api/gameObject#world) y scale.
       * @memberof GameObject
       * @property {Number} scaleY
       */
      scaleY = 1,
      // @endif

      ...props
    } = {}) {
      // @ifdef GAMEOBJECT_GROUP
      this._c = [];
      // @endif

      // by setting defaults to the parameters and passing them into
      // the init, we can ensure that a parent class can set overriding
      // defaults and the GameObject won't undo it (if we set
      // `this.width` then no parent could provide a default value for
      // width)
      super.init({
        width,
        height,
        context,

        // @ifdef GAMEOBJECT_ANCHOR
        anchor,
        // @endif

        // @ifdef GAMEOBJECT_OPACITY
        opacity,
        // @endif

        // @ifdef GAMEOBJECT_ROTATION
        rotation,
        // @endif

        // @ifdef GAMEOBJECT_SCALE
        scaleX,
        scaleY,
        // @endif

        ...props
      });

      // di = done init
      this._di = true;
      this._uw();

      // @ifdef GAMEOBJECT_GROUP
      this.addChild(children);
      // @endif

      // rf = render function
      this._rf = render;

      // uf = update function
      this._uf = update;

      on('init', () => {
        this.context ??= getContext();
      });
    }

    /**
     * Update all children
     */
    update(dt) {
      this._uf(dt);

      // @ifdef GAMEOBJECT_GROUP
      this.children.map(child => child.update && child.update(dt));
      // @endif
    }

    /**
     * Render the game object and all children. Calls the game objects [draw()](api/gameObject#draw) function.
     * @memberof GameObject
     * @function render
     */
    render() {
      let context = this.context;
      context.save();

      // 1) translate to position
      //
      // it's faster to only translate if one of the values is non-zero
      // rather than always translating
      // @see https://jsperf.com/translate-or-if-statement/2
      if (this.x || this.y) {
        context.translate(this.x, this.y);
      }

      // @ifdef GAMEOBJECT_ROTATION
      // 3) rotate around the anchor
      //
      // it's faster to only rotate when set rather than always rotating
      // @see https://jsperf.com/rotate-or-if-statement/2
      if (this.rotation) {
        context.rotate(this.rotation);
      }
      // @endif

      // @ifdef GAMEOBJECT_SCALE
      // 4) scale after translation to position so object can be
      // scaled in place (rather than scaling position as well).
      //
      // it's faster to only scale if one of the values is not 1
      // rather than always scaling
      // @see https://jsperf.com/scale-or-if-statement/4
      if (this.scaleX != 1 || this.scaleY != 1) {
        context.scale(this.scaleX, this.scaleY);
      }
      // @endif

      // @ifdef GAMEOBJECT_ANCHOR
      // 5) translate to the anchor so (0,0) is the top left corner
      // for the render function
      let anchorX = -this.width * this.anchor.x;
      let anchorY = -this.height * this.anchor.y;

      if (anchorX || anchorY) {
        context.translate(anchorX, anchorY);
      }
      // @endif

      // @ifdef GAMEOBJECT_OPACITY
      // it's not really any faster to gate the global alpha
      // @see https://jsperf.com/global-alpha-or-if-statement/1
      this.context.globalAlpha = this.opacity;
      // @endif

      this._rf();

      // @ifdef GAMEOBJECT_ANCHOR
      // 7) translate back to the anchor so children use the correct
      // x/y value from the anchor
      if (anchorX || anchorY) {
        context.translate(-anchorX, -anchorY);
      }
      // @endif

      // @ifdef GAMEOBJECT_GROUP
      // perform all transforms on the parent before rendering the
      // children
      let children = this.children;
      children.map(child => child.render && child.render());
      // @endif

      context.restore();
    }

    /**
     * Draw the game object at its X and Y position, taking into account rotation, scale, and anchor.
     *
     * Do note that the canvas has been rotated and translated to the objects position (taking into account anchor), so {0,0} will be the top-left corner of the game object when drawing.
     *
     * If you override the game objects `render()` function with your own render function, you can call this function to draw the game object normally.
     *
     * ```js
     * let { GameObject } = kontra;
     *
     * let gameObject = GameObject({
     *  x: 290,
     *  y: 80,
     *  width: 20,
     *  height: 40,
     *
     *  render: function() {
     *    // draw the game object normally (perform rotation and other transforms)
     *    this.draw();
     *
     *    // outline the game object
     *    this.context.strokeStyle = 'yellow';
     *    this.context.lineWidth = 2;
     *    this.context.strokeRect(0, 0, this.width, this.height);
     *  }
     * });
     *
     * gameObject.render();
     * ```
     * @memberof GameObject
     * @function draw
     */
    draw() {}

    /**
     * Sync property changes from the parent to the child
     */
    _pc() {
      this._uw();

      // @ifdef GAMEOBJECT_GROUP
      this.children.map(child => child._pc());
      // @endif
    }

    /**
     * X coordinate of the position vector.
     * @memberof GameObject
     * @property {Number} x
     */
    get x() {
      return this.position.x;
    }

    /**
     * Y coordinate of the position vector.
     * @memberof GameObject
     * @property {Number} y
     */
    get y() {
      return this.position.y;
    }

    set x(value) {
      this.position.x = value;

      // pc = property changed
      this._pc();
    }

    set y(value) {
      this.position.y = value;
      this._pc();
    }

    get width() {
      // w = width
      return this._w;
    }

    set width(value) {
      this._w = value;
      this._pc();
    }

    get height() {
      // h = height
      return this._h;
    }

    set height(value) {
      this._h = value;
      this._pc();
    }

    /**
     * Update world properties
     */
    _uw() {
      // don't update world properties until after the init has finished
      if (!this._di) return;

      // @ifdef GAMEOBJECT_GROUP||GAMEOBJECT_OPACITY||GAMEOBJECT_ROTATION||GAMEOBJECT_SCALE
      let {
        _wx = 0,
        _wy = 0,

        // @ifdef GAMEOBJECT_OPACITY
        _wo = 1,
        // @endif

        // @ifdef GAMEOBJECT_ROTATION
        _wr = 0,
        // @endif

        // @ifdef GAMEOBJECT_SCALE
        _wsx = 1,
        _wsy = 1
        // @endif
      } = this.parent || {};
      // @endif

      // wx = world x, wy = world y
      this._wx = this.x;
      this._wy = this.y;

      // ww = world width, wh = world height
      this._ww = this.width;
      this._wh = this.height;

      // @ifdef GAMEOBJECT_OPACITY
      // wo = world opacity
      this._wo = _wo * this.opacity;
      // @endif

      // @ifdef GAMEOBJECT_SCALE
      // wsx = world scale x, wsy = world scale y
      this._wsx = _wsx * this.scaleX;
      this._wsy = _wsy * this.scaleY;

      this._wx = this._wx * _wsx;
      this._wy = this._wy * _wsy;
      this._ww = this.width * this._wsx;
      this._wh = this.height * this._wsy;
      // @endif

      // @ifdef GAMEOBJECT_ROTATION
      // wr = world rotation
      this._wr = _wr + this.rotation;

      let { x, y } = rotatePoint({ x: this._wx, y: this._wy }, _wr);
      this._wx = x;
      this._wy = y;
      // @endif

      // @ifdef GAMEOBJECT_GROUP
      this._wx += _wx;
      this._wy += _wy;
      // @endif
    }

    /**
     * The world position, width, height, opacity, rotation, and scale. The world property is the true position, width, height, etc. of the object, taking into account all parents.
     *
     * The world property does not adjust for anchor or scale, so if you set a negative scale the world width or height could be negative. Use [getWorldRect](/api/helpers#getWorldRect) to get the world position and size adjusted for anchor and scale.
     * @property {{x: Number, y: Number, width: Number, height: Number, opacity: Number, rotation: Number, scaleX: Number, scaleY: Number}} world
     * @memberof GameObject
     */
    get world() {
      return {
        x: this._wx,
        y: this._wy,
        width: this._ww,
        height: this._wh,

        // @ifdef GAMEOBJECT_OPACITY
        opacity: this._wo,
        // @endif

        // @ifdef GAMEOBJECT_ROTATION
        rotation: this._wr,
        // @endif

        // @ifdef GAMEOBJECT_SCALE
        scaleX: this._wsx,
        scaleY: this._wsy
        // @endif
      };
    }

    // --------------------------------------------------
    // group
    // --------------------------------------------------

    // @ifdef GAMEOBJECT_GROUP
    set children(value) {
      this.removeChild(this._c);
      this.addChild(value);
    }

    get children() {
      return this._c;
    }

    /**
     * Add an object as a child to this object. The objects position, size, and rotation will be relative to the parents position, size, and rotation. The childs [world](api/gameObject#world) property will be updated to take into account this object and all of its parents.
     * @memberof GameObject
     * @function addChild
     *
     * @param {...(GameObject|GameObject[])[]} objects - Object to add as a child. Can be a single object, an array of objects, or a comma-separated list of objects.
     *
     * @example
     * // exclude-code:start
     * let { GameObject } = kontra;
     * // exclude-code:end
     * // exclude-script:start
     * import { GameObject } from 'kontra';
     * // exclude-script:end
     *
     * function createObject(x, y, color, size = 1) {
     *   return GameObject({
     *     x,
     *     y,
     *     width: 50 / size,
     *     height: 50 / size,
     *     anchor: {x: 0.5, y: 0.5},
     *     color,
     *     // exclude-code:start
     *     context: context,
     *     // exclude-code:end
     *     render: function() {
     *       this.context.fillStyle = this.color;
     *       this.context.fillRect(0, 0, this.height, this.width);
     *     }
     *   });
     * }
     *
     * let parent = createObject(300, 100, 'red');
     *
     * // create a child that is 25px to the right and
     * // down from the parents position
     * let child = createObject(25, 25, 'yellow', 2);
     *
     * parent.addChild(child);
     *
     * parent.render();
     */
    addChild(...objects) {
      objects.flat().map(child => {
        this.children.push(child);
        child.parent = this;
        child._pc = child._pc || noop;
        child._pc();
      });
    }

    /**
     * Remove an object as a child of this object. The removed objects [world](api/gameObject#world) property will be updated to not take into account this object and all of its parents.
     * @memberof GameObject
     * @function removeChild
     *
     * @param {...(GameObject|GameObject[])[]} objects - Object to remove as a child. Can be a single object, an array of objects, or a comma-separated list of objects.
     */
    removeChild(...objects) {
      objects.flat().map(child => {
        if (removeFromArray(this.children, child)) {
          child.parent = null;
          child._pc();
        }
      });
    }
    // @endif

    // --------------------------------------------------
    // opacity
    // --------------------------------------------------

    // @ifdef GAMEOBJECT_OPACITY
    get opacity() {
      return this._opa;
    }

    set opacity(value) {
      this._opa = clamp(0, 1, value);
      this._pc();
    }
    // @endif

    // --------------------------------------------------
    // rotation
    // --------------------------------------------------

    // @ifdef GAMEOBJECT_ROTATION
    get rotation() {
      return this._rot;
    }

    set rotation(value) {
      this._rot = value;
      this._pc();
    }
    // @endif

    // --------------------------------------------------
    // scale
    // --------------------------------------------------

    // @ifdef GAMEOBJECT_SCALE
    /**
     * Set the x and y scale of the object. If only one value is passed, both are set to the same value.
     * @memberof GameObject
     * @function setScale
     *
     * @param {Number} x - X scale value.
     * @param {Number} [y=x] - Y scale value.
     */
    setScale(x, y = x) {
      this.scaleX = x;
      this.scaleY = y;
    }

    get scaleX() {
      return this._scx;
    }

    set scaleX(value) {
      this._scx = value;
      this._pc();
    }

    get scaleY() {
      return this._scy;
    }

    set scaleY(value) {
      this._scy = value;
      this._pc();
    }
    // @endif
  }

  function factory$9() {
    return new GameObject(...arguments);
  }

  /**
   * A versatile way to update and draw your sprites. It can handle simple rectangles, images, and sprite sheet animations. It can be used for your main player object as well as tiny particles in a particle engine.
   * @class Sprite
   * @extends GameObject
   *
   * @param {Object} [properties] - Properties of the sprite.
   * @param {String} [properties.color] - Fill color for the game object if no image or animation is provided.
   * @param {HTMLImageElement|HTMLCanvasElement} [properties.image] - Use an image to draw the sprite.
   * @param {{[name: String] : Animation}} [properties.animations] - An object of [Animations](api/animation) from a [Spritesheet](api/spriteSheet) to animate the sprite.
   */
  class Sprite extends GameObject {
    /**
     * @docs docs/api_docs/sprite.js
     */

    init({
      /**
       * The color of the game object if it was passed as an argument.
       * @memberof Sprite
       * @property {String} color
       */

      // @ifdef SPRITE_IMAGE
      /**
       * The image the sprite will use when drawn if passed as an argument.
       * @memberof Sprite
       * @property {HTMLImageElement|HTMLCanvasElement} image
       */
      image,

      /**
       * The width of the sprite. If the sprite is a [rectangle sprite](api/sprite#rectangle-sprite), it uses the passed in value. For an [image sprite](api/sprite#image-sprite) it is the width of the image. And for an [animation sprite](api/sprite#animation-sprite) it is the width of a single frame of the animation.
       * @memberof Sprite
       * @property {Number} width
       */
      width = image ? image.width : undefined,

      /**
       * The height of the sprite. If the sprite is a [rectangle sprite](api/sprite#rectangle-sprite), it uses the passed in value. For an [image sprite](api/sprite#image-sprite) it is the height of the image. And for an [animation sprite](api/sprite#animation-sprite) it is the height of a single frame of the animation.
       * @memberof Sprite
       * @property {Number} height
       */
      height = image ? image.height : undefined,
      // @endif

      ...props
    } = {}) {
      super.init({
        // @ifdef SPRITE_IMAGE
        image,
        width,
        height,
        // @endif
        ...props
      });
    }

    // @ifdef SPRITE_ANIMATION
    /**
     * An object of [Animations](api/animation) from a [SpriteSheet](api/spriteSheet) to animate the sprite. Each animation is named so that it can can be used by name for the sprites [playAnimation()](api/sprite#playAnimation) function.
     *
     * ```js
     * import { Sprite, SpriteSheet } from 'kontra';
     *
     * let spriteSheet = SpriteSheet({
     *   // ...
     *   animations: {
     *     idle: {
     *       frames: 1,
     *       loop: false,
     *     },
     *     walk: {
     *       frames: [1,2,3]
     *     }
     *   }
     * });
     *
     * let sprite = Sprite({
     *   x: 100,
     *   y: 200,
     *   animations: spriteSheet.animations
     * });
     *
     * sprite.playAnimation('idle');
     * ```
     * @memberof Sprite
     * @property {{[name: String] : Animation}} animations
     */
    get animations() {
      return this._a;
    }

    set animations(value) {
      let prop, firstAnimation;
      // a = animations
      this._a = {};

      // clone each animation so no sprite shares an animation
      for (prop in value) {
        this._a[prop] = value[prop].clone();

        // default the current animation to the first one in the list
        firstAnimation = firstAnimation || this._a[prop];
      }

      /**
       * The currently playing Animation object if `animations` was passed as an argument.
       * @memberof Sprite
       * @property {Animation} currentAnimation
       */
      this.currentAnimation = firstAnimation;
      this.width = this.width || firstAnimation.width;
      this.height = this.height || firstAnimation.height;
    }

    /**
     * Set the currently playing animation of an animation sprite.
     *
     * ```js
     * import { Sprite, SpriteSheet } from 'kontra';
     *
     * let spriteSheet = SpriteSheet({
     *   // ...
     *   animations: {
     *     idle: {
     *       frames: 1
     *     },
     *     walk: {
     *       frames: [1,2,3]
     *     }
     *   }
     * });
     *
     * let sprite = Sprite({
     *   x: 100,
     *   y: 200,
     *   animations: spriteSheet.animations
     * });
     *
     * sprite.playAnimation('idle');
     * ```
     * @memberof Sprite
     * @function playAnimation
     *
     * @param {String} name - Name of the animation to play.
     */
    playAnimation(name) {
      this.currentAnimation?.stop();
      this.currentAnimation = this.animations[name];
      this.currentAnimation.start();
    }

    advance(dt) {
      super.advance(dt);
      this.currentAnimation?.update(dt);
    }
    // @endif

    draw() {
      // @ifdef SPRITE_IMAGE
      if (this.image) {
        this.context.drawImage(
          this.image,
          0,
          0,
          this.image.width,
          this.image.height
        );
      }
      // @endif

      // @ifdef SPRITE_ANIMATION
      if (this.currentAnimation) {
        this.currentAnimation.render({
          x: 0,
          y: 0,
          width: this.width,
          height: this.height,
          context: this.context
        });
      }
      // @endif

      if (this.color) {
        this.context.fillStyle = this.color;
        this.context.fillRect(0, 0, this.width, this.height);
      }
    }
  }

  function factory$8() {
    return new Sprite(...arguments);
  }

  let fontSizeRegex = /(\d+)(\w+)/;

  function parseFont(font) {
    if (!font) return { computed: 0 };

    let match = font.match(fontSizeRegex);

    // coerce string to number
    // @see https://github.com/jed/140bytes/wiki/Byte-saving-techniques#coercion-to-test-for-types
    let size = +match[1];
    let unit = match[2];
    let computed = size;

    return {
      size,
      unit,
      computed
    };
  }

  /**
   * An object for drawing text to the screen. Supports newline characters as well as automatic new lines when setting the `width` property.
   *
   * You can also display RTL languages by setting the attribute `dir="rtl"` on the main canvas element. Due to the limited browser support for individual text to have RTL settings, it must be set globally for the entire game.
   *
   * @example
   * // exclude-code:start
   * let { Text } = kontra;
   * // exclude-code:end
   * // exclude-script:start
   * import { Text } from 'kontra';
   * // exclude-script:end
   *
   * let text = Text({
   *   text: 'Hello World!\nI can even be multiline!',
   *   font: '32px Arial',
   *   color: 'white',
   *   x: 300,
   *   y: 100,
   *   anchor: {x: 0.5, y: 0.5},
   *   textAlign: 'center'
   * });
   * // exclude-code:start
   * text.context = context;
   * // exclude-code:end
   *
   * text.render();
   * @class Text
   * @extends GameObject
   *
   * @param {Object} properties - Properties of the text.
   * @param {String} properties.text - The text to display.
   * @param {String} [properties.font] - The [font](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font) style. Defaults to the main context font.
   * @param {String} [properties.color] - Fill color for the text. Defaults to the main context fillStyle.
   * @param {Number} [properties.width] - Set a fixed width for the text. If set, the text will automatically be split into new lines that will fit the size when possible.
   * @param {String} [properties.textAlign='left'] - The [textAlign](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign) for the context. If the `dir` attribute is set to `rtl` on the main canvas, the text will automatically be aligned to the right, but you can override that by setting this property.
   * @param {Number} [properties.lineHeight=1] - The distance between two lines of text.
   * @param {String} [properties.strokeColor] - Stroke color for the text.
   * @param {number} [properties.lineWidth] - Stroke line width for the text.
   */
  class Text extends GameObject {
    init({
      // --------------------------------------------------
      // defaults
      // --------------------------------------------------

      /**
       * The string of text. Use newline characters to create multi-line strings.
       * @memberof Text
       * @property {String} text
       */
      text = '',

      /**
       * The text alignment.
       * @memberof Text
       * @property {String} textAlign
       */
      textAlign = '',

      /**
       * The distance between two lines of text. The value is multiplied by the texts font size.
       * @memberof Text
       * @property {Number} lineHeight
       */
      lineHeight = 1,

      /**
       * The font style.
       * @memberof Text
       * @property {String} font
       */
      font = getContext()?.font,

      /**
       * The color of the text.
       * @memberof Text
       * @property {String} color
       */

      ...props
    } = {}) {
      // cast to string
      text = '' + text;

      super.init({
        text,
        textAlign,
        lineHeight,
        font,
        ...props
      });

      // p = prerender
      if (this.context) {
        this._p();
      }

      on('init', () => {
        this.font ??= getContext().font;
        this._p();
      });
    }

    // keep width and height getters/settings so we can set _w and _h
    // and not trigger infinite call loops
    get width() {
      // w = width
      return this._w;
    }

    set width(value) {
      // d = dirty
      this._d = true;
      this._w = value;

      // fw = fixed width
      this._fw = value;
    }

    get text() {
      return this._t;
    }

    set text(value) {
      this._d = true;
      this._t = '' + value;
    }

    get font() {
      return this._f;
    }

    set font(value) {
      this._d = true;
      this._f = value;
      this._fs = parseFont(value).computed;
    }

    get lineHeight() {
      // lh = line height
      return this._lh;
    }

    set lineHeight(value) {
      this._d = true;
      this._lh = value;
    }

    render() {
      if (this._d) {
        this._p();
      }
      super.render();
    }

    /**
     * Calculate the font width, height, and text strings before rendering.
     */
    _p() {
      // s = strings
      this._s = [];
      this._d = false;
      let context = this.context;
      let text = [this.text];

      context.font = this.font;

      // @ifdef TEXT_NEWLINE
      text = this.text.split('\n');
      // @endif

      // @ifdef TEXT_AUTONEWLINE
      if (this._fw) {
        text.map(t => {
          let parts = t.split(' ');
          let str = parts.shift();
          let nextStr = str;

          // split the string into lines that all fit within the fixed
          // width
          parts.map(part => {
            nextStr += ' ' + part;

            if (context.measureText(nextStr).width > this._fw) {
              this._s.push(str);
              nextStr = part;
            }

            str = nextStr;
          });

          this._s.push(nextStr);
        });
      }
      // @endif

      // @ifdef TEXT_NEWLINE
      if (!this._s.length && this.text.includes('\n')) {
        let width = 0;
        text.map(str => {
          this._s.push(str);
          width = Math.max(width, context.measureText(str).width);
        });

        this._w = this._fw || width;
      }
      // @endif

      if (!this._s.length) {
        this._s.push(this.text);
        this._w = this._fw || context.measureText(this.text).width;
      }

      this.height =
        this._fs + (this._s.length - 1) * this._fs * this.lineHeight;
      this._uw();
    }

    draw() {
      let alignX = 0;
      let textAlign = this.textAlign;
      let context = this.context;

      // @ifdef TEXT_RTL
      textAlign =
        this.textAlign ||
        (context.canvas.dir == 'rtl' ? 'right' : 'left');
      // @endif

      // @ifdef TEXT_ALIGN||TEXT_RTL
      alignX =
        textAlign == 'right'
          ? this.width
          : textAlign == 'center'
          ? (this.width / 2) | 0
          : 0;
      // @endif

      this._s.map((str, index) => {
        context.textBaseline = 'top';
        context.textAlign = textAlign;
        context.fillStyle = this.color;
        context.font = this.font;


        // @ifdef TEXT_STROKE
        if (this.strokeColor) {
          context.strokeStyle = this.strokeColor;
          context.lineWidth = this.lineWidth ?? 1;
          context.strokeText(
            str,
            alignX,
            this._fs * this.lineHeight * index
          );
        }
        // @endif

        context.fillText(
          str,
          alignX,
          this._fs * this.lineHeight * index
        );
      });
    }
  }

  function factory$7() {
    return new Text(...arguments);
  }

  /**
   * A simple pointer API. You can use it move the main sprite or respond to a pointer event. Works with both mouse and touch events.
   *
   * Pointer events can be added on a global level or on individual sprites or objects. Before an object can receive pointer events, you must tell the pointer which objects to track and the object must haven been rendered to the canvas using `object.render()`.
   *
   * After an object is tracked and rendered, you can assign it an `onDown()`, `onUp()`, `onOver()`, or `onOut()` functions which will be called whenever a pointer down, up, over, or out event happens on the object.
   *
   * ```js
   * import { initPointer, track, Sprite } from 'kontra';
   *
   * // this function must be called first before pointer
   * // functions will work
   * initPointer();
   *
   * let sprite = Sprite({
   *   onDown: function() {
   *     // handle on down events on the sprite
   *   },
   *   onUp: function() {
   *     // handle on up events on the sprite
   *   },
   *   onOver: function() {
   *     // handle on over events on the sprite
   *   },
   *   onOut: function() {
   *     // handle on out events on the sprite
   *   }
   * });
   *
   * track(sprite);
   * sprite.render();
   * ```
   *
   * By default, the pointer is treated as a circle and will check for collisions against objects assuming they are rectangular (have a width and height property).
   *
   * If you need to perform a different type of collision detection, assign the object a `collidesWithPointer()` function and it will be called instead. The function is passed the pointer object. Use this function to determine how the pointer circle should collide with the object.
   *
   * ```js
   * import { Sprite } from 'kontra';
   *
   * let sprite = Srite({
   *   x: 10,
   *   y: 10,
   *   radius: 10
   *   collidesWithPointer: function(pointer) {
   *     // perform a circle v circle collision test
   *     let dx = pointer.x - this.x;
   *     let dy = pointer.y - this.y;
   *     return Math.sqrt(dx * dx + dy * dy) < this.radius;
   *   }
   * });
   * ```
   * @sectionName Pointer
   */

  /**
   * Below is a list of buttons that you can use. If you need to extend or modify this list, you can use the [pointerMap](api/gamepad#pointerMap) property.
   *
   * - left, middle, right
   * @sectionName Available Buttons
   */

  // save each object as they are rendered to determine which object
  // is on top when multiple objects are the target of an event.
  // we'll always use the last frame's object order so we know
  // the finalized order of all objects, otherwise an object could ask
  // if it's being hovered when it's rendered first even if other
  // objects would block it later in the render order
  let pointers = new WeakMap();
  let callbacks$1 = {};
  let pressedButtons = {};

  /**
   * A map of pointer button indices to button names. Modify this object to expand the list of [available buttons](api/pointer#available-buttons).
   *
   * ```js
   * import { pointerMap, pointerPressed } from 'kontra';
   *
   * pointerMap[2] = 'buttonWest';
   *
   * if (pointerPressed('buttonWest')) {
   *   // handle west face button
   * }
   * ```
   * @property {{[key: Number]: String}} pointerMap
   */
  let pointerMap = {
    0: 'left',
    1: 'middle',
    2: 'right'
  };

  /**
   * Get the pointer object which contains the `radius`, current `x` and `y` position of the pointer relative to the top-left corner of the canvas, and which `canvas` the pointer applies to.
   *
   * ```js
   * import { initPointer, getPointer } from 'kontra';
   *
   * initPointer();
   *
   * console.log(getPointer());  //=> { x: 100, y: 200, radius: 5, canvas: <canvas> };
   * ```
   *
   * @function getPointer
   *
   * @param {HTMLCanvasElement} [canvas] - The canvas which maintains the pointer. Defaults to [core.getCanvas()](api/core#getCanvas).
   *
   * @returns {{x: Number, y: Number, radius: Number, canvas: HTMLCanvasElement, touches: Object}} pointer with properties `x`, `y`, and `radius`. If using touch events, also has a `touches` object with keys of the touch identifier and the x/y position of the touch as the value.
   */
  function getPointer(canvas = getCanvas()) {
    return pointers.get(canvas);
  }

  /**
   * Detection collision between a rectangle and a circle.
   * @see https://yal.cc/rectangle-circle-intersection-test/
   *
   * @param {Object} object - Object to check collision against.
   */
  function circleRectCollision(object, pointer) {
    let { x, y, width, height } = getWorldRect(object);

    // account for camera
    do {
      x -= object.sx || 0;
      y -= object.sy || 0;
    } while ((object = object.parent));

    let dx = pointer.x - Math.max(x, Math.min(pointer.x, x + width));
    let dy = pointer.y - Math.max(y, Math.min(pointer.y, y + height));
    return dx * dx + dy * dy < pointer.radius * pointer.radius;
  }

  /**
   * Get the first on top object that the pointer collides with.
   *
   * @param {Object} pointer - The pointer object
   *
   * @returns {Object} First object to collide with the pointer.
   */
  function getCurrentObject(pointer) {
    // if pointer events are required on the very first frame or
    // without a game loop, use the current frame
    let renderedObjects = pointer._lf.length
      ? pointer._lf
      : pointer._cf;

    for (let i = renderedObjects.length - 1; i >= 0; i--) {
      let object = renderedObjects[i];
      let collides = object.collidesWithPointer
        ? object.collidesWithPointer(pointer)
        : circleRectCollision(object, pointer);

      if (collides) {
        return object;
      }
    }
  }

  /**
   * Get the style property value.
   */
  function getPropValue(style, value) {
    return parseFloat(style.getPropertyValue(value)) || 0;
  }

  /**
   * Calculate the canvas size, scale, and offset.
   *
   * @param {Object} The pointer object
   *
   * @returns {Object} The scale and offset of the canvas
   */
  function getCanvasOffset(pointer) {
    // we need to account for CSS scale, transform, border, padding,
    // and margin in order to get the correct scale and offset of the
    // canvas
    let { canvas, _s } = pointer;
    let rect = canvas.getBoundingClientRect();

    // @see https://stackoverflow.com/a/53405390/2124254
    let transform =
      _s.transform != 'none'
        ? _s.transform.replace('matrix(', '').split(',')
        : [1, 1, 1, 1];
    let transformScaleX = parseFloat(transform[0]);
    let transformScaleY = parseFloat(transform[3]);

    // scale transform applies to the border and padding of the element
    let borderWidth =
      (getPropValue(_s, 'border-left-width') +
        getPropValue(_s, 'border-right-width')) *
      transformScaleX;
    let borderHeight =
      (getPropValue(_s, 'border-top-width') +
        getPropValue(_s, 'border-bottom-width')) *
      transformScaleY;

    let paddingWidth =
      (getPropValue(_s, 'padding-left') +
        getPropValue(_s, 'padding-right')) *
      transformScaleX;
    let paddingHeight =
      (getPropValue(_s, 'padding-top') +
        getPropValue(_s, 'padding-bottom')) *
      transformScaleY;

    return {
      scaleX: (rect.width - borderWidth - paddingWidth) / canvas.width,
      scaleY:
        (rect.height - borderHeight - paddingHeight) / canvas.height,
      offsetX:
        rect.left +
        (getPropValue(_s, 'border-left-width') +
          getPropValue(_s, 'padding-left')) *
          transformScaleX,
      offsetY:
        rect.top +
        (getPropValue(_s, 'border-top-width') +
          getPropValue(_s, 'padding-top')) *
          transformScaleY
    };
  }

  /**
   * Execute the onDown callback for an object.
   *
   * @param {MouseEvent|TouchEvent} evt
   */
  function pointerDownHandler(evt) {
    // touchstart should be treated like a left mouse button
    let button = evt.button != null ? pointerMap[evt.button] : 'left';
    pressedButtons[button] = true;
    pointerHandler(evt, 'onDown');
  }

  /**
   * Execute the onUp callback for an object.
   *
   * @param {MouseEvent|TouchEvent} evt
   */
  function pointerUpHandler(evt) {
    let button = evt.button != null ? pointerMap[evt.button] : 'left';
    pressedButtons[button] = false;
    pointerHandler(evt, 'onUp');
  }

  /**
   * Track the position of the mousevt.
   *
   * @param {MouseEvent|TouchEvent} evt
   */
  function mouseMoveHandler(evt) {
    pointerHandler(evt, 'onOver');
  }

  /**
   * Reset pressed buttons.
   *
   * @param {MouseEvent|TouchEvent} evt
   */
  function blurEventHandler$2(evt) {
    let pointer = pointers.get(evt.target);
    pointer._oo = null;
    pressedButtons = {};
  }

  /**
   * Call a pointer callback function
   *
   * @param {Object} pointer
   * @param {String} eventName
   * @param {MouseEvent|TouchEvent} evt
   */
  function callCallback(pointer, eventName, evt) {
    // Trigger events
    let object = getCurrentObject(pointer);
    if (object && object[eventName]) {
      object[eventName](evt);
    }

    if (callbacks$1[eventName]) {
      callbacks$1[eventName](evt, object);
    }

    // handle onOut events
    if (eventName == 'onOver') {
      if (object != pointer._oo && pointer._oo && pointer._oo.onOut) {
        pointer._oo.onOut(evt);
      }

      pointer._oo = object;
    }
  }

  /**
   * Find the first object for the event and execute it's callback function
   *
   * @param {MouseEvent|TouchEvent} evt
   * @param {string} eventName - Which event was called.
   */
  function pointerHandler(evt, eventName) {
    evt.preventDefault();

    let canvas = evt.target;
    let pointer = pointers.get(canvas);
    let { scaleX, scaleY, offsetX, offsetY } = getCanvasOffset(pointer);
    let isTouchEvent = evt.type.includes('touch');

    if (isTouchEvent) {
      // track new touches
      Array.from(evt.touches).map(
        ({ clientX, clientY, identifier }) => {
          let touch = pointer.touches[identifier];
          if (!touch) {
            touch = pointer.touches[identifier] = {
              start: {
                x: (clientX - offsetX) / scaleX,
                y: (clientY - offsetY) / scaleY
              }
            };
            pointer.touches.length++;
          }

          touch.changed = false;
        }
      );

      // handle only changed touches
      Array.from(evt.changedTouches).map(
        ({ clientX, clientY, identifier }) => {
          let touch = pointer.touches[identifier];
          touch.changed = true;
          touch.x = pointer.x = (clientX - offsetX) / scaleX;
          touch.y = pointer.y = (clientY - offsetY) / scaleY;

          callCallback(pointer, eventName, evt);
          emit('touchChanged', evt, pointer.touches);

          // remove touches
          if (eventName == 'onUp') {
            delete pointer.touches[identifier];
            pointer.touches.length--;

            if (!pointer.touches.length) {
              emit('touchEnd');
            }
          }
        }
      );
    } else {
      // translate the scaled size back as if the canvas was at a
      // 1:1 scale
      pointer.x = (evt.clientX - offsetX) / scaleX;
      pointer.y = (evt.clientY - offsetY) / scaleY;

      callCallback(pointer, eventName, evt);
    }
  }

  /**
   * Initialize pointer event listeners. This function must be called before using other pointer functions.
   *
   * If you need to use multiple canvas, you'll have to initialize the pointer for each one individually as each canvas maintains its own pointer object.
   * @function initPointer
   *
   * @param {Object} [options] - Pointer options.
   * @param {Number} [options.radius=5] - Radius of the pointer.
   * @param {HTMLCanvasElement} [options.canvas] - The canvas that event listeners will be attached to. Defaults to [core.getCanvas()](api/core#getCanvas).
   *
   * @returns {{x: Number, y: Number, radius: Number, canvas: HTMLCanvasElement, touches: Object}} The pointer object for the canvas.
   */
  function initPointer({
    radius = 5,
    canvas = getCanvas()
  } = {}) {
    let pointer = pointers.get(canvas);
    if (!pointer) {
      let style = window.getComputedStyle(canvas);

      pointer = {
        x: 0,
        y: 0,
        radius,
        touches: { length: 0 },
        canvas,

        // cf = current frame, lf = last frame, o = objects,
        // oo = over object, _s = style
        _cf: [],
        _lf: [],
        _o: [],
        _oo: null,
        _s: style
      };
      pointers.set(canvas, pointer);
    }

    // if this function is called multiple times, the same event
    // won't be added multiple times
    // @see https://stackoverflow.com/questions/28056716/check-if-an-element-has-event-listener-on-it-no-jquery/41137585#41137585
    canvas.addEventListener('mousedown', pointerDownHandler);
    canvas.addEventListener('touchstart', pointerDownHandler);
    canvas.addEventListener('mouseup', pointerUpHandler);
    canvas.addEventListener('touchend', pointerUpHandler);
    canvas.addEventListener('touchcancel', pointerUpHandler);
    canvas.addEventListener('blur', blurEventHandler$2);
    canvas.addEventListener('mousemove', mouseMoveHandler);
    canvas.addEventListener('touchmove', mouseMoveHandler);

    // however, the tick event should only be registered once
    // otherwise it completely destroys pointer events
    if (!pointer._t) {
      pointer._t = true;

      // reset object render order on every new frame
      on('tick', () => {
        pointer._lf.length = 0;

        pointer._cf.map(object => {
          pointer._lf.push(object);
        });

        pointer._cf.length = 0;
      });
    }

    return pointer;
  }

  /**
   * Begin tracking pointer events for an object.
   *
   * ```js
   * import { initPointer, track } from 'kontra';
   *
   * initPointer();
   *
   * track(obj);
   * track(obj1, obj2);
   * ```
   * @function track
   *
   * @param {...(Object|Object[])[]} objects - Object to track. Can be a single object, an array of objects, or a comma-separated list of objects.
   */
  function track(...objects) {
    objects.flat().map(object => {
      let canvas = object.context ? object.context.canvas : getCanvas();
      let pointer = pointers.get(canvas);

      // @ifdef DEBUG
      if (!pointer) {
        throw new ReferenceError(
          'Pointer events not initialized for the objects canvas'
        );
      }
      // @endif

      // override the objects render function to keep track of render
      // order
      if (!object._r) {
        object._r = object.render;

        object.render = function () {
          pointer._cf.push(this);
          this._r();
        };

        pointer._o.push(object);
      }
    });
  }

  /**
   * Stop tracking pointer events for an object.
   *
   * ```js
   * import { untrack } from 'kontra';
   *
   * untrack(obj);
   * untrack(obj1, obj2);
   * ```
   * @function untrack
   *
   * @param {...(Object|Object[])[]} objects - Object to untrack. Can be a single object, an array of objects, or a comma-separated list of objects.
   */
  function untrack(...objects) {
    objects.flat().map(object => {
      let canvas = object.context ? object.context.canvas : getCanvas();
      let pointer = pointers.get(canvas);

      // @ifdef DEBUG
      if (!pointer) {
        throw new ReferenceError(
          'Pointer events not initialized for the objects canvas'
        );
      }
      // @endif

      // restore original render function to no longer track render
      // order
      object.render = object._r;
      object._r = 0; // 0 is the shortest falsy value

      removeFromArray(pointer._o, object);
    });
  }

  /**
   * Check to see if the pointer is currently over the object. Since multiple objects may be rendered on top of one another, only the top most object under the pointer will return true.
   *
   * ```js
   * import { initPointer, track, pointer, pointerOver, Sprite } from 'kontra';
   *
   * initPointer();
   *
   * let sprite1 = Sprite({
   *   x: 10,
   *   y: 10,
   *   width: 10,
   *   height: 10
   * });
   * let sprite2 = Sprite({
   *   x: 15,
   *   y: 10,
   *   width: 10,
   *   height: 10
   * });
   *
   * track(sprite1, sprite2);
   *
   * sprite1.render();
   * sprite2.render();
   *
   * pointer.x = 14;
   * pointer.y = 15;
   *
   * console.log(pointerOver(sprite1));  //=> false
   * console.log(pointerOver(sprite2));  //=> true
   * ```
   * @function pointerOver
   *
   * @param {Object} object - The object to check if the pointer is over.
   *
   * @returns {Boolean} `true` if the pointer is currently over the object, `false` otherwise.
   */
  function pointerOver(object) {
    let canvas = object.context ? object.context.canvas : getCanvas();
    let pointer = pointers.get(canvas);

    // @ifdef DEBUG
    if (!pointer) {
      throw new ReferenceError(
        'Pointer events not initialized for the objects canvas'
      );
    }
    // @endif

    return (
      pointer._o.includes(object) &&
      /* eslint-disable-next-line no-restricted-syntax */
      getCurrentObject(pointer) === object
    );
  }

  /**
   * Register a function to be called on pointer events. Is passed the original Event and the target object (if there is one).
   *
   * ```js
   * import { initPointer, onPointer } from 'kontra';
   *
   * initPointer();
   *
   * onPointer('down', function(e, object) {
   *   // handle pointer down
   * });
   * ```
   * @function onPointer
   *
   * @param {'down'|'up'} direction - Direction of the pointer event.
   * @param {(evt: MouseEvent|TouchEvent, object?: Object) => void} callback - Function to call on pointer event.
   */
  function onPointer(direction, callback) {
    let eventName = direction[0].toUpperCase() + direction.substr(1);
    callbacks$1['on' + eventName] = callback;
  }

  /**
   * Unregister the callback for a pointer event.
   *
   * ```js
   * import { initPointer, offPointer } from 'kontra';
   *
   * initPointer();
   *
   * offPointer('down');
   * ```
   * @function offPointer
   *
   * @param {'down'|'up'} direction - Direction of the pointer event.
   */
  function offPointer(direction) {
    let eventName = direction[0].toUpperCase() + direction.substr(1);
    callbacks$1['on' + eventName] = 0;
  }

  /**
   * Check if a button is currently pressed. Use during an `update()` function to perform actions each frame.
   *
   * ```js
   * import { initPointer, pointerPressed } from 'kontra';
   *
   * initPointer();
   *
   * Sprite({
   *   update: function() {
   *     if (pointerPressed('left')){
   *       // left mouse button pressed
   *     }
   *     else if (pointerPressed('right')) {
   *       // right mouse button pressed
   *     }
   *   }
   * });
   * ```
   * @function pointerPressed
   *
   * @param {String} button - Button to check for pressed state.
   *
   * @returns {Boolean} `true` if the button is pressed, `false` otherwise.
   */
  function pointerPressed(button) {
    return !!pressedButtons[button];
  }

  /**
   * An accessible button. Supports screen readers and keyboard navigation using the <kbd>Tab</kbd> key. The button is automatically [tracked](api/pointer#track) by the pointer and accepts all pointer functions, but you will still need to call [initPointer](api/pointer#initPointer) to have pointer events enabled.
   * @class Button
   * @extends Sprite
   *
   * @param {Object} [properties] - Properties of the button (in addition to all Sprite properties).
   * @param {Object} [properties.text] - Properties of [Text](api/text) which are used to create the [textNode](api/button#textNode).
   * @param {Boolean} [properties.disabled] - Whether the button is disabled when created.
   * @param {Number} [properties.padX=0] - The horizontal padding.
   * @param {Number} [properties.padY=0] - The vertical padding.
   * @param {Function} [properties.onEnable] - Function called when the button is enabled.
   * @param {Function} [properties.onDisable] - Function called when the button is disabled.
   * @param {Function} [properties.onFocus] - Function called when the button is focused by the keyboard.
   * @param {Function} [properties.onBlur] - Function called when the button losses focus either by the pointer or keyboard.
   */
  class Button extends Sprite {
    /**
     * @docs docs/api_docs/button.js
     */

    init({
      /**
       * The horizontal padding. This will be added to the width to give the final width of the button.
       * @memberof Button
       * @property {Number} padX
       */
      padX = 0,

      /**
       * The vertical padding. This will be added to the height to give the final height of the button.
       * @memberof Button
       * @property {Number} padY
       */
      padY = 0,

      text,
      disabled = false,
      onDown,
      onUp,
      ...props
    } = {}) {
      super.init({
        padX,
        padY,
        ...props
      });

      /**
       * Each Button creates a Text object and adds it as a child. The `text` of the Text object is used as the accessible name of the HTMLButtonElement.
       * @memberof Button
       * @property {Text} textNode
       */
      this.textNode = factory$7({
        ...text,

        // ensure the text uses the same context as the button
        context: this.context
      });

      // if the user didn't set a width/height or use an image
      // default to the textNode dimensions
      if (!this.width) {
        this.width = this.textNode.width;
        this.height = this.textNode.height;
      }

      track(this);
      this.addChild(this.textNode);

      // od = on down
      this._od = onDown || noop;

      // ou = on up
      this._ou = onUp || noop;

      // create an accessible DOM node for screen readers
      // dn = dom node
      let button = (this._dn = document.createElement('button'));
      button.style = srOnlyStyle;
      button.textContent = this.text;

      if (disabled) {
        this.disable();
      }

      // sync events between the button element and the class
      button.addEventListener('focus', () => this.focus());
      button.addEventListener('blur', () => this.blur());
      button.addEventListener('keydown', evt => this._kd(evt));
      button.addEventListener('keyup', evt => this._ku(evt));

      addToDom(button, this.context.canvas);

      this._uw();
      this._p();
    }

    /**
     * The text property of the Text object.
     * @memberof Button
     * @property {String} text
     */
    get text() {
      return this.textNode.text;
    }

    set text(value) {
      // d = dirty
      this._d = true;
      this.textNode.text = value;
    }

    /**
     * Clean up the button by removing the HTMLButtonElement from the DOM.
     * @memberof Button
     * @function destroy
     */
    destroy() {
      this._dn.remove();
    }

    _p() {
      // update DOM node text if it has changed
      if (this.text != this._dn.textContent) {
        this._dn.textContent = this.text;
      }

      // update width and height (need to prerender the button
      // first)
      this.textNode._p();

      let width = this.textNode.width + this.padX * 2;
      let height = this.textNode.height + this.padY * 2;

      this.width = Math.max(width, this.width);
      this.height = Math.max(height, this.height);
      this._uw();
    }

    render() {
      if (this._d) {
        this._p();
      }

      super.render();
    }

    /**
     * Enable the button. Calls [onEnable](api/button#onEnable) if passed.
     * @memberof Button
     * @function enable
     */
    enable() {
      /**
       * If the button is disabled.
       * @memberof Button
       * @property {Boolean} disabled
       */
      this.disabled = this._dn.disabled = false;
      this.onEnable();
    }

    /**
     * Disable the button. A disabled button will not longer render nor respond to pointer and keyboard events. Calls [onDisable](api/button#onDisable) if passed.
     * @memberof Button
     * @function disable
     */
    disable() {
      this.disabled = this._dn.disabled = true;
      this.onDisable();
    }

    /**
     * Focus the button. Calls [onFocus](api/button#onFocus) if passed.
     * @memberof Button
     * @function focus
     */
    focus() {
      if (!this.disabled) {
        /**
         * If the button is focused.
         * @memberof Button
         * @property {Boolean} focused
         */
        this.focused = true;
        // prevent infinite loop
        if (document.activeElement != this._dn) this._dn.focus();

        this.onFocus();
      }
    }

    /**
     * Blur the button. Calls [onBlur](api/button#onBlur) if passed.
     * @memberof Button
     * @function blur
     */
    blur() {
      this.focused = false;
      // prevent infinite loop
      if (document.activeElement == this._dn) this._dn.blur();

      this.onBlur();
    }

    onOver() {
      if (!this.disabled) {
        /**
         * If the button is hovered.
         * @memberof Button
         * @property {Boolean} hovered
         */
        this.hovered = true;
      }
    }

    onOut() {
      this.hovered = false;
    }

    /**
     * Function called when then button is enabled. Override this function to have the button do something when enabled.
     * @memberof Button
     * @function onEnable
     */
    onEnable() {}

    /**
     * Function called when then button is disabled. Override this function to have the button do something when disabled.
     * @memberof Button
     * @function onDisable
     */
    onDisable() {}

    /**
     * Function called when then button is focused. Override this function to have the button do something when focused.
     * @memberof Button
     * @function onFocus
     */
    onFocus() {}

    /**
     * Function called when then button is blurred. Override this function to have the button do something when blurred.
     * @memberof Button
     * @function onBlur
     */
    onBlur() {}

    onDown() {
      if (!this.disabled) {
        /**
         * If the button is pressed.
         * @memberof Button
         * @property {Boolean} pressed
         */
        this.pressed = true;
        this._od();
      }
    }

    onUp() {
      if (!this.disabled) {
        this.pressed = false;
        this._ou();
      }
    }

    // kd = keydown
    _kd(evt) {
      // activate button on enter or space
      if (evt.code == 'Enter' || evt.code == 'Space') {
        this.onDown();
      }
    }

    // kd = keydown
    _ku(evt) {
      // activate button on enter or space
      if (evt.code == 'Enter' || evt.code == 'Space') {
        this.onUp();
      }
    }
  }

  function factory$6() {
    return new Button(...arguments);
  }

  /**
   * Clear the canvas.
   */
  function clear(context) {
    let canvas = context.canvas;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * The game loop updates and renders the game every frame. The game loop is stopped by default and will not start until the loops `start()` function is called.
   *
   * The game loop uses a time-based animation with a fixed `dt` to [avoid frame rate issues](http://blog.sklambert.com/using-time-based-animation-implement/). Each update call is guaranteed to equal 1/60 of a second.
   *
   * This means that you can avoid having to do time based calculations in your update functions and instead do fixed updates.
   *
   * ```js
   * import { Sprite, GameLoop } from 'kontra';
   *
   * let sprite = Sprite({
   *   x: 100,
   *   y: 200,
   *   width: 20,
   *   height: 40,
   *   color: 'red'
   * });
   *
   * let loop = GameLoop({
   *   update: function(dt) {
   *     // no need to determine how many pixels you want to
   *     // move every second and multiple by dt
   *     // sprite.x += 180 * dt;
   *
   *     // instead just update by how many pixels you want
   *     // to move every frame and the loop will ensure 60FPS
   *     sprite.x += 3;
   *   },
   *   render: function() {
   *     sprite.render();
   *   }
   * });
   *
   * loop.start();
   * ```
   * @class GameLoop
   *
   * @param {Object} properties - Properties of the game loop.
   * @param {(dt: Number) => void} [properties.update] - Function called every frame to update the game. Is passed the fixed `dt` as a parameter.
   * @param {Function} properties.render - Function called every frame to render the game.
   * @param {Number}   [properties.fps=60] - Desired frame rate.
   * @param {Boolean}  [properties.clearCanvas=true] - Clear the canvas every frame before the `render()` function is called.
   * @param {CanvasRenderingContext2D} [properties.context] - The context that should be cleared each frame if `clearContext` is not set to `false`. Defaults to [core.getContext()](api/core#getContext).
   * @param {Boolean} [properties.blur=false] - If the loop should still update and render if the page does not have focus.
   */
  function GameLoop({
    fps = 60,
    clearCanvas = true,
    update = noop,
    render,
    context = getContext(),
    blur = false
  } = {}) {
    // check for required functions
    // @ifdef DEBUG
    if (!render) {
      throw Error('You must provide a render() function');
    }
    // @endif

    // animation variables
    let accumulator = 0;
    let delta = 1e3 / fps; // delta between performance.now timings (in ms)
    let step = 1 / fps;
    let clearFn = clearCanvas ? clear : noop;
    let last, rAF, now, dt, loop;
    let focused = true;

    if (!blur) {
      window.addEventListener('focus', () => {
        focused = true;
      });
      window.addEventListener('blur', () => {
        focused = false;
      });
    }

    on('init', () => {
      loop.context ??= getContext();
    });

    /**
     * Called every frame of the game loop.
     */
    function frame() {
      rAF = requestAnimationFrame(frame);

      // don't update the frame if tab isn't focused
      if (!focused) return;

      now = performance.now();
      dt = now - last;
      last = now;

      // prevent updating the game with a very large dt if the game
      // were to lose focus and then regain focus later
      if (dt > 1e3) {
        return;
      }

      emit('tick');
      accumulator += dt;

      while (accumulator >= delta) {
        loop.update(step);

        accumulator -= delta;
      }

      clearFn(loop.context);
      loop.render();
    }

    // game loop object
    loop = {
      /**
       * Called every frame to update the game. Put all of your games update logic here.
       * @memberof GameLoop
       * @function update
       *
       * @param {Number} [dt] - The fixed dt time of 1/60 of a frame.
       */
      update,

      /**
       * Called every frame to render the game. Put all of your games render logic here.
       * @memberof GameLoop
       * @function render
       */
      render,

      /**
       * If the game loop is currently stopped.
       *
       * ```js
       * import { GameLoop } from 'kontra';
       *
       * let loop = GameLoop({
       *   // ...
       * });
       * console.log(loop.isStopped);  //=> true
       *
       * loop.start();
       * console.log(loop.isStopped);  //=> false
       *
       * loop.stop();
       * console.log(loop.isStopped);  //=> true
       * ```
       * @memberof GameLoop
       * @property {Boolean} isStopped
       */
      isStopped: true,

      /**
       * The context the game loop will clear. Defaults to [core.getContext()](api/core#getCcontext).
       *
       * @memberof GameLoop
       * @property {CanvasRenderingContext2D} context
       */
      context,

      /**
       * Start the game loop.
       * @memberof GameLoop
       * @function start
       */
      start() {
        last = performance.now();
        this.isStopped = false;
        requestAnimationFrame(frame);
      },

      /**
       * Stop the game loop.
       * @memberof GameLoop
       * @function stop
       */
      stop() {
        this.isStopped = true;
        cancelAnimationFrame(rAF);
      },

      // expose properties for testing
      // @ifdef DEBUG
      _frame: frame,
      set _last(value) {
        last = value;
      }
      // @endif
    };

    return loop;
  }

  /**
   * A simple gamepad API. You can use it move the main sprite or respond to gamepad events.
   *
   * **NOTE:** Gamepad support requires using a secure context (HTTPS) and the [GameLoop](/api/gameLoop) (since the gamepad state must be checked every frame as there are no global event listeners for gamepad button / axes events).
   *
   * ```js
   * import { initGamepad, GameLoop, gamepadPressed } from 'kontra';
   *
   * // this function must be called first before gamepad
   * // functions will work
   * initGamepad();
   *
   * function update() {
   *   if (gamepadPressed('dpadleft')) {
   *     // move left
   *   }
   * }
   *
   * // using the GameLoop is required
   * let loop = kontra.GameLoop({
   *   // ...
   * })
   * loop.start();
   * ```
   * @sectionName Gamepad
   */

  /**
   * Below is a list of button names that are provided by default. If you need to extend or modify this list, you can use the [gamepadMap](api/gamepad#gamepadMap) property.
   *
   * - south _(Xbox controller: A; PS4 controller: cross)_
   * - east _(Xbox controller: B; PS4 controller: circle)_
   * - west _(Xbox controller: X; PS4 controller: square)_
   * - north _(Xbox controller: Y; PS4 controller: triangle)_
   * - leftshoulder _(Xbox controller: LB; PS4 controller: L1)_
   * - rightshoulder _(Xbox controller: RB; PS4 controller: R1)_
   * - lefttrigger _(Xbox controller: LT; PS4 controller: L2)_
   * - righttrigger _(Xbox controller: RT; PS4 controller: R2)_
   * - select _(Xbox controller: back/view; PS4 controller: share)_
   * - start _(Xbox controller: start/menu; PS4 controller: options)_
   * - leftstick
   * - rightstick
   * - dpadup
   * - dpaddown
   * - dpadleft
   * - dpadright
   *
   * @sectionName Available Buttons
   */

  let gamepads = [];
  let gamepaddownCallbacks = {};
  let gamepadupCallbacks = {};

  /**
   * A map of Gamepad button indices to button names. Modify this object to expand the list of [available buttons](api/gamepad#available-buttons). By default, the map uses the Xbox and PS4 controller button indicies.
   *
   * ```js
   * import { gamepadMap, gamepadPressed } from 'kontra';
   *
   * gamepadMap[2] = 'buttonWest';
   *
   * if (gamepadPressed('buttonWest')) {
   *   // handle west face button
   * }
   * ```
   * @property {{[key: Number]: String}} gamepadMap
   */
  let gamepadMap = {
    0: 'south',
    1: 'east',
    2: 'west',
    3: 'north',
    4: 'leftshoulder',
    5: 'rightshoulder',
    6: 'lefttrigger',
    7: 'righttrigger',
    8: 'select',
    9: 'start',
    10: 'leftstick',
    11: 'rightstick',
    12: 'dpadup',
    13: 'dpaddown',
    14: 'dpadleft',
    15: 'dpadright'
  };

  /**
   * Keep track of the connected gamepads so multiple gamepads can be used at a time.
   */
  function gamepadConnectedHandler(event) {
    gamepads[event.gamepad.index] = {
      pressedButtons: {},
      axes: {}
    };
  }

  /**
   * Remove disconnected gamepads
   */
  function gamepadDisconnectedHandler(event) {
    delete gamepads[event.gamepad.index];
  }

  /**
   * Reset pressed buttons and axes information.
   */
  function blurEventHandler$1() {
    gamepads.map(gamepad => {
      gamepad.pressedButtons = {};
      gamepad.axes = {};
    });
  }

  /**
   * Update the gamepad state. Call this function every frame only if you are not using the [GameLoop](/api/gameLoop). Otherwise it is called automatically.
   *
   * ```js
   * import { initGamepad, updateGamepad, gamepadPressed } from 'kontra';
   *
   * initGamepad();
   *
   * function update() {
   *   // not using GameLoop so need to manually call update state
   *   updateGamepad();
   *
   *   if (gamepadPressed('dpadleft')) {
   *     // move left
   *   }
   * }
   *
   * ```
   * @function updateGamepad
   */
  function updateGamepad() {
    // in Chrome this a GamepadList but in Firefox it's an array
    let pads = navigator.getGamepads
      ? navigator.getGamepads()
      : navigator.webkitGetGamepads
      ? navigator.webkitGetGamepads
      : [];

    for (let i = 0; i < pads.length; i++) {
      let gamepad = pads[i];

      // a GamepadList will have a default length of 4 but use null for
      // any index that doesn't have a gamepad connected
      if (!gamepad) {
        continue;
      }

      gamepad.buttons.map((button, index) => {
        let buttonName = gamepadMap[index];
        let { pressed } = button;
        let { pressedButtons } = gamepads[gamepad.index];
        let state = pressedButtons[buttonName];

        // if the button was not pressed before and is now pressed
        // that's a gamepaddown event
        if (!state && pressed) {
          [
            gamepaddownCallbacks[gamepad.index],
            gamepaddownCallbacks
          ].map(callback => {
            callback?.[buttonName]?.(gamepad, button, buttonName);
          });
        }
        // if the button was pressed before and is now not pressed
        // that's a gamepadup event
        else if (state && !pressed) {
          [gamepadupCallbacks[gamepad.index], gamepadupCallbacks].map(
            callback => {
              callback?.[buttonName]?.(gamepad, button, buttonName);
            }
          );
        }

        pressedButtons[buttonName] = pressed;
      });

      let { axes } = gamepads[gamepad.index];
      axes.leftstickx = gamepad.axes[0];
      axes.leftsticky = gamepad.axes[1];
      axes.rightstickx = gamepad.axes[2];
      axes.rightsticky = gamepad.axes[3];
    }
  }

  /**
   * Initialize gamepad event listeners. This function must be called before using other gamepad functions.
   * @function initGamepad
   */
  function initGamepad() {
    window.addEventListener(
      'gamepadconnected',
      gamepadConnectedHandler
    );
    window.addEventListener(
      'gamepaddisconnected',
      gamepadDisconnectedHandler
    );
    window.addEventListener('blur', blurEventHandler$1);

    // update gamepad state each frame
    on('tick', updateGamepad);
  }

  /**
   * Register a function to be called when a gamepad button is pressed. Takes a single button or an array of buttons. Is passed the [Gamepad](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad) and the [GamepadButton](https://developer.mozilla.org/en-US/docs/Web/API/GamepadButton), and the buttonName that was pressed as parameters.
   *
   * When registering the function, you have the choice of registering to a specific gamepad or to all gamepads. To register to a specific gamepad, pass the desired gamepad index as the `gamepad` option. If the `gamepad` option is ommited the callback is bound to all gamepads instead of a specific one.
   *
   * You can register a callback for both a specific gamepad and for all gamepads in two different calls. When this happens, the specific gamepad callback will be called first and then the global one.
   *
   * ```js
   * import { initGamepad, onGamepad } from 'kontra';
   *
   * initGamepad();
   *
   * onGamepad('start', function(gamepad, button, buttonName) {
   *   // pause the game
   * });
   * onGamepad(['south', 'rightstick'], function(gamepad, button, buttonName) {
   *   // fire gun
   * });
   *
   * onGamepad('south', function() {
   *   // handle south button
   * }, {
   *   gamepad: 0  // register just for the gamepad at index 0
   * });
   * ```
   * @function onGamepad
   *
   * @param {String|String[]} buttons - Button or buttons to register callback for.
   * @param {(gamepad: Gamepad, button: GamepadButton, buttonName: string) => void} callback - The function to be called when the button is pressed.
   * @param {Object} [options] - Register options.
   * @param {Number} [options.gamepad] - Gamepad index. Defaults to registerting for all gamepads.
   * @param {'gamepaddown'|'gamepadup'} [options.handler='gamepaddown'] - Whether to register to the gamepaddown or gamepadup event.
   */
  function onGamepad(
    buttons,
    callback,
    { gamepad, handler = 'gamepaddown' } = {}
  ) {
    let callbacks =
      handler == 'gamepaddown'
        ? gamepaddownCallbacks
        : gamepadupCallbacks;

    // smaller than doing `Array.isArray(buttons) ? buttons : [buttons]`
    [].concat(buttons).map(button => {
      if (isNaN(gamepad)) {
        callbacks[button] = callback;
      } else {
        callbacks[gamepad] = callbacks[gamepad] || {};
        callbacks[gamepad][button] = callback;
      }
    });
  }

  /**
   * Unregister the callback function for a button. Takes a single button or an array of buttons.
   *
   * When unregistering a button, you have the choice to unregister from a specific gamepad or from all gamepads. To unregister from a specific gamepad, pass the desired gamepad index as the `gamepad` option. If the `gamepad` option is ommited the callback is unregistered from all gamepads instead of a specific one.
   *
   * ```js
   * import { offGamepad } from 'kontra';
   *
   * offGamepad('start');
   * offGamepad(['south', 'rightstick']);
   *
   * offGamepad('south', {
   *   gamepad: 0  // unregister from just the gamepad at index 0
   * });
   * ```
   * @function offGamepad
   *
   * @param {String|String[]} buttons - Button or buttons to unregister callback for.
   * @param {Object} [options] - Unregister options.
   * @param {Number} [options.gamepad] - Gamepad index. Defaults to unregistering from all gamepads.
   * @param {'gamepaddown'|'gamepadup'} [options.handler='gamepaddown'] - Whether to unregister from gamepaddown or gamepadup event.
   */
  function offGamepad(
    buttons,
    { gamepad, handler = 'gamepaddown' } = {}
  ) {
    let callbacks =
      handler == 'gamepaddown'
        ? gamepaddownCallbacks
        : gamepadupCallbacks;

    // smaller than doing `Array.isArray(buttons) ? buttons : [buttons]`
    [].concat(buttons).map(button => {
      if (isNaN(gamepad)) {
        delete callbacks[button];
      } else {
        callbacks[gamepad] = callbacks[gamepad] || {};
        delete callbacks[gamepad][button];
      }
    });
  }

  /**
   * Check if a button is currently pressed. Use during an `update()` function to perform actions each frame.
   *
   * You can check if the button is pressed on all gamepads or just a specific gamepad. To check a specific gamepad, pass the desired gamepad index as the `gamepad` option. If the `gamepad` option is ommited all gamepads will be checked and if at least one is pressing the button the function will return `true`.
   *
   * ```js
   * import { Sprite, initGamepad, gamepadPressed } from 'kontra';
   *
   * initGamepad();
   *
   * let sprite = Sprite({
   *   update: function() {
   *     if (gamepadPressed('dpadleft')){
   *       // left dpad pressed
   *     }
   *     else if (gamepadPressed('dpadright')) {
   *       // right dpad pressed
   *     }
   *
   *     if (gamepadPressed('dpadup')) {
   *       // up dpad pressed
   *     }
   *     else if (gamepadPressed('dpaddown')) {
   *       // down dpad pressed
   *     }
   *   }
   * });
   * ```
   * @function gamepadPressed
   *
   * @param {String} button - Button name to check for pressed state.
   * @param {Object} [options] - Pressed options.
   * @param {Number} [options.gamepad] - Index of the gamepad to check for pressed state.
   *
   * @returns {Boolean} `true` if the button is pressed, `false` otherwise.
   */
  function gamepadPressed(button, { gamepad } = {}) {
    if (isNaN(gamepad)) {
      return gamepads.some(pad => pad.pressedButtons[button]);
    }
    // this won't exist until the gamepad has been connected
    if (gamepads[gamepad]) {
      return !!gamepads[gamepad].pressedButtons[button];
    }

    return false;
  }

  /**
   * Get the value of a specific gamepad axis.
   *
   * Available axes are:
   *
   * - leftstickx
   * - leftsticky
   * - rightstickx
   * - rightsticky
   *
   * ```js
   * import { Sprite, initGamepad, gamepadAxis } from 'kontra';
   *
   * initGamepad();
   *
   * let sprite = Sprite({
   *   update: function() {
   *     // check the axis of the gamepad connected to index 0
   *     let axisX = gamepadAxis('leftstickx', 0);
   *     let axisY = gamepadAxis('leftsticky', 0);
   *
   *     if (axisX < -0.4) {
   *       // move left
   *     }
   *     else if (axisX > 0.4) {
   *       // move right
   *     }
   *
   *     if (axisY < -0.4) {
   *       // move up
   *     }
   *     else if (axisY > 0.4) {
   *       // move down
   *     }
   *   }
   * });
   * ```
   * @function gamepadAxis
   *
   * @param {String} name - Name of the axis.
   * @param {Number} gamepad - Index of the gamepad to check.
   *
   * @returns {Number} The value of the axis between -1.0 and 1.0.
   */
  function gamepadAxis(name, gamepad) {
    return gamepads[gamepad]?.axes[name] || 0;
  }

  /**
   * A simple gesture API. You can use it to move the main sprite or respond to gesture events.
   *
   * ```js
   * import { initPointer, initGesture, onGesture } from 'kontra';
   *
   * // these functions must be called first before gesture
   * // functions will work
   * initPointer();
   * initGesture();
   *
   * onGesture('swipeleft', function() {
   *   // handle swipeleft event
   * })
   * ```
   * @sectionName Gesture
   */

  /**
   * Below is a list of gestures that are provided by default. If you need to extend this list, you can use the [gestureMap](api/gesture#gestureMap) property.
   *
   * - swipeleft, swipeup, swiperight, swipedown
   * - pinchin, pinchout
   * @sectionName Available Gestures
   */

  // expose for tests
  let callbacks = {};
  let currGesture;
  let init = false;

  /**
   * A map of gesture objects to gesture names. Add to this object to expand the list of [available gestures](api/gesture#available-gestures).
   *
   * The gesture name should be the overall name of the gesture (e.g. swipe, pinch) and not include any directional information (e.g. left, in).
   *
   * A gesture object should have a `touches` property and at least one touch event function. The provided gestures also have a `threshold` property which is the minimum distance before the gesture is recognized.
   *
   * The `touches` property is a number that indicates how many touch points are required for the gesture. A touch event function is a function whose name should match the touch event name it triggers on (e.g. touchstart, touchmove). A touch event function is passed a touch object.
   *
   * A gesture can have multiple touch event functions, but one of them must return the direction of the gesture (e.g. left, in). The gesture name and the gesture direction are combined together as the callback name for [onGesture](api/gesture#onGesture) (e.g. swipeleft, pinchin).
   *
   * A touch object is an array-like object where each index is a touch. A touch has the current `x` and `y` position of the touch and a `start` property which has the initial start `x` and `y` position.
   *
   * ```js
   * import { gestureMap, onGesture } from 'kontra';
   *
   * // pan is the name of the gesture
   * gestureMap.pan = {
   *   // panning uses 1 touch
   *   touches: 1,
   *   // panning is triggered on touchmove
   *   touchmove({ 0: touch }) {
   *     let x = touch.x - touch.start.x;
   *     let y = touch.y - touch.start.y;
   *     let absX = Math.abs(x);
   *     let absY = Math.abs(y);
   *
   *     // return the direction the pan
   *     return absX > absY
   *       ? x < 0 ? 'left' : 'right'
   *       : y < 0 ? 'up' : 'down'
   *   }
   * };
   *
   * // the gesture name and direction are combined as the callback name
   * onGesture('panleft', function(e, touches) {
   *   // handle panleft gesture
   * });
   * ```
   * @property {{[name: String]: {touches: Number, touchstart?: Function, touchmove?: Function, touchend?: Function, [prop: String]: any}}} gestureMap
   */
  let gestureMap = {
    swipe: {
      touches: 1,
      threshold: 10,
      touchend({ 0: touch }) {
        let x = touch.x - touch.start.x;
        let y = touch.y - touch.start.y;
        let absX = Math.abs(x);
        let absY = Math.abs(y);
        if (absX < this.threshold && absY < this.threshold) return;

        return absX > absY
          ? x < 0
            ? 'left'
            : 'right'
          : y < 0
          ? 'up'
          : 'down';
      }
    },
    pinch: {
      touches: 2,
      threshold: 2,
      touchstart({ 0: touch0, 1: touch1 }) {
        this.prevDist = Math.hypot(
          touch0.x - touch1.x,
          touch0.y - touch1.y
        );
      },
      touchmove({ 0: touch0, 1: touch1 }) {
        let dist = Math.hypot(touch0.x - touch1.x, touch0.y - touch1.y);
        if (Math.abs(dist - this.prevDist) < this.threshold) return;

        let dir = dist > this.prevDist ? 'out' : 'in';
        this.prevDist = dist;
        return dir;
      }
    }
  };

  /**
   * Initialize gesture event listeners. This function must be called before using other gesture functions. Gestures depend on pointer events, so [initPointer](api/pointer#initPointer) must be called as well.
   * @function initGesture
   */
  function initGesture() {
    // don't add the on call multiple times otherwise it will mess up
    // gesture events
    if (!init) {
      init = true;

      on('touchChanged', (evt, touches) => {
        Object.keys(gestureMap).map(name => {
          let gesture = gestureMap[name];
          let type;

          if (
            // don't call swipe if at the end of a pinch and there's 1
            // finger left touching
            (!currGesture || currGesture == name) &&
            touches.length == gesture.touches &&
            // ensure that the indices of touches goes from 0..N.
            // otherwise a length 1 touch could have an index of 2
            // which means there were two other touches that started
            // a gesture
            // @see https://stackoverflow.com/a/33352604/2124254
            [...Array(touches.length).keys()].every(
              key => touches[key]
            ) &&
            (type = gesture[evt.type]?.(touches) ?? '') &&
            callbacks[name + type]
          ) {
            currGesture = name;
            callbacks[name + type](evt, touches);
          }
        });
      });

      on('touchEnd', () => {
        // 0 is the shortest falsy value
        currGesture = 0;
      });
    }
  }

  /**
   * Register a function to be called on a gesture event. Is passed the original Event and the touch object, an array-like object of touches.
   *
   * ```js
   * import { initPointer, initGesture, onGesture } from 'kontra';
   *
   * initPointer();
   * initGesture();
   *
   * onGesture('swipeleft', function(e, touches) {
   *   // handle swipeleft gesture
   * });
   * ```
   * @function onGesture
   *
   * @param {String|String[]} gestures - Gesture or gestures to register callback for.
   * @param {(evt: TouchEvent, touches: Object) => void} callback - Function to call on gesture events.
   */
  function onGesture(gestures, callback) {
    [].concat(gestures).map(gesture => {
      callbacks[gesture] = callback;
    });
  }

  /**
   * Unregister the callback function for a gesture.
   *
   * ```js
   * import { initPointer, initGesture, offGesture } from 'kontra';
   *
   * initPointer();
   * initGesture();
   *
   * offGesture('swipeleft');
   * ```
   * @function offGesture
   *
   * @param {String|String[]} gestures - Gesture or gestures to unregister callback for.
   */
  function offGesture(gestures) {
    [].concat(gestures).map(gesture => {
      callbacks[gesture] = 0;
    });
  }

  let handler = {
    set(obj, prop, value) {
      // don't set dirty for private properties
      if (!prop.startsWith('_')) {
        obj._d = true;
      }

      return Reflect.set(obj, prop, value);
    }
  };

  let alignment = {
    start(rtl) {
      return rtl ? 1 : 0;
    },
    center() {
      return 0.5;
    },
    end(rtl) {
      return rtl ? 0 : 1;
    }
  };

  /**
   * Quickly and easily organize your UI elements into a grid. Works great for auto placing menu options without having to figure out the position for each one. Based on the concept of CSS Grid Layout.
   * @class Grid
   * @extends GameObject
   *
   * @param {Object} [properties] - Properties of the grid manager.
   * @param {String} [properties.flow='column'] - The flow of the grid.
   * @param {String|String[]} [properties.align='start'] - The vertical alignment of the grid.
   * @param {String|String[]} [properties.justify='start'] - The horizontal alignment of the grid.
   * @param {Number|Number[]} [properties.colGap=0] - The horizontal gap between each column in the grid.
   * @param {Number|Number[]} [properties.rowGap=0] - The vertical gap between each row in the grid.
   * @param {Number} [properties.numCols=1] - The number of columns in the grid. Only applies if the `flow` property is set to `grid`.
   * @param {String} [properties.dir=''] - The direction of the grid.
   * @param {{metric: Function, callback: Function}[]} [properties.breakpoints=[]] - How the grid should change based on different metrics.
   */
  class Grid extends GameObject {
    /**
     * @docs docs/api_docs/grid.js
     */

    init({
      /**
       * How to organize all objects in the grid. Valid values are:
       *
       * - `column` - organize into a single column
       * - `row` - organize into a single row
       * - `grid` - organize into a grid with [numCols](api/grid#numCols) number of columns
       * @memberof Grid
       * @property {String} flow
       */
      flow = 'column',

      /**
       * The vertical alignment of the grid. Valid values are:
       *
       * - `start` - align to the top of row
       * - `center` - align to the center of the row
       * - `end` - align to the the bottom of the row
       *
       * An array of strings means the grid will set the vertical alignment for each row using the order of the array. For example, if the alignment is set to be `['end', 'start']`, then every odd row will use 'end' and every even row will use 'start'.
       *
       * Additionally, each child of the grid can use the `alignSelf` property to change it's alignment in the grid.
       * @memberof Grid
       * @property {String|String[]} align
       */
      align = 'start',

      /**
       * The horizontal alignment of the grid. Valid values are:
       *
       * - `start` - align to the left of column
       * - `center` - align to the center of the column
       * - `end` - align to the the right of the column
       *
       * An array of strings means the grid will set the horizontal alignment for each column using the order of the array. For example, if the alignment is set to be `['end', 'start']`, then every odd column will use 'end' and every even column will use 'start'.
       *
       * If the [dir](api/grid#dir) property is set to `rtl`, then `start` and `end` are reversed.
       *
       * Additionally, each child of the grid can use the `justifySelf` property to change it's alignment in the grid.
       * @memberof Grid
       * @property {String|String[]} justify
       */
      justify = 'start',

      /**
       * The horizontal gap between each column in the grid.
       *
       * An array of numbers means the grid will set the gap between columns using the order of the array. For example, if the gap is set to be `[10, 5]`, then every odd column gap will use 10 and every even column gap will use 5.
       * @memberof Grid
       * @property {Number|Number[]} colGap
       */
      colGap = 0,

      /**
       * The vertical gap between each row in the grid.
       *
       * An array of numbers means the grid will set the gap between rows using the order of the array. For example, if the gap is set to be `[10, 5]`, then every odd row gap will use 10 and every even row gap will use 5.
       * @memberof Grid
       * @property {Number|Number[]} rowGap
       */
      rowGap = 0,

      /**
       * The number of columns in the grid. Only applies if the [flow](api/grid#flow) property is set to `grid`.
       * @memberof Grid
       * @property {Number} numCols
       */
      numCols = 1,

      /**
       * The direction of the grid. Defaults to organizing the grid objects left-to-right, but if set to `rtl` then the grid is organized right-to-left.
       *
       * When determining the direction of the grid, the canvas `dir` attribute is also taken into account. Setting the attribute to `rtl` is equivalent to setting the `dir` property to `rtl`. The `dir` property is used instead of the canvas attribute if both are set.
       * @memberof Grid
       * @property {String} dir
       */
      dir = '',

      /**
       * How the grid should change based on different metrics. Based on the concept of CSS Media Queries so you can update how the grid organizes the objects when things change (such as the scale).
       *
       * Each object in the array uses the `metric()` function to determine when the breakpoint applies and the `callback()` function is called to change any properties of the grid.
       *
       * ```js
       * let { Grid } = kontra;
       *
       * let grid = Grid({
       *   breakpoints: [{
       *     metric() {
       *       return this.scaleX < 1
       *     },
       *     callback() {
       *       this.numCols = 1;
       *     }
       *   },
       *   {
       *     metric() {
       *       return this.scaleX >= 1
       *     },
       *     callback() {
       *       this.numCols = 2;
       *     }
       *   }]
       * });
       * ```
       * @memberof Grid
       * @property {{metric: Function, callback: Function}[]} breakpoints
       */
      breakpoints = [],

      ...props
    } = {}) {
      super.init({
        flow,
        align,
        justify,
        colGap,
        rowGap,
        numCols,
        dir,
        breakpoints,
        ...props
      });

      this._p();
      return new Proxy(this, handler);
    }

    addChild(child) {
      this._d = true;
      super.addChild(child);
    }

    removeChild(child) {
      this._d = true;
      super.removeChild(child);
    }

    render() {
      if (this._d) {
        this._p();
      }
      super.render();
    }

    /**
     * Call `destroy()` on all children.
     * @memberof Grid
     * @function destroy
     */
    destroy() {
      this.children.map(child => child.destroy && child.destroy());
    }

    /**
     * Build the grid and calculate its width and height
     */
    _p() {
      this._d = false;

      this.breakpoints.map(breakpoint => {
        // b = breakpoint
        /* eslint-disable-next-line no-restricted-syntax */
        if (breakpoint.metric.call(this) && this._b !== breakpoint) {
          this._b = breakpoint;
          breakpoint.callback.call(this);
        }
      });

      // g = grid, cw = colWidths, rh = rowHeights
      let grid = (this._g = []);
      let colWidths = (this._cw = []);
      let rowHeights = (this._rh = []);
      let children = this.children;

      // nc = numCols
      let numCols = (this._nc =
        this.flow == 'column'
          ? 1
          : this.flow == 'row'
          ? children.length
          : this.numCols);

      let row = 0;
      let col = 0;
      for (let i = 0, child; (child = children[i]); i++) {
        grid[row] = grid[row] || [];

        // prerender child to get current width/height
        if (child._p) {
          child._p();
        }

        let { width, height } = child.world || child;

        rowHeights[row] = Math.max(rowHeights[row] || 0, height);

        let spans = child.colSpan || 1;
        let colSpan = spans;

        do {
          colWidths[col] = Math.max(
            colWidths[col] || 0,
            width / colSpan
          );
          grid[row][col] = child;
        } while (col++ <= numCols && --spans);

        if (col >= numCols) {
          col = 0;
          row++;
        }
      }

      // fill remaining row
      while (col > 0 && col < numCols) {
        // add empty array item so we can reverse a row even when it
        // contains less items than another row
        grid[row][col++] = false;
      }
      let numRows = grid.length;

      let colGap = [].concat(this.colGap);
      let rowGap = [].concat(this.rowGap);

      this._w = colWidths.reduce((acc, width) => (acc += width), 0);
      for (let i = 0; i < numCols - 1; i++) {
        this._w += colGap[i % colGap.length];
      }

      this._h = rowHeights.reduce((acc, height) => (acc += height), 0);
      for (let i = 0; i < numRows - 1; i++) {
        this._h += rowGap[i % rowGap.length];
      }

      this._uw();

      // reverse columns. direction property overrides canvas dir
      let dir = this.context.canvas.dir;
      let rtl = (dir == 'rtl' && !this.dir) || this.dir == 'rtl';
      this._rtl = rtl;
      if (rtl) {
        this._g = grid.map(row => row.reverse());
        this._cw = colWidths.reverse();
        colGap = colGap.reverse();
      }

      let topLeftY = -this.anchor.y * this.height;
      let rendered = [];

      let justify = [].concat(this.justify);
      let align = [].concat(this.align);

      this._g.map((gridRow, row) => {
        let topLeftX = -this.anchor.x * this.width;

        gridRow.map((child, col) => {
          // don't render the same child multiple times if it uses
          // colSpan
          if (child && !rendered.includes(child)) {
            rendered.push(child);

            let justifySelf = alignment[
              child.justifySelf || justify[col % justify.length]
            ](this._rtl);
            let alignSelf =
              alignment[child.alignSelf || align[row % align.length]]();

            let colSpan = child.colSpan || 1;
            let colWidth = colWidths[col];
            if (colSpan > 1 && col + colSpan <= this._nc) {
              for (let i = 1; i < colSpan; i++) {
                colWidth +=
                  colWidths[col + i] +
                  colGap[(col + i) % colGap.length];
              }
            }

            let pointX = colWidth * justifySelf;
            let pointY = rowHeights[row] * alignSelf;
            let anchorX = 0;
            let anchorY = 0;
            let { width, height } = child.world || child;

            if (child.anchor) {
              anchorX = child.anchor.x;
              anchorY = child.anchor.y;
            }

            // calculate the x position based on the alignment and
            // anchor of the object
            if (justifySelf == 0) {
              pointX = pointX + width * anchorX;
            } else if (justifySelf == 0.5) {
              let sign = anchorX < 0.5 ? -1 : anchorX == 0.5 ? 0 : 1;
              pointX = pointX + sign * width * justifySelf;
            } else {
              pointX = pointX - width * (1 - anchorX);
            }

            // calculate the y position based on the justification and
            // anchor of the object
            if (alignSelf == 0) {
              pointY = pointY + height * anchorY;
            } else if (alignSelf == 0.5) {
              let sign = anchorY < 0.5 ? -1 : anchorY == 0.5 ? 0 : 1;
              pointY = pointY + sign * height * alignSelf;
            } else {
              pointY = pointY - height * (1 - anchorY);
            }

            child.x = topLeftX + pointX;
            child.y = topLeftY + pointY;
          }

          topLeftX += colWidths[col] + colGap[col % colGap.length];
        });

        topLeftY += rowHeights[row] + rowGap[row % rowGap.length];
      });
    }
  }

  function factory$5() {
    return new Grid(...arguments);
  }

  /**
   * A simple keyboard API. You can use it move the main sprite or respond to a key press.
   *
   * ```js
   * import { initKeys, keyPressed } from 'kontra';
   *
   * // this function must be called first before keyboard
   * // functions will work
   * initKeys();
   *
   * function update() {
   *   if (keyPressed('arrowleft')) {
   *     // move left
   *   }
   * }
   * ```
   * @sectionName Keyboard
   */

  /**
   * Below is a list of keys that are provided by default. If you need to extend this list, you can use the [keyMap](api/keyboard#keyMap) property.
   *
   * - a-z
   * - 0-9
   * - enter, esc, space, arrowleft, arrowup, arrowright, arrowdown
   * @sectionName Available Keys
   */

  let keydownCallbacks = {};
  let keyupCallbacks = {};
  let pressedKeys = {};

  /**
   * A map of [KeyboardEvent code values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values) to key names. Add to this object to expand the list of [available keys](api/keyboard#available-keys).
   *
   * ```js
   * import { keyMap, onKey } from 'kontra';
   *
   * keyMap['ControlRight'] = 'ctrl';
   *
   * onKey('ctrl', function(e) {
   *   // handle ctrl key
   * });
   * ```
   * @property {{[key in (String|Number)]: String}} keyMap
   */
  let keyMap = {
    // named keys
    Enter: 'enter',
    Escape: 'esc',
    Space: 'space',
    ArrowLeft: 'arrowleft',
    ArrowUp: 'arrowup',
    ArrowRight: 'arrowright',
    ArrowDown: 'arrowdown'
  };

  /**
   * Call the callback handler of an event.
   * @param {Function} callback
   * @param {KeyboardEvent} evt
   */
  function call(callback = noop, evt) {
    if (callback._pd) {
      evt.preventDefault();
    }
    callback(evt);
  }

  /**
   * Execute a function that corresponds to a keyboard key.
   *
   * @param {KeyboardEvent} evt
   */
  function keydownEventHandler(evt) {
    let key = keyMap[evt.code];
    let callback = keydownCallbacks[key];
    pressedKeys[key] = true;
    call(callback, evt);
  }

  /**
   * Set the released key to not being pressed.
   *
   * @param {KeyboardEvent} evt
   */
  function keyupEventHandler(evt) {
    let key = keyMap[evt.code];
    let callback = keyupCallbacks[key];
    pressedKeys[key] = false;
    call(callback, evt);
  }

  /**
   * Reset pressed keys.
   */
  function blurEventHandler() {
    pressedKeys = {};
  }

  /**
   * Initialize keyboard event listeners. This function must be called before using other keyboard functions.
   * @function initKeys
   */
  function initKeys() {
    let i;

    // alpha keys
    // @see https://stackoverflow.com/a/43095772/2124254
    for (i = 0; i < 26; i++) {
      // rollupjs considers this a side-effect (for now), so we'll do it
      // in the initKeys function
      keyMap['Key' + String.fromCharCode(i + 65)] = String.fromCharCode(
        i + 97
      );
    }

    // numeric keys
    for (i = 0; i < 10; i++) {
      keyMap['Digit' + i] = keyMap['Numpad' + i] = '' + i;
    }

    window.addEventListener('keydown', keydownEventHandler);
    window.addEventListener('keyup', keyupEventHandler);
    window.addEventListener('blur', blurEventHandler);
  }

  /**
   * Register a function to be called when a key is pressed. Takes a single key or an array of keys. Is passed the original [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) as a parameter.
   *
   * By default, the default action will be prevented for any bound key. To not do this, pass the `preventDefault` option.
   *
   * ```js
   * import { initKeys, onKey } from 'kontra';
   *
   * initKeys();
   *
   * onKey('p', function(e) {
   *   // pause the game
   * });
   * onKey(['enter', 'space'], function(e) {
   *   // fire gun
   * });
   * ```
   * @function onKey
   *
   * @param {String|String[]} keys - Key or keys to register.
   * @param {(evt: KeyboardEvent) => void} callback - The function to be called when the key is pressed.
   * @param {Object} [options] - Register options.
   * @param {'keydown'|'keyup'} [options.handler=keydown] - Whether to register to keydown or keyup events.
   * @param {Boolean} [options.preventDefault=true] - Call `event. preventDefault()` when the key is activated.
   */
  function onKey(
    keys,
    callback,
    { handler = 'keydown', preventDefault = true } = {}
  ) {
    let callbacks =
      handler == 'keydown' ? keydownCallbacks : keyupCallbacks;
    // pd = preventDefault
    callback._pd = preventDefault;
    // smaller than doing `Array.isArray(keys) ? keys : [keys]`
    [].concat(keys).map(key => (callbacks[key] = callback));
  }

  /**
   * Unregister the callback function for a key. Takes a single key or an array of keys.
   *
   * ```js
   * import { offKey } from 'kontra';
   *
   * offKey('arrowleft');
   * offKey(['enter', 'space']);
   * ```
   * @function offKey
   *
   * @param {String|String[]} keys - Key or keys to unregister.
   * @param {Object} [options] - Unregister options.
   * @param {'keydown'|'keyup'} [options.handler=keydown] - Whether to unregister from keydown or keyup events.
   */
  function offKey(keys, { handler = 'keydown' } = {}) {
    let callbacks =
      handler == 'keydown' ? keydownCallbacks : keyupCallbacks;
    [].concat(keys).map(key => delete callbacks[key]);
  }

  /**
   * Check if a key is currently pressed. Use during an `update()` function to perform actions each frame.
   *
   * ```js
   * import { Sprite, initKeys, keyPressed } from 'kontra';
   *
   * initKeys();
   *
   * let sprite = Sprite({
   *   update: function() {
   *     if (keyPressed('arrowleft')){
   *       // left arrow pressed
   *     }
   *     else if (keyPressed('arrowright')) {
   *       // right arrow pressed
   *     }
   *
   *     if (keyPressed('arrowup')) {
   *       // up arrow pressed
   *     }
   *     else if (keyPressed('arrowdown')) {
   *       // down arrow pressed
   *     }
   *   }
   * });
   * ```
   * @function keyPressed
   *
   * @param {String|String[]} keys - Key or keys to check for pressed state.
   *
   * @returns {Boolean} `true` if the key is pressed, `false` otherwise.
   */
  function keyPressed(keys) {
    return !![].concat(keys).some(key => pressedKeys[key]);
  }

  /**
   * A wrapper for initializing and handling multiple inputs at once (keyboard, gamepad, gesture, pointer).
   *
   * ```js
   * import { initInput, onInput } from 'kontra';
   *
   * // this function must be called first before input
   * // functions will work
   * initInput();
   *
   * onInput(['arrowleft', 'swipeleft', 'dpadleft'], () => {
   *   // move left
   * });
   * ```
   * @sectionName Input
   */

  /**
   * Check if string is a value of an object.
   * @param {String} value - Value to look for.
   * @param {Object} map - Object to look in.
   *
   * @returns {Boolean} True if the object contains the value, false otherwise.
   */
  function contains(value, map) {
    return Object.values(map).includes(value);
  }

  /**
   * Check to see if input name is a gesture input.
   * @param {String} value - Value to look for.
   *
   * @returns {Boolean} True if value is a gesture input, false otherwise.
   */
  function isGesture(value) {
    return Object.keys(gestureMap).some(name => value.startsWith(name));
  }

  /**
   * Initialize input event listeners. This function must be called before using other input functions.
   * @function initInput
   *
   * @param {Object} [options] - Input options.
   * @param {Object} [options.pointer] - [Pointer options](/api/pointer#initPointer).
   *
   * @returns {{pointer: {x: Number, y: Number, radius: Number, canvas: HTMLCanvasElement, touches: Object}}} Object with `pointer` property which is the pointer object for the canvas.
   */
  function initInput(options = {}) {
    initKeys();
    let pointer = initPointer(options.pointer);
    initGesture();
    initGamepad();

    return { pointer };
  }

  /**
   * Register a function to be called on an input event. Takes a single input or an array of inputs. See the [keyboard](api/keyboard#available-keys), [gamepad](api/gamepad#available-buttons), [gesture](api/gesture#available-gestures), and [pointer](/api/pointer#onPointer) docs for the lists of available input names.
   *
   * ```js
   * import { initInput, onInput } from 'kontra';
   *
   * initInput();
   *
   * onInput('p', function(e) {
   *   // pause the game
   * });
   * onInput(['enter', 'down', 'south'], function(e) {
   *   // fire gun on enter key, mouse down, or gamepad south button
   * });
   * ```
   * @function onInput
   *
   * @param {String|String[]} inputs - Inputs or inputs to register callback for.
   * @param {Function} callback -  The function to be called on the input event.
   * @param {Object} [options] - Input options.
   * @param {Object} [options.gamepad] - [onGamepad options](/api/gamepad#onGamepad).
   * @param {Object} [options.key] - [onKey options](/api/keyboard#onKey).
   */
  function onInput(inputs, callback, { gamepad, key } = {}) {
    [].concat(inputs).map(input => {
      if (contains(input, gamepadMap)) {
        onGamepad(input, callback, gamepad);
      } else if (isGesture(input)) {
        onGesture(input, callback);
      } else if (contains(input, keyMap)) {
        onKey(input, callback, key);
      } else if (['down', 'up'].includes(input)) {
        onPointer(input, callback);
      }
      // @ifdef DEBUG
      else {
        throw new TypeError(`"${input}" is not a valid input name`);
      }
      // @endif
    });
  }

  /**
   * Unregister the callback function for an input. Takes a single input or an array of inputs.
   *
   * ```js
   * import { offInput } from 'kontra';
   *
   * offInput('left');
   * offInput(['enter', 'down', 'swipeleft']);
   * ```
   * @function offInput
   *
   * @param {String|String[]} inputs - Inputs or inputs to unregister callback for.
   * @param {Object} [options] - Input options.
   * @param {Object} [options.gamepad] - [offGamepad options](/api/gamepad#offGamepad).
   * @param {Object} [options.key] - [offKey options](/api/keyboard#offKey).
   */
  function offInput(inputs, { gamepad, key } = {}) {
    [].concat(inputs).map(input => {
      if (contains(input, gamepadMap)) {
        offGamepad(input, gamepad);
      } else if (isGesture(input)) {
        offGesture(input);
      } else if (contains(input, keyMap)) {
        offKey(input, key);
      } else if (['down', 'up'].includes(input)) {
        offPointer(input);
      }
    });
  }

  /**
   * A plugin system based on the [interceptor pattern](https://en.wikipedia.org/wiki/Interceptor_pattern), designed to share reusable code such as more advance collision detection or a 2D physics engine.
   *
   * ```js
   * import { registerPlugin, Sprite } from 'kontra';
   * import loggingPlugin from 'path/to/plugin/code.js'
   *
   * // register a plugin that adds logging to all Sprites
   * registerPlugin(Sprite, loggingPlugin);
   * ```
   * @sectionName Plugin
   */

  /**
   * @docs docs/api_docs/plugin.js
   */

  /**
   * Get the kontra object method name from the plugin.
   *
   * @param {String} methodName - Before/After function name
   *
   * @returns {String}
   */
  function getMethod(methodName) {
    let methodTitle = methodName.substr(methodName.search(/[A-Z]/));
    return methodTitle[0].toLowerCase() + methodTitle.substr(1);
  }

  /**
   * Register a plugin to run a set of functions before or after the Kontra object functions.
   * @function registerPlugin
   *
   * @param {Object} kontraObj - Kontra object to attach the plugin to.
   * @param {Object} pluginObj - Plugin object with before and after intercept functions.
   */
  function registerPlugin(kontraObj, pluginObj) {
    let objectProto = kontraObj.prototype;

    if (!objectProto) return;

    // create interceptor list and functions
    if (!objectProto._inc) {
      objectProto._inc = {};
      objectProto._bInc = function beforePlugins(
        context,
        method,
        ...args
      ) {
        return this._inc[method].before.reduce((acc, fn) => {
          let newArgs = fn(context, ...acc);
          return newArgs ? newArgs : acc;
        }, args);
      };
      objectProto._aInc = function afterPlugins(
        context,
        method,
        result,
        ...args
      ) {
        return this._inc[method].after.reduce((acc, fn) => {
          let newResult = fn(context, acc, ...args);
          return newResult ? newResult : acc;
        }, result);
      };
    }

    // add plugin to interceptors
    Object.getOwnPropertyNames(pluginObj).map(methodName => {
      let method = getMethod(methodName);

      if (!objectProto[method]) return;

      // override original method
      if (!objectProto['_o' + method]) {
        objectProto['_o' + method] = objectProto[method];

        objectProto[method] = function interceptedFn(...args) {
          // call before interceptors
          let alteredArgs = this._bInc(this, method, ...args);

          let result = objectProto['_o' + method].call(
            this,
            ...alteredArgs
          );

          // call after interceptors
          return this._aInc(this, method, result, ...args);
        };
      }

      // create interceptors for the method
      if (!objectProto._inc[method]) {
        objectProto._inc[method] = {
          before: [],
          after: []
        };
      }

      if (methodName.startsWith('before')) {
        objectProto._inc[method].before.push(pluginObj[methodName]);
      } else if (methodName.startsWith('after')) {
        objectProto._inc[method].after.push(pluginObj[methodName]);
      }
    });
  }

  /**
   * Unregister a plugin from a Kontra object.
   * @function unregisterPlugin
   *
   * @param {Object} kontraObj - Kontra object to detach plugin from.
   * @param {Object} pluginObj - The plugin object that was passed during registration.
   */
  function unregisterPlugin(kontraObj, pluginObj) {
    let objectProto = kontraObj.prototype;

    if (!objectProto || !objectProto._inc) return;

    // remove plugin from interceptors
    Object.getOwnPropertyNames(pluginObj).map(methodName => {
      let method = getMethod(methodName);

      if (methodName.startsWith('before')) {
        removeFromArray(
          objectProto._inc[method].before,
          pluginObj[methodName]
        );
      } else if (methodName.startsWith('after')) {
        removeFromArray(
          objectProto._inc[method].after,
          pluginObj[methodName]
        );
      }
    });
  }

  /**
   * Safely extend the functionality of a Kontra object. Any properties that already exist on the Kontra object will not be added.
   *
   * ```js
   * import { extendObject, Vector, VectorClass } from 'kontra';
   *
   * // add a subtract function to all Vectors
   * extendObject(VectorClass, {
   *   subtract(vec) {
   *     return Vector(this.x - vec.x, this.y - vec.y);
   *   }
   * });
   * ```
   * @function extendObject
   *
   * @param {Object} kontraObj - Kontra class to extend
   * @param {Object} properties - Properties to add.
   */
  function extendObject(kontraObj, properties) {
    let objectProto = kontraObj.prototype;

    if (!objectProto) return;

    Object.getOwnPropertyNames(properties).map(prop => {
      if (!objectProto[prop]) {
        objectProto[prop] = properties[prop];
      }
    });
  }

  /**
   * A fast and memory efficient [object pool](https://gameprogrammingpatterns.com/object-pool.html) for sprite reuse. Perfect for particle systems or SHUMPs. The pool starts out with just one object, but will grow in size to accommodate as many objects as are needed.
   *
   * <canvas width="600" height="200" id="pool-example"></canvas>
   * <script src="assets/js/pool.js"></script>
   * @class Pool
   *
   * @param {Object} properties - Properties of the pool.
   * @param {() => {update: (dt?: Number) => void, render: Function, init: (properties?: Object) => void, isAlive: () => boolean}} properties.create - Function that returns a new object to be added to the pool when there are no more alive objects.
   * @param {Number} [properties.maxSize=1024] - The maximum number of objects allowed in the pool. The pool will never grow beyond this size.
   */
  class Pool {
    /**
     * @docs docs/api_docs/pool.js
     */

    constructor({ create, maxSize = 1024 } = {}) {
      // @ifdef DEBUG
      // check for the correct structure of the objects added to pools
      // so we know that the rest of the pool code will work without
      // errors
      let obj;
      if (
        !create ||
        !(obj = create()) ||
        !(obj.update && obj.init && obj.isAlive && obj.render)
      ) {
        throw Error(
          'Must provide create() function which returns an object with init(), update(), render(), and isAlive() functions'
        );
      }
      // @endif

      // c = create
      this._c = create;

      /**
       * All objects currently in the pool, both alive and not alive.
       * @memberof Pool
       * @property {Object[]} objects
       */
      this.objects = [create()]; // start the pool with an object

      /**
       * The number of alive objects.
       * @memberof Pool
       * @property {Number} size
       */
      this.size = 0;

      /**
       * The maximum number of objects allowed in the pool. The pool will never grow beyond this size.
       * @memberof Pool
       * @property {Number} maxSize
       */
      this.maxSize = maxSize;
    }

    /**
     * Get and return an object from the pool. The properties parameter will be passed directly to the objects `init()` function. If you're using a [Sprite](api/sprite), you should also pass the `ttl` property to designate how many frames you want the object to be alive for.
     *
     * If you want to control when the sprite is ready for reuse, pass `Infinity` for `ttl`. You'll need to set the sprites `ttl` to `0` when you're ready for the sprite to be reused.
     *
     * ```js
     * // exclude-tablist
     * let sprite = pool.get({
     *   // the object will get these properties and values
     *   x: 100,
     *   y: 200,
     *   width: 20,
     *   height: 40,
     *   color: 'red',
     *
     *   // pass Infinity for ttl to prevent the object from being reused
     *   // until you set it back to 0
     *   ttl: Infinity
     * });
     * ```
     * @memberof Pool
     * @function get
     *
     * @param {Object} [properties] - Properties to pass to the objects `init()` function.
     *
     * @returns {Object} The newly initialized object.
     */
    get(properties = {}) {
      // the pool is out of objects if the first object is in use and
      // it can't grow
      if (this.size == this.objects.length) {
        if (this.size == this.maxSize) {
          return;
        }

        // double the size of the array by adding twice as many new
        // objects to the end
        for (
          let i = 0;
          i < this.size && this.objects.length < this.maxSize;
          i++
        ) {
          this.objects.push(this._c());
        }
      }

      // save off first object in pool to reassign to last object after
      // unshift
      let obj = this.objects[this.size];
      this.size++;
      obj.init(properties);
      return obj;
    }

    /**
     * Returns an array of all alive objects. Useful if you need to do special processing on all alive objects outside of the pool, such as to add all alive objects to a [Quadtree](api/quadtree).
     * @memberof Pool
     * @function getAliveObjects
     *
     * @returns {Object[]} An Array of all alive objects.
     */
    getAliveObjects() {
      return this.objects.slice(0, this.size);
    }

    /**
     * Clear the object pool. Removes all objects from the pool and resets its [size](api/pool#size) to 1.
     * @memberof Pool
     * @function clear
     */
    clear() {
      this.size = this.objects.length = 0;
      this.objects.push(this._c());
    }

    /**
     * Update all alive objects in the pool by calling the objects `update()` function. This function also manages when each object should be recycled, so it is recommended that you do not call the objects `update()` function outside of this function.
     * @memberof Pool
     * @function update
     *
     * @param {Number} [dt] - Time since last update.
     */
    update(dt) {
      let obj;
      let doSort = false;
      for (let i = this.size; i--; ) {
        obj = this.objects[i];

        obj.update(dt);

        if (!obj.isAlive()) {
          doSort = true;
          this.size--;
        }
      }
      // sort all dead elements to the end of the pool
      if (doSort) {
        this.objects.sort((a, b) => b.isAlive() - a.isAlive());
      }
    }

    /**
     * Render all alive objects in the pool by calling the objects `render()` function.
     * @memberof Pool
     * @function render
     */
    render() {
      for (let i = this.size; i--; ) {
        this.objects[i].render();
      }
    }
  }

  function factory$4() {
    return new Pool(...arguments);
  }

  /**
   * Determine which subnodes the object intersects with
   *
   * @param {Object} object - Object to check.
   * @param {{x: Number, y: Number, width: Number, height: Number}} bounds - Bounds of the quadtree.
   *
   * @returns {Number[]} List of all subnodes object intersects.
   */
  function getIndices(object, bounds) {
    let indices = [];

    let verticalMidpoint = bounds.x + bounds.width / 2;
    let horizontalMidpoint = bounds.y + bounds.height / 2;

    // save off quadrant checks for reuse
    let intersectsTopQuadrants = object.y < horizontalMidpoint;
    let intersectsBottomQuadrants =
      object.y + object.height >= horizontalMidpoint;

    // object intersects with the left quadrants
    if (object.x < verticalMidpoint) {
      if (intersectsTopQuadrants) {
        // top left
        indices.push(0);
      }

      if (intersectsBottomQuadrants) {
        // bottom left
        indices.push(2);
      }
    }

    // object intersects with the right quadrants
    if (object.x + object.width >= verticalMidpoint) {
      if (intersectsTopQuadrants) {
        // top right
        indices.push(1);
      }

      if (intersectsBottomQuadrants) {
        // bottom right
        indices.push(3);
      }
    }

    return indices;
  }

  // the quadtree acts like an object pool in that it will create
  // subnodes as objects are needed but it won't clean up the subnodes
  // when it collapses to avoid garbage collection.
  //
  // the quadrant indices are numbered as follows (following a z-order
  // curve):
  //     |
  //  0  |  1
  // ----+----
  //  2  |  3
  //     |

  /**
   * A 2D [spatial partitioning](https://gameprogrammingpatterns.com/spatial-partition.html) data structure. Use it to quickly group objects by their position for faster access and collision checking.
   *
   * <canvas width="600" height="200" id="quadtree-example"></canvas>
   * <script src="assets/js/quadtree.js"></script>
   * @class Quadtree
   *
   * @param {Object} [properties] - Properties of the quadtree.
   * @param {Number} [properties.maxDepth=3] - Maximum node depth of the quadtree.
   * @param {Number} [properties.maxObjects=25] - Maximum number of objects a node can have before splitting.
   * @param {{x: Number, y: Number, width: Number, height: Number}} [properties.bounds] - The 2D space (x, y, width, height) the quadtree occupies. Defaults to the entire canvas width and height.
   */
  class Quadtree {
    /**
     * @docs docs/api_docs/quadtree.js
     */

    constructor({ maxDepth = 3, maxObjects = 25, bounds } = {}) {
      /**
       * Maximum node depth of the quadtree.
       * @memberof Quadtree
       * @property {Number} maxDepth
       */
      this.maxDepth = maxDepth;

      /**
       * Maximum number of objects a node can have before splitting.
       * @memberof Quadtree
       * @property {Number} maxObjects
       */
      this.maxObjects = maxObjects;

      /**
       * The 2D space (x, y, width, height) the quadtree occupies.
       * @memberof Quadtree
       * @property {{x: Number, y: Number, width: Number, height: Number}} bounds
       */
      let canvas = getCanvas();
      this.bounds = bounds || {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height
      };

      // since we won't clean up any subnodes, we need to keep track of
      // which nodes are currently the leaf node so we know which nodes
      // to add objects to
      // b = branch, d = depth, o = objects, s = subnodes, p = parent
      this._b = false;
      this._d = 0;
      this._o = [];
      this._s = [];
      this._p = null;
    }

    /**
     * Removes all objects from the quadtree. You should clear the quadtree every frame before adding all objects back into it.
     * @memberof Quadtree
     * @function clear
     */
    clear() {
      this._s.map(subnode => {
        subnode.clear();
      });

      this._b = false;
      this._o.length = 0;
    }

    /**
     * Get an array of all objects that belong to the same node as the passed in object.
     *
     * **Note:** if the passed in object is also part of the quadtree, it will not be returned in the results.
     *
     * ```js
     * import { Sprite, Quadtree } from 'kontra';
     *
     * let quadtree = Quadtree();
     * let player = Sprite({
     *   // ...
     * });
     * let enemy1 = Sprite({
     *   // ...
     * });
     * let enemy2 = Sprite({
     *   // ...
     * });
     *
     * quadtree.add(player, enemy1, enemy2);
     * quadtree.get(player);  //=> [enemy1]
     * ```
     * @memberof Quadtree
     * @function get
     *
     * @param {{x: Number, y: Number, width: Number, height: Number}} object - Object to use for finding other objects. The object must have the properties `x`, `y`, `width`, and `height` so that its position in the quadtree can be calculated.
     *
     * @returns {Object[]} A list of objects in the same node as the object, not including the object itself.
     */
    get(object) {
      // since an object can belong to multiple nodes we should not add
      // it multiple times
      let objects = new Set();

      // traverse the tree until we get to a leaf node
      while (this._s.length && this._b) {
        getIndices(object, this.bounds).map(index => {
          this._s[index].get(object).map(obj => objects.add(obj));
        });

        return Array.from(objects);
      }

      // don't add the object to the return list
      /* eslint-disable-next-line no-restricted-syntax */
      return this._o.filter(obj => obj !== object);
    }

    /**
     * Add objects to the quadtree and group them by their position. Can take a single object, a list of objects, and an array of objects.
     *
     * ```js
     * import { Quadtree, Sprite, Pool, GameLoop } from 'kontra';
     *
     * let quadtree = Quadtree();
     * let bulletPool = Pool({
     *   create: Sprite
     * });
     *
     * let player = Sprite({
     *   // ...
     * });
     * let enemy = Sprite({
     *   // ...
     * });
     *
     * // create some bullets
     * for (let i = 0; i < 100; i++) {
     *   bulletPool.get({
     *     // ...
     *   });
     * }
     *
     * let loop = GameLoop({
     *   update: function() {
     *     quadtree.clear();
     *     quadtree.add(player, enemy, bulletPool.getAliveObjects());
     *   }
     * });
     * ```
     * @memberof Quadtree
     * @function add
     *
     * @param {...({x: Number, y: Number, width: Number, height: Number}|{x: Number, y: Number, width: Number, height: Number}[])[]} objects - Objects to add to the quadtree. Can be a single object, an array of objects, or a comma-separated list of objects.
     */
    add(...objects) {
      objects.flat().map(object => {
        // current node has subnodes, so we need to add this object
        // into a subnode
        if (this._b) {
          this._a(object);
          return;
        }

        // this node is a leaf node so add the object to it
        this._o.push(object);

        // split the node if there are too many objects
        if (
          this._o.length > this.maxObjects &&
          this._d < this.maxDepth
        ) {
          this._sp();

          // move all objects to their corresponding subnodes
          this._o.map(obj => this._a(obj));
          this._o.length = 0;
        }
      });
    }

    /**
     * Add an object to a subnode.
     *
     * @param {Object} object - Object to add into a subnode
     */
    _a(object) {
      // add the object to all subnodes it intersects
      getIndices(object, this.bounds).map(index => {
        this._s[index].add(object);
      });
    }

    /**
     * Split the node into four subnodes.
     */
    // @see https://github.com/jed/140bytes/wiki/Byte-saving-techniques#use-placeholder-arguments-instead-of-var
    _sp(subWidth, subHeight, i) {
      this._b = true;

      // only split if we haven't split before
      if (this._s.length) {
        return;
      }

      subWidth = (this.bounds.width / 2) | 0;
      subHeight = (this.bounds.height / 2) | 0;

      for (i = 0; i < 4; i++) {
        this._s[i] = new Quadtree({
          bounds: {
            x: this.bounds.x + (i % 2 == 1 ? subWidth : 0), // nodes 1 and 3
            y: this.bounds.y + (i >= 2 ? subHeight : 0), // nodes 2 and 3
            width: subWidth,
            height: subHeight
          },
          maxDepth: this.maxDepth,
          maxObjects: this.maxObjects
        });

        // d = depth, p = parent
        this._s[i]._d = this._d + 1;
      }
    }
  }

  function factory$3() {
    return new Quadtree(...arguments);
  }

  /**
   * Recursively get all objects HTML nodes.
   * @param {Object} object - Root object.
   *
   * @returns {Object[]} All nested HTML nodes.
   */
  function getAllNodes(object) {
    let nodes = [];

    if (object._dn) {
      nodes.push(object._dn);
    } else if (object.children) {
      object.children.map(child => {
        nodes = nodes.concat(getAllNodes(child));
      });
    }

    return nodes;
  }

  /**
   * A scene object for organizing a group of objects that will update and render together.
   *
   * ```js
   * import { Scene, Sprite } from 'kontra';
   *
   * sprite = Sprite({
   *   x: 100,
   *   y: 200,
   *   width: 20,
   *   height: 40,
   *   color: 'red'
   * });
   *
   * scene = Scene({
   *   id: 'game',
   *   objects: [sprite]
   * });
   *
   * scene.render();
   * ```
   *
   * @class Scene
   *
   * @param {Object} properties - Properties of the scene.
   * @param {String} properties.id - The id of the scene.
   * @param {String} [properties.name=properties.id] - The name of the scene. Used by screen readers to identify each scene. Use this property to give the scene a human friendly name.
   * @param {Object[]} [properties.objects] - Objects to add to the scene.
   * @param {CanvasRenderingContext2D} [properties.context] - The context the scene should draw to. Defaults to [core.getContext()](api/core#getContext).
   * @param {Boolean} [properties.cullObjects=true] - If the scene should not render objects outside the camera bounds.
   * @param {(object1: Object, object2: Object) => Boolean} [properties.cullFunction] - The function used to filter objects to render. Defaults to [helpers.collides](api/helpers#collides).
   * @param {(object1: Object, object2: Object) => Number} [properties.sortFunction] - The function used to sort the objects of the scene.
   * @param {Function} [properties.onShow] - Function called when the scene is shown.
   * @param {Function} [properties.onHide] - Function called when the scene is hidden.
   *
   * @param {...*} properties.props - Any additional properties you need added to the scene.
   */
  class Scene {
    constructor({
      /**
       * The id of the scene.
       * @memberof Scene
       * @property {String} id
       */
      id,

      /**
       * The name of the scene. Used by screen readers to identify each scene. Use this property to give the scene a human friendly name.
       * @memberof Scene
       * @property {String} name
       */
      name = id,

      /**
       * The objects of the scene.
       * @memberof Scene
       * @property {Object[]} objects
       */
      objects = [],

      /**
       * The context the scene will draw to.
       * @memberof Scene
       * @property {CanvasRenderingContext2D} context
       */
      context = getContext(),

      /**
       * If the camera should cull objects outside the camera bounds. Not rendering objects which can't be seen greatly improves the performance.
       * @memberof Scene
       * @property {Boolean} cullObjects
       */
      cullObjects = true,

      /**
       * Camera culling function which prevents objects outside the camera screen from rendering.
       * @memberof Scene
       * @property {Function} cullFunction
       */
      cullFunction = collides,

      /**
       * Function used to sort the objects of the scene before rendering. Can be used in conjunction with [helpers.depthSort](/api/helpers#depthSort). Only direct objects of the scene are sorted.
       *
       * ```js
       * import { Scene, Sprite, depthSort } from 'kontra';
       *
       * let sprite1 = Sprite({
       *   // ...
       * });
       * let sprite2 = Sprite({
       *   // ...
       * });
       *
       * let scene = Scene({
       *   id: 'game',
       *   objects: [sprite1, sprite2],
       *   sortFunction: depthSort
       * });
       *
       * scene.render();
       * ```
       * @memberof Scene
       * @property {Function} sortFunction
       */
      sortFunction,

      ...props
    }) {
      // o = objects
      this._o = [];

      // add all properties to the object, overriding any defaults
      Object.assign(this, {
        id,
        name,
        context,
        cullObjects,
        cullFunction,
        sortFunction,
        ...props
      });

      // create an accessible DOM node for screen readers
      // (do this first so we can move DOM nodes in add())
      // dn = dom node
      let section = (this._dn = document.createElement('section'));
      section.tabIndex = -1;
      section.style = srOnlyStyle;
      section.id = id;
      section.setAttribute('aria-label', name);

      /**
       * The camera object which is used as the focal point for the scene. Defaults to to the size of the canvas with a focal point  at its center. The scene will not render objects that are outside the bounds of the camera.
       *
       * Additionally, the camera can be used to [lookAt](api/scene#lookAt) an object which will center the camera to that object. This allows you to zoom the scene in and out while the camera remains centered on the object.
       * @memberof Scene
       * @property {GameObject} camera
       */
      let _this = this;
      class Camera extends GameObject {
        set x(value) {
          _this.sx = value - this.centerX;
          super.x = value;
        }
        get x() {
          return super.x;
        }
        set y(value) {
          _this.sy = value - this.centerY;
          super.y = value;
        }
        get y() {
          return super.y;
        }
      }
      this.camera = new Camera({
        context,
        anchor: { x: 0.5, y: 0.5 },
        render: this._rf.bind(this)
      });

      this.add(objects);

      // i = init
      this._i = () => {
        this.context ??= getContext();
        let canvas = this.context.canvas;
        let { width, height } = canvas;
        let x = width / 2;
        let y = height / 2;
        Object.assign(this.camera, {
          centerX: x,
          centerY: y,
          x,
          y,
          width,
          height,
        });

        if (!this._dn.isConnected) {
          addToDom(this._dn, canvas);
        }
      };

      if (this.context) {
        this._i();
      }

      on('init', this._i);
    }

    set objects(value) {
      this.remove(this._o);
      this.add(value);
    }

    get objects() {
      return this._o;
    }

    /**
     * Add an object to the scene.
     * @memberof Scene
     * @function add
     *
     * @param {...(Object|Object[])[]} objects - Object to add. Can be a single object, an array of objects, or a comma-separated list of objects.
     */
    add(...objects) {
      objects.flat().map(object => {
        this._o.push(object);
        object.parent = this;

        // move all objects to be in the scenes DOM node so we can
        // hide and show the DOM node and thus hide and show all the
        // objects
        getAllNodes(object).map(node => {
          this._dn.appendChild(node);
        });
      });
    }

    /**
     * Remove an object from the scene.
     * @memberof Scene
     * @function remove
     *
     * @param {...(Object|Object[])[]} objects - Object to remove. Can be a single object, an array of objects, or a comma-separated list of objects.
     */
    remove(...objects) {
      objects.flat().map(object => {
        removeFromArray(this._o, object);
        object.parent = null;

        getAllNodes(object).map(node => {
          addToDom(node, this.context);
        });
      });
    }

    /**
     * Show the scene and resume update and render. Calls [onShow](api/scene#onShow) if passed.
     * @memberof Scene
     * @function show
     */
    show() {
      /**
       * If the scene is hidden.
       * @memberof Scene
       * @property {Boolean} hidden
       */
      this.hidden = this._dn.hidden = false;

      // find first focusable object
      let focusableObject = this._o.find(object => object.focus);
      if (focusableObject) {
        focusableObject.focus();
      } else {
        this._dn.focus();
      }

      this.onShow();
    }

    /**
     * Hide the scene. A hidden scene will not update or render. Calls [onHide](api/scene#onHide) if passed.
     * @memberof Scene
     * @function hide
     */
    hide() {
      this.hidden = this._dn.hidden = true;
      this.onHide();
    }

    /**
     * Clean up the scene and call `destroy()` on all objects.
     * @memberof Scene
     * @function destroy
     */
    destroy() {
      off('init', this._i);
      this._dn.remove();
      this._o.map(object => object.destroy && object.destroy());
    }

    /**
     * Focus the camera to the objects x/y position. As the scene is scaled the focal point will keep to the position.
     * @memberof Scene
     * @function lookAt
     *
     * @param {{x: Number, y: Number}} object - Object to look at.
     */
    lookAt(object) {
      // don't call getWorldRect so we can ignore the objects anchor
      // and scale
      let { x, y } = object.world || object;
      this.camera.x = x;
      this.camera.y = y;
    }

    /**
     * Update all objects of the scene by calling the objects `update()` function.
     * @memberof Scene
     * @function update
     *
     * @param {Number} [dt] - Time since last update.
     */
    update(dt) {
      if (!this.hidden) {
        this._o.map(object => object.update && object.update(dt));
      }
    }

    /**
     * Render all children inside the cameras render function, essentially treating the scenes objects as children of the camera. This allows the camera to control the position, scale, and rotation of the scene.
     */
    _rf() {
      let {
        _o,
        context,
        _sx,
        _sy,
        camera,
        sortFunction,
        cullObjects,
        cullFunction
      } = this;

      // translate the canvas again (this time using camera scale)
      // to properly move the scene the direction of the camera
      context.translate(_sx, _sy);

      let objects = _o;
      if (cullObjects) {
        objects = objects.filter(object =>
          cullFunction(camera, object)
        );
      }
      if (sortFunction) {
        objects.sort(sortFunction);
      }
      objects.map(object => object.render && object.render());
    }

    /**
     * Render all objects of the scene by calling the objects `render()` function. If [cullObjects](/api/scene#cullObjects) is set to true then only those objects which are inside the camera bounds will be rendered.
     * @memberof Scene
     * @function render
     */
    render() {
      if (!this.hidden) {
        let { context, camera } = this;
        let { x, y, centerX, centerY } = camera;

        context.save();

        // translate the camera back to the center of the canvas
        // (ignoring scale) since the camera x/y position moves
        // the camera off-center
        this._sx = centerX - x;
        this._sy = centerY - y;
        context.translate(this._sx, this._sy);

        camera.render();

        context.restore();
      }
    }

    /**
     * Function called when the scene is shown. Override this function to have the scene do something when shown, such as adding input events.
     *
     * ```js
     * let { Scene, onKey } = 'kontra';
     *
     * let scene = Scene({
     *   onShow() {
     *     onKey('arrowup', () => {
     *       // ...
     *     })
     *   }
     * });
     * ```
     * @memberof Scene
     * @function onShow
     */
    onShow() {}

    /**
     * Function called when the scene is hidden. Override this function to have the scene do something when hidden, such as cleaning up input events.
     *
     * ```js
     * let { Scene, offKey } = 'kontra';
     *
     * let scene = Scene({
     *   onHide() {
     *     offKey('arrowup');
     *   }
     * });
     * ```
     * @memberof Scene
     * @function onHide
     */
    onHide() {}
  }

  function factory$2() {
    return new Scene(...arguments);
  }

  /**
   * Parse a string of consecutive frames.
   *
   * @param {Number|String} frames - Start and end frame.
   *
   * @returns {Number|Number[]} List of frames.
   */
  function parseFrames(consecutiveFrames) {
    // return a single number frame
    // @see https://github.com/jed/140bytes/wiki/Byte-saving-techniques#coercion-to-test-for-types
    if (+consecutiveFrames == consecutiveFrames) {
      return consecutiveFrames;
    }

    let sequence = [];
    let frames = consecutiveFrames.split('..');

    // coerce string to number
    // @see https://github.com/jed/140bytes/wiki/Byte-saving-techniques#coercion-to-test-for-types
    let start = +frames[0];
    let end = +frames[1];
    let i = start;

    // ascending frame order
    if (start < end) {
      for (; i <= end; i++) {
        sequence.push(i);
      }
    }
    // descending order
    else {
      for (; i >= end; i--) {
        sequence.push(i);
      }
    }

    return sequence;
  }

  /**
   * A sprite sheet to animate a sequence of images. Used to create [animation sprites](api/sprite#animation-sprite).
   *
   * <figure>
   *   <a href="assets/imgs/character_walk_sheet.png">
   *     <img src="assets/imgs/character_walk_sheet.png" width="266" height="512" alt="11 frames of a walking pill-like alien wearing a space helmet.">
   *   </a>
   *   <figcaption>Sprite sheet image courtesy of <a href="https://kenney.nl/assets">Kenney</a>.</figcaption>
   * </figure>
   *
   * Typically you create a sprite sheet just to create animations and then use the animations for your sprite.
   *
   * ```js
   * import { Sprite, SpriteSheet } from 'kontra';
   *
   * let image = new Image();
   * image.src = 'assets/imgs/character_walk_sheet.png';
   * image.onload = function() {
   *   let spriteSheet = SpriteSheet({
   *     image: image,
   *     frameWidth: 72,
   *     frameHeight: 97,
   *     animations: {
   *       // create a named animation: walk
   *       walk: {
   *         frames: '0..9',  // frames 0 through 9
   *         frameRate: 30
   *       }
   *     }
   *   });
   *
   *   let sprite = Sprite({
   *     x: 200,
   *     y: 100,
   *
   *     // use the sprite sheet animations for the sprite
   *     animations: spriteSheet.animations
   *   });
   * };
   * ```
   * @class SpriteSheet
   *
   * @param {Object} properties - Properties of the sprite sheet.
   * @param {HTMLImageElement|HTMLCanvasElement} properties.image - The sprite sheet image.
   * @param {Number} properties.frameWidth - The width of a single frame.
   * @param {Number} properties.frameHeight - The height of a single frame.
   * @param {Number} [properties.frameMargin=0] - The amount of whitespace between each frame.
   * @param {Object} [properties.animations] - Animations to create from the sprite sheet using [Animation](api/animation). Passed directly into the sprite sheets [createAnimations()](api/spriteSheet#createAnimations) function.
   */
  class SpriteSheet {
    constructor({
      image,
      frameWidth,
      frameHeight,
      frameMargin,
      animations
    } = {}) {
      // @ifdef DEBUG
      if (!image) {
        throw Error('You must provide an Image for the SpriteSheet');
      }
      // @endif

      /**
       * An object of named [Animation](api/animation) objects. Typically you pass this object into [Sprite](api/sprite) to create an [animation sprites](api/spriteSheet#animation-sprite).
       * @memberof SpriteSheet
       * @property {{[name: String] : Animation}} animations
       */
      this.animations = {};

      /**
       * The sprite sheet image.
       * @memberof SpriteSheet
       * @property {HTMLImageElement|HTMLCanvasElement} image
       */
      this.image = image;

      /**
       * An object that defines properties of a single frame in the sprite sheet. It has properties of `width`, `height`, and `margin`.
       *
       * `width` and `height` are the width of a single frame, while `margin` defines the amount of whitespace between each frame.
       * @memberof SpriteSheet
       * @property {{width: Number, height: Number, margin: Number}} frame
       */
      this.frame = {
        width: frameWidth,
        height: frameHeight,
        margin: frameMargin
      };

      // f = framesPerRow
      this._f = (image.width / frameWidth) | 0;

      this.createAnimations(animations);
    }

    /**
     * Create named animations from the sprite sheet. Called from the constructor if the `animations` argument is passed.
     *
     * This function populates the sprite sheets `animations` property with [Animation](api/animation) objects. Each animation is accessible by its name.
     *
     * ```js
     * import { Sprite, SpriteSheet } from 'kontra';
     *
     * let image = new Image();
     * image.src = 'assets/imgs/character_walk_sheet.png';
     * image.onload = function() {
     *
     *   let spriteSheet = SpriteSheet({
     *     image: image,
     *     frameWidth: 72,
     *     frameHeight: 97,
     *
     *     // this will also call createAnimations()
     *     animations: {
     *       // create 1 animation: idle
     *       idle: {
     *         // a single frame
     *         frames: 1
     *       }
     *     }
     *   });
     *
     *   spriteSheet.createAnimations({
     *     // create 4 animations: jump, walk, moonWalk, attack
     *     jump: {
     *       // sequence of frames (can be non-consecutive)
     *       frames: [1, 10, 1],
     *       frameRate: 10,
     *       loop: false,
     *     },
     *     walk: {
     *       // ascending consecutive frame animation (frames 2-6, inclusive)
     *       frames: '2..6',
     *       frameRate: 20
     *     },
     *     moonWalk: {
     *       // descending consecutive frame animation (frames 6-2, inclusive)
     *       frames: '6..2',
     *       frameRate: 20
     *     },
     *     attack: {
     *       // you can also mix and match, in this case frames [8,9,10,13,10,9,8]
     *       frames: ['8..10', 13, '10..8'],
     *       frameRate: 10,
     *       loop: false,
     *     }
     *   });
     * };
     * ```
     * @memberof SpriteSheet
     * @function createAnimations
     *
     * @param {Object} animations - Object of named animations to create from the sprite sheet.
     * @param {Number|String|Number[]|String[]} animations.<name>.frames - The sequence of frames to use from the sprite sheet. It can either be a single frame (`1`), a sequence of frames (`[1,2,3,4]`), or a consecutive frame notation (`'1..4'`). Sprite sheet frames are `0` indexed.
     * @param {Number} animations.<name>.frameRate - The number frames to display per second.
     * @param {Boolean} [animations.<name>.loop=true] - If the animation should loop back to the beginning once completed.
     */
    createAnimations(animations) {
      let sequence, name;

      for (name in animations) {
        let { frames, frameRate, loop } = animations[name];

        // array that holds the order of the animation
        sequence = [];

        // @ifdef DEBUG
        if (frames == undefined) {
          throw Error(
            'Animation ' + name + ' must provide a frames property'
          );
        }
        // @endif

        // add new frames to the end of the array
        [].concat(frames).map(frame => {
          sequence = sequence.concat(parseFrames(frame));
        });

        this.animations[name] = factory$b({
          spriteSheet: this,
          frames: sequence,
          frameRate,
          loop,
          name
        });
      }
    }
  }

  function factory$1() {
    return new SpriteSheet(...arguments);
  }

  /**
   * Get the row from the y coordinate.
   * @private
   *
   * @param {Number} y - Y coordinate.
   * @param {Number} tileheight - Height of a single tile (in pixels).
   *
   * @return {Number}
   */
  function getRow(y, tileheight) {
    return (y / tileheight) | 0;
  }

  /**
   * Get the col from the x coordinate.
   * @private
   *
   * @param {Number} x - X coordinate.
   * @param {Number} tilewidth - Width of a single tile (in pixels).
   *
   * @return {Number}
   */
  function getCol(x, tilewidth) {
    return (x / tilewidth) | 0;
  }

  /**
   * A tile engine for managing and drawing tilesets.
   *
   * <figure>
   *   <a href="assets/imgs/mapPack_tilesheet.png">
   *     <img src="assets/imgs/mapPack_tilesheet.png" width="1088" height="768" alt="Tileset to create an overworld map in various seasons.">
   *   </a>
   *   <figcaption>Tileset image courtesy of <a href="https://kenney.nl/assets">Kenney</a>.</figcaption>
   * </figure>
   * @class TileEngine
   *
   * @param {Object} properties - Properties of the tile engine.
   * @param {Number} properties.width - Width of the tile map (in number of tiles).
   * @param {Number} properties.height - Height of the tile map (in number of tiles).
   * @param {Number} properties.tilewidth - Width of a single tile (in pixels).
   * @param {Number} properties.tileheight - Height of a single tile (in pixels).
   * @param {CanvasRenderingContext2D} [properties.context] - The context the tile engine should draw to. Defaults to [core.getContext()](api/core#getContext)
   *
   * @param {Object[]} properties.tilesets - Array of tileset objects.
   * @param {Number} properties.<tilesetN>.firstgid - First tile index of the tileset. The first tileset will have a firstgid of 1 as 0 represents an empty tile.
   * @param {String|HTMLImageElement} properties.<tilesetN>.image - Relative path to the HTMLImageElement or an HTMLImageElement. If passing a relative path, the image file must have been [loaded](api/assets#load) first.
   * @param {Number} [properties.<tilesetN>.margin=0] - The amount of whitespace between each tile (in pixels).
   * @param {Number} [properties.<tilesetN>.tilewidth] - Width of the tileset (in pixels). Defaults to properties.tilewidth.
   * @param {Number} [properties.<tilesetN>.tileheight] - Height of the tileset (in pixels). Defaults to properties.tileheight.
   * @param {String} [properties.<tilesetN>.source] - Relative path to the source JSON file. The source JSON file must have been [loaded](api/assets#load) first.
   * @param {Number} [properties.<tilesetN>.columns] - Number of columns in the tileset image.
   *
   * @param {Object[]} properties.layers - Array of layer objects.
   * @param {String} properties.<layerN>.name - Unique name of the layer.
   * @param {Number[]} properties.<layerN>.data - 1D array of tile indices.
   * @param {Boolean} [properties.<layerN>.visible=true] - If the layer should be drawn or not.
   * @param {Number} [properties.<layerN>.opacity=1] - Percent opacity of the layer.
   */

  /**
   * @docs docs/api_docs/tileEngine.js
   */
  class TileEngine {
    constructor(properties = {}) {
      let {
        /**
         * The width of tile map (in tiles).
         * @memberof TileEngine
         * @property {Number} width
         */
        width,

        /**
         * The height of tile map (in tiles).
         * @memberof TileEngine
         * @property {Number} height
         */
        height,

        /**
         * The width a tile (in pixels).
         * @memberof TileEngine
         * @property {Number} tilewidth
         */
        tilewidth,

        /**
         * The height of a tile (in pixels).
         * @memberof TileEngine
         * @property {Number} tileheight
         */
        tileheight,

        /**
         * Array of all tilesets of the tile engine.
         * @memberof TileEngine
         * @property {Object[]} tilesets
         */
        tilesets

        /**
         * The context the tile engine will draw to.
         * @memberof TileEngine
         * @property {CanvasRenderingContext2D} context
         */
      } = properties;
      let mapwidth = width * tilewidth;
      let mapheight = height * tileheight;

      // create an off-screen canvas for pre-rendering the map
      // @see http://jsperf.com/render-vs-prerender
      let canvas = document.createElement('canvas');
      canvas.width = mapwidth;
      canvas.height = mapheight;

      // c = canvas, ctx = context
      this._c = canvas;
      this._ctx = canvas.getContext('2d');

      // @ifdef TILEENGINE_TILED
      // resolve linked files (source, image)
      tilesets.map(tileset => {
        // get the url of the Tiled JSON object (in this case, the
        // properties object)
        let { __k, location } = window;
        let url = (__k ? __k.dm.get(properties) : '') || location.href;

        let { source } = tileset;
        if (source) {
          // @ifdef DEBUG
          if (!__k) {
            throw Error(
              `You must use "load" or "loadData" to resolve tileset.source`
            );
          }
          // @endif

          let resolvedSorce = __k.d[__k.u(source, url)];

          // @ifdef DEBUG
          if (!resolvedSorce) {
            throw Error(
              `You must load the tileset source "${source}" before loading the tileset`
            );
          }
          // @endif

          Object.keys(resolvedSorce).map(key => {
            tileset[key] = resolvedSorce[key];
          });
        }

        let { image } = tileset;
        /* eslint-disable-next-line no-restricted-syntax */
        if ('' + image === image) {
          // @ifdef DEBUG
          if (!__k) {
            throw Error(
              `You must use "load" or "loadImage" to resolve tileset.image`
            );
          }
          // @endif

          let resolvedImage = __k.i[__k.u(image, url)];

          // @ifdef DEBUG
          if (!resolvedImage) {
            throw Error(
              `You must load the image "${image}" before loading the tileset`
            );
          }
          // @endif

          tileset.image = resolvedImage;
        }
      });
      // @endif

      // add all properties to the object, overriding any defaults
      Object.assign(this, {
        context: getContext(),
        layerMap: {},
        layerCanvases: {},

        /**
         * The width of the tile map (in pixels).
         * @memberof TileEngine
         * @property {Number} mapwidth
         */
        mapwidth,

        /**
         * The height of the tile map (in pixels).
         * @memberof TileEngine
         * @property {Number} mapheight
         */
        mapheight,

        // @ifdef TILEENGINE_CAMERA
        _sx: 0,
        _sy: 0,
        // o = objects
        _o: [],
        // @endif

        /**
         * Array of all layers of the tile engine.
         * @memberof TileEngine
         * @property {Object[]} layers
         */
        ...properties
      });

      // p = prerender
      if (this.context) {
        this._p();
      }

      on('init', () => {
        this.context ??= getContext();
        this._p();
      });
    }

    // @ifdef TILEENGINE_CAMERA
    /**
     * X coordinate of the tile map camera.
     * @memberof TileEngine
     * @property {Number} sx
     */
    get sx() {
      return this._sx;
    }

    /**
     * Y coordinate of the tile map camera.
     * @memberof TileEngine
     * @property {Number} sy
     */
    get sy() {
      return this._sy;
    }

    // when clipping an image, sx and sy must be within the image
    // region, otherwise. Firefox and Safari won't draw it.
    // @see http://stackoverflow.com/questions/19338032/canvas-indexsizeerror-index-or-size-is-negative-or-greater-than-the-allowed-a
    set sx(value) {
      let max = Math.max(0, this.mapwidth - getCanvas().width);
      this._sx = clamp(0, max, value);
    }

    set sy(value) {
      let max = Math.max(0, this.mapheight - getCanvas().height);
      this._sy = clamp(0, max, value);
    }

    set objects(value) {
      this.remove(this._o);
      this.add(value);
    }

    get objects() {
      return this._o;
    }

    /**
     * Add an object to the tile engine.
     * @memberof TileEngine
     * @function add
     *
     * @param {...(Object|Object[])[]} objects - Object to add to the tile engine. Can be a single object, an array of objects, or a comma-separated list of objects.
     */
    add(...objects) {
      objects.flat().map(object => {
        this._o.push(object);
        object.parent = this;
      });
    }

    /**
     * Remove an object from the tile engine.
     * @memberof TileEngine
     * @function remove
     *
     * @param {...(Object|Object[])[]} objects - Object to remove from the tile engine. Can be a single object, an array of objects, or a comma-separated list of objects.
     */
    remove(...objects) {
      objects.flat().map(object => {
        removeFromArray(this._o, object);
        object.parent = null;
      });
    }
    // @endif

    // @ifdef TILEENGINE_DYNAMIC
    /**
     * Set the tile at the specified layer using either x and y coordinates or row and column coordinates.
     *
     * ```js
     * import { TileEngine } from 'kontra';
     *
     * let tileEngine = TileEngine({
     *   tilewidth: 32,
     *   tileheight: 32,
     *   width: 4,
     *   height: 4,
     *   tilesets: [{
     *     // ...
     *   }],
     *   layers: [{
     *     name: 'collision',
     *     data: [ 0,0,0,0,
     *             0,1,4,0,
     *             0,2,5,0,
     *             0,0,0,0 ]
     *   }]
     * });
     *
     * tileEngine.setTileAtLayer('collision', {row: 2, col: 1}, 10);
     * tileEngine.tileAtLayer('collision', {row: 2, col: 1});  //=> 10
     * ```
     * @memberof TileEngine
     * @function setTileAtLayer
     *
     * @param {String} name - Name of the layer.
     * @param {{x: Number, y: Number}|{row: Number, col: Number}} position - Position of the tile in either {x, y} or {row, col} coordinates.
     * @param {Number} tile - Tile index to set.
     */
    setTileAtLayer(name, position, tile) {
      let { layerMap, tileheight, tilewidth, width } = this;
      let { row, col, x, y } = position;

      let tileRow = row ?? getRow(y, tileheight);
      let tileCol = col ?? getCol(x, tilewidth);

      if (layerMap[name]) {
        this._d = true;
        layerMap[name]._d = true;
        layerMap[name].data[tileRow * width + tileCol] = tile;
      }
    }

    /**
     * Set the data at the specified layer.
     *
     * ```js
     * import { TileEngine } from 'kontra';
     *
     * let tileEngine = TileEngine({
     *   tilewidth: 32,
     *   tileheight: 32,
     *   width: 2,
     *   height: 2,
     *   tilesets: [{
     *     // ...
     *   }],
     *   layers: [{
     *     name: 'collision',
     *     data: [ 0,1,
     *             2,3 ]
     *   }]
     * });
     *
     * tileEngine.setLayer('collision', [ 4,5,6,7]);
     * tileEngine.tileAtLayer('collision', {row: 0, col: 0});  //=> 4
     * tileEngine.tileAtLayer('collision', {row: 0, col: 1});  //=> 5
     * tileEngine.tileAtLayer('collision', {row: 1, col: 0});  //=> 6
     * tileEngine.tileAtLayer('collision', {row: 1, col: 1});  //=> 7
     * ```
     *
     * @memberof TileEngine
     * @function setLayer
     *
     * @param {String} name - Name of the layer.
     * @param {Number[]} data - 1D array of tile indices.
     */
    setLayer(name, data) {
      let { layerMap } = this;
      if (layerMap[name]) {
        this._d = true;
        layerMap[name]._d = true;
        layerMap[name].data = data;
      }
    }
    // @endif

    // @ifdef TILEENGINE_QUERY
    /**
     * Check if the object collides with the layer (shares a gird coordinate with any positive tile index in layers data). The object being checked must have the properties `x`, `y`, `width`, and `height` so that its position in the grid can be calculated. [Sprite](api/sprite) defines these properties for you.
     *
     * ```js
     * import { TileEngine, Sprite } from 'kontra';
     *
     * let tileEngine = TileEngine({
     *   tilewidth: 32,
     *   tileheight: 32,
     *   width: 4,
     *   height: 4,
     *   tilesets: [{
     *     // ...
     *   }],
     *   layers: [{
     *     name: 'collision',
     *     data: [ 0,0,0,0,
     *             0,1,4,0,
     *             0,2,5,0,
     *             0,0,0,0 ]
     *   }]
     * });
     *
     * let sprite = Sprite({
     *   x: 50,
     *   y: 20,
     *   width: 5,
     *   height: 5
     * });
     *
     * tileEngine.layerCollidesWith('collision', sprite);  //=> false
     *
     * sprite.y = 28;
     *
     * tileEngine.layerCollidesWith('collision', sprite);  //=> true
     * ```
     * @memberof TileEngine
     * @function layerCollidesWith
     *
     * @param {String} name - The name of the layer to check for collision.
     * @param {Object} object - Object to check collision against.
     *
     * @returns {Boolean} `true` if the object collides with a tile, `false` otherwise.
     */
    layerCollidesWith(name, object) {
      let { tilewidth, tileheight, layerMap } = this;
      let { x, y, width, height } = getWorldRect(object);

      let row = getRow(y, tileheight);
      let col = getCol(x, tilewidth);
      let endRow = getRow(y + height, tileheight);
      let endCol = getCol(x + width, tilewidth);

      let layer = layerMap[name];

      // check all tiles
      for (let r = row; r <= endRow; r++) {
        for (let c = col; c <= endCol; c++) {
          if (layer.data[c + r * this.width]) {
            return true;
          }
        }
      }

      return false;
    }

    /**
     * Get the tile at the specified layer using either x and y coordinates or row and column coordinates.
     *
     * ```js
     * import { TileEngine } from 'kontra';
     *
     * let tileEngine = TileEngine({
     *   tilewidth: 32,
     *   tileheight: 32,
     *   width: 4,
     *   height: 4,
     *   tilesets: [{
     *     // ...
     *   }],
     *   layers: [{
     *     name: 'collision',
     *     data: [ 0,0,0,0,
     *             0,1,4,0,
     *             0,2,5,0,
     *             0,0,0,0 ]
     *   }]
     * });
     *
     * tileEngine.tileAtLayer('collision', {x: 50, y: 50});  //=> 1
     * tileEngine.tileAtLayer('collision', {row: 2, col: 1});  //=> 2
     * ```
     * @memberof TileEngine
     * @function tileAtLayer
     *
     * @param {String} name - Name of the layer.
     * @param {{x: Number, y: Number}|{row: Number, col: Number}} position - Position of the tile in either {x, y} or {row, col} coordinates.
     *
     * @returns {Number} The tile index. Will return `-1` if no layer exists by the provided name.
     */
    tileAtLayer(name, position) {
      let { layerMap, tileheight, tilewidth, width } = this;
      let { row, col, x, y } = position;

      let tileRow = row ?? getRow(y, tileheight);
      let tileCol = col ?? getCol(x, tilewidth);

      if (layerMap[name]) {
        return layerMap[name].data[tileRow * width + tileCol];
      }

      return -1;
    }
    // @endif

    /**
     * Render all visible layers.
     * @memberof TileEngine
     * @function render
     */
    render(_canvas = this._c, _renderObjects = true) {
      let { _d, context, sx = 0, sy = 0 } = this;

      if (_d) {
        this._p();
      }

      let { width, height } = getCanvas();
      let sWidth = Math.min(_canvas.width, width);
      let sHeight = Math.min(_canvas.height, height);

      context.drawImage(
        _canvas,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        sWidth,
        sHeight
      );

      // @ifdef TILEENGINE_CAMERA
      // draw objects
      if (_renderObjects) {
        context.save();

        // it's faster to only translate if one of the values is
        // non-zero rather than always translating
        // @see https://jsperf.com/translate-or-if-statement/2
        if (sx || sy) {
          context.translate(-sx, -sy);
        }

        this.objects.map(obj => obj.render && obj.render());

        context.restore();
      }
      // @endif
    }

    /**
     * Render a specific layer by name.
     * @memberof TileEngine
     * @function renderLayer
     *
     * @param {String} name - Name of the layer to render.
     */
    renderLayer(name) {
      let { layerCanvases, layerMap } = this;
      let layer = layerMap[name];
      let canvas = layerCanvases[name];
      let context = canvas?.getContext('2d');

      if (!canvas) {
        // cache the rendered layer so we can render it again without
        // redrawing all tiles
        let { mapwidth, mapheight } = this;
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d');
        canvas.width = mapwidth;
        canvas.height = mapheight;

        layerCanvases[name] = canvas;
        this._r(layer, context);
      }

      // @ifdef TILEENGINE_DYNAMIC
      if (layer._d) {
        layer._d = false;
        context.clearRect(0, 0, canvas.width, canvas.height);
        this._r(layer, context);
      }
      // @endif

      this.render(canvas, false);
    }

    /**
     * Pre-render the tiles to make drawing fast.
     */
    _p() {
      let { _ctx, layers = [], layerMap } = this;

      // d = dirty
      this._d = false;

      layers.map(layer => {
        let { name, data, visible } = layer;
        layer._d = false;
        layerMap[name] = layer;

        if (data && visible != false) {
          this._r(layer, _ctx);
        }
      });
    }

    /**
     * Render a layer.
     *
     * @param {Object} layer - Layer data.
     * @param {Context} context - Context to draw layer to.
     */
    _r(layer, context) {
      let { opacity, data = [] } = layer;
      let { tilesets, width, tilewidth, tileheight } = this;

      context.save();
      context.globalAlpha = opacity;

      data.map((tile, index) => {
        // skip empty tiles (0)
        if (!tile) return;

        // find the tileset the tile belongs to
        // assume tilesets are ordered by firstgid
        let tileset;
        for (let i = tilesets.length - 1; i >= 0; i--) {
          tileset = tilesets[i];

          if (tile / tileset.firstgid >= 1) {
            break;
          }
        }

        let { image, margin = 0, firstgid, columns } = tileset;
        let offset = tile - firstgid;
        let cols = columns ?? (image.width / (tilewidth + margin)) | 0;

        let x = (index % width) * tilewidth;
        let y = ((index / width) | 0) * tileheight;
        let sx = (offset % cols) * (tilewidth + margin);
        let sy = ((offset / cols) | 0) * (tileheight + margin);

        context.drawImage(
          image,
          sx,
          sy,
          tilewidth,
          tileheight,
          x,
          y,
          tilewidth,
          tileheight
        );
      });

      context.restore();
    }
  }

  function factory() {
    return new TileEngine(...arguments);
  }

  let kontra = {
    Animation: factory$b,
    AnimationClass: Animation,

    imageAssets,
    audioAssets,
    dataAssets,
    setImagePath,
    setAudioPath,
    setDataPath,
    loadImage,
    loadAudio,
    loadData,
    load,

    Button: factory$6,
    ButtonClass: Button,

    init: init$1,
    getCanvas,
    getContext,

    on,
    off,
    emit,

    GameLoop,
    GameObject: factory$9,
    GameObjectClass: GameObject,

    gamepadMap,
    updateGamepad,
    initGamepad,
    onGamepad,
    offGamepad,
    gamepadPressed,
    gamepadAxis,

    gestureMap,
    initGesture,
    onGesture,
    offGesture,

    Grid: factory$5,
    GridClass: Grid,

    degToRad,
    radToDeg,
    angleToTarget,
    rotatePoint,
    movePoint,
    randInt,
    seedRand,
    lerp,
    inverseLerp,
    clamp,
    setStoreItem,
    getStoreItem,
    collides,
    getWorldRect,
    depthSort,

    initInput,
    onInput,
    offInput,

    keyMap,
    initKeys,
    onKey,
    offKey,
    keyPressed,

    registerPlugin,
    unregisterPlugin,
    extendObject,

    initPointer,
    getPointer,
    track,
    untrack,
    pointerOver,
    onPointer,
    offPointer,
    pointerPressed,

    Pool: factory$4,
    PoolClass: Pool,

    Quadtree: factory$3,
    QuadtreeClass: Quadtree,

    Scene: factory$2,
    SceneClass: Scene,

    Sprite: factory$8,
    SpriteClass: Sprite,

    SpriteSheet: factory$1,
    SpriteSheetClass: SpriteSheet,

    Text: factory$7,
    TextClass: Text,

    TileEngine: factory,
    TileEngineClass: TileEngine,

    Vector: factory$a,
    VectorClass: Vector
  };

  return kontra;

})();
