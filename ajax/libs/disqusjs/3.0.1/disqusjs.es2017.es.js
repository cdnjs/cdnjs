function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var n,l$1,u$1,t$1,o$2,r$1,f$1,e$2={},c$1=[],s$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a$1(n,l){for(var u in l)n[u]=l[u];return n}function h$1(n){var l=n.parentNode;l&&l.removeChild(n);}function v$1(l,u,i){var t,o,r,f={};for(r in u)"key"==r?t=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):i),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return y$1(l,f,t,o,null)}function y$1(n,i,t,o,r){var f={type:n,props:i,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++u$1:r};return null==r&&null!=l$1.vnode&&l$1.vnode(f),f}function p$1(){return {current:null}}function d$1(n){return n.children}function _$1(n,l){this.props=n,this.context=l;}function k$2(n,l){if(null==l)return n.__?k$2(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?k$2(n):null}function b$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return b$1(n)}}function m$1(n){(!n.__d&&(n.__d=!0)&&t$1.push(n)&&!g$2.__r++||r$1!==l$1.debounceRendering)&&((r$1=l$1.debounceRendering)||o$2)(g$2);}function g$2(){for(var n;g$2.__r=t$1.length;)n=t$1.sort(function(n,l){return n.__v.__b-l.__v.__b}),t$1=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=a$1({},t)).__v=t.__v+1,j$2(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?k$2(t):o,t.__h),z$1(u,t),t.__e!=o&&b$1(t)));});}function w$2(n,l,u,i,t,o,r,f,s,a){var h,v,p,_,b,m,g,w=i&&i.__k||c$1,A=w.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(_=u.__k[h]=null==(_=l[h])||"boolean"==typeof _?null:"string"==typeof _||"number"==typeof _||"bigint"==typeof _?y$1(null,_,null,null,_):Array.isArray(_)?y$1(d$1,{children:_},null,null,null):_.__b>0?y$1(_.type,_.props,_.key,null,_.__v):_)){if(_.__=u,_.__b=u.__b+1,null===(p=w[h])||p&&_.key==p.key&&_.type===p.type)w[h]=void 0;else for(v=0;v<A;v++){if((p=w[v])&&_.key==p.key&&_.type===p.type){w[v]=void 0;break}p=null;}j$2(n,_,p=p||e$2,t,o,r,f,s,a),b=_.__e,(v=_.ref)&&p.ref!=v&&(g||(g=[]),p.ref&&g.push(p.ref,null,_),g.push(v,_.__c||b,_)),null!=b?(null==m&&(m=b),"function"==typeof _.type&&_.__k===p.__k?_.__d=s=x$2(_,s,n):s=P$1(n,_,p,w,b,s),"function"==typeof u.type&&(u.__d=s)):s&&p.__e==s&&s.parentNode!=n&&(s=k$2(p));}for(u.__e=m,h=A;h--;)null!=w[h]&&("function"==typeof u.type&&null!=w[h].__e&&w[h].__e==u.__d&&(u.__d=k$2(i,h+1)),N$1(w[h],w[h]));if(g)for(h=0;h<g.length;h++)M$1(g[h],g[++h],g[++h]);}function x$2(n,l,u){for(var i,t=n.__k,o=0;t&&o<t.length;o++)(i=t[o])&&(i.__=n,l="function"==typeof i.type?x$2(i,l,u):P$1(u,i,i,t,i.__e,l));return l}function A$2(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){A$2(n,l);}):l.push(n)),l}function P$1(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else {for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o;}return void 0!==r?r:t.nextSibling}function C$1(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||H$1(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||H$1(n,o,l[o],u[o],i);}function $$1(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||s$1.test(l)?u:u+"px";}function H$1(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||$$1(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||$$1(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?T$2:I$1,o):n.removeEventListener(l,o?T$2:I$1,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l));}}function I$1(n){this.l[n.type+!1](l$1.event?l$1.event(n):n);}function T$2(n){this.l[n.type+!0](l$1.event?l$1.event(n):n);}function j$2(n,u,i,t,o,r,f,e,c){var s,h,v,y,p,k,b,m,g,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(s=l$1.__b)&&s(u);try{n:if("function"==typeof P){if(m=u.props,g=(s=P.contextType)&&t[s.__c],x=s?g?g.props.value:s.__:t,i.__c?b=(h=u.__c=i.__c).__=h.__E:("prototype"in P&&P.prototype.render?u.__c=h=new P(m,x):(u.__c=h=new _$1(m,x),h.constructor=P,h.render=O$1),g&&g.sub(h),h.props=m,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=P.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=a$1({},h.__s)),a$1(h.__s,P.getDerivedStateFromProps(m,h.__s))),y=h.props,p=h.state,v)null==P.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(null==P.getDerivedStateFromProps&&m!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(m,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(m,h.__s,x)||u.__v===i.__v){h.props=m,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u);}),h.__h.length&&f.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(m,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,p,k);});}h.context=x,h.props=m,h.state=h.__s,(s=l$1.__r)&&s(u),h.__d=!1,h.__v=u,h.__P=n,s=h.render(h.props,h.state,h.context),h.state=h.__s,null!=h.getChildContext&&(t=a$1(a$1({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(k=h.getSnapshotBeforeUpdate(y,p)),A=null!=s&&s.type===d$1&&null==s.key?s.props.children:s,w$2(n,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),b&&(h.__E=h.__=null),h.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=L$1(i.__e,u,i,t,o,r,f,c);(s=l$1.diffed)&&s(u);}catch(n){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),l$1.__e(n,u,i);}}function z$1(n,u){l$1.__c&&l$1.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$1.__e(n,u.__v);}});}function L$1(l,u,i,t,o,r,f,c){var s,a,v,y=i.props,p=u.props,d=u.type,_=0;if("svg"===d&&(o=!0),null!=r)for(;_<r.length;_++)if((s=r[_])&&"setAttribute"in s==!!d&&(d?s.localName===d:3===s.nodeType)){l=s,r[_]=null;break}if(null==l){if(null===d)return document.createTextNode(p);l=o?document.createElementNS("http://www.w3.org/2000/svg",d):document.createElement(d,p.is&&p),r=null,c=!1;}if(null===d)y===p||c&&l.data===p||(l.data=p);else {if(r=r&&n.call(l.childNodes),a=(y=i.props||e$2).dangerouslySetInnerHTML,v=p.dangerouslySetInnerHTML,!c){if(null!=r)for(y={},_=0;_<l.attributes.length;_++)y[l.attributes[_].name]=l.attributes[_].value;(v||a)&&(v&&(a&&v.__html==a.__html||v.__html===l.innerHTML)||(l.innerHTML=v&&v.__html||""));}if(C$1(l,p,y,o,c),v)u.__k=[];else if(_=u.props.children,w$2(l,Array.isArray(_)?_:[_],u,i,t,o&&"foreignObject"!==d,r,f,r?r[0]:i.__k&&k$2(i,0),c),null!=r)for(_=r.length;_--;)null!=r[_]&&h$1(r[_]);c||("value"in p&&void 0!==(_=p.value)&&(_!==l.value||"progress"===d&&!_||"option"===d&&_!==y.value)&&H$1(l,"value",_,y.value,!1),"checked"in p&&void 0!==(_=p.checked)&&_!==l.checked&&H$1(l,"checked",_,y.checked,!1));}return l}function M$1(n,u,i){try{"function"==typeof n?n(u):n.current=u;}catch(n){l$1.__e(n,i);}}function N$1(n,u,i){var t,o;if(l$1.unmount&&l$1.unmount(n),(t=n.ref)&&(t.current&&t.current!==n.__e||M$1(t,null,u)),null!=(t=n.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(n){l$1.__e(n,u);}t.base=t.__P=null;}if(t=n.__k)for(o=0;o<t.length;o++)t[o]&&N$1(t[o],u,"function"!=typeof n.type);i||null==n.__e||h$1(n.__e),n.__e=n.__d=void 0;}function O$1(n,l,u){return this.constructor(n,u)}function S$1(u,i,t){var o,r,f;l$1.__&&l$1.__(u,i),r=(o="function"==typeof t)?null:t&&t.__k||i.__k,f=[],j$2(i,u=(!o&&t||i).__k=v$1(d$1,null,[u]),r||e$2,e$2,void 0!==i.ownerSVGElement,!o&&t?[t]:r?null:i.firstChild?n.call(i.childNodes):null,f,!o&&t?t:r?r.__e:i.firstChild,o),z$1(f,u);}function q$2(n,l){S$1(n,l,q$2);}function B$1(l,u,i){var t,o,r,f=a$1({},l.props);for(r in u)"key"==r?t=u[r]:"ref"==r?o=u[r]:f[r]=u[r];return arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):i),y$1(l.type,f,t||l.key,o||l.ref,null)}function D$1(n,l){var u={__c:l="__cC"+f$1++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(m$1);},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n=c$1.slice,l$1={__e:function(n,l,u,i){for(var t,o,r;l=l.__;)if((t=l.__c)&&!t.__)try{if((o=t.constructor)&&null!=o.getDerivedStateFromError&&(t.setState(o.getDerivedStateFromError(n)),r=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(n,i||{}),r=t.__d),r)return t.__E=t}catch(l){n=l;}throw n}},u$1=0,_$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a$1({},this.state),"function"==typeof n&&(n=n(a$1({},u),this.props)),n&&a$1(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),m$1(this));},_$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),m$1(this));},_$1.prototype.render=d$1,t$1=[],o$2="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g$2.__r=0,f$1=0;

