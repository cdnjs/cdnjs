
(function($) {
  "use strict";

  var name = 'spritespin';

  /**
   * The SpriteSpin object.
   * @type {object}
   */
  var Spin = {};

  /**
   * @module SpriteSpin
   * @type {object}
   */
  window.SpriteSpin = Spin;

  /**
   * The namespace that is used to bind functions to DOM events and store the data object
   * @type {string}
   */
  Spin.namespace = name;

  /**
   * Collection of registered modules that can be used to extend the functionality of SpriteSpin.
   * @type {object}
   */
  Spin.mods = {};

  /**
   * Event names that are recognized by SpriteSpin. A module can implement any of these and they will be bound
   * to the target element on which the plugin is called.
   * @type {string[]}
   */
  Spin.eventNames = [
    'mousedown',
    'mousemove',
    'mouseup',
    'mouseenter',
    'mouseover',
    'mouseleave',
    'dblclick',
    'mousewheel',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'selectstart',
    'gesturestart',
    'gesturechange',
    'gestureend'
  ];

  /**
   * Names of events for that the default behavior should be prevented.
   * @type {string[]}
   */
  Spin.eventsToPrevent = [
    'dragstart'
  ];

  /**
   * Default set of SpriteSpin options. This also represents the majority of data attributes that are used during the
   * lifetime of a SpriteSpin instance. The data is stored inside the target DOM element on which the plugin is called.
   * @type {object}
   */
  Spin.defaults = {
    source            : undefined,    // Stitched source image or array of files
    width             : undefined,    // actual display width
    height            : undefined,    // actual display height
    frames            : undefined,    // Total number of frames
    framesX           : undefined,    // Number of frames in one row of sprite sheet (if source is a spritesheet)
    lanes             : 1,            // Number of 360 sequences. Used for 3D like effect.
    sizeMode          : undefined,    //

    module            : '360',        // The presentation module to use
    behavior          : 'drag',       // The interaction module to use
    renderer          : 'canvas',     // The rendering mode to use

    lane              : 0,            // The initial sequence number to play
    frame             : 0,            // Initial (and current) frame number
    frameTime         : 40,           // Time in ms between updates. 40 is exactly 25 FPS
    animate           : true,         // If true starts the animation on load
    reverse           : false,        // If true animation is played backward
    loop              : true,         // If true loops the animation
    stopFrame         : 0,            // Stops the animation at this frame if loop is disabled

    wrap              : true,         // If true wraps around the frame index on user interaction
    wrapLane          : false,        // If true wraps around the lane index on user interaction
    sense             : 1,            // Interaction sensitivity used by behavior implementations
    senseLane         : undefined,    // Interaction sensitivity used by behavior implementations
    orientation       : 'horizontal', // Preferred axis for user interaction
    detectSubsampling : true,         // Tries to detect whether the images are downsampled by the browser.
    scrollThreshold   : 50,           // Number of pixels the user must drag within a frame to enable page scroll (for touch devices)
    preloadCount      : undefined,    // Number of frames to preload. If nothing is set, all frames are preloaded.

    onInit            : undefined,    // Occurs when plugin has been initialized, but before loading the source files
    onProgress        : undefined,    // Occurs when any source file has been loaded
    onLoad            : undefined,    // Occurs when all source files have been loaded
    onFrame           : undefined,    // Occurs when the frame number has been updated (e.g. during animation)
    onDraw            : undefined     // Occurs when all update is complete and frame can be drawn
  };

  //
  // ----------

  var idCounter = 0;
  var instances = {};
  Spin.instances = instances;

  function simulateEvent(name, e) {
    for (var id in instances) {
      if (!instances.hasOwnProperty(id)) continue;
      var data = instances[id];
      var i, module;
      for (i = 0; i < data.mods.length; i += 1) {
        module = data.mods[i];
        if (typeof module[name] != 'function') continue;
        module[name].apply(data.target, [e, data]);
      }
    }
  }

  function bindSimulatedEvent(eName){
    $(window.document).bind(eName + '.' + name, function(e){
      simulateEvent('document' + eName, e);
    });
  }

  function handleResizeEvent() {
    for (var id in instances) {
      if (instances.hasOwnProperty(id)) {
        var data = instances[id];
        if (data.responsive) {
          Spin.boot(data);
        }
      }
    }
  }

  var resizeTimeout = null;
  $(window).on('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResizeEvent, 100);
  });

  for (var i = 0; i < Spin.eventNames.length; i += 1) {
    bindSimulatedEvent(Spin.eventNames[i]);
  }

  function pushInstance(data) {
    idCounter += 1;
    data.id = idCounter;
    instances[idCounter] = data;
  }

  function popInstance(data) {
    delete instances[data.id];
  }

  // Internal Helper Functions
  // ----------

  // converts the given number to string and pads it to match at least the given length.
  // The pad value is added in front of the string. This padNumber(4, 5, 0) would convert 4 to '00004'
  function padNumber(num, length, pad){
    num = String(num);
    while (num.length < length){
      num = String(pad) + num;
    }
    return num;
  }

  // clamps the given value by the given min and max values
  function clamp(value, min, max){
    return (value > max ? max : (value < min ? min : value));
  }
  Spin.clamp = clamp;

  function wrap(value, min, max, size){
    while (value > max){ value -= size; }
    while (value < min){ value += size; }
    return value;
  }
  Spin.wrap = wrap;

  // prevents default action on the given event
  function prevent(e){
    e.preventDefault();
    return false;
  }

  function log(){
    if (window.console && window.console.log){
      window.console.log.apply(window.console, arguments);
    }
  }

  // Binds on the given target and event the given function.
  // The SpriteSpin namespace is attached to the event name
  function bind(target, event, func){
    if (func) {
      target.bind(event + '.' + name, function(e){
        func.apply(target, [e, target.spritespin('data')]);
      });
    }
  }
  Spin.bind = bind;

  // Unbinds all SpriteSpin events from given target element
  function unbind(target){
    target.unbind('.' + name);
  }

  // Loads a set of image files. Yields the progress and the completion of the load operation.
  function load(opts){
    // convert opts.source to an array of strings
    var src = (typeof opts.source === 'string') ? [opts.source] : opts.source;
    var i, count = 0, img, images = [], targetCount = (opts.preloadCount || src.length);
    var completed = false, firstLoaded = false;
    var tick = function(){
      count += 1;
      if (typeof opts.progress === 'function'){
        opts.progress({
          index: $.inArray(this, images),
          loaded: count,
          total: src.length,
          percent: Math.round((count / src.length) * 100)
        });
      }
      firstLoaded = firstLoaded || (this === images[0]);
      if (!completed && (count >= targetCount) && firstLoaded && (typeof opts.complete === 'function')) {
        completed = true;
        opts.complete(images);
      }
    };
    for (i = 0; i < src.length; i += 1 ) {
      img = new Image();
      images.push(img);
      // currently no care about error or aborting transfers
      img.onload = img.onabort = img.onerror = tick;
      img.src = src[i];
    }
    if (typeof opts.initiated === 'function'){
      opts.initiated(images);
    }
  }

  // Idea taken from https://github.com/stomita/ios-imagefile-megapixel
  // Detects whether the image has been sub sampled by the browser and does not have its original dimensions.
  // This method unfortunately does not work for images that have transparent background.
  function detectSubsampling(img, size) {
    var iw = (size || img).width;
    var ih = (size || img).height;

    // sub sampling happens on images above 1 megapixel
    if (iw * ih <= 1024 * 1024) {
      return false;
    }

    var canvas;
    canvas = document.createElement('canvas');
    if (!canvas || !canvas.getContext){
      return false;
    }

    var context = canvas.getContext('2d');
    if (!context){
      return false;
    }

    // set canvas to 1x1 pixel size and fill it with magenta color
    canvas.width = canvas.height = 1;
    context.fillStyle = "#FF00FF";
    context.fillRect(0, 0, 1, 1);
    // render the image with a negative offset to the left so that it would
    // fill the canvas pixel with the top right pixel of the image.
    context.drawImage(img, -iw + 1, 0);

    // check color value to confirm image is covering edge pixel or not.
    // if color still magenta, the image is assumed to be sub sampled.
    try {
      var dat = context.getImageData(0, 0, 1, 1).data;
      return (dat[0] === 255) && (dat[1] === 0) && (dat[2] === 255);
    }
    catch(err) {
      // avoids cross origin exception for chrome when code runs without a server
      log(err.message, err.stack);
      return false;
    }
  }

  // gets the original width and height of an image element
  function naturalSize(image){
    // for browsers that support naturalWidth and naturalHeight properties
    if (image.naturalWidth != null) {
      return {
        width: image.naturalWidth,
        height: image.naturalHeight
      };
    }

    // browsers that do not support naturalWidth and naturalHeight properties we have to fall back to the width and
    // height properties. However, the image might have a css style applied so width and height would return the
    // css size. We have to create a new Image object that is free of css rules and grab the values from that objet.
    // Here we assume that the src has already been downloaded, so no onload callback is needed.
    var img = new Image();
    img.src = image.src;
    return {
      width: img.width,
      height: img.height
    };
  }

  function pixelRatio(context) {
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio =
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;
    return devicePixelRatio / backingStoreRatio;
  }

  // Public Helper Functions
  // ----------

  /**
   * Generates an array of source strings
   * - path is a source string where the frame number of the file name is exposed as '{frame}'
   * - start indicates the first frame number
   * - end indicates the last frame number
   * - digits is the number of digits used in the file name for the frame number
   * @example
   *      sourceArray('http://example.com/image_{frame}.jpg, { frame: [1, 3], digits: 2 })
   *      // -> [ 'http://example.com/image_01.jpg', 'http://example.com/image_02.jpg', 'http://example.com/image_03.jpg' ]
   * @param path
   * @param opts
   * @returns {Array}
   */
  Spin.sourceArray = function(path, opts){
    var fStart = 0, fEnd = 0, lStart = 0, lEnd = 0, digits = opts.digits || 2;
    if (opts.frame) {
      fStart = opts.frame[0];
      fEnd = opts.frame[1];
    }
    if (opts.lane) {
      lStart = opts.lane[0];
      lEnd = opts.lane[1];
    }
    var i, j, temp, result = [];
    for (i = lStart; i <= lEnd; i+=1){
      for (j = fStart; j <= fEnd; j+=1){
        temp = path.replace("{lane}", padNumber(i, digits, 0));
        temp = temp.replace("{frame}", padNumber(j, digits, 0));
        result.push(temp);
      }
    }
    return result;
  };

  /**
   * Measures the image frames that are used in the given data object
   * @param {object} data
   */
  Spin.measureSource = function(data){
    var img = data.images[0];
    var size = naturalSize(img);

    if (data.images.length === 1) {
      data.sourceWidth = size.width;
      data.sourceHeight = size.height;
      if (data.detectSubsampling && detectSubsampling(img, size)){
        data.sourceWidth /= 2;
        data.sourceHeight /= 2;
      }

      // calculate the number of frames packed in a row
      // assume tightly packed images without any padding pixels
      data.framesX = data.framesX || data.frames;

      // calculate size of a single frame
      if (!data.frameWidth || !data.frameHeight){
        if (data.framesX){
          data.frameWidth = Math.floor(data.sourceWidth / data.framesX);
          var framesY = Math.ceil((data.frames * data.lanes) / data.framesX);
          data.frameHeight = Math.floor(data.sourceHeight / framesY);
        } else {
          data.frameWidth = size.width;
          data.frameHeight = size.height;
        }
      }
    } else {
      data.sourceWidth = data.frameWidth = size.width;
      data.sourceHeight = data.frameHeight = size.height;
      if (detectSubsampling(img, size)){
        data.sourceWidth = data.frameWidth = size.width / 2;
        data.sourceHeight = data.frameHeight = size.height / 2;
      }
      data.frames = data.frames || data.images.length;
    }
  };

  /**
   * Resets the input state of the SpriteSpin data.
   * @param {object} data
   */
  Spin.resetInput = function(data){
    data.startX = data.startY = undefined;      // initial touch/click position
    data.currentX = data.currentY = undefined;  // touch/click position in current frame
    data.oldX = data.oldY = undefined;          // touch/click position in last frame
    data.dX = data.dY = data.dW = 0;            // drag direction from start to current frame
    data.ddX = data.ddY = data.ddW = 0;         // drag direction from previous to current frame
  };

  /**
   * Updates the input state of the SpriteSpin data using the given mouse or touch event.
   * @param {*} e
   * @param {object} data
   */
  Spin.updateInput = function(e, data){
    // jQuery Event normalization does not preserve the 'event.touches'
    // try to grab touches from the original event
    if (e.touches === undefined && e.originalEvent !== undefined){
      e.touches = e.originalEvent.touches;
    }

    // cache positions from previous frame
    data.oldX = data.currentX;
    data.oldY = data.currentY;

    // get current touch or mouse position
    if (e.touches !== undefined && e.touches.length > 0){
      data.currentX = e.touches[0].clientX || 0;
      data.currentY = e.touches[0].clientY || 0;
    } else {
      data.currentX = e.clientX || 0;
      data.currentY = e.clientY || 0;
    }
    // Fix old position.
    if (data.oldX === undefined || data.oldY === undefined){
      data.oldX = data.currentX;
      data.oldY = data.currentY;
    }

    // Cache the initial click/touch position and store the frame number at which the click happened.
    // Useful for different behavior implementations. This must be restored when the click/touch is released.
    if (data.startX === undefined || data.startY === undefined){
      data.startX = data.currentX;
      data.startY = data.currentY;
      data.clickframe = data.frame;
      data.clicklane = data.lane;
    }

    // Calculate the vector from start position to current pointer position.
    data.dX = data.currentX - data.startX;
    data.dY = data.currentY - data.startY;

    // Calculate the vector from last frame position to current pointer position.
    data.ddX = data.currentX - data.oldX;
    data.ddY = data.currentY - data.oldY;

    // Normalize vectors to range [-1:+1]
    data.ndX = data.dX / data.width;
    data.ndY = data.dY / data.height;

    data.nddX = data.ddX / data.width;
    data.nddY = data.ddY / data.height;
  };

  /**
   * Updates the frame number of the SpriteSpin data. Performs an auto increment if no frame number is given.
   * @param {object} data
   * @param {number} [frame]
   * @param {number} [lane]
   */
  Spin.updateFrame = function(data, frame, lane){

    data.lastFrame = data.frame;
    data.lastLane = data.lane;

    if (frame !== undefined){
      data.frame = Number(frame);
    } else if (data.animation) {
      data.frame += (data.reverse ? -1 : 1);
    }

    if (data.animation){
      // wrap the frame value to fit in range [0, data.frames]
      data.frame = wrap(data.frame, 0, data.frames - 1, data.frames);
      // stop animation if loop is disabled and the stopFrame is reached
      if (!data.loop && (data.frame === data.stopFrame)){
        Spin.stopAnimation(data);
      }
    } else if (data.wrap){
      // wrap/clamp the frame value to fit in range [0, data.frames]
      data.frame = wrap(data.frame, 0, data.frames - 1, data.frames);
    } else {
      data.frame = clamp(data.frame, 0, data.frames - 1);
    }
    if (lane !== undefined){
      data.lane = lane;
      if (data.wrapLane){
        data.lane = wrap(data.lane, 0, data.lanes - 1, data.lanes);
      } else {
        data.lane = clamp(data.lane, 0, data.lanes - 1);
      }
    }
    if (data.lastFrame != data.frame || data.lastLane != data.lane) {
      data.target.trigger("onFrameChanged", data);
    }
    data.target.trigger("onFrame", data);
    data.target.trigger("onDraw", data);
  };

  /**
   * Stops the running animation on given SpriteSpin data.
   * @param {object} data
   */
  Spin.stopAnimation = function(data){
    data.animate = false;
    if (data.animation){
      window.clearInterval(data.animation);
      data.animation = null;
    }
  };

  /**
   * Starts animation on given SpriteSpin data if animation is enabled.
   * @param {object} data
   */
  Spin.setAnimation = function(data){
    if (data.animate){
      Spin.requestFrame(data);
    } else {
      Spin.stopAnimation(data);
    }
  };

  Spin.requestFrame = function(data){
    if (data.animation){
      // another frame has been already requested
      return;
    }
    // cache the tick function
    if (data.frameFunction === undefined){
      data.frameFunction = function(){
        try {
          Spin.updateFrame(data);
        } catch(ignore){
          // The try catch block is a hack for Opera Browser
          // Opera sometimes rises an exception here and
          // stops performing the script
        }
      };
    }
    //
    data.animation = window.setInterval(data.frameFunction, data.frameTime);
  };

  /**
   * Replaces module names on given SpriteSpin data and replaces them with actual implementations.
   * @param {object} data
   */
  Spin.setModules = function(data){
    var i, modName, mod;
    for(i = 0; i < data.mods.length; i += 1){
      modName = data.mods[i];
      if (typeof modName === 'string'){
        mod = Spin.mods[modName];
        if (mod){
          data.mods[i] = mod;
        } else {
          $.error("No module found with name " + modName);
        }
      }
    }
  };

  Spin.displaySize = function(data) {
    var w = Math.floor(data.width || data.frameWidth || data.target.innerWidth());
    var h = Math.floor(data.height || data.frameHeight || data.target.innerHeight());
    var a = w / h;
    return {
      width: w, 
      height: h,
      aspect: a
    }
  }
  
  Spin.calculateInnerLayout = function(data){
    // outer container size
    var w = Math.floor(data.width || data.frameWidth || data.target.innerWidth());
    var h = Math.floor(data.height || data.frameHeight || data.target.innerHeight());
    var a = w / h;

    // inner container size
    var w1 = data.frameWidth || w;
    var h1 = data.frameHeight || h;
    var a1 = w1 / h1;

    // resulting layout
    var css = {
      width    : '100%',
      height   : '100%',
      top      : 0,
      left     : 0,
      bottom   : 0,
      right    : 0,
      position : 'absolute',
      overflow : 'hidden'
    };

    // calculate size
    var mode = data.sizeMode;
    if (!mode || mode == 'scale'){
      return css;
    }

    if (mode == 'original') {
      css.width = w1;
      css.height = h1;
    } else if (mode == 'fit') {
      if (a1 >= a) {
        css.width = w;
        css.height = w / a1;
      } else {
        css.height = h;
        css.width = h * a1;
      }
    } else if (mode == 'fill') {
      if (a1 >= a) {
        css.height = h;
        css.width = h * a1;
      } else {
        css.width = w;
        css.height = w / a1;
      }
    } else {
      css.width = w;
      css.height = h;
    }

    css.width = css.width|0;
    css.height = css.height|0;

    // position in center
    css.top = ((h - css.height) / 2)|0;
    css.left = ((w - css.width) / 2)|0;
    css.right = css.left;
    css.bottom = css.top;

    return css;
  };

  /**
   * Applies css attributes to layout the SpriteSpin containers.
   * @param {object} data
   */
  Spin.setLayout = function(data){
    // disable selection
    data.target
      .attr('unselectable', 'on')
      .css({
        width: '', height: '',
        '-ms-user-select': 'none',
        '-moz-user-select': 'none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        'user-select': 'none'
      });

    var w = Math.floor(data.width || data.frameWidth || data.target.innerWidth());
    var h = Math.floor(data.height || data.frameHeight || data.target.innerHeight());
    
    if (data.responsive && (typeof window.getComputedStyle === 'function')) {
      var style = getComputedStyle(data.target[0]);
      if (style.width) {
        var a = w / h;
        w = Number(style.width.replace('px', ''))|0;
        h = (w / a)|0;
      }
    }

    data.target.css({
      width    : w,
      height   : h,
      position : 'relative',
      overflow : 'hidden'
    });

    var css = Spin.calculateInnerLayout(data);
    data.stage.css(css).hide();
    if (data.canvas){
      data.canvasRatio = data.canvasRatio || pixelRatio(data.context);
      data.canvas[0].width = (css.width * data.canvasRatio) || w;
      data.canvas[0].height = (css.height * data.canvasRatio) || h;
      data.canvas.css(css).hide();
      data.context.scale(data.canvasRatio, data.canvasRatio);
    }
  };

  /**
   * (re)binds all spritespin events on the target element
   * @param data
   */
  Spin.setEvents = function(data){
    var i, j, mod, target = data.target;

    // Clear all SpriteSpin events on the target element
    unbind(target);

    // disable all default browser behavior on the following events
    // mainly prevents image drag operation
    for (j = 0; j < Spin.eventsToPrevent.length; j += 1){
      bind(target, Spin.eventsToPrevent[j],  prevent);
    }

    // Bind module functions to SpriteSpin events
    for (i = 0; i < data.mods.length; i += 1){
      mod = data.mods[i];

      for (j = 0; j < Spin.eventNames.length; j += 1){
        bind(target, Spin.eventNames[j], mod[Spin.eventNames[j]]);
      }

      // bind
      bind(target, 'onInit',     mod.onInit);
      bind(target, 'onProgress', mod.onProgress);
      bind(target, 'onLoad',     mod.onLoad);
      bind(target, 'onFrameChanged', mod.onFrameChanged);
      bind(target, 'onFrame',    mod.onFrame);
      bind(target, 'onDraw',     mod.onDraw);
    }

    // bind auto start function to load event.
    bind(target, 'onLoad', function(e, data){
      Spin.setAnimation(data);
    });

    // bind all user events that have been passed on initialization
    bind(target, 'onInit',     data.onInit);
    bind(target, 'onProgress', data.onProgress);
    bind(target, 'onLoad',     data.onLoad);
    bind(target, 'onFrameChanged', mod.onFrameChanged);
    bind(target, 'onFrame',    data.onFrame);
    bind(target, 'onDraw',     data.onDraw);
  };

  /**
   * Runs the boot process. (re)creates modules, (re)sets the layout, (re)binds all events and loads source images.
   * @param {object} data
   */
  Spin.boot = function(data){
    Spin.setModules(data);
    Spin.setLayout(data);
    Spin.setEvents(data);
    data.target.addClass('loading').trigger('onInit', data);
    data.loading = true;
    load({
      source: data.source,
      preloadCount: data.preloadCount,
      progress: function(progress){
        data.target.trigger('onProgress', [progress, data]);
      },
      complete: function(images){
        data.images = images;
        data.loading = false;
        Spin.measureSource(data);
        Spin.setLayout(data);
        data.stage.show();
        data.target
          .removeClass('loading')
          .trigger('onLoad', data)
          .trigger('onFrame', data)
          .trigger('onDraw', data);
      }
    });
  };

  /**
   * Initializes the target element with spritespin data.
   * @param {object} options
   */
  Spin.create = function(options){
    var $this = options.target;
    var data  = $this.data(name);

    if (!data){
      // SpriteSpin is not initialized
      // Create default settings object and extend with given options
      data = $.extend({}, Spin.defaults, options);

      // ensure that there is anything set as a source
      data.source = data.source || [];

      // if image tags are contained inside this DOM element
      // use these images as the source files
      $this.find('img').each(function(){
        data.source.push($(this).attr('src'));
      });

      // build inner html
      // <div>
      //   <div class='spritespin-stage'></div>
      //   <canvas class='spritespin-canvas'></canvas>
      // </div>
      $this
        .empty()
        .addClass("spritespin-instance")
        .append("<div class='spritespin-stage'></div>");

      // add the canvas element if canvas rendering is enabled and supported
      if (data.renderer === 'canvas'){
        var canvas = $("<canvas class='spritespin-canvas'></canvas>")[0];
        if (!!(canvas.getContext && canvas.getContext('2d'))){
          data.canvas = $(canvas);
          data.context = canvas.getContext("2d");
          $this.append(data.canvas);
          $this.addClass('with-canvas');
        } else {
          // fallback to image rendering mode
          data.renderer = 'image';
        }
      }

      // setup references to DOM elements
      data.target = $this;
      data.stage = $this.find(".spritespin-stage");

      // store the data
      $this.data(name, data);
      pushInstance(data);
    } else {
      // just update the data object
      $.extend(data, options);
    }

    // convert string source to array of strings
    if (typeof data.source === 'string'){
      data.source = [data.source];
    }

    // behavior and module attributes tell us what additional modules must be loaded.
    if (data.mods){
      delete data.behavior;
      delete data.module;
    }
    if (data.behavior || data.module){
      data.mods = [];
      if (data.behavior){
        data.mods.push(data.behavior);
      }
      if (data.module){
        data.mods.push(data.module);
      }

      delete data.behavior;
      delete data.module;
    }

    Spin.boot(data);
  };

  /**
   * Stops running animation, unbinds all events and deletes the data on the target element of the given data object.
   * @param {object} data The spritespin data object.
   */
  Spin.destroy = function(data){
    if (data){
      popInstance(data);
      Spin.stopAnimation(data);
      unbind(data.target);
      data.target.removeData(name);
    }
  };

  /**
   * Registers a module implementation as an available extension to SpriteSpin.
   * Use this to add custom Rendering or Updating modules that can be addressed with the 'module' option.
   * @param {string} name the name of the module
   * @param {object} [module] the module implementation
   * @returns {object} the given module
   */
  Spin.registerModule = function(name, module){
    if (Spin.mods[name]){
      $.error('Module name is already taken: ' + name);
    }
    module = module || {};
    Spin.mods[name] = module;
    return module;
  };

  /**
   *
   * @param data
   * @class SpriteSpin.Api
   * @constructor
   */
  Spin.Api = function(data){
    this.data = data;
  };

  /**
   * Helper method that allows to extend the api with more methods.
   * Receives an object with named functions that are extensions to the API.
   * @param methods
   * @returns {SpriteSpin.Api.prototype}
   */
  Spin.extendApi = function(methods){
    var key, api = Spin.Api.prototype;
    for(key in methods) {
      if (methods.hasOwnProperty(key)) {
        if (api[key]){
          $.error('API method is already defined: ' + key);
        } else {
          api[key] = methods[key];
        }
      }
    }
    return api;
  };

  /**
   * Instantiates or updates already created instances of SpriteSpin on the nodes in target
   * @param {object|string} obj
   * @param {*} [value]
   * @returns {*}
   */
  $.fn.spritespin = function(obj, value) {
    if (obj === "data"){
      return this.data(name);
    }
    if (obj === "api"){
      var data = this.data(name);
      data.api = data.api || new Spin.Api(data);
      return data.api;
    }
    if (obj === "destroy"){
      return $(this).each(function(){
        Spin.destroy($(this).data(name));
      });
    }
    if (arguments.length === 2 && typeof obj === 'string'){
      var tmp = {};
      tmp[obj] = value;
      obj = tmp;
    }
    if (typeof obj === 'object') {
      obj.target = obj.target || $(this);
      Spin.create(obj);
      return obj.target;
    }

    return $.error( 'Invalid call to spritespin' );
  };

}(window.jQuery || window.Zepto || window.$));

