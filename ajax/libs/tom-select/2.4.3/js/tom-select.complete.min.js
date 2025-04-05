/**
* Tom Select v2.4.3
* Licensed under the Apache License, Version 2.0 (the "License");
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).TomSelect=t()}(this,(function(){"use strict"
function e(e,t){e.split(/\s+/).forEach((e=>{t(e)}))}class t{constructor(){this._events={}}on(t,s){e(t,(e=>{const t=this._events[e]||[]
t.push(s),this._events[e]=t}))}off(t,s){var i=arguments.length
0!==i?e(t,(e=>{if(1===i)return void delete this._events[e]
const t=this._events[e]
void 0!==t&&(t.splice(t.indexOf(s),1),this._events[e]=t)})):this._events={}}trigger(t,...s){var i=this
e(t,(e=>{const t=i._events[e]
void 0!==t&&t.forEach((e=>{e.apply(i,s)}))}))}}const s=e=>(e=e.filter(Boolean)).length<2?e[0]||"":1==l(e)?"["+e.join("")+"]":"(?:"+e.join("|")+")",i=e=>{if(!o(e))return e.join("")
let t="",s=0
const i=()=>{s>1&&(t+="{"+s+"}")}
return e.forEach(((n,o)=>{n!==e[o-1]?(i(),t+=n,s=1):s++})),i(),t},n=e=>{let t=Array.from(e)
return s(t)},o=e=>new Set(e).size!==e.length,r=e=>(e+"").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu,"\\$1"),l=e=>e.reduce(((e,t)=>Math.max(e,a(t))),0),a=e=>Array.from(e).length,c=e=>{if(1===e.length)return[[e]]
let t=[]
const s=e.substring(1)
return c(s).forEach((function(s){let i=s.slice(0)
i[0]=e.charAt(0)+i[0],t.push(i),i=s.slice(0),i.unshift(e.charAt(0)),t.push(i)})),t},d=[[0,65535]]
let u,p
const h={},g={"/":"⁄∕",0:"߀",a:"ⱥɐɑ",aa:"ꜳ",ae:"æǽǣ",ao:"ꜵ",au:"ꜷ",av:"ꜹꜻ",ay:"ꜽ",b:"ƀɓƃ",c:"ꜿƈȼↄ",d:"đɗɖᴅƌꮷԁɦ",e:"ɛǝᴇɇ",f:"ꝼƒ",g:"ǥɠꞡᵹꝿɢ",h:"ħⱨⱶɥ",i:"ɨı",j:"ɉȷ",k:"ƙⱪꝁꝃꝅꞣ",l:"łƚɫⱡꝉꝇꞁɭ",m:"ɱɯϻ",n:"ꞥƞɲꞑᴎлԉ",o:"øǿɔɵꝋꝍᴑ",oe:"œ",oi:"ƣ",oo:"ꝏ",ou:"ȣ",p:"ƥᵽꝑꝓꝕρ",q:"ꝗꝙɋ",r:"ɍɽꝛꞧꞃ",s:"ßȿꞩꞅʂ",t:"ŧƭʈⱦꞇ",th:"þ",tz:"ꜩ",u:"ʉ",v:"ʋꝟʌ",vy:"ꝡ",w:"ⱳ",y:"ƴɏỿ",z:"ƶȥɀⱬꝣ",hv:"ƕ"}
for(let e in g){let t=g[e]||""
for(let s=0;s<t.length;s++){let i=t.substring(s,s+1)
h[i]=e}}const f=new RegExp(Object.keys(h).join("|")+"|[̀-ͯ·ʾʼ]","gu"),m=(e,t="NFKD")=>e.normalize(t),v=e=>Array.from(e).reduce(((e,t)=>e+y(t)),""),y=e=>(e=m(e).toLowerCase().replace(f,(e=>h[e]||"")),m(e,"NFC"))
const O=e=>{const t={},s=(e,s)=>{const i=t[e]||new Set,o=new RegExp("^"+n(i)+"$","iu")
s.match(o)||(i.add(r(s)),t[e]=i)}
for(let t of function*(e){for(const[t,s]of e)for(let e=t;e<=s;e++){let t=String.fromCharCode(e),s=v(t)
s!=t.toLowerCase()&&(s.length>3||0!=s.length&&(yield{folded:s,composed:t,code_point:e}))}}(e))s(t.folded,t.folded),s(t.folded,t.composed)
return t},b=e=>{const t=O(e),i={}
let o=[]
for(let e in t){let s=t[e]
s&&(i[e]=n(s)),e.length>1&&o.push(r(e))}o.sort(((e,t)=>t.length-e.length))
const l=s(o)
return p=new RegExp("^"+l,"u"),i},w=(e,t=1)=>(t=Math.max(t,e.length-1),s(c(e).map((e=>((e,t=1)=>{let s=0
return e=e.map((e=>(u[e]&&(s+=e.length),u[e]||e))),s>=t?i(e):""})(e,t))))),_=(e,t=!0)=>{let n=e.length>1?1:0
return s(e.map((e=>{let s=[]
const o=t?e.length():e.length()-1
for(let t=0;t<o;t++)s.push(w(e.substrs[t]||"",n))
return i(s)})))},C=(e,t)=>{for(const s of t){if(s.start!=e.start||s.end!=e.end)continue
if(s.substrs.join("")!==e.substrs.join(""))continue
let t=e.parts
const i=e=>{for(const s of t){if(s.start===e.start&&s.substr===e.substr)return!1
if(1!=e.length&&1!=s.length){if(e.start<s.start&&e.end>s.start)return!0
if(s.start<e.start&&s.end>e.start)return!0}}return!1}
if(!(s.parts.filter(i).length>0))return!0}return!1}
class S{parts
substrs
start
end
constructor(){this.parts=[],this.substrs=[],this.start=0,this.end=0}add(e){e&&(this.parts.push(e),this.substrs.push(e.substr),this.start=Math.min(e.start,this.start),this.end=Math.max(e.end,this.end))}last(){return this.parts[this.parts.length-1]}length(){return this.parts.length}clone(e,t){let s=new S,i=JSON.parse(JSON.stringify(this.parts)),n=i.pop()
for(const e of i)s.add(e)
let o=t.substr.substring(0,e-n.start),r=o.length
return s.add({start:n.start,end:n.start+r,length:r,substr:o}),s}}const I=e=>{void 0===u&&(u=b(d)),e=v(e)
let t="",s=[new S]
for(let i=0;i<e.length;i++){let n=e.substring(i).match(p)
const o=e.substring(i,i+1),r=n?n[0]:null
let l=[],a=new Set
for(const e of s){const t=e.last()
if(!t||1==t.length||t.end<=i)if(r){const t=r.length
e.add({start:i,end:i+t,length:t,substr:r}),a.add("1")}else e.add({start:i,end:i+1,length:1,substr:o}),a.add("2")
else if(r){let s=e.clone(i,t)
const n=r.length
s.add({start:i,end:i+n,length:n,substr:r}),l.push(s)}else a.add("3")}if(l.length>0){l=l.sort(((e,t)=>e.length()-t.length()))
for(let e of l)C(e,s)||s.push(e)}else if(i>0&&1==a.size&&!a.has("3")){t+=_(s,!1)
let e=new S
const i=s[0]
i&&e.add(i.last()),s=[e]}}return t+=_(s,!0),t},A=(e,t)=>{if(e)return e[t]},k=(e,t)=>{if(e){for(var s,i=t.split(".");(s=i.shift())&&(e=e[s]););return e}},x=(e,t,s)=>{var i,n
return e?(e+="",null==t.regex||-1===(n=e.search(t.regex))?0:(i=t.string.length/e.length,0===n&&(i+=.5),i*s)):0},F=(e,t)=>{var s=e[t]
if("function"==typeof s)return s
s&&!Array.isArray(s)&&(e[t]=[s])},L=(e,t)=>{if(Array.isArray(e))e.forEach(t)
else for(var s in e)e.hasOwnProperty(s)&&t(e[s],s)},E=(e,t)=>"number"==typeof e&&"number"==typeof t?e>t?1:e<t?-1:0:(e=v(e+"").toLowerCase())>(t=v(t+"").toLowerCase())?1:t>e?-1:0
class T{items
settings
constructor(e,t){this.items=e,this.settings=t||{diacritics:!0}}tokenize(e,t,s){if(!e||!e.length)return[]
const i=[],n=e.split(/\s+/)
var o
return s&&(o=new RegExp("^("+Object.keys(s).map(r).join("|")+"):(.*)$")),n.forEach((e=>{let s,n=null,l=null
o&&(s=e.match(o))&&(n=s[1],e=s[2]),e.length>0&&(l=this.settings.diacritics?I(e)||null:r(e),l&&t&&(l="\\b"+l)),i.push({string:e,regex:l?new RegExp(l,"iu"):null,field:n})})),i}getScoreFunction(e,t){var s=this.prepareSearch(e,t)
return this._getScoreFunction(s)}_getScoreFunction(e){const t=e.tokens,s=t.length
if(!s)return function(){return 0}
const i=e.options.fields,n=e.weights,o=i.length,r=e.getAttrFn
if(!o)return function(){return 1}
const l=1===o?function(e,t){const s=i[0].field
return x(r(t,s),e,n[s]||1)}:function(e,t){var s=0
if(e.field){const i=r(t,e.field)
!e.regex&&i?s+=1/o:s+=x(i,e,1)}else L(n,((i,n)=>{s+=x(r(t,n),e,i)}))
return s/o}
return 1===s?function(e){return l(t[0],e)}:"and"===e.options.conjunction?function(e){var i,n=0
for(let s of t){if((i=l(s,e))<=0)return 0
n+=i}return n/s}:function(e){var i=0
return L(t,(t=>{i+=l(t,e)})),i/s}}getSortFunction(e,t){var s=this.prepareSearch(e,t)
return this._getSortFunction(s)}_getSortFunction(e){var t,s=[]
const i=this,n=e.options,o=!e.query&&n.sort_empty?n.sort_empty:n.sort
if("function"==typeof o)return o.bind(this)
const r=function(t,s){return"$score"===t?s.score:e.getAttrFn(i.items[s.id],t)}
if(o)for(let t of o)(e.query||"$score"!==t.field)&&s.push(t)
if(e.query){t=!0
for(let e of s)if("$score"===e.field){t=!1
break}t&&s.unshift({field:"$score",direction:"desc"})}else s=s.filter((e=>"$score"!==e.field))
return s.length?function(e,t){var i,n
for(let o of s){if(n=o.field,i=("desc"===o.direction?-1:1)*E(r(n,e),r(n,t)))return i}return 0}:null}prepareSearch(e,t){const s={}
var i=Object.assign({},t)
if(F(i,"sort"),F(i,"sort_empty"),i.fields){F(i,"fields")
const e=[]
i.fields.forEach((t=>{"string"==typeof t&&(t={field:t,weight:1}),e.push(t),s[t.field]="weight"in t?t.weight:1})),i.fields=e}return{options:i,query:e.toLowerCase().trim(),tokens:this.tokenize(e,i.respect_word_boundaries,s),total:0,items:[],weights:s,getAttrFn:i.nesting?k:A}}search(e,t){var s,i,n=this
i=this.prepareSearch(e,t),t=i.options,e=i.query
const o=t.score||n._getScoreFunction(i)
e.length?L(n.items,((e,n)=>{s=o(e),(!1===t.filter||s>0)&&i.items.push({score:s,id:n})})):L(n.items,((e,t)=>{i.items.push({score:1,id:t})}))
const r=n._getSortFunction(i)
return r&&i.items.sort(r),i.total=i.items.length,"number"==typeof t.limit&&(i.items=i.items.slice(0,t.limit)),i}}const P=e=>null==e?null:N(e),N=e=>"boolean"==typeof e?e?"1":"0":e+"",j=e=>(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),$=(e,t)=>{var s
return function(i,n){var o=this
s&&(o.loading=Math.max(o.loading-1,0),clearTimeout(s)),s=setTimeout((function(){s=null,o.loadedSearches[i]=!0,e.call(o,i,n)}),t)}},V=(e,t,s)=>{var i,n=e.trigger,o={}
for(i of(e.trigger=function(){var s=arguments[0]
if(-1===t.indexOf(s))return n.apply(e,arguments)
o[s]=arguments},s.apply(e,[]),e.trigger=n,t))i in o&&n.apply(e,o[i])},q=(e,t=!1)=>{e&&(e.preventDefault(),t&&e.stopPropagation())},D=(e,t,s,i)=>{e.addEventListener(t,s,i)},H=(e,t)=>!!t&&(!!t[e]&&1===(t.altKey?1:0)+(t.ctrlKey?1:0)+(t.shiftKey?1:0)+(t.metaKey?1:0)),R=(e,t)=>{const s=e.getAttribute("id")
return s||(e.setAttribute("id",t),t)},M=e=>e.replace(/[\\"']/g,"\\$&"),z=(e,t)=>{t&&e.append(t)},B=(e,t)=>{if(Array.isArray(e))e.forEach(t)
else for(var s in e)e.hasOwnProperty(s)&&t(e[s],s)},K=e=>{if(e.jquery)return e[0]
if(e instanceof HTMLElement)return e
if(Q(e)){var t=document.createElement("template")
return t.innerHTML=e.trim(),t.content.firstChild}return document.querySelector(e)},Q=e=>"string"==typeof e&&e.indexOf("<")>-1,G=(e,t)=>{var s=document.createEvent("HTMLEvents")
s.initEvent(t,!0,!1),e.dispatchEvent(s)},U=(e,t)=>{Object.assign(e.style,t)},J=(e,...t)=>{var s=X(t);(e=Y(e)).map((e=>{s.map((t=>{e.classList.add(t)}))}))},W=(e,...t)=>{var s=X(t);(e=Y(e)).map((e=>{s.map((t=>{e.classList.remove(t)}))}))},X=e=>{var t=[]
return B(e,(e=>{"string"==typeof e&&(e=e.trim().split(/[\t\n\f\r\s]/)),Array.isArray(e)&&(t=t.concat(e))})),t.filter(Boolean)},Y=e=>(Array.isArray(e)||(e=[e]),e),Z=(e,t,s)=>{if(!s||s.contains(e))for(;e&&e.matches;){if(e.matches(t))return e
e=e.parentNode}},ee=(e,t=0)=>t>0?e[e.length-1]:e[0],te=(e,t)=>{if(!e)return-1
t=t||e.nodeName
for(var s=0;e=e.previousElementSibling;)e.matches(t)&&s++
return s},se=(e,t)=>{B(t,((t,s)=>{null==t?e.removeAttribute(s):e.setAttribute(s,""+t)}))},ie=(e,t)=>{e.parentNode&&e.parentNode.replaceChild(t,e)},ne=(e,t)=>{if(null===t)return
if("string"==typeof t){if(!t.length)return
t=new RegExp(t,"i")}const s=e=>3===e.nodeType?(e=>{var s=e.data.match(t)
if(s&&e.data.length>0){var i=document.createElement("span")
i.className="highlight"
var n=e.splitText(s.index)
n.splitText(s[0].length)
var o=n.cloneNode(!0)
return i.appendChild(o),ie(n,i),1}return 0})(e):((e=>{1!==e.nodeType||!e.childNodes||/(script|style)/i.test(e.tagName)||"highlight"===e.className&&"SPAN"===e.tagName||Array.from(e.childNodes).forEach((e=>{s(e)}))})(e),0)
s(e)},oe="undefined"!=typeof navigator&&/Mac/.test(navigator.userAgent)?"metaKey":"ctrlKey"
var re={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:null,createOnBlur:!1,createFilter:null,highlight:!0,openOnFocus:!0,shouldOpen:null,maxOptions:50,maxItems:null,hideSelected:null,duplicates:!1,addPrecedence:!1,selectOnTab:!1,preload:null,allowEmptyOption:!1,refreshThrottle:300,loadThrottle:300,loadingClass:"loading",dataAttr:null,optgroupField:"optgroup",valueField:"value",labelField:"text",disabledField:"disabled",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"ts-wrapper",controlClass:"ts-control",dropdownClass:"ts-dropdown",dropdownContentClass:"ts-dropdown-content",itemClass:"item",optionClass:"option",dropdownParent:null,controlInput:'<input type="text" autocomplete="off" size="1" />',copyClassesToDropdown:!1,placeholder:null,hidePlaceholder:null,shouldLoad:function(e){return e.length>0},render:{}}
function le(e,t){var s=Object.assign({},re,t),i=s.dataAttr,n=s.labelField,o=s.valueField,r=s.disabledField,l=s.optgroupField,a=s.optgroupLabelField,c=s.optgroupValueField,d=e.tagName.toLowerCase(),u=e.getAttribute("placeholder")||e.getAttribute("data-placeholder")
if(!u&&!s.allowEmptyOption){let t=e.querySelector('option[value=""]')
t&&(u=t.textContent)}var p={placeholder:u,options:[],optgroups:[],items:[],maxItems:null}
return"select"===d?(()=>{var t,d=p.options,u={},h=1
let g=0
var f=e=>{var t=Object.assign({},e.dataset),s=i&&t[i]
return"string"==typeof s&&s.length&&(t=Object.assign(t,JSON.parse(s))),t},m=(e,t)=>{var i=P(e.value)
if(null!=i&&(i||s.allowEmptyOption)){if(u.hasOwnProperty(i)){if(t){var a=u[i][l]
a?Array.isArray(a)?a.push(t):u[i][l]=[a,t]:u[i][l]=t}}else{var c=f(e)
c[n]=c[n]||e.textContent,c[o]=c[o]||i,c[r]=c[r]||e.disabled,c[l]=c[l]||t,c.$option=e,c.$order=c.$order||++g,u[i]=c,d.push(c)}e.selected&&p.items.push(i)}}
p.maxItems=e.hasAttribute("multiple")?null:1,B(e.children,(e=>{var s,i,n
"optgroup"===(t=e.tagName.toLowerCase())?((n=f(s=e))[a]=n[a]||s.getAttribute("label")||"",n[c]=n[c]||h++,n[r]=n[r]||s.disabled,n.$order=n.$order||++g,p.optgroups.push(n),i=n[c],B(s.children,(e=>{m(e,i)}))):"option"===t&&m(e)}))})():(()=>{const t=e.getAttribute(i)
if(t)p.options=JSON.parse(t),B(p.options,(e=>{p.items.push(e[o])}))
else{var r=e.value.trim()||""
if(!s.allowEmptyOption&&!r.length)return
const t=r.split(s.delimiter)
B(t,(e=>{const t={}
t[n]=e,t[o]=e,p.options.push(t)})),p.items=t}})(),Object.assign({},re,p,t)}var ae=0
class ce extends(function(e){return e.plugins={},class extends e{constructor(...e){super(...e),this.plugins={names:[],settings:{},requested:{},loaded:{}}}static define(t,s){e.plugins[t]={name:t,fn:s}}initializePlugins(e){var t,s
const i=this,n=[]
if(Array.isArray(e))e.forEach((e=>{"string"==typeof e?n.push(e):(i.plugins.settings[e.name]=e.options,n.push(e.name))}))
else if(e)for(t in e)e.hasOwnProperty(t)&&(i.plugins.settings[t]=e[t],n.push(t))
for(;s=n.shift();)i.require(s)}loadPlugin(t){var s=this,i=s.plugins,n=e.plugins[t]
if(!e.plugins.hasOwnProperty(t))throw new Error('Unable to find "'+t+'" plugin')
i.requested[t]=!0,i.loaded[t]=n.fn.apply(s,[s.plugins.settings[t]||{}]),i.names.push(t)}require(e){var t=this,s=t.plugins
if(!t.plugins.loaded.hasOwnProperty(e)){if(s.requested[e])throw new Error('Plugin has circular dependency ("'+e+'")')
t.loadPlugin(e)}return s.loaded[e]}}}(t)){constructor(e,t){var s
super(),this.order=0,this.isOpen=!1,this.isDisabled=!1,this.isReadOnly=!1,this.isInvalid=!1,this.isValid=!0,this.isLocked=!1,this.isFocused=!1,this.isInputHidden=!1,this.isSetup=!1,this.ignoreFocus=!1,this.ignoreHover=!1,this.hasOptions=!1,this.lastValue="",this.caretPos=0,this.loading=0,this.loadedSearches={},this.activeOption=null,this.activeItems=[],this.optgroups={},this.options={},this.userOptions={},this.items=[],this.refreshTimeout=null,ae++
var i=K(e)
if(i.tomselect)throw new Error("Tom Select already initialized on this element")
i.tomselect=this,s=(window.getComputedStyle&&window.getComputedStyle(i,null)).getPropertyValue("direction")
const n=le(i,t)
this.settings=n,this.input=i,this.tabIndex=i.tabIndex||0,this.is_select_tag="select"===i.tagName.toLowerCase(),this.rtl=/rtl/i.test(s),this.inputId=R(i,"tomselect-"+ae),this.isRequired=i.required,this.sifter=new T(this.options,{diacritics:n.diacritics}),n.mode=n.mode||(1===n.maxItems?"single":"multi"),"boolean"!=typeof n.hideSelected&&(n.hideSelected="multi"===n.mode),"boolean"!=typeof n.hidePlaceholder&&(n.hidePlaceholder="multi"!==n.mode)
var o=n.createFilter
"function"!=typeof o&&("string"==typeof o&&(o=new RegExp(o)),o instanceof RegExp?n.createFilter=e=>o.test(e):n.createFilter=e=>this.settings.duplicates||!this.options[e]),this.initializePlugins(n.plugins),this.setupCallbacks(),this.setupTemplates()
const r=K("<div>"),l=K("<div>"),a=this._render("dropdown"),c=K('<div role="listbox" tabindex="-1">'),d=this.input.getAttribute("class")||"",u=n.mode
var p
if(J(r,n.wrapperClass,d,u),J(l,n.controlClass),z(r,l),J(a,n.dropdownClass,u),n.copyClassesToDropdown&&J(a,d),J(c,n.dropdownContentClass),z(a,c),K(n.dropdownParent||r).appendChild(a),Q(n.controlInput)){p=K(n.controlInput)
B(["autocorrect","autocapitalize","autocomplete","spellcheck"],(e=>{i.getAttribute(e)&&se(p,{[e]:i.getAttribute(e)})})),p.tabIndex=-1,l.appendChild(p),this.focus_node=p}else n.controlInput?(p=K(n.controlInput),this.focus_node=p):(p=K("<input/>"),this.focus_node=l)
this.wrapper=r,this.dropdown=a,this.dropdown_content=c,this.control=l,this.control_input=p,this.setup()}setup(){const e=this,t=e.settings,s=e.control_input,i=e.dropdown,n=e.dropdown_content,o=e.wrapper,l=e.control,a=e.input,c=e.focus_node,d={passive:!0},u=e.inputId+"-ts-dropdown"
se(n,{id:u}),se(c,{role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-controls":u})
const p=R(c,e.inputId+"-ts-control"),h="label[for='"+(e=>e.replace(/['"\\]/g,"\\$&"))(e.inputId)+"']",g=document.querySelector(h),f=e.focus.bind(e)
if(g){D(g,"click",f),se(g,{for:p})
const t=R(g,e.inputId+"-ts-label")
se(c,{"aria-labelledby":t}),se(n,{"aria-labelledby":t})}if(o.style.width=a.style.width,e.plugins.names.length){const t="plugin-"+e.plugins.names.join(" plugin-")
J([o,i],t)}(null===t.maxItems||t.maxItems>1)&&e.is_select_tag&&se(a,{multiple:"multiple"}),t.placeholder&&se(s,{placeholder:t.placeholder}),!t.splitOn&&t.delimiter&&(t.splitOn=new RegExp("\\s*"+r(t.delimiter)+"+\\s*")),t.load&&t.loadThrottle&&(t.load=$(t.load,t.loadThrottle)),D(i,"mousemove",(()=>{e.ignoreHover=!1})),D(i,"mouseenter",(t=>{var s=Z(t.target,"[data-selectable]",i)
s&&e.onOptionHover(t,s)}),{capture:!0}),D(i,"click",(t=>{const s=Z(t.target,"[data-selectable]")
s&&(e.onOptionSelect(t,s),q(t,!0))})),D(l,"click",(t=>{var i=Z(t.target,"[data-ts-item]",l)
i&&e.onItemSelect(t,i)?q(t,!0):""==s.value&&(e.onClick(),q(t,!0))})),D(c,"keydown",(t=>e.onKeyDown(t))),D(s,"keypress",(t=>e.onKeyPress(t))),D(s,"input",(t=>e.onInput(t))),D(c,"blur",(t=>e.onBlur(t))),D(c,"focus",(t=>e.onFocus(t))),D(s,"paste",(t=>e.onPaste(t)))
const m=t=>{const n=t.composedPath()[0]
if(!o.contains(n)&&!i.contains(n))return e.isFocused&&e.blur(),void e.inputState()
n==s&&e.isOpen?t.stopPropagation():q(t,!0)},v=()=>{e.isOpen&&e.positionDropdown()}
D(document,"mousedown",m),D(window,"scroll",v,d),D(window,"resize",v,d),this._destroy=()=>{document.removeEventListener("mousedown",m),window.removeEventListener("scroll",v),window.removeEventListener("resize",v),g&&g.removeEventListener("click",f)},this.revertSettings={innerHTML:a.innerHTML,tabIndex:a.tabIndex},a.tabIndex=-1,a.insertAdjacentElement("afterend",e.wrapper),e.sync(!1),t.items=[],delete t.optgroups,delete t.options,D(a,"invalid",(()=>{e.isValid&&(e.isValid=!1,e.isInvalid=!0,e.refreshState())})),e.updateOriginalInput(),e.refreshItems(),e.close(!1),e.inputState(),e.isSetup=!0,a.disabled?e.disable():a.readOnly?e.setReadOnly(!0):e.enable(),e.on("change",this.onChange),J(a,"tomselected","ts-hidden-accessible"),e.trigger("initialize"),!0===t.preload&&e.preload()}setupOptions(e=[],t=[]){this.addOptions(e),B(t,(e=>{this.registerOptionGroup(e)}))}setupTemplates(){var e=this,t=e.settings.labelField,s=e.settings.optgroupLabelField,i={optgroup:e=>{let t=document.createElement("div")
return t.className="optgroup",t.appendChild(e.options),t},optgroup_header:(e,t)=>'<div class="optgroup-header">'+t(e[s])+"</div>",option:(e,s)=>"<div>"+s(e[t])+"</div>",item:(e,s)=>"<div>"+s(e[t])+"</div>",option_create:(e,t)=>'<div class="create">Add <strong>'+t(e.input)+"</strong>&hellip;</div>",no_results:()=>'<div class="no-results">No results found</div>',loading:()=>'<div class="spinner"></div>',not_loading:()=>{},dropdown:()=>"<div></div>"}
e.settings.render=Object.assign({},i,e.settings.render)}setupCallbacks(){var e,t,s={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",item_select:"onItemSelect",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"}
for(e in s)(t=this.settings[s[e]])&&this.on(e,t)}sync(e=!0){const t=this,s=e?le(t.input,{delimiter:t.settings.delimiter}):t.settings
t.setupOptions(s.options,s.optgroups),t.setValue(s.items||[],!0),t.lastQuery=null}onClick(){var e=this
if(e.activeItems.length>0)return e.clearActiveItems(),void e.focus()
e.isFocused&&e.isOpen?e.blur():e.focus()}onMouseDown(){}onChange(){G(this.input,"input"),G(this.input,"change")}onPaste(e){var t=this
t.isInputHidden||t.isLocked?q(e):t.settings.splitOn&&setTimeout((()=>{var e=t.inputValue()
if(e.match(t.settings.splitOn)){var s=e.trim().split(t.settings.splitOn)
B(s,(e=>{P(e)&&(this.options[e]?t.addItem(e):t.createItem(e))}))}}),0)}onKeyPress(e){var t=this
if(!t.isLocked){var s=String.fromCharCode(e.keyCode||e.which)
return t.settings.create&&"multi"===t.settings.mode&&s===t.settings.delimiter?(t.createItem(),void q(e)):void 0}q(e)}onKeyDown(e){var t=this
if(t.ignoreHover=!0,t.isLocked)9!==e.keyCode&&q(e)
else{switch(e.keyCode){case 65:if(H(oe,e)&&""==t.control_input.value)return q(e),void t.selectAll()
break
case 27:return t.isOpen&&(q(e,!0),t.close()),void t.clearActiveItems()
case 40:if(!t.isOpen&&t.hasOptions)t.open()
else if(t.activeOption){let e=t.getAdjacent(t.activeOption,1)
e&&t.setActiveOption(e)}return void q(e)
case 38:if(t.activeOption){let e=t.getAdjacent(t.activeOption,-1)
e&&t.setActiveOption(e)}return void q(e)
case 13:return void(t.canSelect(t.activeOption)?(t.onOptionSelect(e,t.activeOption),q(e)):(t.settings.create&&t.createItem()||document.activeElement==t.control_input&&t.isOpen)&&q(e))
case 37:return void t.advanceSelection(-1,e)
case 39:return void t.advanceSelection(1,e)
case 9:return void(t.settings.selectOnTab&&(t.canSelect(t.activeOption)&&(t.onOptionSelect(e,t.activeOption),q(e)),t.settings.create&&t.createItem()&&q(e)))
case 8:case 46:return void t.deleteSelection(e)}t.isInputHidden&&!H(oe,e)&&q(e)}}onInput(e){if(this.isLocked)return
const t=this.inputValue()
this.lastValue!==t&&(this.lastValue=t,""!=t?(this.refreshTimeout&&window.clearTimeout(this.refreshTimeout),this.refreshTimeout=((e,t)=>t>0?window.setTimeout(e,t):(e.call(null),null))((()=>{this.refreshTimeout=null,this._onInput()}),this.settings.refreshThrottle)):this._onInput())}_onInput(){const e=this.lastValue
this.settings.shouldLoad.call(this,e)&&this.load(e),this.refreshOptions(),this.trigger("type",e)}onOptionHover(e,t){this.ignoreHover||this.setActiveOption(t,!1)}onFocus(e){var t=this,s=t.isFocused
if(t.isDisabled||t.isReadOnly)return t.blur(),void q(e)
t.ignoreFocus||(t.isFocused=!0,"focus"===t.settings.preload&&t.preload(),s||t.trigger("focus"),t.activeItems.length||(t.inputState(),t.refreshOptions(!!t.settings.openOnFocus)),t.refreshState())}onBlur(e){if(!1!==document.hasFocus()){var t=this
if(t.isFocused){t.isFocused=!1,t.ignoreFocus=!1
var s=()=>{t.close(),t.setActiveItem(),t.setCaret(t.items.length),t.trigger("blur")}
t.settings.create&&t.settings.createOnBlur?t.createItem(null,s):s()}}}onOptionSelect(e,t){var s,i=this
t.parentElement&&t.parentElement.matches("[data-disabled]")||(t.classList.contains("create")?i.createItem(null,(()=>{i.settings.closeAfterSelect&&i.close()})):void 0!==(s=t.dataset.value)&&(i.lastQuery=null,i.addItem(s),i.settings.closeAfterSelect&&i.close(),!i.settings.hideSelected&&e.type&&/click/.test(e.type)&&i.setActiveOption(t)))}canSelect(e){return!!(this.isOpen&&e&&this.dropdown_content.contains(e))}onItemSelect(e,t){var s=this
return!s.isLocked&&"multi"===s.settings.mode&&(q(e),s.setActiveItem(t,e),!0)}canLoad(e){return!!this.settings.load&&!this.loadedSearches.hasOwnProperty(e)}load(e){const t=this
if(!t.canLoad(e))return
J(t.wrapper,t.settings.loadingClass),t.loading++
const s=t.loadCallback.bind(t)
t.settings.load.call(t,e,s)}loadCallback(e,t){const s=this
s.loading=Math.max(s.loading-1,0),s.lastQuery=null,s.clearActiveOption(),s.setupOptions(e,t),s.refreshOptions(s.isFocused&&!s.isInputHidden),s.loading||W(s.wrapper,s.settings.loadingClass),s.trigger("load",e,t)}preload(){var e=this.wrapper.classList
e.contains("preloaded")||(e.add("preloaded"),this.load(""))}setTextboxValue(e=""){var t=this.control_input
t.value!==e&&(t.value=e,G(t,"update"),this.lastValue=e)}getValue(){return this.is_select_tag&&this.input.hasAttribute("multiple")?this.items:this.items.join(this.settings.delimiter)}setValue(e,t){V(this,t?[]:["change"],(()=>{this.clear(t),this.addItems(e,t)}))}setMaxItems(e){0===e&&(e=null),this.settings.maxItems=e,this.refreshState()}setActiveItem(e,t){var s,i,n,o,r,l,a=this
if("single"!==a.settings.mode){if(!e)return a.clearActiveItems(),void(a.isFocused&&a.inputState())
if("click"===(s=t&&t.type.toLowerCase())&&H("shiftKey",t)&&a.activeItems.length){for(l=a.getLastActive(),(n=Array.prototype.indexOf.call(a.control.children,l))>(o=Array.prototype.indexOf.call(a.control.children,e))&&(r=n,n=o,o=r),i=n;i<=o;i++)e=a.control.children[i],-1===a.activeItems.indexOf(e)&&a.setActiveItemClass(e)
q(t)}else"click"===s&&H(oe,t)||"keydown"===s&&H("shiftKey",t)?e.classList.contains("active")?a.removeActiveItem(e):a.setActiveItemClass(e):(a.clearActiveItems(),a.setActiveItemClass(e))
a.inputState(),a.isFocused||a.focus()}}setActiveItemClass(e){const t=this,s=t.control.querySelector(".last-active")
s&&W(s,"last-active"),J(e,"active last-active"),t.trigger("item_select",e),-1==t.activeItems.indexOf(e)&&t.activeItems.push(e)}removeActiveItem(e){var t=this.activeItems.indexOf(e)
this.activeItems.splice(t,1),W(e,"active")}clearActiveItems(){W(this.activeItems,"active"),this.activeItems=[]}setActiveOption(e,t=!0){e!==this.activeOption&&(this.clearActiveOption(),e&&(this.activeOption=e,se(this.focus_node,{"aria-activedescendant":e.getAttribute("id")}),se(e,{"aria-selected":"true"}),J(e,"active"),t&&this.scrollToOption(e)))}scrollToOption(e,t){if(!e)return
const s=this.dropdown_content,i=s.clientHeight,n=s.scrollTop||0,o=e.offsetHeight,r=e.getBoundingClientRect().top-s.getBoundingClientRect().top+n
r+o>i+n?this.scroll(r-i+o,t):r<n&&this.scroll(r,t)}scroll(e,t){const s=this.dropdown_content
t&&(s.style.scrollBehavior=t),s.scrollTop=e,s.style.scrollBehavior=""}clearActiveOption(){this.activeOption&&(W(this.activeOption,"active"),se(this.activeOption,{"aria-selected":null})),this.activeOption=null,se(this.focus_node,{"aria-activedescendant":null})}selectAll(){const e=this
if("single"===e.settings.mode)return
const t=e.controlChildren()
t.length&&(e.inputState(),e.close(),e.activeItems=t,B(t,(t=>{e.setActiveItemClass(t)})))}inputState(){var e=this
e.control.contains(e.control_input)&&(se(e.control_input,{placeholder:e.settings.placeholder}),e.activeItems.length>0||!e.isFocused&&e.settings.hidePlaceholder&&e.items.length>0?(e.setTextboxValue(),e.isInputHidden=!0):(e.settings.hidePlaceholder&&e.items.length>0&&se(e.control_input,{placeholder:""}),e.isInputHidden=!1),e.wrapper.classList.toggle("input-hidden",e.isInputHidden))}inputValue(){return this.control_input.value.trim()}focus(){var e=this
e.isDisabled||e.isReadOnly||(e.ignoreFocus=!0,e.control_input.offsetWidth?e.control_input.focus():e.focus_node.focus(),setTimeout((()=>{e.ignoreFocus=!1,e.onFocus()}),0))}blur(){this.focus_node.blur(),this.onBlur()}getScoreFunction(e){return this.sifter.getScoreFunction(e,this.getSearchOptions())}getSearchOptions(){var e=this.settings,t=e.sortField
return"string"==typeof e.sortField&&(t=[{field:e.sortField}]),{fields:e.searchField,conjunction:e.searchConjunction,sort:t,nesting:e.nesting}}search(e){var t,s,i=this,n=this.getSearchOptions()
if(i.settings.score&&"function"!=typeof(s=i.settings.score.call(i,e)))throw new Error('Tom Select "score" setting must be a function that returns a function')
return e!==i.lastQuery?(i.lastQuery=e,t=i.sifter.search(e,Object.assign(n,{score:s})),i.currentResults=t):t=Object.assign({},i.currentResults),i.settings.hideSelected&&(t.items=t.items.filter((e=>{let t=P(e.id)
return!(t&&-1!==i.items.indexOf(t))}))),t}refreshOptions(e=!0){var t,s,i,n,o,r,l,a,c,d
const u={},p=[]
var h=this,g=h.inputValue()
const f=g===h.lastQuery||""==g&&null==h.lastQuery
var m=h.search(g),v=null,y=h.settings.shouldOpen||!1,O=h.dropdown_content
f&&(v=h.activeOption)&&(c=v.closest("[data-group]")),n=m.items.length,"number"==typeof h.settings.maxOptions&&(n=Math.min(n,h.settings.maxOptions)),n>0&&(y=!0)
const b=(e,t)=>{let s=u[e]
if(void 0!==s){let e=p[s]
if(void 0!==e)return[s,e.fragment]}let i=document.createDocumentFragment()
return s=p.length,p.push({fragment:i,order:t,optgroup:e}),[s,i]}
for(t=0;t<n;t++){let e=m.items[t]
if(!e)continue
let n=e.id,l=h.options[n]
if(void 0===l)continue
let a=N(n),d=h.getOption(a,!0)
for(h.settings.hideSelected||d.classList.toggle("selected",h.items.includes(a)),o=l[h.settings.optgroupField]||"",s=0,i=(r=Array.isArray(o)?o:[o])&&r.length;s<i;s++){o=r[s]
let e=l.$order,t=h.optgroups[o]
void 0===t?o="":e=t.$order
const[i,a]=b(o,e)
s>0&&(d=d.cloneNode(!0),se(d,{id:l.$id+"-clone-"+s,"aria-selected":null}),d.classList.add("ts-cloned"),W(d,"active"),h.activeOption&&h.activeOption.dataset.value==n&&c&&c.dataset.group===o.toString()&&(v=d)),a.appendChild(d),""!=o&&(u[o]=i)}}var w
h.settings.lockOptgroupOrder&&p.sort(((e,t)=>e.order-t.order)),l=document.createDocumentFragment(),B(p,(e=>{let t=e.fragment,s=e.optgroup
if(!t||!t.children.length)return
let i=h.optgroups[s]
if(void 0!==i){let e=document.createDocumentFragment(),s=h.render("optgroup_header",i)
z(e,s),z(e,t)
let n=h.render("optgroup",{group:i,options:e})
z(l,n)}else z(l,t)})),O.innerHTML="",z(O,l),h.settings.highlight&&(w=O.querySelectorAll("span.highlight"),Array.prototype.forEach.call(w,(function(e){var t=e.parentNode
t.replaceChild(e.firstChild,e),t.normalize()})),m.query.length&&m.tokens.length&&B(m.tokens,(e=>{ne(O,e.regex)})))
var _=e=>{let t=h.render(e,{input:g})
return t&&(y=!0,O.insertBefore(t,O.firstChild)),t}
if(h.loading?_("loading"):h.settings.shouldLoad.call(h,g)?0===m.items.length&&_("no_results"):_("not_loading"),(a=h.canCreate(g))&&(d=_("option_create")),h.hasOptions=m.items.length>0||a,y){if(m.items.length>0){if(v||"single"!==h.settings.mode||null==h.items[0]||(v=h.getOption(h.items[0])),!O.contains(v)){let e=0
d&&!h.settings.addPrecedence&&(e=1),v=h.selectable()[e]}}else d&&(v=d)
e&&!h.isOpen&&(h.open(),h.scrollToOption(v,"auto")),h.setActiveOption(v)}else h.clearActiveOption(),e&&h.isOpen&&h.close(!1)}selectable(){return this.dropdown_content.querySelectorAll("[data-selectable]")}addOption(e,t=!1){const s=this
if(Array.isArray(e))return s.addOptions(e,t),!1
const i=P(e[s.settings.valueField])
return null!==i&&!s.options.hasOwnProperty(i)&&(e.$order=e.$order||++s.order,e.$id=s.inputId+"-opt-"+e.$order,s.options[i]=e,s.lastQuery=null,t&&(s.userOptions[i]=t,s.trigger("option_add",i,e)),i)}addOptions(e,t=!1){B(e,(e=>{this.addOption(e,t)}))}registerOption(e){return this.addOption(e)}registerOptionGroup(e){var t=P(e[this.settings.optgroupValueField])
return null!==t&&(e.$order=e.$order||++this.order,this.optgroups[t]=e,t)}addOptionGroup(e,t){var s
t[this.settings.optgroupValueField]=e,(s=this.registerOptionGroup(t))&&this.trigger("optgroup_add",s,t)}removeOptionGroup(e){this.optgroups.hasOwnProperty(e)&&(delete this.optgroups[e],this.clearCache(),this.trigger("optgroup_remove",e))}clearOptionGroups(){this.optgroups={},this.clearCache(),this.trigger("optgroup_clear")}updateOption(e,t){const s=this
var i,n
const o=P(e),r=P(t[s.settings.valueField])
if(null===o)return
const l=s.options[o]
if(null==l)return
if("string"!=typeof r)throw new Error("Value must be set in option data")
const a=s.getOption(o),c=s.getItem(o)
if(t.$order=t.$order||l.$order,delete s.options[o],s.uncacheValue(r),s.options[r]=t,a){if(s.dropdown_content.contains(a)){const e=s._render("option",t)
ie(a,e),s.activeOption===a&&s.setActiveOption(e)}a.remove()}c&&(-1!==(n=s.items.indexOf(o))&&s.items.splice(n,1,r),i=s._render("item",t),c.classList.contains("active")&&J(i,"active"),ie(c,i)),s.lastQuery=null}removeOption(e,t){const s=this
e=N(e),s.uncacheValue(e),delete s.userOptions[e],delete s.options[e],s.lastQuery=null,s.trigger("option_remove",e),s.removeItem(e,t)}clearOptions(e){const t=(e||this.clearFilter).bind(this)
this.loadedSearches={},this.userOptions={},this.clearCache()
const s={}
B(this.options,((e,i)=>{t(e,i)&&(s[i]=e)})),this.options=this.sifter.items=s,this.lastQuery=null,this.trigger("option_clear")}clearFilter(e,t){return this.items.indexOf(t)>=0}getOption(e,t=!1){const s=P(e)
if(null===s)return null
const i=this.options[s]
if(null!=i){if(i.$div)return i.$div
if(t)return this._render("option",i)}return null}getAdjacent(e,t,s="option"){var i
if(!e)return null
i="item"==s?this.controlChildren():this.dropdown_content.querySelectorAll("[data-selectable]")
for(let s=0;s<i.length;s++)if(i[s]==e)return t>0?i[s+1]:i[s-1]
return null}getItem(e){if("object"==typeof e)return e
var t=P(e)
return null!==t?this.control.querySelector(`[data-value="${M(t)}"]`):null}addItems(e,t){var s=this,i=Array.isArray(e)?e:[e]
const n=(i=i.filter((e=>-1===s.items.indexOf(e))))[i.length-1]
i.forEach((e=>{s.isPending=e!==n,s.addItem(e,t)}))}addItem(e,t){V(this,t?[]:["change","dropdown_close"],(()=>{var s,i
const n=this,o=n.settings.mode,r=P(e)
if((!r||-1===n.items.indexOf(r)||("single"===o&&n.close(),"single"!==o&&n.settings.duplicates))&&null!==r&&n.options.hasOwnProperty(r)&&("single"===o&&n.clear(t),"multi"!==o||!n.isFull())){if(s=n._render("item",n.options[r]),n.control.contains(s)&&(s=s.cloneNode(!0)),i=n.isFull(),n.items.splice(n.caretPos,0,r),n.insertAtCaret(s),n.isSetup){if(!n.isPending&&n.settings.hideSelected){let e=n.getOption(r),t=n.getAdjacent(e,1)
t&&n.setActiveOption(t)}n.isPending||n.settings.closeAfterSelect||n.refreshOptions(n.isFocused&&"single"!==o),0!=n.settings.closeAfterSelect&&n.isFull()?n.close():n.isPending||n.positionDropdown(),n.trigger("item_add",r,s),n.isPending||n.updateOriginalInput({silent:t})}(!n.isPending||!i&&n.isFull())&&(n.inputState(),n.refreshState())}}))}removeItem(e=null,t){const s=this
if(!(e=s.getItem(e)))return
var i,n
const o=e.dataset.value
i=te(e),e.remove(),e.classList.contains("active")&&(n=s.activeItems.indexOf(e),s.activeItems.splice(n,1),W(e,"active")),s.items.splice(i,1),s.lastQuery=null,!s.settings.persist&&s.userOptions.hasOwnProperty(o)&&s.removeOption(o,t),i<s.caretPos&&s.setCaret(s.caretPos-1),s.updateOriginalInput({silent:t}),s.refreshState(),s.positionDropdown(),s.trigger("item_remove",o,e)}createItem(e=null,t=()=>{}){3===arguments.length&&(t=arguments[2]),"function"!=typeof t&&(t=()=>{})
var s,i=this,n=i.caretPos
if(e=e||i.inputValue(),!i.canCreate(e))return t(),!1
i.lock()
var o=!1,r=e=>{if(i.unlock(),!e||"object"!=typeof e)return t()
var s=P(e[i.settings.valueField])
if("string"!=typeof s)return t()
i.setTextboxValue(),i.addOption(e,!0),i.setCaret(n),i.addItem(s),t(e),o=!0}
return s="function"==typeof i.settings.create?i.settings.create.call(this,e,r):{[i.settings.labelField]:e,[i.settings.valueField]:e},o||r(s),!0}refreshItems(){var e=this
e.lastQuery=null,e.isSetup&&e.addItems(e.items),e.updateOriginalInput(),e.refreshState()}refreshState(){const e=this
e.refreshValidityState()
const t=e.isFull(),s=e.isLocked
e.wrapper.classList.toggle("rtl",e.rtl)
const i=e.wrapper.classList
var n
i.toggle("focus",e.isFocused),i.toggle("disabled",e.isDisabled),i.toggle("readonly",e.isReadOnly),i.toggle("required",e.isRequired),i.toggle("invalid",!e.isValid),i.toggle("locked",s),i.toggle("full",t),i.toggle("input-active",e.isFocused&&!e.isInputHidden),i.toggle("dropdown-active",e.isOpen),i.toggle("has-options",(n=e.options,0===Object.keys(n).length)),i.toggle("has-items",e.items.length>0)}refreshValidityState(){var e=this
e.input.validity&&(e.isValid=e.input.validity.valid,e.isInvalid=!e.isValid)}isFull(){return null!==this.settings.maxItems&&this.items.length>=this.settings.maxItems}updateOriginalInput(e={}){const t=this
var s,i
const n=t.input.querySelector('option[value=""]')
if(t.is_select_tag){const o=[],r=t.input.querySelectorAll("option:checked").length
function l(e,s,i){return e||(e=K('<option value="'+j(s)+'">'+j(i)+"</option>")),e!=n&&t.input.append(e),o.push(e),(e!=n||r>0)&&(e.selected=!0),e}t.input.querySelectorAll("option:checked").forEach((e=>{e.selected=!1})),0==t.items.length&&"single"==t.settings.mode?l(n,"",""):t.items.forEach((e=>{if(s=t.options[e],i=s[t.settings.labelField]||"",o.includes(s.$option)){l(t.input.querySelector(`option[value="${M(e)}"]:not(:checked)`),e,i)}else s.$option=l(s.$option,e,i)}))}else t.input.value=t.getValue()
t.isSetup&&(e.silent||t.trigger("change",t.getValue()))}open(){var e=this
e.isLocked||e.isOpen||"multi"===e.settings.mode&&e.isFull()||(e.isOpen=!0,se(e.focus_node,{"aria-expanded":"true"}),e.refreshState(),U(e.dropdown,{visibility:"hidden",display:"block"}),e.positionDropdown(),U(e.dropdown,{visibility:"visible",display:"block"}),e.focus(),e.trigger("dropdown_open",e.dropdown))}close(e=!0){var t=this,s=t.isOpen
e&&(t.setTextboxValue(),"single"===t.settings.mode&&t.items.length&&t.inputState()),t.isOpen=!1,se(t.focus_node,{"aria-expanded":"false"}),U(t.dropdown,{display:"none"}),t.settings.hideSelected&&t.clearActiveOption(),t.refreshState(),s&&t.trigger("dropdown_close",t.dropdown)}positionDropdown(){if("body"===this.settings.dropdownParent){var e=this.control,t=e.getBoundingClientRect(),s=e.offsetHeight+t.top+window.scrollY,i=t.left+window.scrollX
U(this.dropdown,{width:t.width+"px",top:s+"px",left:i+"px"})}}clear(e){var t=this
if(t.items.length){var s=t.controlChildren()
B(s,(e=>{t.removeItem(e,!0)})),t.inputState(),e||t.updateOriginalInput(),t.trigger("clear")}}insertAtCaret(e){const t=this,s=t.caretPos,i=t.control
i.insertBefore(e,i.children[s]||null),t.setCaret(s+1)}deleteSelection(e){var t,s,i,n,o,r=this
t=e&&8===e.keyCode?-1:1,s={start:(o=r.control_input).selectionStart||0,length:(o.selectionEnd||0)-(o.selectionStart||0)}
const l=[]
if(r.activeItems.length)n=ee(r.activeItems,t),i=te(n),t>0&&i++,B(r.activeItems,(e=>l.push(e)))
else if((r.isFocused||"single"===r.settings.mode)&&r.items.length){const e=r.controlChildren()
let i
t<0&&0===s.start&&0===s.length?i=e[r.caretPos-1]:t>0&&s.start===r.inputValue().length&&(i=e[r.caretPos]),void 0!==i&&l.push(i)}if(!r.shouldDelete(l,e))return!1
for(q(e,!0),void 0!==i&&r.setCaret(i);l.length;)r.removeItem(l.pop())
return r.inputState(),r.positionDropdown(),r.refreshOptions(!1),!0}shouldDelete(e,t){const s=e.map((e=>e.dataset.value))
return!(!s.length||"function"==typeof this.settings.onDelete&&!1===this.settings.onDelete(s,t))}advanceSelection(e,t){var s,i,n=this
n.rtl&&(e*=-1),n.inputValue().length||(H(oe,t)||H("shiftKey",t)?(i=(s=n.getLastActive(e))?s.classList.contains("active")?n.getAdjacent(s,e,"item"):s:e>0?n.control_input.nextElementSibling:n.control_input.previousElementSibling)&&(i.classList.contains("active")&&n.removeActiveItem(s),n.setActiveItemClass(i)):n.moveCaret(e))}moveCaret(e){}getLastActive(e){let t=this.control.querySelector(".last-active")
if(t)return t
var s=this.control.querySelectorAll(".active")
return s?ee(s,e):void 0}setCaret(e){this.caretPos=this.items.length}controlChildren(){return Array.from(this.control.querySelectorAll("[data-ts-item]"))}lock(){this.setLocked(!0)}unlock(){this.setLocked(!1)}setLocked(e=this.isReadOnly||this.isDisabled){this.isLocked=e,this.refreshState()}disable(){this.setDisabled(!0),this.close()}enable(){this.setDisabled(!1)}setDisabled(e){this.focus_node.tabIndex=e?-1:this.tabIndex,this.isDisabled=e,this.input.disabled=e,this.control_input.disabled=e,this.setLocked()}setReadOnly(e){this.isReadOnly=e,this.input.readOnly=e,this.control_input.readOnly=e,this.setLocked()}destroy(){var e=this,t=e.revertSettings
e.trigger("destroy"),e.off(),e.wrapper.remove(),e.dropdown.remove(),e.input.innerHTML=t.innerHTML,e.input.tabIndex=t.tabIndex,W(e.input,"tomselected","ts-hidden-accessible"),e._destroy(),delete e.input.tomselect}render(e,t){var s,i
const n=this
if("function"!=typeof this.settings.render[e])return null
if(!(i=n.settings.render[e].call(this,t,j)))return null
if(i=K(i),"option"===e||"option_create"===e?t[n.settings.disabledField]?se(i,{"aria-disabled":"true"}):se(i,{"data-selectable":""}):"optgroup"===e&&(s=t.group[n.settings.optgroupValueField],se(i,{"data-group":s}),t.group[n.settings.disabledField]&&se(i,{"data-disabled":""})),"option"===e||"item"===e){const s=N(t[n.settings.valueField])
se(i,{"data-value":s}),"item"===e?(J(i,n.settings.itemClass),se(i,{"data-ts-item":""})):(J(i,n.settings.optionClass),se(i,{role:"option",id:t.$id}),t.$div=i,n.options[s]=t)}return i}_render(e,t){const s=this.render(e,t)
if(null==s)throw"HTMLElement expected"
return s}clearCache(){B(this.options,(e=>{e.$div&&(e.$div.remove(),delete e.$div)}))}uncacheValue(e){const t=this.getOption(e)
t&&t.remove()}canCreate(e){return this.settings.create&&e.length>0&&this.settings.createFilter.call(this,e)}hook(e,t,s){var i=this,n=i[t]
i[t]=function(){var t,o
return"after"===e&&(t=n.apply(i,arguments)),o=s.apply(i,arguments),"instead"===e?o:("before"===e&&(t=n.apply(i,arguments)),t)}}}return ce.define("change_listener",(function(){D(this.input,"change",(()=>{this.sync()}))})),ce.define("checkbox_options",(function(e){var t=this,s=t.onOptionSelect
t.settings.hideSelected=!1
const i=Object.assign({className:"tomselect-checkbox",checkedClassNames:void 0,uncheckedClassNames:void 0},e)
var n=function(e,t){t?(e.checked=!0,i.uncheckedClassNames&&e.classList.remove(...i.uncheckedClassNames),i.checkedClassNames&&e.classList.add(...i.checkedClassNames)):(e.checked=!1,i.checkedClassNames&&e.classList.remove(...i.checkedClassNames),i.uncheckedClassNames&&e.classList.add(...i.uncheckedClassNames))},o=function(e){setTimeout((()=>{var t=e.querySelector("input."+i.className)
t instanceof HTMLInputElement&&n(t,e.classList.contains("selected"))}),1)}
t.hook("after","setupTemplates",(()=>{var e=t.settings.render.option
t.settings.render.option=(s,o)=>{var r=K(e.call(t,s,o)),l=document.createElement("input")
i.className&&l.classList.add(i.className),l.addEventListener("click",(function(e){q(e)})),l.type="checkbox"
const a=P(s[t.settings.valueField])
return n(l,!!(a&&t.items.indexOf(a)>-1)),r.prepend(l),r}})),t.on("item_remove",(e=>{var s=t.getOption(e)
s&&(s.classList.remove("selected"),o(s))})),t.on("item_add",(e=>{var s=t.getOption(e)
s&&o(s)})),t.hook("instead","onOptionSelect",((e,i)=>{if(i.classList.contains("selected"))return i.classList.remove("selected"),t.removeItem(i.dataset.value),t.refreshOptions(),void q(e,!0)
s.call(t,e,i),o(i)}))})),ce.define("clear_button",(function(e){const t=this,s=Object.assign({className:"clear-button",title:"Clear All",html:e=>`<div class="${e.className}" title="${e.title}">&#10799;</div>`},e)
t.on("initialize",(()=>{var e=K(s.html(s))
e.addEventListener("click",(e=>{t.isLocked||(t.clear(),"single"===t.settings.mode&&t.settings.allowEmptyOption&&t.addItem(""),e.preventDefault(),e.stopPropagation())})),t.control.appendChild(e)}))})),ce.define("drag_drop",(function(){var e=this
if("multi"!==e.settings.mode)return
var t=e.lock,s=e.unlock
let i,n=!0
e.hook("after","setupTemplates",(()=>{var t=e.settings.render.item
e.settings.render.item=(s,o)=>{const r=K(t.call(e,s,o))
se(r,{draggable:"true"})
const l=e=>{e.preventDefault(),r.classList.add("ts-drag-over"),a(r,i)},a=(e,t)=>{var s,i,n
void 0!==t&&(((e,t)=>{do{var s
if(e==(t=null==(s=t)?void 0:s.previousElementSibling))return!0}while(t&&t.previousElementSibling)
return!1})(t,r)?(i=t,null==(n=(s=e).parentNode)||n.insertBefore(i,s.nextSibling)):((e,t)=>{var s
null==(s=e.parentNode)||s.insertBefore(t,e)})(e,t))}
return D(r,"mousedown",(e=>{n||q(e),e.stopPropagation()})),D(r,"dragstart",(e=>{i=r,setTimeout((()=>{r.classList.add("ts-dragging")}),0)})),D(r,"dragenter",l),D(r,"dragover",l),D(r,"dragleave",(()=>{r.classList.remove("ts-drag-over")})),D(r,"dragend",(()=>{var t
document.querySelectorAll(".ts-drag-over").forEach((e=>e.classList.remove("ts-drag-over"))),null==(t=i)||t.classList.remove("ts-dragging"),i=void 0
var s=[]
e.control.querySelectorAll("[data-value]").forEach((e=>{if(e.dataset.value){let t=e.dataset.value
t&&s.push(t)}})),e.setValue(s)})),r}})),e.hook("instead","lock",(()=>(n=!1,t.call(e)))),e.hook("instead","unlock",(()=>(n=!0,s.call(e))))})),ce.define("dropdown_header",(function(e){const t=this,s=Object.assign({title:"Untitled",headerClass:"dropdown-header",titleRowClass:"dropdown-header-title",labelClass:"dropdown-header-label",closeClass:"dropdown-header-close",html:e=>'<div class="'+e.headerClass+'"><div class="'+e.titleRowClass+'"><span class="'+e.labelClass+'">'+e.title+'</span><a class="'+e.closeClass+'">&times;</a></div></div>'},e)
t.on("initialize",(()=>{var e=K(s.html(s)),i=e.querySelector("."+s.closeClass)
i&&i.addEventListener("click",(e=>{q(e,!0),t.close()})),t.dropdown.insertBefore(e,t.dropdown.firstChild)}))})),ce.define("caret_position",(function(){var e=this
e.hook("instead","setCaret",(t=>{"single"!==e.settings.mode&&e.control.contains(e.control_input)?(t=Math.max(0,Math.min(e.items.length,t)))==e.caretPos||e.isPending||e.controlChildren().forEach(((s,i)=>{i<t?e.control_input.insertAdjacentElement("beforebegin",s):e.control.appendChild(s)})):t=e.items.length,e.caretPos=t})),e.hook("instead","moveCaret",(t=>{if(!e.isFocused)return
const s=e.getLastActive(t)
if(s){const i=te(s)
e.setCaret(t>0?i+1:i),e.setActiveItem(),W(s,"last-active")}else e.setCaret(e.caretPos+t)}))})),ce.define("dropdown_input",(function(){const e=this
e.settings.shouldOpen=!0,e.hook("before","setup",(()=>{e.focus_node=e.control,J(e.control_input,"dropdown-input")
const t=K('<div class="dropdown-input-wrap">')
t.append(e.control_input),e.dropdown.insertBefore(t,e.dropdown.firstChild)
const s=K('<input class="items-placeholder" tabindex="-1" />')
s.placeholder=e.settings.placeholder||"",e.control.append(s)})),e.on("initialize",(()=>{e.control_input.addEventListener("keydown",(t=>{switch(t.keyCode){case 27:return e.isOpen&&(q(t,!0),e.close()),void e.clearActiveItems()
case 9:e.focus_node.tabIndex=-1}return e.onKeyDown.call(e,t)})),e.on("blur",(()=>{e.focus_node.tabIndex=e.isDisabled?-1:e.tabIndex})),e.on("dropdown_open",(()=>{e.control_input.focus()}))
const t=e.onBlur
e.hook("instead","onBlur",(s=>{if(!s||s.relatedTarget!=e.control_input)return t.call(e)})),D(e.control_input,"blur",(()=>e.onBlur())),e.hook("before","close",(()=>{e.isOpen&&e.focus_node.focus({preventScroll:!0})}))}))})),ce.define("input_autogrow",(function(){var e=this
e.on("initialize",(()=>{var t=document.createElement("span"),s=e.control_input
t.style.cssText="position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ",e.wrapper.appendChild(t)
for(const e of["letterSpacing","fontSize","fontFamily","fontWeight","textTransform"])t.style[e]=s.style[e]
var i=()=>{t.textContent=s.value,s.style.width=t.clientWidth+"px"}
i(),e.on("update item_add item_remove",i),D(s,"input",i),D(s,"keyup",i),D(s,"blur",i),D(s,"update",i)}))})),ce.define("no_backspace_delete",(function(){var e=this,t=e.deleteSelection
this.hook("instead","deleteSelection",(s=>!!e.activeItems.length&&t.call(e,s)))})),ce.define("no_active_items",(function(){this.hook("instead","setActiveItem",(()=>{})),this.hook("instead","selectAll",(()=>{}))})),ce.define("optgroup_columns",(function(){var e=this,t=e.onKeyDown
e.hook("instead","onKeyDown",(s=>{var i,n,o,r
if(!e.isOpen||37!==s.keyCode&&39!==s.keyCode)return t.call(e,s)
e.ignoreHover=!0,r=Z(e.activeOption,"[data-group]"),i=te(e.activeOption,"[data-selectable]"),r&&(r=37===s.keyCode?r.previousSibling:r.nextSibling)&&(n=(o=r.querySelectorAll("[data-selectable]"))[Math.min(o.length-1,i)])&&e.setActiveOption(n)}))})),ce.define("remove_button",(function(e){const t=Object.assign({label:"&times;",title:"Remove",className:"remove",append:!0},e)
var s=this
if(t.append){var i='<a href="javascript:void(0)" class="'+t.className+'" tabindex="-1" title="'+j(t.title)+'">'+t.label+"</a>"
s.hook("after","setupTemplates",(()=>{var e=s.settings.render.item
s.settings.render.item=(t,n)=>{var o=K(e.call(s,t,n)),r=K(i)
return o.appendChild(r),D(r,"mousedown",(e=>{q(e,!0)})),D(r,"click",(e=>{s.isLocked||(q(e,!0),s.isLocked||s.shouldDelete([o],e)&&(s.removeItem(o),s.refreshOptions(!1),s.inputState()))})),o}}))}})),ce.define("restore_on_backspace",(function(e){const t=this,s=Object.assign({text:e=>e[t.settings.labelField]},e)
t.on("item_remove",(function(e){if(t.isFocused&&""===t.control_input.value.trim()){var i=t.options[e]
i&&t.setTextboxValue(s.text.call(t,i))}}))})),ce.define("virtual_scroll",(function(){const e=this,t=e.canLoad,s=e.clearActiveOption,i=e.loadCallback
var n,o,r={},l=!1,a=[]
if(e.settings.shouldLoadMore||(e.settings.shouldLoadMore=()=>{if(n.clientHeight/(n.scrollHeight-n.scrollTop)>.9)return!0
if(e.activeOption){var t=e.selectable()
if(Array.from(t).indexOf(e.activeOption)>=t.length-2)return!0}return!1}),!e.settings.firstUrl)throw"virtual_scroll plugin requires a firstUrl() method"
e.settings.sortField=[{field:"$order"},{field:"$score"}]
const c=t=>!("number"==typeof e.settings.maxOptions&&n.children.length>=e.settings.maxOptions)&&!(!(t in r)||!r[t]),d=(t,s)=>e.items.indexOf(s)>=0||a.indexOf(s)>=0
e.setNextUrl=(e,t)=>{r[e]=t},e.getUrl=t=>{if(t in r){const e=r[t]
return r[t]=!1,e}return e.clearPagination(),e.settings.firstUrl.call(e,t)},e.clearPagination=()=>{r={}},e.hook("instead","clearActiveOption",(()=>{if(!l)return s.call(e)})),e.hook("instead","canLoad",(s=>s in r?c(s):t.call(e,s))),e.hook("instead","loadCallback",((t,s)=>{if(l){if(o){const s=t[0]
void 0!==s&&(o.dataset.value=s[e.settings.valueField])}}else e.clearOptions(d)
i.call(e,t,s),l=!1})),e.hook("after","refreshOptions",(()=>{const t=e.lastValue
var s
c(t)?(s=e.render("loading_more",{query:t}))&&(s.setAttribute("data-selectable",""),o=s):t in r&&!n.querySelector(".no-results")&&(s=e.render("no_more_results",{query:t})),s&&(J(s,e.settings.optionClass),n.append(s))})),e.on("initialize",(()=>{a=Object.keys(e.options),n=e.dropdown_content,e.settings.render=Object.assign({},{loading_more:()=>'<div class="loading-more-results">Loading more results ... </div>',no_more_results:()=>'<div class="no-more-results">No more results</div>'},e.settings.render),n.addEventListener("scroll",(()=>{e.settings.shouldLoadMore.call(e)&&c(e.lastValue)&&(l||(l=!0,e.load.call(e,e.lastValue)))}))}))})),ce}))
var tomSelect=function(e,t){return new TomSelect(e,t)}
//# sourceMappingURL=tom-select.complete.min.js.map
