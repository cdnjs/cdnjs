/**
 * Define JSDK Framework Loader
 * @file: loader.js
 * @description: 
 * @version: V2.3.20130505
 * @product: JSDK3
 * @support: IE6+、Firefox3+、Chrome13+、Safari5+、Opera11+
 * @invoke: <script src="/jsdk3x/loader.js"
 *			 [cache="true"]
 *			 [debug="false"]  
 *			 [develop="false"]
 *			 [appName="JSDK"]
 *			 [appMode="auto|main|sub|alone"]
 *			 [domain="domain"]
 *			 [version="version"]
 *			 [locale="auto|(lang)|_byBrowser|_byUser|_bySystem"]
 *			 [environment="/service/environment.xml"]
 *			 [include="[mylib[.version]][;...]"]
 *		    ></script>
 * @author: liu denggao
 * @created: 2011.06.06
 * @modified: 2013.05.05
 * @mail: francklin.liu@gmail.com
 * @homepage: http://www.tringsoft.com
 * @opensource: http://francklin.github.com/JSDK
 * @copyright: Copyright (C) 2007-2013 Tringsoft Studio.
 ************************************************************/

(function(window,oEnviron){
try{
var document=window.document;
var jsdk=window["__JSDK_Namespace__"];
var loader=jsdk&&jsdk.Engine.getLoader()||arguments.callee;
if(jsdk){
	var jsre=jsdk.Engine.runtimeEnvironment;
	var environ=loader.getTagAttribs(["include","contentType"]);
	switch(environ.contentType){
		case "import":
			if(environ.include){
				environ.include=environ.include.split(";");
				for(var i=0,libs=environ.include||[];i<libs.length;i++){
					var values=libs[i].match(/([^\.]*)[\.]?([0-9\.]*)/);
					jsre.loadClassLib(values[1],values[2]);
				}
			}
			jsdk.Engine.pretreatEnvironment.eval(environ.text);
			break;
		case "script":
			jsdk.Engine.scriptEnvironment.eval(environ.text);
			break;
	}
}else{
	loader.name="JSDK3Loader";
	loader.version="2.3.20130505";
	loader.getXMLHttpRequest=function () {
		// Create XMLHttpRequest Object
		var progId, progIds = ["MSXML2.XMLHTTP.6.0"
			, "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
		return function () {
			if (typeof(ActiveXObject)=="undefined") {
				return new XMLHttpRequest();
			} else if (progId != null) {
				return new ActiveXObject(progId);
			} else {
				for (var i = 0; i < progIds.length; i++) {
					try	{
						return new ActiveXObject(progId = progIds[i]);
					} catch (ex) {
						progId = null;
					}
				}
			}
		};
	}();
	loader.getXMLDOMDocument=function () {
		var progId, progIds = ["MSXML2.DOMDocument.6.0"
			, "MSXML2.DOMDocument", "Microsoft.XMLDOM"];
		return function () {
			if (typeof(ActiveXObject)=="undefined") {
				return null;
			} else if (progId != null) {
				return new ActiveXObject(progId);
			} else {
				for (var i = 0; i < progIds.length; i++) {
					try	{
						return new ActiveXObject(progId = progIds[i]);
					} catch (ex) {
						progId = null;
					}
				}
			}
		};
	}();
	loader.getXMLDOMParser=function () {
		return function(){
			if (typeof(ActiveXObject)=="undefined") {
				return new DOMParser();
			} else {
				return null;
			}
		}
	}();
	loader.getFileData=function(sFilePath,isNoCache){
		try{
			isNoCache=isNoCache==undefined?false:isNoCache;
			loader._xmlHttp.open("GET", sFilePath, false);
			if(loader._xmlHttp.overrideMimeType) {
				loader._xmlHttp.overrideMimeType("text/plain"); 
			}
			if(isNoCache){
				loader._xmlHttp.setRequestHeader("Pragma","no-cache");
				loader._xmlHttp.setRequestHeader("If-Modified-Since","0");
			}
			loader._xmlHttp.send(null);
			if(loader._xmlHttp.readyState == 4) {		//data accept complete
				if(loader._xmlHttp.status == 200) {	//return request ok
					return loader._xmlHttp.responseText;
				}else if(loader._xmlHttp.status == 0
					&&!loader._xmlHttp.getAllResponseHeaders()){	//request local
					return loader._xmlHttp.responseText;
				}
			}
		}catch(ex){
			throw "Get file error!\nfile: \""+sFilePath+"\" \ndata: "+ex.message||ex;
		}
	}
	loader.getTagAttribs=function(incAttribs){
		var elScript, oAttribs={};
		for(var scripts=document.getElementsByTagName("SCRIPT"),i=scripts.length-1;i>=0;i--){
			if(scripts[i].src.search(/^.*[\\|\/]?(\.|\.\.|src|jsdk3|(jsdk3([\_|\\|\/][v]?[0-9\.]+)?[x]?))[\\|\/]loader\.js$/i)>=0) {
				elScript=scripts[i]; break;
			}
		}
		if(!elScript) return null;
		for(var i=0;i<incAttribs.length;i++){
			oAttribs[incAttribs[i]]=elScript.getAttribute(incAttribs[i]);
		}
		oAttribs.text=elScript.text;
		return oAttribs;
	}
	loader.compareVersion=function(ver1,ver2){
		if(ver1==ver2){
			return 0;
		}else if(!ver1){
			return 1;
		}else if(!ver2){
			return -1;
		}else{
			var values1=ver1.split(".");
			var values2=ver2.split(".");
			var len=Math.min(values1.length,values2.length);
			for(var i=0;i<len;i++){
				if(parseInt(values1[i],10)<parseInt(values2[i],10)){
					return -1;
				}else if(parseInt(values1[i],10)>parseInt(values2[i],10)){
					return 1;
				}else if(values1[i]=="x"){
					return 1;
				}else if(values2[i]=="x"){
					return -1;
				}
			}
			if(values1.slice(len).join("").replace(/0/,"")==values2.slice(len).join("").replace(/0/g,"")){
				return 0;
			}else{
				return values1.length<values2.length?-1:1;
			}
		}
	}

	if(oEnviron) loader.environ=oEnviron;
	if(!loader.loadedCode) loader.loadedCode="";
	if(!loader._xmlHttp) loader._xmlHttp=loader.getXMLHttpRequest();
	if(!loader.loadedCode){
		if(!loader.environ){
			var environ=loader.getTagAttribs(["appName","appMode","domain","develop","debug","cache","version","locale","environment","include","src"]);
			loader.environ={
				develop : (/^(true|1)$/i).test(environ.develop||"false"),
				debug : (/^(true|1)$/i).test(environ.debug||"false"),
				cache : (/^(true|1)$/i).test(environ.cache||"true"),
				appName : environ.appName,
				appMode : environ.appMode,
				domain: environ.domain,
				locale : environ.locale,
				version: environ.version,
				environment : environ.environment,
				include : environ.include?environ.include.split(";"):[],
				src : environ.src,
				text : environ.text
			};
		}else{
			if(loader.environ.debug==undefined) loader.environ.debug=false;
			if(loader.environ.cache==undefined) loader.environ.cache=true;
		}
		if(!loader.environ.version){
			var JSRE_Path=loader.environ.src=loader.environ.src.replace(/^(.*(?:\\|\/))([^(?:\\|\/)]+)$/g,"$1jsre.js");
		}else{ 
			var JSRE_Path=loader.environ.src=loader.environ.src.replace(/^(.*(?:\\|\/))([^(?:\\|\/)]+)$/g,"$1history/jsdk3_v"+loader.environ.version+"/jsre.js");
		}
		switch(loader.environ.appMode){
			case "main":
				loader.loadedCode=loader.getFileData(JSRE_Path,!loader.environ.cache);
				break;
			case "sub": 
				if(this.parent&&this.parent!=this){
					loader.loadedCode=this.parent.__JSDK_Namespace__.Engine.getLoader().loadedCode;
					break;
				}else if(this.opener&&this.opener!=this){
					loader.loadedCode=this.opener.__JSDK_Namespace__.Engine.getLoader().loadedCode;
					break;
				}
				break;
			default:
				loader.loadedCode=loader.getFileData(JSRE_Path,!loader.environ.cache);
		}
	}
	loader.environ.location=window.location;
	loader.environ.appFilePath=window.location.pathname;
	if(!loader.environ.version){
		loader.engine=new (eval("''||"+loader.loadedCode))(
			this,(this.parent&&this.parent!=this)?this.parent:(this.opener&&this.opener!=this?this.opener:null),loader.environ);
	}else if(loader.compareVersion(loader.environ.version,"1.8.5")<0){
		loader.engine=new (new Function("oHost","oParentHost","oEnviron",loader.loadedCode))(
			this,(this.parent&&this.parent!=this)?this.parent:(this.opener&&this.opener!=this?this.opener:null),loader.environ);
	}
}
}catch(e){
if(!loader.environ||loader.environ.debug) alert(e.description);
}
})(window);