(function ($) {
  "use strict";

  // reference to SpriteSpin implementation
  var SpriteSpin = window.SpriteSpin;

  SpriteSpin.extendApi({
    // Gets a value indicating whether the animation is currently running.
    isPlaying: function(){
      return this.data.animation !== null;
    },

    // Gets a value indicating whether the animation looping is enabled.
    isLooping: function(){
      return this.data.loop;
    },

    // Starts/Stops the animation playback
    toggleAnimation: function(){
      this.data.animate = !this.data.animate;
      SpriteSpin.setAnimation(this.data);
    },

    // Stops animation playback
    stopAnimation: function(){
      this.data.animate = false;
      SpriteSpin.setAnimation(this.data);
    },

    // Starts animation playback
    startAnimation: function(){
      this.data.animate = true;
      SpriteSpin.setAnimation(this.data);
    },

    // Sets a value indicating whether the animation should be looped or not.
    // This might start the animation (if the 'animate' data attribute is set to true)
    loop: function(value){
      this.data.loop = value;
      SpriteSpin.setAnimation(this.data);
      return this;
    },

    // Gets the current frame number
    currentFrame: function(){
      return this.data.frame;
    },

    // Updates SpriteSpin to the specified frame.
    updateFrame: function(frame){
      SpriteSpin.updateFrame(this.data, frame);
      return this;
    },

    // Skips the given number of frames
    skipFrames: function(step){
      var data = this.data;
      SpriteSpin.updateFrame(data, data.frame + (data.reverse ? - step : + step));
      return this;
    },

    // Updates SpriteSpin so that the next frame is shown
    nextFrame: function(){
      return this.skipFrames(1);
    },

    // Updates SpriteSpin so that the previous frame is shown
    prevFrame: function(){
      return this.skipFrames(-1);
    },

    // Starts the animations that will play until the given frame number is reached
    // options:
    //   force [boolean] starts the animation, even if current frame is the target frame
    //   nearest [boolean] animates to the direction with minimum distance to the target frame
    playTo: function(frame, options){
      var data = this.data;
      options = options || {};
      if (!options.force && data.frame === frame){
        return;
      }
      if (options.nearest){
        var a = frame - data.frame;                 // distance to the target frame
        var b = frame > data.frame ? a - data.frames : a + data.frames;        // distance to last frame and the to target frame
        var c = Math.abs(a) < Math.abs(b) ? a : b;  // minimum distance
        data.reverse = c < 0;
      }
      data.animate = true;
      data.loop = false;
      data.stopFrame = frame;
      SpriteSpin.setAnimation(data);
      return this;
    }
  });

}(window.jQuery || window.Zepto || window.$));

