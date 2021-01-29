/*! formstone v1.4.20-1 [carousel.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core",
        "./mediaquery",
        "./touch"
      ], factory);
    } else {
      factory(jQuery, Formstone);
    }
  }(function($, Formstone) {

    "use strict";

    /**
     * @method private
     * @name resize
     * @description Handles window resize
     */

    function resize(windowWidth) {
      Functions.iterate.call($Instances, resizeInstance);
    }

    /**
     * @method private
     * @name cacheInstances
     * @description Caches active instances
     */

    function cacheInstances() {
      $Instances = $(Classes.base);
    }

    /**
     * @method private
     * @name construct
     * @description Builds instance.
     * @param data [object] "Instance data"
     */

    function construct(data) {
      var i;

      data.didPan = false;

      data.carouselClasses = [
        RawClasses.base,
        data.theme,
        data.customClass,
        (data.rtl ? RawClasses.rtl : RawClasses.ltr)
      ];

      data.maxWidth = (data.maxWidth === Infinity ? "100000px" : data.maxWidth);
      data.mq = "(min-width:" + data.minWidth + ") and (max-width:" + data.maxWidth + ")";

      data.customControls = (typeof data.controls === "object" && data.controls.previous && data.controls.next);
      data.customPagination = (typeof data.pagination === "string");

      data.id = this.attr("id");

      if (data.id) {
        data.ariaId = data.id;
      } else {
        data.ariaId = data.rawGuid;
        this.attr("id", data.ariaId);
      }

      // Legacy browser support
      if (!Formstone.support.transform) {
        data.useMargin = true;
      }

      // Build controls and pagination
      var controlsHtml = '',
        paginationHtml = '',
        controlPrevClasses = [RawClasses.control, RawClasses.control_previous].join(" "),
        controlNextClasses = [RawClasses.control, RawClasses.control_next].join(" ");

      if (data.controls && !data.customControls) {
        data.labels.controls = data.labels.controls.replace('{guid}', data.numGuid);

        controlsHtml += '<div class="' + RawClasses.controls + '" aria-label="' + data.labels.controls + '" aria-controls="' + data.ariaId + '">';
        controlsHtml += '<button type="button" class="' + controlPrevClasses + '" aria-label="' + data.labels.previous + '">' + data.labels.previous + '</button>';
        controlsHtml += '<button type="button" class="' + controlNextClasses + '" aria-label="' + data.labels.next + '">' + data.labels.next + '</button>';
        controlsHtml += '</div>';
      }

      if (data.pagination && !data.customPagination) {
        data.labels.pagination = data.labels.pagination.replace('{guid}', data.numGuid);

        paginationHtml += '<div class="' + RawClasses.pagination + '" aria-label="' + data.labels.pagination + '" aria-controls="' + data.ariaId + '" role="navigation">';
        paginationHtml += '</div>';
      }

      if (data.autoHeight) {
        data.carouselClasses.push(RawClasses.auto_height);
      }

      if (data.contained) {
        data.carouselClasses.push(RawClasses.contained);
      }

      if (data.single) {
        data.carouselClasses.push(RawClasses.single);
      }

      // Modify dom
      this.addClass(data.carouselClasses.join(" "))
        .wrapInner('<div class="' + RawClasses.wrapper + '" aria-live="polite"><div class="' + RawClasses.container + '"><div class="' + RawClasses.canister + '"></div></div></div>')
        .append(controlsHtml)
        .wrapInner('<div class="' + RawClasses.viewport + '"></div>')
        .append(paginationHtml);

      data.$viewport = this.find(Classes.viewport).eq(0);
      data.$container = this.find(Classes.container).eq(0);
      data.$canister = this.find(Classes.canister).eq(0);
      data.$pagination = this.find(Classes.pagination).eq(0);

      data.$controlPrevious = data.$controlNext = $('');

      if (data.customControls) {
        data.$controls = $(data.controls.container).addClass([RawClasses.controls, RawClasses.controls_custom].join(" "));
        data.$controlPrevious = $(data.controls.previous).addClass(controlPrevClasses);
        data.$controlNext = $(data.controls.next).addClass(controlNextClasses);
      } else {
        data.$controls = this.find(Classes.controls).eq(0);
        data.$controlPrevious = data.$controls.find(Classes.control_previous);
        data.$controlNext = data.$controls.find(Classes.control_next);
      }

      data.$controlItems = data.$controlPrevious.add(data.$controlNext);

      if (data.customPagination) {
        data.$pagination = $(data.pagination).addClass([RawClasses.pagination]);
      }

      data.$paginationItems = data.$pagination.find(Classes.page);

      data.index = 0;
      data.enabled = false;
      data.leftPosition = 0;
      data.autoTimer = null;
      data.resizeTimer = null;

      // live query for linked to avoid missing new elements
      var linked = this.data(Namespace + "-linked");
      data.linked = linked ? '[data-' + Namespace + '-linked="' + linked + '"]' : false;

      // force paged if linked, keeps counts accurate
      if (data.linked) {
        data.paged = true;
      }

      // live query for controlled to avoid missing new elements
      var subordinate = this.data(Namespace + "-controller-for") || '';
      data.$subordinate = $(subordinate);

      if (data.$subordinate.length) {
        data.controller = true;
      }

      // Responsive count handling
      if (typeof data.show === "object") {
        var show = data.show,
          cache = [],
          keys = [];

        for (i in show) {
          if (show.hasOwnProperty(i)) {
            keys.push(i);
          }
        }

        keys.sort(Functions.sortAsc);

        for (i in keys) {
          if (keys.hasOwnProperty(i)) {
            cache.push({
              width: parseInt(keys[i]),
              count: show[keys[i]],
              mq: window.matchMedia("(min-width: " + parseInt(keys[i]) + "px)")
            });
          }
        }

        data.show = cache;
      }

      cacheValues(data);

      // Media Query support
      $.fsMediaquery("bind", data.rawGuid, data.mq, {
        enter: function() {
          enable.call(data.$el, data);
        },
        leave: function() {
          disable.call(data.$el, data);
        }
      });

      cacheInstances();

      data.carouselClasses.push(RawClasses.enabled);
      data.carouselClasses.push(RawClasses.animated);
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      Functions.clearTimer(data.autoTimer);
      Functions.clearTimer(data.resizeTimer);

      disable.call(this, data);

      $.fsMediaquery("unbind", data.rawGuid);

      if (data.id !== data.ariaId) {
        this.removeAttr("id");
      }

      data.$controlItems.removeClass([Classes.control, RawClasses.control_previous, Classes.control_next, Classes.visible].join(" "))
        .off(Events.namespace);

      enableControls(data, data.$controlItems);

      data.$images.off(Events.namespace);

      data.$canister.fsTouch("destroy");

      data.$items.removeClass([RawClasses.item, RawClasses.visible, Classes.item_previous, Classes.item_next].join(" "))
        .unwrap()
        .unwrap()
        .unwrap()
        .unwrap();

      if (data.controls && !data.customControls) {
        data.$controls.remove();
      }

      if (data.customControls) {
        data.$controls.removeClass([RawClasses.controls, RawClasses.controls_custom, RawClasses.visible].join(" "));
      }

      if (data.pagination && !data.customPagination) {
        data.$pagination.remove();
      }

      if (data.customPagination) {
        data.$pagination.html("").removeClass([RawClasses.pagination, RawClasses.visible].join(" "));
      }

      this.removeClass(data.carouselClasses.join(" "));

      cacheInstances();
    }

    /**
     * @method
     * @name disable
     * @description Disables instance of plugin
     * @example $(".target").carousel("disable");
     */

    function disable(data) {
      if (data.enabled) {
        Functions.clearTimer(data.autoTimer);

        data.enabled = false;

        data.$subordinate.off(Events.update);

        this.removeClass([RawClasses.enabled, RawClasses.animated].join(" "))
          .off(Events.namespace);

        data.$canister.fsTouch("destroy")
          .off(Events.namespace)
          .attr("style", "")
          .css(TransitionProperty, "none");

        data.$items.css({
          width: "",
          height: ""
        }).removeClass([RawClasses.visible, Classes.item_previous, Classes.item_next].join(" "));

        data.$images.off(Events.namespace);
        data.$controlItems.off(Events.namespace);
        data.$pagination.html("").off(Events.namespace);

        hideControls(data);

        if (data.useMargin) {
          data.$canister.css({
            marginLeft: ""
          });
        } else {
          data.$canister.css(TransformProperty, "");
        }

        data.index = 0;
      }
    }

    /**
     * @method
     * @name enable
     * @description Enables instance of plugin
     * @example $(".target").carousel("enable");
     */

    function enable(data) {
      if (!data.enabled) {
        data.enabled = true;

        this.addClass(RawClasses.enabled);

        data.$controlItems.on(Events.click, data, onAdvance);
        data.$pagination.on(Events.click, Classes.page, data, onSelect);

        data.$items.on(Events.click, data, onItemClick);
        data.$subordinate.on(Events.update, data, onSubordinateUpdate);

        onSubordinateUpdate({
          data: data
        }, 0);

        if (data.touch) {
          data.$canister.fsTouch({
              axis: "x",
              pan: true,
              swipe: true
            }).on(Events.panStart, data, onPanStart)
            .on(Events.pan, data, onPan)
            .on(Events.panEnd, data, onPanEnd)
            .on(Events.swipe, data, onSwipe)
            .on(Events.focusIn, data, onItemFocus)
            .css(TransitionProperty, "");
        }

        cacheValues(data);

        // Watch Images
        data.$images.on(Events.load, data, onImageLoad);

        // Auto timer
        if (data.autoAdvance) {
          data.autoTimer = Functions.startTimer(data.autoTimer, data.autoTime, function() {
            autoAdvance(data);
          }, true);
        }

        resizeInstance.call(this, data);
      }
    }

    /**
     * @method
     * @name resize
     * @description Resizes instance
     * @example $(".target").carousel("resize");
     */

    /**
     * @method private
     * @name resizeInstance
     * @description Resizes each instance
     * @param data [object] "Instance data"
     */

    function resizeInstance(data) {
      if (data.enabled) {
        var h, i, j, k, w,
          $items,
          $first,
          width,
          height,
          left;

        data.count = data.$items.length;

        if (data.count < 1) { // avoid empty carousels
          hideControls(data);
          data.$canister.css({
            height: ""
          });

          return;
        }

        this.removeClass(RawClasses.animated);

        data.containerWidth = data.$container.outerWidth(false);

        data.visible = calculateVisible(data);
        data.perPage = data.paged ? 1 : data.visible;

        data.itemMarginLeft = parseInt(data.$items.eq(0).css("marginLeft"));
        data.itemMarginRight = parseInt(data.$items.eq(0).css("marginRight"));

        data.itemMargin = data.itemMarginLeft + data.itemMarginRight;

        if (isNaN(data.itemMargin)) {
          data.itemMargin = 0;
        }

        data.itemWidth = (data.containerWidth - (data.itemMargin * (data.visible - 1))) / data.visible;
        data.itemHeight = 0;

        data.pageWidth = data.paged ? data.itemWidth : data.containerWidth;

        if (data.matchWidth) {
          data.canisterWidth = data.single ? data.containerWidth : ((data.itemWidth + data.itemMargin) * data.count);
        } else {
          data.canisterWidth = 0;
          data.$canister.css({
            width: 1000000
          });

          for (i = 0; i < data.count; i++) {
            data.canisterWidth += data.$items.eq(i).outerWidth(true);
          }
        }

        data.$canister.css({
          width: data.canisterWidth,
          height: ""
        });

        data.$items.css({
          width: (data.matchWidth) ? data.itemWidth : "",
          height: ""
        }).removeClass([RawClasses.visible, RawClasses.item_previous, RawClasses.item_next].join(" "));

        // initial pages
        data.pages = [];
        data.items = [];
        // data.pagesReverse = [];
        // data.pagesVisible = [];

        var $item,
          iWidth = 0,
          iHeight = 0,
          tWidth = 0,
          iLeft = 0;

        width = 0;
        height = 0;
        $items = $();

        // Pages forward
        for (i = 0; i < data.count; i++) {
          $item = data.$items.eq(i);
          iWidth = data.matchWidth ? (data.itemWidth + data.itemMargin) : $item.outerWidth(true);
          iHeight = $item.outerHeight();
          iLeft = $item.position().left;

          data.items.push({
            $el: $item,
            width: iWidth,
            height: iHeight,
            left: data.rtl ? iLeft - (data.canisterWidth - iWidth) : iLeft
          });

          // Too far / Paged
          if ( ($items.length && width + iWidth > data.containerWidth + data.itemMargin) || (data.paged && i > 0) ) {
            $first = data.rtl ? $items.eq($items.length - 1) : $items.eq(0);
            left = $first.position().left;

            data.pages.push({
              left: data.rtl ? left - (data.canisterWidth - width) : left,
              // left: data.rtl ? left - (data.canisterWidth - (data.containerWidth - width)) : left,
              height: height,
              width: width,
              $items: $items
            });

            // Reset counters
            $items = $();
            height = 0;
            width = 0;
          }

          $items = $items.add($item);
          width += iWidth;
          tWidth += iWidth;

          if (iHeight > height) {
            height = iHeight;
          }
          if (height > data.itemHeight) {
            data.itemHeight = height;
          }
        }

        // Last Page
        $first = data.rtl ? $items.eq($items.length - 1) : $items.eq(0);
        left = data.canisterWidth - data.containerWidth - (data.rtl ? data.itemMarginLeft : data.itemMarginRight);

        data.pages.push({
          left: data.rtl ? -left : left,
          height: height,
          width: width,
          $items: $items
        });

        data.pageCount = data.pages.length;

        // Random Config

        if (data.paged && data.matchWidth) {
          data.pageCount -= (data.count % data.visible);
        }

        if (data.pageCount <= 0) {
          data.pageCount = 1;
        }

        data.maxMove = (data.canisterWidth - data.containerWidth - (data.rtl ? data.itemMarginLeft : data.itemMarginRight)) * (data.rtl ? 1 : -1);

        if (data.paged && !data.matchWidth) {
          for (i = 0; i < data.pages.length; i++) {
            if (data.pages[i].left - data.pages[i].width > Math.abs(data.maxMove)) {
              data.pageCount = i;
              break;
            }
          }
        }

        // auto / match height
        if (data.autoHeight) {
          data.$canister.css({
            height: data.pages[0].height
          });
        } else if (data.matchHeight) {
          data.$items.css({
            height: data.itemHeight
          });
        }

        // Reset Page Count
        var html = '';
        for (i = 0; i < data.pageCount; i++) {
          html += '<button type="button" class="' + RawClasses.page + '">' + (i + 1) + '</button>';
        }
        data.$pagination.html(html);

        // update pagination
        if (data.pageCount <= 1) {
          hideControls(data);
        } else {
          showControls(data);
        }
        data.$paginationItems = data.$pagination.find(Classes.page);

        positionCanister(data, data.index, false);

        setTimeout(function() {
          data.$el.addClass(RawClasses.animated);
        }, 5);
      }
    }

    /**
     * @method private
     * @name cacheValues
     * @description Caches internal values after item change
     * @param data [object] "Instance data"
     */

    function cacheValues(data) {
      // Cache vaules
      data.$items = data.$canister.children().not(":hidden").addClass(RawClasses.item);
      data.$images = data.$canister.find("img");

      data.totalImages = data.$images.length;
    }

    /**
     * @method
     * @name reset
     * @description Resets instance after item change
     * @example $(".target").carousel("reset");
     */

    /**
     * @method private
     * @name resetInstance
     * @description Resets instance after item change
     * @param data [object] "Instance data"
     */

    function resetInstance(data) {
      if (data.enabled) {
        updateItems.call(this, data, false);
      }
    }

    /**
     * @method
     * @name update
     * @description Updates carousel items
     * @example $(".target").carousel("update", "...");
     */

    /**
     * @method private
     * @name updateItems
     * @description Updates carousel items for each instance
     * @param data [object] "Instance data"
     * @param html [string] "New carousel contents"
     */

    function updateItems(data, html) {
      data.$images.off(Events.namespace);

      if (html !== false) {
        data.$canister.html(html);
      }

      data.index = 0;

      cacheValues(data);

      resizeInstance.call(this, data);
    }

    /**
     * @method
     * @name jumpPage
     * @description Jump instance of plugin to specific page
     * @example $(".target").carousel("jumpPage", 1);
     * @param index [int] "New index"
     * @param silent [boolean] "Flag to prevent triggering update event"
     */
    /**
     * @method
     * @name jump
     * @description Jump instance of plugin to specific page; Alias of `jumpPage`
     * @example $(".target").carousel("jump", 1);
     * @param index [int] "New index"
     * @param silent [boolean] "Flag to prevent triggering update event"
     */

    /**
     * @method private
     * @name jumpPage
     * @description Jump instance of plugin to specific page
     * @param data [object] "Instance data"
     * @param index [int] "New index"
     * @param silent [boolean] ""
     * @param animated [boolean] ""
     */

    function jumpPage(data, index, silent, fromLinked, animated) {
      if (data.enabled) {
        if (!fromLinked) {
          Functions.clearTimer(data.autoTimer);
        }

        if (typeof animated === "undefined") {
          animated = true;
        }

        positionCanister(data, index - 1, animated, silent, fromLinked);
      }
    }

    /**
     * @method
     * @name previousPage
     * @description Move to the previous page
     * @example $(".target").carousel("previousPage");
     */
    /**
     * @method
     * @name previous
     * @description Move to the previous page; Alias of `previousPage`
     * @example $(".target").carousel("previous");
     */

    /**
     * @method private
     * @name previousPage
     * @description Move to previous page
     * @param data [object] "Instance data"
     */

    function previousPage(data) {
      var index = data.index - 1;

      if (data.infinite && index < 0) {
        index = data.pageCount - 1;
      }

      positionCanister(data, index);
    }

    /**
     * @method
     * @name nextPage
     * @description Move to next page
     * @example $(".target").carousel("nextPage");
     */
    /**
     * @method
     * @name next
     * @description Move to next page; Alias of `nextPage`
     * @example $(".target").carousel("next");
     */

    /**
     * @method private
     * @name nextPage
     * @description Move to next page
     * @param data [object] "Instance data"
     */

    function nextPage(data) {
      var index = data.index + 1;

      if (data.infinite && index >= data.pageCount) {
        index = 0;
      }

      positionCanister(data, index);
    }


    /**
     * @method
     * @name jumpItem
     * @description Jump instance of plugin to specific item
     * @example $(".target").carousel("jumpItem", 1);
     * @param index [int] "New item index"
     * @param silent [boolean] "Flag to prevent triggering update event"
     */

    /**
     * @method private
     * @name jumpItem
     * @description Jump instance of plugin to specific page
     * @param data [object] "Instance data"
     * @param index [int] "New index"
     * @param silent [boolean] ""
     * @param animated [boolean] ""
     */

    function jumpItem(data, index, silent, fromLinked, animated) {
      if (data.enabled) {
        Functions.clearTimer(data.autoTimer);

        var $active = data.$items.eq(index - 1);

        if (typeof animated === "undefined") {
          animated = true;
        }

        for (var i = 0; i < data.pageCount; i++) {
          if (data.pages[i].$items.is($active)) {
            positionCanister(data, i, animated, silent, fromLinked);
            break;
          }
        }
      }
    }

    /**
     * @method private
     * @name onImageLoad
     * @description Handles child image load
     * @param e [object] "Event data"
     */

    function onImageLoad(e) {
      var data = e.data;

      data.resizeTimer = Functions.startTimer(data.resizeTimer, 1, function() {
        resizeInstance.call(data.$el, data);
      });
    }

    /**
     * @method private
     * @name autoAdvance
     * @description Handles auto advancement
     * @param data [object] "Instance data"
     */

    function autoAdvance(data) {
      var index = data.index + 1;

      if (index >= data.pageCount) {
        index = 0;
      }

      positionCanister(data, index);
    }

    /**
     * @method private
     * @name onAdvance
     * @description Handles item advancement
     * @param e [object] "Event data"
     */

    function onAdvance(e) {
      Functions.killEvent(e);

      var data = e.data,
        index = data.index + ($(e.currentTarget).hasClass(RawClasses.control_next) ? 1 : -1);

      Functions.clearTimer(data.autoTimer);
      positionCanister(data, index);
    }

    /**
     * @method private
     * @name onSelect
     * @description Handles item select
     * @param e [object] "Event data"
     */

    function onSelect(e) {
      Functions.killEvent(e);

      var data = e.data,
        index = data.$paginationItems.index($(e.currentTarget));

      Functions.clearTimer(data.autoTimer);
      positionCanister(data, index);
    }

    /**
     * @method private
     * @name position
     * @description Handles updating instance position
     * @param data [object] "Instance data"
     * @param index [int] "Item index"
     */

    function positionCanister(data, index, animate, silent, fromLinked) {
      if (index < 0) {
        index = (data.infinite) ? data.pageCount - 1 : 0;
      }
      if (index >= data.pageCount) {
        index = (data.infinite) ? 0 : data.pageCount - 1;
      }

      if (data.count < 1) {
        return;
      }

      if (data.pages[index]) {
        data.leftPosition = -data.pages[index].left;
      }

      data.leftPosition = checkPosition(data, data.leftPosition);

      if (data.useMargin) {
        data.$canister.css({
          marginLeft: data.leftPosition
        });
      } else {
        if (animate === false) {
          data.$canister.css(TransitionProperty, "none")
            .css(TransformProperty, "translateX(" + data.leftPosition + "px)");

          // Slight delay before adding transitions back
          setTimeout(function() {
            data.$canister.css(TransitionProperty, "");
          }, 5);
        } else {
          data.$canister.css(TransformProperty, "translateX(" + data.leftPosition + "px)");
        }
      }

      // Update classes
      data.$items.removeClass([RawClasses.visible, RawClasses.item_previous, RawClasses.item_next].join(" "));

      if (data.single) {
        for (var i = 0, count = data.pages.length; i < count; i++) {
          if (i === index) {
            data.pages[i].$items.addClass(RawClasses.visible).attr("aria-hidden", "false");
          } else {
            data.pages[i].$items.not(data.pages[index].$items).addClass((i < index) ? RawClasses.item_previous : RawClasses.item_next).attr("aria-hidden", "true");
          }
        }
      } else {
        for (var i = 0; i < data.count; i++) {
          var multiplier = (data.rtl ? -1 : 1),
            posLeft = (data.leftPosition * multiplier) + (data.items[i].left * multiplier),
            posWidth = posLeft + data.items[i].width,
            edge = data.containerWidth + data.itemMargin + 1;

          if ( posLeft >= -1 && posWidth <= edge ) {
            data.items[i].$el.addClass(RawClasses.visible).attr("aria-hidden", "false");
          } else {
            if ( posLeft < 0 ) {
              data.items[i].$el.addClass(RawClasses.item_previous).attr("aria-hidden", "false");
            } else {
              data.items[i].$el.addClass(RawClasses.item_next).attr("aria-hidden", "false");
            }
          }
        }
      }

      // Auto Height
      if (data.autoHeight) {
        data.$canister.css({
          height: data.pages[index].height
        });
      }

      if (animate !== false && silent !== true && index !== data.index && (data.infinite || (index > -1 && index < data.pageCount))) {
        data.$el.trigger(Events.update, [index]);
      }

      data.index = index;

      // Linked
      if (data.linked && fromLinked !== true) {
        $(data.linked).not(data.$el)[NamespaceClean]("jumpPage", data.index + 1, true, true);
      }

      updateControls(data);
    }

    /**
     * @method private
     * @name hideControls
     * @description Hides instance controls
     * @param data [object] "Instance data"
     */

    function hideControls(data) {
      data.$controls.removeClass(RawClasses.visible);
      data.$controlItems.removeClass(RawClasses.visible);
      data.$pagination.removeClass(RawClasses.visible);

      disableControls(data, data.$controlItems);
    }

    /**
     * @method private
     * @name showControls
     * @description Shows instance controls
     * @param data [object] "Instance data"
     */

    function showControls(data) {
      data.$controls.addClass(RawClasses.visible);
      data.$controlItems.addClass(RawClasses.visible);
      data.$pagination.addClass(RawClasses.visible);

      enableControls(data, data.$controlItems);
    }

    /**
     * @method private
     * @name updateControls
     * @description Handles updating instance controls
     * @param data [object] "Instance data"
     */

    function updateControls(data) {
      data.$paginationItems.removeClass(RawClasses.active)
        .eq(data.index)
        .addClass(RawClasses.active);

      if (data.infinite) {
        data.$controlItems.addClass(RawClasses.visible);

        enableControls(data, data.$controlItems);
      } else if (data.pageCount < 1) {
        data.$controlItems.removeClass(RawClasses.visible);

        disableControls(data, data.$controlItems);
      } else {
        data.$controlItems.addClass(RawClasses.visible);

        enableControls(data, data.$controlItems);

        if (data.index <= 0) {
          data.$controlPrevious.removeClass(RawClasses.visible);

          disableControls(data, data.$controlPrevious);
        } else if (data.index >= data.pageCount - 1 || (!data.single && data.leftPosition === data.maxMove)) {
          data.$controlNext.removeClass(RawClasses.visible);

          disableControls(data, data.$controlNext);
        }
      }
    }

    /**
     * @method private
     * @name disableControls
     * @description Adds disabled prop to element
     * @param data [object] "Instance data"
     * @return [] "Target element"
     */

    function disableControls(data, $el) {
      if (!data.customControls) {
        $el.prop("disabled", true);
      }
    }

    /**
     * @method private
     * @name enableControls
     * @description Removes disabled prop to element
     * @param data [object] "Instance data"
     * @return [] "Target element"
     */

    function enableControls(data, $el) {
      if (!data.customControls) {
        $el.prop("disabled", false);
      }
    }

    /**
     * @method private
     * @name calculateVisible
     * @description Determines how many items should show at screen width
     * @param data [object] "Instance data"
     * @return [int] "New visible count"
     */

    function calculateVisible(data) {
      var show = 1;

      if (data.single) {
        return show;
      } else if (typeof data.show === "object") {
        for (var i in data.show) {
          if (data.show.hasOwnProperty(i)) {
            if (Formstone.support.matchMedia) {
              if (data.show[i].mq.matches) {
                show = data.show[i].count;
              }
            } else {
              // Fallback, grab the first breakpoint that's large enough
              if (data.show[i].width < Formstone.fallbackWidth) {
                show = data.show[i].count;
              }
            }
          }
        }
      } else {
        show = data.show;
      }

      return (data.fill && data.count < show) ? data.count : show;
    }

    /**
     * @method private
     * @name onPanStart
     * @description Handles pan start event
     * @param e [object] "Event data"
     */

    function onPanStart(e, fromLinked) {
      var data = e.data;

      Functions.clearTimer(data.autoTimer);

      if (!data.single) {
        if (data.useMargin) {
          data.leftPosition = parseInt(data.$canister.css("marginLeft"));
        } else {
          var matrix = data.$canister.css(TransformProperty).split(",");
          data.leftPosition = parseInt(matrix[4]); // ?
        }

        data.$canister.css(TransitionProperty, "none")
          .css("will-change", "transform");

        onPan(e);

        // Linked
        if (data.linked && fromLinked !== true) {
          var percent = e.deltaX / data.pageWidth;

          if (data.rtl) {
            percent *= -1;
          }

          $(data.linked).not(data.$el)[NamespaceClean]("panStart", percent);
        }
      }

      data.isTouching = true;
    }

    /**
     * @method private
     * @name onPan
     * @description Handles pan event
     * @param e [object] "Event data"
     */

    function onPan(e, fromLinked) {
      var data = e.data;

      if (!data.single) {
        data.touchLeft = checkPosition(data, data.leftPosition + e.deltaX);

        if (data.useMargin) {
          data.$canister.css({
            marginLeft: data.touchLeft
          });
        } else {
          data.$canister.css(TransformProperty, "translateX(" + data.touchLeft + "px)");
        }

        // Linked
        if (data.linked && fromLinked !== true) {
          var percent = e.deltaX / data.pageWidth;

          if (data.rtl) {
            percent *= -1;
          }

          $(data.linked).not(data.$el)[NamespaceClean]("pan", percent);
        }
      }
    }

    /**
     * @method private
     * @name onPanEnd
     * @description Handles pan end event
     * @param e [object] "Event data"
     */

    function onPanEnd(e, fromLinked) {
      var data = e.data,
        delta = Math.abs(e.deltaX),
        increment = getIncrement(data, e),
        index = false;

      data.didPan = false;

      if (increment == 0) {
        index = data.index;
      } else {
        if (!data.single) {
          var i, count,
            left = Math.abs(data.touchLeft),
            page = false,
            dir = (data.rtl) ? "right" : "left";

          if (e.directionX === dir) {
            // Left (RTL Right)
            for (i = 0, count = data.pages.length; i < count; i++) {
              page = data.pages[i];

              if (left > Math.abs(page.left) + 20) {
                index = i + 1;
              }
            }
          } else {
            // Right (RTL Left)
            for (i = data.pages.length - 1, count = 0; i >= count; i--) {
              page = data.pages[i];

              if (left < Math.abs(page.left)) {
                index = i - 1;
              }
            }
          }
        }

        if (index === false) {
          index = (delta < 50) ? data.index : data.index + increment;
        }
      }

      if (index !== data.index) {
        data.didPan = true;
      }

      // Linked
      if (data.linked && fromLinked !== true) {
        $(data.linked).not(data.$el)[NamespaceClean]("panEnd", index);
      }

      endTouch(data, index);
    }

    /**
     * @method private
     * @name linkedPanStart
     * @description Handles linked pan start
     * @param data [object] "Instance data"
     * @param percent [float] "Percentage moved"
     */

    function linkedPanStart(data, percent) {
      Functions.clearTimer(data.autoTimer);

      if (!data.single) {
        if (data.rtl) {
          percent *= -1;
        }

        if (data.useMargin) {
          data.leftPosition = parseInt(data.$canister.css("marginLeft"));
        } else {
          var matrix = data.$canister.css(TransformProperty).split(",");
          data.leftPosition = parseInt(matrix[4]); // ?
        }

        data.$canister.css(TransitionProperty, "none");

        var e = {
          data: data,
          deltaX: (data.pageWidth * percent)
        };

        onPan(e, true);
      }

      data.isTouching = true;
    }

    /**
     * @method private
     * @name linkedPan
     * @description Handles linked pan
     * @param data [object] "Instance data"
     * @param percent [float] "Percentage moved"
     */

    function linkedPan(data, percent) {
      if (!data.single) {
        if (data.rtl) {
          percent *= -1;
        }

        var delta = (data.pageWidth * percent);

        data.touchLeft = checkPosition(data, data.leftPosition + delta);

        if (data.useMargin) {
          data.$canister.css({
            marginLeft: data.touchLeft
          });
        } else {
          data.$canister.css(TransformProperty, "translateX(" + data.touchLeft + "px)");
        }
      }
    }

    /**
     * @method private
     * @name linkedPanEnd
     * @description Handles linked pan end
     * @param data [object] "Instance data"
     * @param index [int] "New Index"
     */

    function linkedPanEnd(data, index) {
      endTouch(data, index, true);
    }

    /**
     * @method private
     * @name onSwipe
     * @description Handles swipe event
     * @param e [object] "Event data"
     */

    function onSwipe(e, fromLinked) {
      var data = e.data,
        increment = getIncrement(data, e),
        index = data.index + increment;

      // Linked
      if (data.linked && fromLinked !== true) {
        $(data.linked).not(data.$el)[NamespaceClean]("swipe", e.directionX);
      }

      endTouch(data, index);
    }

    /**
     * @method private
     * @name linkedSwipe
     * @description Handles swipe event
     * @param data [object] "Instance data"
     * @param direction [string] "Swipe direction"
     */

    function linkedSwipe(data, direction) {
      var e = {
        data: data,
        directionX: direction
      };

      onSwipe(e, true);
    }

    /**
     * @method private
     * @name endTouch
     * @description Cleans up touch interactions
     * @param data [object] "Instance data"
     * @param index [object] "New index"
     */

    function endTouch(data, index) {
      data.$canister.css(TransitionProperty, "")
        .css("will-change", "");

      positionCanister(data, index);

      data.isTouching = false;
    }

    /**
     * @method private
     * @name onItemClick
     * @description Handles click to item
     * @param e [object] "Event data"
     */

    function onItemClick(e) {
      var data = e.data,
        $target = $(e.currentTarget);

      if (!data.didPan) {
        $target.trigger(Events.itemClick);

        if (data.controller) {
          var index = data.$items.index($target);

          onSubordinateUpdate(e, index);

          data.$subordinate[NamespaceClean]("jumpPage", index + 1, true);
        }
      }
    }

    /**
     * @method private
     * @name onItemFocus
     * @description Handles focus to item/element in item
     * @param e [object] "Event data"
     */

    function onItemFocus(e) {
      var data = e.data;

      if (data.enabled && !data.isTouching) {
        Functions.clearTimer(data.autoTimer);

        data.$container.scrollLeft(0);

        var $target = $(e.target),
          $active;

        if ($target.hasClass(RawClasses.item)) {
          $active = $target;
        } else if ($target.parents(Classes.item).length) {
          $active = $target.parents(Classes.item).eq(0);
        }

        for (var i = 0; i < data.pageCount; i++) {
          if (data.pages[i].$items.is($active)) {
            positionCanister(data, i);
            break;
          }
        }
      }
    }

    /**
     * @method private
     * @name onSubordinateUpdate
     * @description Handles update from subordinate
     * @param e [object] "Event data"
     * @param index [int] "Index"
     */

    function onSubordinateUpdate(e, index) {
      var data = e.data;

      if (data.controller) {
        var $active = data.$items.eq(index);

        data.$items.removeClass(RawClasses.active);
        $active.addClass(RawClasses.active);

        for (var i = 0; i < data.pageCount; i++) {
          if (data.pages[i].$items.is($active)) {
            positionCanister(data, i, true, true);
            break;
          }
        }
      }
    }

    /**
     * @method private
     * @name checkPosition
     * @description Checks if left pos is in range
     * @param data [object] "Event data"
     * @param e [object] "Event data"
     * @return [int] "Corrected left position"
     */

    function checkPosition(data, pos) {
      if (isNaN(pos)) {
        pos = 0;
      } else if (data.rtl) {
        if (pos > data.maxMove) {
          pos = data.maxMove;
        }
        if (pos < 0) {
          pos = 0;
        }
      } else {
        if (pos < data.maxMove) {
          pos = data.maxMove;
        }
        if (pos > 0) {
          pos = 0;
        }
      }

      return pos;
    }

    /**
     * @method private
     * @name getIncrement
     * @description Returns touch increment
     * @param data [object] "Instance data"
     * @param e [object] "Event data"
     * @return [int] "Target direction"
     */

    function getIncrement(data, e) {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        return 0;
      }

      return data.rtl ? ((e.directionX === "right") ? 1 : -1) : ((e.directionX === "left") ? 1 : -1);
    }

    /**
     * @plugin
     * @name Carousel
     * @description A jQuery plugin for simple content carousels.
     * @type widget
     * @main carousel.js
     * @main carousel.css
     * @dependency jQuery
     * @dependency core.js
     * @dependency mediaquery.js
     * @dependency touch.js
     */

    var Plugin = Formstone.Plugin("carousel", {
        widget: true,

        /**
         * @options
         * @param autoAdvance [boolean] <false> "Flag to auto advance items"
         * @param autoHeight [boolean] <false> "Flag to adjust carousel height to visible item(s)"
         * @param autoTime [int] <8000> "Auto advance time"
         * @param contained [boolean] <true> "Flag for 'overflow: visible'"
         * @param controls [boolean or object] <true> "Flag to draw controls OR object containing container, next and previous control selectors (Must be fully qualified selectors)"
         * @param customClass [string] <''> "Class applied to instance"
         * @param fill [boolean] <false> "Flag to fill viewport if item count is less then show count"
         * @param infinite [boolean] <false> "Flag for looping items"
         * @param labels.next [string] <'Next'> "Control text"
         * @param labels.previous [string] <'Previous'> "Control text"
         * @param labels.controls [string] <'Carousel {guid} Controls'> "Controls aria label; {guid} replaced with instance GUID"
         * @param labels.pagination [string] <'Carousel {guid} Pagination'> "Pagination aria label; {guid} replaced with instance GUID"
         * @param matchHeight [boolean] <false> "Flag to match item heights"
         * @param matchWidth [boolean] <true> "Flag to match item widths; Requires CSS widths if false"
         * @param maxWidth [string] <'Infinity'> "Width at which to auto-disable plugin"
         * @param minWidth [string] <'0'> "Width at which to auto-disable plugin"
         * @param paged [boolean] <false> "Flag for paged items"
         * @param pagination [boolean or string] <true> "Flag to draw pagination OR string containing pagination target selector (Must be fully qualified selector)"
         * @param rtl [boolean] <false> "Right to Left display"
         * @param show [int / object] <1> "Items visible per page; Object for responsive counts"
         * @param single [boolean] <false> "Flag to display single item at a time"
         * @param theme [string] <"fs-light"> "Theme class name"
         * @param touch [boolean] <true> "Use touch events"
         * @param useMargin [boolean] <false> "Use margins instead of css transitions (legacy browser support)"
         */

        defaults: {
          autoAdvance: false,
          autoHeight: false,
          autoTime: 8000,
          contained: true,
          controls: true,
          customClass: "",
          fill: false,
          infinite: false,
          labels: {
            next: "Next",
            previous: "Previous",
            controls: "Carousel {guid} Controls",
            pagination: "Carousel {guid} Pagination"
          },
          matchHeight: false,
          matchWidth: true,
          maxWidth: Infinity,
          minWidth: '0px',
          paged: false,
          pagination: true,
          rtl: false,
          show: 1,
          single: false,
          theme: "fs-light",
          touch: true,
          useMargin: false
        },

        classes: [
          "ltr",
          "rtl",

          "viewport",
          "wrapper",
          "container",
          "canister",

          "item",
          "item_previous",
          "item_next",

          "controls",
          "controls_custom",

          "control",
          "control_previous",
          "control_next",

          "pagination",
          "page",

          "animated",
          "enabled",
          "visible",
          "active",
          "auto_height",
          "contained",
          "single"
        ],

        /**
         * @events
         * @event itemClick.carousel "Item clicked; Triggered on carousel item"
         * @event update.carousel "Carousel position updated"
         */

        events: {
          itemClick: "itemClick",
          update: "update"
        },

        methods: {
          _construct: construct,
          _destruct: destruct,
          _resize: resize,

          disable: disable,
          enable: enable,

          // Backwards compat?
          jump: jumpPage,
          previous: previousPage,
          next: nextPage,
          // Pages
          jumpPage: jumpPage,
          previousPage: previousPage,
          nextPage: nextPage,
          // Items
          jumpItem: jumpItem,

          reset: resetInstance,
          resize: resizeInstance,
          update: updateItems,

          panStart: linkedPanStart,
          pan: linkedPan,
          panEnd: linkedPanEnd,
          swipe: linkedSwipe
        }
      }),

      // Localize References

      Namespace = Plugin.namespace,
      NamespaceClean = Plugin.namespaceClean,
      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions,

      $Instances = [],

      TransformProperty = Formstone.transform,
      TransitionProperty = Formstone.transition;

  })

);
