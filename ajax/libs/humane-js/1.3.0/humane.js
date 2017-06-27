/**
 * HumaneJS
 * Humanized Messages for Notifications
 * @author Marc Harter (@wavded)
 * @contributers
 *   Alexander (@bga_)
 *   Jose (@joseanpg)
 * @example
 *  humane('hello world');
 */
;(function(win,doc){
    var eventOn, eventOff;
    if (win.addEventListener) {
       eventOn = function(obj,type,fn){obj.addEventListener(type,fn,false)};
       eventOff = function(obj,type,fn){obj.removeEventListener(type,fn,false)};
    } else {
       eventOn = function(obj,type,fn){obj.attachEvent('on'+type,fn)};
       eventOff = function(obj,type,fn){obj.detachEvent('on'+type,fn)};
    }

    var eventing = false,
        animationInProgress = false,
        humaneEl = null,
        timeout = null,
        useFilter = /msie [678]/i.test(navigator.userAgent), // ua sniff for filter support
        isSetup = false,
        queue = [];

    eventOn(win,'load',function(){
        var transitionSupported = (function(style){
            var prefixes = ['MozT','WebkitT','OT','msT','KhtmlT','t'];
            for(var i = 0, prefix; prefix = prefixes[i]; i++){
                if(prefix+'ransition' in style) return true;
            }
            return false;
        }(doc.body.style));

        if(!transitionSupported) animate = jsAnimateOpacity; // override animate
        setup();
        run();
    });

    function setup() {
        humaneEl = doc.createElement('div');
        humaneEl.id = 'humane';
        humaneEl.className = 'humane';
        doc.body.appendChild(humaneEl);
        if(useFilter) humaneEl.filters.item('DXImageTransform.Microsoft.Alpha').Opacity = 0; // reset value so hover states work
        isSetup = true;
    }

    function remove() {
        eventOff(doc.body,'mousemove',remove);
        eventOff(doc.body,'click',remove);
        eventOff(doc.body,'keypress',remove);
        eventOff(doc.body,'touchstart',remove);
        eventing = false;
        if(animationInProgress) animate(0);
    }

    function run() {
        if(animationInProgress && !win.humane.forceNew) return;
        if(!queue.length){
            remove();
            return;
        }

        animationInProgress = true;

        if(timeout){
            clearTimeout(timeout);
            timeout = null;
        }

        timeout = setTimeout(function(){ // allow notification to stay alive for timeout
            if(!eventing){
                eventOn(doc.body,'mousemove',remove);
                eventOn(doc.body,'click',remove);
                eventOn(doc.body,'keypress',remove);
                eventOn(doc.body,'touchstart',remove);
                eventing = true;
                if(!win.humane.waitForMove) remove();
            }
        }, win.humane.timeout);

        humaneEl.innerHTML = queue.shift();
        animate(1);
    }

    function animate(level){
        if(level === 1){
            humaneEl.className = "humane humane-show";
        } else {
            humaneEl.className = "humane";
            end();
        }
    }

    function end(){
        animationInProgress = false;
        setTimeout(run,500);
    }

    // if CSS Transitions not supported, fallback to JS Animation
    var setOpacity = (function(){
        if(useFilter){
            return function(opacity){
                humaneEl.filters.item('DXImageTransform.Microsoft.Alpha').Opacity = opacity*100;
            }
        } else {
            return function(opacity){
                humaneEl.style.opacity = String(opacity);
            }
        }
    }());
    function jsAnimateOpacity(level,callback){
        var interval;
        var opacity;

        if (level === 1) {
            opacity = 0;
            if(win.humane.forceNew){
                opacity = useFilter ? humaneEl.filters.item('DXImageTransform.Microsoft.Alpha').Opacity/100|0 : humaneEl.style.opacity|0;
            }
            humaneEl.style.visibility = "visible";
            interval = setInterval(function(){
                if(opacity < 1) {
                    opacity +=0.1;
                    if (opacity>1) opacity = 1;
                    setOpacity(opacity);
                }
                else {
                    clearInterval(interval);
                }
            }, 500 / 20);
        } else {
            opacity = 1;
            interval = setInterval(function(){
                if(opacity > 0) {
                    opacity -=0.1;
                    if (opacity<0) opacity = 0;
                    setOpacity(opacity);
                }
                else {
                    clearInterval(interval);
                    humaneEl.style.visibility = "hidden";
                    end();
                }
            }, 500 / 20);
        }
    }

    function notify(message){
        queue.push(message);
        if(isSetup) run();
    }

    win.humane = notify;
    win.humane.timeout = 2000;
    win.humane.waitForMove = true;
    win.humane.forceNew = false;

}(window,document));
