/**
 * @created: 2011.9.28
 * @modified: 2012.5.30
 */
function(Engine,Browser,window,rootHome){
	_jsre._ce.addNamespace("global",{STR_NewLine:"\n"},true);
	_jsre.globalEval(rootHome+"/patch/patch-IE.js"));
	js.dom.DOMWindow.applyInstance(window,"copy",true);
	js.dom.HTMLDocument.applyInstance(window.document,"copy",true);
}