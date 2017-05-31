/**
 * @version: V1.5.2
 * @support: Firefox 3.6+
 * @author: liu denggao
 * @created: 2010.1.10
 * @modified: 2011.9.19-2013.3.14
 * @homepage: http://www.tringsoft.com
 **************************************/


// CSSStyleDeclaration
// -------------------
// support microsoft's styleFloat
CSSStyleDeclaration.prototype.__defineGetter__("styleFloat", function() {
	return this.cssFloat;
});
CSSStyleDeclaration.prototype.__defineSetter__("styleFloat", function($value) {
	this.cssFloat = $value;
});
// mimic microsoft's pixel representations of left/top/width/height
// the getters only work for values that are already pixels
CSSStyleDeclaration.prototype.__defineGetter__("pixelLeft", function() {
	return parseInt(this.left) || 0;
});
CSSStyleDeclaration.prototype.__defineSetter__("pixelLeft", function($value) {
	this.left = $value + "px";
});
CSSStyleDeclaration.prototype.__defineGetter__("pixelHeight", function() {
	return parseInt(this.height) || 0;
});
CSSStyleDeclaration.prototype.__defineSetter__("pixelHeight", function($value) {
	this.height = $value + "px";
});
CSSStyleDeclaration.prototype.__defineGetter__("pixelTop", function() {
	return parseInt(this.top) || 0;
});
CSSStyleDeclaration.prototype.__defineSetter__("pixelTop", function($value) {
	this.top = $value + "px";
});
CSSStyleDeclaration.prototype.__defineGetter__("pixelWidth", function() {
	return parseInt(this.width) || 0;
});
CSSStyleDeclaration.prototype.__defineSetter__("pixelWidth", function($value) {
	this.width = $value + "px";
});

// Window
/**
 * @created: 2010.1.11
 * @modified: 2011.6.10
 */
window.constructor.prototype.attachEvent = function($name, $handler) {
	this.addEventListener($name.replace(/^on/,""), $handler, false);
};
/**
 * @created: 2010.1.21
 * @modified: 2011.6.10-2013.3.14
 */
window.constructor.prototype.__defineGetter__("event", function(){ 
	var o = arguments.callee.caller; 
	var e,last,i=10; 
	try{
		while(o != null && o != last && i>0){
			last=o;i--;
			e = o.arguments[0];
			if(e && (e instanceof Event)) return e; 
			o = o.caller; 
		} 
	}catch(e){}
	return null; 
});
// HTMLDocument
// ------------
// support microsoft's "all" property
HTMLDocument.prototype.__defineGetter__("all", function() {
	return this.getElementsByTagName("*");
});
//@created: 2011.8.15
HTMLDocument.prototype.__defineGetter__("scripts", function() {
	return this.getElementsByTagName("SCRIPT");
});
// support microsoft's "frames" property
//@created: 2011.5.27
HTMLDocument.prototype.__defineGetter__("frames", function() {
	return window.frames;
});
HTMLDocument.prototype.__defineGetter__("activeElement", function() {
	return window.event.explicitOriginalTarget;
});
HTMLDocument.prototype.__defineGetter__("$activeElement", function() {
	return window.event.explicitOriginalTarget;
});
// mimic the "createEventObject" method for the document object
HTMLDocument.prototype.createEventObject = function() {
	return document.createEvent("Events");
};

