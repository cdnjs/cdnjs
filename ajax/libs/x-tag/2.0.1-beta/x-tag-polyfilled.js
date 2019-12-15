(function(){
  'use strict';var h=new function(){};var aa=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function k(b){var a=aa.has(b);b=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);return!a&&b}function l(b){var a=b.isConnected;if(void 0!==a)return a;for(;b&&!(b.__CE_isImportDocument||b instanceof Document);)b=b.parentNode||(window.ShadowRoot&&b instanceof ShadowRoot?b.host:void 0);return!(!b||!(b.__CE_isImportDocument||b instanceof Document))}
  function m(b,a){for(;a&&a!==b&&!a.nextSibling;)a=a.parentNode;return a&&a!==b?a.nextSibling:null}
  function n(b,a,e){e=e?e:new Set;for(var c=b;c;){if(c.nodeType===Node.ELEMENT_NODE){var d=c;a(d);var f=d.localName;if("link"===f&&"import"===d.getAttribute("rel")){c=d.import;if(c instanceof Node&&!e.has(c))for(e.add(c),c=c.firstChild;c;c=c.nextSibling)n(c,a,e);c=m(b,d);continue}else if("template"===f){c=m(b,d);continue}if(d=d.__CE_shadowRoot)for(d=d.firstChild;d;d=d.nextSibling)n(d,a,e)}c=c.firstChild?c.firstChild:m(b,c)}}function q(b,a,e){b[a]=e};function r(){this.a=new Map;this.m=new Map;this.f=[];this.b=!1}function ba(b,a,e){b.a.set(a,e);b.m.set(e.constructor,e)}function t(b,a){b.b=!0;b.f.push(a)}function v(b,a){b.b&&n(a,function(a){return w(b,a)})}function w(b,a){if(b.b&&!a.__CE_patched){a.__CE_patched=!0;for(var e=0;e<b.f.length;e++)b.f[e](a)}}function x(b,a){var e=[];n(a,function(b){return e.push(b)});for(a=0;a<e.length;a++){var c=e[a];1===c.__CE_state?b.connectedCallback(c):y(b,c)}}
  function z(b,a){var e=[];n(a,function(b){return e.push(b)});for(a=0;a<e.length;a++){var c=e[a];1===c.__CE_state&&b.disconnectedCallback(c)}}
  function A(b,a,e){e=e?e:{};var c=e.w||new Set,d=e.s||function(d){return y(b,d)},f=[];n(a,function(a){if("link"===a.localName&&"import"===a.getAttribute("rel")){var e=a.import;e instanceof Node&&"complete"===e.readyState?(e.__CE_isImportDocument=!0,e.__CE_hasRegistry=!0):a.addEventListener("load",function(){var e=a.import;e.__CE_documentLoadHandled||(e.__CE_documentLoadHandled=!0,e.__CE_isImportDocument=!0,e.__CE_hasRegistry=!0,c.delete(e),A(b,e,{w:c,s:d}))})}else f.push(a)},c);if(b.b)for(a=0;a<f.length;a++)w(b,
  f[a]);for(a=0;a<f.length;a++)d(f[a])}
  function y(b,a){if(void 0===a.__CE_state){var e=b.a.get(a.localName);if(e){e.constructionStack.push(a);var c=e.constructor;try{try{if(new c!==a)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{e.constructionStack.pop()}}catch(g){throw a.__CE_state=2,g;}a.__CE_state=1;a.__CE_definition=e;if(e.attributeChangedCallback)for(e=e.observedAttributes,c=0;c<e.length;c++){var d=e[c],f=a.getAttribute(d);null!==f&&b.attributeChangedCallback(a,d,null,f,null)}l(a)&&
  b.connectedCallback(a)}}}r.prototype.connectedCallback=function(b){var a=b.__CE_definition;a.connectedCallback&&a.connectedCallback.call(b)};r.prototype.disconnectedCallback=function(b){var a=b.__CE_definition;a.disconnectedCallback&&a.disconnectedCallback.call(b)};r.prototype.attributeChangedCallback=function(b,a,e,c,d){var f=b.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(a)&&f.attributeChangedCallback.call(b,a,e,c,d)};function B(b,a){this.c=b;this.a=a;this.b=void 0;A(this.c,this.a);"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function C(b){b.b&&b.b.disconnect()}B.prototype.f=function(b){var a=this.a.readyState;"interactive"!==a&&"complete"!==a||C(this);for(a=0;a<b.length;a++)for(var e=b[a].addedNodes,c=0;c<e.length;c++)A(this.c,e[c])};function ca(){var b=this;this.b=this.a=void 0;this.f=new Promise(function(a){b.b=a;b.a&&a(b.a)})}function D(b){if(b.a)throw Error("Already resolved.");b.a=void 0;b.b&&b.b(void 0)};function E(b){this.h=!1;this.c=b;this.l=new Map;this.i=function(b){return b()};this.g=!1;this.j=[];this.u=new B(b,document)}
  E.prototype.define=function(b,a){var e=this;if(!(a instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!k(b))throw new SyntaxError("The element name '"+b+"' is not valid.");if(this.c.a.get(b))throw Error("A custom element with name '"+b+"' has already been defined.");if(this.h)throw Error("A custom element is already being defined.");this.h=!0;var c,d,f,g,u;try{var p=function(b){var d=P[b];if(void 0!==d&&!(d instanceof Function))throw Error("The '"+b+"' callback must be a function.");
  return d},P=a.prototype;if(!(P instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");c=p("connectedCallback");d=p("disconnectedCallback");f=p("adoptedCallback");g=p("attributeChangedCallback");u=a.observedAttributes||[]}catch(va){return}finally{this.h=!1}a={localName:b,constructor:a,connectedCallback:c,disconnectedCallback:d,adoptedCallback:f,attributeChangedCallback:g,observedAttributes:u,constructionStack:[]};ba(this.c,b,a);this.j.push(a);this.g||
  (this.g=!0,this.i(function(){return da(e)}))};function da(b){if(!1!==b.g){b.g=!1;for(var a=b.j,e=[],c=new Map,d=0;d<a.length;d++)c.set(a[d].localName,[]);A(b.c,document,{s:function(d){if(void 0===d.__CE_state){var a=d.localName,f=c.get(a);f?f.push(d):b.c.a.get(a)&&e.push(d)}}});for(d=0;d<e.length;d++)y(b.c,e[d]);for(;0<a.length;){for(var f=a.shift(),d=f.localName,f=c.get(f.localName),g=0;g<f.length;g++)y(b.c,f[g]);(d=b.l.get(d))&&D(d)}}}E.prototype.get=function(b){if(b=this.c.a.get(b))return b.constructor};
  E.prototype.whenDefined=function(b){if(!k(b))return Promise.reject(new SyntaxError("'"+b+"' is not a valid custom element name."));var a=this.l.get(b);if(a)return a.f;a=new ca;this.l.set(b,a);this.c.a.get(b)&&!this.j.some(function(a){return a.localName===b})&&D(a);return a.f};E.prototype.v=function(b){C(this.u);var a=this.i;this.i=function(e){return b(function(){return a(e)})}};window.CustomElementRegistry=E;E.prototype.define=E.prototype.define;E.prototype.get=E.prototype.get;
  E.prototype.whenDefined=E.prototype.whenDefined;E.prototype.polyfillWrapFlushCallback=E.prototype.v;var F=window.Document.prototype.createElement,ea=window.Document.prototype.createElementNS,fa=window.Document.prototype.importNode,ga=window.Document.prototype.prepend,ha=window.Document.prototype.append,G=window.Node.prototype.cloneNode,H=window.Node.prototype.appendChild,I=window.Node.prototype.insertBefore,J=window.Node.prototype.removeChild,K=window.Node.prototype.replaceChild,L=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),M=window.Element.prototype.attachShadow,N=Object.getOwnPropertyDescriptor(window.Element.prototype,
  "innerHTML"),O=window.Element.prototype.getAttribute,Q=window.Element.prototype.setAttribute,R=window.Element.prototype.removeAttribute,S=window.Element.prototype.getAttributeNS,T=window.Element.prototype.setAttributeNS,U=window.Element.prototype.removeAttributeNS,V=window.Element.prototype.insertAdjacentElement,ia=window.Element.prototype.prepend,ja=window.Element.prototype.append,ka=window.Element.prototype.before,la=window.Element.prototype.after,ma=window.Element.prototype.replaceWith,na=window.Element.prototype.remove,
  oa=window.HTMLElement,W=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),X=window.HTMLElement.prototype.insertAdjacentElement;function pa(){var b=Y;window.HTMLElement=function(){function a(){var a=this.constructor,c=b.m.get(a);if(!c)throw Error("The custom element being constructed was not registered with `customElements`.");var d=c.constructionStack;if(!d.length)return d=F.call(document,c.localName),Object.setPrototypeOf(d,a.prototype),d.__CE_state=1,d.__CE_definition=c,w(b,d),d;var c=d.length-1,f=d[c];if(f===h)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
  d[c]=h;Object.setPrototypeOf(f,a.prototype);w(b,f);return f}a.prototype=oa.prototype;return a}()};function qa(b,a,e){a.prepend=function(a){for(var d=[],c=0;c<arguments.length;++c)d[c-0]=arguments[c];c=d.filter(function(b){return b instanceof Node&&l(b)});e.o.apply(this,d);for(var g=0;g<c.length;g++)z(b,c[g]);if(l(this))for(c=0;c<d.length;c++)g=d[c],g instanceof Element&&x(b,g)};a.append=function(a){for(var d=[],c=0;c<arguments.length;++c)d[c-0]=arguments[c];c=d.filter(function(b){return b instanceof Node&&l(b)});e.append.apply(this,d);for(var g=0;g<c.length;g++)z(b,c[g]);if(l(this))for(c=0;c<
  d.length;c++)g=d[c],g instanceof Element&&x(b,g)}};function ra(){var b=Y;q(Document.prototype,"createElement",function(a){if(this.__CE_hasRegistry){var e=b.a.get(a);if(e)return new e.constructor}a=F.call(this,a);w(b,a);return a});q(Document.prototype,"importNode",function(a,e){a=fa.call(this,a,e);this.__CE_hasRegistry?A(b,a):v(b,a);return a});q(Document.prototype,"createElementNS",function(a,e){if(this.__CE_hasRegistry&&(null===a||"http://www.w3.org/1999/xhtml"===a)){var c=b.a.get(e);if(c)return new c.constructor}a=ea.call(this,a,e);w(b,a);return a});
  qa(b,Document.prototype,{o:ga,append:ha})};function sa(){var b=Y;function a(a,c){Object.defineProperty(a,"textContent",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(d){if(this.nodeType===Node.TEXT_NODE)c.set.call(this,d);else{var a=void 0;if(this.firstChild){var e=this.childNodes,u=e.length;if(0<u&&l(this))for(var a=Array(u),p=0;p<u;p++)a[p]=e[p]}c.set.call(this,d);if(a)for(d=0;d<a.length;d++)z(b,a[d])}}})}q(Node.prototype,"insertBefore",function(a,c){if(a instanceof DocumentFragment){var d=Array.prototype.slice.apply(a.childNodes);
  a=I.call(this,a,c);if(l(this))for(c=0;c<d.length;c++)x(b,d[c]);return a}d=l(a);c=I.call(this,a,c);d&&z(b,a);l(this)&&x(b,a);return c});q(Node.prototype,"appendChild",function(a){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);a=H.call(this,a);if(l(this))for(var d=0;d<c.length;d++)x(b,c[d]);return a}c=l(a);d=H.call(this,a);c&&z(b,a);l(this)&&x(b,a);return d});q(Node.prototype,"cloneNode",function(a){a=G.call(this,a);this.ownerDocument.__CE_hasRegistry?A(b,a):v(b,a);
  return a});q(Node.prototype,"removeChild",function(a){var c=l(a),d=J.call(this,a);c&&z(b,a);return d});q(Node.prototype,"replaceChild",function(a,c){if(a instanceof DocumentFragment){var d=Array.prototype.slice.apply(a.childNodes);a=K.call(this,a,c);if(l(this))for(z(b,c),c=0;c<d.length;c++)x(b,d[c]);return a}var d=l(a),e=K.call(this,a,c),g=l(this);g&&z(b,c);d&&z(b,a);g&&x(b,a);return e});L&&L.get?a(Node.prototype,L):t(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){for(var a=[],b=
  0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)J.call(this,this.firstChild);H.call(this,document.createTextNode(a))}})})};function ta(b){var a=Element.prototype;a.before=function(a){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];d=c.filter(function(a){return a instanceof Node&&l(a)});ka.apply(this,c);for(var e=0;e<d.length;e++)z(b,d[e]);if(l(this))for(d=0;d<c.length;d++)e=c[d],e instanceof Element&&x(b,e)};a.after=function(a){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];d=c.filter(function(a){return a instanceof Node&&l(a)});la.apply(this,c);for(var e=0;e<d.length;e++)z(b,d[e]);if(l(this))for(d=
  0;d<c.length;d++)e=c[d],e instanceof Element&&x(b,e)};a.replaceWith=function(a){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];var d=c.filter(function(a){return a instanceof Node&&l(a)}),e=l(this);ma.apply(this,c);for(var g=0;g<d.length;g++)z(b,d[g]);if(e)for(z(b,this),d=0;d<c.length;d++)e=c[d],e instanceof Element&&x(b,e)};a.remove=function(){var a=l(this);na.call(this);a&&z(b,this)}};function ua(){var b=Y;function a(a,c){Object.defineProperty(a,"innerHTML",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){var d=this,e=void 0;l(this)&&(e=[],n(this,function(a){a!==d&&e.push(a)}));c.set.call(this,a);if(e)for(var f=0;f<e.length;f++){var g=e[f];1===g.__CE_state&&b.disconnectedCallback(g)}this.ownerDocument.__CE_hasRegistry?A(b,this):v(b,this);return a}})}function e(a,c){q(a,"insertAdjacentElement",function(a,d){var e=l(d);a=c.call(this,a,d);e&&z(b,d);l(a)&&x(b,d);
  return a})}M?q(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=M.call(this,a)}):console.warn("Custom Elements: `Element#attachShadow` was not patched.");if(N&&N.get)a(Element.prototype,N);else if(W&&W.get)a(HTMLElement.prototype,W);else{var c=F.call(document,"div");t(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){return G.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName?this.content:this;for(c.innerHTML=a;0<b.childNodes.length;)J.call(b,
  b.childNodes[0]);for(;0<c.childNodes.length;)H.call(b,c.childNodes[0])}})})}q(Element.prototype,"setAttribute",function(a,c){if(1!==this.__CE_state)return Q.call(this,a,c);var d=O.call(this,a);Q.call(this,a,c);c=O.call(this,a);b.attributeChangedCallback(this,a,d,c,null)});q(Element.prototype,"setAttributeNS",function(a,c,e){if(1!==this.__CE_state)return T.call(this,a,c,e);var d=S.call(this,a,c);T.call(this,a,c,e);e=S.call(this,a,c);b.attributeChangedCallback(this,c,d,e,a)});q(Element.prototype,"removeAttribute",
  function(a){if(1!==this.__CE_state)return R.call(this,a);var c=O.call(this,a);R.call(this,a);null!==c&&b.attributeChangedCallback(this,a,c,null,null)});q(Element.prototype,"removeAttributeNS",function(a,c){if(1!==this.__CE_state)return U.call(this,a,c);var d=S.call(this,a,c);U.call(this,a,c);var e=S.call(this,a,c);d!==e&&b.attributeChangedCallback(this,c,d,e,a)});X?e(HTMLElement.prototype,X):V?e(Element.prototype,V):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
  qa(b,Element.prototype,{o:ia,append:ja});ta(b)};

  var Z=window.customElements;if(!Z||Z.forcePolyfill||"function"!=typeof Z.define||"function"!=typeof Z.get){var Y=new r;pa();ra();sa();ua();document.__CE_hasRegistry=!0;var customElements=new E(Y);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};
  }).call(self);
