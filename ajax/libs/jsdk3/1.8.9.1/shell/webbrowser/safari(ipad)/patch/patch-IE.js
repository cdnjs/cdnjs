/**
 * @version: V1.3.1
 * @author: liu denggao
 * @created: 2011.5.24
 * @modified: 2011.9.19
 * @homepage: http://www.wunmei.com.cn
 **************************************/


// CSSStyleDeclaration
// -------------------
// support microsoft's styleFloat
Object.defineProperty(CSSStyleDeclaration.prototype,"styleFloat",{
	get: function() {
		return this.cssFloat;
	},
	set: function($value) {
		this.cssFloat = $value;
	}
});
// mimic microsoft's pixel representations of left/top/width/height
// the getters only work for values that are already pixels
Object.defineProperty(CSSStyleDeclaration.prototype,"pixelLeft", {
	get: function() {
		return parseInt(this.left) || 0;
	},
	set: function($value) {
		this.left = $value + "px";
	}
});
Object.defineProperty(CSSStyleDeclaration.prototype,"pixelHeight", {
	get: function() {
		return parseInt(this.height) || 0;
	},
	set: function($value) {
		this.height = $value + "px";
	}
});
Object.defineProperty(CSSStyleDeclaration.prototype,"pixelTop", {
	get: function() {
		return parseInt(this.top) || 0;
	},
	set: function($value) {
		this.top = $value + "px";
	}
});
Object.defineProperty(CSSStyleDeclaration.prototype,"pixelWidth", {
	get: function() {
		return parseInt(this.width) || 0;
	},
	set: function($value) {
		this.width = $value + "px";
	}
});

// Window
//-------------
// added 2010.1.11
if(!window.constructor){
	//none---
}else if(window.constructor==Object){
	window.attachEvent = function($name, $handler) {
		this.addEventListener($name.replace(/^on/,""), $handler, false);
	};
}else{
	window.constructor.prototype.attachEvent = function($name, $handler) {
		this.addEventListener($name.replace(/^on/,""), $handler, false);
	};
	//added 2011.6.7
	/* Only on Firefox
	Object.defineProperty(window.constructor.prototype,"event", {
		get: function(){ 
			var o = arguments.callee.caller; 
			var e; 
			try{
				while(o != null){
					e = o.arguments[0]; 
					if(e && (e.constructor == Event || e.constructor == MouseEvent)) return e; 
					o = o.caller; 
				} 
			}catch(e){}
			return null; 
		}
	});	*/
	/**
	 * @created: 2011.6.10
	 * @modified: 2011.6.13
	 */
	if(!window.dialogArguments){
		window.constructor.prototype.__defineGetter__("dialogArguments", function(){ 
			if(this.opener&&this.opener.__$activeDialog==this){
				return this.opener.__$activeDialogParameter.arguments;
			}
		});	
	}
}
// HTMLDocument
// ------------
// support microsoft's "all" property
Object.defineProperty(HTMLDocument.prototype,"all", {
	get: function() {
		return this.getElementsByTagName("*");
	}
});
// support microsoft's "frames" property
Object.defineProperty(HTMLDocument.prototype,"frames", {
	get: function() {
		return window.frames;
	}
});
// support microsoft's "activeElement" property
Object.defineProperty(HTMLDocument.prototype,"$activeElement", {
	get: function() {
		return event.target==this?null:event.target;
	}
});
// mimic the "createEventObject" method for the document object
HTMLDocument.prototype.createEventObject = function() {
	return this.createEvent("Events");
};

