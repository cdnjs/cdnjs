!function(a,b){"function"==typeof define&&define.amd?// AMD. Register as an anonymous module unless amdModuleId is set
define([],function(){return a.svg4everybody=b()}):"object"==typeof exports?module.exports=b():a.svg4everybody=b()}(this,function(){/*! svg4everybody v2.0.3 | github.com/jonathantneal/svg4everybody */
function a(a,b){
// if the target exists
if(b){
// create a document fragment to hold the contents of the target
var c=document.createDocumentFragment(),d=!a.getAttribute("viewBox")&&b.getAttribute("viewBox");
// conditionally set the viewBox on the svg
d&&a.setAttribute("viewBox",d);
// copy the contents of the clone into the fragment
for(// clone the target
var e=b.cloneNode(!0);e.childNodes.length;)c.appendChild(e.firstChild);
// append the fragment into the svg
a.appendChild(c)}}function b(b){
// listen to changes in the request
b.onreadystatechange=function(){
// if the request is ready
if(4===b.readyState){
// get the cached html document
var c=b._cachedDocument;
// ensure the cached html document based on the xhr response
c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),// clear the xhr embeds list and embed each item
b._embeds.splice(0).map(function(d){
// get the cached target
var e=b._cachedTarget[d.id];
// ensure the cached target
e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),
// embed the target into the svg
a(d.svg,e)})}},// test the ready state change immediately
b.onreadystatechange()}function c(c){function d(){
// while the index exists in the live <use> collection
for(// get the cached <use> index
var c=0;c<o.length;){
// get the current <use>
var i=o[c],j=i.parentNode;if(j&&/svg/i.test(j.nodeName)){var k=i.getAttribute("xlink:href");
// if running with legacy support
if(e){
// create a new fallback image
var l=document.createElement("img");
// force display in older IE
l.style.cssText="display:inline-block;height:100%;width:100%",// set the fallback size using the svg size
l.setAttribute("width",j.getAttribute("width")||j.clientWidth),l.setAttribute("height",j.getAttribute("height")||j.clientHeight),
// set the fallback src
l.src=f(k,j,i),// replace the <use> with the fallback image
j.replaceChild(l,i)}else if(h&&(!g.validate||g.validate(k,j,i))){
// remove the <use> element
j.removeChild(i);
// parse the src and get the url and id
var p=k.split("#"),q=p.shift(),r=p.join("#");
// if the link is external
if(q.length){
// get the cached xhr request
var s=m[q];
// ensure the xhr request exists
s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),// add the svg and id as an item to the xhr embeds list
s._embeds.push({svg:j,id:r}),// prepare the xhr ready state change event
b(s)}else
// embed the local id into the svg
a(j,document.getElementById(r))}}else
// increase the index when the previous value was not "valid"
++c}
// continue the interval
n(d,67)}var e,f,g=Object(c);f=g.fallback||function(a){return a.replace(/\?[^#]+/,"").replace("#",".").replace(/^\./,"")+".png"+(/\?[^#]+/.exec(a)||[""])[0]},e="nosvg"in g?g.nosvg:/\bMSIE [1-8]\b/.test(navigator.userAgent),e&&(document.createElement("svg"),document.createElement("use"));
// set whether the polyfill will be activated or not
var h,i=/\bMSIE [1-8]\.0\b/,j=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,k=/\bAppleWebKit\/(\d+)\b/,l=/\bEdge\/12\.(\d+)\b/;h="polyfill"in g?g.polyfill:i.test(navigator.userAgent)||j.test(navigator.userAgent)||(navigator.userAgent.match(l)||[])[1]<10547||(navigator.userAgent.match(k)||[])[1]<537;
// create xhr requests object
var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use");
// conditionally start the interval if the polyfill is active
h&&d()}return c});