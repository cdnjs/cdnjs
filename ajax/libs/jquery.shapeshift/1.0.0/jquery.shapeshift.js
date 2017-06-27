;(function($,window,undefined) {
  var pluginName = 'shapeshift',
      document = window.document,
      defaults = {
        // Features
        centerGrid: true,
        enableAnimation: true,
        enableAnimationOnInit: false,
        enableAutoHeight: true,
        enableDrag: true,
        enableDragAnimation: true,
        enableRearrange: true,
        enableResize: true,
        enableTrash: false,

        // Options
        animateSpeed: 160,
        columns: null,
        dragClone: false,
        dragRate: 75,
        dragWhitelist: "*",
        dropCutoff: 0,
        dropWhitelist: "*",
        gutterX: 10,
        gutterY: 10,
        minHeight: 200,
        paddingY: 0,
        paddingX: 0,
        selector: ""
      };

  function Plugin(element, options) {
    var ss = this;
    ss.container = $(element);
    ss.options = $.extend({}, defaults, options);
    ss.init();
  }

  Plugin.prototype.init = function() {
    var ss = this;
    ss.initialized = false;
    ss.eventSetup();
    ss.container.trigger("ss-event-arrange");
  };

  Plugin.prototype.eventSetup = function() {
    var ss = this,
        options = ss.options;

    ss.container.attr("data-ss-rearrangeable", options.enableRearrange)
    ss.container.off("ss-event-arrange").on("ss-event-arrange", function() { ss.arrange(); });
    ss.container.off("ss-event-dragreset").on("ss-event-dragreset", function() { ss.dragClear(); ss.drag(); });

    if(jQuery.ui) {
      if(jQuery.ui.draggable) {
        if(options.enableDrag) {
          ss.container.trigger('ss-event-dragreset');
        } else {
          ss.dragClear();
        }
      } else if(options.enableDrag) {
        alert("jQuery.shapeshift is trying to enable drag and drop but jQuery UI Draggable/Droppable has not been included yet.")
      }
    } else if(options.enableDrag) {
      alert("jQuery.shapeshift is trying to enable drag and drop but jQuery UI has not been included yet.")
    }
    if(options.enableResize) { ss.resize(); }
  }

  Plugin.prototype.arrange = function() {
    var ss = this,
        options = ss.options,
        $objects = ss.container.children(options.selector).filter(':visible'),
        positions = ss.getPositions(ss.container, false),
        initialized = ss.initialized,
        animated = true;

    if($objects.filter(".ss-moving")[0]) {
      animated = options.enableDragAnimation;
    } else {
      animated = options.enableAnimation;
    }

    if(!initialized) {
      animated = options.enableAnimationOnInit;
    }

    // Animate / Move each object into place
    for(var obj_i=0;obj_i<positions.length;obj_i++) {
      var $obj = $($objects[obj_i]);

      // Never animate the currently dragged item
      if(!$obj.hasClass("ss-moving")) {
        if(animated) {
          $obj.stop(true, false).animate(positions[obj_i], options.animateSpeed);
        } else {
          $obj.css(positions[obj_i]);
        }
      }
    }

    // Set the container height to match the tallest column
    ss.container.css("height", options.containerHeight);

    if(!initialized) {ss.initialized = true;}
  }

  Plugin.prototype.drag = function () {
    var ss = this,
        options = ss.options;

    $curContainer = ss.container;

    var $objects = ss.container.children(options.selector),
        $selected, selectedOffsetY, selectedOffsetX, position,
        dragging = false;

    // Dragging
    $objects.filter(options.dragWhitelist).draggable({
      addClasses: false,
      containment: 'document',
      zIndex: 9999,
      drag: function(e, ui) { drag(e, ui); },
      start: function(e, ui) { start(e, ui); },
      stop: function(e, ui) { stop(e); }
    });

    function start(e, ui) {
      $selected = $(e.target);
      selectedOffsetY = $selected.outerHeight() / 2;
      selectedOffsetX = $selected.outerWidth() / 2;
      $curContainer = $selected.parent();
      if(options.dragClone) {
        $clone = $selected.clone().insertBefore($selected).addClass("ss-clone");
      }
      $selected.addClass("ss-moving");
      $curContainer.trigger("ss-event-dragged", $selected);
    }

    function stop(e) {
      $clone = $(".ss-clone");
      if($clone[0]) {
        $cloneContainer = $clone.parent();
        if($cloneContainer[0] === $selected.parent()[0]) {
          $clone.remove();
        } else {
          $clone.removeClass("ss-clone");
          $cloneContainer.trigger("ss-event-dragreset");
          $selected.parent().trigger("ss-event-dragreset");
        }
      }
      $(e.target).removeClass("ss-moving").parent().trigger("ss-event-arrange");
    }

    function drag(e, ui) {
      if(!dragging && $curContainer.data("ss-rearrangeable")) {
        dragging = true;
        position = ss.getIntendedPosition(e);
        $objects = $curContainer.children(":not(.ss-moving):visible");
        if(position != $objects.size()) {
          if($curContainer[0] != $selected.parent()[0]) {
            $target = $objects.last();
            if($target[0]) {
              $selected.insertAfter($target);
            } else {
              $curContainer.prepend($selected);
            }
          } else {
            $target = $objects.get(position);
            $selected.insertBefore($target);
          }
        } else {
          $target = $objects.get(position - 1);
          $selected.insertAfter($target);
        }

        if(!$target) { $selected.appendTo($curContainer); }

        $curContainer.trigger("ss-event-arrange");
        $(".ss-prev-container").trigger("ss-event-arrange");

        window.setTimeout(function() {
          dragging = false;
        }, options.dragRate)
      }
      // Manually override the elements position
      ui.position.left = e.pageX - $selected.parent().offset().left - selectedOffsetX;
      ui.position.top = e.pageY - $selected.parent().offset().top - selectedOffsetY;
    }

    // Dropping
    ss.container.droppable({
      accept: options.dropWhitelist,
      tolerance: 'intersect',
      drop: function(e) { drop(e); },
      over: function(e) { over(e); }
    });

    function drop(e) {
      if(options.enableTrash) {
        $selected = $(".ss-moving").remove();
        $(".ss-prev-container").trigger("ss-event-arrange").trigger("ss-event-destroyed", $selected)
      } else {
        $selected = $(".ss-moving").removeClass("ss-moving");
        $selectedContainer = $selected.parent();
        $selectedContainer.trigger("ss-event-arrange").trigger("ss-event-dropped", $selected);
      }
    }

    function over(e) {
      $curContainer.addClass("ss-prev-container");
      $curContainer = $(e.target).removeClass("ss-prev-container");
    }
  }

  Plugin.prototype.dragClear = function() {
    this.container.droppable().droppable('destroy');
    this.container.children().draggable().draggable('destroy');
  }

  Plugin.prototype.getPositions = function($container, ignoreSelected) {
    var ss = this,
        options = ss.options,
        $objects = $container.children(options.selector).filter(":visible"),
        columns = options.columns,
        colHeights = [],
        colWidth = null,
        gridOffset = options.paddingX,
        positions = [];

    // If we want to get the positions for all items excluding the
    // one currently being dragged.
    if(ignoreSelected) { $objects = $objects.not(".ss-moving"); }

    // Determine the width of each element.
    options.childWidth = $objects.first().outerWidth(true);

    // Determine the column width.
    colWidth = options.childWidth + options.gutterX;

    // Determine how many columns are currently active
    if(!columns) {
      columns = Math.floor($container.innerWidth() / colWidth);
      if(columns > $objects.length) { columns = $objects.length; }
    }

    // Offset the grid to center it.
    if(options.centerGrid) {
      gridOffset = Math.floor(($container.innerWidth() - (columns * colWidth)) / 2) + (options.gutterX / 2)
    }

    // Create an array element for each column, which is then
    // used to store that columns current height.
    for(var i=0;i<columns;i++) {colHeights.push(options.paddingY);}

    // Loop over each element and determine what column it fits into
    for(var obj_i=0;obj_i<$objects.length;obj_i++) {
      var $obj = $($objects[obj_i]),
          col = $.inArray(Math.min.apply(window,colHeights), colHeights),
          height = $obj.outerHeight(true) + options.gutterY,
          offsetX = (colWidth * col) + gridOffset,
          offsetY = colHeights[col];

      // Store the position to animate into place later
      attributes = { left: offsetX, top: offsetY };
      positions[obj_i] = attributes;

      // Increase the calculated total height of the current column
      colHeights[col] += height;
    }
    // Store the height of the tallest column
    if(options.enableAutoHeight){
      height = Math.max.apply(Math,colHeights);
      if(height < options.minHeight) { height = options.minHeight; }
      options.containerHeight = height;
    }
    return positions;
  }

  Plugin.prototype.getIntendedPosition = function(e) {
    var ss = this,
        options = ss.options,
        $selected = $(".ss-moving"),
        $container = $selected.parent(),
        chosenIndex = 0,
        selectedX = $selected.position().left + (options.childWidth / 2),
        selectedY = $selected.position().top + ($selected.outerHeight() / 2),
        shortestDistance = 9999,
        positions = ss.getPositions($container, true),
        endCap = positions.length - options.dropCutoff;

    // Go over all of those positions and figure out
    // which is the closest to the cursor.
    for(var hov_i=0;hov_i<positions.length;hov_i++) {
      // If we are able to insert at this index position
      if(hov_i < endCap) {
        attributes = positions[hov_i];

        // If the current item is to the bottom right of the current object position
        if(selectedX > attributes.left && selectedY > attributes.top) {
          var xDist = selectedX - attributes.left,
              yDist = selectedY - attributes.top;

          distance = Math.sqrt((xDist * xDist) + (yDist * yDist));

          // If this is the shortest distance so far
          if(distance < shortestDistance) {
            shortestDistance = distance;
            chosenIndex = hov_i;

            // If this is the last item, and we are below it or to the right,
            // then we may want to insert it as the last item.
            if(hov_i === positions.length - 1) {
              var $object = $container.children().not(".ss-moving").last();
              if(yDist > $object.outerHeight() * .75 || xDist > options.childWidth * .75 || xDist < 0) {
                chosenIndex++;
              }
            }
          }
        }
      }
    }
    // Return the intended index position
    return chosenIndex;
  }

  Plugin.prototype.resize = function () {
    var ss = this,
        resizing = false;

    $(window).on("resize", function() {
      if(!resizing) {
        resizing = true;
        setTimeout(function() {
          resizing = false;
          ss.container.trigger("ss-event-arrange");
        }, 75);
      }
    });
  }

  // Prevent against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
    });
  }

}(jQuery, window));