(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('component-emitter')

/**
 * Expose `scene`.
 */

module.exports = Application

/**
 * Create a new `Application`.
 *
 * @param {Object} element Optional initial element
 */

function Application (element) {
  if (!(this instanceof Application)) return new Application(element)
  this.options = {}
  this.sources = {}
  this.element = element
}

/**
 * Mixin `Emitter`.
 */

Emitter(Application.prototype)

/**
 * Add a plugin
 *
 * @param {Function} plugin
 */

Application.prototype.use = function (plugin) {
  plugin(this)
  return this
}

/**
 * Set an option
 *
 * @param {String} name
 */

Application.prototype.option = function (name, val) {
  this.options[name] = val
  return this
}

/**
 * Set value used somewhere in the IO network.
 */

Application.prototype.set = function (name, data) {
  this.sources[name] = data
  this.emit('source', name, data)
  return this
}

/**
 * Mount a virtual element.
 *
 * @param {VirtualElement} element
 */

Application.prototype.mount = function (element) {
  this.element = element
  this.emit('mount', element)
  return this
}

/**
 * Remove the world. Unmount everything.
 */

Application.prototype.unmount = function () {
  if (!this.element) return
  this.element = null
  this.emit('unmount')
  return this
}

},{"component-emitter":10}],3:[function(require,module,exports){
/**
 * Create the application.
 */

exports.tree =
exports.scene =
exports.deku = require('./application')

/**
 * Render scenes to the DOM.
 */

if (typeof document !== 'undefined') {
  exports.render = require('./render')
}

/**
 * Render scenes to a string
 */

exports.renderString = require('./stringify')

/**
 * Create virtual elements.
 */

exports.element =
exports.dom = require('./virtual')

},{"./application":2,"./render":4,"./stringify":5,"./virtual":8}],4:[function(require,module,exports){
/**
 * Dependencies.
 */

var raf = require('component-raf')
var Pool = require('dom-pool')
var walk = require('dom-walk')
var isDom = require('is-dom')
var uid = require('get-uid')
var throttle = require('per-frame')
var keypath = require('object-path')
var type = require('component-type')
var utils = require('./utils')
var svg = require('./svg')
var defaults = utils.defaults
var forEach = require('fast.js/forEach')
var assign = require('fast.js/object/assign')
var reduce = require('fast.js/reduce')
var isPromise = require('is-promise')

/**
 * All of the events can bind to
 */

var events = {
  onBlur: 'blur',
  onChange: 'change',
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onCopy: 'copy',
  onCut: 'cut',
  onDoubleClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragExit: 'dragexit',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',
  onFocus: 'focus',
  onInput: 'input',
  onKeyDown: 'keydown',
  onKeyUp: 'keyup',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onPaste: 'paste',
  onScroll: 'scroll',
  onSubmit: 'submit',
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart'
}

/**
 * These elements won't be pooled
 */

var avoidPooling = ['input', 'textarea'];

/**
 * Expose `dom`.
 */

module.exports = render

/**
 * Render an app to the DOM
 *
 * @param {Application} app
 * @param {HTMLElement} container
 * @param {Object} opts
 *
 * @return {Object}
 */

function render (app, container, opts) {
  var frameId
  var isRendering
  var rootId = 'root'
  var currentElement
  var currentNativeElement
  var connections = {}
  var components = {}
  var entities = {}
  var pools = {}
  var handlers = {}
  var mountQueue = []
  var children = {}
  children[rootId] = {}

  if (!isDom(container)) {
    throw new Error('Container element must be a DOM element')
  }

  /**
   * Rendering options. Batching is only ever really disabled
   * when running tests, and pooling can be disabled if the user
   * is doing something stupid with the DOM in their components.
   */

  var options = defaults(assign({}, app.options || {}, opts || {}), {
    pooling: true,
    batching: true,
    validateProps: false
  })

  /**
   * Listen to DOM events
   */

  addNativeEventListeners()

  /**
   * Watch for changes to the app so that we can update
   * the DOM as needed.
   */

  app.on('unmount', onunmount)
  app.on('mount', onmount)
  app.on('source', onupdate)

  /**
   * If the app has already mounted an element, we can just
   * render that straight away.
   */

  if (app.element) render()

  /**
   * Teardown the DOM rendering so that it stops
   * rendering and everything can be garbage collected.
   */

  function teardown () {
    removeNativeEventListeners()
    removeNativeElement()
    app.off('unmount', onunmount)
    app.off('mount', onmount)
    app.off('source', onupdate)
  }

  /**
   * Swap the current rendered node with a new one that is rendered
   * from the new virtual element mounted on the app.
   *
   * @param {VirtualElement} element
   */

  function onmount () {
    invalidate()
  }

  /**
   * If the app unmounts an element, we should clear out the current
   * rendered element. This will remove all the entities.
   */

  function onunmount () {
    removeNativeElement()
    currentElement = null
  }

  /**
   * Update all components that are bound to the source
   *
   * @param {String} name
   * @param {*} data
   */

  function onupdate (name, data) {
    if (!connections[name]) return;
    connections[name].forEach(function(update) {
      update(data)
    })
  }

  /**
   * Render and mount a component to the native dom.
   *
   * @param {Entity} entity
   * @return {HTMLElement}
   */

  function mountEntity (entity) {
    register(entity)
    setSources(entity)
    children[entity.id] = {}
    entities[entity.id] = entity

    // commit initial state and props.
    commit(entity)

    // callback before mounting.
    trigger('beforeMount', entity, [entity.context])
    trigger('beforeRender', entity, [entity.context])

    // render virtual element.
    var virtualElement = renderEntity(entity)
    // create native element.
    var nativeElement = toNative(entity.id, '0', virtualElement)

    entity.virtualElement = virtualElement
    entity.nativeElement = nativeElement

    // Fire afterRender and afterMount hooks at the end
    // of the render cycle
    mountQueue.push(entity.id)

    return nativeElement
  }

  /**
   * Remove a component from the native dom.
   *
   * @param {Entity} entity
   */

  function unmountEntity (entityId) {
    var entity = entities[entityId]
    if (!entity) return
    trigger('beforeUnmount', entity, [entity.context, entity.nativeElement])
    unmountChildren(entityId)
    removeAllEvents(entityId)
    var componentEntities = components[entityId].entities;
    delete componentEntities[entityId]
    delete components[entityId]
    delete entities[entityId]
    delete children[entityId]
  }

  /**
   * Render the entity and make sure it returns a node
   *
   * @param {Entity} entity
   *
   * @return {VirtualTree}
   */

  function renderEntity (entity) {
    var component = entity.component
    if (!component.render) throw new Error('Component needs a render function')
    var result = component.render(entity.context, setState(entity))
    if (!result) throw new Error('Render function must return an element.')
    return result
  }

  /**
   * Whenever setState or setProps is called, we mark the entity
   * as dirty in the renderer. This lets us optimize the re-rendering
   * and skip components that definitely haven't changed.
   *
   * @param {Entity} entity
   *
   * @return {Function} A curried function for updating the state of an entity
   */

  function setState (entity) {
    return function (nextState) {
      updateEntityStateAsync(entity, nextState)
    }
  }

  /**
   * Tell the app it's dirty and needs to re-render. If batching is disabled
   * we can just trigger a render immediately, otherwise we'll wait until
   * the next available frame.
   */

  function invalidate () {
    if (!options.batching) {
      if (!isRendering) render()
    } else {
      if (!frameId) frameId = raf(render)
    }
  }

  /**
   * Update the DOM. If the update fails we stop the loop
   * so we don't get errors on every frame.
   *
   * @api public
   */

  function render () {
    // If this is called synchronously we need to
    // cancel any pending future updates
    clearFrame()

    // If the rendering from the previous frame is still going,
    // we'll just wait until the next frame. Ideally renders should
    // not take over 16ms to stay within a single frame, but this should
    // catch it if it does.
    if (isRendering) {
      frameId = raf(render)
      return
    } else {
      isRendering = true
    }

    // 1. If there isn't a native element rendered for the current mounted element
    // then we need to create it from scratch.
    // 2. If a new element has been mounted, we should diff them.
    // 3. We should update check all child components for changes.
    if (!currentNativeElement) {
      currentElement = app.element
      currentNativeElement = toNative(rootId, '0', currentElement)
      if (container.children.length > 0) {
        console.info('deku: The container element is not empty. These elements will be removed. Read more: http://cl.ly/b0Sr')
      }
      if (container === document.body) {
        console.warn('deku: Using document.body is allowed but it can cause some issues. Read more: http://cl.ly/b0SC')
      }
      removeAllChildren(container);
      container.appendChild(currentNativeElement)
    } else if (currentElement !== app.element) {
      currentNativeElement = patch(rootId, currentElement, app.element, currentNativeElement)
      currentElement = app.element
      updateChildren(rootId)
    } else {
      updateChildren(rootId)
    }

    // Call mount events on all new entities
    flushMountQueue()

    // Allow rendering again.
    isRendering = false
  }

  /**
   * Call hooks for all new entities that have been created in
   * the last render from the bottom up.
   */

  function flushMountQueue () {
    var entityId
    while (entityId = mountQueue.pop()) {
      var entity = entities[entityId]
      trigger('afterRender', entity, [entity.context, entity.nativeElement])
      triggerUpdate('afterMount', entity, [entity.context, entity.nativeElement, setState(entity)])
    }
  }

  /**
   * Clear the current scheduled frame
   */

  function clearFrame () {
    if (!frameId) return
    raf.cancel(frameId)
    frameId = 0
  }

  /**
   * Update a component.
   *
   * The entity is just the data object for a component instance.
   *
   * @param {String} id Component instance id.
   */

  function updateEntity (entityId) {
    var entity = entities[entityId]
    setSources(entity)

    if (!shouldUpdate(entity)) return updateChildren(entityId)

    var currentTree = entity.virtualElement
    var nextProps = entity.pendingProps
    var nextState = entity.pendingState
    var previousState = entity.context.state
    var previousProps = entity.context.props

    // hook before rendering. could modify state just before the render occurs.
    trigger('beforeUpdate', entity, [entity.context, nextProps, nextState])
    trigger('beforeRender', entity, [entity.context])

    // commit state and props.
    commit(entity)

    // re-render.
    var nextTree = renderEntity(entity)

    // if the tree is the same we can just skip this component
    // but we should still check the children to see if they're dirty.
    // This allows us to memoize the render function of components.
    if (nextTree === currentTree) return updateChildren(entityId)

    // apply new virtual tree to native dom.
    entity.nativeElement = patch(entityId, currentTree, nextTree, entity.nativeElement)
    entity.virtualElement = nextTree
    updateChildren(entityId)

    // trigger render hook
    trigger('afterRender', entity, [entity.context, entity.nativeElement])

    // trigger afterUpdate after all children have updated.
    triggerUpdate('afterUpdate', entity, [entity.context, previousProps, previousState])
  }

  /**
   * Update all the children of an entity.
   *
   * @param {String} id Component instance id.
   */

  function updateChildren (entityId) {
    forEach(children[entityId], function (childId) {
      updateEntity(childId)
    })
  }

  /**
   * Remove all of the child entities of an entity
   *
   * @param {Entity} entity
   */

  function unmountChildren (entityId) {
    forEach(children[entityId], function (childId) {
      unmountEntity(childId)
    })
  }

  /**
   * Remove the root element. If this is called synchronously we need to
   * cancel any pending future updates.
   */

  function removeNativeElement () {
    clearFrame()
    removeElement(rootId, '0', currentNativeElement)
    currentNativeElement = null
  }

  /**
   * Create a native element from a virtual element.
   *
   * @param {String} entityId
   * @param {String} path
   * @param {Object} vnode
   *
   * @return {HTMLDocumentFragment}
   */

  function toNative (entityId, path, vnode) {
    switch (vnode.type) {
      case 'text': return toNativeText(vnode)
      case 'element': return toNativeElement(entityId, path, vnode)
      case 'component': return toNativeComponent(entityId, path, vnode)
    }
  }

  /**
   * Create a native text element from a virtual element.
   *
   * @param {Object} vnode
   */

  function toNativeText (vnode) {
    return document.createTextNode(vnode.data)
  }

  /**
   * Create a native element from a virtual element.
   */

  function toNativeElement (entityId, path, vnode) {
    var attributes = vnode.attributes
    var children = vnode.children
    var tagName = vnode.tagName
    var el

    // create element either from pool or fresh.
    if (!options.pooling || !canPool(tagName)) {
      if (svg.isElement(tagName)) {
        el = document.createElementNS(svg.namespace, tagName)
      } else {
        el = document.createElement(tagName)
      }
    } else {
      var pool = getPool(tagName)
      el = cleanup(pool.pop())
      if (el.parentNode) el.parentNode.removeChild(el)
    }

    // set attributes.
    forEach(attributes, function (value, name) {
      setAttribute(entityId, path, el, name, value)
    })

    // store keys on the native element for fast event handling.
    el.__entity__ = entityId
    el.__path__ = path

    // add children.
    forEach(children, function (child, i) {
      var childEl = toNative(entityId, path + '.' + i, child)
      if (!childEl.parentNode) el.appendChild(childEl)
    })

    return el
  }

  /**
   * Create a native element from a component.
   */

  function toNativeComponent (entityId, path, vnode) {
    var child = new Entity(vnode.component, vnode.props, entityId)
    children[entityId][path] = child.id
    return mountEntity(child)
  }

  /**
   * Patch an element with the diff from two trees.
   */

  function patch (entityId, prev, next, el) {
    return diffNode('0', entityId, prev, next, el)
  }

  /**
   * Create a diff between two trees of nodes.
   */

  function diffNode (path, entityId, prev, next, el) {
    // Type changed. This could be from element->text, text->ComponentA,
    // ComponentA->ComponentB etc. But NOT div->span. These are the same type
    // (ElementNode) but different tag name.
    if (prev.type !== next.type) return replaceElement(entityId, path, el, next)

    switch (next.type) {
      case 'text': return diffText(prev, next, el)
      case 'element': return diffElement(path, entityId, prev, next, el)
      case 'component': return diffComponent(path, entityId, prev, next, el)
    }
  }

  /**
   * Diff two text nodes and update the element.
   */

  function diffText (previous, current, el) {
    if (current.data !== previous.data) el.data = current.data
    return el
  }

  /**
   * Diff the children of an ElementNode.
   */

  function diffChildren (path, entityId, prev, next, el) {
    var positions = []
    var hasKeys = false
    var childNodes = Array.prototype.slice.apply(el.childNodes)
    var leftKeys = reduce(prev.children, keyMapReducer, {})
    var rightKeys = reduce(next.children, keyMapReducer, {})
    var currentChildren = assign({}, children[entityId])

    function keyMapReducer (acc, child) {
      if (child.key != null) {
        acc[child.key] = child
        hasKeys = true
      }
      return acc
    }

    // Diff all of the nodes that have keys. This lets us re-used elements
    // instead of overriding them and lets us move them around.
    if (hasKeys) {

      // Removals
      forEach(leftKeys, function (leftNode, key) {
        if (rightKeys[key] == null) {
          var leftPath = path + '.' + leftNode.index
          removeElement(
            entityId,
            leftPath,
            childNodes[leftNode.index]
          )
        }
      })

      // Update nodes
      forEach(rightKeys, function (rightNode, key) {
        var leftNode = leftKeys[key]

        // We only want updates for now
        if (leftNode == null) return

        var leftPath = path + '.' + leftNode.index

        // Updated
        positions[rightNode.index] = diffNode(
          leftPath,
          entityId,
          leftNode,
          rightNode,
          childNodes[leftNode.index]
        )
      })

      // Update the positions of all child components and event handlers
      forEach(rightKeys, function (rightNode, key) {
        var leftNode = leftKeys[key]

        // We just want elements that have moved around
        if (leftNode == null || leftNode.index === rightNode.index) return

        var rightPath = path + '.' + rightNode.index
        var leftPath = path + '.' + leftNode.index

        // Update all the child component path positions to match
        // the latest positions if they've changed. This is a bit hacky.
        forEach(currentChildren, function (childId, childPath) {
          if (leftPath === childPath) {
            delete children[entityId][childPath]
            children[entityId][rightPath] = childId
          }
        })
      })

      // Now add all of the new nodes last in case their path
      // would have conflicted with one of the previous paths.
      forEach(rightKeys, function (rightNode, key) {
        var rightPath = path + '.' + rightNode.index
        if (leftKeys[key] == null) {
          positions[rightNode.index] = toNative(
            entityId,
            rightPath,
            rightNode
          )
        }
      })

    } else {
      var maxLength = Math.max(prev.children.length, next.children.length)

      // Now diff all of the nodes that don't have keys
      for (var i = 0; i < maxLength; i++) {
        var leftNode = prev.children[i]
        var rightNode = next.children[i]

        // Removals
        if (rightNode == null) {
          removeElement(
            entityId,
            path + '.' + leftNode.index,
            childNodes[leftNode.index]
          )
        }

        // New Node
        if (leftNode == null) {
          positions[rightNode.index] = toNative(
            entityId,
            path + '.' + rightNode.index,
            rightNode
          )
        }

        // Updated
        if (leftNode && rightNode) {
          positions[leftNode.index] = diffNode(
            path + '.' + leftNode.index,
            entityId,
            leftNode,
            rightNode,
            childNodes[leftNode.index]
          )
        }
      }
    }

    // Reposition all the elements
    forEach(positions, function (childEl, newPosition) {
      var target = el.childNodes[newPosition]
      if (childEl !== target) {
        if (target) {
          el.insertBefore(childEl, target)
        } else {
          el.appendChild(childEl)
        }
      }
    })
  }

  /**
   * Diff the attributes and add/remove them.
   */

  function diffAttributes (prev, next, el, entityId, path) {
    var nextAttrs = next.attributes
    var prevAttrs = prev.attributes

    // add new attrs
    forEach(nextAttrs, function (value, name) {
      if (events[name] || !(name in prevAttrs) || prevAttrs[name] !== value) {
        setAttribute(entityId, path, el, name, value)
      }
    })

    // remove old attrs
    forEach(prevAttrs, function (value, name) {
      if (!(name in nextAttrs)) {
        removeAttribute(entityId, path, el, name)
      }
    })
  }

  /**
   * Update a component with the props from the next node. If
   * the component type has changed, we'll just remove the old one
   * and replace it with the new component.
   */

  function diffComponent (path, entityId, prev, next, el) {
    if (next.component !== prev.component) {
      return replaceElement(entityId, path, el, next)
    } else {
      var targetId = children[entityId][path]

      // This is a hack for now
      if (targetId) {
        updateEntityProps(targetId, next.props)
      }

      return el
    }
  }

  /**
   * Diff two element nodes.
   */

  function diffElement (path, entityId, prev, next, el) {
    if (next.tagName !== prev.tagName) return replaceElement(entityId, path, el, next)
    diffAttributes(prev, next, el, entityId, path)
    diffChildren(path, entityId, prev, next, el)
    return el
  }

  /**
   * Removes an element from the DOM and unmounts and components
   * that are within that branch
   *
   * side effects:
   *   - removes element from the DOM
   *   - removes internal references
   *
   * @param {String} entityId
   * @param {String} path
   * @param {HTMLElement} el
   */

  function removeElement (entityId, path, el) {
    var childrenByPath = children[entityId]
    var childId = childrenByPath[path]
    var entityHandlers = handlers[entityId] || {}
    var removals = []

    // If the path points to a component we should use that
    // components element instead, because it might have moved it.
    if (childId) {
      var child = entities[childId]
      el = child.nativeElement
      unmountEntity(childId)
      removals.push(path)
    } else {

      // Just remove the text node
      if (!isElement(el)) return el.parentNode.removeChild(el)

      // Then we need to find any components within this
      // branch and unmount them.
      forEach(childrenByPath, function (childId, childPath) {
        if (childPath === path || isWithinPath(path, childPath)) {
          unmountEntity(childId)
          removals.push(childPath)
        }
      })

      // Remove all events at this path or below it
      forEach(entityHandlers, function (fn, handlerPath) {
        if (handlerPath === path || isWithinPath(path, handlerPath)) {
          removeEvent(entityId, handlerPath)
        }
      })
    }

    // Remove the paths from the object without touching the
    // old object. This keeps the object using fast properties.
    forEach(removals, function (path) {
      delete children[entityId][path]
    })

    // Remove it from the DOM
    el.parentNode.removeChild(el)

    // Return all of the elements in this node tree to the pool
    // so that the elements can be re-used.
    if (options.pooling) {
      walk(el, function (node) {
        if (!isElement(node) || !canPool(node.tagName)) return
        getPool(node.tagName.toLowerCase()).push(node)
      })
    }
  }

  /**
   * Replace an element in the DOM. Removing all components
   * within that element and re-rendering the new virtual node.
   *
   * @param {Entity} entity
   * @param {String} path
   * @param {HTMLElement} el
   * @param {Object} vnode
   *
   * @return {void}
   */

  function replaceElement (entityId, path, el, vnode) {
    var parent = el.parentNode
    var index = Array.prototype.indexOf.call(parent.childNodes, el)

    // remove the previous element and all nested components. This
    // needs to happen before we create the new element so we don't
    // get clashes on the component paths.
    removeElement(entityId, path, el)

    // then add the new element in there
    var newEl = toNative(entityId, path, vnode)
    var target = parent.childNodes[index]

    if (target) {
      parent.insertBefore(newEl, target)
    } else {
      parent.appendChild(newEl)
    }

    // walk up the tree and update all `entity.nativeElement` references.
    if (entityId !== 'root' && path === '0') {
      updateNativeElement(entityId, newEl)
    }

    return newEl
  }

  /**
   * Update all entities in a branch that have the same nativeElement. This
   * happens when a component has another component as it's root node.
   *
   * @param {String} entityId
   * @param {HTMLElement} newEl
   *
   * @return {void}
   */

  function updateNativeElement (entityId, newEl) {
    var target = entities[entityId]
    if (target.ownerId === 'root') return
    if (children[target.ownerId]['0'] === entityId) {
      entities[target.ownerId].nativeElement = newEl
      updateNativeElement(target.ownerId, newEl)
    }
  }

  /**
   * Set the attribute of an element, performing additional transformations
   * dependning on the attribute name
   *
   * @param {HTMLElement} el
   * @param {String} name
   * @param {String} value
   */

  function setAttribute (entityId, path, el, name, value) {
    if (events[name]) {
      addEvent(entityId, path, events[name], value)
      return
    }
    switch (name) {
      case 'checked':
      case 'disabled':
      case 'selected':
        el[name] = true
        break
      case 'innerHTML':
      case 'value':
        el[name] = value
        break
      case svg.isAttribute(name):
        el.setAttributeNS(svg.namespace, name, value)
        break
      default:
        el.setAttribute(name, value)
        break
    }
  }

  /**
   * Remove an attribute, performing additional transformations
   * dependning on the attribute name
   *
   * @param {HTMLElement} el
   * @param {String} name
   */

  function removeAttribute (entityId, path, el, name) {
    if (events[name]) {
      removeEvent(entityId, path, events[name])
      return
    }
    switch (name) {
      case 'checked':
      case 'disabled':
      case 'selected':
        el[name] = false
        break
      case 'innerHTML':
      case 'value':
        el[name] = ""
        break
      default:
        el.removeAttribute(name)
        break
    }
  }

  /**
   * Checks to see if one tree path is within
   * another tree path. Example:
   *
   * 0.1 vs 0.1.1 = true
   * 0.2 vs 0.3.5 = false
   *
   * @param {String} target
   * @param {String} path
   *
   * @return {Boolean}
   */

  function isWithinPath (target, path) {
    return path.indexOf(target + '.') === 0
  }

  /**
   * Is the DOM node an element node
   *
   * @param {HTMLElement} el
   *
   * @return {Boolean}
   */

  function isElement (el) {
    return !!el.tagName
  }

  /**
   * Get the pool for a tagName, creating it if it
   * doesn't exist.
   *
   * @param {String} tagName
   *
   * @return {Pool}
   */

  function getPool (tagName) {
    var pool = pools[tagName]
    if (!pool) {
      var poolOpts = svg.isElement(tagName) ?
        { namespace: svg.namespace, tagName: tagName } :
        { tagName: tagName }
      pool = pools[tagName] = new Pool(poolOpts)
    }
    return pool
  }

  /**
   * Clean up previously used native element for reuse.
   *
   * @param {HTMLElement} el
   */

  function cleanup (el) {
    removeAllChildren(el)
    removeAllAttributes(el)
    return el
  }

  /**
   * Remove all the attributes from a node
   *
   * @param {HTMLElement} el
   */

  function removeAllAttributes (el) {
    for (var i = el.attributes.length - 1; i >= 0; i--) {
      var name = el.attributes[i].name
      el.removeAttribute(name)
    }
  }

  /**
   * Remove all the child nodes from an element
   *
   * @param {HTMLElement} el
   */

  function removeAllChildren (el) {
    while (el.firstChild) el.removeChild(el.firstChild)
  }

  /**
   * Trigger a hook on a component.
   *
   * @param {String} name Name of hook.
   * @param {Entity} entity The component instance.
   * @param {Array} args To pass along to hook.
   */

  function trigger (name, entity, args) {
    if (typeof entity.component[name] !== 'function') return
    return entity.component[name].apply(null, args)
  }

  /**
   * Trigger a hook on the component and allow state to be
   * updated too.
   *
   * @param {String} name
   * @param {Object} entity
   * @param {Array} args
   *
   * @return {void}
   */

  function triggerUpdate (name, entity, args) {
    var update = setState(entity)
    args.push(update)
    var result = trigger(name, entity, args)
    if (result) {
      updateEntityStateAsync(entity, result)
    }
  }

  /**
   * Update the entity state using a promise
   *
   * @param {Entity} entity
   * @param {Promise} promise
   */

  function updateEntityStateAsync (entity, value) {
    if (isPromise(value)) {
      value.then(function (newState) {
        updateEntityState(entity, newState)
      })
    } else {
      updateEntityState(entity, value)
    }
  }

  /**
   * Update an entity to match the latest rendered vode. We always
   * replace the props on the component when composing them. This
   * will trigger a re-render on all children below this point.
   *
   * @param {Entity} entity
   * @param {String} path
   * @param {Object} vnode
   *
   * @return {void}
   */

  function updateEntityProps (entityId, nextProps) {
    var entity = entities[entityId]
    entity.pendingProps = nextProps
    entity.dirty = true
    invalidate()
  }

  /**
   * Update component instance state.
   */

  function updateEntityState (entity, nextState) {
    entity.pendingState = assign(entity.pendingState, nextState)
    entity.dirty = true
    invalidate()
  }

  /**
   * Commit props and state changes to an entity.
   */

  function commit (entity) {
    entity.context = {
      state: entity.pendingState,
      props: entity.pendingProps,
      id: entity.id
    }
    entity.pendingState = assign({}, entity.context.state)
    entity.pendingProps = assign({}, entity.context.props)
    validateProps(entity.context.props, entity.propTypes)
    entity.dirty = false
  }

  /**
   * Try to avoid creating new virtual dom if possible.
   *
   * Later we may expose this so you can override, but not there yet.
   */

  function shouldUpdate (entity) {
    if (!entity.dirty) return false
    if (!entity.component.shouldUpdate) return true
    var nextProps = entity.pendingProps
    var nextState = entity.pendingState
    var bool = entity.component.shouldUpdate(entity.context, nextProps, nextState)
    return bool
  }

  /**
   * Register an entity.
   *
   * This is mostly to pre-preprocess component properties and values chains.
   *
   * The end result is for every component that gets mounted,
   * you create a set of IO nodes in the network from the `value` definitions.
   *
   * @param {Component} component
   */

  function register (entity) {
    var component = entity.component
    // all entities for this component type.
    var entities = component.entities = component.entities || {}
    // add entity to component list
    entities[entity.id] = entity
    // map to component so you can remove later.
    components[entity.id] = component;

    // get 'class-level' sources.
    var sources = component.sources
    if (sources) return

    var map = component.sourceToPropertyName = {}
    component.sources = sources = []
    var propTypes = component.propTypes
    for (var name in propTypes) {
      var data = propTypes[name]
      if (!data) continue
      if (!data.source) continue
      sources.push(data.source)
      map[data.source] = name
    }

    // send value updates to all component instances.
    sources.forEach(function (source) {
      connections[source] = connections[source] || []
      connections[source].push(update)

      function update (data) {
        var prop = map[source]
        for (var entityId in entities) {
          var entity = entities[entityId]
          var changes = {}
          changes[prop] = data
          updateEntityProps(entityId, assign(entity.pendingProps, changes))
        }
      }
    })
  }

  /**
   * Set the initial source value on the entity
   *
   * @param {Entity} entity
   */

  function setSources (entity) {
    var component = entity.component
    var map = component.sourceToPropertyName
    var sources = component.sources
    sources.forEach(function (source) {
      var name = map[source]
      if (entity.pendingProps[name] != null) return
      entity.pendingProps[name] = app.sources[source] // get latest value plugged into global store
    })
  }

  /**
   * Add all of the DOM event listeners
   */

  function addNativeEventListeners () {
    forEach(events, function (eventType) {
      document.body.addEventListener(eventType, handleEvent, true)
    })
  }

  /**
   * Add all of the DOM event listeners
   */

  function removeNativeEventListeners () {
    forEach(events, function (eventType) {
      document.body.removeEventListener(eventType, handleEvent, true)
    })
  }

  /**
   * Handle an event that has occured within the container
   *
   * @param {Event} event
   */

  function handleEvent (event) {
    var target = event.target
    var eventType = event.type

    // Walk up the DOM tree and see if there is a handler
    // for this event type higher up.
    while (target) {
      var fn = keypath.get(handlers, [target.__entity__, target.__path__, eventType])
      if (fn) {
        event.delegateTarget = target
        fn(event)
        break
      }
      target = target.parentNode
    }
  }

  /**
   * Bind events for an element, and all it's rendered child elements.
   *
   * @param {String} path
   * @param {String} event
   * @param {Function} fn
   */

  function addEvent (entityId, path, eventType, fn) {
    keypath.set(handlers, [entityId, path, eventType], throttle(function (e) {
      var entity = entities[entityId]
      if (entity) {
        var update = setState(entity)
        var result = fn.call(null, e, entity.context, update)
        if (result) {
          updateEntityStateAsync(entity, result)
        }
      } else {
        fn.call(null, e)
      }
    }))
  }

  /**
   * Unbind events for a entityId
   *
   * @param {String} entityId
   */

  function removeEvent (entityId, path, eventType) {
    var args = [entityId]
    if (path) args.push(path)
    if (eventType) args.push(eventType)
    keypath.del(handlers, args)
  }

  /**
   * Unbind all events from an entity
   *
   * @param {Entity} entity
   */

  function removeAllEvents (entityId) {
    keypath.del(handlers, [entityId])
  }

  /**
   * Validate the current properties. These simple validations
   * make it easier to ensure the correct props are passed in.
   *
   * Available rules include:
   *
   * type: {String} string | array | object | boolean | number | date | function
   *       {Array} An array of types mentioned above
   *       {Function} fn(value) should return `true` to pass in
   * expects: [] An array of values this prop could equal
   * optional: Boolean
   */

  function validateProps (props, rules, optPrefix) {
    var prefix = optPrefix || ''
    if (!options.validateProps) return
    forEach(rules, function (options, name) {
      if (!options) {
        throw new Error('deku: propTypes should have an options object for each type')
      }

      var propName = prefix ? prefix + '.' + name : name
      var value = keypath.get(props, name)
      var valueType = type(value)
      var typeFormat = type(options.type)
      var optional = (options.optional === true)

      // If it's optional and doesn't exist
      if (optional && value == null) {
        return
      }

      // If it's required and doesn't exist
      if (!optional && value == null) {
        throw new TypeError('Missing property: ' + propName)
      }

      // It's a nested type
      if (typeFormat === 'object') {
        validateProps(value, options.type, propName)
        return
      }

      // If it's the incorrect type
      if (typeFormat === 'string' && valueType !== options.type) {
        throw new TypeError('Invalid property type: ' + propName)
      }

      // If type is validate function
      if (typeFormat === 'function' && !options.type(value)) {
        throw new TypeError('Invalid property type: ' + propName)
      }

      // if type is array of possible types
      if (typeFormat === 'array' && options.type.indexOf(valueType) < 0) {
        throw new TypeError('Invalid property type: ' + propName)
      }

      // If it's an invalid value
      if (options.expects && options.expects.indexOf(value) < 0) {
        throw new TypeError('Invalid property value: ' + propName)
      }
    })

    // Now check for props that haven't been defined
    forEach(props, function (value, key) {
      // props.children is always passed in, even if it's not defined
      if (key === 'children') return
      if (!rules[key]) throw new Error('Unexpected property: ' + key)
    })
  }

  /**
   * Used for debugging to inspect the current state without
   * us needing to explicitly manage storing/updating references.
   *
   * @return {Object}
   */

  function inspect () {
    return {
      entities: entities,
      pools: pools,
      handlers: handlers,
      connections: connections,
      currentElement: currentElement,
      options: options,
      app: app,
      container: container,
      children: children
    }
  }

  /**
   * Return an object that lets us completely remove the automatic
   * DOM rendering and export debugging tools.
   */

  return {
    remove: teardown,
    inspect: inspect
  }
}

/**
 * A rendered component instance.
 *
 * This manages the lifecycle, props and state of the component.
 * It's basically just a data object for more straightfoward lookup.
 *
 * @param {Component} component
 * @param {Object} props
 */

function Entity (component, props, ownerId) {
  this.id = uid()
  this.ownerId = ownerId
  this.component = component
  this.propTypes = component.propTypes || {}
  this.context = {}
  this.context.id = this.id;
  this.context.props = defaults(props || {}, component.defaultProps || {})
  this.context.state = this.component.initialState ? this.component.initialState(this.context.props) : {}
  this.pendingProps = assign({}, this.context.props)
  this.pendingState = assign({}, this.context.state)
  this.dirty = false
  this.virtualElement = null
  this.nativeElement = null
  this.displayName = component.name || 'Component'
}

/**
 * Should we pool an element?
 */

function canPool(tagName) {
  return avoidPooling.indexOf(tagName) < 0
}

/**
 * Get a nested node using a path
 *
 * @param {HTMLElement} el   The root node '0'
 * @param {String} path The path string eg. '0.2.43'
 */

function getNodeAtPath(el, path) {
  var parts = path.split('.')
  parts.shift()
  while (parts.length) {
    el = el.childNodes[parts.pop()]
  }
  return el
}

},{"./svg":6,"./utils":7,"component-raf":11,"component-type":12,"dom-pool":13,"dom-walk":14,"fast.js/forEach":18,"fast.js/object/assign":21,"fast.js/reduce":24,"get-uid":25,"is-dom":26,"is-promise":27,"object-path":28,"per-frame":29}],5:[function(require,module,exports){
var utils = require('./utils')
var defaults = utils.defaults

/**
 * Expose `stringify`.
 */

module.exports = function (app) {
  if (!app.element) {
    throw new Error('No element mounted')
  }

  /**
   * Render to string.
   *
   * @param {Component} component
   * @param {Object} [props]
   * @return {String}
   */

  function stringify (component, optProps) {
    var propTypes = component.propTypes || {}
    var props = defaults(optProps || {}, component.defaultProps || {})
    var state = component.initialState ? component.initialState(props) : {}

    for (var name in propTypes) {
      var options = propTypes[name]
      if (options.source) {
        props[name] = app.sources[options.source]
      }
    }

    if (component.beforeMount) component.beforeMount({ props: props, state: state })
    if (component.beforeRender) component.beforeRender({ props: props, state: state })
    var node = component.render({ props: props, state: state })
    return stringifyNode(node, '0')
  }

  /**
   * Render a node to a string
   *
   * @param {Node} node
   * @param {Tree} tree
   *
   * @return {String}
   */

  function stringifyNode (node, path) {
    switch (node.type) {
      case 'text': return node.data
      case 'element':
        var children = node.children
        var attributes = node.attributes
        var tagName = node.tagName
        var innerHTML = attributes.innerHTML
        var str = '<' + tagName + attrs(attributes) + '>'

        if (innerHTML) {
          str += innerHTML
        } else {
          for (var i = 0, n = children.length; i < n; i++) {
            str += stringifyNode(children[i], path + '.' + i)
          }
        }

        str += '</' + tagName + '>'
        return str
      case 'component': return stringify(node.component, node.props)
    }

    throw new Error('Invalid type')
  }

  return stringifyNode(app.element, '0')
}

/**
 * HTML attributes to string.
 *
 * @param {Object} attributes
 * @return {String}
 * @api private
 */

function attrs (attributes) {
  var str = ''
  for (var key in attributes) {
    if (key === 'innerHTML') continue
    str += attr(key, attributes[key])
  }
  return str
}

/**
 * HTML attribute to string.
 *
 * @param {String} key
 * @param {String} val
 * @return {String}
 * @api private
 */

function attr (key, val) {
  return ' ' + key + '="' + val + '"'
}

},{"./utils":7}],6:[function(require,module,exports){
var indexOf = require('fast.js/array/indexOf')

/**
 * This file lists the supported SVG elements used by the
 * renderer. We may add better SVG support in the future
 * that doesn't require whitelisting elements.
 */

exports.namespace = 'http://www.w3.org/2000/svg'

/**
 * Supported SVG elements
 *
 * @type {Array}
 */

exports.elements = [
  'circle',
  'defs',
  'ellipse',
  'g',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan'
]

/**
 * Supported SVG attributes
 */

exports.attributes = [
  'cx',
  'cy',
  'd',
  'dx',
  'dy',
  'fill',
  'fillOpacity',
  'fontFamily',
  'fontSize',
  'fx',
  'fy',
  'gradientTransform',
  'gradientUnits',
  'markerEnd',
  'markerMid',
  'markerStart',
  'offset',
  'opacity',
  'patternContentUnits',
  'patternUnits',
  'points',
  'preserveAspectRatio',
  'r',
  'rx',
  'ry',
  'spreadMethod',
  'stopColor',
  'stopOpacity',
  'stroke',
  'strokeDasharray',
  'strokeLinecap',
  'strokeOpacity',
  'strokeWidth',
  'textAnchor',
  'transform',
  'version',
  'viewBox',
  'x1',
  'x2',
  'x',
  'y1',
  'y2',
  'y'
]

/**
 * Is element's namespace SVG?
 *
 * @param {String} name
 */

exports.isElement = function (name) {
  return indexOf(exports.elements, name) !== -1
}

/**
 * Are element's attributes SVG?
 *
 * @param {String} attr
 */

exports.isAttribute = function (attr) {
  return indexOf(exports.attributes, attr) !== -1
}


},{"fast.js/array/indexOf":16}],7:[function(require,module,exports){
/**
 * The npm 'defaults' module but without clone because
 * it was requiring the 'Buffer' module which is huge.
 *
 * @param {Object} options
 * @param {Object} defaults
 *
 * @return {Object}
 */

exports.defaults = function(options, defaults) {
  Object.keys(defaults).forEach(function(key) {
    if (typeof options[key] === 'undefined') {
      options[key] = defaults[key]
    }
  })
  return options
}

},{}],8:[function(require,module,exports){
/**
 * Module dependencies.
 */

var type = require('component-type')
var slice = require('sliced')
var flatten = require('array-flatten')

/**
 * This function lets us create virtual nodes using a simple
 * syntax. It is compatible with JSX transforms so you can use
 * JSX to write nodes that will compile to this function.
 *
 * let node = virtual('div', { id: 'foo' }, [
 *   virtual('a', { href: 'http://google.com' }, 'Google')
 * ])
 *
 * You can leave out the attributes or the children if either
 * of them aren't needed and it will figure out what you're
 * trying to do.
 */

module.exports = virtual

/**
 * Create virtual DOM trees.
 *
 * This creates the nicer API for the user.
 * It translates that friendly API into an actual tree of nodes.
 *
 * @param {String|Function} type
 * @param {Object} props
 * @param {Array} children
 * @return {Node}
 * @api public
 */

function virtual (type, props, children) {
  // Default to div with no args
  if (!type) {
    throw new Error('deku: Element needs a type. Read more: http://cl.ly/b0KZ')
  }

  // Skipped adding attributes and we're passing
  // in children instead.
  if (arguments.length === 2 && (typeof props === 'string' || Array.isArray(props))) {
    children = props
    props = {}
  }

  // Account for JSX putting the children as multiple arguments.
  // This is essentially just the ES6 rest param
  if (arguments.length > 2 && Array.isArray(arguments[2]) === false) {
    children = slice(arguments, 2)
  }

  children = children || []
  props = props || {}

  // passing in a single child, you can skip
  // using the array
  if (!Array.isArray(children)) {
    children = [ children ]
  }

  children = flatten(children, 1).reduce(normalize, [])

  // pull the key out from the data.
  var key = 'key' in props ? String(props.key) : null
  delete props['key']

  // if you pass in a function, it's a `Component` constructor.
  // otherwise it's an element.
  var node
  if (typeof type === 'string') {
    node = new ElementNode(type, props, key, children)
  } else {
    node = new ComponentNode(type, props, key, children)
  }

  // set the unique ID
  node.index = 0

  return node
}

/**
 * Parse nodes into real `Node` objects.
 *
 * @param {Mixed} node
 * @param {Integer} index
 * @return {Node}
 * @api private
 */

function normalize (acc, node) {
  if (node == null) {
    return acc
  }
  if (typeof node === 'string' || typeof node === 'number') {
    var newNode = new TextNode(String(node))
    newNode.index = acc.length
    acc.push(newNode)
  } else {
    node.index = acc.length
    acc.push(node)
  }
  return acc
}

/**
 * Initialize a new `ComponentNode`.
 *
 * @param {Component} component
 * @param {Object} props
 * @param {String} key Used for sorting/replacing during diffing.
 * @param {Array} children Child virtual nodes
 * @api public
 */

function ComponentNode (component, props, key, children) {
  this.key = key
  this.props = props
  this.type = 'component'
  this.component = component
  this.props.children = children || []
}

/**
 * Initialize a new `ElementNode`.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {String} key Used for sorting/replacing during diffing.
 * @param {Array} children Child virtual dom nodes.
 * @api public
 */

function ElementNode (tagName, attributes, key, children) {
  this.type = 'element'
  this.attributes = parseAttributes(attributes)
  this.tagName = tagName
  this.children = children || []
  this.key = key
}

/**
 * Initialize a new `TextNode`.
 *
 * This is just a virtual HTML text object.
 *
 * @param {String} text
 * @api public
 */

function TextNode (text) {
  this.type = 'text'
  this.data = String(text)
}

/**
 * Parse attributes for some special cases.
 *
 * TODO: This could be more functional and allow hooks
 * into the processing of the attributes at a component-level
 *
 * @param {Object} attributes
 *
 * @return {Object}
 */

function parseAttributes (attributes) {
  // style: { 'text-align': 'left' }
  if (attributes.style) {
    attributes.style = parseStyle(attributes.style)
  }

  // class: { foo: true, bar: false, baz: true }
  // class: ['foo', 'bar', 'baz']
  if (attributes.class) {
    attributes.class = parseClass(attributes.class)
  }

  // Remove attributes with false values
  var filteredAttributes = {}
  for (var key in attributes) {
    var value = attributes[key]
    if (value == null || value === false) continue
    filteredAttributes[key] = value
  }

  return filteredAttributes
}

/**
 * Parse a block of styles into a string.
 *
 * TODO: this could do a lot more with vendor prefixing,
 * number values etc. Maybe there's a way to allow users
 * to hook into this?
 *
 * @param {Object} styles
 *
 * @return {String}
 */

function parseStyle (styles) {
  if (type(styles) === 'string') {
    return styles
  }
  var str = ''
  for (var name in styles) {
    var value = styles[name]
    str = str + name + ':' + value + ';'
  }
  return str;
}

/**
 * Parse the class attribute so it's able to be
 * set in a more user-friendly way
 *
 * @param {String|Object|Array} value
 *
 * @return {String}
 */

function parseClass (value) {
  // { foo: true, bar: false, baz: true }
  if (type(value) === 'object') {
    var matched = []
    for (var key in value) {
      if (value[key]) matched.push(key)
    }
    value = matched
  }

  // ['foo', 'bar', 'baz']
  if (type(value) === 'array') {
    if (value.length === 0) {
      return
    }
    value = value.join(' ')
  }

  return value
}

},{"array-flatten":9,"component-type":12,"sliced":30}],9:[function(require,module,exports){
/**
 * Recursive flatten function with depth.
 *
 * @param  {Array}  array
 * @param  {Array}  result
 * @param  {Number} depth
 * @return {Array}
 */
function flattenDepth (array, result, depth) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (depth > 0 && Array.isArray(value)) {
      flattenDepth(value, result, depth - 1)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * Recursive flatten function. Omitting depth is slightly faster.
 *
 * @param  {Array} array
 * @param  {Array} result
 * @return {Array}
 */
function flattenForever (array, result) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (Array.isArray(value)) {
      flattenForever(value, result)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * Flatten an array, with the ability to define a depth.
 *
 * @param  {Array}  array
 * @param  {Number} depth
 * @return {Array}
 */
module.exports = function (array, depth) {
  if (depth == null) {
    return flattenForever(array, [])
  }

  return flattenDepth(array, [], depth)
}

},{}],10:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],11:[function(require,module,exports){
/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};

},{}],12:[function(require,module,exports){
/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val)

  return typeof val;
};

},{}],13:[function(require,module,exports){
function Pool(params) {
    if (typeof params !== 'object') {
        throw new Error("Please pass parameters. Example -> new Pool({ tagName: \"div\" })");
    }

    if (typeof params.tagName !== 'string') {
        throw new Error("Please specify a tagName. Example -> new Pool({ tagName: \"div\" })");
    }

    this.storage = [];
    this.tagName = params.tagName.toLowerCase();
    this.namespace = params.namespace;
}

Pool.prototype.push = function(el) {
    if (el.tagName.toLowerCase() !== this.tagName) {
        return;
    }
    
    this.storage.push(el);
};

Pool.prototype.pop = function(argument) {
    if (this.storage.length === 0) {
        return this.create();
    } else {
        return this.storage.pop();
    }
};

Pool.prototype.create = function() {
    if (this.namespace) {
        return document.createElementNS(this.namespace, this.tagName);
    } else {
        return document.createElement(this.tagName);
    }
};

Pool.prototype.allocate = function(size) {
    if (this.storage.length >= size) {
        return;
    }

    var difference = size - this.storage.length;
    for (var poolAllocIter = 0; poolAllocIter < difference; poolAllocIter++) {
        this.storage.push(this.create());
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Pool;
}

},{}],14:[function(require,module,exports){
var slice = Array.prototype.slice

module.exports = iterativelyWalk

function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
        nodes = [nodes]
    }
    
    nodes = slice.call(nodes)

    while(nodes.length) {
        var node = nodes.shift(),
            ret = cb(node)

        if (ret) {
            return ret
        }

        if (node.childNodes && node.childNodes.length) {
            nodes = slice.call(node.childNodes).concat(nodes)
        }
    }
}

},{}],15:[function(require,module,exports){
'use strict';

var bindInternal3 = require('../function/bindInternal3');

/**
 * # For Each
 *
 * A fast `.forEach()` implementation.
 *
 * @param  {Array}    subject     The array (or array-like) to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
module.exports = function fastForEach (subject, fn, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      i;
  for (i = 0; i < length; i++) {
    iterator(subject[i], i, subject);
  }
};

},{"../function/bindInternal3":19}],16:[function(require,module,exports){
'use strict';

/**
 * # Index Of
 *
 * A faster `Array.prototype.indexOf()` implementation.
 *
 * @param  {Array}  subject   The array (or array-like) to search within.
 * @param  {mixed}  target    The target item to search for.
 * @param  {Number} fromIndex The position to start searching from, if known.
 * @return {Number}           The position of the target in the subject, or -1 if it does not exist.
 */
module.exports = function fastIndexOf (subject, target, fromIndex) {
  var length = subject.length,
      i = 0;

  if (typeof fromIndex === 'number') {
    i = fromIndex;
    if (i < 0) {
      i += length;
      if (i < 0) {
        i = 0;
      }
    }
  }

  for (; i < length; i++) {
    if (subject[i] === target) {
      return i;
    }
  }
  return -1;
};

},{}],17:[function(require,module,exports){
'use strict';

var bindInternal4 = require('../function/bindInternal4');

/**
 * # Reduce
 *
 * A fast `.reduce()` implementation.
 *
 * @param  {Array}    subject      The array (or array-like) to reduce.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
  var length = subject.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[0];
  }
  else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    result = iterator(result, subject[i], i, subject);
  }

  return result;
};

},{"../function/bindInternal4":20}],18:[function(require,module,exports){
'use strict';

var forEachArray = require('./array/forEach'),
    forEachObject = require('./object/forEach');

/**
 * # ForEach
 *
 * A fast `.forEach()` implementation.
 *
 * @param  {Array|Object} subject     The array or object to iterate over.
 * @param  {Function}     fn          The visitor function.
 * @param  {Object}       thisContext The context for the visitor.
 */
module.exports = function fastForEach (subject, fn, thisContext) {
  if (subject instanceof Array) {
    return forEachArray(subject, fn, thisContext);
  }
  else {
    return forEachObject(subject, fn, thisContext);
  }
};
},{"./array/forEach":15,"./object/forEach":22}],19:[function(require,module,exports){
'use strict';

/**
 * Internal helper to bind a function known to have 3 arguments
 * to a given context.
 */
module.exports = function bindInternal3 (func, thisContext) {
  return function (a, b, c) {
    return func.call(thisContext, a, b, c);
  };
};

},{}],20:[function(require,module,exports){
'use strict';

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */
module.exports = function bindInternal4 (func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

},{}],21:[function(require,module,exports){
'use strict';

/**
 * Analogue of Object.assign().
 * Copies properties from one or more source objects to
 * a target object. Existing keys on the target object will be overwritten.
 *
 * > Note: This differs from spec in some important ways:
 * > 1. Will throw if passed non-objects, including `undefined` or `null` values.
 * > 2. Does not support the curious Exception handling behavior, exceptions are thrown immediately.
 * > For more details, see:
 * > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 *
 *
 *
 * @param  {Object} target      The target object to copy properties to.
 * @param  {Object} source, ... The source(s) to copy properties from.
 * @return {Object}             The updated target object.
 */
module.exports = function fastAssign (target) {
  var totalArgs = arguments.length,
      source, i, totalKeys, keys, key, j;

  for (i = 1; i < totalArgs; i++) {
    source = arguments[i];
    keys = Object.keys(source);
    totalKeys = keys.length;
    for (j = 0; j < totalKeys; j++) {
      key = keys[j];
      target[key] = source[key];
    }
  }
  return target;
};

},{}],22:[function(require,module,exports){
'use strict';

var bindInternal3 = require('../function/bindInternal3');

/**
 * # For Each
 *
 * A fast object `.forEach()` implementation.
 *
 * @param  {Object}   subject     The object to iterate over.
 * @param  {Function} fn          The visitor function.
 * @param  {Object}   thisContext The context for the visitor.
 */
module.exports = function fastForEachObject (subject, fn, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
      key, i;
  for (i = 0; i < length; i++) {
    key = keys[i];
    iterator(subject[key], key, subject);
  }
};

},{"../function/bindInternal3":19}],23:[function(require,module,exports){
'use strict';

var bindInternal4 = require('../function/bindInternal4');

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */
module.exports = function fastReduceObject (subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i, key, result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  }
  else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};

},{"../function/bindInternal4":20}],24:[function(require,module,exports){
'use strict';

var reduceArray = require('./array/reduce'),
    reduceObject = require('./object/reduce');

/**
 * # Reduce
 *
 * A fast `.reduce()` implementation.
 *
 * @param  {Array|Object} subject      The array or object to reduce over.
 * @param  {Function}     fn           The reducer function.
 * @param  {mixed}        initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}       thisContext  The context for the reducer.
 * @return {Array|Object}              The array or object containing the results.
 */
module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
  if (subject instanceof Array) {
    return reduceArray(subject, fn, initialValue, thisContext);
  }
  else {
    return reduceObject(subject, fn, initialValue, thisContext);
  }
};
},{"./array/reduce":17,"./object/reduce":23}],25:[function(require,module,exports){
/** generate unique id for selector */
var counter = Date.now() % 1e9;

module.exports = function getUid(){
	return (Math.random() * 1e9 >>> 0) + (counter++);
};
},{}],26:[function(require,module,exports){
/*global window*/

/**
 * Check if object is dom node.
 *
 * @param {Object} val
 * @return {Boolean}
 * @api public
 */

module.exports = function isNode(val){
  if (!val || typeof val !== 'object') return false;
  if (window && 'object' == typeof window.Node) return val instanceof window.Node;
  return 'number' == typeof val.nodeType && 'string' == typeof val.nodeName;
}

},{}],27:[function(require,module,exports){
module.exports = isPromise;

function isPromise(obj) {
  return obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

},{}],28:[function(require,module,exports){
(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var
    toStr = Object.prototype.toString,
    _hasOwnProperty = Object.prototype.hasOwnProperty;

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
      return true;
    } else {
      for (var i in value) {
        if (_hasOwnProperty.call(value, i)) {
          return false;
        }
      }
      return true;
    }
  }

  function toString(type){
    return toStr.call(type);
  }

  function isNumber(value){
    return typeof value === 'number' || toString(value) === "[object Number]";
  }

  function isString(obj){
    return typeof obj === 'string' || toString(obj) === "[object String]";
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  function isArray(obj){
    return typeof obj === 'object' && typeof obj.length === 'number' && toString(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function set(obj, path, value, doNotReplace){
    if (isNumber(path)) {
      path = [path];
    }
    if (isEmpty(path)) {
      return obj;
    }
    if (isString(path)) {
      return set(obj, path.split('.').map(getKey), value, doNotReplace);
    }
    var currentPath = path[0];

    if (path.length === 1) {
      var oldVal = obj[currentPath];
      if (oldVal === void 0 || !doNotReplace) {
        obj[currentPath] = value;
      }
      return oldVal;
    }

    if (obj[currentPath] === void 0) {
      //check if we assume an array
      if(isNumber(path[1])) {
        obj[currentPath] = [];
      } else {
        obj[currentPath] = {};
      }
    }

    return set(obj[currentPath], path.slice(1), value, doNotReplace);
  }

  function del(obj, path) {
    if (isNumber(path)) {
      path = [path];
    }

    if (isEmpty(obj)) {
      return void 0;
    }

    if (isEmpty(path)) {
      return obj;
    }
    if(isString(path)) {
      return del(obj, path.split('.'));
    }

    var currentPath = getKey(path[0]);
    var oldVal = obj[currentPath];

    if(path.length === 1) {
      if (oldVal !== void 0) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      }
    } else {
      if (obj[currentPath] !== void 0) {
        return del(obj[currentPath], path.slice(1));
      }
    }

    return obj;
  }

  var objectPath = {};

  objectPath.has = function (obj, path) {
    if (isEmpty(obj)) {
      return false;
    }

    if (isNumber(path)) {
      path = [path];
    } else if (isString(path)) {
      path = path.split('.');
    }

    if (isEmpty(path) || path.length === 0) {
      return false;
    }

    for (var i = 0; i < path.length; i++) {
      var j = path[i];
      if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
        obj = obj[j];
      } else {
        return false;
      }
    }

    return true;
  };

  objectPath.ensureExists = function (obj, path, value){
    return set(obj, path, value, true);
  };

  objectPath.set = function (obj, path, value, doNotReplace){
    return set(obj, path, value, doNotReplace);
  };

  objectPath.insert = function (obj, path, value, at){
    var arr = objectPath.get(obj, path);
    at = ~~at;
    if (!isArray(arr)) {
      arr = [];
      objectPath.set(obj, path, arr);
    }
    arr.splice(at, 0, value);
  };

  objectPath.empty = function(obj, path) {
    if (isEmpty(path)) {
      return obj;
    }
    if (isEmpty(obj)) {
      return void 0;
    }

    var value, i;
    if (!(value = objectPath.get(obj, path))) {
      return obj;
    }

    if (isString(value)) {
      return objectPath.set(obj, path, '');
    } else if (isBoolean(value)) {
      return objectPath.set(obj, path, false);
    } else if (isNumber(value)) {
      return objectPath.set(obj, path, 0);
    } else if (isArray(value)) {
      value.length = 0;
    } else if (isObject(value)) {
      for (i in value) {
        if (_hasOwnProperty.call(value, i)) {
          delete value[i];
        }
      }
    } else {
      return objectPath.set(obj, path, null);
    }
  };

  objectPath.push = function (obj, path /*, values */){
    var arr = objectPath.get(obj, path);
    if (!isArray(arr)) {
      arr = [];
      objectPath.set(obj, path, arr);
    }

    arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
  };

  objectPath.coalesce = function (obj, paths, defaultValue) {
    var value;

    for (var i = 0, len = paths.length; i < len; i++) {
      if ((value = objectPath.get(obj, paths[i])) !== void 0) {
        return value;
      }
    }

    return defaultValue;
  };

  objectPath.get = function (obj, path, defaultValue){
    if (isNumber(path)) {
      path = [path];
    }
    if (isEmpty(path)) {
      return obj;
    }
    if (isEmpty(obj)) {
      return defaultValue;
    }
    if (isString(path)) {
      return objectPath.get(obj, path.split('.'), defaultValue);
    }

    var currentPath = getKey(path[0]);

    if (path.length === 1) {
      if (obj[currentPath] === void 0) {
        return defaultValue;
      }
      return obj[currentPath];
    }

    return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
  };

  objectPath.del = function(obj, path) {
    return del(obj, path);
  };

  return objectPath;
});

},{}],29:[function(require,module,exports){
/**
 * Module Dependencies.
 */

var raf = require('raf');

/**
 * Export `throttle`.
 */

module.exports = throttle;

/**
 * Executes a function at most once per animation frame. Kind of like
 * throttle, but it throttles at ~60Hz.
 *
 * @param {Function} fn - the Function to throttle once per animation frame
 * @return {Function}
 * @public
 */

function throttle(fn) {
  var rtn;
  var ignoring = false;

  return function queue() {
    if (ignoring) return rtn;
    ignoring = true;

    raf(function() {
      ignoring = false;
    });

    rtn = fn.apply(this, arguments);
    return rtn;
  };
}

},{"raf":11}],30:[function(require,module,exports){
module.exports = exports = require('./lib/sliced');

},{"./lib/sliced":31}],31:[function(require,module,exports){

/**
 * An Array.prototype.slice.call(arguments) alternative
 *
 * @param {Object} args something with a length
 * @param {Number} slice
 * @param {Number} sliceEnd
 * @api public
 */

module.exports = function (args, slice, sliceEnd) {
  var ret = [];
  var len = args.length;

  if (0 === len) return ret;

  var start = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0;

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > start) {
    ret[len - start] = args[len];
  }

  return ret;
}


},{}],32:[function(require,module,exports){
'use strict';

function SoundCloud (clientId) {
    if (!(this instanceof SoundCloud)) {
        return new SoundCloud(clientId);
    }

    if (!clientId) {
        throw new Error('SoundCloud API clientId is required, get it - https://developers.soundcloud.com/');
    }

    this._events = {};

    this._clientId = clientId;
    this._baseUrl = 'http://api.soundcloud.com';

    this.playing = false;
    this.duration = 0;

    this.audio = document.createElement('audio');
}

SoundCloud.prototype.resolve = function (url, callback) {
    if (!url) {
        throw new Error('SoundCloud track or playlist url is required');
    }

    url = this._baseUrl+'/resolve.json?url='+url+'&client_id='+this._clientId;

    this._jsonp(url, function (data) {
        if (data.tracks) {
            this._playlist = data;
        } else {
            this._track = data;
        }

        this.duration = data.duration/1000; // convert to seconds
        callback(data);
    }.bind(this));
};

SoundCloud.prototype._jsonp = function (url, callback) {
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script = document.createElement('script');

    var id = 'jsonp_callback_'+Math.round(100000*Math.random());
    window[id] = function (data) {
        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }
        window[id] = function () {};
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + id;
    target.parentNode.insertBefore(script, target);
};

SoundCloud.prototype.on = function (e, fn) {
    this._events[e] = fn;
    this.audio.addEventListener(e, fn, false);
};

SoundCloud.prototype.off = function (e, fn) {
    this._events[e] = null;
    this.audio.removeEventListener(e, fn);
};

SoundCloud.prototype.unbindAll = function () {
    for (var e in this._events) {
        var fn = this._events[e];
        if (fn) {
            this.off(e, fn);
        }
    }
};

SoundCloud.prototype.preload = function (streamUrl) {
    this._track = {stream_url: streamUrl};
    this.audio.src = streamUrl+'?client_id='+this._clientId;
};

SoundCloud.prototype.play = function (options) {
    options = options || {};
    var src;

    if (options.streamUrl) {
        src = options.streamUrl;
    } else if (this._playlist) {
        var length = this._playlist.tracks.length;
        if (length) {
            this._playlistIndex = options.playlistIndex || 0;

            // be silent if index is out of range
            if (this._playlistIndex >= length || this._playlistIndex < 0) {
                this._playlistIndex = 0;
                return;
            }
            src = this._playlist.tracks[this._playlistIndex].stream_url;
        }
    } else if (this._track) {
        src = this._track.stream_url;
    }

    if (!src) {
        throw new Error('There is no tracks to play, use `streamUrl` option or `load` method');
    }

    src += '?client_id='+this._clientId;

    if (src !== this.audio.src) {
        this.audio.src = src;
    }

    this.playing = src;
    this.audio.play();
};

SoundCloud.prototype.pause = function () {
    this.audio.pause();
    this.playing = false;
};

SoundCloud.prototype.stop = function () {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.playing = false;
};

SoundCloud.prototype.next = function () {
    var tracksLength = this._playlist.tracks.length;
    if (this._playlistIndex >= tracksLength-1) {
        return;
    }
    if (this._playlist && tracksLength) {
        this.play({playlistIndex: ++this._playlistIndex});
    }
};

SoundCloud.prototype.previous = function () {
    if (this._playlistIndex <= 0) {
        return;
    }
    if (this._playlist && this._playlist.tracks.length) {
        this.play({playlistIndex: --this._playlistIndex});
    }
};

SoundCloud.prototype.seek = function (e) {
    if (!this.audio.readyState) {
        return false;
    }
    var percent = e.offsetX / e.target.offsetWidth || (e.layerX - e.target.offsetLeft) / e.target.offsetWidth;
    this.audio.currentTime = percent * (this.audio.duration || 0);
};

module.exports = SoundCloud;

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/** @jsx deku.dom */

var _deku = require('deku');

var _deku2 = _interopRequireDefault(_deku);

var iconPropTypes = {
    onClick: {
        type: 'function',
        optional: true
    }
};

// SoundCloud Logo
var SoundCloudLogoSVG = {
    propTypes: iconPropTypes,

    shouldUpdate: function shouldUpdate() {
        return false;
    },

    render: function render(component) {
        var props = component.props;

        return _deku2['default'].dom(
            'svg',
            {
                'class': 'sb-soundplayer-widget-cover-logo',
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'currentColor',
                onClick: props.onClick
            },
            _deku2['default'].dom('path', { d: 'M10.517 3.742c-.323 0-.49.363-.49.582 0 0-.244 3.591-.244 4.641 0 1.602.15 2.621.15 2.621 0 .222.261.401.584.401.321 0 .519-.179.519-.401 0 0 .398-1.038.398-2.639 0-1.837-.153-4.127-.284-4.592-.112-.395-.313-.613-.633-.613zm-1.996.268c-.323 0-.49.363-.49.582 0 0-.244 3.322-.244 4.372 0 1.602.119 2.621.119 2.621 0 .222.26.401.584.401.321 0 .581-.179.581-.401 0 0 .081-1.007.081-2.608 0-1.837-.206-4.386-.206-4.386 0-.218-.104-.581-.425-.581zm-2.021 1.729c-.324 0-.49.362-.49.582 0 0-.272 1.594-.272 2.644 0 1.602.179 2.559.179 2.559 0 .222.229.463.552.463.321 0 .519-.241.519-.463 0 0 .19-.944.19-2.546 0-1.837-.253-2.657-.253-2.657 0-.22-.104-.582-.425-.582zm-2.046-.358c-.323 0-.49.363-.49.582 0 0-.162 1.92-.162 2.97 0 1.602.069 2.496.069 2.496 0 .222.26.557.584.557.321 0 .581-.304.581-.526 0 0 .143-.936.143-2.538 0-1.837-.206-2.96-.206-2.96 0-.218-.198-.581-.519-.581zm-2.169 1.482c-.272 0-.232.218-.232.218v3.982s-.04.335.232.335c.351 0 .716-.832.716-2.348 0-1.245-.436-2.187-.716-2.187zm18.715-.976c-.289 0-.567.042-.832.116-.417-2.266-2.806-3.989-5.263-3.989-1.127 0-2.095.705-2.931 1.316v8.16s0 .484.5.484h8.526c1.655 0 3-1.55 3-3.155 0-1.607-1.346-2.932-3-2.932zm10.17.857c-1.077-.253-1.368-.389-1.368-.815 0-.3.242-.611.97-.611.621 0 1.106.253 1.542.699l.981-.951c-.641-.669-1.417-1.067-2.474-1.067-1.339 0-2.425.757-2.425 1.99 0 1.338.873 1.736 2.124 2.026 1.281.291 1.513.486 1.513.923 0 .514-.379.738-1.184.738-.65 0-1.26-.223-1.736-.777l-.98.873c.514.757 1.504 1.232 2.639 1.232 1.853 0 2.668-.873 2.668-2.163 0-1.477-1.193-1.845-2.27-2.097zm6.803-2.745c-1.853 0-2.949 1.435-2.949 3.502s1.096 3.501 2.949 3.501c1.852 0 2.949-1.434 2.949-3.501s-1.096-3.502-2.949-3.502zm0 5.655c-1.097 0-1.553-.941-1.553-2.153 0-1.213.456-2.153 1.553-2.153 1.096 0 1.551.94 1.551 2.153.001 1.213-.454 2.153-1.551 2.153zm8.939-1.736c0 1.086-.533 1.756-1.396 1.756-.864 0-1.388-.689-1.388-1.775v-3.897h-1.358v3.916c0 1.978 1.106 3.084 2.746 3.084 1.726 0 2.754-1.136 2.754-3.103v-3.897h-1.358v3.916zm8.142-.89l.019 1.485c-.087-.174-.31-.515-.475-.768l-2.703-3.692h-1.362v6.894h1.401v-2.988l-.02-1.484c.088.175.311.514.475.767l2.79 3.705h1.213v-6.894h-1.339v2.975zm5.895-2.923h-2.124v6.791h2.027c1.746 0 3.474-1.01 3.474-3.395 0-2.484-1.437-3.396-3.377-3.396zm-.097 5.472h-.67v-4.152h.719c1.436 0 2.028.688 2.028 2.076 0 1.242-.651 2.076-2.077 2.076zm7.909-4.229c.611 0 1 .271 1.242.737l1.26-.582c-.426-.883-1.202-1.503-2.483-1.503-1.775 0-3.016 1.435-3.016 3.502 0 2.143 1.191 3.501 2.968 3.501 1.232 0 2.047-.572 2.513-1.533l-1.145-.68c-.358.602-.718.864-1.329.864-1.019 0-1.611-.932-1.611-2.153-.001-1.261.583-2.153 1.601-2.153zm5.17-1.192h-1.359v6.791h4.083v-1.338h-2.724v-5.453zm6.396-.157c-1.854 0-2.949 1.435-2.949 3.502s1.095 3.501 2.949 3.501c1.853 0 2.95-1.434 2.95-3.501s-1.097-3.502-2.95-3.502zm0 5.655c-1.097 0-1.553-.941-1.553-2.153 0-1.213.456-2.153 1.553-2.153 1.095 0 1.55.94 1.55 2.153.001 1.213-.454 2.153-1.55 2.153zm8.557-1.736c0 1.086-.532 1.756-1.396 1.756-.864 0-1.388-.689-1.388-1.775v-3.794h-1.358v3.813c0 1.978 1.106 3.084 2.746 3.084 1.726 0 2.755-1.136 2.755-3.103v-3.794h-1.36v3.813zm5.449-3.907h-2.318v6.978h2.211c1.908 0 3.789-1.037 3.789-3.489 0-2.552-1.565-3.489-3.682-3.489zm-.108 5.623h-.729v-4.266h.783c1.565 0 2.21.706 2.21 2.133.001 1.276-.707 2.133-2.264 2.133z' })
        );
    }
};

// Player Button Icons
var ButtonIconSVG = {
    propTypes: iconPropTypes,

    render: function render(component) {
        var props = component.props;

        return _deku2['default'].dom(
            'svg',
            {
                'class': 'sb-soundplayer-widget-button-icon',
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 32 32',
                fill: 'currentColor',
                onClick: props.onClick
            },
            props.children
        );
    }
};

// |> Play
var PlayIconSVG = {
    propTypes: iconPropTypes,

    shouldUpdate: function shouldUpdate() {
        return false;
    },

    render: function render(component) {
        var props = component.props;

        return _deku2['default'].dom(
            ButtonIconSVG,
            props,
            _deku2['default'].dom('path', { d: 'M0 0 L32 16 L0 32 z' })
        );
    }
};

// || Pause
var PauseIconSVG = {
    propTypes: iconPropTypes,

    shouldUpdate: function shouldUpdate() {
        return false;
    },

    render: function render(component) {
        var props = component.props;

        return _deku2['default'].dom(
            ButtonIconSVG,
            props,
            _deku2['default'].dom('path', { d: 'M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z' })
        );
    }
};

// |>| Next
var NextIconSVG = {
    propTypes: {
        onClick: {
            type: 'function',
            optional: true
        }
    },

    shouldUpdate: function shouldUpdate() {
        return false;
    },

    render: function render(component) {
        var props = component.props;

        return _deku2['default'].dom(
            ButtonIconSVG,
            props,
            _deku2['default'].dom('path', { d: 'M4 4 L24 14 V4 H28 V28 H24 V18 L4 28 z ' })
        );
    }
};

// |<| Prev
var PrevIconSVG = {
    propTypes: {
        onClick: {
            type: 'function',
            optional: true
        }
    },

    shouldUpdate: function shouldUpdate() {
        return false;
    },

    render: function render(component) {
        var props = component.props;

        return _deku2['default'].dom(
            ButtonIconSVG,
            props,
            _deku2['default'].dom('path', { d: 'M4 4 H8 V14 L28 4 V28 L8 18 V28 H4 z ' })
        );
    }
};

exports['default'] = {
    SoundCloudLogoSVG: SoundCloudLogoSVG,
    PlayIconSVG: PlayIconSVG,
    PauseIconSVG: PauseIconSVG,
    NextIconSVG: NextIconSVG,
    PrevIconSVG: PrevIconSVG
};
module.exports = exports['default'];

},{"deku":3}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/** @jsx deku.dom */

var _deku = require('deku');

var _deku2 = _interopRequireDefault(_deku);

var _soundcloudAudio = require('soundcloud-audio');

var _soundcloudAudio2 = _interopRequireDefault(_soundcloudAudio);

var _Icons = require('./Icons');

exports['default'] = {
    defaultProps: {
        playing: false,
        seeking: false
    },

    propTypes: {
        playing: {
            type: 'boolean',
            optional: true
        },
        seeking: {
            type: 'boolean',
            optional: true
        },
        soundCloudAudio: function soundCloudAudio(prop) {
            return prop instanceof _soundcloudAudio2['default'];
        }
    },

    render: function render(component) {
        var props = component.props;

        function handleClick(e) {
            e.preventDefault();

            var playing = props.playing;
            var soundCloudAudio = props.soundCloudAudio;

            if (!playing) {
                soundCloudAudio && soundCloudAudio.play();
            } else {
                soundCloudAudio && soundCloudAudio.pause();
            }
        }

        return _deku2['default'].dom(
            'button',
            { 'class': 'sb-soundplayer-widget-play', onClick: handleClick },
            !props.playing ? _deku2['default'].dom(_Icons.PlayIconSVG, { onClick: handleClick }) : _deku2['default'].dom(_Icons.PauseIconSVG, { onClick: handleClick })
        );
    }
};
module.exports = exports['default'];

},{"./Icons":33,"deku":3,"soundcloud-audio":32}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/** @jsx deku.dom */

