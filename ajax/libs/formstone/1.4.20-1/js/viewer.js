/*! formstone v1.4.20-1 [viewer.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

// TODO: external controls like carousel?
// TODO: Add swipe next/previous when zoomed out?

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core",
        "./transition"
      ], factory);
    } else {
      factory(jQuery, Formstone);
    }
  }(function($, Formstone) {

    "use strict";

    /**
     * @method private
     * @name setup
     * @description Setup plugin.
     */

    function setup() {
      scroll();
      $Window.on("scroll", scroll);
      $Body = Formstone.$body;
    }

    /**
     * @method private
     * @name resize
     * @description Handles window resize
     */

    function resize() {
      Functions.iterate.call($Instances, resizeInstance);
      // Functions.iterate.call($LazyInstances, cacheScrollPosition);
      // Functions.iterate.call($LazyInstances, checkScrollPosition);
    }

    /**
     * @method private
     * @name scroll
     * @description Handles window scroll
     */

    function scroll() {
      ScrollTop = $Window.scrollTop() + Formstone.windowHeight;

      if (ScrollTop < 0) {
        ScrollTop = 0;
      }

      // Functions.iterate.call($LazyInstances, checkScrollPosition);
    }

    /**
     * @method private
     * @name raf
     * @description Handles request animation frame
     */

    function raf() {
      Functions.iterate.call($Instances, renderRAF);
    }

    /**
     * @method private
     * @name cacheInstances
     * @description Caches active instances
     */

    function cacheInstances() {
      $Instances = $(Classes.base);
      // $LazyInstances = $(Classes.lazy);

      // Functions.iterate.call($LazyInstances, cacheScrollPosition);

      if ($Instances.length) {
        Functions.lockViewport(Namespace);
      } else {
        Functions.unlockViewport(Namespace);
      }
    }

    /**
     * @method private
     * @name construct
     * @description Builds instance.
     * @param data [object] "Instance data"
     */

    function construct(data) {
      var $image,
        imageData,
        html = '',
        controlPrevClasses = [RawClasses.control, RawClasses.control_previous].join(" "),
        controlNextClasses = [RawClasses.control, RawClasses.control_next].join(" "),
        controlZoomInClasses = [RawClasses.control, RawClasses.control_zoom_in].join(" "),
        controlZoomOutClasses = [RawClasses.control, RawClasses.control_zoom_out].join(" ");

      data.thisClasses = [RawClasses.base, RawClasses.loading, data.customClass, data.theme];
      data.images = [];
      data.source = false;
      data.gallery = false;
      data.tapTimer = null;
      data.action = false;
      data.isRendering = false;
      data.isZooming = false;
      data.isAnimating = false;

      data.keyDownTime = 1;

      data.$images = this.find("img").addClass(RawClasses.source);
      data.index = 0;
      data.total = data.$images.length - 1;

      // Check custom controls
      data.customControls = (typeof data.controls === "object" && data.controls.zoom_in && data.controls.zoom_out);

      if (data.$images.length > 1) {
        data.gallery = true;
        data.thisClasses.push(RawClasses.gallery);

        // Requie zoom for gallery custom controls
        if (data.customControls && (!data.controls.previous || !data.controls.next)) {
          data.customControls = false;
        }
      }

      for (var i = 0; i < data.$images.length; i++) {
        $image = data.$images.eq(i);
        data.images.push($image.attr("src"));
      }

      html += '<div class="' + RawClasses.wrapper + '">';
      html += '<div class="' + RawClasses.loading_icon + '"></div>';
      html += '<div class="' + RawClasses.viewport + '"></div>';
      html += '</div>'; // wrapper

      if (data.controls && !data.customControls) {
        html += '<div class="' + RawClasses.controls + '">';
        html += '<button type="button" class="' + controlPrevClasses + '">' + data.labels.previous + '</button>';
        html += '<button type="button" class="' + controlZoomOutClasses + '">' + data.labels.zoom_out + '</button>';
        html += '<button type="button" class="' + controlZoomInClasses + '">' + data.labels.zoom_in + '</button>';
        html += '<button type="button" class="' + controlNextClasses + '">' + data.labels.next + '</button>';
        html += '</div>'; // controls
      }

      this.addClass(data.thisClasses.join(" "))
        .prepend(html);

      data.$wrapper = this.find(Classes.wrapper);
      data.$viewport = this.find(Classes.viewport);

      if (data.customControls) {
        data.$controls = $(data.controls.container).addClass([RawClasses.controls, RawClasses.controls_custom].join(" "));
        data.$controlPrevious = $(data.controls.previous).addClass(controlPrevClasses);
        data.$controlNext = $(data.controls.next).addClass(controlNextClasses);
        data.$controlZoomIn = $(data.controls.zoom_in).addClass(controlZoomInClasses);
        data.$controlZoomOut = $(data.controls.zoom_out).addClass(controlZoomOutClasses);
      } else {
        data.$controls = this.find(Classes.controls);
        data.$controlPrevious = this.find(Classes.control_previous);
        data.$controlNext = this.find(Classes.control_next);
        data.$controlZoomIn = this.find(Classes.control_zoom_in);
        data.$controlZoomOut = this.find(Classes.control_zoom_out);
      }

      data.$controlItems = data.$controlPrevious.add(data.$controlNext);
      data.$controlZooms = data.$controlZoomIn.add(data.$controlZoomOut);

      cacheInstances();

      data.$controlItems.on(Events.click, data, advanceGallery);
      data.$controlZooms.on([Events.touchStart, Events.mouseDown].join(" "), data, onZoomStart)
        .on([Events.touchEnd, Events.mouseUp].join(" "), data, onClearZoom);

      // if (data.lazy) {
      //  checkScrollPosition(data);
      // } else {
      loadImage(data, data.images[data.index], true);
      // }

      updateControls(data);
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      data.$wrapper.remove();

      data.$image.removeClass(RawClasses.source);

      if (data.controls && !data.customControls) {
        data.$controls.remove();
      }

      if (data.customControls) {
        data.$controls.removeClass([RawClasses.controls, RawClasses.controls_custom].join(" "));
        data.$controlItems.off(Events.click).removeClass([RawClasses.control, RawClasses.control_previous, RawClasses.control_next].join(" "));
        data.$controlZooms.off([Events.touchStart, Events.mouseDown].join(" "))
          .off([Events.touchStart, Events.mouseDown].join(" "))
          .off([Events.touchEnd, Events.mouseUp].join(" "))
          .removeClass([RawClasses.control, RawClasses.control_zoom_in, RawClasses.control_zoom_out].join(" "));
      }

      this.removeClass(data.thisClasses.join(" "))
        .off(Events.namespace);

      cacheInstances();
    }

    /**
     * @method
     * @name load
     * @description Loads source image
     * @param source [string OR array] "Source image (string) or array of images (array)"
     * @example $(".target").viewer("load", "path/to/image.jpg");
     * @example $(".target").viewer("load", ["path/to/image-1.jpg","path/to/image-2.jpg"]);
     */

    function load(data, source) {
      data.index = 0;

      if (typeof source === "string") {
        data.total = 0;
        data.images = [source];
        data.gallery = false;

        data.$el.removeClass(RawClasses.gallery);
      } else {
        data.total = source.length - 1;
        data.images = source;

        if (source.length > 1) {
          data.gallery = true;
          data.$el.addClass(RawClasses.gallery);
        }

        source = data.images[data.index];
      }

      unloadImage(data, function() {
        loadImage(data, source);
      });
    }

    /**
     * @method private
     * @name loadInitialImage
     * @description Loads first source image
     * @param data [object] "Instance data"
     */

    function loadInitialImage(data) {
      loadImage(data, data.images[data.index]);
    }

    /**
     * @method private
     * @name loadImage
     * @description Loads source image
     * @param data [object] "Instance data"
     * @param source [string] "Source image"
     * @param initialLoad [boolean] "Is initial load"
     */

    function loadImage(data, source, initialLoad) {
      if (!data.isAnimating) {
        data.isAnimating = true;

        data.$container = $('<div class="' + RawClasses.container + '"><img></div>');
        data.$image = data.$container.find("img");

        data.$viewport.append(data.$container);

        // Load image
        data.$image.one(Events.load, function() {
            onImageReady(data);

            data.isAnimating = false;

            // Transition in
            data.$container.fsTransition({
                property: "opacity"
              },
              function() {
                // Loaded
              });

            data.$el.removeClass(RawClasses.loading);

            data.$container.fsTouch({
                pan: true,
                scale: true
              }).on(Events.scaleStart, data, onScaleStart)
              .on(Events.scaleEnd, data, onScaleEnd)
              .on(Events.scale, data, onScale);

            data.$el.trigger(Events.loaded);
          }).one(Events.error, data, loadError)
          .attr("src", source)
          .addClass(RawClasses.image);

        // Check if image is cached
        if (data.$image[0].complete || data.$image[0].readyState === 4) {
          data.$image.trigger(Events.load);
        }

        data.source = source;
      }
    }

    /**
     * @method private
     * @name loadError
     * @description Error when resource fails to load.
     */

    function loadError(e) {
      var data = e.data;

      data.$el.trigger(Events.error);
    }

    /**
     * @method private
     * @name onImageReady
     * @description Sets up image data
     * @param data [object] "Instance data"
     */

    // on initial load
    function onImageReady(data) {
      // Cache image properties
      // First for container
      cacheImageProps(data);

      // Cache viewport properties
      cacheViewportProps(data);

      // Set initial container position
      data.containerTop = (data.viewportHeight / 2);
      data.containerLeft = (data.viewportWidth / 2);

      // Cache image min max
      cacheImageMinMax(data);

      // Set initial image size
      data.imageHeight = data.naturalHeight;
      data.imageWidth = data.naturalWidth;

      // Size the image to fit into the viewport
      fitToViewport(data);

      // Cache container min max
      cacheContainerMinMax(data);

      // Cache image top left
      cacheImageTopLeft(data);

      // Cache last props
      cacheLastProps(data);

      // Cache render props
      cacheRenderProps(data);

      // Update dom
      var props = {
        containerTop: data.containerTop,
        containerLeft: data.containerLeft,
        imageHeight: data.imageHeight,
        imageWidth: data.imageWidth,
        imageTop: data.imageTop,
        imageLeft: data.imageLeft,
      };

      setSizeAndPosition(data, props);

      data.isRendering = true;
    }

    /**
     * @method private
     * @name cacheImageProps
     * @description Caches image properties
     * @param data [object] "Instance data"
     */

    function cacheImageProps(data) {
      var naturalSize = calculateNaturalSize(data.$image);

      data.naturalHeight = naturalSize.naturalHeight;
      data.naturalWidth = naturalSize.naturalWidth;

      data.ratioHorizontal = data.naturalHeight / data.naturalWidth;
      data.ratioVertical = data.naturalWidth / data.naturalHeight;

      data.isWide = (data.naturalWidth > data.naturalHeight);
    }

    /**
     * @method private
     * @name cacheViewportProps
     * @description Caches viewport properties
     * @param data [object] "Instance data"
     */

    function cacheViewportProps(data) {
      data.viewportHeight = data.$viewport.outerHeight();
      data.viewportWidth = data.$viewport.outerWidth();
    }

    /**
     * @method private
     * @name cacheContainerProps
     * @description Caches container properties
     * @param data [object] "Instance data"
     */

    function cacheContainerMinMax(data) {
      if (data.imageHeight <= data.viewportHeight) {
        data.containerMinTop = (data.viewportHeight / 2);
        data.containerMaxTop = (data.viewportHeight / 2);
      } else {
        data.containerMinTop = data.viewportHeight - (data.imageHeight / 2);
        data.containerMaxTop = (data.imageHeight / 2);
      }

      if (data.imageWidth <= data.viewportWidth) {
        data.containerMinLeft = (data.viewportWidth / 2);
        data.containerMaxLeft = (data.viewportWidth / 2);
      } else {
        data.containerMinLeft = data.viewportWidth - (data.imageWidth / 2);
        data.containerMaxLeft = (data.imageWidth / 2);
      }
    }

    /**
     * @method private
     * @name cacheImageMinMax
     * @description Caches image min and max based on viewport and size
     * @param data [object] "Instance data"
     */

    function cacheImageMinMax(data) {
      // Set min
      if (data.isWide) {
        //WIDE
        data.imageMinWidth = data.viewportWidth;
        data.imageMinHeight = data.imageMinWidth * data.ratioHorizontal;

        if (data.imageMinHeight > data.viewportHeight) {
          data.imageMinHeight = data.viewportHeight;
          data.imageMinWidth = data.imageMinHeight * data.ratioVertical;
        }
      } else {
        //TALL
        data.imageMinHeight = data.viewportHeight;
        data.imageMinWidth = data.imageMinHeight * data.ratioVertical;

        if (data.imageMinWidth > data.viewportWidth) {
          data.imageMinWidth = data.viewportWidth;
          data.imageMinHeight = data.imageMinWidth * data.ratioHorizontal;
        }
      }

      // Check natural max against new min
      if (data.imageMinWidth > data.naturalWidth || data.imageMinHeight > data.naturalHeight) {
        data.imageMinHeight = data.naturalHeight;
        data.imageMinWidth = data.naturalWidth;
      }

      // Set max
      data.imageMaxHeight = data.naturalHeight;
      data.imageMaxWidth = data.naturalWidth;
    }

    /**
     * @method private
     * @name cacheImageTopLeft
     * @description Caches image top and left based on viewport and size
     * @param data [object] "Instance data"
     */

    function cacheImageTopLeft(data) {
      data.imageTop = -(data.imageHeight / 2);
      data.imageLeft = -(data.imageWidth / 2);
    }

    /**
     * @method private
     * @name cacheLastProps
     * @description Caches last container and image properties
     * @param data [object] "Instance data"
     */

    function cacheLastProps(data) {
      data.lastContainerTop = data.containerTop;
      data.lastContainerLeft = data.containerLeft;

      data.lastImageHeight = data.imageHeight;
      data.lastImageWidth = data.imageWidth;

      data.lastImageTop = data.imageTop;
      data.lastImageLeft = data.imageLeft;
    }

    /**
     * @method private
     * @name cacheRenderProps
     * @description Caches container and image render properties
     * @param data [object] "Instance data"
     */

    function cacheRenderProps(data) {
      data.renderContainerTop = data.lastContainerTop;
      data.renderContainerLeft = data.lastContainerLeft;

      data.renderImageTop = data.lastImageTop;
      data.renderImageLeft = data.lastImageLeft;

      data.renderImageHeight = data.lastImageHeight;
      data.renderImageWidth = data.lastImageWidth;
    }

    /**
     * @method private
     * @name fitToViewport
     * @description Fits image to viewport size
     * @param data [object] "Instance data"
     */

    function fitToViewport(data) {
      data.imageHeight = data.imageMinHeight;
      data.imageWidth = data.imageMinWidth;
    }

    /**
     * @method private
     * @name checkImageMinMax
     * @description Checks image properties against min and max
     * @param data [object] "Instance data"
     */

    // on scale
    function checkImageMinMax(data) {
      if (data.imageHeight < data.imageMinHeight) {
        data.imageHeight = data.imageMinHeight;
      }
      if (data.imageHeight > data.imageMaxHeight) {
        data.imageHeight = data.imageMaxHeight;
      }

      if (data.imageWidth < data.imageMinWidth) {
        data.imageWidth = data.imageMinWidth;
      }
      if (data.imageWidth > data.imageMaxWidth) {
        data.imageWidth = data.imageMaxWidth;
      }
    }

    /**
     * @method private
     * @name checkContainerTopLeft
     * @description Checks container properties against top and left
     * @param data [object] "Instance data"
     */

    function checkContainerTopLeft(data) {
      if (data.containerTop < data.containerMinTop) {
        data.containerTop = data.containerMinTop;
      }
      if (data.containerTop > data.containerMaxTop) {
        data.containerTop = data.containerMaxTop;
      }

      if (data.containerLeft < data.containerMinLeft) {
        data.containerLeft = data.containerMinLeft;
      }
      if (data.containerLeft > data.containerMaxLeft) {
        data.containerLeft = data.containerMaxLeft;
      }
    }

    /**
     * @method private
     * @name checkDoubleTap
     * @description Checks is double tapping
     * @param data [object] "Instance data"
     */

    function checkDoubleTap(data) {
      if (data.tapTimer === null) {
        data.tapTimer = Functions.startTimer(data.tapTimer, 500, function() {
          clearDoubleTap(data);
        });
      } else {
        clearDoubleTap(data);
        onImageZoom(data);
      }
    }

    /**
     * @method private
     * @name clearDoubleTap
     * @description Clears double tap timer
     * @param data [object] "Instance data"
     */

    function clearDoubleTap(data) {
      Functions.clearTimer(data.tapTimer);
      data.tapTimer = null;
    }

    /**
     * @method private
     * @name setSizeAndPosition
     * @description Updates image and container DOM
     * @param data [object] "Instance data"
     */

    function setSizeAndPosition(data, props) {
      if (Formstone.transform) {
        var scaleX = props.imageWidth / data.naturalWidth,
          scaleY = props.imageHeight / data.naturalHeight;

        data.$container.css(Formstone.transform, "translate3d(" + props.containerLeft + "px, " + props.containerTop + "px, 0)");
        data.$image.css(Formstone.transform, "translate3d(-50%, -50%, 0) scale(" + scaleX + "," + scaleY + ")");
      } else {
        data.$container.css({
          top: props.containerTop,
          left: props.containerLeft
        });

        data.$image.css({
          height: props.imageHeight,
          width: props.imageWidth,
          top: props.imageTop,
          left: props.imageLeft
        });
      }
    }

    /**
     * @method private
     * @name onScaleStart
     * @description Handles scale start event
     * @param e [object] "Event data"
     */

    function onScaleStart(e) {
      var data = e.data;

      // Check double tap
      checkDoubleTap(data);

      // Cache previous values
      cacheLastProps(data);
    }

    /**
     * @method private
     * @name onScale
     * @description Handles scale event
     * @param e [object] "Event data"
     */

    function onScale(e) {
      var data = e.data;

      // Clear double tap
      clearDoubleTap(data);

      data.isRendering = false;
      data.isZooming = false;

      var zoomed = (data.imageHeight > data.imageMinHeight + 1);

      // Change container position
      data.containerTop = data.lastContainerTop + e.deltaY;
      data.containerLeft = data.lastContainerLeft + e.deltaX;

      /*
          var diffX  = data.lastContainerLeft - data.containerLeft,
            diffY  = data.lastContainerTop - data.containerTop;

          data.containerLeft -= diffX;
          data.containerTop  -= diffY;
      */

      // Change image size
      data.imageHeight = data.lastImageHeight * e.scale;
      data.imageWidth = data.lastImageWidth * e.scale;

      // Cache container min max
      cacheContainerMinMax(data);

      // Check container top left
      checkContainerTopLeft(data);

      // Check image min max
      checkImageMinMax(data);

      // Cache image top left
      cacheImageTopLeft(data);

      // Update dom
      var props = {
        containerTop: data.containerTop,
        containerLeft: data.containerLeft,
        imageHeight: data.imageHeight,
        imageWidth: data.imageWidth,
        imageTop: data.imageTop,
        imageLeft: data.imageLeft,
      };

      setSizeAndPosition(data, props);
    }

    /**
     * @method private
     * @name onScaleEnd
     * @description Handles scale end event
     * @param e [object] "Event data"
     */

    function onScaleEnd(e) {
      var data = e.data;

      if (!data.isZooming) {
        // Cache last properties
        cacheLastProps(data);

        // Cache rander properties
        cacheRenderProps(data);

        data.isRendering = true;
      }
    }

    /**
     * @method private
     * @name onImageZoom
     * @description Zooms image in or out depending on current size
     * @param data [object] "Instance data"
     */

    function onImageZoom(data) {
      var zoomed = (data.imageHeight > data.imageMinHeight + 1);

      data.isZooming = true;

      // Cache last properties
      cacheLastProps(data);

      // Cache rander properties
      cacheRenderProps(data);

      if (zoomed) {
        // zoomed in (go to min)
        data.imageHeight = data.imageMinHeight;
        data.imageWidth = data.imageMinWidth;
      } else {
        // zoomed out (go to max)
        data.imageHeight = data.imageMaxHeight;
        data.imageWidth = data.imageMaxWidth;
      }

      // Cache container min max
      cacheContainerMinMax(data);

      // Check container top left
      checkContainerTopLeft(data);

      // Cache image top left
      cacheImageTopLeft(data);

      data.isRendering = true;
    }

    /**
     * @method private
     * @name onZoomStart
     * @description Handle zoom start
     * @param e [object] "Event data"
     */

    function onZoomStart(e) {
      Functions.killEvent(e);

      var $target = $(e.currentTarget),
        data = e.data,
        direction = ($target.hasClass(RawClasses.control_zoom_out)) ? 'out' : 'in';

      if (direction === 'out') {
        onZoomOut(data);
      } else {
        onZoomIn(data);
      }
    }

    /**
     * @method private
     * @name onZoomIn
     * @description Handle zoom in
     * @param data [object] "Instance data"
     */

    function onZoomIn(data) {
      data.keyDownTime = 1;
      data.action = 'zoom_in';
    }

    /**
     * @method private
     * @name onZoomOut
     * @description Handle zoom out
     * @param data [object] "Instance data"
     */

    function onZoomOut(data) {
      data.keyDownTime = 1;
      data.action = 'zoom_out';
    }

    /**
     * @method private
     * @name onClearZoom
     * @description Handle clear zoom
     * @param e [object] "Event data"
     */

    function onClearZoom(e) {
      var data = e.data;

      data.action = false;
    }

    /**
     * @method private
     * @name renderRAF
     * @description Updates DOM based on animation values
     * @param data [object] "Instance data"
     */

    function renderRAF(data) {
      if (data.isRendering) {
        if (data.action) {
          data.keyDownTime += data.zoomIncrement;

          var delta = ((data.action === "zoom_out") ? -1 : 1) * Math.round((data.imageWidth * data.keyDownTime) - data.imageWidth);

          if (delta > data.zoomDelta) {
            delta = data.zoomDelta;
          }

          if (data.isWide) {
            data.imageWidth += delta;
            data.imageHeight = Math.round(data.imageWidth / data.ratioVertical);
          } else {
            data.imageHeight += delta;
            data.imageWidth = Math.round(data.imageHeight / data.ratioHorizontal);
          }

          // Check image min max
          checkImageMinMax(data);

          // Cache image top left
          cacheImageTopLeft(data);

          // Cache container min max
          cacheContainerMinMax(data);

          // Check container top left
          checkContainerTopLeft(data);
        }

        data.renderContainerTop += Math.round((data.containerTop - data.renderContainerTop) * data.zoomEnertia);
        data.renderContainerLeft += Math.round((data.containerLeft - data.renderContainerLeft) * data.zoomEnertia);

        data.renderImageTop += Math.round((data.imageTop - data.renderImageTop) * data.zoomEnertia);
        data.renderImageLeft += Math.round((data.imageLeft - data.renderImageLeft) * data.zoomEnertia);

        data.renderImageHeight += Math.round((data.imageHeight - data.renderImageHeight) * data.zoomEnertia);
        data.renderImageWidth += Math.round((data.imageWidth - data.renderImageWidth) * data.zoomEnertia);

        // Update DOM

        var props = {
          containerTop: data.renderContainerTop,
          containerLeft: data.renderContainerLeft,
          imageHeight: data.renderImageHeight,
          imageWidth: data.renderImageWidth,
          imageTop: data.renderImageTop,
          imageLeft: data.renderImageLeft,
        };

        setSizeAndPosition(data, props);
      }
    }

    /**
     * @method
     * @name unload
     * @description Unloads current image
     * @example $(".target").viewer("unload");
     */

    function unload(data) {
      unloadImage(data);
    }

    /**
     * @method private
     * @name unloadImage
     * @description Unloads current image
     * @param data [object] "Instance data"
     * @param callback [function] "Callback function"
     */

    function unloadImage(data, callback) {
      if (!data.isAnimating) {
        clearDoubleTap(data);

        data.isAnimating = true;
        data.isRendering = false;
        data.isZooming = false;

        clearTouch(data);

        data.$container.fsTransition({
            property: "opacity"
          },
          function() {
            data.isAnimating = false;

            data.$container.remove();

            if (typeof callback === "function") {
              callback.call(window, data);
            }
          });

        data.$el.addClass(RawClasses.loading);
      }
    }

    /**
     * @method private
     * @name advanceGallery
     * @description Advances gallery
     * @param e [object] "Event data"
     */

    function advanceGallery(e) {
      Functions.killEvent(e);

      var $target = $(e.currentTarget),
        data = e.data,
        index = data.index + (($target.hasClass(RawClasses.control_next)) ? 1 : -1);

      if (!data.isAnimating) {
        if (index < 0) {
          index = 0;
        }

        if (index > data.total) {
          index = data.total;
        }

        if (index !== data.index) {
          data.index = index;

          unloadImage(data, function() {
            loadImage(data, data.images[data.index]);
          });
        }

        updateControls(data);
      }
    }

    /**
     * @method private
     * @name updateControls
     * @description Update control states
     * @param data [object] Instance data
     */

    function updateControls(data) {
      data.$controlItems.removeClass(RawClasses.control_disabled);

      if (data.index === 0) {
        data.$controlPrevious.addClass(RawClasses.control_disabled);
      }
      if (data.index === data.images.length - 1) {
        data.$controlNext.addClass(RawClasses.control_disabled);
      }
    }

    /**
     * @method private
     * @name resize
     * @description Resize target instance
     * @example $(".target").viewer("resize");
     */

    /**
     * @method private
     * @name resizeInstance
     * @description Handle window resize event
     * @param data [object] "Instance data"
     */

    function resizeInstance(data) {
      cacheViewportProps(data);

      cacheContainerMinMax(data);

      cacheImageMinMax(data);

      cacheImageTopLeft(data);

      cacheContainerMinMax(data);

      checkContainerTopLeft(data);

      checkImageMinMax(data);
    }

    /**
     * @method private
     * @name clearTouch
     * @description Clears current touch action.
     */

    function clearTouch(data) {
      if (data.$container && data.$container.length) {
        data.$container.fsTouch("destroy")
          .off(Events.scaleStart, onScaleStart)
          .off(Events.scaleEnd, onScaleEnd)
          .off(Events.scale, onScale);
      }
    }

    /**
     * @method private
     * @name cacheScrollPosition
     * @description Cahce target scroll position
     * @param data [object] "Instance data"
     */

    function cacheScrollPosition(data) {
      data.scrollTop = data.$el.offset().top;
    }

    // /**
    //  * @method private
    //  * @name checkScrollPosition
    //  * @description Check target scroll position against window
    //  * @param data [object] "Instance data"
    //  */
    //
    // function checkScrollPosition(data) {
    //   if (!data.visible && data.scrollTop < ScrollTop + data.lazyEdge) {
    //     data.visible = true;
    //     loadInitialImage(data);
    //   }
    // }

    /**
     * @method private
     * @name calculateNaturalSize
     * @description Determines natural size of target image.
     * @param $img [jQuery object] "Source image object"
     * @return [object | boolean] "Object containing natural height and width values or false"
     */

    function calculateNaturalSize($img) {
      var node = $img[0],
        img = new Image();

      if (typeof node.naturalHeight !== "undefined") {
        return {
          naturalHeight: node.naturalHeight,
          naturalWidth: node.naturalWidth
        };
      } else {
        if (node.tagName.toLowerCase() === 'img') {
          img.src = node.src;
          return {
            naturalHeight: img.height,
            naturalWidth: img.width
          };
        }
      }

      return false;
    }

    /**
     * @plugin
     * @name Viewer
     * @description A jQuery plugin for image exploration.
     * @type widget
     * @main viewer.js
     * @main viewer.css
     * @dependency jQuery
     * @dependency core.js
     * @dependency touch.js
     * @dependency transition.js
     */

    var Plugin = Formstone.Plugin("viewer", {
        widget: true,

        /**
         * @options
         * @param controls [boolean or object] <true> "Flag to draw controls OR object containing container, next, previous, zoom_in and zoom_out control selectors (Must be fully qualified selectors)"
         * @param customClass [string] <''> "Class applied to instance"
         // param lazy [boolean] <false> "Lazy load with scroll"
         // param lazyEdge [int] <100> "Lazy load edge"
         * @param labels.count [string] <'of'> "Gallery count separator text"
         * @param labels.next [string] <'Next'> "Gallery control text"
         * @param labels.previous [string] <'Previous'> "Gallery control text"
         * @param labels.zoom_in [string] <'Zoom In'> "Image zoom text"
         * @param labels.zoom_out [string] <'Zoom Out'> "Image zoom text"
         * @param theme [string] <"fs-light"> "Theme class name"
         * @param zoomDelta [int] <100> "Max zoom change"
         * @param zoomEnertia [float] <0.2> "Enertia for zoom"
         * @param zoomIncrement [float] <0.01> "Increment for zoom buttons"
         */

        defaults: {
          controls: true,
          customClass: "",
          // lazy           : false,
          // lazyEdge       : 100,
          labels: {
            count: "of",
            next: "Next",
            previous: "Previous",
            zoom_in: "Zoom In",
            zoom_out: "Zoom Out"
          },
          theme: "fs-light",
          zoomDelta: 100,
          zoomEnertia: 0.2,
          zoomIncrement: 0.01
        },

        classes: [
          "source",
          "wrapper",
          "viewport",
          "container",
          "image",
          "gallery",
          "loading_icon",

          "controls",
          "controls_custom",
          "control",
          "control_previous",
          "control_next",
          "control_zoom_in",
          "control_zoom_out",
          "control_disabled",
          // "lazy"
          "loading"
        ],

        /**
         * @events
         * @event loaded.viewer "Image loaded"
         * @event ready.viewer "Image ready"
         */

        events: {
          loaded: "loaded",
          ready: "ready"
        },

        methods: {
          _construct: construct,
          _destruct: destruct,
          _resize: resize,
          _raf: raf,

          resize: resizeInstance,
          load: load,
          unload: unload
        }
      }),

      // Localize References

      Namespace = Plugin.namespace,
      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions,

      Window = Formstone.window,
      $Window = Formstone.$window,
      $Body,
      ScrollTop = 0,
      $Instances = [],
      ViewportSetup = false;

    // Setup

    Formstone.Ready(setup);

  })

);
