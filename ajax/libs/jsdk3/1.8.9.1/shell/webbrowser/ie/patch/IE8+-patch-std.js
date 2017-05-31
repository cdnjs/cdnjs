/**
 * @version: V0.2
 * @author: liu denggao
 * @created: 2011.5.25
 * @modified: 2011.5.25
 * @homepage: http://www.wunmei.com.cn
 **************************************/

(function(){
if(typeof(Element)=="undefined") return;
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

})();