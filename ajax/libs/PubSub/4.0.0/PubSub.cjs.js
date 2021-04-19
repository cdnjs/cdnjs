/*!
 * PubSub
 * Javascript implementation of the Publish/Subscribe pattern.
 *
 * @version v4.0.0
 * @author George Raptis <georapbox@gmail.com>
 * @homepage https://github.com/georapbox/PubSub#readme
 * @repository https://github.com/georapbox/PubSub.git
 * @license MIT
 */
'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var forOwn = function forOwn(obj, callback, thisArg) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (callback && callback.call(thisArg, obj[key], key, obj) === false) {
        return;
      }
    }
  }

  return obj;
};
var alias = function alias(fn, instance) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return instance[fn].apply(instance, args);
  };
};
var deliverTopic = function deliverTopic(topic, data, instance) {
  var topics = instance._pubsub_topics;
  var subscribers = topics[topic] ? _toConsumableArray(topics[topic]) : [];

  for (var i = 0, len = subscribers.length; i < len; i += 1) {
    var token = subscribers[i].token;
    var currentSubscriber = subscribers[i];

    if (!instance._options.immediateExceptions) {
      try {
        currentSubscriber.callback(data, {
          name: topic,
          token: token
        });
      } catch (exception) {
        setTimeout(function () {
          throw exception;
        }, 0);
      }
    } else {
      currentSubscriber.callback(data, {
        name: topic,
        token: token
      });
    } // Unsubscribe from event based on tokenized reference,
    // if subscriber's property once is set to true.


    if (currentSubscriber.once === true) {
      instance.unsubscribe(token);
    }
  }
};
var publishData = function publishData(topic) {
  for (var _len2 = arguments.length, data = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    data[_key2 - 1] = arguments[_key2];
  }

  return data.length <= 1 ? data[0] : [].concat(data);
};
var publish = function publish(instance, topic, data, sync) {
  var topics = instance._pubsub_topics;

  if (!topics[topic]) {
    return false;
  }

  sync ? deliverTopic(topic, data, instance) : setTimeout(function () {
    deliverTopic(topic, data, instance);
  }, 0);
  return true;
};

