var just=function(t){"use strict"
var r=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},n=function(){return r()+r()+r()+r()+r()+r()+r()+r()}
function b(t){return!!t||0===t||!1===t}function k(t){return"function"==typeof t}function x(t){return"number"==typeof t}function p(t){return"object"==typeof t&&!!t}function s(t){return"string"==typeof t}function w(t){return t&&isFinite(t.length)&&!s(t)&&!k(t)}function c(t){return t.nodeType||t instanceof SVGElement}function A(t,r){return t.hasOwnProperty(r)}var u=1,f=2,v=3,_=void 0,e="config"
function l(t,r){return-1!==(n=r,t.indexOf(n))
var n}function F(t,r,n){var e=t&&t.length
if(!e)return _
if(r===_)return t[n?e-1:0]
if(n){for(var i=e-1;-1<i;i--)if(r(t[i]))return t[i]}else for(i=0;i<e;i++)if(r(t[i]))return t[i]
return _}function o(t,r){var n=t.indexOf(r)
return-1!==n?t.splice(n,1):_}function i(i){return function(t,r){var n=t[i],e=r[i]
return n<e?-1:e<n?1:0}}function g(t){return b(t)?w(t)?t:[t]:[]}function O(t,r){return r!==_&&Array.prototype.push.call(t,r),r}function d(t,r){return l(t,r)||O(t,r),r}function m(t,n){var e=[]
return j(t,function(t){var r=n(t)
w(r)?j(r,function(t){return O(e,t)}):O(e,r)}),e}function j(t,r){for(var n=g(t),e=0,i=n.length;e<i;e++)r(n[e],e,i)}var a="append",y="cancel",h="destroy",z="finish",E="insert",M="pause",P="play",q="reverse",S="set",L="tick",T="update",U="rate",V="time",D=requestAnimationFrame,I=cancelAnimationFrame,B=function(){return performance.now()},C=[],N=_,R=_
function W(){I(N),N=R=_}function $(){var t=C.length
if(R=R||B(),t){var r=B(),n=r-R
R=r,N=D($)
for(var e=t-1;-1<e;e--){var i=C[e]
zt(L,i,n)}}else W()}function G(t){o(C,t),C.length||W()}var Z=function(t,r,n){j(t.players,function(t){return t.cancel()}),t.state=u,t.time=_,t.round=_,t.players=_,G(t.id),n.trigger(y)},H=function(t,r,n){Z(t,0,n),n.destroyed=!0},J=Math.floor,K=Math.max,Q=Math.min
function X(t,r,n){return t!==_&&r<=t&&t<=n}var Y={}
function tt(t){Y[t.name]=t}var rt=0,nt=/\[object ([a-z]+)\]/i
function et(t,r){for(var n in t)if(t[n]===r)return n
var e=function(t){var r=t.id||t.name
if(!r){r=Object.prototype.toString.call(t)
var n=nt.exec(r)
n&&(r=n[1])}return"@"+r+"_"+ ++rt}(r)
return t[e]=r,e}function it(t){return s(t)?Array.prototype.slice.call(document.querySelectorAll(t)):k(t)?it(t()):w(t)?m(t,it):p(t)?[t]:[]}function at(){var n={}
return j(arguments,function(t){for(var r in t)A(t,r)&&(n[r]=t[r])}),n}function ot(t,r,n,e){return k(t)?ot(t(r,n,e),r,n,e):t}var ut=i("offset")
function ft(t){var r
j(t,function(t){t.value!==_?r=t.value:t.value=r})}function st(t){for(var r,n=t.length-1;-1<n;n--){var e=t[n]
e.interpolate!==_?r=e.interpolate:e.interpolate=r}}function ct(t,r,n,e,i){var a=F(r,function(t){return 0===t.offset})
if(a===_||a.value===_){var o=e.getValue(n,i)
a===_?r.splice(0,0,{offset:0,value:o,easing:t.easing,interpolate:_}):(a.value=o,a.easing=t.easing,a.interpolate=_)}}function vt(t,r){var n=F(r,function(t){return 1===t.offset},!0)
if(n===_||n.value===_){var e=r[r.length-1].value
n===_?O(r,{offset:1,value:e,easing:t.easing,interpolate:_}):(n.value=e,n.easing=n.easing||t.easing)}}function lt(e){var t
e.players=[],j(e.configs,function(t){return r=t,void j((l=function r(n,t,e){if(!b(t)||x(t)||k(t))return t
if(s(t)){var i=t
return A(n,i)&&"@"===i.charAt(0)?n[i]:i}if(w(t)){var a=[]
return j(t,function(t){return O(a,r(n,t,e))}),a}if(!e||c(t))return t
var o={}
for(var u in t)if(A(t,u)){var f=t[u]
o[u]=e?r(n,f,"targets"!==u):f}return o}((n=e).refs,r,!0),p=l.keyframes,g=l.from,d=l.to,m=l.stagger||0,y=l.duration,h=[],j(it(l.target),function(u,t,f){var s={},c={}
for(var r in j(p,function(t){var r=s[t.prop]||(s[t.prop]=[]),n=(t.time-g)/(y||1),e=t.easing,i=t.interpolate,a=ot(t.value,u,t.index,f)
c[t.prop]=t.plugin
var o=F(r,function(t){return t.offset===n})||O(r,{easing:e,offset:n,value:a,interpolate:i})
o.easing=e,o.value=a,o.interpolate=i}),Y){var n=Y[r]
if(n.onWillAnimate&&l.keyframes.some(function(t){return t.plugin===r})){var e=at(l,{target:u})
n.onWillAnimate(e,s,c)}}for(var i in s){var a=s[i],o=c[i],v=Y[o]
a&&(a.sort(ut),ct(l,a,u,v,i),ft(a),st(a),vt(l,a),O(h,{plugin:c[i],target:u,prop:i,from:g+(m?m*t:0),to:d+(m?m*t:0),keyframes:a}))}}),h),function(t){var r=Y[t.plugin].animate(t)
r&&(r.from=t.from,r.to=t.to,O(n.players,r))})
var n,r,l,p,g,d,m,y,h}),(t=e).duration=K.apply(_,t.players.filter(function(t){return isFinite(t.to)}).map(function(t){return t.to})),t.time=isFinite(t.time)?t.time:t.rate<0?t.duration:0}var pt=function(o,t,r){o.players===_&&lt(o)
var u=o.state===v,f=o.time
u||G(o.id),j(o.players,function(t){var r,n=t.from,e=t.to,i=u&&X(J(f),n,e),a=(r=1,Q(K((f-n)/(e-n),0),r))
t.update(a,o.rate,i)}),r.trigger(T)},gt=function(t,r,n){t.round=0,t.state=f,t.yoyo||(t.time=t.rate<0?0:t.duration),G(t.id),pt(t,0,n),n.trigger(z),t.destroy&&H(t,0,n)},dt=function(t,r,n){t.state=f,G(t.id),pt(t,0,n),n.trigger(M)},mt=function(t,r,n){r&&(t.repeat=r.repeat,t.yoyo=!!r.alternate,t.destroy=!!r.destroy),t.repeat=t.repeat||1,t.yoyo=t.yoyo||!1,t.state=v
var e,i=0<=t.rate
i&&t.time===t.duration?t.time=0:i||0!==t.time||(t.time=t.duration),e=t.id,l(C,e)||O(C,e),N||(N=D($)),pt(t,0,n),n.trigger(P)},yt=function(t){for(var r=0,n=0,e=t.configs,i=0,a=e.length;i<a;i++){var o=e[i],u=o.keyframes.map(function(t){return t.time}),f=K.apply(_,u),s=Q.apply(_,u)
o.to=f,o.from=s,o.duration=f-s,r=K(f,r),n=K(f+o.endDelay,n)}t.cursor=n,t.duration=r},ht=i("time"),bt=function(a,t,o){j(t,function(i){if(i.to===_)throw new Error("missing duration")
j((i=function r(n,t,e){if(!b(t)||s(t)||x(t))return t
if(w(t))return m(t,function(t){return r(n,t,e)})
if(k(t))return et(n,t)
if(e){for(var i in t)A(t,i)&&(t[i]=r(n,t[i],e&&"targets"!==i))
return t}return et(n,t)}(a.refs,i,!0)).targets,function(t,r,n){var e=function(t,r,n,e,i){var a="ease",o=ot(i.delay,r,n,e)||0,u=F(t.configs,function(t){return t.target===r})||O(t.configs,{from:K(i.from+o,0),to:K(i.to+o,0),easing:i.easing||a,duration:i.to-i.from,endDelay:ot(i.endDelay,r,n,e)||0,stagger:i.stagger||0,target:r,targetLength:e,propNames:[],keyframes:[]}),f=i.stagger&&i.stagger*(n+1)||0,s=ot(i.delay,u,n,u.targetLength)||0,c=K(f+s+i.from,0),v=i.to-i.from,l=i.easing||a
for(var p in Y)if(A(i,p)){var g=i[p]
for(var d in g){var m=g[d]
A(g,d)&&b(m)&&wt(u,p,n,d,m,v,c,l)}}return u.keyframes.sort(ht),u}(a,t,r,n,i)
o.dirty(e)})}),yt(a),o.trigger(e)}
function wt(s,i,c,a,t,o,u,v){var l,r
if(!w(t)&&p(t)){var n=t
n.easing&&(v=n.easing),n.interpolate&&(l=n.interpolate),r=g(n.value)}else r=g(t)
var e=r.map(function(t,r,n){var e=ot(t,s.target,c,s.targetLength),i=e,a=p(e),o=a?i.value:e,u=a&&x(i.offset)?i.offset:r===n.length-1?1:0===r?0:_,f=i&&i.interpolate||l
return{offset:u,value:o,easing:i&&i.easing||v,interpolate:f}})
!function(t){if(!t.length)return
var r=F(t,function(t){return 0===t.offset})||t[0]
b(r.offset)||(r.offset=0)
var n=F(t,function(t){return 1===t.offset},!0)||t[t.length-1]
1<t.length&&!b(n.offset)&&(n.offset=1)
for(var e=1,i=t.length;e<i;e++){var a=t[e]
if(!b(a.offset))for(var o=e+1;o<i;o++){var u=t[o].offset
if(b(u)){for(var f=t[e-1].offset,s=u-f,c=o-e+1,v=1;v<c;v++)t[v-1+e].offset=v/o*s+f
e=o
break}}}}(e),j(e,function(t){var r=t.offset,n=t.value,e=J(o*r+u);(F(s.keyframes,function(t){return t.prop===a&&t.time===e})||O(s.keyframes,{plugin:i,easing:t.easing,index:c,prop:a,time:e,value:n,interpolate:t.interpolate})).value=n}),F(s.keyframes,function(t){return t.prop===a&&t.time===u})||O(s.keyframes,{plugin:i,easing:v,index:c,prop:a,time:u,value:_,interpolate:l})
var f=u+o
F(s.keyframes,function(t){return t.prop===a&&t.time===f},!0)||O(s.keyframes,{plugin:i,easing:v,index:c,prop:a,time:f,value:_,interpolate:l}),d(s.propNames,a)}var kt
var xt=[],At={},Ft=((kt={})[a]=function(t,r,n){var f=t.cursor,e=g(r).map(function(t){var r=t.to,n=t.from,e=t.duration,i=b(r),a=b(n),o=b(e),u=t
return u.to=i&&(a||o)?r:o&&a?n+e:i&&!o?f+r:o?f+e:_,u.from=a&&(i||o)?n:i&&o?r-e:i||o?f:_,u})
bt(t,e,n)},kt[y]=Z,kt[h]=H,kt[z]=gt,kt[E]=bt,kt[M]=dt,kt[P]=mt,kt[q]=function(t,r,n){t.rate*=-1,pt(t,0,n),n.trigger(q)},kt[S]=function(f,t,r){var s=Object.keys(Y),n=g(t).map(function(t){var r=t.at||f.cursor,n={}
for(var e in t)if(l(s,e)){var i=t[e],a={}
for(var o in i){var u=i[o]
a[o]=[_,u]}n[e]=a}else n[e]=t[e]
return n.from=r-1e-9,n.to=r,n})
bt(f,n,r)},kt[L]=function(t,r,n){var e=t.duration,i=t.repeat,a=t.rate,o=t.time===_?a<0?e:0:t.time,u=t.round||0,f=a<0,s=!1
X(o+=r*a,0,e)||(t.round=++u,o=f?0:e,s=!0,t.yoyo&&(t.rate=-1*(t.rate||0)),o=t.rate<0?e:0),t.time=o,t.round=u,s&&i===u?gt(t,0,n):pt(t,0,n)},kt[T]=pt,kt[U]=function(t,r,n){t.rate=r||1,pt(t,0,n)},kt[V]=function(t,r,n){var e=+r
t.time=isFinite(e)?e:t.rate<0?t.duration:0,pt(t,0,n)},kt)
function Ot(t){var r=At[t]
if(!r)throw new Error("not found")
return r.state}function jt(t){At[t.id]={state:function(t){var r={}
if(t.references)for(var n in t.references)r["@"+n]=t.references[n]
return{configs:[],cursor:0,duration:0,id:t.id,players:_,rate:1,refs:r,repeat:_,round:_,state:u,time:_,yoyo:!1}}(t),subs:{}}}function zt(t,r,n){var e=Ft[t],i=At[r]
if(!e||!i)throw new Error("not found")
var a={events:[],needUpdate:[],trigger:Et,dirty:Mt},o=i.state
e(o,n,a),j(a.events,function(t){var r=i.subs[t]
r&&j(r,function(t){t(o.time)})}),a.destroyed?delete At[r]:a.needUpdate.length&&(o.state!==u?function(t,r){var n=t.state
switch(j(t.players,function(t){return t.cancel()}),t.players=_,n){case f:dt(t,_,r)
break
case v:mt(t,_,r)}}(o,a):yt(o),j(xt,function(t){t(i)}))}function Et(t){d(this.events,t)}function Mt(t){d(this.needUpdate,t)}"undefined"!=typeof window&&(window.just_devtools={dispatch:zt,subscribe:function(t){d(xt,t)},unsubscribe:function(t){o(xt,t)}})
var Pt={get state(){return Ot(this.id).state},get duration(){return Ot(this.id).duration},get currentTime(){return Ot(this.id).time},set currentTime(t){zt(V,this.id,t)},get playbackRate(){return Ot(this.id).rate},set playbackRate(t){zt(U,this.id,t)},add:function(t){return zt(a,this.id,t),this},animate:function(t){return zt(a,this.id,t),this},fromTo:function(r,n,t){return j(t,function(t){t.to=n,t.from=r}),zt(E,this.id,t),this},cancel:function(){return zt(y,this.id),this},destroy:function(){zt(h,this.id)},finish:function(){return zt(z,this.id),this},on:function(t,r){var n,e,i,a
return n=this.id,e=t,i=r,(a=At[n])&&d(a.subs[e]=a.subs[e]||[],i),this},once:function(n,e){var i=this
return i.on(n,function t(r){i.off(n,t),e(r)}),i},off:function(t,r){var n,e,i,a
return n=this.id,e=t,i=r,(a=At[n])&&o(a.subs[e],i),this},pause:function(){return zt(M,this.id),this},play:function(t){return zt(P,this.id,t),this},reverse:function(){return zt(q,this.id),this},seek:function(t){return zt(V,this.id,t),this},sequence:function(t){var r=this
return j(t,function(t){return zt(a,r.id,t)}),this},set:function(t){return zt(S,this.id,t),this}}
function qt(t){var r=Object.create(Pt)
return(t=t||{}).id=t.id||n(),r.id=t.id,jt(t),r}Math.PI
var St=1e-4,Lt="cubic-bezier",Tt="steps",Ut=function(t,r,n){return 3*t*(1-n)*(1-n)*n+3*r*(1-n)*n*n+n*n*n},Vt=/([a-z])[- ]([a-z])/gi,Dt=/^([a-z-]+)\(([^\)]+)\)$/i,It={ease:Lt+"(.25,.1,.25,1)",easeIn:Lt+"(.42,0,1,1)",easeOut:Lt+"(0,0,.58,1)",easeInOut:Lt+"(.42,0,.58,1)",stepStart:Tt+"(1,1)",stepEnd:Tt+"(1,0)",linear:Lt+"(0,0,1,1)"},Bt=function(t,r,n){return r+n.toUpperCase()},Ct=function(t){var r,n="string"==typeof(r=t)?r.replace(Vt,Bt):"",e=It[n]||t,i=Dt.exec(e)
if(!i)throw new Error("css parse error")
return[i[1]].concat(i[2].split(","))},Nt=Math.abs
function Rt(f){var s=[]
return function(){for(var t=arguments,r=0,n=s.length;r<n;r++){var e=s[r].args,i=t.length
if(e.length===i){for(var a=0,o=0;o<i&&e[o]===t[o];o++)++a
if(a===i)return s[r].value}}var u=f.apply(_,t)
return s.push({args:t,value:u}),u}}var Wt=Rt(function(t){var r,n,e,i,o,u,f,s,a=Ct(t),c=a[0]
if("steps"===c)return r=+a[1],n=a[2],e=r/1,i="end"===n?0:"start"===n?1:n||0,function(t){return t<1?i*e+t-(i*e+t)%e:1}
if("cubic-bezier"===c)return o=+a[1],u=+a[2],f=+a[3],s=+a[4],o<0||1<o||f<0||1<f?function(t){return t}:function(t){if(0===t||1===t)return t
var r=0,n=1,e=19
do{var i=.5*(r+n),a=Ut(o,f,i)
if(Nt(t-a)<St)return Ut(u,s,i)
a<t?r=i:n=i}while(--e)
return t}
throw new Error("css parse error")}),$t=Rt(function(t){return Rt(t)})
function _t(t,r,n){return t+(r-t)*n}function Gt(t,r,n){return n<.5?t:r}function Zt(t){return t.replace(/([A-Z])/g,function(t){return"-"+t[0].toLowerCase()})}var Ht=0,Jt=1,Kt=2,Qt=3,Xt=/^\-\-[a-z0-9\-]+$/i,Yt="rx ry viewBox transform x x1 x2 y y1 y2".split(" "),tr=["viewBox"]
function rr(t,r){return c(t)?Xt.test(r)?Qt:"undefined"==typeof t[r]||l(Yt,r)?l(tr,r)?Jt:Kt:Ht:Ht}function nr(t,r){var n,e,i,a,o,u,f,s,c=rr(t,r)
return c===Qt?(f=t,s=r,function(){return f.style.getPropertyValue(s)}):c===Jt?(o=t,u=r,function(){return o.getAttribute(u)}):c===Kt?(i=t,a=Zt(r),function(){return i.getAttribute(a)}):(n=t,e=r,function(){return n[e]})}return tt({name:"props",animate:function(t){var s,c,v,r,n,e,i,a,o,u,f,l,p,g,d=t.target,m=t.prop,y=(s=t.to-t.from,c=t.keyframes,v=c.map(function(t){return t.offset*s}),j(c,function(t){var r=!k(t.interpolate)
t.simpleFn=r,t.interpolate=r?x(t.value)?_t:Gt:$t(t.interpolate)}),function(t){var r=s*t,n=function(t,r){for(var n=t.length,e=0;e<n;e++)if(t[e]>r)return e
return n-1}(v,r),e=n?n-1:0,i=v[n],a=v[e],o=c[e],u=(r-a)/(i-a),f=o.easing?Wt(o.easing)(u):u
return o.simpleFn?o.interpolate(o.value,c[n].value,f):o.interpolate(o.value,c[n].value)(f)}),h=(e=rr(r=d,n=m))===Qt?(p=r,g=n,function(t){return p.style.setProperty(g,t?t+"":"")}):e===Jt?(f=r,l=n,function(t){return f.setAttribute(l,t)}):e===Kt?(o=r,u=Zt(n),function(t){return o.setAttribute(u,t)}):(i=r,a=n,function(t){return i[a]=t}),b=nr(d,m),w=_
return{cancel:function(){w!==_&&h(w),w=_},update:function(t,r,n){w===_&&(w=b()),h(y(t))}}},getValue:function(t,r){return nr(t,r)()}}),t.animate=function(t){return qt().add(t)},t.sequence=function(t){return qt().sequence(t)},t.timeline=qt,t.addPlugin=tt,t.removePlugin=function(t){delete Y[t.name]},t.interpolate=_t,t}({})
