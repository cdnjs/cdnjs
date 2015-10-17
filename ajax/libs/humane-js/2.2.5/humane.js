/**
 * HumaneJS
 * Humanized Messages for Notifications
 * @author Marc Harter (@wavded)
 * @contributers
 *   Alexander (@bga_)
 *   Jose (@joseanpg)
 *   Will McKenzie (@OiNutter)
 * @example
 *   humane('hello world');
 * See more usage examples at: http://wavded.github.com/humane-js/
 */
;(function (win,doc) {
  var on,
  	  off,
  	  isArray,
  	  eventing = false,
  	  animationInProgress = false,
  	  humaneEl = null,
  	  timeout = null,
  	  useFilter = /msie [678]/i.test(navigator.userAgent), // sniff, sniff,
  	  vendors = {Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS'},
  	  eventPrefix = "",
  	  isSetup = false,
  	  queue = [],
  	  after = null;

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

  on (win,'load',function () {
    var transitionSupported = ( function (style) {
      var prefixes = ['MozT','WebkitT','OT','msT','KhtmlT','t'];
      for(var i = 0, prefix; prefix = prefixes[i]; i++) {
        if (prefix+'ransition' in style) return true;
      }
      return false;
    }(doc.body.style));
    if (!transitionSupported) animate = jsAnimateOpacity; // use js animation when no transition support

    setup(); run();
  });

  function setup() {
    humaneEl = doc.createElement('div');
    humaneEl.id = 'humane';
    humaneEl.className = 'humane';
    doc.body.appendChild(humaneEl);
    for (vendor in vendors){
    	if (humaneEl.style[vendor + 'TransitionProperty'] !== undefined)
    	      eventPrefix = vendors[vendor];
    }
    isSetup = true;
  }

  function remove() {
    off (doc.body,'mousemove',remove);
    off (doc.body,'click',remove);
    off (doc.body,'keypress',remove);
    off (doc.body,'touchstart',remove);
    eventing = false;
    if (humane.clickToClose) { off (humaneEl,'click',remove); off (humaneEl, 'touchstart', remove); }
    if (animationInProgress) animate(0);
  }

  function run() {
    if (animationInProgress && !win.humane.forceNew) return;
    if (!queue.length) { remove(); return; }
    after = null;
    animationInProgress = true;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(function(){ // allow notification to stay alive for timeout
      if (!eventing) {
        on (doc.body,'mousemove',remove);
        on (doc.body,'click',remove);
        on (doc.body,'keypress',remove);
        on (doc.body,'touchstart',remove);
        eventing = true;
        if(!win.humane.waitForMove) remove();
      }
    }, win.humane.timeout);

    if (humane.clickToClose) { on (humaneEl,'click',remove); on (humaneEl, 'touchstart', remove); }

    var next = queue.shift(),
    	type = next[0],
    	content = next[1],
    	callback = next[2];

    after = callback;
    if ( isArray(content) ) content = '<ul><li>' + content.join('<li>') + '</ul>';

    humaneEl.innerHTML = content;
    animate(type,1);
  }

  function animate (type,level) {
    if(level === 1){
      humaneEl.className = "humane humane-" + type + " humane-animate";
    }
    else {
      humaneEl.className = humaneEl.className.replace(" humane-animate","");
      if(after!=null)
    	  on(humaneEl,normalizeEvent('TransitionEnd'),after);
      end();
    }
  }

  function end(){
    setTimeout(function(){
      animationInProgress = false;
      run();
    },500);
  }

  // if CSS Transitions not supported, fallback to JS Animation
  var setOpacity = (function(){
    if (useFilter) {
      return function(opacity){
        humaneEl.filters.item('DXImageTransform.Microsoft.Alpha').Opacity = opacity*100;

      }
    }
    else {
      return function (opacity) { humaneEl.style.opacity = String(opacity); }
    }
  }());

  function jsAnimateOpacity(type,level){
    var interval;
    var opacity;

    if (level === 1) {
      opacity = 0;
      humaneEl.className = "humane humane-js-animate humane-" + type;
      if (humaneEl.filters) humaneEl.filters.item('DXImageTransform.Microsoft.Alpha').Opacity = 0; // reset value so hover states work

      if (win.humane.forceNew) {
        opacity = useFilter
          ? humaneEl.filters.item('DXImageTransform.Microsoft.Alpha').Opacity/100|0
          : humaneEl.style.opacity|0;
      }
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
          if(after!=null)
        	  after();
          end();
        }
      }, 100 / 20);
    }
  }

  function notifier (type) {
    return function (message,callback) {
      queue.push( [type, message,callback] );
      if(isSetup) run();
    }
  }

  win.humane = notifier('log');

  win.humane.log = notifier('log');
  win.humane.error = notifier('error');
  win.humane.info = notifier('info');
  win.humane.success = notifier('success');

  win.humane.timeout = 2500;
  win.humane.waitForMove = false;
  win.humane.forceNew = false;
  win.humane.clickToClose = false;

}( window, document));