var t,u,r,o$1=0,i=[],c=l$1.__b,f=l$1.__r,e$1=l$1.diffed,a=l$1.__c,v=l$1.unmount;function l(t,r){l$1.__h&&l$1.__h(u,t,o$1||r),o$1=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function m(n){return o$1=1,p(w$1,n)}function p(n,r,o){var i=l(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):w$1(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}));}],i.__c=u),i.__}function y(r,o){var i=l(t++,3);!l$1.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i));}function d(r,o){var i=l(t++,4);!l$1.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u.__h.push(i));}function h(n){return o$1=5,_(function(){return {current:n}},[])}function s(n,t,u){o$1=6,d(function(){return "function"==typeof n?(n(t()),function(){return n(null)}):n?(n.current=t(),function(){return n.current=null}):void 0},null==u?u:u.concat(n));}function _(n,u){var r=l(t++,7);return k$1(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A$1(n,t){return o$1=8,_(function(){return n},t)}function F$1(n){var r=u.context[n.__c],o=l(t++,9);return o.c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function T$1(t,u){l$1.useDebugValue&&l$1.useDebugValue(u?u(t):t);}function q$1(n){var r=l(t++,10),o=m();return r.__=n,u.componentDidCatch||(u.componentDidCatch=function(n){r.__&&r.__(n),o[1](n);}),[o[0],function(){o[1](void 0);}]}function x$1(){for(var t;t=i.shift();)if(t.__P)try{t.__H.__h.forEach(g$1),t.__H.__h.forEach(j$1),t.__H.__h=[];}catch(u){t.__H.__h=[],l$1.__e(u,t.__v);}}l$1.__b=function(n){u=null,c&&c(n);},l$1.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g$1),r.__h.forEach(j$1),r.__h=[]);},l$1.diffed=function(t){e$1&&e$1(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i.push(o)&&r===l$1.requestAnimationFrame||((r=l$1.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n);},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u));})(x$1)),u=null;},l$1.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g$1),t.__h=t.__h.filter(function(n){return !n.__||j$1(n)});}catch(r){u.some(function(n){n.__h&&(n.__h=[]);}),u=[],l$1.__e(r,t.__v);}}),a&&a(t,u);},l$1.unmount=function(t){v&&v(t);var u,r=t.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{g$1(n);}catch(n){u=n;}}),u&&l$1.__e(u,r.__v));};var b="function"==typeof requestAnimationFrame;function g$1(n){var t=u,r=n.__c;"function"==typeof r&&(n.__c=void 0,r()),u=t;}function j$1(n){var t=u;n.__c=n.__(),u=t;}function k$1(n,t){return !n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function w$1(n,t){return "function"==typeof t?t(n):t}

function C(n,t){for(var e in t)n[e]=t[e];return n}function S(n,t){for(var e in n)if("__source"!==e&&!(e in t))return !0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return !0;return !1}function E(n){this.props=n;}function g(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return !r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:S(this.props,n)}function r(t){return this.shouldComponentUpdate=e,v$1(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(E.prototype=new _$1).isPureReactComponent=!0,E.prototype.shouldComponentUpdate=function(n,t){return S(this.props,n)||S(this.state,t)};var w=l$1.__b;l$1.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),w&&w(n);};var R="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function x(n){function t(t){var e=C({},t);return delete e.ref,n(e,t.ref||null)}return t.$$typeof=R,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var N=function(n,t){return null==n?null:A$2(A$2(n).map(t))},k={map:N,forEach:N,count:function(n){return n?A$2(n).length:0},only:function(n){var t=A$2(n);if(1!==t.length)throw "Children.only";return t[0]},toArray:A$2},A=l$1.__e;l$1.__e=function(n,t,e,r){if(n.then)for(var u,o=t;o=o.__;)if((u=o.__c)&&u.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),u.__c(n,t);A(n,t,e,r);};var O=l$1.unmount;function L(){this.__u=0,this.t=null,this.__b=null;}function U(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function F(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n;},function(n){r=n;}),r)throw r;if(!e)throw t;return v$1(e,u)}return u.displayName="Lazy",u.__f=!0,u}function M(){this.u=null,this.o=null;}l$1.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),O&&O(n);},(L.prototype=new _$1).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=U(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(l):l());};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__e){var n=r.state.__e;r.__v.__k[0]=function n(t,e,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(n,n.__c.__P,n.__c.__O);}var t;for(r.setState({__e:r.__b=null});t=r.t.pop();)t.forceUpdate();}},f=!0===t.__h;r.__u++||f||r.setState({__e:r.__b=r.__v.__k[0]}),n.then(i,i);},L.prototype.componentWillUnmount=function(){this.t=[];},L.prototype.render=function(n,t){if(this.__b){if(this.__v.__k){var e=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function n(t,e,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),t.__c.__H=null),null!=(t=C({},t)).__c&&(t.__c.__P===r&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)})),t}(this.__b,e,r.__O=r.__P);}this.__b=null;}var u=t.__e&&v$1(d$1,null,n.fallback);return u&&(u.__h=null),[v$1(d$1,null,t.__e?null:n.children),u]};var T=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2];}};function D(n){return this.getChildContext=function(){return n.context},n.children}function I(n){var t=this,e=n.i;t.componentWillUnmount=function(){S$1(null,t.l),t.l=null,t.i=null;},t.i&&t.i!==e&&t.componentWillUnmount(),n.__v?(t.l||(t.i=e,t.l={nodeType:1,parentNode:e,childNodes:[],appendChild:function(n){this.childNodes.push(n),t.i.appendChild(n);},insertBefore:function(n,e){this.childNodes.push(n),t.i.appendChild(n);},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),t.i.removeChild(n);}}),S$1(v$1(D,{context:t.context},n.__v),t.l)):t.l&&t.componentWillUnmount();}function W(n,t){var e=v$1(I,{__v:n,i:t});return e.containerInfo=t,e}(M.prototype=new _$1).__e=function(n){var t=this,e=U(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),T(t,n,r)):u();};e?e(o):o();}},M.prototype.render=function(n){this.u=null,this.o=new Map;var t=A$2(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},M.prototype.componentDidUpdate=M.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){T(n,e,t);});};var P="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,V=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,j="undefined"!=typeof document,z=function(n){return ("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function B(n,t,e){return null==t.__k&&(t.textContent=""),S$1(n,t),"function"==typeof e&&e(),n?n.__c:null}function $(n,t,e){return q$2(n,t),"function"==typeof e&&e(),n?n.__c:null}_$1.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(_$1.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t});}});});var H=l$1.event;function Z(){}function Y(){return this.cancelBubble}function q(){return this.defaultPrevented}l$1.event=function(n){return H&&(n=H(n)),n.persist=Z,n.isPropagationStopped=Y,n.isDefaultPrevented=q,n.nativeEvent=n};var G,J={configurable:!0,get:function(){return this.class}},K=l$1.vnode;l$1.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){var u=-1===t.indexOf("-");for(var o in r={},e){var i=e[o];j&&"children"===o&&"noscript"===t||"value"===o&&"defaultValue"in e&&null==i||("defaultValue"===o&&"value"in e&&null==e.value?o="value":"download"===o&&!0===i?i="":/ondoubleclick/i.test(o)?o="ondblclick":/^onchange(textarea|input)/i.test(o+t)&&!z(e.type)?o="oninput":/^onfocus$/i.test(o)?o="onfocusin":/^onblur$/i.test(o)?o="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o)?o=o.toLowerCase():u&&V.test(o)?o=o.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===i&&(i=void 0),r[o]=i);}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=A$2(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value);})),"select"==t&&null!=r.defaultValue&&(r.value=A$2(e.children).forEach(function(n){n.props.selected=r.multiple?-1!=r.defaultValue.indexOf(n.props.value):r.defaultValue==n.props.value;})),n.props=r,e.class!=e.className&&(J.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",J));}n.$$typeof=P,K&&K(n);};var Q=l$1.__r;l$1.__r=function(n){Q&&Q(n),G=n.__c;};var X={ReactCurrentDispatcher:{current:{readContext:function(n){return G.__n[n.__c].props.value}}}},nn="17.0.2";function tn(n){return v$1.bind(null,n)}function en(n){return !!n&&n.$$typeof===P}function rn(n){return en(n)?B$1.apply(null,arguments):n}function un(n){return !!n.__k&&(S$1(null,n),!0)}function on(n){return n&&(n.base||1===n.nodeType&&n)||null}var ln=function(n,t){return n(t)},fn=function(n,t){return n(t)},cn=d$1;var compat = {useState:m,useReducer:p,useEffect:y,useLayoutEffect:d,useRef:h,useImperativeHandle:s,useMemo:_,useCallback:A$1,useContext:F$1,useDebugValue:T$1,version:"17.0.2",Children:k,render:B,hydrate:$,unmountComponentAtNode:un,createPortal:W,createElement:v$1,createContext:D$1,createFactory:tn,cloneElement:rn,createRef:p$1,Fragment:d$1,isValidElement:en,findDOMNode:on,Component:_$1,PureComponent:E,memo:g,forwardRef:x,flushSync:fn,unstable_batchedUpdates:ln,StrictMode:d$1,Suspense:L,SuspenseList:M,lazy:F,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:X};

var compat$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': compat,
  version: nn,
  Children: k,
  render: B,
  hydrate: $,
  unmountComponentAtNode: un,
  createPortal: W,
  createFactory: tn,
  cloneElement: rn,
  isValidElement: en,
  findDOMNode: on,
  PureComponent: E,
  memo: g,
  forwardRef: x,
  flushSync: fn,
  unstable_batchedUpdates: ln,
  StrictMode: cn,
  Suspense: L,
  SuspenseList: M,
  lazy: F,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: X,
  createElement: v$1,
  createContext: D$1,
  createRef: p$1,
  Fragment: d$1,
  Component: _$1,
  useState: m,
  useReducer: p,
  useEffect: y,
  useLayoutEffect: d,
  useRef: h,
  useImperativeHandle: s,
  useMemo: _,
  useCallback: A$1,
  useContext: F$1,
  useDebugValue: T$1,
  useErrorBoundary: q$1
});

