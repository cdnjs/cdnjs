(function($, window) {

	var methods = {};
	var helper = {};
	var behavior = {};
	
  $.fn.spritespin = function(method) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if (typeof(method) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.spritespin' );
    }
  };


  function SpriteLoader(images, callback){
    if (typeof(images) === "string"){ images = [images]; }
    
    this.callback = callback;
    this.numLoaded = 0;
    this.numErrors = 0;
    this.numAborts = 0;
    this.numProcessed = 0;
    this.numImages = images.length;
    this.images = [];
    var i = 0;
    for (i = 0; i < images.length; i++ ) {
      this.preload(images[i]); 
    }
  }
  SpriteLoader.prototype.preload = function(imageUrl){
     // create new Image object and add to array
     var image = new Image();
     this.images.push(image);
  
     // set up event handlers for the Image object
     image.onload = SpriteLoader.prototype.onload;
     image.onerror = SpriteLoader.prototype.onerror;
     image.onabort = SpriteLoader.prototype.onabort;
  
     // assign pointer back to this.
     image.preloader = this;
  
     // assign the .src property of the Image object to start loading
     image.src = imageUrl;
  };
  SpriteLoader.prototype.onProcessed = function(){
    this.numProcessed++;
    if ( this.numProcessed === this.numImages ){
      this.callback(this.images, this.numLoaded);
    }
  };
  SpriteLoader.prototype.onload = function(){
    this.preloader.numLoaded++;
    this.preloader.onProcessed();
  };
  SpriteLoader.prototype.onerror = function(){
    this.preloader.numErrors++;
    this.preloader.onProcessed();
  };
  SpriteLoader.prototype.onabort = function(){
    this.preloader.numAborts++;
    this.preloader.onProcessed();
  };



	methods.init = function(options){
    // Default settings
    var settings = {
      // dimensions
      width             : undefined,              // Window width (or frame width)
      height            : undefined,              // Window height (or frame height)
      offsetX           : 0,                      // Offset in X direction from the left image border to the first frames left border
      offsetY           : 0,                      // Offset in Y direction from the top image border to the first frames top border
      frameStepX        : undefined,              // Distance in X direction to the next frame if it differs from window width 
      frameStepY        : undefined,              // Distance in Y direction to the next frame if it differs from window height
      frameStep         : undefined,              // Width of a single frame or step to the next frame
      framesX           : undefined,              // Number of frames in a single row
      frames            : 36,                     // Total number of frames
      frame             : 0,                      // Initial frame number
      resolutionX       : undefined,              // The spritesheet resolution in X direction
      resolutionY       : undefined,              // The spritesheet resolution in Y direction
      
      // animation & update
      animate           : true,                   // Run animation when after initialize
      loop              : false,                  // Repeat animation in a loop
      loopFrame         : 0,                      // Indicates the loop start frame
      frameTime         : 36,                     // Time between updates
      reverse           : false,                  // If true animation is played backward
      sense             : 1,                      // Interaction sensitivity used by behavior implementations
      
      // interaction
      slider            : undefined,              // jQuery-ui slider instance
      behavior          : "drag",                 // Enables mouse interaction
      
      // appearance               
      image             : "images/spritespin.jpg",// Stiched source image
      preloadHtml       : " ",                    // Html to appear when images are preloaded
      preloadBackground : undefined,              // Background image to display on load
      preloadCSS        : undefined,
			fadeFrames        : 0,                      // Enables and disables smooth transitions between frames
			fadeInTime        : 0,                      // 
			fadeOutTime       : 120,                    // 
      
      // events
      onFrame           : undefined,              // Occurs whe frame has been updated
      onLoad            : undefined,              // Occurs when images are loaded
      touchable         : undefined,              // Tells spritespin that it is running on a touchable device
      panorama          : false
    };
    
    // extending options
    options = (options || {});
    $.extend(settings, options);
    
    return this.each(function(){
      var $this = $(this);
      var data  = $this.data('spritespin');
      
      if (!data){
        // disable selection & hide overflow
        $this.attr("unselectable", "on").css({ overflow : "hidden" }).html("");
  
        var imageElement, imageElements;
        if (!settings.panorama){
          imageElement = $this.find("img");
          if (imageElement.length === 0){
            imageElement = $("<img src=''/>");
            $this.append(imageElement);
          }

					var i;
					for (i = 1; i < settings.fadeFrames; i ++){
						$this.append("<img src=''/>");
					}
					
					imageElements = $this.find("img");
					imageElements.hide();
        }
        
        // Initialize the plugin if it hasn't been initialized yet
        $this.data('spritespin', {
          target       : $this,
          settings     : settings,
          animation    : null,
          frameTime    : settings.frameTime,
          imageElement : imageElement,
					imageElements: imageElements,
					imageIndex   : 0,
          touchable    : (settings.touchable || (/iphone|ipod|ipad|android/i).test(window.navigator.userAgent))
        });
  
        // run configuration
        data = $this.data('spritespin');
        helper.reconfiger($this, data);
      } else {
        // reconfiger the plugin if it is already initialized
        $.extend(data.settings, options);
        data.frameTime = data.settings.frameTime; // override cached frameTime
        
        if (options.image !== null && options.image !== undefined){
          // when images are passed, need to reconfiger the plugin
          helper.reconfiger($this, data);
        } else {
          // otherwise just reanimate spritespin
          $this.spritespin("animate", data.settings.animate, data.settings.loop);
        }
      }
    });
  };
  
	methods.destroy = function(){
    return this.each(function(){
      var $this = $(this);
      $this.unbind('.spritespin');
      $this.removeData('spritespin');
    });
  };

  // Updates a single frame to the specified frame number. If no value is 
  // given this will increment the current frame counter.
  // Triggers the onFrame event
  methods.update = function(frame, reverse){
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      var settings = data.settings;
      
      if (reverse !== undefined){
        settings.reverse = reverse;
      }
      
      // update frame counter
      if (frame === undefined){
        settings.frame = (settings.frame + (settings.reverse ? -1 : 1));
      } else {
        settings.frame = frame;
      }
      settings.frame = helper.wrapValue(settings.frame, 0, settings.frames);
      data.target.trigger("onFrame", data);
    });
  };

  // Starts or stops the animation depend on the animate paramter.
  // In case when animation is already running pass "false" to stop.
  // In case when animation is not running pass "true" to start.
  // To keep animation running forever pass "true" for the loop parameter.
  // To detect whether the animation is running or not, do not pass any
  // parameters.
  methods.animate = function(animate, loop){
    if (animate === undefined){
      return $(this).data('spritespin').animation !== null;
    } else {
      return this.each(function(){
        var $this = $(this);
        var data = $this.data('spritespin');
        var settings = data.settings;
        
        // check the loop variable and update settings
        if (typeof(loop) === "boolean"){
          settings.loop = loop;
        }
        
        // toggle and update animation settings
        if (animate === "toggle"){
          animate = !settings.animate;
          settings.animate = animate;
        } else {
          settings.animate = animate;
        }
        
        if (data.animation !== null){
          window.clearInterval(data.animation);
          data.animation = null;
        }
        
        if (settings.animate){
          // start animation
          data.animation = window.setInterval(
            function(){ 
              try {
                $this.spritespin("update");
              } catch(err){
                // The try catch block is a hack for Opera Browser
              }
            }, data.frameTime);
        }  
      });
    }
  };

  // Gets the current framenumber when no parameter is passed or
  // updates the spinner to the sepcified frame.
  methods.frame = function(frame){
    if (frame === undefined){
      return $(this).data('spritespin').settings.frame;
    } else {
      return this.each(function(){
        $(this).spritespin("update", frame);
      });        
    }
  };

  // Gets or sets a value indicating whether the animation is looped or not.
  // Starts the animation when settings.animate is set to true passed value
  // is defined
  methods.loop = function(value){
    if (value === undefined){
      return $(this).data('spritespin').settings.loop;
    } else {
      return this.each(function(){
        var $this = $(this);
        var data = $this.data('spritespin');
        $this.spritespin("animate", data.settings.animate, value);
      }); 
    }
  };


  helper.storePoints = function(e, data){
    if (e.touches === undefined && e.originalEvent !== undefined){
      // jQuery Event normalization does not preserve the event.touches
      // we just try to restore it
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
      data.clickframe = data.settings.frame;
    }
    
    if (data.oldX === undefined || data.oldY === undefined){
      data.oldX = data.currentX;
      data.oldY = data.currentY;
    }
    
    data.dX = data.currentX - data.startX;
    data.dY = data.currentY - data.startY;
    
    data.ddX = data.currentX - data.oldX;
    data.ddY = data.currentY - data.oldY;
    return false;
  };
  
  helper.resetPoints = function(e, data){
    data.startX = undefined;
    data.startY = undefined;
    data.currentX = undefined;
    data.currentY = undefined;
    data.oldX = undefined;
    data.oldY = undefined;
    data.dX = 0;
    data.dY = 0;
    data.ddX = 0;
    data.ddY = 0;
  };
  
  helper.clamp = function(value, min, max){ 
    return (value > max ? max : (value < min ? min : value));
  };
  
  helper.wrapValue = function(value, min, max){
    while (value >= max){ value -= max; } 
    while (value < min){ value += max; }
    return value;
  };
  
  helper.reconfiger = function(instance, data){
    helper.blankBackground(instance, data);
    helper.preloadImages(instance, data, function(){
      helper.updateBackground(instance, data);
      helper.hookSlider(instance, data);
      helper.rebindEvents(instance, data);
      if (data.settings.animate){
        methods.animate.apply(instance, [data.settings.animate, data.settings.loop]);
      }
      instance.trigger("onLoad", data);
    });
  };
  
  helper.blankBackground = function(instance, data){
    var image = "none";
    if (typeof(data.settings.preloadBackground) === "string"){
      image = ["url('", data.settings.preloadBackground, "')"].join("");
    }
    instance.css({
      width      : [data.settings.width, "px"].join(""),
      height     : [data.settings.height, "px"].join(""),
      "background-image"    : image,
      "background-repeat"   : "repeat-x",
      "background-position" : "0px 0px"
    });
    
    $(data.imageElement).hide();
  };
  
  helper.updateBackground = function(instance){
    var data = instance.data("spritespin");
    var image = data.settings.image;
    var x = data.settings.offsetX;
    var y = -data.settings.offsetY;
    
    if (typeof(data.settings.image) === "string"){ 
      var stepX = (data.settings.frameStepX || data.settings.width);
      var stepY = (data.settings.frameStepY || data.settings.height);
      var numFramesX = (data.settings.framesX || data.settings.frames);
      var frameX = (data.settings.frame % numFramesX);
      var frameY = (data.settings.frame / numFramesX)|0;
      x -= (frameX * stepX);
      y -= (frameY * stepY);
    } else {
      // we expect an array in this case
      image = data.settings.image[data.settings.frame];
    }
  
    var css = {};
    if (data.imageElement){
      css = {
        position   : "absolute",
        top        : "0px",
        left       : "0px"        
      };
      if (data.settings.resolutionX && data.settings.resolutionY){
        css.width = data.settings.resolutionX;
        css.height = data.settings.resolutionY;
      }
      instance.css({
        position   : "relative",
        top        : 0,
        left       : 0,
        width      : data.settings.width,
        height     : data.settings.height
      });

			if (data.imageElements.length === 1){
				data.imageElement.attr("src", image).css(css).show();
			} else {
				var max = data.imageElements.length - 1;
				var index = helper.wrapValue(data.imageIndex, 0, max);
				var prevIndex = helper.wrapValue(data.imageIndex + 1, 0, max);
				data.imageIndex = helper.wrapValue(data.imageIndex - 1, 0, max);
				
				if (data.settings.fadeOutTime > 0){
					$(data.imageElements[prevIndex]).fadeOut(data.settings.fadeOutTime);
				} else {
					$(data.imageElements[prevIndex]).hide();
				}
				
				if (data.settings.fadeInTime > 0){
					$(data.imageElements[index]).attr("src", image).css(css).fadeIn(data.settings.fadeInTime);
				} else {
					$(data.imageElements[index]).attr("src", image).css(css).show();
				}
			}
			
    } else {
      css = {
        width      : [data.settings.width, "px"].join(""),
        height     : [data.settings.height, "px"].join(""),
        "background-image"    : ["url('", image, "')"].join(""),
        "background-repeat"   : "repeat-x",
        "background-position" : [x, "px ", y, "px"].join("")
      };
      // Spritesheets may easily exceed the maximum image size for iphones.
      // In this case the browser will scale down the image automaticly and
      // this will break the logic how spritespin works.
      // Here we set the webkit css attribute to display the background in its
      // original dimension even if it has been scaled down.
      if (data.settings.resolutionX && data.settings.resolutionY) {
        css["-webkit-background-size"] = [data.settings.resolutionX, "px ", data.settings.resolutionY, "px"].join("");
      }
      instance.css(css);
    }
  };
  
  helper.hookSlider = function(instance, data){
    if (data.settings.slider !== undefined){
      data.settings.slider.slider({
        value   : data.settings.frame,
        min     : 0,
        max     : (data.settings.frames) - 1,
        step    : 1,
        slide   : function(event, ui) {
          methods.animate.apply(instance, [false]);    // stop animation
          methods.frame.apply(instance, [ui.value]);   // update to frame
        }
      }); 
    }
  };
  
  helper.rebindEvents = function(instance, data){
    // unbind all events
    instance.unbind('.spritespin');
  
    // use custom or build in behavior
    var currentBehavior = data.settings.behavior;
    if (typeof(data.settings.behavior) === "string"){
      currentBehavior = behavior[data.settings.behavior];
    }
    
    var prevent = function(e){
      if (e.cancelable){
        e.preventDefault();
      }
      return false;
    };
    
    // rebind interaction events
    instance.bind('mousedown.spritespin',  currentBehavior.mousedown);
    instance.bind('mousemove.spritespin',  currentBehavior.mousemove);
    instance.bind('mouseup.spritespin',    currentBehavior.mouseup);
    instance.bind('mouseenter.spritespin', currentBehavior.mouseenter);
    instance.bind('mouseover.spritespin',  currentBehavior.mouseover);
    instance.bind('mouseleave.spritespin', currentBehavior.mouseleave);
    instance.bind('dblclick.spritespin',   currentBehavior.dblclick);
    instance.bind('onFrame.spritespin',    currentBehavior.onFrame);
  
    if (data.touchable){
      instance.bind('touchstart.spritespin',  currentBehavior.mousedown);
      instance.bind('touchmove.spritespin',   currentBehavior.mousemove);
      instance.bind('touchend.spritespin',    currentBehavior.mouseup); 
      instance.bind('touchcancel.spritespin', currentBehavior.mouseleave);
      instance.bind('click.spritespin',         prevent); 
      instance.bind('gesturestart.spritespin',  prevent); 
      instance.bind('gesturechange.spritespin', prevent); 
      instance.bind('gestureend.spritespin',    prevent); 
    }
            
    // disable selection
	  instance.bind("mousedown.spritespin selectstart.spritespin", prevent);
	  
	  instance.bind("onFrame.spritespin", function(event, data){
	    helper.updateBackground(data.target, data);
      
      // stop animation if we are back at looFrame
      if (data.settings.frame === data.settings.loopFrame && !data.settings.loop){
        methods.animate.apply(data.target, [false]);
      }
      
      // update the jquery-ui slider
      if (data.settings.slider){
        data.settings.slider.slider("value", data.settings.frame);
      }
	  });
	  
	  // bind custom events
	  if (typeof(data.settings.onFrame) === "function"){
	    instance.bind("onFrame.spritespin", data.settings.onFrame);
	  }
	  if (typeof(data.settings.onLoad) === "function"){
	    instance.bind("onLoad.spritespin", data.settings.onLoad);
	  }
  };
  
  helper.preloadImages = function(instance, data, callback) {
    var preload = $('<div class="preload"/>');
    if (instance.find(".preload").length === 0){
      instance.append(preload);
    }
    
    var css = (data.settings.preloadCSS || {});
    preload.css(
      $.extend({
        width : data.settings.width,
        height: data.settings.height}, css))  
      .hide()
      .html(data.settings.preloadHtml)
      .fadeIn(250, function(){
        new SpriteLoader(data.settings.image, function(){
          instance.find(".preload").fadeOut(250, function(){
            $(this).detach();
          });
          callback.apply(instance, [instance, data]);
        });
      });
  };
  
  

  behavior.none = {
    mousedown  : function(e){ return false; },
    mousemove  : function(e){ return false; },
    mouseup    : function(e){ return false; },
    
    mouseenter : function(e){ return false; },
    mouseover  : function(e){ return false; },
    mouseleave : function(e){ return false; },
    dblclick   : function(e){ return false; },
    
    onFrame : function(e, frame){ return false; }
  };
  
  behavior.spin = {
    mousedown  : function(e){
      var $this = $(this), data = $this.data('spritespin');
      helper.storePoints(e, data);
      data.onDrag = true;
      return false; 
    },
    mousemove  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        // perform default drag behavior
        helper.storePoints(e, data);
        var d = data.dX / data.settings.width;
        var dFrame = d * data.settings.frames * data.settings.sense;
        var frame = Math.round(data.clickframe + dFrame);
        
        methods.update.apply($this, [frame]);     // update to frame
        methods.animate.apply($this, [false]);    // stop animation
        
        // calculate framtetime for spinwheel
        if (data.ddX !== 0){
          d = data.ddX / data.settings.width;
          dFrame = d * data.settings.frames * data.settings.sense;
          data.frameTime = (data.settings.frameTime / dFrame);
          data.settings.reverse = (data.ddX < 0);
        }
      }
      return false;  
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        data.onDrag = false;
        $this.spritespin("animate", true);
      }
      return false; 
    },
  
    mouseenter : function(e){ return false; },
    mouseover  : function(e){ return false; },
    mouseleave : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        data.onDrag = false;
        $this.spritespin("animate", $this.spritespin("animate"));
      }
      return false; 
    },
    dblclick   : function(e){ 
      $(this).spritespin("animate", "toggle");
      return false; 
    },
    onFrame : function(e, data){
      if (data.ddX !== 0){
        data.frameTime = data.frameTime + 1;
      
        $(this).spritespin("animate", false);
        if (data.frameTime < 62){
          $(this).spritespin("animate", true);
        }  
      } else {
        $(this).spritespin("animate", false);
      }
      return false; 
    }
  };
  
  behavior.drag = {
    mousedown  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      helper.storePoints(e, data);
      data.onDrag = true;
      return false; 
    },
    mousemove  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        helper.storePoints(e, data);
        var d = data.dX / data.settings.width;
        var dFrame = d * data.settings.frames * data.settings.sense;
        var frame = Math.round(data.clickframe + dFrame);
        
        methods.update.apply($this, [frame]);   // update to frame
        methods.animate.apply($this, [false]);  // stop animation
      }
      return false; 
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      helper.resetPoints(e, data);
      data.onDrag = false;
      return false; 
    },
    
    mouseenter : function(e){ return false; },
    mouseover  : function(e){ return false; },
    mouseleave : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      helper.resetPoints(e, data);
      data.onDrag = false;
      return false; 
    },
    dblclick   : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      $this.spritespin("animate", "toggle");
      return false; 
    },
    onFrame : function(e, frame){ 
      return false; 
    }
  };

}(jQuery, window));
