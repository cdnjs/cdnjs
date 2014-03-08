(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{a(jQuery)
}}(function(b){b(window).bind("unload.atmosphere",function(){b.atmosphere.unsubscribe()
});
b(window).bind("offline",function(){b.atmosphere.unsubscribe()
});
b(window).keypress(function(c){if(c.keyCode===27){c.preventDefault()
}});
var a=function(d){var c,f=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,e={};
while(c=f.exec(d)){e[c[1]]=c[2]
}return e
};
b.atmosphere={version:"2.1.5-jquery",uuid:0,requests:[],callbacks:[],onError:function(c){},onClose:function(c){},onOpen:function(c){},onMessage:function(c){},onReconnect:function(d,c){},onMessagePublished:function(c){},onTransportFailure:function(d,c){},onLocalMessage:function(c){},onClientTimeout:function(c){},onFailureToReconnect:function(d,c){},AtmosphereRequest:function(H){var J={timeout:300000,method:"GET",headers:{},contentType:"",callback:null,url:"",data:"",suspend:true,maxRequest:-1,reconnect:true,maxStreamingLength:10000000,lastIndex:0,logLevel:"info",requestCount:0,fallbackMethod:"GET",fallbackTransport:"streaming",transport:"long-polling",webSocketImpl:null,webSocketBinaryType:null,dispatchUrl:null,webSocketPathDelimiter:"@@",enableXDR:false,rewriteURL:false,attachHeadersAsQueryString:true,executeCallbackBeforeReconnect:false,readyState:0,lastTimestamp:0,withCredentials:false,trackMessageLength:false,messageDelimiter:"|",connectTimeout:-1,reconnectInterval:0,dropHeaders:true,uuid:0,shared:false,readResponsesHeaders:false,maxReconnectOnClose:5,enableProtocol:true,pollingInterval:0,onError:function(aw){},onClose:function(aw){},onOpen:function(aw){},onMessage:function(aw){},onReopen:function(ax,aw){},onReconnect:function(ax,aw){},onMessagePublished:function(aw){},onTransportFailure:function(ax,aw){},onLocalMessage:function(aw){},onFailureToReconnect:function(ax,aw){},onClientTimeout:function(aw){}};
var R={status:200,reasonPhrase:"OK",responseBody:"",messages:[],headers:[],state:"messageReceived",transport:"polling",error:null,request:null,partialMessage:"",errorHandled:false,closedByClientTimeout:false};
var U=null;
var j=null;
var q=null;
var z=null;
var B=null;
var af=true;
var g=0;
var ar=false;
var V=null;
var am;
var l=null;
var E=b.now();
var F;
var av;
au(H);
function an(){af=true;
ar=false;
g=0;
U=null;
j=null;
q=null;
z=null
}function v(){ah();
an()
}function au(aw){v();
J=b.extend(J,aw);
J.mrequest=J.reconnect;
if(!J.reconnect){J.reconnect=true
}}function k(){return J.webSocketImpl!=null||window.WebSocket||window.MozWebSocket
}function N(){return window.EventSource
}function o(){if(J.shared){l=ad(J);
if(l!=null){if(J.logLevel==="debug"){b.atmosphere.debug("Storage service available. All communication will be local")
}if(l.open(J)){return
}}if(J.logLevel==="debug"){b.atmosphere.debug("No Storage service available.")
}l=null
}J.firstMessage=b.atmosphere.uuid==0?true:false;
J.isOpen=false;
J.ctime=b.now();
if(J.uuid===0){J.uuid=b.atmosphere.uuid
}J.closedByClientTimeout=false;
if(J.transport!=="websocket"&&J.transport!=="sse"){n(J)
}else{if(J.transport==="websocket"){if(!k()){L("Websocket is not supported, using request.fallbackTransport ("+J.fallbackTransport+")")
}else{ag(false)
}}else{if(J.transport==="sse"){if(!N()){L("Server Side Events(SSE) is not supported, using request.fallbackTransport ("+J.fallbackTransport+")")
}else{D(false)
}}}}}function ad(aA){var aD,ax,az,ay="atmosphere-"+aA.url,aw={storage:function(){if(!b.atmosphere.supportStorage()){return
}var aG=window.localStorage,aE=function(aH){return b.parseJSON(aG.getItem(ay+"-"+aH))
},aF=function(aH,aI){aG.setItem(ay+"-"+aH,b.stringifyJSON(aI))
};
return{init:function(){aF("children",aE("children").concat([E]));
b(window).on("storage.socket",function(aH){aH=aH.originalEvent;
if(aH.key===ay&&aH.newValue){aC(aH.newValue)
}});
return aE("opened")
},signal:function(aH,aI){aG.setItem(ay,b.stringifyJSON({target:"p",type:aH,data:aI}))
},close:function(){var aH,aI=aE("children");
b(window).off("storage.socket");
if(aI){aH=b.inArray(aA.id,aI);
if(aH>-1){aI.splice(aH,1);
aF("children",aI)
}}}}
},windowref:function(){var aE=window.open("",ay.replace(/\W/g,""));
if(!aE||aE.closed||!aE.callbacks){return
}return{init:function(){aE.callbacks.push(aC);
aE.children.push(E);
return aE.opened
},signal:function(aF,aG){if(!aE.closed&&aE.fire){aE.fire(b.stringifyJSON({target:"p",type:aF,data:aG}))
}},close:function(){function aF(aI,aH){var aG=b.inArray(aH,aI);
if(aG>-1){aI.splice(aG,1)
}}if(!az){aF(aE.callbacks,aC);
aF(aE.children,E)
}}}
}};
function aC(aE){var aG=b.parseJSON(aE),aF=aG.data;
if(aG.target==="c"){switch(aG.type){case"open":I("opening","local",J);
break;
case"close":if(!az){az=true;
if(aF.reason==="aborted"){aj()
}else{if(aF.heir===E){o()
}else{setTimeout(function(){o()
},100)
}}}break;
case"message":A(aF,"messageReceived",200,aA.transport);
break;
case"localMessage":Y(aF);
break
}}}function aB(){var aE=new RegExp("(?:^|; )("+encodeURIComponent(ay)+")=([^;]*)").exec(document.cookie);
if(aE){return b.parseJSON(decodeURIComponent(aE[2]))
}}aD=aB();
if(!aD||b.now()-aD.ts>1000){return
}ax=aw.storage()||aw.windowref();
if(!ax){return
}return{open:function(){var aE;
F=setInterval(function(){var aF=aD;
aD=aB();
if(!aD||aF.ts===aD.ts){aC(b.stringifyJSON({target:"c",type:"close",data:{reason:"error",heir:aF.heir}}))
}},1000);
aE=ax.init();
if(aE){setTimeout(function(){I("opening","local",aA)
},50)
}return aE
},send:function(aE){ax.signal("send",aE)
},localSend:function(aE){ax.signal("localSend",b.stringifyJSON({id:E,event:aE}))
},close:function(){if(!ar){clearInterval(F);
ax.signal("close");
ax.close()
}}}
}function Z(){var ax,aw="atmosphere-"+J.url,aB={storage:function(){if(!b.atmosphere.supportStorage()){return
}var aC=window.localStorage;
return{init:function(){b(window).on("storage.socket",function(aD){aD=aD.originalEvent;
if(aD.key===aw&&aD.newValue){ay(aD.newValue)
}})
},signal:function(aD,aE){aC.setItem(aw,b.stringifyJSON({target:"c",type:aD,data:aE}))
},get:function(aD){return b.parseJSON(aC.getItem(aw+"-"+aD))
},set:function(aD,aE){aC.setItem(aw+"-"+aD,b.stringifyJSON(aE))
},close:function(){b(window).off("storage.socket");
aC.removeItem(aw);
aC.removeItem(aw+"-opened");
aC.removeItem(aw+"-children")
}}
},windowref:function(){var aC=aw.replace(/\W/g,""),aD=(b('iframe[name="'+aC+'"]')[0]||b('<iframe name="'+aC+'" />').hide().appendTo("body")[0]).contentWindow;
return{init:function(){aD.callbacks=[ay];
aD.fire=function(aE){var aF;
for(aF=0;
aF<aD.callbacks.length;
aF++){aD.callbacks[aF](aE)
}}
},signal:function(aE,aF){if(!aD.closed&&aD.fire){aD.fire(b.stringifyJSON({target:"c",type:aE,data:aF}))
}},get:function(aE){return !aD.closed?aD[aE]:null
},set:function(aE,aF){if(!aD.closed){aD[aE]=aF
}},close:function(){}}
}};
function ay(aC){var aE=b.parseJSON(aC),aD=aE.data;
if(aE.target==="p"){switch(aE.type){case"send":ai(aD);
break;
case"localSend":Y(aD);
break;
case"close":aj();
break
}}}V=function aA(aC){ax.signal("message",aC)
};
function az(){document.cookie=av+"="+encodeURIComponent(b.stringifyJSON({ts:b.now()+1,heir:(ax.get("children")||[])[0]}))+"; path=/"
}ax=aB.storage()||aB.windowref();
ax.init();
if(J.logLevel==="debug"){b.atmosphere.debug("Installed StorageService "+ax)
}ax.set("children",[]);
if(ax.get("opened")!=null&&!ax.get("opened")){ax.set("opened",false)
}av=encodeURIComponent(aw);
az();
F=setInterval(az,1000);
am=ax
}function I(ay,aB,ax){if(J.shared&&aB!=="local"){Z()
}if(am!=null){am.set("opened",true)
}ax.close=function(){aj()
};
if(g>0&&ay==="re-connecting"){ax.isReopen=true;
aa(R)
}else{if(R.error==null){R.request=ax;
var az=R.state;
R.state=ay;
var aw=R.transport;
R.transport=aB;
var aA=R.responseBody;
x();
R.responseBody=aA;
R.state=az;
R.transport=aw
}}}function u(ay){ay.transport="jsonp";
var ax=J;
if((ay!=null)&&(typeof(ay)!=="undefined")){ax=ay
}var aw=ax.url;
if(ax.dispatchUrl!=null){aw+=ax.dispatchUrl
}var az=ax.data;
if(ax.attachHeadersAsQueryString){aw=S(ax);
if(az!==""){aw+="&X-Atmosphere-Post-Body="+encodeURIComponent(az)
}az=""
}B=b.ajax({url:aw,type:ax.method,dataType:"jsonp",error:function(aA,aC,aB){R.error=true;
if(ax.openId){clearTimeout(ax.openId)
}if(ax.reconnect&&g++<ax.maxReconnectOnClose){I("re-connecting",ax.transport,ax);
M(B,ax,ax.reconnectInterval);
ax.openId=setTimeout(function(){ak(ax)
},ax.reconnectInterval+1000)
}else{ab(aA.status,aB)
}},jsonp:"jsonpTransport",success:function(aB){if(ax.reconnect){if(ax.maxRequest===-1||ax.requestCount++<ax.maxRequest){ac(B,ax);
if(!ax.executeCallbackBeforeReconnect){M(B,ax,ax.pollingInterval)
}var aD=aB.message;
if(aD!=null&&typeof aD!=="string"){try{aD=b.stringifyJSON(aD)
}catch(aC){}}var aA=s(aD,ax,R);
if(!aA){A(R.responseBody,"messageReceived",200,ax.transport)
}if(ax.executeCallbackBeforeReconnect){M(B,ax,ax.pollingInterval)
}}else{b.atmosphere.log(J.logLevel,["JSONP reconnect maximum try reached "+J.requestCount]);
ab(0,"maxRequest reached")
}}},data:ax.data,beforeSend:function(aA){c(aA,ax,false)
}})
}function W(az){var ax=J;
if((az!=null)&&(typeof(az)!=="undefined")){ax=az
}var aw=ax.url;
if(ax.dispatchUrl!=null){aw+=ax.dispatchUrl
}var aA=ax.data;
if(ax.attachHeadersAsQueryString){aw=S(ax);
if(aA!==""){aw+="&X-Atmosphere-Post-Body="+encodeURIComponent(aA)
}aA=""
}var ay=typeof(ax.async)!=="undefined"?ax.async:true;
B=b.ajax({url:aw,type:ax.method,error:function(aB,aD,aC){R.error=true;
if(aB.status<300){M(B,ax)
}else{ab(aB.status,aC)
}},success:function(aD,aE,aC){if(ax.reconnect){if(ax.maxRequest===-1||ax.requestCount++<ax.maxRequest){if(!ax.executeCallbackBeforeReconnect){M(B,ax,ax.pollingInterval)
}var aB=s(aD,ax,R);
if(!aB){A(R.responseBody,"messageReceived",200,ax.transport)
}if(ax.executeCallbackBeforeReconnect){M(B,ax,ax.pollingInterval)
}}else{b.atmosphere.log(J.logLevel,["AJAX reconnect maximum try reached "+J.requestCount]);
ab(0,"maxRequest reached")
}}},beforeSend:function(aB){c(aB,ax,false)
},crossDomain:ax.enableXDR,async:ay})
}function e(aw){if(J.webSocketImpl!=null){return J.webSocketImpl
}else{if(window.WebSocket){return new WebSocket(aw)
}else{return new MozWebSocket(aw)
}}}function f(){var aw=S(J);
return decodeURI(b('<a href="'+aw+'"/>')[0].href.replace(/^http/,"ws"))
}function at(){var aw=S(J);
return aw
}function D(ax){R.transport="sse";
var aw=at(J.url);
if(J.logLevel==="debug"){b.atmosphere.debug("Invoking executeSSE");
b.atmosphere.debug("Using URL: "+aw)
}if(J.enableProtocol&&ax){var az=b.now()-J.ctime;
J.lastTimestamp=Number(J.stime)+Number(az)
}if(ax&&!J.reconnect){if(j!=null){ah()
}return
}try{j=new EventSource(aw,{withCredentials:J.withCredentials})
}catch(ay){ab(0,ay);
L("SSE failed. Downgrading to fallback transport and resending");
return
}if(J.connectTimeout>0){J.id=setTimeout(function(){if(!ax){ah()
}},J.connectTimeout)
}j.onopen=function(aA){t(J);
if(J.logLevel==="debug"){b.atmosphere.debug("SSE successfully opened")
}if(!J.enableProtocol){if(!ax){I("opening","sse",J)
}else{I("re-opening","sse",J)
}}else{if(J.isReopen){J.isReopen=false;
I("re-opening",J.transport,J)
}}ax=true;
if(J.method==="POST"){R.state="messageReceived";
j.send(J.data)
}};
j.onmessage=function(aB){t(J);
if(!J.enableXDR&&aB.origin!==window.location.protocol+"//"+window.location.host){b.atmosphere.log(J.logLevel,["Origin was not "+window.location.protocol+"//"+window.location.host]);
return
}R.state="messageReceived";
R.status=200;
aB=aB.data;
var aA=s(aB,J,R);
if(!aA){x();
R.responseBody="";
R.messages=[]
}};
j.onerror=function(aA){clearTimeout(J.id);
if(R.closedByClientTimeout){return
}ae(ax);
ah();
if(ar){b.atmosphere.log(J.logLevel,["SSE closed normally"])
}else{if(!ax){L("SSE failed. Downgrading to fallback transport and resending")
}else{if(J.reconnect&&(R.transport==="sse")){if(g++<J.maxReconnectOnClose){I("re-connecting",J.transport,J);
if(J.reconnectInterval>0){J.reconnectId=setTimeout(function(){D(true)
},J.reconnectInterval)
}else{D(true)
}R.responseBody="";
R.messages=[]
}else{b.atmosphere.log(J.logLevel,["SSE reconnect maximum try reached "+g]);
ab(0,"maxReconnectOnClose reached")
}}}}}
}function ag(ax){R.transport="websocket";
if(J.enableProtocol&&ax){var ay=b.now()-J.ctime;
J.lastTimestamp=Number(J.stime)+Number(ay)
}var aw=f(J.url);
if(J.logLevel==="debug"){b.atmosphere.debug("Invoking executeWebSocket");
b.atmosphere.debug("Using URL: "+aw)
}if(ax&&!J.reconnect){if(U!=null){ah()
}return
}U=e(aw);
if(J.webSocketBinaryType!=null){U.binaryType=J.webSocketBinaryType
}if(J.connectTimeout>0){J.id=setTimeout(function(){if(!ax){var az={code:1002,reason:"",wasClean:false};
U.onclose(az);
try{ah()
}catch(aA){}return
}},J.connectTimeout)
}U.onopen=function(aA){t(J);
if(J.logLevel==="debug"){b.atmosphere.debug("Websocket successfully opened")
}var az=ax;
if(U!=null){U.canSendMessage=true
}if(!J.enableProtocol){ax=true;
if(az){I("re-opening","websocket",J)
}else{I("opening","websocket",J)
}}if(U!=null){if(J.method==="POST"){R.state="messageReceived";
U.send(J.data)
}}};
U.onmessage=function(aB){t(J);
if(J.enableProtocol){ax=true
}R.state="messageReceived";
R.status=200;
aB=aB.data;
var az=typeof(aB)==="string";
if(az){var aA=s(aB,J,R);
if(!aA){x();
R.responseBody="";
R.messages=[]
}}else{if(!p(J,aB)){return
}R.responseBody=aB;
x();
R.responseBody=null
}};
U.onerror=function(az){clearTimeout(J.id)
};
U.onclose=function(az){if(R.state==="closed"){return
}clearTimeout(J.id);
var aA=az.reason;
if(aA===""){switch(az.code){case 1000:aA="Normal closure; the connection successfully completed whatever purpose for which it was created.";
break;
case 1001:aA="The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.";
break;
case 1002:aA="The endpoint is terminating the connection due to a protocol error.";
break;
case 1003:aA="The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).";
break;
case 1004:aA="The endpoint is terminating the connection because a data frame was received that is too large.";
break;
case 1005:aA="Unknown: no status code was provided even though one was expected.";
break;
case 1006:aA="Connection was closed abnormally (that is, with no close frame being sent).";
break
}}if(J.logLevel==="warn"){b.atmosphere.warn("Websocket closed, reason: "+aA);
b.atmosphere.warn("Websocket closed, wasClean: "+az.wasClean)
}if(R.closedByClientTimeout){return
}ae(ax);
R.state="closed";
if(ar){b.atmosphere.log(J.logLevel,["Websocket closed normally"])
}else{if(!ax){L("Websocket failed. Downgrading to Comet and resending")
}else{if(J.reconnect&&R.transport==="websocket"){ah();
if(g++<J.maxReconnectOnClose){I("re-connecting",J.transport,J);
if(J.reconnectInterval>0){J.reconnectId=setTimeout(function(){R.responseBody="";
R.messages=[];
ag(true)
},J.reconnectInterval)
}else{R.responseBody="";
R.messages=[];
ag(true)
}}else{b.atmosphere.log(J.logLevel,["Websocket reconnect maximum try reached "+J.requestCount]);
if(J.logLevel==="warn"){b.atmosphere.warn("Websocket error, reason: "+az.reason)
}ab(0,"maxReconnectOnClose reached")
}}}}};
if(U.url===undefined){U.onclose({reason:"Android 4.1 does not support websockets.",wasClean:false})
}}function p(az,ay){var aw=true;
if(az.transport==="polling"){return aw
}if(b.trim(ay).length!==0&&az.enableProtocol&&az.firstMessage){az.firstMessage=false;
var ax=ay.split(az.messageDelimiter);
var aA=ax.length===2?0:1;
az.uuid=b.trim(ax[aA]);
az.stime=b.trim(ax[aA+1]);
aw=false;
if(az.transport!=="long-polling"){ak(az)
}b.atmosphere.uuid=az.uuid
}else{if(az.enableProtocol&&az.firstMessage){aw=false
}else{ak(az)
}}return aw
}function t(aw){clearTimeout(aw.id);
if(aw.timeout>0&&aw.transport!=="polling"){aw.id=setTimeout(function(){m(aw);
y();
ah()
},aw.timeout)
}}function m(aw){R.closedByClientTimeout=true;
R.state="closedByClient";
R.responseBody="";
R.status=408;
R.messages=[];
x()
}function ab(aw,ax){ah();
clearTimeout(J.id);
R.state="error";
R.reasonPhrase=ax;
R.responseBody="";
R.status=aw;
R.messages=[];
x()
}function s(aA,az,aw){if(!p(az,aA)){return true
}if(aA.length===0){return true
}if(az.trackMessageLength){aA=aw.partialMessage+aA;
var ay=[];
var ax=aA.indexOf(az.messageDelimiter);
while(ax!==-1){var aC=b.trim(aA.substring(0,ax));
var aB=parseInt(aC,10);
if(isNaN(aB)){throw'message length "'+aC+'" is not a number'
}ax+=az.messageDelimiter.length;
if(ax+aB>aA.length){ax=-1
}else{ay.push(aA.substring(ax,ax+aB));
aA=aA.substring(ax+aB,aA.length);
ax=aA.indexOf(az.messageDelimiter)
}}aw.partialMessage=aA;
if(ay.length!==0){aw.responseBody=ay.join(az.messageDelimiter);
aw.messages=ay;
return false
}else{aw.responseBody="";
aw.messages=[];
return true
}}else{aw.responseBody=aA
}return false
}function L(aw){b.atmosphere.log(J.logLevel,[aw]);
if(typeof(J.onTransportFailure)!=="undefined"){J.onTransportFailure(aw,J)
}else{if(typeof(b.atmosphere.onTransportFailure)!=="undefined"){b.atmosphere.onTransportFailure(aw,J)
}}J.transport=J.fallbackTransport;
var ax=J.connectTimeout===-1?0:J.connectTimeout;
if(J.reconnect&&J.transport!=="none"||J.transport==null){J.method=J.fallbackMethod;
R.transport=J.fallbackTransport;
J.fallbackTransport="none";
if(ax>0){J.reconnectId=setTimeout(function(){o()
},ax)
}else{o()
}}else{ab(500,"Unable to reconnect with fallback transport")
}}function S(ay,aw){var ax=J;
if((ay!=null)&&(typeof(ay)!=="undefined")){ax=ay
}if(aw==null){aw=ax.url
}if(!ax.attachHeadersAsQueryString){return aw
}if(aw.indexOf("X-Atmosphere-Framework")!==-1){return aw
}aw+=(aw.indexOf("?")!==-1)?"&":"?";
aw+="X-Atmosphere-tracking-id="+ax.uuid;
aw+="&X-Atmosphere-Framework="+b.atmosphere.version;
aw+="&X-Atmosphere-Transport="+ax.transport;
if(ax.trackMessageLength){aw+="&X-Atmosphere-TrackMessageSize=true"
}if(ax.lastTimestamp!=null){aw+="&X-Cache-Date="+ax.lastTimestamp
}else{aw+="&X-Cache-Date="+0
}if(ax.contentType!==""){aw+="&Content-Type="+(ax.transport==="websocket"?ax.contentType:encodeURIComponent(ax.contentType))
}if(ax.enableProtocol){aw+="&X-atmo-protocol=true"
}b.each(ax.headers,function(az,aB){var aA=b.isFunction(aB)?aB.call(this,ax,ay,R):aB;
if(aA!=null){aw+="&"+encodeURIComponent(az)+"="+encodeURIComponent(aA)
}});
return aw
}function ak(aw){if(!aw.isOpen){aw.isOpen=true;
I("opening",aw.transport,aw)
}else{if(aw.isReopen){aw.isReopen=false;
I("re-opening",aw.transport,aw)
}}}function n(ay){var aw=J;
if((ay!=null)||(typeof(ay)!=="undefined")){aw=ay
}aw.lastIndex=0;
aw.readyState=0;
if((aw.transport==="jsonp")||((aw.enableXDR)&&(b.atmosphere.checkCORSSupport()))){u(aw);
return
}if(aw.transport==="ajax"){W(ay);
return
}if(b.browser.msie&&+b.browser.version.split(".")[0]<10){if((aw.transport==="streaming")){if(aw.enableXDR&&window.XDomainRequest){K(aw)
}else{aq(aw)
}return
}if((aw.enableXDR)&&(window.XDomainRequest)){K(aw);
return
}}var az=function(){aw.lastIndex=0;
if(aw.reconnect&&g++<aw.maxReconnectOnClose){I("re-connecting",ay.transport,ay);
M(ax,aw,ay.reconnectInterval)
}else{ab(0,"maxReconnectOnClose reached")
}};
if(aw.reconnect&&(aw.maxRequest===-1||aw.requestCount++<aw.maxRequest)){var ax=b.ajaxSettings.xhr();
ax.hasData=false;
c(ax,aw,true);
if(aw.suspend){q=ax
}if(aw.transport!=="polling"){R.transport=aw.transport;
ax.onabort=function(){ae(true)
};
ax.onerror=function(){R.error=true;
try{R.status=XMLHttpRequest.status
}catch(aA){R.status=500
}if(!R.status){R.status=500
}if(!R.errorHandled){ah();
az()
}}
}ax.onreadystatechange=function(){if(ar){return
}R.error=null;
var aB=false;
var aG=false;
if(aw.transport==="streaming"&&aw.readyState>2&&ax.readyState===4){if(aw.reconnectingOnLength){return
}ah();
az();
return
}aw.readyState=ax.readyState;
if(aw.transport==="streaming"&&ax.readyState>=3){aG=true
}else{if(aw.transport==="long-polling"&&ax.readyState===4){aG=true
}}t(J);
if(aw.transport!=="polling"){var aA=200;
if(ax.readyState===4){aA=ax.status>1000?0:ax.status
}if(aA>=300||aA===0){R.errorHandled=true;
ah();
az();
return
}if((!aw.enableProtocol||!ay.firstMessage)&&ax.readyState===2){ak(aw)
}}else{if(ax.readyState===4){aG=true
}}if(aG){var aE=ax.responseText;
if(b.trim(aE).length===0&&aw.transport==="long-polling"){if(!ax.hasData){M(ax,aw,aw.pollingInterval)
}else{ax.hasData=false
}return
}ax.hasData=true;
ac(ax,J);
if(aw.transport==="streaming"){if(!b.browser.opera){var aD=aE.substring(aw.lastIndex,aE.length);
aB=s(aD,aw,R);
aw.lastIndex=aE.length;
if(aB){return
}}else{b.atmosphere.iterate(function(){if(R.status!==500&&ax.responseText.length>aw.lastIndex){try{R.status=ax.status;
R.headers=a(ax.getAllResponseHeaders());
ac(ax,J)
}catch(aI){R.status=404
}t(J);
R.state="messageReceived";
var aH=ax.responseText.substring(aw.lastIndex);
aw.lastIndex=ax.responseText.length;
aB=s(aH,aw,R);
if(!aB){x()
}G(ax,aw)
}else{if(R.status>400){aw.lastIndex=ax.responseText.length;
return false
}}},0)
}}else{aB=s(aE,aw,R)
}try{R.status=ax.status;
R.headers=a(ax.getAllResponseHeaders());
ac(ax,aw)
}catch(aF){R.status=404
}if(aw.suspend){R.state=R.status===0?"closed":"messageReceived"
}else{R.state="messagePublished"
}var aC=ay.transport!=="streaming"&&ay.transport!=="polling";
if(aC&&!aw.executeCallbackBeforeReconnect){M(ax,aw,aw.pollingInterval)
}if(R.responseBody.length!==0&&!aB){x()
}if(aC&&aw.executeCallbackBeforeReconnect){M(ax,aw,aw.pollingInterval)
}G(ax,aw)
}};
ax.send(aw.data);
af=true
}else{if(aw.logLevel==="debug"){b.atmosphere.log(aw.logLevel,["Max re-connection reached."])
}ab(0,"maxRequest reached")
}}function c(ay,az,ax){var aw=az.url;
if(az.dispatchUrl!=null&&az.method==="POST"){aw+=az.dispatchUrl
}aw=S(az,aw);
aw=b.atmosphere.prepareURL(aw);
if(ax){ay.open(az.method,aw,true);
if(az.connectTimeout>0){az.id=setTimeout(function(){if(az.requestCount===0){ah();
A("Connect timeout","closed",200,az.transport)
}},az.connectTimeout)
}}if(J.withCredentials){if("withCredentials" in ay){ay.withCredentials=true
}}if(!J.dropHeaders){ay.setRequestHeader("X-Atmosphere-Framework",b.atmosphere.version);
ay.setRequestHeader("X-Atmosphere-Transport",az.transport);
if(az.lastTimestamp!=null){ay.setRequestHeader("X-Cache-Date",az.lastTimestamp)
}else{ay.setRequestHeader("X-Cache-Date",0)
}if(az.trackMessageLength){ay.setRequestHeader("X-Atmosphere-TrackMessageSize","true")
}ay.setRequestHeader("X-Atmosphere-tracking-id",az.uuid);
b.each(az.headers,function(aA,aC){var aB=b.isFunction(aC)?aC.call(this,ay,az,ax,R):aC;
if(aB!=null){ay.setRequestHeader(aA,aB)
}})
}if(az.contentType!==""){ay.setRequestHeader("Content-Type",az.contentType)
}}function M(ax,ay,az){if(ay.reconnect||(ay.suspend&&af)){var aw=0;
if(ax.readyState>1){aw=ax.status>1000?0:ax.status
}R.status=aw===0?204:aw;
R.reason=aw===0?"Server resumed the connection or down.":"OK";
clearTimeout(ay.id);
if(ay.reconnectId){clearTimeout(ay.reconnectId);
delete ay.reconnectId
}if(az>0){setTimeout(function(){J.reconnectId=n(ay)
},az)
}else{n(ay)
}}}function aa(aw){aw.state="re-connecting";
X(aw)
}function K(aw){if(aw.transport!=="polling"){z=Q(aw);
z.open()
}else{Q(aw).open()
}}function Q(ay){var ax=J;
if((ay!=null)&&(typeof(ay)!=="undefined")){ax=ay
}var aD=ax.transport;
var aC=0;
var aw=new window.XDomainRequest();
var aA=function(){if(ax.transport==="long-polling"&&(ax.reconnect&&(ax.maxRequest===-1||ax.requestCount++<ax.maxRequest))){aw.status=200;
K(ax)
}};
var aB=ax.rewriteURL||function(aF){var aE=/(?:^|;\s*)(JSESSIONID|PHPSESSID)=([^;]*)/.exec(document.cookie);
switch(aE&&aE[1]){case"JSESSIONID":return aF.replace(/;jsessionid=[^\?]*|(\?)|$/,";jsessionid="+aE[2]+"$1");
case"PHPSESSID":return aF.replace(/\?PHPSESSID=[^&]*&?|\?|$/,"?PHPSESSID="+aE[2]+"&").replace(/&$/,"")
}return aF
};
aw.onprogress=function(){az(aw)
};
aw.onerror=function(){if(ax.transport!=="polling"){ah();
if(g++<ax.maxReconnectOnClose){if(ax.reconnectInterval>0){ax.reconnectId=setTimeout(function(){I("re-connecting",ay.transport,ay);
K(ax)
},ax.reconnectInterval)
}else{I("re-connecting",ay.transport,ay);
K(ax)
}}else{ab(0,"maxReconnectOnClose reached")
}}};
aw.onload=function(){};
var az=function(aE){clearTimeout(ax.id);
var aG=aE.responseText;
aG=aG.substring(aC);
aC+=aG.length;
if(aD!=="polling"){t(ax);
var aF=s(aG,ax,R);
if(aD==="long-polling"&&b.trim(aG).length===0){return
}if(ax.executeCallbackBeforeReconnect){aA()
}if(!aF){A(R.responseBody,"messageReceived",200,aD)
}if(!ax.executeCallbackBeforeReconnect){aA()
}}};
return{open:function(){var aE=ax.url;
if(ax.dispatchUrl!=null){aE+=ax.dispatchUrl
}aE=S(ax,aE);
aw.open(ax.method,aB(aE));
if(ax.method==="GET"){aw.send()
}else{aw.send(ax.data)
}if(ax.connectTimeout>0){ax.id=setTimeout(function(){if(ax.requestCount===0){ah();
A("Connect timeout","closed",200,ax.transport)
}},ax.connectTimeout)
}},close:function(){aw.abort()
}}
}function aq(aw){z=r(aw);
z.open()
}function r(az){var ay=J;
if((az!=null)&&(typeof(az)!=="undefined")){ay=az
}var ax;
var aA=new window.ActiveXObject("htmlfile");
aA.open();
aA.close();
var aw=ay.url;
if(ay.dispatchUrl!=null){aw+=ay.dispatchUrl
}if(ay.transport!=="polling"){R.transport=ay.transport
}return{open:function(){var aB=aA.createElement("iframe");
aw=S(ay);
if(ay.data!==""){aw+="&X-Atmosphere-Post-Body="+encodeURIComponent(ay.data)
}aw=b.atmosphere.prepareURL(aw);
aB.src=aw;
aA.body.appendChild(aB);
var aC=aB.contentDocument||aB.contentWindow.document;
ax=b.atmosphere.iterate(function(){try{if(!aC.firstChild){return
}if(aC.readyState==="complete"){try{b.noop(aC.fileSize)
}catch(aI){A("Connection Failure","error",500,ay.transport);
return false
}}var aF=aC.body?aC.body.lastChild:aC;
var aH=function(){var aK=aF.cloneNode(true);
aK.appendChild(aC.createTextNode("."));
var aJ=aK.innerText;
aJ=aJ.substring(0,aJ.length-1);
return aJ
};
if(!b.nodeName(aF,"pre")){var aE=aC.head||aC.getElementsByTagName("head")[0]||aC.documentElement||aC;
var aD=aC.createElement("script");
aD.text="document.write('<plaintext>')";
aE.insertBefore(aD,aE.firstChild);
aE.removeChild(aD);
aF=aC.body.lastChild
}if(ay.closed){ay.isReopen=true
}ax=b.atmosphere.iterate(function(){var aK=aH();
if(aK.length>ay.lastIndex){t(J);
R.status=200;
R.error=null;
aF.innerText="";
var aJ=s(aK,ay,R);
if(aJ){return""
}A(R.responseBody,"messageReceived",200,ay.transport)
}ay.lastIndex=0;
if(aC.readyState==="complete"){ae(true);
I("re-connecting",ay.transport,ay);
if(ay.reconnectInterval>0){ay.reconnectId=setTimeout(function(){aq(ay)
},ay.reconnectInterval)
}else{aq(ay)
}return false
}},null);
return false
}catch(aG){R.error=true;
I("re-connecting",ay.transport,ay);
if(g++<ay.maxReconnectOnClose){if(ay.reconnectInterval>0){ay.reconnectId=setTimeout(function(){aq(ay)
},ay.reconnectInterval)
}else{aq(ay)
}}else{ab(0,"maxReconnectOnClose reached")
}aA.execCommand("Stop");
aA.close();
return false
}})
},close:function(){if(ax){ax()
}aA.execCommand("Stop");
ae(true)
}}
}function ai(aw){if(l!=null){h(aw)
}else{if(q!=null||j!=null){d(aw)
}else{if(z!=null){T(aw)
}else{if(B!=null){P(aw)
}else{if(U!=null){C(aw)
}else{ab(0,"No suspended connection available");
b.atmosphere.error("No suspended connection available. Make sure atmosphere.subscribe has been called and request.onOpen invoked before invoking this method")
}}}}}}function i(ax){var aw=al(ax);
aw.transport="ajax";
aw.method="GET";
aw.async=false;
aw.reconnect=false;
n(aw)
}function h(aw){l.send(aw)
}function w(ax){if(ax.length===0){return
}try{if(l){l.localSend(ax)
}else{if(am){am.signal("localMessage",b.stringifyJSON({id:E,event:ax}))
}}}catch(aw){b.atmosphere.error(aw)
}}function d(ax){var aw=al(ax);
n(aw)
}function T(ax){if(J.enableXDR&&b.atmosphere.checkCORSSupport()){var aw=al(ax);
aw.reconnect=false;
u(aw)
}else{d(ax)
}}function P(aw){d(aw)
}function O(aw){var ax=aw;
if(typeof(ax)==="object"){ax=aw.data
}return ax
}function al(ax){var ay=O(ax);
var aw={connected:false,timeout:60000,method:"POST",url:J.url,contentType:J.contentType,headers:J.headers,reconnect:true,callback:null,data:ay,suspend:false,maxRequest:-1,logLevel:"info",requestCount:0,withCredentials:J.withCredentials,transport:"polling",isOpen:true,attachHeadersAsQueryString:true,enableXDR:J.enableXDR,uuid:J.uuid,dispatchUrl:J.dispatchUrl,enableProtocol:false,messageDelimiter:"|",maxReconnectOnClose:J.maxReconnectOnClose};
if(typeof(ax)==="object"){aw=b.extend(aw,ax)
}return aw
}function C(aw){var az=b.atmosphere.isBinary(aw)?aw:O(aw);
var ax;
try{if(J.dispatchUrl!=null){ax=J.webSocketPathDelimiter+J.dispatchUrl+J.webSocketPathDelimiter+az
}else{ax=az
}if(!U.canSendMessage){b.atmosphere.error("WebSocket not connected.");
return
}U.send(ax)
}catch(ay){U.onclose=function(aA){};
ah();
L("Websocket failed. Downgrading to Comet and resending "+ax);
d(aw)
}}function Y(ax){var aw=b.parseJSON(ax);
if(aw.id!==E){if(typeof(J.onLocalMessage)!=="undefined"){J.onLocalMessage(aw.event)
}else{if(typeof(b.atmosphere.onLocalMessage)!=="undefined"){b.atmosphere.onLocalMessage(aw.event)
}}}}function A(az,aw,ax,ay){R.responseBody=az;
R.transport=ay;
R.status=ax;
R.state=aw;
x()
}function ac(aw,az){if(!az.readResponsesHeaders){if(!az.enableProtocol){az.lastTimestamp=b.now();
az.uuid=b.atmosphere.guid()
}}else{try{var ay=aw.getResponseHeader("X-Cache-Date");
if(ay&&ay!=null&&ay.length>0){az.lastTimestamp=ay.split(" ").pop()
}var ax=aw.getResponseHeader("X-Atmosphere-tracking-id");
if(ax&&ax!=null){az.uuid=ax.split(" ").pop()
}}catch(aA){}}}function X(aw){ap(aw,J);
ap(aw,b.atmosphere)
}function ap(ax,ay){switch(ax.state){case"messageReceived":g=0;
if(typeof(ay.onMessage)!=="undefined"){ay.onMessage(ax)
}break;
case"error":if(typeof(ay.onError)!=="undefined"){ay.onError(ax)
}break;
case"opening":delete J.closed;
if(typeof(ay.onOpen)!=="undefined"){ay.onOpen(ax)
}break;
case"messagePublished":if(typeof(ay.onMessagePublished)!=="undefined"){ay.onMessagePublished(ax)
}break;
case"re-connecting":if(typeof(ay.onReconnect)!=="undefined"){ay.onReconnect(J,ax)
}break;
case"closedByClient":if(typeof(ay.onClientTimeout)!=="undefined"){ay.onClientTimeout(J)
}break;
case"re-opening":delete J.closed;
if(typeof(ay.onReopen)!=="undefined"){ay.onReopen(J,ax)
}break;
case"fail-to-reconnect":if(typeof(ay.onFailureToReconnect)!=="undefined"){ay.onFailureToReconnect(J,ax)
}break;
case"unsubscribe":case"closed":var aw=typeof(J.closed)!=="undefined"?J.closed:false;
if(typeof(ay.onClose)!=="undefined"&&!aw){ay.onClose(ax)
}J.closed=true;
break
}}function ae(aw){if(R.state!=="closed"){R.state="closed";
R.responseBody="";
R.messages=[];
R.status=!aw?501:200;
x()
}}function x(){var ay=function(aB,aC){aC(R)
};
if(l==null&&V!=null){V(R.responseBody)
}J.reconnect=J.mrequest;
var aw=typeof(R.responseBody)==="string";
var az=(aw&&J.trackMessageLength)?(R.messages.length>0?R.messages:[""]):new Array(R.responseBody);
for(var ax=0;
ax<az.length;
ax++){if(az.length>1&&az[ax].length===0){continue
}R.responseBody=(aw)?b.trim(az[ax]):az[ax];
if(l==null&&V!=null){V(R.responseBody)
}if(R.responseBody.length===0&&R.state==="messageReceived"){continue
}X(R);
if(b.atmosphere.callbacks.length>0){if(J.logLevel==="debug"){b.atmosphere.debug("Invoking "+b.atmosphere.callbacks.length+" global callbacks: "+R.state)
}try{b.each(b.atmosphere.callbacks,ay)
}catch(aA){b.atmosphere.log(J.logLevel,["Callback exception"+aA])
}}if(typeof(J.callback)==="function"){if(J.logLevel==="debug"){b.atmosphere.debug("Invoking request callbacks")
}try{J.callback(R)
}catch(aA){b.atmosphere.log(J.logLevel,["Callback exception"+aA])
}}}}function G(ax,aw){if(R.partialMessage===""&&(aw.transport==="streaming")&&(ax.responseText.length>aw.maxStreamingLength)){R.messages=[];
aw.reconnectingOnLength=true;
ae(true);
y();
ah();
M(ax,aw,aw.pollingInterval)
}}function y(){if(J.enableProtocol&&!J.firstMessage){var ax="X-Atmosphere-Transport=close&X-Atmosphere-tracking-id="+J.uuid;
b.each(J.headers,function(ay,aA){var az=b.isFunction(aA)?aA.call(this,J,J,R):aA;
if(az!=null){ax+="&"+encodeURIComponent(ay)+"="+encodeURIComponent(az)
}});
var aw=J.url.replace(/([?&])_=[^&]*/,ax);
aw=aw+(aw===J.url?(/\?/.test(J.url)?"&":"?")+ax:"");
if(J.connectTimeout>0){b.ajax({url:aw,async:false,timeout:J.connectTimeout,cache:false})
}else{b.ajax({url:aw,async:false,cache:false})
}}}function aj(){if(J.reconnectId){clearTimeout(J.reconnectId);
delete J.reconnectId
}J.reconnect=false;
ar=true;
R.request=J;
R.state="unsubscribe";
R.responseBody="";
R.status=408;
x();
y();
ah()
}function ah(){if(J.id){clearTimeout(J.id)
}if(z!=null){z.close();
z=null
}if(B!=null){B.abort();
B=null
}if(q!=null){q.abort();
q=null
}if(U!=null){if(U.canSendMessage){U.close()
}U=null
}if(j!=null){j.close();
j=null
}ao()
}function ao(){if(am!=null){clearInterval(F);
document.cookie=av+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
am.signal("close",{reason:"",heir:!ar?E:(am.get("children")||[])[0]});
am.close()
}if(l!=null){l.close()
}}this.subscribe=function(aw){au(aw);
o()
};
this.execute=function(){o()
};
this.invokeCallback=function(){x()
};
this.close=function(){aj()
};
this.disconnect=function(){y()
};
this.getUrl=function(){return J.url
};
this.push=function(ay,ax){if(ax!=null){var aw=J.dispatchUrl;
J.dispatchUrl=ax;
ai(ay);
J.dispatchUrl=aw
}else{ai(ay)
}};
this.getUUID=function(){return J.uuid
};
this.pushLocal=function(aw){w(aw)
};
this.enableProtocol=function(aw){return J.enableProtocol
};
this.request=J;
this.response=R
},subscribe:function(c,f,e){if(typeof(f)==="function"){b.atmosphere.addCallback(f)
}b.atmosphere.uuid=0;
if(typeof(c)!=="string"){e=c
}else{e.url=c
}var d=new b.atmosphere.AtmosphereRequest(e);
d.execute();
b.atmosphere.requests[b.atmosphere.requests.length]=d;
return d
},addCallback:function(c){if(b.inArray(c,b.atmosphere.callbacks)===-1){b.atmosphere.callbacks.push(c)
}},removeCallback:function(d){var c=b.inArray(d,b.atmosphere.callbacks);
if(c!==-1){b.atmosphere.callbacks.splice(c,1)
}},unsubscribe:function(){if(b.atmosphere.requests.length>0){var c=[].concat(b.atmosphere.requests);
for(var e=0;
e<c.length;
e++){var d=c[e];
d.close();
clearTimeout(d.response.request.id)
}}b.atmosphere.requests=[];
b.atmosphere.callbacks=[]
},unsubscribeUrl:function(d){var c=-1;
if(b.atmosphere.requests.length>0){for(var f=0;
f<b.atmosphere.requests.length;
f++){var e=b.atmosphere.requests[f];
if(e.getUrl()===d){e.close();
clearTimeout(e.response.request.id);
c=f;
break
}}}if(c>=0){b.atmosphere.requests.splice(c,1)
}},publish:function(d){if(typeof(d.callback)==="function"){b.atmosphere.addCallback(d.callback)
}d.transport="polling";
var c=new b.atmosphere.AtmosphereRequest(d);
b.atmosphere.requests[b.atmosphere.requests.length]=c;
return c
},checkCORSSupport:function(){if(b.browser.msie&&!window.XDomainRequest&&+b.browser.version.split(".")[0]<11){return true
}else{if(b.browser.opera&&+b.browser.version.split(".")[0]<12){return true
}else{if(b.trim(navigator.userAgent).slice(0,16)==="KreaTVWebKit/531"){return true
}else{if(b.trim(navigator.userAgent).slice(-7).toLowerCase()==="kreatel"){return true
}}}}var c=navigator.userAgent.toLowerCase();
var d=c.indexOf("android")>-1;
if(d){return true
}return false
},S4:function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)
},guid:function(){return(b.atmosphere.S4()+b.atmosphere.S4()+"-"+b.atmosphere.S4()+"-"+b.atmosphere.S4()+"-"+b.atmosphere.S4()+"-"+b.atmosphere.S4()+b.atmosphere.S4()+b.atmosphere.S4())
},prepareURL:function(d){var e=b.now();
var c=d.replace(/([?&])_=[^&]*/,"$1_="+e);
return c+(c===d?(/\?/.test(d)?"&":"?")+"_="+e:"")
},param:function(c){return b.param(c,b.ajaxSettings.traditional)
},supportStorage:function(){var d=window.localStorage;
if(d){try{d.setItem("t","t");
d.removeItem("t");
return window.StorageEvent&&!b.browser.msie&&!(b.browser.mozilla&&b.browser.version.split(".")[0]==="1")
}catch(c){}}return false
},iterate:function(e,d){var f;
d=d||0;
(function c(){f=setTimeout(function(){if(e()===false){return
}c()
},d)
})();
return function(){clearTimeout(f)
}
},log:function(e,d){if(window.console){var c=window.console[e];
if(typeof c==="function"){c.apply(window.console,d)
}}},warn:function(){b.atmosphere.log("warn",arguments)
},info:function(){b.atmosphere.log("info",arguments)
},debug:function(){b.atmosphere.log("debug",arguments)
},error:function(){b.atmosphere.log("error",arguments)
},isBinary:function(c){return/^\[object\s(?:Blob|ArrayBuffer|.+Array)\]$/.test(Object.prototype.toString.call(c))
}};
(function(){var c,d;
b.uaMatch=function(f){f=f.toLowerCase();
var e=/(chrome)[ \/]([\w.]+)/.exec(f)||/(webkit)[ \/]([\w.]+)/.exec(f)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(f)||/(msie) ([\w.]+)/.exec(f)||/(trident)(?:.*? rv:([\w.]+)|)/.exec(f)||f.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(f)||[];
return{browser:e[1]||"",version:e[2]||"0"}
};
c=b.uaMatch(navigator.userAgent);
d={};
if(c.browser){d[c.browser]=true;
d.version=c.version
}if(d.chrome){d.webkit=true
}else{if(d.webkit){d.safari=true
}}if(d.trident){d.msie=true
}b.browser=d;
b.sub=function(){function e(h,i){return new e.fn.init(h,i)
}b.extend(true,e,this);
e.superclass=this;
e.fn=e.prototype=this();
e.fn.constructor=e;
e.sub=this.sub;
e.fn.init=function g(h,i){if(i&&i instanceof b&&!(i instanceof e)){i=e(i)
}return b.fn.init.call(this,h,i,f)
};
e.fn.init.prototype=e.fn;
var f=e(document);
return e
}
})();
(function(g){var i=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function c(f){return'"'+f.replace(i,function(j){var k=e[j];
return typeof k==="string"?k:"\\u"+("0000"+j.charCodeAt(0).toString(16)).slice(-4)
})+'"'
}function d(f){return f<10?"0"+f:f
}function h(n,m){var l,k,f,j,p=m[n],o=typeof p;
if(p&&typeof p==="object"&&typeof p.toJSON==="function"){p=p.toJSON(n);
o=typeof p
}switch(o){case"string":return c(p);
case"number":return isFinite(p)?String(p):"null";
case"boolean":return String(p);
case"object":if(!p){return"null"
}switch(Object.prototype.toString.call(p)){case"[object Date]":return isFinite(p.valueOf())?'"'+p.getUTCFullYear()+"-"+d(p.getUTCMonth()+1)+"-"+d(p.getUTCDate())+"T"+d(p.getUTCHours())+":"+d(p.getUTCMinutes())+":"+d(p.getUTCSeconds())+'Z"':"null";
case"[object Array]":f=p.length;
j=[];
for(l=0;
l<f;
l++){j.push(h(l,p)||"null")
}return"["+j.join(",")+"]";
default:j=[];
for(l in p){if(Object.prototype.hasOwnProperty.call(p,l)){k=h(l,p);
if(k){j.push(c(l)+":"+k)
}}}return"{"+j.join(",")+"}"
}}}g.stringifyJSON=function(f){if(window.JSON&&window.JSON.stringify){return window.JSON.stringify(f)
}return h("",{"":f})
}
}(b))
}));