var _deku = require('deku');

var _deku2 = _interopRequireDefault(_deku);

var _soundcloudAudio = require('soundcloud-audio');

var _soundcloudAudio2 = _interopRequireDefault(_soundcloudAudio);

exports['default'] = {
    defaultProps: {
        value: 0
    },

    propTypes: {
        value: {
            type: 'number'
        },
        soundCloudAudio: function soundCloudAudio(prop) {
            return prop instanceof _soundcloudAudio2['default'];
        }
    },

    render: function render(component) {
        var props = component.props;
        var value = props.value;
        var soundCloudAudio = props.soundCloudAudio;

        if (value < 0) {
            value = 0;
        }

        if (value > 100) {
            value = 100;
        }

        var style = { width: '' + value + '%' };

        function handleSeekTrack(e) {
            var xPos = (e.pageX - e.delegateTarget.getBoundingClientRect().left) / e.delegateTarget.offsetWidth;

            if (soundCloudAudio && !isNaN(soundCloudAudio.audio.duration)) {
                soundCloudAudio.audio.currentTime = xPos * soundCloudAudio.audio.duration;
            }
        }

        return _deku2['default'].dom(
            'div',
            { 'class': 'sb-soundplayer-widget-progress-container', onClick: handleSeekTrack },
            _deku2['default'].dom('div', { 'class': 'sb-soundplayer-widget-progress-inner', style: style })
        );
    }
};
module.exports = exports['default'];

},{"deku":3,"soundcloud-audio":32}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/** @jsx deku.dom */

