/* jshint expr: true */ 
!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory(root);
  else
    root.onfire = factory(root);
}(typeof window !== 'undefined' ? window : this, function () {

// global event store
var slice = Function.call.bind(Array.prototype.slice),
__onfireEvents = {},
__cnt = 0, // 当前事件的计数器，用于拼接事件的key
length = 0,
_bind = function(eventName, callback, is_one) {
  if (typeof eventName !== 'string' || typeof callback !== 'function') {
    throw new Error('args[0] must be string, args[1] must be function.');
  }
  if (! __onfireEvents[eventName]) {
    __onfireEvents[eventName] = {};
    length ++;
  }
  var key = 'e' + (++__cnt);  // 绑定事件的索引
  __onfireEvents[eventName][key] = [callback, is_one];

  return [eventName, key];
},
// 绑定事件
on = function(eventName, callback) {
  return _bind(eventName, callback, false);
},
one = function(eventName, callback) {
  return _bind(eventName, callback, true);
},

// 触发事件
fire = function(eventName) {
  // 触发这个分类下的所有
  var callback, key;
  if (__onfireEvents[eventName]) {
    for (key in __onfireEvents[eventName]) {
      callback = __onfireEvents[eventName][key];

      callback[0].apply(null, slice(arguments, 1)); // do the function
      if (callback[1]) delete __onfireEvents[eventName][key]; // when is one, delete it after triggle
    }
  }
},
un = function(eventObject) {
  if (typeof eventObject === 'string') {
    // 直接取消事件
    if (__onfireEvents[eventObject]) {
      delete __onfireEvents[eventObject];
      length --;
      return true;
    }
    return false;
  }
  else if (typeof eventObject === 'object') {
    var eventName = eventObject[0], key = eventObject[1];
    if (__onfireEvents[eventName] && __onfireEvents[eventName][key]) {
      delete __onfireEvents[eventName][key];
      return true;
    }
    // 找不到注册事件，返回false
    return false;
  }
},
clear = function() {
  __onfireEvents = {};
  length = 0;
},
events = function() {
  var evts = [];
  for (var e in __onfireEvents) {
    evts.push(e);
  }
  return evts;
},
size = function () {
  return length;
};

	
	return {
		on: on,
		one: one,
		un: un,
		fire: fire,
		size: size,
		clear: clear,
		events: events,
	}
});