var o=0;function e(_,e,n,t,f){var l,s,u={};for(s in e)"ref"==s?l=e[s]:u[s]=e[s];var a={type:_,props:u,key:n,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--o,__source:f,__self:t};if("function"==typeof _&&(l=_.defaultProps))for(s in l)void 0===u[s]&&(u[s]=l[s]);return l$1.vnode&&l$1.vnode(a),a}

function randomInt(min, max) {
    // eslint-disable-next-line no-bitwise
    return Math.random() * (max - min + 1) + min | 0;
}
const isBrowser = typeof window !== 'undefined';
const disqusJsApiFetcher = (apiKey, url)=>{
    const Url = new URL(url);
    Url.searchParams.set('api_key', apiKey);
    return fetch(Url.toString()).then((res)=>res.json()
    );
};
const getTimeStampFromString = (dateString)=>new Date(dateString).getTime()
;
const replaceDisquscdn = (str)=>str.replace(/a\.disquscdn\.com/g, 'c.disquscdn.com')
;
let domParser = null;
const processCommentMessage = (str)=>{
    const rawHtml = replaceDisquscdn(str).replace(/https?:\/\/disq.us\/url\?url=(.+)%3A[\w-]+&amp;cuid=\d+/gm, (_, $1)=>decodeURIComponent($1)
    );
    domParser || (domParser = new DOMParser());
    const doc = domParser.parseFromString(rawHtml, 'text/html');
    // Very basic, but it will do.
    // Any attempt to bypass XSS limitation will be blocked by Disqus' WAF.
    doc.querySelectorAll('script').forEach((script)=>script.remove()
    );
    doc.querySelectorAll('a').forEach((a)=>{
        a.target = '_blank';
        a.rel = 'external noopener nofollow noreferrer';
    });
    return doc.body.innerHTML;
};
const timezoneOffset = new Date().getTimezoneOffset();
const numberPadstart = (num)=>String(num).padStart(2, '0')
;
const formatDate = (str)=>{
    const utcTimestamp = getTimeStampFromString(str);
    const date = new Date(utcTimestamp - timezoneOffset * 60 * 1000);
    return `${date.getFullYear()}-${numberPadstart(date.getMonth() + 1)}-${numberPadstart(date.getDate())} ${numberPadstart(date.getHours())}:${numberPadstart(date.getMinutes())}`;
};
const checkDomainAccessiblity = (domain)=>{
    return new Promise((resolve, reject)=>{
        const img = new Image();
        const clear = ()=>{
            img.onload = null;
            img.onerror = null;
            img.remove();
        };
        const timeout = setTimeout(()=>{
            clear();
            reject();
        }, 3000);
        img.onerror = ()=>{
            clearTimeout(timeout);
            clear();
            reject();
        };
        img.onload = ()=>{
            clearTimeout(timeout);
            clear();
            resolve();
        };
        img.src = `https://${domain}/favicon.ico?${+new Date()}=${+new Date()}`;
    });
};

