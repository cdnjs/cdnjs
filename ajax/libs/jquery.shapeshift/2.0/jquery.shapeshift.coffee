#  Project: jQuery.Shapeshift
#  Description: Align elements to grid with drag and drop.
#  Author: Scott Elwood
#  Maintained By: We the Media, inc.
#  License: MIT

(($, window, document) ->
  pluginName = "shapeshift"
  defaults =
    # The Basics
    selector: "*"

    # Features
    enableDrag: true
    enableCrossDrop: true
    enableResize: true
    enableTrash: false

    # Grid Properties
    align: "center"
    colWidth: null
    columns: null
    minColumns: 1
    autoHeight: true
    maxHeight: null
    minHeight: 100
    gutterX: 10
    gutterY: 10
    paddingX: 10
    paddingY: 10

    # Animation
    animated: true
    animateOnInit: false
    animationSpeed: 225
    animationThreshold: 100

    # Drag/Drop Options
    dragClone: false
    deleteClone: true
    dragRate: 100
    dragWhitelist: "*"
    crossDropWhitelist: "*"
    cutoffStart: null
    cutoffEnd: null
    handle: false

    # Customize CSS
    cloneClass: "ss-cloned-child"
    activeClass: "ss-active-child"
    draggedClass: "ss-dragged-child"
    placeholderClass: "ss-placeholder-child"
    originalContainerClass: "ss-original-container"
    currentContainerClass: "ss-current-container"
    previousContainerClass: "ss-previous-container"

  class Plugin
    constructor: (@element, options) ->
      @options = $.extend {}, defaults, options
      @globals = {}
      @$container = $(element)

      if @errorCheck()
        @init()


    # ----------------------------
    # errorCheck:
    # Determine if there are any conflicting options
    # ----------------------------
    errorCheck: ->
      options = @options
      errors = false
      error_msg = "Shapeshift ERROR:"

      # If there are no available children, a colWidth must be set
      if options.colWidth is null
        $children = @$container.children(options.selector)

        if $children.length is 0
          errors = true
          console.error "#{error_msg} option colWidth must be specified if Shapeshift is initialized with no active children."

      return !errors

    # ----------------------------
    # Init:
    # Only enable features on initialization,
    # then call a full render of the elements
    # ----------------------------
    init: ->
      @createEvents()
      @setGlobals()
      @setIdentifier()
      @setActiveChildren()
      @enableFeatures()
      @gridInit()
      @render()
      @afterInit()

    # ----------------------------
    # createEvents:
    # Triggerable events on the container
    # which run certain functions
    # ----------------------------
    createEvents: ->
      options = @options
      $container = @$container

      $container.off("ss-arrange").on "ss-arrange", (e, trigger_drop_finished = false) => @render(false, trigger_drop_finished)
      $container.off("ss-rearrange").on "ss-rearrange", => @render(true)
      $container.off("ss-setTargetPosition").on "ss-setTargetPosition", => @setTargetPosition()
      $container.off("ss-destroy").on "ss-destroy", => @destroy()

    # ----------------------------
    # setGlobals:
    # Globals that only need to be set on initialization
    # ----------------------------
    setGlobals: ->
      # Prevent initial animation if applicable
      @globals.animated = @options.animateOnInit

    # ----------------------------
    # afterInit:
    # Take care of some dirty business
    # ----------------------------
    afterInit: ->
      # Return animation to normal
      @globals.animated = @options.animated
    
    # ----------------------------
    # setIdentifier
    # Create a random identifier to tie to this container so that
    # it is easy to unbind the specific resize event from the browser
    # ----------------------------
    setIdentifier: ->
      @identifier = "shapeshifted_container_" + Math.random().toString(36).substring(7)
      @$container.addClass(@identifier)

    # ----------------------------
    # enableFeatures:
    # Enables options features
    # ----------------------------
    enableFeatures: ->
      @enableResize() if @options.enableResize
      @enableDragNDrop() if @options.enableDrag or @options.enableCrossDrop

    # ----------------------------
    # setActiveChildren:
    # Make sure that only the children set by the
    # selector option can be affected by Shapeshifting
    # ----------------------------
    setActiveChildren: ->
      options = @options

      # Add active child class to each available child element
      $children = @$container.children(options.selector)
      active_child_class = options.activeClass
      total = $children.length

      for i in [0...total]
        $($children[i]).addClass(active_child_class)

      @setParsedChildren()

      # Detect if there are any colspans wider than
      # the column options that were set
      columns = options.columns
      for i in [0...@parsedChildren.length]
        colspan = @parsedChildren[i].colspan

        min_columns = options.minColumns
        if colspan > columns and colspan > min_columns
          options.minColumns = colspan
          console.error "Shapeshift ERROR: There are child elements that have a larger colspan than the minimum columns set through options.\noptions.minColumns has been set to #{colspan}"

    # ----------------------------
    # setParsedChildren:
    # Calculates and returns commonly used 
    # attributes for all the active children
    # ----------------------------
    setParsedChildren: ->
      $children = @$container.find("." + @options.activeClass).filter(":visible")
      total = $children.length

      parsedChildren = []
      for i in [0...total]
        $child = $($children[i])
        child =
          i: i
          el: $child
          colspan: parseInt($child.attr("data-ss-colspan")) || 1
          height: $child.outerHeight()
        parsedChildren.push child
      @parsedChildren = parsedChildren

    # ----------------------------
    # setGrid:
    # Calculates the dimensions of each column
    # and determines to total number of columns
    # ----------------------------
    gridInit: ->
      gutter_x = @options.gutterX

      unless @options.colWidth >= 1
        # Determine single item / col width
        first_child = @parsedChildren[0]
        fc_width = first_child.el.outerWidth()
        fc_colspan = first_child.colspan
        single_width = (fc_width - ((fc_colspan - 1) * gutter_x)) / fc_colspan
        @globals.col_width = single_width + gutter_x
      else
        @globals.col_width = @options.colWidth + gutter_x

    # ----------------------------
    # render:
    # Determine the active children and
    # arrange them to the calculated grid
    # ----------------------------
    render: (reparse = false, trigger_drop_finished) ->
      @setGridColumns()
      @arrange(reparse, trigger_drop_finished)

    # ----------------------------
    # setGrid:
    # Calculates the dimensions of each column
    # and determines to total number of columns
    # ----------------------------
    setGridColumns: ->
      # Common
      globals = @globals
      options = @options
      col_width = globals.col_width
      gutter_x = options.gutterX
      padding_x = options.paddingX
      inner_width = @$container.innerWidth() - (padding_x * 2)

      # Determine how many columns there currently can be
      minColumns = options.minColumns
      columns = options.columns || Math.floor (inner_width + gutter_x) / col_width
      if minColumns and minColumns > columns
        columns = minColumns
      globals.columns = columns

      # Columns cannot exceed children
      children_count = @parsedChildren.length
      if columns > children_count
        columns = children_count

      # Calculate the child offset from the left
      globals.child_offset = padding_x
      switch options.align
        when "center"
          grid_width = (columns * col_width) - gutter_x
          globals.child_offset += (inner_width - grid_width) / 2

        when "right"
          grid_width = (columns * col_width) - gutter_x
          globals.child_offset += (inner_width - grid_width)

    # ----------------------------
    # arrange:
    # Animates the elements into their calcluated positions
    # ----------------------------
    arrange: (reparse, trigger_drop_finished) ->
      @setParsedChildren() if reparse

      globals = @globals
      options = @options

      # Common
      $container = @$container
      child_positions = @getPositions()

      parsed_children = @parsedChildren
      total_children = parsed_children.length
      
      animated = globals.animated and total_children <= options.animationThreshold
      animation_speed = options.animationSpeed
      dragged_class = options.draggedClass

      # Arrange each child element
      for i in [0...total_children]
        $child = parsed_children[i].el
        attributes = child_positions[i]
        is_dragged_child = $child.hasClass(dragged_class)

        if is_dragged_child
          placeholder_class = options.placeholderClass
          $child = $child.siblings("." + placeholder_class)

        if animated and !is_dragged_child
          $child.stop(true, false).animate attributes, animation_speed, ->
        else
          $child.css attributes


      if trigger_drop_finished
        if animated
          setTimeout (->
            $container.trigger("ss-drop-complete")
          ), animation_speed
        else
          $container.trigger("ss-drop-complete")
      $container.trigger("ss-arranged")

      # Set the container height
      if options.autoHeight
        container_height = globals.container_height
        max_height = options.maxHeight
        min_height = options.minHeight

        if min_height and container_height < min_height
          container_height = min_height
        else if max_height and container_height > max_height
          container_height = max_height

        $container.height container_height

    # ----------------------------
    # getPositions:
    # Go over each child and determine which column they
    # fit into and return an array of their x/y dimensions
    # ----------------------------
    getPositions: (include_dragged = true) ->
      globals = @globals
      options = @options
      gutter_y = options.gutterY
      padding_y = options.paddingY
      dragged_class = options.draggedClass

      parsed_children = @parsedChildren
      total_children = parsed_children.length

      # Store the height for each column
      col_heights = []
      for i in [0...globals.columns]
        col_heights.push padding_y

      # ----------------------------
      # savePosition
      # Takes a child which has been correctly placed in a
      # column and saves it to that final x/y position.
      # ----------------------------
      savePosition = (child) =>
        col = child.col
        colspan = child.colspan
        offset_x = (child.col * globals.col_width) + globals.child_offset
        offset_y = col_heights[col]

        positions[child.i] = left: offset_x, top: offset_y
        col_heights[col] += child.height + gutter_y

        if colspan >= 1
          for j in [1...colspan]
            col_heights[col + j] = col_heights[col]

      # ----------------------------
      # determineMultiposition
      # Children with multiple column spans will need special
      # rules to determine if they are currently able to be
      # placed in the grid.
      # ----------------------------
      determineMultiposition = (child) =>
        # Only use the columns that this child can fit into
        possible_cols = col_heights.length - child.colspan + 1
        possible_col_heights = col_heights.slice(0).splice(0, possible_cols)

        chosen_col = undefined
        for offset in [0...possible_cols]
          col = @lowestCol(possible_col_heights, offset)
          colspan = child.colspan
          height = col_heights[col]

          kosher = true

          # Determine if it is able to be placed at this col
          for span in [1...colspan]
            next_height = col_heights[col + span]

            # The next height must not be higher
            if height < next_height
              kosher = false
              break

          if kosher
            chosen_col = col
            break

        return chosen_col

      # ----------------------------
      # recalculateSavedChildren
      # Sometimes child elements cannot save the first time around,
      # iterate over those children and determine if its ok to place now.
      # ----------------------------
      saved_children = []
      recalculateSavedChildren = =>
        to_pop = []
        for saved_i in [0...saved_children.length]
          saved_child = saved_children[saved_i]
          saved_child.col = determineMultiposition(saved_child)

          if saved_child.col >= 0
            savePosition(saved_child)
            to_pop.push(saved_i)

        # Popeye. Lol.
        for pop_i in [to_pop.length - 1..0] by -1
          index = to_pop[pop_i]
          saved_children.splice(index,1)

      # ----------------------------
      # determinePositions
      # Iterate over all the parsed children and determine
      # the calculations needed to get its x/y value.
      # ----------------------------
      positions = []
      do determinePositions = =>
        for i in [0...total_children]
          child = parsed_children[i]

          unless !include_dragged and child.el.hasClass(dragged_class)
            if child.colspan > 1
              child.col = determineMultiposition(child)
            else
              child.col = @lowestCol(col_heights)

            if child.col is undefined
              saved_children.push child
            else
              savePosition(child)

            recalculateSavedChildren()

      # Store the container height since we already have the data
      if options.autoHeight
        grid_height = col_heights[@highestCol(col_heights)] - gutter_y
        globals.container_height = grid_height + padding_y

      return positions

    # ----------------------------
    # enableDrag:
    # Optional feature.
    # Initialize dragging.
    # ----------------------------
    enableDragNDrop: ->
      options = @options

      $container = @$container
      active_class = options.activeClass
      dragged_class = options.draggedClass
      placeholder_class = options.placeholderClass
      original_container_class = options.originalContainerClass
      current_container_class = options.currentContainerClass
      previous_container_class = options.previousContainerClass
      delete_clone = options.deleteClone
      drag_rate = options.dragRate
      drag_clone = options.dragClone
      clone_class = options.cloneClass

      $selected = $placeholder = $clone = selected_offset_y = selected_offset_x = null
      dragging = false

      if options.enableDrag
        $container.children("." + active_class).filter(options.dragWhitelist).draggable
          addClasses: false
          containment: 'document'
          handle: options.handle
          zIndex: 9999

          start: (e, ui) ->
            # Set $selected globals
            $selected = $(e.target)

            if drag_clone
              $clone = $selected.clone(true).insertBefore($selected).addClass(clone_class)

            $selected.addClass(dragged_class)

            # Create Placeholder
            selected_tag = $selected.prop("tagName")
            $placeholder = $("<#{selected_tag} class='#{placeholder_class}' style='height: #{$selected.height()}px; width: #{$selected.width()}px'></#{selected_tag}>")
            
            # Set current container
            $selected.parent().addClass(original_container_class).addClass(current_container_class)

            # For manually centering the element with respect to mouse position
            selected_offset_y = $selected.outerHeight() / 2
            selected_offset_x = $selected.outerWidth() / 2

          drag: (e, ui) =>
            if !dragging and !(drag_clone and delete_clone and $("." + current_container_class)[0] is $("." + original_container_class)[0])
              # Append placeholder to container
              $placeholder.remove().appendTo("." + current_container_class)

              # Set drag target and rearrange everything
              $("." + current_container_class).trigger("ss-setTargetPosition")

              # Disallow dragging from occurring too much
              dragging = true
              window.setTimeout ( ->
                dragging = false
              ), drag_rate

            # Manually center the element with respect to mouse position
            ui.position.left = e.pageX - $selected.parent().offset().left - selected_offset_x;
            ui.position.top = e.pageY - $selected.parent().offset().top - selected_offset_y;

          stop: ->
            $original_container = $("." + original_container_class)
            $current_container = $("." + current_container_class)
            $previous_container = $("." + previous_container_class)

            # Clear globals
            $selected.removeClass(dragged_class)
            $("." + placeholder_class).remove()

            if drag_clone
              if delete_clone and $("." + current_container_class)[0] is $("." + original_container_class)[0]
                $clone.remove()
                $("." + current_container_class).trigger("ss-rearrange")
              else
                $clone.removeClass(clone_class)

            # Trigger Events
            if $original_container[0] is $current_container[0]
              $current_container.trigger("ss-rearranged", $selected)
            else
              $original_container.trigger("ss-removed", $selected)
              $current_container.trigger("ss-added", $selected)

            # Arrange dragged item into place and clear container classes
            $original_container.trigger("ss-arrange").removeClass(original_container_class)
            $current_container.trigger("ss-arrange", true).removeClass(current_container_class)
            $previous_container.trigger("ss-arrange").removeClass(previous_container_class)

            $selected = $placeholder = null


      if options.enableCrossDrop
        $container.droppable
          accept: options.crossDropWhitelist
          tolerance: 'intersect'
          over: (e) =>
            $("." + previous_container_class).removeClass(previous_container_class)
            $("." + current_container_class).removeClass(current_container_class).addClass(previous_container_class)
            $(e.target).addClass(current_container_class)

          drop: (e, selected) =>
            if @options.enableTrash
              $original_container = $("." + original_container_class)
              $current_container = $("." + current_container_class)
              $previous_container = $("." + previous_container_class)
              $selected = $(selected.helper)

              $current_container.trigger("ss-trashed", $selected)
              $selected.remove()

              $original_container.trigger("ss-rearrange").removeClass(original_container_class)
              $current_container.trigger("ss-rearrange").removeClass(current_container_class)
              $previous_container.trigger("ss-arrange").removeClass(previous_container_class)

    # ----------------------------
    # getTargetPosition:
    # Determine the target position for the selected
    # element and arrange it into place
    # ----------------------------
    setTargetPosition: ->
      options = @options

      unless options.enableTrash
        dragged_class = options.draggedClass

        $selected = $("." + dragged_class)
        $start_container = $selected.parent()
        parsed_children = @parsedChildren
        child_positions = @getPositions(false)
        total_positions = child_positions.length

        selected_x = $selected.offset().left - $start_container.offset().left + (@globals.col_width / 2)
        selected_y = $selected.offset().top - $start_container.offset().top + ($selected.height() / 2)

        shortest_distance = 9999999
        target_position = 0

        if total_positions > 1
          cutoff_start = options.cutoffStart + 1 || 0
          cutoff_end = options.cutoffEnd || total_positions

          for position_i in [cutoff_start...cutoff_end]
            attributes = child_positions[position_i]

            if attributes
              y_dist = selected_x - attributes.left
              x_dist = selected_y - attributes.top

              if y_dist > 0 and x_dist > 0
                distance = Math.sqrt((x_dist * x_dist) + (y_dist * y_dist))

                if distance < shortest_distance
                  shortest_distance = distance
                  target_position = position_i

                  if position_i is total_positions - 1
                    if y_dist > parsed_children[position_i].height / 2
                      target_position++



          if target_position is parsed_children.length
            $target = parsed_children[target_position - 1].el
            $selected.insertAfter($target)
          else
            $target = parsed_children[target_position].el
            $selected.insertBefore($target)
        else
          if total_positions is 1
            attributes = child_positions[0]

            if attributes.left < selected_x
              @$container.append $selected
            else
              @$container.prepend $selected
          else
            @$container.append $selected
        
        @arrange(true)

        if $start_container[0] isnt $selected.parent()[0]
          previous_container_class = options.previousContainerClass
          $("." + previous_container_class).trigger "ss-rearrange"
      else
        placeholder_class = @options.placeholderClass
        $("." + placeholder_class).remove()

    # ----------------------------
    # resize:
    # Optional feature.
    # Runs a full render of the elements when
    # the browser window is resized.
    # ----------------------------
    enableResize: ->
      animation_speed = @options.animationSpeed

      resizing = false
      binding = "resize." + @identifier
      $(window).on binding, =>
        unless resizing
          resizing = true

          # Some funkyness to prevent too many renderings
          setTimeout (=> @render()), animation_speed / 3
          setTimeout (=> @render()), animation_speed / 3

          setTimeout =>
            resizing = false
            @render()
          , animation_speed / 3

    # ----------------------------
    # lowestCol:
    # Helper
    # Returns the index position of the
    # array column with the lowest number
    # ----------------------------
    lowestCol: (array, offset = 0) ->
      length = array.length
      augmented_array = []
      
      for i in [0...length]
        augmented_array.push [array[i], i]

      augmented_array.sort (a, b) ->
          ret = a[0] - b[0]
          ret = a[1] - b[1] if ret is 0
          ret
      augmented_array[offset][1]

    # ----------------------------
    # highestCol:
    # Helper
    # Returns the index position of the
    # array column with the highest number
    # ----------------------------
    highestCol: (array) ->
      $.inArray Math.max.apply(window,array), array

    # ----------------------------
    # destroy:
    # ----------------------------
    destroy: ->
      $container = @$container
      $container.off("ss-arrange")
      $container.off("ss-rearrange")
      $container.off("ss-setTargetPosition")
      $container.off("ss-destroy")

      active_class = @options.activeClass
      $active_children = $container.find("." + active_class)
      
      if @options.enableDrag
        $active_children.draggable('destroy')
      if @options.enableCrossDrop
        $container.droppable('destroy')

      $active_children.removeClass(active_class)
      $container.removeClass(@identifier)


  $.fn[pluginName] = (options) ->
    @each ->
      # Destroy any old resize events
      old_class = $(@).attr("class").match(/shapeshifted_container_\w+/)?[0]
      if old_class
        bound_indentifier = "resize." + old_class
        $(window).off(bound_indentifier)
        $(@).removeClass(old_class)

      # Create the new plugin instance
      $.data(@, "plugin_#{pluginName}", new Plugin(@, options))

)(jQuery, window, document)