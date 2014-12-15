/*!
 * Noty Helpers Javascript From JQuery Javascript Library
 *
 * Ported by Maksim Pecherskiy.  Original Licensing:
 *
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Nov 21 21:11:03 2011 -0500
 */


(function(){

  // String to Object flags format cache
var flagsCache = {};

// Convert String-formatted flags into Object-formatted ones and store in cache
function createFlags( flags ) {
  var object = flagsCache[ flags ] = {},
    i, length;
  flags = flags.split( /\s+/ );
  for ( i = 0, length = flags.length; i < length; i++ ) {
    object[ flags[i] ] = true;
  }
  return object;
}

jQuery.extend({

  _mark: function( elem, type ) {
    if ( elem ) {
      type = (type || "fx") + "mark";
      jQuery.data( elem, type, (jQuery.data(elem,type,undefined,true) || 0) + 1, true );
    }
  },

  _unmark: function( force, elem, type ) {
    if ( force !== true ) {
      type = elem;
      elem = force;
      force = false;
    }
    if ( elem ) {
      type = type || "fx";
      var key = type + "mark",
        count = force ? 0 : ( (jQuery.data( elem, key, undefined, true) || 1 ) - 1 );
      if ( count ) {
        jQuery.data( elem, key, count, true );
      } else {
        jQuery.removeData( elem, key, true );
        handleQueueMarkDefer( elem, type, "mark" );
      }
    }
  },

  queue: function( elem, type, data ) {
    if ( elem ) {
      type = (type || "fx") + "queue";
      var q = jQuery.data( elem, type, undefined, true );
      // Speed up dequeue by getting out quickly if this is just a lookup
      if ( data ) {
        if ( !q || jQuery.isArray(data) ) {
          q = jQuery.data( elem, type, jQuery.makeArray(data), true );
        } else {
          q.push( data );
        }
      }
      return q || [];
    }
  },

  dequeue: function( elem, type ) {
    type = type || "fx";

    var queue = jQuery.queue( elem, type ),
      fn = queue.shift(),
      defer;

    // If the fx queue is dequeued, always remove the progress sentinel
    if ( fn === "inprogress" ) {
      fn = queue.shift();
    }

    if ( fn ) {
      // Add a progress sentinel to prevent the fx queue from being
      // automatically dequeued
      if ( type === "fx" ) {
        queue.unshift("inprogress");
      }

      fn.call(elem, function() {
        jQuery.dequeue(elem, type);
      });
    }

    if ( !queue.length ) {
      jQuery.removeData( elem, type + "queue", true );
      handleQueueMarkDefer( elem, type, "queue" );
    }
  }
});

jQuery.fn.extend({
  queue: function( type, data ) {
    if ( typeof type !== "string" ) {
      data = type;
      type = "fx";
    }

    if ( data === undefined ) {
      return jQuery.queue( this[0], type );
    }
    return this.each(function() {
      var queue = jQuery.queue( this, type, data );

      if ( type === "fx" && queue[0] !== "inprogress" ) {
        jQuery.dequeue( this, type );
      }
    });
  },
  dequeue: function( type ) {
    return this.each(function() {
      jQuery.dequeue( this, type );
    });
  },
  // Based off of the plugin by Clint Helfers, with permission.
  // http://blindsignals.com/index.php/2009/07/jquery-delay/
  delay: function( time, type ) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";

    return this.queue( type, function() {
      var elem = this;
      setTimeout(function() {
        jQuery.dequeue( elem, type );
      }, time );
    });
  },
  clearQueue: function( type ) {
    return this.queue( type || "fx", [] );
  },
  // Get a promise resolved when queues of a certain type
  // are emptied (fx is the type by default)
  promise: function( type, object ) {
    if ( typeof type !== "string" ) {
      object = type;
      type = undefined;
    }
    type = type || "fx";
    var defer = jQuery.Deferred(),
      elements = this,
      i = elements.length,
      count = 1,
      deferDataKey = type + "defer",
      queueDataKey = type + "queue",
      markDataKey = type + "mark",
      tmp;
    function resolve() {
      if ( !( --count ) ) {
        defer.resolveWith( elements, [ elements ] );
      }
    }
    while( i-- ) {
      if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
          ( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
            jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
          jQuery.data( elements[ i ], deferDataKey, jQuery._Deferred(), true ) )) {
        count++;
        tmp.done( resolve );
      }
    }
    resolve();
    return defer.promise();
  }
});

function handleQueueMarkDefer( elem, type, src ) {
  var deferDataKey = type + "defer",
    queueDataKey = type + "queue",
    markDataKey = type + "mark",
    defer = jQuery._data( elem, deferDataKey );
  if ( defer &&
    ( src === "queue" || !jQuery._data(elem, queueDataKey) ) &&
    ( src === "mark" || !jQuery._data(elem, markDataKey) ) ) {
    // Give room for hard-coded callbacks to fire first
    // and eventually mark/queue something else on the element
    setTimeout( function() {
      if ( !jQuery._data( elem, queueDataKey ) &&
        !jQuery._data( elem, markDataKey ) ) {
        jQuery.removeData( elem, deferDataKey, true );
        defer.fire();
      }
    }, 0 );
  }
}



