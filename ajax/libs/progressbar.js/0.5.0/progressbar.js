(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('progressbar', [], function() {
            return factory();
        });
    } else {
        // Browser globals
        root.ProgressBar = factory();
    }
}(this, function() {

    var oldTweenable = this.Tweenable;

    // The next line will be replaced with minified version of shifty library
    // in a build step. Don't expose Tweenable to global scope
    /*! shifty - v1.2.2 - 2014-10-09 - http://jeremyckahn.github.io/shifty */
(function(t){var n=function(){"use strict";function n(){}function e(t,n){var e;for(e in t)Object.hasOwnProperty.call(t,e)&&n(e)}function r(t,n){return e(n,function(e){t[e]=n[e]}),t}function i(t,n){e(n,function(e){t[e]===void 0&&(t[e]=n[e])})}function o(t,n,e,r,i,o,a){var s,c=(t-o)/i;for(s in n)n.hasOwnProperty(s)&&(n[s]=u(e[s],r[s],h[a[s]],c));return n}function u(t,n,e,r){return t+(n-t)*e(r)}function a(t,n){var r=f.prototype.filter,i=t._filterArgs;e(r,function(e){r[e][n]!==void 0&&r[e][n].apply(t,i)})}function s(t,n,e,r,i,u,s,c,f){d=n+e,v=Math.min(m(),d),y=v>=d,t.isPlaying()&&!y?(f(t._timeoutHandler,_),a(t,"beforeTween"),o(v,r,i,u,e,n,s),a(t,"afterTween"),c(r)):y&&(c(u),t.stop(!0))}function c(t,n){var r={};return"string"==typeof n?e(t,function(t){r[t]=n}):e(t,function(t){r[t]||(r[t]=n[t]||l)}),r}function f(t,n){this._currentState=t||{},this._configured=!1,this._scheduleFunction=p,n!==void 0&&this.setConfig(n)}var h,p,l="linear",w=500,_=1e3/60,g=Date.now?Date.now:function(){return+new Date},m=g;p="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||window.mozCancelRequestAnimationFrame&&window.mozRequestAnimationFrame||setTimeout:setTimeout;var d,v,y;return f.prototype.tween=function(t){return this._isTweening?this:(void 0===t&&this._configured||this.setConfig(t),this._start(this.get()),this.resume())},f.prototype.setConfig=function(t){t=t||{},this._configured=!0,this._pausedAtTime=null,this._start=t.start||n,this._step=t.step||n,this._finish=t.finish||n,this._duration=t.duration||w,this._currentState=t.from||this.get(),this._originalState=this.get(),this._targetState=t.to||this.get(),this._timestamp=m();var e=this._currentState,r=this._targetState;return i(r,e),this._easing=c(e,t.easing||l),this._filterArgs=[e,this._originalState,r,this._easing],a(this,"tweenCreated"),this},f.prototype.get=function(){return r({},this._currentState)},f.prototype.set=function(t){this._currentState=t},f.prototype.pause=function(){return this._pausedAtTime=m(),this._isPaused=!0,this},f.prototype.resume=function(){this._isPaused&&(this._timestamp+=m()-this._pausedAtTime),this._isPaused=!1,this._isTweening=!0;var t=this;return this._timeoutHandler=function(){s(t,t._timestamp,t._duration,t._currentState,t._originalState,t._targetState,t._easing,t._step,t._scheduleFunction)},this._timeoutHandler(),this},f.prototype.stop=function(t){return this._isTweening=!1,this._isPaused=!1,this._timeoutHandler=n,t&&(r(this._currentState,this._targetState),a(this,"afterTweenEnd"),this._finish.call(this,this._currentState)),this},f.prototype.isPlaying=function(){return this._isTweening&&!this._isPaused},f.prototype.setScheduleFunction=function(t){this._scheduleFunction=t},f.prototype.dispose=function(){var t;for(t in this)this.hasOwnProperty(t)&&delete this[t]},f.prototype.filter={},f.prototype.formula={linear:function(t){return t}},h=f.prototype.formula,r(f,{now:m,each:e,tweenProps:o,tweenProp:u,applyFilter:a,shallowCopy:r,defaults:i,composeEasingObject:c}),"object"==typeof exports?module.exports=f:"function"==typeof define&&define.amd?define(function(){return f}):t.Tweenable===void 0&&(t.Tweenable=f),f}();(function(){n.shallowCopy(n.prototype.formula,{easeInQuad:function(t){return Math.pow(t,2)},easeOutQuad:function(t){return-(Math.pow(t-1,2)-1)},easeInOutQuad:function(t){return 1>(t/=.5)?.5*Math.pow(t,2):-.5*((t-=2)*t-2)},easeInCubic:function(t){return Math.pow(t,3)},easeOutCubic:function(t){return Math.pow(t-1,3)+1},easeInOutCubic:function(t){return 1>(t/=.5)?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)},easeInQuart:function(t){return Math.pow(t,4)},easeOutQuart:function(t){return-(Math.pow(t-1,4)-1)},easeInOutQuart:function(t){return 1>(t/=.5)?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},easeInQuint:function(t){return Math.pow(t,5)},easeOutQuint:function(t){return Math.pow(t-1,5)+1},easeInOutQuint:function(t){return 1>(t/=.5)?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)},easeInSine:function(t){return-Math.cos(t*(Math.PI/2))+1},easeOutSine:function(t){return Math.sin(t*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},easeInExpo:function(t){return 0===t?0:Math.pow(2,10*(t-1))},easeOutExpo:function(t){return 1===t?1:-Math.pow(2,-10*t)+1},easeInOutExpo:function(t){return 0===t?0:1===t?1:1>(t/=.5)?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return-(Math.sqrt(1-t*t)-1)},easeOutCirc:function(t){return Math.sqrt(1-Math.pow(t-1,2))},easeInOutCirc:function(t){return 1>(t/=.5)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeOutBounce:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},easeInBack:function(t){var n=1.70158;return t*t*((n+1)*t-n)},easeOutBack:function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},easeInOutBack:function(t){var n=1.70158;return 1>(t/=.5)?.5*t*t*(((n*=1.525)+1)*t-n):.5*((t-=2)*t*(((n*=1.525)+1)*t+n)+2)},elastic:function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*2*Math.PI/2)+1},swingFromTo:function(t){var n=1.70158;return 1>(t/=.5)?.5*t*t*(((n*=1.525)+1)*t-n):.5*((t-=2)*t*(((n*=1.525)+1)*t+n)+2)},swingFrom:function(t){var n=1.70158;return t*t*((n+1)*t-n)},swingTo:function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},bounce:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},bouncePast:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?2-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?2-(7.5625*(t-=2.25/2.75)*t+.9375):2-(7.5625*(t-=2.625/2.75)*t+.984375)},easeFromTo:function(t){return 1>(t/=.5)?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},easeFrom:function(t){return Math.pow(t,4)},easeTo:function(t){return Math.pow(t,.25)}})})(),function(){function t(t,n,e,r,i,o){function u(t){return((l*t+w)*t+_)*t}function a(t){return((g*t+m)*t+d)*t}function s(t){return(3*l*t+2*w)*t+_}function c(t){return 1/(200*t)}function f(t,n){return a(p(t,n))}function h(t){return t>=0?t:0-t}function p(t,n){var e,r,i,o,a,c;for(i=t,c=0;8>c;c++){if(o=u(i)-t,n>h(o))return i;if(a=s(i),1e-6>h(a))break;i-=o/a}if(e=0,r=1,i=t,e>i)return e;if(i>r)return r;for(;r>e;){if(o=u(i),n>h(o-t))return i;t>o?e=i:r=i,i=.5*(r-e)+e}return i}var l=0,w=0,_=0,g=0,m=0,d=0;return _=3*n,w=3*(r-n)-_,l=1-_-w,d=3*e,m=3*(i-e)-d,g=1-d-m,f(t,c(o))}function e(n,e,r,i){return function(o){return t(o,n,e,r,i,1)}}n.setBezierFunction=function(t,r,i,o,u){var a=e(r,i,o,u);return a.x1=r,a.y1=i,a.x2=o,a.y2=u,n.prototype.formula[t]=a},n.unsetBezierFunction=function(t){delete n.prototype.formula[t]}}(),function(){function t(t,e,r,i,o){return n.tweenProps(i,e,t,r,1,0,o)}var e=new n;e._filterArgs=[],n.interpolate=function(r,i,o,u){var a=n.shallowCopy({},r),s=n.composeEasingObject(r,u||"linear");e.set({});var c=e._filterArgs;c.length=0,c[0]=a,c[1]=r,c[2]=i,c[3]=s,n.applyFilter(e,"tweenCreated"),n.applyFilter(e,"beforeTween");var f=t(r,a,i,o,s);return n.applyFilter(e,"afterTween"),f}}(),function(t){function n(t,n){F.length=0;var e,r=t.length;for(e=0;r>e;e++)F.push("_"+n+"_"+e);return F}function e(t){var n=t.match(M);return n?(1===n.length||t[0].match(y))&&n.unshift(""):n=["",""],n.join(k)}function r(n){t.each(n,function(t){var e=n[t];"string"==typeof e&&e.match(T)&&(n[t]=i(e))})}function i(t){return s(T,t,o)}function o(t){var n=u(t);return"rgb("+n[0]+","+n[1]+","+n[2]+")"}function u(t){return t=t.replace(/#/,""),3===t.length&&(t=t.split(""),t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),S[0]=a(t.substr(0,2)),S[1]=a(t.substr(2,2)),S[2]=a(t.substr(4,2)),S}function a(t){return parseInt(t,16)}function s(t,n,e){var r=n.match(t),i=n.replace(t,k);if(r)for(var o,u=r.length,a=0;u>a;a++)o=r.shift(),i=i.replace(k,e(o));return i}function c(t){return s(b,t,f)}function f(t){for(var n=t.match(O),e=n.length,r=t.match(I)[0],i=0;e>i;i++)r+=parseInt(n[i],10)+",";return r=r.slice(0,-1)+")"}function h(r){var i={};return t.each(r,function(t){var o=r[t];if("string"==typeof o){var u=m(o);i[t]={formatString:e(o),chunkNames:n(u,t)}}}),i}function p(n,e){t.each(e,function(t){for(var r=n[t],i=m(r),o=i.length,u=0;o>u;u++)n[e[t].chunkNames[u]]=+i[u];delete n[t]})}function l(n,e){t.each(e,function(t){var r=n[t],i=w(n,e[t].chunkNames),o=_(i,e[t].chunkNames);r=g(e[t].formatString,o),n[t]=c(r)})}function w(t,n){for(var e,r={},i=n.length,o=0;i>o;o++)e=n[o],r[e]=t[e],delete t[e];return r}function _(t,n){P.length=0;for(var e=n.length,r=0;e>r;r++)P.push(t[n[r]]);return P}function g(t,n){for(var e=t,r=n.length,i=0;r>i;i++)e=e.replace(k,+n[i].toFixed(4));return e}function m(t){return t.match(O)}function d(n,e){t.each(e,function(t){for(var r=e[t],i=r.chunkNames,o=i.length,u=n[t].split(" "),a=u[u.length-1],s=0;o>s;s++)n[i[s]]=u[s]||a;delete n[t]})}function v(n,e){t.each(e,function(t){for(var r=e[t],i=r.chunkNames,o=i.length,u="",a=0;o>a;a++)u+=" "+n[i[a]],delete n[i[a]];n[t]=u.substr(1)})}var y=/(\d|\-|\.)/,M=/([^\-0-9\.]+)/g,O=/[0-9.\-]+/g,b=RegExp("rgb\\("+O.source+/,\s*/.source+O.source+/,\s*/.source+O.source+"\\)","g"),I=/^.*\(/,T=/#([0-9]|[a-f]){3,6}/gi,k="VAL",F=[],S=[],P=[];t.prototype.filter.token={tweenCreated:function(t,n,e){r(t),r(n),r(e),this._tokenData=h(t)},beforeTween:function(t,n,e,r){d(r,this._tokenData),p(t,this._tokenData),p(n,this._tokenData),p(e,this._tokenData)},afterTween:function(t,n,e,r){l(t,this._tokenData),l(n,this._tokenData),l(e,this._tokenData),v(r,this._tokenData)}}}(n)})(this);


    var Tweenable = this.Tweenable;
    this.Tweenable = oldTweenable;

    var EASING_ALIASES = {
        easeIn: 'easeInCubic',
        easeOut: 'easeOutCubic',
        easeInOut: 'easeInOutCubic'
    };

    // Base object for different progress bar shapes
    var Progress = function(container, opts) {
        // Prevent calling constructor without parameters so inheritance
        // works correctly
        if (arguments.length === 0) return;

        var svgView = this._createSvgView(opts);

        var element;
        if (isString(container)) {
            element = document.querySelector(container);
        } else {
            element = container;
        }
        element.appendChild(svgView.svg);

        var newOpts = extend({
            attachment: this
        }, opts);
        this._path = new Path(svgView.path, newOpts);

        // Expose public attributes
        this.path = svgView.path;
        this.trail = svgView.trail;
    };

    Progress.prototype.animate = function animate(progress, opts, cb) {
        this._path.animate(progress, opts, cb);
    };

    Progress.prototype.stop = function stop() {
        this._path.stop();
    };

    Progress.prototype.set = function set(progress) {
        this._path.set(progress);
    };

    Progress.prototype._createSvgView = function _createSvgView(opts) {
        opts = extend({
            color: "#555",
            strokeWidth: 1.0,
            trailColor: null,
            fill: null
        }, opts);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._initializeSvg(svg, opts);

        var trailPath = null;
        if (opts.trailColor) {
            var trailOpts = extend({}, opts);
            trailOpts.color = opts.trailColor;

            // When trail path is set, fill must be set for it instead of the
            // actual path to prevent trail stroke from clipping
            opts.fill = null;
            trailPath = this._createPath(trailOpts);
            svg.appendChild(trailPath);
        }

        var path = this._createPath(opts);
        svg.appendChild(path);

        return {
            svg: svg,
            path: path,
            trail: trailPath
        };
    };

    Progress.prototype._initializeSvg = function _initializeSvg(svg, opts) {
        svg.setAttribute("viewBox", "0 0 100 100");
    };

    Progress.prototype._createPath = function _createPath(opts) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", this._pathString(opts));
        path.setAttribute("stroke", opts.color);
        path.setAttribute("stroke-width", opts.strokeWidth);

        if (opts.fill) {
            path.setAttribute("fill", opts.fill);
        } else {
            path.setAttribute("fill-opacity", "0");
        }

        return path;
    };

    Progress.prototype._pathString = function _pathString(opts) {
        throw new Error("Override this function for each progress bar");
    };

    // Progress bar shapes

    var Line = function(container, options) {
        Progress.apply(this, arguments);
    };

    Line.prototype = new Progress();
    Line.prototype.constructor = Line;

    Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
        svg.setAttribute("viewBox", "0 0 100 " + opts.strokeWidth);
        svg.setAttribute("preserveAspectRatio", "none");
    };

    Line.prototype._pathString = function _pathString(opts) {
        var pathString = "M 0,{c} L 100,{c}";
        var center = opts.strokeWidth / 2;
        pathString = pathString.replace(/\{c\}/g, center);
        return pathString;
    };

    var Circle = function(container, options) {
        Progress.apply(this, arguments);
    };

    Circle.prototype = new Progress();
    Circle.prototype.constructor = Circle;

    Circle.prototype._pathString = function _pathString(opts) {
        // Use two arcs to form a circle
        // See this answer http://stackoverflow.com/a/10477334/1446092
        var pathString = "M 50,50 m 0,-{r} a {r},{r} 0 1 1 0,{r*2} a {r},{r} 0 1 1 0,-{r*2}";
        var r = 50 - opts.strokeWidth / 2;
        pathString = pathString.replace(/\{r\}/g, r);
        pathString = pathString.replace(/\{r\*2\}/g, r * 2);
        return pathString;
    };

    var Square = function(container, options) {
        Progress.apply(this, arguments);
    };

    Square.prototype = new Progress();
    Square.prototype.constructor = Square;

    Square.prototype._pathString = function _pathString(opts) {
        var pathString = "M 0,{s/2} L {w},{s/2} L {w},{w} L {s/2},{w} L {s/2},{s}";
        var w = 100 - opts.strokeWidth / 2;
        pathString = pathString.replace(/\{w\}/g, w);
        pathString = pathString.replace(/\{s\}/g, opts.strokeWidth);
        pathString = pathString.replace(/\{s\/2\}/g, opts.strokeWidth / 2);
        return pathString;
    };

    // Lower level API to animate any kind of svg path

    var Path = function(path, opts) {
        opts = extend({
            duration: 800,
            easing: "linear",
            from: {},
            to: {},
            step: noop
        }, opts);

        this._path = path;
        this._opts = opts;
        this._tweenable = null;

        // Set up the starting positions
        var length = this._path.getTotalLength();
        this._path.style.strokeDasharray = length + ' ' + length;
        this._path.style.strokeDashoffset = length;
    };

    Path.prototype.set = function set(progress) {
        this.stop();

        var length = this._path.getTotalLength();
        this._path.style.strokeDashoffset = length - progress * length;
    };

    Path.prototype.stop = function stop() {
        this._stopTween();

        var computedStyle = window.getComputedStyle(this._path, null);
        var offset = computedStyle.getPropertyValue('stroke-dashoffset');
        this._path.style.strokeDashoffset = offset;
    };

    // Method introduced here:
    // http://jakearchibald.com/2013/animated-line-drawing-svg/
    Path.prototype.animate = function animate(progress, opts, cb) {
        if (isFunction(opts)) {
            cb = opts;
            opts = {};
        }

        // Copy default opts to new object so defaults are not modified
        var defaultOpts = extend({}, this._opts);
        opts = extend(defaultOpts, opts);

        this.stop();

        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        this._path.getBoundingClientRect();

        var computedStyle = window.getComputedStyle(this._path, null);
        var offset = computedStyle.getPropertyValue('stroke-dashoffset');
        // Remove 'px' suffix
        offset = parseFloat(offset, 10);

        var length = this._path.getTotalLength();
        var newOffset = length - progress * length;

        var self = this;

        this._tweenable = new Tweenable();
        this._tweenable.tween({
            from: extend({ offset: offset }, opts.from),
            to: extend({ offset: newOffset }, opts.to),
            duration: opts.duration,
            easing: this._easing(opts.easing),
            step: function(state) {
                self._path.style.strokeDashoffset = state.offset;
                opts.step(state, opts.attachment);
            },
            finish: function(state) {
                // step function is not called on the last step of animation
                self._path.style.strokeDashoffset = state.offset;
                opts.step(state, opts.attachment);

                if (isFunction(cb)) {
                    cb();
                }
            }
        });
    };

    Path.prototype._stopTween = function _stopTween() {
        if (this._tweenable !== null) {
            this._tweenable.stop();
            this._tweenable.dispose();
            this._tweenable = null;
        }
    };

    Path.prototype._easing = function _easing(easing) {
        if (EASING_ALIASES.hasOwnProperty(easing)) {
            return EASING_ALIASES[easing];
        }

        return easing;
    };

    // Utility functions

    function noop() {}

    // Copy all attributes from source object to destination object.
    // destination object is mutated.
    function extend(destination, source) {
        destination = destination || {};
        source = source || {};

        for (var attrName in source) {
            if (source.hasOwnProperty(attrName)) {
                destination[attrName] = source[attrName];
            }
        }

        return destination;
    }

    function isString(obj) {
        return typeof obj === 'string' || obj instanceof String;
    }

    function isFunction(obj) {
        return typeof obj === "function";
    }

    // Expose modules
    var ProgressBar = {
        Line: Line,
        Circle: Circle,
        Square: Square,
        Path: Path
    };

    return ProgressBar;
}));
