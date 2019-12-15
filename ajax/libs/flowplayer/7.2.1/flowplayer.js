/*!

   Flowplayer v7.2.1 (2017-10-19) | flowplayer.com/license

*/
/*! (C) WebReflection Mit Style License */
(function(e){function g(e,t,n,r){for(var i,s=n.slice(),o=w(t,e),u=0,a=s.length;u<a;u++){handler=s[u],typeof handler=="object"&&typeof handler.handleEvent=="function"?handler.handleEvent(o):handler.call(e,o);if(o.stoppedImmediatePropagation)break}return i=!o.stoppedPropagation,r&&i&&e.parentNode?e.parentNode.dispatchEvent(o):!o.defaultPrevented}function y(e,t){return{configurable:!0,get:e,set:t}}function b(e,t,n){var r=f(t||e,n);u(e,"textContent",y(function(){return r.get.call(this)},function(e){r.set.call(this,e)}))}function w(e,t){return e.currentTarget=t,e.eventPhase=e.target===e.currentTarget?2:3,e}function E(e,t){var n=e.length;while(n--&&e[n]!==t);return n}function S(){if(this.tagName==="BR")return"\n";var e=this.firstChild,t=[];while(e)e.nodeType!==8&&e.nodeType!==7&&t.push(e.textContent),e=e.nextSibling;return t.join("")}function x(e){return e.nodeType!==9&&document.documentElement.contains(e)}function T(e){!n&&d.test(document.readyState)&&(n=!n,document.detachEvent(r,T),e=document.createEvent("Event"),e.initEvent(i,!0,!0),document.dispatchEvent(e))}function N(e){var t;while(t=this.lastChild)this.removeChild(t);e!=null&&this.appendChild(document.createTextNode(e))}function C(t,n){return n||(n=e.event),n.target||(n.target=n.srcElement||n.fromElement||document),n.timeStamp||(n.timeStamp=(new Date).getTime()),n}if(document.createEvent)return;var t=!0,n=!1,r="onreadystatechange",i="DOMContentLoaded",s="__IE8__"+Math.random(),o=e.Object,u=o.defineProperty||function(e,t,n){e[t]=n.value},a=o.defineProperties||function(t,n){for(var r in n)if(l.call(n,r))try{u(t,r,n[r])}catch(i){e.console&&console.log(r+" failed on object:",t,i.message)}},f=o.getOwnPropertyDescriptor,l=o.prototype.hasOwnProperty,c=e.Element.prototype,h=e.Text.prototype,p=/^[a-z]+$/,d=/loaded|complete/,v={},m=document.createElement("div");b(e.HTMLCommentElement.prototype,c,"nodeValue"),b(e.HTMLScriptElement.prototype,null,"text"),b(h,null,"nodeValue"),b(e.HTMLTitleElement.prototype,null,"text"),u(e.HTMLStyleElement.prototype,"textContent",function(e){return y(function(){return e.get.call(this.styleSheet)},function(t){e.set.call(this.styleSheet,t)})}(f(e.CSSStyleSheet.prototype,"cssText"))),a(c,{textContent:{get:S,set:N},firstElementChild:{get:function(){for(var e=this.childNodes||[],t=0,n=e.length;t<n;t++)if(e[t].nodeType==1)return e[t]}},lastElementChild:{get:function(){for(var e=this.childNodes||[],t=e.length;t--;)if(e[t].nodeType==1)return e[t]}},previousElementSibling:{get:function(){var e=this.previousSibling;while(e&&e.nodeType!=1)e=e.previousSibling;return e}},nextElementSibling:{get:function(){var e=this.nextSibling;while(e&&e.nodeType!=1)e=e.nextSibling;return e}},childElementCount:{get:function(){for(var e=0,t=this.childNodes||[],n=t.length;n--;e+=t[n].nodeType==1);return e}},addEventListener:{value:function(e,t,n){var r=this,i="on"+e,o=r[s]||u(r,s,{value:{}})[s],a=o[i]||(o[i]={}),f=a.h||(a.h=[]),c;if(!l.call(a,"w")){a.w=function(e){return e[s]||g(r,C(r,e),f,!1)};if(!l.call(v,i))if(p.test(e))try{c=document.createEventObject(),c[s]=!0,r.nodeType!=9&&r.parentNode==null&&m.appendChild(r),r.fireEvent(i,c),v[i]=!0}catch(c){v[i]=!1;while(m.hasChildNodes())m.removeChild(m.firstChild)}else v[i]=!1;(a.n=v[i])&&r.attachEvent(i,a.w)}E(f,t)<0&&f[n?"unshift":"push"](t)}},dispatchEvent:{value:function(e){var t=this,n="on"+e.type,r=t[s],i=r&&r[n],o=!!i,u;return e.target||(e.target=t),o?i.n?t.fireEvent(n,e):g(t,e,i.h,!0):(u=t.parentNode)?u.dispatchEvent(e):!0,!e.defaultPrevented}},removeEventListener:{value:function(e,t,n){var r=this,i="on"+e,o=r[s],u=o&&o[i],a=u&&u.h,f=a?E(a,t):-1;-1<f&&a.splice(f,1)}}}),a(h,{addEventListener:{value:c.addEventListener},dispatchEvent:{value:c.dispatchEvent},removeEventListener:{value:c.removeEventListener}}),a(e.XMLHttpRequest.prototype,{addEventListener:{value:function(e,t,n){var r=this,i="on"+e,o=r[s]||u(r,s,{value:{}})[s],a=o[i]||(o[i]={}),f=a.h||(a.h=[]);E(f,t)<0&&(r[i]||(r[i]=function(){var t=document.createEvent("Event");t.initEvent(e,!0,!0),r.dispatchEvent(t)}),f[n?"unshift":"push"](t))}},dispatchEvent:{value:function(e){var t=this,n="on"+e.type,r=t[s],i=r&&r[n],o=!!i;return o&&(i.n?t.fireEvent(n,e):g(t,e,i.h,!0))}},removeEventListener:{value:c.removeEventListener}}),a(e.Event.prototype,{bubbles:{value:!0,writable:!0},cancelable:{value:!0,writable:!0},preventDefault:{value:function(){this.cancelable&&(this.defaultPrevented=!0,this.returnValue=!1)}},stopPropagation:{value:function(){this.stoppedPropagation=!0,this.cancelBubble=!0}},stopImmediatePropagation:{value:function(){this.stoppedImmediatePropagation=!0,this.stopPropagation()}},initEvent:{value:function(e,t,n){this.type=e,this.bubbles=!!t,this.cancelable=!!n,this.bubbles||this.stopPropagation()}}}),a(e.HTMLDocument.prototype,{textContent:{get:function(){return this.nodeType===11?S.call(this):null},set:function(e){this.nodeType===11&&N.call(this,e)}},addEventListener:{value:function(n,s,o){var u=this;c.addEventListener.call(u,n,s,o),t&&n===i&&!d.test(u.readyState)&&(t=!1,u.attachEvent(r,T),e==top&&function a(e){try{u.documentElement.doScroll("left"),T()}catch(t){setTimeout(a,50)}}())}},dispatchEvent:{value:c.dispatchEvent},removeEventListener:{value:c.removeEventListener},createEvent:{value:function(e){var t;if(e!=="Event")throw new Error("unsupported "+e);return t=document.createEventObject(),t.timeStamp=(new Date).getTime(),t}}}),a(e.Window.prototype,{getComputedStyle:{value:function(){function i(e){this._=e}function s(){}var e=/^(?:[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/,t=/^(top|right|bottom|left)$/,n=/\-([a-z])/g,r=function(e,t){return t.toUpperCase()};return i.prototype.getPropertyValue=function(i){var s=this._,o=s.style,u=s.currentStyle,a=s.runtimeStyle,f,l,c;return i=(i==="float"?"style-float":i).replace(n,r),f=u?u[i]:o[i],e.test(f)&&!t.test(i)&&(l=o.left,c=a&&a.left,c&&(a.left=u.left),o.left=i==="fontSize"?"1em":f,f=o.pixelLeft+"px",o.left=l,c&&(a.left=c)),f==null?f:f+""||"auto"},s.prototype.getPropertyValue=function(){return null},function(e,t){return t?new s(e):new i(e)}}()},addEventListener:{value:function(t,n,r){var i=e,o="on"+t,u;i[o]||(i[o]=function(e){return g(i,C(i,e),u,!1)}),u=i[o][s]||(i[o][s]=[]),E(u,n)<0&&u[r?"unshift":"push"](n)}},dispatchEvent:{value:function(t){var n=e["on"+t.type];return n?n.call(e,t)!==!1&&!t.defaultPrevented:!0}},removeEventListener:{value:function(t,n,r){var i="on"+t,u=(e[i]||o)[s],a=u?E(u,n):-1;-1<a&&u.splice(a,1)}}})})(this);
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.flowplayer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';
var common = module.exports = {},
    ClassList = _dereq_('class-list'),
    $ = window.jQuery,
    punycode = _dereq_('punycode'),
    computedStyle = _dereq_('computed-style');

common.noop = function() {};
common.identity = function(i) { return i; };

common.removeNode = function(el) {
  if (!el || !el.parentNode) return;
  el.parentNode.removeChild(el);
};

common.find = function(query, ctx) {
  if ($) return $(query, ctx).toArray();
  ctx = ctx || document;
  return Array.prototype.map.call(ctx.querySelectorAll(query), function(el) { return el; });
};

common.text = function(el, txt) {
  el[('innerText' in el) ? 'innerText' : 'textContent'] = txt;
};

common.findDirect = function(query, ctx) {
  return common.find(query, ctx).filter(function(node) {
    return node.parentNode === ctx;
  });
};

common.hasClass = function(el, kls) {
  if (typeof el.className !== 'string') return false;
  return ClassList(el).contains(kls);
};

common.isSameDomain = function(url) {
  var w = window.location,
      a = common.createElement('a', { href: url });
  return w.hostname === a.hostname &&
         w.protocol === a.protocol &&
         w.port === a.port;
};

common.css = function(el, property, value) {
  if (typeof property === 'object') {
    return Object.keys(property).forEach(function(key) {
      common.css(el, key, property[key]);
    });
  }
  if (typeof value !== 'undefined') {
    if (value === '') return el ? el.style.removeProperty(property)  : undefined;
    return el ? el.style.setProperty(property, value) : undefined;
  }
  return el ? computedStyle(el, property) : undefined;
};

common.createElement = function(tag, attributes, innerHTML) {
  try {
    var el = document.createElement(tag);
    for (var key in attributes) {
      if (!attributes.hasOwnProperty(key)) continue;
      if (key === 'css') {
        common.css(el, attributes[key]);
      } else {
        common.attr(el, key, attributes[key]);
      }
    }
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
  } catch (e) {
    if (!$) throw e;
    return $('<' + tag + '>' + innerHTML + '</' + tag + '>').attr(attributes)[0];
  }
};

common.toggleClass = function(el, cls, flag) {
  if (!el) return;
  var classes = ClassList(el);
  if (typeof flag === 'undefined') classes.toggle(cls);
  else if (flag) classes.add(cls);
  else if (!flag) classes.remove(cls);
};

common.addClass = function(el, cls) {
  return common.toggleClass(el, cls, true);
};

common.removeClass = function(el, cls) {
  return common.toggleClass(el, cls, false);
};

common.append = function(par, child) {
  par.appendChild(child);
  return par;
};

common.appendTo = function(child, par) {
  common.append(par, child);
  return child;
};

common.prepend = function(par, child) {
  par.insertBefore(child, par.firstChild);
};


// Inserts `el` after `child` that is child of `par`
common.insertAfter = function(par, child, el) {
  if (child == common.lastChild(par)) par.appendChild(el);
  var childIndex = Array.prototype.indexOf.call(par.children, child);
  par.insertBefore(el, par.children[childIndex + 1]);
};

common.html = function(elms, val) {
  elms = elms.length ? elms : [elms];
  elms.forEach(function(elm) {
    elm.innerHTML = val;
  });
};


common.attr = function(el, key, val) {
  if (key === 'class') key = 'className';
  if (common.hasOwnOrPrototypeProperty(el, key)) {
    try {
      el[key] = val;
    } catch (e) { // Most likely IE not letting set property
      if ($) {
        $(el).attr(key, val);
      } else {
        throw e;
      }
    }
  } else {
    if (val === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, val);
    }
  }
  return el;
};

common.prop = function(el, key, val) {
  if (typeof val === 'undefined') {
    return el && el[key];
  }
  el[key] = val;
};

common.offset = function(el) {
  var ret = el.getBoundingClientRect();
  if (el.offsetWidth / el.offsetHeight > el.clientWidth / el.clientHeight) { // https://github.com/flowplayer/flowplayer/issues/757
    ret = {
      left: ret.left * 100,
      right: ret.right * 100,
      top: ret.top * 100,
      bottom: ret.bottom * 100,
      width: ret.width * 100,
      height: ret.height * 100
    };
  }
  return ret;
};

common.width = function(el, val) {
  /*jshint -W093 */
  if (val) return el.style.width = (''+val).replace(/px$/, '') + 'px';
  var ret = common.offset(el).width;
  return typeof ret === 'undefined' ? el.offsetWidth : ret;
};

common.height = function(el, val) {
  /*jshint -W093 */
  if (val) return el.style.height = (''+val).replace(/px$/, '') + 'px';
  var ret = common.offset(el).height;
  return typeof ret === 'undefined' ? el.offsetHeight : ret;
};

common.lastChild = function(el) {
  return el.children[el.children.length - 1];
};

common.hasParent = function(el, parentSelector) {
  var parent = el.parentElement;
  while (parent) {
    if (common.matches(parent, parentSelector)) return true;
    parent = parent.parentElement;
  }
  return false;
};

common.createAbsoluteUrl = function(url) {
  return common.createElement('a', {href: url}).href; // This won't work on IE7
};

common.xhrGet = function(url, successCb, errorCb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState !== 4) return;
    if (this.status >= 400) return errorCb();
    successCb(this.responseText);
  };
  xhr.open('get', url, true);
  xhr.send();
};

common.pick = function(obj, props) {
  var ret = {};
  props.forEach(function(prop) {
    if (obj.hasOwnProperty(prop)) ret[prop] = obj[prop];
  });
  return ret;
};

common.hostname = function(host) {
  return punycode.toUnicode(host || window.location.hostname);
};

//Hacks
common.browser = {
  webkit: 'WebkitAppearance' in document.documentElement.style
};

common.getPrototype = function(el) {
  /* jshint proto:true */
  if (!Object.getPrototypeOf) return el.__proto__;
  return Object.getPrototypeOf(el);
};

common.hasOwnOrPrototypeProperty = function(obj, prop) {
  var o = obj;
  while (o) {
    if (Object.prototype.hasOwnProperty.call(o, prop)) return true;
    o = common.getPrototype(o);
  }
  return false;
};


// Polyfill for Element.matches
// adapted from https://developer.mozilla.org/en/docs/Web/API/Element/matches
common.matches = function(elem, selector) {
  var proto = Element.prototype,
      fn = proto.matches ||
          proto.matchesSelector ||
          proto.mozMatchesSelector ||
          proto.msMatchesSelector ||
          proto.oMatchesSelector ||
          proto.webkitMatchesSelector ||
          function (selector) {
            var element = this,
                matches = (element.document || element.ownerDocument).querySelectorAll(selector),
                i = 0;
            while (matches[i] && matches[i] !== element) {
              i++;
            }

            return matches[i] ? true : false;
      };
  return fn.call(elem, selector);
};


// Polyfill for CSSStyleDeclaration
// from https://github.com/shawnbot/aight
(function(CSSSDProto) {

  function getAttribute(property) {
    return property.replace(/-[a-z]/g, function(bit) {
      return bit[1].toUpperCase();
    });
  }

  // patch CSSStyleDeclaration.prototype using IE8's methods
  if (typeof CSSSDProto.setAttribute !== "undefined") {
    CSSSDProto.setProperty = function(property, value) {
      return this.setAttribute(getAttribute(property), String(value) /*, important */ );
    };
    CSSSDProto.getPropertyValue = function(property) {
      return this.getAttribute(getAttribute(property)) || null;
    };
    CSSSDProto.removeProperty = function(property) {
      var value = this.getPropertyValue(property);
      this.removeAttribute(getAttribute(property));
      return value;
    };
  }

})(window.CSSStyleDeclaration.prototype);

},{"class-list":36,"computed-style":37,"punycode":44}],2:[function(_dereq_,module,exports){
'use strict';
var common = _dereq_('../common');

// movie required in opts
module.exports = function embed(swf, flashvars, wmode, bgColor) {
   wmode = wmode || "opaque";

   var id = "obj" + ("" + Math.random()).slice(2, 15),
       tag = '<object class="fp-engine" id="' + id+ '" name="' + id + '" ',
       msie = navigator.userAgent.indexOf('MSIE') > -1;

   tag += msie ? 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' :
      ' data="' + swf  + '" type="application/x-shockwave-flash">';

   var opts = {
      width: "100%",
      height: "100%",
      allowscriptaccess: "always",
      wmode: wmode,
      quality: "high",
      flashvars: "",

      // https://github.com/flowplayer/flowplayer/issues/13#issuecomment-9369919
      movie: swf + (msie ? "?" + id : ""),
      name: id
   };

   if (wmode !== 'transparent') opts.bgcolor = bgColor || '#333333';

   // flashvars
   Object.keys(flashvars).forEach(function(key) {
      opts.flashvars += key + "=" + flashvars[key] + "&";
   });

   // parameters
   Object.keys(opts).forEach(function(key) {
      tag += '<param name="' + key + '" value="'+ opts[key] +'"/>';
   });

   tag += "</object>";
   var el = common.createElement('div', {}, tag);
   return common.find('object', el);

};


// Flash is buggy allover
if (window.attachEvent) {
   window.attachEvent("onbeforeunload", function() {
      window.__flash_savedUnloadHandler = window.__flash_unloadHandler = function() {};
   });
}


},{"../common":1}],3:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    common = _dereq_('../common'),
    embed = _dereq_('./embed'),
    extend = _dereq_('extend-object'),
    bean = _dereq_('bean'),
    engineImpl;

engineImpl = function flashEngine(player, root) {

   var conf = player.conf,
      loadVideo,
      callbackId,
      api;

   var suspended, timeouts = [];

   var engine = {
      engineName: engineImpl.engineName,

      pick: function(sources) {

        var source = extend({}, (function() {
          if (flowplayer.support.flashVideo) {
            var selectedSource;
            for (var i = 0, source; i < sources.length; i++) {
               source = sources[i];
               if (/mp4|flv|flash/i.test(source.type)) selectedSource = source;
               if (player.conf.swfHls && /mpegurl/i.test(source.type)) selectedSource = source;
               if (selectedSource && !/mp4/i.test(selectedSource.type)) return selectedSource;
               // Did not find any source or source was video/mp4, let's try find more
            }
            return selectedSource; // Accept the fact we don't have anything or just an MP4
          }
        })());
        if (!source) return;
        if (source.src && !isAbsolute(source.src) && !player.conf.rtmp && !source.rtmp) source.src = common.createAbsoluteUrl(source.src);
        return source;
      },

      suspendEngine: function() {
        suspended = true;
      },
      resumeEngine: function() {
        suspended = false;
      },

      load: function(video) {
         loadVideo = video;
         timeouts.forEach(function(t) { clearTimeout(t); });

         function escapeURL(url) {
            return url.replace(/&amp;/g, '%26').replace(/&/g, '%26').replace(/=/g, '%3D');
         }

         var html5Tag = common.findDirect('video', root)[0] || common.find('.fp-player > video', root)[0],
            url = video.src,
            is_absolute = isAbsolute(url);

         var removeTag = function() {
            common.removeNode(html5Tag);
         };
         var hasSupportedSource = function(sources) {
            return sources.some(function(src) {
               return !!html5Tag.canPlayType(src.type);
            });
         };
         if (flowplayer.support.video &&
            common.prop(html5Tag, 'autoplay') &&
            hasSupportedSource(video.sources)) bean.one(html5Tag, 'timeupdate', removeTag);
         else removeTag();

         // convert to absolute
         var rtmp = video.rtmp || conf.rtmp;
         if (!is_absolute && !rtmp) url = common.createAbsoluteUrl(url);

         if (api && isHLS(video) && api.data !== common.createAbsoluteUrl(conf.swfHls)) engine.unload();

         if (api) {
            ['live', 'preload', 'loop'].forEach(function(prop) {
              if (!video.hasOwnProperty(prop)) return;
              api.__set(prop, video[prop]);
            });
            Object.keys(video.flashls || {}).forEach(function(key) {
              api.__set('hls_' + key, video.flashls[key]);
            });
            var providerChangeNeeded = false;
            if (!is_absolute && rtmp) api.__set('rtmp', rtmp.url || rtmp);
            else {
              var oldRtmp = api.__get('rtmp');
              providerChangeNeeded = !!oldRtmp;
              api.__set('rtmp', null);
            }
            api.__play(url, providerChangeNeeded || video.rtmp && video.rtmp !== conf.rtmp);

         } else {

            callbackId = "fpCallback" + ("" + Math.random()).slice(3, 15);
            url = escapeURL(url);

            var opts = {
               hostname: conf.embedded ? common.hostname(conf.hostname) : common.hostname(location.hostname),
               url: url,
               callback: callbackId
            };
            if (root.getAttribute('data-origin')) {
               opts.origin = root.getAttribute('data-origin');
            }

            // optional conf
            ['proxy', 'key', 'autoplay', 'preload', 'subscribe', 'live', 'loop', 'debug', 'splash', 'poster', 'rtmpt'].forEach(function(key) {
              if (conf.hasOwnProperty(key)) opts[key] = conf[key];
              if (video.hasOwnProperty(key)) opts[key] = video[key];
              if ((conf.rtmp || {}).hasOwnProperty(key)) opts[key] = (conf.rtmp || {})[key];
              if ((video.rtmp || {}).hasOwnProperty(key)) opts[key] = (video.rtmp || {})[key];
            });
            if (conf.rtmp) opts.rtmp = conf.rtmp.url || conf.rtmp;
            if (video.rtmp) opts.rtmp = video.rtmp.url || video.rtmp;
            Object.keys(video.flashls || {}).forEach(function(key) {
              var val = video.flashls[key];
              opts['hls_' + key] = val;
            });

            var hlsQualities = typeof video.hlsQualities !== 'undefined' ? video.hlsQualities : conf.hlsQualities;
            if (typeof hlsQualities !== 'undefined') opts.hlsQualities = hlsQualities ? encodeURIComponent(JSON.stringify(hlsQualities)) : hlsQualities;
            // bufferTime might be 0
            if (conf.bufferTime !== undefined) opts.bufferTime = conf.bufferTime;

            if (is_absolute) delete opts.rtmp;

            // issues #376
            if (opts.rtmp) {
               opts.rtmp = escapeURL(opts.rtmp);
            }

            // issues #733, 906
            var bgColor = conf.bgcolor || common.css(root, 'background-color') ||'', bg;
            if (bgColor.indexOf('rgb') === 0) {
              bg = toHex(bgColor);
            } else if (bgColor.indexOf('#') === 0) {
              bg = toLongHex(bgColor);
            }

            // issues #387
            opts.initialVolume = player.volumeLevel;

            var swfUrl = isHLS(video) ? conf.swfHls : conf.swf;

            api = embed(swfUrl, opts, conf.wmode, bg)[0];

            var container = common.find('.fp-player', root)[0];

            common.prepend(container, api);

            player.off('quality.flashengine').on('quality.flashengine', function(ev, _api, quality) {
              var hlsQualities =
                typeof player.video.hlsQualities !== 'undefined' ?
                  player.video.hlsQualities :
                    player.conf.hlsQualities;
              if (!hlsQualities) return;
              api.__quality(quality);
            });

            // throw error if no loading occurs
            setTimeout(function() {
               try {
                  if (!api.PercentLoaded()) {
                     return player.trigger("error", [player, { code: 7, url: conf.swf }]);
                  }
               } catch (e) {}
            }, 5000);

            // detect disabled flash
            //
            timeouts.push(setTimeout(function() {
              if (typeof api.PercentLoaded === 'undefined') {
                player.trigger('flashdisabled', [player]);
              }
            }, 15000));
            timeouts.push(setTimeout(function() {
              if (typeof api.PercentLoaded === 'undefined') {
                player.trigger('flashdisabled', [player, false]);
              }
            }, 500));

            player.off('resume.flashhack').on('resume.flashhack', function() {
              var timer = setTimeout(function() {
                var currentTime = api.__status().time;
                var timer2 = setTimeout(function() {
                  if (player.playing && !player.loading && api.__status().time === currentTime) {
                    player.trigger('flashdisabled', [player]);
                  }
                }, 400);
                timeouts.push(timer2);
                player.one('seek.flashhack pause.flashhack load.flashack', function() { clearTimeout(timer2); });
              }, 800);
              timeouts.push(timer);
              player.one('progress', function() {
                clearTimeout(timer);
              });
            });


            api.pollInterval = setInterval(function () {
               if (!api || suspended) return;
               var status = api.__status ? api.__status() : null;

               if (!status) return;

               if (player.conf.live || player.live || video.live) {
                 video.seekOffset = status.seekOffset;
                 video.duration = status.duration + status.seekOffset;
               }

               if (player.playing && status.time && status.time !== player.video.time) player.trigger("progress", [player, status.time]);

               video.buffer = status.buffer / video.bytes * video.duration;
               player.trigger("buffer", [player, video.buffer]);

               if (!video.buffered && status.time > 0) {
                  video.buffered = true;
                  player.trigger("buffered", [player]);
               }

            }, 250);

            // listen
            window[callbackId] = function(type, arg) {
               var video = loadVideo;

               if (conf.debug) {
                 if (type.indexOf('debug') === 0 && arg && arg.length) {
                   console.log.apply(console, ['-- ' + type].concat(arg));
                 }
                 else console.log("--", type, arg);
               }

               var event = {
                 type: type
               };

               switch (type) {

                  // RTMP sends a lot of finish events in vain
                  // case "finish": if (conf.rtmp) return;
                  case "ready": arg = extend(video, arg); break;
                  case "click": event.flash = true; break;
                  case "keydown": event.which = arg; break;
                  case "seek": video.time = arg; break;
                  case "status":
                     player.trigger("progress", [player, arg.time]);

                     if (arg.buffer < video.bytes && !video.buffered) {
                        video.buffer = arg.buffer / video.bytes * video.duration;
                        player.trigger("buffer", video.buffer);
                     } else if (!video.buffered) {
                        video.buffered = true;
                        player.trigger("buffered");
                     }

                     break;
                 case "metadata":
                   var str = atob(arg);
                   arg = {
                     key: str.substr(10, 4),
                     data: str.substr(21)
                   }
                   break;
               }
               if (type === 'click' || type === 'keydown') {
                 event.target = root;
                 bean.fire(root, type, [event]);
               }
               else if (type != 'buffered' && type !== 'unload') {
                  // add some delay so that player is truly ready after an event
                  setTimeout(function() { player.trigger(event, [player, arg]); }, 1);
               } else if (type === 'unload') {
                 player.trigger(event, [player, arg]);
               }

            };

         }

      },

      // not supported yet
      speed: common.noop,


      unload: function() {
         if (api && api.__unload) api.__unload();
         try {
           if (callbackId && window[callbackId])delete window[callbackId];
         } catch (e) {}
         common.find("object", root).forEach(common.removeNode);
         api = 0;
         player.off('.flashengine');
         player.off('.flashhack');
         clearInterval(api.pollInterval);
         timeouts.forEach(function(t) { clearTimeout(t); });
      }

   };

   ['pause','resume','seek','volume'].forEach(function(name) {

      engine[name] = function(arg) {
         try {
           if (player.ready) {

              if (arg === undefined) {
                 api["__" + name]();

              } else {
                 api["__" + name](arg);
              }

           }
         } catch (e) {
           if (typeof api["__" + name] === 'undefined') { //flash lost it's methods
             return player.trigger('flashdisabled', [player]);
           }
           throw e;
         }
      };

   });

   function toHex(bg) {
     function hex(x) {
       return ("0" + parseInt(x).toString(16)).slice(-2);
     }

     bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
     if (!bg) return;

     return '#' + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
   }

   function toLongHex(bg) {
     if (bg.length === 7) return bg;
     var a = bg.split('').slice(1);
     return '#' + a.map(function(i) {
       return i + i;
     }).join('');
   }

   function isHLS(video) {
     return /application\/x-mpegurl/i.test(video.type);
   }

   return engine;

};


engineImpl.engineName = 'flash';
engineImpl.canPlay = function(type, conf) {
  return flowplayer.support.flashVideo && /video\/(mp4|flash|flv)/i.test(type) || flowplayer.support.flashVideo && conf.swfHls && /mpegurl/i.test(type);
};
flowplayer.engines.push(engineImpl);



function isAbsolute(url) {
  return /^https?:/.test(url);
}

},{"../common":1,"../flowplayer":31,"./embed":2,"bean":34,"extend-object":39}],4:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer')
  , support = flowplayer.support
  , common = flowplayer.common
  , html5factory = _dereq_('./html5-factory');



function canPlay(type) {
  if (typeof window.Hls === 'undefined') return false;
  return /mpegurl/.test(type) && window.Hls.isSupported();
}

var engine;

engine = function(player, root) {

  var hls, Hls = window.Hls
    , lastSelectedLevel
    , lastSource;

  return html5factory('hlsjs-lite', player, root, canPlay, function(video, api, engineApi) {
    hls = engine.hls = new Hls(flowplayer.extend({}, player.conf.hlsjs, video.hlsjs));
    engine.extensions.forEach(function(ext) {
      ext(hls, player, root);
    });
    hls.loadSource(video.src);

    // API overriders
    engineApi.resume = function() {
      if (player.live && !player.dvr) api.currentTime = hls.liveSyncPosition;
      api.play();
    };

    engineApi.seek = function(seekTo) {
      try {
        if (player.live && !player.dvr) api.currentTime = Math.min(seekTo, hls.liveSyncPosition);
        else api.currentTime = seekTo;
      } catch (e) {
        player.debug('Failed to seek to ', seekTo, e);
      }
    };

    // Quality selection
    player.on('quality', function(_ev, _api, q) {
      hls.nextLevel = lastSelectedLevel = q;
    });


    hls.on(Hls.Events.MANIFEST_PARSED, function(_, data) {
      var hlsQualities = video.hlsQualities || player.conf.hlsQualities
        , confQualities
        , qualityLabels = {}
        , levels = data.levels;

      if (hlsQualities === false) return hls.attachMedia(api);
      if (hlsQualities === 'drive') switch (levels.length) {
        case 4:
          confQualities = [1, 2, 3];
          break;
        case 5:
          confQualities = [1, 2, 3, 4];
          break;
        case 6:
          confQualities = [1, 3, 4, 5];
          break;
        case 7:
          confQualities = [1, 3, 5, 6];
          break;
        case 8:
          confQualities = [1, 3, 6, 7];
          break;
        default:
          if (levels.length < 3 || (levels[0].height && levels[2].height && levels[0].height === levels[2].height)) {
            confQualities = [];
          } else {
            confQualities = [1, 2];
          }
          break;
      }

      video.qualities = [{
        value: -1,
        label: 'Auto'
      }]

      if (Array.isArray(hlsQualities)) {
        video.qualities = [];
        confQualities = hlsQualities.map(function(q) {
          if (typeof q.level !== 'undefined') qualityLabels[q.level] = q.label;
          return typeof q.level !== 'undefined' ? q.level : q;
        });
      }

      var initialLevel = -2;

      video.qualities = video.qualities.concat(levels.map(function(level, i) {
        if (confQualities && confQualities.indexOf(i) === -1) return false;
        var label = qualityLabels[i] || (Math.min(level.width, level.height) + 'p');
        if (!qualityLabels[i] && hlsQualities !== 'drive') label += ' (' + Math.round(level.bitrate / 1000) + 'k)';
        if (i === lastSelectedLevel) initialLevel = i;

        return {
          value: i,
          label: label
        };
      })).filter(common.identity);


      var currentLevel = video.quality = initialLevel === -2 ?  video.qualities[0].value || -1 : initialLevel;

      if (currentLevel !== hls.currentLevel) hls.currentLevel = currentLevel;

      // End quality selection

      hls.attachMedia(api);

      if (lastSource && video.src !== lastSource) api.play();
      lastSource = video.src;
    });
  });
};


engine.canPlay = function(type, conf) {
  if (support.browser.safari && !(conf.clip && conf.clip.hlsjs || conf.hlsjs || {}).safari) return false;
  return flowplayer.support.video && canPlay(type);
};

engine.engineName = 'hlsjs-lite';

engine.plugin = function(extension) {
  engine.extensions.push(extension);
}

engine.extensions = [];