var _deku = require('deku');

var _deku2 = _interopRequireDefault(_deku);

function prettyTime(time) {
    var hours = Math.floor(time / 3600);
    var mins = '0' + Math.floor(time % 3600 / 60);
    var secs = '0' + Math.floor(time % 60);

    mins = mins.substr(mins.length - 2);
    secs = secs.substr(secs.length - 2);

    if (!isNaN(secs)) {
        if (hours) {
            return '' + hours + ':' + mins + ':' + secs;
        } else {
            return '' + mins + ':' + secs;
        }
    } else {
        return '00:00';
    }
}

exports['default'] = {
    defaultProps: {
        duration: 0,
        currentTime: 0
    },

    propTypes: {
        duration: {
            type: 'number'
        },
        currentTime: {
            type: 'number'
        }
    },

    render: function render(component) {
        var props = component.props;

        return _deku2['default'].dom(
            'div',
            { 'class': 'sb-soundplayer-widget-timer' },
            prettyTime(props.currentTime),
            ' / ',
            prettyTime(props.duration)
        );
    }
};
module.exports = exports['default'];

},{"deku":3}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stopAllOther = stopAllOther;
exports.addToStore = addToStore;
// handling multiple audio on the page helpers
var _audios = [];

function stopAllOther(playing) {
    _audios.forEach(function (soundCloudAudio) {
        if (soundCloudAudio.playing && soundCloudAudio.playing !== playing) {
            soundCloudAudio.stop();
        }
    });
}

function addToStore(soundCloudAudio) {
    var isPresent = false;

    for (var i = 0, len = _audios.length; i < len; i++) {
        var _soundCloudAudio = _audios[i];
        if (_soundCloudAudio.playing === soundCloudAudio.playing) {
            isPresent = true;
            break;
        }
    }

    if (!isPresent) {
        _audios.push(soundCloudAudio);
    }
}

},{}],38:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.create = create;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deku = require('deku');

var _deku2 = _interopRequireDefault(_deku);

var _soundcloudAudio = require('soundcloud-audio');

var _soundcloudAudio2 = _interopRequireDefault(_soundcloudAudio);

var _componentsPlayButton = require('./components/PlayButton');

var _componentsPlayButton2 = _interopRequireDefault(_componentsPlayButton);

var _componentsProgress = require('./components/Progress');

var _componentsProgress2 = _interopRequireDefault(_componentsProgress);

var _componentsTimer = require('./components/Timer');

var _componentsTimer2 = _interopRequireDefault(_componentsTimer);

var _componentsIcons = require('./components/Icons');

var _utilsAudioStore = require('./utils/audioStore');

/** @jsx deku.dom */

var env = process.env.NODE_ENV || 'development';

var noClientIdMessage = ['You must provide SoundCloud clientId for SoundPlayer widget', '', 'Example:', '<script>', 'var sb_soundplayer_client_id = "YOUR-CLIENT-ID";', '</script>', '', 'Register for app and get clientId at https://developers.soundcloud.com/'].join('\n');

var Widget = {
    propTypes: {
        url: {
            type: 'string'
        },
        soundCloudAudio: function soundCloudAudio(prop) {
            return prop instanceof _soundcloudAudio2['default'];
        }
    },

    initialState: function initialState() {
        return {
            duration: 0,
            currentTime: 0,
            seeking: false,
            playing: false
        };
    },

    afterMount: function afterMount(component, el, setState) {
        var props = component.props;
        var soundCloudAudio = props.soundCloudAudio;

        soundCloudAudio.resolve(props.url, function (data) {
            // TBD: support for playlists
            var track = data.tracks ? data.tracks[0] : data;
            setState({ track: track });
        });

        function onAudioStarted() {
            setState({ playing: true });

            _utilsAudioStore.stopAllOther(soundCloudAudio.playing);
            _utilsAudioStore.addToStore(soundCloudAudio);
        }

        function getCurrentTime() {
            setState({ currentTime: soundCloudAudio.audio.currentTime });
        }

        function getDuration() {
            setState({ duration: soundCloudAudio.audio.duration });
        }

        function onSeekingTrack() {
            setState({ seeking: true });
        }

        function onSeekedTrack() {
            setState({ seeking: false });
        }

        function onAudioEnded() {
            setState({ playing: false });
        }

        // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
        soundCloudAudio.on('playing', onAudioStarted);
        soundCloudAudio.on('timeupdate', getCurrentTime);
        soundCloudAudio.on('loadedmetadata', getDuration);
        soundCloudAudio.on('seeking', onSeekingTrack);
        soundCloudAudio.on('seeked', onSeekedTrack);
        soundCloudAudio.on('pause', onAudioEnded);
        soundCloudAudio.on('ended', onAudioEnded);
    },

    beforeMount: function beforeMount(component) {
        var props = component.props;

        props.soundCloudAudio.unbindAll();
    },

    render: function render(component) {
        var state = component.state;
        var props = component.props;

        if (!state.track) {
            return _deku2['default'].dom('span', null);
        }

        if (state.track && !state.track.streamable) {
            return _deku2['default'].dom(
                'div',
                { 'class': 'sb-soundplayer-widget-message' },
                _deku2['default'].dom(
                    'a',
                    { href: state.track.permalink_url, target: '_blank' },
                    state.track.title
                ),
                ' is not streamable!'
            );
        }

        return _deku2['default'].dom(
            'div',
            { 'class': 'sb-soundplayer-widget-cover', style: {
                    'background-image': 'url(' + state.track.artwork_url.replace('large', 't500x500') + ')'
                } },
            _deku2['default'].dom('div', { 'class': 'sb-soundplayer-widget-overlay' }),
            _deku2['default'].dom(
                'div',
                { 'class': 'sb-soundplayer-widget-track-info' },
                _deku2['default'].dom(
                    'h3',
                    { 'class': 'sb-soundplayer-widget-user' },
                    state.track.user.username
                ),
                _deku2['default'].dom(
                    'h2',
                    { 'class': 'sb-soundplayer-widget-title' },
                    state.track.title
                )
            ),
            _deku2['default'].dom(
                'a',
                { href: state.track.permalink_url, target: '_blank' },
                _deku2['default'].dom(_componentsIcons.SoundCloudLogoSVG, null)
            ),
            _deku2['default'].dom(
                'div',
                { 'class': 'sb-soundplayer-widget-controls' },
                _deku2['default'].dom(_componentsPlayButton2['default'], {
                    playing: state.playing,
                    soundCloudAudio: props.soundCloudAudio
                }),
                _deku2['default'].dom(_componentsProgress2['default'], {
                    value: state.currentTime / state.duration * 100 || 0,
                    soundCloudAudio: props.soundCloudAudio
                }),
                _deku2['default'].dom(_componentsTimer2['default'], {
                    duration: state.track.duration / 1000,
                    currentTime: state.currentTime
                })
            )
        );
    }
};

function create(el, opts) {
    var clientId = opts.clientId || window.sb_soundplayer_client_id;
    if (!clientId) {
        console.error(noClientIdMessage);
        return;
    }

    var soundCloudAudio = new _soundcloudAudio2['default'](clientId);

    var app = _deku2['default'].tree(_deku2['default'].dom(Widget, { url: opts.url, soundCloudAudio: soundCloudAudio }));

    if (env === 'development') {
        app.option('validateProps', true);
    }

    _deku2['default'].render(app, el);
}

}).call(this,require('_process'))

},{"./components/Icons":33,"./components/PlayButton":34,"./components/Progress":35,"./components/Timer":36,"./utils/audioStore":37,"_process":1,"deku":3,"soundcloud-audio":32}],39:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _widget = require('./widget');

var SPWidget = _interopRequireWildcard(_widget);

// optionally append styles
var cssUrl = window.sb_soundplayer_css_url;
if (cssUrl) {
    var head = document.getElementsByTagName('head')[0];
    var css = document.createElement('link');
    css.id = 'sb-soundplayer-widget-style';
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', cssUrl);
    head.appendChild(css);
}

var elements = document.querySelectorAll('.sb-soundplayer-widget');