// HTMLElement
// -----------
// mimic microsoft's "all" property
Object.defineProperty(HTMLElement.prototype,"all", {
	get: function() {
		return this.getElementsByTagName("*");
	}
});
// support "parentElement"
Object.defineProperty(HTMLElement.prototype,"parentElement", {
	get: function() {
		return (this.parentNode == this.ownerDocument) ? null : this.parentNode;
	}
});
// support "uniqueID"
Object.defineProperty(HTMLElement.prototype,"uniqueID", {
	get: function() {
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
	}
});
// mimic microsoft's "currentStyle"
Object.defineProperty(HTMLElement.prototype,"currentStyle", {
	get: function() {
		return getComputedStyle(this, null);
	}
});
// mimic microsoft's "runtimeStyle"
Object.defineProperty(HTMLElement.prototype,"runtimeStyle", {
	get: function() {
		//# this doesn't work yet (https://bugzilla.mozilla.org/show_bug.cgi?id=45424)
		//# return this.ownerDocument.defaultView.getOverrideStyle(this, null);
		return this.style;
	}
});
//added 2010.1.11
Object.defineProperty(HTMLElement.prototype,"canHaveChildren",{
	get: function(){
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
	}
});
//added 2010.1.11
Object.defineProperty(HTMLElement.prototype,"outerHTML",{
	get: function(){
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
	},
	set: function(sHTML){
		var r=this.ownerDocument.createRange();
		r.setStartBefore(this);
		var df=r.createContextualFragment(sHTML);
		this.parentNode.replaceChild(df,this);
		return sHTML;
	}
});
//added 2010.1.11
Object.defineProperty(HTMLElement.prototype,"outerText",{
	get: function(){
		var r=this.ownerDocument.createRange();
		r.selectNodeContents(this);
		return r.toString();
	},
	set: function(sText){
		var parsedText=document.createTextNode(sText);
		this.outerHTML=parsedText;
		return parsedText;
	}
});
// support "innerText"
Object.defineProperty(HTMLElement.prototype,"innerText", {
	get: function() {
		return this.textContent;
	},
	set: function($value) {
		this.textContent = $value;
	}
});
// added 2011.5.24
Object.defineProperty(HTMLElement.prototype,"$firstChild",{
	get: function(){
		var childNodes=this.childNodes;
		for(var i=0,len=childNodes.length;i<len;i++){
			if(childNodes[i].nodeName=="#text") continue;
			return childNodes[i];
		}
	}
});