flowplayer.engines.push(engine);

},{"../flowplayer":31,"./html5-factory":5}],5:[function(_dereq_,module,exports){
/*eslint indent: ["error", 2]*/
/*eslint quotes: ["error", "single"]*/

var flowplayer = _dereq_('../flowplayer')
  , common = flowplayer.common
  , support = flowplayer.support
  , bean = flowplayer.bean
  , extend = flowplayer.extend;

var desktopSafari = support.browser.safari && !support.iOS;
// HTML5 --> Flowplayer event
var EVENTS = {
  ended: 'finish',
  pause: 'pause',
  play: 'resume',
  timeupdate: 'progress',
  volumechange: 'volume',
  ratechange: 'speed',
  seeked: 'seek',
  loadedmetadata: !desktopSafari ? 'ready' : 0,
  canplaythrough: desktopSafari ? 'ready' : 0,
  durationchange: 'ready',
  error: 'error',
  dataunavailable: 'error',
  webkitendfullscreen: !flowplayer.support.inlineVideo && 'unload',
  progress: 'buffer'
};


function html5factory(engineName, player, root, canPlay, ext) {
  var api = common.findDirect('video', root)[0] || common.find('.fp-player > video', root)[0]
    , conf = player.conf
    , timer
    , volumeLevel
    , self;
  return self = {
    engineName: engineName,

    pick: function(sources) {
      var source = support.video && sources.filter(function(s) {
        return canPlay(s.type);
      })[0];

      if (!source) return;
      if (typeof source.src === 'string') source.src = common.createAbsoluteUrl(source.src);
      return source;
    },

    load: function(video) {
      var container = common.find('.fp-player', root)[0];

      if (!api) {
        api = document.createElement('video');
        common.prepend(container, api);
        api.autoplay = !!conf.splash;
      }
      common.addClass(api, 'fp-engine');
      common.find('track', api).forEach(common.removeNode);
      api.preload = 'none';

      if (!conf.nativesubtitles) common.attr(api, 'crossorigin', false);

      if (!conf.disableInline) {
        api.setAttribute('webkit-playsinline', 'true');
        api.setAttribute('playsinline', 'true');
      }

      if (!support.inlineVideo) {
        common.css(api, {
          position: 'absolute',
          top: '-9999em'
        });
      }

      if (support.subtitles && conf.nativesubtitles && video.subtitles && video.subtitles.length) {
        common.addClass(api, 'native-subtitles');
        var subtitles = video.subtitles;
        var setMode = function(mode) {
          var tracks = api.textTracks;
          if (!tracks.length) return;
          tracks[0].mode = mode;
        };
        if (subtitles.some(function(st) { return !common.isSameDomain(st.src); })) common.attr(api, 'crossorigin', 'anonymous');
        if (typeof api.textTracks.addEventListener === 'function') api.textTracks.addEventListener('addtrack', function() {
          setMode('disabled');
          setMode('showing');
        });
        subtitles.forEach(function(st) {
          api.appendChild(common.createElement('track', {
            kind: 'subtitles',
            srclang: st.srclang || 'en',
            label: st.label || 'en',
            src: st.src,
            'default': st['default']
          }));
        });
      }

      // IE does not fire delegated timeupdate events
      bean.off(api, 'timeupdate', common.noop);
      bean.on(api, 'timeupdate', common.noop);

      common.prop(api, 'loop', false);
      player.off('.loophack');
      if (video.loop || conf.loop) {
        player.on('finish.loophack', function() { player.resume(); });
      }

      if (typeof volumeLevel !== 'undefined') {
        api.volume = volumeLevel;
      }

      ext(video, api, self);
      if (conf.autoplay || conf.splash || video.autoplay) {
        player.debug('Autoplay / Splash setup, try to start video');
        try {
          var p = api.play();
          if (p && p.catch) {
            p.catch(function(err) {
              if (err.name === 'AbortError' && err.code === 20) return;
              player.debug('Play errored, trying muted', err);
              player.mute(true);
              api.play();
            });
          }
        } catch(e) {
          player.debug('play() error thrown', e);
        }
      }

      self._listeners = listen(api, common.find('source', api).concat(api), video) || self._listeners;


      var preloadCheck = function() {
        if (!isInViewport(root)) return;
        if (support.preloadMetadata) api.preload = 'metadata';
        else api.load();
        bean.off(document, 'scroll.preloadviewport');
      };
      preloadCheck();
      bean.off(document, 'scroll.preloadviewport');
      bean.on(document, 'scroll.preloadviewport', function() {
        window.requestAnimationFrame(preloadCheck);
      });
    },

    mute: function(flag) {
      api.muted = !!flag;
      player.trigger('mute', [player, flag]);
      player.trigger('volume', [player, flag ? 0 : api.volume]);
    },

    pause: function() {
      api.pause();
    },

    resume: function() {
      api.play();
    },

    speed: function(val) {
      api.playbackRate = val;
    },

    seek: function(time) {
      try {
        api.currentTime = time;
      } catch (ignored) {}
    },

    volume: function(level) {
      volumeLevel = level;
      if (api) {
        api.volume = level;
        if (level) self.mute(false);
      }
    },

    unload: function() {
      bean.off(document, 'scroll.preloadviewport');
      common.find('video.fp-engine', root).forEach(function (videoTag) {
        common.attr(videoTag, 'src', '');
        common.removeNode(videoTag);
      });
      timer = clearInterval(timer);
      var instanceId = root.getAttribute('data-flowplayer-instance-id');
      delete api.listeners[instanceId];
      api = 0;
      if (self._listeners) Object.keys(self._listeners).forEach(function(typ) {
        self._listeners[typ].forEach(function(l) {
          root.removeEventListener(typ, l, true);
        });
      });
    }
  };

  function listen(api, sources, video) {
      // listen only once
    var instanceId = root.getAttribute('data-flowplayer-instance-id');

    if (api.listeners && api.listeners.hasOwnProperty(instanceId)) {
      api.listeners[instanceId] = video;
      return;
    }
    (api.listeners || (api.listeners = {}))[instanceId] = video;

    bean.on(sources, 'error', function(e) {
      try {
        if (canPlay(e.target.getAttribute('type'))) {
          player.trigger('error', [player, { code: 4, video: extend(video, {src: api.src, url: api.src}) }]);
        }
      } catch (er) {
         // Most likely: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
      }
    });

    player.on('shutdown', function() {
      bean.off(sources);
      bean.off(api, '.dvrhack');
      player.off('.loophack');
    });

    var eventListeners = {};
    //Special event handling for HLS metadata events

    var listenMetadata = function(track) {
      if (track.kind !== 'metadata') return;
      track.mode = 'hidden';
      track.addEventListener('cuechange', function() {
        player.trigger('metadata', [player, track.activeCues[0].value]);
      }, false);
    };

    if (api && api.textTracks && api.textTracks.length) Array.prototype.forEach.call(api.textTracks, listenMetadata);
    if (api && api.textTracks && typeof api.textTracks.addEventListener === 'function') api.textTracks.addEventListener('addtrack', function(tev) {
      listenMetadata(tev.track);
    }, false);
    if (player.conf.dvr || player.dvr || video.dvr) {
      bean.on(api, 'progress.dvrhack', function() {
        if (!api.seekable.length) return;
        player.video.duration = api.seekable.end(null);
        player.video.seekOffset = api.seekable.start(null);
        player.trigger('dvrwindow', [player, {
          start: api.seekable.start(null),
          end: api.seekable.end(null)
        }]);
        if (api.currentTime >= api.seekable.start(null)) return;
        api.currentTime = api.seekable.start(null);
      });
    }

    Object.keys(EVENTS).forEach(function(type) {
      var flow = EVENTS[type];
      if (type === 'webkitendfullscreen' && player.conf.disableInline) flow = 'unload';
      if (!flow) return;
      var l = function(e) {
        video = api.listeners[instanceId];
        if (!e.target || !common.hasClass(e.target, 'fp-engine')) return;

        if (conf.debug && !/progress/.test(flow)) console.log(type, '->', flow, e);

        var triggerEvent = function(f) {
          player.trigger(f || flow, [player, arg]);
        };

        // no events if player not ready
        if (!player.ready && !/ready|error/.test(flow) || !flow || !common.find('video', root).length) {
          if (flow === 'resume') player.one('ready', function() { setTimeout(function() { triggerEvent(); }) });
          return;
        }
        var arg;

        if (flow === 'unload') { //Call player unload
          player.unload();
          return;
        }

        switch (flow) {

        case 'ready':
          if (player.ready) return;
          if (!api.duration && !player.live) return;
          arg = extend(video, {
            duration: api.duration < Number.MAX_VALUE ? api.duration : 0,
            width: api.videoWidth,
            height: api.videoHeight,
            url: api.currentSrc,
            src: api.currentSrc
          });

          try {
            arg.seekable = /mpegurl/i.test(video ? (video.type || '') : '') && api.duration || api.seekable && api.seekable.end(null) || player.live;

          } catch (ignored) {}

          if (!player.live && !arg.duration && !support.hlsDuration && type === 'loadeddata') {
            var durationChanged = function() {
              arg.duration = api.duration;
              try {
                arg.seekable = api.seekable && api.seekable.end(null);

              } catch (ignored) {}
              triggerEvent();
              api.removeEventListener('durationchange', durationChanged);
              common.toggleClass(root, 'is-live', false);
            };
            api.addEventListener('durationchange', durationChanged);

            // Ugly hack to handle broken Android devices
            var timeUpdated = function() {
              if (!player.ready && !api.duration) { // No duration even though the video already plays
                arg.duration = 0;
                common.addClass(root, 'is-live'); // Make UI believe it's live
                triggerEvent();
              }
              api.removeEventListener('timeupdate', timeUpdated);
            };
            api.addEventListener('timeupdate', timeUpdated);
            return;
          }

          break;

        case 'progress': case 'seek':

          if (api.currentTime > 0 || player.live) {
            arg = Math.max(api.currentTime, 0);

          } else if (flow === 'seek' && api.currentTime === 0) {
            arg = 0;
          } else if (flow == 'progress') {
            return;
          }
          break;

        case 'buffer':
          arg = [];
          for (var i=0; i < api.buffered.length; i++) {
            arg.push({
              start: api.buffered.start(i),
              end: api.buffered.end(i)
            });
          }
          if (api.buffered.end(null) === api.duration) triggerEvent('buffered');
          break;

        case 'speed':
          arg = round(api.playbackRate);
          break;

        case 'volume':
          arg = round(api.muted ? 0 : api.volume);
          break;

        case 'error':
          try {
            arg = (e.srcElement || e.originalTarget).error;
            arg.video = extend(video, {src: api.src, url: api.src});
          } catch (er) {
            // Most likely https://bugzilla.mozilla.org/show_bug.cgi?id=208427
            return;
          }
        }

        triggerEvent();


      };
      root.addEventListener(type, l, true);
      if (!eventListeners[type]) eventListeners[type] = [];
      eventListeners[type].push(l);

    });
    return eventListeners;

  }

}

module.exports = html5factory;

function round(val, per) {
  per = per || 100;
  return Math.round(val * per) / per;
}

function isInViewport(elem) {
  var rect = elem.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width /*or $(window).width() */
  );
}

},{"../flowplayer":31}],6:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer')
  , common = flowplayer.common
  , html5factory = _dereq_('./html5-factory');

var VIDEO = document.createElement('video');

function getType(type) {
   return /mpegurl/i.test(type) ? "application/x-mpegurl" : type;
}

function canPlay(type) {
   if (!/^(video|application)/i.test(type))
      type = getType(type);
   return !!VIDEO.canPlayType(type).replace("no", '');
}

var engine;

engine = function(player, root) {

  return html5factory('html5', player, root, canPlay, function(video, api) {
    if (api.currentSrc !== video.src) {
      common.find('source', api).forEach(common.removeNode);
      api.src = video.src;
      api.type = video.type;
    }
  });
};


engine.canPlay = function(type) {
  return flowplayer.support.video && canPlay(type);
};

engine.engineName = 'html5';

flowplayer.engines.push(engine);

},{"../flowplayer":31,"./html5-factory":5}],7:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer')
  , common = _dereq_('../common')
  , bean = _dereq_('bean');

flowplayer(function(api, root) {
  api.on('ready', function() {
    var el = common.find('video.fp-engine', root)[0];
    if (!el) return;
    el.setAttribute('x-webkit-airplay', 'allow');

    if (!window.WebKitPlaybackTargetAvailabilityEvent) return;
    el.addEventListener('webkitplaybacktargetavailabilitychanged', function(ev) {
      if (ev.availability !== 'available') return;
      var btnContainer = common.find('.fp-header', root)[0];
      common.find('.fp-airplay', btnContainer).forEach(common.removeNode);
      var trigger = common.createElement('a', { 'class': 'fp-airplay fp-icon', title: 'Play on AirPlay device'})
      btnContainer.insertBefore(trigger, common.find('.fp-fullscreen', btnContainer)[0]);

    });

    el.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', function() {
      var trigger = common.find('.fp-airplay', root)[0];
      if (!trigger) return;
      common.toggleClass(trigger, 'fp-active', el.webkitCurrentPlaybackTargetIsWireless);
    });

  });

  bean.on(root, 'click', '.fp-airplay', function(ev) {
    ev.preventDefault();
    var video = common.find('video.fp-engine', root)[0];
    video.webkitShowPlaybackTargetPicker();
  });


});

},{"../common":1,"../flowplayer":31,"bean":34}],8:[function(_dereq_,module,exports){
'use strict';
/* global _gat */
var flowplayer = _dereq_('../flowplayer'),
    TYPE_RE = _dereq_('./resolve').TYPE_RE,
    scriptjs = _dereq_('scriptjs'),
    bean = _dereq_('bean');
flowplayer(function(player, root) {

   var id = player.conf.analytics, time = 0, last = 0, timer;

   if (id) {

      // load Analytics script if needed
      if (typeof _gat == 'undefined') scriptjs("//google-analytics.com/ga.js");

      var getTracker = function() {
        var tracker = _gat._getTracker(id);
        tracker._setAllowLinker(true);
        return tracker;
      };

      var  track = function track(e, api, video) {

         video = video || player.video;

         if (time && typeof _gat != 'undefined') {
            var tracker = getTracker();


            // http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html
            tracker._trackEvent(
               "Video / Seconds played",
               player.engine.engineName + "/" + video.type,
               video.title || root.getAttribute("title") || video.src.split("/").slice(-1)[0].replace(TYPE_RE, ''),
               Math.round(time / 1000)
            );
            time = 0;
            if (timer) {
              clearTimeout(timer);
              timer = null;
            }
         }

      };

      player.bind("load unload", track).bind("progress", function() {

         if (!player.seeking) {
            time += last ? (+new Date() - last) : 0;
            last = +new Date();
         }

         if (!timer) {
           timer = setTimeout(function() {
             timer = null;
             var tracker = getTracker();
             tracker._trackEvent('Flowplayer heartbeat', 'Heartbeat', '', 0, true);
           }, 10*60*1000); // heartbeat every 10 minutes
         }

      }).bind("pause", function() {
         last = 0;
      });

      player.bind('shutdown', function() {
        bean.off(window, 'unload', track);
      });

      bean.on(window, 'unload', track);

   }

});

},{"../flowplayer":31,"./resolve":21,"bean":34,"scriptjs":45}],9:[function(_dereq_,module,exports){
/* global chrome */
/* eslint-disable no-console */

'use strict';
var flowplayer = _dereq_('../flowplayer')
  , common = _dereq_('../common')
  , bean = _dereq_('bean')
  , scriptjs = _dereq_('scriptjs');



flowplayer(function(api, root) {
  if (api.conf.chromecast === false) return;
  scriptjs('https://www.gstatic.com/cv/js/sender/v1/cast_sender.js');
  window['__onGCastApiAvailable'] = function(loaded) {
    if (!loaded) return;
    initialize();
  };

  var conf = api.conf.chromecast || {}
    , session
    , timer
    , trigger;

  function initialize() {
    var applicationId, sessionRequest, apiConfig;
    applicationId = conf.applicationId || chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
    sessionRequest = new chrome.cast.SessionRequest(applicationId);
    apiConfig = new chrome.cast.ApiConfig(
      sessionRequest,
      sessionListener,
      receiverListener
    );
    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
  }

  function sessionListener() {
    console.log('sessionListener');
  }

  function receiverListener(ev) {
    if (ev !== chrome.cast.ReceiverAvailability.AVAILABLE) return;
    createUIElements();
  }

  function onInitSuccess() {
    /* noop */
  }

  function onError() {
    console.log('onError');
  }

  function createUIElements() {
    var btnContainer = common.find('.fp-header', root)[0];
    common.find('.fp-chromecast', btnContainer).forEach(common.removeNode);
    common.find('.fp-chromecast-engine', root).forEach(common.removeNode);
    trigger = common.createElement('a', { 'class': 'fp-chromecast fp-icon', title: 'Play on Cast device'})
    btnContainer.insertBefore(trigger, common.find('.fp-fullscreen', btnContainer)[0]);
    var chromeCastEngine = common.createElement('div', { 'class': 'fp-chromecast-engine' })
      , chromeCastStatus = common.createElement('p', { 'class': 'fp-chromecast-engine-status' })
      , chromeCastIcon = common.createElement('p', { 'class': 'fp-chromecast-engine-icon' });
    chromeCastEngine.appendChild(chromeCastIcon);
    chromeCastEngine.appendChild(chromeCastStatus);
    var engine = common.find('.fp-engine', root)[0];
    if (!engine) common.prepend(common.find('.fp-player', root)[0] || root, chromeCastEngine);
    else engine.parentNode.insertBefore(chromeCastEngine, engine);
  }

  function destroy() {
    clearInterval(timer);
    timer = null;
    api.release();
    common.toggleClass(root, 'is-chromecast', false);
    common.toggleClass(trigger, 'fp-active', false);
  }

  bean.on(root, 'click', '.fp-chromecast', function(ev) {
    ev.preventDefault();
    if (session) {
      api.trigger('pause', [api]);
      session.stop();
      session = null;
      destroy();
      return;
    }
    if (api.playing) api.pause();
    chrome.cast.requestSession(function(s) {
      session = s;
      var receiverName = session.receiver.friendlyName;
      common.html(common.find('.fp-chromecast-engine-status')[0], 'Playing on device ' + receiverName);
      var mediaInfo = new chrome.cast.media.MediaInfo(api.video.src);
      var request = new chrome.cast.media.LoadRequest(mediaInfo);
      session.loadMedia(request, onMediaDiscovered, function onMediaError() { });

      function onMediaDiscovered(media) {
        media.addUpdateListener(function(alive) {
          if (!session) return; // Already destoryed
          timer = timer || setInterval(function() {
            api.trigger('progress', [api, media.getEstimatedTime()]);
          }, 500);
          if (!alive) {
            destroy();
            api.trigger('finish', [api]);
          } else {
            common.toggleClass(root, 'is-chromecast', true);
            common.toggleClass(trigger, 'fp-active', true);
            api.hijack({
              pause: function() {
                media.pause();
              },
              resume: function() {
                media.play();
              },
              seek: function(time) {
                var req = new chrome.cast.media.SeekRequest();
                req.currentTime = time;
                media.seek(req);
              }
            });
          }
          var playerState = media.playerState;
          if (api.paused && playerState === chrome.cast.media.PlayerState.PLAYING) api.trigger('resume', [api]);
          if (api.playing && playerState === chrome.cast.media.PlayerState.PAUSED) api.trigger('pause', [api]);
          common.toggleClass(root, 'is-loading', playerState === chrome.cast.media.PlayerState.BUFFERING);
        });
      }
    }, function(err) {
      console.error('requestSession error', err);
    });
  });

});

},{"../common":1,"../flowplayer":31,"bean":34,"scriptjs":45}],10:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    common = _dereq_('../common'),
    bean = _dereq_('bean');

flowplayer(function(player, root) {

   var CUE_RE = / ?cue\d+ ?/;

   var cuepointsDisabled = false;

   function setClass(index) {
      root.className = root.className.replace(CUE_RE, " ");
      if (index >= 0) common.addClass(root, 'cue' + index);
   }

   var segments = {}, lastFiredSegment = -0.125;

   var fire = function(cue) {
     var idx = player.cuepoints.indexOf(cue);
     if (!isNaN(cue)) cue = { time: cue };
     cue.index = idx;
     setClass(idx);
     player.trigger('cuepoint', [player, cue]);
   };

   player.on("progress", function(e, api, time) {
     if (cuepointsDisabled) return;
      var segment = segmentForCue(time);
      while (lastFiredSegment < segment) {
        lastFiredSegment += 0.125;
        if (!segments[lastFiredSegment]) continue;
        segments[lastFiredSegment].forEach(fire);
      }

   }).on("unload", setClass)
   .on('beforeseek', function(ev) {
     setTimeout(function() {
       if (!ev.defaultPrevented) cuepointsDisabled = true;
     });
   }).on("seek", function(ev, api, time) {
     setClass();
     lastFiredSegment = segmentForCue(time || 0) - 0.125;
     cuepointsDisabled = false;
     if (!time && segments[0]) segments[0].forEach(fire);
   }).on('ready', function(e, api, video) {
     lastFiredSegment = -0.125;
     var cues = video.cuepoints || player.conf.cuepoints || [];
     player.setCuepoints(cues);
   }).on('finish', function() {
     lastFiredSegment = -0.125;
   });
   if (player.conf.generate_cuepoints) {

      player.bind("load", function() {

         // clean up cuepoint elements of previous playlist items
         common.find('.fp-cuepoint', root).forEach(common.removeNode);

      });
   }

   /**
    * API
    */
   player.setCuepoints = function(cues) {
     player.cuepoints = [];
     segments = {};
     cues.forEach(player.addCuepoint);
     return player;
   };
   player.addCuepoint = function(cue) {
     if (!player.cuepoints) player.cuepoints = [];
     var segment = segmentForCue(cue);
     if (!segments[segment]) segments[segment] = [];
     segments[segment].push(cue);
     player.cuepoints.push(cue);

    if (player.conf.generate_cuepoints && cue.visible !== false) {
       var duration = player.video.duration,
           timeline = common.find('.fp-timeline', root)[0];
        common.css(timeline, "overflow", "visible");

        var time = cue.time || cue;
        if (time < 0) time = duration + time;

        var el = common.createElement('a', {className: 'fp-cuepoint fp-cuepoint' + (player.cuepoints.length - 1)});
        common.css(el, "left", (time / duration * 100) + "%");

        timeline.appendChild(el);
        bean.on(el, 'mousedown', function(e) {
          e.preventDefault();
          e.stopPropagation();
          player.seek(time);
        });
    }
    return player;
   };

   player.removeCuepoint = function(cue) {
     var idx = player.cuepoints.indexOf(cue),
         segment = segmentForCue(cue);
     if (idx === -1) return;
     player.cuepoints = player.cuepoints.slice(0, idx).concat(player.cuepoints.slice(idx+1));

     var sIdx = segments[segment].indexOf(cue);
     if (sIdx === -1) return;
     segments[segment] = segments[segment].slice(0, sIdx).concat(segments[segment].slice(sIdx+1));
     return player;
   };

   function segmentForCue(cue) {
     var time = cue && !isNaN(cue.time) ? cue.time : cue;
     if (time < 0) time = player.video.duration + time;
     return Math.round(time/0.125)*0.125;
   }

});

},{"../common":1,"../flowplayer":31,"bean":34}],11:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    bean = _dereq_('bean'),
    common = _dereq_('../common'),
    clipboard = _dereq_('./util/clipboard');

flowplayer(function(player, root) {

   // no embedding
   if (player.conf.embed === false || player.conf.share === false) return;

   var btnContainer = common.find('.fp-share-menu', root)[0],
      trigger = common.createElement('a', { "class": "fp-icon fp-embed", title: 'Copy to your site'}, 'Embed');

   common.append(btnContainer, trigger);
  //ui.appendChild(target);

   player.embedCode = function() {
     var embedConf = player.conf.embed || {},
         video = player.video,
         width = embedConf.width || video.width || common.width(root),
         height = embedConf.height || video.height || common.height(root),
         ratio = player.conf.ratio,
         itrunc = '<iframe src="' + player.shareUrl(true) + '" allowfullscreen style="border:none;';

     if (embedConf.width || embedConf.height) {
        if (!isNaN(width)) width += 'px';
        if (!isNaN(height)) height += 'px';
        return itrunc + 'width:' + width + ';height:' + height + ';"></iframe>';
     }

     if (!ratio || player.conf.adaptiveRatio) ratio = height / width;
     return '<div style="position:relative;width:100%;display:inline-block;">' + itrunc + 'position:absolute;top:0;left:0;width:100%;height:100%;"></iframe><div style="padding-top:' + (ratio * 100) + '%;"></div></div>';
   };

   bean.on(root, 'click', '.fp-embed', function() {
     clipboard(player.embedCode(), function() {
       player.message('The embed code is now on your clipboard', 2000);
     }, function() {
       player.textarea(player.embedCode(), 'Copy the code below to embed your video');
     });
   });

});

},{"../common":1,"../flowplayer":31,"./util/clipboard":30,"bean":34}],12:[function(_dereq_,module,exports){
'use strict';
/**
 * Mimimal jQuery-like event emitter implementation
 */
module.exports = function(obj, elem) {
  if (!elem) elem = document.createElement('div'); //In this case we always want to trigger (Custom)Events on dom element
  var handlers = {}, eventArguments = {};

  var listenEvent = function(type, hndlr, disposable) {
    var actualEvent = type.split('.')[0]; //Strip namespace
    var internalHandler = function(ev) {
      if (disposable) {
        elem.removeEventListener(actualEvent, internalHandler);
        handlers[type].splice(handlers[type].indexOf(internalHandler), 1);
      }
      var args = [ev].concat(eventArguments[ev.timeStamp + ev.type] || []);
      if (hndlr) hndlr.apply(undefined, args);
    };
    elem.addEventListener(actualEvent, internalHandler);

    //Store handlers for unbinding
    if (!handlers[type]) handlers[type] = [];
    handlers[type].push(internalHandler);
  };

  obj.on = obj.bind = function(typ, hndlr) {
    var types = typ.split(' ');
    types.forEach(function(type) {
      listenEvent(type, hndlr);
    });
    return obj; //for chaining
  };

  obj.one = function(typ, hndlr) {
    var types = typ.split(' ');
    types.forEach(function(type) {
      listenEvent(type, hndlr, true);
    });
    return obj;
  };

  // Function to check if all items in toBeContained array are in the containing array
  var containsAll = function(containing, toBeContained) {
    return toBeContained.filter(function(i) {
      return containing.indexOf(i) === -1;
    }).length === 0;
  };


  obj.off = obj.unbind = function(typ) {
    var types = typ.split(' ');
    types.forEach(function(type) {
      var typeNameSpaces = type.split('.').slice(1),
          actualType = type.split('.')[0];
      Object.keys(handlers).filter(function(t) {
        var handlerNamespaces = t.split('.').slice(1);
        return (!actualType || t.indexOf(actualType) === 0) && containsAll(handlerNamespaces, typeNameSpaces);
      }).forEach(function(t) {
        var registererHandlers = handlers[t],
            actualEvent = t.split('.')[0];
        handlers[t] = registererHandlers.filter(function(hndlr) {
          elem.removeEventListener(actualEvent, hndlr);
          return false;
        });
      });
    });
    return obj;
  };

  obj.trigger = function(typ, args, returnEvent) {
    if (!typ) return;
    args = (args || []).length ? args || [] : [args];
    var event = document.createEvent('Event'), typStr;
    typStr = typ.type || typ;
    event.initEvent(typStr, false, true);
    if (Object.defineProperty) event.preventDefault = function() {
      Object.defineProperty(this, 'defaultPrevented', { get: function() { return true; } });
    };
    eventArguments[event.timeStamp + event.type] = args;
    elem.dispatchEvent(event);
    return returnEvent ? event : obj;
  };
};


module.exports.EVENTS = [
  'beforeseek',
  'disable',
  'error',
  'finish',
  'fullscreen',
  'fullscreen-exit',
  'load',
  'mute',
  'pause',
  'progress',
  'ready',
  'resume',
  'seek',
  'speed',
  'stop',
  'unload',
  'volume',
  'boot',
  'shutdown'
];

},{}],13:[function(_dereq_,module,exports){
'use strict';

var flowplayer = _dereq_('../flowplayer')
  , common = _dereq_('../common')
  , bean = _dereq_('bean');

flowplayer(function(api, root) {
  var c = api.conf;

  if (c.share === false || !c.facebook) return;

  api.facebook = function() {
    var left
      , top
      , width = 550
      , height = 420
      , winHeight = screen.height
      , winWidth = screen.width
      , windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes'
      , shareUrl = typeof c.facebook === 'string' ? c.facebook : window.location.toString();
    left = Math.round((winWidth / 2) - (width / 2));
    top = 0;
    if (winHeight > height) {
      top = Math.round((winHeight / 2) - (height / 2));
    }
    window.open(
      'https://www.facebook.com/sharer.php?s=100&p[url]=' + encodeURIComponent(shareUrl),
      'sharer',
      windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top
    );
  };

  var btnContainer = common.find('.fp-share-menu', root)[0]
    , trigger = common.createElement('a', { "class": "fp-icon fp-facebook"}, 'Facebook');

  common.append(btnContainer, trigger);

  bean.on(root, 'click', '.fp-facebook', function() {
    api.facebook();
  });
});

},{"../common":1,"../flowplayer":31,"bean":34}],14:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    bean = _dereq_('bean'),
    common = _dereq_('../common'),
   FS_ENTER = "fullscreen",
   FS_EXIT = "fullscreen-exit",
   FULL_PLAYER,
   FS_SUPPORT = flowplayer.support.fullscreen,
   ua = navigator.userAgent.toLowerCase(),
   IS_SAFARI = /(safari)[ \/]([\w.]+)/.exec(ua) && !/(chrome)[ \/]([\w.]+)/.exec(ua);


// esc button
bean.on(document, "fullscreenchange.ffscr webkitfullscreenchange.ffscr mozfullscreenchange.ffscr MSFullscreenChange.ffscr", function(e) {
  var el = document.webkitCurrentFullScreenElement || document.mozFullScreenElement || document.fullscreenElement || document.msFullscreenElement || e.target;
  if (!FULL_PLAYER && (!el.parentNode || !el.parentNode.getAttribute('data-flowplayer-instance-id'))) return;
  var player = FULL_PLAYER || flowplayer(el.parentNode);
  if (el && !FULL_PLAYER) {
     FULL_PLAYER = player.trigger(FS_ENTER, [player]);
  } else {
     FULL_PLAYER.trigger(FS_EXIT, [FULL_PLAYER]);
     FULL_PLAYER = null;
  }
 });

flowplayer(function(player, root) {

   var wrapper = common.createElement('div', {className: 'fp-player'});
   Array.prototype.map.call(root.children, common.identity).forEach(function(el) {
     if (common.matches(el, '.fp-ratio,script')) return;
     wrapper.appendChild(el);
   });
   root.appendChild(wrapper);

   if (!player.conf.fullscreen) return;

   var win = window,
      scrollY,
      scrollX;

   player.isFullscreen = false;

   player.fullscreen = function(flag) {

      if (player.disabled) return;

      if (flag === undefined) flag = !player.isFullscreen;

      if (flag) {
        scrollY = win.scrollY;
        scrollX = win.scrollX;
      }

      if (FS_SUPPORT) {

         if (flag) {
            ['requestFullScreen', 'webkitRequestFullScreen', 'mozRequestFullScreen', 'msRequestFullscreen'].forEach(function(fName) {
               if (typeof wrapper[fName] === 'function') {
                 wrapper[fName](Element.ALLOW_KEYBOARD_INPUT);
               }
            });

         } else {
            ['exitFullscreen', 'webkitCancelFullScreen', 'mozCancelFullScreen', 'msExitFullscreen'].forEach(function(fName) {
              if (typeof document[fName] === 'function') {
                document[fName]();
              }
            });
         }

      } else {
         player.trigger(flag ? FS_ENTER : FS_EXIT, [player]);
      }

      return player;
   };

   var lastClick;

   player.on("mousedown.fs", function() {
      if (+new Date() - lastClick < 150 && player.ready) player.fullscreen();
      lastClick = +new Date();
   });

  player.on(FS_ENTER, function() {
      common.addClass(root, 'is-fullscreen');
      common.toggleClass(root, 'fp-minimal-fullscreen', common.hasClass(root, 'fp-minimal'));
      common.removeClass(root, 'fp-minimal');

      if (!FS_SUPPORT) common.css(root, 'position', 'fixed');
      player.isFullscreen = true;

   }).on(FS_EXIT, function() {
      var oldOpacity;
      common.toggleClass(root, 'fp-minimal', common.hasClass(root, 'fp-minimal-fullscreen'));
      common.removeClass(root, 'fp-minimal-fullscreen');
      if (!FS_SUPPORT && player.engine === "html5") {
        oldOpacity = root.css('opacity') || '';
        common.css(root, 'opacity', 0);
      }
      if (!FS_SUPPORT) common.css(root, 'position', '');

      common.removeClass(root, 'is-fullscreen');
      if (!FS_SUPPORT && player.engine === "html5") setTimeout(function() { root.css('opacity', oldOpacity); });
      player.isFullscreen = false;
      win.scrollTo(scrollX, scrollY);
   }).on('unload', function() {
     if (player.isFullscreen) player.fullscreen();
   });

   player.on('shutdown', function() {
     FULL_PLAYER = null;
   });

});

},{"../common":1,"../flowplayer":31,"bean":34}],15:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    bean = _dereq_('bean'),
    focused,
    focusedRoot,
    IS_HELP = "is-help",
    common = _dereq_('../common');

 // keyboard. single global listener
bean.on(document, "keydown.fp", function(e) {

   var el = focused,
      metaKeyPressed = e.ctrlKey || e.metaKey || e.altKey,
      key = e.which,
      conf = el && el.conf;

   if (!el || !conf.keyboard || el.disabled) return;

   // help dialog (shift key not truly required)
   if ([63, 187, 191].indexOf(key) != -1) {
      common.toggleClass(focusedRoot, IS_HELP);
      return false;
   }

   // close help / unload
   if (key == 27 && common.hasClass(focusedRoot, IS_HELP)) {
      common.toggleClass(focusedRoot, IS_HELP);
      return false;
   }

   if (!metaKeyPressed && el.ready) {

      e.preventDefault();

      // slow motion / fast forward
      if (e.shiftKey) {
         if (key == 39) el.speed(true);
         else if (key == 37) el.speed(false);
         return;
      }

      // 1, 2, 3, 4 ..
      if (key < 58 && key > 47) return el.seekTo(key - 48);

      switch (key) {
         case 38: case 75: el.volume(el.volumeLevel + 0.15); break;        // volume up
         case 40: case 74: el.volume(el.volumeLevel - 0.15); break;        // volume down
         case 39: case 76: el.seeking = true; el.seek(true); break;        // forward
         case 37: case 72: el.seeking = true; el.seek(false); break;       // backward
         case 190: el.seekTo(); break;                                     // to last seek position
         case 32: el.toggle(); break;                                      // spacebar
         case 70: if(conf.fullscreen) el.fullscreen(); break;               // toggle fullscreen
         case 77: el.mute(); break;                                        // mute
         case 81: el.unload(); break;                                      // unload/stop
      }

   }

});

