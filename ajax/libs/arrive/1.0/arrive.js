"use strict";

/*
 * arrive.js
 * v1.0
 * https://github.com/uzairfarooq/arrive
 * MIT licensed
 *
 * Copyright (c) 2014 Uzair Farooq
 */

(function(window, $, undefined) {

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
          target = document.body.parentNode;

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

    this.bindEvent = function(selector, callback) {
      for (var i = 0; i < this.length; i++) {
        eventsBucket.addEvent(this[i], selector, callback);
      }
    };

    this.unbindEvent = function() {
      var target = this[0];
      eventsBucket.removeEvent(function(eventObj) {
        return eventObj.target === target;
      });
    };

    this.unbindEventWithSelectorOrCallback = function(selector) {
      var target = this[0], 
          callback = selector, 
          compareFunction;

      if (typeof selector === "function") {
        compareFunction = function(eventObj) {
          return eventObj.target === target && eventObj.callback === callback;
        };
      }
      else {
        compareFunction = function(eventObj) {
          return eventObj.target === target && eventObj.selector === selector;
        };
      }
      eventsBucket.removeEvent(compareFunction);
    };

    this.unbindEventWithSelectorAndCallback = function(selector, callback) {
      var target = this[0];
      eventsBucket.removeEvent(function(eventObj) {
        return eventObj.target === target && eventObj.selector === selector && eventObj.callback === callback;
      });
    };

      return this;
  };


  // traverse through all descendants of a node to check if event should be fired for any descendant
  function checkChildNodesRecursively(nodes, registrationData, callbacksToBeCalled) {
    // check each new node if it matches the selector
    for (var i=0, node; node = nodes[i]; i++) {
        var $node = $(node);
        if ($node.is(registrationData.selector)) {
            // make sure the arrive event is not already fired for the element
            if (registrationData.firedElems.indexOf($node[0]) == -1) {
              registrationData.firedElems.push($node[0]);
              callbacksToBeCalled.push({ callback: registrationData.callback, elem: $node[0] });
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
          $targetNode = $(mutation.target), 
          callbacksToBeCalled = [];

      // If new nodes are added
      if( newNodes !== null && newNodes.length > 0 ) {
        checkChildNodesRecursively(newNodes, registrationData, callbacksToBeCalled);
      }
      else if (mutation.type === "attributes") {
          if( $targetNode.is(registrationData.selector)) {
            // make sure the arrive event is not already fired for the element
            if (registrationData.firedElems.indexOf($targetNode[0]) == -1) {
              registrationData.firedElems.push($targetNode[0]);
              callbacksToBeCalled.push({ callback: registrationData.callback, elem: $targetNode[0] });
            }
          }
      }

      callCallbacks(callbacksToBeCalled);
    });
  }

  function onLeaveMutation(mutations, registrationData) {
    mutations.forEach(function( mutation ) {
      var removedNodes  = mutation.removedNodes, 
          $targetNode   = $(mutation.target), 
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


  // to enable function overriding - By John Resig (MIT Licensed)
  function addMethod(object, name, fn) {
    var old = object[ name ];
    object[ name ] = function(){
      if ( fn.length == arguments.length )
        return fn.apply( this, arguments );
      else if ( typeof old == 'function' )
        return old.apply( this, arguments );
    };
  }


  /*** expose APIs ***/

  $.fn.arrive = arriveEvents.bindEvent;
  // expose unbindArrive function with overriding 
  addMethod($.fn, "unbindArrive", arriveEvents.unbindEvent);
  addMethod($.fn, "unbindArrive", arriveEvents.unbindEventWithSelectorOrCallback);
  addMethod($.fn, "unbindArrive", arriveEvents.unbindEventWithSelectorAndCallback);

  $.fn.leave = leaveEvents.bindEvent;
  // expose unbindLeave function with overriding 
  addMethod($.fn, "unbindLeave", leaveEvents.unbindEvent);
  addMethod($.fn, "unbindLeave", leaveEvents.unbindEventWithSelectorOrCallback);
  addMethod($.fn, "unbindLeave", leaveEvents.unbindEventWithSelectorAndCallback);

})(this, jQuery);
