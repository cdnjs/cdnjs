/* jshint expr: true */ 
!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory(root);
  else
    root.onfire = factory(root);
}(typeof window !== 'undefined' ? window : this, function () {

// global event store
var __onfireEventsStore = {},
__cnt = 0, // 当前事件的计数器，用于拼接事件的key
length = 0,
// 绑定事件
on = function(eventName, callback) {
  if (typeof eventName !== 'string' || typeof callback !== 'function') {
    throw new Error('args[0] must be string, args[1] must be function.');
  }
  if (! __onfireEventsStore[eventName]) {
    __onfireEventsStore[eventName] = {};
    length ++;
  }
  var key = 'e' + (++__cnt);  // 绑定事件的索引
  __onfireEventsStore[eventName][key] = callback;

  return [eventName, key];
},
// 触发事件
fire = function(eventName, data) {
  // 触发这个分类下的所有
  if (__onfireEventsStore[eventName]) {
    // console.log(onfire.__onfireEventsStore[eventName]);
    for (var key in __onfireEventsStore[eventName]) {
      // console.log(onfire.__onfireEventsStore[eventName][key], data);
      __onfireEventsStore[eventName][key](data);
    }
  }
},
un = function(eventObject) {
  if (typeof eventObject === 'string') {
    // 直接取消事件
    if (__onfireEventsStore[eventObject]) {
      delete __onfireEventsStore[eventObject];
      length --;
      return true;
    }
    return false;
  }
  else if (typeof eventObject === 'object') {
    var eventName = eventObject[0], key = eventObject[1];
    if (__onfireEventsStore[eventName] && __onfireEventsStore[eventName][key]) {
      delete __onfireEventsStore[eventName][key];
      return true;
    }
    // 找不到注册事件，返回false
    return false;
  }
},
clear = function() {
  __onfireEventsStore = {};
  length = 0;
},
events = function() {
  var evts = [];
  for (var e in __onfireEventsStore) {
    evts.push(e);
  }
  return evts;
},
size = function () {
  return length;
};

	
	return {
		on: on,
		un: un,
		fire: fire,
		size: size,
		clear: clear,
		events: events,
	}
});