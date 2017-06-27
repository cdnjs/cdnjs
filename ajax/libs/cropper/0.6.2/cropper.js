/*!
 * Cropper v0.6.2
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as anonymous module.
    define(["jquery"], factory);
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  "use strict";

  var $window = $(window),
      $document = $(document),

      // Constants
      NULL = null,
      UNDEFINED = void 0,

      // RegExps
      REGEXP_DIRECTIVES = /^(e|n|w|s|ne|nw|sw|se|\*|\+)$/i,
      REGEXP_OPTIONS = /^(x|y|width|height)$/i,

      // Classes
      CLASS_HIDDEN = "cropper-hidden",
      CLASS_INVISIBLE = "cropper-invisible",

      // Events
      CROPPER_NAMESPACE = ".cropper",
      EVENT_DRAG_START = "mousedown touchstart",
      EVENT_DRAG_MOVE = "mousemove touchmove",
      EVENT_DRAG_END = "mouseup mouseleave touchend touchleave touchcancel",
      EVENT_RESIZE = "resize" + CROPPER_NAMESPACE,
      CROPPER_EVENTS = [
        "build" + CROPPER_NAMESPACE,
        "built" + CROPPER_NAMESPACE,
        "dragstart" + CROPPER_NAMESPACE,
        "dragmove" + CROPPER_NAMESPACE,
        "dragend" + CROPPER_NAMESPACE
      ],

      // Functions
      isNumber = function (n) {
        return typeof n === "number";
      },

      getImg = function (src) {
        return '<img src="' + src + '">';
      },

      // Constructor
      Cropper = function (element, options) {
        this.$element = $(element);
        this.setDefaults(options);
        this.init();
      },

      // Others
      round = Math.round,
      min = Math.min,
      max = Math.max,
      abs = Math.abs,
      num = parseFloat;

  Cropper.prototype = {
    constructor: Cropper,

    setDefaults: function (options) {
      options = $.extend({}, Cropper.defaults, $.isPlainObject(options) ? options : {});

      $.each(options, function (i, n) {
        switch (i) {
          case "aspectRatio":
            options[i] = abs(num(n)) || NaN; // 0 -> NaN
            break;

          case "minWidth":
          case "minHeight":
            options[i] = abs(num(n)) || 0; // NaN -> 0
            break;

          case "maxWidth":
          case "maxHeight":
            options[i] = abs(num(n)) || Infinity; // NaN -> Infinity
            break;

          // No default
        }
      });

      this.defaults = options;
    },

    init: function () {
      var _this = this,
          $element = this.$element,
          element = $element[0],
          image = {},
          src,
          $clone;

      if ($element.is("img")) {
        src = $element.attr("src");
      } else if ($element.is("canvas") && element.getContext) {
        src = element.toDataURL();
      }

      if (!src) {
        return;
      }

      this.$clone && this.$clone.remove();
      this.$clone = $clone = $(getImg(src));

      $clone.one("load", function () {
        image.naturalWidth = this.naturalWidth || $clone.width();
        image.naturalHeight = this.naturalHeight || $clone.height();
        image.aspectRatio = image.naturalWidth / image.naturalHeight;

        _this.active = true;
        _this.src = src;
        _this.image = image;
        _this.build();
      });

      // Hide and prepend the clone iamge to the document body (Don't append to).
      $clone.addClass(CLASS_INVISIBLE).prependTo("body");
    },

    build: function () {
      var $element = this.$element,
          defaults = this.defaults,
          buildEvent,
          $cropper;

      if (this.built) {
        this.unbuild();
      }

      buildEvent = $.Event(CROPPER_EVENTS[0]);
      $element.trigger(buildEvent);

      // Trigger the build event manual
      if ($.isFunction(defaults.build)) {
        defaults.build(buildEvent);
      }

      if (buildEvent.isDefaultPrevented()) {
        return;
      }

      // Create cropper elements
      this.$cropper = ($cropper = $(Cropper.template));

      // Hide the original image
      $element.addClass(CLASS_HIDDEN);

      // Show and prepend the clone iamge to the cropper
      this.$clone.removeClass(CLASS_INVISIBLE).prependTo($cropper);

      this.$container = $element.parent();
      this.$container.append($cropper);

      this.$modal = $cropper.find(".cropper-modal");
      this.$canvas = $cropper.find(".cropper-canvas");
      this.$dragger = $cropper.find(".cropper-dragger");
      this.$viewer = $cropper.find(".cropper-viewer");

      // Init default settings
      this.cropped = true;

      if (!defaults.autoCrop) {
        this.$dragger.addClass(CLASS_HIDDEN);
        this.cropped = false;
      }

      this.$modal.toggleClass(CLASS_HIDDEN, !defaults.modal);
      this.$canvas.toggleClass(CLASS_HIDDEN, !defaults.dragCrop);
      !defaults.dashed && this.$dragger.find(".cropper-dashed").addClass(CLASS_HIDDEN);
      !defaults.movable && this.$dragger.find(".cropper-face").addClass(CLASS_HIDDEN);
      !defaults.resizable && this.$dragger.find(".cropper-line, .cropper-point").addClass(CLASS_HIDDEN);

      this.$dragScope = defaults.multiple ? this.$cropper : $document;

      this.addListener();
      this.initPreview();

      this.built = true;
      this.update();
      $element.trigger(CROPPER_EVENTS[1]);
    },

    unbuild: function () {
      if (!this.built) {
        return;
      }

      this.built = false;
      this.removeListener();

      this.$preview.empty();
      this.$preview = NULL;

      this.$dragger = NULL;
      this.$canvas = NULL;
      this.$modal = NULL;
      this.$container = NULL;

      this.$cropper.remove();
      this.$cropper = NULL;
    },

    update: function (data) {
      this.initContainer();
      this.initCropper();
      this.initDragger();

      if (data) {
        this.setData(data, true);
      } else {
        this.setData(this.defaults.data);
      }
    },

    resize: function () {
      clearTimeout(this.resizing);
      this.resizing = setTimeout($.proxy(this.update, this, this.getData()), 200);
    },

    reset: function (deep) {
      if (!this.cropped) {
        return;
      }

      if (deep) {
        this.defaults.data = {};
      }

      this.dragger = this.cloneDragger();
      this.setData(this.defaults.data);
    },

    release: function () {
      if (!this.cropped) {
        return;
      }

      this.cropped = false;

      this.defaults.done({
        x: 0,
        y: 0,
        width: 0,
        height: 0
      });

      this.$modal.addClass(CLASS_HIDDEN);
      this.$dragger.addClass(CLASS_HIDDEN);
    },

    destroy: function () {
      var $element = this.$element;

      if (!this.active) {
        return;
      }

      this.unbuild();
      $element.removeClass(CLASS_HIDDEN);
      $element.removeData("cropper");
      $element = NULL;
    },

    preview: function () {
      var cropper = this.cropper,
          dragger = this.dragger;

      this.$viewer.find("img").css({
        width: round(cropper.width),
        height: round(cropper.height),
        marginLeft: -round(dragger.left),
        marginTop: -round(dragger.top)
      });

      this.$preview.each(function () {
        var $this = $(this),
            ratio = $this.width() / dragger.width,
            styles = {
              width: round(cropper.width * ratio),
              height: round(cropper.height * ratio),
              marginLeft: -round(dragger.left * ratio),
              marginTop: -round(dragger.top * ratio)
            };

        $this.find("img").css(styles);
      });
    },

    addListener: function () {
      var $element = this.$element,
          defaults = this.defaults;

      $.each(CROPPER_EVENTS, function (i, event) {
        var eventHandler = defaults[CROPPER_EVENTS[i].replace(CROPPER_NAMESPACE, "")];

        if ($.isFunction(eventHandler)) {
          $element.on(event, eventHandler);
        }
      });

      this.$cropper.on(EVENT_DRAG_START, $.proxy(this.dragstart, this));

      this.$dragScope.on(EVENT_DRAG_MOVE, $.proxy(this.dragmove, this)).on(EVENT_DRAG_END, $.proxy(this.dragend, this));

      $window.on(EVENT_RESIZE, $.proxy(this.resize, this));
    },

    removeListener: function () {
      var $element = this.$element,
          defaults = this.defaults;

      $.each(CROPPER_EVENTS, function (i, event) {
        var eventHandler = defaults[CROPPER_EVENTS[i].replace(CROPPER_NAMESPACE, "")];

        if ($.isFunction(eventHandler)) {
          $element.off(event, eventHandler);
        }
      });

      this.$cropper.off(EVENT_DRAG_START, this.dragstart);

      this.$dragScope.off(EVENT_DRAG_MOVE, this.dragmove).off(EVENT_DRAG_END, this.dragend);

      $window.off(EVENT_RESIZE, this.resize);
    },

    initPreview: function () {
      var img = getImg(this.src);

      this.$preview = $(this.defaults.preview);
      this.$preview.html(img);
      this.$viewer.html(img);
    },

    initContainer: function () {
      var $container = this.$container;

      this.container = {
        width: $container.width(),
        height: $container.height()
      };
    },

    initCropper: function () {
      var container = this.container,
          image = this.image,
          cropper;

      if (((image.naturalWidth * container.height / image.naturalHeight) - container.width) >= 0) {
        cropper = {
          height: container.width / image.aspectRatio,
          width: container.width,
          left: 0
        };

        cropper.top = (container.height - cropper.height) / 2;
      } else {
        cropper = {
          height: container.height,
          width: container.height * image.aspectRatio,
          top: 0
        };

        cropper.left = (container.width - cropper.width) / 2;
      }

      image.ratio = cropper.width / image.naturalWidth;
      image.height = cropper.height;
      image.width = cropper.width;

      this.$cropper.css({
        width: round(cropper.width),
        height: round(cropper.height),
        left: round(cropper.left),
        top: round(cropper.top)
      });

      this.cropper = cropper;
    },

    initDragger: function () {
      var defaults = this.defaults,
          cropper = this.cropper,
          // If not set, use the original aspect ratio of the image.
          aspectRatio = defaults.aspectRatio || this.image.aspectRatio,
          ratio = this.image.ratio,
          dragger;

      if (((cropper.height * aspectRatio) - cropper.width) >= 0) {
        dragger = {
          height: cropper.width / aspectRatio,
          width: cropper.width,
          left: 0,
          top: (cropper.height - (cropper.width / aspectRatio)) / 2,
          maxWidth: cropper.width,
          maxHeight: cropper.width / aspectRatio
        };
      } else {
        dragger = {
          height: cropper.height,
          width: cropper.height * aspectRatio,
          left: (cropper.width - (cropper.height * aspectRatio)) / 2,
          top: 0,
          maxWidth: cropper.height * aspectRatio,
          maxHeight: cropper.height
        };
      }

      dragger.minWidth = 0;
      dragger.minHeight = 0;

      if (defaults.aspectRatio) {
        if (isFinite(defaults.maxWidth)) {
          dragger.maxWidth = min(dragger.maxWidth, defaults.maxWidth * ratio);
          dragger.maxHeight = dragger.maxWidth / aspectRatio;
        } else if (isFinite(defaults.maxHeight)) {
          dragger.maxHeight = min(dragger.maxHeight, defaults.maxHeight * ratio);
          dragger.maxWidth = dragger.maxHeight * aspectRatio;
        }

        if (defaults.minWidth > 0) {
          dragger.minWidth = max(0, defaults.minWidth * ratio);
          dragger.minHeight = dragger.minWidth / aspectRatio;
        } else if (defaults.minHeight > 0) {
          dragger.minHeight = max(0, defaults.minHeight * ratio);
          dragger.minWidth = dragger.minHeight * aspectRatio;
        }
      } else {
        dragger.maxWidth = min(dragger.maxWidth, defaults.maxWidth * ratio);
        dragger.maxHeight = min(dragger.maxHeight, defaults.maxHeight * ratio);
        dragger.minWidth = max(0, defaults.minWidth * ratio);
        dragger.minHeight = max(0, defaults.minHeight * ratio);
      }

      // minWidth can't be greater than maxWidth, and minHeight too.
      dragger.minWidth = min(dragger.maxWidth, dragger.minWidth);
      dragger.minHeight = min(dragger.maxHeight, dragger.minHeight);

      // Center the dragger by default
      dragger.height *= 0.8;
      dragger.width *= 0.8;
      dragger.left = (cropper.width - dragger.width) / 2;
      dragger.top = (cropper.height - dragger.height) / 2;
      dragger._left = dragger.left;
      dragger._top = dragger.top;

      this.defaultDragger = dragger;
      this.dragger = this.cloneDragger();
    },

    cloneDragger: function () {
      return $.extend({}, this.defaultDragger);
    },

    renderDragger: function () {
      var dragger = this.dragger,
          cropper = this.cropper;

      if (dragger.width > dragger.maxWidth) {
        dragger.width = dragger.maxWidth;
        dragger.left = dragger._left;
      } else if (dragger.width < dragger.minWidth) {
        dragger.width = dragger.minWidth;
        dragger.left = dragger._left;
      }

      if (dragger.height > dragger.maxHeight) {
        dragger.height = dragger.maxHeight;
        dragger.top = dragger._top;
      } else if (dragger.height < dragger.minHeight) {
        dragger.height = dragger.minHeight;
        dragger.top = dragger._top;
      }

      dragger.left = min(max(dragger.left, 0), cropper.width - dragger.width);
      dragger.top = min(max(dragger.top, 0), cropper.height - dragger.height);
      dragger._left = dragger.left;
      dragger._top = dragger.top;

      // Re-render the dragger
      this.dragger = dragger;
      this.defaults.done(this.getData());

      this.$dragger.css({
        width: round(dragger.width),
        height: round(dragger.height),
        left: round(dragger.left),
        top: round(dragger.top)
      });

      this.preview();
    },

    setData: function (data, once) {
      var cropper = this.cropper,
          dragger = this.dragger,
          aspectRatio = this.defaults.aspectRatio;

      if (!this.built || typeof data === "undefined") {
        return;
      }

      if (data === NULL || $.isEmptyObject(data)) {
        dragger = this.cloneDragger();
      }

      if ($.isPlainObject(data) && !$.isEmptyObject(data)) {

        if (!once) {
          this.defaults.data = data;
        }

        data = this.transformData(data);

        if (isNumber(data.x) && data.x <= cropper.width) {
          dragger.left = data.x;
        }

        if (isNumber(data.y) && data.y <= cropper.height) {
          dragger.top = data.y;
        }

        if (aspectRatio) {
          if (isNumber(data.width) && data.width <= dragger.maxWidth && data.width >= dragger.minWidth) {
            dragger.width = data.width;
            dragger.height = dragger.width / aspectRatio;
          } else if (isNumber(data.height) && data.height <= dragger.maxHeight && data.height >= dragger.minHeight) {
            dragger.height = data.height;
            dragger.width = dragger.height * aspectRatio;
          }
        } else {
          if (isNumber(data.width) && data.width <= dragger.maxWidth && data.width >= dragger.minWidth) {
            dragger.width = data.width;
          }

          if (isNumber(data.height) && data.height <= dragger.maxHeight && data.height >= dragger.minHeight) {
            dragger.height = data.height;
          }
        }
      }

      this.dragger = dragger;
      this.renderDragger();
    },

    getData: function () {
      var dragger = this.dragger,
          data = {};

      if (this.built) {
        data = {
          x: dragger.left,
          y: dragger.top,
          width: dragger.width,
          height: dragger.height
        };

        data = this.transformData(data, true);
      }

      return data;
    },

    transformData: function (data, reverse) {
      var ratio = this.image.ratio,
          result = {};

      $.each(data, function (i, n) {
        n = num(n);

        if (REGEXP_OPTIONS.test(i) && !isNaN(n)) {
          // Not round when set data.
          result[i] = reverse ? round(n / ratio) : n * ratio;
        }
      });

      return result;
    },

    setAspectRatio: function (aspectRatio) {
      var freeRatio = aspectRatio === "auto";

      aspectRatio = num(aspectRatio);

      if (freeRatio || (!isNaN(aspectRatio) && aspectRatio > 0)) {
        this.defaults.aspectRatio = freeRatio ? NaN : aspectRatio;

        if (this.built) {
          this.initDragger();
          this.renderDragger();
        }
      }
    },

    setImgSrc: function (src) {
      var _this = this,
          $element = this.$element,
          element = $element[0],
          context;

      if (src && src !== this.src) {
        if ($element.is("img")) {
          $element.attr("src", src);
          this.init();
        } else if ($element.is("canvas") && element.getContext) {
          context = element.getContext("2d");

          $(getImg(src)).one("load", function () {
            element.width = this.width;
            element.height = this.height;
            context.clearRect(0, 0, element.width, element.height);
            context.drawImage(this, 0, 0);
            _this.init();
          });
        }
      }
    },

    getImgInfo: function () {
      return this.image || {};
    },

    dragstart: function (event) {
      var touches = event.originalEvent.touches,
          e = event,
          directive,
          dragStartEvent;

      if (touches) {
        if (touches.length > 1) {
          return;
        }

        e = touches[0];
      }

      directive = $(e.target).data("directive");

      if (REGEXP_DIRECTIVES.test(directive)) {
        event.preventDefault();

        dragStartEvent = $.Event(CROPPER_EVENTS[2]);
        this.$element.trigger(dragStartEvent);

        if (dragStartEvent.isDefaultPrevented()) {
          return;
        }

        this.directive = directive;
        this.startX = e.pageX;
        this.startY = e.pageY;

        if (directive === "+") {
          this.cropping = true;
          this.$modal.removeClass(CLASS_HIDDEN);
        }
      }
    },

    dragmove: function (event) {
      var touches = event.originalEvent.touches,
          e = event,
          dragMoveEvent;

      if (touches) {
        if (touches.length > 1) {
          return;
        }

        e = touches[0];
      }

      if (this.directive) {
        event.preventDefault();

        dragMoveEvent = $.Event(CROPPER_EVENTS[3]);
        this.$element.trigger(dragMoveEvent);

        if (dragMoveEvent.isDefaultPrevented()) {
          return;
        }

        this.endX = e.pageX;
        this.endY = e.pageY;
        this.dragging();
      }
    },

    dragend: function (event) {
      var dragEndEvent;

      if (this.directive) {
        event.preventDefault();

        dragEndEvent = $.Event(CROPPER_EVENTS[4]);
        this.$element.trigger(dragEndEvent);

        if (dragEndEvent.isDefaultPrevented()) {
          return;
        }

        if (this.cropping) {
          this.cropping = false;
          this.$modal.toggleClass(CLASS_HIDDEN, !(this.cropped && this.defaults.modal));
        }

        this.directive = "";
      }
    },

    dragging: function () {
      var directive = this.directive,
          cropper = this.cropper,
          maxWidth = cropper.width,
          maxHeight = cropper.height,
          dragger = this.dragger,
          width = dragger.width,
          height = dragger.height,
          left = dragger.left,
          top = dragger.top,
          right = left + width,
          bottom = top + height,
          renderable = true,
          aspectRatio = this.defaults.aspectRatio,
          range = {
            x: this.endX - this.startX,
            y: this.endY - this.startY
          },
          offset;

      if (aspectRatio) {
        range.X = range.y * aspectRatio;
        range.Y = range.x / aspectRatio;
      }

      switch (directive) {

        // cropping
        case "+":
          if (range.x && range.y) {
            offset = this.$cropper.offset();
            left = this.startX - offset.left;
            top = this.startY - offset.top;
            width = dragger.minWidth;
            height = dragger.minHeight;

            if (range.x > 0) {
              if (range.y > 0) {
                directive = "se";
              } else {
                directive = "ne";
                top -= height;
              }
            } else {
              if (range.y > 0) {
                directive = "sw";
                left -= width;
              } else {
                directive = "nw";
                left -= width;
                top -= height;
              }
            }

            // Show the dragger if is hidden
            if (!this.cropped) {
              this.cropped = true;
              this.$dragger.removeClass(CLASS_HIDDEN);
            }
          }

          break;

        // moving
        case "*":
          left += range.x;
          top += range.y;

          break;

        // resizing
        case "e":
          if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= 0 || bottom >= maxHeight))) {
            renderable = false;
            break;
          }

          width += range.x;

          if (aspectRatio) {
            height = width / aspectRatio;
            top -= range.Y / 2;
          }

          if (width < 0) {
            directive = "w";
            width = 0;
          }

          break;

        case "n":
          if (range.y <= 0 && (top <= 0 || aspectRatio && (left <= 0 || right >= maxWidth))) {
            renderable = false;
            break;
          }

          height -= range.y;
          top += range.y;

          if (aspectRatio) {
            width = height * aspectRatio;
            left += range.X / 2;
          }

          if (height < 0) {
            directive = "s";
            height = 0;
          }

          break;

        case "w":
          if (range.x <= 0 && (left <= 0 || aspectRatio && (top <= 0 || bottom >= maxHeight))) {
            renderable = false;
            break;
          }

          width -= range.x;
          left += range.x;

          if (aspectRatio) {
            height = width / aspectRatio;
            top += range.Y / 2;
          }

          if (width < 0) {
            directive = "e";
            width = 0;
          }

          break;

        case "s":
          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= 0 || right >= maxWidth))) {
            renderable = false;
            break;
          }

          height += range.y;

          if (aspectRatio) {
            width = height * aspectRatio;
            left -= range.X / 2;
          }

          if (height < 0) {
            directive = "n";
            height = 0;
          }

          break;

        case "ne":
          if (range.y <= 0 && (top <= 0 || right >= maxWidth)) {
            renderable = false;
            break;
          }

          height -= range.y;
          top += range.y;

          if (aspectRatio) {
            width = height * aspectRatio;
          } else {
            width += range.x;
          }

          if (height < 0) {
            directive = "sw";
            height = 0;
            width = 0;
          }

          break;

        case "nw":
          if (range.y <= 0 && (top <= 0 || left <= 0)) {
            renderable = false;
            break;
          }

          height -= range.y;
          top += range.y;

          if (aspectRatio) {
            width = height * aspectRatio;
            left += range.X;
          } else {
            width -= range.x;
            left += range.x;
          }

          if (height < 0) {
            directive = "se";
            height = 0;
            width = 0;
          }

          break;

        case "sw":
          if (range.x <= 0 && (left <= 0 || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          width -= range.x;
          left += range.x;

          if (aspectRatio) {
            height = width / aspectRatio;
          } else {
            height += range.y;
          }

          if (width < 0) {
            directive = "ne";
            height = 0;
            width = 0;
          }

          break;

        case "se":
          if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          width += range.x;

          if (aspectRatio) {
            height = width / aspectRatio;
          } else {
            height += range.y;
          }

          if (width < 0) {
            directive = "nw";
            height = 0;
            width = 0;
          }

          break;

        // No default
      }

      if (renderable) {
        dragger.width = width;
        dragger.height = height;
        dragger.left = left;
        dragger.top = top;
        this.directive = directive;

        this.renderDragger();
      }

      // Override
      this.startX = this.endX;
      this.startY = this.endY;
    }
  };

  // Use the string compressor: Strmin (https://github.com/fengyuanchen/strmin)
  Cropper.template = (function (source, words) {
    words = words.split(",");
    return source.replace(/\d+/g, function (i) {
      return words[i];
    });
  })('<0 6="5-container"><0 6="5-modal"></0><0 6="5-canvas" 3-2="+"></0><0 6="5-dragger"><1 6="5-viewer"></1><1 6="5-8 8-h"></1><1 6="5-8 8-v"></1><1 6="5-face" 3-2="*"></1><1 6="5-7 7-e" 3-2="e"></1><1 6="5-7 7-n" 3-2="n"></1><1 6="5-7 7-w" 3-2="w"></1><1 6="5-7 7-s" 3-2="s"></1><1 6="5-4 4-e" 3-2="e"></1><1 6="5-4 4-n" 3-2="n"></1><1 6="5-4 4-w" 3-2="w"></1><1 6="5-4 4-s" 3-2="s"></1><1 6="5-4 4-ne" 3-2="ne"></1><1 6="5-4 4-nw" 3-2="nw"></1><1 6="5-4 4-sw" 3-2="sw"></1><1 6="5-4 4-se" 3-2="se"></1></0></0>', "div,span,directive,data,point,cropper,class,line,dashed");

  /* Template source:
  <div class="cropper-container">
    <div class="cropper-modal"></div>
    <div class="cropper-canvas" data-directive="+"></div>
    <div class="cropper-dragger">
      <span class="cropper-viewer"></span>
      <span class="cropper-dashed dashed-h"></span>
      <span class="cropper-dashed dashed-v"></span>
      <span class="cropper-face" data-directive="*"></span>
      <span class="cropper-line line-e" data-directive="e"></span>
      <span class="cropper-line line-n" data-directive="n"></span>
      <span class="cropper-line line-w" data-directive="w"></span>
      <span class="cropper-line line-s" data-directive="s"></span>
      <span class="cropper-point point-e" data-directive="e"></span>
      <span class="cropper-point point-n" data-directive="n"></span>
      <span class="cropper-point point-w" data-directive="w"></span>
      <span class="cropper-point point-s" data-directive="s"></span>
      <span class="cropper-point point-ne" data-directive="ne"></span>
      <span class="cropper-point point-nw" data-directive="nw"></span>
      <span class="cropper-point point-sw" data-directive="sw"></span>
      <span class="cropper-point point-se" data-directive="se"></span>
    </div>
  </div>
  */

  Cropper.defaults = {
    // Basic
    aspectRatio: "auto",
    data: {}, // Contains properties: x, y, width, height
    done: $.noop,
    preview: UNDEFINED,

    // Toggles
    multiple: false,
    autoCrop: true,
    dragCrop: true,
    dashed: true,
    modal: true,
    movable: true,
    resizable: true,

    // Dimensions
    minWidth: 0,
    minHeight: 0,
    maxWidth: Infinity,
    maxHeight: Infinity,

    // Event handlers
    build: UNDEFINED,
    built: UNDEFINED,
    dragstart: UNDEFINED,
    dragmove: UNDEFINED,
    dragend: UNDEFINED
  };

  Cropper.setDefaults = function (options) {
    $.extend(Cropper.defaults, options);
  };

  // Reference the other cropper
  Cropper.other = $.fn.cropper;

  // Register as jQuery plugin
  $.fn.cropper = function (options) {
    var args = [].slice.call(arguments, 1),
        result;

    this.each(function () {
      var $this = $(this),
          data = $this.data("cropper"),
          fn;

      if (!data) {
        $this.data("cropper", (data = new Cropper(this, options)));
      }

      if (typeof options === "string" && $.isFunction((fn = data[options]))) {
        result = fn.apply(data, args);
      }
    });

    return (typeof result !== "undefined" ? result : this);
  };

  $.fn.cropper.constructor = Cropper;
  $.fn.cropper.setDefaults = Cropper.setDefaults;

  // No conflict
  $.fn.cropper.noConflict = function () {
    $.fn.cropper = Cropper.other;
    return this;
  };
});
