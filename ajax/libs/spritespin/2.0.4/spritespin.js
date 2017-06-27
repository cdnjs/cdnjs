(function () {
  var Loader = this.SpriteLoader = {};
  Loader.preload = function(images, callback){
    if (typeof (images) === "string") { images = [images]; }
    var i, data = {
      callback : callback,
      numLoaded: 0,
      numImages: images.length,
      images   : []
    };
    for (i = 0; i < images.length; i += 1 ) {
      Loader.load(images[i], data); 
    }
  };
  Loader.load = function(imageSource, data){
    var image = new Image();
    data.images.push(image);
    image.onload = function(){
      data.numLoaded += 1;
      if (data.numLoaded === data.numImages) { 
        data.callback(data.images); 
      }
    }; 
    image.src = imageSource;
  };
}());
(function($, window) {
  var Spin = window.SpriteSpin = {};
  var api = Spin.api = {};
  Spin.modules = {};
  Spin.behaviors = {};
	  
  Spin.disableSelection = function(e){
    e.attr('unselectable', 'on')
     .css({
        "-moz-user-select": "none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none",
        "user-select": 'none'
     })
     .on('selectstart', false);
    return e;
  };

  Spin.updateInput = function(e, data){
    if (e.touches === undefined && e.originalEvent !== undefined){
      // jQuery Event normalization does not preserve the 'event.touches'
      // try to grab touches from the original event
      e.touches = e.originalEvent.touches;
    }
    
    data.oldX = data.currentX;
    data.oldY = data.currentY;
    
    if (e.touches !== undefined && e.touches.length > 0){
      data.currentX = e.touches[0].clientX;
      data.currentY = e.touches[0].clientY;
    } else {
      data.currentX = e.clientX;
      data.currentY = e.clientY;
    }
    
    if (data.startX === undefined || data.startY === undefined){
      data.startX = data.currentX;
      data.startY = data.currentY;
      data.clickframe = data.frame;
    }
    
    if (data.oldX === undefined || data.oldY === undefined){
      data.oldX = data.currentX;
      data.oldY = data.currentY;
    }
    
    // total drag distance
    data.dX = data.currentX - data.startX;
    data.dY = data.currentY - data.startY;
    data.dW = data.dX * data.dragDirX + data.dY * data.dragDirY;
    
    // frame drag distance
    data.ddX = data.currentX - data.oldX;
    data.ddY = data.currentY - data.oldY;
    data.ddW = data.ddX * data.dragDirX + data.ddY * data.dragDirY;
    
    return false;
  };
  
  Spin.resetInput = function(data){
    // initial touch or click position
    data.startX = undefined;
    data.startY = undefined;
    // touch or click position in current frame
    data.currentX = undefined;
    data.currentY = undefined;
    // touch or click position in last frame
    data.oldX = undefined;
    data.oldY = undefined;
    // total drag distance, respecting the start position
    data.dX = 0;
    data.dY = 0;
    data.dW = 0;
    // total drag distance, respecting the last frame position
    data.ddX = 0;
    data.ddY = 0;
    data.ddW = 0;
    
    if (typeof(data.module.resetInput) === "function"){
      data.module.resetInput(data);
    }
  };
  
  Spin.clamp = function(value, min, max){ 
    return (value > max ? max : (value < min ? min : value));
  };
  
  Spin.wrap = function(value, min, max, size){
    while (value > max){ value -= size; } 
    while (value < min){ value += size; }
    return value;
  };
  
  Spin.reload = function(data, andInit){
    if (andInit && data.module.initialize){
      data.module.initialize(data);
    }
    
    Spin.prepareBackground(data);
    Spin.preloadImages(data, function(){
      Spin.rebindEvents(data);
      data.module.reload(data);
      data.target.trigger("onLoad", data);
    });
  };
  
  Spin.preloadImages = function(data, callback) {
    data.preload.fadeIn(250, function(){
      SpriteLoader.preload(data.source, function(images){
        data.preload.fadeOut(250, function() {
            data.preload.hide();
        });
        data.stage.show();
        if (data.canvas){
          data.canvas.show();
        }
        data.images = images;
        callback.apply(data.target, [data]);
      });
    });
  };
  
  Spin.prepareBackground = function(data){
    var w = [data.width, "px"].join("");
    var h = [data.height, "px"].join("");
    
    data.target.css({ 
      width    : w, 
      height   : h,
      position : "relative"
    });
    
    var css = {
      width    : w, 
      height   : h,
      top      : "0px", 
      left     : "0px",
      position : "absolute"  
    };
    $.extend(css, data.preloadCSS || {});
    data.preload.css(css).html(data.preloadHtml || "").hide();
    
    data.stage.css({
      width    : w, 
      height   : h,
      top      : "0px", 
      left     : "0px",
      position : "absolute"
    }).hide();
    
    if (data.canvas){
      data.canvas[0].width = data.width;
      data.canvas[0].height = data.height;      
      data.canvas.css({
        width    : w, 
        height   : h,
        top      : "0px", 
        left     : "0px",
        position : "absolute"
      }).hide();
    }
  };
  
  Spin.draw = function(data){
    data.module.draw(data);
  };
  
  Spin.rebindEvents = function(data){
    var target = data.target;
    // unbind all events
    target.unbind('.spritespin');
  
    // use custom or build in behavior
    var beh = data.behavior;
    if (typeof(data.behavior) === "string"){
      beh = Spin.behaviors[data.behavior];
    }
    beh = beh || {};
    
    var prevent = function(e){
      if (e.cancelable){ e.preventDefault(); }
      return false;
    };
    
    // rebind interaction events
    target.bind('mousedown.spritespin',  beh.mousedown  || $.noop);
    target.bind('mousemove.spritespin',  beh.mousemove  || $.noop);
    target.bind('mouseup.spritespin',    beh.mouseup    || $.noop);
    target.bind('mouseenter.spritespin', beh.mouseenter || $.noop);
    target.bind('mouseover.spritespin',  beh.mouseover  || $.noop);
    target.bind('mouseleave.spritespin', beh.mouseleave || $.noop);
    target.bind('dblclick.spritespin',   beh.dblclick   || $.noop);
    target.bind('onFrame.spritespin',    beh.onFrame    || $.noop);
  
    if (data.touchable){
      target.bind('touchstart.spritespin',  beh.mousedown  || $.noop);
      target.bind('touchmove.spritespin',   beh.mousemove  || $.noop);
      target.bind('touchend.spritespin',    beh.mouseup    || $.noop); 
      target.bind('touchcancel.spritespin', beh.mouseleave || $.noop);
      target.bind('click.spritespin',         prevent); 
      target.bind('gesturestart.spritespin',  prevent); 
      target.bind('gesturechange.spritespin', prevent); 
      target.bind('gestureend.spritespin',    prevent); 
    }
            
    // disable selection
	  target.bind("mousedown.spritespin selectstart.spritespin", prevent);

	  target.bind("onFrame.spritespin", function(event, data){
	    Spin.draw(data);
	  });
	  target.bind("onLoad.spritespin", function(event, data){
	    data.target.spritespin("animate", data.animate, data.loop);
	  });
	  
	  // bind custom events
	  if (typeof(data.onFrame) === "function"){
	    target.bind("onFrame.spritespin", data.onFrame);
	  }
	  if (typeof(data.onLoad) === "function"){
	    target.bind("onLoad.spritespin", data.onLoad);
	  }
  };
	
  $.fn.spritespin = function(method) {
    if ( api[method] ) {
      return api[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }
    if (typeof(method) === 'object' || !method) {
      return api.init.apply(this, arguments);
    }
    $.error( 'Method ' +  method + ' does not exist on jQuery.spritespin' );
  };


	api.init = function(options){
    // Default settings
    var settings = {
      // dimensions
      width             : undefined,              // Window width (or frame width)
      height            : undefined,              // Window height (or frame height)
      frames            : 36,                     // Total number of frames
      frame             : 0,                      // Initial frame number
      module            : "360",
      behavior          : "drag",
      // animation & update
      animate           : true,                   // Run animation when after initialize
      loop              : false,                  // Repeat animation in a loop
      loopFrame         : 0,                      // Indicates the loop start frame
      frameStep         : 1,                      // Number of frames to increment on each animation update
      frameTime         : 36,                     // Time between updates
      frameWrap         : true,                   // Same as 'loob' but for user interaction (behavior)
      reverse           : false,                  // If true animation is played backward
      sense             : 1,                      // Interaction sensitivity used by behavior implementations
      orientation       : "horizontal",
      
      // appearance               
      source            : undefined,              // Stiched source image
      preloadHtml       : undefined,              // Html to appear when images are preloaded
      preloadCSS        : undefined,
      
      // events
      onFrame           : undefined,              // Occurs whe frame has been updated
      onLoad            : undefined,              // Occurs when images are loaded
      touchable         : undefined              // Tells spritespin that it is running on a touchable device
    };
    
    // extending options
    options = (options || {});
    $.extend(settings, options);
    
    return this.each(function(){
      var $this = $(this);
      var data  = $this.data('spritespin');
      
      if (!data){
        // spritespin is not initialized
        
        var images = $this.find("img");
        var i = 0;
        if (images.length > 0){
          settings.source = [];
          for(i = 0; i < images.length; i += 1){
            settings.source.push($(images[i]).attr("src"));
          }
        }
        
        if (typeof(settings.source) === "string"){
          settings.source = [settings.source];
        }
        
        // disable selection & hide overflow
        Spin.disableSelection($this).css({ 
          overflow : "hidden", 
          position : "relative"
        });
        
        // build inner html
        $this.empty();
        $this.append($("<div class='spritespin-stage'/>"));
        $this.append($("<div class='spritespin-preload'/>"));
        $this.addClass("spritespin-instance");

        if (settings.enableCanvas){
          var canvas = $("<canvas class='spritespin-canvas'/>")[0];
          var supported = !!(canvas.getContext && canvas.getContext('2d'));
          if (supported){
            settings.canvas = $(canvas);
            settings.context = canvas.getContext("2d");
            $this.append(settings.canvas);
          }
        }

        // resolve module
        if (typeof(settings.module) === "string"){
          settings.module = SpriteSpin.modules[settings.module];
        }
        
        // build data
        settings.target = $this;
        settings.stage = $this.find(".spritespin-stage");
        settings.preload = $this.find(".spritespin-preload");
        settings.animation = null;
        settings.touchable =(settings.touchable || (/iphone|ipod|ipad|android/i).test(window.navigator.userAgent));
        
        $this.data('spritespin', settings);
        SpriteSpin.reload(settings, true);
      } else {
        // spritespin is initialized.
        $.extend(data, options);

        if (options.source){
          // when images are passed, need to reload the plugin
          SpriteSpin.reload(data);
        } else {
          // otherwise just reanimate spritespin
          $this.spritespin("animate", data.animate, data.loop);
        }
      }
    });
  };
  
	api.destroy = function(){
    return this.each(function(){
      var $this = $(this);
      $this.unbind('.spritespin');
      var data = $this.data('spritespin');
      if (data && data.animation){
        window.clearInterval(data.animation);
        data.animation = null;
      }
      $this.removeData('spritespin');
    });
  };

  // Updates a single frame to the specified frame number. If no value is 
  // given this will increment the current frame counter.
  // Triggers the onFrame event
  api.update = function(frame){
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      
      // update frame counter
      if (frame === undefined){
        data.frame += ((data.animation && data.reverse) ? -data.frameStep : data.frameStep);
      } else {
        data.frame = frame;
      }
      
      // wrap/clamp the frame value to fit in range [0, data.frames]
      if ( data.animation ||                    // wrap frame during animation
          (!data.animation && data.frameWrap)){   // wrap frame during user input 
        data.frame = Spin.wrap(data.frame, 0, data.frames - 1, data.frames);
      } else {
        data.frame = Spin.clamp(data.frame, 0, data.frames - 1);
      }

      // stop animation if the loopFrame is reached
      if (!data.loop && data.animation && (data.frame === data.loopFrame)){
        api.animate.apply(data.target, [false]);
      }
      
      data.target.trigger("onFrame", data);
    });
  };

  // Starts or stops the animation depend on the animate paramter.
  // In case when animation is already running pass "false" to stop.
  // In case when animation is not running pass "true" to start.
  // To keep animation running forever pass "true" for the loop parameter.
  // To detect whether the animation is running or not, do not pass any
  // parameters.
  api.animate = function(animate, loop){
    if (animate === undefined){
      return $(this).data('spritespin').animation !== null;
    } 
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      
      // check the loop variable and update settings
      if (typeof(loop) === "boolean"){
        data.loop = loop;
      }
      // toggle and update animation settings
      if (animate === "toggle"){
        data.animate = !data.animate;
      }
      //
      if (typeof(animate) === "boolean"){
        data.animate = animate;
      }
      // stop the running animation
      if (data.animation){
        window.clearInterval(data.animation);
        data.animation = null;
      }
      // start animation
      if (data.animate){
        data.animation = window.setInterval(function(){ 
          try { 
            $this.spritespin("update"); 
          } catch(err){
            // The try catch block is a hack for Opera Browser
            // Opera sometimes rises an exception here and
            // stops performing the script
          }
        }, data.frameTime);
      }  
    });
  };

  // Gets the current framenumber when no parameter is passed or
  // updates the spinner to the sepcified frame.
  api.frame = function(frame){
    if (frame === undefined){
      return $(this).data('spritespin').frame;
    }
    return this.each(function(){
      $(this).spritespin("update", frame);
    });        
  };

  // Gets or sets a value indicating whether the animation is looped or not.
  // Starts the animation when settings.animate is set to true passed value
  // is defined
  api.loop = function(value){
    if (value === undefined){
      return $(this).data('spritespin').loop;
    }
    return this.each(function(){
      var $this = $(this);
      $this.spritespin("animate", $this.data('spritespin').animate, value);
    }); 
  };

  api.next = function(){
    return this.each(function(){
      var $this = $(this); $this.spritespin("frame", $this.spritespin("frame") + 1);
    });
  };
  
  api.prev = function(){
    return this.each(function(){
      var $this = $(this); $this.spritespin("frame", $this.spritespin("frame") - 1);
    });
  };
  
  api.animateTo = function(frame){
    return this.each(function(){
      var $this = $(this); $this.spritespin({
        animate : true,
        loop : false,
        loopFrame : frame
      });
    });
  };

  Spin.behaviors.none = {
    name : "none",
    mousedown  : $.noop,
    mousemove  : $.noop,
    mouseup    : $.noop,
    
    mouseenter : $.noop,
    mouseover  : $.noop,
    mouseleave : $.noop,
    dblclick   : $.noop,
    
    onFrame : $.noop
  };
  
}(jQuery, window));
(function($, window, Spin){
  Spin.behaviors.click = {
    name : "click",
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      $this.spritespin("animate", false); // stop animation

      var h, p, o = data.target.offset();
      if (data.orientation == "horizontal"){
        h = data.width / 2;
        p = data.currentX - o.left;
      } else {
        h = data.height / 2;
        p = data.currentY - o.top;        
      }
      if (p > h){
        $this.spritespin("frame", data.frame + 1);
        data.reverse = false;
      } else {
        $this.spritespin("frame", data.frame - 1);
        data.reverse = true;
      }
    }
  };
}(jQuery, window, window.SpriteSpin));
(function($, window, Spin){
  Spin.behaviors.drag = {
    name : "drag",
    mousedown  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      data.onDrag = true;
    },
    mousemove  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        Spin.updateInput(e, data);
        
        var d;
        if (data.orientation == "horizontal"){
          d = data.dX / data.width;
        } else {
          d = data.dY / data.height;
        }
      
        var dFrame = d * data.frames * data.sense;
        var frame = Math.round(data.clickframe + dFrame);
        $this.spritespin("update", frame);  // update to frame
        $this.spritespin("animate", false);  // stop animation
      }
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
    },
    mouseleave : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
    }
  };  
}(jQuery, window, window.SpriteSpin));
(function($, window, Spin){
  Spin.behaviors.hold = {
    name : "hold",
    mousedown  : function(e){
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      data.onDrag = true;
      $this.spritespin("animate", true);
    },
    mousemove  : function(e){
      var $this = $(this), data = $this.data('spritespin');
      
      if (data.onDrag){
        Spin.updateInput(e, data);
        
        var h, d, o = data.target.offset();
        if (data.orientation == "horizontal"){
          h = (data.width / 2);
          d = (data.currentX - o.left - h) / h;
        } else {
          h = (data.height / 2);
          d = (data.currentY - o.top - h) / h;
        }
        data.reverse = d < 0;
        d = d < 0 ? -d : d;
        data.frameTime = 80 * (1 - d) + 20;        
      }
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
      $this.spritespin("animate", false);
    },
    mouseleave : function(e){
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
      $this.spritespin("animate", false);
    },
    onFrame : function(e){
      var $this = $(this);
      $this.spritespin("animate", true);
    }
  };
}(jQuery, window, window.SpriteSpin));
(function($, window, Spin){
  Spin.behaviors.swipe = {
    name : "swipe",
    mousedown  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      data.onDrag = true;
    },
    mousemove  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        Spin.updateInput(e, data);
        
        var frame = data.frame;
        var snap = data.snap || 0.25;
        var d, s;
        
        if (data.orientation == "horizontal"){
          d = data.dX; 
          s = data.width * snap;
        } else {
          d = data.dY; 
          s = data.height * snap;
        }
        
        if (d > s){
          frame = data.frame - 1;       
          data.onDrag = false;
        } else if (d < -s){
          frame = data.frame + 1;
          data.onDrag = false;
        }
        
        $this.spritespin("update", frame);  // update to frame
        $this.spritespin("animate", false); // stop animation
      }
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      data.onDrag = false;
      Spin.resetInput(data);
    },
    mouseleave : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      data.onDrag = false;
      Spin.resetInput(data);
    }
  };  
}(jQuery, window, window.SpriteSpin));
(function($, window) {
  
  var Module = window.SpriteSpin.modules["360"] = {};
  
  Module.reload = function(data){
    var images = $(data.images);

    // clear the stage and refill with images
    data.stage.empty()

    // precalculate and cache options for this module
    data.modopts = {
      is_sprite : (data.images.length == 1),
      resX      : (data.resolutionX || data.images[0].width),
      resY      : (data.resolutionY || data.images[0].height),
      offX      : (data.offsetX || 0),
      offY      : (data.offsetY || 0),
      stepX     : (data.stepX || data.width),
      stepY     : (data.stepY || data.height),
      numFramesX: (data.framesX || data.frames),
      oldFrame  : data.frame,
      images    : images
    };

    if (!data.modopts.is_sprite && !data.canvas){
      data.stage.append(images);
    }

    images.css({
      width: data.modopts.resX,
      height: data.modopts.resY
    });

    Module.draw(data);
  };
  
  Module.draw = function(data){    
    if (data.modopts.is_sprite){
      Module.drawSpritesheet(data);
    } else{
      Module.drawImages(data);
    }
  };

  Module.drawSpritesheet = function(data){
    // Assumes all images are batched in a single sprite image

    var opts = data.modopts;
    var image = data.source[0];
    var frameX = (data.frame % opts.numFramesX);
    var frameY = (data.frame / opts.numFramesX)|0;
    var x = opts.offX + frameX * opts.stepX;
    var y = opts.offY + frameY * opts.stepY;

    if (data.canvas){
      data.context.clearRect(0, 0, data.width, data.height);
      data.context.drawImage(data.images[0], x, y, data.width, data.height, 0, 0, data.width, data.height);
      return;
    }

    data.stage.css({
      width      : [data.width, "px"].join(""),
      height     : [data.height, "px"].join(""),
      "background-image"    : ["url('", image, "')"].join(""),
      "background-repeat"   : "no-repeat",
      "background-position" : [-x, "px ", -y, "px"].join(""),
      // Spritesheets may easily exceed the maximum image size for iphones.
      // In this case the browser will scale down the image automaticly and
      // this will break the logic how spritespin works.
      // Here we set the webkit css attribute to display the background in its
      // original dimension even if it has been scaled down.
      "-webkit-background-size" : [opts.resX, "px ", opts.resY, "px"].join("")
    }); 
  };

  Module.drawImages = function(data){
    var img = data.images[data.frame];
    if (data.canvas){
      data.context.clearRect(0, 0, data.width, data.height);
      data.context.drawImage(img, 0, 0);
      return;
    }

    var frame = data.stage.css({
      width      : [data.width, "px"].join(""),
      height     : [data.height, "px"].join("")
    }).children().hide()[data.frame];
    SpriteSpin.disableSelection($(frame)).show();
  };

}(window.jQuery, window));
(function($, window) {
  var Module = window.SpriteSpin.modules.gallery = {};
  
  Module.reload = function(data){
    data.images = [];
    data.offsets = [];
    data.stage.empty();
    data.speed = 500;
    data.opacity = 0.25;
    data.oldFrame = 0;
    var size = 0, i = 0;
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
  
  Module.draw = function(data){
    if ((data.oldFrame != data.frame) && data.offsets){
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
  
  Module.resetInput = function(data){
    if (!data.onDrag){
      data.stage.animate({
        "left" : data.offsets[data.frame]
      });
    }
  };
}(jQuery, window));
(function($, window) {  
  var Module = window.SpriteSpin.modules.panorama = {};

  Module.reload = function(data){
    data.stage.empty();             // clear the stage
    var opts = data.modopts = {};   // precalculate and cache options for this module
    opts.resX = (data.resolutionX || data.images[0].width);
    opts.resY = (data.resolutionY || data.images[0].height);
    if (data.orientation == "horizontal"){
      opts.frames = (data.frames || opts.resX);
    } else {
      opts.frames = (data.frames || opts.resY);
    }
    
    Module.drawFirst(data);
  };
  
  // The function was stripped to do only necessary CSS updates
  Module.draw = function(data){      
    var opts = data.modopts;
    var x, y;
       
    if (data.orientation == "horizontal"){
      x = (data.frame % opts.frames);
      y = 0;      
    } else {
      x = 0;
      y = (data.frame % opts.frames);
    }
    data.stage.css({
      "background-position"     : [-x, "px ", -y, "px"].join("")
    });
  };
  
   // Renamed original draw function which is called only once at Load/Reload
  Module.drawFirst = function(data){      
    var opts = data.modopts;
    var x, y;

    if (data.orientation == "horizontal"){
      x = (data.frame % opts.frames);
      y = 0;      
    } else {
      x = 0;
      y = (data.frame % opts.frames);
    }
    data.stage.css({
      width      : [data.width, "px"].join(""),
      height     : [data.height, "px"].join(""),
      "background-image"        : ["url('", data.source[0], "')"].join(""),
      "background-repeat"       : "repeat-both",
      "background-position"     : [-x, "px ", -y, "px"].join(""),
      "-webkit-background-size" : [opts.resX, "px ", opts.resY, "px"].join("")
    });
  };
  
}(window.jQuery, window));