flowplayer(function(api, root) {

   // no keyboard configured
   if (!api.conf.keyboard) return;

   // hover
   bean.on(root, "mouseenter mouseleave", function(e) {
      focused = !api.disabled && e.type == 'mouseover' ? api : 0;
      if (focused) focusedRoot = root;
   });

   api.bind('shutdown', function() {
     if (focusedRoot == root) focusedRoot = null;
   });

});


},{"../common":1,"../flowplayer":31,"bean":34}],16:[function(_dereq_,module,exports){
var flowplayer = _dereq_('../flowplayer')
  , common = _dereq_('../common')
  , bean = _dereq_('bean');

flowplayer(function(api, root) {
  api.showMenu = function(menu, triggerElement) {
    var ui = common.find('.fp-ui', root)[0];
    common.toggleClass(menu, 'fp-active', true);
    setTimeout(function() {
      bean.one(document, 'click', function() {
        api.hideMenu(menu);
      });
    });
    var coordinates = triggerElement;
    if (triggerElement && triggerElement.tagName) {
      coordinates = {
        left: common.offset(triggerElement).left,
        rightFallbackOffset: common.width(triggerElement),
        top: common.offset(triggerElement).top + common.height(triggerElement)
      };
    }
    if (!coordinates) return common.css(menu, 'top', 'auto');
    coordinates.rightFallbackOffset = coordinates.rightFallbackOffset || 0;
    var top = coordinates.top - common.offset(ui).top
      , left = coordinates.left - common.offset(ui).left
    if (common.width(menu) + left > common.width(ui)) left = left - common.width(menu) + coordinates.rightFallbackOffset;
    if (common.height(menu) + top > common.height(ui)) top = top - common.height(menu);
    common.css(menu, {
      top: top + 'px',
      left: left + 'px'
    });
  };

  api.hideMenu = function(menu) {
    common.toggleClass(menu, 'fp-active', false);
    common.css(menu, {
      top: '-9999em'
    });
  };
});

},{"../common":1,"../flowplayer":31,"bean":34}],17:[function(_dereq_,module,exports){
var flowplayer = _dereq_('../flowplayer')
  , common = _dereq_('../common')
  , bean = _dereq_('bean');
flowplayer(function(api, root) {
  var header = common.find('.fp-header', root)[0]
    , ui = common.find('.fp-ui', root)[0];

  api.message = function(txt, ttl) {
    var msg = createMessage(txt);
    var dismiss = function() {
      common.toggleClass(msg, 'fp-shown');
      setTimeout(function() { removeMessage(msg); }, 500);
    };
    if (ttl) setTimeout(dismiss, ttl);
    return dismiss;
  }

  api.textarea = function(txt) {
    var area = document.createElement('textarea');
    area.value = txt;
    area.className = 'fp-textarea';
    ui.appendChild(area);
    bean.on(document, 'click.fptextarea', function(ev) {
      if (ev.target === area) return area.select();
      ev.stopPropagation();
      ev.preventDefault();
      common.removeNode(area);
      bean.off(document, 'click.fptextarea');
    });
  }


  function createMessage(txt) {
    var msg = common.createElement('div', {
      className: 'fp-message'
    }, txt);
    ui.insertBefore(msg, header);
    setTimeout(function() { common.toggleClass(msg, 'fp-shown'); });
    return msg;
  }

  function removeMessage(msg) {
    common.removeNode(msg);
  }
});

},{"../common":1,"../flowplayer":31,"bean":34}],18:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    isIeMobile = /IEMobile/.test(window.navigator.userAgent),
    common = _dereq_('../common'),
    bean = _dereq_('bean'),
    format = _dereq_('./ui').format,
    support = flowplayer.support,
    UA = window.navigator.userAgent;
if (support.touch || isIeMobile) {

   flowplayer(function(player, root) {
      var android = support.android,
          isAndroid = android && !android.firefox,
          isSilk = /Silk/.test(UA),
          androidVer = android.version || 0;

      // custom load for android
      if (isAndroid && !isIeMobile) {
         if (!/Chrome/.test(UA) && androidVer < 4 || android.samsung && androidVer < 5) {
            var originalLoad = player.load;
            player.load = function() {
               var ret = originalLoad.apply(player, arguments);
               common.find('video.fp-engine', root)[0].load();
               player.trigger('ready', [player, player.video]);
               return ret;
            };
         }
         var timer, currentTime = 0;
         var resumeTimer = function(api) {
           timer = setInterval(function() {
             api.video.time = ++currentTime;
             api.trigger('progress', [api, currentTime]);
           }, 1000);
         };
         player.on('ready pause unload', function() {
           if (timer) {
             clearInterval(timer);
             timer = null;
           }
         });
         player.on('ready', function() {
           currentTime = 0;
         });
         player.on('resume', function(ev, api) {
           if (!api.live) return;
           if (currentTime) { return resumeTimer(api); }
           player.one('progress', function(ev, api, t) {
             if (t === 0) { // https://github.com/flowplayer/flowplayer/issues/727
               resumeTimer(api);
             }
           });
         });
      }

      // hide volume
      if (!support.volume) {
        common.removeClass(root, 'fp-mute');
        common.addClass(root, 'no-volume');
      }
      if (support.iOS) {
         common.addClass(root, 'fp-mute');
      }
      common.addClass(root, 'is-touch');
      if (player.sliders && player.sliders.timeline) player.sliders.timeline.disableAnimation();

      // fake mouseover effect with click
      var hasMoved = false;
      bean.on(root, 'touchmove', function() {
        hasMoved = true;
      });
      bean.on(root, 'touchend click', function(e) {
        if (hasMoved) { //not intentional, most likely scrolling
          hasMoved = false;
          return;
        }

        var video = common.find('video.fp-engine', root)[0];
        if (video && video.muted && player.conf.autoplay) video.muted = false;

        if (player.playing && !common.hasClass(root, 'is-mouseover')) {
          common.addClass(root, 'is-mouseover');
          common.removeClass(root, 'is-mouseout');
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (!player.playing && !player.splash && common.hasClass(root, 'is-mouseout') && !common.hasClass(root, 'is-mouseover')) {
          setTimeout(function() {
            if (!player.disabled && !player.playing && !player.splash) {
              common.find('video.fp-engine', root)[0].play();
            }
          }, 400);
        }


      });

      // native fullscreen
      if (!support.fullscreen && player.conf.native_fullscreen && typeof common.createElement('video').webkitEnterFullScreen === 'function') {
         var oldFullscreen = player.fullscreen;
         player.fullscreen = function() {
            var video = common.find('video.fp-engine', root)[0];
            if (!video) return oldFullscreen.apply(player);
            player.trigger('fullscreen', [player]);
            bean.on(document, 'webkitfullscreenchange.nativefullscreen', function() {
              if (document.webkitFullscreenElement !== video) return;
              bean.off(document, '.nativefullscreen');
              bean.on(document, 'webkitfullscreenchange.nativefullscreen', function() {
                if (document.webkitFullscreenElement) return;
                bean.off(document, '.nativefullscreen');
                player.trigger('fullscreen-exit', [player]);
              });
            });
            video.webkitEnterFullScreen();
            bean.one(video, 'webkitendfullscreen', function() {
              bean.off(document, 'fullscreenchange.nativefullscreen');
              player.trigger('fullscreen-exit', [player]);
              common.prop(video, 'controls', true);
              common.prop(video, 'controls', false);
            });
         };
      }


      // Android browser gives video.duration == 1 until second 'timeupdate' event
      if (isAndroid || isSilk) player.bind("ready", function() {
         var video = common.find('video.fp-engine', root)[0];
         if (player.conf.splash && video.paused) {
            bean.one(video, 'canplay', function() {
               video.play();
            });
            video.load();
         }

         player.bind("progress.dur", function() {
            if (player.live || player.conf.live) return;
            var duration = video.duration;

            if (duration !== 1) {
               player.video.duration = duration;
               common.find(".fp-duration", root)[0].innerHTML = format(duration);
               player.unbind("progress.dur");
            }
         });
      });


   });

}


},{"../common":1,"../flowplayer":31,"./ui":27,"bean":34}],19:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    extend = _dereq_('extend-object'),
    bean = _dereq_('bean'),
    common = _dereq_('../common'),
    Resolve = _dereq_('./resolve'),
    resolver = new Resolve(),
    $ = window.jQuery,
    externalRe = /^#/;
flowplayer(function(player, root) {

   var conf = extend({ active: 'is-active', advance: true, query: ".fp-playlist a" }, player.conf)
     , klass = conf.active
     , ui = common.find('.fp-ui', root)[0];

   var hasCustomPlaylist = common.hasClass(root, 'fp-custom-playlist') || !!conf.customPlaylist;
   common.toggleClass(root, 'fp-custom-playlist', hasCustomPlaylist);
   common.toggleClass(root, 'fp-default-playlist', !hasCustomPlaylist);

   // getters
   function els() {
     return common.find(conf.query, queryRoot());
   }

   function queryRoot() {
     if (externalRe.test(conf.query)) return;
     return root;
   }

   function active() {
      return common.find(conf.query + "." + klass, queryRoot());
   }


   player.play = function(i) {
      if (i === undefined) return player.resume();
      if (typeof i === 'number' && !player.conf.playlist[i]) return player;
      else if (typeof i != 'number') return player.load.apply(null, arguments);
      var arg = extend({index: i}, player.conf.playlist[i]);
      player.off('beforeresume.fromfirst'); // Don't start from beginning if clip explicitely chosen
      if (typeof i === 'number' && i === player.video.index) return player.seek(0, function() { player.resume(); });
      player.load(arg, function() {
        player.video.index = i;
      });
      return player;
   };

   player.next = function(e) {
      if (e) e.preventDefault();
      var current = player.video.index;
      if (current != -1) {
         current = current === player.conf.playlist.length - 1 ? 0 : current + 1;
         player.play(current);
      }
      return player;
   };

   player.prev = function(e) {
      if (e) e.preventDefault();
      var current = player.video.index;
      if (current != -1) {
         current = current === 0 ? player.conf.playlist.length - 1 : current - 1;
         player.play(current);
      }
      return player;
   };

   player.setPlaylist = function(items, keepCurrentIndex) {
     player.conf.playlist = items;
     if (!keepCurrentIndex) delete player.video.index;
     generatePlaylist();
     return player;
   };

   player.addPlaylistItem = function(item) {
     delete player.video.is_last;
     return player.setPlaylist(player.conf.playlist.concat([item]), true);
   };

   player.removePlaylistItem = function(idx) {
     var pl = player.conf.playlist;
     return player.setPlaylist(pl.slice(0, idx).concat(pl.slice(idx+1)));
   };

   bean.on(root, 'click', '.fp-next', player.next);
   bean.on(root, 'click', '.fp-prev', player.prev);

   player.off("finish.pl").on("finish.pl", function(e, player) {
      var advance = typeof player.conf.advance === 'undefined' ? true : player.conf.advance;
      if (!advance) return;
      // clip looping
      if (player.video.loop) return player.seek(0, function() { player.resume(); });
      // next clip is found or loop
      var next = player.video.index >= 0 ? player.video.index + 1 : undefined;
      if (next < player.conf.playlist.length || conf.loop) {
         next = next === player.conf.playlist.length ? 0 : next;
         common.removeClass(root, 'is-finished');
         setTimeout(function() { // Let other finish callbacks fire first
            player.play(next);
         });

      // stop to last clip, play button starts from 1:st clip
      } else {

         // If we have multiple items in playlist, start from first
         if (player.conf.playlist.length > 1) {
           player.one("beforeresume.fromfirst", function(ev) {
             ev.preventDefault();
             player.play(0);
           });
           player.one('seek', function() { player.off('beforeresume.fromfirst'); });
         }
      }
   });

   function generatePlaylist() {
      var plEl = common.find('.fp-playlist', root)[0]
      if (!plEl) {
         plEl = common.createElement('div', {className: 'fp-playlist'});
         var cntrls = common.find('.fp-next,.fp-prev', root);
         if (!cntrls.length) common.insertAfter(root, common.find('video', root)[0], plEl);
         else cntrls[0].parentElement.insertBefore(plEl, cntrls[0]);
      }
      plEl.innerHTML = '';
      if (player.conf.playlist[0].length) { // FP5 style playlist
        player.conf.playlist = player.conf.playlist.map(function(itm) {
          if (typeof itm === 'string') {
            var type = itm.split(Resolve.TYPE_RE)[1];
            return {
              sources: [{
                type: type.toLowerCase() === 'm3u8' ? 'application/x-mpegurl' : 'video/' + type,
                src: itm
              }]
            };
          }
          return {
            sources: itm.map(function(src) {
              var s = {};
              Object.keys(src).forEach(function(k) {
                s.type = /mpegurl/i.test(k) ? 'application/x-mpegurl' : 'video/' + k;
                s.src = src[k];
              });
              return s;
            })
          };
        });
      }
      player.conf.playlist.forEach(function(item, i) {
         var href = item.sources[0].src;
         plEl.appendChild(common.createElement('a', {
            href: href,
            className: player.video.index === i ? klass : undefined,
            'data-index': i
         }));
      });
   }

   var playlistInitialized = false;
   if (player.conf.playlist.length) { // playlist configured by javascript, generate playlist
      playlistInitialized = true;
      generatePlaylist();
      if (!player.conf.clip || !player.conf.clip.sources.length) {
        player.conf.clip = player.conf.playlist[player.conf.startIndex || 0];
      }
   }

   if (els().length && !playlistInitialized) { //generate playlist from existing elements
       player.conf.playlist = [];
       delete player.conf.startIndex;
       els().forEach(function(el) {
          var src = el.href;
          el.setAttribute('data-index', player.conf.playlist.length);
          var itm = resolver.resolve(src, player.conf.clip.sources);
          if ($) {
            extend(itm, $(el).data());
          }
          player.conf.playlist.push(itm);
       });
    }

    common.find('.fp-prev,.fp-next,.fp-playlist', root).forEach(function(el) {
      ui.appendChild(el);
    });

    /* click -> play */
    bean.on(externalRe.test(conf.query) ? document : root, "click", conf.query, function(e) {
       e.preventDefault();
       var el = e.currentTarget;
       var toPlay = Number(el.getAttribute('data-index'));
       if (toPlay != -1) {
          player.play(toPlay);
       }
    });

    // highlight
    function videoIndex(video) {
      if (typeof video.index !== 'undefined') return video.index;
      if (typeof player.video.index !== 'undefined') return player.video.index;
      return player.conf.startIndex || 0;
    }
    player.on("load", function(e, api, video) {
       if (!player.conf.playlist.length) return;
       var prev = active()[0],
          prevIndex = prev && prev.getAttribute('data-index'),
          index = video.index = videoIndex(video),
          el = common.find(conf.query +'[data-index="' + index + '"]', queryRoot())[0],
          is_last = index == player.conf.playlist.length - 1;
       if (prev) common.removeClass(prev, klass);
       if (el) common.addClass(el, klass);
       // index
       common.removeClass(root, 'video' + prevIndex);
       common.addClass(root, 'video' + index);
       common.toggleClass(root, "last-video", is_last);

       // video properties
       video.index = api.video.index = index;
       video.is_last = api.video.is_last = is_last;

    // without namespace callback called only once. unknown rason.
    }).on("unload.pl", function() {
       if (!player.conf.playlist.length) return;
       active().forEach(function(el) {
         common.toggleClass(el, klass);
       });
       player.conf.playlist.forEach(function(itm, i) {
         common.removeClass(root, 'video' + i);
       });
    });

   if (player.conf.playlist.length) {
      // disable single clip looping
      player.conf.loop = false;
   }


});

},{"../common":1,"../flowplayer":31,"./resolve":21,"bean":34,"extend-object":39}],20:[function(_dereq_,module,exports){
var flowplayer = _dereq_('../flowplayer')
  , common = _dereq_('../common')
  , bean = _dereq_('bean');

flowplayer(function(api, root) {
  var ui = common.find('.fp-ui', root)[0]
    , controlbar = common.find('.fp-controls', ui)[0];

  bean.on(root, 'click', '.fp-qsel', function() {
    var menu = common.find('.fp-qsel-menu', root)[0];
    if (common.hasClass(menu, 'fp-active')) api.hideMenu();
    else api.showMenu(menu);
  });

  bean.on(root, 'click', '.fp-qsel-menu a', function(ev) {
    var q = ev.target.getAttribute('data-quality');
    api.quality(q);
  });

  api.quality = function(q) {
    q = isNaN(Number(q)) ? q : Number(q);
    api.trigger('quality', [api, q]);
  };

  api.on('quality', function(_ev, _api, q) {
    selectQuality(q, _api.video.qualities);
  });

  api.on('ready', function(_ev, _api, video) {
    removeMenu();
    if (!video.qualities || video.qualities.filter(function(q) {
      return typeof q.value !== 'undefined' ? q.value > -1 : true;
    }).length < 2) return;
    createMenu(video.qualities, video.quality);
    selectQuality(video.quality, video.qualities);
  });

  function removeMenu() {
    common.find('.fp-qsel-menu', root).forEach(common.removeNode);
    common.find('.fp-qsel', root).forEach(common.removeNode);
  }

  function createMenu(qualities) {
    controlbar.appendChild(common.createElement('strong', { className: 'fp-qsel' }, 'HD'));
    var menu = common.createElement('div', { className: 'fp-menu fp-qsel-menu' }, '<strong>Quality</strong>');
    qualities.forEach(function(q) {
      var a = document.createElement('a')
        , quality = typeof q.value !== 'undefined' ? q.value : q;
      a.setAttribute('data-quality', quality);
      a.innerHTML = q.label || q;
      menu.appendChild(a);
    });
    ui.appendChild(menu);
  }

  function selectQuality(quality) {
    common.find('.fp-qsel-menu a', root).forEach(function(el) {
      common.toggleClass(el, 'fp-selected', el.getAttribute('data-quality') == quality);
      common.toggleClass(el, 'fp-color', el.getAttribute('data-quality') == quality);
    });
  }

});

},{"../common":1,"../flowplayer":31,"bean":34}],21:[function(_dereq_,module,exports){
'use strict';
var TYPE_RE = /\.(\w{3,4})(\?.*)?$/i,
    extend = _dereq_('extend-object');

function parseSource(el) {

   var src = el.attr("src"),
      type = el.attr("type") || "",
      suffix = src.split(TYPE_RE)[1];
   type = type.toLowerCase();
   return extend(el.data(), { src: src, suffix: suffix || type, type: type || suffix });
}

function getType(typ) {
  if (/mpegurl/i.test(typ)) return 'application/x-mpegurl';
  return 'video/' + typ;
}

/* Resolves video object from initial configuration and from load() method */
module.exports = function URLResolver() {
  var self = this;

  self.sourcesFromVideoTag = function(videoTag, $) {
    var sources = [];
    // initial sources
    $("source", videoTag).each(function() {
      sources.push(parseSource($(this)));
    });

    if (!sources.length && videoTag.length) sources.push(parseSource(videoTag));

    return sources;
  };


  self.resolve = function(video, sources) {
    if (!video) return { sources: sources };

    if (typeof video == 'string') {
      video = { src: video, sources: [] };
      video.sources = (sources || []).map(function(source) {
        var suffix = source.src.split(TYPE_RE)[1];
        return {type: source.type, src: video.src.replace(TYPE_RE, '.' + suffix + "$2")};
      });
    }

    if (video instanceof Array) {
      video = {
        sources: video.map(function(src) {
          if (src.type && src.src) return src;
          return Object.keys(src).reduce(function(m, typ) {
            return extend(m, {
              type: getType(typ),
              src: src[typ]
            });
          }, {});
        })
      };
    }

    return video;
  };
};

module.exports.TYPE_RE = TYPE_RE;

},{"extend-object":39}],22:[function(_dereq_,module,exports){
'use strict';

var flowplayer = _dereq_('../flowplayer')
  , common = _dereq_('../common')
  , extend = _dereq_('extend-object')
  , bean = _dereq_('bean');

flowplayer(function(api, root) {
  var c = api.conf;
  if (c.share === false) {
    common.find('.fp-share', root).forEach(common.removeNode);
    return;
  }

  api.shareUrl = function(directEmbed) {
    if (directEmbed && c.embed && c.embed.iframe) return c.embed.iframe;
    if (typeof api.conf.share === 'string') return api.conf.share;
    var title = encodeURIComponent(api.video.title || (common.find('title')[0] || {}).innerHTML || 'Flowplayer video')
      , conf = encodeURIComponent(btoa(JSON.stringify(extend({}, api.conf, api.extensions)).replace(/[\u007F-\uFFFF]/g, function(chr) {
    return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
})))
      , redirect = encodeURIComponent(window.location.toString())
      , baseUrl = directEmbed ? 'https://flowplayer.com/e/' : 'https://flowplayer.com/s/';
    return baseUrl + '?t=' + title + '&c=' + conf + '&r=' + redirect;
  };

  var menu = common.createElement('div', { className: 'fp-menu fp-share-menu' }, '<strong>Share</strong>')
    , ui = common.find('.fp-ui', root)[0];
    ui.appendChild(menu);

  var button = common.find('.fp-share', root)[0];

  bean.on(root, 'click', '.fp-share', function(ev) {
    ev.preventDefault();
    if (common.hasClass(menu, 'fp-active')) api.hideMenu();
    else api.showMenu(menu,button);
  });
});

},{"../common":1,"../flowplayer":31,"bean":34,"extend-object":39}],23:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    common = _dereq_('../common'),
    bean = _dereq_('bean')
  , parser = _dereq_('./subtitles/parser');

flowplayer.defaults.subtitleParser = parser;

