"use strict";

/*
 * arrive.js
 * v1.1.2
 * https://github.com/uzairfarooq/arrive
 * MIT licensed
 *
 * Copyright (c) 2014 Uzair Farooq
 */

(function(window, $, undefined) {

  var utils = (function() {
    var matches = HTMLElement.prototype.matches || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector
                  || HTMLElement.prototype.msMatchesSelector;

    return {
      matchesSelector: function(elem, selector) {
        return elem instanceof HTMLElement && matches.call(elem, selector);
      }, 
      // to enable function overriding - By John Resig (MIT Licensed)
      addMethod: function (object, name, fn) {
        var old = object[ name ];
        object[ name ] = function(){
          if ( fn.length == arguments.length )
            return fn.apply( this, arguments );
          else if ( typeof old == 'function' )
            return old.apply( this, arguments );
        };
      }
    };
  })();


  // Class to mantain state of all registered events of a single type
  var EventsBucket = (function() {
    var EventsBucket = function() {
      // holds all the events

      this._eventsBucket    = [], 
      // function to be called while adding an event, the function should do the event initialization/registration
      this._beforeAdding    = null, 
      // function to be called while removing an event, the function should do the event destruction
      this._beforeRemoving  = null;
    };

    EventsBucket.prototype.addEvent = function(target, selector, callback) {
      var newEvent = {
        target:             target, 
        selector:           selector, 
        callback:           callback, 
        firedElems:         []
      };

      if (this._beforeAdding) {
        this._beforeAdding(newEvent);
      }
      
      this._eventsBucket.push(newEvent);
      return newEvent;
    };

    EventsBucket.prototype.removeEvent = function(compareFunction) {
      for (var i=this._eventsBucket.length - 1, registeredEvent; registeredEvent = this._eventsBucket[i]; i--) {
        if (compareFunction(registeredEvent)) {
          if (this._beforeRemoving) {
              this._beforeRemoving(registeredEvent);
          }
          this._eventsBucket.splice(i, 1);
        }
      }
    };

    EventsBucket.prototype.beforeAdding = function(beforeAdding) {
      this._beforeAdding = beforeAdding;
    };

    EventsBucket.prototype.beforeRemoving = function(beforeRemoving) {
      this._beforeRemoving = beforeRemoving;
    };

    return EventsBucket;
  })();


  // General class for binding/unbinding arrive and leave events
  var MutationEvents = function(config, onMutation) {
    var eventsBucket  = new EventsBucket(), 
        me            = this;

    // actual event registration before adding it to bucket
    eventsBucket.beforeAdding(function(registrationData) {
      var 
        target    = registrationData.target, 
        selector  = registrationData.selector, 
        callback  = registrationData.callback, 
        observer;

      // mutation observer does not work on window or document
      if (target === window.document || target === window)
        target = document.getElementsByTagName("html")[0];

      // Create an observer instance
      observer = new MutationObserver(function(e) {
        onMutation.call(this, e, registrationData);
      });
      
      observer.observe(target, config);

      registrationData.observer = observer;
    });

    // cleanup/unregister before removing an event
    eventsBucket.beforeRemoving(function (eventData) {
      eventData.observer.disconnect();
    });

    function toArray(elements) {
      if (typeof elements.length !== "number") {
        elements = [elements];
      }
      return elements;
    }

    this.bindEvent = function(selector, callback) {
      var elements = toArray(this);
      for (var i = 0; i < elements.length; i++) {
        eventsBucket.addEvent(elements[i], selector, callback);
      }
    };

    this.unbindEvent = function() {
      var elements = toArray(this);
      eventsBucket.removeEvent(function(eventObj) {
        for (var i = 0; i < elements.length; i++) {
          if (eventObj.target === elements[i]) {
            return true;
          }
        }
        return false;
      });
    };

    this.unbindEventWithSelectorOrCallback = function(selector) {
      var elements = toArray(this), 
          callback = selector, 
          compareFunction;

      if (typeof selector === "function") {
        compareFunction = function(eventObj) {
          for (var i = 0; i < elements.length; i++) {
            if (eventObj.target === elements[i] && eventObj.callback === callback) {
              return true;
            }
          }
          return false;
        };
      }
      else {
        compareFunction = function(eventObj) {
          for (var i = 0; i < elements.length; i++) {
            if (eventObj.target === elements[i] && eventObj.selector === selector) {
              return true;
            }
          }
          return false;
        };
      }
      eventsBucket.removeEvent(compareFunction);
    };

    this.unbindEventWithSelectorAndCallback = function(selector, callback) {
      var elements = toArray(this);
      eventsBucket.removeEvent(function(eventObj) {
          for (var i = 0; i < elements.length; i++) {
            if (eventObj.target === elements[i] && eventObj.selector === selector && eventObj.callback === callback) {
              return true;
            }
          }
          return false;
      });
    };

    return this;
  };


  // traverse through all descendants of a node to check if event should be fired for any descendant
  function checkChildNodesRecursively(nodes, registrationData, callbacksToBeCalled) {
    // check each new node if it matches the selector
    for (var i=0, node; node = nodes[i]; i++) {
        if (utils.matchesSelector(node, registrationData.selector)) {
            // make sure the arrive event is not already fired for the element
            if (registrationData.firedElems.indexOf(node) == -1) {
              registrationData.firedElems.push(node);
              callbacksToBeCalled.push({ callback: registrationData.callback, elem: node });
            }
        }
        if (node.childNodes.length > 0) {
            checkChildNodesRecursively(node.childNodes, registrationData, callbacksToBeCalled);
        }
    }
  }

  function callCallbacks(callbacksToBeCalled) {
    for (var i = 0, cb; cb = callbacksToBeCalled[i]; i++) {
      cb.callback.call(cb.elem);
    }
  }

  function onArriveMutation(mutations, registrationData) {
    mutations.forEach(function( mutation ) {
      var newNodes    = mutation.addedNodes, 
          targetNode = mutation.target, 
          callbacksToBeCalled = [];

      // If new nodes are added
      if( newNodes !== null && newNodes.length > 0 ) {
        checkChildNodesRecursively(newNodes, registrationData, callbacksToBeCalled);
      }
      else if (mutation.type === "attributes") {
          if(utils.matchesSelector(targetNode, registrationData.selector)) {
            // make sure the arrive event is not already fired for the element
            if (registrationData.firedElems.indexOf(targetNode) == -1) {
              registrationData.firedElems.push(targetNode);
              callbacksToBeCalled.push({ callback: registrationData.callback, elem: targetNode });
            }
          }
      }

      callCallbacks(callbacksToBeCalled);
    });
  }

  function onLeaveMutation(mutations, registrationData) {
    mutations.forEach(function( mutation ) {
      var removedNodes  = mutation.removedNodes, 
          targetNode   = mutation.target, 
          callbacksToBeCalled = [];

      if( removedNodes !== null && removedNodes.length > 0 ) {
        checkChildNodesRecursively(removedNodes, registrationData, callbacksToBeCalled);
      }

      callCallbacks(callbacksToBeCalled);
    });
  }

  // Configuration of observers
  var arriveConfig = { 
        attributes: true, 
        childList: true, 
        subtree: true
      }, 
      leaveConfig = {
        childList: true, 
        subtree: true
      };

  var arriveEvents = new MutationEvents(arriveConfig, onArriveMutation), 
      leaveEvents  = new MutationEvents(leaveConfig, onLeaveMutation);


  /*** expose APIs ***/
  function exposeApi(exposeTo) {
    exposeTo.arrive = arriveEvents.bindEvent;
    // expose unbindArrive function with overriding 
    utils.addMethod(exposeTo, "unbindArrive", arriveEvents.unbindEvent);
    utils.addMethod(exposeTo, "unbindArrive", arriveEvents.unbindEventWithSelectorOrCallback);
    utils.addMethod(exposeTo, "unbindArrive", arriveEvents.unbindEventWithSelectorAndCallback);

    exposeTo.leave = leaveEvents.bindEvent;
    // expose unbindLeave function with overriding 
    utils.addMethod(exposeTo, "unbindLeave", leaveEvents.unbindEvent);
    utils.addMethod(exposeTo, "unbindLeave", leaveEvents.unbindEventWithSelectorOrCallback);
    utils.addMethod(exposeTo, "unbindLeave", leaveEvents.unbindEventWithSelectorAndCallback);
  }

  if ($) {
    exposeApi($.fn);
  }
  exposeApi(HTMLElement.prototype);
  exposeApi(NodeList.prototype);
  exposeApi(HTMLCollection.prototype);
  exposeApi(HTMLDocument.prototype);
  exposeApi(Window.prototype);

})(this, jQuery);