jQuery.Callbacks = function( flags ) {

  // Convert flags from String-formatted to Object-formatted
  // (we check in cache first)
  flags = flags ? ( /*flagsCache[ flags ] || */createFlags( flags ) ) : {};

  var // Actual callback list
    list = [],
    // Stack of fire calls for repeatable lists
    stack = [],
    // Last fire value (for non-forgettable lists)
    memory,
    // Flag to know if list is currently firing
    firing,
    // First callback to fire (used internally by add and fireWith)
    firingStart,
    // End of the loop when firing
    firingLength,
    // Index of currently firing callback (modified by remove if needed)
    firingIndex,
    // Add one or several callbacks to the list
    add = function( args ) {
      var i,
        length,
        elem,
        type,
        actual;
      for ( i = 0, length = args.length; i < length; i++ ) {
        elem = args[ i ];
        type = jQuery.type( elem );
        if ( type === "array" ) {
          // Inspect recursively
          add( elem );
        } else if ( type === "function" ) {
          // Add if not in unique mode and callback is not in
          if ( !flags.unique || !self.has( elem ) ) {
            list.push( elem );
          }
        }
      }
    },
    // Fire callbacks
    fire = function( context, args ) {
      args = args || [];
      memory = !flags.memory || [ context, args ];
      firing = true;
      firingIndex = firingStart || 0;
      firingStart = 0;
      firingLength = list.length;
      for ( ; list && firingIndex < firingLength; firingIndex++ ) {
        if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
          memory = true; // Mark as halted
          break;
        }
      }
      firing = false;
      if ( list ) {
        if ( !flags.once ) {
          if ( stack && stack.length ) {
            memory = stack.shift();
            self.fireWith( memory[ 0 ], memory[ 1 ] );
          }
        } else if ( memory === true ) {
          self.disable();
        } else {
          list = [];
        }
      }
    },
    // Actual Callbacks object
    self = {
      // Add a callback or a collection of callbacks to the list
      add: function() {
        if ( list ) {
          var length = list.length;
          add( arguments );
          // Do we need to add the callbacks to the
          // current firing batch?
          if ( firing ) {
            firingLength = list.length;
          // With memory, if we're not firing then
          // we should call right away, unless previous
          // firing was halted (stopOnFalse)
          } else if ( memory && memory !== true ) {
            firingStart = length;
            fire( memory[ 0 ], memory[ 1 ] );
          }
        }
        return this;
      },
      // Remove a callback from the list
      remove: function() {
        if ( list ) {
          var args = arguments,
            argIndex = 0,
            argLength = args.length;
          for ( ; argIndex < argLength ; argIndex++ ) {
            for ( var i = 0; i < list.length; i++ ) {
              if ( args[ argIndex ] === list[ i ] ) {
                // Handle firingIndex and firingLength
                if ( firing ) {
                  if ( i <= firingLength ) {
                    firingLength--;
                    if ( i <= firingIndex ) {
                      firingIndex--;
                    }
                  }
                }
                // Remove the element
                list.splice( i--, 1 );
                // If we have some unicity property then
                // we only need to do this once
                if ( flags.unique ) {
                  break;
                }
              }
            }
          }
        }
        return this;
      },
      // Control if a given callback is in the list
      has: function( fn ) {
        if ( list ) {
          var i = 0,
            length = list.length;
          for ( ; i < length; i++ ) {
            if ( fn === list[ i ] ) {
              return true;
            }
          }
        }
        return false;
      },
      // Remove all callbacks from the list
      empty: function() {
        list = [];
        return this;
      },
      // Have the list do nothing anymore
      disable: function() {
        list = stack = memory = undefined;
        return this;
      },
      // Is it disabled?
      disabled: function() {
        return !list;
      },
      // Lock the list in its current state
      lock: function() {
        stack = undefined;
        if ( !memory || memory === true ) {
          self.disable();
        }
        return this;
      },
      // Is it locked?
      locked: function() {
        return !stack;
      },
      // Call all callbacks with the given context and arguments
      fireWith: function( context, args ) {
        if ( stack ) {
          if ( firing ) {
            if ( !flags.once ) {
              stack.push( [ context, args ] );
            }
          } else if ( !( flags.once && memory ) ) {
            fire( context, args );
          }
        }
        return this;
      },
      // Call all the callbacks with the given arguments
      fire: function() {
        self.fireWith( this, arguments );
        return this;
      },
      // To know if the callbacks have already been called at least once
      fired: function() {
        return !!memory;
      }
    };

  return self;
};



jQuery.fn.extend({
  // Get a promise resolved when queues of a certain type
  // are emptied (fx is the type by default)
  promise: function( type, object ) {
    if ( typeof type !== "string" ) {
      object = type;
      type = undefined;
    }
    type = type || "fx";
    var defer = jQuery.Deferred(),
      elements = this,
      i = elements.length,
      count = 1,
      deferDataKey = type + "defer",
      queueDataKey = type + "queue",
      markDataKey = type + "mark",
      tmp;
    function resolve() {
      if ( !( --count ) ) {
        defer.resolveWith( elements, [ elements ] );
      }
    }
    while( i-- ) {
      if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
          ( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
            jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
          jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
        count++;
        tmp.add( resolve );
      }
    }
    resolve();
    return defer.promise();
  }
});
})();