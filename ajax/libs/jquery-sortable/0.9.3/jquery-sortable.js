/* ===================================================
 *  jquery-sortable.js v0.9.3
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
  var pluginName = 'sortable',
  document = window.document,
  $document = $(document),
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
    afterMove: function (placeholder, container) {
    },
    // The css selector of the containers
    containerSelector: "ol, ul",
    // The css selector of the drag handle
    handle: "",
    // The css selector of the items
    itemSelector: "li",
    // Executed at the beginning of a mouse move event.
    // The Placeholder has not been moved yet
    onDrag: function (item, position, _super) {
      item.css(position)
    },
    // Called after the drag has been started,
    // that is the mouse button is beeing held down and
    // the mouse is moving.
    // The container is the closest initialized container.
    // Therefore it might not be the container, that actually contains the item.
    onDragStart: function (item, container, _super) {
      item.css({
        height: item.height(),
        width: item.width()
      })
      item.addClass("dragged")
      $("body").addClass("dragging")
    },
    // Called when the mouse button is beeing released
    onDrop: function  (item, container, _super) {
      item.removeClass("dragged").attr("style","")
      $("body").removeClass("dragging")
    },
    // Template for the placeholder. Can be any valid jQuery input
    // e.g. a string, a DOM element
    placeholder: '<li class="placeholder"/>',
    // If true, the position of the placeholder is calculated on every mousemove.
    // If false, it is only calculated when the mouse is above a container.
    pullPlaceholder: true
  }, // end group defaults
  containerGroups = {},
  groupCounter = 0

  /*
   * a is Array [left, right, top, bottom]
   * b is array [left, top]
   */
  function d(a,b) {
    var x = Math.max(0, a[0] - b[0], b[0] - a[1]),
    y = Math.max(0, a[2] - b[1], b[1] - a[3])
    return x+y;
  }

  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
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

  function getNearest(dimensions, pointer, lastPointer) {
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
      return a[1] - b[1] || a[2] - b[2] || a[0] - b[0]
    })

    return distances[0]
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
    this.scrollProxy = $.proxy(this.scrolled, this)
    this.dragProxy = $.proxy(this.drag, this)
    this.dropProxy = $.proxy(this.drop, this)
    if(this.options.parentGroup)
      this.options.parentGroup.childGroups.push(this)
    else
      this.placeholder = $(this.options.placeholder)
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
      $document.on("mousemove", this.dragProxy)
      $document.on("mouseup", this.dropProxy)

      // get item to drag
      this.item = $(e.target).closest(this.options.itemSelector)
      this.itemContainer = itemContainer

      this.setPointer(e)
    },
    drag: function  (e) {
      e.preventDefault()

      if(!this.dragging){
        processChildContainers(this.item, this.options.containerSelector, "disable", true)

        this.options.onDragStart(this.item, this.itemContainer, groupDefaults.onDragStart)
        this.dragging = true
      }

      if(!this.setPointer(e))
        return;

      // place item under the cursor
      this.options.onDrag(this.item,
                          getRelativePosition(this.pointer, this.item.offsetParent()),
                          groupDefaults.onDrag)

      var x = e.pageX,
      y = e.pageY,
      box = this.sameResultBox
      if(!box || box.top > y || box.bottom < y || box.left > x || box.right < x)
        this.processMove()
    },
    drop: function  (e) {
      e.preventDefault()

      $document.off("mousemove", this.dragProxy)
      $document.off("mouseup", this.dropProxy)

      if(!this.dragging)
        return;

      // processing Drop
      this.getContainer(this.placeholder).receiveDrop()
      processChildContainers(this.item, this.options.containerSelector, "enable", true)

      // cleanup
      this.deleteDimensions()
      this.lastAppendedItem = this.sameResultBox = undefined
      this.dragging = false
    },
    processMove: function  (pointer, lastPointer) {
      if(!pointer){
        pointer = this.relativePointer || this.pointer
        lastPointer = this.lastRelativePointer || this.lastPointer
      }

      var nearest = getNearest(this.getContainerDimensions(),
                               pointer,
                               lastPointer)

      if(nearest && (!nearest[1] || this.options.pullPlaceholder)){
        var index = nearest[0],
        container = this.containers[index]
        if(!this.getOffsetParent()){
          var offsetParent = container.getItemOffsetParent()
          pointer = getRelativePosition(pointer, offsetParent)
          lastPointer = getRelativePosition(lastPointer, offsetParent)
        }
        container.processMove(pointer, lastPointer)
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
        setDimensions(this.containers, this.containerDimensions = [], !this.getOffsetParent())
      return this.containerDimensions
    },
    getContainer: function  (element) {
      return element.closest(this.options.containerSelector).data(pluginName)
    },
    getOffsetParent: function  () {
      if(this.offsetParent === undefined){
        var i = this.containers.length - 1,
        offsetParent = this.containers[i].getItemOffsetParent()

        while(i--){
          if(offsetParent[0] != this.containers[i].getItemOffsetParent()[0]){
            // If every container has the same offset parent,
            // use position() which is relative to this parent,
            // otherwise use offset()
            $document.on("scroll", this.scrolledProxy)
            offsetParent = false
            break;
          }
        }
        this.offsetParent = offsetParent
      }
      return this.offsetParent
    },
    setPointer: function (e) {
      var pointer = {
        left: e.pageX,
        top: e.pageY
      }

      if(this.getOffsetParent()){
        var relativePointer = getRelativePosition(pointer, this.getOffsetParent())
        this.lastRelativePointer = this.relativePointer
        this.relativePointer = relativePointer
      }

      this.lastPointer = this.pointer
      this.pointer = pointer
      return true
    },
    addContainer: function  (container) {
      this.containers.push(container);
      delete this.containerDimensions
    },
    removeContainer: function (container) {
      var i = this.containers.indexOf(container)
      this.containers.remove(i);
      delete this.containerDimensions
    },
    scrolled: function  (e) {
      delete this.containerDimensions
    },
    deleteDimensions: function  () {
      // delete centers in every container and containergroup
      delete this.containerDimensions
      var i = this.containers.length
      while(i--){
        delete this.containers[i].itemDimensions
      }
      i = this.childGroups.length
      while(i--){
        this.childGroups[i].deleteDimensions()
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
    receiveDrop: function  () {
      var rootGroup = this.rootGroup,
      item = rootGroup.item

      // replace placeholder with current item
      rootGroup.placeholder.before(item).detach()
      rootGroup.options.onDrop(item, this, groupDefaults.onDrop)
    },
    processMove: function  (pointer, lastPointer) {
      // get Element right below the pointer
      var nearest = getNearest(this.getItemDimensions(),
                               pointer,
                               lastPointer),
      rootGroup = this.rootGroup
      if(!nearest)
        rootGroup.movePlaceholder(this, this.el, "append")
      else {
        var index = nearest[0],
        distance = nearest[1]
        if(!distance && this.options.nested && this.getContainerGroup(index))
          this.getContainerGroup(index).processMove(pointer, lastPointer)
        else
          this.movePlaceholder(index, pointer)
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
        this.items = this.el.children(this.rootGroup.options.itemSelector)
          .filter(":not(.dragged)").toArray()
        setDimensions(this.items, this.itemDimensions = [])
      }
      return this.itemDimensions
    },
    getItemOffsetParent: function  () {
      var offsetParent,
      el = this.el
      // Since el might be empty we have to check el itself and
      // can not do something like el.children().first().offsetParent()
      if(el.css("position") === "relative" || el.css("position") === "absolute")
        offsetParent = el
      else
        offsetParent = el.offsetParent()
      return offsetParent
    },
    getContainerGroup: function  (index) {
      var childGroup = $.data(this.items[index], "subContainer")
      if( childGroup === undefined){
        var childContainers = $(this.items[index]).children(this.rootGroup.options.containerSelector)
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
    }
  }

  var API = {
    enable: function  (ignoreChildren) {
      if(this.options.drop)
        this.group.addContainer(this)
      if(!ignoreChildren)
        processChildContainers(this.el, this.options.containerSelector, "enable", true)
      this.el.on("mousedown", this.handle, this.dragInitProxy)
    },
    disable: function  (ignoreChildren) {
      if(this.options.drop)
        this.group.removeContainer(this)
      if(!ignoreChildren)
        processChildContainers(this.el, this.options.containerSelector, "disable", true)

      this.el.off("mousedown", this.handle, this.dragInitProxy)
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

    return this.each(function(){
      var $t = $(this),
      object = $t.data(pluginName)
      if(object && API[methodOrOptions])
        API[methodOrOptions].apply(object, args)
      else if(!object && (methodOrOptions === undefined ||
                          typeof methodOrOptions === "object"))
        $t.data(pluginName, new Container($t, methodOrOptions))
    });
  };

}(jQuery, window)