(function(){

  var docElement = document.documentElement;
  (Element.prototype.matches || (Element.prototype.matches = docElement.webkitMatchesSelector ||
                                                             docElement.msMatchesSelector ||
                                                             docElement.oMatchesSelector))

  var regexParseExt = /([\w\-]+)|(::|:)(\w+)(?:\((.+?(?=\)))\))?/g;
  var regexCommaArgs = /,\s*/;
  var regexCamel = /[A-Z]/g;
  var dashLower = c => "-" + c.toLowerCase();

  function delegateAction(node, pseudo, event) {
    var match,
        target = event.target,
        root = event.currentTarget;
    while (!match && target && target != root) {
      if (target.tagName && target.matches(pseudo.args)) match = target;
      target = target.parentNode;
    }
    if (!match && root.tagName && root.matches(pseudo.args)) match = root;
    if (match) pseudo.fn = pseudo.fn.bind(match);
    else return null;
  }

  var xtag = {
    events: {},
    pseudos: {
      delegate: {
        onInvoke: delegateAction
      }
    },
    extensions: {
      rxn: {
        onParse (klass, prop, args, descriptor, key){
          delete klass.prototype[key];
          return false;
        },
        onConstruct (node, property, args, descriptor){
          node.rxn(property, descriptor.value, !!args[1]);
        }
      },
      attr: {
        mixin: (base) => class extends base {
          attributeChangedCallback(attr, last, current){
            var desc = this.constructor.getOptions('attributes')[attr];
            if (desc && desc.set && !desc._skip) {
              desc.set.call(this, current);
              desc._skip = null;
            }
          }
        },
        types: {
          boolean: {
            set: function(prop, val){
              val || val === '' ? this.setAttribute(prop, '') : this.removeAttribute(prop);
            },
            get: function(prop){
              return this.hasAttribute(prop);
            }
          }
        },
        onParse (klass, prop, args, descriptor, key){
          if (descriptor.value) throw 'Attribute accessor "'+ prop +'" was declared as a value, but must be declared as get or set';
          var _prop = prop.replace(regexCamel, dashLower);
          klass.getOptions('attributes')[_prop] = descriptor;
          var type = this.types[args[0]] || {};
          let descSet = descriptor.set;
          let typeSet = type.set || HTMLElement.prototype.setAttribute;
          descriptor.set = function(val){
            if (!descriptor._skip){
              descriptor._skip = true;
              var output;
              if (descSet) output = descSet.call(this, val);
              typeSet.call(this, _prop, typeof output == 'undefined' ? val : output);
              descriptor._skip = null;
            }
          }
          let descGet = descriptor.get;
          let typeGet = type.get || HTMLElement.prototype.getAttribute;
          descriptor.get = function(){
            var output;
            var val = typeGet.call(this, _prop);
            if (descGet) output = descGet.call(this, val);
            return typeof output == 'undefined' ? val : output;
          }
          delete klass.prototype[key];
        },
        onCompiled (klass){
          klass.observedAttributes = Object.keys(klass.getOptions('attributes')).concat(klass.observedAttributes || [])
        }
      },
      event: {
        onParse (klass, property, args, descriptor, key){
          delete klass.prototype[key];
          return false;
        },
        onConstruct (node, property, args, descriptor){
          xtag.addEvent(node, property, descriptor.value);
        }
      },
      template: {
        throttle: {
          frame: function (node, template, queued){
            queued.cancel = cancelAnimationFrame.bind(window, requestAnimationFrame(() => {
              node._render(template, queued);
            }))
          },
          debounce: function (node, template, queued, options){
            queued.cancel = clearTimeout.bind(window, setTimeout(() => {
              node_.render(template, queued);
            }, options.throttle))
          }
        },
        mixin: (base) => class extends base {
          set 'template::attr' (name){
            this.render(name);
          }
          get templates (){
            return this.constructor.getOptions('templates');
          }
          _render (template, queued){
            this.innerHTML = template.call(this);
            this._XTagRender = null;
            if (queued.resolve) queued.resolve(this);
          }
          render (name, options = {}){
            var _name = name || 'default';
            var template = this.templates[_name];
            if (!template) {
              throw new ReferenceError('Template "' + _name + '" undefined for ' + this.nodeName);
            }
            var queued = this._XTagRender;
            if (queued) {
              if (queued.name === _name) return queued.promise;
              else if (queued.cancel) queued.cancel();
            }
            if (this.getAttribute('template') != _name) this.setAttribute('template', _name);
            queued = this._XTagRender = { name: _name };
            var ext = xtag.extensions.template.throttle;
            var throttle = (options.throttle ? ext[options.throttle] || ext.debounce : false);
            if (throttle) {
              return queued.promise = new Promise(resolve => {
                queued.resolve = resolve;
                throttle(this, template, queued, options);
              });
            }
            else {
              this._render(template, queued);
              return Promise.resolve(this);
            }
          }
        },
        onParse (klass, property, args, descriptor){
          klass.getOptions('templates')[property || 'default'] = descriptor.value;
          return false;
        },
        onReady (node, resolve, property, args){
          if (args[0]) {
            if (args[0] === 'ready') node.render(property);
            else node.rxn('firstpaint', () => node.render(property));
          }
          resolve();
        }
      }
    },
    create (name, klass){
      var c = klass || name;
      c.options = Object.assign({}, c.options);
      onParse(c); 
      if (klass && name) customElements.define(name, c);
      return c;
    },
    register (name, klass) {
      customElements.define(name, klass);
    },
    addEvents (node, events){
      let refs = {};
      for (let z in events) refs[z] = xtag.addEvent(node, z, events[z]);
      return refs;
    },
    addEvent (node, key, fn, options){
      var type;
      var stack = fn;
      var ref = options || {};
      ref.data = {};
      key.replace(regexParseExt, (match, name, dots, pseudo, args) => {
        if (name) type = name;
        else if (dots == ':'){
          var pseudo = xtag.pseudos[pseudo];
          var _args = args ? args.split(regexCommaArgs) : [];
          stack = pseudoWrap(pseudo, _args, stack, ref);
          if (pseudo.onParse) pseudo.onParse(node, type, _args, stack, ref);
        }
      });
      node.addEventListener(type, stack, ref);
      ref.type = type;
      ref.listener = stack;
      var event = xtag.events[type];
      if (event) {
        var listener = function(e){
          new Promise((resolve, reject) => {
            event.onFilter ? event.onFilter(this, e, ref, resolve, reject) : resolve();
          }).then(() => {
            xtag.fireEvent(e.target || this, type);
          });
        }
        ref.attached = event.attach.map(key => {
          return xtag.addEvent(node, key, listener, {capture: true});
        });
        if (event.onAdd) event.onAdd(node, ref);
      }
      return ref;
    },
    removeEvents (node, refs) {
      for (let z in refs) xtag.removeEvent(node, refs[z]);
    },
    removeEvent (node, ref){
      node.removeEventListener(ref.type, ref.listener, ref.capture);
      var event = xtag.events[ref.type];
      if (event && event.onRemove) event.onRemove(node, ref);
      if (ref.attached) ref.attached.forEach(attached => { xtag.removeEvent(node, ref) })
    },
    fireEvent (node, name, obj = {}){
      let options = Object.assign({
        bubbles: true,
        cancelable: true
      }, obj);
      node.dispatchEvent(new CustomEvent(name, options));
    }
  }

  var rxnID = 0;
  function processRxns(node, type){
    var rxn = node.rxns[type];
    var queue = rxn.queue;
    for (let z in queue) {
      queue[z].fn.call(node);
      if (rxn.singleton || !queue[z].recurring) delete queue[z];
    }
    rxn.fired = true;
  }

  function createClass(options = {}){
    var klass;
    klass = class extends (options.native ? Object.getPrototypeOf(document.createElement(options.native)).constructor : HTMLElement) {
      constructor () {
        super();
        if (!this.rxns) this.rxns = {
          ready: { queue: {}, singleton: true },
          firstpaint: { queue: {}, singleton: true },
          render: { queue: {} }
        };
        onConstruct(this);
        new Promise(resolve => onReady(this, resolve)).then(() => {
          processRxns(this, 'ready')
          if (this.readyCallback) this.readyCallback();
        });
      }

      connectedCallback () {
        onConnect(this);
        if (!this.rxns.firstpaint.frame) {
          this.rxns.firstpaint.frame = requestAnimationFrame(() => processRxns(this, 'firstpaint'));
        }
      }
      
      rxn (type, fn, recurring){
        var rxn = this.rxns[type];
        if (rxn.singleton && rxn.fired) fn.call(this);
        else {
          rxn.queue[rxnID++] = { fn: fn, recurring: recurring };
          return rxnID;
        }
      }
      
      cancelRxn (type, id){
        delete this.rxns[type].queue[id];
      }
    };

    klass.options = {
      extensions: {},
      pseudos: {}
    };
    
    klass.getOptions = function(name){
      return this.options[name] || (this.options[name] = Object.assign({}, Object.getPrototypeOf(this).options ? Object.getPrototypeOf(this).options[name] : {}));
    }

    klass.extensions = function extensions(...extensions){
      var exts = this.getOptions('extensions');
      return extensions.reduce((current, extension) => {
        var mixin;
        var extended = current;
        if (!exts[extension.name]) {
          if (typeof extension == 'string') {
            mixin = xtag.extensions[extension].mixin;
          }
          else {
            mixin = extension.mixin;
            exts[extension.name] = extension;
          }
          if (mixin) {
            extended = mixin(current);
            onParse(extended);
          }
        }
        return extended;
      }, this);
    }

    klass.as = function(tag){
      return createClass({
        native: tag
      });
    }

    return klass.extensions('attr', 'event', 'template');
  }

  XTagElement = createClass();

  function pseudoWrap(pseudo, args, fn, detail){
    return function(){
      var _pseudo = { fn: fn, args: args, detail: detail };
      var output = pseudo.onInvoke(this, _pseudo, ...arguments);
      if (output === null || output === false) return output;
      return _pseudo.fn.apply(this, output instanceof Array ? output : arguments);
    };
  }

  function onParse(target){
    var processedProps = {};
    var descriptors = getDescriptors(target);
    var extensions = target.getOptions('extensions');
    var processed = target._processedExtensions = new Map();   
    for (let z in descriptors) {
      let matches = [];
      let property;
      let extension;
      let extensionArgs = [];
      let descriptor = descriptors[z];
      let pseudos = target._pseudos || xtag.pseudos;    
      z.replace(regexParseExt, function(){ matches.unshift(arguments);  });
      matches.forEach(a => function(match, prop, dots, name, args){
        property = prop || property;
        if (args) var _args = args.split(regexCommaArgs);
        if (dots == '::') {
          extensionArgs = _args || [];
          extension = extensions[name] || xtag.extensions[name];
          if (!processed.get(extension)) processed.set(extension, []);
        }
        else if (!prop){
          let pseudo = pseudos[name];
          if (pseudo) {
            for (let y in descriptor) {
              let fn = descriptor[y];
              if (typeof fn == 'function' && pseudo.onInvoke) {
                fn = descriptor[y] = pseudoWrap(pseudo, _args, fn);
                if (pseudo.onParse) pseudo.onParse(target, property, _args, fn);
              }
            }
          }
        }
      }.apply(null, a));
      let attachProperty;
      if (extension) {
        processed.get(extension).push([property, extensionArgs, descriptor]);
        if (extension.onParse) attachProperty = extension.onParse(target, property, extensionArgs, descriptor, z);
      }
      if (!property) delete target.prototype[z];
      else if (attachProperty !== false) {
        let prop = processedProps[property] || (processedProps[property] = {});
        for (let y in descriptor) prop[y] = descriptor[y];
      }
    }
    for (let ext of processed.keys()) {
      if (ext.onCompiled) ext.onCompiled(target, processedProps);
    }
    Object.defineProperties(target.prototype, processedProps);
  }

  function onConstruct (target){
    var processed = target.constructor._processedExtensions;
    for (let [ext, items] of processed) {
      if (ext.onConstruct) items.forEach(item => ext.onConstruct(target, ...item))
    }
  }

  function onReady (target, resolve){
    var processed = target.constructor._processedExtensions;
    for (let [ext, items] of processed) {
      if (ext.onReady) Promise.all(items.map(item => {
        return new Promise(resolve => ext.onReady(target, resolve, ...item))
      })).then(resolve)
    }
  }

  function onConnect (target){
    var processed = target.constructor._processedExtensions;
    for (let [ext, items] of processed) {
      if (ext.onConnect) items.forEach(item => ext.onConnect(target, ...item))
    }
  }

  function getDescriptors(target){
    var descriptors = {};
    var proto = target.prototype;
    Object.getOwnPropertyNames(proto).forEach(key => {
      descriptors[key] = Object.getOwnPropertyDescriptor(proto, key);
    });
    return descriptors;
  }

  if (typeof define === 'function' && define.amd) {
    define(xtag);
    define(XTagElement);
  }
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = { xtag: xtag, XTagElement: XTagElement };
  }
  else {
    window.xtag = xtag;
    window.XTagElement = XTagElement;
  }

})();