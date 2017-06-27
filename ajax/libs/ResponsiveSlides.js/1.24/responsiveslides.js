/*! ResponsiveSlides.js v1.24
 * http://responsiveslides.com
 *
 * Copyright (c) 2011-2012 @viljamis
 * Available under the MIT license
 */

/* ResponsiveSlides.js is a tiny jQuery plugin that creates a responsive
 * slideshow using images inside <ul>. It works with wide range of browsers
 * including all IE versions from IE6 and up. It also adds css max-width
 * support for IE6 and other browsers that don't natively support it. Only
 * dependency is jQuery (1.4 and up) and that all the images are same size.
 *
 * Features:
 * - Fully responsive
 * - Under 1kb minified and gzipped
 * - Simple markup using unordered lists
 * - Settings for transition and timeout durations
 * - Multiple slideshows supported
 * - Automatic and manual fade
 * - Works in all major desktop and mobile browsers
 * - Captions and other html-elements supported inside slides
 * - Separate pagination and next/prev controls
 * - Possibility to choose where the controls append to
 * - Images can be wrapped inside links
 * - Optional 'before' and 'after' callbacks
 *
 */

/*jslint browser: true, sloppy: true, vars: true, plusplus: true, maxerr: 50, indent: 2 */

(function ($, window, i) {
  $.fn.responsiveSlides = function (options) {

    // Default settings
    var settings = $.extend({
      "auto": true,             // Boolean: Animate automatically, true or false
      "speed": 1000,            // Integer: Speed of the transition, in milliseconds
      "timeout": 4000,          // Integer: Time between slide transitions, in milliseconds
      "pager": false,           // Boolean: Show pager, true or false
      "nav": false,             // Boolean: Show navigation, true or false
      "prevText": "Previous",   // String: Text for the "previous" button
      "nextText": "Next",       // String: Text for the "next" button
      "maxwidth": "",           // Integer: Max-width of the slideshow, in pixels
      "controls": "",           // Selector: Where controls should be appended to, default is after the <ul>
      "namespace": "rslides"    // String: change the default namespace used
    }, options);

    return this.each(function () {

      // Index for namespacing
      i++;

      var $this = $(this),

        // Local variables
        selectTab,
        startCycle,
        restartCycle,
        rotate,
        $tabs,

        // Helpers
        index = 0,
        $slide = $this.children(),
        length = $slide.size(),
        fadetime = parseFloat(settings.speed),
        maxw = parseFloat(settings.maxwidth),

        // Namespacing
        namespace = settings.namespace,
        namespaceIdx = namespace + i,

        // Classes
        navClass = namespace + "_nav " + namespaceIdx + "_nav",
        activeClass = namespace + "_here",
        visibleClass = namespaceIdx + "_on",
        slideClassPrefix = namespaceIdx + "_s",

        // Pager
        $pager = $("<ul class='" + namespace + "_tabs " + namespaceIdx + "_tabs' />"),

        // Styles for visible and hidden slides
        visible = {"float": "left", "position": "relative"},
        hidden = {"float": "none", "position": "absolute"},

        // Fading animation
        slideTo = function (idx) {
          $this.trigger(namespace + "-before");
          $slide
            .stop()
            .fadeOut(fadetime, function () {
              $(this)
                .removeClass(visibleClass)
                .css(hidden);
            })
            .eq(idx)
            .fadeIn(fadetime, function () {
              $(this)
                .addClass(visibleClass)
                .css(visible)
                .trigger(namespace + "-after");
              index = idx;
            });
        };

      // Add ID's to each slide
      $slide.each(function (i) {
        this.id = slideClassPrefix + i;
      });

      // Add max-width and classes
      $this.addClass(namespace + " " + namespaceIdx);
      if (options && options.maxwidth) {
        $this.css("max-width", maxw);
      }

      // Hide all slides, then show first one
      $slide
        .hide()
        .eq(0)
        .addClass(visibleClass)
        .css(visible)
        .show();

      // Only run if there's more than one slide
      if ($slide.size() > 1) {

        // Pager
        if (settings.pager === true) {
          var tabMarkup = [];
          $slide.each(function (i) {
            var n = i + 1;
            tabMarkup +=
              "<li>" +
              "<a href='#' class='" + slideClassPrefix + n + "'>" + n + "</a>" +
              "</li>";
          });
          $pager.append(tabMarkup);

          $tabs = $pager.find("a");

          // Inject pager
          if (options.controls) {
            $(settings.controls).append($pager);
          } else {
            $this.after($pager);
          }

          // Select pager item
          selectTab = function (idx) {
            $tabs
              .closest("li")
              .removeClass(activeClass)
              .eq(idx)
              .addClass(activeClass);
          };
        }

        // Auto cycle
        if (settings.auto === true) {

          startCycle = function () {
            rotate = setInterval(function () {
              var idx = index + 1 < length ? index + 1 : 0;

              // Remove active state and set new if pager = "true"
              if (settings.pager === true) {
                selectTab(idx);
              }

              slideTo(idx);
            }, parseFloat(settings.timeout));
          };

          // Init cycle
          startCycle();
        }

        // Restarting cycle
        restartCycle = function () {
          if (settings.auto === true) {
            // Stop
            clearInterval(rotate);
            // Restart
            startCycle();
          }
        };

        // Pager click event handler
        if (settings.pager === true) {
          $tabs.bind("click", function (e) {
            e.preventDefault();
            restartCycle();

            // Get index of clicked tab
            var idx = $tabs.index(this);

            // Break if element is already active or currently animated
            if (index === idx || $("." + visibleClass + ":animated").length) {
              return;
            }

            // Remove active state from old tab and set new one
            selectTab(idx);

            // Do the animation
            slideTo(idx);
          })
            .eq(0)
            .closest("li")
            .addClass(activeClass);
        }

        // Navigation
        if (settings.nav === true) {
          var navMarkup =
            "<a href='#' class='" + navClass + " prev'>" + settings.prevText + "</a>" +
            "<a href='#' class='" + navClass + " next'>" + settings.nextText + "</a>";

          // Inject navigation
          if (options.controls) {
            $(settings.controls).append(navMarkup);
          } else {
            $this.after(navMarkup);
          }

          var $trigger = $("." + namespaceIdx + "_nav"),
            $prev = $("." + namespaceIdx + "_nav.prev");

          // Click event handler
          $trigger.bind("click", function (e) {
            e.preventDefault();

            // Prevent clicking if currently animated
            if ($("." + visibleClass + ":animated").length) {
              return;
            }

            // Determine where to slide
            var idx = $slide.index($("." + visibleClass)),
              prevIdx = idx - 1,
              nextIdx = idx + 1 < length ? index + 1 : 0;

            // Go to slide
            slideTo($(this)[0] === $prev[0] ? prevIdx : nextIdx);
            if (settings.pager === true) {
              selectTab($(this)[0] === $prev[0] ? prevIdx : nextIdx);
            }

            restartCycle();
          });
        }

      }

      // Max-width fallback
      if (typeof document.body.style.maxWidth === "undefined" && options && options.maxwidth) {
        var widthSupport = function () {
          $this.css("width", "100%");
          if ($this.width() > maxw) {
            $this.css("width", maxw);
          }
        };

        // Init fallback
        widthSupport();
        $(window).bind("resize", function () {
          widthSupport();
        });
      }

    });

  };
})(jQuery, this, 0);
