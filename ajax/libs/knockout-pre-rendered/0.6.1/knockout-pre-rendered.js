/*!
  Knockout pre-rendered binding handlers v0.6.1
  By: Erik Schierboom (C) 2015
  License: Apache 2

  Adds binding handlers that can be populated based on existing HTML.

  The foreach code is adapted from:

  Knockout Fast Foreach v0.3.1 (2015-03-18T15:15:11.505Z)
  By: Brian M Hunt (C) 2015
  License: MIT
  URL: https://github.com/brianmhunt/knockout-fast-foreach
*/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['knockout'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('knockout'));
  } else {
    root.KnockoutElse = factory(root.ko);
  }
}(this, function (ko) {
  // index.js
  // --------
  // Pre-rendered binding handlers. 
  // --------
  "use strict";

  // Utilities

  // from https://github.com/jonschlinkert/is-plain-object
  function isPlainObject(o) {
    return !!o && typeof o === 'object' && o.constructor === Object;
  }

  // From knockout/src/virtualElements.js
  var commentNodesHaveTextProperty = document && document.createComment("test").text === "<!--test-->";
  var startCommentRegex = commentNodesHaveTextProperty ? /^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/;
  function isVirtualNode(node) {
    return (node.nodeType == 8) && startCommentRegex.test(commentNodesHaveTextProperty ? node.text : node.nodeValue);
  }

  // Check if a node is an element node
  function isElementNode(node) {
    return node && node.nodeType && node.nodeType === 1;
  }

  // Check if a node is a valid child node
  function isValidChildNode(attribute, childNode) {
      if (typeof (attribute) === 'string') {
        return isElementNode(childNode) && childNode.attributes && childNode.attributes[attribute];  
      }

      return isElementNode(childNode);    
  }

  // Find the first children of the specified parent node. If the attribute is defined, the child node
  // also need to have that attribute
  function findFirstChild(parentNode, attribute) {
    return ko.utils.arrayFirst(ko.virtualElements.childNodes(parentNode), isValidChildNode.bind(this, attribute));
  }

  // Find children of the specified parent node. If the attribute is defined, the child nodes
  // also need to have that attribute
  function findChildren(parentNode, attribute) {
    return ko.utils.arrayFilter(ko.virtualElements.childNodes(parentNode), isValidChildNode.bind(this, attribute));
  }

  // Get a copy of the template node of the given element,
  // put them into a container, then remove the template node.
  function makeTemplateNode(sourceNode, namedTemplate) {
    var container = document.createElement('div');
    var parentNode;
    var namedTemplate;

    if (sourceNode.content) {
      // For e.g. <template> tags
      parentNode = sourceNode.content;
    } else if (sourceNode.tagName === 'SCRIPT') {
      parentNode = document.createElement('div');
      parentNode.innerHTML = sourceNode.innerHTML;
    } else {
      // Anything else e.g. <div>
      parentNode = sourceNode;
    }

    // Find the template and add it to the container
    var template = findFirstChild(parentNode, namedTemplate ? null : 'data-template');
    container.insertBefore(template.cloneNode(true), null);

    // Remove the template node
    ko.removeNode(template);

    return container;
  }

  // Add an existing element
  function valueToChangeAddExistingItem(value, index) {
    return {
      status: 'existing',
      value: value,
      index: index
    };
  }

  function InitializedForeach(spec) {
    var self = this;
    this.element = spec.element;
    this.container = isVirtualNode(this.element) ?
                     this.element.parentNode : this.element;
    this.$context = spec.$context;
    this.data = spec.data;
    this.as = spec.as;
    this.noContext = spec.noContext;
    this.namedTemplate = spec.name !== undefined;
    this.templateNode = makeTemplateNode(
      spec.name ? document.getElementById(spec.name).cloneNode(true) : spec.element,
      this.namedTemplate
    );
    this.afterQueueFlush = spec.afterQueueFlush;
    this.beforeQueueFlush = spec.beforeQueueFlush;
    this.changeQueue = [];
    this.lastNodesList = [];
    this.childContexts = [];
    this.indexesToDelete = [];
    this.rendering_queued = false;

    // Find the existing elements that will be bound to the data array
    this.existingElements = findChildren(this.container, this.namedTemplate ? null : 'data-init');

    // Check to see if we should manually create the array elements
    if (typeof spec.createElement === 'function') {
      ko.utils.arrayForEach(this.existingElements, function(existingElement) {
        self.data.push(spec.createElement());
      });
    }

    // Prime content
    var primeData = ko.unwrap(this.data);
    if (primeData.map) {
      this.onArrayChange(primeData.map(valueToChangeAddExistingItem));
    }

    // Watch for changes
    if (ko.isObservable(this.data)) {
      if (!this.data.indexOf) {
        // Make sure the observable is trackable.
        this.data = this.data.extend({trackArrayChanges: true});
      }
      this.changeSubs = this.data.subscribe(this.onArrayChange, this, 'arrayChange');
    }
  }

  InitializedForeach.animateFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(cb) { return window.setTimeout(cb, 1000 / 60); };

  InitializedForeach.prototype.dispose = function () {
    if (this.changeSubs) {
      this.changeSubs.dispose();
    }
  };

  // If the array changes we register the change.
  InitializedForeach.prototype.onArrayChange = function (changeSet) {
    var self = this;
    var changeMap = {
      added: [],
      existing: [],
      deleted: [],
    };

    ko.utils.arrayForEach(changeSet, function(changeItem) {
      changeMap[changeItem.status].push(changeItem);
    });

    if (changeMap.deleted.length > 0) {
      this.changeQueue.push.apply(this.changeQueue, changeMap.deleted);
      this.changeQueue.push({status: 'clearDeletedIndexes'})
    }

    this.changeQueue.push.apply(this.changeQueue, changeMap.existing);
    this.changeQueue.push.apply(this.changeQueue, changeMap.added);

    // Once a change is registered, the ticking count-down starts for the processQueue.
    if (this.changeQueue.length > 0 && !this.rendering_queued) {
      this.rendering_queued = true;
      InitializedForeach.animateFrame.call(window, function () { self.processQueue(); });
    }
  };

  // Reflect all the changes in the queue in the DOM, then wipe the queue.
  InitializedForeach.prototype.processQueue = function () {
    var self = this;

    // Callback so folks can do things before the queue flush.
    if (typeof this.beforeQueueFlush === 'function') {
      this.beforeQueueFlush(this.changeQueue);
    }

    ko.utils.arrayForEach(this.changeQueue, function (changeItem) {
      self[changeItem.status](changeItem.index, changeItem.value);
    });
    this.rendering_queued = false;

    // Callback so folks can do things.
    if (typeof this.afterQueueFlush === 'function') {
      this.afterQueueFlush(this.changeQueue);
    }
    this.changeQueue = [];
  };

  InitializedForeach.prototype.createChildContext = function (index, value) {
    if(this.noContext) {
      return this.$context.extend({
        '$item' : value
      });
    }

    return this.$context.createChildContext(value, this.as || null, function(context) {
      context['$index'] = ko.observable(index);
    });
  }

  // Process a changeItem with {status: 'existing', ...}
  InitializedForeach.prototype.existing = function (index, value) {
    var existingElement = this.existingElements[index];
    this.lastNodesList.splice(index, 0, existingElement);
    this.childContexts[index] = this.createChildContext(index, value);
    ko.applyBindings(this.childContexts[index], existingElement);
  };

  // Process a changeItem with {status: 'added', ...}
  InitializedForeach.prototype.added = function (index, value) {
    var referenceElement = this.lastNodesList[index - 1] || null;
    var templateClone = this.templateNode.cloneNode(true);
    var childNodes = ko.virtualElements.childNodes(templateClone);

    this.lastNodesList.splice(index, 0, childNodes[childNodes.length - 1]);
    this.childContexts[index] = this.createChildContext(index, value);
    ko.applyBindingsToDescendants(this.childContexts[index], templateClone);

    // Nodes are inserted in reverse order - pushed down immediately after
    // the last node for the previous item or as the first node of element.
    for (var i = childNodes.length - 1; i >= 0; --i) {
      var child = childNodes[i];
      if (!child) return;
      ko.virtualElements.insertAfter(this.element, child, referenceElement);
    }
  };

  // Process a changeItem with {status: 'deleted', ...}
  InitializedForeach.prototype.deleted = function (index, value) {
    var ptr = this.lastNodesList[index],
        // We use this.element because that will be the last previous node
        // for virtual element lists.
        lastNode = this.lastNodesList[index - 1] || this.element;

    do {
      ptr = ptr.previousSibling;
      ko.removeNode((ptr && ptr.nextSibling) || ko.virtualElements.firstChild(this.element));
    } while (ptr && ptr !== lastNode);

    // The "last node" in the DOM from which we begin our deletes of the next adjacent node is
    // now the sibling that preceded the first node of this item. 
    this.lastNodesList[index] = this.lastNodesList[index - 1];
    this.indexesToDelete.push(index);
  };

  // We batch our deletion of item indexes in our parallel array.
  // See brianmhunt/knockout-fast-foreach#6/#8
  InitializedForeach.prototype.clearDeletedIndexes = function () {

    // We iterate in reverse on the presumption (following the unit tests) that KO's diff engine
    // processes diffs (esp. deletes) monotonically ascending i.e. from index 0 -> N.
    for (var i = this.indexesToDelete.length - 1; i >= 0; --i) {
      this.lastNodesList.splice(this.indexesToDelete[i], 1);
      this.childContexts.splice(this.indexesToDelete[i], 1);
    }  

    // Having deleted items means we need to update the index observables
    for (var j = this.childContexts.length - 1; j >= 0; --j) {      
      if (this.childContexts[j] && this.childContexts[j]['$index']) {
        this.childContexts[j]['$index'](j);
      }
    }  

    this.indexesToDelete = [];
  };

  // This binding handler is similar to the regular foreach binding handler, but with
  // one major difference: it binds the underlying array to existing HTML elements instead
  // of creating new elements. Existing elements must be marked with the "data-init" attribute.
  // What happens is that when the foreachInit binding handler is initialized, it will look for
  // all child elements with the "data-init" attribute and bind them to the values in the 
  // underlying (observable) array. To be able to support adding new items, there must be a template.
  // This template is found by looking for a mode marked with the "data-template" attribute.
  ko.bindingHandlers.foreachInit = {
    // Valid valueAccessors:
    //    []
    //    ko.observable([])
    //    ko.observableArray([])
    //    ko.computed
    //    {data: array, name: string, as: string}
    init: function init(element, valueAccessor, bindings, viewModel, context) {
      var value = valueAccessor(),
          initializedForeach;
      
      if (isPlainObject(value)) {
        value.element = value.element || element;
        value.$context = context;
        initializedForeach = new InitializedForeach(value);
      } else {
        initializedForeach = new InitializedForeach({
          element: element,
          data: ko.unwrap(context.$rawData) === value ? context.$rawData : value,
          $context: context,
          createElement: value.createElement
        });
      }

      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        initializedForeach.dispose();
      });

      return { controlsDescendantBindings: true };
    },

    // Export for testing, debugging, and overloading.
    InitializedForeach: InitializedForeach,
  };

  ko.virtualElements.allowedBindings.foreachInit = true;

  function elementIsHidden(element) {
    return (element.offsetWidth <= 0 && element.offsetHeight <= 0) || 
           (element.style && element.style.display && element.style.display == 'none');
  }

  function isObjectWithExplicitValues(value) {
    return isPlainObject(value) && 
           value['value'] === undefined &&
           value['convert'] === undefined &&
           value['field'] === undefined;
  }

  function setExplicitObjectValues(value, viewModel) {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        viewModel[key](value[key]);
      }
    }
  }

  function hasAttributeBinding(allBindings) {
    return allBindings.get('attr');
  }

  function getValueElement(element) {
    return isVirtualNode(element) ? ko.virtualElements.firstChild(element) : element;
  }

  function initAttributeObservables(element, value, allBindings) {
    var valueElement = isVirtualNode(element) ? ko.virtualElements.firstChild(element) : element;
    var fieldValue = allBindings.get('attr');

    for (var attribute in fieldValue) {
      if (fieldValue.hasOwnProperty(attribute)) {
        var attributeValue = valueElement.attributes[attribute].value;

        // If a convert function was passed, apply it to the field value.
        // This can be used to convert the input string to the correct field value
        if (isPlainObject(value) && typeof value['convert'] === 'function') {
            attributeValue = value['convert'](attributeValue);
        }
      
        fieldValue[attribute](attributeValue)
      }
    }
  }

  function initObservable(element, value, allBindings) {
  // Determine the element from which to retrieve the value
    var valueElement = isVirtualNode(element) ? ko.virtualElements.firstChild(element) : element;  
    var unwrappedValue = ko.utils.peekObservable(value)

    // Get the actual value from the element. If the binding handler does not
    // have an explicit value, try to retrieve it from the value of inner text content
    var fieldValue = (isPlainObject(value) && value['value'] !== undefined) ? value['value'] : 
                     (allBindings.get('checked') ? valueElement.checked : 
                      allBindings.get('visible') ? !elementIsHidden(valueElement) :
                      allBindings.get('html')    ? valueElement.innerHTML :
                      allBindings.get('enable')  ? !valueElement.disabled :
                      allBindings.get('disable') ? valueElement.disabled :
                      (valueElement.innerText || valueElement.textContent || valueElement.value));

      // If a convert function was passed, apply it to the field value.
      // This can be used to convert the input string to the correct field value
      if (isPlainObject(value) && typeof value['convert'] === 'function') {
          fieldValue = value['convert'](fieldValue);
      }

      // Find the field accessor. If the init binding does not point to an observable
      // or the field parameter doesn't, we try the text and value binding
      var fieldAccessor = (ko.isObservable(value) ? value : undefined) || 
                          (isPlainObject(value) ? value['field'] : undefined) ||                             
                           allBindings.get('text')      ||
                           allBindings.get('textInput') ||
                           allBindings.get('value')     ||
                           allBindings.get('checked')   ||
                           allBindings.get('html')      ||
                           allBindings.get('visible')   ||
                           allBindings.get('enable')    ||
                           allBindings.get('disable');

      // Finally, update the observable with the value
      fieldAccessor(fieldValue, unwrappedValue);
  }

  // This binding handler initializes an observable to a value from the HTML element
  ko.bindingHandlers.init = {

    init: function (element, valueAccessor, allBindings, viewModel) {
      var value = valueAccessor();
      
      if (isObjectWithExplicitValues(value)) {
        setExplicitObjectValues(value, viewModel);
      } 
      else if (hasAttributeBinding(allBindings)) {
        initAttributeObservables(element, value, allBindings);
      }
      else {
        initObservable(element, value, allBindings)  
      }
    }
  };

  ko.virtualElements.allowedBindings.init = true;
}));