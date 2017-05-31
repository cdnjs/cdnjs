/**
 * @since: JSDK3 V1.7.1
 * @created: 2011.9.28
 * @modified: 2012.7.19
 */
function(Engine,Global,rootHome){
	_jsre.loadClassLib("dom");
	$import("js.detect.shell.Browser");
	$import("js.dom.DOMWindow");
	$import("js.dom.DOMElement");
	$import("js.dom.HTML");
	$import("js.dom.HTMLElement");
	$import("js.dom.HTMLDocument");
	var window=_jsre._engine._external;
	var _browserDir=rootHome+"/";
	switch(Global.Browser.Engine.name){
		case "trident":
			_browserDir+="ie";
			break;
		case "gecko":
			_browserDir+="firefox";
			break;
		case "webkit":
			if(Global.Browser.Platform.name=="ios"){
				_browserDir+="safari(ipad)";
			}else{
				_browserDir+="(webkit)";
			}
			break;
		case "presto":
			_browserDir+="opera";
			break;
	}
	try{
		eval("with(Global) {("+_jsre.getFileData(_browserDir+"/re.js")+")(_jsre._engine,Global.Browser,window,_browserDir);}");
	}catch(ex){
		_jsre.logger.log("JSDK Initialize "+Global.Browser.Engine.name+" engine browser environment fail.\nSource: "+ex.message||ex);	
	}
}