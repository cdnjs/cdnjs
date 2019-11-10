!function e(t,n,r){function i(o,a){if(!n[o]){if(!t[o]){var l="function"==typeof require&&require
if(!a&&l)return l(o,!0)
if(s)return s(o,!0)
var h=new Error("Cannot find module '"+o+"'")
throw h.code="MODULE_NOT_FOUND",h}var u=n[o]={exports:{}}
t[o][0].call(u.exports,function(e){var n=t[o][1][e]
return i(n?n:e)},u,u.exports,e,t,n,r)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o])
return i}({1:[function(e,t,n){t.exports={name:"processing-js",version:"1.5.2",author:"Processing.js",repository:{type:"git",url:"git@github.com/processing-js/processing-js.git"},main:"processing.min.js",bugs:"https://github.com/processing-js/processing-js/issues",devDependencies:{argv:"~0.0.2",browserify:"^11.0.1",express:"~3.3.3",grunt:"~0.4.1","grunt-cli":"~0.1.8","grunt-contrib-jshint":"~0.4.3",minifier:"^0.7.1","node-minify":"~0.7.3",nunjucks:"~0.1.9",open:"0.0.3"},scripts:{test:"node test",start:"browserify build.js -o processing.js && minify --output processing.min.js processing.js"},license:"MIT",dependencies:{minifier:"^0.7.1"}}},{}],2:[function(e,t,n){t.exports=function(e){if(!(e instanceof Array)){if(e.iterator instanceof Function)return e.iterator()
throw"Unable to iterate: "+e}var t=-1
this.hasNext=function(){return++t<e.length},this.next=function(){return e[t]}}},{}],3:[function(e,t,n){t.exports={X:0,Y:1,Z:2,R:3,G:4,B:5,A:6,U:7,V:8,NX:9,NY:10,NZ:11,EDGE:12,SR:13,SG:14,SB:15,SA:16,SW:17,TX:18,TY:19,TZ:20,VX:21,VY:22,VZ:23,VW:24,AR:25,AG:26,AB:27,DR:3,DG:4,DB:5,DA:6,SPR:28,SPG:29,SPB:30,SHINE:31,ER:32,EG:33,EB:34,BEEN_LIT:35,VERTEX_FIELD_COUNT:36,P2D:1,JAVA2D:1,WEBGL:2,P3D:2,OPENGL:2,PDF:0,DXF:0,OTHER:0,WINDOWS:1,MAXOSX:2,LINUX:3,EPSILON:1e-4,MAX_FLOAT:3.4028235e38,MIN_FLOAT:-3.4028235e38,MAX_INT:2147483647,MIN_INT:-2147483648,PI:Math.PI,TWO_PI:2*Math.PI,TAU:2*Math.PI,HALF_PI:Math.PI/2,THIRD_PI:Math.PI/3,QUARTER_PI:Math.PI/4,DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,WHITESPACE:" \t\n\r\f ",RGB:1,ARGB:2,HSB:3,ALPHA:4,CMYK:5,TIFF:0,TARGA:1,JPEG:2,GIF:3,BLUR:11,GRAY:12,INVERT:13,OPAQUE:14,POSTERIZE:15,THRESHOLD:16,ERODE:17,DILATE:18,REPLACE:0,BLEND:1,ADD:2,SUBTRACT:4,LIGHTEST:8,DARKEST:16,DIFFERENCE:32,EXCLUSION:64,MULTIPLY:128,SCREEN:256,OVERLAY:512,HARD_LIGHT:1024,SOFT_LIGHT:2048,DODGE:4096,BURN:8192,ALPHA_MASK:4278190080,RED_MASK:16711680,GREEN_MASK:65280,BLUE_MASK:255,CUSTOM:0,ORTHOGRAPHIC:2,PERSPECTIVE:3,POINT:2,POINTS:2,LINE:4,LINES:4,TRIANGLE:8,TRIANGLES:9,TRIANGLE_STRIP:10,TRIANGLE_FAN:11,QUAD:16,QUADS:16,QUAD_STRIP:17,POLYGON:20,PATH:21,RECT:30,ELLIPSE:31,ARC:32,SPHERE:40,BOX:41,CHORD:2,PIE:3,GROUP:0,PRIMITIVE:1,GEOMETRY:3,VERTEX:0,BEZIER_VERTEX:1,CURVE_VERTEX:2,BREAK:3,CLOSESHAPE:4,OPEN:1,CLOSE:2,CORNER:0,CORNERS:1,RADIUS:2,CENTER_RADIUS:2,CENTER:3,DIAMETER:3,CENTER_DIAMETER:3,BASELINE:0,TOP:101,BOTTOM:102,NORMAL:1,NORMALIZED:1,IMAGE:2,MODEL:4,SHAPE:5,SQUARE:"butt",ROUND:"round",PROJECT:"square",MITER:"miter",BEVEL:"bevel",AMBIENT:0,DIRECTIONAL:1,SPOT:3,BACKSPACE:8,TAB:9,ENTER:10,RETURN:13,ESC:27,DELETE:127,CODED:65535,SHIFT:16,CONTROL:17,ALT:18,CAPSLK:20,PGUP:33,PGDN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLK:144,META:157,INSERT:155,ARROW:"default",CROSS:"crosshair",HAND:"pointer",MOVE:"move",TEXT:"text",WAIT:"wait",NOCURSOR:"url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto",DISABLE_OPENGL_2X_SMOOTH:1,ENABLE_OPENGL_2X_SMOOTH:-1,ENABLE_OPENGL_4X_SMOOTH:2,ENABLE_NATIVE_FONTS:3,DISABLE_DEPTH_TEST:4,ENABLE_DEPTH_TEST:-4,ENABLE_DEPTH_SORT:5,DISABLE_DEPTH_SORT:-5,DISABLE_OPENGL_ERROR_REPORT:6,ENABLE_OPENGL_ERROR_REPORT:-6,ENABLE_ACCURATE_TEXTURES:7,DISABLE_ACCURATE_TEXTURES:-7,HINT_COUNT:10,SINCOS_LENGTH:720,PRECISIONB:15,PRECISIONF:32768,PREC_MAXVAL:32767,PREC_ALPHA_SHIFT:9,PREC_RED_SHIFT:1,NORMAL_MODE_AUTO:0,NORMAL_MODE_SHAPE:1,NORMAL_MODE_VERTEX:2,MAX_LIGHTS:8}},{}],4:[function(e,n,r){n.exports=function(e){var n={BufferMax:200},r=e.createElement("style"),i=!1
return r.textContent=[".pjsconsole.hidden {","  display: none!important;","}"].join("\n"),n.wrapper=e.createElement("div"),r.textContent+=["",".pjsconsole {","  opacity: .75;","  display: block;","  position: fixed;","  bottom: 0px;","  left: 0px;","  right: 0px;","  height: 50px;","  background-color: #aaa;","}"].join("\n"),n.wrapper.classList.add("pjsconsole"),n.dragger=e.createElement("div"),r.textContent+=["",".pjsconsole .dragger {","  display: block;","  border: 3px black raised;","  cursor: n-resize;","  position: absolute;","  top: 0px;","  left: 0px;","  right: 0px;","  height: 5px;","  background-color: #333;","}"].join("\n"),n.dragger.classList.add("dragger"),n.closer=e.createElement("div"),r.textContent+=["",".pjsconsole .closer {","  opacity: .5;","  display: block;","  border: 3px black raised;","  position: absolute;","  top: 10px;","  right: 30px;","  height: 20px;","  width: 20px;","  background-color: #ddd;","  color: #000;","  line-height: 20px;","  text-align: center;","  cursor: pointer","}"].join("\n"),n.closer.classList.add("closer"),n.closer.innerHTML="&#10006;",n.javaconsole=e.createElement("div"),r.textContent+=["",".pjsconsole .console {","  overflow-x: auto;","  display: block;","  position: absolute;","  left: 10px;","  right: 0px;","  bottom: 5px;","  top: 10px;","  overflow-y: scroll;","  height: 40px;","}"].join("\n"),n.javaconsole.setAttribute("class","console"),n.wrapper.appendChild(n.dragger),n.wrapper.appendChild(n.javaconsole),n.wrapper.appendChild(n.closer),n.dragger.onmousedown=function(t){n.divheight=n.wrapper.style.height,e.selection?e.selection.empty():window.getSelection().removeAllRanges()
var r=t.screenY
window.onmousemove=function(e){n.wrapper.style.height=parseFloat(n.divheight)+(r-e.screenY)+"px",n.javaconsole.style.height=parseFloat(n.divheight)+(r-e.screenY)-10+"px"},window.onmouseup=function(t){e.selection?e.selection.empty():window.getSelection().removeAllRanges(),n.wrapper.style.height=parseFloat(n.divheight)+(r-t.screenY)+"px",n.javaconsole.style.height=parseFloat(n.divheight)+(r-t.screenY)-10+"px",window.onmousemove=null,window.onmouseup=null}},n.BufferArray=[],n.print=n.log=function(){i||(e.body.appendChild(r),e.body.appendChild(n.wrapper),i=!0)
var s=Array.prototype.slice.call(arguments)
t=s.map(function(e,t){return e+(t+1===s.length?"":" ")}).join(""),n.BufferArray[n.BufferArray.length-1]?n.BufferArray[n.BufferArray.length-1]+=t+"":n.BufferArray.push(t),n.javaconsole.innerHTML=n.BufferArray.join(""),n.showconsole()},n.println=function(){var e=Array.prototype.slice.call(arguments)
e.push("<br>"),n.print.apply(n,e),n.BufferArray.length>n.BufferMax?n.BufferArray.splice(0,1):n.javaconsole.scrollTop=n.javaconsole.scrollHeight},n.showconsole=function(){n.wrapper.classList.remove("hidden")},n.hideconsole=function(){n.wrapper.classList.add("hidden")},n.closer.onclick=function(){n.hideconsole()},n.hideconsole(),n}},{}],5:[function(e,t,n){t.exports=function(e){function t(){}function n(e,t,n){if(!e.hasOwnProperty(t)||"function"!=typeof e[t])return void(e[t]=n)
var r=e[t]
if("$overloads"in r)return void(r.$defaultOverload=n)
if("$overloads"in n||r.length!==n.length){var i,s
"$overloads"in n?(i=n.$overloads.slice(0),i[r.length]=r,s=n.$defaultOverload):(i=[],i[n.length]=n,i[r.length]=r,s=r)
var o=function(){var e=o.$overloads[arguments.length]||("$methodArgsIndex"in o&&arguments.length>o.$methodArgsIndex?o.$overloads[o.$methodArgsIndex]:null)||o.$defaultOverload
return e.apply(this,arguments)}
o.$overloads=i,"$methodArgsIndex"in n&&(o.$methodArgsIndex=n.$methodArgsIndex),o.$defaultOverload=s,o.name=t,e[t]=o}}function r(e,t){function r(n){s.defineProperty(e,n,{get:function(){return t[n]},set:function(e){t[n]=e},enumerable:!0})}var i=[]
for(var o in t)"function"==typeof t[o]?n(e,o,t[o]):"$"===o.charAt(0)||o in e||i.push(o)
for(;i.length>0;)r(i.shift())
e.$super=t}function i(e){return"string"==typeof e&&["byte","int","char","color","float","long","double"].indexOf(e)!==-1}t.prototype=e.PConstants
var s=new t
return Object.keys(e).forEach(function(t){s[t]=e[t]}),s.defineProperty=function(e,t,n){"defineProperty"in Object?Object.defineProperty(e,t,n):(n.hasOwnProperty("get")&&e.__defineGetter__(t,n.get),n.hasOwnProperty("set")&&e.__defineSetter__(t,n.set))},s.extendClassChain=function(e){for(var t=[e],n=e.$upcast;n;n=n.$upcast)r(n,e),t.push(n),e=n
for(;t.length>0;)t.pop().$self=e},s.extendStaticMembers=function(e,t){r(e,t)},s.extendInterfaceMembers=function(e,t){r(e,t)},s.addMethod=function(e,t,n,r){var i=e[t]
if(i||r){var s=n.length
if("$overloads"in i)i.$overloads[s]=n
else{var o=function(){var e=o.$overloads[arguments.length]||("$methodArgsIndex"in o&&arguments.length>o.$methodArgsIndex?o.$overloads[o.$methodArgsIndex]:null)||o.$defaultOverload
return e.apply(this,arguments)},a=[]
i&&(a[i.length]=i),a[s]=n,o.$overloads=a,o.$defaultOverload=i||n,r&&(o.$methodArgsIndex=s),o.name=t,e[t]=o}}else e[t]=n},s.createJavaArray=function(e,t){var n=null,r=null
if("string"==typeof e&&("boolean"===e?r=!1:i(e)&&(r=0)),"number"==typeof t[0]){var o=0|t[0]
if(t.length<=1){n=[],n.length=o
for(var a=0;a<o;++a)n[a]=r}else{n=[]
for(var l=t.slice(1),h=0;h<o;++h)n.push(s.createJavaArray(e,l))}}return n},s.defineProperty(s,"screenWidth",{get:function(){return window.innerWidth}}),s.defineProperty(s,"screenHeight",{get:function(){return window.innerHeight}}),s}},{}],6:[function(e,t,n){t.exports=function(e,t){var n,r=t.window,i=t.document,s=r.XMLHttpRequest,o=t.noop,a=t.isDOMPresent,h=t.version
e.version=h?h:"@DEV-VERSION@",e.lib={},e.registerLibrary=function(t,n){e.lib[t]=n,n.hasOwnProperty("init")&&n.init(defaultScope)},e.Sketch=function(e){this.attachFunction=e,this.options={pauseOnBlur:!1,globalKeyEvents:!1},this.onLoad=o,this.onSetup=o,this.onPause=o,this.onLoop=o,this.onFrameStart=o,this.onFrameEnd=o,this.onExit=o,this.params={},this.imageCache={pending:0,images:{},operaCache:{},add:function(e,t){if(!this.images[e]&&(a||(this.images[e]=null),t||(t=new Image,t.onload=function(e){return function(){e.pending--}}(this),this.pending++,t.src=e),this.images[e]=t,r.opera)){var n=i.createElement("div")
n.appendChild(t),n.style.position="absolute",n.style.opacity=0,n.style.width="1px",n.style.height="1px",this.operaCache[e]||(i.body.appendChild(n),this.operaCache[e]=n)}}},this.sourceCode=void 0,this.attach=function(e){if("function"==typeof this.attachFunction)this.attachFunction(e)
else{if(!this.sourceCode)throw"Unable to attach sketch to the processing instance"
var t=new Function("return ("+this.sourceCode+");")()
t(e),this.attachFunction=t}},this.toString=function(){var e,t="((function(Sketch) {\n"
t+="var sketch = new Sketch(\n"+this.sourceCode+");\n"
for(e in this.options)if(this.options.hasOwnProperty(e)){var n=this.options[e]
t+="sketch.options."+e+" = "+("string"==typeof n?'"'+n+'"':""+n)+";\n"}for(e in this.imageCache)this.options.hasOwnProperty(e)&&(t+='sketch.imageCache.add("'+e+'");\n')
return t+="return sketch;\n})(Processing.Sketch))"}}
var u=e.loadSketchFromSources=function(t,n,o){function a(e,t){var n=new s
n.onreadystatechange=function(){if(4===n.readyState){var e
200!==n.status&&0!==n.status?e="Invalid XHR status "+n.status:""===n.responseText&&(e="withCredentials"in new s&&(new s).withCredentials===!1&&"file:"===r.location.protocol?"XMLHttpRequest failure, possibly due to a same-origin policy violation. You can try loading this page in another browser, or load it from http://localhost using a local webserver. See the Processing.js README for a more detailed explanation of this problem and solutions.":"File is empty."),t(n.responseText,e)}},n.open("GET",e,!0),n.overrideMimeType&&n.overrideMimeType("application/json"),n.setRequestHeader("If-Modified-Since","Fri, 01 Jan 1960 00:00:00 GMT"),n.send(null)}function l(n,r){function s(i,s){if(h[n]=i,++f,s&&u.push(r+" ==> "+s),f===c){if(0!==u.length)throw"Processing.js: Unable to load pjs sketch files: "+u.join("\n")
var a=new e(t,h.join("\n"))
o&&o(a)}}if("#"===r.charAt(0)){var l=i.getElementById(r.substring(1))
return void(l?s(l.text||l.textContent):s("","Unable to load pjs sketch: element with id '"+r.substring(1)+"' was not found"))}a(r,s)}for(var h=[],u=[],c=n.length,f=0,p=0;p<c;++p)l(p,n[p])},c=function(){i.removeEventListener("DOMContentLoaded",c,!1)
for(var t;e.instances.length>0;)for(t=e.instances.length-1;t>=0;t--)e.instances[t]&&e.instances[t].exit()
var r,s=i.getElementsByTagName("canvas")
for(t=0,l=s.length;t<l;t++){var o=s[t].getAttribute("data-processing-sources")
if(null===o&&(o=s[t].getAttribute("data-src"),null===o&&(o=s[t].getAttribute("datasrc"))),o){r=o.split(/\s+/g)
for(var a=0;a<r.length;)r[a]?a++:r.splice(a,1)
u(s[t],r)}}var h,f,p,m,g=i.getElementsByTagName("script"),d=[]
for(h=g.length-1;h>=0;h--)d.push(g[h])
for(h=0,f=d.length;h<f;h++){var v=d[h]
if(v.getAttribute){var y=v.getAttribute("type")
if(y&&("text/processing"===y.toLowerCase()||"application/processing"===y.toLowerCase())){var A=v.getAttribute("data-processing-target")
if(s=n,A)s=i.getElementById(A)
else{for(var x=v.nextSibling;x&&1!==x.nodeType;)x=x.nextSibling
x&&"canvas"===x.nodeName.toLowerCase()&&(s=x)}if(s){if(v.getAttribute("src")){r=v.getAttribute("src").split(/\s+/),u(s,r)
continue}p=v.textContent||v.text,m=new e(s,p)}}}}}
return i.addEventListener("DOMContentLoaded",c,!1),e.reload=c,e.disableInit=function(){i.removeEventListener("DOMContentLoaded",c,!1)},e}},{}],7:[function(e,t,n){t.exports=function(e,t){return null===e||null===t?null===e&&null===t:"string"==typeof e?e===t:"object"!=typeof e?e===t:e.equals instanceof Function?e.equals(t):e===t}},{}],8:[function(e,t,n){t.exports=function(e,t){if("string"==typeof e){for(var n=0,r=0;r<e.length;++r)n=31*n+e.charCodeAt(r)&4294967295
return n}return"object"!=typeof e?4294967295&e:e.hashCode instanceof Function?e.hashCode():(e.$id===t&&(e.$id=Math.floor(65536*Math.random())-32768<<16|Math.floor(65536*Math.random())),e.$id)}},{}],9:[function(e,t,n){t.exports=function(e){function t(e){var t=-1
this.hasNext=function(){return t+1<e.length},this.next=function(){return e[++t]},this.remove=function(){e.splice(t--,1)}}function n(e){var i=[]
e&&e.toArray&&(i=e.toArray()),this.get=function(e){return i[e]},this.contains=function(e){return this.indexOf(e)>-1},this.indexOf=function(e){for(var t=0,n=i.length;t<n;++t)if(r(e,i[t]))return t
return-1},this.lastIndexOf=function(e){for(var t=i.length-1;t>=0;--t)if(r(e,i[t]))return t
return-1},this.add=function(){if(1===arguments.length)i.push(arguments[0])
else{if(2!==arguments.length)throw"Please use the proper number of parameters."
var e=arguments[0]
if("number"!=typeof e)throw typeof e+" is not a number"
if(!(e>=0&&e<=i.length))throw e+" is not a valid index"
i.splice(e,0,arguments[1])}},this.addAll=function(e,t){var n
if("number"==typeof e){if(e<0||e>i.length)throw"Index out of bounds for addAll: "+e+" greater or equal than "+i.length
for(n=new ObjectIterator(t);n.hasNext();)i.splice(e++,0,n.next())}else for(n=new ObjectIterator(e);n.hasNext();)i.push(n.next())},this.set=function(){if(2!==arguments.length)throw"Please use the proper number of parameters."
var e=arguments[0]
if("number"!=typeof e)throw typeof e+" is not a number"
if(!(e>=0&&e<i.length))throw e+" is not a valid index."
i.splice(e,1,arguments[1])},this.size=function(){return i.length},this.clear=function(){i.length=0},this.remove=function(e){return"number"==typeof e?i.splice(e,1)[0]:(e=this.indexOf(e),e>-1&&(i.splice(e,1),!0))},this.removeAll=function(e){var t,r,i,s=new n
for(s.addAll(this),this.clear(),t=0,r=0;t<s.size();t++)i=s.get(t),e.contains(i)||this.add(r++,i)
return this.size()<s.size()},this.isEmpty=function(){return!i.length},this.clone=function(){return new n(this)},this.toArray=function(){return i.slice(0)},this.iterator=function(){return new t(i)}}var r=(e.virtHashCode,e.virtEquals)
return n}},{}],10:[function(e,t,n){t.exports=function(e,t){var n=function(r){return"string"==typeof r&&1===r.length?this.code=r.charCodeAt(0):"number"==typeof r?this.code=r:r instanceof n?this.code=r:this.code=NaN,e[this.code]===t?e[this.code]=this:e[this.code]}
return n.prototype.toString=function(){return String.fromCharCode(this.code)},n.prototype.valueOf=function(){return this.code},n}({})},{}],11:[function(e,t,n){t.exports=function(e){function t(){function e(e){var t=n(e)%u.length
return t<0?u.length+t:t}function i(){if(!(c<=h*u.length)){for(var t=[],n=0;n<u.length;++n)void 0!==u[n]&&(t=t.concat(u[n]))
var r=2*u.length
u=[],u.length=r
for(var i=0;i<t.length;++i){var s=e(t[i].key),o=u[s]
void 0===o&&(u[s]=o=[]),o.push(t[i])}}}function s(e,t){function n(){for(;!o;)if(++s,i>=u.length)o=!0
else{if(!(void 0===u[i]||s>=u[i].length))return
s=-1,++i}}var r,i=0,s=-1,o=!1
this.hasNext=function(){return!o},this.next=function(){return r=e(u[i][s]),n(),r},this.remove=function(){void 0!==r&&(t(r),--s,n())},n()}function o(e,t,n){this.clear=function(){f.clear()},this.contains=function(e){return t(e)},this.containsAll=function(e){for(var t=e.iterator();t.hasNext();)if(!this.contains(t.next()))return!1
return!0},this.isEmpty=function(){return f.isEmpty()},this.iterator=function(){return new s(e,n)},this.remove=function(e){return!!this.contains(e)&&(n(e),!0)},this.removeAll=function(e){for(var t=e.iterator(),r=!1;t.hasNext();){var i=t.next()
this.contains(i)&&(n(i),r=!0)}return!0},this.retainAll=function(e){for(var t=this.iterator(),r=[];t.hasNext();){var i=t.next()
e.contains(i)||r.push(i)}for(var s=0;s<r.length;++s)n(r[s])
return r.length>0},this.size=function(){return f.size()},this.toArray=function(){for(var e=[],t=this.iterator();t.hasNext();)e.push(t.next())
return e}}function a(e){this._isIn=function(t){return t===f&&void 0===e.removed},this.equals=function(t){return r(e.key,t.getKey())},this.getKey=function(){return e.key},this.getValue=function(){return e.value},this.hashCode=function(t){return n(e.key)},this.setValue=function(t){var n=e.value
return e.value=t,n}}if(1===arguments.length&&arguments[0]instanceof t)return arguments[0].clone()
var l=arguments.length>0?arguments[0]:16,h=arguments.length>1?arguments[1]:.75,u=[]
u.length=l
var c=0,f=this
this.clear=function(){c=0,u=[],u.length=l},this.clone=function(){var e=new t
return e.putAll(this),e},this.containsKey=function(t){var n=e(t),i=u[n]
if(void 0===i)return!1
for(var s=0;s<i.length;++s)if(r(i[s].key,t))return!0
return!1},this.containsValue=function(e){for(var t=0;t<u.length;++t){var n=u[t]
if(void 0!==n)for(var i=0;i<n.length;++i)if(r(n[i].value,e))return!0}return!1},this.entrySet=function(){return new o(function(e){return new a(e)},function(e){return e instanceof a&&e._isIn(f)},function(e){return f.remove(e.getKey())})},this.get=function(t){var n=e(t),i=u[n]
if(void 0===i)return null
for(var s=0;s<i.length;++s)if(r(i[s].key,t))return i[s].value
return null},this.isEmpty=function(){return 0===c},this.keySet=function(){return new o(function(e){return e.key},function(e){return f.containsKey(e)},function(e){return f.remove(e)})},this.values=function(){return new o(function(e){return e.value},function(e){return f.containsValue(e)},function(e){return f.removeByValue(e)})},this.put=function(t,n){var s=e(t),o=u[s]
if(void 0===o)return++c,u[s]=[{key:t,value:n}],i(),null
for(var a=0;a<o.length;++a)if(r(o[a].key,t)){var l=o[a].value
return o[a].value=n,l}return++c,o.push({key:t,value:n}),i(),null},this.putAll=function(e){for(var t=e.entrySet().iterator();t.hasNext();){var n=t.next()
this.put(n.getKey(),n.getValue())}},this.remove=function(t){var n=e(t),i=u[n]
if(void 0===i)return null
for(var s=0;s<i.length;++s)if(r(i[s].key,t)){--c
var o=i[s].value
return i[s].removed=!0,i.length>1?i.splice(s,1):u[n]=void 0,o}return null},this.removeByValue=function(e){var t,n,r,i
for(t in u)if(u.hasOwnProperty(t))for(n=0,r=u[t].length;n<r;n++)if(i=u[t][n],i.value===e)return u[t].splice(n,1),!0
return!1},this.size=function(){return c}}var n=e.virtHashCode,r=e.virtEquals
return t}},{}],12:[function(e,t,n){t.exports=function(e,t){function n(e){var t=250,n=e.size/t,r=i.createElement("canvas")
r.width=2*t,r.height=2*t,r.style.opacity=0
var o=e.getCSSDefinition(t+"px","normal"),a=r.getContext("2d")
a.font=o
var l="dbflkhyjqpg"
r.width=a.measureText(l).width,a.font=o
var h=i.createElement("div")
h.style.position="absolute",h.style.opacity=0,h.style.fontFamily='"'+e.name+'"',h.style.fontSize=t+"px",h.innerHTML=l+"<br/>"+l,i.body.appendChild(h)
var u=r.width,c=r.height,f=c/2
a.fillStyle="white",a.fillRect(0,0,u,c),a.fillStyle="black",a.fillText(l,0,f)
for(var p=a.getImageData(0,0,u,c).data,m=0,g=4*u,d=p.length;++m<d&&255===p[m];)s()
var v=Math.round(m/g)
for(m=d-1;--m>0&&255===p[m];)s()
var y=Math.round(m/g)
if(e.ascent=n*(f-v),e.descent=n*(y-f),i.defaultView.getComputedStyle){var A=i.defaultView.getComputedStyle(h,null).getPropertyValue("height")
A=n*A.replace("px",""),A>=2*e.size&&(e.leading=Math.round(A/2))}if(i.body.removeChild(h),e.caching)return a}function r(e,r){e===t&&(e=""),this.name=e,r===t&&(r=0),this.size=r,this.glyph=!1,this.ascent=0,this.descent=0,this.leading=1.2*r
var i=e.indexOf(" Italic Bold")
i!==-1&&(e=e.substring(0,i)),this.style="normal"
var s=e.indexOf(" Italic")
s!==-1&&(e=e.substring(0,s),this.style="italic"),this.weight="normal"
var o=e.indexOf(" Bold")
if(o!==-1&&(e=e.substring(0,o),this.weight="bold"),this.family="sans-serif",e!==t)switch(e){case"sans-serif":case"serif":case"monospace":case"fantasy":case"cursive":this.family=e
break
default:this.family='"'+e+'", sans-serif'}this.context2d=n(this),this.css=this.getCSSDefinition(),this.context2d&&(this.context2d.font=this.css)}var i=(e.Browser.window,e.Browser.document),s=e.noop
return r.prototype.caching=!0,r.prototype.getCSSDefinition=function(e,n){e===t&&(e=this.size+"px"),n===t&&(n=this.leading+"px")
var r=[this.style,"normal",this.weight,e+"/"+n,this.family]
return r.join(" ")},r.prototype.measureTextWidth=function(e){return this.context2d.measureText(e).width},r.prototype.measureTextWidthFallback=function(e){var t=i.createElement("canvas"),n=t.getContext("2d")
return n.font=this.css,n.measureText(e).width},r.PFontCache={length:0},r.get=function(e,t){t=(10*t+.5|0)/10
var n=r.PFontCache,i=e+"/"+t
if(!n[i]){if(n[i]=new r(e,t),n.length++,50===n.length){r.prototype.measureTextWidth=r.prototype.measureTextWidthFallback,r.prototype.caching=!1
var s
for(s in n)"length"!==s&&(n[s].context2d=null)
return new r(e,t)}if(400===n.length)return r.PFontCache={},r.get=r.getFallback,new r(e,t)}return n[i]},r.getFallback=function(e,t){return new r(e,t)},r.list=function(){return["sans-serif","serif","monospace","fantasy","cursive"]},r.preloading={template:{},initialized:!1,initialize:function(){var e=function(){var e="#E3KAI2wAgT1MvMg7Eo3VmNtYX7ABi3CxnbHlm7Abw3kaGVhZ7ACs3OGhoZWE7A53CRobXR47AY3AGbG9jYQ7G03Bm1heH7ABC3CBuYW1l7Ae3AgcG9zd7AI3AE#B3AQ2kgTY18PPPUACwAg3ALSRoo3#yld0xg32QAB77#E777773B#E3C#I#Q77773E#Q7777777772CMAIw7AB77732B#M#Q3wAB#g3B#E#E2BB//82BB////w#B7#gAEg3E77x2B32B#E#Q#MTcBAQ32gAe#M#QQJ#E32M#QQJ#I#g32Q77#",t=function(e){return"AAAAAAAA".substr(~~e?7-e:6)}
return e.replace(/[#237]/g,t)},t=i.createElement("style")
t.setAttribute("type","text/css"),t.innerHTML='@font-face {\n  font-family: "PjsEmptyFont";\n  src: url(\'data:application/x-font-ttf;base64,'+e()+"')\n       format('truetype');\n}",i.head.appendChild(t)
var n=i.createElement("span")
n.style.cssText='position: absolute; top: -1000; left: 0; opacity: 0; font-family: "PjsEmptyFont", fantasy;',n.innerHTML="AAAAAAAA",i.body.appendChild(n),this.template=n,this.initialized=!0},getElementWidth:function(e){return i.defaultView.getComputedStyle(e,"").getPropertyValue("width")},timeAttempted:0,pending:function(e){this.initialized||this.initialize()
for(var t,n,r=this.getElementWidth(this.template),s=0;s<this.fontList.length;s++){if(t=this.fontList[s],n=this.getElementWidth(t),this.timeAttempted<4e3&&n===r)return this.timeAttempted+=e,!0
i.body.removeChild(t),this.fontList.splice(s--,1),this.timeAttempted=0}return 0!==this.fontList.length},fontList:[],addedList:{},add:function(e){this.initialized||this.initialize()
var t="object"==typeof e?e.fontFace:e,n="object"==typeof e?e.url:e
if(!this.addedList[t]){var r=i.createElement("style")
r.setAttribute("type","text/css"),r.innerHTML="@font-face{\n  font-family: '"+t+"';\n  src:  url('"+n+"');\n}\n",i.head.appendChild(r),this.addedList[t]=!0
var s=i.createElement("span")
s.style.cssText="position: absolute; top: 0; left: 0; opacity: 0;",s.style.fontFamily='"'+t+'", "PjsEmptyFont", fantasy',s.innerHTML="AAAAAAAA",i.body.appendChild(s),this.fontList.push(s)}}},r}},{}],13:[function(e,t,n){t.exports=function(e,t){var n=e.p,r=function(){0===arguments.length?this.reset():1===arguments.length&&arguments[0]instanceof r?this.set(arguments[0].array()):6===arguments.length&&this.set(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])}
return r.prototype={set:function(){if(6===arguments.length){var e=arguments
this.set([e[0],e[1],e[2],e[3],e[4],e[5]])}else 1===arguments.length&&arguments[0]instanceof r?this.elements=arguments[0].array():1===arguments.length&&arguments[0]instanceof Array&&(this.elements=arguments[0].slice())},get:function(){var e=new r
return e.set(this.elements),e},reset:function(){this.set([1,0,0,0,1,0])},array:function(){return this.elements.slice()},translate:function(e,t){this.elements[2]=e*this.elements[0]+t*this.elements[1]+this.elements[2],this.elements[5]=e*this.elements[3]+t*this.elements[4]+this.elements[5]},invTranslate:function(e,t){this.translate(-e,-t)},transpose:function(){},mult:function(e,t){var n,r
return e instanceof PVector?(n=e.x,r=e.y,t||(t=new PVector)):e instanceof Array&&(n=e[0],r=e[1],t||(t=[])),t instanceof Array?(t[0]=this.elements[0]*n+this.elements[1]*r+this.elements[2],t[1]=this.elements[3]*n+this.elements[4]*r+this.elements[5]):t instanceof PVector&&(t.x=this.elements[0]*n+this.elements[1]*r+this.elements[2],t.y=this.elements[3]*n+this.elements[4]*r+this.elements[5],t.z=0),t},multX:function(e,t){return e*this.elements[0]+t*this.elements[1]+this.elements[2]},multY:function(e,t){return e*this.elements[3]+t*this.elements[4]+this.elements[5]},skewX:function(e){this.apply(1,0,1,e,0,0)},skewY:function(e){this.apply(1,0,1,0,e,0)},shearX:function(e){this.apply(1,0,1,Math.tan(e),0,0)},shearY:function(e){this.apply(1,0,1,0,Math.tan(e),0)},determinant:function(){return this.elements[0]*this.elements[4]-this.elements[1]*this.elements[3]},invert:function(){var e=this.determinant()
if(Math.abs(e)>PConstants.MIN_INT){var t=this.elements[0],n=this.elements[1],r=this.elements[2],i=this.elements[3],s=this.elements[4],o=this.elements[5]
return this.elements[0]=s/e,this.elements[3]=-i/e,this.elements[1]=-n/e,this.elements[4]=t/e,this.elements[2]=(n*o-s*r)/e,this.elements[5]=(i*r-t*o)/e,!0}return!1},scale:function(e,n){e&&n===t&&(n=e),e&&n&&(this.elements[0]*=e,this.elements[1]*=n,this.elements[3]*=e,this.elements[4]*=n)},invScale:function(e,t){e&&!t&&(t=e),this.scale(1/e,1/t)},apply:function(){var e
1===arguments.length&&arguments[0]instanceof r?e=arguments[0].array():6===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
for(var t=[0,0,this.elements[2],0,0,this.elements[5]],n=0,i=0;i<2;i++)for(var s=0;s<3;s++,n++)t[n]+=this.elements[3*i+0]*e[s+0]+this.elements[3*i+1]*e[s+3]
this.elements=t.slice()},preApply:function(){var e
1===arguments.length&&arguments[0]instanceof r?e=arguments[0].array():6===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
var t=[0,0,e[2],0,0,e[5]]
t[2]=e[2]+this.elements[2]*e[0]+this.elements[5]*e[1],t[5]=e[5]+this.elements[2]*e[3]+this.elements[5]*e[4],t[0]=this.elements[0]*e[0]+this.elements[3]*e[1],t[3]=this.elements[0]*e[3]+this.elements[3]*e[4],t[1]=this.elements[1]*e[0]+this.elements[4]*e[1],t[4]=this.elements[1]*e[3]+this.elements[4]*e[4],this.elements=t.slice()},rotate:function(e){var t=Math.cos(e),n=Math.sin(e),r=this.elements[0],i=this.elements[1]
this.elements[0]=t*r+n*i,this.elements[1]=-n*r+t*i,r=this.elements[3],i=this.elements[4],this.elements[3]=t*r+n*i,this.elements[4]=-n*r+t*i},rotateZ:function(e){this.rotate(e)},invRotateZ:function(e){this.rotateZ(e-Math.PI)},print:function(){var e=printMatrixHelper(this.elements),t=""+n.nfs(this.elements[0],e,4)+" "+n.nfs(this.elements[1],e,4)+" "+n.nfs(this.elements[2],e,4)+"\n"+n.nfs(this.elements[3],e,4)+" "+n.nfs(this.elements[4],e,4)+" "+n.nfs(this.elements[5],e,4)+"\n\n"
n.println(t)}},r}},{}],14:[function(e,t,n){t.exports=function(e,t){var n=e.p,r=function(){this.reset()}
return r.prototype={set:function(){16===arguments.length?this.elements=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof r?this.elements=arguments[0].array():1===arguments.length&&arguments[0]instanceof Array&&(this.elements=arguments[0].slice())},get:function(){var e=new r
return e.set(this.elements),e},reset:function(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},array:function(){return this.elements.slice()},translate:function(e,n,r){r===t&&(r=0),this.elements[3]+=e*this.elements[0]+n*this.elements[1]+r*this.elements[2],this.elements[7]+=e*this.elements[4]+n*this.elements[5]+r*this.elements[6],this.elements[11]+=e*this.elements[8]+n*this.elements[9]+r*this.elements[10],this.elements[15]+=e*this.elements[12]+n*this.elements[13]+r*this.elements[14]},transpose:function(){var e=this.elements[4]
this.elements[4]=this.elements[1],this.elements[1]=e,e=this.elements[8],this.elements[8]=this.elements[2],this.elements[2]=e,e=this.elements[6],this.elements[6]=this.elements[9],this.elements[9]=e,e=this.elements[3],this.elements[3]=this.elements[12],this.elements[12]=e,e=this.elements[7],this.elements[7]=this.elements[13],this.elements[13]=e,e=this.elements[11],this.elements[11]=this.elements[14],this.elements[14]=e},mult:function(e,t){var n,r,i,s
return e instanceof PVector?(n=e.x,r=e.y,i=e.z,s=1,t||(t=new PVector)):e instanceof Array&&(n=e[0],r=e[1],i=e[2],s=e[3]||1,(!t||3!==t.length&&4!==t.length)&&(t=[0,0,0])),t instanceof Array&&(3===t.length?(t[0]=this.elements[0]*n+this.elements[1]*r+this.elements[2]*i+this.elements[3],t[1]=this.elements[4]*n+this.elements[5]*r+this.elements[6]*i+this.elements[7],t[2]=this.elements[8]*n+this.elements[9]*r+this.elements[10]*i+this.elements[11]):4===t.length&&(t[0]=this.elements[0]*n+this.elements[1]*r+this.elements[2]*i+this.elements[3]*s,t[1]=this.elements[4]*n+this.elements[5]*r+this.elements[6]*i+this.elements[7]*s,t[2]=this.elements[8]*n+this.elements[9]*r+this.elements[10]*i+this.elements[11]*s,t[3]=this.elements[12]*n+this.elements[13]*r+this.elements[14]*i+this.elements[15]*s)),t instanceof PVector&&(t.x=this.elements[0]*n+this.elements[1]*r+this.elements[2]*i+this.elements[3],t.y=this.elements[4]*n+this.elements[5]*r+this.elements[6]*i+this.elements[7],t.z=this.elements[8]*n+this.elements[9]*r+this.elements[10]*i+this.elements[11]),t},preApply:function(){var e
1===arguments.length&&arguments[0]instanceof r?e=arguments[0].array():16===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
for(var t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0,i=0;i<4;i++)for(var s=0;s<4;s++,n++)t[n]+=this.elements[s+0]*e[4*i+0]+this.elements[s+4]*e[4*i+1]+this.elements[s+8]*e[4*i+2]+this.elements[s+12]*e[4*i+3]
this.elements=t.slice()},apply:function(){var e
1===arguments.length&&arguments[0]instanceof r?e=arguments[0].array():16===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
for(var t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0,i=0;i<4;i++)for(var s=0;s<4;s++,n++)t[n]+=this.elements[4*i+0]*e[s+0]+this.elements[4*i+1]*e[s+4]+this.elements[4*i+2]*e[s+8]+this.elements[4*i+3]*e[s+12]
this.elements=t.slice()},rotate:function(e,t,n,r){if(n){var i=Math.cos(e),s=Math.sin(e),o=1-i
this.apply(o*t*t+i,o*t*n-s*r,o*t*r+s*n,0,o*t*n+s*r,o*n*n+i,o*n*r-s*t,0,o*t*r-s*n,o*n*r+s*t,o*r*r+i,0,0,0,0,1)}else this.rotateZ(e)},invApply:function(){inverseCopy===t&&(inverseCopy=new r)
var e=arguments
return inverseCopy.set(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]),!!inverseCopy.invert()&&(this.preApply(inverseCopy),!0)},rotateX:function(e){var t=Math.cos(e),n=Math.sin(e)
this.apply([1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1])},rotateY:function(e){var t=Math.cos(e),n=Math.sin(e)
this.apply([t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1])},rotateZ:function(e){var t=Math.cos(e),n=Math.sin(e)
this.apply([t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1])},scale:function(e,n,r){e&&n===t&&r===t?n=r=e:e&&n&&r===t&&(r=1),e&&n&&r&&(this.elements[0]*=e,this.elements[1]*=n,this.elements[2]*=r,this.elements[4]*=e,this.elements[5]*=n,this.elements[6]*=r,this.elements[8]*=e,this.elements[9]*=n,this.elements[10]*=r,this.elements[12]*=e,this.elements[13]*=n,this.elements[14]*=r)},skewX:function(e){var t=Math.tan(e)
this.apply(1,t,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},skewY:function(e){var t=Math.tan(e)
this.apply(1,0,0,0,t,1,0,0,0,0,1,0,0,0,0,1)},shearX:function(e){var t=Math.tan(e)
this.apply(1,t,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},shearY:function(e){var t=Math.tan(e)
this.apply(1,0,0,0,t,1,0,0,0,0,1,0,0,0,0,1)},multX:function(e,t,n,r){return n?r?this.elements[0]*e+this.elements[1]*t+this.elements[2]*n+this.elements[3]*r:this.elements[0]*e+this.elements[1]*t+this.elements[2]*n+this.elements[3]:this.elements[0]*e+this.elements[1]*t+this.elements[3]},multY:function(e,t,n,r){return n?r?this.elements[4]*e+this.elements[5]*t+this.elements[6]*n+this.elements[7]*r:this.elements[4]*e+this.elements[5]*t+this.elements[6]*n+this.elements[7]:this.elements[4]*e+this.elements[5]*t+this.elements[7]},multZ:function(e,t,n,r){return r?this.elements[8]*e+this.elements[9]*t+this.elements[10]*n+this.elements[11]*r:this.elements[8]*e+this.elements[9]*t+this.elements[10]*n+this.elements[11]},multW:function(e,t,n,r){return r?this.elements[12]*e+this.elements[13]*t+this.elements[14]*n+this.elements[15]*r:this.elements[12]*e+this.elements[13]*t+this.elements[14]*n+this.elements[15]},invert:function(){var e=this.elements[0]*this.elements[5]-this.elements[1]*this.elements[4],t=this.elements[0]*this.elements[6]-this.elements[2]*this.elements[4],n=this.elements[0]*this.elements[7]-this.elements[3]*this.elements[4],r=this.elements[1]*this.elements[6]-this.elements[2]*this.elements[5],i=this.elements[1]*this.elements[7]-this.elements[3]*this.elements[5],s=this.elements[2]*this.elements[7]-this.elements[3]*this.elements[6],o=this.elements[8]*this.elements[13]-this.elements[9]*this.elements[12],a=this.elements[8]*this.elements[14]-this.elements[10]*this.elements[12],l=this.elements[8]*this.elements[15]-this.elements[11]*this.elements[12],h=this.elements[9]*this.elements[14]-this.elements[10]*this.elements[13],u=this.elements[9]*this.elements[15]-this.elements[11]*this.elements[13],c=this.elements[10]*this.elements[15]-this.elements[11]*this.elements[14],f=e*c-t*u+n*h+r*l-i*a+s*o
if(Math.abs(f)<=1e-9)return!1
var p=[]
p[0]=+this.elements[5]*c-this.elements[6]*u+this.elements[7]*h,p[4]=-this.elements[4]*c+this.elements[6]*l-this.elements[7]*a,p[8]=+this.elements[4]*u-this.elements[5]*l+this.elements[7]*o,p[12]=-this.elements[4]*h+this.elements[5]*a-this.elements[6]*o,p[1]=-this.elements[1]*c+this.elements[2]*u-this.elements[3]*h,p[5]=+this.elements[0]*c-this.elements[2]*l+this.elements[3]*a,p[9]=-this.elements[0]*u+this.elements[1]*l-this.elements[3]*o,p[13]=+this.elements[0]*h-this.elements[1]*a+this.elements[2]*o,p[2]=+this.elements[13]*s-this.elements[14]*i+this.elements[15]*r,p[6]=-this.elements[12]*s+this.elements[14]*n-this.elements[15]*t,p[10]=+this.elements[12]*i-this.elements[13]*n+this.elements[15]*e,p[14]=-this.elements[12]*r+this.elements[13]*t-this.elements[14]*e,p[3]=-this.elements[9]*s+this.elements[10]*i-this.elements[11]*r,p[7]=+this.elements[8]*s-this.elements[10]*n+this.elements[11]*t,p[11]=-this.elements[8]*i+this.elements[9]*n-this.elements[11]*e,p[15]=+this.elements[8]*r-this.elements[9]*t+this.elements[10]*e
var m=1/f
return p[0]*=m,p[1]*=m,p[2]*=m,p[3]*=m,p[4]*=m,p[5]*=m,p[6]*=m,p[7]*=m,p[8]*=m,p[9]*=m,p[10]*=m,p[11]*=m,p[12]*=m,p[13]*=m,p[14]*=m,p[15]*=m,this.elements=p.slice(),!0},toString:function(){for(var e="",t=0;t<15;t++)e+=this.elements[t]+", "
return e+=this.elements[15]},print:function(){var e=printMatrixHelper(this.elements),t=""+n.nfs(this.elements[0],e,4)+" "+n.nfs(this.elements[1],e,4)+" "+n.nfs(this.elements[2],e,4)+" "+n.nfs(this.elements[3],e,4)+"\n"+n.nfs(this.elements[4],e,4)+" "+n.nfs(this.elements[5],e,4)+" "+n.nfs(this.elements[6],e,4)+" "+n.nfs(this.elements[7],e,4)+"\n"+n.nfs(this.elements[8],e,4)+" "+n.nfs(this.elements[9],e,4)+" "+n.nfs(this.elements[10],e,4)+" "+n.nfs(this.elements[11],e,4)+"\n"+n.nfs(this.elements[12],e,4)+" "+n.nfs(this.elements[13],e,4)+" "+n.nfs(this.elements[14],e,4)+" "+n.nfs(this.elements[15],e,4)+"\n\n"
n.println(t)},invTranslate:function(e,t,n){this.preApply(1,0,0,-e,0,1,0,-t,0,0,1,-n,0,0,0,1)},invRotateX:function(e){var t=Math.cos(-e),n=Math.sin(-e)
this.preApply([1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1])},invRotateY:function(e){var t=Math.cos(-e),n=Math.sin(-e)
this.preApply([t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1])},invRotateZ:function(e){var t=Math.cos(-e),n=Math.sin(-e)
this.preApply([t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1])},invScale:function(e,t,n){this.preApply([1/e,0,0,0,0,1/t,0,0,0,0,1/n,0,0,0,0,1])}},r}},{}],15:[function(e,t,n){t.exports=function(e){var t=e.PConstants,n=e.PMatrix2D,r=e.PMatrix3D,i=function(e){this.family=e||t.GROUP,this.visible=!0,this.style=!0,this.children=[],this.nameTable=[],this.params=[],this.name="",this.image=null,this.matrix=null,this.kind=null,this.close=null,this.width=null,this.height=null,this.parent=null}
return i.prototype={isVisible:function(){return this.visible},setVisible:function(e){this.visible=e},disableStyle:function(){this.style=!1
for(var e=0,t=this.children.length;e<t;e++)this.children[e].disableStyle()},enableStyle:function(){this.style=!0
for(var e=0,t=this.children.length;e<t;e++)this.children[e].enableStyle()},getFamily:function(){return this.family},getWidth:function(){return this.width},getHeight:function(){return this.height},setName:function(e){this.name=e},getName:function(){return this.name},draw:function(e){if(!e)throw"render context missing for draw() in PShape"
this.visible&&(this.pre(e),this.drawImpl(e),this.post(e))},drawImpl:function(e){this.family===t.GROUP?this.drawGroup(e):this.family===t.PRIMITIVE?this.drawPrimitive(e):this.family===t.GEOMETRY?this.drawGeometry(e):this.family===t.PATH&&this.drawPath(e)},drawPath:function(e){var n,r
if(0!==this.vertices.length){if(e.beginShape(),0===this.vertexCodes.length)if(2===this.vertices[0].length)for(n=0,r=this.vertices.length;n<r;n++)e.vertex(this.vertices[n][0],this.vertices[n][1])
else for(n=0,r=this.vertices.length;n<r;n++)e.vertex(this.vertices[n][0],this.vertices[n][1],this.vertices[n][2])
else{var i=0
if(2===this.vertices[0].length)for(n=0,r=this.vertexCodes.length;n<r;n++)this.vertexCodes[n]===t.VERTEX?(e.vertex(this.vertices[i][0],this.vertices[i][1],this.vertices[i].moveTo),e.breakShape=!1,i++):this.vertexCodes[n]===t.BEZIER_VERTEX?(e.bezierVertex(this.vertices[i+0][0],this.vertices[i+0][1],this.vertices[i+1][0],this.vertices[i+1][1],this.vertices[i+2][0],this.vertices[i+2][1]),i+=3):this.vertexCodes[n]===t.CURVE_VERTEX?(e.curveVertex(this.vertices[i][0],this.vertices[i][1]),i++):this.vertexCodes[n]===t.BREAK&&(e.breakShape=!0)
else for(n=0,r=this.vertexCodes.length;n<r;n++)this.vertexCodes[n]===t.VERTEX?(e.vertex(this.vertices[i][0],this.vertices[i][1],this.vertices[i][2]),this.vertices[i].moveTo===!0?vertArray[vertArray.length-1].moveTo=!0:this.vertices[i].moveTo===!1&&(vertArray[vertArray.length-1].moveTo=!1),e.breakShape=!1):this.vertexCodes[n]===t.BEZIER_VERTEX?(e.bezierVertex(this.vertices[i+0][0],this.vertices[i+0][1],this.vertices[i+0][2],this.vertices[i+1][0],this.vertices[i+1][1],this.vertices[i+1][2],this.vertices[i+2][0],this.vertices[i+2][1],this.vertices[i+2][2]),i+=3):this.vertexCodes[n]===t.CURVE_VERTEX?(e.curveVertex(this.vertices[i][0],this.vertices[i][1],this.vertices[i][2]),i++):this.vertexCodes[n]===t.BREAK&&(e.breakShape=!0)}e.endShape(this.close?t.CLOSE:t.OPEN)}},drawGeometry:function(e){var t,n
if(e.beginShape(this.kind),this.style)for(t=0,n=this.vertices.length;t<n;t++)e.vertex(this.vertices[t])
else for(t=0,n=this.vertices.length;t<n;t++){var r=this.vertices[t]
0===r[2]?e.vertex(r[0],r[1]):e.vertex(r[0],r[1],r[2])}e.endShape()},drawGroup:function(e){for(var t=0,n=this.children.length;t<n;t++)this.children[t].draw(e)},drawPrimitive:function(e){if(this.kind===t.POINT)e.point(this.params[0],this.params[1])
else if(this.kind===t.LINE)4===this.params.length?e.line(this.params[0],this.params[1],this.params[2],this.params[3]):e.line(this.params[0],this.params[1],this.params[2],this.params[3],this.params[4],this.params[5])
else if(this.kind===t.TRIANGLE)e.triangle(this.params[0],this.params[1],this.params[2],this.params[3],this.params[4],this.params[5])
else if(this.kind===t.QUAD)e.quad(this.params[0],this.params[1],this.params[2],this.params[3],this.params[4],this.params[5],this.params[6],this.params[7])
else if(this.kind===t.RECT)if(null!==this.image){var n=imageModeConvert
e.imageMode(t.CORNER),e.image(this.image,this.params[0],this.params[1],this.params[2],this.params[3]),imageModeConvert=n}else{var r=e.curRectMode
e.rectMode(t.CORNER),e.rect(this.params[0],this.params[1],this.params[2],this.params[3]),e.curRectMode=r}else if(this.kind===t.ELLIPSE){var i=e.curEllipseMode
e.ellipseMode(t.CORNER),e.ellipse(this.params[0],this.params[1],this.params[2],this.params[3]),e.curEllipseMode=i}else if(this.kind===t.ARC){var s=curEllipseMode
e.ellipseMode(t.CORNER),e.arc(this.params[0],this.params[1],this.params[2],this.params[3],this.params[4],this.params[5]),curEllipseMode=s}else this.kind===t.BOX?1===this.params.length?e.box(this.params[0]):e.box(this.params[0],this.params[1],this.params[2]):this.kind===t.SPHERE&&e.sphere(this.params[0])},pre:function(e){this.matrix&&(e.pushMatrix(),e.transform(this.matrix)),this.style&&(e.pushStyle(),this.styles(e))},post:function(e){this.matrix&&e.popMatrix(),this.style&&e.popStyle()},styles:function(e){this.stroke?(e.stroke(this.strokeColor),e.strokeWeight(this.strokeWeight),e.strokeCap(this.strokeCap),e.strokeJoin(this.strokeJoin)):e.noStroke(),this.fill?e.fill(this.fillColor):e.noFill()},getChild:function(e){var t,n
if("number"==typeof e)return this.children[e]
var r
if(""===e||this.name===e)return this
if(this.nameTable.length>0){for(t=0,n=this.nameTable.length;t<n||r;t++)if(this.nameTable[t].getName===e){r=this.nameTable[t]
break}if(r)return r}for(t=0,n=this.children.length;t<n;t++)if(r=this.children[t].getChild(e))return r
return null},getChildCount:function(){return this.children.length},addChild:function(e){this.children.push(e),e.parent=this,null!==e.getName()&&this.addName(e.getName(),e)},addName:function(e,t){null!==this.parent?this.parent.addName(e,t):this.nameTable.push([e,t])},translate:function(){2===arguments.length?(this.checkMatrix(2),this.matrix.translate(arguments[0],arguments[1])):(this.checkMatrix(3),this.matrix.translate(arguments[0],arguments[1],0))},checkMatrix:function(e){null===this.matrix?2===e?this.matrix=new n:this.matrix=new r:3===e&&this.matrix instanceof n&&(this.matrix=new r)},rotateX:function(e){this.rotate(e,1,0,0)},rotateY:function(e){this.rotate(e,0,1,0)},rotateZ:function(e){this.rotate(e,0,0,1)},rotate:function(){1===arguments.length?(this.checkMatrix(2),this.matrix.rotate(arguments[0])):(this.checkMatrix(3),this.matrix.rotate(arguments[0],arguments[1],arguments[2],arguments[3]))},scale:function(){2===arguments.length?(this.checkMatrix(2),this.matrix.scale(arguments[0],arguments[1])):3===arguments.length?(this.checkMatrix(2),this.matrix.scale(arguments[0],arguments[1],arguments[2])):(this.checkMatrix(2),this.matrix.scale(arguments[0]))},resetMatrix:function(){this.checkMatrix(2),this.matrix.reset()},applyMatrix:function(e){1===arguments.length?this.applyMatrix(e.elements[0],e.elements[1],0,e.elements[2],e.elements[3],e.elements[4],0,e.elements[5],0,0,1,0,0,0,0,1):6===arguments.length?(this.checkMatrix(2),this.matrix.apply(arguments[0],arguments[1],arguments[2],0,arguments[3],arguments[4],arguments[5],0,0,0,1,0,0,0,0,1)):16===arguments.length&&(this.checkMatrix(3),this.matrix.apply(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9],arguments[10],arguments[11],arguments[12],arguments[13],arguments[14],arguments[15]))}},i}},{}],16:[function(e,t,n){t.exports=function(e){var t=e.CommonFunctions,n=e.PConstants,r=e.PShape,i=e.XMLElement,s=e.colors,o=function(){if(r.call(this),1===arguments.length){if(this.element=arguments[0],this.vertexCodes=[],this.vertices=[],this.opacity=1,this.stroke=!1,this.strokeColor=n.ALPHA_MASK,this.strokeWeight=1,this.strokeCap=n.SQUARE,this.strokeJoin=n.MITER,this.strokeGradient=null,this.strokeGradientPaint=null,this.strokeName=null,this.strokeOpacity=1,this.fill=!0,this.fillColor=n.ALPHA_MASK,this.fillGradient=null,this.fillGradientPaint=null,this.fillName=null,this.fillOpacity=1,"svg"!==this.element.getName())throw"root is not <svg>, it's <"+this.element.getName()+">"}else 2===arguments.length&&("string"==typeof arguments[1]?arguments[1].indexOf(".svg")>-1&&(this.element=new i((!0),arguments[1]),this.vertexCodes=[],this.vertices=[],this.opacity=1,this.stroke=!1,this.strokeColor=n.ALPHA_MASK,this.strokeWeight=1,this.strokeCap=n.SQUARE,this.strokeJoin=n.MITER,this.strokeGradient="",this.strokeGradientPaint="",this.strokeName="",this.strokeOpacity=1,this.fill=!0,this.fillColor=n.ALPHA_MASK,this.fillGradient=null,this.fillGradientPaint=null,this.fillOpacity=1):arguments[0]&&(this.element=arguments[1],this.vertexCodes=arguments[0].vertexCodes.slice(),this.vertices=arguments[0].vertices.slice(),this.stroke=arguments[0].stroke,this.strokeColor=arguments[0].strokeColor,this.strokeWeight=arguments[0].strokeWeight,this.strokeCap=arguments[0].strokeCap,this.strokeJoin=arguments[0].strokeJoin,this.strokeGradient=arguments[0].strokeGradient,this.strokeGradientPaint=arguments[0].strokeGradientPaint,this.strokeName=arguments[0].strokeName,this.fill=arguments[0].fill,this.fillColor=arguments[0].fillColor,this.fillGradient=arguments[0].fillGradient,this.fillGradientPaint=arguments[0].fillGradientPaint,this.fillName=arguments[0].fillName,this.strokeOpacity=arguments[0].strokeOpacity,this.fillOpacity=arguments[0].fillOpacity,this.opacity=arguments[0].opacity))
this.name=this.element.getStringAttribute("id")
var e=this.element.getStringAttribute("display","inline")
this.visible="none"!==e
var t=this.element.getAttribute("transform")
t&&(this.matrix=this.parseMatrix(t))
var s=this.element.getStringAttribute("viewBox")
if(null!==s){var o=s.split(" ")
this.width=o[2],this.height=o[3]}var a=this.element.getStringAttribute("width"),l=this.element.getStringAttribute("height")
if(null!==a)this.width=this.parseUnitSize(a),this.height=this.parseUnitSize(l)
else if(0===this.width||0===this.height)throw this.width=1,this.height=1,"The width and/or height is not readable in the <svg> tag of this file."
this.parseColors(this.element),this.parseChildren(this.element)}
return o.prototype=new r,o.prototype.parseMatrix=function(){function e(e){var t=[]
return e.replace(/\((.*?)\)/,function(){return function(e,n){t=n.replace(/,+/g," ").split(/\s+/)}}()),t}return function(n){this.checkMatrix(2)
var r=[]
if(n.replace(/\s*(\w+)\((.*?)\)/g,function(e){r.push(t.trim(e))}),0===r.length)return null
for(var i=0,s=r.length;i<s;i++){var o=e(r[i])
if(r[i].indexOf("matrix")!==-1)this.matrix.set(o[0],o[2],o[4],o[1],o[3],o[5])
else if(r[i].indexOf("translate")!==-1){var a=o[0],l=2===o.length?o[1]:0
this.matrix.translate(a,l)}else if(r[i].indexOf("scale")!==-1){var h=o[0],u=2===o.length?o[1]:o[0]
this.matrix.scale(h,u)}else if(r[i].indexOf("rotate")!==-1){var c=o[0]
1===o.length?this.matrix.rotate(t.radians(c)):3===o.length&&(this.matrix.translate(o[1],o[2]),this.matrix.rotate(t.radians(o[0])),this.matrix.translate(-o[1],-o[2]))}else r[i].indexOf("skewX")!==-1?this.matrix.skewX(parseFloat(o[0])):r[i].indexOf("skewY")!==-1?this.matrix.skewY(o[0]):r[i].indexOf("shearX")!==-1?this.matrix.shearX(o[0]):r[i].indexOf("shearY")!==-1&&this.matrix.shearY(o[0])}return this.matrix}}(),o.prototype.parseChildren=function(e){var t,n,i=e.getChildren(),s=new r
for(t=0,n=i.length;t<n;t++){var o=this.parseChild(i[t])
o&&s.addChild(o)}for(t=0,n=s.children.length;t<n;t++)this.children.push(s.children[t])},o.prototype.getName=function(){return this.name},o.prototype.parseChild=function(e){var t,n=e.getName()
return"g"===n?t=new o(this,e):"defs"===n?t=new o(this,e):"line"===n?(t=new o(this,e),t.parseLine()):"circle"===n?(t=new o(this,e),t.parseEllipse(!0)):"ellipse"===n?(t=new o(this,e),t.parseEllipse(!1)):"rect"===n?(t=new o(this,e),t.parseRect()):"polygon"===n?(t=new o(this,e),t.parsePoly(!0)):"polyline"===n?(t=new o(this,e),t.parsePoly(!1)):"path"===n?(t=new o(this,e),t.parsePath()):"radialGradient"===n?unimplemented("PShapeSVG.prototype.parseChild, name = radialGradient"):"linearGradient"===n?unimplemented("PShapeSVG.prototype.parseChild, name = linearGradient"):"text"===n?unimplemented("PShapeSVG.prototype.parseChild, name = text"):"filter"===n?unimplemented("PShapeSVG.prototype.parseChild, name = filter"):"mask"===n&&unimplemented("PShapeSVG.prototype.parseChild, name = mask"),t},o.prototype.parsePath=function(){this.family=n.PATH,this.kind=0
var e=t.trim(this.element.getStringAttribute("d").replace(/[\s,]+/g," "))
if(null!==e){e=e.split("")
for(var r,i,s,o,a=0,l=0,h=0,u=0,c=0,f=0,p=0,m=0,g=0,d=0,v=0,y=0,A=0,x=0,b=0,w=0,E="",S=[],P=!1;b<e.length;)if(w=e[b].charCodeAt(0),w>=65&&w<=90||w>=97&&w<=122){if(s=b,b++,b<e.length)for(S=[],w=e[b].charCodeAt(0);!(w>=65&&w<=90||w>=97&&w<=100||w>=102&&w<=122)&&P===!1;)32===w?(""!==E&&(S.push(parseFloat(E)),E=""),b++):45===w?101===e[b-1].charCodeAt(0)?(E+=e[b].toString(),b++):(""!==E&&S.push(parseFloat(E)),E=e[b].toString(),b++):(E+=e[b].toString(),b++),b===e.length?P=!0:w=e[b].charCodeAt(0)
if(""!==E&&(S.push(parseFloat(E)),E=""),i=e[s],w=i.charCodeAt(0),77===w){if(S.length>=2&&S.length%2===0&&(a=S[0],l=S[1],this.parsePathMoveto(a,l),S.length>2))for(s=2,o=S.length;s<o;s+=2)a=S[s],l=S[s+1],this.parsePathLineto(a,l)}else if(109===w){if(S.length>=2&&S.length%2===0&&(a+=S[0],l+=S[1],this.parsePathMoveto(a,l),S.length>2))for(s=2,o=S.length;s<o;s+=2)a+=S[s],l+=S[s+1],this.parsePathLineto(a,l)}else if(76===w){if(S.length>=2&&S.length%2===0)for(s=0,o=S.length;s<o;s+=2)a=S[s],l=S[s+1],this.parsePathLineto(a,l)}else if(108===w){if(S.length>=2&&S.length%2===0)for(s=0,o=S.length;s<o;s+=2)a+=S[s],l+=S[s+1],this.parsePathLineto(a,l)}else if(72===w)for(s=0,o=S.length;s<o;s++)a=S[s],this.parsePathLineto(a,l)
else if(104===w)for(s=0,o=S.length;s<o;s++)a+=S[s],this.parsePathLineto(a,l)
else if(86===w)for(s=0,o=S.length;s<o;s++)l=S[s],this.parsePathLineto(a,l)
else if(118===w)for(s=0,o=S.length;s<o;s++)l+=S[s],this.parsePathLineto(a,l)
else if(67===w){if(S.length>=6&&S.length%6===0)for(s=0,o=S.length;s<o;s+=6)c=S[s],p=S[s+1],f=S[s+2],m=S[s+3],g=S[s+4],d=S[s+5],this.parsePathCurveto(c,p,f,m,g,d),a=g,l=d}else if(99===w){if(S.length>=6&&S.length%6===0)for(s=0,o=S.length;s<o;s+=6)c=a+S[s],p=l+S[s+1],f=a+S[s+2],m=l+S[s+3],g=a+S[s+4],d=l+S[s+5],this.parsePathCurveto(c,p,f,m,g,d),a=g,l=d}else if(83===w){if(S.length>=4&&S.length%4===0)for(s=0,o=S.length;s<o;s+=4)"c"===r.toLowerCase()||"s"===r.toLowerCase()?(v=this.vertices[this.vertices.length-2][0],y=this.vertices[this.vertices.length-2][1],A=this.vertices[this.vertices.length-1][0],x=this.vertices[this.vertices.length-1][1],c=A+(A-v),p=x+(x-y)):(c=this.vertices[this.vertices.length-1][0],p=this.vertices[this.vertices.length-1][1]),f=S[s],m=S[s+1],g=S[s+2],d=S[s+3],this.parsePathCurveto(c,p,f,m,g,d),a=g,l=d}else if(115===w){if(S.length>=4&&S.length%4===0)for(s=0,o=S.length;s<o;s+=4)"c"===r.toLowerCase()||"s"===r.toLowerCase()?(v=this.vertices[this.vertices.length-2][0],y=this.vertices[this.vertices.length-2][1],A=this.vertices[this.vertices.length-1][0],x=this.vertices[this.vertices.length-1][1],c=A+(A-v),p=x+(x-y)):(c=this.vertices[this.vertices.length-1][0],p=this.vertices[this.vertices.length-1][1]),f=a+S[s],m=l+S[s+1],g=a+S[s+2],d=l+S[s+3],this.parsePathCurveto(c,p,f,m,g,d),a=g,l=d}else if(81===w){if(S.length>=4&&S.length%4===0)for(s=0,o=S.length;s<o;s+=4)h=S[s],u=S[s+1],g=S[s+2],d=S[s+3],this.parsePathQuadto(a,l,h,u,g,d),a=g,l=d}else if(113===w){if(S.length>=4&&S.length%4===0)for(s=0,o=S.length;s<o;s+=4)h=a+S[s],u=l+S[s+1],g=a+S[s+2],d=l+S[s+3],this.parsePathQuadto(a,l,h,u,g,d),a=g,l=d}else if(84===w){if(S.length>=2&&S.length%2===0)for(s=0,o=S.length;s<o;s+=2)"q"===r.toLowerCase()||"t"===r.toLowerCase()?(v=this.vertices[this.vertices.length-2][0],y=this.vertices[this.vertices.length-2][1],A=this.vertices[this.vertices.length-1][0],x=this.vertices[this.vertices.length-1][1],h=A+(A-v),u=x+(x-y)):(h=a,u=l),g=S[s],d=S[s+1],this.parsePathQuadto(a,l,h,u,g,d),a=g,l=d}else if(116===w){if(S.length>=2&&S.length%2===0)for(s=0,o=S.length;s<o;s+=2)"q"===r.toLowerCase()||"t"===r.toLowerCase()?(v=this.vertices[this.vertices.length-2][0],y=this.vertices[this.vertices.length-2][1],A=this.vertices[this.vertices.length-1][0],x=this.vertices[this.vertices.length-1][1],h=A+(A-v),u=x+(x-y)):(h=a,u=l),g=a+S[s],d=l+S[s+1],this.parsePathQuadto(a,l,h,u,g,d),a=g,l=d}else 90!==w&&122!==w||(this.close=!0)
r=i.toString()}else b++}},o.prototype.parsePathQuadto=function(e,t,r,i,s,o){if(!(this.vertices.length>0))throw"Path must start with M/m"
this.parsePathCode(n.BEZIER_VERTEX),this.parsePathVertex(e+2*(r-e)/3,t+2*(i-t)/3),this.parsePathVertex(s+2*(r-s)/3,o+2*(i-o)/3),this.parsePathVertex(s,o)},o.prototype.parsePathCurveto=function(e,t,r,i,s,o){if(!(this.vertices.length>0))throw"Path must start with M/m"
this.parsePathCode(n.BEZIER_VERTEX),this.parsePathVertex(e,t),this.parsePathVertex(r,i),this.parsePathVertex(s,o)},o.prototype.parsePathLineto=function(e,t){if(!(this.vertices.length>0))throw"Path must start with M/m"
this.parsePathCode(n.VERTEX),this.parsePathVertex(e,t),this.vertices[this.vertices.length-1].moveTo=!1},o.prototype.parsePathMoveto=function(e,t){this.vertices.length>0&&this.parsePathCode(n.BREAK),this.parsePathCode(n.VERTEX),this.parsePathVertex(e,t),this.vertices[this.vertices.length-1].moveTo=!0},o.prototype.parsePathVertex=function(e,t){var n=[]
n[0]=e,n[1]=t,this.vertices.push(n)},o.prototype.parsePathCode=function(e){this.vertexCodes.push(e)},o.prototype.parsePoly=function(e){this.family=n.PATH,this.close=e
var r=t.trim(this.element.getStringAttribute("points").replace(/[,\s]+/g," "))
if(null!==r){var i=r.split(" ")
if(i.length%2!==0)throw"Error parsing polygon points: odd number of coordinates provided"
for(var s=0,o=i.length;s<o;s++){var a=[]
a[0]=i[s],a[1]=i[++s],this.vertices.push(a)}}},o.prototype.parseRect=function(){if(this.kind=n.RECT,this.family=n.PRIMITIVE,this.params=[],this.params[0]=this.element.getFloatAttribute("x"),this.params[1]=this.element.getFloatAttribute("y"),this.params[2]=this.element.getFloatAttribute("width"),this.params[3]=this.element.getFloatAttribute("height"),this.params[2]<0||this.params[3]<0)throw"svg error: negative width or height found while parsing <rect>"},o.prototype.parseEllipse=function(e){this.kind=n.ELLIPSE,this.family=n.PRIMITIVE,this.params=[],this.params[0]=0|this.element.getFloatAttribute("cx"),this.params[1]=0|this.element.getFloatAttribute("cy")
var t,r
if(e){if(t=r=this.element.getFloatAttribute("r"),t<0)throw"svg error: negative radius found while parsing <circle>"}else if(t=this.element.getFloatAttribute("rx"),r=this.element.getFloatAttribute("ry"),t<0||r<0)throw"svg error: negative x-axis radius or y-axis radius found while parsing <ellipse>"
this.params[0]-=t,this.params[1]-=r,this.params[2]=2*t,this.params[3]=2*r},o.prototype.parseLine=function(){this.kind=n.LINE,this.family=n.PRIMITIVE,this.params=[],this.params[0]=this.element.getFloatAttribute("x1"),this.params[1]=this.element.getFloatAttribute("y1"),this.params[2]=this.element.getFloatAttribute("x2"),this.params[3]=this.element.getFloatAttribute("y2")},o.prototype.parseColors=function(e){if(e.hasAttribute("opacity")&&this.setOpacity(e.getAttribute("opacity")),e.hasAttribute("stroke")&&this.setStroke(e.getAttribute("stroke")),e.hasAttribute("stroke-width")&&this.setStrokeWeight(e.getAttribute("stroke-width")),e.hasAttribute("stroke-linejoin")&&this.setStrokeJoin(e.getAttribute("stroke-linejoin")),e.hasAttribute("stroke-linecap")&&this.setStrokeCap(e.getStringAttribute("stroke-linecap")),e.hasAttribute("fill")&&this.setFill(e.getStringAttribute("fill")),e.hasAttribute("style"))for(var n=e.getStringAttribute("style"),r=n.toString().split(";"),i=0,s=r.length;i<s;i++){var o=t.trim(r[i].split(":"))
"fill"===o[0]?this.setFill(o[1]):"fill-opacity"===o[0]?this.setFillOpacity(o[1]):"stroke"===o[0]?this.setStroke(o[1]):"stroke-width"===o[0]?this.setStrokeWeight(o[1]):"stroke-linecap"===o[0]?this.setStrokeCap(o[1]):"stroke-linejoin"===o[0]?this.setStrokeJoin(o[1]):"stroke-opacity"===o[0]?this.setStrokeOpacity(o[1]):"opacity"===o[0]&&this.setOpacity(o[1])}},o.prototype.setFillOpacity=function(e){this.fillOpacity=parseFloat(e),this.fillColor=255*this.fillOpacity<<24|16777215&this.fillColor},o.prototype.setFill=function(e){var t=4278190080&this.fillColor
"none"===e?this.fill=!1:0===e.indexOf("#")?(this.fill=!0,4===e.length&&(e=e.replace(/#(.)(.)(.)/,"#$1$1$2$2$3$3")),this.fillColor=t|16777215&parseInt(e.substring(1),16)):0===e.indexOf("rgb")?(this.fill=!0,this.fillColor=t|this.parseRGB(e)):0===e.indexOf("url(#")?this.fillName=e.substring(5,e.length-1):s[e]&&(this.fill=!0,this.fillColor=t|16777215&parseInt(s[e].substring(1),16))},o.prototype.setOpacity=function(e){this.strokeColor=255*parseFloat(e)<<24|16777215&this.strokeColor,this.fillColor=255*parseFloat(e)<<24|16777215&this.fillColor},o.prototype.setStroke=function(e){var t=4278190080&this.strokeColor
"none"===e?this.stroke=!1:"#"===e.charAt(0)?(this.stroke=!0,4===e.length&&(e=e.replace(/#(.)(.)(.)/,"#$1$1$2$2$3$3")),this.strokeColor=t|16777215&parseInt(e.substring(1),16)):0===e.indexOf("rgb")?(this.stroke=!0,this.strokeColor=t|this.parseRGB(e)):0===e.indexOf("url(#")?this.strokeName=e.substring(5,e.length-1):s[e]&&(this.stroke=!0,this.strokeColor=t|16777215&parseInt(s[e].substring(1),16))},o.prototype.setStrokeWeight=function(e){this.strokeWeight=this.parseUnitSize(e)},o.prototype.setStrokeJoin=function(e){"miter"===e?this.strokeJoin=n.MITER:"round"===e?this.strokeJoin=n.ROUND:"bevel"===e&&(this.strokeJoin=n.BEVEL)},o.prototype.setStrokeCap=function(e){"butt"===e?this.strokeCap=n.SQUARE:"round"===e?this.strokeCap=n.ROUND:"square"===e&&(this.strokeCap=n.PROJECT)},o.prototype.setStrokeOpacity=function(e){this.strokeOpacity=parseFloat(e),this.strokeColor=255*this.strokeOpacity<<24|16777215&this.strokeColor},o.prototype.parseRGB=function(e){var t=e.substring(e.indexOf("(")+1,e.indexOf(")")),n=t.split(", ")
return n[0]<<16|n[1]<<8|n[2]},o.prototype.parseUnitSize=function(e){var t=e.length-2
return t<0?e:e.indexOf("pt")===t?1.25*parseFloat(e.substring(0,t)):e.indexOf("pc")===t?15*parseFloat(e.substring(0,t)):e.indexOf("mm")===t?3.543307*parseFloat(e.substring(0,t)):e.indexOf("cm")===t?35.43307*parseFloat(e.substring(0,t)):e.indexOf("in")===t?90*parseFloat(e.substring(0,t)):e.indexOf("px")===t?parseFloat(e.substring(0,t)):parseFloat(e)},o}},{}],17:[function(e,t,n){t.exports=function(e,t){function n(e,t,n){this.x=e||0,this.y=t||0,this.z=n||0}function r(e){return function(t,n){var r=t.get()
return r[e](n),r}}var i=e.PConstants
n.fromAngle=function(e,r){return r!==t&&null!==r||(r=new n),r.x=Math.cos(e),r.y=Math.sin(e),r},n.random2D=function(e){return n.fromAngle(Math.random()*i.TWO_PI,e)},n.random3D=function(e){var r=Math.random()*i.TWO_PI,s=2*Math.random()-1,o=Math.sqrt(1-s*s),a=o*Math.cos(r),l=o*Math.sin(r)
return e===t||null===e?e=new n(a,l,s):e.set(a,l,s),e},n.dist=function(e,t){return e.dist(t)},n.dot=function(e,t){return e.dot(t)},n.cross=function(e,t){return e.cross(t)},n.sub=function(e,t){return new n(e.x-t.x,e.y-t.y,e.z-t.z)},n.angleBetween=function(e,t){return Math.acos(e.dot(t)/Math.sqrt(e.magSq()*t.magSq()))},n.lerp=function(e,t,r){var i=new n(e.x,e.y,e.z)
return i.lerp(t,r),i},n.prototype={set:function(e,t,n){1===arguments.length?this.set(e.x||e[0]||0,e.y||e[1]||0,e.z||e[2]||0):(this.x=e,this.y=t,this.z=n)},get:function(){return new n(this.x,this.y,this.z)},mag:function(){var e=this.x,t=this.y,n=this.z
return Math.sqrt(e*e+t*t+n*n)},magSq:function(){var e=this.x,t=this.y,n=this.z
return e*e+t*t+n*n},setMag:function(e,n){if(n!==t){var r=e
return r.normalize(),r.mult(n),r}n=e,this.normalize(),this.mult(n)},add:function(e,t,n){1===arguments.length?(this.x+=e.x,this.y+=e.y,this.z+=e.z):2===arguments.length?(this.x+=e,this.y+=t):(this.x+=e,this.y+=t,this.z+=n)},sub:function(e,t,n){1===arguments.length?(this.x-=e.x,this.y-=e.y,this.z-=e.z):2===arguments.length?(this.x-=e,this.y-=t):(this.x-=e,this.y-=t,this.z-=n)},mult:function(e){"number"==typeof e?(this.x*=e,this.y*=e,this.z*=e):(this.x*=e.x,this.y*=e.y,this.z*=e.z)},div:function(e){"number"==typeof e?(this.x/=e,this.y/=e,this.z/=e):(this.x/=e.x,this.y/=e.y,this.z/=e.z)},rotate:function(e){var t=this.x,n=Math.cos(e),r=Math.sin(e)
this.x=n*this.x-r*this.y,this.y=r*t+n*this.y},dist:function(e){var t=this.x-e.x,n=this.y-e.y,r=this.z-e.z
return Math.sqrt(t*t+n*n+r*r)},dot:function(e,t,n){return 1===arguments.length?this.x*e.x+this.y*e.y+this.z*e.z:this.x*e+this.y*t+this.z*n},cross:function(e){var t=this.x,r=this.y,i=this.z
return new n(r*e.z-e.y*i,i*e.x-e.z*t,t*e.y-e.x*r)},lerp:function(e,t,n,r){var i,s,o=function(e,t,n){return e+(t-e)*n}
2===arguments.length?(r=t,i=e.x,s=e.y,n=e.z):(i=e,s=t),this.x=o(this.x,i,r),this.y=o(this.y,s,r),this.z=o(this.z,n,r)},normalize:function(){var e=this.mag()
e>0&&this.div(e)},limit:function(e){this.mag()>e&&(this.normalize(),this.mult(e))},heading:function(){return-Math.atan2(-this.y,this.x)},heading2D:function(){return this.heading()},toString:function(){return"["+this.x+", "+this.y+", "+this.z+"]"},array:function(){return[this.x,this.y,this.z]}}
for(var s in n.prototype)n.prototype.hasOwnProperty(s)&&!n.hasOwnProperty(s)&&(n[s]=r(s))
return n}},{}],18:[function(e,t,n){t.exports=function(){var e=function(e,t,n,r,i){this.fullName=e||"",this.name=t||"",this.namespace=n||"",this.value=r,this.type=i}
return e.prototype={getName:function(){return this.name},getFullName:function(){return this.fullName},getNamespace:function(){return this.namespace},getValue:function(){return this.value},getType:function(){return this.type},setValue:function(e){this.value=e}},e}},{}],19:[function(e,t,n){t.exports=function(e,t){var n=e.Browser,r=n.ajax,i=n.window,s=(i.XMLHttpRequest,i.DOMParser),o=e.XMLAttribute,a=function(e,n,r,i){this.attributes=[],this.children=[],this.fullName=null,this.name=null,this.namespace="",this.content=null,this.parent=null,this.lineNr="",this.systemID="",this.type="ELEMENT",e&&("string"==typeof e?n===t&&e.indexOf("<")>-1?this.parse(e):(this.fullName=e,this.namespace=n,this.systemId=r,this.lineNr=i):this.parse(n,!0))}
return a.prototype={parse:function(e,t){var n
try{t&&(e=r(e)),n=(new s).parseFromString(e,"text/xml")
var i=n.documentElement
if(!i)throw"Error loading document"
return this.parseChildrenRecursive(null,i),this}catch(e){throw e}},parseChildrenRecursive:function(e,t){var n,r,i,s,l,h
if(e?(n=new a(t.nodeName),n.parent=e):(this.fullName=t.localName,this.name=t.nodeName,n=this),3===t.nodeType&&""!==t.textContent)return this.createPCDataElement(t.textContent)
if(4===t.nodeType)return this.createCDataElement(t.textContent)
if(t.attributes)for(s=0,l=t.attributes.length;s<l;s++)i=t.attributes[s],r=new o(i.getname,i.nodeName,i.namespaceURI,i.nodeValue,i.nodeType),n.attributes.push(r)
if(t.childNodes)for(s=0,l=t.childNodes.length;s<l;s++){var u=t.childNodes[s]
h=n.parseChildrenRecursive(n,u),null!==h&&n.children.push(h)}return n},createElement:function(e,n,r,i){return r===t?new a(e,n):new a(e,n,r,i)},createPCDataElement:function(e,t){if(""===e.replace(/^\s+$/g,""))return null
var n=new a
return n.type="TEXT",n.content=e,n},createCDataElement:function(e){var t=this.createPCDataElement(e)
if(null===t)return null
t.type="CDATA"
var n,r={"<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}
for(n in r)Object.hasOwnProperty(r,n)||(e=e.replace(new RegExp(n,"g"),r[n]))
return t.cdata=e,t},hasAttribute:function(){return 1===arguments.length?null!==this.getAttribute(arguments[0]):2===arguments.length?null!==this.getAttribute(arguments[0],arguments[1]):void 0},equals:function(e){if(!(e instanceof a))return!1
var t,n
if(this.fullName!==e.fullName)return!1
if(this.attributes.length!==e.getAttributeCount())return!1
if(this.attributes.length!==e.attributes.length)return!1
var r,i,s
for(t=0,n=this.attributes.length;t<n;t++){if(r=this.attributes[t].getName(),i=this.attributes[t].getNamespace(),s=e.findAttribute(r,i),null===s)return!1
if(this.attributes[t].getValue()!==s.getValue())return!1
if(this.attributes[t].getType()!==s.getType())return!1}if(this.children.length!==e.getChildCount())return!1
if(this.children.length>0){var o,l
for(t=0,n=this.children.length;t<n;t++)if(o=this.getChild(t),l=e.getChild(t),!o.equals(l))return!1
return!0}return this.content===e.content},getContent:function(){if("TEXT"===this.type||"CDATA"===this.type)return this.content
var e=this.children
return 1!==e.length||"TEXT"!==e[0].type&&"CDATA"!==e[0].type?null:e[0].content},getAttribute:function(){var e
return 2===arguments.length?(e=this.findAttribute(arguments[0]),e?e.getValue():arguments[1]):1===arguments.length?(e=this.findAttribute(arguments[0]),e?e.getValue():null):3===arguments.length?(e=this.findAttribute(arguments[0],arguments[1]),e?e.getValue():arguments[2]):void 0},getStringAttribute:function(){return 1===arguments.length?this.getAttribute(arguments[0]):2===arguments.length?this.getAttribute(arguments[0],arguments[1]):this.getAttribute(arguments[0],arguments[1],arguments[2])},getString:function(e){return this.getStringAttribute(e)},getFloatAttribute:function(){return 1===arguments.length?parseFloat(this.getAttribute(arguments[0],0)):2===arguments.length?this.getAttribute(arguments[0],arguments[1]):this.getAttribute(arguments[0],arguments[1],arguments[2])},getFloat:function(e){return this.getFloatAttribute(e)},getIntAttribute:function(){return 1===arguments.length?this.getAttribute(arguments[0],0):2===arguments.length?this.getAttribute(arguments[0],arguments[1]):this.getAttribute(arguments[0],arguments[1],arguments[2])},getInt:function(e){return this.getIntAttribute(e)},hasChildren:function(){return this.children.length>0},addChild:function(e){null!==e&&(e.parent=this,this.children.push(e))},insertChild:function(e,t){if(e){if(null===e.getLocalName()&&!this.hasChildren()){var n=this.children[this.children.length-1]
if(null===n.getLocalName())return void n.setContent(n.getContent()+e.getContent())}e.parent=this,this.children.splice(t,0,e)}},getChild:function(e){if("number"==typeof e)return this.children[e]
if(e.indexOf("/")!==-1)return this.getChildRecursive(e.split("/"),0)
for(var t,n,r=0,i=this.getChildCount();r<i;r++)if(t=this.getChild(r),n=t.getName(),null!==n&&n===e)return t
return null},getChildren:function(){if(1===arguments.length){if("number"==typeof arguments[0])return this.getChild(arguments[0])
if(arguments[0].indexOf("/")!==-1)return this.getChildrenRecursive(arguments[0].split("/"),0)
for(var e,t,n=[],r=0,i=this.getChildCount();r<i;r++)e=this.getChild(r),t=e.getName(),null!==t&&t===arguments[0]&&n.push(e)
return n}return this.children},getChildCount:function(){return this.children.length},getChildRecursive:function(e,t){if(t===e.length)return this
for(var n,r,i=e[t],s=0,o=this.getChildCount();s<o;s++)if(n=this.getChild(s),r=n.getName(),null!==r&&r===i)return n.getChildRecursive(e,t+1)
return null},getChildrenRecursive:function(e,t){if(t===e.length-1)return this.getChildren(e[t])
for(var n=this.getChildren(e[t]),r=[],i=0;i<n.length;i++)r=r.concat(n[i].getChildrenRecursive(e,t+1))
return r},isLeaf:function(){return!this.hasChildren()},listChildren:function(){for(var e=[],t=0,n=this.children.length;t<n;t++)e.push(this.getChild(t).getName())
return e},removeAttribute:function(e,t){this.namespace=t||""
for(var n=0,r=this.attributes.length;n<r;n++)if(this.attributes[n].getName()===e&&this.attributes[n].getNamespace()===this.namespace){this.attributes.splice(n,1)
break}},removeChild:function(e){if(e)for(var t=0,n=this.children.length;t<n;t++)if(this.children[t].equals(e)){this.children.splice(t,1)
break}},removeChildAtIndex:function(e){this.children.length>e&&this.children.splice(e,1)},findAttribute:function(e,t){this.namespace=t||""
for(var n=0,r=this.attributes.length;n<r;n++)if(this.attributes[n].getName()===e&&this.attributes[n].getNamespace()===this.namespace)return this.attributes[n]
return null},setAttribute:function(){var e
if(3===arguments.length){var t=arguments[0].indexOf(":"),n=arguments[0].substring(t+1)
e=this.findAttribute(n,arguments[1]),e?e.setValue(arguments[2]):(e=new o(arguments[0],n,arguments[1],arguments[2],"CDATA"),this.attributes.push(e))}else e=this.findAttribute(arguments[0]),e?e.setValue(arguments[1]):(e=new o(arguments[0],arguments[0],null,arguments[1],"CDATA"),this.attributes.push(e))},setString:function(e,t){this.setAttribute(e,t)},setInt:function(e,t){this.setAttribute(e,t)},setFloat:function(e,t){this.setAttribute(e,t)},setContent:function(e){this.children.length>0&&Processing.debug("Tried to set content for XMLElement with children"),this.content=e},setName:function(){if(1===arguments.length)this.name=arguments[0],this.fullName=arguments[0],this.namespace=null
else{var e=arguments[0].indexOf(":")
null===arguments[1]||e<0?this.name=arguments[0]:this.name=arguments[0].substring(e+1),this.fullName=arguments[0],this.namespace=arguments[1]}},getName:function(){return this.fullName},getLocalName:function(){return this.name},getAttributeCount:function(){return this.attributes.length},toString:function(){if("TEXT"===this.type)return this.content||""
if("CDATA"===this.type)return this.cdata||""
var e,t,n=this.fullName,r="<"+n
for(e=0;e<this.attributes.length;e++){var i=this.attributes[e]
r+=" "+i.getName()+'="'+i.getValue()+'"'}if(0===this.children.length)r+=""===this.content||null===this.content||void 0===this.content?"/>":">"+this.content+"</"+n+">"
else{for(r+=">",t=0;t<this.children.length;t++)r+=this.children[t].toString()
r+="</"+n+">"}return r}},a.parse=function(e){var t=new a
return t.parse(e),t},a}},{}],20:[function(e,t,n){t.exports={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"}},{}],21:[function(e,t,n){t.exports=function(e,t,n){return function(r,i){r.__contains=function(e,t){return"string"!=typeof e?e.contains.apply(e,i(arguments)):null!==e&&null!==t&&"string"==typeof t&&e.indexOf(t)>-1},r.__replaceAll=function(e,t,n){return"string"!=typeof e?e.replaceAll.apply(e,i(arguments)):e.replace(new RegExp(t,"g"),n)},r.__replaceFirst=function(e,t,n){return"string"!=typeof e?e.replaceFirst.apply(e,i(arguments)):e.replace(new RegExp(t,""),n)},r.__replace=function(e,t,n){if("string"!=typeof e)return e.replace.apply(e,i(arguments))
if(t instanceof RegExp)return e.replace(t,n)
if("string"!=typeof t&&(t=t.toString()),""===t)return e
var r=e.indexOf(t)
if(r<0)return e
var s=0,o=""
do o+=e.substring(s,r)+n,s=r+t.length
while((r=e.indexOf(t,s))>=0)
return o+e.substring(s)},r.__equals=function(e,n){return e.equals instanceof Function?e.equals.apply(e,i(arguments)):t(e,n)},r.__equalsIgnoreCase=function(e,t){return"string"!=typeof e?e.equalsIgnoreCase.apply(e,i(arguments)):e.toLowerCase()===t.toLowerCase()},r.__toCharArray=function(e){if("string"!=typeof e)return e.toCharArray.apply(e,i(arguments))
for(var t=[],n=0,r=e.length;n<r;++n)t[n]=new Char(e.charAt(n))
return t},r.__split=function(e,t,r){if("string"!=typeof e)return e.split.apply(e,i(arguments))
var s=new RegExp(t)
if(r===n||r<1)return e.split(s)
for(var o,a=[],l=e;(o=l.search(s))!==-1&&a.length<r-1;){var h=s.exec(l).toString()
a.push(l.substring(0,o)),l=l.substring(o+h.length)}return o===-1&&""===l||a.push(l),a},r.__codePointAt=function(e,t){var n,r,i=e.charCodeAt(t)
return 55296<=i&&i<=56319?(n=i,r=e.charCodeAt(t+1),1024*(n-55296)+(r-56320)+65536):i},r.__matches=function(e,t){return new RegExp(t).test(e)},r.__startsWith=function(e,t,n){return"string"!=typeof e?e.startsWith.apply(e,i(arguments)):(n=n||0,!(n<0||n>e.length)&&(""===t||t===e||e.indexOf(t)===n))},r.__endsWith=function(e,t){if("string"!=typeof e)return e.endsWith.apply(e,i(arguments))
var n=t?t.length:0
return""===t||t===e||e.indexOf(t)===e.length-n},r.__hashCode=function(t){return t.hashCode instanceof Function?t.hashCode.apply(t,i(arguments)):e(t)},r.__printStackTrace=function(e){r.println("Exception: "+e.toString())}}}},{}],22:[function(e,t,n){t.exports=function(e,t){function n(e,t){var n=e||362436069,r=t||521288629,i=function(){return n=36969*(65535&n)+(n>>>16)&4294967295,r=18e3*(65535&r)+(r>>>16)&4294967295,4294967295&((65535&n)<<16|65535&r)}
this.doubleGenerator=function(){var e=i()/4294967296
return e<0?1+e:e},this.intGenerator=i}function r(e){function r(e,t,n,r){var i=15&e,s=i<8?t:n,o=i<4?n:12===i||14===i?t:r
return(0===(1&i)?s:-s)+(0===(2&i)?o:-o)}function i(e,t,n){var r=0===(1&e)?t:n
return 0===(2&e)?-r:r}function s(e,t){return 0===(1&e)?-t:t}function o(e,t,n){return t+e*(n-t)}var a,l,h=e!==t?new n(e,(e<<16)+(e>>16)):n.createRandomized(),u=new Uint8Array(512)
for(a=0;a<256;++a)u[a]=a
for(a=0;a<256;++a){var c=u[l=255&h.intGenerator()]
u[l]=u[a],u[a]=c}for(a=0;a<256;++a)u[a+256]=u[a]
this.noise3d=function(e,t,n){var i=255&Math.floor(e),s=255&Math.floor(t),a=255&Math.floor(n)
e-=Math.floor(e),t-=Math.floor(t),n-=Math.floor(n)
var l=(3-2*e)*e*e,h=(3-2*t)*t*t,c=(3-2*n)*n*n,f=u[i]+s,p=u[f]+a,m=u[f+1]+a,g=u[i+1]+s,d=u[g]+a,v=u[g+1]+a
return o(c,o(h,o(l,r(u[p],e,t,n),r(u[d],e-1,t,n)),o(l,r(u[m],e,t-1,n),r(u[v],e-1,t-1,n))),o(h,o(l,r(u[p+1],e,t,n-1),r(u[d+1],e-1,t,n-1)),o(l,r(u[m+1],e,t-1,n-1),r(u[v+1],e-1,t-1,n-1))))},this.noise2d=function(e,t){var n=255&Math.floor(e),r=255&Math.floor(t)
e-=Math.floor(e),t-=Math.floor(t)
var s=(3-2*e)*e*e,a=(3-2*t)*t*t,l=u[n]+r,h=u[n+1]+r
return o(a,o(s,i(u[l],e,t),i(u[h],e-1,t)),o(s,i(u[l+1],e,t-1),i(u[h+1],e-1,t-1)))},this.noise1d=function(e){var t=255&Math.floor(e)
e-=Math.floor(e)
var n=(3-2*e)*e*e
return o(n,s(u[t],e),s(u[t+1],e-1))}}var i=function(){return Math.random()}
e.abs=Math.abs,e.ceil=Math.ceil,e.exp=Math.exp,e.floor=Math.floor,e.log=Math.log,e.pow=Math.pow,e.round=Math.round,e.sqrt=Math.sqrt,e.acos=Math.acos,e.asin=Math.asin,e.atan=Math.atan,e.atan2=Math.atan2,e.cos=Math.cos,e.sin=Math.sin,e.tan=Math.tan,e.constrain=function(e,t,n){return e>n?n:e<t?t:e},e.dist=function(){var e,t,n
return 4===arguments.length?(e=arguments[0]-arguments[2],t=arguments[1]-arguments[3],Math.sqrt(e*e+t*t)):6===arguments.length?(e=arguments[0]-arguments[3],t=arguments[1]-arguments[4],n=arguments[2]-arguments[5],Math.sqrt(e*e+t*t+n*n)):void 0},e.lerp=function(e,t,n){return(t-e)*n+e},e.mag=function(e,t,n){return n?Math.sqrt(e*e+t*t+n*n):Math.sqrt(e*e+t*t)},e.map=function(e,t,n,r,i){return r+(i-r)*((e-t)/(n-t))},e.max=function(){if(2===arguments.length)return arguments[0]<arguments[1]?arguments[1]:arguments[0]
var e=1===arguments.length?arguments[0]:arguments
if(!("length"in e&&e.length>0))throw"Non-empty array is expected"
for(var t=e[0],n=e.length,r=1;r<n;++r)t<e[r]&&(t=e[r])
return t},e.min=function(){if(2===arguments.length)return arguments[0]<arguments[1]?arguments[0]:arguments[1]
var e=1===arguments.length?arguments[0]:arguments
if(!("length"in e&&e.length>0))throw"Non-empty array is expected"
for(var t=e[0],n=e.length,r=1;r<n;++r)t>e[r]&&(t=e[r])
return t},e.norm=function(e,t,n){return(e-t)/(n-t)},e.sq=function(e){return e*e},e.degrees=function(e){return 180*e/Math.PI},e.random=function(){if(0===arguments.length)return i()
if(1===arguments.length)return i()*arguments[0]
var e=arguments[0],t=arguments[1]
if(e===t)return e
for(var n=0;n<100;n++){var r=i(),s=r*(t-e)+e
if(s!==t)return s}return e},n.createRandomized=function(){var e=new Date
return new n(e/6e4&4294967295,4294967295&e)},e.randomSeed=function(e){i=new n(e,(e<<16)+(e>>16)).doubleGenerator,this.haveNextNextGaussian=!1},e.randomGaussian=function(){if(this.haveNextNextGaussian)return this.haveNextNextGaussian=!1,this.nextNextGaussian
var e,t,n
do e=2*i()-1,t=2*i()-1,n=e*e+t*t
while(n>=1||0===n)
var r=Math.sqrt(-2*Math.log(n)/n)
return this.nextNextGaussian=t*r,this.haveNextNextGaussian=!0,e*r}
var s={generator:t,octaves:4,fallout:.5,seed:t}
e.noise=function(e,n,i){s.generator===t&&(s.generator=new r(s.seed))
for(var o=s.generator,a=1,l=1,h=0,u=0;u<s.octaves;++u){switch(a*=s.fallout,arguments.length){case 1:h+=a*(1+o.noise1d(l*e))/2
break
case 2:h+=a*(1+o.noise2d(l*e,l*n))/2
break
case 3:h+=a*(1+o.noise3d(l*e,l*n,l*i))/2}l*=2}return h},e.noiseDetail=function(e,n){s.octaves=e,n!==t&&(s.fallout=n)},e.noiseSeed=function(e){s.seed=e,s.generator=t}}},{}],23:[function(e,t,n){t.exports=function(e){var t={trim:function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(e[n].replace(/^\s*/,"").replace(/\s*$/,"").replace(/\r*$/,""))
return t}return e.replace(/^\s*/,"").replace(/\s*$/,"").replace(/\r*$/,"")},radians:function(e){return e/180*Math.PI},nfCoreScalar:function(t,n,r,i,s,o){var a=t<0?r:n,l=0===s,h=s===e||s<0?0:s,u=Math.abs(t)
if(l)for(h=1,u*=10;Math.abs(Math.round(u)-u)>1e-6&&h<7;)++h,u*=10
else 0!==h&&(u*=Math.pow(10,h))
var c,f=2*u
if(Math.floor(u)===u)c=u
else if(Math.floor(f)===f){var p=Math.floor(u)
c=p+p%2}else c=Math.round(u)
for(var m="",g=i+h;g>0||c>0;)g--,m=""+c%10+m,c=Math.floor(c/10)
if(o!==e)for(var d=m.length-3-h;d>0;)m=m.substring(0,d)+o+m.substring(d),d-=3
return h>0?a+m.substring(0,m.length-h)+"."+m.substring(m.length-h,m.length):a+m},nfCore:function(e,n,r,i,s,o){if(e instanceof Array){for(var a=[],l=0,h=e.length;l<h;l++)a.push(t.nfCoreScalar(e[l],n,r,i,s,o))
return a}return t.nfCoreScalar(e,n,r,i,s,o)},nf:function(e,n,r){return t.nfCore(e,"","-",n,r)},nfs:function(e,n,r){return t.nfCore(e," ","-",n,r)},nfp:function(e,n,r){return t.nfCore(e,"+","-",n,r)},nfc:function(e,n){return t.nfCore(e,"","-",0,n,",")},withCommonFunctions:function(e){["trim","radians","nf","nfs","nfp","nfc"].forEach(function(n){e[n]=t[n]})}}
return t}()},{}],24:[function(e,t,n){t.exports=function(e,t,n,r,i,s){function o(t,n){var i=t,s=0,o=0
if(e.pmouseX=e.mouseX,e.pmouseY=e.mouseY,i.offsetParent)do s+=i.offsetLeft,o+=i.offsetTop
while(i=i.offsetParent)
i=t
do s-=i.scrollLeft||0,o-=i.scrollTop||0
while(i=i.parentNode)
var a,l,h,u
return r.defaultView&&r.defaultView.getComputedStyle&&(a=parseInt(r.defaultView.getComputedStyle(t,null).paddingLeft,10)||0,l=parseInt(r.defaultView.getComputedStyle(t,null).paddingTop,10)||0,h=parseInt(r.defaultView.getComputedStyle(t,null).borderLeftWidth,10)||0,u=parseInt(r.defaultView.getComputedStyle(t,null).borderTopWidth,10)||0),s+=a,o+=l,s+=h,o+=u,s+=window.pageXOffset,o+=window.pageYOffset,{X:s,Y:o}}function a(t,n){var r=o(t,n)
e.mouseX=n.pageX-r.X,e.mouseY=n.pageY-r.Y}function l(e){var t,n=o(e.changedTouches[0].target,e.changedTouches[0])
for(t=0;t<e.touches.length;t++){var r=e.touches[t]
r.offsetX=r.pageX-n.X,r.offsetY=r.pageY-n.Y}for(t=0;t<e.targetTouches.length;t++){var i=e.targetTouches[t]
i.offsetX=i.pageX-n.X,i.offsetY=i.pageY-n.Y}for(t=0;t<e.changedTouches.length;t++){var s=e.changedTouches[t]
s.offsetX=s.pageX-n.X,s.offsetY=s.pageY-n.Y}return e}n(t,"touchstart",function(r){t.setAttribute("style","-webkit-user-select: none"),t.setAttribute("onclick","void(0)"),t.setAttribute("style","-webkit-tap-highlight-color:rgba(0,0,0,0)")
for(var o=0,h=eventHandlers.length;o<h;o++){var u=eventHandlers[o].type
"mouseout"!==u&&"mousemove"!==u&&"mousedown"!==u&&"mouseup"!==u&&"DOMMouseScroll"!==u&&"mousewheel"!==u&&"touchstart"!==u||detachEventHandler(eventHandlers[o])}e.touchStart!==s||e.touchMove!==s||e.touchEnd!==s||e.touchCancel!==s?(n(t,"touchstart",function(t){e.touchStart!==s&&(t=l(t),e.touchStart(t))}),n(t,"touchmove",function(t){e.touchMove!==s&&(t.preventDefault(),t=l(t),e.touchMove(t))}),n(t,"touchend",function(t){e.touchEnd!==s&&(t=l(t),e.touchEnd(t))}),n(t,"touchcancel",function(t){e.touchCancel!==s&&(t=l(t),e.touchCancel(t))})):(n(t,"touchstart",function(n){a(t,n.touches[0]),e.__mousePressed=!0,e.mouseDragging=!1,e.mouseButton=i.LEFT,"function"==typeof e.mousePressed&&e.mousePressed()}),n(t,"touchmove",function(n){n.preventDefault(),a(t,n.touches[0]),"function"!=typeof e.mouseMoved||e.__mousePressed||e.mouseMoved(),"function"==typeof e.mouseDragged&&e.__mousePressed&&(e.mouseDragged(),e.mouseDragging=!0)}),n(t,"touchend",function(t){e.__mousePressed=!1,"function"!=typeof e.mouseClicked||e.mouseDragging||e.mouseClicked(),"function"==typeof e.mouseReleased&&e.mouseReleased()})),t.dispatchEvent(r)}),function(){var r=!0,i=function(e){e.preventDefault(),e.stopPropagation()}
e.disableContextMenu=function(){r&&(n(t,"contextmenu",i),r=!1)},e.enableContextMenu=function(){r||(detachEventHandler({elem:t,type:"contextmenu",fn:i}),r=!0)}}(),n(t,"mousemove",function(n){a(t,n),"function"!=typeof e.mouseMoved||e.__mousePressed||e.mouseMoved(),"function"==typeof e.mouseDragged&&e.__mousePressed&&(e.mouseDragged(),e.mouseDragging=!0)}),n(t,"mouseout",function(t){"function"==typeof e.mouseOut&&e.mouseOut()}),n(t,"mouseover",function(n){a(t,n),"function"==typeof e.mouseOver&&e.mouseOver()}),t.onmousedown=function(){return t.focus(),!1},n(t,"mousedown",function(t){switch(e.__mousePressed=!0,e.mouseDragging=!1,t.which){case 1:e.mouseButton=i.LEFT
break
case 2:e.mouseButton=i.CENTER
break
case 3:e.mouseButton=i.RIGHT}"function"==typeof e.mousePressed&&e.mousePressed()}),n(t,"mouseup",function(t){e.__mousePressed=!1,"function"!=typeof e.mouseClicked||e.mouseDragging||e.mouseClicked(),"function"==typeof e.mouseReleased&&e.mouseReleased()})
var h=function(t){var n=0
t.wheelDelta?(n=t.wheelDelta/120,window.opera&&(n=-n)):t.detail&&(n=-t.detail/3),e.mouseScroll=n,n&&"function"==typeof e.mouseScrolled&&e.mouseScrolled()}
n(r,"DOMMouseScroll",h),n(r,"mousewheel",h)}},{}],25:[function(e,t,n){t.exports=function(t,n){function r(){var e=["abs","acos","alpha","ambient","ambientLight","append","applyMatrix","arc","arrayCopy","asin","atan","atan2","background","beginCamera","beginDraw","beginShape","bezier","bezierDetail","bezierPoint","bezierTangent","bezierVertex","binary","blend","blendColor","blit_resize","blue","box","breakShape","brightness","camera","ceil","Character","color","colorMode","concat","constrain","copy","cos","createFont","createGraphics","createImage","cursor","curve","curveDetail","curvePoint","curveTangent","curveTightness","curveVertex","day","degrees","directionalLight","disableContextMenu","dist","draw","ellipse","ellipseMode","emissive","enableContextMenu","endCamera","endDraw","endShape","exit","exp","expand","externals","fill","filter","floor","focused","frameCount","frameRate","frustum","get","glyphLook","glyphTable","green","height","hex","hint","hour","hue","image","imageMode","intersect","join","key","keyCode","keyPressed","keyReleased","keyTyped","lerp","lerpColor","lightFalloff","lights","lightSpecular","line","link","loadBytes","loadFont","loadGlyphs","loadImage","loadPixels","loadShape","loadXML","loadStrings","log","loop","mag","map","match","matchAll","max","millis","min","minute","mix","modelX","modelY","modelZ","modes","month","mouseButton","mouseClicked","mouseDragged","mouseMoved","mouseOut","mouseOver","mousePressed","mouseReleased","mouseScroll","mouseScrolled","mouseX","mouseY","name","nf","nfc","nfp","nfs","noCursor","noFill","noise","noiseDetail","noiseSeed","noLights","noLoop","norm","normal","noSmooth","noStroke","noTint","ortho","param","parseBoolean","parseByte","parseChar","parseFloat","parseInt","parseXML","peg","perspective","PImage","pixels","PMatrix2D","PMatrix3D","PMatrixStack","pmouseX","pmouseY","point","pointLight","popMatrix","popStyle","pow","print","printCamera","println","printMatrix","printProjection","PShape","PShapeSVG","pushMatrix","pushStyle","quad","radians","random","randomGaussian","randomSeed","rect","rectMode","red","redraw","requestImage","resetMatrix","reverse","rotate","rotateX","rotateY","rotateZ","round","saturation","save","saveFrame","saveStrings","scale","screenX","screenY","screenZ","second","set","setup","shape","shapeMode","shared","shearX","shearY","shininess","shorten","sin","size","smooth","sort","specular","sphere","sphereDetail","splice","split","splitTokens","spotLight","sq","sqrt","status","str","stroke","strokeCap","strokeJoin","strokeWeight","subset","tan","text","textAlign","textAscent","textDescent","textFont","textLeading","textMode","textSize","texture","textureMode","textWidth","tint","toImageData","touchCancel","touchEnd","touchMove","touchStart","translate","transform","triangle","trim","unbinary","unhex","updatePixels","use3DContext","vertex","width","XMLElement","XML","year","__contains","__equals","__equalsIgnoreCase","__frameRate","__hashCode","__int_cast","__instanceof","__keyPressed","__mousePressed","__printStackTrace","__replace","__replaceAll","__replaceFirst","__toCharArray","__split","__codePointAt","__startsWith","__endsWith","__matches"]
h&&Object.keys(h).forEach(function(t){e.push(t)})
var n,r,i={}
for(n=0,r=e.length;n<r;++n)i[e[n]]=null
for(var s in t.lib)if(t.lib.hasOwnProperty(s)&&t.lib[s].exports){var o=t.lib[s].exports
for(n=0,r=o.length;n<r;++n)i[o[n]]=null}return i}function i(e){function t(e){for(var t=[],n=e.split(/([\{\[\(\)\]\}])/),r=n[0],i=[],s=1;s<n.length;s+=2){var o=n[s]
if("["===o||"{"===o||"("===o)i.push(r),r=o
else if("]"===o||"}"===o||")"===o){var a="}"===o?"A":")"===o?"B":"C",l=t.length
t.push(r+o),r=i.pop()+'"'+a+(l+1)+'"'}r+=n[s+1]}return t.unshift(r),t}function n(e,t){return e.replace(/'(\d+)'/g,function(e,n){var r=t[n]
return"/"===r.charAt(0)?r:/^'((?:[^'\\\n])|(?:\\.[0-9A-Fa-f]*))'$/.test(r)?"(new $p.Character("+r+"))":r})}function i(e){var t,n=/^\s*/.exec(e)
if(n[0].length===e.length)t={left:n[0],middle:"",right:""}
else{var r=/\s*$/.exec(e)
t={left:n[0],middle:e.substring(n[0].length,r.index),right:r[0]}}return t.untrim=function(e){return this.left+e+this.right},t}function s(e){return e.replace(/^\s+/,"").replace(/\s+$/,"")}function h(e,t){for(var n=0,r=t.length;n<r;++n)e[t[n]]=null
return e}function u(e){for(var t in e)if(e.hasOwnProperty(t))return!1
return!0}function c(e){return e.substring(2,e.length-1)}function f(e,t){var n=_e.length
return _e.push(e),'"'+t+n+'"'}function p(){return"class"+ ++Le}function m(e,t,n){e.classId=t,e.scopeId=n,Re[t]=e}function g(e){var t=e
return t=t.replace(Ie,function(e){return f(e,"E")}),t=t.replace(De,function(e){return f(e,"D")}),t=t.replace(ke,function(e){return f(e,"H")})}function d(e,t){var n=e.replace(Ne,function(e,n,r,i,s,o){return r!==t?e:f(e,"G")})
return n}function v(e){this.name=e}function y(e,t){this.params=e,this.methodArgsParam=t}function A(e){var t=s(e.substring(1,e.length-1)),n=[],r=null
if(""!==t)for(var i=t.split(","),o=0;o<i.length;++o){var a=/\b([A-Za-z_$][\w$]*\b)(\s*"[ABC][\d]*")*\s*$/.exec(i[o])
if(o===i.length-1&&i[o].indexOf("...")>=0){r=new v(a[1])
break}n.push(new v(a[1]))}return new y(n,r)}function x(e){function t(e,t,n,r){var o=_e[r]
s=!0
var a=i(o.substring(1,o.length-1))
return"__"+n+(""===a.middle?f("("+t.replace(/\.\s*$/,"")+")","B"):f("("+t.replace(/\.\s*$/,"")+","+a.middle+")","B"))}function n(e,t,n){return s=!0,"__instanceof"+f("("+t+", "+n+")","B")}var r=e
r=r.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\s*"C\d+")+\s*("A\d+")/g,function(e,t,n){return n}),r=r.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\s*"B\d+")\s*("A\d+")/g,function(e,t,n){return f(e,"F")}),r=r.replace(ke,function(e){return f(e,"H")}),r=r.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)\s*("C\d+"(?:\s*"C\d+")*)/g,function(e,t,n){var r=n.replace(/"C(\d+)"/g,function(e,t){return _e[t]}).replace(/\[\s*\]/g,"[null]").replace(/\s*\]\s*\[\s*/g,", "),i="{"+r.substring(1,r.length-1)+"}",s="('"+t+"', "+f(i,"A")+")"
return"$p.createJavaArray"+f(s,"B")}),r=r.replace(/(\.\s*length)\s*"B\d+"/g,"$1"),r=r.replace(/#([0-9A-Fa-f]{6})\b/g,function(e,t){return"0xFF"+t}),r=r.replace(/"B(\d+)"(\s*(?:[\w$']|"B))/g,function(e,t,n){var r=_e[t]
if(!/^\(\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\s*(?:"C\d+"\s*)*\)$/.test(r))return e
if(/^\(\s*int\s*\)$/.test(r))return"(int)"+n
var i=r.split(/"C(\d+)"/g)
return i.length>1&&!/^\[\s*\]$/.test(_e[i[1]])?e:""+n}),r=r.replace(/\(int\)([^,\]\)\}\?\:\*\+\-\/\^\|\%\&\~<\>\=]+)/g,function(e,t){var n=i(t)
return n.untrim("__int_cast("+n.middle+")")}),r=r.replace(/\bsuper(\s*"B\d+")/g,"$$superCstr$1").replace(/\bsuper(\s*\.)/g,"$$super$1"),r=r.replace(/\b0+((\d*)(?:\.[\d*])?(?:[eE][\-\+]?\d+)?[fF]?)\b/,function(e,t,n){return t===n?e:""===n?"0"+t:t}),r=r.replace(/\b(\.?\d+\.?)[fF]\b/g,"$1"),r=r.replace(/([^\s])%([^=\s])/g,"$1 % $2"),r=r.replace(/\b(frameRate|keyPressed|mousePressed)\b(?!\s*"B)/g,"__$1"),r=r.replace(/\b(boolean|byte|char|float|int)\s*"B/g,function(e,t){return"parse"+t.substring(0,1).toUpperCase()+t.substring(1)+'"B'}),r=r.replace(/\bpixels\b\s*(("C(\d+)")|\.length)?(\s*=(?!=)([^,\]\)\}]+))?/g,function(e,t,n,r,i,s){if(n){var o=_e[r]
return i?"pixels.setPixel"+f("("+o.substring(1,o.length-1)+","+s+")","B"):"pixels.getPixel"+f("("+o.substring(1,o.length-1)+")","B")}return t?"pixels.getLength"+f("()","B"):i?"pixels.set"+f("("+s+")","B"):"pixels.toArray"+f("()","B")})
var s
do s=!1,r=r.replace(/((?:'\d+'|\b[A-Za-z_$][\w$]*\s*(?:"[BC]\d+")*)\s*\.\s*(?:[A-Za-z_$][\w$]*\s*(?:"[BC]\d+"\s*)*\.\s*)*)(replace|replaceAll|replaceFirst|contains|equals|equalsIgnoreCase|hashCode|toCharArray|printStackTrace|split|startsWith|endsWith|codePointAt|matches)\s*"B(\d+)"/g,t)
while(s)
do s=!1,r=r.replace(/((?:'\d+'|\b[A-Za-z_$][\w$]*\s*(?:"[BC]\d+")*)\s*(?:\.\s*[A-Za-z_$][\w$]*\s*(?:"[BC]\d+"\s*)*)*)instanceof\s+([A-Za-z_$][\w$]*\s*(?:\.\s*[A-Za-z_$][\w$]*)*)/g,n)
while(s)
return r=r.replace(/\bthis(\s*"B\d+")/g,"$$constr$1")}function b(e,t){this.baseInterfaceName=e,this.body=t,t.owner=this}function w(e){var t=new RegExp(/\bnew\s*([A-Za-z_$][\w$]*\s*(?:\.\s*[A-Za-z_$][\w$]*)*)\s*"B\d+"\s*"A(\d+)"/).exec(e),n=we,r=p()
we=r
var i=t[1]+"$"+r,s=new b(i,Ee(_e[t[2]],i,"","implements "+t[1]))
return m(s,r,n),we=n,s}function E(e,t,n){this.name=e,this.params=t,this.body=n}function S(e){var t=new RegExp(/\b([A-Za-z_$][\w$]*)\s*"B(\d+)"\s*"A(\d+)"/).exec(e)
return new E("function"!==t[1]?t[1]:null,A(_e[t[2]]),Pe(_e[t[3]]))}function P(e){this.members=e}function C(e){for(var t=e.split(","),n=0;n<t.length;++n){var r=t[n].indexOf(":")
r<0?t[n]={value:Te(t[n])}:t[n]={label:s(t[n].substring(0,r)),value:Te(s(t[n].substring(r+1)))}}return new P(t)}function M(e){if("("===e.charAt(0)||"["===e.charAt(0))return e.charAt(0)+M(e.substring(1,e.length-1))+e.charAt(e.length-1)
if("{"===e.charAt(0))return/^\{\s*(?:[A-Za-z_$][\w$]*|'\d+')\s*:/.test(e)?"{"+f(e.substring(1,e.length-1),"I")+"}":"["+M(e.substring(1,e.length-1))+"]"
var t=i(e),n=x(t.middle)
return n=n.replace(/"[ABC](\d+)"/g,function(e,t){return M(_e[t])}),t.untrim(n)}function T(e){return e.replace(/(\.\s*)?((?:\b[A-Za-z_]|\$)[\w$]*)(\s*\.\s*([A-Za-z_$][\w$]*)(\s*\()?)?/g,function(e,t,n,r,i,s){if(t)return e
var a={name:n,member:i,callSign:!!s}
return be(a)+(r===o?"":r)})}function _(e,t){this.expr=e,this.transforms=t}function R(e,t,n){this.name=e,this.value=t,this.isDefault=n}function L(e,t){var n,r,i,o=e.indexOf("=")
return o<0?(n=e,r=t,i=!0):(n=e.substring(0,o),r=Te(e.substring(o+1)),i=!1),new R(s(n.replace(/(\s*"C\d+")+/g,"")),r,i)}function I(e){return"int"===e||"float"===e?"0":"boolean"===e?"false":"color"===e?"0x00000000":"null"}function D(e,t){this.definitions=e,this.varType=t}function O(e){this.expression=e}function N(e){if(Oe.test(e)){for(var t=Fe.exec(e),n=e.substring(t[0].length).split(","),r=I(t[2]),i=0;i<n.length;++i)n[i]=L(n[i],r)
return new D(n,t[2])}return new O(Te(e))}function F(e,t,n){this.initStatement=e,this.condition=t,this.step=n}function k(e,t){this.initStatement=e,this.container=t}function B(e,t){this.initStatement=e,this.container=t}function $(e){var t
return/\bin\b/.test(e)?(t=e.substring(1,e.length-1).split(/\bin\b/g),new k(N(s(t[0])),Te(t[1]))):e.indexOf(":")>=0&&e.indexOf(";")<0?(t=e.substring(1,e.length-1).split(":"),new B(N(s(t[0])),Te(t[1]))):(t=e.substring(1,e.length-1).split(";"),new F(N(s(t[0])),Te(t[1]),Te(t[2])))}function G(e){e.sort(function(e,t){return t.weight-e.weight})}function V(e,t,n){this.name=e,this.body=t,this.isStatic=n,t.owner=this}function z(e,t,n){this.name=e,this.body=t,this.isStatic=n,t.owner=this}function U(e){var t=Ie.exec(e)
Ie.lastIndex=0
var n,r=t[1].indexOf("static")>=0,i=_e[c(t[6])],s=we,o=p()
return we=o,n="interface"===t[2]?new V(t[3],Se(i,t[3],t[4]),r):new z(t[3],Ee(i,t[3],t[4],t[5]),r),m(n,o,s),we=s,n}function H(e,t,n,r){this.name=e,this.params=t,this.body=n,this.isStatic=r}function X(e){var t=De.exec(e)
De.lastIndex=0
var n=t[1].indexOf("static")>=0,r=";"!==t[6]?_e[c(t[6])]:"{}"
return new H(t[3],A(_e[c(t[4])]),Pe(r),n)}function Y(e,t,n){this.definitions=e,this.fieldType=t,this.isStatic=n}function K(e){for(var t=Fe.exec(e),n=t[1].indexOf("static")>=0,r=e.substring(t[0].length).split(/,\s*/g),i=I(t[2]),s=0;s<r.length;++s)r[s]=L(r[s],i)
return new Y(r,t[2],n)}function j(e,t){this.params=e,this.body=t}function W(e){var t=new RegExp(/"B(\d+)"\s*"A(\d+)"/).exec(e),n=A(_e[t[1]])
return new j(n,Pe(_e[t[2]]))}function Z(e,t,n,r,i,s){var o,a
for(this.name=e,this.interfacesNames=t,this.methodsNames=n,this.fields=r,this.innerClasses=i,this.misc=s,o=0,a=r.length;o<a;++o)r[o].owner=this}function q(e,t,n,r,i,s,o,a,l){var h,u
for(this.name=e,this.baseClassName=t,this.interfacesNames=n,this.functions=r,this.methods=i,this.fields=s,this.cstrs=o,this.innerClasses=a,this.misc=l,h=0,u=s.length;h<u;++h)s[h].owner=this}function Q(e,t){this.name=e,this.body=t,t.owner=this}function J(e,t){this.name=e,this.body=t,t.owner=this}function ee(e){var t=Ie.exec(e)
Ie.lastIndex=0
var n=_e[c(t[6])],r=we,i=p()
we=i
var s
return s="interface"===t[2]?new Q(t[3],Se(n,t[3],t[4])):new J(t[3],Ee(n,t[3],t[4],t[5])),m(s,i,r),we=r,s}function te(e,t,n){this.name=e,this.params=t,this.body=n}function ne(e){var t=De.exec(e)
De.lastIndex=0
return new te(t[3],A(_e[c(t[4])]),Pe(_e[c(t[6])]))}function re(e){var t=e
return t=t.replace(/\b(catch\s*"B\d+"\s*"A\d+")(\s*catch\s*"B\d+"\s*"A\d+")+/g,"$1")}function ie(e,t){this.argument=e,this.misc=t}function se(e,t){this.argument=e,this.misc=t}function oe(e,t,n){this.name=e,this.argument=t,this.misc=n}function ae(e){this.expr=e}function le(e){this.label=e}function he(e){for(var t=[],n=0,r=e.length;n<r;++n){var i=e[n]
i instanceof D?t=t.concat(i.getNames()):i instanceof ie&&i.argument.initStatement instanceof D?t=t.concat(i.argument.initStatement.getNames()):(i instanceof V||i instanceof z||i instanceof Q||i instanceof J||i instanceof te||i instanceof E)&&t.push(i.name)}return h({},t)}function ue(e){this.statements=e}function ce(e){this.statements=e}function fe(e){function t(e,t){for(var n,r=t.split("."),s=e.scope;s;){if(s.hasOwnProperty(r[0])){n=s[r[0]]
break}s=s.scope}n===o&&(n=i[r[0]])
for(var a=1,l=r.length;a<l&&n;++a)n=n.inScope[r[a]]
return n}var n,r,i={}
for(n in Re)if(Re.hasOwnProperty(n)){r=Re[n]
var s=r.scopeId,a=r.name
if(s){var l=Re[s]
r.scope=l,l.inScope===o&&(l.inScope={}),l.inScope[a]=r}else i[a]=r}for(n in Re)if(Re.hasOwnProperty(n)){r=Re[n]
var h=r.body.baseClassName
if(h){var u=t(r,h)
u&&(r.base=u,u.derived||(u.derived=[]),u.derived.push(r))}var c,f,p=r.body.interfacesNames,m=[]
if(p&&p.length>0){for(c=0,f=p.length;c<f;++c){var g=t(r,p[c])
m.push(g),g&&(g.derived||(g.derived=[]),g.derived.push(r))}m.length>0&&(r.interfaces=m)}}}function pe(e){function t(e,t){var n=o[e]
if(!n)return!1
var r=n.indexOf(t)
return!(r<0)&&(n.splice(r,1),!(n.length>0)&&(delete o[e],!0))}var n,r,i,s=[],o={}
for(n in Re)if(Re.hasOwnProperty(n))if(i=Re[n],i.inScope||i.derived){var a=[]
if(i.inScope)for(r in i.inScope)i.inScope.hasOwnProperty(r)&&a.push(i.inScope[r])
i.derived&&(a=a.concat(i.derived)),o[n]=a}else s.push(n),i.weight=0
for(;s.length>0;)if(n=s.shift(),i=Re[n],i.scopeId&&t(i.scopeId,i)&&(s.push(i.scopeId),Re[i.scopeId].weight=i.weight+1),i.base&&t(i.base.classId,i)&&(s.push(i.base.classId),i.base.weight=i.weight+1),i.interfaces){var l,h
for(l=0,h=i.interfaces.length;l<h;++l)i.interfaces[l]&&t(i.interfaces[l].classId,i)&&(s.push(i.interfaces[l].classId),i.interfaces[l].weight=i.weight+1)}}var me=r(),ge=e.replace(/\r\n?|\n\r/g,"\n"),de=[],ve=ge.replace(/("(?:[^"\\\n]|\\.)*")|('(?:[^'\\\n]|\\.)*')|(([\[\(=|&!\^:?]\s*)(\/(?![*\/])(?:[^\/\\\n]|\\.)*\/[gim]*)\b)|(\/\/[^\n]*\n)|(\/\*(?:(?!\*\/)(?:.|\n))*\*\/)/g,function(e,t,n,r,i,s,o,a){var l
return t||n?(l=de.length,de.push(e),"'"+l+"'"):r?(l=de.length,de.push(s),i+"'"+l+"'"):""!==a?" ":"\n"})
ve=ve.replace(/__x([0-9A-F]{4})/g,function(e,t){return"__x005F_x"+t}),ve=ve.replace(/\$/g,"__x0024"),ve=ve.replace(/return\s*[\n\r]+/g,"return ")
var ye,Ae=ve,xe=function(e,t,n,r){return t||r?e:(ye=!0,"")}
do ye=!1,Ae=Ae.replace(/([<]?)<\s*((?:\?|[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\[\])*(?:\s+(?:extends|super)\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)?(?:\s*,\s*(?:\?|[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\[\])*(?:\s+(?:extends|super)\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)?)*)\s*>([=]?)/g,xe)
while(ye)
var be,we,Ee,Se,Pe,Ce,Me,Te,_e=t(Ae),Re={},Le=0,Ie=/\b((?:(?:public|private|final|protected|static|abstract)\s+)*)(class|interface)\s+([A-Za-z_$][\w$]*\b)(\s+extends\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\b)*)?(\s+implements\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\b)*)?\s*("A\d+")/g,De=/\b((?:(?:public|private|final|protected|static|abstract|synchronized)\s+)*)((?!(?:else|new|return|throw|function|public|private|protected)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*([A-Za-z_$][\w$]*\b)\s*("B\d+")(\s*throws\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)*)?\s*("A\d+"|;)/g,Oe=/^((?:(?:public|private|final|protected|static)\s+)*)((?!(?:else|new|return|throw)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*([A-Za-z_$][\w$]*\b)\s*(?:"C\d+"\s*)*([=,]|$)/,Ne=/\b((?:(?:public|private|final|protected|static|abstract)\s+)*)((?!(?:new|return|throw)\b)[A-Za-z_$][\w$]*\b)\s*("B\d+")(\s*throws\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)*)?\s*("A\d+")/g,Fe=/^((?:(?:public|private|final|protected|static)\s+)*)((?!(?:new|return|throw)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*/,ke=/\bfunction(?:\s+([A-Za-z_$][\w$]*))?\s*("B\d+")\s*("A\d+")/g
v.prototype.toString=function(){return this.name},y.prototype.getNames=function(){for(var e=[],t=0,n=this.params.length;t<n;++t)e.push(this.params[t].name)
return e},y.prototype.prependMethodArgs=function(e){return this.methodArgsParam?"{\nvar "+this.methodArgsParam.name+" = Array.prototype.slice.call(arguments, "+this.params.length+");\n"+e.substring(1):e},y.prototype.toString=function(){if(0===this.params.length)return"()"
for(var e="(",t=0,n=this.params.length;t<n;++t)e+=this.params[t]+", "
return e.substring(0,e.length-2)+")"},b.prototype.toString=function(){return"new ("+this.body+")"},E.prototype.toString=function(){var e=be,t=h({this:null},this.params.getNames())
be=function(n){return t.hasOwnProperty(n.name)?n.name:e(n)}
var n="function"
this.name&&(n+=" "+this.name)
var r=this.params.prependMethodArgs(this.body.toString())
return n+=this.params+" "+r,be=e,n},P.prototype.toString=function(){var e=be
be=function(t){return"this"===t.name?"this":e(t)}
for(var t="",n=0,r=this.members.length;n<r;++n)this.members[n].label&&(t+=this.members[n].label+": "),t+=this.members[n].value.toString()+", "
return be=e,t.substring(0,t.length-2)},_.prototype.toString=function(){var e=this.transforms,t=T(this.expr)
return t.replace(/"!(\d+)"/g,function(t,n){return e[n].toString()})},Te=function(e){var t=[],n=M(e)
return n=n.replace(/"H(\d+)"/g,function(e,n){return t.push(S(_e[n])),'"!'+(t.length-1)+'"'}),n=n.replace(/"F(\d+)"/g,function(e,n){return t.push(w(_e[n])),'"!'+(t.length-1)+'"'}),n=n.replace(/"I(\d+)"/g,function(e,n){return t.push(C(_e[n])),'"!'+(t.length-1)+'"'}),new _(n,t)},R.prototype.toString=function(){return this.name+" = "+this.value},D.prototype.getNames=function(){for(var e=[],t=0,n=this.definitions.length;t<n;++t)e.push(this.definitions[t].name)
return e},D.prototype.toString=function(){return"var "+this.definitions.join(",")},O.prototype.toString=function(){return this.expression.toString()},F.prototype.toString=function(){return"("+this.initStatement+"; "+this.condition+"; "+this.step+")"},k.prototype.toString=function(){var e=this.initStatement.toString()
return e.indexOf("=")>=0&&(e=e.substring(0,e.indexOf("="))),"("+e+" in "+this.container+")"},B.iteratorId=0,B.prototype.toString=function(){var e=this.initStatement.toString(),t="$it"+B.iteratorId++,n=e.replace(/^\s*var\s*/,"").split("=")[0],r="var "+t+" = new $p.ObjectIterator("+this.container+"), "+n+" = void(0)",i=t+".hasNext() && (("+n+" = "+t+".next()) || true)"
return"("+r+"; "+i+";)"},V.prototype.toString=function(){return""+this.body},z.prototype.toString=function(){return""+this.body},H.prototype.toString=function(){var e=h({},this.params.getNames()),t=be
be=function(n){return e.hasOwnProperty(n.name)?n.name:t(n)}
var n=this.params.prependMethodArgs(this.body.toString()),r="function "+this.methodId+this.params+" "+n+"\n"
return be=t,r},Y.prototype.getNames=function(){for(var e=[],t=0,n=this.definitions.length;t<n;++t)e.push(this.definitions[t].name)
return e},Y.prototype.toString=function(){var e=be({name:"[this]"})
if(this.isStatic){for(var t=this.owner.name,n=[],r=0,i=this.definitions.length;r<i;++r){var s=this.definitions[r],o=s.name,a=t+"."+o,l="if("+a+" === void(0)) {\n "+a+" = "+s.value+"; }\n$p.defineProperty("+e+", '"+o+"', { get: function(){return "+a+";}, set: function(val){"+a+" = val;} });\n"
n.push(l)}return n.join("")}return e+"."+this.definitions.join("; "+e+".")},j.prototype.toString=function(){var e=h({},this.params.getNames()),t=be
be=function(n){return e.hasOwnProperty(n.name)?n.name:t(n)}
var n="function $constr_"+this.params.params.length+this.params.toString(),r=this.params.prependMethodArgs(this.body.toString())
return/\$(superCstr|constr)\b/.test(r)||(r="{\n$superCstr();\n"+r.substring(1)),be=t,n+r+"\n"},Z.prototype.getMembers=function(e,t,n){this.owner.base&&this.owner.base.body.getMembers(e,t,n)
var r,i,s,o
for(r=0,s=this.fields.length;r<s;++r){var a=this.fields[r].getNames()
for(i=0,o=a.length;i<o;++i)e[a[i]]=this.fields[r]}for(r=0,s=this.methodsNames.length;r<s;++r){var l=this.methodsNames[r]
t[l]=!0}for(r=0,s=this.innerClasses.length;r<s;++r){var h=this.innerClasses[r]
n[h.name]=h}},Z.prototype.toString=function(){function e(e){for(var t=0;e;)++t,e=e.scope
return t}var t=(e(this.owner),this.name),n="",r="",i={},s={},o={}
this.getMembers(i,s,o)
var a,l
if(this.owner.interfaces){var h,u=[]
for(a=0,l=this.interfacesNames.length;a<l;++a)this.owner.interfaces[a]&&(h=be({name:this.interfacesNames[a]}),u.push(h),n+="$p.extendInterfaceMembers("+t+", "+h+");\n")
r+=t+".$interfaces = ["+u.join(", ")+"];\n"}for(r+=t+".$isInterface = true;\n",r+=t+".$methods = ['"+this.methodsNames.join("', '")+"'];\n",G(this.innerClasses),a=0,l=this.innerClasses.length;a<l;++a){var c=this.innerClasses[a]
c.isStatic&&(n+=t+"."+c.name+" = "+c+";\n")}for(a=0,l=this.fields.length;a<l;++a){var f=this.fields[a]
f.isStatic&&(n+=t+"."+f.definitions.join(";\n"+t+".")+";\n")}return"(function() {\nfunction "+t+"() { throw 'Unable to create the interface'; }\n"+n+r+"return "+t+";\n})()"},Se=function(e,t,n){var r=e.substring(1,e.length-1)
r=g(r),r=d(r,t)
var s=[],a=[]
r=r.replace(/"([DE])(\d+)"/g,function(e,t,n){return"D"===t?s.push(n):"E"===t&&a.push(n),""})
var l,h,u,c=r.split(/;(?:\s*;)*/g)
for(n!==o&&(l=n.replace(/^\s*extends\s+(.+?)\s*$/g,"$1").split(/\s*,\s*/g)),h=0,u=s.length;h<u;++h){var f=X(_e[s[h]])
s[h]=f.name}for(h=0,u=c.length-1;h<u;++h){var p=i(c[h])
c[h]=K(p.middle)}var m=c.pop()
for(h=0,u=a.length;h<u;++h)a[h]=U(_e[a[h]])
return new Z(t,l,s,c,a,{tail:m})},q.prototype.getMembers=function(e,t,n){this.owner.base&&this.owner.base.body.getMembers(e,t,n)
var r,i,s,o
for(r=0,s=this.fields.length;r<s;++r){var a=this.fields[r].getNames()
for(i=0,o=a.length;i<o;++i)e[a[i]]=this.fields[r]}for(r=0,s=this.methods.length;r<s;++r){var l=this.methods[r]
t[l.name]=l}for(r=0,s=this.innerClasses.length;r<s;++r){var h=this.innerClasses[r]
n[h.name]=h}},q.prototype.toString=function(){function e(e){for(var t=0;e;)++t,e=e.scope
return t}var t=e(this.owner),n="$this_"+t,r=this.name,i="var "+n+" = this;\n",o="",a="",l={},h={},u={}
this.getMembers(l,h,u)
var c=be
be=function(e){var t=e.name
return"this"===t?e.callSign||!e.member?n+".$self":n:l.hasOwnProperty(t)?l[t].isStatic?r+"."+t:n+"."+t:u.hasOwnProperty(t)?n+"."+t:h.hasOwnProperty(t)?h[t].isStatic?r+"."+t:n+".$self."+t:c(e)}
var f
this.baseClassName?(f=c({name:this.baseClassName}),i+="var $super = { $upcast: "+n+" };\n",i+="function $superCstr(){"+f+".apply($super,arguments);if(!('$self' in $super)) $p.extendClassChain($super)}\n",a+=r+".$base = "+f+";\n"):i+="function $superCstr(){$p.extendClassChain("+n+")}\n",this.owner.base&&(o+="$p.extendStaticMembers("+r+", "+f+");\n")
var p,m,g,d
if(this.owner.interfaces){var v,y=[]
for(p=0,m=this.interfacesNames.length;p<m;++p)this.owner.interfaces[p]&&(v=c({name:this.interfacesNames[p]}),y.push(v),o+="$p.extendInterfaceMembers("+r+", "+v+");\n")
a+=r+".$interfaces = ["+y.join(", ")+"];\n"}for(this.functions.length>0&&(i+=this.functions.join("\n")+"\n"),G(this.innerClasses),p=0,m=this.innerClasses.length;p<m;++p){var A=this.innerClasses[p]
A.isStatic?(o+=r+"."+A.name+" = "+A+";\n",i+=n+"."+A.name+" = "+r+"."+A.name+";\n"):i+=n+"."+A.name+" = "+A+";\n"}for(p=0,m=this.fields.length;p<m;++p){var x=this.fields[p]
if(x.isStatic)for(o+=r+"."+x.definitions.join(";\n"+r+".")+";\n",g=0,d=x.definitions.length;g<d;++g){var b=x.definitions[g].name,w=r+"."+b
i+="$p.defineProperty("+n+", '"+b+"', {get: function(){return "+w+"}, set: function(val){"+w+" = val}});\n"}else i+=n+"."+x.definitions.join(";\n"+n+".")+";\n"}var E={}
for(p=0,m=this.methods.length;p<m;++p){var S=this.methods[p],P=E[S.name],C=S.name+"$"+S.params.params.length,M=!!S.params.methodArgsParam
P?(++P,C+="_"+P):P=1,S.methodId=C,E[S.name]=P,S.isStatic?(o+=S,o+="$p.addMethod("+r+", '"+S.name+"', "+C+", "+M+");\n",i+="$p.addMethod("+n+", '"+S.name+"', "+C+", "+M+");\n"):(i+=S,i+="$p.addMethod("+n+", '"+S.name+"', "+C+", "+M+");\n")}i+=s(this.misc.tail),this.cstrs.length>0&&(i+=this.cstrs.join("\n")+"\n"),i+="function $constr() {\n"
var T=[]
for(p=0,m=this.cstrs.length;p<m;++p){var _=this.cstrs[p].params.params.length,R=!!this.cstrs[p].params.methodArgsParam
T.push("if(arguments.length "+(R?">=":"===")+" "+_+") { $constr_"+_+".apply("+n+", arguments); }")}return T.length>0&&(i+=T.join(" else ")+" else "),i+="$superCstr();\n}\n",i+="$constr.apply(null, arguments);\n",be=c,"(function() {\nfunction "+r+"() {\n"+i+"}\n"+o+a+"return "+r+";\n})()"},Ee=function(e,t,n,r){var s=e.substring(1,e.length-1)
s=g(s),s=d(s,t)
var a=[],l=[],h=[],u=[]
s=s.replace(/"([DEGH])(\d+)"/g,function(e,t,n){return"D"===t?a.push(n):"E"===t?l.push(n):"H"===t?u.push(n):h.push(n),""})
var c,f,p,m=s.replace(/^(?:\s*;)+/,"").split(/;(?:\s*;)*/g)
for(n!==o&&(c=n.replace(/^\s*extends\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)\s*$/g,"$1")),r!==o&&(f=r.replace(/^\s*implements\s+(.+?)\s*$/g,"$1").split(/\s*,\s*/g)),p=0;p<u.length;++p)u[p]=S(_e[u[p]])
for(p=0;p<a.length;++p)a[p]=X(_e[a[p]])
for(p=0;p<m.length-1;++p){var v=i(m[p])
m[p]=K(v.middle)}var y=m.pop()
for(p=0;p<h.length;++p)h[p]=W(_e[h[p]])
for(p=0;p<l.length;++p)l[p]=U(_e[l[p]])
return new q(t,c,f,u,a,m,h,l,{tail:y})},Q.prototype.toString=function(){return"var "+this.name+" = "+this.body+";\n$p."+this.name+" = "+this.name+";\n"},J.prototype.toString=function(){return"var "+this.name+" = "+this.body+";\n$p."+this.name+" = "+this.name+";\n"},te.prototype.toString=function(){var e=h({},this.params.getNames()),t=be
be=function(n){return e.hasOwnProperty(n.name)?n.name:t(n)}
var n=this.params.prependMethodArgs(this.body.toString()),r="function "+this.name+this.params+" "+n+"\n$p."+this.name+" = "+this.name+";\n"+this.name+" = "+this.name+".bind($p);"
return be=t,r},ie.prototype.toString=function(){return this.misc.prefix+this.argument.toString()},se.prototype.toString=function(){return this.misc.prefix+this.argument.toString()},oe.prototype.toString=function(){var e=this.misc.prefix
return this.argument!==o&&(e+=this.argument.toString()),e},ae.prototype.toString=function(){return"case "+this.expr+":"},le.prototype.toString=function(){return this.label},Ce=function(e,t,n){var r=new RegExp(/\b(catch|for|if|switch|while|with)\s*"B(\d+)"|\b(do|else|finally|return|throw|try|break|continue)\b|("[ADEH](\d+)")|\b(case)\s+([^:]+):|\b([A-Za-z_$][\w$]*\s*:)|(;)/g),a=[]
e=re(e)
for(var l,h,u=0;null!==(l=r.exec(e));){if(l[1]!==o){var c=e.lastIndexOf('"B',r.lastIndex),f=e.substring(u,c)
"for"===l[1]?a.push(new ie($(_e[l[2]]),{prefix:f})):"catch"===l[1]?a.push(new se(A(_e[l[2]]),{prefix:f})):a.push(new oe(l[1],Te(_e[l[2]]),{prefix:f}))}else if(l[3]!==o)a.push(new oe(l[3],o,{prefix:e.substring(u,r.lastIndex)}))
else if(l[4]!==o){if(h=e.substring(u,r.lastIndex-l[4].length),0!==s(h).length)continue
a.push(h)
var p=l[4].charAt(1),m=l[5]
"D"===p?a.push(t(_e[m])):"E"===p?a.push(n(_e[m])):"H"===p?a.push(S(_e[m])):a.push(Pe(_e[m]))}else if(l[6]!==o)a.push(new ae(Te(s(l[7]))))
else if(l[8]!==o){if(h=e.substring(u,r.lastIndex-l[8].length),0!==s(h).length)continue
a.push(new le(e.substring(u,r.lastIndex)))}else{var g=i(e.substring(u,r.lastIndex-1))
a.push(g.left),a.push(N(g.middle)),a.push(g.right+";")}u=r.lastIndex}var d=i(e.substring(u))
return a.push(d.left),""!==d.middle&&(a.push(N(d.middle)),a.push(";"+d.right)),a},ue.prototype.toString=function(){var e=he(this.statements),t=be
u(e)||(be=function(n){return e.hasOwnProperty(n.name)?n.name:t(n)})
var n="{\n"+this.statements.join("")+"\n}"
return be=t,n},Pe=function(e){var t=i(e.substring(1,e.length-1))
return new ue(Ce(t.middle))},ce.prototype.toString=function(){for(var e,t=[],n=[],r=0,i=this.statements.length;r<i;++r)e=this.statements[r],e instanceof J||e instanceof Q?t.push(e):n.push(e)
G(t)
var s=he(this.statements)
be=function(e){var t=e.name
return s.hasOwnProperty(t)?t:me.hasOwnProperty(t)||l.hasOwnProperty(t)||a.hasOwnProperty(t)?"$p."+t:t}
var o="// this code was autogenerated from PJS\n(function($p) {\n"+t.join("")+"\n"+n.join("")+"\n})"
return be=null,o},Me=function(){var e=g(_e[0])
return e=e.replace(/\bimport\s+[^;]+;/g,""),new ce(Ce(e,ne,ee))}
var Be=Me()
fe(Be),pe(Be)
var $e=Be.toString()
return $e=$e.replace(/\s*\n(?:[\t ]*\n)+/g,"\n\n"),$e=$e.replace(/__x([0-9A-F]{4})/g,function(e,t){return String.fromCharCode(parseInt(t,16))}),n($e,de)}function s(e,t){var n=new RegExp(/\/\*\s*@pjs\s+((?:[^\*]|\*+[^\*\/])*)\*\//g).exec(e)
if(n&&2===n.length)for(var r=[],i=n.splice(1,2)[0].replace(/\{([\s\S]*?)\}/g,function(){return function(e,t){return r.push(t),"{"+(r.length-1)+"}"}}()).replace("\n","").replace("\r","").split(";"),s=function(e){return e.replace(/^\s*["']?/,"").replace(/["']?\s*$/,"")},o=0,a=i.length;o<a;o++){var l=i[o].split("=")
if(l&&2===l.length){var h=s(l[0]),u=s(l[1]),c=[]
if("preload"===h){c=u.split(",")
for(var f=0,p=c.length;f<p;f++){var m=s(c[f])
t.imageCache.add(m)}}else if("font"===h){c=u.split(",")
for(var g=0,d=c.length;g<d;g++){var v=s(c[g]),y=/^\{(\d*?)\}$/.exec(v)
PFont.preloading.add(y?JSON.parse("{"+r[y[1]]+"}"):v)}}else"pauseOnBlur"===h?t.options.pauseOnBlur="true"===u:"globalKeyEvents"===h?t.options.globalKeyEvents="true"===u:"param-"===h.substring(0,6)?t.params[h.substring(6)]=u:t.options[h]=u}}return e}var o,a=n.defaultScope,l=a.PConstants,h=n.aFunctions,u=n.Browser,c=u.document
t.compile=function(e){var n=new t.Sketch,r=s(e,n),o=i(r)
return n.sourceCode=o,n}
var f=e("../Helpers/PjsConsole")
return t.logger=new f(c),t}},{"../Helpers/PjsConsole":4}],26:[function(e,t,n){t.exports=function(e,t){function n(e,t){return e in l?l[e]:"function"==typeof l[t]?l[t]:function(e){if(e instanceof Array)return e
if("number"==typeof e){var t=[]
return t.length=e,t}}}var r=e.defaultScope,i=e.extend,s=e.Browser,o=s.ajax,a=s.navigator,l=s.window,h=(l.XMLHttpRequest,s.document),u=e.noop,c=r.PConstants
PFont=r.PFont,PShapeSVG=r.PShapeSVG,PVector=r.PVector,Char=Character=r.Char,ObjectIterator=r.ObjectIterator,XMLElement=r.XMLElement,XML=r.XML
var f,p=l.HTMLCanvasElement,m=l.HTMLImageElement
try{f=l.localStorage}catch(e){f={}}"document"in this&&!("fake"in this.document)
h.head||(h.head=h.getElementsByTagName("head")[0])
var g=n("Float32Array","WebGLFloatArray"),d=n("Int32Array","WebGLIntArray"),v=n("Uint16Array","WebGLUnsignedShortArray"),y=n("Uint8Array","WebGLUnsignedByteArray")
if(h.documentMode>=9&&!h.doctype)throw"The doctype directive is missing. The recommended doctype in Internet Explorer is the HTML5 doctype: <!DOCTYPE html>"
var A=[],x={},b=function(e){e.externals.canvas.id!==t&&e.externals.canvas.id.length||(e.externals.canvas.id="__processing"+A.length),x[e.externals.canvas.id]=A.length,A.push(e)},w=function(e){A.splice(x[e],1),delete x[e]},E=this.Processing=function(e,n,s){function A(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n),ve.push({elem:e,type:t,fn:n})}function x(e){var t=e.elem,n=e.type,r=e.fn
t.removeEventListener?t.removeEventListener(n,r,!1):t.detachEvent&&t.detachEvent("on"+n,r)}function S(e){return Array.prototype.slice.call(e,1)}function P(e,n,r,i){var s=jt.locations[e]
s===t&&(s=Ae.getUniformLocation(n,r),jt.locations[e]=s),null!==s&&(4===i.length?Ae.uniform4fv(s,i):3===i.length?Ae.uniform3fv(s,i):2===i.length?Ae.uniform2fv(s,i):Ae.uniform1f(s,i))}function C(e,n,r,i){var s=jt.locations[e]
s===t&&(s=Ae.getUniformLocation(n,r),jt.locations[e]=s),null!==s&&(4===i.length?Ae.uniform4iv(s,i):3===i.length?Ae.uniform3iv(s,i):2===i.length?Ae.uniform2iv(s,i):Ae.uniform1i(s,i))}function M(e,n,r,i,s){var o=jt.locations[e]
o===t&&(o=Ae.getUniformLocation(n,r),jt.locations[e]=o),o!==-1&&(16===s.length?Ae.uniformMatrix4fv(o,i,s):9===s.length?Ae.uniformMatrix3fv(o,i,s):Ae.uniformMatrix2fv(o,i,s))}function T(e,n,r,i,s){var o=jt.attributes[e]
o===t&&(o=Ae.getAttribLocation(n,r),jt.attributes[e]=o),o!==-1&&(Ae.bindBuffer(Ae.ARRAY_BUFFER,s),Ae.vertexAttribPointer(o,i,Ae.FLOAT,!1,0,0),Ae.enableVertexAttribArray(o))}function _(e,n,r){var i=jt.attributes[e]
i===t&&(i=Ae.getAttribLocation(n,r),jt.attributes[e]=i),i!==-1&&Ae.disableVertexAttribArray(i)}function R(e,t,n,r){var i,s,o,a
if(zt===c.HSB){var l=ye.color.toRGB(e,t,n)
i=l[0],s=l[1],o=l[2]}else i=Math.round(255*(e/kt)),s=Math.round(255*(t/Bt)),o=Math.round(255*(n/$t))
return a=Math.round(255*(r/Ft)),i=i<0?0:i,s=s<0?0:s,o=o<0?0:o,a=a<0?0:a,i=i>255?255:i,s=s>255?255:s,o=o>255?255:o,a=a>255?255:a,a<<24&c.ALPHA_MASK|i<<16&c.RED_MASK|s<<8&c.GREEN_MASK|o&c.BLUE_MASK}function L(e,t){var n
return e&c.ALPHA_MASK?(n=Math.round(255*(t/Ft)),n=n>255?255:n,n=n<0?0:n,e-(e&c.ALPHA_MASK)+(n<<24&c.ALPHA_MASK)):zt===c.RGB?R(e,e,e,t):zt===c.HSB?R(0,0,e/kt*$t,t):void 0}function I(e){if(e<=kt&&e>=0){if(zt===c.RGB)return R(e,e,e,Ft)
if(zt===c.HSB)return R(0,0,e/kt*$t,Ft)}if(e)return e>2147483647&&(e-=4294967296),e}function D(e){var t,n,r
t=((e&c.RED_MASK)>>>16)/255,n=((e&c.GREEN_MASK)>>>8)/255,r=(e&c.BLUE_MASK)/255
var i,s,o=ye.max(ye.max(t,n),r),a=ye.min(ye.min(t,n),r)
return a===o?[0,0,o*$t]:(s=(o-a)/o,i=t===o?(n-r)/(o-a):n===o?2+(r-t)/(o-a):4+(t-n)/(o-a),i/=6,i<0?i+=1:i>1&&(i-=1),[i*kt,s*Bt,o*$t])}function O(){Ae.save()}function N(){Ae.restore(),pt=!0,ht=!0}function F(){var e=(Date.now()-Yt)/1e3
Kt++
var t=Kt/e
e>.5&&(Yt=Date.now(),Kt=0,ye.__frameRate=t),ye.frameCount++}function k(e){var t=parseInt("0x"+e,16)
return t>2147483647&&(t-=4294967296),t}function B(e){return"number"==typeof e?0!==e:"boolean"==typeof e?e:"string"==typeof e?"true"===e.toLowerCase():e instanceof Char?49===e.code||84===e.code||116===e.code:void 0}function $(e){return"number"==typeof e?e:"boolean"==typeof e?e?1:0:"string"==typeof e?parseFloat(e):e instanceof Char?e.code:void 0}function G(e,t){if("number"==typeof e)return 4294967295&e
if("boolean"==typeof e)return e?1:0
if("string"==typeof e){var n=parseInt(e,t||10)
return 4294967295&n}return e instanceof Char?e.code:void 0}function V(){ot&&(ht&&(Ae.fillStyle=ye.color.toString(lt),ht=!1),Ae.fill())}function z(){ut&&(pt&&(Ae.strokeStyle=ye.color.toString(ft),pt=!1),Ae.stroke())}function U(){V(),z(),Ae.closePath()}function H(e,n,r){var i=br.shift()
i===t&&(i={},i.canvas=h.createElement("canvas"),i.context=i.canvas.getContext("2d")),br.push(i)
var s=i.canvas,o=i.context,a=n||e.width,l=r||e.height
return s.width=a,s.height=l,e?"data"in e?o.putImageData(e,0,0):(o.clearRect(0,0,a,l),o.drawImage(e,0,0,a,l)):o.clearRect(0,0,a,l),i}function X(e){return{getLength:function(e){return function(){if(e.isRemote)throw"Image is loaded remotely. Cannot get length."
return e.imageData.data.length?e.imageData.data.length/4:0}}(e),getPixel:function(e){return function(t){var n=4*t,r=e.imageData.data
if(e.isRemote)throw"Image is loaded remotely. Cannot get pixels."
return r[n+3]<<24&c.ALPHA_MASK|r[n]<<16&c.RED_MASK|r[n+1]<<8&c.GREEN_MASK|r[n+2]&c.BLUE_MASK}}(e),setPixel:function(e){return function(t,n){var r=4*t,i=e.imageData.data
if(e.isRemote)throw"Image is loaded remotely. Cannot set pixel."
i[r+0]=(n&c.RED_MASK)>>>16,i[r+1]=(n&c.GREEN_MASK)>>>8,i[r+2]=n&c.BLUE_MASK,i[r+3]=(n&c.ALPHA_MASK)>>>24,e.__isDirty=!0}}(e),toArray:function(e){return function(){var t=[],n=e.imageData.data,r=e.width*e.height
if(e.isRemote)throw"Image is loaded remotely. Cannot get pixels."
for(var i=0,s=0;i<r;i++,s+=4)t.push(n[s+3]<<24&c.ALPHA_MASK|n[s]<<16&c.RED_MASK|n[s+1]<<8&c.GREEN_MASK|n[s+2]&c.BLUE_MASK)
return t}}(e),set:function(e){return function(t){var n,r,i
if(this.isRemote)throw"Image is loaded remotely. Cannot set pixels."
r=e.imageData.data
for(var s=0,o=t.length;s<o;s++)i=t[s],n=4*s,r[n+0]=(i&c.RED_MASK)>>>16,r[n+1]=(i&c.GREEN_MASK)>>>8,r[n+2]=i&c.BLUE_MASK,r[n+3]=(i&c.ALPHA_MASK)>>>24
e.__isDirty=!0}}(e)}}function Y(e,t){var n
if(e>=ye.width||e<0||t<0||t>=ye.height)return 0
if(hn){var r=4*((0|e)+ye.width*(0|t))
return n=ye.imageData.data,n[r+3]<<24&c.ALPHA_MASK|n[r]<<16&c.RED_MASK|n[r+1]<<8&c.GREEN_MASK|n[r+2]&c.BLUE_MASK}return n=ye.toImageData(0|e,0|t,1,1).data,n[3]<<24&c.ALPHA_MASK|n[0]<<16&c.RED_MASK|n[1]<<8&c.GREEN_MASK|n[2]&c.BLUE_MASK}function K(e,t,n){if(n.isRemote)throw"Image is loaded remotely. Cannot get x,y."
var r=t*n.width*4+4*e,i=n.imageData.data
return i[r+3]<<24&c.ALPHA_MASK|i[r]<<16&c.RED_MASK|i[r+1]<<8&c.GREEN_MASK|i[r+2]&c.BLUE_MASK}function j(e,t,n,r){var i=new wr(n,r,c.ARGB)
return i.fromImageData(ye.toImageData(e,t,n,r)),i}function W(e,t,n,r,i){if(i.isRemote)throw"Image is loaded remotely. Cannot get x,y,w,h."
for(var s=new wr(n,r,c.ARGB),o=s.imageData.data,a=i.width,l=i.height,h=i.imageData.data,u=Math.max(0,-t),f=Math.max(0,-e),p=Math.min(r,l-t),m=Math.min(n,a-e),g=u;g<p;++g)for(var d=4*((t+g)*a+(e+f)),v=4*(g*n+f),y=f;y<m;++y)o[v++]=h[d++],o[v++]=h[d++],o[v++]=h[d++],o[v++]=h[d++]
return s.__isDirty=!0,s}function Z(){hn&&(Ae=We,hn=!1,ye.updatePixels())}function q(){function e(e,t){function n(){Z(),Ae[t].apply(Ae,arguments)}e[t]=n}function t(e,t){function n(){return Z(),Ae[t]}function r(e){Z(),Ae[t]=e}ye.defineProperty(e,t,{get:n,set:r})}for(var n in Ae)"function"==typeof Ae[n]?e(this,n):t(this,n)}function Q(){hn||(ye.loadPixels(),null===ln&&(We=Ae,ln=new q),hn=!0,Ae=ln,Ze=0)}function J(e,t,n){e<ye.width&&e>=0&&t>=0&&t<ye.height&&(Q(),ye.pixels.setPixel((0|e)+ye.width*(0|t),n),++Ze>un&&Z())}function ee(e,t,n,r){if(r.isRemote)throw"Image is loaded remotely. Cannot set x,y."
var i=ye.color.toArray(n),s=t*r.width*4+4*e,o=r.imageData.data
o[s]=i[0],o[s+1]=i[1],o[s+2]=i[2],o[s+3]=i[3]}function te(e){return e instanceof String?e:"number"==typeof e?e===(0|e)?e.toString():ye.nf(e,0,3):null===e||e===t?"":e.toString()}function ne(e,t,n,r){var i,s
e.indexOf("\n")<0?(i=[e],s=1):(i=e.split(/\r?\n/g),s=i.length)
var o=0
Jt===c.TOP?o=rn+sn:Jt===c.CENTER?o=rn/2-(s-1)*on/2:Jt===c.BOTTOM&&(o=-(sn+(s-1)*on))
for(var a=0;a<s;++a){var l=i[a]
be.text$line(l,t,n+o,r,Qt),o+=on}}function re(e,t,n,r,i,s){if(0!==e.length&&0!==r&&0!==i&&!(nn>i)){for(var o=-1,a=0,l=0,h=[],u=0,f=e.length;u<f;u++){var p=e[u],m=" "===p,g=an.measureTextWidth(p)
if("\n"!==p&&l+g<=r)m&&(o=u),l+=g
else{if(o+1===a){if(!(u>0))return
o=u}"\n"===p?(h.push({text:e.substring(a,u),width:l}),a=u+1):(h.push({text:e.substring(a,o+1),width:l}),a=o+1),l=0,u=a-1}}a<f&&h.push({text:e.substring(a),width:l})
var d=1,v=rn
Qt===c.CENTER?d=r/2:Qt===c.RIGHT&&(d=r)
var y=h.length,A=Math.min(y,Math.floor(i/on))
Jt===c.TOP?v=rn+sn:Jt===c.CENTER?v=i/2-on*(A/2-1):Jt===c.BOTTOM&&(v=sn+on)
var x,b,w
for(x=0;x<y&&(w=x*on,!(v+w>i-sn));x++)b=h[x],be.text$line(b.text,t+d,n+v+w,s,Qt)}}function ie(e){be="3D"===e?new ir:"2D"===e?new rr:new sr
for(var t in sr.prototype)sr.prototype.hasOwnProperty(t)&&t.indexOf("$")<0&&(ye[t]=be[t])
be.$init()}function se(e){return function(){return ie("2D"),be[e].apply(this,arguments)}}function oe(e){var t=e.which||e.keyCode
switch(t){case 13:return 10
case 91:case 93:case 224:return 157
case 57392:return 17
case 46:return 127
case 45:return 155}return t}function ae(e){var t=e.which||e.keyCode,n=e.shiftKey||e.ctrlKey||e.altKey||e.metaKey
switch(t){case 13:t=n?13:10
break
case 8:t=n?127:8}return new Char(t)}function le(e){return"function"==typeof e.preventDefault?e.preventDefault():"function"==typeof e.stopPropagation&&e.stopPropagation(),!1}function he(){var e
for(e in cn)if(cn.hasOwnProperty(e))return void(ye.__keyPressed=!0)
ye.__keyPressed=!1}function ue(){ye.__keyPressed=!1,cn=[],fn=null}function ce(e,t){cn[e]=t,fn=null,ye.key=t,ye.keyCode=e,ye.keyPressed(),ye.keyCode=0,ye.keyTyped(),he()}function fe(e){var t=oe(e)
if(t===c.DELETE)return void ce(t,new Char(127))
if(pn.indexOf(t)<0)return void(fn=t)
var n=new Char(c.CODED)
return ye.key=n,ye.keyCode=t,cn[t]=n,ye.keyPressed(),fn=null,he(),le(e)}function pe(e){if(null!==fn){var t=fn,n=ae(e)
return ce(t,n),le(e)}}function me(e){var n=oe(e),r=cn[n]
r!==t&&(ye.key=r,ye.keyCode=n,ye.keyReleased(),delete cn[n],he())}if(!(this instanceof E))throw"called Processing constructor as if it were a function: missing 'new'."
var ge={},de=e===t&&n===t
if(ge=de?h.createElement("canvas"):"string"==typeof e?h.getElementById(e):e,!("getContext"in ge))throw"called Processing constructor without passing canvas element reference or id."
var ve=[],ye=this
ye.Char=ye.Character=Char,i.withCommonFunctions(ye),i.withMath(ye),i.withProxyFunctions(ye,S),i.withTouch(ye,ge,A,h,c),s&&Object.keys(s).forEach(function(e){ye[e]=s[e]}),ye.externals={canvas:ge,context:t,sketch:t,window:l},ye.name="Processing.js Instance",ye.use3DContext=!1,ye.focused=!1,ye.breakShape=!1,ye.glyphTable={},ye.pmouseX=0,ye.pmouseY=0,ye.mouseX=0,ye.mouseY=0,ye.mouseButton=0,ye.mouseScroll=0,ye.mouseClicked=t,ye.mouseDragged=t,ye.mouseMoved=t,ye.mousePressed=t,ye.mouseReleased=t,ye.mouseScrolled=t,ye.mouseOver=t,ye.mouseOut=t,ye.touchStart=t,ye.touchEnd=t,ye.touchMove=t,ye.touchCancel=t,ye.key=t,ye.keyCode=t,ye.keyPressed=u,ye.keyReleased=u,ye.keyTyped=u,ye.draw=t,ye.setup=t,ye.__mousePressed=!1,ye.__keyPressed=!1,ye.__frameRate=60,ye.frameCount=0,ye.width=100,ye.height=100
var Ae,xe,be,we,Ee,Se,Pe,Ce,Me,Te,_e,Re,Le,Ie,De,Oe,Ne,Fe,ke,Be,$e,Ge,Ve,ze,Ue,He,Xe,Ye,Ke,je,We,Ze,qe,Qe,Je,et,tt,nt,rt,it,st,ot=!0,at=[1,1,1,1],lt=4294967295,ht=!0,ut=!0,ct=[0,0,0,1],ft=4278190080,pt=!0,mt=1,gt=!1,dt=!1,vt=!0,yt=0,At=c.CORNER,xt=c.CENTER,bt=0,wt=0,Et=0,St=c.NORMAL_MODE_AUTO,Pt=60,Ct=1e3/Pt,Mt=c.ARROW,Tt=ge.style.cursor,_t=c.POLYGON,Rt=[],Lt=0,It=20,Dt=!1,Ot=-3355444,Nt=20,Ft=255,kt=255,Bt=255,$t=255,Gt=0,Vt=0,zt=c.RGB,Ut=null,Ht=null,Xt=Date.now(),Yt=Xt,Kt=0,jt={attributes:{},locations:{}},Wt={width:0,height:0},Zt=c.IMAGE,qt=!1,Qt=c.LEFT,Jt=c.BASELINE,en=c.MODEL,tn="Arial",nn=12,rn=9,sn=2,on=14,an=PFont.get(tn,nn),ln=null,hn=!1,un=1e3,cn=[],fn=null,pn=[c.SHIFT,c.CONTROL,c.ALT,c.CAPSLK,c.PGUP,c.PGDN,c.END,c.HOME,c.LEFT,c.UP,c.RIGHT,c.DOWN,c.NUMLK,c.INSERT,c.F1,c.F2,c.F3,c.F4,c.F5,c.F6,c.F7,c.F8,c.F9,c.F10,c.F11,c.F12,c.META],mn=0,gn=0,dn=0,vn=[],yn=[],An=[],xn=new g(c.SINCOS_LENGTH),bn=new g(c.SINCOS_LENGTH),wn=!1,En=!1,Sn=60*(Math.PI/180),Pn=ye.width/2,Cn=ye.height/2,Mn=Cn/Math.tan(Sn/2),Tn=Mn/10,_n=10*Mn,Rn=ye.width/ye.height,Ln=[],In=[],Dn=0,On=!1,Nn=!1,Fn=!0,kn=c.CORNER,Bn=[],$n=new g([.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,-.5,-.5,.5,.5,-.5,.5,.5,.5,.5,.5,.5,-.5,.5,.5,.5,.5,-.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5,-.5,-.5,.5,-.5,.5,-.5,-.5,.5,-.5,-.5,.5,-.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,.5,.5,.5,.5,.5,-.5,-.5,.5,-.5,-.5,.5,-.5,-.5,.5,.5,.5,.5,.5]),Gn=new g([.5,.5,.5,.5,-.5,.5,.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,-.5,-.5,.5,-.5,-.5,.5,.5,-.5,.5,.5,.5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,-.5,.5,.5,-.5,.5]),Vn=new g([0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]),zn=new g([0,0,0,0,1,0,1,1,0,1,0,0]),Un=new g([0,0,1,0,0,1,0,0,1,0,0,1]),Hn="varying vec4 vFrontColor;attribute vec3 aVertex;attribute vec4 aColor;uniform mat4 uView;uniform mat4 uProjection;uniform float uPointSize;void main(void) {  vFrontColor = aColor;  gl_PointSize = uPointSize;  gl_Position = uProjection * uView * vec4(aVertex, 1.0);}",Xn="#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vFrontColor;uniform bool uSmooth;void main(void){  if(uSmooth == true){    float dist = distance(gl_PointCoord, vec2(0.5));    if(dist > 0.5){      discard;    }  }  gl_FragColor = vFrontColor;}",Yn="varying vec4 vFrontColor;attribute vec3 aVertex;attribute vec2 aTextureCoord;uniform vec4 uColor;uniform mat4 uModel;uniform mat4 uView;uniform mat4 uProjection;uniform float uPointSize;varying vec2 vTextureCoord;void main(void) {  gl_PointSize = uPointSize;  vFrontColor = uColor;  gl_Position = uProjection * uView * uModel * vec4(aVertex, 1.0);  vTextureCoord = aTextureCoord;}",Kn="#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vFrontColor;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform int uIsDrawingText;uniform bool uSmooth;void main(void){  if(uSmooth == true){    float dist = distance(gl_PointCoord, vec2(0.5));    if(dist > 0.5){      discard;    }  }  if(uIsDrawingText == 1){    float alpha = texture2D(uSampler, vTextureCoord).a;    gl_FragColor = vec4(vFrontColor.rgb * alpha, alpha);  }  else{    gl_FragColor = vFrontColor;  }}",jn=/Windows/.test(a.userAgent),Wn="varying vec4 vFrontColor;attribute vec3 aVertex;attribute vec3 aNormal;attribute vec4 aColor;attribute vec2 aTexture;varying   vec2 vTexture;uniform vec4 uColor;uniform bool uUsingMat;uniform vec3 uSpecular;uniform vec3 uMaterialEmissive;uniform vec3 uMaterialAmbient;uniform vec3 uMaterialSpecular;uniform float uShininess;uniform mat4 uModel;uniform mat4 uView;uniform mat4 uProjection;uniform mat4 uNormalTransform;uniform int uLightCount;uniform vec3 uFalloff;struct Light {  int type;  vec3 color;  vec3 position;  vec3 direction;  float angle;  vec3 halfVector;  float concentration;};uniform Light uLights0;uniform Light uLights1;uniform Light uLights2;uniform Light uLights3;uniform Light uLights4;uniform Light uLights5;uniform Light uLights6;uniform Light uLights7;Light getLight(int index){  if(index == 0) return uLights0;  if(index == 1) return uLights1;  if(index == 2) return uLights2;  if(index == 3) return uLights3;  if(index == 4) return uLights4;  if(index == 5) return uLights5;  if(index == 6) return uLights6;  return uLights7;}void AmbientLight( inout vec3 totalAmbient, in vec3 ecPos, in Light light ) {  float d = length( light.position - ecPos );  float attenuation = 1.0 / ( uFalloff[0] + ( uFalloff[1] * d ) + ( uFalloff[2] * d * d ));  totalAmbient += light.color * attenuation;}void DirectionalLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in Light light ) {  float powerFactor = 0.0;  float nDotVP = max(0.0, dot( vertNormal, normalize(-light.position) ));  float nDotVH = max(0.0, dot( vertNormal, normalize(-light.position-normalize(ecPos) )));  if( nDotVP != 0.0 ){    powerFactor = pow( nDotVH, uShininess );  }  col += light.color * nDotVP;  spec += uSpecular * powerFactor;}void PointLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in Light light ) {  float powerFactor;   vec3 VP = light.position - ecPos;  float d = length( VP );   VP = normalize( VP );  float attenuation = 1.0 / ( uFalloff[0] + ( uFalloff[1] * d ) + ( uFalloff[2] * d * d ));  float nDotVP = max( 0.0, dot( vertNormal, VP ));  vec3 halfVector = normalize( VP - normalize(ecPos) );  float nDotHV = max( 0.0, dot( vertNormal, halfVector ));  if( nDotVP == 0.0 ) {    powerFactor = 0.0;  }  else {    powerFactor = pow( nDotHV, uShininess );  }  spec += uSpecular * powerFactor * attenuation;  col += light.color * nDotVP * attenuation;}void SpotLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in Light light ) {  float spotAttenuation;  float powerFactor = 0.0;  vec3 VP = light.position - ecPos;  vec3 ldir = normalize( -light.direction );  float d = length( VP );  VP = normalize( VP );  float attenuation = 1.0 / ( uFalloff[0] + ( uFalloff[1] * d ) + ( uFalloff[2] * d * d ) );  float spotDot = dot( VP, ldir );"+(jn?"  spotAttenuation = 1.0; ":"  if( spotDot > cos( light.angle ) ) {    spotAttenuation = pow( spotDot, light.concentration );  }  else{    spotAttenuation = 0.0;  }  attenuation *= spotAttenuation;")+"  float nDotVP = max( 0.0, dot( vertNormal, VP ) );  vec3 halfVector = normalize( VP - normalize(ecPos) );  float nDotHV = max( 0.0, dot( vertNormal, halfVector ) );  if( nDotVP != 0.0 ) {    powerFactor = pow( nDotHV, uShininess );  }  spec += uSpecular * powerFactor * attenuation;  col += light.color * nDotVP * attenuation;}void main(void) {  vec3 finalAmbient = vec3( 0.0 );  vec3 finalDiffuse = vec3( 0.0 );  vec3 finalSpecular = vec3( 0.0 );  vec4 col = uColor;  if ( uColor[0] == -1.0 ){    col = aColor;  }  vec3 norm = normalize(vec3( uNormalTransform * vec4( aNormal, 0.0 ) ));  vec4 ecPos4 = uView * uModel * vec4(aVertex, 1.0);  vec3 ecPos = (vec3(ecPos4))/ecPos4.w;  if( uLightCount == 0 ) {    vFrontColor = col + vec4(uMaterialSpecular, 1.0);  }  else {    for( int i = 0; i < 8; i++ ) {      Light l = getLight(i);      if( i >= uLightCount ){        break;      }      if( l.type == 0 ) {        AmbientLight( finalAmbient, ecPos, l );      }      else if( l.type == 1 ) {        DirectionalLight( finalDiffuse, finalSpecular, norm, ecPos, l );      }      else if( l.type == 2 ) {        PointLight( finalDiffuse, finalSpecular, norm, ecPos, l );      }      else {        SpotLight( finalDiffuse, finalSpecular, norm, ecPos, l );      }    }   if( uUsingMat == false ) {     vFrontColor = vec4(       vec3( col ) * finalAmbient +       vec3( col ) * finalDiffuse +       vec3( col ) * finalSpecular,       col[3] );   }   else{     vFrontColor = vec4(        uMaterialEmissive +        (vec3(col) * uMaterialAmbient * finalAmbient ) +        (vec3(col) * finalDiffuse) +        (uMaterialSpecular * finalSpecular),        col[3] );    }  }  vTexture.xy = aTexture.xy;  gl_Position = uProjection * uView * uModel * vec4( aVertex, 1.0 );}",Zn="#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vFrontColor;uniform sampler2D uSampler;uniform bool uUsingTexture;varying vec2 vTexture;void main(void){  if( uUsingTexture ){    gl_FragColor = vec4(texture2D(uSampler, vTexture.xy)) * vFrontColor;  }  else{    gl_FragColor = vFrontColor;  }}",qn=function(e,t,n){var r=e.createShader(e.VERTEX_SHADER)
if(e.shaderSource(r,t),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw e.getShaderInfoLog(r)
var i=e.createShader(e.FRAGMENT_SHADER)
if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS))throw e.getShaderInfoLog(i)
var s=e.createProgram()
if(e.attachShader(s,r),e.attachShader(s,i),e.linkProgram(s),!e.getProgramParameter(s,e.LINK_STATUS))throw"Error linking shaders."
return s},Qn=function(e,t,n,r,i){return{x:e,y:t,w:n,h:r}},Jn=Qn,er=function(e,t,n,r,i){return{x:e,y:t,w:i?n:n-e,h:i?r:r-t}},tr=function(e,t,n,r,i){return{x:e-n/2,y:t-r/2,w:n,h:r}},nr=function(){},rr=function(){},ir=function(){},sr=function(){}
rr.prototype=new nr,rr.prototype.constructor=rr,ir.prototype=new nr,ir.prototype.constructor=ir,sr.prototype=new nr,sr.prototype.constructor=sr,nr.prototype.a3DOnlyFunction=u,ye.shape=function(e,t,n,r,i){arguments.length>=1&&null!==arguments[0]&&e.isVisible()&&(ye.pushMatrix(),kn===c.CENTER?5===arguments.length?(ye.translate(t-r/2,n-i/2),ye.scale(r/e.getWidth(),i/e.getHeight())):3===arguments.length?ye.translate(t-e.getWidth()/2,-e.getHeight()/2):ye.translate(-e.getWidth()/2,-e.getHeight()/2):kn===c.CORNER?5===arguments.length?(ye.translate(t,n),ye.scale(r/e.getWidth(),i/e.getHeight())):3===arguments.length&&ye.translate(t,n):kn===c.CORNERS&&(5===arguments.length?(r-=t,i-=n,ye.translate(t,n),ye.scale(r/e.getWidth(),i/e.getHeight())):3===arguments.length&&ye.translate(t,n)),e.draw(ye),(1===arguments.length&&kn===c.CENTER||arguments.length>1)&&ye.popMatrix())},ye.shapeMode=function(e){kn=e},ye.loadShape=function(e){return 1===arguments.length&&e.indexOf(".svg")>-1?new PShapeSVG(null,e):null},ye.loadXML=function(e){return new XML(ye,e)},ye.parseXML=function(e){var t=new XML
return t.parse(e),t}
var or=function(e){for(var t=0,n=0;n<e.length;n++)t=0!==n?Math.max(t,Math.abs(e[n])):Math.abs(e[n])
var r=(t+"").indexOf(".")
return 0===r?r=1:r===-1&&(r=(t+"").length),r},ar=ye.PMatrix2D=function(){0===arguments.length?this.reset():1===arguments.length&&arguments[0]instanceof ar?this.set(arguments[0].array()):6===arguments.length&&this.set(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])}
ar.prototype={set:function(){if(6===arguments.length){var e=arguments
this.set([e[0],e[1],e[2],e[3],e[4],e[5]])}else 1===arguments.length&&arguments[0]instanceof ar?this.elements=arguments[0].array():1===arguments.length&&arguments[0]instanceof Array&&(this.elements=arguments[0].slice())},get:function(){var e=new ar
return e.set(this.elements),e},reset:function(){this.set([1,0,0,0,1,0])},array:function(){return this.elements.slice()},translate:function(e,t){this.elements[2]=e*this.elements[0]+t*this.elements[1]+this.elements[2],this.elements[5]=e*this.elements[3]+t*this.elements[4]+this.elements[5]},invTranslate:function(e,t){this.translate(-e,-t)},transpose:function(){},mult:function(e,t){var n,r
return e instanceof PVector?(n=e.x,r=e.y,t||(t=new PVector)):e instanceof Array&&(n=e[0],r=e[1],t||(t=[])),t instanceof Array?(t[0]=this.elements[0]*n+this.elements[1]*r+this.elements[2],t[1]=this.elements[3]*n+this.elements[4]*r+this.elements[5]):t instanceof PVector&&(t.x=this.elements[0]*n+this.elements[1]*r+this.elements[2],t.y=this.elements[3]*n+this.elements[4]*r+this.elements[5],t.z=0),t},multX:function(e,t){return e*this.elements[0]+t*this.elements[1]+this.elements[2]},multY:function(e,t){return e*this.elements[3]+t*this.elements[4]+this.elements[5]},skewX:function(e){this.apply(1,0,1,e,0,0)},skewY:function(e){this.apply(1,0,1,0,e,0)},shearX:function(e){this.apply(1,0,1,Math.tan(e),0,0)},shearY:function(e){this.apply(1,0,1,0,Math.tan(e),0)},determinant:function(){return this.elements[0]*this.elements[4]-this.elements[1]*this.elements[3]},invert:function(){var e=this.determinant()
if(Math.abs(e)>c.MIN_INT){var t=this.elements[0],n=this.elements[1],r=this.elements[2],i=this.elements[3],s=this.elements[4],o=this.elements[5]
return this.elements[0]=s/e,this.elements[3]=-i/e,this.elements[1]=-n/e,this.elements[4]=t/e,this.elements[2]=(n*o-s*r)/e,this.elements[5]=(i*r-t*o)/e,!0}return!1},scale:function(e,t){e&&!t&&(t=e),e&&t&&(this.elements[0]*=e,this.elements[1]*=t,this.elements[3]*=e,this.elements[4]*=t)},invScale:function(e,t){e&&!t&&(t=e),this.scale(1/e,1/t)},apply:function(){var e
1===arguments.length&&arguments[0]instanceof ar?e=arguments[0].array():6===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
for(var t=[0,0,this.elements[2],0,0,this.elements[5]],n=0,r=0;r<2;r++)for(var i=0;i<3;i++,n++)t[n]+=this.elements[3*r+0]*e[i+0]+this.elements[3*r+1]*e[i+3]
this.elements=t.slice()},preApply:function(){var e
1===arguments.length&&arguments[0]instanceof ar?e=arguments[0].array():6===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
var t=[0,0,e[2],0,0,e[5]]
t[2]=e[2]+this.elements[2]*e[0]+this.elements[5]*e[1],t[5]=e[5]+this.elements[2]*e[3]+this.elements[5]*e[4],t[0]=this.elements[0]*e[0]+this.elements[3]*e[1],t[3]=this.elements[0]*e[3]+this.elements[3]*e[4],t[1]=this.elements[1]*e[0]+this.elements[4]*e[1],t[4]=this.elements[1]*e[3]+this.elements[4]*e[4],this.elements=t.slice()},rotate:function(e){var t=Math.cos(e),n=Math.sin(e),r=this.elements[0],i=this.elements[1]
this.elements[0]=t*r+n*i,this.elements[1]=-n*r+t*i,r=this.elements[3],i=this.elements[4],this.elements[3]=t*r+n*i,this.elements[4]=-n*r+t*i},rotateZ:function(e){this.rotate(e)},invRotateZ:function(e){this.rotateZ(e-Math.PI)},print:function(){var e=or(this.elements),t=""+ye.nfs(this.elements[0],e,4)+" "+ye.nfs(this.elements[1],e,4)+" "+ye.nfs(this.elements[2],e,4)+"\n"+ye.nfs(this.elements[3],e,4)+" "+ye.nfs(this.elements[4],e,4)+" "+ye.nfs(this.elements[5],e,4)+"\n\n"
ye.println(t)}}
var lr=ye.PMatrix3D=function(){this.reset()}
lr.prototype={set:function(){16===arguments.length?this.elements=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof lr?this.elements=arguments[0].array():1===arguments.length&&arguments[0]instanceof Array&&(this.elements=arguments[0].slice())},get:function(){var e=new lr
return e.set(this.elements),e},reset:function(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},array:function(){return this.elements.slice()},translate:function(e,n,r){r===t&&(r=0),this.elements[3]+=e*this.elements[0]+n*this.elements[1]+r*this.elements[2],this.elements[7]+=e*this.elements[4]+n*this.elements[5]+r*this.elements[6],this.elements[11]+=e*this.elements[8]+n*this.elements[9]+r*this.elements[10],this.elements[15]+=e*this.elements[12]+n*this.elements[13]+r*this.elements[14]},transpose:function(){var e=this.elements[4]
this.elements[4]=this.elements[1],this.elements[1]=e,e=this.elements[8],this.elements[8]=this.elements[2],this.elements[2]=e,e=this.elements[6],this.elements[6]=this.elements[9],this.elements[9]=e,e=this.elements[3],this.elements[3]=this.elements[12],this.elements[12]=e,e=this.elements[7],this.elements[7]=this.elements[13],this.elements[13]=e,e=this.elements[11],this.elements[11]=this.elements[14],this.elements[14]=e},mult:function(e,t){var n,r,i,s
return e instanceof PVector?(n=e.x,r=e.y,i=e.z,s=1,t||(t=new PVector)):e instanceof Array&&(n=e[0],r=e[1],i=e[2],s=e[3]||1,(!t||3!==t.length&&4!==t.length)&&(t=[0,0,0])),t instanceof Array&&(3===t.length?(t[0]=this.elements[0]*n+this.elements[1]*r+this.elements[2]*i+this.elements[3],t[1]=this.elements[4]*n+this.elements[5]*r+this.elements[6]*i+this.elements[7],t[2]=this.elements[8]*n+this.elements[9]*r+this.elements[10]*i+this.elements[11]):4===t.length&&(t[0]=this.elements[0]*n+this.elements[1]*r+this.elements[2]*i+this.elements[3]*s,t[1]=this.elements[4]*n+this.elements[5]*r+this.elements[6]*i+this.elements[7]*s,t[2]=this.elements[8]*n+this.elements[9]*r+this.elements[10]*i+this.elements[11]*s,t[3]=this.elements[12]*n+this.elements[13]*r+this.elements[14]*i+this.elements[15]*s)),t instanceof PVector&&(t.x=this.elements[0]*n+this.elements[1]*r+this.elements[2]*i+this.elements[3],t.y=this.elements[4]*n+this.elements[5]*r+this.elements[6]*i+this.elements[7],t.z=this.elements[8]*n+this.elements[9]*r+this.elements[10]*i+this.elements[11]),t},preApply:function(){var e
1===arguments.length&&arguments[0]instanceof lr?e=arguments[0].array():16===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
for(var t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0,r=0;r<4;r++)for(var i=0;i<4;i++,n++)t[n]+=this.elements[i+0]*e[4*r+0]+this.elements[i+4]*e[4*r+1]+this.elements[i+8]*e[4*r+2]+this.elements[i+12]*e[4*r+3]
this.elements=t.slice()},apply:function(){var e
1===arguments.length&&arguments[0]instanceof lr?e=arguments[0].array():16===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
for(var t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0,r=0;r<4;r++)for(var i=0;i<4;i++,n++)t[n]+=this.elements[4*r+0]*e[i+0]+this.elements[4*r+1]*e[i+4]+this.elements[4*r+2]*e[i+8]+this.elements[4*r+3]*e[i+12]
this.elements=t.slice()},rotate:function(e,t,n,r){if(arguments.length<4)this.rotateZ(e)
else{var i=new PVector(t,n,r),s=i.mag()
if(0===s)return
1!=s&&(i.normalize(),t=i.x,n=i.y,r=i.z)
var o=ye.cos(e),a=ye.sin(e),l=1-o
this.apply(l*t*t+o,l*t*n-a*r,l*t*r+a*n,0,l*t*n+a*r,l*n*n+o,l*n*r-a*t,0,l*t*r-a*n,l*n*r+a*t,l*r*r+o,0,0,0,0,1)}},invApply:function(){it===t&&(it=new lr)
var e=arguments
return it.set(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]),!!it.invert()&&(this.preApply(it),!0)},rotateX:function(e){var t=ye.cos(e),n=ye.sin(e)
this.apply([1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1])},rotateY:function(e){var t=ye.cos(e),n=ye.sin(e)
this.apply([t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1])},rotateZ:function(e){var t=Math.cos(e),n=Math.sin(e)
this.apply([t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1])},scale:function(e,t,n){!e||t||n?e&&t&&!n&&(n=1):t=n=e,e&&t&&n&&(this.elements[0]*=e,this.elements[1]*=t,this.elements[2]*=n,this.elements[4]*=e,this.elements[5]*=t,this.elements[6]*=n,this.elements[8]*=e,this.elements[9]*=t,this.elements[10]*=n,this.elements[12]*=e,this.elements[13]*=t,this.elements[14]*=n)},skewX:function(e){var t=Math.tan(e)
this.apply(1,t,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},skewY:function(e){var t=Math.tan(e)
this.apply(1,0,0,0,t,1,0,0,0,0,1,0,0,0,0,1)},shearX:function(e){var t=Math.tan(e)
this.apply(1,t,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},shearY:function(e){var t=Math.tan(e)
this.apply(1,0,0,0,t,1,0,0,0,0,1,0,0,0,0,1)},multX:function(e,t,n,r){return n?r?this.elements[0]*e+this.elements[1]*t+this.elements[2]*n+this.elements[3]*r:this.elements[0]*e+this.elements[1]*t+this.elements[2]*n+this.elements[3]:this.elements[0]*e+this.elements[1]*t+this.elements[3]},multY:function(e,t,n,r){return n?r?this.elements[4]*e+this.elements[5]*t+this.elements[6]*n+this.elements[7]*r:this.elements[4]*e+this.elements[5]*t+this.elements[6]*n+this.elements[7]:this.elements[4]*e+this.elements[5]*t+this.elements[7]},multZ:function(e,t,n,r){return r?this.elements[8]*e+this.elements[9]*t+this.elements[10]*n+this.elements[11]*r:this.elements[8]*e+this.elements[9]*t+this.elements[10]*n+this.elements[11]},multW:function(e,t,n,r){return r?this.elements[12]*e+this.elements[13]*t+this.elements[14]*n+this.elements[15]*r:this.elements[12]*e+this.elements[13]*t+this.elements[14]*n+this.elements[15]},invert:function(){var e=this.elements[0]*this.elements[5]-this.elements[1]*this.elements[4],t=this.elements[0]*this.elements[6]-this.elements[2]*this.elements[4],n=this.elements[0]*this.elements[7]-this.elements[3]*this.elements[4],r=this.elements[1]*this.elements[6]-this.elements[2]*this.elements[5],i=this.elements[1]*this.elements[7]-this.elements[3]*this.elements[5],s=this.elements[2]*this.elements[7]-this.elements[3]*this.elements[6],o=this.elements[8]*this.elements[13]-this.elements[9]*this.elements[12],a=this.elements[8]*this.elements[14]-this.elements[10]*this.elements[12],l=this.elements[8]*this.elements[15]-this.elements[11]*this.elements[12],h=this.elements[9]*this.elements[14]-this.elements[10]*this.elements[13],u=this.elements[9]*this.elements[15]-this.elements[11]*this.elements[13],c=this.elements[10]*this.elements[15]-this.elements[11]*this.elements[14],f=e*c-t*u+n*h+r*l-i*a+s*o
if(Math.abs(f)<=1e-9)return!1
var p=[]
p[0]=+this.elements[5]*c-this.elements[6]*u+this.elements[7]*h,p[4]=-this.elements[4]*c+this.elements[6]*l-this.elements[7]*a,p[8]=+this.elements[4]*u-this.elements[5]*l+this.elements[7]*o,p[12]=-this.elements[4]*h+this.elements[5]*a-this.elements[6]*o,p[1]=-this.elements[1]*c+this.elements[2]*u-this.elements[3]*h,p[5]=+this.elements[0]*c-this.elements[2]*l+this.elements[3]*a,p[9]=-this.elements[0]*u+this.elements[1]*l-this.elements[3]*o,p[13]=+this.elements[0]*h-this.elements[1]*a+this.elements[2]*o,p[2]=+this.elements[13]*s-this.elements[14]*i+this.elements[15]*r,p[6]=-this.elements[12]*s+this.elements[14]*n-this.elements[15]*t,p[10]=+this.elements[12]*i-this.elements[13]*n+this.elements[15]*e,p[14]=-this.elements[12]*r+this.elements[13]*t-this.elements[14]*e,p[3]=-this.elements[9]*s+this.elements[10]*i-this.elements[11]*r,p[7]=+this.elements[8]*s-this.elements[10]*n+this.elements[11]*t,p[11]=-this.elements[8]*i+this.elements[9]*n-this.elements[11]*e,p[15]=+this.elements[8]*r-this.elements[9]*t+this.elements[10]*e
var m=1/f
return p[0]*=m,p[1]*=m,p[2]*=m,p[3]*=m,p[4]*=m,p[5]*=m,p[6]*=m,p[7]*=m,p[8]*=m,p[9]*=m,p[10]*=m,p[11]*=m,p[12]*=m,p[13]*=m,p[14]*=m,p[15]*=m,this.elements=p.slice(),!0},toString:function(){for(var e="",t=0;t<15;t++)e+=this.elements[t]+", "
return e+=this.elements[15]},print:function(){var e=or(this.elements),t=""+ye.nfs(this.elements[0],e,4)+" "+ye.nfs(this.elements[1],e,4)+" "+ye.nfs(this.elements[2],e,4)+" "+ye.nfs(this.elements[3],e,4)+"\n"+ye.nfs(this.elements[4],e,4)+" "+ye.nfs(this.elements[5],e,4)+" "+ye.nfs(this.elements[6],e,4)+" "+ye.nfs(this.elements[7],e,4)+"\n"+ye.nfs(this.elements[8],e,4)+" "+ye.nfs(this.elements[9],e,4)+" "+ye.nfs(this.elements[10],e,4)+" "+ye.nfs(this.elements[11],e,4)+"\n"+ye.nfs(this.elements[12],e,4)+" "+ye.nfs(this.elements[13],e,4)+" "+ye.nfs(this.elements[14],e,4)+" "+ye.nfs(this.elements[15],e,4)+"\n\n"
ye.println(t)},invTranslate:function(e,t,n){this.preApply(1,0,0,-e,0,1,0,-t,0,0,1,-n,0,0,0,1)},invRotateX:function(e){var t=Math.cos(-e),n=Math.sin(-e)
this.preApply([1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1])},invRotateY:function(e){var t=Math.cos(-e),n=Math.sin(-e)
this.preApply([t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1])},invRotateZ:function(e){var t=Math.cos(-e),n=Math.sin(-e)
this.preApply([t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1])},invScale:function(e,t,n){this.preApply([1/e,0,0,0,0,1/t,0,0,0,0,1/n,0,0,0,0,1])}}
var hr=ye.PMatrixStack=function(){this.matrixStack=[]}
hr.prototype.load=function(){var e=be.$newPMatrix()
1===arguments.length?e.set(arguments[0]):e.set(arguments),this.matrixStack.push(e)},rr.prototype.$newPMatrix=function(){return new ar},ir.prototype.$newPMatrix=function(){return new lr},hr.prototype.push=function(){this.matrixStack.push(this.peek())},hr.prototype.pop=function(){return this.matrixStack.pop()},hr.prototype.peek=function(){var e=be.$newPMatrix()
return e.set(this.matrixStack[this.matrixStack.length-1]),e},hr.prototype.mult=function(e){this.matrixStack[this.matrixStack.length-1].apply(e)},ye.split=function(e,t){return e.split(t)},ye.splitTokens=function(e,n){if(n===t)return e.split(/\s+/g)
var r,i,s=n.split(/()/g),o="",a=e.length,l=[]
for(r=0;r<a;r++)i=e[r],s.indexOf(i)>-1?(""!==o&&l.push(o),o=""):o+=i
return""!==o&&l.push(o),l},ye.append=function(e,t){return e[e.length]=t,e},ye.concat=function(e,t){return e.concat(t)},ye.sort=function(e,t){var n=[]
if(e.length>0){for(var r=t>0?t:e.length,i=0;i<r;i++)n.push(e[i])
if("string"==typeof e[0]?n.sort():n.sort(function(e,t){return e-t}),t>0)for(var s=n.length;s<e.length;s++)n.push(e[s])}return n},ye.splice=function(e,t,n){if(0===t.length)return e
if(t instanceof Array)for(var r=0,i=n;r<t.length;i++,r++)e.splice(i,0,t[r])
else e.splice(n,0,t)
return e},ye.subset=function(e,n,r){var i=r!==t?n+r:e.length
return e.slice(n,i)},ye.join=function(e,t){return e.join(t)},ye.shorten=function(e){for(var t=[],n=e.length,r=0;r<n;r++)t[r]=e[r]
return t.pop(),t},ye.expand=function(e,t){var n=e.slice(0),r=t||2*e.length
return n.length=r,n},ye.arrayCopy=function(){var e,n,r,i=0,s=0
2===arguments.length?(e=arguments[0],n=arguments[1],r=e.length):3===arguments.length?(e=arguments[0],n=arguments[1],r=arguments[2]):5===arguments.length&&(e=arguments[0],i=arguments[1],n=arguments[2],s=arguments[3],r=arguments[4])
for(var o=i,a=s;o<r+i;o++,a++){if(n[a]===t)throw"array index out of bounds exception"
n[a]=e[o]}},ye.reverse=function(e){return e.reverse()},ye.mix=function(e,t,n){return e+((t-e)*n>>8)},ye.peg=function(e){return e<0?0:e>255?255:e},ye.modes=function(){function e(e,t,n,r,i,o,a,l,h,u,c){var f=s(((4278190080&e)>>>24)+t,255)<<24,p=n+((h-n)*t>>8)
p=(p<0?0:p>255?255:p)<<16
var m=r+((u-r)*t>>8)
m=(m<0?0:m>255?255:m)<<8
var g=i+((c-i)*t>>8)
return g=g<0?0:g>255?255:g,f|p|m|g}var t=c.ALPHA_MASK,n=c.RED_MASK,r=c.GREEN_MASK,i=c.BLUE_MASK,s=Math.min,o=Math.max
return{replace:function(e,t){return t},blend:function(e,o){var a=(o&t)>>>24,l=e&n,h=e&r,u=e&i,c=o&n,f=o&r,p=o&i
return s(((e&t)>>>24)+a,255)<<24|l+((c-l)*a>>8)&n|h+((f-h)*a>>8)&r|u+((p-u)*a>>8)&i},add:function(e,o){var a=(o&t)>>>24
return s(((e&t)>>>24)+a,255)<<24|s((e&n)+((o&n)>>8)*a,n)&n|s((e&r)+((o&r)>>8)*a,r)&r|s((e&i)+((o&i)*a>>8),i)},subtract:function(e,a){var l=(a&t)>>>24
return s(((e&t)>>>24)+l,255)<<24|o((e&n)-((a&n)>>8)*l,r)&n|o((e&r)-((a&r)>>8)*l,i)&r|o((e&i)-((a&i)*l>>8),0)},lightest:function(e,a){var l=(a&t)>>>24
return s(((e&t)>>>24)+l,255)<<24|o(e&n,((a&n)>>8)*l)&n|o(e&r,((a&r)>>8)*l)&r|o(e&i,(a&i)*l>>8)},darkest:function(e,o){var a=(o&t)>>>24,l=e&n,h=e&r,u=e&i,c=s(e&n,((o&n)>>8)*a),f=s(e&r,((o&r)>>8)*a),p=s(e&i,(o&i)*a>>8)
return s(((e&t)>>>24)+a,255)<<24|l+((c-l)*a>>8)&n|h+((f-h)*a>>8)&r|u+((p-u)*a>>8)&i},difference:function(s,o){var a=(o&t)>>>24,l=(s&n)>>16,h=(s&r)>>8,u=s&i,c=(o&n)>>16,f=(o&r)>>8,p=o&i,m=l>c?l-c:c-l,g=h>f?h-f:f-h,d=u>p?u-p:p-u
return e(s,a,l,h,u,c,f,p,m,g,d)},exclusion:function(s,o){var a=(o&t)>>>24,l=(s&n)>>16,h=(s&r)>>8,u=s&i,c=(o&n)>>16,f=(o&r)>>8,p=o&i,m=l+c-(l*c>>7),g=h+f-(h*f>>7),d=u+p-(u*p>>7)
return e(s,a,l,h,u,c,f,p,m,g,d)},multiply:function(s,o){var a=(o&t)>>>24,l=(s&n)>>16,h=(s&r)>>8,u=s&i,c=(o&n)>>16,f=(o&r)>>8,p=o&i,m=l*c>>8,g=h*f>>8,d=u*p>>8
return e(s,a,l,h,u,c,f,p,m,g,d)},screen:function(s,o){var a=(o&t)>>>24,l=(s&n)>>16,h=(s&r)>>8,u=s&i,c=(o&n)>>16,f=(o&r)>>8,p=o&i,m=255-((255-l)*(255-c)>>8),g=255-((255-h)*(255-f)>>8),d=255-((255-u)*(255-p)>>8)
return e(s,a,l,h,u,c,f,p,m,g,d)},hard_light:function(s,o){var a=(o&t)>>>24,l=(s&n)>>16,h=(s&r)>>8,u=s&i,c=(o&n)>>16,f=(o&r)>>8,p=o&i,m=c<128?l*c>>7:255-((255-l)*(255-c)>>7),g=f<128?h*f>>7:255-((255-h)*(255-f)>>7),d=p<128?u*p>>7:255-((255-u)*(255-p)>>7)
return e(s,a,l,h,u,c,f,p,m,g,d)},soft_light:function(s,o){var a=(o&t)>>>24,l=(s&n)>>16,h=(s&r)>>8,u=s&i,c=(o&n)>>16,f=(o&r)>>8,p=o&i,m=(l*c>>7)+(l*l>>8)-(l*l*c>>15),g=(h*f>>7)+(h*h>>8)-(h*h*f>>15),d=(u*p>>7)+(u*u>>8)-(u*u*p>>15)
return e(s,a,l,h,u,c,f,p,m,g,d)},overlay:function(s,o){var a=(o&t)>>>24,l=(s&n)>>16,h=(s&r)>>8,u=s&i,c=(o&n)>>16,f=(o&r)>>8,p=o&i,m=l<128?l*c>>7:255-((255-l)*(255-c)>>7),g=h<128?h*f>>7:255-((255-h)*(255-f)>>7),d=u<128?u*p>>7:255-((255-u)*(255-p)>>7)
return e(s,a,l,h,u,c,f,p,m,g,d)},dodge:function(s,o){var a=(o&t)>>>24,l=(s&n)>>16,h=(s&r)>>8,u=s&i,c=(o&n)>>16,f=(o&r)>>8,p=o&i,m=255
255!==c&&(m=(l<<8)/(255-c),m=m<0?0:m>255?255:m)
var g=255
255!==f&&(g=(h<<8)/(255-f),g=g<0?0:g>255?255:g)
var d=255
return 255!==p&&(d=(u<<8)/(255-p),d=d<0?0:d>255?255:d),e(s,a,l,h,u,c,f,p,m,g,d)},burn:function(s,o){var a=(o&t)>>>24,l=(s&n)>>16,h=(s&r)>>8,u=s&i,c=(o&n)>>16,f=(o&r)>>8,p=o&i,m=0
0!==c&&(m=(255-l<<8)/c,m=255-(m<0?0:m>255?255:m))
var g=0
0!==f&&(g=(255-h<<8)/f,g=255-(g<0?0:g>255?255:g))
var d=0
return 0!==p&&(d=(255-u<<8)/p,d=255-(d<0?0:d>255?255:d)),e(s,a,l,h,u,c,f,p,m,g,d)}}}(),ye.color=function(e,n,r,i){return e!==t&&n!==t&&r!==t&&i!==t?R(e,n,r,i):e!==t&&n!==t&&r!==t?R(e,n,r,Ft):e!==t&&n!==t?L(e,n):"number"==typeof e?I(e):R(kt,Bt,$t,Ft)},ye.color.toString=function(e){return"rgba("+((e&c.RED_MASK)>>>16)+","+((e&c.GREEN_MASK)>>>8)+","+(e&c.BLUE_MASK)+","+((e&c.ALPHA_MASK)>>>24)/255+")"},ye.color.toInt=function(e,t,n,r){return r<<24&c.ALPHA_MASK|e<<16&c.RED_MASK|t<<8&c.GREEN_MASK|n&c.BLUE_MASK},ye.color.toArray=function(e){return[(e&c.RED_MASK)>>>16,(e&c.GREEN_MASK)>>>8,e&c.BLUE_MASK,(e&c.ALPHA_MASK)>>>24]},ye.color.toGLArray=function(e){return[((e&c.RED_MASK)>>>16)/255,((e&c.GREEN_MASK)>>>8)/255,(e&c.BLUE_MASK)/255,((e&c.ALPHA_MASK)>>>24)/255]},ye.color.toRGB=function(e,t,n){e=e>kt?kt:e,t=t>Bt?Bt:t,n=n>$t?$t:n,e=e/kt*360,t=t/Bt*100,n=n/$t*100
var r=Math.round(n/100*255)
if(0===t)return[r,r,r]
var i=e%360,s=i%60,o=Math.round(n*(100-t)/1e4*255),a=Math.round(n*(6e3-t*s)/6e5*255),l=Math.round(n*(6e3-t*(60-s))/6e5*255)
switch(Math.floor(i/60)){case 0:return[r,l,o]
case 1:return[a,r,o]
case 2:return[o,r,l]
case 3:return[o,a,r]
case 4:return[l,o,r]
case 5:return[r,o,a]}},ye.brightness=function(e){return D(e)[2]},ye.saturation=function(e){return D(e)[1]},ye.hue=function(e){return D(e)[0]},ye.red=function(e){return((e&c.RED_MASK)>>>16)/255*kt},ye.green=function(e){return((e&c.GREEN_MASK)>>>8)/255*Bt},ye.blue=function(e){return(e&c.BLUE_MASK)/255*$t},ye.alpha=function(e){return((e&c.ALPHA_MASK)>>>24)/255*Ft},ye.lerpColor=function(e,t,n){var r,i,s,o,a,l,h,u,f,p,m,g,d,v,y,A,x,b=ye.color(e),w=ye.color(t)
return zt===c.HSB?(d=D(b),u=((b&c.ALPHA_MASK)>>>24)/Ft,v=D(w),g=((w&c.ALPHA_MASK)>>>24)/Ft,A=ye.lerp(d[0],v[0],n),x=ye.lerp(d[1],v[1],n),s=ye.lerp(d[2],v[2],n),y=ye.color.toRGB(A,x,s),o=ye.lerp(u,g,n)*Ft+.5|0,o<<24&c.ALPHA_MASK|y[0]<<16&c.RED_MASK|y[1]<<8&c.GREEN_MASK|y[2]&c.BLUE_MASK):(a=(b&c.RED_MASK)>>>16,l=(b&c.GREEN_MASK)>>>8,h=b&c.BLUE_MASK,u=((b&c.ALPHA_MASK)>>>24)/Ft,f=(w&c.RED_MASK)>>>16,p=(w&c.GREEN_MASK)>>>8,m=w&c.BLUE_MASK,g=((w&c.ALPHA_MASK)>>>24)/Ft,r=ye.lerp(a,f,n)+.5|0,i=ye.lerp(l,p,n)+.5|0,s=ye.lerp(h,m,n)+.5|0,o=ye.lerp(u,g,n)*Ft+.5|0,o<<24&c.ALPHA_MASK|r<<16&c.RED_MASK|i<<8&c.GREEN_MASK|s&c.BLUE_MASK)},ye.colorMode=function(){zt=arguments[0],arguments.length>1&&(kt=arguments[1],Bt=arguments[2]||arguments[1],$t=arguments[3]||arguments[1],Ft=arguments[4]||arguments[1])},ye.blendColor=function(e,t,n){return n===c.REPLACE?ye.modes.replace(e,t):n===c.BLEND?ye.modes.blend(e,t):n===c.ADD?ye.modes.add(e,t):n===c.SUBTRACT?ye.modes.subtract(e,t):n===c.LIGHTEST?ye.modes.lightest(e,t):n===c.DARKEST?ye.modes.darkest(e,t):n===c.DIFFERENCE?ye.modes.difference(e,t):n===c.EXCLUSION?ye.modes.exclusion(e,t):n===c.MULTIPLY?ye.modes.multiply(e,t):n===c.SCREEN?ye.modes.screen(e,t):n===c.HARD_LIGHT?ye.modes.hard_light(e,t):n===c.SOFT_LIGHT?ye.modes.soft_light(e,t):n===c.OVERLAY?ye.modes.overlay(e,t):n===c.DODGE?ye.modes.dodge(e,t):n===c.BURN?ye.modes.burn(e,t):void 0},ye.printMatrix=function(){et.print()},rr.prototype.translate=function(e,t){et.translate(e,t),tt.invTranslate(e,t),Ae.translate(e,t)},ir.prototype.translate=function(e,t,n){et.translate(e,t,n),tt.invTranslate(e,t,n)},rr.prototype.scale=function(e,t){et.scale(e,t),tt.invScale(e,t),Ae.scale(e,t||e)},ir.prototype.scale=function(e,t,n){et.scale(e,t,n),tt.invScale(e,t,n)},rr.prototype.transform=function(e){var t=e.array()
Ae.transform(t[0],t[3],t[1],t[4],t[2],t[5])},ir.prototype.transformm=function(e){throw"p.transform is currently not supported in 3D mode"},rr.prototype.pushMatrix=function(){nt.load(et),rt.load(tt),O()},ir.prototype.pushMatrix=function(){nt.load(et),rt.load(tt)},rr.prototype.popMatrix=function(){et.set(nt.pop()),tt.set(rt.pop()),N()},ir.prototype.popMatrix=function(){et.set(nt.pop()),tt.set(rt.pop())},rr.prototype.resetMatrix=function(){et.reset(),tt.reset(),Ae.setTransform(1,0,0,1,0,0)},ir.prototype.resetMatrix=function(){et.reset(),tt.reset()},nr.prototype.applyMatrix=function(){var e=arguments
et.apply(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]),tt.invApply(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15])},rr.prototype.applyMatrix=function(){for(var e=arguments,t=e.length;t<16;t++)e[t]=0
e[10]=e[15]=1,nr.prototype.applyMatrix.apply(this,e)},ye.rotateX=function(e){et.rotateX(e),tt.invRotateX(e)},rr.prototype.rotateZ=function(){throw"rotateZ() is not supported in 2D mode. Use rotate(float) instead."},ir.prototype.rotateZ=function(e){et.rotateZ(e),tt.invRotateZ(e)},ye.rotateY=function(e){et.rotateY(e),tt.invRotateY(e)},rr.prototype.rotate=function(e){et.rotateZ(e),tt.invRotateZ(e),Ae.rotate(e)},ir.prototype.rotate=function(e){arguments.length<4?ye.rotateZ(e):(et.rotate(e,arguments[1],arguments[2],arguments[3]),tt.rotate(-e,arguments[1],arguments[2],arguments[3]))},rr.prototype.shearX=function(e){et.shearX(e),Ae.transform(1,0,e,1,0,0)},ir.prototype.shearX=function(e){et.shearX(e)},rr.prototype.shearY=function(e){et.shearY(e),Ae.transform(1,e,0,1,0,0)},ir.prototype.shearY=function(e){et.shearY(e)},ye.pushStyle=function(){O(),ye.pushMatrix()
var e={doFill:ot,currentFillColor:lt,doStroke:ut,currentStrokeColor:ft,curTint:Ut,curRectMode:At,curColorMode:zt,colorModeX:kt,colorModeZ:$t,colorModeY:Bt,colorModeA:Ft,curTextFont:an,horizontalTextAlignment:Qt,verticalTextAlignment:Jt,textMode:en,curFontName:tn,curTextSize:nn,curTextAscent:rn,curTextDescent:sn,curTextLeading:on}
Bn.push(e)},ye.popStyle=function(){var e=Bn.pop()
if(!e)throw"Too many popStyle() without enough pushStyle()"
N(),ye.popMatrix(),ot=e.doFill,lt=e.currentFillColor,ut=e.doStroke,ft=e.currentStrokeColor,Ut=e.curTint,At=e.curRectMode,zt=e.curColorMode,kt=e.colorModeX,$t=e.colorModeZ,Bt=e.colorModeY,Ft=e.colorModeA,an=e.curTextFont,tn=e.curFontName,nn=e.curTextSize,Qt=e.horizontalTextAlignment,Jt=e.verticalTextAlignment,en=e.textMode,rn=e.curTextAscent,sn=e.curTextDescent,on=e.curTextLeading},ye.year=function(){return(new Date).getFullYear()},ye.month=function(){return(new Date).getMonth()+1},ye.day=function(){return(new Date).getDate()},ye.hour=function(){return(new Date).getHours()},ye.minute=function(){return(new Date).getMinutes()},ye.second=function(){return(new Date).getSeconds()},ye.millis=function(){return Date.now()-Xt},rr.prototype.redraw=function(){F(),Ae.lineWidth=mt
var e=ye.pmouseX,t=ye.pmouseY
ye.pmouseX=Gt,ye.pmouseY=Vt,O(),ye.draw(),N(),Gt=ye.mouseX,Vt=ye.mouseY,ye.pmouseX=e,ye.pmouseY=t},ir.prototype.redraw=function(){F()
var e=ye.pmouseX,t=ye.pmouseY
ye.pmouseX=Gt,ye.pmouseY=Vt,Ae.clear(Ae.DEPTH_BUFFER_BIT),jt={attributes:{},locations:{}},ye.noLights(),ye.lightFalloff(1,0,0),ye.shininess(1),ye.ambient(255,255,255),ye.specular(0,0,0),ye.emissive(0,0,0),ye.camera(),ye.draw(),Gt=ye.mouseX,Vt=ye.mouseY,ye.pmouseX=e,ye.pmouseY=t},ye.noLoop=function(){vt=!1,gt=!1,clearInterval(yt),xe.onPause()},ye.loop=function(){gt||(Yt=Date.now(),Kt=0,yt=l.setInterval(function(){try{xe.onFrameStart(),ye.redraw(),xe.onFrameEnd()}catch(e){throw l.clearInterval(yt),e}},Ct),vt=!0,gt=!0,xe.onLoop())},ye.frameRate=function(e){Pt=e,Ct=1e3/Pt,vt&&(ye.noLoop(),ye.loop())},ye.exit=function(){l.clearInterval(yt),w(ye.externals.canvas.id),delete ge.onmousedown
for(var e in E.lib)E.lib.hasOwnProperty(e)&&E.lib[e].hasOwnProperty("detach")&&E.lib[e].detach(ye)
for(var t=ve.length;t--;)x(ve[t])
xe.onExit()},ye.cursor=function(){if(arguments.length>1||1===arguments.length&&arguments[0]instanceof ye.PImage){var e,t,n=arguments[0]
if(arguments.length>=3){if(e=arguments[1],t=arguments[2],e<0||t<0||t>=n.height||e>=n.width)throw"x and y must be non-negative and less than the dimensions of the image"}else e=n.width>>>1,t=n.height>>>1
var r=n.toDataURL(),i='url("'+r+'") '+e+" "+t+", default"
Mt=ge.style.cursor=i}else if(1===arguments.length){var s=arguments[0]
Mt=ge.style.cursor=s}else Mt=ge.style.cursor=Tt},ye.noCursor=function(){Mt=ge.style.cursor=c.NOCURSOR},ye.link=function(e,n){n!==t?l.open(e,n):l.location=e},ye.beginDraw=u,ye.endDraw=u,rr.prototype.toImageData=function(e,n,r,i){return e=e!==t?e:0,n=n!==t?n:0,r=r!==t?r:ye.width,i=i!==t?i:ye.height,Ae.getImageData(e,n,r,i)},ir.prototype.toImageData=function(e,n,r,i){e=e!==t?e:0,n=n!==t?n:0,r=r!==t?r:ye.width,i=i!==t?i:ye.height
var s=h.createElement("canvas"),o=s.getContext("2d"),a=o.createImageData(r,i),l=new y(r*i*4)
Ae.readPixels(e,n,r,i,Ae.RGBA,Ae.UNSIGNED_BYTE,l)
for(var u=0,c=l.length,f=a.data;u<c;u++)f[u]=l[(i-1-Math.floor(u/4/r))*r*4+u%(4*r)]
return a},ye.status=function(e){l.status=e},ye.binary=function(e,t){var n
if(t>0)n=t
else if(e instanceof Char)n=16,e|=0
else for(n=32;n>1&&!(e>>>n-1&1);)n--
for(var r="";n>0;)r+=e>>>--n&1?"1":"0"
return r},ye.unbinary=function(e){for(var t=e.length-1,n=1,r=0;t>=0;){var i=e[t--]
if("0"!==i&&"1"!==i)throw"the value passed into unbinary was not an 8 bit binary number"
"1"===i&&(r+=n),n<<=1}return r}
var ur=function(e,n){n=n===t||null===n?n=8:n,e<0&&(e=4294967295+e+1)
for(var r=Number(e).toString(16).toUpperCase();r.length<n;)r="0"+r
return r.length>=n&&(r=r.substring(r.length-n,r.length)),r}
ye.hex=function(e,t){return 1===arguments.length&&(t=e instanceof Char?4:8),ur(e,t)},ye.unhex=function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(k(e[n]))
return t}return k(e)},ye.loadStrings=function(e){if(f[e])return f[e].split("\n")
var t=o(e)
return"string"!=typeof t||""===t?[]:(t=t.replace(/(\r\n?)/g,"\n").replace(/\n$/,""),t.split("\n"))},ye.saveStrings=function(e,t){f[e]=t.join("\n")},ye.loadBytes=function(e){for(var t=o(e),n=[],r=0;r<t.length;r++)n.push(t.charCodeAt(r))
return n},ye.matchAll=function(e,t){for(var n,r=[],i=new RegExp(t,"g");null!==(n=i.exec(e));)r.push(n),0===n[0].length&&++i.lastIndex
return r.length>0?r:null},ye.match=function(e,t){return e.match(t)}
ye.println=function(){E.logger.println.apply(E.logger,arguments)},ye.print=function(){E.logger.print.apply(E.logger,arguments)},ye.str=function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(e[n].toString()+"")
return t}return e.toString()+""},ye.parseBoolean=function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(B(e[n]))
return t}return B(e)},ye.parseByte=function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(0-(128&e[n])|127&e[n])
return t}return 0-(128&e)|127&e},ye.parseChar=function(e){if("number"==typeof e)return new Char(String.fromCharCode(65535&e))
if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(new Char(String.fromCharCode(65535&e[n])))
return t}throw"char() may receive only one argument of type int, byte, int[], or byte[]."},ye.parseFloat=function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push($(e[n]))
return t}return $(e)},ye.parseInt=function(e,t){if(e instanceof Array){for(var n=[],r=0;r<e.length;r++)"string"!=typeof e[r]||/^\s*[+\-]?\d+\s*$/.test(e[r])?n.push(G(e[r],t)):n.push(0)
return n}return G(e,t)},ye.__int_cast=function(e){return 0|e},ye.__instanceof=function(e,t){if("function"!=typeof t)throw"Function is expected as type argument for instanceof operator"
if("string"==typeof e)return t===Object||t===String
if(e instanceof t)return!0
if("object"!=typeof e||null===e)return!1
var n=e.constructor
if(t.$isInterface){for(var r=[];n;)n.$interfaces&&(r=r.concat(n.$interfaces)),n=n.$base
for(;r.length>0;){var i=r.shift()
if(i===t)return!0
i.$interfaces&&(r=r.concat(i.$interfaces))}return!1}for(;n.hasOwnProperty("$base");)if(n=n.$base,n===t)return!0
return!1},nr.prototype.size=function(e,t,n){ut&&ye.stroke(0),ot&&ye.fill(255)
var r={fillStyle:Ae.fillStyle,strokeStyle:Ae.strokeStyle,lineCap:Ae.lineCap,lineJoin:Ae.lineJoin}
ge.style.length>0&&(ge.style.removeProperty("width"),ge.style.removeProperty("height")),ge.width=ye.width=e||100,ge.height=ye.height=t||100
for(var i in r)r.hasOwnProperty(i)&&(Ae[i]=r[i])
ye.textFont(an),ye.background(),un=Math.max(1e3,e*t*.05),ye.externals.context=Ae
for(var s=0;s<c.SINCOS_LENGTH;s++)xn[s]=ye.sin(s*(c.PI/180)*.5),bn[s]=ye.cos(s*(c.PI/180)*.5)},rr.prototype.size=function(e,n,r){Ae===t&&(Ae=ge.getContext("2d"),nt=new hr,rt=new hr,et=new ar,tt=new ar),nr.prototype.size.apply(this,arguments)},ir.prototype.size=function(){var e=!1
return function(t,n,r){function i(e){for(var t,n=["experimental-webgl","webgl","webkit-3d"],r=0,i=n.length;r<i&&!(t=e.getContext(n[r],{antialias:!1,preserveDrawingBuffer:!0}));r++);return t}if(e)throw"Multiple calls to size() for 3D renders are not allowed."
e=!0
try{ge.width=ye.width=t||100,ge.height=ye.height=n||100,Ae=i(ge),He=Ae.createTexture(),Xe=Ae.createTexture()}catch(e){E.debug(e)}if(!Ae)throw"WebGL context is not supported on this browser."
Ae.viewport(0,0,ge.width,ge.height),Ae.enable(Ae.DEPTH_TEST),Ae.enable(Ae.BLEND),Ae.blendFunc(Ae.SRC_ALPHA,Ae.ONE_MINUS_SRC_ALPHA),Re=qn(Ae,Yn,Kn),Le=qn(Ae,Hn,Xn),ye.strokeWeight(1),_e=qn(Ae,Wn,Zn),Ae.useProgram(_e),C("usingTexture3d",_e,"usingTexture",qt),ye.lightFalloff(1,0,0),ye.shininess(1),ye.ambient(255,255,255),ye.specular(0,0,0),ye.emissive(0,0,0),Ie=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Ie),Ae.bufferData(Ae.ARRAY_BUFFER,$n,Ae.STATIC_DRAW),De=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,De),Ae.bufferData(Ae.ARRAY_BUFFER,Vn,Ae.STATIC_DRAW),Oe=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Oe),Ae.bufferData(Ae.ARRAY_BUFFER,Gn,Ae.STATIC_DRAW),Ne=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Ne),Ae.bufferData(Ae.ARRAY_BUFFER,zn,Ae.STATIC_DRAW),Fe=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Fe),Ae.bufferData(Ae.ARRAY_BUFFER,Un,Ae.STATIC_DRAW),ke=Ae.createBuffer(),Be=Ae.createBuffer(),$e=Ae.createBuffer(),Ge=Ae.createBuffer(),Ve=Ae.createBuffer(),Ue=Ae.createBuffer(),ze=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,ze),Ae.bufferData(Ae.ARRAY_BUFFER,new g([0,0,0]),Ae.STATIC_DRAW),Ye=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Ye),Ae.bufferData(Ae.ARRAY_BUFFER,new g([1,1,0,-1,1,0,-1,-1,0,1,-1,0]),Ae.STATIC_DRAW),Ke=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Ke),Ae.bufferData(Ae.ARRAY_BUFFER,new g([0,0,1,0,1,1,0,1]),Ae.STATIC_DRAW),je=Ae.createBuffer(),Ae.bindBuffer(Ae.ELEMENT_ARRAY_BUFFER,je),Ae.bufferData(Ae.ELEMENT_ARRAY_BUFFER,new v([0,1,2,2,3,0]),Ae.STATIC_DRAW),Qe=new lr,Je=new lr,et=new lr,tt=new lr,st=new lr,ye.camera(),ye.perspective(),nt=new hr,rt=new hr,Ee=new lr,Se=new lr,Pe=new lr,Ce=new lr,Me=new lr,Te=new lr,Te.set(-1,3,-3,1,3,-6,3,0,-3,3,0,0,1,0,0,0),nr.prototype.size.apply(this,arguments)}}(),rr.prototype.ambientLight=nr.prototype.a3DOnlyFunction,ir.prototype.ambientLight=function(e,t,n,r,i,s){if(mn===c.MAX_LIGHTS)throw"can only create "+c.MAX_LIGHTS+" lights"
var o=new PVector(r,i,s),a=new lr
a.scale(1,-1,1),a.apply(et.array()),a.mult(o,o)
var l=R(e,t,n,0),h=[((l&c.RED_MASK)>>>16)/255,((l&c.GREEN_MASK)>>>8)/255,(l&c.BLUE_MASK)/255]
Ae.useProgram(_e),P("uLights.color.3d."+mn,_e,"uLights"+mn+".color",h),P("uLights.position.3d."+mn,_e,"uLights"+mn+".position",o.array()),C("uLights.type.3d."+mn,_e,"uLights"+mn+".type",0),C("uLightCount3d",_e,"uLightCount",++mn)},rr.prototype.directionalLight=nr.prototype.a3DOnlyFunction,ir.prototype.directionalLight=function(e,t,n,r,i,s){if(mn===c.MAX_LIGHTS)throw"can only create "+c.MAX_LIGHTS+" lights"
Ae.useProgram(_e)
var o=new lr
o.scale(1,-1,1),o.apply(et.array()),o=o.array()
var a=[o[0]*r+o[4]*i+o[8]*s,o[1]*r+o[5]*i+o[9]*s,o[2]*r+o[6]*i+o[10]*s],l=R(e,t,n,0),h=[((l&c.RED_MASK)>>>16)/255,((l&c.GREEN_MASK)>>>8)/255,(l&c.BLUE_MASK)/255]
P("uLights.color.3d."+mn,_e,"uLights"+mn+".color",h),P("uLights.position.3d."+mn,_e,"uLights"+mn+".position",a),C("uLights.type.3d."+mn,_e,"uLights"+mn+".type",1),C("uLightCount3d",_e,"uLightCount",++mn)},rr.prototype.lightFalloff=nr.prototype.a3DOnlyFunction,ir.prototype.lightFalloff=function(e,t,n){Ae.useProgram(_e),P("uFalloff3d",_e,"uFalloff",[e,t,n])},rr.prototype.lightSpecular=nr.prototype.a3DOnlyFunction,ir.prototype.lightSpecular=function(e,t,n){var r=R(e,t,n,0),i=[((r&c.RED_MASK)>>>16)/255,((r&c.GREEN_MASK)>>>8)/255,(r&c.BLUE_MASK)/255]
Ae.useProgram(_e),P("uSpecular3d",_e,"uSpecular",i)},ye.lights=function(){ye.ambientLight(128,128,128),ye.directionalLight(128,128,128,0,0,-1),ye.lightFalloff(1,0,0),ye.lightSpecular(0,0,0)},rr.prototype.pointLight=nr.prototype.a3DOnlyFunction,ir.prototype.pointLight=function(e,t,n,r,i,s){if(mn===c.MAX_LIGHTS)throw"can only create "+c.MAX_LIGHTS+" lights"
var o=new PVector(r,i,s),a=new lr
a.scale(1,-1,1),a.apply(et.array()),a.mult(o,o)
var l=R(e,t,n,0),h=[((l&c.RED_MASK)>>>16)/255,((l&c.GREEN_MASK)>>>8)/255,(l&c.BLUE_MASK)/255]
Ae.useProgram(_e),P("uLights.color.3d."+mn,_e,"uLights"+mn+".color",h),P("uLights.position.3d."+mn,_e,"uLights"+mn+".position",o.array()),C("uLights.type.3d."+mn,_e,"uLights"+mn+".type",2),C("uLightCount3d",_e,"uLightCount",++mn)},rr.prototype.noLights=nr.prototype.a3DOnlyFunction,ir.prototype.noLights=function(){mn=0,Ae.useProgram(_e),C("uLightCount3d",_e,"uLightCount",mn)},rr.prototype.spotLight=nr.prototype.a3DOnlyFunction,ir.prototype.spotLight=function(e,t,n,r,i,s,o,a,l,h,u){if(mn===c.MAX_LIGHTS)throw"can only create "+c.MAX_LIGHTS+" lights"
Ae.useProgram(_e)
var f=new PVector(r,i,s),p=new lr
p.scale(1,-1,1),p.apply(et.array()),p.mult(f,f),p=p.array()
var m=[p[0]*o+p[4]*a+p[8]*l,p[1]*o+p[5]*a+p[9]*l,p[2]*o+p[6]*a+p[10]*l],g=R(e,t,n,0),d=[((g&c.RED_MASK)>>>16)/255,((g&c.GREEN_MASK)>>>8)/255,(g&c.BLUE_MASK)/255]
P("uLights.color.3d."+mn,_e,"uLights"+mn+".color",d),P("uLights.position.3d."+mn,_e,"uLights"+mn+".position",f.array()),P("uLights.direction.3d."+mn,_e,"uLights"+mn+".direction",m),P("uLights.concentration.3d."+mn,_e,"uLights"+mn+".concentration",u),P("uLights.angle.3d."+mn,_e,"uLights"+mn+".angle",h),C("uLights.type.3d."+mn,_e,"uLights"+mn+".type",3),C("uLightCount3d",_e,"uLightCount",++mn)},rr.prototype.beginCamera=function(){throw"beginCamera() is not available in 2D mode"},ir.prototype.beginCamera=function(){if(wn)throw"You cannot call beginCamera() again before calling endCamera()"
wn=!0,et=Je,tt=Qe},rr.prototype.endCamera=function(){throw"endCamera() is not available in 2D mode"},ir.prototype.endCamera=function(){if(!wn)throw"You cannot call endCamera() before calling beginCamera()"
et.set(Qe),tt.set(Je),wn=!1},ye.camera=function(e,n,r,i,s,o,a,l,h){e===t&&(Pn=ye.width/2,Cn=ye.height/2,Mn=Cn/Math.tan(Sn/2),e=Pn,n=Cn,r=Mn,i=Pn,s=Cn,o=0,a=0,l=1,h=0)
var u=new PVector(e-i,n-s,r-o),c=new PVector(a,l,h)
u.normalize()
var f=PVector.cross(c,u)
c=PVector.cross(u,f),f.normalize(),c.normalize()
var p=f.x,m=f.y,g=f.z,d=c.x,v=c.y,y=c.z,A=u.x,x=u.y,b=u.z
Qe.set(p,m,g,0,d,v,y,0,A,x,b,0,0,0,0,1),Qe.translate(-e,-n,-r),Je.reset(),Je.invApply(p,m,g,0,d,v,y,0,A,x,b,0,0,0,0,1),Je.translate(e,n,r),et.set(Qe),tt.set(Je)},ye.perspective=function(e,t,n,r){0===arguments.length&&(Cn=ge.height/2,Mn=Cn/Math.tan(Sn/2),Tn=Mn/10,_n=10*Mn,Rn=ye.width/ye.height,e=Sn,t=Rn,n=Tn,r=_n)
var i,s,o,a
i=n*Math.tan(e/2),s=-i,o=i*t,a=s*t,ye.frustum(a,o,s,i,n,r)},rr.prototype.frustum=function(){throw"Processing.js: frustum() is not supported in 2D mode"},ir.prototype.frustum=function(e,t,n,r,i,s){En=!0,st=new lr,st.set(2*i/(t-e),0,(t+e)/(t-e),0,0,2*i/(r-n),(r+n)/(r-n),0,0,0,-(s+i)/(s-i),-(2*s*i)/(s-i),0,0,-1,0)
var o=new lr
o.set(st),o.transpose(),Ae.useProgram(Re),M("projection2d",Re,"uProjection",!1,o.array()),Ae.useProgram(_e),M("projection3d",_e,"uProjection",!1,o.array()),Ae.useProgram(Le),M("uProjectionUS",Le,"uProjection",!1,o.array())},ye.ortho=function(e,t,n,r,i,s){0===arguments.length&&(e=0,t=ye.width,n=0,r=ye.height,i=-10,s=10)
var o=2/(t-e),a=2/(r-n),l=-2/(s-i),h=-(t+e)/(t-e),u=-(r+n)/(r-n),c=-(s+i)/(s-i)
st=new lr,st.set(o,0,0,h,0,a,0,u,0,0,l,c,0,0,0,1)
var f=new lr
f.set(st),f.transpose(),Ae.useProgram(Re),M("projection2d",Re,"uProjection",!1,f.array()),Ae.useProgram(_e),M("projection3d",_e,"uProjection",!1,f.array()),Ae.useProgram(Le),M("uProjectionUS",Le,"uProjection",!1,f.array()),En=!1},ye.printProjection=function(){st.print()},ye.printCamera=function(){Qe.print()},rr.prototype.box=nr.prototype.a3DOnlyFunction,ir.prototype.box=function(e,t,n){t&&n||(t=n=e)
var r=new lr
r.scale(e,t,n)
var i=new lr
if(i.scale(1,-1,1),i.apply(et.array()),i.transpose(),ot){if(Ae.useProgram(_e),M("model3d",_e,"uModel",!1,r.array()),M("view3d",_e,"uView",!1,i.array()),Ae.enable(Ae.POLYGON_OFFSET_FILL),Ae.polygonOffset(1,1),P("color3d",_e,"uColor",at),mn>0){var s=new lr
s.set(i)
var o=new lr
o.set(r),s.mult(o)
var a=new lr
a.set(s),a.invert(),a.transpose(),M("uNormalTransform3d",_e,"uNormalTransform",!1,a.array()),T("aNormal3d",_e,"aNormal",3,De)}else _("aNormal3d",_e,"aNormal")
T("aVertex3d",_e,"aVertex",3,Ie),_("aColor3d",_e,"aColor"),_("aTexture3d",_e,"aTexture"),Ae.drawArrays(Ae.TRIANGLES,0,$n.length/3),Ae.disable(Ae.POLYGON_OFFSET_FILL)}mt>0&&ut&&(Ae.useProgram(Re),M("uModel2d",Re,"uModel",!1,r.array()),M("uView2d",Re,"uView",!1,i.array()),P("uColor2d",Re,"uColor",ct),C("uIsDrawingText2d",Re,"uIsDrawingText",!1),T("vertex2d",Re,"aVertex",3,Oe),_("aTextureCoord2d",Re,"aTextureCoord"),Ae.drawArrays(Ae.LINES,0,Gn.length/3))}
var cr=function(){var e
for(qe=[],e=0;e<dn;e++)qe.push(0),qe.push(-1),qe.push(0),qe.push(vn[e]),qe.push(yn[e]),qe.push(An[e])
qe.push(0),qe.push(-1),qe.push(0),qe.push(vn[0]),qe.push(yn[0]),qe.push(An[0])
var t,n,r,i=0
for(e=2;e<gn;e++){t=n=i,i+=dn,r=i
for(var s=0;s<dn;s++)qe.push(vn[t]),qe.push(yn[t]),qe.push(An[t++]),qe.push(vn[r]),qe.push(yn[r]),qe.push(An[r++])
t=n,r=i,qe.push(vn[t]),qe.push(yn[t]),qe.push(An[t]),qe.push(vn[r]),qe.push(yn[r]),qe.push(An[r])}for(e=0;e<dn;e++)r=i+e,qe.push(vn[r]),qe.push(yn[r]),qe.push(An[r]),qe.push(0),qe.push(1),qe.push(0)
qe.push(vn[i]),qe.push(yn[i]),qe.push(An[i]),qe.push(0),qe.push(1),qe.push(0),Ae.bindBuffer(Ae.ARRAY_BUFFER,ke),Ae.bufferData(Ae.ARRAY_BUFFER,new g(qe),Ae.STATIC_DRAW)}
ye.sphereDetail=function(e,t){var n
if(1===arguments.length&&(e=t=arguments[0]),e<3&&(e=3),t<2&&(t=2),e!==dn||t!==gn){var r=c.SINCOS_LENGTH/e,i=new g(e),s=new g(e)
for(n=0;n<e;n++)i[n]=bn[n*r%c.SINCOS_LENGTH|0],s[n]=xn[n*r%c.SINCOS_LENGTH|0]
var o=e*(t-1)+2,a=0
vn=new g(o),yn=new g(o),An=new g(o)
var l=.5*c.SINCOS_LENGTH/t,h=l
for(n=1;n<t;n++){for(var u=xn[h%c.SINCOS_LENGTH|0],f=-bn[h%c.SINCOS_LENGTH|0],p=0;p<e;p++)vn[a]=i[p]*u,yn[a]=f,An[a++]=s[p]*u
h+=l}dn=e,gn=t,cr()}},rr.prototype.sphere=nr.prototype.a3DOnlyFunction,ir.prototype.sphere=function(){var e=arguments[0];(dn<3||gn<2)&&ye.sphereDetail(30)
var t=new lr
t.scale(e,e,e)
var n=new lr
if(n.scale(1,-1,1),n.apply(et.array()),n.transpose(),ot){if(mn>0){var r=new lr
r.set(n)
var i=new lr
i.set(t),r.mult(i)
var s=new lr
s.set(r),s.invert(),s.transpose(),M("uNormalTransform3d",_e,"uNormalTransform",!1,s.array()),T("aNormal3d",_e,"aNormal",3,ke)}else _("aNormal3d",_e,"aNormal")
Ae.useProgram(_e),_("aTexture3d",_e,"aTexture"),M("uModel3d",_e,"uModel",!1,t.array()),M("uView3d",_e,"uView",!1,n.array()),T("aVertex3d",_e,"aVertex",3,ke),_("aColor3d",_e,"aColor"),Ae.enable(Ae.POLYGON_OFFSET_FILL),Ae.polygonOffset(1,1),P("uColor3d",_e,"uColor",at),Ae.drawArrays(Ae.TRIANGLE_STRIP,0,qe.length/3),Ae.disable(Ae.POLYGON_OFFSET_FILL)}mt>0&&ut&&(Ae.useProgram(Re),M("uModel2d",Re,"uModel",!1,t.array()),M("uView2d",Re,"uView",!1,n.array()),T("aVertex2d",Re,"aVertex",3,ke),_("aTextureCoord2d",Re,"aTextureCoord"),P("uColor2d",Re,"uColor",ct),C("uIsDrawingText",Re,"uIsDrawingText",!1),Ae.drawArrays(Ae.LINE_STRIP,0,qe.length/3))},ye.modelX=function(e,t,n){var r=et.array(),i=Je.array(),s=r[0]*e+r[1]*t+r[2]*n+r[3],o=r[4]*e+r[5]*t+r[6]*n+r[7],a=r[8]*e+r[9]*t+r[10]*n+r[11],l=r[12]*e+r[13]*t+r[14]*n+r[15],h=i[0]*s+i[1]*o+i[2]*a+i[3]*l,u=i[12]*s+i[13]*o+i[14]*a+i[15]*l
return 0!==u?h/u:h},ye.modelY=function(e,t,n){var r=et.array(),i=Je.array(),s=r[0]*e+r[1]*t+r[2]*n+r[3],o=r[4]*e+r[5]*t+r[6]*n+r[7],a=r[8]*e+r[9]*t+r[10]*n+r[11],l=r[12]*e+r[13]*t+r[14]*n+r[15],h=i[4]*s+i[5]*o+i[6]*a+i[7]*l,u=i[12]*s+i[13]*o+i[14]*a+i[15]*l
return 0!==u?h/u:h},ye.modelZ=function(e,t,n){var r=et.array(),i=Je.array(),s=r[0]*e+r[1]*t+r[2]*n+r[3],o=r[4]*e+r[5]*t+r[6]*n+r[7],a=r[8]*e+r[9]*t+r[10]*n+r[11],l=r[12]*e+r[13]*t+r[14]*n+r[15],h=i[8]*s+i[9]*o+i[10]*a+i[11]*l,u=i[12]*s+i[13]*o+i[14]*a+i[15]*l
return 0!==u?h/u:h},rr.prototype.ambient=nr.prototype.a3DOnlyFunction,ir.prototype.ambient=function(e,t,n){Ae.useProgram(_e),C("uUsingMat3d",_e,"uUsingMat",!0)
var r=ye.color(e,t,n)
P("uMaterialAmbient3d",_e,"uMaterialAmbient",ye.color.toGLArray(r).slice(0,3))},rr.prototype.emissive=nr.prototype.a3DOnlyFunction,ir.prototype.emissive=function(e,t,n){Ae.useProgram(_e),C("uUsingMat3d",_e,"uUsingMat",!0)
var r=ye.color(e,t,n)
P("uMaterialEmissive3d",_e,"uMaterialEmissive",ye.color.toGLArray(r).slice(0,3))},rr.prototype.shininess=nr.prototype.a3DOnlyFunction,ir.prototype.shininess=function(e){Ae.useProgram(_e),C("uUsingMat3d",_e,"uUsingMat",!0),P("uShininess3d",_e,"uShininess",e)},rr.prototype.specular=nr.prototype.a3DOnlyFunction,ir.prototype.specular=function(e,t,n){Ae.useProgram(_e),C("uUsingMat3d",_e,"uUsingMat",!0)
var r=ye.color(e,t,n)
P("uMaterialSpecular3d",_e,"uMaterialSpecular",ye.color.toGLArray(r).slice(0,3))},ye.screenX=function(e,t,n){var r=et.array()
if(16===r.length){var i=r[0]*e+r[1]*t+r[2]*n+r[3],s=r[4]*e+r[5]*t+r[6]*n+r[7],o=r[8]*e+r[9]*t+r[10]*n+r[11],a=r[12]*e+r[13]*t+r[14]*n+r[15],l=st.array(),h=l[0]*i+l[1]*s+l[2]*o+l[3]*a,u=l[12]*i+l[13]*s+l[14]*o+l[15]*a
return 0!==u&&(h/=u),ye.width*(1+h)/2}return et.multX(e,t)},ye.screenY=function(e,t,n){var r=et.array()
if(16===r.length){var i=r[0]*e+r[1]*t+r[2]*n+r[3],s=r[4]*e+r[5]*t+r[6]*n+r[7],o=r[8]*e+r[9]*t+r[10]*n+r[11],a=r[12]*e+r[13]*t+r[14]*n+r[15],l=st.array(),h=l[4]*i+l[5]*s+l[6]*o+l[7]*a,u=l[12]*i+l[13]*s+l[14]*o+l[15]*a
return 0!==u&&(h/=u),ye.height*(1+h)/2}return et.multY(e,t)},ye.screenZ=function(e,t,n){var r=et.array()
if(16!==r.length)return 0
var i=st.array(),s=r[0]*e+r[1]*t+r[2]*n+r[3],o=r[4]*e+r[5]*t+r[6]*n+r[7],a=r[8]*e+r[9]*t+r[10]*n+r[11],l=r[12]*e+r[13]*t+r[14]*n+r[15],h=i[8]*s+i[9]*o+i[10]*a+i[11]*l,u=i[12]*s+i[13]*o+i[14]*a+i[15]*l
return 0!==u&&(h/=u),(h+1)/2},nr.prototype.fill=function(){var e=ye.color.apply(this,arguments)
e===lt&&ot||(ot=!0,lt=e)},rr.prototype.fill=function(){nr.prototype.fill.apply(this,arguments),ht=!0},ir.prototype.fill=function(){nr.prototype.fill.apply(this,arguments),at=ye.color.toGLArray(lt)},ye.noFill=function(){ot=!1},nr.prototype.stroke=function(){var e=ye.color.apply(this,arguments)
e===ft&&ut||(ut=!0,ft=e)},rr.prototype.stroke=function(){nr.prototype.stroke.apply(this,arguments),pt=!0},ir.prototype.stroke=function(){nr.prototype.stroke.apply(this,arguments),ct=ye.color.toGLArray(ft)},ye.noStroke=function(){ut=!1},nr.prototype.strokeWeight=function(e){mt=e},rr.prototype.strokeWeight=function(e){nr.prototype.strokeWeight.apply(this,arguments),Ae.lineWidth=e},ir.prototype.strokeWeight=function(e){nr.prototype.strokeWeight.apply(this,arguments),Ae.useProgram(Re),P("pointSize2d",Re,"uPointSize",e),Ae.useProgram(Le),P("pointSizeUnlitShape",Le,"uPointSize",e),Ae.lineWidth(e)},ye.strokeCap=function(e){be.$ensureContext().lineCap=e},ye.strokeJoin=function(e){be.$ensureContext().lineJoin=e},rr.prototype.smooth=function(){dt=!0
var e=ge.style
e.setProperty("image-rendering","optimizeQuality","important"),e.setProperty("-ms-interpolation-mode","bicubic","important"),Ae.hasOwnProperty("mozImageSmoothingEnabled")&&(Ae.mozImageSmoothingEnabled=!0)},ir.prototype.smooth=function(){dt=!0},rr.prototype.noSmooth=function(){dt=!1
var e=ge.style
e.setProperty("image-rendering","optimizeSpeed","important"),e.setProperty("image-rendering","-moz-crisp-edges","important"),e.setProperty("image-rendering","-webkit-optimize-contrast","important"),e.setProperty("image-rendering","optimize-contrast","important"),e.setProperty("-ms-interpolation-mode","nearest-neighbor","important"),Ae.hasOwnProperty("mozImageSmoothingEnabled")&&(Ae.mozImageSmoothingEnabled=!1)},ir.prototype.noSmooth=function(){dt=!1},rr.prototype.point=function(e,t){ut&&(dt||(e=Math.round(e),t=Math.round(t)),Ae.fillStyle=ye.color.toString(ft),ht=!0,mt>1?(Ae.beginPath(),Ae.arc(e,t,mt/2,0,c.TWO_PI,!1),Ae.fill()):Ae.fillRect(e,t,1,1))},ir.prototype.point=function(e,t,n){var r=new lr
r.translate(e,t,n||0),r.transpose()
var i=new lr
i.scale(1,-1,1),i.apply(et.array()),i.transpose(),Ae.useProgram(Re),M("uModel2d",Re,"uModel",!1,r.array()),M("uView2d",Re,"uView",!1,i.array()),mt>0&&ut&&(P("uColor2d",Re,"uColor",ct),C("uIsDrawingText2d",Re,"uIsDrawingText",!1),C("uSmooth2d",Re,"uSmooth",dt),T("aVertex2d",Re,"aVertex",3,ze),_("aTextureCoord2d",Re,"aTextureCoord"),Ae.drawArrays(Ae.POINTS,0,1))},ye.beginShape=function(e){_t=e,Rt=[],Ln=[]},rr.prototype.vertex=function(e,t,n){var r=[]
Fn&&(Fn=!1),r.isVert=!0,r[0]=e,r[1]=t,r[2]=0,r[3]=0,r[4]=0,r[5]=lt,r[6]=ft,Ln.push(r),n&&(Ln[Ln.length-1].moveTo=n)},ir.prototype.vertex=function(e,n,r,i,s){var o=[]
Fn&&(Fn=!1),o.isVert=!0,s===t&&qt&&(s=i,i=r,r=0),i!==t&&s!==t&&(Zt===c.IMAGE&&(i/=Wt.width,s/=Wt.height),i=i>1?1:i,i=i<0?0:i,s=s>1?1:s,s=s<0?0:s),o[0]=e,o[1]=n,o[2]=r||0,o[3]=i||0,o[4]=s||0,o[5]=at[0],o[6]=at[1],o[7]=at[2],o[8]=at[3],o[9]=ct[0],o[10]=ct[1],o[11]=ct[2],o[12]=ct[3],o[13]=bt,o[14]=wt,o[15]=Et,Ln.push(o)}
var fr=function(e,t){var n=new lr
n.scale(1,-1,1),n.apply(et.array()),n.transpose(),Ae.useProgram(Le),M("uViewUS",Le,"uView",!1,n.array()),C("uSmoothUS",Le,"uSmooth",dt),T("aVertexUS",Le,"aVertex",3,ze),Ae.bufferData(Ae.ARRAY_BUFFER,new g(e),Ae.STREAM_DRAW),T("aColorUS",Le,"aColor",4,Ge),Ae.bufferData(Ae.ARRAY_BUFFER,new g(t),Ae.STREAM_DRAW),Ae.drawArrays(Ae.POINTS,0,e.length/3)},pr=function(e,t,n){var r
r="LINES"===t?Ae.LINES:"LINE_LOOP"===t?Ae.LINE_LOOP:Ae.LINE_STRIP
var i=new lr
i.scale(1,-1,1),i.apply(et.array()),i.transpose(),Ae.useProgram(Le),M("uViewUS",Le,"uView",!1,i.array()),T("aVertexUS",Le,"aVertex",3,Be),Ae.bufferData(Ae.ARRAY_BUFFER,new g(e),Ae.STREAM_DRAW),T("aColorUS",Le,"aColor",4,Ve),Ae.bufferData(Ae.ARRAY_BUFFER,new g(n),Ae.STREAM_DRAW),Ae.drawArrays(r,0,e.length/3)},mr=function(e,t,n,r){var i
i="TRIANGLES"===t?Ae.TRIANGLES:"TRIANGLE_FAN"===t?Ae.TRIANGLE_FAN:Ae.TRIANGLE_STRIP
var s=new lr
s.scale(1,-1,1),s.apply(et.array()),s.transpose(),Ae.useProgram(_e),M("model3d",_e,"uModel",!1,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),M("view3d",_e,"uView",!1,s.array()),Ae.enable(Ae.POLYGON_OFFSET_FILL),Ae.polygonOffset(1,1),P("color3d",_e,"uColor",[-1,0,0,0]),T("vertex3d",_e,"aVertex",3,$e),Ae.bufferData(Ae.ARRAY_BUFFER,new g(e),Ae.STREAM_DRAW),qt&&null!==Ut&&Ht(n),T("aColor3d",_e,"aColor",4,Ge),Ae.bufferData(Ae.ARRAY_BUFFER,new g(n),Ae.STREAM_DRAW),_("aNormal3d",_e,"aNormal"),qt&&(C("uUsingTexture3d",_e,"uUsingTexture",qt),T("aTexture3d",_e,"aTexture",2,Ue),Ae.bufferData(Ae.ARRAY_BUFFER,new g(r),Ae.STREAM_DRAW)),Ae.drawArrays(i,0,e.length/3),Ae.disable(Ae.POLYGON_OFFSET_FILL)}
rr.prototype.endShape=function(e){if(0!==Ln.length){var n=e===c.CLOSE
n&&Ln.push(Ln[0])
var r,i=[],s=[],o=[],a=[]
Fn=!0
var l,h,u=Ln.length
for(l=0;l<u;l++)for(r=Ln[l],h=0;h<3;h++)i.push(r[h])
for(l=0;l<u;l++)for(r=Ln[l],h=5;h<9;h++)s.push(r[h])
for(l=0;l<u;l++)for(r=Ln[l],h=9;h<13;h++)o.push(r[h])
for(l=0;l<u;l++)r=Ln[l],a.push(r[3]),a.push(r[4])
if(!On||_t!==c.POLYGON&&_t!==t)if(!Nn||_t!==c.POLYGON&&_t!==t)if(_t===c.POINTS)for(l=0;l<u;l++)r=Ln[l],ut&&ye.stroke(r[6]),ye.point(r[0],r[1])
else if(_t===c.LINES)for(l=0;l+1<u;l+=2)r=Ln[l],ut&&ye.stroke(Ln[l+1][6]),ye.line(r[0],r[1],Ln[l+1][0],Ln[l+1][1])
else if(_t===c.TRIANGLES)for(l=0;l+2<u;l+=3)r=Ln[l],Ae.beginPath(),Ae.moveTo(r[0],r[1]),Ae.lineTo(Ln[l+1][0],Ln[l+1][1]),Ae.lineTo(Ln[l+2][0],Ln[l+2][1]),Ae.lineTo(r[0],r[1]),ot&&(ye.fill(Ln[l+2][5]),V()),ut&&(ye.stroke(Ln[l+2][6]),z()),Ae.closePath()
else if(_t===c.TRIANGLE_STRIP)for(l=0;l+1<u;l++)r=Ln[l],Ae.beginPath(),Ae.moveTo(Ln[l+1][0],Ln[l+1][1]),Ae.lineTo(r[0],r[1]),ut&&ye.stroke(Ln[l+1][6]),ot&&ye.fill(Ln[l+1][5]),l+2<u&&(Ae.lineTo(Ln[l+2][0],Ln[l+2][1]),ut&&ye.stroke(Ln[l+2][6]),ot&&ye.fill(Ln[l+2][5])),U()
else if(_t===c.TRIANGLE_FAN){if(u>2)for(Ae.beginPath(),Ae.moveTo(Ln[0][0],Ln[0][1]),Ae.lineTo(Ln[1][0],Ln[1][1]),Ae.lineTo(Ln[2][0],Ln[2][1]),ot&&(ye.fill(Ln[2][5]),V()),ut&&(ye.stroke(Ln[2][6]),z()),Ae.closePath(),l=3;l<u;l++)r=Ln[l],Ae.beginPath(),Ae.moveTo(Ln[0][0],Ln[0][1]),Ae.lineTo(Ln[l-1][0],Ln[l-1][1]),Ae.lineTo(r[0],r[1]),ot&&(ye.fill(r[5]),V()),ut&&(ye.stroke(r[6]),z()),Ae.closePath()}else if(_t===c.QUADS)for(l=0;l+3<u;l+=4){for(r=Ln[l],Ae.beginPath(),Ae.moveTo(r[0],r[1]),h=1;h<4;h++)Ae.lineTo(Ln[l+h][0],Ln[l+h][1])
Ae.lineTo(r[0],r[1]),ot&&(ye.fill(Ln[l+3][5]),V()),ut&&(ye.stroke(Ln[l+3][6]),z()),Ae.closePath()}else if(_t===c.QUAD_STRIP){if(u>3)for(l=0;l+1<u;l+=2)r=Ln[l],Ae.beginPath(),l+3<u?(Ae.moveTo(Ln[l+2][0],Ln[l+2][1]),Ae.lineTo(r[0],r[1]),Ae.lineTo(Ln[l+1][0],Ln[l+1][1]),Ae.lineTo(Ln[l+3][0],Ln[l+3][1]),ot&&ye.fill(Ln[l+3][5]),ut&&ye.stroke(Ln[l+3][6])):(Ae.moveTo(r[0],r[1]),Ae.lineTo(Ln[l+1][0],Ln[l+1][1])),U()}else{for(Ae.beginPath(),Ae.moveTo(Ln[0][0],Ln[0][1]),l=1;l<u;l++)r=Ln[l],r.isVert&&(r.moveTo?Ae.moveTo(r[0],r[1]):Ae.lineTo(r[0],r[1]))
U()}else{for(Ae.beginPath(),l=0;l<u;l++)r=Ln[l],Ln[l].isVert?Ln[l].moveTo?Ae.moveTo(r[0],r[1]):Ae.lineTo(r[0],r[1]):Ae.bezierCurveTo(Ln[l][0],Ln[l][1],Ln[l][2],Ln[l][3],Ln[l][4],Ln[l][5])
U()}else if(u>3){var f=[],p=1-Lt
for(Ae.beginPath(),Ae.moveTo(Ln[1][0],Ln[1][1]),l=1;l+2<u;l++)r=Ln[l],f[0]=[r[0],r[1]],f[1]=[r[0]+(p*Ln[l+1][0]-p*Ln[l-1][0])/6,r[1]+(p*Ln[l+1][1]-p*Ln[l-1][1])/6],f[2]=[Ln[l+1][0]+(p*Ln[l][0]-p*Ln[l+2][0])/6,Ln[l+1][1]+(p*Ln[l][1]-p*Ln[l+2][1])/6],f[3]=[Ln[l+1][0],Ln[l+1][1]],Ae.bezierCurveTo(f[1][0],f[1][1],f[2][0],f[2][1],f[3][0],f[3][1])
U()}On=!1,Nn=!1,In=[],Dn=0,n&&Ln.pop()}},ir.prototype.endShape=function(e){if(0!==Ln.length){var n,r=e===c.CLOSE,i=[],s=[],o=[],a=[],l=[]
Fn=!0
var h,u,f,p=Ln.length
for(h=0;h<p;h++)for(n=Ln[h],u=0;u<3;u++)s.push(n[u])
for(h=0;h<p;h++)for(n=Ln[h],u=5;u<9;u++)o.push(n[u])
for(h=0;h<p;h++)for(n=Ln[h],u=9;u<13;u++)a.push(n[u])
for(h=0;h<p;h++)n=Ln[h],l.push(n[3]),l.push(n[4])
if(r){for(s.push(Ln[0][0]),s.push(Ln[0][1]),s.push(Ln[0][2]),h=5;h<9;h++)o.push(Ln[0][h])
for(h=9;h<13;h++)a.push(Ln[0][h])
l.push(Ln[0][3]),l.push(Ln[0][4])}if(!On||_t!==c.POLYGON&&_t!==t)if(!Nn||_t!==c.POLYGON&&_t!==t){if(_t===c.POINTS){for(h=0;h<p;h++)for(n=Ln[h],u=0;u<3;u++)i.push(n[u])
fr(i,a)}else if(_t===c.LINES){for(h=0;h<p;h++)for(n=Ln[h],u=0;u<3;u++)i.push(n[u])
for(h=0;h<p;h++)for(n=Ln[h],u=5;u<9;u++)o.push(n[u])
pr(i,"LINES",a)}else if(_t===c.TRIANGLES){if(p>2)for(h=0;h+2<p;h+=3){for(s=[],l=[],i=[],o=[],a=[],u=0;u<3;u++)for(f=0;f<3;f++)i.push(Ln[h+u][f]),s.push(Ln[h+u][f])
for(u=0;u<3;u++)for(f=3;f<5;f++)l.push(Ln[h+u][f])
for(u=0;u<3;u++)for(f=5;f<9;f++)o.push(Ln[h+u][f]),a.push(Ln[h+u][f+4])
ut&&pr(i,"LINE_LOOP",a),(ot||qt)&&mr(s,"TRIANGLES",o,l)}}else if(_t===c.TRIANGLE_STRIP){if(p>2)for(h=0;h+2<p;h++){for(i=[],s=[],a=[],o=[],l=[],u=0;u<3;u++)for(f=0;f<3;f++)i.push(Ln[h+u][f]),s.push(Ln[h+u][f])
for(u=0;u<3;u++)for(f=3;f<5;f++)l.push(Ln[h+u][f])
for(u=0;u<3;u++)for(f=5;f<9;f++)a.push(Ln[h+u][f+4]),o.push(Ln[h+u][f]);(ot||qt)&&mr(s,"TRIANGLE_STRIP",o,l),ut&&pr(i,"LINE_LOOP",a)}}else if(_t===c.TRIANGLE_FAN){if(p>2){for(h=0;h<3;h++)for(n=Ln[h],u=0;u<3;u++)i.push(n[u])
for(h=0;h<3;h++)for(n=Ln[h],u=9;u<13;u++)a.push(n[u])
for(ut&&pr(i,"LINE_LOOP",a),h=2;h+1<p;h++){for(i=[],a=[],i.push(Ln[0][0]),i.push(Ln[0][1]),i.push(Ln[0][2]),a.push(Ln[0][9]),a.push(Ln[0][10]),a.push(Ln[0][11]),a.push(Ln[0][12]),u=0;u<2;u++)for(f=0;f<3;f++)i.push(Ln[h+u][f])
for(u=0;u<2;u++)for(f=9;f<13;f++)a.push(Ln[h+u][f])
ut&&pr(i,"LINE_STRIP",a)}(ot||qt)&&mr(s,"TRIANGLE_FAN",o,l)}}else if(_t===c.QUADS)for(h=0;h+3<p;h+=4){for(i=[],u=0;u<4;u++)for(n=Ln[h+u],f=0;f<3;f++)i.push(n[f])
if(ut&&pr(i,"LINE_LOOP",a),ot){for(s=[],o=[],l=[],u=0;u<3;u++)s.push(Ln[h][u])
for(u=5;u<9;u++)o.push(Ln[h][u])
for(u=0;u<3;u++)s.push(Ln[h+1][u])
for(u=5;u<9;u++)o.push(Ln[h+1][u])
for(u=0;u<3;u++)s.push(Ln[h+3][u])
for(u=5;u<9;u++)o.push(Ln[h+3][u])
for(u=0;u<3;u++)s.push(Ln[h+2][u])
for(u=5;u<9;u++)o.push(Ln[h+2][u])
qt&&(l.push(Ln[h+0][3]),l.push(Ln[h+0][4]),l.push(Ln[h+1][3]),l.push(Ln[h+1][4]),l.push(Ln[h+3][3]),l.push(Ln[h+3][4]),l.push(Ln[h+2][3]),l.push(Ln[h+2][4])),mr(s,"TRIANGLE_STRIP",o,l)}}else if(_t===c.QUAD_STRIP){var m=[]
if(p>3){for(h=0;h<2;h++)for(n=Ln[h],u=0;u<3;u++)i.push(n[u])
for(h=0;h<2;h++)for(n=Ln[h],u=9;u<13;u++)a.push(n[u])
for(pr(i,"LINE_STRIP",a),p>4&&p%2>0&&(m=s.splice(s.length-3),Ln.pop()),h=0;h+3<p;h+=2){for(i=[],a=[],u=0;u<3;u++)i.push(Ln[h+1][u])
for(u=0;u<3;u++)i.push(Ln[h+3][u])
for(u=0;u<3;u++)i.push(Ln[h+2][u])
for(u=0;u<3;u++)i.push(Ln[h+0][u])
for(u=9;u<13;u++)a.push(Ln[h+1][u])
for(u=9;u<13;u++)a.push(Ln[h+3][u])
for(u=9;u<13;u++)a.push(Ln[h+2][u])
for(u=9;u<13;u++)a.push(Ln[h+0][u])
ut&&pr(i,"LINE_STRIP",a)}(ot||qt)&&mr(s,"TRIANGLE_LIST",o,l)}}else if(1===p){for(u=0;u<3;u++)i.push(Ln[0][u])
for(u=9;u<13;u++)a.push(Ln[0][u])
fr(i,a)}else{for(h=0;h<p;h++){for(n=Ln[h],u=0;u<3;u++)i.push(n[u])
for(u=5;u<9;u++)a.push(n[u])}ut&&r?pr(i,"LINE_LOOP",a):ut&&!r&&pr(i,"LINE_STRIP",a),(ot||qt)&&mr(s,"TRIANGLE_FAN",o,l)}qt=!1,Ae.useProgram(_e),C("usingTexture3d",_e,"uUsingTexture",qt)}else i=s,i.splice(i.length-3),a.splice(a.length-4),ut&&pr(i,null,a),ot&&mr(s,"TRIANGLES",o)
else i=s,ut&&pr(i,null,a),ot&&mr(s,null,o)
On=!1,Nn=!1,In=[],Dn=0}}
var gr=function(e,t){var n=1/e,r=n*n,i=r*n
t.set(0,0,0,1,i,r,n,0,6*i,2*r,0,0,6*i,0,0,0)},dr=function(){Pe||(Ee=new lr,Pe=new lr,Dt=!0)
var e=Lt
Ee.set((e-1)/2,(e+3)/2,(-3-e)/2,(1-e)/2,1-e,(-5-e)/2,e+2,(e-1)/2,(e-1)/2,0,(1-e)/2,0,0,1,0,0),gr(It,Pe),Me||(Se=new lr),Se.set(Ee),Se.preApply(Me),Pe.apply(Ee)}
rr.prototype.bezierVertex=function(){Nn=!0
var e=[]
if(Fn)throw"vertex() must be used at least once before calling bezierVertex()"
for(var t=0;t<arguments.length;t++)e[t]=arguments[t]
Ln.push(e),Ln[Ln.length-1].isVert=!1},ir.prototype.bezierVertex=function(){Nn=!0
if(Fn)throw"vertex() must be used at least once before calling bezierVertex()"
if(9===arguments.length){Ce===t&&(Ce=new lr)
var e=Ln.length-1
gr(Nt,Ce),Ce.apply(Te)
for(var n=Ce.array(),r=Ln[e][0],i=Ln[e][1],s=Ln[e][2],o=n[4]*r+n[5]*arguments[0]+n[6]*arguments[3]+n[7]*arguments[6],a=n[8]*r+n[9]*arguments[0]+n[10]*arguments[3]+n[11]*arguments[6],l=n[12]*r+n[13]*arguments[0]+n[14]*arguments[3]+n[15]*arguments[6],h=n[4]*i+n[5]*arguments[1]+n[6]*arguments[4]+n[7]*arguments[7],u=n[8]*i+n[9]*arguments[1]+n[10]*arguments[4]+n[11]*arguments[7],c=n[12]*i+n[13]*arguments[1]+n[14]*arguments[4]+n[15]*arguments[7],f=n[4]*s+n[5]*arguments[2]+n[6]*arguments[5]+n[7]*arguments[8],p=n[8]*s+n[9]*arguments[2]+n[10]*arguments[5]+n[11]*arguments[8],m=n[12]*s+n[13]*arguments[2]+n[14]*arguments[5]+n[15]*arguments[8],g=0;g<Nt;g++)r+=o,o+=a,a+=l,i+=h,h+=u,u+=c,s+=f,f+=p,p+=m,ye.vertex(r,i,s)
ye.vertex(arguments[6],arguments[7],arguments[8])}},ye.texture=function(e){var t=be.$ensureContext()
if(e.__texture)t.bindTexture(t.TEXTURE_2D,e.__texture)
else if("canvas"===e.localName)t.bindTexture(t.TEXTURE_2D,He),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.generateMipmap(t.TEXTURE_2D),Wt.width=e.width,Wt.height=e.height
else{var n,r=t.createTexture(),i=h.createElement("canvas"),s=i.getContext("2d")
if(e.width&e.width-1===0)i.width=e.width
else{for(n=1;n<e.width;)n*=2
i.width=n}if(e.height&e.height-1===0)i.height=e.height
else{for(n=1;n<e.height;)n*=2
i.height=n}s.drawImage(e.sourceImg,0,0,e.width,e.height,0,0,i.width,i.height),t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,i),t.generateMipmap(t.TEXTURE_2D),e.__texture=r,Wt.width=e.width,Wt.height=e.height}qt=!0,t.useProgram(_e),C("usingTexture3d",_e,"uUsingTexture",qt)},ye.textureMode=function(e){Zt=e}
var vr=function(e,t,n,r,i,s,o,a,l,h,u,c){var f=r,p=i,m=s,g=Pe.array(),d=g[4]*e+g[5]*r+g[6]*o+g[7]*h,v=g[8]*e+g[9]*r+g[10]*o+g[11]*h,y=g[12]*e+g[13]*r+g[14]*o+g[15]*h,A=g[4]*t+g[5]*i+g[6]*a+g[7]*u,x=g[8]*t+g[9]*i+g[10]*a+g[11]*u,b=g[12]*t+g[13]*i+g[14]*a+g[15]*u,w=g[4]*n+g[5]*s+g[6]*l+g[7]*c,E=g[8]*n+g[9]*s+g[10]*l+g[11]*c,S=g[12]*n+g[13]*s+g[14]*l+g[15]*c
ye.vertex(f,p,m)
for(var P=0;P<It;P++)f+=d,d+=v,v+=y,p+=A,A+=x,x+=b,m+=w,w+=E,E+=S,ye.vertex(f,p,m)}
rr.prototype.curveVertex=function(e,t){On=!0,ye.vertex(e,t)},ir.prototype.curveVertex=function(e,t,n){On=!0,Dt||dr()
var r=[]
r[0]=e,r[1]=t,r[2]=n,In.push(r),Dn++,Dn>3&&vr(In[Dn-4][0],In[Dn-4][1],In[Dn-4][2],In[Dn-3][0],In[Dn-3][1],In[Dn-3][2],In[Dn-2][0],In[Dn-2][1],In[Dn-2][2],In[Dn-1][0],In[Dn-1][1],In[Dn-1][2])},rr.prototype.curve=function(e,t,n,r,i,s,o,a){ye.beginShape(),ye.curveVertex(e,t),ye.curveVertex(n,r),ye.curveVertex(i,s),ye.curveVertex(o,a),ye.endShape()},ir.prototype.curve=function(e,n,r,i,s,o,a,l,h,u,c,f){return f!==t?(ye.beginShape(),ye.curveVertex(e,n,r),ye.curveVertex(i,s,o),ye.curveVertex(a,l,h),ye.curveVertex(u,c,f),void ye.endShape()):(ye.beginShape(),ye.curveVertex(e,n),ye.curveVertex(r,i),ye.curveVertex(s,o),ye.curveVertex(a,l),void ye.endShape())},ye.curveTightness=function(e){Lt=e},ye.curveDetail=function(e){It=e,dr()},ye.rectMode=function(e){At=e},ye.imageMode=function(e){switch(e){case c.CORNER:Jn=Qn
break
case c.CORNERS:Jn=er
break
case c.CENTER:Jn=tr
break
default:throw"Invalid imageMode"}},ye.ellipseMode=function(e){xt=e},ye.arc=function(e,t,n,r,i,s,o){if(!(n<=0||s<i)){for(xt===c.CORNERS?(n-=e,r-=t):xt===c.RADIUS?(e-=n,t-=r,n=2*n,r=2*r):xt===c.CENTER&&(e-=n/2,t-=r/2);i<0;)i+=c.TWO_PI,s+=c.TWO_PI
s-i>c.TWO_PI&&(s=i+c.TWO_PI)
var a=n/2,l=r/2,h=e+a,u=t+l,f=1/(a+l),p=function(e,t,n,r,i){return function(s,f,p,m,g){for(p=0,m=n,g=i+r,s.beginShape(),f&&s.vertex(e-.5,t-.5);m<g;p++,m=p*r+n)s.vertex(e+Math.cos(m)*a|0,t+Math.sin(m)*l|0)
o===c.OPEN&&ot?s.vertex(h+Math.cos(n)*a,u+Math.sin(n)*l):o===c.CHORD?s.vertex(h+Math.cos(n)*a,u+Math.sin(n)*l):o===c.PIE&&(s.line(h+Math.cos(n)*a,u+Math.sin(n)*l,h,u),s.line(h,u,h+Math.cos(i)*a,u+Math.sin(i)*l)),s.endShape(f?c.CLOSE:void 0)}}(h+.5,u+.5,i,f,s)
if(ot){var m=ut
ut=!1,p(ye,!0),ut=m}if(ut){var g=ot
ot=!1,p(ye),ot=g}}},rr.prototype.line=function(e,n,r,i){if(ut){if(dt||(e=Math.round(e),r=Math.round(r),n=Math.round(n),i=Math.round(i)),e===r&&n===i)return void ye.point(e,n)
for(var s=t,o=t,a=!0,l=et.array(),h=[1,0,0,0,1,0],u=0;u<6&&a;u++)a=l[u]===h[u]
a&&(e===r?(n>i&&(s=n,n=i,i=s),i++,mt%2===1&&Ae.translate(.5,0)):n===i&&(e>r&&(s=e,e=r,r=s),r++,mt%2===1&&Ae.translate(0,.5)),1===mt&&(o=Ae.lineCap,Ae.lineCap="butt")),Ae.beginPath(),Ae.moveTo(e||0,n||0),Ae.lineTo(r||0,i||0),z(),a&&(e===r&&mt%2===1?Ae.translate(-.5,0):n===i&&mt%2===1&&Ae.translate(0,-.5),1===mt&&(Ae.lineCap=o))}},ir.prototype.line=function(e,n,r,i,s,o){if(s!==t&&o!==t||(o=0,s=i,i=r,r=0),e===i&&n===s&&r===o)return void ye.point(e,n,r)
var a=[e,n,r,i,s,o],l=new lr
l.scale(1,-1,1),l.apply(et.array()),l.transpose(),mt>0&&ut&&(Ae.useProgram(Re),M("uModel2d",Re,"uModel",!1,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),M("uView2d",Re,"uView",!1,l.array()),P("uColor2d",Re,"uColor",ct),C("uIsDrawingText",Re,"uIsDrawingText",!1),T("aVertex2d",Re,"aVertex",3,Be),_("aTextureCoord2d",Re,"aTextureCoord"),Ae.bufferData(Ae.ARRAY_BUFFER,new g(a),Ae.STREAM_DRAW),Ae.drawArrays(Ae.LINES,0,2))},rr.prototype.bezier=function(){if(8!==arguments.length)throw"You must use 8 parameters for bezier() in 2D mode"
ye.beginShape(),ye.vertex(arguments[0],arguments[1]),ye.bezierVertex(arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]),ye.endShape()},ir.prototype.bezier=function(){if(12!==arguments.length)throw"You must use 12 parameters for bezier() in 3D mode"
ye.beginShape(),ye.vertex(arguments[0],arguments[1],arguments[2]),ye.bezierVertex(arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9],arguments[10],arguments[11]),ye.endShape()},ye.bezierDetail=function(e){Nt=e},ye.bezierPoint=function(e,t,n,r,i){return(1-i)*(1-i)*(1-i)*e+3*(1-i)*(1-i)*i*t+3*(1-i)*i*i*n+i*i*i*r},ye.bezierTangent=function(e,t,n,r,i){return 3*i*i*(-e+3*t-3*n+r)+6*i*(e-2*t+n)+3*(-e+t)},ye.curvePoint=function(e,t,n,r,i){return.5*(2*t+(-e+n)*i+(2*e-5*t+4*n-r)*i*i+(-e+3*t-3*n+r)*i*i*i)},ye.curveTangent=function(e,t,n,r,i){return.5*(-e+n+2*(2*e-5*t+4*n-r)*i+3*(-e+3*t-3*n+r)*i*i)},ye.triangle=function(e,t,n,r,i,s){ye.beginShape(c.TRIANGLES),ye.vertex(e,t,0),ye.vertex(n,r,0),ye.vertex(i,s,0),ye.endShape()},ye.quad=function(e,t,n,r,i,s,o,a){ye.beginShape(c.QUADS),ye.vertex(e,t,0),ye.vertex(n,r,0),ye.vertex(i,s,0),ye.vertex(o,a,0),ye.endShape()}
var yr=function(e,n,r,i,s,o,a,l){l===t&&(o=s,a=s,l=s)
var h=r/2,u=i/2;(s>h||s>u)&&(s=Math.min(h,u)),(o>h||o>u)&&(o=Math.min(h,u)),(a>h||a>u)&&(a=Math.min(h,u)),(l>h||l>u)&&(l=Math.min(h,u)),ot&&!ut||Ae.translate(.5,.5),Ae.beginPath(),Ae.moveTo(e+s,n),Ae.lineTo(e+r-o,n),Ae.quadraticCurveTo(e+r,n,e+r,n+o),Ae.lineTo(e+r,n+i-a),Ae.quadraticCurveTo(e+r,n+i,e+r-a,n+i),Ae.lineTo(e+l,n+i),Ae.quadraticCurveTo(e,n+i,e,n+i-l),Ae.lineTo(e,n+s),Ae.quadraticCurveTo(e,n,e+s,n),ot&&!ut||Ae.translate(-.5,-.5),V(),z()}
rr.prototype.rect=function(e,n,r,i,s,o,a,l){if(r||i){if(At===c.CORNERS?(r-=e,i-=n):At===c.RADIUS?(r*=2,i*=2,e-=r/2,n-=i/2):At===c.CENTER&&(e-=r/2,n-=i/2),dt||(e=Math.round(e),n=Math.round(n),r=Math.round(r),i=Math.round(i)),s!==t)return void yr(e,n,r,i,s,o,a,l)
ut&&mt%2===1&&Ae.translate(.5,.5),Ae.beginPath(),Ae.rect(e,n,r,i),V(),z(),ut&&mt%2===1&&Ae.translate(-.5,-.5)}},ir.prototype.rect=function(e,n,r,i,s,o,a,l){if(s!==t)throw"rect() with rounded corners is not supported in 3D mode"
At===c.CORNERS?(r-=e,i-=n):At===c.RADIUS?(r*=2,i*=2,e-=r/2,n-=i/2):At===c.CENTER&&(e-=r/2,n-=i/2)
var h=new lr
h.translate(e,n,0),h.scale(r,i,1),h.transpose()
var u=new lr
if(u.scale(1,-1,1),u.apply(et.array()),u.transpose(),mt>0&&ut&&(Ae.useProgram(Re),M("uModel2d",Re,"uModel",!1,h.array()),M("uView2d",Re,"uView",!1,u.array()),P("uColor2d",Re,"uColor",ct),C("uIsDrawingText2d",Re,"uIsDrawingText",!1),T("aVertex2d",Re,"aVertex",3,Ne),_("aTextureCoord2d",Re,"aTextureCoord"),Ae.drawArrays(Ae.LINE_LOOP,0,zn.length/3)),ot){if(Ae.useProgram(_e),M("uModel3d",_e,"uModel",!1,h.array()),M("uView3d",_e,"uView",!1,u.array()),Ae.enable(Ae.POLYGON_OFFSET_FILL),Ae.polygonOffset(1,1),P("color3d",_e,"uColor",at),mn>0){var f=new lr
f.set(u)
var p=new lr
p.set(h),f.mult(p)
var m=new lr
m.set(f),m.invert(),m.transpose(),M("uNormalTransform3d",_e,"uNormalTransform",!1,m.array()),T("aNormal3d",_e,"aNormal",3,Fe)}else _("normal3d",_e,"aNormal")
T("vertex3d",_e,"aVertex",3,Ne),Ae.drawArrays(Ae.TRIANGLE_FAN,0,zn.length/3),Ae.disable(Ae.POLYGON_OFFSET_FILL)}},rr.prototype.ellipse=function(e,t,n,r){if(e=e||0,t=t||0,!(n<=0&&r<=0))if(xt===c.RADIUS?(n*=2,r*=2):xt===c.CORNERS?(n-=e,r-=t,e+=n/2,t+=r/2):xt===c.CORNER&&(e+=n/2,t+=r/2),n===r)Ae.beginPath(),Ae.arc(e,t,n/2,0,c.TWO_PI,!1),V(),z()
else{var i=n/2,s=r/2,o=.5522847498307933,a=o*i,l=o*s
ye.beginShape(),ye.vertex(e+i,t),ye.bezierVertex(e+i,t-l,e+a,t-s,e,t-s),ye.bezierVertex(e-a,t-s,e-i,t-l,e-i,t),ye.bezierVertex(e-i,t+l,e-a,t+s,e,t+s),ye.bezierVertex(e+a,t+s,e+i,t+l,e+i,t),ye.endShape()}},ir.prototype.ellipse=function(e,t,n,r){if(e=e||0,t=t||0,!(n<=0&&r<=0)){xt===c.RADIUS?(n*=2,r*=2):xt===c.CORNERS?(n-=e,r-=t,e+=n/2,t+=r/2):xt===c.CORNER&&(e+=n/2,t+=r/2)
var i=n/2,s=r/2,o=.5522847498307933,a=o*i,l=o*s
if(ye.beginShape(),ye.vertex(e+i,t),ye.bezierVertex(e+i,t-l,0,e+a,t-s,0,e,t-s,0),ye.bezierVertex(e-a,t-s,0,e-i,t-l,0,e-i,t,0),ye.bezierVertex(e-i,t+l,0,e-a,t+s,0,e,t+s,0),ye.bezierVertex(e+a,t+s,0,e+i,t+l,0,e+i,t,0),ye.endShape(),ot){var h,u,f=0,p=0
for(h=0;h<Ln.length;h++)f+=Ln[h][0],p+=Ln[h][1]
f/=Ln.length,p/=Ln.length
var m=[],g=[],d=[]
for(m[0]=f,m[1]=p,m[2]=0,m[3]=0,m[4]=0,m[5]=at[0],m[6]=at[1],m[7]=at[2],m[8]=at[3],m[9]=ct[0],m[10]=ct[1],m[11]=ct[2],m[12]=ct[3],m[13]=bt,m[14]=wt,m[15]=Et,Ln.unshift(m),h=0;h<Ln.length;h++){for(u=0;u<3;u++)g.push(Ln[h][u])
for(u=5;u<9;u++)d.push(Ln[h][u])}mr(g,"TRIANGLE_FAN",d)}}},ye.normal=function(e,t,n){if(3!==arguments.length||"number"!=typeof e||"number"!=typeof t||"number"!=typeof n)throw"normal() requires three numeric arguments."
bt=e,wt=t,Et=n,0!==_t&&(St===c.NORMAL_MODE_AUTO?St=c.NORMAL_MODE_SHAPE:St===c.NORMAL_MODE_SHAPE&&(St=c.NORMAL_MODE_VERTEX))},ye.save=function(e,n){return n!==t?l.open(n.toDataURL(),"_blank"):l.open(ye.externals.canvas.toDataURL(),"_blank")}
var Ar=0
ye.saveFrame=function(e){e===t&&(e="screen-####.png")
var n=e.replace(/#+/,function(e){for(var t=""+Ar++;t.length<e.length;)t="0"+t
return t})
ye.save(n)}
var xr=h.createElement("canvas").getContext("2d"),br=[t,t,t],wr=function(e,t,n){if(this.__isDirty=!1,e instanceof m)this.fromHTMLImageData(e)
else if(t||n){this.width=e||1,this.height=t||1
var r=this.sourceImg=h.createElement("canvas")
r.width=this.width,r.height=this.height
this.imageData=r.getContext("2d").createImageData(this.width,this.height)
if(this.format=n===c.ARGB||n===c.ALPHA?n:c.RGB,this.format===c.RGB)for(var i=3,s=this.imageData.data,o=s.length;i<o;i+=4)s[i]=255
this.__isDirty=!0,this.updatePixels()}else this.width=0,this.height=0,this.imageData=xr.createImageData(1,1),this.format=c.ARGB
this.pixels=X(this)}
wr.prototype={__isPImage:!0,updatePixels:function(){var e=this.sourceImg
e&&e instanceof p&&this.__isDirty&&e.getContext("2d").putImageData(this.imageData,0,0),this.__isDirty=!1},fromHTMLImageData:function(e){var t=H(e)
try{var n=t.context.getImageData(0,0,e.width,e.height)
this.fromImageData(n)}catch(t){e.width&&e.height&&(this.isRemote=!0,this.width=e.width,this.height=e.height)}this.sourceImg=e},get:function(e,t,n,r){return arguments.length?2===arguments.length?ye.get(e,t,this):4===arguments.length?ye.get(e,t,n,r,this):void 0:ye.get(this)},set:function(e,t,n){ye.set(e,t,n,this),this.__isDirty=!0},blend:function(e,t,n,r,i,s,o,a,l,h){9===arguments.length?ye.blend(this,e,t,n,r,i,s,o,a,l,this):10===arguments.length&&ye.blend(e,t,n,r,i,s,o,a,l,h,this),delete this.sourceImg},copy:function(e,t,n,r,i,s,o,a,l){8===arguments.length?ye.blend(this,e,t,n,r,i,s,o,a,c.REPLACE,this):9===arguments.length&&ye.blend(e,t,n,r,i,s,o,a,l,c.REPLACE,this),delete this.sourceImg},filter:function(e,t){2===arguments.length?ye.filter(e,t,this):1===arguments.length&&ye.filter(e,null,this),delete this.sourceImg},save:function(e){ye.save(e,this)},resize:function(e,t){if(this.isRemote)throw"Image is loaded remotely. Cannot resize."
if(0!==this.width||0!==this.height){0===e&&0!==t?e=Math.floor(this.width/this.height*t):0===t&&0!==e&&(t=Math.floor(this.height/this.width*e))
var n=H(this.imageData).canvas,r=H(n,e,t).context.getImageData(0,0,e,t)
this.fromImageData(r)}},mask:function(e){var t,n,r=this.toImageData()
if(e instanceof wr||e.__isPImage){if(e.width!==this.width||e.height!==this.height)throw"mask must have the same dimensions as PImage."
for(e=e.toImageData(),t=2,n=this.width*this.height*4;t<n;t+=4)r.data[t+1]=e.data[t]}else if(e instanceof Array){if(this.width*this.height!==e.length)throw"mask array must be the same length as PImage pixels array."
for(t=0,n=e.length;t<n;++t)r.data[4*t+3]=e[t]}this.fromImageData(r)},loadPixels:u,toImageData:function(){if(this.isRemote)return this.sourceImg
if(!this.__isDirty)return this.imageData
var e=H(this.sourceImg)
return e.context.getImageData(0,0,this.width,this.height)},toDataURL:function(){if(this.isRemote)throw"Image is loaded remotely. Cannot create dataURI."
var e=H(this.imageData)
return e.canvas.toDataURL()},fromImageData:function(e){var t=e.width,n=e.height,r=h.createElement("canvas"),i=r.getContext("2d")
this.width=r.width=t,this.height=r.height=n,i.putImageData(e,0,0),this.format=c.ARGB,this.imageData=e,this.sourceImg=r}},ye.PImage=wr,ye.createImage=function(e,t,n){return new wr(e,t,n)},ye.loadImage=function(e,t,n){var r
if(xe.imageCache.images[e])return r=new wr(xe.imageCache.images[e]),r.loaded=!0,r
r=new wr
var i=h.createElement("img")
return r.sourceImg=i,i.onload=function(e,t,n){var r=e,i=t,s=n
return function(){i.fromHTMLImageData(r),i.loaded=!0,s&&s()}}(i,r,n),i.src=e,r},ye.requestImage=ye.loadImage,ye.get=function(e,t,n,r,i){return void 0!==i?W(e,t,n,r,i):void 0!==r?j(e,t,n,r):void 0!==n?K(e,t,n):void 0!==t?Y(e,t):void 0!==e?W(0,0,e.width,e.height,e):j(0,0,ye.width,ye.height)},ye.createGraphics=function(e,t,n){var r=new E
return r.size(e,t,n),r.background(0,0),r},ye.set=function(e,t,n,r){3===arguments.length?"number"==typeof n?J(e,t,n):(n instanceof wr||n.__isPImage)&&ye.image(n,e,t):4===arguments.length&&ee(e,t,n,r)},ye.imageData={},ye.pixels={getLength:function(){return ye.imageData.data.length?ye.imageData.data.length/4:0},getPixel:function(e){var t=4*e,n=ye.imageData.data
return n[t+3]<<24&4278190080|n[t+0]<<16&16711680|n[t+1]<<8&65280|255&n[t+2]},setPixel:function(e,t){var n=4*e,r=ye.imageData.data
r[n+0]=(16711680&t)>>>16,r[n+1]=(65280&t)>>>8,r[n+2]=255&t,r[n+3]=(4278190080&t)>>>24},toArray:function(){for(var e=[],t=ye.imageData.width*ye.imageData.height,n=ye.imageData.data,r=0,i=0;r<t;r++,i+=4)e.push(n[i+3]<<24&4278190080|n[i+0]<<16&16711680|n[i+1]<<8&65280|255&n[i+2])
return e},set:function(e){for(var t=0,n=e.length;t<n;t++)this.setPixel(t,e[t])}},ye.loadPixels=function(){ye.imageData=be.$ensureContext().getImageData(0,0,ye.width,ye.height)},ye.updatePixels=function(){ye.imageData&&be.$ensureContext().putImageData(ye.imageData,0,0)},ye.hint=function(e){var t=be.$ensureContext()
e===c.DISABLE_DEPTH_TEST?(t.disable(t.DEPTH_TEST),t.depthMask(!1),t.clear(t.DEPTH_BUFFER_BIT)):e===c.ENABLE_DEPTH_TEST?(t.enable(t.DEPTH_TEST),t.depthMask(!0)):e===c.ENABLE_OPENGL_2X_SMOOTH||e===c.ENABLE_OPENGL_4X_SMOOTH?dt=!0:e===c.DISABLE_OPENGL_2X_SMOOTH&&(dt=!1)}
var Er=function(e,t,n,r){var i
if(e instanceof wr||e.__isPImage){if(i=e,!i.loaded)throw"Error using image in background(): PImage not loaded."
if(i.width!==ye.width||i.height!==ye.height)throw"Background image must be the same dimensions as the canvas."}else i=ye.color(e,t,n,r)
Ot=i}
rr.prototype.background=function(e,n,r,i){e!==t&&Er(e,n,r,i),Ot instanceof wr||Ot.__isPImage?(O(),Ae.setTransform(1,0,0,1,0,0),ye.image(Ot,0,0),N()):(O(),Ae.setTransform(1,0,0,1,0,0),ye.alpha(Ot)!==Ft&&Ae.clearRect(0,0,ye.width,ye.height),Ae.fillStyle=ye.color.toString(Ot),Ae.fillRect(0,0,ye.width,ye.height),ht=!0,N())},ir.prototype.background=function(e,t,n,r){arguments.length>0&&Er(e,t,n,r)
var i=ye.color.toGLArray(Ot)
Ae.clearColor(i[0],i[1],i[2],i[3]),Ae.clear(Ae.COLOR_BUFFER_BIT|Ae.DEPTH_BUFFER_BIT)},rr.prototype.image=function(e,t,n,r,i){if(t=Math.round(t),n=Math.round(n),e.width>0){var s=(r||e.width,i||e.height,Jn(t||0,n||0,r||e.width,i||e.height,arguments.length<4)),o=!!e.sourceImg&&null===Ut
if(o){var a=e.sourceImg
e.__isDirty&&e.updatePixels(),Ae.drawImage(a,0,0,a.width,a.height,s.x,s.y,s.w,s.h)}else{var l=e.toImageData()
null!==Ut&&(Ut(l),e.__isDirty=!0),Ae.drawImage(H(l).canvas,0,0,e.width,e.height,s.x,s.y,s.w,s.h)}}},ir.prototype.image=function(e,t,n,r,i){e.width>0&&(t=Math.round(t),n=Math.round(n),r=r||e.width,i=i||e.height,ye.beginShape(ye.QUADS),ye.texture(e),ye.vertex(t,n,0,0,0),ye.vertex(t,n+i,0,0,i),ye.vertex(t+r,n+i,0,r,i),ye.vertex(t+r,n,0,r,0),ye.endShape())},ye.tint=function(e,t,n,r){var i=ye.color(e,t,n,r),s=ye.red(i)/kt,o=ye.green(i)/Bt,a=ye.blue(i)/$t,l=ye.alpha(i)/Ft
Ut=function(e){for(var t=e.data,n=4*e.width*e.height,r=0;r<n;)t[r++]*=s,t[r++]*=o,t[r++]*=a,t[r++]*=l},Ht=function(e){for(var t=0;t<e.length;)e[t++]=s,e[t++]=o,e[t++]=a,e[t++]=l}},ye.noTint=function(){Ut=null,Ht=null},ye.copy=function(e,n,r,i,s,o,a,l,h){h===t&&(h=l,l=a,a=o,o=s,s=i,i=r,r=n,n=e,e=ye),ye.blend(e,n,r,i,s,o,a,l,h,c.REPLACE)},ye.blend=function(e,n,r,i,s,o,a,l,h,u,c){if(e.isRemote)throw"Image is loaded remotely. Cannot blend image."
u===t&&(u=h,h=l,l=a,a=o,o=s,s=i,i=r,r=n,n=e,e=ye)
var f=n+i,p=r+s,m=o+l,g=a+h,d=c||ye
c!==t&&u!==t||ye.loadPixels(),e.loadPixels(),e===ye&&ye.intersect(n,r,f,p,o,a,m,g)?ye.blit_resize(ye.get(n,r,f-n,p-r),0,0,f-n-1,p-r-1,d.imageData.data,d.width,d.height,o,a,m,g,u):ye.blit_resize(e,n,r,f,p,d.imageData.data,d.width,d.height,o,a,m,g,u),c===t&&ye.updatePixels()}
var Sr=function(e){var t,n=ye.floor(3.5*e)
if(n=n<1?1:n<248?n:248,ye.shared.blurRadius!==n){ye.shared.blurRadius=n,ye.shared.blurKernelSize=1+(ye.shared.blurRadius<<1),ye.shared.blurKernel=new g(ye.shared.blurKernelSize)
var r=ye.shared.blurKernel,i=ye.shared.blurKernelSize
ye.shared.blurRadius
for(t=0;t<i;t++)r[t]=0
var s=(n-1)*(n-1)
for(t=1;t<n;t++)r[n+t]=r[n-t]=s
r[n]=n*n}},Pr=function(e,t){var n,r,i,s,o,a,l,h,u,c,f,p,m,d,v,y=t.pixels.getLength(),A=new g(y),x=new g(y),b=new g(y),w=new g(y),E=0
Sr(e)
var S=t.height,P=t.width,C=ye.shared.blurKernelSize,M=ye.shared.blurRadius,T=ye.shared.blurKernel,_=t.imageData.data
for(m=0;m<S;m++){for(p=0;p<P;p++){if(s=i=r=o=n=0,l=p-M,l<0)f=-l,l=0
else{if(l>=P)break
f=0}for(d=f;d<C&&!(l>=P);d++)v=4*(l+E),a=T[d],o+=a*_[v+3],r+=a*_[v],i+=a*_[v+1],s+=a*_[v+2],n+=a,l++
h=E+p,w[h]=o/n,A[h]=r/n,x[h]=i/n,b[h]=s/n}E+=P}for(E=0,u=-M,c=u*P,m=0;m<S;m++){for(p=0;p<P;p++){if(s=i=r=o=n=0,u<0)f=h=-u,l=p
else{if(u>=S)break
f=0,h=u,l=p+c}for(d=f;d<C&&!(h>=S);d++)a=T[d],o+=a*w[l],r+=a*A[l],i+=a*x[l],s+=a*b[l],n+=a,h++,l+=P
v=4*(p+E),_[v]=r/n,_[v+1]=i/n,_[v+2]=s/n,_[v+3]=o/n}E+=P,c+=P,u++}},Cr=function(e,t){var n,r,i,s,o,a,l,h,u,c,f,p,m,g,v,y,A,x=0,b=t.pixels.getLength(),w=new d(b)
if(e)for(;x<b;)for(n=x,r=x+t.width;x<r;)i=s=t.pixels.getPixel(x),l=x-1,a=x+1,h=x-t.width,u=x+t.width,l<n&&(l=x),a>=r&&(a=x),h<0&&(h=0),u>=b&&(u=x),p=t.pixels.getPixel(h),f=t.pixels.getPixel(l),m=t.pixels.getPixel(u),c=t.pixels.getPixel(a),o=77*(i>>16&255)+151*(i>>8&255)+28*(255&i),v=77*(f>>16&255)+151*(f>>8&255)+28*(255&f),g=77*(c>>16&255)+151*(c>>8&255)+28*(255&c),y=77*(p>>16&255)+151*(p>>8&255)+28*(255&p),A=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),v<o&&(s=f,o=v),g<o&&(s=c,o=g),y<o&&(s=p,o=y),A<o&&(s=m,o=A),w[x++]=s
else for(;x<b;)for(n=x,r=x+t.width;x<r;)i=s=t.pixels.getPixel(x),l=x-1,a=x+1,h=x-t.width,u=x+t.width,l<n&&(l=x),a>=r&&(a=x),h<0&&(h=0),u>=b&&(u=x),p=t.pixels.getPixel(h),f=t.pixels.getPixel(l),m=t.pixels.getPixel(u),c=t.pixels.getPixel(a),o=77*(i>>16&255)+151*(i>>8&255)+28*(255&i),v=77*(f>>16&255)+151*(f>>8&255)+28*(255&f),g=77*(c>>16&255)+151*(c>>8&255)+28*(255&c),y=77*(p>>16&255)+151*(p>>8&255)+28*(255&p),A=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),v>o&&(s=f,o=v),g>o&&(s=c,o=g),y>o&&(s=p,o=y),A>o&&(s=m,o=A),w[x++]=s
t.pixels.set(w)}
ye.filter=function(e,n,r){var i,s,o,a
if(3===arguments.length?(r.loadPixels(),i=r):(ye.loadPixels(),i=ye),n===t&&(n=null),i.isRemote)throw"Image is loaded remotely. Cannot filter image."
var l=i.pixels.getLength()
switch(e){case c.BLUR:var h=n||1
Pr(h,i)
break
case c.GRAY:if(i.format===c.ALPHA){for(a=0;a<l;a++)s=255-i.pixels.getPixel(a),i.pixels.setPixel(a,4278190080|s<<16|s<<8|s)
i.format=c.RGB}else for(a=0;a<l;a++)s=i.pixels.getPixel(a),o=77*(s>>16&255)+151*(s>>8&255)+28*(255&s)>>8,i.pixels.setPixel(a,s&c.ALPHA_MASK|o<<16|o<<8|o)
break
case c.INVERT:for(a=0;a<l;a++)i.pixels.setPixel(a,16777215^i.pixels.getPixel(a))
break
case c.POSTERIZE:if(null===n)throw"Use filter(POSTERIZE, int levels) instead of filter(POSTERIZE)"
var u=ye.floor(n)
if(u<2||u>255)throw"Levels must be between 2 and 255 for filter(POSTERIZE, levels)"
var f=u-1
for(a=0;a<l;a++){var p=i.pixels.getPixel(a)>>16&255,m=i.pixels.getPixel(a)>>8&255,g=255&i.pixels.getPixel(a)
p=255*(p*u>>8)/f,m=255*(m*u>>8)/f,g=255*(g*u>>8)/f,i.pixels.setPixel(a,4278190080&i.pixels.getPixel(a)|p<<16|m<<8|g)}break
case c.OPAQUE:for(a=0;a<l;a++)i.pixels.setPixel(a,4278190080|i.pixels.getPixel(a))
i.format=c.RGB
break
case c.THRESHOLD:if(null===n&&(n=.5),n<0||n>1)throw"Level must be between 0 and 1 for filter(THRESHOLD, level)"
var d=ye.floor(255*n)
for(a=0;a<l;a++){var v=ye.max((i.pixels.getPixel(a)&c.RED_MASK)>>16,ye.max((i.pixels.getPixel(a)&c.GREEN_MASK)>>8,i.pixels.getPixel(a)&c.BLUE_MASK))
i.pixels.setPixel(a,i.pixels.getPixel(a)&c.ALPHA_MASK|(v<d?0:16777215))}break
case c.ERODE:Cr(!0,i)
break
case c.DILATE:Cr(!1,i)}i.updatePixels()},ye.shared={fracU:0,ifU:0,fracV:0,ifV:0,u1:0,u2:0,v1:0,v2:0,sX:0,sY:0,iw:0,iw1:0,ih1:0,ul:0,ll:0,ur:0,lr:0,cUL:0,cLL:0,cUR:0,cLR:0,srcXOffset:0,srcYOffset:0,r:0,g:0,b:0,a:0,srcBuffer:null,blurRadius:0,blurKernelSize:0,blurKernel:null},ye.intersect=function(e,t,n,r,i,s,o,a){var l=n-e+1,h=r-t+1,u=o-i+1,c=a-s+1
if(i<e)u+=i-e,u>l&&(u=l)
else{var f=l+e-i
u>f&&(u=f)}if(s<t)c+=s-t,c>h&&(c=h)
else{var p=h+t-s
c>p&&(c=p)}return!(u<=0||c<=0)}
var Mr={}
if(Mr[c.BLEND]=ye.modes.blend,Mr[c.ADD]=ye.modes.add,Mr[c.SUBTRACT]=ye.modes.subtract,Mr[c.LIGHTEST]=ye.modes.lightest,Mr[c.DARKEST]=ye.modes.darkest,Mr[c.REPLACE]=ye.modes.replace,Mr[c.DIFFERENCE]=ye.modes.difference,Mr[c.EXCLUSION]=ye.modes.exclusion,Mr[c.MULTIPLY]=ye.modes.multiply,Mr[c.SCREEN]=ye.modes.screen,Mr[c.OVERLAY]=ye.modes.overlay,Mr[c.HARD_LIGHT]=ye.modes.hard_light,Mr[c.SOFT_LIGHT]=ye.modes.soft_light,Mr[c.DODGE]=ye.modes.dodge,Mr[c.BURN]=ye.modes.burn,ye.blit_resize=function(e,t,n,r,i,s,o,a,l,h,u,f,p){var m,g
t<0&&(t=0),n<0&&(n=0),r>=e.width&&(r=e.width-1),i>=e.height&&(i=e.height-1)
var d=r-t,v=i-n,y=u-l,A=f-h
if(!(y<=0||A<=0||d<=0||v<=0||l>=o||h>=a||t>=e.width||n>=e.height)){var x=Math.floor(d/y*c.PRECISIONF),b=Math.floor(v/A*c.PRECISIONF),w=ye.shared
w.srcXOffset=Math.floor(l<0?-l*x:t*c.PRECISIONF),w.srcYOffset=Math.floor(h<0?-h*b:n*c.PRECISIONF),l<0&&(y+=l,l=0),h<0&&(A+=h,h=0),y=Math.min(y,o-l),A=Math.min(A,a-h)
var E,S=h*o+l
w.srcBuffer=e.imageData.data,w.iw=e.width,w.iw1=e.width-1,w.ih1=e.height-1
var P,C,M,T,_,R,L=(ye.filter_bilinear,ye.filter_new_scanline,Mr[p]),I=c.ALPHA_MASK,D=c.RED_MASK,O=c.GREEN_MASK,N=c.BLUE_MASK,F=c.PREC_MAXVAL,k=c.PRECISIONB,B=c.PREC_RED_SHIFT,$=c.PREC_ALPHA_SHIFT,G=w.srcBuffer,V=Math.min
for(g=0;g<A;g++){for(w.sX=w.srcXOffset,w.fracV=w.srcYOffset&F,w.ifV=F-w.fracV,w.v1=(w.srcYOffset>>k)*w.iw,w.v2=V((w.srcYOffset>>k)+1,w.ih1)*w.iw,m=0;m<y;m++)C=4*(S+m),E=s[C+3]<<24&I|s[C]<<16&D|s[C+1]<<8&O|s[C+2]&N,w.fracU=w.sX&F,w.ifU=F-w.fracU,w.ul=w.ifU*w.ifV>>k,w.ll=w.ifU*w.fracV>>k,w.ur=w.fracU*w.ifV>>k,w.lr=w.fracU*w.fracV>>k,w.u1=w.sX>>k,w.u2=V(w.u1+1,w.iw1),M=4*(w.v1+w.u1),T=4*(w.v1+w.u2),_=4*(w.v2+w.u1),R=4*(w.v2+w.u2),w.cUL=G[M+3]<<24&I|G[M]<<16&D|G[M+1]<<8&O|G[M+2]&N,w.cUR=G[T+3]<<24&I|G[T]<<16&D|G[T+1]<<8&O|G[T+2]&N,w.cLL=G[_+3]<<24&I|G[_]<<16&D|G[_+1]<<8&O|G[_+2]&N,w.cLR=G[R+3]<<24&I|G[R]<<16&D|G[R+1]<<8&O|G[R+2]&N,w.r=w.ul*((w.cUL&D)>>16)+w.ll*((w.cLL&D)>>16)+w.ur*((w.cUR&D)>>16)+w.lr*((w.cLR&D)>>16)<<B&D,w.g=w.ul*(w.cUL&O)+w.ll*(w.cLL&O)+w.ur*(w.cUR&O)+w.lr*(w.cLR&O)>>>k&O,w.b=w.ul*(w.cUL&N)+w.ll*(w.cLL&N)+w.ur*(w.cUR&N)+w.lr*(w.cLR&N)>>>k,w.a=w.ul*((w.cUL&I)>>>24)+w.ll*((w.cLL&I)>>>24)+w.ur*((w.cUR&I)>>>24)+w.lr*((w.cLR&I)>>>24)<<$&I,P=L(E,w.a|w.r|w.g|w.b),s[C]=(P&D)>>>16,s[C+1]=(P&O)>>>8,s[C+2]=P&N,s[C+3]=(P&I)>>>24,w.sX+=x
S+=o,w.srcYOffset+=b}}},ye.loadFont=function(e,n){if(e===t)throw"font name required in loadFont."
if(e.indexOf(".svg")===-1)return n===t&&(n=an.size),PFont.get(e,n)
var r=ye.loadGlyphs(e)
return{name:e,css:"12px sans-serif",glyph:!0,units_per_em:r.units_per_em,horiz_adv_x:1/r.units_per_em*r.horiz_adv_x,ascent:r.ascent,descent:r.descent,width:function(t){for(var n=0,r=t.length,i=0;i<r;i++)try{n+=parseFloat(ye.glyphLook(ye.glyphTable[e],t[i]).horiz_adv_x)}catch(e){E.debug(e)}return n/ye.glyphTable[e].units_per_em}}},ye.createFont=function(e,t){return ye.loadFont(e,t)},ye.textFont=function(e,n){n!==t&&(e.glyph||(e=PFont.get(e.name,n)),nn=n),an=e,tn=an.name,rn=an.ascent,sn=an.descent,on=an.leading
var r=be.$ensureContext()
r.font=an.css},ye.textSize=function(e){an=PFont.get(tn,e),nn=e,rn=an.ascent,sn=an.descent,on=an.leading
var t=be.$ensureContext()
t.font=an.css},ye.textAscent=function(){return rn},ye.textDescent=function(){return sn},ye.textLeading=function(e){on=e},ye.textAlign=function(e,t){Qt=e,Jt=t||c.BASELINE},rr.prototype.textWidth=function(e){var t,n=te(e).split(/\r?\n/g),r=0,i=n.length
for(Ae.font=an.css,t=0;t<i;++t)r=Math.max(r,an.measureTextWidth(n[t]))
return 0|r},ir.prototype.textWidth=function(e){var n,r=te(e).split(/\r?\n/g),i=0,s=r.length
we===t&&(we=h.createElement("canvas"))
var o=we.getContext("2d")
for(o.font=an.css,n=0;n<s;++n)i=Math.max(i,o.measureText(r[n]).width)
return 0|i},ye.glyphLook=function(e,t){try{switch(t){case"1":return e.one
case"2":return e.two
case"3":return e.three
case"4":return e.four
case"5":return e.five
case"6":return e.six
case"7":return e.seven
case"8":return e.eight
case"9":return e.nine
case"0":return e.zero
case" ":return e.space
case"$":return e.dollar
case"!":return e.exclam
case'"':return e.quotedbl
case"#":return e.numbersign
case"%":return e.percent
case"&":return e.ampersand
case"'":return e.quotesingle
case"(":return e.parenleft
case")":return e.parenright
case"*":return e.asterisk
case"+":return e.plus
case",":return e.comma
case"-":return e.hyphen
case".":return e.period
case"/":return e.slash
case"_":return e.underscore
case":":return e.colon
case";":return e.semicolon
case"<":return e.less
case"=":return e.equal
case">":return e.greater
case"?":return e.question
case"@":return e.at
case"[":return e.bracketleft
case"\\":return e.backslash
case"]":return e.bracketright
case"^":return e.asciicircum
case"`":return e.grave
case"{":return e.braceleft
case"|":return e.bar
case"}":return e.braceright
case"~":return e.asciitilde
default:return e[t]}}catch(e){E.debug(e)}},rr.prototype.text$line=function(e,t,n,r,i){var s=0,o=0
if(an.glyph){var a=ye.glyphTable[tn]
O(),Ae.translate(t,n+nn),i!==c.RIGHT&&i!==c.CENTER||(s=a.width(e),o=i===c.RIGHT?-s:-s/2)
var l=a.units_per_em,h=1/l*nn
Ae.scale(h,h)
for(var u=0,f=e.length;u<f;u++)try{ye.glyphLook(a,e[u]).draw()}catch(e){E.debug(e)}N()}else e&&"fillText"in Ae&&(ht&&(Ae.fillStyle=ye.color.toString(lt),ht=!1),i!==c.RIGHT&&i!==c.CENTER||(s=an.measureTextWidth(e),o=i===c.RIGHT?-s:-s/2),Ae.fillText(e,t+o,n))},ir.prototype.text$line=function(e,n,r,i,s){we===t&&(we=h.createElement("canvas"))
var o=Ae
Ae=we.getContext("2d"),Ae.font=an.css
var a=an.measureTextWidth(e)
we.width=a,we.height=nn,Ae=we.getContext("2d"),Ae.font=an.css,Ae.textBaseline="top",rr.prototype.text$line(e,0,0,0,c.LEFT)
var l=we.width/we.height
Ae=o,Ae.bindTexture(Ae.TEXTURE_2D,Xe),Ae.texImage2D(Ae.TEXTURE_2D,0,Ae.RGBA,Ae.RGBA,Ae.UNSIGNED_BYTE,we),Ae.texParameteri(Ae.TEXTURE_2D,Ae.TEXTURE_MAG_FILTER,Ae.LINEAR),Ae.texParameteri(Ae.TEXTURE_2D,Ae.TEXTURE_MIN_FILTER,Ae.LINEAR),Ae.texParameteri(Ae.TEXTURE_2D,Ae.TEXTURE_WRAP_T,Ae.CLAMP_TO_EDGE),Ae.texParameteri(Ae.TEXTURE_2D,Ae.TEXTURE_WRAP_S,Ae.CLAMP_TO_EDGE)
var u=0
s===c.RIGHT?u=-a:s===c.CENTER&&(u=-a/2)
var f=new lr,p=.5*nn
f.translate(n+u-p/2,r-p,i),f.scale(-l*p,-p,p),f.translate(-1,-1,-1),f.transpose()
var m=new lr
m.scale(1,-1,1),m.apply(et.array()),m.transpose(),Ae.useProgram(Re),T("aVertex2d",Re,"aVertex",3,Ye),T("aTextureCoord2d",Re,"aTextureCoord",2,Ke),C("uSampler2d",Re,"uSampler",[0]),C("uIsDrawingText2d",Re,"uIsDrawingText",!0),M("uModel2d",Re,"uModel",!1,f.array()),M("uView2d",Re,"uView",!1,m.array()),P("uColor2d",Re,"uColor",at),Ae.bindBuffer(Ae.ELEMENT_ARRAY_BUFFER,je),Ae.drawElements(Ae.TRIANGLES,6,Ae.UNSIGNED_SHORT,0)},ye.text=function(){en!==c.SHAPE&&(3===arguments.length?ne(te(arguments[0]),arguments[1],arguments[2],0):4===arguments.length?ne(te(arguments[0]),arguments[1],arguments[2],arguments[3]):5===arguments.length?re(te(arguments[0]),arguments[1],arguments[2],arguments[3],arguments[4],0):6===arguments.length&&re(te(arguments[0]),arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]))},ye.textMode=function(e){en=e},ye.loadGlyphs=function(e){var n,r,i,s,o,a,u,c,f,p,m,g,d="[0-9\\-]+",v=function(e,t){var n,r=0,i=[],s=new RegExp(e,"g")
for(n=i[r]=s.exec(t);n;)r++,n=i[r]=s.exec(t)
return i},y=function(e){var t=v("[A-Za-z][0-9\\- ]+|Z",e),l=function(){return O(),be.$ensureContext()},h=function(){V(),z(),N()}
g="return {draw:function(){var curContext=beforePathDraw();curContext.beginPath();",n=0,r=0,i=0,s=0,o=0,a=0,e=0,c=0,f="",p=t.length-1
for(var u=0;u<p;u++){var y=t[u][0],A=v(d,y)
switch(y[0]){case"M":n=parseFloat(A[0][0]),r=parseFloat(A[1][0]),g+="curContext.moveTo("+n+","+-r+");"
break
case"L":n=parseFloat(A[0][0]),r=parseFloat(A[1][0]),g+="curContext.lineTo("+n+","+-r+");"
break
case"H":n=parseFloat(A[0][0]),g+="curContext.lineTo("+n+","+-r+");"
break
case"V":r=parseFloat(A[0][0]),g+="curContext.lineTo("+n+","+-r+");"
break
case"T":o=parseFloat(A[0][0]),a=parseFloat(A[1][0]),"Q"===f||"T"===f?(e=Math.sqrt(Math.pow(n-i,2)+Math.pow(s-r,2)),c=Math.PI+Math.atan2(i-n,s-r),i=n+Math.sin(c)*e,s=r+Math.cos(c)*e):(i=n,s=r),g+="curContext.quadraticCurveTo("+i+","+-s+","+o+","+-a+");",n=o,r=a
break
case"Q":i=parseFloat(A[0][0]),s=parseFloat(A[1][0]),o=parseFloat(A[2][0]),a=parseFloat(A[3][0]),g+="curContext.quadraticCurveTo("+i+","+-s+","+o+","+-a+");",n=o,r=a
break
case"Z":g+="curContext.closePath();"}f=y[0]}return g+="afterPathDraw();",g+="curContext.translate("+m+",0);",g+="}}",new Function("beforePathDraw","afterPathDraw",g)(l,h)},A=function(n){var r=n.getElementsByTagName("font")
ye.glyphTable[e].horiz_adv_x=r[0].getAttribute("horiz-adv-x")
var i=n.getElementsByTagName("font-face")[0]
ye.glyphTable[e].units_per_em=parseFloat(i.getAttribute("units-per-em")),ye.glyphTable[e].ascent=parseFloat(i.getAttribute("ascent")),ye.glyphTable[e].descent=parseFloat(i.getAttribute("descent"))
for(var s=n.getElementsByTagName("glyph"),o=s.length,a=0;a<o;a++){var l=s[a].getAttribute("unicode"),h=s[a].getAttribute("glyph-name")
m=s[a].getAttribute("horiz-adv-x"),null===m&&(m=ye.glyphTable[e].horiz_adv_x),u=s[a].getAttribute("d"),u!==t&&(g=y(u),ye.glyphTable[e][h]={name:h,unicode:l,horiz_adv_x:m,draw:g.draw})}},x=function(){var t
try{t=h.implementation.createDocument("","",null)}catch(e){return void E.debug(e.message)}try{t.async=!1,t.load(e),A(t.getElementsByTagName("svg")[0])}catch(t){E.debug(t)
try{var n=new l.XMLHttpRequest
n.open("GET",e,!1),n.send(null),A(n.responseXML.documentElement)}catch(e){E.debug(t)}}}
return ye.glyphTable[e]={},x(e),ye.glyphTable[e]},ye.param=function(e){var t="data-processing-"+e
if(ge.hasAttribute(t))return ge.getAttribute(t)
for(var n=0,r=ge.childNodes.length;n<r;++n){var i=ge.childNodes.item(n)
if(1===i.nodeType&&"param"===i.tagName.toLowerCase()&&i.getAttribute("name")===e)return i.getAttribute("value")}return xe.params.hasOwnProperty(e)?xe.params[e]:null},sr.prototype.translate=se("translate"),sr.prototype.transform=se("transform"),sr.prototype.scale=se("scale"),sr.prototype.pushMatrix=se("pushMatrix"),sr.prototype.popMatrix=se("popMatrix"),sr.prototype.resetMatrix=se("resetMatrix"),sr.prototype.applyMatrix=se("applyMatrix"),sr.prototype.rotate=se("rotate"),sr.prototype.rotateZ=se("rotateZ"),sr.prototype.shearX=se("shearX"),sr.prototype.shearY=se("shearY"),sr.prototype.redraw=se("redraw"),sr.prototype.toImageData=se("toImageData"),sr.prototype.ambientLight=se("ambientLight"),sr.prototype.directionalLight=se("directionalLight"),sr.prototype.lightFalloff=se("lightFalloff"),sr.prototype.lightSpecular=se("lightSpecular"),sr.prototype.pointLight=se("pointLight"),sr.prototype.noLights=se("noLights"),sr.prototype.spotLight=se("spotLight"),sr.prototype.beginCamera=se("beginCamera"),sr.prototype.endCamera=se("endCamera"),sr.prototype.frustum=se("frustum"),sr.prototype.box=se("box"),sr.prototype.sphere=se("sphere"),sr.prototype.ambient=se("ambient"),sr.prototype.emissive=se("emissive"),sr.prototype.shininess=se("shininess"),sr.prototype.specular=se("specular"),sr.prototype.fill=se("fill"),sr.prototype.stroke=se("stroke"),sr.prototype.strokeWeight=se("strokeWeight"),sr.prototype.smooth=se("smooth"),sr.prototype.noSmooth=se("noSmooth"),sr.prototype.point=se("point"),sr.prototype.vertex=se("vertex"),sr.prototype.endShape=se("endShape"),sr.prototype.bezierVertex=se("bezierVertex"),sr.prototype.curveVertex=se("curveVertex"),sr.prototype.curve=se("curve"),sr.prototype.line=se("line"),sr.prototype.bezier=se("bezier"),sr.prototype.rect=se("rect"),sr.prototype.ellipse=se("ellipse"),sr.prototype.background=se("background"),sr.prototype.image=se("image"),sr.prototype.textWidth=se("textWidth"),sr.prototype.text$line=se("text$line"),sr.prototype.$ensureContext=se("$ensureContext"),sr.prototype.$newPMatrix=se("$newPMatrix"),sr.prototype.size=function(e,t,n){ie(n===c.WEBGL?"3D":"2D"),ye.size(e,t,n)},sr.prototype.$init=u,rr.prototype.$init=function(){ye.size(ye.width,ye.height),Ae.lineCap="round",ye.noSmooth(),ye.disableContextMenu()},ir.prototype.$init=function(){ye.use3DContext=!0,ye.disableContextMenu()},nr.prototype.$ensureContext=function(){return Ae},ge.getAttribute("tabindex")||ge.setAttribute("tabindex",0),de)xe=new E.Sketch,ie(),ye.size=function(e,t,n){ie(n&&n===c.WEBGL?"3D":"2D"),ye.size(e,t,n)}
else{xe=n instanceof E.Sketch?n:"function"==typeof n?new E.Sketch(n):n?E.compile(n):new E.Sketch(function(){}),ye.externals.sketch=xe,ie(),ge.onfocus=function(){ye.focused=!0},ge.onblur=function(){ye.focused=!1,xe.options.globalKeyEvents||ue()},xe.options.pauseOnBlur&&(A(l,"focus",function(){vt&&ye.loop()}),A(l,"blur",function(){vt&&gt&&(ye.noLoop(),vt=!0),ue()}))
var Tr=xe.options.globalKeyEvents?l:ge
A(Tr,"keydown",fe),A(Tr,"keypress",pe),A(Tr,"keyup",me)
for(var _r in E.lib)E.lib.hasOwnProperty(_r)&&(E.lib[_r].hasOwnProperty("attach")?E.lib[_r].attach(ye):E.lib[_r]instanceof Function&&E.lib[_r].call(this))
var Rr=100,Lr=function(e){if(xe.imageCache.pending||PFont.preloading.pending(Rr))l.setTimeout(function(){Lr(e)},Rr)
else{if(l.opera){var t,n,i=xe.imageCache.operaCache
for(t in i)i.hasOwnProperty(t)&&(n=i[t],null!==n&&h.body.removeChild(n),delete i[t])}xe.attach(e,r),xe.onLoad(e),e.setup&&(e.setup(),e.resetMatrix(),xe.onSetup()),Z(),e.draw&&(vt?e.loop():e.redraw())}}
b(this),Lr(ye)}}
return E.debug=function(){return"console"in l?function(e){l.console.log("Processing.js: "+e)}:u}(),E.prototype=r,E.instances=A,E.getInstanceById=function(e){return A[x[e]]},function(e){function t(e){return function(){throw"Processing.js does not support "+e+"."}}for(var n,r,i="open() createOutput() createInput() BufferedReader selectFolder() dataPath() createWriter() selectOutput() beginRecord() saveStream() endRecord() selectInput() saveBytes() createReader() beginRaw() endRaw() PrintWriter delay()".split(" "),s=i.length;s--;)n=i[s],r=n.replace("()",""),e[r]=t(n)}(r),E}},{}],27:[function(e,t,n){var r={virtEquals:e("./Helpers/virtEquals"),virtHashCode:e("./Helpers/virtHashCode"),ObjectIterator:e("./Helpers/ObjectIterator"),PConstants:e("./Helpers/PConstants"),ArrayList:e("./Objects/ArrayList"),HashMap:e("./Objects/HashMap"),PVector:e("./Objects/PVector"),PFont:e("./Objects/PFont"),Char:e("./Objects/Char"),XMLAttribute:e("./Objects/XMLAttribute"),XMLElement:e("./Objects/XMLElement"),PMatrix2D:e("./Objects/PMatrix2D"),PMatrix3D:e("./Objects/PMatrix3D"),PShape:e("./Objects/PShape"),colors:e("./Objects/webcolors"),PShapeSVG:e("./Objects/PShapeSVG"),CommonFunctions:e("./P5Functions/commonFunctions"),defaultScope:e("./Helpers/defaultScope"),Processing:e("./Processing"),setupParser:e("./Parser/Parser"),finalize:e("./Helpers/finalizeProcessing")}
r.extend={withMath:e("./P5Functions/Math.js"),withProxyFunctions:e("./P5Functions/JavaProxyFunctions")(r.virtHashCode,r.virtEquals),withTouch:e("./P5Functions/touchmouse"),withCommonFunctions:r.CommonFunctions.withCommonFunctions},t.exports=function(t,n){var i=function(){},s=r.virtEquals,o=r.virtHashCode,a=r.PConstants,l=r.CommonFunctions,h=r.ObjectIterator,u=r.Char,c=r.XMLAttribute(),f=r.ArrayList({virtHashCode:o,virtEquals:s}),p=r.HashMap({virtHashCode:o,virtEquals:s}),m=r.PVector({PConstants:a}),g=r.PFont({Browser:t,noop:i}),d=r.XMLElement({Browser:t,XMLAttribute:c}),v=r.PMatrix2D({p:l}),y=r.PMatrix3D({p:l}),A=r.PShape({PConstants:a,PMatrix2D:v,PMatrix3D:y}),x=r.PShapeSVG({CommonFunctions:l,PConstants:a,PShape:A,XMLElement:d,colors:r.colors}),b=r.defaultScope({ArrayList:f,HashMap:p,PVector:m,PFont:g,PShapeSVG:x,ObjectIterator:h,PConstants:a,Char:u,XMLElement:d,XML:d}),w=r.Processing({defaultScope:b,Browser:t,extend:r.extend,noop:i})
return w=r.setupParser(w,{Browser:t,aFunctions:n,defaultScope:b}),w=r.finalize(w,{version:e("../package.json").version,isDomPresent:t.isDomPresent,window:t.window,document:t.document,noop:i})}},{"../package.json":1,"./Helpers/ObjectIterator":2,"./Helpers/PConstants":3,"./Helpers/defaultScope":5,"./Helpers/finalizeProcessing":6,"./Helpers/virtEquals":7,"./Helpers/virtHashCode":8,"./Objects/ArrayList":9,"./Objects/Char":10,"./Objects/HashMap":11,"./Objects/PFont":12,"./Objects/PMatrix2D":13,"./Objects/PMatrix3D":14,"./Objects/PShape":15,"./Objects/PShapeSVG":16,"./Objects/PVector":17,"./Objects/XMLAttribute":18,"./Objects/XMLElement":19,"./Objects/webcolors":20,"./P5Functions/JavaProxyFunctions":21,"./P5Functions/Math.js":22,"./P5Functions/commonFunctions":23,"./P5Functions/touchmouse":24,"./Parser/Parser":25,"./Processing":26}],28:[function(e,t,n){var r={isDomPresent:!0,navigator:navigator,window:window,document:document,ajax:function(e){var t=new XMLHttpRequest
if(t.open("GET",e,!1),t.overrideMimeType&&t.overrideMimeType("text/plain"),t.setRequestHeader("If-Modified-Since","Fri, 01 Jan 1960 00:00:00 GMT"),t.send(null),200!==t.status&&0!==t.status)throw"XMLHttpRequest failed, status code "+t.status
return t.responseText}}
window.Processing=e("./src/")(r)},{"./src/":27}]},{},[28])