// HTMLElement
// -----------
// mimic microsoft's "all" property
HTMLElement.prototype.__defineGetter__("all", function() {
	return this.getElementsByTagName("*");
});
// support "parentElement"
HTMLElement.prototype.__defineGetter__("parentElement", function() {
	return (this.parentNode == this.ownerDocument) ? null : this.parentNode;
});
// support "uniqueID"
HTMLElement.prototype.__defineGetter__("uniqueID", function() {
	// a global counter is stored privately as a property of this getter function.
	// initialise the counter
	if (!arguments.callee.count) arguments.callee.count = 0;
	// create the id and increment the counter
	var $uniqueID = "moz_id" + arguments.callee.count++;
	// creating a unique id, creates a global reference
	window[$uniqueID] = this;
	// we don't want to increment next time, so redefine the getter
	this.__defineGetter__("uniqueID", function(){return $uniqueID});
	return $uniqueID;
});
// mimic microsoft's "currentStyle"
HTMLElement.prototype.__defineGetter__("currentStyle", function() {
	return getComputedStyle(this, null);
});
// mimic microsoft's "runtimeStyle"
HTMLElement.prototype.__defineGetter__("runtimeStyle", function() {
//# this doesn't work yet (https://bugzilla.mozilla.org/show_bug.cgi?id=45424)
//# return this.ownerDocument.defaultView.getOverrideStyle(this, null);
	return this.style;
});
//added 2010.1.11
HTMLElement.prototype.__defineGetter__("canHaveChildren",function(){
	switch(this.tagName.toLowerCase()){
		case "area":
		case "base":
		case "basefont":
		case "col":
		case "frame":
		case "hr":
		case "img":
		case "br":
		case "input":
		case "isindex":
		case "link":
		case "meta":
		case "param":
			return false;
	}
	return true;
});
//added 2010.1.11
HTMLElement.prototype.__defineGetter__("outerHTML",function(){
	var attr;
	var attrs=this.attributes;
	var str="<"+this.tagName;
	for(var i=0;i<attrs.length;i++){
		attr=attrs[i];
		if(attr.specified)
			str+=" "+attr.name+'="'+attr.value+'"';
	}
	if(!this.canHaveChildren)
		return str+">";
	return str+">"+this.innerHTML+"</"+this.tagName+">";
});
//added 2010.1.11
HTMLElement.prototype.__defineSetter__("outerHTML",function(sHTML){
	var r=this.ownerDocument.createRange();
	r.setStartBefore(this);
	var df=r.createContextualFragment(sHTML);
	this.parentNode.replaceChild(df,this);
	return sHTML;
});
//added 2010.1.11
HTMLElement.prototype.__defineGetter__("outerText",function(){
	var r=this.ownerDocument.createRange();
	r.selectNodeContents(this);
	return r.toString();
});
//added 2010.1.11
HTMLElement.prototype.__defineSetter__("outerText",function(sText){
	var parsedText=document.createTextNode(sText);
	this.outerHTML=parsedText;
	return parsedText;
});
// support "innerText"
HTMLElement.prototype.__defineGetter__("innerText", function() {
	return this.textContent;
});
HTMLElement.prototype.__defineSetter__("innerText", function($value) {
	this.textContent = $value;
});
//@created: 2011.8.15
HTMLElement.prototype.insertAdjacentElement = function(where,parsedNode){
	switch (where){
		case 'beforeBegin':
			return this.parentNode.insertBefore(parsedNode,this);
			break;
		case 'afterBegin':
			return this.insertBefore(parsedNode,this.firstChild);
			break;
		case 'beforeEnd':
			return this.appendChild(parsedNode);
			break;
		case 'afterEnd':
			if (this.nextSibling) return this.parentNode.insertBefore(parsedNode,this.nextSibling);
			else return this.parentNode.appendChild(parsedNode);
			break;
	}
}
//@created: 2011.8.15
HTMLElement.prototype.insertAdjacentHTML = function (where,htmlStr){
	var r = this.ownerDocument.createRange();
	r.setStartBefore(this);
	var parsedHTML = r.createContextualFragment(htmlStr);
	this.insertAdjacentElement(where,parsedHTML);
}
//@created: 2011.8.15
HTMLElement.prototype.insertAdjacentText = function (where,txtStr){
	var parsedText = document.createTextNode(txtStr)
	this.insertAdjacentElement(where,parsedText)
}
// added 2010.1.14
HTMLElement.prototype.__defineGetter__("$firstChild",function(){
	var childNodes=this.childNodes;
	for(var i=0,len=childNodes.length;i<len;i++){
		if(childNodes[i].nodeName=="#text") continue;
		return childNodes[i];
	}
});
// added 2010.1.15
HTMLElement.prototype.__defineGetter__("$nextSibling",function(){
	var el;
	if(!this.nextSibling){
		return null;
	}else if(this.nextSibling.nodeType==3) {
		el=this.nextSibling.nextSibling; // Moz. Opera
	}else {
		el=this.nextSibling; // IE
	}
	return el;
});
// added 2010.1.15
HTMLElement.prototype.__defineGetter__("$previousSibling",function(){
	var el;
	if(!this.previousSibling){
		return null;
	}else if(this.previousSibling.nodeType==3) {
		el=this.previousSibling.previousSibling; // Moz. Opera
	}else {
		el=this.previousSibling; // IE
	}
	return el;
});
// added 2010.1.15
HTMLElement.prototype.__defineGetter__("$lastChild",function(){
	var childNodes=this.childNodes;
	for(var i=childNodes.length-1;i>=0;i--){
		if(childNodes[i].nodeName=="#text") continue;
		return childNodes[i];
	}
});
// mimic the "attachEvent" method
// modified 2010.1.11
HTMLElement.prototype.attachEvent = function($name, $handler) {
	this.addEventListener($name.replace(/^on/,""), $handler, false);
};
// mimic the "removeEvent" method
HTMLElement.prototype.removeEvent = function($name, $handler) {
	this.removeEventListener($name.replace(/^on/,""), $handler, false);
};
// mimic the "createEventObject" method
HTMLElement.prototype.createEventObject = function() {
	return this.ownerDocument.createEventObject();
};
/**
 * mimic the "fireEvent" method
 * @date: 2010.1.22-2010.1.23
 */
