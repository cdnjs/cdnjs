/**
 * @license jquery.panzoom.js v2.0.5
 * Updated: Mon Feb 01 2016
 * Add pan and zoom functionality to any element
 * Copyright (c) timmy willison
 * Released under the MIT license
 * https://github.com/timmywil/jquery.panzoom/blob/master/MIT-License.txt
 */
!function(a,b){
// AMD
"function"==typeof define&&define.amd?define(["jquery"],function(c){return b(a,c)}):"object"==typeof exports?b(a,require("jquery")):b(a,a.jQuery)}("undefined"!=typeof window?window:this,function(a,b){"use strict";/**
	 * Utility for determing transform matrix equality
	 * Checks backwards to test translation first
	 * @param {Array} first
	 * @param {Array} second
	 */
function c(a,b){for(var c=a.length;--c;)if(+a[c]!==+b[c])return!1;return!0}/**
	 * Creates the options object for reset functions
	 * @param {Boolean|Object} opts See reset methods
	 * @returns {Object} Returns the newly-created options object
	 */
function d(a){var c={range:!0,animate:!0};return"boolean"==typeof a?c.animate=a:b.extend(c,a),c}/**
	 * Represent a transformation matrix with a 3x3 matrix for calculations
	 * Matrix functions adapted from Louis Remi's jQuery.transform (https://github.com/louisremi/jquery.transform.js)
	 * @param {Array|Number} a An array of six values representing a 2d transformation matrix
	 */
function e(a,c,d,e,f,g,h,i,j){"array"===b.type(a)?this.elements=[+a[0],+a[2],+a[4],+a[1],+a[3],+a[5],0,0,1]:this.elements=[a,c,d,e,f,g,h||0,i||0,j||1]}/**
	 * Create a vector containing three values
	 */
function f(a,b,c){this.elements=[a,b,c]}/**
	 * Create a Panzoom object for a given element
	 * @constructor
	 * @param {Element} elem - Element to use pan and zoom
	 * @param {Object} [options] - An object literal containing options to override default options
	 *  (See Panzoom.defaults for ones not listed below)
	 * @param {jQuery} [options.$zoomIn] - zoom in buttons/links collection (you can also bind these yourself
	 *  e.g. $button.on('click', function(e) { e.preventDefault(); $elem.panzoom('zoomIn'); });)
	 * @param {jQuery} [options.$zoomOut] - zoom out buttons/links collection on which to bind zoomOut
	 * @param {jQuery} [options.$zoomRange] - zoom in/out with this range control
	 * @param {jQuery} [options.$reset] - Reset buttons/links collection on which to bind the reset method
	 * @param {Function} [options.on[Start|Change|Zoom|Pan|End|Reset] - Optional callbacks for panzoom events
	 */
function g(a,c){
// Allow instantiation without `new` keyword
if(!(this instanceof g))return new g(a,c);
// Sanity checks
1!==a.nodeType&&b.error("Panzoom called on non-Element node"),b.contains(l,a)||b.error("Panzoom element must be attached to the document");
// Don't remake
var d=b.data(a,m);if(d)return d;
// Extend default with given object literal
// Each instance gets its own options
this.options=c=b.extend({},g.defaults,c),this.elem=a;var e=this.$elem=b(a);this.$set=c.$set&&c.$set.length?c.$set:e,this.$doc=b(a.ownerDocument||l),this.$parent=e.parent(),
// This is SVG if the namespace is SVG
// However, while <svg> elements are SVG, we want to treat those like other elements
this.isSVG=r.test(a.namespaceURI)&&"svg"!==a.nodeName.toLowerCase(),this.panning=!1,
// Save the original transform value
// Save the prefixed transform style key
// Set the starting transform
this._buildTransform(),
// Build the appropriately-prefixed transform style property name
// De-camelcase
this._transform=!this.isSVG&&b.cssProps.transform.replace(q,"-$1").toLowerCase(),
// Build the transition value
this._buildTransition(),
// Build containment dimensions
this.resetDimensions();
// Add zoom and reset buttons to `this`
var f=b(),h=this;b.each(["$zoomIn","$zoomOut","$zoomRange","$reset"],function(a,b){h[b]=c[b]||f}),this.enable(),
// Save the instance
b.data(a,m,this)}
// Common properties to lift for touch or pointer events
var h="over out down up move enter leave cancel".split(" "),i=b.extend({},b.event.mouseHooks),j={};
// Support pointer events in IE11+ if available
if(a.PointerEvent)b.each(h,function(a,c){
// Add event name to events property and add fixHook
b.event.fixHooks[j[c]="pointer"+c]=i});else{var k=i.props;
// Add touch properties for the touch hook
i.props=k.concat(["touches","changedTouches","targetTouches","altKey","ctrlKey","metaKey","shiftKey"]),/**
		 * Support: Android
		 * Android sets pageX/Y to 0 for any touch event
		 * Attach first touch's pageX/pageY and clientX/clientY if not set correctly
		 */
i.filter=function(a,b){var c,d=k.length;if(!b.pageX&&b.touches&&(c=b.touches[0]))
// Copy over all mouse properties
for(;d--;)a[k[d]]=c[k[d]];return a},b.each(h,function(a,c){
// No equivalent touch events for over and out
if(2>a)j[c]="mouse"+c;else{var d="touch"+("down"===c?"start":"up"===c?"end":c);
// Add fixHook
b.event.fixHooks[d]=i,
// Add event names to events property
j[c]=d+" mouse"+c}})}b.pointertouch=j;var l=a.document,m="__pz__",n=Array.prototype.slice,o=!!a.PointerEvent,p=function(){var a=l.createElement("input");return a.setAttribute("oninput","return"),"function"==typeof a.oninput}(),q=/([A-Z])/g,r=/^http:[\w\.\/]+svg$/,s=/^inline/,t="(\\-?[\\d\\.e]+)",u="\\,?\\s*",v=new RegExp("^matrix\\("+t+u+t+u+t+u+t+u+t+u+t+"\\)$");/**
	 * Get the element at zero-indexed index i
	 * @param {Number} i
	 */
// Attach regex for possible use (immutable)
// Container for event names
// Add Panzoom as a static property
/**
	 * Extend jQuery
	 * @param {Object|String} options - The name of a method to call on the prototype
	 *  or an object literal of options
	 * @returns {jQuery|Mixed} jQuery instance for regular chaining or the return value(s) of a panzoom method call
	 */
return e.prototype={/**
		 * Multiply a 3x3 matrix by a similar matrix or a vector
		 * @param {Matrix|Vector} matrix
		 * @return {Matrix|Vector} Returns a vector if multiplying by a vector
		 */
x:function(a){var b=a instanceof f,c=this.elements,d=a.elements;return b&&3===d.length?new f(c[0]*d[0]+c[1]*d[1]+c[2]*d[2],c[3]*d[0]+c[4]*d[1]+c[5]*d[2],c[6]*d[0]+c[7]*d[1]+c[8]*d[2]):d.length===c.length?new e(c[0]*d[0]+c[1]*d[3]+c[2]*d[6],c[0]*d[1]+c[1]*d[4]+c[2]*d[7],c[0]*d[2]+c[1]*d[5]+c[2]*d[8],c[3]*d[0]+c[4]*d[3]+c[5]*d[6],c[3]*d[1]+c[4]*d[4]+c[5]*d[7],c[3]*d[2]+c[4]*d[5]+c[5]*d[8],c[6]*d[0]+c[7]*d[3]+c[8]*d[6],c[6]*d[1]+c[7]*d[4]+c[8]*d[7],c[6]*d[2]+c[7]*d[5]+c[8]*d[8]):!1},/**
		 * Generates an inverse of the current matrix
		 * @returns {Matrix}
		 */
inverse:function(){var a=1/this.determinant(),b=this.elements;return new e(a*(b[8]*b[4]-b[7]*b[5]),a*-(b[8]*b[1]-b[7]*b[2]),a*(b[5]*b[1]-b[4]*b[2]),a*-(b[8]*b[3]-b[6]*b[5]),a*(b[8]*b[0]-b[6]*b[2]),a*-(b[5]*b[0]-b[3]*b[2]),a*(b[7]*b[3]-b[6]*b[4]),a*-(b[7]*b[0]-b[6]*b[1]),a*(b[4]*b[0]-b[3]*b[1]))},/**
		 * Calculates the determinant of the current matrix
		 * @returns {Number}
		 */
determinant:function(){var a=this.elements;return a[0]*(a[8]*a[4]-a[7]*a[5])-a[3]*(a[8]*a[1]-a[7]*a[2])+a[6]*(a[5]*a[1]-a[4]*a[2])}},f.prototype.e=e.prototype.e=function(a){return this.elements[a]},g.rmatrix=v,g.events=b.pointertouch,g.defaults={
// Should always be non-empty
// Used to bind jQuery events without collisions
// A guid is not added here as different instantiations/versions of panzoom
// on the same element is not supported, so don't do it.
eventNamespace:".panzoom",
// Whether or not to transition the scale
transition:!0,
// Default cursor style for the element
cursor:"move",
// There may be some use cases for zooming without panning or vice versa
disablePan:!1,disableZoom:!1,
// The increment at which to zoom
// adds/subtracts to the scale each time zoomIn/Out is called
increment:.3,minScale:.4,maxScale:5,
// The default step for the range input
// Precendence: default < HTML attribute < option setting
rangeStep:.05,
// Animation duration (ms)
duration:200,
// CSS easing used for scale transition
easing:"ease-in-out",
// Indicate that the element should be contained within it's parent when panning
// Note: this does not affect zooming outside of the parent
// Set this value to 'invert' to only allow panning outside of the parent element (basically the opposite of the normal use of contain)
// 'invert' is useful for a large panzoom element where you don't want to show anything behind it
contain:!1},g.prototype={constructor:g,/**
		 * @returns {Panzoom} Returns the instance
		 */
instance:function(){return this},/**
		 * Enable or re-enable the panzoom instance
		 */
enable:function(){
// Unbind first
this._initStyle(),this._bind(),this.disabled=!1},/**
		 * Disable panzoom
		 */
disable:function(){this.disabled=!0,this._resetStyle(),this._unbind()},/**
		 * @returns {Boolean} Returns whether the current panzoom instance is disabled
		 */
isDisabled:function(){return this.disabled},/**
		 * Destroy the panzoom instance
		 */
destroy:function(){this.disable(),b.removeData(this.elem,m)},/**
		 * Builds the restricing dimensions from the containment element
		 * Also used with focal points
		 * Call this method whenever the dimensions of the element or parent are changed
		 */
resetDimensions:function(){
// Reset container properties
var a=this.$parent;this.container={width:a.innerWidth(),height:a.innerHeight()};var c,d=a.offset(),e=this.elem,f=this.$elem;this.isSVG?(c=e.getBoundingClientRect(),c={left:c.left-d.left,top:c.top-d.top,width:c.width,height:c.height,margin:{left:0,top:0}}):c={left:b.css(e,"left",!0)||0,top:b.css(e,"top",!0)||0,width:f.innerWidth(),height:f.innerHeight(),margin:{top:b.css(e,"marginTop",!0)||0,left:b.css(e,"marginLeft",!0)||0}},c.widthBorder=b.css(e,"borderLeftWidth",!0)+b.css(e,"borderRightWidth",!0)||0,c.heightBorder=b.css(e,"borderTopWidth",!0)+b.css(e,"borderBottomWidth",!0)||0,this.dimensions=c},/**
		 * Return the element to it's original transform matrix
		 * @param {Boolean} [options] If a boolean is passed, animate the reset (default: true). If an options object is passed, simply pass that along to setMatrix.
		 * @param {Boolean} [options.silent] Silence the reset event
		 */
reset:function(a){a=d(a);
// Reset the transform to its original value
var b=this.setMatrix(this._origTransform,a);a.silent||this._trigger("reset",b)},/**
		 * Only resets zoom level
		 * @param {Boolean|Object} [options] Whether to animate the reset (default: true) or an object of options to pass to zoom()
		 */
resetZoom:function(a){a=d(a);var b=this.getMatrix(this._origTransform);a.dValue=b[3],this.zoom(b[0],a)},/**
		 * Only reset panning
		 * @param {Boolean|Object} [options] Whether to animate the reset (default: true) or an object of options to pass to pan()
		 */
resetPan:function(a){var b=this.getMatrix(this._origTransform);this.pan(b[4],b[5],d(a))},/**
		 * Sets a transform on the $set
		 * @param {String} transform
		 */
setTransform:function(a){for(var c=this.isSVG?"attr":"style",d=this.$set,e=d.length;e--;)b[c](d[e],"transform",a)},/**
		 * Retrieving the transform is different for SVG
		 *  (unless a style transform is already present)
		 * Uses the $set collection for retrieving the transform
		 * @param {String} [transform] Pass in an transform value (like 'scale(1.1)')
		 *  to have it formatted into matrix format for use by Panzoom
		 * @returns {String} Returns the current transform value of the element
		 */
getTransform:function(a){var c=this.$set,d=c[0];
// Retrieve the transform
// Convert any transforms set by the user to matrix format
// by setting to computed
// Get computed and set for next time
return a?this.setTransform(a):a=b[this.isSVG?"attr":"style"](d,"transform"),"none"===a||v.test(a)||this.setTransform(a=b.css(d,"transform")),a||"none"},/**
		 * Retrieve the current transform matrix for $elem (or turn a transform into it's array values)
		 * @param {String} [transform] matrix-formatted transform value
		 * @returns {Array} Returns the current transform matrix split up into it's parts, or a default matrix
		 */
getMatrix:function(a){var b=v.exec(a||this.getTransform());return b&&b.shift(),b||[1,0,0,1,0,0]},/**
		 * Given a matrix object, quickly set the current matrix of the element
		 * @param {Array|String} matrix
		 * @param {Boolean} [animate] Whether to animate the transform change
		 * @param {Object} [options]
		 * @param {Boolean|String} [options.animate] Whether to animate the transform change, or 'skip' indicating that it is unnecessary to set
		 * @param {Boolean} [options.contain] Override the global contain option
		 * @param {Boolean} [options.range] If true, $zoomRange's value will be updated.
		 * @param {Boolean} [options.silent] If true, the change event will not be triggered
		 * @returns {Array} Returns the newly-set matrix
		 */
setMatrix:function(a,c){if(!this.disabled){c||(c={}),
// Convert to array
"string"==typeof a&&(a=this.getMatrix(a));var d,e,f,g,h,i,j,k,l,m,n=+a[0],o=this.$parent,p="undefined"!=typeof c.contain?c.contain:this.options.contain;
// Apply containment
// Use absolute value of scale here as negative scale doesn't mean even smaller
// marginW += dims.widthBorder / 2;
// If the element is not naturally centered, assume full margin right
// Set transition
// Update range
// Set the matrix on this.$set
return p&&(d=this._checkDims(),e=this.container,l=d.width+d.widthBorder,m=d.height+d.heightBorder,f=l*Math.abs(n)>e.width?(l*Math.abs(n)-e.width)/2:0,g=m*Math.abs(n)>e.height?(m*Math.abs(n)-e.height)/2:0,j=d.left+d.margin.left,k=d.top+d.margin.top,"invert"===p?(h=l>e.width?l-e.width:0,i=m>e.height?m-e.height:0,f+=(e.width-l)/2,g+=(e.height-m)/2,a[4]=Math.max(Math.min(a[4],f-j),-f-j-h),a[5]=Math.max(Math.min(a[5],g-k),-g-k-i+d.heightBorder)):(g+=d.heightBorder/2,h=e.width>l?e.width-l:0,i=e.height>m?e.height-m:0,"center"===o.css("textAlign")&&s.test(b.css(this.elem,"display"))?h=0:f=g=0,a[4]=Math.min(Math.max(a[4],f-j),-f-j+h),a[5]=Math.min(Math.max(a[5],g-k),-g-k+i))),"skip"!==c.animate&&this.transition(!c.animate),c.range&&this.$zoomRange.val(n),this.setTransform("matrix("+a.join(",")+")"),c.silent||this._trigger("change",a),a}},/**
		 * @returns {Boolean} Returns whether the panzoom element is currently being dragged
		 */
isPanning:function(){return this.panning},/**
		 * Apply the current transition to the element, if allowed
		 * @param {Boolean} [off] Indicates that the transition should be turned off
		 */
transition:function(a){if(this._transition)for(var c=a||!this.options.transition?"none":this._transition,d=this.$set,e=d.length;e--;)
// Avoid reflows when zooming
b.style(d[e],"transition")!==c&&b.style(d[e],"transition",c)},/**
		 * Pan the element to the specified translation X and Y
		 * Note: this is not the same as setting jQuery#offset() or jQuery#position()
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Object} [options] These options are passed along to setMatrix
		 * @param {Array} [options.matrix] The matrix being manipulated (if already known so it doesn't have to be retrieved again)
		 * @param {Boolean} [options.silent] Silence the pan event. Note that this will also silence the setMatrix change event.
		 * @param {Boolean} [options.relative] Make the x and y values relative to the existing matrix
		 */
pan:function(a,b,c){if(!this.options.disablePan){c||(c={});var d=c.matrix;d||(d=this.getMatrix()),
// Cast existing matrix values to numbers
c.relative&&(a+=+d[4],b+=+d[5]),d[4]=a,d[5]=b,this.setMatrix(d,c),c.silent||this._trigger("pan",d[4],d[5])}},/**
		 * Zoom in/out the element using the scale properties of a transform matrix
		 * @param {Number|Boolean} [scale] The scale to which to zoom or a boolean indicating to transition a zoom out
		 * @param {Object} [opts] All global options can be overwritten by this options object. For example, override the default increment.
		 * @param {Boolean} [opts.noSetRange] Specify that the method should not set the $zoomRange value (as is the case when $zoomRange is calling zoom on change)
		 * @param {jQuery.Event|Object} [opts.focal] A focal point on the panzoom element on which to zoom.
		 *  If an object, set the clientX and clientY properties to the position relative to the parent
		 * @param {Boolean} [opts.animate] Whether to animate the zoom (defaults to true if scale is not a number, false otherwise)
		 * @param {Boolean} [opts.silent] Silence the zoom event
		 * @param {Array} [opts.matrix] Optionally pass the current matrix so it doesn't need to be retrieved
		 * @param {Number} [opts.dValue] Think of a transform matrix as four values a, b, c, d
		 *  where a/d are the horizontal/vertical scale values and b/c are the skew values
		 *  (5 and 6 of matrix array are the tx/ty transform values).
		 *  Normally, the scale is set to both the a and d values of the matrix.
		 *  This option allows you to specify a different d value for the zoom.
		 *  For instance, to flip vertically, you could set -1 as the dValue.
		 */
zoom:function(a,c){
// Shuffle arguments
"object"==typeof a?(c=a,a=null):c||(c={});var d=b.extend({},this.options,c);
// Check if disabled
if(!d.disableZoom){var g=!1,h=d.matrix||this.getMatrix();"number"!=typeof a&&(a=+h[0]+d.increment*(a?-1:1),g=!0),
// Constrain scale
a>d.maxScale?a=d.maxScale:a<d.minScale&&(a=d.minScale);
// Calculate focal point based on scale
var i=d.focal;if(i&&!d.disablePan){
// Adapted from code by Florian Günther
// https://github.com/florianguenther/zui53
var j=this._checkDims(),k=i.clientX,l=i.clientY;
// Adjust the focal point for default transform-origin => 50% 50%
this.isSVG||(k-=(j.width+j.widthBorder)/2,l-=(j.height+j.heightBorder)/2);var m=new f(k,l,1),n=new e(h),o=this.parentOffset||this.$parent.offset(),p=new e(1,0,o.left-this.$doc.scrollLeft(),0,1,o.top-this.$doc.scrollTop()),q=n.inverse().x(p.inverse().x(m)),r=a/h[0];n=n.x(new e([r,0,0,r,0,0])),m=p.x(n.x(q)),h[4]=+h[4]+(k-m.e(0)),h[5]=+h[5]+(l-m.e(1))}
// Set the scale
h[0]=a,h[3]="number"==typeof d.dValue?d.dValue:a,
// Calling zoom may still pan the element
this.setMatrix(h,{animate:"boolean"==typeof d.animate?d.animate:g,
// Set the zoomRange value
range:!d.noSetRange}),
// Trigger zoom event
d.silent||this._trigger("zoom",h[0],d)}},/**
		 * Get/set option on an existing instance
		 * @returns {Array|undefined} If getting, returns an array of all values
		 *   on each instance for a given key. If setting, continue chaining by returning undefined.
		 */
option:function(a,c){var d;if(!a)
// Avoids returning direct reference
return b.extend({},this.options);if("string"==typeof a){if(1===arguments.length)return void 0!==this.options[a]?this.options[a]:null;d={},d[a]=c}else d=a;this._setOptions(d)},/**
		 * Internally sets options
		 * @param {Object} options - An object literal of options to set
		 */
_setOptions:function(a){b.each(a,b.proxy(function(a,c){switch(a){case"disablePan":this._resetStyle();/* falls through */
case"$zoomIn":case"$zoomOut":case"$zoomRange":case"$reset":case"disableZoom":case"onStart":case"onChange":case"onZoom":case"onPan":case"onEnd":case"onReset":case"eventNamespace":this._unbind()}switch(this.options[a]=c,a){case"disablePan":this._initStyle();/* falls through */
case"$zoomIn":case"$zoomOut":case"$zoomRange":case"$reset":
// Set these on the instance
this[a]=c;/* falls through */
case"disableZoom":case"onStart":case"onChange":case"onZoom":case"onPan":case"onEnd":case"onReset":case"eventNamespace":this._bind();break;case"cursor":b.style(this.elem,"cursor",c);break;case"minScale":this.$zoomRange.attr("min",c);break;case"maxScale":this.$zoomRange.attr("max",c);break;case"rangeStep":this.$zoomRange.attr("step",c);break;case"startTransform":this._buildTransform();break;case"duration":case"easing":this._buildTransition();/* falls through */
case"transition":this.transition();break;case"$set":c instanceof b&&c.length&&(this.$set=c,
// Reset styles
this._initStyle(),this._buildTransform())}},this))},/**
		 * Initialize base styles for the element and its parent
		 */
_initStyle:function(){var a={
// Promote the element to it's own compositor layer
"backface-visibility":"hidden",
// Set to defaults for the namespace
"transform-origin":this.isSVG?"0 0":"50% 50%"};
// Set elem styles
this.options.disablePan||(a.cursor=this.options.cursor),this.$set.css(a);
// Set parent to relative if set to static
var c=this.$parent;
// No need to add styles to the body
c.length&&!b.nodeName(c[0],"body")&&(a={overflow:"hidden"},"static"===c.css("position")&&(a.position="relative"),c.css(a))},/**
		 * Undo any styles attached in this plugin
		 */
_resetStyle:function(){this.$elem.css({cursor:"",transition:""}),this.$parent.css({overflow:"",position:""})},/**
		 * Binds all necessary events
		 */
_bind:function(){var a=this,c=this.options,d=c.eventNamespace,e=o?"pointerdown"+d:"touchstart"+d+" mousedown"+d,f=o?"pointerup"+d:"touchend"+d+" click"+d,h={},i=this.$reset,j=this.$zoomRange;
// No bindings if zooming is disabled
if(
// Bind panzoom events from options
b.each(["Start","Change","Zoom","Pan","End","Reset"],function(){var a=c["on"+this];b.isFunction(a)&&(h["panzoom"+this.toLowerCase()+d]=a)}),
// Bind $elem drag and click/touchdown events
// Bind touchstart if either panning or zooming is enabled
c.disablePan&&c.disableZoom||(h[e]=function(b){var d;("touchstart"===b.type?!(d=b.touches)||(1!==d.length||c.disablePan)&&2!==d.length:c.disablePan||1!==b.which)||(b.preventDefault(),b.stopPropagation(),a._startMove(b,d))}),this.$elem.on(h),
// Bind reset
i.length&&i.on(f,function(b){b.preventDefault(),a.reset()}),
// Set default attributes for the range input
j.length&&j.attr({
// Only set the range step if explicit or
// set the default if there is no attribute present
step:c.rangeStep===g.defaults.rangeStep&&j.attr("step")||c.rangeStep,min:c.minScale,max:c.maxScale}).prop({value:this.getMatrix()[0]}),!c.disableZoom){var k=this.$zoomIn,l=this.$zoomOut;
// Bind zoom in/out
// Don't bind one without the other
k.length&&l.length&&(
// preventDefault cancels future mouse events on touch events
k.on(f,function(b){b.preventDefault(),a.zoom()}),l.on(f,function(b){b.preventDefault(),a.zoom(!0)})),j.length&&(h={},h[(o?"pointerdown":"mousedown")+d]=function(){a.transition(!0)},h[(p?"input":"change")+d]=function(){a.zoom(+this.value,{noSetRange:!0})},j.on(h))}},/**
		 * Unbind all events
		 */
_unbind:function(){this.$elem.add(this.$zoomIn).add(this.$zoomOut).add(this.$reset).off(this.options.eventNamespace)},/**
		 * Builds the original transform value
		 */
_buildTransform:function(){
// Save the original transform
// Retrieving this also adds the correct prefixed style name
// to jQuery's internal $.cssProps
return this._origTransform=this.getTransform(this.options.startTransform)},/**
		 * Set transition property for later use when zooming
		 * If SVG, create necessary animations elements for translations and scaling
		 */
_buildTransition:function(){if(this._transform){var a=this.options;this._transition=this._transform+" "+a.duration+"ms "+a.easing}},/**
		 * Checks dimensions to make sure they don't need to be re-calculated
		 */
_checkDims:function(){var a=this.dimensions;
// Rebuild if width or height is still 0
return a.width&&a.height||this.resetDimensions(),this.dimensions},/**
		 * Calculates the distance between two touch points
		 * Remember pythagorean?
		 * @param {Array} touches
		 * @returns {Number} Returns the distance
		 */
_getDistance:function(a){var b=a[0],c=a[1];return Math.sqrt(Math.pow(Math.abs(c.clientX-b.clientX),2)+Math.pow(Math.abs(c.clientY-b.clientY),2))},/**
		 * Constructs an approximated point in the middle of two touch points
		 * @returns {Object} Returns an object containing pageX and pageY
		 */
_getMiddle:function(a){var b=a[0],c=a[1];return{clientX:(c.clientX-b.clientX)/2+b.clientX,clientY:(c.clientY-b.clientY)/2+b.clientY}},/**
		 * Trigger a panzoom event on our element
		 * The event is passed the Panzoom instance
		 * @param {String|jQuery.Event} event
		 * @param {Mixed} arg1[, arg2, arg3, ...] Arguments to append to the trigger
		 */
_trigger:function(a){"string"==typeof a&&(a="panzoom"+a),this.$elem.triggerHandler(a,[this].concat(n.call(arguments,1)))},/**
		 * Starts the pan
		 * This is bound to mouse/touchmove on the element
		 * @param {jQuery.Event} event An event with pageX, pageY, and possibly the touches list
		 * @param {TouchList} [touches] The touches list if present
		 */
_startMove:function(a,d){var e,f,g,h,i,j,k,m,n=this,p=this.options,q=p.eventNamespace,r=this.getMatrix(),s=r.slice(0),t=+s[4],u=+s[5],v={matrix:r,animate:"skip"};
// Use proper events
o?(f="pointermove",g="pointerup"):"touchstart"===a.type?(f="touchmove",g="touchend"):(f="mousemove",g="mouseup"),f+=q,g+=q,this.transition(!0),this.panning=!0,this._trigger("start",a,d),d&&2===d.length?(h=this._getDistance(d),i=+r[0],j=this._getMiddle(d),e=function(a){a.preventDefault();var b=n._getMiddle(d=a.touches),c=n._getDistance(d)-h;n.zoom(c*(p.increment/100)+i,{focal:b,matrix:r,animate:!1}),n.pan(+r[4]+b.clientX-j.clientX,+r[5]+b.clientY-j.clientY,v),j=b}):(k=a.pageX,m=a.pageY,e=function(a){a.preventDefault(),n.pan(t+a.pageX-k,u+a.pageY-m,v)}),b(l).off(q).on(f,e).on(g,function(a){a.preventDefault(),b(this).off(q),n.panning=!1,a.type="panzoomend",n._trigger(a,r,!c(r,s))})}},b.Panzoom=g,b.fn.panzoom=function(a){var c,d,e,f;
// Call methods widget-style
// Call methods widget-style
return"string"==typeof a?(f=[],d=n.call(arguments,1),this.each(function(){c=b.data(this,m),c?"_"!==a.charAt(0)&&"function"==typeof(e=c[a])&&void 0!==(e=e.apply(c,d))&&f.push(e):f.push(void 0)}),f.length?1===f.length?f[0]:f:this):this.each(function(){new g(this,a)})},g});