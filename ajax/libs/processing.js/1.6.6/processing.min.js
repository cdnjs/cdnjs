!function e(t,n,r){function i(o,a){if(!n[o]){if(!t[o]){var l="function"==typeof require&&require
if(!a&&l)return l(o,!0)
if(s)return s(o,!0)
var h=new Error("Cannot find module '"+o+"'")
throw h.code="MODULE_NOT_FOUND",h}var u=n[o]={exports:{}}
t[o][0].call(u.exports,function(e){var n=t[o][1][e]
return i(n?n:e)},u,u.exports,e,t,n,r)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o])
return i}({1:[function(e,t,n){var r={isDomPresent:!0,navigator:navigator,window:window,document:document,ajax:function(e){var t=new XMLHttpRequest
if(t.open("GET",e,!1),t.overrideMimeType&&t.overrideMimeType("text/plain"),t.setRequestHeader("If-Modified-Since","Fri, 01 Jan 1960 00:00:00 GMT"),t.send(null),200!==t.status&&0!==t.status)throw"XMLHttpRequest failed, status code "+t.status
return t.responseText}}
window.Processing=e("./src/")(r)},{"./src/":28}],2:[function(e,t,n){t.exports={name:"processing-js",version:"1.6.6",author:"Processing.js",repository:{type:"git",url:"git@github.com/processing-js/processing-js.git"},main:"processing.min.js",bugs:"https://github.com/processing-js/processing-js/issues",devDependencies:{argv:"~0.0.2",browserify:"^11.0.1",express:"~3.3.3",grunt:"~0.4.1","grunt-cli":"~0.1.8","grunt-contrib-jshint":"~0.4.3","http-server":"^0.9.0",minifier:"^0.7.1","node-minify":"~0.7.3",nunjucks:"~0.1.9",open:"0.0.3"},scripts:{test:"node test","test:manual":"http-server -o test/manual",start:"browserify build.js -o processing.js && minify --output processing.min.js processing.js"},license:"MIT",dependencies:{minifier:"^0.7.1"}}},{}],3:[function(e,t,n){t.exports=function(e){if(!(e instanceof Array)){if(e.iterator instanceof Function)return e.iterator()
throw"Unable to iterate: "+e}var t=-1
this.hasNext=function(){return++t<e.length},this.next=function(){return e[t]}}},{}],4:[function(e,t,n){t.exports={X:0,Y:1,Z:2,R:3,G:4,B:5,A:6,U:7,V:8,NX:9,NY:10,NZ:11,EDGE:12,SR:13,SG:14,SB:15,SA:16,SW:17,TX:18,TY:19,TZ:20,VX:21,VY:22,VZ:23,VW:24,AR:25,AG:26,AB:27,DR:3,DG:4,DB:5,DA:6,SPR:28,SPG:29,SPB:30,SHINE:31,ER:32,EG:33,EB:34,BEEN_LIT:35,VERTEX_FIELD_COUNT:36,P2D:1,JAVA2D:1,WEBGL:2,P3D:2,OPENGL:2,PDF:0,DXF:0,OTHER:0,WINDOWS:1,MAXOSX:2,LINUX:3,EPSILON:1e-4,MAX_FLOAT:3.4028235e38,MIN_FLOAT:-3.4028235e38,MAX_INT:2147483647,MIN_INT:-2147483648,PI:Math.PI,TWO_PI:2*Math.PI,TAU:2*Math.PI,HALF_PI:Math.PI/2,THIRD_PI:Math.PI/3,QUARTER_PI:Math.PI/4,DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,WHITESPACE:" \t\n\r\f ",RGB:1,ARGB:2,HSB:3,ALPHA:4,CMYK:5,TIFF:0,TARGA:1,JPEG:2,GIF:3,BLUR:11,GRAY:12,INVERT:13,OPAQUE:14,POSTERIZE:15,THRESHOLD:16,ERODE:17,DILATE:18,REPLACE:0,BLEND:1,ADD:2,SUBTRACT:4,LIGHTEST:8,DARKEST:16,DIFFERENCE:32,EXCLUSION:64,MULTIPLY:128,SCREEN:256,OVERLAY:512,HARD_LIGHT:1024,SOFT_LIGHT:2048,DODGE:4096,BURN:8192,ALPHA_MASK:4278190080,RED_MASK:16711680,GREEN_MASK:65280,BLUE_MASK:255,CUSTOM:0,ORTHOGRAPHIC:2,PERSPECTIVE:3,POINT:2,POINTS:2,LINE:4,LINES:4,TRIANGLE:8,TRIANGLES:9,TRIANGLE_STRIP:10,TRIANGLE_FAN:11,QUAD:16,QUADS:16,QUAD_STRIP:17,POLYGON:20,PATH:21,RECT:30,ELLIPSE:31,ARC:32,SPHERE:40,BOX:41,CHORD:2,PIE:3,GROUP:0,PRIMITIVE:1,GEOMETRY:3,VERTEX:0,BEZIER_VERTEX:1,CURVE_VERTEX:2,BREAK:3,CLOSESHAPE:4,OPEN:1,CLOSE:2,CORNER:0,CORNERS:1,RADIUS:2,CENTER_RADIUS:2,CENTER:3,DIAMETER:3,CENTER_DIAMETER:3,BASELINE:0,TOP:101,BOTTOM:102,NORMAL:1,NORMALIZED:1,IMAGE:2,MODEL:4,SHAPE:5,SQUARE:"butt",ROUND:"round",PROJECT:"square",MITER:"miter",BEVEL:"bevel",AMBIENT:0,DIRECTIONAL:1,SPOT:3,BACKSPACE:8,TAB:9,ENTER:10,RETURN:13,ESC:27,DELETE:127,CODED:65535,SHIFT:16,CONTROL:17,ALT:18,CAPSLK:20,PGUP:33,PGDN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLK:144,META:157,INSERT:155,ARROW:"default",CROSS:"crosshair",HAND:"pointer",MOVE:"move",TEXT:"text",WAIT:"wait",NOCURSOR:"url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto",DISABLE_OPENGL_2X_SMOOTH:1,ENABLE_OPENGL_2X_SMOOTH:-1,ENABLE_OPENGL_4X_SMOOTH:2,ENABLE_NATIVE_FONTS:3,DISABLE_DEPTH_TEST:4,ENABLE_DEPTH_TEST:-4,ENABLE_DEPTH_SORT:5,DISABLE_DEPTH_SORT:-5,DISABLE_OPENGL_ERROR_REPORT:6,ENABLE_OPENGL_ERROR_REPORT:-6,ENABLE_ACCURATE_TEXTURES:7,DISABLE_ACCURATE_TEXTURES:-7,HINT_COUNT:10,SINCOS_LENGTH:720,PRECISIONB:15,PRECISIONF:32768,PREC_MAXVAL:32767,PREC_ALPHA_SHIFT:9,PREC_RED_SHIFT:1,NORMAL_MODE_AUTO:0,NORMAL_MODE_SHAPE:1,NORMAL_MODE_VERTEX:2,MAX_LIGHTS:8}},{}],5:[function(e,n,r){n.exports=function(e){var n={BufferMax:200},r=e.createElement("style"),i=!1
return r.textContent=[".pjsconsole.hidden {","  display: none!important;","}"].join("\n"),n.wrapper=e.createElement("div"),r.textContent+=["",".pjsconsole {","  opacity: .75;","  display: block;","  position: fixed;","  bottom: 0px;","  left: 0px;","  right: 0px;","  height: 50px;","  background-color: #aaa;","}"].join("\n"),n.wrapper.classList.add("pjsconsole"),n.dragger=e.createElement("div"),r.textContent+=["",".pjsconsole .dragger {","  display: block;","  border: 3px black raised;","  cursor: n-resize;","  position: absolute;","  top: 0px;","  left: 0px;","  right: 0px;","  height: 5px;","  background-color: #333;","}"].join("\n"),n.dragger.classList.add("dragger"),n.closer=e.createElement("div"),r.textContent+=["",".pjsconsole .closer {","  opacity: .5;","  display: block;","  border: 3px black raised;","  position: absolute;","  top: 10px;","  right: 30px;","  height: 20px;","  width: 20px;","  background-color: #ddd;","  color: #000;","  line-height: 20px;","  text-align: center;","  cursor: pointer","}"].join("\n"),n.closer.classList.add("closer"),n.closer.innerHTML="&#10006;",n.javaconsole=e.createElement("div"),r.textContent+=["",".pjsconsole .console {","  overflow-x: auto;","  display: block;","  position: absolute;","  left: 10px;","  right: 0px;","  bottom: 5px;","  top: 10px;","  overflow-y: scroll;","  height: 40px;","}"].join("\n"),n.javaconsole.setAttribute("class","console"),n.wrapper.appendChild(n.dragger),n.wrapper.appendChild(n.javaconsole),n.wrapper.appendChild(n.closer),n.dragger.onmousedown=function(t){n.divheight=n.wrapper.style.height,e.selection?e.selection.empty():window.getSelection().removeAllRanges()
var r=t.screenY
window.onmousemove=function(e){n.wrapper.style.height=parseFloat(n.divheight)+(r-e.screenY)+"px",n.javaconsole.style.height=parseFloat(n.divheight)+(r-e.screenY)-10+"px"},window.onmouseup=function(t){e.selection?e.selection.empty():window.getSelection().removeAllRanges(),n.wrapper.style.height=parseFloat(n.divheight)+(r-t.screenY)+"px",n.javaconsole.style.height=parseFloat(n.divheight)+(r-t.screenY)-10+"px",window.onmousemove=null,window.onmouseup=null}},n.BufferArray=[],n.print=n.log=function(){i||(e.body.appendChild(r),e.body.appendChild(n.wrapper),i=!0)
var s=Array.prototype.slice.call(arguments)
t=s.map(function(e,t){return e+(t+1===s.length?"":" ")}).join(""),n.BufferArray[n.BufferArray.length-1]?n.BufferArray[n.BufferArray.length-1]+=t+"":n.BufferArray.push(t),n.javaconsole.innerHTML=n.BufferArray.join(""),n.showconsole()},n.println=function(){var e=Array.prototype.slice.call(arguments)
e.push("<br>"),n.print.apply(n,e),n.BufferArray.length>n.BufferMax?n.BufferArray.splice(0,1):n.javaconsole.scrollTop=n.javaconsole.scrollHeight},n.showconsole=function(){n.wrapper.classList.remove("hidden")},n.hideconsole=function(){n.wrapper.classList.add("hidden")},n.closer.onclick=function(){n.hideconsole()},n.hideconsole(),n}},{}],6:[function(e,t,n){t.exports=function(e){function t(){}function n(e,t,n){if(!e.hasOwnProperty(t)||"function"!=typeof e[t])return void(e[t]=n)
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
for(var l=t.slice(1),h=0;h<o;++h)n.push(s.createJavaArray(e,l))}}return n},s.defineProperty(s,"screenWidth",{get:function(){return window.innerWidth}}),s.defineProperty(s,"screenHeight",{get:function(){return window.innerHeight}}),s}},{}],7:[function(e,t,n){t.exports=function(e,t){var n,r=t.window,i=t.document,s=r.XMLHttpRequest,o=t.noop,a=t.isDOMPresent,h=t.version
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
if(y&&("text/processing"===y.toLowerCase()||"application/processing"===y.toLowerCase())){var x=v.getAttribute("data-processing-target")
if(s=n,x)s=i.getElementById(x)
else{for(var A=v.nextSibling;A&&1!==A.nodeType;)A=A.nextSibling
A&&"canvas"===A.nodeName.toLowerCase()&&(s=A)}if(s){if(v.getAttribute("src")){r=v.getAttribute("src").split(/\s+/),u(s,r)
continue}p=v.textContent||v.text,m=new e(s,p)}}}}}
return i.addEventListener("DOMContentLoaded",c,!1),e.reload=c,e.disableInit=function(){i.removeEventListener("DOMContentLoaded",c,!1)},e}},{}],8:[function(e,t,n){t.exports=function(e,t){return null===e||null===t?null===e&&null===t:"string"==typeof e?e===t:"object"!=typeof e?e===t:e.equals instanceof Function?e.equals(t):e===t}},{}],9:[function(e,t,n){t.exports=function(e,t){if("string"==typeof e){for(var n=0,r=0;r<e.length;++r)n=31*n+e.charCodeAt(r)&4294967295
return n}return"object"!=typeof e?4294967295&e:e.hashCode instanceof Function?e.hashCode():(e.$id===t&&(e.$id=Math.floor(65536*Math.random())-32768<<16|Math.floor(65536*Math.random())),e.$id)}},{}],10:[function(e,t,n){t.exports=function(e){function t(e){var t=-1
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
return n}},{}],11:[function(e,t,n){t.exports=function(e,t){var n=function(r){return"string"==typeof r&&1===r.length?this.code=r.charCodeAt(0):"number"==typeof r?this.code=r:r instanceof n?this.code=r:this.code=NaN,e[this.code]===t?e[this.code]=this:e[this.code]}
return n.prototype.toString=function(){return String.fromCharCode(this.code)},n.prototype.valueOf=function(){return this.code},n}({})},{}],12:[function(e,t,n){t.exports=function(e){function t(){function e(e){var t=n(e)%u.length
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
return t}},{}],13:[function(e,t,n){t.exports=function(e,t){function n(e){var t=250,n=e.size/t,r=i.createElement("canvas")
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
if(e.ascent=n*(f-v),e.descent=n*(y-f),i.defaultView.getComputedStyle){var x=i.defaultView.getComputedStyle(h,null).getPropertyValue("height")
x=n*x.replace("px",""),x>=2*e.size&&(e.leading=Math.round(x/2))}if(i.body.removeChild(h),e.caching)return a}function r(e,r){e===t&&(e=""),this.name=e,r===t&&(r=0),this.size=r,this.glyph=!1,this.ascent=0,this.descent=0,this.leading=1.2*r
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
s.style.cssText="position: absolute; top: 0; left: 0; opacity: 0;",s.style.fontFamily='"'+t+'", "PjsEmptyFont", fantasy',s.innerHTML="AAAAAAAA",i.body.appendChild(s),this.fontList.push(s)}}},r}},{}],14:[function(e,t,n){t.exports=function(e,t){var n=e.p,r=function(){0===arguments.length?this.reset():1===arguments.length&&arguments[0]instanceof r?this.set(arguments[0].array()):6===arguments.length&&this.set(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])}
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
n.println(t)}},r}},{}],15:[function(e,t,n){t.exports=function(e,t){var n=e.p,r=function(){this.reset()}
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
this.preApply([t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1])},invScale:function(e,t,n){this.preApply([1/e,0,0,0,0,1/t,0,0,0,0,1/n,0,0,0,0,1])}},r}},{}],16:[function(e,t,n){t.exports=function(e){var t=e.PConstants,n=e.PMatrix2D,r=e.PMatrix3D,i=function(e){this.family=e||t.GROUP,this.visible=!0,this.style=!0,this.children=[],this.nameTable=[],this.params=[],this.name="",this.image=null,this.matrix=null,this.kind=null,this.close=null,this.width=null,this.height=null,this.parent=null}
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
return null},getChildCount:function(){return this.children.length},addChild:function(e){this.children.push(e),e.parent=this,null!==e.getName()&&this.addName(e.getName(),e)},addName:function(e,t){null!==this.parent?this.parent.addName(e,t):this.nameTable.push([e,t])},translate:function(){2===arguments.length?(this.checkMatrix(2),this.matrix.translate(arguments[0],arguments[1])):(this.checkMatrix(3),this.matrix.translate(arguments[0],arguments[1],0))},checkMatrix:function(e){null===this.matrix?2===e?this.matrix=new n:this.matrix=new r:3===e&&this.matrix instanceof n&&(this.matrix=new r)},rotateX:function(e){this.rotate(e,1,0,0)},rotateY:function(e){this.rotate(e,0,1,0)},rotateZ:function(e){this.rotate(e,0,0,1)},rotate:function(){1===arguments.length?(this.checkMatrix(2),this.matrix.rotate(arguments[0])):(this.checkMatrix(3),this.matrix.rotate(arguments[0],arguments[1],arguments[2],arguments[3]))},scale:function(){2===arguments.length?(this.checkMatrix(2),this.matrix.scale(arguments[0],arguments[1])):3===arguments.length?(this.checkMatrix(2),this.matrix.scale(arguments[0],arguments[1],arguments[2])):(this.checkMatrix(2),this.matrix.scale(arguments[0]))},resetMatrix:function(){this.checkMatrix(2),this.matrix.reset()},applyMatrix:function(e){1===arguments.length?this.applyMatrix(e.elements[0],e.elements[1],0,e.elements[2],e.elements[3],e.elements[4],0,e.elements[5],0,0,1,0,0,0,0,1):6===arguments.length?(this.checkMatrix(2),this.matrix.apply(arguments[0],arguments[1],arguments[2],0,arguments[3],arguments[4],arguments[5],0,0,0,1,0,0,0,0,1)):16===arguments.length&&(this.checkMatrix(3),this.matrix.apply(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9],arguments[10],arguments[11],arguments[12],arguments[13],arguments[14],arguments[15]))}},i}},{}],17:[function(e,t,n){t.exports=function(e){var t=e.CommonFunctions,n=e.PConstants,r=e.PShape,i=e.XMLElement,s=e.colors,o=function(){if(r.call(this),1===arguments.length){if(this.element=arguments[0],this.vertexCodes=[],this.vertices=[],this.opacity=1,this.stroke=!1,this.strokeColor=n.ALPHA_MASK,this.strokeWeight=1,this.strokeCap=n.SQUARE,this.strokeJoin=n.MITER,this.strokeGradient=null,this.strokeGradientPaint=null,this.strokeName=null,this.strokeOpacity=1,this.fill=!0,this.fillColor=n.ALPHA_MASK,this.fillGradient=null,this.fillGradientPaint=null,this.fillName=null,this.fillOpacity=1,"svg"!==this.element.getName())throw"root is not <svg>, it's <"+this.element.getName()+">"}else 2===arguments.length&&("string"==typeof arguments[1]?arguments[1].indexOf(".svg")>-1&&(this.element=new i((!0),arguments[1]),this.vertexCodes=[],this.vertices=[],this.opacity=1,this.stroke=!1,this.strokeColor=n.ALPHA_MASK,this.strokeWeight=1,this.strokeCap=n.SQUARE,this.strokeJoin=n.MITER,this.strokeGradient="",this.strokeGradientPaint="",this.strokeName="",this.strokeOpacity=1,this.fill=!0,this.fillColor=n.ALPHA_MASK,this.fillGradient=null,this.fillGradientPaint=null,this.fillOpacity=1):arguments[0]&&(this.element=arguments[1],this.vertexCodes=arguments[0].vertexCodes.slice(),this.vertices=arguments[0].vertices.slice(),this.stroke=arguments[0].stroke,this.strokeColor=arguments[0].strokeColor,this.strokeWeight=arguments[0].strokeWeight,this.strokeCap=arguments[0].strokeCap,this.strokeJoin=arguments[0].strokeJoin,this.strokeGradient=arguments[0].strokeGradient,this.strokeGradientPaint=arguments[0].strokeGradientPaint,this.strokeName=arguments[0].strokeName,this.fill=arguments[0].fill,this.fillColor=arguments[0].fillColor,this.fillGradient=arguments[0].fillGradient,this.fillGradientPaint=arguments[0].fillGradientPaint,this.fillName=arguments[0].fillName,this.strokeOpacity=arguments[0].strokeOpacity,this.fillOpacity=arguments[0].fillOpacity,this.opacity=arguments[0].opacity))
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
for(var r,i,s,o,a=0,l=0,h=0,u=0,c=0,f=0,p=0,m=0,g=0,d=0,v=0,y=0,x=0,A=0,b=0,w=0,E="",S=[],P=!1;b<e.length;)if(w=e[b].charCodeAt(0),w>=65&&w<=90||w>=97&&w<=122){if(s=b,b++,b<e.length)for(S=[],w=e[b].charCodeAt(0);!(w>=65&&w<=90||w>=97&&w<=100||w>=102&&w<=122)&&P===!1;)32===w?(""!==E&&(S.push(parseFloat(E)),E=""),b++):45===w?101===e[b-1].charCodeAt(0)?(E+=e[b].toString(),b++):(""!==E&&S.push(parseFloat(E)),E=e[b].toString(),b++):(E+=e[b].toString(),b++),b===e.length?P=!0:w=e[b].charCodeAt(0)
if(""!==E&&(S.push(parseFloat(E)),E=""),i=e[s],w=i.charCodeAt(0),77===w){if(S.length>=2&&S.length%2===0&&(a=S[0],l=S[1],this.parsePathMoveto(a,l),S.length>2))for(s=2,o=S.length;s<o;s+=2)a=S[s],l=S[s+1],this.parsePathLineto(a,l)}else if(109===w){if(S.length>=2&&S.length%2===0&&(a+=S[0],l+=S[1],this.parsePathMoveto(a,l),S.length>2))for(s=2,o=S.length;s<o;s+=2)a+=S[s],l+=S[s+1],this.parsePathLineto(a,l)}else if(76===w){if(S.length>=2&&S.length%2===0)for(s=0,o=S.length;s<o;s+=2)a=S[s],l=S[s+1],this.parsePathLineto(a,l)}else if(108===w){if(S.length>=2&&S.length%2===0)for(s=0,o=S.length;s<o;s+=2)a+=S[s],l+=S[s+1],this.parsePathLineto(a,l)}else if(72===w)for(s=0,o=S.length;s<o;s++)a=S[s],this.parsePathLineto(a,l)
else if(104===w)for(s=0,o=S.length;s<o;s++)a+=S[s],this.parsePathLineto(a,l)
else if(86===w)for(s=0,o=S.length;s<o;s++)l=S[s],this.parsePathLineto(a,l)
else if(118===w)for(s=0,o=S.length;s<o;s++)l+=S[s],this.parsePathLineto(a,l)
else if(67===w){if(S.length>=6&&S.length%6===0)for(s=0,o=S.length;s<o;s+=6)c=S[s],p=S[s+1],f=S[s+2],m=S[s+3],g=S[s+4],d=S[s+5],this.parsePathCurveto(c,p,f,m,g,d),a=g,l=d}else if(99===w){if(S.length>=6&&S.length%6===0)for(s=0,o=S.length;s<o;s+=6)c=a+S[s],p=l+S[s+1],f=a+S[s+2],m=l+S[s+3],g=a+S[s+4],d=l+S[s+5],this.parsePathCurveto(c,p,f,m,g,d),a=g,l=d}else if(83===w){if(S.length>=4&&S.length%4===0)for(s=0,o=S.length;s<o;s+=4)"c"===r.toLowerCase()||"s"===r.toLowerCase()?(v=this.vertices[this.vertices.length-2][0],y=this.vertices[this.vertices.length-2][1],x=this.vertices[this.vertices.length-1][0],A=this.vertices[this.vertices.length-1][1],c=x+(x-v),p=A+(A-y)):(c=this.vertices[this.vertices.length-1][0],p=this.vertices[this.vertices.length-1][1]),f=S[s],m=S[s+1],g=S[s+2],d=S[s+3],this.parsePathCurveto(c,p,f,m,g,d),a=g,l=d}else if(115===w){if(S.length>=4&&S.length%4===0)for(s=0,o=S.length;s<o;s+=4)"c"===r.toLowerCase()||"s"===r.toLowerCase()?(v=this.vertices[this.vertices.length-2][0],y=this.vertices[this.vertices.length-2][1],x=this.vertices[this.vertices.length-1][0],A=this.vertices[this.vertices.length-1][1],c=x+(x-v),p=A+(A-y)):(c=this.vertices[this.vertices.length-1][0],p=this.vertices[this.vertices.length-1][1]),f=a+S[s],m=l+S[s+1],g=a+S[s+2],d=l+S[s+3],this.parsePathCurveto(c,p,f,m,g,d),a=g,l=d}else if(81===w){if(S.length>=4&&S.length%4===0)for(s=0,o=S.length;s<o;s+=4)h=S[s],u=S[s+1],g=S[s+2],d=S[s+3],this.parsePathQuadto(a,l,h,u,g,d),a=g,l=d}else if(113===w){if(S.length>=4&&S.length%4===0)for(s=0,o=S.length;s<o;s+=4)h=a+S[s],u=l+S[s+1],g=a+S[s+2],d=l+S[s+3],this.parsePathQuadto(a,l,h,u,g,d),a=g,l=d}else if(84===w){if(S.length>=2&&S.length%2===0)for(s=0,o=S.length;s<o;s+=2)"q"===r.toLowerCase()||"t"===r.toLowerCase()?(v=this.vertices[this.vertices.length-2][0],y=this.vertices[this.vertices.length-2][1],x=this.vertices[this.vertices.length-1][0],A=this.vertices[this.vertices.length-1][1],h=x+(x-v),u=A+(A-y)):(h=a,u=l),g=S[s],d=S[s+1],this.parsePathQuadto(a,l,h,u,g,d),a=g,l=d}else if(116===w){if(S.length>=2&&S.length%2===0)for(s=0,o=S.length;s<o;s+=2)"q"===r.toLowerCase()||"t"===r.toLowerCase()?(v=this.vertices[this.vertices.length-2][0],y=this.vertices[this.vertices.length-2][1],x=this.vertices[this.vertices.length-1][0],A=this.vertices[this.vertices.length-1][1],h=x+(x-v),u=A+(A-y)):(h=a,u=l),g=a+S[s],d=l+S[s+1],this.parsePathQuadto(a,l,h,u,g,d),a=g,l=d}else 90!==w&&122!==w||(this.close=!0)
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
return t<0?e:e.indexOf("pt")===t?1.25*parseFloat(e.substring(0,t)):e.indexOf("pc")===t?15*parseFloat(e.substring(0,t)):e.indexOf("mm")===t?3.543307*parseFloat(e.substring(0,t)):e.indexOf("cm")===t?35.43307*parseFloat(e.substring(0,t)):e.indexOf("in")===t?90*parseFloat(e.substring(0,t)):e.indexOf("px")===t?parseFloat(e.substring(0,t)):parseFloat(e)},o}},{}],18:[function(e,t,n){t.exports=function(e,t){function n(e,t,n){this.x=e||0,this.y=t||0,this.z=n||0}function r(e){return function(t,n){var r=t.get()
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
return n}},{}],19:[function(e,t,n){t.exports=function(){var e=function(e,t,n,r,i){this.fullName=e||"",this.name=t||"",this.namespace=n||"",this.value=r,this.type=i}
return e.prototype={getName:function(){return this.name},getFullName:function(){return this.fullName},getNamespace:function(){return this.namespace},getValue:function(){return this.value},getType:function(){return this.type},setValue:function(e){this.value=e}},e}},{}],20:[function(e,t,n){t.exports=function(e,t){var n=e.Browser,r=n.ajax,i=n.window,s=(i.XMLHttpRequest,i.DOMParser),o=e.XMLAttribute,a=function(e,n,r,i){this.attributes=[],this.children=[],this.fullName=null,this.name=null,this.namespace="",this.content=null,this.parent=null,this.lineNr="",this.systemID="",this.type="ELEMENT",e&&("string"==typeof e?n===t&&e.indexOf("<")>-1?this.parse(e):(this.fullName=e,this.namespace=n,this.systemId=r,this.lineNr=i):this.parse(n,!0))}
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
return t.parse(e),t},a}},{}],21:[function(e,t,n){t.exports={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"}},{}],22:[function(e,t,n){t.exports=function(e,t,n){return function(r,i){r.__contains=function(e,t){return"string"!=typeof e?e.contains.apply(e,i(arguments)):null!==e&&null!==t&&"string"==typeof t&&e.indexOf(t)>-1},r.__replaceAll=function(e,t,n){return"string"!=typeof e?e.replaceAll.apply(e,i(arguments)):e.replace(new RegExp(t,"g"),n)},r.__replaceFirst=function(e,t,n){return"string"!=typeof e?e.replaceFirst.apply(e,i(arguments)):e.replace(new RegExp(t,""),n)},r.__replace=function(e,t,n){if("string"!=typeof e)return e.replace.apply(e,i(arguments))
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
return""===t||t===e||e.indexOf(t)===e.length-n},r.__hashCode=function(t){return t.hashCode instanceof Function?t.hashCode.apply(t,i(arguments)):e(t)},r.__printStackTrace=function(e){r.println("Exception: "+e.toString())}}}},{}],23:[function(e,t,n){t.exports=function(e,t){function n(e,t){var n=e||362436069,r=t||521288629,i=function(){return n=36969*(65535&n)+(n>>>16)&4294967295,r=18e3*(65535&r)+(r>>>16)&4294967295,4294967295&((65535&n)<<16|65535&r)}
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
return t},e.norm=function(e,t,n){return(e-t)/(n-t)},e.sq=function(e){return e*e},e.degrees=function(e){return 180*e/Math.PI},e.random=function(e,t){if(0===arguments.length?(t=1,e=0):1===arguments.length&&(t=e,e=0),e===t)return e
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
case 3:h+=a*(1+o.noise3d(l*e,l*n,l*i))/2}l*=2}return h},e.noiseDetail=function(e,n){s.octaves=e,n!==t&&(s.fallout=n)},e.noiseSeed=function(e){s.seed=e,s.generator=t}}},{}],24:[function(e,t,n){t.exports=function(e){var t={trim:function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(e[n].replace(/^\s*/,"").replace(/\s*$/,"").replace(/\r*$/,""))
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
return t}()},{}],25:[function(e,t,n){t.exports=function(e,t,n,r,i,s,o){function a(t,n){var r=t,s=0,o=0
if(e.pmouseX=e.mouseX,e.pmouseY=e.mouseY,r.offsetParent)do s+=r.offsetLeft,o+=r.offsetTop
while(r=r.offsetParent)
r=t
do s-=r.scrollLeft||0,o-=r.scrollTop||0
while(r=r.parentNode)
var a,l,h,u
return i.defaultView&&i.defaultView.getComputedStyle&&(a=parseInt(i.defaultView.getComputedStyle(t,null).paddingLeft,10)||0,l=parseInt(i.defaultView.getComputedStyle(t,null).paddingTop,10)||0,h=parseInt(i.defaultView.getComputedStyle(t,null).borderLeftWidth,10)||0,u=parseInt(i.defaultView.getComputedStyle(t,null).borderTopWidth,10)||0),s+=a,o+=l,s+=h,o+=u,s+=window.pageXOffset,o+=window.pageYOffset,{X:s,Y:o}}function l(t,n){var r=a(t,n)
e.mouseX=n.pageX-r.X,e.mouseY=n.pageY-r.Y}function h(e){var t,n=a(e.changedTouches[0].target,e.changedTouches[0])
for(t=0;t<e.touches.length;t++){var r=e.touches[t]
r.offsetX=r.pageX-n.X,r.offsetY=r.pageY-n.Y}for(t=0;t<e.targetTouches.length;t++){var i=e.targetTouches[t]
i.offsetX=i.pageX-n.X,i.offsetY=i.pageY-n.Y}for(t=0;t<e.changedTouches.length;t++){var s=e.changedTouches[t]
s.offsetX=s.pageX-n.X,s.offsetY=s.pageY-n.Y}return e}var u=["mouseout","mousemove","mousedown","mouseup","DOMMouseScroll","mousewheel","touchstart"]
n(t,"touchstart",function(i){t.setAttribute("style","-webkit-user-select: none"),t.setAttribute("onclick","void(0)"),t.setAttribute("style","-webkit-tap-highlight-color:rgba(0,0,0,0)"),r(t,u),e.touchStart!==o||e.touchMove!==o||e.touchEnd!==o||e.touchCancel!==o?(n(t,"touchstart",function(t){e.touchStart!==o&&(t=h(t),e.touchStart(t))}),n(t,"touchmove",function(t){e.touchMove!==o&&(t.preventDefault(),t=h(t),e.touchMove(t))}),n(t,"touchend",function(t){e.touchEnd!==o&&(t=h(t),e.touchEnd(t))}),n(t,"touchcancel",function(t){e.touchCancel!==o&&(t=h(t),e.touchCancel(t))})):(n(t,"touchstart",function(n){l(t,n.touches[0]),e.__mousePressed=!0,e.mouseDragging=!1,e.mouseButton=s.LEFT,"function"==typeof e.mousePressed&&e.mousePressed()}),n(t,"touchmove",function(n){n.preventDefault(),l(t,n.touches[0]),"function"!=typeof e.mouseMoved||e.__mousePressed||e.mouseMoved(),"function"==typeof e.mouseDragged&&e.__mousePressed&&(e.mouseDragged(),e.mouseDragging=!0)}),n(t,"touchend",function(t){e.__mousePressed=!1,"function"!=typeof e.mouseClicked||e.mouseDragging||e.mouseClicked(),"function"==typeof e.mouseReleased&&e.mouseReleased()}))}),function(){var r=!0,i=function(e){e.preventDefault(),e.stopPropagation()}
e.disableContextMenu=function(){r&&(n(t,"contextmenu",i),r=!1)},e.enableContextMenu=function(){r||(detachEventHandler({elem:t,type:"contextmenu",fn:i}),r=!0)}}(),n(t,"mousemove",function(n){l(t,n),"function"!=typeof e.mouseMoved||e.__mousePressed||e.mouseMoved(),"function"==typeof e.mouseDragged&&e.__mousePressed&&(e.mouseDragged(),e.mouseDragging=!0)}),n(t,"mouseout",function(t){"function"==typeof e.mouseOut&&e.mouseOut()}),n(t,"mouseover",function(n){l(t,n),"function"==typeof e.mouseOver&&e.mouseOver()}),t.onmousedown=function(){return t.focus(),!1},n(t,"mousedown",function(t){switch(e.__mousePressed=!0,e.mouseDragging=!1,t.which){case 1:e.mouseButton=s.LEFT
break
case 2:e.mouseButton=s.CENTER
break
case 3:e.mouseButton=s.RIGHT}"function"==typeof e.mousePressed&&e.mousePressed()}),n(t,"mouseup",function(t){e.__mousePressed=!1,"function"!=typeof e.mouseClicked||e.mouseDragging||e.mouseClicked(),"function"==typeof e.mouseReleased&&e.mouseReleased()})
var c=function(n){if(n.target===t){var r=0
n.wheelDelta?(r=n.wheelDelta/120,window.opera&&(r=-r)):n.detail&&(r=-n.detail/3),e.mouseScroll=r,r&&"function"==typeof e.mouseScrolled&&(n.stopPropagation(),n.preventDefault(),e.mouseScrolled())}}
n(i,"DOMMouseScroll",c),n(i,"mousewheel",c)}},{}],26:[function(e,t,n){t.exports=function(t,n){function r(){var e=["abs","acos","alpha","ambient","ambientLight","append","applyMatrix","arc","arrayCopy","asin","atan","atan2","background","beginCamera","beginDraw","beginShape","bezier","bezierDetail","bezierPoint","bezierTangent","bezierVertex","binary","blend","blendColor","blit_resize","blue","box","breakShape","brightness","camera","ceil","Character","color","colorMode","concat","constrain","copy","cos","createFont","createGraphics","createImage","cursor","curve","curveDetail","curvePoint","curveTangent","curveTightness","curveVertex","day","degrees","directionalLight","disableContextMenu","dist","draw","ellipse","ellipseMode","emissive","enableContextMenu","endCamera","endDraw","endShape","exit","exp","expand","externals","fill","filter","floor","focused","frameCount","frameRate","frustum","get","glyphLook","glyphTable","green","height","hex","hint","hour","hue","image","imageMode","intersect","join","key","keyCode","keyPressed","keyReleased","keyTyped","lerp","lerpColor","lightFalloff","lights","lightSpecular","line","link","loadBytes","loadFont","loadGlyphs","loadImage","loadPixels","loadShape","loadXML","loadStrings","log","loop","mag","map","match","matchAll","max","millis","min","minute","mix","modelX","modelY","modelZ","modes","month","mouseButton","mouseClicked","mouseDragged","mouseMoved","mouseOut","mouseOver","mousePressed","mouseReleased","mouseScroll","mouseScrolled","mouseX","mouseY","name","nf","nfc","nfp","nfs","noCursor","noFill","noise","noiseDetail","noiseSeed","noLights","noLoop","norm","normal","noSmooth","noStroke","noTint","ortho","param","parseBoolean","parseByte","parseChar","parseFloat","parseInt","parseXML","peg","perspective","PImage","pixels","PMatrix2D","PMatrix3D","PMatrixStack","pmouseX","pmouseY","point","pointLight","popMatrix","popStyle","pow","print","printCamera","println","printMatrix","printProjection","PShape","PShapeSVG","pushMatrix","pushStyle","quad","radians","random","randomGaussian","randomSeed","rect","rectMode","red","redraw","requestImage","resetMatrix","reverse","rotate","rotateX","rotateY","rotateZ","round","saturation","save","saveFrame","saveStrings","scale","screenX","screenY","screenZ","second","set","setup","shape","shapeMode","shared","shearX","shearY","shininess","shorten","sin","size","smooth","sort","specular","sphere","sphereDetail","splice","split","splitTokens","spotLight","sq","sqrt","status","str","stroke","strokeCap","strokeJoin","strokeWeight","subset","tan","text","textAlign","textAscent","textDescent","textFont","textLeading","textMode","textSize","texture","textureMode","textWidth","tint","toImageData","touchCancel","touchEnd","touchMove","touchStart","translate","transform","triangle","trim","unbinary","unhex","updatePixels","use3DContext","vertex","width","XMLElement","XML","year","__contains","__equals","__equalsIgnoreCase","__frameRate","__hashCode","__int_cast","__instanceof","__keyPressed","__mousePressed","__printStackTrace","__replace","__replaceAll","__replaceFirst","__toCharArray","__split","__codePointAt","__startsWith","__endsWith","__matches"]
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
return n}function v(e){this.name=e}function y(e,t){this.params=e,this.methodArgsParam=t}function x(e){var t=s(e.substring(1,e.length-1)),n=[],r=null
if(""!==t)for(var i=t.split(","),o=0;o<i.length;++o){var a=/\b([A-Za-z_$][\w$]*\b)(\s*"[ABC][\d]*")*\s*$/.exec(i[o])
if(o===i.length-1&&i[o].indexOf("...")>=0){r=new v(a[1])
break}n.push(new v(a[1]))}return new y(n,r)}function A(e){function t(e,t,n,r){var o=_e[r]
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
return new E("function"!==t[1]?t[1]:null,x(_e[t[2]]),Pe(_e[t[3]]))}function P(e){this.members=e}function C(e){for(var t=e.split(","),n=0;n<t.length;++n){var r=t[n].indexOf(":")
r<0?t[n]={value:Te(t[n])}:t[n]={label:s(t[n].substring(0,r)),value:Te(s(t[n].substring(r+1)))}}return new P(t)}function M(e){if("("===e.charAt(0)||"["===e.charAt(0))return e.charAt(0)+M(e.substring(1,e.length-1))+e.charAt(e.length-1)
if("{"===e.charAt(0))return/^\{\s*(?:[A-Za-z_$][\w$]*|'\d+')\s*:/.test(e)?"{"+f(e.substring(1,e.length-1),"I")+"}":"["+M(e.substring(1,e.length-1))+"]"
var t=i(e),n=A(t.middle)
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
return new H(t[3],x(_e[c(t[4])]),Pe(r),n)}function Y(e,t,n){this.definitions=e,this.fieldType=t,this.isStatic=n}function j(e){for(var t=Fe.exec(e),n=t[1].indexOf("static")>=0,r=e.substring(t[0].length).split(/,\s*/g),i=I(t[2]),s=0;s<r.length;++s)r[s]=L(r[s],i)
return new Y(r,t[2],n)}function K(e,t){this.params=e,this.body=t}function W(e){var t=new RegExp(/"B(\d+)"\s*"A(\d+)"/).exec(e),n=x(_e[t[1]])
return new K(n,Pe(_e[t[2]]))}function Z(e,t,n,r,i,s){var o,a
for(this.name=e,this.interfacesNames=t,this.methodsNames=n,this.fields=r,this.innerClasses=i,this.misc=s,o=0,a=r.length;o<a;++o)r[o].owner=this}function q(e,t,n,r,i,s,o,a,l){var h,u
for(this.name=e,this.baseClassName=t,this.interfacesNames=n,this.functions=r,this.methods=i,this.fields=s,this.cstrs=o,this.innerClasses=a,this.misc=l,h=0,u=s.length;h<u;++h)s[h].owner=this}function Q(e,t){this.name=e,this.body=t,t.owner=this}function J(e,t){this.name=e,this.body=t,t.owner=this}function ee(e){var t=Ie.exec(e)
Ie.lastIndex=0
var n=_e[c(t[6])],r=we,i=p()
we=i
var s
return s="interface"===t[2]?new Q(t[3],Se(n,t[3],t[4])):new J(t[3],Ee(n,t[3],t[4],t[5])),m(s,i,r),we=r,s}function te(e,t,n){this.name=e,this.params=t,this.body=n}function ne(e){var t=De.exec(e)
De.lastIndex=0
return new te(t[3],x(_e[c(t[4])]),Pe(_e[c(t[6])]))}function re(e){var t=e
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
var ye,xe=ve,Ae=function(e,t,n,r){return t||r?e:(ye=!0,"")}
do ye=!1,xe=xe.replace(/([<]?)<\s*((?:\?|[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\[\])*(?:\s+(?:extends|super)\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)?(?:\s*,\s*(?:\?|[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\[\])*(?:\s+(?:extends|super)\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)?)*)\s*>([=]?)/g,Ae)
while(ye)
var be,we,Ee,Se,Pe,Ce,Me,Te,_e=t(xe),Re={},Le=0,Ie=/\b((?:(?:public|private|final|protected|static|abstract)\s+)*)(class|interface)\s+([A-Za-z_$][\w$]*\b)(\s+extends\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\b)*)?(\s+implements\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\b)*)?\s*("A\d+")/g,De=/\b((?:(?:public|private|final|protected|static|abstract|synchronized)\s+)*)((?!(?:else|new|return|throw|function|public|private|protected)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*([A-Za-z_$][\w$]*\b)\s*("B\d+")(\s*throws\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)*)?\s*("A\d+"|;)/g,Oe=/^((?:(?:public|private|final|protected|static)\s+)*)((?!(?:else|new|return|throw)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*([A-Za-z_$][\w$]*\b)\s*(?:"C\d+"\s*)*([=,]|$)/,Ne=/\b((?:(?:public|private|final|protected|static|abstract)\s+)*)((?!(?:new|return|throw)\b)[A-Za-z_$][\w$]*\b)\s*("B\d+")(\s*throws\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)*)?\s*("A\d+")/g,Fe=/^((?:(?:public|private|final|protected|static)\s+)*)((?!(?:new|return|throw)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*/,ke=/\bfunction(?:\s+([A-Za-z_$][\w$]*))?\s*("B\d+")\s*("A\d+")/g
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
n.push(l)}return n.join("")}return e+"."+this.definitions.join("; "+e+".")},K.prototype.toString=function(){var e=h({},this.params.getNames()),t=be
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
c[h]=j(p.middle)}var m=c.pop()
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
a+=r+".$interfaces = ["+y.join(", ")+"];\n"}for(this.functions.length>0&&(i+=this.functions.join("\n")+"\n"),G(this.innerClasses),p=0,m=this.innerClasses.length;p<m;++p){var x=this.innerClasses[p]
x.isStatic?(o+=r+"."+x.name+" = "+x+";\n",i+=n+"."+x.name+" = "+r+"."+x.name+";\n"):i+=n+"."+x.name+" = "+x+";\n"}for(p=0,m=this.fields.length;p<m;++p){var A=this.fields[p]
if(A.isStatic)for(o+=r+"."+A.definitions.join(";\n"+r+".")+";\n",g=0,d=A.definitions.length;g<d;++g){var b=A.definitions[g].name,w=r+"."+b
i+="$p.defineProperty("+n+", '"+b+"', {get: function(){return "+w+"}, set: function(val){"+w+" = val}});\n"}else i+=n+"."+A.definitions.join(";\n"+n+".")+";\n"}var E={}
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
m[p]=j(v.middle)}var y=m.pop()
for(p=0;p<h.length;++p)h[p]=W(_e[h[p]])
for(p=0;p<l.length;++p)l[p]=U(_e[l[p]])
return new q(t,c,f,u,a,m,h,l,{tail:y})},Q.prototype.toString=function(){return"var "+this.name+" = "+this.body+";\n$p."+this.name+" = "+this.name+";\n"},J.prototype.toString=function(){return"var "+this.name+" = "+this.body+";\n$p."+this.name+" = "+this.name+";\n"},te.prototype.toString=function(){var e=h({},this.params.getNames()),t=be
be=function(n){return e.hasOwnProperty(n.name)?n.name:t(n)}
var n=this.params.prependMethodArgs(this.body.toString()),r="function "+this.name+this.params+" "+n+"\n$p."+this.name+" = "+this.name+";\n"+this.name+" = "+this.name+".bind($p);"
return be=t,r},ie.prototype.toString=function(){return this.misc.prefix+this.argument.toString()},se.prototype.toString=function(){return this.misc.prefix+this.argument.toString()},oe.prototype.toString=function(){var e=this.misc.prefix
return this.argument!==o&&(e+=this.argument.toString()),e},ae.prototype.toString=function(){return"case "+this.expr+":"},le.prototype.toString=function(){return this.label},Ce=function(e,t,n){var r=new RegExp(/\b(catch|for|if|switch|while|with)\s*"B(\d+)"|\b(do|else|finally|return|throw|try|break|continue)\b|("[ADEH](\d+)")|\b(case)\s+([^:]+):|\b([A-Za-z_$][\w$]*\s*:)|(;)/g),a=[]
e=re(e)
for(var l,h,u=0;null!==(l=r.exec(e));){if(l[1]!==o){var c=e.lastIndexOf('"B',r.lastIndex),f=e.substring(u,c)
"for"===l[1]?a.push(new ie($(_e[l[2]]),{prefix:f})):"catch"===l[1]?a.push(new se(x(_e[l[2]]),{prefix:f})):a.push(new oe(l[1],Te(_e[l[2]]),{prefix:f}))}else if(l[3]!==o)a.push(new oe(l[3],o,{prefix:e.substring(u,r.lastIndex)}))
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
return t.logger=new f(c),t}},{"../Helpers/PjsConsole":5}],27:[function(e,t,n){t.exports=function(e,t){function n(e,t){return e in l?l[e]:"function"==typeof l[t]?l[t]:function(e){if(e instanceof Array)return e
if("number"==typeof e){var t=[]
return t.length=e,t}}}var r=e.defaultScope,i=e.extend,s=e.Browser,o=s.ajax,a=s.navigator,l=s.window,h=(l.XMLHttpRequest,s.document),u=e.noop,c=r.PConstants
PFont=r.PFont,PShapeSVG=r.PShapeSVG,PVector=r.PVector,Char=Character=r.Char,ObjectIterator=r.ObjectIterator,XMLElement=r.XMLElement,XML=r.XML
var f,p=l.HTMLCanvasElement,m=l.HTMLImageElement
try{f=l.localStorage}catch(e){f={}}"document"in this&&!("fake"in this.document)
h.head||(h.head=h.getElementsByTagName("head")[0])
var g=n("Float32Array","WebGLFloatArray"),d=n("Int32Array","WebGLIntArray"),v=n("Uint16Array","WebGLUnsignedShortArray"),y=n("Uint8Array","WebGLUnsignedByteArray")
if(h.documentMode>=9&&!h.doctype)throw"The doctype directive is missing. The recommended doctype in Internet Explorer is the HTML5 doctype: <!DOCTYPE html>"
var x=[],A={},b=function(e){e.externals.canvas.id!==t&&e.externals.canvas.id.length||(e.externals.canvas.id="__processing"+x.length),A[e.externals.canvas.id]=x.length,x.push(e)},w=function(e){x.splice(A[e],1),delete A[e]},E=this.Processing=function(e,n,s){function x(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n),ye.push({elem:e,type:t,fn:n})}function A(e){var t=e.elem,n=e.type,r=e.fn
t.removeEventListener?t.removeEventListener(n,r,!1):t.detachEvent&&t.detachEvent("on"+n,r)}function S(e,t){Object.keys(ye).forEach(function(n){t.indexOf(n.type)>-1&&n.elem==e&&A(n.type)})}function P(e){return Array.prototype.slice.call(e,1)}function C(e,n,r,i){var s=Wt.locations[e]
s===t&&(s=Ae.getUniformLocation(n,r),Wt.locations[e]=s),null!==s&&(4===i.length?Ae.uniform4fv(s,i):3===i.length?Ae.uniform3fv(s,i):2===i.length?Ae.uniform2fv(s,i):Ae.uniform1f(s,i))}function M(e,n,r,i){var s=Wt.locations[e]
s===t&&(s=Ae.getUniformLocation(n,r),Wt.locations[e]=s),null!==s&&(4===i.length?Ae.uniform4iv(s,i):3===i.length?Ae.uniform3iv(s,i):2===i.length?Ae.uniform2iv(s,i):Ae.uniform1i(s,i))}function T(e,n,r,i,s){var o=Wt.locations[e]
o===t&&(o=Ae.getUniformLocation(n,r),Wt.locations[e]=o),o!==-1&&(16===s.length?Ae.uniformMatrix4fv(o,i,s):9===s.length?Ae.uniformMatrix3fv(o,i,s):Ae.uniformMatrix2fv(o,i,s))}function _(e,n,r,i,s){var o=Wt.attributes[e]
o===t&&(o=Ae.getAttribLocation(n,r),Wt.attributes[e]=o),o!==-1&&(Ae.bindBuffer(Ae.ARRAY_BUFFER,s),Ae.vertexAttribPointer(o,i,Ae.FLOAT,!1,0,0),Ae.enableVertexAttribArray(o))}function R(e,n,r){var i=Wt.attributes[e]
i===t&&(i=Ae.getAttribLocation(n,r),Wt.attributes[e]=i),i!==-1&&Ae.disableVertexAttribArray(i)}function L(e,t,n,r){var i,s,o,a
if(Ut===c.HSB){var l=xe.color.toRGB(e,t,n)
i=l[0],s=l[1],o=l[2]}else i=Math.round(255*(e/Bt)),s=Math.round(255*(t/$t)),o=Math.round(255*(n/Gt))
return a=Math.round(255*(r/kt)),i=i<0?0:i,s=s<0?0:s,o=o<0?0:o,a=a<0?0:a,i=i>255?255:i,s=s>255?255:s,o=o>255?255:o,a=a>255?255:a,a<<24&c.ALPHA_MASK|i<<16&c.RED_MASK|s<<8&c.GREEN_MASK|o&c.BLUE_MASK}function I(e,t){var n
return e&c.ALPHA_MASK?(n=Math.round(255*(t/kt)),n=n>255?255:n,n=n<0?0:n,e-(e&c.ALPHA_MASK)+(n<<24&c.ALPHA_MASK)):Ut===c.RGB?L(e,e,e,t):Ut===c.HSB?L(0,0,e/Bt*Gt,t):void 0}function D(e){if(e<=Bt&&e>=0){if(Ut===c.RGB)return L(e,e,e,kt)
if(Ut===c.HSB)return L(0,0,e/Bt*Gt,kt)}if(e)return e>2147483647&&(e-=4294967296),e}function O(e){var t,n,r
t=((e&c.RED_MASK)>>>16)/255,n=((e&c.GREEN_MASK)>>>8)/255,r=(e&c.BLUE_MASK)/255
var i,s,o=xe.max(xe.max(t,n),r),a=xe.min(xe.min(t,n),r)
return a===o?[0,0,o*Gt]:(s=(o-a)/o,i=t===o?(n-r)/(o-a):n===o?2+(r-t)/(o-a):4+(t-n)/(o-a),i/=6,i<0?i+=1:i>1&&(i-=1),[i*Bt,s*$t,o*Gt])}function N(){Ae.save()}function F(){Ae.restore(),mt=!0,ut=!0}function k(){var e=(Date.now()-jt)/1e3
Kt++
var t=Kt/e
e>.5&&(jt=Date.now(),Kt=0,xe.__frameRate=t),xe.frameCount++}function B(e){var t=parseInt("0x"+e,16)
return t>2147483647&&(t-=4294967296),t}function $(e){return"number"==typeof e?0!==e:"boolean"==typeof e?e:"string"==typeof e?"true"===e.toLowerCase():e instanceof Char?49===e.code||84===e.code||116===e.code:void 0}function G(e){return"number"==typeof e?e:"boolean"==typeof e?e?1:0:"string"==typeof e?parseFloat(e):e instanceof Char?e.code:void 0}function V(e,t){if("number"==typeof e)return 4294967295&e
if("boolean"==typeof e)return e?1:0
if("string"==typeof e){var n=parseInt(e,t||10)
return 4294967295&n}return e instanceof Char?e.code:void 0}function z(){at&&(ut&&(Ae.fillStyle=xe.color.toString(ht),ut=!1),Ae.fill())}function U(){ct&&(mt&&(Ae.strokeStyle=xe.color.toString(pt),mt=!1),Ae.stroke())}function H(){z(),U(),Ae.closePath()}function X(e,n,r){var i=wr.shift()
i===t&&(i={},i.canvas=h.createElement("canvas"),i.context=i.canvas.getContext("2d")),wr.push(i)
var s=i.canvas,o=i.context,a=n||e.width,l=r||e.height
return s.width=a,s.height=l,e?"data"in e?o.putImageData(e,0,0):(o.clearRect(0,0,a,l),o.drawImage(e,0,0,a,l)):o.clearRect(0,0,a,l),i}function Y(e){return{getLength:function(e){return function(){if(e.isRemote)throw"Image is loaded remotely. Cannot get length."
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
e.__isDirty=!0}}(e)}}function j(e,t){var n
if(e>=xe.width||e<0||t<0||t>=xe.height)return 0
if(un){var r=4*((0|e)+xe.width*(0|t))
return n=xe.imageData.data,n[r+3]<<24&c.ALPHA_MASK|n[r]<<16&c.RED_MASK|n[r+1]<<8&c.GREEN_MASK|n[r+2]&c.BLUE_MASK}return n=xe.toImageData(0|e,0|t,1,1).data,n[3]<<24&c.ALPHA_MASK|n[0]<<16&c.RED_MASK|n[1]<<8&c.GREEN_MASK|n[2]&c.BLUE_MASK}function K(e,t,n){if(n.isRemote)throw"Image is loaded remotely. Cannot get x,y."
var r=t*n.width*4+4*e,i=n.imageData.data
return i[r+3]<<24&c.ALPHA_MASK|i[r]<<16&c.RED_MASK|i[r+1]<<8&c.GREEN_MASK|i[r+2]&c.BLUE_MASK}function W(e,t,n,r){var i=new Er(n,r,c.ARGB)
return i.fromImageData(xe.toImageData(e,t,n,r)),i}function Z(e,t,n,r,i){if(i.isRemote)throw"Image is loaded remotely. Cannot get x,y,w,h."
for(var s=new Er(n,r,c.ARGB),o=s.imageData.data,a=i.width,l=i.height,h=i.imageData.data,u=Math.max(0,-t),f=Math.max(0,-e),p=Math.min(r,l-t),m=Math.min(n,a-e),g=u;g<p;++g)for(var d=4*((t+g)*a+(e+f)),v=4*(g*n+f),y=f;y<m;++y)o[v++]=h[d++],o[v++]=h[d++],o[v++]=h[d++],o[v++]=h[d++]
return s.__isDirty=!0,s}function q(){un&&(Ae=Ze,un=!1,xe.updatePixels())}function Q(){function e(e,t){function n(){q(),Ae[t].apply(Ae,arguments)}e[t]=n}function t(e,t){function n(){return q(),Ae[t]}function r(e){q(),Ae[t]=e}xe.defineProperty(e,t,{get:n,set:r})}for(var n in Ae)"function"==typeof Ae[n]?e(this,n):t(this,n)}function J(){un||(xe.loadPixels(),null===hn&&(Ze=Ae,hn=new Q),un=!0,Ae=hn,qe=0)}function ee(e,t,n){e<xe.width&&e>=0&&t>=0&&t<xe.height&&(J(),xe.pixels.setPixel((0|e)+xe.width*(0|t),n),++qe>cn&&q())}function te(e,t,n,r){if(r.isRemote)throw"Image is loaded remotely. Cannot set x,y."
var i=xe.color.toArray(n),s=t*r.width*4+4*e,o=r.imageData.data
o[s]=i[0],o[s+1]=i[1],o[s+2]=i[2],o[s+3]=i[3]}function ne(e){return e instanceof String?e:"number"==typeof e?e===(0|e)?e.toString():xe.nf(e,0,3):null===e||e===t?"":e.toString()}function re(e,t,n,r){var i,s
e.indexOf("\n")<0?(i=[e],s=1):(i=e.split(/\r?\n/g),s=i.length)
var o=0
en===c.TOP?o=sn+on:en===c.CENTER?o=sn/2-(s-1)*an/2:en===c.BOTTOM&&(o=-(on+(s-1)*an))
for(var a=0;a<s;++a){var l=i[a]
we.text$line(l,t,n+o,r,Jt),o+=an}}function ie(e,t,n,r,i,s){if(0!==e.length&&0!==r&&0!==i&&!(rn>i)){for(var o=-1,a=0,l=0,h=[],u=0,f=e.length;u<f;u++){var p=e[u],m=" "===p,g=ln.measureTextWidth(p)
if("\n"!==p&&l+g<=r)m&&(o=u),l+=g
else{if(o+1===a){if(!(u>0))return
o=u}"\n"===p?(h.push({text:e.substring(a,u),width:l}),a=u+1):(h.push({text:e.substring(a,o+1),width:l}),a=o+1),l=0,u=a-1}}a<f&&h.push({text:e.substring(a),width:l})
var d=1,v=sn
Jt===c.CENTER?d=r/2:Jt===c.RIGHT&&(d=r)
var y=h.length,x=Math.min(y,Math.floor(i/an))
en===c.TOP?v=sn+on:en===c.CENTER?v=i/2-an*(x/2-1):en===c.BOTTOM&&(v=on+an)
var A,b,w
for(A=0;A<y&&(w=A*an,!(v+w>i-on));A++)b=h[A],we.text$line(b.text,t+d,n+v+w,s,Jt)}}function se(e){we="3D"===e?new sr:"2D"===e?new ir:new or
for(var t in or.prototype)or.prototype.hasOwnProperty(t)&&t.indexOf("$")<0&&(xe[t]=we[t])
we.$init()}function oe(e){return function(){return se("2D"),we[e].apply(this,arguments)}}function ae(e){var t=e.which||e.keyCode
switch(t){case 13:return 10
case 91:case 93:case 224:return 157
case 57392:return 17
case 46:return 127
case 45:return 155}return t}function le(e){var t=e.which||e.keyCode,n=e.shiftKey||e.ctrlKey||e.altKey||e.metaKey
switch(t){case 13:t=n?13:10
break
case 8:t=n?127:8}return new Char(t)}function he(e){return"function"==typeof e.preventDefault?e.preventDefault():"function"==typeof e.stopPropagation&&e.stopPropagation(),!1}function ue(){var e
for(e in fn)if(fn.hasOwnProperty(e))return void(xe.__keyPressed=!0)
xe.__keyPressed=!1}function ce(){xe.__keyPressed=!1,fn=[],pn=null}function fe(e,t){fn[e]=t,pn=null,xe.key=t,xe.keyCode=e,xe.keyPressed(),xe.keyCode=0,xe.keyTyped(),ue()}function pe(e){var t=ae(e)
if(t===c.DELETE)return void fe(t,new Char(127))
if(mn.indexOf(t)<0)return void(pn=t)
var n=new Char(c.CODED)
return xe.key=n,xe.keyCode=t,fn[t]=n,xe.keyPressed(),pn=null,ue(),he(e)}function me(e){if(null!==pn){var t=pn,n=le(e)
return fe(t,n),he(e)}}function ge(e){var n=ae(e),r=fn[n]
r!==t&&(xe.key=r,xe.keyCode=n,xe.keyReleased(),delete fn[n],ue())}if(!(this instanceof E))throw"called Processing constructor as if it were a function: missing 'new'."
var de={},ve=e===t&&n===t
if(de=ve?h.createElement("canvas"):"string"==typeof e?h.getElementById(e):e,!("getContext"in de))throw"called Processing constructor without passing canvas element reference or id."
var ye=[],xe=this
xe.Char=xe.Character=Char,ye=[],i.withCommonFunctions(xe),i.withMath(xe),i.withProxyFunctions(xe,P),i.withTouch(xe,de,x,S,h,c),s&&Object.keys(s).forEach(function(e){xe[e]=s[e]}),xe.externals={canvas:de,context:t,sketch:t,window:l},xe.name="Processing.js Instance",xe.use3DContext=!1,xe.focused=!1,xe.breakShape=!1,xe.glyphTable={},xe.pmouseX=0,xe.pmouseY=0,xe.mouseX=0,xe.mouseY=0,xe.mouseButton=0,xe.mouseScroll=0,xe.mouseClicked=t,xe.mouseDragged=t,xe.mouseMoved=t,xe.mousePressed=t,xe.mouseReleased=t,xe.mouseScrolled=t,xe.mouseOver=t,xe.mouseOut=t,xe.touchStart=t,xe.touchEnd=t,xe.touchMove=t,xe.touchCancel=t,xe.key=t,xe.keyCode=t,xe.keyPressed=u,xe.keyReleased=u,xe.keyTyped=u,xe.draw=t,xe.setup=t,xe.__mousePressed=!1,xe.__keyPressed=!1,xe.__frameRate=60,xe.frameCount=0,xe.width=100,xe.height=100
var Ae,be,we,Ee,Se,Pe,Ce,Me,Te,_e,Re,Le,Ie,De,Oe,Ne,Fe,ke,Be,$e,Ge,Ve,ze,Ue,He,Xe,Ye,je,Ke,We,Ze,qe,Qe,Je,et,tt,nt,rt,it,st,ot,at=!0,lt=[1,1,1,1],ht=4294967295,ut=!0,ct=!0,ft=[0,0,0,1],pt=4278190080,mt=!0,gt=1,dt=!1,vt=!1,yt=!0,xt=0,At=c.CORNER,bt=c.CENTER,wt=0,Et=0,St=0,Pt=c.NORMAL_MODE_AUTO,Ct=60,Mt=1e3/Ct,Tt=c.ARROW,_t=de.style.cursor,Rt=c.POLYGON,Lt=[],It=0,Dt=20,Ot=!1,Nt=-3355444,Ft=20,kt=255,Bt=255,$t=255,Gt=255,Vt=0,zt=0,Ut=c.RGB,Ht=null,Xt=null,Yt=Date.now(),jt=Yt,Kt=0,Wt={attributes:{},locations:{}},Zt={width:0,height:0},qt=c.IMAGE,Qt=!1,Jt=c.LEFT,en=c.BASELINE,tn=c.MODEL,nn="Arial",rn=12,sn=9,on=2,an=14,ln=PFont.get(nn,rn),hn=null,un=!1,cn=1e3,fn=[],pn=null,mn=[c.SHIFT,c.CONTROL,c.ALT,c.CAPSLK,c.PGUP,c.PGDN,c.END,c.HOME,c.LEFT,c.UP,c.RIGHT,c.DOWN,c.NUMLK,c.INSERT,c.F1,c.F2,c.F3,c.F4,c.F5,c.F6,c.F7,c.F8,c.F9,c.F10,c.F11,c.F12,c.META],gn=0,dn=0,vn=0,yn=[],xn=[],An=[],bn=new g(c.SINCOS_LENGTH),wn=new g(c.SINCOS_LENGTH),En=!1,Sn=!1,Pn=60*(Math.PI/180),Cn=xe.width/2,Mn=xe.height/2,Tn=Mn/Math.tan(Pn/2),_n=Tn/10,Rn=10*Tn,Ln=xe.width/xe.height,In=[],Dn=[],On=0,Nn=!1,Fn=!1,kn=!0,Bn=c.CORNER,$n=[],Gn=new g([.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,-.5,-.5,.5,.5,-.5,.5,.5,.5,.5,.5,.5,-.5,.5,.5,.5,.5,-.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5,-.5,-.5,.5,-.5,.5,-.5,-.5,.5,-.5,-.5,.5,-.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,.5,.5,.5,.5,.5,-.5,-.5,.5,-.5,-.5,.5,-.5,-.5,.5,.5,.5,.5,.5]),Vn=new g([.5,.5,.5,.5,-.5,.5,.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,-.5,-.5,.5,-.5,-.5,.5,.5,-.5,.5,.5,.5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,-.5,.5,.5,-.5,.5]),zn=new g([0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]),Un=new g([0,0,0,0,1,0,1,1,0,1,0,0]),Hn=new g([0,0,1,0,0,1,0,0,1,0,0,1]),Xn="varying vec4 vFrontColor;attribute vec3 aVertex;attribute vec4 aColor;uniform mat4 uView;uniform mat4 uProjection;uniform float uPointSize;void main(void) {  vFrontColor = aColor;  gl_PointSize = uPointSize;  gl_Position = uProjection * uView * vec4(aVertex, 1.0);}",Yn="#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vFrontColor;uniform bool uSmooth;void main(void){  if(uSmooth == true){    float dist = distance(gl_PointCoord, vec2(0.5));    if(dist > 0.5){      discard;    }  }  gl_FragColor = vFrontColor;}",jn="varying vec4 vFrontColor;attribute vec3 aVertex;attribute vec2 aTextureCoord;uniform vec4 uColor;uniform mat4 uModel;uniform mat4 uView;uniform mat4 uProjection;uniform float uPointSize;varying vec2 vTextureCoord;void main(void) {  gl_PointSize = uPointSize;  vFrontColor = uColor;  gl_Position = uProjection * uView * uModel * vec4(aVertex, 1.0);  vTextureCoord = aTextureCoord;}",Kn="#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vFrontColor;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform int uIsDrawingText;uniform bool uSmooth;void main(void){  if(uSmooth == true){    float dist = distance(gl_PointCoord, vec2(0.5));    if(dist > 0.5){      discard;    }  }  if(uIsDrawingText == 1){    float alpha = texture2D(uSampler, vTextureCoord).a;    gl_FragColor = vec4(vFrontColor.rgb * alpha, alpha);  }  else{    gl_FragColor = vFrontColor;  }}",Wn=/Windows/.test(a.userAgent),Zn="varying vec4 vFrontColor;attribute vec3 aVertex;attribute vec3 aNormal;attribute vec4 aColor;attribute vec2 aTexture;varying   vec2 vTexture;uniform vec4 uColor;uniform bool uUsingMat;uniform vec3 uSpecular;uniform vec3 uMaterialEmissive;uniform vec3 uMaterialAmbient;uniform vec3 uMaterialSpecular;uniform float uShininess;uniform mat4 uModel;uniform mat4 uView;uniform mat4 uProjection;uniform mat4 uNormalTransform;uniform int uLightCount;uniform vec3 uFalloff;struct Light {  int type;  vec3 color;  vec3 position;  vec3 direction;  float angle;  vec3 halfVector;  float concentration;};uniform Light uLights0;uniform Light uLights1;uniform Light uLights2;uniform Light uLights3;uniform Light uLights4;uniform Light uLights5;uniform Light uLights6;uniform Light uLights7;Light getLight(int index){  if(index == 0) return uLights0;  if(index == 1) return uLights1;  if(index == 2) return uLights2;  if(index == 3) return uLights3;  if(index == 4) return uLights4;  if(index == 5) return uLights5;  if(index == 6) return uLights6;  return uLights7;}void AmbientLight( inout vec3 totalAmbient, in vec3 ecPos, in Light light ) {  float d = length( light.position - ecPos );  float attenuation = 1.0 / ( uFalloff[0] + ( uFalloff[1] * d ) + ( uFalloff[2] * d * d ));  totalAmbient += light.color * attenuation;}void DirectionalLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in Light light ) {  float powerFactor = 0.0;  float nDotVP = max(0.0, dot( vertNormal, normalize(-light.position) ));  float nDotVH = max(0.0, dot( vertNormal, normalize(-light.position-normalize(ecPos) )));  if( nDotVP != 0.0 ){    powerFactor = pow( nDotVH, uShininess );  }  col += light.color * nDotVP;  spec += uSpecular * powerFactor;}void PointLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in Light light ) {  float powerFactor;   vec3 VP = light.position - ecPos;  float d = length( VP );   VP = normalize( VP );  float attenuation = 1.0 / ( uFalloff[0] + ( uFalloff[1] * d ) + ( uFalloff[2] * d * d ));  float nDotVP = max( 0.0, dot( vertNormal, VP ));  vec3 halfVector = normalize( VP - normalize(ecPos) );  float nDotHV = max( 0.0, dot( vertNormal, halfVector ));  if( nDotVP == 0.0 ) {    powerFactor = 0.0;  }  else {    powerFactor = pow( nDotHV, uShininess );  }  spec += uSpecular * powerFactor * attenuation;  col += light.color * nDotVP * attenuation;}void SpotLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in Light light ) {  float spotAttenuation;  float powerFactor = 0.0;  vec3 VP = light.position - ecPos;  vec3 ldir = normalize( -light.direction );  float d = length( VP );  VP = normalize( VP );  float attenuation = 1.0 / ( uFalloff[0] + ( uFalloff[1] * d ) + ( uFalloff[2] * d * d ) );  float spotDot = dot( VP, ldir );"+(Wn?"  spotAttenuation = 1.0; ":"  if( spotDot > cos( light.angle ) ) {    spotAttenuation = pow( spotDot, light.concentration );  }  else{    spotAttenuation = 0.0;  }  attenuation *= spotAttenuation;")+"  float nDotVP = max( 0.0, dot( vertNormal, VP ) );  vec3 halfVector = normalize( VP - normalize(ecPos) );  float nDotHV = max( 0.0, dot( vertNormal, halfVector ) );  if( nDotVP != 0.0 ) {    powerFactor = pow( nDotHV, uShininess );  }  spec += uSpecular * powerFactor * attenuation;  col += light.color * nDotVP * attenuation;}void main(void) {  vec3 finalAmbient = vec3( 0.0 );  vec3 finalDiffuse = vec3( 0.0 );  vec3 finalSpecular = vec3( 0.0 );  vec4 col = uColor;  if ( uColor[0] == -1.0 ){    col = aColor;  }  vec3 norm = normalize(vec3( uNormalTransform * vec4( aNormal, 0.0 ) ));  vec4 ecPos4 = uView * uModel * vec4(aVertex, 1.0);  vec3 ecPos = (vec3(ecPos4))/ecPos4.w;  if( uLightCount == 0 ) {    vFrontColor = col + vec4(uMaterialSpecular, 1.0);  }  else {    for( int i = 0; i < 8; i++ ) {      Light l = getLight(i);      if( i >= uLightCount ){        break;      }      if( l.type == 0 ) {        AmbientLight( finalAmbient, ecPos, l );      }      else if( l.type == 1 ) {        DirectionalLight( finalDiffuse, finalSpecular, norm, ecPos, l );      }      else if( l.type == 2 ) {        PointLight( finalDiffuse, finalSpecular, norm, ecPos, l );      }      else {        SpotLight( finalDiffuse, finalSpecular, norm, ecPos, l );      }    }   if( uUsingMat == false ) {     vFrontColor = vec4(       vec3( col ) * finalAmbient +       vec3( col ) * finalDiffuse +       vec3( col ) * finalSpecular,       col[3] );   }   else{     vFrontColor = vec4(        uMaterialEmissive +        (vec3(col) * uMaterialAmbient * finalAmbient ) +        (vec3(col) * finalDiffuse) +        (uMaterialSpecular * finalSpecular),        col[3] );    }  }  vTexture.xy = aTexture.xy;  gl_Position = uProjection * uView * uModel * vec4( aVertex, 1.0 );}",qn="#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vFrontColor;uniform sampler2D uSampler;uniform bool uUsingTexture;varying vec2 vTexture;void main(void){  if( uUsingTexture ){    gl_FragColor = vec4(texture2D(uSampler, vTexture.xy)) * vFrontColor;  }  else{    gl_FragColor = vFrontColor;  }}",Qn=function(e,t,n){var r=e.createShader(e.VERTEX_SHADER)
if(e.shaderSource(r,t),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw e.getShaderInfoLog(r)
var i=e.createShader(e.FRAGMENT_SHADER)
if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS))throw e.getShaderInfoLog(i)
var s=e.createProgram()
if(e.attachShader(s,r),e.attachShader(s,i),e.linkProgram(s),!e.getProgramParameter(s,e.LINK_STATUS))throw"Error linking shaders."
return s},Jn=function(e,t,n,r,i){return{x:e,y:t,w:n,h:r}},er=Jn,tr=function(e,t,n,r,i){return{x:e,y:t,w:i?n:n-e,h:i?r:r-t}},nr=function(e,t,n,r,i){return{x:e-n/2,y:t-r/2,w:n,h:r}},rr=function(){},ir=function(){},sr=function(){},or=function(){}
ir.prototype=new rr,ir.prototype.constructor=ir,sr.prototype=new rr,sr.prototype.constructor=sr,or.prototype=new rr,or.prototype.constructor=or,rr.prototype.a3DOnlyFunction=u,xe.shape=function(e,t,n,r,i){arguments.length>=1&&null!==arguments[0]&&e.isVisible()&&(xe.pushMatrix(),Bn===c.CENTER?5===arguments.length?(xe.translate(t-r/2,n-i/2),xe.scale(r/e.getWidth(),i/e.getHeight())):3===arguments.length?xe.translate(t-e.getWidth()/2,-e.getHeight()/2):xe.translate(-e.getWidth()/2,-e.getHeight()/2):Bn===c.CORNER?5===arguments.length?(xe.translate(t,n),xe.scale(r/e.getWidth(),i/e.getHeight())):3===arguments.length&&xe.translate(t,n):Bn===c.CORNERS&&(5===arguments.length?(r-=t,i-=n,xe.translate(t,n),xe.scale(r/e.getWidth(),i/e.getHeight())):3===arguments.length&&xe.translate(t,n)),e.draw(xe),(1===arguments.length&&Bn===c.CENTER||arguments.length>1)&&xe.popMatrix())},xe.shapeMode=function(e){Bn=e},xe.loadShape=function(e){return 1===arguments.length&&e.indexOf(".svg")>-1?new PShapeSVG(null,e):null},xe.loadXML=function(e){return new XML(xe,e)},xe.parseXML=function(e){var t=new XML
return t.parse(e),t}
var ar=function(e){for(var t=0,n=0;n<e.length;n++)t=0!==n?Math.max(t,Math.abs(e[n])):Math.abs(e[n])
var r=(t+"").indexOf(".")
return 0===r?r=1:r===-1&&(r=(t+"").length),r},lr=xe.PMatrix2D=function(){0===arguments.length?this.reset():1===arguments.length&&arguments[0]instanceof lr?this.set(arguments[0].array()):6===arguments.length&&this.set(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])}
lr.prototype={set:function(){if(6===arguments.length){var e=arguments
this.set([e[0],e[1],e[2],e[3],e[4],e[5]])}else 1===arguments.length&&arguments[0]instanceof lr?this.elements=arguments[0].array():1===arguments.length&&arguments[0]instanceof Array&&(this.elements=arguments[0].slice())},get:function(){var e=new lr
return e.set(this.elements),e},reset:function(){this.set([1,0,0,0,1,0])},array:function(){return this.elements.slice()},translate:function(e,t){this.elements[2]=e*this.elements[0]+t*this.elements[1]+this.elements[2],this.elements[5]=e*this.elements[3]+t*this.elements[4]+this.elements[5]},invTranslate:function(e,t){this.translate(-e,-t)},transpose:function(){},mult:function(e,t){var n,r
return e instanceof PVector?(n=e.x,r=e.y,t||(t=new PVector)):e instanceof Array&&(n=e[0],r=e[1],t||(t=[])),t instanceof Array?(t[0]=this.elements[0]*n+this.elements[1]*r+this.elements[2],t[1]=this.elements[3]*n+this.elements[4]*r+this.elements[5]):t instanceof PVector&&(t.x=this.elements[0]*n+this.elements[1]*r+this.elements[2],t.y=this.elements[3]*n+this.elements[4]*r+this.elements[5],t.z=0),t},multX:function(e,t){return e*this.elements[0]+t*this.elements[1]+this.elements[2]},multY:function(e,t){return e*this.elements[3]+t*this.elements[4]+this.elements[5]},skewX:function(e){this.apply(1,0,1,e,0,0)},skewY:function(e){this.apply(1,0,1,0,e,0)},shearX:function(e){this.apply(1,0,1,Math.tan(e),0,0)},shearY:function(e){this.apply(1,0,1,0,Math.tan(e),0)},determinant:function(){return this.elements[0]*this.elements[4]-this.elements[1]*this.elements[3]},invert:function(){var e=this.determinant()
if(Math.abs(e)>c.MIN_INT){var t=this.elements[0],n=this.elements[1],r=this.elements[2],i=this.elements[3],s=this.elements[4],o=this.elements[5]
return this.elements[0]=s/e,this.elements[3]=-i/e,this.elements[1]=-n/e,this.elements[4]=t/e,this.elements[2]=(n*o-s*r)/e,this.elements[5]=(i*r-t*o)/e,!0}return!1},scale:function(e,t){e&&!t&&(t=e),e&&t&&(this.elements[0]*=e,this.elements[1]*=t,this.elements[3]*=e,this.elements[4]*=t)},invScale:function(e,t){e&&!t&&(t=e),this.scale(1/e,1/t)},apply:function(){var e
1===arguments.length&&arguments[0]instanceof lr?e=arguments[0].array():6===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
for(var t=[0,0,this.elements[2],0,0,this.elements[5]],n=0,r=0;r<2;r++)for(var i=0;i<3;i++,n++)t[n]+=this.elements[3*r+0]*e[i+0]+this.elements[3*r+1]*e[i+3]
this.elements=t.slice()},preApply:function(){var e
1===arguments.length&&arguments[0]instanceof lr?e=arguments[0].array():6===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
var t=[0,0,e[2],0,0,e[5]]
t[2]=e[2]+this.elements[2]*e[0]+this.elements[5]*e[1],t[5]=e[5]+this.elements[2]*e[3]+this.elements[5]*e[4],t[0]=this.elements[0]*e[0]+this.elements[3]*e[1],t[3]=this.elements[0]*e[3]+this.elements[3]*e[4],t[1]=this.elements[1]*e[0]+this.elements[4]*e[1],t[4]=this.elements[1]*e[3]+this.elements[4]*e[4],this.elements=t.slice()},rotate:function(e){var t=Math.cos(e),n=Math.sin(e),r=this.elements[0],i=this.elements[1]
this.elements[0]=t*r+n*i,this.elements[1]=-n*r+t*i,r=this.elements[3],i=this.elements[4],this.elements[3]=t*r+n*i,this.elements[4]=-n*r+t*i},rotateZ:function(e){this.rotate(e)},invRotateZ:function(e){this.rotateZ(e-Math.PI)},print:function(){var e=ar(this.elements),t=""+xe.nfs(this.elements[0],e,4)+" "+xe.nfs(this.elements[1],e,4)+" "+xe.nfs(this.elements[2],e,4)+"\n"+xe.nfs(this.elements[3],e,4)+" "+xe.nfs(this.elements[4],e,4)+" "+xe.nfs(this.elements[5],e,4)+"\n\n"
xe.println(t)}}
var hr=xe.PMatrix3D=function(){this.reset()}
hr.prototype={set:function(){16===arguments.length?this.elements=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof hr?this.elements=arguments[0].array():1===arguments.length&&arguments[0]instanceof Array&&(this.elements=arguments[0].slice())},get:function(){var e=new hr
return e.set(this.elements),e},reset:function(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},array:function(){return this.elements.slice()},translate:function(e,n,r){r===t&&(r=0),this.elements[3]+=e*this.elements[0]+n*this.elements[1]+r*this.elements[2],this.elements[7]+=e*this.elements[4]+n*this.elements[5]+r*this.elements[6],this.elements[11]+=e*this.elements[8]+n*this.elements[9]+r*this.elements[10],this.elements[15]+=e*this.elements[12]+n*this.elements[13]+r*this.elements[14]},transpose:function(){var e=this.elements[4]
this.elements[4]=this.elements[1],this.elements[1]=e,e=this.elements[8],this.elements[8]=this.elements[2],this.elements[2]=e,e=this.elements[6],this.elements[6]=this.elements[9],this.elements[9]=e,e=this.elements[3],this.elements[3]=this.elements[12],this.elements[12]=e,e=this.elements[7],this.elements[7]=this.elements[13],this.elements[13]=e,e=this.elements[11],this.elements[11]=this.elements[14],this.elements[14]=e},mult:function(e,t){var n,r,i,s
return e instanceof PVector?(n=e.x,r=e.y,i=e.z,s=1,t||(t=new PVector)):e instanceof Array&&(n=e[0],r=e[1],i=e[2],s=e[3]||1,(!t||3!==t.length&&4!==t.length)&&(t=[0,0,0])),t instanceof Array&&(3===t.length?(t[0]=this.elements[0]*n+this.elements[1]*r+this.elements[2]*i+this.elements[3],t[1]=this.elements[4]*n+this.elements[5]*r+this.elements[6]*i+this.elements[7],t[2]=this.elements[8]*n+this.elements[9]*r+this.elements[10]*i+this.elements[11]):4===t.length&&(t[0]=this.elements[0]*n+this.elements[1]*r+this.elements[2]*i+this.elements[3]*s,t[1]=this.elements[4]*n+this.elements[5]*r+this.elements[6]*i+this.elements[7]*s,t[2]=this.elements[8]*n+this.elements[9]*r+this.elements[10]*i+this.elements[11]*s,t[3]=this.elements[12]*n+this.elements[13]*r+this.elements[14]*i+this.elements[15]*s)),t instanceof PVector&&(t.x=this.elements[0]*n+this.elements[1]*r+this.elements[2]*i+this.elements[3],t.y=this.elements[4]*n+this.elements[5]*r+this.elements[6]*i+this.elements[7],t.z=this.elements[8]*n+this.elements[9]*r+this.elements[10]*i+this.elements[11]),t},preApply:function(){var e
1===arguments.length&&arguments[0]instanceof hr?e=arguments[0].array():16===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
for(var t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0,r=0;r<4;r++)for(var i=0;i<4;i++,n++)t[n]+=this.elements[i+0]*e[4*r+0]+this.elements[i+4]*e[4*r+1]+this.elements[i+8]*e[4*r+2]+this.elements[i+12]*e[4*r+3]
this.elements=t.slice()},apply:function(){var e
1===arguments.length&&arguments[0]instanceof hr?e=arguments[0].array():16===arguments.length?e=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(e=arguments[0])
for(var t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0,r=0;r<4;r++)for(var i=0;i<4;i++,n++)t[n]+=this.elements[4*r+0]*e[i+0]+this.elements[4*r+1]*e[i+4]+this.elements[4*r+2]*e[i+8]+this.elements[4*r+3]*e[i+12]
this.elements=t.slice()},rotate:function(e,t,n,r){if(arguments.length<4)this.rotateZ(e)
else{var i=new PVector(t,n,r),s=i.mag()
if(0===s)return
1!=s&&(i.normalize(),t=i.x,n=i.y,r=i.z)
var o=xe.cos(e),a=xe.sin(e),l=1-o
this.apply(l*t*t+o,l*t*n-a*r,l*t*r+a*n,0,l*t*n+a*r,l*n*n+o,l*n*r-a*t,0,l*t*r-a*n,l*n*r+a*t,l*r*r+o,0,0,0,0,1)}},invApply:function(){st===t&&(st=new hr)
var e=arguments
return st.set(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]),!!st.invert()&&(this.preApply(st),!0)},rotateX:function(e){var t=xe.cos(e),n=xe.sin(e)
this.apply([1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1])},rotateY:function(e){var t=xe.cos(e),n=xe.sin(e)
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
return e+=this.elements[15]},print:function(){var e=ar(this.elements),t=""+xe.nfs(this.elements[0],e,4)+" "+xe.nfs(this.elements[1],e,4)+" "+xe.nfs(this.elements[2],e,4)+" "+xe.nfs(this.elements[3],e,4)+"\n"+xe.nfs(this.elements[4],e,4)+" "+xe.nfs(this.elements[5],e,4)+" "+xe.nfs(this.elements[6],e,4)+" "+xe.nfs(this.elements[7],e,4)+"\n"+xe.nfs(this.elements[8],e,4)+" "+xe.nfs(this.elements[9],e,4)+" "+xe.nfs(this.elements[10],e,4)+" "+xe.nfs(this.elements[11],e,4)+"\n"+xe.nfs(this.elements[12],e,4)+" "+xe.nfs(this.elements[13],e,4)+" "+xe.nfs(this.elements[14],e,4)+" "+xe.nfs(this.elements[15],e,4)+"\n\n"
xe.println(t)},invTranslate:function(e,t,n){this.preApply(1,0,0,-e,0,1,0,-t,0,0,1,-n,0,0,0,1)},invRotateX:function(e){var t=Math.cos(-e),n=Math.sin(-e)
this.preApply([1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1])},invRotateY:function(e){var t=Math.cos(-e),n=Math.sin(-e)
this.preApply([t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1])},invRotateZ:function(e){var t=Math.cos(-e),n=Math.sin(-e)
this.preApply([t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1])},invScale:function(e,t,n){this.preApply([1/e,0,0,0,0,1/t,0,0,0,0,1/n,0,0,0,0,1])}}
var ur=xe.PMatrixStack=function(){this.matrixStack=[]}
ur.prototype.load=function(){var e=we.$newPMatrix()
1===arguments.length?e.set(arguments[0]):e.set(arguments),this.matrixStack.push(e)},ir.prototype.$newPMatrix=function(){return new lr},sr.prototype.$newPMatrix=function(){return new hr},ur.prototype.push=function(){this.matrixStack.push(this.peek())},ur.prototype.pop=function(){return this.matrixStack.pop()},ur.prototype.peek=function(){var e=we.$newPMatrix()
return e.set(this.matrixStack[this.matrixStack.length-1]),e},ur.prototype.mult=function(e){this.matrixStack[this.matrixStack.length-1].apply(e)},xe.split=function(e,t){return e.split(t)},xe.splitTokens=function(e,n){if(n===t)return e.split(/\s+/g)
var r,i,s=n.split(/()/g),o="",a=e.length,l=[]
for(r=0;r<a;r++)i=e[r],s.indexOf(i)>-1?(""!==o&&l.push(o),o=""):o+=i
return""!==o&&l.push(o),l},xe.append=function(e,t){return e[e.length]=t,e},xe.concat=function(e,t){return e.concat(t)},xe.sort=function(e,t){var n=[]
if(e.length>0){for(var r=t>0?t:e.length,i=0;i<r;i++)n.push(e[i])
if("string"==typeof e[0]?n.sort():n.sort(function(e,t){return e-t}),t>0)for(var s=n.length;s<e.length;s++)n.push(e[s])}return n},xe.splice=function(e,t,n){if(0===t.length)return e
if(t instanceof Array)for(var r=0,i=n;r<t.length;i++,r++)e.splice(i,0,t[r])
else e.splice(n,0,t)
return e},xe.subset=function(e,n,r){var i=r!==t?n+r:e.length
return e.slice(n,i)},xe.join=function(e,t){return e.join(t)},xe.shorten=function(e){for(var t=[],n=e.length,r=0;r<n;r++)t[r]=e[r]
return t.pop(),t},xe.expand=function(e,t){var n=e.slice(0),r=t||2*e.length
return n.length=r,n},xe.arrayCopy=function(){var e,n,r,i=0,s=0
2===arguments.length?(e=arguments[0],n=arguments[1],r=e.length):3===arguments.length?(e=arguments[0],n=arguments[1],r=arguments[2]):5===arguments.length&&(e=arguments[0],i=arguments[1],n=arguments[2],s=arguments[3],r=arguments[4])
for(var o=i,a=s;o<r+i;o++,a++){if(n[a]===t)throw"array index out of bounds exception"
n[a]=e[o]}},xe.reverse=function(e){return e.reverse()},xe.mix=function(e,t,n){return e+((t-e)*n>>8)},xe.peg=function(e){return e<0?0:e>255?255:e},xe.modes=function(){function e(e,t,n,r,i,o,a,l,h,u,c){var f=s(((4278190080&e)>>>24)+t,255)<<24,p=n+((h-n)*t>>8)
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
return 0!==p&&(d=(255-u<<8)/p,d=255-(d<0?0:d>255?255:d)),e(s,a,l,h,u,c,f,p,m,g,d)}}}(),xe.color=function(e,n,r,i){return e!==t&&n!==t&&r!==t&&i!==t?L(e,n,r,i):e!==t&&n!==t&&r!==t?L(e,n,r,kt):e!==t&&n!==t?I(e,n):"number"==typeof e?D(e):L(Bt,$t,Gt,kt)},xe.color.toString=function(e){return"rgba("+((e&c.RED_MASK)>>>16)+","+((e&c.GREEN_MASK)>>>8)+","+(e&c.BLUE_MASK)+","+((e&c.ALPHA_MASK)>>>24)/255+")"},xe.color.toInt=function(e,t,n,r){return r<<24&c.ALPHA_MASK|e<<16&c.RED_MASK|t<<8&c.GREEN_MASK|n&c.BLUE_MASK},xe.color.toArray=function(e){return[(e&c.RED_MASK)>>>16,(e&c.GREEN_MASK)>>>8,e&c.BLUE_MASK,(e&c.ALPHA_MASK)>>>24]},xe.color.toGLArray=function(e){return[((e&c.RED_MASK)>>>16)/255,((e&c.GREEN_MASK)>>>8)/255,(e&c.BLUE_MASK)/255,((e&c.ALPHA_MASK)>>>24)/255]},xe.color.toRGB=function(e,t,n){e=e>Bt?Bt:e,t=t>$t?$t:t,n=n>Gt?Gt:n,e=e<0?0:e,e=e/Bt*360,t=t/$t*100,n=n/Gt*100
var r=Math.round(n/100*255)
if(0===t)return[r,r,r]
var i=e%360,s=i%60,o=Math.round(n*(100-t)/1e4*255),a=Math.round(n*(6e3-t*s)/6e5*255),l=Math.round(n*(6e3-t*(60-s))/6e5*255)
switch(Math.floor(i/60)){case 0:return[r,l,o]
case 1:return[a,r,o]
case 2:return[o,r,l]
case 3:return[o,a,r]
case 4:return[l,o,r]
case 5:return[r,o,a]
default:E.debug("Unexpectedly hit default case in toRGB function.")}},xe.brightness=function(e){return O(e)[2]},xe.saturation=function(e){return O(e)[1]},xe.hue=function(e){return O(e)[0]},xe.red=function(e){return((e&c.RED_MASK)>>>16)/255*Bt},xe.green=function(e){return((e&c.GREEN_MASK)>>>8)/255*$t},xe.blue=function(e){return(e&c.BLUE_MASK)/255*Gt},xe.alpha=function(e){return((e&c.ALPHA_MASK)>>>24)/255*kt},xe.lerpColor=function(e,t,n){var r,i,s,o,a,l,h,u,f,p,m,g,d,v,y,x,A,b=xe.color(e),w=xe.color(t)
return Ut===c.HSB?(d=O(b),u=((b&c.ALPHA_MASK)>>>24)/kt,v=O(w),g=((w&c.ALPHA_MASK)>>>24)/kt,x=xe.lerp(d[0],v[0],n),A=xe.lerp(d[1],v[1],n),s=xe.lerp(d[2],v[2],n),y=xe.color.toRGB(x,A,s),o=xe.lerp(u,g,n)*kt+.5|0,o<<24&c.ALPHA_MASK|y[0]<<16&c.RED_MASK|y[1]<<8&c.GREEN_MASK|y[2]&c.BLUE_MASK):(a=(b&c.RED_MASK)>>>16,l=(b&c.GREEN_MASK)>>>8,h=b&c.BLUE_MASK,u=((b&c.ALPHA_MASK)>>>24)/kt,f=(w&c.RED_MASK)>>>16,p=(w&c.GREEN_MASK)>>>8,m=w&c.BLUE_MASK,g=((w&c.ALPHA_MASK)>>>24)/kt,r=xe.lerp(a,f,n)+.5|0,i=xe.lerp(l,p,n)+.5|0,s=xe.lerp(h,m,n)+.5|0,o=xe.lerp(u,g,n)*kt+.5|0,o<<24&c.ALPHA_MASK|r<<16&c.RED_MASK|i<<8&c.GREEN_MASK|s&c.BLUE_MASK)},xe.colorMode=function(){Ut=arguments[0],arguments.length>1&&(Bt=arguments[1],$t=arguments[2]||arguments[1],Gt=arguments[3]||arguments[1],kt=arguments[4]||arguments[1])},xe.blendColor=function(e,t,n){return n===c.REPLACE?xe.modes.replace(e,t):n===c.BLEND?xe.modes.blend(e,t):n===c.ADD?xe.modes.add(e,t):n===c.SUBTRACT?xe.modes.subtract(e,t):n===c.LIGHTEST?xe.modes.lightest(e,t):n===c.DARKEST?xe.modes.darkest(e,t):n===c.DIFFERENCE?xe.modes.difference(e,t):n===c.EXCLUSION?xe.modes.exclusion(e,t):n===c.MULTIPLY?xe.modes.multiply(e,t):n===c.SCREEN?xe.modes.screen(e,t):n===c.HARD_LIGHT?xe.modes.hard_light(e,t):n===c.SOFT_LIGHT?xe.modes.soft_light(e,t):n===c.OVERLAY?xe.modes.overlay(e,t):n===c.DODGE?xe.modes.dodge(e,t):n===c.BURN?xe.modes.burn(e,t):void 0},xe.printMatrix=function(){tt.print()},ir.prototype.translate=function(e,t){tt.translate(e,t),nt.invTranslate(e,t),Ae.translate(e,t)},sr.prototype.translate=function(e,t,n){tt.translate(e,t,n),nt.invTranslate(e,t,n)},ir.prototype.scale=function(e,t){tt.scale(e,t),nt.invScale(e,t),Ae.scale(e,t||e)},sr.prototype.scale=function(e,t,n){tt.scale(e,t,n),nt.invScale(e,t,n)},ir.prototype.transform=function(e){var t=e.array()
Ae.transform(t[0],t[3],t[1],t[4],t[2],t[5])},sr.prototype.transformm=function(e){throw"p.transform is currently not supported in 3D mode"},ir.prototype.pushMatrix=function(){rt.load(tt),it.load(nt),N()},sr.prototype.pushMatrix=function(){rt.load(tt),it.load(nt)},ir.prototype.popMatrix=function(){tt.set(rt.pop()),nt.set(it.pop()),F()},sr.prototype.popMatrix=function(){tt.set(rt.pop()),nt.set(it.pop())},ir.prototype.resetMatrix=function(){tt.reset(),nt.reset(),Ae.setTransform(1,0,0,1,0,0)},sr.prototype.resetMatrix=function(){tt.reset(),nt.reset()},rr.prototype.applyMatrix=function(){var e=arguments
tt.apply(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]),nt.invApply(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15])},ir.prototype.applyMatrix=function(){for(var e=arguments,t=e.length;t<16;t++)e[t]=0
e[10]=e[15]=1,rr.prototype.applyMatrix.apply(this,e)},xe.rotateX=function(e){tt.rotateX(e),nt.invRotateX(e)},ir.prototype.rotateZ=function(){throw"rotateZ() is not supported in 2D mode. Use rotate(float) instead."},sr.prototype.rotateZ=function(e){tt.rotateZ(e),nt.invRotateZ(e)},xe.rotateY=function(e){tt.rotateY(e),nt.invRotateY(e)},ir.prototype.rotate=function(e){tt.rotateZ(e),nt.invRotateZ(e),Ae.rotate(e)},sr.prototype.rotate=function(e){arguments.length<4?xe.rotateZ(e):(tt.rotate(e,arguments[1],arguments[2],arguments[3]),nt.rotate(-e,arguments[1],arguments[2],arguments[3]))},ir.prototype.shearX=function(e){tt.shearX(e),Ae.transform(1,0,e,1,0,0)},sr.prototype.shearX=function(e){tt.shearX(e)},ir.prototype.shearY=function(e){tt.shearY(e),Ae.transform(1,e,0,1,0,0)},sr.prototype.shearY=function(e){tt.shearY(e)},xe.pushStyle=function(){N(),xe.pushMatrix()
var e={doFill:at,currentFillColor:ht,doStroke:ct,currentStrokeColor:pt,curTint:Ht,curRectMode:At,curColorMode:Ut,colorModeX:Bt,colorModeZ:Gt,colorModeY:$t,colorModeA:kt,curTextFont:ln,horizontalTextAlignment:Jt,verticalTextAlignment:en,textMode:tn,curFontName:nn,curTextSize:rn,curTextAscent:sn,curTextDescent:on,curTextLeading:an}
$n.push(e)},xe.popStyle=function(){var e=$n.pop()
if(!e)throw"Too many popStyle() without enough pushStyle()"
F(),xe.popMatrix(),at=e.doFill,ht=e.currentFillColor,ct=e.doStroke,pt=e.currentStrokeColor,Ht=e.curTint,At=e.curRectMode,Ut=e.curColorMode,Bt=e.colorModeX,Gt=e.colorModeZ,$t=e.colorModeY,kt=e.colorModeA,ln=e.curTextFont,nn=e.curFontName,rn=e.curTextSize,Jt=e.horizontalTextAlignment,en=e.verticalTextAlignment,tn=e.textMode,sn=e.curTextAscent,on=e.curTextDescent,an=e.curTextLeading},xe.year=function(){return(new Date).getFullYear()},xe.month=function(){return(new Date).getMonth()+1},xe.day=function(){return(new Date).getDate()},xe.hour=function(){return(new Date).getHours()},xe.minute=function(){return(new Date).getMinutes()},xe.second=function(){return(new Date).getSeconds()},xe.millis=function(){return Date.now()-Yt},ir.prototype.redraw=function(){k(),Ae.lineWidth=gt
var e=xe.pmouseX,t=xe.pmouseY
xe.pmouseX=Vt,xe.pmouseY=zt,N(),xe.draw(),F(),Vt=xe.mouseX,zt=xe.mouseY,xe.pmouseX=e,xe.pmouseY=t},sr.prototype.redraw=function(){k()
var e=xe.pmouseX,t=xe.pmouseY
xe.pmouseX=Vt,xe.pmouseY=zt,Ae.clear(Ae.DEPTH_BUFFER_BIT),Wt={attributes:{},locations:{}},xe.noLights(),xe.lightFalloff(1,0,0),xe.shininess(1),xe.ambient(255,255,255),xe.specular(0,0,0),xe.emissive(0,0,0),xe.camera(),xe.draw(),Vt=xe.mouseX,zt=xe.mouseY,xe.pmouseX=e,xe.pmouseY=t},xe.noLoop=function(){yt=!1,dt=!1,clearInterval(xt),be.onPause()},xe.loop=function(){dt||(jt=Date.now(),Kt=0,xt=l.setInterval(function(){try{be.onFrameStart(),xe.redraw(),be.onFrameEnd()}catch(e){throw l.clearInterval(xt),e}},Mt),yt=!0,dt=!0,be.onLoop())},xe.frameRate=function(e){Ct=e,Mt=1e3/Ct,yt&&(xe.noLoop(),xe.loop())},xe.exit=function(){l.clearInterval(xt),w(xe.externals.canvas.id),delete de.onmousedown
for(var e in E.lib)E.lib.hasOwnProperty(e)&&E.lib[e].hasOwnProperty("detach")&&E.lib[e].detach(xe)
for(var t=ye.length;t--;)A(ye[t])
be.onExit()},xe.cursor=function(){if(arguments.length>1||1===arguments.length&&arguments[0]instanceof xe.PImage){var e,t,n=arguments[0]
if(arguments.length>=3){if(e=arguments[1],t=arguments[2],e<0||t<0||t>=n.height||e>=n.width)throw"x and y must be non-negative and less than the dimensions of the image"}else e=n.width>>>1,t=n.height>>>1
var r=n.toDataURL(),i='url("'+r+'") '+e+" "+t+", default"
Tt=de.style.cursor=i}else if(1===arguments.length){var s=arguments[0]
Tt=de.style.cursor=s}else Tt=de.style.cursor=_t},xe.noCursor=function(){Tt=de.style.cursor=c.NOCURSOR},xe.link=function(e,n){n!==t?l.open(e,n):l.location=e},xe.beginDraw=u,xe.endDraw=u,ir.prototype.toImageData=function(e,n,r,i){return e=e!==t?e:0,n=n!==t?n:0,r=r!==t?r:xe.width,i=i!==t?i:xe.height,Ae.getImageData(e,n,r,i)},sr.prototype.toImageData=function(e,n,r,i){e=e!==t?e:0,n=n!==t?n:0,r=r!==t?r:xe.width,i=i!==t?i:xe.height
var s=h.createElement("canvas"),o=s.getContext("2d"),a=o.createImageData(r,i),l=new y(r*i*4)
Ae.readPixels(e,n,r,i,Ae.RGBA,Ae.UNSIGNED_BYTE,l)
for(var u=0,c=l.length,f=a.data;u<c;u++)f[u]=l[(i-1-Math.floor(u/4/r))*r*4+u%(4*r)]
return a},xe.status=function(e){l.status=e},xe.binary=function(e,t){var n
if(t>0)n=t
else if(e instanceof Char)n=16,e|=0
else for(n=32;n>1&&!(e>>>n-1&1);)n--
for(var r="";n>0;)r+=e>>>--n&1?"1":"0"
return r},xe.unbinary=function(e){for(var t=e.length-1,n=1,r=0;t>=0;){var i=e[t--]
if("0"!==i&&"1"!==i)throw"the value passed into unbinary was not an 8 bit binary number"
"1"===i&&(r+=n),n<<=1}return r}
var cr=function(e,n){n=n===t||null===n?n=8:n,e<0&&(e=4294967295+e+1)
for(var r=Number(e).toString(16).toUpperCase();r.length<n;)r="0"+r
return r.length>=n&&(r=r.substring(r.length-n,r.length)),r}
xe.hex=function(e,t){return 1===arguments.length&&(t=e instanceof Char?4:8),cr(e,t)},xe.unhex=function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(B(e[n]))
return t}return B(e)},xe.loadStrings=function(e){if(f[e])return f[e].split("\n")
var t=o(e)
return"string"!=typeof t||""===t?[]:(t=t.replace(/(\r\n?)/g,"\n").replace(/\n$/,""),t.split("\n"))},xe.saveStrings=function(e,t){f[e]=t.join("\n")},xe.loadBytes=function(e){for(var t=o(e),n=[],r=0;r<t.length;r++)n.push(t.charCodeAt(r))
return n},xe.matchAll=function(e,t){for(var n,r=[],i=new RegExp(t,"g");null!==(n=i.exec(e));)r.push(n),0===n[0].length&&++i.lastIndex
return r.length>0?r:null},xe.match=function(e,t){return e.match(t)}
xe.println=function(){E.logger.println.apply(E.logger,arguments)},xe.print=function(){E.logger.print.apply(E.logger,arguments)},xe.str=function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(e[n].toString()+"")
return t}return e.toString()+""},xe.parseBoolean=function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push($(e[n]))
return t}return $(e)},xe.parseByte=function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(0-(128&e[n])|127&e[n])
return t}return 0-(128&e)|127&e},xe.parseChar=function(e){if("number"==typeof e)return new Char(String.fromCharCode(65535&e))
if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(new Char(String.fromCharCode(65535&e[n])))
return t}throw"char() may receive only one argument of type int, byte, int[], or byte[]."},xe.parseFloat=function(e){if(e instanceof Array){for(var t=[],n=0;n<e.length;n++)t.push(G(e[n]))
return t}return G(e)},xe.parseInt=function(e,t){if(e instanceof Array){for(var n=[],r=0;r<e.length;r++)"string"!=typeof e[r]||/^\s*[+\-]?\d+\s*$/.test(e[r])?n.push(V(e[r],t)):n.push(0)
return n}return V(e,t)},xe.__int_cast=function(e){return 0|e},xe.__instanceof=function(e,t){if("function"!=typeof t)throw"Function is expected as type argument for instanceof operator"
if("string"==typeof e)return t===Object||t===String
if(e instanceof t)return!0
if("object"!=typeof e||null===e)return!1
var n=e.constructor
if(t.$isInterface){for(var r=[];n;)n.$interfaces&&(r=r.concat(n.$interfaces)),n=n.$base
for(;r.length>0;){var i=r.shift()
if(i===t)return!0
i.$interfaces&&(r=r.concat(i.$interfaces))}return!1}for(;n.hasOwnProperty("$base");)if(n=n.$base,n===t)return!0
return!1},rr.prototype.size=function(e,t,n){ct&&xe.stroke(0),at&&xe.fill(255)
var r={fillStyle:Ae.fillStyle,strokeStyle:Ae.strokeStyle,lineCap:Ae.lineCap,lineJoin:Ae.lineJoin}
de.style.length>0&&(de.style.removeProperty("width"),de.style.removeProperty("height")),de.width=xe.width=e||100,de.height=xe.height=t||100
for(var i in r)r.hasOwnProperty(i)&&(Ae[i]=r[i])
xe.textFont(ln),xe.background(),cn=Math.max(1e3,e*t*.05),xe.externals.context=Ae
for(var s=0;s<c.SINCOS_LENGTH;s++)bn[s]=xe.sin(s*(c.PI/180)*.5),wn[s]=xe.cos(s*(c.PI/180)*.5)},ir.prototype.size=function(e,n,r){Ae===t&&(Ae=de.getContext("2d"),rt=new ur,it=new ur,tt=new lr,nt=new lr),rr.prototype.size.apply(this,arguments)},sr.prototype.size=function(){var e=!1
return function(t,n,r){function i(e){for(var t,n=["experimental-webgl","webgl","webkit-3d"],r=0,i=n.length;r<i&&!(t=e.getContext(n[r],{antialias:!1,preserveDrawingBuffer:!0}));r++);return t}if(e)throw"Multiple calls to size() for 3D renders are not allowed."
e=!0
try{de.width=xe.width=t||100,de.height=xe.height=n||100,Ae=i(de),Xe=Ae.createTexture(),Ye=Ae.createTexture()}catch(e){E.debug(e)}if(!Ae)throw"WebGL context is not supported on this browser."
Ae.viewport(0,0,de.width,de.height),Ae.enable(Ae.DEPTH_TEST),Ae.enable(Ae.BLEND),Ae.blendFunc(Ae.SRC_ALPHA,Ae.ONE_MINUS_SRC_ALPHA),Le=Qn(Ae,jn,Kn),Ie=Qn(Ae,Xn,Yn),xe.strokeWeight(1),Re=Qn(Ae,Zn,qn),Ae.useProgram(Re),M("usingTexture3d",Re,"usingTexture",Qt),xe.lightFalloff(1,0,0),xe.shininess(1),xe.ambient(255,255,255),xe.specular(0,0,0),xe.emissive(0,0,0),De=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,De),Ae.bufferData(Ae.ARRAY_BUFFER,Gn,Ae.STATIC_DRAW),Oe=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Oe),Ae.bufferData(Ae.ARRAY_BUFFER,zn,Ae.STATIC_DRAW),Ne=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Ne),Ae.bufferData(Ae.ARRAY_BUFFER,Vn,Ae.STATIC_DRAW),Fe=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Fe),Ae.bufferData(Ae.ARRAY_BUFFER,Un,Ae.STATIC_DRAW),ke=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,ke),Ae.bufferData(Ae.ARRAY_BUFFER,Hn,Ae.STATIC_DRAW),Be=Ae.createBuffer(),$e=Ae.createBuffer(),Ge=Ae.createBuffer(),Ve=Ae.createBuffer(),ze=Ae.createBuffer(),He=Ae.createBuffer(),Ue=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Ue),Ae.bufferData(Ae.ARRAY_BUFFER,new g([0,0,0]),Ae.STATIC_DRAW),je=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,je),Ae.bufferData(Ae.ARRAY_BUFFER,new g([1,1,0,-1,1,0,-1,-1,0,1,-1,0]),Ae.STATIC_DRAW),Ke=Ae.createBuffer(),Ae.bindBuffer(Ae.ARRAY_BUFFER,Ke),Ae.bufferData(Ae.ARRAY_BUFFER,new g([0,0,1,0,1,1,0,1]),Ae.STATIC_DRAW),We=Ae.createBuffer(),Ae.bindBuffer(Ae.ELEMENT_ARRAY_BUFFER,We),Ae.bufferData(Ae.ELEMENT_ARRAY_BUFFER,new v([0,1,2,2,3,0]),Ae.STATIC_DRAW),Je=new hr,et=new hr,tt=new hr,nt=new hr,ot=new hr,xe.camera(),xe.perspective(),rt=new ur,it=new ur,Se=new hr,Pe=new hr,Ce=new hr,Me=new hr,Te=new hr,_e=new hr,_e.set(-1,3,-3,1,3,-6,3,0,-3,3,0,0,1,0,0,0),rr.prototype.size.apply(this,arguments)}}(),ir.prototype.ambientLight=rr.prototype.a3DOnlyFunction,sr.prototype.ambientLight=function(e,t,n,r,i,s){if(gn===c.MAX_LIGHTS)throw"can only create "+c.MAX_LIGHTS+" lights"
var o=new PVector(r,i,s),a=new hr
a.scale(1,-1,1),a.apply(tt.array()),a.mult(o,o)
var l=L(e,t,n,0),h=[((l&c.RED_MASK)>>>16)/255,((l&c.GREEN_MASK)>>>8)/255,(l&c.BLUE_MASK)/255]
Ae.useProgram(Re),C("uLights.color.3d."+gn,Re,"uLights"+gn+".color",h),C("uLights.position.3d."+gn,Re,"uLights"+gn+".position",o.array()),M("uLights.type.3d."+gn,Re,"uLights"+gn+".type",0),M("uLightCount3d",Re,"uLightCount",++gn)},ir.prototype.directionalLight=rr.prototype.a3DOnlyFunction,sr.prototype.directionalLight=function(e,t,n,r,i,s){if(gn===c.MAX_LIGHTS)throw"can only create "+c.MAX_LIGHTS+" lights"
Ae.useProgram(Re)
var o=new hr
o.scale(1,-1,1),o.apply(tt.array()),o=o.array()
var a=[o[0]*r+o[4]*i+o[8]*s,o[1]*r+o[5]*i+o[9]*s,o[2]*r+o[6]*i+o[10]*s],l=L(e,t,n,0),h=[((l&c.RED_MASK)>>>16)/255,((l&c.GREEN_MASK)>>>8)/255,(l&c.BLUE_MASK)/255]
C("uLights.color.3d."+gn,Re,"uLights"+gn+".color",h),C("uLights.position.3d."+gn,Re,"uLights"+gn+".position",a),M("uLights.type.3d."+gn,Re,"uLights"+gn+".type",1),M("uLightCount3d",Re,"uLightCount",++gn)},ir.prototype.lightFalloff=rr.prototype.a3DOnlyFunction,sr.prototype.lightFalloff=function(e,t,n){Ae.useProgram(Re),C("uFalloff3d",Re,"uFalloff",[e,t,n])},ir.prototype.lightSpecular=rr.prototype.a3DOnlyFunction,sr.prototype.lightSpecular=function(e,t,n){var r=L(e,t,n,0),i=[((r&c.RED_MASK)>>>16)/255,((r&c.GREEN_MASK)>>>8)/255,(r&c.BLUE_MASK)/255]
Ae.useProgram(Re),C("uSpecular3d",Re,"uSpecular",i)},xe.lights=function(){xe.ambientLight(128,128,128),xe.directionalLight(128,128,128,0,0,-1),xe.lightFalloff(1,0,0),xe.lightSpecular(0,0,0)},ir.prototype.pointLight=rr.prototype.a3DOnlyFunction,sr.prototype.pointLight=function(e,t,n,r,i,s){if(gn===c.MAX_LIGHTS)throw"can only create "+c.MAX_LIGHTS+" lights"
var o=new PVector(r,i,s),a=new hr
a.scale(1,-1,1),a.apply(tt.array()),a.mult(o,o)
var l=L(e,t,n,0),h=[((l&c.RED_MASK)>>>16)/255,((l&c.GREEN_MASK)>>>8)/255,(l&c.BLUE_MASK)/255]
Ae.useProgram(Re),C("uLights.color.3d."+gn,Re,"uLights"+gn+".color",h),C("uLights.position.3d."+gn,Re,"uLights"+gn+".position",o.array()),M("uLights.type.3d."+gn,Re,"uLights"+gn+".type",2),M("uLightCount3d",Re,"uLightCount",++gn)},ir.prototype.noLights=rr.prototype.a3DOnlyFunction,sr.prototype.noLights=function(){gn=0,Ae.useProgram(Re),M("uLightCount3d",Re,"uLightCount",gn)},ir.prototype.spotLight=rr.prototype.a3DOnlyFunction,sr.prototype.spotLight=function(e,t,n,r,i,s,o,a,l,h,u){if(gn===c.MAX_LIGHTS)throw"can only create "+c.MAX_LIGHTS+" lights"
Ae.useProgram(Re)
var f=new PVector(r,i,s),p=new hr
p.scale(1,-1,1),p.apply(tt.array()),p.mult(f,f),p=p.array()
var m=[p[0]*o+p[4]*a+p[8]*l,p[1]*o+p[5]*a+p[9]*l,p[2]*o+p[6]*a+p[10]*l],g=L(e,t,n,0),d=[((g&c.RED_MASK)>>>16)/255,((g&c.GREEN_MASK)>>>8)/255,(g&c.BLUE_MASK)/255]
C("uLights.color.3d."+gn,Re,"uLights"+gn+".color",d),C("uLights.position.3d."+gn,Re,"uLights"+gn+".position",f.array()),C("uLights.direction.3d."+gn,Re,"uLights"+gn+".direction",m),C("uLights.concentration.3d."+gn,Re,"uLights"+gn+".concentration",u),C("uLights.angle.3d."+gn,Re,"uLights"+gn+".angle",h),M("uLights.type.3d."+gn,Re,"uLights"+gn+".type",3),M("uLightCount3d",Re,"uLightCount",++gn)},ir.prototype.beginCamera=function(){throw"beginCamera() is not available in 2D mode"},sr.prototype.beginCamera=function(){if(En)throw"You cannot call beginCamera() again before calling endCamera()"
En=!0,tt=et,nt=Je},ir.prototype.endCamera=function(){throw"endCamera() is not available in 2D mode"},sr.prototype.endCamera=function(){if(!En)throw"You cannot call endCamera() before calling beginCamera()"
tt.set(Je),nt.set(et),En=!1},xe.camera=function(e,n,r,i,s,o,a,l,h){e===t&&(Cn=xe.width/2,Mn=xe.height/2,Tn=Mn/Math.tan(Pn/2),e=Cn,n=Mn,r=Tn,i=Cn,s=Mn,o=0,a=0,l=1,h=0)
var u=new PVector(e-i,n-s,r-o),c=new PVector(a,l,h)
u.normalize()
var f=PVector.cross(c,u)
c=PVector.cross(u,f),f.normalize(),c.normalize()
var p=f.x,m=f.y,g=f.z,d=c.x,v=c.y,y=c.z,x=u.x,A=u.y,b=u.z
Je.set(p,m,g,0,d,v,y,0,x,A,b,0,0,0,0,1),Je.translate(-e,-n,-r),et.reset(),et.invApply(p,m,g,0,d,v,y,0,x,A,b,0,0,0,0,1),et.translate(e,n,r),tt.set(Je),nt.set(et)},xe.perspective=function(e,t,n,r){0===arguments.length&&(Mn=de.height/2,Tn=Mn/Math.tan(Pn/2),_n=Tn/10,Rn=10*Tn,Ln=xe.width/xe.height,e=Pn,t=Ln,n=_n,r=Rn)
var i,s,o,a
i=n*Math.tan(e/2),s=-i,o=i*t,a=s*t,xe.frustum(a,o,s,i,n,r)},ir.prototype.frustum=function(){throw"Processing.js: frustum() is not supported in 2D mode"},sr.prototype.frustum=function(e,t,n,r,i,s){Sn=!0,ot=new hr,ot.set(2*i/(t-e),0,(t+e)/(t-e),0,0,2*i/(r-n),(r+n)/(r-n),0,0,0,-(s+i)/(s-i),-(2*s*i)/(s-i),0,0,-1,0)
var o=new hr
o.set(ot),o.transpose(),Ae.useProgram(Le),T("projection2d",Le,"uProjection",!1,o.array()),Ae.useProgram(Re),T("projection3d",Re,"uProjection",!1,o.array()),Ae.useProgram(Ie),T("uProjectionUS",Ie,"uProjection",!1,o.array())},xe.ortho=function(e,t,n,r,i,s){0===arguments.length&&(e=0,t=xe.width,n=0,r=xe.height,i=-10,s=10)
var o=2/(t-e),a=2/(r-n),l=-2/(s-i),h=-(t+e)/(t-e),u=-(r+n)/(r-n),c=-(s+i)/(s-i)
ot=new hr,ot.set(o,0,0,h,0,a,0,u,0,0,l,c,0,0,0,1)
var f=new hr
f.set(ot),f.transpose(),Ae.useProgram(Le),T("projection2d",Le,"uProjection",!1,f.array()),Ae.useProgram(Re),T("projection3d",Re,"uProjection",!1,f.array()),Ae.useProgram(Ie),T("uProjectionUS",Ie,"uProjection",!1,f.array()),Sn=!1},xe.printProjection=function(){ot.print()},xe.printCamera=function(){Je.print()},ir.prototype.box=rr.prototype.a3DOnlyFunction,sr.prototype.box=function(e,t,n){t&&n||(t=n=e)
var r=new hr
r.scale(e,t,n)
var i=new hr
if(i.scale(1,-1,1),i.apply(tt.array()),i.transpose(),at){if(Ae.useProgram(Re),T("model3d",Re,"uModel",!1,r.array()),T("view3d",Re,"uView",!1,i.array()),Ae.enable(Ae.POLYGON_OFFSET_FILL),Ae.polygonOffset(1,1),C("color3d",Re,"uColor",lt),gn>0){var s=new hr
s.set(i)
var o=new hr
o.set(r),s.mult(o)
var a=new hr
a.set(s),a.invert(),a.transpose(),T("uNormalTransform3d",Re,"uNormalTransform",!1,a.array()),_("aNormal3d",Re,"aNormal",3,Oe)}else R("aNormal3d",Re,"aNormal")
_("aVertex3d",Re,"aVertex",3,De),R("aColor3d",Re,"aColor"),R("aTexture3d",Re,"aTexture"),Ae.drawArrays(Ae.TRIANGLES,0,Gn.length/3),Ae.disable(Ae.POLYGON_OFFSET_FILL)}gt>0&&ct&&(Ae.useProgram(Le),T("uModel2d",Le,"uModel",!1,r.array()),T("uView2d",Le,"uView",!1,i.array()),C("uColor2d",Le,"uColor",ft),M("uIsDrawingText2d",Le,"uIsDrawingText",!1),_("vertex2d",Le,"aVertex",3,Ne),R("aTextureCoord2d",Le,"aTextureCoord"),Ae.drawArrays(Ae.LINES,0,Vn.length/3))}
var fr=function(){var e
for(Qe=[],e=0;e<vn;e++)Qe.push(0),Qe.push(-1),Qe.push(0),Qe.push(yn[e]),Qe.push(xn[e]),Qe.push(An[e])
Qe.push(0),Qe.push(-1),Qe.push(0),Qe.push(yn[0]),Qe.push(xn[0]),Qe.push(An[0])
var t,n,r,i=0
for(e=2;e<dn;e++){t=n=i,i+=vn,r=i
for(var s=0;s<vn;s++)Qe.push(yn[t]),Qe.push(xn[t]),Qe.push(An[t++]),Qe.push(yn[r]),Qe.push(xn[r]),Qe.push(An[r++])
t=n,r=i,Qe.push(yn[t]),Qe.push(xn[t]),Qe.push(An[t]),Qe.push(yn[r]),Qe.push(xn[r]),Qe.push(An[r])}for(e=0;e<vn;e++)r=i+e,Qe.push(yn[r]),Qe.push(xn[r]),Qe.push(An[r]),Qe.push(0),Qe.push(1),Qe.push(0)
Qe.push(yn[i]),Qe.push(xn[i]),Qe.push(An[i]),Qe.push(0),Qe.push(1),Qe.push(0),Ae.bindBuffer(Ae.ARRAY_BUFFER,Be),Ae.bufferData(Ae.ARRAY_BUFFER,new g(Qe),Ae.STATIC_DRAW)}
xe.sphereDetail=function(e,t){var n
if(1===arguments.length&&(e=t=arguments[0]),e<3&&(e=3),t<2&&(t=2),e!==vn||t!==dn){var r=c.SINCOS_LENGTH/e,i=new g(e),s=new g(e)
for(n=0;n<e;n++)i[n]=wn[n*r%c.SINCOS_LENGTH|0],s[n]=bn[n*r%c.SINCOS_LENGTH|0]
var o=e*(t-1)+2,a=0
yn=new g(o),xn=new g(o),An=new g(o)
var l=.5*c.SINCOS_LENGTH/t,h=l
for(n=1;n<t;n++){for(var u=bn[h%c.SINCOS_LENGTH|0],f=-wn[h%c.SINCOS_LENGTH|0],p=0;p<e;p++)yn[a]=i[p]*u,xn[a]=f,An[a++]=s[p]*u
h+=l}vn=e,dn=t,fr()}},ir.prototype.sphere=rr.prototype.a3DOnlyFunction,sr.prototype.sphere=function(){var e=arguments[0];(vn<3||dn<2)&&xe.sphereDetail(30)
var t=new hr
t.scale(e,e,e)
var n=new hr
if(n.scale(1,-1,1),n.apply(tt.array()),n.transpose(),at){if(gn>0){var r=new hr
r.set(n)
var i=new hr
i.set(t),r.mult(i)
var s=new hr
s.set(r),s.invert(),s.transpose(),T("uNormalTransform3d",Re,"uNormalTransform",!1,s.array()),_("aNormal3d",Re,"aNormal",3,Be)}else R("aNormal3d",Re,"aNormal")
Ae.useProgram(Re),R("aTexture3d",Re,"aTexture"),T("uModel3d",Re,"uModel",!1,t.array()),T("uView3d",Re,"uView",!1,n.array()),_("aVertex3d",Re,"aVertex",3,Be),R("aColor3d",Re,"aColor"),Ae.enable(Ae.POLYGON_OFFSET_FILL),Ae.polygonOffset(1,1),C("uColor3d",Re,"uColor",lt),Ae.drawArrays(Ae.TRIANGLE_STRIP,0,Qe.length/3),Ae.disable(Ae.POLYGON_OFFSET_FILL)}gt>0&&ct&&(Ae.useProgram(Le),T("uModel2d",Le,"uModel",!1,t.array()),T("uView2d",Le,"uView",!1,n.array()),_("aVertex2d",Le,"aVertex",3,Be),R("aTextureCoord2d",Le,"aTextureCoord"),C("uColor2d",Le,"uColor",ft),M("uIsDrawingText",Le,"uIsDrawingText",!1),Ae.drawArrays(Ae.LINE_STRIP,0,Qe.length/3))},xe.modelX=function(e,t,n){var r=tt.array(),i=et.array(),s=r[0]*e+r[1]*t+r[2]*n+r[3],o=r[4]*e+r[5]*t+r[6]*n+r[7],a=r[8]*e+r[9]*t+r[10]*n+r[11],l=r[12]*e+r[13]*t+r[14]*n+r[15],h=i[0]*s+i[1]*o+i[2]*a+i[3]*l,u=i[12]*s+i[13]*o+i[14]*a+i[15]*l
return 0!==u?h/u:h},xe.modelY=function(e,t,n){var r=tt.array(),i=et.array(),s=r[0]*e+r[1]*t+r[2]*n+r[3],o=r[4]*e+r[5]*t+r[6]*n+r[7],a=r[8]*e+r[9]*t+r[10]*n+r[11],l=r[12]*e+r[13]*t+r[14]*n+r[15],h=i[4]*s+i[5]*o+i[6]*a+i[7]*l,u=i[12]*s+i[13]*o+i[14]*a+i[15]*l
return 0!==u?h/u:h},xe.modelZ=function(e,t,n){var r=tt.array(),i=et.array(),s=r[0]*e+r[1]*t+r[2]*n+r[3],o=r[4]*e+r[5]*t+r[6]*n+r[7],a=r[8]*e+r[9]*t+r[10]*n+r[11],l=r[12]*e+r[13]*t+r[14]*n+r[15],h=i[8]*s+i[9]*o+i[10]*a+i[11]*l,u=i[12]*s+i[13]*o+i[14]*a+i[15]*l
return 0!==u?h/u:h},ir.prototype.ambient=rr.prototype.a3DOnlyFunction,sr.prototype.ambient=function(e,t,n){Ae.useProgram(Re),M("uUsingMat3d",Re,"uUsingMat",!0)
var r=xe.color(e,t,n)
C("uMaterialAmbient3d",Re,"uMaterialAmbient",xe.color.toGLArray(r).slice(0,3))},ir.prototype.emissive=rr.prototype.a3DOnlyFunction,sr.prototype.emissive=function(e,t,n){Ae.useProgram(Re),M("uUsingMat3d",Re,"uUsingMat",!0)
var r=xe.color(e,t,n)
C("uMaterialEmissive3d",Re,"uMaterialEmissive",xe.color.toGLArray(r).slice(0,3))},ir.prototype.shininess=rr.prototype.a3DOnlyFunction,sr.prototype.shininess=function(e){Ae.useProgram(Re),M("uUsingMat3d",Re,"uUsingMat",!0),C("uShininess3d",Re,"uShininess",e)},ir.prototype.specular=rr.prototype.a3DOnlyFunction,sr.prototype.specular=function(e,t,n){Ae.useProgram(Re),M("uUsingMat3d",Re,"uUsingMat",!0)
var r=xe.color(e,t,n)
C("uMaterialSpecular3d",Re,"uMaterialSpecular",xe.color.toGLArray(r).slice(0,3))},xe.screenX=function(e,t,n){var r=tt.array()
if(16===r.length){var i=r[0]*e+r[1]*t+r[2]*n+r[3],s=r[4]*e+r[5]*t+r[6]*n+r[7],o=r[8]*e+r[9]*t+r[10]*n+r[11],a=r[12]*e+r[13]*t+r[14]*n+r[15],l=ot.array(),h=l[0]*i+l[1]*s+l[2]*o+l[3]*a,u=l[12]*i+l[13]*s+l[14]*o+l[15]*a
return 0!==u&&(h/=u),xe.width*(1+h)/2}return tt.multX(e,t)},xe.screenY=function(e,t,n){var r=tt.array()
if(16===r.length){var i=r[0]*e+r[1]*t+r[2]*n+r[3],s=r[4]*e+r[5]*t+r[6]*n+r[7],o=r[8]*e+r[9]*t+r[10]*n+r[11],a=r[12]*e+r[13]*t+r[14]*n+r[15],l=ot.array(),h=l[4]*i+l[5]*s+l[6]*o+l[7]*a,u=l[12]*i+l[13]*s+l[14]*o+l[15]*a
return 0!==u&&(h/=u),xe.height*(1+h)/2}return tt.multY(e,t)},xe.screenZ=function(e,t,n){var r=tt.array()
if(16!==r.length)return 0
var i=ot.array(),s=r[0]*e+r[1]*t+r[2]*n+r[3],o=r[4]*e+r[5]*t+r[6]*n+r[7],a=r[8]*e+r[9]*t+r[10]*n+r[11],l=r[12]*e+r[13]*t+r[14]*n+r[15],h=i[8]*s+i[9]*o+i[10]*a+i[11]*l,u=i[12]*s+i[13]*o+i[14]*a+i[15]*l
return 0!==u&&(h/=u),(h+1)/2},rr.prototype.fill=function(){var e=xe.color.apply(this,arguments)
e===ht&&at||(at=!0,ht=e)},ir.prototype.fill=function(){rr.prototype.fill.apply(this,arguments),ut=!0},sr.prototype.fill=function(){rr.prototype.fill.apply(this,arguments),lt=xe.color.toGLArray(ht)},xe.noFill=function(){at=!1},rr.prototype.stroke=function(){var e=xe.color.apply(this,arguments)
e===pt&&ct||(ct=!0,pt=e)},ir.prototype.stroke=function(){rr.prototype.stroke.apply(this,arguments),mt=!0},sr.prototype.stroke=function(){rr.prototype.stroke.apply(this,arguments),ft=xe.color.toGLArray(pt)},xe.noStroke=function(){ct=!1},rr.prototype.strokeWeight=function(e){gt=e},ir.prototype.strokeWeight=function(e){rr.prototype.strokeWeight.apply(this,arguments),Ae.lineWidth=e},sr.prototype.strokeWeight=function(e){rr.prototype.strokeWeight.apply(this,arguments),Ae.useProgram(Le),C("pointSize2d",Le,"uPointSize",e),Ae.useProgram(Ie),C("pointSizeUnlitShape",Ie,"uPointSize",e),Ae.lineWidth(e)},xe.strokeCap=function(e){we.$ensureContext().lineCap=e},xe.strokeJoin=function(e){we.$ensureContext().lineJoin=e},ir.prototype.smooth=function(){vt=!0
var e=de.style
e.setProperty("image-rendering","optimizeQuality","important"),e.setProperty("-ms-interpolation-mode","bicubic","important"),Ae.hasOwnProperty("mozImageSmoothingEnabled")&&(Ae.mozImageSmoothingEnabled=!0)},sr.prototype.smooth=function(){vt=!0},ir.prototype.noSmooth=function(){vt=!1
var e=de.style
e.setProperty("image-rendering","optimizeSpeed","important"),e.setProperty("image-rendering","-moz-crisp-edges","important"),e.setProperty("image-rendering","-webkit-optimize-contrast","important"),e.setProperty("image-rendering","optimize-contrast","important"),e.setProperty("-ms-interpolation-mode","nearest-neighbor","important"),Ae.hasOwnProperty("mozImageSmoothingEnabled")&&(Ae.mozImageSmoothingEnabled=!1)},sr.prototype.noSmooth=function(){vt=!1},ir.prototype.point=function(e,t){ct&&(vt||(e=Math.round(e),t=Math.round(t)),Ae.fillStyle=xe.color.toString(pt),ut=!0,gt>1?(Ae.beginPath(),Ae.arc(e,t,gt/2,0,c.TWO_PI,!1),Ae.fill()):Ae.fillRect(e,t,1,1))},sr.prototype.point=function(e,t,n){var r=new hr
r.translate(e,t,n||0),r.transpose()
var i=new hr
i.scale(1,-1,1),i.apply(tt.array()),i.transpose(),Ae.useProgram(Le),T("uModel2d",Le,"uModel",!1,r.array()),T("uView2d",Le,"uView",!1,i.array()),gt>0&&ct&&(C("uColor2d",Le,"uColor",ft),M("uIsDrawingText2d",Le,"uIsDrawingText",!1),M("uSmooth2d",Le,"uSmooth",vt),_("aVertex2d",Le,"aVertex",3,Ue),R("aTextureCoord2d",Le,"aTextureCoord"),Ae.drawArrays(Ae.POINTS,0,1))},xe.beginShape=function(e){Rt=e,Lt=[],In=[]},ir.prototype.vertex=function(e,t,n){var r=[]
kn&&(kn=!1),r.isVert=!0,r[0]=e,r[1]=t,r[2]=0,r[3]=0,r[4]=0,r[5]=ht,r[6]=pt,In.push(r),n&&(In[In.length-1].moveTo=n)},sr.prototype.vertex=function(e,n,r,i,s){var o=[]
kn&&(kn=!1),o.isVert=!0,s===t&&Qt&&(s=i,i=r,r=0),i!==t&&s!==t&&(qt===c.IMAGE&&(i/=Zt.width,s/=Zt.height),i=i>1?1:i,i=i<0?0:i,s=s>1?1:s,s=s<0?0:s),o[0]=e,o[1]=n,o[2]=r||0,o[3]=i||0,o[4]=s||0,o[5]=lt[0],o[6]=lt[1],o[7]=lt[2],o[8]=lt[3],o[9]=ft[0],o[10]=ft[1],o[11]=ft[2],o[12]=ft[3],o[13]=wt,o[14]=Et,o[15]=St,In.push(o)}
var pr=function(e,t){var n=new hr
n.scale(1,-1,1),n.apply(tt.array()),n.transpose(),Ae.useProgram(Ie),T("uViewUS",Ie,"uView",!1,n.array()),M("uSmoothUS",Ie,"uSmooth",vt),_("aVertexUS",Ie,"aVertex",3,Ue),Ae.bufferData(Ae.ARRAY_BUFFER,new g(e),Ae.STREAM_DRAW),_("aColorUS",Ie,"aColor",4,Ve),Ae.bufferData(Ae.ARRAY_BUFFER,new g(t),Ae.STREAM_DRAW),Ae.drawArrays(Ae.POINTS,0,e.length/3)},mr=function(e,t,n){var r
r="LINES"===t?Ae.LINES:"LINE_LOOP"===t?Ae.LINE_LOOP:Ae.LINE_STRIP
var i=new hr
i.scale(1,-1,1),i.apply(tt.array()),i.transpose(),Ae.useProgram(Ie),T("uViewUS",Ie,"uView",!1,i.array()),_("aVertexUS",Ie,"aVertex",3,$e),Ae.bufferData(Ae.ARRAY_BUFFER,new g(e),Ae.STREAM_DRAW),_("aColorUS",Ie,"aColor",4,ze),Ae.bufferData(Ae.ARRAY_BUFFER,new g(n),Ae.STREAM_DRAW),Ae.drawArrays(r,0,e.length/3)},gr=function(e,t,n,r){var i
i="TRIANGLES"===t?Ae.TRIANGLES:"TRIANGLE_FAN"===t?Ae.TRIANGLE_FAN:Ae.TRIANGLE_STRIP
var s=new hr
s.scale(1,-1,1),s.apply(tt.array()),s.transpose(),Ae.useProgram(Re),T("model3d",Re,"uModel",!1,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),T("view3d",Re,"uView",!1,s.array()),Ae.enable(Ae.POLYGON_OFFSET_FILL),Ae.polygonOffset(1,1),C("color3d",Re,"uColor",[-1,0,0,0]),_("vertex3d",Re,"aVertex",3,Ge),Ae.bufferData(Ae.ARRAY_BUFFER,new g(e),Ae.STREAM_DRAW),Qt&&null!==Ht&&Xt(n),_("aColor3d",Re,"aColor",4,Ve),Ae.bufferData(Ae.ARRAY_BUFFER,new g(n),Ae.STREAM_DRAW),R("aNormal3d",Re,"aNormal"),Qt&&(M("uUsingTexture3d",Re,"uUsingTexture",Qt),_("aTexture3d",Re,"aTexture",2,He),Ae.bufferData(Ae.ARRAY_BUFFER,new g(r),Ae.STREAM_DRAW)),Ae.drawArrays(i,0,e.length/3),Ae.disable(Ae.POLYGON_OFFSET_FILL)}
ir.prototype.endShape=function(e){if(0!==In.length){var n=e===c.CLOSE
n&&In.push(In[0])
var r,i=[],s=[],o=[],a=[]
kn=!0
var l,h,u=In.length
for(l=0;l<u;l++)for(r=In[l],h=0;h<3;h++)i.push(r[h])
for(l=0;l<u;l++)for(r=In[l],h=5;h<9;h++)s.push(r[h])
for(l=0;l<u;l++)for(r=In[l],h=9;h<13;h++)o.push(r[h])
for(l=0;l<u;l++)r=In[l],a.push(r[3]),a.push(r[4])
if(!Nn||Rt!==c.POLYGON&&Rt!==t)if(!Fn||Rt!==c.POLYGON&&Rt!==t)if(Rt===c.POINTS)for(l=0;l<u;l++)r=In[l],ct&&xe.stroke(r[6]),xe.point(r[0],r[1])
else if(Rt===c.LINES)for(l=0;l+1<u;l+=2)r=In[l],ct&&xe.stroke(In[l+1][6]),xe.line(r[0],r[1],In[l+1][0],In[l+1][1])
else if(Rt===c.TRIANGLES)for(l=0;l+2<u;l+=3)r=In[l],Ae.beginPath(),Ae.moveTo(r[0],r[1]),Ae.lineTo(In[l+1][0],In[l+1][1]),Ae.lineTo(In[l+2][0],In[l+2][1]),Ae.lineTo(r[0],r[1]),at&&(xe.fill(In[l+2][5]),z()),ct&&(xe.stroke(In[l+2][6]),U()),Ae.closePath()
else if(Rt===c.TRIANGLE_STRIP)for(l=0;l+1<u;l++)r=In[l],Ae.beginPath(),Ae.moveTo(In[l+1][0],In[l+1][1]),Ae.lineTo(r[0],r[1]),ct&&xe.stroke(In[l+1][6]),at&&xe.fill(In[l+1][5]),l+2<u&&(Ae.lineTo(In[l+2][0],In[l+2][1]),ct&&xe.stroke(In[l+2][6]),at&&xe.fill(In[l+2][5])),H()
else if(Rt===c.TRIANGLE_FAN){if(u>2)for(Ae.beginPath(),Ae.moveTo(In[0][0],In[0][1]),Ae.lineTo(In[1][0],In[1][1]),Ae.lineTo(In[2][0],In[2][1]),at&&(xe.fill(In[2][5]),z()),ct&&(xe.stroke(In[2][6]),U()),Ae.closePath(),l=3;l<u;l++)r=In[l],Ae.beginPath(),Ae.moveTo(In[0][0],In[0][1]),Ae.lineTo(In[l-1][0],In[l-1][1]),Ae.lineTo(r[0],r[1]),at&&(xe.fill(r[5]),z()),ct&&(xe.stroke(r[6]),U()),Ae.closePath()}else if(Rt===c.QUADS)for(l=0;l+3<u;l+=4){for(r=In[l],Ae.beginPath(),Ae.moveTo(r[0],r[1]),h=1;h<4;h++)Ae.lineTo(In[l+h][0],In[l+h][1])
Ae.lineTo(r[0],r[1]),at&&(xe.fill(In[l+3][5]),z()),ct&&(xe.stroke(In[l+3][6]),U()),Ae.closePath()}else if(Rt===c.QUAD_STRIP){if(u>3)for(l=0;l+1<u;l+=2)r=In[l],Ae.beginPath(),l+3<u?(Ae.moveTo(In[l+2][0],In[l+2][1]),Ae.lineTo(r[0],r[1]),Ae.lineTo(In[l+1][0],In[l+1][1]),Ae.lineTo(In[l+3][0],In[l+3][1]),at&&xe.fill(In[l+3][5]),ct&&xe.stroke(In[l+3][6])):(Ae.moveTo(r[0],r[1]),Ae.lineTo(In[l+1][0],In[l+1][1])),H()}else{for(Ae.beginPath(),Ae.moveTo(In[0][0],In[0][1]),l=1;l<u;l++)r=In[l],r.isVert&&(r.moveTo?Ae.moveTo(r[0],r[1]):Ae.lineTo(r[0],r[1]))
H()}else{for(Ae.beginPath(),l=0;l<u;l++)r=In[l],In[l].isVert?In[l].moveTo?Ae.moveTo(r[0],r[1]):Ae.lineTo(r[0],r[1]):Ae.bezierCurveTo(In[l][0],In[l][1],In[l][2],In[l][3],In[l][4],In[l][5])
H()}else if(u>3){var f=[],p=1-It
for(Ae.beginPath(),Ae.moveTo(In[1][0],In[1][1]),l=1;l+2<u;l++)r=In[l],f[0]=[r[0],r[1]],f[1]=[r[0]+(p*In[l+1][0]-p*In[l-1][0])/6,r[1]+(p*In[l+1][1]-p*In[l-1][1])/6],f[2]=[In[l+1][0]+(p*In[l][0]-p*In[l+2][0])/6,In[l+1][1]+(p*In[l][1]-p*In[l+2][1])/6],f[3]=[In[l+1][0],In[l+1][1]],Ae.bezierCurveTo(f[1][0],f[1][1],f[2][0],f[2][1],f[3][0],f[3][1])
H()}Nn=!1,Fn=!1,Dn=[],On=0,n&&In.pop()}},sr.prototype.endShape=function(e){if(0!==In.length){var n,r=e===c.CLOSE,i=[],s=[],o=[],a=[],l=[]
kn=!0
var h,u,f,p=In.length
for(h=0;h<p;h++)for(n=In[h],u=0;u<3;u++)s.push(n[u])
for(h=0;h<p;h++)for(n=In[h],u=5;u<9;u++)o.push(n[u])
for(h=0;h<p;h++)for(n=In[h],u=9;u<13;u++)a.push(n[u])
for(h=0;h<p;h++)n=In[h],l.push(n[3]),l.push(n[4])
if(r){for(s.push(In[0][0]),s.push(In[0][1]),s.push(In[0][2]),h=5;h<9;h++)o.push(In[0][h])
for(h=9;h<13;h++)a.push(In[0][h])
l.push(In[0][3]),l.push(In[0][4])}if(!Nn||Rt!==c.POLYGON&&Rt!==t)if(!Fn||Rt!==c.POLYGON&&Rt!==t){if(Rt===c.POINTS){for(h=0;h<p;h++)for(n=In[h],u=0;u<3;u++)i.push(n[u])
pr(i,a)}else if(Rt===c.LINES){for(h=0;h<p;h++)for(n=In[h],u=0;u<3;u++)i.push(n[u])
for(h=0;h<p;h++)for(n=In[h],u=5;u<9;u++)o.push(n[u])
mr(i,"LINES",a)}else if(Rt===c.TRIANGLES){if(p>2)for(h=0;h+2<p;h+=3){for(s=[],l=[],i=[],o=[],a=[],u=0;u<3;u++)for(f=0;f<3;f++)i.push(In[h+u][f]),s.push(In[h+u][f])
for(u=0;u<3;u++)for(f=3;f<5;f++)l.push(In[h+u][f])
for(u=0;u<3;u++)for(f=5;f<9;f++)o.push(In[h+u][f]),a.push(In[h+u][f+4])
ct&&mr(i,"LINE_LOOP",a),(at||Qt)&&gr(s,"TRIANGLES",o,l)}}else if(Rt===c.TRIANGLE_STRIP){if(p>2)for(h=0;h+2<p;h++){for(i=[],s=[],a=[],o=[],l=[],u=0;u<3;u++)for(f=0;f<3;f++)i.push(In[h+u][f]),s.push(In[h+u][f])
for(u=0;u<3;u++)for(f=3;f<5;f++)l.push(In[h+u][f])
for(u=0;u<3;u++)for(f=5;f<9;f++)a.push(In[h+u][f+4]),o.push(In[h+u][f]);(at||Qt)&&gr(s,"TRIANGLE_STRIP",o,l),ct&&mr(i,"LINE_LOOP",a)}}else if(Rt===c.TRIANGLE_FAN){if(p>2){for(h=0;h<3;h++)for(n=In[h],u=0;u<3;u++)i.push(n[u])
for(h=0;h<3;h++)for(n=In[h],u=9;u<13;u++)a.push(n[u])
for(ct&&mr(i,"LINE_LOOP",a),h=2;h+1<p;h++){for(i=[],a=[],i.push(In[0][0]),i.push(In[0][1]),i.push(In[0][2]),a.push(In[0][9]),a.push(In[0][10]),a.push(In[0][11]),a.push(In[0][12]),u=0;u<2;u++)for(f=0;f<3;f++)i.push(In[h+u][f])
for(u=0;u<2;u++)for(f=9;f<13;f++)a.push(In[h+u][f])
ct&&mr(i,"LINE_STRIP",a)}(at||Qt)&&gr(s,"TRIANGLE_FAN",o,l)}}else if(Rt===c.QUADS)for(h=0;h+3<p;h+=4){for(i=[],u=0;u<4;u++)for(n=In[h+u],f=0;f<3;f++)i.push(n[f])
if(ct&&mr(i,"LINE_LOOP",a),at){for(s=[],o=[],l=[],u=0;u<3;u++)s.push(In[h][u])
for(u=5;u<9;u++)o.push(In[h][u])
for(u=0;u<3;u++)s.push(In[h+1][u])
for(u=5;u<9;u++)o.push(In[h+1][u])
for(u=0;u<3;u++)s.push(In[h+3][u])
for(u=5;u<9;u++)o.push(In[h+3][u])
for(u=0;u<3;u++)s.push(In[h+2][u])
for(u=5;u<9;u++)o.push(In[h+2][u])
Qt&&(l.push(In[h+0][3]),l.push(In[h+0][4]),l.push(In[h+1][3]),l.push(In[h+1][4]),l.push(In[h+3][3]),l.push(In[h+3][4]),l.push(In[h+2][3]),l.push(In[h+2][4])),gr(s,"TRIANGLE_STRIP",o,l)}}else if(Rt===c.QUAD_STRIP){var m=[]
if(p>3){for(h=0;h<2;h++)for(n=In[h],u=0;u<3;u++)i.push(n[u])
for(h=0;h<2;h++)for(n=In[h],u=9;u<13;u++)a.push(n[u])
for(mr(i,"LINE_STRIP",a),p>4&&p%2>0&&(m=s.splice(s.length-3),In.pop()),h=0;h+3<p;h+=2){for(i=[],a=[],u=0;u<3;u++)i.push(In[h+1][u])
for(u=0;u<3;u++)i.push(In[h+3][u])
for(u=0;u<3;u++)i.push(In[h+2][u])
for(u=0;u<3;u++)i.push(In[h+0][u])
for(u=9;u<13;u++)a.push(In[h+1][u])
for(u=9;u<13;u++)a.push(In[h+3][u])
for(u=9;u<13;u++)a.push(In[h+2][u])
for(u=9;u<13;u++)a.push(In[h+0][u])
ct&&mr(i,"LINE_STRIP",a)}(at||Qt)&&gr(s,"TRIANGLE_LIST",o,l)}}else if(1===p){for(u=0;u<3;u++)i.push(In[0][u])
for(u=9;u<13;u++)a.push(In[0][u])
pr(i,a)}else{for(h=0;h<p;h++){for(n=In[h],u=0;u<3;u++)i.push(n[u])
for(u=5;u<9;u++)a.push(n[u])}ct&&r?mr(i,"LINE_LOOP",a):ct&&!r&&mr(i,"LINE_STRIP",a),(at||Qt)&&gr(s,"TRIANGLE_FAN",o,l)}Qt=!1,Ae.useProgram(Re),M("usingTexture3d",Re,"uUsingTexture",Qt)}else i=s,i.splice(i.length-3),a.splice(a.length-4),ct&&mr(i,null,a),at&&gr(s,"TRIANGLES",o)
else i=s,ct&&mr(i,null,a),at&&gr(s,null,o)
Nn=!1,Fn=!1,Dn=[],On=0}}
var dr=function(e,t){var n=1/e,r=n*n,i=r*n
t.set(0,0,0,1,i,r,n,0,6*i,2*r,0,0,6*i,0,0,0)},vr=function(){Ce||(Se=new hr,Ce=new hr,Ot=!0)
var e=It
Se.set((e-1)/2,(e+3)/2,(-3-e)/2,(1-e)/2,1-e,(-5-e)/2,e+2,(e-1)/2,(e-1)/2,0,(1-e)/2,0,0,1,0,0),dr(Dt,Ce),Te||(Pe=new hr),Pe.set(Se),Pe.preApply(Te),Ce.apply(Se)}
ir.prototype.bezierVertex=function(){Fn=!0
var e=[]
if(kn)throw"vertex() must be used at least once before calling bezierVertex()"
for(var t=0;t<arguments.length;t++)e[t]=arguments[t]
In.push(e),In[In.length-1].isVert=!1},sr.prototype.bezierVertex=function(){Fn=!0
if(kn)throw"vertex() must be used at least once before calling bezierVertex()"
if(9===arguments.length){Me===t&&(Me=new hr)
var e=In.length-1
dr(Ft,Me),Me.apply(_e)
for(var n=Me.array(),r=In[e][0],i=In[e][1],s=In[e][2],o=n[4]*r+n[5]*arguments[0]+n[6]*arguments[3]+n[7]*arguments[6],a=n[8]*r+n[9]*arguments[0]+n[10]*arguments[3]+n[11]*arguments[6],l=n[12]*r+n[13]*arguments[0]+n[14]*arguments[3]+n[15]*arguments[6],h=n[4]*i+n[5]*arguments[1]+n[6]*arguments[4]+n[7]*arguments[7],u=n[8]*i+n[9]*arguments[1]+n[10]*arguments[4]+n[11]*arguments[7],c=n[12]*i+n[13]*arguments[1]+n[14]*arguments[4]+n[15]*arguments[7],f=n[4]*s+n[5]*arguments[2]+n[6]*arguments[5]+n[7]*arguments[8],p=n[8]*s+n[9]*arguments[2]+n[10]*arguments[5]+n[11]*arguments[8],m=n[12]*s+n[13]*arguments[2]+n[14]*arguments[5]+n[15]*arguments[8],g=0;g<Ft;g++)r+=o,o+=a,a+=l,i+=h,h+=u,u+=c,s+=f,f+=p,p+=m,xe.vertex(r,i,s)
xe.vertex(arguments[6],arguments[7],arguments[8])}},xe.texture=function(e){var t=we.$ensureContext()
if(e.__texture)t.bindTexture(t.TEXTURE_2D,e.__texture)
else if("canvas"===e.localName)t.bindTexture(t.TEXTURE_2D,Xe),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.generateMipmap(t.TEXTURE_2D),Zt.width=e.width,Zt.height=e.height
else{var n,r=t.createTexture(),i=h.createElement("canvas"),s=i.getContext("2d")
if(e.width&e.width-1===0)i.width=e.width
else{for(n=1;n<e.width;)n*=2
i.width=n}if(e.height&e.height-1===0)i.height=e.height
else{for(n=1;n<e.height;)n*=2
i.height=n}s.drawImage(e.sourceImg,0,0,e.width,e.height,0,0,i.width,i.height),t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,i),t.generateMipmap(t.TEXTURE_2D),e.__texture=r,Zt.width=e.width,Zt.height=e.height}Qt=!0,t.useProgram(Re),M("usingTexture3d",Re,"uUsingTexture",Qt)},xe.textureMode=function(e){qt=e}
var yr=function(e,t,n,r,i,s,o,a,l,h,u,c){var f=r,p=i,m=s,g=Ce.array(),d=g[4]*e+g[5]*r+g[6]*o+g[7]*h,v=g[8]*e+g[9]*r+g[10]*o+g[11]*h,y=g[12]*e+g[13]*r+g[14]*o+g[15]*h,x=g[4]*t+g[5]*i+g[6]*a+g[7]*u,A=g[8]*t+g[9]*i+g[10]*a+g[11]*u,b=g[12]*t+g[13]*i+g[14]*a+g[15]*u,w=g[4]*n+g[5]*s+g[6]*l+g[7]*c,E=g[8]*n+g[9]*s+g[10]*l+g[11]*c,S=g[12]*n+g[13]*s+g[14]*l+g[15]*c
xe.vertex(f,p,m)
for(var P=0;P<Dt;P++)f+=d,d+=v,v+=y,p+=x,x+=A,A+=b,m+=w,w+=E,E+=S,xe.vertex(f,p,m)}
ir.prototype.curveVertex=function(e,t){Nn=!0,xe.vertex(e,t)},sr.prototype.curveVertex=function(e,t,n){Nn=!0,Ot||vr()
var r=[]
r[0]=e,r[1]=t,r[2]=n,Dn.push(r),On++,On>3&&yr(Dn[On-4][0],Dn[On-4][1],Dn[On-4][2],Dn[On-3][0],Dn[On-3][1],Dn[On-3][2],Dn[On-2][0],Dn[On-2][1],Dn[On-2][2],Dn[On-1][0],Dn[On-1][1],Dn[On-1][2])},ir.prototype.curve=function(e,t,n,r,i,s,o,a){xe.beginShape(),xe.curveVertex(e,t),xe.curveVertex(n,r),xe.curveVertex(i,s),xe.curveVertex(o,a),xe.endShape()},sr.prototype.curve=function(e,n,r,i,s,o,a,l,h,u,c,f){return f!==t?(xe.beginShape(),xe.curveVertex(e,n,r),xe.curveVertex(i,s,o),xe.curveVertex(a,l,h),xe.curveVertex(u,c,f),void xe.endShape()):(xe.beginShape(),xe.curveVertex(e,n),xe.curveVertex(r,i),xe.curveVertex(s,o),xe.curveVertex(a,l),void xe.endShape())},xe.curveTightness=function(e){It=e},xe.curveDetail=function(e){Dt=e,vr()},xe.rectMode=function(e){At=e},xe.imageMode=function(e){switch(e){case c.CORNER:er=Jn
break
case c.CORNERS:er=tr
break
case c.CENTER:er=nr
break
default:throw"Invalid imageMode"}},xe.ellipseMode=function(e){bt=e},xe.arc=function(e,t,n,r,i,s,o){if(!(n<=0||s<i)){for(bt===c.CORNERS?(n-=e,r-=t):bt===c.RADIUS?(e-=n,t-=r,n=2*n,r=2*r):bt===c.CENTER&&(e-=n/2,t-=r/2);i<0;)i+=c.TWO_PI,s+=c.TWO_PI
s-i>c.TWO_PI&&(s=i+c.TWO_PI)
var a=n/2,l=r/2,h=e+a,u=t+l,f=1/(a+l),p=function(e,t,n,r,i){return function(s,f,p,m,g){for(p=0,m=n,g=i+r,s.beginShape(),f&&s.vertex(e-.5,t-.5);m<g;p++,m=p*r+n)s.vertex(e+Math.cos(m)*a|0,t+Math.sin(m)*l|0)
o===c.OPEN&&at?s.vertex(h+Math.cos(n)*a,u+Math.sin(n)*l):o===c.CHORD?s.vertex(h+Math.cos(n)*a,u+Math.sin(n)*l):o===c.PIE&&(s.line(h+Math.cos(n)*a,u+Math.sin(n)*l,h,u),s.line(h,u,h+Math.cos(i)*a,u+Math.sin(i)*l)),s.endShape(f?c.CLOSE:void 0)}}(h+.5,u+.5,i,f,s)
if(at){var m=ct
ct=!1,p(xe,!0),ct=m}if(ct){var g=at
at=!1,p(xe),at=g}}},ir.prototype.line=function(e,n,r,i){if(ct){if(vt||(e=Math.round(e),r=Math.round(r),n=Math.round(n),i=Math.round(i)),e===r&&n===i)return void xe.point(e,n)
for(var s=t,o=t,a=!0,l=tt.array(),h=[1,0,0,0,1,0],u=0;u<6&&a;u++)a=l[u]===h[u]
a&&(e===r?(n>i&&(s=n,n=i,i=s),i++,gt%2===1&&Ae.translate(.5,0)):n===i&&(e>r&&(s=e,e=r,r=s),r++,gt%2===1&&Ae.translate(0,.5)),1===gt&&(o=Ae.lineCap,Ae.lineCap="butt")),Ae.beginPath(),Ae.moveTo(e||0,n||0),Ae.lineTo(r||0,i||0),U(),a&&(e===r&&gt%2===1?Ae.translate(-.5,0):n===i&&gt%2===1&&Ae.translate(0,-.5),1===gt&&(Ae.lineCap=o))}},sr.prototype.line=function(e,n,r,i,s,o){if(s!==t&&o!==t||(o=0,s=i,i=r,r=0),e===i&&n===s&&r===o)return void xe.point(e,n,r)
var a=[e,n,r,i,s,o],l=new hr
l.scale(1,-1,1),l.apply(tt.array()),l.transpose(),gt>0&&ct&&(Ae.useProgram(Le),T("uModel2d",Le,"uModel",!1,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),T("uView2d",Le,"uView",!1,l.array()),C("uColor2d",Le,"uColor",ft),M("uIsDrawingText",Le,"uIsDrawingText",!1),_("aVertex2d",Le,"aVertex",3,$e),R("aTextureCoord2d",Le,"aTextureCoord"),Ae.bufferData(Ae.ARRAY_BUFFER,new g(a),Ae.STREAM_DRAW),Ae.drawArrays(Ae.LINES,0,2))},ir.prototype.bezier=function(){if(8!==arguments.length)throw"You must use 8 parameters for bezier() in 2D mode"
xe.beginShape(),xe.vertex(arguments[0],arguments[1]),xe.bezierVertex(arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]),xe.endShape()},sr.prototype.bezier=function(){if(12!==arguments.length)throw"You must use 12 parameters for bezier() in 3D mode"
xe.beginShape(),xe.vertex(arguments[0],arguments[1],arguments[2]),xe.bezierVertex(arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9],arguments[10],arguments[11]),xe.endShape()},xe.bezierDetail=function(e){Ft=e},xe.bezierPoint=function(e,t,n,r,i){return(1-i)*(1-i)*(1-i)*e+3*(1-i)*(1-i)*i*t+3*(1-i)*i*i*n+i*i*i*r},xe.bezierTangent=function(e,t,n,r,i){return 3*i*i*(-e+3*t-3*n+r)+6*i*(e-2*t+n)+3*(-e+t)},xe.curvePoint=function(e,t,n,r,i){return.5*(2*t+(-e+n)*i+(2*e-5*t+4*n-r)*i*i+(-e+3*t-3*n+r)*i*i*i)},xe.curveTangent=function(e,t,n,r,i){return.5*(-e+n+2*(2*e-5*t+4*n-r)*i+3*(-e+3*t-3*n+r)*i*i)},xe.triangle=function(e,t,n,r,i,s){xe.beginShape(c.TRIANGLES),xe.vertex(e,t,0),xe.vertex(n,r,0),xe.vertex(i,s,0),xe.endShape()},xe.quad=function(e,t,n,r,i,s,o,a){xe.beginShape(c.QUADS),xe.vertex(e,t,0),xe.vertex(n,r,0),xe.vertex(i,s,0),xe.vertex(o,a,0),xe.endShape()}
var xr=function(e,n,r,i,s,o,a,l){l===t&&(o=s,a=s,l=s)
var h=r/2,u=i/2;(s>h||s>u)&&(s=Math.min(h,u)),(o>h||o>u)&&(o=Math.min(h,u)),(a>h||a>u)&&(a=Math.min(h,u)),(l>h||l>u)&&(l=Math.min(h,u)),at&&!ct||Ae.translate(.5,.5),Ae.beginPath(),Ae.moveTo(e+s,n),Ae.lineTo(e+r-o,n),Ae.quadraticCurveTo(e+r,n,e+r,n+o),Ae.lineTo(e+r,n+i-a),Ae.quadraticCurveTo(e+r,n+i,e+r-a,n+i),Ae.lineTo(e+l,n+i),Ae.quadraticCurveTo(e,n+i,e,n+i-l),Ae.lineTo(e,n+s),Ae.quadraticCurveTo(e,n,e+s,n),at&&!ct||Ae.translate(-.5,-.5),z(),U()}
ir.prototype.rect=function(e,n,r,i,s,o,a,l){if(r==""+r||i==""+i){if(At===c.CORNERS?(r-=e,i-=n):At===c.RADIUS?(r*=2,i*=2,e-=r/2,n-=i/2):At===c.CENTER&&(e-=r/2,n-=i/2),vt||(e=Math.round(e),n=Math.round(n),r=Math.round(r),i=Math.round(i)),s!==t)return void xr(e,n,r,i,s,o,a,l)
ct&&gt%2===1&&Ae.translate(.5,.5),Ae.beginPath(),Ae.rect(e,n,r,i),z(),U(),ct&&gt%2===1&&Ae.translate(-.5,-.5)}},sr.prototype.rect=function(e,n,r,i,s,o,a,l){if(s!==t)throw"rect() with rounded corners is not supported in 3D mode"
At===c.CORNERS?(r-=e,i-=n):At===c.RADIUS?(r*=2,i*=2,e-=r/2,n-=i/2):At===c.CENTER&&(e-=r/2,n-=i/2)
var h=new hr
h.translate(e,n,0),h.scale(r,i,1),h.transpose()
var u=new hr
if(u.scale(1,-1,1),u.apply(tt.array()),u.transpose(),gt>0&&ct&&(Ae.useProgram(Le),T("uModel2d",Le,"uModel",!1,h.array()),T("uView2d",Le,"uView",!1,u.array()),C("uColor2d",Le,"uColor",ft),M("uIsDrawingText2d",Le,"uIsDrawingText",!1),_("aVertex2d",Le,"aVertex",3,Fe),R("aTextureCoord2d",Le,"aTextureCoord"),Ae.drawArrays(Ae.LINE_LOOP,0,Un.length/3)),at){if(Ae.useProgram(Re),T("uModel3d",Re,"uModel",!1,h.array()),T("uView3d",Re,"uView",!1,u.array()),Ae.enable(Ae.POLYGON_OFFSET_FILL),Ae.polygonOffset(1,1),C("color3d",Re,"uColor",lt),gn>0){var f=new hr
f.set(u)
var p=new hr
p.set(h),f.mult(p)
var m=new hr
m.set(f),m.invert(),m.transpose(),T("uNormalTransform3d",Re,"uNormalTransform",!1,m.array()),_("aNormal3d",Re,"aNormal",3,ke)}else R("normal3d",Re,"aNormal")
_("vertex3d",Re,"aVertex",3,Fe),Ae.drawArrays(Ae.TRIANGLE_FAN,0,Un.length/3),Ae.disable(Ae.POLYGON_OFFSET_FILL)}},ir.prototype.ellipse=function(e,t,n,r){if(e=e||0,t=t||0,!(n<=0&&r<=0))if(bt===c.RADIUS?(n*=2,r*=2):bt===c.CORNERS?(n-=e,r-=t,e+=n/2,t+=r/2):bt===c.CORNER&&(e+=n/2,t+=r/2),n===r)Ae.beginPath(),Ae.arc(e,t,n/2,0,c.TWO_PI,!1),z(),U()
else{var i=n/2,s=r/2,o=.5522847498307933,a=o*i,l=o*s
xe.beginShape(),xe.vertex(e+i,t),xe.bezierVertex(e+i,t-l,e+a,t-s,e,t-s),xe.bezierVertex(e-a,t-s,e-i,t-l,e-i,t),xe.bezierVertex(e-i,t+l,e-a,t+s,e,t+s),xe.bezierVertex(e+a,t+s,e+i,t+l,e+i,t),xe.endShape()}},sr.prototype.ellipse=function(e,t,n,r){if(e=e||0,t=t||0,!(n<=0&&r<=0)){bt===c.RADIUS?(n*=2,r*=2):bt===c.CORNERS?(n-=e,r-=t,e+=n/2,t+=r/2):bt===c.CORNER&&(e+=n/2,t+=r/2)
var i=n/2,s=r/2,o=.5522847498307933,a=o*i,l=o*s
if(xe.beginShape(),xe.vertex(e+i,t),xe.bezierVertex(e+i,t-l,0,e+a,t-s,0,e,t-s,0),xe.bezierVertex(e-a,t-s,0,e-i,t-l,0,e-i,t,0),xe.bezierVertex(e-i,t+l,0,e-a,t+s,0,e,t+s,0),xe.bezierVertex(e+a,t+s,0,e+i,t+l,0,e+i,t,0),xe.endShape(),at){var h,u,f=0,p=0
for(h=0;h<In.length;h++)f+=In[h][0],p+=In[h][1]
f/=In.length,p/=In.length
var m=[],g=[],d=[]
for(m[0]=f,m[1]=p,m[2]=0,m[3]=0,m[4]=0,m[5]=lt[0],m[6]=lt[1],m[7]=lt[2],m[8]=lt[3],m[9]=ft[0],m[10]=ft[1],m[11]=ft[2],m[12]=ft[3],m[13]=wt,m[14]=Et,m[15]=St,In.unshift(m),h=0;h<In.length;h++){for(u=0;u<3;u++)g.push(In[h][u])
for(u=5;u<9;u++)d.push(In[h][u])}gr(g,"TRIANGLE_FAN",d)}}},xe.normal=function(e,t,n){if(3!==arguments.length||"number"!=typeof e||"number"!=typeof t||"number"!=typeof n)throw"normal() requires three numeric arguments."
wt=e,Et=t,St=n,0!==Rt&&(Pt===c.NORMAL_MODE_AUTO?Pt=c.NORMAL_MODE_SHAPE:Pt===c.NORMAL_MODE_SHAPE&&(Pt=c.NORMAL_MODE_VERTEX))},xe.save=function(e,n){return n!==t?l.open(n.toDataURL(),"_blank"):l.open(xe.externals.canvas.toDataURL(),"_blank")}
var Ar=0
xe.saveFrame=function(e){e===t&&(e="screen-####.png")
var n=e.replace(/#+/,function(e){for(var t=""+Ar++;t.length<e.length;)t="0"+t
return t})
xe.save(n)}
var br=h.createElement("canvas").getContext("2d"),wr=[t,t,t],Er=function(e,t,n){if(this.__isDirty=!1,e instanceof m)this.fromHTMLImageData(e)
else if(t||n){this.width=e||1,this.height=t||1
var r=this.sourceImg=h.createElement("canvas")
r.width=this.width,r.height=this.height
this.imageData=r.getContext("2d").createImageData(this.width,this.height)
if(this.format=n===c.ARGB||n===c.ALPHA?n:c.RGB,this.format===c.RGB)for(var i=3,s=this.imageData.data,o=s.length;i<o;i+=4)s[i]=255
this.__isDirty=!0,this.updatePixels()}else this.width=0,this.height=0,this.imageData=br.createImageData(1,1),this.format=c.ARGB
this.pixels=Y(this)}
Er.prototype={__isPImage:!0,updatePixels:function(){var e=this.sourceImg
e&&e instanceof p&&this.__isDirty&&e.getContext("2d").putImageData(this.imageData,0,0),this.__isDirty=!1},fromHTMLImageData:function(e){var t=X(e)
try{var n=t.context.getImageData(0,0,e.width,e.height)
this.fromImageData(n)}catch(t){e.width&&e.height&&(this.isRemote=!0,this.width=e.width,this.height=e.height)}this.sourceImg=e},get:function(e,t,n,r){return arguments.length?2===arguments.length?xe.get(e,t,this):4===arguments.length?xe.get(e,t,n,r,this):void 0:xe.get(this)},set:function(e,t,n){xe.set(e,t,n,this),this.__isDirty=!0},blend:function(e,t,n,r,i,s,o,a,l,h){9===arguments.length?xe.blend(this,e,t,n,r,i,s,o,a,l,this):10===arguments.length&&xe.blend(e,t,n,r,i,s,o,a,l,h,this),delete this.sourceImg},copy:function(e,t,n,r,i,s,o,a,l){8===arguments.length?xe.blend(this,e,t,n,r,i,s,o,a,c.REPLACE,this):9===arguments.length&&xe.blend(e,t,n,r,i,s,o,a,l,c.REPLACE,this),delete this.sourceImg},filter:function(e,t){2===arguments.length?xe.filter(e,t,this):1===arguments.length&&xe.filter(e,null,this),delete this.sourceImg},save:function(e){xe.save(e,this)},resize:function(e,t){if(this.isRemote)throw"Image is loaded remotely. Cannot resize."
if(0!==this.width||0!==this.height){0===e&&0!==t?e=Math.floor(this.width/this.height*t):0===t&&0!==e&&(t=Math.floor(this.height/this.width*e))
var n=X(this.imageData).canvas,r=X(n,e,t).context.getImageData(0,0,e,t)
this.fromImageData(r)}},mask:function(e){var t,n,r=this.toImageData()
if(e instanceof Er||e.__isPImage){if(e.width!==this.width||e.height!==this.height)throw"mask must have the same dimensions as PImage."
for(e=e.toImageData(),t=2,n=this.width*this.height*4;t<n;t+=4)r.data[t+1]=e.data[t]}else if(e instanceof Array){if(this.width*this.height!==e.length)throw"mask array must be the same length as PImage pixels array."
for(t=0,n=e.length;t<n;++t)r.data[4*t+3]=e[t]}this.fromImageData(r)},loadPixels:u,toImageData:function(){if(this.isRemote)return this.sourceImg
if(!this.__isDirty)return this.imageData
var e=X(this.sourceImg)
return e.context.getImageData(0,0,this.width,this.height)},toDataURL:function(){if(this.isRemote)throw"Image is loaded remotely. Cannot create dataURI."
var e=X(this.imageData)
return e.canvas.toDataURL()},fromImageData:function(e){var t=e.width,n=e.height,r=h.createElement("canvas"),i=r.getContext("2d")
this.width=r.width=t,this.height=r.height=n,i.putImageData(e,0,0),this.format=c.ARGB,this.imageData=e,this.sourceImg=r}},xe.PImage=Er,xe.createImage=function(e,t,n){return new Er(e,t,n)},xe.loadImage=function(e,t,n){var r
if(be.imageCache.images[e])return r=new Er(be.imageCache.images[e]),r.loaded=!0,r
r=new Er
var i=h.createElement("img")
return r.sourceImg=i,i.onload=function(e,t,n){var r=e,i=t,s=n
return function(){i.fromHTMLImageData(r),i.loaded=!0,s&&s()}}(i,r,n),i.src=e,r},xe.requestImage=xe.loadImage,xe.get=function(e,t,n,r,i){return void 0!==i?Z(e,t,n,r,i):void 0!==r?W(e,t,n,r):void 0!==n?K(e,t,n):void 0!==t?j(e,t):void 0!==e?Z(0,0,e.width,e.height,e):W(0,0,xe.width,xe.height)},xe.createGraphics=function(e,t,n){var r=new E
return r.size(e,t,n),r.background(0,0),r},xe.set=function(e,t,n,r){3===arguments.length?"number"==typeof n?ee(e,t,n):(n instanceof Er||n.__isPImage)&&xe.image(n,e,t):4===arguments.length&&te(e,t,n,r)},xe.imageData={},xe.pixels={getLength:function(){return xe.imageData.data.length?xe.imageData.data.length/4:0},getPixel:function(e){var t=4*e,n=xe.imageData.data
return n[t+3]<<24&4278190080|n[t+0]<<16&16711680|n[t+1]<<8&65280|255&n[t+2]},setPixel:function(e,t){var n=4*e,r=xe.imageData.data
r[n+0]=(16711680&t)>>>16,r[n+1]=(65280&t)>>>8,r[n+2]=255&t,r[n+3]=(4278190080&t)>>>24},toArray:function(){for(var e=[],t=xe.imageData.width*xe.imageData.height,n=xe.imageData.data,r=0,i=0;r<t;r++,i+=4)e.push(n[i+3]<<24&4278190080|n[i+0]<<16&16711680|n[i+1]<<8&65280|255&n[i+2])
return e},set:function(e){for(var t=0,n=e.length;t<n;t++)this.setPixel(t,e[t])}},xe.loadPixels=function(){xe.imageData=we.$ensureContext().getImageData(0,0,xe.width,xe.height)},xe.updatePixels=function(){xe.imageData&&we.$ensureContext().putImageData(xe.imageData,0,0)},xe.hint=function(e){var t=we.$ensureContext()
e===c.DISABLE_DEPTH_TEST?(t.disable(t.DEPTH_TEST),t.depthMask(!1),t.clear(t.DEPTH_BUFFER_BIT)):e===c.ENABLE_DEPTH_TEST?(t.enable(t.DEPTH_TEST),t.depthMask(!0)):e===c.ENABLE_OPENGL_2X_SMOOTH||e===c.ENABLE_OPENGL_4X_SMOOTH?vt=!0:e===c.DISABLE_OPENGL_2X_SMOOTH&&(vt=!1)}
var Sr=function(e,t,n,r){var i
if(e instanceof Er||e.__isPImage){if(i=e,!i.loaded)throw"Error using image in background(): PImage not loaded."
if(i.width!==xe.width||i.height!==xe.height)throw"Background image must be the same dimensions as the canvas."}else i=xe.color(e,t,n,r)
Nt=i}
ir.prototype.background=function(e,n,r,i){e!==t&&Sr(e,n,r,i),Nt instanceof Er||Nt.__isPImage?(N(),Ae.setTransform(1,0,0,1,0,0),xe.image(Nt,0,0),F()):(N(),Ae.setTransform(1,0,0,1,0,0),xe.alpha(Nt)!==kt&&Ae.clearRect(0,0,xe.width,xe.height),Ae.fillStyle=xe.color.toString(Nt),Ae.fillRect(0,0,xe.width,xe.height),ut=!0,F())},sr.prototype.background=function(e,t,n,r){arguments.length>0&&Sr(e,t,n,r)
var i=xe.color.toGLArray(Nt)
Ae.clearColor(i[0],i[1],i[2],i[3]),Ae.clear(Ae.COLOR_BUFFER_BIT|Ae.DEPTH_BUFFER_BIT)},ir.prototype.image=function(e,t,n,r,i){if(t=Math.round(t),n=Math.round(n),e.width>0){var s=(r||e.width,i||e.height,er(t||0,n||0,r||e.width,i||e.height,arguments.length<4)),o=!!e.sourceImg&&null===Ht
if(o){var a=e.sourceImg
e.__isDirty&&e.updatePixels(),Ae.drawImage(a,0,0,a.width,a.height,s.x,s.y,s.w,s.h)}else{var l=e.toImageData()
null!==Ht&&(Ht(l),e.__isDirty=!0),Ae.drawImage(X(l).canvas,0,0,e.width,e.height,s.x,s.y,s.w,s.h)}}},sr.prototype.image=function(e,t,n,r,i){e.width>0&&(t=Math.round(t),n=Math.round(n),r=r||e.width,i=i||e.height,xe.beginShape(xe.QUADS),xe.texture(e),xe.vertex(t,n,0,0,0),xe.vertex(t,n+i,0,0,i),xe.vertex(t+r,n+i,0,r,i),xe.vertex(t+r,n,0,r,0),xe.endShape())},xe.tint=function(e,t,n,r){var i=xe.color(e,t,n,r),s=xe.red(i)/Bt,o=xe.green(i)/$t,a=xe.blue(i)/Gt,l=xe.alpha(i)/kt
Ht=function(e){for(var t=e.data,n=4*e.width*e.height,r=0;r<n;)t[r++]*=s,t[r++]*=o,t[r++]*=a,t[r++]*=l},Xt=function(e){for(var t=0;t<e.length;)e[t++]=s,e[t++]=o,e[t++]=a,e[t++]=l}},xe.noTint=function(){Ht=null,Xt=null},xe.copy=function(e,n,r,i,s,o,a,l,h){h===t&&(h=l,l=a,a=o,o=s,s=i,i=r,r=n,n=e,e=xe),xe.blend(e,n,r,i,s,o,a,l,h,c.REPLACE)},xe.blend=function(e,n,r,i,s,o,a,l,h,u,c){if(e.isRemote)throw"Image is loaded remotely. Cannot blend image."
u===t&&(u=h,h=l,l=a,a=o,o=s,s=i,i=r,r=n,n=e,e=xe)
var f=n+i,p=r+s,m=o+l,g=a+h,d=c||xe
c!==t&&u!==t||xe.loadPixels(),e.loadPixels(),e===xe&&xe.intersect(n,r,f,p,o,a,m,g)?xe.blit_resize(xe.get(n,r,f-n,p-r),0,0,f-n-1,p-r-1,d.imageData.data,d.width,d.height,o,a,m,g,u):xe.blit_resize(e,n,r,f,p,d.imageData.data,d.width,d.height,o,a,m,g,u),c===t&&xe.updatePixels()}
var Pr=function(e){var t,n=xe.floor(3.5*e)
if(n=n<1?1:n<248?n:248,xe.shared.blurRadius!==n){xe.shared.blurRadius=n,xe.shared.blurKernelSize=1+(xe.shared.blurRadius<<1),xe.shared.blurKernel=new g(xe.shared.blurKernelSize)
var r=xe.shared.blurKernel,i=xe.shared.blurKernelSize
xe.shared.blurRadius
for(t=0;t<i;t++)r[t]=0
var s=(n-1)*(n-1)
for(t=1;t<n;t++)r[n+t]=r[n-t]=s
r[n]=n*n}},Cr=function(e,t){var n,r,i,s,o,a,l,h,u,c,f,p,m,d,v,y=t.pixels.getLength(),x=new g(y),A=new g(y),b=new g(y),w=new g(y),E=0
Pr(e)
var S=t.height,P=t.width,C=xe.shared.blurKernelSize,M=xe.shared.blurRadius,T=xe.shared.blurKernel,_=t.imageData.data
for(m=0;m<S;m++){for(p=0;p<P;p++){if(s=i=r=o=n=0,l=p-M,l<0)f=-l,l=0
else{if(l>=P)break
f=0}for(d=f;d<C&&!(l>=P);d++)v=4*(l+E),a=T[d],o+=a*_[v+3],r+=a*_[v],i+=a*_[v+1],s+=a*_[v+2],n+=a,l++
h=E+p,w[h]=o/n,x[h]=r/n,A[h]=i/n,b[h]=s/n}E+=P}for(E=0,u=-M,c=u*P,m=0;m<S;m++){for(p=0;p<P;p++){if(s=i=r=o=n=0,u<0)f=h=-u,l=p
else{if(u>=S)break
f=0,h=u,l=p+c}for(d=f;d<C&&!(h>=S);d++)a=T[d],o+=a*w[l],r+=a*x[l],i+=a*A[l],s+=a*b[l],n+=a,h++,l+=P
v=4*(p+E),_[v]=r/n,_[v+1]=i/n,_[v+2]=s/n,_[v+3]=o/n}E+=P,c+=P,u++}},Mr=function(e,t){var n,r,i,s,o,a,l,h,u,c,f,p,m,g,v,y,x,A=0,b=t.pixels.getLength(),w=new d(b)
if(e)for(;A<b;)for(n=A,r=A+t.width;A<r;)i=s=t.pixels.getPixel(A),l=A-1,a=A+1,h=A-t.width,u=A+t.width,l<n&&(l=A),a>=r&&(a=A),h<0&&(h=0),u>=b&&(u=A),p=t.pixels.getPixel(h),f=t.pixels.getPixel(l),m=t.pixels.getPixel(u),c=t.pixels.getPixel(a),o=77*(i>>16&255)+151*(i>>8&255)+28*(255&i),v=77*(f>>16&255)+151*(f>>8&255)+28*(255&f),g=77*(c>>16&255)+151*(c>>8&255)+28*(255&c),y=77*(p>>16&255)+151*(p>>8&255)+28*(255&p),x=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),v<o&&(s=f,o=v),g<o&&(s=c,o=g),y<o&&(s=p,o=y),x<o&&(s=m,o=x),w[A++]=s
else for(;A<b;)for(n=A,r=A+t.width;A<r;)i=s=t.pixels.getPixel(A),l=A-1,a=A+1,h=A-t.width,u=A+t.width,l<n&&(l=A),a>=r&&(a=A),h<0&&(h=0),u>=b&&(u=A),p=t.pixels.getPixel(h),f=t.pixels.getPixel(l),m=t.pixels.getPixel(u),c=t.pixels.getPixel(a),o=77*(i>>16&255)+151*(i>>8&255)+28*(255&i),v=77*(f>>16&255)+151*(f>>8&255)+28*(255&f),g=77*(c>>16&255)+151*(c>>8&255)+28*(255&c),y=77*(p>>16&255)+151*(p>>8&255)+28*(255&p),x=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),v>o&&(s=f,o=v),g>o&&(s=c,o=g),y>o&&(s=p,o=y),x>o&&(s=m,o=x),w[A++]=s
t.pixels.set(w)}
xe.filter=function(e,n,r){var i,s,o,a
if(3===arguments.length?(r.loadPixels(),i=r):(xe.loadPixels(),i=xe),n===t&&(n=null),i.isRemote)throw"Image is loaded remotely. Cannot filter image."
var l=i.pixels.getLength()
switch(e){case c.BLUR:var h=n||1
Cr(h,i)
break
case c.GRAY:if(i.format===c.ALPHA){for(a=0;a<l;a++)s=255-i.pixels.getPixel(a),i.pixels.setPixel(a,4278190080|s<<16|s<<8|s)
i.format=c.RGB}else for(a=0;a<l;a++)s=i.pixels.getPixel(a),o=77*(s>>16&255)+151*(s>>8&255)+28*(255&s)>>8,i.pixels.setPixel(a,s&c.ALPHA_MASK|o<<16|o<<8|o)
break
case c.INVERT:for(a=0;a<l;a++)i.pixels.setPixel(a,16777215^i.pixels.getPixel(a))
break
case c.POSTERIZE:if(null===n)throw"Use filter(POSTERIZE, int levels) instead of filter(POSTERIZE)"
var u=xe.floor(n)
if(u<2||u>255)throw"Levels must be between 2 and 255 for filter(POSTERIZE, levels)"
var f=u-1
for(a=0;a<l;a++){var p=i.pixels.getPixel(a)>>16&255,m=i.pixels.getPixel(a)>>8&255,g=255&i.pixels.getPixel(a)
p=255*(p*u>>8)/f,m=255*(m*u>>8)/f,g=255*(g*u>>8)/f,i.pixels.setPixel(a,4278190080&i.pixels.getPixel(a)|p<<16|m<<8|g)}break
case c.OPAQUE:for(a=0;a<l;a++)i.pixels.setPixel(a,4278190080|i.pixels.getPixel(a))
i.format=c.RGB
break
case c.THRESHOLD:if(null===n&&(n=.5),n<0||n>1)throw"Level must be between 0 and 1 for filter(THRESHOLD, level)"
var d=xe.floor(255*n)
for(a=0;a<l;a++){var v=xe.max((i.pixels.getPixel(a)&c.RED_MASK)>>16,xe.max((i.pixels.getPixel(a)&c.GREEN_MASK)>>8,i.pixels.getPixel(a)&c.BLUE_MASK))
i.pixels.setPixel(a,i.pixels.getPixel(a)&c.ALPHA_MASK|(v<d?0:16777215))}break
case c.ERODE:Mr(!0,i)
break
case c.DILATE:Mr(!1,i)}i.updatePixels()},xe.shared={fracU:0,ifU:0,fracV:0,ifV:0,u1:0,u2:0,v1:0,v2:0,sX:0,sY:0,iw:0,iw1:0,ih1:0,ul:0,ll:0,ur:0,lr:0,cUL:0,cLL:0,cUR:0,cLR:0,srcXOffset:0,srcYOffset:0,r:0,g:0,b:0,a:0,srcBuffer:null,blurRadius:0,blurKernelSize:0,blurKernel:null},xe.intersect=function(e,t,n,r,i,s,o,a){var l=n-e+1,h=r-t+1,u=o-i+1,c=a-s+1
if(i<e)u+=i-e,u>l&&(u=l)
else{var f=l+e-i
u>f&&(u=f)}if(s<t)c+=s-t,c>h&&(c=h)
else{var p=h+t-s
c>p&&(c=p)}return!(u<=0||c<=0)}
var Tr={}
if(Tr[c.BLEND]=xe.modes.blend,Tr[c.ADD]=xe.modes.add,Tr[c.SUBTRACT]=xe.modes.subtract,Tr[c.LIGHTEST]=xe.modes.lightest,Tr[c.DARKEST]=xe.modes.darkest,Tr[c.REPLACE]=xe.modes.replace,Tr[c.DIFFERENCE]=xe.modes.difference,Tr[c.EXCLUSION]=xe.modes.exclusion,Tr[c.MULTIPLY]=xe.modes.multiply,Tr[c.SCREEN]=xe.modes.screen,Tr[c.OVERLAY]=xe.modes.overlay,Tr[c.HARD_LIGHT]=xe.modes.hard_light,Tr[c.SOFT_LIGHT]=xe.modes.soft_light,Tr[c.DODGE]=xe.modes.dodge,Tr[c.BURN]=xe.modes.burn,xe.blit_resize=function(e,t,n,r,i,s,o,a,l,h,u,f,p){var m,g
t<0&&(t=0),n<0&&(n=0),r>=e.width&&(r=e.width-1),i>=e.height&&(i=e.height-1)
var d=r-t,v=i-n,y=u-l,x=f-h
if(!(y<=0||x<=0||d<=0||v<=0||l>=o||h>=a||t>=e.width||n>=e.height)){var A=Math.floor(d/y*c.PRECISIONF),b=Math.floor(v/x*c.PRECISIONF),w=xe.shared
w.srcXOffset=Math.floor(l<0?-l*A:t*c.PRECISIONF),w.srcYOffset=Math.floor(h<0?-h*b:n*c.PRECISIONF),l<0&&(y+=l,l=0),h<0&&(x+=h,h=0),y=Math.min(y,o-l),x=Math.min(x,a-h)
var E,S=h*o+l
w.srcBuffer=e.imageData.data,w.iw=e.width,w.iw1=e.width-1,w.ih1=e.height-1
var P,C,M,T,_,R,L=(xe.filter_bilinear,xe.filter_new_scanline,Tr[p]),I=c.ALPHA_MASK,D=c.RED_MASK,O=c.GREEN_MASK,N=c.BLUE_MASK,F=c.PREC_MAXVAL,k=c.PRECISIONB,B=c.PREC_RED_SHIFT,$=c.PREC_ALPHA_SHIFT,G=w.srcBuffer,V=Math.min
for(g=0;g<x;g++){for(w.sX=w.srcXOffset,w.fracV=w.srcYOffset&F,w.ifV=F-w.fracV,w.v1=(w.srcYOffset>>k)*w.iw,w.v2=V((w.srcYOffset>>k)+1,w.ih1)*w.iw,m=0;m<y;m++)C=4*(S+m),E=s[C+3]<<24&I|s[C]<<16&D|s[C+1]<<8&O|s[C+2]&N,w.fracU=w.sX&F,w.ifU=F-w.fracU,w.ul=w.ifU*w.ifV>>k,w.ll=w.ifU*w.fracV>>k,w.ur=w.fracU*w.ifV>>k,w.lr=w.fracU*w.fracV>>k,w.u1=w.sX>>k,w.u2=V(w.u1+1,w.iw1),M=4*(w.v1+w.u1),T=4*(w.v1+w.u2),_=4*(w.v2+w.u1),R=4*(w.v2+w.u2),w.cUL=G[M+3]<<24&I|G[M]<<16&D|G[M+1]<<8&O|G[M+2]&N,w.cUR=G[T+3]<<24&I|G[T]<<16&D|G[T+1]<<8&O|G[T+2]&N,w.cLL=G[_+3]<<24&I|G[_]<<16&D|G[_+1]<<8&O|G[_+2]&N,w.cLR=G[R+3]<<24&I|G[R]<<16&D|G[R+1]<<8&O|G[R+2]&N,w.r=w.ul*((w.cUL&D)>>16)+w.ll*((w.cLL&D)>>16)+w.ur*((w.cUR&D)>>16)+w.lr*((w.cLR&D)>>16)<<B&D,w.g=w.ul*(w.cUL&O)+w.ll*(w.cLL&O)+w.ur*(w.cUR&O)+w.lr*(w.cLR&O)>>>k&O,w.b=w.ul*(w.cUL&N)+w.ll*(w.cLL&N)+w.ur*(w.cUR&N)+w.lr*(w.cLR&N)>>>k,w.a=w.ul*((w.cUL&I)>>>24)+w.ll*((w.cLL&I)>>>24)+w.ur*((w.cUR&I)>>>24)+w.lr*((w.cLR&I)>>>24)<<$&I,P=L(E,w.a|w.r|w.g|w.b),s[C]=(P&D)>>>16,s[C+1]=(P&O)>>>8,s[C+2]=P&N,s[C+3]=(P&I)>>>24,w.sX+=A
S+=o,w.srcYOffset+=b}}},xe.loadFont=function(e,n){if(e===t)throw"font name required in loadFont."
if(e.indexOf(".svg")===-1)return n===t&&(n=ln.size),PFont.get(e,n)
var r=xe.loadGlyphs(e)
return{name:e,css:"12px sans-serif",glyph:!0,units_per_em:r.units_per_em,horiz_adv_x:1/r.units_per_em*r.horiz_adv_x,ascent:r.ascent,descent:r.descent,width:function(t){for(var n=0,r=t.length,i=0;i<r;i++)try{n+=parseFloat(xe.glyphLook(xe.glyphTable[e],t[i]).horiz_adv_x)}catch(e){E.debug(e)}return n/xe.glyphTable[e].units_per_em}}},xe.createFont=function(e,t){return xe.loadFont(e,t)},xe.textFont=function(e,n){n!==t&&(e.glyph||(e=PFont.get(e.name,n)),rn=n),ln=e,nn=ln.name,sn=ln.ascent,on=ln.descent,an=ln.leading
var r=we.$ensureContext()
r.font=ln.css},xe.textSize=function(e){ln=PFont.get(nn,e),rn=e,sn=ln.ascent,on=ln.descent,an=ln.leading
var t=we.$ensureContext()
t.font=ln.css},xe.textAscent=function(){return sn},xe.textDescent=function(){return on},xe.textLeading=function(e){an=e},xe.textAlign=function(e,t){Jt=e,en=t||c.BASELINE},ir.prototype.textWidth=function(e){var t,n=ne(e).split(/\r?\n/g),r=0,i=n.length
for(Ae.font=ln.css,t=0;t<i;++t)r=Math.max(r,ln.measureTextWidth(n[t]))
return 0|r},sr.prototype.textWidth=function(e){var n,r=ne(e).split(/\r?\n/g),i=0,s=r.length
Ee===t&&(Ee=h.createElement("canvas"))
var o=Ee.getContext("2d")
for(o.font=ln.css,n=0;n<s;++n)i=Math.max(i,o.measureText(r[n]).width)
return 0|i},xe.glyphLook=function(e,t){try{switch(t){case"1":return e.one
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
default:return e[t]}}catch(e){E.debug(e)}},ir.prototype.text$line=function(e,t,n,r,i){var s=0,o=0
if(ln.glyph){var a=xe.glyphTable[nn]
N(),Ae.translate(t,n+rn),i!==c.RIGHT&&i!==c.CENTER||(s=a.width(e),o=i===c.RIGHT?-s:-s/2)
var l=a.units_per_em,h=1/l*rn
Ae.scale(h,h)
for(var u=0,f=e.length;u<f;u++)try{xe.glyphLook(a,e[u]).draw()}catch(e){E.debug(e)}F()}else e&&"fillText"in Ae&&(ut&&(Ae.fillStyle=xe.color.toString(ht),ut=!1),i!==c.RIGHT&&i!==c.CENTER||(s=ln.measureTextWidth(e),o=i===c.RIGHT?-s:-s/2),Ae.fillText(e,t+o,n))},sr.prototype.text$line=function(e,n,r,i,s){Ee===t&&(Ee=h.createElement("canvas"))
var o=Ae
Ae=Ee.getContext("2d"),Ae.font=ln.css
var a=ln.measureTextWidth(e)
Ee.width=a,Ee.height=rn,Ae=Ee.getContext("2d"),Ae.font=ln.css,Ae.textBaseline="top",ir.prototype.text$line(e,0,0,0,c.LEFT)
var l=Ee.width/Ee.height
Ae=o,Ae.bindTexture(Ae.TEXTURE_2D,Ye),Ae.texImage2D(Ae.TEXTURE_2D,0,Ae.RGBA,Ae.RGBA,Ae.UNSIGNED_BYTE,Ee),Ae.texParameteri(Ae.TEXTURE_2D,Ae.TEXTURE_MAG_FILTER,Ae.LINEAR),Ae.texParameteri(Ae.TEXTURE_2D,Ae.TEXTURE_MIN_FILTER,Ae.LINEAR),Ae.texParameteri(Ae.TEXTURE_2D,Ae.TEXTURE_WRAP_T,Ae.CLAMP_TO_EDGE),Ae.texParameteri(Ae.TEXTURE_2D,Ae.TEXTURE_WRAP_S,Ae.CLAMP_TO_EDGE)
var u=0
s===c.RIGHT?u=-a:s===c.CENTER&&(u=-a/2)
var f=new hr,p=.5*rn
f.translate(n+u-p/2,r-p,i),f.scale(-l*p,-p,p),f.translate(-1,-1,-1),f.transpose()
var m=new hr
m.scale(1,-1,1),m.apply(tt.array()),m.transpose(),Ae.useProgram(Le),_("aVertex2d",Le,"aVertex",3,je),_("aTextureCoord2d",Le,"aTextureCoord",2,Ke),M("uSampler2d",Le,"uSampler",[0]),M("uIsDrawingText2d",Le,"uIsDrawingText",!0),T("uModel2d",Le,"uModel",!1,f.array()),T("uView2d",Le,"uView",!1,m.array()),C("uColor2d",Le,"uColor",lt),Ae.bindBuffer(Ae.ELEMENT_ARRAY_BUFFER,We),Ae.drawElements(Ae.TRIANGLES,6,Ae.UNSIGNED_SHORT,0)},xe.text=function(){tn!==c.SHAPE&&(3===arguments.length?re(ne(arguments[0]),arguments[1],arguments[2],0):4===arguments.length?re(ne(arguments[0]),arguments[1],arguments[2],arguments[3]):5===arguments.length?ie(ne(arguments[0]),arguments[1],arguments[2],arguments[3],arguments[4],0):6===arguments.length&&ie(ne(arguments[0]),arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]))},xe.textMode=function(e){tn=e},xe.loadGlyphs=function(e){var n,r,i,s,o,a,u,c,f,p,m,g,d="[0-9\\-]+",v=function(e,t){var n,r=0,i=[],s=new RegExp(e,"g")
for(n=i[r]=s.exec(t);n;)r++,n=i[r]=s.exec(t)
return i},y=function(e){var t=v("[A-Za-z][0-9\\- ]+|Z",e),l=function(){return N(),we.$ensureContext()},h=function(){z(),U(),F()}
g="return {draw:function(){var curContext=beforePathDraw();curContext.beginPath();",n=0,r=0,i=0,s=0,o=0,a=0,e=0,c=0,f="",p=t.length-1
for(var u=0;u<p;u++){var y=t[u][0],x=v(d,y)
switch(y[0]){case"M":n=parseFloat(x[0][0]),r=parseFloat(x[1][0]),g+="curContext.moveTo("+n+","+-r+");"
break
case"L":n=parseFloat(x[0][0]),r=parseFloat(x[1][0]),g+="curContext.lineTo("+n+","+-r+");"
break
case"H":n=parseFloat(x[0][0]),g+="curContext.lineTo("+n+","+-r+");"
break
case"V":r=parseFloat(x[0][0]),g+="curContext.lineTo("+n+","+-r+");"
break
case"T":o=parseFloat(x[0][0]),a=parseFloat(x[1][0]),"Q"===f||"T"===f?(e=Math.sqrt(Math.pow(n-i,2)+Math.pow(s-r,2)),c=Math.PI+Math.atan2(i-n,s-r),i=n+Math.sin(c)*e,s=r+Math.cos(c)*e):(i=n,s=r),g+="curContext.quadraticCurveTo("+i+","+-s+","+o+","+-a+");",n=o,r=a
break
case"Q":i=parseFloat(x[0][0]),s=parseFloat(x[1][0]),o=parseFloat(x[2][0]),a=parseFloat(x[3][0]),g+="curContext.quadraticCurveTo("+i+","+-s+","+o+","+-a+");",n=o,r=a
break
case"Z":g+="curContext.closePath();"}f=y[0]}return g+="afterPathDraw();",g+="curContext.translate("+m+",0);",g+="}}",new Function("beforePathDraw","afterPathDraw",g)(l,h)},x=function(n){var r=n.getElementsByTagName("font")
xe.glyphTable[e].horiz_adv_x=r[0].getAttribute("horiz-adv-x")
var i=n.getElementsByTagName("font-face")[0]
xe.glyphTable[e].units_per_em=parseFloat(i.getAttribute("units-per-em")),xe.glyphTable[e].ascent=parseFloat(i.getAttribute("ascent")),xe.glyphTable[e].descent=parseFloat(i.getAttribute("descent"))
for(var s=n.getElementsByTagName("glyph"),o=s.length,a=0;a<o;a++){var l=s[a].getAttribute("unicode"),h=s[a].getAttribute("glyph-name")
m=s[a].getAttribute("horiz-adv-x"),null===m&&(m=xe.glyphTable[e].horiz_adv_x),u=s[a].getAttribute("d"),u!==t&&(g=y(u),xe.glyphTable[e][h]={name:h,unicode:l,horiz_adv_x:m,draw:g.draw})}},A=function(){var t
try{t=h.implementation.createDocument("","",null)}catch(e){return void E.debug(e.message)}try{t.async=!1,t.load(e),x(t.getElementsByTagName("svg")[0])}catch(t){E.debug(t)
try{var n=new l.XMLHttpRequest
n.open("GET",e,!1),n.send(null),x(n.responseXML.documentElement)}catch(e){E.debug(t)}}}
return xe.glyphTable[e]={},A(e),xe.glyphTable[e]},xe.param=function(e){var t="data-processing-"+e
if(de.hasAttribute(t))return de.getAttribute(t)
for(var n=0,r=de.childNodes.length;n<r;++n){var i=de.childNodes.item(n)
if(1===i.nodeType&&"param"===i.tagName.toLowerCase()&&i.getAttribute("name")===e)return i.getAttribute("value")}return be.params.hasOwnProperty(e)?be.params[e]:null},or.prototype.translate=oe("translate"),or.prototype.transform=oe("transform"),or.prototype.scale=oe("scale"),or.prototype.pushMatrix=oe("pushMatrix"),or.prototype.popMatrix=oe("popMatrix"),or.prototype.resetMatrix=oe("resetMatrix"),or.prototype.applyMatrix=oe("applyMatrix"),or.prototype.rotate=oe("rotate"),or.prototype.rotateZ=oe("rotateZ"),or.prototype.shearX=oe("shearX"),or.prototype.shearY=oe("shearY"),or.prototype.redraw=oe("redraw"),or.prototype.toImageData=oe("toImageData"),or.prototype.ambientLight=oe("ambientLight"),or.prototype.directionalLight=oe("directionalLight"),or.prototype.lightFalloff=oe("lightFalloff"),or.prototype.lightSpecular=oe("lightSpecular"),or.prototype.pointLight=oe("pointLight"),or.prototype.noLights=oe("noLights"),or.prototype.spotLight=oe("spotLight"),or.prototype.beginCamera=oe("beginCamera"),or.prototype.endCamera=oe("endCamera"),or.prototype.frustum=oe("frustum"),or.prototype.box=oe("box"),or.prototype.sphere=oe("sphere"),or.prototype.ambient=oe("ambient"),or.prototype.emissive=oe("emissive"),or.prototype.shininess=oe("shininess"),or.prototype.specular=oe("specular"),or.prototype.fill=oe("fill"),or.prototype.stroke=oe("stroke"),or.prototype.strokeWeight=oe("strokeWeight"),or.prototype.smooth=oe("smooth"),or.prototype.noSmooth=oe("noSmooth"),or.prototype.point=oe("point"),or.prototype.vertex=oe("vertex"),or.prototype.endShape=oe("endShape"),or.prototype.bezierVertex=oe("bezierVertex"),or.prototype.curveVertex=oe("curveVertex"),or.prototype.curve=oe("curve"),or.prototype.line=oe("line"),or.prototype.bezier=oe("bezier"),or.prototype.rect=oe("rect"),or.prototype.ellipse=oe("ellipse"),or.prototype.background=oe("background"),or.prototype.image=oe("image"),or.prototype.textWidth=oe("textWidth"),or.prototype.text$line=oe("text$line"),or.prototype.$ensureContext=oe("$ensureContext"),or.prototype.$newPMatrix=oe("$newPMatrix"),or.prototype.size=function(e,t,n){se(n===c.WEBGL?"3D":"2D"),xe.size(e,t,n)},or.prototype.$init=u,ir.prototype.$init=function(){xe.size(xe.width,xe.height),Ae.lineCap="round",xe.noSmooth(),xe.disableContextMenu()},sr.prototype.$init=function(){xe.use3DContext=!0,xe.disableContextMenu()},rr.prototype.$ensureContext=function(){return Ae},de.getAttribute("tabindex")||de.setAttribute("tabindex",0),ve)be=new E.Sketch,se(),xe.size=function(e,t,n){se(n&&n===c.WEBGL?"3D":"2D"),xe.size(e,t,n)}
else{be=n instanceof E.Sketch?n:"function"==typeof n?new E.Sketch(n):n?E.compile(n):new E.Sketch(function(){}),xe.externals.sketch=be,se(),de.onfocus=function(){xe.focused=!0},de.onblur=function(){xe.focused=!1,be.options.globalKeyEvents||ce()},be.options.pauseOnBlur&&(x(l,"focus",function(){yt&&xe.loop()}),x(l,"blur",function(){yt&&dt&&(xe.noLoop(),yt=!0),ce()}))
var _r=be.options.globalKeyEvents?l:de
x(_r,"keydown",pe),x(_r,"keypress",me),x(_r,"keyup",ge)
for(var Rr in E.lib)E.lib.hasOwnProperty(Rr)&&(E.lib[Rr].hasOwnProperty("attach")?E.lib[Rr].attach(xe):E.lib[Rr]instanceof Function&&E.lib[Rr].call(this))
var Lr=100,Ir=function(e){if(be.imageCache.pending||PFont.preloading.pending(Lr))l.setTimeout(function(){Ir(e)},Lr)
else{if(l.opera){var t,n,i=be.imageCache.operaCache
for(t in i)i.hasOwnProperty(t)&&(n=i[t],null!==n&&h.body.removeChild(n),delete i[t])}be.attach(e,r),be.onLoad(e),e.setup&&(e.setup(),e.resetMatrix(),be.onSetup()),q(),e.draw&&(yt?e.loop():e.redraw())}}
b(this),Ir(xe)}}
return E.debug=function(){return"console"in l?function(e){l.console.log("Processing.js: "+e)}:u}(),E.prototype=r,E.instances=x,E.getInstanceById=function(e){return x[A[e]]},function(e){function t(e){return function(){throw"Processing.js does not support "+e+"."}}for(var n,r,i="open() createOutput() createInput() BufferedReader selectFolder() dataPath() createWriter() selectOutput() beginRecord() saveStream() endRecord() selectInput() saveBytes() createReader() beginRaw() endRaw() PrintWriter delay()".split(" "),s=i.length;s--;)n=i[s],r=n.replace("()",""),e[r]=t(n)}(r),E}},{}],28:[function(e,t,n){var r={virtEquals:e("./Helpers/virtEquals"),virtHashCode:e("./Helpers/virtHashCode"),ObjectIterator:e("./Helpers/ObjectIterator"),PConstants:e("./Helpers/PConstants"),ArrayList:e("./Objects/ArrayList"),HashMap:e("./Objects/HashMap"),PVector:e("./Objects/PVector"),PFont:e("./Objects/PFont"),Char:e("./Objects/Char"),XMLAttribute:e("./Objects/XMLAttribute"),XMLElement:e("./Objects/XMLElement"),PMatrix2D:e("./Objects/PMatrix2D"),PMatrix3D:e("./Objects/PMatrix3D"),PShape:e("./Objects/PShape"),colors:e("./Objects/webcolors"),PShapeSVG:e("./Objects/PShapeSVG"),CommonFunctions:e("./P5Functions/commonFunctions"),defaultScope:e("./Helpers/defaultScope"),Processing:e("./Processing"),setupParser:e("./Parser/Parser"),finalize:e("./Helpers/finalizeProcessing")}
r.extend={withMath:e("./P5Functions/Math.js"),withProxyFunctions:e("./P5Functions/JavaProxyFunctions")(r.virtHashCode,r.virtEquals),withTouch:e("./P5Functions/touchmouse"),withCommonFunctions:r.CommonFunctions.withCommonFunctions},t.exports=function(t,n){var i=function(){},s=r.virtEquals,o=r.virtHashCode,a=r.PConstants,l=r.CommonFunctions,h=r.ObjectIterator,u=r.Char,c=r.XMLAttribute(),f=r.ArrayList({virtHashCode:o,virtEquals:s}),p=r.HashMap({virtHashCode:o,virtEquals:s}),m=r.PVector({PConstants:a}),g=r.PFont({Browser:t,noop:i}),d=r.XMLElement({Browser:t,XMLAttribute:c}),v=r.PMatrix2D({p:l}),y=r.PMatrix3D({p:l}),x=r.PShape({PConstants:a,PMatrix2D:v,PMatrix3D:y}),A=r.PShapeSVG({CommonFunctions:l,PConstants:a,PShape:x,XMLElement:d,colors:r.colors}),b=r.defaultScope({ArrayList:f,HashMap:p,PVector:m,PFont:g,PShapeSVG:A,ObjectIterator:h,PConstants:a,Char:u,XMLElement:d,XML:d}),w=r.Processing({defaultScope:b,Browser:t,extend:r.extend,noop:i})
return w=r.setupParser(w,{Browser:t,aFunctions:n,defaultScope:b}),w=r.finalize(w,{version:e("../package.json").version,isDomPresent:t.isDomPresent,window:t.window,document:t.document,noop:i})}},{"../package.json":2,"./Helpers/ObjectIterator":3,"./Helpers/PConstants":4,"./Helpers/defaultScope":6,"./Helpers/finalizeProcessing":7,"./Helpers/virtEquals":8,"./Helpers/virtHashCode":9,"./Objects/ArrayList":10,"./Objects/Char":11,"./Objects/HashMap":12,"./Objects/PFont":13,"./Objects/PMatrix2D":14,"./Objects/PMatrix3D":15,"./Objects/PShape":16,"./Objects/PShapeSVG":17,"./Objects/PVector":18,"./Objects/XMLAttribute":19,"./Objects/XMLElement":20,"./Objects/webcolors":21,"./P5Functions/JavaProxyFunctions":22,"./P5Functions/Math.js":23,"./P5Functions/commonFunctions":24,"./P5Functions/touchmouse":25,"./Parser/Parser":26,"./Processing":27}]},{},[1])
