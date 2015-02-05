/**
 Radio.js - Chainable, Dependency Free Publish/Subscribe for Javascript
 http://radio.uxder.com
 Author: Scott Murphy 2011
 twitter: @hellocreation, github: uxder
 
 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:
 
 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */
(function (name, global, definition) {
  if (typeof module !== 'undefined') module.exports = definition(name, global);
  else if (typeof define === 'function' && typeof define.amd  === 'object') define(definition);
  else global[name] = definition(name, global);
})('radio', this, function (name, global) {

  "use strict";

  /**
   * Main Wrapper for radio.$ and create a function radio to accept the channelName
   * @param {String} channelName topic of event
   */
  function radio(channelName) {
    arguments.length ? radio.$.channel(channelName) : radio.$.reset();
    return radio.$;
  }

  radio.$ = {
    version: '0.2',
    channelName: "",
    channels: [],

    /**
     * Reset global state, by removing all channels
     * @example
     *    radio()
     */
    reset: function() {
      radio.$.channelName = "";
      radio.$.channels = [];
    },
 
    /**
     * Broadcast (publish)
     * Iterate through all listeners (callbacks) in current channel and pass arguments to subscribers
     * @param arguments data to be sent to listeners
     * @example
     *    //basic usage
     *    radio('channel1').broadcast('my message'); 
     *    //send an unlimited number of parameters
     *    radio('channel2').broadcast(param1, param2, param3 ... );
     */
    broadcast: function() {
      var i, c = this.channels[this.channelName],
        l = c.length,
        subscriber, callback, context;
      //iterate through current channel and run each subscriber
      for (i = 0; i < l; i++) {
        subscriber = c[i];
        //if subscriber was an array, set the callback and context.
        if ((typeof(subscriber) === 'object') && (subscriber.length)) {
          callback = subscriber[0];
          //if user set the context, set it to the context otherwise, it is a globally scoped function
          context = subscriber[1] || global;
        }
        callback.apply(context, arguments);
      }
      return this;
    },

    /**
     * Create the channel if it doesn't exist and set the current channel/event name
     * @param {String} name the name of the channel
     * @example
     *    radio('channel1');
     */
    channel: function(name) {
      var c = this.channels;
      //create a new channel if it doesn't exists
      if (!c[name]) c[name] = [];
      this.channelName = name;
      return this;
    },

    /**
     * Add Subscriber to channel
     * Take the arguments and add it to the this.channels array.
     * @param {Function|Array} arguments list of callbacks or arrays[callback, context] separated by commas
     * @example
     *      //basic usage
     *      var callback = function() {};
     *      radio('channel1').subscribe(callback); 
     *
     *      //subscribe an endless amount of callbacks
     *      radio('channel1').subscribe(callback, callback2, callback3 ...);
     *
     *      //adding callbacks with context
     *      radio('channel1').subscribe([callback, context],[callback1, context], callback3);
     *     
     *      //subscribe by chaining
     *      radio('channel1').subscribe(callback).radio('channel2').subscribe(callback).subscribe(callback2);
     */
    subscribe: function() {
      var a = arguments,
        c = this.channels[this.channelName],
        i, l = a.length,
        p, ai = [];

      //run through each arguments and subscribe it to the channel
      for (i = 0; i < l; i++) {
        ai = a[i];
        //if the user sent just a function, wrap the fucntion in an array [function]
        p = (typeof(ai) === "function") ? [ai] : ai;
        if ((typeof(p) === 'object') && (p.length)) c.push(p);
      }
      return this;
    },

    /**
     * Remove subscriber from channel
     * Take arguments with functions and unsubscribe it if there is a match against existing subscribers.
     * @param {Function} arguments callbacks separated by commas
     * @example
     *      //basic usage
     *      radio('channel1').unsubscribe(callback); 
     *      //you can unsubscribe as many callbacks as you want
     *      radio('channel1').unsubscribe(callback, callback2, callback3 ...);
     *       //removing callbacks with context is the same
     *      radio('channel1').subscribe([callback, context]).unsubscribe(callback);
     */
    unsubscribe: function() {
      var a = arguments,
        i, j, c = this.channels[this.channelName],
        l = a.length,
        cl = c.length,
        offset = 0,
        jo;
      //loop through each argument
      for (i = 0; i < l; i++) {
        //need to reset vars that change as the channel array items are removed
        offset = 0;
        cl = c.length;
        //loop through the channel
        for (j = 0; j < cl; j++) {
          jo = j - offset;
          //if there is a match with the argument and the channel function, unsubscribe it from the channel array
          if (c[jo][0] === a[i]) {
            //unsubscribe matched item from the channel array
            c.splice(jo, 1);
            offset++;
          }
        }
      }
      return this;
    }
  };

  return radio;
});