const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => listeners.clear();
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

function getAugmentedNamespace(n) {
  var f = n.default;
	if (typeof f == "function") {
		var a = function () {
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var withSelector = {exports: {}};

var withSelector_production_min = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(compat$1);

var shim = {exports: {}};

var useSyncExternalStoreShim_production_min = {};

/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredUseSyncExternalStoreShim_production_min;

function requireUseSyncExternalStoreShim_production_min () {
	if (hasRequiredUseSyncExternalStoreShim_production_min) return useSyncExternalStoreShim_production_min;
	hasRequiredUseSyncExternalStoreShim_production_min = 1;
var e=require$$0;function h(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var k="function"===typeof Object.is?Object.is:h,l=e.useState,m=e.useEffect,n=e.useLayoutEffect,p=e.useDebugValue;function q(a,b){var d=b(),f=l({inst:{value:d,getSnapshot:b}}),c=f[0].inst,g=f[1];n(function(){c.value=d;c.getSnapshot=b;r(c)&&g({inst:c});},[a,d,b]);m(function(){r(c)&&g({inst:c});return a(function(){r(c)&&g({inst:c});})},[a]);p(d);return d}
	function r(a){var b=a.getSnapshot;a=a.value;try{var d=b();return !k(a,d)}catch(f){return !0}}function t(a,b){return b()}var u="undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement?t:q;useSyncExternalStoreShim_production_min.useSyncExternalStore=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:u;
	return useSyncExternalStoreShim_production_min;
}

var hasRequiredShim;

function requireShim () {
	if (hasRequiredShim) return shim.exports;
	hasRequiredShim = 1;
	(function (module) {

		{
		  module.exports = requireUseSyncExternalStoreShim_production_min();
		}
} (shim));
	return shim.exports;
}

/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredWithSelector_production_min;

function requireWithSelector_production_min () {
	if (hasRequiredWithSelector_production_min) return withSelector_production_min;
	hasRequiredWithSelector_production_min = 1;
var h=require$$0,n=requireShim();function p(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var q="function"===typeof Object.is?Object.is:p,r=n.useSyncExternalStore,t=h.useRef,u=h.useEffect,v=h.useMemo,w=h.useDebugValue;
	withSelector_production_min.useSyncExternalStoreWithSelector=function(a,b,e,l,g){var c=t(null);if(null===c.current){var f={hasValue:!1,value:null};c.current=f;}else f=c.current;c=v(function(){function a(a){if(!c){c=!0;d=a;a=l(a);if(void 0!==g&&f.hasValue){var b=f.value;if(g(b,a))return k=b}return k=a}b=k;if(q(d,a))return b;var e=l(a);if(void 0!==g&&g(b,e))return b;d=a;return k=e}var c=!1,d,k,m=void 0===e?null:e;return [function(){return a(b())},null===m?void 0:function(){return a(m())}]},[b,e,l,g]);var d=r(a,c[0],c[1]);
	u(function(){f.hasValue=!0;f.value=d;},[d]);w(d);return d};
	return withSelector_production_min;
}

(function (module) {

	{
	  module.exports = requireWithSelector_production_min();
	}
} (withSelector));

function useStore$1(api, selector = api.getState, equalityFn) {
  const slice = withSelector.exports.useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getState, selector, equalityFn);
  T$1(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore$1(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
var create$1 = create;

const getDisqusJsModeDefaultValue = ()=>{
    if (isBrowser) {
        const value = localStorage.getItem('dsqjs_mode');
        if (value === 'dsqjs' || value === 'disqus') {
            return value;
        }
    }
    return null;
};
const getDisqusJsSortTypeDefaultValue = ()=>{
    if (isBrowser) {
        const value = localStorage.getItem('dsqjs_sort');
        if (value === 'popular' || value === 'asc' || value === 'desc') {
            return value;
        }
    }
    return null;
};
const initialState = {
    mode: getDisqusJsModeDefaultValue(),
    sortType: getDisqusJsSortTypeDefaultValue(),
    error: false,
    msg: null,
    thread: null,
    posts: [],
    loadingPosts: false,
    morePostsError: false
};
const useStore = create$1((set, get)=>{
    return _objectSpread({}, initialState, {
        setMode (mode) {
            set({
                mode
            });
            if (isBrowser && mode) {
                // Always wait for a macrotask before setting localStorage
                Promise.resolve().then(()=>{
                    if (mode === null) {
                        localStorage.removeItem('dsqjs_mode');
                    } else {
                        localStorage.setItem('dsqjs_mode', mode);
                    }
                });
            }
        },
        checkMode (shortname) {
            set({
                msg: '正在检查 Disqus 能否访问...'
            });
            Promise.all([
                'disqus.com',
                `${shortname}.disqus.com`
            ].map(checkDomainAccessiblity)).then(()=>{
                set({
                    mode: 'disqus'
                });
                localStorage.setItem('dsqjs_mode', 'disqus');
            }, ()=>{
                set({
                    mode: 'dsqjs'
                });
                localStorage.setItem('dsqjs_mode', 'dsqjs');
            });
        },
        setSortType (sortType) {
            set({
                sortType
            });
            if (isBrowser && sortType) {
                Promise.resolve().then(()=>{
                    localStorage.setItem('dsqjs_sort', sortType);
                });
            }
        },
        setError (error) {
            set({
                error
            });
        },
        setMsg (msg) {
            set({
                msg
            });
        },
        async fetchThread (shortname, identifier, apiKey, api = 'https://disqus.skk.moe/disqus/') {
            try {
                const thread = await disqusJsApiFetcher(apiKey, `${api}3.0/threads/list.json?forum=${encodeURIComponent(shortname)}&thread=${encodeURIComponent(`ident:${identifier}`)}`);
                if (thread.code === 0) {
                    set({
                        thread
                    });
                } else {
                    set({
                        error: true
                    });
                }
            } catch (e) {
                set({
                    error: true
                });
            }
        },
        async fetchMorePosts (shortname, id, apiKey, api = 'https://disqus.skk.moe/disqus/', reset = false) {
            if (!id) return;
            set(_objectSpread({}, reset && {
                posts: []
            }, {
                loadingPosts: true,
                morePostsError: false
            }));
            const posts = reset ? [] : get().posts;
            const sortType = get().sortType;
            const lastPost = posts.at(-1);
            if (lastPost && !lastPost.cursor.hasNext) return;
            const url = `${api}3.0/threads/listPostsThreaded?forum=${shortname}&thread=${id}&order=${sortType !== null && sortType !== void 0 ? sortType : 'desc'}${posts.length !== 0 && (lastPost === null || lastPost === void 0 ? void 0 : lastPost.cursor.next) ? `&cursor=${encodeURIComponent(lastPost.cursor.next)}` : ''}`;
            const handleError = ()=>{
                if (posts.length === 0) {
                    set({
                        error: true,
                        loadingPosts: false
                    });
                } else {
                    set({
                        morePostsError: true,
                        loadingPosts: false
                    });
                }
            };
            try {
                const newPosts = await disqusJsApiFetcher(apiKey, url);
                if (newPosts.code === 0) {
                    set((state)=>({
                            posts: state.posts.concat(newPosts),
                            loadingPosts: false
                        })
                    );
                } else {
                    handleError();
                }
            } catch (e) {
                handleError();
            }
        },
        reset () {
            set(_objectSpread({}, initialState));
        }
    });
});

var DisqusJSLoadMoreCommentsButton = /*#__PURE__*/ g((props)=>{
    const { isError , isLoading  } = props, restProps = _objectWithoutProperties(props, [
        "isError",
        "isLoading"
    ]);
    return /*#__PURE__*/ e("a", _objectSpread({}, restProps, {
        id: "dsqjs-load-more",
        className: `dsqjs-load-more ${isError ? 'is-error' : ''}`,
        role: "button",
        children: // eslint-disable-next-line no-nested-ternary
        isError ? '加载失败，请重试' : isLoading ? '正在加载...' : '加载更多评论'
    }));
});
const DisqusJSForceDisqusModeButton = /*#__PURE__*/ g((props)=>{
    const setDisqusJsMode = useStore((state)=>state.setMode
    );
    const onClickHandler = A$1(()=>setDisqusJsMode('disqus')
    , [
        setDisqusJsMode
    ]);
    return /*#__PURE__*/ e("a", {
        id: "dsqjs-force-disqus",
        className: "dsqjs-msg-btn",
        onClick: onClickHandler,
        children: props.children
    });
});
const DisqusJSReTestModeButton = /*#__PURE__*/ g((props)=>{
    const setDisqusJsMode = useStore((state)=>state.setMode
    );
    const onClickHandler = A$1(()=>setDisqusJsMode(null)
    , [
        setDisqusJsMode
    ]);
    return /*#__PURE__*/ e("a", {
        id: "dsqjs-test-disqus",
        className: "dsqjs-msg-btn",
        onClick: onClickHandler,
        children: props.children
    });
});
const DisqusJSForceDisqusJsModeButton = /*#__PURE__*/ g((props)=>{
    const setDisqusJsMode = useStore((state)=>state.setMode
    );
    const onClickHandler = A$1(()=>setDisqusJsMode('dsqjs')
    , [
        setDisqusJsMode
    ]);
    return /*#__PURE__*/ e("a", {
        id: "dsqjs-force-dsqjs",
        className: "dsqjs-msg-btn",
        onClick: onClickHandler,
        children: props.children
    });
});
const DisqusJSRetryButton = /*#__PURE__*/ g((props)=>{
    const setDisqusJsHasError = useStore((state)=>state.setError
    );
    const handleClick = A$1(()=>{
        setDisqusJsHasError(false);
    }, [
        setDisqusJsHasError
    ]);
    return /*#__PURE__*/ e("a", {
        id: "dsqjs-reload-dsqjs",
        className: "dsqjs-msg-btn",
        onClick: handleClick,
        children: props.children
    });
});

const THREAD_ID = 'disqus_thread';
const EMBED_SCRIPT_ID = 'dsq-embed-scr';
const Disqus = /*#__PURE__*/ g((props)=>{
    const setDisqusJsMessage = useStore((state)=>state.setMsg
    );
    const [loaded, setLoaded] = m(false);
    y(()=>{
        setDisqusJsMessage(null);
        if (isBrowser) {
            const clearDisqusInstance = ()=>{
                if (isBrowser) {
                    var ref2;
                    window.disqus_config = undefined;
                    const scriptEl = document.getElementById(EMBED_SCRIPT_ID);
                    if (scriptEl) {
                        document.head.removeChild(scriptEl);
                        scriptEl.remove();
                    }
                    (ref2 = window.DISQUS) === null || ref2 === void 0 ? void 0 : ref2.reset({});
                    try {
                        delete window.DISQUS;
                    } catch (e) {
                        window.DISQUS = undefined;
                    }
                    const containerEl = document.getElementById(THREAD_ID);
                    if (containerEl) {
                        while(containerEl.hasChildNodes()){
                            containerEl.removeChild(containerEl.firstChild);
                        }
                    }
                    document.querySelectorAll('link[href*="disquscdn.com/next"], link[href*="disqus.com/next"], script[src*="disquscdn.com/next/embed"], script[src*="disqus.com/count-data.js"], iframe[title="Disqus"]').forEach((el)=>{
                        var ref, ref1;
                        (ref = el.parentNode) === null || ref === void 0 ? void 0 : ref.removeChild(el);
                        (ref1 = el.parentElement) === null || ref1 === void 0 ? void 0 : ref1.removeChild(el);
                        el.remove();
                    });
                }
            };
            if (window.disqus_shortname !== props.shortname) {
                clearDisqusInstance();
            }
            const getDisqusConfig = ()=>{
                return function() {
                    if (props.identifier) {
                        this.page.identifier = props.identifier;
                    }
                    if (props.url) {
                        this.page.url = props.url;
                    }
                    if (props.title) {
                        this.page.title = props.title;
                    }
                    this.callbacks.onReady = [
                        ()=>{
                            setLoaded(true);
                        }
                    ];
                };
            };
            if (window.DISQUS && document.getElementById(EMBED_SCRIPT_ID)) {
                window.DISQUS.reset({
                    reload: true,
                    config: getDisqusConfig()
                });
            } else {
                window.disqus_config = getDisqusConfig();
                window.disqus_shortname = props.shortname;
                const scriptEl = document.createElement('script');
                scriptEl.id = EMBED_SCRIPT_ID;
                scriptEl.src = `https://${props.shortname}.disqus.com/embed.js`;
                scriptEl.async = true;
                document.head.appendChild(scriptEl);
            }
            return clearDisqusInstance;
        }
    }, [
        props.shortname,
        props.identifier,
        props.url,
        props.title,
        setDisqusJsMessage
    ]);
    return /*#__PURE__*/ e(d$1, {
        children: [
            /*#__PURE__*/ e("div", {
                id: THREAD_ID,
                children: [
                    "\u8BC4\u8BBA\u5B8C\u6574\u6A21\u5F0F\u52A0\u8F7D\u4E2D... \u5982\u679C\u957F\u65F6\u95F4\u65E0\u6CD5\u52A0\u8F7D\uFF0C\u8BF7\u9488\u5BF9 disq.us | disquscdn.com | disqus.com \u542F\u7528\u4EE3\u7406\uFF0C\u6216\u5207\u6362\u81F3 ",
                    /*#__PURE__*/ e(DisqusJSForceDisqusJsModeButton, {
                        children: "\u8BC4\u8BBA\u57FA\u7840\u6A21\u5F0F"
                    })
                ]
            }),
            !loaded && /*#__PURE__*/ e("div", {
                id: "dsqjs-msg",
                children: [
                    "\u8BC4\u8BBA\u5B8C\u6574\u6A21\u5F0F\u52A0\u8F7D\u4E2D... \u5982\u679C\u957F\u65F6\u95F4\u65E0\u6CD5\u52A0\u8F7D\uFF0C\u8BF7\u9488\u5BF9 disq.us | disquscdn.com | disqus.com \u542F\u7528\u4EE3\u7406\uFF0C\u6216\u5207\u6362\u81F3 ",
                    /*#__PURE__*/ e(DisqusJSForceDisqusJsModeButton, {
                        children: "\u8BC4\u8BBA\u57FA\u7840\u6A21\u5F0F"
                    })
                ]
            })
        ]
    });
});

const DisqusJSError = /*#__PURE__*/ g(()=>{
    return /*#__PURE__*/ e("div", {
        id: "dsqjs-msg",
        children: [
            "\u8BC4\u8BBA\u57FA\u7840\u6A21\u5F0F\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7",
            ' ',
            /*#__PURE__*/ e(DisqusJSRetryButton, {
                children: "\u91CD\u8F7D"
            }),
            ' ',
            "\u6216",
            ' ',
            /*#__PURE__*/ e(DisqusJSReTestModeButton, {
                children: "\u5C1D\u8BD5\u5B8C\u6574 Disqus \u6A21\u5F0F"
            })
        ]
    });
});
const DisqusJSCreateThread = /*#__PURE__*/ g(()=>{
    return /*#__PURE__*/ e("div", {
        id: "dsqjs-msg",
        children: [
            "\u5F53\u524D Thread \u5C1A\u672A\u521B\u5EFA\u3002\u662F\u5426\u5207\u6362\u81F3",
            ' ',
            /*#__PURE__*/ e(DisqusJSForceDisqusModeButton, {
                children: "\u5B8C\u6574 Disqus \u6A21\u5F0F"
            }),
            "\uFF1F"
        ]
    });
});
const DisqusJSNoComment = /*#__PURE__*/ g((props)=>{
    return /*#__PURE__*/ e("p", {
        className: "dsqjs-no-comment",
        children: props.text
    });
});

function DisqusJSPostItem(props) {
    const profileUrl = props.comment.author.profileUrl;
    const avatarUrl = processCommentMessage(props.comment.author.avatar.cache);
    return /*#__PURE__*/ e("li", {
        id: `comment-${props.comment.id}`,
        children: [
            /*#__PURE__*/ e("div", {
                className: "dsqjs-post-item dsqjs-clearfix",
                children: [
                    /*#__PURE__*/ e("div", {
                        className: "dsqjs-post-avatar",
                        children: profileUrl ? /*#__PURE__*/ e("a", {
                            href: profileUrl,
                            target: "_blank",
                            rel: "noreferrer noopenner nofollow external",
                            children: /*#__PURE__*/ e("img", {
                                alt: props.comment.author.username,
                                src: avatarUrl
                            })
                        }) : /*#__PURE__*/ e("img", {
                            alt: props.comment.author.username,
                            src: avatarUrl
                        })
                    }),
                    /*#__PURE__*/ e("div", {
                        className: "dsqjs-post-body",
                        children: [
                            /*#__PURE__*/ e("div", {
                                className: "dsqjs-post-header",
                                children: [
                                    profileUrl ? /*#__PURE__*/ e("span", {
                                        className: "dsqjs-post-author",
                                        children: /*#__PURE__*/ e("a", {
                                            href: profileUrl,
                                            target: "_blank",
                                            rel: "noreferrer noopenner nofollow external",
                                            children: props.comment.author.name
                                        })
                                    }) : /*#__PURE__*/ e("span", {
                                        className: "dsqjs-post-author",
                                        children: props.comment.author.name
                                    }),
                                    // authorEl admin label
                                    props.admin === props.comment.author.username && /*#__PURE__*/ e("span", {
                                        className: "dsqjs-admin-badge",
                                        children: props.adminLabel
                                    }),
                                    ' ',
                                    /*#__PURE__*/ e("span", {
                                        className: "dsqjs-bullet"
                                    }),
                                    ' ',
                                    props.comment.createdAt && /*#__PURE__*/ e("span", {
                                        className: "dsqjs-meta",
                                        children: /*#__PURE__*/ e("time", {
                                            children: formatDate(props.comment.createdAt)
                                        })
                                    })
                                ]
                            }),
                            props.comment.isDeleted ? /*#__PURE__*/ e("div", {
                                className: "dsqjs-post-content",
                                children: /*#__PURE__*/ e("small", {
                                    children: "\u6B64\u8BC4\u8BBA\u5DF2\u88AB\u5220\u9664"
                                })
                            }) : /*#__PURE__*/ e("div", {
                                className: "dsqjs-post-content",
                                dangerouslySetInnerHTML: {
                                    __html: processCommentMessage(props.comment.message)
                                }
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ e(DisqusJSChildrenPostItems, _objectSpread({}, props, {
                currentNesting: props.nesting
            })),
            props.comment.hasMore && /*#__PURE__*/ e("p", {
                className: "dsqjs-has-more",
                children: [
                    "\u5207\u6362\u81F3 ",
                    /*#__PURE__*/ e(DisqusJSForceDisqusModeButton, {
                        children: "\u5B8C\u6574 Disqus \u6A21\u5F0F"
                    }),
                    " \u663E\u793A\u66F4\u591A\u56DE\u590D"
                ]
            })
        ]
    });
}
function DisqusJSChildrenPostItems(props) {
    if (!props.children || props.children.length === 0) return null;
    var _currentNesting, _nestingSetting;
    return /*#__PURE__*/ e("ul", {
        className: `dsqjs-post-list ${((_currentNesting = props.currentNesting) !== null && _currentNesting !== void 0 ? _currentNesting : 1) < ((_nestingSetting = props.nestingSetting) !== null && _nestingSetting !== void 0 ? _nestingSetting : 4) ? 'dsqjs-children' : ''}`,
        children: props.children.map((comment)=>/*#__PURE__*/ v$1(DisqusJSPostItem, _objectSpread({}, comment, {
                admin: props.admin,
                adminLabel: props.adminLabel,
                key: comment.comment.id
            }))
        )
    });
}
function createDisqusJSCommentASTItem(comment, allChildrenComments, nesting) {
    const result = {
        comment,
        children: findChildrenFromComments(allChildrenComments, Number(comment.id), nesting + 1),
        nesting: nesting + 1
    };
    return result;
}
function findChildrenFromComments(allChildrenComments, parentId, nesting) {
    if (allChildrenComments.length === 0) return null;
    const list = [];
    allChildrenComments.forEach((comment)=>{
        if (comment.parent === parentId) {
            list.unshift(createDisqusJSCommentASTItem(comment, allChildrenComments, nesting));
        }
    });
    return list;
}
const DisqusJSCommentsList = (props)=>{
    const processedComments = _(()=>{
        const topLevelComments = [];
        const childComments = [];
        const rawComments = props.comments.slice();
        rawComments.map((comment, index)=>({
                i: index,
                p: comment.parent,
                d: getTimeStampFromString(comment.createdAt)
            })
        ).sort((a, b)=>a.p && b.p ? a.d - b.d : 0
        ).map(({ i  })=>rawComments[i]
        ).forEach((comment)=>(comment.parent ? childComments : topLevelComments).push(comment)
        );
        return topLevelComments.map((comment)=>createDisqusJSCommentASTItem(comment, childComments, 0)
        );
    }, [
        props.comments
    ]);
    return /*#__PURE__*/ e("ul", {
        className: "dsqjs-post-list",
        id: "dsqjs-post-container",
        children: processedComments.map((comment)=>/*#__PURE__*/ v$1(DisqusJSPostItem, _objectSpread({}, comment, {
                key: comment.comment.id,
                admin: props.admin,
                adminLabel: props.adminLabel
            }))
        )
    });
};

// We will try to make the used api key as stable as possible
// And if React decides to forget some memoized values, it doesn't matter anyway
const useRandomApiKey = (apiKeys)=>_(()=>{
        if (Array.isArray(apiKeys)) {
            return apiKeys[randomInt(0, apiKeys.length - 1)];
        }
        return apiKeys;
    }, [
        apiKeys
    ])
;

const DisqusJSSortTypeRadio = (props)=>{
    return /*#__PURE__*/ e(d$1, {
        children: [
            /*#__PURE__*/ e("input", {
                className: "dsqjs-order-radio",
                id: `dsqjs-order-${props.sortType}`,
                type: "radio",
                name: "comment-order",
                value: props.sortType,
                onChange: props.onChange,
                checked: props.checked
            }),
            /*#__PURE__*/ e("label", {
                className: "dsqjs-order-label",
                htmlFor: `dsqjs-order-${props.sortType}`,
                title: props.title,
                children: props.label
            })
        ]
    });
};
const DisqusJSSortTypeRadioGroup = /*#__PURE__*/ g(()=>{
    const sortType = useStore((state)=>state.sortType
    );
    const setSortType = useStore((state)=>state.setSortType
    );
    const onChangeHandler = A$1((value)=>()=>setSortType(value)
    , [
        setSortType
    ]);
    return /*#__PURE__*/ e("div", {
        className: "dsqjs-order",
        children: [
            /*#__PURE__*/ e(DisqusJSSortTypeRadio, {
                checked: sortType === 'desc' || sortType === null,
                sortType: "desc",
                title: "\u6309\u4ECE\u65B0\u5230\u65E7",
                label: "\u6700\u65B0",
                onChange: onChangeHandler('desc')
            }),
            /*#__PURE__*/ e(DisqusJSSortTypeRadio, {
                checked: sortType === 'asc',
                sortType: "asc",
                title: "\u6309\u4ECE\u65E7\u5230\u65B0",
                label: "\u6700\u65E9",
                onChange: onChangeHandler('asc')
            }),
            /*#__PURE__*/ e(DisqusJSSortTypeRadio, {
                checked: sortType === 'popular',
                sortType: "popular",
                title: "\u6309\u8BC4\u5206\u4ECE\u9AD8\u5230\u4F4E",
                label: "\u6700\u4F73",
                onChange: onChangeHandler('popular')
            })
        ]
    });
});
const DisqusJSHeader = /*#__PURE__*/ g((props)=>/*#__PURE__*/ e("header", {
        className: "dsqjs-header",
        id: "dsqjs-header",
        children: /*#__PURE__*/ e("nav", {
            className: "dsqjs-nav dsqjs-clearfix",
            children: [
                /*#__PURE__*/ e("ul", {
                    children: [
                        /*#__PURE__*/ e("li", {
                            className: "dsqjs-nav-tab dsqjs-tab-active",
                            children: /*#__PURE__*/ e("span", {
                                children: [
                                    props.totalComments,
                                    " Comments"
                                ]
                            })
                        }),
                        /*#__PURE__*/ e("li", {
                            className: "dsqjs-nav-tab",
                            children: props.siteName
                        })
                    ]
                }),
                /*#__PURE__*/ e(DisqusJSSortTypeRadioGroup, {})
            ]
        })
    })
);
const DisqusJSPosts = (props)=>{
    const apiKey = h(useRandomApiKey(props.apikey));
    const posts = useStore((state)=>state.posts
    );
    const sortType = useStore((state)=>state.sortType
    );
    const prevSortType = h(sortType);
    const errorWhenLoadMorePosts = useStore((state)=>state.morePostsError
    );
    const isLoadingMorePosts = useStore((state)=>state.loadingPosts
    );
    const fetchMorePosts = useStore((state)=>state.fetchMorePosts
    );
    const fetchFirstPageRef = h(null);
    const resetAndFetchFirstPageOfPosts = A$1(()=>fetchMorePosts(props.shortname, props.id, apiKey.current, props.api, true)
    , [
        fetchMorePosts,
        props.api,
        props.id,
        props.shortname
    ]);
    const fetchNextPageOfPosts = A$1(()=>fetchMorePosts(props.shortname, props.id, apiKey.current, props.api, false)
    , [
        fetchMorePosts,
        props.api,
        props.id,
        props.shortname
    ]);
    y(()=>{
        // When there is no posts at all, load the first pagination of posts.
        if (fetchFirstPageRef.current !== props.id) {
            fetchFirstPageRef.current = props.id;
            resetAndFetchFirstPageOfPosts();
        } else if (prevSortType.current !== sortType) {
            prevSortType.current = sortType;
            fetchFirstPageRef.current = props.id;
            resetAndFetchFirstPageOfPosts();
        }
    }, [
        posts,
        resetAndFetchFirstPageOfPosts,
        props.id,
        isLoadingMorePosts,
        sortType
    ]);
    if (posts.length > 0) {
        var ref;
        return /*#__PURE__*/ e(d$1, {
            children: [
                /*#__PURE__*/ e(DisqusJSCommentsList, {
                    comments: posts.filter(Boolean).map((i)=>i.response
                    ).flat(),
                    admin: props.admin,
                    adminLabel: props.adminLabel
                }),
                ((ref = posts.at(-1)) === null || ref === void 0 ? void 0 : ref.cursor.hasNext) && /*#__PURE__*/ e(DisqusJSLoadMoreCommentsButton, {
                    isLoading: isLoadingMorePosts,
                    isError: errorWhenLoadMorePosts,
                    onClick: isLoadingMorePosts ? undefined : fetchNextPageOfPosts
                })
            ]
        });
    }
    return null;
};
const DisqusJSThread = (props)=>{
    const apiKey = h(useRandomApiKey(props.apikey));
    const thread = useStore((state)=>state.thread
    );
    const fetchThread = useStore((state)=>state.fetchThread
    );
    const setDisqusJsMessage = useStore((state)=>state.setMsg
    );
    const fetchThreadRef = h(null);
    var _identifier;
    const identifier = (_identifier = props.identifier) !== null && _identifier !== void 0 ? _identifier : document.location.origin + document.location.pathname + document.location.search;
    y(()=>{
        if (fetchThreadRef.current !== identifier) {
            setDisqusJsMessage(/*#__PURE__*/ e(d$1, {
                children: [
                    "\u8BC4\u8BBA\u57FA\u7840\u6A21\u5F0F\u52A0\u8F7D\u4E2D... \u5982\u9700\u5B8C\u6574\u4F53\u9A8C\u8BF7\u9488\u5BF9 disq.us | disquscdn.com | disqus.com \u542F\u7528\u4EE3\u7406\u5E76 ",
                    /*#__PURE__*/ e(DisqusJSReTestModeButton, {
                        children: "\u5C1D\u8BD5\u5B8C\u6574 Disqus \u6A21\u5F0F"
                    }),
                    " | ",
                    /*#__PURE__*/ e(DisqusJSForceDisqusModeButton, {
                        children: "\u5F3A\u5236\u5B8C\u6574 Disqus \u6A21\u5F0F"
                    })
                ]
            }));
            fetchThreadRef.current = identifier;
            fetchThread(props.shortname, identifier, apiKey.current, props.api);
        } else {
            setDisqusJsMessage(/*#__PURE__*/ e(d$1, {
                children: [
                    "\u4F60\u53EF\u80FD\u65E0\u6CD5\u8BBF\u95EE Disqus\uFF0C\u5DF2\u542F\u7528\u8BC4\u8BBA\u57FA\u7840\u6A21\u5F0F\u3002\u5982\u9700\u5B8C\u6574\u4F53\u9A8C\u8BF7\u9488\u5BF9 disq.us | disquscdn.com | disqus.com \u542F\u7528\u4EE3\u7406\u5E76 ",
                    /*#__PURE__*/ e(DisqusJSReTestModeButton, {
                        children: "\u5C1D\u8BD5\u5B8C\u6574 Disqus \u6A21\u5F0F"
                    }),
                    " | ",
                    /*#__PURE__*/ e(DisqusJSForceDisqusModeButton, {
                        children: "\u5F3A\u5236\u5B8C\u6574 Disqus \u6A21\u5F0F"
                    })
                ]
            }));
        }
    }, [
        thread,
        fetchThread,
        identifier,
        setDisqusJsMessage,
        props.shortname,
        props.api
    ]);
    if (!thread) {
        return null;
    }
    if (thread.response.length === 1) {
        if (thread.response[0].posts === 0) {
            var _siteName, _nocomment;
            return /*#__PURE__*/ e(d$1, {
                children: [
                    /*#__PURE__*/ e(DisqusJSHeader, {
                        totalComments: 0,
                        siteName: (_siteName = props.siteName) !== null && _siteName !== void 0 ? _siteName : ''
                    }),
                    /*#__PURE__*/ e(DisqusJSNoComment, {
                        text: (_nocomment = props.nocomment) !== null && _nocomment !== void 0 ? _nocomment : '这里空荡荡的，一个人都没有'
                    })
                ]
            });
        }
        var _siteName1;
        return /*#__PURE__*/ e(d$1, {
            children: [
                /*#__PURE__*/ e(DisqusJSHeader, {
                    totalComments: thread.response[0].posts,
                    siteName: (_siteName1 = props.siteName) !== null && _siteName1 !== void 0 ? _siteName1 : ''
                }),
                /*#__PURE__*/ e(DisqusJSPosts, _objectSpread({}, props, {
                    id: thread.response[0].id
                }))
            ]
        });
    }
    return /*#__PURE__*/ e(DisqusJSCreateThread, {});
};

const DisqusJSFooter = /*#__PURE__*/ g(()=>/*#__PURE__*/ e("footer", {
        className: "dsqjs-footer-container",
        children: /*#__PURE__*/ e("p", {
            className: "dsqjs-footer",
            children: [
                'Powered by ',
                /*#__PURE__*/ e("a", {
                    className: "dsqjs-disqus-logo",
                    href: "https://disqus.com",
                    target: "_blank",
                    rel: "external nofollow noopener noreferrer"
                }),
                ' ',
                "&",
                ' ',
                /*#__PURE__*/ e("a", {
                    className: "dsqjs-dsqjs-logo",
                    href: "https://disqusjs.skk.moe",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "DisqusJS"
                })
            ]
        })
    })
);

var styles = {"dsqjs":"__dsqjs_oc95o1"};

const DisqusJSEntry = (props)=>{
    const disqusJsMode = useStore((state)=>state.mode
    );
    const checkDisqusJsMode = useStore((state)=>state.checkMode
    );
    y(()=>{
        if (disqusJsMode !== 'disqus' && disqusJsMode !== 'dsqjs') {
            checkDisqusJsMode(props.shortname);
        }
    }, [
        checkDisqusJsMode,
        disqusJsMode,
        props.shortname
    ]);
    if (disqusJsMode === 'disqus') {
        return /*#__PURE__*/ e(Disqus, {
            shortname: props.shortname,
            identifier: props.identifier,
            url: props.url,
            title: props.title
        });
    }
    if (disqusJsMode === 'dsqjs') {
        return /*#__PURE__*/ e(DisqusJSThread, _objectSpread({}, props));
    }
    return null;
};
var DisqusJS$1 = /*#__PURE__*/ x((props, ref)=>{
    const msg = useStore((state)=>state.msg
    );
    const disqusJsHasError = useStore((state)=>state.error
    );
    const { shortname , siteName , identifier , url , title , api , apikey , nesting , nocomment , admin , adminLabel , className  } = props, rest = _objectWithoutProperties(props, [
        "shortname",
        "siteName",
        "identifier",
        "url",
        "title",
        "api",
        "apikey",
        "nesting",
        "nocomment",
        "admin",
        "adminLabel",
        "className"
    ]);
    const disqusJsConfig = {
        shortname,
        siteName,
        identifier,
        url,
        title,
        api,
        apikey,
        nesting,
        nocomment,
        admin,
        adminLabel
    };
    const [startClientSideRender, setStartClientSideRender] = m(false);
    y(()=>{
        setStartClientSideRender(true);
    }, []);
    if (startClientSideRender) {
        return /*#__PURE__*/ e("div", _objectSpread({
            ref: ref
        }, rest, {
            className: `${styles.dsqjs} ${className !== null && className !== void 0 ? className : ''}`,
            children: /*#__PURE__*/ e("section", {
                id: "dsqjs",
                children: [
                    disqusJsHasError ? /*#__PURE__*/ e(DisqusJSError, {}) : /*#__PURE__*/ e(d$1, {
                        children: [
                            msg && /*#__PURE__*/ e("div", {
                                id: "dsqjs-msg",
                                children: msg
                            }),
                            /*#__PURE__*/ e(DisqusJSEntry, _objectSpread({}, disqusJsConfig))
                        ]
                    }),
                    /*#__PURE__*/ e(DisqusJSFooter, {})
                ]
            })
        }));
    }
    return null;
});

// eslint-disable-next-line no-nested-ternary
const getElementFromConfig = (el)=>el ? typeof el === 'string' ? document.querySelector(el) : el : document.getElementById('disqusjs')
;
class DisqusJS {
    render(el) {
        const container = getElementFromConfig(el);
        if (container) {
            this.container = container;
            S$1(/*#__PURE__*/ e(DisqusJS$1, _objectSpread({}, this.config)), container);
        }
    }
    destroy() {
        if (this.container) {
            // https://github.com/preactjs/preact/blob/40f7c6592b4ed96fe9c6615e43e3d9815e566291/compat/src/index.js#L67-L78
            S$1(null, this.container);
        }
    }
    constructor(config){
        this.config = config;
    }
}

export { DisqusJS as default };
