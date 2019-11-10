/*! SpriteSpin - v3.1.5
* Copyright (c) 2014 ; Licensed  */

(function($) {
  "use strict";

  // The SpriteSpin object. This object wraps the core logic of SpriteSpin
  var Spin = window.SpriteSpin = {};

  // The namespace that is used for data storage and events
  var name = Spin.namespace = 'spritespin';

  // Event names that are recognized by SpriteSpin. A module may implement any of these and they will be bound
  // to the target element on which the plugin is called.
  var modEvents = [
    'mousedown', 'mousemove', 'mouseup', 'mouseenter', 'mouseover', 'mouseleave', 'dblclick',
    'touchstart', 'touchmove', 'touchend', 'touchcancel',
    'selectstart', 'gesturestart', 'gesturechange', 'gestureend'];

  // Collection of modules that can be used to extend the functionality of SpriteSpin.
  Spin.mods = {};

  // Default set of SpriteSpin options. This also represents the majority of data attributes that are used during the
  // lifetime of a SpriteSpin instance. The data is stored inside the target DOM element on which the plugin is called.
  Spin.defaults = {
    source            : undefined,    // Stitched source image or array of files
    width             : undefined,    // actual display width
    height            : undefined,    // actual display height
    frames            : undefined,    // Total number of frames
    framesX           : undefined,    // Number of frames in one row of sprite sheet (if source is a spritesheet)
    lanes             : 1,

    module            : '360',        // The presentation module to use
    behavior          : 'drag',       // The interaction module to use
    renderer          : 'canvas',     // The rendering mode to use

    lane              : 0,            //
    frame             : 0,            // Initial (and current) frame number
    frameTime         : 40,           // Time between updates. Set to 40 which is 25 frames per second
    animate           : true,         // Runs animation
    reverse           : false,        // If true animation is played backward
    loop              : true,         // Loops the animation
    stopFrame         : 0,            // Stops the animation at this frame if loop is disabled

    wrap              : true,         // Same as 'loop' but for user interaction
    wrapLane          : false,        //
    sense             : 1,            // Interaction sensitivity used by behavior implementations
    senseLane         : undefined,    // Interaction sensitivity used by behavior implementations
    orientation       : 'horizontal', //

    onInit            : undefined,    // Occurs when plugin has been initialized, but before loading the source files
    onProgress        : undefined,    // Occurs when any source file has been loaded
    onLoad            : undefined,    // Occurs when all source files have been loaded
    onFrame           : undefined,    // Occurs when the frame number has been updated (e.g. during animation)
    onDraw            : undefined     // Occurs when all update is complete and frame can be drawn
  };

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

  function wrap(value, min, max, size){
    while (value > max){ value -= size; }
    while (value < min){ value += size; }
    return value;
  }

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
      target.bind(event + '.' + name, func);
    }
  }

  // Unbinds all SpriteSpin events from given target element
  function unbind(target){
    target.unbind('.' + name);
  }

  // Loads a set of image files. Yields the progress and the completion of the load operation.
  function load(opts){
    // convert opts.source to an array of strings
    var src = (typeof opts.source === 'string') ? [opts.source] : opts.source;
    var i, count = 0, img, images = [];
    var tick = function(){
      count += 1;
      if (typeof opts.progress === 'function'){
        opts.progress({
          loaded: count,
          total: src.length,
          percent: Math.round((count / src.length) * 100)
        });
      }
      if (count === images.length && typeof opts.complete === 'function') {
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
  }

  // taken from https://github.com/stomita/ios-imagefile-megapixel
  function detectSubsampling(img, size) {
    var iw = (size || img).width;
    var ih = (size || img).height;
    var canvas, context;
    // subsampling may happen over megapixel image
    if (iw * ih > 1024 * 1024) {
      canvas = document.createElement('canvas');
      if (!canvas || !canvas.getContext || !canvas.getContext('2d')){
        return false;
      }
      canvas.width = canvas.height = 1;
      context = canvas.getContext('2d');
      context.fillStyle = "FF00FF";
      context.fillRect(0, 0, 1, 1);
      context.drawImage(img, -iw + 1, 0);
      // subsampled image becomes half smaller in rendering size.
      // check color value to confirm image is covering edge pixel or not.
      // if color is the magenta color as set by the rectangle before the image was drawn, the image is subsampled
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
    return false;
  }

  function naturalSize(image){
    var img = new Image();
    img.src = image.src;
    return { width: img.width, height: img.height };
  }

  // Public Helper Functions
  // ----------

  // Generates an array of source strings
  // - path is a source string where the frame number of the file name is exposed as '{frame}'
  // - start indicates the first frame number
  // - end indicates the last frame number
  // - digits is the number of digits used in the file name for the frame number
  //
  // example:
  //      sourceArray('http://example.com/image_{frame}.jpg, { frame: [1, 3], digits: 2 })
  //      // -> [ 'http://example.com/image_01.jpg', 'http://example.com/image_02.jpg', 'http://example.com/image_03.jpg' ]
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

  // Measures the image frames that are used in the given data object
  Spin.measureSource = function(data){
    var img = data.images[0];
    var size = naturalSize(img);

    if (data.images.length === 1){

      data.sourceWidth = size.width;
      data.sourceHeight = size.height;
      if (detectSubsampling(img, size)){
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

  // Resets the input state of the SpriteSpin data.
  Spin.resetInput = function(data){
    data.startX = data.startY = undefined;      // initial touch/click position
    data.currentX = data.currentY = undefined;  // touch/click position in current frame
    data.oldX = data.oldY = undefined;          // touch/click position in last frame
    data.dX = data.dY = data.dW = 0;            // drag direction from start to current frame
    data.ddX = data.ddY = data.ddW = 0;         // drag direction from previous to current frame
  };

  // Updates the input state of the SpriteSpin data using the given mouse or touch event.
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
      data.currentX = e.touches[0].clientX;
      data.currentY = e.touches[0].clientY;
    } else {
      data.currentX = e.clientX;
      data.currentY = e.clientY;
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

    data.ndX = data.dX / data.width;
    data.ndY = data.dY / data.height;

    data.nddX = data.ddX / data.width;
    data.nddY = data.ddY / data.height;
  };

  // Updates the frame number of the SpriteSpin data. Performs an auto increment if no frame number is given.
  Spin.updateFrame = function(data, frame, lane){

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
        data.animate = false;
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
      data.lane = clamp(data.lane, 0, data.lanes - 1);
    }

    data.target.trigger("onFrame", data);
    data.target.trigger("onDraw", data);
  };

  // Stops the running animation on given SpriteSpin data.
  Spin.stopAnimation = function(data){
    if (data.animation){
      window.clearInterval(data.animation);
      data.animation = null;
    }
  };

  // Starts animation on given SpriteSpin data if animation is enabled.
  Spin.setAnimation = function(data){
    Spin.stopAnimation(data);
    if (data.animate){
      data.animation = window.setInterval(function(){
        try {
          Spin.updateFrame(data);
        } catch(ignore){
          // The try catch block is a hack for Opera Browser
          // Opera sometimes rises an exception here and
          // stops performing the script
        }
      }, data.frameTime);
    }
  };

  // Reads the module names on given SpriteSpin data and adds actual module implementations.
  Spin.setModules = function(data){
    var i, name, mod;
    for(i = 0; i < data.mods.length; i += 1){
      name = data.mods[i];
      if (typeof name === 'string'){
        mod = Spin.mods[name];
        if (!mod){
          $.error("No module found with name " + name);
        } else {
          data.mods[i] = mod;
        }
      }
    }
  };

  // Applies css attributes to layout the SpriteSpin containers.
  Spin.setLayout = function(data){
    // disable selection
    data.target
      .attr('unselectable', 'on')
      .css({
        '-ms-user-select': 'none',
        '-moz-user-select': 'none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        'user-select': 'none'
      });

    var w = Math.floor(data.width || data.frameWidth || data.target.innerWidth());
    var h = Math.floor(data.height || data.frameHeight || data.target.innerHeight());
    data.target.css({
      width    : w,
      height   : h,
      position : 'relative',
      overflow : 'hidden'
    });

    var css = {
      width    : '100%',
      height   : '100%',
      top      : 0,
      left     : 0,
      bottom   : 0,
      right    : 0,
      position : 'absolute'
    };
    data.stage.css(css).hide();
    if (data.canvas){
      data.canvas[0].width = w;
      data.canvas[0].height = h;
      data.canvas.css(css).hide();
    }
  };

  // Binds all SpriteSpin events on the target element of the given SpriteSpin data.
  Spin.setEvents = function(data){
    var i, j, mod, target = data.target;

    // Clear all SpriteSpin events on the target element
    unbind(target);

    // disable all default browser behavior on the following events
    for (j = 0; j < modEvents.length; j += 1){
      bind(target, modEvents[j],  prevent);
    }

    // Bind module functions to SpriteSpin events
    for (i = 0; i < data.mods.length; i += 1){
      mod = data.mods[i];

      for (j = 0; j < modEvents.length; j += 1){
        bind(target, modEvents[j],  mod[modEvents[j]]);
      }

      // bind
      bind(target, 'onInit',  mod.onInit);
      bind(target, 'onLoad',  mod.onLoad);
      bind(target, 'onFrame', mod.onFrame);
      bind(target, 'onDraw',  mod.onDraw);
    }

    // bind auto start function to load event.
    bind(target, 'onLoad', function(e, data){
      Spin.setAnimation(data);
    });

    // bind all user events that have been passed on initialization
    bind(target, 'onInit',     data.onInit);
    bind(target, 'onProgress', data.onProgress);
    bind(target, 'onLoad',     data.onLoad);
    bind(target, 'onFrame',    data.onFrame);
    bind(target, 'onDraw',     data.onDraw);
  };

  // Performs the first time boot process: module initialization, layouting, event binding etc.
  Spin.boot = function(data){
    Spin.setModules(data);
    Spin.setLayout(data);
    Spin.setEvents(data);
    data.target.addClass('loading').trigger('onInit', data);
    load({
      source: data.source,
      progress: function(progress){
        data.target.trigger('onProgress', progress);
      },
      complete: function(images){
        data.images = images;
        Spin.measureSource(data);
        data.stage.show();
        data.target
          .removeClass('loading')
          .trigger('onLoad', data)
          .trigger('onFrame', data)
          .trigger('onDraw', data);
      }
    });
  };


  // SpriteSpin constructor
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
    } else {
      // just update the data object
      $.extend(data, options);
    }

    // convert string source to array of strings
    if (typeof data.source === 'string'){
      data.source = [data.source];
    }

    // behavior and module attributes tell us what additional modules must be loaded.
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

  Spin.destroy = function(data){
    if (data){
      Spin.stopAnimation(data);
      unbind(data.target);
      data.target.removeData(name);
    }
  };

  // Helper method to register a module as an available extension to SpriteSpin.
  // Use this to add custom Rendering or Updateing modules that can be addressed with the
  // 'module' option.
  Spin.registerModule = function(name, module){
    if (Spin.mods[name]){
      $.error('Module name is already taken: ' + name);
    }
    module = module || {};
    Spin.mods[name] = module;
    return module;
  };

  // Api constructor
  Spin.Api = function(data){
    this.data = data;
  };

  // Helper method that allows to extend the api with more methods.
  // Receives an object with named functions that are extensions to the API.
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

  // Expose the spritespin method to jquery
  // Receives an object with initialization options or a method name
  // The name can be one of [data|api].
  $.fn.spritespin = function(obj) {
    if (obj === "data"){
      return this.data(name);
    }
    if (obj === "api"){
      return new Spin.Api(this.data(name));
    }
    if (obj === "destroy"){
      return $(this).each(function(){
        Spin.destroy($(this).data(name));
      });
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

(function ($, SpriteSpin) {
  "use strict";

  function click(e) {
    var $this = $(this), data = $this.data('spritespin');

    SpriteSpin.updateInput(e, data);

    var half, pos;
    if (data.orientation === "horizontal") {
      half = data.target.innerWidth() / 2;
      pos = data.currentX - data.target.offset().left;
    } else {
      half = data.target.innerHeight() / 2;
      pos = data.currentY - data.target.offset().top;
    }
    if (pos > half) {
      $this.spritespin("next");
    } else {
      $this.spritespin("prev");
    }
  }

  SpriteSpin.registerModule('click', {
    mouseup: click,
    touchend: click
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));
(function ($, SpriteSpin) {
  "use strict";

  function dragStart(e) {
    var data = $(this).spritespin('data');
    SpriteSpin.updateInput(e, data);
    data.dragging = true;
  }

  function dragEnd() {
    var $this = $(this), data = $this.spritespin('data');
    SpriteSpin.resetInput(data);
    data.dragging = false;
  }

  function drag(e) {
    var dFrame, dLane, lane, frame, $this = $(this), data = $this.spritespin('data');
    if (data.dragging) {
      SpriteSpin.updateInput(e, data);

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
      var x = data.ndX * cs - data.ndY * sn;
      var y = data.ndX * sn + data.ndY * cs;

      dFrame = x * data.frames * data.sense;
      dLane = y * data.lanes * (data.senseLane || data.sense);

      frame = Math.floor(data.clickframe + dFrame);
      lane = Math.floor(data.clicklane + dLane);
      SpriteSpin.updateFrame(data, frame, lane);
      data.animate = false;
      SpriteSpin.stopAnimation(data);
    }
  }

  SpriteSpin.registerModule('drag', {
    mousedown: dragStart,
    mousemove: drag,
    mouseup: dragEnd,
    mouseleave: dragEnd,

    touchstart: dragStart,
    touchmove: drag,
    touchend: dragEnd,
    touchcancel: dragEnd
  });

  SpriteSpin.registerModule('move', {
    mousemove: function(e){
      dragStart.call(this, e);
      drag.call(this, e);
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

  function startAnimation(e) {
    var $this = $(this), data = $this.spritespin('data');
    SpriteSpin.updateInput(e, data);
    data.onDrag = true;
    $this.spritespin("animate", true);
  }

  function stopAnimation(e) {
    var $this = $(this), data = $this.spritespin('data');
    SpriteSpin.resetInput(data);
    data.onDrag = false;
    $this.spritespin("animate", false);
  }

  function updateInput(e) {
    var $this = $(this), data = $this.spritespin('data');

    if (data.onDrag) {
      SpriteSpin.updateInput(e, data);

      var half, delta;
      if (data.orientation === "horizontal") {
        half = (data.target.innerWidth() / 2);
        delta = (data.currentX - data.target.offset().left - half) / half;
      } else {
        half = (data.height / 2);
        delta = (data.currentY - data.target.offset().top - half) / half;
      }
      data.reverse = delta < 0;
      delta = delta < 0 ? -delta : delta;
      data.frameTime = 80 * (1 - delta) + 20;
    }
  }

  SpriteSpin.registerModule('hold', {

    mousedown: startAnimation,
    mousemove: updateInput,
    mouseup: stopAnimation,
    mouseleave: stopAnimation,

    touchstart: startAnimation,
    touchmove: updateInput,
    touchend: stopAnimation,
    touchcancel: stopAnimation,

    onFrame: function () {
      var $this = $(this);
      $this.spritespin("animate", true);
    }
  });

}(window.jQuery || window.Zepto || window.$, window.SpriteSpin));
(function ($, SpriteSpin) {
  "use strict";

  function dragStart(e) {
    var $this = $(this), data = $this.spritespin('data');
    SpriteSpin.updateInput(e, data);
    data.onDrag = true;
  }

  function dragEnd() {
    var $this = $(this), data = $this.spritespin('data');
    data.onDrag = false;
    SpriteSpin.resetInput(data);
  }

  function drag(e) {
    var $this = $(this), data = $this.spritespin('data');
    if (data.onDrag) {
      SpriteSpin.updateInput(e, data);

      var frame = data.frame;
      var snap = data.snap || 0.25;
      var d, s;

      if (data.orientation === "horizontal") {
        d = data.dX;
        s = data.target.innerWidth() * snap;
      } else {
        d = data.dY;
        s = data.target.innerHeight() * snap;
      }

      if (d > s) {
        frame = data.frame - 1;
        data.onDrag = false;
      } else if (d < -s) {
        frame = data.frame + 1;
        data.onDrag = false;
      }

      $this.spritespin("update", frame);  // update to frame
      $this.spritespin("animate", false); // stop animation
    }
  }

  SpriteSpin.registerModule('swipe', {
    mousedown: dragStart,
    mousemove: drag,
    mouseup: dragEnd,
    mouseleave: dragEnd,

    touchstart: dragStart,
    touchmove: drag,
    touchend: dragEnd,
    touchcancel: dragEnd
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
      data.context.clearRect(0, 0, data.width, data.height);
      data.context.drawImage(data.images[0], x, y, data.frameWidth, data.frameHeight, 0, 0, data.width, data.height);
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
      $(data.images).css({ top: y, left: x });
    }
  }

  function drawFrames(data){
    var index = data.lane * data.frames + data.frame;
    if (data.renderer === 'canvas'){
      data.context.clearRect(0, 0, data.width, data.height);
      data.context.drawImage(data.images[index], 0, 0, data.width, data.height);
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
      data.scaleWidth = data.width / data.frameWidth;
      data.scaleHeight = data.height / data.frameHeight;

      // assume that the source is a spritesheet, when there is only one image given
      data.sourceIsSprite = data.images.length === 1;

      // clear and enable the stage container
      data.stage.empty().css({ "background-image" : 'none' }).show();

      if (data.renderer === 'canvas')
      {
        // prepare rendering to canvas
        // clear and enable the canvas container
        data.context.clearRect(0, 0, data.width, data.height);
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
(function($) {
  "use strict";

  var Module = window.SpriteSpin.mods.gallery = {};

  Module.onLoad = function(e, data){
    data.images = [];
    data.offsets = [];
    data.stage.empty();
    data.speed = 500;
    data.opacity = 0.25;
    data.oldFrame = 0;
    var size = 0, i;
    for(i = 0; i < data.source.length; i+= 1){
      var img = $("<img src='" + data.source[i] + "'/>");
      data.stage.append(img);
      data.images.push(img);
      data.offsets.push(-size + (data.width - img[0].width) / 2);
      size += img[0].width;
      
      img.css({ opacity : 0.25 });
    }
    data.stage.css({ width : size });
    data.images[data.oldFrame].animate({ opacity : 1 }, data.speed);
  };
  
  Module.onDraw = function(e, data){
    if ((data.oldFrame !== data.frame) && data.offsets){
      data.stage.stop(true, false);
      data.stage.animate({ 
        "left" : data.offsets[data.frame]
      }, data.speed);
      
      data.images[data.oldFrame].animate({ opacity : data.opacity }, data.speed);
      data.oldFrame = data.frame;
      data.images[data.oldFrame].animate({ opacity : 1 }, data.speed);
    } else {
      //console.log(data.dX);
      data.stage.css({
        "left" : data.offsets[data.frame] + data.dX
      });
    }
  };
  
  Module.resetInput = function(e, data){
    if (!data.onDrag){
      data.stage.animate({
        "left" : data.offsets[data.frame]
      });
    }
  };
}(window.jQuery || window.Zepto || window.$));
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
        "background-image"        : ["url('", data.source[0], "')"].join(""),
        "background-repeat"       : "repeat-both",
        // set custom background size to enable responsive rendering
        "-webkit-background-size" : background, /* Safari 3-4 Chrome 1-3 */
        "-moz-background-size"    : background, /* Firefox 3.6 */
        "-o-background-size"      : background, /* Opera 9.5 */
        "background-size"         : background  /* Chrome, Firefox 4+, IE 9+, Opera, Safari 5+ */
      });
    },

    // The function was stripped to do only necessary CSS updates
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