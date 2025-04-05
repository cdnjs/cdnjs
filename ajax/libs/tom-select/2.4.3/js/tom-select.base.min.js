/**
* Tom Select v2.4.3
* Licensed under the Apache License, Version 2.0 (the "License");
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).TomSelect=e()}(this,(function(){"use strict"
function t(t,e){t.split(/\s+/).forEach((t=>{e(t)}))}class e{constructor(){this._events={}}on(e,i){t(e,(t=>{const e=this._events[t]||[]
e.push(i),this._events[t]=e}))}off(e,i){var s=arguments.length
0!==s?t(e,(t=>{if(1===s)return void delete this._events[t]
const e=this._events[t]
void 0!==e&&(e.splice(e.indexOf(i),1),this._events[t]=e)})):this._events={}}trigger(e,...i){var s=this
t(e,(t=>{const e=s._events[t]
void 0!==e&&e.forEach((t=>{t.apply(s,i)}))}))}}const i=t=>(t=t.filter(Boolean)).length<2?t[0]||"":1==l(t)?"["+t.join("")+"]":"(?:"+t.join("|")+")",s=t=>{if(!o(t))return t.join("")
let e="",i=0
const s=()=>{i>1&&(e+="{"+i+"}")}
return t.forEach(((n,o)=>{n!==t[o-1]?(s(),e+=n,i=1):i++})),s(),e},n=t=>{let e=Array.from(t)
return i(e)},o=t=>new Set(t).size!==t.length,r=t=>(t+"").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu,"\\$1"),l=t=>t.reduce(((t,e)=>Math.max(t,a(e))),0),a=t=>Array.from(t).length,c=t=>{if(1===t.length)return[[t]]
let e=[]
const i=t.substring(1)
return c(i).forEach((function(i){let s=i.slice(0)
s[0]=t.charAt(0)+s[0],e.push(s),s=i.slice(0),s.unshift(t.charAt(0)),e.push(s)})),e},d=[[0,65535]]
let u,p
const h={},g={"/":"⁄∕",0:"߀",a:"ⱥɐɑ",aa:"ꜳ",ae:"æǽǣ",ao:"ꜵ",au:"ꜷ",av:"ꜹꜻ",ay:"ꜽ",b:"ƀɓƃ",c:"ꜿƈȼↄ",d:"đɗɖᴅƌꮷԁɦ",e:"ɛǝᴇɇ",f:"ꝼƒ",g:"ǥɠꞡᵹꝿɢ",h:"ħⱨⱶɥ",i:"ɨı",j:"ɉȷ",k:"ƙⱪꝁꝃꝅꞣ",l:"łƚɫⱡꝉꝇꞁɭ",m:"ɱɯϻ",n:"ꞥƞɲꞑᴎлԉ",o:"øǿɔɵꝋꝍᴑ",oe:"œ",oi:"ƣ",oo:"ꝏ",ou:"ȣ",p:"ƥᵽꝑꝓꝕρ",q:"ꝗꝙɋ",r:"ɍɽꝛꞧꞃ",s:"ßȿꞩꞅʂ",t:"ŧƭʈⱦꞇ",th:"þ",tz:"ꜩ",u:"ʉ",v:"ʋꝟʌ",vy:"ꝡ",w:"ⱳ",y:"ƴɏỿ",z:"ƶȥɀⱬꝣ",hv:"ƕ"}
for(let t in g){let e=g[t]||""
for(let i=0;i<e.length;i++){let s=e.substring(i,i+1)
h[s]=t}}const f=new RegExp(Object.keys(h).join("|")+"|[̀-ͯ·ʾʼ]","gu"),m=(t,e="NFKD")=>t.normalize(e),v=t=>Array.from(t).reduce(((t,e)=>t+y(e)),""),y=t=>(t=m(t).toLowerCase().replace(f,(t=>h[t]||"")),m(t,"NFC"))
const O=t=>{const e={},i=(t,i)=>{const s=e[t]||new Set,o=new RegExp("^"+n(s)+"$","iu")
i.match(o)||(s.add(r(i)),e[t]=s)}
for(let e of function*(t){for(const[e,i]of t)for(let t=e;t<=i;t++){let e=String.fromCharCode(t),i=v(e)
i!=e.toLowerCase()&&(i.length>3||0!=i.length&&(yield{folded:i,composed:e,code_point:t}))}}(t))i(e.folded,e.folded),i(e.folded,e.composed)
return e},b=t=>{const e=O(t),s={}
let o=[]
for(let t in e){let i=e[t]
i&&(s[t]=n(i)),t.length>1&&o.push(r(t))}o.sort(((t,e)=>e.length-t.length))
const l=i(o)
return p=new RegExp("^"+l,"u"),s},w=(t,e=1)=>(e=Math.max(e,t.length-1),i(c(t).map((t=>((t,e=1)=>{let i=0
return t=t.map((t=>(u[t]&&(i+=t.length),u[t]||t))),i>=e?s(t):""})(t,e))))),I=(t,e=!0)=>{let n=t.length>1?1:0
return i(t.map((t=>{let i=[]
const o=e?t.length():t.length()-1
for(let e=0;e<o;e++)i.push(w(t.substrs[e]||"",n))
return s(i)})))},S=(t,e)=>{for(const i of e){if(i.start!=t.start||i.end!=t.end)continue
if(i.substrs.join("")!==t.substrs.join(""))continue
let e=t.parts
const s=t=>{for(const i of e){if(i.start===t.start&&i.substr===t.substr)return!1
if(1!=t.length&&1!=i.length){if(t.start<i.start&&t.end>i.start)return!0
if(i.start<t.start&&i.end>t.start)return!0}}return!1}
if(!(i.parts.filter(s).length>0))return!0}return!1}
class A{parts
substrs
start
end
constructor(){this.parts=[],this.substrs=[],this.start=0,this.end=0}add(t){t&&(this.parts.push(t),this.substrs.push(t.substr),this.start=Math.min(t.start,this.start),this.end=Math.max(t.end,this.end))}last(){return this.parts[this.parts.length-1]}length(){return this.parts.length}clone(t,e){let i=new A,s=JSON.parse(JSON.stringify(this.parts)),n=s.pop()
for(const t of s)i.add(t)
let o=e.substr.substring(0,t-n.start),r=o.length
return i.add({start:n.start,end:n.start+r,length:r,substr:o}),i}}const _=t=>{void 0===u&&(u=b(d)),t=v(t)
let e="",i=[new A]
for(let s=0;s<t.length;s++){let n=t.substring(s).match(p)
const o=t.substring(s,s+1),r=n?n[0]:null
let l=[],a=new Set
for(const t of i){const e=t.last()
if(!e||1==e.length||e.end<=s)if(r){const e=r.length
t.add({start:s,end:s+e,length:e,substr:r}),a.add("1")}else t.add({start:s,end:s+1,length:1,substr:o}),a.add("2")
else if(r){let i=t.clone(s,e)
const n=r.length
i.add({start:s,end:s+n,length:n,substr:r}),l.push(i)}else a.add("3")}if(l.length>0){l=l.sort(((t,e)=>t.length()-e.length()))
for(let t of l)S(t,i)||i.push(t)}else if(s>0&&1==a.size&&!a.has("3")){e+=I(i,!1)
let t=new A
const s=i[0]
s&&t.add(s.last()),i=[t]}}return e+=I(i,!0),e},C=(t,e)=>{if(t)return t[e]},F=(t,e)=>{if(t){for(var i,s=e.split(".");(i=s.shift())&&(t=t[i]););return t}},x=(t,e,i)=>{var s,n
return t?(t+="",null==e.regex||-1===(n=t.search(e.regex))?0:(s=e.string.length/t.length,0===n&&(s+=.5),s*i)):0},L=(t,e)=>{var i=t[e]
if("function"==typeof i)return i
i&&!Array.isArray(i)&&(t[e]=[i])},k=(t,e)=>{if(Array.isArray(t))t.forEach(e)
else for(var i in t)t.hasOwnProperty(i)&&e(t[i],i)},E=(t,e)=>"number"==typeof t&&"number"==typeof e?t>e?1:t<e?-1:0:(t=v(t+"").toLowerCase())>(e=v(e+"").toLowerCase())?1:e>t?-1:0
class T{items
settings
constructor(t,e){this.items=t,this.settings=e||{diacritics:!0}}tokenize(t,e,i){if(!t||!t.length)return[]
const s=[],n=t.split(/\s+/)
var o
return i&&(o=new RegExp("^("+Object.keys(i).map(r).join("|")+"):(.*)$")),n.forEach((t=>{let i,n=null,l=null
o&&(i=t.match(o))&&(n=i[1],t=i[2]),t.length>0&&(l=this.settings.diacritics?_(t)||null:r(t),l&&e&&(l="\\b"+l)),s.push({string:t,regex:l?new RegExp(l,"iu"):null,field:n})})),s}getScoreFunction(t,e){var i=this.prepareSearch(t,e)
return this._getScoreFunction(i)}_getScoreFunction(t){const e=t.tokens,i=e.length
if(!i)return function(){return 0}
const s=t.options.fields,n=t.weights,o=s.length,r=t.getAttrFn
if(!o)return function(){return 1}
const l=1===o?function(t,e){const i=s[0].field
return x(r(e,i),t,n[i]||1)}:function(t,e){var i=0
if(t.field){const s=r(e,t.field)
!t.regex&&s?i+=1/o:i+=x(s,t,1)}else k(n,((s,n)=>{i+=x(r(e,n),t,s)}))
return i/o}
return 1===i?function(t){return l(e[0],t)}:"and"===t.options.conjunction?function(t){var s,n=0
for(let i of e){if((s=l(i,t))<=0)return 0
n+=s}return n/i}:function(t){var s=0
return k(e,(e=>{s+=l(e,t)})),s/i}}getSortFunction(t,e){var i=this.prepareSearch(t,e)
return this._getSortFunction(i)}_getSortFunction(t){var e,i=[]
const s=this,n=t.options,o=!t.query&&n.sort_empty?n.sort_empty:n.sort
if("function"==typeof o)return o.bind(this)
const r=function(e,i){return"$score"===e?i.score:t.getAttrFn(s.items[i.id],e)}
if(o)for(let e of o)(t.query||"$score"!==e.field)&&i.push(e)
if(t.query){e=!0
for(let t of i)if("$score"===t.field){e=!1
break}e&&i.unshift({field:"$score",direction:"desc"})}else i=i.filter((t=>"$score"!==t.field))
return i.length?function(t,e){var s,n
for(let o of i){if(n=o.field,s=("desc"===o.direction?-1:1)*E(r(n,t),r(n,e)))return s}return 0}:null}prepareSearch(t,e){const i={}
var s=Object.assign({},e)
if(L(s,"sort"),L(s,"sort_empty"),s.fields){L(s,"fields")
const t=[]
s.fields.forEach((e=>{"string"==typeof e&&(e={field:e,weight:1}),t.push(e),i[e.field]="weight"in e?e.weight:1})),s.fields=t}return{options:s,query:t.toLowerCase().trim(),tokens:this.tokenize(t,s.respect_word_boundaries,i),total:0,items:[],weights:i,getAttrFn:s.nesting?F:C}}search(t,e){var i,s,n=this
s=this.prepareSearch(t,e),e=s.options,t=s.query
const o=e.score||n._getScoreFunction(s)
t.length?k(n.items,((t,n)=>{i=o(t),(!1===e.filter||i>0)&&s.items.push({score:i,id:n})})):k(n.items,((t,e)=>{s.items.push({score:1,id:e})}))
const r=n._getSortFunction(s)
return r&&s.items.sort(r),s.total=s.items.length,"number"==typeof e.limit&&(s.items=s.items.slice(0,e.limit)),s}}const P=t=>null==t?null:$(t),$=t=>"boolean"==typeof t?t?"1":"0":t+"",V=t=>(t+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),j=(t,e)=>{var i
return function(s,n){var o=this
i&&(o.loading=Math.max(o.loading-1,0),clearTimeout(i)),i=setTimeout((function(){i=null,o.loadedSearches[s]=!0,t.call(o,s,n)}),e)}},q=(t,e,i)=>{var s,n=t.trigger,o={}
for(s of(t.trigger=function(){var i=arguments[0]
if(-1===e.indexOf(i))return n.apply(t,arguments)
o[i]=arguments},i.apply(t,[]),t.trigger=n,e))s in o&&n.apply(t,o[s])},D=(t,e=!1)=>{t&&(t.preventDefault(),e&&t.stopPropagation())},R=(t,e,i,s)=>{t.addEventListener(e,i,s)},H=(t,e)=>!!e&&(!!e[t]&&1===(e.altKey?1:0)+(e.ctrlKey?1:0)+(e.shiftKey?1:0)+(e.metaKey?1:0)),N=(t,e)=>{const i=t.getAttribute("id")
return i||(t.setAttribute("id",e),e)},M=t=>t.replace(/[\\"']/g,"\\$&"),z=(t,e)=>{e&&t.append(e)},B=(t,e)=>{if(Array.isArray(t))t.forEach(e)
else for(var i in t)t.hasOwnProperty(i)&&e(t[i],i)},K=t=>{if(t.jquery)return t[0]
if(t instanceof HTMLElement)return t
if(Q(t)){var e=document.createElement("template")
return e.innerHTML=t.trim(),e.content.firstChild}return document.querySelector(t)},Q=t=>"string"==typeof t&&t.indexOf("<")>-1,G=(t,e)=>{var i=document.createEvent("HTMLEvents")
i.initEvent(e,!0,!1),t.dispatchEvent(i)},J=(t,e)=>{Object.assign(t.style,e)},U=(t,...e)=>{var i=X(e);(t=Y(t)).map((t=>{i.map((e=>{t.classList.add(e)}))}))},W=(t,...e)=>{var i=X(e);(t=Y(t)).map((t=>{i.map((e=>{t.classList.remove(e)}))}))},X=t=>{var e=[]
return B(t,(t=>{"string"==typeof t&&(t=t.trim().split(/[\t\n\f\r\s]/)),Array.isArray(t)&&(e=e.concat(t))})),e.filter(Boolean)},Y=t=>(Array.isArray(t)||(t=[t]),t),Z=(t,e,i)=>{if(!i||i.contains(t))for(;t&&t.matches;){if(t.matches(e))return t
t=t.parentNode}},tt=(t,e=0)=>e>0?t[t.length-1]:t[0],et=(t,e)=>{if(!t)return-1
e=e||t.nodeName
for(var i=0;t=t.previousElementSibling;)t.matches(e)&&i++
return i},it=(t,e)=>{B(e,((e,i)=>{null==e?t.removeAttribute(i):t.setAttribute(i,""+e)}))},st=(t,e)=>{t.parentNode&&t.parentNode.replaceChild(e,t)},nt=(t,e)=>{if(null===e)return
if("string"==typeof e){if(!e.length)return
e=new RegExp(e,"i")}const i=t=>3===t.nodeType?(t=>{var i=t.data.match(e)
if(i&&t.data.length>0){var s=document.createElement("span")
s.className="highlight"
var n=t.splitText(i.index)
n.splitText(i[0].length)
var o=n.cloneNode(!0)
return s.appendChild(o),st(n,s),1}return 0})(t):((t=>{1!==t.nodeType||!t.childNodes||/(script|style)/i.test(t.tagName)||"highlight"===t.className&&"SPAN"===t.tagName||Array.from(t.childNodes).forEach((t=>{i(t)}))})(t),0)
i(t)},ot="undefined"!=typeof navigator&&/Mac/.test(navigator.userAgent)?"metaKey":"ctrlKey"
var rt={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:null,createOnBlur:!1,createFilter:null,highlight:!0,openOnFocus:!0,shouldOpen:null,maxOptions:50,maxItems:null,hideSelected:null,duplicates:!1,addPrecedence:!1,selectOnTab:!1,preload:null,allowEmptyOption:!1,refreshThrottle:300,loadThrottle:300,loadingClass:"loading",dataAttr:null,optgroupField:"optgroup",valueField:"value",labelField:"text",disabledField:"disabled",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"ts-wrapper",controlClass:"ts-control",dropdownClass:"ts-dropdown",dropdownContentClass:"ts-dropdown-content",itemClass:"item",optionClass:"option",dropdownParent:null,controlInput:'<input type="text" autocomplete="off" size="1" />',copyClassesToDropdown:!1,placeholder:null,hidePlaceholder:null,shouldLoad:function(t){return t.length>0},render:{}}
function lt(t,e){var i=Object.assign({},rt,e),s=i.dataAttr,n=i.labelField,o=i.valueField,r=i.disabledField,l=i.optgroupField,a=i.optgroupLabelField,c=i.optgroupValueField,d=t.tagName.toLowerCase(),u=t.getAttribute("placeholder")||t.getAttribute("data-placeholder")
if(!u&&!i.allowEmptyOption){let e=t.querySelector('option[value=""]')
e&&(u=e.textContent)}var p={placeholder:u,options:[],optgroups:[],items:[],maxItems:null}
return"select"===d?(()=>{var e,d=p.options,u={},h=1
let g=0
var f=t=>{var e=Object.assign({},t.dataset),i=s&&e[s]
return"string"==typeof i&&i.length&&(e=Object.assign(e,JSON.parse(i))),e},m=(t,e)=>{var s=P(t.value)
if(null!=s&&(s||i.allowEmptyOption)){if(u.hasOwnProperty(s)){if(e){var a=u[s][l]
a?Array.isArray(a)?a.push(e):u[s][l]=[a,e]:u[s][l]=e}}else{var c=f(t)
c[n]=c[n]||t.textContent,c[o]=c[o]||s,c[r]=c[r]||t.disabled,c[l]=c[l]||e,c.$option=t,c.$order=c.$order||++g,u[s]=c,d.push(c)}t.selected&&p.items.push(s)}}
p.maxItems=t.hasAttribute("multiple")?null:1,B(t.children,(t=>{var i,s,n
"optgroup"===(e=t.tagName.toLowerCase())?((n=f(i=t))[a]=n[a]||i.getAttribute("label")||"",n[c]=n[c]||h++,n[r]=n[r]||i.disabled,n.$order=n.$order||++g,p.optgroups.push(n),s=n[c],B(i.children,(t=>{m(t,s)}))):"option"===e&&m(t)}))})():(()=>{const e=t.getAttribute(s)
if(e)p.options=JSON.parse(e),B(p.options,(t=>{p.items.push(t[o])}))
else{var r=t.value.trim()||""
if(!i.allowEmptyOption&&!r.length)return
const e=r.split(i.delimiter)
B(e,(t=>{const e={}
e[n]=t,e[o]=t,p.options.push(e)})),p.items=e}})(),Object.assign({},rt,p,e)}var at=0
class ct extends(function(t){return t.plugins={},class extends t{constructor(...t){super(...t),this.plugins={names:[],settings:{},requested:{},loaded:{}}}static define(e,i){t.plugins[e]={name:e,fn:i}}initializePlugins(t){var e,i
const s=this,n=[]
if(Array.isArray(t))t.forEach((t=>{"string"==typeof t?n.push(t):(s.plugins.settings[t.name]=t.options,n.push(t.name))}))
else if(t)for(e in t)t.hasOwnProperty(e)&&(s.plugins.settings[e]=t[e],n.push(e))
for(;i=n.shift();)s.require(i)}loadPlugin(e){var i=this,s=i.plugins,n=t.plugins[e]
if(!t.plugins.hasOwnProperty(e))throw new Error('Unable to find "'+e+'" plugin')
s.requested[e]=!0,s.loaded[e]=n.fn.apply(i,[i.plugins.settings[e]||{}]),s.names.push(e)}require(t){var e=this,i=e.plugins
if(!e.plugins.loaded.hasOwnProperty(t)){if(i.requested[t])throw new Error('Plugin has circular dependency ("'+t+'")')
e.loadPlugin(t)}return i.loaded[t]}}}(e)){constructor(t,e){var i
super(),this.order=0,this.isOpen=!1,this.isDisabled=!1,this.isReadOnly=!1,this.isInvalid=!1,this.isValid=!0,this.isLocked=!1,this.isFocused=!1,this.isInputHidden=!1,this.isSetup=!1,this.ignoreFocus=!1,this.ignoreHover=!1,this.hasOptions=!1,this.lastValue="",this.caretPos=0,this.loading=0,this.loadedSearches={},this.activeOption=null,this.activeItems=[],this.optgroups={},this.options={},this.userOptions={},this.items=[],this.refreshTimeout=null,at++
var s=K(t)
if(s.tomselect)throw new Error("Tom Select already initialized on this element")
s.tomselect=this,i=(window.getComputedStyle&&window.getComputedStyle(s,null)).getPropertyValue("direction")
const n=lt(s,e)
this.settings=n,this.input=s,this.tabIndex=s.tabIndex||0,this.is_select_tag="select"===s.tagName.toLowerCase(),this.rtl=/rtl/i.test(i),this.inputId=N(s,"tomselect-"+at),this.isRequired=s.required,this.sifter=new T(this.options,{diacritics:n.diacritics}),n.mode=n.mode||(1===n.maxItems?"single":"multi"),"boolean"!=typeof n.hideSelected&&(n.hideSelected="multi"===n.mode),"boolean"!=typeof n.hidePlaceholder&&(n.hidePlaceholder="multi"!==n.mode)
var o=n.createFilter
"function"!=typeof o&&("string"==typeof o&&(o=new RegExp(o)),o instanceof RegExp?n.createFilter=t=>o.test(t):n.createFilter=t=>this.settings.duplicates||!this.options[t]),this.initializePlugins(n.plugins),this.setupCallbacks(),this.setupTemplates()
const r=K("<div>"),l=K("<div>"),a=this._render("dropdown"),c=K('<div role="listbox" tabindex="-1">'),d=this.input.getAttribute("class")||"",u=n.mode
var p
if(U(r,n.wrapperClass,d,u),U(l,n.controlClass),z(r,l),U(a,n.dropdownClass,u),n.copyClassesToDropdown&&U(a,d),U(c,n.dropdownContentClass),z(a,c),K(n.dropdownParent||r).appendChild(a),Q(n.controlInput)){p=K(n.controlInput)
B(["autocorrect","autocapitalize","autocomplete","spellcheck"],(t=>{s.getAttribute(t)&&it(p,{[t]:s.getAttribute(t)})})),p.tabIndex=-1,l.appendChild(p),this.focus_node=p}else n.controlInput?(p=K(n.controlInput),this.focus_node=p):(p=K("<input/>"),this.focus_node=l)
this.wrapper=r,this.dropdown=a,this.dropdown_content=c,this.control=l,this.control_input=p,this.setup()}setup(){const t=this,e=t.settings,i=t.control_input,s=t.dropdown,n=t.dropdown_content,o=t.wrapper,l=t.control,a=t.input,c=t.focus_node,d={passive:!0},u=t.inputId+"-ts-dropdown"
it(n,{id:u}),it(c,{role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-controls":u})
const p=N(c,t.inputId+"-ts-control"),h="label[for='"+(t=>t.replace(/['"\\]/g,"\\$&"))(t.inputId)+"']",g=document.querySelector(h),f=t.focus.bind(t)
if(g){R(g,"click",f),it(g,{for:p})
const e=N(g,t.inputId+"-ts-label")
it(c,{"aria-labelledby":e}),it(n,{"aria-labelledby":e})}if(o.style.width=a.style.width,t.plugins.names.length){const e="plugin-"+t.plugins.names.join(" plugin-")
U([o,s],e)}(null===e.maxItems||e.maxItems>1)&&t.is_select_tag&&it(a,{multiple:"multiple"}),e.placeholder&&it(i,{placeholder:e.placeholder}),!e.splitOn&&e.delimiter&&(e.splitOn=new RegExp("\\s*"+r(e.delimiter)+"+\\s*")),e.load&&e.loadThrottle&&(e.load=j(e.load,e.loadThrottle)),R(s,"mousemove",(()=>{t.ignoreHover=!1})),R(s,"mouseenter",(e=>{var i=Z(e.target,"[data-selectable]",s)
i&&t.onOptionHover(e,i)}),{capture:!0}),R(s,"click",(e=>{const i=Z(e.target,"[data-selectable]")
i&&(t.onOptionSelect(e,i),D(e,!0))})),R(l,"click",(e=>{var s=Z(e.target,"[data-ts-item]",l)
s&&t.onItemSelect(e,s)?D(e,!0):""==i.value&&(t.onClick(),D(e,!0))})),R(c,"keydown",(e=>t.onKeyDown(e))),R(i,"keypress",(e=>t.onKeyPress(e))),R(i,"input",(e=>t.onInput(e))),R(c,"blur",(e=>t.onBlur(e))),R(c,"focus",(e=>t.onFocus(e))),R(i,"paste",(e=>t.onPaste(e)))
const m=e=>{const n=e.composedPath()[0]
if(!o.contains(n)&&!s.contains(n))return t.isFocused&&t.blur(),void t.inputState()
n==i&&t.isOpen?e.stopPropagation():D(e,!0)},v=()=>{t.isOpen&&t.positionDropdown()}
R(document,"mousedown",m),R(window,"scroll",v,d),R(window,"resize",v,d),this._destroy=()=>{document.removeEventListener("mousedown",m),window.removeEventListener("scroll",v),window.removeEventListener("resize",v),g&&g.removeEventListener("click",f)},this.revertSettings={innerHTML:a.innerHTML,tabIndex:a.tabIndex},a.tabIndex=-1,a.insertAdjacentElement("afterend",t.wrapper),t.sync(!1),e.items=[],delete e.optgroups,delete e.options,R(a,"invalid",(()=>{t.isValid&&(t.isValid=!1,t.isInvalid=!0,t.refreshState())})),t.updateOriginalInput(),t.refreshItems(),t.close(!1),t.inputState(),t.isSetup=!0,a.disabled?t.disable():a.readOnly?t.setReadOnly(!0):t.enable(),t.on("change",this.onChange),U(a,"tomselected","ts-hidden-accessible"),t.trigger("initialize"),!0===e.preload&&t.preload()}setupOptions(t=[],e=[]){this.addOptions(t),B(e,(t=>{this.registerOptionGroup(t)}))}setupTemplates(){var t=this,e=t.settings.labelField,i=t.settings.optgroupLabelField,s={optgroup:t=>{let e=document.createElement("div")
return e.className="optgroup",e.appendChild(t.options),e},optgroup_header:(t,e)=>'<div class="optgroup-header">'+e(t[i])+"</div>",option:(t,i)=>"<div>"+i(t[e])+"</div>",item:(t,i)=>"<div>"+i(t[e])+"</div>",option_create:(t,e)=>'<div class="create">Add <strong>'+e(t.input)+"</strong>&hellip;</div>",no_results:()=>'<div class="no-results">No results found</div>',loading:()=>'<div class="spinner"></div>',not_loading:()=>{},dropdown:()=>"<div></div>"}
t.settings.render=Object.assign({},s,t.settings.render)}setupCallbacks(){var t,e,i={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",item_select:"onItemSelect",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"}
for(t in i)(e=this.settings[i[t]])&&this.on(t,e)}sync(t=!0){const e=this,i=t?lt(e.input,{delimiter:e.settings.delimiter}):e.settings
e.setupOptions(i.options,i.optgroups),e.setValue(i.items||[],!0),e.lastQuery=null}onClick(){var t=this
if(t.activeItems.length>0)return t.clearActiveItems(),void t.focus()
t.isFocused&&t.isOpen?t.blur():t.focus()}onMouseDown(){}onChange(){G(this.input,"input"),G(this.input,"change")}onPaste(t){var e=this
e.isInputHidden||e.isLocked?D(t):e.settings.splitOn&&setTimeout((()=>{var t=e.inputValue()
if(t.match(e.settings.splitOn)){var i=t.trim().split(e.settings.splitOn)
B(i,(t=>{P(t)&&(this.options[t]?e.addItem(t):e.createItem(t))}))}}),0)}onKeyPress(t){var e=this
if(!e.isLocked){var i=String.fromCharCode(t.keyCode||t.which)
return e.settings.create&&"multi"===e.settings.mode&&i===e.settings.delimiter?(e.createItem(),void D(t)):void 0}D(t)}onKeyDown(t){var e=this
if(e.ignoreHover=!0,e.isLocked)9!==t.keyCode&&D(t)
else{switch(t.keyCode){case 65:if(H(ot,t)&&""==e.control_input.value)return D(t),void e.selectAll()
break
case 27:return e.isOpen&&(D(t,!0),e.close()),void e.clearActiveItems()
case 40:if(!e.isOpen&&e.hasOptions)e.open()
else if(e.activeOption){let t=e.getAdjacent(e.activeOption,1)
t&&e.setActiveOption(t)}return void D(t)
case 38:if(e.activeOption){let t=e.getAdjacent(e.activeOption,-1)
t&&e.setActiveOption(t)}return void D(t)
case 13:return void(e.canSelect(e.activeOption)?(e.onOptionSelect(t,e.activeOption),D(t)):(e.settings.create&&e.createItem()||document.activeElement==e.control_input&&e.isOpen)&&D(t))
case 37:return void e.advanceSelection(-1,t)
case 39:return void e.advanceSelection(1,t)
case 9:return void(e.settings.selectOnTab&&(e.canSelect(e.activeOption)&&(e.onOptionSelect(t,e.activeOption),D(t)),e.settings.create&&e.createItem()&&D(t)))
case 8:case 46:return void e.deleteSelection(t)}e.isInputHidden&&!H(ot,t)&&D(t)}}onInput(t){if(this.isLocked)return
const e=this.inputValue()
this.lastValue!==e&&(this.lastValue=e,""!=e?(this.refreshTimeout&&window.clearTimeout(this.refreshTimeout),this.refreshTimeout=((t,e)=>e>0?window.setTimeout(t,e):(t.call(null),null))((()=>{this.refreshTimeout=null,this._onInput()}),this.settings.refreshThrottle)):this._onInput())}_onInput(){const t=this.lastValue
this.settings.shouldLoad.call(this,t)&&this.load(t),this.refreshOptions(),this.trigger("type",t)}onOptionHover(t,e){this.ignoreHover||this.setActiveOption(e,!1)}onFocus(t){var e=this,i=e.isFocused
if(e.isDisabled||e.isReadOnly)return e.blur(),void D(t)
e.ignoreFocus||(e.isFocused=!0,"focus"===e.settings.preload&&e.preload(),i||e.trigger("focus"),e.activeItems.length||(e.inputState(),e.refreshOptions(!!e.settings.openOnFocus)),e.refreshState())}onBlur(t){if(!1!==document.hasFocus()){var e=this
if(e.isFocused){e.isFocused=!1,e.ignoreFocus=!1
var i=()=>{e.close(),e.setActiveItem(),e.setCaret(e.items.length),e.trigger("blur")}
e.settings.create&&e.settings.createOnBlur?e.createItem(null,i):i()}}}onOptionSelect(t,e){var i,s=this
e.parentElement&&e.parentElement.matches("[data-disabled]")||(e.classList.contains("create")?s.createItem(null,(()=>{s.settings.closeAfterSelect&&s.close()})):void 0!==(i=e.dataset.value)&&(s.lastQuery=null,s.addItem(i),s.settings.closeAfterSelect&&s.close(),!s.settings.hideSelected&&t.type&&/click/.test(t.type)&&s.setActiveOption(e)))}canSelect(t){return!!(this.isOpen&&t&&this.dropdown_content.contains(t))}onItemSelect(t,e){var i=this
return!i.isLocked&&"multi"===i.settings.mode&&(D(t),i.setActiveItem(e,t),!0)}canLoad(t){return!!this.settings.load&&!this.loadedSearches.hasOwnProperty(t)}load(t){const e=this
if(!e.canLoad(t))return
U(e.wrapper,e.settings.loadingClass),e.loading++
const i=e.loadCallback.bind(e)
e.settings.load.call(e,t,i)}loadCallback(t,e){const i=this
i.loading=Math.max(i.loading-1,0),i.lastQuery=null,i.clearActiveOption(),i.setupOptions(t,e),i.refreshOptions(i.isFocused&&!i.isInputHidden),i.loading||W(i.wrapper,i.settings.loadingClass),i.trigger("load",t,e)}preload(){var t=this.wrapper.classList
t.contains("preloaded")||(t.add("preloaded"),this.load(""))}setTextboxValue(t=""){var e=this.control_input
e.value!==t&&(e.value=t,G(e,"update"),this.lastValue=t)}getValue(){return this.is_select_tag&&this.input.hasAttribute("multiple")?this.items:this.items.join(this.settings.delimiter)}setValue(t,e){q(this,e?[]:["change"],(()=>{this.clear(e),this.addItems(t,e)}))}setMaxItems(t){0===t&&(t=null),this.settings.maxItems=t,this.refreshState()}setActiveItem(t,e){var i,s,n,o,r,l,a=this
if("single"!==a.settings.mode){if(!t)return a.clearActiveItems(),void(a.isFocused&&a.inputState())
if("click"===(i=e&&e.type.toLowerCase())&&H("shiftKey",e)&&a.activeItems.length){for(l=a.getLastActive(),(n=Array.prototype.indexOf.call(a.control.children,l))>(o=Array.prototype.indexOf.call(a.control.children,t))&&(r=n,n=o,o=r),s=n;s<=o;s++)t=a.control.children[s],-1===a.activeItems.indexOf(t)&&a.setActiveItemClass(t)
D(e)}else"click"===i&&H(ot,e)||"keydown"===i&&H("shiftKey",e)?t.classList.contains("active")?a.removeActiveItem(t):a.setActiveItemClass(t):(a.clearActiveItems(),a.setActiveItemClass(t))
a.inputState(),a.isFocused||a.focus()}}setActiveItemClass(t){const e=this,i=e.control.querySelector(".last-active")
i&&W(i,"last-active"),U(t,"active last-active"),e.trigger("item_select",t),-1==e.activeItems.indexOf(t)&&e.activeItems.push(t)}removeActiveItem(t){var e=this.activeItems.indexOf(t)
this.activeItems.splice(e,1),W(t,"active")}clearActiveItems(){W(this.activeItems,"active"),this.activeItems=[]}setActiveOption(t,e=!0){t!==this.activeOption&&(this.clearActiveOption(),t&&(this.activeOption=t,it(this.focus_node,{"aria-activedescendant":t.getAttribute("id")}),it(t,{"aria-selected":"true"}),U(t,"active"),e&&this.scrollToOption(t)))}scrollToOption(t,e){if(!t)return
const i=this.dropdown_content,s=i.clientHeight,n=i.scrollTop||0,o=t.offsetHeight,r=t.getBoundingClientRect().top-i.getBoundingClientRect().top+n
r+o>s+n?this.scroll(r-s+o,e):r<n&&this.scroll(r,e)}scroll(t,e){const i=this.dropdown_content
e&&(i.style.scrollBehavior=e),i.scrollTop=t,i.style.scrollBehavior=""}clearActiveOption(){this.activeOption&&(W(this.activeOption,"active"),it(this.activeOption,{"aria-selected":null})),this.activeOption=null,it(this.focus_node,{"aria-activedescendant":null})}selectAll(){const t=this
if("single"===t.settings.mode)return
const e=t.controlChildren()
e.length&&(t.inputState(),t.close(),t.activeItems=e,B(e,(e=>{t.setActiveItemClass(e)})))}inputState(){var t=this
t.control.contains(t.control_input)&&(it(t.control_input,{placeholder:t.settings.placeholder}),t.activeItems.length>0||!t.isFocused&&t.settings.hidePlaceholder&&t.items.length>0?(t.setTextboxValue(),t.isInputHidden=!0):(t.settings.hidePlaceholder&&t.items.length>0&&it(t.control_input,{placeholder:""}),t.isInputHidden=!1),t.wrapper.classList.toggle("input-hidden",t.isInputHidden))}inputValue(){return this.control_input.value.trim()}focus(){var t=this
t.isDisabled||t.isReadOnly||(t.ignoreFocus=!0,t.control_input.offsetWidth?t.control_input.focus():t.focus_node.focus(),setTimeout((()=>{t.ignoreFocus=!1,t.onFocus()}),0))}blur(){this.focus_node.blur(),this.onBlur()}getScoreFunction(t){return this.sifter.getScoreFunction(t,this.getSearchOptions())}getSearchOptions(){var t=this.settings,e=t.sortField
return"string"==typeof t.sortField&&(e=[{field:t.sortField}]),{fields:t.searchField,conjunction:t.searchConjunction,sort:e,nesting:t.nesting}}search(t){var e,i,s=this,n=this.getSearchOptions()
if(s.settings.score&&"function"!=typeof(i=s.settings.score.call(s,t)))throw new Error('Tom Select "score" setting must be a function that returns a function')
return t!==s.lastQuery?(s.lastQuery=t,e=s.sifter.search(t,Object.assign(n,{score:i})),s.currentResults=e):e=Object.assign({},s.currentResults),s.settings.hideSelected&&(e.items=e.items.filter((t=>{let e=P(t.id)
return!(e&&-1!==s.items.indexOf(e))}))),e}refreshOptions(t=!0){var e,i,s,n,o,r,l,a,c,d
const u={},p=[]
var h=this,g=h.inputValue()
const f=g===h.lastQuery||""==g&&null==h.lastQuery
var m=h.search(g),v=null,y=h.settings.shouldOpen||!1,O=h.dropdown_content
f&&(v=h.activeOption)&&(c=v.closest("[data-group]")),n=m.items.length,"number"==typeof h.settings.maxOptions&&(n=Math.min(n,h.settings.maxOptions)),n>0&&(y=!0)
const b=(t,e)=>{let i=u[t]
if(void 0!==i){let t=p[i]
if(void 0!==t)return[i,t.fragment]}let s=document.createDocumentFragment()
return i=p.length,p.push({fragment:s,order:e,optgroup:t}),[i,s]}
for(e=0;e<n;e++){let t=m.items[e]
if(!t)continue
let n=t.id,l=h.options[n]
if(void 0===l)continue
let a=$(n),d=h.getOption(a,!0)
for(h.settings.hideSelected||d.classList.toggle("selected",h.items.includes(a)),o=l[h.settings.optgroupField]||"",i=0,s=(r=Array.isArray(o)?o:[o])&&r.length;i<s;i++){o=r[i]
let t=l.$order,e=h.optgroups[o]
void 0===e?o="":t=e.$order
const[s,a]=b(o,t)
i>0&&(d=d.cloneNode(!0),it(d,{id:l.$id+"-clone-"+i,"aria-selected":null}),d.classList.add("ts-cloned"),W(d,"active"),h.activeOption&&h.activeOption.dataset.value==n&&c&&c.dataset.group===o.toString()&&(v=d)),a.appendChild(d),""!=o&&(u[o]=s)}}var w
h.settings.lockOptgroupOrder&&p.sort(((t,e)=>t.order-e.order)),l=document.createDocumentFragment(),B(p,(t=>{let e=t.fragment,i=t.optgroup
if(!e||!e.children.length)return
let s=h.optgroups[i]
if(void 0!==s){let t=document.createDocumentFragment(),i=h.render("optgroup_header",s)
z(t,i),z(t,e)
let n=h.render("optgroup",{group:s,options:t})
z(l,n)}else z(l,e)})),O.innerHTML="",z(O,l),h.settings.highlight&&(w=O.querySelectorAll("span.highlight"),Array.prototype.forEach.call(w,(function(t){var e=t.parentNode
e.replaceChild(t.firstChild,t),e.normalize()})),m.query.length&&m.tokens.length&&B(m.tokens,(t=>{nt(O,t.regex)})))
var I=t=>{let e=h.render(t,{input:g})
return e&&(y=!0,O.insertBefore(e,O.firstChild)),e}
if(h.loading?I("loading"):h.settings.shouldLoad.call(h,g)?0===m.items.length&&I("no_results"):I("not_loading"),(a=h.canCreate(g))&&(d=I("option_create")),h.hasOptions=m.items.length>0||a,y){if(m.items.length>0){if(v||"single"!==h.settings.mode||null==h.items[0]||(v=h.getOption(h.items[0])),!O.contains(v)){let t=0
d&&!h.settings.addPrecedence&&(t=1),v=h.selectable()[t]}}else d&&(v=d)
t&&!h.isOpen&&(h.open(),h.scrollToOption(v,"auto")),h.setActiveOption(v)}else h.clearActiveOption(),t&&h.isOpen&&h.close(!1)}selectable(){return this.dropdown_content.querySelectorAll("[data-selectable]")}addOption(t,e=!1){const i=this
if(Array.isArray(t))return i.addOptions(t,e),!1
const s=P(t[i.settings.valueField])
return null!==s&&!i.options.hasOwnProperty(s)&&(t.$order=t.$order||++i.order,t.$id=i.inputId+"-opt-"+t.$order,i.options[s]=t,i.lastQuery=null,e&&(i.userOptions[s]=e,i.trigger("option_add",s,t)),s)}addOptions(t,e=!1){B(t,(t=>{this.addOption(t,e)}))}registerOption(t){return this.addOption(t)}registerOptionGroup(t){var e=P(t[this.settings.optgroupValueField])
return null!==e&&(t.$order=t.$order||++this.order,this.optgroups[e]=t,e)}addOptionGroup(t,e){var i
e[this.settings.optgroupValueField]=t,(i=this.registerOptionGroup(e))&&this.trigger("optgroup_add",i,e)}removeOptionGroup(t){this.optgroups.hasOwnProperty(t)&&(delete this.optgroups[t],this.clearCache(),this.trigger("optgroup_remove",t))}clearOptionGroups(){this.optgroups={},this.clearCache(),this.trigger("optgroup_clear")}updateOption(t,e){const i=this
var s,n
const o=P(t),r=P(e[i.settings.valueField])
if(null===o)return
const l=i.options[o]
if(null==l)return
if("string"!=typeof r)throw new Error("Value must be set in option data")
const a=i.getOption(o),c=i.getItem(o)
if(e.$order=e.$order||l.$order,delete i.options[o],i.uncacheValue(r),i.options[r]=e,a){if(i.dropdown_content.contains(a)){const t=i._render("option",e)
st(a,t),i.activeOption===a&&i.setActiveOption(t)}a.remove()}c&&(-1!==(n=i.items.indexOf(o))&&i.items.splice(n,1,r),s=i._render("item",e),c.classList.contains("active")&&U(s,"active"),st(c,s)),i.lastQuery=null}removeOption(t,e){const i=this
t=$(t),i.uncacheValue(t),delete i.userOptions[t],delete i.options[t],i.lastQuery=null,i.trigger("option_remove",t),i.removeItem(t,e)}clearOptions(t){const e=(t||this.clearFilter).bind(this)
this.loadedSearches={},this.userOptions={},this.clearCache()
const i={}
B(this.options,((t,s)=>{e(t,s)&&(i[s]=t)})),this.options=this.sifter.items=i,this.lastQuery=null,this.trigger("option_clear")}clearFilter(t,e){return this.items.indexOf(e)>=0}getOption(t,e=!1){const i=P(t)
if(null===i)return null
const s=this.options[i]
if(null!=s){if(s.$div)return s.$div
if(e)return this._render("option",s)}return null}getAdjacent(t,e,i="option"){var s
if(!t)return null
s="item"==i?this.controlChildren():this.dropdown_content.querySelectorAll("[data-selectable]")
for(let i=0;i<s.length;i++)if(s[i]==t)return e>0?s[i+1]:s[i-1]
return null}getItem(t){if("object"==typeof t)return t
var e=P(t)
return null!==e?this.control.querySelector(`[data-value="${M(e)}"]`):null}addItems(t,e){var i=this,s=Array.isArray(t)?t:[t]
const n=(s=s.filter((t=>-1===i.items.indexOf(t))))[s.length-1]
s.forEach((t=>{i.isPending=t!==n,i.addItem(t,e)}))}addItem(t,e){q(this,e?[]:["change","dropdown_close"],(()=>{var i,s
const n=this,o=n.settings.mode,r=P(t)
if((!r||-1===n.items.indexOf(r)||("single"===o&&n.close(),"single"!==o&&n.settings.duplicates))&&null!==r&&n.options.hasOwnProperty(r)&&("single"===o&&n.clear(e),"multi"!==o||!n.isFull())){if(i=n._render("item",n.options[r]),n.control.contains(i)&&(i=i.cloneNode(!0)),s=n.isFull(),n.items.splice(n.caretPos,0,r),n.insertAtCaret(i),n.isSetup){if(!n.isPending&&n.settings.hideSelected){let t=n.getOption(r),e=n.getAdjacent(t,1)
e&&n.setActiveOption(e)}n.isPending||n.settings.closeAfterSelect||n.refreshOptions(n.isFocused&&"single"!==o),0!=n.settings.closeAfterSelect&&n.isFull()?n.close():n.isPending||n.positionDropdown(),n.trigger("item_add",r,i),n.isPending||n.updateOriginalInput({silent:e})}(!n.isPending||!s&&n.isFull())&&(n.inputState(),n.refreshState())}}))}removeItem(t=null,e){const i=this
if(!(t=i.getItem(t)))return
var s,n
const o=t.dataset.value
s=et(t),t.remove(),t.classList.contains("active")&&(n=i.activeItems.indexOf(t),i.activeItems.splice(n,1),W(t,"active")),i.items.splice(s,1),i.lastQuery=null,!i.settings.persist&&i.userOptions.hasOwnProperty(o)&&i.removeOption(o,e),s<i.caretPos&&i.setCaret(i.caretPos-1),i.updateOriginalInput({silent:e}),i.refreshState(),i.positionDropdown(),i.trigger("item_remove",o,t)}createItem(t=null,e=()=>{}){3===arguments.length&&(e=arguments[2]),"function"!=typeof e&&(e=()=>{})
var i,s=this,n=s.caretPos
if(t=t||s.inputValue(),!s.canCreate(t))return e(),!1
s.lock()
var o=!1,r=t=>{if(s.unlock(),!t||"object"!=typeof t)return e()
var i=P(t[s.settings.valueField])
if("string"!=typeof i)return e()
s.setTextboxValue(),s.addOption(t,!0),s.setCaret(n),s.addItem(i),e(t),o=!0}
return i="function"==typeof s.settings.create?s.settings.create.call(this,t,r):{[s.settings.labelField]:t,[s.settings.valueField]:t},o||r(i),!0}refreshItems(){var t=this
t.lastQuery=null,t.isSetup&&t.addItems(t.items),t.updateOriginalInput(),t.refreshState()}refreshState(){const t=this
t.refreshValidityState()
const e=t.isFull(),i=t.isLocked
t.wrapper.classList.toggle("rtl",t.rtl)
const s=t.wrapper.classList
var n
s.toggle("focus",t.isFocused),s.toggle("disabled",t.isDisabled),s.toggle("readonly",t.isReadOnly),s.toggle("required",t.isRequired),s.toggle("invalid",!t.isValid),s.toggle("locked",i),s.toggle("full",e),s.toggle("input-active",t.isFocused&&!t.isInputHidden),s.toggle("dropdown-active",t.isOpen),s.toggle("has-options",(n=t.options,0===Object.keys(n).length)),s.toggle("has-items",t.items.length>0)}refreshValidityState(){var t=this
t.input.validity&&(t.isValid=t.input.validity.valid,t.isInvalid=!t.isValid)}isFull(){return null!==this.settings.maxItems&&this.items.length>=this.settings.maxItems}updateOriginalInput(t={}){const e=this
var i,s
const n=e.input.querySelector('option[value=""]')
if(e.is_select_tag){const o=[],r=e.input.querySelectorAll("option:checked").length
function l(t,i,s){return t||(t=K('<option value="'+V(i)+'">'+V(s)+"</option>")),t!=n&&e.input.append(t),o.push(t),(t!=n||r>0)&&(t.selected=!0),t}e.input.querySelectorAll("option:checked").forEach((t=>{t.selected=!1})),0==e.items.length&&"single"==e.settings.mode?l(n,"",""):e.items.forEach((t=>{if(i=e.options[t],s=i[e.settings.labelField]||"",o.includes(i.$option)){l(e.input.querySelector(`option[value="${M(t)}"]:not(:checked)`),t,s)}else i.$option=l(i.$option,t,s)}))}else e.input.value=e.getValue()
e.isSetup&&(t.silent||e.trigger("change",e.getValue()))}open(){var t=this
t.isLocked||t.isOpen||"multi"===t.settings.mode&&t.isFull()||(t.isOpen=!0,it(t.focus_node,{"aria-expanded":"true"}),t.refreshState(),J(t.dropdown,{visibility:"hidden",display:"block"}),t.positionDropdown(),J(t.dropdown,{visibility:"visible",display:"block"}),t.focus(),t.trigger("dropdown_open",t.dropdown))}close(t=!0){var e=this,i=e.isOpen
t&&(e.setTextboxValue(),"single"===e.settings.mode&&e.items.length&&e.inputState()),e.isOpen=!1,it(e.focus_node,{"aria-expanded":"false"}),J(e.dropdown,{display:"none"}),e.settings.hideSelected&&e.clearActiveOption(),e.refreshState(),i&&e.trigger("dropdown_close",e.dropdown)}positionDropdown(){if("body"===this.settings.dropdownParent){var t=this.control,e=t.getBoundingClientRect(),i=t.offsetHeight+e.top+window.scrollY,s=e.left+window.scrollX
J(this.dropdown,{width:e.width+"px",top:i+"px",left:s+"px"})}}clear(t){var e=this
if(e.items.length){var i=e.controlChildren()
B(i,(t=>{e.removeItem(t,!0)})),e.inputState(),t||e.updateOriginalInput(),e.trigger("clear")}}insertAtCaret(t){const e=this,i=e.caretPos,s=e.control
s.insertBefore(t,s.children[i]||null),e.setCaret(i+1)}deleteSelection(t){var e,i,s,n,o,r=this
e=t&&8===t.keyCode?-1:1,i={start:(o=r.control_input).selectionStart||0,length:(o.selectionEnd||0)-(o.selectionStart||0)}
const l=[]
if(r.activeItems.length)n=tt(r.activeItems,e),s=et(n),e>0&&s++,B(r.activeItems,(t=>l.push(t)))
else if((r.isFocused||"single"===r.settings.mode)&&r.items.length){const t=r.controlChildren()
let s
e<0&&0===i.start&&0===i.length?s=t[r.caretPos-1]:e>0&&i.start===r.inputValue().length&&(s=t[r.caretPos]),void 0!==s&&l.push(s)}if(!r.shouldDelete(l,t))return!1
for(D(t,!0),void 0!==s&&r.setCaret(s);l.length;)r.removeItem(l.pop())
return r.inputState(),r.positionDropdown(),r.refreshOptions(!1),!0}shouldDelete(t,e){const i=t.map((t=>t.dataset.value))
return!(!i.length||"function"==typeof this.settings.onDelete&&!1===this.settings.onDelete(i,e))}advanceSelection(t,e){var i,s,n=this
n.rtl&&(t*=-1),n.inputValue().length||(H(ot,e)||H("shiftKey",e)?(s=(i=n.getLastActive(t))?i.classList.contains("active")?n.getAdjacent(i,t,"item"):i:t>0?n.control_input.nextElementSibling:n.control_input.previousElementSibling)&&(s.classList.contains("active")&&n.removeActiveItem(i),n.setActiveItemClass(s)):n.moveCaret(t))}moveCaret(t){}getLastActive(t){let e=this.control.querySelector(".last-active")
if(e)return e
var i=this.control.querySelectorAll(".active")
return i?tt(i,t):void 0}setCaret(t){this.caretPos=this.items.length}controlChildren(){return Array.from(this.control.querySelectorAll("[data-ts-item]"))}lock(){this.setLocked(!0)}unlock(){this.setLocked(!1)}setLocked(t=this.isReadOnly||this.isDisabled){this.isLocked=t,this.refreshState()}disable(){this.setDisabled(!0),this.close()}enable(){this.setDisabled(!1)}setDisabled(t){this.focus_node.tabIndex=t?-1:this.tabIndex,this.isDisabled=t,this.input.disabled=t,this.control_input.disabled=t,this.setLocked()}setReadOnly(t){this.isReadOnly=t,this.input.readOnly=t,this.control_input.readOnly=t,this.setLocked()}destroy(){var t=this,e=t.revertSettings
t.trigger("destroy"),t.off(),t.wrapper.remove(),t.dropdown.remove(),t.input.innerHTML=e.innerHTML,t.input.tabIndex=e.tabIndex,W(t.input,"tomselected","ts-hidden-accessible"),t._destroy(),delete t.input.tomselect}render(t,e){var i,s
const n=this
if("function"!=typeof this.settings.render[t])return null
if(!(s=n.settings.render[t].call(this,e,V)))return null
if(s=K(s),"option"===t||"option_create"===t?e[n.settings.disabledField]?it(s,{"aria-disabled":"true"}):it(s,{"data-selectable":""}):"optgroup"===t&&(i=e.group[n.settings.optgroupValueField],it(s,{"data-group":i}),e.group[n.settings.disabledField]&&it(s,{"data-disabled":""})),"option"===t||"item"===t){const i=$(e[n.settings.valueField])
it(s,{"data-value":i}),"item"===t?(U(s,n.settings.itemClass),it(s,{"data-ts-item":""})):(U(s,n.settings.optionClass),it(s,{role:"option",id:e.$id}),e.$div=s,n.options[i]=e)}return s}_render(t,e){const i=this.render(t,e)
if(null==i)throw"HTMLElement expected"
return i}clearCache(){B(this.options,(t=>{t.$div&&(t.$div.remove(),delete t.$div)}))}uncacheValue(t){const e=this.getOption(t)
e&&e.remove()}canCreate(t){return this.settings.create&&t.length>0&&this.settings.createFilter.call(this,t)}hook(t,e,i){var s=this,n=s[e]
s[e]=function(){var e,o
return"after"===t&&(e=n.apply(s,arguments)),o=i.apply(s,arguments),"instead"===t?o:("before"===t&&(e=n.apply(s,arguments)),e)}}}return ct}))
var tomSelect=function(t,e){return new TomSelect(t,e)}
//# sourceMappingURL=tom-select.base.min.js.map
