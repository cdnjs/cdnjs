/**
 * for Opera
 * @created: 2011.9.28
 */
function(Engine,Browser,window,rootHome){
	_jsre._ce.addNamespace("global",{STR_NewLine:"\r\n"},true);
	_jsre.globalEval(_jsre.getFileData(rootHome+"/patch/patch-IE.js"));
	js.dom.DOMWindow.applyInstance(window,"copy",true);
	js.dom.HTMLDocument.applyInstance(window.document,"copy",true);
}