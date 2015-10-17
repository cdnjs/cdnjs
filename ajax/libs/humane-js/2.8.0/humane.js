/**
 * humane.js
 * Humanized Messages for Notifications
 * @author Marc Harter (@wavded)
 * @example
 *   humane('hello world');
 * See more usage examples at: http://wavded.github.com/humane-js/
 */
;(function (win,doc) {

   var humane, on, off, isArray,
      eventing = false,
      useTransitions = false,
      animationInProgress = false,
      humaneEl = null,
      timeout = null,
      useFilter = /msie [678]/i.test(navigator.userAgent), // sniff, sniff
      vendors = { Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS' },
      eventPrefix = "",
      isSetup = false,
      currentMessage = {},
      noop = function(){},
      events = { 'add': noop, 'show': noop, 'hide': noop },
      queue = [];

   if ('addEventListener' in win) {
      on  = function (obj,type,fn) { obj.addEventListener(type,fn,false)    };
      off = function (obj,type,fn) { obj.removeEventListener(type,fn,false) };
   }
   else {
      on  = function (obj,type,fn) { obj.attachEvent('on'+type,fn) };
      off = function (obj,type,fn) { obj.detachEvent('on'+type,fn) };
   }

   isArray = Array.isArray || function (obj) { return Object.prototype.toString.call(obj) === '[object Array]' };

   function normalizeEvent(name) {
      return eventPrefix ? eventPrefix + name : name.toLowerCase();
   }

   function getConfig(type, config) {
      return currentMessage.instance[config] !== void 0 ? currentMessage.instance[config] : win.humane[config];
   }

   on (win,'load', setup);

   function setup() {
      humaneEl = doc.createElement('div');
      humaneEl.id = 'humane';
      humaneEl.className = 'humane';
      doc.body.appendChild(humaneEl);
      for (vendor in vendors) {
         if (vendor + 'TransitionProperty' in humaneEl.style) {
            eventPrefix = vendors[vendor];
            useTransitions = true;
         }
      }
      if (!useTransitions) animate = jsAnimateOpacity; // use js animation when no transition support
      isSetup = true;
      run();
   }

   function run() {
      if (animationInProgress) return;
      if (!queue.length) return;

      after = null;
      animationInProgress = true;
      if (timeout) {
         clearTimeout(timeout);
         timeout = null;
      }

      var next = queue.shift();
      currentMessage = { type: next[0], message: next[1], instance: next[2], callback: next[3] };
      var content = currentMessage.message,
         type = currentMessage.type;

      if ( getConfig(type, 'clickToClose') === true ) {
         on (humaneEl, 'click', remove);
         on (humaneEl, 'touchstart', remove);
      }

      var timeoutInMillis = getConfig(type, 'timeout');

      if (timeoutInMillis > 0) {
         timeout = setTimeout(function(){ // allow notification to stay alive for timeout
            if (!eventing) {
               on (doc.body, 'mousemove', remove);
               on (doc.body, 'click', remove);
               on (doc.body, 'keypress', remove);
               on (doc.body, 'touchstart', remove);
               eventing = true;
               if( getConfig(type, 'waitForMove') !== true ) remove();
            }
         }, timeoutInMillis);
      }

      events['show'](type,content,'show');
      if ( isArray(content) ) content = '<ul><li>' + content.join('<li>') + '</ul>';

      humaneEl.innerHTML = content;
      humaneEl.style.display = 'block';
      setTimeout(function(){ animate(1,type); },50) // prevent queueing display in animation
   }

   function animate (level,type) {
      if (level === 1) {
         humaneEl.className = "humane humane-" + type + " humane-animate";
      }
      else {
         humaneEl.className = humaneEl.className.replace(" humane-animate","");
         on ( humaneEl, normalizeEvent('TransitionEnd'), end );
      }
   }

   function remove() {
      off (doc.body, 'mousemove', remove);
      off (doc.body, 'click', remove);
      off (doc.body, 'keypress', remove);
      off (doc.body, 'touchstart', remove);
      // remove click and touchstart in case clickToClose was added
      off (humaneEl, 'click', remove);
      off (humaneEl, 'touchstart', remove);
      eventing = false;
      if (animationInProgress) animate(0);
   }


   function end() {
      // turn off animation event if supported, a little trigger happy
      if (useTransitions) off ( humaneEl, normalizeEvent('TransitionEnd'), end );
      animationInProgress = false;
      if (currentMessage.callback) currentMessage.callback();
      events['hide'](currentMessage.type, currentMessage.message,'hide');
      humaneEl.style.display = 'none';
      run();
   }

   var setOpacity = useFilter
      ? function (opacity) { humaneEl.filters.item('DXImageTransform.Microsoft.Alpha').Opacity = opacity*100; }
      : function (opacity) { humaneEl.style.opacity = String(opacity); }

   function jsAnimateOpacity (level, type) {
      var interval;
      var opacity;

      if (level === 1) {
         opacity = 0;
         humaneEl.className = "humane humane-js-animate humane-" + type;
         if (useFilter) setOpacity(0); // reset value so hover states work
         humaneEl.style.zIndex = 1000000;

         interval = setInterval(function(){
            if (opacity < 1) {
               opacity += 0.1;
               if (opacity > 1) opacity = 1;
               setOpacity(opacity);
            }
            else {
               clearInterval(interval);
            }
         }, 100 / 20);
      }
      else {
         opacity = 1;
         interval = setInterval(function(){
            if(opacity > 0) {
               opacity -= 0.1;
               if (opacity < 0) opacity = 0;
               setOpacity(opacity);
            }
            else {
               humaneEl.className = humaneEl.className.replace(" humane-js-animate","");
               humaneEl.style.zIndex = -1;
               clearInterval(interval);
               end();
            }
         }, 100 / 20);
      }
   }

   function notifier (type) {
      return function instance (message, cb) {
         queue.push( [type, message, instance, cb] );
         events['add'](type, message, 'add');
         if (isSetup) run();
      }
   }

   // types
   humane = notifier('log');
   humane.log = notifier('log');
   humane.error = notifier('error');
   humane.info = notifier('info');
   humane.success = notifier('success');
   humane.remove = remove;

   humane.create = function (options) {
      var type = notifier(options.type || 'log');
      type.timeout = options.timeout || 2500;
      type.waitForMove = options.waitForMove || false;
      type.clickToClose = options.clickToClose || false;
      return type;
   }

   // options
   humane.timeout = 2500;
   humane.waitForMove = false;
   humane.clickToClose = false;

   // events
   humane.on = function(type, handler){ events[type] = handler; };
   win.humane = humane;
})( window, document );