HTMLElement.prototype.fireEvent = function($name, $event) {
	if(!$event) $event = this.ownerDocument.createEvent("Events");
	var evt=null;
	if($event.constructor==Event){
		evt = this.ownerDocument.createEvent("Events");
		evt.initEvent($name.replace(/^on/,""), $event.bubbles, $event.cancelable);
	}else if($event.constructor==MouseEvent){
		evt = this.ownerDocument.createEvent("MouseEvents");
		evt.initMouseEvent(
			$name.replace(/^on/,""), 
			$event.bubbles, 
			$event.cancelable,
			$event.view,
			$event.detail,
			$event.screenX,
			$event.screenY, 
			$event.clientX, 
			$event.clientY, 
			$event.ctrlKey,
			$event.altKey,
			$event.shiftKey,
			$event.metaKey,
			$event.button,
			$event.relatedTarget
		);
	}else if($event.constructor==UIEvent){
		evt = this.ownerDocument.createEvent("UIEvents");
		evt.initUIEvent($name.replace(/^on/,""), $event.bubbles,$event.view,$event.detail);
	}else{
		return;
	}
	this.dispatchEvent(evt);
	// not sure that this should be here??
	//if (typeof this[$name] == "function") this[$name]();
	//else if (this.getAttribute($name)) eval(this.getAttribute($name));
};
// support the "contains" method
HTMLElement.prototype.contains = function($element) {
	return Boolean($element == this || ($element && this.contains($element.parentElement)));
};
/**
 * @created: 2011.6.9
 */
(function(){
	if(HTMLElement.prototype.click){ return; }
	HTMLElement.prototype.click = function() {
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		this.dispatchEvent(evt);
	};
})();

// Event
// -----
// support microsoft's proprietary event properties
Event.prototype.__defineGetter__("srcElement", function() {
	return (this.target.nodeType == Node.ELEMENT_NODE) ? this.target : this.target.parentNode;
});
Event.prototype.__defineGetter__("fromElement",function() {
	return (this.type == "mouseover") ? this.relatedTarget : (this.type == "mouseout") ? this.srcElement : null;
});
Event.prototype.__defineGetter__("toElement", function() {
	return (this.type == "mouseout") ? this.relatedTarget : (this.type == "mouseover") ? this.srcElement : null;
});
// convert w3c button id's to microsoft's
Event.prototype.__defineGetter__("button", function() {
	return (this.which == 1) ? 1 : (this.which == 2) ? 4 : 2;
});
// mimic "returnValue" (default is "true")
Event.prototype.__defineGetter__("returnValue", function() {
	return true;
});
Event.prototype.__defineSetter__("returnValue", function($value) {
	if (this.cancelable && !$value) {
		// this can't be undone!
		this.preventDefault();
		this.__defineGetter__("returnValue", function() {
			return false;
		});
	}
});
// mozilla already supports the read-only "cancelBubble"
//  so we only need to define the setter
Event.prototype.__defineSetter__("cancelBubble", function($value) {
	// this can't be undone!
	if ($value) this.stopPropagation();
});
Event.prototype.__defineGetter__("offsetX", function() {
	return this.layerX;
});
Event.prototype.__defineGetter__("offsetY", function() {
	return this.layerY;
});

