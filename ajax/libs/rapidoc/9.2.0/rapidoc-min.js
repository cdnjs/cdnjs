/*! RapiDoc 9.2.0 | Author - Mrinmoy Majumdar | License information can be found in rapidoc-min.js.LICENSE.txt  */
(()=>{var e,t,r={448:(e,t,r)=>{"use strict";const n=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),a=new Map;class i{constructor(e,t){if(this._$cssResult$=!0,t!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=a.get(this.cssText);return n&&void 0===e&&(a.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const s=e=>new i("string"==typeof e?e:e+"",o),l=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,r,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[n+1]),e[0]);return new i(r,o)},c=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return s(t)})(e):e;var p;const u=window.trustedTypes,d=u?u.emptyScript:"",h=window.reactiveElementPolyfillSupport,f={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},m=(e,t)=>t!==e&&(t==t||e==e),y={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:m};class g extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;null!==(t=this.l)&&void 0!==t||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,r)=>{const n=this._$Eh(r,t);void 0!==n&&(this._$Eu.set(n,r),e.push(n))})),e}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r="symbol"==typeof e?Symbol():"__"+e,n=this.getPropertyDescriptor(e,r,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(n){const o=this[e];this[t]=n,this.requestUpdate(e,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||y}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of t)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(c(e))}else void 0!==e&&t.push(c(e));return t}static _$Eh(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,r;(null!==(t=this._$Eg)&&void 0!==t?t:this._$Eg=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(r=e.hostConnected)||void 0===r||r.call(e))}removeController(e){var t;null===(t=this._$Eg)||void 0===t||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{n?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const r=document.createElement("style"),n=window.litNonce;void 0!==n&&r.setAttribute("nonce",n),r.textContent=t.cssText,e.appendChild(r)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ES(e,t,r=y){var n,o;const a=this.constructor._$Eh(e,r);if(void 0!==a&&!0===r.reflect){const i=(null!==(o=null===(n=r.converter)||void 0===n?void 0:n.toAttribute)&&void 0!==o?o:f.toAttribute)(t,r.type);this._$Ei=e,null==i?this.removeAttribute(a):this.setAttribute(a,i),this._$Ei=null}}_$AK(e,t){var r,n,o;const a=this.constructor,i=a._$Eu.get(e);if(void 0!==i&&this._$Ei!==i){const e=a.getPropertyOptions(i),s=e.converter,l=null!==(o=null!==(n=null===(r=s)||void 0===r?void 0:r.fromAttribute)&&void 0!==n?n:"function"==typeof s?s:null)&&void 0!==o?o:f.fromAttribute;this._$Ei=i,this[i]=l(t,e.type),this._$Ei=null}}requestUpdate(e,t,r){let n=!0;void 0!==e&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||m)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===r.reflect&&this._$Ei!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,r))):n=!1),!this.isUpdatePending&&n&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((e,t)=>this[t]=e)),this._$Et=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(r)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;null===(t=this._$Eg)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$ES(t,this[t],e))),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}var v;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:g}),(null!==(p=globalThis.reactiveElementVersions)&&void 0!==p?p:globalThis.reactiveElementVersions=[]).push("1.3.0");const b=globalThis.trustedTypes,x=b?b.createPolicy("lit-html",{createHTML:e=>e}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,$="?"+w,k=`<${$}>`,S=document,A=(e="")=>S.createComment(e),E=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,T=e=>{var t;return O(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])},C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,j=/>/g,I=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,P=/'/g,R=/"/g,L=/^(?:script|style|textarea|title)$/i,D=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),F=D(1),B=(D(2),Symbol.for("lit-noChange")),N=Symbol.for("lit-nothing"),z=new WeakMap,U=S.createTreeWalker(S,129,null,!1),q=(e,t)=>{const r=e.length-1,n=[];let o,a=2===t?"<svg>":"",i=C;for(let t=0;t<r;t++){const r=e[t];let s,l,c=-1,p=0;for(;p<r.length&&(i.lastIndex=p,l=i.exec(r),null!==l);)p=i.lastIndex,i===C?"!--"===l[1]?i=_:void 0!==l[1]?i=j:void 0!==l[2]?(L.test(l[2])&&(o=RegExp("</"+l[2],"g")),i=I):void 0!==l[3]&&(i=I):i===I?">"===l[0]?(i=null!=o?o:C,c=-1):void 0===l[1]?c=-2:(c=i.lastIndex-l[2].length,s=l[1],i=void 0===l[3]?I:'"'===l[3]?R:P):i===R||i===P?i=I:i===_||i===j?i=C:(i=I,o=void 0);const u=i===I&&e[t+1].startsWith("/>")?" ":"";a+=i===C?r+k:c>=0?(n.push(s),r.slice(0,c)+"$lit$"+r.slice(c)+w+u):r+w+(-2===c?(n.push(void 0),t):u)}const s=a+(e[r]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==x?x.createHTML(s):s,n]};class M{constructor({strings:e,_$litType$:t},r){let n;this.parts=[];let o=0,a=0;const i=e.length-1,s=this.parts,[l,c]=q(e,t);if(this.el=M.createElement(l,r),U.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(n=U.nextNode())&&s.length<i;){if(1===n.nodeType){if(n.hasAttributes()){const e=[];for(const t of n.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(w)){const r=c[a++];if(e.push(t),void 0!==r){const e=n.getAttribute(r.toLowerCase()+"$lit$").split(w),t=/([.?@])?(.*)/.exec(r);s.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?K:"?"===t[1]?Y:"@"===t[1]?Z:G})}else s.push({type:6,index:o})}for(const t of e)n.removeAttribute(t)}if(L.test(n.tagName)){const e=n.textContent.split(w),t=e.length-1;if(t>0){n.textContent=b?b.emptyScript:"";for(let r=0;r<t;r++)n.append(e[r],A()),U.nextNode(),s.push({type:2,index:++o});n.append(e[t],A())}}}else if(8===n.nodeType)if(n.data===$)s.push({type:2,index:o});else{let e=-1;for(;-1!==(e=n.data.indexOf(w,e+1));)s.push({type:7,index:o}),e+=w.length-1}o++}}static createElement(e,t){const r=S.createElement("template");return r.innerHTML=e,r}}function H(e,t,r=e,n){var o,a,i,s;if(t===B)return t;let l=void 0!==n?null===(o=r._$Cl)||void 0===o?void 0:o[n]:r._$Cu;const c=E(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(a=null==l?void 0:l._$AO)||void 0===a||a.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,r,n)),void 0!==n?(null!==(i=(s=r)._$Cl)&&void 0!==i?i:s._$Cl=[])[n]=l:r._$Cu=l),void 0!==l&&(t=H(e,l._$AS(e,t.values),l,n)),t}class W{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:r},parts:n}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:S).importNode(r,!0);U.currentNode=o;let a=U.nextNode(),i=0,s=0,l=n[0];for(;void 0!==l;){if(i===l.index){let t;2===l.type?t=new V(a,a.nextSibling,this,e):1===l.type?t=new l.ctor(a,l.name,l.strings,this,e):6===l.type&&(t=new Q(a,this,e)),this.v.push(t),l=n[++s]}i!==(null==l?void 0:l.index)&&(a=U.nextNode(),i++)}return o}m(e){let t=0;for(const r of this.v)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class V{constructor(e,t,r,n){var o;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=n,this._$Cg=null===(o=null==n?void 0:n.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=H(this,e,t),E(e)?e===N||null==e||""===e?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==B&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.k(e):T(e)?this.S(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==N&&E(this._$AH)?this._$AA.nextSibling.data=e:this.k(S.createTextNode(e)),this._$AH=e}T(e){var t;const{values:r,_$litType$:n}=e,o="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=M.createElement(n.h,this.options)),n);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.m(r);else{const e=new W(o,this),t=e.p(this.options);e.m(r),this.k(t),this._$AH=e}}_$AC(e){let t=z.get(e.strings);return void 0===t&&z.set(e.strings,t=new M(e)),t}S(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,n=0;for(const o of e)n===t.length?t.push(r=new V(this.A(A()),this.A(A()),this,this.options)):r=t[n],r._$AI(o),n++;n<t.length&&(this._$AR(r&&r._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class G{constructor(e,t,r,n,o){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,n){const o=this.strings;let a=!1;if(void 0===o)e=H(this,e,t,0),a=!E(e)||e!==this._$AH&&e!==B,a&&(this._$AH=e);else{const n=e;let i,s;for(e=o[0],i=0;i<o.length-1;i++)s=H(this,n[r+i],t,i),s===B&&(s=this._$AH[i]),a||(a=!E(s)||s!==this._$AH[i]),s===N?e=N:e!==N&&(e+=(null!=s?s:"")+o[i+1]),this._$AH[i]=s}a&&!n&&this.C(e)}C(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class K extends G{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===N?void 0:e}}const J=b?b.emptyScript:"";class Y extends G{constructor(){super(...arguments),this.type=4}C(e){e&&e!==N?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class Z extends G{constructor(e,t,r,n,o){super(e,t,r,n,o),this.type=5}_$AI(e,t=this){var r;if((e=null!==(r=H(this,e,t,0))&&void 0!==r?r:N)===B)return;const n=this._$AH,o=e===N&&n!==N||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,a=e!==N&&(n===N||o);o&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==r?r:this.element,e):this._$AH.handleEvent(e)}}class Q{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){H(this,e)}}const X={P:"$lit$",L:w,V:$,I:1,N:q,R:W,D:T,j:H,H:V,O:G,F:Y,B:Z,W:K,Z:Q},ee=window.litHtmlPolyfillSupport;var te,re;null==ee||ee(M,V),(null!==(v=globalThis.litHtmlVersions)&&void 0!==v?v:globalThis.litHtmlVersions=[]).push("2.2.0");class ne extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=((e,t,r)=>{var n,o;const a=null!==(n=null==r?void 0:r.renderBefore)&&void 0!==n?n:t;let i=a._$litPart$;if(void 0===i){const e=null!==(o=null==r?void 0:r.renderBefore)&&void 0!==o?o:null;a._$litPart$=i=new V(t.insertBefore(A(),e),e,void 0,null!=r?r:{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return B}}ne.finalized=!0,ne._$litElement$=!0,null===(te=globalThis.litElementHydrateSupport)||void 0===te||te.call(globalThis,{LitElement:ne});const oe=globalThis.litElementPolyfillSupport;null==oe||oe({LitElement:ne});function ae(){return{baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}(null!==(re=globalThis.litElementVersions)&&void 0!==re?re:globalThis.litElementVersions=[]).push("3.2.0");let ie={baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1};const se=/[&<>"']/,le=/[&<>"']/g,ce=/[<>"']|&(?!#?\w+;)/,pe=/[<>"']|&(?!#?\w+;)/g,ue={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},de=e=>ue[e];function he(e,t){if(t){if(se.test(e))return e.replace(le,de)}else if(ce.test(e))return e.replace(pe,de);return e}const fe=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function me(e){return e.replace(fe,((e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const ye=/(^|[^\[])\^/g;function ge(e,t){e=e.source||e,t=t||"";const r={replace:(t,n)=>(n=(n=n.source||n).replace(ye,"$1"),e=e.replace(t,n),r),getRegex:()=>new RegExp(e,t)};return r}const ve=/[^\w:]/g,be=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function xe(e,t,r){if(e){let e;try{e=decodeURIComponent(me(r)).replace(ve,"").toLowerCase()}catch(e){return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!be.test(r)&&(r=function(e,t){we[" "+e]||($e.test(e)?we[" "+e]=e+"/":we[" "+e]=Te(e,"/",!0));const r=-1===(e=we[" "+e]).indexOf(":");return"//"===t.substring(0,2)?r?t:e.replace(ke,"$1")+t:"/"===t.charAt(0)?r?t:e.replace(Se,"$1")+t:e+t}(t,r));try{r=encodeURI(r).replace(/%25/g,"%")}catch(e){return null}return r}const we={},$e=/^[^:]+:\/*[^/]*$/,ke=/^([^:]+:)[\s\S]*$/,Se=/^([^:]+:\/*[^/]*)[\s\S]*$/;const Ae={exec:function(){}};function Ee(e){let t,r,n=1;for(;n<arguments.length;n++)for(r in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}function Oe(e,t){const r=e.replace(/\|/g,((e,t,r)=>{let n=!1,o=t;for(;--o>=0&&"\\"===r[o];)n=!n;return n?"|":" |"})).split(/ \|/);let n=0;if(r[0].trim()||r.shift(),r.length>0&&!r[r.length-1].trim()&&r.pop(),r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;n<r.length;n++)r[n]=r[n].trim().replace(/\\\|/g,"|");return r}function Te(e,t,r){const n=e.length;if(0===n)return"";let o=0;for(;o<n;){const a=e.charAt(n-o-1);if(a!==t||r){if(a===t||!r)break;o++}else o++}return e.substr(0,n-o)}function Ce(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function _e(e,t){if(t<1)return"";let r="";for(;t>1;)1&t&&(r+=e),t>>=1,e+=e;return r+e}function je(e,t,r,n){const o=t.href,a=t.title?he(t.title):null,i=e[1].replace(/\\([\[\]])/g,"$1");if("!"!==e[0].charAt(0)){n.state.inLink=!0;const e={type:"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i,[])};return n.state.inLink=!1,e}return{type:"image",raw:r,href:o,title:a,text:he(i)}}class Ie{constructor(e){this.options=e||ie}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const e=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:Te(e,"\n")}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const e=t[0],r=function(e,t){const r=e.match(/^(\s+)(?:```)/);if(null===r)return t;const n=r[1];return t.split("\n").map((e=>{const t=e.match(/^\s+/);if(null===t)return e;const[r]=t;return r.length>=n.length?e.slice(n.length):e})).join("\n")}(e,t[3]||"");return{type:"code",raw:e,lang:t[2]?t[2].trim():t[2],text:r}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(/#$/.test(e)){const t=Te(e,"#");this.options.pedantic?e=t.trim():t&&!/ $/.test(t)||(e=t.trim())}const r={type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:[]};return this.lexer.inline(r.text,r.tokens),r}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const e=t[0].replace(/^ *> ?/gm,"");return{type:"blockquote",raw:t[0],tokens:this.lexer.blockTokens(e,[]),text:e}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r,n,o,a,i,s,l,c,p,u,d,h,f=t[1].trim();const m=f.length>1,y={type:"list",raw:"",ordered:m,start:m?+f.slice(0,-1):"",loose:!1,items:[]};f=m?`\\d{1,9}\\${f.slice(-1)}`:`\\${f}`,this.options.pedantic&&(f=m?f:"[*+-]");const g=new RegExp(`^( {0,3}${f})((?: [^\\n]*)?(?:\\n|$))`);for(;e&&(h=!1,t=g.exec(e))&&!this.rules.block.hr.test(e);){if(r=t[0],e=e.substring(r.length),c=t[2].split("\n",1)[0],p=e.split("\n",1)[0],this.options.pedantic?(a=2,d=c.trimLeft()):(a=t[2].search(/[^ ]/),a=a>4?1:a,d=c.slice(a),a+=t[1].length),s=!1,!c&&/^ *$/.test(p)&&(r+=p+"\n",e=e.substring(p.length+1),h=!0),!h){const t=new RegExp(`^ {0,${Math.min(3,a-1)}}(?:[*+-]|\\d{1,9}[.)])`);for(;e&&(u=e.split("\n",1)[0],c=u,this.options.pedantic&&(c=c.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!t.test(c));){if(c.search(/[^ ]/)>=a||!c.trim())d+="\n"+c.slice(a);else{if(s)break;d+="\n"+c}s||c.trim()||(s=!0),r+=u+"\n",e=e.substring(u.length+1)}}y.loose||(l?y.loose=!0:/\n *\n *$/.test(r)&&(l=!0)),this.options.gfm&&(n=/^\[[ xX]\] /.exec(d),n&&(o="[ ] "!==n[0],d=d.replace(/^\[[ xX]\] +/,""))),y.items.push({type:"list_item",raw:r,task:!!n,checked:o,loose:!1,text:d}),y.raw+=r}y.items[y.items.length-1].raw=r.trimRight(),y.items[y.items.length-1].text=d.trimRight(),y.raw=y.raw.trimRight();const v=y.items.length;for(i=0;i<v;i++){this.lexer.state.top=!1,y.items[i].tokens=this.lexer.blockTokens(y.items[i].text,[]);const e=y.items[i].tokens.filter((e=>"space"===e.type)),t=e.every((e=>{const t=e.raw.split("");let r=0;for(const e of t)if("\n"===e&&(r+=1),r>1)return!0;return!1}));!y.loose&&e.length&&t&&(y.loose=!0,y.items[i].loose=!0)}return y}}html(e){const t=this.rules.block.html.exec(e);if(t){const e={type:"html",raw:t[0],pre:!this.options.sanitizer&&("pre"===t[1]||"script"===t[1]||"style"===t[1]),text:t[0]};return this.options.sanitize&&(e.type="paragraph",e.text=this.options.sanitizer?this.options.sanitizer(t[0]):he(t[0]),e.tokens=[],this.lexer.inline(e.text,e.tokens)),e}}def(e){const t=this.rules.block.def.exec(e);if(t){t[3]&&(t[3]=t[3].substring(1,t[3].length-1));return{type:"def",tag:t[1].toLowerCase().replace(/\s+/g," "),raw:t[0],href:t[2],title:t[3]}}}table(e){const t=this.rules.block.table.exec(e);if(t){const e={type:"table",header:Oe(t[1]).map((e=>({text:e}))),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split("\n"):[]};if(e.header.length===e.align.length){e.raw=t[0];let r,n,o,a,i=e.align.length;for(r=0;r<i;r++)/^ *-+: *$/.test(e.align[r])?e.align[r]="right":/^ *:-+: *$/.test(e.align[r])?e.align[r]="center":/^ *:-+ *$/.test(e.align[r])?e.align[r]="left":e.align[r]=null;for(i=e.rows.length,r=0;r<i;r++)e.rows[r]=Oe(e.rows[r],e.header.length).map((e=>({text:e})));for(i=e.header.length,n=0;n<i;n++)e.header[n].tokens=[],this.lexer.inlineTokens(e.header[n].text,e.header[n].tokens);for(i=e.rows.length,n=0;n<i;n++)for(a=e.rows[n],o=0;o<a.length;o++)a[o].tokens=[],this.lexer.inlineTokens(a[o].text,a[o].tokens);return e}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t){const e={type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:[]};return this.lexer.inline(e.text,e.tokens),e}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const e={type:"paragraph",raw:t[0],text:"\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1],tokens:[]};return this.lexer.inline(e.text,e.tokens),e}}text(e){const t=this.rules.block.text.exec(e);if(t){const e={type:"text",raw:t[0],text:t[0],tokens:[]};return this.lexer.inline(e.text,e.tokens),e}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:he(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):he(t[0]):t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const e=t[2].trim();if(!this.options.pedantic&&/^</.test(e)){if(!/>$/.test(e))return;const t=Te(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{const e=function(e,t){if(-1===e.indexOf(t[1]))return-1;const r=e.length;let n=0,o=0;for(;o<r;o++)if("\\"===e[o])o++;else if(e[o]===t[0])n++;else if(e[o]===t[1]&&(n--,n<0))return o;return-1}(t[2],"()");if(e>-1){const r=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let r=t[2],n="";if(this.options.pedantic){const e=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);e&&(r=e[1],n=e[3])}else n=t[3]?t[3].slice(1,-1):"";return r=r.trim(),/^</.test(r)&&(r=this.options.pedantic&&!/>$/.test(e)?r.slice(1):r.slice(1,-1)),je(t,{href:r?r.replace(this.rules.inline._escapes,"$1"):r,title:n?n.replace(this.rules.inline._escapes,"$1"):n},t[0],this.lexer)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let e=(r[2]||r[1]).replace(/\s+/g," ");if(e=t[e.toLowerCase()],!e||!e.href){const e=r[0].charAt(0);return{type:"text",raw:e,text:e}}return je(r,e,r[0],this.lexer)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrong.lDelim.exec(e);if(!n)return;if(n[3]&&r.match(/[\p{L}\p{N}]/u))return;const o=n[1]||n[2]||"";if(!o||o&&(""===r||this.rules.inline.punctuation.exec(r))){const r=n[0].length-1;let o,a,i=r,s=0;const l="*"===n[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+r);null!=(n=l.exec(t));){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=o.length,n[3]||n[4]){i+=a;continue}if((n[5]||n[6])&&r%3&&!((r+a)%3)){s+=a;continue}if(i-=a,i>0)continue;if(a=Math.min(a,a+i+s),Math.min(r,a)%2){const t=e.slice(1,r+n.index+a);return{type:"em",raw:e.slice(0,r+n.index+a+1),text:t,tokens:this.lexer.inlineTokens(t,[])}}const t=e.slice(2,r+n.index+a-1);return{type:"strong",raw:e.slice(0,r+n.index+a+1),text:t,tokens:this.lexer.inlineTokens(t,[])}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(/\n/g," ");const r=/[^ ]/.test(e),n=/^ /.test(e)&&/ $/.test(e);return r&&n&&(e=e.substring(1,e.length-1)),e=he(e,!0),{type:"codespan",raw:t[0],text:e}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2],[])}}autolink(e,t){const r=this.rules.inline.autolink.exec(e);if(r){let e,n;return"@"===r[2]?(e=he(this.options.mangle?t(r[1]):r[1]),n="mailto:"+e):(e=he(r[1]),n=e),{type:"link",raw:r[0],text:e,href:n,tokens:[{type:"text",raw:e,text:e}]}}}url(e,t){let r;if(r=this.rules.inline.url.exec(e)){let e,n;if("@"===r[2])e=he(this.options.mangle?t(r[0]):r[0]),n="mailto:"+e;else{let t;do{t=r[0],r[0]=this.rules.inline._backpedal.exec(r[0])[0]}while(t!==r[0]);e=he(r[0]),n="www."===r[1]?"http://"+e:e}return{type:"link",raw:r[0],text:e,href:n,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e,t){const r=this.rules.inline.text.exec(e);if(r){let e;return e=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(r[0]):he(r[0]):r[0]:he(this.options.smartypants?t(r[0]):r[0]),{type:"text",raw:r[0],text:e}}}}const Pe={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:Ae,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};Pe.def=ge(Pe.def).replace("label",Pe._label).replace("title",Pe._title).getRegex(),Pe.bullet=/(?:[*+-]|\d{1,9}[.)])/,Pe.listItemStart=ge(/^( *)(bull) */).replace("bull",Pe.bullet).getRegex(),Pe.list=ge(Pe.list).replace(/bull/g,Pe.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+Pe.def.source+")").getRegex(),Pe._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Pe._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,Pe.html=ge(Pe.html,"i").replace("comment",Pe._comment).replace("tag",Pe._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Pe.paragraph=ge(Pe._paragraph).replace("hr",Pe.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pe._tag).getRegex(),Pe.blockquote=ge(Pe.blockquote).replace("paragraph",Pe.paragraph).getRegex(),Pe.normal=Ee({},Pe),Pe.gfm=Ee({},Pe.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),Pe.gfm.table=ge(Pe.gfm.table).replace("hr",Pe.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pe._tag).getRegex(),Pe.gfm.paragraph=ge(Pe._paragraph).replace("hr",Pe.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",Pe.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pe._tag).getRegex(),Pe.pedantic=Ee({},Pe.normal,{html:ge("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",Pe._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ae,paragraph:ge(Pe.normal._paragraph).replace("hr",Pe.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",Pe.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const Re={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:Ae,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:Ae,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};function Le(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function De(e){let t,r,n="";const o=e.length;for(t=0;t<o;t++)r=e.charCodeAt(t),Math.random()>.5&&(r="x"+r.toString(16)),n+="&#"+r+";";return n}Re._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",Re.punctuation=ge(Re.punctuation).replace(/punctuation/g,Re._punctuation).getRegex(),Re.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,Re.escapedEmSt=/\\\*|\\_/g,Re._comment=ge(Pe._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),Re.emStrong.lDelim=ge(Re.emStrong.lDelim).replace(/punct/g,Re._punctuation).getRegex(),Re.emStrong.rDelimAst=ge(Re.emStrong.rDelimAst,"g").replace(/punct/g,Re._punctuation).getRegex(),Re.emStrong.rDelimUnd=ge(Re.emStrong.rDelimUnd,"g").replace(/punct/g,Re._punctuation).getRegex(),Re._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,Re._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,Re._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,Re.autolink=ge(Re.autolink).replace("scheme",Re._scheme).replace("email",Re._email).getRegex(),Re._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,Re.tag=ge(Re.tag).replace("comment",Re._comment).replace("attribute",Re._attribute).getRegex(),Re._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Re._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,Re._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,Re.link=ge(Re.link).replace("label",Re._label).replace("href",Re._href).replace("title",Re._title).getRegex(),Re.reflink=ge(Re.reflink).replace("label",Re._label).replace("ref",Pe._label).getRegex(),Re.nolink=ge(Re.nolink).replace("ref",Pe._label).getRegex(),Re.reflinkSearch=ge(Re.reflinkSearch,"g").replace("reflink",Re.reflink).replace("nolink",Re.nolink).getRegex(),Re.normal=Ee({},Re),Re.pedantic=Ee({},Re.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:ge(/^!?\[(label)\]\((.*?)\)/).replace("label",Re._label).getRegex(),reflink:ge(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Re._label).getRegex()}),Re.gfm=Ee({},Re.normal,{escape:ge(Re.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/}),Re.gfm.url=ge(Re.gfm.url,"i").replace("email",Re.gfm._extended_email).getRegex(),Re.breaks=Ee({},Re.gfm,{br:ge(Re.br).replace("{2,}","*").getRegex(),text:ge(Re.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});class Fe{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ie,this.options.tokenizer=this.options.tokenizer||new Ie,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:Pe.normal,inline:Re.normal};this.options.pedantic?(t.block=Pe.pedantic,t.inline=Re.pedantic):this.options.gfm&&(t.block=Pe.gfm,this.options.breaks?t.inline=Re.breaks:t.inline=Re.gfm),this.tokenizer.rules=t}static get rules(){return{block:Pe,inline:Re}}static lex(e,t){return new Fe(t).lex(e)}static lexInline(e,t){return new Fe(t).inlineTokens(e)}lex(e){let t;for(e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens}blockTokens(e,t=[]){let r,n,o,a;for(this.options.pedantic&&(e=e.replace(/^ +$/gm,""));e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some((n=>!!(r=n.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))))if(r=this.tokenizer.space(e))e=e.substring(r.raw.length),1===r.raw.length&&t.length>0?t[t.length-1].raw+="\n":t.push(r);else if(r=this.tokenizer.code(e))e=e.substring(r.raw.length),n=t[t.length-1],!n||"paragraph"!==n.type&&"text"!==n.type?t.push(r):(n.raw+="\n"+r.raw,n.text+="\n"+r.text,this.inlineQueue[this.inlineQueue.length-1].src=n.text);else if(r=this.tokenizer.fences(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.heading(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.hr(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.blockquote(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.list(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.html(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.def(e))e=e.substring(r.raw.length),n=t[t.length-1],!n||"paragraph"!==n.type&&"text"!==n.type?this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title}):(n.raw+="\n"+r.raw,n.text+="\n"+r.raw,this.inlineQueue[this.inlineQueue.length-1].src=n.text);else if(r=this.tokenizer.table(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.lheading(e))e=e.substring(r.raw.length),t.push(r);else{if(o=e,this.options.extensions&&this.options.extensions.startBlock){let t=1/0;const r=e.slice(1);let n;this.options.extensions.startBlock.forEach((function(e){n=e.call({lexer:this},r),"number"==typeof n&&n>=0&&(t=Math.min(t,n))})),t<1/0&&t>=0&&(o=e.substring(0,t+1))}if(this.state.top&&(r=this.tokenizer.paragraph(o)))n=t[t.length-1],a&&"paragraph"===n.type?(n.raw+="\n"+r.raw,n.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=n.text):t.push(r),a=o.length!==e.length,e=e.substring(r.raw.length);else if(r=this.tokenizer.text(e))e=e.substring(r.raw.length),n=t[t.length-1],n&&"text"===n.type?(n.raw+="\n"+r.raw,n.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=n.text):t.push(r);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t){this.inlineQueue.push({src:e,tokens:t})}inlineTokens(e,t=[]){let r,n,o,a,i,s,l=e;if(this.tokens.links){const e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(a=this.tokenizer.rules.inline.reflinkSearch.exec(l));)e.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(l=l.slice(0,a.index)+"["+_e("a",a[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(a=this.tokenizer.rules.inline.blockSkip.exec(l));)l=l.slice(0,a.index)+"["+_e("a",a[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(a=this.tokenizer.rules.inline.escapedEmSt.exec(l));)l=l.slice(0,a.index)+"++"+l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);for(;e;)if(i||(s=""),i=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some((n=>!!(r=n.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))))if(r=this.tokenizer.escape(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.tag(e))e=e.substring(r.raw.length),n=t[t.length-1],n&&"text"===r.type&&"text"===n.type?(n.raw+=r.raw,n.text+=r.text):t.push(r);else if(r=this.tokenizer.link(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(r.raw.length),n=t[t.length-1],n&&"text"===r.type&&"text"===n.type?(n.raw+=r.raw,n.text+=r.text):t.push(r);else if(r=this.tokenizer.emStrong(e,l,s))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.codespan(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.br(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.del(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.autolink(e,De))e=e.substring(r.raw.length),t.push(r);else if(this.state.inLink||!(r=this.tokenizer.url(e,De))){if(o=e,this.options.extensions&&this.options.extensions.startInline){let t=1/0;const r=e.slice(1);let n;this.options.extensions.startInline.forEach((function(e){n=e.call({lexer:this},r),"number"==typeof n&&n>=0&&(t=Math.min(t,n))})),t<1/0&&t>=0&&(o=e.substring(0,t+1))}if(r=this.tokenizer.inlineText(o,Le))e=e.substring(r.raw.length),"_"!==r.raw.slice(-1)&&(s=r.raw.slice(-1)),i=!0,n=t[t.length-1],n&&"text"===n.type?(n.raw+=r.raw,n.text+=r.text):t.push(r);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}else e=e.substring(r.raw.length),t.push(r);return t}}class Be{constructor(e){this.options=e||ie}code(e,t,r){const n=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,n);null!=t&&t!==e&&(r=!0,e=t)}return e=e.replace(/\n$/,"")+"\n",n?'<pre><code class="'+this.options.langPrefix+he(n,!0)+'">'+(r?e:he(e,!0))+"</code></pre>\n":"<pre><code>"+(r?e:he(e,!0))+"</code></pre>\n"}blockquote(e){return"<blockquote>\n"+e+"</blockquote>\n"}html(e){return e}heading(e,t,r,n){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+n.slug(r)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(e,t,r){const n=t?"ol":"ul";return"<"+n+(t&&1!==r?' start="'+r+'"':"")+">\n"+e+"</"+n+">\n"}listitem(e){return"<li>"+e+"</li>\n"}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return"<p>"+e+"</p>\n"}table(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return"<tr>\n"+e+"</tr>\n"}tablecell(e,t){const r=t.header?"th":"td";return(t.align?"<"+r+' align="'+t.align+'">':"<"+r+">")+e+"</"+r+">\n"}strong(e){return"<strong>"+e+"</strong>"}em(e){return"<em>"+e+"</em>"}codespan(e){return"<code>"+e+"</code>"}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return"<del>"+e+"</del>"}link(e,t,r){if(null===(e=xe(this.options.sanitize,this.options.baseUrl,e)))return r;let n='<a href="'+he(e)+'"';return t&&(n+=' title="'+t+'"'),n+=">"+r+"</a>",n}image(e,t,r){if(null===(e=xe(this.options.sanitize,this.options.baseUrl,e)))return r;let n='<img src="'+e+'" alt="'+r+'"';return t&&(n+=' title="'+t+'"'),n+=this.options.xhtml?"/>":">",n}text(e){return e}}class Ne{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,r){return""+r}image(e,t,r){return""+r}br(){return""}}class ze{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,t){let r=e,n=0;if(this.seen.hasOwnProperty(r)){n=this.seen[e];do{n++,r=e+"-"+n}while(this.seen.hasOwnProperty(r))}return t||(this.seen[e]=n,this.seen[r]=0),r}slug(e,t={}){const r=this.serialize(e);return this.getNextSafeSlug(r,t.dryrun)}}class Ue{constructor(e){this.options=e||ie,this.options.renderer=this.options.renderer||new Be,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new Ne,this.slugger=new ze}static parse(e,t){return new Ue(t).parse(e)}static parseInline(e,t){return new Ue(t).parseInline(e)}parse(e,t=!0){let r,n,o,a,i,s,l,c,p,u,d,h,f,m,y,g,v,b,x,w="";const $=e.length;for(r=0;r<$;r++)if(u=e[r],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[u.type]&&(x=this.options.extensions.renderers[u.type].call({parser:this},u),!1!==x||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(u.type)))w+=x||"";else switch(u.type){case"space":continue;case"hr":w+=this.renderer.hr();continue;case"heading":w+=this.renderer.heading(this.parseInline(u.tokens),u.depth,me(this.parseInline(u.tokens,this.textRenderer)),this.slugger);continue;case"code":w+=this.renderer.code(u.text,u.lang,u.escaped);continue;case"table":for(c="",l="",a=u.header.length,n=0;n<a;n++)l+=this.renderer.tablecell(this.parseInline(u.header[n].tokens),{header:!0,align:u.align[n]});for(c+=this.renderer.tablerow(l),p="",a=u.rows.length,n=0;n<a;n++){for(s=u.rows[n],l="",i=s.length,o=0;o<i;o++)l+=this.renderer.tablecell(this.parseInline(s[o].tokens),{header:!1,align:u.align[o]});p+=this.renderer.tablerow(l)}w+=this.renderer.table(c,p);continue;case"blockquote":p=this.parse(u.tokens),w+=this.renderer.blockquote(p);continue;case"list":for(d=u.ordered,h=u.start,f=u.loose,a=u.items.length,p="",n=0;n<a;n++)y=u.items[n],g=y.checked,v=y.task,m="",y.task&&(b=this.renderer.checkbox(g),f?y.tokens.length>0&&"paragraph"===y.tokens[0].type?(y.tokens[0].text=b+" "+y.tokens[0].text,y.tokens[0].tokens&&y.tokens[0].tokens.length>0&&"text"===y.tokens[0].tokens[0].type&&(y.tokens[0].tokens[0].text=b+" "+y.tokens[0].tokens[0].text)):y.tokens.unshift({type:"text",text:b}):m+=b),m+=this.parse(y.tokens,f),p+=this.renderer.listitem(m,v,g);w+=this.renderer.list(p,d,h);continue;case"html":w+=this.renderer.html(u.text);continue;case"paragraph":w+=this.renderer.paragraph(this.parseInline(u.tokens));continue;case"text":for(p=u.tokens?this.parseInline(u.tokens):u.text;r+1<$&&"text"===e[r+1].type;)u=e[++r],p+="\n"+(u.tokens?this.parseInline(u.tokens):u.text);w+=t?this.renderer.paragraph(p):p;continue;default:{const e='Token with "'+u.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw new Error(e)}}return w}parseInline(e,t){t=t||this.renderer;let r,n,o,a="";const i=e.length;for(r=0;r<i;r++)if(n=e[r],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[n.type]&&(o=this.options.extensions.renderers[n.type].call({parser:this},n),!1!==o||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(n.type)))a+=o||"";else switch(n.type){case"escape":a+=t.text(n.text);break;case"html":a+=t.html(n.text);break;case"link":a+=t.link(n.href,n.title,this.parseInline(n.tokens,t));break;case"image":a+=t.image(n.href,n.title,n.text);break;case"strong":a+=t.strong(this.parseInline(n.tokens,t));break;case"em":a+=t.em(this.parseInline(n.tokens,t));break;case"codespan":a+=t.codespan(n.text);break;case"br":a+=t.br();break;case"del":a+=t.del(this.parseInline(n.tokens,t));break;case"text":a+=t.text(n.text);break;default:{const e='Token with "'+n.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw new Error(e)}}return a}}function qe(e,t,r){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if("function"==typeof t&&(r=t,t=null),Ce(t=Ee({},qe.defaults,t||{})),r){const n=t.highlight;let o;try{o=Fe.lex(e,t)}catch(e){return r(e)}const a=function(e){let a;if(!e)try{t.walkTokens&&qe.walkTokens(o,t.walkTokens),a=Ue.parse(o,t)}catch(t){e=t}return t.highlight=n,e?r(e):r(null,a)};if(!n||n.length<3)return a();if(delete t.highlight,!o.length)return a();let i=0;return qe.walkTokens(o,(function(e){"code"===e.type&&(i++,setTimeout((()=>{n(e.text,e.lang,(function(t,r){if(t)return a(t);null!=r&&r!==e.text&&(e.text=r,e.escaped=!0),i--,0===i&&a()}))}),0))})),void(0===i&&a())}try{const r=Fe.lex(e,t);return t.walkTokens&&qe.walkTokens(r,t.walkTokens),Ue.parse(r,t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+he(e.message+"",!0)+"</pre>";throw e}}qe.options=qe.setOptions=function(e){var t;return Ee(qe.defaults,e),t=qe.defaults,ie=t,qe},qe.getDefaults=ae,qe.defaults=ie,qe.use=function(...e){const t=Ee({},...e),r=qe.defaults.extensions||{renderers:{},childTokens:{}};let n;e.forEach((e=>{if(e.extensions&&(n=!0,e.extensions.forEach((e=>{if(!e.name)throw new Error("extension name required");if(e.renderer){const t=r.renderers?r.renderers[e.name]:null;r.renderers[e.name]=t?function(...r){let n=e.renderer.apply(this,r);return!1===n&&(n=t.apply(this,r)),n}:e.renderer}if(e.tokenizer){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");r[e.level]?r[e.level].unshift(e.tokenizer):r[e.level]=[e.tokenizer],e.start&&("block"===e.level?r.startBlock?r.startBlock.push(e.start):r.startBlock=[e.start]:"inline"===e.level&&(r.startInline?r.startInline.push(e.start):r.startInline=[e.start]))}e.childTokens&&(r.childTokens[e.name]=e.childTokens)}))),e.renderer){const r=qe.defaults.renderer||new Be;for(const t in e.renderer){const n=r[t];r[t]=(...o)=>{let a=e.renderer[t].apply(r,o);return!1===a&&(a=n.apply(r,o)),a}}t.renderer=r}if(e.tokenizer){const r=qe.defaults.tokenizer||new Ie;for(const t in e.tokenizer){const n=r[t];r[t]=(...o)=>{let a=e.tokenizer[t].apply(r,o);return!1===a&&(a=n.apply(r,o)),a}}t.tokenizer=r}if(e.walkTokens){const r=qe.defaults.walkTokens;t.walkTokens=function(t){e.walkTokens.call(this,t),r&&r.call(this,t)}}n&&(t.extensions=r),qe.setOptions(t)}))},qe.walkTokens=function(e,t){for(const r of e)switch(t.call(qe,r),r.type){case"table":for(const e of r.header)qe.walkTokens(e.tokens,t);for(const e of r.rows)for(const r of e)qe.walkTokens(r.tokens,t);break;case"list":qe.walkTokens(r.items,t);break;default:qe.defaults.extensions&&qe.defaults.extensions.childTokens&&qe.defaults.extensions.childTokens[r.type]?qe.defaults.extensions.childTokens[r.type].forEach((function(e){qe.walkTokens(r[e],t)})):r.tokens&&qe.walkTokens(r.tokens,t)}},qe.parseInline=function(e,t){if(null==e)throw new Error("marked.parseInline(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");Ce(t=Ee({},qe.defaults,t||{}));try{const r=Fe.lexInline(e,t);return t.walkTokens&&qe.walkTokens(r,t.walkTokens),Ue.parseInline(r,t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+he(e.message+"",!0)+"</pre>";throw e}},qe.Parser=Ue,qe.parser=Ue.parse,qe.Renderer=Be,qe.TextRenderer=Ne,qe.Lexer=Fe,qe.lexer=Fe.lex,qe.Tokenizer=Ie,qe.Slugger=ze,qe.parse=qe;qe.options,qe.setOptions,qe.use,qe.walkTokens,qe.parseInline,Ue.parse,Fe.lex;var Me=r(660),He=r.n(Me);r(251),r(358),r(46),r(503),r(277),r(874),r(366),r(57),r(16);const We=l`
  .hover-bg:hover{
    background: var(--bg3);
  }
  ::selection {
    background: var(--selection-bg);
    color: var(--selection-fg);
  }
  .regular-font{ 
    font-family:var(--font-regular); 
  }
  .mono-font { 
    font-family:var(--font-mono); 
  }
  .title { 
    font-size: calc(var(--font-size-small) + 18px);
    font-weight: normal 
  }
  .sub-title{ font-size: 20px;}
  .req-res-title {
    font-family: var(--font-regular);
    font-size: calc(var(--font-size-small) + 4px);
    font-weight:bold;
    margin-bottom:8px;
    text-align:left;
  }
  .tiny-title { 
    font-size:calc(var(--font-size-small) + 1px); 
    font-weight:bold; 
  }
  .regular-font-size { font-size: var(--font-size-regular); }
  .small-font-size { font-size: var(--font-size-small); }
  .upper { text-transform: uppercase; }
  .primary-text{ color: var(--primary-color); }
  .bold-text { font-weight:bold; }
  .gray-text { color: var(--light-fg); }
  .red-text {color: var(--red)}
  .blue-text {color: var(--blue)}
  .multiline {
    overflow: scroll;
    max-height: var(--resp-area-height, 300px);
    color: var(--fg3);  
  }
  .method-fg.put { color: var(--orange); }
  .method-fg.post { color: var(--green); }
  .method-fg.get { color: var(--blue); }
  .method-fg.delete { color: var(--red); }
  .method-fg.options, 
  .method-fg.head, 
  .method-fg.patch { 
    color: var(--yellow); 
  }

  h1{ font-family:var(--font-regular); font-size:28px; padding-top: 10px; letter-spacing:normal; font-weight:normal; }
  h2{ font-family:var(--font-regular); font-size:24px; padding-top: 10px; letter-spacing:normal; font-weight:normal; }
  h3{ font-family:var(--font-regular); font-size:18px; padding-top: 10px; letter-spacing:normal; font-weight:normal; }
  h4{ font-family:var(--font-regular); font-size:16px; padding-top: 10px; letter-spacing:normal; font-weight:normal; }
  h5{ font-family:var(--font-regular); font-size:14px; padding-top: 10px; letter-spacing:normal; font-weight:normal; }
  h6{ font-family:var(--font-regular); font-size:14px; padding-top: 10px; letter-spacing:normal; font-weight:normal; }

  h1,h2,h3,h4,h5,h5{
    margin-block-end: 0.2em;
  }
  p { margin-block-start: 0.5em; }
  a { color: var(--blue); cursor:pointer; }
  a.inactive-link { 
    color:var(--fg);
    text-decoration: none;
    cursor:text;
  }
  
  code,
  pre {
    margin: 0px;
    font-family: var(--font-mono);
    font-size: calc(var(--font-size-mono) - 1px);
  }

  .m-markdown,
  .m-markdown-small {
    display:block;
  }

  .m-markdown p,
  .m-markdown span {
    font-size: var(--font-size-regular);
    line-height:calc(var(--font-size-regular) + 8px);
  }
  .m-markdown li {
    font-size: var(--font-size-regular);
    line-height:calc(var(--font-size-regular) + 10px);
  }
  
  .m-markdown-small p,
  .m-markdown-small span,
  .m-markdown-small li {
    font-size: var(--font-size-small);
    line-height: calc(var(--font-size-small) + 6px);
  }
  .m-markdown-small li {
    line-height: calc(var(--font-size-small) + 8px);
  }

  .m-markdown p:not(:first-child) {
    margin-block-start: 24px;
  }

  .m-markdown-small p:not(:first-child) {
    margin-block-start: 12px;
  }
  .m-markdown-small p:first-child {
    margin-block-start: 0;
  }

  .m-markdown p,
  .m-markdown-small p {
    margin-block-end: 0
  }

  .m-markdown code span {
    font-size:var(--font-size-mono);
  }

  .m-markdown-small code,
  .m-markdown code {
    padding: 1px 6px;
    border-radius: 2px;
    color: var(--inline-code-fg);
    background-color: var(--bg3);
    font-size: calc(var(--font-size-mono));
    line-height: 1.2;
  }

  .m-markdown-small code {
    font-size: calc(var(--font-size-mono) - 1px);
  }

  .m-markdown-small pre,
  .m-markdown pre {
    white-space: pre-wrap;
    overflow-x: auto;
    line-height: normal;
    border-radius: 2px;
    border: 1px solid var(--code-border-color);
  }

  .m-markdown pre {
    padding: 12px;
    background-color: var(--code-bg);
    color:var(--code-fg);
  }

  .m-markdown-small pre {
    margin-top: 4px;
    padding: 2px 4px;
    background-color: var(--bg3);
    color: var(--fg2);
  }

  .m-markdown-small pre code,
  .m-markdown pre code {
    border:none;
    padding:0;
  }

  .m-markdown pre code {
    color: var(--code-fg);
    background-color: var(--code-bg);
    background-color: transparent;
  }

  .m-markdown-small pre code {
    color: var(--fg2);
    background-color: var(--bg3);
  }

  .m-markdown ul,
  .m-markdown ol {
    padding-inline-start: 30px;
  }

  .m-markdown-small ul,
  .m-markdown-small ol {
    padding-inline-start: 20px;
  }

  .m-markdown-small a,
  .m-markdown a {
    color:var(--blue);
  }

  .m-markdown-small img,
  .m-markdown img { 
    max-width: 100%; 
  }

  /* Markdown table */

  .m-markdown-small table,
  .m-markdown table {
    border-spacing: 0;
    margin: 10px 0;
    border-collapse: separate;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: calc(var(--font-size-small) + 1px);
    line-height: calc(var(--font-size-small) + 4px);
    max-width: 100%;
  }

  .m-markdown-small table {
    font-size: var(--font-size-small);
    line-height: calc(var(--font-size-small) + 2px);
    margin: 8px 0;
  }

  .m-markdown-small td, 
  .m-markdown-small th,
  .m-markdown td, 
  .m-markdown th {
    vertical-align: top;
    border-top: 1px solid var(--border-color);
    line-height: calc(var(--font-size-small) + 4px);
  }

  .m-markdown-small tr:first-child th,
  .m-markdown tr:first-child th {
    border-top: 0 none;
  }

  .m-markdown th, 
  .m-markdown td { 
    padding: 10px 12px; 
  }

  .m-markdown-small th,
  .m-markdown-small td { 
    padding: 8px 8px; 
  }

  .m-markdown th,
  .m-markdown-small th {
    font-weight: 600;
    background-color: var(--bg2);
    vertical-align: middle;
  }

  .m-markdown-small table code {
    font-size: calc(var(--font-size-mono) - 2px);
  }

  .m-markdown table code {
    font-size: calc(var(--font-size-mono) - 1px);
  }

  .m-markdown blockquote,
  .m-markdown-small blockquote {
    margin-inline-start: 0;
    margin-inline-end: 0;
    border-left: 3px solid var(--border-color);
    padding: 6px 0 6px 6px;
  }
  .m-markdown hr{
    border: 1px solid var(--border-color);
  }
`,Ve=l`
/* Button */
.m-btn {
  border-radius: var(--border-radius);
  font-weight: 600;
  display: inline-block;
  padding: 6px 16px;
  font-size: var(--font-size-small);
  outline: 0;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  border: 2px solid var(--primary-color);
  background-color:transparent;
  transition: background-color 0.2s;
  user-select: none;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
.m-btn.primary {
  background-color: var(--primary-color);
  color: var(--primary-color-invert);
}
.m-btn.thin-border { border-width: 1px; }
.m-btn.large { padding:8px 14px; }
.m-btn.small { padding:5px 12px; }
.m-btn.tiny { padding:5px 6px; }
.m-btn.circle { border-radius: 50%; }
.m-btn:hover { 
  background-color: var(--primary-color);
  color: var(--primary-color-invert);
}
.m-btn.nav { border: 2px solid var(--nav-accent-color); }
.m-btn.nav:hover { 
  background-color: var(--nav-accent-color);
}
.m-btn:disabled{ 
  background-color: var(--bg3);
  color: var(--fg3);
  border-color: var(--fg3);
  cursor: not-allowed;
  opacity: 0.4;
}
.toolbar-btn{
  cursor: pointer;
  padding: 4px;
  margin:0 2px;
  font-size: var(--font-size-small);
  min-width: 50px;
  color: var(--primary-color-invert);
  border-radius: 2px;
  border: none;
  background-color: var(--primary-color);
}

input, textarea, select, button, pre {
  color:var(--fg);
  outline: none;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}
button {
  font-family: var(--font-regular);
}

/* Form Inputs */
pre,
select,
textarea,
input[type="file"],
input[type="text"],
input[type="password"] {
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: var(--font-size-small);
  transition: border .2s;
  padding: 6px 5px;
}

select {
  font-family: var(--font-regular);
  padding: 5px 30px 5px 5px;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%3E%3Cpath%20d%3D%22M10.3%203.3L6%207.6%201.7%203.3A1%201%200%2000.3%204.7l5%205a1%201%200%20001.4%200l5-5a1%201%200%2010-1.4-1.4z%22%20fill%3D%22%23777777%22%2F%3E%3C%2Fsvg%3E"); 
  background-position: calc(100% - 5px) center;
  background-repeat: no-repeat;  
  background-size: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}

select:hover {
  border-color: var(--primary-color);
}

textarea::placeholder,
input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: var(--placeholder-color);
  opacity:1;
}

select:focus,
textarea:focus,
input[type="text"]:focus,
input[type="password"]:focus,
textarea:active,
input[type="text"]:active,
input[type="password"]:active {
  border:1px solid var(--primary-color);
}

input[type="file"]{
  font-family: var(--font-regular);
  padding:2px;
  cursor:pointer;
  border: 1px solid var(--primary-color);
  min-height: calc(var(--font-size-small) + 18px);
}

input[type="file"]::-webkit-file-upload-button {
  font-family: var(--font-regular);
  font-size: var(--font-size-small);
  outline: none;
  cursor:pointer;
  padding: 3px 8px;
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  color: var(--primary-color-invert);
  border-radius: var(--border-radius);;
  -webkit-appearance: none;
}

pre,
textarea {
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) var(--input-bg);
}

pre::-webkit-scrollbar,
textarea::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

pre::-webkit-scrollbar-track,
textarea::-webkit-scrollbar-track {
  background:var(--input-bg);
}
 
pre::-webkit-scrollbar-thumb,
textarea::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: var(--border-color);
}

.link {
  font-size:var(--font-size-small);
  text-decoration: underline;
  color:var(--blue);
  font-family:var(--font-mono);
  margin-bottom:2px;
}

input[type="checkbox"]:focus{
  outline:0;
}

/* Toggle Body */
input[type="checkbox"] {
  appearance: none;
  display: inline-block;
  background-color: var(--light-bg);
  border: 1px solid var(--light-bg);
  border-radius: 9px;
  cursor: pointer;
  height: 18px;
  position: relative;
  transition: border .25s .15s, box-shadow .25s .3s, padding .25s;
  min-width: 36px;
  width: 36px;
  vertical-align: top;
}
/* Toggle Thumb */
input[type="checkbox"]:after {
  position: absolute;
  background-color: var(--bg);
  border: 1px solid var(--light-bg);
  border-radius: 8px;
  content: '';
  top: 0px;
  left: 0px;
  right: 16px;
  display: block;
  height: 16px;
  transition: border .25s .15s, left .25s .1s, right .15s .175s;
}

/* Toggle Body - Checked */
input[type="checkbox"]:checked {
  box-shadow: inset 0 0 0 13px var(--green);
  border-color: var(--green);
}
/* Toggle Thumb - Checked*/
input[type="checkbox"]:checked:after {
  border: 1px solid var(--green);
  left: 16px;
  right: 1px;
  transition: border .25s, left .15s .25s, right .25s .175s;
}
`,Ge=l`
.row, .col{
  display:flex;
} 
.row {
  align-items:center;
  flex-direction: row;
}
.col {
  align-items:stretch;
  flex-direction: column;
}
`,Ke=l`
.m-table {
  border-spacing: 0;  
  border-collapse: separate;
  border: 1px solid var(--light-border-color);
  border-radius: var(--border-radius);
  margin: 0;
  max-width: 100%;
  direction: ltr;
}
.m-table tr:first-child td,
.m-table tr:first-child th {
    border-top: 0 none;
}
.m-table td, 
.m-table th {
  font-size: var(--font-size-small);
  line-height: calc(var(--font-size-small) + 4px);
  padding: 4px 5px 4px;
  vertical-align: top;
}

.m-table.padded-12 td, 
.m-table.padded-12 th {
  padding: 12px;
}

.m-table td:not([align]), 
.m-table th:not([align]) {
  text-align: left;
}

.m-table th {
  color: var(--fg2);
  font-size: var(--font-size-small);
  line-height: calc(var(--font-size-small) + 18px);
  font-weight: 600;
  letter-spacing: normal;
  background-color: var(--bg2);
  vertical-align: bottom;
  border-bottom: 1px solid var(--light-border-color);
}

.m-table > tbody > tr > td,
.m-table > tr > td {
  border-top: 1px solid var(--light-border-color);
  text-overflow: ellipsis;
  overflow: hidden;
}
.table-title {
  font-size:var(--font-size-small);
  font-weight:bold;
  vertical-align: middle;
  margin: 12px 0 4px 0;
}
`,Je=l`
.only-large-screen { display:none; }
.endpoint-head .path{
  display: flex;
  font-family:var(--font-mono);
  font-size: var(--font-size-small);
  align-items: center;
  overflow-wrap: break-word;
  word-break: break-all;
}

.endpoint-head .descr {
  font-size: var(--font-size-small);
  color:var(--light-fg);
  font-weight:400;
  align-items: center;
  overflow-wrap: break-word;
  word-break: break-all;
  display:none;
}

.m-endpoint.expanded{margin-bottom:16px; }
.m-endpoint > .endpoint-head{
  border-width:1px 1px 1px 5px;
  border-style:solid;
  border-color:transparent;
  border-top-color:var(--light-border-color);
  display:flex;
  padding:6px 16px;
  align-items: center;
  cursor: pointer;
}
.m-endpoint > .endpoint-head.put:hover,
.m-endpoint > .endpoint-head.put.expanded{
  border-color:var(--orange); 
  background-color:var(--light-orange); 
}
.m-endpoint > .endpoint-head.post:hover,
.m-endpoint > .endpoint-head.post.expanded {
  border-color:var(--green); 
  background-color:var(--light-green); 
}
.m-endpoint > .endpoint-head.get:hover,
.m-endpoint > .endpoint-head.get.expanded {
  border-color:var(--blue); 
  background-color:var(--light-blue); 
}
.m-endpoint > .endpoint-head.delete:hover,
.m-endpoint > .endpoint-head.delete.expanded {
  border-color:var(--red); 
  background-color:var(--light-red); 
}

.m-endpoint > .endpoint-head.head:hover,
.m-endpoint > .endpoint-head.head.expanded,
.m-endpoint > .endpoint-head.patch:hover,
.m-endpoint > .endpoint-head.patch.expanded,
.m-endpoint > .endpoint-head.options:hover,
.m-endpoint > .endpoint-head.options.expanded {
  border-color:var(--yellow); 
  background-color:var(--light-yellow); 
}

.m-endpoint > .endpoint-head.deprecated:hover,
.m-endpoint > .endpoint-head.deprecated.expanded {
  border-color:var(--border-color); 
  filter:opacity(0.6);
}

.m-endpoint .endpoint-body {
  flex-wrap:wrap;
  padding:16px 0px 0 0px;
  border-width:0px 1px 1px 5px;
  border-style:solid;
  box-shadow: 0px 4px 3px -3px rgba(0, 0, 0, 0.15);
}
.m-endpoint .endpoint-body.delete{ border-color:var(--red); }
.m-endpoint .endpoint-body.put{ border-color:var(--orange); }
.m-endpoint .endpoint-body.post{border-color:var(--green);}
.m-endpoint .endpoint-body.get{ border-color:var(--blue); }
.m-endpoint .endpoint-body.head,
.m-endpoint .endpoint-body.patch,
.m-endpoint .endpoint-body.options { 
  border-color:var(--yellow); 
}

.m-endpoint .endpoint-body.deprecated{ 
  border-color:var(--border-color);
  filter:opacity(0.6);
}

.endpoint-head .deprecated{
  color: var(--light-fg);
  filter:opacity(0.6);
}

.summary{
  padding:8px 8px;
}
.summary .title{
  font-size:calc(var(--font-size-regular) + 2px);
  margin-bottom: 6px;
  word-break: break-all;
}

.method{
  padding:2px 5px;
  vertical-align: middle;
  font-size:var(--font-size-small);
  height: calc(var(--font-size-small) + 16px);
  line-height: calc(var(--font-size-small) + 8px);
  width: 60px;
  border-radius: 2px;
  display:inline-block;
  text-align: center;
  font-weight: bold;
  text-transform:uppercase;
  margin-right:5px;
}
.method.delete{ border: 2px solid var(--red);}
.method.put{ border: 2px solid var(--orange); }
.method.post{ border: 2px solid var(--green); }
.method.get{ border: 2px solid var(--blue); }
.method.get.deprecated{ border: 2px solid var(--border-color); }
.method.head,
.method.patch,
.method.options { 
  border: 2px solid var(--yellow); 
}

.req-resp-container{
  display: flex;
  margin-top:16px;
  align-items: stretch;
  flex-wrap: wrap;
  flex-direction: column;
  border-top:1px solid var(--light-border-color);
}

.view-mode-request,
api-response.view-mode {
  flex:1; 
  min-height:100px;
  padding:16px 8px;
  overflow:hidden;
}
.view-mode-request {
  border-width:0 0 1px 0;
  border-style:dashed;
}

.head .view-mode-request,
.patch .view-mode-request,
.options .view-mode-request { 
  border-color:var(--yellow); 
}
.put .view-mode-request { 
  border-color:var(--orange); 
}
.post .view-mode-request { 
  border-color:var(--green); 
}
.get .view-mode-request { 
  border-color:var(--blue); 
}
.delete .view-mode-request { 
  border-color:var(--red); 
}

@media only screen and (min-width: 1024px) {
  .only-large-screen { display:block; }
  .endpoint-head .path{
    font-size: var(--font-size-regular);
  }
  .endpoint-head .descr{
    display: flex;
  }
  .endpoint-head .m-markdown-small,
  .descr .m-markdown-small{
    display:block;
  }
  .req-resp-container{
    flex-direction: var(--layout, row);
    flex-wrap: nowrap;
  }
  api-response.view-mode {
    padding:16px;
  }
  .view-mode-request.row-layout {
    border-width:0 1px 0 0;
    padding:16px;
  }
  .summary{
    padding:8px 16px;
  }
}
`,Ye=l`
code[class*="language-"],
pre[class*="language-"] {
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 2;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  white-space: normal;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: var(--light-fg)
}

.token.punctuation {
  color: var(--fg);
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
  color:var(--pink);
}

.token.function-name {
  color: var(--blue);
}

.token.boolean,
.token.number,
.token.function {
  color: var(--red);
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
  color: var(--code-property-color);
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
  color: var(--code-keyword-color);
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable { 
  color: var(--green);
}

.token.operator,
.token.entity,
.token.url {
  color: var(--code-operator-color);
}

.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.inserted {
  color: green;
}
`,Ze=l`
.tab-panel {
  border: none;
}
.tab-buttons {
  height:30px;
  border-bottom: 1px solid var(--light-border-color) ;
  align-items: stretch;
  overflow-y: hidden;
  overflow-x: auto;
  scrollbar-width: thin;
}
.tab-buttons::-webkit-scrollbar {
  height: 1px;
  background-color: var(--border-color);
}
.tab-btn {
  border: none;
  border-bottom: 3px solid transparent; 
  color: var(--light-fg);
  background-color: transparent;
  white-space: nowrap;
  cursor:pointer;
  outline:none;
  font-family:var(--font-regular); 
  font-size:var(--font-size-small);
  margin-right:16px;
  padding:1px;
}
.tab-btn.active {
  border-bottom: 3px solid var(--primary-color); 
  font-weight:bold;
  color:var(--primary-color);
}

.tab-btn:hover {
  color:var(--primary-color);
}
.tab-content {
  margin:-1px 0 0 0;
  position:relative;
}
`,Qe=l`
.nav-bar {
  width:0;
  height:100%;
  overflow: hidden;
  color:var(--nav-text-color);
  background-color: var(--nav-bg-color);
  background-blend-mode: multiply;
  line-height: calc(var(--font-size-small) + 4px);
  display:none;
  position:relative;
  flex-direction:column;
  flex-wrap:nowrap;
  word-break:break-word;
}
::slotted([slot=nav-logo]){
  padding:16px 16px 0 16px;
}
.nav-scroll {
  overflow-x: hidden;
  overflow-y: auto;
  overflow-y: overlay;
  scrollbar-width: thin;
  scrollbar-color: var(--nav-hover-bg-color) transparent;
}

.nav-bar-tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.nav-bar.read .nav-bar-tag-icon {
  display:none;
}

.nav-bar-tag-icon {
  color: var(--nav-text-color);
  font-size: 20px; 
}
.nav-bar-tag-icon:hover {
  color:var(--nav-hover-text-color);
}
.nav-bar.focused .nav-bar-tag-and-paths.collapsed .nav-bar-paths-under-tag {
  display:none;
}
.nav-bar.focused .nav-bar-tag-and-paths.collapsed .nav-bar-tag-icon::after {
  content: '⌵';
  width:16px;
  height:16px;
  text-align: center;
  display: inline-block;
  transform: rotate(270deg);
}
.nav-bar.focused .nav-bar-tag-and-paths.expanded .nav-bar-tag-icon::after {
  content: '⌵';
  width:16px;
  height:16px;
  text-align: center;
  display: inline-block;
}
.nav-scroll::-webkit-scrollbar {
  width: var(--scroll-bar-width, 8px);
}
.nav-scroll::-webkit-scrollbar-track {
  background:transparent;
}
.nav-scroll::-webkit-scrollbar-thumb {
  background-color: var(--nav-hover-bg-color);
}

.nav-bar-tag {
  font-size: var(--font-size-regular);
  color: var(--nav-accent-color);
  border-left:4px solid transparent;
  font-weight:bold;
  padding: 15px 15px 15px 10px;
  text-transform: capitalize;
}

.nav-bar-components,
.nav-bar-h1,
.nav-bar-h2,
.nav-bar-info,
.nav-bar-tag,
.nav-bar-path {
  display:flex;
  cursor:pointer;
  border-left:4px solid transparent;
}

.nav-bar-h1,
.nav-bar-h2,
.nav-bar-path {
  font-size: calc(var(--font-size-small) + 1px);
  padding: var(--nav-item-padding);
}
.nav-bar-path.small-font {
  font-size: var(--font-size-small);
}

.nav-bar-info {
  font-size: var(--font-size-regular);
  padding: 16px 10px;
  font-weight:bold;
}
.nav-bar-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: var(--font-size-small);
  color: var(--nav-text-color);
  padding: var(--nav-item-padding);
  font-weight:bold;
}
.nav-bar-section.operations {
  cursor:pointer;
}
.nav-bar-section.operations:hover {
  color:var(--nav-hover-text-color);
  background-color:var(--nav-hover-bg-color);
}

.nav-bar-section:first-child {
  display: none;
}
.nav-bar-h2 {margin-left:12px;}

.nav-bar-h1.active,
.nav-bar-h2.active,
.nav-bar-info.active,
.nav-bar-tag.active,
.nav-bar-path.active,
.nav-bar-section.operations.active {
  border-left:4px solid var(--nav-accent-color);
  color:var(--nav-hover-text-color);
}

.nav-bar-h1:hover,
.nav-bar-h2:hover,
.nav-bar-info:hover,
.nav-bar-tag:hover,
.nav-bar-path:hover {
  color:var(--nav-hover-text-color);
  background-color:var(--nav-hover-bg-color);
}
`,Xe=l`
#api-info {
  font-size:calc(var(--font-size-regular) - 1px);margin-top:8px
  margin-left: -15px;
}

#api-info span:before {
  content: "|";
  display: inline-block;
  opacity: 0.5;
  width: 15px;
  text-align: center;
}
#api-info span:first-child:before {
  content: "";
  width: 0px;
}
`,et=l`

`;const tt=/[\s#:?&={}]/g,rt="_rapidoc_api_key";function nt(e){return new Promise((t=>setTimeout(t,e)))}function ot(e,t){const r=t.currentTarget,n=document.createElement("textarea");n.value=e,n.style.position="fixed",document.body.appendChild(n),n.focus(),n.select();try{document.execCommand("copy"),r.innerText="Copied",setTimeout((()=>{r.innerText="Copy"}),5e3)}catch(e){console.error("Unable to copy",e)}document.body.removeChild(n)}function at(e,t,r="includes"){if("includes"===r){return`${t.method} ${t.path} ${t.summary||t.description||""} ${t.operationId||""}`.toLowerCase().includes(e.toLowerCase())}return new RegExp(e,"i").test(`${t.method} ${t.path}`)}function it(e,t=new Set){return e?(Object.keys(e).forEach((r=>{var n;if(t.add(r),e[r].properties)it(e[r].properties,t);else if(null!==(n=e[r].items)&&void 0!==n&&n.properties){var o;it(null===(o=e[r].items)||void 0===o?void 0:o.properties,t)}})),t):t}function st(e,t){if(e){const r=document.createElement("a");document.body.appendChild(r),r.style="display: none",r.href=e,r.download=t,r.click(),r.remove()}}function lt(e){if(e){const t=document.createElement("a");document.body.appendChild(t),t.style="display: none",t.href=e,t.target="_blank",t.click(),t.remove()}}var ct=r(764).Buffer;function pt(e){if(e.__esModule)return e;var t=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(e).forEach((function(r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})})),t}var ut=function(e){return e&&e.Math==Math&&e},dt=ut("object"==typeof globalThis&&globalThis)||ut("object"==typeof window&&window)||ut("object"==typeof self&&self)||ut("object"==typeof dt&&dt)||function(){return this}()||Function("return this")(),ht=function(e){try{return!!e()}catch(e){return!0}},ft=!ht((function(){var e=function(){}.bind();return"function"!=typeof e||e.hasOwnProperty("prototype")})),mt=ft,yt=Function.prototype,gt=yt.apply,vt=yt.call,bt="object"==typeof Reflect&&Reflect.apply||(mt?vt.bind(gt):function(){return vt.apply(gt,arguments)}),xt=ft,wt=Function.prototype,$t=wt.bind,kt=wt.call,St=xt&&$t.bind(kt,kt),At=xt?function(e){return e&&St(e)}:function(e){return e&&function(){return kt.apply(e,arguments)}},Et=function(e){return"function"==typeof e},Ot={},Tt=!ht((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),Ct=ft,_t=Function.prototype.call,jt=Ct?_t.bind(_t):function(){return _t.apply(_t,arguments)},It={},Pt={}.propertyIsEnumerable,Rt=Object.getOwnPropertyDescriptor,Lt=Rt&&!Pt.call({1:2},1);It.f=Lt?function(e){var t=Rt(this,e);return!!t&&t.enumerable}:Pt;var Dt,Ft,Bt=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},Nt=At,zt=Nt({}.toString),Ut=Nt("".slice),qt=function(e){return Ut(zt(e),8,-1)},Mt=At,Ht=ht,Wt=qt,Vt=dt.Object,Gt=Mt("".split),Kt=Ht((function(){return!Vt("z").propertyIsEnumerable(0)}))?function(e){return"String"==Wt(e)?Gt(e,""):Vt(e)}:Vt,Jt=dt.TypeError,Yt=function(e){if(null==e)throw Jt("Can't call method on "+e);return e},Zt=Kt,Qt=Yt,Xt=function(e){return Zt(Qt(e))},er=Et,tr=function(e){return"object"==typeof e?null!==e:er(e)},rr={},nr=rr,or=dt,ar=Et,ir=function(e){return ar(e)?e:void 0},sr=function(e,t){return arguments.length<2?ir(nr[e])||ir(or[e]):nr[e]&&nr[e][t]||or[e]&&or[e][t]},lr=At({}.isPrototypeOf),cr=sr("navigator","userAgent")||"",pr=dt,ur=cr,dr=pr.process,hr=pr.Deno,fr=dr&&dr.versions||hr&&hr.version,mr=fr&&fr.v8;mr&&(Ft=(Dt=mr.split("."))[0]>0&&Dt[0]<4?1:+(Dt[0]+Dt[1])),!Ft&&ur&&(!(Dt=ur.match(/Edge\/(\d+)/))||Dt[1]>=74)&&(Dt=ur.match(/Chrome\/(\d+)/))&&(Ft=+Dt[1]);var yr=Ft,gr=yr,vr=ht,br=!!Object.getOwnPropertySymbols&&!vr((function(){var e=Symbol();return!String(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&gr&&gr<41})),xr=br&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,wr=sr,$r=Et,kr=lr,Sr=xr,Ar=dt.Object,Er=Sr?function(e){return"symbol"==typeof e}:function(e){var t=wr("Symbol");return $r(t)&&kr(t.prototype,Ar(e))},Or=dt.String,Tr=function(e){try{return Or(e)}catch(e){return"Object"}},Cr=Et,_r=Tr,jr=dt.TypeError,Ir=function(e){if(Cr(e))return e;throw jr(_r(e)+" is not a function")},Pr=Ir,Rr=function(e,t){var r=e[t];return null==r?void 0:Pr(r)},Lr=jt,Dr=Et,Fr=tr,Br=dt.TypeError,Nr={exports:{}},zr=dt,Ur=Object.defineProperty,qr=function(e,t){try{Ur(zr,e,{value:t,configurable:!0,writable:!0})}catch(r){zr[e]=t}return t},Mr="__core-js_shared__",Hr=dt[Mr]||qr(Mr,{}),Wr=Hr;(Nr.exports=function(e,t){return Wr[e]||(Wr[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.21.1",mode:"pure",copyright:"© 2014-2022 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE",source:"https://github.com/zloirock/core-js"});var Vr=Yt,Gr=dt.Object,Kr=function(e){return Gr(Vr(e))},Jr=Kr,Yr=At({}.hasOwnProperty),Zr=Object.hasOwn||function(e,t){return Yr(Jr(e),t)},Qr=At,Xr=0,en=Math.random(),tn=Qr(1..toString),rn=function(e){return"Symbol("+(void 0===e?"":e)+")_"+tn(++Xr+en,36)},nn=dt,on=Nr.exports,an=Zr,sn=rn,ln=br,cn=xr,pn=on("wks"),un=nn.Symbol,dn=un&&un.for,hn=cn?un:un&&un.withoutSetter||sn,fn=function(e){if(!an(pn,e)||!ln&&"string"!=typeof pn[e]){var t="Symbol."+e;ln&&an(un,e)?pn[e]=un[e]:pn[e]=cn&&dn?dn(t):hn(t)}return pn[e]},mn=jt,yn=tr,gn=Er,vn=Rr,bn=function(e,t){var r,n;if("string"===t&&Dr(r=e.toString)&&!Fr(n=Lr(r,e)))return n;if(Dr(r=e.valueOf)&&!Fr(n=Lr(r,e)))return n;if("string"!==t&&Dr(r=e.toString)&&!Fr(n=Lr(r,e)))return n;throw Br("Can't convert object to primitive value")},xn=fn,wn=dt.TypeError,$n=xn("toPrimitive"),kn=function(e,t){if(!yn(e)||gn(e))return e;var r,n=vn(e,$n);if(n){if(void 0===t&&(t="default"),r=mn(n,e,t),!yn(r)||gn(r))return r;throw wn("Can't convert object to primitive value")}return void 0===t&&(t="number"),bn(e,t)},Sn=Er,An=function(e){var t=kn(e,"string");return Sn(t)?t:t+""},En=tr,On=dt.document,Tn=En(On)&&En(On.createElement),Cn=function(e){return Tn?On.createElement(e):{}},_n=Cn,jn=!Tt&&!ht((function(){return 7!=Object.defineProperty(_n("div"),"a",{get:function(){return 7}}).a})),In=Tt,Pn=jt,Rn=It,Ln=Bt,Dn=Xt,Fn=An,Bn=Zr,Nn=jn,zn=Object.getOwnPropertyDescriptor;Ot.f=In?zn:function(e,t){if(e=Dn(e),t=Fn(t),Nn)try{return zn(e,t)}catch(e){}if(Bn(e,t))return Ln(!Pn(Rn.f,e,t),e[t])};var Un=ht,qn=Et,Mn=/#|\.prototype\./,Hn=function(e,t){var r=Vn[Wn(e)];return r==Kn||r!=Gn&&(qn(t)?Un(t):!!t)},Wn=Hn.normalize=function(e){return String(e).replace(Mn,".").toLowerCase()},Vn=Hn.data={},Gn=Hn.NATIVE="N",Kn=Hn.POLYFILL="P",Jn=Hn,Yn=Ir,Zn=ft,Qn=At(At.bind),Xn=function(e,t){return Yn(e),void 0===t?e:Zn?Qn(e,t):function(){return e.apply(t,arguments)}},eo={},to=Tt&&ht((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype})),ro=dt,no=tr,oo=ro.String,ao=ro.TypeError,io=function(e){if(no(e))return e;throw ao(oo(e)+" is not an object")},so=Tt,lo=jn,co=to,po=io,uo=An,ho=dt.TypeError,fo=Object.defineProperty,mo=Object.getOwnPropertyDescriptor,yo="enumerable",go="configurable",vo="writable";eo.f=so?co?function(e,t,r){if(po(e),t=uo(t),po(r),"function"==typeof e&&"prototype"===t&&"value"in r&&vo in r&&!r.writable){var n=mo(e,t);n&&n.writable&&(e[t]=r.value,r={configurable:go in r?r.configurable:n.configurable,enumerable:yo in r?r.enumerable:n.enumerable,writable:!1})}return fo(e,t,r)}:fo:function(e,t,r){if(po(e),t=uo(t),po(r),lo)try{return fo(e,t,r)}catch(e){}if("get"in r||"set"in r)throw ho("Accessors not supported");return"value"in r&&(e[t]=r.value),e};var bo=eo,xo=Bt,wo=Tt?function(e,t,r){return bo.f(e,t,xo(1,r))}:function(e,t,r){return e[t]=r,e},$o=dt,ko=bt,So=At,Ao=Et,Eo=Ot.f,Oo=Jn,To=rr,Co=Xn,_o=wo,jo=Zr,Io=function(e){var t=function(r,n,o){if(this instanceof t){switch(arguments.length){case 0:return new e;case 1:return new e(r);case 2:return new e(r,n)}return new e(r,n,o)}return ko(e,this,arguments)};return t.prototype=e.prototype,t},Po=function(e,t){var r,n,o,a,i,s,l,c,p=e.target,u=e.global,d=e.stat,h=e.proto,f=u?$o:d?$o[p]:($o[p]||{}).prototype,m=u?To:To[p]||_o(To,p,{})[p],y=m.prototype;for(o in t)r=!Oo(u?o:p+(d?".":"#")+o,e.forced)&&f&&jo(f,o),i=m[o],r&&(s=e.noTargetGet?(c=Eo(f,o))&&c.value:f[o]),a=r&&s?s:t[o],r&&typeof i==typeof a||(l=e.bind&&r?Co(a,$o):e.wrap&&r?Io(a):h&&Ao(a)?So(a):a,(e.sham||a&&a.sham||i&&i.sham)&&_o(l,"sham",!0),_o(m,o,l),h&&(jo(To,n=p+"Prototype")||_o(To,n,{}),_o(To[n],o,a),e.real&&y&&!y[o]&&_o(y,o,a)))},Ro=Math.ceil,Lo=Math.floor,Do=function(e){var t=+e;return t!=t||0===t?0:(t>0?Lo:Ro)(t)},Fo=Do,Bo=Math.max,No=Math.min,zo=function(e,t){var r=Fo(e);return r<0?Bo(r+t,0):No(r,t)},Uo=Do,qo=Math.min,Mo=function(e){return e>0?qo(Uo(e),9007199254740991):0},Ho=Mo,Wo=function(e){return Ho(e.length)},Vo=Xt,Go=zo,Ko=Wo,Jo=function(e){return function(t,r,n){var o,a=Vo(t),i=Ko(a),s=Go(n,i);if(e&&r!=r){for(;i>s;)if((o=a[s++])!=o)return!0}else for(;i>s;s++)if((e||s in a)&&a[s]===r)return e||s||0;return!e&&-1}},Yo={includes:Jo(!0),indexOf:Jo(!1)},Zo={},Qo=Zr,Xo=Xt,ea=Yo.indexOf,ta=Zo,ra=At([].push),na=function(e,t){var r,n=Xo(e),o=0,a=[];for(r in n)!Qo(ta,r)&&Qo(n,r)&&ra(a,r);for(;t.length>o;)Qo(n,r=t[o++])&&(~ea(a,r)||ra(a,r));return a},oa=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],aa=na,ia=oa,sa=Object.keys||function(e){return aa(e,ia)},la=Kr,ca=sa;Po({target:"Object",stat:!0,forced:ht((function(){ca(1)}))},{keys:function(e){return ca(la(e))}});var pa=rr.Object.keys,ua=pa,da=qt,ha=Array.isArray||function(e){return"Array"==da(e)},fa={};fa[fn("toStringTag")]="z";var ma="[object z]"===String(fa),ya=dt,ga=ma,va=Et,ba=qt,xa=fn("toStringTag"),wa=ya.Object,$a="Arguments"==ba(function(){return arguments}()),ka=ga?ba:function(e){var t,r,n;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=function(e,t){try{return e[t]}catch(e){}}(t=wa(e),xa))?r:$a?ba(t):"Object"==(n=ba(t))&&va(t.callee)?"Arguments":n},Sa=ka,Aa=dt.String,Ea=function(e){if("Symbol"===Sa(e))throw TypeError("Cannot convert a Symbol value to a string");return Aa(e)},Oa={},Ta=Tt,Ca=to,_a=eo,ja=io,Ia=Xt,Pa=sa;Oa.f=Ta&&!Ca?Object.defineProperties:function(e,t){ja(e);for(var r,n=Ia(t),o=Pa(t),a=o.length,i=0;a>i;)_a.f(e,r=o[i++],n[r]);return e};var Ra,La=sr("document","documentElement"),Da=Nr.exports,Fa=rn,Ba=Da("keys"),Na=function(e){return Ba[e]||(Ba[e]=Fa(e))},za=io,Ua=Oa,qa=oa,Ma=Zo,Ha=La,Wa=Cn,Va=Na("IE_PROTO"),Ga=function(){},Ka=function(e){return"<script>"+e+"</"+"script>"},Ja=function(e){e.write(Ka("")),e.close();var t=e.parentWindow.Object;return e=null,t},Ya=function(){try{Ra=new ActiveXObject("htmlfile")}catch(e){}var e,t;Ya="undefined"!=typeof document?document.domain&&Ra?Ja(Ra):((t=Wa("iframe")).style.display="none",Ha.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write(Ka("document.F=Object")),e.close(),e.F):Ja(Ra);for(var r=qa.length;r--;)delete Ya.prototype[qa[r]];return Ya()};Ma[Va]=!0;var Za=Object.create||function(e,t){var r;return null!==e?(Ga.prototype=za(e),r=new Ga,Ga.prototype=null,r[Va]=e):r=Ya(),void 0===t?r:Ua.f(r,t)},Qa={},Xa=na,ei=oa.concat("length","prototype");Qa.f=Object.getOwnPropertyNames||function(e){return Xa(e,ei)};var ti={},ri=An,ni=eo,oi=Bt,ai=function(e,t,r){var n=ri(t);n in e?ni.f(e,n,oi(0,r)):e[n]=r},ii=zo,si=Wo,li=ai,ci=dt.Array,pi=Math.max,ui=function(e,t,r){for(var n=si(e),o=ii(t,n),a=ii(void 0===r?n:r,n),i=ci(pi(a-o,0)),s=0;o<a;o++,s++)li(i,s,e[o]);return i.length=s,i},di=qt,hi=Xt,fi=Qa.f,mi=ui,yi="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];ti.f=function(e){return yi&&"Window"==di(e)?function(e){try{return fi(e)}catch(e){return mi(yi)}}(e):fi(hi(e))};var gi={};gi.f=Object.getOwnPropertySymbols;var vi=At([].slice),bi=wo,xi=function(e,t,r,n){n&&n.enumerable?e[t]=r:bi(e,t,r)},wi={},$i=fn;wi.f=$i;var ki=rr,Si=Zr,Ai=wi,Ei=eo.f,Oi=function(e){var t=ki.Symbol||(ki.Symbol={});Si(t,e)||Ei(t,e,{value:Ai.f(e)})},Ti=ka,Ci=ma?{}.toString:function(){return"[object "+Ti(this)+"]"},_i=ma,ji=eo.f,Ii=wo,Pi=Zr,Ri=Ci,Li=fn("toStringTag"),Di=function(e,t,r,n){if(e){var o=r?e:e.prototype;Pi(o,Li)||ji(o,Li,{configurable:!0,value:t}),n&&!_i&&Ii(o,"toString",Ri)}},Fi=Et,Bi=Hr,Ni=At(Function.toString);Fi(Bi.inspectSource)||(Bi.inspectSource=function(e){return Ni(e)});var zi,Ui,qi,Mi=Bi.inspectSource,Hi=Et,Wi=Mi,Vi=dt.WeakMap,Gi=Hi(Vi)&&/native code/.test(Wi(Vi)),Ki=Gi,Ji=dt,Yi=At,Zi=tr,Qi=wo,Xi=Zr,es=Hr,ts=Na,rs=Zo,ns="Object already initialized",os=Ji.TypeError,as=Ji.WeakMap;if(Ki||es.state){var is=es.state||(es.state=new as),ss=Yi(is.get),ls=Yi(is.has),cs=Yi(is.set);zi=function(e,t){if(ls(is,e))throw new os(ns);return t.facade=e,cs(is,e,t),t},Ui=function(e){return ss(is,e)||{}},qi=function(e){return ls(is,e)}}else{var ps=ts("state");rs[ps]=!0,zi=function(e,t){if(Xi(e,ps))throw new os(ns);return t.facade=e,Qi(e,ps,t),t},Ui=function(e){return Xi(e,ps)?e[ps]:{}},qi=function(e){return Xi(e,ps)}}var us={set:zi,get:Ui,has:qi,enforce:function(e){return qi(e)?Ui(e):zi(e,{})},getterFor:function(e){return function(t){var r;if(!Zi(t)||(r=Ui(t)).type!==e)throw os("Incompatible receiver, "+e+" required");return r}}},ds=At,hs=ht,fs=Et,ms=ka,ys=Mi,gs=function(){},vs=[],bs=sr("Reflect","construct"),xs=/^\s*(?:class|function)\b/,ws=ds(xs.exec),$s=!xs.exec(gs),ks=function(e){if(!fs(e))return!1;try{return bs(gs,vs,e),!0}catch(e){return!1}},Ss=function(e){if(!fs(e))return!1;switch(ms(e)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return $s||!!ws(xs,ys(e))}catch(e){return!0}};Ss.sham=!0;var As=!bs||hs((function(){var e;return ks(ks.call)||!ks(Object)||!ks((function(){e=!0}))||e}))?Ss:ks,Es=dt,Os=ha,Ts=As,Cs=tr,_s=fn("species"),js=Es.Array,Is=function(e){var t;return Os(e)&&(t=e.constructor,(Ts(t)&&(t===js||Os(t.prototype))||Cs(t)&&null===(t=t[_s]))&&(t=void 0)),void 0===t?js:t},Ps=function(e,t){return new(Is(e))(0===t?0:t)},Rs=Xn,Ls=Kt,Ds=Kr,Fs=Wo,Bs=Ps,Ns=At([].push),zs=function(e){var t=1==e,r=2==e,n=3==e,o=4==e,a=6==e,i=7==e,s=5==e||a;return function(l,c,p,u){for(var d,h,f=Ds(l),m=Ls(f),y=Rs(c,p),g=Fs(m),v=0,b=u||Bs,x=t?b(l,g):r||i?b(l,0):void 0;g>v;v++)if((s||v in m)&&(h=y(d=m[v],v,f),e))if(t)x[v]=h;else if(h)switch(e){case 3:return!0;case 5:return d;case 6:return v;case 2:Ns(x,d)}else switch(e){case 4:return!1;case 7:Ns(x,d)}return a?-1:n||o?o:x}},Us={forEach:zs(0),map:zs(1),filter:zs(2),some:zs(3),every:zs(4),find:zs(5),findIndex:zs(6),filterReject:zs(7)},qs=Po,Ms=dt,Hs=sr,Ws=bt,Vs=jt,Gs=At,Ks=Tt,Js=br,Ys=ht,Zs=Zr,Qs=ha,Xs=Et,el=tr,tl=lr,rl=Er,nl=io,ol=Kr,al=Xt,il=An,sl=Ea,ll=Bt,cl=Za,pl=sa,ul=Qa,dl=ti,hl=gi,fl=Ot,ml=eo,yl=Oa,gl=It,vl=vi,bl=xi,xl=Nr.exports,wl=Zo,$l=rn,kl=fn,Sl=wi,Al=Oi,El=Di,Ol=us,Tl=Us.forEach,Cl=Na("hidden"),_l="Symbol",jl=kl("toPrimitive"),Il=Ol.set,Pl=Ol.getterFor(_l),Rl=Object.prototype,Ll=Ms.Symbol,Dl=Ll&&Ll.prototype,Fl=Ms.TypeError,Bl=Ms.QObject,Nl=Hs("JSON","stringify"),zl=fl.f,Ul=ml.f,ql=dl.f,Ml=gl.f,Hl=Gs([].push),Wl=xl("symbols"),Vl=xl("op-symbols"),Gl=xl("string-to-symbol-registry"),Kl=xl("symbol-to-string-registry"),Jl=xl("wks"),Yl=!Bl||!Bl.prototype||!Bl.prototype.findChild,Zl=Ks&&Ys((function(){return 7!=cl(Ul({},"a",{get:function(){return Ul(this,"a",{value:7}).a}})).a}))?function(e,t,r){var n=zl(Rl,t);n&&delete Rl[t],Ul(e,t,r),n&&e!==Rl&&Ul(Rl,t,n)}:Ul,Ql=function(e,t){var r=Wl[e]=cl(Dl);return Il(r,{type:_l,tag:e,description:t}),Ks||(r.description=t),r},Xl=function(e,t,r){e===Rl&&Xl(Vl,t,r),nl(e);var n=il(t);return nl(r),Zs(Wl,n)?(r.enumerable?(Zs(e,Cl)&&e[Cl][n]&&(e[Cl][n]=!1),r=cl(r,{enumerable:ll(0,!1)})):(Zs(e,Cl)||Ul(e,Cl,ll(1,{})),e[Cl][n]=!0),Zl(e,n,r)):Ul(e,n,r)},ec=function(e,t){nl(e);var r=al(t),n=pl(r).concat(oc(r));return Tl(n,(function(t){Ks&&!Vs(tc,r,t)||Xl(e,t,r[t])})),e},tc=function(e){var t=il(e),r=Vs(Ml,this,t);return!(this===Rl&&Zs(Wl,t)&&!Zs(Vl,t))&&(!(r||!Zs(this,t)||!Zs(Wl,t)||Zs(this,Cl)&&this[Cl][t])||r)},rc=function(e,t){var r=al(e),n=il(t);if(r!==Rl||!Zs(Wl,n)||Zs(Vl,n)){var o=zl(r,n);return!o||!Zs(Wl,n)||Zs(r,Cl)&&r[Cl][n]||(o.enumerable=!0),o}},nc=function(e){var t=ql(al(e)),r=[];return Tl(t,(function(e){Zs(Wl,e)||Zs(wl,e)||Hl(r,e)})),r},oc=function(e){var t=e===Rl,r=ql(t?Vl:al(e)),n=[];return Tl(r,(function(e){!Zs(Wl,e)||t&&!Zs(Rl,e)||Hl(n,Wl[e])})),n};(Js||(bl(Dl=(Ll=function(){if(tl(Dl,this))throw Fl("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?sl(arguments[0]):void 0,t=$l(e),r=function(e){this===Rl&&Vs(r,Vl,e),Zs(this,Cl)&&Zs(this[Cl],t)&&(this[Cl][t]=!1),Zl(this,t,ll(1,e))};return Ks&&Yl&&Zl(Rl,t,{configurable:!0,set:r}),Ql(t,e)}).prototype,"toString",(function(){return Pl(this).tag})),bl(Ll,"withoutSetter",(function(e){return Ql($l(e),e)})),gl.f=tc,ml.f=Xl,yl.f=ec,fl.f=rc,ul.f=dl.f=nc,hl.f=oc,Sl.f=function(e){return Ql(kl(e),e)},Ks&&Ul(Dl,"description",{configurable:!0,get:function(){return Pl(this).description}})),qs({global:!0,wrap:!0,forced:!Js,sham:!Js},{Symbol:Ll}),Tl(pl(Jl),(function(e){Al(e)})),qs({target:_l,stat:!0,forced:!Js},{for:function(e){var t=sl(e);if(Zs(Gl,t))return Gl[t];var r=Ll(t);return Gl[t]=r,Kl[r]=t,r},keyFor:function(e){if(!rl(e))throw Fl(e+" is not a symbol");if(Zs(Kl,e))return Kl[e]},useSetter:function(){Yl=!0},useSimple:function(){Yl=!1}}),qs({target:"Object",stat:!0,forced:!Js,sham:!Ks},{create:function(e,t){return void 0===t?cl(e):ec(cl(e),t)},defineProperty:Xl,defineProperties:ec,getOwnPropertyDescriptor:rc}),qs({target:"Object",stat:!0,forced:!Js},{getOwnPropertyNames:nc,getOwnPropertySymbols:oc}),qs({target:"Object",stat:!0,forced:Ys((function(){hl.f(1)}))},{getOwnPropertySymbols:function(e){return hl.f(ol(e))}}),Nl)&&qs({target:"JSON",stat:!0,forced:!Js||Ys((function(){var e=Ll();return"[null]"!=Nl([e])||"{}"!=Nl({a:e})||"{}"!=Nl(Object(e))}))},{stringify:function(e,t,r){var n=vl(arguments),o=t;if((el(t)||void 0!==e)&&!rl(e))return Qs(t)||(t=function(e,t){if(Xs(o)&&(t=Vs(o,this,e,t)),!rl(t))return t}),n[1]=t,Ws(Nl,null,n)}});if(!Dl[jl]){var ac=Dl.valueOf;bl(Dl,jl,(function(e){return Vs(ac,this)}))}El(Ll,_l),wl[Cl]=!0;var ic=rr.Object.getOwnPropertySymbols,sc=ht,lc=yr,cc=fn("species"),pc=function(e){return lc>=51||!sc((function(){var t=[];return(t.constructor={})[cc]=function(){return{foo:1}},1!==t[e](Boolean).foo}))},uc=Us.filter;Po({target:"Array",proto:!0,forced:!pc("filter")},{filter:function(e){return uc(this,e,arguments.length>1?arguments[1]:void 0)}});var dc=rr,hc=function(e){return dc[e+"Prototype"]},fc=hc("Array").filter,mc=lr,yc=fc,gc=Array.prototype,vc=function(e){var t=e.filter;return e===gc||mc(gc,e)&&t===gc.filter?yc:t},bc=vc,xc={exports:{}},wc=Po,$c=ht,kc=Xt,Sc=Ot.f,Ac=Tt,Ec=$c((function(){Sc(1)}));wc({target:"Object",stat:!0,forced:!Ac||Ec,sham:!Ac},{getOwnPropertyDescriptor:function(e,t){return Sc(kc(e),t)}});var Oc=rr.Object,Tc=xc.exports=function(e,t){return Oc.getOwnPropertyDescriptor(e,t)};Oc.getOwnPropertyDescriptor.sham&&(Tc.sham=!0);var Cc,_c,jc,Ic=xc.exports,Pc={},Rc=Tt,Lc=Zr,Dc=Function.prototype,Fc=Rc&&Object.getOwnPropertyDescriptor,Bc=Lc(Dc,"name"),Nc={EXISTS:Bc,PROPER:Bc&&"something"===function(){}.name,CONFIGURABLE:Bc&&(!Rc||Rc&&Fc(Dc,"name").configurable)},zc=!ht((function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})),Uc=dt,qc=Zr,Mc=Et,Hc=Kr,Wc=zc,Vc=Na("IE_PROTO"),Gc=Uc.Object,Kc=Gc.prototype,Jc=Wc?Gc.getPrototypeOf:function(e){var t=Hc(e);if(qc(t,Vc))return t[Vc];var r=t.constructor;return Mc(r)&&t instanceof r?r.prototype:t instanceof Gc?Kc:null},Yc=ht,Zc=Et,Qc=Za,Xc=Jc,ep=xi,tp=fn("iterator"),rp=!1;[].keys&&("next"in(jc=[].keys())?(_c=Xc(Xc(jc)))!==Object.prototype&&(Cc=_c):rp=!0);var np=null==Cc||Yc((function(){var e={};return Cc[tp].call(e)!==e}));Zc((Cc=np?{}:Qc(Cc))[tp])||ep(Cc,tp,(function(){return this}));var op={IteratorPrototype:Cc,BUGGY_SAFARI_ITERATORS:rp},ap=op.IteratorPrototype,ip=Za,sp=Bt,lp=Di,cp=Pc,pp=function(){return this},up=function(e,t,r,n){var o=t+" Iterator";return e.prototype=ip(ap,{next:sp(+!n,r)}),lp(e,o,!1,!0),cp[o]=pp,e},dp=dt,hp=Et,fp=dp.String,mp=dp.TypeError,yp=At,gp=io,vp=function(e){if("object"==typeof e||hp(e))return e;throw mp("Can't set "+fp(e)+" as a prototype")},bp=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,r={};try{(e=yp(Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set))(r,[]),t=r instanceof Array}catch(e){}return function(r,n){return gp(r),vp(n),t?e(r,n):r.__proto__=n,r}}():void 0),xp=Po,wp=jt,$p=up,kp=Jc,Sp=Di,Ap=xi,Ep=Pc,Op=Nc.PROPER,Tp=op.BUGGY_SAFARI_ITERATORS,Cp=fn("iterator"),_p="keys",jp="values",Ip="entries",Pp=function(){return this},Rp=function(e,t,r,n,o,a,i){$p(r,t,n);var s,l,c,p=function(e){if(e===o&&m)return m;if(!Tp&&e in h)return h[e];switch(e){case _p:case jp:case Ip:return function(){return new r(this,e)}}return function(){return new r(this)}},u=t+" Iterator",d=!1,h=e.prototype,f=h[Cp]||h["@@iterator"]||o&&h[o],m=!Tp&&f||p(o),y="Array"==t&&h.entries||f;if(y&&(s=kp(y.call(new e)))!==Object.prototype&&s.next&&(Sp(s,u,!0,!0),Ep[u]=Pp),Op&&o==jp&&f&&f.name!==jp&&(d=!0,m=function(){return wp(f,this)}),o)if(l={values:p(jp),keys:a?m:p(_p),entries:p(Ip)},i)for(c in l)(Tp||d||!(c in h))&&Ap(h,c,l[c]);else xp({target:t,proto:!0,forced:Tp||d},l);return i&&h[Cp]!==m&&Ap(h,Cp,m,{name:o}),Ep[t]=m,l},Lp=Xt,Dp=Pc,Fp=us;eo.f;var Bp=Rp,Np="Array Iterator",zp=Fp.set,Up=Fp.getterFor(Np);Bp(Array,"Array",(function(e,t){zp(this,{type:Np,target:Lp(e),index:0,kind:t})}),(function(){var e=Up(this),t=e.target,r=e.kind,n=e.index++;return!t||n>=t.length?(e.target=void 0,{value:void 0,done:!0}):"keys"==r?{value:n,done:!1}:"values"==r?{value:t[n],done:!1}:{value:[n,t[n]],done:!1}}),"values"),Dp.Arguments=Dp.Array;var qp={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0},Mp=dt,Hp=ka,Wp=wo,Vp=Pc,Gp=fn("toStringTag");for(var Kp in qp){var Jp=Mp[Kp],Yp=Jp&&Jp.prototype;Yp&&Hp(Yp)!==Gp&&Wp(Yp,Gp,Kp),Vp[Kp]=Vp.Array}var Zp=ht,Qp=function(e,t){var r=[][e];return!!r&&Zp((function(){r.call(null,t||function(){return 1},1)}))},Xp=Us.forEach,eu=Qp("forEach")?[].forEach:function(e){return Xp(this,e,arguments.length>1?arguments[1]:void 0)};Po({target:"Array",proto:!0,forced:[].forEach!=eu},{forEach:eu});var tu=hc("Array").forEach,ru=ka,nu=Zr,ou=lr,au=tu,iu=Array.prototype,su={DOMTokenList:!0,NodeList:!0},lu=function(e){var t=e.forEach;return e===iu||ou(iu,e)&&t===iu.forEach||nu(su,ru(e))?au:t},cu=sr,pu=Qa,uu=gi,du=io,hu=At([].concat),fu=cu("Reflect","ownKeys")||function(e){var t=pu.f(du(e)),r=uu.f;return r?hu(t,r(e)):t},mu=fu,yu=Xt,gu=Ot,vu=ai;Po({target:"Object",stat:!0,sham:!Tt},{getOwnPropertyDescriptors:function(e){for(var t,r,n=yu(e),o=gu.f,a=mu(n),i={},s=0;a.length>s;)void 0!==(r=o(n,t=a[s++]))&&vu(i,t,r);return i}});var bu=rr.Object.getOwnPropertyDescriptors,xu={exports:{}},wu=Po,$u=Tt,ku=Oa.f;wu({target:"Object",stat:!0,forced:Object.defineProperties!==ku,sham:!$u},{defineProperties:ku});var Su=rr.Object,Au=xu.exports=function(e,t){return Su.defineProperties(e,t)};Su.defineProperties.sham&&(Au.sham=!0);var Eu=xu.exports,Ou={exports:{}},Tu=Po,Cu=Tt,_u=eo.f;Tu({target:"Object",stat:!0,forced:Object.defineProperty!==_u,sham:!Cu},{defineProperty:_u});var ju=rr.Object,Iu=Ou.exports=function(e,t,r){return ju.defineProperty(e,t,r)};ju.defineProperty.sham&&(Iu.sham=!0);var Pu=Ou.exports;function Ru(e,t,r){return t in e?Pu(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Lu(e,t){var r=ua(e);if(ic){var n=ic(e);t&&(n=bc(n).call(n,(function(t){return Ic(e,t).enumerable}))),r.push.apply(r,n)}return r}function Du(e){for(var t=1;t<arguments.length;t++){var r,n,o=null!=arguments[t]?arguments[t]:{};t%2?lu(r=Lu(Object(o),!0)).call(r,(function(t){Ru(e,t,o[t])})):bu?Eu(e,bu(o)):lu(n=Lu(Object(o))).call(n,(function(t){Pu(e,t,Ic(o,t))}))}return e}var Fu=Tt,Bu=At,Nu=jt,zu=ht,Uu=sa,qu=gi,Mu=It,Hu=Kr,Wu=Kt,Vu=Object.assign,Gu=Object.defineProperty,Ku=Bu([].concat),Ju=!Vu||zu((function(){if(Fu&&1!==Vu({b:1},Vu(Gu({},"a",{enumerable:!0,get:function(){Gu(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var e={},t={},r=Symbol(),n="abcdefghijklmnopqrst";return e[r]=7,n.split("").forEach((function(e){t[e]=e})),7!=Vu({},e)[r]||Uu(Vu({},t)).join("")!=n}))?function(e,t){for(var r=Hu(e),n=arguments.length,o=1,a=qu.f,i=Mu.f;n>o;)for(var s,l=Wu(arguments[o++]),c=a?Ku(Uu(l),a(l)):Uu(l),p=c.length,u=0;p>u;)s=c[u++],Fu&&!Nu(i,l,s)||(r[s]=l[s]);return r}:Vu;Po({target:"Object",stat:!0,forced:Object.assign!==Ju},{assign:Ju});var Yu=rr.Object.assign,Zu=tr,Qu=qt,Xu=fn("match"),ed=function(e){var t;return Zu(e)&&(void 0!==(t=e[Xu])?!!t:"RegExp"==Qu(e))},td=dt.TypeError,rd=function(e){if(ed(e))throw td("The method doesn't accept regular expressions");return e},nd=fn("match"),od=function(e){var t=/./;try{"/./"[e](t)}catch(r){try{return t[nd]=!1,"/./"[e](t)}catch(e){}}return!1},ad=Po,id=At,sd=Mo,ld=Ea,cd=rd,pd=Yt,ud=od,dd=id("".startsWith),hd=id("".slice),fd=Math.min;ad({target:"String",proto:!0,forced:!ud("startsWith")},{startsWith:function(e){var t=ld(pd(this));cd(e);var r=sd(fd(arguments.length>1?arguments[1]:void 0,t.length)),n=ld(e);return dd?dd(t,n,r):hd(t,r,r+n.length)===n}});var md=hc("String").startsWith,yd=lr,gd=md,vd=String.prototype,bd=function(e){var t=e.startsWith;return"string"==typeof e||e===vd||yd(vd,e)&&t===vd.startsWith?gd:t},xd={},wd={exports:{}};!function(e,t){!function(n){var o=t&&!t.nodeType&&t,a=e&&!e.nodeType&&e,i="object"==typeof r.g&&r.g;i.global!==i&&i.window!==i&&i.self!==i||(n=i);var s,l,c=2147483647,p=36,u=/^xn--/,d=/[^\x20-\x7E]/,h=/[\x2E\u3002\uFF0E\uFF61]/g,f={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},m=Math.floor,y=String.fromCharCode;function g(e){throw RangeError(f[e])}function v(e,t){for(var r=e.length,n=[];r--;)n[r]=t(e[r]);return n}function b(e,t){var r=e.split("@"),n="";return r.length>1&&(n=r[0]+"@",e=r[1]),n+v((e=e.replace(h,".")).split("."),t).join(".")}function x(e){for(var t,r,n=[],o=0,a=e.length;o<a;)(t=e.charCodeAt(o++))>=55296&&t<=56319&&o<a?56320==(64512&(r=e.charCodeAt(o++)))?n.push(((1023&t)<<10)+(1023&r)+65536):(n.push(t),o--):n.push(t);return n}function w(e){return v(e,(function(e){var t="";return e>65535&&(t+=y((e-=65536)>>>10&1023|55296),e=56320|1023&e),t+=y(e)})).join("")}function $(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function k(e,t,r){var n=0;for(e=r?m(e/700):e>>1,e+=m(e/t);e>455;n+=p)e=m(e/35);return m(n+36*e/(e+38))}function S(e){var t,r,n,o,a,i,s,l,u,d,h,f=[],y=e.length,v=0,b=128,x=72;for((r=e.lastIndexOf("-"))<0&&(r=0),n=0;n<r;++n)e.charCodeAt(n)>=128&&g("not-basic"),f.push(e.charCodeAt(n));for(o=r>0?r+1:0;o<y;){for(a=v,i=1,s=p;o>=y&&g("invalid-input"),((l=(h=e.charCodeAt(o++))-48<10?h-22:h-65<26?h-65:h-97<26?h-97:p)>=p||l>m((c-v)/i))&&g("overflow"),v+=l*i,!(l<(u=s<=x?1:s>=x+26?26:s-x));s+=p)i>m(c/(d=p-u))&&g("overflow"),i*=d;x=k(v-a,t=f.length+1,0==a),m(v/t)>c-b&&g("overflow"),b+=m(v/t),v%=t,f.splice(v++,0,b)}return w(f)}function A(e){var t,r,n,o,a,i,s,l,u,d,h,f,v,b,w,S=[];for(f=(e=x(e)).length,t=128,r=0,a=72,i=0;i<f;++i)(h=e[i])<128&&S.push(y(h));for(n=o=S.length,o&&S.push("-");n<f;){for(s=c,i=0;i<f;++i)(h=e[i])>=t&&h<s&&(s=h);for(s-t>m((c-r)/(v=n+1))&&g("overflow"),r+=(s-t)*v,t=s,i=0;i<f;++i)if((h=e[i])<t&&++r>c&&g("overflow"),h==t){for(l=r,u=p;!(l<(d=u<=a?1:u>=a+26?26:u-a));u+=p)w=l-d,b=p-d,S.push(y($(d+w%b,0))),l=m(w/b);S.push(y($(l,0))),a=k(r,v,n==o),r=0,++n}++r,++t}return S.join("")}if(s={version:"1.3.2",ucs2:{decode:x,encode:w},decode:S,encode:A,toASCII:function(e){return b(e,(function(e){return d.test(e)?"xn--"+A(e):e}))},toUnicode:function(e){return b(e,(function(e){return u.test(e)?S(e.slice(4).toLowerCase()):e}))}},o&&a)if(e.exports==o)a.exports=s;else for(l in s)s.hasOwnProperty(l)&&(o[l]=s[l]);else n.punycode=s}(this)}(wd,wd.exports);var $d={};function kd(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var Sd=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};$d.decode=$d.parse=function(e,t,r,n){t=t||"&",r=r||"=";var o={};if("string"!=typeof e||0===e.length)return o;var a=/\+/g;e=e.split(t);var i=1e3;n&&"number"==typeof n.maxKeys&&(i=n.maxKeys);var s=e.length;i>0&&s>i&&(s=i);for(var l=0;l<s;++l){var c,p,u,d,h=e[l].replace(a,"%20"),f=h.indexOf(r);f>=0?(c=h.substr(0,f),p=h.substr(f+1)):(c=h,p=""),u=decodeURIComponent(c),d=decodeURIComponent(p),kd(o,u)?Array.isArray(o[u])?o[u].push(d):o[u]=[o[u],d]:o[u]=d}return o},$d.encode=$d.stringify=function(e,t,r,n){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map((function(n){var o=encodeURIComponent(Sd(n))+r;return Array.isArray(e[n])?e[n].map((function(e){return o+encodeURIComponent(Sd(e))})).join(t):o+encodeURIComponent(Sd(e[n]))})).join(t):n?encodeURIComponent(Sd(n))+r+encodeURIComponent(Sd(e)):""};var Ad=wd.exports,Ed={isString:function(e){return"string"==typeof e},isObject:function(e){return"object"==typeof e&&null!==e},isNull:function(e){return null===e},isNullOrUndefined:function(e){return null==e}};function Od(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}xd.parse=Ud,xd.resolve=function(e,t){return Ud(e,!1,!0).resolve(t)},xd.resolveObject=function(e,t){return e?Ud(e,!1,!0).resolveObject(t):t},xd.format=function(e){Ed.isString(e)&&(e=Ud(e));return e instanceof Od?e.format():Od.prototype.format.call(e)},xd.Url=Od;var Td=/^([a-z0-9.+-]+:)/i,Cd=/:[0-9]*$/,_d=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,jd=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),Id=["'"].concat(jd),Pd=["%","/","?",";","#"].concat(Id),Rd=["/","?","#"],Ld=/^[+a-z0-9A-Z_-]{0,63}$/,Dd=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Fd={javascript:!0,"javascript:":!0},Bd={javascript:!0,"javascript:":!0},Nd={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},zd=$d;function Ud(e,t,r){if(e&&Ed.isObject(e)&&e instanceof Od)return e;var n=new Od;return n.parse(e,t,r),n}Od.prototype.parse=function(e,t,r){if(!Ed.isString(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var n=e.indexOf("?"),o=-1!==n&&n<e.indexOf("#")?"?":"#",a=e.split(o);a[0]=a[0].replace(/\\/g,"/");var i=e=a.join(o);if(i=i.trim(),!r&&1===e.split("#").length){var s=_d.exec(i);if(s)return this.path=i,this.href=i,this.pathname=s[1],s[2]?(this.search=s[2],this.query=t?zd.parse(this.search.substr(1)):this.search.substr(1)):t&&(this.search="",this.query={}),this}var l=Td.exec(i);if(l){var c=(l=l[0]).toLowerCase();this.protocol=c,i=i.substr(l.length)}if(r||l||i.match(/^\/\/[^@\/]+@[^@\/]+/)){var p="//"===i.substr(0,2);!p||l&&Bd[l]||(i=i.substr(2),this.slashes=!0)}if(!Bd[l]&&(p||l&&!Nd[l])){for(var u,d,h=-1,f=0;f<Rd.length;f++){-1!==(m=i.indexOf(Rd[f]))&&(-1===h||m<h)&&(h=m)}-1!==(d=-1===h?i.lastIndexOf("@"):i.lastIndexOf("@",h))&&(u=i.slice(0,d),i=i.slice(d+1),this.auth=decodeURIComponent(u)),h=-1;for(f=0;f<Pd.length;f++){var m;-1!==(m=i.indexOf(Pd[f]))&&(-1===h||m<h)&&(h=m)}-1===h&&(h=i.length),this.host=i.slice(0,h),i=i.slice(h),this.parseHost(),this.hostname=this.hostname||"";var y="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!y)for(var g=this.hostname.split(/\./),v=(f=0,g.length);f<v;f++){var b=g[f];if(b&&!b.match(Ld)){for(var x="",w=0,$=b.length;w<$;w++)b.charCodeAt(w)>127?x+="x":x+=b[w];if(!x.match(Ld)){var k=g.slice(0,f),S=g.slice(f+1),A=b.match(Dd);A&&(k.push(A[1]),S.unshift(A[2])),S.length&&(i="/"+S.join(".")+i),this.hostname=k.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),y||(this.hostname=Ad.toASCII(this.hostname));var E=this.port?":"+this.port:"",O=this.hostname||"";this.host=O+E,this.href+=this.host,y&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==i[0]&&(i="/"+i))}if(!Fd[c])for(f=0,v=Id.length;f<v;f++){var T=Id[f];if(-1!==i.indexOf(T)){var C=encodeURIComponent(T);C===T&&(C=escape(T)),i=i.split(T).join(C)}}var _=i.indexOf("#");-1!==_&&(this.hash=i.substr(_),i=i.slice(0,_));var j=i.indexOf("?");if(-1!==j?(this.search=i.substr(j),this.query=i.substr(j+1),t&&(this.query=zd.parse(this.query)),i=i.slice(0,j)):t&&(this.search="",this.query={}),i&&(this.pathname=i),Nd[c]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){E=this.pathname||"";var I=this.search||"";this.path=E+I}return this.href=this.format(),this},Od.prototype.format=function(){var e=this.auth||"";e&&(e=(e=encodeURIComponent(e)).replace(/%3A/i,":"),e+="@");var t=this.protocol||"",r=this.pathname||"",n=this.hash||"",o=!1,a="";this.host?o=e+this.host:this.hostname&&(o=e+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(o+=":"+this.port)),this.query&&Ed.isObject(this.query)&&Object.keys(this.query).length&&(a=zd.stringify(this.query));var i=this.search||a&&"?"+a||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||Nd[t])&&!1!==o?(o="//"+(o||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):o||(o=""),n&&"#"!==n.charAt(0)&&(n="#"+n),i&&"?"!==i.charAt(0)&&(i="?"+i),t+o+(r=r.replace(/[?#]/g,(function(e){return encodeURIComponent(e)})))+(i=i.replace("#","%23"))+n},Od.prototype.resolve=function(e){return this.resolveObject(Ud(e,!1,!0)).format()},Od.prototype.resolveObject=function(e){if(Ed.isString(e)){var t=new Od;t.parse(e,!1,!0),e=t}for(var r=new Od,n=Object.keys(this),o=0;o<n.length;o++){var a=n[o];r[a]=this[a]}if(r.hash=e.hash,""===e.href)return r.href=r.format(),r;if(e.slashes&&!e.protocol){for(var i=Object.keys(e),s=0;s<i.length;s++){var l=i[s];"protocol"!==l&&(r[l]=e[l])}return Nd[r.protocol]&&r.hostname&&!r.pathname&&(r.path=r.pathname="/"),r.href=r.format(),r}if(e.protocol&&e.protocol!==r.protocol){if(!Nd[e.protocol]){for(var c=Object.keys(e),p=0;p<c.length;p++){var u=c[p];r[u]=e[u]}return r.href=r.format(),r}if(r.protocol=e.protocol,e.host||Bd[e.protocol])r.pathname=e.pathname;else{for(var d=(e.pathname||"").split("/");d.length&&!(e.host=d.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==d[0]&&d.unshift(""),d.length<2&&d.unshift(""),r.pathname=d.join("/")}if(r.search=e.search,r.query=e.query,r.host=e.host||"",r.auth=e.auth,r.hostname=e.hostname||e.host,r.port=e.port,r.pathname||r.search){var h=r.pathname||"",f=r.search||"";r.path=h+f}return r.slashes=r.slashes||e.slashes,r.href=r.format(),r}var m=r.pathname&&"/"===r.pathname.charAt(0),y=e.host||e.pathname&&"/"===e.pathname.charAt(0),g=y||m||r.host&&e.pathname,v=g,b=r.pathname&&r.pathname.split("/")||[],x=(d=e.pathname&&e.pathname.split("/")||[],r.protocol&&!Nd[r.protocol]);if(x&&(r.hostname="",r.port=null,r.host&&(""===b[0]?b[0]=r.host:b.unshift(r.host)),r.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===d[0]?d[0]=e.host:d.unshift(e.host)),e.host=null),g=g&&(""===d[0]||""===b[0])),y)r.host=e.host||""===e.host?e.host:r.host,r.hostname=e.hostname||""===e.hostname?e.hostname:r.hostname,r.search=e.search,r.query=e.query,b=d;else if(d.length)b||(b=[]),b.pop(),b=b.concat(d),r.search=e.search,r.query=e.query;else if(!Ed.isNullOrUndefined(e.search)){if(x)r.hostname=r.host=b.shift(),(A=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@"))&&(r.auth=A.shift(),r.host=r.hostname=A.shift());return r.search=e.search,r.query=e.query,Ed.isNull(r.pathname)&&Ed.isNull(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r}if(!b.length)return r.pathname=null,r.search?r.path="/"+r.search:r.path=null,r.href=r.format(),r;for(var w=b.slice(-1)[0],$=(r.host||e.host||b.length>1)&&("."===w||".."===w)||""===w,k=0,S=b.length;S>=0;S--)"."===(w=b[S])?b.splice(S,1):".."===w?(b.splice(S,1),k++):k&&(b.splice(S,1),k--);if(!g&&!v)for(;k--;k)b.unshift("..");!g||""===b[0]||b[0]&&"/"===b[0].charAt(0)||b.unshift(""),$&&"/"!==b.join("/").substr(-1)&&b.push("");var A,E=""===b[0]||b[0]&&"/"===b[0].charAt(0);x&&(r.hostname=r.host=E?"":b.length?b.shift():"",(A=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@"))&&(r.auth=A.shift(),r.host=r.hostname=A.shift()));return(g=g||r.host&&b.length)&&!E&&b.unshift(""),b.length?r.pathname=b.join("/"):(r.pathname=null,r.path=null),Ed.isNull(r.pathname)&&Ed.isNull(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=e.auth||r.auth,r.slashes=r.slashes||e.slashes,r.href=r.format(),r},Od.prototype.parseHost=function(){var e=this.host,t=Cd.exec(e);t&&(":"!==(t=t[0])&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)};var qd=Po,Md=dt,Hd=ht,Wd=ha,Vd=tr,Gd=Kr,Kd=Wo,Jd=ai,Yd=Ps,Zd=pc,Qd=yr,Xd=fn("isConcatSpreadable"),eh=9007199254740991,th="Maximum allowed index exceeded",rh=Md.TypeError,nh=Qd>=51||!Hd((function(){var e=[];return e[Xd]=!1,e.concat()[0]!==e})),oh=Zd("concat"),ah=function(e){if(!Vd(e))return!1;var t=e[Xd];return void 0!==t?!!t:Wd(e)};qd({target:"Array",proto:!0,forced:!nh||!oh},{concat:function(e){var t,r,n,o,a,i=Gd(this),s=Yd(i,0),l=0;for(t=-1,n=arguments.length;t<n;t++)if(ah(a=-1===t?i:arguments[t])){if(l+(o=Kd(a))>eh)throw rh(th);for(r=0;r<o;r++,l++)r in a&&Jd(s,l,a[r])}else{if(l>=eh)throw rh(th);Jd(s,l++,a)}return s.length=l,s}}),Oi("asyncIterator"),Oi("hasInstance"),Oi("isConcatSpreadable"),Oi("iterator"),Oi("match"),Oi("matchAll"),Oi("replace"),Oi("search"),Oi("species"),Oi("split"),Oi("toPrimitive"),Oi("toStringTag"),Oi("unscopables"),Di(dt.JSON,"JSON",!0);var ih=rr.Symbol;Oi("asyncDispose"),Oi("dispose"),Oi("matcher"),Oi("metadata"),Oi("observable"),Oi("patternMatch"),Oi("replaceAll");var sh=ih,lh=At,ch=Do,ph=Ea,uh=Yt,dh=lh("".charAt),hh=lh("".charCodeAt),fh=lh("".slice),mh=function(e){return function(t,r){var n,o,a=ph(uh(t)),i=ch(r),s=a.length;return i<0||i>=s?e?"":void 0:(n=hh(a,i))<55296||n>56319||i+1===s||(o=hh(a,i+1))<56320||o>57343?e?dh(a,i):n:e?fh(a,i,i+2):o-56320+(n-55296<<10)+65536}},yh={codeAt:mh(!1),charAt:mh(!0)}.charAt,gh=Ea,vh=us,bh=Rp,xh="String Iterator",wh=vh.set,$h=vh.getterFor(xh);bh(String,"String",(function(e){wh(this,{type:xh,string:gh(e),index:0})}),(function(){var e,t=$h(this),r=t.string,n=t.index;return n>=r.length?{value:void 0,done:!0}:(e=yh(r,n),t.index+=e.length,{value:e,done:!1})}));var kh=ka,Sh=Rr,Ah=Pc,Eh=fn("iterator"),Oh=function(e){if(null!=e)return Sh(e,Eh)||Sh(e,"@@iterator")||Ah[kh(e)]},Th=Oh;Po({target:"Array",stat:!0},{isArray:ha});var Ch=rr.Array.isArray,_h=Po,jh=dt,Ih=ha,Ph=As,Rh=tr,Lh=zo,Dh=Wo,Fh=Xt,Bh=ai,Nh=fn,zh=vi,Uh=pc("slice"),qh=Nh("species"),Mh=jh.Array,Hh=Math.max;_h({target:"Array",proto:!0,forced:!Uh},{slice:function(e,t){var r,n,o,a=Fh(this),i=Dh(a),s=Lh(e,i),l=Lh(void 0===t?i:t,i);if(Ih(a)&&(r=a.constructor,(Ph(r)&&(r===Mh||Ih(r.prototype))||Rh(r)&&null===(r=r[qh]))&&(r=void 0),r===Mh||void 0===r))return zh(a,s,l);for(n=new(void 0===r?Mh:r)(Hh(l-s,0)),o=0;s<l;s++,o++)s in a&&Bh(n,o,a[s]);return n.length=o,n}});var Wh=hc("Array").slice,Vh=lr,Gh=Wh,Kh=Array.prototype,Jh=function(e){var t=e.slice;return e===Kh||Vh(Kh,e)&&t===Kh.slice?Gh:t},Yh=Jh,Zh=jt,Qh=io,Xh=Rr,ef=function(e,t,r){var n,o;Qh(e);try{if(!(n=Xh(e,"return"))){if("throw"===t)throw r;return r}n=Zh(n,e)}catch(e){o=!0,n=e}if("throw"===t)throw r;if(o)throw n;return Qh(n),r},tf=io,rf=ef,nf=Pc,of=fn("iterator"),af=Array.prototype,sf=function(e){return void 0!==e&&(nf.Array===e||af[of]===e)},lf=jt,cf=Ir,pf=io,uf=Tr,df=Oh,hf=dt.TypeError,ff=function(e,t){var r=arguments.length<2?df(e):t;if(cf(r))return pf(lf(r,e));throw hf(uf(e)+" is not iterable")},mf=Xn,yf=jt,gf=Kr,vf=function(e,t,r,n){try{return n?t(tf(r)[0],r[1]):t(r)}catch(t){rf(e,"throw",t)}},bf=sf,xf=As,wf=Wo,$f=ai,kf=ff,Sf=Oh,Af=dt.Array,Ef=fn("iterator"),Of=!1;try{var Tf=0,Cf={next:function(){return{done:!!Tf++}},return:function(){Of=!0}};Cf[Ef]=function(){return this},Array.from(Cf,(function(){throw 2}))}catch(e){}var _f=function(e,t){if(!t&&!Of)return!1;var r=!1;try{var n={};n[Ef]=function(){return{next:function(){return{done:r=!0}}}},e(n)}catch(e){}return r},jf=function(e){var t=gf(e),r=xf(this),n=arguments.length,o=n>1?arguments[1]:void 0,a=void 0!==o;a&&(o=mf(o,n>2?arguments[2]:void 0));var i,s,l,c,p,u,d=Sf(t),h=0;if(!d||this==Af&&bf(d))for(i=wf(t),s=r?new this(i):Af(i);i>h;h++)u=a?o(t[h],h):t[h],$f(s,h,u);else for(p=(c=kf(t,d)).next,s=r?new this:[];!(l=yf(p,c)).done;h++)u=a?vf(c,o,[l.value,h],!0):l.value,$f(s,h,u);return s.length=h,s};Po({target:"Array",stat:!0,forced:!_f((function(e){Array.from(e)}))},{from:jf});var If=rr.Array.from,Pf=If;function Rf(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Lf(e,t){var r;if(e){if("string"==typeof e)return Rf(e,t);var n=Yh(r=Object.prototype.toString.call(e)).call(r,8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Pf(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Rf(e,t):void 0}}function Df(e,t){var r=void 0!==sh&&Th(e)||e["@@iterator"];if(!r){if(Ch(e)||(r=Lf(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){s=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(s)throw a}}}}var Ff=wi.f("iterator");function Bf(e){return(Bf="function"==typeof sh&&"symbol"==typeof Ff?function(e){return typeof e}:function(e){return e&&"function"==typeof sh&&e.constructor===sh&&e!==sh.prototype?"symbol":typeof e})(e)}function Nf(e,t){return function(e){if(Ch(e))return e}(e)||function(e,t){var r=null==e?null:void 0!==sh&&Th(e)||e["@@iterator"];if(null!=r){var n,o,a=[],i=!0,s=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{i||null==r.return||r.return()}finally{if(s)throw o}}return a}}(e,t)||Lf(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var zf=Zr,Uf=fu,qf=Ot,Mf=eo,Hf=At("".replace),Wf=String(Error("zxcasd").stack),Vf=/\n\s*at [^:]*:[^\n]*/,Gf=Vf.test(Wf),Kf=tr,Jf=wo,Yf=Xn,Zf=jt,Qf=io,Xf=Tr,em=sf,tm=Wo,rm=lr,nm=ff,om=Oh,am=ef,im=dt.TypeError,sm=function(e,t){this.stopped=e,this.result=t},lm=sm.prototype,cm=function(e,t,r){var n,o,a,i,s,l,c,p=r&&r.that,u=!(!r||!r.AS_ENTRIES),d=!(!r||!r.IS_ITERATOR),h=!(!r||!r.INTERRUPTED),f=Yf(t,p),m=function(e){return n&&am(n,"normal",e),new sm(!0,e)},y=function(e){return u?(Qf(e),h?f(e[0],e[1],m):f(e[0],e[1])):h?f(e,m):f(e)};if(d)n=e;else{if(!(o=om(e)))throw im(Xf(e)+" is not iterable");if(em(o)){for(a=0,i=tm(e);i>a;a++)if((s=y(e[a]))&&rm(lm,s))return s;return new sm(!1)}n=nm(e,o)}for(l=n.next;!(c=Zf(l,n)).done;){try{s=y(c.value)}catch(e){am(n,"throw",e)}if("object"==typeof s&&s&&rm(lm,s))return s}return new sm(!1)},pm=Ea,um=Bt,dm=!ht((function(){var e=Error("a");return!("stack"in e)||(Object.defineProperty(e,"stack",um(1,7)),7!==e.stack)})),hm=Po,fm=dt,mm=lr,ym=Jc,gm=bp,vm=function(e,t,r){for(var n=Uf(t),o=Mf.f,a=qf.f,i=0;i<n.length;i++){var s=n[i];zf(e,s)||r&&zf(r,s)||o(e,s,a(t,s))}},bm=Za,xm=wo,wm=Bt,$m=function(e,t){if(Gf&&"string"==typeof e)for(;t--;)e=Hf(e,Vf,"");return e},km=function(e,t){Kf(t)&&"cause"in t&&Jf(e,"cause",t.cause)},Sm=cm,Am=function(e,t){return void 0===e?arguments.length<2?"":t:pm(e)},Em=dm,Om=fn("toStringTag"),Tm=fm.Error,Cm=[].push,_m=function(e,t){var r,n=arguments.length>2?arguments[2]:void 0,o=mm(jm,this);gm?r=gm(new Tm,o?ym(this):jm):(r=o?this:bm(jm),xm(r,Om,"Error")),void 0!==t&&xm(r,"message",Am(t)),Em&&xm(r,"stack",$m(r.stack,1)),km(r,n);var a=[];return Sm(e,Cm,{that:a}),xm(r,"errors",a),r};gm?gm(_m,Tm):vm(_m,Tm,{name:!0});var jm=_m.prototype=bm(Tm.prototype,{constructor:wm(1,_m),message:wm(1,""),name:wm(1,"AggregateError")});hm({global:!0},{AggregateError:_m});var Im,Pm,Rm,Lm,Dm=dt.Promise,Fm=xi,Bm=function(e,t,r){for(var n in t)r&&r.unsafe&&e[n]?e[n]=t[n]:Fm(e,n,t[n],r);return e},Nm=sr,zm=eo,Um=Tt,qm=fn("species"),Mm=lr,Hm=dt.TypeError,Wm=function(e,t){if(Mm(t,e))return e;throw Hm("Incorrect invocation")},Vm=As,Gm=Tr,Km=dt.TypeError,Jm=io,Ym=function(e){if(Vm(e))return e;throw Km(Gm(e)+" is not a constructor")},Zm=fn("species"),Qm=function(e,t){var r,n=Jm(e).constructor;return void 0===n||null==(r=Jm(n)[Zm])?t:Ym(r)},Xm=dt.TypeError,ey=function(e,t){if(e<t)throw Xm("Not enough arguments");return e},ty=/(?:ipad|iphone|ipod).*applewebkit/i.test(cr),ry="process"==qt(dt.process),ny=dt,oy=bt,ay=Xn,iy=Et,sy=Zr,ly=ht,cy=La,py=vi,uy=Cn,dy=ey,hy=ty,fy=ry,my=ny.setImmediate,yy=ny.clearImmediate,gy=ny.process,vy=ny.Dispatch,by=ny.Function,xy=ny.MessageChannel,wy=ny.String,$y=0,ky={},Sy="onreadystatechange";try{Im=ny.location}catch(e){}var Ay=function(e){if(sy(ky,e)){var t=ky[e];delete ky[e],t()}},Ey=function(e){return function(){Ay(e)}},Oy=function(e){Ay(e.data)},Ty=function(e){ny.postMessage(wy(e),Im.protocol+"//"+Im.host)};my&&yy||(my=function(e){dy(arguments.length,1);var t=iy(e)?e:by(e),r=py(arguments,1);return ky[++$y]=function(){oy(t,void 0,r)},Pm($y),$y},yy=function(e){delete ky[e]},fy?Pm=function(e){gy.nextTick(Ey(e))}:vy&&vy.now?Pm=function(e){vy.now(Ey(e))}:xy&&!hy?(Lm=(Rm=new xy).port2,Rm.port1.onmessage=Oy,Pm=ay(Lm.postMessage,Lm)):ny.addEventListener&&iy(ny.postMessage)&&!ny.importScripts&&Im&&"file:"!==Im.protocol&&!ly(Ty)?(Pm=Ty,ny.addEventListener("message",Oy,!1)):Pm=Sy in uy("script")?function(e){cy.appendChild(uy("script")).onreadystatechange=function(){cy.removeChild(this),Ay(e)}}:function(e){setTimeout(Ey(e),0)});var Cy,_y,jy,Iy,Py,Ry,Ly,Dy,Fy={set:my,clear:yy},By=dt,Ny=/ipad|iphone|ipod/i.test(cr)&&void 0!==By.Pebble,zy=/web0s(?!.*chrome)/i.test(cr),Uy=dt,qy=Xn,My=Ot.f,Hy=Fy.set,Wy=ty,Vy=Ny,Gy=zy,Ky=ry,Jy=Uy.MutationObserver||Uy.WebKitMutationObserver,Yy=Uy.document,Zy=Uy.process,Qy=Uy.Promise,Xy=My(Uy,"queueMicrotask"),eg=Xy&&Xy.value;eg||(Cy=function(){var e,t;for(Ky&&(e=Zy.domain)&&e.exit();_y;){t=_y.fn,_y=_y.next;try{t()}catch(e){throw _y?Iy():jy=void 0,e}}jy=void 0,e&&e.enter()},Wy||Ky||Gy||!Jy||!Yy?!Vy&&Qy&&Qy.resolve?((Ly=Qy.resolve(void 0)).constructor=Qy,Dy=qy(Ly.then,Ly),Iy=function(){Dy(Cy)}):Ky?Iy=function(){Zy.nextTick(Cy)}:(Hy=qy(Hy,Uy),Iy=function(){Hy(Cy)}):(Py=!0,Ry=Yy.createTextNode(""),new Jy(Cy).observe(Ry,{characterData:!0}),Iy=function(){Ry.data=Py=!Py}));var tg=eg||function(e){var t={fn:e,next:void 0};jy&&(jy.next=t),_y||(_y=t,Iy()),jy=t},rg={},ng=Ir,og=function(e){var t,r;this.promise=new e((function(e,n){if(void 0!==t||void 0!==r)throw TypeError("Bad Promise constructor");t=e,r=n})),this.resolve=ng(t),this.reject=ng(r)};rg.f=function(e){return new og(e)};var ag=io,ig=tr,sg=rg,lg=function(e,t){if(ag(e),ig(t)&&t.constructor===e)return t;var r=sg.f(e);return(0,r.resolve)(t),r.promise},cg=dt,pg=function(e){try{return{error:!1,value:e()}}catch(e){return{error:!0,value:e}}},ug=function(){this.head=null,this.tail=null};ug.prototype={add:function(e){var t={item:e,next:null};this.head?this.tail.next=t:this.head=t,this.tail=t},get:function(){var e=this.head;if(e)return this.head=e.next,this.tail===e&&(this.tail=null),e.item}};var dg,hg,fg,mg="object"==typeof window,yg=Po,gg=dt,vg=sr,bg=jt,xg=Dm,wg=Bm,$g=Di,kg=function(e){var t=Nm(e),r=zm.f;Um&&t&&!t[qm]&&r(t,qm,{configurable:!0,get:function(){return this}})},Sg=Ir,Ag=Et,Eg=tr,Og=Wm,Tg=Mi,Cg=cm,_g=_f,jg=Qm,Ig=Fy.set,Pg=tg,Rg=lg,Lg=function(e,t){var r=cg.console;r&&r.error&&(1==arguments.length?r.error(e):r.error(e,t))},Dg=rg,Fg=pg,Bg=ug,Ng=us,zg=Jn,Ug=mg,qg=ry,Mg=yr,Hg=fn("species"),Wg="Promise",Vg=Ng.getterFor(Wg),Gg=Ng.set,Kg=Ng.getterFor(Wg),Jg=xg&&xg.prototype,Yg=xg,Zg=Jg,Qg=gg.TypeError,Xg=gg.document,ev=gg.process,tv=Dg.f,rv=tv,nv=!!(Xg&&Xg.createEvent&&gg.dispatchEvent),ov=Ag(gg.PromiseRejectionEvent),av="unhandledrejection",iv=zg(Wg,(function(){var e=Tg(Yg),t=e!==String(Yg);if(!t&&66===Mg)return!0;if(!Zg.finally)return!0;if(Mg>=51&&/native code/.test(e))return!1;var r=new Yg((function(e){e(1)})),n=function(e){e((function(){}),(function(){}))};return(r.constructor={})[Hg]=n,!(r.then((function(){}))instanceof n)||!t&&Ug&&!ov})),sv=iv||!_g((function(e){Yg.all(e).catch((function(){}))})),lv=function(e){var t;return!(!Eg(e)||!Ag(t=e.then))&&t},cv=function(e,t){var r,n,o,a=t.value,i=1==t.state,s=i?e.ok:e.fail,l=e.resolve,c=e.reject,p=e.domain;try{s?(i||(2===t.rejection&&fv(t),t.rejection=1),!0===s?r=a:(p&&p.enter(),r=s(a),p&&(p.exit(),o=!0)),r===e.promise?c(Qg("Promise-chain cycle")):(n=lv(r))?bg(n,r,l,c):l(r)):c(a)}catch(e){p&&!o&&p.exit(),c(e)}},pv=function(e,t){e.notified||(e.notified=!0,Pg((function(){for(var r,n=e.reactions;r=n.get();)cv(r,e);e.notified=!1,t&&!e.rejection&&dv(e)})))},uv=function(e,t,r){var n,o;nv?((n=Xg.createEvent("Event")).promise=t,n.reason=r,n.initEvent(e,!1,!0),gg.dispatchEvent(n)):n={promise:t,reason:r},!ov&&(o=gg["on"+e])?o(n):e===av&&Lg("Unhandled promise rejection",r)},dv=function(e){bg(Ig,gg,(function(){var t,r=e.facade,n=e.value;if(hv(e)&&(t=Fg((function(){qg?ev.emit("unhandledRejection",n,r):uv(av,r,n)})),e.rejection=qg||hv(e)?2:1,t.error))throw t.value}))},hv=function(e){return 1!==e.rejection&&!e.parent},fv=function(e){bg(Ig,gg,(function(){var t=e.facade;qg?ev.emit("rejectionHandled",t):uv("rejectionhandled",t,e.value)}))},mv=function(e,t,r){return function(n){e(t,n,r)}},yv=function(e,t,r){e.done||(e.done=!0,r&&(e=r),e.value=t,e.state=2,pv(e,!0))},gv=function(e,t,r){if(!e.done){e.done=!0,r&&(e=r);try{if(e.facade===t)throw Qg("Promise can't be resolved itself");var n=lv(t);n?Pg((function(){var r={done:!1};try{bg(n,t,mv(gv,r,e),mv(yv,r,e))}catch(t){yv(r,t,e)}})):(e.value=t,e.state=1,pv(e,!1))}catch(t){yv({done:!1},t,e)}}};iv&&(Zg=(Yg=function(e){Og(this,Zg),Sg(e),bg(dg,this);var t=Vg(this);try{e(mv(gv,t),mv(yv,t))}catch(e){yv(t,e)}}).prototype,(dg=function(e){Gg(this,{type:Wg,done:!1,notified:!1,parent:!1,reactions:new Bg,rejection:!1,state:0,value:void 0})}).prototype=wg(Zg,{then:function(e,t){var r=Kg(this),n=tv(jg(this,Yg));return r.parent=!0,n.ok=!Ag(e)||e,n.fail=Ag(t)&&t,n.domain=qg?ev.domain:void 0,0==r.state?r.reactions.add(n):Pg((function(){cv(n,r)})),n.promise},catch:function(e){return this.then(void 0,e)}}),hg=function(){var e=new dg,t=Vg(e);this.promise=e,this.resolve=mv(gv,t),this.reject=mv(yv,t)},Dg.f=tv=function(e){return e===Yg||e===fg?new hg(e):rv(e)}),yg({global:!0,wrap:!0,forced:iv},{Promise:Yg}),$g(Yg,Wg,!1,!0),kg(Wg),fg=vg(Wg),yg({target:Wg,stat:!0,forced:iv},{reject:function(e){var t=tv(this);return bg(t.reject,void 0,e),t.promise}}),yg({target:Wg,stat:!0,forced:true},{resolve:function(e){return Rg(this===fg?Yg:this,e)}}),yg({target:Wg,stat:!0,forced:sv},{all:function(e){var t=this,r=tv(t),n=r.resolve,o=r.reject,a=Fg((function(){var r=Sg(t.resolve),a=[],i=0,s=1;Cg(e,(function(e){var l=i++,c=!1;s++,bg(r,t,e).then((function(e){c||(c=!0,a[l]=e,--s||n(a))}),o)})),--s||n(a)}));return a.error&&o(a.value),r.promise},race:function(e){var t=this,r=tv(t),n=r.reject,o=Fg((function(){var o=Sg(t.resolve);Cg(e,(function(e){bg(o,t,e).then(r.resolve,n)}))}));return o.error&&n(o.value),r.promise}});var vv=jt,bv=Ir,xv=rg,wv=pg,$v=cm;Po({target:"Promise",stat:!0},{allSettled:function(e){var t=this,r=xv.f(t),n=r.resolve,o=r.reject,a=wv((function(){var r=bv(t.resolve),o=[],a=0,i=1;$v(e,(function(e){var s=a++,l=!1;i++,vv(r,t,e).then((function(e){l||(l=!0,o[s]={status:"fulfilled",value:e},--i||n(o))}),(function(e){l||(l=!0,o[s]={status:"rejected",reason:e},--i||n(o))}))})),--i||n(o)}));return a.error&&o(a.value),r.promise}});var kv=Ir,Sv=sr,Av=jt,Ev=rg,Ov=pg,Tv=cm,Cv="No one promise resolved";Po({target:"Promise",stat:!0},{any:function(e){var t=this,r=Sv("AggregateError"),n=Ev.f(t),o=n.resolve,a=n.reject,i=Ov((function(){var n=kv(t.resolve),i=[],s=0,l=1,c=!1;Tv(e,(function(e){var p=s++,u=!1;l++,Av(n,t,e).then((function(e){u||c||(c=!0,o(e))}),(function(e){u||c||(u=!0,i[p]=e,--l||a(new r(i,Cv)))}))})),--l||a(new r(i,Cv))}));return i.error&&a(i.value),n.promise}});var _v=Dm,jv=sr,Iv=Et,Pv=Qm,Rv=lg;Po({target:"Promise",proto:!0,real:!0,forced:!!_v&&ht((function(){_v.prototype.finally.call({then:function(){}},(function(){}))}))},{finally:function(e){var t=Pv(this,jv("Promise")),r=Iv(e);return this.then(r?function(r){return Rv(t,e()).then((function(){return r}))}:e,r?function(r){return Rv(t,e()).then((function(){throw r}))}:e)}});var Lv=rr.Promise,Dv=Lv,Fv=rg,Bv=pg;Po({target:"Promise",stat:!0,forced:!0},{try:function(e){var t=Fv.f(this),r=Bv(e);return(r.error?t.reject:t.resolve)(r.value),t.promise}});var Nv=Dv;function zv(e,t,r,n,o,a,i){try{var s=e[a](i),l=s.value}catch(e){return void r(e)}s.done?t(l):Nv.resolve(l).then(n,o)}function Uv(e){return function(){var t=this,r=arguments;return new Nv((function(n,o){var a=e.apply(t,r);function i(e){zv(a,n,o,i,s,"next",e)}function s(e){zv(a,n,o,i,s,"throw",e)}i(void 0)}))}}var qv={exports:{}};!function(e){var t=function(e){var t,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,r){return e[t]=r}}function c(e,t,r,n){var o=t&&t.prototype instanceof y?t:y,a=Object.create(o.prototype),i=new T(n||[]);return a._invoke=function(e,t,r){var n=u;return function(o,a){if(n===h)throw new Error("Generator is already running");if(n===f){if("throw"===o)throw a;return _()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var s=A(i,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===u)throw n=f,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var l=p(e,t,r);if("normal"===l.type){if(n=r.done?f:d,l.arg===m)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n=f,r.method="throw",r.arg=l.arg)}}}(e,r,i),a}function p(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var u="suspendedStart",d="suspendedYield",h="executing",f="completed",m={};function y(){}function g(){}function v(){}var b={};l(b,a,(function(){return this}));var x=Object.getPrototypeOf,w=x&&x(x(C([])));w&&w!==r&&n.call(w,a)&&(b=w);var $=v.prototype=y.prototype=Object.create(b);function k(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function S(e,t){function r(o,a,i,s){var l=p(e[o],e,a);if("throw"!==l.type){var c=l.arg,u=c.value;return u&&"object"==typeof u&&n.call(u,"__await")?t.resolve(u.__await).then((function(e){r("next",e,i,s)}),(function(e){r("throw",e,i,s)})):t.resolve(u).then((function(e){c.value=e,i(c)}),(function(e){return r("throw",e,i,s)}))}s(l.arg)}var o;this._invoke=function(e,n){function a(){return new t((function(t,o){r(e,n,t,o)}))}return o=o?o.then(a,a):a()}}function A(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,A(e,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=p(n,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var a=o.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,m):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function E(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function T(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(E,this),this.reset(!0)}function C(e){if(e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}return{next:_}}function _(){return{value:t,done:!0}}return g.prototype=v,l($,"constructor",v),l(v,"constructor",g),g.displayName=l(v,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,l(e,s,"GeneratorFunction")),e.prototype=Object.create($),e},e.awrap=function(e){return{__await:e}},k(S.prototype),l(S.prototype,i,(function(){return this})),e.AsyncIterator=S,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new S(c(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},k($),l($,s,"Generator"),l($,a,(function(){return this})),l($,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=C,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(O),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return s.type="throw",s.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var l=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(l&&c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,m):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),O(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:C(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),m}},e}(e.exports);try{regeneratorRuntime=t}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}}(qv);var Mv=qv.exports,Hv=Yo.includes;Po({target:"Array",proto:!0},{includes:function(e){return Hv(this,e,arguments.length>1?arguments[1]:void 0)}});var Wv=hc("Array").includes,Vv=Po,Gv=rd,Kv=Yt,Jv=Ea,Yv=od,Zv=At("".indexOf);Vv({target:"String",proto:!0,forced:!Yv("includes")},{includes:function(e){return!!~Zv(Jv(Kv(this)),Jv(Gv(e)),arguments.length>1?arguments[1]:void 0)}});var Qv=hc("String").includes,Xv=lr,eb=Wv,tb=Qv,rb=Array.prototype,nb=String.prototype,ob=function(e){var t=e.includes;return e===rb||Xv(rb,e)&&t===rb.includes?eb:"string"==typeof e||e===nb||Xv(nb,e)&&t===nb.includes?tb:t},ab=hc("Array").entries,ib=ka,sb=Zr,lb=lr,cb=ab,pb=Array.prototype,ub={DOMTokenList:!0,NodeList:!0},db=function(e){var t=e.entries;return e===pb||lb(pb,e)&&t===pb.entries||sb(ub,ib(e))?cb:t},hb=If,fb=Po,mb=sr,yb=bt,gb=At,vb=ht,bb=dt.Array,xb=mb("JSON","stringify"),wb=gb(/./.exec),$b=gb("".charAt),kb=gb("".charCodeAt),Sb=gb("".replace),Ab=gb(1..toString),Eb=/[\uD800-\uDFFF]/g,Ob=/^[\uD800-\uDBFF]$/,Tb=/^[\uDC00-\uDFFF]$/,Cb=function(e,t,r){var n=$b(r,t-1),o=$b(r,t+1);return wb(Ob,e)&&!wb(Tb,o)||wb(Tb,e)&&!wb(Ob,n)?"\\u"+Ab(kb(e,0),16):e},_b=vb((function(){return'"\\udf06\\ud834"'!==xb("\udf06\ud834")||'"\\udead"'!==xb("\udead")}));xb&&fb({target:"JSON",stat:!0,forced:_b},{stringify:function(e,t,r){for(var n=0,o=arguments.length,a=bb(o);n<o;n++)a[n]=arguments[n];var i=yb(xb,null,a);return"string"==typeof i?Sb(i,Eb,Cb):i}});var jb=rr,Ib=bt;jb.JSON||(jb.JSON={stringify:JSON.stringify});var Pb=function(e,t,r){return Ib(jb.JSON.stringify,null,arguments)},Rb=Us.map;Po({target:"Array",proto:!0,forced:!pc("map")},{map:function(e){return Rb(this,e,arguments.length>1?arguments[1]:void 0)}});var Lb=hc("Array").map,Db=lr,Fb=Lb,Bb=Array.prototype,Nb=function(e){var t=e.map;return e===Bb||Db(Bb,e)&&t===Bb.map?Fb:t},zb=pa,Ub=hc("Array").concat,qb=lr,Mb=Ub,Hb=Array.prototype,Wb=function(e){var t=e.concat;return e===Hb||qb(Hb,e)&&t===Hb.concat?Mb:t},Vb=Tt,Gb=At,Kb=sa,Jb=Xt,Yb=Gb(It.f),Zb=Gb([].push),Qb=function(e){return function(t){for(var r,n=Jb(t),o=Kb(n),a=o.length,i=0,s=[];a>i;)r=o[i++],Vb&&!Yb(n,r)||Zb(s,e?[r,n[r]]:n[r]);return s}},Xb={entries:Qb(!0),values:Qb(!1)}.entries;Po({target:"Object",stat:!0},{entries:function(e){return Xb(e)}});var ex=rr.Object.entries,tx=vc;!function(e){!function(t){var r="URLSearchParams"in e,n="Symbol"in e&&"iterator"in Symbol,o="FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),a="FormData"in e,i="ArrayBuffer"in e;if(i)var s=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],l=ArrayBuffer.isView||function(e){return e&&s.indexOf(Object.prototype.toString.call(e))>-1};function c(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function p(e){return"string"!=typeof e&&(e=String(e)),e}function u(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return n&&(t[Symbol.iterator]=function(){return t}),t}function d(e){this.map={},e instanceof d?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function h(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function f(e){return new Promise((function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}}))}function m(e){var t=new FileReader,r=f(t);return t.readAsArrayBuffer(e),r}function y(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function g(){return this.bodyUsed=!1,this._initBody=function(e){var t;this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:o&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:a&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:r&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():i&&o&&((t=e)&&DataView.prototype.isPrototypeOf(t))?(this._bodyArrayBuffer=y(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):i&&(ArrayBuffer.prototype.isPrototypeOf(e)||l(e))?this._bodyArrayBuffer=y(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},o&&(this.blob=function(){var e=h(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?h(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(m)}),this.text=function(){var e=h(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,r=f(t);return t.readAsText(e),r}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},a&&(this.formData=function(){return this.text().then(x)}),this.json=function(){return this.text().then(JSON.parse)},this}d.prototype.append=function(e,t){e=c(e),t=p(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},d.prototype.delete=function(e){delete this.map[c(e)]},d.prototype.get=function(e){return e=c(e),this.has(e)?this.map[e]:null},d.prototype.has=function(e){return this.map.hasOwnProperty(c(e))},d.prototype.set=function(e,t){this.map[c(e)]=p(t)},d.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},d.prototype.keys=function(){var e=[];return this.forEach((function(t,r){e.push(r)})),u(e)},d.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),u(e)},d.prototype.entries=function(){var e=[];return this.forEach((function(t,r){e.push([r,t])})),u(e)},n&&(d.prototype[Symbol.iterator]=d.prototype.entries);var v=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function b(e,t){var r=(t=t||{}).body;if(e instanceof b){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new d(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new d(t.headers)),this.method=function(e){var t=e.toUpperCase();return v.indexOf(t)>-1?t:e}(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function x(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}})),t}function w(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new d(t.headers),this.url=t.url||"",this._initBody(e)}b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},g.call(b.prototype),g.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),url:this.url})},w.error=function(){var e=new w(null,{status:0,statusText:""});return e.type="error",e};var $=[301,302,303,307,308];w.redirect=function(e,t){if(-1===$.indexOf(t))throw new RangeError("Invalid status code");return new w(null,{status:t,headers:{location:e}})},t.DOMException=e.DOMException;try{new t.DOMException}catch(e){t.DOMException=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack},t.DOMException.prototype=Object.create(Error.prototype),t.DOMException.prototype.constructor=t.DOMException}function k(e,r){return new Promise((function(n,a){var i=new b(e,r);if(i.signal&&i.signal.aborted)return a(new t.DOMException("Aborted","AbortError"));var s=new XMLHttpRequest;function l(){s.abort()}s.onload=function(){var e,t,r={status:s.status,statusText:s.statusText,headers:(e=s.getAllResponseHeaders()||"",t=new d,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(e){var r=e.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();t.append(n,o)}})),t)};r.url="responseURL"in s?s.responseURL:r.headers.get("X-Request-URL");var o="response"in s?s.response:s.responseText;n(new w(o,r))},s.onerror=function(){a(new TypeError("Network request failed"))},s.ontimeout=function(){a(new TypeError("Network request failed"))},s.onabort=function(){a(new t.DOMException("Aborted","AbortError"))},s.open(i.method,i.url,!0),"include"===i.credentials?s.withCredentials=!0:"omit"===i.credentials&&(s.withCredentials=!1),"responseType"in s&&o&&(s.responseType="blob"),i.headers.forEach((function(e,t){s.setRequestHeader(t,e)})),i.signal&&(i.signal.addEventListener("abort",l),s.onreadystatechange=function(){4===s.readyState&&i.signal.removeEventListener("abort",l)}),s.send(void 0===i._bodyInit?null:i._bodyInit)}))}k.polyfill=!0,e.fetch||(e.fetch=k,e.Headers=d,e.Request=b,e.Response=w),t.Headers=d,t.Request=b,t.Response=w,t.fetch=k,Object.defineProperty(t,"__esModule",{value:!0})}({})}("undefined"!=typeof self?self:globalThis);var rx,nx="undefined"!=typeof Symbol&&Symbol,ox=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var e={},t=Symbol("test"),r=Object(t);if("string"==typeof t)return!1;if("[object Symbol]"!==Object.prototype.toString.call(t))return!1;if("[object Symbol]"!==Object.prototype.toString.call(r))return!1;for(t in e[t]=42,e)return!1;if("function"==typeof Object.keys&&0!==Object.keys(e).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(e).length)return!1;var n=Object.getOwnPropertySymbols(e);if(1!==n.length||n[0]!==t)return!1;if(!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var o=Object.getOwnPropertyDescriptor(e,t);if(42!==o.value||!0!==o.enumerable)return!1}return!0},ax="Function.prototype.bind called on incompatible ",ix=Array.prototype.slice,sx=Object.prototype.toString,lx="[object Function]",cx=function(e){var t=this;if("function"!=typeof t||sx.call(t)!==lx)throw new TypeError(ax+t);for(var r,n=ix.call(arguments,1),o=function(){if(this instanceof r){var o=t.apply(this,n.concat(ix.call(arguments)));return Object(o)===o?o:this}return t.apply(e,n.concat(ix.call(arguments)))},a=Math.max(0,t.length-n.length),i=[],s=0;s<a;s++)i.push("$"+s);if(r=Function("binder","return function ("+i.join(",")+"){ return binder.apply(this,arguments); }")(o),t.prototype){var l=function(){};l.prototype=t.prototype,r.prototype=new l,l.prototype=null}return r},px=Function.prototype.bind||cx,ux=px.call(Function.call,Object.prototype.hasOwnProperty),dx=SyntaxError,hx=Function,fx=TypeError,mx=function(e){try{return hx('"use strict"; return ('+e+").constructor;")()}catch(e){}},yx=Object.getOwnPropertyDescriptor;if(yx)try{yx({},"")}catch(o){yx=null}var gx=function(){throw new fx},vx=yx?function(){try{return gx}catch(e){try{return yx(arguments,"callee").get}catch(e){return gx}}}():gx,bx="function"==typeof nx&&"function"==typeof Symbol&&"symbol"==typeof nx("foo")&&"symbol"==typeof Symbol("bar")&&ox(),xx=Object.getPrototypeOf||function(e){return e.__proto__},wx={},$x="undefined"==typeof Uint8Array?rx:xx(Uint8Array),kx={"%AggregateError%":"undefined"==typeof AggregateError?rx:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?rx:ArrayBuffer,"%ArrayIteratorPrototype%":bx?xx([][Symbol.iterator]()):rx,"%AsyncFromSyncIteratorPrototype%":rx,"%AsyncFunction%":wx,"%AsyncGenerator%":wx,"%AsyncGeneratorFunction%":wx,"%AsyncIteratorPrototype%":wx,"%Atomics%":"undefined"==typeof Atomics?rx:Atomics,"%BigInt%":"undefined"==typeof BigInt?rx:BigInt,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?rx:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?rx:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?rx:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?rx:FinalizationRegistry,"%Function%":hx,"%GeneratorFunction%":wx,"%Int8Array%":"undefined"==typeof Int8Array?rx:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?rx:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?rx:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":bx?xx(xx([][Symbol.iterator]())):rx,"%JSON%":"object"==typeof JSON?JSON:rx,"%Map%":"undefined"==typeof Map?rx:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&bx?xx((new Map)[Symbol.iterator]()):rx,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?rx:Promise,"%Proxy%":"undefined"==typeof Proxy?rx:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?rx:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?rx:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&bx?xx((new Set)[Symbol.iterator]()):rx,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?rx:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":bx?xx(""[Symbol.iterator]()):rx,"%Symbol%":bx?Symbol:rx,"%SyntaxError%":dx,"%ThrowTypeError%":vx,"%TypedArray%":$x,"%TypeError%":fx,"%Uint8Array%":"undefined"==typeof Uint8Array?rx:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?rx:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?rx:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?rx:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?rx:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?rx:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?rx:WeakSet},Sx=function e(t){var r;if("%AsyncFunction%"===t)r=mx("async function () {}");else if("%GeneratorFunction%"===t)r=mx("function* () {}");else if("%AsyncGeneratorFunction%"===t)r=mx("async function* () {}");else if("%AsyncGenerator%"===t){var n=e("%AsyncGeneratorFunction%");n&&(r=n.prototype)}else if("%AsyncIteratorPrototype%"===t){var o=e("%AsyncGenerator%");o&&(r=xx(o.prototype))}return kx[t]=r,r},Ax={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},Ex=px,Ox=ux,Tx=Ex.call(Function.call,Array.prototype.concat),Cx=Ex.call(Function.apply,Array.prototype.splice),_x=Ex.call(Function.call,String.prototype.replace),jx=Ex.call(Function.call,String.prototype.slice),Ix=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,Px=/\\(\\)?/g,Rx=function(e){var t=jx(e,0,1),r=jx(e,-1);if("%"===t&&"%"!==r)throw new dx("invalid intrinsic syntax, expected closing `%`");if("%"===r&&"%"!==t)throw new dx("invalid intrinsic syntax, expected opening `%`");var n=[];return _x(e,Ix,(function(e,t,r,o){n[n.length]=r?_x(o,Px,"$1"):t||e})),n},Lx=function(e,t){var r,n=e;if(Ox(Ax,n)&&(n="%"+(r=Ax[n])[0]+"%"),Ox(kx,n)){var o=kx[n];if(o===wx&&(o=Sx(n)),void 0===o&&!t)throw new fx("intrinsic "+e+" exists, but is not available. Please file an issue!");return{alias:r,name:n,value:o}}throw new dx("intrinsic "+e+" does not exist!")},Dx=function(e,t){if("string"!=typeof e||0===e.length)throw new fx("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof t)throw new fx('"allowMissing" argument must be a boolean');var r=Rx(e),n=r.length>0?r[0]:"",o=Lx("%"+n+"%",t),a=o.name,i=o.value,s=!1,l=o.alias;l&&(n=l[0],Cx(r,Tx([0,1],l)));for(var c=1,p=!0;c<r.length;c+=1){var u=r[c],d=jx(u,0,1),h=jx(u,-1);if(('"'===d||"'"===d||"`"===d||'"'===h||"'"===h||"`"===h)&&d!==h)throw new dx("property names with quotes must have matching quotes");if("constructor"!==u&&p||(s=!0),Ox(kx,a="%"+(n+="."+u)+"%"))i=kx[a];else if(null!=i){if(!(u in i)){if(!t)throw new fx("base intrinsic for "+e+" exists, but the property is not available.");return}if(yx&&c+1>=r.length){var f=yx(i,u);i=(p=!!f)&&"get"in f&&!("originalValue"in f.get)?f.get:i[u]}else p=Ox(i,u),i=i[u];p&&!s&&(kx[a]=i)}}return i},Fx={exports:{}};!function(e){var t=px,r=Dx,n=r("%Function.prototype.apply%"),o=r("%Function.prototype.call%"),a=r("%Reflect.apply%",!0)||t.call(o,n),i=r("%Object.getOwnPropertyDescriptor%",!0),s=r("%Object.defineProperty%",!0),l=r("%Math.max%");if(s)try{s({},"a",{value:1})}catch(e){s=null}e.exports=function(e){var r=a(t,o,arguments);if(i&&s){var n=i(r,"length");n.configurable&&s(r,"length",{value:1+l(0,e.length-(arguments.length-1))})}return r};var c=function(){return a(t,n,arguments)};s?s(e.exports,"apply",{value:c}):e.exports.apply=c}(Fx);var Bx=Dx,Nx=Fx.exports,zx=Nx(Bx("String.prototype.indexOf")),Ux=pt(Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:{}})),qx="function"==typeof Map&&Map.prototype,Mx=Object.getOwnPropertyDescriptor&&qx?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,Hx=qx&&Mx&&"function"==typeof Mx.get?Mx.get:null,Wx=qx&&Map.prototype.forEach,Vx="function"==typeof Set&&Set.prototype,Gx=Object.getOwnPropertyDescriptor&&Vx?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,Kx=Vx&&Gx&&"function"==typeof Gx.get?Gx.get:null,Jx=Vx&&Set.prototype.forEach,Yx="function"==typeof WeakMap&&WeakMap.prototype?WeakMap.prototype.has:null,Zx="function"==typeof WeakSet&&WeakSet.prototype?WeakSet.prototype.has:null,Qx="function"==typeof WeakRef&&WeakRef.prototype?WeakRef.prototype.deref:null,Xx=Boolean.prototype.valueOf,ew=Object.prototype.toString,tw=Function.prototype.toString,rw=String.prototype.match,nw=String.prototype.slice,ow=String.prototype.replace,aw=String.prototype.toUpperCase,iw=String.prototype.toLowerCase,sw=RegExp.prototype.test,lw=Array.prototype.concat,cw=Array.prototype.join,pw=Array.prototype.slice,uw=Math.floor,dw="function"==typeof BigInt?BigInt.prototype.valueOf:null,hw=Object.getOwnPropertySymbols,fw="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?Symbol.prototype.toString:null,mw="function"==typeof Symbol&&"object"==typeof Symbol.iterator,yw="function"==typeof Symbol&&Symbol.toStringTag&&(typeof Symbol.toStringTag===mw||"symbol")?Symbol.toStringTag:null,gw=Object.prototype.propertyIsEnumerable,vw=("function"==typeof Reflect?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(e){return e.__proto__}:null);function bw(e,t){if(e===1/0||e===-1/0||e!=e||e&&e>-1e3&&e<1e3||sw.call(/e/,t))return t;var r=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if("number"==typeof e){var n=e<0?-uw(-e):uw(e);if(n!==e){var o=String(n),a=nw.call(t,o.length+1);return ow.call(o,r,"$&_")+"."+ow.call(ow.call(a,/([0-9]{3})/g,"$&_"),/_$/,"")}}return ow.call(t,r,"$&_")}var xw=Ux.custom,ww=xw&&Aw(xw)?xw:null;function $w(e,t,r){var n="double"===(r.quoteStyle||t)?'"':"'";return n+e+n}function kw(e){return ow.call(String(e),/"/g,"&quot;")}function Sw(e){return!("[object Array]"!==Tw(e)||yw&&"object"==typeof e&&yw in e)}function Aw(e){if(mw)return e&&"object"==typeof e&&e instanceof Symbol;if("symbol"==typeof e)return!0;if(!e||"object"!=typeof e||!fw)return!1;try{return fw.call(e),!0}catch(e){}return!1}var Ew=Object.prototype.hasOwnProperty||function(e){return e in this};function Ow(e,t){return Ew.call(e,t)}function Tw(e){return ew.call(e)}function Cw(e,t){if(e.indexOf)return e.indexOf(t);for(var r=0,n=e.length;r<n;r++)if(e[r]===t)return r;return-1}function _w(e,t){if(e.length>t.maxStringLength){var r=e.length-t.maxStringLength,n="... "+r+" more character"+(r>1?"s":"");return _w(nw.call(e,0,t.maxStringLength),t)+n}return $w(ow.call(ow.call(e,/(['\\])/g,"\\$1"),/[\x00-\x1f]/g,jw),"single",t)}function jw(e){var t=e.charCodeAt(0),r={8:"b",9:"t",10:"n",12:"f",13:"r"}[t];return r?"\\"+r:"\\x"+(t<16?"0":"")+aw.call(t.toString(16))}function Iw(e){return"Object("+e+")"}function Pw(e){return e+" { ? }"}function Rw(e,t,r,n){return e+" ("+t+") {"+(n?Lw(r,n):cw.call(r,", "))+"}"}function Lw(e,t){if(0===e.length)return"";var r="\n"+t.prev+t.base;return r+cw.call(e,","+r)+"\n"+t.prev}function Dw(e,t){var r=Sw(e),n=[];if(r){n.length=e.length;for(var o=0;o<e.length;o++)n[o]=Ow(e,o)?t(e[o],e):""}var a,i="function"==typeof hw?hw(e):[];if(mw){a={};for(var s=0;s<i.length;s++)a["$"+i[s]]=i[s]}for(var l in e)Ow(e,l)&&(r&&String(Number(l))===l&&l<e.length||mw&&a["$"+l]instanceof Symbol||(sw.call(/[^\w$]/,l)?n.push(t(l,e)+": "+t(e[l],e)):n.push(l+": "+t(e[l],e))));if("function"==typeof hw)for(var c=0;c<i.length;c++)gw.call(e,i[c])&&n.push("["+t(i[c])+"]: "+t(e[i[c]],e));return n}var Fw=Dx,Bw=function(e,t){var r=Bx(e,!!t);return"function"==typeof r&&zx(e,".prototype.")>-1?Nx(r):r},Nw=function e(t,r,n,o){var a=r||{};if(Ow(a,"quoteStyle")&&"single"!==a.quoteStyle&&"double"!==a.quoteStyle)throw new TypeError('option "quoteStyle" must be "single" or "double"');if(Ow(a,"maxStringLength")&&("number"==typeof a.maxStringLength?a.maxStringLength<0&&a.maxStringLength!==1/0:null!==a.maxStringLength))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var i=!Ow(a,"customInspect")||a.customInspect;if("boolean"!=typeof i&&"symbol"!==i)throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(Ow(a,"indent")&&null!==a.indent&&"\t"!==a.indent&&!(parseInt(a.indent,10)===a.indent&&a.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(Ow(a,"numericSeparator")&&"boolean"!=typeof a.numericSeparator)throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var s=a.numericSeparator;if(void 0===t)return"undefined";if(null===t)return"null";if("boolean"==typeof t)return t?"true":"false";if("string"==typeof t)return _w(t,a);if("number"==typeof t){if(0===t)return 1/0/t>0?"0":"-0";var l=String(t);return s?bw(t,l):l}if("bigint"==typeof t){var c=String(t)+"n";return s?bw(t,c):c}var p=void 0===a.depth?5:a.depth;if(void 0===n&&(n=0),n>=p&&p>0&&"object"==typeof t)return Sw(t)?"[Array]":"[Object]";var u=function(e,t){var r;if("\t"===e.indent)r="\t";else{if(!("number"==typeof e.indent&&e.indent>0))return null;r=cw.call(Array(e.indent+1)," ")}return{base:r,prev:cw.call(Array(t+1),r)}}(a,n);if(void 0===o)o=[];else if(Cw(o,t)>=0)return"[Circular]";function d(t,r,i){if(r&&(o=pw.call(o)).push(r),i){var s={depth:a.depth};return Ow(a,"quoteStyle")&&(s.quoteStyle=a.quoteStyle),e(t,s,n+1,o)}return e(t,a,n+1,o)}if("function"==typeof t){var h=function(e){if(e.name)return e.name;var t=rw.call(tw.call(e),/^function\s*([\w$]+)/);if(t)return t[1];return null}(t),f=Dw(t,d);return"[Function"+(h?": "+h:" (anonymous)")+"]"+(f.length>0?" { "+cw.call(f,", ")+" }":"")}if(Aw(t)){var m=mw?ow.call(String(t),/^(Symbol\(.*\))_[^)]*$/,"$1"):fw.call(t);return"object"!=typeof t||mw?m:Iw(m)}if(function(e){if(!e||"object"!=typeof e)return!1;if("undefined"!=typeof HTMLElement&&e instanceof HTMLElement)return!0;return"string"==typeof e.nodeName&&"function"==typeof e.getAttribute}(t)){for(var y="<"+iw.call(String(t.nodeName)),g=t.attributes||[],v=0;v<g.length;v++)y+=" "+g[v].name+"="+$w(kw(g[v].value),"double",a);return y+=">",t.childNodes&&t.childNodes.length&&(y+="..."),y+="</"+iw.call(String(t.nodeName))+">"}if(Sw(t)){if(0===t.length)return"[]";var b=Dw(t,d);return u&&!function(e){for(var t=0;t<e.length;t++)if(Cw(e[t],"\n")>=0)return!1;return!0}(b)?"["+Lw(b,u)+"]":"[ "+cw.call(b,", ")+" ]"}if(function(e){return!("[object Error]"!==Tw(e)||yw&&"object"==typeof e&&yw in e)}(t)){var x=Dw(t,d);return"cause"in t&&!gw.call(t,"cause")?"{ ["+String(t)+"] "+cw.call(lw.call("[cause]: "+d(t.cause),x),", ")+" }":0===x.length?"["+String(t)+"]":"{ ["+String(t)+"] "+cw.call(x,", ")+" }"}if("object"==typeof t&&i){if(ww&&"function"==typeof t[ww])return t[ww]();if("symbol"!==i&&"function"==typeof t.inspect)return t.inspect()}if(function(e){if(!Hx||!e||"object"!=typeof e)return!1;try{Hx.call(e);try{Kx.call(e)}catch(e){return!0}return e instanceof Map}catch(e){}return!1}(t)){var w=[];return Wx.call(t,(function(e,r){w.push(d(r,t,!0)+" => "+d(e,t))})),Rw("Map",Hx.call(t),w,u)}if(function(e){if(!Kx||!e||"object"!=typeof e)return!1;try{Kx.call(e);try{Hx.call(e)}catch(e){return!0}return e instanceof Set}catch(e){}return!1}(t)){var $=[];return Jx.call(t,(function(e){$.push(d(e,t))})),Rw("Set",Kx.call(t),$,u)}if(function(e){if(!Yx||!e||"object"!=typeof e)return!1;try{Yx.call(e,Yx);try{Zx.call(e,Zx)}catch(e){return!0}return e instanceof WeakMap}catch(e){}return!1}(t))return Pw("WeakMap");if(function(e){if(!Zx||!e||"object"!=typeof e)return!1;try{Zx.call(e,Zx);try{Yx.call(e,Yx)}catch(e){return!0}return e instanceof WeakSet}catch(e){}return!1}(t))return Pw("WeakSet");if(function(e){if(!Qx||!e||"object"!=typeof e)return!1;try{return Qx.call(e),!0}catch(e){}return!1}(t))return Pw("WeakRef");if(function(e){return!("[object Number]"!==Tw(e)||yw&&"object"==typeof e&&yw in e)}(t))return Iw(d(Number(t)));if(function(e){if(!e||"object"!=typeof e||!dw)return!1;try{return dw.call(e),!0}catch(e){}return!1}(t))return Iw(d(dw.call(t)));if(function(e){return!("[object Boolean]"!==Tw(e)||yw&&"object"==typeof e&&yw in e)}(t))return Iw(Xx.call(t));if(function(e){return!("[object String]"!==Tw(e)||yw&&"object"==typeof e&&yw in e)}(t))return Iw(d(String(t)));if(!function(e){return!("[object Date]"!==Tw(e)||yw&&"object"==typeof e&&yw in e)}(t)&&!function(e){return!("[object RegExp]"!==Tw(e)||yw&&"object"==typeof e&&yw in e)}(t)){var k=Dw(t,d),S=vw?vw(t)===Object.prototype:t instanceof Object||t.constructor===Object,A=t instanceof Object?"":"null prototype",E=!S&&yw&&Object(t)===t&&yw in t?nw.call(Tw(t),8,-1):A?"Object":"",O=(S||"function"!=typeof t.constructor?"":t.constructor.name?t.constructor.name+" ":"")+(E||A?"["+cw.call(lw.call([],E||[],A||[]),": ")+"] ":"");return 0===k.length?O+"{}":u?O+"{"+Lw(k,u)+"}":O+"{ "+cw.call(k,", ")+" }"}return String(t)},zw=Fw("%TypeError%"),Uw=Fw("%WeakMap%",!0),qw=Fw("%Map%",!0),Mw=Bw("WeakMap.prototype.get",!0),Hw=Bw("WeakMap.prototype.set",!0),Ww=Bw("WeakMap.prototype.has",!0),Vw=Bw("Map.prototype.get",!0),Gw=Bw("Map.prototype.set",!0),Kw=Bw("Map.prototype.has",!0),Jw=function(e,t){for(var r,n=e;null!==(r=n.next);n=r)if(r.key===t)return n.next=r.next,r.next=e.next,e.next=r,r},Yw=String.prototype.replace,Zw=/%20/g,Qw="RFC3986",Xw={default:Qw,formatters:{RFC1738:function(e){return Yw.call(e,Zw,"+")},RFC3986:function(e){return String(e)}},RFC1738:"RFC1738",RFC3986:Qw},e$=Xw,t$=Object.prototype.hasOwnProperty,r$=Array.isArray,n$=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),o$=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)void 0!==e[n]&&(r[n]=e[n]);return r},a$={arrayToObject:o$,assign:function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],a=o.obj[o.prop],i=Object.keys(a),s=0;s<i.length;++s){var l=i[s],c=a[l];"object"==typeof c&&null!==c&&-1===r.indexOf(c)&&(t.push({obj:a,prop:l}),r.push(c))}return function(e){for(;e.length>1;){var t=e.pop(),r=t.obj[t.prop];if(r$(r)){for(var n=[],o=0;o<r.length;++o)void 0!==r[o]&&n.push(r[o]);t.obj[t.prop]=n}}}(t),e},decode:function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(e){return n}},encode:function(e,t,r,n,o){if(0===e.length)return e;var a=e;if("symbol"==typeof e?a=Symbol.prototype.toString.call(e):"string"!=typeof e&&(a=String(e)),"iso-8859-1"===r)return escape(a).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var i="",s=0;s<a.length;++s){var l=a.charCodeAt(s);45===l||46===l||95===l||126===l||l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122||o===e$.RFC1738&&(40===l||41===l)?i+=a.charAt(s):l<128?i+=n$[l]:l<2048?i+=n$[192|l>>6]+n$[128|63&l]:l<55296||l>=57344?i+=n$[224|l>>12]+n$[128|l>>6&63]+n$[128|63&l]:(s+=1,l=65536+((1023&l)<<10|1023&a.charCodeAt(s)),i+=n$[240|l>>18]+n$[128|l>>12&63]+n$[128|l>>6&63]+n$[128|63&l])}return i},isBuffer:function(e){return!(!e||"object"!=typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},maybeMap:function(e,t){if(r$(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)},merge:function e(t,r,n){if(!r)return t;if("object"!=typeof r){if(r$(t))t.push(r);else{if(!t||"object"!=typeof t)return[t,r];(n&&(n.plainObjects||n.allowPrototypes)||!t$.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!=typeof t)return[t].concat(r);var o=t;return r$(t)&&!r$(r)&&(o=o$(t,n)),r$(t)&&r$(r)?(r.forEach((function(r,o){if(t$.call(t,o)){var a=t[o];a&&"object"==typeof a&&r&&"object"==typeof r?t[o]=e(a,r,n):t.push(r)}else t[o]=r})),t):Object.keys(r).reduce((function(t,o){var a=r[o];return t$.call(t,o)?t[o]=e(t[o],a,n):t[o]=a,t}),o)}},i$=function(){var e,t,r,n={assert:function(e){if(!n.has(e))throw new zw("Side channel does not contain "+Nw(e))},get:function(n){if(Uw&&n&&("object"==typeof n||"function"==typeof n)){if(e)return Mw(e,n)}else if(qw){if(t)return Vw(t,n)}else if(r)return function(e,t){var r=Jw(e,t);return r&&r.value}(r,n)},has:function(n){if(Uw&&n&&("object"==typeof n||"function"==typeof n)){if(e)return Ww(e,n)}else if(qw){if(t)return Kw(t,n)}else if(r)return function(e,t){return!!Jw(e,t)}(r,n);return!1},set:function(n,o){Uw&&n&&("object"==typeof n||"function"==typeof n)?(e||(e=new Uw),Hw(e,n,o)):qw?(t||(t=new qw),Gw(t,n,o)):(r||(r={key:{},next:null}),function(e,t,r){var n=Jw(e,t);n?n.value=r:e.next={key:t,next:e.next,value:r}}(r,n,o))}};return n},s$=a$,l$=Xw,c$=Object.prototype.hasOwnProperty,p$={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},u$=Array.isArray,d$=String.prototype.split,h$=Array.prototype.push,f$=function(e,t){h$.apply(e,u$(t)?t:[t])},m$=Date.prototype.toISOString,y$=l$.default,g$={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:s$.encode,encodeValuesOnly:!1,format:y$,formatter:l$.formatters[y$],indices:!1,serializeDate:function(e){return m$.call(e)},skipNulls:!1,strictNullHandling:!1},v$={},b$=function e(t,r,n,o,a,i,s,l,c,p,u,d,h,f,m){for(var y=t,g=m,v=0,b=!1;void 0!==(g=g.get(v$))&&!b;){var x=g.get(t);if(v+=1,void 0!==x){if(x===v)throw new RangeError("Cyclic object value");b=!0}void 0===g.get(v$)&&(v=0)}if("function"==typeof s?y=s(r,y):y instanceof Date?y=p(y):"comma"===n&&u$(y)&&(y=s$.maybeMap(y,(function(e){return e instanceof Date?p(e):e}))),null===y){if(o)return i&&!h?i(r,g$.encoder,f,"key",u):r;y=""}if(function(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e||"symbol"==typeof e||"bigint"==typeof e}(y)||s$.isBuffer(y)){if(i){var w=h?r:i(r,g$.encoder,f,"key",u);if("comma"===n&&h){for(var $=d$.call(String(y),","),k="",S=0;S<$.length;++S)k+=(0===S?"":",")+d(i($[S],g$.encoder,f,"value",u));return[d(w)+"="+k]}return[d(w)+"="+d(i(y,g$.encoder,f,"value",u))]}return[d(r)+"="+d(String(y))]}var A,E=[];if(void 0===y)return E;if("comma"===n&&u$(y))A=[{value:y.length>0?y.join(",")||null:void 0}];else if(u$(s))A=s;else{var O=Object.keys(y);A=l?O.sort(l):O}for(var T=0;T<A.length;++T){var C=A[T],_="object"==typeof C&&void 0!==C.value?C.value:y[C];if(!a||null!==_){var j=u$(y)?"function"==typeof n?n(r,C):r:r+(c?"."+C:"["+C+"]");m.set(t,v);var I=i$();I.set(v$,m),f$(E,e(_,j,n,o,a,i,s,l,c,p,u,d,h,f,I))}}return E},x$=a$,w$=Object.prototype.hasOwnProperty,$$=Array.isArray,k$={allowDots:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:x$.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},S$=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},A$=function(e,t){return e&&"string"==typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},E$=function(e,t,r,n){if(e){var o=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/g,i=r.depth>0&&/(\[[^[\]]*])/.exec(o),s=i?o.slice(0,i.index):o,l=[];if(s){if(!r.plainObjects&&w$.call(Object.prototype,s)&&!r.allowPrototypes)return;l.push(s)}for(var c=0;r.depth>0&&null!==(i=a.exec(o))&&c<r.depth;){if(c+=1,!r.plainObjects&&w$.call(Object.prototype,i[1].slice(1,-1))&&!r.allowPrototypes)return;l.push(i[1])}return i&&l.push("["+o.slice(i.index)+"]"),function(e,t,r,n){for(var o=n?t:A$(t,r),a=e.length-1;a>=0;--a){var i,s=e[a];if("[]"===s&&r.parseArrays)i=[].concat(o);else{i=r.plainObjects?Object.create(null):{};var l="["===s.charAt(0)&&"]"===s.charAt(s.length-1)?s.slice(1,-1):s,c=parseInt(l,10);r.parseArrays||""!==l?!isNaN(c)&&s!==l&&String(c)===l&&c>=0&&r.parseArrays&&c<=r.arrayLimit?(i=[])[c]=o:"__proto__"!==l&&(i[l]=o):i={0:o}}o=i}return o}(l,t,r,n)}},O$={formats:Xw,parse:function(e,t){var r=function(e){if(!e)return k$;if(null!==e.decoder&&void 0!==e.decoder&&"function"!=typeof e.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t=void 0===e.charset?k$.charset:e.charset;return{allowDots:void 0===e.allowDots?k$.allowDots:!!e.allowDots,allowPrototypes:"boolean"==typeof e.allowPrototypes?e.allowPrototypes:k$.allowPrototypes,allowSparse:"boolean"==typeof e.allowSparse?e.allowSparse:k$.allowSparse,arrayLimit:"number"==typeof e.arrayLimit?e.arrayLimit:k$.arrayLimit,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:k$.charsetSentinel,comma:"boolean"==typeof e.comma?e.comma:k$.comma,decoder:"function"==typeof e.decoder?e.decoder:k$.decoder,delimiter:"string"==typeof e.delimiter||x$.isRegExp(e.delimiter)?e.delimiter:k$.delimiter,depth:"number"==typeof e.depth||!1===e.depth?+e.depth:k$.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof e.interpretNumericEntities?e.interpretNumericEntities:k$.interpretNumericEntities,parameterLimit:"number"==typeof e.parameterLimit?e.parameterLimit:k$.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"==typeof e.plainObjects?e.plainObjects:k$.plainObjects,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:k$.strictNullHandling}}(t);if(""===e||null==e)return r.plainObjects?Object.create(null):{};for(var n="string"==typeof e?function(e,t){var r,n={},o=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,a=t.parameterLimit===1/0?void 0:t.parameterLimit,i=o.split(t.delimiter,a),s=-1,l=t.charset;if(t.charsetSentinel)for(r=0;r<i.length;++r)0===i[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===i[r]?l="utf-8":"utf8=%26%2310003%3B"===i[r]&&(l="iso-8859-1"),s=r,r=i.length);for(r=0;r<i.length;++r)if(r!==s){var c,p,u=i[r],d=u.indexOf("]="),h=-1===d?u.indexOf("="):d+1;-1===h?(c=t.decoder(u,k$.decoder,l,"key"),p=t.strictNullHandling?null:""):(c=t.decoder(u.slice(0,h),k$.decoder,l,"key"),p=x$.maybeMap(A$(u.slice(h+1),t),(function(e){return t.decoder(e,k$.decoder,l,"value")}))),p&&t.interpretNumericEntities&&"iso-8859-1"===l&&(p=S$(p)),u.indexOf("[]=")>-1&&(p=$$(p)?[p]:p),w$.call(n,c)?n[c]=x$.combine(n[c],p):n[c]=p}return n}(e,r):e,o=r.plainObjects?Object.create(null):{},a=Object.keys(n),i=0;i<a.length;++i){var s=a[i],l=E$(s,n[s],r,"string"==typeof e);o=x$.merge(o,l,r)}return!0===r.allowSparse?o:x$.compact(o)},stringify:function(e,t){var r,n=e,o=function(e){if(!e)return g$;if(null!==e.encoder&&void 0!==e.encoder&&"function"!=typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||g$.charset;if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=l$.default;if(void 0!==e.format){if(!c$.call(l$.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=l$.formatters[r],o=g$.filter;return("function"==typeof e.filter||u$(e.filter))&&(o=e.filter),{addQueryPrefix:"boolean"==typeof e.addQueryPrefix?e.addQueryPrefix:g$.addQueryPrefix,allowDots:void 0===e.allowDots?g$.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:g$.charsetSentinel,delimiter:void 0===e.delimiter?g$.delimiter:e.delimiter,encode:"boolean"==typeof e.encode?e.encode:g$.encode,encoder:"function"==typeof e.encoder?e.encoder:g$.encoder,encodeValuesOnly:"boolean"==typeof e.encodeValuesOnly?e.encodeValuesOnly:g$.encodeValuesOnly,filter:o,format:r,formatter:n,serializeDate:"function"==typeof e.serializeDate?e.serializeDate:g$.serializeDate,skipNulls:"boolean"==typeof e.skipNulls?e.skipNulls:g$.skipNulls,sort:"function"==typeof e.sort?e.sort:null,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:g$.strictNullHandling}}(t);"function"==typeof o.filter?n=(0,o.filter)("",n):u$(o.filter)&&(r=o.filter);var a,i=[];if("object"!=typeof n||null===n)return"";a=t&&t.arrayFormat in p$?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var s=p$[a];r||(r=Object.keys(n)),o.sort&&r.sort(o.sort);for(var l=i$(),c=0;c<r.length;++c){var p=r[c];o.skipNulls&&null===n[p]||f$(i,b$(n[p],p,s,o.strictNullHandling,o.skipNulls,o.encode?o.encoder:null,o.filter,o.sort,o.allowDots,o.serializeDate,o.format,o.formatter,o.encodeValuesOnly,o.charset,l))}var u=i.join(o.delimiter),d=!0===o.addQueryPrefix?"?":"";return o.charsetSentinel&&("iso-8859-1"===o.charset?d+="utf8=%26%2310003%3B&":d+="utf8=%E2%9C%93&"),u.length>0?d+u:""}};function T$(e){return null==e}var C$={isNothing:T$,isObject:function(e){return"object"==typeof e&&null!==e},toArray:function(e){return Array.isArray(e)?e:T$(e)?[]:[e]},repeat:function(e,t){var r,n="";for(r=0;r<t;r+=1)n+=e;return n},isNegativeZero:function(e){return 0===e&&Number.NEGATIVE_INFINITY===1/e},extend:function(e,t){var r,n,o,a;if(t)for(r=0,n=(a=Object.keys(t)).length;r<n;r+=1)e[o=a[r]]=t[o];return e}};function _$(e,t){var r="",n=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(r+='in "'+e.mark.name+'" '),r+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!t&&e.mark.snippet&&(r+="\n\n"+e.mark.snippet),n+" "+r):n}function j$(e,t){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=t,this.message=_$(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack||""}j$.prototype=Object.create(Error.prototype),j$.prototype.constructor=j$,j$.prototype.toString=function(e){return this.name+": "+_$(this,e)};var I$=j$;function P$(e,t,r,n,o){var a="",i="",s=Math.floor(o/2)-1;return n-t>s&&(t=n-s+(a=" ... ").length),r-n>s&&(r=n+s-(i=" ...").length),{str:a+e.slice(t,r).replace(/\t/g,"→")+i,pos:n-t+a.length}}function R$(e,t){return C$.repeat(" ",t-e.length)+e}var L$=function(e,t){if(t=Object.create(t||null),!e.buffer)return null;t.maxLength||(t.maxLength=79),"number"!=typeof t.indent&&(t.indent=1),"number"!=typeof t.linesBefore&&(t.linesBefore=3),"number"!=typeof t.linesAfter&&(t.linesAfter=2);for(var r,n=/\r?\n|\r|\0/g,o=[0],a=[],i=-1;r=n.exec(e.buffer);)a.push(r.index),o.push(r.index+r[0].length),e.position<=r.index&&i<0&&(i=o.length-2);i<0&&(i=o.length-1);var s,l,c="",p=Math.min(e.line+t.linesAfter,a.length).toString().length,u=t.maxLength-(t.indent+p+3);for(s=1;s<=t.linesBefore&&!(i-s<0);s++)l=P$(e.buffer,o[i-s],a[i-s],e.position-(o[i]-o[i-s]),u),c=C$.repeat(" ",t.indent)+R$((e.line-s+1).toString(),p)+" | "+l.str+"\n"+c;for(l=P$(e.buffer,o[i],a[i],e.position,u),c+=C$.repeat(" ",t.indent)+R$((e.line+1).toString(),p)+" | "+l.str+"\n",c+=C$.repeat("-",t.indent+p+3+l.pos)+"^\n",s=1;s<=t.linesAfter&&!(i+s>=a.length);s++)l=P$(e.buffer,o[i+s],a[i+s],e.position-(o[i]-o[i+s]),u),c+=C$.repeat(" ",t.indent)+R$((e.line+s+1).toString(),p)+" | "+l.str+"\n";return c.replace(/\n$/,"")},D$=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],F$=["scalar","sequence","mapping"];var B$=function(e,t){if(t=t||{},Object.keys(t).forEach((function(t){if(-1===D$.indexOf(t))throw new I$('Unknown option "'+t+'" is met in definition of "'+e+'" YAML type.')})),this.options=t,this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(e){return e},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.representName=t.representName||null,this.defaultStyle=t.defaultStyle||null,this.multi=t.multi||!1,this.styleAliases=function(e){var t={};return null!==e&&Object.keys(e).forEach((function(r){e[r].forEach((function(e){t[String(e)]=r}))})),t}(t.styleAliases||null),-1===F$.indexOf(this.kind))throw new I$('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')};function N$(e,t){var r=[];return e[t].forEach((function(e){var t=r.length;r.forEach((function(r,n){r.tag===e.tag&&r.kind===e.kind&&r.multi===e.multi&&(t=n)})),r[t]=e})),r}function z$(e){return this.extend(e)}z$.prototype.extend=function(e){var t=[],r=[];if(e instanceof B$)r.push(e);else if(Array.isArray(e))r=r.concat(e);else{if(!e||!Array.isArray(e.implicit)&&!Array.isArray(e.explicit))throw new I$("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");e.implicit&&(t=t.concat(e.implicit)),e.explicit&&(r=r.concat(e.explicit))}t.forEach((function(e){if(!(e instanceof B$))throw new I$("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(e.loadKind&&"scalar"!==e.loadKind)throw new I$("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(e.multi)throw new I$("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")})),r.forEach((function(e){if(!(e instanceof B$))throw new I$("Specified list of YAML types (or a single Type object) contains a non-Type object.")}));var n=Object.create(z$.prototype);return n.implicit=(this.implicit||[]).concat(t),n.explicit=(this.explicit||[]).concat(r),n.compiledImplicit=N$(n,"implicit"),n.compiledExplicit=N$(n,"explicit"),n.compiledTypeMap=function(){var e,t,r={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function n(e){e.multi?(r.multi[e.kind].push(e),r.multi.fallback.push(e)):r[e.kind][e.tag]=r.fallback[e.tag]=e}for(e=0,t=arguments.length;e<t;e+=1)arguments[e].forEach(n);return r}(n.compiledImplicit,n.compiledExplicit),n};var U$=z$,q$=new B$("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return null!==e?e:""}}),M$=new B$("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return null!==e?e:[]}}),H$=new B$("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return null!==e?e:{}}}),W$=new U$({explicit:[q$,M$,H$]});var V$=new B$("tag:yaml.org,2002:null",{kind:"scalar",resolve:function(e){if(null===e)return!0;var t=e.length;return 1===t&&"~"===e||4===t&&("null"===e||"Null"===e||"NULL"===e)},construct:function(){return null},predicate:function(e){return null===e},represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});var G$=new B$("tag:yaml.org,2002:bool",{kind:"scalar",resolve:function(e){if(null===e)return!1;var t=e.length;return 4===t&&("true"===e||"True"===e||"TRUE"===e)||5===t&&("false"===e||"False"===e||"FALSE"===e)},construct:function(e){return"true"===e||"True"===e||"TRUE"===e},predicate:function(e){return"[object Boolean]"===Object.prototype.toString.call(e)},represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function K$(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function J$(e){return 48<=e&&e<=55}function Y$(e){return 48<=e&&e<=57}var Z$=new B$("tag:yaml.org,2002:int",{kind:"scalar",resolve:function(e){if(null===e)return!1;var t,r=e.length,n=0,o=!1;if(!r)return!1;if("-"!==(t=e[n])&&"+"!==t||(t=e[++n]),"0"===t){if(n+1===r)return!0;if("b"===(t=e[++n])){for(n++;n<r;n++)if("_"!==(t=e[n])){if("0"!==t&&"1"!==t)return!1;o=!0}return o&&"_"!==t}if("x"===t){for(n++;n<r;n++)if("_"!==(t=e[n])){if(!K$(e.charCodeAt(n)))return!1;o=!0}return o&&"_"!==t}if("o"===t){for(n++;n<r;n++)if("_"!==(t=e[n])){if(!J$(e.charCodeAt(n)))return!1;o=!0}return o&&"_"!==t}}if("_"===t)return!1;for(;n<r;n++)if("_"!==(t=e[n])){if(!Y$(e.charCodeAt(n)))return!1;o=!0}return!(!o||"_"===t)},construct:function(e){var t,r=e,n=1;if(-1!==r.indexOf("_")&&(r=r.replace(/_/g,"")),"-"!==(t=r[0])&&"+"!==t||("-"===t&&(n=-1),t=(r=r.slice(1))[0]),"0"===r)return 0;if("0"===t){if("b"===r[1])return n*parseInt(r.slice(2),2);if("x"===r[1])return n*parseInt(r.slice(2),16);if("o"===r[1])return n*parseInt(r.slice(2),8)}return n*parseInt(r,10)},predicate:function(e){return"[object Number]"===Object.prototype.toString.call(e)&&e%1==0&&!C$.isNegativeZero(e)},represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),Q$=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");var X$=/^[-+]?[0-9]+e/;var ek=new B$("tag:yaml.org,2002:float",{kind:"scalar",resolve:function(e){return null!==e&&!(!Q$.test(e)||"_"===e[e.length-1])},construct:function(e){var t,r;return r="-"===(t=e.replace(/_/g,"").toLowerCase())[0]?-1:1,"+-".indexOf(t[0])>=0&&(t=t.slice(1)),".inf"===t?1===r?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:".nan"===t?NaN:r*parseFloat(t,10)},predicate:function(e){return"[object Number]"===Object.prototype.toString.call(e)&&(e%1!=0||C$.isNegativeZero(e))},represent:function(e,t){var r;if(isNaN(e))switch(t){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(t){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(t){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(C$.isNegativeZero(e))return"-0.0";return r=e.toString(10),X$.test(r)?r.replace("e",".e"):r},defaultStyle:"lowercase"}),tk=W$.extend({implicit:[V$,G$,Z$,ek]}),rk=tk,nk=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),ok=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");var ak=new B$("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:function(e){return null!==e&&(null!==nk.exec(e)||null!==ok.exec(e))},construct:function(e){var t,r,n,o,a,i,s,l,c=0,p=null;if(null===(t=nk.exec(e))&&(t=ok.exec(e)),null===t)throw new Error("Date resolve error");if(r=+t[1],n=+t[2]-1,o=+t[3],!t[4])return new Date(Date.UTC(r,n,o));if(a=+t[4],i=+t[5],s=+t[6],t[7]){for(c=t[7].slice(0,3);c.length<3;)c+="0";c=+c}return t[9]&&(p=6e4*(60*+t[10]+ +(t[11]||0)),"-"===t[9]&&(p=-p)),l=new Date(Date.UTC(r,n,o,a,i,s,c)),p&&l.setTime(l.getTime()-p),l},instanceOf:Date,represent:function(e){return e.toISOString()}});var ik=new B$("tag:yaml.org,2002:merge",{kind:"scalar",resolve:function(e){return"<<"===e||null===e}}),sk="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";var lk=new B$("tag:yaml.org,2002:binary",{kind:"scalar",resolve:function(e){if(null===e)return!1;var t,r,n=0,o=e.length,a=sk;for(r=0;r<o;r++)if(!((t=a.indexOf(e.charAt(r)))>64)){if(t<0)return!1;n+=6}return n%8==0},construct:function(e){var t,r,n=e.replace(/[\r\n=]/g,""),o=n.length,a=sk,i=0,s=[];for(t=0;t<o;t++)t%4==0&&t&&(s.push(i>>16&255),s.push(i>>8&255),s.push(255&i)),i=i<<6|a.indexOf(n.charAt(t));return 0===(r=o%4*6)?(s.push(i>>16&255),s.push(i>>8&255),s.push(255&i)):18===r?(s.push(i>>10&255),s.push(i>>2&255)):12===r&&s.push(i>>4&255),new Uint8Array(s)},predicate:function(e){return"[object Uint8Array]"===Object.prototype.toString.call(e)},represent:function(e){var t,r,n="",o=0,a=e.length,i=sk;for(t=0;t<a;t++)t%3==0&&t&&(n+=i[o>>18&63],n+=i[o>>12&63],n+=i[o>>6&63],n+=i[63&o]),o=(o<<8)+e[t];return 0===(r=a%3)?(n+=i[o>>18&63],n+=i[o>>12&63],n+=i[o>>6&63],n+=i[63&o]):2===r?(n+=i[o>>10&63],n+=i[o>>4&63],n+=i[o<<2&63],n+=i[64]):1===r&&(n+=i[o>>2&63],n+=i[o<<4&63],n+=i[64],n+=i[64]),n}}),ck=Object.prototype.hasOwnProperty,pk=Object.prototype.toString;var uk=new B$("tag:yaml.org,2002:omap",{kind:"sequence",resolve:function(e){if(null===e)return!0;var t,r,n,o,a,i=[],s=e;for(t=0,r=s.length;t<r;t+=1){if(n=s[t],a=!1,"[object Object]"!==pk.call(n))return!1;for(o in n)if(ck.call(n,o)){if(a)return!1;a=!0}if(!a)return!1;if(-1!==i.indexOf(o))return!1;i.push(o)}return!0},construct:function(e){return null!==e?e:[]}}),dk=Object.prototype.toString;var hk=new B$("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:function(e){if(null===e)return!0;var t,r,n,o,a,i=e;for(a=new Array(i.length),t=0,r=i.length;t<r;t+=1){if(n=i[t],"[object Object]"!==dk.call(n))return!1;if(1!==(o=Object.keys(n)).length)return!1;a[t]=[o[0],n[o[0]]]}return!0},construct:function(e){if(null===e)return[];var t,r,n,o,a,i=e;for(a=new Array(i.length),t=0,r=i.length;t<r;t+=1)n=i[t],o=Object.keys(n),a[t]=[o[0],n[o[0]]];return a}}),fk=Object.prototype.hasOwnProperty;var mk=new B$("tag:yaml.org,2002:set",{kind:"mapping",resolve:function(e){if(null===e)return!0;var t,r=e;for(t in r)if(fk.call(r,t)&&null!==r[t])return!1;return!0},construct:function(e){return null!==e?e:{}}}),yk=rk.extend({implicit:[ak,ik],explicit:[lk,uk,hk,mk]}),gk=Object.prototype.hasOwnProperty,vk=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,bk=/[\x85\u2028\u2029]/,xk=/[,\[\]\{\}]/,wk=/^(?:!|!!|![a-z\-]+!)$/i,$k=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function kk(e){return Object.prototype.toString.call(e)}function Sk(e){return 10===e||13===e}function Ak(e){return 9===e||32===e}function Ek(e){return 9===e||32===e||10===e||13===e}function Ok(e){return 44===e||91===e||93===e||123===e||125===e}function Tk(e){var t;return 48<=e&&e<=57?e-48:97<=(t=32|e)&&t<=102?t-97+10:-1}function Ck(e){return 120===e?2:117===e?4:85===e?8:0}function _k(e){return 48<=e&&e<=57?e-48:-1}function jk(e){return 48===e?"\0":97===e?"":98===e?"\b":116===e||9===e?"\t":110===e?"\n":118===e?"\v":102===e?"\f":114===e?"\r":101===e?"":32===e?" ":34===e?'"':47===e?"/":92===e?"\\":78===e?"":95===e?" ":76===e?"\u2028":80===e?"\u2029":""}function Ik(e){return e<=65535?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10),56320+(e-65536&1023))}for(var Pk=new Array(256),Rk=new Array(256),Lk=0;Lk<256;Lk++)Pk[Lk]=jk(Lk)?1:0,Rk[Lk]=jk(Lk);function Dk(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||yk,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function Fk(e,t){var r={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return r.snippet=L$(r),new I$(t,r)}function Bk(e,t){throw Fk(e,t)}function Nk(e,t){e.onWarning&&e.onWarning.call(null,Fk(e,t))}var zk={YAML:function(e,t,r){var n,o,a;null!==e.version&&Bk(e,"duplication of %YAML directive"),1!==r.length&&Bk(e,"YAML directive accepts exactly one argument"),null===(n=/^([0-9]+)\.([0-9]+)$/.exec(r[0]))&&Bk(e,"ill-formed argument of the YAML directive"),o=parseInt(n[1],10),a=parseInt(n[2],10),1!==o&&Bk(e,"unacceptable YAML version of the document"),e.version=r[0],e.checkLineBreaks=a<2,1!==a&&2!==a&&Nk(e,"unsupported YAML version of the document")},TAG:function(e,t,r){var n,o;2!==r.length&&Bk(e,"TAG directive accepts exactly two arguments"),n=r[0],o=r[1],wk.test(n)||Bk(e,"ill-formed tag handle (first argument) of the TAG directive"),gk.call(e.tagMap,n)&&Bk(e,'there is a previously declared suffix for "'+n+'" tag handle'),$k.test(o)||Bk(e,"ill-formed tag prefix (second argument) of the TAG directive");try{o=decodeURIComponent(o)}catch(t){Bk(e,"tag prefix is malformed: "+o)}e.tagMap[n]=o}};function Uk(e,t,r,n){var o,a,i,s;if(t<r){if(s=e.input.slice(t,r),n)for(o=0,a=s.length;o<a;o+=1)9===(i=s.charCodeAt(o))||32<=i&&i<=1114111||Bk(e,"expected valid JSON character");else vk.test(s)&&Bk(e,"the stream contains non-printable characters");e.result+=s}}function qk(e,t,r,n){var o,a,i,s;for(C$.isObject(r)||Bk(e,"cannot merge mappings; the provided source object is unacceptable"),i=0,s=(o=Object.keys(r)).length;i<s;i+=1)a=o[i],gk.call(t,a)||(t[a]=r[a],n[a]=!0)}function Mk(e,t,r,n,o,a,i,s,l){var c,p;if(Array.isArray(o))for(c=0,p=(o=Array.prototype.slice.call(o)).length;c<p;c+=1)Array.isArray(o[c])&&Bk(e,"nested arrays are not supported inside keys"),"object"==typeof o&&"[object Object]"===kk(o[c])&&(o[c]="[object Object]");if("object"==typeof o&&"[object Object]"===kk(o)&&(o="[object Object]"),o=String(o),null===t&&(t={}),"tag:yaml.org,2002:merge"===n)if(Array.isArray(a))for(c=0,p=a.length;c<p;c+=1)qk(e,t,a[c],r);else qk(e,t,a,r);else e.json||gk.call(r,o)||!gk.call(t,o)||(e.line=i||e.line,e.lineStart=s||e.lineStart,e.position=l||e.position,Bk(e,"duplicated mapping key")),"__proto__"===o?Object.defineProperty(t,o,{configurable:!0,enumerable:!0,writable:!0,value:a}):t[o]=a,delete r[o];return t}function Hk(e){var t;10===(t=e.input.charCodeAt(e.position))?e.position++:13===t?(e.position++,10===e.input.charCodeAt(e.position)&&e.position++):Bk(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function Wk(e,t,r){for(var n=0,o=e.input.charCodeAt(e.position);0!==o;){for(;Ak(o);)9===o&&-1===e.firstTabInLine&&(e.firstTabInLine=e.position),o=e.input.charCodeAt(++e.position);if(t&&35===o)do{o=e.input.charCodeAt(++e.position)}while(10!==o&&13!==o&&0!==o);if(!Sk(o))break;for(Hk(e),o=e.input.charCodeAt(e.position),n++,e.lineIndent=0;32===o;)e.lineIndent++,o=e.input.charCodeAt(++e.position)}return-1!==r&&0!==n&&e.lineIndent<r&&Nk(e,"deficient indentation"),n}function Vk(e){var t,r=e.position;return!(45!==(t=e.input.charCodeAt(r))&&46!==t||t!==e.input.charCodeAt(r+1)||t!==e.input.charCodeAt(r+2)||(r+=3,0!==(t=e.input.charCodeAt(r))&&!Ek(t)))}function Gk(e,t){1===t?e.result+=" ":t>1&&(e.result+=C$.repeat("\n",t-1))}function Kk(e,t){var r,n,o=e.tag,a=e.anchor,i=[],s=!1;if(-1!==e.firstTabInLine)return!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=i),n=e.input.charCodeAt(e.position);0!==n&&(-1!==e.firstTabInLine&&(e.position=e.firstTabInLine,Bk(e,"tab characters must not be used in indentation")),45===n)&&Ek(e.input.charCodeAt(e.position+1));)if(s=!0,e.position++,Wk(e,!0,-1)&&e.lineIndent<=t)i.push(null),n=e.input.charCodeAt(e.position);else if(r=e.line,Zk(e,t,3,!1,!0),i.push(e.result),Wk(e,!0,-1),n=e.input.charCodeAt(e.position),(e.line===r||e.lineIndent>t)&&0!==n)Bk(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break;return!!s&&(e.tag=o,e.anchor=a,e.kind="sequence",e.result=i,!0)}function Jk(e){var t,r,n,o,a=!1,i=!1;if(33!==(o=e.input.charCodeAt(e.position)))return!1;if(null!==e.tag&&Bk(e,"duplication of a tag property"),60===(o=e.input.charCodeAt(++e.position))?(a=!0,o=e.input.charCodeAt(++e.position)):33===o?(i=!0,r="!!",o=e.input.charCodeAt(++e.position)):r="!",t=e.position,a){do{o=e.input.charCodeAt(++e.position)}while(0!==o&&62!==o);e.position<e.length?(n=e.input.slice(t,e.position),o=e.input.charCodeAt(++e.position)):Bk(e,"unexpected end of the stream within a verbatim tag")}else{for(;0!==o&&!Ek(o);)33===o&&(i?Bk(e,"tag suffix cannot contain exclamation marks"):(r=e.input.slice(t-1,e.position+1),wk.test(r)||Bk(e,"named tag handle cannot contain such characters"),i=!0,t=e.position+1)),o=e.input.charCodeAt(++e.position);n=e.input.slice(t,e.position),xk.test(n)&&Bk(e,"tag suffix cannot contain flow indicator characters")}n&&!$k.test(n)&&Bk(e,"tag name cannot contain such characters: "+n);try{n=decodeURIComponent(n)}catch(t){Bk(e,"tag name is malformed: "+n)}return a?e.tag=n:gk.call(e.tagMap,r)?e.tag=e.tagMap[r]+n:"!"===r?e.tag="!"+n:"!!"===r?e.tag="tag:yaml.org,2002:"+n:Bk(e,'undeclared tag handle "'+r+'"'),!0}function Yk(e){var t,r;if(38!==(r=e.input.charCodeAt(e.position)))return!1;for(null!==e.anchor&&Bk(e,"duplication of an anchor property"),r=e.input.charCodeAt(++e.position),t=e.position;0!==r&&!Ek(r)&&!Ok(r);)r=e.input.charCodeAt(++e.position);return e.position===t&&Bk(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(t,e.position),!0}function Zk(e,t,r,n,o){var a,i,s,l,c,p,u,d,h,f=1,m=!1,y=!1;if(null!==e.listener&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,a=i=s=4===r||3===r,n&&Wk(e,!0,-1)&&(m=!0,e.lineIndent>t?f=1:e.lineIndent===t?f=0:e.lineIndent<t&&(f=-1)),1===f)for(;Jk(e)||Yk(e);)Wk(e,!0,-1)?(m=!0,s=a,e.lineIndent>t?f=1:e.lineIndent===t?f=0:e.lineIndent<t&&(f=-1)):s=!1;if(s&&(s=m||o),1!==f&&4!==r||(d=1===r||2===r?t:t+1,h=e.position-e.lineStart,1===f?s&&(Kk(e,h)||function(e,t,r){var n,o,a,i,s,l,c,p=e.tag,u=e.anchor,d={},h=Object.create(null),f=null,m=null,y=null,g=!1,v=!1;if(-1!==e.firstTabInLine)return!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=d),c=e.input.charCodeAt(e.position);0!==c;){if(g||-1===e.firstTabInLine||(e.position=e.firstTabInLine,Bk(e,"tab characters must not be used in indentation")),n=e.input.charCodeAt(e.position+1),a=e.line,63!==c&&58!==c||!Ek(n)){if(i=e.line,s=e.lineStart,l=e.position,!Zk(e,r,2,!1,!0))break;if(e.line===a){for(c=e.input.charCodeAt(e.position);Ak(c);)c=e.input.charCodeAt(++e.position);if(58===c)Ek(c=e.input.charCodeAt(++e.position))||Bk(e,"a whitespace character is expected after the key-value separator within a block mapping"),g&&(Mk(e,d,h,f,m,null,i,s,l),f=m=y=null),v=!0,g=!1,o=!1,f=e.tag,m=e.result;else{if(!v)return e.tag=p,e.anchor=u,!0;Bk(e,"can not read an implicit mapping pair; a colon is missed")}}else{if(!v)return e.tag=p,e.anchor=u,!0;Bk(e,"can not read a block mapping entry; a multiline key may not be an implicit key")}}else 63===c?(g&&(Mk(e,d,h,f,m,null,i,s,l),f=m=y=null),v=!0,g=!0,o=!0):g?(g=!1,o=!0):Bk(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,c=n;if((e.line===a||e.lineIndent>t)&&(g&&(i=e.line,s=e.lineStart,l=e.position),Zk(e,t,4,!0,o)&&(g?m=e.result:y=e.result),g||(Mk(e,d,h,f,m,y,i,s,l),f=m=y=null),Wk(e,!0,-1),c=e.input.charCodeAt(e.position)),(e.line===a||e.lineIndent>t)&&0!==c)Bk(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return g&&Mk(e,d,h,f,m,null,i,s,l),v&&(e.tag=p,e.anchor=u,e.kind="mapping",e.result=d),v}(e,h,d))||function(e,t){var r,n,o,a,i,s,l,c,p,u,d,h,f=!0,m=e.tag,y=e.anchor,g=Object.create(null);if(91===(h=e.input.charCodeAt(e.position)))i=93,c=!1,a=[];else{if(123!==h)return!1;i=125,c=!0,a={}}for(null!==e.anchor&&(e.anchorMap[e.anchor]=a),h=e.input.charCodeAt(++e.position);0!==h;){if(Wk(e,!0,t),(h=e.input.charCodeAt(e.position))===i)return e.position++,e.tag=m,e.anchor=y,e.kind=c?"mapping":"sequence",e.result=a,!0;f?44===h&&Bk(e,"expected the node content, but found ','"):Bk(e,"missed comma between flow collection entries"),d=null,s=l=!1,63===h&&Ek(e.input.charCodeAt(e.position+1))&&(s=l=!0,e.position++,Wk(e,!0,t)),r=e.line,n=e.lineStart,o=e.position,Zk(e,t,1,!1,!0),u=e.tag,p=e.result,Wk(e,!0,t),h=e.input.charCodeAt(e.position),!l&&e.line!==r||58!==h||(s=!0,h=e.input.charCodeAt(++e.position),Wk(e,!0,t),Zk(e,t,1,!1,!0),d=e.result),c?Mk(e,a,g,u,p,d,r,n,o):s?a.push(Mk(e,null,g,u,p,d,r,n,o)):a.push(p),Wk(e,!0,t),44===(h=e.input.charCodeAt(e.position))?(f=!0,h=e.input.charCodeAt(++e.position)):f=!1}Bk(e,"unexpected end of the stream within a flow collection")}(e,d)?y=!0:(i&&function(e,t){var r,n,o,a,i=1,s=!1,l=!1,c=t,p=0,u=!1;if(124===(a=e.input.charCodeAt(e.position)))n=!1;else{if(62!==a)return!1;n=!0}for(e.kind="scalar",e.result="";0!==a;)if(43===(a=e.input.charCodeAt(++e.position))||45===a)1===i?i=43===a?3:2:Bk(e,"repeat of a chomping mode identifier");else{if(!((o=_k(a))>=0))break;0===o?Bk(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):l?Bk(e,"repeat of an indentation width identifier"):(c=t+o-1,l=!0)}if(Ak(a)){do{a=e.input.charCodeAt(++e.position)}while(Ak(a));if(35===a)do{a=e.input.charCodeAt(++e.position)}while(!Sk(a)&&0!==a)}for(;0!==a;){for(Hk(e),e.lineIndent=0,a=e.input.charCodeAt(e.position);(!l||e.lineIndent<c)&&32===a;)e.lineIndent++,a=e.input.charCodeAt(++e.position);if(!l&&e.lineIndent>c&&(c=e.lineIndent),Sk(a))p++;else{if(e.lineIndent<c){3===i?e.result+=C$.repeat("\n",s?1+p:p):1===i&&s&&(e.result+="\n");break}for(n?Ak(a)?(u=!0,e.result+=C$.repeat("\n",s?1+p:p)):u?(u=!1,e.result+=C$.repeat("\n",p+1)):0===p?s&&(e.result+=" "):e.result+=C$.repeat("\n",p):e.result+=C$.repeat("\n",s?1+p:p),s=!0,l=!0,p=0,r=e.position;!Sk(a)&&0!==a;)a=e.input.charCodeAt(++e.position);Uk(e,r,e.position,!1)}}return!0}(e,d)||function(e,t){var r,n,o;if(39!==(r=e.input.charCodeAt(e.position)))return!1;for(e.kind="scalar",e.result="",e.position++,n=o=e.position;0!==(r=e.input.charCodeAt(e.position));)if(39===r){if(Uk(e,n,e.position,!0),39!==(r=e.input.charCodeAt(++e.position)))return!0;n=e.position,e.position++,o=e.position}else Sk(r)?(Uk(e,n,o,!0),Gk(e,Wk(e,!1,t)),n=o=e.position):e.position===e.lineStart&&Vk(e)?Bk(e,"unexpected end of the document within a single quoted scalar"):(e.position++,o=e.position);Bk(e,"unexpected end of the stream within a single quoted scalar")}(e,d)||function(e,t){var r,n,o,a,i,s;if(34!==(s=e.input.charCodeAt(e.position)))return!1;for(e.kind="scalar",e.result="",e.position++,r=n=e.position;0!==(s=e.input.charCodeAt(e.position));){if(34===s)return Uk(e,r,e.position,!0),e.position++,!0;if(92===s){if(Uk(e,r,e.position,!0),Sk(s=e.input.charCodeAt(++e.position)))Wk(e,!1,t);else if(s<256&&Pk[s])e.result+=Rk[s],e.position++;else if((i=Ck(s))>0){for(o=i,a=0;o>0;o--)(i=Tk(s=e.input.charCodeAt(++e.position)))>=0?a=(a<<4)+i:Bk(e,"expected hexadecimal character");e.result+=Ik(a),e.position++}else Bk(e,"unknown escape sequence");r=n=e.position}else Sk(s)?(Uk(e,r,n,!0),Gk(e,Wk(e,!1,t)),r=n=e.position):e.position===e.lineStart&&Vk(e)?Bk(e,"unexpected end of the document within a double quoted scalar"):(e.position++,n=e.position)}Bk(e,"unexpected end of the stream within a double quoted scalar")}(e,d)?y=!0:!function(e){var t,r,n;if(42!==(n=e.input.charCodeAt(e.position)))return!1;for(n=e.input.charCodeAt(++e.position),t=e.position;0!==n&&!Ek(n)&&!Ok(n);)n=e.input.charCodeAt(++e.position);return e.position===t&&Bk(e,"name of an alias node must contain at least one character"),r=e.input.slice(t,e.position),gk.call(e.anchorMap,r)||Bk(e,'unidentified alias "'+r+'"'),e.result=e.anchorMap[r],Wk(e,!0,-1),!0}(e)?function(e,t,r){var n,o,a,i,s,l,c,p,u=e.kind,d=e.result;if(Ek(p=e.input.charCodeAt(e.position))||Ok(p)||35===p||38===p||42===p||33===p||124===p||62===p||39===p||34===p||37===p||64===p||96===p)return!1;if((63===p||45===p)&&(Ek(n=e.input.charCodeAt(e.position+1))||r&&Ok(n)))return!1;for(e.kind="scalar",e.result="",o=a=e.position,i=!1;0!==p;){if(58===p){if(Ek(n=e.input.charCodeAt(e.position+1))||r&&Ok(n))break}else if(35===p){if(Ek(e.input.charCodeAt(e.position-1)))break}else{if(e.position===e.lineStart&&Vk(e)||r&&Ok(p))break;if(Sk(p)){if(s=e.line,l=e.lineStart,c=e.lineIndent,Wk(e,!1,-1),e.lineIndent>=t){i=!0,p=e.input.charCodeAt(e.position);continue}e.position=a,e.line=s,e.lineStart=l,e.lineIndent=c;break}}i&&(Uk(e,o,a,!1),Gk(e,e.line-s),o=a=e.position,i=!1),Ak(p)||(a=e.position+1),p=e.input.charCodeAt(++e.position)}return Uk(e,o,a,!1),!!e.result||(e.kind=u,e.result=d,!1)}(e,d,1===r)&&(y=!0,null===e.tag&&(e.tag="?")):(y=!0,null===e.tag&&null===e.anchor||Bk(e,"alias node should not have any properties")),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):0===f&&(y=s&&Kk(e,h))),null===e.tag)null!==e.anchor&&(e.anchorMap[e.anchor]=e.result);else if("?"===e.tag){for(null!==e.result&&"scalar"!==e.kind&&Bk(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),l=0,c=e.implicitTypes.length;l<c;l+=1)if((u=e.implicitTypes[l]).resolve(e.result)){e.result=u.construct(e.result),e.tag=u.tag,null!==e.anchor&&(e.anchorMap[e.anchor]=e.result);break}}else if("!"!==e.tag){if(gk.call(e.typeMap[e.kind||"fallback"],e.tag))u=e.typeMap[e.kind||"fallback"][e.tag];else for(u=null,l=0,c=(p=e.typeMap.multi[e.kind||"fallback"]).length;l<c;l+=1)if(e.tag.slice(0,p[l].tag.length)===p[l].tag){u=p[l];break}u||Bk(e,"unknown tag !<"+e.tag+">"),null!==e.result&&u.kind!==e.kind&&Bk(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+u.kind+'", not "'+e.kind+'"'),u.resolve(e.result,e.tag)?(e.result=u.construct(e.result,e.tag),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):Bk(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return null!==e.listener&&e.listener("close",e),null!==e.tag||null!==e.anchor||y}function Qk(e){var t,r,n,o,a=e.position,i=!1;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);0!==(o=e.input.charCodeAt(e.position))&&(Wk(e,!0,-1),o=e.input.charCodeAt(e.position),!(e.lineIndent>0||37!==o));){for(i=!0,o=e.input.charCodeAt(++e.position),t=e.position;0!==o&&!Ek(o);)o=e.input.charCodeAt(++e.position);for(n=[],(r=e.input.slice(t,e.position)).length<1&&Bk(e,"directive name must not be less than one character in length");0!==o;){for(;Ak(o);)o=e.input.charCodeAt(++e.position);if(35===o){do{o=e.input.charCodeAt(++e.position)}while(0!==o&&!Sk(o));break}if(Sk(o))break;for(t=e.position;0!==o&&!Ek(o);)o=e.input.charCodeAt(++e.position);n.push(e.input.slice(t,e.position))}0!==o&&Hk(e),gk.call(zk,r)?zk[r](e,r,n):Nk(e,'unknown document directive "'+r+'"')}Wk(e,!0,-1),0===e.lineIndent&&45===e.input.charCodeAt(e.position)&&45===e.input.charCodeAt(e.position+1)&&45===e.input.charCodeAt(e.position+2)?(e.position+=3,Wk(e,!0,-1)):i&&Bk(e,"directives end mark is expected"),Zk(e,e.lineIndent-1,4,!1,!0),Wk(e,!0,-1),e.checkLineBreaks&&bk.test(e.input.slice(a,e.position))&&Nk(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&Vk(e)?46===e.input.charCodeAt(e.position)&&(e.position+=3,Wk(e,!0,-1)):e.position<e.length-1&&Bk(e,"end of the stream or a document separator is expected")}function Xk(e,t){t=t||{},0!==(e=String(e)).length&&(10!==e.charCodeAt(e.length-1)&&13!==e.charCodeAt(e.length-1)&&(e+="\n"),65279===e.charCodeAt(0)&&(e=e.slice(1)));var r=new Dk(e,t),n=e.indexOf("\0");for(-1!==n&&(r.position=n,Bk(r,"null byte is not allowed in input")),r.input+="\0";32===r.input.charCodeAt(r.position);)r.lineIndent+=1,r.position+=1;for(;r.position<r.length-1;)Qk(r);return r.documents}var eS={loadAll:function(e,t,r){null!==t&&"object"==typeof t&&void 0===r&&(r=t,t=null);var n=Xk(e,r);if("function"!=typeof t)return n;for(var o=0,a=n.length;o<a;o+=1)t(n[o])},load:function(e,t){var r=Xk(e,t);if(0!==r.length){if(1===r.length)return r[0];throw new I$("expected a single document in the stream, but found more")}}},tS=Object.prototype.toString,rS=Object.prototype.hasOwnProperty,nS=65279,oS={0:"\\0",7:"\\a",8:"\\b",9:"\\t",10:"\\n",11:"\\v",12:"\\f",13:"\\r",27:"\\e",34:'\\"',92:"\\\\",133:"\\N",160:"\\_",8232:"\\L",8233:"\\P"},aS=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],iS=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function sS(e){var t,r,n;if(t=e.toString(16).toUpperCase(),e<=255)r="x",n=2;else if(e<=65535)r="u",n=4;else{if(!(e<=4294967295))throw new I$("code point within a string may not be greater than 0xFFFFFFFF");r="U",n=8}return"\\"+r+C$.repeat("0",n-t.length)+t}function lS(e){this.schema=e.schema||yk,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=C$.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=function(e,t){var r,n,o,a,i,s,l;if(null===t)return{};for(r={},o=0,a=(n=Object.keys(t)).length;o<a;o+=1)i=n[o],s=String(t[i]),"!!"===i.slice(0,2)&&(i="tag:yaml.org,2002:"+i.slice(2)),(l=e.compiledTypeMap.fallback[i])&&rS.call(l.styleAliases,s)&&(s=l.styleAliases[s]),r[i]=s;return r}(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.quotingType='"'===e.quotingType?2:1,this.forceQuotes=e.forceQuotes||!1,this.replacer="function"==typeof e.replacer?e.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function cS(e,t){for(var r,n=C$.repeat(" ",t),o=0,a=-1,i="",s=e.length;o<s;)-1===(a=e.indexOf("\n",o))?(r=e.slice(o),o=s):(r=e.slice(o,a+1),o=a+1),r.length&&"\n"!==r&&(i+=n),i+=r;return i}function pS(e,t){return"\n"+C$.repeat(" ",e.indent*t)}function uS(e){return 32===e||9===e}function dS(e){return 32<=e&&e<=126||161<=e&&e<=55295&&8232!==e&&8233!==e||57344<=e&&e<=65533&&e!==nS||65536<=e&&e<=1114111}function hS(e){return dS(e)&&e!==nS&&13!==e&&10!==e}function fS(e,t,r){var n=hS(e),o=n&&!uS(e);return(r?n:n&&44!==e&&91!==e&&93!==e&&123!==e&&125!==e)&&35!==e&&!(58===t&&!o)||hS(t)&&!uS(t)&&35===e||58===t&&o}function mS(e,t){var r,n=e.charCodeAt(t);return n>=55296&&n<=56319&&t+1<e.length&&(r=e.charCodeAt(t+1))>=56320&&r<=57343?1024*(n-55296)+r-56320+65536:n}function yS(e){return/^\n* /.test(e)}function gS(e,t,r,n,o,a,i,s){var l,c=0,p=null,u=!1,d=!1,h=-1!==n,f=-1,m=function(e){return dS(e)&&e!==nS&&!uS(e)&&45!==e&&63!==e&&58!==e&&44!==e&&91!==e&&93!==e&&123!==e&&125!==e&&35!==e&&38!==e&&42!==e&&33!==e&&124!==e&&61!==e&&62!==e&&39!==e&&34!==e&&37!==e&&64!==e&&96!==e}(mS(e,0))&&function(e){return!uS(e)&&58!==e}(mS(e,e.length-1));if(t||i)for(l=0;l<e.length;c>=65536?l+=2:l++){if(!dS(c=mS(e,l)))return 5;m=m&&fS(c,p,s),p=c}else{for(l=0;l<e.length;c>=65536?l+=2:l++){if(10===(c=mS(e,l)))u=!0,h&&(d=d||l-f-1>n&&" "!==e[f+1],f=l);else if(!dS(c))return 5;m=m&&fS(c,p,s),p=c}d=d||h&&l-f-1>n&&" "!==e[f+1]}return u||d?r>9&&yS(e)?5:i?2===a?5:2:d?4:3:!m||i||o(e)?2===a?5:2:1}function vS(e,t,r,n,o){e.dump=function(){if(0===t.length)return 2===e.quotingType?'""':"''";if(!e.noCompatMode&&(-1!==aS.indexOf(t)||iS.test(t)))return 2===e.quotingType?'"'+t+'"':"'"+t+"'";var a=e.indent*Math.max(1,r),i=-1===e.lineWidth?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-a),s=n||e.flowLevel>-1&&r>=e.flowLevel;switch(gS(t,s,e.indent,i,(function(t){return function(e,t){var r,n;for(r=0,n=e.implicitTypes.length;r<n;r+=1)if(e.implicitTypes[r].resolve(t))return!0;return!1}(e,t)}),e.quotingType,e.forceQuotes&&!n,o)){case 1:return t;case 2:return"'"+t.replace(/'/g,"''")+"'";case 3:return"|"+bS(t,e.indent)+xS(cS(t,a));case 4:return">"+bS(t,e.indent)+xS(cS(function(e,t){var r,n,o=/(\n+)([^\n]*)/g,a=(s=e.indexOf("\n"),s=-1!==s?s:e.length,o.lastIndex=s,wS(e.slice(0,s),t)),i="\n"===e[0]||" "===e[0];var s;for(;n=o.exec(e);){var l=n[1],c=n[2];r=" "===c[0],a+=l+(i||r||""===c?"":"\n")+wS(c,t),i=r}return a}(t,i),a));case 5:return'"'+function(e){for(var t,r="",n=0,o=0;o<e.length;n>=65536?o+=2:o++)n=mS(e,o),!(t=oS[n])&&dS(n)?(r+=e[o],n>=65536&&(r+=e[o+1])):r+=t||sS(n);return r}(t)+'"';default:throw new I$("impossible error: invalid scalar style")}}()}function bS(e,t){var r=yS(e)?String(t):"",n="\n"===e[e.length-1];return r+(n&&("\n"===e[e.length-2]||"\n"===e)?"+":n?"":"-")+"\n"}function xS(e){return"\n"===e[e.length-1]?e.slice(0,-1):e}function wS(e,t){if(""===e||" "===e[0])return e;for(var r,n,o=/ [^ ]/g,a=0,i=0,s=0,l="";r=o.exec(e);)(s=r.index)-a>t&&(n=i>a?i:s,l+="\n"+e.slice(a,n),a=n+1),i=s;return l+="\n",e.length-a>t&&i>a?l+=e.slice(a,i)+"\n"+e.slice(i+1):l+=e.slice(a),l.slice(1)}function $S(e,t,r,n){var o,a,i,s="",l=e.tag;for(o=0,a=r.length;o<a;o+=1)i=r[o],e.replacer&&(i=e.replacer.call(r,String(o),i)),(SS(e,t+1,i,!0,!0,!1,!0)||void 0===i&&SS(e,t+1,null,!0,!0,!1,!0))&&(n&&""===s||(s+=pS(e,t)),e.dump&&10===e.dump.charCodeAt(0)?s+="-":s+="- ",s+=e.dump);e.tag=l,e.dump=s||"[]"}function kS(e,t,r){var n,o,a,i,s,l;for(a=0,i=(o=r?e.explicitTypes:e.implicitTypes).length;a<i;a+=1)if(((s=o[a]).instanceOf||s.predicate)&&(!s.instanceOf||"object"==typeof t&&t instanceof s.instanceOf)&&(!s.predicate||s.predicate(t))){if(r?s.multi&&s.representName?e.tag=s.representName(t):e.tag=s.tag:e.tag="?",s.represent){if(l=e.styleMap[s.tag]||s.defaultStyle,"[object Function]"===tS.call(s.represent))n=s.represent(t,l);else{if(!rS.call(s.represent,l))throw new I$("!<"+s.tag+'> tag resolver accepts not "'+l+'" style');n=s.represent[l](t,l)}e.dump=n}return!0}return!1}function SS(e,t,r,n,o,a,i){e.tag=null,e.dump=r,kS(e,r,!1)||kS(e,r,!0);var s,l=tS.call(e.dump),c=n;n&&(n=e.flowLevel<0||e.flowLevel>t);var p,u,d="[object Object]"===l||"[object Array]"===l;if(d&&(u=-1!==(p=e.duplicates.indexOf(r))),(null!==e.tag&&"?"!==e.tag||u||2!==e.indent&&t>0)&&(o=!1),u&&e.usedDuplicates[p])e.dump="*ref_"+p;else{if(d&&u&&!e.usedDuplicates[p]&&(e.usedDuplicates[p]=!0),"[object Object]"===l)n&&0!==Object.keys(e.dump).length?(!function(e,t,r,n){var o,a,i,s,l,c,p="",u=e.tag,d=Object.keys(r);if(!0===e.sortKeys)d.sort();else if("function"==typeof e.sortKeys)d.sort(e.sortKeys);else if(e.sortKeys)throw new I$("sortKeys must be a boolean or a function");for(o=0,a=d.length;o<a;o+=1)c="",n&&""===p||(c+=pS(e,t)),s=r[i=d[o]],e.replacer&&(s=e.replacer.call(r,i,s)),SS(e,t+1,i,!0,!0,!0)&&((l=null!==e.tag&&"?"!==e.tag||e.dump&&e.dump.length>1024)&&(e.dump&&10===e.dump.charCodeAt(0)?c+="?":c+="? "),c+=e.dump,l&&(c+=pS(e,t)),SS(e,t+1,s,!0,l)&&(e.dump&&10===e.dump.charCodeAt(0)?c+=":":c+=": ",p+=c+=e.dump));e.tag=u,e.dump=p||"{}"}(e,t,e.dump,o),u&&(e.dump="&ref_"+p+e.dump)):(!function(e,t,r){var n,o,a,i,s,l="",c=e.tag,p=Object.keys(r);for(n=0,o=p.length;n<o;n+=1)s="",""!==l&&(s+=", "),e.condenseFlow&&(s+='"'),i=r[a=p[n]],e.replacer&&(i=e.replacer.call(r,a,i)),SS(e,t,a,!1,!1)&&(e.dump.length>1024&&(s+="? "),s+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),SS(e,t,i,!1,!1)&&(l+=s+=e.dump));e.tag=c,e.dump="{"+l+"}"}(e,t,e.dump),u&&(e.dump="&ref_"+p+" "+e.dump));else if("[object Array]"===l)n&&0!==e.dump.length?(e.noArrayIndent&&!i&&t>0?$S(e,t-1,e.dump,o):$S(e,t,e.dump,o),u&&(e.dump="&ref_"+p+e.dump)):(!function(e,t,r){var n,o,a,i="",s=e.tag;for(n=0,o=r.length;n<o;n+=1)a=r[n],e.replacer&&(a=e.replacer.call(r,String(n),a)),(SS(e,t,a,!1,!1)||void 0===a&&SS(e,t,null,!1,!1))&&(""!==i&&(i+=","+(e.condenseFlow?"":" ")),i+=e.dump);e.tag=s,e.dump="["+i+"]"}(e,t,e.dump),u&&(e.dump="&ref_"+p+" "+e.dump));else{if("[object String]"!==l){if("[object Undefined]"===l)return!1;if(e.skipInvalid)return!1;throw new I$("unacceptable kind of an object to dump "+l)}"?"!==e.tag&&vS(e,e.dump,t,a,c)}null!==e.tag&&"?"!==e.tag&&(s=encodeURI("!"===e.tag[0]?e.tag.slice(1):e.tag).replace(/!/g,"%21"),s="!"===e.tag[0]?"!"+s:"tag:yaml.org,2002:"===s.slice(0,18)?"!!"+s.slice(18):"!<"+s+">",e.dump=s+" "+e.dump)}return!0}function AS(e,t){var r,n,o=[],a=[];for(ES(e,o,a),r=0,n=a.length;r<n;r+=1)t.duplicates.push(o[a[r]]);t.usedDuplicates=new Array(n)}function ES(e,t,r){var n,o,a;if(null!==e&&"object"==typeof e)if(-1!==(o=t.indexOf(e)))-1===r.indexOf(o)&&r.push(o);else if(t.push(e),Array.isArray(e))for(o=0,a=e.length;o<a;o+=1)ES(e[o],t,r);else for(o=0,a=(n=Object.keys(e)).length;o<a;o+=1)ES(e[n[o]],t,r)}function OS(e,t){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+t+" instead, which is now safe by default.")}}var TS={Type:B$,Schema:U$,FAILSAFE_SCHEMA:W$,JSON_SCHEMA:tk,CORE_SCHEMA:rk,DEFAULT_SCHEMA:yk,load:eS.load,loadAll:eS.loadAll,dump:{dump:function(e,t){var r=new lS(t=t||{});r.noRefs||AS(e,r);var n=e;return r.replacer&&(n=r.replacer.call({"":n},"",n)),SS(r,0,n,!0,!0)?r.dump+"\n":""}}.dump,YAMLException:I$,types:{binary:lk,float:ek,map:H$,null:V$,pairs:hk,set:mk,timestamp:ak,bool:G$,int:Z$,merge:ik,omap:uk,seq:M$,str:q$},safeLoad:OS("safeLoad","load"),safeLoadAll:OS("safeLoadAll","loadAll"),safeDump:OS("safeDump","dump")};const CS="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:window,{FormData:_S,Blob:jS,File:IS}=CS;function PS(e){return function(e){if(Ch(e))return Rf(e)}(e)||function(e){if(void 0!==sh&&null!=Th(e)||null!=e["@@iterator"])return Pf(e)}(e)||Lf(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var RS=Jh,LS=function(e){return":/?#[]@!$&'()*+,;=".indexOf(e)>-1},DS=function(e){return/^[a-z0-9\-._~]+$/i.test(e)};function FS(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.escape,o=arguments.length>2?arguments[2]:void 0;return"number"==typeof e&&(e=e.toString()),"string"==typeof e&&e.length&&n?o?JSON.parse(e):Nb(t=PS(e)).call(t,(function(e){var t,r;if(DS(e))return e;if(LS(e)&&"unsafe"===n)return e;var o=new TextEncoder;return Nb(t=Nb(r=hb(o.encode(e))).call(r,(function(e){var t;return RS(t="0".concat(e.toString(16).toUpperCase())).call(t,-2)}))).call(t,(function(e){return"%".concat(e)})).join("")})).join(""):e}function BS(e){var t=e.value;return Array.isArray(t)?function(e){var t=e.key,r=e.value,n=e.style,o=e.explode,a=e.escape,i=function(e){return FS(e,{escape:a})};if("simple"===n)return Nb(r).call(r,(function(e){return i(e)})).join(",");if("label"===n)return".".concat(Nb(r).call(r,(function(e){return i(e)})).join("."));if("matrix"===n)return Nb(r).call(r,(function(e){return i(e)})).reduce((function(e,r){var n,a,i;return!e||o?Wb(a=Wb(i="".concat(e||"",";")).call(i,t,"=")).call(a,r):Wb(n="".concat(e,",")).call(n,r)}),"");if("form"===n){var s=o?"&".concat(t,"="):",";return Nb(r).call(r,(function(e){return i(e)})).join(s)}if("spaceDelimited"===n){var l=o?"".concat(t,"="):"";return Nb(r).call(r,(function(e){return i(e)})).join(" ".concat(l))}if("pipeDelimited"===n){var c=o?"".concat(t,"="):"";return Nb(r).call(r,(function(e){return i(e)})).join("|".concat(c))}return}(e):"object"===Bf(t)?function(e){var t=e.key,r=e.value,n=e.style,o=e.explode,a=e.escape,i=function(e){return FS(e,{escape:a})},s=zb(r);if("simple"===n)return s.reduce((function(e,t){var n,a,s,l=i(r[t]),c=o?"=":",",p=e?"".concat(e,","):"";return Wb(n=Wb(a=Wb(s="".concat(p)).call(s,t)).call(a,c)).call(n,l)}),"");if("label"===n)return s.reduce((function(e,t){var n,a,s,l=i(r[t]),c=o?"=":".",p=e?"".concat(e,"."):".";return Wb(n=Wb(a=Wb(s="".concat(p)).call(s,t)).call(a,c)).call(n,l)}),"");if("matrix"===n&&o)return s.reduce((function(e,t){var n,o,a=i(r[t]),s=e?"".concat(e,";"):";";return Wb(n=Wb(o="".concat(s)).call(o,t,"=")).call(n,a)}),"");if("matrix"===n)return s.reduce((function(e,n){var o,a,s=i(r[n]),l=e?"".concat(e,","):";".concat(t,"=");return Wb(o=Wb(a="".concat(l)).call(a,n,",")).call(o,s)}),"");if("form"===n)return s.reduce((function(e,t){var n,a,s,l,c=i(r[t]),p=e?Wb(n="".concat(e)).call(n,o?"&":","):"",u=o?"=":",";return Wb(a=Wb(s=Wb(l="".concat(p)).call(l,t)).call(s,u)).call(a,c)}),"");return}(e):function(e){var t,r=e.key,n=e.value,o=e.style,a=e.escape,i=function(e){return FS(e,{escape:a})};if("simple"===o)return i(n);if("label"===o)return".".concat(i(n));if("matrix"===o)return Wb(t=";".concat(r,"=")).call(t,i(n));if("form"===o)return i(n);if("deepObject"===o)return i(n,{},!0);return}(e)}var NS=function(e,t){t.body=e},zS={serializeRes:WS,mergeInQueryOrForm:rA};function US(e){return qS.apply(this,arguments)}function qS(){return(qS=Uv(Mv.mark((function e(t){var r,n,o,a,i,s=arguments;return Mv.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=s.length>1&&void 0!==s[1]?s[1]:{},"object"===Bf(t)&&(t=(r=t).url),r.headers=r.headers||{},zS.mergeInQueryOrForm(r),r.headers&&zb(r.headers).forEach((function(e){var t=r.headers[e];"string"==typeof t&&(r.headers[e]=t.replace(/\n+/g," "))})),!r.requestInterceptor){e.next=12;break}return e.next=8,r.requestInterceptor(r);case 8:if(e.t0=e.sent,e.t0){e.next=11;break}e.t0=r;case 11:r=e.t0;case 12:return n=r.headers["content-type"]||r.headers["Content-Type"],/multipart\/form-data/i.test(n)&&r.body instanceof _S&&(delete r.headers["content-type"],delete r.headers["Content-Type"]),e.prev=14,e.next=17,(r.userFetch||fetch)(r.url,r);case 17:return o=e.sent,e.next=20,zS.serializeRes(o,t,r);case 20:if(o=e.sent,!r.responseInterceptor){e.next=28;break}return e.next=24,r.responseInterceptor(o);case 24:if(e.t1=e.sent,e.t1){e.next=27;break}e.t1=o;case 27:o=e.t1;case 28:e.next=39;break;case 30:if(e.prev=30,e.t2=e.catch(14),o){e.next=34;break}throw e.t2;case 34:throw(a=new Error(o.statusText||"response status is ".concat(o.status))).status=o.status,a.statusCode=o.status,a.responseError=e.t2,a;case 39:if(o.ok){e.next=45;break}throw(i=new Error(o.statusText||"response status is ".concat(o.status))).status=o.status,i.statusCode=o.status,i.response=o,i;case 45:return e.abrupt("return",o);case 46:case"end":return e.stop()}}),e,null,[[14,30]])})))).apply(this,arguments)}var MS=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return/(json|xml|yaml|text)\b/.test(e)};function HS(e,t){return t&&(0===t.indexOf("application/json")||t.indexOf("+json")>0)?JSON.parse(e):TS.load(e)}function WS(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.loadSpec,o=void 0!==n&&n,a={ok:e.ok,url:e.url||t,status:e.status,statusText:e.statusText,headers:GS(e.headers)},i=a.headers["content-type"],s=o||MS(i),l=s?e.text:e.blob||e.buffer;return l.call(e).then((function(e){if(a.text=e,a.data=e,s)try{var t=HS(e,i);a.body=t,a.obj=t}catch(e){a.parseError=e}return a}))}function VS(e){return ob(e).call(e,", ")?e.split(", "):e}function GS(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return"function"!=typeof db(e)?{}:hb(db(e).call(e)).reduce((function(e,t){var r=Nf(t,2),n=r[0],o=r[1];return e[n]=VS(o),e}),{})}function KS(e,t){return t||"undefined"==typeof navigator||(t=navigator),t&&"ReactNative"===t.product?!(!e||"object"!==Bf(e)||"string"!=typeof e.uri):void 0!==IS&&e instanceof IS||(void 0!==jS&&e instanceof jS||(!!ArrayBuffer.isView(e)||null!==e&&"object"===Bf(e)&&"function"==typeof e.pipe))}function JS(e,t){return Array.isArray(e)&&e.some((function(e){return KS(e,t)}))}var YS={form:",",spaceDelimited:"%20",pipeDelimited:"|"},ZS={csv:",",ssv:"%20",tsv:"%09",pipes:"|"};function QS(e,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=t.collectionFormat,o=t.allowEmptyValue,a=t.serializationOption,i=t.encoding,s="object"!==Bf(t)||Array.isArray(t)?t:t.value,l=r?function(e){return e.toString()}:function(e){return encodeURIComponent(e)},c=l(e);if(void 0===s&&o)return[[c,""]];if(KS(s)||JS(s))return[[c,s]];if(a)return XS(e,s,r,a);if(i){if([Bf(i.style),Bf(i.explode),Bf(i.allowReserved)].some((function(e){return"undefined"!==e}))){var p=i.style,u=i.explode,d=i.allowReserved;return XS(e,s,r,{style:p,explode:u,allowReserved:d})}if(i.contentType){if("application/json"===i.contentType){var h="string"==typeof s?s:Pb(s);return[[c,l(h)]]}return[[c,l(s.toString())]]}return"object"!==Bf(s)?[[c,l(s)]]:Array.isArray(s)&&s.every((function(e){return"object"!==Bf(e)}))?[[c,Nb(s).call(s,l).join(",")]]:[[c,l(Pb(s))]]}return"object"!==Bf(s)?[[c,l(s)]]:Array.isArray(s)?"multi"===n?[[c,Nb(s).call(s,l)]]:[[c,Nb(s).call(s,l).join(ZS[n||"csv"])]]:[[c,""]]}function XS(e,t,r,n){var o,a,i,s=n.style||"form",l=void 0===n.explode?"form"===s:n.explode,c=!r&&(n&&n.allowReserved?"unsafe":"reserved"),p=function(e){return FS(e,{escape:c})},u=r?function(e){return e}:function(e){return FS(e,{escape:c})};return"object"!==Bf(t)?[[u(e),p(t)]]:Array.isArray(t)?l?[[u(e),Nb(t).call(t,p)]]:[[u(e),Nb(t).call(t,p).join(YS[s])]]:"deepObject"===s?Nb(a=zb(t)).call(a,(function(r){var n;return[u(Wb(n="".concat(e,"[")).call(n,r,"]")),p(t[r])]})):l?Nb(i=zb(t)).call(i,(function(e){return[u(e),p(t[e])]})):[[u(e),Nb(o=zb(t)).call(o,(function(e){var r;return[Wb(r="".concat(u(e),",")).call(r,p(t[e]))]})).join(",")]]}function eA(e){return ex(e).reduce((function(e,t){var r,n=Nf(t,2),o=Df(QS(n[0],n[1],!0));try{for(o.s();!(r=o.n()).done;){var a=Nf(r.value,2),i=a[0],s=a[1];if(Array.isArray(s)){var l,c=Df(s);try{for(c.s();!(l=c.n()).done;){var p=l.value;if(ArrayBuffer.isView(p)){var u=new jS([p]);e.append(i,u)}else e.append(i,p)}}catch(e){c.e(e)}finally{c.f()}}else if(ArrayBuffer.isView(s)){var d=new jS([s]);e.append(i,d)}else e.append(i,s)}}catch(e){o.e(e)}finally{o.f()}return e}),new _S)}function tA(e){var t=zb(e).reduce((function(t,r){var n,o=Df(QS(r,e[r]));try{for(o.s();!(n=o.n()).done;){var a=Nf(n.value,2),i=a[0],s=a[1];t[i]=s}}catch(e){o.e(e)}finally{o.f()}return t}),{});return O$.stringify(t,{encode:!1,indices:!1})||""}function rA(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.url,r=void 0===t?"":t,n=e.query,o=e.form,a=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n=tx(t).call(t,(function(e){return e})).join("&");return n?"?".concat(n):""};if(o){var i=zb(o).some((function(e){var t=o[e].value;return KS(t)||JS(t)})),s=e.headers["content-type"]||e.headers["Content-Type"];if(i||/multipart\/form-data/i.test(s)){var l=eA(e.form);NS(l,e)}else e.body=tA(o);delete e.form}if(n){var c=r.split("?"),p=Nf(c,2),u=p[0],d=p[1],h="";if(d){var f=O$.parse(d),m=zb(n);m.forEach((function(e){return delete f[e]})),h=O$.stringify(f,{encode:!0})}var y=a(h,tA(n));e.url=u+y,delete e.query}return e}function nA(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function oA(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Pu(e,n.key,n)}}function aA(e,t,r){return t&&oA(e.prototype,t),r&&oA(e,r),Pu(e,"prototype",{writable:!1}),e}var iA=Po,sA=Us.find,lA="find",cA=!0;lA in[]&&Array(1).find((function(){cA=!1})),iA({target:"Array",proto:!0,forced:cA},{find:function(e){return sA(this,e,arguments.length>1?arguments[1]:void 0)}});var pA=hc("Array").find,uA=lr,dA=pA,hA=Array.prototype,fA=function(e){var t=e.find;return e===hA||uA(hA,e)&&t===hA.find?dA:t},mA=Lv,yA=Po,gA=dt,vA=zo,bA=Do,xA=Wo,wA=Kr,$A=Ps,kA=ai,SA=pc("splice"),AA=gA.TypeError,EA=Math.max,OA=Math.min,TA=9007199254740991,CA="Maximum allowed length exceeded";yA({target:"Array",proto:!0,forced:!SA},{splice:function(e,t){var r,n,o,a,i,s,l=wA(this),c=xA(l),p=vA(e,c),u=arguments.length;if(0===u?r=n=0:1===u?(r=0,n=c-p):(r=u-2,n=OA(EA(bA(t),0),c-p)),c+r-n>TA)throw AA(CA);for(o=$A(l,n),a=0;a<n;a++)(i=p+a)in l&&kA(o,a,l[i]);if(o.length=n,r<n){for(a=p;a<c-n;a++)s=a+r,(i=a+n)in l?l[s]=l[i]:delete l[s];for(a=c;a>c-n+r;a--)delete l[a-1]}else if(r>n)for(a=c-n;a>p;a--)s=a+r-1,(i=a+n-1)in l?l[s]=l[i]:delete l[s];for(a=0;a<r;a++)l[a+p]=arguments[a+2];return l.length=c-n+r,o}});var _A,jA=hc("Array").splice,IA=lr,PA=jA,RA=Array.prototype,LA=function(e){var t=e.splice;return e===RA||IA(RA,e)&&t===RA.splice?PA:t},DA=globalThis&&globalThis.__extends||(_A=function(e,t){return(_A=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}_A(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),FA=Object.prototype.hasOwnProperty;function BA(e,t){return FA.call(e,t)}function NA(e){if(Array.isArray(e)){for(var t=new Array(e.length),r=0;r<t.length;r++)t[r]=""+r;return t}if(Object.keys)return Object.keys(e);t=[];for(var n in e)BA(e,n)&&t.push(n);return t}function zA(e){switch(typeof e){case"object":return JSON.parse(JSON.stringify(e));case"undefined":return null;default:return e}}function UA(e){for(var t,r=0,n=e.length;r<n;){if(!((t=e.charCodeAt(r))>=48&&t<=57))return!1;r++}return!0}function qA(e){return-1===e.indexOf("/")&&-1===e.indexOf("~")?e:e.replace(/~/g,"~0").replace(/\//g,"~1")}function MA(e){return e.replace(/~1/g,"/").replace(/~0/g,"~")}function HA(e){if(void 0===e)return!0;if(e)if(Array.isArray(e)){for(var t=0,r=e.length;t<r;t++)if(HA(e[t]))return!0}else if("object"==typeof e){var n=NA(e),o=n.length;for(t=0;t<o;t++)if(HA(e[n[t]]))return!0}return!1}function WA(e,t){var r=[e];for(var n in t){var o="object"==typeof t[n]?JSON.stringify(t[n],null,2):t[n];void 0!==o&&r.push(n+": "+o)}return r.join("\n")}var VA=function(e){function t(t,r,n,o,a){var i=this.constructor,s=e.call(this,WA(t,{name:r,index:n,operation:o,tree:a}))||this;return s.name=r,s.index=n,s.operation=o,s.tree=a,Object.setPrototypeOf(s,i.prototype),s.message=WA(t,{name:r,index:n,operation:o,tree:a}),s}return DA(t,e),t}(Error),GA=VA,KA=zA,JA={add:function(e,t,r){return e[t]=this.value,{newDocument:r}},remove:function(e,t,r){var n=e[t];return delete e[t],{newDocument:r,removed:n}},replace:function(e,t,r){var n=e[t];return e[t]=this.value,{newDocument:r,removed:n}},move:function(e,t,r){var n=ZA(r,this.path);n&&(n=zA(n));var o=QA(r,{op:"remove",path:this.from}).removed;return QA(r,{op:"add",path:this.path,value:o}),{newDocument:r,removed:n}},copy:function(e,t,r){var n=ZA(r,this.from);return QA(r,{op:"add",path:this.path,value:zA(n)}),{newDocument:r}},test:function(e,t,r){return{newDocument:r,test:rE(e[t],this.value)}},_get:function(e,t,r){return this.value=e[t],{newDocument:r}}},YA={add:function(e,t,r){return UA(t)?e.splice(t,0,this.value):e[t]=this.value,{newDocument:r,index:t}},remove:function(e,t,r){return{newDocument:r,removed:e.splice(t,1)[0]}},replace:function(e,t,r){var n=e[t];return e[t]=this.value,{newDocument:r,removed:n}},move:JA.move,copy:JA.copy,test:JA.test,_get:JA._get};function ZA(e,t){if(""==t)return e;var r={op:"_get",path:t};return QA(e,r),r.value}function QA(e,t,r,n,o,a){if(void 0===r&&(r=!1),void 0===n&&(n=!0),void 0===o&&(o=!0),void 0===a&&(a=0),r&&("function"==typeof r?r(t,0,e,t.path):eE(t,0)),""===t.path){var i={newDocument:e};if("add"===t.op)return i.newDocument=t.value,i;if("replace"===t.op)return i.newDocument=t.value,i.removed=e,i;if("move"===t.op||"copy"===t.op)return i.newDocument=ZA(e,t.from),"move"===t.op&&(i.removed=e),i;if("test"===t.op){if(i.test=rE(e,t.value),!1===i.test)throw new GA("Test operation failed","TEST_OPERATION_FAILED",a,t,e);return i.newDocument=e,i}if("remove"===t.op)return i.removed=e,i.newDocument=null,i;if("_get"===t.op)return t.value=e,i;if(r)throw new GA("Operation `op` property is not one of operations defined in RFC-6902","OPERATION_OP_INVALID",a,t,e);return i}n||(e=zA(e));var s=(t.path||"").split("/"),l=e,c=1,p=s.length,u=void 0,d=void 0,h=void 0;for(h="function"==typeof r?r:eE;;){if((d=s[c])&&-1!=d.indexOf("~")&&(d=MA(d)),o&&"__proto__"==d)throw new TypeError("JSON-Patch: modifying `__proto__` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");if(r&&void 0===u&&(void 0===l[d]?u=s.slice(0,c).join("/"):c==p-1&&(u=t.path),void 0!==u&&h(t,0,e,u)),c++,Array.isArray(l)){if("-"===d)d=l.length;else{if(r&&!UA(d))throw new GA("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index","OPERATION_PATH_ILLEGAL_ARRAY_INDEX",a,t,e);UA(d)&&(d=~~d)}if(c>=p){if(r&&"add"===t.op&&d>l.length)throw new GA("The specified index MUST NOT be greater than the number of elements in the array","OPERATION_VALUE_OUT_OF_BOUNDS",a,t,e);if(!1===(i=YA[t.op].call(t,l,d,e)).test)throw new GA("Test operation failed","TEST_OPERATION_FAILED",a,t,e);return i}}else if(c>=p){if(!1===(i=JA[t.op].call(t,l,d,e)).test)throw new GA("Test operation failed","TEST_OPERATION_FAILED",a,t,e);return i}if(l=l[d],r&&c<p&&(!l||"object"!=typeof l))throw new GA("Cannot perform operation at the desired path","OPERATION_PATH_UNRESOLVABLE",a,t,e)}}function XA(e,t,r,n,o){if(void 0===n&&(n=!0),void 0===o&&(o=!0),r&&!Array.isArray(t))throw new GA("Patch sequence must be an array","SEQUENCE_NOT_AN_ARRAY");n||(e=zA(e));for(var a=new Array(t.length),i=0,s=t.length;i<s;i++)a[i]=QA(e,t[i],r,!0,o,i),e=a[i].newDocument;return a.newDocument=e,a}function eE(e,t,r,n){if("object"!=typeof e||null===e||Array.isArray(e))throw new GA("Operation is not an object","OPERATION_NOT_AN_OBJECT",t,e,r);if(!JA[e.op])throw new GA("Operation `op` property is not one of operations defined in RFC-6902","OPERATION_OP_INVALID",t,e,r);if("string"!=typeof e.path)throw new GA("Operation `path` property is not a string","OPERATION_PATH_INVALID",t,e,r);if(0!==e.path.indexOf("/")&&e.path.length>0)throw new GA('Operation `path` property must start with "/"',"OPERATION_PATH_INVALID",t,e,r);if(("move"===e.op||"copy"===e.op)&&"string"!=typeof e.from)throw new GA("Operation `from` property is not present (applicable in `move` and `copy` operations)","OPERATION_FROM_REQUIRED",t,e,r);if(("add"===e.op||"replace"===e.op||"test"===e.op)&&void 0===e.value)throw new GA("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_REQUIRED",t,e,r);if(("add"===e.op||"replace"===e.op||"test"===e.op)&&HA(e.value))throw new GA("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED",t,e,r);if(r)if("add"==e.op){var o=e.path.split("/").length,a=n.split("/").length;if(o!==a+1&&o!==a)throw new GA("Cannot perform an `add` operation at the desired path","OPERATION_PATH_CANNOT_ADD",t,e,r)}else if("replace"===e.op||"remove"===e.op||"_get"===e.op){if(e.path!==n)throw new GA("Cannot perform the operation at a path that does not exist","OPERATION_PATH_UNRESOLVABLE",t,e,r)}else if("move"===e.op||"copy"===e.op){var i=tE([{op:"_get",path:e.from,value:void 0}],r);if(i&&"OPERATION_PATH_UNRESOLVABLE"===i.name)throw new GA("Cannot perform the operation from a path that does not exist","OPERATION_FROM_UNRESOLVABLE",t,e,r)}}function tE(e,t,r){try{if(!Array.isArray(e))throw new GA("Patch sequence must be an array","SEQUENCE_NOT_AN_ARRAY");if(t)XA(zA(t),zA(e),r||!0);else{r=r||eE;for(var n=0;n<e.length;n++)r(e[n],n,t,void 0)}}catch(e){if(e instanceof GA)return e;throw e}}function rE(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){var r,n,o,a=Array.isArray(e),i=Array.isArray(t);if(a&&i){if((n=e.length)!=t.length)return!1;for(r=n;0!=r--;)if(!rE(e[r],t[r]))return!1;return!0}if(a!=i)return!1;var s=Object.keys(e);if((n=s.length)!==Object.keys(t).length)return!1;for(r=n;0!=r--;)if(!t.hasOwnProperty(s[r]))return!1;for(r=n;0!=r--;)if(!rE(e[o=s[r]],t[o]))return!1;return!0}return e!=e&&t!=t}var nE=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",JsonPatchError:GA,deepClone:KA,getValueByPointer:ZA,applyOperation:QA,applyPatch:XA,applyReducer:function(e,t,r){var n=QA(e,t);if(!1===n.test)throw new GA("Test operation failed","TEST_OPERATION_FAILED",r,t,e);return n.newDocument},validator:eE,validate:tE,_areEquals:rE}),oE=new WeakMap,aE=function(e){this.observers=new Map,this.obj=e},iE=function(e,t){this.callback=e,this.observer=t};function sE(e,t){void 0===t&&(t=!1);var r=oE.get(e.object);lE(r.value,e.object,e.patches,"",t),e.patches.length&&XA(r.value,e.patches);var n=e.patches;return n.length>0&&(e.patches=[],e.callback&&e.callback(n)),n}function lE(e,t,r,n,o){if(t!==e){"function"==typeof t.toJSON&&(t=t.toJSON());for(var a=NA(t),i=NA(e),s=!1,l=i.length-1;l>=0;l--){var c=e[u=i[l]];if(!BA(t,u)||void 0===t[u]&&void 0!==c&&!1===Array.isArray(t))Array.isArray(e)===Array.isArray(t)?(o&&r.push({op:"test",path:n+"/"+qA(u),value:zA(c)}),r.push({op:"remove",path:n+"/"+qA(u)}),s=!0):(o&&r.push({op:"test",path:n,value:e}),r.push({op:"replace",path:n,value:t}));else{var p=t[u];"object"==typeof c&&null!=c&&"object"==typeof p&&null!=p&&Array.isArray(c)===Array.isArray(p)?lE(c,p,r,n+"/"+qA(u),o):c!==p&&(o&&r.push({op:"test",path:n+"/"+qA(u),value:zA(c)}),r.push({op:"replace",path:n+"/"+qA(u),value:zA(p)}))}}if(s||a.length!=i.length)for(l=0;l<a.length;l++){var u;BA(e,u=a[l])||void 0===t[u]||r.push({op:"add",path:n+"/"+qA(u),value:zA(t[u])})}}}var cE=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",unobserve:function(e,t){t.unobserve()},observe:function(e,t){var r,n=function(e){return oE.get(e)}(e);if(n){var o=function(e,t){return e.observers.get(t)}(n,t);r=o&&o.observer}else n=new aE(e),oE.set(e,n);if(r)return r;if(r={},n.value=zA(e),t){r.callback=t,r.next=null;var a=function(){sE(r)},i=function(){clearTimeout(r.next),r.next=setTimeout(a)};"undefined"!=typeof window&&(window.addEventListener("mouseup",i),window.addEventListener("keyup",i),window.addEventListener("mousedown",i),window.addEventListener("keydown",i),window.addEventListener("change",i))}return r.patches=[],r.object=e,r.unobserve=function(){sE(r),clearTimeout(r.next),function(e,t){e.observers.delete(t.callback)}(n,r),"undefined"!=typeof window&&(window.removeEventListener("mouseup",i),window.removeEventListener("keyup",i),window.removeEventListener("mousedown",i),window.removeEventListener("keydown",i),window.removeEventListener("change",i))},n.observers.set(t,new iE(t,r)),r},generate:sE,compare:function(e,t,r){void 0===r&&(r=!1);var n=[];return lE(e,t,n,"",r),n}});Object.assign({},nE,cE,{JsonPatchError:VA,deepClone:zA,escapePathComponent:qA,unescapePathComponent:MA});var pE=function(e){return function(e){return!!e&&"object"==typeof e}(e)&&!function(e){var t=Object.prototype.toString.call(e);return"[object RegExp]"===t||"[object Date]"===t||function(e){return e.$$typeof===uE}(e)}(e)};var uE="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function dE(e,t){return!1!==t.clone&&t.isMergeableObject(e)?gE((r=e,Array.isArray(r)?[]:{}),e,t):e;var r}function hE(e,t,r){return e.concat(t).map((function(e){return dE(e,r)}))}function fE(e){return Object.keys(e).concat(function(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter((function(t){return e.propertyIsEnumerable(t)})):[]}(e))}function mE(e,t){try{return t in e}catch(e){return!1}}function yE(e,t,r){var n={};return r.isMergeableObject(e)&&fE(e).forEach((function(t){n[t]=dE(e[t],r)})),fE(t).forEach((function(o){(function(e,t){return mE(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))})(e,o)||(mE(e,o)&&r.isMergeableObject(t[o])?n[o]=function(e,t){if(!t.customMerge)return gE;var r=t.customMerge(e);return"function"==typeof r?r:gE}(o,r)(e[o],t[o],r):n[o]=dE(t[o],r))})),n}function gE(e,t,r){(r=r||{}).arrayMerge=r.arrayMerge||hE,r.isMergeableObject=r.isMergeableObject||pE,r.cloneUnlessOtherwiseSpecified=dE;var n=Array.isArray(t);return n===Array.isArray(e)?n?r.arrayMerge(e,t,r):yE(e,t,r):dE(t,r)}gE.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce((function(e,r){return gE(e,r,t)}),{})};var vE=gE,bE={add:function(e,t){return{op:"add",path:e,value:t}},replace:wE,remove:function(e){return{op:"remove",path:e}},merge:function(e,t){return{type:"mutation",op:"merge",path:e,value:t}},mergeDeep:function(e,t){return{type:"mutation",op:"mergeDeep",path:e,value:t}},context:function(e,t){return{type:"context",path:e,value:t}},getIn:function(e,t){return t.reduce((function(e,t){return void 0!==t&&e?e[t]:e}),e)},applyPatch:function(e,t,r){if(r=r||{},"merge"===(t=Du(Du({},t),{},{path:t.path&&xE(t.path)})).op){var n=RE(e,t.path);Yu(n,t.value),XA(e,[wE(t.path,n)])}else if("mergeDeep"===t.op){var o=RE(e,t.path),a=vE(o,t.value);e=XA(e,[wE(t.path,a)]).newDocument}else if("add"===t.op&&""===t.path&&TE(t.value)){var i=zb(t.value).reduce((function(e,r){return e.push({op:"add",path:"/".concat(xE(r)),value:t.value[r]}),e}),[]);XA(e,i)}else if("replace"===t.op&&""===t.path){var s=t.value;r.allowMetaPatches&&t.meta&&IE(t)&&(Array.isArray(t.value)||TE(t.value))&&(s=Du(Du({},s),t.meta)),e=s}else if(XA(e,[t]),r.allowMetaPatches&&t.meta&&IE(t)&&(Array.isArray(t.value)||TE(t.value))){var l=Du(Du({},RE(e,t.path)),t.meta);XA(e,[wE(t.path,l)])}return e},parentPathMatch:function(e,t){if(!Array.isArray(t))return!1;for(var r=0,n=t.length;r<n;r+=1)if(t[r]!==e[r])return!1;return!0},flatten:EE,fullyNormalizeArray:function(e){return OE(EE(AE(e)))},normalizeArray:AE,isPromise:function(e){return TE(e)&&CE(e.then)},forEachNew:function(e,t){try{return $E(e,SE,t)}catch(e){return e}},forEachNewPrimitive:function(e,t){try{return $E(e,kE,t)}catch(e){return e}},isJsonPatch:_E,isContextPatch:function(e){return PE(e)&&"context"===e.type},isPatch:PE,isMutation:jE,isAdditiveMutation:IE,isGenerator:function(e){return"[object GeneratorFunction]"===Object.prototype.toString.call(e)},isFunction:CE,isObject:TE,isError:function(e){return e instanceof Error}};function xE(e){return Array.isArray(e)?e.length<1?"":"/".concat(Nb(e).call(e,(function(e){return(e+"").replace(/~/g,"~0").replace(/\//g,"~1")})).join("/")):e}function wE(e,t,r){return{op:"replace",path:e,value:t,meta:r}}function $E(e,t,r){var n;return OE(EE(Nb(n=tx(e).call(e,IE)).call(n,(function(e){return t(e.value,r,e.path)}))||[]))}function kE(e,t,r){return r=r||[],Array.isArray(e)?Nb(e).call(e,(function(e,n){return kE(e,t,Wb(r).call(r,n))})):TE(e)?Nb(n=zb(e)).call(n,(function(n){return kE(e[n],t,Wb(r).call(r,n))})):t(e,r[r.length-1],r);var n}function SE(e,t,r){var n=[];if((r=r||[]).length>0){var o=t(e,r[r.length-1],r);o&&(n=Wb(n).call(n,o))}if(Array.isArray(e)){var a=Nb(e).call(e,(function(e,n){return SE(e,t,Wb(r).call(r,n))}));a&&(n=Wb(n).call(n,a))}else if(TE(e)){var i,s=Nb(i=zb(e)).call(i,(function(n){return SE(e[n],t,Wb(r).call(r,n))}));s&&(n=Wb(n).call(n,s))}return n=EE(n)}function AE(e){return Array.isArray(e)?e:[e]}function EE(e){var t;return Wb(t=[]).apply(t,PS(Nb(e).call(e,(function(e){return Array.isArray(e)?EE(e):e}))))}function OE(e){return tx(e).call(e,(function(e){return void 0!==e}))}function TE(e){return e&&"object"===Bf(e)}function CE(e){return e&&"function"==typeof e}function _E(e){if(PE(e)){var t=e.op;return"add"===t||"remove"===t||"replace"===t}return!1}function jE(e){return _E(e)||PE(e)&&"mutation"===e.type}function IE(e){return jE(e)&&("add"===e.op||"replace"===e.op||"merge"===e.op||"mergeDeep"===e.op)}function PE(e){return e&&"object"===Bf(e)}function RE(e,t){try{return ZA(e,t)}catch(e){return console.error(e),{}}}var LE={exports:{}},DE=ht((function(){if("function"==typeof ArrayBuffer){var e=new ArrayBuffer(8);Object.isExtensible(e)&&Object.defineProperty(e,"a",{value:8})}})),FE=ht,BE=tr,NE=qt,zE=DE,UE=Object.isExtensible,qE=FE((function(){UE(1)}))||zE?function(e){return!!BE(e)&&((!zE||"ArrayBuffer"!=NE(e))&&(!UE||UE(e)))}:UE,ME=!ht((function(){return Object.isExtensible(Object.preventExtensions({}))})),HE=Po,WE=At,VE=Zo,GE=tr,KE=Zr,JE=eo.f,YE=Qa,ZE=ti,QE=qE,XE=ME,eO=!1,tO=rn("meta"),rO=0,nO=function(e){JE(e,tO,{value:{objectID:"O"+rO++,weakData:{}}})},oO=LE.exports={enable:function(){oO.enable=function(){},eO=!0;var e=YE.f,t=WE([].splice),r={};r[tO]=1,e(r).length&&(YE.f=function(r){for(var n=e(r),o=0,a=n.length;o<a;o++)if(n[o]===tO){t(n,o,1);break}return n},HE({target:"Object",stat:!0,forced:!0},{getOwnPropertyNames:ZE.f}))},fastKey:function(e,t){if(!GE(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!KE(e,tO)){if(!QE(e))return"F";if(!t)return"E";nO(e)}return e[tO].objectID},getWeakData:function(e,t){if(!KE(e,tO)){if(!QE(e))return!0;if(!t)return!1;nO(e)}return e[tO].weakData},onFreeze:function(e){return XE&&eO&&QE(e)&&!KE(e,tO)&&nO(e),e}};VE[tO]=!0;var aO=Po,iO=dt,sO=LE.exports,lO=ht,cO=wo,pO=cm,uO=Wm,dO=Et,hO=tr,fO=Di,mO=eo.f,yO=Us.forEach,gO=Tt,vO=us.set,bO=us.getterFor,xO=At,wO=Bm,$O=LE.exports.getWeakData,kO=io,SO=tr,AO=Wm,EO=cm,OO=Zr,TO=us.set,CO=us.getterFor,_O=Us.find,jO=Us.findIndex,IO=xO([].splice),PO=0,RO=function(e){return e.frozen||(e.frozen=new LO)},LO=function(){this.entries=[]},DO=function(e,t){return _O(e.entries,(function(e){return e[0]===t}))};LO.prototype={get:function(e){var t=DO(this,e);if(t)return t[1]},has:function(e){return!!DO(this,e)},set:function(e,t){var r=DO(this,e);r?r[1]=t:this.entries.push([e,t])},delete:function(e){var t=jO(this.entries,(function(t){return t[0]===e}));return~t&&IO(this.entries,t,1),!!~t}};var FO,BO={getConstructor:function(e,t,r,n){var o=e((function(e,o){AO(e,a),TO(e,{type:t,id:PO++,frozen:void 0}),null!=o&&EO(o,e[n],{that:e,AS_ENTRIES:r})})),a=o.prototype,i=CO(t),s=function(e,t,r){var n=i(e),o=$O(kO(t),!0);return!0===o?RO(n).set(t,r):o[n.id]=r,e};return wO(a,{delete:function(e){var t=i(this);if(!SO(e))return!1;var r=$O(e);return!0===r?RO(t).delete(e):r&&OO(r,t.id)&&delete r[t.id]},has:function(e){var t=i(this);if(!SO(e))return!1;var r=$O(e);return!0===r?RO(t).has(e):r&&OO(r,t.id)}}),wO(a,r?{get:function(e){var t=i(this);if(SO(e)){var r=$O(e);return!0===r?RO(t).get(e):r?r[t.id]:void 0}},set:function(e,t){return s(this,e,t)}}:{add:function(e){return s(this,e,!0)}}),o}},NO=dt,zO=At,UO=Bm,qO=LE.exports,MO=function(e,t,r){var n,o=-1!==e.indexOf("Map"),a=-1!==e.indexOf("Weak"),i=o?"set":"add",s=iO[e],l=s&&s.prototype,c={};if(gO&&dO(s)&&(a||l.forEach&&!lO((function(){(new s).entries().next()})))){var p=(n=t((function(t,r){vO(uO(t,p),{type:e,collection:new s}),null!=r&&pO(r,t[i],{that:t,AS_ENTRIES:o})}))).prototype,u=bO(e);yO(["add","clear","delete","forEach","get","has","set","keys","values","entries"],(function(e){var t="add"==e||"set"==e;!(e in l)||a&&"clear"==e||cO(p,e,(function(r,n){var o=u(this).collection;if(!t&&a&&!hO(r))return"get"==e&&void 0;var i=o[e](0===r?0:r,n);return t?this:i}))})),a||mO(p,"size",{configurable:!0,get:function(){return u(this).collection.size}})}else n=r.getConstructor(t,e,o,i),sO.enable();return fO(n,e,!1,!0),c[e]=n,aO({global:!0,forced:!0},c),a||r.setStrong(n,e,o),n},HO=BO,WO=tr,VO=qE,GO=us.enforce,KO=Gi,JO=!NO.ActiveXObject&&"ActiveXObject"in NO,YO=function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}},ZO=MO("WeakMap",YO,HO);if(KO&&JO){FO=HO.getConstructor(YO,"WeakMap",!0),qO.enable();var QO=ZO.prototype,XO=zO(QO.delete),eT=zO(QO.has),tT=zO(QO.get),rT=zO(QO.set);UO(QO,{delete:function(e){if(WO(e)&&!VO(e)){var t=GO(this);return t.frozen||(t.frozen=new FO),XO(this,e)||t.frozen.delete(e)}return XO(this,e)},has:function(e){if(WO(e)&&!VO(e)){var t=GO(this);return t.frozen||(t.frozen=new FO),eT(this,e)||t.frozen.has(e)}return eT(this,e)},get:function(e){if(WO(e)&&!VO(e)){var t=GO(this);return t.frozen||(t.frozen=new FO),eT(this,e)?tT(this,e):t.frozen.get(e)}return tT(this,e)},set:function(e,t){if(WO(e)&&!VO(e)){var r=GO(this);r.frozen||(r.frozen=new FO),eT(this,e)?rT(this,e,t):r.frozen.set(e,t)}else rT(this,e,t);return this}})}var nT=rr.WeakMap,oT=ht,aT=fn("iterator"),iT=!oT((function(){var e=new URL("b?a=1&b=2&c=3","http://a"),t=e.searchParams,r="";return e.pathname="c%20d",t.forEach((function(e,n){t.delete("b"),r+=n+e})),!e.toJSON||!t.sort||"http://a/c%20d?a=1&c=3"!==e.href||"3"!==t.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!t[aT]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==r||"x"!==new URL("http://x",void 0).host})),sT=ui,lT=Math.floor,cT=function(e,t){var r=e.length,n=lT(r/2);return r<8?pT(e,t):uT(e,cT(sT(e,0,n),t),cT(sT(e,n),t),t)},pT=function(e,t){for(var r,n,o=e.length,a=1;a<o;){for(n=a,r=e[a];n&&t(e[n-1],r)>0;)e[n]=e[--n];n!==a++&&(e[n]=r)}return e},uT=function(e,t,r,n){for(var o=t.length,a=r.length,i=0,s=0;i<o||s<a;)e[i+s]=i<o&&s<a?n(t[i],r[s])<=0?t[i++]:r[s++]:i<o?t[i++]:r[s++];return e},dT=Po,hT=dt,fT=sr,mT=jt,yT=At,gT=iT,vT=xi,bT=Bm,xT=Di,wT=up,$T=us,kT=Wm,ST=Et,AT=Zr,ET=Xn,OT=ka,TT=io,CT=tr,_T=Ea,jT=Za,IT=Bt,PT=ff,RT=Oh,LT=ey,DT=cT,FT=fn("iterator"),BT="URLSearchParams",NT="URLSearchParamsIterator",zT=$T.set,UT=$T.getterFor(BT),qT=$T.getterFor(NT),MT=fT("fetch"),HT=fT("Request"),WT=fT("Headers"),VT=HT&&HT.prototype,GT=WT&&WT.prototype,KT=hT.RegExp,JT=hT.TypeError,YT=hT.decodeURIComponent,ZT=hT.encodeURIComponent,QT=yT("".charAt),XT=yT([].join),eC=yT([].push),tC=yT("".replace),rC=yT([].shift),nC=yT([].splice),oC=yT("".split),aC=yT("".slice),iC=/\+/g,sC=Array(4),lC=function(e){return sC[e-1]||(sC[e-1]=KT("((?:%[\\da-f]{2}){"+e+"})","gi"))},cC=function(e){try{return YT(e)}catch(t){return e}},pC=function(e){var t=tC(e,iC," "),r=4;try{return YT(t)}catch(e){for(;r;)t=tC(t,lC(r--),cC);return t}},uC=/[!'()~]|%20/g,dC={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},hC=function(e){return dC[e]},fC=function(e){return tC(ZT(e),uC,hC)},mC=wT((function(e,t){zT(this,{type:NT,iterator:PT(UT(e).entries),kind:t})}),"Iterator",(function(){var e=qT(this),t=e.kind,r=e.iterator.next(),n=r.value;return r.done||(r.value="keys"===t?n.key:"values"===t?n.value:[n.key,n.value]),r}),!0),yC=function(e){this.entries=[],this.url=null,void 0!==e&&(CT(e)?this.parseObject(e):this.parseQuery("string"==typeof e?"?"===QT(e,0)?aC(e,1):e:_T(e)))};yC.prototype={type:BT,bindURL:function(e){this.url=e,this.update()},parseObject:function(e){var t,r,n,o,a,i,s,l=RT(e);if(l)for(r=(t=PT(e,l)).next;!(n=mT(r,t)).done;){if(a=(o=PT(TT(n.value))).next,(i=mT(a,o)).done||(s=mT(a,o)).done||!mT(a,o).done)throw JT("Expected sequence with length 2");eC(this.entries,{key:_T(i.value),value:_T(s.value)})}else for(var c in e)AT(e,c)&&eC(this.entries,{key:c,value:_T(e[c])})},parseQuery:function(e){if(e)for(var t,r,n=oC(e,"&"),o=0;o<n.length;)(t=n[o++]).length&&(r=oC(t,"="),eC(this.entries,{key:pC(rC(r)),value:pC(XT(r,"="))}))},serialize:function(){for(var e,t=this.entries,r=[],n=0;n<t.length;)e=t[n++],eC(r,fC(e.key)+"="+fC(e.value));return XT(r,"&")},update:function(){this.entries.length=0,this.parseQuery(this.url.query)},updateURL:function(){this.url&&this.url.update()}};var gC=function(){kT(this,vC);var e=arguments.length>0?arguments[0]:void 0;zT(this,new yC(e))},vC=gC.prototype;if(bT(vC,{append:function(e,t){LT(arguments.length,2);var r=UT(this);eC(r.entries,{key:_T(e),value:_T(t)}),r.updateURL()},delete:function(e){LT(arguments.length,1);for(var t=UT(this),r=t.entries,n=_T(e),o=0;o<r.length;)r[o].key===n?nC(r,o,1):o++;t.updateURL()},get:function(e){LT(arguments.length,1);for(var t=UT(this).entries,r=_T(e),n=0;n<t.length;n++)if(t[n].key===r)return t[n].value;return null},getAll:function(e){LT(arguments.length,1);for(var t=UT(this).entries,r=_T(e),n=[],o=0;o<t.length;o++)t[o].key===r&&eC(n,t[o].value);return n},has:function(e){LT(arguments.length,1);for(var t=UT(this).entries,r=_T(e),n=0;n<t.length;)if(t[n++].key===r)return!0;return!1},set:function(e,t){LT(arguments.length,1);for(var r,n=UT(this),o=n.entries,a=!1,i=_T(e),s=_T(t),l=0;l<o.length;l++)(r=o[l]).key===i&&(a?nC(o,l--,1):(a=!0,r.value=s));a||eC(o,{key:i,value:s}),n.updateURL()},sort:function(){var e=UT(this);DT(e.entries,(function(e,t){return e.key>t.key?1:-1})),e.updateURL()},forEach:function(e){for(var t,r=UT(this).entries,n=ET(e,arguments.length>1?arguments[1]:void 0),o=0;o<r.length;)n((t=r[o++]).value,t.key,this)},keys:function(){return new mC(this,"keys")},values:function(){return new mC(this,"values")},entries:function(){return new mC(this,"entries")}},{enumerable:!0}),vT(vC,FT,vC.entries,{name:"entries"}),vT(vC,"toString",(function(){return UT(this).serialize()}),{enumerable:!0}),xT(gC,BT),dT({global:!0,forced:!gT},{URLSearchParams:gC}),!gT&&ST(WT)){var bC=yT(GT.has),xC=yT(GT.set),wC=function(e){if(CT(e)){var t,r=e.body;if(OT(r)===BT)return t=e.headers?new WT(e.headers):new WT,bC(t,"content-type")||xC(t,"content-type","application/x-www-form-urlencoded;charset=UTF-8"),jT(e,{body:IT(0,_T(r)),headers:IT(0,t)})}return e};if(ST(MT)&&dT({global:!0,enumerable:!0,forced:!0},{fetch:function(e){return MT(e,arguments.length>1?wC(arguments[1]):{})}}),ST(HT)){var $C=function(e){return kT(this,VT),new HT(e,arguments.length>1?wC(arguments[1]):{})};VT.constructor=$C,$C.prototype=VT,dT({global:!0,forced:!0},{Request:$C})}}var kC=rr.URLSearchParams;function SC(e,t){function r(){Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack;for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];this.message=r[0],t&&t.apply(this,r)}return r.prototype=new Error,r.prototype.name=e,r.prototype.constructor=r,r}var AC={exports:{}},EC=AC.exports=function(e){return new OC(e)};function OC(e){this.value=e}function TC(e,t,r){var n=[],o=[],a=!0;return function e(i){var s=r?CC(i):i,l={},c=!0,p={node:s,node_:i,path:[].concat(n),parent:o[o.length-1],parents:o,key:n.slice(-1)[0],isRoot:0===n.length,level:n.length,circular:null,update:function(e,t){p.isRoot||(p.parent.node[p.key]=e),p.node=e,t&&(c=!1)},delete:function(e){delete p.parent.node[p.key],e&&(c=!1)},remove:function(e){IC(p.parent.node)?p.parent.node.splice(p.key,1):delete p.parent.node[p.key],e&&(c=!1)},keys:null,before:function(e){l.before=e},after:function(e){l.after=e},pre:function(e){l.pre=e},post:function(e){l.post=e},stop:function(){a=!1},block:function(){c=!1}};if(!a)return p;function u(){if("object"==typeof p.node&&null!==p.node){p.keys&&p.node_===p.node||(p.keys=_C(p.node)),p.isLeaf=0==p.keys.length;for(var e=0;e<o.length;e++)if(o[e].node_===i){p.circular=o[e];break}}else p.isLeaf=!0,p.keys=null;p.notLeaf=!p.isLeaf,p.notRoot=!p.isRoot}u();var d=t.call(p,p.node);return void 0!==d&&p.update&&p.update(d),l.before&&l.before.call(p,p.node),c?("object"!=typeof p.node||null===p.node||p.circular||(o.push(p),u(),PC(p.keys,(function(t,o){n.push(t),l.pre&&l.pre.call(p,p.node[t],t);var a=e(p.node[t]);r&&RC.call(p.node,t)&&(p.node[t]=a.node),a.isLast=o==p.keys.length-1,a.isFirst=0==o,l.post&&l.post.call(p,a),n.pop()})),o.pop()),l.after&&l.after.call(p,p.node),p):p}(e).node}function CC(e){if("object"==typeof e&&null!==e){var t;if(IC(e))t=[];else if("[object Date]"===jC(e))t=new Date(e.getTime?e.getTime():e);else if(function(e){return"[object RegExp]"===jC(e)}(e))t=new RegExp(e);else if(function(e){return"[object Error]"===jC(e)}(e))t={message:e.message};else if(function(e){return"[object Boolean]"===jC(e)}(e))t=new Boolean(e);else if(function(e){return"[object Number]"===jC(e)}(e))t=new Number(e);else if(function(e){return"[object String]"===jC(e)}(e))t=new String(e);else if(Object.create&&Object.getPrototypeOf)t=Object.create(Object.getPrototypeOf(e));else if(e.constructor===Object)t={};else{var r=e.constructor&&e.constructor.prototype||e.__proto__||{},n=function(){};n.prototype=r,t=new n}return PC(_C(e),(function(r){t[r]=e[r]})),t}return e}OC.prototype.get=function(e){for(var t=this.value,r=0;r<e.length;r++){var n=e[r];if(!t||!RC.call(t,n)){t=void 0;break}t=t[n]}return t},OC.prototype.has=function(e){for(var t=this.value,r=0;r<e.length;r++){var n=e[r];if(!t||!RC.call(t,n))return!1;t=t[n]}return!0},OC.prototype.set=function(e,t){for(var r=this.value,n=0;n<e.length-1;n++){var o=e[n];RC.call(r,o)||(r[o]={}),r=r[o]}return r[e[n]]=t,t},OC.prototype.map=function(e){return TC(this.value,e,!0)},OC.prototype.forEach=function(e){return this.value=TC(this.value,e,!1),this.value},OC.prototype.reduce=function(e,t){var r=1===arguments.length,n=r?this.value:t;return this.forEach((function(t){this.isRoot&&r||(n=e.call(this,n,t))})),n},OC.prototype.paths=function(){var e=[];return this.forEach((function(t){e.push(this.path)})),e},OC.prototype.nodes=function(){var e=[];return this.forEach((function(t){e.push(this.node)})),e},OC.prototype.clone=function(){var e=[],t=[];return function r(n){for(var o=0;o<e.length;o++)if(e[o]===n)return t[o];if("object"==typeof n&&null!==n){var a=CC(n);return e.push(n),t.push(a),PC(_C(n),(function(e){a[e]=r(n[e])})),e.pop(),t.pop(),a}return n}(this.value)};var _C=Object.keys||function(e){var t=[];for(var r in e)t.push(r);return t};function jC(e){return Object.prototype.toString.call(e)}var IC=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},PC=function(e,t){if(e.forEach)return e.forEach(t);for(var r=0;r<e.length;r++)t(e[r],r,e)};PC(_C(OC.prototype),(function(e){EC[e]=function(t){var r=[].slice.call(arguments,1),n=new OC(t);return n[e].apply(n,r)}}));var RC=Object.hasOwnProperty||function(e,t){return t in e},LC=AC.exports,DC=["properties"],FC=["properties"],BC=["definitions","parameters","responses","securityDefinitions","components/schemas","components/responses","components/parameters","components/securitySchemes"],NC=["schema/example","items/example"];function zC(e){var t=e[e.length-1],r=e[e.length-2],n=e.join("/");return DC.indexOf(t)>-1&&-1===FC.indexOf(r)||BC.indexOf(n)>-1||NC.some((function(e){return n.indexOf(e)>-1}))}function UC(e,t){var r,n=Nf(e.split("#"),2),o=n[0],a=n[1],i=xd.resolve(o||"",t||"");return a?Wb(r="".concat(i,"#")).call(r,a):i}var qC="application/json, application/yaml",MC=/^([a-z]+:\/\/|\/\/)/i,HC=SC("JSONRefError",(function(e,t,r){this.originalError=r,Yu(this,t||{})})),WC={},VC=new nT,GC=[function(e){return"paths"===e[0]&&"responses"===e[3]&&"examples"===e[5]},function(e){return"paths"===e[0]&&"responses"===e[3]&&"content"===e[5]&&"example"===e[7]},function(e){return"paths"===e[0]&&"responses"===e[3]&&"content"===e[5]&&"examples"===e[7]&&"value"===e[9]},function(e){return"paths"===e[0]&&"requestBody"===e[3]&&"content"===e[4]&&"example"===e[6]},function(e){return"paths"===e[0]&&"requestBody"===e[3]&&"content"===e[4]&&"examples"===e[6]&&"value"===e[8]},function(e){return"paths"===e[0]&&"parameters"===e[2]&&"example"===e[4]},function(e){return"paths"===e[0]&&"parameters"===e[3]&&"example"===e[5]},function(e){return"paths"===e[0]&&"parameters"===e[2]&&"examples"===e[4]&&"value"===e[6]},function(e){return"paths"===e[0]&&"parameters"===e[3]&&"examples"===e[5]&&"value"===e[7]},function(e){return"paths"===e[0]&&"parameters"===e[2]&&"content"===e[4]&&"example"===e[6]},function(e){return"paths"===e[0]&&"parameters"===e[2]&&"content"===e[4]&&"examples"===e[6]&&"value"===e[8]},function(e){return"paths"===e[0]&&"parameters"===e[3]&&"content"===e[4]&&"example"===e[7]},function(e){return"paths"===e[0]&&"parameters"===e[3]&&"content"===e[5]&&"examples"===e[7]&&"value"===e[9]}],KC=Yu({key:"$ref",plugin:function(e,t,r,n){var o=n.getInstance(),a=RS(r).call(r,0,-1);if(!zC(a)&&!function(e){return GC.some((function(t){return t(e)}))}(a)){var i=n.getContext(r).baseDoc;if("string"!=typeof e)return new HC("$ref: must be a string (JSON-Ref)",{$ref:e,baseDoc:i,fullPath:r});var s,l,c,p=ZC(e),u=p[0],d=p[1]||"";try{s=i||u?JC(u,i):null}catch(t){return YC(t,{pointer:d,$ref:e,basePath:s,fullPath:r})}if(function(e,t,r,n){var o,a,i=VC.get(n);i||(i={},VC.set(n,i));var s=function(e){if(0===e.length)return"";return"/".concat(Nb(e).call(e,n_).join("/"))}(r),l=Wb(o="".concat(t||"<specmap-base>","#")).call(o,e),c=s.replace(/allOf\/\d+\/?/g,""),p=n.contextTree.get([]).baseDoc;if(t===p&&o_(c,e))return!0;var u="";if(r.some((function(e){var t;return u=Wb(t="".concat(u,"/")).call(t,n_(e)),i[u]&&i[u].some((function(e){return o_(e,l)||o_(l,e)}))})))return!0;return void(i[c]=Wb(a=i[c]||[]).call(a,l))}(d,s,a,n)&&!o.useCircularStructures){var h=UC(e,s);return e===h?null:bE.replace(r,h)}if(null==s?(c=t_(d),void 0===(l=n.get(c))&&(l=new HC("Could not resolve reference: ".concat(e),{pointer:d,$ref:e,baseDoc:i,fullPath:r}))):l=null!=(l=QC(s,d)).__value?l.__value:l.catch((function(t){throw YC(t,{pointer:d,$ref:e,baseDoc:i,fullPath:r})})),l instanceof Error)return[bE.remove(r),l];var f=UC(e,s),m=bE.replace(a,l,{$$ref:f});if(s&&s!==i)return[m,bE.context(a,{baseDoc:s})];try{if(!function(e,t){var r=[e];return t.path.reduce((function(e,t){return r.push(e[t]),e[t]}),e),n(t.value);function n(e){return bE.isObject(e)&&(r.indexOf(e)>=0||zb(e).some((function(t){return n(e[t])})))}}(n.state,m)||o.useCircularStructures)return m}catch(e){return null}}}},{docCache:WC,absoluteify:JC,clearCache:function(e){void 0!==e?delete WC[e]:zb(WC).forEach((function(e){delete WC[e]}))},JSONRefError:HC,wrapError:YC,getDoc:XC,split:ZC,extractFromDoc:QC,fetchJSON:function(e){return fetch(e,{headers:{Accept:qC},loadSpec:!0}).then((function(e){return e.text()})).then((function(e){return TS.load(e)}))},extract:e_,jsonPointerToArray:t_,unescapeJsonPointerToken:r_});function JC(e,t){if(!MC.test(e)){var r;if(!t)throw new HC(Wb(r="Tried to resolve a relative URL, without having a basePath. path: '".concat(e,"' basePath: '")).call(r,t,"'"));return xd.resolve(t,e)}return e}function YC(e,t){var r,n;e&&e.response&&e.response.body?r=Wb(n="".concat(e.response.body.code," ")).call(n,e.response.body.message):r=e.message;return new HC("Could not resolve reference: ".concat(r),t,e)}function ZC(e){return(e+"").split("#")}function QC(e,t){var r=WC[e];if(r&&!bE.isPromise(r))try{var n=e_(t,r);return Yu(mA.resolve(n),{__value:n})}catch(e){return mA.reject(e)}return XC(e).then((function(e){return e_(t,e)}))}function XC(e){var t=WC[e];return t?bE.isPromise(t)?t:mA.resolve(t):(WC[e]=KC.fetchJSON(e).then((function(t){return WC[e]=t,t})),WC[e])}function e_(e,t){var r=t_(e);if(r.length<1)return t;var n=bE.getIn(t,r);if(void 0===n)throw new HC("Could not resolve pointer: ".concat(e," does not exist in document"),{pointer:e});return n}function t_(e){var t;if("string"!=typeof e)throw new TypeError("Expected a string, got a ".concat(Bf(e)));return"/"===e[0]&&(e=e.substr(1)),""===e?[]:Nb(t=e.split("/")).call(t,r_)}function r_(e){return"string"!=typeof e?e:new kC("=".concat(e.replace(/~1/g,"/").replace(/~0/g,"~"))).get("")}function n_(e){var t,r=new kC([["",e.replace(/~/g,"~0").replace(/\//g,"~1")]]);return RS(t=r.toString()).call(t,1)}function o_(e,t){if(function(e){return!e||"/"===e||"#"===e}(t))return!0;var r=e.charAt(t.length),n=RS(t).call(t,-1);return 0===e.indexOf(t)&&(!r||"/"===r||"#"===r)&&"#"!==n}var a_={key:"allOf",plugin:function(e,t,r,n,o){if(!o.meta||!o.meta.$$ref){var a=RS(r).call(r,0,-1);if(!zC(a)){if(!Array.isArray(e)){var i=new TypeError("allOf must be an array");return i.fullPath=r,i}var s=!1,l=o.value;if(a.forEach((function(e){l&&(l=l[e])})),l=Du({},l),0!==zb(l).length){delete l.allOf;var c,p,u=[];if(u.push(n.replace(a,{})),e.forEach((function(e,t){if(!n.isObject(e)){if(s)return null;s=!0;var o=new TypeError("Elements in allOf must be objects");return o.fullPath=r,u.push(o)}u.push(n.mergeDeep(a,e));var i=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.specmap,o=r.getBaseUrlForNodePath,a=void 0===o?function(e){var r;return n.getContext(Wb(r=[]).call(r,PS(t),PS(e))).baseDoc}:o,i=r.targetKeys,s=void 0===i?["$ref","$$ref"]:i,l=[];return LC(e).forEach((function(){if(ob(s).call(s,this.key)&&"string"==typeof this.node){var e=this.path,r=Wb(t).call(t,this.path),o=UC(this.node,a(e));l.push(n.replace(r,o))}})),l}(e,RS(r).call(r,0,-1),{getBaseUrlForNodePath:function(e){var o;return n.getContext(Wb(o=[]).call(o,PS(r),[t],PS(e))).baseDoc},specmap:n});u.push.apply(u,PS(i))})),l.example)u.push(n.remove(Wb(c=[]).call(c,a,"example")));if(u.push(n.mergeDeep(a,l)),!l.$$ref)u.push(n.remove(Wb(p=[]).call(p,a,"$$ref")));return u}}}}},i_={key:"parameters",plugin:function(e,t,r,n){if(Array.isArray(e)&&e.length){var o=Yu([],e),a=RS(r).call(r,0,-1),i=Du({},bE.getIn(n.spec,a));return e.forEach((function(e,t){try{o[t].default=n.parameterMacro(i,e)}catch(e){var a=new Error(e);return a.fullPath=r,a}})),bE.replace(r,o)}return bE.replace(r,e)}},s_={key:"properties",plugin:function(e,t,r,n){var o=Du({},e);for(var a in e)try{o[a].default=n.modelPropertyMacro(o[a])}catch(e){var i=new Error(e);return i.fullPath=r,i}return bE.replace(r,o)}},l_=function(){function e(t){nA(this,e),this.root=c_(t||{})}return aA(e,[{key:"set",value:function(e,t){var r=this.getParent(e,!0);if(r){var n=e[e.length-1],o=r.children;o[n]?p_(o[n],t,r):o[n]=c_(t,r)}else p_(this.root,t,null)}},{key:"get",value:function(e){if((e=e||[]).length<1)return this.root.value;for(var t,r,n=this.root,o=0;o<e.length&&(r=e[o],(t=n.children)[r]);o+=1)n=t[r];return n&&n.protoValue}},{key:"getParent",value:function(e,t){return!e||e.length<1?null:e.length<2?this.root:RS(e).call(e,0,-1).reduce((function(e,r){if(!e)return e;var n=e.children;return!n[r]&&t&&(n[r]=c_(null,e)),n[r]}),this.root)}}]),e}();function c_(e,t){return p_({children:{}},e,t)}function p_(e,t,r){return e.value=t||{},e.protoValue=r?Du(Du({},r.protoValue),e.value):e.value,zb(e.children).forEach((function(t){var r=e.children[t];e.children[t]=p_(r,r.value,e)})),e}var u_=function(){},d_=function(){function e(t){var r,n,o=this;nA(this,e),Yu(this,{spec:"",debugLevel:"info",plugins:[],pluginHistory:{},errors:[],mutations:[],promisedPatches:[],state:{},patches:[],context:{},contextTree:new l_,showDebug:!1,allPatches:[],pluginProp:"specMap",libMethods:Yu(Object.create(this),bE,{getInstance:function(){return o}}),allowMetaPatches:!1},t),this.get=this._get.bind(this),this.getContext=this._getContext.bind(this),this.hasRun=this._hasRun.bind(this),this.wrappedPlugins=tx(r=Nb(n=this.plugins).call(n,this.wrapPlugin.bind(this))).call(r,bE.isFunction),this.patches.push(bE.add([],this.spec)),this.patches.push(bE.context([],this.context)),this.updatePatches(this.patches)}return aA(e,[{key:"debug",value:function(e){if(this.debugLevel===e){for(var t,r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];(t=console).log.apply(t,n)}}},{key:"verbose",value:function(e){if("verbose"===this.debugLevel){for(var t,r,n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];(t=console).log.apply(t,Wb(r=["[".concat(e,"]   ")]).call(r,o))}}},{key:"wrapPlugin",value:function(e,t){var r,n,o,a=this.pathDiscriminator,i=null;return e[this.pluginProp]?(i=e,r=e[this.pluginProp]):bE.isFunction(e)?r=e:bE.isObject(e)&&(n=e,o=function(e,t){return!Array.isArray(e)||e.every((function(e,r){return e===t[r]}))},r=Mv.mark((function e(t,r){var i,s,l,c,p,u;return Mv.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u=function(e,t,l){var c,p,d,h,f,m,y,g,v,b,x,w,$;return Mv.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:if(bE.isObject(e)){i.next=6;break}if(n.key!==t[t.length-1]){i.next=4;break}return i.next=4,n.plugin(e,n.key,t,r);case 4:i.next=30;break;case 6:c=t.length-1,p=t[c],d=t.indexOf("properties"),h="properties"===p&&c===d,f=r.allowMetaPatches&&s[e.$$ref],m=0,y=zb(e);case 12:if(!(m<y.length)){i.next=30;break}if(g=y[m],v=e[g],b=Wb(t).call(t,g),x=bE.isObject(v),w=e.$$ref,f){i.next=22;break}if(!x){i.next=22;break}return r.allowMetaPatches&&w&&(s[w]=!0),i.delegateYield(u(v,b,l),"t0",22);case 22:if(h||g!==n.key){i.next=27;break}if($=o(a,t),a&&!$){i.next=27;break}return i.next=27,n.plugin(v,g,b,r,l);case 27:m++,i.next=12;break;case 30:case"end":return i.stop()}}),i)},i=Mv.mark(u),s={},l=Df(tx(t).call(t,bE.isAdditiveMutation)),e.prev=4,l.s();case 6:if((c=l.n()).done){e.next=11;break}return p=c.value,e.delegateYield(u(p.value,p.path,p),"t0",9);case 9:e.next=6;break;case 11:e.next=16;break;case 13:e.prev=13,e.t1=e.catch(4),l.e(e.t1);case 16:return e.prev=16,l.f(),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[4,13,16,19]])}))),Yu(r.bind(i),{pluginName:e.name||t,isGenerator:bE.isGenerator(r)})}},{key:"nextPlugin",value:function(){var e,t=this;return fA(e=this.wrappedPlugins).call(e,(function(e){return t.getMutationsForPlugin(e).length>0}))}},{key:"nextPromisedPatch",value:function(){var e;if(this.promisedPatches.length>0)return mA.race(Nb(e=this.promisedPatches).call(e,(function(e){return e.value})))}},{key:"getPluginHistory",value:function(e){var t=this.constructor.getPluginName(e);return this.pluginHistory[t]||[]}},{key:"getPluginRunCount",value:function(e){return this.getPluginHistory(e).length}},{key:"getPluginHistoryTip",value:function(e){var t=this.getPluginHistory(e);return t&&t[t.length-1]||{}}},{key:"getPluginMutationIndex",value:function(e){var t=this.getPluginHistoryTip(e).mutationIndex;return"number"!=typeof t?-1:t}},{key:"updatePluginHistory",value:function(e,t){var r=this.constructor.getPluginName(e);this.pluginHistory[r]=this.pluginHistory[r]||[],this.pluginHistory[r].push(t)}},{key:"updatePatches",value:function(e){var t=this;bE.normalizeArray(e).forEach((function(e){if(e instanceof Error)t.errors.push(e);else try{if(!bE.isObject(e))return void t.debug("updatePatches","Got a non-object patch",e);if(t.showDebug&&t.allPatches.push(e),bE.isPromise(e.value))return t.promisedPatches.push(e),void t.promisedPatchThen(e);if(bE.isContextPatch(e))return void t.setContext(e.path,e.value);if(bE.isMutation(e))return void t.updateMutations(e)}catch(e){console.error(e),t.errors.push(e)}}))}},{key:"updateMutations",value:function(e){"object"===Bf(e.value)&&!Array.isArray(e.value)&&this.allowMetaPatches&&(e.value=Du({},e.value));var t=bE.applyPatch(this.state,e,{allowMetaPatches:this.allowMetaPatches});t&&(this.mutations.push(e),this.state=t)}},{key:"removePromisedPatch",value:function(e){var t,r=this.promisedPatches.indexOf(e);r<0?this.debug("Tried to remove a promisedPatch that isn't there!"):LA(t=this.promisedPatches).call(t,r,1)}},{key:"promisedPatchThen",value:function(e){var t=this;return e.value=e.value.then((function(r){var n=Du(Du({},e),{},{value:r});t.removePromisedPatch(e),t.updatePatches(n)})).catch((function(r){t.removePromisedPatch(e),t.updatePatches(r)})),e.value}},{key:"getMutations",value:function(e,t){var r;return e=e||0,"number"!=typeof t&&(t=this.mutations.length),RS(r=this.mutations).call(r,e,t)}},{key:"getCurrentMutations",value:function(){return this.getMutationsForPlugin(this.getCurrentPlugin())}},{key:"getMutationsForPlugin",value:function(e){var t=this.getPluginMutationIndex(e);return this.getMutations(t+1)}},{key:"getCurrentPlugin",value:function(){return this.currentPlugin}},{key:"getLib",value:function(){return this.libMethods}},{key:"_get",value:function(e){return bE.getIn(this.state,e)}},{key:"_getContext",value:function(e){return this.contextTree.get(e)}},{key:"setContext",value:function(e,t){return this.contextTree.set(e,t)}},{key:"_hasRun",value:function(e){return this.getPluginRunCount(this.getCurrentPlugin())>(e||0)}},{key:"dispatch",value:function(){var e,t=this,r=this,n=this.nextPlugin();if(!n){var o=this.nextPromisedPatch();if(o)return o.then((function(){return t.dispatch()})).catch((function(){return t.dispatch()}));var a={spec:this.state,errors:this.errors};return this.showDebug&&(a.patches=this.allPatches),mA.resolve(a)}if(r.pluginCount=r.pluginCount||{},r.pluginCount[n]=(r.pluginCount[n]||0)+1,r.pluginCount[n]>100)return mA.resolve({spec:r.state,errors:Wb(e=r.errors).call(e,new Error("We've reached a hard limit of ".concat(100," plugin runs")))});if(n!==this.currentPlugin&&this.promisedPatches.length){var i,s=Nb(i=this.promisedPatches).call(i,(function(e){return e.value}));return mA.all(Nb(s).call(s,(function(e){return e.then(u_,u_)}))).then((function(){return t.dispatch()}))}return function(){r.currentPlugin=n;var e=r.getCurrentMutations(),t=r.mutations.length-1;try{if(n.isGenerator){var o,a=Df(n(e,r.getLib()));try{for(a.s();!(o=a.n()).done;){l(o.value)}}catch(e){a.e(e)}finally{a.f()}}else{l(n(e,r.getLib()))}}catch(e){console.error(e),l([Yu(Object.create(e),{plugin:n})])}finally{r.updatePluginHistory(n,{mutationIndex:t})}return r.dispatch()}();function l(e){e&&(e=bE.fullyNormalizeArray(e),r.updatePatches(e,n))}}}],[{key:"getPluginName",value:function(e){return e.pluginName}},{key:"getPatchesOfType",value:function(e,t){return tx(e).call(e,t)}}]),e}();var h_={refs:KC,allOf:a_,parameters:i_,properties:s_},f_=function(e){return String.prototype.toLowerCase.call(e)},m_=function(e){return e.replace(/[^\w]/gi,"_")};function y_(e){var t=e.openapi;return!!t&&bd(t).call(t,"3")}function g_(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=n.v2OperationIdCompatibilityMode;if(!e||"object"!==Bf(e))return null;var a=(e.operationId||"").replace(/\s/g,"");return a.length?m_(e.operationId):v_(t,r,{v2OperationIdCompatibilityMode:o})}function v_(e,t){var r,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=n.v2OperationIdCompatibilityMode;if(o){var a,i,s=Wb(a="".concat(t.toLowerCase(),"_")).call(a,e).replace(/[\s!@#$%^&*()_+=[{\]};:<>|./?,\\'""-]/g,"_");return(s=s||Wb(i="".concat(e.substring(1),"_")).call(i,t)).replace(/((_){2,})/g,"_").replace(/^(_)*/g,"").replace(/([_])*$/g,"")}return Wb(r="".concat(f_(t))).call(r,m_(e))}function b_(e,t){var r;return Wb(r="".concat(f_(t),"-")).call(r,e)}function x_(e,t){return e&&e.paths?function(e,t){return w_(e,t,!0)||null}(e,(function(e){var r=e.pathName,n=e.method,o=e.operation;if(!o||"object"!==Bf(o))return!1;var a=o.operationId;return[g_(o,r,n),b_(r,n),a].some((function(e){return e&&e===t}))})):null}function w_(e,t,r){if(!e||"object"!==Bf(e)||!e.paths||"object"!==Bf(e.paths))return null;var n=e.paths;for(var o in n)for(var a in n[o])if("PARAMETERS"!==a.toUpperCase()){var i=n[o][a];if(i&&"object"===Bf(i)){var s={spec:e,pathName:o,method:a.toUpperCase(),operation:i},l=t(s);if(r&&l)return s}}}function $_(e){var t=e.spec,r=t.paths,n={};if(!r||t.$$normalized)return e;for(var o in r){var a,i=r[o];if(null!=i&&ob(a=["object","function"]).call(a,Bf(i))){var s=i.parameters,l=function(e){var r,a=i[e];if(null==a||!ob(r=["object","function"]).call(r,Bf(a)))return"continue";var l=g_(a,o,e);if(l){n[l]?n[l].push(a):n[l]=[a];var c=n[l];if(c.length>1)c.forEach((function(e,t){var r;e.__originalOperationId=e.__originalOperationId||e.operationId,e.operationId=Wb(r="".concat(l)).call(r,t+1)}));else if(void 0!==a.operationId){var p=c[0];p.__originalOperationId=p.__originalOperationId||a.operationId,p.operationId=l}}if("parameters"!==e){var u=[],d={};for(var h in t)"produces"!==h&&"consumes"!==h&&"security"!==h||(d[h]=t[h],u.push(d));if(s&&(d.parameters=s,u.push(d)),u.length){var f,m=Df(u);try{for(m.s();!(f=m.n()).done;){var y=f.value;for(var g in y)if(a[g]){if("parameters"===g){var v,b=Df(y[g]);try{var x=function(){var e=v.value;a[g].some((function(t){return t.name&&t.name===e.name||t.$ref&&t.$ref===e.$ref||t.$$ref&&t.$$ref===e.$$ref||t===e}))||a[g].push(e)};for(b.s();!(v=b.n()).done;)x()}catch(e){b.e(e)}finally{b.f()}}}else a[g]=y[g]}}catch(e){m.e(e)}finally{m.f()}}}};for(var c in i)l(c)}}return t.$$normalized=!0,e}function k_(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.requestInterceptor,n=t.responseInterceptor,o=e.withCredentials?"include":"same-origin";return function(t){return e({url:t,loadSpec:!0,requestInterceptor:r,responseInterceptor:n,headers:{Accept:qC},credentials:o}).then((function(e){return e.body}))}}function S_(e){var t=e.fetch,r=e.spec,n=e.url,o=e.mode,a=e.allowMetaPatches,i=void 0===a||a,s=e.pathDiscriminator,l=e.modelPropertyMacro,c=e.parameterMacro,p=e.requestInterceptor,u=e.responseInterceptor,d=e.skipNormalization,h=e.useCircularStructures,f=e.http,m=e.baseDoc;return m=m||n,f=t||f||US,r?y(r):k_(f,{requestInterceptor:p,responseInterceptor:u})(m).then(y);function y(e){m&&(h_.refs.docCache[m]=e),h_.refs.fetchJSON=k_(f,{requestInterceptor:p,responseInterceptor:u});var t,r=[h_.refs];return"function"==typeof c&&r.push(h_.parameters),"function"==typeof l&&r.push(h_.properties),"strict"!==o&&r.push(h_.allOf),(t={spec:e,context:{baseDoc:m},plugins:r,allowMetaPatches:i,pathDiscriminator:s,parameterMacro:c,modelPropertyMacro:l,useCircularStructures:h},new d_(t).dispatch()).then(d?function(){var e=Uv(Mv.mark((function e(t){return Mv.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}():$_)}}var A_=Array.isArray,E_="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g,O_="object"==typeof self&&self&&self.Object===Object&&self,T_=E_||O_||Function("return this")(),C_=T_.Symbol,__=C_,j_=Object.prototype,I_=j_.hasOwnProperty,P_=j_.toString,R_=__?__.toStringTag:void 0;var L_=function(e){var t=I_.call(e,R_),r=e[R_];try{e[R_]=void 0;var n=!0}catch(e){}var o=P_.call(e);return n&&(t?e[R_]=r:delete e[R_]),o},D_=Object.prototype.toString;var F_=L_,B_=function(e){return D_.call(e)},N_=C_?C_.toStringTag:void 0;var z_=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":N_&&N_ in Object(e)?F_(e):B_(e)};var U_=z_,q_=function(e){return null!=e&&"object"==typeof e};var M_=function(e){return"symbol"==typeof e||q_(e)&&"[object Symbol]"==U_(e)},H_=A_,W_=M_,V_=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,G_=/^\w*$/;var K_=function(e,t){if(H_(e))return!1;var r=typeof e;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=e&&!W_(e))||(G_.test(e)||!V_.test(e)||null!=t&&e in Object(t))};var J_=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)},Y_=z_,Z_=J_;var Q_=function(e){if(!Z_(e))return!1;var t=Y_(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t},X_=T_["__core-js_shared__"],ej=function(){var e=/[^.]+$/.exec(X_&&X_.keys&&X_.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();var tj=function(e){return!!ej&&ej in e},rj=Function.prototype.toString;var nj=Q_,oj=tj,aj=J_,ij=function(e){if(null!=e){try{return rj.call(e)}catch(e){}try{return e+""}catch(e){}}return""},sj=/^\[object .+?Constructor\]$/,lj=Function.prototype,cj=Object.prototype,pj=lj.toString,uj=cj.hasOwnProperty,dj=RegExp("^"+pj.call(uj).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var hj=function(e){return!(!aj(e)||oj(e))&&(nj(e)?dj:sj).test(ij(e))},fj=function(e,t){return null==e?void 0:e[t]};var mj=function(e,t){var r=fj(e,t);return hj(r)?r:void 0},yj=mj(Object,"create"),gj=yj;var vj=function(){this.__data__=gj?gj(null):{},this.size=0};var bj=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},xj=yj,wj=Object.prototype.hasOwnProperty;var $j=function(e){var t=this.__data__;if(xj){var r=t[e];return"__lodash_hash_undefined__"===r?void 0:r}return wj.call(t,e)?t[e]:void 0},kj=yj,Sj=Object.prototype.hasOwnProperty;var Aj=yj;var Ej=vj,Oj=bj,Tj=$j,Cj=function(e){var t=this.__data__;return kj?void 0!==t[e]:Sj.call(t,e)},_j=function(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=Aj&&void 0===t?"__lodash_hash_undefined__":t,this};function jj(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}jj.prototype.clear=Ej,jj.prototype.delete=Oj,jj.prototype.get=Tj,jj.prototype.has=Cj,jj.prototype.set=_j;var Ij=jj;var Pj=function(){this.__data__=[],this.size=0};var Rj=function(e,t){return e===t||e!=e&&t!=t};var Lj=function(e,t){for(var r=e.length;r--;)if(Rj(e[r][0],t))return r;return-1},Dj=Lj,Fj=Array.prototype.splice;var Bj=Lj;var Nj=Lj;var zj=Lj;var Uj=Pj,qj=function(e){var t=this.__data__,r=Dj(t,e);return!(r<0)&&(r==t.length-1?t.pop():Fj.call(t,r,1),--this.size,!0)},Mj=function(e){var t=this.__data__,r=Bj(t,e);return r<0?void 0:t[r][1]},Hj=function(e){return Nj(this.__data__,e)>-1},Wj=function(e,t){var r=this.__data__,n=zj(r,e);return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this};function Vj(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}Vj.prototype.clear=Uj,Vj.prototype.delete=qj,Vj.prototype.get=Mj,Vj.prototype.has=Hj,Vj.prototype.set=Wj;var Gj=Vj,Kj=mj(T_,"Map"),Jj=Ij,Yj=Gj,Zj=Kj;var Qj=function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e};var Xj=function(e,t){var r=e.__data__;return Qj(t)?r["string"==typeof t?"string":"hash"]:r.map},eI=Xj;var tI=Xj;var rI=Xj;var nI=Xj;var oI=function(){this.size=0,this.__data__={hash:new Jj,map:new(Zj||Yj),string:new Jj}},aI=function(e){var t=eI(this,e).delete(e);return this.size-=t?1:0,t},iI=function(e){return tI(this,e).get(e)},sI=function(e){return rI(this,e).has(e)},lI=function(e,t){var r=nI(this,e),n=r.size;return r.set(e,t),this.size+=r.size==n?0:1,this};function cI(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}cI.prototype.clear=oI,cI.prototype.delete=aI,cI.prototype.get=iI,cI.prototype.has=sI,cI.prototype.set=lI;var pI=cI;function uI(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var r=function(){var n=arguments,o=t?t.apply(this,n):n[0],a=r.cache;if(a.has(o))return a.get(o);var i=e.apply(this,n);return r.cache=a.set(o,i)||a,i};return r.cache=new(uI.Cache||pI),r}uI.Cache=pI;var dI=uI;var hI=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,fI=/\\(\\)?/g,mI=function(e){var t=dI(e,(function(e){return 500===r.size&&r.clear(),e})),r=t.cache;return t}((function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(hI,(function(e,r,n,o){t.push(n?o.replace(fI,"$1"):r||e)})),t}));var yI=function(e,t){for(var r=-1,n=null==e?0:e.length,o=Array(n);++r<n;)o[r]=t(e[r],r,e);return o},gI=A_,vI=M_,bI=C_?C_.prototype:void 0,xI=bI?bI.toString:void 0;var wI=function e(t){if("string"==typeof t)return t;if(gI(t))return yI(t,e)+"";if(vI(t))return xI?xI.call(t):"";var r=t+"";return"0"==r&&1/t==-Infinity?"-0":r};var $I=A_,kI=K_,SI=mI,AI=function(e){return null==e?"":wI(e)};var EI=M_;var OI=function(e,t){return $I(e)?e:kI(e,t)?[e]:SI(AI(e))},TI=function(e){if("string"==typeof e||EI(e))return e;var t=e+"";return"0"==t&&1/e==-Infinity?"-0":t};var CI=function(e,t){for(var r=0,n=(t=OI(t,e)).length;null!=e&&r<n;)e=e[TI(t[r++])];return r&&r==n?e:void 0};var _I=function(e,t,r){var n=null==e?void 0:CI(e,t);return void 0===n?r:n};function jI(){return(jI=Uv(Mv.mark((function e(t,r){var n,o,a,i,s,l,c,p,u,d,h,f,m=arguments;return Mv.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=m.length>2&&void 0!==m[2]?m[2]:{},o=n.returnEntireTree,a=n.baseDoc,i=n.requestInterceptor,s=n.responseInterceptor,l=n.parameterMacro,c=n.modelPropertyMacro,p=n.useCircularStructures,u={pathDiscriminator:r,baseDoc:a,requestInterceptor:i,responseInterceptor:s,parameterMacro:l,modelPropertyMacro:c,useCircularStructures:p},d=$_({spec:t}),h=d.spec,e.next=6,S_(Du(Du({},u),{},{spec:h,allowMetaPatches:!0,skipNormalization:!0}));case 6:return f=e.sent,!o&&Array.isArray(r)&&r.length&&(f.spec=_I(f.spec,r)||null),e.abrupt("return",f);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var II=function(){return null},PI={mapTagOperations:function(e){var t=e.spec,r=e.cb,n=void 0===r?II:r,o=e.defaultTag,a=void 0===o?"default":o,i=e.v2OperationIdCompatibilityMode,s={},l={};return w_(t,(function(e){var r,o=e.pathName,c=e.method,p=e.operation;(p.tags?(r=p.tags,Array.isArray(r)?r:[r]):[a]).forEach((function(e){if("string"==typeof e){l[e]=l[e]||{};var r,a=l[e],u=g_(p,o,c,{v2OperationIdCompatibilityMode:i}),d=n({spec:t,pathName:o,method:c,operation:p,operationId:u});if(s[u])s[u]+=1,a[Wb(r="".concat(u)).call(r,s[u])]=d;else if(void 0!==a[u]){var h,f,m=s[u]||1;s[u]=m+1,a[Wb(h="".concat(u)).call(h,s[u])]=d;var y=a[u];delete a[u],a[Wb(f="".concat(u)).call(f,m)]=y}else a[u]=d}}))})),l},makeExecute:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t){var r=t.pathName,n=t.method,o=t.operationId;return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=e.requestInterceptor,s=e.responseInterceptor,l=e.userFetch;return e.execute(Du({spec:e.spec,requestInterceptor:i,responseInterceptor:s,userFetch:l,pathName:r,method:n,parameters:t,operationId:o},a))}}}};var RI=Po,LI=Yo.indexOf,DI=Qp,FI=At([].indexOf),BI=!!FI&&1/FI([1],1,-0)<0,NI=DI("indexOf");RI({target:"Array",proto:!0,forced:BI||!NI},{indexOf:function(e){var t=arguments.length>1?arguments[1]:void 0;return BI?FI(this,e,t)||0:LI(this,e,t)}});var zI=hc("Array").indexOf,UI=lr,qI=zI,MI=Array.prototype,HI=function(e){var t=e.indexOf;return e===MI||UI(MI,e)&&t===MI.indexOf?qI:t};function WI(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=ua(e);for(n=0;n<a.length;n++)r=a[n],HI(t).call(t,r)>=0||(o[r]=e[r]);return o}(e,t);if(ic){var a=ic(e);for(n=0;n<a.length;n++)r=a[n],HI(t).call(t,r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var VI={parse:function(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var r={},n=t||{},o=e.split(";"),a=n.decode||GI,i=0;i<o.length;i++){var s=o[i],l=s.indexOf("=");if(!(l<0)){var c=s.substring(0,l).trim();if(null==r[c]){var p=s.substring(l+1,s.length).trim();'"'===p[0]&&(p=p.slice(1,-1)),r[c]=YI(p,a)}}}return r},serialize:function(e,t,r){var n=r||{},o=n.encode||KI;if("function"!=typeof o)throw new TypeError("option encode is invalid");if(!JI.test(e))throw new TypeError("argument name is invalid");var a=o(t);if(a&&!JI.test(a))throw new TypeError("argument val is invalid");var i=e+"="+a;if(null!=n.maxAge){var s=n.maxAge-0;if(isNaN(s)||!isFinite(s))throw new TypeError("option maxAge is invalid");i+="; Max-Age="+Math.floor(s)}if(n.domain){if(!JI.test(n.domain))throw new TypeError("option domain is invalid");i+="; Domain="+n.domain}if(n.path){if(!JI.test(n.path))throw new TypeError("option path is invalid");i+="; Path="+n.path}if(n.expires){if("function"!=typeof n.expires.toUTCString)throw new TypeError("option expires is invalid");i+="; Expires="+n.expires.toUTCString()}n.httpOnly&&(i+="; HttpOnly");n.secure&&(i+="; Secure");if(n.sameSite){switch("string"==typeof n.sameSite?n.sameSite.toLowerCase():n.sameSite){case!0:i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"strict":i+="; SameSite=Strict";break;case"none":i+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return i}},GI=decodeURIComponent,KI=encodeURIComponent,JI=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function YI(e,t){try{return t(e)}catch(t){return e}}function ZI(e){return"[object Object]"===Object.prototype.toString.call(e)}function QI(e){var t,r;return!1!==ZI(e)&&(void 0===(t=e.constructor)||!1!==ZI(r=t.prototype)&&!1!==r.hasOwnProperty("isPrototypeOf"))}var XI={body:function(e){var t=e.req,r=e.value;t.body=r},header:function(e){var t=e.req,r=e.parameter,n=e.value;t.headers=t.headers||{},void 0!==n&&(t.headers[r.name]=n)},query:function(e){var t=e.req,r=e.value,n=e.parameter;t.query=t.query||{},!1===r&&"boolean"===n.type&&(r="false");0===r&&["number","integer"].indexOf(n.type)>-1&&(r="0");if(r)t.query[n.name]={collectionFormat:n.collectionFormat,value:r};else if(n.allowEmptyValue&&void 0!==r){var o=n.name;t.query[o]=t.query[o]||{},t.query[o].allowEmptyValue=!0}},path:function(e){var t=e.req,r=e.value,n=e.parameter;t.url=t.url.split("{".concat(n.name,"}")).join(encodeURIComponent(r))},formData:function(e){var t=e.req,r=e.value,n=e.parameter;(r||n.allowEmptyValue)&&(t.form=t.form||{},t.form[n.name]={value:r,allowEmptyValue:n.allowEmptyValue,collectionFormat:n.collectionFormat})}};function eP(e,t){return ob(t).call(t,"application/json")?"string"==typeof e?e:Pb(e):e.toString()}var tP=["accept","authorization","content-type"];var rP=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",path:function(e){var t=e.req,r=e.value,n=e.parameter,o=n.name,a=n.style,i=n.explode,s=n.content;if(s){var l=zb(s)[0];t.url=t.url.split("{".concat(o,"}")).join(FS(eP(r,l),{escape:!0}))}else{var c=BS({key:n.name,value:r,style:a||"simple",explode:i||!1,escape:!0});t.url=t.url.split("{".concat(o,"}")).join(c)}},query:function(e){var t=e.req,r=e.value,n=e.parameter;if(t.query=t.query||{},n.content){var o=zb(n.content)[0];t.query[n.name]=eP(r,o)}else if(!1===r&&(r="false"),0===r&&(r="0"),r){var a=n.style,i=n.explode,s=n.allowReserved;t.query[n.name]={value:r,serializationOption:{style:a,explode:i,allowReserved:s}}}else if(n.allowEmptyValue&&void 0!==r){var l=n.name;t.query[l]=t.query[l]||{},t.query[l].allowEmptyValue=!0}},header:function(e){var t=e.req,r=e.parameter,n=e.value;if(t.headers=t.headers||{},!(tP.indexOf(r.name.toLowerCase())>-1))if(r.content){var o=zb(r.content)[0];t.headers[r.name]=eP(n,o)}else void 0!==n&&(t.headers[r.name]=BS({key:r.name,value:n,style:r.style||"simple",explode:void 0!==r.explode&&r.explode,escape:!1}))},cookie:function(e){var t=e.req,r=e.parameter,n=e.value;t.headers=t.headers||{};var o=Bf(n);if(r.content){var a,i=zb(r.content)[0];t.headers.Cookie=Wb(a="".concat(r.name,"=")).call(a,eP(n,i))}else if("undefined"!==o){var s="object"===o&&!Array.isArray(n)&&r.explode?"":"".concat(r.name,"=");t.headers.Cookie=s+BS({key:r.name,value:n,escape:!1,style:r.style||"form",explode:void 0!==r.explode&&r.explode})}}}),nP={exports:({},function(e){return(e instanceof ct?e:ct.from(e.toString(),"binary")).toString("base64")})},oP=nP.exports;function aP(e,t){var r=e.operation,n=e.requestBody,o=e.securities,a=e.spec,i=e.attachContentTypeForEmptyPayload,s=e.requestContentType;t=function(e){var t=e.request,r=e.securities,n=void 0===r?{}:r,o=e.operation,a=void 0===o?{}:o,i=e.spec,s=Du({},t),l=n.authorized,c=void 0===l?{}:l,p=a.security||i.security||[],u=c&&!!zb(c).length,d=_I(i,["components","securitySchemes"])||{};if(s.headers=s.headers||{},s.query=s.query||{},!zb(n).length||!u||!p||Array.isArray(a.security)&&!a.security.length)return t;return p.forEach((function(e){zb(e).forEach((function(e){var t=c[e],r=d[e];if(t){var n=t.value||t,o=r.type;if(t)if("apiKey"===o)"query"===r.in&&(s.query[r.name]=n),"header"===r.in&&(s.headers[r.name]=n),"cookie"===r.in&&(s.cookies[r.name]=n);else if("http"===o){if(/^basic$/i.test(r.scheme)){var a,i=n.username||"",l=n.password||"",p=oP(Wb(a="".concat(i,":")).call(a,l));s.headers.Authorization="Basic ".concat(p)}/^bearer$/i.test(r.scheme)&&(s.headers.Authorization="Bearer ".concat(n))}else if("oauth2"===o||"openIdConnect"===o){var u,h=t.token||{},f=h[r["x-tokenName"]||"access_token"],m=h.token_type;m&&"bearer"!==m.toLowerCase()||(m="Bearer"),s.headers.Authorization=Wb(u="".concat(m," ")).call(u,f)}}}))})),s}({request:t,securities:o,operation:r,spec:a});var l=r.requestBody||{},c=zb(l.content||{}),p=s&&c.indexOf(s)>-1;if(n||i){if(s&&p)t.headers["Content-Type"]=s;else if(!s){var u=c[0];u&&(t.headers["Content-Type"]=u,s=u)}}else s&&p&&(t.headers["Content-Type"]=s);if(!e.responseContentType&&r.responses){var d,h=tx(d=ex(r.responses)).call(d,(function(e){var t=Nf(e,2),r=t[0],n=t[1],o=parseInt(r,10);return o>=200&&o<300&&QI(n.content)})).reduce((function(e,t){var r=Nf(t,2)[1];return Wb(e).call(e,zb(r.content))}),[]);h.length>0&&(t.headers.accept=h.join(", "))}if(n)if(s){if(c.indexOf(s)>-1)if("application/x-www-form-urlencoded"===s||"multipart/form-data"===s)if("object"===Bf(n)){var f=(l.content[s]||{}).encoding||{};t.form={},zb(n).forEach((function(e){t.form[e]={value:n[e],encoding:f[e]||{}}}))}else t.form=n;else t.body=n}else t.body=n;return t}function iP(e,t){var r,n,o=e.spec,a=e.operation,i=e.securities,s=e.requestContentType,l=e.responseContentType,c=e.attachContentTypeForEmptyPayload;if((t=function(e){var t=e.request,r=e.securities,n=void 0===r?{}:r,o=e.operation,a=void 0===o?{}:o,i=e.spec,s=Du({},t),l=n.authorized,c=void 0===l?{}:l,p=n.specSecurity,u=void 0===p?[]:p,d=a.security||u,h=c&&!!zb(c).length,f=i.securityDefinitions;if(s.headers=s.headers||{},s.query=s.query||{},!zb(n).length||!h||!d||Array.isArray(a.security)&&!a.security.length)return t;return d.forEach((function(e){zb(e).forEach((function(e){var t=c[e];if(t){var r=t.token,n=t.value||t,o=f[e],a=o.type,i=o["x-tokenName"]||"access_token",l=r&&r[i],p=r&&r.token_type;if(t)if("apiKey"===a){var u="query"===o.in?"query":"headers";s[u]=s[u]||{},s[u][o.name]=n}else if("basic"===a)if(n.header)s.headers.authorization=n.header;else{var d,h=n.username||"",m=n.password||"";n.base64=oP(Wb(d="".concat(h,":")).call(d,m)),s.headers.authorization="Basic ".concat(n.base64)}else if("oauth2"===a&&l){var y;p=p&&"bearer"!==p.toLowerCase()?p:"Bearer",s.headers.authorization=Wb(y="".concat(p," ")).call(y,l)}}}))})),s}({request:t,securities:i,operation:a,spec:o})).body||t.form||c)if(s)t.headers["Content-Type"]=s;else if(Array.isArray(a.consumes)){var p=Nf(a.consumes,1);t.headers["Content-Type"]=p[0]}else if(Array.isArray(o.consumes)){var u=Nf(o.consumes,1);t.headers["Content-Type"]=u[0]}else a.parameters&&tx(r=a.parameters).call(r,(function(e){return"file"===e.type})).length?t.headers["Content-Type"]="multipart/form-data":a.parameters&&tx(n=a.parameters).call(n,(function(e){return"formData"===e.in})).length&&(t.headers["Content-Type"]="application/x-www-form-urlencoded");else if(s){var d,h,f=a.parameters&&tx(d=a.parameters).call(d,(function(e){return"body"===e.in})).length>0,m=a.parameters&&tx(h=a.parameters).call(h,(function(e){return"formData"===e.in})).length>0;(f||m)&&(t.headers["Content-Type"]=s)}return!l&&Array.isArray(a.produces)&&a.produces.length>0&&(t.headers.accept=a.produces.join(", ")),t}var sP=["http","fetch","spec","operationId","pathName","method","parameters","securities"],lP=function(e){return Array.isArray(e)?e:[]},cP=SC("OperationNotFoundError",(function(e,t,r){this.originalError=r,Yu(this,t||{})})),pP={buildRequest:uP};function uP(e){var t,r,n=e.spec,o=e.operationId,a=e.responseContentType,i=e.scheme,s=e.requestInterceptor,l=e.responseInterceptor,c=e.contextUrl,p=e.userFetch,u=e.server,d=e.serverVariables,h=e.http,f=e.signal,m=e.parameters,y=e.parameterBuilders,g=y_(n);y||(y=g?rP:XI);var v={url:"",credentials:h&&h.withCredentials?"include":"same-origin",headers:{},cookies:{}};f&&(v.signal=f),s&&(v.requestInterceptor=s),l&&(v.responseInterceptor=l),p&&(v.userFetch=p);var b=x_(n,o);if(!b)throw new cP("Operation ".concat(o," not found"));var x=b.operation,w=void 0===x?{}:x,$=b.method,k=b.pathName;if(v.url+=hP({spec:n,scheme:i,contextUrl:c,server:u,serverVariables:d,pathName:k,method:$}),!o)return delete v.cookies,v;v.url+=k,v.method="".concat($).toUpperCase(),m=m||{};var S=n.paths[k]||{};a&&(v.headers.accept=a);var A=function(e){var t={};e.forEach((function(e){t[e.in]||(t[e.in]={}),t[e.in][e.name]=e}));var r=[];return zb(t).forEach((function(e){zb(t[e]).forEach((function(n){r.push(t[e][n])}))})),r}(Wb(t=Wb(r=[]).call(r,lP(w.parameters))).call(t,lP(S.parameters)));A.forEach((function(e){var t,r,o=y[e.in];if("body"===e.in&&e.schema&&e.schema.properties&&(t=m),void 0===(t=e&&e.name&&m[e.name]))t=e&&e.name&&m[Wb(r="".concat(e.in,".")).call(r,e.name)];else if(function(e,t){return tx(t).call(t,(function(t){return t.name===e}))}(e.name,A).length>1){var a;console.warn(Wb(a="Parameter '".concat(e.name,"' is ambiguous because the defined spec has more than one parameter with the name: '")).call(a,e.name,"' and the passed-in parameter values did not define an 'in' value."))}if(null!==t){if(void 0!==e.default&&void 0===t&&(t=e.default),void 0===t&&e.required&&!e.allowEmptyValue)throw new Error("Required parameter ".concat(e.name," is not provided"));if(g&&e.schema&&"object"===e.schema.type&&"string"==typeof t)try{t=JSON.parse(t)}catch(e){throw new Error("Could not parse object parameter value string as JSON")}o&&o({req:v,parameter:e,value:t,operation:w,spec:n})}}));var E=Du(Du({},e),{},{operation:w});if((v=g?aP(E,v):iP(E,v)).cookies&&zb(v.cookies).length){var O=zb(v.cookies).reduce((function(e,t){var r=v.cookies[t];return e+(e?"&":"")+VI.serialize(t,r)}),"");v.headers.Cookie=O}return v.cookies&&delete v.cookies,rA(v),v}var dP=function(e){return e?e.replace(/\W/g,""):null};function hP(e){return y_(e.spec)?function(e){var t=e.spec,r=e.pathName,n=e.method,o=e.server,a=e.contextUrl,i=e.serverVariables,s=void 0===i?{}:i,l=_I(t,["paths",r,(n||"").toLowerCase(),"servers"])||_I(t,["paths",r,"servers"])||_I(t,["servers"]),c="",p=null;if(o&&l&&l.length){var u=Nb(l).call(l,(function(e){return e.url}));u.indexOf(o)>-1&&(c=o,p=l[u.indexOf(o)])}if(!c&&l&&l.length){c=l[0].url;var d=Nf(l,1);p=d[0]}if(c.indexOf("{")>-1){(function(e){var t,r=[],n=/{([^}]+)}/g;for(;t=n.exec(e);)r.push(t[1]);return r})(c).forEach((function(e){if(p.variables&&p.variables[e]){var t=p.variables[e],r=s[e]||t.default,n=new RegExp("{".concat(e,"}"),"g");c=c.replace(n,r)}}))}return function(){var e,t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=r&&n?xd.parse(xd.resolve(n,r)):xd.parse(r),a=xd.parse(n),i=dP(o.protocol)||dP(a.protocol)||"",s=o.host||a.host,l=o.pathname||"";e=i&&s?Wb(t="".concat(i,"://")).call(t,s+l):l;return"/"===e[e.length-1]?RS(e).call(e,0,-1):e}(c,a)}(e):function(e){var t,r,n=e.spec,o=e.scheme,a=e.contextUrl,i=void 0===a?"":a,s=xd.parse(i),l=Array.isArray(n.schemes)?n.schemes[0]:null,c=o||l||dP(s.protocol)||"http",p=n.host||s.host||"",u=n.basePath||"";t=c&&p?Wb(r="".concat(c,"://")).call(r,p+u):u;return"/"===t[t.length-1]?RS(t).call(t,0,-1):t}(e)}function fP(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"==typeof e?r.url=e:r=e,!(this instanceof fP))return new fP(r);Yu(this,r);var n=this.resolve().then((function(){return t.disableInterfaces||Yu(t,fP.makeApisTagOperation(t)),t}));return n.client=this,n}fP.http=US,fP.makeHttp=function(e,t,r){return r=r||function(e){return e},t=t||function(e){return e},function(n){return"string"==typeof n&&(n={url:n}),zS.mergeInQueryOrForm(n),n=t(n),r(e(n))}}.bind(null,fP.http),fP.resolve=S_,fP.resolveSubtree=function(e,t){return jI.apply(this,arguments)},fP.execute=function(e){var t=e.http,r=e.fetch,n=e.spec,o=e.operationId,a=e.pathName,i=e.method,s=e.parameters,l=e.securities,c=WI(e,sP),p=t||r||US;a&&i&&!o&&(o=b_(a,i));var u=pP.buildRequest(Du({spec:n,operationId:o,parameters:s,securities:l,http:p},c));return u.body&&(QI(u.body)||Array.isArray(u.body))&&(u.body=Pb(u.body)),p(u)},fP.serializeRes=WS,fP.serializeHeaders=GS,fP.clearCache=function(){h_.refs.clearCache()},fP.makeApisTagOperation=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=PI.makeExecute(e);return{apis:PI.mapTagOperations({v2OperationIdCompatibilityMode:e.v2OperationIdCompatibilityMode,spec:e.spec,cb:t})}},fP.buildRequest=uP,fP.helpers={opId:g_},fP.getBaseUrl=hP,fP.prototype={http:US,execute:function(e){return this.applyDefaults(),fP.execute(Du({spec:this.spec,http:this.http,securities:{authorized:this.authorizations},contextUrl:"string"==typeof this.url?this.url:void 0,requestInterceptor:this.requestInterceptor||null,responseInterceptor:this.responseInterceptor||null},e))},resolve:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return fP.resolve(Du({spec:this.spec,url:this.url,http:this.http||this.fetch,allowMetaPatches:this.allowMetaPatches,useCircularStructures:this.useCircularStructures,requestInterceptor:this.requestInterceptor||null,responseInterceptor:this.responseInterceptor||null,skipNormalization:this.skipNormalization||!1},t)).then((function(t){return e.originalSpec=e.spec,e.spec=t.spec,e.errors=t.errors,e}))}},fP.prototype.applyDefaults=function(){var e=this.spec,t=this.url;if(t&&bd(t).call(t,"http")){var r=xd.parse(t);e.host||(e.host=r.host),e.schemes||(e.schemes=[r.protocol.replace(":","")]),e.basePath||(e.basePath="/")}};function mP(e){const t=(e=e.replace("[]","Array")).split("/");return t[0]=t[0].replace(/[^A-Za-z0-9_\-\.]+|\s+/gm,"_"),t.join("/")}var yP={parameterTypeProperties:["format","minimum","maximum","exclusiveMinimum","exclusiveMaximum","minLength","maxLength","multipleOf","minItems","maxItems","uniqueItems","minProperties","maxProperties","additionalProperties","pattern","enum","default"],arrayProperties:["items","minItems","maxItems","uniqueItems"],httpMethods:["get","post","put","delete","patch","head","options","trace"],uniqueOnly:function(e,t,r){return r.indexOf(e)===t},createHash:function(e){let t,r=0;if(0===e.length)return r;for(let n=0;n<e.length;n++)t=e.charCodeAt(n),r=(r<<5)-r+t,r|=0;return r},sanitise:mP,sanitiseAll:function(e){return mP(e.split("/").join("_"))},camelize:function(e){return e.toLowerCase().replace(/[-_ \/\.](.)/g,((e,t)=>t.toUpperCase()))},clone:function(e){return JSON.parse(JSON.stringify(e))},circularClone:function e(t,r){if(r||(r=new WeakMap),Object(t)!==t||t instanceof Function)return t;if(r.has(t))return r.get(t);let n;try{n=new t.constructor}catch(e){n=Object.create(Object.getPrototypeOf(t))}return r.set(t,n),Object.assign(n,...Object.keys(t).map((n=>({[n]:e(t[n],r)}))))}};function gP(){return{depth:0,seen:new WeakMap,top:!0,combine:!1,allowRefSiblings:!1}}var vP={getDefaultState:gP,walkSchema:function e(t,r,n,o){if(void 0===n.depth&&(n=gP()),null==t)return t;if(n.combine&&(t.allOf&&Array.isArray(t.allOf)&&1===t.allOf.length&&delete(t={...t.allOf[0],...t}).allOf,t.anyOf&&Array.isArray(t.anyOf)&&1===t.anyOf.length&&delete(t={...t.anyOf[0],...t}).anyOf,t.oneOf&&Array.isArray(t.oneOf)&&1===t.oneOf.length&&delete(t={...t.oneOf[0],...t}).oneOf),o(t,r,n),n.seen.has(t))return t;if("object"==typeof t&&null!==t&&n.seen.set(t,!0),n.top=!1,n.depth++,void 0!==t.items&&(n.property="items",e(t.items,t,n,o)),t.additionalItems&&"object"==typeof t.additionalItems&&(n.property="additionalItems",e(t.additionalItems,t,n,o)),t.additionalProperties&&"object"==typeof t.additionalProperties&&(n.property="additionalProperties",e(t.additionalProperties,t,n,o)),t.properties)for(const r in t.properties){const a=t.properties[r];n.property=`properties/${r}`,e(a,t,n,o)}if(t.patternProperties)for(const r in t.patternProperties){const a=t.patternProperties[r];n.property=`patternProperties/${r}`,e(a,t,n,o)}if(t.allOf)for(const r in t.allOf){const a=t.allOf[r];n.property=`allOf/${r}`,e(a,t,n,o)}if(t.anyOf)for(const r in t.anyOf){const a=t.anyOf[r];n.property=`anyOf/${r}`,e(a,t,n,o)}if(t.oneOf)for(const r in t.oneOf){const a=t.oneOf[r];n.property=`oneOf/${r}`,e(a,t,n,o)}return t.not&&(n.property="not",e(t.not,t,n,o)),n.depth--,t}};function bP(e,t,r){if(t||(t={depth:0}),t.depth||(t={path:"#",depth:0,pkey:"",parent:{},payload:{},seen:new WeakMap,identity:!1,identityDetection:!1,...t}),"object"!=typeof e)return;const n=t.path;for(const o in e){if(t.key=o,t.path=`${t.path}/${encodeURIComponent(o)}`,t.identityPath=t.seen.get(e[o]),t.identity=void 0!==t.identityPath,e.hasOwnProperty(o)&&r(e,o,t),"object"==typeof e[o]&&!t.identity){t.identityDetection&&!Array.isArray(e[o])&&null!==e[o]&&t.seen.set(e[o],t.path);const n={};n.parent=e,n.path=t.path,n.depth=t.depth?t.depth+1:1,n.pkey=o,n.payload=t.payload,n.seen=t.seen,n.identity=!1,n.identityDetection=t.identityDetection,bP(e[o],n,r)}t.path=n}}let xP;function wP(e,t){for(const r in e)r.startsWith("x-")&&!r.startsWith("x-s2o")&&(t[r]=e[r])}function $P(e,t){vP.walkSchema(e,{},{},((e,r)=>{!function(e){if(e["x-required"]&&Array.isArray(e["x-required"])&&(e.required||(e.required=[]),e.required=e.required.concat(e["x-required"]),delete e["x-required"]),e["x-anyOf"]&&(e.anyOf=e["x-anyOf"],delete e["x-anyOf"]),e["x-oneOf"]&&(e.oneOf=e["x-oneOf"],delete e["x-oneOf"]),e["x-not"]&&(e.not=e["x-not"],delete e["x-not"]),"boolean"==typeof e["x-nullable"]&&(e.nullable=e["x-nullable"],delete e["x-nullable"]),"object"==typeof e["x-discriminator"]&&"string"==typeof e["x-discriminator"].propertyName){e.discriminator=e["x-discriminator"],delete e["x-discriminator"];for(const t in e.discriminator.mapping){const r=e.discriminator.mapping[t];r.startsWith("#/definitions/")&&(e.discriminator.mapping[t]=r.replace("#/definitions/","#/components/schemas/"))}}}(e),function(e,t,r){if(e.nullable&&r.patches++,e.discriminator&&"string"==typeof e.discriminator&&(e.discriminator={propertyName:e.discriminator}),e.items&&Array.isArray(e.items)&&(0===e.items.length?e.items={}:1===e.items.length?e.items=e.items[0]:e.items={anyOf:e.items}),e.type&&Array.isArray(e.type)){if(r.patches++,r.warnings.push("(Patchable) schema type must not be an array"),0===e.type.length)delete e.type;else{e.oneOf||(e.oneOf=[]);for(const t of e.type){const r={};if("null"===t)e.nullable=!0;else{r.type=t;for(const t of yP.arrayProperties)void 0!==e.prop&&(r[t]=e[t],delete e[t])}r.type&&e.oneOf.push(r)}delete e.type,0===e.oneOf.length?delete e.oneOf:e.oneOf.length<2&&(e.type=e.oneOf[0].type,Object.keys(e.oneOf[0]).length>1&&(r.patches++,r.warnings.push("Lost properties from oneOf")),delete e.oneOf)}e.type&&Array.isArray(e.type)&&1===e.type.length&&(e.type=e.type[0])}e.type&&"null"===e.type&&(delete e.type,e.nullable=!0),"array"!==e.type||e.items||(e.items={}),"file"===e.type&&(e.type="string",e.format="binary"),"boolean"==typeof e.required&&(e.required&&e.name&&(void 0===t.required&&(t.required=[]),Array.isArray(t.required)&&t.required.push(e.name)),delete e.required),e.xml&&"string"==typeof e.xml.namespace&&(e.xml.namespace||delete e.xml.namespace),e.allowEmptyValue&&(delete e.allowEmptyValue,r.patches++,r.warnings.push("(Patchable): deleted schema.allowEmptyValue"))}(e,r,t)}))}function kP(e){for(const t in e)for(const r in e[t]){const n=yP.sanitise(r);r!==n&&(e[t][n]=e[t][r],delete e[t][r])}}function SP(e,t){if("basic"===e.type&&(e.type="http",e.scheme="basic"),"oauth2"===e.type){const r={};let n=e.flow;"application"===e.flow&&(n="clientCredentials"),"accessCode"===e.flow&&(n="authorizationCode"),"string"==typeof e.authorizationUrl&&(r.authorizationUrl=e.authorizationUrl.split("?")[0].trim()||"/"),"string"==typeof e.tokenUrl&&(r.tokenUrl=e.tokenUrl.split("?")[0].trim()||"/"),r.scopes=e.scopes||{},e.flows={},e.flows[n]=r,delete e.flow,delete e.authorizationUrl,delete e.tokenUrl,delete e.scopes,e.name&&(delete e.name,t.patches++,t.warnings.push("(Patchable) oauth2 securitySchemes should not have name property"))}}function AP(e){return e&&!e["x-s2o-delete"]}function EP(e,t){if(e.type&&!e.schema&&(e.schema={}),e.type&&(e.schema.type=e.type),e.items&&"array"!==e.items.type){if(e.items.collectionFormat!==e.collectionFormat)return t.errCount++,void t.errors.push({message:"Nested collectionFormats are not supported",pointer:"/.../responses/header"});delete e.items.collectionFormat}"array"===e.type?("ssv"===e.collectionFormat?(t.patches++,t.warnings.push("collectionFormat:ssv is no longer supported for headers")):"pipes"===e.collectionFormat?(t.patches++,t.warnings.push("collectionFormat:pipes is no longer supported for headers")):"multi"===e.collectionFormat?e.explode=!0:"tsv"===e.collectionFormat?(e["x-collectionFormat"]="tsv",t.patches++,t.warnings.push("collectionFormat:tsv is no longer supported")):e.style="simple",delete e.collectionFormat):e.collectionFormat&&(delete e.collectionFormat,t.patches++,t.warnings.push("(Patchable) collectionFormat is only applicable to header.type array")),delete e.type;for(const t of yP.parameterTypeProperties)void 0!==e[t]&&(e.schema[t]=e[t],delete e[t]);for(const t of yP.arrayProperties)void 0!==e[t]&&(e.schema[t]=e[t],delete e[t])}function OP(e,t,r,n,o,a,i){const s={};let l,c=!0;t&&t.consumes&&"string"==typeof t.consumes&&(t.consumes=[t.consumes],i.patches++,i.warnings.push("(Patchable) operation.consumes must be an array")),Array.isArray(a.consumes)||delete a.consumes;const p=((t?t.consumes:null)||a.consumes||[]).filter(yP.uniqueOnly);if(e&&(e.name||e.in)){"boolean"==typeof e["x-deprecated"]&&(e.deprecated=e["x-deprecated"],delete e["x-deprecated"]),void 0!==e["x-example"]&&(e.example=e["x-example"],delete e["x-example"]),"body"===e.in||e.type||(e.type="string",i.patches++,i.warnings.push("(Patchable) parameter.type is mandatory for non-body parameters")),"file"===e.type&&(e["x-s2o-originalType"]=e.type,l=e.type),null===e.description&&delete e.description;let t=e.collectionFormat;if("array"!==e.type||t||(t="csv"),t&&("array"!==e.type&&(delete e.collectionFormat,i.patches++,i.warnings.push("(Patchable) collectionFormat is only applicable to param.type array")),"csv"!==t||"query"!==e.in&&"cookie"!==e.in||(e.style="form",e.explode=!1),"csv"!==t||"path"!==e.in&&"header"!==e.in||(e.style="simple"),"ssv"===t&&("query"===e.in?e.style="spaceDelimited":i.warnings.push(`${e.name} collectionFormat:ssv is no longer supported except for in:query parameters`)),"pipes"===t&&("query"===e.in?e.style="pipeDelimited":i.warnings.push(`${e.name} collectionFormat:pipes is no longer supported except for in:query parameters`)),"multi"===t&&(e.explode=!0),"tsv"===t&&(i.warnings.push("collectionFormat:tsv is no longer supported"),e["x-collectionFormat"]="tsv"),delete e.collectionFormat),e.type&&"body"!==e.type&&"formData"!==e.in)if(e.items&&e.schema)i.warnings.push(`${e.name} parameter has array,items and schema`);else{e.schema&&i.patches++,e.schema&&"object"==typeof e.schema||(e.schema={}),e.schema.type=e.type,e.items&&(e.schema.items=e.items,delete e.items,bP(e.schema.items,null,((r,n)=>{"collectionFormat"===n&&"string"==typeof r[n]&&(t&&r[n]!==t&&i.warnings.push(`${e.name} Nested collectionFormats are not supported`),delete r[n])})));for(const t of yP.parameterTypeProperties)void 0!==e[t]&&(e.schema[t]=e[t]),delete e[t]}e.schema&&$P(e.schema,i),e["x-ms-skip-url-encoding"]&&"query"===e.in&&(e.allowReserved=!0,delete e["x-ms-skip-url-encoding"])}if(e&&"formData"===e.in){c=!1,s.content={};let t="application/x-www-form-urlencoded";if(p.length&&p.indexOf("multipart/form-data")>=0&&(t="multipart/form-data"),s.content[t]={},e.schema)s.content[t].schema=e.schema;else{s.content[t].schema={},s.content[t].schema.type="object",s.content[t].schema.properties={},s.content[t].schema.properties[e.name]={};const r=s.content[t].schema,n=s.content[t].schema.properties[e.name];e.description&&(n.description=e.description),e.example&&(n.example=e.example),e.type&&(n.type=e.type);for(const t of yP.parameterTypeProperties)void 0!==e[t]&&(n[t]=e[t]);!0===e.required&&(r.required||(r.required=[]),r.required.push(e.name),s.required=!0),void 0!==e.default&&(n.default=e.default),n.properties&&(n.properties=e.properties),e.allOf&&(n.allOf=e.allOf),"array"===e.type&&e.items&&(n.items=e.items,n.items.collectionFormat&&delete n.items.collectionFormat),"file"!==l&&"file"!==e["x-s2o-originalType"]||(n.type="string",n.format="binary"),wP(e,n)}}else e&&"file"===e.type&&(e.required&&(s.required=e.required),s.content={},s.content["application/octet-stream"]={},s.content["application/octet-stream"].schema={},s.content["application/octet-stream"].schema.type="string",s.content["application/octet-stream"].schema.format="binary",wP(e,s));if(e&&"body"===e.in){s.content={},e.name&&(s["x-s2o-name"]=(t&&t.operationId?yP.sanitiseAll(t.operationId):"")+yP.camelize(`_${e.name}`)),e.description&&(s.description=e.description),e.required&&(s.required=e.required),p.length||p.push("application/json");for(const t of p)s.content[t]={},s.content[t].schema=yP.clone(e.schema||{}),$P(s.content[t].schema,i);wP(e,s)}if(Object.keys(s).length>0&&(e["x-s2o-delete"]=!0,t))if(t.requestBody&&c){t.requestBody["x-s2o-overloaded"]=!0;const e=t.operationId||o;i.warnings.push(`Operation ${e} has multiple requestBodies`)}else t.requestBody||(t=function(e,t){const r={};for(const n of Object.keys(e))r[n]=e[n],"parameters"===n&&(r.requestBody={},t.rbname&&(r[t.rbname]=""));return r.requestBody={},r}(t,i),r[n]=t),t.requestBody.content&&t.requestBody.content["multipart/form-data"]&&t.requestBody.content["multipart/form-data"].schema&&t.requestBody.content["multipart/form-data"].schema.properties&&s.content["multipart/form-data"]&&s.content["multipart/form-data"].schema&&s.content["multipart/form-data"].schema.properties?(t.requestBody.content["multipart/form-data"].schema.properties=Object.assign(t.requestBody.content["multipart/form-data"].schema.properties,s.content["multipart/form-data"].schema.properties),t.requestBody.content["multipart/form-data"].schema.required=(t.requestBody.content["multipart/form-data"].schema.required||[]).concat(s.content["multipart/form-data"].schema.required||[]),t.requestBody.content["multipart/form-data"].schema.required.length||delete t.requestBody.content["multipart/form-data"].schema.required):t.requestBody.content&&t.requestBody.content["application/x-www-form-urlencoded"]&&t.requestBody.content["application/x-www-form-urlencoded"].schema&&t.requestBody.content["application/x-www-form-urlencoded"].schema.properties&&s.content["application/x-www-form-urlencoded"]&&s.content["application/x-www-form-urlencoded"].schema&&s.content["application/x-www-form-urlencoded"].schema.properties?(t.requestBody.content["application/x-www-form-urlencoded"].schema.properties=Object.assign(t.requestBody.content["application/x-www-form-urlencoded"].schema.properties,s.content["application/x-www-form-urlencoded"].schema.properties),t.requestBody.content["application/x-www-form-urlencoded"].schema.required=(t.requestBody.content["application/x-www-form-urlencoded"].schema.required||[]).concat(s.content["application/x-www-form-urlencoded"].schema.required||[]),t.requestBody.content["application/x-www-form-urlencoded"].schema.required.length||delete t.requestBody.content["application/x-www-form-urlencoded"].schema.required):(t.requestBody=Object.assign(t.requestBody,s),t.requestBody["x-s2o-name"]||t.operationId&&(t.requestBody["x-s2o-name"]=yP.sanitiseAll(t.operationId)));if(e&&!e["x-s2o-delete"]){delete e.type;for(const t of yP.parameterTypeProperties)delete e[t];"path"!==e.in||void 0!==e.required&&!0===e.required||(e.required=!0,i.patches++,i.warnings.push(`(Patchable) path parameters must be required:true [${e.name} in ${o}]`))}return t}function TP(e,t,r,n,o){if(!e)return!1;if(e.description||"object"!=typeof e||Array.isArray(e)||(o.patches++,o.warnings.push("(Patchable) response.description is mandatory")),void 0!==e.schema){$P(e.schema,o),r&&r.produces&&"string"==typeof r.produces&&(r.produces=[r.produces],o.patches++,o.warnings.push("(Patchable) operation.produces must be an array")),n.produces&&!Array.isArray(n.produces)&&delete n.produces;const t=((r?r.produces:null)||n.produces||[]).filter(yP.uniqueOnly);t.length||t.push("*/*"),e.content={};for(const r of t){if(e.content[r]={},e.content[r].schema=yP.clone(e.schema),e.examples&&e.examples[r]){const t={};t.value=e.examples[r],e.content[r].examples={},e.content[r].examples.response=t,delete e.examples[r]}"file"===e.content[r].schema.type&&(e.content[r].schema={type:"string",format:"binary"})}delete e.schema}for(const t in e.examples)e.content||(e.content={}),e.content[t]||(e.content[t]={}),e.content[t].examples={},e.content[t].examples.response={},e.content[t].examples.response.value=e.examples[t];if(delete e.examples,e.headers)for(const t in e.headers)"status code"===t.toLowerCase()?(delete e.headers[t],o.patches++,o.warnings.push('(Patchable) "Status Code" is not a valid header')):EP(e.headers[t],o)}function CP(e,t,r,n,o){for(const a in e){const i=e[a];i&&i["x-trace"]&&"object"==typeof i["x-trace"]&&(i.trace=i["x-trace"],delete i["x-trace"]),i&&i["x-summary"]&&"string"==typeof i["x-summary"]&&(i.summary=i["x-summary"],delete i["x-summary"]),i&&i["x-description"]&&"string"==typeof i["x-description"]&&(i.description=i["x-description"],delete i["x-description"]),i&&i["x-servers"]&&Array.isArray(i["x-servers"])&&(i.servers=i["x-servers"],delete i["x-servers"]);for(const e in i)if(yP.httpMethods.indexOf(e)>=0||"x-amazon-apigateway-any-method"===e){let s=i[e];if(s&&s.parameters&&Array.isArray(s.parameters)){if(i.parameters)for(const t of i.parameters){s.parameters.find((e=>e.name===t.name&&e.in===t.in))||"formData"!==t.in&&"body"!==t.in&&"file"!==t.type||(s=OP(t,s,i,e,a,o,r))}for(const t of s.parameters)s=OP(t,s,i,e,`${e}: ${a}`,o,r);s.parameters&&(s.parameters=s.parameters.filter(AP))}if(s&&s.security&&kP(s.security),"object"==typeof s){if(!s.responses){const e={description:"Default response"};s.responses={default:e}}for(const e in s.responses){TP(s.responses[e],0,s,o,r)}}if(s&&s["x-servers"]&&Array.isArray(s["x-servers"]))s.servers=s["x-servers"],delete s["x-servers"];else if(s&&s.schemes&&s.schemes.length)for(const e of s.schemes)if((!o.schemes||o.schemes.indexOf(e)<0)&&(s.servers||(s.servers=[]),Array.isArray(o.servers)))for(const e of o.servers){const t=yP.clone(e);s.servers.push(t)}if(s){if(delete s.consumes,delete s.produces,delete s.schemes,s["x-ms-examples"]){for(const e in s["x-ms-examples"]){const t=s["x-ms-examples"][e],r=yP.sanitiseAll(e);if(t.parameters)for(const r in t.parameters){const n=t.parameters[r];for(const t of(s.parameters||[]).concat(i.parameters||[]))t.name!==r||t.example||(t.examples||(t.examples={}),t.examples[e]={value:n})}if(t.responses)for(const n in t.responses){if(t.responses[n].headers)for(const e in t.responses[n].headers){const r=t.responses[n].headers[e];for(const t in s.responses[n].headers)if(t===e){s.responses[n].headers[t].example=r}}if(t.responses[n].body&&(o.components.examples[r]={value:yP.clone(t.responses[n].body)},s.responses[n]&&s.responses[n].content))for(const t in s.responses[n].content){const o=s.responses[n].content[t];o.examples||(o.examples={}),o.examples[e]={$ref:`#/components/examples/${r}`}}}}delete s["x-ms-examples"]}if(s.parameters&&0===s.parameters.length&&delete s.parameters,s.requestBody){const r=s.operationId?yP.sanitiseAll(s.operationId):yP.camelize(yP.sanitiseAll(e+a)),o=yP.sanitise(s.requestBody["x-s2o-name"]||r||"");delete s.requestBody["x-s2o-name"];const i=JSON.stringify(s.requestBody),l=yP.createHash(i);if(!n[l]){const e={};e.name=o,e.body=s.requestBody,e.refs=[],n[l]=e}const c=`#/${t}/${encodeURIComponent(a)}/${e}/requestBody`;n[l].refs.push(c)}}}if(i&&i.parameters){for(const e in i.parameters){OP(i.parameters[e],null,i,null,a,o,r)}Array.isArray(i.parameters)&&(i.parameters=i.parameters.filter(AP))}}}function _P(e){return e&&e.url&&"string"==typeof e.url?(e.url=e.url.split("{{").join("{"),e.url=e.url.split("}}").join("}"),e.url.replace(/\{(.+?)\}/g,((t,r)=>{e.variables||(e.variables={}),e.variables[r]={default:"unknown"}})),e):e}function jP(e,t){void 0!==e.info&&null!==e.info||(e.info={version:"",title:""},t.patches++,t.warnings.push("(Patchable) info object is mandatory")),("object"!=typeof e.info||Array.isArray(e.info))&&(t.errCount++,t.errors.push({message:"info must be an object",pointer:"/info"})),e.info&&(void 0===e.info.title&&(t.patches++,e.info.title="",t.warnings.push({message:"(Patchable) info.title cannot be null",pointer:"/info/title",patchable:!0})),void 0===e.info.version?(t.patches++,e.info.version="",t.warnings.push("(Patchable) info.version cannot be null")):"string"!=typeof e.info.version&&(t.patches++,e.info.version=e.info.version.toString(),t.warnings.push("(Patchable) info.version must be a string")))}function IP(e,t){e.paths||(t.patches++,e.paths={},t.warnings.push("(Patchable) paths object is mandatory"))}function PP(e={}){const t={original:e,openapi:{},patches:0,warnings:[],errCount:0,errors:[]};if(e.openapi&&"string"==typeof e.openapi&&e.openapi.startsWith("3."))return t.openapi=yP.circularClone(e),jP(t.openapi,t),IP(t.openapi,t),t;if("2.0"!==e.swagger)return t.errCount++,t.errors.push({message:`Unsupported swagger/OpenAPI version: ${e.openapi?e.openapi:e.swagger}`,pointer:"/swagger"}),t;if(t.openapi=yP.circularClone(e),t.openapi.openapi="3.0.0",delete t.openapi.swagger,bP(t.openapi,{},((e,t,r)=>{null===e[t]&&!t.startsWith("x-")&&"default"!==t&&r.path.indexOf("/example")<0&&delete e[t]})),e.host)(e.schemes||[]).forEach((r=>{const n={},o=(e.basePath||"").replace(/\/$/,"");n.url=`${r?`${r}:`:""}//${e.host}${o}`,_P(n),t.openapi.servers||(t.openapi.servers=[]),t.openapi.servers.push(n)}));else if(e.basePath){const r={};r.url=e.basePath,_P(r),t.openapi.servers||(t.openapi.servers=[]),t.openapi.servers.push(r)}if(delete t.openapi.host,delete t.openapi.basePath,e["x-ms-parameterized-host"]){const r=e["x-ms-parameterized-host"],n={};n.url=r.hostTemplate+(e.basePath?e.basePath:""),n.variables={};const o=n.url.match(/\{\w+\}/g);for(const e in r.parameters){const t=r.parameters[e];e.startsWith("x-")||(delete t.required,delete t.type,delete t.in,void 0===t.default&&(t.enum?t.default=t.enum[0]:t.default="none"),t.name||(t.name=o[e].replace("{","").replace("}","")),n.variables[t.name]=t,delete t.name)}t.openapi.servers||(t.openapi.servers=[]),!1===r.useSchemePrefix?t.openapi.servers.push(n):e.schemes.forEach((e=>{t.openapi.servers.push({...n,url:`${e}://${n.url}`})})),delete t.openapi["x-ms-parameterized-host"]}return jP(t.openapi,t),IP(t.openapi,t),"string"==typeof t.openapi.consumes&&(t.openapi.consumes=[t.openapi.consumes]),"string"==typeof t.openapi.produces&&(t.openapi.produces=[t.openapi.produces]),t.openapi.components={},t.openapi["x-callbacks"]&&(t.openapi.components.callbacks=t.openapi["x-callbacks"],delete t.openapi["x-callbacks"]),t.openapi.components.examples={},t.openapi.components.headers={},t.openapi["x-links"]&&(t.openapi.components.links=t.openapi["x-links"],delete t.openapi["x-links"]),t.openapi.components.parameters=t.openapi.parameters||{},t.openapi.components.responses=t.openapi.responses||{},t.openapi.components.requestBodies={},t.openapi.components.securitySchemes=t.openapi.securityDefinitions||{},t.openapi.components.schemas=t.openapi.definitions||{},delete t.openapi.definitions,delete t.openapi.responses,delete t.openapi.parameters,delete t.openapi.securityDefinitions,function(e){const t=e.openapi,r={};xP={schemas:{}},t.security&&kP(t.security);for(const r in t.components.securitySchemes){const n=yP.sanitise(r);if(r!==n){if(t.components.securitySchemes[n])return e.errCount++,e.errors.push({message:`Duplicate sanitised securityScheme name ${n}`,pointer:`/components/securitySchemes/${n}`}),e;t.components.securitySchemes[n]=t.components.securitySchemes[r],delete t.components.securitySchemes[r]}SP(t.components.securitySchemes[n],e)}for(const r in t.components.schemas){const n=yP.sanitiseAll(r);let o="";if(r!==n){for(;t.components.schemas[n+o];)o=o?++o:2;t.components.schemas[n+o]=t.components.schemas[r],delete t.components.schemas[r]}xP.schemas[r]=n+o,$P(t.components.schemas[`${n}${o}`],e)}for(const r in t.components.parameters){const n=yP.sanitise(r);if(r!==n){if(t.components.parameters[n])return e.errCount++,e.errors.push({message:`Duplicate sanitised parameter name ${n}`,pointer:`/components/parameters/${n}`}),e;t.components.parameters[n]=t.components.parameters[r],delete t.components.parameters[r]}OP(t.components.parameters[n],null,null,null,n,t,e)}for(const r in t.components.responses){const n=yP.sanitise(r);if(r!==n){if(t.components.responses[n])return e.errCount++,e.errors.push({message:`Duplicate sanitised response name ${n}`,pointer:`/components/responses/${n}`}),e;t.components.responses[n]=t.components.responses[r],delete t.components.responses[r]}const o=t.components.responses[n];if(TP(o,0,null,t,e),o.headers)for(const t in o.headers)"status code"===t.toLowerCase()?(delete o.headers[t],e.patches++,e.warnings.push('(Patchable) "Status Code" is not a valid header')):EP(o.headers[t],e)}for(const e in t.components.requestBodies){const n=t.components.requestBodies[e],o=JSON.stringify(n),a=yP.createHash(o),i={};i.name=e,i.body=n,i.refs=[],r[a]=i}CP(t.paths,"paths",e,r,t),t["x-ms-paths"]&&CP(t["x-ms-paths"],"x-ms-paths",e,r,t);for(const e in t.components.parameters)t.components.parameters[e]["x-s2o-delete"]&&delete t.components.parameters[e];return delete t.consumes,delete t.produces,delete t.schemes,t.components.requestBodies={},t.components.responses&&0===Object.keys(t.components.responses).length&&delete t.components.responses,t.components.parameters&&0===Object.keys(t.components.parameters).length&&delete t.components.parameters,t.components.examples&&0===Object.keys(t.components.examples).length&&delete t.components.examples,t.components.requestBodies&&0===Object.keys(t.components.requestBodies).length&&delete t.components.requestBodies,t.components.securitySchemes&&0===Object.keys(t.components.securitySchemes).length&&delete t.components.securitySchemes,t.components.headers&&0===Object.keys(t.components.headers).length&&delete t.components.headers,t.components.schemas&&0===Object.keys(t.components.schemas).length&&delete t.components.schemas,t.components&&0===Object.keys(t.components).length&&delete t.components,e}(t)}var RP={convertObj:PP,resolve:function(e){return new Promise((async t=>{try{const r=await fP.resolve(e);if(r.errors&&r.errors.length>0)t(r);else{r.spec.openapi&&(r.resolvedSpec=r.spec,t(r));const e=PP(r.spec);e.errors&&e.errors.length>0&&(Array.isArray(r.errors)?r.errors.concat(r.errors):r.errors=e.errors),e.warnings&&e.warnings.length>0&&(r.warnings=e.warnings),r.resolvedSpec=r.spec,r.spec=e.openapi,t(r)}}catch(e){t(e)}}))}};async function LP(e,t=!1,r=!1,n="",o="",a="",i="",s=""){var l,c;let p;try{var u,d;let t;if(this.requestUpdate(),t="string"==typeof e?await RP.resolve({url:e,allowMetaPatches:!1}):await RP.resolve({spec:e,allowMetaPatches:!1}),await nt(0),null!==(u=t.resolvedSpec)&&void 0!==u&&u.jsonSchemaViewer&&null!==(d=t.resolvedSpec)&&void 0!==d&&d.schemaAndExamples){this.dispatchEvent(new CustomEvent("before-render",{detail:{spec:t.resolvedSpec}}));const e=Object.entries(t.resolvedSpec.schemaAndExamples).map((e=>({show:!0,expanded:!0,selectedExample:null,name:e[0],elementId:e[0].replace(tt,"-"),...e[1]})));return{specLoadError:!1,isSpecLoading:!1,info:t.resolvedSpec.info,schemaAndExamples:e}}var h,f,m,y;if(!t.spec||!(t.spec.components||t.spec.info||t.spec.servers||t.spec.tags||t.spec.paths))return console.info("RapiDoc: %c There was an issue while parsing the spec %o ","color:orangered",t),{specLoadError:!0,isSpecLoading:!1,info:{title:"Error loading the spec",description:null!==(h=t.response)&&void 0!==h&&h.url?`${null===(f=t.response)||void 0===f?void 0:f.url} ┃ ${null===(m=t.response)||void 0===m?void 0:m.status}  ${null===(y=t.response)||void 0===y?void 0:y.statusText}`:"Unable to load the Spec",version:" "},tags:[]};p=t.spec,this.dispatchEvent(new CustomEvent("before-render",{detail:{spec:p}}))}catch(e){console.info("RapiDoc: %c There was an issue while parsing the spec %o ","color:orangered",e)}const g=function(e,t,r=!1,n=!1){const o=["get","put","post","delete","patch","head","options"],a=e.tags&&Array.isArray(e.tags)?e.tags.map((e=>({show:!0,elementId:`tag--${e.name.replace(tt,"-")}`,name:e.name,description:e.description||"",headers:e.description?DP(e.description):[],paths:[],expanded:!1!==e["x-tag-expanded"]}))):[],i=e.paths||{};if(e.webhooks)for(const[t,r]of Object.entries(e.webhooks))r._type="webhook",i[t]=r;for(const t in i){const n=i[t].parameters,s={servers:i[t].servers||[],parameters:i[t].parameters||[]},l="webhook"===i[t]._type;o.forEach((o=>{if(i[t][o]){const i=e.paths[t][o],c=i.tags||[];if(0===c.length)if(r){const e=t.replace(/^\/+|\/+$/g,""),r=e.indexOf("/");-1===r?c.push(e):c.push(e.substr(0,r))}else c.push("General ⦂");c.forEach((r=>{let c,p;var u,d;(e.tags&&(p=e.tags.find((e=>e.name.toLowerCase()===r.toLowerCase()))),c=a.find((e=>e.name===r)),c)||(c={show:!0,elementId:`tag--${r.replace(tt,"-")}`,name:r,description:(null===(u=p)||void 0===u?void 0:u.description)||"",headers:null!==(d=p)&&void 0!==d&&d.description?DP(p.description):[],paths:[],expanded:!p||!1!==p["x-tag-expanded"]},a.push(c));let h=(i.summary||i.description||`${o.toUpperCase()} ${t}`).trim();h.length>100&&([h]=h.split(/[.|!|?]\s|[\r?\n]/));let f=[];if(f=n?i.parameters?n.filter((e=>{if(!i.parameters.some((t=>e.name===t.name&&e.in===t.in)))return e})).concat(i.parameters):n.slice(0):i.parameters?i.parameters.slice(0):[],i.callbacks)for(const[e,t]of Object.entries(i.callbacks)){const r=Object.entries(t).filter((e=>"object"==typeof e[1]))||[];i.callbacks[e]=Object.fromEntries(r)}c.paths.push({show:!0,expanded:!1,isWebhook:l,expandedAtLeastOnce:!1,summary:i.summary||"",description:i.description||"",shortSummary:h,method:o,path:t,operationId:i.operationId,elementId:`${o}-${t.replace(tt,"-")}`,servers:i.servers?s.servers.concat(i.servers):s.servers,parameters:f,requestBody:i.requestBody,responses:i.responses,callbacks:i.callbacks,deprecated:i.deprecated,security:i.security,xBadges:i["x-badges"]||void 0,xCodeSamples:i["x-codeSamples"]||i["x-code-samples"]||""})}))}}))}const s=a.filter((e=>e.paths&&e.paths.length>0));return s.forEach((e=>{"method"===t?e.paths.sort(((e,t)=>o.indexOf(e.method).toString().localeCompare(o.indexOf(t.method)))):"summary"===t?e.paths.sort(((e,t)=>e.shortSummary.localeCompare(t.shortSummary))):"path"===t&&e.paths.sort(((e,t)=>e.path.localeCompare(t.path))),e.firstPathId=e.paths[0].elementId})),n?s.sort(((e,t)=>e.name.localeCompare(t.name))):s}(p,n,t,r),v=function(e){if(!e.components)return[];const t=[];for(const r in e.components){const n=[];for(const t in e.components[r]){const o={show:!0,id:`${r.toLowerCase()}-${t.toLowerCase()}`.replace(tt,"-"),name:t,component:e.components[r][t]};n.push(o)}let o=r,a=r;switch(r){case"schemas":a="Schemas",o="Schemas allows the definition of input and output data types. These types can be objects, but also primitives and arrays.";break;case"responses":a="Responses",o="Describes responses from an API Operation, including design-time, static links to operations based on the response.";break;case"parameters":a="Parameters",o="Describes operation parameters. A unique parameter is defined by a combination of a name and location.";break;case"examples":a="Examples",o="List of Examples for operations, can be requests, responses and objects examples.";break;case"requestBodies":a="Request Bodies",o="Describes common request bodies that are used across the API operations.";break;case"headers":a="Headers",o='Headers follows the structure of the Parameters but they are explicitly in "header"';break;case"securitySchemes":a="Security Schemes",o="Defines a security scheme that can be used by the operations. Supported schemes are HTTP authentication, an API key (either as a header, a cookie parameter or as a query parameter), OAuth2's common flows(implicit, password, client credentials and authorization code) as defined in RFC6749, and OpenID Connect Discovery.";break;case"links":a="Links",o="Links represent a possible design-time link for a response. The presence of a link does not guarantee the caller's ability to successfully invoke it, rather it provides a known relationship and traversal mechanism between responses and other operations.";break;case"callbacks":a="Callbacks",o="A map of possible out-of band callbacks related to the parent operation. Each value in the map is a Path Item Object that describes a set of requests that may be initiated by the API provider and the expected responses. The key value used to identify the path item object is an expression, evaluated at runtime, that identifies a URL to use for the callback operation.";break;default:a=r,o=r}const i={show:!0,name:a,description:o,subComponents:n};t.push(i)}return t||[]}(p),b=null!==(l=p.info)&&void 0!==l&&l.description?DP(p.info.description):[],x=[];if(null!==(c=p.components)&&void 0!==c&&c.securitySchemes){const e=new Set;Object.entries(p.components.securitySchemes).forEach((t=>{if(!e.has(t[0])){e.add(t[0]);const r={securitySchemeId:t[0],...t[1]};r.value="",r.finalKeyValue="","apiKey"===t[1].type||"http"===t[1].type?(r.in=t[1].in||"header",r.name=t[1].name||"Authorization",r.user="",r.password=""):"oauth2"===t[1].type&&(r.in="header",r.name="Authorization",r.clientId="",r.clientSecret=""),x.push(r)}}))}o&&a&&i&&x.push({securitySchemeId:rt,description:"api-key provided in rapidoc element attributes",type:"apiKey",oAuthFlow:"",name:o,in:a,value:i,finalKeyValue:i}),x.forEach((e=>{"http"===e.type?e.typeDisplay="basic"===e.scheme?"HTTP Basic":"HTTP Bearer":"apiKey"===e.type?e.typeDisplay=`API Key (${e.name})`:"oauth2"===e.type?e.typeDisplay=`OAuth (${e.securitySchemeId})`:e.typeDisplay=e.type}));let w=[];p.servers&&Array.isArray(p.servers)?(p.servers.forEach((e=>{let t=e.url.trim();t.startsWith("http")||t.startsWith("//")||t.startsWith("{")||window.location.origin.startsWith("http")&&(e.url=window.location.origin+e.url,t=e.url),e.variables&&Object.entries(e.variables).forEach((e=>{const r=new RegExp(`{${e[0]}}`,"g");t=t.replace(r,e[1].default||""),e[1].value=e[1].default||""})),e.computedUrl=t})),s&&p.servers.push({url:s,computedUrl:s})):s?p.servers=[{url:s,computedUrl:s}]:window.location.origin.startsWith("http")?p.servers=[{url:window.location.origin,computedUrl:window.location.origin}]:p.servers=[{url:"http://localhost",computedUrl:"http://localhost"}],w=p.servers;return{specLoadError:!1,isSpecLoading:!1,info:p.info,infoDescriptionHeaders:b,tags:g,components:v,externalDocs:p.externalDocs,securitySchemes:x,servers:w}}function DP(e){return qe.lexer(e).filter((e=>"heading"===e.type&&e.depth<=2))||[]}const FP=1,BP=2,NP=3,zP=4,UP=e=>(...t)=>({_$litDirective$:e,values:t});class qP{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class MP extends qP{constructor(e){if(super(e),this.it=N,e.type!==BP)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===N||null==e)return this.ft=void 0,this.it=e;if(e===B)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this.ft;this.it=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}MP.directiveName="unsafeHTML",MP.resultType=1;const HP=UP(MP),WP="rapidoc";function VP(e,t="",r="",n=""){var o,a;const i=null===(o=this.resolvedSpec.securitySchemes)||void 0===o?void 0:o.find((t=>t.securitySchemeId===e));if(!i)return!1;let s="";if("basic"===(null===(a=i.scheme)||void 0===a?void 0:a.toLowerCase()))t&&(s=`Basic ${btoa(`${t}:${r}`)}`);else if(n){var l;i.value=n,s=`${"bearer"===(null===(l=i.scheme)||void 0===l?void 0:l.toLowerCase())?"Bearer ":""}${n}`}return!!s&&(i.finalKeyValue=s,this.requestUpdate(),!0)}function GP(){var e;null===(e=this.resolvedSpec.securitySchemes)||void 0===e||e.forEach((e=>{e.user="",e.password="",e.value="",e.finalKeyValue=""})),this.requestUpdate()}function KP(){return JSON.parse(localStorage.getItem(WP))||{}}function JP(e){localStorage.setItem(WP,JSON.stringify(e))}function YP(){const e=KP.call(this);Object.values(e).forEach((e=>{VP.call(this,e.securitySchemeId,e.username,e.password,e.value)}))}function ZP(e){let t="";const r=this.resolvedSpec.securitySchemes.find((t=>t.securitySchemeId===e));if(r){const n=this.shadowRoot.getElementById(`security-scheme-${e}`);if(n){if(r.type&&r.scheme&&"http"===r.type&&"basic"===r.scheme.toLowerCase()){const t=n.querySelector(".api-key-user").value.trim(),r=n.querySelector(".api-key-password").value.trim();VP.call(this,e,t,r)}else t=n.querySelector(".api-key-input").value.trim(),VP.call(this,e,"","",t);if("true"===this.persistAuth){const t=KP.call(this);t[e]=r,JP.call(this,t)}}}}function QP(e,t,r="Bearer"){this.resolvedSpec.securitySchemes.find((t=>t.securitySchemeId===e)).finalKeyValue=`${"bearer"===r.toLowerCase()?"Bearer":"mac"===r.toLowerCase()?"MAC":r} ${t}`,this.requestUpdate()}async function XP(e,t,r,n,o,a,i,s,l="header",c=null,p=null,u=null){const d=s?s.querySelector(".oauth-resp-display"):void 0,h=new URLSearchParams,f=new Headers;h.append("grant_type",o),"client_credentials"!==o&&"password"!==o&&h.append("redirect_uri",n),a&&(h.append("code",a),h.append("code_verifier","731DB1C3F7EA533B85E29492D26AA-1234567890-1234567890")),"header"===l?f.set("Authorization",`Basic ${btoa(`${t}:${r}`)}`):(h.append("client_id",t),h.append("client_secret",r)),"password"===o&&(h.append("username",p),h.append("password",u)),c&&h.append("scope",c);try{const t=await fetch(e,{method:"POST",headers:f,body:h}),r=await t.json();if(!t.ok)return d&&(d.innerHTML=`<span style="color:var(--red)">${r.error_description||r.error_description||"Unable to get access token"}</span>`),!1;if(r.token_type&&r.access_token)return QP.call(this,i,r.access_token,r.token_type),d&&(d.innerHTML='<span style="color:var(--green)">Access Token Received</span>'),!0}catch(e){return d&&(d.innerHTML='<span style="color:var(--red)">Failed to get access token</span>'),!1}}async function eR(e,t,r,n,o,a,i,s,l,c){sessionStorage.removeItem("winMessageEventActive"),t.close(),e.data.fake||(e.data||console.warn("RapiDoc: Received no data with authorization message"),e.data.error&&console.warn("RapiDoc: Error while receiving data"),e.data&&("code"===e.data.responseType?XP.call(this,r,n,o,a,i,e.data.code,l,c,s):"token"===e.data.responseType&&QP.call(this,l,e.data.access_token,e.data.token_type)))}async function tR(e,t,r,n,o){const a=o.target.closest(".oauth-flow"),i=a.querySelector(".oauth-client-id")?a.querySelector(".oauth-client-id").value.trim():"",s=a.querySelector(".oauth-client-secret")?a.querySelector(".oauth-client-secret").value.trim():"",l=a.querySelector(".api-key-user")?a.querySelector(".api-key-user").value.trim():"",c=a.querySelector(".api-key-password")?a.querySelector(".api-key-password").value.trim():"",p=a.querySelector(".oauth-send-client-secret-in")?a.querySelector(".oauth-send-client-secret-in").value.trim():"header",u=[...a.querySelectorAll(".scope-checkbox:checked")],d=a.querySelector(`#${e}-pkce`),h=`${Math.random().toString(36)}random`.slice(2,9),f=`${Math.random().toString(36)}random`.slice(2,9),m=new URL(`${window.location.origin}${window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/"))}/${this.oauthReceiver}`);let y,g="",v="";if([...a.parentNode.querySelectorAll(".oauth-resp-display")].forEach((e=>{e.innerHTML=""})),"authorizationCode"===t||"implicit"===t){const o=new URL(r);"authorizationCode"===t?(g="authorization_code",v="code"):"implicit"===t&&(v="token");const l=new URLSearchParams(o.search),c=u.map((e=>e.value)).join(" ");c&&l.set("scope",c),l.set("client_id",i),l.set("redirect_uri",m.toString()),l.set("response_type",v),l.set("state",h),l.set("nonce",f),d&&d.checked&&(l.set("code_challenge","4FatVDBJKPAo4JgLLaaQFMUcQPn5CrPRvLlaob9PTYc"),l.set("code_challenge_method","S256")),l.set("show_dialog",!0),o.search=l.toString(),"true"===sessionStorage.getItem("winMessageEventActive")&&window.postMessage({fake:!0},this),setTimeout((()=>{y=window.open(o.toString()),y?(sessionStorage.setItem("winMessageEventActive","true"),window.addEventListener("message",(t=>eR.call(this,t,y,n,i,s,m.toString(),g,p,e,a)),{once:!0})):console.error(`RapiDoc: Unable to open ${o.toString()} in a new window`)}),10)}else if("clientCredentials"===t){g="client_credentials";const t=u.map((e=>e.value)).join(" ");XP.call(this,n,i,s,m.toString(),g,"",e,a,p,t)}else if("password"===t){g="password";const t=u.map((e=>e.value)).join(" ");XP.call(this,n,i,s,m.toString(),g,"",e,a,p,t,l,c)}}function rR(e,t,r,n,o,a=[]){let{authorizationUrl:i,tokenUrl:s,refreshUrl:l}=o;const c=e=>e.indexOf("://")>0||0===e.indexOf("//");let p;return l&&!c(l)&&(l=`${this.selectedServer.computedUrl}/${l.replace(/^\//,"")}`),s&&!c(s)&&(s=`${this.selectedServer.computedUrl}/${s.replace(/^\//,"")}`),i&&!c(i)&&(i=`${this.selectedServer.computedUrl}/${i.replace(/^\//,"")}`),p="authorizationCode"===e?"Authorization Code Flow":"clientCredentials"===e?"Client Credentials Flow":"implicit"===e?"Implicit Flow":"password"===e?"Password Flow":e,F`
    <div class="oauth-flow ${e}" style="padding: 12px 0; margin-bottom:12px;">
      <div class="tiny-title upper" style="margin-bottom:8px;">${p}</div>
      ${i?F`<div style="margin-bottom:5px"><span style="width:75px; display: inline-block;">Auth URL</span> <span class="mono-font"> ${i} </span></div>`:""}
      ${s?F`<div style="margin-bottom:5px"><span style="width:75px; display: inline-block;">Token URL</span> <span class="mono-font">${s}</span></div>`:""}
      ${l?F`<div style="margin-bottom:5px"><span style="width:75px; display: inline-block;">Refresh URL</span> <span class="mono-font">${l}</span></div>`:""}
      ${"authorizationCode"===e||"clientCredentials"===e||"implicit"===e||"password"===e?F`
          ${o.scopes?F`
              <span> Scopes </span>
              <div class= "oauth-scopes" part="section-auth-scopes" style = "width:100%; display:flex; flex-direction:column; flex-wrap:wrap; margin:0 0 10px 24px">
                ${Object.entries(o.scopes).map(((t,r)=>F`
                  <div class="m-checkbox" style="display:inline-flex; align-items:center">
                    <input type="checkbox" part="checkbox checkbox-auth-scope" class="scope-checkbox" id="${n}${e}${r}" ?checked="${a.includes(t[0])}" value="${t[0]}">
                    <label for="${n}${e}${r}" style="margin-left:5px; cursor:pointer">
                      <span class="mono-font">${t[0]}</span>
                        ${t[0]!==t[1]?` - ${t[1]||""}`:""}
                    </label>
                  </div>
                `))}
              </div>
            `:""}
          ${"password"===e?F`
              <div style="margin:5px 0">
                <input type="text" value = "" placeholder="username" spellcheck="false" class="oauth2 ${e} ${n} api-key-user" part="textbox textbox-username">
                <input type="password" value = "" placeholder="password" spellcheck="false" class="oauth2 ${e} ${n} api-key-password" style = "margin:0 5px;" part="textbox textbox-password">
              </div>`:""}
          <div>
            ${"authorizationCode"===e?F`
                <div style="margin: 16px 0 4px">
                  <input type="checkbox" part="checkbox checkbox-auth-scope" id="${n}-pkce" checked>
                  <label for="${n}-pkce" style="margin:0 16px 0 4px; line-height:24px; cursor:pointer">
                   Send Proof Key for Code Exchange (PKCE)
                  </label>
                </div>
              `:""}
            <input type="text" part="textbox textbox-auth-client-id" value = "${t||""}" placeholder="client-id" spellcheck="false" class="oauth2 ${e} ${n} oauth-client-id">
            ${"authorizationCode"===e||"clientCredentials"===e||"password"===e?F`
                <input type="password" part="textbox textbox-auth-client-secret" value = "${r||""}" placeholder="client-secret" spellcheck="false" class="oauth2 ${e} ${n} oauth-client-secret" style = "margin:0 5px;">
                ${"authorizationCode"===e||"clientCredentials"===e||"password"===e?F`
                    <select style="margin-right:5px;" class="${e} ${n} oauth-send-client-secret-in">
                      <option value = 'header' selected> Authorization Header </option>
                      <option value = 'request-body'> Request Body </option>
                    </select>`:""}`:""}
            ${"authorizationCode"===e||"clientCredentials"===e||"implicit"===e||"password"===e?F`
                <button class="m-btn thin-border" part="btn btn-outline"
                  @click="${t=>{tR.call(this,n,e,i,s,t)}}"
                > GET TOKEN </button>`:""}
          </div>
          <div class="oauth-resp-display red-text small-font-size"></div>
          `:""}
    </div>
  `}function nR(e){var t;const r=null===(t=this.resolvedSpec.securitySchemes)||void 0===t?void 0:t.find((t=>t.securitySchemeId===e));if(r.user="",r.password="",r.value="",r.finalKeyValue="","true"===this.persistAuth){const e=KP.call(this);delete e[r.securitySchemeId],JP.call(this,e)}this.requestUpdate()}function oR(){var e;if(!this.resolvedSpec)return"";const t=null===(e=this.resolvedSpec.securitySchemes)||void 0===e?void 0:e.filter((e=>e.finalKeyValue));return t?F`
  <section id='auth' part="section-auth" style="text-align:left; direction:ltr; margin-top:24px; margin-bottom:24px;" class = 'observe-me ${"read focused".includes(this.renderStyle)?"section-gap--read-mode":"section-gap "}'>
    <div class='sub-title regular-font'> AUTHENTICATION </div>

    <div class="small-font-size" style="display:flex; align-items: center; min-height:30px">
      ${t.length>0?F`
          <div class="blue-text"> ${t.length} API key applied </div>
          <div style="flex:1"></div>
          <button class="m-btn thin-border" part="btn btn-outline" @click=${()=>{GP.call(this)}}>CLEAR ALL API KEYS</button>`:F`<div class="red-text">No API key applied</div>`}
    </div>
    ${this.resolvedSpec.securitySchemes&&this.resolvedSpec.securitySchemes.length>0?F`
        <table id="auth-table" class='m-table padded-12' style="width:100%;">
          ${this.resolvedSpec.securitySchemes.map((e=>F`
            <tr id="security-scheme-${e.securitySchemeId}" class="${e.type.toLowerCase()}">
              <td style="max-width:500px; overflow-wrap: break-word;">
                <div style="line-height:28px; margin-bottom:5px;">
                  <span style="font-weight:bold; font-size:var(--font-size-regular)">${e.typeDisplay}</span>
                  ${e.finalKeyValue?F`
                      <span class='blue-text'>  ${e.finalKeyValue?"Key Applied":""} </span>
                      <button class="m-btn thin-border small" part="btn btn-outline" @click=${()=>{nR.call(this,e.securitySchemeId)}}>REMOVE</button>
                      `:""}
                </div>
                ${e.description?F`
                    <div class="m-markdown">
                      ${HP(qe(e.description||""))}
                    </div>`:""}

                ${"apikey"===e.type.toLowerCase()||"http"===e.type.toLowerCase()&&"bearer"===e.scheme.toLowerCase()?F`
                    <div style="margin-bottom:5px">
                      ${"apikey"===e.type.toLowerCase()?F`Send <code>${e.name}</code> in <code>${e.in}</code>`:F`Send <code>Authorization</code> in <code>header</code> containing the word <code>Bearer</code> followed by a space and a Token String.`}
                    </div>
                    <div style="max-height:28px;">
                      ${"cookie"!==e.in?F`
                          <input type = "text" value = "${e.value}" class="${e.type} ${e.securitySchemeId} api-key-input" placeholder = "api-token" spellcheck = "false">
                          <button class="m-btn thin-border" style = "margin-left:5px;"
                            part = "btn btn-outline"
                            @click="${t=>{ZP.call(this,e.securitySchemeId,t)}}">
                            ${e.finalKeyValue?"UPDATE":"SET"}
                          </button>`:F`<span class="gray-text" style="font-size::var(--font-size-small)"> cookies cannot be set from here</span>`}
                    </div>`:""}
                ${"http"===e.type.toLowerCase()&&"basic"===e.scheme.toLowerCase()?F`
                    <div style="margin-bottom:5px">
                      Send <code>Authorization</code> in <code>header</code> containing the word <code>Basic</code> followed by a space and a base64 encoded string of <code>username:password</code>.
                    </div>
                    <div>
                      <input type="text" value = "${e.user}" placeholder="username" spellcheck="false" class="${e.type} ${e.securitySchemeId} api-key-user" style="width:100px">
                      <input type="password" value = "${e.password}" placeholder="password" spellcheck="false" class="${e.type} ${e.securitySchemeId} api-key-password" style = "width:100px; margin:0 5px;">
                      <button class="m-btn thin-border"
                        @click="${t=>{ZP.call(this,e.securitySchemeId,t)}}"
                        part = "btn btn-outline"
                      >
                        ${e.finalKeyValue?"UPDATE":"SET"}
                      </button>
                    </div>`:""}
              </td>
            </tr>
            ${"oauth2"===e.type.toLowerCase()?F`
                <tr>
                  <td style="border:none; padding-left:48px">
                    ${Object.keys(e.flows).map((t=>rR.call(this,t,e["x-client-id"],e["x-client-secret"],e.securitySchemeId,e.flows[t],e["x-default-scopes"])))}
                  </td>
                </tr>
                `:""}
          `))}
        </table>`:""}
    <slot name="auth"></slot>
  </section>
`:void 0}function aR(e){if(this.resolvedSpec.securitySchemes&&e){const t=[];return e.forEach((e=>{const r=[],n=[];Object.keys(e).forEach((t=>{let o="";const a=this.resolvedSpec.securitySchemes.find((e=>e.securitySchemeId===t));e[t]&&Array.isArray(e[t])&&(o=e[t].join(", ")),a&&(n.push(a.typeDisplay),r.push({...a,scopes:o}))})),t.push({securityTypes:n.length>1?`${n[0]} + ${n.length-1} more`:n[0],securityDefs:r})})),F`<div style="position:absolute; top:3px; right:2px; font-size:var(--font-size-small); line-height: 1.5;">
      <div style="position:relative; display:flex; min-width:350px; max-width:700px; justify-content: flex-end;">
        <svg width="16" height="24">
          <g>
            <path style="fill: var(--fg3)" d="m13.8,8.5l0,-2.6l0,0c0,-3.2 -2.6,-5.8 -5.8,-5.8s-5.8,2.6 -5.8,5.8l0,0l0,2.6l-2.1,0l0,11.2l16,0l0,-11.2l-2.1,0l-0,0l0,0l0,0l-0,0zm-9.8,-2.6c0,0 0,0 0,0c0,-2.2 1.8,-4 4,-4c2.2,0 4,1.8 4,4c0,0 0,0 0,0l0,2.6l-8.03,0l0,-2.6l0,0l0,0z" />
          </g>
        </svg>
          ${t.map(((e,t)=>F`

          ${e.securityTypes?F`
              ${0!==t?F`<div style="padding:3px 4px;"> OR </div>`:""}
              <div class="tooltip">
                <div style = "padding:2px 4px; white-space:nowrap; text-overflow:ellipsis;max-width:150px; overflow:hidden;">
                  <a part="anchor anchor-operation-security" href="#auth"> ${e.securityTypes} </a>
                </div>
                <div class="tooltip-text" style="position:absolute; color: var(--fg); top:26px; right:0; border:1px solid var(--border-color);padding:2px 4px; display:block;">
                  ${e.securityDefs.length>1?F`<div>Requires <b>all</b> of the following </div>`:""}
                  <div style="padding-left: 8px">
                    ${e.securityDefs.map(((t,r)=>{const n=F`${""!==t.scopes?F`
                          <div>
                            <b>Required scopes:</b>
                            <br/>
                            <div style="margin-left:8px">
                              ${t.scopes.split(",").map(((e,t)=>F`${0===t?"":"┃"}<span>${e}</span>`))}
                            </div>
                          </div>`:""}`;return F`
                      ${"oauth2"===t.type?F`
                          <div>
                            ${e.securityDefs.length>1?F`<b>${r+1}.</b> &nbsp;`:"Needs"}
                            OAuth Token <span style="font-family:var(--font-mono); color:var(--primary-color);">${t.securitySchemeId}</span> in <b>Authorization header</b>
                            ${n}
                          </div>`:"http"===t.type?F`
                            <div>
                              ${e.securityDefs.length>1?F`<b>${r+1}.</b> &nbsp;`:F`Requires`}
                              ${"basic"===t.scheme?"Base 64 encoded username:password":"Bearer Token"} in <b>Authorization header</b>
                              ${n}
                            </div>`:F`
                            <div>
                              ${e.securityDefs.length>1?F`<b>${r+1}.</b> &nbsp;`:F`Requires`}
                              Token in <b>${t.name} ${t.in}</b>
                              ${n}
                            </div>`}`}))}
                  </div>
                </div>
              </div>
            `:""}
        `))}
      </div>
    `}return""}function iR(e){return F`
  <section class="table-title" style="margin-top:24px;">CODE SAMPLES</div>
  <div class="tab-panel col"
    @click="${e=>{if(!e.target.classList.contains("tab-btn"))return;const t=e.target.dataset.tab,r=[...e.currentTarget.querySelectorAll(".tab-btn")],n=[...e.currentTarget.querySelectorAll(".tab-content")];r.forEach((e=>e.classList[e.dataset.tab===t?"add":"remove"]("active"))),n.forEach((e=>{e.style.display=e.dataset.tab===t?"block":"none"}))}}">
    <div class="tab-buttons row" style="width:100; overflow">
      ${e.map(((e,t)=>F`<button class="tab-btn ${0===t?"active":""}" data-tab = '${e.lang}${t}'> ${e.label||e.lang} </button>`))}
    </div>
    ${e.map(((e,t)=>{var r,n,o;return F`
      <div class="tab-content m-markdown" style= "display:${0===t?"block":"none"}" data-tab = '${e.lang}${t}'>
        <button class="toolbar-btn" style = "position:absolute; top:12px; right:8px" @click='${t=>{ot(e.source,t)}}'> Copy </button>
        <pre><code class="language">${He().languages[null===(r=e.lang)||void 0===r?void 0:r.toLowerCase()]?HP(He().highlight(e.source,He().languages[null===(n=e.lang)||void 0===n?void 0:n.toLowerCase()],null===(o=e.lang)||void 0===o?void 0:o.toLowerCase())):e.source}</code></pre>
      </div>`}))}
  </section>`}function sR(e){return F`
    <div class="req-res-title" style="margin-top:12px">CALLBACKS</div>
    ${Object.entries(e).map((e=>F`
      <div class="tiny-title" style="padding: 12px; border:1px solid var(--light-border-color)"> 
        ${e[0]}
        ${Object.entries(e[1]).map((e=>F`
          <div class="mono-font small-font-size" style="display:flex; margin-left:16px;">
            <div> 
              ${Object.entries(e[1]).map((t=>{var r,n,o;return F`
                <div>
                  <div style="margin-top:12px;">
                    <div class="method method-fg ${t[0]}" style="width:70px; border:none; margin:0; padding:0; line-height:20px; vertical-align: baseline;text-align:left"> 
                      <span style="font-size:20px;"> &#x2944; </span> 
                      ${t[0]} 
                    </div>
                    <span style="line-height:20px; vertical-align: baseline;">${e[0]} </span>
                  </div>  
                  <div class='expanded-req-resp-container'>
                    <api-request
                      class = "${this.renderStyle}-mode callback"  
                      style = "width:100%;"
                      callback = "true"
                      method = "${t[0]||""}", 
                      path = "${e[0]||""}" 
                      .parameters = "${(null===(r=t[1])||void 0===r?void 0:r.parameters)||""}" 
                      .request_body = "${(null===(n=t[1])||void 0===n?void 0:n.requestBody)||""}"
                      fill-request-fields-with-example = "${this.fillRequestFieldsWithExample}"
                      allow-try = "false"
                      render-style="${this.renderStyle}" 
                      schema-style = "${this.schemaStyle}"
                      active-schema-tab = "${this.defaultSchemaTab}"
                      schema-expand-level = "${this.schemaExpandLevel}"
                      schema-description-expanded = "${this.schemaDescriptionExpanded}"
                      allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}",
                      schema-hide-read-only = "${this.schemaHideReadOnly}"
                      fetch-credentials = "${this.fetchCredentials}"
                      exportparts = "btn:btn, btn-fill:btn-fill, btn-outline:btn-outline, btn-try:btn-try, btn-clear:btn-clear, btn-clear-resp:btn-clear-resp,
                        file-input:file-input, textbox:textbox, textbox-param:textbox-param, textarea:textarea, textarea-param:textarea-param, 
                        anchor:anchor, anchor-param-example:anchor-param-example"
                    > </api-request>

                    <api-response
                      style = "width:100%;"
                      class = "${this.renderStyle}-mode"
                      callback = "true"
                      .responses="${null===(o=t[1])||void 0===o?void 0:o.responses}"
                      render-style="${this.renderStyle}"
                      schema-style="${this.schemaStyle}"
                      active-schema-tab = "${this.defaultSchemaTab}"
                      schema-expand-level = "${this.schemaExpandLevel}"
                      schema-description-expanded = "${this.schemaDescriptionExpanded}"
                      allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}"
                      exportparts = "btn:btn, btn-response-status:btn-response-status, btn-selected-response-status:btn-selected-response-status, btn-fill:btn-fill, btn-copy:btn-copy"
                    > </api-response>
                  </div>
                </div>  
              `}))}
            </div>  
          </div>  
        `))}
      </div>  
    `))}
  `}const lR={},cR=UP(class extends qP{constructor(){super(...arguments),this.nt=lR}render(e,t){return t()}update(e,[t,r]){if(Array.isArray(t)){if(Array.isArray(this.nt)&&this.nt.length===t.length&&t.every(((e,t)=>e===this.nt[t])))return B}else if(this.nt===t)return B;return this.nt=Array.isArray(t)?Array.from(t):t,this.render(t,r)}}),{H:pR}=X,uR={},dR=UP(class extends qP{constructor(e){if(super(e),e.type!==NP&&e.type!==FP&&e.type!==zP)throw Error("The `live` directive is not allowed on child or event bindings");if(!(e=>void 0===e.strings)(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===B||t===N)return t;const r=e.element,n=e.name;if(e.type===NP){if(t===r[n])return B}else if(e.type===zP){if(!!t===r.hasAttribute(n))return B}else if(e.type===FP&&r.getAttribute(n)===t+"")return B;return((e,t=uR)=>{e._$AH=t})(e),t}}),hR=l`
.border-top {
  border-top:1px solid var(--border-color);
}
.border{
  border:1px solid var(--border-color);
  border-radius: var(--border-radius);
}
.light-border{
  border:1px solid var(--light-border-color);
  border-radius: var(--border-radius);
}
.pad-8-16{
  padding: 8px 16px;
}
.pad-top-8{
  padding-top: 8px;
}
.mar-top-8{
  margin-top: 8px;
}
`;function fR(e){if(!e)return;let t="",r="";if(e.$ref){const r=e.$ref.lastIndexOf("/");t=`{recursive: ${e.$ref.substring(r+1)}} `}else e.type?(t=Array.isArray(e.type)?e.type.join("┃"):e.type,(e.format||e.enum)&&(t=t.replace("string",e.enum?"enum":e.format)),e.nullable&&(t+="┃null")):t=0===Object.keys(e).length?"any":"{missing-type-info}";const n={type:t,format:e.format||"",pattern:e.pattern&&!e.enum?e.pattern:"",readOrWriteOnly:e.readOnly?"🆁":e.writeOnly?"🆆":"",deprecated:e.deprecated?"❌":"",examples:e.examples||e.example,default:null!=e.default?`${e.default}`:"",description:e.description||"",constrain:"",allowedValues:"",arrayType:"",html:""};if("{recursive}"===n.type?n.description=e.$ref.substring(e.$ref.lastIndexOf("/")+1):"{missing-type-info}"!==n.type&&"any"!==n.type||(n.description=n.description||""),n.allowedValues=Array.isArray(e.enum)?e.enum.join("┃"):"","array"===t&&e.items){var o,a,i;const t=null===(o=e.items)||void 0===o?void 0:o.type,r=void 0!==(null===(a=e.items)||void 0===a?void 0:a.default)?e.items.default:"";n.arrayType=`${e.type} of ${Array.isArray(t)?t.join(""):t}`,n.default=r,n.allowedValues=Array.isArray(null===(i=e.items)||void 0===i?void 0:i.enum)?e.items.enum.join("┃"):""}return t.match(/integer|number/g)&&(void 0===e.minimum&&void 0===e.exclusiveMinimum||(r+=void 0!==e.minimum?`Min ${e.minimum}`:`More than ${e.exclusiveMinimum}`),void 0===e.maximum&&void 0===e.exclusiveMaximum||(r+=void 0!==e.maximum?`${r?"┃":""}Max ${e.maximum}`:`${r?"┃":""}Less than ${e.exclusiveMaximum}`),void 0!==e.multipleOf&&(r+=`${r?"┃":""} multiple of ${e.multipleOf}`)),t.match(/string/g)&&(void 0!==e.minLength&&void 0!==e.maxLength?r+=`${r?"┃":""}${e.minLength} to ${e.maxLength} chars`:void 0!==e.minLength?r+=`${r?"┃":""}Min ${e.minLength} chars`:void 0!==e.maxLength&&(r+=`Max ${r?"┃":""}${e.maxLength} chars`)),n.constrain=r,n.html=`${n.type}~|~${n.readOrWriteOnly}~|~${n.constrain}~|~${n.default}~|~${n.allowedValues}~|~${n.pattern}~|~${n.description}~|~${e.title||""}~|~${n.deprecated?"deprecated":""}`,n}function mR(e){return e?{Example:{value:e}}:e}function yR(e,t="string"){let r,n;if(e){if(e.constructor===Object){const t=Object.values(e);r=t.length>0?"boolean"==typeof t[0].value||"number"==typeof t[0].value?t[0].value.toString():t[0].value:"",n=Object.values(e).map((e=>({value:"boolean"==typeof e.value||"number"==typeof e.value?e.value.toString():e.value,description:e.description||e.summary||e.value})))}else Array.isArray(e)||(e=e?[e]:[]),e.length>0&&("array"===t?([r]=e,n=e.map((e=>({value:e,description:Array.isArray(e)?e.join(" , "):e})))):(r=e[0].toString(),n=e.map((e=>({value:e.toString(),description:e})))));return{exampleVal:r,exampleList:n}}return{exampleVal:"",exampleList:[]}}function gR(e){const t=e.examples?e.examples[0]:null===e.example?null:e.example||void 0;if(""===t)return"";if(null===t)return null;if(0===t)return 0;if(t)return t;if(0===Object.keys(e).length)return null;if(e.$ref)return e.$ref;const r=Array.isArray(e.type)?e.type[0]:e.type;if(!r)return"?";if(r.match(/^integer|^number/g)){const t=Number.isNaN(Number(e.multipleOf))?void 0:Number(e.multipleOf),n=Number.isNaN(Number(e.maximum))?void 0:Number(e.maximum),o=Number.isNaN(Number(e.minimum))?Number.isNaN(Number(e.exclusiveMinimum))?n||0:Number(e.exclusiveMinimum)+(r.startsWith("integer")?1:.001):Number(e.minimum);return t?t>=o?t:o%t==0?o:Math.ceil(o/t)*t:o}if(r.match(/^boolean/g))return!1;if(r.match(/^null/g))return null;if(r.match(/^string/g)){if(e.enum)return e.enum[0];if(e.pattern)return e.pattern;if(!e.format){const t=Number.isNaN(e.minLength)?void 0:Number(e.minLength),r=Number.isNaN(e.maxLength)?void 0:Number(e.maxLength),n=t||(r>6?6:r||void 0);return n?"A".repeat(n):"string"}{const t=`${Date.now().toString(16)}${Math.random().toString(16)}0`.repeat(16);switch(e.format.toLowerCase()){case"url":case"uri":return"http://example.com";case"date":return new Date(0).toISOString().split("T")[0];case"time":return new Date(0).toISOString().split("T")[1];case"date-time":return new Date(0).toISOString();case"duration":return"P3Y6M4DT12H30M5S";case"email":case"idn-email":return"user@example.com";case"hostname":case"idn-hostname":return"www.example.com";case"ipv4":return"198.51.100.42";case"ipv6":return"2001:0db8:5b96:0000:0000:426f:8e17:642a";case"uuid":return[t.substr(0,8),t.substr(8,4),`4000-8${t.substr(13,3)}`,t.substr(16,12)].join("-");default:return""}}}return"?"}function vR(e,t=1){const r="  ".repeat(t);let n="";if(1===t&&"object"!=typeof e)return`\n${r}${e.toString()}`;for(const o in e)n=Array.isArray(e[o])||"object"==typeof e[o]?`${n}\n${r}<${o}> ${vR(e[o],t+1)}\n${r}</${o}>`:`${n}\n${r}<${o}> ${e[o].toString()} </${o}>`;return n}function bR(e,t){"object"==typeof t&&null!==t&&(e.title&&(t["::TITLE"]=e.title),e.description&&(t["::DESCRIPTION"]=e.description))}function xR(e){if("object"==typeof e&&null!==e){delete e["::TITLE"],delete e["::DESCRIPTION"];for(const t in e)xR(e[t])}}function wR(e,t,r){for(const n in t)t[n][r]=e}function $R(e,t,r){let n=0;const o={};for(const a in e){for(const i in r)if(o[`example-${n}`]={...e[a]},o[`example-${n}`][t]=r[i],n++,n>=10)break;if(n>=10)break}return o}function kR(e,t={}){let r={};if(e){if(e.allOf){const n={};if(1===e.allOf.length&&!e.allOf[0].properties&&!e.allOf[0].items){if(e.allOf[0].$ref)return"{  }";if(e.allOf[0].readOnly&&t.includeReadOnly){return gR(e.allOf[0])}return}e.allOf.forEach((e=>{if("object"===e.type||e.properties||e.allOf||e.anyOf||e.oneOf){const r=kR(e,t);Object.assign(n,r)}else if("array"===e.type||e.items){const r=[kR(e,t)];Object.assign(n,r)}else{if(!e.type)return"";{const t=`prop${Object.keys(n).length}`;n[t]=gR(e)}}})),r=n}else if(e.oneOf){const n={};if(e.properties)for(const t in e.properties)n[t]=gR(e.properties[t]);if(e.oneOf.length>0){let o=0;for(const a in e.oneOf){const i=kR(e.oneOf[a],t);for(const t in i)if(null===i[t]){const s=Object.assign(i[t],n);r[`example-${o}`]=s,bR(e.oneOf[a],r[`example-${o}`]),o++}}}}else if(e.anyOf){let n;if("object"===e.type||e.properties){n={"example-0":{}};for(const r in e.properties){if(e.example){n=e;break}e.properties[r].deprecated&&!t.includeDeprecated||(e.properties[r].readOnly&&!t.includeReadOnly||e.properties[r].writeOnly&&!t.includeWriteOnly||(n=$R(n,r,kR(e.properties[r],t))))}}let o=0;for(const a in e.anyOf){const i=kR(e.anyOf[a],t);for(const t in i){if(void 0!==n)for(const e in n)r[`example-${o}`]={...n[e],...i[t]};else r[`example-${o}`]=i[t];bR(e.anyOf[a],r[`example-${o}`]),o++}}}else if("object"===e.type||e.properties)if(r["example-0"]={},bR(e,r["example-0"]),e.example)r["example-0"]=e.example;else for(const p in e.properties){var n,o,a,i,s,l,c;if(null===(n=e.properties[p])||void 0===n||!n.deprecated||t.includeDeprecated)if(null===(o=e.properties[p])||void 0===o||!o.readOnly||t.includeReadOnly)if(null===(a=e.properties[p])||void 0===a||!a.writeOnly||t.includeWriteOnly)if("array"===(null===(i=e.properties[p])||void 0===i?void 0:i.type)||null!==(s=e.properties[p])&&void 0!==s&&s.items)if(e.properties[p].example)wR(e.properties[p].example,r,p);else if(null!==(l=e.properties[p])&&void 0!==l&&null!==(c=l.items)&&void 0!==c&&c.example)wR([e.properties[p].items.example],r,p);else{const n=kR(e.properties[p].items,t),o=[];for(const e in n)o[e]=[n[e]];r=$R(r,p,o)}else r=$R(r,p,kR(e.properties[p],t))}else{if("array"!==e.type&&!e.items)return{"example-0":gR(e)};var p;if(e.example)r["example-0"]=e.example;else if(null!==(p=e.items)&&void 0!==p&&p.example)r["example-0"]=[e.items.example];else{const n=kR(e.items,t);let o=0;for(const t in n)r[`example-${o}`]=[n[t]],bR(e.items,r[`example-${o}`]),o++}}return r}}function SR(e,t=0){var r;let n="";if(e.title&&(n=`**${e.title}:** `),e.minItems&&(n=`${n} **Min Items:** ${e.minItems}`),e.maxItems&&(n=`${n} **Max Items:** ${e.maxItems}`),e.description&&(n=`${n} ${e.description}`),t>0&&null!==(r=e.items)&&void 0!==r&&r.description){let t="";e.items.minProperties&&(t=`**Min Properties:** ${e.items.minProperties}`),e.items.maxProperties&&(t=`${t} **Max Properties:** ${e.items.maxProperties}`),n=`${n} ⮕ ${t} [ ${e.items.description} ] `}return n}function AR(e,t,r=0,n=""){if(e){if(e.allOf){const n={};if(1===e.allOf.length&&!e.allOf[0].properties&&!e.allOf[0].items){return`${fR(e.allOf[0]).html}`}e.allOf.map(((e,t)=>{if("object"===e.type||e.properties||e.allOf||e.anyOf||e.oneOf){const o=(e.anyOf||e.oneOf)&&t>0?t:"",a=AR(e,{},r+1,o);Object.assign(n,a)}else if("array"===e.type||e.items){const t=AR(e,{},r+1);Object.assign(n,t)}else{if(!e.type)return"";{const t=`prop${Object.keys(n).length}`,r=fR(e);n[t]=`${r.html}`}}})),t=n}else if(e.anyOf||e.oneOf){if(t["::description"]=e.description||"","object"===e.type||e.properties){t["::description"]=e.description||"",t["::type"]="object";for(const n in e.properties)e.required&&e.required.includes(n)?t[`${n}*`]=AR(e.properties[n],{},r+1):t[n]=AR(e.properties[n],{},r+1)}const o={},a=e.anyOf?"anyOf":"oneOf";e[a].forEach(((e,t)=>{if("object"===e.type||e.properties||e.allOf||e.anyOf||e.oneOf){const r=AR(e,{});o[`::OPTION~${t+1}${e.title?`~${e.title}`:""}`]=r,o["::type"]="xxx-of-option"}else if("array"===e.type||e.items){const r=AR(e,{});o[`::OPTION~${t+1}${e.title?`~${e.title}`:""}`]=r,o["::type"]="xxx-of-array"}else{const r=`::OPTION~${t+1}${e.title?`~${e.title}`:""}`;o[r]=`${fR(e).html}`,o["::type"]="xxx-of-option"}})),t[e.anyOf?`::ANY~OF ${n}`:`::ONE~OF ${n}`]=o,t["::type"]="xxx-of"}else if(Array.isArray(e.type)){const n=JSON.parse(JSON.stringify(e)),i=[],s=[];let l;var o;if(n.type.forEach((e=>{var t,r;e.match(/integer|number|string|null|boolean/g)?i.push(e):"array"===e&&"string"==typeof(null===(t=n.items)||void 0===t?void 0:t.type)&&null!==(r=n.items)&&void 0!==r&&r.type.match(/integer|number|string|null|boolean/g)?"string"===n.items.type&&n.items.format?i.push(`[${n.items.format}]`):i.push(`[${n.items.type}]`):s.push(e)})),i.length>0)if(n.type=i.join("┃"),l=fR(n),0===s.length)return`${(null===(o=l)||void 0===o?void 0:o.html)||""}`;if(s.length>0){var a;t["::type"]="xxx-of";const o={"::type":"xxx-of-option"};s.forEach(((t,a)=>{if("null"===t)o[`::OPTION~${a+1}`]="NULL~|~~|~~|~~|~~|~~|~~|~~|~";else if("integer, number, string, boolean,".includes(`${t},`)){n.type=Array.isArray(t)?t.join("┃"):t;const e=fR(n);o[`::OPTION~${a+1}`]=e.html}else if("object"===t){const t={"::title":e.title||"","::description":e.description||"","::type":"object","::deprecated":e.deprecated||!1};for(const n in e.properties)e.required&&e.required.includes(n)?t[`${n}*`]=AR(e.properties[n],{},r+1):t[n]=AR(e.properties[n],{},r+1);o[`::OPTION~${a+1}`]=t}else"array"===t&&(o[`::OPTION~${a+1}`]={"::title":e.title||"","::description":e.description||"","::type":"array","::props":AR(e.items,{},r+1)})})),o[`::OPTION~${s.length+1}`]=(null===(a=l)||void 0===a?void 0:a.html)||"",t["::ONE~OF"]=o}}else if("object"===e.type||e.properties){t["::title"]=e.title||"",t["::description"]=SR(e,r),t["::type"]="object",t["::deprecated"]=e.deprecated||!1,t["::readwrite"]=e.readOnly?"readonly":e.writeOnly?"writeonly":"";for(const n in e.properties)e.required&&e.required.includes(n)?t[`${n}*`]=AR(e.properties[n],{},r+1):t[n]=AR(e.properties[n],{},r+1);e.additionalProperties&&(t["<any-key>"]=AR(e.additionalProperties,{}))}else{if("array"!==e.type&&!e.items){const t=fR(e);return null!=t&&t.html?`${t.html}`:""}t["::title"]=e.title||"",t["::description"]=SR(e,r),t["::type"]="array",t["::deprecated"]=e.deprecated||!1,t["::readwrite"]=e.readOnly?"readonly":e.writeOnly?"writeonly":"",e.items.items&&(t["::array-type"]=e.items.items.type),t["::props"]=AR(e.items,{},r+1)}return t}}function ER(e,t,r="",n="",o=!0,a=!0,i="json",s=!1){const l=[];if(r)for(const e in r){let n="",o="json";if(null!=t&&t.toLowerCase().includes("json")){if("text"===i)n="string"==typeof r[e].value?r[e].value:JSON.stringify(r[e].value,void 0,2),o="text";else if(n=r[e].value,"string"==typeof r[e].value)try{const t=r[e].value.replace(/([\w]+)(:)/g,'"$1"$2').replace(/'/g,'"');n=JSON.parse(t),o="json"}catch(t){o="text",n=r[e].value}}else n=r[e].value,o="text";l.push({exampleId:e,exampleSummary:r[e].summary||e,exampleDescription:r[e].description||"",exampleType:t,exampleValue:n,exampleFormat:o})}else if(n){let e="",r="json";if(null!=t&&t.toLowerCase().includes("json")){if("text"===i)e="string"==typeof n?n:JSON.stringify(n,void 0,2),r="text";else if("object"==typeof n)e=n,r="json";else if("string"==typeof n)try{e=JSON.parse(n),r="json"}catch(t){r="text",e=n}}else e=n,r="text";l.push({exampleId:"Example",exampleSummary:"",exampleDescription:"",exampleType:t,exampleValue:e,exampleFormat:r})}if(0===l.length||!0===s)if(e)if(e.example)l.push({exampleId:"Example",exampleSummary:"",exampleDescription:"",exampleType:t,exampleValue:e.example,exampleFormat:null!=t&&t.toLowerCase().includes("json")&&"object"==typeof e.example?"json":"text"});else if(null!=t&&t.toLowerCase().includes("json")||null!=t&&t.toLowerCase().includes("text")||null!=t&&t.toLowerCase().includes("*/*")||null!=t&&t.toLowerCase().includes("xml")){let r="",n="",s="",c="";null!=t&&t.toLowerCase().includes("xml")?(r=e.xml&&e.xml.name?`<${e.xml.name}>`:"<root>",n=e.xml&&e.xml.name?`</${e.xml.name}>`:"</root>",s="text"):s=i;const p=kR(e,{includeReadOnly:o,includeWriteOnly:a,deprecated:!0});let u=0;for(const e in p){if(!p[e])continue;const o=p[e]["::TITLE"]||"Example "+ ++u,a=p[e]["::DESCRIPTION"]||"";xR(p[e]),c=null!=t&&t.toLowerCase().includes("xml")?`${r}${vR(p[e])}\n${n}`:"text"===i?JSON.stringify(p[e],null,2):p[e],l.push({exampleId:e,exampleSummary:o,exampleDescription:a,exampleType:t,exampleFormat:s,exampleValue:c})}}else null!=t&&t.toLowerCase().includes("jose")?l.push({exampleId:"Example",exampleSummary:"Base64 Encoded",exampleDescription:"",exampleType:t,exampleValue:e.pattern||"bXJpbg==",exampleFormat:"text"}):l.push({exampleId:"Example",exampleSummary:"",exampleDescription:"",exampleType:t,exampleValue:"",exampleFormat:"text"});else l.push({exampleId:"Example",exampleSummary:"",exampleDescription:"",exampleType:t,exampleValue:"",exampleFormat:"text"});return l}function OR(e){return"application/json"===e?"json":"application/xml"===e?"xml":null}function TR(e){if(e.schema)return[e.schema,null,null];if(e.content)for(const t of Object.keys(e.content))if(e.content[t].schema)return[e.content[t].schema,OR(t),e.content[t]];return[null,null,null]}customElements.define("json-tree",class extends ne{static get properties(){return{data:{type:Object},renderStyle:{type:String,attribute:"render-style"}}}static get styles(){return[We,hR,Ve,l`
      :host{
        display:flex;
      }
      .json-tree {
        position: relative;
        font-family: var(--font-mono);
        font-size: var(--font-size-small);
        display:inline-block;
        overflow:hidden;
        word-break: break-all;
        flex:1;
        line-height: calc(var(--font-size-small) + 6px);
        direction: ltr; 
        text-align: left;
      }

      .open-bracket{
        display:inline-block;
        padding: 0 20px 0 0;
        cursor:pointer;
        border: 1px solid transparent;
        border-radius:3px;
      }
      .open-bracket:hover{
        color:var(--primary-color);
        background-color:var(--hover-color);
        border: 1px solid var(--border-color);
      }
      .inside-bracket{
        padding-left:12px;
        border-left:1px dotted var(--border-color);
      }
      .open-bracket.collapsed + .inside-bracket,
      .open-bracket.collapsed + .inside-bracket + .close-bracket {
        display:none;
      }

      .string{color:var(--green);}
      .number{color:var(--blue);}
      .null{color:var(--red);}
      .boolean{color:var(--purple);}
      .object{color:var(--fg)}
      .toolbar {
        position: absolute;
        top:5px;
        right:6px;
        display:flex;
        padding:2px;
        align-items: center;
      }`,et]}render(){return F`
      <div class = "json-tree" >
        <div class='toolbar'> 
          <button class="toolbar-btn" part="btn btn-fill btn-copy" @click='${e=>{ot(JSON.stringify(this.data,null,2),e)}}'> Copy </button>
        </div>
        ${this.generateTree(this.data,!0)}
      </div>  
    `}generateTree(e,t=!1){if(null===e)return F`<div class="null" style="display:inline;">null</div>`;if("object"==typeof e&&e instanceof Date==!1){const r=Array.isArray(e)?"array":"pure_object";return 0===Object.keys(e).length?F`${Array.isArray(e)?"[ ],":"{ },"}`:F`
      <div class="open-bracket expanded ${"array"===r?"array":"object"} " @click="${this.toggleExpand}" > ${"array"===r?"[":"{"}</div>
      <div class="inside-bracket">
        ${Object.keys(e).map(((t,n,o)=>F`
          <div class="item"> 
            ${"pure_object"===r?F`"${t}":`:""}
            ${this.generateTree(e[t],n===o.length-1)}
          </div>`))}
      </div>
      <div class="close-bracket">${"array"===r?"]":"}"}${t?"":","}</div>
      `}return"string"==typeof e||e instanceof Date?F`<span class="${typeof e}">"${e}"</span>${t?"":","}`:F`<span class="${typeof e}">${e}</span>${t?"":","}`}toggleExpand(e){const t=e.target;t.classList.contains("expanded")?(t.classList.replace("expanded","collapsed"),e.target.innerHTML=e.target.classList.contains("array")?"[...]":"{...}"):(t.classList.replace("collapsed","expanded"),e.target.innerHTML=e.target.classList.contains("array")?"[":"{")}});const CR=l`

*, *:before, *:after { box-sizing: border-box; }

.tr {
  display: flex;
  flex: none;
  width: 100%;
  box-sizing: content-box;
  border-bottom: 1px dotted transparent;
}
.td {
  display: block;
  flex: 0 0 auto;
}
.key {
  font-family: var(--font-mono);
  white-space: normal;
  word-break: break-all;
}

.collapsed-descr .key{
  overflow:hidden;
}

.key-descr {
  font-family:var(--font-regular);
  color:var(--light-fg);
  flex-shrink: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  display: none;
}
.expanded-descr .key-descr{
  max-height:auto;
  overflow:hidden;
  display: none;
}
.collapsed-descr .tr {
  max-height:20px;
}

.tr.xxx-of{
  border-top: 1px dotted var(--primary-color);
}

.xxx-of-key {
  font-size: calc(var(--font-size-small) - 2px); 
  font-weight:bold; 
  background-color:var(--primary-color); 
  color:var(--primary-color-invert); 
  border-radius:2px;
  line-height:calc(var(--font-size-small) + 6px);
  padding:0px 5px; 
  margin-bottom:1px; 
  display:inline-block;
}

.xxx-of-descr {
    font-family: var(--font-regular);
    color: var(--primary-color);
    font-size: calc(var(--font-size-small) - 1px);
    margin-left: 2px;
}

.stri, .string, .uri, .url, .byte, .bina, .date, .pass, .ipv4, .ipv4, .uuid, .emai, .host {color:var(--green);}
.inte, .numb, .number, .int6, .int3, .floa, .doub, .deci .blue {color:var(--blue);}
.null {color:var(--red);}
.bool, .boolean{color:var(--orange)}
.enum {color:var(--purple)}
.recu {color:var(--brown)}
.toolbar {
  display:flex;
  width:100%;
  padding: 2px 0;
  color:var(--primary-color);
}
.toolbar-item {
  cursor:pointer;
  padding:5px 0;
  margin:0 2px;
}
.schema-root-type {
  cursor:auto;
  color:var(--fg2);
  font-weight: bold;
  text-transform: uppercase;
}
.schema-root-type.xxx-of {
  display:none;
}
.toolbar-item:first-of-type { margin:0 2px 0 0;}

@media only screen and (min-width: 500px) {
  .key-descr {
    display: block;
  }
  .expanded-descr .key-descr{
    display: block;
  }
}
`;customElements.define("schema-tree",class extends ne{static get properties(){return{data:{type:Object},schemaExpandLevel:{type:Number,attribute:"schema-expand-level"},schemaDescriptionExpanded:{type:String,attribute:"schema-description-expanded"},allowSchemaDescriptionExpandToggle:{type:String,attribute:"allow-schema-description-expand-toggle"},schemaHideReadOnly:{type:String,attribute:"schema-hide-read-only"},schemaHideWriteOnly:{type:String,attribute:"schema-hide-write-only"}}}connectedCallback(){super.connectedCallback(),(!this.schemaExpandLevel||this.schemaExpandLevel<1)&&(this.schemaExpandLevel=99999),this.schemaDescriptionExpanded&&"true false".includes(this.schemaDescriptionExpanded)||(this.schemaDescriptionExpanded="false"),this.schemaHideReadOnly&&"true false".includes(this.schemaHideReadOnly)||(this.schemaHideReadOnly="true"),this.schemaHideWriteOnly&&"true false".includes(this.schemaHideWriteOnly)||(this.schemaHideWriteOnly="true")}static get styles(){return[We,CR,hR,l`
      .tree {
        font-size:var(--font-size-small);
        text-align: left;
        direction: ltr;
        line-height:calc(var(--font-size-small) + 6px);
      }
      .tree .tr:hover{
        background-color:var(--hover-color);
      }
      .collapsed-descr .tr {
        max-height:calc(var(--font-size-small) + 8px);
      }
      .collapsed-descr .m-markdown-small p {
        line-height:calc(var(--font-size-small) + 6px);
      }

      .tree .key {
        max-width: 300px;
      }
      .key.deprecated .key-label {
        text-decoration: line-through; 
      }

      .open-bracket{
        display:inline-block;
        padding: 0 20px 0 0;
        cursor:pointer;
        border: 1px solid transparent;
        border-radius:3px;
      }
      .open-bracket:hover {
        color:var(--primary-color);
        background-color:var(--hover-color);
        border: 1px solid var(--border-color);
      }
      .close-bracket{
        display:inline-block;
        font-family: var(--font-mono);
      }
      .tr.collapsed + .inside-bracket,
      .tr.collapsed + .inside-bracket + .close-bracket{
        display:none;
      }
      .inside-bracket.object,
      .inside-bracket.array {
        border-left: 1px dotted var(--border-color);
      }
      .inside-bracket.xxx-of {
        padding:5px 0px;
        border-style: dotted;
        border-width: 0 0 1px 0;
        border-color:var(--primary-color);
      }`,et]}render(){var e,t,r;return F`
      <div class="tree ${"true"===this.schemaDescriptionExpanded?"expanded-descr":"collapsed-descr"}">
        <div class="toolbar">
          <div class="toolbar-item schema-root-type ${(null===(e=this.data)||void 0===e?void 0:e["::type"])||""} "> ${(null===(t=this.data)||void 0===t?void 0:t["::type"])||""} </div>
          ${"true"===this.allowSchemaDescriptionExpandToggle?F`
              <div style="flex:1"></div>
              <div class='toolbar-item' @click='${()=>{this.schemaDescriptionExpanded="true"===this.schemaDescriptionExpanded?"false":"true"}}'> 
                ${"true"===this.schemaDescriptionExpanded?"Single line description":"Multiline description"}
              </div>
            `:""}
        </div>
        ${null!==(r=this.data)&&void 0!==r&&r["::description"]?F`<span class='m-markdown'> ${HP(qe(this.data["::description"]||""))}</span>`:""}
        ${this.data?F`
            ${this.generateTree("array"===this.data["::type"]?this.data["::props"]:this.data,this.data["::type"],this.data["::array-type"]||"")}`:F`<span class='mono-font' style='color:var(--red)'> Schema not found </span>`}
      </div>  
    `}generateTree(e,t="object",r="",n="",o="",a=0,i=0,s=""){var l;if("true"===this.schemaHideReadOnly){if("array"===t&&"readonly"===s)return;if("readonly"===e["::readwrite"])return}if("true"===this.schemaHideWriteOnly){if("array"===t&&"writeonly"===s)return;if("writeonly"===e["::readwrite"])return}if(!e)return F`<div class="null" style="display:inline;">null</div>`;if(0===Object.keys(e).length)return F`<span class="key object">${n}:{ }</span>`;let c="",p="";if(n.startsWith("::ONE~OF")||n.startsWith("::ANY~OF"))c=n.replace("::","").replace("~"," ");else if(n.startsWith("::OPTION")){const e=n.split("~");c=e[1],p=e[2]}else c=n;const u=400-12*i;let d="",h="";const f=null!==(l=e["::type"])&&void 0!==l&&l.startsWith("xxx-of")?a:a+1,m="xxx-of-option"===t||"xxx-of-option"===e["::type"]||n.startsWith("::OPTION")?i:i+1;if("object"===e["::type"])"array"===t?(d=a<this.schemaExpandLevel?F`<span class="open-bracket array-of-object" @click="${this.toggleObjectExpand}">[{</span>`:F`<span class="open-bracket array-of-object" @click="${this.toggleObjectExpand}">[{...}]</span>`,h="}]"):(d=a<this.schemaExpandLevel?F`<span class="open-bracket object" @click="${this.toggleObjectExpand}">{</span>`:F`<span class="open-bracket object" @click="${this.toggleObjectExpand}">{...}</span>`,h="}");else if("array"===e["::type"])if("array"===t){const e="object"!==r?r:"";d=a<this.schemaExpandLevel?F`<span class="open-bracket array-of-array" data-array-type="${e}" @click="${this.toggleObjectExpand}">[[ ${e} </span>`:F`<span class="open-bracket array-of-array"  data-array-type="${e}" @click="${this.toggleObjectExpand}">[[...]]</span>`,h="]]"}else d=a<this.schemaExpandLevel?F`<span class="open-bracket array" @click="${this.toggleObjectExpand}">[</span>`:F`<span class="open-bracket array" @click="${this.toggleObjectExpand}">[...]</span>`,h="]";var y;if("object"==typeof e)return F`
        <div class="tr ${a<this.schemaExpandLevel||null!==(y=e["::type"])&&void 0!==y&&y.startsWith("xxx-of")?"expanded":"collapsed"} ${e["::type"]||"no-type-info"}">
          <div class="td key ${e["::deprecated"]?"deprecated":""}" style='min-width:${u}px'>
            ${"xxx-of-option"===e["::type"]||"xxx-of-array"===e["::type"]||n.startsWith("::OPTION")?F`<span class='key-label xxx-of-key'>${c}</span><span class="xxx-of-descr">${p}</span>`:"::props"===c||"::ARRAY~OF"===c?"":a>0?F`<span class="key-label" title="${"readonly"===s?"Read-Only":"writeonly"===s?"Write-Only":""}">
                      ${c.replace(/\*$/,"")}${c.endsWith("*")?F`<span style="color:var(--red)">*</span>`:""}${"readonly"===s?F` 🆁`:"writeonly"===s?F` 🆆`:s}:
                    </span>`:""}
            ${"xxx-of"===e["::type"]&&"array"===t?F`<span style="color:var(--primary-color)">ARRAY</span>`:""} 
            ${d}
          </div>
          <div class='td key-descr m-markdown-small'>${HP(qe(o||""))}</div>
        </div>
        <div class='inside-bracket ${e["::type"]||"no-type-info"}' style='padding-left:${"xxx-of-option"===e["::type"]||"xxx-of-array"===e["::type"]?0:12}px;'>
          ${Array.isArray(e)&&e[0]?F`${this.generateTree(e[0],"xxx-of-option","","::ARRAY~OF","",f,m,e[0]["::readwrite"])}`:F`
              ${Object.keys(e).map((t=>F`
                ${["::title","::description","::type","::props","::deprecated","::array-type","::readwrite"].includes(t)?"array"===e[t]["::type"]||"object"===e[t]["::type"]?F`${this.generateTree("array"===e[t]["::type"]?e[t]["::props"]:e[t],e[t]["::type"],e[t]["::array-type"]||"",t,e[t]["::description"],f,m,e[t]["::readwrite"]?e[t]["::readwrite"]:"")}`:"":F`${this.generateTree("array"===e[t]["::type"]?e[t]["::props"]:e[t],e[t]["::type"],e[t]["::array-type"]||"",t,e[t]["::description"],f,m,e[t]["::readwrite"]?e[t]["::readwrite"]:"")}`}
              `))}
            `}
        </div>
        ${e["::type"]&&e["::type"].includes("xxx-of")?"":F`<div class='close-bracket'> ${h} </div>`}
      `;const[g,v,b,x,w,$,k,S,A]=e.split("~|~");if("🆁"===v&&"true"===this.schemaHideReadOnly)return;if("🆆"===v&&"true"===this.schemaHideWriteOnly)return;const E=g.replace(/┃.*/g,"").replace(/[^a-zA-Z0-9+]/g,"").substring(0,4).toLowerCase();let O="",T="";return"array"===t?"readonly"===s?(O="🆁",T="Read-Only"):"writeonly"===s&&(O="🆆",T="Write-Only"):"🆁"===v?(O="🆁",T="Read-Only"):"🆆"===v&&(O="🆆",T="Write-Only"),F`
      <div class = "tr primitive">
        <div class="td key ${A}" style='min-width:${u}px' >
          ${c.endsWith("*")?F`<span class="key-label">${c.substring(0,c.length-1)}</span><span style='color:var(--red);'>*</span>:`:n.startsWith("::OPTION")?F`<span class='key-label xxx-of-key'>${c}</span><span class="xxx-of-descr">${p}</span>`:F`<span class="key-label">${c}:</span>`}
          <span class="${E}" title="${T}"> 
            ${"array"===t?`[${g}]`:`${g}`}
            ${O}
          </span>
        </div>
        <div class='td key-descr'>
          ${"array"===t?F`<span class="m-markdown-small">${HP(qe(o))}</span>`:""}
          ${b?F`<div style='display:inline-block; line-break:anywhere; margin-right:8px'><span class='bold-text'>Constraints: </span>${b}</div>`:""}
          ${x?F`<div style='display:inline-block; line-break:anywhere; margin-right:8px'><span class='bold-text'>Default: </span>${x}</div>`:""}
          ${w?F`<div style='display:inline-block; line-break:anywhere; margin-right:8px'><span class='bold-text'>Allowed: </span>${w}</div>`:""}
          ${$?F`<div style='display:inline-block; line-break: anywhere; margin-right:8px'><span class='bold-text'>Pattern: </span>${$}</div>`:""}
          ${k?F`<span class="m-markdown-small">${HP(qe(`${S?`**${S}:**`:""} ${k}`))}</span>`:""}
        </div>
      </div>
    `}toggleObjectExpand(e){const t=e.target.closest(".tr");t.classList.contains("expanded")?(t.classList.replace("expanded","collapsed"),e.target.innerHTML=e.target.classList.contains("array-of-object")?"[{...}]":e.target.classList.contains("array-of-array")?"[[...]]":e.target.classList.contains("array")?"[...]":"{...}"):(t.classList.replace("collapsed","expanded"),e.target.innerHTML=e.target.classList.contains("array-of-object")?"[{":e.target.classList.contains("array-of-array")?`[[ ${e.target.dataset.arrayType}`:e.target.classList.contains("object")?"{":"[")}});customElements.define("tag-input",class extends ne{render(){let e="";return Array.isArray(this.value)&&(e=F`${this.value.filter((e=>""!==e.trim())).map((e=>F`<span class='tag'>${e}</span>`))}`),F`
      <div class='tags' tabindex="0">
        ${e}
        <input type="text" class='editor' @paste="${e=>this.afterPaste(e)}" @keydown="${this.afterKeyDown}" @blur="${this.onBlur}" placeholder="${this.placeholder||""}">
      </div>
    `}static get properties(){return{placeholder:{type:String},value:{type:Array,attribute:"value"}}}attributeChangedCallback(e,t,r){"value"===e&&r&&t!==r&&(this.value=r.split(",").filter((e=>""!==e.trim()))),super.attributeChangedCallback(e,t,r)}afterPaste(e){const t=(e.clipboardData||window.clipboardData).getData("Text"),r=t?t.split(",").filter((e=>""!==e.trim())):"";r&&(Array.isArray(this.value)?this.value=[...this.value,...r]:this.value=r),e.preventDefault()}afterKeyDown(e){13===e.keyCode?(e.stopPropagation(),e.preventDefault(),e.target.value&&(Array.isArray(this.value)?this.value=[...this.value,e.target.value]:this.value=[e.target.value],e.target.value="")):8===e.keyCode&&0===e.target.value.length&&Array.isArray(this.value)&&this.value.length>0&&(this.value.splice(-1),this.value=[...this.value])}onBlur(e){e.target.value&&(Array.isArray(this.value)?this.value=[...this.value,e.target.value]:this.value=[e.target.value],e.target.value="")}static get styles(){return[l`
      .tags{
        display:flex;
        flex-wrap: wrap;
        outline: none;
        padding:0;
        border-radius:var(--border-radius);
        border:1px solid var(--border-color);
        cursor:text;
        overflow:hidden;
        background:var(--input-bg);
      }
      .tag, .editor {
        padding:3px;
        margin:2px;
      }
      .tag{
        border:1px solid var(--border-color);
        background-color:var(--bg3);
        color:var(--fg3);
        border-radius:var(--border-radius);
        word-break: break-all;
        font-size: var(--font-size-small);
      }
      .tag:hover ~ #cursor {
        display: block;
      }
      .editor{
        flex:1;
        border:1px solid transparent;
        color:var(--fg);
        min-width:60px;
        outline: none;
        line-height: inherit;
        font-family:inherit;
        background:transparent;
        font-size: calc(var(--font-size-small) + 1px);
      }
      .editor::placeholder {
        color: var(--placeholder-color);
        opacity:1;
      }
    `]}});customElements.define("api-request",class extends ne{constructor(){super(),this.responseMessage="",this.responseStatus="success",this.responseHeaders="",this.responseText="",this.responseUrl="",this.curlSyntax="",this.activeResponseTab="response",this.selectedRequestBodyType="",this.selectedRequestBodyExample="",this.activeParameterSchemaTabs={}}static get properties(){return{serverUrl:{type:String,attribute:"server-url"},servers:{type:Array},method:{type:String},path:{type:String},security:{type:Array},parameters:{type:Array},request_body:{type:Object},api_keys:{type:Array},parser:{type:Object},accept:{type:String},callback:{type:String},responseMessage:{type:String,attribute:!1},responseText:{type:String,attribute:!1},responseHeaders:{type:String,attribute:!1},responseStatus:{type:String,attribute:!1},responseUrl:{type:String,attribute:!1},fillRequestFieldsWithExample:{type:String,attribute:"fill-request-fields-with-example"},allowTry:{type:String,attribute:"allow-try"},renderStyle:{type:String,attribute:"render-style"},schemaStyle:{type:String,attribute:"schema-style"},activeSchemaTab:{type:String,attribute:"active-schema-tab"},activeParameterSchemaTabs:{type:Object,converter:{fromAttribute:e=>JSON.parse(e),toAttribute:e=>JSON.stringify(e)},attribute:"active-parameter-schema-tabs"},schemaExpandLevel:{type:Number,attribute:"schema-expand-level"},schemaDescriptionExpanded:{type:String,attribute:"schema-description-expanded"},allowSchemaDescriptionExpandToggle:{type:String,attribute:"allow-schema-description-expand-toggle"},schemaHideReadOnly:{type:String,attribute:"schema-hide-read-only"},fetchCredentials:{type:String,attribute:"fetch-credentials"},activeResponseTab:{type:String},selectedRequestBodyType:{type:String,attribute:"selected-request-body-type"},selectedRequestBodyExample:{type:String,attribute:"selected-request-body-example"}}}static get styles(){return[Ke,Ve,We,Ge,hR,Ze,Ye,l`
        *, *:before, *:after { box-sizing: border-box; }
    
        .read-mode {
          margin-top: 24px;
        }
        .param-name,
        .param-type {
          margin: 1px 0;
          text-align: right;
          line-height: var(--font-size-small);
        }
        .param-name{
          color: var(--fg); 
          font-family: var(--font-mono);
        }
        .param-name.deprecated { 
          text-decoration: line-through;
        }
        .param-type{
          color: var(--light-fg); 
          font-family: var(--font-regular);
        }
        .param-constraint{
          min-width:100px;
        }
        .param-constraint:empty{
          display:none;
        }
        .top-gap{margin-top:24px;}

        .textarea {
          min-height:220px; 
          padding:5px;
          resize:vertical;
          direction: ltr;
        }
        .example:first-child {
          margin-top: -9px;
        }

        .response-message{
          font-weight:bold;
          text-overflow: ellipsis;
        }
        .response-message.error {
          color:var(--red);
        }
        .response-message.success {
          color:var(--blue);
        }

        .file-input-container {
          align-items:flex-end;
        }
        .file-input-container .input-set:first-child .file-input-remove-btn{
          visibility:hidden;
        }

        .file-input-remove-btn{
          font-size:16px;
          color:var(--red);
          outline: none;
          border: none;
          background:none;
          cursor:pointer;
        }

        .v-tab-btn {
          font-size: var(--smal-font-size);
          height:24px; 
          border:none; 
          background:none; 
          opacity: 0.3;
          cursor: pointer;
          padding: 4px 8px;
        }
        .v-tab-btn.active {
          font-weight: bold;
          background: var(--bg);
          opacity: 1;
        }

        @media only screen and (min-width: 768px) {
          .textarea {
            padding:8px;
          }
        }

        @media only screen and (max-width: 470px) {
          .hide-in-small-screen {
            display:none;
          }
        }
      `,et]}render(){return F`
    <div class="col regular-font request-panel ${"read focused".includes(this.renderStyle)||"true"===this.callback?"read-mode":"view-mode"}">
      <div class=" ${"true"===this.callback?"tiny-title":"req-res-title"} "> 
        ${"true"===this.callback?"CALLBACK REQUEST":"REQUEST"}
      </div>
      <div>
        ${cR([this.allowTry,this.parameters,this.activeParameterSchemaTabs],(()=>this.inputParametersTemplate("path")))}
        ${cR([this.allowTry,this.parameters,this.activeParameterSchemaTabs],(()=>this.inputParametersTemplate("query")))}
        ${this.requestBodyTemplate()}
        ${cR([this.allowTry,this.parameters,this.activeParameterSchemaTabs],(()=>this.inputParametersTemplate("header")))}
        ${cR([this.allowTry,this.parameters,this.activeParameterSchemaTabs],(()=>this.inputParametersTemplate("cookie")))}
        ${"false"===this.allowTry?"":F`${this.apiCallTemplate()}`}
      </div>  
    </div>
    `}updated(e){if("focused"===this.renderStyle)if(1===e.size&&e.has("activeSchemaTab"));else{[...this.shadowRoot.querySelectorAll('textarea[data-ptype="form-data"]')].forEach((e=>{const t=this.shadowRoot.querySelector(`textarea[data-pname='hidden-${e.dataset.pname}']`);t&&(e.value=t.value)}))}}exampleListTemplate(e,t,r=[]){return F`
    ${r.length>0?F`<span style="font-weight:bold">Example: </span>
        ${r.map(((r,n)=>{var o,a;return F`
          ${0===n?"":"┃"}
          ${"array"===t?"[":""}
          <a part="anchor anchor-param-example" class = "${"true"===this.allowTry?"":"inactive-link"}"
            data-example-type="${"array"===t?t:"string"}"
            data-example = "${r.value&&Array.isArray(r.value)?null===(o=r.value)||void 0===o?void 0:o.join("~|~"):r.value||""}"
            @click="${t=>{const r=t.target.closest("table").querySelector(`[data-pname="${e}"]`);r&&("array"===t.target.dataset.exampleType?r.value=t.target.dataset.example.split("~|~"):r.value=t.target.dataset.example)}}"
          >${r.value&&Array.isArray(r.value)?null===(a=r.value)||void 0===a?void 0:a.join(", "):r.value||""}</a>
          ${"array"===t?"] ":""}
        `}))}
      `:""}`}inputParametersTemplate(e){const t=this.parameters?this.parameters.filter((t=>t.in===e)):[];if(0===t.length)return"";let r="";"path"===e?r="PATH PARAMETERS":"query"===e?r="QUERY-STRING PARAMETERS":"header"===e?r="REQUEST HEADERS":"cookie"===e&&(r="COOKIES");const n=[];for(const r of t){const[t,o,a]=TR(r);if(!t)continue;const i=fR(t);if(!i)continue;const s=AR(t,{});let l="form",c=!0,p=!1;"query"===e&&(r.style&&"form spaceDelimited pipeDelimited".includes(r.style)?l=r.style:o&&(l=o),"boolean"==typeof r.explode&&(c=r.explode),"boolean"==typeof r.allowReserved&&(p=r.allowReserved));const u=yR(r.examples||mR(r.example)||mR(null==a?void 0:a.example)||(null==a?void 0:a.examples)||i.examples||mR(i.example),i.type);u.exampleVal||"object"!==i.type||(u.exampleVal=ER(t,o||"json","","",!0,!0,"text",!1)[0].exampleValue);const d="read focused".includes(this.renderStyle)?"200px":"160px";n.push(F`
      <tr> 
        <td rowspan="${"true"===this.allowTry?"1":"2"}" style="width:${d}; min-width:100px;">
          <div class="param-name">
            ${r.required?F`<span style='color:var(--red)'>*</span>`:""}${r.name}
          </div>
          <div class="param-type">
            ${"array"===i.type?`${i.arrayType}`:`${i.format?i.format:i.type}`}
          </div>
        </td>  
        ${"true"===this.allowTry?F`
            <td style="min-width:100px;">
              ${"array"===i.type?F`
                  <tag-input class="request-param" 
                    style = "width:100%" 
                    data-ptype = "${e}"
                    data-pname = "${r.name}"
                    data-example = "${Array.isArray(u.exampleVal)?u.exampleVal.join("~|~"):u.exampleVal}"
                    data-param-serialize-style = "${l}"
                    data-param-serialize-explode = "${c}"
                    data-param-allow-reserved = "${p}"
                    data-array = "true"
                    placeholder = "add-multiple &#x21a9;"
                    .value = "${Array.isArray(u.exampleVal),u.exampleVal}"
                  >
                  </tag-input>`:"object"===i.type?F`
                    <div class="tab-panel col" style="border-width:0 0 1px 0;">
                      <div class="tab-buttons row" @click="${e=>{if("button"===e.target.tagName.toLowerCase()){const t={...this.activeParameterSchemaTabs};t[r.name]=e.target.dataset.tab,this.activeParameterSchemaTabs=t}}}">
                        <button class="tab-btn ${"example"===this.activeParameterSchemaTabs[r.name]?"active":""}" data-tab = 'example'>EXAMPLE </button>
                        <button class="tab-btn ${"example"!==this.activeParameterSchemaTabs[r.name]?"active":""}" data-tab = 'schema'>SCHEMA</button>
                      </div>
                      ${"example"===this.activeParameterSchemaTabs[r.name]?F`<div class="tab-content col">
                          <textarea 
                            class = "textarea request-param"
                            part = "textarea textarea-param"
                            data-ptype = "${e}-object"
                            data-pname = "${r.name}"
                            data-example = "${u.exampleVal}"
                            data-param-serialize-style = "${l}"
                            data-param-serialize-explode = "${c}"
                            data-param-allow-reserved = "${p}"
                            spellcheck = "false"
                            .textContent = "${"true"===this.fillRequestFieldsWithExample?u.exampleVal:""}"
                            style = "resize:vertical; width:100%; height: ${"read focused".includes(this.renderStyle)?"180px":"120px"};"
                          ></textarea>
                        </div>`:F`
                          <div class="tab-content col">            
                            <schema-tree
                              class = 'json'
                              style = 'display: block'
                              .data = '${s}'
                              schema-expand-level = "${this.schemaExpandLevel}"
                              schema-description-expanded = "${this.schemaDescriptionExpanded}"
                              allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}",
                              schema-hide-read-only = "${this.schemaHideReadOnly.includes(this.method)}"
                              schema-hide-write-only = "false"
                            > </schema-tree>
                          </div>`}
                    </div>`:F`
                    <input type="${"password"===i.format?"password":"text"}" spellcheck="false" style="width:100%" 
                      class="request-param"
                      part="textbox textbox-param"
                      data-ptype="${e}"
                      data-pname="${r.name}" 
                      data-example="${Array.isArray(u.exampleVal)?u.exampleVal.join("~|~"):u.exampleVal}"
                      data-param-allow-reserved = "${p}"
                      data-array="false"
                      .value="${dR("true"===this.fillRequestFieldsWithExample?u.exampleVal:"")}"
                    />`}
            </td>`:""}
        ${i.default||i.constrain||i.allowedValues||i.pattern?F`
            <td colspan="${"true"===this.allowTry?"1":"2"}">
              <div class="param-constraint">
                ${i.default?F`<span style="font-weight:bold">Default: </span>${i.default}<br/>`:""}
                ${i.pattern?F`<span style="font-weight:bold">Pattern: </span>${i.pattern}<br/>`:""}
                ${i.constrain?F`${i.constrain}<br/>`:""}
                ${i.allowedValues&&i.allowedValues.split("┃").map(((e,t)=>F`
                  ${t>0?"┃":F`<span style="font-weight:bold">Allowed: </span>`}
                  ${F`
                    <a part="anchor anchor-param-constraint" class = "${"true"===this.allowTry?"":"inactive-link"}"
                      data-type="${"array"===i.type?i.type:"string"}"
                      data-enum="${e.trim()}"
                      @click="${e=>{const t=e.target.closest("table").querySelector(`[data-pname="${r.name}"]`);t&&("array"===e.target.dataset.type?t.value=[e.target.dataset.enum]:t.value=e.target.dataset.enum)}}"
                    >${e}</a>`}`))}
              </div>
            </td>`:""}
      </tr>
      <tr>
        ${"true"===this.allowTry?F`<td style="border:none"> </td>`:""}
        <td colspan="2" style="border:none;">
          <span class="m-markdown-small">${HP(qe(r.description||""))}</span>
          ${this.exampleListTemplate.call(this,r.name,i.type,u.exampleList)}
        </td>
      </tr>
    `)}return F`
    <div class="table-title top-gap">${r}</div>
    <div style="display:block; overflow-x:auto; max-width:100%;">
      <table class="m-table" style="width:100%; word-break:break-word;">
        ${n}
      </table>
    </div>`}resetRequestBodySelection(){this.selectedRequestBodyType="",this.selectedRequestBodyExample="",this.clearResponseData()}onSelectExample(e){this.selectedRequestBodyExample=e.target.value;const t=e.target;window.setTimeout((e=>{const t=e.closest(".example-panel").querySelector(".request-body-param");e.closest(".example-panel").querySelector(".request-body-param-user-input").value=t.innerText}),0,t)}onMimeTypeChange(e){this.selectedRequestBodyType=e.target.value;const t=e.target;this.selectedRequestBodyExample="",window.setTimeout((e=>{const t=e.closest(".request-body-container").querySelector(".request-body-param");if(t){e.closest(".request-body-container").querySelector(".request-body-param-user-input").value=t.innerText}}),0,t)}requestBodyTemplate(){if(!this.request_body)return"";if(0===Object.keys(this.request_body).length)return"";let e="",t="",r="",n="",o="";const a=[],{content:i}=this.request_body;for(const e in i)a.push({mimeType:e,schema:i[e].schema,example:i[e].example,examples:i[e].examples}),this.selectedRequestBodyType||(this.selectedRequestBodyType=e);return e=1===a.length?"":F`
        <select style="min-width:100px; max-width:100%;  margin-bottom:-1px;" @change = '${e=>this.onMimeTypeChange(e)}'>
          ${a.map((e=>F`
            <option value = '${e.mimeType}' ?selected = '${e.mimeType===this.selectedRequestBodyType}'>
              ${e.mimeType}
            </option> `))}
        </select>
      `,a.forEach((e=>{let a,i=[];if(this.selectedRequestBodyType.includes("json")||this.selectedRequestBodyType.includes("xml")||this.selectedRequestBodyType.includes("text")||this.selectedRequestBodyType.includes("jose"))e.mimeType===this.selectedRequestBodyType&&(i=ER(e.schema,e.mimeType,e.examples,e.example,!1,!0,"text",!1),this.selectedRequestBodyExample||(this.selectedRequestBodyExample=i.length>0?i[0].exampleId:""),o=F`
            ${o}
            <div class = 'example-panel border-top pad-top-8'>
              ${1===i.length?"":F`
                  <select style="min-width:100px; max-width:100%;  margin-bottom:-1px;" @change='${e=>this.onSelectExample(e)}'>
                    ${i.map((e=>F`<option value="${e.exampleId}" ?selected=${e.exampleId===this.selectedRequestBodyExample} > 
                      ${e.exampleSummary.length>80?e.exampleId:e.exampleSummary?e.exampleSummary:e.exampleId} 
                    </option>`))}
                  </select>
                `}
              ${i.filter((e=>e.exampleId===this.selectedRequestBodyExample)).map((t=>F`
                <div class="example ${t.exampleId===this.selectedRequestBodyExample?"example-selected":""}" data-example = '${t.exampleId}'>
                  ${t.exampleSummary&&t.exampleSummary.length>80?F`<div style="padding: 4px 0"> ${t.exampleSummary} </div>`:""}
                  ${t.exampleDescription?F`<div class="m-markdown-small" style="padding: 4px 0"> ${HP(qe(t.exampleDescription||""))} </div>`:""}
                  <!-- This pre(hidden) is to store the original example value, this will remain unchanged when users switches from one example to another, its is used to populate the editable textarea -->
                  <pre 
                    class = "textarea is-hidden request-body-param ${e.mimeType.substring(e.mimeType.indexOf("/")+1)}" 
                    spellcheck = "false"
                    data-ptype = "${e.mimeType}" 
                    style="width:100%; resize:vertical; display:none"
                  >${"text"===t.exampleFormat?t.exampleValue:JSON.stringify(t.exampleValue,null,2)}</pre>

                  <!-- this textarea is for user to edit the example -->
                  <textarea 
                    class = "textarea request-body-param-user-input"
                    part = "textarea textarea-param"
                    spellcheck = "false"
                    data-ptype = "${e.mimeType}" 
                    data-example = "${"text"===t.exampleFormat?t.exampleValue:JSON.stringify(t.exampleValue,null,2)}"
                    data-example-format = "${t.exampleFormat}"
                    style="width:100%; resize:vertical;"
                    .textContent = "${"true"===this.fillRequestFieldsWithExample?"text"===t.exampleFormat?t.exampleValue:JSON.stringify(t.exampleValue,null,2):""}"
                  ></textarea>
                </div>  
              `))}

            </div>
          `);else if(this.selectedRequestBodyType.includes("form-urlencoded")||this.selectedRequestBodyType.includes("form-data")){if(e.mimeType===this.selectedRequestBodyType){const t=ER(e.schema,e.mimeType,e.examples,e.example,!1,!0,"text",!1);e.schema&&(r=this.formDataTemplate(e.schema,e.mimeType,t[0]?t[0].exampleValue:""))}}else/^audio\/|^image\/|^video\/|^font\/|tar$|zip$|7z$|rtf$|msword$|excel$|\/pdf$|\/octet-stream$/.test(this.selectedRequestBodyType)&&e.mimeType===this.selectedRequestBodyType&&(t=F`
            <div class = "small-font-size bold-text row">
              <input type="file" part="file-input" style="max-width:100%" class="request-body-param-file" data-ptype="${e.mimeType}" spellcheck="false" />
            </div>  
          `);(e.mimeType.includes("json")||e.mimeType.includes("xml")||e.mimeType.includes("text")||this.selectedRequestBodyType.includes("jose"))&&(a=AR(e.schema,{}),"table"===this.schemaStyle?n=F`
            ${n}
            <schema-table
              class = '${e.mimeType.substring(e.mimeType.indexOf("/")+1)}'
              style = 'display: ${this.selectedRequestBodyType===e.mimeType?"block":"none"};'
              .data = '${a}'
              schema-expand-level = "${this.schemaExpandLevel}"
              schema-description-expanded = "${this.schemaDescriptionExpanded}"
              allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}",
              schema-hide-read-only = "${this.schemaHideReadOnly.includes(this.method)}"
              schema-hide-write-only = "false"
            > </schema-table>
          `:"tree"===this.schemaStyle&&(n=F`
            ${n}
            <schema-tree
              class = "${e.mimeType.substring(e.mimeType.indexOf("/")+1)}"
              style = "display: ${this.selectedRequestBodyType===e.mimeType?"block":"none"};"
              .data = "${a}"
              schema-expand-level = "${this.schemaExpandLevel}"
              schema-description-expanded = "${this.schemaDescriptionExpanded}"
              allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}",
              schema-hide-read-only = "true"
              schema-hide-write-only = "false"
            > </schema-tree>
          `))})),F`
      <div class='request-body-container' data-selected-request-body-type="${this.selectedRequestBodyType}">
        <div class="table-title top-gap row">
          REQUEST BODY ${this.request_body.required?F`<span class="mono-font" style='color:var(--red)'>*</span>`:""} 
          <span style = "font-weight:normal; margin-left:5px"> ${this.selectedRequestBodyType}</span>
          <span style="flex:1"></span>
          ${e}
        </div>
        ${this.request_body.description?F`<div class="m-markdown" style="margin-bottom:12px">${HP(qe(this.request_body.description))}</div>`:""}
        
        ${this.selectedRequestBodyType.includes("json")||this.selectedRequestBodyType.includes("xml")||this.selectedRequestBodyType.includes("text")||this.selectedRequestBodyType.includes("jose")?F`
            <div class="tab-panel col" style="border-width:0 0 1px 0;">
              <div class="tab-buttons row" @click="${e=>{"button"===e.target.tagName.toLowerCase()&&(this.activeSchemaTab=e.target.dataset.tab)}}">
                <button class="tab-btn ${"example"===this.activeSchemaTab?"active":""}" data-tab = 'example'>EXAMPLE</button>
                <button class="tab-btn ${"example"!==this.activeSchemaTab?"active":""}" data-tab = 'schema'>SCHEMA</button>
              </div>
              ${"example"===this.activeSchemaTab?F`<div class="tab-content col"> ${o}</div>`:F`<div class="tab-content col"> ${n}</div>`}
            </div>`:F`  
            ${t}
            ${r}`}
      </div>  
    `}formDataParamAsObjectTemplate(e,t,r){var n;const o=AR(t,{}),a=ER(t,"json",t.examples,t.example,!1,!0,"text",!1);return F`
      <div class="tab-panel row" style="min-height:220px; border-left: 6px solid var(--light-border-color); align-items: stretch;">
        <div style="width:24px; background-color:var(--light-border-color)">
          <div class="row" style="flex-direction:row-reverse; width:160px; height:24px; transform:rotate(270deg) translateX(-160px); transform-origin:top left; display:block;" @click="${e=>{if(e.target.classList.contains("v-tab-btn")){const{tab:t}=e.target.dataset;if(t){const r=e.target.closest(".tab-panel"),n=r.querySelector(`.v-tab-btn[data-tab="${t}"]`),o=[...r.querySelectorAll(`.v-tab-btn:not([data-tab="${t}"])`)],a=r.querySelector(`.tab-content[data-tab="${t}"]`),i=[...r.querySelectorAll(`.tab-content:not([data-tab="${t}"])`)];n.classList.add("active"),a.style.display="block",o.forEach((e=>{e.classList.remove("active")})),i.forEach((e=>{e.style.display="none"}))}}"button"===e.target.tagName.toLowerCase()&&(this.activeSchemaTab=e.target.dataset.tab)}}">
          <button class="v-tab-btn ${"example"===this.activeSchemaTab?"active":""}" data-tab = 'example'>EXAMPLE</button>
          <button class="v-tab-btn ${"example"!==this.activeSchemaTab?"active":""}" data-tab = 'schema'>SCHEMA</button>
        </div>
      </div>
      ${F`
        <div class="tab-content col" data-tab = 'example' style="display:${"example"===this.activeSchemaTab?"block":"none"}; padding-left:5px; width:100%"> 
          <textarea 
            class = "textarea"
            part = "textarea textarea-param"
            style = "width:100%; border:none; resize:vertical;" 
            data-array = "false" 
            data-ptype = "${r.includes("form-urlencode")?"form-urlencode":"form-data"}"
            data-pname = "${e}"
            data-example = "${(null===(n=a[0])||void 0===n?void 0:n.exampleValue)||""}"
            .textContent = "${"true"===this.fillRequestFieldsWithExample?a[0].exampleValue:""}"
            spellcheck = "false"
          ></textarea>
          <!-- This textarea(hidden) is to store the original example value, in focused mode on navbar change it is used to update the example text -->
          <textarea data-pname = "hidden-${e}" data-ptype = "${r.includes("form-urlencode")?"hidden-form-urlencode":"hidden-form-data"}" class="is-hidden" style="display:none">${a[0].exampleValue}</textarea>
        </div>`}
      ${F`
        <div class="tab-content col" data-tab = 'schema' style="display:${"example"!==this.activeSchemaTab?"block":"none"}; padding-left:5px; width:100%;"> 
          <schema-tree
            .data = '${o}'
            schema-expand-level = "${this.schemaExpandLevel}"
            schema-description-expanded = "${this.schemaDescriptionExpanded}"
            allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}",
          > </schema-tree>
        </div>`}
      </div>
    `}formDataTemplate(e,t,r=""){const n=[];if(e.properties){for(const r in e.properties){var o,a;const i=e.properties[r];if(i.readOnly)continue;const s=i.examples||i.example||"",l=i.type,c=fR(i),p="read focused".includes(this.renderStyle)?"200px":"160px",u=yR(c.examples||c.example,c.type);n.push(F`
        <tr> 
          <td style="width:${p}; min-width:100px;">
            <div class="param-name ${i.deprecated?"deprecated":""}">
              ${r}${null!==(o=e.required)&&void 0!==o&&o.includes(r)||i.required?F`<span style='color:var(--red);'>*</span>`:""}
            </div>
            <div class="param-type">${c.type}</div>
          </td>  
          <td 
            style="${"object"===l?"width:100%; padding:0;":"true"===this.allowTry?"":"display:none;"} min-width:100px;" 
            colspan="${"object"===l?2:1}">
            ${"array"===l?"binary"===(null===(a=i.items)||void 0===a?void 0:a.format)?F`
                <div class="file-input-container col" style='align-items:flex-end;' @click="${e=>this.onAddRemoveFileInput(e,r,t)}">
                  <div class='input-set row'>
                    <input 
                      type = "file"
                      part = "file-input"
                      style = "width:100%" 
                      data-pname = "${r}" 
                      data-ptype = "${t.includes("form-urlencode")?"form-urlencode":"form-data"}"
                      data-array = "false" 
                      data-file-array = "true" 
                    />
                    <button class="file-input-remove-btn"> &#x2715; </button>
                  </div>  
                  <button class="m-btn primary file-input-add-btn" part="btn btn-fill" style="margin:2px 25px 0 0; padding:2px 6px;">ADD</button>
                </div>  
                `:F`
                  <tag-input
                    style = "width:100%" 
                    data-ptype = "${t.includes("form-urlencode")?"form-urlencode":"form-data"}"
                    data-pname = "${r}"
                    data-example = "${Array.isArray(s)?s.join("~|~"):s}"
                    data-array = "true"
                    placeholder = "add-multiple &#x21a9;"
                    .value = "${Array.isArray(s)?Array.isArray(s[0])?s[0]:[s[0]]:[s]}"
                  >
                  </tag-input>
                `:F`
                ${"object"===l?this.formDataParamAsObjectTemplate.call(this,r,i,t):F`
                    ${"true"===this.allowTry?F`<input
                          .value = "${"true"===this.fillRequestFieldsWithExample?u.exampleVal:""}"
                          spellcheck = "false"
                          type = "${"binary"===i.format?"file":"password"===i.format?"password":"text"}"
                          part = "textbox textbox-param"
                          style = "width:100%"
                          data-ptype = "${t.includes("form-urlencode")?"form-urlencode":"form-data"}"
                          data-pname = "${r}"
                          data-example = "${Array.isArray(s)?s[0]:s}"
                          data-array = "false"
                        />`:""}
                    `}`}
          </td>
          ${"object"===l?"":F`
              <td>
                ${c.default||c.constrain||c.allowedValues||c.pattern?F`
                    <div class="param-constraint">
                      ${c.default?F`<span style="font-weight:bold">Default: </span>${c.default}<br/>`:""}
                      ${c.pattern?F`<span style="font-weight:bold">Pattern: </span>${c.pattern}<br/>`:""}
                      ${c.constrain?F`${c.constrain}<br/>`:""}
                      ${c.allowedValues&&c.allowedValues.split("┃").map(((e,t)=>F`
                        ${t>0?"┃":F`<span style="font-weight:bold">Allowed: </span>`}
                        ${F`
                          <a part="anchor anchor-param-constraint" class = "${"true"===this.allowTry?"":"inactive-link"}"
                            data-type="${"array"===c.type?c.type:"string"}"
                            data-enum="${e.trim()}"
                            @click="${e=>{const t=e.target.closest("table").querySelector(`[data-pname="${r}"]`);t&&("array"===e.target.dataset.type?t.value=[e.target.dataset.enum]:t.value=e.target.dataset.enum)}}"
                          > 
                            ${e} 
                          </a>`}`))}
                    </div>`:""}
              </td>`}
        </tr>
        ${"object"===l?"":F`
            <tr>
              <td style="border:none"> </td>
              <td colspan="2" style="border:none; margin-top:0; padding:0 5px 8px 5px;"> 
                <span class="m-markdown-small">${HP(qe(i.description||""))}</span>
                ${this.exampleListTemplate.call(this,r,c.type,u.exampleList)}
              </td>
            </tr>
          `}`)}return F`
        <table style="width:100%;" class="m-table">
          ${n}
        </table>
      `}return F`
      <textarea
        class = "textarea dynamic-form-param ${t}"
        part = "textarea textarea-param"
        spellcheck = "false"
        data-pname="dynamic-form" 
        data-ptype="${t}"
        .textContent = "${r}"
        style="width:100%"
      ></textarea>
      ${e.description?F`<span class="m-markdown-small">${HP(qe(e.description))}</span>`:""}
    `}apiResponseTabTemplate(){const e=this.responseHeaders.includes("json")?"json":this.responseHeaders.includes("html")||this.responseHeaders.includes("xml")?"html":"";return F`
      <div class="row" style="font-size:var(--font-size-small); margin:5px 0">
        <div class="response-message ${this.responseStatus}">Response Status: ${this.responseMessage}</div>
        <div style="flex:1"></div>
        <button class="m-btn" part="btn btn-outline btn-clear-response" @click="${this.clearResponseData}">CLEAR RESPONSE</button>
      </div>
      <div class="tab-panel col" style="border-width:0 0 1px 0;">
        <div id="tab_buttons" class="tab-buttons row" @click="${e=>{!1!==e.target.classList.contains("tab-btn")&&(this.activeResponseTab=e.target.dataset.tab)}}">
          <button class="tab-btn ${"response"===this.activeResponseTab?"active":""}" data-tab = 'response' > RESPONSE</button>
          <button class="tab-btn ${"headers"===this.activeResponseTab?"active":""}"  data-tab = 'headers' > RESPONSE HEADERS</button>
          <button class="tab-btn ${"curl"===this.activeResponseTab?"active":""}" data-tab = 'curl'>CURL</button>
        </div>
        ${this.responseIsBlob?F`
            <div class="tab-content col" style="flex:1; display:${"response"===this.activeResponseTab?"flex":"none"};">
              <button class="m-btn thin-border mar-top-8" style="width:135px" @click='${e=>{st(this.responseBlobUrl,this.respContentDisposition)}}' part="btn btn-outline">
                DOWNLOAD
              </button>
              ${"view"===this.responseBlobType?F`<button class="m-btn thin-border mar-top-8" style="width:135px"  @click='${e=>{lt(this.responseBlobUrl)}}' part="btn btn-outline">VIEW (NEW TAB)</button>`:""}
            </div>`:F`
            <div class="tab-content col m-markdown" style="flex:1;display:${"response"===this.activeResponseTab?"flex":"none"};" >
              <button class="toolbar-btn" style="position:absolute; top:12px; right:8px" @click='${e=>{ot(this.responseText,e)}}' part="btn btn-fill"> Copy </button>
              <pre style="white-space:pre; max-height:400px; overflow:auto">${e?F`<code>${HP(He().highlight(this.responseText,He().languages[e],e))}</code>`:`${this.responseText}`}</pre>
            </div>`}
        <div class="tab-content col m-markdown" style="flex:1;display:${"headers"===this.activeResponseTab?"flex":"none"};" >
          <button  class="toolbar-btn" style = "position:absolute; top:12px; right:8px" @click='${e=>{ot(this.responseHeaders,e)}}' part="btn btn-fill"> Copy </button>
          <pre style="white-space:pre"><code>${HP(He().highlight(this.responseHeaders,He().languages.css,"css"))}</code></pre>
        </div>
        <div class="tab-content col m-markdown" style="flex:1;display:${"curl"===this.activeResponseTab?"flex":"none"};">
          <button  class="toolbar-btn" style = "position:absolute; top:12px; right:8px" @click='${e=>{ot(this.curlSyntax.replace(/\\$/,""),e)}}' part="btn btn-fill"> Copy </button>
          <pre style="white-space:pre"><code>${HP(He().highlight(this.curlSyntax.trim().replace(/\\$/,""),He().languages.shell,"shell"))}</code></pre>
        </div>
      </div>`}apiCallTemplate(){var e,t;let r="";this.servers&&this.servers.length>0&&(r=F`
        <select style="min-width:100px;" @change='${e=>{this.serverUrl=e.target.value}}'>
          ${this.servers.map((e=>F`<option value = "${e.url}"> ${e.url} - ${e.description} </option>`))}
        </select>
      `);const n=F`
      <div style="display:flex; flex-direction:column;">
        ${r}
        ${this.serverUrl?F`
            <div style="display:flex; align-items:baseline;">
              <div style="font-weight:bold; padding-right:5px;">API Server</div> 
              <span class = "gray-text"> ${this.serverUrl} </span>
            </div>
          `:""}
      </div>  
    `;return F`
    <div style="display:flex; align-items:flex-end; margin:16px 0; font-size:var(--font-size-small);">
      <div class="hide-in-small-screen" style="flex-direction:column; margin:0; width:calc(100% - 60px);">
        <div style="display:flex; flex-direction:row; align-items:center; overflow:hidden;"> 
          ${n}
        </div>
        <div style="display:flex;">
          <div style="font-weight:bold; padding-right:5px;">Authentication</div>
          ${(null===(e=this.security)||void 0===e?void 0:e.length)>0?F`
              ${this.api_keys.length>0?F`<div style="color:var(--blue); overflow:hidden;"> 
                    ${1===this.api_keys.length?`${null===(t=this.api_keys[0])||void 0===t?void 0:t.typeDisplay} in ${this.api_keys[0].in}`:`${this.api_keys.length} API keys applied`} 
                  </div>`:F`<div class="gray-text">Required  <span style="color:var(--red)">(None Applied)</span>`}`:F`<span class="gray-text"> Not Required </span>`}
        </div>
      </div>
      ${this.parameters.length>0||this.request_body?F`
            <button class="m-btn thin-border" part="btn btn-outline btn-fill" style="margin-right:5px;" @click="${this.onFillRequestData}" title="Fills with example data (if provided)">
              FILL EXAMPLE
            </button>
            <button class="m-btn thin-border" part="btn btn-outline btn-clear" style="margin-right:5px;" @click="${this.onClearRequestData}">
              CLEAR
            </button>`:""}
      <button class="m-btn primary thin-border" part="btn btn-try" @click="${this.onTryClick}">TRY</button>
    </div>
    ${""===this.responseMessage?"":this.apiResponseTabTemplate()}
    `}async onFillRequestData(e){[...e.target.closest(".request-panel").querySelectorAll("input, tag-input, textarea:not(.is-hidden)")].forEach((e=>{e.dataset.example&&("TAG-INPUT"===e.tagName.toUpperCase()?e.value=e.dataset.example.split("~|~"):e.value=e.dataset.example)}))}async onClearRequestData(e){[...e.target.closest(".request-panel").querySelectorAll("input, tag-input, textarea:not(.is-hidden)")].forEach((e=>{e.value=""}))}async onTryClick(e){var t;const r=e.target;let n,o,a="",i="",s="",l="";const c=null===(t=this.closest(".expanded-req-resp-container, .req-resp-container"))||void 0===t?void 0:t.getElementsByTagName("api-response")[0],p=null==c?void 0:c.selectedMimeType,u=e.target.closest(".request-panel"),d=[...u.querySelectorAll("[data-ptype='path']")],h=[...u.querySelectorAll("[data-ptype='query']")],f=[...u.querySelectorAll("[data-ptype='query-object']")],m=[...u.querySelectorAll("[data-ptype='header']")],y=u.querySelector(".request-body-container");n=this.path;const g={method:this.method.toUpperCase()};d.map((e=>{n=n.replace(`{${e.dataset.pname}}`,encodeURIComponent(e.value))}));const v=new Map,b=[];h.length>0&&h.forEach((e=>{const t=new URLSearchParams;if("true"===e.dataset.paramAllowReserved&&b.push(e.dataset.pname),"false"===e.dataset.array)""!==e.value&&t.append(e.dataset.pname,e.value);else{const{paramSerializeStyle:r,paramSerializeExplode:n}=e.dataset;let o=e.value&&Array.isArray(e.value)?e.value:[];o=Array.isArray(o)?o.filter((e=>""!==e)):[],o.length>0&&("spaceDelimited"===r?t.append(e.dataset.pname,o.join(" ").replace(/^\s|\s$/g,"")):"pipeDelimited"===r?t.append(e.dataset.pname,o.join("|").replace(/^\||\|$/g,"")):"true"===n?o.forEach((r=>{t.append(e.dataset.pname,r)})):t.append(e.dataset.pname,o.join(",").replace(/^,|,$/g,"")))}t.toString()&&v.set(e.dataset.pname,t)})),f.length>0&&f.map((e=>{const t=new URLSearchParams;try{let r={};const{paramSerializeStyle:n,paramSerializeExplode:o}=e.dataset;if(r=Object.assign(r,JSON.parse(e.value.replace(/\s+/g," "))),"true"===e.dataset.paramAllowReserved&&b.push(e.dataset.pname),"json xml".includes(n))"json"===n?t.append(e.dataset.pname,JSON.stringify(r)):"xml"===n&&t.append(e.dataset.pname,vR(r));else for(const e in r)"object"==typeof r[e]?Array.isArray(r[e])&&("spaceDelimited"===n?t.append(e,r[e].join(" ")):"pipeDelimited"===n?t.append(e,r[e].join("|")):"true"===o?r[e].forEach((r=>{t.append(e,r)})):t.append(e,r[e])):t.append(e,r[e])}catch(t){console.log("RapiDoc: unable to parse %s into object",e.value)}t.toString()&&v.set(e.dataset.pname,t)}));let x="";if(v.size&&(x="?",v.forEach(((e,t)=>{b.includes(t)?(x+=`${t}=`,x+=e.getAll(t).join(`&${t}=`),x+="&"):x+=`${e.toString()}&`})),x=x.slice(0,-1)),n=`${n}${x}`,this.api_keys.filter((e=>"query"===e.in)).forEach((e=>{n=`${n}${n.includes("?")?"&":"?"}${e.name}=${encodeURIComponent(e.finalKeyValue)}`})),n=`${this.serverUrl.replace(/\/$/,"")}${n}`,!1===n.startsWith("http")){o=new URL(n,window.location.href).href}else o=n;a=`curl -X ${this.method.toUpperCase()} "${o}" \\\n`;const w=new Headers;if(p?(w.append("Accept",p),i+=` -H "Accept: ${p}" \\\n`):this.accept&&(w.append("Accept",this.accept),i+=` -H "Accept: ${this.accept}" \\\n`),this.api_keys.filter((e=>"header"===e.in)).forEach((e=>{w.append(e.name,e.finalKeyValue),i+=` -H "${e.name}: ${e.finalKeyValue}" \\\n`})),m.map((e=>{e.value&&(w.append(e.dataset.pname,e.value),i+=` -H "${e.dataset.pname}: ${e.value}" \\\n`)})),y){const e=y.dataset.selectedRequestBodyType;if(e.includes("form-urlencoded")){const e=u.querySelector("[data-ptype='dynamic-form']");if(e){const t=e.value,r=new URLSearchParams;let n,o=!0;if(t)try{n=JSON.parse(t)}catch(e){o=!1,console.warn("RapiDoc: Invalid JSON provided",e)}else o=!1;if(o){for(const e in n)r.append(e,JSON.stringify(n[e]));g.body=r,s=` -d ${r.toString()} \\\n`}}else{const e=[...u.querySelectorAll("[data-ptype='form-urlencode']")],t=new URLSearchParams;e.filter((e=>"file"!==e.type)).forEach((e=>{if("false"===e.dataset.array)e.value&&t.append(e.dataset.pname,e.value);else{const r=e.value&&Array.isArray(e.value)?e.value.join(","):"";t.append(e.dataset.pname,r)}})),g.body=t,s=` -d ${t.toString()} \\\n`}}else if(e.includes("form-data")){const e=new FormData;[...u.querySelectorAll("[data-ptype='form-data']")].forEach((t=>{"false"===t.dataset.array?"file"===t.type&&t.files[0]?(e.append(t.dataset.pname,t.files[0],t.files[0].name),l+=` -F "${t.dataset.pname}=@${t.files[0].name}" \\\n`):t.value&&(e.append(t.dataset.pname,t.value),l+=` -F "${t.dataset.pname}=${t.value}" \\\n`):t.value&&Array.isArray(t.value)&&(t.value.forEach((e=>{l=`${l} -F "${t.dataset.pname}[]=${e}" \\\n`})),e.append(t.dataset.pname,t.value.join(",")))})),g.body=e}else if(/^audio\/|^image\/|^video\/|^font\/|tar$|zip$|7z$|rtf$|msword$|excel$|\/pdf$|\/octet-stream$/.test(e)){const e=u.querySelector(".request-body-param-file");null!=e&&e.files[0]&&(g.body=e.files[0],s=` --data-binary @${e.files[0].name} \\\n`)}else if(e.includes("json")||e.includes("xml")||e.includes("text")){const t=u.querySelector(".request-body-param-user-input");if(null!=t&&t.value){if(g.body=t.value,e.includes("json"))try{s=` -d '${JSON.stringify(JSON.parse(t.value))}' \\\n`}catch(e){}s||(s=` -d '${t.value.replace(/'/g,"'\"'\"'")}' \\\n`)}}e.includes("form-data")||w.append("Content-Type",e),i+=` -H "Content-Type: ${e}" \\\n`}this.responseUrl="",this.responseHeaders=[],this.curlSyntax="",this.responseStatus="success",this.responseIsBlob=!1,this.respContentDisposition="",this.responseBlobUrl&&(URL.revokeObjectURL(this.responseBlobUrl),this.responseBlobUrl=""),this.curlSyntax=`${a}${i}${s}${l}`,this.fetchCredentials&&(g.credentials=this.fetchCredentials);const $=new AbortController,{signal:k}=$;g.headers=w;const S=new Request(n,g);let A,E;this.dispatchEvent(new CustomEvent("before-try",{bubbles:!0,composed:!0,detail:{request:S,controller:$}}));try{let e,t,n;r.disabled=!0;const o=performance.now();A=await fetch(S,{signal:k});const a=performance.now();E=A.clone(),r.disabled=!1,this.responseMessage=F`${A.statusText?`${A.statusText}:${A.status}`:A.status} <div style="color:var(--light-fg)"> Took ${Math.round(a-o)} milliseconds </div>`,this.responseUrl=A.url;const i={};A.headers.forEach(((e,t)=>{i[t]=e,this.responseHeaders=`${this.responseHeaders}${t}: ${e}\n`}));const s=A.headers.get("content-type");if(0===(await A.clone().text()).length)this.responseText="";else if(s){if(s.includes("json"))if(/charset=[^"']+/.test(s)){const e=s.split("charset=")[1],r=await A.arrayBuffer();try{n=new TextDecoder(e).decode(r)}catch{n=new TextDecoder("utf-8").decode(r)}try{t=JSON.parse(n),this.responseText=JSON.stringify(t,null,2)}catch{this.responseText=n}}else t=await A.json(),this.responseText=JSON.stringify(t,null,2);else/^font\/|tar$|zip$|7z$|rtf$|msword$|excel$|\/pdf$|\/octet-stream$|^application\/vnd\./.test(s)?(this.responseIsBlob=!0,this.responseBlobType="download"):/^audio|^image|^video/.test(s)?(this.responseIsBlob=!0,this.responseBlobType="view"):(n=await A.text(),s.includes("xml")&&(this.responseText=function(e){const t=(new DOMParser).parseFromString(e,"text/xml"),r=(new DOMParser).parseFromString(['<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\n      <xsl:strip-space elements="*"/>\n        <xsl:template match="para[content-style][not(text())]">\n          <xsl:value-of select="normalize-space(.)"/>\n        </xsl:template>\n        <xsl:template match="node()|@*">\n          <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>\n        </xsl:template>\n        <xsl:output indent="yes"/>\n      </xsl:stylesheet>'].join("\n"),"application/xml"),n=new XSLTProcessor;n.importStylesheet(r);const o=n.transformToDocument(t);return(new XMLSerializer).serializeToString(o)}(n)),this.responseText=n);if(this.responseIsBlob){const t=A.headers.get("content-disposition");this.respContentDisposition=t?t.split("filename=")[1].replace(/\\"/g,""):"filename",e=await A.blob(),this.responseBlobUrl=URL.createObjectURL(e)}}else n=await A.text(),this.responseText=n;this.dispatchEvent(new CustomEvent("after-try",{bubbles:!0,composed:!0,detail:{request:S,response:E,responseHeaders:i,responseBody:t||n||e,responseStatus:E.ok}}))}catch(e){r.disabled=!1,"AbortError"===e.name?(this.dispatchEvent(new CustomEvent("request-aborted",{bubbles:!0,composed:!0,detail:{err:e,request:S}})),this.responseMessage="Request Aborted"):(this.dispatchEvent(new CustomEvent("after-try",{bubbles:!0,composed:!0,detail:{err:e,request:S}})),this.responseMessage=`${e.message} (CORS or Network Issue)`)}this.requestUpdate()}onAddRemoveFileInput(e,t,r){if("button"!==e.target.tagName.toLowerCase())return;if(e.target.classList.contains("file-input-remove-btn")){return void e.target.closest(".input-set").remove()}const n=e.target.closest(".file-input-container"),o=document.createElement("div");o.setAttribute("class","input-set row");const a=document.createElement("input");a.type="file",a.style="width:200px; margin-top:2px;",a.setAttribute("data-pname",t),a.setAttribute("data-ptype",r.includes("form-urlencode")?"form-urlencode":"form-data"),a.setAttribute("data-array","false"),a.setAttribute("data-file-array","true");const i=document.createElement("button");i.setAttribute("class","file-input-remove-btn"),i.innerHTML="&#x2715;",o.appendChild(a),o.appendChild(i),n.insertBefore(o,e.target)}clearResponseData(){this.responseUrl="",this.responseHeaders="",this.responseText="",this.responseStatus="success",this.responseMessage="",this.responseIsBlob=!1,this.responseBlobType="",this.respContentDisposition="",this.responseBlobUrl&&(URL.revokeObjectURL(this.responseBlobUrl),this.responseBlobUrl="")}disconnectedCallback(){this.responseBlobUrl&&(URL.revokeObjectURL(this.responseBlobUrl),this.responseBlobUrl=""),super.disconnectedCallback()}});customElements.define("schema-table",class extends ne{static get properties(){return{schemaExpandLevel:{type:Number,attribute:"schema-expand-level"},schemaDescriptionExpanded:{type:String,attribute:"schema-description-expanded"},allowSchemaDescriptionExpandToggle:{type:String,attribute:"allow-schema-description-expand-toggle"},schemaHideReadOnly:{type:String,attribute:"schema-hide-read-only"},schemaHideWriteOnly:{type:String,attribute:"schema-hide-write-only"},data:{type:Object}}}connectedCallback(){super.connectedCallback(),(!this.schemaExpandLevel||this.schemaExpandLevel<1)&&(this.schemaExpandLevel=99999),this.schemaDescriptionExpanded&&"true false".includes(this.schemaDescriptionExpanded)||(this.schemaDescriptionExpanded="false"),this.schemaHideReadOnly&&"true false".includes(this.schemaHideReadOnly)||(this.schemaHideReadOnly="true"),this.schemaHideWriteOnly&&"true false".includes(this.schemaHideWriteOnly)||(this.schemaHideWriteOnly="true")}static get styles(){return[We,CR,l`
      .table {
        font-size: var(--font-size-small);
        text-align: left;
        line-height: calc(var(--font-size-small) + 6px);
      }
      .table .tr {
        width: calc(100% - 5px);
        padding: 0 0 0 5px;
        border-bottom: 1px dotted var(--light-border-color);
      }
      .table .td {
        padding: 4px 0;
      }
      .table .key {
        width: 240px;
      }
      .key.deprecated .key-label {
        text-decoration: line-through;
      }

      .table .key-type {
        white-space: normal;
        width: 150px;
      }
      .collapsed-descr .tr {
        max-height: calc(var(--font-size-small) + var(--font-size-small) + 4px);
      }

      .obj-toggle {
        padding: 0 2px;
        border-radius:2px;
        border: 1px solid transparent;
        display: inline-block;
        margin-left: -16px;
        color:var(--primary-color);
        cursor:pointer;
        font-size: calc(var(--font-size-small) + 4px);
        font-family: var(--font-mono);
        background-clip: border-box;
      }
      .obj-toggle:hover {
        border-color: var(--primary-color);
      }
      .tr.expanded + .object-body {
        display:block;
      }
      .tr.collapsed + .object-body {
        display:none;
      }`,et]}render(){var e,t,r;return F`
      <div class="table ${"true"===this.schemaDescriptionExpanded?"expanded-descr":"collapsed-descr"}">
        <div class='toolbar'>
          <div class="toolbar-item schema-root-type ${(null===(e=this.data)||void 0===e?void 0:e["::type"])||""} "> ${(null===(t=this.data)||void 0===t?void 0:t["::type"])||""} </div>
          ${"true"===this.allowSchemaDescriptionExpandToggle?F`
              <div style="flex:1"></div>
              <div class='toolbar-item' @click='${()=>{this.schemaDescriptionExpanded="true"===this.schemaDescriptionExpanded?"false":"true"}}'> 
                ${"true"===this.schemaDescriptionExpanded?"Single line description":"Multiline description"}
              </div>
            `:""}
        </div>
        ${null!==(r=this.data)&&void 0!==r&&r["::description"]?F`<span class='m-markdown'> ${HP(qe(this.data["::description"]||""))}</span>`:""}
        <div style = 'border:1px solid var(--light-border-color)'>
          <div style='display:flex; background-color: var(--bg2); padding:8px 4px; border-bottom:1px solid var(--light-border-color);'>
            <div class='key' style='font-family:var(--font-regular); font-weight:bold; color:var(--fg);'> Field </div>
            <div class='key-type' style='font-family:var(--font-regular); font-weight:bold; color:var(--fg);'> Type </div>
            <div class='key-descr' style='font-family:var(--font-regular); font-weight:bold; color:var(--fg);'> Description </div>
          </div>
          ${this.data?F`
              ${this.generateTree("array"===this.data["::type"]?this.data["::props"]:this.data,this.data["::type"],this.data["::array-type"])}`:""}  
        </div>
      </div>  
    `}generateTree(e,t="object",r="",n="",o="",a=0,i=0,s=""){var l,c;if("true"===this.schemaHideReadOnly){if("array"===t&&"readonly"===s)return;if("readonly"===e["::readwrite"])return}if("true"===this.schemaHideWriteOnly){if("array"===t&&"writeonly"===s)return;if("writeonly"===e["::readwrite"])return}const p=null!==(l=e["::type"])&&void 0!==l&&l.startsWith("xxx-of")?a:a+1,u="xxx-of-option"===t||"xxx-of-option"===e["::type"]||n.startsWith("::OPTION")?i:i+1,d=16*u;if(!e)return F`<div class="null" style="display:inline;">null</div>`;if(0===Object.keys(e).length)return F`<span class="td key object" style='padding-left:${d}px'>${n}</span>`;let h="",f="",m=!1;if(n.startsWith("::ONE~OF")||n.startsWith("::ANY~OF"))h=n.replace("::","").replace("~"," "),m=!0;else if(n.startsWith("::OPTION")){const e=n.split("~");h=e[1],f=e[2]}else h=n;let y="";if("object"===e["::type"]?y="array"===t?"array of object":"object":"array"===e["::type"]&&(y="array"===t?"array of array "+("object"!==r?`of ${r}`:""):"array"),"object"==typeof e)return F`
        ${p>=0&&n?F`
            <div class='tr ${p<=this.schemaExpandLevel?"expanded":"collapsed"} ${e["::type"]}' data-obj='${h}'>
              <div class="td key ${e["::deprecated"]?"deprecated":""}" style='padding-left:${d}px'>
                ${h||f?F`
                    <span 
                      class='obj-toggle ${p<this.schemaExpandLevel?"expanded":"collapsed"}'
                      data-obj='${h}'
                      @click= ${e=>this.toggleObjectExpand(e,h)} 
                    >
                      ${a<this.schemaExpandLevel?"-":"+"}
                    </span>`:""}
                ${"xxx-of-option"===e["::type"]||"xxx-of-array"===e["::type"]||n.startsWith("::OPTION")?F`<span class="xxx-of-key" style="margin-left:-6px">${h}</span><span class="${m?"xxx-of-key":"xxx-of-descr"}">${f}</span>`:h.endsWith("*")?F`<span class="key-label" style="display:inline-block; margin-left:-6px;"> ${h.substring(0,h.length-1)}</span><span style='color:var(--red);'>*</span>`:F`<span class="key-label" style="display:inline-block; margin-left:-6px;">${"::props"===h?"":h}</span>`}
                ${"xxx-of"===e["::type"]&&"array"===t?F`<span style="color:var(--primary-color)">ARRAY</span>`:""} 
              </div>
              <div class='td key-type' title="${"readonly"===e["::readwrite"]?"Read-Only":"writeonly"===e["::readwrite"]?"Write-Only":""}">
                ${(e["::type"]||"").includes("xxx-of")?"":y}
                ${"readonly"===e["::readwrite"]?" 🆁":"writeonly"===e["::readwrite"]?" 🆆":""}
              </div>
              <div class='td key-descr m-markdown-small' style='line-height:1.7'>${HP(qe(o||""))}</div>
            </div>`:F`
              ${"array"===e["::type"]&&"array"===t?F`
                  <div class='tr'> 
                    <div class='td key'></div> 
                    <div class='td key-type'>
                      ${r&&"object"!==r?`${t} of ${r}`:t}
                    </div> 
                    <div class='td key-descr'></div> 
                  </div>`:""}
          `}
        <div class='object-body'>
        ${Array.isArray(e)&&e[0]?F`${this.generateTree(e[0],"xxx-of-option","","::ARRAY~OF","",p,u,"")}`:F`
            ${Object.keys(e).map((t=>F`
              ${["::title","::description","::type","::props","::deprecated","::array-type","::readwrite"].includes(t)?"array"===e[t]["::type"]||"object"===e[t]["::type"]?F`${this.generateTree("array"===e[t]["::type"]?e[t]["::props"]:e[t],e[t]["::type"],e[t]["::array-type"]||"",t,e[t]["::description"],p,u,e[t]["::readwrite"]?e[t]["::readwrite"]:"")}`:"":F`${this.generateTree("array"===e[t]["::type"]?e[t]["::props"]:e[t],e[t]["::type"],e[t]["::array-type"]||"",t,e[t]["::description"],p,u,e[t]["::readwrite"]?e[t]["::readwrite"]:"")}`}
            `))}
          `}
        <div>
      `;const[g,v,b,x,w,$,k,S,A]=e.split("~|~");if("🆁"===v&&"true"===this.schemaHideReadOnly)return;if("🆆"===v&&"true"===this.schemaHideWriteOnly)return;const E=g.replace(/┃.*/g,"").replace(/[^a-zA-Z0-9+]/g,"").substring(0,4).toLowerCase();let O="";return O="array"===t?F` 
        <div class='td key-type ${E}' title="${"readonly"===s?"Read-Only":"writeonly"===v?"Write-Only":""}">
          [${g}] ${"readonly"===s?"🆁":"writeonly"===s?"🆆":""}
        </div>`:F` 
        <div class='td key-type ${E}' title="${"🆁"===v?"Read-Only":"🆆"===v?"Write-Only":""}">
          ${g} ${v}
        </div>`,F`
      <div class = "tr primitive">
        <div class="td key ${A}" style='padding-left:${d}px'>
          ${null!==(c=h)&&void 0!==c&&c.endsWith("*")?F`<span class="key-label">${h.substring(0,h.length-1)}</span><span style='color:var(--red);'>*</span>`:n.startsWith("::OPTION")?F`<span class='xxx-of-key'>${h}</span><span class="xxx-of-descr">${f}</span>`:F`${h?F`<span class="key-label"> ${h}</span>`:F`<span class="xxx-of-descr">${S}</span>`}`}
        </div>
        ${O}
        <div class='td key-descr'>
          ${"array"===t?F`<span class="m-markdown-small">${HP(qe(o))}</span>`:""}
          ${b?F`<div style='display:inline-block; line-break:anywhere; margin-right:8px;'> <span class='bold-text'>Constraints: </span> ${b}</div>`:""}
          ${x?F`<div style='display:inline-block; line-break:anywhere; margin-right:8px;'> <span class='bold-text'>Default: </span>${x}</div>`:""}
          ${w?F`<div style='display:inline-block; line-break:anywhere; margin-right:8px;'> <span class='bold-text'>Allowed: </span>${w}</div>`:""}
          ${$?F`<div style='display:inline-block; line-break:anywhere; margin-right:8px;'> <span class='bold-text'>Pattern: </span>${$}</div>`:""}
          ${k?F`<span class="m-markdown-small">${HP(qe(`${S?`**${S}:**`:""} ${k}`))}</span>`:""}
        </div>
      </div>
    `}toggleObjectExpand(e){const t=e.target.closest(".tr");t.classList.contains("expanded")?(t.classList.add("collapsed"),t.classList.remove("expanded"),e.target.innerText="+"):(t.classList.remove("collapsed"),t.classList.add("expanded"),e.target.innerText="-")}});function _R(e){const t=new qe.Renderer;return t.heading=(t,r,n,o)=>`<h${r} class="observe-me" id="${e}--${o.slug(n)}">${t}</h${r}>`,t}function jR(e,t=""){var r,n,o;const a=new Set;for(const t in e.responses)for(const r in null===(i=e.responses[t])||void 0===i?void 0:i.content){var i;a.add(r.trim())}const s=[...a].join(", "),l=this.resolvedSpec.securitySchemes.filter((t=>{var r;return t.finalKeyValue&&(null===(r=e.security)||void 0===r?void 0:r.some((e=>t.securitySchemeId in e)))}))||[],c=this.resolvedSpec.securitySchemes.find((e=>e.securitySchemeId===rt&&"-"!==e.value));c&&l.push(c);const p=e.xCodeSamples?iR.call(this,e.xCodeSamples):"";return F`
    ${"read"===this.renderStyle?F`<div class='divider' part="operation-divider"></div>`:""}
    <div class='expanded-endpoint-body observe-me ${e.method} ${e.deprecated?"deprecated":""} ' part="section-operation ${e.elementId}" id='${e.elementId}'>
    ${"focused"===this.renderStyle&&"General ⦂"!==t?F`<h3 class="upper" style="font-weight:bold"> ${t} </h3>`:""}
    ${e.deprecated?F`<div class="bold-text red-text"> DEPRECATED </div>`:""}
    ${F`
      ${e.xBadges&&(null===(r=e.xBadges)||void 0===r?void 0:r.length)>0?F`
          <div style="display:flex; flex-wrap:wrap; margin-bottom: -24px; font-size: var(--font-size-small);">
            ${e.xBadges.map((e=>F`<span style="margin:1px; margin-right:5px; padding:1px 8px; font-weight:bold; border-radius:12px;  background-color: var(--light-${e.color}, var(--input-bg)); color:var(--${e.color}); border:1px solid var(--${e.color})">${e.label}</span>`))}
          </div>
          `:""}
      <h2> ${e.shortSummary||`${e.method.toUpperCase()} ${e.path}`}</h2>
      ${e.isWebhook?F`<span style="color:var(--primary-color); font-weight:bold; font-size: var(--font-size-regular);"> WEBHOOK </span>`:F`
          <div class='mono-font part="section-operation-url" regular-font-size' style='text-align:left; direction:ltr; padding: 8px 0; color:var(--fg3)'> 
            <span part="label-operation-method" class='regular-font upper method-fg bold-text ${e.method}'>${e.method}</span> 
            <span part="label-operation-path">${e.path}</span>
          </div>
        `}
      <slot name="${e.elementId}"></slot>`}
    ${e.description?F`<div class="m-markdown"> ${HP(qe(e.description))}</div>`:""}
    ${aR.call(this,e.security)}
    ${p}
    <div class='expanded-req-resp-container'>
      <api-request
        class = "${this.renderStyle}-mode"
        style = "width:100%;"
        method = "${e.method}"
        path = "${e.path}"
        .security = "${e.security}"
        .parameters = "${e.parameters}"
        .request_body = "${e.requestBody}"
        .api_keys = "${l}"
        .servers = "${e.servers}"
        server-url = "${(null===(n=e.servers)||void 0===n||null===(o=n[0])||void 0===o?void 0:o.url)||this.selectedServer.computedUrl}"
        fill-request-fields-with-example = "${this.fillRequestFieldsWithExample}"
        allow-try = "${this.allowTry}"
        accept = "${s}"
        render-style="${this.renderStyle}" 
        schema-style = "${this.schemaStyle}"
        active-schema-tab = "${this.defaultSchemaTab}"
        schema-expand-level = "${this.schemaExpandLevel}"
        schema-description-expanded = "${this.schemaDescriptionExpanded}"
        allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}"
        schema-hide-read-only = "${this.schemaHideReadOnly}"
        fetch-credentials = "${this.fetchCredentials}"
        exportparts = "btn:btn, btn-fill:btn-fill, btn-outline:btn-outline, btn-try:btn-try, btn-clear:btn-clear, btn-clear-resp:btn-clear-resp,
          file-input:file-input, textbox:textbox, textbox-param:textbox-param, textarea:textarea, textarea-param:textarea-param, 
          anchor:anchor, anchor-param-example:anchor-param-example"
      > </api-request>

      ${e.callbacks?sR.call(this,e.callbacks):""}

      <api-response
        class = "${this.renderStyle}-mode"
        style = "width:100%;"
        .responses = "${e.responses}"
        render-style = "${this.renderStyle}"
        schema-style = "${this.schemaStyle}"
        active-schema-tab = "${this.defaultSchemaTab}"
        schema-expand-level = "${this.schemaExpandLevel}"
        schema-description-expanded = "${this.schemaDescriptionExpanded}"
        allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}"
        schema-hide-write-only = "${this.schemaHideWriteOnly}"
        selected-status = "${Object.keys(e.responses||{})[0]||""}"
        exportparts = "btn:btn, btn-response-status:btn-response-status, btn-selected-response-status:btn-selected-response-status, btn-fill:btn-fill, btn-copy:btn-copy"
      > </api-response>
    </div>
  </div>
  `}function IR(){return this.resolvedSpec?F`
  ${this.resolvedSpec.tags.map((e=>F`
    <section id="${e.elementId}" part="section-tag" class="regular-font section-gap--read-mode observe-me" style="border-top:1px solid var(--primary-color);">
      <div class="title tag" part="label-tag-title">${e.name}</div>
      <slot name="${e.elementId}"></slot>
      <div class="regular-font-size">
      ${HP(`\n          <div class="m-markdown regular-font">\n          ${qe(e.description||"","true"===this.infoDescriptionHeadingsInNavBar?{renderer:_R(e.elementId)}:void 0)}\n        </div>`)}
      </div>
    </section>
    <section class='regular-font section-gap--read-mode' part="section-operations-in-tag">
      ${e.paths.map((e=>jR.call(this,e,"BBB")))}
    </section>
    `))}
`:""}function PR(e){return F`
  <div class='divider'></div>
  <div class='expanded-endpoint-body observe-me ${e.name}' id='cmp--${e.id}' >
    <div style="font-weight:bold"> ${e.name} <span style="color:var(--light-fg); font-size:var(--font-size-small); font-weight:400;"> Schema </span></div>
  ${"table"===this.schemaStyle?F`
      <schema-table
        render-style = '${this.renderStyle}'
        .data = '${AR(e.component,{})}'
        schema-expand-level = "${this.schemaExpandLevel}"
        schema-description-expanded = "${this.schemaDescriptionExpanded}"
        allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}",
        schema-hide-read-only = "false"
        schema-hide-write-only = "${this.schemaHideWriteOnly}"
      > </schema-tree> `:F`
      <schema-tree
        render-style = '${this.renderStyle}'
        .data = '${AR(e.component,{})}'
        schema-expand-level = "${this.schemaExpandLevel}"
        schema-description-expanded = "${this.schemaDescriptionExpanded}"
        allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}",
        schema-hide-read-only = "false"
        schema-hide-write-only = "${this.schemaHideWriteOnly}"
      > </schema-tree>`}
  </div>`}function RR(e,t){return-1!==e.id.indexOf("schemas-")?PR.call(this,e):F`
  <div class='divider'></div>
  <div class='expanded-endpoint-body observe-me ${e.name}' id='cmp--${e.id}' >
    ${F`
      <div style="font-weight:bold"> ${e.name} <span style="color:var(--light-fg); font-size:var(--font-size-small); font-weight:400"> ${t} </span> </div>
      ${e.component?F`
      <div class='mono-font regular-font-size' style='padding: 8px 0; color:var(--fg2)'> 
        <json-tree class="border tree" render-style='${this.renderStyle}' .data="${e.component}"> </json-tree>
      </div>`:""}
    `}
  </div>
  `}function LR(){return this.resolvedSpec?F`
  ${this.resolvedSpec.components.map((e=>F`
    <div id="cmp--${e.name.toLowerCase()}" class='regular-font section-gap--read-mode observe-me' style="border-top:1px solid var(--primary-color);">
      <div class="title tag">${e.name}</div>
      <div class="regular-font-size">
        ${HP(`<div class='m-markdown regular-font'>${qe(e.description?e.description:"")}</div>`)}
      </div>
    </div>
    <div class='regular-font section-gap--read-mode'>
      ${e.subComponents.filter((e=>!1!==e.expanded)).map((t=>RR.call(this,t,e.name)))}
    </div>
    `))}
`:""}function DR(){const e=new qe.Renderer;return e.heading=(e,t,r,n)=>`<h${t} class="observe-me" id="overview--${n.slug(r)}">${e}</h${t}>`,e}function FR(){var e,t,r,n;return F`
    <section id="overview" part="section-overview"
      class="observe-me ${"view"===this.renderStyle?"section-gap":"section-gap--read-mode"}">
      ${null!==(e=this.resolvedSpec)&&void 0!==e&&e.info?F`
          <div id="api-title" part="label-overview-title" style="font-size:32px">
            ${this.resolvedSpec.info.title}
            ${this.resolvedSpec.info.version?F`
              <span style = 'font-size:var(--font-size-small);font-weight:bold'>
                ${this.resolvedSpec.info.version}
              </span>`:""}
          </div>
          <div id="api-info" style="font-size:calc(var(--font-size-regular) - 1px); margin-top:8px;">
            ${null!==(t=this.resolvedSpec.info.contact)&&void 0!==t&&t.email?F`<span>${this.resolvedSpec.info.contact.name||"Email"}: 
                <a href="mailto:${this.resolvedSpec.info.contact.email}" part="anchor anchor-overview">${this.resolvedSpec.info.contact.email}</a>
              </span>`:""}
            ${null!==(r=this.resolvedSpec.info.contact)&&void 0!==r&&r.url?F`<span>URL: <a href="${this.resolvedSpec.info.contact.url}" part="anchor anchor-overview">${this.resolvedSpec.info.contact.url}</a></span>`:""}
            ${this.resolvedSpec.info.license?F`<span>License: 
                ${this.resolvedSpec.info.license.url?F`<a href="${this.resolvedSpec.info.license.url}" part="anchor anchor-overview">${this.resolvedSpec.info.license.name}</a>`:this.resolvedSpec.info.license.name} </span>`:""}
            ${this.resolvedSpec.info.termsOfService?F`<span><a href="${this.resolvedSpec.info.termsOfService}" part="anchor anchor-overview">Terms of Service</a></span>`:""}
            ${this.specUrl&&"true"===this.allowSpecFileDownload?F`
                <div style="display:flex; margin:12px 0; gap:8px; justify-content: start;">
                  <button class="m-btn thin-border" style="width:170px" part="btn btn-outline" @click='${e=>{st(this.specUrl,"openapi-spec")}}'>Download OpenAPI spec</button>
                  ${null!==(n=this.specUrl)&&void 0!==n&&n.trim().toLowerCase().endsWith("json")?F`<button class="m-btn thin-border" style="width:200px" part="btn btn-outline" @click='${e=>{lt(this.specUrl)}}'>View OpenAPI spec (New Tab)</button>`:""}
                </div>`:""}
          </div>
          <slot name="overview"></slot>
          <div id="api-description">
          ${this.resolvedSpec.info.description?F`${HP(`\n                <div class="m-markdown regular-font">\n                ${qe(this.resolvedSpec.info.description,"true"===this.infoDescriptionHeadingsInNavBar?{renderer:DR()}:void 0)}\n              </div>`)}`:""}
          </div>
        `:""}
    </section>
  `}function BR(e){var t;const r=null===(t=this.resolvedSpec)||void 0===t?void 0:t.servers.find((t=>t.url===e));return!!r&&(this.selectedServer=r,this.requestUpdate(),this.dispatchEvent(new CustomEvent("api-server-change",{bubbles:!0,composed:!0,detail:{selectedServer:r}})),!0)}function NR(e,t){const r=[...e.currentTarget.closest("table").querySelectorAll("input, select")];let n=t.url;r.forEach((e=>{const t=new RegExp(`{${e.dataset.var}}`,"g");n=n.replace(t,e.value)})),t.computedUrl=n,this.requestUpdate()}function zR(){return this.selectedServer&&this.selectedServer.variables?F`
    <div class="table-title"> SERVER VARIABLES</div>
    <table class='m-table'>
      ${Object.entries(this.selectedServer.variables).map((e=>F`
        <tr>
          <td style="vertical-align: middle;" >${e[0]}</td>
          <td>
            ${e[1].enum?F`
            <select
              data-var = "${e[0]}"
              @input = ${e=>{NR.call(this,e,this.selectedServer)}}
            >
            ${Object.entries(e[1].enum).map((t=>e[1].default===t[1]?F`
              <option
                selected
                label = ${t[1]}
                value = ${t[1]}
              />`:F`
              <option
                label = ${t[1]}
                value = ${t[1]}
              />`))}
            </select>`:F`
            <input
              type = "text"
              part="textbox textbox-server-var"
              spellcheck = "false"
              data-var = "${e[0]}"
              value = "${e[1].default}"
              @input = ${e=>{NR.call(this,e,this.selectedServer)}}
            />`}
          </td>
        </tr>
        ${e[1].description?F`<tr><td colspan="2" style="border:none"><span class="m-markdown-small"> ${HP(qe(e[1].description))} </span></td></tr>`:""}
      `))}
    </table>
    `:""}function UR(){var e,t,r;return!this.resolvedSpec||this.resolvedSpec.specLoadError?"":F`
  <section id = 'servers' part="section-servers" style="text-align:left; direction:ltr; margin-top:24px; margin-bottom:24px;" class='regular-font observe-me ${"read focused".includes(this.renderStyle)?"section-gap--read-mode":"section-gap"}'>
    <div class = 'sub-title'>API SERVER</div>
    <div class = 'mono-font' style='margin: 12px 0; font-size:calc(var(--font-size-small) + 1px);'>
      ${this.resolvedSpec.servers&&0!==(null===(e=this.resolvedSpec.servers)||void 0===e?void 0:e.length)?F`
          ${null===(t=this.resolvedSpec)||void 0===t?void 0:t.servers.map(((e,t)=>F`
            <input type = 'radio'
              name = 'api_server'
              id = 'srvr-opt-${t}'
              value = '${e.url}'
              @change = ${()=>{BR.call(this,e.url)}}
              .checked = '${this.selectedServer.url===e.url}'
              style = 'margin:4px 0; cursor:pointer'
            />
              <label style='cursor:pointer' for='srvr-opt-${t}'>
                ${e.url} ${e.description?F`- <span class='regular-font'>${e.description} </span>`:""}
              </label>
            <br/>
          `))}
      `:""}
      <div class="table-title primary-text" part="label-selected-server"> SELECTED: ${(null===(r=this.selectedServer)||void 0===r?void 0:r.computedUrl)||"none"}</div>
    </div>
    <slot name="servers"></slot>
    ${zR.call(this)}
  </section>`}function qR(e,t="toggle"){const r=null==e?void 0:e.closest(".nav-bar-tag-and-paths");if(r){const e=r.classList.contains("expanded");!e||"toggle"!==t&&"collapse"!==t?e||"toggle"!==t&&"expand"!==t||r.classList.replace("collapsed","expanded"):r.classList.replace("expanded","collapsed")}}function MR(e){qR(e.target,"toggle")}function HR(e,t="expand-all"){!function(e,t="expand-all"){const r=[...e.querySelectorAll(".nav-bar-tag-and-paths")];"expand-all"===t?r.map((e=>{e.classList.replace("collapsed","expanded")})):r.map((e=>{e.classList.replace("expanded","collapsed")}))}(e.target.closest(".nav-scroll"),t)}function WR(){return!this.resolvedSpec||this.resolvedSpec.specLoadError?F`
      <nav class='nav-bar' part="section-navbar">
        <slot name="nav-logo" class="logo"></slot>
      </nav>
    `:F`
  <nav class='nav-bar ${this.renderStyle}' part="section-navbar">
    <slot name="nav-logo" class="logo"></slot>
    ${"false"===this.allowSearch&&"false"===this.allowAdvancedSearch?"":F`
        <div style="display:flex; flex-direction:row; justify-content:center; align-items:center; padding:8px 24px 12px 24px; ${"false"===this.allowAdvancedSearch?"border-bottom: 1px solid var(--nav-hover-bg-color)":""}">
          ${"false"===this.allowSearch?"":F`
              <div style="display:flex; flex:1; line-height:22px;">
                <input id="nav-bar-search" 
                  part = "textbox textbox-nav-filter"
                  style = "width:100%; padding-right:20px; color:var(--nav-hover-text-color); border-color:var(--nav-accent-color); background-color:var(--nav-hover-bg-color)" 
                  type = "text"
                  placeholder = "Filter" 
                  @change = "${this.onSearchChange}"  
                  spellcheck = "false" 
                >
                <div style="margin: 6px 5px 0 -24px; font-size:var(--font-size-regular); cursor:pointer;">&#x21a9;</div>
              </div>  
              ${this.matchPaths?F`
                  <div @click = '${this.onClearSearch}' style='margin-left:5px; cursor:pointer; align-self:center; color:var(--nav-text-color)' class='small-font-size primary-text bold-text'> CLEAR </div>`:""}
            `}
          ${"false"===this.allowAdvancedSearch||this.matchPaths?"":F`
              <button class="m-btn primary" part="btn btn-fill btn-search" style="margin-left:5px;" @click="${this.onShowSearchModalClicked}">
                Search
              </button>
            `}
        </div>
      `}
    ${F`<nav class='nav-scroll' part="section-navbar-scroll">
      ${"false"!==this.showInfo&&this.resolvedSpec.info?F`
          ${"true"===this.infoDescriptionHeadingsInNavBar?F`
              ${this.resolvedSpec.infoDescriptionHeaders.length>0?F`<div class='nav-bar-info' id='link-overview' data-content-id='overview' @click = '${e=>this.scrollToEventTarget(e,!1)}' > Overview </div>`:""}
              <div class="overview-headers">
                ${this.resolvedSpec.infoDescriptionHeaders.map((e=>F`
                  <div 
                    class='nav-bar-h${e.depth}' 
                    id="link-overview--${(new qe.Slugger).slug(e.text)}"  
                    data-content-id='overview--${(new qe.Slugger).slug(e.text)}' 
                    @click='${e=>this.scrollToEventTarget(e,!1)}'
                  >
                    ${e.text}
                  </div>`))}
              </div>
              ${this.resolvedSpec.infoDescriptionHeaders.length>0?F`<hr style='border-top: 1px solid var(--nav-hover-bg-color); border-width:1px 0 0 0; margin: 15px 0 0 0'/>`:""}
            `:F`<div class='nav-bar-info' id='link-overview' data-content-id='overview' @click = '${e=>this.scrollToEventTarget(e,!1)}'> Overview </div>`}
        `:""}
    
      ${"false"===this.allowServerSelection?"":F`<div class='nav-bar-info' id='link-servers' data-content-id='servers' @click = '${e=>this.scrollToEventTarget(e,!1)}'> API Servers </div>`}
      ${"false"!==this.allowAuthentication&&this.resolvedSpec.securitySchemes?F`<div class='nav-bar-info' id='link-auth' data-content-id='auth' @click = '${e=>this.scrollToEventTarget(e,!1)}'> Authentication </div>`:""}

      <div id='link-operations-top' class='nav-bar-section operations' data-content-id='operations-top' @click = '${e=>this.scrollToEventTarget(e,!1)}'>
        <div style="font-size:16px; display:flex; margin-left:10px;">
          ${"focused"===this.renderStyle?F`
              <div @click="${e=>{HR.call(this,e,"expand-all")}}" title="Expand all" style="transform: rotate(90deg); cursor:pointer; margin-right:10px;">▸</div>
              <div @click="${e=>{HR.call(this,e,"collapse-all")}}" title="Collapse all" style="transform: rotate(270deg); cursor:pointer;">▸</div>`:""}  
        </div>
        <div class='nav-bar-section-title'> OPERATIONS </div>
      </div>

      <!-- TAGS AND PATHS-->
      ${this.resolvedSpec.tags.filter((e=>e.paths.filter((e=>at(this.matchPaths,e,this.matchType))).length)).map((e=>F`
          <div class='nav-bar-tag-and-paths ${e.expanded?"expanded":"collapsed"}'>
            ${"General ⦂"===e.name?F`<hr style="border:none; border-top: 1px dotted var(--nav-text-color); opacity:0.3; margin:-1px 0 0 0;"/>`:F`
                <div 
                  class='nav-bar-tag' 
                  id="link-${e.elementId}" 
                  data-content-id='${e.elementId}'
                  data-first-path-id='${e.firstPathId}'
                  @click='${e=>{"focused"===this.renderStyle&&"expand-collapse"===this.onNavTagClick?MR.call(this,e):this.scrollToEventTarget(e,!1)}}'
                >
                  <div>${e.name}</div>
                  <div class="nav-bar-tag-icon" @click="${e=>{"focused"===this.renderStyle&&"show-description"===this.onNavTagClick&&MR.call(this,e)}}">
                  </div>
                </div>
              `}
            ${"true"===this.infoDescriptionHeadingsInNavBar?F`
                ${"focused"===this.renderStyle&&"expand-collapse"===this.onNavTagClick?"":F`
                    <div class='tag-headers'>
                      ${e.headers.map((t=>F`
                      <div 
                        class='nav-bar-h${t.depth}' 
                        id="link-${e.elementId}--${(new qe.Slugger).slug(t.text)}"  
                        data-content-id='${e.elementId}--${(new qe.Slugger).slug(t.text)}' 
                        @click='${e=>this.scrollToEventTarget(e,!1)}'
                      > ${t.text}</div>`))}
                    </div>`}`:""}

            
            <div class='nav-bar-paths-under-tag'>
              <!-- Paths in each tag (endpoints) -->
              ${e.paths.filter((e=>!this.matchPaths||at(this.matchPaths,e,this.matchType))).map((e=>F`
              <div 
                class='nav-bar-path
                ${"true"===this.usePathInNavBar?"small-font":""}'
                data-content-id='${e.elementId}'
                id='link-${e.elementId}'
                @click = '${e=>{this.scrollToEventTarget(e,!1)}}'
              >
                <span style = "${e.deprecated?"filter:opacity(0.5)":""}">
                  ${e.isWebhook?F`<span style="font-weight:bold; margin-right:8px; font-size: calc(var(--font-size-small) - 2px)">WEBHOOK</span>`:""}
                  ${"true"===this.usePathInNavBar?F`<span class='mono-font'>${e.method.toUpperCase()} ${e.path}</span>`:e.summary||e.shortSummary}
                </span>
              </div>`))}
            </div>
          </div>
        `))}

      <!-- COMPONENTS -->
      ${this.resolvedSpec.components&&"true"===this.showComponents&&"focused"===this.renderStyle?F`
          <div id='link-components' class='nav-bar-section components'>
            <div></div>
            <div class='nav-bar-section-title'>COMPONENTS</div>
          </div>
          ${this.resolvedSpec.components.map((e=>e.subComponents.length?F`
              <div class='nav-bar-tag' 
                data-content-id='cmp--${e.name.toLowerCase()}' 
                id='link-cmp--${e.name.toLowerCase()}' 
                @click='${e=>this.scrollToEventTarget(e,!1)}'>
                ${e.name}
              </div>
              ${e.subComponents.filter((e=>!1!==e.expanded)).map((e=>F`
                <div class='nav-bar-path' data-content-id='cmp--${e.id}' id='link-cmp--${e.id}' @click='${e=>this.scrollToEventTarget(e,!1)}'>
                  <span> ${e.name} </span>
                </div>`))}`:""))}`:""}
    </nav>`}
</nav>
`}function VR(e){const t=new qe.Renderer;return t.heading=(t,r,n,o)=>`<h${r} class="observe-me" id="${e}--${o.slug(n)}">${t}</h${r}>`,t}function GR(e){return F`
    <div class='regular-font section-gap--focused-mode' part="section-operations-in-tag">
      ${e}
    </div>`}function KR(){var e;if("true"===this.showInfo)return GR(FR.call(this));const t=this.resolvedSpec.tags[0],r=null===(e=this.resolvedSpec.tags[0])||void 0===e?void 0:e.paths[0];return GR(t&&r?jR.call(this,r,t.name):"")}function JR(e){return F`
    <h1 id="${e.elementId}">${e.name}</h1>
    ${"show-description"===this.onNavTagClick&&e.description?F`
        <div class="m-markdown">
          ${HP(`\n            <div class="m-markdown regular-font">\n              ${qe(e.description||"","true"===this.infoDescriptionHeadingsInNavBar?{renderer:VR(e.elementId)}:void 0)}\n            </div>`)}
        </div>`:""}
  `}function YR(){if(!this.focusedElementId||!this.resolvedSpec)return;const e=this.focusedElementId;let t,r=null,n=null,o=0;if(e.startsWith("overview")&&"true"===this.showInfo)t=FR.call(this);else if("auth"===e&&"true"===this.allowAuthentication)t=oR.call(this);else if("servers"===e&&"true"===this.allowServerSelection)t=UR.call(this);else if("operations-top"===e)t=F`
    <div id="operations-top" class="observe-me">
      <slot name="operations-top"></slot>
    </div>`;else if(e.startsWith("cmp--")&&"true"===this.showComponents)t=LR.call(this);else if(e.startsWith("tag--")){const r=e.indexOf("--",4)>0?e.substring(0,e.indexOf("--",5)):e;n=this.resolvedSpec.tags.find((e=>e.elementId===r)),t=n?GR.call(this,JR.call(this,n)):KR.call(this)}else{for(o=0;o<this.resolvedSpec.tags.length&&(n=this.resolvedSpec.tags[o],r=this.resolvedSpec.tags[o].paths.find((t=>`${t.elementId}`===e)),!r);o+=1);if(r){qR(this.shadowRoot.getElementById(`link-${e}`),"expand"),t=GR.call(this,jR.call(this,r,n.name))}else t=KR.call(this)}return t}function ZR(e){if(e.expanded)e.expanded=!1,"true"===this.updateRoute&&window.history.replaceState(null,null,`${window.location.href.split("#")[0]}${"#"===this.routePrefix?"":`${this.routePrefix}`}`);else if(e.expanded=!0,"true"===this.updateRoute){const t=`${this.routePrefix||"#"}${e.elementId}`;window.location.hash!==t&&window.history.replaceState(null,null,`${window.location.href.split("#")[0]}${t}`)}this.requestUpdate()}function QR(e,t="expand-all"){const r=[...e.querySelectorAll(".section-tag")];"expand-all"===t?r.map((e=>{e.classList.replace("collapsed","expanded")})):r.map((e=>{e.classList.replace("expanded","collapsed")}))}function XR(e,t="expand-all"){QR.call(this,e.target.closest(".operations-root"),t)}function eL(e,t=!1){return F`
  <summary @click="${t=>{ZR.call(this,e,t)}}" class='endpoint-head ${e.method} ${e.deprecated?"deprecated":""} ${t||e.expanded?"expanded":"collapsed"}'>
    <div class="method ${e.method} ${e.deprecated?"deprecated":""}"> ${e.method} </div> 
    <div class="path ${e.deprecated?"deprecated":""}"> 
      ${e.path} 
      ${e.isWebhook?F`<span style="font-family: var(--font-regular); font-size: var(--); font-size: var(--font-size-small); color:var(--primary-color); margin-left: 16px"> Webhook</span>`:""}
    </div>
    ${e.deprecated?F`
        <span style="font-size:var(--font-size-small); text-transform:uppercase; font-weight:bold; color:var(--red); margin:2px 0 0 5px;"> 
          deprecated 
        </span>`:""}
    ${this.showSummaryWhenCollapsed?F`
        <div class="only-large-screen" style="min-width:60px; flex:1"></div>
        <div class="descr">${e.summary||e.shortSummary} </div>`:""}
  </summary>
  `}function tL(e){var t;const r=new Set;for(const t in e.responses)for(const o in null===(n=e.responses[t])||void 0===n?void 0:n.content){var n;r.add(o.trim())}const o=[...r].join(", "),a=this.resolvedSpec.securitySchemes.filter((t=>{var r;return t.finalKeyValue&&(null===(r=e.security)||void 0===r?void 0:r.some((e=>t.securitySchemeId in e)))}))||[],i=this.resolvedSpec.securitySchemes.find((e=>e.securitySchemeId===rt&&"-"!==e.value));i&&a.push(i);const s=e.xCodeSamples?iR(e.xCodeSamples):"";return F`
  <div class='endpoint-body ${e.method} ${e.deprecated?"deprecated":""}'>
    <div class="summary">
      ${e.summary?F`<div class="title">${e.summary}<div>`:e.shortSummary!==e.description?F`<div class="title">${e.shortSummary}</div>`:""}
      ${e.xBadges&&(null===(t=e.xBadges)||void 0===t?void 0:t.length)>0?F`
          <div style="display:flex; flex-wrap:wrap;font-size: var(--font-size-small);">
            ${e.xBadges.map((e=>F`<span style="margin:1px; margin-right:5px; padding:1px 8px; font-weight:bold; border-radius:12px;  background-color: var(--light-${e.color}, var(--input-bg)); color:var(--${e.color}); border:1px solid var(--${e.color})">${e.label}</span>`))}
          </div>
          `:""}

      ${e.description?F`<div class="m-markdown"> ${HP(qe(e.description))}</div>`:""}
      <slot name="${e.elementId}"></slot>
      ${aR.call(this,e.security)}
      ${s}
    </div>  
    <div class='req-resp-container'> 
      <div style="display:flex; flex-direction:column" class="view-mode-request ${this.layout}-layout">
        <api-request
          class = "${this.renderStyle}-mode ${this.layout}-layout"
          style = "width:100%;"
          method = "${e.method}", 
          path = "${e.path}"
          .security = "${e.security}"
          .parameters = "${e.parameters}"
          .request_body = "${e.requestBody}"
          .api_keys = "${a}"
          .servers = "${e.servers}" 
          server-url = "${e.servers&&e.servers.length>0?e.servers[0].url:this.selectedServer.computedUrl}" 
          active-schema-tab = "${this.defaultSchemaTab}"
          fill-request-fields-with-example = "${this.fillRequestFieldsWithExample}"
          allow-try = "${this.allowTry}"
          accept = "${o}"
          render-style="${this.renderStyle}" 
          schema-style = "${this.schemaStyle}" 
          schema-expand-level = "${this.schemaExpandLevel}"
          schema-description-expanded = "${this.schemaDescriptionExpanded}"
          allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}"
          schema-hide-read-only = "${this.schemaHideReadOnly}"
          fetch-credentials = "${this.fetchCredentials}"
          exportparts = "btn:btn, btn-fill:btn-fill, btn-outline:btn-outline, btn-try:btn-try, btn-clear:btn-clear, btn-clear-resp:btn-clear-resp,
            file-input:file-input, textbox:textbox, textbox-param:textbox-param, textarea:textarea, textarea-param:textarea-param, 
            anchor:anchor, anchor-param-example:anchor-param-example"
        > </api-request>

          ${e.callbacks?sR.call(this,e.callbacks):""}
      </div>  

      <api-response
        class = "${this.renderStyle}-mode"
        style = "width:100%;"
        .responses="${e.responses}"
        active-schema-tab = "${this.defaultSchemaTab}" 
        render-style="${this.renderStyle}" 
        schema-style="${this.schemaStyle}"
        schema-expand-level = "${this.schemaExpandLevel}"
        schema-description-expanded = "${this.schemaDescriptionExpanded}"
        allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}"
        schema-hide-write-only = "${this.schemaHideWriteOnly}"
        selected-status = "${Object.keys(e.responses||{})[0]||""}"
        exportparts = 
        "btn:btn, btn-fill:btn-fill, btn-outline:btn-outline, btn-try:btn-try, file-input:file-input, textbox:textbox, textbox-param:textbox-param, textarea:textarea, textarea-param:textarea-param, anchor:anchor, anchor-param-example:anchor-param-example, btn-clear-resp:btn-clear-resp"
      > </api-response>
    </div>
  </div>`}function rL(e=!0,t=!0,r=!1){return this.resolvedSpec?F`
    ${e?F`
        <div style="display:flex; justify-content:flex-end;"> 
          <span @click="${e=>XR(e,"expand-all")}" style="color:var(--primary-color); cursor:pointer;">
            Expand all
          </span> 
          &nbsp;|&nbsp; 
          <span @click="${e=>XR(e,"collapse-all")}" style="color:var(--primary-color); cursor:pointer;" >
            Collapse all
          </span> 
          &nbsp; sections
        </div>`:""}
    ${this.resolvedSpec.tags.map((e=>F`
      ${t?F` 
          <div class='regular-font section-gap section-tag ${e.expanded?"expanded":"collapsed"}'> 
            <div class='section-tag-header' @click="${()=>{e.expanded=!e.expanded,this.requestUpdate()}}">
              <div id='${e.elementId}' class="sub-title tag" style="color:var(--primary-color)">${e.name}</div>
            </div>
            <div class='section-tag-body'>
              <slot name="${e.elementId}"></slot>
              <div class="regular-font regular-font-size m-markdown" style="padding-bottom:12px">
                ${HP(qe(e.description||""))}
              </div>
              ${e.paths.filter((e=>!this.matchPaths||at(this.matchPaths,e,this.matchType))).map((e=>F`
                <section id='${e.elementId}' class='m-endpoint regular-font ${e.method} ${r||e.expanded?"expanded":"collapsed"}'>
                  ${eL.call(this,e,r)}      
                  ${r||e.expanded?tL.call(this,e):""}
                </section>`))}
            </div>
          </div>`:F`
          <div class='section-tag-body'>
          ${e.paths.filter((e=>!this.matchPaths||at(this.matchPaths,e,this.matchType))).map((e=>F`
            <section id='${e.elementId}' class='m-endpoint regular-font ${e.method} ${r||e.expanded?"expanded":"collapsed"}'>
              ${eL.call(this,e,r)}      
              ${r||e.expanded?tL.call(this,e):""}
            </section>`))}
          </div>
        `}
  `))}`:""}function nL(){return F`
  <header class="row header regular-font" part="section-header" style="padding:8px 4px 8px 4px;min-height:48px;">
    <div class="only-large-screen-flex" style="align-items: center;">
      <slot name="logo" class="logo" part="section-logo">
        ${e="height:36px;width:36px;margin-left:5px",F`
  <div style=${e}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="1 0 511 512">
      <path d="M351 411a202 202 0 01-350 0 203 203 0 01333-24 203 203 0 0117 24zm0 0" fill="#adc165"/>
      <path d="M334 387a202 202 0 01-216-69 202 202 0 01216 69zm78 32H85a8 8 0 01-8-8 8 8 0 018-8h327a8 8 0 017 8 8 8 0 01-7 8zm0 0" fill="#99aa52"/>
      <path d="M374 338l-5 30a202 202 0 01-248-248 203 203 0 01253 218zm0 0" fill="#ffc73b"/>
      <path d="M374 338a202 202 0 01-100-197 203 203 0 01100 197zm38 81l-6-2-231-231a8 8 0 0111-11l231 230a8 8 0 01-5 14zm0 0" fill="#efb025"/>
      <path d="M311 175c0 75 40 140 101 175a202 202 0 000-350 202 202 0 00-101 175zm0 0" fill="#ff903e"/>
      <path d="M412 419a8 8 0 01-8-8V85a8 8 0 0115 0v326a8 8 0 01-7 8zm0 0" fill="#e87425"/>
    </svg>
  </div>    
`}
        <!-- m-logo style="height:36px;width:36px;margin-left:5px"></m-logo -->
      </slot>  
      <div class="header-title" part="label-header-title">${this.headingText}</div>
    </div>  
    <div style="margin: 0px 8px;display:flex;flex:1">
      ${"false"===this.allowSpecUrlLoad?"":F`
          <input id="spec-url" 
            type="text" 
            style="font-size:var(--font-size-small)" 
            class="header-input mono-font"
            part="textbox textbox-spec-url" 
            placeholder="Spec URL" 
            value="${this.specUrl||""}" 
            @change="${this.onSepcUrlChange}" 
            spellcheck="false"
          >
          <div style="margin: 6px 5px 0 -24px; font-size:var(--font-size-regular); cursor:pointer;">&#x21a9;</div> 
        `} 
      ${"false"===this.allowSpecFileLoad?"":F`
          <input id="spec-file" 
            part = "file-input"
            type="file" 
            style="display:none" 
            value="${this.specFile||""}" 
            @change="${this.onSepcFileChange}" 
            spellcheck="false"
           >
          <button class="m-btn primary only-large-screen" style="margin-left:10px;" part="btn btn-fill" @click="${this.onFileLoadClick}"> LOCAL JSON FILE </button>
        `}
      <slot name="header"></slot>
      ${"false"===this.allowSearch||"read focused".includes(this.renderStyle)?"":F`  
          <input id="search" class="header-input" type="text" part="textbox textbox-header-filter" placeholder="Filter" @change="${this.onSearchChange}" style="max-width:130px;margin-left:10px;" spellcheck="false" >
          <div style="margin: 6px 5px 0 -24px; font-size:var(--font-size-regular); cursor:pointer;">&#x21a9;</div>
        `}
      
      ${"false"===this.allowAdvancedSearch||"read focused".includes(this.renderStyle)?"":F`
          <button class="m-btn primary only-large-screen" part="btn btn-fill btn-search" style="margin-left:10px;" @click="${this.onShowSearchModalClicked}">
            Search
          </button>
        `}
    </div>
    </header>`;var e}customElements.define("api-response",class extends ne{constructor(){super(),this.selectedStatus="",this.headersForEachRespStatus={},this.mimeResponsesForEachStatus={},this.activeSchemaTab="schema"}static get properties(){return{callback:{type:String},responses:{type:Object},parser:{type:Object},schemaStyle:{type:String,attribute:"schema-style"},renderStyle:{type:String,attribute:"render-style"},selectedStatus:{type:String,attribute:"selected-status"},selectedMimeType:{type:String,attribute:"selected-mime-type"},activeSchemaTab:{type:String,attribute:"active-schema-tab"},schemaExpandLevel:{type:Number,attribute:"schema-expand-level"},schemaDescriptionExpanded:{type:String,attribute:"schema-description-expanded"},allowSchemaDescriptionExpandToggle:{type:String,attribute:"allow-schema-description-expand-toggle"},schemaHideWriteOnly:{type:String,attribute:"schema-hide-write-only"}}}static get styles(){return[We,Ge,Ze,Ke,Ve,hR,l`
      .resp-head{
        vertical-align: middle;
        padding:16px 0 8px;
      }
      .resp-head.divider{
        border-top: 1px solid var(--border-color);
        margin-top:10px;
      }
      .resp-status{ 
        font-weight:bold;
        font-size:calc(var(--font-size-small) + 1px);
      }
      .resp-descr{
        font-size:calc(var(--font-size-small) + 1px);
        color:var(--light-fg);
        text-align:left;
      }
      .top-gap{margin-top:16px;}
      .example-panel{
        font-size:var(--font-size-small);
        margin:0;
      }
      .focused-mode,
      .read-mode {
        padding-top:24px;
        margin-top:12px;
        border-top: 1px dashed var(--border-color);
      }`,et]}render(){return F`
    <div class="col regular-font response-panel ${this.renderStyle}-mode">
      <div class=" ${"true"===this.callback?"tiny-title":"req-res-title"} "> 
        ${"true"===this.callback?"CALLBACK RESPONSE":"RESPONSE"}
      </div>
      <div>
        ${this.responseTemplate()}
      <div>  
    </div>  
    `}resetSelection(){this.selectedStatus="",this.selectedMimeType=""}responseTemplate(){if(!this.responses)return"";for(const n in this.responses){this.selectedStatus||(this.selectedStatus=n);const o={};for(const r in null===(e=this.responses[n])||void 0===e?void 0:e.content){var e,t;const a=this.responses[n].content[r];this.selectedMimeType||(this.selectedMimeType=r);const i=AR(a.schema,{}),s=ER(a.schema,r,a.examples,a.example,!0,!1,r.includes("json")?"json":"text");o[r]={description:this.responses[n].description,examples:s,selectedExample:(null===(t=s[0])||void 0===t?void 0:t.exampleId)||"",schemaTree:i}}const a=[];for(const e in null===(r=this.responses[n])||void 0===r?void 0:r.headers){var r;a.push({name:e,...this.responses[n].headers[e]})}this.headersForEachRespStatus[n]=a,this.mimeResponsesForEachStatus[n]=o}return F`
      ${Object.keys(this.responses).length>1?F`<div class='row' style='flex-wrap:wrap'>
          ${Object.keys(this.responses).map((e=>F`
            ${"$$ref"===e?"":F`
                <button 
                  @click="${()=>{this.selectedStatus=e,this.responses[e].content&&Object.keys(this.responses[e].content)[0]?this.selectedMimeType=Object.keys(this.responses[e].content)[0]:this.selectedMimeType=void 0}}"
                  class='m-btn small ${this.selectedStatus===e?"primary":""}'
                  part="btn ${this.selectedStatus===e?"btn-response-status btn-selected-response-status":" btn-response-status"}"
                  style='margin: 8px 4px 0 0'
                > 
                  ${e} 
                </button>`}`))}`:F`<span>${Object.keys(this.responses)[0]}</span>`}
      </div>

      ${Object.keys(this.responses).map((e=>{var t,r;return F`
        <div style = 'display: ${e===this.selectedStatus?"block":"none"}' >
          <div class="top-gap">
            <span class="resp-descr m-markdown ">${HP(qe((null===(t=this.responses[e])||void 0===t?void 0:t.description)||""))}</span>
            ${this.headersForEachRespStatus[e]&&(null===(r=this.headersForEachRespStatus[e])||void 0===r?void 0:r.length)>0?F`${this.responseHeaderListTemplate(this.headersForEachRespStatus[e])}`:""}
          </div>
          ${0===Object.keys(this.mimeResponsesForEachStatus[e]).length?"":F`  
              <div class="tab-panel col">
                <div class="tab-buttons row" @click="${e=>{"button"===e.target.tagName.toLowerCase()&&(this.activeSchemaTab=e.target.dataset.tab)}}" >
                  <button class="tab-btn ${"example"===this.activeSchemaTab?"active":""}" data-tab = 'example'>EXAMPLE </button>
                  <button class="tab-btn ${"example"!==this.activeSchemaTab?"active":""}" data-tab = 'schema' >SCHEMA</button>
                  <div style="flex:1"></div>
                  ${1===Object.keys(this.mimeResponsesForEachStatus[e]).length?F`<span class='small-font-size gray-text' style='align-self:center; margin-top:8px;'> ${Object.keys(this.mimeResponsesForEachStatus[e])[0]} </span>`:F`${this.mimeTypeDropdownTemplate(Object.keys(this.mimeResponsesForEachStatus[e]))}`}
                </div>
                ${"example"===this.activeSchemaTab?F`<div class ='tab-content col' style = 'flex:1;'>
                      ${this.mimeExampleTemplate(this.mimeResponsesForEachStatus[e][this.selectedMimeType])}
                    </div>`:F`<div class ='tab-content col' style = 'flex:1;'>
                      ${this.mimeSchemaTemplate(this.mimeResponsesForEachStatus[e][this.selectedMimeType])}
                    </div>`}
              </div>
            `}`}))}
    `}responseHeaderListTemplate(e){return F`
      <div style="padding:16px 0 8px 0" class="resp-headers small-font-size bold-text">RESPONSE HEADERS</div> 
      <table style="border-collapse: collapse; margin-bottom:16px; border:1px solid var(--border-color); border-radius: var(--border-radius)" class="small-font-size mono-font">
        ${e.map((e=>F`
          <tr>
            <td style="padding:8px; vertical-align: baseline; min-width:120px; border-top: 1px solid var(--light-border-color); text-overflow: ellipsis;">
              ${e.name||""}
            </td> 
            <td style="padding:4px; vertical-align: baseline; padding:0 5px; border-top: 1px solid var(--light-border-color); text-overflow: ellipsis;">
              ${e.schema.type||""}
            </td> 
            <td style="padding:8px; vertical-align: baseline; border-top: 1px solid var(--light-border-color);text-overflow: ellipsis;">
              <div class="m-markdown-small regular-font" >${HP(qe(e.description||""))}</div>
            </td>
            <td style="padding:8px; vertical-align: baseline; border-top: 1px solid var(--light-border-color); text-overflow: ellipsis;">
              ${e.schema.example||""}
            </td>
          </tr>
        `))}
    </table>`}mimeTypeDropdownTemplate(e){return F`
      <select @change="${e=>{this.selectedMimeType=e.target.value}}" style='margin-bottom: -1px; z-index:1'>
        ${e.map((e=>F`<option value='${e}' ?selected = '${e===this.selectedMimeType}'> ${e} </option>`))}
      </select>`}onSelectExample(e){[...e.target.closest(".example-panel").querySelectorAll(".example")].forEach((t=>{t.style.display=t.dataset.example===e.target.value?"block":"none"}))}mimeExampleTemplate(e){return e?F`
      ${1===e.examples.length?F`
          ${"json"===e.examples[0].exampleFormat?F`
              ${e.examples[0].exampleSummary&&e.examples[0].exampleSummary.length>80?F`<div style="padding: 4px 0"> ${e.examples[0].exampleSummary} </div>`:""}
              ${e.examples[0].exampleDescription?F`<div class="m-markdown-small" style="padding: 4px 0"> ${HP(qe(e.examples[0].exampleDescription||""))} </div>`:""}
              <json-tree 
                render-style = '${this.renderStyle}'
                .data="${e.examples[0].exampleValue}"
                class = 'example-panel ${"read"===this.renderStyle?"border pad-8-16":"border-top pad-top-8"}'
                exportparts = "btn:btn, btn-fill:btn-fill, btn-copy:btn-copy" 
              ></json-tree>`:F`
              ${e.examples[0].exampleSummary&&e.examples[0].exampleSummary.length>80?F`<div style="padding: 4px 0"> ${e.examples[0].exampleSummary} </div>`:""}
              ${e.examples[0].exampleDescription?F`<div class="m-markdown-small" style="padding: 4px 0"> ${HP(qe(e.examples[0].exampleDescription||""))} </div>`:""}
              <pre class = 'example-panel ${"read"===this.renderStyle?"border pad-8-16":"border-top pad-top-8"}'>${e.examples[0].exampleValue}</pre>
            `}`:F`
          <span class = 'example-panel ${"read"===this.renderStyle?"border pad-8-16":"border-top pad-top-8"}'>
            <select style="min-width:100px; max-width:100%" @change='${e=>this.onSelectExample(e)}'>
              ${e.examples.map((t=>F`<option value="${t.exampleId}" ?selected=${t.exampleId===e.selectedExample} > 
                ${t.exampleSummary.length>80?t.exampleId:t.exampleSummary} 
              </option>`))}
            </select>
            ${e.examples.map((t=>F`
              <div class="example" data-example = '${t.exampleId}' style = "display: ${t.exampleId===e.selectedExample?"block":"none"}">
                ${t.exampleSummary&&t.exampleSummary.length>80?F`<div style="padding: 4px 0"> ${t.exampleSummary} </div>`:""}
                ${t.exampleDescription?F`<div class="m-markdown-small"  style="padding: 4px 0"> ${HP(qe(t.exampleDescription||""))} </div>`:""}
                ${"json"===t.exampleFormat?F`
                    <json-tree 
                      render-style = '${this.renderStyle}'
                      .data = '${t.exampleValue}'
                      exportparts = "btn:btn, btn-fill:btn-fill, btn-copy:btn-copy" 
                    ></json-tree>`:F`<pre>${t.exampleValue}</pre>`}
              </div>  
            `))}
          </span>  
        `}
    `:F`
        <pre style='color:var(--red)' class = '${"read"===this.renderStyle?"read example-panel border pad-8-16":"example-panel border-top"}'> No example provided </pre>
      `}mimeSchemaTemplate(e){return e?F`
      ${"table"===this.schemaStyle?F`
          <schema-table
            render-style = "${this.renderStyle}"
            .data = "${e.schemaTree}"
            schema-expand-level = "${this.schemaExpandLevel}"
            schema-description-expanded = "${this.schemaDescriptionExpanded}"
            allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}",
            schema-hide-read-only = "false"
            schema-hide-write-only = "${this.schemaHideWriteOnly}"
          > </schema-tree> `:F`
          <schema-tree
            render-style = "${this.renderStyle}"
            .data = '${e.schemaTree}'
            schema-expand-level = "${this.schemaExpandLevel}"
            schema-description-expanded = "${this.schemaDescriptionExpanded}"
            allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}",
            schema-hide-read-only = "false"
            schema-hide-write-only = "${this.schemaHideWriteOnly}"
          > </schema-tree>`}`:F`
        <pre style='color:var(--red)' class = '${"read"===this.renderStyle?"border pad-8-16":"border-top"}'> Schema not found</pre>
      `}});const oL=l`
  *, *:before, *:after { box-sizing: border-box; }

  .dialog-box-overlay {
    background-color: var(--overlay-bg);
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: var(--dialog-z-index);
  }
  
  .dialog-box {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0%);
    display: flex;
    flex-direction: column;
    width: 70vw;
    background-color: var(--bg2);
    color: var(--fg2);
    border-radius: 4px;
    max-height: 500px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  
  .dialog-box-header {
    position: sticky;
    top: 0;
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0px 16px;
    min-height: 60px;
    max-height: 60px;
    border-bottom: 1px solid var(--light-border-color);
    overflow: hidden;
  }
  
  .dialog-box-header button {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: var(--fg);
    border: none;
    outline: none;
    background-color: transparent;
    cursor:pointer;
    border: 1px solid transparent;
    border-radius: 50%;
    margin-right: -8px;
  }
  .dialog-box-header button:hover {
    border-color: var(--primary-color);
  }

  .dialog-box-content {
    padding: 16px;
    display:block;
    overflow: auto;
    height: 100%;
  }

  .dialog-box-title {
    flex-grow: 1;
    font-size:24px;
  }
`;function aL(){var e;return document.addEventListener("close",(()=>{this.showAdvancedSearchDialog=!1})),document.addEventListener("open",this.onOpenSearchDialog),F`
    <dialog-box 
      heading="Search" 
      show="${!!this.showAdvancedSearchDialog}"
    >
      <span class="advanced-search-options">
        <input
          style="width:100%; padding-right:20px;"
          type="text"
          part="textbox textbox-search-dialog"
          placeholder="search text..."
          spellcheck="false"
          @keyup = "${e=>this.onAdvancedSearch(e,400)}"
        >
        <div style="display:flex; margin:8px 0 24px;">
          <div>
            <input style="cursor:pointer;" type="checkbox" part="checkbox checkbox-search-dialog" id="search-api-path" checked @change = "${e=>this.onAdvancedSearch(e,0)}">
            <label for="search-api-path" style="cursor:pointer;"> API Path </label>
            </div>
          <div style="margin-left: 16px;">
            <input style="cursor:pointer;" type="checkbox" part="checkbox checkbox-search-dialog" id="search-api-descr" checked @change = "${e=>this.onAdvancedSearch(e,0)}">
            <label style="cursor:pointer;" for="search-api-descr"> API Description </label>
          </div>
          <div style="margin-left: 16px;">
            <input style="cursor:pointer;" type="checkbox" part="checkbox checkbox-search-dialog" id="search-api-params" @change = "${e=>this.onAdvancedSearch(e,0)}">
            <label style="cursor:pointer;" for="search-api-params"> API Parameters </label>
          </div>
          <div style="margin-left: 16px;">
            <input style="cursor:pointer;" type="checkbox" part="checkbox checkbox-search-dialog" id="search-api-request-body" @change = "${e=>this.onAdvancedSearch(e,0)}">
            <label style="cursor:pointer;" for="search-api-request-body"> Request Body Parameters </label>
          </div>
          <div style="margin-left: 16px;">
            <input style="cursor:pointer;" type="checkbox" part="checkbox checkbox-search-dialog" id="search-api-resp-descr" @change = "${e=>this.onAdvancedSearch(e,0)}">
            <label style="cursor:pointer;" for="search-api-resp-descr"> Response Description </label>
          </div>
        </div>
      </span>
      
      ${null===(e=this.advancedSearchMatches)||void 0===e?void 0:e.map((e=>F`
      <div
        class="mono-font small-font-size hover-bg"
        style='padding: 5px; cursor: pointer; border-bottom: 1px solid var(--light-border-color); ${e.deprecated?"filter:opacity(0.5);":""}' 
        data-content-id='${e.elementId}'
        tabindex = '0'
        @click="${e=>{this.matchPaths="",this.showAdvancedSearchDialog=!1,this.requestUpdate(),this.scrollToEventTarget(e,!0)}}"
      > 
        <span class="upper bold-text method-fg ${e.method}">${e.method}</span> 
        <span>${e.path}</span>
        <span class="regular-font gray-text">${e.summary}</span>
      </div>
    `))}
    </dialog-box>
  `}customElements.define("dialog-box",class extends ne{static get properties(){return{heading:{type:String,attribute:"heading"},show:{type:String,attribute:"show"}}}static get styles(){return[oL]}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",(e=>{"Escape"===e.code&&this.onClose()}))}attributeChangedCallback(e,t,r){t!==r&&("heading"===e&&(this.heading=r),"show"===e&&(this.show=r,"true"===r&&document.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0,detail:this})))),super.attributeChangedCallback(e,t,r)}render(){return F`
    ${"true"===this.show?F`
        <div class="dialog-box-overlay">
          <div class="dialog-box">
            <header class="dialog-box-header">
              <span class="dialog-box-title">${this.heading}</span>
              <button type="button" @click="${this.onClose}">&times;</button>
            </header>
            <div class="dialog-box-content">
              <slot></slot>
            </div>
          </div>
        </div>`:""}`}onClose(){document.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}});const iL={color:{inputReverseFg:"#fff",inputReverseBg:"#333",headerBg:"#444",getRgb(e){if(0===e.indexOf("#")&&(e=e.slice(1,7)),3!==e.length&&4!==e.length||(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),6!==e.length)throw new Error("Invalid HEX color.");return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)}},luminanace(e){const t=this.getRgb(e);return.299*t.r+.587*t.g+.114*t.b},invert(e){return this.luminanace(e)>135?"#000":"#fff"},opacity(e,t){const r=this.getRgb(e);return`rgba(${r.r}, ${r.g}, ${r.b}, ${t})`},brightness(e,t){const r=this.getRgb(e);return r.r+=t,r.g+=t,r.b+=t,r.r>255?r.r=255:r.r<0&&(r.r=0),r.g>255?r.g=255:r.g<0&&(r.g=0),r.b>255?r.b=255:r.b<0&&(r.b=0),`#${r.r.toString(16).padStart(2,"0")}${r.g.toString(16).padStart(2,"0")}${r.b.toString(16).padStart(2,"0")}`},hasGoodContrast(e,t){return this.luminanace(e)-this.luminanace(t)}}};function sL(e){return/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/i.test(e)}function lL(e,t={}){let r={};const n=t.primaryColor?t.primaryColor:"dark"===e?"#f76b39":"#ff591e",o=iL.color.invert(n),a=iL.color.opacity(n,"0.8");if("dark"===e){const e=t.bg1?t.bg1:"#333",i=t.fg1?t.fg1:"#bbb",s=t.bg2?t.bg2:iL.color.brightness(e,5),l=t.bg3?t.bg3:iL.color.brightness(e,17),c=t.bg3?t.bg3:iL.color.brightness(e,35),p=t.fg2?t.fg2:iL.color.brightness(i,-15),u=t.fg3?t.fg3:iL.color.brightness(i,-20),d=t.fg3?t.fg3:iL.color.brightness(i,-65),h=t.inlineCodeFg?t.inlineCodeFg:"#aaa",f="#bbb",m="#eee",y=t.headerColor?t.headerColor:iL.color.brightness(e,10),g=t.navBgColor?t.navBgColor:iL.color.brightness(e,10);r={bg1:e,bg2:s,bg3:l,lightBg:c,fg1:i,fg2:p,fg3:u,lightFg:d,inlineCodeFg:h,primaryColor:n,primaryColorTrans:a,primaryColorInvert:o,selectionBg:f,selectionFg:m,overlayBg:"rgba(80, 80, 80, 0.4)",navBgColor:g,navTextColor:t.navTextColor?t.navTextColor:iL.color.opacity(iL.color.invert(g),"0.65"),navHoverBgColor:t.navHoverBgColor?t.navHoverBgColor:iL.color.brightness(g,-15),navHoverTextColor:t.navHoverTextColor?t.navHoverTextColor:iL.color.invert(g),navAccentColor:t.navAccentColor?t.navAccentColor:iL.color.brightness(n,25),headerColor:y,headerColorInvert:iL.color.invert(y),headerColorDarker:iL.color.brightness(y,-20),headerColorBorder:iL.color.brightness(y,10),borderColor:t.borderColor||iL.color.brightness(e,20),lightBorderColor:t.lightBorderColor||iL.color.brightness(e,15),codeBorderColor:t.codeBorderColor||iL.color.brightness(e,30),inputBg:t.inputBg||iL.color.brightness(e,-5),placeHolder:t.placeHolder||iL.color.opacity(i,"0.3"),hoverColor:t.hoverColor||iL.color.brightness(e,-10),red:t.red?t.red:"#F06560",lightRed:t.lightRed?t.lightRed:iL.color.brightness(e,-10),pink:t.pink?t.pink:"#ffb2b2",lightPink:t.lightPink||iL.color.brightness(e,-10),green:t.green||"#7ec699",lightGreen:t.lightGreen||iL.color.brightness(e,-10),blue:t.blue||"#71b7ff",lightBlue:t.lightBlue||iL.color.brightness(e,-10),orange:t.orange?t.orange:"#f08d49",lightOrange:t.lightOrange||iL.color.brightness(e,-10),yellow:t.yellow||"#827717",lightYellow:t.lightYellow||iL.color.brightness(e,-10),purple:t.purple||"#786FF1",brown:t.brown||"#D4AC0D",codeBg:t.codeBg||iL.color.opacity(iL.color.brightness(e,-15),.7),codeFg:t.codeFg||"#aaa",codePropertyColor:t.codePropertyColor||"#f8c555",codeKeywordColor:t.codeKeywordColor||"#cc99cd",codeOperatorColor:t.codeOperatorColor||"#67cdcc"}}else{const e=t.bg1?t.bg1:"#ffffff",i=t.fg1?t.fg1:"#444444",s=t.bg2?t.bg2:iL.color.brightness(e,-5),l=t.bg3?t.bg3:iL.color.brightness(e,-15),c=t.bg3?t.bg3:iL.color.brightness(e,-45),p=t.fg2?t.fg2:iL.color.brightness(i,17),u=t.fg3?t.fg3:iL.color.brightness(i,30),d=t.fg3?t.fg3:iL.color.brightness(i,70),h=t.inlineCodeFg?t.inlineCodeFg:"brown",f="#444",m="#eee",y=t.headerColor?t.headerColor:iL.color.brightness(e,-180),g=t.navBgColor?t.navBgColor:iL.color.brightness(e,-180);r={bg1:e,bg2:s,bg3:l,lightBg:c,fg1:i,fg2:p,fg3:u,lightFg:d,inlineCodeFg:h,primaryColor:n,primaryColorTrans:a,primaryColorInvert:o,selectionBg:f,selectionFg:m,overlayBg:"rgba(0, 0, 0, 0.4)",navBgColor:g,navTextColor:t.navTextColor?t.navTextColor:iL.color.opacity(iL.color.invert(g),"0.65"),navHoverBgColor:t.navHoverBgColor?t.navHoverBgColor:iL.color.brightness(g,-15),navHoverTextColor:t.navHoverTextColor?t.navHoverTextColor:iL.color.invert(g),navAccentColor:t.navAccentColor?t.navAccentColor:iL.color.brightness(n,25),headerColor:y,headerColorInvert:iL.color.invert(y),headerColorDarker:iL.color.brightness(y,-20),headerColorBorder:iL.color.brightness(y,10),borderColor:t.borderColor||iL.color.brightness(e,-38),lightBorderColor:t.lightBorderColor||iL.color.brightness(e,-23),codeBorderColor:t.codeBorderColor||"transparent",inputBg:t.inputBg||iL.color.brightness(e,10),placeHolder:t.placeHolder||iL.color.brightness(d,20),hoverColor:t.hoverColor||iL.color.brightness(e,-5),red:t.red||"#F06560",lightRed:t.lightRed||"#fff0f0",pink:t.pink?t.pink:"#990055",lightPink:t.lightPink?t.lightPink:"#ffb2b2",green:t.green||"#690",lightGreen:t.lightGreen||"#fbfff0",blue:t.blue||"#47AFE8",lightBlue:t.lightBlue||"#eff8fd",orange:t.orange||"#FF9900",lightOrange:t.lightOrange||"#fff5e6",yellow:t.yellow||"#827717",lightYellow:t.lightYellow||"#fff5cc",purple:t.purple||"#786FF1",brown:t.brown||"#D4AC0D",codeBg:t.codeBg||iL.color.opacity(iL.color.brightness(e,-15),.7),codeFg:t.codeFg||"#666",codePropertyColor:t.codePropertyColor||"#905",codeKeywordColor:t.codeKeywordColor||"#07a",codeOperatorColor:t.codeOperatorColor||"#9a6e3a"}}return F`
  <style>
  *, *:before, *:after { box-sizing: border-box; }
  
  :host {
    /* Common Styles - irrespective of themes */  
    --border-radius: 2px;
    --layout: ${this.layout||"row"};
    --font-mono: ${this.monoFont||'Monaco, "Andale Mono", "Roboto Mono", Consolas, monospace'};
    --font-regular: ${this.regularFont||'"Open Sans", Avenir, "Segoe UI", Arial, sans-serif'};
    --scroll-bar-width: 8px;
    --nav-item-padding: ${"relaxed"===this.navItemSpacing?"10px 16px 10px 10px":"compact"===this.navItemSpacing?"5px 16px 5px 10px":"7px 16px 7px 10px"};
    
    --resp-area-height: ${this.responseAreaHeight};
    --font-size-small:  ${"default"===this.fontSize?"12px":"large"===this.fontSize?"13px":"14px"};
    --font-size-mono:   ${"default"===this.fontSize?"13px":"large"===this.fontSize?"14px":"15px"};
    --font-size-regular: ${"default"===this.fontSize?"14px":"large"===this.fontSize?"15px":"16px"};
    --dialog-z-index: 1000;

    /* Theme specific styles */  
    --bg:${r.bg1};
    --bg2:${r.bg2};
    --bg3:${r.bg3};
    --light-bg:${r.lightBg};
    --fg:${r.fg1};
    --fg2:${r.fg2};
    --fg3:${r.fg3};
    --light-fg:${r.lightFg};
    --selection-bg:${r.selectionBg};
    --selection-fg:${r.selectionFg};
    --overlay-bg:${r.overlayBg};
    
    /* Border Colors */
    --border-color:${r.borderColor};
    --light-border-color:${r.lightBorderColor};
    --code-border-color:${r.codeBorderColor};

    --input-bg:${r.inputBg};
    --placeholder-color:${r.placeHolder};
    --hover-color:${r.hoverColor};
    --red:${r.red};
    --light-red:${r.lightRed};
    --pink:${r.pink};
    --light-pink:${r.lightPink};
    --green:${r.green};
    --light-green:${r.lightGreen};
    --blue:${r.blue};
    --light-blue:${r.lightBlue};
    --orange:${r.orange};
    --light-orange:${r.lightOrange};
    --yellow:${r.yellow};
    --light-yellow:${r.lightYellow};
    --purple:${r.purple};
    --brown:${r.brown};

    /* Header Color */
    --header-bg:${r.headerColor};
    --header-fg:${r.headerColorInvert};
    --header-color-darker:${r.headerColorDarker};
    --header-color-border:${r.headerColorBorder};

    /* Nav Colors */  
    --nav-bg-color:${r.navBgColor};
    --nav-text-color:${r.navTextColor};
    --nav-hover-bg-color:${r.navHoverBgColor};
    --nav-hover-text-color:${r.navHoverTextColor};
    --nav-accent-color:${r.navAccentColor};

    /* Primary Colors */  
    --primary-color:${r.primaryColor};
    --primary-color-invert:${r.primaryColorInvert};
    --primary-color-trans:${r.primaryColorTrans};

    /*Code Syntax Color*/
    --code-bg:${r.codeBg};
    --code-fg:${r.codeFg};
    --inline-code-fg:${r.inlineCodeFg};
    --code-property-color:${r.codePropertyColor};
    --code-keyword-color:${r.codeKeywordColor};
    --code-operator-color:${r.codeOperatorColor};
  }
  </style>`}function cL(e=!1,t=!0,r=!0,n=!1){if(!this.resolvedSpec)return"";"true"===this.persistAuth&&YP.call(this);const o={bg1:sL(this.bgColor)?this.bgColor:"",fg1:sL(this.textColor)?this.textColor:"",headerColor:sL(this.headerColor)?this.headerColor:"",primaryColor:sL(this.primaryColor)?this.primaryColor:"",navBgColor:sL(this.navBgColor)?this.navBgColor:"",navTextColor:sL(this.navTextColor)?this.navTextColor:"",navHoverBgColor:sL(this.navHoverBgColor)?this.navHoverBgColor:"",navHoverTextColor:sL(this.navHoverTextColor)?this.navHoverTextColor:"",navAccentColor:sL(this.navAccentColor)?this.navAccentColor:""};return this.resolvedSpec.specLoadError?e?F`
        ${"dark"===this.theme?lL.call(this,"dark",o):lL.call(this,"light",o)}
        <div style="display:flex; align-items:center; border:1px dashed var(--border-color); height:42px; padding:5px; font-size:var(--font-size-small); color:var(--red); font-family:var(--font-mono)"> ${this.resolvedSpec.info.description} </div>
      `:F`
      ${"dark"===this.theme?lL.call(this,"dark",o):lL.call(this,"light",o)}
      <!-- Header -->
      ${nL.call(this)}
      <main class="main-content regular-font" part="section-main-content">
        <slot></slot>
        <div style="margin:24px; text-align: center;">
          <h1 style="color: var(--red)"> ${this.resolvedSpec.info.title} </h1>
          <div style="font-family:var(--font-mono)"> ${this.resolvedSpec.info.description} </div>
        </div>
      </main>  
    `:this.resolvedSpec.isSpecLoading?F`
      ${"dark"===this.theme?lL.call(this,"dark",o):lL.call(this,"light",o)}
      <main class="main-content regular-font" part="section-main-content">
        <slot></slot>
        <div class="main-content-inner--${this.renderStyle}-mode">
          <div class="loader"></div>
        </div>
      </main>  
    `:F`
    ${"dark"===this.theme?lL.call(this,"dark",o):lL.call(this,"light",o)}

    <!-- Header -->
    ${"false"===this.showHeader?"":nL.call(this)}
    
    <!-- Advanced Search -->
    ${"false"===this.allowAdvancedSearch?"":aL.call(this)}

    <div id='the-main-body' class="body" dir= ${this.pageDirection}>
      <!-- Side Nav -->
      ${"read"!==this.renderStyle&&"focused"!==this.renderStyle||"true"!==this.showSideNav||!this.resolvedSpec?"":WR.call(this)}

      <!-- Main Content -->
      <main class="main-content regular-font" part="section-main-content">
        <slot></slot>
        <div class="main-content-inner--${this.renderStyle}-mode">
          ${!0===this.loading?F`<div class="loader"></div>`:F`
              ${!0===this.loadFailed?F`<div style="text-align: center;margin: 16px;"> Unable to load the Spec</div>`:F`
                  <div class="operations-root" @click="${e=>{this.handleHref(e)}}">
                  ${"focused"===this.renderStyle?F`${YR.call(this)}`:F`
                      ${"true"===this.showInfo?FR.call(this):""}
                      ${"true"===this.allowServerSelection?UR.call(this):""}
                      ${"true"===this.allowAuthentication?oR.call(this):""}
                      <div id="operations-top" class="observe-me">
                        <slot name="operations-top"></slot>
                      </div>  
                      ${"read"===this.renderStyle?IR.call(this):rL.call(this,t,r,n)}
                    `}
                  </div>
                `}`}
        </div>
        <slot name="footer"></slot>
      </main>
    </div>  
  `}class pL extends ne{constructor(){super();const e={root:this.getRootNode().host,rootMargin:"-50px 0px -50px 0px",threshold:0};this.showSummaryWhenCollapsed=!0,this.isIntersectionObserverActive=!0,this.intersectionObserver=new IntersectionObserver((e=>{this.onIntersect(e)}),e)}static get properties(){return{headingText:{type:String,attribute:"heading-text"},gotoPath:{type:String,attribute:"goto-path"},updateRoute:{type:String,attribute:"update-route"},routePrefix:{type:String,attribute:"route-prefix"},specUrl:{type:String,attribute:"spec-url"},sortTags:{type:String,attribute:"sort-tags"},generateMissingTags:{type:String,attribute:"generate-missing-tags"},sortEndpointsBy:{type:String,attribute:"sort-endpoints-by"},specFile:{type:String,attribute:!1},layout:{type:String},renderStyle:{type:String,attribute:"render-style"},defaultSchemaTab:{type:String,attribute:"default-schema-tab"},responseAreaHeight:{type:String,attribute:"response-area-height"},fillRequestFieldsWithExample:{type:String,attribute:"fill-request-fields-with-example"},persistAuth:{type:String,attribute:"persist-auth"},onNavTagClick:{type:String,attribute:"on-nav-tag-click"},schemaStyle:{type:String,attribute:"schema-style"},schemaExpandLevel:{type:Number,attribute:"schema-expand-level"},schemaDescriptionExpanded:{type:String,attribute:"schema-description-expanded"},schemaHideReadOnly:{type:String,attribute:"schema-hide-read-only"},schemaHideWriteOnly:{type:String,attribute:"schema-hide-write-only"},apiKeyName:{type:String,attribute:"api-key-name"},apiKeyLocation:{type:String,attribute:"api-key-location"},apiKeyValue:{type:String,attribute:"api-key-value"},defaultApiServerUrl:{type:String,attribute:"default-api-server"},serverUrl:{type:String,attribute:"server-url"},oauthReceiver:{type:String,attribute:"oauth-receiver"},showHeader:{type:String,attribute:"show-header"},showSideNav:{type:String,attribute:"show-side-nav"},showInfo:{type:String,attribute:"show-info"},allowAuthentication:{type:String,attribute:"allow-authentication"},allowTry:{type:String,attribute:"allow-try"},allowSpecUrlLoad:{type:String,attribute:"allow-spec-url-load"},allowSpecFileLoad:{type:String,attribute:"allow-spec-file-load"},allowSpecFileDownload:{type:String,attribute:"allow-spec-file-download"},allowSearch:{type:String,attribute:"allow-search"},allowAdvancedSearch:{type:String,attribute:"allow-advanced-search"},allowServerSelection:{type:String,attribute:"allow-server-selection"},allowSchemaDescriptionExpandToggle:{type:String,attribute:"allow-schema-description-expand-toggle"},showComponents:{type:String,attribute:"show-components"},pageDirection:{type:String,attribute:"page-direction"},theme:{type:String},bgColor:{type:String,attribute:"bg-color"},textColor:{type:String,attribute:"text-color"},headerColor:{type:String,attribute:"header-color"},primaryColor:{type:String,attribute:"primary-color"},fontSize:{type:String,attribute:"font-size"},regularFont:{type:String,attribute:"regular-font"},monoFont:{type:String,attribute:"mono-font"},loadFonts:{type:String,attribute:"load-fonts"},navBgColor:{type:String,attribute:"nav-bg-color"},navTextColor:{type:String,attribute:"nav-text-color"},navHoverBgColor:{type:String,attribute:"nav-hover-bg-color"},navHoverTextColor:{type:String,attribute:"nav-hover-text-color"},navAccentColor:{type:String,attribute:"nav-accent-color"},navItemSpacing:{type:String,attribute:"nav-item-spacing"},usePathInNavBar:{type:String,attribute:"use-path-in-nav-bar"},infoDescriptionHeadingsInNavBar:{type:String,attribute:"info-description-headings-in-navbar"},fetchCredentials:{type:String,attribute:"fetch-credentials"},matchPaths:{type:String,attribute:"match-paths"},matchType:{type:String,attribute:"match-type"},loading:{type:Boolean},focusedElementId:{type:String},showAdvancedSearchDialog:{type:Boolean},advancedSearchMatches:{type:Object}}}static get styles(){return[We,Ve,Ge,Ke,Je,Ye,Ze,Qe,Xe,l`
      :host {
        display:flex;
        flex-direction: column;
        min-width:360px;
        width:100%;
        height:100%;
        margin:0;
        padding:0;
        overflow: hidden;
        letter-spacing:normal;
        color:var(--fg);
        background-color:var(--bg);
        font-family:var(--font-regular);
      }
      .body {
        display:flex;
        height:100%;
        width:100%;
        overflow:hidden;
      }

      .main-content { 
        margin:0;
        padding: 0; 
        display:block;
        flex:1;
        height:100%;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin;
        scrollbar-color: var(--border-color) transparent;
      }

      .main-content-inner--view-mode {
        padding: 0 8px;
      }
      .main-content::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      .main-content::-webkit-scrollbar-track {
        background:transparent;
      }
      .main-content::-webkit-scrollbar-thumb {
        background-color: var(--border-color);
      }

      .section-gap.section-tag {
        border-bottom:1px solid var(--border-color);
      }
      .section-gap,
      .section-gap--focused-mode,
      .section-gap--read-mode { 
        padding: 0px 4px; 
      }
      .section-tag-header {
        position:relative;
        cursor: n-resize;
        padding: 12px 0;
      }
      .collapsed .section-tag-header:hover{
        cursor: s-resize;
      }

      .section-tag-header:hover{
        background-image: linear-gradient(to right, rgba(0,0,0,0), var(--border-color), rgba(0,0,0,0));
      }

      .section-tag-header:hover::after {
        position:absolute;
        margin-left:-24px;
        font-size:20px;
        top: calc(50% - 14px);
        color:var(--primary-color);
        content: '⬆'; 
      }

      .collapsed .section-tag-header::after {
        position:absolute;
        margin-left:-24px;
        font-size:20px;
        top: calc(50% - 14px);
        color: var(--border-color);
        content: '⬇'; 
      }
      .collapsed .section-tag-header:hover::after {
        color:var(--primary-color);
      }

      .collapsed .section-tag-body {
        display:none;
      }

      .logo {
        height:36px;
        width:36px;
        margin-left:5px; 
      }
      .only-large-screen-flex,
      .only-large-screen{
        display:none;
      }
      .tag.title {
        text-transform: uppercase;
      }
      .header {
        background-color:var(--header-bg);
        color:var(--header-fg);
        width:100%;
      }
      .header-title {
        font-size:calc(var(--font-size-regular) + 8px); 
        padding:0 8px;
      }
      input.header-input{
        background:var(--header-color-darker);
        color:var(--header-fg);
        border:1px solid var(--header-color-border);
        flex:1; 
        padding-right:24px;
        border-radius:3px;
      }
      input.header-input::placeholder {
        opacity:0.4;
      }
      .loader {
        margin: 16px auto 16px auto; 
        border: 4px solid var(--bg3);
        border-radius: 50%;
        border-top: 4px solid var(--primary-color);
        width: 36px;
        height: 36px;
        animation: spin 2s linear infinite;
      }
      .expanded-endpoint-body{ 
        position: relative;
        padding: 6px 0px; 
      }
      .expanded-endpoint-body.deprecated{ filter:opacity(0.6); }
      .divider { 
        border-top: 2px solid var(--border-color);
        margin: 24px 0;
        width:100%;
      }

      .tooltip {
        cursor:pointer;
        border: 1px solid var(--border-color);
        border-left-width: 4px;
        margin-left:2px;
      }
      .tooltip a {
        color: var(--fg2);
        text-decoration: none;
      }
      .tooltip-text {
        color: var(--fg2);
        max-width: 400px;
        position: absolute;
        z-index:1;
        background-color: var(--bg2);
        visibility: hidden;

        overflow-wrap: break-word;
      }
      .tooltip:hover {
        color: var(--primary-color);
        border-color: var(--primary-color);
      }
      .tooltip:hover a:hover {
        color: var(--primary-color);
      }

      .tooltip:hover .tooltip-text {
        visibility: visible;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @media only screen and (min-width: 768px) {
        .nav-bar {
          width: 260px;
          display:flex;
        }
        .only-large-screen{
          display:block;
        }
        .only-large-screen-flex{
          display:flex;
        }
        .section-gap { 
          padding: 0 0 0 24px; 
        }
        .section-gap--focused-mode {
          padding: 24px 8px; 
        }
        .section-gap--read-mode { 
          padding: 24px 8px; 
        }
        .endpoint-body {
          position: relative;
          padding:36px 0 48px 0;
        }
      }

      @media only screen and (min-width: 1024px) {
        .nav-bar {
          width: ${s("default"===this.fontSize?"300px":"large"===this.fontSize?"315px":"330px")};
          display:flex;
        }
        .section-gap--focused-mode { 
          padding: 12px 80px 12px 80px; 
        }
        .section-gap--read-mode { 
          padding: 24px 80px 12px 80px; 
        }
      }`,et]}connectedCallback(){super.connectedCallback();const e=this.parentElement;if(e&&(0===e.offsetWidth&&""===e.style.width&&(e.style.width="100vw"),0===e.offsetHeight&&""===e.style.height&&(e.style.height="100vh"),"BODY"===e.tagName&&(e.style.marginTop||(e.style.marginTop="0"),e.style.marginRight||(e.style.marginRight="0"),e.style.marginBottom||(e.style.marginBottom="0"),e.style.marginLeft||(e.style.marginLeft="0"))),"false"!==this.loadFonts){const e={family:"Open Sans",style:"normal",weight:"300",unicodeRange:"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"},t=new FontFace("Open Sans","url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8OUuhpKKSTjw.woff2) format('woff2')",e);e.weight="600";const r=new FontFace("Open Sans","url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOUuhpKKSTjw.woff2) format('woff2')",e);t.load().then((e=>{document.fonts.add(e)})),r.load().then((e=>{document.fonts.add(e)}))}this.layout&&"row, column,".includes(`${this.layout},`)||(this.layout="row"),this.renderStyle&&"read, view, focused,".includes(`${this.renderStyle},`)||(this.renderStyle="read"),this.schemaStyle&&"tree, table,".includes(`${this.schemaStyle},`)||(this.schemaStyle="tree"),this.theme&&"light, dark,".includes(`${this.theme},`)||(this.theme=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"),this.defaultSchemaTab&&"example, schema, model,".includes(`${this.defaultSchemaTab},`)?"model"===this.defaultSchemaTab&&(this.defaultSchemaTab="schema"):this.defaultSchemaTab="example",(!this.schemaExpandLevel||this.schemaExpandLevel<1)&&(this.schemaExpandLevel=99999),this.schemaDescriptionExpanded&&"true, false,".includes(`${this.schemaDescriptionExpanded},`)||(this.schemaDescriptionExpanded="false");const t=["post","put","patch"];this.schemaHideReadOnly?"never"!==this.schemaHideReadOnly&&(this.schemaHideReadOnly=t.filter((e=>this.schemaHideReadOnly.includes(e))),0===this.schemaHideReadOnly.length&&(this.schemaHideReadOnly=t)):this.schemaHideReadOnly=t,this.schemaHideReadOnly+=["get","head","delete","options"],this.schemaHideWriteOnly="never"!==this.schemaHideWriteOnly,this.fillRequestFieldsWithExample&&"true, false,".includes(`${this.fillRequestFieldsWithExample},`)||(this.fillRequestFieldsWithExample="true"),this.persistAuth&&"true, false,".includes(`${this.persistAuth},`)||(this.persistAuth="false"),this.onNavTagClick&&"expand-collapse, show-description,".includes(`${this.onNavTagClick},`)||(this.onNavTagClick="expand-collapse"),this.responseAreaHeight||(this.responseAreaHeight="300px"),this.allowSearch&&"true, false,".includes(`${this.allowSearch},`)||(this.allowSearch="true"),this.allowAdvancedSearch&&"true, false,".includes(`${this.allowAdvancedSearch},`)||(this.allowAdvancedSearch="true"),this.allowTry&&"true, false,".includes(`${this.allowTry},`)||(this.allowTry="true"),this.apiKeyValue||(this.apiKeyValue="-"),this.apiKeyLocation||(this.apiKeyLocation="header"),this.apiKeyName||(this.apiKeyName=""),this.oauthReceiver||(this.oauthReceiver="oauth-receiver.html"),this.updateRoute&&"true, false,".includes(`${this.updateRoute},`)||(this.updateRoute="true"),this.routePrefix||(this.routePrefix="#"),this.sortTags&&"true, false,".includes(`${this.sortTags},`)||(this.sortTags="false"),this.generateMissingTags&&"true, false,".includes(`${this.generateMissingTags},`)||(this.generateMissingTags="false"),this.sortEndpointsBy&&"method, path, summary, none,".includes(`${this.sortEndpointsBy},`)||(this.sortEndpointsBy="path"),this.navItemSpacing&&"compact, relaxed, default,".includes(`${this.navItemSpacing},`)||(this.navItemSpacing="default"),this.usePathInNavBar&&"true, false,".includes(`${this.usePathInNavBar},`)||(this.usePathInNavBar="false"),this.fontSize&&"default, large, largest,".includes(`${this.fontSize},`)||(this.fontSize="default"),this.showInfo&&"true, false,".includes(`${this.showInfo},`)||(this.showInfo="true"),this.allowServerSelection&&"true, false,".includes(`${this.allowServerSelection},`)||(this.allowServerSelection="true"),this.allowAuthentication&&"true, false,".includes(`${this.allowAuthentication},`)||(this.allowAuthentication="true"),this.allowSchemaDescriptionExpandToggle&&"true, false,".includes(`${this.allowSchemaDescriptionExpandToggle},`)||(this.allowSchemaDescriptionExpandToggle="true"),this.showSideNav&&"true false".includes(this.showSideNav)||(this.showSideNav="true"),this.showComponents&&"true false".includes(this.showComponents)||(this.showComponents="false"),this.infoDescriptionHeadingsInNavBar&&"true, false,".includes(`${this.infoDescriptionHeadingsInNavBar},`)||(this.infoDescriptionHeadingsInNavBar="false"),this.fetchCredentials&&"omit, same-origin, include,".includes(`${this.fetchCredentials},`)||(this.fetchCredentials=""),this.matchType&&"includes regex".includes(this.matchType)||(this.matchType="includes"),this.showAdvancedSearchDialog||(this.showAdvancedSearchDialog=!1),qe.setOptions({highlight:(e,t)=>He().languages[t]?He().highlight(e,He().languages[t],t):e}),window.addEventListener("hashchange",(()=>{const e=new RegExp(`^${this.routePrefix}`,"i"),t=window.location.hash.replace(e,"");this.scrollTo(t)}),!0)}disconnectedCallback(){this.intersectionObserver&&this.intersectionObserver.disconnect(),super.disconnectedCallback()}infoDescriptionHeadingRenderer(){const e=new qe.Renderer;return e.heading=(e,t,r,n)=>`<h${t} class="observe-me" id="${n.slug(r)}">${e}</h${t}>`,e}render(){return cL.call(this)}observeExpandedContent(){this.shadowRoot.querySelectorAll(".observe-me").forEach((e=>{this.intersectionObserver.observe(e)}))}attributeChangedCallback(e,t,r){if("spec-url"===e&&t!==r&&window.setTimeout((async()=>{await this.loadSpec(r),this.gotoPath&&!window.location.hash&&this.scrollTo(this.gotoPath)}),0),"render-style"===e&&("read"===r?window.setTimeout((()=>{this.observeExpandedContent()}),100):this.intersectionObserver.disconnect()),"api-key-name"===e||"api-key-location"===e||"api-key-value"===e){let t=!1,n="",o="",a="";if("api-key-name"===e?this.getAttribute("api-key-location")&&this.getAttribute("api-key-value")&&(n=r,o=this.getAttribute("api-key-location"),a=this.getAttribute("api-key-value"),t=!0):"api-key-location"===e?this.getAttribute("api-key-name")&&this.getAttribute("api-key-value")&&(o=r,n=this.getAttribute("api-key-name"),a=this.getAttribute("api-key-value"),t=!0):"api-key-value"===e&&this.getAttribute("api-key-name")&&this.getAttribute("api-key-location")&&(a=r,o=this.getAttribute("api-key-location"),n=this.getAttribute("api-key-name"),t=!0),t&&this.resolvedSpec){const e=this.resolvedSpec.securitySchemes.find((e=>e.securitySchemeId===rt));e?(e.name=n,e.in=o,e.value=a,e.finalKeyValue=a):this.resolvedSpec.securitySchemes.push({securitySchemeId:rt,description:"api-key provided in rapidoc element attributes",type:"apiKey",name:n,in:o,value:a,finalKeyValue:a}),this.requestUpdate()}}super.attributeChangedCallback(e,t,r)}onSepcUrlChange(){this.setAttribute("spec-url",this.shadowRoot.getElementById("spec-url").value)}onSepcFileChange(e){this.setAttribute("spec-file",this.shadowRoot.getElementById("spec-file").value);const t=e.target.files[0],r=new FileReader;r.onload=()=>{try{const e=JSON.parse(r.result);this.loadSpec(e),this.shadowRoot.getElementById("spec-url").value=""}catch(e){console.error("RapiDoc: Unable to read or parse json")}},r.readAsText(t)}onFileLoadClick(){this.shadowRoot.getElementById("spec-file").click()}onSearchChange(e){this.matchPaths=e.target.value,this.resolvedSpec.tags.forEach((e=>e.paths.filter((t=>{this.matchPaths&&at(this.matchPaths,t,this.matchType)&&(e.expanded=!0)})))),this.resolvedSpec.components.forEach((e=>e.subComponents.filter((e=>{e.expanded=!1,this.matchPaths&&!function(e,t){return t.name.toLowerCase().includes(e.toLowerCase())}(this.matchPaths,e)||(e.expanded=!0)})))),this.requestUpdate()}onClearSearch(){this.shadowRoot.getElementById("nav-bar-search").value="",this.matchPaths="",this.resolvedSpec.components.forEach((e=>e.subComponents.filter((e=>{e.expanded=!0}))))}onShowSearchModalClicked(){this.showAdvancedSearchDialog=!0}async onOpenSearchDialog(e){const t=e.detail.querySelector("input");await nt(0),t&&t.focus()}async loadSpec(e){if(e){this.matchPaths="";try{this.resolvedSpec={specLoadError:!1,isSpecLoading:!0,tags:[]},this.loading=!0,this.loadFailed=!1;const t=await LP.call(this,e,"true"===this.generateMissingTags,"true"===this.sortTags,this.getAttribute("sort-endpoints-by"),this.getAttribute("api-key-name"),this.getAttribute("api-key-location"),this.getAttribute("api-key-value"),this.getAttribute("server-url"));this.loading=!1,this.afterSpecParsedAndValidated(t)}catch(e){this.loading=!1,this.loadFailed=!0,this.resolvedSpec=null,console.error(`RapiDoc: Unable to resolve the API spec..  ${e.message}`)}}}async afterSpecParsedAndValidated(e){var t;for(this.resolvedSpec=e,this.selectedServer=void 0,this.defaultApiServerUrl&&(this.defaultApiServerUrl===this.serverUrl?this.selectedServer={url:this.serverUrl,computedUrl:this.serverUrl}:this.resolvedSpec.servers&&(this.selectedServer=this.resolvedSpec.servers.find((e=>e.url===this.defaultApiServerUrl)))),this.selectedServer||this.resolvedSpec.servers&&(this.selectedServer=this.resolvedSpec.servers[0]),this.requestUpdate();!await this.updateComplete;);const r=new CustomEvent("spec-loaded",{detail:e});this.dispatchEvent(r),this.intersectionObserver.disconnect(),"read"===this.renderStyle&&(await nt(100),this.observeExpandedContent());if(null===(t=window.location.hash)||void 0===t?void 0:t.substring(1)){const e=new RegExp(`^${this.routePrefix}`,"i"),t=window.location.hash.replace(e,"");"view"===this.renderStyle?this.expandAndGotoOperation(t,!0,!0):this.scrollTo(t)}else if("focused"===this.renderStyle){var n;const e=this.showInfo?"overview":null===(n=this.resolvedSpec.tags[0])||void 0===n?void 0:n.paths[0];this.scrollTo(e)}}expandAndGotoOperation(e,t=!0){if(!this.resolvedSpec)return;let r=!0;const n=-1===e.indexOf("#")?e:e.substring(1);if(n.startsWith("overview")||"servers"===n||"auth"===n)r=!1;else for(let t=0;t<(null===(o=this.resolvedSpec.tags)||void 0===o?void 0:o.length);t++){var o,a;const n=this.resolvedSpec.tags[t],i=null===(a=n.paths)||void 0===a?void 0:a.find((t=>t.elementId===e));i&&(i.expanded&&n.expanded?r=!1:(i.expanded=!0,n.expanded=!0))}t&&(r&&this.requestUpdate(),window.setTimeout((()=>{const e=this.shadowRoot.getElementById(n);e&&(e.scrollIntoView({behavior:"auto",block:"start"}),"true"===this.updateRoute&&window.history.replaceState(null,null,`${this.routePrefix||"#"}${n}`))}),r?150:0))}isValidTopId(e){return e.startsWith("overview")||"servers"===e||"auth"===e}isValidPathId(e){var t,r,n,o;return!("overview"!==e||!this.showInfo)||(!("servers"!==e||!this.allowServerSelection)||(!("auth"!==e||!this.allowAuthentication)||(e.startsWith("tag--")?null===(n=this.resolvedSpec)||void 0===n||null===(o=n.tags)||void 0===o?void 0:o.find((t=>t.elementId===e)):null===(t=this.resolvedSpec)||void 0===t||null===(r=t.tags)||void 0===r?void 0:r.find((t=>t.paths.find((t=>t.elementId===e)))))))}onIntersect(e){!1!==this.isIntersectionObserverActive&&e.forEach((e=>{if(e.isIntersecting&&e.intersectionRatio>0){const t=this.shadowRoot.querySelector(".nav-bar-tag.active, .nav-bar-path.active, .nav-bar-info.active, .nav-bar-h1.active, .nav-bar-h2.active, .operations.active"),r=this.shadowRoot.getElementById(`link-${e.target.id}`);r&&("true"===this.updateRoute&&window.history.replaceState(null,null,`${window.location.href.split("#")[0]}${this.routePrefix||"#"}${e.target.id}`),r.scrollIntoView({behavior:"auto",block:"center"}),r.classList.add("active")),t&&t.classList.remove("active")}}))}handleHref(e){if("a"===e.target.tagName.toLowerCase()&&e.target.getAttribute("href").startsWith("#")){const t=this.shadowRoot.getElementById(e.target.getAttribute("href").replace("#",""));t&&t.scrollIntoView({behavior:"auto",block:"start"})}}async scrollToEventTarget(e,t=!0){const r=e.currentTarget;r.dataset.contentId&&(this.isIntersectionObserverActive=!1,this.scrollTo(r.dataset.contentId,!0,t),setTimeout((()=>{this.isIntersectionObserverActive=!0}),300))}async scrollTo(e,t=!0,r=!0){if("focused"===this.renderStyle&&(this.focusedElementId=e,await nt(0)),"view"===this.renderStyle)this.expandAndGotoOperation(e,t,!0);else{let t=!1;const n=this.shadowRoot.getElementById(e);if(n?(t=!0,n.scrollIntoView({behavior:"auto",block:"start"})):t=!1,t){if("focused"===this.renderStyle){const e=this.shadowRoot.querySelector("api-request");e&&e.resetRequestBodySelection();const t=this.shadowRoot.querySelector("api-response");t&&t.resetSelection()}"true"===this.updateRoute&&window.history.replaceState(null,null,`${this.routePrefix||"#"}${e}`);const t=this.shadowRoot.getElementById(`link-${e}`);if(t){r&&t.scrollIntoView({behavior:"auto",block:"center"}),await nt(0);const e=this.shadowRoot.querySelector(".nav-bar-tag.active, .nav-bar-path.active, .nav-bar-info.active, .nav-bar-h1.active, .nav-bar-h2.active, .operations.active");e&&e.classList.remove("active"),t.classList.add("active")}}}}setHttpUserNameAndPassword(e,t,r){return VP.call(this,e,t,r)}setApiKey(e,t){return VP.call(this,e,"","",t)}removeAllSecurityKeys(){return GP.call(this)}setApiServer(e){return BR.call(this,e)}onAdvancedSearch(e,t){const r=e.target;clearTimeout(this.timeoutId),this.timeoutId=setTimeout((()=>{let e;e="text"===r.type?r:r.closest(".advanced-search-options").querySelector("input[type=text]");const t=[...r.closest(".advanced-search-options").querySelectorAll("input:checked")].map((e=>e.id));this.advancedSearchMatches=function(e,t,r=[]){if(!e.trim()||0===r.length)return;const n=[];return t.forEach((t=>{t.paths.forEach((t=>{let o="";var a;if(r.includes("search-api-path")&&(o=t.path),r.includes("search-api-descr")&&(o=`${o} ${t.summary||t.description||""}`),r.includes("search-api-params")&&(o=`${o} ${(null===(a=t.parameters)||void 0===a?void 0:a.map((e=>e.name)).join(" "))||""}`),r.includes("search-api-request-body")&&t.requestBody){let e=new Set;for(const r in null===(i=t.requestBody)||void 0===i?void 0:i.content){var i,s,l;null!==(s=t.requestBody.content[r].schema)&&void 0!==s&&s.properties&&(e=it(null===(l=t.requestBody.content[r].schema)||void 0===l?void 0:l.properties)),o=`${o} ${[...e].join(" ")}`}}r.includes("search-api-resp-descr")&&(o=`${o} ${Object.values(t.responses).map((e=>e.description||"")).join(" ")}`),o.toLowerCase().includes(e.trim().toLowerCase())&&n.push({elementId:t.elementId,method:t.method,path:t.path,summary:t.summary||t.description||"",deprecated:t.deprecated})}))})),n}(e.value,this.resolvedSpec.tags,t)}),t)}}customElements.define("rapi-doc",pL);customElements.define("rapi-doc-mini",class extends ne{constructor(){super(),this.isMini=!0,this.updateRoute="false",this.renderStyle="view",this.showHeader="false",this.allowAdvancedSearch="false"}static get properties(){return{specUrl:{type:String,attribute:"spec-url"},sortEndpointsBy:{type:String,attribute:"sort-endpoints-by"},layout:{type:String},pathsExpanded:{type:String,attribute:"paths-expanded"},defaultSchemaTab:{type:String,attribute:"default-schema-tab"},responseAreaHeight:{type:String,attribute:"response-area-height"},showSummaryWhenCollapsed:{type:String,attribute:"show-summary-when-collapsed"},fillRequestFieldsWithExample:{type:String,attribute:"fill-request-fields-with-example"},persistAuth:{type:String,attribute:"persist-auth"},schemaStyle:{type:String,attribute:"schema-style"},schemaExpandLevel:{type:Number,attribute:"schema-expand-level"},schemaDescriptionExpanded:{type:String,attribute:"schema-description-expanded"},apiKeyName:{type:String,attribute:"api-key-name"},apiKeyLocation:{type:String,attribute:"api-key-location"},apiKeyValue:{type:String,attribute:"api-key-value"},defaultApiServerUrl:{type:String,attribute:"default-api-server"},serverUrl:{type:String,attribute:"server-url"},oauthReceiver:{type:String,attribute:"oauth-receiver"},allowTry:{type:String,attribute:"allow-try"},theme:{type:String},bgColor:{type:String,attribute:"bg-color"},textColor:{type:String,attribute:"text-color"},primaryColor:{type:String,attribute:"primary-color"},fontSize:{type:String,attribute:"font-size"},regularFont:{type:String,attribute:"regular-font"},monoFont:{type:String,attribute:"mono-font"},loadFonts:{type:String,attribute:"load-fonts"},fetchCredentials:{type:String,attribute:"fetch-credentials"},matchPaths:{type:String,attribute:"match-paths"},matchType:{type:String,attribute:"match-type"},loading:{type:Boolean}}}static get styles(){return[We,Ve,Ge,Ke,Je,Ye,Ze,Qe,Xe,l`
      :host {
        display:flex;
        flex-direction: column;
        min-width:360px;
        width:100%;
        height:100%;
        margin:0;
        padding:0;
        overflow: hidden;
        letter-spacing:normal;
        color:var(--fg);
        background-color:var(--bg);
        font-family:var(--font-regular);
      }

      @media only screen and (min-width: 768px) {
        .only-large-screen{
          display:block;
        }
        .only-large-screen-flex{
          display:flex;
        }
      }`]}connectedCallback(){if(super.connectedCallback(),"false"!==this.loadFonts){const e={family:"Open Sans",style:"normal",weight:"300",unicodeRange:"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"},t=new FontFace("Open Sans","url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8OUuhpKKSTjw.woff2) format('woff2')",e);e.weight="600";const r=new FontFace("Open Sans","url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOUuhpKKSTjw.woff2) format('woff2')",e);t.load().then((e=>{document.fonts.add(e)})),r.load().then((e=>{document.fonts.add(e)}))}this.showSummaryWhenCollapsed&&"true, false,".includes(`${this.showSummaryWhenCollapsed},`)||(this.showSummaryWhenCollapsed="true"),this.layout&&"row, column,".includes(`${this.layout},`)||(this.layout="row"),this.schemaStyle&&"tree, table,".includes(`${this.schemaStyle},`)||(this.schemaStyle="tree"),this.theme&&"light, dark,".includes(`${this.theme},`)||(this.theme=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"),this.defaultSchemaTab&&"example, schema, model,".includes(`${this.defaultSchemaTab},`)?"model"===this.defaultSchemaTab&&(this.defaultSchemaTab="schema"):this.defaultSchemaTab="example",this.pathsExpanded="true"===this.pathsExpanded,(!this.schemaExpandLevel||this.schemaExpandLevel<1)&&(this.schemaExpandLevel=99999),this.schemaDescriptionExpanded&&"true, false,".includes(`${this.schemaDescriptionExpanded},`)||(this.schemaDescriptionExpanded="false"),this.fillRequestFieldsWithExample&&"true, false,".includes(`${this.fillRequestFieldsWithExample},`)||(this.fillRequestFieldsWithExample="true"),this.persistAuth&&"true, false,".includes(`${this.persistAuth},`)||(this.persistAuth="false"),this.responseAreaHeight||(this.responseAreaHeight="300px"),this.allowTry&&"true, false,".includes(`${this.allowTry},`)||(this.allowTry="true"),this.apiKeyValue||(this.apiKeyValue="-"),this.apiKeyLocation||(this.apiKeyLocation="header"),this.apiKeyName||(this.apiKeyName=""),this.oauthReceiver||(this.oauthReceiver="oauth-receiver.html"),this.sortTags&&"true, false,".includes(`${this.sortTags},`)||(this.sortTags="false"),this.sortEndpointsBy&&"method, path, summary,".includes(`${this.sortEndpointsBy},`)||(this.sortEndpointsBy="path"),this.fontSize&&"default, large, largest,".includes(`${this.fontSize},`)||(this.fontSize="default"),this.matchType&&"includes regex".includes(this.matchType)||(this.matchType="includes"),this.allowSchemaDescriptionExpandToggle&&"true, false,".includes(`${this.allowSchemaDescriptionExpandToggle},`)||(this.allowSchemaDescriptionExpandToggle="true"),this.fetchCredentials&&"omit, same-origin, include,".includes(`${this.fetchCredentials},`)||(this.fetchCredentials=""),qe.setOptions({highlight:(e,t)=>He().languages[t]?He().highlight(e,He().languages[t],t):e})}render(){return cL.call(this,!0,!1,!1,this.pathsExpanded)}attributeChangedCallback(e,t,r){if("spec-url"===e&&t!==r&&window.setTimeout((async()=>{await this.loadSpec(r)}),0),"api-key-name"===e||"api-key-location"===e||"api-key-value"===e){let t=!1,n="",o="",a="";if("api-key-name"===e?this.getAttribute("api-key-location")&&this.getAttribute("api-key-value")&&(n=r,o=this.getAttribute("api-key-location"),a=this.getAttribute("api-key-value"),t=!0):"api-key-location"===e?this.getAttribute("api-key-name")&&this.getAttribute("api-key-value")&&(o=r,n=this.getAttribute("api-key-name"),a=this.getAttribute("api-key-value"),t=!0):"api-key-value"===e&&this.getAttribute("api-key-name")&&this.getAttribute("api-key-location")&&(a=r,o=this.getAttribute("api-key-location"),n=this.getAttribute("api-key-name"),t=!0),t&&this.resolvedSpec){const e=this.resolvedSpec.securitySchemes.find((e=>e.securitySchemeId===rt));e?(e.name=n,e.in=o,e.value=a,e.finalKeyValue=a):this.resolvedSpec.securitySchemes.push({apiKeyId:rt,description:"api-key provided in rapidoc element attributes",type:"apiKey",name:n,in:o,value:a,finalKeyValue:a}),this.requestUpdate()}}super.attributeChangedCallback(e,t,r)}onSepcUrlChange(){this.setAttribute("spec-url",this.shadowRoot.getElementById("spec-url").value)}async loadSpec(e){if(e)try{this.resolvedSpec={specLoadError:!1,isSpecLoading:!0,tags:[]},this.loading=!0,this.loadFailed=!1,this.requestUpdate();const t=await LP.call(this,e,"true"===this.generateMissingTags,"true"===this.sortTags,this.getAttribute("sort-endpoints-by"),this.getAttribute("api-key-name"),this.getAttribute("api-key-location"),this.getAttribute("api-key-value"),this.getAttribute("server-url"));this.loading=!1,this.afterSpecParsedAndValidated(t)}catch(e){this.loading=!1,this.loadFailed=!0,this.resolvedSpec=null,console.error(`RapiDoc: Unable to resolve the API spec..  ${e.message}`)}}async afterSpecParsedAndValidated(e){for(this.resolvedSpec=e,this.selectedServer=void 0,this.defaultApiServerUrl&&(this.defaultApiServerUrl===this.serverUrl?this.selectedServer={url:this.serverUrl,computedUrl:this.serverUrl}:this.resolvedSpec.servers&&(this.selectedServer=this.resolvedSpec.servers.find((e=>e.url===this.defaultApiServerUrl)))),this.selectedServer||this.resolvedSpec.servers&&(this.selectedServer=this.resolvedSpec.servers[0]),this.requestUpdate();!await this.updateComplete;);const t=new CustomEvent("spec-loaded",{detail:e});this.dispatchEvent(t)}handleHref(e){if("a"===e.target.tagName.toLowerCase()&&e.target.getAttribute("href").startsWith("#")){const t=this.shadowRoot.getElementById(e.target.getAttribute("href").replace("#",""));t&&t.scrollIntoView({behavior:"auto",block:"start"})}}});class uL extends HTMLElement{connectedCallback(){this.receiveAuthParms(),window.addEventListener("storage",(e=>this.receiveStorage(e)),!0)}receiveAuthParms(){let e={};if(document.location.search){const t=new URLSearchParams(document.location.search);e={code:t.get("code"),error:t.get("error"),state:t.get("state"),responseType:"code"}}else if(window.location.hash){e={token_type:this.parseQueryString(window.location.hash.substring(1),"token_type"),access_token:this.parseQueryString(window.location.hash.substring(1),"access_token"),responseType:"token"}}window.opener?window.opener.postMessage(e,this.target):sessionStorage.setItem("rapidoc-oauth-data",JSON.stringify(e))}relayAuthParams(e){if(window.parent&&"rapidoc-oauth-data"===e.key){const t=JSON.parse(e.newValue);window.parent.postMessage(t,this.target)}}parseQueryString(e,t){const r=e.split("&");for(let e=0;e<r.length;e++){const n=r[e].split("=");if(decodeURIComponent(n[0])===t)return decodeURIComponent(n[1])}}}function dL(){return F`
  <nav class='nav-bar' part="section-navbar">
    <slot name="nav-logo" class="logo"></slot>
    <div style="display:flex;line-height:22px; padding:8px">
      <input id="nav-bar-search" 
        part = "textbox textbox-nav-filter"
        style = "width:100%; height: 26px; padding-right:20px; color:var(--nav-hover-text-color); border-color:var(--nav-accent-color); background-color:var(--nav-hover-bg-color)" 
        type = "text"
        placeholder = "Filter" 
        @change = "${this.onSearchChange}"  
        spellcheck = "false" 
      >
      <div style="margin: 6px 5px 0 -24px; font-size:var(--font-size-regular); cursor:pointer;">&#x21a9;</div>
    </div>
    <nav style="flex:1" class='nav-scroll' part="section-navbar-scroll">
      ${this.resolvedSpec.schemaAndExamples.map((e=>F`
        <div class='nav-bar-path' data-content-id='${e.elementId}' id='link-${e.elementId}'
          @click = '${e=>{this.scrollToEventTarget(e,!1)}}'
        > 
          ${e.name}
        </div>`))}
    </nav>  
  </nav>
  `}function hL(){return F`
    ${"true"===this.showInfo?FR.call(this):""}
    <div style="font-size:var(--font-size-regular);">
    ${this.resolvedSpec.schemaAndExamples.map((e=>{var t;const r=ER(e.schema,"json",e.examples,e.example,!0,!1,"json",!0);return e.selectedExample=null===(t=r[0])||void 0===t?void 0:t.exampleId,F`
        <section id='${e.elementId}' class='json-schema-and-example regular-font' style="display:flex; flex-direction: column; border:1px solid var(--border-color); margin-bottom:32px; border-top: 5px solid var(--border-color)">
          <div style="padding:16px; border-bottom: 1px solid var(--border-color)">
            <div style="font-size:var(--font-size-small); font-weight:bold">${e.name}</div>
            <span class="json-schema-description m-markdown ">${HP(qe(e.description||""))}</span>
          </div>  
          <div style="display:flex; flex-direction: row; gap:16px;">
            <div class="json-schema-def" style="flex:1; padding:16px 0 16px 16px; ">
              <schema-tree
                .data = "${AR(e.schema,{})}"
                schema-expand-level = "${this.schemaExpandLevel}"
                schema-description-expanded = "${this.schemaDescriptionExpanded}"
                allow-schema-description-expand-toggle = "${this.allowSchemaDescriptionExpandToggle}",
                schema-hide-read-only = "false"
                schema-hide-write-only = "false"
              > </schema-tree>
            </div>
            <div class="json-schema-example-panel" style="width:400px; background-color: var(--input-bg); padding:16px 0 16px 16px; border-left: 1px dashed var(--border-color);">
              ${r.length>1?F`<select style="min-width:100px; max-width:100%" @change='${t=>this.onSelectExample(t,e)}'>
                    ${r.map((t=>F`
                      <option value="${t.exampleId}" ?selected=${t.exampleId===e.selectedExample}> 
                        ${t.exampleSummary.length>80?t.exampleId:t.exampleSummary}
                      </option>`))}
                  </select>`:F`<div style="font-size: var(--font-size-small);font-weight:700; margin:5px 0"> ${r[0].exampleSummary}</div>`}
              ${r.map((t=>F`
                <json-tree 
                  .data = "${t.exampleValue}"
                  data-example = "${t.exampleId}"
                  class = "example"
                  style = "margin-top:16px; display: ${t.exampleId===e.selectedExample?"flex":"none"}"
                ></json-tree>`))}
            </div>
          </div>
        </section>`}))}
    </div>
  `}function fL(e=!1){if(!this.resolvedSpec)return"";const t={bg1:sL(this.bgColor)?this.bgColor:"",fg1:sL(this.textColor)?this.textColor:"",headerColor:sL(this.headerColor)?this.headerColor:"",primaryColor:sL(this.primaryColor)?this.primaryColor:"",navBgColor:sL(this.navBgColor)?this.navBgColor:"",navTextColor:sL(this.navTextColor)?this.navTextColor:"",navHoverBgColor:sL(this.navHoverBgColor)?this.navHoverBgColor:"",navHoverTextColor:sL(this.navHoverTextColor)?this.navHoverTextColor:"",navAccentColor:sL(this.navAccentColor)?this.navAccentColor:""};return this.resolvedSpec.specLoadError?e?F`
        ${"dark"===this.theme?lL.call(this,"dark",t):lL.call(this,"light",t)}
        <div style="display:flex; align-items:center; border:1px dashed var(--border-color); height:42px; padding:5px; font-size:var(--font-size-small); color:var(--red); font-family:var(--font-mono)"> ${this.resolvedSpec.info.description} </div>
      `:F`
      ${"dark"===this.theme?lL.call(this,"dark",t):lL.call(this,"light",t)}
      <!-- Header -->
      ${nL.call(this)}
      <h1> Header </h1>
      <main class="main-content regular-font" part="section-main-content">
        <slot></slot>
        <div style="margin:24px; text-align: center;">
          <h1 style="color: var(--red)"> ${this.resolvedSpec.info.title} </h1>
          <div style="font-family:var(--font-mono)"> ${this.resolvedSpec.info.description} </div>
        </div>
      </main>  
    `:this.resolvedSpec.isSpecLoading?F`
      ${"dark"===this.theme?lL.call(this,"dark",t):lL.call(this,"light",t)}
      <main class="main-content regular-font" part="section-main-content">
        <slot></slot>
        <div class="main-content-inner--${this.renderStyle}-mode">
          <div class="loader"></div>
        </div>
      </main>  
    `:F`
    ${"dark"===this.theme?lL.call(this,"dark",t):lL.call(this,"light",t)}

    <!-- Header -->
    ${"false"===this.showHeader?"":nL.call(this)}
    
    <div id='the-main-body' class="body" dir= ${this.pageDirection}>

      <!-- Side Nav -->
      ${dL.call(this)}

      <!-- Main Content -->
      <main class="main-content regular-font" part="section-main-content">
        <slot></slot>
        <div class="main-content-inner--${this.renderStyle}-mode">
          ${!0===this.loading?F`<div class="loader"></div>`:F`
              ${!0===this.loadFailed?F`<div style="text-align: center;margin: 16px;"> Unable to load the Spec</div>`:F`
                  <div class="operations-root" @click="${e=>{this.handleHref(e)}}">
                    ${hL.call(this)}
                  </div>
                `}`}
        </div>
        <slot name="footer"></slot>
      </main>
    </div>  
  `}customElements.define("oauth-receiver",uL);customElements.define("json-schema-viewer",class extends ne{constructor(){super(),this.isMini=!1,this.updateRoute="false",this.renderStyle="focused",this.showHeader="true",this.allowAdvancedSearch="false",this.selectedExampleForEachSchema={}}static get properties(){return{specUrl:{type:String,attribute:"spec-url"},schemaStyle:{type:String,attribute:"schema-style"},schemaExpandLevel:{type:Number,attribute:"schema-expand-level"},schemaDescriptionExpanded:{type:String,attribute:"schema-description-expanded"},allowSchemaDescriptionExpandToggle:{type:String,attribute:"allow-schema-description-expand-toggle"},showHeader:{type:String,attribute:"show-header"},showSideNav:{type:String,attribute:"show-side-nav"},showInfo:{type:String,attribute:"show-info"},allowSpecUrlLoad:{type:String,attribute:"allow-spec-url-load"},allowSpecFileLoad:{type:String,attribute:"allow-spec-file-load"},allowSpecFileDownload:{type:String,attribute:"allow-spec-file-download"},allowSearch:{type:String,attribute:"allow-search"},theme:{type:String},bgColor:{type:String,attribute:"bg-color"},textColor:{type:String,attribute:"text-color"},primaryColor:{type:String,attribute:"primary-color"},fontSize:{type:String,attribute:"font-size"},regularFont:{type:String,attribute:"regular-font"},monoFont:{type:String,attribute:"mono-font"},loadFonts:{type:String,attribute:"load-fonts"},loading:{type:Boolean}}}static get styles(){return[We,Ve,Ge,Ke,Je,Ye,Ze,Qe,Xe,l`
      :host {
        display:flex;
        flex-direction: column;
        min-width:360px;
        width:100%;
        height:100%;
        margin:0;
        padding:0;
        overflow: hidden;
        letter-spacing:normal;
        color:var(--fg);
        background-color:var(--bg);
        font-family:var(--font-regular);
      }
      .body {
        display:flex;
        height:100%;
        width:100%;
        overflow:hidden;
      }
      .nav-bar {
        width: 230px;
        display:flex;
      }

      .main-content { 
        margin:0;
        padding: 16px; 
        display:block;
        flex:1;
        height:100%;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin;
        scrollbar-color: var(--border-color) transparent;
      }
      .main-content-inner--view-mode {
        padding: 0 8px;
      }
      .main-content::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      .main-content::-webkit-scrollbar-track {
        background:transparent;
      }
      .main-content::-webkit-scrollbar-thumb {
        background-color: var(--border-color);
      }
      .header {
        background-color:var(--header-bg);
        color:var(--header-fg);
        width:100%;
      }
      .header-title {
        font-size:calc(var(--font-size-regular) + 8px); 
        padding:0 8px;
      }
      input.header-input{
        background:var(--header-color-darker);
        color:var(--header-fg);
        border:1px solid var(--header-color-border);
        flex:1; 
        padding-right:24px;
        border-radius:3px;
      }
      input.header-input::placeholder {
        opacity:0.4;
      }
      .loader {
        margin: 16px auto 16px auto; 
        border: 4px solid var(--bg3);
        border-radius: 50%;
        border-top: 4px solid var(--primary-color);
        width: 36px;
        height: 36px;
        animation: spin 2s linear infinite;
      }
      @media only screen and (min-width: 768px) {
        .only-large-screen{
          display:block;
        }
        .only-large-screen-flex{
          display:flex;
        }
      }`]}connectedCallback(){super.connectedCallback();const e=this.parentElement;if(e&&(0===e.offsetWidth&&""===e.style.width&&(e.style.width="100vw"),0===e.offsetHeight&&""===e.style.height&&(e.style.height="100vh"),"BODY"===e.tagName&&(e.style.marginTop||(e.style.marginTop="0"),e.style.marginRight||(e.style.marginRight="0"),e.style.marginBottom||(e.style.marginBottom="0"),e.style.marginLeft||(e.style.marginLeft="0"))),"false"!==this.loadFonts){const e={family:"Open Sans",style:"normal",weight:"300",unicodeRange:"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"},t=new FontFace("Open Sans","url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8OUuhpKKSTjw.woff2) format('woff2')",e);e.weight="600";const r=new FontFace("Open Sans","url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOUuhpKKSTjw.woff2) format('woff2')",e);t.load().then((e=>{document.fonts.add(e)})),r.load().then((e=>{document.fonts.add(e)}))}this.renderStyle="focused",this.pathsExpanded="true"===this.pathsExpanded,this.showInfo&&"true, false,".includes(`${this.showInfo},`)||(this.showInfo="true"),this.showSideNav&&"true false".includes(this.showSideNav)||(this.showSideNav="true"),this.showHeader&&"true, false,".includes(`${this.showHeader},`)||(this.showHeader="true"),this.schemaStyle&&"tree, table,".includes(`${this.schemaStyle},`)||(this.schemaStyle="tree"),this.theme&&"light, dark,".includes(`${this.theme},`)||(this.theme=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"),this.allowSearch&&"true, false,".includes(`${this.allowSearch},`)||(this.allowSearch="true"),(!this.schemaExpandLevel||this.schemaExpandLevel<1)&&(this.schemaExpandLevel=99999),this.schemaDescriptionExpanded&&"true, false,".includes(`${this.schemaDescriptionExpanded},`)||(this.schemaDescriptionExpanded="false"),this.responseAreaHeight||(this.responseAreaHeight="300px"),this.fontSize&&"default, large, largest,".includes(`${this.fontSize},`)||(this.fontSize="default"),this.matchType&&"includes regex".includes(this.matchType)||(this.matchType="includes"),this.allowSchemaDescriptionExpandToggle&&"true, false,".includes(`${this.allowSchemaDescriptionExpandToggle},`)||(this.allowSchemaDescriptionExpandToggle="true"),qe.setOptions({highlight:(e,t)=>He().languages[t]?He().highlight(e,He().languages[t],t):e})}render(){return fL.call(this,!0,!1,!1,this.pathsExpanded)}attributeChangedCallback(e,t,r){"spec-url"===e&&t!==r&&window.setTimeout((async()=>{await this.loadSpec(r)}),0),super.attributeChangedCallback(e,t,r)}onSepcUrlChange(){this.setAttribute("spec-url",this.shadowRoot.getElementById("spec-url").value)}onSearchChange(e){this.matchPaths=e.target.value}async loadSpec(e){if(e)try{this.resolvedSpec={specLoadError:!1,isSpecLoading:!0,tags:[]},this.loading=!0,this.loadFailed=!1,this.requestUpdate();const t=await LP.call(this,e,"true"===this.generateMissingTags,"true"===this.sortTags,this.getAttribute("sort-endpoints-by"));this.loading=!1,this.afterSpecParsedAndValidated(t)}catch(e){this.loading=!1,this.loadFailed=!0,this.resolvedSpec=null,console.error(`RapiDoc: Unable to resolve the API spec..  ${e.message}`)}}async afterSpecParsedAndValidated(e){this.resolvedSpec=e;const t=new CustomEvent("spec-loaded",{detail:e});this.dispatchEvent(t)}handleHref(e){if("a"===e.target.tagName.toLowerCase()&&e.target.getAttribute("href").startsWith("#")){const t=this.shadowRoot.getElementById(e.target.getAttribute("href").replace("#",""));t&&t.scrollIntoView({behavior:"auto",block:"start"})}}onSelectExample(e){[...e.target.closest(".json-schema-example-panel").querySelectorAll(".example")].forEach((t=>{t.style.display=t.dataset.example===e.target.value?"flex":"none"}))}async scrollToEventTarget(e){const t=e.currentTarget;if(!t.dataset.contentId)return;const r=this.shadowRoot.getElementById(t.dataset.contentId);r&&r.scrollIntoView({behavior:"auto",block:"start"})}})},742:(e,t)=>{"use strict";t.byteLength=function(e){var t=l(e),r=t[0],n=t[1];return 3*(r+n)/4-n},t.toByteArray=function(e){var t,r,a=l(e),i=a[0],s=a[1],c=new o(function(e,t,r){return 3*(t+r)/4-r}(0,i,s)),p=0,u=s>0?i-4:i;for(r=0;r<u;r+=4)t=n[e.charCodeAt(r)]<<18|n[e.charCodeAt(r+1)]<<12|n[e.charCodeAt(r+2)]<<6|n[e.charCodeAt(r+3)],c[p++]=t>>16&255,c[p++]=t>>8&255,c[p++]=255&t;2===s&&(t=n[e.charCodeAt(r)]<<2|n[e.charCodeAt(r+1)]>>4,c[p++]=255&t);1===s&&(t=n[e.charCodeAt(r)]<<10|n[e.charCodeAt(r+1)]<<4|n[e.charCodeAt(r+2)]>>2,c[p++]=t>>8&255,c[p++]=255&t);return c},t.fromByteArray=function(e){for(var t,n=e.length,o=n%3,a=[],i=16383,s=0,l=n-o;s<l;s+=i)a.push(c(e,s,s+i>l?l:s+i));1===o?(t=e[n-1],a.push(r[t>>2]+r[t<<4&63]+"==")):2===o&&(t=(e[n-2]<<8)+e[n-1],a.push(r[t>>10]+r[t>>4&63]+r[t<<2&63]+"="));return a.join("")};for(var r=[],n=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,s=a.length;i<s;++i)r[i]=a[i],n[a.charCodeAt(i)]=i;function l(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");return-1===r&&(r=t),[r,r===t?0:4-r%4]}function c(e,t,n){for(var o,a,i=[],s=t;s<n;s+=3)o=(e[s]<<16&16711680)+(e[s+1]<<8&65280)+(255&e[s+2]),i.push(r[(a=o)>>18&63]+r[a>>12&63]+r[a>>6&63]+r[63&a]);return i.join("")}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63},764:(e,t,r)=>{"use strict";const n=r(742),o=r(645),a="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;t.Buffer=l,t.SlowBuffer=function(e){+e!=e&&(e=0);return l.alloc(+e)},t.INSPECT_MAX_BYTES=50;const i=2147483647;function s(e){if(e>i)throw new RangeError('The value "'+e+'" is invalid for option "size"');const t=new Uint8Array(e);return Object.setPrototypeOf(t,l.prototype),t}function l(e,t,r){if("number"==typeof e){if("string"==typeof t)throw new TypeError('The "string" argument must be of type string. Received type number');return u(e)}return c(e,t,r)}function c(e,t,r){if("string"==typeof e)return function(e,t){"string"==typeof t&&""!==t||(t="utf8");if(!l.isEncoding(t))throw new TypeError("Unknown encoding: "+t);const r=0|m(e,t);let n=s(r);const o=n.write(e,t);o!==r&&(n=n.slice(0,o));return n}(e,t);if(ArrayBuffer.isView(e))return function(e){if(J(e,Uint8Array)){const t=new Uint8Array(e);return h(t.buffer,t.byteOffset,t.byteLength)}return d(e)}(e);if(null==e)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(J(e,ArrayBuffer)||e&&J(e.buffer,ArrayBuffer))return h(e,t,r);if("undefined"!=typeof SharedArrayBuffer&&(J(e,SharedArrayBuffer)||e&&J(e.buffer,SharedArrayBuffer)))return h(e,t,r);if("number"==typeof e)throw new TypeError('The "value" argument must not be of type number. Received type number');const n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return l.from(n,t,r);const o=function(e){if(l.isBuffer(e)){const t=0|f(e.length),r=s(t);return 0===r.length||e.copy(r,0,0,t),r}if(void 0!==e.length)return"number"!=typeof e.length||Y(e.length)?s(0):d(e);if("Buffer"===e.type&&Array.isArray(e.data))return d(e.data)}(e);if(o)return o;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return l.from(e[Symbol.toPrimitive]("string"),t,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function p(e){if("number"!=typeof e)throw new TypeError('"size" argument must be of type number');if(e<0)throw new RangeError('The value "'+e+'" is invalid for option "size"')}function u(e){return p(e),s(e<0?0:0|f(e))}function d(e){const t=e.length<0?0:0|f(e.length),r=s(t);for(let n=0;n<t;n+=1)r[n]=255&e[n];return r}function h(e,t,r){if(t<0||e.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),Object.setPrototypeOf(n,l.prototype),n}function f(e){if(e>=i)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+i.toString(16)+" bytes");return 0|e}function m(e,t){if(l.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||J(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);const r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;let o=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return V(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return G(e).length;default:if(o)return n?-1:V(e).length;t=(""+t).toLowerCase(),o=!0}}function y(e,t,r){let n=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return _(this,t,r);case"utf8":case"utf-8":return E(this,t,r);case"ascii":return T(this,t,r);case"latin1":case"binary":return C(this,t,r);case"base64":return A(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return j(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}function g(e,t,r){const n=e[t];e[t]=e[r],e[r]=n}function v(e,t,r,n,o){if(0===e.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),Y(r=+r)&&(r=o?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(o)return-1;r=e.length-1}else if(r<0){if(!o)return-1;r=0}if("string"==typeof t&&(t=l.from(t,n)),l.isBuffer(t))return 0===t.length?-1:b(e,t,r,n,o);if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):b(e,[t],r,n,o);throw new TypeError("val must be string, number or Buffer")}function b(e,t,r,n,o){let a,i=1,s=e.length,l=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return-1;i=2,s/=2,l/=2,r/=2}function c(e,t){return 1===i?e[t]:e.readUInt16BE(t*i)}if(o){let n=-1;for(a=r;a<s;a++)if(c(e,a)===c(t,-1===n?0:a-n)){if(-1===n&&(n=a),a-n+1===l)return n*i}else-1!==n&&(a-=a-n),n=-1}else for(r+l>s&&(r=s-l),a=r;a>=0;a--){let r=!0;for(let n=0;n<l;n++)if(c(e,a+n)!==c(t,n)){r=!1;break}if(r)return a}return-1}function x(e,t,r,n){r=Number(r)||0;const o=e.length-r;n?(n=Number(n))>o&&(n=o):n=o;const a=t.length;let i;for(n>a/2&&(n=a/2),i=0;i<n;++i){const n=parseInt(t.substr(2*i,2),16);if(Y(n))return i;e[r+i]=n}return i}function w(e,t,r,n){return K(V(t,e.length-r),e,r,n)}function $(e,t,r,n){return K(function(e){const t=[];for(let r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(t),e,r,n)}function k(e,t,r,n){return K(G(t),e,r,n)}function S(e,t,r,n){return K(function(e,t){let r,n,o;const a=[];for(let i=0;i<e.length&&!((t-=2)<0);++i)r=e.charCodeAt(i),n=r>>8,o=r%256,a.push(o),a.push(n);return a}(t,e.length-r),e,r,n)}function A(e,t,r){return 0===t&&r===e.length?n.fromByteArray(e):n.fromByteArray(e.slice(t,r))}function E(e,t,r){r=Math.min(e.length,r);const n=[];let o=t;for(;o<r;){const t=e[o];let a=null,i=t>239?4:t>223?3:t>191?2:1;if(o+i<=r){let r,n,s,l;switch(i){case 1:t<128&&(a=t);break;case 2:r=e[o+1],128==(192&r)&&(l=(31&t)<<6|63&r,l>127&&(a=l));break;case 3:r=e[o+1],n=e[o+2],128==(192&r)&&128==(192&n)&&(l=(15&t)<<12|(63&r)<<6|63&n,l>2047&&(l<55296||l>57343)&&(a=l));break;case 4:r=e[o+1],n=e[o+2],s=e[o+3],128==(192&r)&&128==(192&n)&&128==(192&s)&&(l=(15&t)<<18|(63&r)<<12|(63&n)<<6|63&s,l>65535&&l<1114112&&(a=l))}}null===a?(a=65533,i=1):a>65535&&(a-=65536,n.push(a>>>10&1023|55296),a=56320|1023&a),n.push(a),o+=i}return function(e){const t=e.length;if(t<=O)return String.fromCharCode.apply(String,e);let r="",n=0;for(;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=O));return r}(n)}t.kMaxLength=i,l.TYPED_ARRAY_SUPPORT=function(){try{const e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),l.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(l.prototype,"parent",{enumerable:!0,get:function(){if(l.isBuffer(this))return this.buffer}}),Object.defineProperty(l.prototype,"offset",{enumerable:!0,get:function(){if(l.isBuffer(this))return this.byteOffset}}),l.poolSize=8192,l.from=function(e,t,r){return c(e,t,r)},Object.setPrototypeOf(l.prototype,Uint8Array.prototype),Object.setPrototypeOf(l,Uint8Array),l.alloc=function(e,t,r){return function(e,t,r){return p(e),e<=0?s(e):void 0!==t?"string"==typeof r?s(e).fill(t,r):s(e).fill(t):s(e)}(e,t,r)},l.allocUnsafe=function(e){return u(e)},l.allocUnsafeSlow=function(e){return u(e)},l.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==l.prototype},l.compare=function(e,t){if(J(e,Uint8Array)&&(e=l.from(e,e.offset,e.byteLength)),J(t,Uint8Array)&&(t=l.from(t,t.offset,t.byteLength)),!l.isBuffer(e)||!l.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let r=e.length,n=t.length;for(let o=0,a=Math.min(r,n);o<a;++o)if(e[o]!==t[o]){r=e[o],n=t[o];break}return r<n?-1:n<r?1:0},l.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},l.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return l.alloc(0);let r;if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;const n=l.allocUnsafe(t);let o=0;for(r=0;r<e.length;++r){let t=e[r];if(J(t,Uint8Array))o+t.length>n.length?(l.isBuffer(t)||(t=l.from(t)),t.copy(n,o)):Uint8Array.prototype.set.call(n,t,o);else{if(!l.isBuffer(t))throw new TypeError('"list" argument must be an Array of Buffers');t.copy(n,o)}o+=t.length}return n},l.byteLength=m,l.prototype._isBuffer=!0,l.prototype.swap16=function(){const e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)g(this,t,t+1);return this},l.prototype.swap32=function(){const e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)g(this,t,t+3),g(this,t+1,t+2);return this},l.prototype.swap64=function(){const e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)g(this,t,t+7),g(this,t+1,t+6),g(this,t+2,t+5),g(this,t+3,t+4);return this},l.prototype.toString=function(){const e=this.length;return 0===e?"":0===arguments.length?E(this,0,e):y.apply(this,arguments)},l.prototype.toLocaleString=l.prototype.toString,l.prototype.equals=function(e){if(!l.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===l.compare(this,e)},l.prototype.inspect=function(){let e="";const r=t.INSPECT_MAX_BYTES;return e=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(e+=" ... "),"<Buffer "+e+">"},a&&(l.prototype[a]=l.prototype.inspect),l.prototype.compare=function(e,t,r,n,o){if(J(e,Uint8Array)&&(e=l.from(e,e.offset,e.byteLength)),!l.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),t<0||r>e.length||n<0||o>this.length)throw new RangeError("out of range index");if(n>=o&&t>=r)return 0;if(n>=o)return-1;if(t>=r)return 1;if(this===e)return 0;let a=(o>>>=0)-(n>>>=0),i=(r>>>=0)-(t>>>=0);const s=Math.min(a,i),c=this.slice(n,o),p=e.slice(t,r);for(let e=0;e<s;++e)if(c[e]!==p[e]){a=c[e],i=p[e];break}return a<i?-1:i<a?1:0},l.prototype.includes=function(e,t,r){return-1!==this.indexOf(e,t,r)},l.prototype.indexOf=function(e,t,r){return v(this,e,t,r,!0)},l.prototype.lastIndexOf=function(e,t,r){return v(this,e,t,r,!1)},l.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}const o=this.length-t;if((void 0===r||r>o)&&(r=o),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let a=!1;for(;;)switch(n){case"hex":return x(this,e,t,r);case"utf8":case"utf-8":return w(this,e,t,r);case"ascii":case"latin1":case"binary":return $(this,e,t,r);case"base64":return k(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return S(this,e,t,r);default:if(a)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),a=!0}},l.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};const O=4096;function T(e,t,r){let n="";r=Math.min(e.length,r);for(let o=t;o<r;++o)n+=String.fromCharCode(127&e[o]);return n}function C(e,t,r){let n="";r=Math.min(e.length,r);for(let o=t;o<r;++o)n+=String.fromCharCode(e[o]);return n}function _(e,t,r){const n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);let o="";for(let n=t;n<r;++n)o+=Z[e[n]];return o}function j(e,t,r){const n=e.slice(t,r);let o="";for(let e=0;e<n.length-1;e+=2)o+=String.fromCharCode(n[e]+256*n[e+1]);return o}function I(e,t,r){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>r)throw new RangeError("Trying to access beyond buffer length")}function P(e,t,r,n,o,a){if(!l.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>o||t<a)throw new RangeError('"value" argument is out of bounds');if(r+n>e.length)throw new RangeError("Index out of range")}function R(e,t,r,n,o){q(t,n,o,e,r,7);let a=Number(t&BigInt(4294967295));e[r++]=a,a>>=8,e[r++]=a,a>>=8,e[r++]=a,a>>=8,e[r++]=a;let i=Number(t>>BigInt(32)&BigInt(4294967295));return e[r++]=i,i>>=8,e[r++]=i,i>>=8,e[r++]=i,i>>=8,e[r++]=i,r}function L(e,t,r,n,o){q(t,n,o,e,r,7);let a=Number(t&BigInt(4294967295));e[r+7]=a,a>>=8,e[r+6]=a,a>>=8,e[r+5]=a,a>>=8,e[r+4]=a;let i=Number(t>>BigInt(32)&BigInt(4294967295));return e[r+3]=i,i>>=8,e[r+2]=i,i>>=8,e[r+1]=i,i>>=8,e[r]=i,r+8}function D(e,t,r,n,o,a){if(r+n>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function F(e,t,r,n,a){return t=+t,r>>>=0,a||D(e,0,r,4),o.write(e,t,r,n,23,4),r+4}function B(e,t,r,n,a){return t=+t,r>>>=0,a||D(e,0,r,8),o.write(e,t,r,n,52,8),r+8}l.prototype.slice=function(e,t){const r=this.length;(e=~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),(t=void 0===t?r:~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);const n=this.subarray(e,t);return Object.setPrototypeOf(n,l.prototype),n},l.prototype.readUintLE=l.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||I(e,t,this.length);let n=this[e],o=1,a=0;for(;++a<t&&(o*=256);)n+=this[e+a]*o;return n},l.prototype.readUintBE=l.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||I(e,t,this.length);let n=this[e+--t],o=1;for(;t>0&&(o*=256);)n+=this[e+--t]*o;return n},l.prototype.readUint8=l.prototype.readUInt8=function(e,t){return e>>>=0,t||I(e,1,this.length),this[e]},l.prototype.readUint16LE=l.prototype.readUInt16LE=function(e,t){return e>>>=0,t||I(e,2,this.length),this[e]|this[e+1]<<8},l.prototype.readUint16BE=l.prototype.readUInt16BE=function(e,t){return e>>>=0,t||I(e,2,this.length),this[e]<<8|this[e+1]},l.prototype.readUint32LE=l.prototype.readUInt32LE=function(e,t){return e>>>=0,t||I(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},l.prototype.readUint32BE=l.prototype.readUInt32BE=function(e,t){return e>>>=0,t||I(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},l.prototype.readBigUInt64LE=Q((function(e){M(e>>>=0,"offset");const t=this[e],r=this[e+7];void 0!==t&&void 0!==r||H(e,this.length-8);const n=t+256*this[++e]+65536*this[++e]+this[++e]*2**24,o=this[++e]+256*this[++e]+65536*this[++e]+r*2**24;return BigInt(n)+(BigInt(o)<<BigInt(32))})),l.prototype.readBigUInt64BE=Q((function(e){M(e>>>=0,"offset");const t=this[e],r=this[e+7];void 0!==t&&void 0!==r||H(e,this.length-8);const n=t*2**24+65536*this[++e]+256*this[++e]+this[++e],o=this[++e]*2**24+65536*this[++e]+256*this[++e]+r;return(BigInt(n)<<BigInt(32))+BigInt(o)})),l.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||I(e,t,this.length);let n=this[e],o=1,a=0;for(;++a<t&&(o*=256);)n+=this[e+a]*o;return o*=128,n>=o&&(n-=Math.pow(2,8*t)),n},l.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||I(e,t,this.length);let n=t,o=1,a=this[e+--n];for(;n>0&&(o*=256);)a+=this[e+--n]*o;return o*=128,a>=o&&(a-=Math.pow(2,8*t)),a},l.prototype.readInt8=function(e,t){return e>>>=0,t||I(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},l.prototype.readInt16LE=function(e,t){e>>>=0,t||I(e,2,this.length);const r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},l.prototype.readInt16BE=function(e,t){e>>>=0,t||I(e,2,this.length);const r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},l.prototype.readInt32LE=function(e,t){return e>>>=0,t||I(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},l.prototype.readInt32BE=function(e,t){return e>>>=0,t||I(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},l.prototype.readBigInt64LE=Q((function(e){M(e>>>=0,"offset");const t=this[e],r=this[e+7];void 0!==t&&void 0!==r||H(e,this.length-8);const n=this[e+4]+256*this[e+5]+65536*this[e+6]+(r<<24);return(BigInt(n)<<BigInt(32))+BigInt(t+256*this[++e]+65536*this[++e]+this[++e]*2**24)})),l.prototype.readBigInt64BE=Q((function(e){M(e>>>=0,"offset");const t=this[e],r=this[e+7];void 0!==t&&void 0!==r||H(e,this.length-8);const n=(t<<24)+65536*this[++e]+256*this[++e]+this[++e];return(BigInt(n)<<BigInt(32))+BigInt(this[++e]*2**24+65536*this[++e]+256*this[++e]+r)})),l.prototype.readFloatLE=function(e,t){return e>>>=0,t||I(e,4,this.length),o.read(this,e,!0,23,4)},l.prototype.readFloatBE=function(e,t){return e>>>=0,t||I(e,4,this.length),o.read(this,e,!1,23,4)},l.prototype.readDoubleLE=function(e,t){return e>>>=0,t||I(e,8,this.length),o.read(this,e,!0,52,8)},l.prototype.readDoubleBE=function(e,t){return e>>>=0,t||I(e,8,this.length),o.read(this,e,!1,52,8)},l.prototype.writeUintLE=l.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){P(this,e,t,r,Math.pow(2,8*r)-1,0)}let o=1,a=0;for(this[t]=255&e;++a<r&&(o*=256);)this[t+a]=e/o&255;return t+r},l.prototype.writeUintBE=l.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){P(this,e,t,r,Math.pow(2,8*r)-1,0)}let o=r-1,a=1;for(this[t+o]=255&e;--o>=0&&(a*=256);)this[t+o]=e/a&255;return t+r},l.prototype.writeUint8=l.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||P(this,e,t,1,255,0),this[t]=255&e,t+1},l.prototype.writeUint16LE=l.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||P(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},l.prototype.writeUint16BE=l.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||P(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},l.prototype.writeUint32LE=l.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||P(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},l.prototype.writeUint32BE=l.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||P(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},l.prototype.writeBigUInt64LE=Q((function(e,t=0){return R(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))})),l.prototype.writeBigUInt64BE=Q((function(e,t=0){return L(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))})),l.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){const n=Math.pow(2,8*r-1);P(this,e,t,r,n-1,-n)}let o=0,a=1,i=0;for(this[t]=255&e;++o<r&&(a*=256);)e<0&&0===i&&0!==this[t+o-1]&&(i=1),this[t+o]=(e/a>>0)-i&255;return t+r},l.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){const n=Math.pow(2,8*r-1);P(this,e,t,r,n-1,-n)}let o=r-1,a=1,i=0;for(this[t+o]=255&e;--o>=0&&(a*=256);)e<0&&0===i&&0!==this[t+o+1]&&(i=1),this[t+o]=(e/a>>0)-i&255;return t+r},l.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||P(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},l.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||P(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},l.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||P(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},l.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||P(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},l.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||P(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},l.prototype.writeBigInt64LE=Q((function(e,t=0){return R(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),l.prototype.writeBigInt64BE=Q((function(e,t=0){return L(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),l.prototype.writeFloatLE=function(e,t,r){return F(this,e,t,!0,r)},l.prototype.writeFloatBE=function(e,t,r){return F(this,e,t,!1,r)},l.prototype.writeDoubleLE=function(e,t,r){return B(this,e,t,!0,r)},l.prototype.writeDoubleBE=function(e,t,r){return B(this,e,t,!1,r)},l.prototype.copy=function(e,t,r,n){if(!l.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);const o=n-r;return this===e&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(t,r,n):Uint8Array.prototype.set.call(e,this.subarray(r,n),t),o},l.prototype.fill=function(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!l.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===e.length){const t=e.charCodeAt(0);("utf8"===n&&t<128||"latin1"===n)&&(e=t)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;let o;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(o=t;o<r;++o)this[o]=e;else{const a=l.isBuffer(e)?e:l.from(e,n),i=a.length;if(0===i)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(o=0;o<r-t;++o)this[o+t]=a[o%i]}return this};const N={};function z(e,t,r){N[e]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${e}]`,this.stack,delete this.name}get code(){return e}set code(e){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:e,writable:!0})}toString(){return`${this.name} [${e}]: ${this.message}`}}}function U(e){let t="",r=e.length;const n="-"===e[0]?1:0;for(;r>=n+4;r-=3)t=`_${e.slice(r-3,r)}${t}`;return`${e.slice(0,r)}${t}`}function q(e,t,r,n,o,a){if(e>r||e<t){const n="bigint"==typeof t?"n":"";let o;throw o=a>3?0===t||t===BigInt(0)?`>= 0${n} and < 2${n} ** ${8*(a+1)}${n}`:`>= -(2${n} ** ${8*(a+1)-1}${n}) and < 2 ** ${8*(a+1)-1}${n}`:`>= ${t}${n} and <= ${r}${n}`,new N.ERR_OUT_OF_RANGE("value",o,e)}!function(e,t,r){M(t,"offset"),void 0!==e[t]&&void 0!==e[t+r]||H(t,e.length-(r+1))}(n,o,a)}function M(e,t){if("number"!=typeof e)throw new N.ERR_INVALID_ARG_TYPE(t,"number",e)}function H(e,t,r){if(Math.floor(e)!==e)throw M(e,r),new N.ERR_OUT_OF_RANGE(r||"offset","an integer",e);if(t<0)throw new N.ERR_BUFFER_OUT_OF_BOUNDS;throw new N.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${t}`,e)}z("ERR_BUFFER_OUT_OF_BOUNDS",(function(e){return e?`${e} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"}),RangeError),z("ERR_INVALID_ARG_TYPE",(function(e,t){return`The "${e}" argument must be of type number. Received type ${typeof t}`}),TypeError),z("ERR_OUT_OF_RANGE",(function(e,t,r){let n=`The value of "${e}" is out of range.`,o=r;return Number.isInteger(r)&&Math.abs(r)>2**32?o=U(String(r)):"bigint"==typeof r&&(o=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(o=U(o)),o+="n"),n+=` It must be ${t}. Received ${o}`,n}),RangeError);const W=/[^+/0-9A-Za-z-_]/g;function V(e,t){let r;t=t||1/0;const n=e.length;let o=null;const a=[];for(let i=0;i<n;++i){if(r=e.charCodeAt(i),r>55295&&r<57344){if(!o){if(r>56319){(t-=3)>-1&&a.push(239,191,189);continue}if(i+1===n){(t-=3)>-1&&a.push(239,191,189);continue}o=r;continue}if(r<56320){(t-=3)>-1&&a.push(239,191,189),o=r;continue}r=65536+(o-55296<<10|r-56320)}else o&&(t-=3)>-1&&a.push(239,191,189);if(o=null,r<128){if((t-=1)<0)break;a.push(r)}else if(r<2048){if((t-=2)<0)break;a.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;a.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;a.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return a}function G(e){return n.toByteArray(function(e){if((e=(e=e.split("=")[0]).trim().replace(W,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function K(e,t,r,n){let o;for(o=0;o<n&&!(o+r>=t.length||o>=e.length);++o)t[o+r]=e[o];return o}function J(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}function Y(e){return e!=e}const Z=function(){const e="0123456789abcdef",t=new Array(256);for(let r=0;r<16;++r){const n=16*r;for(let o=0;o<16;++o)t[n+o]=e[r]+e[o]}return t}();function Q(e){return"undefined"==typeof BigInt?X:e}function X(){throw new Error("BigInt not supported")}},645:(e,t)=>{t.read=function(e,t,r,n,o){var a,i,s=8*o-n-1,l=(1<<s)-1,c=l>>1,p=-7,u=r?o-1:0,d=r?-1:1,h=e[t+u];for(u+=d,a=h&(1<<-p)-1,h>>=-p,p+=s;p>0;a=256*a+e[t+u],u+=d,p-=8);for(i=a&(1<<-p)-1,a>>=-p,p+=n;p>0;i=256*i+e[t+u],u+=d,p-=8);if(0===a)a=1-c;else{if(a===l)return i?NaN:1/0*(h?-1:1);i+=Math.pow(2,n),a-=c}return(h?-1:1)*i*Math.pow(2,a-n)},t.write=function(e,t,r,n,o,a){var i,s,l,c=8*a-o-1,p=(1<<c)-1,u=p>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=n?0:a-1,f=n?1:-1,m=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(s=isNaN(t)?1:0,i=p):(i=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-i))<1&&(i--,l*=2),(t+=i+u>=1?d/l:d*Math.pow(2,1-u))*l>=2&&(i++,l/=2),i+u>=p?(s=0,i=p):i+u>=1?(s=(t*l-1)*Math.pow(2,o),i+=u):(s=t*Math.pow(2,u-1)*Math.pow(2,o),i=0));o>=8;e[r+h]=255&s,h+=f,s/=256,o-=8);for(i=i<<o|s,c+=o;c>0;e[r+h]=255&i,h+=f,i/=256,c-=8);e[r+h-f]|=128*m}},874:()=>{!function(e){var t="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",r={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},n={bash:r,environment:{pattern:RegExp("\\$"+t),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+t),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/};e.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+t),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:n},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:r}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:n},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:n.entity}}],environment:{pattern:RegExp("\\$?"+t),alias:"constant"},variable:n.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},r.inside=e.languages.bash;for(var o=["comment","function-name","for-or-select","assign-left","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],a=n.variable[1].inside,i=0;i<o.length;i++)a[o[i]]=e.languages.bash[o[i]];e.languages.shell=e.languages.bash}(Prism)},16:()=>{!function(e){function t(e,t){return e.replace(/<<(\d+)>>/g,(function(e,r){return"(?:"+t[+r]+")"}))}function r(e,r,n){return RegExp(t(e,r),n||"")}function n(e,t){for(var r=0;r<t;r++)e=e.replace(/<<self>>/g,(function(){return"(?:"+e+")"}));return e.replace(/<<self>>/g,"[^\\s\\S]")}var o="bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",a="class enum interface record struct",i="add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)",s="abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";function l(e){return"\\b(?:"+e.trim().replace(/ /g,"|")+")\\b"}var c=l(a),p=RegExp(l(o+" "+a+" "+i+" "+s)),u=l(a+" "+i+" "+s),d=l(o+" "+a+" "+s),h=n(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source,2),f=n(/\((?:[^()]|<<self>>)*\)/.source,2),m=/@?\b[A-Za-z_]\w*\b/.source,y=t(/<<0>>(?:\s*<<1>>)?/.source,[m,h]),g=t(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source,[u,y]),v=/\[\s*(?:,\s*)*\]/.source,b=t(/<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source,[g,v]),x=t(/[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source,[h,f,v]),w=t(/\(<<0>>+(?:,<<0>>+)+\)/.source,[x]),$=t(/(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source,[w,g,v]),k={keyword:p,punctuation:/[<>()?,.:[\]]/},S=/'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source,A=/"(?:\\.|[^\\"\r\n])*"/.source,E=/@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;e.languages.csharp=e.languages.extend("clike",{string:[{pattern:r(/(^|[^$\\])<<0>>/.source,[E]),lookbehind:!0,greedy:!0},{pattern:r(/(^|[^@$\\])<<0>>/.source,[A]),lookbehind:!0,greedy:!0}],"class-name":[{pattern:r(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source,[g]),lookbehind:!0,inside:k},{pattern:r(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source,[m,$]),lookbehind:!0,inside:k},{pattern:r(/(\busing\s+)<<0>>(?=\s*=)/.source,[m]),lookbehind:!0},{pattern:r(/(\b<<0>>\s+)<<1>>/.source,[c,y]),lookbehind:!0,inside:k},{pattern:r(/(\bcatch\s*\(\s*)<<0>>/.source,[g]),lookbehind:!0,inside:k},{pattern:r(/(\bwhere\s+)<<0>>/.source,[m]),lookbehind:!0},{pattern:r(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source,[b]),lookbehind:!0,inside:k},{pattern:r(/\b<<0>>(?=\s+(?!<<1>>|with\s*\{)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source,[$,d,m]),inside:k}],keyword:p,number:/(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,operator:/>>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,punctuation:/\?\.?|::|[{}[\];(),.:]/}),e.languages.insertBefore("csharp","number",{range:{pattern:/\.\./,alias:"operator"}}),e.languages.insertBefore("csharp","punctuation",{"named-parameter":{pattern:r(/([(,]\s*)<<0>>(?=\s*:)/.source,[m]),lookbehind:!0,alias:"punctuation"}}),e.languages.insertBefore("csharp","class-name",{namespace:{pattern:r(/(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source,[m]),lookbehind:!0,inside:{punctuation:/\./}},"type-expression":{pattern:r(/(\b(?:default|sizeof|typeof)\s*\(\s*(?!\s))(?:[^()\s]|\s(?!\s)|<<0>>)*(?=\s*\))/.source,[f]),lookbehind:!0,alias:"class-name",inside:k},"return-type":{pattern:r(/<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source,[$,g]),inside:k,alias:"class-name"},"constructor-invocation":{pattern:r(/(\bnew\s+)<<0>>(?=\s*[[({])/.source,[$]),lookbehind:!0,inside:k,alias:"class-name"},"generic-method":{pattern:r(/<<0>>\s*<<1>>(?=\s*\()/.source,[m,h]),inside:{function:r(/^<<0>>/.source,[m]),generic:{pattern:RegExp(h),alias:"class-name",inside:k}}},"type-list":{pattern:r(/\b((?:<<0>>\s+<<1>>|record\s+<<1>>\s*<<5>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>|<<1>>\s*<<5>>|<<6>>)(?:\s*,\s*(?:<<3>>|<<4>>|<<6>>))*(?=\s*(?:where|[{;]|=>|$))/.source,[c,y,m,$,p.source,f,/\bnew\s*\(\s*\)/.source]),lookbehind:!0,inside:{"record-arguments":{pattern:r(/(^(?!new\s*\()<<0>>\s*)<<1>>/.source,[y,f]),lookbehind:!0,greedy:!0,inside:e.languages.csharp},keyword:p,"class-name":{pattern:RegExp($),greedy:!0,inside:k},punctuation:/[,()]/}},preprocessor:{pattern:/(^[\t ]*)#.*/m,lookbehind:!0,alias:"property",inside:{directive:{pattern:/(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,lookbehind:!0,alias:"keyword"}}}});var O=A+"|"+S,T=t(/\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source,[O]),C=n(t(/[^"'/()]|<<0>>|\(<<self>>*\)/.source,[T]),2),_=/\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source,j=t(/<<0>>(?:\s*\(<<1>>*\))?/.source,[g,C]);e.languages.insertBefore("csharp","class-name",{attribute:{pattern:r(/((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source,[_,j]),lookbehind:!0,greedy:!0,inside:{target:{pattern:r(/^<<0>>(?=\s*:)/.source,[_]),alias:"keyword"},"attribute-arguments":{pattern:r(/\(<<0>>*\)/.source,[C]),inside:e.languages.csharp},"class-name":{pattern:RegExp(g),inside:{punctuation:/\./}},punctuation:/[:,]/}}});var I=/:[^}\r\n]+/.source,P=n(t(/[^"'/()]|<<0>>|\(<<self>>*\)/.source,[T]),2),R=t(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source,[P,I]),L=n(t(/[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source,[O]),2),D=t(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source,[L,I]);function F(t,n){return{interpolation:{pattern:r(/((?:^|[^{])(?:\{\{)*)<<0>>/.source,[t]),lookbehind:!0,inside:{"format-string":{pattern:r(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source,[n,I]),lookbehind:!0,inside:{punctuation:/^:/}},punctuation:/^\{|\}$/,expression:{pattern:/[\s\S]+/,alias:"language-csharp",inside:e.languages.csharp}}},string:/[\s\S]+/}}e.languages.insertBefore("csharp","string",{"interpolation-string":[{pattern:r(/(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source,[R]),lookbehind:!0,greedy:!0,inside:F(R,P)},{pattern:r(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source,[D]),lookbehind:!0,greedy:!0,inside:F(D,L)}],char:{pattern:RegExp(S),greedy:!0}}),e.languages.dotnet=e.languages.cs=e.languages.csharp}(Prism)},251:()=>{!function(e){var t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+t.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+t.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+t.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var r=e.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))}(Prism)},46:()=>{Prism.languages.go=Prism.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,lookbehind:!0,greedy:!0},keyword:/\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,boolean:/\b(?:_|false|iota|nil|true)\b/,number:[/\b0(?:b[01_]+|o[0-7_]+)i?\b/i,/\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,/(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i],operator:/[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,builtin:/\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/}),Prism.languages.insertBefore("go","string",{char:{pattern:/'(?:\\.|[^'\\\r\n]){0,10}'/,greedy:!0}}),delete Prism.languages.go["class-name"]},57:()=>{!function(e){function t(e){return RegExp("(^(?:"+e+"):[ \t]*(?![ \t]))[^]+","i")}e.languages.http={"request-line":{pattern:/^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,inside:{method:{pattern:/^[A-Z]+\b/,alias:"property"},"request-target":{pattern:/^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,lookbehind:!0,alias:"url",inside:e.languages.uri},"http-version":{pattern:/^(\s)HTTP\/[\d.]+/,lookbehind:!0,alias:"property"}}},"response-status":{pattern:/^HTTP\/[\d.]+ \d+ .+/m,inside:{"http-version":{pattern:/^HTTP\/[\d.]+/,alias:"property"},"status-code":{pattern:/^(\s)\d+(?=\s)/,lookbehind:!0,alias:"number"},"reason-phrase":{pattern:/^(\s).+/,lookbehind:!0,alias:"string"}}},header:{pattern:/^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,inside:{"header-value":[{pattern:t(/Content-Security-Policy/.source),lookbehind:!0,alias:["csp","languages-csp"],inside:e.languages.csp},{pattern:t(/Public-Key-Pins(?:-Report-Only)?/.source),lookbehind:!0,alias:["hpkp","languages-hpkp"],inside:e.languages.hpkp},{pattern:t(/Strict-Transport-Security/.source),lookbehind:!0,alias:["hsts","languages-hsts"],inside:e.languages.hsts},{pattern:t(/[^:]+/.source),lookbehind:!0}],"header-name":{pattern:/^[^:]+/,alias:"keyword"},punctuation:/^:/}}};var r,n=e.languages,o={"application/javascript":n.javascript,"application/json":n.json||n.javascript,"application/xml":n.xml,"text/xml":n.xml,"text/html":n.html,"text/css":n.css,"text/plain":n.plain},a={"application/json":!0,"application/xml":!0};function i(e){var t=e.replace(/^[a-z]+\//,"");return"(?:"+e+"|"+("\\w+/(?:[\\w.-]+\\+)+"+t+"(?![+\\w.-])")+")"}for(var s in o)if(o[s]){r=r||{};var l=a[s]?i(s):s;r[s.replace(/\//g,"-")]={pattern:RegExp("("+/content-type:\s*/.source+l+/(?:(?:\r\n?|\n)[\w-].*)*(?:\r(?:\n|(?!\n))|\n)/.source+")"+/[^ \t\w-][\s\S]*/.source,"i"),lookbehind:!0,inside:o[s]}}r&&e.languages.insertBefore("http","header",r)}(Prism)},503:()=>{!function(e){var t=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,r=/(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source,n={pattern:RegExp(r+/[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),lookbehind:!0,inside:{namespace:{pattern:/^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,inside:{punctuation:/\./}},punctuation:/\./}};e.languages.java=e.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,lookbehind:!0,greedy:!0},"class-name":[n,{pattern:RegExp(r+/[A-Z]\w*(?=\s+\w+\s*[;,=()])/.source),lookbehind:!0,inside:n.inside}],keyword:t,function:[e.languages.clike.function,{pattern:/(::\s*)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0}}),e.languages.insertBefore("java","string",{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:"string"},char:{pattern:/'(?:\\.|[^'\\\r\n]){1,6}'/,greedy:!0}}),e.languages.insertBefore("java","class-name",{annotation:{pattern:/(^|[^.])@\w+(?:\s*\.\s*\w+)*/,lookbehind:!0,alias:"punctuation"},generics:{pattern:/<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,inside:{"class-name":n,keyword:t,punctuation:/[<>(),.:]/,operator:/[?&|]/}},namespace:{pattern:RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g,(function(){return t.source}))),lookbehind:!0,inside:{punctuation:/\./}}})}(Prism)},277:()=>{Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}},Prism.languages.webmanifest=Prism.languages.json},366:()=>{Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python},358:()=>{!function(e){var t=/[*&][^\s[\]{},]+/,r=/!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,n="(?:"+r.source+"(?:[ \t]+"+t.source+")?|"+t.source+"(?:[ \t]+"+r.source+")?)",o=/(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g,(function(){return/[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source})),a=/"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;function i(e,t){t=(t||"").replace(/m/g,"")+"m";var r=/([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g,(function(){return n})).replace(/<<value>>/g,(function(){return e}));return RegExp(r,t)}e.languages.yaml={scalar:{pattern:RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g,(function(){return n}))),lookbehind:!0,alias:"string"},comment:/#.*/,key:{pattern:RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g,(function(){return n})).replace(/<<key>>/g,(function(){return"(?:"+o+"|"+a+")"}))),lookbehind:!0,greedy:!0,alias:"atrule"},directive:{pattern:/(^[ \t]*)%.+/m,lookbehind:!0,alias:"important"},datetime:{pattern:i(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),lookbehind:!0,alias:"number"},boolean:{pattern:i(/false|true/.source,"i"),lookbehind:!0,alias:"important"},null:{pattern:i(/null|~/.source,"i"),lookbehind:!0,alias:"important"},string:{pattern:i(a),lookbehind:!0,greedy:!0},number:{pattern:i(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,"i"),lookbehind:!0},tag:r,important:t,punctuation:/---|[:[\]{}\-,|>?]|\.\.\./},e.languages.yml=e.languages.yaml}(Prism)},660:(e,t,r)=>{var n=function(e){var t=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,r=0,n={},o={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof a?new a(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++r}),e.__id},clone:function e(t,r){var n,a;switch(r=r||{},o.util.type(t)){case"Object":if(a=o.util.objId(t),r[a])return r[a];for(var i in n={},r[a]=n,t)t.hasOwnProperty(i)&&(n[i]=e(t[i],r));return n;case"Array":return a=o.util.objId(t),r[a]?r[a]:(n=[],r[a]=n,t.forEach((function(t,o){n[o]=e(t,r)})),n);default:return t}},getLanguage:function(e){for(;e;){var r=t.exec(e.className);if(r)return r[1].toLowerCase();e=e.parentElement}return"none"},setLanguage:function(e,r){e.className=e.className.replace(RegExp(t,"gi"),""),e.classList.add("language-"+r)},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(n){var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(n.stack)||[])[1];if(e){var t=document.getElementsByTagName("script");for(var r in t)if(t[r].src==e)return t[r]}return null}},isActive:function(e,t,r){for(var n="no-"+t;e;){var o=e.classList;if(o.contains(t))return!0;if(o.contains(n))return!1;e=e.parentElement}return!!r}},languages:{plain:n,plaintext:n,text:n,txt:n,extend:function(e,t){var r=o.util.clone(o.languages[e]);for(var n in t)r[n]=t[n];return r},insertBefore:function(e,t,r,n){var a=(n=n||o.languages)[e],i={};for(var s in a)if(a.hasOwnProperty(s)){if(s==t)for(var l in r)r.hasOwnProperty(l)&&(i[l]=r[l]);r.hasOwnProperty(s)||(i[s]=a[s])}var c=n[e];return n[e]=i,o.languages.DFS(o.languages,(function(t,r){r===c&&t!=e&&(this[t]=i)})),i},DFS:function e(t,r,n,a){a=a||{};var i=o.util.objId;for(var s in t)if(t.hasOwnProperty(s)){r.call(t,s,t[s],n||s);var l=t[s],c=o.util.type(l);"Object"!==c||a[i(l)]?"Array"!==c||a[i(l)]||(a[i(l)]=!0,e(l,r,s,a)):(a[i(l)]=!0,e(l,r,null,a))}}},plugins:{},highlightAll:function(e,t){o.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,r){var n={callback:r,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",n),n.elements=Array.prototype.slice.apply(n.container.querySelectorAll(n.selector)),o.hooks.run("before-all-elements-highlight",n);for(var a,i=0;a=n.elements[i++];)o.highlightElement(a,!0===t,n.callback)},highlightElement:function(t,r,n){var a=o.util.getLanguage(t),i=o.languages[a];o.util.setLanguage(t,a);var s=t.parentElement;s&&"pre"===s.nodeName.toLowerCase()&&o.util.setLanguage(s,a);var l={element:t,language:a,grammar:i,code:t.textContent};function c(e){l.highlightedCode=e,o.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,o.hooks.run("after-highlight",l),o.hooks.run("complete",l),n&&n.call(l.element)}if(o.hooks.run("before-sanity-check",l),(s=l.element.parentElement)&&"pre"===s.nodeName.toLowerCase()&&!s.hasAttribute("tabindex")&&s.setAttribute("tabindex","0"),!l.code)return o.hooks.run("complete",l),void(n&&n.call(l.element));if(o.hooks.run("before-highlight",l),l.grammar)if(r&&e.Worker){var p=new Worker(o.filename);p.onmessage=function(e){c(e.data)},p.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else c(o.highlight(l.code,l.grammar,l.language));else c(o.util.encode(l.code))},highlight:function(e,t,r){var n={code:e,grammar:t,language:r};if(o.hooks.run("before-tokenize",n),!n.grammar)throw new Error('The language "'+n.language+'" has no grammar.');return n.tokens=o.tokenize(n.code,n.grammar),o.hooks.run("after-tokenize",n),a.stringify(o.util.encode(n.tokens),n.language)},tokenize:function(e,t){var r=t.rest;if(r){for(var n in r)t[n]=r[n];delete t.rest}var o=new l;return c(o,o.head,e),s(e,o,t,o.head,0),function(e){var t=[],r=e.head.next;for(;r!==e.tail;)t.push(r.value),r=r.next;return t}(o)},hooks:{all:{},add:function(e,t){var r=o.hooks.all;r[e]=r[e]||[],r[e].push(t)},run:function(e,t){var r=o.hooks.all[e];if(r&&r.length)for(var n,a=0;n=r[a++];)n(t)}},Token:a};function a(e,t,r,n){this.type=e,this.content=t,this.alias=r,this.length=0|(n||"").length}function i(e,t,r,n){e.lastIndex=t;var o=e.exec(r);if(o&&n&&o[1]){var a=o[1].length;o.index+=a,o[0]=o[0].slice(a)}return o}function s(e,t,r,n,l,u){for(var d in r)if(r.hasOwnProperty(d)&&r[d]){var h=r[d];h=Array.isArray(h)?h:[h];for(var f=0;f<h.length;++f){if(u&&u.cause==d+","+f)return;var m=h[f],y=m.inside,g=!!m.lookbehind,v=!!m.greedy,b=m.alias;if(v&&!m.pattern.global){var x=m.pattern.toString().match(/[imsuy]*$/)[0];m.pattern=RegExp(m.pattern.source,x+"g")}for(var w=m.pattern||m,$=n.next,k=l;$!==t.tail&&!(u&&k>=u.reach);k+=$.value.length,$=$.next){var S=$.value;if(t.length>e.length)return;if(!(S instanceof a)){var A,E=1;if(v){if(!(A=i(w,k,e,g))||A.index>=e.length)break;var O=A.index,T=A.index+A[0].length,C=k;for(C+=$.value.length;O>=C;)C+=($=$.next).value.length;if(k=C-=$.value.length,$.value instanceof a)continue;for(var _=$;_!==t.tail&&(C<T||"string"==typeof _.value);_=_.next)E++,C+=_.value.length;E--,S=e.slice(k,C),A.index-=k}else if(!(A=i(w,0,S,g)))continue;O=A.index;var j=A[0],I=S.slice(0,O),P=S.slice(O+j.length),R=k+S.length;u&&R>u.reach&&(u.reach=R);var L=$.prev;if(I&&(L=c(t,L,I),k+=I.length),p(t,L,E),$=c(t,L,new a(d,y?o.tokenize(j,y):j,b,j)),P&&c(t,$,P),E>1){var D={cause:d+","+f,reach:R};s(e,t,r,$.prev,k,D),u&&D.reach>u.reach&&(u.reach=D.reach)}}}}}}function l(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function c(e,t,r){var n=t.next,o={value:r,prev:t,next:n};return t.next=o,n.prev=o,e.length++,o}function p(e,t,r){for(var n=t.next,o=0;o<r&&n!==e.tail;o++)n=n.next;t.next=n,n.prev=t,e.length-=o}if(e.Prism=o,a.stringify=function e(t,r){if("string"==typeof t)return t;if(Array.isArray(t)){var n="";return t.forEach((function(t){n+=e(t,r)})),n}var a={type:t.type,content:e(t.content,r),tag:"span",classes:["token",t.type],attributes:{},language:r},i=t.alias;i&&(Array.isArray(i)?Array.prototype.push.apply(a.classes,i):a.classes.push(i)),o.hooks.run("wrap",a);var s="";for(var l in a.attributes)s+=" "+l+'="'+(a.attributes[l]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+s+">"+a.content+"</"+a.tag+">"},!e.document)return e.addEventListener?(o.disableWorkerMessageHandler||e.addEventListener("message",(function(t){var r=JSON.parse(t.data),n=r.language,a=r.code,i=r.immediateClose;e.postMessage(o.highlight(a,o.languages[n],n)),i&&e.close()}),!1),o):o;var u=o.util.currentScript();function d(){o.manual||o.highlightAll()}if(u&&(o.filename=u.src,u.hasAttribute("data-manual")&&(o.manual=!0)),!o.manual){var h=document.readyState;"loading"===h||"interactive"===h&&u&&u.defer?document.addEventListener("DOMContentLoaded",d):window.requestAnimationFrame?window.requestAnimationFrame(d):window.setTimeout(d,16)}return o}("undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{});e.exports&&(e.exports=n),void 0!==r.g&&(r.g.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside["attr-value"].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside["internal-subset"].inside=n.languages.markup,n.hooks.add("wrap",(function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))})),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(e,t){var r={};r["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[t]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var o={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};o["language-"+t]={pattern:/[\s\S]+/,inside:n.languages[t]};var a={};a[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,(function(){return e})),"i"),lookbehind:!0,greedy:!0,inside:o},n.languages.insertBefore("markup","cdata",a)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(e,t){n.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+e+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[t,"language-"+t],inside:n.languages[t]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend("markup",{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,function(e){var t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+t.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+t.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+t.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var r=e.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))}(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend("clike",{"class-name":[n.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),n.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),n.languages.markup&&(n.languages.markup.tag.addInlined("script","javascript"),n.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),n.languages.js=n.languages.javascript,function(){if(void 0!==n&&"undefined"!=typeof document){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},t="data-src-status",r="loading",o="loaded",a='pre[data-src]:not([data-src-status="loaded"]):not([data-src-status="loading"])';n.hooks.add("before-highlightall",(function(e){e.selector+=", "+a})),n.hooks.add("before-sanity-check",(function(i){var s=i.element;if(s.matches(a)){i.code="",s.setAttribute(t,r);var l=s.appendChild(document.createElement("CODE"));l.textContent="Loading…";var c=s.getAttribute("data-src"),p=i.language;if("none"===p){var u=(/\.(\w+)$/.exec(c)||[,"none"])[1];p=e[u]||u}n.util.setLanguage(l,p),n.util.setLanguage(s,p);var d=n.plugins.autoloader;d&&d.loadLanguages(p),function(e,t,r){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onreadystatechange=function(){4==n.readyState&&(n.status<400&&n.responseText?t(n.responseText):n.status>=400?r("✖ Error "+n.status+" while fetching file: "+n.statusText):r("✖ Error: File does not exist or is empty"))},n.send(null)}(c,(function(e){s.setAttribute(t,o);var r=function(e){var t=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(e||"");if(t){var r=Number(t[1]),n=t[2],o=t[3];return n?o?[r,Number(o)]:[r,void 0]:[r,r]}}(s.getAttribute("data-range"));if(r){var a=e.split(/\r\n?|\n/g),i=r[0],c=null==r[1]?a.length:r[1];i<0&&(i+=a.length),i=Math.max(0,Math.min(i-1,a.length)),c<0&&(c+=a.length),c=Math.max(0,Math.min(c,a.length)),e=a.slice(i,c).join("\n"),s.hasAttribute("data-start")||s.setAttribute("data-start",String(i+1))}l.textContent=e,n.highlightElement(l)}),(function(e){s.setAttribute(t,"failed"),l.textContent=e}))}})),n.plugins.fileHighlight={highlight:function(e){for(var t,r=(e||document).querySelectorAll(a),o=0;t=r[o++];)n.highlightElement(t)}};var i=!1;n.fileHighlight=function(){i||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),i=!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}}}()}},n={};function o(e){var t=n[e];if(void 0!==t){if(void 0!==t.error)throw t.error;return t.exports}var a=n[e]={exports:{}};try{var i={id:e,module:a,factory:r[e],require:o};o.i.forEach((function(e){e(i)})),a=i.module,i.factory.call(a.exports,a,a.exports,i.require)}catch(e){throw a.error=e,e}return a.exports}o.m=r,o.c=n,o.i=[],o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.hu=e=>e+"."+o.h()+".hot-update.js",o.hmrF=()=>"main."+o.h()+".hot-update.json",o.h=()=>"27ebe4f6ce7b32ad2722",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="rapidoc:",o.l=(r,n,a,i)=>{if(e[r])e[r].push(n);else{var s,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),p=0;p<c.length;p++){var u=c[p];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==t+a){s=u;break}}s||(l=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,o.nc&&s.setAttribute("nonce",o.nc),s.setAttribute("data-webpack",t+a),s.src=r),e[r]=[n];var d=(t,n)=>{s.onerror=s.onload=null,clearTimeout(h);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(n))),t)return t(n)},h=setTimeout(d.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=d.bind(null,s.onerror),s.onload=d.bind(null,s.onload),l&&document.head.appendChild(s)}},(()=>{var e,t,r,n,a={},i=o.c,s=[],l=[],c="idle";function p(e){c=e;for(var t=[],r=0;r<l.length;r++)t[r]=l[r].call(null,e);return Promise.all(t)}function u(e){if(0===t.length)return e();var r=t;return t=[],Promise.all(r).then((function(){return u(e)}))}function d(e){if("idle"!==c)throw new Error("check() is only allowed in idle status");return p("check").then(o.hmrM).then((function(n){return n?p("prepare").then((function(){var a=[];return t=[],r=[],Promise.all(Object.keys(o.hmrC).reduce((function(e,t){return o.hmrC[t](n.c,n.r,n.m,e,r,a),e}),[])).then((function(){return u((function(){return e?f(e):p("ready").then((function(){return a}))}))}))})):p(m()?"ready":"idle").then((function(){return null}))}))}function h(e){return"ready"!==c?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status")})):f(e)}function f(e){e=e||{},m();var t=r.map((function(t){return t(e)}));r=void 0;var o=t.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return p("abort").then((function(){throw o[0]}));var a=p("dispose");t.forEach((function(e){e.dispose&&e.dispose()}));var i,s=p("apply"),l=function(e){i||(i=e)},c=[];return t.forEach((function(e){if(e.apply){var t=e.apply(l);if(t)for(var r=0;r<t.length;r++)c.push(t[r])}})),Promise.all([a,s]).then((function(){return i?p("fail").then((function(){throw i})):n?f(e).then((function(e){return c.forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e})):p("idle").then((function(){return c}))}))}function m(){if(n)return r||(r=[]),Object.keys(o.hmrI).forEach((function(e){n.forEach((function(t){o.hmrI[e](t,r)}))})),n=void 0,!0}o.hmrD=a,o.i.push((function(f){var m,y,g,v,b=f.module,x=function(r,n){var o=i[n];if(!o)return r;var a=function(t){if(o.hot.active){if(i[t]){var a=i[t].parents;-1===a.indexOf(n)&&a.push(n)}else s=[n],e=t;-1===o.children.indexOf(t)&&o.children.push(t)}else console.warn("[HMR] unexpected require("+t+") from disposed module "+n),s=[];return r(t)},l=function(e){return{configurable:!0,enumerable:!0,get:function(){return r[e]},set:function(t){r[e]=t}}};for(var d in r)Object.prototype.hasOwnProperty.call(r,d)&&"e"!==d&&Object.defineProperty(a,d,l(d));return a.e=function(e){return function(e){switch(c){case"ready":return p("prepare"),t.push(e),u((function(){return p("ready")})),e;case"prepare":return t.push(e),e;default:return e}}(r.e(e))},a}(f.require,f.id);b.hot=(m=f.id,y=b,v={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:g=e!==m,_requireSelf:function(){s=y.parents.slice(),e=g?void 0:m,o(m)},active:!0,accept:function(e,t,r){if(void 0===e)v._selfAccepted=!0;else if("function"==typeof e)v._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var n=0;n<e.length;n++)v._acceptedDependencies[e[n]]=t||function(){},v._acceptedErrorHandlers[e[n]]=r;else v._acceptedDependencies[e]=t||function(){},v._acceptedErrorHandlers[e]=r},decline:function(e){if(void 0===e)v._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)v._declinedDependencies[e[t]]=!0;else v._declinedDependencies[e]=!0},dispose:function(e){v._disposeHandlers.push(e)},addDisposeHandler:function(e){v._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=v._disposeHandlers.indexOf(e);t>=0&&v._disposeHandlers.splice(t,1)},invalidate:function(){switch(this._selfInvalidated=!0,c){case"idle":r=[],Object.keys(o.hmrI).forEach((function(e){o.hmrI[e](m,r)})),p("ready");break;case"ready":Object.keys(o.hmrI).forEach((function(e){o.hmrI[e](m,r)}));break;case"prepare":case"check":case"dispose":case"apply":(n=n||[]).push(m)}},check:d,apply:h,status:function(e){if(!e)return c;l.push(e)},addStatusHandler:function(e){l.push(e)},removeStatusHandler:function(e){var t=l.indexOf(e);t>=0&&l.splice(t,1)},data:a[m]},e=void 0,v),b.parents=s,b.children=[],s=[],f.require=x})),o.hmrC={},o.hmrI={}})(),o.p="",(()=>{var e,t,r,n,a=o.hmrS_jsonp=o.hmrS_jsonp||{179:0},i={};function s(e){return new Promise(((t,r)=>{i[e]=t;var n=o.p+o.hu(e),a=new Error;o.l(n,(t=>{if(i[e]){i[e]=void 0;var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;a.message="Loading hot update chunk "+e+" failed.\n("+n+": "+o+")",a.name="ChunkLoadError",a.type=n,a.request=o,r(a)}}))}))}function l(i){function s(e){for(var t=[e],r={},n=t.map((function(e){return{chain:[e],id:e}}));n.length>0;){var a=n.pop(),i=a.id,s=a.chain,c=o.c[i];if(c&&(!c.hot._selfAccepted||c.hot._selfInvalidated)){if(c.hot._selfDeclined)return{type:"self-declined",chain:s,moduleId:i};if(c.hot._main)return{type:"unaccepted",chain:s,moduleId:i};for(var p=0;p<c.parents.length;p++){var u=c.parents[p],d=o.c[u];if(d){if(d.hot._declinedDependencies[i])return{type:"declined",chain:s.concat([u]),moduleId:i,parentId:u};-1===t.indexOf(u)&&(d.hot._acceptedDependencies[i]?(r[u]||(r[u]=[]),l(r[u],[i])):(delete r[u],t.push(u),n.push({chain:s.concat([u]),id:u})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:r}}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];-1===e.indexOf(n)&&e.push(n)}}o.f&&delete o.f.jsonpHmr,e=void 0;var c={},p=[],u={},d=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var h in t)if(o.o(t,h)){var f,m=t[h],y=!1,g=!1,v=!1,b="";switch((f=m?s(h):{type:"disposed",moduleId:h}).chain&&(b="\nUpdate propagation: "+f.chain.join(" -> ")),f.type){case"self-declined":i.onDeclined&&i.onDeclined(f),i.ignoreDeclined||(y=new Error("Aborted because of self decline: "+f.moduleId+b));break;case"declined":i.onDeclined&&i.onDeclined(f),i.ignoreDeclined||(y=new Error("Aborted because of declined dependency: "+f.moduleId+" in "+f.parentId+b));break;case"unaccepted":i.onUnaccepted&&i.onUnaccepted(f),i.ignoreUnaccepted||(y=new Error("Aborted because "+h+" is not accepted"+b));break;case"accepted":i.onAccepted&&i.onAccepted(f),g=!0;break;case"disposed":i.onDisposed&&i.onDisposed(f),v=!0;break;default:throw new Error("Unexception type "+f.type)}if(y)return{error:y};if(g)for(h in u[h]=m,l(p,f.outdatedModules),f.outdatedDependencies)o.o(f.outdatedDependencies,h)&&(c[h]||(c[h]=[]),l(c[h],f.outdatedDependencies[h]));v&&(l(p,[f.moduleId]),u[h]=d)}t=void 0;for(var x,w=[],$=0;$<p.length;$++){var k=p[$],S=o.c[k];S&&(S.hot._selfAccepted||S.hot._main)&&u[k]!==d&&!S.hot._selfInvalidated&&w.push({module:k,require:S.hot._requireSelf,errorHandler:S.hot._selfAccepted})}return{dispose:function(){var e;r.forEach((function(e){delete a[e]})),r=void 0;for(var t,n=p.slice();n.length>0;){var i=n.pop(),s=o.c[i];if(s){var l={},u=s.hot._disposeHandlers;for($=0;$<u.length;$++)u[$].call(null,l);for(o.hmrD[i]=l,s.hot.active=!1,delete o.c[i],delete c[i],$=0;$<s.children.length;$++){var d=o.c[s.children[$]];d&&((e=d.parents.indexOf(i))>=0&&d.parents.splice(e,1))}}}for(var h in c)if(o.o(c,h)&&(s=o.c[h]))for(x=c[h],$=0;$<x.length;$++)t=x[$],(e=s.children.indexOf(t))>=0&&s.children.splice(e,1)},apply:function(e){for(var t in u)o.o(u,t)&&(o.m[t]=u[t]);for(var r=0;r<n.length;r++)n[r](o);for(var a in c)if(o.o(c,a)){var s=o.c[a];if(s){x=c[a];for(var l=[],d=[],h=[],f=0;f<x.length;f++){var m=x[f],y=s.hot._acceptedDependencies[m],g=s.hot._acceptedErrorHandlers[m];if(y){if(-1!==l.indexOf(y))continue;l.push(y),d.push(g),h.push(m)}}for(var v=0;v<l.length;v++)try{l[v].call(null,x)}catch(t){if("function"==typeof d[v])try{d[v](t,{moduleId:a,dependencyId:h[v]})}catch(r){i.onErrored&&i.onErrored({type:"accept-error-handler-errored",moduleId:a,dependencyId:h[v],error:r,originalError:t}),i.ignoreErrored||(e(r),e(t))}else i.onErrored&&i.onErrored({type:"accept-errored",moduleId:a,dependencyId:h[v],error:t}),i.ignoreErrored||e(t)}}}for(var b=0;b<w.length;b++){var $=w[b],k=$.module;try{$.require(k)}catch(t){if("function"==typeof $.errorHandler)try{$.errorHandler(t,{moduleId:k,module:o.c[k]})}catch(r){i.onErrored&&i.onErrored({type:"self-accept-error-handler-errored",moduleId:k,error:r,originalError:t}),i.ignoreErrored||(e(r),e(t))}else i.onErrored&&i.onErrored({type:"self-accept-errored",moduleId:k,error:t}),i.ignoreErrored||e(t)}}return p}}}self.webpackHotUpdaterapidoc=(e,r,a)=>{for(var s in r)o.o(r,s)&&(t[s]=r[s]);a&&n.push(a),i[e]&&(i[e](),i[e]=void 0)},o.hmrI.jsonp=function(e,a){t||(t={},n=[],r=[],a.push(l)),o.o(t,e)||(t[e]=o.m[e])},o.hmrC.jsonp=function(i,c,p,u,d,h){d.push(l),e={},r=c,t=p.reduce((function(e,t){return e[t]=!1,e}),{}),n=[],i.forEach((function(t){o.o(a,t)&&void 0!==a[t]&&(u.push(s(t)),e[t]=!0)})),o.f&&(o.f.jsonpHmr=function(t,r){e&&!o.o(e,t)&&o.o(a,t)&&void 0!==a[t]&&(r.push(s(t)),e[t]=!0)})},o.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(o.p+o.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))}})();o(448)})();
//# sourceMappingURL=rapidoc-min.js.map