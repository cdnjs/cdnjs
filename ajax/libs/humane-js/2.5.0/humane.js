/**
 * humane.js
 * Humanized Messages for Notifications
 * @author Marc Harter (@wavded)
 * @example
 *   humane('hello world');
 * See more usage examples at: http://wavded.github.com/humane-js/
 */
;(function (win,doc) {

   var on, off, isArray,
      eventing = false,
      animationInProgress = false,
      humaneEl = null,
      timeout = null,
      useFilter = /msie [678]/i.test(navigator.userAgent), // sniff, sniff
      vendors = { Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS' },
      eventPrefix = "",
      isSetup = false,
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
      return win.humane[type][config] !== void 0 ? win.humane[type][config] : win.humane[config];
   }

   on (win,'load', setup)

   function setup() {
      var useTransitions = false;
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
      if (!queue.length) { remove(); return; }

      after = null;
      animationInProgress = true;
      if (timeout) {
         clearTimeout(timeout);
         timeout = null;
      }

      var next = queue.shift(),
         type = next[0],
         content = next[1];

      humane._lastCallback = next[2];

      if ( getConfig(type, 'clickToClose') === true ) {
         on (humaneEl, 'click', remove);
         on (humaneEl, 'touchstart', remove);
      }

      timeoutInMillis = getConfig(type, 'timeout');

      if (timeoutInMillis > 0) {
         timeout = setTimeout(function(){ // allow notification to stay alive for timeout
            if (!eventing) {
               on (doc.body, 'mousemove', remove);
               on (doc.body, 'click', remove);
               on (doc.body, 'keypress', remove);
               on (doc.body, 'touchstart', remove);
               eventing = true;
               console.log( getConfig(type, 'waitForMove') );
               if( getConfig(type, 'waitForMove') !== true ) remove();
            }
         }, timeoutInMillis);
      }

      if ( isArray(content) ) content = '<ul><li>' + content.join('<li>') + '</ul>';

      humaneEl.innerHTML = content;
      animate(1,type);
   }

   function animate (level,type) {
      if (level === 1) {
         humaneEl.className = "humane humane-" + type + " humane-animate";
         off ( humaneEl, normalizeEvent('TransitionEnd'), end );
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
      animationInProgress = false;
      if(humane._lastCallback) humane._lastCallback()
      run();
   }

   var setOpacity = useFilter
      ? function (opacity) { humaneEl.filters.item('DXImageTransform.Microsoft.Alpha').Opacity = opacity*100; }
      : function (opacity) { humaneEl.style.opacity = String(opacity); }

   function jsAnimateOpacity (level,type) {
      var interval;
      var opacity;

      if (level === 1) {
         opacity = 0;
         humaneEl.className = "humane humane-js-animate humane-" + type;
         if (useFilter) setOpacity(0); // reset value so hover states work

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
               clearInterval(interval);
               end();
            }
         }, 100 / 20);
      }
   }

   function notifier (type) {
      return function (message, cb) {
         queue.push( [type, message, cb] );
         if (isSetup) run();
      }
   }

   win.humane = notifier('log');
   win.humane.log = notifier('log');
   win.humane.error = notifier('error');
   win.humane.info = notifier('info');
   win.humane.success = notifier('success');

   // options
   win.humane.timeout = 2500;
   win.humane.waitForMove = false;
   win.humane.clickToClose = false;

})( window, document );