//XMLDocument
XMLDocument.prototype.__proto__.__defineGetter__("xml",function(){
	try {
		return new XMLSerializer().serializeToString( this );
	} catch (ex){
		var d = document.createElement("div");
		d.appendChild(this.cloneNode(true));
		return d.innerHTML;
	}
});
XMLDocument.prototype.__proto__.__defineGetter__("text",function(){
	return this.firstChild.textContent.replace(/^[\s\r\n]*/g, '').replace(/[\s\r\n]*$/g, '');
});
XMLDocument.prototype.selectSingleNode=function (xpath){
	var x = this.selectNodes(xpath)
	if (!x.length) return null ;
	return x[0];
}
XMLDocument.prototype.selectNodes = function (xpath){
	var xpe = new XPathEvaluator();
	var nsResolver = xpe.createNSResolver(this.ownerDocument==null? 
		this.documentElement:this.ownerDocument.documentElement);
	var result = xpe.evaluate(xpath, this , nsResolver, 0 , null );
	var found = [];
	var res;
	while (res = result.iterateNext()) found.push(res);
	return found;
}
XMLDocument.prototype.__proto__.__defineGetter__("$childNodes",function(){
	var retValues=[];
	var childNodes=this.childNodes;
	for(var i=0,iLen=childNodes.length;i<iLen;i++){
		if(childNodes[i].nodeName=="#text") continue;
		retValues[retValues.length]=childNodes[i];
	}
	return retValues;
});
XMLDocument.prototype.__proto__.__defineGetter__("$firstChild",function(){
	var childNodes=this.childNodes;
	for(var i=0,len=childNodes.length;i<len;i++){
		if(childNodes[i].nodeName=="#text") continue;
		return childNodes[i];
	}
});
XMLDocument.prototype.__proto__.__defineGetter__("$nextSibling",function(){
	var el;
	if(!this.nextSibling){
		return null;
	}else if(this.nextSibling.nodeType==3) {
		el=this.nextSibling.nextSibling; // Moz. Opera
	}else {
		el=this.nextSibling; // IE
	}
	return el;
});
XMLDocument.prototype.__proto__.__defineGetter__("$previousSibling",function(){
	var el;
	if(!this.previousSibling){
		return null;
	}else if(this.previousSibling.nodeType==3) {
		el=this.previousSibling.previousSibling; // Moz. Opera
	}else {
		el=this.previousSibling; // IE
	}
	return el;
});
XMLDocument.prototype.__proto__.__defineGetter__("$lastChild",function(){
	var childNodes=this.childNodes;
	for(var i=childNodes.length-1;i>=0;i--){
		if(childNodes[i].nodeName=="#text") continue;
		return childNodes[i];
	}
});
XMLDocument.prototype.loadXML = function(xmlString){
	var childNodes = this.childNodes;
	for (var i=childNodes.length-1;i>=0;i--)
		this.removeChild(childNodes[i]);

	var dp = new DOMParser();
	var newDOM = dp.parseFromString(xmlString, "text/xml");
	var newElt = this.importNode(newDOM.documentElement, true);
	this.appendChild(newElt);
};
Element.prototype.__proto__.__defineGetter__("xml",function(){
	try {
		return new XMLSerializer().serializeToString( this );
	} catch(ex){
		var d = document.createElement("div");
		d.appendChild(this.cloneNode(true));
		return d.innerHTML;
	}
});
Element.prototype.__proto__.__defineGetter__("text",function(){
	return this.textContent.replace(/^[\s\r\n]*/g, '').replace(/[\s\r\n]*$/g, '');
}); 
Element.prototype.selectSingleNode = XMLDocument.prototype.selectSingleNode;
Element.prototype.selectNodes = XMLDocument.prototype.selectNodes;
/**
 * @created: 2011.6.10
 * @modified: 2011.6.10
 */
Element.prototype.__proto__.__defineGetter__("$childNodes",function(){
	var retValues=[];
	var childNodes=this.childNodes;
	for(var i=0,iLen=childNodes.length;i<iLen;i++){
		if(childNodes[i].nodeName=="#text") continue;
		retValues[retValues.length]=childNodes[i];
	}
	return retValues;
});
Element.prototype.__proto__.__defineGetter__("$firstChild",function(){
	var childNodes=this.childNodes;
	for(var i=0,len=childNodes.length;i<len;i++){
		if(childNodes[i].nodeName=="#text") continue;
		return childNodes[i];
	}
});
Element.prototype.__proto__.__defineGetter__("$nextSibling",function(){
	var el;
	if(!this.nextSibling){
		return null;
	}else if(this.nextSibling.nodeType==3) {
		el=this.nextSibling.nextSibling; // Moz. Opera
	}else {
		el=this.nextSibling; // IE
	}
	return el;
});
Element.prototype.__proto__.__defineGetter__("$previousSibling",function(){
	var el;
	if(!this.previousSibling){
		return null;
	}else if(this.previousSibling.nodeType==3) {
		el=this.previousSibling.previousSibling; // Moz. Opera
	}else {
		el=this.previousSibling; // IE
	}
	return el;
});
Element.prototype.__proto__.__defineGetter__("$lastChild",function(){
	var childNodes=this.childNodes;
	for(var i=childNodes.length-1;i>=0;i--){
		if(childNodes[i].nodeName=="#text") continue;
		return childNodes[i];
	}
});