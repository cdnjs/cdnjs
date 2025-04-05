(function(Ee,ue){typeof exports=="object"&&typeof module<"u"?module.exports=ue():typeof define=="function"&&define.amd?define(ue):(Ee=typeof globalThis<"u"?globalThis:Ee||self,Ee.Sigma=ue())})(this,function(){"use strict";function Ee(r,e){if(typeof r!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var n=t.call(r,e||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function ue(r){var e=Ee(r,"string");return typeof e=="symbol"?e:e+""}function ne(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function oi(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,ue(n.key),n)}}function ie(r,e,t){return e&&oi(r.prototype,e),Object.defineProperty(r,"prototype",{writable:!1}),r}function he(r){return he=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},he(r)}function lr(){try{var r=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(lr=function(){return!!r})()}function ai(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function si(r,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return ai(r)}function Te(r,e,t){return e=he(e),si(r,lr()?Reflect.construct(e,t||[],he(r).constructor):e.apply(r,t))}function tt(r,e){return tt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},tt(r,e)}function Re(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),Object.defineProperty(r,"prototype",{writable:!1}),e&&tt(r,e)}var rt={black:"#000000",silver:"#C0C0C0",gray:"#808080",grey:"#808080",white:"#FFFFFF",maroon:"#800000",red:"#FF0000",purple:"#800080",fuchsia:"#FF00FF",green:"#008000",lime:"#00FF00",olive:"#808000",yellow:"#FFFF00",navy:"#000080",blue:"#0000FF",teal:"#008080",aqua:"#00FFFF",darkblue:"#00008B",mediumblue:"#0000CD",darkgreen:"#006400",darkcyan:"#008B8B",deepskyblue:"#00BFFF",darkturquoise:"#00CED1",mediumspringgreen:"#00FA9A",springgreen:"#00FF7F",cyan:"#00FFFF",midnightblue:"#191970",dodgerblue:"#1E90FF",lightseagreen:"#20B2AA",forestgreen:"#228B22",seagreen:"#2E8B57",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",limegreen:"#32CD32",mediumseagreen:"#3CB371",turquoise:"#40E0D0",royalblue:"#4169E1",steelblue:"#4682B4",darkslateblue:"#483D8B",mediumturquoise:"#48D1CC",indigo:"#4B0082",darkolivegreen:"#556B2F",cadetblue:"#5F9EA0",cornflowerblue:"#6495ED",rebeccapurple:"#663399",mediumaquamarine:"#66CDAA",dimgray:"#696969",dimgrey:"#696969",slateblue:"#6A5ACD",olivedrab:"#6B8E23",slategray:"#708090",slategrey:"#708090",lightslategray:"#778899",lightslategrey:"#778899",mediumslateblue:"#7B68EE",lawngreen:"#7CFC00",chartreuse:"#7FFF00",aquamarine:"#7FFFD4",skyblue:"#87CEEB",lightskyblue:"#87CEFA",blueviolet:"#8A2BE2",darkred:"#8B0000",darkmagenta:"#8B008B",saddlebrown:"#8B4513",darkseagreen:"#8FBC8F",lightgreen:"#90EE90",mediumpurple:"#9370DB",darkviolet:"#9400D3",palegreen:"#98FB98",darkorchid:"#9932CC",yellowgreen:"#9ACD32",sienna:"#A0522D",brown:"#A52A2A",darkgray:"#A9A9A9",darkgrey:"#A9A9A9",lightblue:"#ADD8E6",greenyellow:"#ADFF2F",paleturquoise:"#AFEEEE",lightsteelblue:"#B0C4DE",powderblue:"#B0E0E6",firebrick:"#B22222",darkgoldenrod:"#B8860B",mediumorchid:"#BA55D3",rosybrown:"#BC8F8F",darkkhaki:"#BDB76B",mediumvioletred:"#C71585",indianred:"#CD5C5C",peru:"#CD853F",chocolate:"#D2691E",tan:"#D2B48C",lightgray:"#D3D3D3",lightgrey:"#D3D3D3",thistle:"#D8BFD8",orchid:"#DA70D6",goldenrod:"#DAA520",palevioletred:"#DB7093",crimson:"#DC143C",gainsboro:"#DCDCDC",plum:"#DDA0DD",burlywood:"#DEB887",lightcyan:"#E0FFFF",lavender:"#E6E6FA",darksalmon:"#E9967A",violet:"#EE82EE",palegoldenrod:"#EEE8AA",lightcoral:"#F08080",khaki:"#F0E68C",aliceblue:"#F0F8FF",honeydew:"#F0FFF0",azure:"#F0FFFF",sandybrown:"#F4A460",wheat:"#F5DEB3",beige:"#F5F5DC",whitesmoke:"#F5F5F5",mintcream:"#F5FFFA",ghostwhite:"#F8F8FF",salmon:"#FA8072",antiquewhite:"#FAEBD7",linen:"#FAF0E6",lightgoldenrodyellow:"#FAFAD2",oldlace:"#FDF5E6",magenta:"#FF00FF",deeppink:"#FF1493",orangered:"#FF4500",tomato:"#FF6347",hotpink:"#FF69B4",coral:"#FF7F50",darkorange:"#FF8C00",lightsalmon:"#FFA07A",orange:"#FFA500",lightpink:"#FFB6C1",pink:"#FFC0CB",gold:"#FFD700",peachpuff:"#FFDAB9",navajowhite:"#FFDEAD",moccasin:"#FFE4B5",bisque:"#FFE4C4",mistyrose:"#FFE4E1",blanchedalmond:"#FFEBCD",papayawhip:"#FFEFD5",lavenderblush:"#FFF0F5",seashell:"#FFF5EE",cornsilk:"#FFF8DC",lemonchiffon:"#FFFACD",floralwhite:"#FFFAF0",snow:"#FFFAFA",lightyellow:"#FFFFE0",ivory:"#FFFFF0"},ur=new Int8Array(4),De=new Int32Array(ur.buffer,0,1),hr=new Float32Array(ur.buffer,0,1),ci=/^\s*rgba?\s*\(/,li=/^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;function ui(r){var e=0,t=0,n=0,i=1;if(r[0]==="#")r.length===4?(e=parseInt(r.charAt(1)+r.charAt(1),16),t=parseInt(r.charAt(2)+r.charAt(2),16),n=parseInt(r.charAt(3)+r.charAt(3),16)):(e=parseInt(r.charAt(1)+r.charAt(2),16),t=parseInt(r.charAt(3)+r.charAt(4),16),n=parseInt(r.charAt(5)+r.charAt(6),16)),r.length===9&&(i=parseInt(r.charAt(7)+r.charAt(8),16)/255);else if(ci.test(r)){var o=r.match(li);o&&(e=+o[1],t=+o[2],n=+o[3],o[4]&&(i=+o[4]))}return{r:e,g:t,b:n,a:i}}var de={};for(var Oe in rt)de[Oe]=X(rt[Oe]),de[rt[Oe]]=de[Oe];function dr(r,e,t,n,i){return De[0]=n<<24|t<<16|e<<8|r,De[0]=De[0]&4278190079,hr[0]}function X(r){if(r=r.toLowerCase(),typeof de[r]<"u")return de[r];var e=ui(r),t=e.r,n=e.g,i=e.b,o=e.a;o=o*255|0;var a=dr(t,n,i,o);return de[r]=a,a}function nt(r,e){hr[0]=X(r);var t=De[0],n=t&255,i=t>>8&255,o=t>>16&255,a=t>>24&255;return[n,i,o,a]}var it={};function fr(r){if(typeof it[r]<"u")return it[r];var e=(r&16711680)>>>16,t=(r&65280)>>>8,n=r&255,i=255,o=dr(e,t,n,i);return it[r]=o,o}function I(r,e,t){return(e=ue(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function gr(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function fe(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?gr(Object(t),!0).forEach(function(n){I(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):gr(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function hi(r,e){for(;!{}.hasOwnProperty.call(r,e)&&(r=he(r))!==null;);return r}function ot(){return ot=typeof Reflect<"u"&&Reflect.get?Reflect.get.bind():function(r,e,t){var n=hi(r,e);if(n){var i=Object.getOwnPropertyDescriptor(n,e);return i.get?i.get.call(arguments.length<3?r:t):i.value}},ot.apply(null,arguments)}function mr(r,e,t,n){var i=ot(he(r.prototype),e,t);return typeof i=="function"?function(o){return i.apply(t,o)}:i}function di(r){return r.normalized?1:r.size}function at(r){var e=0;return r.forEach(function(t){return e+=di(t)}),e}function vr(r,e,t){var n=r==="VERTEX"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,i=e.createShader(n);if(i===null)throw new Error("loadShader: error while creating the shader");e.shaderSource(i,t),e.compileShader(i);var o=e.getShaderParameter(i,e.COMPILE_STATUS);if(!o){var a=e.getShaderInfoLog(i);throw e.deleteShader(i),new Error(`loadShader: error while compiling the shader:
`.concat(a,`
`).concat(t))}return i}function fi(r,e){return vr("VERTEX",r,e)}function gi(r,e){return vr("FRAGMENT",r,e)}function mi(r,e){var t=r.createProgram();if(t===null)throw new Error("loadProgram: error while creating the program.");var n,i;for(n=0,i=e.length;n<i;n++)r.attachShader(t,e[n]);r.linkProgram(t);var o=r.getProgramParameter(t,r.LINK_STATUS);if(!o)throw r.deleteProgram(t),new Error("loadProgram: error while linking the program.");return t}function pr(r){var e=r.gl,t=r.buffer,n=r.program,i=r.vertexShader,o=r.fragmentShader;e.deleteShader(i),e.deleteShader(o),e.deleteProgram(n),e.deleteBuffer(t)}function st(r){return r%1===0?r.toFixed(1):r.toString()}var _r=`#define PICKING_MODE
`,vi=I(I(I(I(I(I(I(I({},WebGL2RenderingContext.BOOL,1),WebGL2RenderingContext.BYTE,1),WebGL2RenderingContext.UNSIGNED_BYTE,1),WebGL2RenderingContext.SHORT,2),WebGL2RenderingContext.UNSIGNED_SHORT,2),WebGL2RenderingContext.INT,4),WebGL2RenderingContext.UNSIGNED_INT,4),WebGL2RenderingContext.FLOAT,4),br=function(){function r(e,t,n){ne(this,r),I(this,"array",new Float32Array),I(this,"constantArray",new Float32Array),I(this,"capacity",0),I(this,"verticesCount",0);var i=this.getDefinition();if(this.VERTICES=i.VERTICES,this.VERTEX_SHADER_SOURCE=i.VERTEX_SHADER_SOURCE,this.FRAGMENT_SHADER_SOURCE=i.FRAGMENT_SHADER_SOURCE,this.UNIFORMS=i.UNIFORMS,this.ATTRIBUTES=i.ATTRIBUTES,this.METHOD=i.METHOD,this.CONSTANT_ATTRIBUTES="CONSTANT_ATTRIBUTES"in i?i.CONSTANT_ATTRIBUTES:[],this.CONSTANT_DATA="CONSTANT_DATA"in i?i.CONSTANT_DATA:[],this.isInstanced="CONSTANT_ATTRIBUTES"in i,this.ATTRIBUTES_ITEMS_COUNT=at(this.ATTRIBUTES),this.STRIDE=this.VERTICES*this.ATTRIBUTES_ITEMS_COUNT,this.renderer=n,this.normalProgram=this.getProgramInfo("normal",e,i.VERTEX_SHADER_SOURCE,i.FRAGMENT_SHADER_SOURCE,null),this.pickProgram=t?this.getProgramInfo("pick",e,_r+i.VERTEX_SHADER_SOURCE,_r+i.FRAGMENT_SHADER_SOURCE,t):null,this.isInstanced){var o=at(this.CONSTANT_ATTRIBUTES);if(this.CONSTANT_DATA.length!==this.VERTICES)throw new Error("Program: error while getting constant data (expected ".concat(this.VERTICES," items, received ").concat(this.CONSTANT_DATA.length," instead)"));this.constantArray=new Float32Array(this.CONSTANT_DATA.length*o);for(var a=0;a<this.CONSTANT_DATA.length;a++){var s=this.CONSTANT_DATA[a];if(s.length!==o)throw new Error("Program: error while getting constant data (one vector has ".concat(s.length," items instead of ").concat(o,")"));for(var l=0;l<s.length;l++)this.constantArray[a*o+l]=s[l]}this.STRIDE=this.ATTRIBUTES_ITEMS_COUNT}}return ie(r,[{key:"kill",value:function(){pr(this.normalProgram),this.pickProgram&&(pr(this.pickProgram),this.pickProgram=null)}},{key:"getProgramInfo",value:function(t,n,i,o,a){var s=this.getDefinition(),l=n.createBuffer();if(l===null)throw new Error("Program: error while creating the WebGL buffer.");var c=fi(n,i),u=gi(n,o),d=mi(n,[c,u]),h={};s.UNIFORMS.forEach(function(b){var E=n.getUniformLocation(d,b);E&&(h[b]=E)});var m={};s.ATTRIBUTES.forEach(function(b){m[b.name]=n.getAttribLocation(d,b.name)});var g;if("CONSTANT_ATTRIBUTES"in s&&(s.CONSTANT_ATTRIBUTES.forEach(function(b){m[b.name]=n.getAttribLocation(d,b.name)}),g=n.createBuffer(),g===null))throw new Error("Program: error while creating the WebGL constant buffer.");return{name:t,program:d,gl:n,frameBuffer:a,buffer:l,constantBuffer:g||{},uniformLocations:h,attributeLocations:m,isPicking:t==="pick",vertexShader:c,fragmentShader:u}}},{key:"bindProgram",value:function(t){var n=this,i=0,o=t.gl,a=t.buffer;this.isInstanced?(o.bindBuffer(o.ARRAY_BUFFER,t.constantBuffer),i=0,this.CONSTANT_ATTRIBUTES.forEach(function(s){return i+=n.bindAttribute(s,t,i,!1)}),o.bufferData(o.ARRAY_BUFFER,this.constantArray,o.STATIC_DRAW),o.bindBuffer(o.ARRAY_BUFFER,t.buffer),i=0,this.ATTRIBUTES.forEach(function(s){return i+=n.bindAttribute(s,t,i,!0)}),o.bufferData(o.ARRAY_BUFFER,this.array,o.DYNAMIC_DRAW)):(o.bindBuffer(o.ARRAY_BUFFER,a),i=0,this.ATTRIBUTES.forEach(function(s){return i+=n.bindAttribute(s,t,i)}),o.bufferData(o.ARRAY_BUFFER,this.array,o.DYNAMIC_DRAW)),o.bindBuffer(o.ARRAY_BUFFER,null)}},{key:"unbindProgram",value:function(t){var n=this;this.isInstanced?(this.CONSTANT_ATTRIBUTES.forEach(function(i){return n.unbindAttribute(i,t,!1)}),this.ATTRIBUTES.forEach(function(i){return n.unbindAttribute(i,t,!0)})):this.ATTRIBUTES.forEach(function(i){return n.unbindAttribute(i,t)})}},{key:"bindAttribute",value:function(t,n,i,o){var a=vi[t.type];if(typeof a!="number")throw new Error('Program.bind: yet unsupported attribute type "'.concat(t.type,'"'));var s=n.attributeLocations[t.name],l=n.gl;if(s!==-1){l.enableVertexAttribArray(s);var c=this.isInstanced?(o?this.ATTRIBUTES_ITEMS_COUNT:at(this.CONSTANT_ATTRIBUTES))*Float32Array.BYTES_PER_ELEMENT:this.ATTRIBUTES_ITEMS_COUNT*Float32Array.BYTES_PER_ELEMENT;if(l.vertexAttribPointer(s,t.size,t.type,t.normalized||!1,c,i),this.isInstanced&&o)if(l instanceof WebGL2RenderingContext)l.vertexAttribDivisor(s,1);else{var u=l.getExtension("ANGLE_instanced_arrays");u&&u.vertexAttribDivisorANGLE(s,1)}}return t.size*a}},{key:"unbindAttribute",value:function(t,n,i){var o=n.attributeLocations[t.name],a=n.gl;if(o!==-1&&(a.disableVertexAttribArray(o),this.isInstanced&&i))if(a instanceof WebGL2RenderingContext)a.vertexAttribDivisor(o,0);else{var s=a.getExtension("ANGLE_instanced_arrays");s&&s.vertexAttribDivisorANGLE(o,0)}}},{key:"reallocate",value:function(t){t!==this.capacity&&(this.capacity=t,this.verticesCount=this.VERTICES*t,this.array=new Float32Array(this.isInstanced?this.capacity*this.ATTRIBUTES_ITEMS_COUNT:this.verticesCount*this.ATTRIBUTES_ITEMS_COUNT))}},{key:"hasNothingToRender",value:function(){return this.verticesCount===0}},{key:"renderProgram",value:function(t,n){var i=n.gl,o=n.program;i.enable(i.BLEND),i.useProgram(o),this.setUniforms(t,n),this.drawWebGL(this.METHOD,n)}},{key:"render",value:function(t){this.hasNothingToRender()||(this.pickProgram&&(this.pickProgram.gl.viewport(0,0,t.width*t.pixelRatio/t.downSizingRatio,t.height*t.pixelRatio/t.downSizingRatio),this.bindProgram(this.pickProgram),this.renderProgram(fe(fe({},t),{},{pixelRatio:t.pixelRatio/t.downSizingRatio}),this.pickProgram),this.unbindProgram(this.pickProgram)),this.normalProgram.gl.viewport(0,0,t.width*t.pixelRatio,t.height*t.pixelRatio),this.bindProgram(this.normalProgram),this.renderProgram(t,this.normalProgram),this.unbindProgram(this.normalProgram))}},{key:"drawWebGL",value:function(t,n){var i=n.gl,o=n.frameBuffer;if(i.bindFramebuffer(i.FRAMEBUFFER,o),!this.isInstanced)i.drawArrays(t,0,this.verticesCount);else if(i instanceof WebGL2RenderingContext)i.drawArraysInstanced(t,0,this.VERTICES,this.capacity);else{var a=i.getExtension("ANGLE_instanced_arrays");a&&a.drawArraysInstancedANGLE(t,0,this.VERTICES,this.capacity)}}}])}(),ke=function(r){function e(){return ne(this,e),Te(this,e,arguments)}return Re(e,r),ie(e,[{key:"kill",value:function(){mr(e,"kill",this)([])}},{key:"process",value:function(n,i,o){var a=i*this.STRIDE;if(o.hidden){for(var s=a+this.STRIDE;a<s;a++)this.array[a]=0;return}return this.processVisibleItem(fr(n),a,o)}}])}(br),ct=function(r){function e(){var t;ne(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return t=Te(this,e,[].concat(i)),I(t,"drawLabel",void 0),t}return Re(e,r),ie(e,[{key:"kill",value:function(){mr(e,"kill",this)([])}},{key:"process",value:function(n,i,o,a,s){var l=i*this.STRIDE;if(s.hidden||o.hidden||a.hidden){for(var c=l+this.STRIDE;l<c;l++)this.array[l]=0;return}return this.processVisibleItem(fr(n),l,o,a,s)}}])}(br);function pi(r,e){return function(){function t(n,i,o){ne(this,t),I(this,"drawLabel",e),this.programs=r.map(function(a){return new a(n,i,o)})}return ie(t,[{key:"reallocate",value:function(i){this.programs.forEach(function(o){return o.reallocate(i)})}},{key:"process",value:function(i,o,a,s,l){this.programs.forEach(function(c){return c.process(i,o,a,s,l)})}},{key:"render",value:function(i){this.programs.forEach(function(o){return o.render(i)})}},{key:"kill",value:function(){this.programs.forEach(function(i){return i.kill()})}}])}()}var _i=`
precision highp float;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;

uniform float u_correctionRatio;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float border = u_correctionRatio * 2.0;
  float dist = length(v_diffVector) - v_radius + border;

  // No antialiasing for picking mode:
  #ifdef PICKING_MODE
  if (dist > border)
    gl_FragColor = transparent;
  else
    gl_FragColor = v_color;

  #else
  float t = 0.0;
  if (dist > border)
    t = 1.0;
  else if (dist > 0.0)
    t = dist / border;

  gl_FragColor = mix(v_color, transparent, t);
  #endif
}
`,bi=_i,yi=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_position;
attribute float a_size;
attribute float a_angle;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;
varying float v_border;

const float bias = 255.0 / 254.0;

void main() {
  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;
  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));
  vec2 position = a_position + diffVector;
  gl_Position = vec4(
    (u_matrix * vec3(position, 1)).xy,
    0,
    1
  );

  v_diffVector = diffVector;
  v_radius = size / 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,Ei=yi,yr=WebGLRenderingContext,Er=yr.UNSIGNED_BYTE,lt=yr.FLOAT,Ti=["u_sizeRatio","u_correctionRatio","u_matrix"],ut=function(r){function e(){return ne(this,e),Te(this,e,arguments)}return Re(e,r),ie(e,[{key:"getDefinition",value:function(){return{VERTICES:3,VERTEX_SHADER_SOURCE:Ei,FRAGMENT_SHADER_SOURCE:bi,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Ti,ATTRIBUTES:[{name:"a_position",size:2,type:lt},{name:"a_size",size:1,type:lt},{name:"a_color",size:4,type:Er,normalized:!0},{name:"a_id",size:4,type:Er,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_angle",size:1,type:lt}],CONSTANT_DATA:[[e.ANGLE_1],[e.ANGLE_2],[e.ANGLE_3]]}}},{key:"processVisibleItem",value:function(n,i,o){var a=this.array,s=X(o.color);a[i++]=o.x,a[i++]=o.y,a[i++]=o.size,a[i++]=s,a[i++]=n}},{key:"setUniforms",value:function(n,i){var o=i.gl,a=i.uniformLocations,s=a.u_sizeRatio,l=a.u_correctionRatio,c=a.u_matrix;o.uniform1f(l,n.correctionRatio),o.uniform1f(s,n.sizeRatio),o.uniformMatrix3fv(c,!1,n.matrix)}}])}(ke);I(ut,"ANGLE_1",0),I(ut,"ANGLE_2",2*Math.PI/3),I(ut,"ANGLE_3",4*Math.PI/3);var Ri=`
precision mediump float;

varying vec4 v_color;

void main(void) {
  gl_FragColor = v_color;
}
`,Ci=Ri,wi=`
attribute vec2 a_position;
attribute vec2 a_normal;
attribute float a_radius;
attribute vec3 a_barycentric;

#ifdef PICKING_MODE
attribute vec4 a_id;
#else
attribute vec4 a_color;
#endif

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_widenessToThicknessRatio;

varying vec4 v_color;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  float normalLength = length(a_normal);
  vec2 unitNormal = a_normal / normalLength;

  // These first computations are taken from edge.vert.glsl and
  // edge.clamped.vert.glsl. Please read it to get better comments on what's
  // happening:
  float pixelsThickness = max(normalLength / u_sizeRatio, minThickness);
  float webGLThickness = pixelsThickness * u_correctionRatio;
  float webGLNodeRadius = a_radius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;
  float webGLArrowHeadThickness = webGLThickness * u_widenessToThicknessRatio;

  float da = a_barycentric.x;
  float db = a_barycentric.y;
  float dc = a_barycentric.z;

  vec2 delta = vec2(
      da * (webGLNodeRadius * unitNormal.y)
    + db * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y + webGLArrowHeadThickness * unitNormal.x)
    + dc * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y - webGLArrowHeadThickness * unitNormal.x),

      da * (-webGLNodeRadius * unitNormal.x)
    + db * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x + webGLArrowHeadThickness * unitNormal.y)
    + dc * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x - webGLArrowHeadThickness * unitNormal.y)
  );

  vec2 position = (u_matrix * vec3(a_position + delta, 1)).xy;

  gl_Position = vec4(position, 0, 1);

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,Ai=wi,Tr=WebGLRenderingContext,Rr=Tr.UNSIGNED_BYTE,Ie=Tr.FLOAT,Si=["u_matrix","u_sizeRatio","u_correctionRatio","u_minEdgeThickness","u_lengthToThicknessRatio","u_widenessToThicknessRatio"],ze={extremity:"target",lengthToThicknessRatio:2.5,widenessToThicknessRatio:2};function Cr(r){var e=fe(fe({},ze),{});return function(t){function n(){return ne(this,n),Te(this,n,arguments)}return Re(n,t),ie(n,[{key:"getDefinition",value:function(){return{VERTICES:3,VERTEX_SHADER_SOURCE:Ai,FRAGMENT_SHADER_SOURCE:Ci,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Si,ATTRIBUTES:[{name:"a_position",size:2,type:Ie},{name:"a_normal",size:2,type:Ie},{name:"a_radius",size:1,type:Ie},{name:"a_color",size:4,type:Rr,normalized:!0},{name:"a_id",size:4,type:Rr,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_barycentric",size:3,type:Ie}],CONSTANT_DATA:[[1,0,0],[0,1,0],[0,0,1]]}}},{key:"processVisibleItem",value:function(o,a,s,l,c){if(e.extremity==="source"){var u=[l,s];s=u[0],l=u[1]}var d=c.size||1,h=l.size||1,m=s.x,g=s.y,b=l.x,E=l.y,v=X(c.color),T=b-m,_=E-g,f=T*T+_*_,p=0,y=0;f&&(f=1/Math.sqrt(f),p=-_*f*d,y=T*f*d);var R=this.array;R[a++]=b,R[a++]=E,R[a++]=-p,R[a++]=-y,R[a++]=h,R[a++]=v,R[a++]=o}},{key:"setUniforms",value:function(o,a){var s=a.gl,l=a.uniformLocations,c=l.u_matrix,u=l.u_sizeRatio,d=l.u_correctionRatio,h=l.u_minEdgeThickness,m=l.u_lengthToThicknessRatio,g=l.u_widenessToThicknessRatio;s.uniformMatrix3fv(c,!1,o.matrix),s.uniform1f(u,o.sizeRatio),s.uniform1f(d,o.correctionRatio),s.uniform1f(h,o.minEdgeThickness),s.uniform1f(m,e.lengthToThicknessRatio),s.uniform1f(g,e.widenessToThicknessRatio)}}])}(ct)}Cr();var xi=`
precision mediump float;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  // We only handle antialiasing for normal mode:
  #ifdef PICKING_MODE
  gl_FragColor = v_color;
  #else
  float dist = length(v_normal) * v_thickness;

  float t = smoothstep(
    v_thickness - v_feather,
    v_thickness,
    dist
  );

  gl_FragColor = mix(v_color, transparent, t);
  #endif
}
`,Li=xi,Fi=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;
attribute float a_radius;
attribute float a_radiusCoef;

uniform mat3 u_matrix;
uniform float u_zoomRatio;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  float radius = a_radius * a_radiusCoef;
  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // These first computations are taken from edge.vert.glsl. Please read it to
  // get better comments on what's happening:
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here, we move the point to leave space for the arrow head:
  float direction = sign(radius);
  float webGLNodeRadius = direction * radius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;

  vec2 compensationVector = vec2(-direction * unitNormal.y, direction * unitNormal.x) * (webGLNodeRadius + webGLArrowHeadLength);

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness + compensationVector, 1)).xy, 0, 1);

  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,Ni=Fi,wr=WebGLRenderingContext,Ar=wr.UNSIGNED_BYTE,oe=wr.FLOAT,Pi=["u_matrix","u_zoomRatio","u_sizeRatio","u_correctionRatio","u_pixelRatio","u_feather","u_minEdgeThickness","u_lengthToThicknessRatio"],Di={lengthToThicknessRatio:ze.lengthToThicknessRatio};function Sr(r){var e=fe(fe({},Di),{});return function(t){function n(){return ne(this,n),Te(this,n,arguments)}return Re(n,t),ie(n,[{key:"getDefinition",value:function(){return{VERTICES:6,VERTEX_SHADER_SOURCE:Ni,FRAGMENT_SHADER_SOURCE:Li,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Pi,ATTRIBUTES:[{name:"a_positionStart",size:2,type:oe},{name:"a_positionEnd",size:2,type:oe},{name:"a_normal",size:2,type:oe},{name:"a_color",size:4,type:Ar,normalized:!0},{name:"a_id",size:4,type:Ar,normalized:!0},{name:"a_radius",size:1,type:oe}],CONSTANT_ATTRIBUTES:[{name:"a_positionCoef",size:1,type:oe},{name:"a_normalCoef",size:1,type:oe},{name:"a_radiusCoef",size:1,type:oe}],CONSTANT_DATA:[[0,1,0],[0,-1,0],[1,1,1],[1,1,1],[0,-1,0],[1,-1,-1]]}}},{key:"processVisibleItem",value:function(o,a,s,l,c){var u=c.size||1,d=s.x,h=s.y,m=l.x,g=l.y,b=X(c.color),E=m-d,v=g-h,T=l.size||1,_=E*E+v*v,f=0,p=0;_&&(_=1/Math.sqrt(_),f=-v*_*u,p=E*_*u);var y=this.array;y[a++]=d,y[a++]=h,y[a++]=m,y[a++]=g,y[a++]=f,y[a++]=p,y[a++]=b,y[a++]=o,y[a++]=T}},{key:"setUniforms",value:function(o,a){var s=a.gl,l=a.uniformLocations,c=l.u_matrix,u=l.u_zoomRatio,d=l.u_feather,h=l.u_pixelRatio,m=l.u_correctionRatio,g=l.u_sizeRatio,b=l.u_minEdgeThickness,E=l.u_lengthToThicknessRatio;s.uniformMatrix3fv(c,!1,o.matrix),s.uniform1f(u,o.zoomRatio),s.uniform1f(g,o.sizeRatio),s.uniform1f(m,o.correctionRatio),s.uniform1f(h,o.pixelRatio),s.uniform1f(d,o.antiAliasingFeather),s.uniform1f(b,o.minEdgeThickness),s.uniform1f(E,e.lengthToThicknessRatio)}}])}(ct)}Sr();function Oi(r){return pi([Sr(),Cr()])}Oi();function ki(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var ht,xr;function Ii(){return xr||(xr=1,ht=function(e){return e!==null&&typeof e=="object"&&typeof e.addUndirectedEdgeWithKey=="function"&&typeof e.dropNode=="function"&&typeof e.multi=="boolean"}),ht}var zi=Ii();const Gi=ki(zi);function Mi(r,e){if(typeof r!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var n=t.call(r,e||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function Lr(r){var e=Mi(r,"string");return typeof e=="symbol"?e:e+""}function Fr(r,e,t){return(e=Lr(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function Nr(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function Ge(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Nr(Object(t),!0).forEach(function(n){Fr(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Nr(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function Ui(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Bi(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,Lr(n.key),n)}}function Hi(r,e,t){return Bi(r.prototype,e),Object.defineProperty(r,"prototype",{writable:!1}),r}function Me(r){return Me=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},Me(r)}function Pr(){try{var r=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(Pr=function(){return!!r})()}function $i(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ji(r,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return $i(r)}function Vi(r,e,t){return e=Me(e),ji(r,Pr()?Reflect.construct(e,t,Me(r).constructor):e.apply(r,t))}function dt(r,e){return dt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},dt(r,e)}function Wi(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),Object.defineProperty(r,"prototype",{writable:!1}),e&&dt(r,e)}function ft(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=Array(e);t<e;t++)n[t]=r[t];return n}function Yi(r){if(Array.isArray(r))return ft(r)}function Xi(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function qi(r,e){if(r){if(typeof r=="string")return ft(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?ft(r,e):void 0}}function Ki(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function gt(r){return Yi(r)||Xi(r)||qi(r)||Ki()}function Dr(r,e,t,n){var i=Math.pow(1-r,2)*e.x+2*(1-r)*r*t.x+Math.pow(r,2)*n.x,o=Math.pow(1-r,2)*e.y+2*(1-r)*r*t.y+Math.pow(r,2)*n.y;return{x:i,y:o}}function Zi(r,e,t){for(var n=20,i=0,o=r,a=0;a<n;a++){var s=Dr((a+1)/n,r,e,t);i+=Math.sqrt(Math.pow(o.x-s.x,2)+Math.pow(o.y-s.y,2)),o=s}return i}function Qi(r){var e=r.curvatureAttribute,t=r.defaultCurvature,n=r.keepLabelUpright,i=n===void 0?!0:n;return function(o,a,s,l,c){var u=c.edgeLabelSize,d=a[e]||t,h=c.edgeLabelFont,m=c.edgeLabelWeight,g=c.edgeLabelColor.attribute?a[c.edgeLabelColor.attribute]||c.edgeLabelColor.color||"#000":c.edgeLabelColor.color,b=a.label;if(b){o.fillStyle=g,o.font="".concat(m," ").concat(u,"px ").concat(h);var E=!i||s.x<l.x,v=E?s.x:l.x,T=E?s.y:l.y,_=E?l.x:s.x,f=E?l.y:s.y,p=(v+_)/2,y=(T+f)/2,R=_-v,S=f-T,F=Math.sqrt(Math.pow(R,2)+Math.pow(S,2)),x=E?1:-1,D=p+S*d*x,k=y-R*d*x,z=a.size*.7+5,M={x:k-T,y:-(D-v)},H=Math.sqrt(Math.pow(M.x,2)+Math.pow(M.y,2)),w={x:f-k,y:-(_-D)},C=Math.sqrt(Math.pow(w.x,2)+Math.pow(w.y,2));v+=z*M.x/H,T+=z*M.y/H,_+=z*w.x/C,f+=z*w.y/C,D+=z*S/F,k-=z*R/F;var A={x:D,y:k},N={x:v,y:T},L={x:_,y:f},P=Zi(N,A,L);if(!(P<s.size+l.size)){var O=o.measureText(b).width,U=P-s.size-l.size;if(O>U){var B="…";for(b=b+B,O=o.measureText(b).width;O>U&&b.length>1;)b=b.slice(0,-2)+B,O=o.measureText(b).width;if(b.length<4)return}for(var Y={},J=0,ee=b.length;J<ee;J++){var sr=b[J];Y[sr]||(Y[sr]=o.measureText(sr).width*(1+d*.35))}for(var ye=.5-O/P/2,cr=0,fs=b.length;cr<fs;cr++){var ni=b[cr],ii=Dr(ye,N,A,L),gs=2*(1-ye)*(D-v)+2*ye*(_-D),ms=2*(1-ye)*(k-T)+2*ye*(f-k),vs=Math.atan2(ms,gs);o.save(),o.translate(ii.x,ii.y),o.rotate(vs),o.fillText(ni,0,0),o.restore(),ye+=Y[ni]/P}}}}}function Ji(r){var e=r.arrowHead,t=(e==null?void 0:e.extremity)==="target"||(e==null?void 0:e.extremity)==="both",n=(e==null?void 0:e.extremity)==="source"||(e==null?void 0:e.extremity)==="both",i=`
precision highp float;

varying vec4 v_color;
varying float v_thickness;
varying float v_feather;
varying vec2 v_cpA;
varying vec2 v_cpB;
varying vec2 v_cpC;
`.concat(t?`
varying float v_targetSize;
varying vec2 v_targetPoint;`:"",`
`).concat(n?`
varying float v_sourceSize;
varying vec2 v_sourcePoint;`:"",`
`).concat(e?`
uniform float u_lengthToThicknessRatio;
uniform float u_widenessToThicknessRatio;`:"",`

float det(vec2 a, vec2 b) {
  return a.x * b.y - b.x * a.y;
}

vec2 getDistanceVector(vec2 b0, vec2 b1, vec2 b2) {
  float a = det(b0, b2), b = 2.0 * det(b1, b0), d = 2.0 * det(b2, b1);
  float f = b * d - a * a;
  vec2 d21 = b2 - b1, d10 = b1 - b0, d20 = b2 - b0;
  vec2 gf = 2.0 * (b * d21 + d * d10 + a * d20);
  gf = vec2(gf.y, -gf.x);
  vec2 pp = -f * gf / dot(gf, gf);
  vec2 d0p = b0 - pp;
  float ap = det(d0p, d20), bp = 2.0 * det(d10, d0p);
  float t = clamp((ap + bp) / (2.0 * a + b + d), 0.0, 1.0);
  return mix(mix(b0, b1, t), mix(b1, b2, t), t);
}

float distToQuadraticBezierCurve(vec2 p, vec2 b0, vec2 b1, vec2 b2) {
  return length(getDistanceVector(b0 - p, b1 - p, b2 - p));
}

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float dist = distToQuadraticBezierCurve(gl_FragCoord.xy, v_cpA, v_cpB, v_cpC);
  float thickness = v_thickness;
`).concat(t?`
  float distToTarget = length(gl_FragCoord.xy - v_targetPoint);
  float targetArrowLength = v_targetSize + thickness * u_lengthToThicknessRatio;
  if (distToTarget < targetArrowLength) {
    thickness = (distToTarget - v_targetSize) / (targetArrowLength - v_targetSize) * u_widenessToThicknessRatio * thickness;
  }`:"",`
`).concat(n?`
  float distToSource = length(gl_FragCoord.xy - v_sourcePoint);
  float sourceArrowLength = v_sourceSize + thickness * u_lengthToThicknessRatio;
  if (distToSource < sourceArrowLength) {
    thickness = (distToSource - v_sourceSize) / (sourceArrowLength - v_sourceSize) * u_widenessToThicknessRatio * thickness;
  }`:"",`

  float halfThickness = thickness / 2.0;
  if (dist < halfThickness) {
    #ifdef PICKING_MODE
    gl_FragColor = v_color;
    #else
    float t = smoothstep(
      halfThickness - v_feather,
      halfThickness,
      dist
    );

    gl_FragColor = mix(v_color, transparent, t);
    #endif
  } else {
    gl_FragColor = transparent;
  }
}
`);return i}function eo(r){var e=r.arrowHead,t=(e==null?void 0:e.extremity)==="target"||(e==null?void 0:e.extremity)==="both",n=(e==null?void 0:e.extremity)==="source"||(e==null?void 0:e.extremity)==="both",i=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute float a_direction;
attribute float a_thickness;
attribute vec2 a_source;
attribute vec2 a_target;
attribute float a_current;
attribute float a_curvature;
`.concat(t?`attribute float a_targetSize;
`:"",`
`).concat(n?`attribute float a_sourceSize;
`:"",`

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform vec2 u_dimensions;
uniform float u_minEdgeThickness;
uniform float u_feather;

varying vec4 v_color;
varying float v_thickness;
varying float v_feather;
varying vec2 v_cpA;
varying vec2 v_cpB;
varying vec2 v_cpC;
`).concat(t?`
varying float v_targetSize;
varying vec2 v_targetPoint;`:"",`
`).concat(n?`
varying float v_sourceSize;
varying vec2 v_sourcePoint;`:"",`
`).concat(e?`
uniform float u_widenessToThicknessRatio;`:"",`

const float bias = 255.0 / 254.0;
const float epsilon = 0.7;

vec2 clipspaceToViewport(vec2 pos, vec2 dimensions) {
  return vec2(
    (pos.x + 1.0) * dimensions.x / 2.0,
    (pos.y + 1.0) * dimensions.y / 2.0
  );
}

vec2 viewportToClipspace(vec2 pos, vec2 dimensions) {
  return vec2(
    pos.x / dimensions.x * 2.0 - 1.0,
    pos.y / dimensions.y * 2.0 - 1.0
  );
}

void main() {
  float minThickness = u_minEdgeThickness;

  // Selecting the correct position
  // Branchless "position = a_source if a_current == 1.0 else a_target"
  vec2 position = a_source * max(0.0, a_current) + a_target * max(0.0, 1.0 - a_current);
  position = (u_matrix * vec3(position, 1)).xy;

  vec2 source = (u_matrix * vec3(a_source, 1)).xy;
  vec2 target = (u_matrix * vec3(a_target, 1)).xy;

  vec2 viewportPosition = clipspaceToViewport(position, u_dimensions);
  vec2 viewportSource = clipspaceToViewport(source, u_dimensions);
  vec2 viewportTarget = clipspaceToViewport(target, u_dimensions);

  vec2 delta = viewportTarget.xy - viewportSource.xy;
  float len = length(delta);
  vec2 normal = vec2(-delta.y, delta.x) * a_direction;
  vec2 unitNormal = normal / len;
  float boundingBoxThickness = len * a_curvature;

  float curveThickness = max(minThickness, a_thickness / u_sizeRatio);
  v_thickness = curveThickness * u_pixelRatio;
  v_feather = u_feather;

  v_cpA = viewportSource;
  v_cpB = 0.5 * (viewportSource + viewportTarget) + unitNormal * a_direction * boundingBoxThickness;
  v_cpC = viewportTarget;

  vec2 viewportOffsetPosition = (
    viewportPosition +
    unitNormal * (boundingBoxThickness / 2.0 + sign(boundingBoxThickness) * (`).concat(e?"curveThickness * u_widenessToThicknessRatio":"curveThickness",` + epsilon)) *
    max(0.0, a_direction) // NOTE: cutting the bounding box in half to avoid overdraw
  );

  position = viewportToClipspace(viewportOffsetPosition, u_dimensions);
  gl_Position = vec4(position, 0, 1);
    
`).concat(t?`
  v_targetSize = a_targetSize * u_pixelRatio / u_sizeRatio;
  v_targetPoint = viewportTarget;
`:"",`
`).concat(n?`
  v_sourceSize = a_sourceSize * u_pixelRatio / u_sizeRatio;
  v_sourcePoint = viewportSource;
`:"",`

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`);return i}var Or=.25,to={arrowHead:null,curvatureAttribute:"curvature",defaultCurvature:Or},kr=WebGLRenderingContext,Ir=kr.UNSIGNED_BYTE,te=kr.FLOAT;function mt(r){var e=Ge(Ge({},to),r||{}),t=e,n=t.arrowHead,i=t.curvatureAttribute,o=t.drawLabel,a=(n==null?void 0:n.extremity)==="target"||(n==null?void 0:n.extremity)==="both",s=(n==null?void 0:n.extremity)==="source"||(n==null?void 0:n.extremity)==="both",l=["u_matrix","u_sizeRatio","u_dimensions","u_pixelRatio","u_feather","u_minEdgeThickness"].concat(gt(n?["u_lengthToThicknessRatio","u_widenessToThicknessRatio"]:[]));return function(c){function u(){var d;Ui(this,u);for(var h=arguments.length,m=new Array(h),g=0;g<h;g++)m[g]=arguments[g];return d=Vi(this,u,[].concat(m)),Fr(d,"drawLabel",o||Qi(e)),d}return Wi(u,c),Hi(u,[{key:"getDefinition",value:function(){return{VERTICES:6,VERTEX_SHADER_SOURCE:eo(e),FRAGMENT_SHADER_SOURCE:Ji(e),METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:l,ATTRIBUTES:[{name:"a_source",size:2,type:te},{name:"a_target",size:2,type:te}].concat(gt(a?[{name:"a_targetSize",size:1,type:te}]:[]),gt(s?[{name:"a_sourceSize",size:1,type:te}]:[]),[{name:"a_thickness",size:1,type:te},{name:"a_curvature",size:1,type:te},{name:"a_color",size:4,type:Ir,normalized:!0},{name:"a_id",size:4,type:Ir,normalized:!0}]),CONSTANT_ATTRIBUTES:[{name:"a_current",size:1,type:te},{name:"a_direction",size:1,type:te}],CONSTANT_DATA:[[0,1],[0,-1],[1,1],[0,-1],[1,1],[1,-1]]}}},{key:"processVisibleItem",value:function(h,m,g,b,E){var v,T=E.size||1,_=g.x,f=g.y,p=b.x,y=b.y,R=X(E.color),S=(v=E[i])!==null&&v!==void 0?v:Or,F=this.array;F[m++]=_,F[m++]=f,F[m++]=p,F[m++]=y,a&&(F[m++]=b.size),s&&(F[m++]=g.size),F[m++]=T,F[m++]=S,F[m++]=R,F[m++]=h}},{key:"setUniforms",value:function(h,m){var g=m.gl,b=m.uniformLocations,E=b.u_matrix,v=b.u_pixelRatio,T=b.u_feather,_=b.u_sizeRatio,f=b.u_dimensions,p=b.u_minEdgeThickness;if(g.uniformMatrix3fv(E,!1,h.matrix),g.uniform1f(v,h.pixelRatio),g.uniform1f(_,h.sizeRatio),g.uniform1f(T,h.antiAliasingFeather),g.uniform2f(f,h.width*h.pixelRatio,h.height*h.pixelRatio),g.uniform1f(p,h.minEdgeThickness),n){var y=b.u_lengthToThicknessRatio,R=b.u_widenessToThicknessRatio;g.uniform1f(y,n.lengthToThicknessRatio),g.uniform1f(R,n.widenessToThicknessRatio)}}}])}(ct)}var ro=mt();mt({arrowHead:ze}),mt({arrowHead:Ge(Ge({},ze),{},{extremity:"both"})});function no(r){if(Array.isArray(r))return r}function io(r,e){var t=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(t!=null){var n,i,o,a,s=[],l=!0,c=!1;try{if(o=(t=t.call(r)).next,e!==0)for(;!(l=(n=o.call(t)).done)&&(s.push(n.value),s.length!==e);l=!0);}catch(u){c=!0,i=u}finally{try{if(!l&&t.return!=null&&(a=t.return(),Object(a)!==a))return}finally{if(c)throw i}}return s}}function vt(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=Array(e);t<e;t++)n[t]=r[t];return n}function zr(r,e){if(r){if(typeof r=="string")return vt(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?vt(r,e):void 0}}function oo(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ao(r,e){return no(r)||io(r,e)||zr(r,e)||oo()}function so(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function co(r,e){if(typeof r!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var n=t.call(r,e||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function Gr(r){var e=co(r,"string");return typeof e=="symbol"?e:e+""}function lo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,Gr(n.key),n)}}function uo(r,e,t){return lo(r.prototype,e),Object.defineProperty(r,"prototype",{writable:!1}),r}function Ue(r){return Ue=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},Ue(r)}function Mr(){try{var r=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(Mr=function(){return!!r})()}function ho(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function fo(r,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return ho(r)}function go(r,e,t){return e=Ue(e),fo(r,Mr()?Reflect.construct(e,t,Ue(r).constructor):e.apply(r,t))}function pt(r,e){return pt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},pt(r,e)}function mo(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),Object.defineProperty(r,"prototype",{writable:!1}),e&&pt(r,e)}function ge(r,e,t){return(e=Gr(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function vo(r){if(Array.isArray(r))return vt(r)}function po(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function _o(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _t(r){return vo(r)||po(r)||zr(r)||_o()}function Ur(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function Br(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Ur(Object(t),!0).forEach(function(n){ge(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Ur(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}var bo="relative",yo={drawLabel:void 0,drawHover:void 0,borders:[{size:{value:.1},color:{attribute:"borderColor"}},{size:{fill:!0},color:{attribute:"color"}}]},Eo="#000000";function To(r){var e=r.borders,t=st(e.filter(function(i){var o=i.size;return"fill"in o}).length),n=`
precision highp float;

varying vec2 v_diffVector;
varying float v_radius;

#ifdef PICKING_MODE
varying vec4 v_color;
#else
// For normal mode, we use the border colors defined in the program:
`.concat(e.flatMap(function(i,o){var a=i.size;return"attribute"in a?["varying float v_borderSize_".concat(o+1,";")]:[]}).join(`
`),`
`).concat(e.flatMap(function(i,o){var a=i.color;return"attribute"in a?["varying vec4 v_borderColor_".concat(o+1,";")]:"value"in a?["uniform vec4 u_borderColor_".concat(o+1,";")]:[]}).join(`
`),`
#endif

uniform float u_correctionRatio;

const float bias = 255.0 / 254.0;
const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float dist = length(v_diffVector);
  float aaBorder = 2.0 * u_correctionRatio;
  float v_borderSize_0 = v_radius;
  vec4 v_borderColor_0 = transparent;

  // No antialiasing for picking mode:
  #ifdef PICKING_MODE
  if (dist > v_radius)
    gl_FragColor = transparent;
  else {
    gl_FragColor = v_color;
    gl_FragColor.a *= bias;
  }
  #else
  // Sizes:
`).concat(e.flatMap(function(i,o){var a=i.size;if("fill"in a)return[];a=a;var s="attribute"in a?"v_borderSize_".concat(o+1):st(a.value),l=(a.mode||bo)==="pixels"?"u_correctionRatio":"v_radius";return["  float borderSize_".concat(o+1," = ").concat(l," * ").concat(s,";")]}).join(`
`),`
  // Now, let's split the remaining space between "fill" borders:
  float fillBorderSize = (v_radius - (`).concat(e.flatMap(function(i,o){var a=i.size;return"fill"in a?[]:["borderSize_".concat(o+1)]}).join(" + "),") ) / ").concat(t,`;
`).concat(e.flatMap(function(i,o){var a=i.size;return"fill"in a?["  float borderSize_".concat(o+1," = fillBorderSize;")]:[]}).join(`
`),`

  // Finally, normalize all border sizes, to start from the full size and to end with the smallest:
  float adjustedBorderSize_0 = v_radius;
`).concat(e.map(function(i,o){return"  float adjustedBorderSize_".concat(o+1," = adjustedBorderSize_").concat(o," - borderSize_").concat(o+1,";")}).join(`
`),`

  // Colors:
  vec4 borderColor_0 = transparent;
`).concat(e.map(function(i,o){var a=i.color,s=[];return"attribute"in a?s.push("  vec4 borderColor_".concat(o+1," = v_borderColor_").concat(o+1,";")):"transparent"in a?s.push("  vec4 borderColor_".concat(o+1," = vec4(0.0, 0.0, 0.0, 0.0);")):s.push("  vec4 borderColor_".concat(o+1," = u_borderColor_").concat(o+1,";")),s.push("  borderColor_".concat(o+1,".a *= bias;")),s.push("  if (borderSize_".concat(o+1," <= 1.0 * u_correctionRatio) { borderColor_").concat(o+1," = borderColor_").concat(o,"; }")),s.join(`
`)}).join(`
`),`
  if (dist > adjustedBorderSize_0) {
    gl_FragColor = borderColor_0;
  } else `).concat(e.map(function(i,o){return"if (dist > adjustedBorderSize_".concat(o,` - aaBorder) {
    gl_FragColor = mix(borderColor_`).concat(o+1,", borderColor_").concat(o,", (dist - adjustedBorderSize_").concat(o,` + aaBorder) / aaBorder);
  } else if (dist > adjustedBorderSize_`).concat(o+1,`) {
    gl_FragColor = borderColor_`).concat(o+1,`;
  } else `)}).join(""),` { /* Nothing to add here */ }
  #endif
}
`);return n}function Ro(r){var e=r.borders,t=`
attribute vec2 a_position;
attribute float a_size;
attribute float a_angle;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec2 v_diffVector;
varying float v_radius;

#ifdef PICKING_MODE
attribute vec4 a_id;
varying vec4 v_color;
#else
`.concat(e.flatMap(function(n,i){var o=n.size;return"attribute"in o?["attribute float a_borderSize_".concat(i+1,";"),"varying float v_borderSize_".concat(i+1,";")]:[]}).join(`
`),`
`).concat(e.flatMap(function(n,i){var o=n.color;return"attribute"in o?["attribute vec4 a_borderColor_".concat(i+1,";"),"varying vec4 v_borderColor_".concat(i+1,";")]:[]}).join(`
`),`
#endif

const float bias = 255.0 / 254.0;
const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main() {
  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;
  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));
  vec2 position = a_position + diffVector;
  gl_Position = vec4(
    (u_matrix * vec3(position, 1)).xy,
    0,
    1
  );

  v_radius = size / 2.0;
  v_diffVector = diffVector;

  #ifdef PICKING_MODE
  v_color = a_id;
  #else
`).concat(e.flatMap(function(n,i){var o=n.size;return"attribute"in o?["  v_borderSize_".concat(i+1," = a_borderSize_").concat(i+1,";")]:[]}).join(`
`),`
`).concat(e.flatMap(function(n,i){var o=n.color;return"attribute"in o?["  v_borderColor_".concat(i+1," = a_borderColor_").concat(i+1,";")]:[]}).join(`
`),`
  #endif
}
`);return t}var Hr=WebGLRenderingContext,$r=Hr.UNSIGNED_BYTE,Be=Hr.FLOAT;function jr(r){var e,t=Br(Br({},yo),r||{}),n=t.borders,i=t.drawLabel,o=t.drawHover,a=["u_sizeRatio","u_correctionRatio","u_matrix"].concat(_t(n.flatMap(function(s,l){var c=s.color;return"value"in c?["u_borderColor_".concat(l+1)]:[]})));return e=function(s){function l(){var c;so(this,l);for(var u=arguments.length,d=new Array(u),h=0;h<u;h++)d[h]=arguments[h];return c=go(this,l,[].concat(d)),ge(c,"drawLabel",i),ge(c,"drawHover",o),c}return mo(l,s),uo(l,[{key:"getDefinition",value:function(){return{VERTICES:3,VERTEX_SHADER_SOURCE:Ro(t),FRAGMENT_SHADER_SOURCE:To(t),METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:a,ATTRIBUTES:[{name:"a_position",size:2,type:Be},{name:"a_id",size:4,type:$r,normalized:!0},{name:"a_size",size:1,type:Be}].concat(_t(n.flatMap(function(u,d){var h=u.color;return"attribute"in h?[{name:"a_borderColor_".concat(d+1),size:4,type:$r,normalized:!0}]:[]})),_t(n.flatMap(function(u,d){var h=u.size;return"attribute"in h?[{name:"a_borderSize_".concat(d+1),size:1,type:Be}]:[]}))),CONSTANT_ATTRIBUTES:[{name:"a_angle",size:1,type:Be}],CONSTANT_DATA:[[l.ANGLE_1],[l.ANGLE_2],[l.ANGLE_3]]}}},{key:"processVisibleItem",value:function(u,d,h){var m=this.array;m[d++]=h.x,m[d++]=h.y,m[d++]=u,m[d++]=h.size,n.forEach(function(g){var b=g.color;"attribute"in b&&(m[d++]=X(h[b.attribute]||b.defaultValue||Eo))}),n.forEach(function(g){var b=g.size;"attribute"in b&&(m[d++]=h[b.attribute]||b.defaultValue)})}},{key:"setUniforms",value:function(u,d){var h=d.gl,m=d.uniformLocations,g=m.u_sizeRatio,b=m.u_correctionRatio,E=m.u_matrix;h.uniform1f(b,u.correctionRatio),h.uniform1f(g,u.sizeRatio),h.uniformMatrix3fv(E,!1,u.matrix),n.forEach(function(v,T){var _=v.color;if("value"in _){var f=m["u_borderColor_".concat(T+1)],p=nt(_.value),y=ao(p,4),R=y[0],S=y[1],F=y[2],x=y[3];h.uniform4f(f,R/255,S/255,F/255,x/255)}})}}])}(ke),ge(e,"ANGLE_1",0),ge(e,"ANGLE_2",2*Math.PI/3),ge(e,"ANGLE_3",4*Math.PI/3),e}jr();var He={exports:{}},Vr;function Co(){if(Vr)return He.exports;Vr=1;var r=typeof Reflect=="object"?Reflect:null,e=r&&typeof r.apply=="function"?r.apply:function(p,y,R){return Function.prototype.apply.call(p,y,R)},t;r&&typeof r.ownKeys=="function"?t=r.ownKeys:Object.getOwnPropertySymbols?t=function(p){return Object.getOwnPropertyNames(p).concat(Object.getOwnPropertySymbols(p))}:t=function(p){return Object.getOwnPropertyNames(p)};function n(f){console&&console.warn&&console.warn(f)}var i=Number.isNaN||function(p){return p!==p};function o(){o.init.call(this)}He.exports=o,He.exports.once=v,o.EventEmitter=o,o.prototype._events=void 0,o.prototype._eventsCount=0,o.prototype._maxListeners=void 0;var a=10;function s(f){if(typeof f!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof f)}Object.defineProperty(o,"defaultMaxListeners",{enumerable:!0,get:function(){return a},set:function(f){if(typeof f!="number"||f<0||i(f))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+f+".");a=f}}),o.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},o.prototype.setMaxListeners=function(p){if(typeof p!="number"||p<0||i(p))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+p+".");return this._maxListeners=p,this};function l(f){return f._maxListeners===void 0?o.defaultMaxListeners:f._maxListeners}o.prototype.getMaxListeners=function(){return l(this)},o.prototype.emit=function(p){for(var y=[],R=1;R<arguments.length;R++)y.push(arguments[R]);var S=p==="error",F=this._events;if(F!==void 0)S=S&&F.error===void 0;else if(!S)return!1;if(S){var x;if(y.length>0&&(x=y[0]),x instanceof Error)throw x;var D=new Error("Unhandled error."+(x?" ("+x.message+")":""));throw D.context=x,D}var k=F[p];if(k===void 0)return!1;if(typeof k=="function")e(k,this,y);else for(var z=k.length,M=g(k,z),R=0;R<z;++R)e(M[R],this,y);return!0};function c(f,p,y,R){var S,F,x;if(s(y),F=f._events,F===void 0?(F=f._events=Object.create(null),f._eventsCount=0):(F.newListener!==void 0&&(f.emit("newListener",p,y.listener?y.listener:y),F=f._events),x=F[p]),x===void 0)x=F[p]=y,++f._eventsCount;else if(typeof x=="function"?x=F[p]=R?[y,x]:[x,y]:R?x.unshift(y):x.push(y),S=l(f),S>0&&x.length>S&&!x.warned){x.warned=!0;var D=new Error("Possible EventEmitter memory leak detected. "+x.length+" "+String(p)+" listeners added. Use emitter.setMaxListeners() to increase limit");D.name="MaxListenersExceededWarning",D.emitter=f,D.type=p,D.count=x.length,n(D)}return f}o.prototype.addListener=function(p,y){return c(this,p,y,!1)},o.prototype.on=o.prototype.addListener,o.prototype.prependListener=function(p,y){return c(this,p,y,!0)};function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(f,p,y){var R={fired:!1,wrapFn:void 0,target:f,type:p,listener:y},S=u.bind(R);return S.listener=y,R.wrapFn=S,S}o.prototype.once=function(p,y){return s(y),this.on(p,d(this,p,y)),this},o.prototype.prependOnceListener=function(p,y){return s(y),this.prependListener(p,d(this,p,y)),this},o.prototype.removeListener=function(p,y){var R,S,F,x,D;if(s(y),S=this._events,S===void 0)return this;if(R=S[p],R===void 0)return this;if(R===y||R.listener===y)--this._eventsCount===0?this._events=Object.create(null):(delete S[p],S.removeListener&&this.emit("removeListener",p,R.listener||y));else if(typeof R!="function"){for(F=-1,x=R.length-1;x>=0;x--)if(R[x]===y||R[x].listener===y){D=R[x].listener,F=x;break}if(F<0)return this;F===0?R.shift():b(R,F),R.length===1&&(S[p]=R[0]),S.removeListener!==void 0&&this.emit("removeListener",p,D||y)}return this},o.prototype.off=o.prototype.removeListener,o.prototype.removeAllListeners=function(p){var y,R,S;if(R=this._events,R===void 0)return this;if(R.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):R[p]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete R[p]),this;if(arguments.length===0){var F=Object.keys(R),x;for(S=0;S<F.length;++S)x=F[S],x!=="removeListener"&&this.removeAllListeners(x);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(y=R[p],typeof y=="function")this.removeListener(p,y);else if(y!==void 0)for(S=y.length-1;S>=0;S--)this.removeListener(p,y[S]);return this};function h(f,p,y){var R=f._events;if(R===void 0)return[];var S=R[p];return S===void 0?[]:typeof S=="function"?y?[S.listener||S]:[S]:y?E(S):g(S,S.length)}o.prototype.listeners=function(p){return h(this,p,!0)},o.prototype.rawListeners=function(p){return h(this,p,!1)},o.listenerCount=function(f,p){return typeof f.listenerCount=="function"?f.listenerCount(p):m.call(f,p)},o.prototype.listenerCount=m;function m(f){var p=this._events;if(p!==void 0){var y=p[f];if(typeof y=="function")return 1;if(y!==void 0)return y.length}return 0}o.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]};function g(f,p){for(var y=new Array(p),R=0;R<p;++R)y[R]=f[R];return y}function b(f,p){for(;p+1<f.length;p++)f[p]=f[p+1];f.pop()}function E(f){for(var p=new Array(f.length),y=0;y<p.length;++y)p[y]=f[y].listener||f[y];return p}function v(f,p){return new Promise(function(y,R){function S(x){f.removeListener(p,F),R(x)}function F(){typeof f.removeListener=="function"&&f.removeListener("error",S),y([].slice.call(arguments))}_(f,p,F,{once:!0}),p!=="error"&&T(f,S,{once:!0})})}function T(f,p,y){typeof f.on=="function"&&_(f,"error",p,y)}function _(f,p,y,R){if(typeof f.on=="function")R.once?f.once(p,y):f.on(p,y);else if(typeof f.addEventListener=="function")f.addEventListener(p,function S(F){R.once&&f.removeEventListener(p,S),y(F)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof f)}return He.exports}var Wr=Co();function bt(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=Array(e);t<e;t++)n[t]=r[t];return n}function wo(r){if(Array.isArray(r))return bt(r)}function Ao(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function So(r,e){if(r){if(typeof r=="string")return bt(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?bt(r,e):void 0}}function xo(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function yt(r){return wo(r)||Ao(r)||So(r)||xo()}function Et(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Lo(r,e){if(typeof r!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var n=t.call(r,e||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function Yr(r){var e=Lo(r,"string");return typeof e=="symbol"?e:e+""}function Fo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,Yr(n.key),n)}}function Tt(r,e,t){return e&&Fo(r.prototype,e),Object.defineProperty(r,"prototype",{writable:!1}),r}function me(r){return me=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},me(r)}function Xr(){try{var r=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(Xr=function(){return!!r})()}function No(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Po(r,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return No(r)}function qr(r,e,t){return e=me(e),Po(r,Xr()?Reflect.construct(e,t||[],me(r).constructor):e.apply(r,t))}function Do(r,e){for(;!{}.hasOwnProperty.call(r,e)&&(r=me(r))!==null;);return r}function Rt(){return Rt=typeof Reflect<"u"&&Reflect.get?Reflect.get.bind():function(r,e,t){var n=Do(r,e);if(n){var i=Object.getOwnPropertyDescriptor(n,e);return i.get?i.get.call(arguments.length<3?r:t):i.value}},Rt.apply(null,arguments)}function Kr(r,e,t,n){var i=Rt(me(r.prototype),e,t);return typeof i=="function"?function(o){return i.apply(t,o)}:i}function Ct(r,e){return Ct=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},Ct(r,e)}function Zr(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),Object.defineProperty(r,"prototype",{writable:!1}),e&&Ct(r,e)}function G(r,e,t){return(e=Yr(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function Oo(r,e){if(r==null)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(e.includes(n))continue;t[n]=r[n]}return t}function ko(r,e){if(r==null)return{};var t,n,i=Oo(r,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);for(n=0;n<o.length;n++)t=o[n],e.includes(t)||{}.propertyIsEnumerable.call(r,t)&&(i[t]=r[t])}return i}function Qr(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function $(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Qr(Object(t),!0).forEach(function(n){G(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Qr(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function Io(r){var e=r.texturesCount,t=`
precision highp float;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;
varying vec4 v_texture;
varying float v_textureIndex;

uniform sampler2D u_atlas[`.concat(e,`];
uniform float u_correctionRatio;
uniform float u_cameraAngle;
uniform float u_percentagePadding;
uniform bool u_colorizeImages;
uniform bool u_keepWithinCircle;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

const float radius = 0.5;

void main(void) {
  float border = 2.0 * u_correctionRatio;
  float dist = length(v_diffVector);
  vec4 color = gl_FragColor;

  float c = cos(-u_cameraAngle);
  float s = sin(-u_cameraAngle);
  vec2 diffVector = mat2(c, s, -s, c) * (v_diffVector);

  // No antialiasing for picking mode:
  #ifdef PICKING_MODE
  border = 0.0;
  color = v_color;

  #else
  // First case: No image to display
  if (v_texture.w <= 0.0) {
    if (!u_colorizeImages) {
      color = v_color;
    }
  }

  // Second case: Image loaded into the texture
  else {
    float paddingRatio = 1.0 + 2.0 * u_percentagePadding;
    float coef = u_keepWithinCircle ? 1.0 : `).concat(Math.SQRT2,`;
    vec2 coordinateInTexture = diffVector * vec2(paddingRatio, -paddingRatio) / v_radius / 2.0 * coef + vec2(0.5, 0.5);
    int index = int(v_textureIndex + 0.5); // +0.5 avoid rounding errors

    bool noTextureFound = false;
    vec4 texel;

    `).concat(yt(new Array(e)).map(function(n,i){return"if (index == ".concat(i,") texel = texture2D(u_atlas[").concat(i,"], (v_texture.xy + coordinateInTexture * v_texture.zw), -1.0);")}).join(`
    else `)+`else {
      texel = texture2D(u_atlas[0], (v_texture.xy + coordinateInTexture * v_texture.zw), -1.0);
      noTextureFound = true;
    }`,`

    if (noTextureFound) {
      color = v_color;
    } else {
      // Colorize all visible image pixels:
      if (u_colorizeImages) {
        color = mix(gl_FragColor, v_color, texel.a);
      }

      // Colorize background pixels, keep image pixel colors:
      else {
        color = vec4(mix(v_color, texel, texel.a).rgb, max(texel.a, v_color.a));
      }

      // Erase pixels "in the padding":
      if (abs(diffVector.x) > v_radius / paddingRatio || abs(diffVector.y) > v_radius / paddingRatio) {
        color = u_colorizeImages ? gl_FragColor : v_color;
      }
    }
  }
  #endif

  // Crop in a circle when u_keepWithinCircle is truthy:
  if (u_keepWithinCircle) {
    if (dist < v_radius - border) {
      gl_FragColor = color;
    } else if (dist < v_radius) {
      gl_FragColor = mix(transparent, color, (v_radius - dist) / border);
    }
  }

  // Crop in a square else:
  else {
    float squareHalfSize = v_radius * `).concat(Math.SQRT1_2*Math.cos(Math.PI/12),`;
    if (abs(diffVector.x) > squareHalfSize || abs(diffVector.y) > squareHalfSize) {
      gl_FragColor = transparent;
    } else {
      gl_FragColor = color;
    }
  }
}
`);return t}var zo=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_position;
attribute float a_size;
attribute float a_angle;
attribute vec4 a_texture;
attribute float a_textureIndex;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;
varying vec4 v_texture;
varying float v_textureIndex;

const float bias = 255.0 / 254.0;
const float marginRatio = 1.05;

void main() {
  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;
  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));
  vec2 position = a_position + diffVector * marginRatio;
  gl_Position = vec4(
    (u_matrix * vec3(position, 1)).xy,
    0,
    1
  );

  v_diffVector = diffVector;
  v_radius = size / 2.0 / marginRatio;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;

  // Pass the texture coordinates:
  v_textureIndex = a_textureIndex;
  v_texture = a_texture;
  #endif

  v_color.a *= bias;
}
`,Go=zo;function ae(){ae=function(){return e};var r,e={},t=Object.prototype,n=t.hasOwnProperty,i=Object.defineProperty||function(w,C,A){w[C]=A.value},o=typeof Symbol=="function"?Symbol:{},a=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",l=o.toStringTag||"@@toStringTag";function c(w,C,A){return Object.defineProperty(w,C,{value:A,enumerable:!0,configurable:!0,writable:!0}),w[C]}try{c({},"")}catch{c=function(C,A,N){return C[A]=N}}function u(w,C,A,N){var L=C&&C.prototype instanceof v?C:v,P=Object.create(L.prototype),O=new M(N||[]);return i(P,"_invoke",{value:x(w,A,O)}),P}function d(w,C,A){try{return{type:"normal",arg:w.call(C,A)}}catch(N){return{type:"throw",arg:N}}}e.wrap=u;var h="suspendedStart",m="suspendedYield",g="executing",b="completed",E={};function v(){}function T(){}function _(){}var f={};c(f,a,function(){return this});var p=Object.getPrototypeOf,y=p&&p(p(H([])));y&&y!==t&&n.call(y,a)&&(f=y);var R=_.prototype=v.prototype=Object.create(f);function S(w){["next","throw","return"].forEach(function(C){c(w,C,function(A){return this._invoke(C,A)})})}function F(w,C){function A(L,P,O,U){var B=d(w[L],w,P);if(B.type!=="throw"){var Y=B.arg,J=Y.value;return J&&typeof J=="object"&&n.call(J,"__await")?C.resolve(J.__await).then(function(ee){A("next",ee,O,U)},function(ee){A("throw",ee,O,U)}):C.resolve(J).then(function(ee){Y.value=ee,O(Y)},function(ee){return A("throw",ee,O,U)})}U(B.arg)}var N;i(this,"_invoke",{value:function(L,P){function O(){return new C(function(U,B){A(L,P,U,B)})}return N=N?N.then(O,O):O()}})}function x(w,C,A){var N=h;return function(L,P){if(N===g)throw Error("Generator is already running");if(N===b){if(L==="throw")throw P;return{value:r,done:!0}}for(A.method=L,A.arg=P;;){var O=A.delegate;if(O){var U=D(O,A);if(U){if(U===E)continue;return U}}if(A.method==="next")A.sent=A._sent=A.arg;else if(A.method==="throw"){if(N===h)throw N=b,A.arg;A.dispatchException(A.arg)}else A.method==="return"&&A.abrupt("return",A.arg);N=g;var B=d(w,C,A);if(B.type==="normal"){if(N=A.done?b:m,B.arg===E)continue;return{value:B.arg,done:A.done}}B.type==="throw"&&(N=b,A.method="throw",A.arg=B.arg)}}}function D(w,C){var A=C.method,N=w.iterator[A];if(N===r)return C.delegate=null,A==="throw"&&w.iterator.return&&(C.method="return",C.arg=r,D(w,C),C.method==="throw")||A!=="return"&&(C.method="throw",C.arg=new TypeError("The iterator does not provide a '"+A+"' method")),E;var L=d(N,w.iterator,C.arg);if(L.type==="throw")return C.method="throw",C.arg=L.arg,C.delegate=null,E;var P=L.arg;return P?P.done?(C[w.resultName]=P.value,C.next=w.nextLoc,C.method!=="return"&&(C.method="next",C.arg=r),C.delegate=null,E):P:(C.method="throw",C.arg=new TypeError("iterator result is not an object"),C.delegate=null,E)}function k(w){var C={tryLoc:w[0]};1 in w&&(C.catchLoc=w[1]),2 in w&&(C.finallyLoc=w[2],C.afterLoc=w[3]),this.tryEntries.push(C)}function z(w){var C=w.completion||{};C.type="normal",delete C.arg,w.completion=C}function M(w){this.tryEntries=[{tryLoc:"root"}],w.forEach(k,this),this.reset(!0)}function H(w){if(w||w===""){var C=w[a];if(C)return C.call(w);if(typeof w.next=="function")return w;if(!isNaN(w.length)){var A=-1,N=function L(){for(;++A<w.length;)if(n.call(w,A))return L.value=w[A],L.done=!1,L;return L.value=r,L.done=!0,L};return N.next=N}}throw new TypeError(typeof w+" is not iterable")}return T.prototype=_,i(R,"constructor",{value:_,configurable:!0}),i(_,"constructor",{value:T,configurable:!0}),T.displayName=c(_,l,"GeneratorFunction"),e.isGeneratorFunction=function(w){var C=typeof w=="function"&&w.constructor;return!!C&&(C===T||(C.displayName||C.name)==="GeneratorFunction")},e.mark=function(w){return Object.setPrototypeOf?Object.setPrototypeOf(w,_):(w.__proto__=_,c(w,l,"GeneratorFunction")),w.prototype=Object.create(R),w},e.awrap=function(w){return{__await:w}},S(F.prototype),c(F.prototype,s,function(){return this}),e.AsyncIterator=F,e.async=function(w,C,A,N,L){L===void 0&&(L=Promise);var P=new F(u(w,C,A,N),L);return e.isGeneratorFunction(C)?P:P.next().then(function(O){return O.done?O.value:P.next()})},S(R),c(R,l,"Generator"),c(R,a,function(){return this}),c(R,"toString",function(){return"[object Generator]"}),e.keys=function(w){var C=Object(w),A=[];for(var N in C)A.push(N);return A.reverse(),function L(){for(;A.length;){var P=A.pop();if(P in C)return L.value=P,L.done=!1,L}return L.done=!0,L}},e.values=H,M.prototype={constructor:M,reset:function(w){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(z),!w)for(var C in this)C.charAt(0)==="t"&&n.call(this,C)&&!isNaN(+C.slice(1))&&(this[C]=r)},stop:function(){this.done=!0;var w=this.tryEntries[0].completion;if(w.type==="throw")throw w.arg;return this.rval},dispatchException:function(w){if(this.done)throw w;var C=this;function A(B,Y){return P.type="throw",P.arg=w,C.next=B,Y&&(C.method="next",C.arg=r),!!Y}for(var N=this.tryEntries.length-1;N>=0;--N){var L=this.tryEntries[N],P=L.completion;if(L.tryLoc==="root")return A("end");if(L.tryLoc<=this.prev){var O=n.call(L,"catchLoc"),U=n.call(L,"finallyLoc");if(O&&U){if(this.prev<L.catchLoc)return A(L.catchLoc,!0);if(this.prev<L.finallyLoc)return A(L.finallyLoc)}else if(O){if(this.prev<L.catchLoc)return A(L.catchLoc,!0)}else{if(!U)throw Error("try statement without catch or finally");if(this.prev<L.finallyLoc)return A(L.finallyLoc)}}}},abrupt:function(w,C){for(var A=this.tryEntries.length-1;A>=0;--A){var N=this.tryEntries[A];if(N.tryLoc<=this.prev&&n.call(N,"finallyLoc")&&this.prev<N.finallyLoc){var L=N;break}}L&&(w==="break"||w==="continue")&&L.tryLoc<=C&&C<=L.finallyLoc&&(L=null);var P=L?L.completion:{};return P.type=w,P.arg=C,L?(this.method="next",this.next=L.finallyLoc,E):this.complete(P)},complete:function(w,C){if(w.type==="throw")throw w.arg;return w.type==="break"||w.type==="continue"?this.next=w.arg:w.type==="return"?(this.rval=this.arg=w.arg,this.method="return",this.next="end"):w.type==="normal"&&C&&(this.next=C),E},finish:function(w){for(var C=this.tryEntries.length-1;C>=0;--C){var A=this.tryEntries[C];if(A.finallyLoc===w)return this.complete(A.completion,A.afterLoc),z(A),E}},catch:function(w){for(var C=this.tryEntries.length-1;C>=0;--C){var A=this.tryEntries[C];if(A.tryLoc===w){var N=A.completion;if(N.type==="throw"){var L=N.arg;z(A)}return L}}throw Error("illegal catch attempt")},delegateYield:function(w,C,A){return this.delegate={iterator:H(w),resultName:C,nextLoc:A},this.method==="next"&&(this.arg=r),E}},e}function Jr(r,e,t,n,i,o,a){try{var s=r[o](a),l=s.value}catch(c){return void t(c)}s.done?e(l):Promise.resolve(l).then(n,i)}function wt(r){return function(){var e=this,t=arguments;return new Promise(function(n,i){var o=r.apply(e,t);function a(l){Jr(o,n,i,a,s,"next",l)}function s(l){Jr(o,n,i,a,s,"throw",l)}a(void 0)})}}var At={size:{mode:"max",value:512},objectFit:"cover",correctCentering:!1,maxTextureSize:4096,debounceTimeout:500,crossOrigin:"anonymous"},Mo=1;function St(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=e.crossOrigin;return new Promise(function(n,i){var o=new Image;o.addEventListener("load",function(){n(o)},{once:!0}),o.addEventListener("error",function(a){i(a.error)},{once:!0}),t&&o.setAttribute("crossOrigin",t),o.src=r})}function Uo(r){return xt.apply(this,arguments)}function xt(){return xt=wt(ae().mark(function r(e){var t,n,i,o,a,s,l,c,u,d,h,m,g,b=arguments;return ae().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:if(t=b.length>1&&b[1]!==void 0?b[1]:{},n=t.size,i=t.crossOrigin,i!=="use-credentials"){v.next=7;break}return v.next=4,fetch(e,{credentials:"include"});case 4:o=v.sent,v.next=10;break;case 7:return v.next=9,fetch(e);case 9:o=v.sent;case 10:return v.next=12,o.text();case 12:if(a=v.sent,s=new DOMParser().parseFromString(a,"image/svg+xml"),l=s.documentElement,c=l.getAttribute("width"),u=l.getAttribute("height"),!(!c||!u)){v.next=19;break}throw new Error("loadSVGImage: cannot use `size` if target SVG has no definite dimensions.");case 19:return typeof n=="number"&&(l.setAttribute("width",""+n),l.setAttribute("height",""+n)),d=new XMLSerializer().serializeToString(s),h=new Blob([d],{type:"image/svg+xml"}),m=URL.createObjectURL(h),g=St(m),g.finally(function(){return URL.revokeObjectURL(m)}),v.abrupt("return",g);case 26:case"end":return v.stop()}},r)})),xt.apply(this,arguments)}function Bo(r){return Lt.apply(this,arguments)}function Lt(){return Lt=wt(ae().mark(function r(e){var t,n,i,o,a,s,l=arguments;return ae().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:if(n=l.length>1&&l[1]!==void 0?l[1]:{},i=n.size,o=n.crossOrigin,a=((t=e.split(/[#?]/)[0].split(".").pop())===null||t===void 0?void 0:t.trim().toLowerCase())==="svg",!(a&&i)){u.next=16;break}return u.prev=3,u.next=6,Uo(e,{size:i,crossOrigin:o});case 6:s=u.sent,u.next=14;break;case 9:return u.prev=9,u.t0=u.catch(3),u.next=13,St(e,{crossOrigin:o});case 13:s=u.sent;case 14:u.next=19;break;case 16:return u.next=18,St(e,{crossOrigin:o});case 18:s=u.sent;case 19:return u.abrupt("return",s);case 20:case"end":return u.stop()}},r,null,[[3,9]])})),Lt.apply(this,arguments)}function Ho(r,e,t){var n=t.objectFit,i=t.size,o=t.correctCentering,a=n==="contain"?Math.max(r.width,r.height):Math.min(r.width,r.height),s=i.mode==="auto"?a:i.mode==="force"?i.value:Math.min(i.value,a),l=(r.width-a)/2,c=(r.height-a)/2;if(o){var u=e.getCorrectionOffset(r,a);l=u.x,c=u.y}return{sourceX:l,sourceY:c,sourceSize:a,destinationSize:s}}function $o(r,e,t){for(var n=e.canvas,i=n.width,o=n.height,a=[],s=t.x,l=t.y,c=t.rowHeight,u=t.maxRowWidth,d={},h=0,m=r.length;h<m;h++){var g=r[h],b=g.key,E=g.image,v=g.sourceSize,T=g.sourceX,_=g.sourceY,f=g.destinationSize,p=f+Mo;l+p>o||s+p>i&&l+p+c>o||(s+p>i&&(u=Math.max(u,s),s=0,l+=c,c=p),a.push({key:b,image:E,sourceX:T,sourceY:_,sourceSize:v,destinationX:s,destinationY:l,destinationSize:f}),d[b]={x:s,y:l,size:f},s+=p,c=Math.max(c,p))}u=Math.max(u,s);for(var y=u,R=l+c,S=0,F=a.length;S<F;S++){var x=a[S],D=x.image,k=x.sourceSize,z=x.sourceX,M=x.sourceY,H=x.destinationSize,w=x.destinationX,C=x.destinationY;e.drawImage(D,z,M,k,k,w,C,H,H)}return{atlas:d,texture:e.getImageData(0,0,y,R),cursor:{x:s,y:l,rowHeight:c,maxRowWidth:u}}}function jo(r,e,t){var n=r.atlas,i=r.textures,o=r.cursor,a={atlas:$({},n),textures:yt(i.slice(0,-1)),cursor:$({},o)},s=[];for(var l in e){var c,u=e[l];if(u.status==="ready"){var d=(c=n[l])===null||c===void 0?void 0:c.textureIndex;typeof d!="number"&&s.push($({key:l},u))}}for(var h=function(){var g=$o(s,t,a.cursor),b=g.atlas,E=g.texture,v=g.cursor;a.cursor=v;var T=[];s.forEach(function(_){b[_.key]?a.atlas[_.key]=$($({},b[_.key]),{},{textureIndex:a.textures.length}):T.push(_)}),a.textures.push(E),s=T,s.length&&(a.cursor={x:0,y:0,rowHeight:0,maxRowWidth:0},t.clearRect(0,0,t.canvas.width,t.canvas.height))};s.length;)h();return a}var Vo=function(){function r(){Et(this,r),this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d",{willReadFrequently:!0})}return Tt(r,[{key:"getCorrectionOffset",value:function(t,n){this.canvas.width=n,this.canvas.height=n,this.context.clearRect(0,0,n,n),this.context.drawImage(t,0,0,n,n);for(var i=this.context.getImageData(0,0,n,n).data,o=new Uint8ClampedArray(i.length/4),a=0;a<i.length;a++)o[a]=i[a*4+3];for(var s=0,l=0,c=0,u=0;u<n;u++)for(var d=0;d<n;d++){var h=o[u*n+d];c+=h,s+=h*d,l+=h*u}var m=s/c,g=l/c;return{x:m-n/2,y:g-n/2}}}])}(),$e=function(r){function e(){var t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Et(this,e),t=qr(this,e),G(t,"canvas",document.createElement("canvas")),G(t,"ctx",t.canvas.getContext("2d",{willReadFrequently:!0})),G(t,"corrector",new Vo),G(t,"imageStates",{}),G(t,"textures",[t.ctx.getImageData(0,0,1,1)]),G(t,"lastTextureCursor",{x:0,y:0,rowHeight:0,maxRowWidth:0}),G(t,"atlas",{}),t.options=$($({},At),n),t.canvas.width=t.options.maxTextureSize,t.canvas.height=t.options.maxTextureSize,t}return Zr(e,r),Tt(e,[{key:"scheduleGenerateTexture",value:function(){var n=this;typeof this.frameId!="number"&&(typeof this.options.debounceTimeout=="number"?this.frameId=window.setTimeout(function(){n.generateTextures(),n.frameId=void 0},this.options.debounceTimeout):this.generateTextures())}},{key:"generateTextures",value:function(){var n=jo({atlas:this.atlas,textures:this.textures,cursor:this.lastTextureCursor},this.imageStates,this.ctx),i=n.atlas,o=n.textures,a=n.cursor;this.atlas=i,this.textures=o,this.lastTextureCursor=a,this.emit(e.NEW_TEXTURE_EVENT,{atlas:i,textures:o})}},{key:"registerImage",value:function(){var t=wt(ae().mark(function i(o){var a,s;return ae().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:if(!this.imageStates[o]){c.next=2;break}return c.abrupt("return");case 2:return this.imageStates[o]={status:"loading"},c.prev=3,a=this.options.size,c.next=7,Bo(o,{size:a.mode==="force"?a.value:void 0,crossOrigin:this.options.crossOrigin||void 0});case 7:s=c.sent,this.imageStates[o]=$({status:"ready",image:s},Ho(s,this.corrector,this.options)),this.scheduleGenerateTexture(),c.next=15;break;case 12:c.prev=12,c.t0=c.catch(3),this.imageStates[o]={status:"error"};case 15:case"end":return c.stop()}},i,this,[[3,12]])}));function n(i){return t.apply(this,arguments)}return n}()},{key:"getAtlas",value:function(){return this.atlas}},{key:"getTextures",value:function(){return this.textures}}])}(Wr.EventEmitter);G($e,"NEW_TEXTURE_EVENT","newTexture");var Wo=["drawHover","drawLabel","drawingMode","keepWithinCircle","padding","colorAttribute","imageAttribute"],en=WebGLRenderingContext,tn=en.UNSIGNED_BYTE,Ce=en.FLOAT,Yo=$($({},At),{},{drawingMode:"background",keepWithinCircle:!0,drawLabel:void 0,drawHover:void 0,padding:0,colorAttribute:"color",imageAttribute:"image"}),Xo=["u_sizeRatio","u_correctionRatio","u_cameraAngle","u_percentagePadding","u_matrix","u_colorizeImages","u_keepWithinCircle","u_atlas"];function Ft(r){var e,t=document.createElement("canvas").getContext("webgl"),n=Math.min(t.getParameter(t.MAX_TEXTURE_SIZE),At.maxTextureSize);t.canvas.remove();var i=$($($({},Yo),{maxTextureSize:n}),r||{}),o=i.drawHover,a=i.drawLabel,s=i.drawingMode,l=i.keepWithinCircle,c=i.padding,u=i.colorAttribute,d=i.imageAttribute,h=ko(i,Wo),m=new $e(h);return e=function(g){function b(E,v,T){var _;return Et(this,b),_=qr(this,b,[E,v,T]),G(_,"drawLabel",a),G(_,"drawHover",o),G(_,"textureManagerCallback",null),_.textureManagerCallback=function(f){var p=f.atlas,y=f.textures,R=y.length!==_.textures.length;_.atlas=p,_.textureImages=y,R&&_.upgradeShaders(),_.bindTextures(),_.latestRenderParams&&_.render(_.latestRenderParams),_.renderer&&_.renderer.refresh&&_.renderer.refresh()},m.on($e.NEW_TEXTURE_EVENT,_.textureManagerCallback),_.atlas=m.getAtlas(),_.textureImages=m.getTextures(),_.textures=_.textureImages.map(function(){return E.createTexture()}),_.bindTextures(),_}return Zr(b,g),Tt(b,[{key:"getDefinition",value:function(){return{VERTICES:3,VERTEX_SHADER_SOURCE:Go,FRAGMENT_SHADER_SOURCE:Io({texturesCount:m.getTextures().length}),METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Xo,ATTRIBUTES:[{name:"a_position",size:2,type:Ce},{name:"a_size",size:1,type:Ce},{name:"a_color",size:4,type:tn,normalized:!0},{name:"a_id",size:4,type:tn,normalized:!0},{name:"a_texture",size:4,type:Ce},{name:"a_textureIndex",size:1,type:Ce}],CONSTANT_ATTRIBUTES:[{name:"a_angle",size:1,type:Ce}],CONSTANT_DATA:[[b.ANGLE_1],[b.ANGLE_2],[b.ANGLE_3]]}}},{key:"upgradeShaders",value:function(){var v=this.getDefinition(),T=this.normalProgram,_=T.program,f=T.buffer,p=T.vertexShader,y=T.fragmentShader,R=T.gl;R.deleteProgram(_),R.deleteBuffer(f),R.deleteShader(p),R.deleteShader(y),this.normalProgram=this.getProgramInfo("normal",R,v.VERTEX_SHADER_SOURCE,v.FRAGMENT_SHADER_SOURCE,null)}},{key:"kill",value:function(){var v,T=(v=this.normalProgram)===null||v===void 0?void 0:v.gl;if(T)for(var _=0;_<this.textures.length;_++)T.deleteTexture(this.textures[_]);this.textureManagerCallback&&(m.off($e.NEW_TEXTURE_EVENT,this.textureManagerCallback),this.textureManagerCallback=null),Kr(b,"kill",this)([])}},{key:"bindTextures",value:function(){for(var v=this.normalProgram.gl,T=0;T<this.textureImages.length;T++){if(T>=this.textures.length){var _=v.createTexture();_&&this.textures.push(_)}v.activeTexture(v.TEXTURE0+T),v.bindTexture(v.TEXTURE_2D,this.textures[T]),v.texImage2D(v.TEXTURE_2D,0,v.RGBA,v.RGBA,v.UNSIGNED_BYTE,this.textureImages[T]),v.generateMipmap(v.TEXTURE_2D)}}},{key:"renderProgram",value:function(v,T){if(!T.isPicking)for(var _=T.gl,f=0;f<this.textureImages.length;f++)_.activeTexture(_.TEXTURE0+f),_.bindTexture(_.TEXTURE_2D,this.textures[f]);Kr(b,"renderProgram",this)([v,T])}},{key:"processVisibleItem",value:function(v,T,_){var f=this.array,p=X(_[u]),y=_[d],R=y?this.atlas[y]:void 0;if(typeof y=="string"&&!R&&m.registerImage(y),f[T++]=_.x,f[T++]=_.y,f[T++]=_.size,f[T++]=p,f[T++]=v,R&&typeof R.textureIndex=="number"){var S=this.textureImages[R.textureIndex],F=S.width,x=S.height;f[T++]=R.x/F,f[T++]=R.y/x,f[T++]=R.size/F,f[T++]=R.size/x,f[T++]=R.textureIndex}else f[T++]=0,f[T++]=0,f[T++]=0,f[T++]=0,f[T++]=0}},{key:"setUniforms",value:function(v,T){var _=T.gl,f=T.uniformLocations,p=f.u_sizeRatio,y=f.u_correctionRatio,R=f.u_matrix,S=f.u_atlas,F=f.u_colorizeImages,x=f.u_keepWithinCircle,D=f.u_cameraAngle,k=f.u_percentagePadding;this.latestRenderParams=v,_.uniform1f(y,v.correctionRatio),_.uniform1f(p,l?v.sizeRatio:v.sizeRatio/Math.SQRT2),_.uniform1f(D,v.cameraAngle),_.uniform1f(k,c),_.uniformMatrix3fv(R,!1,v.matrix),_.uniform1iv(S,yt(new Array(this.textureImages.length)).map(function(z,M){return M})),_.uniform1i(F,s==="color"?1:0),_.uniform1i(x,l?1:0)}}])}(ke),G(e,"ANGLE_1",0),G(e,"ANGLE_2",2*Math.PI/3),G(e,"ANGLE_3",4*Math.PI/3),G(e,"textureManager",m),e}Ft(),Ft({keepWithinCircle:!1,size:{mode:"force",value:256},drawingMode:"color",correctCentering:!0});function qo(r){if(Array.isArray(r))return r}function Ko(r,e){var t=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(t!=null){var n,i,o,a,s=[],l=!0,c=!1;try{if(o=(t=t.call(r)).next,e!==0)for(;!(l=(n=o.call(t)).done)&&(s.push(n.value),s.length!==e);l=!0);}catch(u){c=!0,i=u}finally{try{if(!l&&t.return!=null&&(a=t.return(),Object(a)!==a))return}finally{if(c)throw i}}return s}}function Nt(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=Array(e);t<e;t++)n[t]=r[t];return n}function rn(r,e){if(r){if(typeof r=="string")return Nt(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Nt(r,e):void 0}}function Zo(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function nn(r,e){return qo(r)||Ko(r,e)||rn(r,e)||Zo()}function Qo(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Jo(r,e){if(typeof r!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var n=t.call(r,e||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function on(r){var e=Jo(r,"string");return typeof e=="symbol"?e:e+""}function ea(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,on(n.key),n)}}function ta(r,e,t){return ea(r.prototype,e),Object.defineProperty(r,"prototype",{writable:!1}),r}function je(r){return je=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},je(r)}function an(){try{var r=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(an=function(){return!!r})()}function ra(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function na(r,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return ra(r)}function ia(r,e,t){return e=je(e),na(r,an()?Reflect.construct(e,t,je(r).constructor):e.apply(r,t))}function Pt(r,e){return Pt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},Pt(r,e)}function oa(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),Object.defineProperty(r,"prototype",{writable:!1}),e&&Pt(r,e)}function ve(r,e,t){return(e=on(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function aa(r){if(Array.isArray(r))return Nt(r)}function sa(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function ca(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function we(r){return aa(r)||sa(r)||rn(r)||ca()}function sn(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function cn(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?sn(Object(t),!0).forEach(function(n){ve(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):sn(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function la(r){var e=r.slices,t=r.offset,n=`
precision highp float;

varying vec2 v_diffVector;
varying float v_radius;

#ifdef PICKING_MODE
varying vec4 v_color;
#else
// For normal mode, we use the border colors defined in the program:
`.concat(e.flatMap(function(i,o){var a=i.value;return"attribute"in a?["varying float v_sliceValue_".concat(o+1,";")]:[]}).join(`
`),`
`).concat(e.map(function(i,o){var a=i.color;return"attribute"in a?"varying vec4 v_sliceColor_".concat(o+1,";"):"uniform vec4 u_sliceColor_".concat(o+1,";")}).join(`
`),`
#endif

uniform vec4 u_defaultColor;
uniform float u_cameraAngle;
uniform float u_correctionRatio;

`).concat("attribute"in t?`varying float v_offset;
`:"",`
`).concat("value"in t?`uniform float u_offset;
`:"",`

const float bias = 255.0 / 254.0;
const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float aaBorder = u_correctionRatio * 2.0;;
  float dist = length(v_diffVector);
  float offset = `).concat("attribute"in t?"v_offset":"u_offset",`;
  float angle = atan(v_diffVector.y / v_diffVector.x);
  if (v_diffVector.x < 0.0 && v_diffVector.y < 0.0) angle += `).concat(Math.PI,`;
  else if (v_diffVector.x < 0.0) angle += `).concat(Math.PI,`;
  else if (v_diffVector.y < 0.0) angle += `).concat(2*Math.PI,`;
  angle = angle - u_cameraAngle + offset;
  angle = mod(angle, `).concat(2*Math.PI,`);

  // No antialiasing for picking mode:
  #ifdef PICKING_MODE
  if (dist > v_radius)
    gl_FragColor = transparent;
  else {
    gl_FragColor = v_color;
    gl_FragColor.a *= bias;
  }
  #else
  // Colors:
`).concat(e.map(function(i,o){var a=i.color,s=[];return"attribute"in a?s.push("  vec4 sliceColor_".concat(o+1," = v_sliceColor_").concat(o+1,";")):"transparent"in a?s.push("  vec4 sliceColor_".concat(o+1," = vec4(0.0, 0.0, 0.0, 0.0);")):s.push("  vec4 sliceColor_".concat(o+1," = u_sliceColor_").concat(o+1,";")),s.push("  sliceColor_".concat(o+1,".a *= bias;")),s.join(`
`)}).join(`
`),`
  vec4 color = u_defaultColor;
  color.a *= bias;

  // Sizes:
`).concat(e.map(function(i,o){var a=i.value;return"  float sliceValue_".concat(o+1," = ").concat("attribute"in a?"v_sliceValue_".concat(o+1):st(a.value),";")}).join(`
`),`

  // Angles and final color:
  float total = `).concat(e.map(function(i,o){return"sliceValue_".concat(o+1)}).join(" + "),`;
  float angle_0 = 0.0;
  if (total > 0.0) {
`).concat(e.map(function(i,o){return"    float angle_".concat(o+1," = angle_").concat(o," + sliceValue_").concat(o+1," * ").concat(2*Math.PI," / total;")}).join(`
`),`
    `).concat(e.map(function(i,o){return"if (angle < angle_".concat(o+1,") color = sliceColor_").concat(o+1,";")}).join(`
    else `),`
  }

  if (dist < v_radius - aaBorder) {
    gl_FragColor = color;
  } else if (dist < v_radius) {
    gl_FragColor = mix(transparent, color, (v_radius - dist) / aaBorder);
  }
  #endif
}
`);return n}function ua(r){var e=r.slices,t=r.offset,n=`
attribute vec4 a_id;
attribute vec2 a_position;
attribute float a_size;
attribute float a_angle;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec2 v_diffVector;
varying float v_radius;

`.concat("attribute"in t?`attribute float a_offset;
`:"",`
`).concat("attribute"in t?`varying float v_offset;
`:"",`

#ifdef PICKING_MODE
varying vec4 v_color;
#else
`).concat(e.flatMap(function(i,o){var a=i.value;return"attribute"in a?["attribute float a_sliceValue_".concat(o+1,";"),"varying float v_sliceValue_".concat(o+1,";")]:[]}).join(`
`),`
`).concat(e.flatMap(function(i,o){var a=i.color;return"attribute"in a?["attribute vec4 a_sliceColor_".concat(o+1,";"),"varying vec4 v_sliceColor_".concat(o+1,";")]:[]}).join(`
`),`
#endif

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main() {
  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;
  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));
  vec2 position = a_position + diffVector;
  gl_Position = vec4(
    (u_matrix * vec3(position, 1)).xy,
    0,
    1
  );

  v_radius = size / 2.0;
  v_diffVector = diffVector;
  `).concat("attribute"in t?`v_offset = a_offset;
`:"",`

  #ifdef PICKING_MODE
  v_color = a_id;
  #else
`).concat(e.flatMap(function(i,o){var a=i.value;return"attribute"in a?["  v_sliceValue_".concat(o+1," = a_sliceValue_").concat(o+1,";")]:[]}).join(`
`),`
`).concat(e.flatMap(function(i,o){var a=i.color;return"attribute"in a?["  v_sliceColor_".concat(o+1," = a_sliceColor_").concat(o+1,";")]:[]}).join(`
`),`
  #endif
}
`);return n}var Dt="#000000",ha={drawLabel:void 0,drawHover:void 0,defaultColor:Dt,offset:{value:0}},ln=WebGLRenderingContext,un=ln.UNSIGNED_BYTE,Ae=ln.FLOAT;function da(r){var e,t=cn(cn({},ha),r),n=t.slices,i=t.offset,o=t.drawHover,a=t.drawLabel,s=["u_sizeRatio","u_correctionRatio","u_cameraAngle","u_matrix","u_defaultColor"].concat(we("value"in i?["u_offset"]:[]),we(n.flatMap(function(l,c){var u=l.color;return"value"in u?["u_sliceColor_".concat(c+1)]:[]})));return e=function(l){function c(){var u;Qo(this,c);for(var d=arguments.length,h=new Array(d),m=0;m<d;m++)h[m]=arguments[m];return u=ia(this,c,[].concat(h)),ve(u,"drawLabel",a),ve(u,"drawHover",o),u}return oa(c,l),ta(c,[{key:"getDefinition",value:function(){return{VERTICES:3,VERTEX_SHADER_SOURCE:ua(t),FRAGMENT_SHADER_SOURCE:la(t),METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:s,ATTRIBUTES:[{name:"a_position",size:2,type:Ae},{name:"a_id",size:4,type:un,normalized:!0},{name:"a_size",size:1,type:Ae}].concat(we("attribute"in i?[{name:"a_offset",size:1,type:Ae}]:[]),we(n.flatMap(function(d,h){var m=d.color;return"attribute"in m?[{name:"a_sliceColor_".concat(h+1),size:4,type:un,normalized:!0}]:[]})),we(n.flatMap(function(d,h){var m=d.value;return"attribute"in m?[{name:"a_sliceValue_".concat(h+1),size:1,type:Ae}]:[]}))),CONSTANT_ATTRIBUTES:[{name:"a_angle",size:1,type:Ae}],CONSTANT_DATA:[[c.ANGLE_1],[c.ANGLE_2],[c.ANGLE_3]]}}},{key:"processVisibleItem",value:function(d,h,m){var g=this.array;g[h++]=m.x,g[h++]=m.y,g[h++]=d,g[h++]=m.size,"attribute"in i&&(g[h++]=m[i.attribute]||0),n.forEach(function(b){var E=b.color;"attribute"in E&&(g[h++]=X(m[E.attribute]||E.defaultValue||Dt))}),n.forEach(function(b){var E=b.value;"attribute"in E&&(g[h++]=m[E.attribute]||0)})}},{key:"setUniforms",value:function(d,h){var m=h.gl,g=h.uniformLocations,b=g.u_sizeRatio,E=g.u_correctionRatio,v=g.u_cameraAngle,T=g.u_matrix,_=g.u_defaultColor;m.uniform1f(E,d.correctionRatio),m.uniform1f(b,d.sizeRatio),m.uniform1f(v,d.cameraAngle),m.uniformMatrix3fv(T,!1,d.matrix),"value"in i&&m.uniform1f(g.u_offset,i.value);var f=nt(t.defaultColor||Dt),p=nn(f,4),y=p[0],R=p[1],S=p[2],F=p[3];m.uniform4f(_,y/255,R/255,S/255,F/255),n.forEach(function(x,D){var k=x.color;if("value"in k){var z=g["u_sliceColor_".concat(D+1)],M=nt(k.value),H=nn(M,4),w=H[0],C=H[1],A=H[2],N=H[3];m.uniform4f(z,w/255,C/255,A/255,N/255)}})}}])}(ke),ve(e,"ANGLE_1",0),ve(e,"ANGLE_2",2*Math.PI/3),ve(e,"ANGLE_3",4*Math.PI/3),e}const hn=r=>r,dn=r=>r*r,fn=r=>r*(2-r),gn=r=>(r*=2)<1?.5*r*r:-.5*(--r*(r-2)-1),mn=r=>r*r*r,vn=r=>--r*r*r+1,pn=r=>(r*=2)<1?.5*r*r*r:.5*((r-=2)*r*r+2),Ot={linear:hn,quadraticIn:dn,quadraticOut:fn,quadraticInOut:gn,cubicIn:mn,cubicOut:vn,cubicInOut:pn},kt={easing:"quadraticInOut",duration:150};function fa(r,e,t,n){const i=Object.assign({},kt,t),o=typeof i.easing=="function"?i.easing:Ot[i.easing],a=Date.now(),s={};for(const u in e){const d=e[u];s[u]={};for(const h in d)s[u][h]=r.getNodeAttribute(u,h)}let l=null;const c=()=>{l=null;let u=(Date.now()-a)/i.duration;if(u>=1){for(const d in e){const h=e[d];for(const m in h)r.setNodeAttribute(d,m,h[m])}typeof n=="function"&&n();return}u=o(u);for(const d in e){const h=e[d],m=s[d];for(const g in h)r.setNodeAttribute(d,g,h[g]*u+m[g]*(1-u))}l=requestAnimationFrame(c)};return c(),()=>{l&&cancelAnimationFrame(l)}}const Ve={black:"#000000",silver:"#C0C0C0",gray:"#808080",grey:"#808080",white:"#FFFFFF",maroon:"#800000",red:"#FF0000",purple:"#800080",fuchsia:"#FF00FF",green:"#008000",lime:"#00FF00",olive:"#808000",yellow:"#FFFF00",navy:"#000080",blue:"#0000FF",teal:"#008080",aqua:"#00FFFF",darkblue:"#00008B",mediumblue:"#0000CD",darkgreen:"#006400",darkcyan:"#008B8B",deepskyblue:"#00BFFF",darkturquoise:"#00CED1",mediumspringgreen:"#00FA9A",springgreen:"#00FF7F",cyan:"#00FFFF",midnightblue:"#191970",dodgerblue:"#1E90FF",lightseagreen:"#20B2AA",forestgreen:"#228B22",seagreen:"#2E8B57",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",limegreen:"#32CD32",mediumseagreen:"#3CB371",turquoise:"#40E0D0",royalblue:"#4169E1",steelblue:"#4682B4",darkslateblue:"#483D8B",mediumturquoise:"#48D1CC",indigo:"#4B0082",darkolivegreen:"#556B2F",cadetblue:"#5F9EA0",cornflowerblue:"#6495ED",rebeccapurple:"#663399",mediumaquamarine:"#66CDAA",dimgray:"#696969",dimgrey:"#696969",slateblue:"#6A5ACD",olivedrab:"#6B8E23",slategray:"#708090",slategrey:"#708090",lightslategray:"#778899",lightslategrey:"#778899",mediumslateblue:"#7B68EE",lawngreen:"#7CFC00",chartreuse:"#7FFF00",aquamarine:"#7FFFD4",skyblue:"#87CEEB",lightskyblue:"#87CEFA",blueviolet:"#8A2BE2",darkred:"#8B0000",darkmagenta:"#8B008B",saddlebrown:"#8B4513",darkseagreen:"#8FBC8F",lightgreen:"#90EE90",mediumpurple:"#9370DB",darkviolet:"#9400D3",palegreen:"#98FB98",darkorchid:"#9932CC",yellowgreen:"#9ACD32",sienna:"#A0522D",brown:"#A52A2A",darkgray:"#A9A9A9",darkgrey:"#A9A9A9",lightblue:"#ADD8E6",greenyellow:"#ADFF2F",paleturquoise:"#AFEEEE",lightsteelblue:"#B0C4DE",powderblue:"#B0E0E6",firebrick:"#B22222",darkgoldenrod:"#B8860B",mediumorchid:"#BA55D3",rosybrown:"#BC8F8F",darkkhaki:"#BDB76B",mediumvioletred:"#C71585",indianred:"#CD5C5C",peru:"#CD853F",chocolate:"#D2691E",tan:"#D2B48C",lightgray:"#D3D3D3",lightgrey:"#D3D3D3",thistle:"#D8BFD8",orchid:"#DA70D6",goldenrod:"#DAA520",palevioletred:"#DB7093",crimson:"#DC143C",gainsboro:"#DCDCDC",plum:"#DDA0DD",burlywood:"#DEB887",lightcyan:"#E0FFFF",lavender:"#E6E6FA",darksalmon:"#E9967A",violet:"#EE82EE",palegoldenrod:"#EEE8AA",lightcoral:"#F08080",khaki:"#F0E68C",aliceblue:"#F0F8FF",honeydew:"#F0FFF0",azure:"#F0FFFF",sandybrown:"#F4A460",wheat:"#F5DEB3",beige:"#F5F5DC",whitesmoke:"#F5F5F5",mintcream:"#F5FFFA",ghostwhite:"#F8F8FF",salmon:"#FA8072",antiquewhite:"#FAEBD7",linen:"#FAF0E6",lightgoldenrodyellow:"#FAFAD2",oldlace:"#FDF5E6",magenta:"#FF00FF",deeppink:"#FF1493",orangered:"#FF4500",tomato:"#FF6347",hotpink:"#FF69B4",coral:"#FF7F50",darkorange:"#FF8C00",lightsalmon:"#FFA07A",orange:"#FFA500",lightpink:"#FFB6C1",pink:"#FFC0CB",gold:"#FFD700",peachpuff:"#FFDAB9",navajowhite:"#FFDEAD",moccasin:"#FFE4B5",bisque:"#FFE4C4",mistyrose:"#FFE4E1",blanchedalmond:"#FFEBCD",papayawhip:"#FFEFD5",lavenderblush:"#FFF0F5",seashell:"#FFF5EE",cornsilk:"#FFF8DC",lemonchiffon:"#FFFACD",floralwhite:"#FFFAF0",snow:"#FFFAFA",lightyellow:"#FFFFE0",ivory:"#FFFFF0"};function ga(r,e,t,n){const i=n||new Uint8Array(4);return r.readPixels(e,t,1,1,r.RGBA,r.UNSIGNED_BYTE,i),i}const _n=new Int8Array(4),We=new Int32Array(_n.buffer,0,1),bn=new Float32Array(_n.buffer,0,1),ma=/^\s*rgba?\s*\(/,va=/^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;function yn(r){let e=0,t=0,n=0,i=1;if(r[0]==="#")r.length===4?(e=parseInt(r.charAt(1)+r.charAt(1),16),t=parseInt(r.charAt(2)+r.charAt(2),16),n=parseInt(r.charAt(3)+r.charAt(3),16)):(e=parseInt(r.charAt(1)+r.charAt(2),16),t=parseInt(r.charAt(3)+r.charAt(4),16),n=parseInt(r.charAt(5)+r.charAt(6),16)),r.length===9&&(i=parseInt(r.charAt(7)+r.charAt(8),16)/255);else if(ma.test(r)){const o=r.match(va);o&&(e=+o[1],t=+o[2],n=+o[3],o[4]&&(i=+o[4]))}return{r:e,g:t,b:n,a:i}}const pe={};for(const r in Ve)pe[r]=V(Ve[r]),pe[Ve[r]]=pe[r];function It(r,e,t,n,i){return We[0]=n<<24|t<<16|e<<8|r,i&&(We[0]=We[0]&4278190079),bn[0]}function V(r){if(r=r.toLowerCase(),typeof pe[r]<"u")return pe[r];const e=yn(r),{r:t,g:n,b:i}=e;let{a:o}=e;o=o*255|0;const a=It(t,n,i,o,!0);return pe[r]=a,a}function pa(r,e){bn[0]=V(r);let t=We[0];e&&(t=t|16777216);const n=t&255,i=t>>8&255,o=t>>16&255,a=t>>24&255;return[n,i,o,a]}const zt={};function Gt(r){if(typeof zt[r]<"u")return zt[r];const e=(r&16711680)>>>16,t=(r&65280)>>>8,n=r&255,o=It(e,t,n,255,!0);return zt[r]=o,o}function Mt(r,e,t,n){return t+(e<<8)+(r<<16)}function Ut(r,e,t,n,i,o){const a=Math.floor(t/o*i),s=Math.floor(r.drawingBufferHeight/o-n/o*i),l=new Uint8Array(4);r.bindFramebuffer(r.FRAMEBUFFER,e),r.readPixels(a,s,1,1,r.RGBA,r.UNSIGNED_BYTE,l);const[c,u,d,h]=l;return[c,u,d,h]}function j(){return Float32Array.of(1,0,0,0,1,0,0,0,1)}function Se(r,e,t){return r[0]=e,r[4]=typeof t=="number"?t:e,r}function Bt(r,e){const t=Math.sin(e),n=Math.cos(e);return r[0]=n,r[1]=t,r[3]=-t,r[4]=n,r}function Ht(r,e,t){return r[6]=e,r[7]=t,r}function q(r,e){const t=r[0],n=r[1],i=r[2],o=r[3],a=r[4],s=r[5],l=r[6],c=r[7],u=r[8],d=e[0],h=e[1],m=e[2],g=e[3],b=e[4],E=e[5],v=e[6],T=e[7],_=e[8];return r[0]=d*t+h*o+m*l,r[1]=d*n+h*a+m*c,r[2]=d*i+h*s+m*u,r[3]=g*t+b*o+E*l,r[4]=g*n+b*a+E*c,r[5]=g*i+b*s+E*u,r[6]=v*t+T*o+_*l,r[7]=v*n+T*a+_*c,r[8]=v*i+T*s+_*u,r}function Ye(r,e,t=1){const n=r[0],i=r[1],o=r[3],a=r[4],s=r[6],l=r[7],c=e.x,u=e.y;return{x:c*n+u*o+s*t,y:c*i+u*a+l*t}}function En(r,e){const t=r.height/r.width,n=e.height/e.width;return t<1&&n>1||t>1&&n<1?1:Math.min(Math.max(n,1/n),Math.max(1/t,t))}function _e(r,e,t,n,i){const{angle:o,ratio:a,x:s,y:l}=r,{width:c,height:u}=e,d=j(),h=Math.min(c,u)-2*n,m=En(e,t);return i?(q(d,Ht(j(),s,l)),q(d,Se(j(),a)),q(d,Bt(j(),o)),q(d,Se(j(),c/h/2/m,u/h/2/m))):(q(d,Se(j(),2*(h/c)*m,2*(h/u)*m)),q(d,Bt(j(),-o)),q(d,Se(j(),1/a)),q(d,Ht(j(),-s,-l))),d}function Tn(r,e,t){const{x:n,y:i}=Ye(r,{x:Math.cos(e.angle),y:Math.sin(e.angle)},0);return 1/Math.sqrt(Math.pow(n,2)+Math.pow(i,2))/t.width}function $t(r,e){const t=e.size;if(t===0)return;const n=r.length;r.length+=t;let i=0;e.forEach(o=>{r[n+i]=o,i++})}function Rn(r){return typeof r=="object"&&r!==null&&r.constructor===Object}function Xe(r,...e){r=r||{};for(let t=0,n=e.length;t<n;t++){const i=e[t];i&&Object.assign(r,i)}return r}function Cn(r,...e){r=r||{};for(let t=0,n=e.length;t<n;t++){const i=e[t];if(i)for(const o in i)Rn(i[o])?r[o]=Cn(r[o],i[o]):r[o]=i[o]}return r}function wn(r){if(!r.order)return{x:[0,1],y:[0,1]};let e=1/0,t=-1/0,n=1/0,i=-1/0;return r.forEachNode((o,a)=>{const{x:s,y:l}=a;s<e&&(e=s),s>t&&(t=s),l<n&&(n=l),l>i&&(i=l)}),{x:[e,t],y:[n,i]}}function An(r){if(!Gi(r))throw new Error("Sigma: invalid graph instance.");r.forEachNode((e,t)=>{if(!Number.isFinite(t.x)||!Number.isFinite(t.y))throw new Error(`Sigma: Coordinates of node ${e} are invalid. A node must have a numeric 'x' and 'y' attribute.`)})}function Sn(r,e,t){const n=document.createElement(r);if(e)for(const i in e)n.style[i]=e[i];if(t)for(const i in t)n.setAttribute(i,t[i]);return n}function jt(){return typeof window.devicePixelRatio<"u"?window.devicePixelRatio:1}function Vt(r,e,t){return t.sort(function(n,i){const o=e(n)||0,a=e(i)||0;return o<a?-1:o>a?1:0})}function Wt(r){const{x:[e,t],y:[n,i]}=r;let o=Math.max(t-e,i-n),a=(t+e)/2,s=(i+n)/2;(o===0||Math.abs(o)===1/0||isNaN(o))&&(o=1),isNaN(a)&&(a=0),isNaN(s)&&(s=0);const l=c=>({x:.5+(c.x-a)/o,y:.5+(c.y-s)/o});return l.applyTo=c=>{c.x=.5+(c.x-a)/o,c.y=.5+(c.y-s)/o},l.inverse=c=>({x:a+o*(c.x-.5),y:s+o*(c.y-.5)}),l.ratio=o,l}const _a=Object.freeze(Object.defineProperty({__proto__:null,ANIMATE_DEFAULTS:kt,HTML_COLORS:Ve,animateNodes:fa,assign:Xe,assignDeep:Cn,colorToArray:pa,colorToIndex:Mt,createElement:Sn,createNormalizationFunction:Wt,cubicIn:mn,cubicInOut:pn,cubicOut:vn,easings:Ot,extend:$t,extractPixel:ga,floatColor:V,getCorrectionRatio:En,getMatrixImpact:Tn,getPixelColor:Ut,getPixelRatio:jt,graphExtent:wn,identity:j,indexToColor:Gt,isPlainObject:Rn,linear:hn,matrixFromCamera:_e,multiply:q,multiplyVec2:Ye,parseColor:yn,quadraticIn:dn,quadraticInOut:gn,quadraticOut:fn,rgbaToFloat:It,rotate:Bt,scale:Se,translate:Ht,validateGraph:An,zIndexOrdering:Vt},Symbol.toStringTag,{value:"Module"}));function xn(r){return r.normalized?1:r.size}function qe(r){let e=0;return r.forEach(t=>e+=xn(t)),e}function Ln(r,e,t){const n=r==="VERTEX"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,i=e.createShader(n);if(i===null)throw new Error("loadShader: error while creating the shader");if(e.shaderSource(i,t),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){const a=e.getShaderInfoLog(i);throw e.deleteShader(i),new Error(`loadShader: error while compiling the shader:
${a}
${t}`)}return i}function Fn(r,e){return Ln("VERTEX",r,e)}function Nn(r,e){return Ln("FRAGMENT",r,e)}function Pn(r,e){const t=r.createProgram();if(t===null)throw new Error("loadProgram: error while creating the program.");let n,i;for(n=0,i=e.length;n<i;n++)r.attachShader(t,e[n]);if(r.linkProgram(t),!r.getProgramParameter(t,r.LINK_STATUS))throw r.deleteProgram(t),new Error("loadProgram: error while linking the program.");return t}function Yt({gl:r,buffer:e,program:t,vertexShader:n,fragmentShader:i}){r.deleteShader(n),r.deleteShader(i),r.deleteProgram(t),r.deleteBuffer(e)}function ba(r){return r%1===0?r.toFixed(1):r.toString()}const Dn=`#define PICKING_MODE
`,ya={[WebGL2RenderingContext.BOOL]:1,[WebGL2RenderingContext.BYTE]:1,[WebGL2RenderingContext.UNSIGNED_BYTE]:1,[WebGL2RenderingContext.SHORT]:2,[WebGL2RenderingContext.UNSIGNED_SHORT]:2,[WebGL2RenderingContext.INT]:4,[WebGL2RenderingContext.UNSIGNED_INT]:4,[WebGL2RenderingContext.FLOAT]:4};class Xt{constructor(e,t,n){}}class qt{constructor(e,t,n){this.array=new Float32Array,this.constantArray=new Float32Array,this.capacity=0,this.verticesCount=0;const i=this.getDefinition();if(this.VERTICES=i.VERTICES,this.VERTEX_SHADER_SOURCE=i.VERTEX_SHADER_SOURCE,this.FRAGMENT_SHADER_SOURCE=i.FRAGMENT_SHADER_SOURCE,this.UNIFORMS=i.UNIFORMS,this.ATTRIBUTES=i.ATTRIBUTES,this.METHOD=i.METHOD,this.CONSTANT_ATTRIBUTES="CONSTANT_ATTRIBUTES"in i?i.CONSTANT_ATTRIBUTES:[],this.CONSTANT_DATA="CONSTANT_DATA"in i?i.CONSTANT_DATA:[],this.isInstanced="CONSTANT_ATTRIBUTES"in i,this.ATTRIBUTES_ITEMS_COUNT=qe(this.ATTRIBUTES),this.STRIDE=this.VERTICES*this.ATTRIBUTES_ITEMS_COUNT,this.renderer=n,this.normalProgram=this.getProgramInfo("normal",e,i.VERTEX_SHADER_SOURCE,i.FRAGMENT_SHADER_SOURCE,null),this.pickProgram=t?this.getProgramInfo("pick",e,Dn+i.VERTEX_SHADER_SOURCE,Dn+i.FRAGMENT_SHADER_SOURCE,t):null,this.isInstanced){const o=qe(this.CONSTANT_ATTRIBUTES);if(this.CONSTANT_DATA.length!==this.VERTICES)throw new Error(`Program: error while getting constant data (expected ${this.VERTICES} items, received ${this.CONSTANT_DATA.length} instead)`);this.constantArray=new Float32Array(this.CONSTANT_DATA.length*o);for(let a=0;a<this.CONSTANT_DATA.length;a++){const s=this.CONSTANT_DATA[a];if(s.length!==o)throw new Error(`Program: error while getting constant data (one vector has ${s.length} items instead of ${o})`);for(let l=0;l<s.length;l++)this.constantArray[a*o+l]=s[l]}this.STRIDE=this.ATTRIBUTES_ITEMS_COUNT}}kill(){Yt(this.normalProgram),this.pickProgram&&(Yt(this.pickProgram),this.pickProgram=null)}getProgramInfo(e,t,n,i,o){const a=this.getDefinition(),s=t.createBuffer();if(s===null)throw new Error("Program: error while creating the WebGL buffer.");const l=Fn(t,n),c=Nn(t,i),u=Pn(t,[l,c]),d={};a.UNIFORMS.forEach(g=>{const b=t.getUniformLocation(u,g);b&&(d[g]=b)});const h={};a.ATTRIBUTES.forEach(g=>{h[g.name]=t.getAttribLocation(u,g.name)});let m;if("CONSTANT_ATTRIBUTES"in a&&(a.CONSTANT_ATTRIBUTES.forEach(g=>{h[g.name]=t.getAttribLocation(u,g.name)}),m=t.createBuffer(),m===null))throw new Error("Program: error while creating the WebGL constant buffer.");return{name:e,program:u,gl:t,frameBuffer:o,buffer:s,constantBuffer:m||{},uniformLocations:d,attributeLocations:h,isPicking:e==="pick",vertexShader:l,fragmentShader:c}}bindProgram(e){let t=0;const{gl:n,buffer:i}=e;this.isInstanced?(n.bindBuffer(n.ARRAY_BUFFER,e.constantBuffer),t=0,this.CONSTANT_ATTRIBUTES.forEach(o=>t+=this.bindAttribute(o,e,t,!1)),n.bufferData(n.ARRAY_BUFFER,this.constantArray,n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,e.buffer),t=0,this.ATTRIBUTES.forEach(o=>t+=this.bindAttribute(o,e,t,!0)),n.bufferData(n.ARRAY_BUFFER,this.array,n.DYNAMIC_DRAW)):(n.bindBuffer(n.ARRAY_BUFFER,i),t=0,this.ATTRIBUTES.forEach(o=>t+=this.bindAttribute(o,e,t)),n.bufferData(n.ARRAY_BUFFER,this.array,n.DYNAMIC_DRAW)),n.bindBuffer(n.ARRAY_BUFFER,null)}unbindProgram(e){this.isInstanced?(this.CONSTANT_ATTRIBUTES.forEach(t=>this.unbindAttribute(t,e,!1)),this.ATTRIBUTES.forEach(t=>this.unbindAttribute(t,e,!0))):this.ATTRIBUTES.forEach(t=>this.unbindAttribute(t,e))}bindAttribute(e,t,n,i){const o=ya[e.type];if(typeof o!="number")throw new Error(`Program.bind: yet unsupported attribute type "${e.type}"`);const a=t.attributeLocations[e.name],s=t.gl;if(a!==-1){s.enableVertexAttribArray(a);const l=this.isInstanced?(i?this.ATTRIBUTES_ITEMS_COUNT:qe(this.CONSTANT_ATTRIBUTES))*Float32Array.BYTES_PER_ELEMENT:this.ATTRIBUTES_ITEMS_COUNT*Float32Array.BYTES_PER_ELEMENT;if(s.vertexAttribPointer(a,e.size,e.type,e.normalized||!1,l,n),this.isInstanced&&i)if(s instanceof WebGL2RenderingContext)s.vertexAttribDivisor(a,1);else{const c=s.getExtension("ANGLE_instanced_arrays");c&&c.vertexAttribDivisorANGLE(a,1)}}return e.size*o}unbindAttribute(e,t,n){const i=t.attributeLocations[e.name],o=t.gl;if(i!==-1&&(o.disableVertexAttribArray(i),this.isInstanced&&n))if(o instanceof WebGL2RenderingContext)o.vertexAttribDivisor(i,0);else{const a=o.getExtension("ANGLE_instanced_arrays");a&&a.vertexAttribDivisorANGLE(i,0)}}reallocate(e){e!==this.capacity&&(this.capacity=e,this.verticesCount=this.VERTICES*e,this.array=new Float32Array(this.isInstanced?this.capacity*this.ATTRIBUTES_ITEMS_COUNT:this.verticesCount*this.ATTRIBUTES_ITEMS_COUNT))}hasNothingToRender(){return this.verticesCount===0}renderProgram(e,t){const{gl:n,program:i}=t;n.enable(n.BLEND),n.useProgram(i),this.setUniforms(e,t),this.drawWebGL(this.METHOD,t)}render(e){this.hasNothingToRender()||(this.pickProgram&&(this.pickProgram.gl.viewport(0,0,e.width*e.pixelRatio/e.downSizingRatio,e.height*e.pixelRatio/e.downSizingRatio),this.bindProgram(this.pickProgram),this.renderProgram({...e,pixelRatio:e.pixelRatio/e.downSizingRatio},this.pickProgram),this.unbindProgram(this.pickProgram)),this.normalProgram.gl.viewport(0,0,e.width*e.pixelRatio,e.height*e.pixelRatio),this.bindProgram(this.normalProgram),this.renderProgram(e,this.normalProgram),this.unbindProgram(this.normalProgram))}drawWebGL(e,{gl:t,frameBuffer:n}){if(t.bindFramebuffer(t.FRAMEBUFFER,n),!this.isInstanced)t.drawArrays(e,0,this.verticesCount);else if(t instanceof WebGL2RenderingContext)t.drawArraysInstanced(e,0,this.VERTICES,this.capacity);else{const i=t.getExtension("ANGLE_instanced_arrays");i&&i.drawArraysInstancedANGLE(e,0,this.VERTICES,this.capacity)}}}class Ea extends Xt{}class Kt extends qt{kill(){super.kill()}process(e,t,n){let i=t*this.STRIDE;if(n.hidden){for(let o=i+this.STRIDE;i<o;i++)this.array[i]=0;return}return this.processVisibleItem(Gt(e),i,n)}}function Ta(r,e,t){return class{constructor(i,o,a){this.drawLabel=e,this.drawHover=t,this.programs=r.map(s=>new s(i,o,a))}reallocate(i){this.programs.forEach(o=>o.reallocate(i))}process(i,o,a){this.programs.forEach(s=>s.process(i,o,a))}render(i){this.programs.forEach(o=>o.render(i))}kill(){this.programs.forEach(i=>i.kill())}}}class Ra extends Xt{}class se extends qt{constructor(){super(...arguments),this.drawLabel=void 0}kill(){super.kill()}process(e,t,n,i,o){let a=t*this.STRIDE;if(o.hidden||n.hidden||i.hidden){for(let s=a+this.STRIDE;a<s;a++)this.array[a]=0;return}return this.processVisibleItem(Gt(e),a,n,i,o)}}function Zt(r,e){return class{constructor(n,i,o){this.drawLabel=e,this.programs=r.map(a=>new a(n,i,o))}reallocate(n){this.programs.forEach(i=>i.reallocate(n))}process(n,i,o,a,s){this.programs.forEach(l=>l.process(n,i,o,a,s))}render(n){this.programs.forEach(i=>i.render(n))}kill(){this.programs.forEach(n=>n.kill())}}}function On(r,e,t,n,i){const o=i.edgeLabelSize,a=i.edgeLabelFont,s=i.edgeLabelWeight,l=i.edgeLabelColor.attribute?e[i.edgeLabelColor.attribute]||i.edgeLabelColor.color||"#000":i.edgeLabelColor.color;let c=e.label;if(!c)return;r.fillStyle=l,r.font=`${s} ${o}px ${a}`;const u=t.size,d=n.size;let h=t.x,m=t.y,g=n.x,b=n.y,E=(h+g)/2,v=(m+b)/2,T=g-h,_=b-m,f=Math.sqrt(T*T+_*_);if(f<u+d)return;h+=T*u/f,m+=_*u/f,g-=T*d/f,b-=_*d/f,E=(h+g)/2,v=(m+b)/2,T=g-h,_=b-m,f=Math.sqrt(T*T+_*_);let p=r.measureText(c).width;if(p>f){const R="…";for(c=c+R,p=r.measureText(c).width;p>f&&c.length>1;)c=c.slice(0,-2)+R,p=r.measureText(c).width;if(c.length<4)return}let y;T>0?_>0?y=Math.acos(T/f):y=Math.asin(_/f):_>0?y=Math.acos(T/f)+Math.PI:y=Math.asin(T/f)+Math.PI/2,r.save(),r.translate(E,v),r.rotate(y),r.fillText(c,-p/2,e.size/2+o),r.restore()}function Qt(r,e,t){if(!e.label)return;const n=t.labelSize,i=t.labelFont,o=t.labelWeight,a=t.labelColor.attribute?e[t.labelColor.attribute]||t.labelColor.color||"#000":t.labelColor.color;r.fillStyle=a,r.font=`${o} ${n}px ${i}`,r.fillText(e.label,e.x+e.size+3,e.y+n/3)}function kn(r,e,t){const n=t.labelSize,i=t.labelFont,o=t.labelWeight;r.font=`${o} ${n}px ${i}`,r.fillStyle="#FFF",r.shadowOffsetX=0,r.shadowOffsetY=0,r.shadowBlur=8,r.shadowColor="#000";const a=2;if(typeof e.label=="string"){const s=r.measureText(e.label).width,l=Math.round(s+5),c=Math.round(n+2*a),u=Math.max(e.size,n/2)+a,d=Math.asin(c/2/u),h=Math.sqrt(Math.abs(Math.pow(u,2)-Math.pow(c/2,2)));r.beginPath(),r.moveTo(e.x+h,e.y+c/2),r.lineTo(e.x+u+l,e.y+c/2),r.lineTo(e.x+u+l,e.y-c/2),r.lineTo(e.x+h,e.y-c/2),r.arc(e.x,e.y,u,d,-d),r.closePath(),r.fill()}else r.beginPath(),r.arc(e.x,e.y,e.size+a,0,Math.PI*2),r.closePath(),r.fill();r.shadowOffsetX=0,r.shadowOffsetY=0,r.shadowBlur=0,Qt(r,e,t)}const Ca=`
precision highp float;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;

uniform float u_correctionRatio;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float border = u_correctionRatio * 2.0;
  float dist = length(v_diffVector) - v_radius + border;

  // No antialiasing for picking mode:
  #ifdef PICKING_MODE
  if (dist > border)
    gl_FragColor = transparent;
  else
    gl_FragColor = v_color;

  #else
  float t = 0.0;
  if (dist > border)
    t = 1.0;
  else if (dist > 0.0)
    t = dist / border;

  gl_FragColor = mix(v_color, transparent, t);
  #endif
}
`,wa=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_position;
attribute float a_size;
attribute float a_angle;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;
varying float v_border;

const float bias = 255.0 / 254.0;

void main() {
  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;
  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));
  vec2 position = a_position + diffVector;
  gl_Position = vec4(
    (u_matrix * vec3(position, 1)).xy,
    0,
    1
  );

  v_diffVector = diffVector;
  v_radius = size / 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,{UNSIGNED_BYTE:In,FLOAT:Jt}=WebGLRenderingContext,Aa=["u_sizeRatio","u_correctionRatio","u_matrix"],re=class re extends Kt{getDefinition(){return{VERTICES:3,VERTEX_SHADER_SOURCE:wa,FRAGMENT_SHADER_SOURCE:Ca,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Aa,ATTRIBUTES:[{name:"a_position",size:2,type:Jt},{name:"a_size",size:1,type:Jt},{name:"a_color",size:4,type:In,normalized:!0},{name:"a_id",size:4,type:In,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_angle",size:1,type:Jt}],CONSTANT_DATA:[[re.ANGLE_1],[re.ANGLE_2],[re.ANGLE_3]]}}processVisibleItem(e,t,n){const i=this.array,o=V(n.color);i[t++]=n.x,i[t++]=n.y,i[t++]=n.size,i[t++]=o,i[t++]=e}setUniforms(e,{gl:t,uniformLocations:n}){const{u_sizeRatio:i,u_correctionRatio:o,u_matrix:a}=n;t.uniform1f(o,e.correctionRatio),t.uniform1f(i,e.sizeRatio),t.uniformMatrix3fv(a,!1,e.matrix)}};re.ANGLE_1=0,re.ANGLE_2=2*Math.PI/3,re.ANGLE_3=4*Math.PI/3;let Ke=re;const Sa=`
precision mediump float;

varying vec4 v_color;
varying float v_border;

const float radius = 0.5;
const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  vec2 m = gl_PointCoord - vec2(0.5, 0.5);
  float dist = radius - length(m);

  // No antialiasing for picking mode:
  #ifdef PICKING_MODE
  if (dist > v_border)
    gl_FragColor = v_color;
  else
    gl_FragColor = transparent;

  #else
  float t = 0.0;
  if (dist > v_border)
    t = 1.0;
  else if (dist > 0.0)
    t = dist / v_border;

  gl_FragColor = mix(transparent, v_color, t);
  #endif
}
`,xa=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_position;
attribute float a_size;

uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform mat3 u_matrix;

varying vec4 v_color;
varying float v_border;

const float bias = 255.0 / 254.0;

void main() {
  gl_Position = vec4(
    (u_matrix * vec3(a_position, 1)).xy,
    0,
    1
  );

  // Multiply the point size twice:
  //  - x SCALING_RATIO to correct the canvas scaling
  //  - x 2 to correct the formulae
  gl_PointSize = a_size / u_sizeRatio * u_pixelRatio * 2.0;

  v_border = (0.5 / a_size) * u_sizeRatio;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,{UNSIGNED_BYTE:zn,FLOAT:Gn}=WebGLRenderingContext,La=["u_sizeRatio","u_pixelRatio","u_matrix"];class Fa extends Kt{getDefinition(){return{VERTICES:1,VERTEX_SHADER_SOURCE:xa,FRAGMENT_SHADER_SOURCE:Sa,METHOD:WebGLRenderingContext.POINTS,UNIFORMS:La,ATTRIBUTES:[{name:"a_position",size:2,type:Gn},{name:"a_size",size:1,type:Gn},{name:"a_color",size:4,type:zn,normalized:!0},{name:"a_id",size:4,type:zn,normalized:!0}]}}processVisibleItem(e,t,n){const i=this.array;i[t++]=n.x,i[t++]=n.y,i[t++]=n.size,i[t++]=V(n.color),i[t++]=e}setUniforms({sizeRatio:e,pixelRatio:t,matrix:n},{gl:i,uniformLocations:o}){const{u_sizeRatio:a,u_pixelRatio:s,u_matrix:l}=o;i.uniform1f(s,t),i.uniform1f(a,e),i.uniformMatrix3fv(l,!1,n)}}const Na=`
precision mediump float;

varying vec4 v_color;

void main(void) {
  gl_FragColor = v_color;
}
`,Pa=`
attribute vec2 a_position;
attribute vec2 a_normal;
attribute float a_radius;
attribute vec3 a_barycentric;

#ifdef PICKING_MODE
attribute vec4 a_id;
#else
attribute vec4 a_color;
#endif

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_widenessToThicknessRatio;

varying vec4 v_color;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  float normalLength = length(a_normal);
  vec2 unitNormal = a_normal / normalLength;

  // These first computations are taken from edge.vert.glsl and
  // edge.clamped.vert.glsl. Please read it to get better comments on what's
  // happening:
  float pixelsThickness = max(normalLength / u_sizeRatio, minThickness);
  float webGLThickness = pixelsThickness * u_correctionRatio;
  float webGLNodeRadius = a_radius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;
  float webGLArrowHeadThickness = webGLThickness * u_widenessToThicknessRatio;

  float da = a_barycentric.x;
  float db = a_barycentric.y;
  float dc = a_barycentric.z;

  vec2 delta = vec2(
      da * (webGLNodeRadius * unitNormal.y)
    + db * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y + webGLArrowHeadThickness * unitNormal.x)
    + dc * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y - webGLArrowHeadThickness * unitNormal.x),

      da * (-webGLNodeRadius * unitNormal.x)
    + db * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x + webGLArrowHeadThickness * unitNormal.y)
    + dc * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x - webGLArrowHeadThickness * unitNormal.y)
  );

  vec2 position = (u_matrix * vec3(a_position + delta, 1)).xy;

  gl_Position = vec4(position, 0, 1);

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,{UNSIGNED_BYTE:Mn,FLOAT:Ze}=WebGLRenderingContext,Da=["u_matrix","u_sizeRatio","u_correctionRatio","u_minEdgeThickness","u_lengthToThicknessRatio","u_widenessToThicknessRatio"],Qe={extremity:"target",lengthToThicknessRatio:2.5,widenessToThicknessRatio:2};function xe(r){const e={...Qe,...r||{}};return class extends se{getDefinition(){return{VERTICES:3,VERTEX_SHADER_SOURCE:Pa,FRAGMENT_SHADER_SOURCE:Na,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Da,ATTRIBUTES:[{name:"a_position",size:2,type:Ze},{name:"a_normal",size:2,type:Ze},{name:"a_radius",size:1,type:Ze},{name:"a_color",size:4,type:Mn,normalized:!0},{name:"a_id",size:4,type:Mn,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_barycentric",size:3,type:Ze}],CONSTANT_DATA:[[1,0,0],[0,1,0],[0,0,1]]}}processVisibleItem(n,i,o,a,s){e.extremity==="source"&&([o,a]=[a,o]);const l=s.size||1,c=a.size||1,u=o.x,d=o.y,h=a.x,m=a.y,g=V(s.color),b=h-u,E=m-d;let v=b*b+E*E,T=0,_=0;v&&(v=1/Math.sqrt(v),T=-E*v*l,_=b*v*l);const f=this.array;f[i++]=h,f[i++]=m,f[i++]=-T,f[i++]=-_,f[i++]=c,f[i++]=g,f[i++]=n}setUniforms(n,{gl:i,uniformLocations:o}){const{u_matrix:a,u_sizeRatio:s,u_correctionRatio:l,u_minEdgeThickness:c,u_lengthToThicknessRatio:u,u_widenessToThicknessRatio:d}=o;i.uniformMatrix3fv(a,!1,n.matrix),i.uniform1f(s,n.sizeRatio),i.uniform1f(l,n.correctionRatio),i.uniform1f(c,n.minEdgeThickness),i.uniform1f(u,e.lengthToThicknessRatio),i.uniform1f(d,e.widenessToThicknessRatio)}}}const Oa=xe(),er=`
precision mediump float;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  // We only handle antialiasing for normal mode:
  #ifdef PICKING_MODE
  gl_FragColor = v_color;
  #else
  float dist = length(v_normal) * v_thickness;

  float t = smoothstep(
    v_thickness - v_feather,
    v_thickness,
    dist
  );

  gl_FragColor = mix(v_color, transparent, t);
  #endif
}
`,ka=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;
attribute float a_radius;
attribute float a_radiusCoef;

uniform mat3 u_matrix;
uniform float u_zoomRatio;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  float radius = a_radius * a_radiusCoef;
  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // These first computations are taken from edge.vert.glsl. Please read it to
  // get better comments on what's happening:
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here, we move the point to leave space for the arrow head:
  float direction = sign(radius);
  float webGLNodeRadius = direction * radius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;

  vec2 compensationVector = vec2(-direction * unitNormal.y, direction * unitNormal.x) * (webGLNodeRadius + webGLArrowHeadLength);

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness + compensationVector, 1)).xy, 0, 1);

  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,{UNSIGNED_BYTE:Un,FLOAT:ce}=WebGLRenderingContext,Ia=["u_matrix","u_zoomRatio","u_sizeRatio","u_correctionRatio","u_pixelRatio","u_feather","u_minEdgeThickness","u_lengthToThicknessRatio"],Bn={lengthToThicknessRatio:Qe.lengthToThicknessRatio};function tr(r){const e={...Bn,...r||{}};return class extends se{getDefinition(){return{VERTICES:6,VERTEX_SHADER_SOURCE:ka,FRAGMENT_SHADER_SOURCE:er,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Ia,ATTRIBUTES:[{name:"a_positionStart",size:2,type:ce},{name:"a_positionEnd",size:2,type:ce},{name:"a_normal",size:2,type:ce},{name:"a_color",size:4,type:Un,normalized:!0},{name:"a_id",size:4,type:Un,normalized:!0},{name:"a_radius",size:1,type:ce}],CONSTANT_ATTRIBUTES:[{name:"a_positionCoef",size:1,type:ce},{name:"a_normalCoef",size:1,type:ce},{name:"a_radiusCoef",size:1,type:ce}],CONSTANT_DATA:[[0,1,0],[0,-1,0],[1,1,1],[1,1,1],[0,-1,0],[1,-1,-1]]}}processVisibleItem(n,i,o,a,s){const l=s.size||1,c=o.x,u=o.y,d=a.x,h=a.y,m=V(s.color),g=d-c,b=h-u,E=a.size||1;let v=g*g+b*b,T=0,_=0;v&&(v=1/Math.sqrt(v),T=-b*v*l,_=g*v*l);const f=this.array;f[i++]=c,f[i++]=u,f[i++]=d,f[i++]=h,f[i++]=T,f[i++]=_,f[i++]=m,f[i++]=n,f[i++]=E}setUniforms(n,{gl:i,uniformLocations:o}){const{u_matrix:a,u_zoomRatio:s,u_feather:l,u_pixelRatio:c,u_correctionRatio:u,u_sizeRatio:d,u_minEdgeThickness:h,u_lengthToThicknessRatio:m}=o;i.uniformMatrix3fv(a,!1,n.matrix),i.uniform1f(s,n.zoomRatio),i.uniform1f(d,n.sizeRatio),i.uniform1f(u,n.correctionRatio),i.uniform1f(c,n.pixelRatio),i.uniform1f(l,n.antiAliasingFeather),i.uniform1f(h,n.minEdgeThickness),i.uniform1f(m,e.lengthToThicknessRatio)}}}const za=tr(),Ga=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;
attribute float a_sourceRadius;
attribute float a_targetRadius;
attribute float a_sourceRadiusCoef;
attribute float a_targetRadiusCoef;

uniform mat3 u_matrix;
uniform float u_zoomRatio;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // These first computations are taken from edge.vert.glsl. Please read it to
  // get better comments on what's happening:
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here, we move the point to leave space for the arrow heads:
  // Source arrow head
  float sourceRadius = a_sourceRadius * a_sourceRadiusCoef;
  float sourceDirection = sign(sourceRadius);
  float webGLSourceRadius = sourceDirection * sourceRadius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLSourceArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;
  vec2 sourceCompensationVector =
    vec2(-sourceDirection * unitNormal.y, sourceDirection * unitNormal.x)
    * (webGLSourceRadius + webGLSourceArrowHeadLength);
    
  // Target arrow head
  float targetRadius = a_targetRadius * a_targetRadiusCoef;
  float targetDirection = sign(targetRadius);
  float webGLTargetRadius = targetDirection * targetRadius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLTargetArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;
  vec2 targetCompensationVector =
  vec2(-targetDirection * unitNormal.y, targetDirection * unitNormal.x)
    * (webGLTargetRadius + webGLTargetArrowHeadLength);

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness + sourceCompensationVector + targetCompensationVector, 1)).xy, 0, 1);

  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,{UNSIGNED_BYTE:Hn,FLOAT:K}=WebGLRenderingContext,Ma=["u_matrix","u_zoomRatio","u_sizeRatio","u_correctionRatio","u_pixelRatio","u_feather","u_minEdgeThickness","u_lengthToThicknessRatio"],$n={lengthToThicknessRatio:Qe.lengthToThicknessRatio};function rr(r){const e={...$n,...r||{}};return class extends se{getDefinition(){return{VERTICES:6,VERTEX_SHADER_SOURCE:Ga,FRAGMENT_SHADER_SOURCE:er,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Ma,ATTRIBUTES:[{name:"a_positionStart",size:2,type:K},{name:"a_positionEnd",size:2,type:K},{name:"a_normal",size:2,type:K},{name:"a_color",size:4,type:Hn,normalized:!0},{name:"a_id",size:4,type:Hn,normalized:!0},{name:"a_sourceRadius",size:1,type:K},{name:"a_targetRadius",size:1,type:K}],CONSTANT_ATTRIBUTES:[{name:"a_positionCoef",size:1,type:K},{name:"a_normalCoef",size:1,type:K},{name:"a_sourceRadiusCoef",size:1,type:K},{name:"a_targetRadiusCoef",size:1,type:K}],CONSTANT_DATA:[[0,1,-1,0],[0,-1,1,0],[1,1,0,1],[1,1,0,1],[0,-1,1,0],[1,-1,0,-1]]}}processVisibleItem(n,i,o,a,s){const l=s.size||1,c=o.x,u=o.y,d=a.x,h=a.y,m=V(s.color),g=d-c,b=h-u,E=o.size||1,v=a.size||1;let T=g*g+b*b,_=0,f=0;T&&(T=1/Math.sqrt(T),_=-b*T*l,f=g*T*l);const p=this.array;p[i++]=c,p[i++]=u,p[i++]=d,p[i++]=h,p[i++]=_,p[i++]=f,p[i++]=m,p[i++]=n,p[i++]=E,p[i++]=v}setUniforms(n,{gl:i,uniformLocations:o}){const{u_matrix:a,u_zoomRatio:s,u_feather:l,u_pixelRatio:c,u_correctionRatio:u,u_sizeRatio:d,u_minEdgeThickness:h,u_lengthToThicknessRatio:m}=o;i.uniformMatrix3fv(a,!1,n.matrix),i.uniform1f(s,n.zoomRatio),i.uniform1f(d,n.sizeRatio),i.uniform1f(u,n.correctionRatio),i.uniform1f(c,n.pixelRatio),i.uniform1f(l,n.antiAliasingFeather),i.uniform1f(h,n.minEdgeThickness),i.uniform1f(m,e.lengthToThicknessRatio)}}}const Ua=rr();function jn(r){return Zt([tr(r),xe(r)])}const Vn=jn();function Wn(r){return Zt([rr(r),xe(r),xe({...r,extremity:"source"})])}const Ba=Wn(),Ha=`
precision mediump float;

varying vec4 v_color;

void main(void) {
  gl_FragColor = v_color;
}
`,$a=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_position;

uniform mat3 u_matrix;

varying vec4 v_color;

const float bias = 255.0 / 254.0;

void main() {
  // Scale from [[-1 1] [-1 1]] to the container:
  gl_Position = vec4(
    (u_matrix * vec3(a_position, 1)).xy,
    0,
    1
  );

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,{UNSIGNED_BYTE:Yn,FLOAT:ja}=WebGLRenderingContext,Va=["u_matrix"];class Wa extends se{getDefinition(){return{VERTICES:2,VERTEX_SHADER_SOURCE:$a,FRAGMENT_SHADER_SOURCE:Ha,METHOD:WebGLRenderingContext.LINES,UNIFORMS:Va,ATTRIBUTES:[{name:"a_position",size:2,type:ja},{name:"a_color",size:4,type:Yn,normalized:!0},{name:"a_id",size:4,type:Yn,normalized:!0}]}}processVisibleItem(e,t,n,i,o){const a=this.array,s=n.x,l=n.y,c=i.x,u=i.y,d=V(o.color);a[t++]=s,a[t++]=l,a[t++]=d,a[t++]=e,a[t++]=c,a[t++]=u,a[t++]=d,a[t++]=e}setUniforms(e,{gl:t,uniformLocations:n}){const{u_matrix:i}=n;t.uniformMatrix3fv(i,!1,e.matrix)}}const Ya=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_zoomRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // We require edges to be at least "minThickness" pixels thick *on screen*
  // (so we need to compensate the size ratio):
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);

  // Then, we need to retrieve the normalized thickness of the edge in the WebGL
  // referential (in a ([0, 1], [0, 1]) space), using our "magic" correction
  // ratio:
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness, 1)).xy, 0, 1);

  // For the fragment shader though, we need a thickness that takes the "magic"
  // correction ratio into account (as in webGLThickness), but so that the
  // antialiasing effect does not depend on the zoom level. So here's yet
  // another thickness version:
  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,{UNSIGNED_BYTE:Xn,FLOAT:Le}=WebGLRenderingContext,Xa=["u_matrix","u_zoomRatio","u_sizeRatio","u_correctionRatio","u_pixelRatio","u_feather","u_minEdgeThickness"];class qn extends se{getDefinition(){return{VERTICES:6,VERTEX_SHADER_SOURCE:Ya,FRAGMENT_SHADER_SOURCE:er,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Xa,ATTRIBUTES:[{name:"a_positionStart",size:2,type:Le},{name:"a_positionEnd",size:2,type:Le},{name:"a_normal",size:2,type:Le},{name:"a_color",size:4,type:Xn,normalized:!0},{name:"a_id",size:4,type:Xn,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_positionCoef",size:1,type:Le},{name:"a_normalCoef",size:1,type:Le}],CONSTANT_DATA:[[0,1],[0,-1],[1,1],[1,1],[0,-1],[1,-1]]}}processVisibleItem(e,t,n,i,o){const a=o.size||1,s=n.x,l=n.y,c=i.x,u=i.y,d=V(o.color),h=c-s,m=u-l;let g=h*h+m*m,b=0,E=0;g&&(g=1/Math.sqrt(g),b=-m*g*a,E=h*g*a);const v=this.array;v[t++]=s,v[t++]=l,v[t++]=c,v[t++]=u,v[t++]=b,v[t++]=E,v[t++]=d,v[t++]=e}setUniforms(e,{gl:t,uniformLocations:n}){const{u_matrix:i,u_zoomRatio:o,u_feather:a,u_pixelRatio:s,u_correctionRatio:l,u_sizeRatio:c,u_minEdgeThickness:u}=n;t.uniformMatrix3fv(i,!1,e.matrix),t.uniform1f(o,e.zoomRatio),t.uniform1f(c,e.sizeRatio),t.uniform1f(l,e.correctionRatio),t.uniform1f(s,e.pixelRatio),t.uniform1f(a,e.antiAliasingFeather),t.uniform1f(u,e.minEdgeThickness)}}const qa=`
precision mediump float;

varying vec4 v_color;

void main(void) {
  gl_FragColor = v_color;
}
`,Ka=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec4 v_color;

const float minThickness = 1.7;
const float bias = 255.0 / 254.0;

void main() {
  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  // The only different here with edge.vert.glsl is that we need to handle null
  // input normal vector. Apart from that, you can read edge.vert.glsl more info
  // on how it works:
  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;
  if (normalLength <= 0.0) unitNormal = normal;
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness, 1)).xy, 0, 1);

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,{UNSIGNED_BYTE:Kn,FLOAT:Fe}=WebGLRenderingContext,Za=["u_matrix","u_sizeRatio","u_correctionRatio","u_minEdgeThickness"];class Qa extends se{getDefinition(){return{VERTICES:3,VERTEX_SHADER_SOURCE:Ka,FRAGMENT_SHADER_SOURCE:qa,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Za,ATTRIBUTES:[{name:"a_positionStart",size:2,type:Fe},{name:"a_positionEnd",size:2,type:Fe},{name:"a_normal",size:2,type:Fe},{name:"a_color",size:4,type:Kn,normalized:!0},{name:"a_id",size:4,type:Kn,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_positionCoef",size:1,type:Fe},{name:"a_normalCoef",size:1,type:Fe}],CONSTANT_DATA:[[0,1],[0,-1],[1,0]]}}processVisibleItem(e,t,n,i,o){const a=o.size||1,s=n.x,l=n.y,c=i.x,u=i.y,d=V(o.color),h=c-s,m=u-l;let g=h*h+m*m,b=0,E=0;g&&(g=1/Math.sqrt(g),b=-m*g*a,E=h*g*a);const v=this.array;v[t++]=s,v[t++]=l,v[t++]=c,v[t++]=u,v[t++]=b,v[t++]=E,v[t++]=d,v[t++]=e}setUniforms(e,{gl:t,uniformLocations:n}){const{u_matrix:i,u_sizeRatio:o,u_correctionRatio:a,u_minEdgeThickness:s}=n;t.uniformMatrix3fv(i,!1,e.matrix),t.uniform1f(o,e.sizeRatio),t.uniform1f(a,e.correctionRatio),t.uniform1f(s,e.minEdgeThickness)}}const Ja=Object.freeze(Object.defineProperty({__proto__:null,AbstractEdgeProgram:Ra,AbstractNodeProgram:Ea,AbstractProgram:Xt,DEFAULT_EDGE_ARROW_HEAD_PROGRAM_OPTIONS:Qe,DEFAULT_EDGE_CLAMPED_PROGRAM_OPTIONS:Bn,DEFAULT_EDGE_DOUBLE_CLAMPED_PROGRAM_OPTIONS:$n,EdgeArrowHeadProgram:Oa,EdgeArrowProgram:Vn,EdgeClampedProgram:za,EdgeDoubleArrowProgram:Ba,EdgeDoubleClampedProgram:Ua,EdgeLineProgram:Wa,EdgeProgram:se,EdgeRectangleProgram:qn,EdgeTriangleProgram:Qa,NodeCircleProgram:Ke,NodePointProgram:Fa,NodeProgram:Kt,Program:qt,createEdgeArrowHeadProgram:xe,createEdgeArrowProgram:jn,createEdgeClampedProgram:tr,createEdgeCompoundProgram:Zt,createEdgeDoubleArrowProgram:Wn,createEdgeDoubleClampedProgram:rr,createNodeCompoundProgram:Ta,drawDiscNodeHover:kn,drawDiscNodeLabel:Qt,drawStraightEdgeLabel:On,getAttributeItemsCount:xn,getAttributesItemsCount:qe,killProgram:Yt,loadFragmentShader:Nn,loadProgram:Pn,loadVertexShader:Fn,numberToGLSLFloat:ba},Symbol.toStringTag,{value:"Module"}));class nr extends Wr.EventEmitter{constructor(){super(),this.rawEmitter=this}}const Je=1.5;class be extends nr{constructor(){super(),this.x=.5,this.y=.5,this.angle=0,this.ratio=1,this.minRatio=null,this.maxRatio=null,this.enabledZooming=!0,this.enabledPanning=!0,this.enabledRotation=!0,this.clean=null,this.nextFrame=null,this.previousState=null,this.enabled=!0,this.previousState=this.getState()}static from(e){return new be().setState(e)}enable(){return this.enabled=!0,this}disable(){return this.enabled=!1,this}getState(){return{x:this.x,y:this.y,angle:this.angle,ratio:this.ratio}}hasState(e){return this.x===e.x&&this.y===e.y&&this.ratio===e.ratio&&this.angle===e.angle}getPreviousState(){const e=this.previousState;return e?{x:e.x,y:e.y,angle:e.angle,ratio:e.ratio}:null}getBoundedRatio(e){let t=e;return typeof this.minRatio=="number"&&(t=Math.max(t,this.minRatio)),typeof this.maxRatio=="number"&&(t=Math.min(t,this.maxRatio)),t}validateState(e){const t={};return this.enabledPanning&&typeof e.x=="number"&&(t.x=e.x),this.enabledPanning&&typeof e.y=="number"&&(t.y=e.y),this.enabledZooming&&typeof e.ratio=="number"&&(t.ratio=this.getBoundedRatio(e.ratio)),this.enabledRotation&&typeof e.angle=="number"&&(t.angle=e.angle),this.clean?this.clean({...this.getState(),...t}):t}isAnimated(){return!!this.nextFrame}setState(e){if(!this.enabled)return this;this.previousState=this.getState();const t=this.validateState(e);return typeof t.x=="number"&&(this.x=t.x),typeof t.y=="number"&&(this.y=t.y),typeof t.ratio=="number"&&(this.ratio=t.ratio),typeof t.angle=="number"&&(this.angle=t.angle),this.hasState(this.previousState)||this.emit("updated",this.getState()),this}updateState(e){return this.setState(e(this.getState())),this}animate(e,t={},n){if(!n)return new Promise(u=>this.animate(e,t,u));if(!this.enabled)return;const i={...kt,...t},o=this.validateState(e),a=typeof i.easing=="function"?i.easing:Ot[i.easing],s=Date.now(),l=this.getState(),c=()=>{const u=(Date.now()-s)/i.duration;if(u>=1){this.nextFrame=null,this.setState(o),this.animationCallback&&(this.animationCallback.call(null),this.animationCallback=void 0);return}const d=a(u),h={};typeof o.x=="number"&&(h.x=l.x+(o.x-l.x)*d),typeof o.y=="number"&&(h.y=l.y+(o.y-l.y)*d),this.enabledRotation&&typeof o.angle=="number"&&(h.angle=l.angle+(o.angle-l.angle)*d),typeof o.ratio=="number"&&(h.ratio=l.ratio+(o.ratio-l.ratio)*d),this.setState(h),this.nextFrame=requestAnimationFrame(c)};this.nextFrame?(cancelAnimationFrame(this.nextFrame),this.animationCallback&&this.animationCallback.call(null),this.nextFrame=requestAnimationFrame(c)):c(),this.animationCallback=n}animatedZoom(e){return e?typeof e=="number"?this.animate({ratio:this.ratio/e}):this.animate({ratio:this.ratio/(e.factor||Je)},e):this.animate({ratio:this.ratio/Je})}animatedUnzoom(e){return e?typeof e=="number"?this.animate({ratio:this.ratio*e}):this.animate({ratio:this.ratio*(e.factor||Je)},e):this.animate({ratio:this.ratio*Je})}animatedReset(e){return this.animate({x:.5,y:.5,ratio:1,angle:0},e)}copy(){return be.from(this.getState())}}const ir={hideEdgesOnMove:!1,hideLabelsOnMove:!1,renderLabels:!0,renderEdgeLabels:!1,enableEdgeEvents:!1,defaultNodeColor:"#999",defaultNodeType:"circle",defaultEdgeColor:"#ccc",defaultEdgeType:"line",labelFont:"Arial",labelSize:14,labelWeight:"normal",labelColor:{color:"#000"},edgeLabelFont:"Arial",edgeLabelSize:14,edgeLabelWeight:"normal",edgeLabelColor:{attribute:"color"},stagePadding:30,defaultDrawEdgeLabel:On,defaultDrawNodeLabel:Qt,defaultDrawNodeHover:kn,minEdgeThickness:1.7,antiAliasingFeather:1,dragTimeout:100,draggedEventsTolerance:3,inertiaDuration:200,inertiaRatio:3,zoomDuration:250,zoomingRatio:1.7,doubleClickTimeout:300,doubleClickZoomingRatio:2.2,doubleClickZoomingDuration:200,tapMoveTolerance:10,zoomToSizeRatioFunction:Math.sqrt,itemSizesReference:"screen",autoRescale:!0,autoCenter:!0,labelDensity:1,labelGridCellSize:100,labelRenderedSizeThreshold:6,nodeReducer:null,edgeReducer:null,zIndex:!1,minCameraRatio:null,maxCameraRatio:null,enableCameraZooming:!0,enableCameraPanning:!0,enableCameraRotation:!0,cameraPanBoundaries:null,allowInvalidContainer:!1,nodeProgramClasses:{},nodeHoverProgramClasses:{},edgeProgramClasses:{}},es={circle:Ke},ts={arrow:Vn,line:qn};function or(r){if(typeof r.labelDensity!="number"||r.labelDensity<0)throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");const{minCameraRatio:e,maxCameraRatio:t}=r;if(typeof e=="number"&&typeof t=="number"&&t<e)throw new Error("Settings: invalid camera ratio boundaries. Expecting `maxCameraRatio` to be greater than `minCameraRatio`.")}function rs(r){const e=Xe({},ir,r);return e.nodeProgramClasses=Xe({},es,e.nodeProgramClasses),e.edgeProgramClasses=Xe({},ts,e.edgeProgramClasses),e}function W(r,e){const t=e.getBoundingClientRect();return{x:r.clientX-t.left,y:r.clientY-t.top}}function Z(r,e){const t={...W(r,e),sigmaDefaultPrevented:!1,preventSigmaDefault(){t.sigmaDefaultPrevented=!0},original:r};return t}function Ne(r){const e="x"in r?r:{...r.touches[0]||r.previousTouches[0],original:r.original,sigmaDefaultPrevented:r.sigmaDefaultPrevented,preventSigmaDefault:()=>{r.sigmaDefaultPrevented=!0,e.sigmaDefaultPrevented=!0}};return e}function ns(r,e){return{...Z(r,e),delta:Zn(r)}}const is=2;function et(r){const e=[];for(let t=0,n=Math.min(r.length,is);t<n;t++)e.push(r[t]);return e}function Pe(r,e,t){const n={touches:et(r.touches).map(i=>W(i,t)),previousTouches:e.map(i=>W(i,t)),sigmaDefaultPrevented:!1,preventSigmaDefault(){n.sigmaDefaultPrevented=!0},original:r};return n}function Zn(r){if(typeof r.deltaY<"u")return r.deltaY*-3/360;if(typeof r.detail<"u")return r.detail/-9;throw new Error("Captor: could not extract delta from event.")}class Qn extends nr{constructor(e,t){super(),this.container=e,this.renderer=t}}const os=["doubleClickTimeout","doubleClickZoomingDuration","doubleClickZoomingRatio","dragTimeout","draggedEventsTolerance","inertiaDuration","inertiaRatio","zoomDuration","zoomingRatio"].reduce((r,e)=>({...r,[e]:ir[e]}),{});class Jn extends Qn{constructor(e,t){super(e,t),this.enabled=!0,this.draggedEvents=0,this.downStartTime=null,this.lastMouseX=null,this.lastMouseY=null,this.isMouseDown=!1,this.isMoving=!1,this.movingTimeout=null,this.startCameraState=null,this.clicks=0,this.doubleClickTimeout=null,this.currentWheelDirection=0,this.settings=os,this.handleClick=this.handleClick.bind(this),this.handleRightClick=this.handleRightClick.bind(this),this.handleDown=this.handleDown.bind(this),this.handleUp=this.handleUp.bind(this),this.handleMove=this.handleMove.bind(this),this.handleWheel=this.handleWheel.bind(this),this.handleLeave=this.handleLeave.bind(this),this.handleEnter=this.handleEnter.bind(this),e.addEventListener("click",this.handleClick,{capture:!1}),e.addEventListener("contextmenu",this.handleRightClick,{capture:!1}),e.addEventListener("mousedown",this.handleDown,{capture:!1}),e.addEventListener("wheel",this.handleWheel,{capture:!1}),e.addEventListener("mouseleave",this.handleLeave,{capture:!1}),e.addEventListener("mouseenter",this.handleEnter,{capture:!1}),document.addEventListener("mousemove",this.handleMove,{capture:!1}),document.addEventListener("mouseup",this.handleUp,{capture:!1})}kill(){const e=this.container;e.removeEventListener("click",this.handleClick),e.removeEventListener("contextmenu",this.handleRightClick),e.removeEventListener("mousedown",this.handleDown),e.removeEventListener("wheel",this.handleWheel),e.removeEventListener("mouseleave",this.handleLeave),e.removeEventListener("mouseenter",this.handleEnter),document.removeEventListener("mousemove",this.handleMove),document.removeEventListener("mouseup",this.handleUp)}handleClick(e){if(this.enabled){if(this.clicks++,this.clicks===2)return this.clicks=0,typeof this.doubleClickTimeout=="number"&&(clearTimeout(this.doubleClickTimeout),this.doubleClickTimeout=null),this.handleDoubleClick(e);setTimeout(()=>{this.clicks=0,this.doubleClickTimeout=null},this.settings.doubleClickTimeout),this.draggedEvents<this.settings.draggedEventsTolerance&&this.emit("click",Z(e,this.container))}}handleRightClick(e){this.enabled&&this.emit("rightClick",Z(e,this.container))}handleDoubleClick(e){if(!this.enabled)return;e.preventDefault(),e.stopPropagation();const t=Z(e,this.container);if(this.emit("doubleClick",t),t.sigmaDefaultPrevented)return;const n=this.renderer.getCamera(),i=n.getBoundedRatio(n.getState().ratio/this.settings.doubleClickZoomingRatio);n.animate(this.renderer.getViewportZoomedState(W(e,this.container),i),{easing:"quadraticInOut",duration:this.settings.doubleClickZoomingDuration})}handleDown(e){if(this.enabled){if(e.button===0){this.startCameraState=this.renderer.getCamera().getState();const{x:t,y:n}=W(e,this.container);this.lastMouseX=t,this.lastMouseY=n,this.draggedEvents=0,this.downStartTime=Date.now(),this.isMouseDown=!0}this.emit("mousedown",Z(e,this.container))}}handleUp(e){if(!this.enabled||!this.isMouseDown)return;const t=this.renderer.getCamera();this.isMouseDown=!1,typeof this.movingTimeout=="number"&&(clearTimeout(this.movingTimeout),this.movingTimeout=null);const{x:n,y:i}=W(e,this.container),o=t.getState(),a=t.getPreviousState()||{x:0,y:0};this.isMoving?t.animate({x:o.x+this.settings.inertiaRatio*(o.x-a.x),y:o.y+this.settings.inertiaRatio*(o.y-a.y)},{duration:this.settings.inertiaDuration,easing:"quadraticOut"}):(this.lastMouseX!==n||this.lastMouseY!==i)&&t.setState({x:o.x,y:o.y}),this.isMoving=!1,setTimeout(()=>{const s=this.draggedEvents>0;this.draggedEvents=0,s&&this.renderer.getSetting("hideEdgesOnMove")&&this.renderer.refresh()},0),this.emit("mouseup",Z(e,this.container))}handleMove(e){if(!this.enabled)return;const t=Z(e,this.container);if(this.emit("mousemovebody",t),(e.target===this.container||e.composedPath()[0]===this.container)&&this.emit("mousemove",t),!t.sigmaDefaultPrevented&&this.isMouseDown){this.isMoving=!0,this.draggedEvents++,typeof this.movingTimeout=="number"&&clearTimeout(this.movingTimeout),this.movingTimeout=window.setTimeout(()=>{this.movingTimeout=null,this.isMoving=!1},this.settings.dragTimeout);const n=this.renderer.getCamera(),{x:i,y:o}=W(e,this.container),a=this.renderer.viewportToFramedGraph({x:this.lastMouseX,y:this.lastMouseY}),s=this.renderer.viewportToFramedGraph({x:i,y:o}),l=a.x-s.x,c=a.y-s.y,u=n.getState(),d=u.x+l,h=u.y+c;n.setState({x:d,y:h}),this.lastMouseX=i,this.lastMouseY=o,e.preventDefault(),e.stopPropagation()}}handleLeave(e){this.emit("mouseleave",Z(e,this.container))}handleEnter(e){this.emit("mouseenter",Z(e,this.container))}handleWheel(e){const t=this.renderer.getCamera();if(!this.enabled||!t.enabledZooming)return;const n=Zn(e);if(!n)return;const i=ns(e,this.container);if(this.emit("wheel",i),i.sigmaDefaultPrevented){e.preventDefault(),e.stopPropagation();return}const o=t.getState().ratio,a=n>0?1/this.settings.zoomingRatio:this.settings.zoomingRatio,s=t.getBoundedRatio(o*a),l=n>0?1:-1,c=Date.now();o!==s&&(e.preventDefault(),e.stopPropagation(),!(this.currentWheelDirection===l&&this.lastWheelTriggerTime&&c-this.lastWheelTriggerTime<this.settings.zoomDuration/5)&&(t.animate(this.renderer.getViewportZoomedState(W(e,this.container),s),{easing:"quadraticOut",duration:this.settings.zoomDuration},()=>{this.currentWheelDirection=0}),this.currentWheelDirection=l,this.lastWheelTriggerTime=c))}setSettings(e){this.settings=e}}const as=["dragTimeout","inertiaDuration","inertiaRatio","doubleClickTimeout","doubleClickZoomingRatio","doubleClickZoomingDuration","tapMoveTolerance"].reduce((r,e)=>({...r,[e]:ir[e]}),{});class ss extends Qn{constructor(e,t){super(e,t),this.enabled=!0,this.isMoving=!1,this.hasMoved=!1,this.touchMode=0,this.startTouchesPositions=[],this.lastTouches=[],this.lastTap=null,this.settings=as,this.handleStart=this.handleStart.bind(this),this.handleLeave=this.handleLeave.bind(this),this.handleMove=this.handleMove.bind(this),e.addEventListener("touchstart",this.handleStart,{capture:!1}),e.addEventListener("touchcancel",this.handleLeave,{capture:!1}),document.addEventListener("touchend",this.handleLeave,{capture:!1,passive:!1}),document.addEventListener("touchmove",this.handleMove,{capture:!1,passive:!1})}kill(){const e=this.container;e.removeEventListener("touchstart",this.handleStart),e.removeEventListener("touchcancel",this.handleLeave),document.removeEventListener("touchend",this.handleLeave),document.removeEventListener("touchmove",this.handleMove)}getDimensions(){return{width:this.container.offsetWidth,height:this.container.offsetHeight}}handleStart(e){if(!this.enabled)return;e.preventDefault();const t=et(e.touches);if(this.touchMode=t.length,this.startCameraState=this.renderer.getCamera().getState(),this.startTouchesPositions=t.map(n=>W(n,this.container)),this.touchMode===2){const[{x:n,y:i},{x:o,y:a}]=this.startTouchesPositions;this.startTouchesAngle=Math.atan2(a-i,o-n),this.startTouchesDistance=Math.sqrt(Math.pow(o-n,2)+Math.pow(a-i,2))}this.emit("touchdown",Pe(e,this.lastTouches,this.container)),this.lastTouches=t,this.lastTouchesPositions=this.startTouchesPositions}handleLeave(e){if(!(!this.enabled||!this.startTouchesPositions.length)){switch(e.cancelable&&e.preventDefault(),this.movingTimeout&&(this.isMoving=!1,clearTimeout(this.movingTimeout)),this.touchMode){case 2:if(e.touches.length===1){this.handleStart(e),e.preventDefault();break}case 1:if(this.isMoving){const t=this.renderer.getCamera(),n=t.getState(),i=t.getPreviousState()||{x:0,y:0};t.animate({x:n.x+this.settings.inertiaRatio*(n.x-i.x),y:n.y+this.settings.inertiaRatio*(n.y-i.y)},{duration:this.settings.inertiaDuration,easing:"quadraticOut"})}this.hasMoved=!1,this.isMoving=!1,this.touchMode=0;break}if(this.emit("touchup",Pe(e,this.lastTouches,this.container)),!e.touches.length){const t=W(this.lastTouches[0],this.container),n=this.startTouchesPositions[0],i=(t.x-n.x)**2+(t.y-n.y)**2;if(!e.touches.length&&i<this.settings.tapMoveTolerance**2)if(this.lastTap&&Date.now()-this.lastTap.time<this.settings.doubleClickTimeout){const o=Pe(e,this.lastTouches,this.container);if(this.emit("doubletap",o),this.lastTap=null,!o.sigmaDefaultPrevented){const a=this.renderer.getCamera(),s=a.getBoundedRatio(a.getState().ratio/this.settings.doubleClickZoomingRatio);a.animate(this.renderer.getViewportZoomedState(t,s),{easing:"quadraticInOut",duration:this.settings.doubleClickZoomingDuration})}}else{const o=Pe(e,this.lastTouches,this.container);this.emit("tap",o),this.lastTap={time:Date.now(),position:o.touches[0]||o.previousTouches[0]}}}this.lastTouches=et(e.touches),this.startTouchesPositions=[]}}handleMove(e){if(!this.enabled||!this.startTouchesPositions.length)return;e.preventDefault();const t=et(e.touches),n=t.map(c=>W(c,this.container)),i=this.lastTouches;this.lastTouches=t,this.lastTouchesPositions=n;const o=Pe(e,i,this.container);if(this.emit("touchmove",o),o.sigmaDefaultPrevented||(this.hasMoved||(this.hasMoved=n.some((c,u)=>{const d=this.startTouchesPositions[u];return d&&(c.x!==d.x||c.y!==d.y)})),!this.hasMoved))return;this.isMoving=!0,this.movingTimeout&&clearTimeout(this.movingTimeout),this.movingTimeout=window.setTimeout(()=>{this.isMoving=!1},this.settings.dragTimeout);const a=this.renderer.getCamera(),s=this.startCameraState,l=this.renderer.getSetting("stagePadding");switch(this.touchMode){case 1:{const{x:c,y:u}=this.renderer.viewportToFramedGraph((this.startTouchesPositions||[])[0]),{x:d,y:h}=this.renderer.viewportToFramedGraph(n[0]);a.setState({x:s.x+c-d,y:s.y+u-h});break}case 2:{const c={x:.5,y:.5,angle:0,ratio:1},{x:u,y:d}=n[0],{x:h,y:m}=n[1],g=Math.atan2(m-d,h-u)-this.startTouchesAngle,b=Math.hypot(m-d,h-u)/this.startTouchesDistance,E=a.getBoundedRatio(s.ratio/b);c.ratio=E,c.angle=s.angle+g;const v=this.getDimensions(),T=this.renderer.viewportToFramedGraph((this.startTouchesPositions||[])[0],{cameraState:s}),_=Math.min(v.width,v.height)-2*l,f=_/v.width,p=_/v.height,y=E/_;let R=u-_/2/f,S=d-_/2/p;[R,S]=[R*Math.cos(-c.angle)-S*Math.sin(-c.angle),S*Math.cos(-c.angle)+R*Math.sin(-c.angle)],c.x=T.x-R*y,c.y=T.y+S*y,a.setState(c);break}}}setSettings(e){this.settings=e}}class ei{constructor(e,t){this.key=e,this.size=t}static compare(e,t){return e.size>t.size?-1:e.size<t.size||e.key>t.key?1:-1}}class ti{constructor(){this.width=0,this.height=0,this.cellSize=0,this.columns=0,this.rows=0,this.cells={}}resizeAndClear(e,t){this.width=e.width,this.height=e.height,this.cellSize=t,this.columns=Math.ceil(e.width/t),this.rows=Math.ceil(e.height/t),this.cells={}}getIndex(e){const t=Math.floor(e.x/this.cellSize);return Math.floor(e.y/this.cellSize)*this.columns+t}add(e,t,n){const i=new ei(e,t),o=this.getIndex(n);let a=this.cells[o];a||(a=[],this.cells[o]=a),a.push(i)}organize(){for(const e in this.cells)this.cells[e].sort(ei.compare)}getLabelsToDisplay(e,t){const n=this.cellSize*this.cellSize,o=n/e/e*t/n,a=Math.ceil(o),s=[];for(const l in this.cells){const c=this.cells[l];for(let u=0;u<Math.min(a,c.length);u++)s.push(c[u].key)}return s}}function cs(r){const{graph:e,hoveredNode:t,highlightedNodes:n,displayedNodeLabels:i}=r,o=[];return e.forEachEdge((a,s,l,c)=>{(l===t||c===t||n.has(l)||n.has(c)||i.has(l)&&i.has(c))&&o.push(a)}),o}const ls=150,us=50,Q=Object.prototype.hasOwnProperty;function hs(r,e,t){if(!Q.call(t,"x")||!Q.call(t,"y"))throw new Error(`Sigma: could not find a valid position (x, y) for node "${e}". All your nodes must have a number "x" and "y". Maybe your forgot to apply a layout or your "nodeReducer" is not returning the correct data?`);return t.color||(t.color=r.defaultNodeColor),!t.label&&t.label!==""&&(t.label=null),t.label!==void 0&&t.label!==null?t.label=""+t.label:t.label=null,t.size||(t.size=2),Q.call(t,"hidden")||(t.hidden=!1),Q.call(t,"highlighted")||(t.highlighted=!1),Q.call(t,"forceLabel")||(t.forceLabel=!1),(!t.type||t.type==="")&&(t.type=r.defaultNodeType),t.zIndex||(t.zIndex=0),t}function ds(r,e,t){return t.color||(t.color=r.defaultEdgeColor),t.label||(t.label=""),t.size||(t.size=.5),Q.call(t,"hidden")||(t.hidden=!1),Q.call(t,"forceLabel")||(t.forceLabel=!1),(!t.type||t.type==="")&&(t.type=r.defaultEdgeType),t.zIndex||(t.zIndex=0),t}let ri=class extends nr{constructor(e,t,n={}){if(super(),this.elements={},this.canvasContexts={},this.webGLContexts={},this.pickingLayers=new Set,this.textures={},this.frameBuffers={},this.activeListeners={},this.labelGrid=new ti,this.nodeDataCache={},this.edgeDataCache={},this.nodeProgramIndex={},this.edgeProgramIndex={},this.nodesWithForcedLabels=new Set,this.edgesWithForcedLabels=new Set,this.nodeExtent={x:[0,1],y:[0,1]},this.nodeZExtent=[1/0,-1/0],this.edgeZExtent=[1/0,-1/0],this.matrix=j(),this.invMatrix=j(),this.correctionRatio=1,this.customBBox=null,this.normalizationFunction=Wt({x:[0,1],y:[0,1]}),this.graphToViewportRatio=1,this.itemIDsIndex={},this.nodeIndices={},this.edgeIndices={},this.width=0,this.height=0,this.pixelRatio=jt(),this.pickingDownSizingRatio=2*this.pixelRatio,this.displayedNodeLabels=new Set,this.displayedEdgeLabels=new Set,this.highlightedNodes=new Set,this.hoveredNode=null,this.hoveredEdge=null,this.renderFrame=null,this.renderHighlightedNodesFrame=null,this.needToProcess=!1,this.checkEdgesEventsFrame=null,this.nodePrograms={},this.nodeHoverPrograms={},this.edgePrograms={},this.settings=rs(n),or(this.settings),An(e),!(t instanceof HTMLElement))throw new Error("Sigma: container should be an html element.");this.graph=e,this.container=t,this.createWebGLContext("edges",{picking:n.enableEdgeEvents}),this.createCanvasContext("edgeLabels"),this.createWebGLContext("nodes",{picking:!0}),this.createCanvasContext("labels"),this.createCanvasContext("hovers"),this.createWebGLContext("hoverNodes"),this.createCanvasContext("mouse",{style:{touchAction:"none",userSelect:"none"}}),this.resize();for(const i in this.settings.nodeProgramClasses)this.registerNodeProgram(i,this.settings.nodeProgramClasses[i],this.settings.nodeHoverProgramClasses[i]);for(const i in this.settings.edgeProgramClasses)this.registerEdgeProgram(i,this.settings.edgeProgramClasses[i]);this.camera=new be,this.bindCameraHandlers(),this.mouseCaptor=new Jn(this.elements.mouse,this),this.mouseCaptor.setSettings(this.settings),this.touchCaptor=new ss(this.elements.mouse,this),this.touchCaptor.setSettings(this.settings),this.bindEventHandlers(),this.bindGraphHandlers(),this.handleSettingsUpdate(),this.refresh()}registerNodeProgram(e,t,n){return this.nodePrograms[e]&&this.nodePrograms[e].kill(),this.nodeHoverPrograms[e]&&this.nodeHoverPrograms[e].kill(),this.nodePrograms[e]=new t(this.webGLContexts.nodes,this.frameBuffers.nodes,this),this.nodeHoverPrograms[e]=new(n||t)(this.webGLContexts.hoverNodes,null,this),this}registerEdgeProgram(e,t){return this.edgePrograms[e]&&this.edgePrograms[e].kill(),this.edgePrograms[e]=new t(this.webGLContexts.edges,this.frameBuffers.edges,this),this}unregisterNodeProgram(e){if(this.nodePrograms[e]){const{[e]:t,...n}=this.nodePrograms;t.kill(),this.nodePrograms=n}if(this.nodeHoverPrograms[e]){const{[e]:t,...n}=this.nodeHoverPrograms;t.kill(),this.nodePrograms=n}return this}unregisterEdgeProgram(e){if(this.edgePrograms[e]){const{[e]:t,...n}=this.edgePrograms;t.kill(),this.edgePrograms=n}return this}resetWebGLTexture(e){const t=this.webGLContexts[e],n=this.frameBuffers[e],i=this.textures[e];i&&t.deleteTexture(i);const o=t.createTexture();return t.bindFramebuffer(t.FRAMEBUFFER,n),t.bindTexture(t.TEXTURE_2D,o),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this.width,this.height,0,t.RGBA,t.UNSIGNED_BYTE,null),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0),this.textures[e]=o,this}bindCameraHandlers(){return this.activeListeners.camera=()=>{this.scheduleRender()},this.camera.on("updated",this.activeListeners.camera),this}unbindCameraHandlers(){return this.camera.removeListener("updated",this.activeListeners.camera),this}getNodeAtPosition(e){const{x:t,y:n}=e,i=Ut(this.webGLContexts.nodes,this.frameBuffers.nodes,t,n,this.pixelRatio,this.pickingDownSizingRatio),o=Mt(...i),a=this.itemIDsIndex[o];return a&&a.type==="node"?a.id:null}bindEventHandlers(){this.activeListeners.handleResize=()=>{this.scheduleRefresh()},window.addEventListener("resize",this.activeListeners.handleResize),this.activeListeners.handleMove=t=>{const n=Ne(t),i={event:n,preventSigmaDefault(){n.preventSigmaDefault()}},o=this.getNodeAtPosition(n);if(o&&this.hoveredNode!==o&&!this.nodeDataCache[o].hidden){this.hoveredNode&&this.emit("leaveNode",{...i,node:this.hoveredNode}),this.hoveredNode=o,this.emit("enterNode",{...i,node:o}),this.scheduleHighlightedNodesRender();return}if(this.hoveredNode&&this.getNodeAtPosition(n)!==this.hoveredNode){const a=this.hoveredNode;this.hoveredNode=null,this.emit("leaveNode",{...i,node:a}),this.scheduleHighlightedNodesRender();return}if(this.settings.enableEdgeEvents){const a=this.hoveredNode?null:this.getEdgeAtPoint(i.event.x,i.event.y);a!==this.hoveredEdge&&(this.hoveredEdge&&this.emit("leaveEdge",{...i,edge:this.hoveredEdge}),a&&this.emit("enterEdge",{...i,edge:a}),this.hoveredEdge=a)}},this.activeListeners.handleMoveBody=t=>{const n=Ne(t);this.emit("moveBody",{event:n,preventSigmaDefault(){n.preventSigmaDefault()}})},this.activeListeners.handleLeave=t=>{const n=Ne(t),i={event:n,preventSigmaDefault(){n.preventSigmaDefault()}};this.hoveredNode&&(this.emit("leaveNode",{...i,node:this.hoveredNode}),this.scheduleHighlightedNodesRender()),this.settings.enableEdgeEvents&&this.hoveredEdge&&(this.emit("leaveEdge",{...i,edge:this.hoveredEdge}),this.scheduleHighlightedNodesRender()),this.emit("leaveStage",{...i})},this.activeListeners.handleEnter=t=>{const n=Ne(t),i={event:n,preventSigmaDefault(){n.preventSigmaDefault()}};this.emit("enterStage",{...i})};const e=t=>n=>{const i=Ne(n),o={event:i,preventSigmaDefault:()=>{i.preventSigmaDefault()}},a=this.getNodeAtPosition(i);if(a)return this.emit(`${t}Node`,{...o,node:a});if(this.settings.enableEdgeEvents){const s=this.getEdgeAtPoint(i.x,i.y);if(s)return this.emit(`${t}Edge`,{...o,edge:s})}return this.emit(`${t}Stage`,o)};return this.activeListeners.handleClick=e("click"),this.activeListeners.handleRightClick=e("rightClick"),this.activeListeners.handleDoubleClick=e("doubleClick"),this.activeListeners.handleWheel=e("wheel"),this.activeListeners.handleDown=e("down"),this.activeListeners.handleUp=e("up"),this.mouseCaptor.on("mousemove",this.activeListeners.handleMove),this.mouseCaptor.on("mousemovebody",this.activeListeners.handleMoveBody),this.mouseCaptor.on("click",this.activeListeners.handleClick),this.mouseCaptor.on("rightClick",this.activeListeners.handleRightClick),this.mouseCaptor.on("doubleClick",this.activeListeners.handleDoubleClick),this.mouseCaptor.on("wheel",this.activeListeners.handleWheel),this.mouseCaptor.on("mousedown",this.activeListeners.handleDown),this.mouseCaptor.on("mouseup",this.activeListeners.handleUp),this.mouseCaptor.on("mouseleave",this.activeListeners.handleLeave),this.mouseCaptor.on("mouseenter",this.activeListeners.handleEnter),this.touchCaptor.on("touchdown",this.activeListeners.handleDown),this.touchCaptor.on("touchdown",this.activeListeners.handleMove),this.touchCaptor.on("touchup",this.activeListeners.handleUp),this.touchCaptor.on("touchmove",this.activeListeners.handleMove),this.touchCaptor.on("tap",this.activeListeners.handleClick),this.touchCaptor.on("doubletap",this.activeListeners.handleDoubleClick),this.touchCaptor.on("touchmove",this.activeListeners.handleMoveBody),this}bindGraphHandlers(){const e=this.graph,t=new Set(["x","y","zIndex","type"]);return this.activeListeners.eachNodeAttributesUpdatedGraphUpdate=n=>{var a;const i=(a=n.hints)==null?void 0:a.attributes;this.graph.forEachNode(s=>this.updateNode(s));const o=!i||i.some(s=>t.has(s));this.refresh({partialGraph:{nodes:e.nodes()},skipIndexation:!o,schedule:!0})},this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate=n=>{var a;const i=(a=n.hints)==null?void 0:a.attributes;this.graph.forEachEdge(s=>this.updateEdge(s));const o=i&&["zIndex","type"].some(s=>i==null?void 0:i.includes(s));this.refresh({partialGraph:{edges:e.edges()},skipIndexation:!o,schedule:!0})},this.activeListeners.addNodeGraphUpdate=n=>{const i=n.key;this.addNode(i),this.refresh({partialGraph:{nodes:[i]},skipIndexation:!1,schedule:!0})},this.activeListeners.updateNodeGraphUpdate=n=>{const i=n.key;this.refresh({partialGraph:{nodes:[i]},skipIndexation:!1,schedule:!0})},this.activeListeners.dropNodeGraphUpdate=n=>{const i=n.key;this.removeNode(i),this.refresh({schedule:!0})},this.activeListeners.addEdgeGraphUpdate=n=>{const i=n.key;this.addEdge(i),this.refresh({partialGraph:{edges:[i]},schedule:!0})},this.activeListeners.updateEdgeGraphUpdate=n=>{const i=n.key;this.refresh({partialGraph:{edges:[i]},skipIndexation:!1,schedule:!0})},this.activeListeners.dropEdgeGraphUpdate=n=>{const i=n.key;this.removeEdge(i),this.refresh({schedule:!0})},this.activeListeners.clearEdgesGraphUpdate=()=>{this.clearEdgeState(),this.clearEdgeIndices(),this.refresh({schedule:!0})},this.activeListeners.clearGraphUpdate=()=>{this.clearEdgeState(),this.clearNodeState(),this.clearEdgeIndices(),this.clearNodeIndices(),this.refresh({schedule:!0})},e.on("nodeAdded",this.activeListeners.addNodeGraphUpdate),e.on("nodeDropped",this.activeListeners.dropNodeGraphUpdate),e.on("nodeAttributesUpdated",this.activeListeners.updateNodeGraphUpdate),e.on("eachNodeAttributesUpdated",this.activeListeners.eachNodeAttributesUpdatedGraphUpdate),e.on("edgeAdded",this.activeListeners.addEdgeGraphUpdate),e.on("edgeDropped",this.activeListeners.dropEdgeGraphUpdate),e.on("edgeAttributesUpdated",this.activeListeners.updateEdgeGraphUpdate),e.on("eachEdgeAttributesUpdated",this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate),e.on("edgesCleared",this.activeListeners.clearEdgesGraphUpdate),e.on("cleared",this.activeListeners.clearGraphUpdate),this}unbindGraphHandlers(){const e=this.graph;e.removeListener("nodeAdded",this.activeListeners.addNodeGraphUpdate),e.removeListener("nodeDropped",this.activeListeners.dropNodeGraphUpdate),e.removeListener("nodeAttributesUpdated",this.activeListeners.updateNodeGraphUpdate),e.removeListener("eachNodeAttributesUpdated",this.activeListeners.eachNodeAttributesUpdatedGraphUpdate),e.removeListener("edgeAdded",this.activeListeners.addEdgeGraphUpdate),e.removeListener("edgeDropped",this.activeListeners.dropEdgeGraphUpdate),e.removeListener("edgeAttributesUpdated",this.activeListeners.updateEdgeGraphUpdate),e.removeListener("eachEdgeAttributesUpdated",this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate),e.removeListener("edgesCleared",this.activeListeners.clearEdgesGraphUpdate),e.removeListener("cleared",this.activeListeners.clearGraphUpdate)}getEdgeAtPoint(e,t){const n=Ut(this.webGLContexts.edges,this.frameBuffers.edges,e,t,this.pixelRatio,this.pickingDownSizingRatio),i=Mt(...n),o=this.itemIDsIndex[i];return o&&o.type==="edge"?o.id:null}process(){this.emit("beforeProcess");const e=this.graph,t=this.settings,n=this.getDimensions();if(this.nodeExtent=wn(this.graph),!this.settings.autoRescale){const{width:g,height:b}=n,{x:E,y:v}=this.nodeExtent;this.nodeExtent={x:[(E[0]+E[1])/2-g/2,(E[0]+E[1])/2+g/2],y:[(v[0]+v[1])/2-b/2,(v[0]+v[1])/2+b/2]}}this.normalizationFunction=Wt(this.customBBox||this.nodeExtent);const i=new be,o=_e(i.getState(),n,this.getGraphDimensions(),this.getStagePadding());this.labelGrid.resizeAndClear(n,t.labelGridCellSize);const a={},s={},l={},c={};let u=1,d=e.nodes();for(let g=0,b=d.length;g<b;g++){const E=d[g],v=this.nodeDataCache[E],T=e.getNodeAttributes(E);v.x=T.x,v.y=T.y,this.normalizationFunction.applyTo(v),typeof v.label=="string"&&!v.hidden&&this.labelGrid.add(E,v.size,this.framedGraphToViewport(v,{matrix:o})),a[v.type]=(a[v.type]||0)+1}this.labelGrid.organize();for(const g in this.nodePrograms){if(!Q.call(this.nodePrograms,g))throw new Error(`Sigma: could not find a suitable program for node type "${g}"!`);this.nodePrograms[g].reallocate(a[g]||0),a[g]=0}this.settings.zIndex&&this.nodeZExtent[0]!==this.nodeZExtent[1]&&(d=Vt(this.nodeZExtent,g=>this.nodeDataCache[g].zIndex,d));for(let g=0,b=d.length;g<b;g++){const E=d[g];s[E]=u,c[s[E]]={type:"node",id:E},u++;const v=this.nodeDataCache[E];this.addNodeToProgram(E,s[E],a[v.type]++)}const h={};let m=e.edges();for(let g=0,b=m.length;g<b;g++){const E=m[g],v=this.edgeDataCache[E];h[v.type]=(h[v.type]||0)+1}this.settings.zIndex&&this.edgeZExtent[0]!==this.edgeZExtent[1]&&(m=Vt(this.edgeZExtent,g=>this.edgeDataCache[g].zIndex,m));for(const g in this.edgePrograms){if(!Q.call(this.edgePrograms,g))throw new Error(`Sigma: could not find a suitable program for edge type "${g}"!`);this.edgePrograms[g].reallocate(h[g]||0),h[g]=0}for(let g=0,b=m.length;g<b;g++){const E=m[g];l[E]=u,c[l[E]]={type:"edge",id:E},u++;const v=this.edgeDataCache[E];this.addEdgeToProgram(E,l[E],h[v.type]++)}return this.itemIDsIndex=c,this.nodeIndices=s,this.edgeIndices=l,this.emit("afterProcess"),this}handleSettingsUpdate(e){const t=this.settings;if(this.camera.minRatio=t.minCameraRatio,this.camera.maxRatio=t.maxCameraRatio,this.camera.enabledZooming=t.enableCameraZooming,this.camera.enabledPanning=t.enableCameraPanning,this.camera.enabledRotation=t.enableCameraRotation,t.cameraPanBoundaries?this.camera.clean=n=>this.cleanCameraState(n,t.cameraPanBoundaries&&typeof t.cameraPanBoundaries=="object"?t.cameraPanBoundaries:{}):this.camera.clean=null,this.camera.setState(this.camera.validateState(this.camera.getState())),e){if(e.edgeProgramClasses!==t.edgeProgramClasses){for(const n in t.edgeProgramClasses)t.edgeProgramClasses[n]!==e.edgeProgramClasses[n]&&this.registerEdgeProgram(n,t.edgeProgramClasses[n]);for(const n in e.edgeProgramClasses)t.edgeProgramClasses[n]||this.unregisterEdgeProgram(n)}if(e.nodeProgramClasses!==t.nodeProgramClasses||e.nodeHoverProgramClasses!==t.nodeHoverProgramClasses){for(const n in t.nodeProgramClasses)(t.nodeProgramClasses[n]!==e.nodeProgramClasses[n]||t.nodeHoverProgramClasses[n]!==e.nodeHoverProgramClasses[n])&&this.registerNodeProgram(n,t.nodeProgramClasses[n],t.nodeHoverProgramClasses[n]);for(const n in e.nodeProgramClasses)t.nodeProgramClasses[n]||this.unregisterNodeProgram(n)}}return this.mouseCaptor.setSettings(this.settings),this.touchCaptor.setSettings(this.settings),this}cleanCameraState(e,{tolerance:t=0,boundaries:n}={}){const i={...e},{x:[o,a],y:[s,l]}=n||this.nodeExtent,c=[this.graphToViewport({x:o,y:s},{cameraState:e}),this.graphToViewport({x:a,y:s},{cameraState:e}),this.graphToViewport({x:o,y:l},{cameraState:e}),this.graphToViewport({x:a,y:l},{cameraState:e})];let u=1/0,d=-1/0,h=1/0,m=-1/0;c.forEach(({x:f,y:p})=>{u=Math.min(u,f),d=Math.max(d,f),h=Math.min(h,p),m=Math.max(m,p)});const g=d-u,b=m-h,{width:E,height:v}=this.getDimensions();let T=0,_=0;if(g>=E?d<E-t?T=d-(E-t):u>t&&(T=u-t):d>E+t?T=d-(E+t):u<-t&&(T=u+t),b>=v?m<v-t?_=m-(v-t):h>t&&(_=h-t):m>v+t?_=m-(v+t):h<-t&&(_=h+t),T||_){const f=this.viewportToFramedGraph({x:0,y:0},{cameraState:e}),p=this.viewportToFramedGraph({x:T,y:_},{cameraState:e});T=p.x-f.x,_=p.y-f.y,i.x+=T,i.y+=_}return i}renderLabels(){if(!this.settings.renderLabels)return this;const e=this.camera.getState(),t=this.labelGrid.getLabelsToDisplay(e.ratio,this.settings.labelDensity);$t(t,this.nodesWithForcedLabels),this.displayedNodeLabels=new Set;const n=this.canvasContexts.labels;for(let i=0,o=t.length;i<o;i++){const a=t[i],s=this.nodeDataCache[a];if(this.displayedNodeLabels.has(a)||s.hidden)continue;const{x:l,y:c}=this.framedGraphToViewport(s),u=this.scaleSize(s.size);if(!s.forceLabel&&u<this.settings.labelRenderedSizeThreshold||l<-150||l>this.width+ls||c<-50||c>this.height+us)continue;this.displayedNodeLabels.add(a);const{defaultDrawNodeLabel:d}=this.settings,h=this.nodePrograms[s.type];((h==null?void 0:h.drawLabel)||d)(n,{key:a,...s,size:u,x:l,y:c},this.settings)}return this}renderEdgeLabels(){if(!this.settings.renderEdgeLabels)return this;const e=this.canvasContexts.edgeLabels;e.clearRect(0,0,this.width,this.height);const t=cs({graph:this.graph,hoveredNode:this.hoveredNode,displayedNodeLabels:this.displayedNodeLabels,highlightedNodes:this.highlightedNodes});$t(t,this.edgesWithForcedLabels);const n=new Set;for(let i=0,o=t.length;i<o;i++){const a=t[i],s=this.graph.extremities(a),l=this.nodeDataCache[s[0]],c=this.nodeDataCache[s[1]],u=this.edgeDataCache[a];if(n.has(a)||u.hidden||l.hidden||c.hidden)continue;const{defaultDrawEdgeLabel:d}=this.settings,h=this.edgePrograms[u.type];((h==null?void 0:h.drawLabel)||d)(e,{key:a,...u,size:this.scaleSize(u.size)},{key:s[0],...l,...this.framedGraphToViewport(l),size:this.scaleSize(l.size)},{key:s[1],...c,...this.framedGraphToViewport(c),size:this.scaleSize(c.size)},this.settings),n.add(a)}return this.displayedEdgeLabels=n,this}renderHighlightedNodes(){const e=this.canvasContexts.hovers;e.clearRect(0,0,this.width,this.height);const t=a=>{const s=this.nodeDataCache[a],{x:l,y:c}=this.framedGraphToViewport(s),u=this.scaleSize(s.size),{defaultDrawNodeHover:d}=this.settings,h=this.nodePrograms[s.type];((h==null?void 0:h.drawHover)||d)(e,{key:a,...s,size:u,x:l,y:c},this.settings)},n=[];this.hoveredNode&&!this.nodeDataCache[this.hoveredNode].hidden&&n.push(this.hoveredNode),this.highlightedNodes.forEach(a=>{a!==this.hoveredNode&&n.push(a)}),n.forEach(a=>t(a));const i={};n.forEach(a=>{const s=this.nodeDataCache[a].type;i[s]=(i[s]||0)+1});for(const a in this.nodeHoverPrograms)this.nodeHoverPrograms[a].reallocate(i[a]||0),i[a]=0;n.forEach(a=>{const s=this.nodeDataCache[a];this.nodeHoverPrograms[s.type].process(0,i[s.type]++,s)}),this.webGLContexts.hoverNodes.clear(this.webGLContexts.hoverNodes.COLOR_BUFFER_BIT);const o=this.getRenderParams();for(const a in this.nodeHoverPrograms)this.nodeHoverPrograms[a].render(o)}scheduleHighlightedNodesRender(){this.renderHighlightedNodesFrame||this.renderFrame||(this.renderHighlightedNodesFrame=requestAnimationFrame(()=>{this.renderHighlightedNodesFrame=null,this.renderHighlightedNodes(),this.renderEdgeLabels()}))}render(){this.emit("beforeRender");const e=()=>(this.emit("afterRender"),this);if(this.renderFrame&&(cancelAnimationFrame(this.renderFrame),this.renderFrame=null),this.resize(),this.needToProcess&&this.process(),this.needToProcess=!1,this.clear(),this.pickingLayers.forEach(c=>this.resetWebGLTexture(c)),!this.graph.order)return e();const t=this.mouseCaptor,n=this.camera.isAnimated()||t.isMoving||t.draggedEvents||t.currentWheelDirection,i=this.camera.getState(),o=this.getDimensions(),a=this.getGraphDimensions(),s=this.getStagePadding();this.matrix=_e(i,o,a,s),this.invMatrix=_e(i,o,a,s,!0),this.correctionRatio=Tn(this.matrix,i,o),this.graphToViewportRatio=this.getGraphToViewportRatio();const l=this.getRenderParams();for(const c in this.nodePrograms)this.nodePrograms[c].render(l);if(!this.settings.hideEdgesOnMove||!n)for(const c in this.edgePrograms)this.edgePrograms[c].render(l);return this.settings.hideLabelsOnMove&&n||(this.renderLabels(),this.renderEdgeLabels(),this.renderHighlightedNodes()),e()}addNode(e){let t=Object.assign({},this.graph.getNodeAttributes(e));this.settings.nodeReducer&&(t=this.settings.nodeReducer(e,t));const n=hs(this.settings,e,t);this.nodeDataCache[e]=n,this.nodesWithForcedLabels.delete(e),n.forceLabel&&!n.hidden&&this.nodesWithForcedLabels.add(e),this.highlightedNodes.delete(e),n.highlighted&&!n.hidden&&this.highlightedNodes.add(e),this.settings.zIndex&&(n.zIndex<this.nodeZExtent[0]&&(this.nodeZExtent[0]=n.zIndex),n.zIndex>this.nodeZExtent[1]&&(this.nodeZExtent[1]=n.zIndex))}updateNode(e){this.addNode(e);const t=this.nodeDataCache[e];this.normalizationFunction.applyTo(t)}removeNode(e){delete this.nodeDataCache[e],delete this.nodeProgramIndex[e],this.highlightedNodes.delete(e),this.hoveredNode===e&&(this.hoveredNode=null),this.nodesWithForcedLabels.delete(e)}addEdge(e){let t=Object.assign({},this.graph.getEdgeAttributes(e));this.settings.edgeReducer&&(t=this.settings.edgeReducer(e,t));const n=ds(this.settings,e,t);this.edgeDataCache[e]=n,this.edgesWithForcedLabels.delete(e),n.forceLabel&&!n.hidden&&this.edgesWithForcedLabels.add(e),this.settings.zIndex&&(n.zIndex<this.edgeZExtent[0]&&(this.edgeZExtent[0]=n.zIndex),n.zIndex>this.edgeZExtent[1]&&(this.edgeZExtent[1]=n.zIndex))}updateEdge(e){this.addEdge(e)}removeEdge(e){delete this.edgeDataCache[e],delete this.edgeProgramIndex[e],this.hoveredEdge===e&&(this.hoveredEdge=null),this.edgesWithForcedLabels.delete(e)}clearNodeIndices(){this.labelGrid=new ti,this.nodeExtent={x:[0,1],y:[0,1]},this.nodeDataCache={},this.edgeProgramIndex={},this.nodesWithForcedLabels=new Set,this.nodeZExtent=[1/0,-1/0]}clearEdgeIndices(){this.edgeDataCache={},this.edgeProgramIndex={},this.edgesWithForcedLabels=new Set,this.edgeZExtent=[1/0,-1/0]}clearIndices(){this.clearEdgeIndices(),this.clearNodeIndices()}clearNodeState(){this.displayedNodeLabels=new Set,this.highlightedNodes=new Set,this.hoveredNode=null}clearEdgeState(){this.displayedEdgeLabels=new Set,this.highlightedNodes=new Set,this.hoveredEdge=null}clearState(){this.clearEdgeState(),this.clearNodeState()}addNodeToProgram(e,t,n){const i=this.nodeDataCache[e],o=this.nodePrograms[i.type];if(!o)throw new Error(`Sigma: could not find a suitable program for node type "${i.type}"!`);o.process(t,n,i),this.nodeProgramIndex[e]=n}addEdgeToProgram(e,t,n){const i=this.edgeDataCache[e],o=this.edgePrograms[i.type];if(!o)throw new Error(`Sigma: could not find a suitable program for edge type "${i.type}"!`);const a=this.graph.extremities(e),s=this.nodeDataCache[a[0]],l=this.nodeDataCache[a[1]];o.process(t,n,s,l,i),this.edgeProgramIndex[e]=n}getRenderParams(){return{matrix:this.matrix,invMatrix:this.invMatrix,width:this.width,height:this.height,pixelRatio:this.pixelRatio,zoomRatio:this.camera.ratio,cameraAngle:this.camera.angle,sizeRatio:1/this.scaleSize(),correctionRatio:this.correctionRatio,downSizingRatio:this.pickingDownSizingRatio,minEdgeThickness:this.settings.minEdgeThickness,antiAliasingFeather:this.settings.antiAliasingFeather}}getStagePadding(){const{stagePadding:e,autoRescale:t}=this.settings;return t&&e||0}createLayer(e,t,n={}){if(this.elements[e])throw new Error(`Sigma: a layer named "${e}" already exists`);const i=Sn(t,{position:"absolute"},{class:`sigma-${e}`});return n.style&&Object.assign(i.style,n.style),this.elements[e]=i,"beforeLayer"in n&&n.beforeLayer?this.elements[n.beforeLayer].before(i):"afterLayer"in n&&n.afterLayer?this.elements[n.afterLayer].after(i):this.container.appendChild(i),i}createCanvas(e,t={}){return this.createLayer(e,"canvas",t)}createCanvasContext(e,t={}){const n=this.createCanvas(e,t),i={preserveDrawingBuffer:!1,antialias:!1};return this.canvasContexts[e]=n.getContext("2d",i),this}createWebGLContext(e,t={}){const n=(t==null?void 0:t.canvas)||this.createCanvas(e,t);t.hidden&&n.remove();const i={preserveDrawingBuffer:!1,antialias:!1,...t};let o;o=n.getContext("webgl2",i),o||(o=n.getContext("webgl",i)),o||(o=n.getContext("experimental-webgl",i));const a=o;if(this.webGLContexts[e]=a,a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),t.picking){this.pickingLayers.add(e);const s=a.createFramebuffer();if(!s)throw new Error(`Sigma: cannot create a new frame buffer for layer ${e}`);this.frameBuffers[e]=s}return a}killLayer(e){var n;const t=this.elements[e];if(!t)throw new Error(`Sigma: cannot kill layer ${e}, which does not exist`);return this.webGLContexts[e]?((n=this.webGLContexts[e].getExtension("WEBGL_lose_context"))==null||n.loseContext(),delete this.webGLContexts[e]):this.canvasContexts[e]&&delete this.canvasContexts[e],t.remove(),delete this.elements[e],this}getCamera(){return this.camera}setCamera(e){this.unbindCameraHandlers(),this.camera=e,this.bindCameraHandlers()}getContainer(){return this.container}getGraph(){return this.graph}setGraph(e){e!==this.graph&&(this.hoveredNode&&!e.hasNode(this.hoveredNode)&&(this.hoveredNode=null),this.hoveredEdge&&!e.hasEdge(this.hoveredEdge)&&(this.hoveredEdge=null),this.unbindGraphHandlers(),this.checkEdgesEventsFrame!==null&&(cancelAnimationFrame(this.checkEdgesEventsFrame),this.checkEdgesEventsFrame=null),this.graph=e,this.bindGraphHandlers(),this.refresh())}getMouseCaptor(){return this.mouseCaptor}getTouchCaptor(){return this.touchCaptor}getDimensions(){return{width:this.width,height:this.height}}getGraphDimensions(){const e=this.customBBox||this.nodeExtent;return{width:e.x[1]-e.x[0]||1,height:e.y[1]-e.y[0]||1}}getNodeDisplayData(e){const t=this.nodeDataCache[e];return t?Object.assign({},t):void 0}getEdgeDisplayData(e){const t=this.edgeDataCache[e];return t?Object.assign({},t):void 0}getNodeDisplayedLabels(){return new Set(this.displayedNodeLabels)}getEdgeDisplayedLabels(){return new Set(this.displayedEdgeLabels)}getSettings(){return{...this.settings}}getSetting(e){return this.settings[e]}setSetting(e,t){const n={...this.settings};return this.settings[e]=t,or(this.settings),this.handleSettingsUpdate(n),this.scheduleRefresh(),this}updateSetting(e,t){return this.setSetting(e,t(this.settings[e])),this}setSettings(e){const t={...this.settings};return this.settings={...this.settings,...e},or(this.settings),this.handleSettingsUpdate(t),this.scheduleRefresh(),this}resize(e){const t=this.width,n=this.height;if(this.width=this.container.offsetWidth,this.height=this.container.offsetHeight,this.pixelRatio=jt(),this.width===0)if(this.settings.allowInvalidContainer)this.width=1;else throw new Error("Sigma: Container has no width. You can set the allowInvalidContainer setting to true to stop seeing this error.");if(this.height===0)if(this.settings.allowInvalidContainer)this.height=1;else throw new Error("Sigma: Container has no height. You can set the allowInvalidContainer setting to true to stop seeing this error.");if(!e&&t===this.width&&n===this.height)return this;for(const i in this.elements){const o=this.elements[i];o.style.width=this.width+"px",o.style.height=this.height+"px"}for(const i in this.canvasContexts)this.elements[i].setAttribute("width",this.width*this.pixelRatio+"px"),this.elements[i].setAttribute("height",this.height*this.pixelRatio+"px"),this.pixelRatio!==1&&this.canvasContexts[i].scale(this.pixelRatio,this.pixelRatio);for(const i in this.webGLContexts){this.elements[i].setAttribute("width",this.width*this.pixelRatio+"px"),this.elements[i].setAttribute("height",this.height*this.pixelRatio+"px");const o=this.webGLContexts[i];if(o.viewport(0,0,this.width*this.pixelRatio,this.height*this.pixelRatio),this.pickingLayers.has(i)){const a=this.textures[i];a&&o.deleteTexture(a)}}return this.emit("resize"),this}clear(){return this.emit("beforeClear"),this.webGLContexts.nodes.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER,null),this.webGLContexts.nodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT),this.webGLContexts.edges.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER,null),this.webGLContexts.edges.clear(WebGLRenderingContext.COLOR_BUFFER_BIT),this.webGLContexts.hoverNodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT),this.canvasContexts.labels.clearRect(0,0,this.width,this.height),this.canvasContexts.hovers.clearRect(0,0,this.width,this.height),this.canvasContexts.edgeLabels.clearRect(0,0,this.width,this.height),this.emit("afterClear"),this}refresh(e){var o,a;const t=(e==null?void 0:e.skipIndexation)!==void 0?e==null?void 0:e.skipIndexation:!1,n=(e==null?void 0:e.schedule)!==void 0?e.schedule:!1,i=!e||!e.partialGraph;if(i)this.clearEdgeIndices(),this.clearNodeIndices(),this.graph.forEachNode(s=>this.addNode(s)),this.graph.forEachEdge(s=>this.addEdge(s));else{const s=((o=e.partialGraph)==null?void 0:o.nodes)||[];for(let c=0,u=(s==null?void 0:s.length)||0;c<u;c++){const d=s[c];if(this.updateNode(d),t){const h=this.nodeProgramIndex[d];if(h===void 0)throw new Error(`Sigma: node "${d}" can't be repaint`);this.addNodeToProgram(d,this.nodeIndices[d],h)}}const l=((a=e==null?void 0:e.partialGraph)==null?void 0:a.edges)||[];for(let c=0,u=l.length;c<u;c++){const d=l[c];if(this.updateEdge(d),t){const h=this.edgeProgramIndex[d];if(h===void 0)throw new Error(`Sigma: edge "${d}" can't be repaint`);this.addEdgeToProgram(d,this.edgeIndices[d],h)}}}return(i||!t)&&(this.needToProcess=!0),n?this.scheduleRender():this.render(),this}scheduleRender(){return this.renderFrame||(this.renderFrame=requestAnimationFrame(()=>{this.render()})),this}scheduleRefresh(e){return this.refresh({...e,schedule:!0})}getViewportZoomedState(e,t){const{ratio:n,angle:i,x:o,y:a}=this.camera.getState(),{minCameraRatio:s,maxCameraRatio:l}=this.settings;typeof l=="number"&&(t=Math.min(t,l)),typeof s=="number"&&(t=Math.max(t,s));const c=t/n,u={x:this.width/2,y:this.height/2},d=this.viewportToFramedGraph(e),h=this.viewportToFramedGraph(u);return{angle:i,x:(d.x-h.x)*(1-c)+o,y:(d.y-h.y)*(1-c)+a,ratio:t}}viewRectangle(){const e=this.viewportToFramedGraph({x:0,y:0}),t=this.viewportToFramedGraph({x:this.width,y:0}),n=this.viewportToFramedGraph({x:0,y:this.height});return{x1:e.x,y1:e.y,x2:t.x,y2:t.y,height:t.y-n.y}}framedGraphToViewport(e,t={}){const n=!!t.cameraState||!!t.viewportDimensions||!!t.graphDimensions,i=t.matrix?t.matrix:n?_e(t.cameraState||this.camera.getState(),t.viewportDimensions||this.getDimensions(),t.graphDimensions||this.getGraphDimensions(),t.padding||this.getStagePadding()):this.matrix,o=Ye(i,e);return{x:(1+o.x)*this.width/2,y:(1-o.y)*this.height/2}}viewportToFramedGraph(e,t={}){const n=!!t.cameraState||!!t.viewportDimensions||!t.graphDimensions,i=t.matrix?t.matrix:n?_e(t.cameraState||this.camera.getState(),t.viewportDimensions||this.getDimensions(),t.graphDimensions||this.getGraphDimensions(),t.padding||this.getStagePadding(),!0):this.invMatrix,o=Ye(i,{x:e.x/this.width*2-1,y:1-e.y/this.height*2});return isNaN(o.x)&&(o.x=0),isNaN(o.y)&&(o.y=0),o}viewportToGraph(e,t={}){return this.normalizationFunction.inverse(this.viewportToFramedGraph(e,t))}graphToViewport(e,t={}){return this.framedGraphToViewport(this.normalizationFunction(e),t)}getGraphToViewportRatio(){const e={x:0,y:0},t={x:1,y:1},n=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)),i=this.graphToViewport(e),o=this.graphToViewport(t);return Math.sqrt(Math.pow(i.x-o.x,2)+Math.pow(i.y-o.y,2))/n}getBBox(){return this.nodeExtent}getCustomBBox(){return this.customBBox}setCustomBBox(e){return this.customBBox=e,this.scheduleRender(),this}kill(){this.emit("kill"),this.removeAllListeners(),this.unbindCameraHandlers(),window.removeEventListener("resize",this.activeListeners.handleResize),this.mouseCaptor.kill(),this.touchCaptor.kill(),this.unbindGraphHandlers(),this.clearIndices(),this.clearState(),this.nodeDataCache={},this.edgeDataCache={},this.highlightedNodes.clear(),this.renderFrame&&(cancelAnimationFrame(this.renderFrame),this.renderFrame=null),this.renderHighlightedNodesFrame&&(cancelAnimationFrame(this.renderHighlightedNodesFrame),this.renderHighlightedNodesFrame=null);const e=this.container;for(;e.firstChild;)e.removeChild(e.firstChild);this.canvasContexts={},this.webGLContexts={},this.elements={};for(const t in this.nodePrograms)this.nodePrograms[t].kill();for(const t in this.nodeHoverPrograms)this.nodeHoverPrograms[t].kill();for(const t in this.edgePrograms)this.edgePrograms[t].kill();this.nodePrograms={},this.nodeHoverPrograms={},this.edgePrograms={};for(const t in this.elements)this.killLayer(t)}scaleSize(e=1,t=this.camera.ratio){return e/this.settings.zoomToSizeRatioFunction(t)*(this.getSetting("itemSizesReference")==="positions"?t*this.graphToViewportRatio:1)}getCanvases(){const e={};for(const t in this.elements)this.elements[t]instanceof HTMLCanvasElement&&(e[t]=this.elements[t]);return e}};const le=class le extends ri{};le.Camera=be,le.MouseCaptor=Jn,le.Sigma=ri,le.rendering={...Ja,createNodeBorderProgram:jr,createNodeImageProgram:Ft,createNodePiechartProgram:da,EdgeCurveProgram:ro},le.utils=_a;let ar=le;return ar});