// added 2010.1.15
Object.defineProperty(HTMLElement.prototype,"$nextSibling",{
	get: function(){
		var el;
		if(!this.nextSibling){
			return null;
		}else if(this.nextSibling.nodeType==3) {
			el=this.nextSibling.nextSibling; // Moz. Opera
		}else {
			el=this.nextSibling; // IE
		}
		return el;
	}
});
// added 2010.1.15
Object.defineProperty(HTMLElement.prototype,"$previousSibling",{
	get: function(){
		var el;
		if(!this.previousSibling){
			return null;
		}else if(this.previousSibling.nodeType==3) {
			el=this.previousSibling.previousSibling; // Moz. Opera
		}else {
			el=this.previousSibling; // IE
		}
		return el;
	}
});
// added 2010.1.15
Object.defineProperty(HTMLElement.prototype,"$lastChild",{
	get: function(){
		var childNodes=this.childNodes;
		for(var i=childNodes.length-1;i>=0;i--){
			if(childNodes[i].nodeName=="#text") continue;
			return childNodes[i];
		}
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
Object.defineProperty(Event.prototype,"srcElement", {
	get: function() {
		return (this.target.nodeType == Node.ELEMENT_NODE) ? this.target : this.target.parentNode;
	}
});
Object.defineProperty(Event.prototype,"fromElement",{
	get: function() {
		return (this.type == "mouseover") ? this.relatedTarget : (this.type == "mouseout") ? this.srcElement : null;
	}
});
Object.defineProperty(Event.prototype,"toElement", {
	get: function() {
		return (this.type == "mouseout") ? this.relatedTarget : (this.type == "mouseover") ? this.srcElement : null;
	}
});
// convert w3c button id's to microsoft's
Object.defineProperty(Event.prototype,"button", {
	get: function() {
		return (this.which == 1) ? 1 : (this.which == 2) ? 4 : 2;
	}
});
// mimic "returnValue" (default is "true")
Object.defineProperty(Event.prototype,"returnValue", {
	get: function() {
		return true;
	},
	set: function($value) {
		if (this.cancelable && !$value) {
			// this can't be undone!
			this.preventDefault();
			this.__defineGetter__("returnValue", function() {
				return false;
			});
		}
	}
});
// mozilla already supports the read-only "cancelBubble"
//  so we only need to define the setter
Object.defineProperty(Event.prototype,"cancelBubble", {
	set: function($value) {
		// this can't be undone!
		if ($value) this.stopPropagation();
	}
});
Object.defineProperty(Event.prototype,"offsetX", {
	get: function() {
		return this.layerX;
	}
});
Object.defineProperty(Event.prototype,"offsetY", {
	get: function() {
		return this.layerY;
	}
});

//XMLDocument
Object.defineProperty(XMLDocument.prototype,"xml",{
	get: function(){
		try {
			return new XMLSerializer().serializeToString( this );
		} catch (ex){
			var d = document.createElement("div");
			d.appendChild(this.cloneNode(true));
			return d.innerHTML;
		}
	}
});
Object.defineProperty(XMLDocument.prototype,"text",{
	get: function(){
		return this.firstChild.textContent.replace(/^[\s\r\n]*/g, '').replace(/[\s\r\n]*$/g, '');
	}
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
Object.defineProperty(XMLDocument.prototype,"$childNodes",{
	get: function(){
		var retValues=[];
		var childNodes=this.childNodes;
		for(var i=0,iLen=childNodes.length;i<iLen;i++){
			if(childNodes[i].nodeName=="#text") continue;
			retValues[retValues.length]=childNodes[i];
		}
		return retValues;
	}
});
Object.defineProperty(XMLDocument.prototype,"$firstChild",{
	get: function(){
		var childNodes=this.childNodes;
		for(var i=0,len=childNodes.length;i<len;i++){
			if(childNodes[i].nodeName=="#text") continue;
			return childNodes[i];
		}
	}
});
Object.defineProperty(XMLDocument.prototype,"$nextSibling",{
	get: function(){
		var el;
		if(!this.nextSibling){
			return null;
		}else if(this.nextSibling.nodeType==3) {
			el=this.nextSibling.nextSibling; // Moz. Opera
		}else {
			el=this.nextSibling; // IE
		}
		return el;
	}
});
Object.defineProperty(XMLDocument.prototype,"$previousSibling",{
	get: function(){
		var el;
		if(!this.previousSibling){
			return null;
		}else if(this.previousSibling.nodeType==3) {
			el=this.previousSibling.previousSibling; // Moz. Opera
		}else {
			el=this.previousSibling; // IE
		}
		return el;
	}
});
Object.defineProperty(XMLDocument.prototype,"$lastChild",{
	get: function(){
		var childNodes=this.childNodes;
		for(var i=childNodes.length-1;i>=0;i--){
			if(childNodes[i].nodeName=="#text") continue;
			return childNodes[i];
		}
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
Object.defineProperty(Element.prototype,"xml",{
	get: function(){
		try {
			return new XMLSerializer().serializeToString( this );
		} catch(ex){
			var d = document.createElement("div");
			d.appendChild(this.cloneNode(true));
			return d.innerHTML;
		}
	}
});
Object.defineProperty(Element.prototype,"text",{
	get: function(){
		return this.textContent.replace(/^[\s\r\n]*/g, '').replace(/[\s\r\n]*$/g, '');
	}
}); 
Element.prototype.selectSingleNode = XMLDocument.prototype.selectSingleNode;
Element.prototype.selectNodes = XMLDocument.prototype.selectNodes;
Object.defineProperty(Element.prototype,"$childNodes",{
	get: function(){
		var retValues=[];
		var childNodes=this.childNodes;
		for(var i=0,iLen=childNodes.length;i<iLen;i++){
			if(childNodes[i].nodeName=="#text") continue;
			retValues[retValues.length]=childNodes[i];
		}
		return retValues;
	}
});
Object.defineProperty(Element.prototype,"$firstChild",{
	get: function(){
		var childNodes=this.childNodes;
		for(var i=0,len=childNodes.length;i<len;i++){
			if(childNodes[i].nodeName=="#text") continue;
			return childNodes[i];
		}
	}
});
Object.defineProperty(Element.prototype,"$nextSibling",{
	get: function(){
		var el;
		if(!this.nextSibling){
			return null;
		}else if(this.nextSibling.nodeType==3) {
			el=this.nextSibling.nextSibling; // Moz. Opera
		}else {
			el=this.nextSibling; // IE
		}
		return el;
	}
});
Object.defineProperty(Element.prototype,"$previousSibling",{
	get: function(){
		var el;
		if(!this.previousSibling){
			return null;
		}else if(this.previousSibling.nodeType==3) {
			el=this.previousSibling.previousSibling; // Moz. Opera
		}else {
			el=this.previousSibling; // IE
		}
		return el;
	}
});
Object.defineProperty(Element.prototype,"$lastChild",{
	get: function(){
		var childNodes=this.childNodes;
		for(var i=childNodes.length-1;i>=0;i--){
			if(childNodes[i].nodeName=="#text") continue;
			return childNodes[i];
		}
	}
});