(function ($) {
  "use strict";

  // https://github.com/sindresorhus/screenfull.js/blob/gh-pages/src/screenfull.js
  var fn = (function () {
    var val;
    var valLength;

    var fnMap = [
      [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror'
      ],
      // new WebKit
      [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror'

      ],
      // old WebKit (Safari 5.1)
      [
        'webkitRequestFullScreen',
        'webkitCancelFullScreen',
        'webkitCurrentFullScreenElement',
        'webkitCancelFullScreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror'

      ],
      [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror'
      ],
      [
        'msRequestFullscreen',
        'msExitFullscreen',
        'msFullscreenElement',
        'msFullscreenEnabled',
        'MSFullscreenChange',
        'MSFullscreenError'
      ]
    ];

    var i = 0;
    var l = fnMap.length;
    var ret = {};

    for (; i < l; i++) {
      val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0, valLength = val.length; i < valLength; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }

    return false;
  })();

  function requestFullscreen(e){
    e = e || document.documentElement;
    e[fn.requestFullscreen]();
  }

  function exitFullscreen(){
    return document[fn.exitFullscreen]();
  }

  function fullscreenEnabled(){
    return document[fn.fullscreenEnabled];
  }

  function fullscreenElement(){
    return document[fn.fullscreenElement];
  }

  function isFullscreen(){
    return !!fullscreenElement();
  }

  var changeEvent = fn.fullscreenchange + '.' + SpriteSpin.namespace + '-fullscreen';
  function unbindChangeEvent(){
    $(document).unbind(changeEvent);
  }

  function bindChangeEvent(callback){
    unbindChangeEvent();
    $(document).bind(changeEvent, callback);
  }

  var orientationEvent = 'orientationchange.' + SpriteSpin.namespace + '-fullscreen';
  function unbindOrientationEvent() {
    $(window).unbind(orientationEvent)
  }
  function bindOrientationEvent(callback) {
    unbindOrientationEvent()
    $(window).bind(orientationEvent, callback);
  }

  SpriteSpin.extendApi({
    fullscreenEnabled: fullscreenEnabled,
    fullscreenElement: fullscreenElement,
    exitFullscreen: exitFullscreen,
    toggleFullscreen: function(opts){
      if (isFullscreen()) {
        this.requestFullscreen(opts)
      } else {
        this.exitFullscreen()
      }
    },
    requestFullscreen: function(opts){
      opts = opts || {};
      var api = this;
      var data = api.data;
      var oWidth = data.width;
      var oHeight = data.height;
      var oSource = data.source;
      var oSize = data.sizeMode;
      var oResponsive = data.responsive;
      var enter = function() {
        data.width = window.screen.width;
        data.height = window.screen.height;
        data.source = opts.source || oSource;
        data.sizeMode = opts.sizeMode || 'fit';
        data.responsive = false;
        SpriteSpin.boot(data);
      }
      var exit = function() {
        data.width = oWidth;
        data.height = oHeight;
        data.source = oSource;
        data.sizeMode = oSize;
        data.responsive = oResponsive;
        SpriteSpin.boot(data);
      }

      bindChangeEvent(function(){
        if (isFullscreen()){
          enter();
          bindOrientationEvent(enter);
        } else {
          unbindChangeEvent();
          unbindOrientationEvent();
          exit();
        }
      });
      requestFullscreen(data.target[0]);
    }
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));

(function ($, SpriteSpin) {
  "use strict";

  function click(e, data) {
    if (data.loading || !data.stage.is(':visible')) return;
    SpriteSpin.updateInput(e, data);

    var half, pos, target = data.target, offset = target.offset();
    if (data.orientation === "horizontal") {
      half = target.innerWidth() / 2;
      pos = data.currentX - offset.left;
    } else {
      half = target.innerHeight() / 2;
      pos = data.currentY - offset.top;
    }
    SpriteSpin.updateFrame(data, data.frame + (pos > half ? 1 : -1));
  }

  SpriteSpin.registerModule('click', {
    mouseup: click,
    touchend: click
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));
(function ($, SpriteSpin) {
  "use strict";

  function dragStart(e, data) {
    if (data.loading || data.dragging || !data.stage.is(':visible')) return;
    data.dragFrame = data.frame || 0;
    data.dragLane = data.lane || 0;
    data.dragging = true;
    SpriteSpin.updateInput(e, data);
  }

  function dragEnd(e, data) {
    if (data.dragging) {
      data.dragging = false;
      SpriteSpin.resetInput(data);
    }
  }

  function drag(e, data) {
    if (!data.dragging) return;
    SpriteSpin.updateInput(e, data);

    // dont do anything if the drag distance exceeds the scroll threshold.
    // this allows to use touch scroll on mobile devices.
    if ((Math.abs(data.ddX) + Math.abs(data.ddY)) > data.scrollThreshold) {
      data.dragging = false;
      SpriteSpin.resetInput(data);
      return;
    }

    // disable touch scroll
    e.preventDefault();

    var angle = 0;
    if (typeof data.orientation === 'number') {
      angle = (Number(data.orientation) || 0) * Math.PI / 180;
    } else if (data.orientation === 'horizontal') {
      angle = 0;
    } else {
      angle = Math.PI / 2;
    }
    var sn = Math.sin(angle);
    var cs = Math.cos(angle);
    var x = ((data.nddX * cs - data.nddY * sn) * data.sense) || 0;
    var y = ((data.nddX * sn + data.nddY * cs) * (data.senseLane || data.sense)) || 0;

    // accumulate
    data.dragFrame += data.frames * x;
    data.dragLane += data.lanes * y;

    var frame = Math.floor(data.dragFrame);
    var lane = Math.floor(data.dragLane);
    SpriteSpin.updateFrame(data, frame, lane);
    SpriteSpin.stopAnimation(data);
  }

  SpriteSpin.registerModule('drag', {
    mousedown: dragStart,
    mousemove: drag,
    mouseup: dragEnd,

    documentmousemove: drag,
    documentmouseup: dragEnd,

    touchstart: dragStart,
    touchmove: drag,
    touchend: dragEnd,
    touchcancel: dragEnd
  });

  SpriteSpin.registerModule('move', {
    mousemove: function(e, data){
      dragStart.call(this, e, data);
      drag.call(this, e, data);
    },
    mouseleave: dragEnd,

    touchstart: dragStart,
    touchmove: drag,
    touchend: dragEnd,
    touchcancel: dragEnd
  });
}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));

(function ($, SpriteSpin) {
  "use strict";

  function start(e, data) {
    if (data.loading || data.dragging || !data.stage.is(':visible')) return;
    SpriteSpin.updateInput(e, data);
    data.dragging = true;
    data.animate = true;
    SpriteSpin.setAnimation(data);
  }

  function stop(e, data) {
    data.dragging = false;
    SpriteSpin.resetInput(data);
    SpriteSpin.stopAnimation(data);
  }

  function update(e, data) {
    if (!data.dragging) return;
    SpriteSpin.updateInput(e, data);

    var half, delta, target = data.target, offset = target.offset();
    if (data.orientation === "horizontal") {
      half = target.innerWidth() / 2;
      delta = (data.currentX - offset().left - half) / half;
    } else {
      half = (data.height / 2);
      delta = (data.currentY - offset().top - half) / half;
    }
    data.reverse = delta < 0;
    delta = delta < 0 ? -delta : delta;
    data.frameTime = 80 * (1 - delta) + 20;

    if (((data.orientation === 'horizontal') && (data.dX < data.dY)) ||
      ((data.orientation === 'vertical') && (data.dX < data.dY))) {
      e.preventDefault();
    }
  }

  SpriteSpin.registerModule('hold', {

    mousedown: start,
    mousemove: update,
    mouseup: stop,
    mouseleave: stop,

    touchstart: start,
    touchmove: update,
    touchend: stop,
    touchcancel: stop,

    onFrame: function () {
      $(this).spritespin("api").startAnimation();
    }
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));

(function ($, SpriteSpin) {
  "use strict";

  function init(e, data) {
    data.swipeFling = data.swipeFling || 10;
    data.swipeSnap = data.swipeSnap || 0.50;
  }

  function start(e, data) {
    if (!data.loading && !data.dragging){
      SpriteSpin.updateInput(e, data);
      data.dragging = true;
    }
  }

  function update(e, data) {
    if (!data.dragging) return;
    SpriteSpin.updateInput(e, data);
    var frame = data.frame;
    var lane = data.lane;
    SpriteSpin.updateFrame(data, frame, lane);
  }

  function end(e, data) {
    if (!data.dragging) return;
    data.dragging = false;

    var frame = data.frame;
    var lane = data.lane;
    var snap = data.swipeSnap;
    var fling = data.swipeFling;
    var dS, dF;
    if (data.orientation === "horizontal") {
      dS = data.ndX;
      dF = data.ddX;
    } else {
      dS = data.ndY;
      dF = data.ddY;
    }

    if (dS > snap || dF > fling) {
      frame = data.frame - 1;
    } else if (dS < -snap || dF < -fling) {
      frame = data.frame + 1;
    }

    SpriteSpin.resetInput(data);
    SpriteSpin.updateFrame(data, frame, lane);
    SpriteSpin.stopAnimation(data);
  }

  SpriteSpin.registerModule('swipe', {
    onLoad: init,
    mousedown: start,
    mousemove: update,
    mouseup: end,
    mouseleave: end,

    touchstart: start,
    touchmove: update,
    touchend: end,
    touchcancel: end
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));

(function ($, SpriteSpin) {
  "use strict";

  var floor = Math.floor;

  function drawSprite(data){
    var index = data.lane * data.frames + data.frame;

    var x = data.frameWidth * (index % data.framesX);
    var y = data.frameHeight * floor(index / data.framesX);

    if (data.renderer === 'canvas'){
      var w = data.canvas[0].width / data.canvasRatio;
      var h = data.canvas[0].height / data.canvasRatio;
      data.context.clearRect(0, 0, w, h);
      data.context.drawImage(data.images[0], x, y, data.frameWidth, data.frameHeight, 0, 0, w, h);
      return;
    }

    x = -floor(x * data.scaleWidth);
    y = -floor(y * data.scaleHeight);

    if (data.renderer === 'background') {
      data.stage.css({
        "background-image"    : ["url('", data.source[0], "')"].join(""),
        "background-position" : [x, "px ", y, "px"].join("")
      });
    } else {
      $(data.images).css({ top: y, left: x, "max-width" : 'initial' });
    }
  }

  function drawFrames(data){
    var index = data.lane * data.frames + data.frame;

    var img = data.images[index];
    if (data.renderer === 'canvas'){
      if (img && img.complete !== false){
        var w = data.canvas[0].width / data.canvasRatio;
        var h = data.canvas[0].height / data.canvasRatio;
        data.context.clearRect(0, 0, w, h);
        data.context.drawImage(img, 0, 0, w, h);
      }
    } else if (data.renderer === 'background') {
      data.stage.css({
        "background-image" : ["url('", data.source[index], "')"].join(""),
        "background-position" : [0, "px ", 0, "px"].join("")
      });
    } else {
      $(data.images).hide();
      $(data.images[index]).show();
    }
  }

  SpriteSpin.registerModule('360', {

    onLoad: function(e, data){
      var w, h;

      // calculate scaling if we are in responsive mode
      if (data.width && data.frameWidth) {
        data.scaleWidth = data.width / data.frameWidth;
      } else {
        data.scaleWidth = 1;
      }
      if (data.height && data.frameHeight) {
        data.scaleHeight = data.height / data.frameHeight;
      } else {
        data.scaleHeight = 1;
      }

      // assume that the source is a spritesheet, when there is only one image given
      data.sourceIsSprite = data.images.length === 1;

      // clear and enable the stage container
      data.stage.empty().css({ "background-image" : 'none' }).show();

      if (data.renderer === 'canvas')
      {
        var w = data.canvas[0].width / data.canvasRatio;
        var h = data.canvas[0].height / data.canvasRatio;
        data.context.clearRect(0, 0, w, h);
        data.canvas.show();
      }
      else if (data.renderer === 'background')
      {
        // prepare rendering frames as background images

        if (data.sourceIsSprite){
          w = floor(data.sourceWidth * data.scaleWidth);
          h = floor(data.sourceHeight * data.scaleHeight);
        } else {
          w = floor(data.frameWidth * data.scaleWidth);
          h = floor(data.frameHeight * data.scaleHeight);
        }
        var background = [w, "px ", h, "px"].join("");

        data.stage.css({
          "background-repeat"   : "no-repeat",
          // set custom background size to enable responsive rendering
          "-webkit-background-size" : background, /* Safari 3-4 Chrome 1-3 */
          "-moz-background-size"    : background, /* Firefox 3.6 */
          "-o-background-size"      : background, /* Opera 9.5 */
          "background-size"         : background  /* Chrome, Firefox 4+, IE 9+, Opera, Safari 5+ */
        });
      }
      else if (data.renderer === 'image')
      {
        // prepare rendering frames as image elements
        if (data.sourceIsSprite){
          w = floor(data.sourceWidth * data.scaleWidth);
          h = floor(data.sourceHeight * data.scaleHeight);
        } else {
          w = h = '100%';
        }
        $(data.images).appendTo(data.stage).css({
          width: w,
          height: h,
          position: 'absolute'
        });
      }
    },

    onDraw: function(e, data){
      if (data.sourceIsSprite){
        drawSprite(data);
      } else{
        drawFrames(data);
      }
    }
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));

(function ($, SpriteSpin) {
  "use strict";

  function init(e, data) {
    var scope = scopeFrom(data);
    var css = SpriteSpin.calculateInnerLayout(data);
    scope.canvas[0].width = data.width * data.canvasRatio;
    scope.canvas[0].height = data.height * data.canvasRatio;
    scope.canvas.css(css).show();
    scope.context.scale(data.canvasRatio, data.canvasRatio);
    data.target.append(scope.canvas);
  }

  function destroy(e, data) {
    var scope = scopeFrom(data)
    data.target.remove(data)
    delete data.blurScope
  }

  function onFrame(e, data) {
    var scope = scopeFrom(data);
    trackFrame(data, scope)
    if (scope.timeout == null) loop(data, scope);
  }

  function scopeFrom(data) {
    data.blurScope = data.blurScope || {};
    var scope = data.blurScope;
    scope.canvas = scope.canvas || $("<canvas class='blur-layer'></canvas>");
    scope.context = scope.context || scope.canvas[0].getContext("2d");
    scope.steps = scope.steps || [];
    scope.fadeTime = Math.max(data.blurFadeTime || 200, 1);
    scope.frameTime = Math.max(data.blurFrameTime || data.frameTime, 16);
    scope.trackTime = null;
    scope.cssBlur = !!data.blurCss;
    return scope;
  }

  function trackFrame(data, scope) {
    var d = Math.abs(data.frame - data.lastFrame); // distance between frames
    if (d >= data.frames / 2) d = data.frames - d; // get shortest distance
    scope.steps.unshift({
      index: data.lane * data.frames + data.frame,
      live: 1,
      step: scope.frameTime / scope.fadeTime,
      d: d
    });
  }

  var toRemove = []
  function removeOldFrames(frames) {
    toRemove.length = 0;
    var i;
    for (i = 0; i < frames.length; i += 1) {
      if (frames[i].alpha <= 0) toRemove.push(i);
    }
    for (i = 0; i < toRemove.length; i += 1) {
      frames.splice(toRemove[i], 1);
    }
  }

  function loop(data, scope) {
    scope.timeout = window.setTimeout(function(){
      tick(data, scope);
    }, scope.frameTime);
  }

  function killLoop(data, scope) {
    window.clearTimeout(scope.timeout);
    scope.timeout = null;
  }

  function applyCssBlur(canvas, d) {
    d = Math.min(Math.max((d / 2) - 4, 0), 1.5);
    canvas.css({
      '-webkit-filter': 'blur(' + d + 'px)',
      'filter': 'blur(' + d + 'px)'
    });
  }

  function drawFrame(data, scope, step) {
    var context = scope.context;
    var index = step.index;
    var img = (data.sourceIsSprite ? data.images[0] : data.images[index]);

    if (step.alpha <= 0) return;
    if (!img || img.complete === false) return

    context.globalAlpha = step.alpha;
    if (data.sourceIsSprite){
      var x = data.frameWidth * (index % data.framesX);
      var y = data.frameHeight * Math.floor(index / data.framesX);
      context.drawImage(img, x, y, data.frameWidth, data.frameHeight, 0, 0, data.width, data.height);
    } else {
      context.drawImage(img, 0, 0, data.width, data.height);
    }
  }

  function tick(data, scope) {
    killLoop(data, scope);
    if (!scope.context) return;

    var i, step, context = scope.context, d = 0;
    context.clearRect(0, 0, data.width, data.height);
    for (i = 0; i < scope.steps.length; i += 1) {
      step = scope.steps[i];
      step.live = Math.max(step.live - step.step, 0);
      step.alpha = Math.max(step.live - 0.25, 0);
      drawFrame(data, scope, step);
      d += step.alpha + step.d;
    }
    if (scope.cssBlur) {
      applyCssBlur(scope.canvas, d)
    }
    removeOldFrames(scope.steps);
    if (scope.steps.length) {
      loop(data, scope);
    }
  }

  SpriteSpin.registerModule('blur', {
    onLoad: init,
    onFrameChanged: onFrame
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));

(function ($, SpriteSpin) {
  "use strict";

  var max = Math.max
  var min = Math.min

  function init(e, data){
    data.easeAbortAfterMs = max(data.easeAbortAfterMs || 250, 0);
    data.easeDamping = max(min(data.easeDamping || 0.9, 0.999), 0);
    data.easeSamples = max(data.easeSamples || 5, 1);
    data.easeUpdateTime = max(data.easeUpdateTime || data.frameTime, 16);
    data.easeScope = { samples: [], steps: [] };
  }

  function update(e, data) {
    if (data.dragging) {
      killLoop(data, data.easeScope);
      sampleInput(data, data.easeScope);
    }
  }

  function end(e, data) {
    var ease = data.easeScope;

    var last, sample, samples = ease.samples;
    var lanes = 0, frames = 0, time = 0;

    for(var i = 0; i < samples.length; i += 1) {
      sample = samples[i];

      if (!last) {
        last = sample;
        continue
      }

      var dt = sample.time - last.time;
      if (dt > data.easeAbortAfterMs) {
        lanes = frames = time = 0;
        return killLoop(data, ease);
      }

      frames += sample.frame - last.frame;
      lanes += sample.lane - last.lane;
      time += dt;
      last = sample;
    }
    samples.length = 0;
    if (!time) {
      return
    }

    ease.ms = data.easeUpdateTime;

    ease.lane = data.lane;
    ease.lanes = 0;
    ease.laneStep = lanes / time * ease.ms;

    ease.frame = data.frame;
    ease.frames = 0;
    ease.frameStep = frames / time * ease.ms;

    loop(data, ease);
  }

  function sampleInput(data, ease) {
    // add a new sample
    ease.samples.push({
      time: new Date().getTime(),
      frame: data.dragFrame,
      lane: data.dragLane
    });
    // drop old samples
    while (ease.samples.length > data.easeSamples) {
      ease.samples.shift();
    }
  }

  function killLoop(data, ease) {
    if (ease.timeout != null) {
      window.clearTimeout(ease.timeout);
      ease.timeout = null;
    }
  }

  function loop(data, ease) {
    ease.timeout = window.setTimeout(function(){
      tick(data, ease);
    }, ease.ms);
  }

  function tick(data, ease){
    ease.lanes += ease.laneStep;
    ease.frames += ease.frameStep;
    ease.laneStep *= data.easeDamping;
    ease.frameStep *= data.easeDamping;
    var frame = Math.floor(ease.frame + ease.frames);
    var lane = Math.floor(ease.lane + ease.lanes);

    SpriteSpin.updateFrame(data, frame, lane);
    if (data.dragging) {
      killLoop(data, ease);
    } else if (Math.abs(ease.frameStep) > 0.005 || Math.abs(ease.laneStep) > 0.005) {
      loop(data, ease);
    } else {
      killLoop(data, ease);
    }
  }

  SpriteSpin.registerModule('ease', {
    onLoad: init,

    mousemove: update,
    mouseup: end,
    mouseleave: end,

    touchmove: update,
    touchend: end,
    touchcancel: end
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));

(function ($, SpriteSpin) {
  "use strict";

  function load(e, data){
    data.galleryImages = [];
    data.galleryOffsets = [];
    data.gallerySpeed = 500;
    data.galleryOpacity = 0.25;
    data.galleryFrame = 0;
    data.galleryStage = data.galleryStage || $('<div/>');
    data.stage.prepend(data.galleryStage);
    data.galleryStage.empty();

    var size = 0, i;
    for(i = 0; i < data.source.length; i+= 1){
      var img = $("<img src='" + data.source[i] + "'/>");
      data.galleryStage.append(img);
      data.galleryImages.push(img);
      var scale = data.height / img[0].height;
      data.galleryOffsets.push(-size + (data.width - img[0].width * scale) / 2);
      size += data.width;
      img.css({
        "max-width" : 'initial',
        opacity : data.galleryOpacity,
        width: data.width,
        height: data.height
      });
    }
    var css = SpriteSpin.calculateInnerLayout(data);
    data.galleryStage.css(css).css({
      width: size
    });
    data.galleryImages[data.galleryFrame].animate({
      opacity : 1
    }, data.gallerySpeed);
  }

  function draw(e, data){
    if (data.galleryFrame !== data.frame && !data.dragging){
      data.galleryStage.stop(true, false);
      data.galleryStage.animate({
        "left" : data.galleryOffsets[data.frame]
      }, data.gallerySpeed);

      data.galleryImages[data.galleryFrame].animate({ opacity : data.galleryOpacity }, data.gallerySpeed);
      data.galleryFrame = data.frame;
      data.galleryImages[data.galleryFrame].animate({ opacity : 1 }, data.gallerySpeed);
    } else if (data.dragging || data.dX != data.gallerydX) {
      data.galleryDX = data.DX;
      data.galleryDDX = data.DDX;
      data.galleryStage.stop(true, true).animate({
        "left" : data.galleryOffsets[data.frame] + data.dX
      });
    }
  }

  SpriteSpin.registerModule('gallery', {
    onLoad: load,
    onDraw: draw
  });
}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));
(function ($, SpriteSpin) {
  "use strict";

  var floor = Math.floor;

  SpriteSpin.registerModule('panorama', {

    onLoad: function(e, data){
      data.stage.empty().show();
      data.frames = data.sourceWidth;
      if (data.orientation === "horizontal"){
        data.scale = data.height / data.sourceHeight;
        data.frames = data.sourceWidth;
      } else {
        data.scale = data.width / data.sourceWidth;
        data.frames = data.sourceHeight;
      }
      var w = floor(data.sourceWidth * data.scale);
      var h = floor(data.sourceHeight * data.scale);
      var background = [w, "px ", h, "px"].join("");
      data.stage.css({
        "max-width"               : 'initial',
        "background-image"        : ["url('", data.source[0], "')"].join(""),
        "background-repeat"       : "repeat-both",
        // set custom background size to enable responsive rendering
        "-webkit-background-size" : background, /* Safari 3-4 Chrome 1-3 */
        "-moz-background-size"    : background, /* Firefox 3.6 */
        "-o-background-size"      : background, /* Opera 9.5 */
        "background-size"         : background  /* Chrome, Firefox 4+, IE 9+, Opera, Safari 5+ */
      });
    },

    onDraw: function(e, data){
      var x = 0, y = 0;
      if (data.orientation === "horizontal"){
        x = -floor((data.frame % data.frames) * data.scale);
      } else {
        y = -floor((data.frame % data.frames) * data.scale);
      }
      data.stage.css({
        "background-position" : [x, "px ", y, "px"].join("")
      });
    }
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));
(function ($, SpriteSpin) {
  "use strict";

  function onCreate(e, data) {
    if (data.zoomStage) return
    data.zoomStage = $("<div class='spritezoom-stage'></div>")
      .css({
        width    : '100%',
        height   : '100%',
        top      : 0,
        left     : 0,
        bottom   : 0,
        right    : 0,
        position : 'absolute'
      }).appendTo(data.target).hide();
  }

  function onDestroy(e, data) {
    if (!data.zoomStage) return
    data.zoomStage.remove()
  }

  function updateInput(e, data){
    e.preventDefault();

    // hack into drag/move module and disable dragging
    // prevents frame change during zoom mode
    data.dragging = false;

    // access touch points from original event
    if (!e.touches && e.originalEvent){
      e.touches = e.originalEvent.touches;
    }

    // grab touch/cursor position
    var x, y, dx, dy;
    if (e.touches && e.touches.length){
      x = e.touches[0].clientX || 0;
      y = e.touches[0].clientY || 0;
    } else {
      x = e.clientX || 0;
      y = e.clientY || 0;
    }

    // normalize cursor position into [0:1] range
    x /= data.width;
    y /= data.height;

    if (data.zoomPX == null){
      data.zoomPX = x;
      data.zoomPY = y;
    }
    if (data.zoomX == null){
      data.zoomX = x;
      data.zoomY = y;
    }

    // calculate move delta since last frame and remember current position
    dx = x - data.zoomPX;
    dy = y - data.zoomPY;
    data.zoomPX = x;
    data.zoomPY = y;

    // invert drag direction for touch events to enable 'natural' scrolling
    if (e.type.match(/touch/)){
      dx = -dx;
      dy = -dy;
    }

    // accumulate display coordinates
    data.zoomX = SpriteSpin.clamp(data.zoomX + dx, 0, 1);
    data.zoomY = SpriteSpin.clamp(data.zoomY + dy, 0, 1);

    SpriteSpin.updateFrame(data);
  }

  function onDraw(e, data) {
    // calculate the frame index
    var index = data.lane * data.frames + data.frame;

    // get the zoom image. Use original frames as fallback. This won't work for spritesheets
    var source = (data.zoomSource || data.source)[index];
    if (!source) {
      $.error("'zoomSource' option is missing or it contains unsufficient number of frames.")
      return;
    }

    // get display position
    var x = data.zoomX;
    var y = data.zoomY;
    // fallback to centered position
    if (x == null || y == null){
      x = data.zoomX = 0.5;
      y = data.zoomY = 0.5;
    }
    // scale up from [0:1] to [0:100] range
    x = (x * 100)|0;
    y = (y * 100)|0;
    // update background image and position
    data.zoomStage.css({
      "background-repeat"   : "no-repeat",
      "background-image"    : ["url('", source, "')"].join(""),
      "background-position" : [x, "% ", y, "%"].join("")
    });
  }

  function onClick(e, data){
    e.preventDefault();

    // simulate double click

    var clickTime = new Date().getTime();
    if (!data.zoomClickTime) {
      data.zoomClickTime = clickTime;
      return;
    }

    var timeDelta = clickTime - data.zoomClickTime;
    var doubleClickTime = data.zoomDoubleClickTime || 500;
    if(timeDelta > doubleClickTime) {
      data.zoomClickTime = clickTime;
      return;
    }

    data.zoomClickTime = 0;
    if ($(this).spritespin('api').toggleZoom()){
      updateInput(e, data);
    }
  }

  function onMove(e, data){
    if (!data.zoomStage.is(':visible')) return;
    updateInput(e, data);
  }

  function toggleZoom(){
    var data = this.data;
    if (!data.zoomStage){
      $.error('zoom module is not initialized or is not available.');
      return false;
    }
    if (data.zoomStage.is(':visible')){
      data.zoomStage.fadeOut();
      data.stage.fadeIn();
    } else {
      data.zoomStage.fadeIn();
      data.stage.fadeOut();
      return true;
    }
    return false;
  }

  SpriteSpin.registerModule('zoom', {
    mousedown: onClick,
    touchstart: onClick,
    mousemove: onMove,
    touchmove: onMove,

    onInit: onCreate,
    onDestroy: onDestroy,
    onDraw: onDraw
  });

  SpriteSpin.extendApi({
    toggleZoom: toggleZoom
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));
