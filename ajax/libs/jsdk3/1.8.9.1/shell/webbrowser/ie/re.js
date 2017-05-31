/**
 * for IE
 * @created: 2011.9.28
 */
function(Engine,Browser,window,rootHome){
	_jsre._ce.addNamespace("global",{STR_NewLine:"\r\n"},true);
	if(Browser.Engine.version>=4&&window.constructor){
		_jsre.globalEval(_jsre.getFileData(rootHome+"/patch/IE8+-patch-std.js"));
		js.dom.DOMWindow.applyInstance(window,"copy",true);
		js.dom.HTMLDocument.applyInstance(window.document,"copy",true);
	}else{
		js.dom.DOMWindow.applyInstance(window,"instance",true);
		js.dom.HTMLDocument.applyInstance(window.document,"instance",true);
	}
}