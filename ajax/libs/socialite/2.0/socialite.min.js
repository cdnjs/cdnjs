/*!
 * Socialite v2.0
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
window.Socialite=function(e,t,n){"use strict"
var a=0,i=[],o={},r={},l=/^($|loaded|complete)/,s=e.encodeURIComponent,c={settings:{},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},hasClass:function(e,t){return-1!==(" "+e.className+" ").indexOf(" "+t+" ")},addClass:function(e,t){c.hasClass(e,t)||(e.className=""===e.className?t:e.className+" "+t)},removeClass:function(e,t){e.className=c.trim(" "+e.className+" ".replace(" "+t+" "," "))},extendObject:function(e,t,a){for(var i in t){var o=e[i]!==n
o&&"object"==typeof t[i]?c.extendObject(e[i],t[i],a):(a||!o)&&(e[i]=t[i])}},getElements:function(e,t){for(var n=0,a=[],i=!!e.getElementsByClassName,o=i?e.getElementsByClassName(t):e.getElementsByTagName("*");o.length>n;n++)(i||c.hasClass(o[n],t))&&a.push(o[n])
return a},getDataAttributes:function(e,t,n){for(var a=0,i="",o={},r=e.attributes;r.length>a;a++){var l=r[a].name,c=r[a].value
c.length&&0===l.indexOf("data-")&&(t&&(l=l.substring(5)),n?o[l]=c:i+=s(l)+"="+s(c)+"&")}return n?o:i},copyDataAttributes:function(e,t,n,a){var i=c.getDataAttributes(e,n,!0)
for(var o in i)t.setAttribute(a?o.replace(/-/g,"_"):o,i[o])},createIframe:function(e,n){var a=t.createElement("iframe")
return a.style.cssText="overflow: hidden; border: none;",c.extendObject(a,{src:e,allowtransparency:"true",frameborder:"0",scrolling:"no"},!0),n&&(a.onload=a.onreadystatechange=function(){l.test(a.readyState||"")&&(a.onload=a.onreadystatechange=null,c.activateInstance(n))}),a},networkReady:function(e){return o[e]?o[e].loaded:n},appendNetwork:function(e){if(e&&!e.appended){if("function"==typeof e.append&&e.append(e)===!1)return e.appended=e.loaded=!0,c.activateAll(e),n
e.script&&(e.el=t.createElement("script"),c.extendObject(e.el,e.script,!0),e.el.async=!0,e.el.onload=e.el.onreadystatechange=function(){if(l.test(e.el.readyState||"")){if(e.el.onload=e.el.onreadystatechange=null,e.loaded=!0,"function"==typeof e.onload&&e.onload(e)===!1)return
c.activateAll(e)}},t.body.appendChild(e.el)),e.appended=!0}},removeNetwork:function(e){return c.networkReady(e.name)?(e.el.parentNode&&e.el.parentNode.removeChild(e.el),!(e.appended=e.loaded=!1)):!1},reloadNetwork:function(e){var t=o[e]
t&&c.removeNetwork(t)&&c.appendNetwork(t)},createInstance:function(e,t){var o=!0,r={el:e,uid:a++,widget:t}
return i.push(r),t.process!==n&&(o="function"==typeof t.process?t.process(r):!1),o&&c.processInstance(r),r.el.setAttribute("data-socialite",r.uid),r.el.className="socialite "+t.name+" socialite-instance",r},processInstance:function(e){var n=e.el
e.el=t.createElement("div"),e.el.className=n.className,c.copyDataAttributes(n,e.el),"a"!==n.nodeName.toLowerCase()||n.getAttribute("data-default-href")||e.el.setAttribute("data-default-href",n.getAttribute("href"))
var a=n.parentNode
a.insertBefore(e.el,n),a.removeChild(n)},activateInstance:function(e){return e&&!e.loaded?(e.loaded=!0,"function"==typeof e.widget.activate&&e.widget.activate(e),c.addClass(e.el,"socialite-loaded"),e.onload?e.onload(e.el):null):n},activateAll:function(e){"string"==typeof e&&(e=o[e])
for(var t=0;i.length>t;t++){var n=i[t]
n.init&&n.widget.network===e&&c.activateInstance(n)}},load:function(e,a,o,l,s){if(e=e&&"object"==typeof e&&1===e.nodeType?e:t,!a||"object"!=typeof a)return c.load(e,c.getElements(e,"socialite"),o,l,s),n
var d
if(/Array/.test(Object.prototype.toString.call(a)))for(d=0;a.length>d;d++)c.load(e,a[d],o,l,s)
else if(1===a.nodeType){if(!o||!r[o]){o=null
var p=a.className.split(" ")
for(d=0;p.length>d;d++)if(r[p[d]]){o=p[d]
break}if(!o)return}var u,f=r[o],g=parseInt(a.getAttribute("data-socialite"),10)
if(isNaN(g))u=c.createInstance(a,f)
else for(d=0;i.length>d;d++)if(i[d].uid===g){u=i[d]
break}!s&&u&&(u.init||(u.init=!0,u.onload="function"==typeof l?l:null,f.init(u)),f.network.appended?c.networkReady(f.network.name)&&c.activateInstance(u):c.appendNetwork(f.network))}},activate:function(t,n,a){e.Socialite.load(null,t,n,a)},process:function(t,n,a){e.Socialite.load(t,n,a,null,!0)},network:function(e,t){o[e]={name:e,el:null,appended:!1,loaded:!1,widgets:{}},t&&c.extendObject(o[e],t)},widget:function(e,t,n){n.name=e+"-"+t,o[e]&&!r[n.name]&&(n.network=o[e],o[e].widgets[t]=r[n.name]=n)},setup:function(e){c.extendObject(c.settings,e,!0)}}
return c}(window,window.document),function(e,n,a){a.setup({facebook:{lang:"en_GB",appId:null},twitter:{lang:"en"},googleplus:{lang:"en-GB"}}),a.network("facebook",{script:{src:"//connect.facebook.net/{{language}}/all.js",id:"facebook-jssdk"},append:function(t){var i=n.createElement("div"),o=a.settings.facebook,r={onlike:"edge.create",onunlike:"edge.remove",onsend:"message.send"}
i.id="fb-root",n.body.appendChild(i),t.script.src=t.script.src.replace("{{language}}",o.lang),e.fbAsyncInit=function(){e.FB.init({appId:o.appId,xfbml:!0})
for(var t in r)"function"==typeof o[t]&&e.FB.Event.subscribe(r[t],o[t])}}}),a.widget("facebook","like",{init:function(t){var i=n.createElement("div")
i.className="fb-like",a.copyDataAttributes(t.el,i),t.el.appendChild(i),e.FB&&e.FB.XFBML&&e.FB.XFBML.parse(t.el)}}),a.network("twitter",{script:{src:"//platform.twitter.com/widgets.js",id:"twitter-wjs",charset:"utf-8"},append:function(){var n="object"!=typeof e.twttr,i=a.settings.twitter,o=["click","tweet","retweet","favorite","follow"]
return n&&(e.twttr=t={_e:[],ready:function(e){t._e.push(e)}}),e.twttr.ready(function(e){for(var t=0;o.length>t;t++){var n=o[t]
"function"==typeof i["on"+n]&&e.events.bind(n,i["on"+n])}a.activateAll("twitter")}),n}})
var i=function(e){var t=n.createElement("a")
t.className=e.widget.name+"-button",a.copyDataAttributes(e.el,t),t.setAttribute("href",e.el.getAttribute("data-default-href")),t.setAttribute("data-lang",e.el.getAttribute("data-lang")||a.settings.twitter.lang),e.el.appendChild(t)},o=function(){e.twttr&&"object"==typeof e.twttr.widgets&&"function"==typeof e.twttr.widgets.load&&e.twttr.widgets.load()}
a.widget("twitter","share",{init:i,activate:o}),a.widget("twitter","follow",{init:i,activate:o}),a.widget("twitter","hashtag",{init:i,activate:o}),a.widget("twitter","mention",{init:i,activate:o}),a.widget("twitter","embed",{process:function(e){e.innerEl=e.el,e.innerEl.getAttribute("data-lang")||e.innerEl.setAttribute("data-lang",a.settings.twitter.lang),e.el=n.createElement("div"),e.el.className=e.innerEl.className,e.innerEl.className="",e.innerEl.parentNode.insertBefore(e.el,e.innerEl),e.el.appendChild(e.innerEl)},init:function(e){e.innerEl.className="twitter-tweet"},activate:o}),a.network("googleplus",{script:{src:"//apis.google.com/js/plusone.js"},append:function(){return e.gapi?!1:(e.___gcfg={lang:a.settings.googleplus.lang,parsetags:"explicit"},undefined)}})
var r=function(e){var t=n.createElement("div")
t.className="g-"+e.widget.gtype,a.copyDataAttributes(e.el,t),e.el.appendChild(t),e.gplusEl=t},l=function(e,t){return"function"!=typeof t?null:function(n){t(e.el,n)}},s=function(t){var n=t.widget.gtype
if(e.gapi&&e.gapi[n]){for(var i=a.settings.googleplus,o=a.getDataAttributes(t.el,!0,!0),r=["onstartinteraction","onendinteraction","callback"],s=0;r.length>s;s++)o[r[s]]=l(t,i[r[s]])
e.gapi[n].render(t.gplusEl,o)}}
a.widget("googleplus","one",{init:r,activate:s,gtype:"plusone"}),a.widget("googleplus","share",{init:r,activate:s,gtype:"plus"}),a.widget("googleplus","badge",{init:r,activate:s,gtype:"plus"}),a.network("linkedin",{script:{src:"//platform.linkedin.com/in.js"}})
var c=function(t){var i=n.createElement("script")
i.type="IN/"+t.widget.intype,a.copyDataAttributes(t.el,i),t.el.appendChild(i),"object"==typeof e.IN&&"function"==typeof e.IN.parse&&(e.IN.parse(t.el),a.activateInstance(t))}
a.widget("linkedin","share",{init:c,intype:"Share"}),a.widget("linkedin","recommend",{init:c,intype:"RecommendProduct"})}(window,window.document,window.Socialite),function(){var e=window._socialite
if(/Array/.test(Object.prototype.toString.call(e)))for(var t=0,n=e.length;n>t;t++)"function"==typeof e[t]&&e[t]()}();