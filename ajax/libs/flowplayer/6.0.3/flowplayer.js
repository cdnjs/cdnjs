/*!

   Flowplayer v6.0.3 (2015-07-23) | flowplayer.org/license

*/
/*! (C) WebReflection Mit Style License */
(function(e){function g(e,t,n,r){for(var i,s=n.slice(),o=w(t,e),u=0,a=s.length;u<a;u++){handler=s[u],typeof handler=="object"&&typeof handler.handleEvent=="function"?handler.handleEvent(o):handler.call(e,o);if(o.stoppedImmediatePropagation)break}return i=!o.stoppedPropagation,r&&i&&e.parentNode?e.parentNode.dispatchEvent(o):!o.defaultPrevented}function y(e,t){return{configurable:!0,get:e,set:t}}function b(e,t,n){var r=f(t||e,n);u(e,"textContent",y(function(){return r.get.call(this)},function(e){r.set.call(this,e)}))}function w(e,t){return e.currentTarget=t,e.eventPhase=e.target===e.currentTarget?2:3,e}function E(e,t){var n=e.length;while(n--&&e[n]!==t);return n}function S(){if(this.tagName==="BR")return"\n";var e=this.firstChild,t=[];while(e)e.nodeType!==8&&e.nodeType!==7&&t.push(e.textContent),e=e.nextSibling;return t.join("")}function x(e){return e.nodeType!==9&&document.documentElement.contains(e)}function T(e){!n&&d.test(document.readyState)&&(n=!n,document.detachEvent(r,T),e=document.createEvent("Event"),e.initEvent(i,!0,!0),document.dispatchEvent(e))}function N(e){var t;while(t=this.lastChild)this.removeChild(t);e!=null&&this.appendChild(document.createTextNode(e))}function C(t,n){return n||(n=e.event),n.target||(n.target=n.srcElement||n.fromElement||document),n.timeStamp||(n.timeStamp=(new Date).getTime()),n}if(document.createEvent)return;var t=!0,n=!1,r="onreadystatechange",i="DOMContentLoaded",s="__IE8__"+Math.random(),o=e.Object,u=o.defineProperty||function(e,t,n){e[t]=n.value},a=o.defineProperties||function(t,n){for(var r in n)if(l.call(n,r))try{u(t,r,n[r])}catch(i){e.console&&console.log(r+" failed on object:",t,i.message)}},f=o.getOwnPropertyDescriptor,l=o.prototype.hasOwnProperty,c=e.Element.prototype,h=e.Text.prototype,p=/^[a-z]+$/,d=/loaded|complete/,v={},m=document.createElement("div");b(e.HTMLCommentElement.prototype,c,"nodeValue"),b(e.HTMLScriptElement.prototype,null,"text"),b(h,null,"nodeValue"),b(e.HTMLTitleElement.prototype,null,"text"),u(e.HTMLStyleElement.prototype,"textContent",function(e){return y(function(){return e.get.call(this.styleSheet)},function(t){e.set.call(this.styleSheet,t)})}(f(e.CSSStyleSheet.prototype,"cssText"))),a(c,{textContent:{get:S,set:N},firstElementChild:{get:function(){for(var e=this.childNodes||[],t=0,n=e.length;t<n;t++)if(e[t].nodeType==1)return e[t]}},lastElementChild:{get:function(){for(var e=this.childNodes||[],t=e.length;t--;)if(e[t].nodeType==1)return e[t]}},previousElementSibling:{get:function(){var e=this.previousSibling;while(e&&e.nodeType!=1)e=e.previousSibling;return e}},nextElementSibling:{get:function(){var e=this.nextSibling;while(e&&e.nodeType!=1)e=e.nextSibling;return e}},childElementCount:{get:function(){for(var e=0,t=this.childNodes||[],n=t.length;n--;e+=t[n].nodeType==1);return e}},addEventListener:{value:function(e,t,n){var r=this,i="on"+e,o=r[s]||u(r,s,{value:{}})[s],a=o[i]||(o[i]={}),f=a.h||(a.h=[]),c;if(!l.call(a,"w")){a.w=function(e){return e[s]||g(r,C(r,e),f,!1)};if(!l.call(v,i))if(p.test(e))try{c=document.createEventObject(),c[s]=!0,r.nodeType!=9&&r.parentNode==null&&m.appendChild(r),r.fireEvent(i,c),v[i]=!0}catch(c){v[i]=!1;while(m.hasChildNodes())m.removeChild(m.firstChild)}else v[i]=!1;(a.n=v[i])&&r.attachEvent(i,a.w)}E(f,t)<0&&f[n?"unshift":"push"](t)}},dispatchEvent:{value:function(e){var t=this,n="on"+e.type,r=t[s],i=r&&r[n],o=!!i,u;return e.target||(e.target=t),o?i.n?t.fireEvent(n,e):g(t,e,i.h,!0):(u=t.parentNode)?u.dispatchEvent(e):!0,!e.defaultPrevented}},removeEventListener:{value:function(e,t,n){var r=this,i="on"+e,o=r[s],u=o&&o[i],a=u&&u.h,f=a?E(a,t):-1;-1<f&&a.splice(f,1)}}}),a(h,{addEventListener:{value:c.addEventListener},dispatchEvent:{value:c.dispatchEvent},removeEventListener:{value:c.removeEventListener}}),a(e.XMLHttpRequest.prototype,{addEventListener:{value:function(e,t,n){var r=this,i="on"+e,o=r[s]||u(r,s,{value:{}})[s],a=o[i]||(o[i]={}),f=a.h||(a.h=[]);E(f,t)<0&&(r[i]||(r[i]=function(){var t=document.createEvent("Event");t.initEvent(e,!0,!0),r.dispatchEvent(t)}),f[n?"unshift":"push"](t))}},dispatchEvent:{value:function(e){var t=this,n="on"+e.type,r=t[s],i=r&&r[n],o=!!i;return o&&(i.n?t.fireEvent(n,e):g(t,e,i.h,!0))}},removeEventListener:{value:c.removeEventListener}}),a(e.Event.prototype,{bubbles:{value:!0,writable:!0},cancelable:{value:!0,writable:!0},preventDefault:{value:function(){this.cancelable&&(this.defaultPrevented=!0,this.returnValue=!1)}},stopPropagation:{value:function(){this.stoppedPropagation=!0,this.cancelBubble=!0}},stopImmediatePropagation:{value:function(){this.stoppedImmediatePropagation=!0,this.stopPropagation()}},initEvent:{value:function(e,t,n){this.type=e,this.bubbles=!!t,this.cancelable=!!n,this.bubbles||this.stopPropagation()}}}),a(e.HTMLDocument.prototype,{textContent:{get:function(){return this.nodeType===11?S.call(this):null},set:function(e){this.nodeType===11&&N.call(this,e)}},addEventListener:{value:function(n,s,o){var u=this;c.addEventListener.call(u,n,s,o),t&&n===i&&!d.test(u.readyState)&&(t=!1,u.attachEvent(r,T),e==top&&function a(e){try{u.documentElement.doScroll("left"),T()}catch(t){setTimeout(a,50)}}())}},dispatchEvent:{value:c.dispatchEvent},removeEventListener:{value:c.removeEventListener},createEvent:{value:function(e){var t;if(e!=="Event")throw new Error("unsupported "+e);return t=document.createEventObject(),t.timeStamp=(new Date).getTime(),t}}}),a(e.Window.prototype,{getComputedStyle:{value:function(){function i(e){this._=e}function s(){}var e=/^(?:[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/,t=/^(top|right|bottom|left)$/,n=/\-([a-z])/g,r=function(e,t){return t.toUpperCase()};return i.prototype.getPropertyValue=function(i){var s=this._,o=s.style,u=s.currentStyle,a=s.runtimeStyle,f,l,c;return i=(i==="float"?"style-float":i).replace(n,r),f=u?u[i]:o[i],e.test(f)&&!t.test(i)&&(l=o.left,c=a&&a.left,c&&(a.left=u.left),o.left=i==="fontSize"?"1em":f,f=o.pixelLeft+"px",o.left=l,c&&(a.left=c)),f==null?f:f+""||"auto"},s.prototype.getPropertyValue=function(){return null},function(e,t){return t?new s(e):new i(e)}}()},addEventListener:{value:function(t,n,r){var i=e,o="on"+t,u;i[o]||(i[o]=function(e){return g(i,C(i,e),u,!1)}),u=i[o][s]||(i[o][s]=[]),E(u,n)<0&&u[r?"unshift":"push"](n)}},dispatchEvent:{value:function(t){var n=e["on"+t.type];return n?n.call(e,t)!==!1&&!t.defaultPrevented:!0}},removeEventListener:{value:function(t,n,r){var i="on"+t,u=(e[i]||o)[s],a=u?E(u,n):-1;-1<a&&u.splice(a,1)}}})})(this);
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.flowplayer=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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
  return ClassList(el).contains(kls);
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
    el.innerHTML = innerHTML || '';
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

},{"class-list":22,"computed-style":24,"punycode":21}],2:[function(_dereq_,module,exports){
/* global __flash_unloadHandler:true,__flash_savedUnloadHandler:true */
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
      __flash_savedUnloadHandler = __flash_unloadHandler = function() {};
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
      video = player.video,
      loadVideo,
      callbackId,
      objectTag,
      api;

   var win = window;

   var engine = {
      engineName: engineImpl.engineName,

      pick: function(sources) {

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
      },

      load: function(video) {
         loadVideo = video;

         function escapeURL(url) {
            return url.replace(/&amp;/g, '%26').replace(/&/g, '%26').replace(/=/g, '%3D');
         }

         var html5Tag = common.findDirect('video', root)[0] || common.find('.fp-player > video', root)[0],
            url = escapeURL(video.src),
            is_absolute = /^https?:/.test(url);

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

         if (api && isHLS(video) && api.data !== conf.swfHls) engine.unload();

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
            // bufferTime might be 0
            if (conf.bufferTime !== undefined) opts.bufferTime = conf.bufferTime;

            if (is_absolute) delete opts.rtmp;

            // issues #376
            if (opts.rtmp) {
               opts.rtmp = escapeURL(opts.rtmp);
            }

            // issue #733
            var bgColor = common.css(root, 'background-color') ||'', bg;
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

            // throw error if no loading occurs
            setTimeout(function() {
               try {
                  if (!api.PercentLoaded()) {
                     return player.trigger("error", [player, { code: 7, url: conf.swf }]);
                  }
               } catch (e) {}
            }, 5000);

            // detect disabled flash
            setTimeout(function() {
              if (typeof api.PercentLoaded === 'undefined') {
                player.trigger('flashdisabled', [player]);
              }
            }, 1000);

            api.pollInterval = setInterval(function () {
               if (!api) return;
               var status = api.__status ? api.__status() : null;

               if (!status) return;

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
         clearInterval(api.pollInterval);
      }

   };

   ['pause','resume','seek','volume'].forEach(function(name) {

      engine[name] = function(arg) {
         try {
           if (player.ready) {

              if (name == 'seek' && player.video.time && !player.paused) {
                 player.trigger("beforeseek");
              }

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

},{"../common":1,"../flowplayer":18,"./embed":2,"bean":20,"extend-object":26}],4:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    bean = _dereq_('bean'),
    ClassList = _dereq_('class-list'),
    extend = _dereq_('extend-object'),
    common = _dereq_('../common');
var VIDEO = document.createElement('video');

// HTML5 --> Flowplayer event
var EVENTS = {

   // fired
   ended: 'finish',
   pause: 'pause',
   play: 'resume',
   progress: 'buffer',
   timeupdate: 'progress',
   volumechange: 'volume',
   ratechange: 'speed',
   //seeking: 'beforeseek',
   seeked: 'seek',
   // abort: 'resume',

   // not fired
   loadeddata: 'ready',
   // loadedmetadata: 0,
   // canplay: 0,

   // error events
   // load: 0,
   // emptied: 0,
   // empty: 0,
   error: 'error',
   dataunavailable: 'error',
   webkitendfullscreen: !flowplayer.support.inlineVideo && 'unload'

};

function round(val, per) {
   per = per || 100;
   return Math.round(val * per) / per;
}

function getType(type) {
   return /mpegurl/i.test(type) ? "application/x-mpegurl" : type;
}

function canPlay(type) {
   if (!/^(video|application)/i.test(type))
      type = getType(type);
   return !!VIDEO.canPlayType(type).replace("no", '');
}

function findFromSourcesByType(sources, type) {
   var arr = sources.filter(function(s) {
      return s.type === type;
   });
   return arr.length ? arr[0] : null;
}

var videoTagCache;
var createVideoTag = function(video, autoplay, preload, useCache) {
  if (typeof autoplay === 'undefined') autoplay = true;
  if (typeof preload === 'undefined') preload = 'none';
  if (typeof useCache === 'undefined') useCache = true;
  if (useCache && videoTagCache) {
    videoTagCache.type = getType(video.type);
    videoTagCache.src = video.src;
    return videoTagCache;
  }
  var el  = document.createElement('video');
  el.src = video.src;
  el.type = getType(video.type);
  el.className = 'fp-engine';
  el.autoplay = autoplay ? 'autoplay' : false;
  el.preload = preload;
  el.setAttribute('x-webkit-airplay', 'allow');
  if (useCache) videoTagCache = el;
  return el;
};

var engine;

engine = function(player, root) {

  var api = common.findDirect('video', root)[0] || common.find('.fp-player > video', root)[0],
      support = flowplayer.support,
      track = common.find("track", api)[0],
      conf = player.conf,
      self,
      timer,
      volumeLevel;
   /*jshint -W093 */
   return self = {
      engineName: engine.engineName,

      pick: function(sources) {
         if (support.video) {
            if (conf.videoTypePreference) {
               var mp4source = findFromSourcesByType(sources, conf.videoTypePreference);
               if (mp4source) return mp4source;
            }

            for (var i = 0, source; i < sources.length; i++) {
               if (canPlay(sources[i].type)) return sources[i];
            }
         }
      },

      load: function(video) {
         var created = false, container = common.find('.fp-player', root)[0], reload = false;
         if (conf.splash && !api) {
           api = createVideoTag(video);
           common.prepend(container, api);
           created = true;
         } else if (!api) {
           api = createVideoTag(video, !!video.autoplay || !!conf.autoplay, conf.clip.preload || 'metadata', false);
           common.prepend(container, api);
           created = true;
         } else {
           ClassList(api).add('fp-engine');
           common.find('source,track', api).forEach(common.removeNode);
           if (!player.conf.nativesubtitles) common.attr(api, 'crossorigin', false);
           reload = api.src === video.src;
         }
         if (!support.inlineVideo) {
           common.css(api, {
             position: 'absolute',
             top: '-9999em'
           });
         }
         //TODO subtitles support

         // IE does not fire delegated timeupdate events
         bean.off(api, 'timeupdate', common.noop);
         bean.on(api, 'timeupdate', common.noop);

         common.prop(api, 'loop', !!(video.loop || conf.loop));

         if (typeof volumeLevel !== 'undefined') {
           api.volume = volumeLevel;
         }

         if (player.video.src && video.src != player.video.src || video.index) common.attr(api, 'autoplay', 'autoplay');
         api.src = video.src;
         api.type = video.type;

         listen(api, common.find("source", api).concat(api), video);

         // iPad (+others?) demands load()
         if (conf.clip.preload != 'none' && video.type != "mpegurl" || !support.zeropreload || !support.dataload) api.load();
         if (created || reload) api.load();
         if (api.paused && (video.autoplay || conf.autoplay)) api.play();
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
            var pausedState = player.paused;
            api.currentTime = time;
            if (pausedState) api.pause();
         } catch (ignored) {}
      },

      volume: function(level) {
         volumeLevel = level;
         if (api) {
            api.volume = level;
         }
      },

      unload: function() {
         common.find('video.fp-engine', root).forEach(common.removeNode);
         if (!support.cachedVideoTag) videoTagCache = null;
         timer = clearInterval(timer);
         api = 0;
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
               player.trigger("error", [player, { code: 4, video: extend(video, {src: api.src, url: api.src}) }]);
            }
         } catch (er) {
            // Most likely: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
         }
      });

      player.on('shutdown', function() {
        bean.off(sources);
      });

      Object.keys(EVENTS).forEach(function(type) {
        var flow = EVENTS[type];
        if (!flow) return;
        root.addEventListener(type, function(e) {
          video = api.listeners[instanceId];
          if (!e.target || !ClassList(e.target).contains('fp-engine')) return;

            if (conf.debug && !/progress/.test(flow)) console.log(type, "->", flow, e);

            // no events if player not ready
            if (!player.ready && !/ready|error/.test(flow) || !flow || !common.find('video', root).length) { return; }

            var arg, vtype;

            if (flow === 'unload') { //Call player unload
              player.unload();
              return;
            }

            var triggerEvent = function() {
              player.trigger(flow, [player, arg]);
            };

            switch (flow) {

               case "ready":

                  arg = extend(video, {
                     duration: api.duration,
                     width: api.videoWidth,
                     height: api.videoHeight,
                     url: api.currentSrc,
                     src: api.currentSrc
                  });

                  try {
                     arg.seekable = !conf.live && /mpegurl/i.test(video ? (video.type || '') : '') && api.duration || api.seekable && api.seekable.end(null);

                  } catch (ignored) {}

                  // buffer
                  timer = timer || setInterval(function() {

                     try {
                        arg.buffer = api.buffered.end(null);

                     } catch (ignored) {}

                     if (arg.buffer) {
                        if (round(arg.buffer, 1000) < round(arg.duration, 1000) && !arg.buffered) {
                           player.trigger("buffer", e);

                        } else if (!arg.buffered) {
                           arg.buffered = true;
                           player.trigger("buffer", e).trigger("buffered", e);
                           clearInterval(timer);
                           timer = 0;
                        }
                     }

                  }, 250);

                  if (!conf.live && !arg.duration && !support.hlsDuration && type === "loadeddata") {
                     var durationChanged = function() {
                        arg.duration = api.duration;
                        try {
                           arg.seekable = api.seekable && api.seekable.end(null);

                        } catch (ignored) {}
                        triggerEvent();
                        api.removeEventListener('durationchange', durationChanged);
                        ClassList(root).remove('is-live');
                     };
                     api.addEventListener('durationchange', durationChanged);

                     // Ugly hack to handle broken Android devices
                     var timeUpdated = function() {
                       if (!player.ready && !api.duration) { // No duration even though the video already plays
                         arg.duration = 0;
                         ClassList(root).add('is-live'); // Make UI believe it's live
                         triggerEvent();
                       }
                       api.removeEventListener('timeupdate', timeUpdated);
                     };
                     api.addEventListener('timeupdate', timeUpdated);
                     return;
                  }

                  break;

               case "progress": case "seek":

                  var dur = player.video.duration;

                  if (api.currentTime > 0 || player.live) {
                     arg = Math.max(api.currentTime, 0);

                  } else if (flow == 'progress') {
                     return;
                  }
                  break;


               case "speed":
                  arg = round(api.playbackRate);
                  break;

               case "volume":
                  arg = round(api.volume);
                  break;

               case "error":
                  try {
                     arg = (e.srcElement || e.originalTarget).error;
                     arg.video = extend(video, {src: api.src, url: api.src});
                  } catch (er) {
                     // Most likely https://bugzilla.mozilla.org/show_bug.cgi?id=208427
                     return;
                  }
            }

            triggerEvent();


         }, true);

      });

   }

};


engine.canPlay = function(type) {
  return flowplayer.support.video && canPlay(type);
};

engine.engineName = 'html5';

flowplayer.engines.push(engine);

},{"../common":1,"../flowplayer":18,"bean":20,"class-list":22,"extend-object":26}],5:[function(_dereq_,module,exports){
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

},{"../flowplayer":18,"./resolve":13,"bean":20,"scriptjs":29}],6:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    ClassList = _dereq_('class-list'),
    common = _dereq_('../common'),
    bean = _dereq_('bean');

flowplayer(function(player, root) {

   var CUE_RE = / ?cue\d+ ?/;

   var lastTime = 0, cuepointsDisabled = false;

   function setClass(index) {
      root.className = root.className.replace(CUE_RE, " ");
      if (index >= 0) ClassList(root).add('cue' + index);
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
   .on('beforeseek', function() {
     cuepointsDisabled = true;
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
        if (time < 0) time = duration + cue;

        var el = common.createElement('a', {className: 'fp-cuepoint fp-cuepoint' + (player.cuepoints.length - 1)});
        common.css(el, "left", (time / duration * 100) + "%");

        timeline.appendChild(el);
        bean.on(el, 'mousedown', function(e) {
          e.preventDefault();
          player.seek(time);

          // preventDefault() doesn't work
          return false;
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

},{"../common":1,"../flowplayer":18,"bean":20,"class-list":22}],7:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    bean = _dereq_('bean'),
    common = _dereq_('../common'),
    isObject = _dereq_('is-object'),
    extend = _dereq_('extend-object'),
    ClassList = _dereq_('class-list');



flowplayer(function(player, root) {

   // no embedding
   if (player.conf.embed === false) return;

   var conf = player.conf,
      ui = common.find('.fp-ui', root)[0],
      trigger = common.createElement('a', { "class": "fp-embed", title: 'Copy to your site'}),
      target = common.createElement('div',{ 'class': 'fp-embed-code'}, '<label>Paste this HTML code on your site to embed.</label><textarea></textarea>'),
      area = common.find("textarea", target)[0];

   ui.appendChild(trigger);
   ui.appendChild(target);

   player.embedCode = function() {
     var embedConf = player.conf.embed || {},
         video = player.video;

     if (embedConf.iframe) {
       var src = player.conf.embed.iframe,
           width = embedConf.width || video.width || common.width(root),
           height = embedConf.height || video.height || common.height(root);
       return '<iframe src="' + player.conf.embed.iframe + '" frameBorder="0" allowfullscreen width="' + width + '" height="' + height + '"></iframe>';
     }
     var props = ['ratio', 'rtmp', 'live', 'bufferTime', 'origin', 'analytics', 'key', 'subscribe', 'swf', 'swfHls', 'embed', 'adaptiveRatio', 'logo'];
     if (embedConf.playlist) props.push('playlist');
     var c = common.pick(player.conf, props);
     if (c.logo) c.logo = common.createElement('img', {src: c.logo}).src;
     if (!embedConf.playlist || !player.conf.playlist.length) c.clip =  extend({}, player.conf.clip, common.pick(player.video, ['sources']));
     var script = "var w=window,d=document,e;w._fpes||(w._fpes=[],w.addEventListener(\"load\",function(){var s=d.createElement(\"script\");s.src=\"//embed.flowplayer.org/6.0.3/embed.min.js\",d.body.appendChild(s)})),e=[].slice.call(d.getElementsByTagName(\"script\"),-1)[0].parentNode,w._fpes.push({e:e,l:\"$library\",c:$conf});".replace('$conf', JSON.stringify(c)).replace('$library', embedConf.library || '');

     return '<a href="$href">Watch video!\n<script>$script</script></a>'.replace('$href', player.conf.origin || window.location.href).replace('$script', script);

   };
   fptip(root, ".fp-embed", "is-embedding");

   bean.on(root, 'click', '.fp-embed-code textarea',  function() {
      area.select();
   });

   bean.on(root, 'click', '.fp-embed', function() {
      area.textContent = player.embedCode().replace(/(\r\n|\n|\r)/gm,"");
      area.focus();
      area.select();
   });

});

var fptip = function(root, trigger, active) {

  function close() {
    rootClasses.remove(active);
    bean.off(document, '.st');
  }

  var rootClasses = ClassList(root);

  bean.on(root, 'click', trigger || 'a', function(e) {
    e.preventDefault();

    rootClasses.toggle(active);

    if (rootClasses.contains(active)) {

      bean.on(document, 'keydown.st', function(e) {
        if (e.which == 27) close();
      });
      bean.on(document, 'click.st', function(e) {
        if (!common.hasParent(e.target, '.' + active)) close();
      });
    }
  });
};


},{"../common":1,"../flowplayer":18,"bean":20,"class-list":22,"extend-object":26,"is-object":28}],8:[function(_dereq_,module,exports){
'use strict';
/* global jQuery */
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
        registererHandlers.forEach(function(hndlr) {
          elem.removeEventListener(actualEvent, hndlr);
          registererHandlers.splice(registererHandlers.indexOf(hndlr), 1);
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

},{}],9:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    bean = _dereq_('bean'),
    ClassList = _dereq_('class-list'),
    extend = _dereq_('extend-object'),
    common = _dereq_('../common'),
   VENDOR = flowplayer.support.browser.mozilla ? "moz": "webkit",
   FS_ENTER = "fullscreen",
   FS_EXIT = "fullscreen-exit",
   FULL_PLAYER,
   FS_SUPPORT = flowplayer.support.fullscreen,
   FS_NATIVE_SUPPORT = typeof document.exitFullscreen == 'function',
   ua = navigator.userAgent.toLowerCase(),
   IS_SAFARI = /(safari)[ \/]([\w.]+)/.exec(ua) && !/(chrome)[ \/]([\w.]+)/.exec(ua);


// esc button
bean.on(document, "fullscreenchange.ffscr webkitfullscreenchange.ffscr mozfullscreenchange.ffscr MSFullscreenChange.ffscr", function(e) {
  var el = document.webkitCurrentFullScreenElement || document.mozFullScreenElement || document.fullscreenElement || document.msFullscreenElement || e.target;
  if (!FULL_PLAYER && (!el.parentNode || !el.parentNode.getAttribute('data-flowplayer-instance-id'))) return;
  var player = FULL_PLAYER || flowplayer(el.parentNode);
  if (el && !FULL_PLAYER) {
     FULL_PLAYER = player.trigger(FS_ENTER, [el]);
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
      scrollX,
      rootClasses = ClassList(root);

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
                  if (IS_SAFARI && !document.webkitCurrentFullScreenElement && !document.mozFullScreenElement) { // Element.ALLOW_KEYBOARD_INPUT not allowed
                     wrapper[fName]();
                  }
                  return false;
               }
            });

         } else {
            ['exitFullscreen', 'webkitCancelFullScreen', 'mozCancelFullScreen', 'msExitFullscreen'].forEach(function(fName) {
              if (typeof document[fName] === 'function') {
                document[fName]();
                return false;
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

   player.on(FS_ENTER, function(e) {
      rootClasses.add("is-fullscreen");
      if (!FS_SUPPORT) common.css(root, 'position', 'fixed');
      player.isFullscreen = true;

   }).on(FS_EXIT, function(e) {
      var oldOpacity;
      if (!FS_SUPPORT && player.engine === "html5") {
        oldOpacity = root.css('opacity') || '';
        common.css(root, 'opacity', 0);
      }
      if (!FS_SUPPORT) common.css(root, 'position', '');
      rootClasses.remove("is-fullscreen");
      if (!FS_SUPPORT && player.engine === "html5") setTimeout(function() { root.css('opacity', oldOpacity); });
      player.isFullscreen = false;
      win.scrollTo(scrollX, scrollY);
   }).on('unload', function() {
     if (player.isFullscreen) player.fullscreen();
   });

   player.on('shutdown', function() {
     bean.off(document, '.ffscr');
     FULL_PLAYER = null;
   });

});

},{"../common":1,"../flowplayer":18,"bean":20,"class-list":22,"extend-object":26}],10:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    bean = _dereq_('bean'),
    focused,
    focusedRoot,
    IS_HELP = "is-help",
    common = _dereq_('../common'),
    ClassList = _dereq_('class-list');

 // keyboard. single global listener
bean.on(document, "keydown.fp", function(e) {

   var el = focused,
      metaKeyPressed = e.ctrlKey || e.metaKey || e.altKey,
      key = e.which,
      conf = el && el.conf,
      focusedRootClasses = focusedRoot && ClassList(focusedRoot);

   if (!el || !conf.keyboard || el.disabled) return;

   // help dialog (shift key not truly required)
   if ([63, 187, 191].indexOf(key) != -1) {
      focusedRootClasses.toggle(IS_HELP);
      return false;
   }

   // close help / unload
   if (key == 27 && focusedRootClasses.contains(IS_HELP)) {
      focusedRootClasses.toggle(IS_HELP);
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

   var speedhelp = flowplayer.support.video && api.conf.engine !== "flash" &&
      !!document.createElement('video').playbackRate ?
      '<p><em>shift</em> + <em>&#8592;</em><em>&#8594;</em>slower / faster</p>' : '';

   // TODO: add to player-layout.html
   root.appendChild(common.createElement('div', { className: 'fp-help' }, '\
         <a class="fp-close"></a>\
         <div class="fp-help-section fp-help-basics">\
            <p><em>space</em>play / pause</p>\
            <p><em>q</em>unload | stop</p>\
            <p><em>f</em>fullscreen</p>' + speedhelp + '\
         </div>\
         <div class="fp-help-section">\
            <p><em>&#8593;</em><em>&#8595;</em>volume</p>\
            <p><em>m</em>mute</p>\
         </div>\
         <div class="fp-help-section">\
            <p><em>&#8592;</em><em>&#8594;</em>seek</p>\
            <p><em>&nbsp;. </em>seek to previous\
            </p><p><em>1</em><em>2</em>&hellip; <em>6</em> seek to 10%, 20% &hellip; 60% </p>\
         </div>\
   '));

   if (api.conf.tooltip) {
     var ui = common.find('.fp-ui', root)[0];
     ui.setAttribute('title', 'Hit ? for help');
     bean.one(root, "mouseout.tip", '.fp-ui', function() {
       ui.removeAttribute('title');
     });
   }

   bean.on(root, 'click', '.fp-close', function() {
     ClassList(root).toggle(IS_HELP);
   });

   api.bind('shutdown', function() {
     if (focusedRoot == root) focusedRoot = null;
   });

});


},{"../common":1,"../flowplayer":18,"bean":20,"class-list":22}],11:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    isIeMobile = /IEMobile/.test(window.navigator.userAgent),
    ClassList = _dereq_('class-list'),
    common = _dereq_('../common'),
    bean = _dereq_('bean'),
    format = _dereq_('./ui').format,
    UA = window.navigator.userAgent;
if (flowplayer.support.touch || isIeMobile) {

   flowplayer(function(player, root) {
      var isAndroid = /Android/.test(UA) && !/Firefox/.test(UA) && !/Opera/.test(UA),
          isSilk = /Silk/.test(UA),
          androidVer = isAndroid ? parseFloat(/Android\ (\d\.\d)/.exec(UA)[1], 10) : 0,
          rootClasses = ClassList(root);

      // custom load for android
      if (isAndroid && !isIeMobile) {
         if (!/Chrome/.test(UA) && androidVer < 4) {
            var originalLoad = player.load;
            player.load = function(video, callback) {
               var ret = originalLoad.apply(player, arguments);
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
         player.bind('ready pause unload', function() {
           if (timer) {
             clearInterval(timer);
             timer = null;
           }
         });
         player.bind('ready', function() {
           currentTime = 0;
         });
         player.bind('resume', function(ev, api) {
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
      if (!flowplayer.support.volume) {
         rootClasses.add("no-volume");
         rootClasses.add("no-mute");
      }
      rootClasses.add("is-touch");
      if (player.sliders && player.sliders.timeline) player.sliders.timeline.disableAnimation();

      if (!flowplayer.support.inlineVideo || player.conf.native_fullscreen) player.conf.nativesubtitles = true;

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

        if (player.playing && !rootClasses.contains("is-mouseover")) {
          rootClasses.add("is-mouseover");
          rootClasses.remove("is-mouseout");
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (!player.playing && !player.splash && rootClasses.contains('is-mouseout') && !rootClasses.contains('is-mouseover')) {
          setTimeout(function() {
            if (!player.playing && !player.splash) {
              player.resume();
            }
          }, 400);
        }


      });

      // native fullscreen
      if (player.conf.native_fullscreen && typeof document.createElement('video').webkitEnterFullScreen === 'function') {
         player.fullscreen = function() {
            var video = common.find('video.fp-engine', root)[0];
            video.webkitEnterFullScreen();
            bean.one(video, 'webkitendfullscreen', function() {
              common.prop(video, 'controls', true);
              common.prop(video, 'controls', false);
            });
         };
      }


      // Android browser gives video.duration == 1 until second 'timeupdate' event
      if (isAndroid || isSilk) player.bind("ready", function() {

         var video = common.find('video.fp-engine', root)[0];
         bean.one(video, 'canplay', function() {
            video.play();
         });
         video.play();

         player.bind("progress.dur", function() {

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


},{"../common":1,"../flowplayer":18,"./ui":17,"bean":20,"class-list":22}],12:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    extend = _dereq_('extend-object'),
    bean = _dereq_('bean'),
    ClassList = _dereq_('class-list'),
    common = _dereq_('../common'),
    Resolve = _dereq_('./resolve'),
    resolver = new Resolve(),
    $ = window.jQuery,
    externalRe = /^#/;
flowplayer(function(player, root) {

   var conf = extend({ active: 'is-active', advance: true, query: ".fp-playlist a" }, player.conf),
      klass = conf.active, rootClasses = ClassList(root);

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
      if (i === player.video.index) return player.load(arg, function() { player.resume(); });
      player.off('resume.fromfirst'); // Don't start from beginning if clip explicitely chosen
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

   player.setPlaylist = function(items) {
     player.conf.playlist = items;
     delete player.video.index;
     generatePlaylist();
     return player;
   };

   player.addPlaylistItem = function(item) {
     return player.setPlaylist(player.conf.playlist.concat([item]));
   };

   player.removePlaylistItem = function(idx) {
     var pl = player.conf.playlist;
     return player.setPlaylist(pl.slice(0, idx).concat(pl.slice(idx+1)));
   };

   bean.on(root, 'click', '.fp-next', player.next);
   bean.on(root, 'click', '.fp-prev', player.prev);

   if (conf.advance) {
      player.off("finish.pl").on("finish.pl", function(e, player) {
         // clip looping
         if (player.video.loop) return player.seek(0, function() { player.resume(); });
         // next clip is found or loop
         var next = player.video.index >= 0 ? player.video.index + 1 : undefined;
         if (next < player.conf.playlist.length || conf.loop) {
            next = next === player.conf.playlist.length ? 0 : next;
            rootClasses.remove('is-finished');
            setTimeout(function() { // Let other finish callbacks fire first
               player.play(next);
            });

         // stop to last clip, play button starts from 1:st clip
         } else {

            // If we have multiple items in playlist, start from first
            if (player.conf.playlist.length > 1) player.one("resume.fromfirst", function() {
               player.play(0);
               return false;
            });
         }
      });
   }

   function generatePlaylist() {
      var plEl = common.find('.fp-playlist', root)[0];
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
            'data-index': i
         }));
      });
   }

   var playlistInitialized = false;
   if (player.conf.playlist.length) { // playlist configured by javascript, generate playlist
      playlistInitialized = true;
      generatePlaylist();
      if (!player.conf.clip || !player.conf.clip.sources.length) player.conf.clip = player.conf.playlist[0];
   }

   if (els().length && !playlistInitialized) { //generate playlist from existing elements
       player.conf.playlist = [];
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
    player.on("load", function(e, api, video) {
       if (!player.conf.playlist.length) return;
       var prev = active()[0],
          prevIndex = prev && prev.getAttribute('data-index'),
          index = video.index = video.index || player.video.index || 0,
          el = common.find(conf.query +'[data-index="' + index + '"]', queryRoot())[0],
          is_last = index == player.conf.playlist.length - 1;
       if (prev) ClassList(prev).remove(klass);
       if (el) ClassList(el).add(klass);
       // index
       rootClasses.remove("video" + prevIndex);
       rootClasses.add("video" + index);
       common.toggleClass(root, "last-video", is_last);

       // video properties
       video.index = api.video.index = index;
       video.is_last = api.video.is_last = is_last;

    // without namespace callback called only once. unknown rason.
    }).on("unload.pl", function() {
       if (!player.conf.playlist.length) return;
       active().forEach(function(el) {
         ClassList(el).toggle(klass);
       });
       player.conf.playlist.forEach(function(itm, i) {
         rootClasses.remove('video' + i);
       });
    });

   if (player.conf.playlist.length) {
      // disable single clip looping
      player.conf.loop = false;
   }


});

},{"../common":1,"../flowplayer":18,"./resolve":13,"bean":20,"class-list":22,"extend-object":26}],13:[function(_dereq_,module,exports){
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
    /* global $ */
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

},{"extend-object":26}],14:[function(_dereq_,module,exports){
'use strict';
// skip IE policies
// document.ondragstart = function () { return false; };
//
var ClassList = _dereq_('class-list'),
    bean = _dereq_('bean'),
    common = _dereq_('../common');


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
  var IS_IPAD = /iPad/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);

  var progress = common.lastChild(root),
      rootClasses = ClassList(root),
      progressClasses = ClassList(progress),
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
           progressClasses.remove('animated');
            if (skipAnimation) {
              progressClasses.remove('animated');
            } else {
              progressClasses.add('animated');
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
      rootClasses.add('is-dragging');
      fire(mousemove(e));

      bean.on(document, 'mousemove.sld touchmove.sld', function(e) {
        e.preventDefault();
        delayedFire(mousemove(e));

      });
      bean.one(document, 'mouseup touchend', function() {
         api.dragging = false;
         rootClasses.remove('is-dragging');
         bean.off(document, 'mousemove.sld touchmove.sld');
      });

     }

  });
  return api;
};

module.exports = slider;

},{"../common":1,"bean":20,"class-list":22}],15:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    common = _dereq_('../common'),
    bean = _dereq_('bean'),
    ClassList = _dereq_('class-list');

flowplayer.defaults.subtitleParser = function(txt) {
  var TIMECODE_RE = /^(([0-9]{2}:){1,2}[0-9]{2}[,.][0-9]{3}) --\> (([0-9]{2}:){1,2}[0-9]{2}[,.][0-9]{3})(.*)/;

  function seconds(timecode) {
     var els = timecode.split(':');
     if (els.length == 2) els.unshift(0);
     return els[0] * 60 * 60 + els[1] * 60 + parseFloat(els[2].replace(',','.'));
  }

  var entries = [];
  for (var i = 0, lines = txt.split("\n"), len = lines.length, entry = {}, title, timecode, text, cue; i < len; i++) {
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

flowplayer(function(p, root) {
  var wrapClasses, currentPoint, wrap,
      rootClasses = ClassList(root),
      subtitleControl;

  var createSubtitleControl = function() {
    subtitleControl = common.createElement('a', {className: 'fp-menu'});
    var menu = common.createElement('ul', {className: 'fp-dropdown fp-dropup'});
    menu.appendChild(common.createElement('li', {'data-subtitle-index': -1}, 'No subtitles'));
    (p.video.subtitles || []).forEach(function(st, i) {
      var srcLang = st.srclang || 'en',
          label = st.label || 'Default (' + srcLang + ')';
      var item = common.createElement('li', {'data-subtitle-index': i}, label);
      menu.appendChild(item);
    });
    subtitleControl.appendChild(menu);
    common.find('.fp-controls', root)[0].appendChild(subtitleControl);
    return subtitleControl;
  };

  bean.on(root, 'click', '.fp-menu', function(ev) {
    ClassList(subtitleControl).toggle('dropdown-open');
  });

  bean.on(root, 'click', '.fp-menu li[data-subtitle-index]', function(ev) {
    var idx = ev.target.getAttribute('data-subtitle-index');
    if (idx === '-1') return p.disableSubtitles();
    p.loadSubtitles(idx);
  });

  var createUIElements = function() {
    var playerEl = common.find('.fp-player', root)[0];
    wrap = common.find('.fp-subtitle', root)[0];
    wrap = wrap || common.appendTo(common.createElement('div', {'class': 'fp-subtitle'}), playerEl);
    Array.prototype.forEach.call(wrap.children, common.removeNode);
    wrapClasses = ClassList(wrap);
    common.find('.fp-menu', root).forEach(common.removeNode);
    createSubtitleControl();
  };


  p.on('ready',  function(ev, player, video) {
    var conf = player.conf;
    if (flowplayer.support.subtitles && conf.nativesubtitles && player.engine.engineName == 'html5') {
      var setMode = function(mode) {
        var tracks = common.find('video', root)[0].textTracks;
        if (!tracks.length) return;
        tracks[0].mode = mode;
      };
      if (!video.subtitles || !video.subtitles.length) return;
      var videoTag = common.find('video.fp-engine', root)[0];
      video.subtitles.forEach(function(st) {
        videoTag.appendChild(common.createElement('track', {
          kind: 'subtitles',
          srclang: st.srclang || 'en',
          label: st.label || 'en',
          src: st.src,
          'default': st['default']
        }));
      });
      setMode('disabled');
      setMode('showing');
      return;
    }

    player.subtitles = [];

    createUIElements();

    rootClasses.remove('has-menu');

    p.disableSubtitles();

    if (!video.subtitles || !video.subtitles.length) return;

    rootClasses.add('has-menu');
    var defaultSubtitle = video.subtitles.filter(function(one) {
      return one['default'];
    })[0];
    if (defaultSubtitle) player.loadSubtitles(video.subtitles.indexOf(defaultSubtitle));
  });

  p.bind("cuepoint", function(e, api, cue) {
    if (cue.subtitle) {
       currentPoint = cue.index;
       common.html(wrap, cue.subtitle.text);
       wrapClasses.add('fp-active');
    } else if (cue.subtitleEnd) {
       wrapClasses.remove('fp-active');
       currentPoint = cue.index;
    }
  });

  p.bind("seek", function(e, api, time) {
    // Clear future subtitles if seeking backwards
    if (currentPoint && p.cuepoints[currentPoint] && p.cuepoints[currentPoint].time > time) {
       wrapClasses.remove('fp-active');
       currentPoint = null;
    }
    (p.cuepoints || []).forEach(function(cue) {
      var entry = cue.subtitle;
      //Trigger cuepoint if start time before seek position and end time nonexistent or in the future
      if (entry && currentPoint != cue.index) {
        if (time >= cue.time && (!entry.endTime || time <= entry.endTime)) p.trigger("cuepoint", [p, cue]);
      } // Also handle cuepoints that act as the removal trigger
      else if (cue.subtitleEnd && time >= cue.time && cue.index == currentPoint + 1) p.trigger("cuepoint", [p, cue]);
    });

  });

  var setActiveSubtitleClass = function(idx) {
    common.toggleClass(common.find('li.active', root)[0], 'active');
    common.toggleClass(common.find('li[data-subtitle-index="' + idx + '"]', root)[0], 'active');
  };

  p.disableSubtitles = function() {
    p.subtitles = [];
    (p.cuepoints || []).forEach(function(c) {
      if (c.subtitle || c.subtitleEnd) p.removeCuepoint(c);
    });
    if (wrap) Array.prototype.forEach.call(wrap.children, common.removeNode);
    setActiveSubtitleClass(-1);
    return p;
  };

  p.loadSubtitles = function(i) {
    //First remove possible old subtitles
    p.disableSubtitles();

    var st = p.video.subtitles[i];

    var url = st.src;
    if (!url) return;
    setActiveSubtitleClass(i);
    common.xhrGet(url, function(txt) {
      var entries = p.conf.subtitleParser(txt);
      entries.forEach(function(entry) {
        var cue = { time: entry.startTime, subtitle: entry, visible: false };
        p.subtitles.push(entry);
        p.addCuepoint(cue);
        p.addCuepoint({ time: entry.endTime, subtitleEnd: entry.title, visible: false });

        // initial cuepoint
        if (entry.startTime === 0 && !p.video.time) {
          p.trigger("cuepoint", [p, cue]);
        }
      });
    }, function() {
      p.trigger("error", {code: 8, url: url });
      return false;
    });
    return p;
  };
});


},{"../common":1,"../flowplayer":18,"bean":20,"class-list":22}],16:[function(_dereq_,module,exports){
'use strict';
/* global ActiveXObject */
var flowplayer = _dereq_('../flowplayer'),
    extend = _dereq_('extend-object');
(function() {

   var parseIpadVersion = function(UA) {
      var e = /Version\/(\d\.\d)/.exec(UA);
      if (e && e.length > 1) {
         return parseFloat(e[1], 10);
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

   var video = createVideoTag(),
      UA = navigator.userAgent,
      IS_IE = b.msie || /Trident\/7/.test(UA),
      IS_IPAD = /iPad|MeeGo/.test(UA) && !/CriOS/.test(UA),
      IS_IPAD_CHROME = /iPad/.test(UA) && /CriOS/.test(UA),
      IS_IPHONE = /iP(hone|od)/i.test(UA) && !/iPad/.test(UA) && !/IEMobile/i.test(UA),
      IS_ANDROID = /Android/.test(UA) && !/Firefox/.test(UA),
      IS_ANDROID_FIREFOX = /Android/.test(UA) && /Firefox/.test(UA),
      IS_SILK = /Silk/.test(UA),
      IS_WP = /IEMobile/.test(UA),
      WP_VER = IS_WP ? parseFloat(/Windows\ Phone\ (\d+\.\d+)/.exec(UA)[1], 10) : 0,
      IE_MOBILE_VER = IS_WP ? parseFloat(/IEMobile\/(\d+\.\d+)/.exec(UA)[1], 10) : 0,
      IPAD_VER = IS_IPAD ? parseIpadVersion(UA) : 0,
      ANDROID_VER = IS_ANDROID ? parseFloat(/Android\ (\d\.\d)/.exec(UA)[1], 10) : 0,
      s = extend(flowplayer.support, {

        browser: b,
        subtitles: !!video.addTextTrack,
        fullscreen: typeof document.webkitCancelFullScreen == 'function' && !/Mac OS X 10_5.+Version\/5\.0\.\d Safari/.test(UA) ||
              document.mozFullScreenEnabled ||
              typeof document.exitFullscreen == 'function' ||
              typeof document.msExitFullscreen == 'function',
        inlineBlock: !(IS_IE && b.version < 8),
        touch: ('ontouchstart' in window),
        dataload: !IS_IPAD && !IS_IPHONE && !IS_WP,
        zeropreload: !IS_IE && !IS_ANDROID, // IE supports only preload=metadata
        volume: !IS_IPAD && !IS_ANDROID && !IS_IPHONE && !IS_SILK && !IS_IPAD_CHROME,
        cachedVideoTag: !IS_IPAD && !IS_IPHONE && !IS_IPAD_CHROME && !IS_WP,
        firstframe: !IS_IPHONE && !IS_IPAD && !IS_ANDROID && !IS_SILK && !IS_IPAD_CHROME && !IS_WP && !IS_ANDROID_FIREFOX,
        inlineVideo: !IS_IPHONE && (!IS_WP || (WP_VER >= 8.1 && IE_MOBILE_VER >= 11)) && (!IS_ANDROID || ANDROID_VER >= 3),
        hlsDuration: !IS_ANDROID && (!b.safari || IS_IPAD || IS_IPHONE || IS_IPAD_CHROME),
        seekable: !IS_IPAD && !IS_IPAD_CHROME
    });

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


},{"../flowplayer":18,"extend-object":26}],17:[function(_dereq_,module,exports){
'use strict';
var flowplayer = _dereq_('../flowplayer'),
    common = _dereq_('../common'),
    ClassList = _dereq_('class-list'),
    bean = _dereq_('bean'),
    slider = _dereq_('./slider');

function zeropad(val) {
   val = parseInt(val, 10);
   return val >= 10 ? val : "0" + val;
}

// display seconds in hh:mm:ss format
function format(sec) {

   sec = sec || 0;

   var h = Math.floor(sec / 3600),
       min = Math.floor(sec / 60);

   sec = sec - (min * 60);

   if (h >= 1) {
      min -= h * 60;
      return h + ":" + zeropad(min) + ":" + zeropad(sec);
   }

   return zeropad(min) + ":" + zeropad(sec);
}

flowplayer(function(api, root) {

   var conf = api.conf,
      support = flowplayer.support,
      hovertimer,
      rootClasses = ClassList(root);
   common.find('.fp-ratio,.fp-ui', root).forEach(common.removeNode);
   rootClasses.add('flowplayer');
   root.appendChild(common.createElement('div', {className: 'fp-ratio'}));
   var ui = common.createElement('div', {className: 'fp-ui'}, '\
         <div class="waiting"><em></em><em></em><em></em></div>\
         <a class="fullscreen"></a>\
         <a class="unload"></a>\
         <p class="speed"></p>\
         <div class="controls">\
            <a class="play"></a>\
            <div class="timeline">\
               <div class="buffer"></div>\
               <div class="progress"></div>\
            </div>\
            <div class="timeline-tooltip fp-tooltip"></div>\
            <div class="volume">\
               <a class="mute"></a>\
               <div class="volumeslider">\
                  <div class="volumelevel"></div>\
               </div>\
            </div>\
         </div>\
         <div class="time">\
            <em class="elapsed">00:00</em>\
            <em class="remaining"></em>\
            <em class="duration">00:00</em>\
         </div>\
         <div class="message"><h2></h2><p></p></div>'.replace(/class="/g, 'class="fp-'));
   root.appendChild(ui);
   function find(klass) {
     return common.find(".fp-" + klass, root)[0];
   }

   // widgets
   var progress = find("progress"),
      buffer = find("buffer"),
      elapsed = find("elapsed"),
      remaining = find("remaining"),
      waiting = find("waiting"),
      ratio = find("ratio"),
      speed = find("speed"),
      speedClasses = ClassList(speed),
      durationEl = find("duration"),
      controls = find('controls'),
      timelineTooltip = find('timeline-tooltip'),
      origRatio = common.css(ratio, 'padding-top'),

      // sliders
      timeline = find("timeline"),
      timelineApi = slider(timeline, api.rtl),

      volume = find("volume"),
      fullscreen = find("fullscreen"),
      volumeSlider = find("volumeslider"),
      volumeApi = slider(volumeSlider, api.rtl),
      noToggle = rootClasses.contains('fixed-controls') || rootClasses.contains('no-toggle');

   timelineApi.disableAnimation(rootClasses.contains('is-touch'));
   api.sliders = api.sliders || {};
   api.sliders.timeline = timelineApi;
   api.sliders.volume = volumeApi;

   // aspect ratio
   function setRatio(val) {
     common.css(ratio, 'padding-top', val * 100 + "%");
     if (!support.inlineBlock) common.height(common.find('object', root)[0], common.height(root));
   }

   function hover(flag) {
     if (flag) {
       rootClasses.add('is-mouseover');
       rootClasses.remove('is-mouseout');
     } else {
       rootClasses.add('is-mouseout');
       rootClasses.remove('is-mouseover');
     }
   }

   // loading...
   if (!support.animation) common.html(waiting, "<p>loading &hellip;</p>");

   if (conf.ratio) setRatio(conf.ratio);

   // no fullscreen in IFRAME
   try {
      if (!conf.fullscreen) common.removeNode(fullscreen);

   } catch (e) {
      common.removeNode(fullscreen);
   }

   api.on("ready", function(ev, api, video) {

      var duration = api.video.duration;

      timelineApi.disable(api.disabled || !duration);

      if (conf.adaptiveRatio && !isNaN(video.height / video.width)) setRatio(video.height / video.width, true);

      // initial time & volume
      common.html([durationEl, remaining], format(duration));

      // do we need additional space for showing hour
      common.toggleClass(root, 'is-long', duration >= 3600);
      volumeApi.slide(api.volumeLevel);

      if (api.engine.engineName === 'flash') timelineApi.disableAnimation(true, true);
      else timelineApi.disableAnimation(false);
      common.find('.fp-title', ui).forEach(common.removeNode);
      if (video.title) {
        common.prepend(ui, common.createElement('div', {
          className: 'fp-title'
        }, video.title));
      }


   }).on("unload", function() {
     if (!origRatio) common.css(ratio, "paddingTop", "");
     timelineApi.slide(0);

   // buffer
   }).on("buffer", function() {
      var video = api.video,
         max = video.buffer / video.duration;

      if (!video.seekable && support.seekable) timelineApi.max(max);
      if (max < 1) common.css(buffer, "width", (max * 100) + "%");
      else common.css(buffer, 'width', '100%');

   }).on("speed", function(e, api, val) {
     common.text(speed, val + "x");
     speedClasses.add('fp-hilite');
     setTimeout(function() { speedClasses.remove('fp-hilite'); }, 1000);

   }).on("buffered", function() {
     common.css(buffer, 'width', '100%');
      timelineApi.max(1);

   // progress
   }).on("progress", function() {

      var time = api.video.time,
         duration = api.video.duration;

      if (!timelineApi.dragging) {
        timelineApi.slide(time / duration, api.seeking ? 0 : 250);
      }

      common.html(elapsed, format(time));
      common.html(remaining, '-' + format(duration - time));

   }).on("finish resume seek", function(e) {
      common.toggleClass(root, "is-finished", e.type == "finish");

   }).on("stop", function() {
      common.html(elapsed, format(0));
      timelineApi.slide(0, 100);

   }).on("finish", function() {
      common.html(elapsed, format(api.video.duration));
      timelineApi.slide(1, 100);
      rootClasses.remove('is-seeking');

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
      common.addClass(root, 'is-error');
      if (error) {
         error.message = conf.errors[error.code];
         api.error = true;

         var el = common.find('.fp-message', root)[0],
             video = error.video || api.video;
         common.find('h2', el)[0].innerHTML = (api.engine && api.engine.engineName || 'html5') + ": " + error.message;
         common.find('p', el)[0].innerHTML = error.url || video.url || video.src || conf.errorUrls[error.code];
         api.off("mouseenter click");
         rootClasses.remove('is-mouseover');
      }


   // hover
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
       rootClasses.add('is-mouseover');
       rootClasses.remove('is-mouseout');
     }

   // click
   });
   bean.on(root, "click.player", function(e) {
     if (api.disabled) return;
     var kls = ClassList(e.target);
      if (kls.contains('fp-ui') || kls.contains('fp-engine') || e.flash) {
         if (e.preventDefault) e.preventDefault();
         return api.toggle();
      }
   });

   bean.on(root, 'mousemove', '.fp-timeline', function(ev) {
     var x = ev.pageX || ev.clientX,
         delta = x - common.offset(timeline).left,
         percentage = delta / common.width(timeline),
         seconds = percentage * api.video.duration;
     if (percentage < 0) return;
     common.html(timelineTooltip, format(seconds));
     common.css(timelineTooltip, 'left', (x - common.offset(controls).left - common.width(timelineTooltip) / 2) + 'px');
   });

   bean.on(root, 'contextmenu', function(ev) {
      var o = common.offset(common.find('.fp-player', root)[0]),
          w = window,
          left = ev.clientX - o.left,
          t = ev.clientY - (o.top + w.scrollY);
      var menu = common.find('.fp-context-menu', root)[0];
      if (!menu) return;
      ev.preventDefault();
      common.css(menu,
      {left: left + 'px',
         top: t + 'px',
         display: 'block'
      });
      bean.on(root, 'click', '.fp-context-menu', function(ev) {
         ev.stopPropagation();
      });
      bean.on(document, 'click.outsidemenu', function(ev) {
         common.css(menu, 'display', 'none');
         bean.off(document, 'click.outsidemenu');
      });
   });
   api.on('flashdisabled', function() {
     rootClasses.add('is-flash-disabled');
     api.one('ready', function() {
       rootClasses.remove('is-flash-disabled');
       common.find('.fp-flash-disabled', root).forEach(common.removeNode);
     });
     root.appendChild(common.createElement('div', {className: "fp-flash-disabled"}, 'Adobe Flash is disabled for this page, click player area to enable'));
   });

   // poster -> background image
   if (conf.poster) common.css(root, 'background-image', "url(" + conf.poster + ")");

   var bc = common.css(root, 'background-color'),
      has_bg = common.css(root, 'background-image') != "none" || bc && bc != "rgba(0, 0, 0, 0)" && bc != "transparent";

   // is-poster class
   if (has_bg && !conf.splash && !conf.autoplay) {

      api.on("ready stop", function() {
         rootClasses.add("is-poster");
         api.one("progress", function() {
            rootClasses.remove("is-poster");
         });
      });

   }

   if (typeof conf.splash === 'string') {
     common.css(root, 'background-image', "url('" + conf.splash + "')");
   }

   // default background color if not present
   if (!has_bg && api.forcedSplash) {
      common.css(root, "background-color", "#555");
   }

   bean.on(root, 'click', '.fp-toggle, .fp-play', function() {
     if (api.disabled) return;
     api.toggle();
   });

   /* controlbar elements */
   bean.on(root, 'click', '.fp-mute', function() { api.mute(); });
   bean.on(root, 'click', '.fp-fullscreen', function() { api.fullscreen(); });
   bean.on(root, 'click', '.fp-unload', function() { api.unload(); });

   bean.on(timeline, 'slide', function(val) {
     api.seeking = true;
     api.seek(val * api.video.duration);
   });

   bean.on(volumeSlider, 'slide', function(val) {
      api.volume(val);
   });

   // times

   var time = find('time');
   bean.on(root, 'click', '.fp-time', function() {
     ClassList(time).toggle('is-inverted');
   });

   hover(noToggle);

   api.on('shutdown', function() {
     bean.off(timeline);
     bean.off(volumeSlider);
   });

});


module.exports.format = format;

},{"../common":1,"../flowplayer":18,"./slider":14,"bean":20,"class-list":22}],18:[function(_dereq_,module,exports){
'use strict';
var extend = _dereq_('extend-object'),
    isFunction = _dereq_('is-function'),
    ClassList = _dereq_('class-list'),
    bean = _dereq_('bean'),
    common = _dereq_('./common'),
    events = _dereq_('./ext/events');

var instances = [],
   extensions = [],
   UA = window.navigator.userAgent;


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

   version: '6.0.3',

   engines: [],

   conf: {},

   set: function(key, value) {
      if (typeof key === 'string') flowplayer.conf[key] = value;
      else extend(flowplayer.conf, key);
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

      splash: false,

      live: false,

      swf: "//releases.flowplayer.org/6.0.3/flowplayer.swf",
      swfHls: "//releases.flowplayer.org/6.0.3/flowplayerhls.swf",

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

      hlsFix: isSafari && safariVersion < 8

   },
   // Expose utilities for plugins
   bean: bean,
   common: common,
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
      rootClasses = ClassList(root),
      conf = extend({}, flowplayer.defaults, flowplayer.conf, opts),
      storage = {},
      lastSeekPosition,
      engine,
      url,
      urlResolver = new URLResolver();

      rootClasses.add('is-loading');

      try {
         storage = supportLocalStorage ? window.localStorage : storage;
      } catch(e) {}

      var isRTL = (root.currentStyle && root.currentStyle.direction === 'rtl') ||
        (window.getComputedStyle && window.getComputedStyle(root, null) !== null && window.getComputedStyle(root, null).getPropertyValue('direction') === 'rtl');

      if (isRTL) rootClasses.add('is-rtl');

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
         load: function(video, callback) {

            if (api.error || api.loading) return;
            api.video = {};

            api.finished = false;

            video = video || conf.clip;

            // resolve URL
            video = extend({}, urlResolver.resolve(video, conf.clip.sources));
            if (api.playing || api.engine) video.autoplay = true;
            var engineImpl = selectEngine(video);
            if (!engineImpl) return api.trigger("error", [api, { code: flowplayer.support.flashVideo ? 5 : 10 }]);
            if (!engineImpl.engineName) throw new Error('engineName property of factory should be exposed');
            if (!api.engine || engineImpl.engineName !== api.engine.engineName) {
              api.ready = false;
              if (api.engine) {
                api.engine.unload();
                api.conf.autoplay = true;
              }
              engine = api.engine = engineImpl(api, root);
              api.one('ready', function() {
                engine.volume(api.volumeLevel);
              });
            }

            extend(video, engine.pick(video.sources.filter(function(source) { // Filter out sources explicitely configured for some other engine
              if (!source.engine) return true;
              return source.engine === engine.engineName;
            })));

            if (video.src) {
               video.src = common.createElement('a', {href: video.src}).href;
               var e = api.trigger('load', [api, video, engine], true);
               if (!e.defaultPrevented) {
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
            if (api.ready && !api.seeking && !api.loading) {
               engine.pause();
               api.one("pause", fn);
            }
            return api;
         },

         resume: function() {

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
            if (api.ready && !api.live) {

               if (typeof time == "boolean") {
                  var delta = api.video.duration * 0.1;
                  time = api.video.time + (time ? delta : -delta);
               }
               time = lastSeekPosition = Math.min(Math.max(time, 0), api.video.duration).toFixed(1);
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
            var time = position === undefined ? lastSeekPosition : api.video.duration * 0.1 * position;
            return api.seek(time, fn);
         },

         mute: function(flag, skipStore) {
           if (flag === undefined) flag = !api.muted;
           if (!skipStore) {
             storage.muted = api.muted = flag;
             storage.volume = !isNaN(storage.volume) ? storage.volume : conf.volume; // make sure storage has volume
           }
           api.volume(flag ? 0 : storage.volume, true);
           api.trigger("mute", [api, flag]);
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
               api.seek(0, function() {
                  api.trigger("stop");
               });
            }
            return api;
         },

         unload: function() {
            if (!rootClasses.contains("is-embedding")) {

               if (conf.splash) {
                  api.trigger("unload", [api]);
                  if (engine) engine.unload();
               } else {
                  api.stop();
               }
            }
            return api;
         },

         shutdown: function() {
           api.unload();
           api.trigger('shutdown', [api]);
           bean.off(root);
           delete instances[root.getAttribute('data-flowplayer-instance-id')];
         },

         disable: function(flag) {
            if (flag === undefined) flag = !api.disabled;

            if (flag != api.disabled) {
               api.disabled = flag;
               api.trigger("disable", flag);
            }
            return api;
         }

      };

      api.conf = extend(api.conf, conf);

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

            // splash
            if (conf.splash || rootClasses.contains("is-splash") || !flowplayer.support.firstframe) {
               api.forcedSplash = !conf.splash && !rootClasses.contains("is-splash");
               api.splash = conf.autoplay = true;
               if (!conf.splash) conf.splash = true;
               rootClasses.add("is-splash");
            }

            if (conf.splash) common.find('video', root).forEach(common.removeNode);

            if (conf.live || rootClasses.contains('is-live')) {
               api.live = conf.live = true;
               rootClasses.add('is-live');
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
            rootClasses.add("is-loading");
            api.loading = true;

            if (typeof video.live !== 'undefined') {
              common.toggleClass(root, 'is-live', video.live);
              api.live = video.live;
            }


         }).on("ready", function(e, api, video) {
            video.time = 0;
            api.video = video;

            rootClasses.remove("is-loading");
            api.loading = false;

            // saved state
            if (api.muted) api.mute(true, true);
            else api.volume(api.volumeLevel);

            // see https://github.com/flowplayer/flowplayer/issues/479

            var hlsFix = api.conf.hlsFix && /mpegurl/i.exec(video.type);
            common.toggleClass(root, 'hls-fix', !!hlsFix);

         }).on("unload", function(e) {
            rootClasses.remove("is-loading");
            api.loading = false;


         }).on("ready unload", function(e) {
           var is_ready = e.type == "ready";
           common.toggleClass(root, 'is-splash', !is_ready);
           common.toggleClass(root, 'is-ready', is_ready);
           api.ready = is_ready;
           api.splash = !is_ready;


         }).on("progress", function(e, api, time) {
            api.video.time = time;


         }).on("speed", function(e, api, val) {
            api.currentSpeed = val;

         }).on("volume", function(e, api, level) {
            api.volumeLevel = Math.round(level * 100) / 100;
            if (!api.muted) storage.volume = level;
            else if (level) api.mute(false);


         }).on("beforeseek seek", function(e) {
            api.seeking = e.type == "beforeseek";
            common.toggleClass(root, 'is-seeking', api.seeking);

         }).on("ready pause resume unload finish stop", function(e, _api, video) {

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

         }).on("finish", function(e) {
            api.finished = true;

         }).on("error", function() {
         });
      }

      // boot
      api.trigger('boot', [api, root]);
  return api;
}

},{"./common":1,"./ext/events":8,"./ext/resolve":13,"bean":20,"class-list":22,"extend-object":26,"is-function":27}],19:[function(_dereq_,module,exports){
//Flowplayer with extensions

_dereq_('es5-shim');

var flowplayer = module.exports = _dereq_('./flowplayer');
//

//Support needed before engines
_dereq_('./ext/support');

//Engines
_dereq_('./engine/embed');
_dereq_('./engine/html5');
_dereq_('./engine/flash');

//Extensions
//require('./ext/slider'); //TODO enable
_dereq_('./ext/ui');
_dereq_('./ext/keyboard');
_dereq_('./ext/playlist');
_dereq_('./ext/cuepoint');
_dereq_('./ext/subtitle');
_dereq_('./ext/analytics');
_dereq_('./ext/embed');
//Have to add fullscreen last
_dereq_('./ext/fullscreen');

_dereq_('./ext/mobile');
flowplayer(function(e,o){function a(e){var o=document.createElement("a");return o.href=e,t.hostname(o.hostname)}var n=function(e,o){var a=e.className.split(" ");-1===a.indexOf(o)&&(e.className+=" "+o)},r=function(e){return"none"!==window.getComputedStyle(e).display},l=e.conf,t=flowplayer.common,i=t.createElement,d=l.swf.indexOf("flowplayer.org")&&l.e&&o.getAttribute("data-origin"),s=d?a(d):t.hostname(),p=(document,l.key);"file:"==location.protocol&&(s="localhost"),e.load.ed=1,l.hostname=s,l.origin=d||location.href,d&&n(o,"is-embedded"),"string"==typeof p&&(p=p.split(/,\s*/));var f=function(e,a){var n=i("a",{href:a,className:"fp-brand"});n.innerHTML=e,t.find(".fp-controls",o)[0].appendChild(n)};if(p&&"function"==typeof key_check&&key_check(p,s)){if(l.logo){var c=i("a",{href:d,className:"fp-logo"});l.embed&&l.embed.popup&&(c.target="_blank");var h=i("img",{src:l.logo});c.appendChild(h),o.appendChild(c)}l.brand&&d||l.brand&&l.brand.showOnOrigin?f(l.brand.text||l.brand,d||location.href):t.addClass(o,"no-brand")}else{f("flowplayer","http://flowplayer.org");var c=i("a",{href:"http://flowplayer.org"});o.appendChild(c);var y=i("div",{className:"fp-context-menu"},'<ul><li class="copyright">&copy; 2015</li><li><a href="http://flowplayer.org">About Flowplayer</a></li><li><a href="http://flowplayer.org/license">GPL based license</a></li></ul>'),u=window.location.href.indexOf("localhost"),m=t.find(".fp-player",o)[0];7!==u&&(m||o).appendChild(y),e.on("pause resume finish unload ready",function(e,a){t.removeClass(o,"no-brand");var n=-1;if(a.video.src)for(var l=[["org","flowplayer","drive"],["org","flowplayer","my"]],i=0;i<l.length&&(n=a.video.src.indexOf("://"+l[i].reverse().join(".")),-1===n);i++);if((4===n||5===n)&&t.addClass(o,"no-brand"),/pause|resume/.test(e.type)&&"flash"!=a.engine.engineName&&4!=n&&5!=n){var d={display:"block",position:"absolute",left:"16px",bottom:"46px",zIndex:99999,width:"100px",height:"20px",backgroundImage:"url("+[".png","logo","/",".net",".cloudfront","d32wqyuo10o653","//"].reverse().join("")+")"};for(var s in d)d.hasOwnProperty(s)&&(c.style[s]=d[s]);a.load.ed=r(c)&&(7===u||y.parentNode==o||y.parentNode==m)&&!t.hasClass(o,"no-brand"),a.load.ed||a.pause()}else c.style.display="none"})}});


},{"./engine/embed":2,"./engine/flash":3,"./engine/html5":4,"./ext/analytics":5,"./ext/cuepoint":6,"./ext/embed":7,"./ext/fullscreen":9,"./ext/keyboard":10,"./ext/mobile":11,"./ext/playlist":12,"./ext/subtitle":15,"./ext/support":16,"./ext/ui":17,"./flowplayer":18,"es5-shim":25}],20:[function(_dereq_,module,exports){
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

},{}],21:[function(_dereq_,module,exports){
(function (global){
/*! http://mths.be/punycode v1.2.4 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
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
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

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
		throw RangeError(errors[type]);
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
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
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
	 * http://tools.ietf.org/html/rfc3492#section-3.4
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
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
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
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
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
		'version': '1.2.4',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
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
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],22:[function(_dereq_,module,exports){
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

},{"indexof":23}],23:[function(_dereq_,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],24:[function(_dereq_,module,exports){
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

},{}],25:[function(_dereq_,module,exports){
/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */

// vim: ts=4 sts=4 sw=4 expandtab

// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
;

// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    'use strict';
    /*global define, exports, module */
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
// dereference that costs universally.
var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var NumberPrototype = Number.prototype;
var array_slice = ArrayPrototype.slice;
var array_splice = ArrayPrototype.splice;
var array_push = ArrayPrototype.push;
var array_unshift = ArrayPrototype.unshift;
var call = FunctionPrototype.call;

// Having a toString local variable name breaks in Opera so use to_string.
var to_string = ObjectPrototype.toString;

var isArray = Array.isArray || function isArray(obj) {
    return to_string.call(obj) === '[object Array]';
};

var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, tryFunctionObject = function tryFunctionObject(value) { try { fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]'; isCallable = function isCallable(value) { if (typeof value !== 'function') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };
var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };

var isArguments = function isArguments(value) {
    var str = to_string.call(value);
    var isArgs = str === '[object Arguments]';
    if (!isArgs) {
        isArgs = !isArray(value) &&
          value !== null &&
          typeof value === 'object' &&
          typeof value.length === 'number' &&
          value.length >= 0 &&
          isCallable(value.callee);
    }
    return isArgs;
};

/* inlined from http://npmjs.com/define-properties */
var defineProperties = (function (has) {
  var supportsDescriptors = Object.defineProperty && (function () {
      try {
          Object.defineProperty({}, 'x', {});
          return true;
      } catch (e) { /* this is ES3 */
          return false;
      }
  }());

  // Define configurable, writable and non-enumerable props
  // if they don't exist.
  var defineProperty;
  if (supportsDescriptors) {
      defineProperty = function (object, name, method, forceAssign) {
          if (!forceAssign && (name in object)) { return; }
          Object.defineProperty(object, name, {
              configurable: true,
              enumerable: false,
              writable: true,
              value: method
          });
      };
  } else {
      defineProperty = function (object, name, method, forceAssign) {
          if (!forceAssign && (name in object)) { return; }
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
function isPrimitive(input) {
    var type = typeof input;
    return input === null ||
        type === 'undefined' ||
        type === 'boolean' ||
        type === 'number' ||
        type === 'string';
}

var ES = {
    // ES5 9.4
    // http://es5.github.com/#x9.4
    // http://jsperf.com/to-integer
    /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */
    ToInteger: function ToInteger(num) {
        var n = +num;
        if (n !== n) { // isNaN
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
        /*jshint eqnull: true */
        if (o == null) { // this matches both null and undefined
            throw new TypeError("can't convert " + o + ' to object');
        }
        return Object(o);
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

                var result = target.apply(
                    this,
                    args.concat(array_slice.call(arguments))
                );
                if (Object(result) === result) {
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
                return target.apply(
                    that,
                    args.concat(array_slice.call(arguments))
                );

            }

        };

        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.

        var boundLength = Math.max(0, target.length - args.length);

        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }

        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

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
// us it in defining shortcuts.
var owns = call.bind(ObjectPrototype.hasOwnProperty);

//
// Array
// =====
//

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
        if (arguments.length === 0) { return []; }
        var args = arguments;
        this.length = Math.max(ES.ToInteger(this.length), 0);
        if (arguments.length > 0 && typeof deleteCount !== 'number') {
            args = array_slice.call(arguments);
            if (args.length < 2) {
                args.push(this.length - start);
            } else {
                args[1] = ES.ToInteger(deleteCount);
            }
        }
        return array_splice.apply(this, args);
    }
}, !spliceWorksWithEmptyObject);

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
defineProperties(Array, { isArray: isArray });

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
var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
        method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
        });

        method.call([1], function () {
            'use strict';
            properlyBoxesStrict = typeof this === 'string';
        }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
};

defineProperties(ArrayPrototype, {
    forEach: function forEach(fun /*, thisp*/) {
        var object = ES.ToObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isCallable(fun)) {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    }
}, !properlyBoxesContext(ArrayPrototype.forEach));

// ES5 15.4.4.19
// http://es5.github.com/#x15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
defineProperties(ArrayPrototype, {
    map: function map(fun /*, thisp*/) {
        var object = ES.ToObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0,
            result = Array(length),
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (!isCallable(fun)) {
            throw new TypeError(fun + ' is not a function');
        }

        for (var i = 0; i < length; i++) {
            if (i in self) {
                result[i] = fun.call(thisp, self[i], i, object);
            }
        }
        return result;
    }
}, !properlyBoxesContext(ArrayPrototype.map));

// ES5 15.4.4.20
// http://es5.github.com/#x15.4.4.20
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
defineProperties(ArrayPrototype, {
    filter: function filter(fun /*, thisp */) {
        var object = ES.ToObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0,
            result = [],
            value,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (!isCallable(fun)) {
            throw new TypeError(fun + ' is not a function');
        }

        for (var i = 0; i < length; i++) {
            if (i in self) {
                value = self[i];
                if (fun.call(thisp, value, i, object)) {
                    result.push(value);
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
    every: function every(fun /*, thisp */) {
        var object = ES.ToObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (!isCallable(fun)) {
            throw new TypeError(fun + ' is not a function');
        }

        for (var i = 0; i < length; i++) {
            if (i in self && !fun.call(thisp, self[i], i, object)) {
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
    some: function some(fun /*, thisp */) {
        var object = ES.ToObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (!isCallable(fun)) {
            throw new TypeError(fun + ' is not a function');
        }

        for (var i = 0; i < length; i++) {
            if (i in self && fun.call(thisp, self[i], i, object)) {
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
    reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) { return list; }) === 'object';
}
defineProperties(ArrayPrototype, {
    reduce: function reduce(fun /*, initial*/) {
        var object = ES.ToObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isCallable(fun)) {
            throw new TypeError(fun + ' is not a function');
        }

        // no value to return if no initial value and an empty array
        if (!length && arguments.length === 1) {
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
                result = fun.call(void 0, result, self[i], i, object);
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
    reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) { return list; }) === 'object';
}
defineProperties(ArrayPrototype, {
    reduceRight: function reduceRight(fun /*, initial*/) {
        var object = ES.ToObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isCallable(fun)) {
            throw new TypeError(fun + ' is not a function');
        }

        // no value to return if no initial value, empty array
        if (!length && arguments.length === 1) {
            throw new TypeError('reduceRight of empty array with no initial value');
        }

        var result, i = length - 1;
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
                result = fun.call(void 0, result, self[i], i, object);
            }
        } while (i--);

        return result;
    }
}, !reduceRightCoercesToObject);

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought /*, fromIndex */) {
        var self = splitString && isString(this) ? this.split('') : ES.ToObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = ES.ToInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2IndexOfBug);

// ES5 15.4.4.15
// http://es5.github.com/#x15.4.4.15
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
var hasFirefox2LastIndexOfBug = Array.prototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
defineProperties(ArrayPrototype, {
    lastIndexOf: function lastIndexOf(sought /*, fromIndex */) {
        var self = splitString && isString(this) ? this.split('') : ES.ToObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }
        var i = length - 1;
        if (arguments.length > 1) {
            i = Math.min(i, ES.ToInteger(arguments[1]));
        }
        // handle negative indices
        i = i >= 0 ? i : length - Math.abs(i);
        for (; i >= 0; i--) {
            if (i in self && sought === self[i]) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2LastIndexOfBug);

//
// Object
// ======
//

// ES5 15.2.3.14
// http://es5.github.com/#x15.2.3.14

// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
var hasDontEnumBug = !({'toString': null}).propertyIsEnumerable('toString'),
    hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype'),
    hasStringEnumBug = !owns('x', '0'),
    dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ],
    dontEnumsLength = dontEnums.length;

defineProperties(Object, {
    keys: function keys(object) {
        var isFn = isCallable(object),
            isArgs = isArguments(object),
            isObject = object !== null && typeof object === 'object',
            isStr = isObject && isString(object);

        if (!isObject && !isFn && !isArgs) {
            throw new TypeError('Object.keys called on a non-object');
        }

        var theKeys = [];
        var skipProto = hasProtoEnumBug && isFn;
        if ((isStr && hasStringEnumBug) || isArgs) {
            for (var i = 0; i < object.length; ++i) {
                theKeys.push(String(i));
            }
        }

        if (!isArgs) {
            for (var name in object) {
                if (!(skipProto && name === 'prototype') && owns(object, name)) {
                    theKeys.push(String(name));
                }
            }
        }

        if (hasDontEnumBug) {
            var ctor = object.constructor,
                skipConstructor = ctor && ctor.prototype === object;
            for (var j = 0; j < dontEnumsLength; j++) {
                var dontEnum = dontEnums[j];
                if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
                    theKeys.push(dontEnum);
                }
            }
        }
        return theKeys;
    }
});

var keysWorksWithArguments = Object.keys && (function () {
    // Safari 5.0 bug
    return Object.keys(arguments).length === 2;
}(1, 2));
var originalKeys = Object.keys;
defineProperties(Object, {
    keys: function keys(object) {
        if (isArguments(object)) {
            return originalKeys(ArrayPrototype.slice.call(object));
        } else {
            return originalKeys(object);
        }
    }
}, !keysWorksWithArguments);

//
// Date
// ====
//

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

defineProperties(Date.prototype, {
    toISOString: function toISOString() {
        var result, length, value, year, month;
        if (!isFinite(this)) {
            throw new RangeError('Date.prototype.toISOString called on non-finite value.');
        }

        year = this.getUTCFullYear();

        month = this.getUTCMonth();
        // see https://github.com/es-shims/es5-shim/issues/111
        year += Math.floor(month / 12);
        month = (month % 12 + 12) % 12;

        // the date time string format is specified in 15.9.1.15.
        result = [month + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];
        year = (
            (year < 0 ? '-' : (year > 9999 ? '+' : '')) +
            ('00000' + Math.abs(year)).slice((0 <= year && year <= 9999) ? -4 : -6)
        );

        length = result.length;
        while (length--) {
            value = result[length];
            // pad months, days, hours, minutes, and seconds to have two
            // digits.
            if (value < 10) {
                result[length] = '0' + value;
            }
        }
        // pad milliseconds to have three digits.
        return (
            year + '-' + result.slice(0, 2).join('-') +
            'T' + result.slice(2).join(':') + '.' +
            ('000' + this.getUTCMilliseconds()).slice(-3) + 'Z'
        );
    }
}, hasNegativeDateBug);

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
        var O = Object(this);
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
var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z'));
var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
if (!Date.parse || doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
    // XXX global assignment won't work in embeddings that use
    // an alternate object for the context.
    /*global Date: true */
    /*eslint-disable no-undef*/
    Date = (function (NativeDate) {
    /*eslint-enable no-undef*/
        // Date.length === 7
        function Date(Y, M, D, h, m, s, ms) {
            var length = arguments.length;
            if (this instanceof NativeDate) {
                var date = length === 1 && String(Y) === Y ? // isString(Y)
                    // We explicitly pass it through parse:
                    new NativeDate(Date.parse(Y)) :
                    // We have to manually make calls depending on argument
                    // length here
                    length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) :
                    length >= 6 ? new NativeDate(Y, M, D, h, m, s) :
                    length >= 5 ? new NativeDate(Y, M, D, h, m) :
                    length >= 4 ? new NativeDate(Y, M, D, h) :
                    length >= 3 ? new NativeDate(Y, M, D) :
                    length >= 2 ? new NativeDate(Y, M) :
                    length >= 1 ? new NativeDate(Y) :
                                  new NativeDate();
                // Prevent mixups with unfixed Date object
                defineProperties(date, { constructor: Date }, true);
                return date;
            }
            return NativeDate.apply(this, arguments);
        }

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

        var months = [
            0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
        ];

        function dayFromMonth(year, month) {
            var t = month > 1 ? 1 : 0;
            return (
                months[month] +
                Math.floor((year - 1969 + t) / 4) -
                Math.floor((year - 1901 + t) / 100) +
                Math.floor((year - 1601 + t) / 400) +
                365 * (year - 1970)
            );
        }

        function toUTC(t) {
            return Number(new NativeDate(1970, 0, 1, 0, 0, 0, t));
        }

        // Copy any custom methods a 3rd party library may have added
        for (var key in NativeDate) {
            Date[key] = NativeDate[key];
        }

        // Copy "native" methods explicitly; they may be non-enumerable
        Date.now = NativeDate.now;
        Date.UTC = NativeDate.UTC;
        Date.prototype = NativeDate.prototype;
        Date.prototype.constructor = Date;

        // Upgrade Date.parse to handle simplified ISO 8601 strings
        Date.parse = function parse(string) {
            var match = isoDateExpression.exec(string);
            if (match) {
                // parse months, days, hours, minutes, seconds, and milliseconds
                // provide default values if necessary
                // parse the UTC offset component
                var year = Number(match[1]),
                    month = Number(match[2] || 1) - 1,
                    day = Number(match[3] || 1) - 1,
                    hour = Number(match[4] || 0),
                    minute = Number(match[5] || 0),
                    second = Number(match[6] || 0),
                    millisecond = Math.floor(Number(match[7] || 0) * 1000),
                    // When time zone is missed, local offset should be used
                    // (ES 5.1 bug)
                    // see https://bugs.ecmascript.org/show_bug.cgi?id=112
                    isLocalTime = Boolean(match[4] && !match[8]),
                    signOffset = match[9] === '-' ? 1 : -1,
                    hourOffset = Number(match[10] || 0),
                    minuteOffset = Number(match[11] || 0),
                    result;
                if (
                    hour < (
                        minute > 0 || second > 0 || millisecond > 0 ?
                        24 : 25
                    ) &&
                    minute < 60 && second < 60 && millisecond < 1000 &&
                    month > -1 && month < 12 && hourOffset < 24 &&
                    minuteOffset < 60 && // detect invalid offsets
                    day > -1 &&
                    day < (
                        dayFromMonth(year, month + 1) -
                        dayFromMonth(year, month)
                    )
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

        return Date;
    }(Date));
    /*global Date: false */
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
      var i = toFixedHelpers.size, c = 0;
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
              var t = String(toFixedHelpers.data[i]);
              if (s === '') {
                  s = t;
              } else {
                  s += '0000000'.slice(0, 7 - t.length) + t;
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

defineProperties(NumberPrototype, {
    toFixed: function toFixed(fractionDigits) {
        var f, x, s, m, e, z, j, k;

        // Test for NaN and round fractionDigits down
        f = Number(fractionDigits);
        f = f !== f ? 0 : Math.floor(f);

        if (f < 0 || f > 20) {
            throw new RangeError('Number.toFixed called with invalid number of decimals');
        }

        x = Number(this);

        // Test for NaN
        if (x !== x) {
            return 'NaN';
        }

        // If it is too big or small, return the string value of the number
        if (x <= -1e21 || x >= 1e21) {
            return String(x);
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
                m = toFixedHelpers.numToString() + '0.00000000000000000000'.slice(2, 2 + f);
            }
        }

        if (f > 0) {
            k = m.length;

            if (k <= f) {
                m = s + '0.0000000000000000000'.slice(0, f - k + 2) + m;
            } else {
                m = s + m.slice(0, k - f) + '.' + m.slice(k - f);
            }
        } else {
            m = s + m;
        }

        return m;
    }
}, hasToFixedBugs);

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

var string_split = StringPrototype.split;
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

        StringPrototype.split = function (separator, limit) {
            var string = this;
            if (typeof separator === 'undefined' && limit === 0) {
                return [];
            }

            // If `separator` is not a regex, use native split
            if (!isRegex(separator)) {
                return string_split.call(this, separator, limit);
            }

            var output = [];
            var flags = (separator.ignoreCase ? 'i' : '') +
                        (separator.multiline ? 'm' : '') +
                        (separator.extended ? 'x' : '') + // Proposed for ES6
                        (separator.sticky ? 'y' : ''), // Firefox 3+
                lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
                separator2, match, lastIndex, lastLength;
            var separatorCopy = new RegExp(separator.source, flags + 'g');
            string += ''; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            var splitLimit = typeof limit === 'undefined' ?
                -1 >>> 0 : // Math.pow(2, 32) - 1
                ES.ToUint32(limit);
            match = separatorCopy.exec(string);
            while (match) {
                // `separatorCopy.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(string.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        /*eslint-disable no-loop-func */
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (typeof arguments[i] === 'undefined') {
                                    match[i] = void 0;
                                }
                            }
                        });
                        /*eslint-enable no-loop-func */
                    }
                    if (match.length > 1 && match.index < string.length) {
                        array_push.apply(output, match.slice(1));
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
                    output.push('');
                }
            } else {
                output.push(string.slice(lastLastIndex));
            }
            return output.length > splitLimit ? output.slice(0, splitLimit) : output;
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
        if (typeof separator === 'undefined' && limit === 0) { return []; }
        return string_split.call(this, separator, limit);
    };
}

var str_replace = StringPrototype.replace;
var replaceReportsGroupsCorrectly = (function () {
    var groups = [];
    'x'.replace(/x(.)?/g, function (match, group) {
        groups.push(group);
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
                args.push(arguments[length - 2], arguments[length - 1]);
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
            normalizedStart = Math.max(this.length + start, 0);
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
        return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
    }
}, hasTrimWhitespaceBug);

// ES-5 15.1.2.2
if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
    /*global parseInt: true */
    parseInt = (function (origParseInt) {
        var hexRegex = /^0[xX]/;
        return function parseInt(str, radix) {
            var string = String(str).trim();
            var defaultedRadix = Number(radix) || (hexRegex.test(string) ? 16 : 10);
            return origParseInt(string, defaultedRadix);
        };
    }(parseInt));
}

}));

},{}],26:[function(_dereq_,module,exports){
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

},{}],27:[function(_dereq_,module,exports){
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

},{}],28:[function(_dereq_,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],29:[function(_dereq_,module,exports){
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
        path = !force && path.indexOf('.js') === -1 && !/^https?:\/\//.test(path) && scriptpath ? scriptpath + path + '.js' : path
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

},{}]},{},[19])(19)
});
