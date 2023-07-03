/**
 * Swiper 10.0.0-beta.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: June 23, 2023
 */

var Swiper = (function () {
  'use strict';

  function isObject$1(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function extend$1(e,t){void 0===e&&(e={}),void 0===t&&(t={}),Object.keys(t).forEach((n=>{void 0===e[n]?e[n]=t[n]:isObject$1(t[n])&&isObject$1(e[n])&&Object.keys(t[n]).length>0&&extend$1(e[n],t[n]);}));}const ssrDocument={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function getDocument(){const e="undefined"!=typeof document?document:{};return extend$1(e,ssrDocument),e}const ssrWindow={document:ssrDocument,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e);}};function getWindow(){const e="undefined"!=typeof window?window:{};return extend$1(e,ssrWindow),e}

  function deleteProps(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null;}catch(e){}try{delete t[e];}catch(e){}}));}function nextTick(e,t){return void 0===t&&(t=0),setTimeout(e,t)}function now(){return Date.now()}function getComputedStyle$1(e){const t=getWindow();let n;return t.getComputedStyle&&(n=t.getComputedStyle(e,null)),!n&&e.currentStyle&&(n=e.currentStyle),n||(n=e.style),n}function getTranslate(e,t){void 0===t&&(t="x");const n=getWindow();let r,o,l;const s=getComputedStyle$1(e);return n.WebKitCSSMatrix?(o=s.transform||s.webkitTransform,o.split(",").length>6&&(o=o.split(", ").map((e=>e.replace(",","."))).join(", ")),l=new n.WebKitCSSMatrix("none"===o?"":o)):(l=s.MozTransform||s.OTransform||s.MsTransform||s.msTransform||s.transform||s.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),r=l.toString().split(",")),"x"===t&&(o=n.WebKitCSSMatrix?l.m41:16===r.length?parseFloat(r[12]):parseFloat(r[4])),"y"===t&&(o=n.WebKitCSSMatrix?l.m42:16===r.length?parseFloat(r[13]):parseFloat(r[5])),o||0}function isObject(e){return "object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function isNode(e){return "undefined"!=typeof window&&void 0!==window.HTMLElement?e instanceof HTMLElement:e&&(1===e.nodeType||11===e.nodeType)}function extend(){const e=Object(arguments.length<=0?void 0:arguments[0]),t=["__proto__","constructor","prototype"];for(let n=1;n<arguments.length;n+=1){const r=n<0||arguments.length<=n?void 0:arguments[n];if(null!=r&&!isNode(r)){const n=Object.keys(Object(r)).filter((e=>t.indexOf(e)<0));for(let t=0,o=n.length;t<o;t+=1){const o=n[t],l=Object.getOwnPropertyDescriptor(r,o);void 0!==l&&l.enumerable&&(isObject(e[o])&&isObject(r[o])?r[o].__swiper__?e[o]=r[o]:extend(e[o],r[o]):!isObject(e[o])&&isObject(r[o])?(e[o]={},r[o].__swiper__?e[o]=r[o]:extend(e[o],r[o])):e[o]=r[o]);}}}return e}function setCSSProperty(e,t,n){e.style.setProperty(t,n);}function animateCSSModeScroll(e){let{swiper:t,targetPosition:n,side:r}=e;const o=getWindow(),l=-t.translate;let s,i=null;const a=t.params.speed;t.wrapperEl.style.scrollSnapType="none",o.cancelAnimationFrame(t.cssModeFrameID);const c=n>l?"next":"prev",m=(e,t)=>"next"===c&&e>=t||"prev"===c&&e<=t,u=()=>{s=(new Date).getTime(),null===i&&(i=s);const e=Math.max(Math.min((s-i)/a,1),0),c=.5-Math.cos(e*Math.PI)/2;let p=l+c*(n-l);if(m(p,n)&&(p=n),t.wrapperEl.scrollTo({[r]:p}),m(p,n))return t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.scrollSnapType="",setTimeout((()=>{t.wrapperEl.style.overflow="",t.wrapperEl.scrollTo({[r]:p});})),void o.cancelAnimationFrame(t.cssModeFrameID);t.cssModeFrameID=o.requestAnimationFrame(u);};u();}function getSlideTransformEl(e){return e.querySelector(".swiper-slide-transform")||e.shadowRoot&&e.shadowRoot.querySelector(".swiper-slide-transform")||e}function elementChildren(e,t){return void 0===t&&(t=""),[...e.children].filter((e=>e.matches(t)))}function createElement(e,t){void 0===t&&(t=[]);const n=document.createElement(e);return n.classList.add(...Array.isArray(t)?t:[t]),n}function elementOffset(e){const t=getWindow(),n=getDocument(),r=e.getBoundingClientRect(),o=n.body,l=e.clientTop||o.clientTop||0,s=e.clientLeft||o.clientLeft||0,i=e===t?t.scrollY:e.scrollTop,a=e===t?t.scrollX:e.scrollLeft;return {top:r.top+i-l,left:r.left+a-s}}function elementPrevAll(e,t){const n=[];for(;e.previousElementSibling;){const r=e.previousElementSibling;t?r.matches(t)&&n.push(r):n.push(r),e=r;}return n}function elementNextAll(e,t){const n=[];for(;e.nextElementSibling;){const r=e.nextElementSibling;t?r.matches(t)&&n.push(r):n.push(r),e=r;}return n}function elementStyle(e,t){return getWindow().getComputedStyle(e,null).getPropertyValue(t)}function elementIndex(e){let t,n=e;if(n){for(t=0;null!==(n=n.previousSibling);)1===n.nodeType&&(t+=1);return t}}function elementParents(e,t){const n=[];let r=e.parentElement;for(;r;)t?r.matches(t)&&n.push(r):n.push(r),r=r.parentElement;return n}function elementTransitionEnd(e,t){t&&e.addEventListener("transitionend",(function n(r){r.target===e&&(t.call(e,r),e.removeEventListener("transitionend",n));}));}function elementOuterSize(e,t,n){const r=getWindow();return n?e["width"===t?"offsetWidth":"offsetHeight"]+parseFloat(r.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-right":"margin-top"))+parseFloat(r.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-left":"margin-bottom")):e.offsetWidth}

  let support,deviceCached,browser;function calcSupport(){const e=getWindow(),t=getDocument();return {smoothScroll:t.documentElement&&t.documentElement.style&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch)}}function getSupport(){return support||(support=calcSupport()),support}function calcDevice(e){let{userAgent:t}=void 0===e?{}:e;const s=getSupport(),i=getWindow(),r=i.navigator.platform,a=t||i.navigator.userAgent,n={ios:!1,android:!1},l=i.screen.width,o=i.screen.height,d=a.match(/(Android);?[\s\/]+([\d.]+)?/);let c=a.match(/(iPad).*OS\s([\d_]+)/);const p=a.match(/(iPod)(.*OS\s([\d_]+))?/),u=!c&&a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),h="Win32"===r;let m="MacIntel"===r;return !c&&m&&s.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${l}x${o}`)>=0&&(c=a.match(/(Version)\/([\d.]+)/),c||(c=[0,1,"13_0_0"]),m=!1),d&&!h&&(n.os="android",n.android=!0),(c||u||p)&&(n.os="ios",n.ios=!0),n}function getDevice(e){return void 0===e&&(e={}),deviceCached||(deviceCached=calcDevice(e)),deviceCached}function calcBrowser(){const e=getWindow();let t=!1;function s(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}if(s()){const s=String(e.navigator.userAgent);if(s.includes("Version/")){const[e,i]=s.split("Version/")[1].split(" ")[0].split(".").map((e=>Number(e)));t=e<16||16===e&&i<2;}}return {isSafari:t||s(),needPerspectiveFix:t,isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}function getBrowser(){return browser||(browser=calcBrowser()),browser}function Resize(e){let{swiper:t,on:s,emit:i}=e;const r=getWindow();let a=null,n=null;const l=()=>{t&&!t.destroyed&&t.initialized&&(i("beforeResize"),i("resize"));},o=()=>{t&&!t.destroyed&&t.initialized&&i("orientationchange");};s("init",(()=>{t.params.resizeObserver&&void 0!==r.ResizeObserver?t&&!t.destroyed&&t.initialized&&(a=new ResizeObserver((e=>{n=r.requestAnimationFrame((()=>{const{width:s,height:i}=t;let r=s,a=i;e.forEach((e=>{let{contentBoxSize:s,contentRect:i,target:n}=e;n&&n!==t.el||(r=i?i.width:(s[0]||s).inlineSize,a=i?i.height:(s[0]||s).blockSize);})),r===s&&a===i||l();}));})),a.observe(t.el)):(r.addEventListener("resize",l),r.addEventListener("orientationchange",o));})),s("destroy",(()=>{n&&r.cancelAnimationFrame(n),a&&a.unobserve&&t.el&&(a.unobserve(t.el),a=null),r.removeEventListener("resize",l),r.removeEventListener("orientationchange",o);}));}function Observer(e){let{swiper:t,extendParams:s,on:i,emit:r}=e;const a=[],n=getWindow(),l=function(e,s){void 0===s&&(s={});const i=new(n.MutationObserver||n.WebkitMutationObserver)((e=>{if(t.__preventObserver__)return;if(1===e.length)return void r("observerUpdate",e[0]);const s=function(){r("observerUpdate",e[0]);};n.requestAnimationFrame?n.requestAnimationFrame(s):n.setTimeout(s,0);}));i.observe(e,{attributes:void 0===s.attributes||s.attributes,childList:void 0===s.childList||s.childList,characterData:void 0===s.characterData||s.characterData}),a.push(i);};s({observer:!1,observeParents:!1,observeSlideChildren:!1}),i("init",(()=>{if(t.params.observer){if(t.params.observeParents){const e=elementParents(t.el);for(let t=0;t<e.length;t+=1)l(e[t]);}l(t.el,{childList:t.params.observeSlideChildren}),l(t.wrapperEl,{attributes:!1});}})),i("destroy",(()=>{a.forEach((e=>{e.disconnect();})),a.splice(0,a.length);}));}var eventsEmitter={on(e,t,s){const i=this;if(!i.eventsListeners||i.destroyed)return i;if("function"!=typeof t)return i;const r=s?"unshift":"push";return e.split(" ").forEach((e=>{i.eventsListeners[e]||(i.eventsListeners[e]=[]),i.eventsListeners[e][r](t);})),i},once(e,t,s){const i=this;if(!i.eventsListeners||i.destroyed)return i;if("function"!=typeof t)return i;function r(){i.off(e,r),r.__emitterProxy&&delete r.__emitterProxy;for(var s=arguments.length,a=new Array(s),n=0;n<s;n++)a[n]=arguments[n];t.apply(i,a);}return r.__emitterProxy=t,i.on(e,r,s)},onAny(e,t){const s=this;if(!s.eventsListeners||s.destroyed)return s;if("function"!=typeof e)return s;const i=t?"unshift":"push";return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[i](e),s},offAny(e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsAnyListeners)return t;const s=t.eventsAnyListeners.indexOf(e);return s>=0&&t.eventsAnyListeners.splice(s,1),t},off(e,t){const s=this;return !s.eventsListeners||s.destroyed?s:s.eventsListeners?(e.split(" ").forEach((e=>{void 0===t?s.eventsListeners[e]=[]:s.eventsListeners[e]&&s.eventsListeners[e].forEach(((i,r)=>{(i===t||i.__emitterProxy&&i.__emitterProxy===t)&&s.eventsListeners[e].splice(r,1);}));})),s):s},emit(){const e=this;if(!e.eventsListeners||e.destroyed)return e;if(!e.eventsListeners)return e;let t,s,i;for(var r=arguments.length,a=new Array(r),n=0;n<r;n++)a[n]=arguments[n];"string"==typeof a[0]||Array.isArray(a[0])?(t=a[0],s=a.slice(1,a.length),i=e):(t=a[0].events,s=a[0].data,i=a[0].context||e),s.unshift(i);return (Array.isArray(t)?t:t.split(" ")).forEach((t=>{e.eventsAnyListeners&&e.eventsAnyListeners.length&&e.eventsAnyListeners.forEach((e=>{e.apply(i,[t,...s]);})),e.eventsListeners&&e.eventsListeners[t]&&e.eventsListeners[t].forEach((e=>{e.apply(i,s);}));})),e}};function updateSize(){const e=this;let t,s;const i=e.el;t=void 0!==e.params.width&&null!==e.params.width?e.params.width:i.clientWidth,s=void 0!==e.params.height&&null!==e.params.height?e.params.height:i.clientHeight,0===t&&e.isHorizontal()||0===s&&e.isVertical()||(t=t-parseInt(elementStyle(i,"padding-left")||0,10)-parseInt(elementStyle(i,"padding-right")||0,10),s=s-parseInt(elementStyle(i,"padding-top")||0,10)-parseInt(elementStyle(i,"padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:t,height:s,size:e.isHorizontal()?t:s}));}function updateSlides(){const e=this;function t(t){return e.isHorizontal()?t:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[t]}function s(e,s){return parseFloat(e.getPropertyValue(t(s))||0)}const i=e.params,{wrapperEl:r,slidesEl:a,size:n,rtlTranslate:l,wrongRTL:o}=e,d=e.virtual&&i.virtual.enabled,c=d?e.virtual.slides.length:e.slides.length,p=elementChildren(a,`.${e.params.slideClass}, swiper-slide`),u=d?e.virtual.slides.length:p.length;let h=[];const m=[],f=[];let v=i.slidesOffsetBefore;"function"==typeof v&&(v=i.slidesOffsetBefore.call(e));let g=i.slidesOffsetAfter;"function"==typeof g&&(g=i.slidesOffsetAfter.call(e));const w=e.snapGrid.length,S=e.slidesGrid.length;let T=i.spaceBetween,b=-v,x=0,y=0;if(void 0===n)return;"string"==typeof T&&T.indexOf("%")>=0?T=parseFloat(T.replace("%",""))/100*n:"string"==typeof T&&(T=parseFloat(T)),e.virtualSize=-T,p.forEach((e=>{l?e.style.marginLeft="":e.style.marginRight="",e.style.marginBottom="",e.style.marginTop="";})),i.centeredSlides&&i.cssMode&&(setCSSProperty(r,"--swiper-centered-offset-before",""),setCSSProperty(r,"--swiper-centered-offset-after",""));const C=i.grid&&i.grid.rows>1&&e.grid;let E;C&&e.grid.initSlides(u);const M="auto"===i.slidesPerView&&i.breakpoints&&Object.keys(i.breakpoints).filter((e=>void 0!==i.breakpoints[e].slidesPerView)).length>0;for(let r=0;r<u;r+=1){let a;if(E=0,p[r]&&(a=p[r]),C&&e.grid.updateSlide(r,a,u,t),!p[r]||"none"!==elementStyle(a,"display")){if("auto"===i.slidesPerView){M&&(p[r].style[t("width")]="");const n=getComputedStyle(a),l=a.style.transform,o=a.style.webkitTransform;if(l&&(a.style.transform="none"),o&&(a.style.webkitTransform="none"),i.roundLengths)E=e.isHorizontal()?elementOuterSize(a,"width",!0):elementOuterSize(a,"height",!0);else {const e=s(n,"width"),t=s(n,"padding-left"),i=s(n,"padding-right"),r=s(n,"margin-left"),l=s(n,"margin-right"),o=n.getPropertyValue("box-sizing");if(o&&"border-box"===o)E=e+r+l;else {const{clientWidth:s,offsetWidth:n}=a;E=e+t+i+r+l+(n-s);}}l&&(a.style.transform=l),o&&(a.style.webkitTransform=o),i.roundLengths&&(E=Math.floor(E));}else E=(n-(i.slidesPerView-1)*T)/i.slidesPerView,i.roundLengths&&(E=Math.floor(E)),p[r]&&(p[r].style[t("width")]=`${E}px`);p[r]&&(p[r].swiperSlideSize=E),f.push(E),i.centeredSlides?(b=b+E/2+x/2+T,0===x&&0!==r&&(b=b-n/2-T),0===r&&(b=b-n/2-T),Math.abs(b)<.001&&(b=0),i.roundLengths&&(b=Math.floor(b)),y%i.slidesPerGroup==0&&h.push(b),m.push(b)):(i.roundLengths&&(b=Math.floor(b)),(y-Math.min(e.params.slidesPerGroupSkip,y))%e.params.slidesPerGroup==0&&h.push(b),m.push(b),b=b+E+T),e.virtualSize+=E+T,x=E,y+=1;}}if(e.virtualSize=Math.max(e.virtualSize,n)+g,l&&o&&("slide"===i.effect||"coverflow"===i.effect)&&(r.style.width=`${e.virtualSize+T}px`),i.setWrapperSize&&(r.style[t("width")]=`${e.virtualSize+T}px`),C&&e.grid.updateWrapperSize(E,h,t),!i.centeredSlides){const t=[];for(let s=0;s<h.length;s+=1){let r=h[s];i.roundLengths&&(r=Math.floor(r)),h[s]<=e.virtualSize-n&&t.push(r);}h=t,Math.floor(e.virtualSize-n)-Math.floor(h[h.length-1])>1&&h.push(e.virtualSize-n);}if(d&&i.loop){const t=f[0]+T;if(i.slidesPerGroup>1){const s=Math.ceil((e.virtual.slidesBefore+e.virtual.slidesAfter)/i.slidesPerGroup),r=t*i.slidesPerGroup;for(let e=0;e<s;e+=1)h.push(h[h.length-1]+r);}for(let s=0;s<e.virtual.slidesBefore+e.virtual.slidesAfter;s+=1)1===i.slidesPerGroup&&h.push(h[h.length-1]+t),m.push(m[m.length-1]+t),e.virtualSize+=t;}if(0===h.length&&(h=[0]),0!==T){const s=e.isHorizontal()&&l?"marginLeft":t("marginRight");p.filter(((e,t)=>!(i.cssMode&&!i.loop)||t!==p.length-1)).forEach((e=>{e.style[s]=`${T}px`;}));}if(i.centeredSlides&&i.centeredSlidesBounds){let e=0;f.forEach((t=>{e+=t+(T||0);})),e-=T;const t=e-n;h=h.map((e=>e<=0?-v:e>t?t+g:e));}if(i.centerInsufficientSlides){let e=0;if(f.forEach((t=>{e+=t+(T||0);})),e-=T,e<n){const t=(n-e)/2;h.forEach(((e,s)=>{h[s]=e-t;})),m.forEach(((e,s)=>{m[s]=e+t;}));}}if(Object.assign(e,{slides:p,snapGrid:h,slidesGrid:m,slidesSizesGrid:f}),i.centeredSlides&&i.cssMode&&!i.centeredSlidesBounds){setCSSProperty(r,"--swiper-centered-offset-before",-h[0]+"px"),setCSSProperty(r,"--swiper-centered-offset-after",e.size/2-f[f.length-1]/2+"px");const t=-e.snapGrid[0],s=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map((e=>e+t)),e.slidesGrid=e.slidesGrid.map((e=>e+s));}if(u!==c&&e.emit("slidesLengthChange"),h.length!==w&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),m.length!==S&&e.emit("slidesGridLengthChange"),i.watchSlidesProgress&&e.updateSlidesOffset(),!(d||i.cssMode||"slide"!==i.effect&&"fade"!==i.effect)){const t=`${i.containerModifierClass}backface-hidden`,s=e.el.classList.contains(t);u<=i.maxBackfaceHiddenSlides?s||e.el.classList.add(t):s&&e.el.classList.remove(t);}}function updateAutoHeight(e){const t=this,s=[],i=t.virtual&&t.params.virtual.enabled;let r,a=0;"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const n=e=>i?t.slides[t.getSlideIndexByData(e)]:t.slides[e];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)(t.visibleSlides||[]).forEach((e=>{s.push(e);}));else for(r=0;r<Math.ceil(t.params.slidesPerView);r+=1){const e=t.activeIndex+r;if(e>t.slides.length&&!i)break;s.push(n(e));}else s.push(n(t.activeIndex));for(r=0;r<s.length;r+=1)if(void 0!==s[r]){const e=s[r].offsetHeight;a=e>a?e:a;}(a||0===a)&&(t.wrapperEl.style.height=`${a}px`);}function updateSlidesOffset(){const e=this,t=e.slides,s=e.isElement?e.isHorizontal()?e.wrapperEl.offsetLeft:e.wrapperEl.offsetTop:0;for(let i=0;i<t.length;i+=1)t[i].swiperSlideOffset=(e.isHorizontal()?t[i].offsetLeft:t[i].offsetTop)-s-e.cssOverflowAdjustment();}function updateSlidesProgress(e){void 0===e&&(e=this&&this.translate||0);const t=this,s=t.params,{slides:i,rtlTranslate:r,snapGrid:a}=t;if(0===i.length)return;void 0===i[0].swiperSlideOffset&&t.updateSlidesOffset();let n=-e;r&&(n=e),i.forEach((e=>{e.classList.remove(s.slideVisibleClass);})),t.visibleSlidesIndexes=[],t.visibleSlides=[];let l=s.spaceBetween;"string"==typeof l&&l.indexOf("%")>=0?l=parseFloat(l.replace("%",""))/100*t.size:"string"==typeof l&&(l=parseFloat(l));for(let e=0;e<i.length;e+=1){const o=i[e];let d=o.swiperSlideOffset;s.cssMode&&s.centeredSlides&&(d-=i[0].swiperSlideOffset);const c=(n+(s.centeredSlides?t.minTranslate():0)-d)/(o.swiperSlideSize+l),p=(n-a[0]+(s.centeredSlides?t.minTranslate():0)-d)/(o.swiperSlideSize+l),u=-(n-d),h=u+t.slidesSizesGrid[e];(u>=0&&u<t.size-1||h>1&&h<=t.size||u<=0&&h>=t.size)&&(t.visibleSlides.push(o),t.visibleSlidesIndexes.push(e),i[e].classList.add(s.slideVisibleClass)),o.progress=r?-c:c,o.originalProgress=r?-p:p;}}function updateProgress(e){const t=this;if(void 0===e){const s=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*s||0;}const s=t.params,i=t.maxTranslate()-t.minTranslate();let{progress:r,isBeginning:a,isEnd:n,progressLoop:l}=t;const o=a,d=n;if(0===i)r=0,a=!0,n=!0;else {r=(e-t.minTranslate())/i;const s=Math.abs(e-t.minTranslate())<1,l=Math.abs(e-t.maxTranslate())<1;a=s||r<=0,n=l||r>=1,s&&(r=0),l&&(r=1);}if(s.loop){const s=t.getSlideIndexByData(0),i=t.getSlideIndexByData(t.slides.length-1),r=t.slidesGrid[s],a=t.slidesGrid[i],n=t.slidesGrid[t.slidesGrid.length-1],o=Math.abs(e);l=o>=r?(o-r)/n:(o+n-a)/n,l>1&&(l-=1);}Object.assign(t,{progress:r,progressLoop:l,isBeginning:a,isEnd:n}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&t.updateSlidesProgress(e),a&&!o&&t.emit("reachBeginning toEdge"),n&&!d&&t.emit("reachEnd toEdge"),(o&&!a||d&&!n)&&t.emit("fromEdge"),t.emit("progress",r);}function updateSlidesClasses(){const e=this,{slides:t,params:s,slidesEl:i,activeIndex:r}=e,a=e.virtual&&s.virtual.enabled,n=e=>elementChildren(i,`.${s.slideClass}${e}, swiper-slide${e}`)[0];let l;if(t.forEach((e=>{e.classList.remove(s.slideActiveClass,s.slideNextClass,s.slidePrevClass);})),a)if(s.loop){let t=r-e.virtual.slidesBefore;t<0&&(t=e.virtual.slides.length+t),t>=e.virtual.slides.length&&(t-=e.virtual.slides.length),l=n(`[data-swiper-slide-index="${t}"]`);}else l=n(`[data-swiper-slide-index="${r}"]`);else l=t[r];if(l){l.classList.add(s.slideActiveClass);let e=elementNextAll(l,`.${s.slideClass}, swiper-slide`)[0];s.loop&&!e&&(e=t[0]),e&&e.classList.add(s.slideNextClass);let i=elementPrevAll(l,`.${s.slideClass}, swiper-slide`)[0];s.loop&&0===!i&&(i=t[t.length-1]),i&&i.classList.add(s.slidePrevClass);}e.emitSlidesClasses();}const processLazyPreloader=(e,t)=>{if(!e||e.destroyed||!e.params)return;const s=t.closest(e.isElement?"swiper-slide":`.${e.params.slideClass}`);if(s){const t=s.querySelector(`.${e.params.lazyPreloaderClass}`);t&&t.remove();}},unlazy=(e,t)=>{if(!e.slides[t])return;const s=e.slides[t].querySelector('[loading="lazy"]');s&&s.removeAttribute("loading");},preload=e=>{if(!e||e.destroyed||!e.params)return;let t=e.params.lazyPreloadPrevNext;const s=e.slides.length;if(!s||!t||t<0)return;t=Math.min(t,s);const i="auto"===e.params.slidesPerView?e.slidesPerViewDynamic():Math.ceil(e.params.slidesPerView),r=e.activeIndex;if(e.params.grid&&e.params.grid.rows>1){const s=r,a=[s-t];return a.push(...Array.from({length:t}).map(((e,t)=>s+i+t))),void e.slides.forEach(((t,s)=>{a.includes(t.column)&&unlazy(e,s);}))}const a=r+i-1;if(e.params.rewind||e.params.loop)for(let i=r-t;i<=a+t;i+=1){const t=(i%s+s)%s;(t<r||t>a)&&unlazy(e,t);}else for(let i=Math.max(r-t,0);i<=Math.min(a+t,s-1);i+=1)i!==r&&(i>a||i<r)&&unlazy(e,i);};function getActiveIndexByTranslate(e){const{slidesGrid:t,params:s}=e,i=e.rtlTranslate?e.translate:-e.translate;let r;for(let e=0;e<t.length;e+=1)void 0!==t[e+1]?i>=t[e]&&i<t[e+1]-(t[e+1]-t[e])/2?r=e:i>=t[e]&&i<t[e+1]&&(r=e+1):i>=t[e]&&(r=e);return s.normalizeSlideIndex&&(r<0||void 0===r)&&(r=0),r}function updateActiveIndex(e){const t=this,s=t.rtlTranslate?t.translate:-t.translate,{snapGrid:i,params:r,activeIndex:a,realIndex:n,snapIndex:l}=t;let o,d=e;const c=e=>{let s=e-t.virtual.slidesBefore;return s<0&&(s=t.virtual.slides.length+s),s>=t.virtual.slides.length&&(s-=t.virtual.slides.length),s};if(void 0===d&&(d=getActiveIndexByTranslate(t)),i.indexOf(s)>=0)o=i.indexOf(s);else {const e=Math.min(r.slidesPerGroupSkip,d);o=e+Math.floor((d-e)/r.slidesPerGroup);}if(o>=i.length&&(o=i.length-1),d===a)return o!==l&&(t.snapIndex=o,t.emit("snapIndexChange")),void(t.params.loop&&t.virtual&&t.params.virtual.enabled&&(t.realIndex=c(d)));let p;p=t.virtual&&r.virtual.enabled&&r.loop?c(d):t.slides[d]?parseInt(t.slides[d].getAttribute("data-swiper-slide-index")||d,10):d,Object.assign(t,{previousSnapIndex:l,snapIndex:o,previousRealIndex:n,realIndex:p,previousIndex:a,activeIndex:d}),t.initialized&&preload(t),t.emit("activeIndexChange"),t.emit("snapIndexChange"),n!==p&&t.emit("realIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&t.emit("slideChange");}function updateClickedSlide(e){const t=this,s=t.params,i=e.closest(`.${s.slideClass}, swiper-slide`);let r,a=!1;if(i)for(let e=0;e<t.slides.length;e+=1)if(t.slides[e]===i){a=!0,r=e;break}if(!i||!a)return t.clickedSlide=void 0,void(t.clickedIndex=void 0);t.clickedSlide=i,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(i.getAttribute("data-swiper-slide-index"),10):t.clickedIndex=r,s.slideToClickedSlide&&void 0!==t.clickedIndex&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide();}var update={updateSize:updateSize,updateSlides:updateSlides,updateAutoHeight:updateAutoHeight,updateSlidesOffset:updateSlidesOffset,updateSlidesProgress:updateSlidesProgress,updateProgress:updateProgress,updateSlidesClasses:updateSlidesClasses,updateActiveIndex:updateActiveIndex,updateClickedSlide:updateClickedSlide};function getSwiperTranslate(e){void 0===e&&(e=this.isHorizontal()?"x":"y");const{params:t,rtlTranslate:s,translate:i,wrapperEl:r}=this;if(t.virtualTranslate)return s?-i:i;if(t.cssMode)return i;let a=getTranslate(r,e);return a+=this.cssOverflowAdjustment(),s&&(a=-a),a||0}function setTranslate(e,t){const s=this,{rtlTranslate:i,params:r,wrapperEl:a,progress:n}=s;let l=0,o=0;let d;s.isHorizontal()?l=i?-e:e:o=e,r.roundLengths&&(l=Math.floor(l),o=Math.floor(o)),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?l:o,r.cssMode?a[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-l:-o:r.virtualTranslate||(s.isHorizontal()?l-=s.cssOverflowAdjustment():o-=s.cssOverflowAdjustment(),a.style.transform=`translate3d(${l}px, ${o}px, 0px)`);const c=s.maxTranslate()-s.minTranslate();d=0===c?0:(e-s.minTranslate())/c,d!==n&&s.updateProgress(e),s.emit("setTranslate",s.translate,t);}function minTranslate(){return -this.snapGrid[0]}function maxTranslate(){return -this.snapGrid[this.snapGrid.length-1]}function translateTo(e,t,s,i,r){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),void 0===i&&(i=!0);const a=this,{params:n,wrapperEl:l}=a;if(a.animating&&n.preventInteractionOnTransition)return !1;const o=a.minTranslate(),d=a.maxTranslate();let c;if(c=i&&e>o?o:i&&e<d?d:e,a.updateProgress(c),n.cssMode){const e=a.isHorizontal();if(0===t)l[e?"scrollLeft":"scrollTop"]=-c;else {if(!a.support.smoothScroll)return animateCSSModeScroll({swiper:a,targetPosition:-c,side:e?"left":"top"}),!0;l.scrollTo({[e?"left":"top"]:-c,behavior:"smooth"});}return !0}return 0===t?(a.setTransition(0),a.setTranslate(c),s&&(a.emit("beforeTransitionStart",t,r),a.emit("transitionEnd"))):(a.setTransition(t),a.setTranslate(c),s&&(a.emit("beforeTransitionStart",t,r),a.emit("transitionStart")),a.animating||(a.animating=!0,a.onTranslateToWrapperTransitionEnd||(a.onTranslateToWrapperTransitionEnd=function(e){a&&!a.destroyed&&e.target===this&&(a.wrapperEl.removeEventListener("transitionend",a.onTranslateToWrapperTransitionEnd),a.onTranslateToWrapperTransitionEnd=null,delete a.onTranslateToWrapperTransitionEnd,s&&a.emit("transitionEnd"));}),a.wrapperEl.addEventListener("transitionend",a.onTranslateToWrapperTransitionEnd))),!0}var translate={getTranslate:getSwiperTranslate,setTranslate:setTranslate,minTranslate:minTranslate,maxTranslate:maxTranslate,translateTo:translateTo};function setTransition(e,t){const s=this;s.params.cssMode||(s.wrapperEl.style.transitionDuration=`${e}ms`),s.emit("setTransition",e,t);}function transitionEmit(e){let{swiper:t,runCallbacks:s,direction:i,step:r}=e;const{activeIndex:a,previousIndex:n}=t;let l=i;if(l||(l=a>n?"next":a<n?"prev":"reset"),t.emit(`transition${r}`),s&&a!==n){if("reset"===l)return void t.emit(`slideResetTransition${r}`);t.emit(`slideChangeTransition${r}`),"next"===l?t.emit(`slideNextTransition${r}`):t.emit(`slidePrevTransition${r}`);}}function transitionStart(e,t){void 0===e&&(e=!0);const s=this,{params:i}=s;i.cssMode||(i.autoHeight&&s.updateAutoHeight(),transitionEmit({swiper:s,runCallbacks:e,direction:t,step:"Start"}));}function transitionEnd(e,t){void 0===e&&(e=!0);const s=this,{params:i}=s;s.animating=!1,i.cssMode||(s.setTransition(0),transitionEmit({swiper:s,runCallbacks:e,direction:t,step:"End"}));}var transition={setTransition:setTransition,transitionStart:transitionStart,transitionEnd:transitionEnd};function slideTo(e,t,s,i,r){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"string"==typeof e&&(e=parseInt(e,10));const a=this;let n=e;n<0&&(n=0);const{params:l,snapGrid:o,slidesGrid:d,previousIndex:c,activeIndex:p,rtlTranslate:u,wrapperEl:h,enabled:m}=a;if(a.animating&&l.preventInteractionOnTransition||!m&&!i&&!r)return !1;const f=Math.min(a.params.slidesPerGroupSkip,n);let v=f+Math.floor((n-f)/a.params.slidesPerGroup);v>=o.length&&(v=o.length-1);const g=-o[v];if(l.normalizeSlideIndex)for(let e=0;e<d.length;e+=1){const t=-Math.floor(100*g),s=Math.floor(100*d[e]),i=Math.floor(100*d[e+1]);void 0!==d[e+1]?t>=s&&t<i-(i-s)/2?n=e:t>=s&&t<i&&(n=e+1):t>=s&&(n=e);}if(a.initialized&&n!==p){if(!a.allowSlideNext&&(u?g>a.translate&&g>a.minTranslate():g<a.translate&&g<a.minTranslate()))return !1;if(!a.allowSlidePrev&&g>a.translate&&g>a.maxTranslate()&&(p||0)!==n)return !1}let w;if(n!==(c||0)&&s&&a.emit("beforeSlideChangeStart"),a.updateProgress(g),w=n>p?"next":n<p?"prev":"reset",u&&-g===a.translate||!u&&g===a.translate)return a.updateActiveIndex(n),l.autoHeight&&a.updateAutoHeight(),a.updateSlidesClasses(),"slide"!==l.effect&&a.setTranslate(g),"reset"!==w&&(a.transitionStart(s,w),a.transitionEnd(s,w)),!1;if(l.cssMode){const e=a.isHorizontal(),s=u?g:-g;if(0===t){const t=a.virtual&&a.params.virtual.enabled;t&&(a.wrapperEl.style.scrollSnapType="none",a._immediateVirtual=!0),t&&!a._cssModeVirtualInitialSet&&a.params.initialSlide>0?(a._cssModeVirtualInitialSet=!0,requestAnimationFrame((()=>{h[e?"scrollLeft":"scrollTop"]=s;}))):h[e?"scrollLeft":"scrollTop"]=s,t&&requestAnimationFrame((()=>{a.wrapperEl.style.scrollSnapType="",a._immediateVirtual=!1;}));}else {if(!a.support.smoothScroll)return animateCSSModeScroll({swiper:a,targetPosition:s,side:e?"left":"top"}),!0;h.scrollTo({[e?"left":"top"]:s,behavior:"smooth"});}return !0}return a.setTransition(t),a.setTranslate(g),a.updateActiveIndex(n),a.updateSlidesClasses(),a.emit("beforeTransitionStart",t,i),a.transitionStart(s,w),0===t?a.transitionEnd(s,w):a.animating||(a.animating=!0,a.onSlideToWrapperTransitionEnd||(a.onSlideToWrapperTransitionEnd=function(e){a&&!a.destroyed&&e.target===this&&(a.wrapperEl.removeEventListener("transitionend",a.onSlideToWrapperTransitionEnd),a.onSlideToWrapperTransitionEnd=null,delete a.onSlideToWrapperTransitionEnd,a.transitionEnd(s,w));}),a.wrapperEl.addEventListener("transitionend",a.onSlideToWrapperTransitionEnd)),!0}function slideToLoop(e,t,s,i){if(void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"string"==typeof e){e=parseInt(e,10);}const r=this;let a=e;return r.params.loop&&(r.virtual&&r.params.virtual.enabled?a+=r.virtual.slidesBefore:a=r.getSlideIndexByData(a)),r.slideTo(a,t,s,i)}function slideNext(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const i=this,{enabled:r,params:a,animating:n}=i;if(!r)return i;let l=a.slidesPerGroup;"auto"===a.slidesPerView&&1===a.slidesPerGroup&&a.slidesPerGroupAuto&&(l=Math.max(i.slidesPerViewDynamic("current",!0),1));const o=i.activeIndex<a.slidesPerGroupSkip?1:l,d=i.virtual&&a.virtual.enabled;if(a.loop){if(n&&!d&&a.loopPreventsSliding)return !1;i.loopFix({direction:"next"}),i._clientLeft=i.wrapperEl.clientLeft;}return a.rewind&&i.isEnd?i.slideTo(0,e,t,s):i.slideTo(i.activeIndex+o,e,t,s)}function slidePrev(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const i=this,{params:r,snapGrid:a,slidesGrid:n,rtlTranslate:l,enabled:o,animating:d}=i;if(!o)return i;const c=i.virtual&&r.virtual.enabled;if(r.loop){if(d&&!c&&r.loopPreventsSliding)return !1;i.loopFix({direction:"prev"}),i._clientLeft=i.wrapperEl.clientLeft;}function p(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const u=p(l?i.translate:-i.translate),h=a.map((e=>p(e)));let m=a[h.indexOf(u)-1];if(void 0===m&&r.cssMode){let e;a.forEach(((t,s)=>{u>=t&&(e=s);})),void 0!==e&&(m=a[e>0?e-1:e]);}let f=0;if(void 0!==m&&(f=n.indexOf(m),f<0&&(f=i.activeIndex-1),"auto"===r.slidesPerView&&1===r.slidesPerGroup&&r.slidesPerGroupAuto&&(f=f-i.slidesPerViewDynamic("previous",!0)+1,f=Math.max(f,0))),r.rewind&&i.isBeginning){const r=i.params.virtual&&i.params.virtual.enabled&&i.virtual?i.virtual.slides.length-1:i.slides.length-1;return i.slideTo(r,e,t,s)}return i.slideTo(f,e,t,s)}function slideReset(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);return this.slideTo(this.activeIndex,e,t,s)}function slideToClosest(e,t,s,i){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),void 0===i&&(i=.5);const r=this;let a=r.activeIndex;const n=Math.min(r.params.slidesPerGroupSkip,a),l=n+Math.floor((a-n)/r.params.slidesPerGroup),o=r.rtlTranslate?r.translate:-r.translate;if(o>=r.snapGrid[l]){const e=r.snapGrid[l];o-e>(r.snapGrid[l+1]-e)*i&&(a+=r.params.slidesPerGroup);}else {const e=r.snapGrid[l-1];o-e<=(r.snapGrid[l]-e)*i&&(a-=r.params.slidesPerGroup);}return a=Math.max(a,0),a=Math.min(a,r.slidesGrid.length-1),r.slideTo(a,e,t,s)}function slideToClickedSlide(){const e=this,{params:t,slidesEl:s}=e,i="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let r,a=e.clickedIndex;const n=e.isElement?"swiper-slide":`.${t.slideClass}`;if(t.loop){if(e.animating)return;r=parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10),t.centeredSlides?a<e.loopedSlides-i/2||a>e.slides.length-e.loopedSlides+i/2?(e.loopFix(),a=e.getSlideIndex(elementChildren(s,`${n}[data-swiper-slide-index="${r}"]`)[0]),nextTick((()=>{e.slideTo(a);}))):e.slideTo(a):a>e.slides.length-i?(e.loopFix(),a=e.getSlideIndex(elementChildren(s,`${n}[data-swiper-slide-index="${r}"]`)[0]),nextTick((()=>{e.slideTo(a);}))):e.slideTo(a);}else e.slideTo(a);}var slide={slideTo:slideTo,slideToLoop:slideToLoop,slideNext:slideNext,slidePrev:slidePrev,slideReset:slideReset,slideToClosest:slideToClosest,slideToClickedSlide:slideToClickedSlide};function loopCreate(e){const t=this,{params:s,slidesEl:i}=t;if(!s.loop||t.virtual&&t.params.virtual.enabled)return;elementChildren(i,`.${s.slideClass}, swiper-slide`).forEach(((e,t)=>{e.setAttribute("data-swiper-slide-index",t);})),t.loopFix({slideRealIndex:e,direction:s.centeredSlides?void 0:"next"});}function loopFix(e){let{slideRealIndex:t,slideTo:s=!0,direction:i,setTranslate:r,activeSlideIndex:a,byController:n,byMousewheel:l}=void 0===e?{}:e;const o=this;if(!o.params.loop)return;o.emit("beforeLoopFix");const{slides:d,allowSlidePrev:c,allowSlideNext:p,slidesEl:u,params:h}=o;if(o.allowSlidePrev=!0,o.allowSlideNext=!0,o.virtual&&h.virtual.enabled)return s&&(h.centeredSlides||0!==o.snapIndex?h.centeredSlides&&o.snapIndex<h.slidesPerView?o.slideTo(o.virtual.slides.length+o.snapIndex,0,!1,!0):o.snapIndex===o.snapGrid.length-1&&o.slideTo(o.virtual.slidesBefore,0,!1,!0):o.slideTo(o.virtual.slides.length,0,!1,!0)),o.allowSlidePrev=c,o.allowSlideNext=p,void o.emit("loopFix");const m="auto"===h.slidesPerView?o.slidesPerViewDynamic():Math.ceil(parseFloat(h.slidesPerView,10));let f=h.loopedSlides||m;f%h.slidesPerGroup!=0&&(f+=h.slidesPerGroup-f%h.slidesPerGroup),o.loopedSlides=f;const v=[],g=[];let w=o.activeIndex;void 0===a?a=o.getSlideIndex(o.slides.filter((e=>e.classList.contains(h.slideActiveClass)))[0]):w=a;const S="next"===i||!i,T="prev"===i||!i;let b=0,x=0;if(a<f){b=Math.max(f-a,h.slidesPerGroup);for(let e=0;e<f-a;e+=1){const t=e-Math.floor(e/d.length)*d.length;v.push(d.length-t-1);}}else if(a>o.slides.length-2*f){x=Math.max(a-(o.slides.length-2*f),h.slidesPerGroup);for(let e=0;e<x;e+=1){const t=e-Math.floor(e/d.length)*d.length;g.push(t);}}if(T&&v.forEach((e=>{o.slides[e].swiperLoopMoveDOM=!0,u.prepend(o.slides[e]),o.slides[e].swiperLoopMoveDOM=!1;})),S&&g.forEach((e=>{o.slides[e].swiperLoopMoveDOM=!0,u.append(o.slides[e]),o.slides[e].swiperLoopMoveDOM=!1;})),o.recalcSlides(),"auto"===h.slidesPerView&&o.updateSlides(),h.watchSlidesProgress&&o.updateSlidesOffset(),s)if(v.length>0&&T)if(void 0===t){const e=o.slidesGrid[w],t=o.slidesGrid[w+b]-e;l?o.setTranslate(o.translate-t):(o.slideTo(w+b,0,!1,!0),r&&(o.touches[o.isHorizontal()?"startX":"startY"]+=t));}else r&&o.slideToLoop(t,0,!1,!0);else if(g.length>0&&S)if(void 0===t){const e=o.slidesGrid[w],t=o.slidesGrid[w-x]-e;l?o.setTranslate(o.translate-t):(o.slideTo(w-x,0,!1,!0),r&&(o.touches[o.isHorizontal()?"startX":"startY"]+=t));}else o.slideToLoop(t,0,!1,!0);if(o.allowSlidePrev=c,o.allowSlideNext=p,o.controller&&o.controller.control&&!n){const e={slideRealIndex:t,slideTo:!1,direction:i,setTranslate:r,activeSlideIndex:a,byController:!0};Array.isArray(o.controller.control)?o.controller.control.forEach((t=>{!t.destroyed&&t.params.loop&&t.loopFix(e);})):o.controller.control instanceof o.constructor&&o.controller.control.params.loop&&o.controller.control.loopFix(e);}o.emit("loopFix");}function loopDestroy(){const e=this,{params:t,slidesEl:s}=e;if(!t.loop||e.virtual&&e.params.virtual.enabled)return;e.recalcSlides();const i=[];e.slides.forEach((e=>{const t=void 0===e.swiperSlideIndex?1*e.getAttribute("data-swiper-slide-index"):e.swiperSlideIndex;i[t]=e;})),e.slides.forEach((e=>{e.removeAttribute("data-swiper-slide-index");})),i.forEach((e=>{s.append(e);})),e.recalcSlides(),e.slideTo(e.realIndex,0);}var loop={loopCreate:loopCreate,loopFix:loopFix,loopDestroy:loopDestroy};function setGrabCursor(e){const t=this;if(!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const s="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;t.isElement&&(t.__preventObserver__=!0),s.style.cursor="move",s.style.cursor=e?"grabbing":"grab",t.isElement&&requestAnimationFrame((()=>{t.__preventObserver__=!1;}));}function unsetGrabCursor(){const e=this;e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e.isElement&&(e.__preventObserver__=!0),e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="",e.isElement&&requestAnimationFrame((()=>{e.__preventObserver__=!1;})));}var grabCursor={setGrabCursor:setGrabCursor,unsetGrabCursor:unsetGrabCursor};function closestElement(e,t){return void 0===t&&(t=this),function t(s){if(!s||s===getDocument()||s===getWindow())return null;s.assignedSlot&&(s=s.assignedSlot);const i=s.closest(e);return i||s.getRootNode?i||t(s.getRootNode().host):null}(t)}function onTouchStart(e){const t=this,s=getDocument(),i=getWindow(),r=t.touchEventsData;r.evCache.push(e);const{params:a,touches:n,enabled:l}=t;if(!l)return;if(!a.simulateTouch&&"mouse"===e.pointerType)return;if(t.animating&&a.preventInteractionOnTransition)return;!t.animating&&a.cssMode&&a.loop&&t.loopFix();let o=e;o.originalEvent&&(o=o.originalEvent);let d=o.target;if("wrapper"===a.touchEventsTarget&&!t.wrapperEl.contains(d))return;if("which"in o&&3===o.which)return;if("button"in o&&o.button>0)return;if(r.isTouched&&r.isMoved)return;const c=!!a.noSwipingClass&&""!==a.noSwipingClass,p=e.composedPath?e.composedPath():e.path;c&&o.target&&o.target.shadowRoot&&p&&(d=p[0]);const u=a.noSwipingSelector?a.noSwipingSelector:`.${a.noSwipingClass}`,h=!(!o.target||!o.target.shadowRoot);if(a.noSwiping&&(h?closestElement(u,d):d.closest(u)))return void(t.allowClick=!0);if(a.swipeHandler&&!d.closest(a.swipeHandler))return;n.currentX=o.pageX,n.currentY=o.pageY;const m=n.currentX,f=n.currentY,v=a.edgeSwipeDetection||a.iOSEdgeSwipeDetection,g=a.edgeSwipeThreshold||a.iOSEdgeSwipeThreshold;if(v&&(m<=g||m>=i.innerWidth-g)){if("prevent"!==v)return;e.preventDefault();}Object.assign(r,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),n.startX=m,n.startY=f,r.touchStartTime=now(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,a.threshold>0&&(r.allowThresholdMove=!1);let w=!0;d.matches(r.focusableElements)&&(w=!1,"SELECT"===d.nodeName&&(r.isTouched=!1)),s.activeElement&&s.activeElement.matches(r.focusableElements)&&s.activeElement!==d&&s.activeElement.blur();const S=w&&t.allowTouchMove&&a.touchStartPreventDefault;!a.touchStartForcePreventDefault&&!S||d.isContentEditable||o.preventDefault(),a.freeMode&&a.freeMode.enabled&&t.freeMode&&t.animating&&!a.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",o);}function onTouchMove(e){const t=getDocument(),s=this,i=s.touchEventsData,{params:r,touches:a,rtlTranslate:n,enabled:l}=s;if(!l)return;if(!r.simulateTouch&&"mouse"===e.pointerType)return;let o=e;if(o.originalEvent&&(o=o.originalEvent),!i.isTouched)return void(i.startMoving&&i.isScrolling&&s.emit("touchMoveOpposite",o));const d=i.evCache.findIndex((e=>e.pointerId===o.pointerId));d>=0&&(i.evCache[d]=o);const c=i.evCache.length>1?i.evCache[0]:o,p=c.pageX,u=c.pageY;if(o.preventedByNestedSwiper)return a.startX=p,void(a.startY=u);if(!s.allowTouchMove)return o.target.matches(i.focusableElements)||(s.allowClick=!1),void(i.isTouched&&(Object.assign(a,{startX:p,startY:u,prevX:s.touches.currentX,prevY:s.touches.currentY,currentX:p,currentY:u}),i.touchStartTime=now()));if(r.touchReleaseOnEdges&&!r.loop)if(s.isVertical()){if(u<a.startY&&s.translate<=s.maxTranslate()||u>a.startY&&s.translate>=s.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(p<a.startX&&s.translate<=s.maxTranslate()||p>a.startX&&s.translate>=s.minTranslate())return;if(t.activeElement&&o.target===t.activeElement&&o.target.matches(i.focusableElements))return i.isMoved=!0,void(s.allowClick=!1);if(i.allowTouchCallbacks&&s.emit("touchMove",o),o.targetTouches&&o.targetTouches.length>1)return;a.currentX=p,a.currentY=u;const h=a.currentX-a.startX,m=a.currentY-a.startY;if(s.params.threshold&&Math.sqrt(h**2+m**2)<s.params.threshold)return;if(void 0===i.isScrolling){let e;s.isHorizontal()&&a.currentY===a.startY||s.isVertical()&&a.currentX===a.startX?i.isScrolling=!1:h*h+m*m>=25&&(e=180*Math.atan2(Math.abs(m),Math.abs(h))/Math.PI,i.isScrolling=s.isHorizontal()?e>r.touchAngle:90-e>r.touchAngle);}if(i.isScrolling&&s.emit("touchMoveOpposite",o),void 0===i.startMoving&&(a.currentX===a.startX&&a.currentY===a.startY||(i.startMoving=!0)),i.isScrolling||s.zoom&&s.params.zoom&&s.params.zoom.enabled&&i.evCache.length>1)return void(i.isTouched=!1);if(!i.startMoving)return;s.allowClick=!1,!r.cssMode&&o.cancelable&&o.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&o.stopPropagation();let f=s.isHorizontal()?h:m,v=s.isHorizontal()?a.currentX-a.previousX:a.currentY-a.previousY;r.oneWayMovement&&(f=Math.abs(f)*(n?1:-1),v=Math.abs(v)*(n?1:-1)),a.diff=f,f*=r.touchRatio,n&&(f=-f,v=-v);const g=s.touchesDirection;s.swipeDirection=f>0?"prev":"next",s.touchesDirection=v>0?"prev":"next";const w=s.params.loop&&!r.cssMode;if(!i.isMoved){if(w&&s.loopFix({direction:s.swipeDirection}),i.startTranslate=s.getTranslate(),s.setTransition(0),s.animating){const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});s.wrapperEl.dispatchEvent(e);}i.allowMomentumBounce=!1,!r.grabCursor||!0!==s.allowSlideNext&&!0!==s.allowSlidePrev||s.setGrabCursor(!0),s.emit("sliderFirstMove",o);}let S;i.isMoved&&g!==s.touchesDirection&&w&&Math.abs(f)>=1&&(s.loopFix({direction:s.swipeDirection,setTranslate:!0}),S=!0),s.emit("sliderMove",o),i.isMoved=!0,i.currentTranslate=f+i.startTranslate;let T=!0,b=r.resistanceRatio;if(r.touchReleaseOnEdges&&(b=0),f>0?(w&&!S&&i.currentTranslate>(r.centeredSlides?s.minTranslate()-s.size/2:s.minTranslate())&&s.loopFix({direction:"prev",setTranslate:!0,activeSlideIndex:0}),i.currentTranslate>s.minTranslate()&&(T=!1,r.resistance&&(i.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+i.startTranslate+f)**b))):f<0&&(w&&!S&&i.currentTranslate<(r.centeredSlides?s.maxTranslate()+s.size/2:s.maxTranslate())&&s.loopFix({direction:"next",setTranslate:!0,activeSlideIndex:s.slides.length-("auto"===r.slidesPerView?s.slidesPerViewDynamic():Math.ceil(parseFloat(r.slidesPerView,10)))}),i.currentTranslate<s.maxTranslate()&&(T=!1,r.resistance&&(i.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-i.startTranslate-f)**b))),T&&(o.preventedByNestedSwiper=!0),!s.allowSlideNext&&"next"===s.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!s.allowSlidePrev&&"prev"===s.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),s.allowSlidePrev||s.allowSlideNext||(i.currentTranslate=i.startTranslate),r.threshold>0){if(!(Math.abs(f)>r.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,a.startX=a.currentX,a.startY=a.currentY,i.currentTranslate=i.startTranslate,void(a.diff=s.isHorizontal()?a.currentX-a.startX:a.currentY-a.startY)}r.followFinger&&!r.cssMode&&((r.freeMode&&r.freeMode.enabled&&s.freeMode||r.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),r.freeMode&&r.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(i.currentTranslate),s.setTranslate(i.currentTranslate));}function onTouchEnd(e){const t=this,s=t.touchEventsData,i=s.evCache.findIndex((t=>t.pointerId===e.pointerId));if(i>=0&&s.evCache.splice(i,1),["pointercancel","pointerout","pointerleave"].includes(e.type)){if(!("pointercancel"===e.type&&(t.browser.isSafari||t.browser.isWebView)))return}const{params:r,touches:a,rtlTranslate:n,slidesGrid:l,enabled:o}=t;if(!o)return;if(!r.simulateTouch&&"mouse"===e.pointerType)return;let d=e;if(d.originalEvent&&(d=d.originalEvent),s.allowTouchCallbacks&&t.emit("touchEnd",d),s.allowTouchCallbacks=!1,!s.isTouched)return s.isMoved&&r.grabCursor&&t.setGrabCursor(!1),s.isMoved=!1,void(s.startMoving=!1);r.grabCursor&&s.isMoved&&s.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const c=now(),p=c-s.touchStartTime;if(t.allowClick){const e=d.path||d.composedPath&&d.composedPath();t.updateClickedSlide(e&&e[0]||d.target),t.emit("tap click",d),p<300&&c-s.lastClickTime<300&&t.emit("doubleTap doubleClick",d);}if(s.lastClickTime=now(),nextTick((()=>{t.destroyed||(t.allowClick=!0);})),!s.isTouched||!s.isMoved||!t.swipeDirection||0===a.diff||s.currentTranslate===s.startTranslate)return s.isTouched=!1,s.isMoved=!1,void(s.startMoving=!1);let u;if(s.isTouched=!1,s.isMoved=!1,s.startMoving=!1,u=r.followFinger?n?t.translate:-t.translate:-s.currentTranslate,r.cssMode)return;if(r.freeMode&&r.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:u});let h=0,m=t.slidesSizesGrid[0];for(let e=0;e<l.length;e+=e<r.slidesPerGroupSkip?1:r.slidesPerGroup){const t=e<r.slidesPerGroupSkip-1?1:r.slidesPerGroup;void 0!==l[e+t]?u>=l[e]&&u<l[e+t]&&(h=e,m=l[e+t]-l[e]):u>=l[e]&&(h=e,m=l[l.length-1]-l[l.length-2]);}let f=null,v=null;r.rewind&&(t.isBeginning?v=r.virtual&&r.virtual.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(f=0));const g=(u-l[h])/m,w=h<r.slidesPerGroupSkip-1?1:r.slidesPerGroup;if(p>r.longSwipesMs){if(!r.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(g>=r.longSwipesRatio?t.slideTo(r.rewind&&t.isEnd?f:h+w):t.slideTo(h)),"prev"===t.swipeDirection&&(g>1-r.longSwipesRatio?t.slideTo(h+w):null!==v&&g<0&&Math.abs(g)>r.longSwipesRatio?t.slideTo(v):t.slideTo(h));}else {if(!r.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(d.target===t.navigation.nextEl||d.target===t.navigation.prevEl)?d.target===t.navigation.nextEl?t.slideTo(h+w):t.slideTo(h):("next"===t.swipeDirection&&t.slideTo(null!==f?f:h+w),"prev"===t.swipeDirection&&t.slideTo(null!==v?v:h));}}function onResize(){const e=this,{params:t,el:s}=e;if(s&&0===s.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:i,allowSlidePrev:r,snapGrid:a}=e,n=e.virtual&&e.params.virtual.enabled;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses();const l=n&&t.loop;!("auto"===t.slidesPerView||t.slidesPerView>1)||!e.isEnd||e.isBeginning||e.params.centeredSlides||l?e.params.loop&&!n?e.slideToLoop(e.realIndex,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0):e.slideTo(e.slides.length-1,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&(clearTimeout(e.autoplay.resizeTimeout),e.autoplay.resizeTimeout=setTimeout((()=>{e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.resume();}),500)),e.allowSlidePrev=r,e.allowSlideNext=i,e.params.watchOverflow&&a!==e.snapGrid&&e.checkOverflow();}function onClick(e){const t=this;t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())));}function onScroll(){const e=this,{wrapperEl:t,rtlTranslate:s,enabled:i}=e;if(!i)return;let r;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const a=e.maxTranslate()-e.minTranslate();r=0===a?0:(e.translate-e.minTranslate())/a,r!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1);}function onLoad(e){const t=this;processLazyPreloader(t,e.target),t.params.cssMode||"auto"!==t.params.slidesPerView&&!t.params.autoHeight||t.update();}let dummyEventAttached=!1;function dummyEventListener(){}const events=(e,t)=>{const s=getDocument(),{params:i,el:r,wrapperEl:a,device:n}=e,l=!!i.nested,o="on"===t?"addEventListener":"removeEventListener",d=t;r[o]("pointerdown",e.onTouchStart,{passive:!1}),s[o]("pointermove",e.onTouchMove,{passive:!1,capture:l}),s[o]("pointerup",e.onTouchEnd,{passive:!0}),s[o]("pointercancel",e.onTouchEnd,{passive:!0}),s[o]("pointerout",e.onTouchEnd,{passive:!0}),s[o]("pointerleave",e.onTouchEnd,{passive:!0}),(i.preventClicks||i.preventClicksPropagation)&&r[o]("click",e.onClick,!0),i.cssMode&&a[o]("scroll",e.onScroll),i.updateOnWindowResize?e[d](n.ios||n.android?"resize orientationchange observerUpdate":"resize observerUpdate",onResize,!0):e[d]("observerUpdate",onResize,!0),r[o]("load",e.onLoad,{capture:!0});};function attachEvents(){const e=this,t=getDocument(),{params:s}=e;e.onTouchStart=onTouchStart.bind(e),e.onTouchMove=onTouchMove.bind(e),e.onTouchEnd=onTouchEnd.bind(e),s.cssMode&&(e.onScroll=onScroll.bind(e)),e.onClick=onClick.bind(e),e.onLoad=onLoad.bind(e),dummyEventAttached||(t.addEventListener("touchstart",dummyEventListener),dummyEventAttached=!0),events(e,"on");}function detachEvents(){events(this,"off");}var events$1={attachEvents:attachEvents,detachEvents:detachEvents};const isGridEnabled=(e,t)=>e.grid&&t.grid&&t.grid.rows>1;function setBreakpoint(){const e=this,{realIndex:t,initialized:s,params:i,el:r}=e,a=i.breakpoints;if(!a||a&&0===Object.keys(a).length)return;const n=e.getBreakpoint(a,e.params.breakpointsBase,e.el);if(!n||e.currentBreakpoint===n)return;const l=(n in a?a[n]:void 0)||e.originalParams,o=isGridEnabled(e,i),d=isGridEnabled(e,l),c=i.enabled;o&&!d?(r.classList.remove(`${i.containerModifierClass}grid`,`${i.containerModifierClass}grid-column`),e.emitContainerClasses()):!o&&d&&(r.classList.add(`${i.containerModifierClass}grid`),(l.grid.fill&&"column"===l.grid.fill||!l.grid.fill&&"column"===i.grid.fill)&&r.classList.add(`${i.containerModifierClass}grid-column`),e.emitContainerClasses()),["navigation","pagination","scrollbar"].forEach((t=>{if(void 0===l[t])return;const s=i[t]&&i[t].enabled,r=l[t]&&l[t].enabled;s&&!r&&e[t].disable(),!s&&r&&e[t].enable();}));const p=l.direction&&l.direction!==i.direction,u=i.loop&&(l.slidesPerView!==i.slidesPerView||p);p&&s&&e.changeDirection(),extend(e.params,l);const h=e.params.enabled;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),c&&!h?e.disable():!c&&h&&e.enable(),e.currentBreakpoint=n,e.emit("_beforeBreakpoint",l),u&&s&&(e.loopDestroy(),e.loopCreate(t),e.updateSlides()),e.emit("breakpoint",l);}function getBreakpoint(e,t,s){if(void 0===t&&(t="window"),!e||"container"===t&&!s)return;let i=!1;const r=getWindow(),a="window"===t?r.innerHeight:s.clientHeight,n=Object.keys(e).map((e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return {value:a*t,point:e}}return {value:e,point:e}}));n.sort(((e,t)=>parseInt(e.value,10)-parseInt(t.value,10)));for(let e=0;e<n.length;e+=1){const{point:a,value:l}=n[e];"window"===t?r.matchMedia(`(min-width: ${l}px)`).matches&&(i=a):l<=s.clientWidth&&(i=a);}return i||"max"}var breakpoints={setBreakpoint:setBreakpoint,getBreakpoint:getBreakpoint};function prepareClasses(e,t){const s=[];return e.forEach((e=>{"object"==typeof e?Object.keys(e).forEach((i=>{e[i]&&s.push(t+i);})):"string"==typeof e&&s.push(t+e);})),s}function addClasses(){const e=this,{classNames:t,params:s,rtl:i,el:r,device:a}=e,n=prepareClasses(["initialized",s.direction,{"free-mode":e.params.freeMode&&s.freeMode.enabled},{autoheight:s.autoHeight},{rtl:i},{grid:s.grid&&s.grid.rows>1},{"grid-column":s.grid&&s.grid.rows>1&&"column"===s.grid.fill},{android:a.android},{ios:a.ios},{"css-mode":s.cssMode},{centered:s.cssMode&&s.centeredSlides},{"watch-progress":s.watchSlidesProgress}],s.containerModifierClass);t.push(...n),r.classList.add(...t),e.emitContainerClasses();}function removeClasses(){const{el:e,classNames:t}=this;e.classList.remove(...t),this.emitContainerClasses();}var classes={addClasses:addClasses,removeClasses:removeClasses};function checkOverflow(){const e=this,{isLocked:t,params:s}=e,{slidesOffsetBefore:i}=s;if(i){const t=e.slides.length-1,s=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*i;e.isLocked=e.size>s;}else e.isLocked=1===e.snapGrid.length;!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock");}var checkOverflow$1={checkOverflow:checkOverflow},defaults={init:!0,direction:"horizontal",oneWayMovement:!1,touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:5,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,loop:!1,loopedSlides:null,loopPreventsSliding:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",lazyPreloaderClass:"swiper-lazy-preloader",lazyPreloadPrevNext:0,runCallbacksOnInit:!0,_emitClasses:!1};function moduleExtendParams(e,t){return function(s){void 0===s&&(s={});const i=Object.keys(s)[0],r=s[i];"object"==typeof r&&null!==r?(["navigation","pagination","scrollbar"].indexOf(i)>=0&&!0===e[i]&&(e[i]={auto:!0}),i in e&&"enabled"in r?(!0===e[i]&&(e[i]={enabled:!0}),"object"!=typeof e[i]||"enabled"in e[i]||(e[i].enabled=!0),e[i]||(e[i]={enabled:!1}),extend(t,s)):extend(t,s)):extend(t,s);}}const prototypes={eventsEmitter:eventsEmitter,update:update,translate:translate,transition:transition,slide:slide,loop:loop,grabCursor:grabCursor,events:events$1,breakpoints:breakpoints,checkOverflow:checkOverflow$1,classes:classes},extendedDefaults={};class Swiper{constructor(){let e,t;for(var s=arguments.length,i=new Array(s),r=0;r<s;r++)i[r]=arguments[r];1===i.length&&i[0].constructor&&"Object"===Object.prototype.toString.call(i[0]).slice(8,-1)?t=i[0]:[e,t]=i,t||(t={}),t=extend({},t),e&&!t.el&&(t.el=e);const a=getDocument();if(t.el&&"string"==typeof t.el&&a.querySelectorAll(t.el).length>1){const e=[];return a.querySelectorAll(t.el).forEach((s=>{const i=extend({},t,{el:s});e.push(new Swiper(i));})),e}const n=this;n.__swiper__=!0,n.support=getSupport(),n.device=getDevice({userAgent:t.userAgent}),n.browser=getBrowser(),n.eventsListeners={},n.eventsAnyListeners=[],n.modules=[...n.__modules__],t.modules&&Array.isArray(t.modules)&&n.modules.push(...t.modules);const l={};n.modules.forEach((e=>{e({params:t,swiper:n,extendParams:moduleExtendParams(t,l),on:n.on.bind(n),once:n.once.bind(n),off:n.off.bind(n),emit:n.emit.bind(n)});}));const o=extend({},defaults,l);return n.params=extend({},o,extendedDefaults,t),n.originalParams=extend({},n.params),n.passedParams=extend({},t),n.params&&n.params.on&&Object.keys(n.params.on).forEach((e=>{n.on(e,n.params.on[e]);})),n.params&&n.params.onAny&&n.onAny(n.params.onAny),Object.assign(n,{enabled:n.params.enabled,el:e,classNames:[],slides:[],slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===n.params.direction,isVertical:()=>"vertical"===n.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,cssOverflowAdjustment(){return Math.trunc(this.translate/2**23)*2**23},allowSlideNext:n.params.allowSlideNext,allowSlidePrev:n.params.allowSlidePrev,touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:n.params.focusableElements,lastClickTime:0,clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,startMoving:void 0,evCache:[]},allowClick:!0,allowTouchMove:n.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),n.emit("_swiper"),n.params.init&&n.init(),n}getSlideIndex(e){const{slidesEl:t,params:s}=this,i=elementChildren(t,`.${s.slideClass}, swiper-slide`),r=elementIndex(i[0]);return elementIndex(e)-r}getSlideIndexByData(e){return this.getSlideIndex(this.slides.filter((t=>1*t.getAttribute("data-swiper-slide-index")===e))[0])}recalcSlides(){const{slidesEl:e,params:t}=this;this.slides=elementChildren(e,`.${t.slideClass}, swiper-slide`);}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"));}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"));}setProgress(e,t){const s=this;e=Math.min(Math.max(e,0),1);const i=s.minTranslate(),r=(s.maxTranslate()-i)*e+i;s.translateTo(r,void 0===t?0:t),s.updateActiveIndex(),s.updateSlidesClasses();}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter((t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",t.join(" "));}getSlideClasses(e){const t=this;return t.destroyed?"":e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.forEach((s=>{const i=e.getSlideClasses(s);t.push({slideEl:s,classNames:i}),e.emit("_slideClass",s,i);})),e.emit("_slideClasses",t);}slidesPerViewDynamic(e,t){void 0===e&&(e="current"),void 0===t&&(t=!1);const{params:s,slides:i,slidesGrid:r,slidesSizesGrid:a,size:n,activeIndex:l}=this;let o=1;if(s.centeredSlides){let e,t=i[l]?i[l].swiperSlideSize:0;for(let s=l+1;s<i.length;s+=1)i[s]&&!e&&(t+=i[s].swiperSlideSize,o+=1,t>n&&(e=!0));for(let s=l-1;s>=0;s-=1)i[s]&&!e&&(t+=i[s].swiperSlideSize,o+=1,t>n&&(e=!0));}else if("current"===e)for(let e=l+1;e<i.length;e+=1){(t?r[e]+a[e]-r[l]<n:r[e]-r[l]<n)&&(o+=1);}else for(let e=l-1;e>=0;e-=1){r[l]-r[e]<n&&(o+=1);}return o}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:s}=e;function i(){const t=e.rtlTranslate?-1*e.translate:e.translate,s=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(s),e.updateActiveIndex(),e.updateSlidesClasses();}let r;if(s.breakpoints&&e.setBreakpoint(),[...e.el.querySelectorAll('[loading="lazy"]')].forEach((t=>{t.complete&&processLazyPreloader(e,t);})),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),s.freeMode&&s.freeMode.enabled&&!s.cssMode)i(),s.autoHeight&&e.updateAutoHeight();else {if(("auto"===s.slidesPerView||s.slidesPerView>1)&&e.isEnd&&!s.centeredSlides){const t=e.virtual&&s.virtual.enabled?e.virtual.slides:e.slides;r=e.slideTo(t.length-1,0,!1,!0);}else r=e.slideTo(e.activeIndex,0,!1,!0);r||i();}s.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update");}changeDirection(e,t){void 0===t&&(t=!0);const s=this,i=s.params.direction;return e||(e="horizontal"===i?"vertical":"horizontal"),e===i||"horizontal"!==e&&"vertical"!==e||(s.el.classList.remove(`${s.params.containerModifierClass}${i}`),s.el.classList.add(`${s.params.containerModifierClass}${e}`),s.emitContainerClasses(),s.params.direction=e,s.slides.forEach((t=>{"vertical"===e?t.style.width="":t.style.height="";})),s.emit("changeDirection"),t&&s.update()),s}changeLanguageDirection(e){const t=this;t.rtl&&"rtl"===e||!t.rtl&&"ltr"===e||(t.rtl="rtl"===e,t.rtlTranslate="horizontal"===t.params.direction&&t.rtl,t.rtl?(t.el.classList.add(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.el.classList.remove(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update());}mount(e){const t=this;if(t.mounted)return !0;let s=e||t.params.el;if("string"==typeof s&&(s=document.querySelector(s)),!s)return !1;s.swiper=t,s.parentNode&&s.parentNode.host&&(t.isElement=!0);const i=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let r=(()=>{if(s&&s.shadowRoot&&s.shadowRoot.querySelector){return s.shadowRoot.querySelector(i())}return elementChildren(s,i())[0]})();return !r&&t.params.createElements&&(r=createElement("div",t.params.wrapperClass),s.append(r),elementChildren(s,`.${t.params.slideClass}`).forEach((e=>{r.append(e);}))),Object.assign(t,{el:s,wrapperEl:r,slidesEl:t.isElement?s.parentNode.host:r,hostEl:t.isElement?s.parentNode.host:s,mounted:!0,rtl:"rtl"===s.dir.toLowerCase()||"rtl"===elementStyle(s,"direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===s.dir.toLowerCase()||"rtl"===elementStyle(s,"direction")),wrongRTL:"-webkit-box"===elementStyle(r,"display")}),!0}init(e){const t=this;if(t.initialized)return t;return !1===t.mount(e)||(t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.loop&&t.virtual&&t.params.virtual.enabled?t.slideTo(t.params.initialSlide+t.virtual.slidesBefore,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.params.loop&&t.loopCreate(),t.attachEvents(),[...t.el.querySelectorAll('[loading="lazy"]')].forEach((e=>{e.complete?processLazyPreloader(t,e):e.addEventListener("load",(e=>{processLazyPreloader(t,e.target);}));})),preload(t),t.initialized=!0,preload(t),t.emit("init"),t.emit("afterInit")),t}destroy(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);const s=this,{params:i,el:r,wrapperEl:a,slides:n}=s;return void 0===s.params||s.destroyed||(s.emit("beforeDestroy"),s.initialized=!1,s.detachEvents(),i.loop&&s.loopDestroy(),t&&(s.removeClasses(),r.removeAttribute("style"),a.removeAttribute("style"),n&&n.length&&n.forEach((e=>{e.classList.remove(i.slideVisibleClass,i.slideActiveClass,i.slideNextClass,i.slidePrevClass),e.removeAttribute("style"),e.removeAttribute("data-swiper-slide-index");}))),s.emit("destroy"),Object.keys(s.eventsListeners).forEach((e=>{s.off(e);})),!1!==e&&(s.el.swiper=null,deleteProps(s)),s.destroyed=!0),null}static extendDefaults(e){extend(extendedDefaults,e);}static get extendedDefaults(){return extendedDefaults}static get defaults(){return defaults}static installModule(e){Swiper.prototype.__modules__||(Swiper.prototype.__modules__=[]);const t=Swiper.prototype.__modules__;"function"==typeof e&&t.indexOf(e)<0&&t.push(e);}static use(e){return Array.isArray(e)?(e.forEach((e=>Swiper.installModule(e))),Swiper):(Swiper.installModule(e),Swiper)}}Object.keys(prototypes).forEach((e=>{Object.keys(prototypes[e]).forEach((t=>{Swiper.prototype[t]=prototypes[e][t];}));})),Swiper.use([Resize,Observer]);

  function Virtual(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    extendParams({
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        renderExternalUpdate: true,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    });
    let cssModeTimeout;
    const document = getDocument();
    swiper.virtual = {
      cache: {},
      from: undefined,
      to: undefined,
      slides: [],
      offset: 0,
      slidesGrid: []
    };
    const tempDOM = document.createElement('div');
    function renderSlide(slide, index) {
      const params = swiper.params.virtual;
      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }
      // eslint-disable-next-line
      let slideEl;
      if (params.renderSlide) {
        slideEl = params.renderSlide.call(swiper, slide, index);
        if (typeof slideEl === 'string') {
          tempDOM.innerHTML = slideEl;
          slideEl = tempDOM.children[0];
        }
      } else if (swiper.isElement) {
        slideEl = createElement('swiper-slide');
      } else {
        slideEl = createElement('div', swiper.params.slideClass);
      }
      slideEl.setAttribute('data-swiper-slide-index', index);
      if (!params.renderSlide) {
        slideEl.innerHTML = slide;
      }
      if (params.cache) swiper.virtual.cache[index] = slideEl;
      return slideEl;
    }
    function update(force) {
      const {
        slidesPerView,
        slidesPerGroup,
        centeredSlides,
        loop: isLoop
      } = swiper.params;
      const {
        addSlidesBefore,
        addSlidesAfter
      } = swiper.params.virtual;
      const {
        from: previousFrom,
        to: previousTo,
        slides,
        slidesGrid: previousSlidesGrid,
        offset: previousOffset
      } = swiper.virtual;
      if (!swiper.params.cssMode) {
        swiper.updateActiveIndex();
      }
      const activeIndex = swiper.activeIndex || 0;
      let offsetProp;
      if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
      let slidesAfter;
      let slidesBefore;
      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
        slidesBefore = (isLoop ? slidesPerView : slidesPerGroup) + addSlidesBefore;
      }
      let from = activeIndex - slidesBefore;
      let to = activeIndex + slidesAfter;
      if (!isLoop) {
        from = Math.max(from, 0);
        to = Math.min(to, slides.length - 1);
      }
      let offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
      if (isLoop && activeIndex >= slidesBefore) {
        from -= slidesBefore;
        if (!centeredSlides) offset += swiper.slidesGrid[0];
      } else if (isLoop && activeIndex < slidesBefore) {
        from = -slidesBefore;
        if (centeredSlides) offset += swiper.slidesGrid[0];
      }
      Object.assign(swiper.virtual, {
        from,
        to,
        offset,
        slidesGrid: swiper.slidesGrid,
        slidesBefore,
        slidesAfter
      });
      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();
        emit('virtualUpdate');
      }
      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.forEach(slideEl => {
            slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
          });
        }
        swiper.updateProgress();
        emit('virtualUpdate');
        return;
      }
      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset,
          from,
          to,
          slides: function getSlides() {
            const slidesToRender = [];
            for (let i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }
            return slidesToRender;
          }()
        });
        if (swiper.params.virtual.renderExternalUpdate) {
          onRendered();
        } else {
          emit('virtualUpdate');
        }
        return;
      }
      const prependIndexes = [];
      const appendIndexes = [];
      const getSlideIndex = index => {
        let slideIndex = index;
        if (index < 0) {
          slideIndex = slides.length + index;
        } else if (slideIndex >= slides.length) {
          // eslint-disable-next-line
          slideIndex = slideIndex - slides.length;
        }
        return slideIndex;
      };
      if (force) {
        swiper.slidesEl.querySelectorAll(`.${swiper.params.slideClass}, swiper-slide`).forEach(slideEl => {
          slideEl.remove();
        });
      } else {
        for (let i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            const slideIndex = getSlideIndex(i);
            swiper.slidesEl.querySelectorAll(`.${swiper.params.slideClass}[data-swiper-slide-index="${slideIndex}"], swiper-slide[data-swiper-slide-index="${slideIndex}"]`).forEach(slideEl => {
              slideEl.remove();
            });
          }
        }
      }
      const loopFrom = isLoop ? -slides.length : 0;
      const loopTo = isLoop ? slides.length * 2 : slides.length;
      for (let i = loopFrom; i < loopTo; i += 1) {
        if (i >= from && i <= to) {
          const slideIndex = getSlideIndex(i);
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(slideIndex);
          } else {
            if (i > previousTo) appendIndexes.push(slideIndex);
            if (i < previousFrom) prependIndexes.push(slideIndex);
          }
        }
      }
      appendIndexes.forEach(index => {
        swiper.slidesEl.append(renderSlide(slides[index], index));
      });
      if (isLoop) {
        for (let i = prependIndexes.length - 1; i >= 0; i -= 1) {
          const index = prependIndexes[i];
          swiper.slidesEl.prepend(renderSlide(slides[index], index));
        }
      } else {
        prependIndexes.sort((a, b) => b - a);
        prependIndexes.forEach(index => {
          swiper.slidesEl.prepend(renderSlide(slides[index], index));
        });
      }
      elementChildren(swiper.slidesEl, '.swiper-slide, swiper-slide').forEach(slideEl => {
        slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
      });
      onRendered();
    }
    function appendSlide(slides) {
      if (typeof slides === 'object' && 'length' in slides) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) swiper.virtual.slides.push(slides[i]);
        }
      } else {
        swiper.virtual.slides.push(slides);
      }
      update(true);
    }
    function prependSlide(slides) {
      const activeIndex = swiper.activeIndex;
      let newActiveIndex = activeIndex + 1;
      let numberOfNewSlides = 1;
      if (Array.isArray(slides)) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
        }
        newActiveIndex = activeIndex + slides.length;
        numberOfNewSlides = slides.length;
      } else {
        swiper.virtual.slides.unshift(slides);
      }
      if (swiper.params.virtual.cache) {
        const cache = swiper.virtual.cache;
        const newCache = {};
        Object.keys(cache).forEach(cachedIndex => {
          const cachedEl = cache[cachedIndex];
          const cachedElIndex = cachedEl.getAttribute('data-swiper-slide-index');
          if (cachedElIndex) {
            cachedEl.setAttribute('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
          }
          newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
        });
        swiper.virtual.cache = newCache;
      }
      update(true);
      swiper.slideTo(newActiveIndex, 0);
    }
    function removeSlide(slidesIndexes) {
      if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
      let activeIndex = swiper.activeIndex;
      if (Array.isArray(slidesIndexes)) {
        for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
          swiper.virtual.slides.splice(slidesIndexes[i], 1);
          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes[i]];
          }
          if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
          activeIndex = Math.max(activeIndex, 0);
        }
      } else {
        swiper.virtual.slides.splice(slidesIndexes, 1);
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes];
        }
        if (slidesIndexes < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
      update(true);
      swiper.slideTo(activeIndex, 0);
    }
    function removeAllSlides() {
      swiper.virtual.slides = [];
      if (swiper.params.virtual.cache) {
        swiper.virtual.cache = {};
      }
      update(true);
      swiper.slideTo(0, 0);
    }
    on('beforeInit', () => {
      if (!swiper.params.virtual.enabled) return;
      let domSlidesAssigned;
      if (typeof swiper.passedParams.virtual.slides === 'undefined') {
        const slides = [...swiper.slidesEl.children].filter(el => el.matches(`.${swiper.params.slideClass}, swiper-slide`));
        if (slides && slides.length) {
          swiper.virtual.slides = [...slides];
          domSlidesAssigned = true;
          slides.forEach((slideEl, slideIndex) => {
            slideEl.setAttribute('data-swiper-slide-index', slideIndex);
            swiper.virtual.cache[slideIndex] = slideEl;
            slideEl.remove();
          });
        }
      }
      if (!domSlidesAssigned) {
        swiper.virtual.slides = swiper.params.virtual.slides;
      }
      swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
      if (!swiper.params.initialSlide) {
        update();
      }
    });
    on('setTranslate', () => {
      if (!swiper.params.virtual.enabled) return;
      if (swiper.params.cssMode && !swiper._immediateVirtual) {
        clearTimeout(cssModeTimeout);
        cssModeTimeout = setTimeout(() => {
          update();
        }, 100);
      } else {
        update();
      }
    });
    on('init update resize', () => {
      if (!swiper.params.virtual.enabled) return;
      if (swiper.params.cssMode) {
        setCSSProperty(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
      }
    });
    Object.assign(swiper.virtual, {
      appendSlide,
      prependSlide,
      removeSlide,
      removeAllSlides,
      update
    });
  }

  /* eslint-disable consistent-return */
  function Keyboard(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const document = getDocument();
    const window = getWindow();
    swiper.keyboard = {
      enabled: false
    };
    extendParams({
      keyboard: {
        enabled: false,
        onlyInViewport: true,
        pageUpDown: true
      }
    });
    function handle(event) {
      if (!swiper.enabled) return;
      const {
        rtlTranslate: rtl
      } = swiper;
      let e = event;
      if (e.originalEvent) e = e.originalEvent; // jquery fix
      const kc = e.keyCode || e.charCode;
      const pageUpDown = swiper.params.keyboard.pageUpDown;
      const isPageUp = pageUpDown && kc === 33;
      const isPageDown = pageUpDown && kc === 34;
      const isArrowLeft = kc === 37;
      const isArrowRight = kc === 39;
      const isArrowUp = kc === 38;
      const isArrowDown = kc === 40;
      // Directions locks
      if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
        return false;
      }
      if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
        return false;
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }
      if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return undefined;
      }
      if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
        let inView = false;
        // Check that swiper should be inside of visible area of window
        if (elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) {
          return undefined;
        }
        const el = swiper.el;
        const swiperWidth = el.clientWidth;
        const swiperHeight = el.clientHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const swiperOffset = elementOffset(el);
        if (rtl) swiperOffset.left -= el.scrollLeft;
        const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
        for (let i = 0; i < swiperCoord.length; i += 1) {
          const point = swiperCoord[i];
          if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
            if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
            inView = true;
          }
        }
        if (!inView) return undefined;
      }
      if (swiper.isHorizontal()) {
        if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
          if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        }
        if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
        if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
      } else {
        if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
          if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        }
        if (isPageDown || isArrowDown) swiper.slideNext();
        if (isPageUp || isArrowUp) swiper.slidePrev();
      }
      emit('keyPress', kc);
      return undefined;
    }
    function enable() {
      if (swiper.keyboard.enabled) return;
      document.addEventListener('keydown', handle);
      swiper.keyboard.enabled = true;
    }
    function disable() {
      if (!swiper.keyboard.enabled) return;
      document.removeEventListener('keydown', handle);
      swiper.keyboard.enabled = false;
    }
    on('init', () => {
      if (swiper.params.keyboard.enabled) {
        enable();
      }
    });
    on('destroy', () => {
      if (swiper.keyboard.enabled) {
        disable();
      }
    });
    Object.assign(swiper.keyboard, {
      enable,
      disable
    });
  }

  /* eslint-disable consistent-return */
  function Mousewheel(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const window = getWindow();
    extendParams({
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarget: 'container',
        thresholdDelta: null,
        thresholdTime: null,
        noMousewheelClass: 'swiper-no-mousewheel'
      }
    });
    swiper.mousewheel = {
      enabled: false
    };
    let timeout;
    let lastScrollTime = now();
    let lastEventBeforeSnap;
    const recentWheelEvents = [];
    function normalize(e) {
      // Reasonable defaults
      const PIXEL_STEP = 10;
      const LINE_HEIGHT = 40;
      const PAGE_HEIGHT = 800;
      let sX = 0;
      let sY = 0; // spinX, spinY
      let pX = 0;
      let pY = 0; // pixelX, pixelY

      // Legacy
      if ('detail' in e) {
        sY = e.detail;
      }
      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }
      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }
      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      }

      // side scrolling on FF with DOMMouseScroll
      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }
      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;
      if ('deltaY' in e) {
        pY = e.deltaY;
      }
      if ('deltaX' in e) {
        pX = e.deltaX;
      }
      if (e.shiftKey && !pX) {
        // if user scrolls with shift he wants horizontal scroll
        pX = pY;
        pY = 0;
      }
      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      // Fall-back if spin cannot be determined
      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }
      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }
      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    }
    function handleMouseEnter() {
      if (!swiper.enabled) return;
      swiper.mouseEntered = true;
    }
    function handleMouseLeave() {
      if (!swiper.enabled) return;
      swiper.mouseEntered = false;
    }
    function animateSlider(newEvent) {
      if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
        // Prevent if delta of wheel scroll delta is below configured threshold
        return false;
      }
      if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
        // Prevent if time between scrolls is below configured threshold
        return false;
      }

      // If the movement is NOT big enough and
      // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
      //   Don't go any further (avoid insignificant scroll movement).
      if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
        // Return false as a default
        return true;
      }
      // If user is scrolling towards the end:
      //   If the slider hasn't hit the latest slide or
      //   if the slider is a loop and
      //   if the slider isn't moving right now:
      //     Go to next slide and
      //     emit a scroll event.
      // Else (the user is scrolling towards the beginning) and
      // if the slider hasn't hit the first slide or
      // if the slider is a loop and
      // if the slider isn't moving right now:
      //   Go to prev slide and
      //   emit a scroll event.
      if (newEvent.direction < 0) {
        if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
          swiper.slideNext();
          emit('scroll', newEvent.raw);
        }
      } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
        swiper.slidePrev();
        emit('scroll', newEvent.raw);
      }
      // If you got here is because an animation has been triggered so store the current time
      lastScrollTime = new window.Date().getTime();
      // Return false as a default
      return false;
    }
    function releaseScroll(newEvent) {
      const params = swiper.params.mousewheel;
      if (newEvent.direction < 0) {
        if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
          // Return true to animate scroll on edges
          return true;
        }
      } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
        // Return true to animate scroll on edges
        return true;
      }
      return false;
    }
    function handle(event) {
      let e = event;
      let disableParentSwiper = true;
      if (!swiper.enabled) return;

      // Ignore event if the target or its parents have the swiper-no-mousewheel class
      if (event.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`)) return;
      const params = swiper.params.mousewheel;
      if (swiper.params.cssMode) {
        e.preventDefault();
      }
      let targetEl = swiper.el;
      if (swiper.params.mousewheel.eventsTarget !== 'container') {
        targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
      }
      const targetElContainsTarget = targetEl && targetEl.contains(e.target);
      if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
      if (e.originalEvent) e = e.originalEvent; // jquery fix
      let delta = 0;
      const rtlFactor = swiper.rtlTranslate ? -1 : 1;
      const data = normalize(e);
      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }
      if (delta === 0) return true;
      if (params.invert) delta = -delta;

      // Get the scroll positions
      let positions = swiper.getTranslate() + delta * params.sensitivity;
      if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
      if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();

      // When loop is true:
      //     the disableParentSwiper will be true.
      // When loop is false:
      //     if the scroll positions is not on edge,
      //     then the disableParentSwiper will be true.
      //     if the scroll on edge positions,
      //     then the disableParentSwiper will be false.
      disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
      if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
      if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
        // Register the new event in a variable which stores the relevant data
        const newEvent = {
          time: now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta),
          raw: event
        };

        // Keep the most recent events
        if (recentWheelEvents.length >= 2) {
          recentWheelEvents.shift(); // only store the last N events
        }

        const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
        recentWheelEvents.push(newEvent);

        // If there is at least one previous recorded event:
        //   If direction has changed or
        //   if the scroll is quicker than the previous one:
        //     Animate the slider.
        // Else (this is the first time the wheel is moved):
        //     Animate the slider.
        if (prevEvent) {
          if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
            animateSlider(newEvent);
          }
        } else {
          animateSlider(newEvent);
        }

        // If it's time to release the scroll:
        //   Return now so you don't hit the preventDefault.
        if (releaseScroll(newEvent)) {
          return true;
        }
      } else {
        // Freemode or scrollContainer:

        // If we recently snapped after a momentum scroll, then ignore wheel events
        // to give time for the deceleration to finish. Stop ignoring after 500 msecs
        // or if it's a new scroll (larger delta or inverse sign as last event before
        // an end-of-momentum snap).
        const newEvent = {
          time: now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta)
        };
        const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
        if (!ignoreWheelEvents) {
          lastEventBeforeSnap = undefined;
          let position = swiper.getTranslate() + delta * params.sensitivity;
          const wasBeginning = swiper.isBeginning;
          const wasEnd = swiper.isEnd;
          if (position >= swiper.minTranslate()) position = swiper.minTranslate();
          if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
          swiper.setTransition(0);
          swiper.setTranslate(position);
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
          if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
            swiper.updateSlidesClasses();
          }
          if (swiper.params.loop) {
            swiper.loopFix({
              direction: newEvent.direction < 0 ? 'next' : 'prev',
              byMousewheel: true
            });
          }
          if (swiper.params.freeMode.sticky) {
            // When wheel scrolling starts with sticky (aka snap) enabled, then detect
            // the end of a momentum scroll by storing recent (N=15?) wheel events.
            // 1. do all N events have decreasing or same (absolute value) delta?
            // 2. did all N events arrive in the last M (M=500?) msecs?
            // 3. does the earliest event have an (absolute value) delta that's
            //    at least P (P=1?) larger than the most recent event's delta?
            // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
            // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
            // Snap immediately and ignore remaining wheel events in this scroll.
            // See comment above for "remaining wheel events in this scroll" determination.
            // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
            clearTimeout(timeout);
            timeout = undefined;
            if (recentWheelEvents.length >= 15) {
              recentWheelEvents.shift(); // only store the last N events
            }

            const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
            const firstEvent = recentWheelEvents[0];
            recentWheelEvents.push(newEvent);
            if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
              // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
              recentWheelEvents.splice(0);
            } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
              // We're at the end of the deceleration of a momentum scroll, so there's no need
              // to wait for more events. Snap ASAP on the next tick.
              // Also, because there's some remaining momentum we'll bias the snap in the
              // direction of the ongoing scroll because it's better UX for the scroll to snap
              // in the same direction as the scroll instead of reversing to snap.  Therefore,
              // if it's already scrolled more than 20% in the current direction, keep going.
              const snapToThreshold = delta > 0 ? 0.8 : 0.2;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              timeout = nextTick(() => {
                swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
              }, 0); // no delay; move on next tick
            }

            if (!timeout) {
              // if we get here, then we haven't detected the end of a momentum scroll, so
              // we'll consider a scroll "complete" when there haven't been any wheel events
              // for 500ms.
              timeout = nextTick(() => {
                const snapToThreshold = 0.5;
                lastEventBeforeSnap = newEvent;
                recentWheelEvents.splice(0);
                swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
              }, 500);
            }
          }

          // Emit event
          if (!ignoreWheelEvents) emit('scroll', e);

          // Stop autoplay
          if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop();
          // Return page scroll on edge positions
          if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
        }
      }
      if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      return false;
    }
    function events(method) {
      let targetEl = swiper.el;
      if (swiper.params.mousewheel.eventsTarget !== 'container') {
        targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
      }
      targetEl[method]('mouseenter', handleMouseEnter);
      targetEl[method]('mouseleave', handleMouseLeave);
      targetEl[method]('wheel', handle);
    }
    function enable() {
      if (swiper.params.cssMode) {
        swiper.wrapperEl.removeEventListener('wheel', handle);
        return true;
      }
      if (swiper.mousewheel.enabled) return false;
      events('addEventListener');
      swiper.mousewheel.enabled = true;
      return true;
    }
    function disable() {
      if (swiper.params.cssMode) {
        swiper.wrapperEl.addEventListener(event, handle);
        return true;
      }
      if (!swiper.mousewheel.enabled) return false;
      events('removeEventListener');
      swiper.mousewheel.enabled = false;
      return true;
    }
    on('init', () => {
      if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
        disable();
      }
      if (swiper.params.mousewheel.enabled) enable();
    });
    on('destroy', () => {
      if (swiper.params.cssMode) {
        enable();
      }
      if (swiper.mousewheel.enabled) disable();
    });
    Object.assign(swiper.mousewheel, {
      enable,
      disable
    });
  }

  function createElementIfNotDefined(e,t,a,n){return e.params.createElements&&Object.keys(n).forEach((l=>{if(!a[l]&&!0===a.auto){let r=elementChildren(e.el,`.${n[l]}`)[0];r||(r=createElement("div",n[l]),r.className=n[l],e.el.append(r)),a[l]=r,t[l]=r;}})),a}

  function Navigation(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock',
        navigationDisabledClass: 'swiper-navigation-disabled'
      }
    });
    swiper.navigation = {
      nextEl: null,
      prevEl: null
    };
    const makeElementsArray = el => {
      if (!Array.isArray(el)) el = [el].filter(e => !!e);
      return el;
    };
    function getEl(el) {
      let res;
      if (el && typeof el === 'string' && swiper.isElement) {
        res = swiper.el.querySelector(el);
        if (res) return res;
      }
      if (el) {
        if (typeof el === 'string') res = [...document.querySelectorAll(el)];
        if (swiper.params.uniqueNavElements && typeof el === 'string' && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
          res = swiper.el.querySelector(el);
        }
      }
      if (el && !res) return el;
      // if (Array.isArray(res) && res.length === 1) res = res[0];
      return res;
    }
    function toggleEl(el, disabled) {
      const params = swiper.params.navigation;
      el = makeElementsArray(el);
      el.forEach(subEl => {
        if (subEl) {
          subEl.classList[disabled ? 'add' : 'remove'](...params.disabledClass.split(' '));
          if (subEl.tagName === 'BUTTON') subEl.disabled = disabled;
          if (swiper.params.watchOverflow && swiper.enabled) {
            subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
          }
        }
      });
    }
    function update() {
      // Update Navigation Buttons
      const {
        nextEl,
        prevEl
      } = swiper.navigation;
      if (swiper.params.loop) {
        toggleEl(prevEl, false);
        toggleEl(nextEl, false);
        return;
      }
      toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
      toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
    }
    function onPrevClick(e) {
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
      swiper.slidePrev();
      emit('navigationPrev');
    }
    function onNextClick(e) {
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
      swiper.slideNext();
      emit('navigationNext');
    }
    function init() {
      const params = swiper.params.navigation;
      swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
        nextEl: 'swiper-button-next',
        prevEl: 'swiper-button-prev'
      });
      if (!(params.nextEl || params.prevEl)) return;
      let nextEl = getEl(params.nextEl);
      let prevEl = getEl(params.prevEl);
      Object.assign(swiper.navigation, {
        nextEl,
        prevEl
      });
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const initButton = (el, dir) => {
        if (el) {
          el.addEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
        }
        if (!swiper.enabled && el) {
          el.classList.add(...params.lockClass.split(' '));
        }
      };
      nextEl.forEach(el => initButton(el, 'next'));
      prevEl.forEach(el => initButton(el, 'prev'));
    }
    function destroy() {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const destroyButton = (el, dir) => {
        el.removeEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
        el.classList.remove(...swiper.params.navigation.disabledClass.split(' '));
      };
      nextEl.forEach(el => destroyButton(el, 'next'));
      prevEl.forEach(el => destroyButton(el, 'prev'));
    }
    on('init', () => {
      if (swiper.params.navigation.enabled === false) {
        // eslint-disable-next-line
        disable();
      } else {
        init();
        update();
      }
    });
    on('toEdge fromEdge lock unlock', () => {
      update();
    });
    on('destroy', () => {
      destroy();
    });
    on('enable disable', () => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      [...nextEl, ...prevEl].filter(el => !!el).forEach(el => el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.navigation.lockClass));
    });
    on('click', (_s, e) => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const targetEl = e.target;
      if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
        if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
        let isHidden;
        if (nextEl.length) {
          isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        } else if (prevEl.length) {
          isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        }
        if (isHidden === true) {
          emit('navigationShow');
        } else {
          emit('navigationHide');
        }
        [...nextEl, ...prevEl].filter(el => !!el).forEach(el => el.classList.toggle(swiper.params.navigation.hiddenClass));
      }
    });
    const enable = () => {
      swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(' '));
      init();
      update();
    };
    const disable = () => {
      swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(' '));
      destroy();
    };
    Object.assign(swiper.navigation, {
      enable,
      disable,
      update,
      init,
      destroy
    });
  }

  function classesToSelector(e){return void 0===e&&(e=""),`.${e.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}

  function Pagination(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const pfx = 'swiper-pagination';
    extendParams({
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets',
        // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: number => number,
        formatFractionTotal: number => number,
        bulletClass: `${pfx}-bullet`,
        bulletActiveClass: `${pfx}-bullet-active`,
        modifierClass: `${pfx}-`,
        currentClass: `${pfx}-current`,
        totalClass: `${pfx}-total`,
        hiddenClass: `${pfx}-hidden`,
        progressbarFillClass: `${pfx}-progressbar-fill`,
        progressbarOppositeClass: `${pfx}-progressbar-opposite`,
        clickableClass: `${pfx}-clickable`,
        lockClass: `${pfx}-lock`,
        horizontalClass: `${pfx}-horizontal`,
        verticalClass: `${pfx}-vertical`,
        paginationDisabledClass: `${pfx}-disabled`
      }
    });
    swiper.pagination = {
      el: null,
      bullets: []
    };
    let bulletSize;
    let dynamicBulletIndex = 0;
    const makeElementsArray = el => {
      if (!Array.isArray(el)) el = [el].filter(e => !!e);
      return el;
    };
    function isPaginationDisabled() {
      return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
    }
    function setSideBullets(bulletEl, position) {
      const {
        bulletActiveClass
      } = swiper.params.pagination;
      if (!bulletEl) return;
      bulletEl = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}`);
        bulletEl = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
        if (bulletEl) {
          bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
        }
      }
    }
    function onBulletClick(e) {
      const bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
      if (!bulletEl) {
        return;
      }
      e.preventDefault();
      const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
      if (swiper.params.loop) {
        if (swiper.realIndex === index) return;
        const newSlideIndex = swiper.getSlideIndexByData(index);
        const currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
        if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
          swiper.loopFix({
            direction: newSlideIndex > currentSlideIndex ? 'next' : 'prev',
            activeSlideIndex: newSlideIndex,
            slideTo: false
          });
        }
        swiper.slideToLoop(index);
      } else {
        swiper.slideTo(index);
      }
    }
    function update() {
      // Render || Update Pagination bullets/items
      const rtl = swiper.rtl;
      const params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      let el = swiper.pagination.el;
      el = makeElementsArray(el);
      // Current/Total
      let current;
      let previousIndex;
      const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.loop) {
        previousIndex = swiper.previousRealIndex || 0;
        current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
        previousIndex = swiper.previousSnapIndex;
      } else {
        previousIndex = swiper.previousIndex || 0;
        current = swiper.activeIndex || 0;
      }
      // Types
      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        const bullets = swiper.pagination.bullets;
        let firstIndex;
        let lastIndex;
        let midIndex;
        if (params.dynamicBullets) {
          bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? 'width' : 'height', true);
          el.forEach(subEl => {
            subEl.style[swiper.isHorizontal() ? 'width' : 'height'] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
          });
          if (params.dynamicMainBullets > 1 && previousIndex !== undefined) {
            dynamicBulletIndex += current - (previousIndex || 0);
            if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
              dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (dynamicBulletIndex < 0) {
              dynamicBulletIndex = 0;
            }
          }
          firstIndex = Math.max(current - dynamicBulletIndex, 0);
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.forEach(bulletEl => {
          const classesToRemove = [...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`)].map(s => typeof s === 'string' && s.includes(' ') ? s.split(' ') : s).flat();
          bulletEl.classList.remove(...classesToRemove);
        });
        if (el.length > 1) {
          bullets.forEach(bullet => {
            const bulletIndex = elementIndex(bullet);
            if (bulletIndex === current) {
              bullet.classList.add(...params.bulletActiveClass.split(' '));
            } else if (swiper.isElement) {
              bullet.setAttribute('part', 'bullet');
            }
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                bullet.classList.add(...`${params.bulletActiveClass}-main`.split(' '));
              }
              if (bulletIndex === firstIndex) {
                setSideBullets(bullet, 'prev');
              }
              if (bulletIndex === lastIndex) {
                setSideBullets(bullet, 'next');
              }
            }
          });
        } else {
          const bullet = bullets[current];
          if (bullet) {
            bullet.classList.add(...params.bulletActiveClass.split(' '));
          }
          if (swiper.isElement) {
            bullets.forEach((bulletEl, bulletIndex) => {
              bulletEl.setAttribute('part', bulletIndex === current ? 'bullet-active' : 'bullet');
            });
          }
          if (params.dynamicBullets) {
            const firstDisplayedBullet = bullets[firstIndex];
            const lastDisplayedBullet = bullets[lastIndex];
            for (let i = firstIndex; i <= lastIndex; i += 1) {
              if (bullets[i]) {
                bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(' '));
              }
            }
            setSideBullets(firstDisplayedBullet, 'prev');
            setSideBullets(lastDisplayedBullet, 'next');
          }
        }
        if (params.dynamicBullets) {
          const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
          const offsetProp = rtl ? 'right' : 'left';
          bullets.forEach(bullet => {
            bullet.style[swiper.isHorizontal() ? offsetProp : 'top'] = `${bulletsOffset}px`;
          });
        }
      }
      el.forEach((subEl, subElIndex) => {
        if (params.type === 'fraction') {
          subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach(fractionEl => {
            fractionEl.textContent = params.formatFractionCurrent(current + 1);
          });
          subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach(totalEl => {
            totalEl.textContent = params.formatFractionTotal(total);
          });
        }
        if (params.type === 'progressbar') {
          let progressbarDirection;
          if (params.progressbarOpposite) {
            progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
          } else {
            progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
          }
          const scale = (current + 1) / total;
          let scaleX = 1;
          let scaleY = 1;
          if (progressbarDirection === 'horizontal') {
            scaleX = scale;
          } else {
            scaleY = scale;
          }
          subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach(progressEl => {
            progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
            progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
          });
        }
        if (params.type === 'custom' && params.renderCustom) {
          subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
          if (subElIndex === 0) emit('paginationRender', subEl);
        } else {
          if (subElIndex === 0) emit('paginationRender', subEl);
          emit('paginationUpdate', subEl);
        }
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
        }
      });
    }
    function render() {
      // Render Container
      const params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      let el = swiper.pagination.el;
      el = makeElementsArray(el);
      let paginationHTML = '';
      if (params.type === 'bullets') {
        let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
          numberOfBullets = slidesLength;
        }
        for (let i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            // prettier-ignore
            paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ''} class="${params.bulletClass}"></${params.bulletElement}>`;
          }
        }
      }
      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
        }
      }
      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
        }
      }
      swiper.pagination.bullets = [];
      el.forEach(subEl => {
        if (params.type !== 'custom') {
          subEl.innerHTML = paginationHTML || '';
        }
        if (params.type === 'bullets') {
          swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
        }
      });
      if (params.type !== 'custom') {
        emit('paginationRender', el[0]);
      }
    }
    function init() {
      swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
        el: 'swiper-pagination'
      });
      const params = swiper.params.pagination;
      if (!params.el) return;
      let el;
      if (typeof params.el === 'string' && swiper.isElement) {
        el = swiper.el.querySelector(params.el);
      }
      if (!el && typeof params.el === 'string') {
        el = [...document.querySelectorAll(params.el)];
      }
      if (!el) {
        el = params.el;
      }
      if (!el || el.length === 0) return;
      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && Array.isArray(el) && el.length > 1) {
        el = [...swiper.el.querySelectorAll(params.el)];
        // check if it belongs to another nested Swiper
        if (el.length > 1) {
          el = el.filter(subEl => {
            if (elementParents(subEl, '.swiper')[0] !== swiper.el) return false;
            return true;
          })[0];
        }
      }
      if (Array.isArray(el) && el.length === 1) el = el[0];
      Object.assign(swiper.pagination, {
        el
      });
      el = makeElementsArray(el);
      el.forEach(subEl => {
        if (params.type === 'bullets' && params.clickable) {
          subEl.classList.add(params.clickableClass);
        }
        subEl.classList.add(params.modifierClass + params.type);
        subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.type === 'bullets' && params.dynamicBullets) {
          subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
          dynamicBulletIndex = 0;
          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }
        if (params.type === 'progressbar' && params.progressbarOpposite) {
          subEl.classList.add(params.progressbarOppositeClass);
        }
        if (params.clickable) {
          subEl.addEventListener('click', onBulletClick);
        }
        if (!swiper.enabled) {
          subEl.classList.add(params.lockClass);
        }
      });
    }
    function destroy() {
      const params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      let el = swiper.pagination.el;
      if (el) {
        el = makeElementsArray(el);
        el.forEach(subEl => {
          subEl.classList.remove(params.hiddenClass);
          subEl.classList.remove(params.modifierClass + params.type);
          subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
          if (params.clickable) {
            subEl.removeEventListener('click', onBulletClick);
          }
        });
      }
      if (swiper.pagination.bullets) swiper.pagination.bullets.forEach(subEl => subEl.classList.remove(...params.bulletActiveClass.split(' ')));
    }
    on('changeDirection', () => {
      if (!swiper.pagination || !swiper.pagination.el) return;
      const params = swiper.params.pagination;
      let {
        el
      } = swiper.pagination;
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.classList.remove(params.horizontalClass, params.verticalClass);
        subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      });
    });
    on('init', () => {
      if (swiper.params.pagination.enabled === false) {
        // eslint-disable-next-line
        disable();
      } else {
        init();
        render();
        update();
      }
    });
    on('activeIndexChange', () => {
      if (typeof swiper.snapIndex === 'undefined') {
        update();
      }
    });
    on('snapIndexChange', () => {
      update();
    });
    on('snapGridLengthChange', () => {
      render();
      update();
    });
    on('destroy', () => {
      destroy();
    });
    on('enable disable', () => {
      let {
        el
      } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach(subEl => subEl.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.pagination.lockClass));
      }
    });
    on('lock unlock', () => {
      update();
    });
    on('click', (_s, e) => {
      const targetEl = e.target;
      let {
        el
      } = swiper.pagination;
      if (!Array.isArray(el)) el = [el].filter(element => !!element);
      if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
        if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
        const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
        if (isHidden === true) {
          emit('paginationShow');
        } else {
          emit('paginationHide');
        }
        el.forEach(subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
      }
    });
    const enable = () => {
      swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
      let {
        el
      } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach(subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
      }
      init();
      render();
      update();
    };
    const disable = () => {
      swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
      let {
        el
      } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach(subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
      }
      destroy();
    };
    Object.assign(swiper.pagination, {
      enable,
      disable,
      render,
      update,
      init,
      destroy
    });
  }

  function Scrollbar(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const document = getDocument();
    let isTouched = false;
    let timeout = null;
    let dragTimeout = null;
    let dragStartPos;
    let dragSize;
    let trackSize;
    let divider;
    extendParams({
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: 'swiper-scrollbar-lock',
        dragClass: 'swiper-scrollbar-drag',
        scrollbarDisabledClass: 'swiper-scrollbar-disabled',
        horizontalClass: `swiper-scrollbar-horizontal`,
        verticalClass: `swiper-scrollbar-vertical`
      }
    });
    swiper.scrollbar = {
      el: null,
      dragEl: null
    };
    function setTranslate() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      const {
        scrollbar,
        rtlTranslate: rtl
      } = swiper;
      const {
        dragEl,
        el
      } = scrollbar;
      const params = swiper.params.scrollbar;
      const progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
      let newSize = dragSize;
      let newPos = (trackSize - dragSize) * progress;
      if (rtl) {
        newPos = -newPos;
        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }
      if (swiper.isHorizontal()) {
        dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
        dragEl.style.width = `${newSize}px`;
      } else {
        dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
        dragEl.style.height = `${newSize}px`;
      }
      if (params.hide) {
        clearTimeout(timeout);
        el.style.opacity = 1;
        timeout = setTimeout(() => {
          el.style.opacity = 0;
          el.style.transitionDuration = '400ms';
        }, 1000);
      }
    }
    function setTransition(duration) {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
    }
    function updateSize() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      const {
        scrollbar
      } = swiper;
      const {
        dragEl,
        el
      } = scrollbar;
      dragEl.style.width = '';
      dragEl.style.height = '';
      trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
      divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }
      if (swiper.isHorizontal()) {
        dragEl.style.width = `${dragSize}px`;
      } else {
        dragEl.style.height = `${dragSize}px`;
      }
      if (divider >= 1) {
        el.style.display = 'none';
      } else {
        el.style.display = '';
      }
      if (swiper.params.scrollbar.hide) {
        el.style.opacity = 0;
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        scrollbar.el.classList[swiper.isLocked ? 'add' : 'remove'](swiper.params.scrollbar.lockClass);
      }
    }
    function getPointerPosition(e) {
      return swiper.isHorizontal() ? e.clientX : e.clientY;
    }
    function setDragPosition(e) {
      const {
        scrollbar,
        rtlTranslate: rtl
      } = swiper;
      const {
        el
      } = scrollbar;
      let positionRatio;
      positionRatio = (getPointerPosition(e) - elementOffset(el)[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);
      if (rtl) {
        positionRatio = 1 - positionRatio;
      }
      const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    function onDragStart(e) {
      const params = swiper.params.scrollbar;
      const {
        scrollbar,
        wrapperEl
      } = swiper;
      const {
        el,
        dragEl
      } = scrollbar;
      isTouched = true;
      dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
      e.preventDefault();
      e.stopPropagation();
      wrapperEl.style.transitionDuration = '100ms';
      dragEl.style.transitionDuration = '100ms';
      setDragPosition(e);
      clearTimeout(dragTimeout);
      el.style.transitionDuration = '0ms';
      if (params.hide) {
        el.style.opacity = 1;
      }
      if (swiper.params.cssMode) {
        swiper.wrapperEl.style['scroll-snap-type'] = 'none';
      }
      emit('scrollbarDragStart', e);
    }
    function onDragMove(e) {
      const {
        scrollbar,
        wrapperEl
      } = swiper;
      const {
        el,
        dragEl
      } = scrollbar;
      if (!isTouched) return;
      if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      setDragPosition(e);
      wrapperEl.style.transitionDuration = '0ms';
      el.style.transitionDuration = '0ms';
      dragEl.style.transitionDuration = '0ms';
      emit('scrollbarDragMove', e);
    }
    function onDragEnd(e) {
      const params = swiper.params.scrollbar;
      const {
        scrollbar,
        wrapperEl
      } = swiper;
      const {
        el
      } = scrollbar;
      if (!isTouched) return;
      isTouched = false;
      if (swiper.params.cssMode) {
        swiper.wrapperEl.style['scroll-snap-type'] = '';
        wrapperEl.style.transitionDuration = '';
      }
      if (params.hide) {
        clearTimeout(dragTimeout);
        dragTimeout = nextTick(() => {
          el.style.opacity = 0;
          el.style.transitionDuration = '400ms';
        }, 1000);
      }
      emit('scrollbarDragEnd', e);
      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    }
    function events(method) {
      const {
        scrollbar,
        params
      } = swiper;
      const el = scrollbar.el;
      if (!el) return;
      const target = el;
      const activeListener = params.passiveListeners ? {
        passive: false,
        capture: false
      } : false;
      const passiveListener = params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      if (!target) return;
      const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
      target[eventMethod]('pointerdown', onDragStart, activeListener);
      document[eventMethod]('pointermove', onDragMove, activeListener);
      document[eventMethod]('pointerup', onDragEnd, passiveListener);
    }
    function enableDraggable() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      events('on');
    }
    function disableDraggable() {
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      events('off');
    }
    function init() {
      const {
        scrollbar,
        el: swiperEl
      } = swiper;
      swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
        el: 'swiper-scrollbar'
      });
      const params = swiper.params.scrollbar;
      if (!params.el) return;
      let el;
      if (typeof params.el === 'string' && swiper.isElement) {
        el = swiper.el.querySelector(params.el);
      }
      if (!el && typeof params.el === 'string') {
        el = document.querySelectorAll(params.el);
      } else if (!el) {
        el = params.el;
      }
      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && el.length > 1 && swiperEl.querySelectorAll(params.el).length === 1) {
        el = swiperEl.querySelector(params.el);
      }
      if (el.length > 0) el = el[0];
      el.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      let dragEl;
      if (el) {
        dragEl = el.querySelector(`.${swiper.params.scrollbar.dragClass}`);
        if (!dragEl) {
          dragEl = createElement('div', swiper.params.scrollbar.dragClass);
          el.append(dragEl);
        }
      }
      Object.assign(scrollbar, {
        el,
        dragEl
      });
      if (params.draggable) {
        enableDraggable();
      }
      if (el) {
        el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.scrollbar.lockClass);
      }
    }
    function destroy() {
      const params = swiper.params.scrollbar;
      const el = swiper.scrollbar.el;
      if (el) {
        el.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      }
      disableDraggable();
    }
    on('init', () => {
      if (swiper.params.scrollbar.enabled === false) {
        // eslint-disable-next-line
        disable();
      } else {
        init();
        updateSize();
        setTranslate();
      }
    });
    on('update resize observerUpdate lock unlock', () => {
      updateSize();
    });
    on('setTranslate', () => {
      setTranslate();
    });
    on('setTransition', (_s, duration) => {
      setTransition(duration);
    });
    on('enable disable', () => {
      const {
        el
      } = swiper.scrollbar;
      if (el) {
        el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.scrollbar.lockClass);
      }
    });
    on('destroy', () => {
      destroy();
    });
    const enable = () => {
      swiper.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
      if (swiper.scrollbar.el) {
        swiper.scrollbar.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
      }
      init();
      updateSize();
      setTranslate();
    };
    const disable = () => {
      swiper.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
      if (swiper.scrollbar.el) {
        swiper.scrollbar.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
      }
      destroy();
    };
    Object.assign(swiper.scrollbar, {
      enable,
      disable,
      updateSize,
      setTranslate,
      init,
      destroy
    });
  }

  function Parallax(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      parallax: {
        enabled: false
      }
    });
    const setTransform = (el, progress) => {
      const {
        rtl
      } = swiper;
      const rtlFactor = rtl ? -1 : 1;
      const p = el.getAttribute('data-swiper-parallax') || '0';
      let x = el.getAttribute('data-swiper-parallax-x');
      let y = el.getAttribute('data-swiper-parallax-y');
      const scale = el.getAttribute('data-swiper-parallax-scale');
      const opacity = el.getAttribute('data-swiper-parallax-opacity');
      const rotate = el.getAttribute('data-swiper-parallax-rotate');
      if (x || y) {
        x = x || '0';
        y = y || '0';
      } else if (swiper.isHorizontal()) {
        x = p;
        y = '0';
      } else {
        y = p;
        x = '0';
      }
      if (x.indexOf('%') >= 0) {
        x = `${parseInt(x, 10) * progress * rtlFactor}%`;
      } else {
        x = `${x * progress * rtlFactor}px`;
      }
      if (y.indexOf('%') >= 0) {
        y = `${parseInt(y, 10) * progress}%`;
      } else {
        y = `${y * progress}px`;
      }
      if (typeof opacity !== 'undefined' && opacity !== null) {
        const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
        el.style.opacity = currentOpacity;
      }
      let transform = `translate3d(${x}, ${y}, 0px)`;
      if (typeof scale !== 'undefined' && scale !== null) {
        const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
        transform += ` scale(${currentScale})`;
      }
      if (rotate && typeof rotate !== 'undefined' && rotate !== null) {
        const currentRotate = rotate * progress * -1;
        transform += ` rotate(${currentRotate}deg)`;
      }
      el.style.transform = transform;
    };
    const setTranslate = () => {
      const {
        el,
        slides,
        progress,
        snapGrid
      } = swiper;
      elementChildren(el, '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').forEach(subEl => {
        setTransform(subEl, progress);
      });
      slides.forEach((slideEl, slideIndex) => {
        let slideProgress = slideEl.progress;
        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
          slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
        }
        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        slideEl.querySelectorAll('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]').forEach(subEl => {
          setTransform(subEl, slideProgress);
        });
      });
    };
    const setTransition = function (duration) {
      if (duration === void 0) {
        duration = swiper.params.speed;
      }
      const {
        el
      } = swiper;
      el.querySelectorAll('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').forEach(parallaxEl => {
        let parallaxDuration = parseInt(parallaxEl.getAttribute('data-swiper-parallax-duration'), 10) || duration;
        if (duration === 0) parallaxDuration = 0;
        parallaxEl.style.transitionDuration = `${parallaxDuration}ms`;
      });
    };
    on('beforeInit', () => {
      if (!swiper.params.parallax.enabled) return;
      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    });
    on('init', () => {
      if (!swiper.params.parallax.enabled) return;
      setTranslate();
    });
    on('setTranslate', () => {
      if (!swiper.params.parallax.enabled) return;
      setTranslate();
    });
    on('setTransition', (_swiper, duration) => {
      if (!swiper.params.parallax.enabled) return;
      setTransition(duration);
    });
  }

  function Zoom(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const window = getWindow();
    extendParams({
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: 'swiper-zoom-container',
        zoomedSlideClass: 'swiper-slide-zoomed'
      }
    });
    swiper.zoom = {
      enabled: false
    };
    let currentScale = 1;
    let isScaling = false;
    let fakeGestureTouched;
    let fakeGestureMoved;
    const evCache = [];
    const gesture = {
      originX: 0,
      originY: 0,
      slideEl: undefined,
      slideWidth: undefined,
      slideHeight: undefined,
      imageEl: undefined,
      imageWrapEl: undefined,
      maxRatio: 3
    };
    const image = {
      isTouched: undefined,
      isMoved: undefined,
      currentX: undefined,
      currentY: undefined,
      minX: undefined,
      minY: undefined,
      maxX: undefined,
      maxY: undefined,
      width: undefined,
      height: undefined,
      startX: undefined,
      startY: undefined,
      touchesStart: {},
      touchesCurrent: {}
    };
    const velocity = {
      x: undefined,
      y: undefined,
      prevPositionX: undefined,
      prevPositionY: undefined,
      prevTime: undefined
    };
    let scale = 1;
    Object.defineProperty(swiper.zoom, 'scale', {
      get() {
        return scale;
      },
      set(value) {
        if (scale !== value) {
          const imageEl = gesture.imageEl;
          const slideEl = gesture.slideEl;
          emit('zoomChange', value, imageEl, slideEl);
        }
        scale = value;
      }
    });
    function getDistanceBetweenTouches() {
      if (evCache.length < 2) return 1;
      const x1 = evCache[0].pageX;
      const y1 = evCache[0].pageY;
      const x2 = evCache[1].pageX;
      const y2 = evCache[1].pageY;
      const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      return distance;
    }
    function getScaleOrigin() {
      if (evCache.length < 2) return {
        x: null,
        y: null
      };
      const box = gesture.imageEl.getBoundingClientRect();
      return [(evCache[0].pageX + (evCache[1].pageX - evCache[0].pageX) / 2 - box.x) / currentScale, (evCache[0].pageY + (evCache[1].pageY - evCache[0].pageY) / 2 - box.y) / currentScale];
    }
    function getSlideSelector() {
      return swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
    }
    function eventWithinSlide(e) {
      const slideSelector = getSlideSelector();
      if (e.target.matches(slideSelector)) return true;
      if (swiper.slides.filter(slideEl => slideEl.contains(e.target)).length > 0) return true;
      return false;
    }
    function eventWithinZoomContainer(e) {
      const selector = `.${swiper.params.zoom.containerClass}`;
      if (e.target.matches(selector)) return true;
      if ([...swiper.el.querySelectorAll(selector)].filter(containerEl => containerEl.contains(e.target)).length > 0) return true;
      return false;
    }

    // Events
    function onGestureStart(e) {
      if (e.pointerType === 'mouse') {
        evCache.splice(0, evCache.length);
      }
      if (!eventWithinSlide(e)) return;
      const params = swiper.params.zoom;
      fakeGestureTouched = false;
      fakeGestureMoved = false;
      evCache.push(e);
      if (evCache.length < 2) {
        return;
      }
      fakeGestureTouched = true;
      gesture.scaleStart = getDistanceBetweenTouches();
      if (!gesture.slideEl) {
        gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
        if (!gesture.slideEl) gesture.slideEl = swiper.slides[swiper.activeIndex];
        let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
        if (imageEl) {
          imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
        }
        gesture.imageEl = imageEl;
        if (imageEl) {
          gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
        } else {
          gesture.imageWrapEl = undefined;
        }
        if (!gesture.imageWrapEl) {
          gesture.imageEl = undefined;
          return;
        }
        gesture.maxRatio = gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
      }
      if (gesture.imageEl) {
        const [originX, originY] = getScaleOrigin();
        gesture.originX = originX;
        gesture.originY = originY;
        gesture.imageEl.style.transitionDuration = '0ms';
      }
      isScaling = true;
    }
    function onGestureChange(e) {
      if (!eventWithinSlide(e)) return;
      const params = swiper.params.zoom;
      const zoom = swiper.zoom;
      const pointerIndex = evCache.findIndex(cachedEv => cachedEv.pointerId === e.pointerId);
      if (pointerIndex >= 0) evCache[pointerIndex] = e;
      if (evCache.length < 2) {
        return;
      }
      fakeGestureMoved = true;
      gesture.scaleMove = getDistanceBetweenTouches();
      if (!gesture.imageEl) {
        return;
      }
      zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
      }
      if (zoom.scale < params.minRatio) {
        zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
      }
      gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
    }
    function onGestureEnd(e) {
      if (!eventWithinSlide(e)) return;
      if (e.pointerType === 'mouse' && e.type === 'pointerout') return;
      const params = swiper.params.zoom;
      const zoom = swiper.zoom;
      const pointerIndex = evCache.findIndex(cachedEv => cachedEv.pointerId === e.pointerId);
      if (pointerIndex >= 0) evCache.splice(pointerIndex, 1);
      if (!fakeGestureTouched || !fakeGestureMoved) {
        return;
      }
      fakeGestureTouched = false;
      fakeGestureMoved = false;
      if (!gesture.imageEl) return;
      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.imageEl.style.transitionDuration = `${swiper.params.speed}ms`;
      gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
      currentScale = zoom.scale;
      isScaling = false;
      if (zoom.scale > 1 && gesture.slideEl) {
        gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
      } else if (zoom.scale <= 1 && gesture.slideEl) {
        gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
      }
      if (zoom.scale === 1) {
        gesture.originX = 0;
        gesture.originY = 0;
        gesture.slideEl = undefined;
      }
    }
    function onTouchStart(e) {
      const device = swiper.device;
      if (!gesture.imageEl) return;
      if (image.isTouched) return;
      if (device.android && e.cancelable) e.preventDefault();
      image.isTouched = true;
      const event = evCache.length > 0 ? evCache[0] : e;
      image.touchesStart.x = event.pageX;
      image.touchesStart.y = event.pageY;
    }
    function onTouchMove(e) {
      if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) return;
      const zoom = swiper.zoom;
      if (!gesture.imageEl) return;
      if (!image.isTouched || !gesture.slideEl) return;
      if (!image.isMoved) {
        image.width = gesture.imageEl.offsetWidth;
        image.height = gesture.imageEl.offsetHeight;
        image.startX = getTranslate(gesture.imageWrapEl, 'x') || 0;
        image.startY = getTranslate(gesture.imageWrapEl, 'y') || 0;
        gesture.slideWidth = gesture.slideEl.offsetWidth;
        gesture.slideHeight = gesture.slideEl.offsetHeight;
        gesture.imageWrapEl.style.transitionDuration = '0ms';
      }
      // Define if we need image drag
      const scaledWidth = image.width * zoom.scale;
      const scaledHeight = image.height * zoom.scale;
      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.touchesCurrent.x = evCache.length > 0 ? evCache[0].pageX : e.pageX;
      image.touchesCurrent.y = evCache.length > 0 ? evCache[0].pageY : e.pageY;
      const touchesDiff = Math.max(Math.abs(image.touchesCurrent.x - image.touchesStart.x), Math.abs(image.touchesCurrent.y - image.touchesStart.y));
      if (touchesDiff > 5) {
        swiper.allowClick = false;
      }
      if (!image.isMoved && !isScaling) {
        if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
          image.isTouched = false;
          return;
        }
        if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
          image.isTouched = false;
          return;
        }
      }
      if (e.cancelable) {
        e.preventDefault();
      }
      e.stopPropagation();
      image.isMoved = true;
      const scaleRatio = (zoom.scale - currentScale) / (gesture.maxRatio - swiper.params.zoom.minRatio);
      const {
        originX,
        originY
      } = gesture;
      image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX + scaleRatio * (image.width - originX * 2);
      image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY + scaleRatio * (image.height - originY * 2);
      if (image.currentX < image.minX) {
        image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
      }
      if (image.currentX > image.maxX) {
        image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
      }
      if (image.currentY < image.minY) {
        image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
      }
      if (image.currentY > image.maxY) {
        image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
      }

      // Velocity
      if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
      if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
      if (!velocity.prevTime) velocity.prevTime = Date.now();
      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();
      gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
    }
    function onTouchEnd() {
      const zoom = swiper.zoom;
      if (!gesture.imageEl) return;
      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }
      image.isTouched = false;
      image.isMoved = false;
      let momentumDurationX = 300;
      let momentumDurationY = 300;
      const momentumDistanceX = velocity.x * momentumDurationX;
      const newPositionX = image.currentX + momentumDistanceX;
      const momentumDistanceY = velocity.y * momentumDurationY;
      const newPositionY = image.currentY + momentumDistanceY;

      // Fix duration
      if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
      if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
      const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
      image.currentX = newPositionX;
      image.currentY = newPositionY;
      // Define if we need image drag
      const scaledWidth = image.width * zoom.scale;
      const scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
      gesture.imageWrapEl.style.transitionDuration = `${momentumDuration}ms`;
      gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
    }
    function onTransitionEnd() {
      const zoom = swiper.zoom;
      if (gesture.slideEl && swiper.activeIndex !== swiper.slides.indexOf(gesture.slideEl)) {
        if (gesture.imageEl) {
          gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
        }
        if (gesture.imageWrapEl) {
          gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
        }
        gesture.slideEl.classList.remove(`${swiper.params.zoom.zoomedSlideClass}`);
        zoom.scale = 1;
        currentScale = 1;
        gesture.slideEl = undefined;
        gesture.imageEl = undefined;
        gesture.imageWrapEl = undefined;
        gesture.originX = 0;
        gesture.originY = 0;
      }
    }
    function zoomIn(e) {
      const zoom = swiper.zoom;
      const params = swiper.params.zoom;
      if (!gesture.slideEl) {
        if (e && e.target) {
          gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
        }
        if (!gesture.slideEl) {
          if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
            gesture.slideEl = elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
          } else {
            gesture.slideEl = swiper.slides[swiper.activeIndex];
          }
        }
        let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
        if (imageEl) {
          imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
        }
        gesture.imageEl = imageEl;
        if (imageEl) {
          gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
        } else {
          gesture.imageWrapEl = undefined;
        }
      }
      if (!gesture.imageEl || !gesture.imageWrapEl) return;
      if (swiper.params.cssMode) {
        swiper.wrapperEl.style.overflow = 'hidden';
        swiper.wrapperEl.style.touchAction = 'none';
      }
      gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
      let touchX;
      let touchY;
      let offsetX;
      let offsetY;
      let diffX;
      let diffY;
      let translateX;
      let translateY;
      let imageWidth;
      let imageHeight;
      let scaledWidth;
      let scaledHeight;
      let translateMinX;
      let translateMinY;
      let translateMaxX;
      let translateMaxY;
      let slideWidth;
      let slideHeight;
      if (typeof image.touchesStart.x === 'undefined' && e) {
        touchX = e.pageX;
        touchY = e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }
      const forceZoomRatio = typeof e === 'number' ? e : null;
      if (currentScale === 1 && forceZoomRatio) {
        touchX = undefined;
        touchY = undefined;
      }
      zoom.scale = forceZoomRatio || gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
      currentScale = forceZoomRatio || gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
      if (e && !(currentScale === 1 && forceZoomRatio)) {
        slideWidth = gesture.slideEl.offsetWidth;
        slideHeight = gesture.slideEl.offsetHeight;
        offsetX = elementOffset(gesture.slideEl).left + window.scrollX;
        offsetY = elementOffset(gesture.slideEl).top + window.scrollY;
        diffX = offsetX + slideWidth / 2 - touchX;
        diffY = offsetY + slideHeight / 2 - touchY;
        imageWidth = gesture.imageEl.offsetWidth;
        imageHeight = gesture.imageEl.offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;
        translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
        translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;
        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;
        if (translateX < translateMinX) {
          translateX = translateMinX;
        }
        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }
        if (translateY < translateMinY) {
          translateY = translateMinY;
        }
        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }
      if (forceZoomRatio && zoom.scale === 1) {
        gesture.originX = 0;
        gesture.originY = 0;
      }
      gesture.imageWrapEl.style.transitionDuration = '300ms';
      gesture.imageWrapEl.style.transform = `translate3d(${translateX}px, ${translateY}px,0)`;
      gesture.imageEl.style.transitionDuration = '300ms';
      gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
    }
    function zoomOut() {
      const zoom = swiper.zoom;
      const params = swiper.params.zoom;
      if (!gesture.slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.slideEl = elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
        } else {
          gesture.slideEl = swiper.slides[swiper.activeIndex];
        }
        let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
        if (imageEl) {
          imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
        }
        gesture.imageEl = imageEl;
        if (imageEl) {
          gesture.imageWrapEl = elementParents(gesture.imageEl, `.${params.containerClass}`)[0];
        } else {
          gesture.imageWrapEl = undefined;
        }
      }
      if (!gesture.imageEl || !gesture.imageWrapEl) return;
      if (swiper.params.cssMode) {
        swiper.wrapperEl.style.overflow = '';
        swiper.wrapperEl.style.touchAction = '';
      }
      zoom.scale = 1;
      currentScale = 1;
      gesture.imageWrapEl.style.transitionDuration = '300ms';
      gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
      gesture.imageEl.style.transitionDuration = '300ms';
      gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
      gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
      gesture.slideEl = undefined;
      gesture.originX = 0;
      gesture.originY = 0;
    }

    // Toggle Zoom
    function zoomToggle(e) {
      const zoom = swiper.zoom;
      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoomOut();
      } else {
        // Zoom In
        zoomIn(e);
      }
    }
    function getListeners() {
      const passiveListener = swiper.params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      const activeListenerWithCapture = swiper.params.passiveListeners ? {
        passive: false,
        capture: true
      } : true;
      return {
        passiveListener,
        activeListenerWithCapture
      };
    }

    // Attach/Detach Events
    function enable() {
      const zoom = swiper.zoom;
      if (zoom.enabled) return;
      zoom.enabled = true;
      const {
        passiveListener,
        activeListenerWithCapture
      } = getListeners();

      // Scale image
      swiper.wrapperEl.addEventListener('pointerdown', onGestureStart, passiveListener);
      swiper.wrapperEl.addEventListener('pointermove', onGestureChange, activeListenerWithCapture);
      ['pointerup', 'pointercancel', 'pointerout'].forEach(eventName => {
        swiper.wrapperEl.addEventListener(eventName, onGestureEnd, passiveListener);
      });

      // Move image
      swiper.wrapperEl.addEventListener('pointermove', onTouchMove, activeListenerWithCapture);
    }
    function disable() {
      const zoom = swiper.zoom;
      if (!zoom.enabled) return;
      zoom.enabled = false;
      const {
        passiveListener,
        activeListenerWithCapture
      } = getListeners();

      // Scale image
      swiper.wrapperEl.removeEventListener('pointerdown', onGestureStart, passiveListener);
      swiper.wrapperEl.removeEventListener('pointermove', onGestureChange, activeListenerWithCapture);
      ['pointerup', 'pointercancel', 'pointerout'].forEach(eventName => {
        swiper.wrapperEl.removeEventListener(eventName, onGestureEnd, passiveListener);
      });

      // Move image
      swiper.wrapperEl.removeEventListener('pointermove', onTouchMove, activeListenerWithCapture);
    }
    on('init', () => {
      if (swiper.params.zoom.enabled) {
        enable();
      }
    });
    on('destroy', () => {
      disable();
    });
    on('touchStart', (_s, e) => {
      if (!swiper.zoom.enabled) return;
      onTouchStart(e);
    });
    on('touchEnd', (_s, e) => {
      if (!swiper.zoom.enabled) return;
      onTouchEnd();
    });
    on('doubleTap', (_s, e) => {
      if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
        zoomToggle(e);
      }
    });
    on('transitionEnd', () => {
      if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
        onTransitionEnd();
      }
    });
    on('slideChange', () => {
      if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
        onTransitionEnd();
      }
    });
    Object.assign(swiper.zoom, {
      enable,
      disable,
      in: zoomIn,
      out: zoomOut,
      toggle: zoomToggle
    });
  }

  /* eslint no-bitwise: ["error", { "allow": [">>"] }] */
  function Controller(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      controller: {
        control: undefined,
        inverse: false,
        by: 'slide' // or 'container'
      }
    });

    swiper.controller = {
      control: undefined
    };
    function LinearSpline(x, y) {
      const binarySearch = function search() {
        let maxIndex;
        let minIndex;
        let guess;
        return (array, val) => {
          minIndex = -1;
          maxIndex = array.length;
          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;
            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }
          return maxIndex;
        };
      }();
      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1;
      // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.
      let i1;
      let i3;
      this.interpolate = function interpolate(x2) {
        if (!x2) return 0;

        // Get the indexes of x1 and x3 (the array indexes before and after given x2):
        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1;

        // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
        return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
      };
      return this;
    }
    function getInterpolateFunction(c) {
      swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
    }
    function setTranslate(_t, byController) {
      const controlled = swiper.controller.control;
      let multiplier;
      let controlledTranslate;
      const Swiper = swiper.constructor;
      function setControlledTranslate(c) {
        if (c.destroyed) return;

        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
        if (swiper.params.controller.by === 'slide') {
          getInterpolateFunction(c);
          // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out
          controlledTranslate = -swiper.controller.spline.interpolate(-translate);
        }
        if (!controlledTranslate || swiper.params.controller.by === 'container') {
          multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
            multiplier = 1;
          }
          controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
        }
        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }
        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }
      if (Array.isArray(controlled)) {
        for (let i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    }
    function setTransition(duration, byController) {
      const Swiper = swiper.constructor;
      const controlled = swiper.controller.control;
      let i;
      function setControlledTransition(c) {
        if (c.destroyed) return;
        c.setTransition(duration, swiper);
        if (duration !== 0) {
          c.transitionStart();
          if (c.params.autoHeight) {
            nextTick(() => {
              c.updateAutoHeight();
            });
          }
          elementTransitionEnd(c.wrapperEl, () => {
            if (!controlled) return;
            c.transitionEnd();
          });
        }
      }
      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTransition(controlled);
      }
    }
    function removeSpline() {
      if (!swiper.controller.control) return;
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    }
    on('beforeInit', () => {
      if (typeof window !== 'undefined' && (
      // eslint-disable-line
      typeof swiper.params.controller.control === 'string' || swiper.params.controller.control instanceof HTMLElement)) {
        const controlElement = document.querySelector(swiper.params.controller.control);
        if (controlElement && controlElement.swiper) {
          swiper.controller.control = controlElement.swiper;
        } else if (controlElement) {
          const onControllerSwiper = e => {
            swiper.controller.control = e.detail[0];
            swiper.update();
            controlElement.removeEventListener('init', onControllerSwiper);
          };
          controlElement.addEventListener('init', onControllerSwiper);
        }
        return;
      }
      swiper.controller.control = swiper.params.controller.control;
    });
    on('update', () => {
      removeSpline();
    });
    on('resize', () => {
      removeSpline();
    });
    on('observerUpdate', () => {
      removeSpline();
    });
    on('setTranslate', (_s, translate, byController) => {
      if (!swiper.controller.control || swiper.controller.control.destroyed) return;
      swiper.controller.setTranslate(translate, byController);
    });
    on('setTransition', (_s, duration, byController) => {
      if (!swiper.controller.control || swiper.controller.control.destroyed) return;
      swiper.controller.setTransition(duration, byController);
    });
    Object.assign(swiper.controller, {
      setTranslate,
      setTransition
    });
  }

  function A11y(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      a11y: {
        enabled: true,
        notificationClass: 'swiper-notification',
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
        slideLabelMessage: '{{index}} / {{slidesLength}}',
        containerMessage: null,
        containerRoleDescriptionMessage: null,
        itemRoleDescriptionMessage: null,
        slideRole: 'group',
        id: null
      }
    });
    swiper.a11y = {
      clicked: false
    };
    let liveRegion = null;
    function notify(message) {
      const notification = liveRegion;
      if (notification.length === 0) return;
      notification.innerHTML = '';
      notification.innerHTML = message;
    }
    const makeElementsArray = el => {
      if (!Array.isArray(el)) el = [el].filter(e => !!e);
      return el;
    };
    function getRandomNumber(size) {
      if (size === void 0) {
        size = 16;
      }
      const randomChar = () => Math.round(16 * Math.random()).toString(16);
      return 'x'.repeat(size).replace(/x/g, randomChar);
    }
    function makeElFocusable(el) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.setAttribute('tabIndex', '0');
      });
    }
    function makeElNotFocusable(el) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.setAttribute('tabIndex', '-1');
      });
    }
    function addElRole(el, role) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.setAttribute('role', role);
      });
    }
    function addElRoleDescription(el, description) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.setAttribute('aria-roledescription', description);
      });
    }
    function addElControls(el, controls) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.setAttribute('aria-controls', controls);
      });
    }
    function addElLabel(el, label) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.setAttribute('aria-label', label);
      });
    }
    function addElId(el, id) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.setAttribute('id', id);
      });
    }
    function addElLive(el, live) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.setAttribute('aria-live', live);
      });
    }
    function disableEl(el) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.setAttribute('aria-disabled', true);
      });
    }
    function enableEl(el) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.setAttribute('aria-disabled', false);
      });
    }
    function onEnterOrSpaceKey(e) {
      if (e.keyCode !== 13 && e.keyCode !== 32) return;
      const params = swiper.params.a11y;
      const targetEl = e.target;
      if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target))) {
        if (!e.target.matches(classesToSelector(swiper.params.pagination.bulletClass))) return;
      }
      if (swiper.navigation && swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          notify(params.lastSlideMessage);
        } else {
          notify(params.nextSlideMessage);
        }
      }
      if (swiper.navigation && swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          notify(params.firstSlideMessage);
        } else {
          notify(params.prevSlideMessage);
        }
      }
      if (swiper.pagination && targetEl.matches(classesToSelector(swiper.params.pagination.bulletClass))) {
        targetEl.click();
      }
    }
    function updateNavigation() {
      if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
      const {
        nextEl,
        prevEl
      } = swiper.navigation;
      if (prevEl) {
        if (swiper.isBeginning) {
          disableEl(prevEl);
          makeElNotFocusable(prevEl);
        } else {
          enableEl(prevEl);
          makeElFocusable(prevEl);
        }
      }
      if (nextEl) {
        if (swiper.isEnd) {
          disableEl(nextEl);
          makeElNotFocusable(nextEl);
        } else {
          enableEl(nextEl);
          makeElFocusable(nextEl);
        }
      }
    }
    function hasPagination() {
      return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
    }
    function hasClickablePagination() {
      return hasPagination() && swiper.params.pagination.clickable;
    }
    function updatePagination() {
      const params = swiper.params.a11y;
      if (!hasPagination()) return;
      swiper.pagination.bullets.forEach(bulletEl => {
        if (swiper.params.pagination.clickable) {
          makeElFocusable(bulletEl);
          if (!swiper.params.pagination.renderBullet) {
            addElRole(bulletEl, 'button');
            addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, elementIndex(bulletEl) + 1));
          }
        }
        if (bulletEl.matches(classesToSelector(swiper.params.pagination.bulletActiveClass))) {
          bulletEl.setAttribute('aria-current', 'true');
        } else {
          bulletEl.removeAttribute('aria-current');
        }
      });
    }
    const initNavEl = (el, wrapperId, message) => {
      makeElFocusable(el);
      if (el.tagName !== 'BUTTON') {
        addElRole(el, 'button');
        el.addEventListener('keydown', onEnterOrSpaceKey);
      }
      addElLabel(el, message);
      addElControls(el, wrapperId);
    };
    const handlePointerDown = () => {
      swiper.a11y.clicked = true;
    };
    const handlePointerUp = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!swiper.destroyed) {
            swiper.a11y.clicked = false;
          }
        });
      });
    };
    const handleFocus = e => {
      if (swiper.a11y.clicked) return;
      const slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
      if (!slideEl || !swiper.slides.includes(slideEl)) return;
      const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
      const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
      if (isActive || isVisible) return;
      if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
      if (swiper.isHorizontal()) {
        swiper.el.scrollLeft = 0;
      } else {
        swiper.el.scrollTop = 0;
      }
      swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
    };
    const initSlides = () => {
      const params = swiper.params.a11y;
      if (params.itemRoleDescriptionMessage) {
        addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
      }
      if (params.slideRole) {
        addElRole(swiper.slides, params.slideRole);
      }
      const slidesLength = swiper.slides.length;
      if (params.slideLabelMessage) {
        swiper.slides.forEach((slideEl, index) => {
          const slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10) : index;
          const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
          addElLabel(slideEl, ariaLabelMessage);
        });
      }
    };
    const init = () => {
      const params = swiper.params.a11y;
      swiper.el.append(liveRegion);

      // Container
      const containerEl = swiper.el;
      if (params.containerRoleDescriptionMessage) {
        addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
      }
      if (params.containerMessage) {
        addElLabel(containerEl, params.containerMessage);
      }

      // Wrapper
      const wrapperEl = swiper.wrapperEl;
      const wrapperId = params.id || wrapperEl.getAttribute('id') || `swiper-wrapper-${getRandomNumber(16)}`;
      const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
      addElId(wrapperEl, wrapperId);
      addElLive(wrapperEl, live);

      // Slide
      initSlides();

      // Navigation
      let {
        nextEl,
        prevEl
      } = swiper.navigation ? swiper.navigation : {};
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      if (nextEl) {
        nextEl.forEach(el => initNavEl(el, wrapperId, params.nextSlideMessage));
      }
      if (prevEl) {
        prevEl.forEach(el => initNavEl(el, wrapperId, params.prevSlideMessage));
      }

      // Pagination
      if (hasClickablePagination()) {
        const paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [swiper.pagination.el];
        paginationEl.forEach(el => {
          el.addEventListener('keydown', onEnterOrSpaceKey);
        });
      }

      // Tab focus
      swiper.el.addEventListener('focus', handleFocus, true);
      swiper.el.addEventListener('pointerdown', handlePointerDown, true);
      swiper.el.addEventListener('pointerup', handlePointerUp, true);
    };
    function destroy() {
      if (liveRegion) liveRegion.remove();
      let {
        nextEl,
        prevEl
      } = swiper.navigation ? swiper.navigation : {};
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      if (nextEl) {
        nextEl.forEach(el => el.removeEventListener('keydown', onEnterOrSpaceKey));
      }
      if (prevEl) {
        prevEl.forEach(el => el.removeEventListener('keydown', onEnterOrSpaceKey));
      }

      // Pagination
      if (hasClickablePagination()) {
        const paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [swiper.pagination.el];
        paginationEl.forEach(el => {
          el.removeEventListener('keydown', onEnterOrSpaceKey);
        });
      }

      // Tab focus
      swiper.el.removeEventListener('focus', handleFocus, true);
      swiper.el.removeEventListener('pointerdown', handlePointerDown, true);
      swiper.el.removeEventListener('pointerup', handlePointerUp, true);
    }
    on('beforeInit', () => {
      liveRegion = createElement('span', swiper.params.a11y.notificationClass);
      liveRegion.setAttribute('aria-live', 'assertive');
      liveRegion.setAttribute('aria-atomic', 'true');
    });
    on('afterInit', () => {
      if (!swiper.params.a11y.enabled) return;
      init();
    });
    on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
      if (!swiper.params.a11y.enabled) return;
      initSlides();
    });
    on('fromEdge toEdge afterInit lock unlock', () => {
      if (!swiper.params.a11y.enabled) return;
      updateNavigation();
    });
    on('paginationUpdate', () => {
      if (!swiper.params.a11y.enabled) return;
      updatePagination();
    });
    on('destroy', () => {
      if (!swiper.params.a11y.enabled) return;
      destroy();
    });
  }

  function History(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      history: {
        enabled: false,
        root: '',
        replaceState: false,
        key: 'slides',
        keepQuery: false
      }
    });
    let initialized = false;
    let paths = {};
    const slugify = text => {
      return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    };
    const getPathValues = urlOverride => {
      const window = getWindow();
      let location;
      if (urlOverride) {
        location = new URL(urlOverride);
      } else {
        location = window.location;
      }
      const pathArray = location.pathname.slice(1).split('/').filter(part => part !== '');
      const total = pathArray.length;
      const key = pathArray[total - 2];
      const value = pathArray[total - 1];
      return {
        key,
        value
      };
    };
    const setHistory = (key, index) => {
      const window = getWindow();
      if (!initialized || !swiper.params.history.enabled) return;
      let location;
      if (swiper.params.url) {
        location = new URL(swiper.params.url);
      } else {
        location = window.location;
      }
      const slide = swiper.slides[index];
      let value = slugify(slide.getAttribute('data-history'));
      if (swiper.params.history.root.length > 0) {
        let root = swiper.params.history.root;
        if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
        value = `${root}/${key ? `${key}/` : ''}${value}`;
      } else if (!location.pathname.includes(key)) {
        value = `${key ? `${key}/` : ''}${value}`;
      }
      if (swiper.params.history.keepQuery) {
        value += location.search;
      }
      const currentState = window.history.state;
      if (currentState && currentState.value === value) {
        return;
      }
      if (swiper.params.history.replaceState) {
        window.history.replaceState({
          value
        }, null, value);
      } else {
        window.history.pushState({
          value
        }, null, value);
      }
    };
    const scrollToSlide = (speed, value, runCallbacks) => {
      if (value) {
        for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
          const slide = swiper.slides[i];
          const slideHistory = slugify(slide.getAttribute('data-history'));
          if (slideHistory === value) {
            const index = swiper.getSlideIndex(slide);
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    };
    const setHistoryPopState = () => {
      paths = getPathValues(swiper.params.url);
      scrollToSlide(swiper.params.speed, paths.value, false);
    };
    const init = () => {
      const window = getWindow();
      if (!swiper.params.history) return;
      if (!window.history || !window.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }
      initialized = true;
      paths = getPathValues(swiper.params.url);
      if (!paths.key && !paths.value) {
        if (!swiper.params.history.replaceState) {
          window.addEventListener('popstate', setHistoryPopState);
        }
        return;
      }
      scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
      if (!swiper.params.history.replaceState) {
        window.addEventListener('popstate', setHistoryPopState);
      }
    };
    const destroy = () => {
      const window = getWindow();
      if (!swiper.params.history.replaceState) {
        window.removeEventListener('popstate', setHistoryPopState);
      }
    };
    on('init', () => {
      if (swiper.params.history.enabled) {
        init();
      }
    });
    on('destroy', () => {
      if (swiper.params.history.enabled) {
        destroy();
      }
    });
    on('transitionEnd _freeModeNoMomentumRelease', () => {
      if (initialized) {
        setHistory(swiper.params.history.key, swiper.activeIndex);
      }
    });
    on('slideChange', () => {
      if (initialized && swiper.params.cssMode) {
        setHistory(swiper.params.history.key, swiper.activeIndex);
      }
    });
  }

  function HashNavigation(_ref) {
    let {
      swiper,
      extendParams,
      emit,
      on
    } = _ref;
    let initialized = false;
    const document = getDocument();
    const window = getWindow();
    extendParams({
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false,
        getSlideIndex(_s, hash) {
          if (swiper.virtual && swiper.params.virtual.enabled) {
            const slideWithHash = swiper.slides.filter(slideEl => slideEl.getAttribute('data-hash') === hash)[0];
            if (!slideWithHash) return 0;
            const index = parseInt(slideWithHash.getAttribute('data-swiper-slide-index'), 10);
            return index;
          }
          return swiper.getSlideIndex(elementChildren(swiper.slidesEl, `.${swiper.params.slideClass}[data-hash="${hash}"], swiper-slide[data-hash="${hash}"]`)[0]);
        }
      }
    });
    const onHashChange = () => {
      emit('hashChange');
      const newHash = document.location.hash.replace('#', '');
      const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
      const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') : '';
      if (newHash !== activeSlideHash) {
        const newIndex = swiper.params.hashNavigation.getSlideIndex(swiper, newHash);
        if (typeof newIndex === 'undefined' || Number.isNaN(newIndex)) return;
        swiper.slideTo(newIndex);
      }
    };
    const setHash = () => {
      if (!initialized || !swiper.params.hashNavigation.enabled) return;
      const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
      const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') || activeSlideEl.getAttribute('data-history') : '';
      if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
        window.history.replaceState(null, null, `#${activeSlideHash}` || '');
        emit('hashSet');
      } else {
        document.location.hash = activeSlideHash || '';
        emit('hashSet');
      }
    };
    const init = () => {
      if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
      initialized = true;
      const hash = document.location.hash.replace('#', '');
      if (hash) {
        const speed = 0;
        const index = swiper.params.hashNavigation.getSlideIndex(swiper, hash);
        swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
      }
      if (swiper.params.hashNavigation.watchState) {
        window.addEventListener('hashchange', onHashChange);
      }
    };
    const destroy = () => {
      if (swiper.params.hashNavigation.watchState) {
        window.removeEventListener('hashchange', onHashChange);
      }
    };
    on('init', () => {
      if (swiper.params.hashNavigation.enabled) {
        init();
      }
    });
    on('destroy', () => {
      if (swiper.params.hashNavigation.enabled) {
        destroy();
      }
    });
    on('transitionEnd _freeModeNoMomentumRelease', () => {
      if (initialized) {
        setHash();
      }
    });
    on('slideChange', () => {
      if (initialized && swiper.params.cssMode) {
        setHash();
      }
    });
  }

  /* eslint no-underscore-dangle: "off" */
  /* eslint no-use-before-define: "off" */
  function Autoplay(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit,
      params
    } = _ref;
    swiper.autoplay = {
      running: false,
      paused: false,
      timeLeft: 0
    };
    extendParams({
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false,
        pauseOnMouseEnter: false
      }
    });
    let timeout;
    let raf;
    let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3000;
    let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3000;
    let autoplayTimeLeft;
    let autoplayStartTime = new Date().getTime;
    let wasPaused;
    let isTouched;
    let pausedByTouch;
    let touchStartTimeout;
    let slideChanged;
    let pausedByInteraction;
    function onTransitionEnd(e) {
      if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
      if (e.target !== swiper.wrapperEl) return;
      swiper.wrapperEl.removeEventListener('transitionend', onTransitionEnd);
      resume();
    }
    const calcTimeLeft = () => {
      if (swiper.destroyed || !swiper.autoplay.running) return;
      if (swiper.autoplay.paused) {
        wasPaused = true;
      } else if (wasPaused) {
        autoplayDelayCurrent = autoplayTimeLeft;
        wasPaused = false;
      }
      const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
      swiper.autoplay.timeLeft = timeLeft;
      emit('autoplayTimeLeft', timeLeft, timeLeft / autoplayDelayTotal);
      raf = requestAnimationFrame(() => {
        calcTimeLeft();
      });
    };
    const getSlideDelay = () => {
      let activeSlideEl;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        activeSlideEl = swiper.slides.filter(slideEl => slideEl.classList.contains('swiper-slide-active'))[0];
      } else {
        activeSlideEl = swiper.slides[swiper.activeIndex];
      }
      if (!activeSlideEl) return undefined;
      const currentSlideDelay = parseInt(activeSlideEl.getAttribute('data-swiper-autoplay'), 10);
      return currentSlideDelay;
    };
    const run = delayForce => {
      if (swiper.destroyed || !swiper.autoplay.running) return;
      cancelAnimationFrame(raf);
      calcTimeLeft();
      let delay = typeof delayForce === 'undefined' ? swiper.params.autoplay.delay : delayForce;
      autoplayDelayTotal = swiper.params.autoplay.delay;
      autoplayDelayCurrent = swiper.params.autoplay.delay;
      const currentSlideDelay = getSlideDelay();
      if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === 'undefined') {
        delay = currentSlideDelay;
        autoplayDelayTotal = currentSlideDelay;
        autoplayDelayCurrent = currentSlideDelay;
      }
      autoplayTimeLeft = delay;
      const speed = swiper.params.speed;
      const proceed = () => {
        if (!swiper || swiper.destroyed) return;
        if (swiper.params.autoplay.reverseDirection) {
          if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
            swiper.slidePrev(speed, true, true);
            emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, speed, true, true);
            emit('autoplay');
          }
        } else {
          if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
            swiper.slideNext(speed, true, true);
            emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(0, speed, true, true);
            emit('autoplay');
          }
        }
        if (swiper.params.cssMode) {
          autoplayStartTime = new Date().getTime();
          requestAnimationFrame(() => {
            run();
          });
        }
      };
      if (delay > 0) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          proceed();
        }, delay);
      } else {
        requestAnimationFrame(() => {
          proceed();
        });
      }

      // eslint-disable-next-line
      return delay;
    };
    const start = () => {
      swiper.autoplay.running = true;
      run();
      emit('autoplayStart');
    };
    const stop = () => {
      swiper.autoplay.running = false;
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
      emit('autoplayStop');
    };
    const pause = (internal, reset) => {
      if (swiper.destroyed || !swiper.autoplay.running) return;
      clearTimeout(timeout);
      if (!internal) {
        pausedByInteraction = true;
      }
      const proceed = () => {
        emit('autoplayPause');
        if (swiper.params.autoplay.waitForTransition) {
          swiper.wrapperEl.addEventListener('transitionend', onTransitionEnd);
        } else {
          resume();
        }
      };
      swiper.autoplay.paused = true;
      if (reset) {
        if (slideChanged) {
          autoplayTimeLeft = swiper.params.autoplay.delay;
        }
        slideChanged = false;
        proceed();
        return;
      }
      const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
      autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
      if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
      if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
      proceed();
    };
    const resume = () => {
      if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
      autoplayStartTime = new Date().getTime();
      if (pausedByInteraction) {
        pausedByInteraction = false;
        run(autoplayTimeLeft);
      } else {
        run();
      }
      swiper.autoplay.paused = false;
      emit('autoplayResume');
    };
    const onVisibilityChange = () => {
      if (swiper.destroyed || !swiper.autoplay.running) return;
      const document = getDocument();
      if (document.visibilityState === 'hidden') {
        pausedByInteraction = true;
        pause(true);
      }
      if (document.visibilityState === 'visible') {
        resume();
      }
    };
    const onPointerEnter = e => {
      if (e.pointerType !== 'mouse') return;
      pausedByInteraction = true;
      pause(true);
    };
    const onPointerLeave = e => {
      if (e.pointerType !== 'mouse') return;
      if (swiper.autoplay.paused) {
        resume();
      }
    };
    const attachMouseEvents = () => {
      if (swiper.params.autoplay.pauseOnMouseEnter) {
        swiper.el.addEventListener('pointerenter', onPointerEnter);
        swiper.el.addEventListener('pointerleave', onPointerLeave);
      }
    };
    const detachMouseEvents = () => {
      swiper.el.removeEventListener('pointerenter', onPointerEnter);
      swiper.el.removeEventListener('pointerleave', onPointerLeave);
    };
    const attachDocumentEvents = () => {
      const document = getDocument();
      document.addEventListener('visibilitychange', onVisibilityChange);
    };
    const detachDocumentEvents = () => {
      const document = getDocument();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
    on('init', () => {
      if (swiper.params.autoplay.enabled) {
        attachMouseEvents();
        attachDocumentEvents();
        autoplayStartTime = new Date().getTime();
        start();
      }
    });
    on('destroy', () => {
      detachMouseEvents();
      detachDocumentEvents();
      if (swiper.autoplay.running) {
        stop();
      }
    });
    on('beforeTransitionStart', (_s, speed, internal) => {
      if (swiper.destroyed || !swiper.autoplay.running) return;
      if (internal || !swiper.params.autoplay.disableOnInteraction) {
        pause(true, true);
      } else {
        stop();
      }
    });
    on('sliderFirstMove', () => {
      if (swiper.destroyed || !swiper.autoplay.running) return;
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
        return;
      }
      isTouched = true;
      pausedByTouch = false;
      pausedByInteraction = false;
      touchStartTimeout = setTimeout(() => {
        pausedByInteraction = true;
        pausedByTouch = true;
        pause(true);
      }, 200);
    });
    on('touchEnd', () => {
      if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
      clearTimeout(touchStartTimeout);
      clearTimeout(timeout);
      if (swiper.params.autoplay.disableOnInteraction) {
        pausedByTouch = false;
        isTouched = false;
        return;
      }
      if (pausedByTouch && swiper.params.cssMode) resume();
      pausedByTouch = false;
      isTouched = false;
    });
    on('slideChange', () => {
      if (swiper.destroyed || !swiper.autoplay.running) return;
      slideChanged = true;
    });
    Object.assign(swiper.autoplay, {
      start,
      stop,
      pause,
      resume
    });
  }

  function Thumb(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: true,
        autoScrollOffset: 0,
        slideThumbActiveClass: 'swiper-slide-thumb-active',
        thumbsContainerClass: 'swiper-thumbs'
      }
    });
    let initialized = false;
    let swiperCreated = false;
    swiper.thumbs = {
      swiper: null
    };
    function onThumbClick() {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      const clickedIndex = thumbsSwiper.clickedIndex;
      const clickedSlide = thumbsSwiper.clickedSlide;
      if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass)) return;
      if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
      let slideToIndex;
      if (thumbsSwiper.params.loop) {
        slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
      } else {
        slideToIndex = clickedIndex;
      }
      if (swiper.params.loop) {
        swiper.slideToLoop(slideToIndex);
      } else {
        swiper.slideTo(slideToIndex);
      }
    }
    function init() {
      const {
        thumbs: thumbsParams
      } = swiper.params;
      if (initialized) return false;
      initialized = true;
      const SwiperClass = swiper.constructor;
      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        Object.assign(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false
        });
        Object.assign(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false
        });
        swiper.thumbs.swiper.update();
      } else if (isObject(thumbsParams.swiper)) {
        const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
        Object.assign(thumbsSwiperParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false
        });
        swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
        swiperCreated = true;
      }
      swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
      swiper.thumbs.swiper.on('tap', onThumbClick);
      return true;
    }
    function update(initial) {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      const slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;

      // Activate thumbs
      let thumbsToActivate = 1;
      const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
        thumbsToActivate = swiper.params.slidesPerView;
      }
      if (!swiper.params.thumbs.multipleActiveThumbs) {
        thumbsToActivate = 1;
      }
      thumbsToActivate = Math.floor(thumbsToActivate);
      thumbsSwiper.slides.forEach(slideEl => slideEl.classList.remove(thumbActiveClass));
      if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
        for (let i = 0; i < thumbsToActivate; i += 1) {
          elementChildren(thumbsSwiper.slidesEl, `[data-swiper-slide-index="${swiper.realIndex + i}"]`).forEach(slideEl => {
            slideEl.classList.add(thumbActiveClass);
          });
        }
      } else {
        for (let i = 0; i < thumbsToActivate; i += 1) {
          if (thumbsSwiper.slides[swiper.realIndex + i]) {
            thumbsSwiper.slides[swiper.realIndex + i].classList.add(thumbActiveClass);
          }
        }
      }
      const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
      const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
      if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
        const currentThumbsIndex = thumbsSwiper.activeIndex;
        let newThumbsIndex;
        let direction;
        if (thumbsSwiper.params.loop) {
          const newThumbsSlide = thumbsSwiper.slides.filter(slideEl => slideEl.getAttribute('data-swiper-slide-index') === `${swiper.realIndex}`)[0];
          newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
          direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
        } else {
          newThumbsIndex = swiper.realIndex;
          direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
        }
        if (useOffset) {
          newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
        }
        if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
          if (thumbsSwiper.params.centeredSlides) {
            if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            } else {
              newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
            }
          } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) ;
          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
        }
      }
    }
    on('beforeInit', () => {
      const {
        thumbs
      } = swiper.params;
      if (!thumbs || !thumbs.swiper) return;
      if (typeof thumbs.swiper === 'string' || thumbs.swiper instanceof HTMLElement) {
        const document = getDocument();
        const getThumbsElementAndInit = () => {
          const thumbsElement = typeof thumbs.swiper === 'string' ? document.querySelector(thumbs.swiper) : thumbs.swiper;
          if (thumbsElement && thumbsElement.swiper) {
            thumbs.swiper = thumbsElement.swiper;
            init();
            update(true);
          } else if (thumbsElement) {
            const onThumbsSwiper = e => {
              thumbs.swiper = e.detail[0];
              thumbsElement.removeEventListener('init', onThumbsSwiper);
              init();
              update(true);
              thumbs.swiper.update();
              swiper.update();
            };
            thumbsElement.addEventListener('init', onThumbsSwiper);
          }
          return thumbsElement;
        };
        const watchForThumbsToAppear = () => {
          if (swiper.destroyed) return;
          const thumbsElement = getThumbsElementAndInit();
          if (!thumbsElement) {
            requestAnimationFrame(watchForThumbsToAppear);
          }
        };
        requestAnimationFrame(watchForThumbsToAppear);
      } else {
        init();
        update(true);
      }
    });
    on('slideChange update resize observerUpdate', () => {
      update();
    });
    on('setTransition', (_s, duration) => {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      thumbsSwiper.setTransition(duration);
    });
    on('beforeDestroy', () => {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      if (swiperCreated) {
        thumbsSwiper.destroy();
      }
    });
    Object.assign(swiper.thumbs, {
      init,
      update
    });
  }

  function freeMode(_ref) {
    let {
      swiper,
      extendParams,
      emit,
      once
    } = _ref;
    extendParams({
      freeMode: {
        enabled: false,
        momentum: true,
        momentumRatio: 1,
        momentumBounce: true,
        momentumBounceRatio: 1,
        momentumVelocityRatio: 1,
        sticky: false,
        minimumVelocity: 0.02
      }
    });
    function onTouchStart() {
      if (swiper.params.cssMode) return;
      const translate = swiper.getTranslate();
      swiper.setTranslate(translate);
      swiper.setTransition(0);
      swiper.touchEventsData.velocities.length = 0;
      swiper.freeMode.onTouchEnd({
        currentPos: swiper.rtl ? swiper.translate : -swiper.translate
      });
    }
    function onTouchMove() {
      if (swiper.params.cssMode) return;
      const {
        touchEventsData: data,
        touches
      } = swiper;
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data.touchStartTime
        });
      }
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: now()
      });
    }
    function onTouchEnd(_ref2) {
      let {
        currentPos
      } = _ref2;
      if (swiper.params.cssMode) return;
      const {
        params,
        wrapperEl,
        rtlTranslate: rtl,
        snapGrid,
        touchEventsData: data
      } = swiper;
      // Time diff
      const touchEndTime = now();
      const timeDiff = touchEndTime - data.touchStartTime;
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }
        return;
      }
      if (params.freeMode.momentum) {
        if (data.velocities.length > 1) {
          const lastMoveEvent = data.velocities.pop();
          const velocityEvent = data.velocities.pop();
          const distance = lastMoveEvent.position - velocityEvent.position;
          const time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;
          if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
            swiper.velocity = 0;
          }
          // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.
          if (time > 150 || now() - lastMoveEvent.time > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }
        swiper.velocity *= params.freeMode.momentumVelocityRatio;
        data.velocities.length = 0;
        let momentumDuration = 1000 * params.freeMode.momentumRatio;
        const momentumDistance = swiper.velocity * momentumDuration;
        let newPosition = swiper.translate + momentumDistance;
        if (rtl) newPosition = -newPosition;
        let doBounce = false;
        let afterBouncePosition;
        const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
        let needsLoopFix;
        if (newPosition < swiper.maxTranslate()) {
          if (params.freeMode.momentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }
            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }
          if (params.loop && params.centeredSlides) needsLoopFix = true;
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeMode.momentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }
            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }
          if (params.loop && params.centeredSlides) needsLoopFix = true;
        } else if (params.freeMode.sticky) {
          let nextSlide;
          for (let j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }
          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }
          newPosition = -newPosition;
        }
        if (needsLoopFix) {
          once('transitionEnd', () => {
            swiper.loopFix();
          });
        }
        // Fix duration
        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }
          if (params.freeMode.sticky) {
            // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
            // event, then durations can be 20+ seconds to slide one (or zero!) slides.
            // It's easy to see this when simulating touch with mouse events. To fix this,
            // limit single-slide swipes to the default slide duration. This also has the
            // nice side effect of matching slide speed if the user stopped moving before
            // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
            // For faster swipes, also apply limits (albeit higher ones).
            const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
            const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
            if (moveDistance < currentSlideSize) {
              momentumDuration = params.speed;
            } else if (moveDistance < 2 * currentSlideSize) {
              momentumDuration = params.speed * 1.5;
            } else {
              momentumDuration = params.speed * 2.5;
            }
          }
        } else if (params.freeMode.sticky) {
          swiper.slideToClosest();
          return;
        }
        if (params.freeMode.momentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          elementTransitionEnd(wrapperEl, () => {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
            emit('momentumBounce');
            swiper.setTransition(params.speed);
            setTimeout(() => {
              swiper.setTranslate(afterBouncePosition);
              elementTransitionEnd(wrapperEl, () => {
                if (!swiper || swiper.destroyed) return;
                swiper.transitionEnd();
              });
            }, 0);
          });
        } else if (swiper.velocity) {
          emit('_freeModeNoMomentumRelease');
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          if (!swiper.animating) {
            swiper.animating = true;
            elementTransitionEnd(wrapperEl, () => {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      } else if (params.freeMode) {
        emit('_freeModeNoMomentumRelease');
      }
      if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
    }
    Object.assign(swiper, {
      freeMode: {
        onTouchStart,
        onTouchMove,
        onTouchEnd
      }
    });
  }

  function Grid(_ref) {
    let {
      swiper,
      extendParams
    } = _ref;
    extendParams({
      grid: {
        rows: 1,
        fill: 'column'
      }
    });
    let slidesNumberEvenToRows;
    let slidesPerRow;
    let numFullColumns;
    const getSpaceBetween = () => {
      let spaceBetween = swiper.params.spaceBetween;
      if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
        spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiper.size;
      } else if (typeof spaceBetween === 'string') {
        spaceBetween = parseFloat(spaceBetween);
      }
      return spaceBetween;
    };
    const initSlides = slidesLength => {
      const {
        slidesPerView
      } = swiper.params;
      const {
        rows,
        fill
      } = swiper.params.grid;
      numFullColumns = Math.floor(slidesLength / rows);
      if (Math.floor(slidesLength / rows) === slidesLength / rows) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
      }
      if (slidesPerView !== 'auto' && fill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
      }
      slidesPerRow = slidesNumberEvenToRows / rows;
    };
    const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
      const {
        slidesPerGroup
      } = swiper.params;
      const spaceBetween = getSpaceBetween();
      const {
        rows,
        fill
      } = swiper.params.grid;
      // Set slides order
      let newSlideOrderIndex;
      let column;
      let row;
      if (fill === 'row' && slidesPerGroup > 1) {
        const groupIndex = Math.floor(i / (slidesPerGroup * rows));
        const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
        const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
        row = Math.floor(slideIndexInGroup / columnsInGroup);
        column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
        newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
        slide.style.order = newSlideOrderIndex;
      } else if (fill === 'column') {
        column = Math.floor(i / rows);
        row = i - column * rows;
        if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
          row += 1;
          if (row >= rows) {
            row = 0;
            column += 1;
          }
        }
      } else {
        row = Math.floor(i / slidesPerRow);
        column = i - row * slidesPerRow;
      }
      slide.row = row;
      slide.column = column;
      slide.style[getDirectionLabel('margin-top')] = row !== 0 ? spaceBetween && `${spaceBetween}px` : '';
    };
    const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
      const {
        centeredSlides,
        roundLengths
      } = swiper.params;
      const spaceBetween = getSpaceBetween();
      const {
        rows
      } = swiper.params.grid;
      swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
      swiper.wrapperEl.style[getDirectionLabel('width')] = `${swiper.virtualSize + spaceBetween}px`;
      if (centeredSlides) {
        const newSlidesGrid = [];
        for (let i = 0; i < snapGrid.length; i += 1) {
          let slidesGridItem = snapGrid[i];
          if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
          if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
        }
        snapGrid.splice(0, snapGrid.length);
        snapGrid.push(...newSlidesGrid);
      }
    };
    swiper.grid = {
      initSlides,
      updateSlide,
      updateWrapperSize
    };
  }

  function appendSlide(slides) {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (params.loop) {
      swiper.loopDestroy();
    }
    const appendElement = slideEl => {
      if (typeof slideEl === 'string') {
        const tempDOM = document.createElement('div');
        tempDOM.innerHTML = slideEl;
        slidesEl.append(tempDOM.children[0]);
        tempDOM.innerHTML = '';
      } else {
        slidesEl.append(slideEl);
      }
    };
    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) appendElement(slides[i]);
      }
    } else {
      appendElement(slides);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
  }

  function prependSlide(slides) {
    const swiper = this;
    const {
      params,
      activeIndex,
      slidesEl
    } = swiper;
    if (params.loop) {
      swiper.loopDestroy();
    }
    let newActiveIndex = activeIndex + 1;
    const prependElement = slideEl => {
      if (typeof slideEl === 'string') {
        const tempDOM = document.createElement('div');
        tempDOM.innerHTML = slideEl;
        slidesEl.prepend(tempDOM.children[0]);
        tempDOM.innerHTML = '';
      } else {
        slidesEl.prepend(slideEl);
      }
    };
    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) prependElement(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
    } else {
      prependElement(slides);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
    swiper.slideTo(newActiveIndex, 0, false);
  }

  function addSlide(index, slides) {
    const swiper = this;
    const {
      params,
      activeIndex,
      slidesEl
    } = swiper;
    let activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.recalcSlides();
    }
    const baseLength = swiper.slides.length;
    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }
    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }
    let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
    const slidesBuffer = [];
    for (let i = baseLength - 1; i >= index; i -= 1) {
      const currentSlide = swiper.slides[i];
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }
    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) slidesEl.append(slides[i]);
      }
      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      slidesEl.append(slides);
    }
    for (let i = 0; i < slidesBuffer.length; i += 1) {
      slidesEl.append(slidesBuffer[i]);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeSlide(slidesIndexes) {
    const swiper = this;
    const {
      params,
      activeIndex
    } = swiper;
    let activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
    }
    let newActiveIndex = activeIndexBuffer;
    let indexToRemove;
    if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
      for (let i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
        if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
      }
      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
      newActiveIndex = Math.max(newActiveIndex, 0);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides() {
    const swiper = this;
    const slidesIndexes = [];
    for (let i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }
    swiper.removeSlide(slidesIndexes);
  }

  function Manipulation(_ref) {
    let {
      swiper
    } = _ref;
    Object.assign(swiper, {
      appendSlide: appendSlide.bind(swiper),
      prependSlide: prependSlide.bind(swiper),
      addSlide: addSlide.bind(swiper),
      removeSlide: removeSlide.bind(swiper),
      removeAllSlides: removeAllSlides.bind(swiper)
    });
  }

  function effectInit(e){const{effect:s,swiper:a,on:t,setTranslate:r,setTransition:i,overwriteParams:n,perspective:o,recreateShadows:f,getEffectParams:l}=e;let c;t("beforeInit",(()=>{if(a.params.effect!==s)return;a.classNames.push(`${a.params.containerModifierClass}${s}`),o&&o()&&a.classNames.push(`${a.params.containerModifierClass}3d`);const e=n?n():{};Object.assign(a.params,e),Object.assign(a.originalParams,e);})),t("setTranslate",(()=>{a.params.effect===s&&r();})),t("setTransition",((e,t)=>{a.params.effect===s&&i(t);})),t("transitionEnd",(()=>{if(a.params.effect===s&&f){if(!l||!l().slideShadows)return;a.slides.forEach((e=>{e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e=>e.remove()));})),f();}})),t("virtualUpdate",(()=>{a.params.effect===s&&(a.slides.length||(c=!0),requestAnimationFrame((()=>{c&&a.slides&&a.slides.length&&(r(),c=!1);})));}));}

  function effectTarget(e,t){const i=getSlideTransformEl(t);return i!==t&&(i.style.backfaceVisibility="hidden",i.style["-webkit-backface-visibility"]="hidden"),i}

  function effectVirtualTransitionEnd(e){let{swiper:t,duration:n,transformElements:r,allSlides:i}=e;const{activeIndex:a}=t;if(t.params.virtualTranslate&&0!==n){let e,n=!1;e=i?r:r.filter((e=>{const n=e.classList.contains("swiper-slide-transform")?(e=>{if(!e.parentElement)return t.slides.filter((t=>t.shadowRoot&&t.shadowRoot===e.parentNode))[0];return e.parentElement})(e):e;return t.getSlideIndex(n)===a})),e.forEach((e=>{elementTransitionEnd(e,(()=>{if(n)return;if(!t||t.destroyed)return;n=!0,t.animating=!1;const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});t.wrapperEl.dispatchEvent(e);}));}));}}

  function EffectFade(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      fadeEffect: {
        crossFade: false
      }
    });
    const setTranslate = () => {
      const {
        slides
      } = swiper;
      const params = swiper.params.fadeEffect;
      for (let i = 0; i < slides.length; i += 1) {
        const slideEl = swiper.slides[i];
        const offset = slideEl.swiperSlideOffset;
        let tx = -offset;
        if (!swiper.params.virtualTranslate) tx -= swiper.translate;
        let ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }
        const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.opacity = slideOpacity;
        targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
      }
    };
    const setTransition = duration => {
      const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
      transformElements.forEach(el => {
        el.style.transitionDuration = `${duration}ms`;
      });
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformElements,
        allSlides: true
      });
    };
    effectInit({
      effect: 'fade',
      swiper,
      on,
      setTranslate,
      setTransition,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      })
    });
  }

  function EffectCube(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94
      }
    });
    const createSlideShadows = (slideEl, progress, isHorizontal) => {
      let shadowBefore = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
      let shadowAfter = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
      if (!shadowBefore) {
        shadowBefore = createElement('div', `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}`.split(' '));
        slideEl.append(shadowBefore);
      }
      if (!shadowAfter) {
        shadowAfter = createElement('div', `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}`.split(' '));
        slideEl.append(shadowAfter);
      }
      if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
      if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
    };
    const recreateShadows = () => {
      // create new ones
      const isHorizontal = swiper.isHorizontal();
      swiper.slides.forEach(slideEl => {
        const progress = Math.max(Math.min(slideEl.progress, 1), -1);
        createSlideShadows(slideEl, progress, isHorizontal);
      });
    };
    const setTranslate = () => {
      const {
        el,
        wrapperEl,
        slides,
        width: swiperWidth,
        height: swiperHeight,
        rtlTranslate: rtl,
        size: swiperSize,
        browser
      } = swiper;
      const params = swiper.params.cubeEffect;
      const isHorizontal = swiper.isHorizontal();
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      let wrapperRotate = 0;
      let cubeShadowEl;
      if (params.shadow) {
        if (isHorizontal) {
          cubeShadowEl = swiper.wrapperEl.querySelector('.swiper-cube-shadow');
          if (!cubeShadowEl) {
            cubeShadowEl = createElement('div', 'swiper-cube-shadow');
            swiper.wrapperEl.append(cubeShadowEl);
          }
          cubeShadowEl.style.height = `${swiperWidth}px`;
        } else {
          cubeShadowEl = el.querySelector('.swiper-cube-shadow');
          if (!cubeShadowEl) {
            cubeShadowEl = createElement('div', 'swiper-cube-shadow');
            el.append(cubeShadowEl);
          }
        }
      }
      for (let i = 0; i < slides.length; i += 1) {
        const slideEl = slides[i];
        let slideIndex = i;
        if (isVirtual) {
          slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10);
        }
        let slideAngle = slideIndex * 90;
        let round = Math.floor(slideAngle / 360);
        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }
        const progress = Math.max(Math.min(slideEl.progress, 1), -1);
        let tx = 0;
        let ty = 0;
        let tz = 0;
        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + round * 4 * swiperSize;
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = 3 * swiperSize + swiperSize * 4 * round;
        }
        if (rtl) {
          tx = -tx;
        }
        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }
        const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
        if (progress <= 1 && progress > -1) {
          wrapperRotate = slideIndex * 90 + progress * 90;
          if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
        }
        slideEl.style.transform = transform;
        if (params.slideShadows) {
          createSlideShadows(slideEl, progress, isHorizontal);
        }
      }
      wrapperEl.style.transformOrigin = `50% 50% -${swiperSize / 2}px`;
      wrapperEl.style['-webkit-transform-origin'] = `50% 50% -${swiperSize / 2}px`;
      if (params.shadow) {
        if (isHorizontal) {
          cubeShadowEl.style.transform = `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`;
        } else {
          const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
          const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
          const scale1 = params.shadowScale;
          const scale2 = params.shadowScale / multiplier;
          const offset = params.shadowOffset;
          cubeShadowEl.style.transform = `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`;
        }
      }
      const zFactor = (browser.isSafari || browser.isWebView) && browser.needPerspectiveFix ? -swiperSize / 2 : 0;
      wrapperEl.style.transform = `translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`;
      wrapperEl.style.setProperty('--swiper-cube-translate-z', `${zFactor}px`);
    };
    const setTransition = duration => {
      const {
        el,
        slides
      } = swiper;
      slides.forEach(slideEl => {
        slideEl.style.transitionDuration = `${duration}ms`;
        slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(subEl => {
          subEl.style.transitionDuration = `${duration}ms`;
        });
      });
      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        const shadowEl = el.querySelector('.swiper-cube-shadow');
        if (shadowEl) shadowEl.style.transitionDuration = `${duration}ms`;
      }
    };
    effectInit({
      effect: 'cube',
      swiper,
      on,
      setTranslate,
      setTransition,
      recreateShadows,
      getEffectParams: () => swiper.params.cubeEffect,
      perspective: () => true,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true
      })
    });
  }

  function createShadow(e,t,r){const s=`swiper-slide-shadow${r?`-${r}`:""}${e?` swiper-slide-shadow-${e}`:""}`,a=getSlideTransformEl(t);let i=a.querySelector(`.${s.split(" ").join(".")}`);return i||(i=createElement("div",s.split(" ")),a.append(i)),i}

  function EffectFlip(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      flipEffect: {
        slideShadows: true,
        limitRotation: true
      }
    });
    const createSlideShadows = (slideEl, progress) => {
      let shadowBefore = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
      let shadowAfter = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
      if (!shadowBefore) {
        shadowBefore = createShadow('flip', slideEl, swiper.isHorizontal() ? 'left' : 'top');
      }
      if (!shadowAfter) {
        shadowAfter = createShadow('flip', slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
      }
      if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
      if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
    };
    const recreateShadows = () => {
      // Set shadows
      swiper.params.flipEffect;
      swiper.slides.forEach(slideEl => {
        let progress = slideEl.progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min(slideEl.progress, 1), -1);
        }
        createSlideShadows(slideEl, progress);
      });
    };
    const setTranslate = () => {
      const {
        slides,
        rtlTranslate: rtl
      } = swiper;
      const params = swiper.params.flipEffect;
      for (let i = 0; i < slides.length; i += 1) {
        const slideEl = slides[i];
        let progress = slideEl.progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min(slideEl.progress, 1), -1);
        }
        const offset = slideEl.swiperSlideOffset;
        const rotate = -180 * progress;
        let rotateY = rotate;
        let rotateX = 0;
        let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
        let ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }
        slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
        if (params.slideShadows) {
          createSlideShadows(slideEl, progress);
        }
        const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.transform = transform;
      }
    };
    const setTransition = duration => {
      const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
      transformElements.forEach(el => {
        el.style.transitionDuration = `${duration}ms`;
        el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => {
          shadowEl.style.transitionDuration = `${duration}ms`;
        });
      });
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformElements
      });
    };
    effectInit({
      effect: 'flip',
      swiper,
      on,
      setTranslate,
      setTransition,
      recreateShadows,
      getEffectParams: () => swiper.params.flipEffect,
      perspective: () => true,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      })
    });
  }

  function EffectCoverflow(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        scale: 1,
        modifier: 1,
        slideShadows: true
      }
    });
    const setTranslate = () => {
      const {
        width: swiperWidth,
        height: swiperHeight,
        slides,
        slidesSizesGrid
      } = swiper;
      const params = swiper.params.coverflowEffect;
      const isHorizontal = swiper.isHorizontal();
      const transform = swiper.translate;
      const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
      const rotate = isHorizontal ? params.rotate : -params.rotate;
      const translate = params.depth;
      // Each slide offset from center
      for (let i = 0, length = slides.length; i < length; i += 1) {
        const slideEl = slides[i];
        const slideSize = slidesSizesGrid[i];
        const slideOffset = slideEl.swiperSlideOffset;
        const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
        const offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;
        let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        let translateZ = -translate * Math.abs(offsetMultiplier);
        let stretch = params.stretch;
        // Allow percentage to make a relative stretch for responsive sliders
        if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
          stretch = parseFloat(params.stretch) / 100 * slideSize;
        }
        let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
        let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
        let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);

        // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) translateX = 0;
        if (Math.abs(translateY) < 0.001) translateY = 0;
        if (Math.abs(translateZ) < 0.001) translateZ = 0;
        if (Math.abs(rotateY) < 0.001) rotateY = 0;
        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        if (Math.abs(scale) < 0.001) scale = 0;
        const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.transform = slideTransform;
        slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
        if (params.slideShadows) {
          // Set shadows
          let shadowBeforeEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
          let shadowAfterEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
          if (!shadowBeforeEl) {
            shadowBeforeEl = createShadow('coverflow', slideEl, isHorizontal ? 'left' : 'top');
          }
          if (!shadowAfterEl) {
            shadowAfterEl = createShadow('coverflow', slideEl, isHorizontal ? 'right' : 'bottom');
          }
          if (shadowBeforeEl) shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
          if (shadowAfterEl) shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
        }
      }
    };
    const setTransition = duration => {
      const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
      transformElements.forEach(el => {
        el.style.transitionDuration = `${duration}ms`;
        el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => {
          shadowEl.style.transitionDuration = `${duration}ms`;
        });
      });
    };
    effectInit({
      effect: 'coverflow',
      swiper,
      on,
      setTranslate,
      setTransition,
      perspective: () => true,
      overwriteParams: () => ({
        watchSlidesProgress: true
      })
    });
  }

  function EffectCreative(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      creativeEffect: {
        limitProgress: 1,
        shadowPerProgress: false,
        progressMultiplier: 1,
        perspective: true,
        prev: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        },
        next: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        }
      }
    });
    const getTranslateValue = value => {
      if (typeof value === 'string') return value;
      return `${value}px`;
    };
    const setTranslate = () => {
      const {
        slides,
        wrapperEl,
        slidesSizesGrid
      } = swiper;
      const params = swiper.params.creativeEffect;
      const {
        progressMultiplier: multiplier
      } = params;
      const isCenteredSlides = swiper.params.centeredSlides;
      if (isCenteredSlides) {
        const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
        wrapperEl.style.transform = `translateX(calc(50% - ${margin}px))`;
      }
      for (let i = 0; i < slides.length; i += 1) {
        const slideEl = slides[i];
        const slideProgress = slideEl.progress;
        const progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
        let originalProgress = progress;
        if (!isCenteredSlides) {
          originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
        }
        const offset = slideEl.swiperSlideOffset;
        const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
        const r = [0, 0, 0];
        let custom = false;
        if (!swiper.isHorizontal()) {
          t[1] = t[0];
          t[0] = 0;
        }
        let data = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1
        };
        if (progress < 0) {
          data = params.next;
          custom = true;
        } else if (progress > 0) {
          data = params.prev;
          custom = true;
        }
        // set translate
        t.forEach((value, index) => {
          t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
        });
        // set rotates
        r.forEach((value, index) => {
          r[index] = data.rotate[index] * Math.abs(progress * multiplier);
        });
        slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
        const translateString = t.join(', ');
        const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
        const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
        const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
        const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;

        // Set shadows
        if (custom && data.shadow || !custom) {
          let shadowEl = slideEl.querySelector('.swiper-slide-shadow');
          if (!shadowEl && data.shadow) {
            shadowEl = createShadow('creative', slideEl);
          }
          if (shadowEl) {
            const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
            shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
          }
        }
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.transform = transform;
        targetEl.style.opacity = opacityString;
        if (data.origin) {
          targetEl.style.transformOrigin = data.origin;
        }
      }
    };
    const setTransition = duration => {
      const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
      transformElements.forEach(el => {
        el.style.transitionDuration = `${duration}ms`;
        el.querySelectorAll('.swiper-slide-shadow').forEach(shadowEl => {
          shadowEl.style.transitionDuration = `${duration}ms`;
        });
      });
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformElements,
        allSlides: true
      });
    };
    effectInit({
      effect: 'creative',
      swiper,
      on,
      setTranslate,
      setTransition,
      perspective: () => swiper.params.creativeEffect.perspective,
      overwriteParams: () => ({
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      })
    });
  }

  function EffectCards(_ref) {
    let {
      swiper,
      extendParams,
      on
    } = _ref;
    extendParams({
      cardsEffect: {
        slideShadows: true,
        rotate: true,
        perSlideRotate: 2,
        perSlideOffset: 8
      }
    });
    const setTranslate = () => {
      const {
        slides,
        activeIndex,
        rtlTranslate: rtl
      } = swiper;
      const params = swiper.params.cardsEffect;
      const {
        startTranslate,
        isTouched
      } = swiper.touchEventsData;
      const currentTranslate = rtl ? -swiper.translate : swiper.translate;
      for (let i = 0; i < slides.length; i += 1) {
        const slideEl = slides[i];
        const slideProgress = slideEl.progress;
        const progress = Math.min(Math.max(slideProgress, -4), 4);
        let offset = slideEl.swiperSlideOffset;
        if (swiper.params.centeredSlides && !swiper.params.cssMode) {
          swiper.wrapperEl.style.transform = `translateX(${swiper.minTranslate()}px)`;
        }
        if (swiper.params.centeredSlides && swiper.params.cssMode) {
          offset -= slides[0].swiperSlideOffset;
        }
        let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
        let tY = 0;
        const tZ = -100 * Math.abs(progress);
        let scale = 1;
        let rotate = -params.perSlideRotate * progress;
        let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
        const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
        const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
        const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
        if (isSwipeToNext || isSwipeToPrev) {
          const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
          rotate += -28 * progress * subProgress;
          scale += -0.5 * subProgress;
          tXAdd += 96 * subProgress;
          tY = `${-25 * subProgress * Math.abs(progress)}%`;
        }
        if (progress < 0) {
          // next
          tX = `calc(${tX}px ${rtl ? '-' : '+'} (${tXAdd * Math.abs(progress)}%))`;
        } else if (progress > 0) {
          // prev
          tX = `calc(${tX}px ${rtl ? '-' : '+'} (-${tXAdd * Math.abs(progress)}%))`;
        } else {
          tX = `${tX}px`;
        }
        if (!swiper.isHorizontal()) {
          const prevY = tY;
          tY = tX;
          tX = prevY;
        }
        const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;

        /* eslint-disable */
        const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rtl ? -rotate : rotate : 0}deg)
        scale(${scaleString})
      `;
        /* eslint-enable */

        if (params.slideShadows) {
          // Set shadows
          let shadowEl = slideEl.querySelector('.swiper-slide-shadow');
          if (!shadowEl) {
            shadowEl = createShadow('cards', slideEl);
          }
          if (shadowEl) shadowEl.style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
        }
        slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.transform = transform;
      }
    };
    const setTransition = duration => {
      const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
      transformElements.forEach(el => {
        el.style.transitionDuration = `${duration}ms`;
        el.querySelectorAll('.swiper-slide-shadow').forEach(shadowEl => {
          shadowEl.style.transitionDuration = `${duration}ms`;
        });
      });
      effectVirtualTransitionEnd({
        swiper,
        duration,
        transformElements
      });
    };
    effectInit({
      effect: 'cards',
      swiper,
      on,
      setTranslate,
      setTransition,
      perspective: () => true,
      overwriteParams: () => ({
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      })
    });
  }

  /**
   * Swiper 10.0.0-beta.2
   * Most modern mobile touch slider and framework with hardware accelerated transitions
   * https://swiperjs.com
   *
   * Copyright 2014-2023 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: June 23, 2023
   */


  // Swiper Class
  const modules = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards];
  Swiper.use(modules);

  return Swiper;

})();
