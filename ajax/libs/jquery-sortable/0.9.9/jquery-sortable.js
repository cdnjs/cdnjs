/* ===================================================
 *  jquery-sortable.js v0.9.9
 *  http://johnny.github.com/jquery-sortable/
 * ===================================================
 *  Copyright (c) 2012 Jonas von Andrian
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *  * The name of the author may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 *  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * ========================================================== */

!function ( $, window, undefined){
  var eventNames,
  pluginName = 'sortable',
  containerDefaults = {
    // If true, items can be dragged from this container
    drag: true,
    // If true, items can be droped onto this container
    drop: true,
    // Exclude items from being draggable, if the
    // selector matches the item
    exclude: "",
    // If true, search for nested containers within an item
    nested: true,
    // If true, the items are assumed to be arranged vertically
    vertical: true
  }, // end container defaults
  groupDefaults = {
    // This is executed after the placeholder has been moved.
    afterMove: function ($placeholder, container) {
    },
    // The css selector of the containers
    containerSelector: "ol, ul",
    // Distance the mouse has to travel to start dragging
    distance: 0,
    // The css selector of the drag handle
    handle: "",
    // The css selector of the items
    itemSelector: "li",
    // Check if the dragged item may be inside the container.
    // Use with care, since the search for a valid container entails a depth first search
    // and may be quite expensive.
    isValidTarget: function ($item, container) {
      return true
    },
    // Executed before onDrop if placeholder is detached.
    // This happens if pullPlaceholder is set to false and the drop occurs outside a container.
    onCancel: function ($item, container, _super) {
    },
    // Executed at the beginning of a mouse move event.
    // The Placeholder has not been moved yet
    onDrag: function ($item, position, _super) {
      $item.css(position)
    },
    // Called after the drag has been started,
    // that is the mouse button is beeing held down and
    // the mouse is moving.
    // The container is the closest initialized container.
    // Therefore it might not be the container, that actually contains the item.
    onDragStart: function ($item, container, _super) {
      $item.css({
        height: $item.height(),
        width: $item.width()
      })
      $item.addClass("dragged")
      $("body").addClass("dragging")
    },
    // Called when the mouse button is beeing released
    onDrop: function ($item, container, _super) {
      $item.removeClass("dragged").removeAttr("style")
      $("body").removeClass("dragging")
    },
    // Template for the placeholder. Can be any valid jQuery input
    // e.g. a string, a DOM element
    placeholder: '<li class="placeholder"/>',
    // If true, the position of the placeholder is calculated on every mousemove.
    // If false, it is only calculated when the mouse is above a container.
    pullPlaceholder: true,
    // Specifies serialization of the container group.
    // The pair $parent/$children is either container/items or item/subcontainers
    serialize: function ($parent, $children, parentIsContainer) {
      var result = $.extend({}, $parent.data())

      if($children[0])
        result.children = $children
      delete result.sortable

      return result
    },
    // Set tolerance while dragging. Positive values will decrease sensitivity.
    tolerance: 0
  }, // end group defaults
  containerGroups = {},
  groupCounter = 0

  if('ontouchstart' in window){
    eventNames = {
      start: "touchstart.sortable",
      end: "touchend.sortable touchcancel.sortable",
      move: "touchmove.sortable"
    }
  } else {
    eventNames = {
      start: "mousedown.sortable",
      end: "mouseup.sortable",
      move: "mousemove.sortable"
    }
  }

  /*
   * a is Array [left, right, top, bottom]
   * b is array [left, top]
   */
  function d(a,b) {
    var x = Math.max(0, a[0] - b[0], b[0] - a[1]),
    y = Math.max(0, a[2] - b[1], b[1] - a[3])
    return x+y;
  }

  function remove(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
  }

  function setDimensions(array, dimensions, useOffset) {
    var i = array.length,
    offsetMethod = useOffset ? "offset" : "position"
    while(i--){
      var el = array[i].el ? array[i].el : $(array[i]),
      // use fitting method
      pos = el[offsetMethod]()
      dimensions[i] = [
        pos.left,
        pos.left + el.outerWidth(true),
        pos.top,
        pos.top + el.outerHeight(true)
      ]
    }
  }

  function getRelativePosition(pointer, element) {
    var offset = element.offset()
    return {
      left: pointer.left - offset.left,
      top: pointer.top - offset.top
    }
  }

  function sortByDistanceDesc(dimensions, pointer, lastPointer) {
    pointer = [pointer.left, pointer.top]
    lastPointer = lastPointer && [lastPointer.left, lastPointer.top]

    var dim,
    i = dimensions.length,
    distances = []

    while(i--){
      dim = dimensions[i]
      distances[i] = [i,d(dim,pointer), lastPointer && d(dim, lastPointer)]
    }
    distances = distances.sort(function  (a,b) {
      return b[1] - a[1] || b[2] - a[2] || b[0] - a[0]
    })

    // last entry is the closest
    return distances
  }

  function processChildContainers(item, containerSelector, method, ignoreChildren) {
    var childContainers = item.find(containerSelector),
    i = childContainers.length

    while(i--){
      var container = childContainers.eq(i).data(pluginName)
      if(container)
        container[method](ignoreChildren)
    }

  }


  function ContainerGroup(options) {
    this.options = $.extend({}, groupDefaults, options)
    this.containers = []
    this.childGroups = []
    this.scrolledProxy = $.proxy(this.scrolled, this)
    this.dragProxy = $.proxy(this.drag, this)
    this.dropProxy = $.proxy(this.drop, this)

    if(this.options.parentGroup)
      this.options.parentGroup.childGroups.push(this)
    else {
      this.placeholder = $(this.options.placeholder)
      if(!options.isValidTarget)
        this.options.isValidTarget = undefined
    }
  }

  ContainerGroup.get = function  (options) {
    if( !containerGroups[options.group]) {
      if(!options.group)
        options.group = groupCounter ++
      containerGroups[options.group] = new ContainerGroup(options)
    }
    return containerGroups[options.group]
  }

  ContainerGroup.prototype = {
    dragInit: function  (e, itemContainer) {
      this.$document = $(itemContainer.el[0].ownerDocument)

      this.toggleListeners('on')

      // get item to drag
      this.item = $(e.target).closest(this.options.itemSelector)
      this.itemContainer = itemContainer

      this.setPointer(e)
    },
    drag: function  (e) {
      e.preventDefault()

      if(!this.dragging){
        if(!this.distanceMet(e))
          return

        processChildContainers(this.item, this.options.containerSelector, "disable", true)

        this.options.onDragStart(this.item, this.itemContainer, groupDefaults.onDragStart)
        this.item.before(this.placeholder)
        this.dragging = true
      }

      this.setPointer(e)
      // place item under the cursor
      this.options.onDrag(this.item,
                          getRelativePosition(this.pointer, this.item.offsetParent()),
                          groupDefaults.onDrag)

      var x = e.pageX,
      y = e.pageY,
      box = this.sameResultBox,
      t = this.options.tolerance

      if(!box || box.top - t > y || box.bottom + t < y || box.left - t > x || box.right + t < x)
        if(!this.searchValidTarget())
          this.placeholder.detach()
    },
    drop: function  (e) {
      e.preventDefault()
      this.toggleListeners('off')

      if(!this.dragging)
        return;

      // processing Drop, check if placeholder is detached
      if(this.placeholder.closest("html")[0])
        this.placeholder.before(this.item).detach()
      else
        this.options.onCancel(this.item, this.itemContainer, groupDefaults.onCancel)

      this.options.onDrop(this.item, this.getContainer(this.item), groupDefaults.onDrop)
      processChildContainers(this.item, this.options.containerSelector, "enable", true)

      // cleanup
      this.clearDimensions()
      this.clearOffsetParent()
      this.lastAppendedItem = this.sameResultBox = undefined
      this.dragging = false
    },
    searchValidTarget: function  (pointer, lastPointer) {
      if(!pointer){
        pointer = this.relativePointer || this.pointer
        lastPointer = this.lastRelativePointer || this.lastPointer
      }

      var distances = sortByDistanceDesc(this.getContainerDimensions(),
                                         pointer,
                                         lastPointer),
      i = distances.length

      while(i--){
        var index = distances[i][0],
        distance = distances[i][1]

        if(!distance || this.options.pullPlaceholder){
          var container = this.containers[index]
          if(!this.$getOffsetParent()){
            var offsetParent = container.getItemOffsetParent()
            pointer = getRelativePosition(pointer, offsetParent)
            lastPointer = getRelativePosition(lastPointer, offsetParent)
          }
          if(container.searchValidTarget(pointer, lastPointer))
            return true
        }
      }

    },
    movePlaceholder: function  (container, item, method, sameResultBox) {
      var lastAppendedItem = this.lastAppendedItem
      if(!sameResultBox && lastAppendedItem && lastAppendedItem[0] === item[0])
        return;

      item[method](this.placeholder)
      this.lastAppendedItem = item
      this.sameResultBox = sameResultBox
      this.options.afterMove(this.placeholder, container)
    },
    getContainerDimensions: function  () {
      if(!this.containerDimensions)
        setDimensions(this.containers, this.containerDimensions = [], !this.$getOffsetParent())
      return this.containerDimensions
    },
    getContainer: function  (element) {
      return element.closest(this.options.containerSelector).data(pluginName)
    },
    $getOffsetParent: function  () {
      if(this.offsetParent === undefined){
        var i = this.containers.length - 1,
        offsetParent = this.containers[i].getItemOffsetParent()

        if(!this.options.parentGroup){
          while(i--){
            if(offsetParent[0] != this.containers[i].getItemOffsetParent()[0]){
              // If every container has the same offset parent,
              // use position() which is relative to this parent,
              // otherwise use offset()
              // compare #setDimensions
              offsetParent = false
              break;
            }
          }
        }
        
        this.offsetParent = offsetParent
      }
      return this.offsetParent
    },
    clearOffsetParent: function () {
      this.offsetParent = undefined
    },
    setPointer: function (e) {
      var pointer = {
        left: e.pageX,
        top: e.pageY
      }

      if(this.$getOffsetParent()){
        var relativePointer = getRelativePosition(pointer, this.$getOffsetParent())
        this.lastRelativePointer = this.relativePointer
        this.relativePointer = relativePointer
      }

      this.lastPointer = this.pointer
      this.pointer = pointer
    },
    distanceMet: function (e) {
      return (Math.max(
 				Math.abs(this.pointer.left - e.pageX),
				Math.abs(this.pointer.top - e.pageY)
			) >= this.options.distance)
    },
    addContainer: function  (container) {
      this.containers.push(container);
    },
    removeContainer: function (container) {
      var i = this.containers.indexOf(container)
      remove(this.containers, i);
    },
    scrolled: function  (e) {
      this.clearDimensions()
      this.clearOffsetParent()
    },
    toggleListeners: function (method) {
      this.$document[method](eventNames.move, this.dragProxy)
      [method](eventNames.end, this.dropProxy)
      [method]("scroll.sortable", this.scrolledProxy)
    },
    // Recursively clear container and item dimensions
    clearDimensions: function  () {
      this.containerDimensions = undefined
      var i = this.containers.length
      while(i--){
        this.containers[i].itemDimensions = undefined
      }
      i = this.childGroups.length
      while(i--){
        this.childGroups[i].clearDimensions()
      }
    }
  }

  function Container(element, options) {
    this.el = element
    this.childGroups = []
    this.floatRight = false
    this.dragInitProxy = $.proxy(this.dragInit, this)
    this.options = $.extend( {}, containerDefaults, options)

    this.group = ContainerGroup.get(this.options)
    this.rootGroup = this.options.rootGroup = this.options.rootGroup || this.group
    this.parentGroup = this.options.parentGroup = this.options.parentGroup || this.group
    this.handle = this.rootGroup.options.handle || this.rootGroup.options.itemSelector

    this.enable(true)
  }

  Container.prototype = {
    dragInit: function  (e) {
      if(e.which !== 1 ||
         !this.options.drag ||
         $(e.target).is(this.options.exclude))
        return;
      
      e.preventDefault()
      e.stopPropagation()

      this.rootGroup.dragInit(e, this)
    },
    searchValidTarget: function  (pointer, lastPointer) {
      var distances = sortByDistanceDesc(this.getItemDimensions(),
                                         pointer,
                                         lastPointer),
      i = distances.length,
      rootGroup = this.rootGroup,
      validTarget = !rootGroup.options.isValidTarget ||
        rootGroup.options.isValidTarget(rootGroup.item, this)

      if(!i && validTarget){
        rootGroup.movePlaceholder(this, this.el, "append")
        return true
      } else
        while(i--){
          var index = distances[i][0],
          distance = distances[i][1]
          if(!distance && this.options.nested && this.getContainerGroup(index)){
            var found = this.getContainerGroup(index).searchValidTarget(pointer, lastPointer)
            if(found)
              return true
          }
          else if(validTarget){
            this.movePlaceholder(index, pointer)
            return true
          }
        }
    },
    movePlaceholder: function  (index, pointer) {
      var item = $(this.items[index]),
      dim = this.itemDimensions[index],
      method = "after",
      width = item.outerWidth(),
      height = item.outerHeight(),
      offset = item.offset(),
      sameResultBox = {
        left: offset.left,
        right: offset.left + width,
        top: offset.top,
        bottom: offset.top + height
      }
      if(this.options.vertical){
        var yCenter = (dim[2] + dim[3]) / 2,
        inUpperHalf = pointer.top <= yCenter
        if(inUpperHalf){
          method = "before"
          sameResultBox.bottom -= height / 2
        } else
          sameResultBox.top += height / 2
      } else {
        var xCenter = (dim[0] + dim[1]) / 2,
        inLeftHalf = pointer.left <= xCenter
        if(inLeftHalf != this.floatRight){
          method = "before"
          sameResultBox.right -= width / 2
        } else
          sameResultBox.left += width / 2
      }
      this.rootGroup.movePlaceholder(this, item, method, sameResultBox)
    },
    getItemDimensions: function  () {
      if(!this.itemDimensions){
        this.items = this.$getChildren(this.el, "item").filter(":not(.dragged)").get()
        setDimensions(this.items, this.itemDimensions = [])
      }
      return this.itemDimensions
    },
    getItemOffsetParent: function  () {
      var offsetParent,
      el = this.el
      // Since el might be empty we have to check el itself and
      // can not do something like el.children().first().offsetParent()
      if(el.css("position") === "relative" || el.css("position") === "absolute"  || el.css("position") === "fixed")
        offsetParent = el
      else
        offsetParent = el.offsetParent()
      return offsetParent
    },
    getContainerGroup: function  (index) {
      var childGroup = $.data(this.items[index], "subContainer")
      if( childGroup === undefined){
        var childContainers = this.$getChildren(this.items[index], "container")
        childGroup = false

        if(childContainers[0]){
          var options = $.extend({}, this.options, {
            parentGroup: this.group,
            group: groupCounter ++
          })
          childGroup = childContainers[pluginName](options).data(pluginName).group
        }
        $.data(this.items[index], "subContainer", childGroup)
      }
      return childGroup
    },
    $getChildren: function (parent, type) {
      return $(parent).children(this.rootGroup.options[type + "Selector"])
    },
    _serialize: function (parent, isContainer) {
      var that = this,
      childType = isContainer ? "item" : "container",
      
      children = this.$getChildren(parent, childType).not(this.options.exclude).map(function () {
        return that._serialize($(this), !isContainer)
      }).get()
      
      return this.rootGroup.options.serialize(parent, children, isContainer)
    }
  }

  var API = {
    enable: function  (ignoreChildren) {
      if(this.options.drop)
        this.group.addContainer(this)
      if(!ignoreChildren)
        processChildContainers(this.el, this.options.containerSelector, "enable", true)

      this.el.on(eventNames.start, this.handle, this.dragInitProxy)
    },
    disable: function  (ignoreChildren) {
      if(this.options.drop)
        this.group.removeContainer(this)
      if(!ignoreChildren)
        processChildContainers(this.el, this.options.containerSelector, "disable", true)

      this.el.off(eventNames.start, this.handle, this.dragInitProxy)
    },
    serialize: function () {
      return this._serialize(this.el, true)
    }
  }

  $.extend(Container.prototype, API)
  
  /**
   * jQuery API
   *
   * Parameters are
   *   either options on init
   *   or a method name followed by arguments to pass to the method
   */
  $.fn[pluginName] = function(methodOrOptions) {
    var args = Array.prototype.slice.call(arguments, 1)

    return this.map(function(){
      var $t = $(this),
      object = $t.data(pluginName)

      if(object && API[methodOrOptions])
        return API[methodOrOptions].apply(object, args) || this
      else if(!object && (methodOrOptions === undefined ||
                          typeof methodOrOptions === "object"))
        $t.data(pluginName, new Container($t, methodOrOptions))

      return this
    });
  };

}(jQuery, window)
