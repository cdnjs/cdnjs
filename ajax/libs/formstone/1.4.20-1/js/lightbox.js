/*! formstone v1.4.20-1 [lightbox.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core",
        "./touch",
        "./transition",
        "./viewer"
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
      $Body = Formstone.$body;
      $Locks = $("html, body");

      OnLoad = Formstone.window.location.hash.replace("#", "");
    }

    /**
     * @method private
     * @name resize
     * @description Handles window resize
     */

    function resize() {
      if (Instance) {
        resizeLightbox();
      }
    }

    /**
     * @method private
     * @name construct
     * @description Builds instance.
     * @param data [object] "Instance data"
     */

    function construct(data) {
      this.on(Events.click, data, buildLightbox);

      var gallery = this.data(Namespace + "-gallery");

      if (!OnLoaded && OnLoad && gallery === OnLoad) {
        OnLoaded = true;

        this.trigger(Events.click);
      }
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      closeLightbox();

      this.off(Events.namespace);
    }

    /**
     * @method private
     * @name initialize
     * @description Builds instance from $target.
     * @param $target [jQuery] "Target jQuery object"
     */

    function initialize($target, options) {
      if ($target instanceof $) {

        // Emulate event

        buildLightbox.apply(Window, [{
          data: $.extend(true, {}, {
            $object: $target
          }, Defaults, options || {})
        }]);
      }
    }

    /**
     * @method private
     * @name buildLightbox
     * @description Builds new lightbox.
     * @param e [object] "Event data"
     */

    function buildLightbox(e) {
      if (!Instance) {
        var data = e.data;

        // if (data.mobile === false) {
        //   data.overlay = false;
        // }

        // Cache internal data
        Instance = $.extend({}, {
          visible: false,
          gallery: {
            active: false
          },
          isMobile: ((Formstone.isMobile && data.mobile !== false) || data.overlay),
          isTouch: Formstone.support.touch,
          isAnimating: true,
          isZooming: false,
          oldContentHeight: 0,
          oldContentWidth: 0,
          metaHeight: 0,
          thumbnailHeight: 0,
          captionOpen: false,
          thumbnailsOpen: false,
          tapTimer: null
        }, data);

        Instance.isViewer = (Instance.isMobile && data.viewer && typeof $.fn.fsViewer !== "undefined");

        // Check target type
        var $el = data.$el,
          $object = data.$object,
          source = ($el && $el[0].href) ? $el[0].href || "" : "",
          hash = ($el && $el[0].hash) ? $el[0].hash || "" : "",
          sourceParts = source.toLowerCase().split(".").pop().split(/\#|\?/),
          type = ($el) ? $el.data(Namespace + "-type") : "",
          isImage = ((type === "image") || (source.match(data.fileTypes) || source.substr(0, 10) === "data:image")),
          isVideo = checkVideo(source),
          isUrl = ((type === "url") || (!isImage && !isVideo && source.substr(0, 4) === "http" && !hash)),
          isElement = ((type === "element") || (!isImage && !isVideo && !isUrl && (hash.substr(0, 1) === "#"))),
          isObject = ((typeof $object !== "undefined"));

        if (isElement) {
          source = hash;
        }

        // Retain default click
        if (!(isImage || isVideo || isUrl || isElement || isObject)) {
          Instance = null;

          return;
        }

        // Kill event
        Functions.killEvent(e);

        // Double the margin
        Instance.margin *= 2;

        if (isImage) {
          Instance.type = "image";
        } else if (isVideo) {
          Instance.type = "video";
        } else {
          Instance.type = "element";
        }

        // if (isImage || isVideo) {
        if ($el && $el.length) {
          // Check for gallery
          var id = $el.data(Namespace + "-gallery");

          if (id) {
            Instance.gallery.active = true;
            Instance.gallery.id = id;
            Instance.gallery.$items = $("a[data-lightbox-gallery= " + Instance.gallery.id + "], a[rel= " + Instance.gallery.id + "]"); // backwards compatibility
            Instance.gallery.index = Instance.gallery.$items.index(Instance.$el);
            Instance.gallery.total = Instance.gallery.$items.length - 1;
          }
        }

        // Thumbnails support
        if (!(Instance.thumbnails && (isImage || isVideo) && Instance.gallery.active)) {
          Instance.thumbnails = false;
        }

        // Assemble HTML
        var html = '';
        if (!Instance.isMobile) {
          html += '<div class="' + [RawClasses.overlay, Instance.theme, Instance.customClass].join(" ") + '"></div>';
        }
        var lightboxClasses = [
          RawClasses.base,
          RawClasses.loading,
          RawClasses.animating,
          Instance.theme,
          Instance.customClass
        ];

        if (Instance.fixed) {
          lightboxClasses.push(RawClasses.fixed);
        }
        if (Instance.isMobile) {
          lightboxClasses.push(RawClasses.mobile);
        }
        if (Instance.isTouch) {
          lightboxClasses.push(RawClasses.touch);
        }
        if (isUrl) {
          lightboxClasses.push(RawClasses.iframed);
        }
        if (isElement || isObject) {
          lightboxClasses.push(RawClasses.inline);
        }
        if (Instance.thumbnails) {
          lightboxClasses.push(RawClasses.thumbnailed);
        }

        Instance.labels.lightbox = Instance.labels.lightbox.replace('{guid}', data.numGuid);

        html += '<div class="' + lightboxClasses.join(" ") + '" role="dialog" aria-label="' + Instance.labels.lightbox + '" tabindex="-1">';
        html += '<button type="button" class="' + RawClasses.close + '">' + Instance.labels.close + '</button>';
        html += '<span class="' + RawClasses.loading_icon + '"></span>';
        html += '<div class="' + RawClasses.container + '">';

        // Thumbnails
        if (Instance.gallery.active && Instance.thumbnails) {
          html += '<div class="' + [RawClasses.thumbnails] + '">';
          html += '<div class="' + [RawClasses.thumbnail_container] + '">';

          var $item,
            thumb;

          for (var i = 0, count = Instance.gallery.$items.length; i < count; i++) {
            $item = Instance.gallery.$items.eq(i);
            thumb = $item.data("lightbox-thumbnail");

            if (!thumb) {
              thumb = $item.find("img").attr("src");
            }

            html += '<button class="' + [RawClasses.thumbnail_item] + '">';
            html += '<img src="' + thumb + '" alt="">';
            html += '</button>';
          }

          html += '</div></div>';
        }

        html += '<div class="' + RawClasses.content + '"></div>';

        if (isImage || isVideo) {

          html += '<div class="' + RawClasses.tools + '">';

          html += '<div class="' + RawClasses.controls + '">';
          if (Instance.gallery.active) {
            html += '<button type="button" class="' + [RawClasses.control, RawClasses.control_previous].join(" ") + '">' + Instance.labels.previous + '</button>';
            html += '<button type="button" class="' + [RawClasses.control, RawClasses.control_next].join(" ") + '">' + Instance.labels.next + '</button>';
          }
          if (Instance.isMobile && Instance.isTouch) {
            html += '<button type="button" class="' + [RawClasses.toggle, RawClasses.caption_toggle].join(" ") + '">' + Instance.labels.captionClosed + '</button>';

            if (Instance.gallery.active && Instance.thumbnails) {
              html += '<button type="button" class="' + [RawClasses.toggle, RawClasses.thumbnail_toggle].join(" ") + '">' + Instance.labels.thumbnailsClosed + '</button>';
            }
          }
          html += '</div>'; // controls

          html += '<div class="' + RawClasses.meta + '">';
          html += '<div class="' + RawClasses.meta_content + '">';
          if (Instance.gallery.active) {
            html += '<p class="' + RawClasses.position + '"';
            if (Instance.gallery.total < 1) {
              html += ' style="display: none;"';
            }
            html += '>';
            html += '<span class="' + RawClasses.position_current + '">' + (Instance.gallery.index + 1) + '</span> ';
            html += Instance.labels.count;
            html += ' <span class="' + RawClasses.position_total + '">' + (Instance.gallery.total + 1) + '</span>';
            html += '</p>';
          }
          html += '<div class="' + RawClasses.caption + '">';
          html += Instance.formatter.call($el, data);
          html += '</div></div></div>'; // caption, meta_content, meta

          html += '</div>'; // tools
        } else {
          // Other galleries
          if (Instance.gallery.active) {
            html += '<div class="' + RawClasses.tools + '">';

            html += '<div class="' + RawClasses.controls + '">';

            html += '<button type="button" class="' + [RawClasses.control, RawClasses.control_previous].join(" ") + '">' + Instance.labels.previous + '</button>';
            html += '<button type="button" class="' + [RawClasses.control, RawClasses.control_next].join(" ") + '">' + Instance.labels.next + '</button>';

            html += '</div>';

            html += '</div>';
          }
        }
        html += '</div></div>'; //container, content, lightbox

        // Modify Dom
        $Body.append(html);

        // Cache jquery objects
        Instance.$overlay = $(Classes.overlay);
        Instance.$lightbox = $(Classes.base);
        Instance.$close = $(Classes.close);
        Instance.$container = $(Classes.container);
        Instance.$content = $(Classes.content);
        Instance.$tools = $(Classes.tools);
        Instance.$meta = $(Classes.meta);
        Instance.$metaContent = $(Classes.meta_content);
        Instance.$position = $(Classes.position);
        Instance.$caption = $(Classes.caption);
        Instance.$controlBox = $(Classes.controls);
        Instance.$controls = $(Classes.control);
        Instance.$thumbnails = $(Classes.thumbnails);
        Instance.$thumbnailContainer = $(Classes.thumbnail_container);
        Instance.$thumbnailItems = $(Classes.thumbnail_item);

        if (Instance.isMobile) {
          Instance.paddingVertical = Instance.$close.outerHeight();
          Instance.paddingHorizontal = 0;

          Instance.mobilePaddingVertical = parseInt(Instance.$content.css("paddingTop"), 10) + parseInt(Instance.$content.css("paddingBottom"), 10);
          Instance.mobilePaddingHorizontal = parseInt(Instance.$content.css("paddingLeft"), 10) + parseInt(Instance.$content.css("paddingRight"), 10);
        } else {
          Instance.paddingVertical = parseInt(Instance.$lightbox.css("paddingTop"), 10) + parseInt(Instance.$lightbox.css("paddingBottom"), 10);
          Instance.paddingHorizontal = parseInt(Instance.$lightbox.css("paddingLeft"), 10) + parseInt(Instance.$lightbox.css("paddingRight"), 10);

          Instance.mobilePaddingVertical = 0;
          Instance.mobilePaddingHorizontal = 0;
        }

        Instance.contentHeight = Instance.$lightbox.outerHeight() - Instance.paddingVertical;
        Instance.contentWidth = Instance.$lightbox.outerWidth() - Instance.paddingHorizontal;
        Instance.controlHeight = Instance.$controls.outerHeight();

        // Center
        centerLightbox();

        // Update gallery
        if (Instance.gallery.active) {
          Instance.$lightbox.addClass(RawClasses.has_controls);
          updateGalleryControls();
        }

        // Bind events
        $Window.on(Events.keyDown, onKeyDown);
        $Body.on(Events.click, [Classes.overlay, Classes.close].join(", "), closeLightbox)
          .on([Events.focus, Events.focusIn].join(" "), onDocumentFocus);

        if (Instance.gallery.active) {
          Instance.$lightbox.on(Events.click, Classes.control, advanceGallery);
        }

        if (Instance.thumbnails) {
          Instance.$lightbox.on(Events.click, Classes.thumbnail_item, jumpGallery);
        }

        if (Instance.isMobile && Instance.isTouch) {
          Instance.$lightbox.on(Events.click, Classes.caption_toggle, toggleCaption)
            .on(Events.click, Classes.thumbnail_toggle, toggleThumbnails);
        }

        Instance.$lightbox.fsTransition({
            property: "opacity"
          },
          function() {
            if (isImage) {
              loadImage(source);
            } else if (isVideo) {
              loadVideo(source);
            } else if (isUrl) {
              loadURL(source);
            } else if (isElement) {
              appendContents(source);
            } else if (isObject) {
              appendObject(Instance.$object);
            }
          }).addClass(RawClasses.open);

        Instance.$overlay.addClass(RawClasses.open);
      }
    }

    /**
     * @method
     * @name resize
     * @description Resizes lightbox.
     * @example $.lightbox("resize");
     * @param height [int | false] "Target height or false to auto size"
     * @param width [int | false] "Target width or false to auto size"
     */

    /**
     * @method private
     * @name resizeLightbox
     * @description Triggers resize of instance.
     */

    function resizeLightbox(e) {
      if (typeof e !== "object") {
        Instance.targetHeight = arguments[0];
        Instance.targetWidth = arguments[1];
      }

      if (Instance.type === "element") {
        sizeContent(Instance.$content.find("> :first-child"));
      } else if (Instance.type === "image") {
        sizeImage();
      } else if (Instance.type === "video") {
        sizeVideo();
      }

      sizeLightbox();
    }

    /**
     * @method
     * @name close
     * @description Closes active instance.
     * @example $.lightbox("close");
     */

    /**
     * @method private
     * @name closeLightbox
     * @description Closes active instance.
     * @param e [object] "Event data"
     */

    function closeLightbox(e) {
      Functions.killEvent(e);

      if (Instance) {
        Instance.$lightbox.fsTransition("destroy");
        Instance.$content.fsTransition("destroy");

        Instance.$lightbox.addClass(RawClasses.animating).fsTransition({
            property: "opacity"
          },
          function(e) {
            // Clean up
            if (typeof Instance.$inlineTarget !== 'undefined' && Instance.$inlineTarget.length) {
              restoreContents();
            }

            if (Instance.isViewer && Instance.$imageContainer && Instance.$imageContainer.length) {
              Instance.$imageContainer.fsViewer("destroy");
            }

            Instance.$lightbox.off(Events.namespace);
            Instance.$container.off(Events.namespace);
            $Window.off(Events.keyDown);
            $Body.off(Events.namespace);
            $Body.off(Events.namespace);

            Instance.$overlay.remove();
            Instance.$lightbox.remove();

            if (typeof Instance.$el !== "undefined" && Instance.$el && Instance.$el.length) {
              Instance.$el.focus();
            }

            // Reset Instance
            Instance = null;

            $Window.trigger(Events.close);
          });

        Instance.$lightbox.removeClass(RawClasses.open);
        Instance.$overlay.removeClass(RawClasses.open);

        if (Instance.isMobile) {
          $Locks.removeClass(RawClasses.lock);

          Functions.unlockViewport(Namespace);
        }
      }
    }

    /**
     * @method private
     * @name openLightbox
     * @description Opens active instance.
     */

    function openLightbox() {
      var position = calculatePosition(),
        durration = Instance.isMobile ? 0 : Instance.duration;

      if (Instance.isMobile) {
        Functions.lockViewport(Namespace);
      } else {
        Instance.$controls.css({
          marginTop: ((Instance.contentHeight - Instance.controlHeight - Instance.metaHeight + Instance.thumbnailHeight) / 2)
        });
      }

      if (Instance.$caption.html() === "") {
        Instance.$caption.hide();
        Instance.$lightbox.removeClass(RawClasses.has_caption);

        if (!Instance.gallery.active) {
          Instance.$tools.hide();
        }
      } else {
        Instance.$caption.show();
        Instance.$lightbox.addClass(RawClasses.has_caption);
      }

      Instance.$lightbox.fsTransition({
          property: (Instance.contentHeight !== Instance.oldContentHeight) ? "height" : "width"
        },
        function() {
          Instance.$content.fsTransition({
              property: "opacity"
            },
            function() {
              Instance.$lightbox.removeClass(RawClasses.animating);
              Instance.isAnimating = false;
            });

          Instance.$lightbox.removeClass(RawClasses.loading)
            .addClass(RawClasses.ready);

          Instance.visible = true;

          // Fire open event
          $Window.trigger(Events.open, [{ instance: Instance }]);

          // Start preloading
          if (Instance.gallery.active) {
            if (Instance.type == 'element') {

            } else {
              preloadGallery();
              updateThumbnails();
              positionThumbnails();
            }
          }

          // Focus
          Instance.$lightbox.focus();
        });

      if (!Instance.isMobile) {
        Instance.$lightbox.css({
          height: Instance.contentHeight + Instance.paddingVertical,
          width: Instance.contentWidth + Instance.paddingHorizontal,
          top: (!Instance.fixed) ? position.top : 0
        });
      }

      // Trigger event in case the content size hasn't changed
      var contentHasChanged = (Instance.oldContentHeight !== Instance.contentHeight || Instance.oldContentWidth !== Instance.contentWidth);

      if (Instance.isMobile || !contentHasChanged) {
        Instance.$lightbox.fsTransition("resolve");
      }

      // Track content size changes
      Instance.oldContentHeight = Instance.contentHeight;
      Instance.oldContentWidth = Instance.contentWidth;

      if (Instance.isMobile) {
        $Locks.addClass(RawClasses.lock);
      }
    }

    /**
     * @method private
     * @name sizeLightbox
     * @description Sizes active instance.
     */

    function sizeLightbox() {
      if (Instance.visible && !Instance.isMobile) {
        var position = calculatePosition();

        Instance.$controls.css({
          marginTop: ((Instance.contentHeight - Instance.controlHeight - Instance.metaHeight + Instance.thumbnailHeight) / 2)
        });

        Instance.$lightbox.css({
          height: Instance.contentHeight + Instance.paddingVertical,
          width: Instance.contentWidth + Instance.paddingHorizontal,
          top: (!Instance.fixed) ? position.top : 0
        });

        Instance.oldContentHeight = Instance.contentHeight;
        Instance.oldContentWidth = Instance.contentWidth;
      }
    }

    /**
     * @method private
     * @name centerLightbox
     * @description Centers instance.
     */

    function centerLightbox() {
      var position = calculatePosition();

      Instance.$lightbox.css({
        top: (!Instance.fixed) ? position.top : 0
      });
    }

    /**
     * @method private
     * @name calculatePosition
     * @description Calculates positions.
     * @return [object] "Object containing top and left positions"
     */

    function calculatePosition() {
      if (Instance.isMobile) {
        return {
          left: 0,
          top: 0
        };
      }

      var pos = {
        left: (Formstone.windowWidth - Instance.contentWidth - Instance.paddingHorizontal) / 2,
        top: (Instance.top <= 0) ? ((Formstone.windowHeight - Instance.contentHeight - Instance.paddingVertical) / 2) : Instance.top
      };

      if (Instance.fixed !== true) {
        pos.top += $Window.scrollTop();
      }

      return pos;
    }


    /**
     * @method private
     * @name toggleCaption
     * @description Toggle caption.
     */

    function toggleCaption(e) {
      Functions.killEvent(e);

      if (Instance.captionOpen) {
        closeCaption();
      } else {
        closeThumbnails();

        var height = parseInt(Instance.$metaContent.outerHeight(true));
        height += parseInt(Instance.$meta.css("padding-top"));
        height += parseInt(Instance.$meta.css("padding-bottom"));

        Instance.$meta.css({
          height: height
        });

        Instance.$lightbox.addClass(RawClasses.caption_open)
          .find(Classes.caption_toggle).text(Instance.labels.captionOpen);

        Instance.captionOpen = true;
      }
    }

    /**
     * @method private
     * @name closeCaption
     * @description Close caption.
     */

    function closeCaption() {
      Instance.$lightbox.removeClass(RawClasses.caption_open)
        .find(Classes.caption_toggle).text(Instance.labels.captionClosed);
      Instance.captionOpen = false;
    }

    /**
     * @method private
     * @name formatCaption
     * @description Formats caption.
     * @param $target [jQuery object] "Target element"
     */

    function formatCaption() {
      var title = this.attr("title"),
        t = (title !== undefined && title) ? title.replace(/^\s+|\s+$/g, '') : false;

      return t ? '<p class="caption">' + t + '</p>' : "";
    }

    /**
     * @method private
     * @name toggleThumbnails
     * @description Toggle thumbnails.
     */

    function toggleThumbnails(e) {
      Functions.killEvent(e);

      if (Instance.thumbnailsOpen) {
        closeThumbnails();
      } else {
        closeCaption();

        Instance.$lightbox.addClass(RawClasses.thumbnails_open)
          .find(Classes.thumbnail_toggle).text(Instance.labels.thumbnailsOpen);

        Instance.thumbnailsOpen = true;
      }
    }

    /**
     * @method private
     * @name closeThumbnails
     * @description Close thumbnails.
     */

    function closeThumbnails() {
      Instance.$lightbox.removeClass(RawClasses.thumbnails_open)
        .find(Classes.thumbnail_toggle).text(Instance.labels.thumbnailsClosed);
      Instance.thumbnailsOpen = false;
    }

    /**
     * @method private
     * @name loadImage
     * @description Loads source image.
     * @param source [string] "Source image URL"
     */

    function loadImage(source) {
      if (Instance.isViewer) {
        Instance.$imageContainer = $('<div class="' + RawClasses.image_container + '"><img></div>');
        Instance.$image = Instance.$imageContainer.find("img");

        Instance.$image.attr("src", source)
          .addClass(RawClasses.image);

        Instance.$content.prepend(Instance.$imageContainer);

        sizeImage();

        Instance.$imageContainer.one("loaded.viewer", function() {
          openLightbox();
        }).fsViewer({
          theme: Instance.theme
        });
      } else {
        // Cache current image
        Instance.$imageContainer = $('<div class="' + RawClasses.image_container + '"><img></div>');
        Instance.$image = Instance.$imageContainer.find("img");

        Instance.$image.one(Events.load, function() {
            var naturalSize = calculateNaturalSize(Instance.$image);

            Instance.naturalHeight = naturalSize.naturalHeight;
            Instance.naturalWidth = naturalSize.naturalWidth;

            if (Instance.retina) {
              Instance.naturalHeight /= 2;
              Instance.naturalWidth /= 2;
            }

            Instance.$content.prepend(Instance.$imageContainer);

            // Size content to be sure it fits the viewport
            sizeImage();

            openLightbox();
          }).on(Events.error, loadError)
          .attr("src", source)
          .addClass(RawClasses.image);

        // If image has already loaded into cache, trigger load event
        if (Instance.$image[0].complete || Instance.$image[0].readyState === 4) {
          Instance.$image.trigger(Events.load);
        }
      }
    }

    /**
     * @method private
     * @name sizeImage
     * @description Sizes image to fit in viewport.
     * @param count [int] "Number of resize attempts"
     */

    function sizeImage() {
      if (Instance.$image) {
        var count = 0;

        Instance.windowHeight = Instance.viewportHeight = Formstone.windowHeight - Instance.mobilePaddingVertical - Instance.paddingVertical;
        Instance.windowWidth = Instance.viewportWidth = Formstone.windowWidth - Instance.mobilePaddingHorizontal - Instance.paddingHorizontal;

        Instance.contentHeight = Infinity;
        Instance.contentWidth = Infinity;

        Instance.imageMarginTop = 0;
        Instance.imageMarginLeft = 0;

        while (Instance.contentHeight > Instance.viewportHeight && count < 2) {
          Instance.imageHeight = (count === 0) ? Instance.naturalHeight : Instance.$image.outerHeight();
          Instance.imageWidth = (count === 0) ? Instance.naturalWidth : Instance.$image.outerWidth();
          Instance.metaHeight = (count === 0) ? 0 : Instance.metaHeight;
          Instance.spacerHeight = (count === 0) ? 0 : Instance.spacerHeight;
          Instance.thumbnailHeight = (count === 0) ? 0 : Instance.thumbnailHeight;

          if (count === 0) {
            Instance.ratioHorizontal = Instance.imageHeight / Instance.imageWidth;
            Instance.ratioVertical = Instance.imageWidth / Instance.imageHeight;

            Instance.isWide = (Instance.imageWidth > Instance.imageHeight);
          }

          // Double check min and max
          if (Instance.imageHeight < Instance.minHeight) {
            Instance.minHeight = Instance.imageHeight;
          }
          if (Instance.imageWidth < Instance.minWidth) {
            Instance.minWidth = Instance.imageWidth;
          }

          if (Instance.isMobile) {
            if (Instance.isTouch) {
              Instance.$controlBox.css({
                width: Formstone.windowWidth
              });
              Instance.spacerHeight = Instance.$controls.outerHeight(true);
            } else {
              Instance.$tools.css({
                width: Formstone.windowWidth
              });
              Instance.spacerHeight = Instance.$tools.outerHeight(true);
            }

            // Content match viewport
            Instance.contentHeight = Instance.viewportHeight;
            Instance.contentWidth = Instance.viewportWidth;

            if (!Instance.isTouch) {
              Instance.$content.css({
                height: Instance.contentHeight - Instance.spacerHeight // - 10
              });
            }

            if (Instance.$thumbnails.length) {
              Instance.spacerHeight += Instance.$thumbnails.outerHeight(true);
            }
            Instance.spacerHeight += 10;

            fitImage();

            Instance.imageMarginTop = (Instance.contentHeight - Instance.targetImageHeight - Instance.spacerHeight) / 2;
            Instance.imageMarginLeft = (Instance.contentWidth - Instance.targetImageWidth) / 2;
          } else {
            // Viewport should match window, less margin, padding and meta
            if (count === 0) {
              Instance.viewportHeight -= (Instance.margin + Instance.paddingVertical);
              Instance.viewportWidth -= (Instance.margin + Instance.paddingHorizontal);
            }
            Instance.viewportHeight -= Instance.metaHeight;

            if (Instance.thumbnails) {
              Instance.viewportHeight -= Instance.thumbnailHeight;
            }

            fitImage();

            Instance.contentHeight = Instance.targetImageHeight;
            Instance.contentWidth = Instance.targetImageWidth;
          }

          // Modify DOM
          if (!Instance.isMobile && !Instance.isTouch) {
            Instance.$meta.css({
              width: Instance.contentWidth
            });
          }

          Instance.$image.css({
            height: Instance.targetImageHeight,
            width: Instance.targetImageWidth,
            marginTop: Instance.imageMarginTop,
            marginLeft: Instance.imageMarginLeft
          });

          if (!Instance.isMobile) {
            Instance.metaHeight = Instance.$meta.outerHeight(true);
            Instance.contentHeight += Instance.metaHeight;
          }

          if (Instance.thumbnails) {
            Instance.thumbnailHeight = Instance.$thumbnails.outerHeight(true);
            Instance.contentHeight += Instance.thumbnailHeight;
          }

          count++;
        }
      }
    }

    /**
     * @method private
     * @name fitImage
     * @description Calculates target image size.
     */

    function fitImage() {
      var height = (!Instance.isMobile) ? Instance.viewportHeight : Instance.contentHeight - Instance.spacerHeight,
        width = (!Instance.isMobile) ? Instance.viewportWidth : Instance.contentWidth;

      if (Instance.isWide) {
        // WIDE
        Instance.targetImageWidth = width;
        Instance.targetImageHeight = Instance.targetImageWidth * Instance.ratioHorizontal;

        if (Instance.targetImageHeight > height) {
          Instance.targetImageHeight = height;
          Instance.targetImageWidth = Instance.targetImageHeight * Instance.ratioVertical;
        }
      } else {
        // TALL
        Instance.targetImageHeight = height;
        Instance.targetImageWidth = Instance.targetImageHeight * Instance.ratioVertical;

        if (Instance.targetImageWidth > width) {
          Instance.targetImageWidth = width;
          Instance.targetImageHeight = Instance.targetImageWidth * Instance.ratioHorizontal;
        }
      }

      // MAX
      if (Instance.targetImageWidth > Instance.imageWidth || Instance.targetImageHeight > Instance.imageHeight) {
        Instance.targetImageHeight = Instance.imageHeight;
        Instance.targetImageWidth = Instance.imageWidth;
      }

      // MIN
      if (Instance.targetImageWidth < Instance.minWidth || Instance.targetImageHeight < Instance.minHeight) {
        if (Instance.targetImageWidth < Instance.minWidth) {
          Instance.targetImageWidth = Instance.minWidth;
          Instance.targetImageHeight = Instance.targetImageWidth * Instance.ratioHorizontal;
        } else {
          Instance.targetImageHeight = Instance.minHeight;
          Instance.targetImageWidth = Instance.targetImageHeight * Instance.ratioVertical;
        }
      }
    }

    /**
     * @method private
     * @name loadVideo
     * @description Loads source video.
     * @param source [string] "Source video URL"
     */

    function formatYouTube(parts) {
      return "//www.youtube.com/embed/" + parts[1];
    }

    function formatVimeo(parts) {
      return "//player.vimeo.com/video/" + parts[3];
    }

    function loadVideo(source) {
      var parts,
        url = checkVideo(source),
        queryString = source.split("?"),
        origin = '&origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.hostname);

      if (url) {
        // if we have a query string
        if (queryString.length >= 2) {
          url += "?" + queryString.slice(1)[0].trim();
        }

        Instance.$videoWrapper = $('<div class="' + RawClasses.video_wrapper + '"></div>');
        Instance.$video = $('<iframe class="' + RawClasses.video + '" frameborder="0" seamless="seamless" allowfullscreen></iframe>');

        Instance.$video.attr("src", url + '&enablejsapi=1' + origin)
          .addClass(RawClasses.video)
          .prependTo(Instance.$videoWrapper);

        Instance.$content.prepend(Instance.$videoWrapper);

        sizeVideo();
        openLightbox();
      } else {
        loadError();
      }
    }

    /**
     * @method private
     * @name sizeVideo
     * @description Sizes video to fit in viewport.
     */

    function sizeVideo() {
      // Set initial vars
      Instance.windowHeight = Instance.viewportHeight = Formstone.windowHeight - Instance.mobilePaddingVertical - Instance.paddingVertical;
      Instance.windowWidth = Instance.viewportWidth = Formstone.windowWidth - Instance.mobilePaddingHorizontal - Instance.paddingHorizontal;
      Instance.videoMarginTop = 0;
      Instance.videoMarginLeft = 0;

      if (Instance.isMobile) {
        if (Instance.isTouch) {
          Instance.$controlBox.css({
            width: Formstone.windowWidth
          });
          Instance.spacerHeight = Instance.$controls.outerHeight(true) + 10;
        } else {
          Instance.$tools.css({
            width: Formstone.windowWidth
          });
          Instance.spacerHeight = Instance.$tools.outerHeight(true);
          Instance.spacerHeight += Instance.$thumbnails.outerHeight(true) + 10;
        }

        Instance.viewportHeight -= Instance.spacerHeight;

        Instance.targetVideoWidth = Instance.viewportWidth;
        Instance.targetVideoHeight = Instance.targetVideoWidth * Instance.videoRatio;

        if (Instance.targetVideoHeight > Instance.viewportHeight) {
          Instance.targetVideoHeight = Instance.viewportHeight;
          Instance.targetVideoWidth = Instance.targetVideoHeight / Instance.videoRatio;
        }

        Instance.videoMarginTop = (Instance.viewportHeight - Instance.targetVideoHeight) / 2;
        Instance.videoMarginLeft = (Instance.viewportWidth - Instance.targetVideoWidth) / 2;
      } else {
        Instance.viewportHeight = Instance.windowHeight - Instance.margin;
        Instance.viewportWidth = Instance.windowWidth - Instance.margin;

        Instance.targetVideoWidth = (Instance.videoWidth > Instance.viewportWidth) ? Instance.viewportWidth : Instance.videoWidth;
        if (Instance.targetVideoWidth < Instance.minWidth) {
          Instance.targetVideoWidth = Instance.minWidth;
        }
        Instance.targetVideoHeight = Instance.targetVideoWidth * Instance.videoRatio;

        Instance.contentHeight = Instance.targetVideoHeight;
        Instance.contentWidth = Instance.targetVideoWidth;
      }

      // Update dom
      if (!Instance.isMobile && !Instance.isTouch) {
        Instance.$meta.css({
          width: Instance.contentWidth
        });
      }

      Instance.$videoWrapper.css({
        height: Instance.targetVideoHeight,
        width: Instance.targetVideoWidth,
        marginTop: Instance.videoMarginTop,
        marginLeft: Instance.videoMarginLeft
      });

      if (!Instance.isMobile) {
        Instance.metaHeight = Instance.$meta.outerHeight(true);
        Instance.contentHeight += Instance.metaHeight;
      }

      if (Instance.thumbnails) {
        Instance.thumbnailHeight = Instance.$thumbnails.outerHeight(true);
        Instance.contentHeight += Instance.thumbnailHeight;
      }
    }

    /**
     * @method private
     * @name preloadGallery
     * @description Preloads previous and next images in gallery for faster rendering.
     * @param e [object] "Event Data"
     */

    function preloadGallery(e) {
      var source = '';

      if (Instance.gallery.index > 0) {
        source = Instance.gallery.$items.eq(Instance.gallery.index - 1).attr("href");
        if (!checkVideo(source)) {
          $('<img src="' + source + '">');
        }
      }
      if (Instance.gallery.index < Instance.gallery.total) {
        source = Instance.gallery.$items.eq(Instance.gallery.index + 1).attr("href");
        if (!checkVideo(source)) {
          $('<img src="' + source + '">');
        }
      }
    }

    /**
     * @method private
     * @name advanceGallery
     * @description Advances gallery base on direction.
     * @param e [object] "Event Data"
     */

    function advanceGallery(e) {
      Functions.killEvent(e);

      var $control = $(e.currentTarget);

      if (!Instance.isAnimating && !$control.hasClass(RawClasses.control_disabled)) {
        Instance.isAnimating = true;

        closeCaption();

        Instance.gallery.index += ($control.hasClass(RawClasses.control_next)) ? 1 : -1;
        if (Instance.gallery.index > Instance.gallery.total) {
          Instance.gallery.index = (Instance.infinite) ? 0 : Instance.gallery.total;
        }
        if (Instance.gallery.index < 0) {
          Instance.gallery.index = (Instance.infinite) ? Instance.gallery.total : 0;
        }

        updateThumbnails();

        Instance.$lightbox.addClass(RawClasses.animating);

        Instance.$content.fsTransition({
          property: "opacity"
        }, cleanGallery);

        Instance.$lightbox.addClass(RawClasses.loading);
      }
    }

    /**
     * @method private
     * @name jumpGallery
     * @description Jumps gallery base on thumbnail click.
     * @param e [object] "Event Data"
     */

    function jumpGallery(e) {
      Functions.killEvent(e);

      var $thumbnail = $(e.currentTarget);

      if (!Instance.isAnimating && !$thumbnail.hasClass(RawClasses.active)) {
        Instance.isAnimating = true;

        closeCaption();

        Instance.gallery.index = Instance.$thumbnailItems.index($thumbnail);

        updateThumbnails();

        Instance.$lightbox.addClass(RawClasses.animating);

        Instance.$content.fsTransition({
          property: "opacity"
        }, cleanGallery);

        Instance.$lightbox.addClass(RawClasses.loading);
      }
    }

    /**
     * @method private
     * @name jumpGallery
     * @description
     */

    function updateThumbnails() {
      // Thumbnails
      if (Instance.thumbnails) {
        var $thumb = Instance.$thumbnailItems.eq(Instance.gallery.index);

        Instance.$thumbnailItems.removeClass(RawClasses.active);
        $thumb.addClass(RawClasses.active);
      }
    }

    /**
     * @method private
     * @name jumpGallery
     * @description
     */

    function positionThumbnails() {
      // Thumbnails
      if (Instance.thumbnails) {
        var $thumb = Instance.$thumbnailItems.eq(Instance.gallery.index),
          scrollLeft = $thumb.position().left + ($thumb.outerWidth(false) / 2) - (Instance.$thumbnailContainer.outerWidth(true) / 2);

        Instance.$thumbnailContainer.stop().animate({
          scrollLeft: scrollLeft
        }, 200, "linear");
      }
    }

    /**
     * @method private
     * @name cleanGallery
     * @description Cleans gallery.
     */

    function cleanGallery() {
      if (Instance.type == 'element') {
        if (typeof Instance.$inlineTarget !== 'undefined' && Instance.$inlineTarget.length) {
          restoreContents();
        }
      } else {
        if (typeof Instance.$imageContainer !== 'undefined') {
          if (Instance.isViewer) {
            Instance.$imageContainer.fsViewer("destroy");
          }
          Instance.$imageContainer.remove();
        }
        if (typeof Instance.$videoWrapper !== 'undefined') {
          Instance.$videoWrapper.remove();
        }
      }

      Instance.$el = Instance.gallery.$items.eq(Instance.gallery.index);

      // var $el = Instance.$el,
      //     source = ($el && $el[0].href) ? $el[0].href || "" : "",
      //     hash = ($el && $el[0].hash) ? $el[0].hash || "" : "",
      //     sourceParts = source.toLowerCase().split(".").pop().split(/\#|\?/),
      //     type = ($el) ? $el.data(Namespace + "-type") : "",
      //     isImage = ((type === "image") || (source.match(data.fileTypes) || source.substr(0, 10) === "data:image")),
      //     isVideo = checkVideo(source),
      //     isUrl = ((type === "url") || (!isImage && !isVideo && source.substr(0, 4) === "http" && !hash)),
      //     isElement = ((type === "element") || (!isImage && !isVideo && !isUrl && (hash.substr(0, 1) === "#"))),
      //     isObject = ((typeof $object !== "undefined"));

      if (Instance.type == 'element') {
        var source = Instance.$el[0].href,
            hash  = (Instance.$el && Instance.$el[0].hash) ? Instance.$el[0].hash || "" : "",
            isUrl = (source.substr(0, 4) === "http");

        // var isUrl = ((type === "url") || (source.substr(0, 4) === "http" && !hash)),
        //   isElement = ((type === "element") || (!isUrl && (hash.substr(0, 1) === "#"))),
        //   isObject = ((typeof $object !== "undefined"));

        if (isUrl && !hash) {
          loadURL(source);
        } else {
          appendContents(hash);
        }

        // } else if (isElement) {
        // appendContents(source);
        // } else if (isObject) {
        //   appendObject(Instance.$object);
        // }
      } else {
        Instance.$caption.html(Instance.formatter.call(Instance.$el, Instance));
        Instance.$position.find(Classes.position_current).html(Instance.gallery.index + 1);

        var source = Instance.$el[0].href,
            isVideo = checkVideo(source);

        if (isVideo) {
          Instance.type = "video";

          loadVideo(source);
        } else {
          Instance.type = "image";

          loadImage(source);
        }
      }

      updateGalleryControls();
    }

    /**
     * @method private
     * @name updateGalleryControls
     * @description Updates gallery control states.
     */

    function updateGalleryControls() {
      Instance.$controls.removeClass(RawClasses.control_disabled);

      if (!Instance.infinite) {
        if (Instance.gallery.index === 0) {
          Instance.$controls.filter(Classes.control_previous).addClass(RawClasses.control_disabled);
        }
        if (Instance.gallery.index === Instance.gallery.total) {
          Instance.$controls.filter(Classes.control_next).addClass(RawClasses.control_disabled);
        }
      }
    }

    /**
     * @method private
     * @name onKeyDown
     * @description Handles keypress in gallery.
     * @param e [object] "Event data"
     */

    function onKeyDown(e) {
      if (Instance.gallery.active && (e.keyCode === 37 || e.keyCode === 39)) {
        Functions.killEvent(e);

        Instance.$controls.filter((e.keyCode === 37) ? Classes.control_previous : Classes.control_next).trigger(Events.click);
      } else if (e.keyCode === 27) {
        Instance.$close.trigger(Events.click);
      }
    }

    /**
     * @method private
     * @name appendContents
     * @description Moves target inline element.
     * @param id [string] "Target element id"
     */

    function appendContents(id) {
      Instance.$inlineTarget = $(id);
      Instance.$inlineContents = Instance.$inlineTarget.children().detach();

      appendObject(Instance.$inlineContents);
    }

    /**
     * @method private
     * @name restoreContents
     * @description Restores inline element.
     */

    function restoreContents() {
      Instance.$inlineTarget.append(Instance.$inlineContents.detach());
    }

    /**
     * @method private
     * @name loadURL
     * @description Load URL into iframe.
     * @param source [string] "Target URL"
     */

    function loadURL(source) {
      source = source + ((source.indexOf("?") > -1) ? "&" + Instance.requestKey + "=true" : "?" + Instance.requestKey + "=true");
      var $iframe = $('<iframe class="' + RawClasses.iframe + '" src="' + source + '"></iframe>');
      appendObject($iframe);
    }

    /**
     * @method private
     * @name appendObject
     * @description Appends and sizes object.
     * @param $object [jQuery Object] "Object to append"
     */

    function appendObject($object) {
      Instance.$content.append($object);
      sizeContent($object);
      openLightbox();
    }

    /**
     * @method private
     * @name sizeContent
     * @description Sizes jQuery object to fir in viewport.
     * @param $object [jQuery Object] "Object to size"
     */

    function sizeContent($object) {
      Instance.windowHeight = Formstone.windowHeight - Instance.mobilePaddingVertical - Instance.paddingVertical;
      Instance.windowWidth = Formstone.windowWidth - Instance.mobilePaddingHorizontal - Instance.paddingHorizontal;

      Instance.objectHeight = $object.outerHeight(true);
      Instance.objectWidth = $object.outerWidth(true);
      Instance.targetHeight = Instance.targetHeight || (Instance.$el ? Instance.$el.data(Namespace + "-height") : null);
      Instance.targetWidth = Instance.targetWidth || (Instance.$el ? Instance.$el.data(Namespace + "-width") : null);
      Instance.maxHeight = (Instance.windowHeight < 0) ? Instance.minHeight : Instance.windowHeight;
      Instance.isIframe = $object.is("iframe");
      Instance.objectMarginTop = 0;
      Instance.objectMarginLeft = 0;

      if (!Instance.isMobile) {
        Instance.windowHeight -= Instance.margin;
        Instance.windowWidth -= Instance.margin;
      }

      Instance.contentHeight = (Instance.targetHeight) ? Instance.targetHeight : (Instance.isIframe || Instance.isMobile) ? Instance.windowHeight : Instance.objectHeight;
      Instance.contentWidth = (Instance.targetWidth) ? Instance.targetWidth : (Instance.isIframe || Instance.isMobile) ? Instance.windowWidth : Instance.objectWidth;

      if ((Instance.isIframe || Instance.isObject) && Instance.isMobile) {
        Instance.contentHeight = Instance.windowHeight;
        Instance.contentWidth = Instance.windowWidth;
      } else if (Instance.isObject) {
        Instance.contentHeight = (Instance.contentHeight > Instance.windowHeight) ? Instance.windowHeight : Instance.contentHeight;
        Instance.contentWidth = (Instance.contentWidth > Instance.windowWidth) ? Instance.windowWidth : Instance.contentWidth;
      }

      if (!Instance.isMobile) {
        if (Instance.contentHeight > Instance.maxHeight) {
          Instance.contentHeight = Instance.maxHeight;
        }
        if (Instance.contentWidth > Instance.maxWidth) {
          Instance.contentWidth = Instance.maxWidth;
        }
      }
    }

    /**
     * @method private
     * @name loadError
     * @description Error when resource fails to load.
     */

    function loadError() {
      var $error = $('<div class="' + RawClasses.error + '"><p>Error Loading Resource</p></div>');

      // Clean up
      Instance.type = "element";
      Instance.$tools.remove();

      Instance.$image.off(Events.namespace);

      appendObject($error);

      $Window.trigger(Events.error);
    }

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
     * @method private
     * @name checkVideo
     * @description Determines if url is a YouTube or Vimeo url.
     * @param source [string] "Source url"
     * @return [boolean] "True if YouTube or Vimeo url"
     */

    function checkVideo(source) {
      var formats = Instance.videoFormatter,
        parts;

      for (var i in formats) {
        if (formats.hasOwnProperty(i)) {
          parts = source.match(formats[i].pattern);

          if (parts !== null) {
            return formats[i].format.call(Instance, parts);
          }
        }
      }

      return false;
    }

    /**
     * @method private
     * @name onDocumentFocus
     * @description Hanle document focus
     * @param e [object] "Event data"
     */

    function onDocumentFocus(e) {
      var target = e.target;

      if (!$.contains(Instance.$lightbox[0], target) && target !== Instance.$lightbox[0] && target !== Instance.$overlay[0]) {
        Functions.killEvent(e);

        Instance.$lightbox.focus();
      }
    }

    /**
     * @plugin
     * @name Lightbox
     * @description A jQuery plugin for simple modals.
     * @type widget
     * @main lightbox.js
     * @main lightbox.css
     * @dependency jQuery
     * @dependency core.js
     * @dependency touch.js
     * @dependency transition.js
     * @dependency viewer.js (optional)
     */

    var Plugin = Formstone.Plugin("lightbox", {
        widget: true,

        /**
         * @options
         * @param customClass [string] <''> "Class applied to instance"
         * @param fileTypes [regex] <> "Image file types"
         * @param fixed [boolean] <false> "Flag for fixed positioning"
         * @param formatter [function] <$.noop> "Caption format function"
         * @param infinite [boolean] <false> "Flag for infinite galleries"
         * @param labels.close [string] <'Close'> "Close button text"
         * @param labels.count [string] <'of'> "Gallery count separator text"
         * @param labels.next [string] <'Next'> "Gallery control text"
         * @param labels.previous [string] <'Previous'> "Gallery control text"
         * @param labels.captionClosed [string] <'Close Caption'> "Mobile caption toggle text, closed state"
         * @param labels.captionOpen [string] <'View Caption'> "Mobile caption toggle text, open state"
         * @param labels.thumbnailsClosed [string] <'Close Thumbnails'> "Mobile thumbnails toggle text, closed state"
         * @param labels.thumbnailsOpen [string] <'View Thumbnails'> "Mobile thumbnails toggle text, open state"
         * @param labels.lightbox [string] <'Lightbox {guid}'> "Lightbox aria label; {guid} replaced with instance GUID"
         * @param margin [int] <50> "Margin used when sizing (single side)"
         * @param maxHeight [int] <10000> "Maximum height of element modal"
         * @param maxWidth [int] <10000> "Maximum width of element modal"
         * @param minHeight [int] <100> "Minimum height of modal"
         * @param minWidth [int] <100> "Minimum width of modal"
         * @param overlay [boolean] <false> "Flag to force 'overlay' rendering"
         * @param retina [boolean] <false> "Flag to use 'retina' sizing (halves natural sizes)"
         * @param requestKey [string] <'fs-lightbox'> "GET variable for ajax / iframe requests"
         * @param theme [string] <"fs-light"> "Theme class name"
         * @param thumbnails [boolean] <false> "Flag to display thumbnail strip"
         * @param top [int] <0> "Target top position; over-rides centering"
         * @param videoFormatter [array] <[]> "Object of video formatter objects containing a 'pattern' regex and 'format' callback"
         * @param videoRatio [number] <0.5625> "Video height / width ratio (9 / 16 = 0.5625)"
         * @param videoWidth [int] <800> "Video max width"
         * @param viewer [boolean] <false> "Flag to force 'Viewer' rendering, if available"
         */

        defaults: {
          customClass: "",
          fileTypes: /\.(jpg|sjpg|jpeg|png|gif)/i,
          fixed: false,
          formatter: formatCaption,
          infinite: false,
          labels: {
            close: "Close",
            count: "of",
            next: "Next",
            previous: "Previous",
            captionClosed: "View Caption",
            captionOpen: "Close Caption",
            thumbnailsClosed: "View Thumbnails",
            thumbnailsOpen: "Close Thumbnails",
            lightbox: "Lightbox {guid}"
          },
          margin: 50,
          maxHeight: 10000,
          maxWidth: 10000,
          minHeight: 100,
          minWidth: 100,
          mobile: null,
          overlay: false,
          retina: false,
          requestKey: "fs-lightbox",
          theme: "fs-light",
          thumbnails: false,
          top: 0,
          videoFormatter: {
            "youtube": {
              pattern: /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,
              format: formatYouTube
            },
            "vimeo": {
              pattern: /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/,
              format: formatVimeo
            }
          },
          videoRatio: 0.5625,
          videoWidth: 800,
          viewer: true
        },

        classes: [
          "loading",
          "animating",
          // "scaling",
          // "zooming",
          "fixed",
          "mobile",
          "touch",
          "inline",
          "iframed",
          "open",
          "ready",
          "overlay",
          "close",
          "loading_icon",
          "container",
          "content",
          "image",
          "image_container",
          "video",
          "video_wrapper",
          "tools",
          "meta",
          "meta_content",
          "controls",
          "control",
          "control_previous",
          "control_next",
          "control_disabled",
          "position",
          "position_current",
          "position_total",
          "toggle",
          "caption_toggle",
          "caption",
          "caption_open",
          "thumbnailed",
          "thumbnails_open",
          "thumbnail_toggle",
          "thumbnails",
          "thumbnail_container",
          "thumbnail_item",
          "active",
          "has_controls",
          "has_caption",
          "iframe",
          "error",
          "active",
          "lock"
        ],

        /**
         * @events
         * @event open.lightbox "Lightbox opened; Triggered on window"
         * @event close.lightbox "Lightbox closed; Triggered on window"
         * @event error.lightbox "Lightbox error; Triggered on window"
         */

        events: {
          open: "open",
          close: "close"
        },

        methods: {
          _construct: construct,
          _destruct: destruct,
          _resize: resize,

          resize: resizeLightbox
        },

        utilities: {
          _initialize: initialize,

          close: closeLightbox
        }
      }),

      // Localize References

      Namespace = Plugin.namespace,
      Defaults = Plugin.defaults,
      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions,
      Window = Formstone.window,
      $Window = Formstone.$window,
      $Body = null,

      // Internal

      $Locks = null,
      OnLoad = false,
      OnLoaded = false,

      // Singleton

      Instance = null;

    // Setup

    Formstone.Ready(setup);

  })

);