var PubSub = /*#__PURE__*/function () {
  /**
   * Creates a PubSub instance.
   * @constructor PubSub
   *
   * @param {object} [options] User options
   * @param {boolean} [options.immediateExceptions=false] Forces exceptions to be thrown immediately instead of delayed exceptions
   */
  function PubSub(options) {
    _classCallCheck(this, PubSub);

    var defaults = {
      immediateExceptions: false
    };
    this._pubsub_topics = {}; // Storage for topics that can be broadcast or listened to.

    this._pubsub_uid = -1; // A topic identifier.

    this._options = _objectSpread2(_objectSpread2({}, defaults), options);
  }
  /**
   * Subscribe to events of interest with a specific topic name and a
   * callback function, to be executed when the topic/event is observed.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @param {string} topic The topic's name
   * @param {function} callback Callback function to execute on event, taking two arguments:
   *        - {*} data The data passed when publishing an event
   *        - {object} The topic's info (name & token)
   * @param {boolean} [once=false] Checks if event will be triggered only one time
   * @return {number} The topic's token
   * @example
   *
   * const pubsub = new PubSub();
   *
   * const onUserAdd = pubsub.subscribe('user_add', (data, topic) => {
   *   console.log('User added');
   *   console.log('user data:', data);
   * });
   */


  _createClass(PubSub, [{
    key: "subscribe",
    value: function subscribe(topic, callback, once) {
      var topics = this._pubsub_topics;
      var token = this._pubsub_uid += 1;
      var obj = {};

      if (typeof callback !== 'function') {
        throw new TypeError('When subscribing for an event, a callback function must be defined.');
      }

      if (!topics[topic]) {
        topics[topic] = [];
      }

      obj.token = token;
      obj.callback = callback;
      obj.once = !!once;
      topics[topic].push(obj);
      return token;
    }
    /**
     * Subscribe to events of interest setting a flag
     * indicating the event will be published only one time.
     *
     * @memberof PubSub
     * @this {PubSub}
     * @param {string} topic The topic's name
     * @param {function} callback Callback function to execute on event, taking two arguments:
     *        - {*} data The data passed when publishing an event
     *        - {object} The topic's info (name & token)
     * @return {number} The topic's token
     * @example
     *
     * const onUserAdd = pubsub.subscribeOnce('user_add', (data, topic) => {
     *   console.log('User added');
     *   console.log('user data:', data);
     * });
     */

  }, {
    key: "subscribeOnce",
    value: function subscribeOnce(topic, callback) {
      return this.subscribe(topic, callback, true);
    }
    /**
     * Publishes a topic asynchronously, passing the data to its subscribers.
     * Asynchronous publication helps in that the originator of the topics will
     * not be blocked while consumers process them.
     * For synchronous topic publication check `publishSync`.
     *
     * @memberof PubSub
     * @this {PubSub}
     * @param {string} topic The topic's name
     * @param {...*} [data] The data to be passed to its subscribers
     * @return {boolean} Returns `true` if topic exists and event is published; otheriwse `false`
     * @example
     *
     * pubsub.publish('user_add', {
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   email: 'johndoe@gmail.com'
     * });
     */

  }, {
    key: "publish",
    value: function publish$1(topic) {
      for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      return publish(this, topic, publishData.apply(void 0, [topic].concat(data)), false);
    }
    /**
     * Publishes a topic synchronously, passing the data to its subscribers.
     *
     * @memberof PubSub
     * @this {PubSub}
     * @param {string} topic The topic's name
     * @param {...*} [data] The data to be passed to its subscribers
     * @return {boolean} Returns `true` if topic exists and event is published; otheriwse `false`
     * @example
     *
     * pubsub.publishSync('user_add', {
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   email: 'johndoe@gmail.com'
     * });
     */

  }, {
    key: "publishSync",
    value: function publishSync(topic) {
      for (var _len2 = arguments.length, data = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        data[_key2 - 1] = arguments[_key2];
      }

      return publish(this, topic, publishData.apply(void 0, [topic].concat(data)), true);
    }
    /**
     * Unsubscribes from a specific topic, based on the topic name,
     * or based on a tokenized reference to the subscription.
     *
     * @memberof PubSub
     * @this {PubSub}
     * @param {string|number} topic Topic's name or subscription reference
     * @return {boolean|string} Returns `false` if `topic` does not match a subscribed event; otherwise the topic's name
     * @example
     *
     * // Unsubscribe using the topic's name.
     * pubsub.unsubscribe('user_add');
     *
     * // Unsubscribe using a tokenized reference to the subscription.
     * pubsub.unsubscribe(onUserAdd);
     */

  }, {
    key: "unsubscribe",
    value: function unsubscribe(topic) {
      var topics = this._pubsub_topics;
      var tf = false;

      for (var prop in topics) {
        if (Object.prototype.hasOwnProperty.call(topics, prop)) {
          if (topics[prop]) {
            var len = topics[prop].length;

            while (len) {
              len -= 1; // `topic` is a tokenized reference to the subscription.

              if (topics[prop][len].token === topic) {
                topics[prop].splice(len, 1);

                if (topics[prop].length === 0) {
                  delete topics[prop];
                }

                return topic;
              } // `topic` is the event name.


              if (prop === topic) {
                topics[prop].splice(len, 1);

                if (topics[prop].length === 0) {
                  delete topics[prop];
                }

                tf = true;
              }
            }

            if (tf === true) {
              return topic;
            }
          }
        }
      }

      return false;
    }
    /**
     * Clears all subscriptions whatsoever.
     *
     * @memberof PubSub
     * @this {PubSub}
     * @return {PubSub} The PubSub instance.
     * @example
     *
     * const pubsub = new PubSub();
     * pubsub.subscribe('message1', () => {});
     * pubsub.subscribe('message2', () => {});
     * pubsub.subscribe('message3', () => {});
     * pubsub.unsubscribeAll();
     * pubsub.hasSubscribers(); // -> false
     */

  }, {
    key: "unsubscribeAll",
    value: function unsubscribeAll() {
      this._pubsub_topics = {};
      return this;
    }
    /**
     * Checks if there are subscribers for a specific topic.
     * If `topic` is not provided, checks if there is at least one subscriber.
     *
     * @memberof PubSub
     * @this {PubSub}
     * @param {string} [topic] The topic's name to check
     * @return {boolean} Returns `true` there are subscribers; otherwise `false`
     * @example
     *
     * const pubsub = new PubSub();
     * pubsub.on('message', data => console.log(data));
     *
     * pubsub.hasSubscribers('message');
     * // -> true
     */

  }, {
    key: "hasSubscribers",
    value: function hasSubscribers(topic) {
      var topics = this._pubsub_topics;
      var hasSubscribers = false; // If no arguments passed

      if (topic == null) {
        forOwn(topics, function (value, key) {
          if (key) {
            hasSubscribers = true;
            return false;
          }
        });
        return hasSubscribers;
      } // If a topic's name is passed as argument


      return Object.prototype.hasOwnProperty.call(topics, topic);
    }
    /**
     * Gets all the subscribers as a set of key value pairs that
     * represent the topic's name and the event listener(s) bound.
     *
     * @NOTE Mutating the result of this method does not affect the real subscribers. This is for reference only.
     *
     * @memberof PubSub
     * @this {PubSub}
     * @return {object} A readonly object with all subscribers.
     * @example
     *
     * const pubsub = new PubSub();
     *
     * pubsub.subscribe('message', listener);
     * pubsub.subscribe('message', listener);
     * pubsub.subscribe('another_message', listener);
     *
     * pubsub.subscribers();
     * // -> Object { message: Array[2], another_message: Array[1] }
     */

  }, {
    key: "subscribers",
    value: function subscribers() {
      var res = {};
      forOwn(this._pubsub_topics, function (topicValue, topicKey) {
        res[topicKey] = _toConsumableArray(topicValue);
      });
      return res;
    }
    /**
     * Gets subscribers for a specific topic.
     *
     * @NOTE Mutating the result of this method does not affect the real subscribers. This is for reference only.
     *
     * @memberof PubSub
     * @this {PubSub}
     * @param {string} topic The topic's name to check for subscribers
     * @return {array} A copy array of all subscribers for a topic if exist; otherwise an empty array
     * @example
     *
     * const pubsub = new PubSub();
     *
     * pubsub.subscribe('message', listener1);
     * pubsub.subscribeOnce('message', listener2);
     * pubsub.subscribe('another_message', listener1);
     *
     * pubsub.subscribersByTopic('message');
     * // -> Array [{token: 0, once: false, callback: listener1()}, {token: 1, once: true, callback: listener2()}]
     *
     * pubsub.subscribersByTopic('another_message');
     * // -> Array [{token: 2, once: false, callback: listener1()}]
     *
     * pubsub.subscribersByTopic('some_message_not_existing');
     * // -> Array []
     */

  }, {
    key: "subscribersByTopic",
    value: function subscribersByTopic(topic) {
      return this._pubsub_topics[topic] ? _toConsumableArray(this._pubsub_topics[topic]) : [];
    }
    /**
     * Creates aliases for public methods.
     *
     * @memberof PubSub
     * @this {PubSub}
     * @param {object} aliasMap A plain object that maps the public methods to their aliases.
     * @return {PubSub} The PubSub instance.
     * @example
     *
     * const pubsub = new PubSub().alias({
     *   subscribe: 'on',
     *   subscribeOnce: 'once',
     *   publish: 'trigger',
     *   publishSync: 'triggerSync',
     *   unsubscribe: 'off',
     *   hasSubscribers: 'has'
     * });
     */

  }, {
    key: "alias",
    value: function alias$1(aliasMap) {
      var _this = this;

      forOwn(aliasMap, function (value, key) {
        if (PubSub.prototype[key]) {
          PubSub.prototype[aliasMap[key]] = alias(key, _this);
        }
      });
      return this;
    }
  }]);

  return PubSub;
}();

PubSub.createInstance = function (options) {
  return new PubSub(options);
};

module.exports = PubSub;
