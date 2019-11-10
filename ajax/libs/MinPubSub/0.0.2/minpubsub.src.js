/*!
 * MinPubSub
 * Copyright(c) 2011 Daniel Lamb <daniellmb.com>
 * MIT Licensed
 */
(function (context) {
  var MinPubSub = {};

  // the topic/subscription hash
  var cache = context.c_ || {}; //check for 'c_' cache for unit testing

  MinPubSub.publish = function ( /* String */ topic, /* Array? */ args) {
    // summary: 
    //    Publish some data on a named topic.
    // topic: String
    //    The channel to publish on
    // args: Array?
    //    The data to publish. Each array item is converted into an ordered
    //    arguments on the subscribed functions. 
    //
    // example:
    //    Publish stuff on '/some/topic'. Anything subscribed will be called
    //    with a function signature like: function(a,b,c){ ... }
    //
    //    publish('/some/topic', ['a','b','c']);

    var subs = cache[topic],
      len = subs ? subs.length : 0;

    //can change loop or reverse array if the order matters
    while (len--) {
      subs[len].apply(context, args || []);
    }
  };

  MinPubSub.subscribe = function ( /* String */ topic, /* Function */ callback) {
    // summary:
    //    Register a callback on a named topic.
    // topic: String
    //    The channel to subscribe to
    // callback: Function
    //    The handler event. Anytime something is publish'ed on a 
    //    subscribed channel, the callback will be called with the
    //    published array as ordered arguments.
    //
    // returns: Array
    //    A handle which can be used to unsubscribe this particular subscription.
    //        
    // example:
    //    subscribe('/some/topic', function(a, b, c){ /* handle data */ });

    if (!cache[topic]) {
      cache[topic] = [];
    }
    cache[topic].push(callback);
    return [topic, callback]; // Array
  };

  MinPubSub.unsubscribe = function ( /* Array */ handle, /* Function? */ callback) {
    // summary:
    //    Disconnect a subscribed function for a topic.
    // handle: Array
    //    The return value from a subscribe call.
    // example:
    //    var handle = subscribe('/some/topic', function(){});
    //    unsubscribe(handle);

    var subs = cache[callback ? handle : handle[0]],
      callback = callback || handle[1],
      len = subs ? subs.length : 0;

    while (len--) {
      if (subs[len] === callback) {
        subs.splice(len, 1);
      }
    }
  };

  // UMD definition to allow for CommonJS, AMD and legacy window
  if (typeof module === 'object' && module.exports) {
    // CommonJS, just export
    module.exports = exports = MinPubSub;
  } else if (typeof define === 'function' && define.amd) {
    // AMD support
    define(function () {
      return MinPubSub;
    });
  } else if (typeof context === 'object') {
    // If no AMD and we are in the browser, attach to window
    context.publish = MinPubSub.publish;
    context.subscribe = MinPubSub.subscribe;
    context.unsubscribe = MinPubSub.unsubscribe;
  }

})(this.window);