flowplayer(function(p, root) {
  var currentPoint, wrap,
      subtitleControl, subtitleMenu;

  if (
    !flowplayer.support.inlineVideo ||
      (!flowplayer.support.fullscreen  && p.conf.native_fullscreen)) p.conf.nativesubtitles = true;

  var createSubtitleControl = function() {
    subtitleControl = subtitleControl || common.createElement('strong', { className: 'fp-cc' }, 'CC');
    subtitleMenu = subtitleMenu || common.createElement('div', {className: 'fp-menu fp-subtitle-menu'}, '<strong>Closed Captions</strong>');
    common.find('a', subtitleMenu).forEach(common.removeNode);
    subtitleMenu.appendChild(common.createElement('a', {'data-subtitle-index': -1}, 'No subtitles'));
    (p.video.subtitles || []).forEach(function(st, i) {
      var srcLang = st.srclang || 'en',
          label = st.label || 'Default (' + srcLang + ')';
      var item = common.createElement('a', {'data-subtitle-index': i}, label);
      subtitleMenu.appendChild(item);
    });
    common.find('.fp-ui', root)[0].appendChild(subtitleMenu);
    common.find('.fp-controls', root)[0].appendChild(subtitleControl);
    return subtitleControl;
  };

  bean.on(root, 'click', '.fp-cc', function() {
    if (common.hasClass(subtitleMenu, 'fp-active')) p.hideMenu();
    else p.showMenu(subtitleMenu);
  });

  bean.on(root, 'click', '.fp-subtitle-menu [data-subtitle-index]', function(ev) {
    ev.preventDefault();
    var idx = ev.target.getAttribute('data-subtitle-index');
    if (idx === '-1') return p.disableSubtitles();
    p.loadSubtitles(idx);
  });

  var createUIElements = function() {
    wrap = common.find('.fp-captions', root)[0];
    wrap = wrap || common.appendTo(common.createElement('div', {'class': 'fp-captions'}), common.find('.fp-player', root)[0]);
    Array.prototype.forEach.call(wrap.children, common.removeNode);
    createSubtitleControl();
  };


  p.on('ready',  function(ev, player, video) {
    player.subtitles = [];

    createUIElements();

    common.removeClass(root, 'has-menu');

    p.disableSubtitles();

    common.toggleClass(subtitleControl, 'fp-hidden', !video.subtitles || !video.subtitles.length);
    if (!video.subtitles || !video.subtitles.length) return;

    var defaultSubtitle = video.subtitles.filter(function(one) {
      return one['default'];
    })[0];
    if (defaultSubtitle) player.loadSubtitles(video.subtitles.indexOf(defaultSubtitle));
  });

  p.bind("cuepoint", function(e, api, cue) {
    if (cue.subtitle) {
       currentPoint = cue.index;
       common.html(wrap, cue.subtitle.text);
       common.addClass(wrap, 'fp-shown');
    } else if (cue.subtitleEnd) {
       common.removeClass(wrap, 'fp-shown');
       currentPoint = cue.index;
    }
  });

  p.bind("seek", function(e, api, time) {
    // Clear future subtitles if seeking backwards
    if (currentPoint && p.cuepoints[currentPoint] && p.cuepoints[currentPoint].time > time) {
       common.removeClass(wrap, 'fp-shown');
       currentPoint = null;
    }
    (p.cuepoints || []).forEach(function(cue, index) {
      var entry = cue.subtitle;
      //Trigger cuepoint if start time before seek position and end time nonexistent or in the future
      if (entry && currentPoint != index) {
        if (time >= cue.time && (!entry.endTime || time <= entry.endTime)) p.trigger("cuepoint", [p, cue]);
      } // Also handle cuepoints that act as the removal trigger
      else if (cue.subtitleEnd && time >= cue.time && index == currentPoint + 1) {
        p.trigger("cuepoint", [p, cue]);
      }
    });

  });

  p.on('unload', function () {
    common.find('.fp-captions', root).forEach(common.removeNode);
  });

  var setActiveSubtitleClass = function(idx) {
    common.toggleClass(common.find('a.fp-selected', subtitleMenu)[0], 'fp-selected');
    common.toggleClass(common.find('a[data-subtitle-index="' + idx + '"]', subtitleMenu)[0], 'fp-selected');
  };

  var setNativeMode = function(i, mode) {
    var tracks = common.find('video.fp-engine', root)[0].textTracks;
    if (!tracks.length) return;
    if (i === null) {
      [].forEach.call(tracks, function(track) { track.mode = mode; });
    }
    else tracks[i].mode = mode;
  };

  p.disableSubtitles = function() {
    p.subtitles = [];
    (p.cuepoints || []).forEach(function(c) {
      if (c.subtitle || c.subtitleEnd) p.removeCuepoint(c);
    });
    if (wrap) Array.prototype.forEach.call(wrap.children, common.removeNode);
    setActiveSubtitleClass(-1);
    if (flowplayer.support.subtitles && p.conf.nativesubtitles && p.engine.engineName == 'html5') {
      setNativeMode(null, 'disabled');
    }
    return p;
  };

  p.loadSubtitles = function(i) {
    //First remove possible old subtitles
    p.disableSubtitles();

    var st = p.video.subtitles[i];

    var url = st.src;
    if (!url) return;
    setActiveSubtitleClass(i);

    if (flowplayer.support.subtitles && p.conf.nativesubtitles && p.engine.engineName == 'html5') {
      setNativeMode(i, 'showing');
      return;
    }
    common.xhrGet(url, function(txt) {
      var entries = p.conf.subtitleParser(txt);
      entries.forEach(function(entry) {
        var cue = { time: entry.startTime, subtitle: entry, visible: false };
        p.subtitles.push(entry);
        p.addCuepoint(cue);
        p.addCuepoint({ time: entry.endTime, subtitleEnd: entry.title, visible: false });

        // initial cuepoint
        if (entry.startTime === 0 && !p.video.time && !p.splash) {
          p.trigger("cuepoint", [p, flowplayer.extend({}, cue, { index: 0 })]);
        }
        if (p.splash) p.one('ready', function() { p.trigger('cuepoint', [p, cue]); });
      });
    }, function() {
      p.trigger("error", {code: 8, url: url });
      return false;
    });
    return p;
  };
});


},{"../common":1,"../flowplayer":31,"./subtitles/parser":24,"bean":34}],24:[function(_dereq_,module,exports){
module.exports = function(txt) {
  var TIMECODE_RE = /^(([0-9]+:){1,2}[0-9]{2}[,.][0-9]{3}) --\> (([0-9]+:){1,2}[0-9]{2}[,.][0-9]{3})(.*)/;

  function seconds(timecode) {
     var els = timecode.split(':');
     if (els.length == 2) els.unshift(0);
     return els[0] * 60 * 60 + els[1] * 60 + parseFloat(els[2].replace(',','.'));
  }

  var entries = [];
  for (var i = 0, lines = txt.split("\n"), len = lines.length, entry = {}, title, timecode, text; i < len; i++) {
    timecode = TIMECODE_RE.exec(lines[i]);

    if (timecode) {

      // title
      title = lines[i - 1];

      // text
      text = "<p>" + lines[++i] + "</p><br/>";
      while (typeof lines[++i] === 'string' && lines[i].trim() && i < lines.length) text +=  "<p>" + lines[i] + "</p><br/>";

      // entry
      entry = {
        title: title,
        startTime: seconds(timecode[1]),
        endTime: seconds(timecode[3]),
        text: text
      };
      entries.push(entry);
    }
  }
  return entries;
};

},{}],25:[function(_dereq_,module,exports){
'use strict';
/* global ActiveXObject */
var flowplayer = _dereq_('../flowplayer'),
    extend = _dereq_('extend-object');
(function() {

   var parseIOSVersion = function(UA) {
      var e = /iP(ad|hone)(; CPU)? OS (\d+_\d)/.exec(UA);
      if (e && e.length > 1) {
         return parseFloat(e[e.length - 1].replace('_', '.'), 10);
      }
      return 0;
   };

   var createVideoTag = function() {
     var videoTag = document.createElement('video');
     videoTag.loop = true;
     videoTag.autoplay = true;
     videoTag.preload = true;
     return videoTag;
   };

    var b = {},
      d = document.documentElement.style,
      ua = navigator.userAgent.toLowerCase(),
      match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
      /(safari)[ \/]([\w.]+)/.exec(ua) ||
      /(webkit)[ \/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

   if (match[1]) {
      b[match[1]] = true;
      b.version = match[2] || "0";
   }
   if (b.safari) b.version = (/version\/([\w.]+)/.exec(ua) || [])[1];


   var video = createVideoTag(),
      UA = navigator.userAgent,
      IS_IE = b.msie || /Trident\/7/.test(UA),
      IS_IPAD = /iPad|MeeGo/.test(UA) && !/CriOS/.test(UA),
      IS_IPAD_CHROME = /iPad/.test(UA) && /CriOS/.test(UA),
      IS_IPHONE = /iP(hone|od)/i.test(UA) && !/iPad/.test(UA) && !/IEMobile/i.test(UA),
      IS_ANDROID = /Android/.test(UA),
      IS_ANDROID_FIREFOX = IS_ANDROID && /Firefox/.test(UA),
      IS_ANDROID_SAMSUNG = IS_ANDROID && /SAMSUNG/.test(UA),
      IS_SILK = /Silk/.test(UA),
      IS_WP = /IEMobile/.test(UA),
      WP_VER = IS_WP ? parseFloat(/Windows\ Phone\ (\d+\.\d+)/.exec(UA)[1], 10) : 0,
      IE_MOBILE_VER = IS_WP ? parseFloat(/IEMobile\/(\d+\.\d+)/.exec(UA)[1], 10) : 0,
      IOS_VER = IS_IPAD || IS_IPHONE ? parseIOSVersion(UA) : 0,
      ANDROID_VER = IS_ANDROID ? parseFloat(/Android\ (\d\.\d)/.exec(UA)[1], 10) : 0;

   var ios = (IS_IPHONE || IS_IPAD || IS_IPAD_CHROME) && {
     iPhone: IS_IPHONE,
     iPad: IS_IPAD || IS_IPAD_CHROME,
     version: IOS_VER,
     chrome: IS_IPAD_CHROME
   };
   var s = extend(flowplayer.support, {
        browser: b,
        iOS: ios,
        android: IS_ANDROID ? {
          firefox: IS_ANDROID_FIREFOX,
          opera: /Opera/.test(UA),
          samsung: IS_ANDROID_SAMSUNG,
          version: ANDROID_VER
        } : false,
        subtitles: !!video.addTextTrack,
        fullscreen: typeof document.webkitFullscreenEnabled === 'boolean' ? document.webkitFullscreenEnabled : (typeof document.webkitCancelFullScreen == 'function' && !/Mac OS X 10_5.+Version\/5\.0\.\d Safari/.test(UA)) ||
              document.mozFullScreenEnabled ||
              typeof document.exitFullscreen == 'function' ||
              typeof document.msExitFullscreen == 'function',
        inlineBlock: !(IS_IE && b.version < 8),
        touch: ('ontouchstart' in window),
        dataload: !IS_IPAD && !IS_IPHONE && !IS_WP,
        flex: ('flexWrap' in d) || ('WebkitFlexWrap' in d) || ('msFlexWrap' in d),
        svg: !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect,
        zeropreload: !IS_IE && !IS_ANDROID, // IE supports only preload=metadata
        volume: !IS_IPAD && !IS_IPHONE && !IS_SILK && !IS_IPAD_CHROME,
        cachedVideoTag: !IS_IPAD && !IS_IPHONE && !IS_IPAD_CHROME && !IS_WP,
        // iOS < 10 and Samsung support firstframe but not mutedAutoplay
        // pretend lacking firstframe support because so far we treat
        // support.autoplay as synonym of support.firstframe
        firstframe: !IS_SILK && !IS_WP && !IS_ANDROID_FIREFOX && !IS_ANDROID_SAMSUNG && !(IOS_VER && IOS_VER < 10) && !(IS_ANDROID && ANDROID_VER < 4.4),
        mutedAutoplay: (IS_IPHONE || IS_IPAD || IS_IPAD_CHROME) && IOS_VER >=10 || IS_ANDROID && ANDROID_VER > 4.3 && !IS_ANDROID_SAMSUNG,
        inlineVideo: (!IS_IPHONE || IOS_VER >= 10) && (!IS_WP || (WP_VER >= 8.1 && IE_MOBILE_VER >= 11)) && (!IS_ANDROID || ANDROID_VER >= 3),
        hlsDuration: !IS_ANDROID && (!b.safari || IS_IPAD || IS_IPHONE || IS_IPAD_CHROME),
        seekable: !IS_IPAD && !IS_IPAD_CHROME,
        preloadMetadata: !ios && (!b.safari || parseFloat(b.version) > 9.1)
   });
   s.autoplay = s.firstframe;
   if (IS_WP) {
      s.browser.safari = false;
   }
   // flashVideo
   try {
      var plugin = navigator.plugins["Shockwave Flash"],
          ver = IS_IE ? new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable('$version') : plugin.description;
      if (!IS_IE && !plugin[0].enabledPlugin) s.flashVideo = false;
      else {

         ver = ver.split(/\D+/);
         if (ver.length && !ver[0]) ver = ver.slice(1);

         s.flashVideo = ver[0] > 9 || ver[0] == 9 && ver[3] >= 115;
      }

   } catch (ignored) {}
   try {
      s.video = !!video.canPlayType;
      if (s.video) video.canPlayType('video/mp4');
   } catch (e) {
      s.video = false;
   }

   // animation
   s.animation = (function() {
      var vendors = ['','Webkit','Moz','O','ms','Khtml'], el = document.createElement('p');

      for (var i = 0; i < vendors.length; i++) {
         if (typeof el.style[vendors[i] + 'AnimationName'] !== 'undefined') return true;
      }
   })();



})();


},{"../flowplayer":31,"extend-object":39}],26:[function(_dereq_,module,exports){
'use strict';

var flowplayer = _dereq_('../flowplayer')
  , common = _dereq_('../common')
  , bean = _dereq_('bean');

flowplayer(function(api, root) {
  var c = api.conf;

  if (c.share === false || c.twitter === false) return;


  // https://dev.twitter.com/web/intents
  api.tweet = function() {
    var left
      , top
      , width = 550
      , height = 420
      , winHeight = screen.height
      , winWidth = screen.width
      , windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes'
      , shareUrl = typeof c.twitter === 'string' ? c.twitter : api.shareUrl();
    left = Math.round((winWidth / 2) - (width / 2));
    top = 0;
    if (winHeight > height) {
      top = Math.round((winHeight / 2) - (height / 2));
    }
    window.open(
      'https://twitter.com/intent/tweet?url=' + encodeURIComponent(shareUrl),
      'intent',
      windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top
    );
  };

  var btnContainer = common.find('.fp-share-menu', root)[0]
    , trigger = common.createElement('a', { "class": "fp-icon fp-twitter"}, 'Twitter');

  common.append(btnContainer, trigger);

  bean.on(root, 'click', '.fp-twitter', function() {
    api.tweet();
  });
});

},{"../common":1,"../flowplayer":31,"bean":34}],27:[function(_dereq_,module,exports){
(function (Buffer){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    common = _dereq_('../common'),
    bean = _dereq_('bean'),
    slider = _dereq_('./ui/slider'),
    barSlider = _dereq_('./ui/bar-slider');

function zeropad(val) {
   val = parseInt(val, 10);
   return val >= 10 ? val : "0" + val;
}

// display seconds in hh:mm:ss format
function format(sec, remaining) {

   sec = Math.max(sec || 0, 0);
   sec = remaining ? Math.ceil(sec) : Math.floor(sec);

   var h = Math.floor(sec / 3600),
       min = Math.floor(sec / 60);

   sec = sec - (min * 60);

   if (h >= 1) {
      min -= h * 60;
      return h + ":" + zeropad(min) + ":" + zeropad(sec);
   }

   return zeropad(min) + ":" + zeropad(sec);
}

var PLAY_ROUNDED_OUTLINE = Buffer("PHN2ZyBjbGFzcz0iZnAtcGxheS1yb3VuZGVkLW91dGxpbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk5Ljg0NCA5OS44NDM0Ij48ZGVmcz48c3R5bGU+LmZwLWNvbG9yLXBsYXl7b3BhY2l0eTowLjY1O30uY29udHJvbGJ1dHRvbntmaWxsOiNmZmY7fTwvc3R5bGU+CjwvZGVmcz4KPHRpdGxlPnBsYXktcm91bmRlZC1vdXRsaW5lPC90aXRsZT48cGF0aCBjbGFzcz0iZnAtY29sb3ItcGxheSIgZD0iTTQ5LjkyMTctLjA3OGE1MCw1MCwwLDEsMCw1MCw1MEE1MC4wNTY0LDUwLjA1NjQsMCwwLDAsNDkuOTIxNy0uMDc4WiIvPjxwYXRoIGNsYXNzPSJjb250cm9sYnV0dG9uIiBkPSJNNDEuMDM1OSw3MS4xOWE1LjA0OTIsNS4wNDkyLDAsMCwxLTIuNTU3NS0uNjY3M2MtMS44MDMxLTEuMDQxLTIuNzk1OC0zLjEyNDgtMi43OTU4LTUuODY2NFYzNS4xODg3YzAtMi43NDI5Ljk5MzMtNC44MjcyLDIuNzk3LTUuODY3NiwxLjgwMjUtMS4wNDIyLDQuMTAzNC0uODYsNi40OC41MTQzTDcwLjQ3ODIsNDQuNTY3MmMyLjM3NTEsMS4zNzExLDMuNjgyNiwzLjI3MjUsMy42ODMyLDUuMzU0NXMtMS4zMDc2LDMuOTg0NS0zLjY4MzIsNS4zNTYyTDQ0Ljk1OTIsNzAuMDExNEE3LjkzODQsNy45Mzg0LDAsMCwxLDQxLjAzNTksNzEuMTlabS4wMDY1LTQwLjEyM2EyLjY3OTQsMi42Nzk0LDAsMCwwLTEuMzU4Mi4zNDEzYy0xLjAyNjMuNTkyNi0xLjU5MTIsMS45MzQ5LTEuNTkxMiwzLjc4VjY0LjY1NjNjMCwxLjg0NDkuNTY0OSwzLjE4NjYsMS41OTA2LDMuNzc5MSwxLjAyODEuNTkzMiwyLjQ3MzMuNDEwOCw0LjA3LS41MTJMNjkuMjczLDUzLjE5MDZjMS41OTgzLS45MjI3LDIuNDc4LTIuMDgzOCwyLjQ3OC0zLjI2ODlzLS44OC0yLjM0NDUtMi40NzgtMy4yNjY2TDQzLjc1NCwzMS45MjI3QTUuNTY4NSw1LjU2ODUsMCwwLDAsNDEuMDQyMywzMS4wNjcxWiIgZmlsdGVyPSJ1cmwoI2YxKSIvPjwvc3ZnPgo=","base64")
  , PLAY_ROUNDED_FILL = Buffer("PHN2ZyBjbGFzcz0iZnAtcGxheS1yb3VuZGVkLWZpbGwiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiPgogIDxkZWZzPjxzdHlsZT4uYXtmaWxsOiMwMDA7b3BhY2l0eTowLjY1O30uYntmaWxsOiNmZmY7b3BhY2l0eToxLjA7fTwvc3R5bGU+CiAgPC9kZWZzPjx0aXRsZT5wbGF5LXJvdW5kZWQtZmlsbDwvdGl0bGU+CiAgPHBhdGggY2xhc3M9ImZwLWNvbG9yLXBsYXkiIGQ9Ik00OS45MjE3LS4wNzhhNTAsNTAsMCwxLDAsNTAsNTBBNTAuMDU2NCw1MC4wNTY0LDAsMCwwLDQ5LjkyMTctLjA3OFoiLz4KICA8cGF0aCBjbGFzcz0iYiIgZD0iTTM1Ljk0MiwzNS4yMzIzYzAtNC43Mjg5LDMuMzUwNi02LjY2MzcsNy40NDYtNC4yOTcxTDY4LjgzLDQ1LjYyMzVjNC4wOTU2LDIuMzY0LDQuMDk1Niw2LjIzMTksMCw4LjU5NzdMNDMuMzg4LDY4LjkxYy00LjA5NTQsMi4zNjQtNy40NDYuNDMtNy40NDYtNC4yOTc5WiIgZmlsdGVyPSJ1cmwoI2YxKSIvPgogIDwvc3ZnPgogIAo=","base64")
  , PLAY_SHARP_FILL = Buffer("PHN2ZyBjbGFzcz0iZnAtcGxheS1zaGFycC1maWxsIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4uZnAtY29sb3ItcGxheXtvcGFjaXR5OjAuNjU7fS5jb250cm9sYnV0dG9ue2ZpbGw6I2ZmZjt9PC9zdHlsZT4KICA8L2RlZnM+CiAgPHRpdGxlPnBsYXktc2hhcnAtZmlsbDwvdGl0bGU+CiAgPHBhdGggY2xhc3M9ImZwLWNvbG9yLXBsYXkiIGQ9Ik00OS45MjE3LS4wNzhhNTAsNTAsMCwxLDAsNTAsNTBBNTAuMDU2NCw1MC4wNTY0LDAsMCwwLDQ5LjkyMTctLjA3OFoiLz4KICA8cG9seWdvbiBjbGFzcz0iY29udHJvbGJ1dHRvbiIgcG9pbnRzPSI3My42MDEgNTAgMzcuOTY4IDcwLjU3MyAzNy45NjggMjkuNDI3IDczLjYwMSA1MCIgZmlsdGVyPSJ1cmwoI2YxKSIvPgo8L3N2Zz4K","base64")
  , PLAY_SHARP_OUTLINE = Buffer("PHN2ZyBjbGFzcz0iZnAtcGxheS1zaGFycC1vdXRsaW5lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5OS44NDQgOTkuODQzNCI+PGRlZnM+PHN0eWxlPi5jb250cm9sYnV0dG9uYmd7b3BhY2l0eTowLjY1O30uY29udHJvbGJ1dHRvbntmaWxsOiNmZmY7fTwvc3R5bGU+CjwvZGVmcz48dGl0bGU+cGxheS1zaGFycC1vdXRsaW5lPC90aXRsZT48cGF0aCBjbGFzcz0iZnAtY29sb3ItcGxheSIgZD0iTTQ5LjkyMTctLjA3OGE1MCw1MCwwLDEsMCw1MCw1MEE1MC4wNTY0LDUwLjA1NjQsMCwwLDAsNDkuOTIxNy0uMDc4WiIvPjxwYXRoIGNsYXNzPSJjb250cm9sYnV0dG9uIiBkPSJNMzYuOTQ0Myw3Mi4yNDczVjI3LjI5MTZMNzUuODc3Niw0OS43N1ptMi4yLTQxLjE0NTVWNjguNDM3MUw3MS40Nzc2LDQ5Ljc3WiIgZmlsdGVyPSJ1cmwoI2YxKSIvPjwvc3ZnPgo=","base64")
  , PAUSE_ROUNDED_OUTLINE = Buffer("PHN2ZyBjbGFzcz0iZnAtcGF1c2Utcm91bmRlZC1vdXRsaW5lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5OS44NDM0IDk5Ljg0MzQiPjxkZWZzPjxzdHlsZT4uZnAtY29sb3ItcGxheXtvcGFjaXR5OjAuNjU7fS5yZWN0e2ZpbGw6I2ZmZjt9PC9zdHlsZT4KPC9kZWZzPjx0aXRsZT5wYXVzZS1yb3VuZGVkLW91dGxpbmU8L3RpdGxlPjxwYXRoIGNsYXNzPSJmcC1jb2xvci1wbGF5IiBkPSJNNDkuOTIxMi0uMDc4M2E1MCw1MCwwLDEsMCw1MC4wMDA2LDUwQTUwLjA1NjIsNTAuMDU2MiwwLDAsMCw0OS45MjEyLS4wNzgzWiIvPjxnIGNsYXNzPSJjb250cm9sYnV0dG9uIj48cGF0aCBjbGFzcz0icmVjdCIgZD0iTTM5LjAwMzYsNzEuOTcyNmE3LjU2NSw3LjU2NSwwLDAsMS03LjU1Ny03LjU1NnYtMjguOTlhNy41NTY1LDcuNTU2NSwwLDAsMSwxNS4xMTMsMHYyOC45OUE3LjU2NDgsNy41NjQ4LDAsMCwxLDM5LjAwMzYsNzEuOTcyNlptMC00MS45MDRhNS4zNjQ3LDUuMzY0NywwLDAsMC01LjM1OTMsNS4zNTgydjI4Ljk5YTUuMzU4Nyw1LjM1ODcsMCwwLDAsMTAuNzE3NCwwdi0yOC45OUE1LjM2NDUsNS4zNjQ1LDAsMCwwLDM5LjAwMzYsMzAuMDY4NloiIGZpbHRlcj0idXJsKCNmMSkiLz48cGF0aCBjbGFzcz0icmVjdCIgZD0iTTYwLjg0LDcxLjk3MjZhNy41NjQ4LDcuNTY0OCwwLDAsMS03LjU1Ni03LjU1NnYtMjguOTlhNy41NTY1LDcuNTU2NSwwLDAsMSwxNS4xMTMsMHYyOC45OUE3LjU2NSw3LjU2NSwwLDAsMSw2MC44NCw3MS45NzI2Wm0wLTQxLjkwNGE1LjM2NDUsNS4zNjQ1LDAsMCwwLTUuMzU4Miw1LjM1ODJ2MjguOTlhNS4zNTg3LDUuMzU4NywwLDAsMCwxMC43MTc0LDB2LTI4Ljk5QTUuMzY0Nyw1LjM2NDcsMCwwLDAsNjAuODQsMzAuMDY4NloiIGZpbHRlcj0idXJsKCNmMSkiLz48L2c+PC9zdmc+Cg==","base64")
  , PAUSE_ROUNDED_FILL = Buffer("PHN2ZyBjbGFzcz0iZnAtcGF1c2Utcm91bmRlZC1maWxsIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48c3R5bGU+LmZwLWNvbG9yLXBsYXl7b3BhY2l0eTowLjY1O30ucmVjdHtmaWxsOiNmZmY7fTwvc3R5bGU+CjwvZGVmcz48dGl0bGU+cGF1c2Utcm91bmRlZC1maWxsPC90aXRsZT48cGF0aCBjbGFzcz0iZnAtY29sb3ItcGxheSIgZD0iTTQ5LjkyMTctLjA3OGE1MCw1MCwwLDEsMCw1MCw1MEE1MC4wNTY0LDUwLjA1NjQsMCwwLDAsNDkuOTIxNy0uMDc4WiIvPjxnIGNsYXNzPSJjb250cm9sYnV0dG9uIiBmaWx0ZXI9InVybCgjZjEpIj48cmVjdCBjbGFzcz0icmVjdCIgeD0iMzEuODQ0IiB5PSIyOC4xMjMxIiB3aWR0aD0iMTMuNDM2MiIgaGVpZ2h0PSI0My41OTczIiByeD0iNi43MTgxIiByeT0iNi43MTgxIi8+PHJlY3QgY2xhc3M9InJlY3QiIHg9IjU0LjU2MzgiIHk9IjI4LjEyMzEiIHdpZHRoPSIxMy40MzYyIiBoZWlnaHQ9IjQzLjU5NzMiIHJ4PSI2LjcxODEiIHJ5PSI2LjcxODEiLz48L2c+PC9zdmc+Cg==","base64")
  , PAUSE_SHARP_FILL = Buffer("PHN2ZyBjbGFzcz0iZnAtcGF1c2Utc2hhcnAtZmlsbCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGRlZnM+PHN0eWxlPi5mcC1jb2xvci1wbGF5e29wYWNpdHk6MC42NTt9LnJlY3R7ZmlsbDojZmZmO308L3N0eWxlPgo8L2RlZnM+PHRpdGxlPnBhdXNlLXNoYXJwLWZpbGw8L3RpdGxlPjxwYXRoIGNsYXNzPSJmcC1jb2xvci1wbGF5IiBkPSJNNDkuOTIxNy0uMDc4YTUwLDUwLDAsMSwwLDUwLDUwQTUwLjA1NjQsNTAuMDU2NCwwLDAsMCw0OS45MjE3LS4wNzhaIi8+PGcgY2xhc3M9ImNvbnRyb2xidXR0b24iIGZpbHRlcj0idXJsKCNmMSkiPjxyZWN0IGNsYXNzPSJyZWN0IiB4PSIzMy41IiB5PSIzMC4xMDQyIiB3aWR0aD0iMTIuMjYzNCIgaGVpZ2h0PSIzOS43OTE3Ii8+PHJlY3QgY2xhc3M9InJlY3QiIHg9IjU0LjIzNjYiIHk9IjMwLjEwNDIiIHdpZHRoPSIxMi4yNjM0IiBoZWlnaHQ9IjM5Ljc5MTciLz48L2c+PC9zdmc+Cg==","base64")
  , PAUSE_SHARP_OUTLINE = Buffer("PHN2ZyBjbGFzcz0iZnAtcGF1c2Utc2hhcnAtb3V0bGluZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgOTkuODQzNCA5OS44NDM0Ij48ZGVmcz48c3R5bGU+LmZwLWNvbG9yLXBsYXl7b3BhY2l0eTowLjY1O30ucmVjdHtmaWxsOiNmZmY7fTwvc3R5bGU+CjwvZGVmcz48dGl0bGU+cGF1c2Utc2hhcnAtb3V0bGluZTwvdGl0bGU+PHBhdGggY2xhc3M9ImZwLWNvbG9yLXBsYXkiIGQ9Ik00OS45MjEyLS4wNzgzYTUwLDUwLDAsMSwwLDUwLjAwMDYsNTBBNTAuMDU2Miw1MC4wNTYyLDAsMCwwLDQ5LjkyMTItLjA3ODNaIi8+PGcgY2xhc3M9ImNvbnRyb2xidXR0b24iIGZpbHRlcj0idXJsKCNmMSkiPjxwYXRoIGNsYXNzPSJyZWN0IiBkPSJNNDYuODcwOSw2OS45NTMxSDMzLjEzODVWMjkuODlINDYuODcwOVpNMzUuMTQxNiw2Ny45NWg5LjcyNjJWMzEuODkzNUgzNS4xNDE2WiIvPjxwYXRoIGNsYXNzPSJyZWN0IiBkPSJNNjYuNzA0Nyw2OS45NTMxSDUyLjk3MjJWMjkuODlINjYuNzA0N1pNNTQuOTc1NCw2Ny45NWg5LjcyNjJWMzEuODkzNUg1NC45NzU0WiIvPjwvZz48L3N2Zz4K","base64");

var LOADING_ROUNDED_OUTLINE = Buffer("PHN2ZyBjbGFzcz0iZnAtbG9hZGluZy1yb3VuZGVkLW91dGxpbmUiIHdpZHRoPScxMTJweCcgaGVpZ2h0PScxMTJweCcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9Ijc2IiBoZWlnaHQ9Ijc2IiBmaWxsPSJyZ2JhKDAsMCwwLDApIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIxMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUgMjUpIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwwLDAsLjUpIiBzdHJva2Utd2lkdGg9IjMlIiBjbGFzcz0ic3EiPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2UiIGZyb209InJnYmEoMCwwLDAsMCkiIHRvPSJyZ2JhKDAsMCwwLC41KSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS42cyIgYmVnaW49IjAuMHMiIHZhbHVlcz0icmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsLjUpIiBrZXlUaW1lcz0iMDswLjE7MC4yOzAuNDsxIj48L2FuaW1hdGU+CiAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGFkZGl0aXZlPSJzdW0iIGZyb209IjAuOCIgdG89IjEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4wcyIgZHVyPSIxLjZzIiB2YWx1ZXM9IjE7MC44OzAuODsxOzEiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICAgIDwvY2lyY2xlPgogICAgPGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjEwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MCAyNSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwuNSkiIHN0cm9rZS13aWR0aD0iMyUiIGNsYXNzPSJzcSI+CiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZSIgZnJvbT0icmdiYSgwLDAsMCwwKSIgdG89InJnYmEoMCwwLDAsLjUpIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjZzIiBiZWdpbj0iMC40cyIgdmFsdWVzPSJyZ2JhKDAsMCwwLC41KTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsMCk7cmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwuNSkiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZT4KICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgYWRkaXRpdmU9InN1bSIgZnJvbT0iMC44IiB0bz0iMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjRzIiBkdXI9IjEuNnMiIHZhbHVlcz0iMTswLjg7MC44OzE7MSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlVHJhbnNmb3JtPgogICAgPC9jaXJjbGU+CiAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMTAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsMCwwLC41KSIgc3Ryb2tlLXdpZHRoPSIzJSIgY2xhc3M9InNxIj4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3Ryb2tlIiBmcm9tPSJyZ2JhKDAsMCwwLDApIiB0bz0icmdiYSgwLDAsMCwuNSkiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNnMiIGJlZ2luPSIwLjhzIiB2YWx1ZXM9InJnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsMCk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLC41KTtyZ2JhKDAsMCwwLC41KSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlPgogICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBhZGRpdGl2ZT0ic3VtIiBmcm9tPSIwLjgiIHRvPSIxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuOHMiIGR1cj0iMS42cyIgdmFsdWVzPSIxOzAuODswLjg7MTsxIiBrZXlUaW1lcz0iMDswLjE7MC4yOzAuNDsxIj48L2FuaW1hdGVUcmFuc2Zvcm0+CiAgICA8L2NpcmNsZT4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIxMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUgNTApIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwwLDAsLjUpIiBzdHJva2Utd2lkdGg9IjMlIiBjbGFzcz0ic3EiPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2UiIGZyb209InJnYmEoMCwwLDAsMCkiIHRvPSJyZ2JhKDAsMCwwLC41KSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS42cyIgYmVnaW49IjEuMnMiIHZhbHVlcz0icmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsLjUpIiBrZXlUaW1lcz0iMDswLjE7MC4yOzAuNDsxIj48L2FuaW1hdGU+CiAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGFkZGl0aXZlPSJzdW0iIGZyb209IjAuOCIgdG89IjEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMS4ycyIgZHVyPSIxLjZzIiB2YWx1ZXM9IjE7MC44OzAuODsxOzEiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICAgIDwvY2lyY2xlPgo8L3N2Zz4K","base64")
  , LOADING_ROUNDED_FILL = Buffer("PHN2ZyBjbGFzcz0iZnAtbG9hZGluZy1yb3VuZGVkLWZpbGwiIHdpZHRoPScxMTJweCcgaGVpZ2h0PScxMTJweCcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9Ijc2IiBoZWlnaHQ9Ijc2IiBmaWxsPSJyZ2JhKDAsMCwwLDApIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIxMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUgMjUpIiBmaWxsPSJyZ2JhKDAsMCwwLC41KSIgY2xhc3M9InNxIj4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZmlsbCIgZnJvbT0icmdiYSgwLDAsMCwwKSIgdG89InJnYmEoMCwwLDAsLjUpIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjZzIiBiZWdpbj0iMC4wcyIgdmFsdWVzPSJyZ2JhKDAsMCwwLC41KTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsMCk7cmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwuNSkiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZT4KICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgYWRkaXRpdmU9InN1bSIgZnJvbT0iMC44IiB0bz0iMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjBzIiBkdXI9IjEuNnMiIHZhbHVlcz0iMTswLjg7MC44OzE7MSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlVHJhbnNmb3JtPgogICAgPC9jaXJjbGU+CiAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMTAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDI1KSIgZmlsbD0icmdiYSgwLDAsMCwuNSkiIGNsYXNzPSJzcSI+CiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIGZyb209InJnYmEoMCwwLDAsMCkiIHRvPSJyZ2JhKDAsMCwwLC41KSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS42cyIgYmVnaW49IjAuNHMiIHZhbHVlcz0icmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsLjUpIiBrZXlUaW1lcz0iMDswLjE7MC4yOzAuNDsxIj48L2FuaW1hdGU+CiAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGFkZGl0aXZlPSJzdW0iIGZyb209IjAuOCIgdG89IjEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC40cyIgZHVyPSIxLjZzIiB2YWx1ZXM9IjE7MC44OzAuODsxOzEiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICAgIDwvY2lyY2xlPgogICAgPGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjEwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MCA1MCkiIGZpbGw9InJnYmEoMCwwLDAsLjUpIiBjbGFzcz0ic3EiPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJmaWxsIiBmcm9tPSJyZ2JhKDAsMCwwLDApIiB0bz0icmdiYSgwLDAsMCwuNSkiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNnMiIGJlZ2luPSIwLjhzIiB2YWx1ZXM9InJnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsMCk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLC41KTtyZ2JhKDAsMCwwLC41KSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlPgogICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBhZGRpdGl2ZT0ic3VtIiBmcm9tPSIwLjgiIHRvPSIxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuOHMiIGR1cj0iMS42cyIgdmFsdWVzPSIxOzAuODswLjg7MTsxIiBrZXlUaW1lcz0iMDswLjE7MC4yOzAuNDsxIj48L2FuaW1hdGVUcmFuc2Zvcm0+CiAgICA8L2NpcmNsZT4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIxMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUgNTApIiBmaWxsPSJyZ2JhKDAsMCwwLC41KSIgY2xhc3M9InNxIj4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZmlsbCIgZnJvbT0icmdiYSgwLDAsMCwwKSIgdG89InJnYmEoMCwwLDAsLjUpIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjZzIiBiZWdpbj0iMS4ycyIgdmFsdWVzPSJyZ2JhKDAsMCwwLC41KTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsMCk7cmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwuNSkiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZT4KICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgYWRkaXRpdmU9InN1bSIgZnJvbT0iMC44IiB0bz0iMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIxLjJzIiBkdXI9IjEuNnMiIHZhbHVlcz0iMTswLjg7MC44OzE7MSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlVHJhbnNmb3JtPgogICAgPC9jaXJjbGU+Cjwvc3ZnPgo=","base64")
  , LOADING_SHARP_FILL = Buffer("PHN2ZyBjbGFzcz0iZnAtbG9hZGluZy1zaGFycC1maWxsIiB3aWR0aD0nMTEycHgnIGhlaWdodD0nMTEycHgnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNzYiIGhlaWdodD0iNzYiIGZpbGw9InJnYmEoMCwwLDAsMCkiIGNsYXNzPSJiayI+PC9yZWN0PgogIDxyZWN0IHg9Ii0xMCIgeT0iLTEwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1IDI1KSIgZmlsbD0icmdiYSgwLDAsMCwuNSkiIGNsYXNzPSJzcSI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJmaWxsIiBmcm9tPSJyZ2JhKDAsMCwwLDApIiB0bz0icmdiYSgwLDAsMCwuNSkiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNnMiIGJlZ2luPSIwLjBzIiB2YWx1ZXM9InJnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsMCk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLC41KTtyZ2JhKDAsMCwwLC41KSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlPgogICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgYWRkaXRpdmU9InN1bSIgZnJvbT0iMC44IiB0bz0iMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjBzIiBkdXI9IjEuNnMiIHZhbHVlcz0iMTswLjg7MC44OzE7MSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlVHJhbnNmb3JtPgogIDwvcmVjdD4KICA8cmVjdCB4PSItMTAiIHk9Ii0xMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MCAyNSkiIGZpbGw9InJnYmEoMCwwLDAsLjUpIiBjbGFzcz0ic3EiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZmlsbCIgZnJvbT0icmdiYSgwLDAsMCwwKSIgdG89InJnYmEoMCwwLDAsLjUpIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjZzIiBiZWdpbj0iMC40cyIgdmFsdWVzPSJyZ2JhKDAsMCwwLC41KTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsMCk7cmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwuNSkiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZT4KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGFkZGl0aXZlPSJzdW0iIGZyb209IjAuOCIgdG89IjEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC40cyIgZHVyPSIxLjZzIiB2YWx1ZXM9IjE7MC44OzAuODsxOzEiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICA8L3JlY3Q+CiAgPHJlY3QgeD0iLTEwIiB5PSItMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAgNTApIiBmaWxsPSJyZ2JhKDAsMCwwLC41KSIgY2xhc3M9InNxIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIGZyb209InJnYmEoMCwwLDAsMCkiIHRvPSJyZ2JhKDAsMCwwLC41KSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS42cyIgYmVnaW49IjAuOHMiIHZhbHVlcz0icmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsLjUpIiBrZXlUaW1lcz0iMDswLjE7MC4yOzAuNDsxIj48L2FuaW1hdGU+CiAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBhZGRpdGl2ZT0ic3VtIiBmcm9tPSIwLjgiIHRvPSIxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuOHMiIGR1cj0iMS42cyIgdmFsdWVzPSIxOzAuODswLjg7MTsxIiBrZXlUaW1lcz0iMDswLjE7MC4yOzAuNDsxIj48L2FuaW1hdGVUcmFuc2Zvcm0+CiAgPC9yZWN0PgogIDxyZWN0IHg9Ii0xMCIgeT0iLTEwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1IDUwKSIgZmlsbD0icmdiYSgwLDAsMCwuNSkiIGNsYXNzPSJzcSI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJmaWxsIiBmcm9tPSJyZ2JhKDAsMCwwLDApIiB0bz0icmdiYSgwLDAsMCwuNSkiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNnMiIGJlZ2luPSIxLjJzIiB2YWx1ZXM9InJnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsMCk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLC41KTtyZ2JhKDAsMCwwLC41KSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlPgogICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgYWRkaXRpdmU9InN1bSIgZnJvbT0iMC44IiB0bz0iMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIxLjJzIiBkdXI9IjEuNnMiIHZhbHVlcz0iMTswLjg7MC44OzE7MSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlVHJhbnNmb3JtPgogIDwvcmVjdD4KPC9zdmc+Cg==","base64")
  , LOADING_SHARP_OUTLINE = Buffer("PHN2ZyBjbGFzcz0iZnAtbG9hZGluZy1zaGFycC1vdXRsaW5lIiB3aWR0aD0nMTEycHgnIGhlaWdodD0nMTEycHgnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNzYiIGhlaWdodD0iNzYiIGZpbGw9InJnYmEoMCwwLDAsMCkiIGNsYXNzPSJiayI+PC9yZWN0PgogIDxyZWN0IHg9Ii05IiB5PSItOSIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNSAyNSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwuNSkiIHN0cm9rZS13aWR0aD0iMyUiIGNsYXNzPSJzcSI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2UiIGZyb209InJnYmEoMCwwLDAsMCkiIHRvPSJyZ2JhKDAsMCwwLC41KSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS42cyIgYmVnaW49IjAuMHMiIHZhbHVlcz0icmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsLjUpIiBrZXlUaW1lcz0iMDswLjE7MC4yOzAuNDsxIj48L2FuaW1hdGU+CiAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGFkZGl0aXZlPSJzdW0iIGZyb209IjAuOCIgdG89IjEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4wcyIgZHVyPSIxLjZzIiB2YWx1ZXM9IjE7MC44OzAuODsxOzEiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICA8L3JlY3Q+CiAgPHJlY3QgeD0iLTkiIHk9Ii05IiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDI1KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsMCwwLC41KSIgc3Ryb2tlLXdpZHRoPSIzJSIgY2xhc3M9InNxIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZSIgZnJvbT0icmdiYSgwLDAsMCwwKSIgdG89InJnYmEoMCwwLDAsLjUpIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjZzIiBiZWdpbj0iMC40cyIgdmFsdWVzPSJyZ2JhKDAsMCwwLC41KTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsMCk7cmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwuNSkiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZT4KICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgYWRkaXRpdmU9InN1bSIgZnJvbT0iMC44IiB0bz0iMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjRzIiBkdXI9IjEuNnMiIHZhbHVlcz0iMTswLjg7MC44OzE7MSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlVHJhbnNmb3JtPgogIDwvcmVjdD4KICA8cmVjdCB4PSItOSIgeT0iLTkiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAgNTApIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwwLDAsLjUpIiBzdHJva2Utd2lkdGg9IjMlIiBjbGFzcz0ic3EiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3Ryb2tlIiBmcm9tPSJyZ2JhKDAsMCwwLDApIiB0bz0icmdiYSgwLDAsMCwuNSkiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNnMiIGJlZ2luPSIwLjhzIiB2YWx1ZXM9InJnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsMCk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLC41KTtyZ2JhKDAsMCwwLC41KSIga2V5VGltZXM9IjA7MC4xOzAuMjswLjQ7MSI+PC9hbmltYXRlPgogICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBhZGRpdGl2ZT0ic3VtIiBmcm9tPSIwLjgiIHRvPSIxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuOHMiIGR1cj0iMS42cyIgdmFsdWVzPSIxOzAuODswLjg7MTsxIiBrZXlUaW1lcz0iMDswLjE7MC4yOzAuNDsxIj48L2FuaW1hdGVUcmFuc2Zvcm0+CiAgPC9yZWN0PgogIDxyZWN0IHg9Ii05IiB5PSItOSIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNSA1MCkiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwuNSkiIHN0cm9rZS13aWR0aD0iMyUiIGNsYXNzPSJzcSI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2UiIGZyb209InJnYmEoMCwwLDAsMCkiIHRvPSJyZ2JhKDAsMCwwLC41KSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS42cyIgYmVnaW49IjEuMnMiIHZhbHVlcz0icmdiYSgwLDAsMCwuNSk7cmdiYSgwLDAsMCwwKTtyZ2JhKDAsMCwwLDApO3JnYmEoMCwwLDAsLjUpO3JnYmEoMCwwLDAsLjUpIiBrZXlUaW1lcz0iMDswLjE7MC4yOzAuNDsxIj48L2FuaW1hdGU+CiAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGFkZGl0aXZlPSJzdW0iIGZyb209IjAuOCIgdG89IjEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMS4ycyIgZHVyPSIxLjZzIiB2YWx1ZXM9IjE7MC44OzAuODsxOzEiIGtleVRpbWVzPSIwOzAuMTswLjI7MC40OzEiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICA8L3JlY3Q+Cjwvc3ZnPgo=","base64");

flowplayer(function(api, root) {
  common.find('.fp-filters').forEach(common.removeNode);
  try {
    var fc;
    document.body.appendChild(fc = common.createElement('div', {}, Buffer("PHN2ZyBjbGFzcz0iZnAtZmlsdGVycyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMCAwIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9ImYxIiB4PSItMjAlIiB5PSItMjAlIiB3aWR0aD0iMjAwJSIgaGVpZ2h0PSIyMDAlIj4KICAgICAgPGZlT2Zmc2V0IHJlc3VsdD0ib2ZmT3V0IiBpbj0iU291cmNlQWxwaGEiIGR4PSIwIiBkeT0iMCIgLz4KICAgICAgPGZlQ29sb3JNYXRyaXggcmVzdWx0PSJtYXRyaXhPdXQiIGluPSJvZmZPdXQiIHR5cGU9Im1hdHJpeCIKICAgICAgdmFsdWVzPSIwLjMgMCAwIDAgMCAwIDAuMyAwIDAgMCAwIDAgMC4zIDAgMCAwIDAgMCAwLjQgMCIgLz4KICAgICAgPGZlR2F1c3NpYW5CbHVyIHJlc3VsdD0iYmx1ck91dCIgaW49Im1hdHJpeE91dCIgc3RkRGV2aWF0aW9uPSI0IiAvPgogICAgICA8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJibHVyT3V0IiBtb2RlPSJub3JtYWwiIC8+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+Cjwvc3ZnPgo=","base64")));
    common.css(fc, {
      width: 0,
      height: 0,
      overflow: 'hidden',
      position: 'absolute',
      margin: 0,
      padding: 0
    });

  } catch (e) { /* omit */ }

   var conf = api.conf,
      support = flowplayer.support,
      hovertimer;
   common.find('.fp-ratio,.fp-ui', root).forEach(common.removeNode);
   common.addClass(root, 'flowplayer');
   root.appendChild(common.createElement('div', {className: 'fp-ratio'}));
   var ui = common.createElement('div', {className: 'fp-ui'}, '\
         <div class="fp-waiting">\
           {{ LOADING_SHARP_OUTLINE }}\
           {{ LOADING_SHARP_FILL }}\
           {{ LOADING_ROUNDED_FILL }}\
           {{ LOADING_ROUNDED_OUTLINE }}\
         </div>\
         <div class="fp-header">\
           <a class="fp-share fp-icon"></a>\
           <a class="fp-fullscreen fp-icon"></a>\
           <a class="fp-unload fp-icon"></a>\
         </div>\
         <p class="fp-speed-flash"></p>\
         <div class="fp-play fp-visible">\
           <a class="fp-icon fp-playbtn"></a>\
           {{ PLAY_ROUNDED_FILL }}\
           {{ PLAY_ROUNDED_OUTLINE }}\
           {{ PLAY_SHARP_FILL }}\
           {{ PLAY_SHARP_OUTLINE }}\
         </div>\
         <div class="fp-pause">\
           <a class="fp-icon fp-playbtn"></a>\
           {{ PAUSE_SHARP_OUTLINE }}\
           {{ PAUSE_SHARP_FILL }}\
           {{ PAUSE_ROUNDED_OUTLINE }}\
           {{ PAUSE_ROUNDED_FILL }}\
         </div>\
         <div class="fp-controls">\
            <a class="fp-icon fp-playbtn"></a>\
            <span class="fp-elapsed">00:00</span>\
            <div class="fp-timeline fp-bar">\
               <span class="fp-timestamp"></span>\
               <div class="fp-progress fp-color"></div>\
            </div>\
            <span class="fp-duration"></span>\
            <span class="fp-remaining"></span>\
            <div class="fp-volume">\
               <a class="fp-icon fp-volumebtn"></a>\
               <div class="fp-volumebar fp-bar-slider">\
                 <em></em><em></em><em></em><em></em><em></em><em></em><em></em>\
               </div>\
            </div>\
            <strong class="fp-speed fp-hidden"></strong>\
         </div>'.replace('{{ PAUSE_ROUNDED_FILL }}', PAUSE_ROUNDED_FILL)
                .replace('{{ PAUSE_ROUNDED_OUTLINE }}', PAUSE_ROUNDED_OUTLINE)
                .replace('{{ PAUSE_SHARP_FILL }}', PAUSE_SHARP_FILL)
                .replace('{{ PAUSE_SHARP_OUTLINE }}', PAUSE_SHARP_OUTLINE)
                .replace('{{ PLAY_SHARP_OUTLINE }}', PLAY_SHARP_OUTLINE)
                .replace('{{ PLAY_SHARP_FILL }}', PLAY_SHARP_FILL)
                .replace('{{ PLAY_ROUNDED_OUTLINE }}', PLAY_ROUNDED_OUTLINE)
                .replace('{{ PLAY_ROUNDED_FILL }}', PLAY_ROUNDED_FILL)
                .replace('{{ LOADING_ROUNDED_OUTLINE }}', LOADING_ROUNDED_OUTLINE)
                .replace('{{ LOADING_ROUNDED_FILL }}', LOADING_ROUNDED_FILL)
                .replace('{{ LOADING_SHARP_FILL }}', LOADING_SHARP_FILL)
                .replace('{{ LOADING_SHARP_OUTLINE }}', LOADING_SHARP_OUTLINE)
                .replace(/url\(#/g, 'url(' + window.location.href.replace(window.location.hash, "").replace(/\#$/g, '') + '#')
   );
   root.appendChild(ui);
   function find(klass) {
     return common.find(".fp-" + klass, root)[0];
   }

   // widgets
  var waiting = find('waiting'),
      elapsed = find("elapsed"),
      ratio = find("ratio"),
      speedFlash = find('speed-flash'),
      durationEl = find("duration"),
      remaining = find('remaining'),
      timelineTooltip = find('timestamp'),
      origRatio = common.css(ratio, 'padding-top'),
      play = find('play'),
      pause = find('pause'),

      // sliders
      timeline = find("timeline"),
      timelineApi = slider(timeline, api.rtl),

      fullscreen = find("fullscreen"),
      volumeSlider = find("volumebar"),
      volumeApi = barSlider(volumeSlider, { rtl: api.rtl }),
      noToggle = common.hasClass(root, 'no-toggle');

   timelineApi.disableAnimation(common.hasClass(root, 'is-touch'));
   api.sliders = api.sliders || {};
   api.sliders.timeline = timelineApi;
   api.sliders.volume = volumeApi;

   var speedAnimationTimers = [];

   // aspect ratio
   function setRatio(val) {
     common.css(ratio, 'padding-top', val * 100 + "%");
     if (!support.inlineBlock) common.height(common.find('object', root)[0], common.height(root));
   }

   function hover(flag) {
     if (flag) {
       common.addClass(root, 'is-mouseover');
       common.removeClass(root, 'is-mouseout');
     } else {
       common.addClass(root, 'is-mouseout');
       common.removeClass(root, 'is-mouseover');
     }
   }

   // loading...
   if (!support.svg) common.html(waiting, "<p>loading &hellip;</p>");

   if (conf.ratio) setRatio(conf.ratio);

   // no fullscreen in IFRAME
   try {
      if (!conf.fullscreen) common.removeNode(fullscreen);

   } catch (e) {
      common.removeNode(fullscreen);
   }

   api.on('dvrwindow', function() {
     timelineApi.disable(false);
   });

   api.on("ready", function(ev, api, video) {

      var duration = api.video.duration;

      timelineApi.disable(api.disabled || !duration);

      if (conf.adaptiveRatio && !isNaN(video.height / video.width)) setRatio(video.height / video.width, true);

      // initial time & volume
      common.html([durationEl, remaining], api.live ? 'Live' : format(duration));

      // do we need additional space for showing hour
      common.toggleClass(root, 'is-long', duration >= 3600);
      volumeApi.slide(api.volumeLevel);

      if (api.engine.engineName === 'flash') timelineApi.disableAnimation(true, true);
      else timelineApi.disableAnimation(false);
      common.find('.fp-title', ui).forEach(common.removeNode);
      if (video.title) {

        common.prepend(ui, common.createElement('div', {
          className: 'fp-message fp-title'
        }, video.title));
      }
      common.toggleClass(root, 'has-title', !!video.title);


   }).on("unload", function() {
     if (!origRatio && !conf.splash) common.css(ratio, "paddingTop", "");
     timelineApi.slide(0);
     common.addClass(play, 'fp-visible');

   // buffer
   }).on("buffer", function(ev, api, buffered) {
      var video = api.video,
      max = video.buffer / video.duration;

      if (!video.seekable && support.seekable) timelineApi.max(api.conf.live ? Infinity : max);
      if (!buffered || typeof buffered === 'number') { // Legacy
        buffered = [{
          start: 0,
          end: video.buffer
        }]
      }
      var buffers = common.find('.fp-buffer', timeline);
      if (buffers.length !== buffered.length) {
        buffers.forEach(common.removeNode);
        buffers = [];
      }
      buffered.forEach(function(b, i) {
        var buffer = buffers[i] || common.createElement('div', {
          className: 'fp-buffer'
        });
        common.css(buffer, {
          left: (100 * b.start / video.duration) + '%',
          width: (100 * (b.end - b.start) / video.duration) + '%'
        });
        common.prepend(timeline, buffer);
      });
   }).on("speed", function(e, api, val) {
     if (api.video.time) {
       common.text(speedFlash, val + "x");
       common.addClass(speedFlash, 'fp-shown');
       speedAnimationTimers = speedAnimationTimers.filter(function(to) {
         clearTimeout(to);
         return false;
       });
       speedAnimationTimers.push(setTimeout(function() {
        common.addClass(speedFlash, 'fp-hilite');
        speedAnimationTimers.push(setTimeout(function() {
          common.removeClass(speedFlash, 'fp-hilite');
          speedAnimationTimers.push(setTimeout(function() {
            common.removeClass(speedFlash, 'fp-shown');
          }, 300));
        }, 1000));
       }));
     }

   }).on("buffered", function() {
      timelineApi.max(1);

   // progress
   }).on("progress seek", function(_e, _api, time) {

      var duration = api.video.duration,
       offset = api.video.seekOffset || 0;

      time = time || api.video.time;
      var percentage = (time - offset) / (duration - offset);
      if (!timelineApi.dragging) {
        timelineApi.slide(percentage, api.seeking ? 0 : 250);
      }
      common.toggleClass(root, 'is-live-position', duration - time < conf.livePositionOffset);

      common.html(elapsed, format(time));
      common.html(remaining, format(duration - time, true));

   }).on("finish resume seek", function(e) {
      common.toggleClass(root, "is-finished", e.type == "finish");
   }).on('resume', function() {
      common.addClass(play, 'fp-visible');
      setTimeout(function() { common.removeClass(play, 'fp-visible'); }, 300);
   }).on('pause', function() {
      common.addClass(pause, 'fp-visible');
      setTimeout(function() { common.removeClass(pause, 'fp-visible'); }, 300);
   }).on("stop", function() {
      common.html(elapsed, format(0));
      timelineApi.slide(0, 100);

   }).on("finish", function() {
      common.html(elapsed, format(api.video.duration));
      timelineApi.slide(1, 100);
      common.removeClass(root, 'is-seeking');

   // misc
   }).on("beforeseek", function() {
      //TODO FIXME
      //progress.stop();

   }).on("volume", function() {
      volumeApi.slide(api.volumeLevel);


   }).on("disable", function() {
      var flag = api.disabled;
      timelineApi.disable(flag);
      volumeApi.disable(flag);
      common.toggleClass(root, 'is-disabled', api.disabled);

   }).on("mute", function(e, api, flag) {
      common.toggleClass(root, 'is-muted', flag);

   }).on("error", function(e, api, error) {
      common.removeClass(root, 'is-loading');
      common.removeClass(root, 'is-seeking');
      common.addClass(root, 'is-error');
      if (error) {
         api.error = true;

         var code = error.code;
         if( (error.message || '').match(/DECODER_ERROR_NOT_SUPPORTED/) ) {
            code = 3;
         }

         var dismiss = api.message((api.engine && api.engine.engineName || 'html5') + ": " + conf.errors[code] );
         //common.find('p', el)[0].innerHTML = error.url || video.url || video.src || conf.errorUrls[error.code];
         common.removeClass(root, 'is-mouseover');
         api.one('load progress', function() { dismiss(); });
      }


   // hover
   }).one('resume ready', function() {
     var videoTag = common.find('video.fp-engine', root)[0];
     if (!videoTag) return;
     if (!common.width(videoTag) || !common.height(videoTag)) {
       var oldOverflow = root.style.overflow;
       root.style.overflow = 'visible';
       setTimeout(function() {
         if (oldOverflow) root.style.overflow = oldOverflow;
         else root.style.removeProperty('overflow');
       });
     }
   });
   //Interaction events
   bean.on(root, "mouseenter mouseleave", function(e) {
     if (noToggle) return;

      var is_over = e.type == "mouseover",
         lastMove;

      // is-mouseover/out
      hover(is_over);

      if (is_over) {

         var reg = function() {
            hover(true);
            lastMove = new Date();
         };
         api.on("pause.x volume.x", reg);
         bean.on(root, 'mousemove.x', reg);

         hovertimer = setInterval(function() {
            if (new Date() - lastMove > conf.mouseoutTimeout) {
               hover(false);
               lastMove = new Date();
            }
         }, 100);

      } else {
         bean.off(root, 'mousemove.x');
         api.off("pause.x volume.x");
         clearInterval(hovertimer);
      }


   // allow dragging over the player edge
   });
   bean.on(root, "mouseleave", function() {

     if (timelineApi.dragging || volumeApi.dragging) {
       common.addClass(root, 'is-mouseover');
       common.removeClass(root, 'is-mouseout');
     }

   // click
   });
   bean.on(root, "click.player", function(e) {
     if (api.disabled) return;
     if (common.hasClass(e.target, 'fp-ui') || common.hasClass(e.target, 'fp-engine') || e.flash || common.hasParent(e.target, '.fp-play,.fp-pause')) {
         if (e.preventDefault) e.preventDefault();
         return api.toggle();
      }
   });

   bean.on(root, 'mousemove', '.fp-timeline', function(ev) {
     var x = ev.pageX || ev.clientX,
         delta = x - common.offset(timeline).left,
         percentage = delta / common.width(timeline),
         video = api.video,
         duration = video.duration - (video.seekOffset === undefined ? 0 : video.seekOffset),
         seconds = (api.rtl ? 1 - percentage : percentage) * duration;
     if (percentage < 0) return;
     common.html(timelineTooltip, format(seconds));
     var left = (delta - common.width(timelineTooltip) / 2);
     if (left < 0) left = 0;
     if (left > common.width(timeline) - common.width(timelineTooltip)) left = false;
     if (left !== false) common.css(timelineTooltip, {
       left: left + 'px',
       right: 'auto'
     });
     else common.css(timelineTooltip, {
       left: 'auto',
       right: '0px'
     });

   });

   bean.on(root, 'contextmenu', function(ev) {
      var w = window;
      if (common.hasClass(root, 'is-flash-disabled')) return;
      var menu = common.find('.fp-context-menu', root)[0];
      if (!menu) return;
      ev.preventDefault();
      api.showMenu(menu, {
        left: ev.clientX - w.scrollX,
        top: ev.clientY - w.scrollY
      });
      bean.on(root, 'click', '.fp-context-menu', function(ev) {
         ev.stopPropagation();
      });
   });
   api.on('flashdisabled', function(_e, _a, showMessage) {
     common.addClass(root, 'is-flash-disabled');
     var dismiss;
     if (showMessage !== false) dismiss = api.message('Seems something is blocking Adobe Flash from running');
     api.one('ready progress', function() {
       common.removeClass(root, 'is-flash-disabled');
       if (dismiss) dismiss();
     });
   });

   // poster -> background image
   if (conf.poster) common.css(root, 'background-image', "url(" + conf.poster + ")");

   var bc = common.css(root, 'background-color'),
      has_bg = common.css(root, 'background-image') != "none" || bc && bc != "rgba(0, 0, 0, 0)" && bc != "transparent";

   // is-poster class
   if (has_bg && !conf.splash) {
      if (!conf.poster) conf.poster = true;
      var initPoster = function() {
        common.addClass(root, "is-poster");
        common.addClass(play, 'fp-visible');
        api.poster = true;
        api.one(conf.autoplay ? "progress beforeseek" : "resume beforeseek", function() {
          common.removeClass(root, "is-poster");
          common.removeClass(play, 'fp-visible');
          api.poster = false;
        });
      }
      api.on('stop', function() { initPoster(); });
      api.on('ready', function(_ev, _api, video) {
        if (video.index || video.autoplay) return; // No poster for playlist items
        initPoster();
      });
   }

   if (typeof conf.splash === 'string') {
     common.css(root, 'background-image', "url('" + conf.splash + "')");
   }

   // default background color if not present
   if (!has_bg && api.forcedSplash) {
      common.css(root, "background-color", "#555");
   }

   bean.on(root, 'click', '.fp-toggle, .fp-play, .fp-playbtn', function() {
     if (api.disabled) return;
     api.toggle();
   });

   /* controlbar elements */
   bean.on(root, 'click', '.fp-volumebtn', function() { api.mute(); }); bean.on(root, 'click', '.fp-fullscreen', function() { api.fullscreen(); });
   bean.on(root, 'click', '.fp-unload', function() { api.unload(); });

   bean.on(timeline, 'slide', function(val) {
     api.seeking = true;
     api.seekTo(val * 10);
   });

   bean.on(volumeSlider, 'slide', function(val) {
      api.volume(val);
   });

   // times

   bean.on(root, 'click', '.fp-duration,.fp-remaining', function() {
     if (api.dvr) return api.seekTo(10);
     common.toggleClass(root, 'is-inverted');
   });

   hover(noToggle);

   var resizeHandle;

   api.on('shutdown', function() {
     bean.off(timeline);
     bean.off(volumeSlider);
     if (resizeHandle) window.cancelAnimationFrame(resizeHandle);
   });

  if (typeof window.requestAnimationFrame === 'function') {
    var resize = function() {
      var playerEl = common.find('.fp-player', root)[0] || root;
      common.toggleClass(root, 'is-tiny', playerEl.clientWidth < 400);
      common.toggleClass(root, 'is-small', playerEl.clientWidth < 600 && playerEl.clientWidth >= 400);
      resizeHandle = window.requestAnimationFrame(resize);
    };
    resizeHandle = window.requestAnimationFrame(resize);
  }

});


module.exports.format = format;

}).call(this,_dereq_("buffer").Buffer)
},{"../common":1,"../flowplayer":31,"./ui/bar-slider":28,"./ui/slider":29,"bean":34,"buffer":35}],28:[function(_dereq_,module,exports){
var bean = _dereq_('bean')
  , common = _dereq_('../../common');

function slider(root, opts) {
  opts = opts || {};

  var activeClass = opts.activeClass || 'fp-color'
    , inactiveClass = opts.inactiveClass || 'fp-grey'
    , childSelector = opts.childSelector || 'em'
    , rtl = !!opts.rtl
    , disabled = false;

  var totalBars = common.find(childSelector, root).length;

  var api = {
    unload: function() {
      bean.off(root, '.barslider');
    },
    slide: function(to, trigger) {
      common.find(childSelector, root).forEach(function(bar, idx) {
        var active = to > idx/totalBars;
        common.toggleClass(bar, activeClass, active);
        common.toggleClass(bar, inactiveClass, !active);
      });
      if (trigger) bean.fire(root, 'slide', [ to ]);
    },
    disable: function(flag) {
      disabled = flag;
    }
  };

  bean.on(root, 'mousedown.sld touchstart.sld', function(ev) {
    ev.preventDefault();
    if (disabled) return;
    api.slide(getMouseValue(ev), true);

    bean.on(root, 'mousemove.sld touchmove.sld', function(ev) {
      ev.preventDefault();
      api.slide(getMouseValue(ev), true);
    });

    bean.one(document, 'mouseup.sld touchup.sld', function() {
      bean.off(root, 'mousemove.sld touchmove.sld');
    });
  });

  return api;

  function getMouseValue(ev) {
    var pageX = ev.pageX || ev.clientX
      , offset = common.offset(root)
      , size = common.width(root);


    if (!pageX && ev.originalEvent && ev.originalEvent.touches && ev.originalEvent.touches.length) {
      pageX = ev.originalEvent.touches[0].pageX;
    }
    var delta = pageX - offset.left;
    delta = Math.max(0, Math.min(size, delta));

    var value = delta / size;
    if (rtl) value = 1 - value;
    return value;
  }
}


module.exports = slider;

},{"../../common":1,"bean":34}],29:[function(_dereq_,module,exports){
'use strict';
// skip IE policies
// document.ondragstart = function () { return false; };
//
var bean = _dereq_('bean'),
    common = _dereq_('../../common');


// execute function every <delay> ms
var throttle = function(fn, delay) {
   var locked;

   return function () {
      if (!locked) {
         fn.apply(this, arguments);
         locked = 1;
         setTimeout(function () { locked = 0; }, delay);
      }
   };
};


var slider = function(root, rtl) {

  var progress = common.lastChild(root),
      disabled,
      offset,
      width,
      height,
      vertical,
      size,
      maxValue,
      max,
      skipAnimation = false,

      /* private */
      calc = function() {
         offset = common.offset(root);
         width = common.width(root);
         height = common.height(root);

         /* exit from fullscreen can mess this up.*/
         // vertical = height > width;

         size = vertical ? height : width;
         max = toDelta(maxValue);
      },

      fire = function(value) {
         if (!disabled && value != api.value && (!maxValue || value < maxValue)) {
            bean.fire(root, 'slide', [ value ]);
            api.value = value;
         }
      },

      mousemove = function(e) {
         var pageX = e.pageX || e.clientX;
         if (!pageX && e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
            pageX = e.originalEvent.touches[0].pageX;
         }
         var delta = vertical ? e.pageY - offset.top : pageX - offset.left;
         delta = Math.max(0, Math.min(max || size, delta));

         var value = delta / size;
         if (vertical) value = 1 - value;
         if (rtl) value = 1 - value;
         return move(value, 0, true);
      },

      move = function(value, speed) {
         if (speed === undefined) { speed = 0; }
         if (value > 1) value = 1;

         var to = (Math.round(value * 1000) / 10) + "%";

         if (!maxValue || value <= maxValue) {
            if (skipAnimation) {
              common.removeClass(progress, 'animated');
            } else {
              common.addClass(progress, 'animated');
              common.css(progress, 'transition-duration', (speed || 0) + 'ms');
            }
            common.css(progress, 'width', to);
         }

         return value;
      },

      toDelta = function(value) {
         return Math.max(0, Math.min(size, vertical ? (1 - value) * height : value * width));
      },

      /* public */
      api = {

         max: function(value) {
            maxValue = value;
         },

         disable: function(flag) {
            disabled = flag;
         },

         slide: function(value, speed, fireEvent) {
            calc();
            if (fireEvent) fire(value);
            move(value, speed);
         },

         // Should animation be handled via css
         disableAnimation: function(value, alsoCssAnimations) {
            skipAnimation = value !== false;
            common.toggleClass(root, 'no-animation', !!alsoCssAnimations);
         }

      };

  calc();

  // bound dragging into document
  bean.on(root, 'mousedown.sld touchstart', function(e) {
    e.preventDefault();

    if (!disabled) {
      // begin --> recalculate. allows dynamic resizing of the slider
      var delayedFire = throttle(fire, 100);
      calc();
      api.dragging = true;
      common.addClass(root, 'is-dragging');
      fire(mousemove(e));

      bean.on(document, 'mousemove.sld touchmove.sld', function(e) {
        e.preventDefault();
        delayedFire(mousemove(e));

      });
      bean.one(document, 'mouseup touchend', function() {
         api.dragging = false;
         common.removeClass(root, 'is-dragging');
         bean.off(document, 'mousemove.sld touchmove.sld');
      });

     }

  });
  return api;
};

module.exports = slider;

},{"../../common":1,"bean":34}],30:[function(_dereq_,module,exports){


var clipboard = module.exports = function(text, successCallback, errorCallback) {
  try {
    doCopy(text);
    successCallback();
  } catch (e) {
    errorCallback(e);
  }
};

function doCopy(text) {
  var textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.opacity = 0;
  textArea.style.position = 'absolute';
  document.body.appendChild(textArea);
  textArea.select();
  var success = document.execCommand('copy');
  document.body.removeChild(textArea);
  if (!success) throw new Error('Unsuccessfull');
}

},{}],31:[function(_dereq_,module,exports){
'use strict';
var extend = _dereq_('extend-object'),
    isFunction = _dereq_('is-function'),
    bean = _dereq_('bean'),
    slider = _dereq_('./ext/ui/slider'),
    barSlider = _dereq_('./ext/ui/bar-slider'),
    common = _dereq_('./common'),
    events = _dereq_('./ext/events');

var instances = [],
   extensions = [];


var oldHandler = window.onbeforeunload;
window.onbeforeunload = function(ev) {
  instances.forEach(function(api) {
    if (api.conf.splash) {
      api.unload();
    } else {
      api.bind("error", function () {
        common.find('.flowplayer.is-error .fp-message').forEach(common.removeNode);
      });
    }
  });
  if (oldHandler) return oldHandler(ev);
};

var supportLocalStorage = false;
try {
  if (typeof window.localStorage == "object") {
    window.localStorage.flowplayerTestStorage = "test";
    supportLocalStorage = true;
  }
} catch (ignored) {}

var isSafari = /Safari/.exec(navigator.userAgent) && !/Chrome/.exec(navigator.userAgent),
    m = /(\d+\.\d+) Safari/.exec(navigator.userAgent),
    safariVersion = m ? Number(m[1]) : 100;

/* flowplayer()  */
var flowplayer = module.exports = function(fn, opts, callback) {
  if (isFunction(fn)) return extensions.push(fn);
  if (typeof fn == 'number' || typeof fn === 'undefined') return instances[fn || 0];
  if (fn.nodeType) { // Is an element
    if (fn.getAttribute('data-flowplayer-instance-id') !== null) { // Already flowplayer instance
      return instances[fn.getAttribute('data-flowplayer-instance-id')];
    }
    if (!opts) return; // Can't initialize without data
    return initializePlayer(fn, opts, callback);
  }
  if (fn.jquery) return flowplayer(fn[0], opts, callback);
  if (typeof fn === 'string') {
    var el = common.find(fn)[0];
    return el && flowplayer(el, opts, callback);
  }
};

extend(flowplayer, {

   version: '7.2.1',

   engines: [],

   engine: function(name) {
     return flowplayer.engines.filter(function(e) { return e.engineName === name; })[0];
   },

   extensions: [],

   conf: {},

   set: function(key, value) {
      if (typeof key === 'string') flowplayer.conf[key] = value;
      else extend(flowplayer.conf, key);
   },

   registerExtension: function(js, css) {
     flowplayer.extensions.push([js, css]);
   },

   support: {},

   defaults: {

      debug: supportLocalStorage ? !!localStorage.flowplayerDebug : false,

      // true = forced playback
      disabled: false,

      fullscreen: window == window.top,

      // keyboard shortcuts
      keyboard: true,

      // default aspect ratio
      ratio: 9 / 16,

      adaptiveRatio: false,

      rtmp: 0,

      proxy: 'best',

      hlsQualities: true,

      splash: false,

      live: false,
      livePositionOffset: 120,

      swf: "//releases.flowplayer.org/7.2.1/flowplayer.swf",
      swfHls: "//releases.flowplayer.org/7.2.1/flowplayerhls.swf",

      speeds: [0.25, 0.5, 1, 1.5, 2],

      tooltip: true,

      mouseoutTimeout: 5000,

      // initial volume level
      volume: !supportLocalStorage ? 1 : localStorage.muted == "true" ? 0 : !isNaN(localStorage.volume) ? localStorage.volume || 1 : 1,

      // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#error-codes
      errors: [

         // video exceptions
         '',
         'Video loading aborted',
         'Network error',
         'Video not properly encoded',
         'Video file not found',

         // player exceptions
         'Unsupported video',
         'Skin not found',
         'SWF file not found',
         'Subtitles not found',
         'Invalid RTMP URL',
         'Unsupported video format. Try installing Adobe Flash.'
      ],
      errorUrls: ['','','','','','','','','','',
         'http://get.adobe.com/flashplayer/'
      ],
      playlist: [],

      hlsFix: isSafari && safariVersion < 8,

      disableInline: false

   },
   // Expose utilities for plugins
   bean: bean,
   common: common,
   slider: slider,
   barSlider: barSlider,
   extend: extend



});

// keep track of players
var playerCount = 0;

var URLResolver = _dereq_('./ext/resolve');



if (typeof window.jQuery !== 'undefined') {
  var $ = window.jQuery;
  // auto-install (any video tag with parent .flowplayer)
  $(function() {
     if (typeof $.fn.flowplayer == 'function') {
        $('.flowplayer:has(video,script[type="application/json"])').flowplayer();
     }
  });

  // jQuery plugin
  var videoTagConfig = function(videoTag) {
    if (!videoTag.length) return {};
    var clip = videoTag.data() || {}, conf = {};
    $.each(['autoplay', 'loop', 'preload', 'poster'], function(i, key) {
      var val = videoTag.attr(key);
      if (val !== undefined && ['autoplay', 'poster'].indexOf(key) !== -1) conf[key] = val ? val : true;
      else if (val !== undefined) clip[key] = val ? val : true;
    });
    videoTag[0].autoplay = videoTag[0].preload = false;
    clip.subtitles = videoTag.find('track').map(function() {
      var tr = $(this);
      return {
        src: tr.attr('src'),
        kind: tr.attr('kind'),
        label: tr.attr('label'),
        srclang: tr.attr('srclang'),
        'default': tr.prop('default')
      };
    }).get();

    clip.sources = (new URLResolver()).sourcesFromVideoTag(videoTag, $);
    return extend(conf, {clip: clip});
  };
  $.fn.flowplayer = function(opts, callback) {
    return this.each(function() {
      if (typeof opts == 'string') opts = { swf: opts };
      if (isFunction(opts)) { callback = opts; opts = {}; }
      var root = $(this),
          scriptConf = root.find('script[type="application/json"]'),
          confObject = scriptConf.length ? JSON.parse(scriptConf.text()) : videoTagConfig(root.find('video')),
          conf = $.extend({}, opts || {}, confObject, root.data());
      var api = initializePlayer(this, conf, callback);
      events.EVENTS.forEach(function(evName) {
        api.on(evName + '.jquery', function(ev) {
          root.trigger.call(root, ev.type, ev.detail && ev.detail.args);
        });
      });
      root.data('flowplayer', api);
    });
  };
}

function initializePlayer(element, opts, callback) {
  if (opts && opts.embed) opts.embed = extend({}, flowplayer.defaults.embed, opts.embed);

  var root = element,
      conf = extend({}, flowplayer.defaults, flowplayer.conf, opts),
      storage = {},
      lastSeekPosition,
      engine,
      urlResolver = new URLResolver();

      common.addClass(root, 'is-loading');
      common.toggleClass(root, 'no-flex', !flowplayer.support.flex);
      common.toggleClass(root, 'no-svg', !flowplayer.support.svg);
      try {
         storage = supportLocalStorage ? window.localStorage : storage;
      } catch(e) {}

      if (conf.aspectRatio && typeof conf.aspectRatio === 'string') {
        var parts = conf.aspectRatio.split(/[:\/]/);
        conf.ratio = parts[1] / parts[0];
      }

      var isRTL = (root.currentStyle && root.currentStyle.direction === 'rtl') ||
        (window.getComputedStyle && window.getComputedStyle(root, null) !== null && window.getComputedStyle(root, null).getPropertyValue('direction') === 'rtl');

      if (isRTL) common.addClass(root, 'is-rtl');

      /*** API ***/
      var api = {

         // properties
         conf: conf,
         currentSpeed: 1,
         volumeLevel: conf.muted ? 0 : typeof conf.volume === "undefined" ? storage.volume * 1 : conf.volume,
         video: {},

         // states
         disabled: false,
         finished: false,
         loading: false,
         muted: storage.muted == "true" || conf.muted,
         paused: false,
         playing: false,
         ready: false,
         splash: false,
         rtl: isRTL,

         // methods
         //
         hijack: function(hijack) {
            try {
              api.engine.suspendEngine();
            } catch (e) { /* */ }
            api.hijacked = hijack;
         },
         release: function() {
            try {
              api.engine.resumeEngine();
            } catch (e) { /* */ }
            api.hijacked = false;
         },
         debug: function() {
            if (!conf.debug) return;
            console.log.apply(console, ['DEBUG'].concat([].slice.call(arguments)));
         },
         load: function(video, callback) {

            if (api.error || api.loading) return;
            api.video = {};

            api.finished = false;

            video = video || conf.clip;

            // resolve URL
            video = extend({}, urlResolver.resolve(video, conf.clip.sources));
            if (api.playing || api.engine) video.autoplay = true;
            var engineImpl = selectEngine(video);
            if (!engineImpl) return setTimeout(function() { api.trigger("error", [api, { code: flowplayer.support.flashVideo ? 5 : 10 }]); }) && api;
            if (!engineImpl.engineName) throw new Error('engineName property of factory should be exposed');
            if (!api.engine || engineImpl.engineName !== api.engine.engineName) {
              api.ready = false;
              if (api.engine) {
                api.engine.unload();
                api.conf.autoplay = true;
              }
              engine = api.engine = engineImpl(api, root);
              api.one('ready', function() {
                setTimeout(function() {
                  if (api.muted) api.mute(true, true);
                  else engine.volume(api.volumeLevel);
                });
              });
            }

            extend(video, engine.pick(video.sources.filter(function(source) { // Filter out sources explicitely configured for some other engine
              if (!source.engine) return true;
              return source.engine === engine.engineName;
            })));

            if (video.src) {
               var e = api.trigger('load', [api, video, engine], true);
               if (!e.defaultPrevented) {
                  api.ready = false;
                  engine.load(video);

                  // callback
                  if (isFunction(video)) callback = video;
                  if (callback) api.one("ready", callback);
               } else {
                  api.loading = false;
               }
            }

            return api;
         },

         pause: function(fn) {
            if (api.hijacked) return api.hijacked.pause(fn) | api;

            if (api.ready && !api.seeking && !api.loading) {
               engine.pause();
               api.one("pause", fn);
            }
            return api;
         },

         resume: function() {
            var ev = api.trigger('beforeresume', [api], true);
            if (ev.defaultPrevented) return;
            if (api.hijacked) return api.hijacked.resume() | api;

            if (api.ready && api.paused) {
               engine.resume();

               // Firefox (+others?) does not fire "resume" after finish
               if (api.finished) {
                  api.trigger("resume", [api]);
                  api.finished = false;
               }
            }

            return api;
         },

         toggle: function() {
            return api.ready ? api.paused ? api.resume() : api.pause() : api.load();
         },

         /*
            seek(1.4)   -> 1.4s time
            seek(true)  -> 10% forward
            seek(false) -> 10% backward
         */
         seek: function(time, callback) {
            if (typeof time == "boolean") {
               var delta = api.video.duration * 0.1;
               time = api.video.time + (time ? delta : -delta);
               time = Math.min(Math.max(time, 0), api.video.duration - 0.1);
            }
            if (typeof time === 'undefined') return api;
            if (api.hijacked) return api.hijacked.seek(time, callback) | api;
            if (api.ready) {
               lastSeekPosition = time;
               var ev = api.trigger('beforeseek', [api, time], true);
               if (!ev.defaultPrevented) {
                  engine.seek(time);
                  if (isFunction(callback)) api.one("seek", callback);
               } else {
                  api.seeking = false;
                  common.toggleClass(root, 'is-seeking', api.seeking); // remove loading indicator
               }
            }
            return api;
         },

         /*
            seekTo(1) -> 10%
            seekTo(2) -> 20%
            seekTo(3) -> 30%
            ...
            seekTo()  -> last position
         */
         seekTo: function(position, fn) {
            if (position === undefined) return api.seek(lastSeekPosition, fn);
            if (api.video.seekOffset !== undefined) { // Live stream
              return api.seek(api.video.seekOffset + (api.video.duration - api.video.seekOffset) * 0.1 * position, fn);
            }
            return api.seek(api.video.duration * 0.1 * position, fn);
         },

         mute: function(flag, skipStore) {
           if (flag === undefined) flag = !api.muted;
           if (!skipStore) {
             storage.muted = api.muted = flag;
             storage.volume = !isNaN(storage.volume) ? storage.volume : conf.volume; // make sure storage has volume
           }
           if (typeof engine.mute !== 'undefined') engine.mute(flag);
           else {
             api.volume(flag ? 0 : storage.volume, true);
             api.trigger("mute", [api, flag]);
           }
           return api;
         },

         volume: function(level, skipStore) {
            if (api.ready) {
              level = Math.min(Math.max(level, 0), 1);
              if (!skipStore) storage.volume = level;
              engine.volume(level);
            }

            return api;
         },

         speed: function(val, callback) {

            if (api.ready) {

               // increase / decrease
               if (typeof val == "boolean") {
                  val = conf.speeds[conf.speeds.indexOf(api.currentSpeed) + (val ? 1 : -1)] || api.currentSpeed;
               }

               engine.speed(val);
               if (callback) root.one("speed", callback);
            }

            return api;
         },


         stop: function() {
            if (api.ready) {
               api.pause();
               if (!api.live || api.dvr) {
                  api.seek(0, function() {
                     api.trigger("stop", [api]);
                  });
               } else {
                  api.trigger("stop", [api]);
               }
            }
            return api;
         },

         unload: function() {

            if (conf.splash) {
               api.trigger("unload", [api]);
               if (engine) {
                 engine.unload();
                 api.engine = engine = 0;
               }
            } else {
               api.stop();
            }
            return api;
         },

         shutdown: function() {
           api.unload();
           api.trigger('shutdown', [api]);
           bean.off(root);
           delete instances[root.getAttribute('data-flowplayer-instance-id')];
           root.removeAttribute('data-flowplayer-instance-id');
         },

         disable: function(flag) {
            if (flag === undefined) flag = !api.disabled;

            if (flag != api.disabled) {
               api.disabled = flag;
               api.trigger("disable", flag);
            }
            return api;
         },

         registerExtension: function(jsUrls, cssUrls) {
           jsUrls = jsUrls || [];
           cssUrls = cssUrls || [];
           if (typeof jsUrls === 'string') jsUrls = [jsUrls];
           if (typeof cssUrls === 'string') cssUrls = [cssUrls];
           jsUrls.forEach(function(url) { api.extensions.js.push(url); });
           cssUrls.forEach(function(url) { api.extensions.css.push(url); });
         }

      };

      api.conf = extend(api.conf, conf);
      api.extensions = { js: [], css: [] };
      flowplayer.extensions.forEach(function(i) {
        api.registerExtension(i[0], i[1]);
      });
      /* event binding / unbinding */
      events(api);

      var selectEngine = function(clip) {
        var engine;
        var engines = flowplayer.engines;
        if (conf.engine) {
          var eng = engines.filter(function(e) { return e.engineName === conf.engine; })[0];
          if (eng && clip.sources.some(function(source) {
            if (source.engine && source.engine !== eng.engineName) return false;
            return eng.canPlay(source.type, api.conf);
          })) return eng;
        }
        if (conf.enginePreference) engines = flowplayer.engines.filter(function(one) { return conf.enginePreference.indexOf(one.engineName) > -1; }).sort(function(a, b) {
          return conf.enginePreference.indexOf(a.engineName) - conf.enginePreference.indexOf(b.engineName);
        });
        clip.sources.some(function(source) {
          var eng = engines.filter(function(engine) {
            if (source.engine && source.engine !== engine.engineName) return false;
            return engine.canPlay(source.type, api.conf);
          }).shift();
          if (eng) engine = eng;
          return !!eng;
        });
        return engine;
      };

      /*** Behaviour ***/
      if (!root.getAttribute('data-flowplayer-instance-id')) { // Only bind once
         root.setAttribute('data-flowplayer-instance-id', playerCount++);


         api.on('boot', function() {
            var support = flowplayer.support;

            // splash
            if (conf.splash || common.hasClass(root, "is-splash") ||
                  !support.firstframe) {
               api.forcedSplash = !conf.splash && !common.hasClass(root, "is-splash");
               api.splash = true;
               if (!conf.splash) conf.splash = true;
               common.addClass(root, "is-splash");
            }

            if (conf.splash) common.find('video', root).forEach(common.removeNode);

            if (conf.dvr || conf.live || common.hasClass(root, 'is-live')) {
               api.live = conf.live = true;
               api.dvr = conf.dvr = !!conf.dvr || common.hasClass(root, 'is-dvr');
               common.addClass(root, 'is-live');
               common.toggleClass(root, 'is-dvr', api.dvr);
            }

            // extensions
            extensions.forEach(function(e) {
               e(api, root);
            });

            // instances
            instances.push(api);

            // start
            if (conf.splash) api.unload(); else api.load();

            // disabled
            if (conf.disabled) api.disable();

            // initial callback
            api.one("ready", callback);


         }).on("load", function(e, api, video) {

            // unload others
            if (conf.splash) {
              common.find('.flowplayer.is-ready,.flowplayer.is-loading').forEach(function(el) {
                var playerId = el.getAttribute('data-flowplayer-instance-id');
                if (playerId === root.getAttribute('data-flowplayer-instance-id')) return;
                var a = instances[Number(playerId)];
                if (a && a.conf.splash) a.unload();
              });

            }

            // loading
            common.addClass(root, "is-loading");
            api.loading = true;

            if (typeof video.live !== 'undefined' || typeof video.dvr !== 'undefined') {
              common.toggleClass(root, 'is-live', video.dvr || video.live);
              common.toggleClass(root, 'is-dvr', !!video.dvr);
              api.live = video.dvr || video.live;
              api.dvr = !!video.dvr;
            }


         }).on("ready", function(e, api, video) {
            video.time = 0;
            api.video = video;

            common.removeClass(root, "is-loading");
            api.loading = false;

            // saved state
            if (api.muted) api.mute(true, true);
            else api.volume(api.volumeLevel);

            // see https://github.com/flowplayer/flowplayer/issues/479

            var hlsFix = api.conf.hlsFix && /mpegurl/i.exec(video.type);
            common.toggleClass(root, 'hls-fix', !!hlsFix);

         }).on("unload", function() {
            common.removeClass(root, "is-loading");
            api.loading = false;


         }).on("ready unload", function(e) {
           var is_ready = e.type == "ready";
           common.toggleClass(root, 'is-splash', !is_ready);
           common.toggleClass(root, 'is-ready', is_ready);
           api.ready = is_ready;
           api.splash = !is_ready;


         }).on("progress", function(e, api, time) {
            api.video.time = time;
         }).on('buffer', function(e, api, buffered) {
            api.video.buffer = typeof buffered === 'number' ? buffered : buffered[buffered.length - 1].end;
         }).on("speed", function(e, api, val) {
            api.currentSpeed = val;

         }).on("volume", function(e, api, level) {
            api.volumeLevel = Math.round(level * 100) / 100;
            if (!api.muted) storage.volume = level;
            else if (level) api.mute(false);


         }).on("beforeseek seek", function(e) {
            api.seeking = e.type == "beforeseek";
            common.toggleClass(root, 'is-seeking', api.seeking);

         }).on("ready pause resume unload finish stop", function(e) {

            // PAUSED: pause / finish
            api.paused = /pause|finish|unload|stop/.test(e.type);
            api.paused = api.paused || e.type === 'ready' && !conf.autoplay && !api.playing;

            // the opposite
            api.playing = !api.paused;

            // CSS classes
            common.toggleClass(root, 'is-paused', api.paused);
            common.toggleClass(root, 'is-playing', api.playing);

            // sanity check
            if (!api.load.ed) api.pause();

         }).on("finish", function() {
            api.finished = true;

         }).on("error", function() {
         });
      }

      // boot
      api.trigger('boot', [api, root]);
  return api;
}

},{"./common":1,"./ext/events":12,"./ext/resolve":21,"./ext/ui/bar-slider":28,"./ext/ui/slider":29,"bean":34,"extend-object":39,"is-function":42}],32:[function(_dereq_,module,exports){
/* eslint-disable no-unused-vars */

//Flowplayer with extensions

_dereq_('es5-shim');

var flowplayer = module.exports = _dereq_('./flowplayer');
//

//Support needed before engines
_dereq_('./ext/support');

//Engines
_dereq_('./engine/embed');
_dereq_('./engine/hlsjs');
_dereq_('./engine/html5');
_dereq_('./engine/flash');

//Extensions
//require('./ext/slider'); //TODO enable
_dereq_('./ext/ui');
_dereq_('./ext/message');
_dereq_('./ext/keyboard');
_dereq_('./ext/playlist');
_dereq_('./ext/cuepoint');
_dereq_('./ext/subtitle');
_dereq_('./ext/analytics');
_dereq_('./ext/share');
_dereq_('./ext/facebook');
_dereq_('./ext/twitter');
_dereq_('./ext/embed');
_dereq_('./ext/airplay');
_dereq_('./ext/chromecast');
_dereq_('./ext/qsel');
_dereq_('./ext/menu');
//Have to add fullscreen last
_dereq_('./ext/fullscreen');

_dereq_('./ext/mobile');
flowplayer(function(e,o){function a(e){var o=document.createElement("a");return o.href=e,t.hostname(o.hostname)}var l=function(e,o){var a=e.className.split(" ");-1===a.indexOf(o)&&(e.className+=" "+o)},r=function(e){return"none"!==window.getComputedStyle(e).display},n=e.conf,t=flowplayer.common,p=t.createElement,i=n.swf.indexOf("flowplayer.org")&&n.e&&o.getAttribute("data-origin"),f=i?a(i):t.hostname(),s=(document,n.key);if("file:"==location.protocol&&(f="localhost"),e.load.ed=1,n.hostname=f,n.origin=i||location.href,i&&l(o,"is-embedded"),"string"==typeof s&&(s=s.split(/,\s*/)),s&&"function"==typeof key_check&&key_check(s,f)){if(n.logo){var d=t.find(".fp-player",o)[0],c=n.logo.href||"",h=n.logo.src||n.logo,m=p("a",{className:"fp-logo",href:c});i&&(m.href=m.href||i),n.embed&&n.embed.popup&&(m.target="_blank");var y=p("img",{src:h});m.appendChild(y),(d||o).appendChild(m)}}else{var m=p("a",{href:"https://flowplayer.com/hello/?from=player"});o.appendChild(m);var u=p("div",{className:"fp-context-menu fp-menu"},'<strong>&copy; 2017 Flowplayer</strong><a href="https://flowplayer.com/hello/?from=player">About Flowplayer</a><a href="https://flowplayer.com/license">GPL based license</a>'),g=window.location.href.indexOf("localhost"),d=t.find(".fp-player",o)[0];7!==g&&(d||o).appendChild(u),e.on("pause resume finish unload ready",function(e,a){var l=-1;if(a.video.src)for(var n=[["org","flowplayer","drive"],["org","flowplayer","my"],["org","flowplayer","cdn"],["com","flowplayer","cdn"]],t=0;t<n.length&&(l=a.video.src.indexOf("://"+n[t].reverse().join(".")),-1===l);t++);if(/pause|resume/.test(e.type)&&"flash"!=a.engine.engineName&&4!=l&&5!=l){var p={display:"block",position:"absolute",left:"16px",bottom:"70px",zIndex:99999,width:"100px",height:"20px",backgroundImage:"url("+[".png","logo","/",".net",".cloudfront","d32wqyuo10o653","//"].reverse().join("")+")"};for(var i in p)p.hasOwnProperty(i)&&(m.style[i]=p[i]);a.load.ed=r(m)&&(7===g||u.parentNode==o||u.parentNode==d),a.load.ed||a.pause()}else m.style.display="none"})}});


},{"./engine/embed":2,"./engine/flash":3,"./engine/hlsjs":4,"./engine/html5":6,"./ext/airplay":7,"./ext/analytics":8,"./ext/chromecast":9,"./ext/cuepoint":10,"./ext/embed":11,"./ext/facebook":13,"./ext/fullscreen":14,"./ext/keyboard":15,"./ext/menu":16,"./ext/message":17,"./ext/mobile":18,"./ext/playlist":19,"./ext/qsel":20,"./ext/share":22,"./ext/subtitle":23,"./ext/support":25,"./ext/twitter":26,"./ext/ui":27,"./flowplayer":31,"es5-shim":38}],33:[function(_dereq_,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],34:[function(_dereq_,module,exports){
/*!
  * Bean - copyright (c) Jacob Thornton 2011-2012
  * https://github.com/fat/bean
  * MIT license
  */
(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else context[name] = definition()
})('bean', this, function (name, context) {
  name    = name    || 'bean'
  context = context || this

  var win            = window
    , old            = context[name]
    , namespaceRegex = /[^\.]*(?=\..*)\.|.*/
    , nameRegex      = /\..*/
    , addEvent       = 'addEventListener'
    , removeEvent    = 'removeEventListener'
    , doc            = document || {}
    , root           = doc.documentElement || {}
    , W3C_MODEL      = root[addEvent]
    , eventSupport   = W3C_MODEL ? addEvent : 'attachEvent'
    , ONE            = {} // singleton for quick matching making add() do one()

    , slice          = Array.prototype.slice
    , str2arr        = function (s, d) { return s.split(d || ' ') }
    , isString       = function (o) { return typeof o == 'string' }
    , isFunction     = function (o) { return typeof o == 'function' }

      // events that we consider to be 'native', anything not in this list will
      // be treated as a custom event
    , standardNativeEvents =
        'click dblclick mouseup mousedown contextmenu '                  + // mouse buttons
        'mousewheel mousemultiwheel DOMMouseScroll '                     + // mouse wheel
        'mouseover mouseout mousemove selectstart selectend '            + // mouse movement
        'keydown keypress keyup '                                        + // keyboard
        'orientationchange '                                             + // mobile
        'focus blur change reset select submit '                         + // form elements
        'load unload beforeunload resize move DOMContentLoaded '         + // window
        'readystatechange message '                                      + // window
        'error abort scroll '                                              // misc
      // element.fireEvent('onXYZ'... is not forgiving if we try to fire an event
      // that doesn't actually exist, so make sure we only do these on newer browsers
    , w3cNativeEvents =
        'show '                                                          + // mouse buttons
        'input invalid '                                                 + // form elements
        'touchstart touchmove touchend touchcancel '                     + // touch
        'gesturestart gesturechange gestureend '                         + // gesture
        'textinput '                                                     + // TextEvent
        'readystatechange pageshow pagehide popstate '                   + // window
        'hashchange offline online '                                     + // window
        'afterprint beforeprint '                                        + // printing
        'dragstart dragenter dragover dragleave drag drop dragend '      + // dnd
        'loadstart progress suspend emptied stalled loadmetadata '       + // media
        'loadeddata canplay canplaythrough playing waiting seeking '     + // media
        'seeked ended durationchange timeupdate play pause ratechange '  + // media
        'volumechange cuechange '                                        + // media
        'checking noupdate downloading cached updateready obsolete '       // appcache

      // convert to a hash for quick lookups
    , nativeEvents = (function (hash, events, i) {
        for (i = 0; i < events.length; i++) events[i] && (hash[events[i]] = 1)
        return hash
      }({}, str2arr(standardNativeEvents + (W3C_MODEL ? w3cNativeEvents : ''))))

      // custom events are events that we *fake*, they are not provided natively but
      // we can use native events to generate them
    , customEvents = (function () {
        var isAncestor = 'compareDocumentPosition' in root
              ? function (element, container) {
                  return container.compareDocumentPosition && (container.compareDocumentPosition(element) & 16) === 16
                }
              : 'contains' in root
                ? function (element, container) {
                    container = container.nodeType === 9 || container === window ? root : container
                    return container !== element && container.contains(element)
                  }
                : function (element, container) {
                    while (element = element.parentNode) if (element === container) return 1
                    return 0
                  }
          , check = function (event) {
              var related = event.relatedTarget
              return !related
                ? related == null
                : (related !== this && related.prefix !== 'xul' && !/document/.test(this.toString())
                    && !isAncestor(related, this))
            }

        return {
            mouseenter: { base: 'mouseover', condition: check }
          , mouseleave: { base: 'mouseout', condition: check }
          , mousewheel: { base: /Firefox/.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel' }
        }
      }())

      // we provide a consistent Event object across browsers by taking the actual DOM
      // event object and generating a new one from its properties.
    , Event = (function () {
            // a whitelist of properties (for different event types) tells us what to check for and copy
        var commonProps  = str2arr('altKey attrChange attrName bubbles cancelable ctrlKey currentTarget ' +
              'detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey '  +
              'srcElement target timeStamp type view which propertyName')
          , mouseProps   = commonProps.concat(str2arr('button buttons clientX clientY dataTransfer '      +
              'fromElement offsetX offsetY pageX pageY screenX screenY toElement'))
          , mouseWheelProps = mouseProps.concat(str2arr('wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ ' +
              'axis')) // 'axis' is FF specific
          , keyProps     = commonProps.concat(str2arr('char charCode key keyCode keyIdentifier '          +
              'keyLocation location'))
          , textProps    = commonProps.concat(str2arr('data'))
          , touchProps   = commonProps.concat(str2arr('touches targetTouches changedTouches scale rotation'))
          , messageProps = commonProps.concat(str2arr('data origin source'))
          , stateProps   = commonProps.concat(str2arr('state'))
          , overOutRegex = /over|out/
            // some event types need special handling and some need special properties, do that all here
          , typeFixers   = [
                { // key events
                    reg: /key/i
                  , fix: function (event, newEvent) {
                      newEvent.keyCode = event.keyCode || event.which
                      return keyProps
                    }
                }
              , { // mouse events
                    reg: /click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i
                  , fix: function (event, newEvent, type) {
                      newEvent.rightClick = event.which === 3 || event.button === 2
                      newEvent.pos = { x: 0, y: 0 }
                      if (event.pageX || event.pageY) {
                        newEvent.clientX = event.pageX
                        newEvent.clientY = event.pageY
                      } else if (event.clientX || event.clientY) {
                        newEvent.clientX = event.clientX + doc.body.scrollLeft + root.scrollLeft
                        newEvent.clientY = event.clientY + doc.body.scrollTop + root.scrollTop
                      }
                      if (overOutRegex.test(type)) {
                        newEvent.relatedTarget = event.relatedTarget
                          || event[(type == 'mouseover' ? 'from' : 'to') + 'Element']
                      }
                      return mouseProps
                    }
                }
              , { // mouse wheel events
                    reg: /mouse.*(wheel|scroll)/i
                  , fix: function () { return mouseWheelProps }
                }
              , { // TextEvent
                    reg: /^text/i
                  , fix: function () { return textProps }
                }
              , { // touch and gesture events
                    reg: /^touch|^gesture/i
                  , fix: function () { return touchProps }
                }
              , { // message events
                    reg: /^message$/i
                  , fix: function () { return messageProps }
                }
              , { // popstate events
                    reg: /^popstate$/i
                  , fix: function () { return stateProps }
                }
              , { // everything else
                    reg: /.*/
                  , fix: function () { return commonProps }
                }
            ]
          , typeFixerMap = {} // used to map event types to fixer functions (above), a basic cache mechanism

          , Event = function (event, element, isNative) {
              if (!arguments.length) return
              event = event || ((element.ownerDocument || element.document || element).parentWindow || win).event
              this.originalEvent = event
              this.isNative       = isNative
              this.isBean         = true

              if (!event) return

              var type   = event.type
                , target = event.target || event.srcElement
                , i, l, p, props, fixer

              this.target = target && target.nodeType === 3 ? target.parentNode : target

              if (isNative) { // we only need basic augmentation on custom events, the rest expensive & pointless
                fixer = typeFixerMap[type]
                if (!fixer) { // haven't encountered this event type before, map a fixer function for it
                  for (i = 0, l = typeFixers.length; i < l; i++) {
                    if (typeFixers[i].reg.test(type)) { // guaranteed to match at least one, last is .*
                      typeFixerMap[type] = fixer = typeFixers[i].fix
                      break
                    }
                  }
                }

                props = fixer(event, this, type)
                for (i = props.length; i--;) {
                  if (!((p = props[i]) in this) && p in event) this[p] = event[p]
                }
              }
            }

        // preventDefault() and stopPropagation() are a consistent interface to those functions
        // on the DOM, stop() is an alias for both of them together
        Event.prototype.preventDefault = function () {
          if (this.originalEvent.preventDefault) this.originalEvent.preventDefault()
          else this.originalEvent.returnValue = false
        }
        Event.prototype.stopPropagation = function () {
          if (this.originalEvent.stopPropagation) this.originalEvent.stopPropagation()
          else this.originalEvent.cancelBubble = true
        }
        Event.prototype.stop = function () {
          this.preventDefault()
          this.stopPropagation()
          this.stopped = true
        }
        // stopImmediatePropagation() has to be handled internally because we manage the event list for
        // each element
        // note that originalElement may be a Bean#Event object in some situations
        Event.prototype.stopImmediatePropagation = function () {
          if (this.originalEvent.stopImmediatePropagation) this.originalEvent.stopImmediatePropagation()
          this.isImmediatePropagationStopped = function () { return true }
        }
        Event.prototype.isImmediatePropagationStopped = function () {
          return this.originalEvent.isImmediatePropagationStopped && this.originalEvent.isImmediatePropagationStopped()
        }
        Event.prototype.clone = function (currentTarget) {
          //TODO: this is ripe for optimisation, new events are *expensive*
          // improving this will speed up delegated events
          var ne = new Event(this, this.element, this.isNative)
          ne.currentTarget = currentTarget
          return ne
        }

        return Event
      }())

      // if we're in old IE we can't do onpropertychange on doc or win so we use doc.documentElement for both
    , targetElement = function (element, isNative) {
        return !W3C_MODEL && !isNative && (element === doc || element === win) ? root : element
      }

      /**
        * Bean maintains an internal registry for event listeners. We don't touch elements, objects
        * or functions to identify them, instead we store everything in the registry.
        * Each event listener has a RegEntry object, we have one 'registry' for the whole instance.
        */
    , RegEntry = (function () {
        // each handler is wrapped so we can handle delegation and custom events
        var wrappedHandler = function (element, fn, condition, args) {
            var call = function (event, eargs) {
                  return fn.apply(element, args ? slice.call(eargs, event ? 0 : 1).concat(args) : eargs)
                }
              , findTarget = function (event, eventElement) {
                  return fn.__beanDel ? fn.__beanDel.ft(event.target, element) : eventElement
                }
              , handler = condition
                  ? function (event) {
                      var target = findTarget(event, this) // deleated event
                      if (condition.apply(target, arguments)) {
                        if (event) event.currentTarget = target
                        return call(event, arguments)
                      }
                    }
                  : function (event) {
                      if (fn.__beanDel) event = event.clone(findTarget(event)) // delegated event, fix the fix
                      return call(event, arguments)
                    }
            handler.__beanDel = fn.__beanDel
            return handler
          }

        , RegEntry = function (element, type, handler, original, namespaces, args, root) {
            var customType     = customEvents[type]
              , isNative

            if (type == 'unload') {
              // self clean-up
              handler = once(removeListener, element, type, handler, original)
            }

            if (customType) {
              if (customType.condition) {
                handler = wrappedHandler(element, handler, customType.condition, args)
              }
              type = customType.base || type
            }

            this.isNative      = isNative = nativeEvents[type] && !!element[eventSupport]
            this.customType    = !W3C_MODEL && !isNative && type
            this.element       = element
            this.type          = type
            this.original      = original
            this.namespaces    = namespaces
            this.eventType     = W3C_MODEL || isNative ? type : 'propertychange'
            this.target        = targetElement(element, isNative)
            this[eventSupport] = !!this.target[eventSupport]
            this.root          = root
            this.handler       = wrappedHandler(element, handler, null, args)
          }

        // given a list of namespaces, is our entry in any of them?
        RegEntry.prototype.inNamespaces = function (checkNamespaces) {
          var i, j, c = 0
          if (!checkNamespaces) return true
          if (!this.namespaces) return false
          for (i = checkNamespaces.length; i--;) {
            for (j = this.namespaces.length; j--;) {
              if (checkNamespaces[i] == this.namespaces[j]) c++
            }
          }
          return checkNamespaces.length === c
        }

        // match by element, original fn (opt), handler fn (opt)
        RegEntry.prototype.matches = function (checkElement, checkOriginal, checkHandler) {
          return this.element === checkElement &&
            (!checkOriginal || this.original === checkOriginal) &&
            (!checkHandler || this.handler === checkHandler)
        }

        return RegEntry
      }())

    , registry = (function () {
        // our map stores arrays by event type, just because it's better than storing
        // everything in a single array.
        // uses '$' as a prefix for the keys for safety and 'r' as a special prefix for
        // rootListeners so we can look them up fast
        var map = {}

          // generic functional search of our registry for matching listeners,
          // `fn` returns false to break out of the loop
          , forAll = function (element, type, original, handler, root, fn) {
              var pfx = root ? 'r' : '$'
              if (!type || type == '*') {
                // search the whole registry
                for (var t in map) {
                  if (t.charAt(0) == pfx) {
                    forAll(element, t.substr(1), original, handler, root, fn)
                  }
                }
              } else {
                var i = 0, l, list = map[pfx + type], all = element == '*'
                if (!list) return
                for (l = list.length; i < l; i++) {
                  if ((all || list[i].matches(element, original, handler)) && !fn(list[i], list, i, type)) return
                }
              }
            }

          , has = function (element, type, original, root) {
              // we're not using forAll here simply because it's a bit slower and this
              // needs to be fast
              var i, list = map[(root ? 'r' : '$') + type]
              if (list) {
                for (i = list.length; i--;) {
                  if (!list[i].root && list[i].matches(element, original, null)) return true
                }
              }
              return false
            }

          , get = function (element, type, original, root) {
              var entries = []
              forAll(element, type, original, null, root, function (entry) {
                return entries.push(entry)
              })
              return entries
            }

          , put = function (entry) {
              var has = !entry.root && !this.has(entry.element, entry.type, null, false)
                , key = (entry.root ? 'r' : '$') + entry.type
              ;(map[key] || (map[key] = [])).push(entry)
              return has
            }

          , del = function (entry) {
              forAll(entry.element, entry.type, null, entry.handler, entry.root, function (entry, list, i) {
                list.splice(i, 1)
                entry.removed = true
                if (list.length === 0) delete map[(entry.root ? 'r' : '$') + entry.type]
                return false
              })
            }

            // dump all entries, used for onunload
          , entries = function () {
              var t, entries = []
              for (t in map) {
                if (t.charAt(0) == '$') entries = entries.concat(map[t])
              }
              return entries
            }

        return { has: has, get: get, put: put, del: del, entries: entries }
      }())

      // we need a selector engine for delegated events, use querySelectorAll if it exists
      // but for older browsers we need Qwery, Sizzle or similar
    , selectorEngine
    , setSelectorEngine = function (e) {
        if (!arguments.length) {
          selectorEngine = doc.querySelectorAll
            ? function (s, r) {
                return r.querySelectorAll(s)
              }
            : function () {
                throw new Error('Bean: No selector engine installed') // eeek
              }
        } else {
          selectorEngine = e
        }
      }

      // we attach this listener to each DOM event that we need to listen to, only once
      // per event type per DOM element
    , rootListener = function (event, type) {
        if (!W3C_MODEL && type && event && event.propertyName != '_on' + type) return

        var listeners = registry.get(this, type || event.type, null, false)
          , l = listeners.length
          , i = 0

        event = new Event(event, this, true)
        if (type) event.type = type

        // iterate through all handlers registered for this type, calling them unless they have
        // been removed by a previous handler or stopImmediatePropagation() has been called
        for (; i < l && !event.isImmediatePropagationStopped(); i++) {
          if (!listeners[i].removed) listeners[i].handler.call(this, event)
        }
      }

      // add and remove listeners to DOM elements
    , listener = W3C_MODEL
        ? function (element, type, add) {
            // new browsers
            element[add ? addEvent : removeEvent](type, rootListener, false)
          }
        : function (element, type, add, custom) {
            // IE8 and below, use attachEvent/detachEvent and we have to piggy-back propertychange events
            // to simulate event bubbling etc.
            var entry
            if (add) {
              registry.put(entry = new RegEntry(
                  element
                , custom || type
                , function (event) { // handler
                    rootListener.call(element, event, custom)
                  }
                , rootListener
                , null
                , null
                , true // is root
              ))
              if (custom && element['_on' + custom] == null) element['_on' + custom] = 0
              entry.target.attachEvent('on' + entry.eventType, entry.handler)
            } else {
              entry = registry.get(element, custom || type, rootListener, true)[0]
              if (entry) {
                entry.target.detachEvent('on' + entry.eventType, entry.handler)
                registry.del(entry)
              }
            }
          }

    , once = function (rm, element, type, fn, originalFn) {
        // wrap the handler in a handler that does a remove as well
        return function () {
          fn.apply(this, arguments)
          rm(element, type, originalFn)
        }
      }

    , removeListener = function (element, orgType, handler, namespaces) {
        var type     = orgType && orgType.replace(nameRegex, '')
          , handlers = registry.get(element, type, null, false)
          , removed  = {}
          , i, l

        for (i = 0, l = handlers.length; i < l; i++) {
          if ((!handler || handlers[i].original === handler) && handlers[i].inNamespaces(namespaces)) {
            // TODO: this is problematic, we have a registry.get() and registry.del() that
            // both do registry searches so we waste cycles doing this. Needs to be rolled into
            // a single registry.forAll(fn) that removes while finding, but the catch is that
            // we'll be splicing the arrays that we're iterating over. Needs extra tests to
            // make sure we don't screw it up. @rvagg
            registry.del(handlers[i])
            if (!removed[handlers[i].eventType] && handlers[i][eventSupport])
              removed[handlers[i].eventType] = { t: handlers[i].eventType, c: handlers[i].type }
          }
        }
        // check each type/element for removed listeners and remove the rootListener where it's no longer needed
        for (i in removed) {
          if (!registry.has(element, removed[i].t, null, false)) {
            // last listener of this type, remove the rootListener
            listener(element, removed[i].t, false, removed[i].c)
          }
        }
      }

      // set up a delegate helper using the given selector, wrap the handler function
    , delegate = function (selector, fn) {
        //TODO: findTarget (therefore $) is called twice, once for match and once for
        // setting e.currentTarget, fix this so it's only needed once
        var findTarget = function (target, root) {
              var i, array = isString(selector) ? selectorEngine(selector, root) : selector
              for (; target && target !== root; target = target.parentNode) {
                for (i = array.length; i--;) {
                  if (array[i] === target) return target
                }
              }
            }
          , handler = function (e) {
              var match = findTarget(e.target, this)
              if (match) fn.apply(match, arguments)
            }

        // __beanDel isn't pleasant but it's a private function, not exposed outside of Bean
        handler.__beanDel = {
            ft       : findTarget // attach it here for customEvents to use too
          , selector : selector
        }
        return handler
      }

    , fireListener = W3C_MODEL ? function (isNative, type, element) {
        // modern browsers, do a proper dispatchEvent()
        var evt = doc.createEvent(isNative ? 'HTMLEvents' : 'UIEvents')
        evt[isNative ? 'initEvent' : 'initUIEvent'](type, true, true, win, 1)
        element.dispatchEvent(evt)
      } : function (isNative, type, element) {
        // old browser use onpropertychange, just increment a custom property to trigger the event
        element = targetElement(element, isNative)
        isNative ? element.fireEvent('on' + type, doc.createEventObject()) : element['_on' + type]++
      }

      /**
        * Public API: off(), on(), add(), (remove()), one(), fire(), clone()
        */

      /**
        * off(element[, eventType(s)[, handler ]])
        */
    , off = function (element, typeSpec, fn) {
        var isTypeStr = isString(typeSpec)
          , k, type, namespaces, i

        if (isTypeStr && typeSpec.indexOf(' ') > 0) {
          // off(el, 't1 t2 t3', fn) or off(el, 't1 t2 t3')
          typeSpec = str2arr(typeSpec)
          for (i = typeSpec.length; i--;)
            off(element, typeSpec[i], fn)
          return element
        }

        type = isTypeStr && typeSpec.replace(nameRegex, '')
        if (type && customEvents[type]) type = customEvents[type].base

        if (!typeSpec || isTypeStr) {
          // off(el) or off(el, t1.ns) or off(el, .ns) or off(el, .ns1.ns2.ns3)
          if (namespaces = isTypeStr && typeSpec.replace(namespaceRegex, '')) namespaces = str2arr(namespaces, '.')
          removeListener(element, type, fn, namespaces)
        } else if (isFunction(typeSpec)) {
          // off(el, fn)
          removeListener(element, null, typeSpec)
        } else {
          // off(el, { t1: fn1, t2, fn2 })
          for (k in typeSpec) {
            if (typeSpec.hasOwnProperty(k)) off(element, k, typeSpec[k])
          }
        }

        return element
      }

      /**
        * on(element, eventType(s)[, selector], handler[, args ])
        */
    , on = function(element, events, selector, fn) {
        var originalFn, type, types, i, args, entry, first

        //TODO: the undefined check means you can't pass an 'args' argument, fix this perhaps?
        if (selector === undefined && typeof events == 'object') {
          //TODO: this can't handle delegated events
          for (type in events) {
            if (events.hasOwnProperty(type)) {
              on.call(this, element, type, events[type])
            }
          }
          return
        }

        if (!isFunction(selector)) {
          // delegated event
          originalFn = fn
          args       = slice.call(arguments, 4)
          fn         = delegate(selector, originalFn, selectorEngine)
        } else {
          args       = slice.call(arguments, 3)
          fn         = originalFn = selector
        }

        types = str2arr(events)

        // special case for one(), wrap in a self-removing handler
        if (this === ONE) {
          fn = once(off, element, events, fn, originalFn)
        }

        for (i = types.length; i--;) {
          // add new handler to the registry and check if it's the first for this element/type
          first = registry.put(entry = new RegEntry(
              element
            , types[i].replace(nameRegex, '') // event type
            , fn
            , originalFn
            , str2arr(types[i].replace(namespaceRegex, ''), '.') // namespaces
            , args
            , false // not root
          ))
          if (entry[eventSupport] && first) {
            // first event of this type on this element, add root listener
            listener(element, entry.eventType, true, entry.customType)
          }
        }

        return element
      }

      /**
        * add(element[, selector], eventType(s), handler[, args ])
        *
        * Deprecated: kept (for now) for backward-compatibility
        */
    , add = function (element, events, fn, delfn) {
        return on.apply(
            null
          , !isString(fn)
              ? slice.call(arguments)
              : [ element, fn, events, delfn ].concat(arguments.length > 3 ? slice.call(arguments, 5) : [])
        )
      }

      /**
        * one(element, eventType(s)[, selector], handler[, args ])
        */
    , one = function () {
        return on.apply(ONE, arguments)
      }

      /**
        * fire(element, eventType(s)[, args ])
        *
        * The optional 'args' argument must be an array, if no 'args' argument is provided
        * then we can use the browser's DOM event system, otherwise we trigger handlers manually
        */
    , fire = function (element, type, args) {
        var types = str2arr(type)
          , i, j, l, names, handlers

        for (i = types.length; i--;) {
          type = types[i].replace(nameRegex, '')
          if (names = types[i].replace(namespaceRegex, '')) names = str2arr(names, '.')
          if (!names && !args && element[eventSupport]) {
            fireListener(nativeEvents[type], type, element)
          } else {
            // non-native event, either because of a namespace, arguments or a non DOM element
            // iterate over all listeners and manually 'fire'
            handlers = registry.get(element, type, null, false)
            args = [false].concat(args)
            for (j = 0, l = handlers.length; j < l; j++) {
              if (handlers[j].inNamespaces(names)) {
                handlers[j].handler.apply(element, args)
              }
            }
          }
        }
        return element
      }

      /**
        * clone(dstElement, srcElement[, eventType ])
        *
        * TODO: perhaps for consistency we should allow the same flexibility in type specifiers?
        */
    , clone = function (element, from, type) {
        var handlers = registry.get(from, type, null, false)
          , l = handlers.length
          , i = 0
          , args, beanDel

        for (; i < l; i++) {
          if (handlers[i].original) {
            args = [ element, handlers[i].type ]
            if (beanDel = handlers[i].handler.__beanDel) args.push(beanDel.selector)
            args.push(handlers[i].original)
            on.apply(null, args)
          }
        }
        return element
      }

    , bean = {
          'on'                : on
        , 'add'               : add
        , 'one'               : one
        , 'off'               : off
        , 'remove'            : off
        , 'clone'             : clone
        , 'fire'              : fire
        , 'Event'             : Event
        , 'setSelectorEngine' : setSelectorEngine
        , 'noConflict'        : function () {
            context[name] = old
            return this
          }
      }

  // for IE, clean up on unload to avoid leaks
  if (win.attachEvent) {
    var cleanup = function () {
      var i, entries = registry.entries()
      for (i in entries) {
        if (entries[i].type && entries[i].type !== 'unload') off(entries[i].element, entries[i].type)
      }
      win.detachEvent('onunload', cleanup)
      win.CollectGarbage && win.CollectGarbage()
    }
    win.attachEvent('onunload', cleanup)
  }

  // initialize selector engine to internal default (qSA or throw Error)
  setSelectorEngine()

  return bean
});

},{}],35:[function(_dereq_,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = _dereq_('base64-js')
var ieee754 = _dereq_('ieee754')
var isArray = _dereq_('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":33,"ieee754":40,"isarray":43}],36:[function(_dereq_,module,exports){
// contains, add, remove, toggle
var indexof = _dereq_('indexof')

module.exports = ClassList

function ClassList(elem) {
    var cl = elem.classList

    if (cl) {
        return cl
    }

    var classList = {
        add: add
        , remove: remove
        , contains: contains
        , toggle: toggle
        , toString: $toString
        , length: 0
        , item: item
    }

    return classList

    function add(token) {
        var list = getTokens()
        if (indexof(list, token) > -1) {
            return
        }
        list.push(token)
        setTokens(list)
    }

    function remove(token) {
        var list = getTokens()
            , index = indexof(list, token)

        if (index === -1) {
            return
        }

        list.splice(index, 1)
        setTokens(list)
    }

    function contains(token) {
        return indexof(getTokens(), token) > -1
    }

    function toggle(token) {
        if (contains(token)) {
            remove(token)
            return false
        } else {
            add(token)
            return true
        }
    }

    function $toString() {
        return elem.className
    }

    function item(index) {
        var tokens = getTokens()
        return tokens[index] || null
    }

    function getTokens() {
        var className = elem.className

        return filter(className.split(" "), isTruthy)
    }

    function setTokens(list) {
        var length = list.length

        elem.className = list.join(" ")
        classList.length = length

        for (var i = 0; i < list.length; i++) {
            classList[i] = list[i]
        }

        delete list[length]
    }
}

function filter (arr, fn) {
    var ret = []
    for (var i = 0; i < arr.length; i++) {
        if (fn(arr[i])) ret.push(arr[i])
    }
    return ret
}

function isTruthy(value) {
    return !!value
}

},{"indexof":41}],37:[function(_dereq_,module,exports){
// DEV: We don't use var but favor parameters since these play nicer with minification
function computedStyle(el, prop, getComputedStyle, style) {
  getComputedStyle = window.getComputedStyle;
  style =
      // If we have getComputedStyle
      getComputedStyle ?
        // Query it
        // TODO: From CSS-Query notes, we might need (node, null) for FF
        getComputedStyle(el) :

      // Otherwise, we are in IE and use currentStyle
        el.currentStyle;
  if (style) {
    return style
    [
      // Switch to camelCase for CSSOM
      // DEV: Grabbed from jQuery
      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
      prop.replace(/-(\w)/gi, function (word, letter) {
        return letter.toUpperCase();
      })
    ];
  }
}

module.exports = computedStyle;

},{}],38:[function(_dereq_,module,exports){
/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */

// vim: ts=4 sts=4 sw=4 expandtab

// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
;

// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
(function (root, factory) {
    'use strict';

    /* global define, exports, module */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function () {
    /**
     * Brings an environment as close to ECMAScript 5 compliance
     * as is possible with the facilities of erstwhile engines.
     *
     * Annotated ES5: http://es5.github.com/ (specific links below)
     * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
     * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
     */

    // Shortcut to an often accessed properties, in order to avoid multiple
    // dereference that costs universally. This also holds a reference to known-good
    // functions.
    var $Array = Array;
    var ArrayPrototype = $Array.prototype;
    var $Object = Object;
    var ObjectPrototype = $Object.prototype;
    var $Function = Function;
    var FunctionPrototype = $Function.prototype;
    var $String = String;
    var StringPrototype = $String.prototype;
    var $Number = Number;
    var NumberPrototype = $Number.prototype;
    var array_slice = ArrayPrototype.slice;
    var array_splice = ArrayPrototype.splice;
    var array_push = ArrayPrototype.push;
    var array_unshift = ArrayPrototype.unshift;
    var array_concat = ArrayPrototype.concat;
    var array_join = ArrayPrototype.join;
    var call = FunctionPrototype.call;
    var apply = FunctionPrototype.apply;
    var max = Math.max;
    var min = Math.min;

    // Having a toString local variable name breaks in Opera so use to_string.
    var to_string = ObjectPrototype.toString;

    /* global Symbol */
    /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
    var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, constructorRegex = /^\s*class /, isES6ClassFn = function isES6ClassFn(value) { try { var fnStr = fnToStr.call(value); var singleStripped = fnStr.replace(/\/\/.*\n/g, ''); var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, ''); var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' '); return constructorRegex.test(spaceStripped); } catch (e) { return false; /* not a function */ } }, tryFunctionObject = function tryFunctionObject(value) { try { if (isES6ClassFn(value)) { return false; } fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]', isCallable = function isCallable(value) { if (!value) { return false; } if (typeof value !== 'function' && typeof value !== 'object') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } if (isES6ClassFn(value)) { return false; } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };

    var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
    var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };
    /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */

    /* inlined from http://npmjs.com/define-properties */
    var supportsDescriptors = $Object.defineProperty && (function () {
        try {
            var obj = {};
            $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
            for (var _ in obj) { // jscs:ignore disallowUnusedVariables
                return false;
            }
            return obj.x === obj;
        } catch (e) { /* this is ES3 */
            return false;
        }
    }());
    var defineProperties = (function (has) {
        // Define configurable, writable, and non-enumerable props
        // if they don't exist.
        var defineProperty;
        if (supportsDescriptors) {
            defineProperty = function (object, name, method, forceAssign) {
                if (!forceAssign && (name in object)) {
                    return;
                }
                $Object.defineProperty(object, name, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: method
                });
            };
        } else {
            defineProperty = function (object, name, method, forceAssign) {
                if (!forceAssign && (name in object)) {
                    return;
                }
                object[name] = method;
            };
        }
        return function defineProperties(object, map, forceAssign) {
            for (var name in map) {
                if (has.call(map, name)) {
                    defineProperty(object, name, map[name], forceAssign);
                }
            }
        };
    }(ObjectPrototype.hasOwnProperty));

    //
    // Util
    // ======
    //

    /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */
    var isPrimitive = function isPrimitive(input) {
        var type = typeof input;
        return input === null || (type !== 'object' && type !== 'function');
    };

    var isActualNaN = $Number.isNaN || function isActualNaN(x) {
        return x !== x;
    };

    var ES = {
        // ES5 9.4
        // http://es5.github.com/#x9.4
        // http://jsperf.com/to-integer
        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */
        ToInteger: function ToInteger(num) {
            var n = +num;
            if (isActualNaN(n)) {
                n = 0;
            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
            return n;
        },

        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */
        ToPrimitive: function ToPrimitive(input) {
            var val, valueOf, toStr;
            if (isPrimitive(input)) {
                return input;
            }
            valueOf = input.valueOf;
            if (isCallable(valueOf)) {
                val = valueOf.call(input);
                if (isPrimitive(val)) {
                    return val;
                }
            }
            toStr = input.toString;
            if (isCallable(toStr)) {
                val = toStr.call(input);
                if (isPrimitive(val)) {
                    return val;
                }
            }
            throw new TypeError();
        },

        // ES5 9.9
        // http://es5.github.com/#x9.9
        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */
        ToObject: function (o) {
            if (o == null) { // this matches both null and undefined
                throw new TypeError("can't convert " + o + ' to object');
            }
            return $Object(o);
        },

        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */
        ToUint32: function ToUint32(x) {
            return x >>> 0;
        }
    };

    //
    // Function
    // ========
    //

    // ES-5 15.3.4.5
    // http://es5.github.com/#x15.3.4.5

    var Empty = function Empty() {};

    defineProperties(FunctionPrototype, {
        bind: function bind(that) { // .length is 1
            // 1. Let Target be the this value.
            var target = this;
            // 2. If IsCallable(Target) is false, throw a TypeError exception.
            if (!isCallable(target)) {
                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
            }
            // 3. Let A be a new (possibly empty) internal list of all of the
            //   argument values provided after thisArg (arg1, arg2 etc), in order.
            // XXX slicedArgs will stand in for "A" if used
            var args = array_slice.call(arguments, 1); // for normal call
            // 4. Let F be a new native ECMAScript object.
            // 11. Set the [[Prototype]] internal property of F to the standard
            //   built-in Function prototype object as specified in 15.3.3.1.
            // 12. Set the [[Call]] internal property of F as described in
            //   15.3.4.5.1.
            // 13. Set the [[Construct]] internal property of F as described in
            //   15.3.4.5.2.
            // 14. Set the [[HasInstance]] internal property of F as described in
            //   15.3.4.5.3.
            var bound;
            var binder = function () {

                if (this instanceof bound) {
                    // 15.3.4.5.2 [[Construct]]
                    // When the [[Construct]] internal method of a function object,
                    // F that was created using the bind function is called with a
                    // list of arguments ExtraArgs, the following steps are taken:
                    // 1. Let target be the value of F's [[TargetFunction]]
                    //   internal property.
                    // 2. If target has no [[Construct]] internal method, a
                    //   TypeError exception is thrown.
                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Construct]] internal
                    //   method of target providing args as the arguments.

                    var result = apply.call(
                        target,
                        this,
                        array_concat.call(args, array_slice.call(arguments))
                    );
                    if ($Object(result) === result) {
                        return result;
                    }
                    return this;

                } else {
                    // 15.3.4.5.1 [[Call]]
                    // When the [[Call]] internal method of a function object, F,
                    // which was created using the bind function is called with a
                    // this value and a list of arguments ExtraArgs, the following
                    // steps are taken:
                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
                    //   property.
                    // 3. Let target be the value of F's [[TargetFunction]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Call]] internal method
                    //   of target providing boundThis as the this value and
                    //   providing args as the arguments.

                    // equiv: target.call(this, ...boundArgs, ...args)
                    return apply.call(
                        target,
                        that,
                        array_concat.call(args, array_slice.call(arguments))
                    );

                }

            };

            // 15. If the [[Class]] internal property of Target is "Function", then
            //     a. Let L be the length property of Target minus the length of A.
            //     b. Set the length own property of F to either 0 or L, whichever is
            //       larger.
            // 16. Else set the length own property of F to 0.

            var boundLength = max(0, target.length - args.length);

            // 17. Set the attributes of the length own property of F to the values
            //   specified in 15.3.5.1.
            var boundArgs = [];
            for (var i = 0; i < boundLength; i++) {
                array_push.call(boundArgs, '$' + i);
            }

            // XXX Build a dynamic function with desired amount of arguments is the only
            // way to set the length property of a function.
            // In environments where Content Security Policies enabled (Chrome extensions,
            // for ex.) all use of eval or Function costructor throws an exception.
            // However in all of these environments Function.prototype.bind exists
            // and so this code will never be executed.
            bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);

            if (target.prototype) {
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
                // Clean up dangling references.
                Empty.prototype = null;
            }

            // TODO
            // 18. Set the [[Extensible]] internal property of F to true.

            // TODO
            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
            // 20. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
            //   false.
            // 21. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
            //   and false.

            // TODO
            // NOTE Function objects created using Function.prototype.bind do not
            // have a prototype property or the [[Code]], [[FormalParameters]], and
            // [[Scope]] internal properties.
            // XXX can't delete prototype in pure-js.

            // 22. Return F.
            return bound;
        }
    });

    // _Please note: Shortcuts are defined after `Function.prototype.bind` as we
    // use it in defining shortcuts.
    var owns = call.bind(ObjectPrototype.hasOwnProperty);
    var toStr = call.bind(ObjectPrototype.toString);
    var arraySlice = call.bind(array_slice);
    var arraySliceApply = apply.bind(array_slice);
    var strSlice = call.bind(StringPrototype.slice);
    var strSplit = call.bind(StringPrototype.split);
    var strIndexOf = call.bind(StringPrototype.indexOf);
    var pushCall = call.bind(array_push);
    var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
    var arraySort = call.bind(ArrayPrototype.sort);

    //
    // Array
    // =====
    //

    var isArray = $Array.isArray || function isArray(obj) {
        return toStr(obj) === '[object Array]';
    };

    // ES5 15.4.4.12
    // http://es5.github.com/#x15.4.4.13
    // Return len+argCount.
    // [bugfix, ielt8]
    // IE < 8 bug: [].unshift(0) === undefined but should be "1"
    var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
    defineProperties(ArrayPrototype, {
        unshift: function () {
            array_unshift.apply(this, arguments);
            return this.length;
        }
    }, hasUnshiftReturnValueBug);

    // ES5 15.4.3.2
    // http://es5.github.com/#x15.4.3.2
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
    defineProperties($Array, { isArray: isArray });

    // The IsCallable() check in the Array functions
    // has been replaced with a strict check on the
    // internal class of the object to trap cases where
    // the provided function was actually a regular
    // expression literal, which in V8 and
    // JavaScriptCore is a typeof "function".  Only in
    // V8 are regular expression literals permitted as
    // reduce parameters, so it is desirable in the
    // general case for the shim to match the more
    // strict and common behavior of rejecting regular
    // expressions.

    // ES5 15.4.4.18
    // http://es5.github.com/#x15.4.4.18
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

    // Check failure of by-index access of string characters (IE < 9)
    // and failure of `0 in boxedString` (Rhino)
    var boxedString = $Object('a');
    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

    var properlyBoxesContext = function properlyBoxed(method) {
        // Check node 0.6.21 bug where third parameter is not boxed
        var properlyBoxesNonStrict = true;
        var properlyBoxesStrict = true;
        var threwException = false;
        if (method) {
            try {
                method.call('foo', function (_, __, context) {
                    if (typeof context !== 'object') {
                        properlyBoxesNonStrict = false;
                    }
                });

                method.call([1], function () {
                    'use strict';

                    properlyBoxesStrict = typeof this === 'string';
                }, 'x');
            } catch (e) {
                threwException = true;
            }
        }
        return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
    };

    defineProperties(ArrayPrototype, {
        forEach: function forEach(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var i = -1;
            var length = ES.ToUint32(self.length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.forEach callback must be a function');
            }

            while (++i < length) {
                if (i in self) {
                    // Invoke the callback function with call, passing arguments:
                    // context, property value, property key, thisArg object
                    if (typeof T === 'undefined') {
                        callbackfn(self[i], i, object);
                    } else {
                        callbackfn.call(T, self[i], i, object);
                    }
                }
            }
        }
    }, !properlyBoxesContext(ArrayPrototype.forEach));

    // ES5 15.4.4.19
    // http://es5.github.com/#x15.4.4.19
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
    defineProperties(ArrayPrototype, {
        map: function map(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var result = $Array(length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.map callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self) {
                    if (typeof T === 'undefined') {
                        result[i] = callbackfn(self[i], i, object);
                    } else {
                        result[i] = callbackfn.call(T, self[i], i, object);
                    }
                }
            }
            return result;
        }
    }, !properlyBoxesContext(ArrayPrototype.map));

    // ES5 15.4.4.20
    // http://es5.github.com/#x15.4.4.20
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
    defineProperties(ArrayPrototype, {
        filter: function filter(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var result = [];
            var value;
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.filter callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self) {
                    value = self[i];
                    if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {
                        pushCall(result, value);
                    }
                }
            }
            return result;
        }
    }, !properlyBoxesContext(ArrayPrototype.filter));

    // ES5 15.4.4.16
    // http://es5.github.com/#x15.4.4.16
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
    defineProperties(ArrayPrototype, {
        every: function every(callbackfn/*, thisArg*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.every callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                    return false;
                }
            }
            return true;
        }
    }, !properlyBoxesContext(ArrayPrototype.every));

    // ES5 15.4.4.17
    // http://es5.github.com/#x15.4.4.17
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
    defineProperties(ArrayPrototype, {
        some: function some(callbackfn/*, thisArg */) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);
            var T;
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.some callback must be a function');
            }

            for (var i = 0; i < length; i++) {
                if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                    return true;
                }
            }
            return false;
        }
    }, !properlyBoxesContext(ArrayPrototype.some));

    // ES5 15.4.4.21
    // http://es5.github.com/#x15.4.4.21
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
    var reduceCoercesToObject = false;
    if (ArrayPrototype.reduce) {
        reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
            return list;
        }) === 'object';
    }
    defineProperties(ArrayPrototype, {
        reduce: function reduce(callbackfn/*, initialValue*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.reduce callback must be a function');
            }

            // no value to return if no initial value and an empty array
            if (length === 0 && arguments.length === 1) {
                throw new TypeError('reduce of empty array with no initial value');
            }

            var i = 0;
            var result;
            if (arguments.length >= 2) {
                result = arguments[1];
            } else {
                do {
                    if (i in self) {
                        result = self[i++];
                        break;
                    }

                    // if array contains no values, no initial value to return
                    if (++i >= length) {
                        throw new TypeError('reduce of empty array with no initial value');
                    }
                } while (true);
            }

            for (; i < length; i++) {
                if (i in self) {
                    result = callbackfn(result, self[i], i, object);
                }
            }

            return result;
        }
    }, !reduceCoercesToObject);

    // ES5 15.4.4.22
    // http://es5.github.com/#x15.4.4.22
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
    var reduceRightCoercesToObject = false;
    if (ArrayPrototype.reduceRight) {
        reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
            return list;
        }) === 'object';
    }
    defineProperties(ArrayPrototype, {
        reduceRight: function reduceRight(callbackfn/*, initial*/) {
            var object = ES.ToObject(this);
            var self = splitString && isString(this) ? strSplit(this, '') : object;
            var length = ES.ToUint32(self.length);

            // If no callback function or if callback is not a callable function
            if (!isCallable(callbackfn)) {
                throw new TypeError('Array.prototype.reduceRight callback must be a function');
            }

            // no value to return if no initial value, empty array
            if (length === 0 && arguments.length === 1) {
                throw new TypeError('reduceRight of empty array with no initial value');
            }

            var result;
            var i = length - 1;
            if (arguments.length >= 2) {
                result = arguments[1];
            } else {
                do {
                    if (i in self) {
                        result = self[i--];
                        break;
                    }

                    // if array contains no values, no initial value to return
                    if (--i < 0) {
                        throw new TypeError('reduceRight of empty array with no initial value');
                    }
                } while (true);
            }

            if (i < 0) {
                return result;
            }

            do {
                if (i in self) {
                    result = callbackfn(result, self[i], i, object);
                }
            } while (i--);

            return result;
        }
    }, !reduceRightCoercesToObject);

    // ES5 15.4.4.14
    // http://es5.github.com/#x15.4.4.14
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
    defineProperties(ArrayPrototype, {
        indexOf: function indexOf(searchElement/*, fromIndex */) {
            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
            var length = ES.ToUint32(self.length);

            if (length === 0) {
                return -1;
            }

            var i = 0;
            if (arguments.length > 1) {
                i = ES.ToInteger(arguments[1]);
            }

            // handle negative indices
            i = i >= 0 ? i : max(0, length + i);
            for (; i < length; i++) {
                if (i in self && self[i] === searchElement) {
                    return i;
                }
            }
            return -1;
        }
    }, hasFirefox2IndexOfBug);

    // ES5 15.4.4.15
    // http://es5.github.com/#x15.4.4.15
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
    var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
    defineProperties(ArrayPrototype, {
        lastIndexOf: function lastIndexOf(searchElement/*, fromIndex */) {
            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
            var length = ES.ToUint32(self.length);

            if (length === 0) {
                return -1;
            }
            var i = length - 1;
            if (arguments.length > 1) {
                i = min(i, ES.ToInteger(arguments[1]));
            }
            // handle negative indices
            i = i >= 0 ? i : length - Math.abs(i);
            for (; i >= 0; i--) {
                if (i in self && searchElement === self[i]) {
                    return i;
                }
            }
            return -1;
        }
    }, hasFirefox2LastIndexOfBug);

    // ES5 15.4.4.12
    // http://es5.github.com/#x15.4.4.12
    var spliceNoopReturnsEmptyArray = (function () {
        var a = [1, 2];
        var result = a.splice();
        return a.length === 2 && isArray(result) && result.length === 0;
    }());
    defineProperties(ArrayPrototype, {
        // Safari 5.0 bug where .splice() returns undefined
        splice: function splice(start, deleteCount) {
            if (arguments.length === 0) {
                return [];
            } else {
                return array_splice.apply(this, arguments);
            }
        }
    }, !spliceNoopReturnsEmptyArray);

    var spliceWorksWithEmptyObject = (function () {
        var obj = {};
        ArrayPrototype.splice.call(obj, 0, 0, 1);
        return obj.length === 1;
    }());
    defineProperties(ArrayPrototype, {
        splice: function splice(start, deleteCount) {
            if (arguments.length === 0) {
                return [];
            }
            var args = arguments;
            this.length = max(ES.ToInteger(this.length), 0);
            if (arguments.length > 0 && typeof deleteCount !== 'number') {
                args = arraySlice(arguments);
                if (args.length < 2) {
                    pushCall(args, this.length - start);
                } else {
                    args[1] = ES.ToInteger(deleteCount);
                }
            }
            return array_splice.apply(this, args);
        }
    }, !spliceWorksWithEmptyObject);
    var spliceWorksWithLargeSparseArrays = (function () {
        // Per https://github.com/es-shims/es5-shim/issues/295
        // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
        var arr = new $Array(1e5);
        // note: the index MUST be 8 or larger or the test will false pass
        arr[8] = 'x';
        arr.splice(1, 1);
        // note: this test must be defined *after* the indexOf shim
        // per https://github.com/es-shims/es5-shim/issues/313
        return arr.indexOf('x') === 7;
    }());
    var spliceWorksWithSmallSparseArrays = (function () {
        // Per https://github.com/es-shims/es5-shim/issues/295
        // Opera 12.15 breaks on this, no idea why.
        var n = 256;
        var arr = [];
        arr[n] = 'a';
        arr.splice(n + 1, 0, 'b');
        return arr[n] === 'a';
    }());
    defineProperties(ArrayPrototype, {
        splice: function splice(start, deleteCount) {
            var O = ES.ToObject(this);
            var A = [];
            var len = ES.ToUint32(O.length);
            var relativeStart = ES.ToInteger(start);
            var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);
            var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);

            var k = 0;
            var from;
            while (k < actualDeleteCount) {
                from = $String(actualStart + k);
                if (owns(O, from)) {
                    A[k] = O[from];
                }
                k += 1;
            }

            var items = arraySlice(arguments, 2);
            var itemCount = items.length;
            var to;
            if (itemCount < actualDeleteCount) {
                k = actualStart;
                var maxK = len - actualDeleteCount;
                while (k < maxK) {
                    from = $String(k + actualDeleteCount);
                    to = $String(k + itemCount);
                    if (owns(O, from)) {
                        O[to] = O[from];
                    } else {
                        delete O[to];
                    }
                    k += 1;
                }
                k = len;
                var minK = len - actualDeleteCount + itemCount;
                while (k > minK) {
                    delete O[k - 1];
                    k -= 1;
                }
            } else if (itemCount > actualDeleteCount) {
                k = len - actualDeleteCount;
                while (k > actualStart) {
                    from = $String(k + actualDeleteCount - 1);
                    to = $String(k + itemCount - 1);
                    if (owns(O, from)) {
                        O[to] = O[from];
                    } else {
                        delete O[to];
                    }
                    k -= 1;
                }
            }
            k = actualStart;
            for (var i = 0; i < items.length; ++i) {
                O[k] = items[i];
                k += 1;
            }
            O.length = len - actualDeleteCount + itemCount;

            return A;
        }
    }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);

    var originalJoin = ArrayPrototype.join;
    var hasStringJoinBug;
    try {
        hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
    } catch (e) {
        hasStringJoinBug = true;
    }
    if (hasStringJoinBug) {
        defineProperties(ArrayPrototype, {
            join: function join(separator) {
                var sep = typeof separator === 'undefined' ? ',' : separator;
                return originalJoin.call(isString(this) ? strSplit(this, '') : this, sep);
            }
        }, hasStringJoinBug);
    }

    var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';
    if (hasJoinUndefinedBug) {
        defineProperties(ArrayPrototype, {
            join: function join(separator) {
                var sep = typeof separator === 'undefined' ? ',' : separator;
                return originalJoin.call(this, sep);
            }
        }, hasJoinUndefinedBug);
    }

    var pushShim = function push(item) {
        var O = ES.ToObject(this);
        var n = ES.ToUint32(O.length);
        var i = 0;
        while (i < arguments.length) {
            O[n + i] = arguments[i];
            i += 1;
        }
        O.length = n + i;
        return n + i;
    };

    var pushIsNotGeneric = (function () {
        var obj = {};
        var result = Array.prototype.push.call(obj, undefined);
        return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);
    }());
    defineProperties(ArrayPrototype, {
        push: function push(item) {
            if (isArray(this)) {
                return array_push.apply(this, arguments);
            }
            return pushShim.apply(this, arguments);
        }
    }, pushIsNotGeneric);

    // This fixes a very weird bug in Opera 10.6 when pushing `undefined
    var pushUndefinedIsWeird = (function () {
        var arr = [];
        var result = arr.push(undefined);
        return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);
    }());
    defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);

    // ES5 15.2.3.14
    // http://es5.github.io/#x15.4.4.10
    // Fix boxed string bug
    defineProperties(ArrayPrototype, {
        slice: function (start, end) {
            var arr = isString(this) ? strSplit(this, '') : this;
            return arraySliceApply(arr, arguments);
        }
    }, splitString);

    var sortIgnoresNonFunctions = (function () {
        try {
            [1, 2].sort(null);
            [1, 2].sort({});
            return true;
        } catch (e) {}
        return false;
    }());
    var sortThrowsOnRegex = (function () {
        // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`
        try {
            [1, 2].sort(/a/);
            return false;
        } catch (e) {}
        return true;
    }());
    var sortIgnoresUndefined = (function () {
        // applies in IE 8, for one.
        try {
            [1, 2].sort(undefined);
            return true;
        } catch (e) {}
        return false;
    }());
    defineProperties(ArrayPrototype, {
        sort: function sort(compareFn) {
            if (typeof compareFn === 'undefined') {
                return arraySort(this);
            }
            if (!isCallable(compareFn)) {
                throw new TypeError('Array.prototype.sort callback must be a function');
            }
            return arraySort(this, compareFn);
        }
    }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);

    //
    // Object
    // ======
    //

    // ES5 15.2.3.14
    // http://es5.github.com/#x15.2.3.14

    // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
    var hasDontEnumBug = !isEnum({ 'toString': null }, 'toString');
    var hasProtoEnumBug = isEnum(function () {}, 'prototype');
    var hasStringEnumBug = !owns('x', '0');
    var equalsConstructorPrototype = function (o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
    };
    var blacklistedKeys = {
        $window: true,
        $console: true,
        $parent: true,
        $self: true,
        $frame: true,
        $frames: true,
        $frameElement: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $external: true
    };
    var hasAutomationEqualityBug = (function () {
        /* globals window */
        if (typeof window === 'undefined') {
            return false;
        }
        for (var k in window) {
            try {
                if (!blacklistedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {
                    equalsConstructorPrototype(window[k]);
                }
            } catch (e) {
                return true;
            }
        }
        return false;
    }());
    var equalsConstructorPrototypeIfNotBuggy = function (object) {
        if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(object);
        }
        try {
            return equalsConstructorPrototype(object);
        } catch (e) {
            return false;
        }
    };
    var dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ];
    var dontEnumsLength = dontEnums.length;

    // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
    // can be replaced with require('is-arguments') if we ever use a build process instead
    var isStandardArguments = function isArguments(value) {
        return toStr(value) === '[object Arguments]';
    };
    var isLegacyArguments = function isArguments(value) {
        return value !== null &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            value.length >= 0 &&
            !isArray(value) &&
            isCallable(value.callee);
    };
    var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;

    defineProperties($Object, {
        keys: function keys(object) {
            var isFn = isCallable(object);
            var isArgs = isArguments(object);
            var isObject = object !== null && typeof object === 'object';
            var isStr = isObject && isString(object);

            if (!isObject && !isFn && !isArgs) {
                throw new TypeError('Object.keys called on a non-object');
            }

            var theKeys = [];
            var skipProto = hasProtoEnumBug && isFn;
            if ((isStr && hasStringEnumBug) || isArgs) {
                for (var i = 0; i < object.length; ++i) {
                    pushCall(theKeys, $String(i));
                }
            }

            if (!isArgs) {
                for (var name in object) {
                    if (!(skipProto && name === 'prototype') && owns(object, name)) {
                        pushCall(theKeys, $String(name));
                    }
                }
            }

            if (hasDontEnumBug) {
                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
                for (var j = 0; j < dontEnumsLength; j++) {
                    var dontEnum = dontEnums[j];
                    if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
                        pushCall(theKeys, dontEnum);
                    }
                }
            }
            return theKeys;
        }
    });

    var keysWorksWithArguments = $Object.keys && (function () {
        // Safari 5.0 bug
        return $Object.keys(arguments).length === 2;
    }(1, 2));
    var keysHasArgumentsLengthBug = $Object.keys && (function () {
        var argKeys = $Object.keys(arguments);
        return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
    }(1));
    var originalKeys = $Object.keys;
    defineProperties($Object, {
        keys: function keys(object) {
            if (isArguments(object)) {
                return originalKeys(arraySlice(object));
            } else {
                return originalKeys(object);
            }
        }
    }, !keysWorksWithArguments || keysHasArgumentsLengthBug);

    //
    // Date
    // ====
    //

    var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
    var aNegativeTestDate = new Date(-1509842289600292);
    var aPositiveTestDate = new Date(1449662400000);
    var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';
    var hasToDateStringFormatBug;
    var hasToStringFormatBug;
    var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();
    if (timeZoneOffset < -720) {
        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';
        hasToStringFormatBug = !(/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
    } else {
        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';
        hasToStringFormatBug = !(/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
    }

    var originalGetFullYear = call.bind(Date.prototype.getFullYear);
    var originalGetMonth = call.bind(Date.prototype.getMonth);
    var originalGetDate = call.bind(Date.prototype.getDate);
    var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);
    var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);
    var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);
    var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);
    var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);
    var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);
    var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);
    var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);
    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var daysInMonth = function daysInMonth(month, year) {
        return originalGetDate(new Date(year, month, 0));
    };

    defineProperties(Date.prototype, {
        getFullYear: function getFullYear() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetFullYear(this);
            if (year < 0 && originalGetMonth(this) > 11) {
                return year + 1;
            }
            return year;
        },
        getMonth: function getMonth() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetFullYear(this);
            var month = originalGetMonth(this);
            if (year < 0 && month > 11) {
                return 0;
            }
            return month;
        },
        getDate: function getDate() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetFullYear(this);
            var month = originalGetMonth(this);
            var date = originalGetDate(this);
            if (year < 0 && month > 11) {
                if (month === 12) {
                    return date;
                }
                var days = daysInMonth(0, year + 1);
                return (days - date) + 1;
            }
            return date;
        },
        getUTCFullYear: function getUTCFullYear() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetUTCFullYear(this);
            if (year < 0 && originalGetUTCMonth(this) > 11) {
                return year + 1;
            }
            return year;
        },
        getUTCMonth: function getUTCMonth() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetUTCFullYear(this);
            var month = originalGetUTCMonth(this);
            if (year < 0 && month > 11) {
                return 0;
            }
            return month;
        },
        getUTCDate: function getUTCDate() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var year = originalGetUTCFullYear(this);
            var month = originalGetUTCMonth(this);
            var date = originalGetUTCDate(this);
            if (year < 0 && month > 11) {
                if (month === 12) {
                    return date;
                }
                var days = daysInMonth(0, year + 1);
                return (days - date) + 1;
            }
            return date;
        }
    }, hasNegativeMonthYearBug);

    defineProperties(Date.prototype, {
        toUTCString: function toUTCString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var day = originalGetUTCDay(this);
            var date = originalGetUTCDate(this);
            var month = originalGetUTCMonth(this);
            var year = originalGetUTCFullYear(this);
            var hour = originalGetUTCHours(this);
            var minute = originalGetUTCMinutes(this);
            var second = originalGetUTCSeconds(this);
            return dayName[day] + ', ' +
                (date < 10 ? '0' + date : date) + ' ' +
                monthName[month] + ' ' +
                year + ' ' +
                (hour < 10 ? '0' + hour : hour) + ':' +
                (minute < 10 ? '0' + minute : minute) + ':' +
                (second < 10 ? '0' + second : second) + ' GMT';
        }
    }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);

    // Opera 12 has `,`
    defineProperties(Date.prototype, {
        toDateString: function toDateString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var day = this.getDay();
            var date = this.getDate();
            var month = this.getMonth();
            var year = this.getFullYear();
            return dayName[day] + ' ' +
                monthName[month] + ' ' +
                (date < 10 ? '0' + date : date) + ' ' +
                year;
        }
    }, hasNegativeMonthYearBug || hasToDateStringFormatBug);

    // can't use defineProperties here because of toString enumeration issue in IE <= 8
    if (hasNegativeMonthYearBug || hasToStringFormatBug) {
        Date.prototype.toString = function toString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError('this is not a Date object.');
            }
            var day = this.getDay();
            var date = this.getDate();
            var month = this.getMonth();
            var year = this.getFullYear();
            var hour = this.getHours();
            var minute = this.getMinutes();
            var second = this.getSeconds();
            var timezoneOffset = this.getTimezoneOffset();
            var hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
            var minutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);
            return dayName[day] + ' ' +
                monthName[month] + ' ' +
                (date < 10 ? '0' + date : date) + ' ' +
                year + ' ' +
                (hour < 10 ? '0' + hour : hour) + ':' +
                (minute < 10 ? '0' + minute : minute) + ':' +
                (second < 10 ? '0' + second : second) + ' GMT' +
                (timezoneOffset > 0 ? '-' : '+') +
                (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset) +
                (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);
        };
        if (supportsDescriptors) {
            $Object.defineProperty(Date.prototype, 'toString', {
                configurable: true,
                enumerable: false,
                writable: true
            });
        }
    }

    // ES5 15.9.5.43
    // http://es5.github.com/#x15.9.5.43
    // This function returns a String value represent the instance in time
    // represented by this Date object. The format of the String is the Date Time
    // string format defined in 15.9.1.15. All fields are present in the String.
    // The time zone is always UTC, denoted by the suffix Z. If the time value of
    // this object is not a finite Number a RangeError exception is thrown.
    var negativeDate = -62198755200000;
    var negativeYearString = '-000001';
    var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;
    var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';

    var getTime = call.bind(Date.prototype.getTime);

    defineProperties(Date.prototype, {
        toISOString: function toISOString() {
            if (!isFinite(this) || !isFinite(getTime(this))) {
                // Adope Photoshop requires the second check.
                throw new RangeError('Date.prototype.toISOString called on non-finite value.');
            }

            var year = originalGetUTCFullYear(this);

            var month = originalGetUTCMonth(this);
            // see https://github.com/es-shims/es5-shim/issues/111
            year += Math.floor(month / 12);
            month = (month % 12 + 12) % 12;

            // the date time string format is specified in 15.9.1.15.
            var result = [month + 1, originalGetUTCDate(this), originalGetUTCHours(this), originalGetUTCMinutes(this), originalGetUTCSeconds(this)];
            year = (
                (year < 0 ? '-' : (year > 9999 ? '+' : '')) +
                strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)
            );

            for (var i = 0; i < result.length; ++i) {
                // pad months, days, hours, minutes, and seconds to have two digits.
                result[i] = strSlice('00' + result[i], -2);
            }
            // pad milliseconds to have three digits.
            return (
                year + '-' + arraySlice(result, 0, 2).join('-') +
                'T' + arraySlice(result, 2).join(':') + '.' +
                strSlice('000' + originalGetUTCMilliseconds(this), -3) + 'Z'
            );
        }
    }, hasNegativeDateBug || hasSafari51DateBug);

    // ES5 15.9.5.44
    // http://es5.github.com/#x15.9.5.44
    // This function provides a String representation of a Date object for use by
    // JSON.stringify (15.12.3).
    var dateToJSONIsSupported = (function () {
        try {
            return Date.prototype.toJSON &&
                new Date(NaN).toJSON() === null &&
                new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&
                Date.prototype.toJSON.call({ // generic
                    toISOString: function () { return true; }
                });
        } catch (e) {
            return false;
        }
    }());
    if (!dateToJSONIsSupported) {
        Date.prototype.toJSON = function toJSON(key) {
            // When the toJSON method is called with argument key, the following
            // steps are taken:

            // 1.  Let O be the result of calling ToObject, giving it the this
            // value as its argument.
            // 2. Let tv be ES.ToPrimitive(O, hint Number).
            var O = $Object(this);
            var tv = ES.ToPrimitive(O);
            // 3. If tv is a Number and is not finite, return null.
            if (typeof tv === 'number' && !isFinite(tv)) {
                return null;
            }
            // 4. Let toISO be the result of calling the [[Get]] internal method of
            // O with argument "toISOString".
            var toISO = O.toISOString;
            // 5. If IsCallable(toISO) is false, throw a TypeError exception.
            if (!isCallable(toISO)) {
                throw new TypeError('toISOString property is not callable');
            }
            // 6. Return the result of calling the [[Call]] internal method of
            //  toISO with O as the this value and an empty argument list.
            return toISO.call(O);

            // NOTE 1 The argument is ignored.

            // NOTE 2 The toJSON function is intentionally generic; it does not
            // require that its this value be a Date object. Therefore, it can be
            // transferred to other kinds of objects for use as a method. However,
            // it does require that any such object have a toISOString method. An
            // object is free to use the argument key to filter its
            // stringification.
        };
    }

    // ES5 15.9.4.2
    // http://es5.github.com/#x15.9.4.2
    // based on work shared by Daniel Friesen (dantman)
    // http://gist.github.com/303249
    var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
    var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
    var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
    if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
        // XXX global assignment won't work in embeddings that use
        // an alternate object for the context.
        /* global Date: true */
        /* eslint-disable no-undef */
        var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;
        var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());
        /* eslint-disable no-implicit-globals */
        Date = (function (NativeDate) {
        /* eslint-enable no-implicit-globals */
        /* eslint-enable no-undef */
            // Date.length === 7
            var DateShim = function Date(Y, M, D, h, m, s, ms) {
                var length = arguments.length;
                var date;
                if (this instanceof NativeDate) {
                    var seconds = s;
                    var millis = ms;
                    if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
                        // work around a Safari 8/9 bug where it treats the seconds as signed
                        var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
                        var sToShift = Math.floor(msToShift / 1e3);
                        seconds += sToShift;
                        millis -= sToShift * 1e3;
                    }
                    date = length === 1 && $String(Y) === Y ? // isString(Y)
                        // We explicitly pass it through parse:
                        new NativeDate(DateShim.parse(Y)) :
                        // We have to manually make calls depending on argument
                        // length here
                        length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis) :
                        length >= 6 ? new NativeDate(Y, M, D, h, m, seconds) :
                        length >= 5 ? new NativeDate(Y, M, D, h, m) :
                        length >= 4 ? new NativeDate(Y, M, D, h) :
                        length >= 3 ? new NativeDate(Y, M, D) :
                        length >= 2 ? new NativeDate(Y, M) :
                        length >= 1 ? new NativeDate(Y instanceof NativeDate ? +Y : Y) :
                                      new NativeDate();
                } else {
                    date = NativeDate.apply(this, arguments);
                }
                if (!isPrimitive(date)) {
                    // Prevent mixups with unfixed Date object
                    defineProperties(date, { constructor: DateShim }, true);
                }
                return date;
            };

            // 15.9.1.15 Date Time String Format.
            var isoDateExpression = new RegExp('^' +
                '(\\d{4}|[+-]\\d{6})' + // four-digit year capture or sign +
                                          // 6-digit extended year
                '(?:-(\\d{2})' + // optional month capture
                '(?:-(\\d{2})' + // optional day capture
                '(?:' + // capture hours:minutes:seconds.milliseconds
                    'T(\\d{2})' + // hours capture
                    ':(\\d{2})' + // minutes capture
                    '(?:' + // optional :seconds.milliseconds
                        ':(\\d{2})' + // seconds capture
                        '(?:(\\.\\d{1,}))?' + // milliseconds capture
                    ')?' +
                '(' + // capture UTC offset component
                    'Z|' + // UTC capture
                    '(?:' + // offset specifier +/-hours:minutes
                        '([-+])' + // sign capture
                        '(\\d{2})' + // hours offset capture
                        ':(\\d{2})' + // minutes offset capture
                    ')' +
                ')?)?)?)?' +
            '$');

            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

            var dayFromMonth = function dayFromMonth(year, month) {
                var t = month > 1 ? 1 : 0;
                return (
                    months[month] +
                    Math.floor((year - 1969 + t) / 4) -
                    Math.floor((year - 1901 + t) / 100) +
                    Math.floor((year - 1601 + t) / 400) +
                    365 * (year - 1970)
                );
            };

            var toUTC = function toUTC(t) {
                var s = 0;
                var ms = t;
                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
                    // work around a Safari 8/9 bug where it treats the seconds as signed
                    var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
                    var sToShift = Math.floor(msToShift / 1e3);
                    s += sToShift;
                    ms -= sToShift * 1e3;
                }
                return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));
            };

            // Copy any custom methods a 3rd party library may have added
            for (var key in NativeDate) {
                if (owns(NativeDate, key)) {
                    DateShim[key] = NativeDate[key];
                }
            }

            // Copy "native" methods explicitly; they may be non-enumerable
            defineProperties(DateShim, {
                now: NativeDate.now,
                UTC: NativeDate.UTC
            }, true);
            DateShim.prototype = NativeDate.prototype;
            defineProperties(DateShim.prototype, {
                constructor: DateShim
            }, true);

            // Upgrade Date.parse to handle simplified ISO 8601 strings
            var parseShim = function parse(string) {
                var match = isoDateExpression.exec(string);
                if (match) {
                    // parse months, days, hours, minutes, seconds, and milliseconds
                    // provide default values if necessary
                    // parse the UTC offset component
                    var year = $Number(match[1]),
                        month = $Number(match[2] || 1) - 1,
                        day = $Number(match[3] || 1) - 1,
                        hour = $Number(match[4] || 0),
                        minute = $Number(match[5] || 0),
                        second = $Number(match[6] || 0),
                        millisecond = Math.floor($Number(match[7] || 0) * 1000),
                        // When time zone is missed, local offset should be used
                        // (ES 5.1 bug)
                        // see https://bugs.ecmascript.org/show_bug.cgi?id=112
                        isLocalTime = Boolean(match[4] && !match[8]),
                        signOffset = match[9] === '-' ? 1 : -1,
                        hourOffset = $Number(match[10] || 0),
                        minuteOffset = $Number(match[11] || 0),
                        result;
                    var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;
                    if (
                        hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25) &&
                        minute < 60 && second < 60 && millisecond < 1000 &&
                        month > -1 && month < 12 && hourOffset < 24 &&
                        minuteOffset < 60 && // detect invalid offsets
                        day > -1 &&
                        day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))
                    ) {
                        result = (
                            (dayFromMonth(year, month) + day) * 24 +
                            hour +
                            hourOffset * signOffset
                        ) * 60;
                        result = (
                            (result + minute + minuteOffset * signOffset) * 60 +
                            second
                        ) * 1000 + millisecond;
                        if (isLocalTime) {
                            result = toUTC(result);
                        }
                        if (-8.64e15 <= result && result <= 8.64e15) {
                            return result;
                        }
                    }
                    return NaN;
                }
                return NativeDate.parse.apply(this, arguments);
            };
            defineProperties(DateShim, { parse: parseShim });

            return DateShim;
        }(Date));
        /* global Date: false */
    }

    // ES5 15.9.4.4
    // http://es5.github.com/#x15.9.4.4
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    //
    // Number
    // ======
    //

    // ES5.1 15.7.4.5
    // http://es5.github.com/#x15.7.4.5
    var hasToFixedBugs = NumberPrototype.toFixed && (
      (0.00008).toFixed(3) !== '0.000' ||
      (0.9).toFixed(0) !== '1' ||
      (1.255).toFixed(2) !== '1.25' ||
      (1000000000000000128).toFixed(0) !== '1000000000000000128'
    );

    var toFixedHelpers = {
        base: 1e7,
        size: 6,
        data: [0, 0, 0, 0, 0, 0],
        multiply: function multiply(n, c) {
            var i = -1;
            var c2 = c;
            while (++i < toFixedHelpers.size) {
                c2 += n * toFixedHelpers.data[i];
                toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
                c2 = Math.floor(c2 / toFixedHelpers.base);
            }
        },
        divide: function divide(n) {
            var i = toFixedHelpers.size;
            var c = 0;
            while (--i >= 0) {
                c += toFixedHelpers.data[i];
                toFixedHelpers.data[i] = Math.floor(c / n);
                c = (c % n) * toFixedHelpers.base;
            }
        },
        numToString: function numToString() {
            var i = toFixedHelpers.size;
            var s = '';
            while (--i >= 0) {
                if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
                    var t = $String(toFixedHelpers.data[i]);
                    if (s === '') {
                        s = t;
                    } else {
                        s += strSlice('0000000', 0, 7 - t.length) + t;
                    }
                }
            }
            return s;
        },
        pow: function pow(x, n, acc) {
            return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
        },
        log: function log(x) {
            var n = 0;
            var x2 = x;
            while (x2 >= 4096) {
                n += 12;
                x2 /= 4096;
            }
            while (x2 >= 2) {
                n += 1;
                x2 /= 2;
            }
            return n;
        }
    };

    var toFixedShim = function toFixed(fractionDigits) {
        var f, x, s, m, e, z, j, k;

        // Test for NaN and round fractionDigits down
        f = $Number(fractionDigits);
        f = isActualNaN(f) ? 0 : Math.floor(f);

        if (f < 0 || f > 20) {
            throw new RangeError('Number.toFixed called with invalid number of decimals');
        }

        x = $Number(this);

        if (isActualNaN(x)) {
            return 'NaN';
        }

        // If it is too big or small, return the string value of the number
        if (x <= -1e21 || x >= 1e21) {
            return $String(x);
        }

        s = '';

        if (x < 0) {
            s = '-';
            x = -x;
        }

        m = '0';

        if (x > 1e-21) {
            // 1e-21 < x < 1e21
            // -70 < log2(x) < 70
            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));
            z *= 0x10000000000000; // Math.pow(2, 52);
            e = 52 - e;

            // -18 < e < 122
            // x = z / 2 ^ e
            if (e > 0) {
                toFixedHelpers.multiply(0, z);
                j = f;

                while (j >= 7) {
                    toFixedHelpers.multiply(1e7, 0);
                    j -= 7;
                }

                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
                j = e - 1;

                while (j >= 23) {
                    toFixedHelpers.divide(1 << 23);
                    j -= 23;
                }

                toFixedHelpers.divide(1 << j);
                toFixedHelpers.multiply(1, 1);
                toFixedHelpers.divide(2);
                m = toFixedHelpers.numToString();
            } else {
                toFixedHelpers.multiply(0, z);
                toFixedHelpers.multiply(1 << (-e), 0);
                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);
            }
        }

        if (f > 0) {
            k = m.length;

            if (k <= f) {
                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;
            } else {
                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);
            }
        } else {
            m = s + m;
        }

        return m;
    };
    defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);

    var hasToPrecisionUndefinedBug = (function () {
        try {
            return 1.0.toPrecision(undefined) === '1';
        } catch (e) {
            return true;
        }
    }());
    var originalToPrecision = NumberPrototype.toPrecision;
    defineProperties(NumberPrototype, {
        toPrecision: function toPrecision(precision) {
            return typeof precision === 'undefined' ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);
        }
    }, hasToPrecisionUndefinedBug);

    //
    // String
    // ======
    //

    // ES5 15.5.4.14
    // http://es5.github.com/#x15.5.4.14

    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
    // Many browsers do not split properly with regular expressions or they
    // do not perform the split correctly under obscure conditions.
    // See http://blog.stevenlevithan.com/archives/cross-browser-split
    // I've tested in many browsers and this seems to cover the deviant ones:
    //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
    //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
    //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
    //       [undefined, "t", undefined, "e", ...]
    //    ''.split(/.?/) should be [], not [""]
    //    '.'.split(/()()/) should be ["."], not ["", "", "."]

    if (
        'ab'.split(/(?:ab)*/).length !== 2 ||
        '.'.split(/(.?)(.?)/).length !== 4 ||
        'tesst'.split(/(s)*/)[1] === 't' ||
        'test'.split(/(?:)/, -1).length !== 4 ||
        ''.split(/.?/).length ||
        '.'.split(/()()/).length > 1
    ) {
        (function () {
            var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
            var maxSafe32BitInt = Math.pow(2, 32) - 1;

            StringPrototype.split = function (separator, limit) {
                var string = String(this);
                if (typeof separator === 'undefined' && limit === 0) {
                    return [];
                }

                // If `separator` is not a regex, use native split
                if (!isRegex(separator)) {
                    return strSplit(this, separator, limit);
                }

                var output = [];
                var flags = (separator.ignoreCase ? 'i' : '') +
                            (separator.multiline ? 'm' : '') +
                            (separator.unicode ? 'u' : '') + // in ES6
                            (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6
                    lastLastIndex = 0,
                    // Make `global` and avoid `lastIndex` issues by working with a copy
                    separator2, match, lastIndex, lastLength;
                var separatorCopy = new RegExp(separator.source, flags + 'g');
                if (!compliantExecNpcg) {
                    // Doesn't need flags gy, but they don't hurt
                    separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
                }
                /* Values for `limit`, per the spec:
                 * If undefined: 4294967295 // maxSafe32BitInt
                 * If 0, Infinity, or NaN: 0
                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
                 * If other: Type-convert, then use the above rules
                 */
                var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);
                match = separatorCopy.exec(string);
                while (match) {
                    // `separatorCopy.lastIndex` is not reliable cross-browser
                    lastIndex = match.index + match[0].length;
                    if (lastIndex > lastLastIndex) {
                        pushCall(output, strSlice(string, lastLastIndex, match.index));
                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
                        // nonparticipating capturing groups
                        if (!compliantExecNpcg && match.length > 1) {
                            /* eslint-disable no-loop-func */
                            match[0].replace(separator2, function () {
                                for (var i = 1; i < arguments.length - 2; i++) {
                                    if (typeof arguments[i] === 'undefined') {
                                        match[i] = void 0;
                                    }
                                }
                            });
                            /* eslint-enable no-loop-func */
                        }
                        if (match.length > 1 && match.index < string.length) {
                            array_push.apply(output, arraySlice(match, 1));
                        }
                        lastLength = match[0].length;
                        lastLastIndex = lastIndex;
                        if (output.length >= splitLimit) {
                            break;
                        }
                    }
                    if (separatorCopy.lastIndex === match.index) {
                        separatorCopy.lastIndex++; // Avoid an infinite loop
                    }
                    match = separatorCopy.exec(string);
                }
                if (lastLastIndex === string.length) {
                    if (lastLength || !separatorCopy.test('')) {
                        pushCall(output, '');
                    }
                } else {
                    pushCall(output, strSlice(string, lastLastIndex));
                }
                return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;
            };
        }());

    // [bugfix, chrome]
    // If separator is undefined, then the result array contains just one String,
    // which is the this value (converted to a String). If limit is not undefined,
    // then the output array is truncated so that it contains no more than limit
    // elements.
    // "0".split(undefined, 0) -> []
    } else if ('0'.split(void 0, 0).length) {
        StringPrototype.split = function split(separator, limit) {
            if (typeof separator === 'undefined' && limit === 0) {
                return [];
            }
            return strSplit(this, separator, limit);
        };
    }

    var str_replace = StringPrototype.replace;
    var replaceReportsGroupsCorrectly = (function () {
        var groups = [];
        'x'.replace(/x(.)?/g, function (match, group) {
            pushCall(groups, group);
        });
        return groups.length === 1 && typeof groups[0] === 'undefined';
    }());

    if (!replaceReportsGroupsCorrectly) {
        StringPrototype.replace = function replace(searchValue, replaceValue) {
            var isFn = isCallable(replaceValue);
            var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
            if (!isFn || !hasCapturingGroups) {
                return str_replace.call(this, searchValue, replaceValue);
            } else {
                var wrappedReplaceValue = function (match) {
                    var length = arguments.length;
                    var originalLastIndex = searchValue.lastIndex;
                    searchValue.lastIndex = 0;
                    var args = searchValue.exec(match) || [];
                    searchValue.lastIndex = originalLastIndex;
                    pushCall(args, arguments[length - 2], arguments[length - 1]);
                    return replaceValue.apply(this, args);
                };
                return str_replace.call(this, searchValue, wrappedReplaceValue);
            }
        };
    }

    // ECMA-262, 3rd B.2.3
    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
    // non-normative section suggesting uniform semantics and it should be
    // normalized across all browsers
    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
    var string_substr = StringPrototype.substr;
    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
    defineProperties(StringPrototype, {
        substr: function substr(start, length) {
            var normalizedStart = start;
            if (start < 0) {
                normalizedStart = max(this.length + start, 0);
            }
            return string_substr.call(this, normalizedStart, length);
        }
    }, hasNegativeSubstrBug);

    // ES5 15.5.4.20
    // whitespace from: http://es5.github.io/#x15.5.4.20
    var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
        '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
        '\u2029\uFEFF';
    var zeroWidth = '\u200b';
    var wsRegexChars = '[' + ws + ']';
    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
    var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
    defineProperties(StringPrototype, {
        // http://blog.stevenlevithan.com/archives/faster-trim-javascript
        // http://perfectionkills.com/whitespace-deviations/
        trim: function trim() {
            if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
        }
    }, hasTrimWhitespaceBug);
    var trim = call.bind(String.prototype.trim);

    var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;
    defineProperties(StringPrototype, {
        lastIndexOf: function lastIndexOf(searchString) {
            if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            var S = $String(this);
            var searchStr = $String(searchString);
            var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
            var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
            var start = min(max(pos, 0), S.length);
            var searchLen = searchStr.length;
            var k = start + searchLen;
            while (k > 0) {
                k = max(0, k - searchLen);
                var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);
                if (index !== -1) {
                    return k + index;
                }
            }
            return -1;
        }
    }, hasLastIndexBug);

    var originalLastIndexOf = StringPrototype.lastIndexOf;
    defineProperties(StringPrototype, {
        lastIndexOf: function lastIndexOf(searchString) {
            return originalLastIndexOf.apply(this, arguments);
        }
    }, StringPrototype.lastIndexOf.length !== 1);

    // ES-5 15.1.2.2
    /* eslint-disable radix */
    if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
    /* eslint-enable radix */
        /* global parseInt: true */
        parseInt = (function (origParseInt) {
            var hexRegex = /^[\-+]?0[xX]/;
            return function parseInt(str, radix) {
                var string = trim(String(str));
                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
                return origParseInt(string, defaultedRadix);
            };
        }(parseInt));
    }

    // https://es5.github.io/#x15.1.2.3
    if (1 / parseFloat('-0') !== -Infinity) {
        /* global parseFloat: true */
        parseFloat = (function (origParseFloat) {
            return function parseFloat(string) {
                var inputString = trim(String(string));
                var result = origParseFloat(inputString);
                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;
            };
        }(parseFloat));
    }

    if (String(new RangeError('test')) !== 'RangeError: test') {
        var errorToStringShim = function toString() {
            if (typeof this === 'undefined' || this === null) {
                throw new TypeError("can't convert " + this + ' to object');
            }
            var name = this.name;
            if (typeof name === 'undefined') {
                name = 'Error';
            } else if (typeof name !== 'string') {
                name = $String(name);
            }
            var msg = this.message;
            if (typeof msg === 'undefined') {
                msg = '';
            } else if (typeof msg !== 'string') {
                msg = $String(msg);
            }
            if (!name) {
                return msg;
            }
            if (!msg) {
                return name;
            }
            return name + ': ' + msg;
        };
        // can't use defineProperties here because of toString enumeration issue in IE <= 8
        Error.prototype.toString = errorToStringShim;
    }

    if (supportsDescriptors) {
        var ensureNonEnumerable = function (obj, prop) {
            if (isEnum(obj, prop)) {
                var desc = Object.getOwnPropertyDescriptor(obj, prop);
                if (desc.configurable) {
                    desc.enumerable = false;
                    Object.defineProperty(obj, prop, desc);
                }
            }
        };
        ensureNonEnumerable(Error.prototype, 'message');
        if (Error.prototype.message !== '') {
            Error.prototype.message = '';
        }
        ensureNonEnumerable(Error.prototype, 'name');
    }

    if (String(/a/mig) !== '/a/gim') {
        var regexToString = function toString() {
            var str = '/' + this.source + '/';
            if (this.global) {
                str += 'g';
            }
            if (this.ignoreCase) {
                str += 'i';
            }
            if (this.multiline) {
                str += 'm';
            }
            return str;
        };
        // can't use defineProperties here because of toString enumeration issue in IE <= 8
        RegExp.prototype.toString = regexToString;
    }
}));

},{}],39:[function(_dereq_,module,exports){
var arr = [];
var each = arr.forEach;
var slice = arr.slice;


module.exports = function(obj) {
    each.call(slice.call(arguments, 1), function(source) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};

},{}],40:[function(_dereq_,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],41:[function(_dereq_,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],42:[function(_dereq_,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],43:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],44:[function(_dereq_,module,exports){
(function (global){
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],45:[function(_dereq_,module,exports){
/*!
  * $script.js JS loader & dependency manager
  * https://github.com/ded/script.js
  * (c) Dustin Diaz 2014 | License MIT
  */

(function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
})('$script', function () {
  var doc = document
    , head = doc.getElementsByTagName('head')[0]
    , s = 'string'
    , f = false
    , push = 'push'
    , readyState = 'readyState'
    , onreadystatechange = 'onreadystatechange'
    , list = {}
    , ids = {}
    , delay = {}
    , scripts = {}
    , scriptpath
    , urlArgs

  function every(ar, fn) {
    for (var i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f
    return 1
  }
  function each(ar, fn) {
    every(ar, function (el) {
      return !fn(el)
    })
  }

  function $script(paths, idOrDone, optDone) {
    paths = paths[push] ? paths : [paths]
    var idOrDoneIsDone = idOrDone && idOrDone.call
      , done = idOrDoneIsDone ? idOrDone : optDone
      , id = idOrDoneIsDone ? paths.join('') : idOrDone
      , queue = paths.length
    function loopFn(item) {
      return item.call ? item() : list[item]
    }
    function callback() {
      if (!--queue) {
        list[id] = 1
        done && done()
        for (var dset in delay) {
          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = [])
        }
      }
    }
    setTimeout(function () {
      each(paths, function loading(path, force) {
        if (path === null) return callback()
        
        if (!force && !/^https?:\/\//.test(path) && scriptpath) {
          path = (path.indexOf('.js') === -1) ? scriptpath + path + '.js' : scriptpath + path;
        }
        
        if (scripts[path]) {
          if (id) ids[id] = 1
          return (scripts[path] == 2) ? callback() : setTimeout(function () { loading(path, true) }, 0)
        }

        scripts[path] = 1
        if (id) ids[id] = 1
        create(path, callback)
      })
    }, 0)
    return $script
  }

  function create(path, fn) {
    var el = doc.createElement('script'), loaded
    el.onload = el.onerror = el[onreadystatechange] = function () {
      if ((el[readyState] && !(/^c|loade/.test(el[readyState]))) || loaded) return;
      el.onload = el[onreadystatechange] = null
      loaded = 1
      scripts[path] = 2
      fn()
    }
    el.async = 1
    el.src = urlArgs ? path + (path.indexOf('?') === -1 ? '?' : '&') + urlArgs : path;
    head.insertBefore(el, head.lastChild)
  }

  $script.get = create

  $script.order = function (scripts, id, done) {
    (function callback(s) {
      s = scripts.shift()
      !scripts.length ? $script(s, id, done) : $script(s, callback)
    }())
  }

  $script.path = function (p) {
    scriptpath = p
  }
  $script.urlArgs = function (str) {
    urlArgs = str;
  }
  $script.ready = function (deps, ready, req) {
    deps = deps[push] ? deps : [deps]
    var missing = [];
    !each(deps, function (dep) {
      list[dep] || missing[push](dep);
    }) && every(deps, function (dep) {return list[dep]}) ?
      ready() : !function (key) {
      delay[key] = delay[key] || []
      delay[key][push](ready)
      req && req(missing)
    }(deps.join('|'))
    return $script
  }

  $script.done = function (idOrDone) {
    $script([null], idOrDone)
  }

  return $script
});

},{}]},{},[32])(32)
});
