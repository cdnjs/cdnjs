/*!
  Knockout pre-rendered binding handlers v$npm_package_version
  By: Erik Schierboom (C) 2019
  License: Apache 2

  Adds binding handlers that can be populated based on existing HTML.

  The foreach code is adapted from:

  Knockout Fast Foreach v0.3.1 (2015-03-18T15:15:11.505Z)
  By: Brian M Hunt (C) 2015
  License: MIT
  URL: https://github.com/brianmhunt/knockout-fast-foreach
*/
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["knockout"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("knockout"));
  } else {
    root.KnockoutElse = factory(root.ko);
  }
})(this, function(ko) {
  // index.js
  // --------
  // Pre-rendered binding handlers.
  // --------
  "use strict";

  // Utilities

  // from https://github.com/jonschlinkert/is-plain-object
  function isPlainObject(o) {
    return !!o && typeof o === "object" && o.constructor === Object;
  }

  // From knockout/src/virtualElements.js
  var commentNodesHaveTextProperty =
    window.document &&
    window.document.createComment("test").text === "<!--test-->";
  var startCommentRegex = commentNodesHaveTextProperty
    ? /^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/
    : /^\s*ko(?:\s+([\s\S]+))?\s*$/;
  function isVirtualNode(node) {
    return (
      node.nodeType == 8 &&
      startCommentRegex.test(
        commentNodesHaveTextProperty ? node.text : node.nodeValue
      )
    );
  }

  // Check if a node is an element node
  function isElementNode(node) {
    return node && node.nodeType && node.nodeType === 1;
  }

  // Check if a node is a valid child node
  function isValidChildNode(attribute, childNode) {
    if (typeof attribute === "string") {
      return (
        isElementNode(childNode) &&
        childNode.attributes &&
        childNode.attributes[attribute]
      );
    }

    return isElementNode(childNode);
  }

  // Find the first children of the specified parent node. If the attribute is defined, the child node
  // also need to have that attribute
  function findFirstChild(parentNode, attribute) {
    return ko.utils.arrayFirst(
      ko.virtualElements.childNodes(parentNode),
      isValidChildNode.bind(this, attribute)
    );
  }

  // Find children of the specified parent node. If the attribute is defined, the child nodes
  // also need to have that attribute
  function findChildren(parentNode, attribute) {
    return ko.utils.arrayFilter(
      ko.virtualElements.childNodes(parentNode),
      isValidChildNode.bind(this, attribute)
    );
  }

  // Get a copy of the template node of the given element,
  // put them into a container, then remove the template node.
  function makeTemplateNode(
    sourceNode,
    namedTemplate,
    deleteTemplateNodes,
    nodesPerElement
  ) {
    var container = document.createElement("div");
    var parentNode;
    var namedTemplate;

    if (sourceNode.content) {
      // For e.g. <template> tags
      parentNode = sourceNode.content;
    } else if (sourceNode.tagName === "SCRIPT") {
      if (sourceNode.innerHTML.match(/^\s*<tr[\s\S]*?<\/tr>\s*$/i)) {
        var tbl = document.createElement("table");
        tbl.innerHTML = "<tbody>" + sourceNode.innerHTML + "</tbody>";
        parentNode = tbl.firstChild;
      } else {
        parentNode = document.createElement("div");
        parentNode.innerHTML = sourceNode.innerHTML;
      }
    } else {
      // Anything else e.g. <div>
      parentNode = sourceNode;
    }

    // Find the template and add it to the container
    var template = findFirstChild(
      parentNode,
      namedTemplate ? null : "data-template"
    );

    for (var i = 0, node = template; i < nodesPerElement; i++) {
      var currentNode = node;
      container.insertBefore(node.cloneNode(true), null);
      // Find next element sibling. (Some older browsers don't support nextElementSibling).
      do {
        node = node.nextElementSibling || node.nextSibling;
      } while (node && node.nodeType !== 1);

      // Remove current template node
      if (deleteTemplateNodes) {
        ko.removeNode(currentNode);
      }
    }
    return container;
  }

  // Add an existing element
  function valueToChangeAddExistingItem(value, index) {
    return {
      status: "existing",
      value: value,
      index: index
    };
  }

  // Knockout automatically generates "_ko_property_writers" for a subset of its
  // built-in bindings, registered as "_twoWayBindings". Here, we can compel it to
  // do the same for the rest of the bindings that we want to support with "init".
  ko.utils.extend(ko.expressionRewriting._twoWayBindings, {
    text: true,
    html: true,
    visible: true,
    enable: true,
    disable: true
  });

  // KO's built-in "_twoWayBindings" logic can only carry us so far. For other bindings,
  // we need to generate our own property writers, in much the same way as KO does.

  // Generate property writers for all properties referenced in "attr" and "css" bindings.
  generatePropertyWritersForBinding(
    "attr",
    "_ko_prerender_attrPropertyWriters",
    "attr"
  );
  generatePropertyWritersForBinding(
    "css",
    "_ko_prerender_cssPropertyWriters",
    "css"
  );

  // This method generates a binding preprocessor for the specified binding, and for each
  // applicable field referenced in the binding params, it generates a writer.
  function generatePropertyWritersForBinding(
    bindingName,
    propertyWritersBindingName,
    defaultWriterName,
    mapExpressionsCallback
  ) {
    // Chain this with any existing preprocessor.
    var existingPreprocessor = ko.bindingHandlers[bindingName].preprocess;

    ko.bindingHandlers[bindingName].preprocess = function(
      value,
      name,
      addBinding
    ) {
      if (existingPreprocessor) {
        value = existingPreprocessor(value, name, addBinding);
      }
      var expressions = ko.expressionRewriting.parseObjectLiteral(value);
      if (mapExpressionsCallback) {
        expressions = ko.utils.arrayMap(expressions, mapExpressionsCallback);
      }
      var writers = [];
      ko.utils.arrayForEach(expressions, function(expression) {
        if (expression != null) {
          var writableExpression = getWritableValue(
            "unknown" in expression ? expression["unknown"] : expression.value
          );
          if (writableExpression) {
            writers.push(
              "'" +
                ("unknown" in expression ? defaultWriterName : expression.key) +
                "':function(_v){" +
                writableExpression +
                "=_v}"
            );
          }
        }
      });
      if (writers.length != 0) {
        addBinding(propertyWritersBindingName, "{" + writers.join(",") + "}");
      }
      return value || true;
    };
  }

  // from knockout/src/binding/expressionRewriting.js
  var javaScriptReservedWords = ["true", "false", "null", "undefined"];
  var javaScriptAssignmentTarget = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;
  function getWritableValue(expression) {
    if (ko.utils.arrayIndexOf(javaScriptReservedWords, expression) == -1) {
      var match = expression.match(javaScriptAssignmentTarget);
      return match === null
        ? false
        : match[1]
        ? "Object(" + match[1] + ")" + match[2]
        : expression;
    }
    return false;
  }

  function InitializedForeach(
    element,
    valueAccessor,
    bindings,
    viewModel,
    context
  ) {
    var self = this;
    this.element = element;
    this.container = isVirtualNode(element) ? this.element.parentNode : element;
    this.$context = context;

    var useRawData = false; // If true, the binding received an array, rather than an object with a "data" property.
    var spec = valueAccessor();
    if (!isPlainObject(spec)) {
      useRawData = ko.unwrap(context.$rawData) === spec;
      spec = {
        data: useRawData ? context.$rawData : spec,
        createElement: spec.createElement
      };
    }

    this.data = spec.data;
    this.as = spec.as;
    this.createElement = spec.createElement;
    this.noContext = spec.noContext;
    this.namedTemplate = spec.name !== undefined;
    this.nodesPerElement = spec.nodesPerElement || 1;
    this.templateNode = makeTemplateNode(
      spec.name ? document.getElementById(spec.name) : element,
      this.namedTemplate,
      !spec.name, // Only delete the template nodes if they're not coming from a named template.
      this.nodesPerElement
    );
    this.afterQueueFlush = spec.afterQueueFlush;
    this.beforeQueueFlush = spec.beforeQueueFlush;
    this.dataChanged = spec.dataChanged;
    this.changeQueue = [];
    this.lastNodesList = [];
    this.childContexts = [];
    this.indexesToDelete = [];
    this.rendering_queued = false;

    // Find the existing elements that will be bound to the data array
    this.existingElements = findChildren(
      this.namedTemplate ? this.element : this.container,
      this.namedTemplate ? null : "data-init"
    );

    // Check to see if we should manually create the array elements
    if (typeof this.createElement === "function") {
      this.createElements();
    }

    // Prime content
    var primeData = ko.unwrap(this.data);
    this.onArrayChange(
      ko.utils.arrayMap(primeData, valueToChangeAddExistingItem)
    );

    // If observable, subscribe to change notification the normal way.
    if (ko.isObservable(this.data)) {
      if (!this.data.indexOf) {
        // Make sure the observable is trackable.
        this.data = this.data.extend({ trackArrayChanges: true });
      }
      this.changeSubs = this.data.subscribe(
        this.onArrayChange,
        this,
        "arrayChange"
      );
    } else {
      // If not observable, use a ko.computed as a means of subscribing to array changes via
      // ko's dependency tracking magic. This allows tracking of reactive ko-es5 property that
      // wraps an observableArray internally.
      this.changeSubs = ko.computed(
        function() {
          var value = useRawData ? context.$rawData : valueAccessor();
          var newContents = ko.unwrap(
            isPlainObject(value) ? value.data : value
          );

          // Since we have no direct reference to the underlying observable (if any), we can't just call
          // .subscribe('arrayChange') on it to get change tracking notifications. So we need to track
          // the before/after array contents explicitly, but can use knockout's own logic to get the
          // diffs between them.
          if (this.previousContents != null) {
            var diff = ko.utils.compareArrays(
              this.previousContents,
              newContents,
              { sparse: true }
            );
            if (diff.length != 0) {
              self.onArrayChange(diff);
            }
          }
          this.previousContents = [].concat(newContents);
        },
        { previousContents: null }
      );
    }
  }

  InitializedForeach.animateFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(cb) {
      return window.setTimeout(cb, 1000 / 60);
    };

  InitializedForeach.prototype.dispose = function() {
    if (this.changeSubs) {
      this.changeSubs.dispose();
    }
  };

  // If the array changes we register the change.
  InitializedForeach.prototype.onArrayChange = function(changeSet) {
    var self = this;
    var changeMap = {
      added: [],
      existing: [],
      deleted: []
    };

    ko.utils.arrayForEach(changeSet, function(changeItem) {
      changeMap[changeItem.status].push(changeItem);
    });

    if (typeof this.dataChanged === "function") {
      this.dataChanged(changeMap);
    }

    if (changeMap.deleted.length > 0) {
      this.changeQueue.push.apply(this.changeQueue, changeMap.deleted);
      this.changeQueue.push({ status: "clearDeletedIndexes" });
    }

    this.changeQueue.push.apply(this.changeQueue, changeMap.existing);
    this.changeQueue.push.apply(this.changeQueue, changeMap.added);

    // Once a change is registered, the ticking count-down starts for the processQueue.
    if (this.changeQueue.length > 0 && !this.rendering_queued) {
      this.rendering_queued = true;
      InitializedForeach.animateFrame.call(window, function() {
        self.processQueue();
      });
    }
  };

  // Reflect all the changes in the queue in the DOM, then wipe the queue.
  InitializedForeach.prototype.processQueue = function() {
    var self = this;

    // Callback so folks can do things before the queue flush.
    if (typeof this.beforeQueueFlush === "function") {
      this.beforeQueueFlush(this.changeQueue);
    }

    ko.utils.arrayForEach(this.changeQueue, function(changeItem) {
      self[changeItem.status](changeItem.index, changeItem.value);
    });
    this.rendering_queued = false;

    // Callback so folks can do things.
    if (typeof this.afterQueueFlush === "function") {
      this.afterQueueFlush(this.changeQueue);
    }
    this.changeQueue = [];
  };

  InitializedForeach.prototype.createChildContext = function(index, value) {
    if (this.noContext) {
      return this.$context.extend({
        $item: value
      });
    }

    return this.$context.createChildContext(value, this.as || null, function(
      context
    ) {
      context["$index"] = ko.observable(index);
    });
  };

  // Process a changeItem with {status: 'existing', ...}
  InitializedForeach.prototype.existing = function(index, value) {
    var context = (this.childContexts[index] = this.createChildContext(
      index,
      value
    ));
    var elementIndex = index * this.nodesPerElement;
    var existingElement;
    for (var i = 0; i < this.nodesPerElement; i++) {
      existingElement = this.existingElements[elementIndex + i];
      ko.applyBindings(context, existingElement);
    }
    this.lastNodesList.splice(index, 0, existingElement);
  };

  // Process a changeItem with {status: 'added', ...}
  InitializedForeach.prototype.added = function(index, value) {
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
  InitializedForeach.prototype.deleted = function(index, value) {
    var ptr = this.lastNodesList[index],
      // We use this.element because that will be the last previous node
      // for virtual element lists.
      lastNode = this.lastNodesList[index - 1] || this.element;

    do {
      ptr = ptr.previousSibling;
      ko.removeNode(
        (ptr && ptr.nextSibling) || ko.virtualElements.firstChild(this.element)
      );
    } while (ptr && ptr !== lastNode);

    // The "last node" in the DOM from which we begin our deletes of the next adjacent node is
    // now the sibling that preceded the first node of this item.
    this.lastNodesList[index] = this.lastNodesList[index - 1];
    this.indexesToDelete.push(index);
  };

  // We batch our deletion of item indexes in our parallel array.
  // See brianmhunt/knockout-fast-foreach#6/#8
  InitializedForeach.prototype.clearDeletedIndexes = function() {
    // We iterate in reverse on the presumption (following the unit tests) that KO's diff engine
    // processes diffs (esp. deletes) monotonically ascending i.e. from index 0 -> N.
    for (var i = this.indexesToDelete.length - 1; i >= 0; --i) {
      this.lastNodesList.splice(this.indexesToDelete[i], 1);
      this.childContexts.splice(this.indexesToDelete[i], 1);
    }

    // Having deleted items means we need to update the index observables
    for (var j = this.childContexts.length - 1; j >= 0; --j) {
      if (this.childContexts[j] && this.childContexts[j]["$index"]) {
        this.childContexts[j]["$index"](j);
      }
    }

    this.indexesToDelete = [];
  };

  // Create the elements in the data (observable) array for each of
  // the existing elements
  InitializedForeach.prototype.createElements = function() {
    var self = this;
    var elements = [];

    for (
      var i = 0;
      i < this.existingElements.length / this.nodesPerElement;
      i++
    ) {
      elements.push(this.createElement());
    }

    if (ko.isObservable(this.data)) {
      this.data(elements);
    } else {
      ko.utils.arrayForEach(elements, function(element) {
        self.data.push(element);
      });
    }
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
      var initializedForeach = new InitializedForeach(
        element,
        valueAccessor,
        bindings,
        viewModel,
        context
      );

      ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
        initializedForeach.dispose();
      });

      return { controlsDescendantBindings: true };
    },

    // Export for testing, debugging, and overloading.
    InitializedForeach: InitializedForeach
  };

  ko.virtualElements.allowedBindings.foreachInit = true;

  function elementIsHidden(element) {
    return (
      (element.offsetWidth <= 0 && element.offsetHeight <= 0) ||
      (element.style &&
        element.style.display &&
        element.style.display == "none")
    );
  }

  function isObjectWithExplicitValues(value) {
    return (
      isPlainObject(value) &&
      value["value"] === undefined &&
      value["convert"] === undefined &&
      value["field"] === undefined
    );
  }

  function setExplicitObjectValues(value, viewModel, allBindings) {
    var propertyWriters = allBindings.get("_ko_prerender_initPropertyWriters");
    for (var key in value) {
      if (value.hasOwnProperty(key) && viewModel[key] instanceof Function) {
        viewModel[key](value[key]);
      } else if (propertyWriters) {
        // Try to get the writer for the non-observable property.
        var writer = propertyWriters[key];
        if (writer) {
          writer(value[key]);
        }
      }
    }
  }

  // Extend single-value bindings.

  extendBindingInit("value");
  extendBindingInit("text");
  extendBindingInit("textInput");
  extendBindingInit("checked", function(element) {
    return element.checked;
  });
  extendBindingInit("visible", function(element) {
    return !elementIsHidden(element);
  });
  extendBindingInit("html", function(element) {
    return element.innerHTML;
  });
  extendBindingInit("enable", function(element) {
    return !element.disabled;
  });
  extendBindingInit("disable", function(element) {
    return element.disabled;
  });

  // Extend multi-value bindings.

  extendBindingInit(
    "attr",
    function(element, name) {
      return element.attributes[name]
        ? element.attributes[name].value
        : undefined;
    },
    true,
    "_ko_prerender_attrPropertyWriters"
  );
  extendBindingInit(
    "css",
    function(element, name) {
      return new RegExp("\\b" + name + "\\b", "i").test(element.className);
    },
    true,
    "_ko_prerender_cssPropertyWriters"
  );

  function defaultMarkupReader(element) {
    return element.innerText || element.textContent || element.value;
  }

  // Extends the "init" method of a binding handler, to extract the existing value from the markup and write it to the view model before running the normal init logic.
  function extendBindingInit(
    bindingName,
    markupReader,
    isMultiValue,
    propertyWritersBindingName
  ) {
    // Default arguments
    markupReader = markupReader || defaultMarkupReader;
    propertyWritersBindingName =
      propertyWritersBindingName ||
      (ko.expressionRewriting._twoWayBindings[bindingName]
        ? "_ko_property_writers"
        : undefined);

    var bindingHandler = ko.bindingHandlers[bindingName];
    var existingInit = bindingHandler.init;

    bindingHandler.init = function(
      element,
      valueAccessor,
      allBindings,
      viewModel
    ) {
      // Look for an init binding.
      var initBinding = allBindings.get("init");
      if (initBinding) {
        var convert = initBinding["convert"];

        if (!isMultiValue) {
          // Single-value binding.
          var valueFromMarkup = markupReader(element);

          // If the init binding is bound to its own field but does not also specify its own value...
          if (
            hasFieldOverride(initBinding) &&
            !initBinding.hasOwnProperty("value")
          ) {
            // Then write the value to the init field instead.
            writeValueToModel(
              valueFromMarkup,
              initBinding.hasOwnProperty("field")
                ? initBinding["field"]
                : initBinding,
              convert,
              "field",
              allBindings,
              "_ko_prerender_initPropertyWriters"
            );
          } else {
            // Otherwise write the value to the model as normal.
            writeValueToModel(
              valueFromMarkup,
              valueAccessor(),
              convert,
              bindingName,
              allBindings,
              propertyWritersBindingName
            );
          }
        } else {
          // For a multi-value binding, loop through its properties, read the markup for each key, and write to the model.
          var props = valueAccessor();
          for (var key in props) {
            var valueFromMarkup = markupReader(element, key);
            writeValueToModel(
              valueFromMarkup,
              props[key],
              convert,
              key,
              allBindings,
              propertyWritersBindingName
            );
          }
        }
      }
      // Now call the original "init" method.
      if (existingInit) {
        existingInit.apply(this, arguments);
      }
    };
  }

  function writeValueToModel(
    value,
    fieldAccessor,
    convert,
    key,
    allBindings,
    propertyWritersBindingName
  ) {
    if (convert) {
      var conversion = convert.hasOwnProperty(key) ? convert[key] : convert;
      if (conversion instanceof Function) {
        value = conversion(value);
      }
    }

    if (ko.isObservable(fieldAccessor)) {
      fieldAccessor(value, ko.unwrap(fieldAccessor));
    } else {
      var propertyWriter = getPropertyWriter(
        allBindings,
        propertyWritersBindingName,
        key
      );
      if (propertyWriter) {
        propertyWriter(value);
      }
    }
  }

  function getPropertyWriter(allBindings, propertyWritersBindingName, key) {
    if (propertyWritersBindingName) {
      var propertyWriters = allBindings.get(propertyWritersBindingName);
      if (propertyWriters) {
        return propertyWriters[key];
      }
    }
    return null;
  }

  // Returns true if the init binding specifies a field in which to write values extracted from the markup.
  function hasFieldOverride(initBinding) {
    if (isPlainObject(initBinding)) {
      // init: { field: fieldName }
      return initBinding.hasOwnProperty("field");
    }
    // init: fieldName
    return initBinding !== true;
  }

  // This binding handler initializes an observable to a value from the HTML element
  ko.bindingHandlers.init = {
    init: function(element, valueAccessor, allBindings, viewModel) {
      var initBinding = valueAccessor();

      if (initBinding === true) {
        return;
      }

      if (isObjectWithExplicitValues(initBinding)) {
        setExplicitObjectValues(initBinding, viewModel, allBindings);
      }

      var valueElement = isVirtualNode(element)
        ? ko.virtualElements.firstChild(element)
        : element;
      var value = initBinding.hasOwnProperty("value")
        ? initBinding["value"]
        : defaultMarkupReader(valueElement);
      writeValueToModel(
        value,
        initBinding.hasOwnProperty("field")
          ? initBinding["field"]
          : initBinding,
        initBinding["convert"],
        "field",
        allBindings,
        "_ko_prerender_initPropertyWriters"
      );
    }
  };

  generatePropertyWritersForBinding(
    "init",
    "_ko_prerender_initPropertyWriters",
    "field",
    function(expression) {
      var key = expression.key;
      return key === "convert" || key === "value"
        ? null //'convert' and 'value' do not reference writable fields
        : key === undefined || key === "field"
        ? expression // these should be left unchanged.
        : { key: key, value: key }; // for all others, the key should also be the value expression.
    }
  );

  ko.virtualElements.allowedBindings.init = true;
});