for (var i = 0, len = elements.length; i < len; i++) {
    var el = elements[i];
    var url = el.getAttribute('data-url');
    var layout = el.getAttribute('data-layout');

    SPWidget.create(el, { url: url, layout: layout });
}

},{"./widget":38}]},{},[39])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2Rla3UvbGliL2FwcGxpY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2Rla3UvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Rla3UvbGliL3JlbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L2xpYi9zdHJpbmdpZnkuanMiLCJub2RlX21vZHVsZXMvZGVrdS9saWIvc3ZnLmpzIiwibm9kZV9tb2R1bGVzL2Rla3UvbGliL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2Rla3UvbGliL3ZpcnR1YWwuanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvYXJyYXktZmxhdHRlbi9hcnJheS1mbGF0dGVuLmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1yYWYvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvY29tcG9uZW50LXR5cGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvZG9tLXBvb2wvUG9vbC5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9kb20td2Fsay9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9mYXN0LmpzL2FycmF5L2ZvckVhY2guanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvZmFzdC5qcy9hcnJheS9pbmRleE9mLmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2Zhc3QuanMvYXJyYXkvcmVkdWNlLmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2Zhc3QuanMvZm9yRWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9mYXN0LmpzL2Z1bmN0aW9uL2JpbmRJbnRlcm5hbDMuanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvZmFzdC5qcy9mdW5jdGlvbi9iaW5kSW50ZXJuYWw0LmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2Zhc3QuanMvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9mYXN0LmpzL29iamVjdC9mb3JFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2Zhc3QuanMvb2JqZWN0L3JlZHVjZS5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9mYXN0LmpzL3JlZHVjZS5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9nZXQtdWlkL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL2lzLWRvbS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9pcy1wcm9taXNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL29iamVjdC1wYXRoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Rla3Uvbm9kZV9tb2R1bGVzL3Blci1mcmFtZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWt1L25vZGVfbW9kdWxlcy9zbGljZWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGVrdS9ub2RlX21vZHVsZXMvc2xpY2VkL2xpYi9zbGljZWQuanMiLCJub2RlX21vZHVsZXMvc291bmRjbG91ZC1hdWRpby9pbmRleC5qcyIsIi9Vc2Vycy9kbWl0cmkvZ2l0aHViL3NvdW5kcGxheWVyLXdpZGdldC9zcmMvY29tcG9uZW50cy9JY29ucy5qcyIsIi9Vc2Vycy9kbWl0cmkvZ2l0aHViL3NvdW5kcGxheWVyLXdpZGdldC9zcmMvY29tcG9uZW50cy9QbGF5QnV0dG9uLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvc291bmRwbGF5ZXItd2lkZ2V0L3NyYy9jb21wb25lbnRzL1Byb2dyZXNzLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvc291bmRwbGF5ZXItd2lkZ2V0L3NyYy9jb21wb25lbnRzL1RpbWVyLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvc291bmRwbGF5ZXItd2lkZ2V0L3NyYy91dGlscy9hdWRpb1N0b3JlLmpzIiwiL1VzZXJzL2RtaXRyaS9naXRodWIvc291bmRwbGF5ZXItd2lkZ2V0L3NyYy93aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbjZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKCFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJylcblxuLyoqXG4gKiBFeHBvc2UgYHNjZW5lYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGBBcHBsaWNhdGlvbmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgT3B0aW9uYWwgaW5pdGlhbCBlbGVtZW50XG4gKi9cblxuZnVuY3Rpb24gQXBwbGljYXRpb24gKGVsZW1lbnQpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEFwcGxpY2F0aW9uKSkgcmV0dXJuIG5ldyBBcHBsaWNhdGlvbihlbGVtZW50KVxuICB0aGlzLm9wdGlvbnMgPSB7fVxuICB0aGlzLnNvdXJjZXMgPSB7fVxuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoQXBwbGljYXRpb24ucHJvdG90eXBlKVxuXG4vKipcbiAqIEFkZCBhIHBsdWdpblxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBsdWdpblxuICovXG5cbkFwcGxpY2F0aW9uLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG4gIHBsdWdpbih0aGlzKVxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIFNldCBhbiBvcHRpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICovXG5cbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5vcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XG4gIHRoaXMub3B0aW9uc1tuYW1lXSA9IHZhbFxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIFNldCB2YWx1ZSB1c2VkIHNvbWV3aGVyZSBpbiB0aGUgSU8gbmV0d29yay5cbiAqL1xuXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcbiAgdGhpcy5zb3VyY2VzW25hbWVdID0gZGF0YVxuICB0aGlzLmVtaXQoJ3NvdXJjZScsIG5hbWUsIGRhdGEpXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogTW91bnQgYSB2aXJ0dWFsIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtWaXJ0dWFsRWxlbWVudH0gZWxlbWVudFxuICovXG5cbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5tb3VudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgdGhpcy5lbWl0KCdtb3VudCcsIGVsZW1lbnQpXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSB3b3JsZC4gVW5tb3VudCBldmVyeXRoaW5nLlxuICovXG5cbkFwcGxpY2F0aW9uLnByb3RvdHlwZS51bm1vdW50ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuZWxlbWVudCkgcmV0dXJuXG4gIHRoaXMuZWxlbWVudCA9IG51bGxcbiAgdGhpcy5lbWl0KCd1bm1vdW50JylcbiAgcmV0dXJuIHRoaXNcbn1cbiIsIi8qKlxuICogQ3JlYXRlIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuXG5leHBvcnRzLnRyZWUgPVxuZXhwb3J0cy5zY2VuZSA9XG5leHBvcnRzLmRla3UgPSByZXF1aXJlKCcuL2FwcGxpY2F0aW9uJylcblxuLyoqXG4gKiBSZW5kZXIgc2NlbmVzIHRvIHRoZSBET00uXG4gKi9cblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgZXhwb3J0cy5yZW5kZXIgPSByZXF1aXJlKCcuL3JlbmRlcicpXG59XG5cbi8qKlxuICogUmVuZGVyIHNjZW5lcyB0byBhIHN0cmluZ1xuICovXG5cbmV4cG9ydHMucmVuZGVyU3RyaW5nID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKVxuXG4vKipcbiAqIENyZWF0ZSB2aXJ0dWFsIGVsZW1lbnRzLlxuICovXG5cbmV4cG9ydHMuZWxlbWVudCA9XG5leHBvcnRzLmRvbSA9IHJlcXVpcmUoJy4vdmlydHVhbCcpXG4iLCIvKipcbiAqIERlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcmFmID0gcmVxdWlyZSgnY29tcG9uZW50LXJhZicpXG52YXIgUG9vbCA9IHJlcXVpcmUoJ2RvbS1wb29sJylcbnZhciB3YWxrID0gcmVxdWlyZSgnZG9tLXdhbGsnKVxudmFyIGlzRG9tID0gcmVxdWlyZSgnaXMtZG9tJylcbnZhciB1aWQgPSByZXF1aXJlKCdnZXQtdWlkJylcbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoJ3Blci1mcmFtZScpXG52YXIga2V5cGF0aCA9IHJlcXVpcmUoJ29iamVjdC1wYXRoJylcbnZhciB0eXBlID0gcmVxdWlyZSgnY29tcG9uZW50LXR5cGUnKVxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpXG52YXIgc3ZnID0gcmVxdWlyZSgnLi9zdmcnKVxudmFyIGRlZmF1bHRzID0gdXRpbHMuZGVmYXVsdHNcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnZmFzdC5qcy9mb3JFYWNoJylcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdmYXN0LmpzL29iamVjdC9hc3NpZ24nKVxudmFyIHJlZHVjZSA9IHJlcXVpcmUoJ2Zhc3QuanMvcmVkdWNlJylcbnZhciBpc1Byb21pc2UgPSByZXF1aXJlKCdpcy1wcm9taXNlJylcblxuLyoqXG4gKiBBbGwgb2YgdGhlIGV2ZW50cyBjYW4gYmluZCB0b1xuICovXG5cbnZhciBldmVudHMgPSB7XG4gIG9uQmx1cjogJ2JsdXInLFxuICBvbkNoYW5nZTogJ2NoYW5nZScsXG4gIG9uQ2xpY2s6ICdjbGljaycsXG4gIG9uQ29udGV4dE1lbnU6ICdjb250ZXh0bWVudScsXG4gIG9uQ29weTogJ2NvcHknLFxuICBvbkN1dDogJ2N1dCcsXG4gIG9uRG91YmxlQ2xpY2s6ICdkYmxjbGljaycsXG4gIG9uRHJhZzogJ2RyYWcnLFxuICBvbkRyYWdFbmQ6ICdkcmFnZW5kJyxcbiAgb25EcmFnRW50ZXI6ICdkcmFnZW50ZXInLFxuICBvbkRyYWdFeGl0OiAnZHJhZ2V4aXQnLFxuICBvbkRyYWdMZWF2ZTogJ2RyYWdsZWF2ZScsXG4gIG9uRHJhZ092ZXI6ICdkcmFnb3ZlcicsXG4gIG9uRHJhZ1N0YXJ0OiAnZHJhZ3N0YXJ0JyxcbiAgb25Ecm9wOiAnZHJvcCcsXG4gIG9uRm9jdXM6ICdmb2N1cycsXG4gIG9uSW5wdXQ6ICdpbnB1dCcsXG4gIG9uS2V5RG93bjogJ2tleWRvd24nLFxuICBvbktleVVwOiAna2V5dXAnLFxuICBvbk1vdXNlRG93bjogJ21vdXNlZG93bicsXG4gIG9uTW91c2VFbnRlcjogJ21vdXNlZW50ZXInLFxuICBvbk1vdXNlTGVhdmU6ICdtb3VzZWxlYXZlJyxcbiAgb25Nb3VzZU1vdmU6ICdtb3VzZW1vdmUnLFxuICBvbk1vdXNlT3V0OiAnbW91c2VvdXQnLFxuICBvbk1vdXNlT3ZlcjogJ21vdXNlb3ZlcicsXG4gIG9uTW91c2VVcDogJ21vdXNldXAnLFxuICBvblBhc3RlOiAncGFzdGUnLFxuICBvblNjcm9sbDogJ3Njcm9sbCcsXG4gIG9uU3VibWl0OiAnc3VibWl0JyxcbiAgb25Ub3VjaENhbmNlbDogJ3RvdWNoY2FuY2VsJyxcbiAgb25Ub3VjaEVuZDogJ3RvdWNoZW5kJyxcbiAgb25Ub3VjaE1vdmU6ICd0b3VjaG1vdmUnLFxuICBvblRvdWNoU3RhcnQ6ICd0b3VjaHN0YXJ0J1xufVxuXG4vKipcbiAqIFRoZXNlIGVsZW1lbnRzIHdvbid0IGJlIHBvb2xlZFxuICovXG5cbnZhciBhdm9pZFBvb2xpbmcgPSBbJ2lucHV0JywgJ3RleHRhcmVhJ107XG5cbi8qKlxuICogRXhwb3NlIGBkb21gLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyXG5cbi8qKlxuICogUmVuZGVyIGFuIGFwcCB0byB0aGUgRE9NXG4gKlxuICogQHBhcmFtIHtBcHBsaWNhdGlvbn0gYXBwXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIHJlbmRlciAoYXBwLCBjb250YWluZXIsIG9wdHMpIHtcbiAgdmFyIGZyYW1lSWRcbiAgdmFyIGlzUmVuZGVyaW5nXG4gIHZhciByb290SWQgPSAncm9vdCdcbiAgdmFyIGN1cnJlbnRFbGVtZW50XG4gIHZhciBjdXJyZW50TmF0aXZlRWxlbWVudFxuICB2YXIgY29ubmVjdGlvbnMgPSB7fVxuICB2YXIgY29tcG9uZW50cyA9IHt9XG4gIHZhciBlbnRpdGllcyA9IHt9XG4gIHZhciBwb29scyA9IHt9XG4gIHZhciBoYW5kbGVycyA9IHt9XG4gIHZhciBtb3VudFF1ZXVlID0gW11cbiAgdmFyIGNoaWxkcmVuID0ge31cbiAgY2hpbGRyZW5bcm9vdElkXSA9IHt9XG5cbiAgaWYgKCFpc0RvbShjb250YWluZXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgZWxlbWVudCBtdXN0IGJlIGEgRE9NIGVsZW1lbnQnKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcmluZyBvcHRpb25zLiBCYXRjaGluZyBpcyBvbmx5IGV2ZXIgcmVhbGx5IGRpc2FibGVkXG4gICAqIHdoZW4gcnVubmluZyB0ZXN0cywgYW5kIHBvb2xpbmcgY2FuIGJlIGRpc2FibGVkIGlmIHRoZSB1c2VyXG4gICAqIGlzIGRvaW5nIHNvbWV0aGluZyBzdHVwaWQgd2l0aCB0aGUgRE9NIGluIHRoZWlyIGNvbXBvbmVudHMuXG4gICAqL1xuXG4gIHZhciBvcHRpb25zID0gZGVmYXVsdHMoYXNzaWduKHt9LCBhcHAub3B0aW9ucyB8fCB7fSwgb3B0cyB8fCB7fSksIHtcbiAgICBwb29saW5nOiB0cnVlLFxuICAgIGJhdGNoaW5nOiB0cnVlLFxuICAgIHZhbGlkYXRlUHJvcHM6IGZhbHNlXG4gIH0pXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBET00gZXZlbnRzXG4gICAqL1xuXG4gIGFkZE5hdGl2ZUV2ZW50TGlzdGVuZXJzKClcblxuICAvKipcbiAgICogV2F0Y2ggZm9yIGNoYW5nZXMgdG8gdGhlIGFwcCBzbyB0aGF0IHdlIGNhbiB1cGRhdGVcbiAgICogdGhlIERPTSBhcyBuZWVkZWQuXG4gICAqL1xuXG4gIGFwcC5vbigndW5tb3VudCcsIG9udW5tb3VudClcbiAgYXBwLm9uKCdtb3VudCcsIG9ubW91bnQpXG4gIGFwcC5vbignc291cmNlJywgb251cGRhdGUpXG5cbiAgLyoqXG4gICAqIElmIHRoZSBhcHAgaGFzIGFscmVhZHkgbW91bnRlZCBhbiBlbGVtZW50LCB3ZSBjYW4ganVzdFxuICAgKiByZW5kZXIgdGhhdCBzdHJhaWdodCBhd2F5LlxuICAgKi9cblxuICBpZiAoYXBwLmVsZW1lbnQpIHJlbmRlcigpXG5cbiAgLyoqXG4gICAqIFRlYXJkb3duIHRoZSBET00gcmVuZGVyaW5nIHNvIHRoYXQgaXQgc3RvcHNcbiAgICogcmVuZGVyaW5nIGFuZCBldmVyeXRoaW5nIGNhbiBiZSBnYXJiYWdlIGNvbGxlY3RlZC5cbiAgICovXG5cbiAgZnVuY3Rpb24gdGVhcmRvd24gKCkge1xuICAgIHJlbW92ZU5hdGl2ZUV2ZW50TGlzdGVuZXJzKClcbiAgICByZW1vdmVOYXRpdmVFbGVtZW50KClcbiAgICBhcHAub2ZmKCd1bm1vdW50Jywgb251bm1vdW50KVxuICAgIGFwcC5vZmYoJ21vdW50Jywgb25tb3VudClcbiAgICBhcHAub2ZmKCdzb3VyY2UnLCBvbnVwZGF0ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2FwIHRoZSBjdXJyZW50IHJlbmRlcmVkIG5vZGUgd2l0aCBhIG5ldyBvbmUgdGhhdCBpcyByZW5kZXJlZFxuICAgKiBmcm9tIHRoZSBuZXcgdmlydHVhbCBlbGVtZW50IG1vdW50ZWQgb24gdGhlIGFwcC5cbiAgICpcbiAgICogQHBhcmFtIHtWaXJ0dWFsRWxlbWVudH0gZWxlbWVudFxuICAgKi9cblxuICBmdW5jdGlvbiBvbm1vdW50ICgpIHtcbiAgICBpbnZhbGlkYXRlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgYXBwIHVubW91bnRzIGFuIGVsZW1lbnQsIHdlIHNob3VsZCBjbGVhciBvdXQgdGhlIGN1cnJlbnRcbiAgICogcmVuZGVyZWQgZWxlbWVudC4gVGhpcyB3aWxsIHJlbW92ZSBhbGwgdGhlIGVudGl0aWVzLlxuICAgKi9cblxuICBmdW5jdGlvbiBvbnVubW91bnQgKCkge1xuICAgIHJlbW92ZU5hdGl2ZUVsZW1lbnQoKVxuICAgIGN1cnJlbnRFbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbGwgY29tcG9uZW50cyB0aGF0IGFyZSBib3VuZCB0byB0aGUgc291cmNlXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7Kn0gZGF0YVxuICAgKi9cblxuICBmdW5jdGlvbiBvbnVwZGF0ZSAobmFtZSwgZGF0YSkge1xuICAgIGlmICghY29ubmVjdGlvbnNbbmFtZV0pIHJldHVybjtcbiAgICBjb25uZWN0aW9uc1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKHVwZGF0ZSkge1xuICAgICAgdXBkYXRlKGRhdGEpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgYW5kIG1vdW50IGEgY29tcG9uZW50IHRvIHRoZSBuYXRpdmUgZG9tLlxuICAgKlxuICAgKiBAcGFyYW0ge0VudGl0eX0gZW50aXR5XG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cblxuICBmdW5jdGlvbiBtb3VudEVudGl0eSAoZW50aXR5KSB7XG4gICAgcmVnaXN0ZXIoZW50aXR5KVxuICAgIHNldFNvdXJjZXMoZW50aXR5KVxuICAgIGNoaWxkcmVuW2VudGl0eS5pZF0gPSB7fVxuICAgIGVudGl0aWVzW2VudGl0eS5pZF0gPSBlbnRpdHlcblxuICAgIC8vIGNvbW1pdCBpbml0aWFsIHN0YXRlIGFuZCBwcm9wcy5cbiAgICBjb21taXQoZW50aXR5KVxuXG4gICAgLy8gY2FsbGJhY2sgYmVmb3JlIG1vdW50aW5nLlxuICAgIHRyaWdnZXIoJ2JlZm9yZU1vdW50JywgZW50aXR5LCBbZW50aXR5LmNvbnRleHRdKVxuICAgIHRyaWdnZXIoJ2JlZm9yZVJlbmRlcicsIGVudGl0eSwgW2VudGl0eS5jb250ZXh0XSlcblxuICAgIC8vIHJlbmRlciB2aXJ0dWFsIGVsZW1lbnQuXG4gICAgdmFyIHZpcnR1YWxFbGVtZW50ID0gcmVuZGVyRW50aXR5KGVudGl0eSlcbiAgICAvLyBjcmVhdGUgbmF0aXZlIGVsZW1lbnQuXG4gICAgdmFyIG5hdGl2ZUVsZW1lbnQgPSB0b05hdGl2ZShlbnRpdHkuaWQsICcwJywgdmlydHVhbEVsZW1lbnQpXG5cbiAgICBlbnRpdHkudmlydHVhbEVsZW1lbnQgPSB2aXJ0dWFsRWxlbWVudFxuICAgIGVudGl0eS5uYXRpdmVFbGVtZW50ID0gbmF0aXZlRWxlbWVudFxuXG4gICAgLy8gRmlyZSBhZnRlclJlbmRlciBhbmQgYWZ0ZXJNb3VudCBob29rcyBhdCB0aGUgZW5kXG4gICAgLy8gb2YgdGhlIHJlbmRlciBjeWNsZVxuICAgIG1vdW50UXVldWUucHVzaChlbnRpdHkuaWQpXG5cbiAgICByZXR1cm4gbmF0aXZlRWxlbWVudFxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGNvbXBvbmVudCBmcm9tIHRoZSBuYXRpdmUgZG9tLlxuICAgKlxuICAgKiBAcGFyYW0ge0VudGl0eX0gZW50aXR5XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHVubW91bnRFbnRpdHkgKGVudGl0eUlkKSB7XG4gICAgdmFyIGVudGl0eSA9IGVudGl0aWVzW2VudGl0eUlkXVxuICAgIGlmICghZW50aXR5KSByZXR1cm5cbiAgICB0cmlnZ2VyKCdiZWZvcmVVbm1vdW50JywgZW50aXR5LCBbZW50aXR5LmNvbnRleHQsIGVudGl0eS5uYXRpdmVFbGVtZW50XSlcbiAgICB1bm1vdW50Q2hpbGRyZW4oZW50aXR5SWQpXG4gICAgcmVtb3ZlQWxsRXZlbnRzKGVudGl0eUlkKVxuICAgIHZhciBjb21wb25lbnRFbnRpdGllcyA9IGNvbXBvbmVudHNbZW50aXR5SWRdLmVudGl0aWVzO1xuICAgIGRlbGV0ZSBjb21wb25lbnRFbnRpdGllc1tlbnRpdHlJZF1cbiAgICBkZWxldGUgY29tcG9uZW50c1tlbnRpdHlJZF1cbiAgICBkZWxldGUgZW50aXRpZXNbZW50aXR5SWRdXG4gICAgZGVsZXRlIGNoaWxkcmVuW2VudGl0eUlkXVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgZW50aXR5IGFuZCBtYWtlIHN1cmUgaXQgcmV0dXJucyBhIG5vZGVcbiAgICpcbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eVxuICAgKlxuICAgKiBAcmV0dXJuIHtWaXJ0dWFsVHJlZX1cbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyRW50aXR5IChlbnRpdHkpIHtcbiAgICB2YXIgY29tcG9uZW50ID0gZW50aXR5LmNvbXBvbmVudFxuICAgIGlmICghY29tcG9uZW50LnJlbmRlcikgdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnQgbmVlZHMgYSByZW5kZXIgZnVuY3Rpb24nKVxuICAgIHZhciByZXN1bHQgPSBjb21wb25lbnQucmVuZGVyKGVudGl0eS5jb250ZXh0LCBzZXRTdGF0ZShlbnRpdHkpKVxuICAgIGlmICghcmVzdWx0KSB0aHJvdyBuZXcgRXJyb3IoJ1JlbmRlciBmdW5jdGlvbiBtdXN0IHJldHVybiBhbiBlbGVtZW50LicpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW5ldmVyIHNldFN0YXRlIG9yIHNldFByb3BzIGlzIGNhbGxlZCwgd2UgbWFyayB0aGUgZW50aXR5XG4gICAqIGFzIGRpcnR5IGluIHRoZSByZW5kZXJlci4gVGhpcyBsZXRzIHVzIG9wdGltaXplIHRoZSByZS1yZW5kZXJpbmdcbiAgICogYW5kIHNraXAgY29tcG9uZW50cyB0aGF0IGRlZmluaXRlbHkgaGF2ZW4ndCBjaGFuZ2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge0VudGl0eX0gZW50aXR5XG4gICAqXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGN1cnJpZWQgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSBzdGF0ZSBvZiBhbiBlbnRpdHlcbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0U3RhdGUgKGVudGl0eSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobmV4dFN0YXRlKSB7XG4gICAgICB1cGRhdGVFbnRpdHlTdGF0ZUFzeW5jKGVudGl0eSwgbmV4dFN0YXRlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxsIHRoZSBhcHAgaXQncyBkaXJ0eSBhbmQgbmVlZHMgdG8gcmUtcmVuZGVyLiBJZiBiYXRjaGluZyBpcyBkaXNhYmxlZFxuICAgKiB3ZSBjYW4ganVzdCB0cmlnZ2VyIGEgcmVuZGVyIGltbWVkaWF0ZWx5LCBvdGhlcndpc2Ugd2UnbGwgd2FpdCB1bnRpbFxuICAgKiB0aGUgbmV4dCBhdmFpbGFibGUgZnJhbWUuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGludmFsaWRhdGUgKCkge1xuICAgIGlmICghb3B0aW9ucy5iYXRjaGluZykge1xuICAgICAgaWYgKCFpc1JlbmRlcmluZykgcmVuZGVyKClcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFmcmFtZUlkKSBmcmFtZUlkID0gcmFmKHJlbmRlcilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBET00uIElmIHRoZSB1cGRhdGUgZmFpbHMgd2Ugc3RvcCB0aGUgbG9vcFxuICAgKiBzbyB3ZSBkb24ndCBnZXQgZXJyb3JzIG9uIGV2ZXJ5IGZyYW1lLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiByZW5kZXIgKCkge1xuICAgIC8vIElmIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgd2UgbmVlZCB0b1xuICAgIC8vIGNhbmNlbCBhbnkgcGVuZGluZyBmdXR1cmUgdXBkYXRlc1xuICAgIGNsZWFyRnJhbWUoKVxuXG4gICAgLy8gSWYgdGhlIHJlbmRlcmluZyBmcm9tIHRoZSBwcmV2aW91cyBmcmFtZSBpcyBzdGlsbCBnb2luZyxcbiAgICAvLyB3ZSdsbCBqdXN0IHdhaXQgdW50aWwgdGhlIG5leHQgZnJhbWUuIElkZWFsbHkgcmVuZGVycyBzaG91bGRcbiAgICAvLyBub3QgdGFrZSBvdmVyIDE2bXMgdG8gc3RheSB3aXRoaW4gYSBzaW5nbGUgZnJhbWUsIGJ1dCB0aGlzIHNob3VsZFxuICAgIC8vIGNhdGNoIGl0IGlmIGl0IGRvZXMuXG4gICAgaWYgKGlzUmVuZGVyaW5nKSB7XG4gICAgICBmcmFtZUlkID0gcmFmKHJlbmRlcilcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSB7XG4gICAgICBpc1JlbmRlcmluZyA9IHRydWVcbiAgICB9XG5cbiAgICAvLyAxLiBJZiB0aGVyZSBpc24ndCBhIG5hdGl2ZSBlbGVtZW50IHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtb3VudGVkIGVsZW1lbnRcbiAgICAvLyB0aGVuIHdlIG5lZWQgdG8gY3JlYXRlIGl0IGZyb20gc2NyYXRjaC5cbiAgICAvLyAyLiBJZiBhIG5ldyBlbGVtZW50IGhhcyBiZWVuIG1vdW50ZWQsIHdlIHNob3VsZCBkaWZmIHRoZW0uXG4gICAgLy8gMy4gV2Ugc2hvdWxkIHVwZGF0ZSBjaGVjayBhbGwgY2hpbGQgY29tcG9uZW50cyBmb3IgY2hhbmdlcy5cbiAgICBpZiAoIWN1cnJlbnROYXRpdmVFbGVtZW50KSB7XG4gICAgICBjdXJyZW50RWxlbWVudCA9IGFwcC5lbGVtZW50XG4gICAgICBjdXJyZW50TmF0aXZlRWxlbWVudCA9IHRvTmF0aXZlKHJvb3RJZCwgJzAnLCBjdXJyZW50RWxlbWVudClcbiAgICAgIGlmIChjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zb2xlLmluZm8oJ2Rla3U6IFRoZSBjb250YWluZXIgZWxlbWVudCBpcyBub3QgZW1wdHkuIFRoZXNlIGVsZW1lbnRzIHdpbGwgYmUgcmVtb3ZlZC4gUmVhZCBtb3JlOiBodHRwOi8vY2wubHkvYjBTcicpXG4gICAgICB9XG4gICAgICBpZiAoY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIGNvbnNvbGUud2FybignZGVrdTogVXNpbmcgZG9jdW1lbnQuYm9keSBpcyBhbGxvd2VkIGJ1dCBpdCBjYW4gY2F1c2Ugc29tZSBpc3N1ZXMuIFJlYWQgbW9yZTogaHR0cDovL2NsLmx5L2IwU0MnKVxuICAgICAgfVxuICAgICAgcmVtb3ZlQWxsQ2hpbGRyZW4oY29udGFpbmVyKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjdXJyZW50TmF0aXZlRWxlbWVudClcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRFbGVtZW50ICE9PSBhcHAuZWxlbWVudCkge1xuICAgICAgY3VycmVudE5hdGl2ZUVsZW1lbnQgPSBwYXRjaChyb290SWQsIGN1cnJlbnRFbGVtZW50LCBhcHAuZWxlbWVudCwgY3VycmVudE5hdGl2ZUVsZW1lbnQpXG4gICAgICBjdXJyZW50RWxlbWVudCA9IGFwcC5lbGVtZW50XG4gICAgICB1cGRhdGVDaGlsZHJlbihyb290SWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZUNoaWxkcmVuKHJvb3RJZClcbiAgICB9XG5cbiAgICAvLyBDYWxsIG1vdW50IGV2ZW50cyBvbiBhbGwgbmV3IGVudGl0aWVzXG4gICAgZmx1c2hNb3VudFF1ZXVlKClcblxuICAgIC8vIEFsbG93IHJlbmRlcmluZyBhZ2Fpbi5cbiAgICBpc1JlbmRlcmluZyA9IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICogQ2FsbCBob29rcyBmb3IgYWxsIG5ldyBlbnRpdGllcyB0aGF0IGhhdmUgYmVlbiBjcmVhdGVkIGluXG4gICAqIHRoZSBsYXN0IHJlbmRlciBmcm9tIHRoZSBib3R0b20gdXAuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZsdXNoTW91bnRRdWV1ZSAoKSB7XG4gICAgdmFyIGVudGl0eUlkXG4gICAgd2hpbGUgKGVudGl0eUlkID0gbW91bnRRdWV1ZS5wb3AoKSkge1xuICAgICAgdmFyIGVudGl0eSA9IGVudGl0aWVzW2VudGl0eUlkXVxuICAgICAgdHJpZ2dlcignYWZ0ZXJSZW5kZXInLCBlbnRpdHksIFtlbnRpdHkuY29udGV4dCwgZW50aXR5Lm5hdGl2ZUVsZW1lbnRdKVxuICAgICAgdHJpZ2dlclVwZGF0ZSgnYWZ0ZXJNb3VudCcsIGVudGl0eSwgW2VudGl0eS5jb250ZXh0LCBlbnRpdHkubmF0aXZlRWxlbWVudCwgc2V0U3RhdGUoZW50aXR5KV0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjdXJyZW50IHNjaGVkdWxlZCBmcmFtZVxuICAgKi9cblxuICBmdW5jdGlvbiBjbGVhckZyYW1lICgpIHtcbiAgICBpZiAoIWZyYW1lSWQpIHJldHVyblxuICAgIHJhZi5jYW5jZWwoZnJhbWVJZClcbiAgICBmcmFtZUlkID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIGNvbXBvbmVudC5cbiAgICpcbiAgICogVGhlIGVudGl0eSBpcyBqdXN0IHRoZSBkYXRhIG9iamVjdCBmb3IgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCBDb21wb25lbnQgaW5zdGFuY2UgaWQuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZUVudGl0eSAoZW50aXR5SWQpIHtcbiAgICB2YXIgZW50aXR5ID0gZW50aXRpZXNbZW50aXR5SWRdXG4gICAgc2V0U291cmNlcyhlbnRpdHkpXG5cbiAgICBpZiAoIXNob3VsZFVwZGF0ZShlbnRpdHkpKSByZXR1cm4gdXBkYXRlQ2hpbGRyZW4oZW50aXR5SWQpXG5cbiAgICB2YXIgY3VycmVudFRyZWUgPSBlbnRpdHkudmlydHVhbEVsZW1lbnRcbiAgICB2YXIgbmV4dFByb3BzID0gZW50aXR5LnBlbmRpbmdQcm9wc1xuICAgIHZhciBuZXh0U3RhdGUgPSBlbnRpdHkucGVuZGluZ1N0YXRlXG4gICAgdmFyIHByZXZpb3VzU3RhdGUgPSBlbnRpdHkuY29udGV4dC5zdGF0ZVxuICAgIHZhciBwcmV2aW91c1Byb3BzID0gZW50aXR5LmNvbnRleHQucHJvcHNcblxuICAgIC8vIGhvb2sgYmVmb3JlIHJlbmRlcmluZy4gY291bGQgbW9kaWZ5IHN0YXRlIGp1c3QgYmVmb3JlIHRoZSByZW5kZXIgb2NjdXJzLlxuICAgIHRyaWdnZXIoJ2JlZm9yZVVwZGF0ZScsIGVudGl0eSwgW2VudGl0eS5jb250ZXh0LCBuZXh0UHJvcHMsIG5leHRTdGF0ZV0pXG4gICAgdHJpZ2dlcignYmVmb3JlUmVuZGVyJywgZW50aXR5LCBbZW50aXR5LmNvbnRleHRdKVxuXG4gICAgLy8gY29tbWl0IHN0YXRlIGFuZCBwcm9wcy5cbiAgICBjb21taXQoZW50aXR5KVxuXG4gICAgLy8gcmUtcmVuZGVyLlxuICAgIHZhciBuZXh0VHJlZSA9IHJlbmRlckVudGl0eShlbnRpdHkpXG5cbiAgICAvLyBpZiB0aGUgdHJlZSBpcyB0aGUgc2FtZSB3ZSBjYW4ganVzdCBza2lwIHRoaXMgY29tcG9uZW50XG4gICAgLy8gYnV0IHdlIHNob3VsZCBzdGlsbCBjaGVjayB0aGUgY2hpbGRyZW4gdG8gc2VlIGlmIHRoZXkncmUgZGlydHkuXG4gICAgLy8gVGhpcyBhbGxvd3MgdXMgdG8gbWVtb2l6ZSB0aGUgcmVuZGVyIGZ1bmN0aW9uIG9mIGNvbXBvbmVudHMuXG4gICAgaWYgKG5leHRUcmVlID09PSBjdXJyZW50VHJlZSkgcmV0dXJuIHVwZGF0ZUNoaWxkcmVuKGVudGl0eUlkKVxuXG4gICAgLy8gYXBwbHkgbmV3IHZpcnR1YWwgdHJlZSB0byBuYXRpdmUgZG9tLlxuICAgIGVudGl0eS5uYXRpdmVFbGVtZW50ID0gcGF0Y2goZW50aXR5SWQsIGN1cnJlbnRUcmVlLCBuZXh0VHJlZSwgZW50aXR5Lm5hdGl2ZUVsZW1lbnQpXG4gICAgZW50aXR5LnZpcnR1YWxFbGVtZW50ID0gbmV4dFRyZWVcbiAgICB1cGRhdGVDaGlsZHJlbihlbnRpdHlJZClcblxuICAgIC8vIHRyaWdnZXIgcmVuZGVyIGhvb2tcbiAgICB0cmlnZ2VyKCdhZnRlclJlbmRlcicsIGVudGl0eSwgW2VudGl0eS5jb250ZXh0LCBlbnRpdHkubmF0aXZlRWxlbWVudF0pXG5cbiAgICAvLyB0cmlnZ2VyIGFmdGVyVXBkYXRlIGFmdGVyIGFsbCBjaGlsZHJlbiBoYXZlIHVwZGF0ZWQuXG4gICAgdHJpZ2dlclVwZGF0ZSgnYWZ0ZXJVcGRhdGUnLCBlbnRpdHksIFtlbnRpdHkuY29udGV4dCwgcHJldmlvdXNQcm9wcywgcHJldmlvdXNTdGF0ZV0pXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFsbCB0aGUgY2hpbGRyZW4gb2YgYW4gZW50aXR5LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgQ29tcG9uZW50IGluc3RhbmNlIGlkLlxuICAgKi9cblxuICBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbiAoZW50aXR5SWQpIHtcbiAgICBmb3JFYWNoKGNoaWxkcmVuW2VudGl0eUlkXSwgZnVuY3Rpb24gKGNoaWxkSWQpIHtcbiAgICAgIHVwZGF0ZUVudGl0eShjaGlsZElkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBvZiB0aGUgY2hpbGQgZW50aXRpZXMgb2YgYW4gZW50aXR5XG4gICAqXG4gICAqIEBwYXJhbSB7RW50aXR5fSBlbnRpdHlcbiAgICovXG5cbiAgZnVuY3Rpb24gdW5tb3VudENoaWxkcmVuIChlbnRpdHlJZCkge1xuICAgIGZvckVhY2goY2hpbGRyZW5bZW50aXR5SWRdLCBmdW5jdGlvbiAoY2hpbGRJZCkge1xuICAgICAgdW5tb3VudEVudGl0eShjaGlsZElkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSByb290IGVsZW1lbnQuIElmIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgd2UgbmVlZCB0b1xuICAgKiBjYW5jZWwgYW55IHBlbmRpbmcgZnV0dXJlIHVwZGF0ZXMuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZU5hdGl2ZUVsZW1lbnQgKCkge1xuICAgIGNsZWFyRnJhbWUoKVxuICAgIHJlbW92ZUVsZW1lbnQocm9vdElkLCAnMCcsIGN1cnJlbnROYXRpdmVFbGVtZW50KVxuICAgIGN1cnJlbnROYXRpdmVFbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5hdGl2ZSBlbGVtZW50IGZyb20gYSB2aXJ0dWFsIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRpdHlJZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAcGFyYW0ge09iamVjdH0gdm5vZGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTERvY3VtZW50RnJhZ21lbnR9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRvTmF0aXZlIChlbnRpdHlJZCwgcGF0aCwgdm5vZGUpIHtcbiAgICBzd2l0Y2ggKHZub2RlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3RleHQnOiByZXR1cm4gdG9OYXRpdmVUZXh0KHZub2RlKVxuICAgICAgY2FzZSAnZWxlbWVudCc6IHJldHVybiB0b05hdGl2ZUVsZW1lbnQoZW50aXR5SWQsIHBhdGgsIHZub2RlKVxuICAgICAgY2FzZSAnY29tcG9uZW50JzogcmV0dXJuIHRvTmF0aXZlQ29tcG9uZW50KGVudGl0eUlkLCBwYXRoLCB2bm9kZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmF0aXZlIHRleHQgZWxlbWVudCBmcm9tIGEgdmlydHVhbCBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdm5vZGVcbiAgICovXG5cbiAgZnVuY3Rpb24gdG9OYXRpdmVUZXh0ICh2bm9kZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2bm9kZS5kYXRhKVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5hdGl2ZSBlbGVtZW50IGZyb20gYSB2aXJ0dWFsIGVsZW1lbnQuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRvTmF0aXZlRWxlbWVudCAoZW50aXR5SWQsIHBhdGgsIHZub2RlKSB7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSB2bm9kZS5hdHRyaWJ1dGVzXG4gICAgdmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cbiAgICB2YXIgdGFnTmFtZSA9IHZub2RlLnRhZ05hbWVcbiAgICB2YXIgZWxcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50IGVpdGhlciBmcm9tIHBvb2wgb3IgZnJlc2guXG4gICAgaWYgKCFvcHRpb25zLnBvb2xpbmcgfHwgIWNhblBvb2wodGFnTmFtZSkpIHtcbiAgICAgIGlmIChzdmcuaXNFbGVtZW50KHRhZ05hbWUpKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Zy5uYW1lc3BhY2UsIHRhZ05hbWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBvb2wgPSBnZXRQb29sKHRhZ05hbWUpXG4gICAgICBlbCA9IGNsZWFudXAocG9vbC5wb3AoKSlcbiAgICAgIGlmIChlbC5wYXJlbnROb2RlKSBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKVxuICAgIH1cblxuICAgIC8vIHNldCBhdHRyaWJ1dGVzLlxuICAgIGZvckVhY2goYXR0cmlidXRlcywgZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7XG4gICAgICBzZXRBdHRyaWJ1dGUoZW50aXR5SWQsIHBhdGgsIGVsLCBuYW1lLCB2YWx1ZSlcbiAgICB9KVxuXG4gICAgLy8gc3RvcmUga2V5cyBvbiB0aGUgbmF0aXZlIGVsZW1lbnQgZm9yIGZhc3QgZXZlbnQgaGFuZGxpbmcuXG4gICAgZWwuX19lbnRpdHlfXyA9IGVudGl0eUlkXG4gICAgZWwuX19wYXRoX18gPSBwYXRoXG5cbiAgICAvLyBhZGQgY2hpbGRyZW4uXG4gICAgZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkLCBpKSB7XG4gICAgICB2YXIgY2hpbGRFbCA9IHRvTmF0aXZlKGVudGl0eUlkLCBwYXRoICsgJy4nICsgaSwgY2hpbGQpXG4gICAgICBpZiAoIWNoaWxkRWwucGFyZW50Tm9kZSkgZWwuYXBwZW5kQ2hpbGQoY2hpbGRFbClcbiAgICB9KVxuXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmF0aXZlIGVsZW1lbnQgZnJvbSBhIGNvbXBvbmVudC5cbiAgICovXG5cbiAgZnVuY3Rpb24gdG9OYXRpdmVDb21wb25lbnQgKGVudGl0eUlkLCBwYXRoLCB2bm9kZSkge1xuICAgIHZhciBjaGlsZCA9IG5ldyBFbnRpdHkodm5vZGUuY29tcG9uZW50LCB2bm9kZS5wcm9wcywgZW50aXR5SWQpXG4gICAgY2hpbGRyZW5bZW50aXR5SWRdW3BhdGhdID0gY2hpbGQuaWRcbiAgICByZXR1cm4gbW91bnRFbnRpdHkoY2hpbGQpXG4gIH1cblxuICAvKipcbiAgICogUGF0Y2ggYW4gZWxlbWVudCB3aXRoIHRoZSBkaWZmIGZyb20gdHdvIHRyZWVzLlxuICAgKi9cblxuICBmdW5jdGlvbiBwYXRjaCAoZW50aXR5SWQsIHByZXYsIG5leHQsIGVsKSB7XG4gICAgcmV0dXJuIGRpZmZOb2RlKCcwJywgZW50aXR5SWQsIHByZXYsIG5leHQsIGVsKVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGRpZmYgYmV0d2VlbiB0d28gdHJlZXMgb2Ygbm9kZXMuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRpZmZOb2RlIChwYXRoLCBlbnRpdHlJZCwgcHJldiwgbmV4dCwgZWwpIHtcbiAgICAvLyBUeXBlIGNoYW5nZWQuIFRoaXMgY291bGQgYmUgZnJvbSBlbGVtZW50LT50ZXh0LCB0ZXh0LT5Db21wb25lbnRBLFxuICAgIC8vIENvbXBvbmVudEEtPkNvbXBvbmVudEIgZXRjLiBCdXQgTk9UIGRpdi0+c3Bhbi4gVGhlc2UgYXJlIHRoZSBzYW1lIHR5cGVcbiAgICAvLyAoRWxlbWVudE5vZGUpIGJ1dCBkaWZmZXJlbnQgdGFnIG5hbWUuXG4gICAgaWYgKHByZXYudHlwZSAhPT0gbmV4dC50eXBlKSByZXR1cm4gcmVwbGFjZUVsZW1lbnQoZW50aXR5SWQsIHBhdGgsIGVsLCBuZXh0KVxuXG4gICAgc3dpdGNoIChuZXh0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ3RleHQnOiByZXR1cm4gZGlmZlRleHQocHJldiwgbmV4dCwgZWwpXG4gICAgICBjYXNlICdlbGVtZW50JzogcmV0dXJuIGRpZmZFbGVtZW50KHBhdGgsIGVudGl0eUlkLCBwcmV2LCBuZXh0LCBlbClcbiAgICAgIGNhc2UgJ2NvbXBvbmVudCc6IHJldHVybiBkaWZmQ29tcG9uZW50KHBhdGgsIGVudGl0eUlkLCBwcmV2LCBuZXh0LCBlbClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlmZiB0d28gdGV4dCBub2RlcyBhbmQgdXBkYXRlIHRoZSBlbGVtZW50LlxuICAgKi9cblxuICBmdW5jdGlvbiBkaWZmVGV4dCAocHJldmlvdXMsIGN1cnJlbnQsIGVsKSB7XG4gICAgaWYgKGN1cnJlbnQuZGF0YSAhPT0gcHJldmlvdXMuZGF0YSkgZWwuZGF0YSA9IGN1cnJlbnQuZGF0YVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIERpZmYgdGhlIGNoaWxkcmVuIG9mIGFuIEVsZW1lbnROb2RlLlxuICAgKi9cblxuICBmdW5jdGlvbiBkaWZmQ2hpbGRyZW4gKHBhdGgsIGVudGl0eUlkLCBwcmV2LCBuZXh0LCBlbCkge1xuICAgIHZhciBwb3NpdGlvbnMgPSBbXVxuICAgIHZhciBoYXNLZXlzID0gZmFsc2VcbiAgICB2YXIgY2hpbGROb2RlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShlbC5jaGlsZE5vZGVzKVxuICAgIHZhciBsZWZ0S2V5cyA9IHJlZHVjZShwcmV2LmNoaWxkcmVuLCBrZXlNYXBSZWR1Y2VyLCB7fSlcbiAgICB2YXIgcmlnaHRLZXlzID0gcmVkdWNlKG5leHQuY2hpbGRyZW4sIGtleU1hcFJlZHVjZXIsIHt9KVxuICAgIHZhciBjdXJyZW50Q2hpbGRyZW4gPSBhc3NpZ24oe30sIGNoaWxkcmVuW2VudGl0eUlkXSlcblxuICAgIGZ1bmN0aW9uIGtleU1hcFJlZHVjZXIgKGFjYywgY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5rZXkgIT0gbnVsbCkge1xuICAgICAgICBhY2NbY2hpbGQua2V5XSA9IGNoaWxkXG4gICAgICAgIGhhc0tleXMgPSB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjXG4gICAgfVxuXG4gICAgLy8gRGlmZiBhbGwgb2YgdGhlIG5vZGVzIHRoYXQgaGF2ZSBrZXlzLiBUaGlzIGxldHMgdXMgcmUtdXNlZCBlbGVtZW50c1xuICAgIC8vIGluc3RlYWQgb2Ygb3ZlcnJpZGluZyB0aGVtIGFuZCBsZXRzIHVzIG1vdmUgdGhlbSBhcm91bmQuXG4gICAgaWYgKGhhc0tleXMpIHtcblxuICAgICAgLy8gUmVtb3ZhbHNcbiAgICAgIGZvckVhY2gobGVmdEtleXMsIGZ1bmN0aW9uIChsZWZ0Tm9kZSwga2V5KSB7XG4gICAgICAgIGlmIChyaWdodEtleXNba2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgdmFyIGxlZnRQYXRoID0gcGF0aCArICcuJyArIGxlZnROb2RlLmluZGV4XG4gICAgICAgICAgcmVtb3ZlRWxlbWVudChcbiAgICAgICAgICAgIGVudGl0eUlkLFxuICAgICAgICAgICAgbGVmdFBhdGgsXG4gICAgICAgICAgICBjaGlsZE5vZGVzW2xlZnROb2RlLmluZGV4XVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gVXBkYXRlIG5vZGVzXG4gICAgICBmb3JFYWNoKHJpZ2h0S2V5cywgZnVuY3Rpb24gKHJpZ2h0Tm9kZSwga2V5KSB7XG4gICAgICAgIHZhciBsZWZ0Tm9kZSA9IGxlZnRLZXlzW2tleV1cblxuICAgICAgICAvLyBXZSBvbmx5IHdhbnQgdXBkYXRlcyBmb3Igbm93XG4gICAgICAgIGlmIChsZWZ0Tm9kZSA9PSBudWxsKSByZXR1cm5cblxuICAgICAgICB2YXIgbGVmdFBhdGggPSBwYXRoICsgJy4nICsgbGVmdE5vZGUuaW5kZXhcblxuICAgICAgICAvLyBVcGRhdGVkXG4gICAgICAgIHBvc2l0aW9uc1tyaWdodE5vZGUuaW5kZXhdID0gZGlmZk5vZGUoXG4gICAgICAgICAgbGVmdFBhdGgsXG4gICAgICAgICAgZW50aXR5SWQsXG4gICAgICAgICAgbGVmdE5vZGUsXG4gICAgICAgICAgcmlnaHROb2RlLFxuICAgICAgICAgIGNoaWxkTm9kZXNbbGVmdE5vZGUuaW5kZXhdXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb25zIG9mIGFsbCBjaGlsZCBjb21wb25lbnRzIGFuZCBldmVudCBoYW5kbGVyc1xuICAgICAgZm9yRWFjaChyaWdodEtleXMsIGZ1bmN0aW9uIChyaWdodE5vZGUsIGtleSkge1xuICAgICAgICB2YXIgbGVmdE5vZGUgPSBsZWZ0S2V5c1trZXldXG5cbiAgICAgICAgLy8gV2UganVzdCB3YW50IGVsZW1lbnRzIHRoYXQgaGF2ZSBtb3ZlZCBhcm91bmRcbiAgICAgICAgaWYgKGxlZnROb2RlID09IG51bGwgfHwgbGVmdE5vZGUuaW5kZXggPT09IHJpZ2h0Tm9kZS5pbmRleCkgcmV0dXJuXG5cbiAgICAgICAgdmFyIHJpZ2h0UGF0aCA9IHBhdGggKyAnLicgKyByaWdodE5vZGUuaW5kZXhcbiAgICAgICAgdmFyIGxlZnRQYXRoID0gcGF0aCArICcuJyArIGxlZnROb2RlLmluZGV4XG5cbiAgICAgICAgLy8gVXBkYXRlIGFsbCB0aGUgY2hpbGQgY29tcG9uZW50IHBhdGggcG9zaXRpb25zIHRvIG1hdGNoXG4gICAgICAgIC8vIHRoZSBsYXRlc3QgcG9zaXRpb25zIGlmIHRoZXkndmUgY2hhbmdlZC4gVGhpcyBpcyBhIGJpdCBoYWNreS5cbiAgICAgICAgZm9yRWFjaChjdXJyZW50Q2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZElkLCBjaGlsZFBhdGgpIHtcbiAgICAgICAgICBpZiAobGVmdFBhdGggPT09IGNoaWxkUGF0aCkge1xuICAgICAgICAgICAgZGVsZXRlIGNoaWxkcmVuW2VudGl0eUlkXVtjaGlsZFBhdGhdXG4gICAgICAgICAgICBjaGlsZHJlbltlbnRpdHlJZF1bcmlnaHRQYXRoXSA9IGNoaWxkSWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICAvLyBOb3cgYWRkIGFsbCBvZiB0aGUgbmV3IG5vZGVzIGxhc3QgaW4gY2FzZSB0aGVpciBwYXRoXG4gICAgICAvLyB3b3VsZCBoYXZlIGNvbmZsaWN0ZWQgd2l0aCBvbmUgb2YgdGhlIHByZXZpb3VzIHBhdGhzLlxuICAgICAgZm9yRWFjaChyaWdodEtleXMsIGZ1bmN0aW9uIChyaWdodE5vZGUsIGtleSkge1xuICAgICAgICB2YXIgcmlnaHRQYXRoID0gcGF0aCArICcuJyArIHJpZ2h0Tm9kZS5pbmRleFxuICAgICAgICBpZiAobGVmdEtleXNba2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgcG9zaXRpb25zW3JpZ2h0Tm9kZS5pbmRleF0gPSB0b05hdGl2ZShcbiAgICAgICAgICAgIGVudGl0eUlkLFxuICAgICAgICAgICAgcmlnaHRQYXRoLFxuICAgICAgICAgICAgcmlnaHROb2RlXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXhMZW5ndGggPSBNYXRoLm1heChwcmV2LmNoaWxkcmVuLmxlbmd0aCwgbmV4dC5jaGlsZHJlbi5sZW5ndGgpXG5cbiAgICAgIC8vIE5vdyBkaWZmIGFsbCBvZiB0aGUgbm9kZXMgdGhhdCBkb24ndCBoYXZlIGtleXNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGxlZnROb2RlID0gcHJldi5jaGlsZHJlbltpXVxuICAgICAgICB2YXIgcmlnaHROb2RlID0gbmV4dC5jaGlsZHJlbltpXVxuXG4gICAgICAgIC8vIFJlbW92YWxzXG4gICAgICAgIGlmIChyaWdodE5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgIHJlbW92ZUVsZW1lbnQoXG4gICAgICAgICAgICBlbnRpdHlJZCxcbiAgICAgICAgICAgIHBhdGggKyAnLicgKyBsZWZ0Tm9kZS5pbmRleCxcbiAgICAgICAgICAgIGNoaWxkTm9kZXNbbGVmdE5vZGUuaW5kZXhdXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTmV3IE5vZGVcbiAgICAgICAgaWYgKGxlZnROb2RlID09IG51bGwpIHtcbiAgICAgICAgICBwb3NpdGlvbnNbcmlnaHROb2RlLmluZGV4XSA9IHRvTmF0aXZlKFxuICAgICAgICAgICAgZW50aXR5SWQsXG4gICAgICAgICAgICBwYXRoICsgJy4nICsgcmlnaHROb2RlLmluZGV4LFxuICAgICAgICAgICAgcmlnaHROb2RlXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlZFxuICAgICAgICBpZiAobGVmdE5vZGUgJiYgcmlnaHROb2RlKSB7XG4gICAgICAgICAgcG9zaXRpb25zW2xlZnROb2RlLmluZGV4XSA9IGRpZmZOb2RlKFxuICAgICAgICAgICAgcGF0aCArICcuJyArIGxlZnROb2RlLmluZGV4LFxuICAgICAgICAgICAgZW50aXR5SWQsXG4gICAgICAgICAgICBsZWZ0Tm9kZSxcbiAgICAgICAgICAgIHJpZ2h0Tm9kZSxcbiAgICAgICAgICAgIGNoaWxkTm9kZXNbbGVmdE5vZGUuaW5kZXhdXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVwb3NpdGlvbiBhbGwgdGhlIGVsZW1lbnRzXG4gICAgZm9yRWFjaChwb3NpdGlvbnMsIGZ1bmN0aW9uIChjaGlsZEVsLCBuZXdQb3NpdGlvbikge1xuICAgICAgdmFyIHRhcmdldCA9IGVsLmNoaWxkTm9kZXNbbmV3UG9zaXRpb25dXG4gICAgICBpZiAoY2hpbGRFbCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICBlbC5pbnNlcnRCZWZvcmUoY2hpbGRFbCwgdGFyZ2V0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGNoaWxkRWwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIERpZmYgdGhlIGF0dHJpYnV0ZXMgYW5kIGFkZC9yZW1vdmUgdGhlbS5cbiAgICovXG5cbiAgZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMgKHByZXYsIG5leHQsIGVsLCBlbnRpdHlJZCwgcGF0aCkge1xuICAgIHZhciBuZXh0QXR0cnMgPSBuZXh0LmF0dHJpYnV0ZXNcbiAgICB2YXIgcHJldkF0dHJzID0gcHJldi5hdHRyaWJ1dGVzXG5cbiAgICAvLyBhZGQgbmV3IGF0dHJzXG4gICAgZm9yRWFjaChuZXh0QXR0cnMsIGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xuICAgICAgaWYgKGV2ZW50c1tuYW1lXSB8fCAhKG5hbWUgaW4gcHJldkF0dHJzKSB8fCBwcmV2QXR0cnNbbmFtZV0gIT09IHZhbHVlKSB7XG4gICAgICAgIHNldEF0dHJpYnV0ZShlbnRpdHlJZCwgcGF0aCwgZWwsIG5hbWUsIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyByZW1vdmUgb2xkIGF0dHJzXG4gICAgZm9yRWFjaChwcmV2QXR0cnMsIGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBuZXh0QXR0cnMpKSB7XG4gICAgICAgIHJlbW92ZUF0dHJpYnV0ZShlbnRpdHlJZCwgcGF0aCwgZWwsIG5hbWUpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBjb21wb25lbnQgd2l0aCB0aGUgcHJvcHMgZnJvbSB0aGUgbmV4dCBub2RlLiBJZlxuICAgKiB0aGUgY29tcG9uZW50IHR5cGUgaGFzIGNoYW5nZWQsIHdlJ2xsIGp1c3QgcmVtb3ZlIHRoZSBvbGQgb25lXG4gICAqIGFuZCByZXBsYWNlIGl0IHdpdGggdGhlIG5ldyBjb21wb25lbnQuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRpZmZDb21wb25lbnQgKHBhdGgsIGVudGl0eUlkLCBwcmV2LCBuZXh0LCBlbCkge1xuICAgIGlmIChuZXh0LmNvbXBvbmVudCAhPT0gcHJldi5jb21wb25lbnQpIHtcbiAgICAgIHJldHVybiByZXBsYWNlRWxlbWVudChlbnRpdHlJZCwgcGF0aCwgZWwsIG5leHQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0YXJnZXRJZCA9IGNoaWxkcmVuW2VudGl0eUlkXVtwYXRoXVxuXG4gICAgICAvLyBUaGlzIGlzIGEgaGFjayBmb3Igbm93XG4gICAgICBpZiAodGFyZ2V0SWQpIHtcbiAgICAgICAgdXBkYXRlRW50aXR5UHJvcHModGFyZ2V0SWQsIG5leHQucHJvcHMpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaWZmIHR3byBlbGVtZW50IG5vZGVzLlxuICAgKi9cblxuICBmdW5jdGlvbiBkaWZmRWxlbWVudCAocGF0aCwgZW50aXR5SWQsIHByZXYsIG5leHQsIGVsKSB7XG4gICAgaWYgKG5leHQudGFnTmFtZSAhPT0gcHJldi50YWdOYW1lKSByZXR1cm4gcmVwbGFjZUVsZW1lbnQoZW50aXR5SWQsIHBhdGgsIGVsLCBuZXh0KVxuICAgIGRpZmZBdHRyaWJ1dGVzKHByZXYsIG5leHQsIGVsLCBlbnRpdHlJZCwgcGF0aClcbiAgICBkaWZmQ2hpbGRyZW4ocGF0aCwgZW50aXR5SWQsIHByZXYsIG5leHQsIGVsKVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZWxlbWVudCBmcm9tIHRoZSBET00gYW5kIHVubW91bnRzIGFuZCBjb21wb25lbnRzXG4gICAqIHRoYXQgYXJlIHdpdGhpbiB0aGF0IGJyYW5jaFxuICAgKlxuICAgKiBzaWRlIGVmZmVjdHM6XG4gICAqICAgLSByZW1vdmVzIGVsZW1lbnQgZnJvbSB0aGUgRE9NXG4gICAqICAgLSByZW1vdmVzIGludGVybmFsIHJlZmVyZW5jZXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVudGl0eUlkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQgKGVudGl0eUlkLCBwYXRoLCBlbCkge1xuICAgIHZhciBjaGlsZHJlbkJ5UGF0aCA9IGNoaWxkcmVuW2VudGl0eUlkXVxuICAgIHZhciBjaGlsZElkID0gY2hpbGRyZW5CeVBhdGhbcGF0aF1cbiAgICB2YXIgZW50aXR5SGFuZGxlcnMgPSBoYW5kbGVyc1tlbnRpdHlJZF0gfHwge31cbiAgICB2YXIgcmVtb3ZhbHMgPSBbXVxuXG4gICAgLy8gSWYgdGhlIHBhdGggcG9pbnRzIHRvIGEgY29tcG9uZW50IHdlIHNob3VsZCB1c2UgdGhhdFxuICAgIC8vIGNvbXBvbmVudHMgZWxlbWVudCBpbnN0ZWFkLCBiZWNhdXNlIGl0IG1pZ2h0IGhhdmUgbW92ZWQgaXQuXG4gICAgaWYgKGNoaWxkSWQpIHtcbiAgICAgIHZhciBjaGlsZCA9IGVudGl0aWVzW2NoaWxkSWRdXG4gICAgICBlbCA9IGNoaWxkLm5hdGl2ZUVsZW1lbnRcbiAgICAgIHVubW91bnRFbnRpdHkoY2hpbGRJZClcbiAgICAgIHJlbW92YWxzLnB1c2gocGF0aClcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBKdXN0IHJlbW92ZSB0aGUgdGV4dCBub2RlXG4gICAgICBpZiAoIWlzRWxlbWVudChlbCkpIHJldHVybiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKVxuXG4gICAgICAvLyBUaGVuIHdlIG5lZWQgdG8gZmluZCBhbnkgY29tcG9uZW50cyB3aXRoaW4gdGhpc1xuICAgICAgLy8gYnJhbmNoIGFuZCB1bm1vdW50IHRoZW0uXG4gICAgICBmb3JFYWNoKGNoaWxkcmVuQnlQYXRoLCBmdW5jdGlvbiAoY2hpbGRJZCwgY2hpbGRQYXRoKSB7XG4gICAgICAgIGlmIChjaGlsZFBhdGggPT09IHBhdGggfHwgaXNXaXRoaW5QYXRoKHBhdGgsIGNoaWxkUGF0aCkpIHtcbiAgICAgICAgICB1bm1vdW50RW50aXR5KGNoaWxkSWQpXG4gICAgICAgICAgcmVtb3ZhbHMucHVzaChjaGlsZFBhdGgpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnRzIGF0IHRoaXMgcGF0aCBvciBiZWxvdyBpdFxuICAgICAgZm9yRWFjaChlbnRpdHlIYW5kbGVycywgZnVuY3Rpb24gKGZuLCBoYW5kbGVyUGF0aCkge1xuICAgICAgICBpZiAoaGFuZGxlclBhdGggPT09IHBhdGggfHwgaXNXaXRoaW5QYXRoKHBhdGgsIGhhbmRsZXJQYXRoKSkge1xuICAgICAgICAgIHJlbW92ZUV2ZW50KGVudGl0eUlkLCBoYW5kbGVyUGF0aClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIHBhdGhzIGZyb20gdGhlIG9iamVjdCB3aXRob3V0IHRvdWNoaW5nIHRoZVxuICAgIC8vIG9sZCBvYmplY3QuIFRoaXMga2VlcHMgdGhlIG9iamVjdCB1c2luZyBmYXN0IHByb3BlcnRpZXMuXG4gICAgZm9yRWFjaChyZW1vdmFscywgZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgIGRlbGV0ZSBjaGlsZHJlbltlbnRpdHlJZF1bcGF0aF1cbiAgICB9KVxuXG4gICAgLy8gUmVtb3ZlIGl0IGZyb20gdGhlIERPTVxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpXG5cbiAgICAvLyBSZXR1cm4gYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIG5vZGUgdHJlZSB0byB0aGUgcG9vbFxuICAgIC8vIHNvIHRoYXQgdGhlIGVsZW1lbnRzIGNhbiBiZSByZS11c2VkLlxuICAgIGlmIChvcHRpb25zLnBvb2xpbmcpIHtcbiAgICAgIHdhbGsoZWwsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmICghaXNFbGVtZW50KG5vZGUpIHx8ICFjYW5Qb29sKG5vZGUudGFnTmFtZSkpIHJldHVyblxuICAgICAgICBnZXRQb29sKG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpKS5wdXNoKG5vZGUpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGFuIGVsZW1lbnQgaW4gdGhlIERPTS4gUmVtb3ZpbmcgYWxsIGNvbXBvbmVudHNcbiAgICogd2l0aGluIHRoYXQgZWxlbWVudCBhbmQgcmUtcmVuZGVyaW5nIHRoZSBuZXcgdmlydHVhbCBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge0VudGl0eX0gZW50aXR5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2bm9kZVxuICAgKlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblxuICBmdW5jdGlvbiByZXBsYWNlRWxlbWVudCAoZW50aXR5SWQsIHBhdGgsIGVsLCB2bm9kZSkge1xuICAgIHZhciBwYXJlbnQgPSBlbC5wYXJlbnROb2RlXG4gICAgdmFyIGluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChwYXJlbnQuY2hpbGROb2RlcywgZWwpXG5cbiAgICAvLyByZW1vdmUgdGhlIHByZXZpb3VzIGVsZW1lbnQgYW5kIGFsbCBuZXN0ZWQgY29tcG9uZW50cy4gVGhpc1xuICAgIC8vIG5lZWRzIHRvIGhhcHBlbiBiZWZvcmUgd2UgY3JlYXRlIHRoZSBuZXcgZWxlbWVudCBzbyB3ZSBkb24ndFxuICAgIC8vIGdldCBjbGFzaGVzIG9uIHRoZSBjb21wb25lbnQgcGF0aHMuXG4gICAgcmVtb3ZlRWxlbWVudChlbnRpdHlJZCwgcGF0aCwgZWwpXG5cbiAgICAvLyB0aGVuIGFkZCB0aGUgbmV3IGVsZW1lbnQgaW4gdGhlcmVcbiAgICB2YXIgbmV3RWwgPSB0b05hdGl2ZShlbnRpdHlJZCwgcGF0aCwgdm5vZGUpXG4gICAgdmFyIHRhcmdldCA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XVxuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdFbCwgdGFyZ2V0KVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3RWwpXG4gICAgfVxuXG4gICAgLy8gd2FsayB1cCB0aGUgdHJlZSBhbmQgdXBkYXRlIGFsbCBgZW50aXR5Lm5hdGl2ZUVsZW1lbnRgIHJlZmVyZW5jZXMuXG4gICAgaWYgKGVudGl0eUlkICE9PSAncm9vdCcgJiYgcGF0aCA9PT0gJzAnKSB7XG4gICAgICB1cGRhdGVOYXRpdmVFbGVtZW50KGVudGl0eUlkLCBuZXdFbClcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RWxcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYWxsIGVudGl0aWVzIGluIGEgYnJhbmNoIHRoYXQgaGF2ZSB0aGUgc2FtZSBuYXRpdmVFbGVtZW50LiBUaGlzXG4gICAqIGhhcHBlbnMgd2hlbiBhIGNvbXBvbmVudCBoYXMgYW5vdGhlciBjb21wb25lbnQgYXMgaXQncyByb290IG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRpdHlJZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBuZXdFbFxuICAgKlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblxuICBmdW5jdGlvbiB1cGRhdGVOYXRpdmVFbGVtZW50IChlbnRpdHlJZCwgbmV3RWwpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZW50aXRpZXNbZW50aXR5SWRdXG4gICAgaWYgKHRhcmdldC5vd25lcklkID09PSAncm9vdCcpIHJldHVyblxuICAgIGlmIChjaGlsZHJlblt0YXJnZXQub3duZXJJZF1bJzAnXSA9PT0gZW50aXR5SWQpIHtcbiAgICAgIGVudGl0aWVzW3RhcmdldC5vd25lcklkXS5uYXRpdmVFbGVtZW50ID0gbmV3RWxcbiAgICAgIHVwZGF0ZU5hdGl2ZUVsZW1lbnQodGFyZ2V0Lm93bmVySWQsIG5ld0VsKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGF0dHJpYnV0ZSBvZiBhbiBlbGVtZW50LCBwZXJmb3JtaW5nIGFkZGl0aW9uYWwgdHJhbnNmb3JtYXRpb25zXG4gICAqIGRlcGVuZG5pbmcgb24gdGhlIGF0dHJpYnV0ZSBuYW1lXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgKi9cblxuICBmdW5jdGlvbiBzZXRBdHRyaWJ1dGUgKGVudGl0eUlkLCBwYXRoLCBlbCwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoZXZlbnRzW25hbWVdKSB7XG4gICAgICBhZGRFdmVudChlbnRpdHlJZCwgcGF0aCwgZXZlbnRzW25hbWVdLCB2YWx1ZSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ2NoZWNrZWQnOlxuICAgICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgY2FzZSAnc2VsZWN0ZWQnOlxuICAgICAgICBlbFtuYW1lXSA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2lubmVySFRNTCc6XG4gICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgIGVsW25hbWVdID0gdmFsdWVcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2Ugc3ZnLmlzQXR0cmlidXRlKG5hbWUpOlxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyhzdmcubmFtZXNwYWNlLCBuYW1lLCB2YWx1ZSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSlcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGF0dHJpYnV0ZSwgcGVyZm9ybWluZyBhZGRpdGlvbmFsIHRyYW5zZm9ybWF0aW9uc1xuICAgKiBkZXBlbmRuaW5nIG9uIHRoZSBhdHRyaWJ1dGUgbmFtZVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKi9cblxuICBmdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUgKGVudGl0eUlkLCBwYXRoLCBlbCwgbmFtZSkge1xuICAgIGlmIChldmVudHNbbmFtZV0pIHtcbiAgICAgIHJlbW92ZUV2ZW50KGVudGl0eUlkLCBwYXRoLCBldmVudHNbbmFtZV0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdjaGVja2VkJzpcbiAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgIGNhc2UgJ3NlbGVjdGVkJzpcbiAgICAgICAgZWxbbmFtZV0gPSBmYWxzZVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnaW5uZXJIVE1MJzpcbiAgICAgIGNhc2UgJ3ZhbHVlJzpcbiAgICAgICAgZWxbbmFtZV0gPSBcIlwiXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSlcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiBvbmUgdHJlZSBwYXRoIGlzIHdpdGhpblxuICAgKiBhbm90aGVyIHRyZWUgcGF0aC4gRXhhbXBsZTpcbiAgICpcbiAgICogMC4xIHZzIDAuMS4xID0gdHJ1ZVxuICAgKiAwLjIgdnMgMC4zLjUgPSBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlzV2l0aGluUGF0aCAodGFyZ2V0LCBwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGguaW5kZXhPZih0YXJnZXQgKyAnLicpID09PSAwXG4gIH1cblxuICAvKipcbiAgICogSXMgdGhlIERPTSBub2RlIGFuIGVsZW1lbnQgbm9kZVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxuICBmdW5jdGlvbiBpc0VsZW1lbnQgKGVsKSB7XG4gICAgcmV0dXJuICEhZWwudGFnTmFtZVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcG9vbCBmb3IgYSB0YWdOYW1lLCBjcmVhdGluZyBpdCBpZiBpdFxuICAgKiBkb2Vzbid0IGV4aXN0LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdGFnTmFtZVxuICAgKlxuICAgKiBAcmV0dXJuIHtQb29sfVxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRQb29sICh0YWdOYW1lKSB7XG4gICAgdmFyIHBvb2wgPSBwb29sc1t0YWdOYW1lXVxuICAgIGlmICghcG9vbCkge1xuICAgICAgdmFyIHBvb2xPcHRzID0gc3ZnLmlzRWxlbWVudCh0YWdOYW1lKSA/XG4gICAgICAgIHsgbmFtZXNwYWNlOiBzdmcubmFtZXNwYWNlLCB0YWdOYW1lOiB0YWdOYW1lIH0gOlxuICAgICAgICB7IHRhZ05hbWU6IHRhZ05hbWUgfVxuICAgICAgcG9vbCA9IHBvb2xzW3RhZ05hbWVdID0gbmV3IFBvb2wocG9vbE9wdHMpXG4gICAgfVxuICAgIHJldHVybiBwb29sXG4gIH1cblxuICAvKipcbiAgICogQ2xlYW4gdXAgcHJldmlvdXNseSB1c2VkIG5hdGl2ZSBlbGVtZW50IGZvciByZXVzZS5cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICovXG5cbiAgZnVuY3Rpb24gY2xlYW51cCAoZWwpIHtcbiAgICByZW1vdmVBbGxDaGlsZHJlbihlbClcbiAgICByZW1vdmVBbGxBdHRyaWJ1dGVzKGVsKVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgdGhlIGF0dHJpYnV0ZXMgZnJvbSBhIG5vZGVcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVtb3ZlQWxsQXR0cmlidXRlcyAoZWwpIHtcbiAgICBmb3IgKHZhciBpID0gZWwuYXR0cmlidXRlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIG5hbWUgPSBlbC5hdHRyaWJ1dGVzW2ldLm5hbWVcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIHRoZSBjaGlsZCBub2RlcyBmcm9tIGFuIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVtb3ZlQWxsQ2hpbGRyZW4gKGVsKSB7XG4gICAgd2hpbGUgKGVsLmZpcnN0Q2hpbGQpIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpXG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBhIGhvb2sgb24gYSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgaG9vay5cbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eSBUaGUgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRvIHBhc3MgYWxvbmcgdG8gaG9vay5cbiAgICovXG5cbiAgZnVuY3Rpb24gdHJpZ2dlciAobmFtZSwgZW50aXR5LCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiBlbnRpdHkuY29tcG9uZW50W25hbWVdICE9PSAnZnVuY3Rpb24nKSByZXR1cm5cbiAgICByZXR1cm4gZW50aXR5LmNvbXBvbmVudFtuYW1lXS5hcHBseShudWxsLCBhcmdzKVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYSBob29rIG9uIHRoZSBjb21wb25lbnQgYW5kIGFsbG93IHN0YXRlIHRvIGJlXG4gICAqIHVwZGF0ZWQgdG9vLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50aXR5XG4gICAqIEBwYXJhbSB7QXJyYXl9IGFyZ3NcbiAgICpcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cbiAgZnVuY3Rpb24gdHJpZ2dlclVwZGF0ZSAobmFtZSwgZW50aXR5LCBhcmdzKSB7XG4gICAgdmFyIHVwZGF0ZSA9IHNldFN0YXRlKGVudGl0eSlcbiAgICBhcmdzLnB1c2godXBkYXRlKVxuICAgIHZhciByZXN1bHQgPSB0cmlnZ2VyKG5hbWUsIGVudGl0eSwgYXJncylcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICB1cGRhdGVFbnRpdHlTdGF0ZUFzeW5jKGVudGl0eSwgcmVzdWx0KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGVudGl0eSBzdGF0ZSB1c2luZyBhIHByb21pc2VcbiAgICpcbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eVxuICAgKiBAcGFyYW0ge1Byb21pc2V9IHByb21pc2VcbiAgICovXG5cbiAgZnVuY3Rpb24gdXBkYXRlRW50aXR5U3RhdGVBc3luYyAoZW50aXR5LCB2YWx1ZSkge1xuICAgIGlmIChpc1Byb21pc2UodmFsdWUpKSB7XG4gICAgICB2YWx1ZS50aGVuKGZ1bmN0aW9uIChuZXdTdGF0ZSkge1xuICAgICAgICB1cGRhdGVFbnRpdHlTdGF0ZShlbnRpdHksIG5ld1N0YXRlKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlRW50aXR5U3RhdGUoZW50aXR5LCB2YWx1ZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGVudGl0eSB0byBtYXRjaCB0aGUgbGF0ZXN0IHJlbmRlcmVkIHZvZGUuIFdlIGFsd2F5c1xuICAgKiByZXBsYWNlIHRoZSBwcm9wcyBvbiB0aGUgY29tcG9uZW50IHdoZW4gY29tcG9zaW5nIHRoZW0uIFRoaXNcbiAgICogd2lsbCB0cmlnZ2VyIGEgcmUtcmVuZGVyIG9uIGFsbCBjaGlsZHJlbiBiZWxvdyB0aGlzIHBvaW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0VudGl0eX0gZW50aXR5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2bm9kZVxuICAgKlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblxuICBmdW5jdGlvbiB1cGRhdGVFbnRpdHlQcm9wcyAoZW50aXR5SWQsIG5leHRQcm9wcykge1xuICAgIHZhciBlbnRpdHkgPSBlbnRpdGllc1tlbnRpdHlJZF1cbiAgICBlbnRpdHkucGVuZGluZ1Byb3BzID0gbmV4dFByb3BzXG4gICAgZW50aXR5LmRpcnR5ID0gdHJ1ZVxuICAgIGludmFsaWRhdGUoKVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBjb21wb25lbnQgaW5zdGFuY2Ugc3RhdGUuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZUVudGl0eVN0YXRlIChlbnRpdHksIG5leHRTdGF0ZSkge1xuICAgIGVudGl0eS5wZW5kaW5nU3RhdGUgPSBhc3NpZ24oZW50aXR5LnBlbmRpbmdTdGF0ZSwgbmV4dFN0YXRlKVxuICAgIGVudGl0eS5kaXJ0eSA9IHRydWVcbiAgICBpbnZhbGlkYXRlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21taXQgcHJvcHMgYW5kIHN0YXRlIGNoYW5nZXMgdG8gYW4gZW50aXR5LlxuICAgKi9cblxuICBmdW5jdGlvbiBjb21taXQgKGVudGl0eSkge1xuICAgIGVudGl0eS5jb250ZXh0ID0ge1xuICAgICAgc3RhdGU6IGVudGl0eS5wZW5kaW5nU3RhdGUsXG4gICAgICBwcm9wczogZW50aXR5LnBlbmRpbmdQcm9wcyxcbiAgICAgIGlkOiBlbnRpdHkuaWRcbiAgICB9XG4gICAgZW50aXR5LnBlbmRpbmdTdGF0ZSA9IGFzc2lnbih7fSwgZW50aXR5LmNvbnRleHQuc3RhdGUpXG4gICAgZW50aXR5LnBlbmRpbmdQcm9wcyA9IGFzc2lnbih7fSwgZW50aXR5LmNvbnRleHQucHJvcHMpXG4gICAgdmFsaWRhdGVQcm9wcyhlbnRpdHkuY29udGV4dC5wcm9wcywgZW50aXR5LnByb3BUeXBlcylcbiAgICBlbnRpdHkuZGlydHkgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIFRyeSB0byBhdm9pZCBjcmVhdGluZyBuZXcgdmlydHVhbCBkb20gaWYgcG9zc2libGUuXG4gICAqXG4gICAqIExhdGVyIHdlIG1heSBleHBvc2UgdGhpcyBzbyB5b3UgY2FuIG92ZXJyaWRlLCBidXQgbm90IHRoZXJlIHlldC5cbiAgICovXG5cbiAgZnVuY3Rpb24gc2hvdWxkVXBkYXRlIChlbnRpdHkpIHtcbiAgICBpZiAoIWVudGl0eS5kaXJ0eSkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKCFlbnRpdHkuY29tcG9uZW50LnNob3VsZFVwZGF0ZSkgcmV0dXJuIHRydWVcbiAgICB2YXIgbmV4dFByb3BzID0gZW50aXR5LnBlbmRpbmdQcm9wc1xuICAgIHZhciBuZXh0U3RhdGUgPSBlbnRpdHkucGVuZGluZ1N0YXRlXG4gICAgdmFyIGJvb2wgPSBlbnRpdHkuY29tcG9uZW50LnNob3VsZFVwZGF0ZShlbnRpdHkuY29udGV4dCwgbmV4dFByb3BzLCBuZXh0U3RhdGUpXG4gICAgcmV0dXJuIGJvb2xcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBlbnRpdHkuXG4gICAqXG4gICAqIFRoaXMgaXMgbW9zdGx5IHRvIHByZS1wcmVwcm9jZXNzIGNvbXBvbmVudCBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXMgY2hhaW5zLlxuICAgKlxuICAgKiBUaGUgZW5kIHJlc3VsdCBpcyBmb3IgZXZlcnkgY29tcG9uZW50IHRoYXQgZ2V0cyBtb3VudGVkLFxuICAgKiB5b3UgY3JlYXRlIGEgc2V0IG9mIElPIG5vZGVzIGluIHRoZSBuZXR3b3JrIGZyb20gdGhlIGB2YWx1ZWAgZGVmaW5pdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXIgKGVudGl0eSkge1xuICAgIHZhciBjb21wb25lbnQgPSBlbnRpdHkuY29tcG9uZW50XG4gICAgLy8gYWxsIGVudGl0aWVzIGZvciB0aGlzIGNvbXBvbmVudCB0eXBlLlxuICAgIHZhciBlbnRpdGllcyA9IGNvbXBvbmVudC5lbnRpdGllcyA9IGNvbXBvbmVudC5lbnRpdGllcyB8fCB7fVxuICAgIC8vIGFkZCBlbnRpdHkgdG8gY29tcG9uZW50IGxpc3RcbiAgICBlbnRpdGllc1tlbnRpdHkuaWRdID0gZW50aXR5XG4gICAgLy8gbWFwIHRvIGNvbXBvbmVudCBzbyB5b3UgY2FuIHJlbW92ZSBsYXRlci5cbiAgICBjb21wb25lbnRzW2VudGl0eS5pZF0gPSBjb21wb25lbnQ7XG5cbiAgICAvLyBnZXQgJ2NsYXNzLWxldmVsJyBzb3VyY2VzLlxuICAgIHZhciBzb3VyY2VzID0gY29tcG9uZW50LnNvdXJjZXNcbiAgICBpZiAoc291cmNlcykgcmV0dXJuXG5cbiAgICB2YXIgbWFwID0gY29tcG9uZW50LnNvdXJjZVRvUHJvcGVydHlOYW1lID0ge31cbiAgICBjb21wb25lbnQuc291cmNlcyA9IHNvdXJjZXMgPSBbXVxuICAgIHZhciBwcm9wVHlwZXMgPSBjb21wb25lbnQucHJvcFR5cGVzXG4gICAgZm9yICh2YXIgbmFtZSBpbiBwcm9wVHlwZXMpIHtcbiAgICAgIHZhciBkYXRhID0gcHJvcFR5cGVzW25hbWVdXG4gICAgICBpZiAoIWRhdGEpIGNvbnRpbnVlXG4gICAgICBpZiAoIWRhdGEuc291cmNlKSBjb250aW51ZVxuICAgICAgc291cmNlcy5wdXNoKGRhdGEuc291cmNlKVxuICAgICAgbWFwW2RhdGEuc291cmNlXSA9IG5hbWVcbiAgICB9XG5cbiAgICAvLyBzZW5kIHZhbHVlIHVwZGF0ZXMgdG8gYWxsIGNvbXBvbmVudCBpbnN0YW5jZXMuXG4gICAgc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIGNvbm5lY3Rpb25zW3NvdXJjZV0gPSBjb25uZWN0aW9uc1tzb3VyY2VdIHx8IFtdXG4gICAgICBjb25uZWN0aW9uc1tzb3VyY2VdLnB1c2godXBkYXRlKVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGUgKGRhdGEpIHtcbiAgICAgICAgdmFyIHByb3AgPSBtYXBbc291cmNlXVxuICAgICAgICBmb3IgKHZhciBlbnRpdHlJZCBpbiBlbnRpdGllcykge1xuICAgICAgICAgIHZhciBlbnRpdHkgPSBlbnRpdGllc1tlbnRpdHlJZF1cbiAgICAgICAgICB2YXIgY2hhbmdlcyA9IHt9XG4gICAgICAgICAgY2hhbmdlc1twcm9wXSA9IGRhdGFcbiAgICAgICAgICB1cGRhdGVFbnRpdHlQcm9wcyhlbnRpdHlJZCwgYXNzaWduKGVudGl0eS5wZW5kaW5nUHJvcHMsIGNoYW5nZXMpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGluaXRpYWwgc291cmNlIHZhbHVlIG9uIHRoZSBlbnRpdHlcbiAgICpcbiAgICogQHBhcmFtIHtFbnRpdHl9IGVudGl0eVxuICAgKi9cblxuICBmdW5jdGlvbiBzZXRTb3VyY2VzIChlbnRpdHkpIHtcbiAgICB2YXIgY29tcG9uZW50ID0gZW50aXR5LmNvbXBvbmVudFxuICAgIHZhciBtYXAgPSBjb21wb25lbnQuc291cmNlVG9Qcm9wZXJ0eU5hbWVcbiAgICB2YXIgc291cmNlcyA9IGNvbXBvbmVudC5zb3VyY2VzXG4gICAgc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHZhciBuYW1lID0gbWFwW3NvdXJjZV1cbiAgICAgIGlmIChlbnRpdHkucGVuZGluZ1Byb3BzW25hbWVdICE9IG51bGwpIHJldHVyblxuICAgICAgZW50aXR5LnBlbmRpbmdQcm9wc1tuYW1lXSA9IGFwcC5zb3VyY2VzW3NvdXJjZV0gLy8gZ2V0IGxhdGVzdCB2YWx1ZSBwbHVnZ2VkIGludG8gZ2xvYmFsIHN0b3JlXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYWxsIG9mIHRoZSBET00gZXZlbnQgbGlzdGVuZXJzXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFkZE5hdGl2ZUV2ZW50TGlzdGVuZXJzICgpIHtcbiAgICBmb3JFYWNoKGV2ZW50cywgZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlRXZlbnQsIHRydWUpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYWxsIG9mIHRoZSBET00gZXZlbnQgbGlzdGVuZXJzXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZU5hdGl2ZUV2ZW50TGlzdGVuZXJzICgpIHtcbiAgICBmb3JFYWNoKGV2ZW50cywgZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlRXZlbnQsIHRydWUpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgYW4gZXZlbnQgdGhhdCBoYXMgb2NjdXJlZCB3aXRoaW4gdGhlIGNvbnRhaW5lclxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgKi9cblxuICBmdW5jdGlvbiBoYW5kbGVFdmVudCAoZXZlbnQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgdmFyIGV2ZW50VHlwZSA9IGV2ZW50LnR5cGVcblxuICAgIC8vIFdhbGsgdXAgdGhlIERPTSB0cmVlIGFuZCBzZWUgaWYgdGhlcmUgaXMgYSBoYW5kbGVyXG4gICAgLy8gZm9yIHRoaXMgZXZlbnQgdHlwZSBoaWdoZXIgdXAuXG4gICAgd2hpbGUgKHRhcmdldCkge1xuICAgICAgdmFyIGZuID0ga2V5cGF0aC5nZXQoaGFuZGxlcnMsIFt0YXJnZXQuX19lbnRpdHlfXywgdGFyZ2V0Ll9fcGF0aF9fLCBldmVudFR5cGVdKVxuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gdGFyZ2V0XG4gICAgICAgIGZuKGV2ZW50KVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBldmVudHMgZm9yIGFuIGVsZW1lbnQsIGFuZCBhbGwgaXQncyByZW5kZXJlZCBjaGlsZCBlbGVtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFkZEV2ZW50IChlbnRpdHlJZCwgcGF0aCwgZXZlbnRUeXBlLCBmbikge1xuICAgIGtleXBhdGguc2V0KGhhbmRsZXJzLCBbZW50aXR5SWQsIHBhdGgsIGV2ZW50VHlwZV0sIHRocm90dGxlKGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgZW50aXR5ID0gZW50aXRpZXNbZW50aXR5SWRdXG4gICAgICBpZiAoZW50aXR5KSB7XG4gICAgICAgIHZhciB1cGRhdGUgPSBzZXRTdGF0ZShlbnRpdHkpXG4gICAgICAgIHZhciByZXN1bHQgPSBmbi5jYWxsKG51bGwsIGUsIGVudGl0eS5jb250ZXh0LCB1cGRhdGUpXG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICB1cGRhdGVFbnRpdHlTdGF0ZUFzeW5jKGVudGl0eSwgcmVzdWx0KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbi5jYWxsKG51bGwsIGUpXG4gICAgICB9XG4gICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogVW5iaW5kIGV2ZW50cyBmb3IgYSBlbnRpdHlJZFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZW50aXR5SWRcbiAgICovXG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnQgKGVudGl0eUlkLCBwYXRoLCBldmVudFR5cGUpIHtcbiAgICB2YXIgYXJncyA9IFtlbnRpdHlJZF1cbiAgICBpZiAocGF0aCkgYXJncy5wdXNoKHBhdGgpXG4gICAgaWYgKGV2ZW50VHlwZSkgYXJncy5wdXNoKGV2ZW50VHlwZSlcbiAgICBrZXlwYXRoLmRlbChoYW5kbGVycywgYXJncylcbiAgfVxuXG4gIC8qKlxuICAgKiBVbmJpbmQgYWxsIGV2ZW50cyBmcm9tIGFuIGVudGl0eVxuICAgKlxuICAgKiBAcGFyYW0ge0VudGl0eX0gZW50aXR5XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJlbW92ZUFsbEV2ZW50cyAoZW50aXR5SWQpIHtcbiAgICBrZXlwYXRoLmRlbChoYW5kbGVycywgW2VudGl0eUlkXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB0aGUgY3VycmVudCBwcm9wZXJ0aWVzLiBUaGVzZSBzaW1wbGUgdmFsaWRhdGlvbnNcbiAgICogbWFrZSBpdCBlYXNpZXIgdG8gZW5zdXJlIHRoZSBjb3JyZWN0IHByb3BzIGFyZSBwYXNzZWQgaW4uXG4gICAqXG4gICAqIEF2YWlsYWJsZSBydWxlcyBpbmNsdWRlOlxuICAgKlxuICAgKiB0eXBlOiB7U3RyaW5nfSBzdHJpbmcgfCBhcnJheSB8IG9iamVjdCB8IGJvb2xlYW4gfCBudW1iZXIgfCBkYXRlIHwgZnVuY3Rpb25cbiAgICogICAgICAge0FycmF5fSBBbiBhcnJheSBvZiB0eXBlcyBtZW50aW9uZWQgYWJvdmVcbiAgICogICAgICAge0Z1bmN0aW9ufSBmbih2YWx1ZSkgc2hvdWxkIHJldHVybiBgdHJ1ZWAgdG8gcGFzcyBpblxuICAgKiBleHBlY3RzOiBbXSBBbiBhcnJheSBvZiB2YWx1ZXMgdGhpcyBwcm9wIGNvdWxkIGVxdWFsXG4gICAqIG9wdGlvbmFsOiBCb29sZWFuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlUHJvcHMgKHByb3BzLCBydWxlcywgb3B0UHJlZml4KSB7XG4gICAgdmFyIHByZWZpeCA9IG9wdFByZWZpeCB8fCAnJ1xuICAgIGlmICghb3B0aW9ucy52YWxpZGF0ZVByb3BzKSByZXR1cm5cbiAgICBmb3JFYWNoKHJ1bGVzLCBmdW5jdGlvbiAob3B0aW9ucywgbmFtZSkge1xuICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZGVrdTogcHJvcFR5cGVzIHNob3VsZCBoYXZlIGFuIG9wdGlvbnMgb2JqZWN0IGZvciBlYWNoIHR5cGUnKVxuICAgICAgfVxuXG4gICAgICB2YXIgcHJvcE5hbWUgPSBwcmVmaXggPyBwcmVmaXggKyAnLicgKyBuYW1lIDogbmFtZVxuICAgICAgdmFyIHZhbHVlID0ga2V5cGF0aC5nZXQocHJvcHMsIG5hbWUpXG4gICAgICB2YXIgdmFsdWVUeXBlID0gdHlwZSh2YWx1ZSlcbiAgICAgIHZhciB0eXBlRm9ybWF0ID0gdHlwZShvcHRpb25zLnR5cGUpXG4gICAgICB2YXIgb3B0aW9uYWwgPSAob3B0aW9ucy5vcHRpb25hbCA9PT0gdHJ1ZSlcblxuICAgICAgLy8gSWYgaXQncyBvcHRpb25hbCBhbmQgZG9lc24ndCBleGlzdFxuICAgICAgaWYgKG9wdGlvbmFsICYmIHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIElmIGl0J3MgcmVxdWlyZWQgYW5kIGRvZXNuJ3QgZXhpc3RcbiAgICAgIGlmICghb3B0aW9uYWwgJiYgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNaXNzaW5nIHByb3BlcnR5OiAnICsgcHJvcE5hbWUpXG4gICAgICB9XG5cbiAgICAgIC8vIEl0J3MgYSBuZXN0ZWQgdHlwZVxuICAgICAgaWYgKHR5cGVGb3JtYXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhbGlkYXRlUHJvcHModmFsdWUsIG9wdGlvbnMudHlwZSwgcHJvcE5hbWUpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBJZiBpdCdzIHRoZSBpbmNvcnJlY3QgdHlwZVxuICAgICAgaWYgKHR5cGVGb3JtYXQgPT09ICdzdHJpbmcnICYmIHZhbHVlVHlwZSAhPT0gb3B0aW9ucy50eXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcHJvcGVydHkgdHlwZTogJyArIHByb3BOYW1lKVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0eXBlIGlzIHZhbGlkYXRlIGZ1bmN0aW9uXG4gICAgICBpZiAodHlwZUZvcm1hdCA9PT0gJ2Z1bmN0aW9uJyAmJiAhb3B0aW9ucy50eXBlKHZhbHVlKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHByb3BlcnR5IHR5cGU6ICcgKyBwcm9wTmFtZSlcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdHlwZSBpcyBhcnJheSBvZiBwb3NzaWJsZSB0eXBlc1xuICAgICAgaWYgKHR5cGVGb3JtYXQgPT09ICdhcnJheScgJiYgb3B0aW9ucy50eXBlLmluZGV4T2YodmFsdWVUeXBlKSA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBwcm9wZXJ0eSB0eXBlOiAnICsgcHJvcE5hbWUpXG4gICAgICB9XG5cbiAgICAgIC8vIElmIGl0J3MgYW4gaW52YWxpZCB2YWx1ZVxuICAgICAgaWYgKG9wdGlvbnMuZXhwZWN0cyAmJiBvcHRpb25zLmV4cGVjdHMuaW5kZXhPZih2YWx1ZSkgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcHJvcGVydHkgdmFsdWU6ICcgKyBwcm9wTmFtZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gTm93IGNoZWNrIGZvciBwcm9wcyB0aGF0IGhhdmVuJ3QgYmVlbiBkZWZpbmVkXG4gICAgZm9yRWFjaChwcm9wcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIC8vIHByb3BzLmNoaWxkcmVuIGlzIGFsd2F5cyBwYXNzZWQgaW4sIGV2ZW4gaWYgaXQncyBub3QgZGVmaW5lZFxuICAgICAgaWYgKGtleSA9PT0gJ2NoaWxkcmVuJykgcmV0dXJuXG4gICAgICBpZiAoIXJ1bGVzW2tleV0pIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBwcm9wZXJ0eTogJyArIGtleSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgZm9yIGRlYnVnZ2luZyB0byBpbnNwZWN0IHRoZSBjdXJyZW50IHN0YXRlIHdpdGhvdXRcbiAgICogdXMgbmVlZGluZyB0byBleHBsaWNpdGx5IG1hbmFnZSBzdG9yaW5nL3VwZGF0aW5nIHJlZmVyZW5jZXMuXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG5cbiAgZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVudGl0aWVzOiBlbnRpdGllcyxcbiAgICAgIHBvb2xzOiBwb29scyxcbiAgICAgIGhhbmRsZXJzOiBoYW5kbGVycyxcbiAgICAgIGNvbm5lY3Rpb25zOiBjb25uZWN0aW9ucyxcbiAgICAgIGN1cnJlbnRFbGVtZW50OiBjdXJyZW50RWxlbWVudCxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICBhcHA6IGFwcCxcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBvYmplY3QgdGhhdCBsZXRzIHVzIGNvbXBsZXRlbHkgcmVtb3ZlIHRoZSBhdXRvbWF0aWNcbiAgICogRE9NIHJlbmRlcmluZyBhbmQgZXhwb3J0IGRlYnVnZ2luZyB0b29scy5cbiAgICovXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmU6IHRlYXJkb3duLFxuICAgIGluc3BlY3Q6IGluc3BlY3RcbiAgfVxufVxuXG4vKipcbiAqIEEgcmVuZGVyZWQgY29tcG9uZW50IGluc3RhbmNlLlxuICpcbiAqIFRoaXMgbWFuYWdlcyB0aGUgbGlmZWN5Y2xlLCBwcm9wcyBhbmQgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC5cbiAqIEl0J3MgYmFzaWNhbGx5IGp1c3QgYSBkYXRhIG9iamVjdCBmb3IgbW9yZSBzdHJhaWdodGZvd2FyZCBsb29rdXAuXG4gKlxuICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudFxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG4gKi9cblxuZnVuY3Rpb24gRW50aXR5IChjb21wb25lbnQsIHByb3BzLCBvd25lcklkKSB7XG4gIHRoaXMuaWQgPSB1aWQoKVxuICB0aGlzLm93bmVySWQgPSBvd25lcklkXG4gIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50XG4gIHRoaXMucHJvcFR5cGVzID0gY29tcG9uZW50LnByb3BUeXBlcyB8fCB7fVxuICB0aGlzLmNvbnRleHQgPSB7fVxuICB0aGlzLmNvbnRleHQuaWQgPSB0aGlzLmlkO1xuICB0aGlzLmNvbnRleHQucHJvcHMgPSBkZWZhdWx0cyhwcm9wcyB8fCB7fSwgY29tcG9uZW50LmRlZmF1bHRQcm9wcyB8fCB7fSlcbiAgdGhpcy5jb250ZXh0LnN0YXRlID0gdGhpcy5jb21wb25lbnQuaW5pdGlhbFN0YXRlID8gdGhpcy5jb21wb25lbnQuaW5pdGlhbFN0YXRlKHRoaXMuY29udGV4dC5wcm9wcykgOiB7fVxuICB0aGlzLnBlbmRpbmdQcm9wcyA9IGFzc2lnbih7fSwgdGhpcy5jb250ZXh0LnByb3BzKVxuICB0aGlzLnBlbmRpbmdTdGF0ZSA9IGFzc2lnbih7fSwgdGhpcy5jb250ZXh0LnN0YXRlKVxuICB0aGlzLmRpcnR5ID0gZmFsc2VcbiAgdGhpcy52aXJ0dWFsRWxlbWVudCA9IG51bGxcbiAgdGhpcy5uYXRpdmVFbGVtZW50ID0gbnVsbFxuICB0aGlzLmRpc3BsYXlOYW1lID0gY29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCdcbn1cblxuLyoqXG4gKiBTaG91bGQgd2UgcG9vbCBhbiBlbGVtZW50P1xuICovXG5cbmZ1bmN0aW9uIGNhblBvb2wodGFnTmFtZSkge1xuICByZXR1cm4gYXZvaWRQb29saW5nLmluZGV4T2YodGFnTmFtZSkgPCAwXG59XG5cbi8qKlxuICogR2V0IGEgbmVzdGVkIG5vZGUgdXNpbmcgYSBwYXRoXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgICBUaGUgcm9vdCBub2RlICcwJ1xuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggVGhlIHBhdGggc3RyaW5nIGVnLiAnMC4yLjQzJ1xuICovXG5cbmZ1bmN0aW9uIGdldE5vZGVBdFBhdGgoZWwsIHBhdGgpIHtcbiAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgnLicpXG4gIHBhcnRzLnNoaWZ0KClcbiAgd2hpbGUgKHBhcnRzLmxlbmd0aCkge1xuICAgIGVsID0gZWwuY2hpbGROb2Rlc1twYXJ0cy5wb3AoKV1cbiAgfVxuICByZXR1cm4gZWxcbn1cbiIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKVxudmFyIGRlZmF1bHRzID0gdXRpbHMuZGVmYXVsdHNcblxuLyoqXG4gKiBFeHBvc2UgYHN0cmluZ2lmeWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXBwKSB7XG4gIGlmICghYXBwLmVsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGVsZW1lbnQgbW91bnRlZCcpXG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIHRvIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN0cmluZ2lmeSAoY29tcG9uZW50LCBvcHRQcm9wcykge1xuICAgIHZhciBwcm9wVHlwZXMgPSBjb21wb25lbnQucHJvcFR5cGVzIHx8IHt9XG4gICAgdmFyIHByb3BzID0gZGVmYXVsdHMob3B0UHJvcHMgfHwge30sIGNvbXBvbmVudC5kZWZhdWx0UHJvcHMgfHwge30pXG4gICAgdmFyIHN0YXRlID0gY29tcG9uZW50LmluaXRpYWxTdGF0ZSA/IGNvbXBvbmVudC5pbml0aWFsU3RhdGUocHJvcHMpIDoge31cblxuICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcFR5cGVzKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHByb3BUeXBlc1tuYW1lXVxuICAgICAgaWYgKG9wdGlvbnMuc291cmNlKSB7XG4gICAgICAgIHByb3BzW25hbWVdID0gYXBwLnNvdXJjZXNbb3B0aW9ucy5zb3VyY2VdXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbXBvbmVudC5iZWZvcmVNb3VudCkgY29tcG9uZW50LmJlZm9yZU1vdW50KHsgcHJvcHM6IHByb3BzLCBzdGF0ZTogc3RhdGUgfSlcbiAgICBpZiAoY29tcG9uZW50LmJlZm9yZVJlbmRlcikgY29tcG9uZW50LmJlZm9yZVJlbmRlcih7IHByb3BzOiBwcm9wcywgc3RhdGU6IHN0YXRlIH0pXG4gICAgdmFyIG5vZGUgPSBjb21wb25lbnQucmVuZGVyKHsgcHJvcHM6IHByb3BzLCBzdGF0ZTogc3RhdGUgfSlcbiAgICByZXR1cm4gc3RyaW5naWZ5Tm9kZShub2RlLCAnMCcpXG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGEgbm9kZSB0byBhIHN0cmluZ1xuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICogQHBhcmFtIHtUcmVlfSB0cmVlXG4gICAqXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cbiAgZnVuY3Rpb24gc3RyaW5naWZ5Tm9kZSAobm9kZSwgcGF0aCkge1xuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzogcmV0dXJuIG5vZGUuZGF0YVxuICAgICAgY2FzZSAnZWxlbWVudCc6XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW5cbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXNcbiAgICAgICAgdmFyIHRhZ05hbWUgPSBub2RlLnRhZ05hbWVcbiAgICAgICAgdmFyIGlubmVySFRNTCA9IGF0dHJpYnV0ZXMuaW5uZXJIVE1MXG4gICAgICAgIHZhciBzdHIgPSAnPCcgKyB0YWdOYW1lICsgYXR0cnMoYXR0cmlidXRlcykgKyAnPidcblxuICAgICAgICBpZiAoaW5uZXJIVE1MKSB7XG4gICAgICAgICAgc3RyICs9IGlubmVySFRNTFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzdHIgKz0gc3RyaW5naWZ5Tm9kZShjaGlsZHJlbltpXSwgcGF0aCArICcuJyArIGkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RyICs9ICc8LycgKyB0YWdOYW1lICsgJz4nXG4gICAgICAgIHJldHVybiBzdHJcbiAgICAgIGNhc2UgJ2NvbXBvbmVudCc6IHJldHVybiBzdHJpbmdpZnkobm9kZS5jb21wb25lbnQsIG5vZGUucHJvcHMpXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHR5cGUnKVxuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeU5vZGUoYXBwLmVsZW1lbnQsICcwJylcbn1cblxuLyoqXG4gKiBIVE1MIGF0dHJpYnV0ZXMgdG8gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBhdHRycyAoYXR0cmlidXRlcykge1xuICB2YXIgc3RyID0gJydcbiAgZm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICBpZiAoa2V5ID09PSAnaW5uZXJIVE1MJykgY29udGludWVcbiAgICBzdHIgKz0gYXR0cihrZXksIGF0dHJpYnV0ZXNba2V5XSlcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbi8qKlxuICogSFRNTCBhdHRyaWJ1dGUgdG8gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGF0dHIgKGtleSwgdmFsKSB7XG4gIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIidcbn1cbiIsInZhciBpbmRleE9mID0gcmVxdWlyZSgnZmFzdC5qcy9hcnJheS9pbmRleE9mJylcblxuLyoqXG4gKiBUaGlzIGZpbGUgbGlzdHMgdGhlIHN1cHBvcnRlZCBTVkcgZWxlbWVudHMgdXNlZCBieSB0aGVcbiAqIHJlbmRlcmVyLiBXZSBtYXkgYWRkIGJldHRlciBTVkcgc3VwcG9ydCBpbiB0aGUgZnV0dXJlXG4gKiB0aGF0IGRvZXNuJ3QgcmVxdWlyZSB3aGl0ZWxpc3RpbmcgZWxlbWVudHMuXG4gKi9cblxuZXhwb3J0cy5uYW1lc3BhY2UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG5cbi8qKlxuICogU3VwcG9ydGVkIFNWRyBlbGVtZW50c1xuICpcbiAqIEB0eXBlIHtBcnJheX1cbiAqL1xuXG5leHBvcnRzLmVsZW1lbnRzID0gW1xuICAnY2lyY2xlJyxcbiAgJ2RlZnMnLFxuICAnZWxsaXBzZScsXG4gICdnJyxcbiAgJ2xpbmUnLFxuICAnbGluZWFyR3JhZGllbnQnLFxuICAnbWFzaycsXG4gICdwYXRoJyxcbiAgJ3BhdHRlcm4nLFxuICAncG9seWdvbicsXG4gICdwb2x5bGluZScsXG4gICdyYWRpYWxHcmFkaWVudCcsXG4gICdyZWN0JyxcbiAgJ3N0b3AnLFxuICAnc3ZnJyxcbiAgJ3RleHQnLFxuICAndHNwYW4nXG5dXG5cbi8qKlxuICogU3VwcG9ydGVkIFNWRyBhdHRyaWJ1dGVzXG4gKi9cblxuZXhwb3J0cy5hdHRyaWJ1dGVzID0gW1xuICAnY3gnLFxuICAnY3knLFxuICAnZCcsXG4gICdkeCcsXG4gICdkeScsXG4gICdmaWxsJyxcbiAgJ2ZpbGxPcGFjaXR5JyxcbiAgJ2ZvbnRGYW1pbHknLFxuICAnZm9udFNpemUnLFxuICAnZngnLFxuICAnZnknLFxuICAnZ3JhZGllbnRUcmFuc2Zvcm0nLFxuICAnZ3JhZGllbnRVbml0cycsXG4gICdtYXJrZXJFbmQnLFxuICAnbWFya2VyTWlkJyxcbiAgJ21hcmtlclN0YXJ0JyxcbiAgJ29mZnNldCcsXG4gICdvcGFjaXR5JyxcbiAgJ3BhdHRlcm5Db250ZW50VW5pdHMnLFxuICAncGF0dGVyblVuaXRzJyxcbiAgJ3BvaW50cycsXG4gICdwcmVzZXJ2ZUFzcGVjdFJhdGlvJyxcbiAgJ3InLFxuICAncngnLFxuICAncnknLFxuICAnc3ByZWFkTWV0aG9kJyxcbiAgJ3N0b3BDb2xvcicsXG4gICdzdG9wT3BhY2l0eScsXG4gICdzdHJva2UnLFxuICAnc3Ryb2tlRGFzaGFycmF5JyxcbiAgJ3N0cm9rZUxpbmVjYXAnLFxuICAnc3Ryb2tlT3BhY2l0eScsXG4gICdzdHJva2VXaWR0aCcsXG4gICd0ZXh0QW5jaG9yJyxcbiAgJ3RyYW5zZm9ybScsXG4gICd2ZXJzaW9uJyxcbiAgJ3ZpZXdCb3gnLFxuICAneDEnLFxuICAneDInLFxuICAneCcsXG4gICd5MScsXG4gICd5MicsXG4gICd5J1xuXVxuXG4vKipcbiAqIElzIGVsZW1lbnQncyBuYW1lc3BhY2UgU1ZHP1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKi9cblxuZXhwb3J0cy5pc0VsZW1lbnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gaW5kZXhPZihleHBvcnRzLmVsZW1lbnRzLCBuYW1lKSAhPT0gLTFcbn1cblxuLyoqXG4gKiBBcmUgZWxlbWVudCdzIGF0dHJpYnV0ZXMgU1ZHP1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyXG4gKi9cblxuZXhwb3J0cy5pc0F0dHJpYnV0ZSA9IGZ1bmN0aW9uIChhdHRyKSB7XG4gIHJldHVybiBpbmRleE9mKGV4cG9ydHMuYXR0cmlidXRlcywgYXR0cikgIT09IC0xXG59XG5cbiIsIi8qKlxuICogVGhlIG5wbSAnZGVmYXVsdHMnIG1vZHVsZSBidXQgd2l0aG91dCBjbG9uZSBiZWNhdXNlXG4gKiBpdCB3YXMgcmVxdWlyaW5nIHRoZSAnQnVmZmVyJyBtb2R1bGUgd2hpY2ggaXMgaHVnZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzXG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSBmdW5jdGlvbihvcHRpb25zLCBkZWZhdWx0cykge1xuICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG9wdGlvbnNba2V5XSA9IGRlZmF1bHRzW2tleV1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBvcHRpb25zXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHR5cGUgPSByZXF1aXJlKCdjb21wb25lbnQtdHlwZScpXG52YXIgc2xpY2UgPSByZXF1aXJlKCdzbGljZWQnKVxudmFyIGZsYXR0ZW4gPSByZXF1aXJlKCdhcnJheS1mbGF0dGVuJylcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGxldHMgdXMgY3JlYXRlIHZpcnR1YWwgbm9kZXMgdXNpbmcgYSBzaW1wbGVcbiAqIHN5bnRheC4gSXQgaXMgY29tcGF0aWJsZSB3aXRoIEpTWCB0cmFuc2Zvcm1zIHNvIHlvdSBjYW4gdXNlXG4gKiBKU1ggdG8gd3JpdGUgbm9kZXMgdGhhdCB3aWxsIGNvbXBpbGUgdG8gdGhpcyBmdW5jdGlvbi5cbiAqXG4gKiBsZXQgbm9kZSA9IHZpcnR1YWwoJ2RpdicsIHsgaWQ6ICdmb28nIH0sIFtcbiAqICAgdmlydHVhbCgnYScsIHsgaHJlZjogJ2h0dHA6Ly9nb29nbGUuY29tJyB9LCAnR29vZ2xlJylcbiAqIF0pXG4gKlxuICogWW91IGNhbiBsZWF2ZSBvdXQgdGhlIGF0dHJpYnV0ZXMgb3IgdGhlIGNoaWxkcmVuIGlmIGVpdGhlclxuICogb2YgdGhlbSBhcmVuJ3QgbmVlZGVkIGFuZCBpdCB3aWxsIGZpZ3VyZSBvdXQgd2hhdCB5b3UncmVcbiAqIHRyeWluZyB0byBkby5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZpcnR1YWxcblxuLyoqXG4gKiBDcmVhdGUgdmlydHVhbCBET00gdHJlZXMuXG4gKlxuICogVGhpcyBjcmVhdGVzIHRoZSBuaWNlciBBUEkgZm9yIHRoZSB1c2VyLlxuICogSXQgdHJhbnNsYXRlcyB0aGF0IGZyaWVuZGx5IEFQSSBpbnRvIGFuIGFjdHVhbCB0cmVlIG9mIG5vZGVzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAqIEBwYXJhbSB7QXJyYXl9IGNoaWxkcmVuXG4gKiBAcmV0dXJuIHtOb2RlfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiB2aXJ0dWFsICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgLy8gRGVmYXVsdCB0byBkaXYgd2l0aCBubyBhcmdzXG4gIGlmICghdHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZGVrdTogRWxlbWVudCBuZWVkcyBhIHR5cGUuIFJlYWQgbW9yZTogaHR0cDovL2NsLmx5L2IwS1onKVxuICB9XG5cbiAgLy8gU2tpcHBlZCBhZGRpbmcgYXR0cmlidXRlcyBhbmQgd2UncmUgcGFzc2luZ1xuICAvLyBpbiBjaGlsZHJlbiBpbnN0ZWFkLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiAodHlwZW9mIHByb3BzID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KHByb3BzKSkpIHtcbiAgICBjaGlsZHJlbiA9IHByb3BzXG4gICAgcHJvcHMgPSB7fVxuICB9XG5cbiAgLy8gQWNjb3VudCBmb3IgSlNYIHB1dHRpbmcgdGhlIGNoaWxkcmVuIGFzIG11bHRpcGxlIGFyZ3VtZW50cy5cbiAgLy8gVGhpcyBpcyBlc3NlbnRpYWxseSBqdXN0IHRoZSBFUzYgcmVzdCBwYXJhbVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgQXJyYXkuaXNBcnJheShhcmd1bWVudHNbMl0pID09PSBmYWxzZSkge1xuICAgIGNoaWxkcmVuID0gc2xpY2UoYXJndW1lbnRzLCAyKVxuICB9XG5cbiAgY2hpbGRyZW4gPSBjaGlsZHJlbiB8fCBbXVxuICBwcm9wcyA9IHByb3BzIHx8IHt9XG5cbiAgLy8gcGFzc2luZyBpbiBhIHNpbmdsZSBjaGlsZCwgeW91IGNhbiBza2lwXG4gIC8vIHVzaW5nIHRoZSBhcnJheVxuICBpZiAoIUFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgY2hpbGRyZW4gPSBbIGNoaWxkcmVuIF1cbiAgfVxuXG4gIGNoaWxkcmVuID0gZmxhdHRlbihjaGlsZHJlbiwgMSkucmVkdWNlKG5vcm1hbGl6ZSwgW10pXG5cbiAgLy8gcHVsbCB0aGUga2V5IG91dCBmcm9tIHRoZSBkYXRhLlxuICB2YXIga2V5ID0gJ2tleScgaW4gcHJvcHMgPyBTdHJpbmcocHJvcHMua2V5KSA6IG51bGxcbiAgZGVsZXRlIHByb3BzWydrZXknXVxuXG4gIC8vIGlmIHlvdSBwYXNzIGluIGEgZnVuY3Rpb24sIGl0J3MgYSBgQ29tcG9uZW50YCBjb25zdHJ1Y3Rvci5cbiAgLy8gb3RoZXJ3aXNlIGl0J3MgYW4gZWxlbWVudC5cbiAgdmFyIG5vZGVcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIG5vZGUgPSBuZXcgRWxlbWVudE5vZGUodHlwZSwgcHJvcHMsIGtleSwgY2hpbGRyZW4pXG4gIH0gZWxzZSB7XG4gICAgbm9kZSA9IG5ldyBDb21wb25lbnROb2RlKHR5cGUsIHByb3BzLCBrZXksIGNoaWxkcmVuKVxuICB9XG5cbiAgLy8gc2V0IHRoZSB1bmlxdWUgSURcbiAgbm9kZS5pbmRleCA9IDBcblxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIFBhcnNlIG5vZGVzIGludG8gcmVhbCBgTm9kZWAgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBub2RlXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4XG4gKiBAcmV0dXJuIHtOb2RlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplIChhY2MsIG5vZGUpIHtcbiAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgIHJldHVybiBhY2NcbiAgfVxuICBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBub2RlID09PSAnbnVtYmVyJykge1xuICAgIHZhciBuZXdOb2RlID0gbmV3IFRleHROb2RlKFN0cmluZyhub2RlKSlcbiAgICBuZXdOb2RlLmluZGV4ID0gYWNjLmxlbmd0aFxuICAgIGFjYy5wdXNoKG5ld05vZGUpXG4gIH0gZWxzZSB7XG4gICAgbm9kZS5pbmRleCA9IGFjYy5sZW5ndGhcbiAgICBhY2MucHVzaChub2RlKVxuICB9XG4gIHJldHVybiBhY2Ncbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBDb21wb25lbnROb2RlYC5cbiAqXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50XG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVXNlZCBmb3Igc29ydGluZy9yZXBsYWNpbmcgZHVyaW5nIGRpZmZpbmcuXG4gKiBAcGFyYW0ge0FycmF5fSBjaGlsZHJlbiBDaGlsZCB2aXJ0dWFsIG5vZGVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIENvbXBvbmVudE5vZGUgKGNvbXBvbmVudCwgcHJvcHMsIGtleSwgY2hpbGRyZW4pIHtcbiAgdGhpcy5rZXkgPSBrZXlcbiAgdGhpcy5wcm9wcyA9IHByb3BzXG4gIHRoaXMudHlwZSA9ICdjb21wb25lbnQnXG4gIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50XG4gIHRoaXMucHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbiB8fCBbXVxufVxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVsZW1lbnROb2RlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFnTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVXNlZCBmb3Igc29ydGluZy9yZXBsYWNpbmcgZHVyaW5nIGRpZmZpbmcuXG4gKiBAcGFyYW0ge0FycmF5fSBjaGlsZHJlbiBDaGlsZCB2aXJ0dWFsIGRvbSBub2Rlcy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRWxlbWVudE5vZGUgKHRhZ05hbWUsIGF0dHJpYnV0ZXMsIGtleSwgY2hpbGRyZW4pIHtcbiAgdGhpcy50eXBlID0gJ2VsZW1lbnQnXG4gIHRoaXMuYXR0cmlidXRlcyA9IHBhcnNlQXR0cmlidXRlcyhhdHRyaWJ1dGVzKVxuICB0aGlzLnRhZ05hbWUgPSB0YWdOYW1lXG4gIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiB8fCBbXVxuICB0aGlzLmtleSA9IGtleVxufVxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFRleHROb2RlYC5cbiAqXG4gKiBUaGlzIGlzIGp1c3QgYSB2aXJ0dWFsIEhUTUwgdGV4dCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gVGV4dE5vZGUgKHRleHQpIHtcbiAgdGhpcy50eXBlID0gJ3RleHQnXG4gIHRoaXMuZGF0YSA9IFN0cmluZyh0ZXh0KVxufVxuXG4vKipcbiAqIFBhcnNlIGF0dHJpYnV0ZXMgZm9yIHNvbWUgc3BlY2lhbCBjYXNlcy5cbiAqXG4gKiBUT0RPOiBUaGlzIGNvdWxkIGJlIG1vcmUgZnVuY3Rpb25hbCBhbmQgYWxsb3cgaG9va3NcbiAqIGludG8gdGhlIHByb2Nlc3Npbmcgb2YgdGhlIGF0dHJpYnV0ZXMgYXQgYSBjb21wb25lbnQtbGV2ZWxcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUF0dHJpYnV0ZXMgKGF0dHJpYnV0ZXMpIHtcbiAgLy8gc3R5bGU6IHsgJ3RleHQtYWxpZ24nOiAnbGVmdCcgfVxuICBpZiAoYXR0cmlidXRlcy5zdHlsZSkge1xuICAgIGF0dHJpYnV0ZXMuc3R5bGUgPSBwYXJzZVN0eWxlKGF0dHJpYnV0ZXMuc3R5bGUpXG4gIH1cblxuICAvLyBjbGFzczogeyBmb286IHRydWUsIGJhcjogZmFsc2UsIGJhejogdHJ1ZSB9XG4gIC8vIGNsYXNzOiBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAgaWYgKGF0dHJpYnV0ZXMuY2xhc3MpIHtcbiAgICBhdHRyaWJ1dGVzLmNsYXNzID0gcGFyc2VDbGFzcyhhdHRyaWJ1dGVzLmNsYXNzKVxuICB9XG5cbiAgLy8gUmVtb3ZlIGF0dHJpYnV0ZXMgd2l0aCBmYWxzZSB2YWx1ZXNcbiAgdmFyIGZpbHRlcmVkQXR0cmlidXRlcyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1trZXldXG4gICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09IGZhbHNlKSBjb250aW51ZVxuICAgIGZpbHRlcmVkQXR0cmlidXRlc1trZXldID0gdmFsdWVcbiAgfVxuXG4gIHJldHVybiBmaWx0ZXJlZEF0dHJpYnV0ZXNcbn1cblxuLyoqXG4gKiBQYXJzZSBhIGJsb2NrIG9mIHN0eWxlcyBpbnRvIGEgc3RyaW5nLlxuICpcbiAqIFRPRE86IHRoaXMgY291bGQgZG8gYSBsb3QgbW9yZSB3aXRoIHZlbmRvciBwcmVmaXhpbmcsXG4gKiBudW1iZXIgdmFsdWVzIGV0Yy4gTWF5YmUgdGhlcmUncyBhIHdheSB0byBhbGxvdyB1c2Vyc1xuICogdG8gaG9vayBpbnRvIHRoaXM/XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlc1xuICpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0eWxlIChzdHlsZXMpIHtcbiAgaWYgKHR5cGUoc3R5bGVzKSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3R5bGVzXG4gIH1cbiAgdmFyIHN0ciA9ICcnXG4gIGZvciAodmFyIG5hbWUgaW4gc3R5bGVzKSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW25hbWVdXG4gICAgc3RyID0gc3RyICsgbmFtZSArICc6JyArIHZhbHVlICsgJzsnXG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgY2xhc3MgYXR0cmlidXRlIHNvIGl0J3MgYWJsZSB0byBiZVxuICogc2V0IGluIGEgbW9yZSB1c2VyLWZyaWVuZGx5IHdheVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxBcnJheX0gdmFsdWVcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gcGFyc2VDbGFzcyAodmFsdWUpIHtcbiAgLy8geyBmb286IHRydWUsIGJhcjogZmFsc2UsIGJhejogdHJ1ZSB9XG4gIGlmICh0eXBlKHZhbHVlKSA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgbWF0Y2hlZCA9IFtdXG4gICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWVba2V5XSkgbWF0Y2hlZC5wdXNoKGtleSlcbiAgICB9XG4gICAgdmFsdWUgPSBtYXRjaGVkXG4gIH1cblxuICAvLyBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAgaWYgKHR5cGUodmFsdWUpID09PSAnYXJyYXknKSB7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhbHVlID0gdmFsdWUuam9pbignICcpXG4gIH1cblxuICByZXR1cm4gdmFsdWVcbn1cbiIsIi8qKlxuICogUmVjdXJzaXZlIGZsYXR0ZW4gZnVuY3Rpb24gd2l0aCBkZXB0aC5cbiAqXG4gKiBAcGFyYW0gIHtBcnJheX0gIGFycmF5XG4gKiBAcGFyYW0gIHtBcnJheX0gIHJlc3VsdFxuICogQHBhcmFtICB7TnVtYmVyfSBkZXB0aFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5EZXB0aCAoYXJyYXksIHJlc3VsdCwgZGVwdGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2ldXG5cbiAgICBpZiAoZGVwdGggPiAwICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmbGF0dGVuRGVwdGgodmFsdWUsIHJlc3VsdCwgZGVwdGggLSAxKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogUmVjdXJzaXZlIGZsYXR0ZW4gZnVuY3Rpb24uIE9taXR0aW5nIGRlcHRoIGlzIHNsaWdodGx5IGZhc3Rlci5cbiAqXG4gKiBAcGFyYW0gIHtBcnJheX0gYXJyYXlcbiAqIEBwYXJhbSAge0FycmF5fSByZXN1bHRcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBmbGF0dGVuRm9yZXZlciAoYXJyYXksIHJlc3VsdCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaV1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgZmxhdHRlbkZvcmV2ZXIodmFsdWUsIHJlc3VsdClcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEZsYXR0ZW4gYW4gYXJyYXksIHdpdGggdGhlIGFiaWxpdHkgdG8gZGVmaW5lIGEgZGVwdGguXG4gKlxuICogQHBhcmFtICB7QXJyYXl9ICBhcnJheVxuICogQHBhcmFtICB7TnVtYmVyfSBkZXB0aFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycmF5LCBkZXB0aCkge1xuICBpZiAoZGVwdGggPT0gbnVsbCkge1xuICAgIHJldHVybiBmbGF0dGVuRm9yZXZlcihhcnJheSwgW10pXG4gIH1cblxuICByZXR1cm4gZmxhdHRlbkRlcHRoKGFycmF5LCBbXSwgZGVwdGgpXG59XG4iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn07XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG4iLCIvKipcbiAqIEV4cG9zZSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKClgLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IGZhbGxiYWNrO1xuXG4vKipcbiAqIEZhbGxiYWNrIGltcGxlbWVudGF0aW9uLlxuICovXG5cbnZhciBwcmV2ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5mdW5jdGlvbiBmYWxsYmFjayhmbikge1xuICB2YXIgY3VyciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB2YXIgbXMgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyIC0gcHJldikpO1xuICB2YXIgcmVxID0gc2V0VGltZW91dChmbiwgbXMpO1xuICBwcmV2ID0gY3VycjtcbiAgcmV0dXJuIHJlcTtcbn1cblxuLyoqXG4gKiBDYW5jZWwuXG4gKi9cblxudmFyIGNhbmNlbCA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5jbGVhclRpbWVvdXQ7XG5cbmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oaWQpe1xuICBjYW5jZWwuY2FsbCh3aW5kb3csIGlkKTtcbn07XG4iLCIvKipcbiAqIHRvU3RyaW5nIHJlZi5cbiAqL1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFJldHVybiB0aGUgdHlwZSBvZiBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwpe1xuICBzd2l0Y2ggKHRvU3RyaW5nLmNhbGwodmFsKSkge1xuICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOiByZXR1cm4gJ2RhdGUnO1xuICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6IHJldHVybiAncmVnZXhwJztcbiAgICBjYXNlICdbb2JqZWN0IEFyZ3VtZW50c10nOiByZXR1cm4gJ2FyZ3VtZW50cyc7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOiByZXR1cm4gJ2FycmF5JztcbiAgICBjYXNlICdbb2JqZWN0IEVycm9yXSc6IHJldHVybiAnZXJyb3InO1xuICB9XG5cbiAgaWYgKHZhbCA9PT0gbnVsbCkgcmV0dXJuICdudWxsJztcbiAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gIGlmICh2YWwgIT09IHZhbCkgcmV0dXJuICduYW4nO1xuICBpZiAodmFsICYmIHZhbC5ub2RlVHlwZSA9PT0gMSkgcmV0dXJuICdlbGVtZW50JztcblxuICB2YWwgPSB2YWwudmFsdWVPZlxuICAgID8gdmFsLnZhbHVlT2YoKVxuICAgIDogT2JqZWN0LnByb3RvdHlwZS52YWx1ZU9mLmFwcGx5KHZhbClcblxuICByZXR1cm4gdHlwZW9mIHZhbDtcbn07XG4iLCJmdW5jdGlvbiBQb29sKHBhcmFtcykge1xyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHBhc3MgcGFyYW1ldGVycy4gRXhhbXBsZSAtPiBuZXcgUG9vbCh7IHRhZ05hbWU6IFxcXCJkaXZcXFwiIH0pXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgcGFyYW1zLnRhZ05hbWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHNwZWNpZnkgYSB0YWdOYW1lLiBFeGFtcGxlIC0+IG5ldyBQb29sKHsgdGFnTmFtZTogXFxcImRpdlxcXCIgfSlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdG9yYWdlID0gW107XHJcbiAgICB0aGlzLnRhZ05hbWUgPSBwYXJhbXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgdGhpcy5uYW1lc3BhY2UgPSBwYXJhbXMubmFtZXNwYWNlO1xyXG59XHJcblxyXG5Qb29sLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZWwpIHtcclxuICAgIGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09IHRoaXMudGFnTmFtZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5zdG9yYWdlLnB1c2goZWwpO1xyXG59O1xyXG5cclxuUG9vbC5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24oYXJndW1lbnQpIHtcclxuICAgIGlmICh0aGlzLnN0b3JhZ2UubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UucG9wKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Qb29sLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm5hbWVzcGFjZSkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModGhpcy5uYW1lc3BhY2UsIHRoaXMudGFnTmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnTmFtZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Qb29sLnByb3RvdHlwZS5hbGxvY2F0ZSA9IGZ1bmN0aW9uKHNpemUpIHtcclxuICAgIGlmICh0aGlzLnN0b3JhZ2UubGVuZ3RoID49IHNpemUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRpZmZlcmVuY2UgPSBzaXplIC0gdGhpcy5zdG9yYWdlLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHBvb2xBbGxvY0l0ZXIgPSAwOyBwb29sQWxsb2NJdGVyIDwgZGlmZmVyZW5jZTsgcG9vbEFsbG9jSXRlcisrKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnB1c2godGhpcy5jcmVhdGUoKSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQb29sO1xyXG59XHJcbiIsInZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGl0ZXJhdGl2ZWx5V2Fsa1xuXG5mdW5jdGlvbiBpdGVyYXRpdmVseVdhbGsobm9kZXMsIGNiKSB7XG4gICAgaWYgKCEoJ2xlbmd0aCcgaW4gbm9kZXMpKSB7XG4gICAgICAgIG5vZGVzID0gW25vZGVzXVxuICAgIH1cbiAgICBcbiAgICBub2RlcyA9IHNsaWNlLmNhbGwobm9kZXMpXG5cbiAgICB3aGlsZShub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBub2Rlcy5zaGlmdCgpLFxuICAgICAgICAgICAgcmV0ID0gY2Iobm9kZSlcblxuICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmV0XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS5jaGlsZE5vZGVzICYmIG5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5vZGVzID0gc2xpY2UuY2FsbChub2RlLmNoaWxkTm9kZXMpLmNvbmNhdChub2RlcylcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmRJbnRlcm5hbDMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbi9iaW5kSW50ZXJuYWwzJyk7XG5cbi8qKlxuICogIyBGb3IgRWFjaFxuICpcbiAqIEEgZmFzdCBgLmZvckVhY2goKWAgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtICB7QXJyYXl9ICAgIHN1YmplY3QgICAgIFRoZSBhcnJheSAob3IgYXJyYXktbGlrZSkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgICAgICAgIFRoZSB2aXNpdG9yIGZ1bmN0aW9uLlxuICogQHBhcmFtICB7T2JqZWN0fSAgIHRoaXNDb250ZXh0IFRoZSBjb250ZXh0IGZvciB0aGUgdmlzaXRvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmYXN0Rm9yRWFjaCAoc3ViamVjdCwgZm4sIHRoaXNDb250ZXh0KSB7XG4gIHZhciBsZW5ndGggPSBzdWJqZWN0Lmxlbmd0aCxcbiAgICAgIGl0ZXJhdG9yID0gdGhpc0NvbnRleHQgIT09IHVuZGVmaW5lZCA/IGJpbmRJbnRlcm5hbDMoZm4sIHRoaXNDb250ZXh0KSA6IGZuLFxuICAgICAgaTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaXRlcmF0b3Ioc3ViamVjdFtpXSwgaSwgc3ViamVjdCk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogIyBJbmRleCBPZlxuICpcbiAqIEEgZmFzdGVyIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZigpYCBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAcGFyYW0gIHtBcnJheX0gIHN1YmplY3QgICBUaGUgYXJyYXkgKG9yIGFycmF5LWxpa2UpIHRvIHNlYXJjaCB3aXRoaW4uXG4gKiBAcGFyYW0gIHttaXhlZH0gIHRhcmdldCAgICBUaGUgdGFyZ2V0IGl0ZW0gdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSAge051bWJlcn0gZnJvbUluZGV4IFRoZSBwb3NpdGlvbiB0byBzdGFydCBzZWFyY2hpbmcgZnJvbSwgaWYga25vd24uXG4gKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICAgICBUaGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBpbiB0aGUgc3ViamVjdCwgb3IgLTEgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmFzdEluZGV4T2YgKHN1YmplY3QsIHRhcmdldCwgZnJvbUluZGV4KSB7XG4gIHZhciBsZW5ndGggPSBzdWJqZWN0Lmxlbmd0aCxcbiAgICAgIGkgPSAwO1xuXG4gIGlmICh0eXBlb2YgZnJvbUluZGV4ID09PSAnbnVtYmVyJykge1xuICAgIGkgPSBmcm9tSW5kZXg7XG4gICAgaWYgKGkgPCAwKSB7XG4gICAgICBpICs9IGxlbmd0aDtcbiAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICBpID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN1YmplY3RbaV0gPT09IHRhcmdldCkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kSW50ZXJuYWw0ID0gcmVxdWlyZSgnLi4vZnVuY3Rpb24vYmluZEludGVybmFsNCcpO1xuXG4vKipcbiAqICMgUmVkdWNlXG4gKlxuICogQSBmYXN0IGAucmVkdWNlKClgIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge0FycmF5fSAgICBzdWJqZWN0ICAgICAgVGhlIGFycmF5IChvciBhcnJheS1saWtlKSB0byByZWR1Y2UuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgICAgICAgIFRoZSByZWR1Y2VyIGZ1bmN0aW9uLlxuICogQHBhcmFtICB7bWl4ZWR9ICAgIGluaXRpYWxWYWx1ZSBUaGUgaW5pdGlhbCB2YWx1ZSBmb3IgdGhlIHJlZHVjZXIsIGRlZmF1bHRzIHRvIHN1YmplY3RbMF0uXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgdGhpc0NvbnRleHQgIFRoZSBjb250ZXh0IGZvciB0aGUgcmVkdWNlci5cbiAqIEByZXR1cm4ge21peGVkfSAgICAgICAgICAgICAgICAgVGhlIGZpbmFsIHJlc3VsdC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmYXN0UmVkdWNlIChzdWJqZWN0LCBmbiwgaW5pdGlhbFZhbHVlLCB0aGlzQ29udGV4dCkge1xuICB2YXIgbGVuZ3RoID0gc3ViamVjdC5sZW5ndGgsXG4gICAgICBpdGVyYXRvciA9IHRoaXNDb250ZXh0ICE9PSB1bmRlZmluZWQgPyBiaW5kSW50ZXJuYWw0KGZuLCB0aGlzQ29udGV4dCkgOiBmbixcbiAgICAgIGksIHJlc3VsdDtcblxuICBpZiAoaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICBpID0gMTtcbiAgICByZXN1bHQgPSBzdWJqZWN0WzBdO1xuICB9XG4gIGVsc2Uge1xuICAgIGkgPSAwO1xuICAgIHJlc3VsdCA9IGluaXRpYWxWYWx1ZTtcbiAgfVxuXG4gIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHQgPSBpdGVyYXRvcihyZXN1bHQsIHN1YmplY3RbaV0sIGksIHN1YmplY3QpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoQXJyYXkgPSByZXF1aXJlKCcuL2FycmF5L2ZvckVhY2gnKSxcbiAgICBmb3JFYWNoT2JqZWN0ID0gcmVxdWlyZSgnLi9vYmplY3QvZm9yRWFjaCcpO1xuXG4vKipcbiAqICMgRm9yRWFjaFxuICpcbiAqIEEgZmFzdCBgLmZvckVhY2goKWAgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtICB7QXJyYXl8T2JqZWN0fSBzdWJqZWN0ICAgICBUaGUgYXJyYXkgb3Igb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgICAgZm4gICAgICAgICAgVGhlIHZpc2l0b3IgZnVuY3Rpb24uXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgIHRoaXNDb250ZXh0IFRoZSBjb250ZXh0IGZvciB0aGUgdmlzaXRvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmYXN0Rm9yRWFjaCAoc3ViamVjdCwgZm4sIHRoaXNDb250ZXh0KSB7XG4gIGlmIChzdWJqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gZm9yRWFjaEFycmF5KHN1YmplY3QsIGZuLCB0aGlzQ29udGV4dCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGZvckVhY2hPYmplY3Qoc3ViamVjdCwgZm4sIHRoaXNDb250ZXh0KTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgaGVscGVyIHRvIGJpbmQgYSBmdW5jdGlvbiBrbm93biB0byBoYXZlIDMgYXJndW1lbnRzXG4gKiB0byBhIGdpdmVuIGNvbnRleHQuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZEludGVybmFsMyAoZnVuYywgdGhpc0NvbnRleHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQ29udGV4dCwgYSwgYiwgYyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGhlbHBlciB0byBiaW5kIGEgZnVuY3Rpb24ga25vd24gdG8gaGF2ZSA0IGFyZ3VtZW50c1xuICogdG8gYSBnaXZlbiBjb250ZXh0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmRJbnRlcm5hbDQgKGZ1bmMsIHRoaXNDb250ZXh0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYywgZCkge1xuICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0NvbnRleHQsIGEsIGIsIGMsIGQpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBbmFsb2d1ZSBvZiBPYmplY3QuYXNzaWduKCkuXG4gKiBDb3BpZXMgcHJvcGVydGllcyBmcm9tIG9uZSBvciBtb3JlIHNvdXJjZSBvYmplY3RzIHRvXG4gKiBhIHRhcmdldCBvYmplY3QuIEV4aXN0aW5nIGtleXMgb24gdGhlIHRhcmdldCBvYmplY3Qgd2lsbCBiZSBvdmVyd3JpdHRlbi5cbiAqXG4gKiA+IE5vdGU6IFRoaXMgZGlmZmVycyBmcm9tIHNwZWMgaW4gc29tZSBpbXBvcnRhbnQgd2F5czpcbiAqID4gMS4gV2lsbCB0aHJvdyBpZiBwYXNzZWQgbm9uLW9iamVjdHMsIGluY2x1ZGluZyBgdW5kZWZpbmVkYCBvciBgbnVsbGAgdmFsdWVzLlxuICogPiAyLiBEb2VzIG5vdCBzdXBwb3J0IHRoZSBjdXJpb3VzIEV4Y2VwdGlvbiBoYW5kbGluZyBiZWhhdmlvciwgZXhjZXB0aW9ucyBhcmUgdGhyb3duIGltbWVkaWF0ZWx5LlxuICogPiBGb3IgbW9yZSBkZXRhaWxzLCBzZWU6XG4gKiA+IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbiAqXG4gKlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gdGFyZ2V0ICAgICAgVGhlIHRhcmdldCBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtICB7T2JqZWN0fSBzb3VyY2UsIC4uLiBUaGUgc291cmNlKHMpIHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICBUaGUgdXBkYXRlZCB0YXJnZXQgb2JqZWN0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZhc3RBc3NpZ24gKHRhcmdldCkge1xuICB2YXIgdG90YWxBcmdzID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgIHNvdXJjZSwgaSwgdG90YWxLZXlzLCBrZXlzLCBrZXksIGo7XG5cbiAgZm9yIChpID0gMTsgaSA8IHRvdGFsQXJnczsgaSsrKSB7XG4gICAgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgIGtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICAgIHRvdGFsS2V5cyA9IGtleXMubGVuZ3RoO1xuICAgIGZvciAoaiA9IDA7IGogPCB0b3RhbEtleXM7IGorKykge1xuICAgICAga2V5ID0ga2V5c1tqXTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZEludGVybmFsMyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9uL2JpbmRJbnRlcm5hbDMnKTtcblxuLyoqXG4gKiAjIEZvciBFYWNoXG4gKlxuICogQSBmYXN0IG9iamVjdCBgLmZvckVhY2goKWAgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSAgIHN1YmplY3QgICAgIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgICAgICAgIFRoZSB2aXNpdG9yIGZ1bmN0aW9uLlxuICogQHBhcmFtICB7T2JqZWN0fSAgIHRoaXNDb250ZXh0IFRoZSBjb250ZXh0IGZvciB0aGUgdmlzaXRvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmYXN0Rm9yRWFjaE9iamVjdCAoc3ViamVjdCwgZm4sIHRoaXNDb250ZXh0KSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3ViamVjdCksXG4gICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgIGl0ZXJhdG9yID0gdGhpc0NvbnRleHQgIT09IHVuZGVmaW5lZCA/IGJpbmRJbnRlcm5hbDMoZm4sIHRoaXNDb250ZXh0KSA6IGZuLFxuICAgICAga2V5LCBpO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIGl0ZXJhdG9yKHN1YmplY3Rba2V5XSwga2V5LCBzdWJqZWN0KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmRJbnRlcm5hbDQgPSByZXF1aXJlKCcuLi9mdW5jdGlvbi9iaW5kSW50ZXJuYWw0Jyk7XG5cbi8qKlxuICogIyBSZWR1Y2VcbiAqXG4gKiBBIGZhc3Qgb2JqZWN0IGAucmVkdWNlKClgIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gICBzdWJqZWN0ICAgICAgVGhlIG9iamVjdCB0byByZWR1Y2Ugb3Zlci5cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgICAgICAgVGhlIHJlZHVjZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0gIHttaXhlZH0gICAgaW5pdGlhbFZhbHVlIFRoZSBpbml0aWFsIHZhbHVlIGZvciB0aGUgcmVkdWNlciwgZGVmYXVsdHMgdG8gc3ViamVjdFswXS5cbiAqIEBwYXJhbSAge09iamVjdH0gICB0aGlzQ29udGV4dCAgVGhlIGNvbnRleHQgZm9yIHRoZSByZWR1Y2VyLlxuICogQHJldHVybiB7bWl4ZWR9ICAgICAgICAgICAgICAgICBUaGUgZmluYWwgcmVzdWx0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZhc3RSZWR1Y2VPYmplY3QgKHN1YmplY3QsIGZuLCBpbml0aWFsVmFsdWUsIHRoaXNDb250ZXh0KSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3ViamVjdCksXG4gICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgIGl0ZXJhdG9yID0gdGhpc0NvbnRleHQgIT09IHVuZGVmaW5lZCA/IGJpbmRJbnRlcm5hbDQoZm4sIHRoaXNDb250ZXh0KSA6IGZuLFxuICAgICAgaSwga2V5LCByZXN1bHQ7XG5cbiAgaWYgKGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaSA9IDE7XG4gICAgcmVzdWx0ID0gc3ViamVjdFtrZXlzWzBdXTtcbiAgfVxuICBlbHNlIHtcbiAgICBpID0gMDtcbiAgICByZXN1bHQgPSBpbml0aWFsVmFsdWU7XG4gIH1cblxuICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICByZXN1bHQgPSBpdGVyYXRvcihyZXN1bHQsIHN1YmplY3Rba2V5XSwga2V5LCBzdWJqZWN0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVkdWNlQXJyYXkgPSByZXF1aXJlKCcuL2FycmF5L3JlZHVjZScpLFxuICAgIHJlZHVjZU9iamVjdCA9IHJlcXVpcmUoJy4vb2JqZWN0L3JlZHVjZScpO1xuXG4vKipcbiAqICMgUmVkdWNlXG4gKlxuICogQSBmYXN0IGAucmVkdWNlKClgIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge0FycmF5fE9iamVjdH0gc3ViamVjdCAgICAgIFRoZSBhcnJheSBvciBvYmplY3QgdG8gcmVkdWNlIG92ZXIuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gICAgIGZuICAgICAgICAgICBUaGUgcmVkdWNlciBmdW5jdGlvbi5cbiAqIEBwYXJhbSAge21peGVkfSAgICAgICAgaW5pdGlhbFZhbHVlIFRoZSBpbml0aWFsIHZhbHVlIGZvciB0aGUgcmVkdWNlciwgZGVmYXVsdHMgdG8gc3ViamVjdFswXS5cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgdGhpc0NvbnRleHQgIFRoZSBjb250ZXh0IGZvciB0aGUgcmVkdWNlci5cbiAqIEByZXR1cm4ge0FycmF5fE9iamVjdH0gICAgICAgICAgICAgIFRoZSBhcnJheSBvciBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzdWx0cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmYXN0UmVkdWNlIChzdWJqZWN0LCBmbiwgaW5pdGlhbFZhbHVlLCB0aGlzQ29udGV4dCkge1xuICBpZiAoc3ViamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIHJlZHVjZUFycmF5KHN1YmplY3QsIGZuLCBpbml0aWFsVmFsdWUsIHRoaXNDb250ZXh0KTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gcmVkdWNlT2JqZWN0KHN1YmplY3QsIGZuLCBpbml0aWFsVmFsdWUsIHRoaXNDb250ZXh0KTtcbiAgfVxufTsiLCIvKiogZ2VuZXJhdGUgdW5pcXVlIGlkIGZvciBzZWxlY3RvciAqL1xyXG52YXIgY291bnRlciA9IERhdGUubm93KCkgJSAxZTk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFVpZCgpe1xyXG5cdHJldHVybiAoTWF0aC5yYW5kb20oKSAqIDFlOSA+Pj4gMCkgKyAoY291bnRlcisrKTtcclxufTsiLCIvKmdsb2JhbCB3aW5kb3cqL1xuXG4vKipcbiAqIENoZWNrIGlmIG9iamVjdCBpcyBkb20gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTm9kZSh2YWwpe1xuICBpZiAoIXZhbCB8fCB0eXBlb2YgdmFsICE9PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuICBpZiAod2luZG93ICYmICdvYmplY3QnID09IHR5cGVvZiB3aW5kb3cuTm9kZSkgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIHdpbmRvdy5Ob2RlO1xuICByZXR1cm4gJ251bWJlcicgPT0gdHlwZW9mIHZhbC5ub2RlVHlwZSAmJiAnc3RyaW5nJyA9PSB0eXBlb2YgdmFsLm5vZGVOYW1lO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpc1Byb21pc2U7XG5cbmZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuIiwiKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qaXN0YW5idWwgaWdub3JlIG5leHQ6Y2FudCB0ZXN0Ki9cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICByb290Lm9iamVjdFBhdGggPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXJcbiAgICB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsXG4gICAgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKXtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgaW4gdmFsdWUpIHtcbiAgICAgICAgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBpKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9TdHJpbmcodHlwZSl7XG4gICAgcmV0dXJuIHRvU3RyLmNhbGwodHlwZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSl7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdG9TdHJpbmcodmFsdWUpID09PSBcIltvYmplY3QgTnVtYmVyXVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdHJpbmcob2JqKXtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdG9TdHJpbmcob2JqKSA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nKG9iaikgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG4gIH1cblxuICBmdW5jdGlvbiBpc0FycmF5KG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoubGVuZ3RoID09PSAnbnVtYmVyJyAmJiB0b1N0cmluZyhvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNCb29sZWFuKG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB0b1N0cmluZyhvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRLZXkoa2V5KXtcbiAgICB2YXIgaW50S2V5ID0gcGFyc2VJbnQoa2V5KTtcbiAgICBpZiAoaW50S2V5LnRvU3RyaW5nKCkgPT09IGtleSkge1xuICAgICAgcmV0dXJuIGludEtleTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2Upe1xuICAgIGlmIChpc051bWJlcihwYXRoKSkge1xuICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICB9XG4gICAgaWYgKGlzRW1wdHkocGF0aCkpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmIChpc1N0cmluZyhwYXRoKSkge1xuICAgICAgcmV0dXJuIHNldChvYmosIHBhdGguc3BsaXQoJy4nKS5tYXAoZ2V0S2V5KSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgfVxuICAgIHZhciBjdXJyZW50UGF0aCA9IHBhdGhbMF07XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBvbGRWYWwgPSBvYmpbY3VycmVudFBhdGhdO1xuICAgICAgaWYgKG9sZFZhbCA9PT0gdm9pZCAwIHx8ICFkb05vdFJlcGxhY2UpIHtcbiAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9sZFZhbDtcbiAgICB9XG5cbiAgICBpZiAob2JqW2N1cnJlbnRQYXRoXSA9PT0gdm9pZCAwKSB7XG4gICAgICAvL2NoZWNrIGlmIHdlIGFzc3VtZSBhbiBhcnJheVxuICAgICAgaWYoaXNOdW1iZXIocGF0aFsxXSkpIHtcbiAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWwob2JqLCBwYXRoKSB7XG4gICAgaWYgKGlzTnVtYmVyKHBhdGgpKSB7XG4gICAgICBwYXRoID0gW3BhdGhdO1xuICAgIH1cblxuICAgIGlmIChpc0VtcHR5KG9iaikpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgaWYgKGlzRW1wdHkocGF0aCkpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmKGlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICByZXR1cm4gZGVsKG9iaiwgcGF0aC5zcGxpdCgnLicpKTtcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudFBhdGggPSBnZXRLZXkocGF0aFswXSk7XG4gICAgdmFyIG9sZFZhbCA9IG9ialtjdXJyZW50UGF0aF07XG5cbiAgICBpZihwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgaWYgKG9sZFZhbCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICBvYmouc3BsaWNlKGN1cnJlbnRQYXRoLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgb2JqW2N1cnJlbnRQYXRoXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob2JqW2N1cnJlbnRQYXRoXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBkZWwob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciBvYmplY3RQYXRoID0ge307XG5cbiAgb2JqZWN0UGF0aC5oYXMgPSBmdW5jdGlvbiAob2JqLCBwYXRoKSB7XG4gICAgaWYgKGlzRW1wdHkob2JqKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpc051bWJlcihwYXRoKSkge1xuICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICBwYXRoID0gcGF0aC5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIGlmIChpc0VtcHR5KHBhdGgpIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaiA9IHBhdGhbaV07XG4gICAgICBpZiAoKGlzT2JqZWN0KG9iaikgfHwgaXNBcnJheShvYmopKSAmJiBfaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGopKSB7XG4gICAgICAgIG9iaiA9IG9ialtqXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBvYmplY3RQYXRoLmVuc3VyZUV4aXN0cyA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlKXtcbiAgICByZXR1cm4gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIHRydWUpO1xuICB9O1xuXG4gIG9iamVjdFBhdGguc2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSl7XG4gICAgcmV0dXJuIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICB9O1xuXG4gIG9iamVjdFBhdGguaW5zZXJ0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUsIGF0KXtcbiAgICB2YXIgYXJyID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKTtcbiAgICBhdCA9IH5+YXQ7XG4gICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgIGFyciA9IFtdO1xuICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgIH1cbiAgICBhcnIuc3BsaWNlKGF0LCAwLCB2YWx1ZSk7XG4gIH07XG5cbiAgb2JqZWN0UGF0aC5lbXB0eSA9IGZ1bmN0aW9uKG9iaiwgcGF0aCkge1xuICAgIGlmIChpc0VtcHR5KHBhdGgpKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBpZiAoaXNFbXB0eShvYmopKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZSwgaTtcbiAgICBpZiAoISh2YWx1ZSA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCkpKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsICcnKTtcbiAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgMCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUubGVuZ3RoID0gMDtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgZm9yIChpIGluIHZhbHVlKSB7XG4gICAgICAgIGlmIChfaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaSkpIHtcbiAgICAgICAgICBkZWxldGUgdmFsdWVbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgbnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIG9iamVjdFBhdGgucHVzaCA9IGZ1bmN0aW9uIChvYmosIHBhdGggLyosIHZhbHVlcyAqLyl7XG4gICAgdmFyIGFyciA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCk7XG4gICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgIGFyciA9IFtdO1xuICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgIH1cblxuICAgIGFyci5wdXNoLmFwcGx5KGFyciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSk7XG4gIH07XG5cbiAgb2JqZWN0UGF0aC5jb2FsZXNjZSA9IGZ1bmN0aW9uIChvYmosIHBhdGhzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICB2YXIgdmFsdWU7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGF0aHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmICgodmFsdWUgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGhzW2ldKSkgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgfTtcblxuICBvYmplY3RQYXRoLmdldCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIGRlZmF1bHRWYWx1ZSl7XG4gICAgaWYgKGlzTnVtYmVyKHBhdGgpKSB7XG4gICAgICBwYXRoID0gW3BhdGhdO1xuICAgIH1cbiAgICBpZiAoaXNFbXB0eShwYXRoKSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKGlzRW1wdHkob2JqKSkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoLnNwbGl0KCcuJyksIGRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRQYXRoID0gZ2V0S2V5KHBhdGhbMF0pO1xuXG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAob2JqW2N1cnJlbnRQYXRoXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW2N1cnJlbnRQYXRoXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgZGVmYXVsdFZhbHVlKTtcbiAgfTtcblxuICBvYmplY3RQYXRoLmRlbCA9IGZ1bmN0aW9uKG9iaiwgcGF0aCkge1xuICAgIHJldHVybiBkZWwob2JqLCBwYXRoKTtcbiAgfTtcblxuICByZXR1cm4gb2JqZWN0UGF0aDtcbn0pO1xuIiwiLyoqXG4gKiBNb2R1bGUgRGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciByYWYgPSByZXF1aXJlKCdyYWYnKTtcblxuLyoqXG4gKiBFeHBvcnQgYHRocm90dGxlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuXG4vKipcbiAqIEV4ZWN1dGVzIGEgZnVuY3Rpb24gYXQgbW9zdCBvbmNlIHBlciBhbmltYXRpb24gZnJhbWUuIEtpbmQgb2YgbGlrZVxuICogdGhyb3R0bGUsIGJ1dCBpdCB0aHJvdHRsZXMgYXQgfjYwSHouXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgRnVuY3Rpb24gdG8gdGhyb3R0bGUgb25jZSBwZXIgYW5pbWF0aW9uIGZyYW1lXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiB0aHJvdHRsZShmbikge1xuICB2YXIgcnRuO1xuICB2YXIgaWdub3JpbmcgPSBmYWxzZTtcblxuICByZXR1cm4gZnVuY3Rpb24gcXVldWUoKSB7XG4gICAgaWYgKGlnbm9yaW5nKSByZXR1cm4gcnRuO1xuICAgIGlnbm9yaW5nID0gdHJ1ZTtcblxuICAgIHJhZihmdW5jdGlvbigpIHtcbiAgICAgIGlnbm9yaW5nID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBydG4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBydG47XG4gIH07XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9zbGljZWQnKTtcbiIsIlxuLyoqXG4gKiBBbiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpIGFsdGVybmF0aXZlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFyZ3Mgc29tZXRoaW5nIHdpdGggYSBsZW5ndGhcbiAqIEBwYXJhbSB7TnVtYmVyfSBzbGljZVxuICogQHBhcmFtIHtOdW1iZXJ9IHNsaWNlRW5kXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3MsIHNsaWNlLCBzbGljZUVuZCkge1xuICB2YXIgcmV0ID0gW107XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcblxuICBpZiAoMCA9PT0gbGVuKSByZXR1cm4gcmV0O1xuXG4gIHZhciBzdGFydCA9IHNsaWNlIDwgMFxuICAgID8gTWF0aC5tYXgoMCwgc2xpY2UgKyBsZW4pXG4gICAgOiBzbGljZSB8fCAwO1xuXG4gIGlmIChzbGljZUVuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuID0gc2xpY2VFbmQgPCAwXG4gICAgICA/IHNsaWNlRW5kICsgbGVuXG4gICAgICA6IHNsaWNlRW5kXG4gIH1cblxuICB3aGlsZSAobGVuLS0gPiBzdGFydCkge1xuICAgIHJldFtsZW4gLSBzdGFydF0gPSBhcmdzW2xlbl07XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFNvdW5kQ2xvdWQgKGNsaWVudElkKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNvdW5kQ2xvdWQpKSB7XG4gICAgICAgIHJldHVybiBuZXcgU291bmRDbG91ZChjbGllbnRJZCk7XG4gICAgfVxuXG4gICAgaWYgKCFjbGllbnRJZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvdW5kQ2xvdWQgQVBJIGNsaWVudElkIGlzIHJlcXVpcmVkLCBnZXQgaXQgLSBodHRwczovL2RldmVsb3BlcnMuc291bmRjbG91ZC5jb20vJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgICB0aGlzLl9jbGllbnRJZCA9IGNsaWVudElkO1xuICAgIHRoaXMuX2Jhc2VVcmwgPSAnaHR0cDovL2FwaS5zb3VuZGNsb3VkLmNvbSc7XG5cbiAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcblxuICAgIHRoaXMuYXVkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xufVxuXG5Tb3VuZENsb3VkLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvdW5kQ2xvdWQgdHJhY2sgb3IgcGxheWxpc3QgdXJsIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgdXJsID0gdGhpcy5fYmFzZVVybCsnL3Jlc29sdmUuanNvbj91cmw9Jyt1cmwrJyZjbGllbnRfaWQ9Jyt0aGlzLl9jbGllbnRJZDtcblxuICAgIHRoaXMuX2pzb25wKHVybCwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEudHJhY2tzKSB7XG4gICAgICAgICAgICB0aGlzLl9wbGF5bGlzdCA9IGRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90cmFjayA9IGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZGF0YS5kdXJhdGlvbi8xMDAwOyAvLyBjb252ZXJ0IHRvIHNlY29uZHNcbiAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbn07XG5cblNvdW5kQ2xvdWQucHJvdG90eXBlLl9qc29ucCA9IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXSB8fCBkb2N1bWVudC5oZWFkO1xuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgIHZhciBpZCA9ICdqc29ucF9jYWxsYmFja18nK01hdGgucm91bmQoMTAwMDAwKk1hdGgucmFuZG9tKCkpO1xuICAgIHdpbmRvd1tpZF0gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoc2NyaXB0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93W2lkXSA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9O1xuXG4gICAgc2NyaXB0LnNyYyA9IHVybCArICh1cmwuaW5kZXhPZignPycpID49IDAgPyAnJicgOiAnPycpICsgJ2NhbGxiYWNrPScgKyBpZDtcbiAgICB0YXJnZXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCB0YXJnZXQpO1xufTtcblxuU291bmRDbG91ZC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZSwgZm4pIHtcbiAgICB0aGlzLl9ldmVudHNbZV0gPSBmbjtcbiAgICB0aGlzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoZSwgZm4sIGZhbHNlKTtcbn07XG5cblNvdW5kQ2xvdWQucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChlLCBmbikge1xuICAgIHRoaXMuX2V2ZW50c1tlXSA9IG51bGw7XG4gICAgdGhpcy5hdWRpby5yZW1vdmVFdmVudExpc3RlbmVyKGUsIGZuKTtcbn07XG5cblNvdW5kQ2xvdWQucHJvdG90eXBlLnVuYmluZEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBlIGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgICB2YXIgZm4gPSB0aGlzLl9ldmVudHNbZV07XG4gICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgdGhpcy5vZmYoZSwgZm4pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuU291bmRDbG91ZC5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uIChzdHJlYW1VcmwpIHtcbiAgICB0aGlzLl90cmFjayA9IHtzdHJlYW1fdXJsOiBzdHJlYW1Vcmx9O1xuICAgIHRoaXMuYXVkaW8uc3JjID0gc3RyZWFtVXJsKyc/Y2xpZW50X2lkPScrdGhpcy5fY2xpZW50SWQ7XG59O1xuXG5Tb3VuZENsb3VkLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgc3JjO1xuXG4gICAgaWYgKG9wdGlvbnMuc3RyZWFtVXJsKSB7XG4gICAgICAgIHNyYyA9IG9wdGlvbnMuc3RyZWFtVXJsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcGxheWxpc3QpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuX3BsYXlsaXN0LnRyYWNrcy5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYXlsaXN0SW5kZXggPSBvcHRpb25zLnBsYXlsaXN0SW5kZXggfHwgMDtcblxuICAgICAgICAgICAgLy8gYmUgc2lsZW50IGlmIGluZGV4IGlzIG91dCBvZiByYW5nZVxuICAgICAgICAgICAgaWYgKHRoaXMuX3BsYXlsaXN0SW5kZXggPj0gbGVuZ3RoIHx8IHRoaXMuX3BsYXlsaXN0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWxpc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3JjID0gdGhpcy5fcGxheWxpc3QudHJhY2tzW3RoaXMuX3BsYXlsaXN0SW5kZXhdLnN0cmVhbV91cmw7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX3RyYWNrKSB7XG4gICAgICAgIHNyYyA9IHRoaXMuX3RyYWNrLnN0cmVhbV91cmw7XG4gICAgfVxuXG4gICAgaWYgKCFzcmMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyB0cmFja3MgdG8gcGxheSwgdXNlIGBzdHJlYW1VcmxgIG9wdGlvbiBvciBgbG9hZGAgbWV0aG9kJyk7XG4gICAgfVxuXG4gICAgc3JjICs9ICc/Y2xpZW50X2lkPScrdGhpcy5fY2xpZW50SWQ7XG5cbiAgICBpZiAoc3JjICE9PSB0aGlzLmF1ZGlvLnNyYykge1xuICAgICAgICB0aGlzLmF1ZGlvLnNyYyA9IHNyYztcbiAgICB9XG5cbiAgICB0aGlzLnBsYXlpbmcgPSBzcmM7XG4gICAgdGhpcy5hdWRpby5wbGF5KCk7XG59O1xuXG5Tb3VuZENsb3VkLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmF1ZGlvLnBhdXNlKCk7XG4gICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XG59O1xuXG5Tb3VuZENsb3VkLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXVkaW8ucGF1c2UoKTtcbiAgICB0aGlzLmF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbn07XG5cblNvdW5kQ2xvdWQucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRyYWNrc0xlbmd0aCA9IHRoaXMuX3BsYXlsaXN0LnRyYWNrcy5sZW5ndGg7XG4gICAgaWYgKHRoaXMuX3BsYXlsaXN0SW5kZXggPj0gdHJhY2tzTGVuZ3RoLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcGxheWxpc3QgJiYgdHJhY2tzTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucGxheSh7cGxheWxpc3RJbmRleDogKyt0aGlzLl9wbGF5bGlzdEluZGV4fSk7XG4gICAgfVxufTtcblxuU291bmRDbG91ZC5wcm90b3R5cGUucHJldmlvdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3BsYXlsaXN0SW5kZXggPD0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9wbGF5bGlzdCAmJiB0aGlzLl9wbGF5bGlzdC50cmFja3MubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucGxheSh7cGxheWxpc3RJbmRleDogLS10aGlzLl9wbGF5bGlzdEluZGV4fSk7XG4gICAgfVxufTtcblxuU291bmRDbG91ZC5wcm90b3R5cGUuc2VlayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCF0aGlzLmF1ZGlvLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgcGVyY2VudCA9IGUub2Zmc2V0WCAvIGUudGFyZ2V0Lm9mZnNldFdpZHRoIHx8IChlLmxheWVyWCAtIGUudGFyZ2V0Lm9mZnNldExlZnQpIC8gZS50YXJnZXQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5hdWRpby5jdXJyZW50VGltZSA9IHBlcmNlbnQgKiAodGhpcy5hdWRpby5kdXJhdGlvbiB8fCAwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU291bmRDbG91ZDtcbiIsIi8qKiBAanN4IGRla3UuZG9tICovXG5cbmltcG9ydCBkZWt1IGZyb20gJ2Rla3UnO1xuXG5jb25zdCBpY29uUHJvcFR5cGVzID0ge1xuICAgIG9uQ2xpY2s6IHtcbiAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJyxcbiAgICAgICAgb3B0aW9uYWw6IHRydWVcbiAgICB9XG59O1xuXG4vLyBTb3VuZENsb3VkIExvZ29cbmNvbnN0IFNvdW5kQ2xvdWRMb2dvU1ZHID0ge1xuICAgIHByb3BUeXBlczogaWNvblByb3BUeXBlcyxcblxuICAgIHNob3VsZFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICByZW5kZXIoY29tcG9uZW50KSB7XG4gICAgICAgIGNvbnN0IHsgcHJvcHMgfSA9IGNvbXBvbmVudDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIGNsYXNzPVwic2Itc291bmRwbGF5ZXItd2lkZ2V0LWNvdmVyLWxvZ29cIlxuICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMC41MTcgMy43NDJjLS4zMjMgMC0uNDkuMzYzLS40OS41ODIgMCAwLS4yNDQgMy41OTEtLjI0NCA0LjY0MSAwIDEuNjAyLjE1IDIuNjIxLjE1IDIuNjIxIDAgLjIyMi4yNjEuNDAxLjU4NC40MDEuMzIxIDAgLjUxOS0uMTc5LjUxOS0uNDAxIDAgMCAuMzk4LTEuMDM4LjM5OC0yLjYzOSAwLTEuODM3LS4xNTMtNC4xMjctLjI4NC00LjU5Mi0uMTEyLS4zOTUtLjMxMy0uNjEzLS42MzMtLjYxM3ptLTEuOTk2LjI2OGMtLjMyMyAwLS40OS4zNjMtLjQ5LjU4MiAwIDAtLjI0NCAzLjMyMi0uMjQ0IDQuMzcyIDAgMS42MDIuMTE5IDIuNjIxLjExOSAyLjYyMSAwIC4yMjIuMjYuNDAxLjU4NC40MDEuMzIxIDAgLjU4MS0uMTc5LjU4MS0uNDAxIDAgMCAuMDgxLTEuMDA3LjA4MS0yLjYwOCAwLTEuODM3LS4yMDYtNC4zODYtLjIwNi00LjM4NiAwLS4yMTgtLjEwNC0uNTgxLS40MjUtLjU4MXptLTIuMDIxIDEuNzI5Yy0uMzI0IDAtLjQ5LjM2Mi0uNDkuNTgyIDAgMC0uMjcyIDEuNTk0LS4yNzIgMi42NDQgMCAxLjYwMi4xNzkgMi41NTkuMTc5IDIuNTU5IDAgLjIyMi4yMjkuNDYzLjU1Mi40NjMuMzIxIDAgLjUxOS0uMjQxLjUxOS0uNDYzIDAgMCAuMTktLjk0NC4xOS0yLjU0NiAwLTEuODM3LS4yNTMtMi42NTctLjI1My0yLjY1NyAwLS4yMi0uMTA0LS41ODItLjQyNS0uNTgyem0tMi4wNDYtLjM1OGMtLjMyMyAwLS40OS4zNjMtLjQ5LjU4MiAwIDAtLjE2MiAxLjkyLS4xNjIgMi45NyAwIDEuNjAyLjA2OSAyLjQ5Ni4wNjkgMi40OTYgMCAuMjIyLjI2LjU1Ny41ODQuNTU3LjMyMSAwIC41ODEtLjMwNC41ODEtLjUyNiAwIDAgLjE0My0uOTM2LjE0My0yLjUzOCAwLTEuODM3LS4yMDYtMi45Ni0uMjA2LTIuOTYgMC0uMjE4LS4xOTgtLjU4MS0uNTE5LS41ODF6bS0yLjE2OSAxLjQ4MmMtLjI3MiAwLS4yMzIuMjE4LS4yMzIuMjE4djMuOTgycy0uMDQuMzM1LjIzMi4zMzVjLjM1MSAwIC43MTYtLjgzMi43MTYtMi4zNDggMC0xLjI0NS0uNDM2LTIuMTg3LS43MTYtMi4xODd6bTE4LjcxNS0uOTc2Yy0uMjg5IDAtLjU2Ny4wNDItLjgzMi4xMTYtLjQxNy0yLjI2Ni0yLjgwNi0zLjk4OS01LjI2My0zLjk4OS0xLjEyNyAwLTIuMDk1LjcwNS0yLjkzMSAxLjMxNnY4LjE2czAgLjQ4NC41LjQ4NGg4LjUyNmMxLjY1NSAwIDMtMS41NSAzLTMuMTU1IDAtMS42MDctMS4zNDYtMi45MzItMy0yLjkzMnptMTAuMTcuODU3Yy0xLjA3Ny0uMjUzLTEuMzY4LS4zODktMS4zNjgtLjgxNSAwLS4zLjI0Mi0uNjExLjk3LS42MTEuNjIxIDAgMS4xMDYuMjUzIDEuNTQyLjY5OWwuOTgxLS45NTFjLS42NDEtLjY2OS0xLjQxNy0xLjA2Ny0yLjQ3NC0xLjA2Ny0xLjMzOSAwLTIuNDI1Ljc1Ny0yLjQyNSAxLjk5IDAgMS4zMzguODczIDEuNzM2IDIuMTI0IDIuMDI2IDEuMjgxLjI5MSAxLjUxMy40ODYgMS41MTMuOTIzIDAgLjUxNC0uMzc5LjczOC0xLjE4NC43MzgtLjY1IDAtMS4yNi0uMjIzLTEuNzM2LS43NzdsLS45OC44NzNjLjUxNC43NTcgMS41MDQgMS4yMzIgMi42MzkgMS4yMzIgMS44NTMgMCAyLjY2OC0uODczIDIuNjY4LTIuMTYzIDAtMS40NzctMS4xOTMtMS44NDUtMi4yNy0yLjA5N3ptNi44MDMtMi43NDVjLTEuODUzIDAtMi45NDkgMS40MzUtMi45NDkgMy41MDJzMS4wOTYgMy41MDEgMi45NDkgMy41MDFjMS44NTIgMCAyLjk0OS0xLjQzNCAyLjk0OS0zLjUwMXMtMS4wOTYtMy41MDItMi45NDktMy41MDJ6bTAgNS42NTVjLTEuMDk3IDAtMS41NTMtLjk0MS0xLjU1My0yLjE1MyAwLTEuMjEzLjQ1Ni0yLjE1MyAxLjU1My0yLjE1MyAxLjA5NiAwIDEuNTUxLjk0IDEuNTUxIDIuMTUzLjAwMSAxLjIxMy0uNDU0IDIuMTUzLTEuNTUxIDIuMTUzem04LjkzOS0xLjczNmMwIDEuMDg2LS41MzMgMS43NTYtMS4zOTYgMS43NTYtLjg2NCAwLTEuMzg4LS42ODktMS4zODgtMS43NzV2LTMuODk3aC0xLjM1OHYzLjkxNmMwIDEuOTc4IDEuMTA2IDMuMDg0IDIuNzQ2IDMuMDg0IDEuNzI2IDAgMi43NTQtMS4xMzYgMi43NTQtMy4xMDN2LTMuODk3aC0xLjM1OHYzLjkxNnptOC4xNDItLjg5bC4wMTkgMS40ODVjLS4wODctLjE3NC0uMzEtLjUxNS0uNDc1LS43NjhsLTIuNzAzLTMuNjkyaC0xLjM2MnY2Ljg5NGgxLjQwMXYtMi45ODhsLS4wMi0xLjQ4NGMuMDg4LjE3NS4zMTEuNTE0LjQ3NS43NjdsMi43OSAzLjcwNWgxLjIxM3YtNi44OTRoLTEuMzM5djIuOTc1em01Ljg5NS0yLjkyM2gtMi4xMjR2Ni43OTFoMi4wMjdjMS43NDYgMCAzLjQ3NC0xLjAxIDMuNDc0LTMuMzk1IDAtMi40ODQtMS40MzctMy4zOTYtMy4zNzctMy4zOTZ6bS0uMDk3IDUuNDcyaC0uNjd2LTQuMTUyaC43MTljMS40MzYgMCAyLjAyOC42ODggMi4wMjggMi4wNzYgMCAxLjI0Mi0uNjUxIDIuMDc2LTIuMDc3IDIuMDc2em03LjkwOS00LjIyOWMuNjExIDAgMSAuMjcxIDEuMjQyLjczN2wxLjI2LS41ODJjLS40MjYtLjg4My0xLjIwMi0xLjUwMy0yLjQ4My0xLjUwMy0xLjc3NSAwLTMuMDE2IDEuNDM1LTMuMDE2IDMuNTAyIDAgMi4xNDMgMS4xOTEgMy41MDEgMi45NjggMy41MDEgMS4yMzIgMCAyLjA0Ny0uNTcyIDIuNTEzLTEuNTMzbC0xLjE0NS0uNjhjLS4zNTguNjAyLS43MTguODY0LTEuMzI5Ljg2NC0xLjAxOSAwLTEuNjExLS45MzItMS42MTEtMi4xNTMtLjAwMS0xLjI2MS41ODMtMi4xNTMgMS42MDEtMi4xNTN6bTUuMTctMS4xOTJoLTEuMzU5djYuNzkxaDQuMDgzdi0xLjMzOGgtMi43MjR2LTUuNDUzem02LjM5Ni0uMTU3Yy0xLjg1NCAwLTIuOTQ5IDEuNDM1LTIuOTQ5IDMuNTAyczEuMDk1IDMuNTAxIDIuOTQ5IDMuNTAxYzEuODUzIDAgMi45NS0xLjQzNCAyLjk1LTMuNTAxcy0xLjA5Ny0zLjUwMi0yLjk1LTMuNTAyem0wIDUuNjU1Yy0xLjA5NyAwLTEuNTUzLS45NDEtMS41NTMtMi4xNTMgMC0xLjIxMy40NTYtMi4xNTMgMS41NTMtMi4xNTMgMS4wOTUgMCAxLjU1Ljk0IDEuNTUgMi4xNTMuMDAxIDEuMjEzLS40NTQgMi4xNTMtMS41NSAyLjE1M3ptOC41NTctMS43MzZjMCAxLjA4Ni0uNTMyIDEuNzU2LTEuMzk2IDEuNzU2LS44NjQgMC0xLjM4OC0uNjg5LTEuMzg4LTEuNzc1di0zLjc5NGgtMS4zNTh2My44MTNjMCAxLjk3OCAxLjEwNiAzLjA4NCAyLjc0NiAzLjA4NCAxLjcyNiAwIDIuNzU1LTEuMTM2IDIuNzU1LTMuMTAzdi0zLjc5NGgtMS4zNnYzLjgxM3ptNS40NDktMy45MDdoLTIuMzE4djYuOTc4aDIuMjExYzEuOTA4IDAgMy43ODktMS4wMzcgMy43ODktMy40ODkgMC0yLjU1Mi0xLjU2NS0zLjQ4OS0zLjY4Mi0zLjQ4OXptLS4xMDggNS42MjNoLS43Mjl2LTQuMjY2aC43ODNjMS41NjUgMCAyLjIxLjcwNiAyLjIxIDIuMTMzLjAwMSAxLjI3Ni0uNzA3IDIuMTMzLTIuMjY0IDIuMTMzelwiIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG4vLyBQbGF5ZXIgQnV0dG9uIEljb25zXG5jb25zdCBCdXR0b25JY29uU1ZHID0ge1xuICAgIHByb3BUeXBlczogaWNvblByb3BUeXBlcyxcblxuICAgIHJlbmRlcihjb21wb25lbnQpIHtcbiAgICAgICAgY29uc3QgeyBwcm9wcyB9ID0gY29tcG9uZW50O1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJzYi1zb3VuZHBsYXllci13aWRnZXQtYnV0dG9uLWljb25cIlxuICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMzIgMzJcIlxuICAgICAgICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICk7XG4gICAgfVxufTtcblxuLy8gfD4gUGxheVxuY29uc3QgUGxheUljb25TVkcgPSB7XG4gICAgcHJvcFR5cGVzOiBpY29uUHJvcFR5cGVzLFxuXG4gICAgc2hvdWxkVXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHJlbmRlcihjb21wb25lbnQpIHtcbiAgICAgICAgY29uc3QgeyBwcm9wcyB9ID0gY29tcG9uZW50O1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QnV0dG9uSWNvblNWRyB7Li4ucHJvcHN9PlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMCAwIEwzMiAxNiBMMCAzMiB6XCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uSWNvblNWRz5cbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG4vLyB8fCBQYXVzZVxuY29uc3QgUGF1c2VJY29uU1ZHID0ge1xuICAgIHByb3BUeXBlczogaWNvblByb3BUeXBlcyxcblxuICAgIHNob3VsZFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICByZW5kZXIoY29tcG9uZW50KSB7XG4gICAgICAgIGNvbnN0IHsgcHJvcHMgfSA9IGNvbXBvbmVudDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEJ1dHRvbkljb25TVkcgey4uLnByb3BzfT5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAgMCBIMTIgVjMyIEgwIHogTTIwIDAgSDMyIFYzMiBIMjAgelwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbkljb25TVkc+XG4gICAgICAgICk7XG4gICAgfVxufTtcblxuLy8gfD58IE5leHRcbmNvbnN0IE5leHRJY29uU1ZHID0ge1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBvbkNsaWNrOiB7XG4gICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICAgICAgICAgICAgb3B0aW9uYWw6IHRydWVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG91bGRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgcmVuZGVyKGNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCB7IHByb3BzIH0gPSBjb21wb25lbnQ7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCdXR0b25JY29uU1ZHIHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk00IDQgTDI0IDE0IFY0IEgyOCBWMjggSDI0IFYxOCBMNCAyOCB6IFwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbkljb25TVkc+XG4gICAgICAgICk7XG4gICAgfVxufTtcblxuLy8gfDx8IFByZXZcbmNvbnN0IFByZXZJY29uU1ZHID0ge1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBvbkNsaWNrOiB7XG4gICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nLFxuICAgICAgICAgICAgb3B0aW9uYWw6IHRydWVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG91bGRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgcmVuZGVyKGNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCB7IHByb3BzIH0gPSBjb21wb25lbnQ7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCdXR0b25JY29uU1ZHIHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk00IDQgSDggVjE0IEwyOCA0IFYyOCBMOCAxOCBWMjggSDQgeiBcIiAvPlxuICAgICAgICAgICAgPC9CdXR0b25JY29uU1ZHPlxuICAgICAgICApO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBTb3VuZENsb3VkTG9nb1NWRyxcbiAgICBQbGF5SWNvblNWRyxcbiAgICBQYXVzZUljb25TVkcsXG4gICAgTmV4dEljb25TVkcsXG4gICAgUHJldkljb25TVkdcbn07XG4iLCIvKiogQGpzeCBkZWt1LmRvbSAqL1xuXG5pbXBvcnQgZGVrdSBmcm9tICdkZWt1JztcbmltcG9ydCBTb3VuZENsb3VkQXVkaW8gZnJvbSAnc291bmRjbG91ZC1hdWRpbyc7XG5cbmltcG9ydCB7IFBsYXlJY29uU1ZHLCBQYXVzZUljb25TVkcgfSBmcm9tICcuL0ljb25zJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlZmF1bHRQcm9wczoge1xuICAgICAgICBwbGF5aW5nOiBmYWxzZSxcbiAgICAgICAgc2Vla2luZzogZmFsc2VcbiAgICB9LFxuXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIHBsYXlpbmc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIG9wdGlvbmFsOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHNlZWtpbmc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIG9wdGlvbmFsOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHNvdW5kQ2xvdWRBdWRpbzogZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiAocHJvcCBpbnN0YW5jZW9mIFNvdW5kQ2xvdWRBdWRpbyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyKGNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCB7IHByb3BzIH0gPSBjb21wb25lbnQ7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2sgKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgeyBwbGF5aW5nLCBzb3VuZENsb3VkQXVkaW8gfSA9IHByb3BzO1xuXG4gICAgICAgICAgICBpZiAoIXBsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICBzb3VuZENsb3VkQXVkaW8gJiYgc291bmRDbG91ZEF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc291bmRDbG91ZEF1ZGlvICYmIHNvdW5kQ2xvdWRBdWRpby5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzYi1zb3VuZHBsYXllci13aWRnZXQtcGxheVwiIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICB7IXByb3BzLnBsYXlpbmcgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxQbGF5SWNvblNWRyBvbkNsaWNrPXtoYW5kbGVDbGlja30gLz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8UGF1c2VJY29uU1ZHIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfSAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59O1xuIiwiLyoqIEBqc3ggZGVrdS5kb20gKi9cblxuaW1wb3J0IGRla3UgZnJvbSAnZGVrdSc7XG5pbXBvcnQgU291bmRDbG91ZEF1ZGlvIGZyb20gJ3NvdW5kY2xvdWQtYXVkaW8nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVmYXVsdFByb3BzOiB7XG4gICAgICAgIHZhbHVlOiAwXG4gICAgfSxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgc291bmRDbG91ZEF1ZGlvOiBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIChwcm9wIGluc3RhbmNlb2YgU291bmRDbG91ZEF1ZGlvKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXIoY29tcG9uZW50KSB7XG4gICAgICAgIGxldCB7IHByb3BzIH0gPSBjb21wb25lbnQ7XG4gICAgICAgIGxldCB7IHZhbHVlLCBzb3VuZENsb3VkQXVkaW8gfSA9IHByb3BzO1xuXG4gICAgICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA+IDEwMCkge1xuICAgICAgICAgICAgdmFsdWUgPSAxMDA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3R5bGUgPSB7d2lkdGg6IGAke3ZhbHVlfSVgfTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVTZWVrVHJhY2sgKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHhQb3MgPSAoZS5wYWdlWCAtIGUuZGVsZWdhdGVUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCkgLyBlLmRlbGVnYXRlVGFyZ2V0Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgICAgICBpZiAoc291bmRDbG91ZEF1ZGlvICYmICFpc05hTihzb3VuZENsb3VkQXVkaW8uYXVkaW8uZHVyYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgc291bmRDbG91ZEF1ZGlvLmF1ZGlvLmN1cnJlbnRUaW1lID0gKHhQb3MgKiBzb3VuZENsb3VkQXVkaW8uYXVkaW8uZHVyYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzYi1zb3VuZHBsYXllci13aWRnZXQtcHJvZ3Jlc3MtY29udGFpbmVyXCIgb25DbGljaz17aGFuZGxlU2Vla1RyYWNrfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2Itc291bmRwbGF5ZXItd2lkZ2V0LXByb2dyZXNzLWlubmVyXCIgc3R5bGU9e3N0eWxlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufTtcbiIsIi8qKiBAanN4IGRla3UuZG9tICovXG5cbmltcG9ydCBkZWt1IGZyb20gJ2Rla3UnO1xuXG5mdW5jdGlvbiBwcmV0dHlUaW1lICh0aW1lKSB7XG4gICAgbGV0IGhvdXJzID0gTWF0aC5mbG9vcih0aW1lIC8gMzYwMCk7XG4gICAgbGV0IG1pbnMgPSAnMCcgKyBNYXRoLmZsb29yKCh0aW1lICUgMzYwMCkgLyA2MCk7XG4gICAgbGV0IHNlY3MgPSAnMCcgKyBNYXRoLmZsb29yKCh0aW1lICUgNjApKTtcblxuICAgIG1pbnMgPSBtaW5zLnN1YnN0cihtaW5zLmxlbmd0aCAtIDIpO1xuICAgIHNlY3MgPSBzZWNzLnN1YnN0cihzZWNzLmxlbmd0aCAtIDIpO1xuXG4gICAgaWYgKCFpc05hTihzZWNzKSkge1xuICAgICAgICBpZiAoaG91cnMpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtob3Vyc306JHttaW5zfToke3NlY3N9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBgJHttaW5zfToke3NlY3N9YDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnMDA6MDAnO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlZmF1bHRQcm9wczoge1xuICAgICAgICBkdXJhdGlvbjogMCxcbiAgICAgICAgY3VycmVudFRpbWU6IDBcbiAgICB9LFxuXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBjdXJyZW50VGltZToge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXIoY29tcG9uZW50KSB7XG4gICAgICAgIGNvbnN0IHsgcHJvcHMgfSA9IGNvbXBvbmVudDtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNiLXNvdW5kcGxheWVyLXdpZGdldC10aW1lclwiPlxuICAgICAgICAgICAgICAgIHtwcmV0dHlUaW1lKHByb3BzLmN1cnJlbnRUaW1lKX0gLyB7cHJldHR5VGltZShwcm9wcy5kdXJhdGlvbil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59O1xuIiwiLy8gaGFuZGxpbmcgbXVsdGlwbGUgYXVkaW8gb24gdGhlIHBhZ2UgaGVscGVyc1xubGV0IF9hdWRpb3MgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BBbGxPdGhlciAocGxheWluZykge1xuICAgIF9hdWRpb3MuZm9yRWFjaCgoc291bmRDbG91ZEF1ZGlvKSA9PiB7XG4gICAgICAgIGlmIChzb3VuZENsb3VkQXVkaW8ucGxheWluZyAmJiBzb3VuZENsb3VkQXVkaW8ucGxheWluZyAhPT0gcGxheWluZykge1xuICAgICAgICAgICAgc291bmRDbG91ZEF1ZGlvLnN0b3AoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9TdG9yZSAoc291bmRDbG91ZEF1ZGlvKSB7XG4gICAgbGV0IGlzUHJlc2VudCA9IGZhbHNlO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IF9hdWRpb3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbGV0IF9zb3VuZENsb3VkQXVkaW8gPSBfYXVkaW9zW2ldO1xuICAgICAgICBpZiAoX3NvdW5kQ2xvdWRBdWRpby5wbGF5aW5nID09PSBzb3VuZENsb3VkQXVkaW8ucGxheWluZykge1xuICAgICAgICAgICAgaXNQcmVzZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc1ByZXNlbnQpIHtcbiAgICAgICAgX2F1ZGlvcy5wdXNoKHNvdW5kQ2xvdWRBdWRpbyk7XG4gICAgfVxufVxuIiwiLyoqIEBqc3ggZGVrdS5kb20gKi9cblxuY29uc3QgZW52ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50JztcblxuaW1wb3J0IGRla3UgZnJvbSAnZGVrdSc7XG5pbXBvcnQgU291bmRDbG91ZEF1ZGlvIGZyb20gJ3NvdW5kY2xvdWQtYXVkaW8nO1xuXG5pbXBvcnQgUGxheUJ1dHRvbiBmcm9tICcuL2NvbXBvbmVudHMvUGxheUJ1dHRvbic7XG5pbXBvcnQgUHJvZ3Jlc3MgZnJvbSAnLi9jb21wb25lbnRzL1Byb2dyZXNzJztcbmltcG9ydCBUaW1lciBmcm9tICcuL2NvbXBvbmVudHMvVGltZXInO1xuaW1wb3J0IHsgU291bmRDbG91ZExvZ29TVkcgfSBmcm9tICcuL2NvbXBvbmVudHMvSWNvbnMnO1xuXG5pbXBvcnQgeyBzdG9wQWxsT3RoZXIsIGFkZFRvU3RvcmUgfSBmcm9tICcuL3V0aWxzL2F1ZGlvU3RvcmUnO1xuXG5jb25zdCBub0NsaWVudElkTWVzc2FnZSA9IFtcbiAgICAnWW91IG11c3QgcHJvdmlkZSBTb3VuZENsb3VkIGNsaWVudElkIGZvciBTb3VuZFBsYXllciB3aWRnZXQnLFxuICAgICcnLFxuICAgICdFeGFtcGxlOicsXG4gICAgJzxzY3JpcHQ+JyxcbiAgICAndmFyIHNiX3NvdW5kcGxheWVyX2NsaWVudF9pZCA9IFwiWU9VUi1DTElFTlQtSURcIjsnLFxuICAgICc8L3NjcmlwdD4nLFxuICAgICcnLFxuICAgICdSZWdpc3RlciBmb3IgYXBwIGFuZCBnZXQgY2xpZW50SWQgYXQgaHR0cHM6Ly9kZXZlbG9wZXJzLnNvdW5kY2xvdWQuY29tLydcbl0uam9pbignXFxuJyk7XG5cbmNvbnN0IFdpZGdldCA9IHtcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgdXJsOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBzb3VuZENsb3VkQXVkaW86IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gKHByb3AgaW5zdGFuY2VvZiBTb3VuZENsb3VkQXVkaW8pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgY3VycmVudFRpbWU6IDAsXG4gICAgICAgICAgICBzZWVraW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHBsYXlpbmc6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGFmdGVyTW91bnQoY29tcG9uZW50LCBlbCwgc2V0U3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBwcm9wcyB9ID0gY29tcG9uZW50O1xuICAgICAgICBjb25zdCB7IHNvdW5kQ2xvdWRBdWRpbyB9ID0gcHJvcHM7XG5cbiAgICAgICAgc291bmRDbG91ZEF1ZGlvLnJlc29sdmUocHJvcHMudXJsLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgLy8gVEJEOiBzdXBwb3J0IGZvciBwbGF5bGlzdHNcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrID0gZGF0YS50cmFja3MgPyBkYXRhLnRyYWNrc1swXSA6IGRhdGE7XG4gICAgICAgICAgICBzZXRTdGF0ZSh7IHRyYWNrIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBvbkF1ZGlvU3RhcnRlZCAoKSB7XG4gICAgICAgICAgICBzZXRTdGF0ZSh7cGxheWluZzogdHJ1ZX0pO1xuXG4gICAgICAgICAgICBzdG9wQWxsT3RoZXIoc291bmRDbG91ZEF1ZGlvLnBsYXlpbmcpO1xuICAgICAgICAgICAgYWRkVG9TdG9yZShzb3VuZENsb3VkQXVkaW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0Q3VycmVudFRpbWUgKCkge1xuICAgICAgICAgICAgc2V0U3RhdGUoe2N1cnJlbnRUaW1lOiBzb3VuZENsb3VkQXVkaW8uYXVkaW8uY3VycmVudFRpbWV9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldER1cmF0aW9uICgpIHtcbiAgICAgICAgICAgIHNldFN0YXRlKHtkdXJhdGlvbjogc291bmRDbG91ZEF1ZGlvLmF1ZGlvLmR1cmF0aW9ufSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvblNlZWtpbmdUcmFjayAoKSB7XG4gICAgICAgICAgICBzZXRTdGF0ZSh7c2Vla2luZzogdHJ1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25TZWVrZWRUcmFjayAoKSB7XG4gICAgICAgICAgICBzZXRTdGF0ZSh7c2Vla2luZzogZmFsc2V9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uQXVkaW9FbmRlZCAoKSB7XG4gICAgICAgICAgICBzZXRTdGF0ZSh7cGxheWluZzogZmFsc2V9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0V2ZW50cy9NZWRpYV9ldmVudHNcbiAgICAgICAgc291bmRDbG91ZEF1ZGlvLm9uKCdwbGF5aW5nJywgb25BdWRpb1N0YXJ0ZWQpO1xuICAgICAgICBzb3VuZENsb3VkQXVkaW8ub24oJ3RpbWV1cGRhdGUnLCBnZXRDdXJyZW50VGltZSk7XG4gICAgICAgIHNvdW5kQ2xvdWRBdWRpby5vbignbG9hZGVkbWV0YWRhdGEnLCBnZXREdXJhdGlvbik7XG4gICAgICAgIHNvdW5kQ2xvdWRBdWRpby5vbignc2Vla2luZycsIG9uU2Vla2luZ1RyYWNrKTtcbiAgICAgICAgc291bmRDbG91ZEF1ZGlvLm9uKCdzZWVrZWQnLCBvblNlZWtlZFRyYWNrKTtcbiAgICAgICAgc291bmRDbG91ZEF1ZGlvLm9uKCdwYXVzZScsIG9uQXVkaW9FbmRlZCk7XG4gICAgICAgIHNvdW5kQ2xvdWRBdWRpby5vbignZW5kZWQnLCBvbkF1ZGlvRW5kZWQpO1xuICAgIH0sXG5cblxuICAgIGJlZm9yZU1vdW50KGNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCB7IHByb3BzIH0gPSBjb21wb25lbnQ7XG4gICAgICAgIHByb3BzLnNvdW5kQ2xvdWRBdWRpby51bmJpbmRBbGwoKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyKGNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCB7IHN0YXRlLCBwcm9wcyB9ID0gY29tcG9uZW50O1xuXG4gICAgICAgIGlmICghc3RhdGUudHJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiAvPjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS50cmFjayAmJiAhc3RhdGUudHJhY2suc3RyZWFtYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2Itc291bmRwbGF5ZXItd2lkZ2V0LW1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17c3RhdGUudHJhY2sucGVybWFsaW5rX3VybH0gdGFyZ2V0PVwiX2JsYW5rXCI+e3N0YXRlLnRyYWNrLnRpdGxlfTwvYT4gaXMgbm90IHN0cmVhbWFibGUhXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzYi1zb3VuZHBsYXllci13aWRnZXQtY292ZXJcIiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogYHVybCgke3N0YXRlLnRyYWNrLmFydHdvcmtfdXJsLnJlcGxhY2UoJ2xhcmdlJywgJ3Q1MDB4NTAwJyl9KWBcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzYi1zb3VuZHBsYXllci13aWRnZXQtb3ZlcmxheVwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNiLXNvdW5kcGxheWVyLXdpZGdldC10cmFjay1pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInNiLXNvdW5kcGxheWVyLXdpZGdldC11c2VyXCI+e3N0YXRlLnRyYWNrLnVzZXIudXNlcm5hbWV9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwic2Itc291bmRwbGF5ZXItd2lkZ2V0LXRpdGxlXCI+e3N0YXRlLnRyYWNrLnRpdGxlfTwvaDI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj17c3RhdGUudHJhY2sucGVybWFsaW5rX3VybH0gdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTb3VuZENsb3VkTG9nb1NWRyAvPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2Itc291bmRwbGF5ZXItd2lkZ2V0LWNvbnRyb2xzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxQbGF5QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5aW5nPXtzdGF0ZS5wbGF5aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgc291bmRDbG91ZEF1ZGlvPXtwcm9wcy5zb3VuZENsb3VkQXVkaW99XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxQcm9ncmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3N0YXRlLmN1cnJlbnRUaW1lIC8gc3RhdGUuZHVyYXRpb24gKiAxMDAgfHwgMH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kQ2xvdWRBdWRpbz17cHJvcHMuc291bmRDbG91ZEF1ZGlvfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8VGltZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uPXtzdGF0ZS50cmFjay5kdXJhdGlvbiAvIDEwMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGltZT17c3RhdGUuY3VycmVudFRpbWV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlIChlbCwgb3B0cykge1xuICAgIGNvbnN0IGNsaWVudElkID0gb3B0cy5jbGllbnRJZCB8fCB3aW5kb3cuc2Jfc291bmRwbGF5ZXJfY2xpZW50X2lkO1xuICAgIGlmICghY2xpZW50SWQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihub0NsaWVudElkTWVzc2FnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VuZENsb3VkQXVkaW8gPSBuZXcgU291bmRDbG91ZEF1ZGlvKGNsaWVudElkKTtcblxuICAgIGNvbnN0IGFwcCA9IGRla3UudHJlZShcbiAgICAgICAgPFdpZGdldCB1cmw9e29wdHMudXJsfSBzb3VuZENsb3VkQXVkaW89e3NvdW5kQ2xvdWRBdWRpb30gLz5cbiAgICApO1xuXG4gICAgaWYgKGVudiA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgICBhcHAub3B0aW9uKCd2YWxpZGF0ZVByb3BzJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZGVrdS5yZW5kZXIoYXBwLCBlbCk7XG59XG4iXX0=
