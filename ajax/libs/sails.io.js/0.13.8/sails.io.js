/**
 * To use sails.io.js in an AMD environment (e.g. with require.js),
 * replace this file with the sails.io.js file from the root of:
 * https://github.com/balderdashy/sails.io.js
 * and download a standalone copy of socket.io-client from:
 * https://github.com/socketio/socket.io-client
 * then follow the instructions at:
 * https://github.com/balderdashy/sails.io.js#requirejsamd-usage
 */

// socket.io-client version 1.4.4
// https://github.com/socketio/socket.io-client

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.io=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){b.exports=a("./lib/")},{"./lib/":2}],2:[function(a,b,c){b.exports=a("./socket"),b.exports.parser=a("engine.io-parser")},{"./socket":3,"engine.io-parser":19}],3:[function(a,b,c){(function(c){function d(a,b){if(!(this instanceof d))return new d(a,b);b=b||{},a&&"object"==typeof a&&(b=a,a=null),a?(a=k(a),b.hostname=a.host,b.secure="https"==a.protocol||"wss"==a.protocol,b.port=a.port,a.query&&(b.query=a.query)):b.host&&(b.hostname=k(b.host).host),this.secure=null!=b.secure?b.secure:c.location&&"https:"==location.protocol,b.hostname&&!b.port&&(b.port=this.secure?"443":"80"),this.agent=b.agent||!1,this.hostname=b.hostname||(c.location?location.hostname:"localhost"),this.port=b.port||(c.location&&location.port?location.port:this.secure?443:80),this.query=b.query||{},"string"==typeof this.query&&(this.query=m.decode(this.query)),this.upgrade=!1!==b.upgrade,this.path=(b.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!b.forceJSONP,this.jsonp=!1!==b.jsonp,this.forceBase64=!!b.forceBase64,this.enablesXDR=!!b.enablesXDR,this.timestampParam=b.timestampParam||"t",this.timestampRequests=b.timestampRequests,this.transports=b.transports||["polling","websocket"],this.readyState="",this.writeBuffer=[],this.policyPort=b.policyPort||843,this.rememberUpgrade=b.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=b.onlyBinaryUpgrades,this.perMessageDeflate=!1!==b.perMessageDeflate?b.perMessageDeflate||{}:!1,!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=b.pfx||null,this.key=b.key||null,this.passphrase=b.passphrase||null,this.cert=b.cert||null,this.ca=b.ca||null,this.ciphers=b.ciphers||null,this.rejectUnauthorized=void 0===b.rejectUnauthorized?null:b.rejectUnauthorized;var e="object"==typeof c&&c;e.global===e&&b.extraHeaders&&Object.keys(b.extraHeaders).length>0&&(this.extraHeaders=b.extraHeaders),this.open()}function e(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}var f=a("./transports"),g=a("component-emitter"),h=a("debug")("engine.io-client:socket"),i=a("indexof"),j=a("engine.io-parser"),k=a("parseuri"),l=a("parsejson"),m=a("parseqs");b.exports=d,d.priorWebsocketSuccess=!1,g(d.prototype),d.protocol=j.protocol,d.Socket=d,d.Transport=a("./transport"),d.transports=a("./transports"),d.parser=a("engine.io-parser"),d.prototype.createTransport=function(a){h('creating transport "%s"',a);var b=e(this.query);b.EIO=j.protocol,b.transport=a,this.id&&(b.sid=this.id);var c=new f[a]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:b,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized,perMessageDeflate:this.perMessageDeflate,extraHeaders:this.extraHeaders});return c},d.prototype.open=function(){var a;if(this.rememberUpgrade&&d.priorWebsocketSuccess&&-1!=this.transports.indexOf("websocket"))a="websocket";else{if(0===this.transports.length){var b=this;return void setTimeout(function(){b.emit("error","No transports available")},0)}a=this.transports[0]}this.readyState="opening";try{a=this.createTransport(a)}catch(c){return this.transports.shift(),void this.open()}a.open(),this.setTransport(a)},d.prototype.setTransport=function(a){h("setting transport %s",a.name);var b=this;this.transport&&(h("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=a,a.on("drain",function(){b.onDrain()}).on("packet",function(a){b.onPacket(a)}).on("error",function(a){b.onError(a)}).on("close",function(){b.onClose("transport close")})},d.prototype.probe=function(a){function b(){if(m.onlyBinaryUpgrades){var b=!this.supportsBinary&&m.transport.supportsBinary;l=l||b}l||(h('probe transport "%s" opened',a),k.send([{type:"ping",data:"probe"}]),k.once("packet",function(b){if(!l)if("pong"==b.type&&"probe"==b.data){if(h('probe transport "%s" pong',a),m.upgrading=!0,m.emit("upgrading",k),!k)return;d.priorWebsocketSuccess="websocket"==k.name,h('pausing current transport "%s"',m.transport.name),m.transport.pause(function(){l||"closed"!=m.readyState&&(h("changing transport and sending upgrade packet"),j(),m.setTransport(k),k.send([{type:"upgrade"}]),m.emit("upgrade",k),k=null,m.upgrading=!1,m.flush())})}else{h('probe transport "%s" failed',a);var c=new Error("probe error");c.transport=k.name,m.emit("upgradeError",c)}}))}function c(){l||(l=!0,j(),k.close(),k=null)}function e(b){var d=new Error("probe error: "+b);d.transport=k.name,c(),h('probe transport "%s" failed because of error: %s',a,b),m.emit("upgradeError",d)}function f(){e("transport closed")}function g(){e("socket closed")}function i(a){k&&a.name!=k.name&&(h('"%s" works - aborting "%s"',a.name,k.name),c())}function j(){k.removeListener("open",b),k.removeListener("error",e),k.removeListener("close",f),m.removeListener("close",g),m.removeListener("upgrading",i)}h('probing transport "%s"',a);var k=this.createTransport(a,{probe:1}),l=!1,m=this;d.priorWebsocketSuccess=!1,k.once("open",b),k.once("error",e),k.once("close",f),this.once("close",g),this.once("upgrading",i),k.open()},d.prototype.onOpen=function(){if(h("socket open"),this.readyState="open",d.priorWebsocketSuccess="websocket"==this.transport.name,this.emit("open"),this.flush(),"open"==this.readyState&&this.upgrade&&this.transport.pause){h("starting upgrade probes");for(var a=0,b=this.upgrades.length;b>a;a++)this.probe(this.upgrades[a])}},d.prototype.onPacket=function(a){if("opening"==this.readyState||"open"==this.readyState)switch(h('socket receive: type "%s", data "%s"',a.type,a.data),this.emit("packet",a),this.emit("heartbeat"),a.type){case"open":this.onHandshake(l(a.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var b=new Error("server error");b.code=a.data,this.onError(b);break;case"message":this.emit("data",a.data),this.emit("message",a.data)}else h('packet received with socket readyState "%s"',this.readyState)},d.prototype.onHandshake=function(a){this.emit("handshake",a),this.id=a.sid,this.transport.query.sid=a.sid,this.upgrades=this.filterUpgrades(a.upgrades),this.pingInterval=a.pingInterval,this.pingTimeout=a.pingTimeout,this.onOpen(),"closed"!=this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},d.prototype.onHeartbeat=function(a){clearTimeout(this.pingTimeoutTimer);var b=this;b.pingTimeoutTimer=setTimeout(function(){"closed"!=b.readyState&&b.onClose("ping timeout")},a||b.pingInterval+b.pingTimeout)},d.prototype.setPing=function(){var a=this;clearTimeout(a.pingIntervalTimer),a.pingIntervalTimer=setTimeout(function(){h("writing ping packet - expecting pong within %sms",a.pingTimeout),a.ping(),a.onHeartbeat(a.pingTimeout)},a.pingInterval)},d.prototype.ping=function(){var a=this;this.sendPacket("ping",function(){a.emit("ping")})},d.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},d.prototype.flush=function(){"closed"!=this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(h("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},d.prototype.write=d.prototype.send=function(a,b,c){return this.sendPacket("message",a,b,c),this},d.prototype.sendPacket=function(a,b,c,d){if("function"==typeof b&&(d=b,b=void 0),"function"==typeof c&&(d=c,c=null),"closing"!=this.readyState&&"closed"!=this.readyState){c=c||{},c.compress=!1!==c.compress;var e={type:a,data:b,options:c};this.emit("packetCreate",e),this.writeBuffer.push(e),d&&this.once("flush",d),this.flush()}},d.prototype.close=function(){function a(){d.onClose("forced close"),h("socket closing - telling transport to close"),d.transport.close()}function b(){d.removeListener("upgrade",b),d.removeListener("upgradeError",b),a()}function c(){d.once("upgrade",b),d.once("upgradeError",b)}if("opening"==this.readyState||"open"==this.readyState){this.readyState="closing";var d=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?c():a()}):this.upgrading?c():a()}return this},d.prototype.onError=function(a){h("socket error %j",a),d.priorWebsocketSuccess=!1,this.emit("error",a),this.onClose("transport error",a)},d.prototype.onClose=function(a,b){if("opening"==this.readyState||"open"==this.readyState||"closing"==this.readyState){h('socket close with reason: "%s"',a);var c=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",a,b),c.writeBuffer=[],c.prevBufferLen=0}},d.prototype.filterUpgrades=function(a){for(var b=[],c=0,d=a.length;d>c;c++)~i(this.transports,a[c])&&b.push(a[c]);return b}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./transport":4,"./transports":5,"component-emitter":15,debug:17,"engine.io-parser":19,indexof:23,parsejson:26,parseqs:27,parseuri:28}],4:[function(a,b,c){function d(a){this.path=a.path,this.hostname=a.hostname,this.port=a.port,this.secure=a.secure,this.query=a.query,this.timestampParam=a.timestampParam,this.timestampRequests=a.timestampRequests,this.readyState="",this.agent=a.agent||!1,this.socket=a.socket,this.enablesXDR=a.enablesXDR,this.pfx=a.pfx,this.key=a.key,this.passphrase=a.passphrase,this.cert=a.cert,this.ca=a.ca,this.ciphers=a.ciphers,this.rejectUnauthorized=a.rejectUnauthorized,this.extraHeaders=a.extraHeaders}var e=a("engine.io-parser"),f=a("component-emitter");b.exports=d,f(d.prototype),d.prototype.onError=function(a,b){var c=new Error(a);return c.type="TransportError",c.description=b,this.emit("error",c),this},d.prototype.open=function(){return("closed"==this.readyState||""==this.readyState)&&(this.readyState="opening",this.doOpen()),this},d.prototype.close=function(){return("opening"==this.readyState||"open"==this.readyState)&&(this.doClose(),this.onClose()),this},d.prototype.send=function(a){if("open"!=this.readyState)throw new Error("Transport not open");this.write(a)},d.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},d.prototype.onData=function(a){var b=e.decodePacket(a,this.socket.binaryType);this.onPacket(b)},d.prototype.onPacket=function(a){this.emit("packet",a)},d.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},{"component-emitter":15,"engine.io-parser":19}],5:[function(a,b,c){(function(b){function d(a){var c,d=!1,h=!1,i=!1!==a.jsonp;if(b.location){var j="https:"==location.protocol,k=location.port;k||(k=j?443:80),d=a.hostname!=location.hostname||k!=a.port,h=a.secure!=j}if(a.xdomain=d,a.xscheme=h,c=new e(a),"open"in c&&!a.forceJSONP)return new f(a);if(!i)throw new Error("JSONP disabled");return new g(a)}var e=a("xmlhttprequest-ssl"),f=a("./polling-xhr"),g=a("./polling-jsonp"),h=a("./websocket");c.polling=d,c.websocket=h}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./polling-jsonp":6,"./polling-xhr":7,"./websocket":9,"xmlhttprequest-ssl":10}],6:[function(a,b,c){(function(c){function d(){}function e(a){f.call(this,a),this.query=this.query||{},h||(c.___eio||(c.___eio=[]),h=c.___eio),this.index=h.length;var b=this;h.push(function(a){b.onData(a)}),this.query.j=this.index,c.document&&c.addEventListener&&c.addEventListener("beforeunload",function(){b.script&&(b.script.onerror=d)},!1)}var f=a("./polling"),g=a("component-inherit");b.exports=e;var h,i=/\n/g,j=/\\n/g;g(e,f),e.prototype.supportsBinary=!1,e.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),f.prototype.doClose.call(this)},e.prototype.doPoll=function(){var a=this,b=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),b.async=!0,b.src=this.uri(),b.onerror=function(b){a.onError("jsonp poll error",b)};var c=document.getElementsByTagName("script")[0];c?c.parentNode.insertBefore(b,c):(document.head||document.body).appendChild(b),this.script=b;var d="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);d&&setTimeout(function(){var a=document.createElement("iframe");document.body.appendChild(a),document.body.removeChild(a)},100)},e.prototype.doWrite=function(a,b){function c(){d(),b()}function d(){if(e.iframe)try{e.form.removeChild(e.iframe)}catch(a){e.onError("jsonp polling iframe removal error",a)}try{var b='<iframe src="javascript:0" name="'+e.iframeId+'">';f=document.createElement(b)}catch(a){f=document.createElement("iframe"),f.name=e.iframeId,f.src="javascript:0"}f.id=e.iframeId,e.form.appendChild(f),e.iframe=f}var e=this;if(!this.form){var f,g=document.createElement("form"),h=document.createElement("textarea"),k=this.iframeId="eio_iframe_"+this.index;g.className="socketio",g.style.position="absolute",g.style.top="-1000px",g.style.left="-1000px",g.target=k,g.method="POST",g.setAttribute("accept-charset","utf-8"),h.name="d",g.appendChild(h),document.body.appendChild(g),this.form=g,this.area=h}this.form.action=this.uri(),d(),a=a.replace(j,"\\\n"),this.area.value=a.replace(i,"\\n");try{this.form.submit()}catch(l){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"==e.iframe.readyState&&c()}:this.iframe.onload=c}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./polling":8,"component-inherit":16}],7:[function(a,b,c){(function(c){function d(){}function e(a){if(i.call(this,a),c.location){var b="https:"==location.protocol,d=location.port;d||(d=b?443:80),this.xd=a.hostname!=c.location.hostname||d!=a.port,this.xs=a.secure!=b}else this.extraHeaders=a.extraHeaders}function f(a){this.method=a.method||"GET",this.uri=a.uri,this.xd=!!a.xd,this.xs=!!a.xs,this.async=!1!==a.async,this.data=void 0!=a.data?a.data:null,this.agent=a.agent,this.isBinary=a.isBinary,this.supportsBinary=a.supportsBinary,this.enablesXDR=a.enablesXDR,this.pfx=a.pfx,this.key=a.key,this.passphrase=a.passphrase,this.cert=a.cert,this.ca=a.ca,this.ciphers=a.ciphers,this.rejectUnauthorized=a.rejectUnauthorized,this.extraHeaders=a.extraHeaders,this.create()}function g(){for(var a in f.requests)f.requests.hasOwnProperty(a)&&f.requests[a].abort()}var h=a("xmlhttprequest-ssl"),i=a("./polling"),j=a("component-emitter"),k=a("component-inherit"),l=a("debug")("engine.io-client:polling-xhr");b.exports=e,b.exports.Request=f,k(e,i),e.prototype.supportsBinary=!0,e.prototype.request=function(a){return a=a||{},a.uri=this.uri(),a.xd=this.xd,a.xs=this.xs,a.agent=this.agent||!1,a.supportsBinary=this.supportsBinary,a.enablesXDR=this.enablesXDR,a.pfx=this.pfx,a.key=this.key,a.passphrase=this.passphrase,a.cert=this.cert,a.ca=this.ca,a.ciphers=this.ciphers,a.rejectUnauthorized=this.rejectUnauthorized,a.extraHeaders=this.extraHeaders,new f(a)},e.prototype.doWrite=function(a,b){var c="string"!=typeof a&&void 0!==a,d=this.request({method:"POST",data:a,isBinary:c}),e=this;d.on("success",b),d.on("error",function(a){e.onError("xhr post error",a)}),this.sendXhr=d},e.prototype.doPoll=function(){l("xhr poll");var a=this.request(),b=this;a.on("data",function(a){b.onData(a)}),a.on("error",function(a){b.onError("xhr poll error",a)}),this.pollXhr=a},j(f.prototype),f.prototype.create=function(){var a={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};a.pfx=this.pfx,a.key=this.key,a.passphrase=this.passphrase,a.cert=this.cert,a.ca=this.ca,a.ciphers=this.ciphers,a.rejectUnauthorized=this.rejectUnauthorized;var b=this.xhr=new h(a),d=this;try{l("xhr open %s: %s",this.method,this.uri),b.open(this.method,this.uri,this.async);try{if(this.extraHeaders){b.setDisableHeaderCheck(!0);for(var e in this.extraHeaders)this.extraHeaders.hasOwnProperty(e)&&b.setRequestHeader(e,this.extraHeaders[e])}}catch(g){}if(this.supportsBinary&&(b.responseType="arraybuffer"),"POST"==this.method)try{this.isBinary?b.setRequestHeader("Content-type","application/octet-stream"):b.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(g){}"withCredentials"in b&&(b.withCredentials=!0),this.hasXDR()?(b.onload=function(){d.onLoad()},b.onerror=function(){d.onError(b.responseText)}):b.onreadystatechange=function(){4==b.readyState&&(200==b.status||1223==b.status?d.onLoad():setTimeout(function(){d.onError(b.status)},0))},l("xhr data %s",this.data),b.send(this.data)}catch(g){return void setTimeout(function(){d.onError(g)},0)}c.document&&(this.index=f.requestsCount++,f.requests[this.index]=this)},f.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},f.prototype.onData=function(a){this.emit("data",a),this.onSuccess()},f.prototype.onError=function(a){this.emit("error",a),this.cleanup(!0)},f.prototype.cleanup=function(a){if("undefined"!=typeof this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=d:this.xhr.onreadystatechange=d,a)try{this.xhr.abort()}catch(b){}c.document&&delete f.requests[this.index],this.xhr=null}},f.prototype.onLoad=function(){var a;try{var b;try{b=this.xhr.getResponseHeader("Content-Type").split(";")[0]}catch(c){}if("application/octet-stream"===b)a=this.xhr.response;else if(this.supportsBinary)try{a=String.fromCharCode.apply(null,new Uint8Array(this.xhr.response))}catch(c){for(var d=new Uint8Array(this.xhr.response),e=[],f=0,g=d.length;g>f;f++)e.push(d[f]);a=String.fromCharCode.apply(null,e)}else a=this.xhr.responseText}catch(c){this.onError(c)}null!=a&&this.onData(a)},f.prototype.hasXDR=function(){return"undefined"!=typeof c.XDomainRequest&&!this.xs&&this.enablesXDR},f.prototype.abort=function(){this.cleanup()},c.document&&(f.requestsCount=0,f.requests={},c.attachEvent?c.attachEvent("onunload",g):c.addEventListener&&c.addEventListener("beforeunload",g,!1))}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./polling":8,"component-emitter":15,"component-inherit":16,debug:17,"xmlhttprequest-ssl":10}],8:[function(a,b,c){function d(a){var b=a&&a.forceBase64;(!k||b)&&(this.supportsBinary=!1),e.call(this,a)}var e=a("../transport"),f=a("parseqs"),g=a("engine.io-parser"),h=a("component-inherit"),i=a("yeast"),j=a("debug")("engine.io-client:polling");b.exports=d;var k=function(){var b=a("xmlhttprequest-ssl"),c=new b({xdomain:!1});return null!=c.responseType}();h(d,e),d.prototype.name="polling",d.prototype.doOpen=function(){this.poll()},d.prototype.pause=function(a){function b(){j("paused"),c.readyState="paused",a()}var c=this;if(this.readyState="pausing",this.polling||!this.writable){var d=0;this.polling&&(j("we are currently polling - waiting to pause"),d++,this.once("pollComplete",function(){j("pre-pause polling complete"),--d||b()})),this.writable||(j("we are currently writing - waiting to pause"),d++,this.once("drain",function(){j("pre-pause writing complete"),--d||b()}))}else b()},d.prototype.poll=function(){j("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},d.prototype.onData=function(a){var b=this;j("polling got data %s",a);var c=function(a,c,d){return"opening"==b.readyState&&b.onOpen(),"close"==a.type?(b.onClose(),!1):void b.onPacket(a)};g.decodePayload(a,this.socket.binaryType,c),"closed"!=this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"==this.readyState?this.poll():j('ignoring poll - transport state "%s"',this.readyState))},d.prototype.doClose=function(){function a(){j("writing close packet"),b.write([{type:"close"}])}var b=this;"open"==this.readyState?(j("transport open - closing"),a()):(j("transport not open - deferring close"),this.once("open",a))},d.prototype.write=function(a){var b=this;this.writable=!1;var c=function(){b.writable=!0,b.emit("drain")},b=this;g.encodePayload(a,this.supportsBinary,function(a){b.doWrite(a,c)})},d.prototype.uri=function(){var a=this.query||{},b=this.secure?"https":"http",c="";!1!==this.timestampRequests&&(a[this.timestampParam]=i()),this.supportsBinary||a.sid||(a.b64=1),a=f.encode(a),this.port&&("https"==b&&443!=this.port||"http"==b&&80!=this.port)&&(c=":"+this.port),a.length&&(a="?"+a);var d=-1!==this.hostname.indexOf(":");return b+"://"+(d?"["+this.hostname+"]":this.hostname)+c+this.path+a}},{"../transport":4,"component-inherit":16,debug:17,"engine.io-parser":19,parseqs:27,"xmlhttprequest-ssl":10,yeast:30}],9:[function(a,b,c){(function(c){function d(a){var b=a&&a.forceBase64;b&&(this.supportsBinary=!1),this.perMessageDeflate=a.perMessageDeflate,e.call(this,a)}var e=a("../transport"),f=a("engine.io-parser"),g=a("parseqs"),h=a("component-inherit"),i=a("yeast"),j=a("debug")("engine.io-client:websocket"),k=c.WebSocket||c.MozWebSocket,l=k||("undefined"!=typeof window?null:a("ws"));b.exports=d,h(d,e),d.prototype.name="websocket",d.prototype.supportsBinary=!0,d.prototype.doOpen=function(){if(this.check()){var a=this.uri(),b=void 0,c={agent:this.agent,perMessageDeflate:this.perMessageDeflate};c.pfx=this.pfx,c.key=this.key,c.passphrase=this.passphrase,c.cert=this.cert,c.ca=this.ca,c.ciphers=this.ciphers,c.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(c.headers=this.extraHeaders),this.ws=k?new l(a):new l(a,b,c),void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="buffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},d.prototype.addEventListeners=function(){var a=this;this.ws.onopen=function(){a.onOpen()},this.ws.onclose=function(){a.onClose()},this.ws.onmessage=function(b){a.onData(b.data)},this.ws.onerror=function(b){a.onError("websocket error",b)}},"undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)&&(d.prototype.onData=function(a){var b=this;setTimeout(function(){e.prototype.onData.call(b,a)},0)}),d.prototype.write=function(a){function b(){d.emit("flush"),setTimeout(function(){d.writable=!0,d.emit("drain")},0)}var d=this;this.writable=!1;for(var e=a.length,g=0,h=e;h>g;g++)!function(a){f.encodePacket(a,d.supportsBinary,function(f){if(!k){var g={};if(a.options&&(g.compress=a.options.compress),d.perMessageDeflate){var h="string"==typeof f?c.Buffer.byteLength(f):f.length;h<d.perMessageDeflate.threshold&&(g.compress=!1)}}try{k?d.ws.send(f):d.ws.send(f,g)}catch(i){j("websocket closed before onclose event")}--e||b()})}(a[g])},d.prototype.onClose=function(){e.prototype.onClose.call(this)},d.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},d.prototype.uri=function(){var a=this.query||{},b=this.secure?"wss":"ws",c="";this.port&&("wss"==b&&443!=this.port||"ws"==b&&80!=this.port)&&(c=":"+this.port),this.timestampRequests&&(a[this.timestampParam]=i()),this.supportsBinary||(a.b64=1),a=g.encode(a),a.length&&(a="?"+a);var d=-1!==this.hostname.indexOf(":");return b+"://"+(d?"["+this.hostname+"]":this.hostname)+c+this.path+a},d.prototype.check=function(){return!(!l||"__initialize"in l&&this.name===d.prototype.name)}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"../transport":4,"component-inherit":16,debug:17,"engine.io-parser":19,parseqs:27,ws:void 0,yeast:30}],10:[function(a,b,c){var d=a("has-cors");b.exports=function(a){var b=a.xdomain,c=a.xscheme,e=a.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!b||d))return new XMLHttpRequest}catch(f){}try{if("undefined"!=typeof XDomainRequest&&!c&&e)return new XDomainRequest}catch(f){}if(!b)try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(f){}}},{"has-cors":22}],11:[function(a,b,c){function d(a,b,c){function d(a,e){if(d.count<=0)throw new Error("after called too many times");--d.count,a?(f=!0,b(a),b=c):0!==d.count||f||b(null,e)}var f=!1;return c=c||e,d.count=a,0===a?b():d}function e(){}b.exports=d},{}],12:[function(a,b,c){b.exports=function(a,b,c){var d=a.byteLength;if(b=b||0,c=c||d,a.slice)return a.slice(b,c);if(0>b&&(b+=d),0>c&&(c+=d),c>d&&(c=d),b>=d||b>=c||0===d)return new ArrayBuffer(0);for(var e=new Uint8Array(a),f=new Uint8Array(c-b),g=b,h=0;c>g;g++,h++)f[h]=e[g];return f.buffer}},{}],13:[function(a,b,c){!function(a){"use strict";c.encode=function(b){var c,d=new Uint8Array(b),e=d.length,f="";for(c=0;e>c;c+=3)f+=a[d[c]>>2],f+=a[(3&d[c])<<4|d[c+1]>>4],f+=a[(15&d[c+1])<<2|d[c+2]>>6],f+=a[63&d[c+2]];return e%3===2?f=f.substring(0,f.length-1)+"=":e%3===1&&(f=f.substring(0,f.length-2)+"=="),f},c.decode=function(b){var c,d,e,f,g,h=.75*b.length,i=b.length,j=0;"="===b[b.length-1]&&(h--,"="===b[b.length-2]&&h--);var k=new ArrayBuffer(h),l=new Uint8Array(k);for(c=0;i>c;c+=4)d=a.indexOf(b[c]),e=a.indexOf(b[c+1]),f=a.indexOf(b[c+2]),g=a.indexOf(b[c+3]),l[j++]=d<<2|e>>4,l[j++]=(15&e)<<4|f>>2,l[j++]=(3&f)<<6|63&g;return k}}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},{}],14:[function(a,b,c){(function(a){function c(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.buffer instanceof ArrayBuffer){var d=c.buffer;if(c.byteLength!==d.byteLength){var e=new Uint8Array(c.byteLength);e.set(new Uint8Array(d,c.byteOffset,c.byteLength)),d=e.buffer}a[b]=d}}}function d(a,b){b=b||{};var d=new f;c(a);for(var e=0;e<a.length;e++)d.append(a[e]);return b.type?d.getBlob(b.type):d.getBlob()}function e(a,b){return c(a),new Blob(a,b||{})}var f=a.BlobBuilder||a.WebKitBlobBuilder||a.MSBlobBuilder||a.MozBlobBuilder,g=function(){try{var a=new Blob(["hi"]);return 2===a.size}catch(b){return!1}}(),h=g&&function(){try{var a=new Blob([new Uint8Array([1,2])]);return 2===a.size}catch(b){return!1}}(),i=f&&f.prototype.append&&f.prototype.getBlob;b.exports=function(){return g?h?a.Blob:e:i?d:void 0}()}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{}],15:[function(a,b,c){function d(a){return a?e(a):void 0}function e(a){for(var b in d.prototype)a[b]=d.prototype[b];return a}b.exports=d,d.prototype.on=d.prototype.addEventListener=function(a,b){return this._callbacks=this._callbacks||{},(this._callbacks[a]=this._callbacks[a]||[]).push(b),this},d.prototype.once=function(a,b){function c(){d.off(a,c),b.apply(this,arguments)}var d=this;return this._callbacks=this._callbacks||{},c.fn=b,this.on(a,c),this},d.prototype.off=d.prototype.removeListener=d.prototype.removeAllListeners=d.prototype.removeEventListener=function(a,b){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var c=this._callbacks[a];if(!c)return this;if(1==arguments.length)return delete this._callbacks[a],this;for(var d,e=0;e<c.length;e++)if(d=c[e],d===b||d.fn===b){c.splice(e,1);break}return this},d.prototype.emit=function(a){this._callbacks=this._callbacks||{};var b=[].slice.call(arguments,1),c=this._callbacks[a];if(c){c=c.slice(0);for(var d=0,e=c.length;e>d;++d)c[d].apply(this,b)}return this},d.prototype.listeners=function(a){return this._callbacks=this._callbacks||{},this._callbacks[a]||[]},d.prototype.hasListeners=function(a){return!!this.listeners(a).length}},{}],16:[function(a,b,c){b.exports=function(a,b){var c=function(){};c.prototype=b.prototype,a.prototype=new c,a.prototype.constructor=a}},{}],17:[function(a,b,c){function d(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function e(){var a=arguments,b=this.useColors;if(a[0]=(b?"%c":"")+this.namespace+(b?" %c":" ")+a[0]+(b?"%c ":" ")+"+"+c.humanize(this.diff),!b)return a;var d="color: "+this.color;a=[a[0],d,"color: inherit"].concat(Array.prototype.slice.call(a,1));var e=0,f=0;return a[0].replace(/%[a-z%]/g,function(a){"%%"!==a&&(e++,"%c"===a&&(f=e))}),a.splice(f,0,d),a}function f(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function g(a){try{null==a?c.storage.removeItem("debug"):c.storage.debug=a}catch(b){}}function h(){var a;try{a=c.storage.debug}catch(b){}return a}function i(){try{return window.localStorage}catch(a){}}c=b.exports=a("./debug"),c.log=f,c.formatArgs=e,c.save=g,c.load=h,c.useColors=d,c.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:i(),c.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],c.formatters.j=function(a){return JSON.stringify(a)},c.enable(h())},{"./debug":18}],18:[function(a,b,c){function d(){return c.colors[k++%c.colors.length]}function e(a){function b(){}function e(){var a=e,b=+new Date,f=b-(j||b);a.diff=f,a.prev=j,a.curr=b,j=b,null==a.useColors&&(a.useColors=c.useColors()),null==a.color&&a.useColors&&(a.color=d());var g=Array.prototype.slice.call(arguments);g[0]=c.coerce(g[0]),"string"!=typeof g[0]&&(g=["%o"].concat(g));var h=0;g[0]=g[0].replace(/%([a-z%])/g,function(b,d){if("%%"===b)return b;h++;var e=c.formatters[d];if("function"==typeof e){var f=g[h];b=e.call(a,f),g.splice(h,1),h--}return b}),"function"==typeof c.formatArgs&&(g=c.formatArgs.apply(a,g));var i=e.log||c.log||console.log.bind(console);i.apply(a,g)}b.enabled=!1,e.enabled=!0;var f=c.enabled(a)?e:b;return f.namespace=a,f}function f(a){c.save(a);for(var b=(a||"").split(/[\s,]+/),d=b.length,e=0;d>e;e++)b[e]&&(a=b[e].replace(/\*/g,".*?"),"-"===a[0]?c.skips.push(new RegExp("^"+a.substr(1)+"$")):c.names.push(new RegExp("^"+a+"$")))}function g(){c.enable("")}function h(a){var b,d;for(b=0,d=c.skips.length;d>b;b++)if(c.skips[b].test(a))return!1;for(b=0,d=c.names.length;d>b;b++)if(c.names[b].test(a))return!0;return!1}function i(a){return a instanceof Error?a.stack||a.message:a}c=b.exports=e,c.coerce=i,c.disable=g,c.enable=f,c.enabled=h,c.humanize=a("ms"),c.names=[],c.skips=[],c.formatters={};var j,k=0},{ms:25}],19:[function(a,b,c){(function(b){function d(a,b){var d="b"+c.packets[a.type]+a.data.data;return b(d)}function e(a,b,d){if(!b)return c.encodeBase64Packet(a,d);var e=a.data,f=new Uint8Array(e),g=new Uint8Array(1+e.byteLength);g[0]=r[a.type];for(var h=0;h<f.length;h++)g[h+1]=f[h];return d(g.buffer)}function f(a,b,d){if(!b)return c.encodeBase64Packet(a,d);var e=new FileReader;return e.onload=function(){a.data=e.result,c.encodePacket(a,b,!0,d)},e.readAsArrayBuffer(a.data)}function g(a,b,d){if(!b)return c.encodeBase64Packet(a,d);if(q)return f(a,b,d);var e=new Uint8Array(1);e[0]=r[a.type];var g=new u([e.buffer,a.data]);return d(g)}function h(a,b,c){for(var d=new Array(a.length),e=m(a.length,c),f=function(a,c,e){b(c,function(b,c){d[a]=c,e(b,d)})},g=0;g<a.length;g++)f(g,a[g],e)}var i=a("./keys"),j=a("has-binary"),k=a("arraybuffer.slice"),l=a("base64-arraybuffer"),m=a("after"),n=a("utf8"),o=navigator.userAgent.match(/Android/i),p=/PhantomJS/i.test(navigator.userAgent),q=o||p;c.protocol=3;var r=c.packets={open:0,close:1,ping:2,pong:3,
message:4,upgrade:5,noop:6},s=i(r),t={type:"error",data:"parser error"},u=a("blob");c.encodePacket=function(a,c,f,h){"function"==typeof c&&(h=c,c=!1),"function"==typeof f&&(h=f,f=null);var i=void 0===a.data?void 0:a.data.buffer||a.data;if(b.ArrayBuffer&&i instanceof ArrayBuffer)return e(a,c,h);if(u&&i instanceof b.Blob)return g(a,c,h);if(i&&i.base64)return d(a,h);var j=r[a.type];return void 0!==a.data&&(j+=f?n.encode(String(a.data)):String(a.data)),h(""+j)},c.encodeBase64Packet=function(a,d){var e="b"+c.packets[a.type];if(u&&a.data instanceof b.Blob){var f=new FileReader;return f.onload=function(){var a=f.result.split(",")[1];d(e+a)},f.readAsDataURL(a.data)}var g;try{g=String.fromCharCode.apply(null,new Uint8Array(a.data))}catch(h){for(var i=new Uint8Array(a.data),j=new Array(i.length),k=0;k<i.length;k++)j[k]=i[k];g=String.fromCharCode.apply(null,j)}return e+=b.btoa(g),d(e)},c.decodePacket=function(a,b,d){if("string"==typeof a||void 0===a){if("b"==a.charAt(0))return c.decodeBase64Packet(a.substr(1),b);if(d)try{a=n.decode(a)}catch(e){return t}var f=a.charAt(0);return Number(f)==f&&s[f]?a.length>1?{type:s[f],data:a.substring(1)}:{type:s[f]}:t}var g=new Uint8Array(a),f=g[0],h=k(a,1);return u&&"blob"===b&&(h=new u([h])),{type:s[f],data:h}},c.decodeBase64Packet=function(a,c){var d=s[a.charAt(0)];if(!b.ArrayBuffer)return{type:d,data:{base64:!0,data:a.substr(1)}};var e=l.decode(a.substr(1));return"blob"===c&&u&&(e=new u([e])),{type:d,data:e}},c.encodePayload=function(a,b,d){function e(a){return a.length+":"+a}function f(a,d){c.encodePacket(a,g?b:!1,!0,function(a){d(null,e(a))})}"function"==typeof b&&(d=b,b=null);var g=j(a);return b&&g?u&&!q?c.encodePayloadAsBlob(a,d):c.encodePayloadAsArrayBuffer(a,d):a.length?void h(a,f,function(a,b){return d(b.join(""))}):d("0:")},c.decodePayload=function(a,b,d){if("string"!=typeof a)return c.decodePayloadAsBinary(a,b,d);"function"==typeof b&&(d=b,b=null);var e;if(""==a)return d(t,0,1);for(var f,g,h="",i=0,j=a.length;j>i;i++){var k=a.charAt(i);if(":"!=k)h+=k;else{if(""==h||h!=(f=Number(h)))return d(t,0,1);if(g=a.substr(i+1,f),h!=g.length)return d(t,0,1);if(g.length){if(e=c.decodePacket(g,b,!0),t.type==e.type&&t.data==e.data)return d(t,0,1);var l=d(e,i+f,j);if(!1===l)return}i+=f,h=""}}return""!=h?d(t,0,1):void 0},c.encodePayloadAsArrayBuffer=function(a,b){function d(a,b){c.encodePacket(a,!0,!0,function(a){return b(null,a)})}return a.length?void h(a,d,function(a,c){var d=c.reduce(function(a,b){var c;return c="string"==typeof b?b.length:b.byteLength,a+c.toString().length+c+2},0),e=new Uint8Array(d),f=0;return c.forEach(function(a){var b="string"==typeof a,c=a;if(b){for(var d=new Uint8Array(a.length),g=0;g<a.length;g++)d[g]=a.charCodeAt(g);c=d.buffer}b?e[f++]=0:e[f++]=1;for(var h=c.byteLength.toString(),g=0;g<h.length;g++)e[f++]=parseInt(h[g]);e[f++]=255;for(var d=new Uint8Array(c),g=0;g<d.length;g++)e[f++]=d[g]}),b(e.buffer)}):b(new ArrayBuffer(0))},c.encodePayloadAsBlob=function(a,b){function d(a,b){c.encodePacket(a,!0,!0,function(a){var c=new Uint8Array(1);if(c[0]=1,"string"==typeof a){for(var d=new Uint8Array(a.length),e=0;e<a.length;e++)d[e]=a.charCodeAt(e);a=d.buffer,c[0]=0}for(var f=a instanceof ArrayBuffer?a.byteLength:a.size,g=f.toString(),h=new Uint8Array(g.length+1),e=0;e<g.length;e++)h[e]=parseInt(g[e]);if(h[g.length]=255,u){var i=new u([c.buffer,h.buffer,a]);b(null,i)}})}h(a,d,function(a,c){return b(new u(c))})},c.decodePayloadAsBinary=function(a,b,d){"function"==typeof b&&(d=b,b=null);for(var e=a,f=[],g=!1;e.byteLength>0;){for(var h=new Uint8Array(e),i=0===h[0],j="",l=1;255!=h[l];l++){if(j.length>310){g=!0;break}j+=h[l]}if(g)return d(t,0,1);e=k(e,2+j.length),j=parseInt(j);var m=k(e,0,j);if(i)try{m=String.fromCharCode.apply(null,new Uint8Array(m))}catch(n){var o=new Uint8Array(m);m="";for(var l=0;l<o.length;l++)m+=String.fromCharCode(o[l])}f.push(m),e=k(e,j)}var p=f.length;f.forEach(function(a,e){d(c.decodePacket(a,b,!0),e,p)})}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./keys":20,after:11,"arraybuffer.slice":12,"base64-arraybuffer":13,blob:14,"has-binary":21,utf8:29}],20:[function(a,b,c){b.exports=Object.keys||function(a){var b=[],c=Object.prototype.hasOwnProperty;for(var d in a)c.call(a,d)&&b.push(d);return b}},{}],21:[function(a,b,c){(function(c){function d(a){function b(a){if(!a)return!1;if(c.Buffer&&c.Buffer.isBuffer(a)||c.ArrayBuffer&&a instanceof ArrayBuffer||c.Blob&&a instanceof Blob||c.File&&a instanceof File)return!0;if(e(a)){for(var d=0;d<a.length;d++)if(b(a[d]))return!0}else if(a&&"object"==typeof a){a.toJSON&&(a=a.toJSON());for(var f in a)if(Object.prototype.hasOwnProperty.call(a,f)&&b(a[f]))return!0}return!1}return b(a)}var e=a("isarray");b.exports=d}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{isarray:24}],22:[function(a,b,c){try{b.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(d){b.exports=!1}},{}],23:[function(a,b,c){var d=[].indexOf;b.exports=function(a,b){if(d)return a.indexOf(b);for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1}},{}],24:[function(a,b,c){b.exports=Array.isArray||function(a){return"[object Array]"==Object.prototype.toString.call(a)}},{}],25:[function(a,b,c){function d(a){if(a=""+a,!(a.length>1e4)){var b=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(a);if(b){var c=parseFloat(b[1]),d=(b[2]||"ms").toLowerCase();switch(d){case"years":case"year":case"yrs":case"yr":case"y":return c*l;case"days":case"day":case"d":return c*k;case"hours":case"hour":case"hrs":case"hr":case"h":return c*j;case"minutes":case"minute":case"mins":case"min":case"m":return c*i;case"seconds":case"second":case"secs":case"sec":case"s":return c*h;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return c}}}}function e(a){return a>=k?Math.round(a/k)+"d":a>=j?Math.round(a/j)+"h":a>=i?Math.round(a/i)+"m":a>=h?Math.round(a/h)+"s":a+"ms"}function f(a){return g(a,k,"day")||g(a,j,"hour")||g(a,i,"minute")||g(a,h,"second")||a+" ms"}function g(a,b,c){return b>a?void 0:1.5*b>a?Math.floor(a/b)+" "+c:Math.ceil(a/b)+" "+c+"s"}var h=1e3,i=60*h,j=60*i,k=24*j,l=365.25*k;b.exports=function(a,b){return b=b||{},"string"==typeof a?d(a):b["long"]?f(a):e(a)}},{}],26:[function(a,b,c){(function(a){var c=/^[\],:{}\s]*$/,d=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,e=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,f=/(?:^|:|,)(?:\s*\[)+/g,g=/^\s+/,h=/\s+$/;b.exports=function(b){return"string"==typeof b&&b?(b=b.replace(g,"").replace(h,""),a.JSON&&JSON.parse?JSON.parse(b):c.test(b.replace(d,"@").replace(e,"]").replace(f,""))?new Function("return "+b)():void 0):null}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{}],27:[function(a,b,c){c.encode=function(a){var b="";for(var c in a)a.hasOwnProperty(c)&&(b.length&&(b+="&"),b+=encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b},c.decode=function(a){for(var b={},c=a.split("&"),d=0,e=c.length;e>d;d++){var f=c[d].split("=");b[decodeURIComponent(f[0])]=decodeURIComponent(f[1])}return b}},{}],28:[function(a,b,c){var d=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,e=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];b.exports=function(a){var b=a,c=a.indexOf("["),f=a.indexOf("]");-1!=c&&-1!=f&&(a=a.substring(0,c)+a.substring(c,f).replace(/:/g,";")+a.substring(f,a.length));for(var g=d.exec(a||""),h={},i=14;i--;)h[e[i]]=g[i]||"";return-1!=c&&-1!=f&&(h.source=b,h.host=h.host.substring(1,h.host.length-1).replace(/;/g,":"),h.authority=h.authority.replace("[","").replace("]","").replace(/;/g,":"),h.ipv6uri=!0),h}},{}],29:[function(b,c,d){(function(b){!function(e){function f(a){for(var b,c,d=[],e=0,f=a.length;f>e;)b=a.charCodeAt(e++),b>=55296&&56319>=b&&f>e?(c=a.charCodeAt(e++),56320==(64512&c)?d.push(((1023&b)<<10)+(1023&c)+65536):(d.push(b),e--)):d.push(b);return d}function g(a){for(var b,c=a.length,d=-1,e="";++d<c;)b=a[d],b>65535&&(b-=65536,e+=u(b>>>10&1023|55296),b=56320|1023&b),e+=u(b);return e}function h(a){if(a>=55296&&57343>=a)throw Error("Lone surrogate U+"+a.toString(16).toUpperCase()+" is not a scalar value")}function i(a,b){return u(a>>b&63|128)}function j(a){if(0==(4294967168&a))return u(a);var b="";return 0==(4294965248&a)?b=u(a>>6&31|192):0==(4294901760&a)?(h(a),b=u(a>>12&15|224),b+=i(a,6)):0==(4292870144&a)&&(b=u(a>>18&7|240),b+=i(a,12),b+=i(a,6)),b+=u(63&a|128)}function k(a){for(var b,c=f(a),d=c.length,e=-1,g="";++e<d;)b=c[e],g+=j(b);return g}function l(){if(t>=s)throw Error("Invalid byte index");var a=255&r[t];if(t++,128==(192&a))return 63&a;throw Error("Invalid continuation byte")}function m(){var a,b,c,d,e;if(t>s)throw Error("Invalid byte index");if(t==s)return!1;if(a=255&r[t],t++,0==(128&a))return a;if(192==(224&a)){var b=l();if(e=(31&a)<<6|b,e>=128)return e;throw Error("Invalid continuation byte")}if(224==(240&a)){if(b=l(),c=l(),e=(15&a)<<12|b<<6|c,e>=2048)return h(e),e;throw Error("Invalid continuation byte")}if(240==(248&a)&&(b=l(),c=l(),d=l(),e=(15&a)<<18|b<<12|c<<6|d,e>=65536&&1114111>=e))return e;throw Error("Invalid UTF-8 detected")}function n(a){r=f(a),s=r.length,t=0;for(var b,c=[];(b=m())!==!1;)c.push(b);return g(c)}var o="object"==typeof d&&d,p="object"==typeof c&&c&&c.exports==o&&c,q="object"==typeof b&&b;(q.global===q||q.window===q)&&(e=q);var r,s,t,u=String.fromCharCode,v={version:"2.0.0",encode:k,decode:n};if("function"==typeof a&&"object"==typeof a.amd&&a.amd)a(function(){return v});else if(o&&!o.nodeType)if(p)p.exports=v;else{var w={},x=w.hasOwnProperty;for(var y in v)x.call(v,y)&&(o[y]=v[y])}else e.utf8=v}(this)}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{}],30:[function(a,b,c){"use strict";function d(a){var b="";do b=h[a%i]+b,a=Math.floor(a/i);while(a>0);return b}function e(a){var b=0;for(l=0;l<a.length;l++)b=b*i+j[a.charAt(l)];return b}function f(){var a=d(+new Date);return a!==g?(k=0,g=a):a+"."+d(k++)}for(var g,h="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),i=64,j={},k=0,l=0;i>l;l++)j[h[l]]=l;f.encode=d,f.decode=e,b.exports=f},{}],31:[function(a,b,c){function d(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d=e(a),f=d.source,j=d.id,k=d.path,l=i[j]&&k in i[j].nsps,m=b.forceNew||b["force new connection"]||!1===b.multiplex||l;return m?(h("ignoring socket cache for %s",f),c=g(f,b)):(i[j]||(h("new io instance for %s",f),i[j]=g(f,b)),c=i[j]),c.socket(d.path)}var e=a("./url"),f=a("socket.io-parser"),g=a("./manager"),h=a("debug")("socket.io-client");b.exports=c=d;var i=c.managers={};c.protocol=f.protocol,c.connect=d,c.Manager=a("./manager"),c.Socket=a("./socket")},{"./manager":32,"./socket":34,"./url":35,debug:39,"socket.io-parser":47}],32:[function(a,b,c){function d(a,b){return this instanceof d?(a&&"object"==typeof a&&(b=a,a=void 0),b=b||{},b.path=b.path||"/socket.io",this.nsps={},this.subs=[],this.opts=b,this.reconnection(b.reconnection!==!1),this.reconnectionAttempts(b.reconnectionAttempts||1/0),this.reconnectionDelay(b.reconnectionDelay||1e3),this.reconnectionDelayMax(b.reconnectionDelayMax||5e3),this.randomizationFactor(b.randomizationFactor||.5),this.backoff=new m({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==b.timeout?2e4:b.timeout),this.readyState="closed",this.uri=a,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[],this.encoder=new h.Encoder,this.decoder=new h.Decoder,this.autoConnect=b.autoConnect!==!1,void(this.autoConnect&&this.open())):new d(a,b)}var e=a("engine.io-client"),f=a("./socket"),g=a("component-emitter"),h=a("socket.io-parser"),i=a("./on"),j=a("component-bind"),k=a("debug")("socket.io-client:manager"),l=a("indexof"),m=a("backo2"),n=Object.prototype.hasOwnProperty;b.exports=d,d.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var a in this.nsps)n.call(this.nsps,a)&&this.nsps[a].emit.apply(this.nsps[a],arguments)},d.prototype.updateSocketIds=function(){for(var a in this.nsps)n.call(this.nsps,a)&&(this.nsps[a].id=this.engine.id)},g(d.prototype),d.prototype.reconnection=function(a){return arguments.length?(this._reconnection=!!a,this):this._reconnection},d.prototype.reconnectionAttempts=function(a){return arguments.length?(this._reconnectionAttempts=a,this):this._reconnectionAttempts},d.prototype.reconnectionDelay=function(a){return arguments.length?(this._reconnectionDelay=a,this.backoff&&this.backoff.setMin(a),this):this._reconnectionDelay},d.prototype.randomizationFactor=function(a){return arguments.length?(this._randomizationFactor=a,this.backoff&&this.backoff.setJitter(a),this):this._randomizationFactor},d.prototype.reconnectionDelayMax=function(a){return arguments.length?(this._reconnectionDelayMax=a,this.backoff&&this.backoff.setMax(a),this):this._reconnectionDelayMax},d.prototype.timeout=function(a){return arguments.length?(this._timeout=a,this):this._timeout},d.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},d.prototype.open=d.prototype.connect=function(a){if(k("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;k("opening %s",this.uri),this.engine=e(this.uri,this.opts);var b=this.engine,c=this;this.readyState="opening",this.skipReconnect=!1;var d=i(b,"open",function(){c.onopen(),a&&a()}),f=i(b,"error",function(b){if(k("connect_error"),c.cleanup(),c.readyState="closed",c.emitAll("connect_error",b),a){var d=new Error("Connection error");d.data=b,a(d)}else c.maybeReconnectOnOpen()});if(!1!==this._timeout){var g=this._timeout;k("connect attempt will timeout after %d",g);var h=setTimeout(function(){k("connect attempt timed out after %d",g),d.destroy(),b.close(),b.emit("error","timeout"),c.emitAll("connect_timeout",g)},g);this.subs.push({destroy:function(){clearTimeout(h)}})}return this.subs.push(d),this.subs.push(f),this},d.prototype.onopen=function(){k("open"),this.cleanup(),this.readyState="open",this.emit("open");var a=this.engine;this.subs.push(i(a,"data",j(this,"ondata"))),this.subs.push(i(a,"ping",j(this,"onping"))),this.subs.push(i(a,"pong",j(this,"onpong"))),this.subs.push(i(a,"error",j(this,"onerror"))),this.subs.push(i(a,"close",j(this,"onclose"))),this.subs.push(i(this.decoder,"decoded",j(this,"ondecoded")))},d.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping")},d.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)},d.prototype.ondata=function(a){this.decoder.add(a)},d.prototype.ondecoded=function(a){this.emit("packet",a)},d.prototype.onerror=function(a){k("error",a),this.emitAll("error",a)},d.prototype.socket=function(a){function b(){~l(d.connecting,c)||d.connecting.push(c)}var c=this.nsps[a];if(!c){c=new f(this,a),this.nsps[a]=c;var d=this;c.on("connecting",b),c.on("connect",function(){c.id=d.engine.id}),this.autoConnect&&b()}return c},d.prototype.destroy=function(a){var b=l(this.connecting,a);~b&&this.connecting.splice(b,1),this.connecting.length||this.close()},d.prototype.packet=function(a){k("writing packet %j",a);var b=this;b.encoding?b.packetBuffer.push(a):(b.encoding=!0,this.encoder.encode(a,function(c){for(var d=0;d<c.length;d++)b.engine.write(c[d],a.options);b.encoding=!1,b.processPacketQueue()}))},d.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var a=this.packetBuffer.shift();this.packet(a)}},d.prototype.cleanup=function(){k("cleanup");for(var a;a=this.subs.shift();)a.destroy();this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy()},d.prototype.close=d.prototype.disconnect=function(){k("disconnect"),this.skipReconnect=!0,this.reconnecting=!1,"opening"==this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},d.prototype.onclose=function(a){k("onclose"),this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",a),this._reconnection&&!this.skipReconnect&&this.reconnect()},d.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var a=this;if(this.backoff.attempts>=this._reconnectionAttempts)k("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var b=this.backoff.duration();k("will wait %dms before reconnect attempt",b),this.reconnecting=!0;var c=setTimeout(function(){a.skipReconnect||(k("attempting reconnect"),a.emitAll("reconnect_attempt",a.backoff.attempts),a.emitAll("reconnecting",a.backoff.attempts),a.skipReconnect||a.open(function(b){b?(k("reconnect attempt error"),a.reconnecting=!1,a.reconnect(),a.emitAll("reconnect_error",b.data)):(k("reconnect success"),a.onreconnect())}))},b);this.subs.push({destroy:function(){clearTimeout(c)}})}},d.prototype.onreconnect=function(){var a=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",a)}},{"./on":33,"./socket":34,backo2:36,"component-bind":37,"component-emitter":38,debug:39,"engine.io-client":1,indexof:42,"socket.io-parser":47}],33:[function(a,b,c){function d(a,b,c){return a.on(b,c),{destroy:function(){a.removeListener(b,c)}}}b.exports=d},{}],34:[function(a,b,c){function d(a,b){this.io=a,this.nsp=b,this.json=this,this.ids=0,this.acks={},this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0,this.io.autoConnect&&this.open()}var e=a("socket.io-parser"),f=a("component-emitter"),g=a("to-array"),h=a("./on"),i=a("component-bind"),j=a("debug")("socket.io-client:socket"),k=a("has-binary");b.exports=c=d;var l={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},m=f.prototype.emit;f(d.prototype),d.prototype.subEvents=function(){if(!this.subs){var a=this.io;this.subs=[h(a,"open",i(this,"onopen")),h(a,"packet",i(this,"onpacket")),h(a,"close",i(this,"onclose"))]}},d.prototype.open=d.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"==this.io.readyState&&this.onopen(),this.emit("connecting"),this)},d.prototype.send=function(){var a=g(arguments);return a.unshift("message"),this.emit.apply(this,a),this},d.prototype.emit=function(a){if(l.hasOwnProperty(a))return m.apply(this,arguments),this;var b=g(arguments),c=e.EVENT;k(b)&&(c=e.BINARY_EVENT);var d={type:c,data:b};return d.options={},d.options.compress=!this.flags||!1!==this.flags.compress,"function"==typeof b[b.length-1]&&(j("emitting packet with ack id %d",this.ids),this.acks[this.ids]=b.pop(),d.id=this.ids++),this.connected?this.packet(d):this.sendBuffer.push(d),delete this.flags,this},d.prototype.packet=function(a){a.nsp=this.nsp,this.io.packet(a)},d.prototype.onopen=function(){j("transport is open - connecting"),"/"!=this.nsp&&this.packet({type:e.CONNECT})},d.prototype.onclose=function(a){j("close (%s)",a),this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",a)},d.prototype.onpacket=function(a){if(a.nsp==this.nsp)switch(a.type){case e.CONNECT:this.onconnect();break;case e.EVENT:this.onevent(a);break;case e.BINARY_EVENT:this.onevent(a);break;case e.ACK:this.onack(a);break;case e.BINARY_ACK:this.onack(a);break;case e.DISCONNECT:this.ondisconnect();break;case e.ERROR:this.emit("error",a.data)}},d.prototype.onevent=function(a){var b=a.data||[];j("emitting event %j",b),null!=a.id&&(j("attaching ack callback to event"),b.push(this.ack(a.id))),this.connected?m.apply(this,b):this.receiveBuffer.push(b)},d.prototype.ack=function(a){var b=this,c=!1;return function(){if(!c){c=!0;var d=g(arguments);j("sending ack %j",d);var f=k(d)?e.BINARY_ACK:e.ACK;b.packet({type:f,id:a,data:d})}}},d.prototype.onack=function(a){var b=this.acks[a.id];"function"==typeof b?(j("calling ack %s with %j",a.id,a.data),b.apply(this,a.data),delete this.acks[a.id]):j("bad ack %s",a.id)},d.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},d.prototype.emitBuffered=function(){var a;for(a=0;a<this.receiveBuffer.length;a++)m.apply(this,this.receiveBuffer[a]);for(this.receiveBuffer=[],a=0;a<this.sendBuffer.length;a++)this.packet(this.sendBuffer[a]);this.sendBuffer=[]},d.prototype.ondisconnect=function(){j("server disconnect (%s)",this.nsp),this.destroy(),this.onclose("io server disconnect")},d.prototype.destroy=function(){if(this.subs){for(var a=0;a<this.subs.length;a++)this.subs[a].destroy();this.subs=null}this.io.destroy(this)},d.prototype.close=d.prototype.disconnect=function(){return this.connected&&(j("performing disconnect (%s)",this.nsp),this.packet({type:e.DISCONNECT})),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},d.prototype.compress=function(a){return this.flags=this.flags||{},this.flags.compress=a,this}},{"./on":33,"component-bind":37,"component-emitter":38,debug:39,"has-binary":41,"socket.io-parser":47,"to-array":51}],35:[function(a,b,c){(function(c){function d(a,b){var d=a,b=b||c.location;null==a&&(a=b.protocol+"//"+b.host),"string"==typeof a&&("/"==a.charAt(0)&&(a="/"==a.charAt(1)?b.protocol+a:b.host+a),/^(https?|wss?):\/\//.test(a)||(f("protocol-less url %s",a),a="undefined"!=typeof b?b.protocol+"//"+a:"https://"+a),f("parse %s",a),d=e(a)),d.port||(/^(http|ws)$/.test(d.protocol)?d.port="80":/^(http|ws)s$/.test(d.protocol)&&(d.port="443")),d.path=d.path||"/";var g=-1!==d.host.indexOf(":"),h=g?"["+d.host+"]":d.host;return d.id=d.protocol+"://"+h+":"+d.port,d.href=d.protocol+"://"+h+(b&&b.port==d.port?"":":"+d.port),d}var e=a("parseuri"),f=a("debug")("socket.io-client:url");b.exports=d}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{debug:39,parseuri:45}],36:[function(a,b,c){function d(a){a=a||{},this.ms=a.min||100,this.max=a.max||1e4,this.factor=a.factor||2,this.jitter=a.jitter>0&&a.jitter<=1?a.jitter:0,this.attempts=0}b.exports=d,d.prototype.duration=function(){var a=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var b=Math.random(),c=Math.floor(b*this.jitter*a);a=0==(1&Math.floor(10*b))?a-c:a+c}return 0|Math.min(a,this.max)},d.prototype.reset=function(){this.attempts=0},d.prototype.setMin=function(a){this.ms=a},d.prototype.setMax=function(a){this.max=a},d.prototype.setJitter=function(a){this.jitter=a}},{}],37:[function(a,b,c){var d=[].slice;b.exports=function(a,b){if("string"==typeof b&&(b=a[b]),"function"!=typeof b)throw new Error("bind() requires a function");var c=d.call(arguments,2);return function(){return b.apply(a,c.concat(d.call(arguments)))}}},{}],38:[function(a,b,c){function d(a){return a?e(a):void 0}function e(a){for(var b in d.prototype)a[b]=d.prototype[b];return a}b.exports=d,d.prototype.on=d.prototype.addEventListener=function(a,b){return this._callbacks=this._callbacks||{},(this._callbacks["$"+a]=this._callbacks["$"+a]||[]).push(b),this},d.prototype.once=function(a,b){function c(){this.off(a,c),b.apply(this,arguments)}return c.fn=b,this.on(a,c),this},d.prototype.off=d.prototype.removeListener=d.prototype.removeAllListeners=d.prototype.removeEventListener=function(a,b){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var c=this._callbacks["$"+a];if(!c)return this;if(1==arguments.length)return delete this._callbacks["$"+a],this;for(var d,e=0;e<c.length;e++)if(d=c[e],d===b||d.fn===b){c.splice(e,1);break}return this},d.prototype.emit=function(a){this._callbacks=this._callbacks||{};var b=[].slice.call(arguments,1),c=this._callbacks["$"+a];if(c){c=c.slice(0);for(var d=0,e=c.length;e>d;++d)c[d].apply(this,b)}return this},d.prototype.listeners=function(a){return this._callbacks=this._callbacks||{},this._callbacks["$"+a]||[]},d.prototype.hasListeners=function(a){return!!this.listeners(a).length}},{}],39:[function(a,b,c){arguments[4][17][0].apply(c,arguments)},{"./debug":40,dup:17}],40:[function(a,b,c){arguments[4][18][0].apply(c,arguments)},{dup:18,ms:44}],41:[function(a,b,c){(function(c){function d(a){function b(a){if(!a)return!1;if(c.Buffer&&c.Buffer.isBuffer&&c.Buffer.isBuffer(a)||c.ArrayBuffer&&a instanceof ArrayBuffer||c.Blob&&a instanceof Blob||c.File&&a instanceof File)return!0;if(e(a)){for(var d=0;d<a.length;d++)if(b(a[d]))return!0}else if(a&&"object"==typeof a){a.toJSON&&"function"==typeof a.toJSON&&(a=a.toJSON());for(var f in a)if(Object.prototype.hasOwnProperty.call(a,f)&&b(a[f]))return!0}return!1}return b(a)}var e=a("isarray");b.exports=d}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{isarray:43}],42:[function(a,b,c){arguments[4][23][0].apply(c,arguments)},{dup:23}],43:[function(a,b,c){arguments[4][24][0].apply(c,arguments)},{dup:24}],44:[function(a,b,c){arguments[4][25][0].apply(c,arguments)},{dup:25}],45:[function(a,b,c){arguments[4][28][0].apply(c,arguments)},{dup:28}],46:[function(a,b,c){(function(b){var d=a("isarray"),e=a("./is-buffer");c.deconstructPacket=function(a){function b(a){if(!a)return a;if(e(a)){var f={_placeholder:!0,num:c.length};return c.push(a),f}if(d(a)){for(var g=new Array(a.length),h=0;h<a.length;h++)g[h]=b(a[h]);return g}if("object"==typeof a&&!(a instanceof Date)){var g={};for(var i in a)g[i]=b(a[i]);return g}return a}var c=[],f=a.data,g=a;return g.data=b(f),g.attachments=c.length,{packet:g,buffers:c}},c.reconstructPacket=function(a,b){function c(a){if(a&&a._placeholder){var e=b[a.num];return e}if(d(a)){for(var f=0;f<a.length;f++)a[f]=c(a[f]);return a}if(a&&"object"==typeof a){for(var g in a)a[g]=c(a[g]);return a}return a}return a.data=c(a.data),a.attachments=void 0,a},c.removeBlobs=function(a,c){function f(a,i,j){if(!a)return a;if(b.Blob&&a instanceof Blob||b.File&&a instanceof File){g++;var k=new FileReader;k.onload=function(){j?j[i]=this.result:h=this.result,--g||c(h)},k.readAsArrayBuffer(a)}else if(d(a))for(var l=0;l<a.length;l++)f(a[l],l,a);else if(a&&"object"==typeof a&&!e(a))for(var m in a)f(a[m],m,a)}var g=0,h=a;f(h),g||c(h)}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./is-buffer":48,isarray:43}],47:[function(a,b,c){function d(){}function e(a){var b="",d=!1;return b+=a.type,(c.BINARY_EVENT==a.type||c.BINARY_ACK==a.type)&&(b+=a.attachments,b+="-"),a.nsp&&"/"!=a.nsp&&(d=!0,b+=a.nsp),null!=a.id&&(d&&(b+=",",d=!1),b+=a.id),null!=a.data&&(d&&(b+=","),b+=l.stringify(a.data)),k("encoded %j as %s",a,b),b}function f(a,b){function c(a){var c=n.deconstructPacket(a),d=e(c.packet),f=c.buffers;f.unshift(d),b(f)}n.removeBlobs(a,c)}function g(){this.reconstructor=null}function h(a){var b={},d=0;if(b.type=Number(a.charAt(0)),null==c.types[b.type])return j();if(c.BINARY_EVENT==b.type||c.BINARY_ACK==b.type){for(var e="";"-"!=a.charAt(++d)&&(e+=a.charAt(d),d!=a.length););if(e!=Number(e)||"-"!=a.charAt(d))throw new Error("Illegal attachments");b.attachments=Number(e)}if("/"==a.charAt(d+1))for(b.nsp="";++d;){var f=a.charAt(d);if(","==f)break;if(b.nsp+=f,d==a.length)break}else b.nsp="/";var g=a.charAt(d+1);if(""!==g&&Number(g)==g){for(b.id="";++d;){var f=a.charAt(d);if(null==f||Number(f)!=f){--d;break}if(b.id+=a.charAt(d),d==a.length)break}b.id=Number(b.id)}if(a.charAt(++d))try{b.data=l.parse(a.substr(d))}catch(h){return j()}return k("decoded %s as %j",a,b),b}function i(a){this.reconPack=a,this.buffers=[]}function j(a){return{type:c.ERROR,data:"parser error"}}var k=a("debug")("socket.io-parser"),l=a("json3"),m=(a("isarray"),a("component-emitter")),n=a("./binary"),o=a("./is-buffer");c.protocol=4,c.types=["CONNECT","DISCONNECT","EVENT","BINARY_EVENT","ACK","BINARY_ACK","ERROR"],c.CONNECT=0,c.DISCONNECT=1,c.EVENT=2,c.ACK=3,c.ERROR=4,c.BINARY_EVENT=5,c.BINARY_ACK=6,c.Encoder=d,c.Decoder=g,d.prototype.encode=function(a,b){if(k("encoding packet %j",a),c.BINARY_EVENT==a.type||c.BINARY_ACK==a.type)f(a,b);else{var d=e(a);b([d])}},m(g.prototype),g.prototype.add=function(a){var b;if("string"==typeof a)b=h(a),c.BINARY_EVENT==b.type||c.BINARY_ACK==b.type?(this.reconstructor=new i(b),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",b)):this.emit("decoded",b);else{if(!o(a)&&!a.base64)throw new Error("Unknown type: "+a);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");b=this.reconstructor.takeBinaryData(a),b&&(this.reconstructor=null,this.emit("decoded",b))}},g.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},i.prototype.takeBinaryData=function(a){if(this.buffers.push(a),this.buffers.length==this.reconPack.attachments){var b=n.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),b}return null},i.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},{"./binary":46,"./is-buffer":48,"component-emitter":49,debug:39,isarray:43,json3:50}],48:[function(a,b,c){(function(a){function c(b){return a.Buffer&&a.Buffer.isBuffer(b)||a.ArrayBuffer&&b instanceof ArrayBuffer}b.exports=c}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{}],49:[function(a,b,c){arguments[4][15][0].apply(c,arguments)},{dup:15}],50:[function(b,c,d){(function(b){(function(){function e(a,b){function c(a){if(c[a]!==q)return c[a];var e;if("bug-string-char-index"==a)e="a"!="a"[0];else if("json"==a)e=c("json-stringify")&&c("json-parse");else{var g,h='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==a){var i=b.stringify,k="function"==typeof i&&t;if(k){(g=function(){return 1}).toJSON=g;try{k="0"===i(0)&&"0"===i(new d)&&'""'==i(new f)&&i(s)===q&&i(q)===q&&i()===q&&"1"===i(g)&&"[1]"==i([g])&&"[null]"==i([q])&&"null"==i(null)&&"[null,null,null]"==i([q,s,null])&&i({a:[g,!0,!1,null,"\x00\b\n\f\r	"]})==h&&"1"===i(null,g)&&"[\n 1,\n 2\n]"==i([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==i(new j(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==i(new j(864e13))&&'"-000001-01-01T00:00:00.000Z"'==i(new j(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==i(new j(-1))}catch(l){k=!1}}e=k}if("json-parse"==a){var m=b.parse;if("function"==typeof m)try{if(0===m("0")&&!m(!1)){g=m(h);var n=5==g.a.length&&1===g.a[0];if(n){try{n=!m('"	"')}catch(l){}if(n)try{n=1!==m("01")}catch(l){}if(n)try{n=1!==m("1.")}catch(l){}}}}catch(l){n=!1}e=n}}return c[a]=!!e}a||(a=i.Object()),b||(b=i.Object());var d=a.Number||i.Number,f=a.String||i.String,h=a.Object||i.Object,j=a.Date||i.Date,k=a.SyntaxError||i.SyntaxError,l=a.TypeError||i.TypeError,m=a.Math||i.Math,n=a.JSON||i.JSON;"object"==typeof n&&n&&(b.stringify=n.stringify,b.parse=n.parse);var o,p,q,r=h.prototype,s=r.toString,t=new j(-0xc782b5b800cec);try{t=-109252==t.getUTCFullYear()&&0===t.getUTCMonth()&&1===t.getUTCDate()&&10==t.getUTCHours()&&37==t.getUTCMinutes()&&6==t.getUTCSeconds()&&708==t.getUTCMilliseconds()}catch(u){}if(!c("json")){var v="[object Function]",w="[object Date]",x="[object Number]",y="[object String]",z="[object Array]",A="[object Boolean]",B=c("bug-string-char-index");if(!t)var C=m.floor,D=[0,31,59,90,120,151,181,212,243,273,304,334],E=function(a,b){return D[b]+365*(a-1970)+C((a-1969+(b=+(b>1)))/4)-C((a-1901+b)/100)+C((a-1601+b)/400)};if((o=r.hasOwnProperty)||(o=function(a){var b,c={};return(c.__proto__=null,c.__proto__={toString:1},c).toString!=s?o=function(a){var b=this.__proto__,c=a in(this.__proto__=null,this);return this.__proto__=b,c}:(b=c.constructor,o=function(a){var c=(this.constructor||b).prototype;return a in this&&!(a in c&&this[a]===c[a])}),c=null,o.call(this,a)}),p=function(a,b){var c,d,e,f=0;(c=function(){this.valueOf=0;
}).prototype.valueOf=0,d=new c;for(e in d)o.call(d,e)&&f++;return c=d=null,f?p=2==f?function(a,b){var c,d={},e=s.call(a)==v;for(c in a)e&&"prototype"==c||o.call(d,c)||!(d[c]=1)||!o.call(a,c)||b(c)}:function(a,b){var c,d,e=s.call(a)==v;for(c in a)e&&"prototype"==c||!o.call(a,c)||(d="constructor"===c)||b(c);(d||o.call(a,c="constructor"))&&b(c)}:(d=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],p=function(a,b){var c,e,f=s.call(a)==v,h=!f&&"function"!=typeof a.constructor&&g[typeof a.hasOwnProperty]&&a.hasOwnProperty||o;for(c in a)f&&"prototype"==c||!h.call(a,c)||b(c);for(e=d.length;c=d[--e];h.call(a,c)&&b(c));}),p(a,b)},!c("json-stringify")){var F={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},G="000000",H=function(a,b){return(G+(b||0)).slice(-a)},I="\\u00",J=function(a){for(var b='"',c=0,d=a.length,e=!B||d>10,f=e&&(B?a.split(""):a);d>c;c++){var g=a.charCodeAt(c);switch(g){case 8:case 9:case 10:case 12:case 13:case 34:case 92:b+=F[g];break;default:if(32>g){b+=I+H(2,g.toString(16));break}b+=e?f[c]:a.charAt(c)}}return b+'"'},K=function(a,b,c,d,e,f,g){var h,i,j,k,m,n,r,t,u,v,B,D,F,G,I,L;try{h=b[a]}catch(M){}if("object"==typeof h&&h)if(i=s.call(h),i!=w||o.call(h,"toJSON"))"function"==typeof h.toJSON&&(i!=x&&i!=y&&i!=z||o.call(h,"toJSON"))&&(h=h.toJSON(a));else if(h>-1/0&&1/0>h){if(E){for(m=C(h/864e5),j=C(m/365.2425)+1970-1;E(j+1,0)<=m;j++);for(k=C((m-E(j,0))/30.42);E(j,k+1)<=m;k++);m=1+m-E(j,k),n=(h%864e5+864e5)%864e5,r=C(n/36e5)%24,t=C(n/6e4)%60,u=C(n/1e3)%60,v=n%1e3}else j=h.getUTCFullYear(),k=h.getUTCMonth(),m=h.getUTCDate(),r=h.getUTCHours(),t=h.getUTCMinutes(),u=h.getUTCSeconds(),v=h.getUTCMilliseconds();h=(0>=j||j>=1e4?(0>j?"-":"+")+H(6,0>j?-j:j):H(4,j))+"-"+H(2,k+1)+"-"+H(2,m)+"T"+H(2,r)+":"+H(2,t)+":"+H(2,u)+"."+H(3,v)+"Z"}else h=null;if(c&&(h=c.call(b,a,h)),null===h)return"null";if(i=s.call(h),i==A)return""+h;if(i==x)return h>-1/0&&1/0>h?""+h:"null";if(i==y)return J(""+h);if("object"==typeof h){for(G=g.length;G--;)if(g[G]===h)throw l();if(g.push(h),B=[],I=f,f+=e,i==z){for(F=0,G=h.length;G>F;F++)D=K(F,h,c,d,e,f,g),B.push(D===q?"null":D);L=B.length?e?"[\n"+f+B.join(",\n"+f)+"\n"+I+"]":"["+B.join(",")+"]":"[]"}else p(d||h,function(a){var b=K(a,h,c,d,e,f,g);b!==q&&B.push(J(a)+":"+(e?" ":"")+b)}),L=B.length?e?"{\n"+f+B.join(",\n"+f)+"\n"+I+"}":"{"+B.join(",")+"}":"{}";return g.pop(),L}};b.stringify=function(a,b,c){var d,e,f,h;if(g[typeof b]&&b)if((h=s.call(b))==v)e=b;else if(h==z){f={};for(var i,j=0,k=b.length;k>j;i=b[j++],h=s.call(i),(h==y||h==x)&&(f[i]=1));}if(c)if((h=s.call(c))==x){if((c-=c%1)>0)for(d="",c>10&&(c=10);d.length<c;d+=" ");}else h==y&&(d=c.length<=10?c:c.slice(0,10));return K("",(i={},i[""]=a,i),e,f,d,"",[])}}if(!c("json-parse")){var L,M,N=f.fromCharCode,O={92:"\\",34:'"',47:"/",98:"\b",116:"	",110:"\n",102:"\f",114:"\r"},P=function(){throw L=M=null,k()},Q=function(){for(var a,b,c,d,e,f=M,g=f.length;g>L;)switch(e=f.charCodeAt(L)){case 9:case 10:case 13:case 32:L++;break;case 123:case 125:case 91:case 93:case 58:case 44:return a=B?f.charAt(L):f[L],L++,a;case 34:for(a="@",L++;g>L;)if(e=f.charCodeAt(L),32>e)P();else if(92==e)switch(e=f.charCodeAt(++L)){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:a+=O[e],L++;break;case 117:for(b=++L,c=L+4;c>L;L++)e=f.charCodeAt(L),e>=48&&57>=e||e>=97&&102>=e||e>=65&&70>=e||P();a+=N("0x"+f.slice(b,L));break;default:P()}else{if(34==e)break;for(e=f.charCodeAt(L),b=L;e>=32&&92!=e&&34!=e;)e=f.charCodeAt(++L);a+=f.slice(b,L)}if(34==f.charCodeAt(L))return L++,a;P();default:if(b=L,45==e&&(d=!0,e=f.charCodeAt(++L)),e>=48&&57>=e){for(48==e&&(e=f.charCodeAt(L+1),e>=48&&57>=e)&&P(),d=!1;g>L&&(e=f.charCodeAt(L),e>=48&&57>=e);L++);if(46==f.charCodeAt(L)){for(c=++L;g>c&&(e=f.charCodeAt(c),e>=48&&57>=e);c++);c==L&&P(),L=c}if(e=f.charCodeAt(L),101==e||69==e){for(e=f.charCodeAt(++L),(43==e||45==e)&&L++,c=L;g>c&&(e=f.charCodeAt(c),e>=48&&57>=e);c++);c==L&&P(),L=c}return+f.slice(b,L)}if(d&&P(),"true"==f.slice(L,L+4))return L+=4,!0;if("false"==f.slice(L,L+5))return L+=5,!1;if("null"==f.slice(L,L+4))return L+=4,null;P()}return"$"},R=function(a){var b,c;if("$"==a&&P(),"string"==typeof a){if("@"==(B?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(b=[];a=Q(),"]"!=a;c||(c=!0))c&&(","==a?(a=Q(),"]"==a&&P()):P()),","==a&&P(),b.push(R(a));return b}if("{"==a){for(b={};a=Q(),"}"!=a;c||(c=!0))c&&(","==a?(a=Q(),"}"==a&&P()):P()),(","==a||"string"!=typeof a||"@"!=(B?a.charAt(0):a[0])||":"!=Q())&&P(),b[a.slice(1)]=R(Q());return b}P()}return a},S=function(a,b,c){var d=T(a,b,c);d===q?delete a[b]:a[b]=d},T=function(a,b,c){var d,e=a[b];if("object"==typeof e&&e)if(s.call(e)==z)for(d=e.length;d--;)S(e,d,c);else p(e,function(a){S(e,a,c)});return c.call(a,b,e)};b.parse=function(a,b){var c,d;return L=0,M=""+a,c=R(Q()),"$"!=Q()&&P(),L=M=null,b&&s.call(b)==v?T((d={},d[""]=c,d),"",b):c}}}return b.runInContext=e,b}var f="function"==typeof a&&a.amd,g={"function":!0,object:!0},h=g[typeof d]&&d&&!d.nodeType&&d,i=g[typeof window]&&window||this,j=h&&g[typeof c]&&c&&!c.nodeType&&"object"==typeof b&&b;if(!j||j.global!==j&&j.window!==j&&j.self!==j||(i=j),h&&!f)e(i,h);else{var k=i.JSON,l=i.JSON3,m=!1,n=e(i,i.JSON3={noConflict:function(){return m||(m=!0,i.JSON=k,i.JSON3=l,k=l=null),n}});i.JSON={parse:n.parse,stringify:n.stringify}}f&&a(function(){return n})}).call(this)}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{}],51:[function(a,b,c){function d(a,b){var c=[];b=b||0;for(var d=b||0;d<a.length;d++)c[d-b]=a[d];return c}b.exports=d},{}]},{},[31])(31)});;

//////////////////////////////////////////////////////////////////////////////////////
 //                                                                                //
 //  ███████╗ █████╗ ██╗██╗     ███████╗   ██╗ ██████╗         ██╗███████╗         //
 //  ██╔════╝██╔══██╗██║██║     ██╔════╝   ██║██╔═══██╗        ██║██╔════╝         //
 //  ███████╗███████║██║██║     ███████╗   ██║██║   ██║        ██║███████╗         //
 //  ╚════██║██╔══██║██║██║     ╚════██║   ██║██║   ██║   ██   ██║╚════██║         //
 //  ███████║██║  ██║██║███████╗███████║██╗██║╚██████╔╝██╗╚█████╔╝███████║         //
 //  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═╝╚═╝ ╚═════╝ ╚═╝ ╚════╝ ╚══════╝         //
 //                                                                                //
 //   ╦╔═╗╦  ╦╔═╗╔═╗╔═╗╦═╗╦╔═╗╔╦╗  ╔═╗╦  ╦╔═╗╔╗╔╔╦╗  ╔═╗╔╦╗╦╔═                     //
 //   ║╠═╣╚╗╔╝╠═╣╚═╗║  ╠╦╝║╠═╝ ║   ║  ║  ║║╣ ║║║ ║   ╚═╗ ║║╠╩╗                     //
 //  ╚╝╩ ╩ ╚╝ ╩ ╩╚═╝╚═╝╩╚═╩╩   ╩   ╚═╝╩═╝╩╚═╝╝╚╝ ╩   ╚═╝═╩╝╩ ╩                     //
 //  ┌─┐┌─┐┬─┐  ┌┐┌┌─┐┌┬┐┌─┐  ┬┌─┐  ┌─┐┌┐┌┌┬┐  ┌┬┐┬ ┬┌─┐  ┌┐ ┬─┐┌─┐┬ ┬┌─┐┌─┐┬─┐    //
 //  ├┤ │ │├┬┘  ││││ │ ││├┤   │└─┐  ├─┤│││ ││   │ ├─┤├┤   ├┴┐├┬┘│ ││││└─┐├┤ ├┬┘    //
 //  └  └─┘┴└─  ┘└┘└─┘─┴┘└─┘o└┘└─┘  ┴ ┴┘└┘─┴┘   ┴ ┴ ┴└─┘  └─┘┴└─└─┘└┴┘└─┘└─┘┴└─    //
 //                                                                                //
//////////////////////////////////////////////////////////////////////////////////////

/**
 * sails.io.js
 * ------------------------------------------------------------------------
 * JavaScript Client (SDK) for communicating with Sails.
 *
 * Note that this script is completely optional, but it is handy if you're
 * using WebSockets from the browser to talk to your Sails server.
 *
 * For tips and documentation, visit:
 * http://sailsjs.org/#!documentation/reference/BrowserSDK/BrowserSDK.html
 * ------------------------------------------------------------------------
 *
 * This file allows you to send and receive socket.io messages to & from Sails
 * by simulating a REST client interface on top of socket.io. It models its API
 * after the $.ajax pattern from jQuery you might already be familiar with.
 *
 * So if you're switching from using AJAX to sockets, instead of:
 *    `$.post( url, [data], [cb] )`
 *
 * You would use:
 *    `socket.post( url, [data], [cb] )`
 */


(function() {


  //   ██████╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗ ███╗   ██╗████████╗███████╗
  //  ██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║╚══██╔══╝██╔════╝
  //  ██║     ██║   ██║██╔██╗ ██║███████╗   ██║   ███████║██╔██╗ ██║   ██║   ███████╗
  //  ██║     ██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██║██║╚██╗██║   ██║   ╚════██║
  //  ╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║██║ ╚████║   ██║   ███████║
  //   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
  //


  /**
   * Constant containing the names of all available options
   * for individual sockets.
   *
   * @type {Array}
   */
  var SOCKET_OPTIONS = [
    'useCORSRouteToGetCookie',
    'url',
    'multiplex',
    'transports',
    'query',
    'path',
    'headers',
    'initialConnectionHeaders',
    'reconnection',
    'reconnectionAttempts',
    'reconnectionDelay',
    'reconnectionDelayMax',
    'rejectUnauthorized',
    'randomizationFactor',
    'timeout'
  ];


  /**
   * Constant containing the names of properties on `io.sails` which
   * may be configured using HTML attributes on the script tag which
   * loaded this file.
   *
   * @type {Array}
   *
   * (this is unused if loading from node.js)
   */
  var CONFIGURABLE_VIA_HTML_ATTR = [
    'autoConnect',
    'environment',
    'headers',
    'url',
    'transports',
    'path'
  ];




  /**
   * Constant containing the names of querystring
   * parameters sent when connecting any SailsSocket.
   *
   * @type {Dictionary}
   */
  var CONNECTION_METADATA_PARAMS = {
    version: '__sails_io_sdk_version',
    platform: '__sails_io_sdk_platform',
    language: '__sails_io_sdk_language'
  };


  /**
   * Constant containing metadata about the platform, language, and
   * current version of this SDK.
   *
   * @type {Dictionary}
   */
  var SDK_INFO = {
    version: '0.13.8', // <-- pulled automatically from package.json, do not change!
    language: 'javascript',
    platform: (function (){
      if (typeof module === 'object' && typeof module.exports !== 'undefined') {
        return 'node';
      }
      else {
        return 'browser';
      }
    })()
  };

  // Build `versionString` (a querystring snippet) by
  // combining SDK_INFO and CONNECTION_METADATA_PARAMS.
  SDK_INFO.versionString =
    CONNECTION_METADATA_PARAMS.version + '=' + SDK_INFO.version + '&' +
    CONNECTION_METADATA_PARAMS.platform + '=' + SDK_INFO.platform + '&' +
    CONNECTION_METADATA_PARAMS.language + '=' + SDK_INFO.language;




  //   █████╗ ██████╗ ███████╗ ██████╗ ██████╗ ██████╗     ██╗  ██╗████████╗███╗   ███╗██╗
  //  ██╔══██╗██╔══██╗██╔════╝██╔═══██╗██╔══██╗██╔══██╗    ██║  ██║╚══██╔══╝████╗ ████║██║
  //  ███████║██████╔╝███████╗██║   ██║██████╔╝██████╔╝    ███████║   ██║   ██╔████╔██║██║
  //  ██╔══██║██╔══██╗╚════██║██║   ██║██╔══██╗██╔══██╗    ██╔══██║   ██║   ██║╚██╔╝██║██║
  //  ██║  ██║██████╔╝███████║╚██████╔╝██║  ██║██████╔╝    ██║  ██║   ██║   ██║ ╚═╝ ██║███████╗
  //  ╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝
  //
  //   █████╗ ████████╗████████╗██████╗ ██╗██████╗ ██╗   ██╗████████╗███████╗███████╗
  //  ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗██║██╔══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
  //  ███████║   ██║      ██║   ██████╔╝██║██████╔╝██║   ██║   ██║   █████╗  ███████╗
  //  ██╔══██║   ██║      ██║   ██╔══██╗██║██╔══██╗██║   ██║   ██║   ██╔══╝  ╚════██║
  //  ██║  ██║   ██║      ██║   ██║  ██║██║██████╔╝╚██████╔╝   ██║   ███████╗███████║
  //  ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝
  //
  //  ███████╗██████╗  ██████╗ ███╗   ███╗      ██╗███████╗ ██████╗██████╗ ██╗██████╗ ████████╗██╗
  //  ██╔════╝██╔══██╗██╔═══██╗████╗ ████║     ██╔╝██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝╚██╗
  //  █████╗  ██████╔╝██║   ██║██╔████╔██║    ██╔╝ ███████╗██║     ██████╔╝██║██████╔╝   ██║    ╚██╗
  //  ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║    ╚██╗ ╚════██║██║     ██╔══██╗██║██╔═══╝    ██║    ██╔╝
  //  ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║     ╚██╗███████║╚██████╗██║  ██║██║██║        ██║   ██╔╝
  //  ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝      ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚═╝
  //
  //
  // If available, grab the DOM element for the script tag which imported this file.
  // (skip this if this SDK is being used outside of the DOM, i.e. in a Node process)
  //
  // This is used below to parse client-side sails.io.js configuration encoded as
  // HTML attributes, as well as grabbing hold of the URL from whence the SDK was fetched.
  var thisScriptTag = (function() {
    if (
      typeof window !== 'object' ||
      typeof window.document !== 'object' ||
      typeof window.document.getElementsByTagName !== 'function'
    ) {
      return null;
    }

    // Return the URL of the last script loaded (i.e. this one)
    // (this must run before nextTick; see http://stackoverflow.com/a/2976714/486547)
    var allScriptsCurrentlyInDOM = window.document.getElementsByTagName('script');
    return allScriptsCurrentlyInDOM[allScriptsCurrentlyInDOM.length - 1];
  })();


  // Variables to contain src URL and other script tag config (for use below).
  var urlThisScriptWasFetchedFrom = '';
  var scriptTagConfig = {};


  if (thisScriptTag) {
    // Save the URL that this script was fetched from.
    urlThisScriptWasFetchedFrom = thisScriptTag.src;

    // Now parse the most common client-side configuration settings
    // from the script tag where they may be encoded as HTML attributes.
    //
    // Any configuration which may be provided as an HTML attribute may
    // also be provided prefixed with `data-`.  This is for folks who
    // need to support browsers that have issues with nonstandard
    // HTML attributes (or if the idea of using nonstandard HTML attributes
    // just creeps you out)
    //
    // If a `data-` prefixed attr is provided, it takes precedence.
    // (this is so that if you are already using one of these HTML
    //  attrs for some reason, you can keep it as-is and override
    //  it using `data-`. If you are using the `data-` prefixed version
    //  for some other purpose... well, in that case you'll just have to
    //  configure programmatically using `io.sails` instead.)
    CONFIGURABLE_VIA_HTML_ATTR.forEach(function (configKey){

      scriptTagConfig[configKey] = (function (){

        // Support 'data-' prefixed or normal attributes.
        // (prefixed versions take precedence if provided)
        var htmlAttrVal = thisScriptTag.getAttribute( 'data-'+configKey );
        if (!htmlAttrVal) {
          htmlAttrVal = thisScriptTag.getAttribute( configKey );
        }

        // The HTML attribute value should always be a string or `null`.
        // We'll try to parse it as JSON and use that, but worst case fall back
        // to the default situation of it being a string.
        if (typeof htmlAttrVal === 'string') {
          try { return JSON.parse(htmlAttrVal); } catch (e) { return htmlAttrVal; }
        }
        // If `null` was returned from getAttribute(), it means that the HTML attribute
        // was not specified, so we treat it as undefined (which will cause the property
        // to be removed below)
        else if (htmlAttrVal === null) {
          return undefined;
        }
        // Any other contingency shouldn't be possible:
        // - if no quotes are used in the HTML attribute, it still comes in as a string.
        // - if no RHS is provided for the attribute, it still comes in as "" (empty string)
        // (but we still handle this with an explicit error just in case--for debugging and support purposes)
        else throw new Error('sails.io.js :: Unexpected/invalid script tag configuration for `'+configKey+'`: `'+htmlAttrVal+'` (a `'+typeof htmlAttrVal+'`). Should be a string.');
      })();

      if (scriptTagConfig[configKey] === undefined){
        delete scriptTagConfig[configKey];
      }
    });



    // Now that they've been parsed, do an extremely lean version of
    // logical type validation/coercion of provided values.
    //////////////////////////////////////////////////////////////////

    // `autoConnect`
    if (typeof scriptTagConfig.autoConnect !== 'undefined') {
      if (scriptTagConfig.autoConnect === '') {
        // Special case for empty string.  It means `true` (see above).
        scriptTagConfig.autoConnect = true;
      }
      else if (typeof scriptTagConfig.autoConnect !== 'boolean') {
        throw new Error('sails.io.js :: Unexpected/invalid configuration for `autoConnect` provided in script tag: `'+scriptTagConfig.autoConnect+'` (a `'+typeof scriptTagConfig.autoConnect+'`). Should be a boolean.');
      }
    }


    // `environment`
    if (typeof scriptTagConfig.environment !== 'undefined') {
      if (typeof scriptTagConfig.environment !== 'string') {
        throw new Error('sails.io.js :: Unexpected/invalid configuration for `environment` provided in script tag: `'+scriptTagConfig.environment+'` (a `'+typeof scriptTagConfig.environment+'`). Should be a string.');
      }
    }


    // `headers`
    if (typeof scriptTagConfig.headers !== 'undefined') {
      if (typeof scriptTagConfig.headers !== 'object' || Array.isArray(scriptTagConfig.headers)) {
        throw new Error('sails.io.js :: Unexpected/invalid configuration for `headers` provided in script tag: `'+scriptTagConfig.headers+'` (a `'+typeof scriptTagConfig.headers+'`). Should be a JSON-compatible dictionary (i.e. `{}`).  Don\'t forget those double quotes (""), even on key names!  Use single quotes (\'\') to wrap the HTML attribute value; e.g. `headers=\'{"X-Auth": "foo"}\'`');
      }
    }


    // `url`
    if (typeof scriptTagConfig.url !== 'undefined') {
      if (typeof scriptTagConfig.url !== 'string') {
        throw new Error('sails.io.js :: Unexpected/invalid configuration for `url` provided in script tag: `'+scriptTagConfig.url+'` (a `'+typeof scriptTagConfig.url+'`). Should be a string.');
      }
    }

    // OTHER `io.sails` options are NOT CURRENTLY SUPPORTED VIA HTML ATTRIBUTES.
  }




  // Grab a reference to the global socket.io client (if one is available).
  // This is used via closure below to determine which `io` to use when the
  // socket.io client instance (`io`) is augmented to become the Sails client
  // SDK instance (still `io`).
  var _existingGlobalSocketIO = (typeof io !== 'undefined') ? io : undefined;




  //////////////////////////////////////////////////////////////
  /////
  ///// NOW FOR BUNCHES OF:
  /////  - PRIVATE FUNCTION DEFINITIONS
  /////  - CONSTRUCTORS
  /////  - AND METHODS
  /////
  //////////////////////////////////////////////////////////////
  //



  //  ███████╗ █████╗ ██╗██╗     ███████╗      ██╗ ██████╗        ██████╗██╗     ██╗███████╗███╗   ██╗████████╗
  //  ██╔════╝██╔══██╗██║██║     ██╔════╝      ██║██╔═══██╗      ██╔════╝██║     ██║██╔════╝████╗  ██║╚══██╔══╝
  //  ███████╗███████║██║██║     ███████╗█████╗██║██║   ██║█████╗██║     ██║     ██║█████╗  ██╔██╗ ██║   ██║
  //  ╚════██║██╔══██║██║██║     ╚════██║╚════╝██║██║   ██║╚════╝██║     ██║     ██║██╔══╝  ██║╚██╗██║   ██║
  //  ███████║██║  ██║██║███████╗███████║      ██║╚██████╔╝      ╚██████╗███████╗██║███████╗██║ ╚████║   ██║
  //  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝      ╚═╝ ╚═════╝        ╚═════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝
  //

  /**
   * SailsIOClient()
   *
   * Augment the provided Socket.io client object (`io`) with methods for
   * talking and listening to one or more Sails backend(s).  If no `io` was
   * provided (i.e. in a browser setting), then attempt to use the global.
   *
   * This absorbs implicit `io.sails` configuration, sets a timer for
   * automatically connecting a socket (if `io.sails.autoConnect` is enabled)
   * and returns the augmented `io`.
   *
   * Note:
   * The automatically-connected socket is exposed as `io.socket`.  If this
   * socket attempts to bind event listeners or send requests before it is
   * connected, it will be queued up and replayed when the connection is
   * successfully opened.
   *
   * @param {SocketIO} io
   * @returns {SailsIOClient} [also called `io`]
   */

  function SailsIOClient(_providedSocketIO) {

    // First, determine which `io` we're augmenting.
    //
    // Prefer the passed-in `io` instance, but fall back to the
    // global one if we've got it.
    var io;
    if (_providedSocketIO) {
      io = _providedSocketIO;
    }
    else {
      io = _existingGlobalSocketIO;
    }
    // (note that for readability, we deliberately do not short circuit or use the tertiary operator above)


    // If a socket.io client (`io`) is not available, none of this will work.
    if (!io) {
      // If node:
      if (SDK_INFO.platform === 'node') {
        throw new Error('No socket.io client available.  When requiring `sails.io.js` from Node.js, a socket.io client (`io`) must be passed in; e.g.:\n```\nvar io = require(\'sails.io.js\')( require(\'socket.io-client\') )\n```\n(see https://github.com/balderdashy/sails.io.js/tree/master/test for more examples)');
      }
      // Otherwise, this is a web browser:
      else {
        throw new Error('The Sails socket SDK depends on the socket.io client, but the socket.io global (`io`) was not available when `sails.io.js` loaded.  Normally, the socket.io client code is bundled with sails.io.js, so something is a little off.  Please check to be sure this version of `sails.io.js` has the minified Socket.io client at the top of the file.');
      }
    }

    // If the chosen socket.io client (`io`) has ALREADY BEEN AUGMENTED by this SDK,
    // (i.e. if it already has a `.sails` property) then throw an error.
    if (io.sails) {
      // If node:
      if (SDK_INFO.platform === 'node') {
        throw new Error('The provided socket.io client (`io`) has already been augmented into a Sails socket SDK instance (it has `io.sails`).');
      }
      // Otherwise, this is a web browser:
      else {
        throw new Error('The socket.io client (`io`) has already been augmented into a Sails socket SDK instance.  Usually, this means you are bringing `sails.io.js` onto the page more than once.');
      }
    }


    /**
     * A little logger for this library to use internally.
     * Basically just a wrapper around `console.log` with
     * support for feature-detection.
     *
     * @api private
     * @factory
     */
    function LoggerFactory(options) {
      options = options || {
        prefix: true
      };

      // If `console.log` is not accessible, `log` is a noop.
      if (
        typeof console !== 'object' ||
        typeof console.log !== 'function' ||
        typeof console.log.bind !== 'function'
      ) {
        return function noop() {};
      }

      return function log() {
        var args = Array.prototype.slice.call(arguments);

        // All logs are disabled when `io.sails.environment = 'production'`.
        if (io.sails.environment === 'production') return;

        // Add prefix to log messages (unless disabled)
        var PREFIX = '';
        if (options.prefix) {
          args.unshift(PREFIX);
        }

        // Call wrapped logger
        console.log
          .bind(console)
          .apply(this, args);
      };
    }//</LoggerFactory>

    // Create a private logger instance
    var consolog = LoggerFactory();
    consolog.noPrefix = LoggerFactory({
      prefix: false
    });



    /**
     * What is the `requestQueue`?
     *
     * The request queue is used to simplify app-level connection logic--
     * i.e. so you don't have to wait for the socket to be connected
     * to start trying to  synchronize data.
     *
     * @api private
     * @param  {SailsSocket}  socket
     */

    function runRequestQueue (socket) {
      var queue = socket.requestQueue;

      if (!queue) return;
      for (var i in queue) {

        // Double-check that `queue[i]` will not
        // inadvertently discover extra properties attached to the Object
        // and/or Array prototype by other libraries/frameworks/tools.
        // (e.g. Ember does this. See https://github.com/balderdashy/sails.io.js/pull/5)
        var isSafeToDereference = ({}).hasOwnProperty.call(queue, i);
        if (isSafeToDereference) {
          // Get the arguments that were originally made to the "request" method
          var requestArgs = queue[i];
          // Call the request method again in the context of the socket, with the original args
          socket.request.apply(socket, requestArgs);
        }
      }

      // Now empty the queue to remove it as a source of additional complexity.
      socket.requestQueue = null;
    }



    /**
     * Send a JSONP request.
     *
     * @param  {Object}   opts [optional]
     * @param  {Function} cb
     * @return {XMLHttpRequest}
     */

    function jsonp(opts, cb) {
      opts = opts || {};

      if (typeof window === 'undefined') {
        // TODO: refactor node usage to live in here
        return cb();
      }

      var scriptEl = document.createElement('script');
      window._sailsIoJSConnect = function(response) {
        // In rare circumstances our script may have been vaporised.
        // Remove it, but only if it still exists
        // https://github.com/balderdashy/sails.io.js/issues/92
        if (scriptEl && scriptEl.parentNode) {
            scriptEl.parentNode.removeChild(scriptEl);
        }

        cb(response);
      };
      scriptEl.src = opts.url;
      document.getElementsByTagName('head')[0].appendChild(scriptEl);

    }




    //       ██╗███████╗ ██████╗ ███╗   ██╗      ██╗    ██╗███████╗██████╗ ███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
    //       ██║██╔════╝██╔═══██╗████╗  ██║      ██║    ██║██╔════╝██╔══██╗██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
    //       ██║███████╗██║   ██║██╔██╗ ██║█████╗██║ █╗ ██║█████╗  ██████╔╝███████╗██║   ██║██║     █████╔╝ █████╗     ██║
    //  ██   ██║╚════██║██║   ██║██║╚██╗██║╚════╝██║███╗██║██╔══╝  ██╔══██╗╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║
    //  ╚█████╔╝███████║╚██████╔╝██║ ╚████║      ╚███╔███╔╝███████╗██████╔╝███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║
    //   ╚════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝       ╚══╝╚══╝ ╚══════╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝
    //
    //  ██████╗ ███████╗███████╗██████╗  ██████╗ ███╗   ██╗███████╗███████╗     ██╗     ██╗██╗    ██╗██████╗ ██╗
    //  ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔════╝██╔════╝    ██╔╝     ██║██║    ██║██╔══██╗╚██╗
    //  ██████╔╝█████╗  ███████╗██████╔╝██║   ██║██╔██╗ ██║███████╗█████╗      ██║      ██║██║ █╗ ██║██████╔╝ ██║
    //  ██╔══██╗██╔══╝  ╚════██║██╔═══╝ ██║   ██║██║╚██╗██║╚════██║██╔══╝      ██║ ██   ██║██║███╗██║██╔══██╗ ██║
    //  ██║  ██║███████╗███████║██║     ╚██████╔╝██║ ╚████║███████║███████╗    ╚██╗╚█████╔╝╚███╔███╔╝██║  ██║██╔╝
    //  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝     ╚═╝ ╚════╝  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝
    //

    /**
     * The JWR (JSON WebSocket Response) received from a Sails server.
     *
     * @api public
     * @param  {Object}  responseCtx
     *         => :body
     *         => :statusCode
     *         => :headers
     *
     * @constructor
     */

    function JWR(responseCtx) {
      this.body = responseCtx.body || {};
      this.headers = responseCtx.headers || {};
      this.statusCode = responseCtx.statusCode || 200;
      if (this.statusCode < 200 || this.statusCode >= 400) {
        this.error = this.body || this.statusCode;
      }
    }
    JWR.prototype.toString = function() {
      return '[ResponseFromSails]' + '  -- ' +
        'Status: ' + this.statusCode + '  -- ' +
        'Headers: ' + this.headers + '  -- ' +
        'Body: ' + this.body;
    };
    JWR.prototype.toPOJO = function() {
      return {
        body: this.body,
        headers: this.headers,
        statusCode: this.statusCode
      };
    };
    JWR.prototype.pipe = function() {
      // TODO: look at substack's stuff
      return new Error('Client-side streaming support not implemented yet.');
    };




    //          ███████╗███╗   ███╗██╗████████╗███████╗██████╗  ██████╗ ███╗   ███╗ ██╗██╗
    //          ██╔════╝████╗ ████║██║╚══██╔══╝██╔════╝██╔══██╗██╔═══██╗████╗ ████║██╔╝╚██╗
    //          █████╗  ██╔████╔██║██║   ██║   █████╗  ██████╔╝██║   ██║██╔████╔██║██║  ██║
    //          ██╔══╝  ██║╚██╔╝██║██║   ██║   ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║██║  ██║
    //  ███████╗███████╗██║ ╚═╝ ██║██║   ██║   ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║╚██╗██╔╝
    //  ╚══════╝╚══════╝╚═╝     ╚═╝╚═╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝ ╚═╝╚═╝
    //

    /**
     * @api private
     * @param  {SailsSocket} socket  [description]
     * @param  {Object} requestCtx [description]
     */

    function _emitFrom(socket, requestCtx) {

      if (!socket._raw) {
        throw new Error('Failed to emit from socket- raw SIO socket is missing.');
      }

      // Since callback is embedded in requestCtx,
      // retrieve it and delete the key before continuing.
      var cb = requestCtx.cb;
      delete requestCtx.cb;

      // Name of the appropriate socket.io listener on the server
      // ( === the request method or "verb", e.g. 'get', 'post', 'put', etc. )
      var sailsEndpoint = requestCtx.method;

      socket._raw.emit(sailsEndpoint, requestCtx, function serverResponded(responseCtx) {

        // Send back (emulatedHTTPBody, jsonWebSocketResponse)
        if (cb) {
          cb(responseCtx.body, new JWR(responseCtx));
        }
      });
    }







    //  ███████╗ █████╗ ██╗██╗     ███████╗███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
    //  ██╔════╝██╔══██╗██║██║     ██╔════╝██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
    //  ███████╗███████║██║██║     ███████╗███████╗██║   ██║██║     █████╔╝ █████╗     ██║
    //  ╚════██║██╔══██║██║██║     ╚════██║╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║
    //  ███████║██║  ██║██║███████╗███████║███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║
    //  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝
    //

    /**
     * SailsSocket
     *
     * A wrapper for an underlying Socket instance that communicates directly
     * to the Socket.io server running inside of Sails.
     *
     * If no `socket` option is provied, SailsSocket will function as a mock. It will queue socket
     * requests and event handler bindings, replaying them when the raw underlying socket actually
     * connects. This is handy when we don't necessarily have the valid configuration to know
     * WHICH SERVER to talk to yet, etc.  It is also used by `io.socket` for your convenience.
     *
     * @constructor
     * @api private
     *
     * ----------------------------------------------------------------------
     * Note: This constructor should not be used directly. To obtain a `SailsSocket`
     * instance of your very own, run:
     * ```
     * var mySocket = io.sails.connect();
     * ```
     * ----------------------------------------------------------------------
     */
    function SailsSocket (opts){
      var self = this;
      opts = opts||{};

      // Set up connection options so that they can only be changed when socket is disconnected.
      var _opts = {};
      SOCKET_OPTIONS.forEach(function(option) {
        // Okay to change global headers while socket is connected
        if (option == 'headers') {return;}
        Object.defineProperty(self, option, {
          get: function() {
            if (option == 'url') {
              return _opts[option] || (self._raw && self._raw.io && self._raw.io.uri);
            }
            return _opts[option];
          },
          set: function(value) {
            // Don't allow value to be changed while socket is connected
            if (self.isConnected() && io.sails.strict !== false && value != _opts[option]) {
              throw new Error('Cannot change value of `' + option + '` while socket is connected.');
            }
            // If socket is attempting to reconnect, stop it.
            if (self._raw && self._raw.io && self._raw.io.reconnecting && !self._raw.io.skipReconnect) {
              self._raw.io.skipReconnect = true;
              consolog('Stopping reconnect; use .reconnect() to connect socket after changing options.');
            }
            _opts[option] = value;
          }
        });
      });

      // Absorb opts into SailsSocket instance
      // See https://sailsjs.org/reference/websockets/sails.io.js/SailsSocket/properties.md
      // for description of options
      SOCKET_OPTIONS.forEach(function(option) {
        self[option] = opts[option];
      });

      // Set up "eventQueue" to hold event handlers which have not been set on the actual raw socket yet.
      self.eventQueue = {};

      // Listen for special `parseError` event sent from sockets hook on the backend
      // if an error occurs but a valid callback was not received from the client
      // (i.e. so the server had no other way to send back the error information)
      self.on('sails:parseError', function (err){
        consolog('Sails encountered an error parsing a socket message sent from this client, and did not have access to a callback function to respond with.');
        consolog('Error details:',err);
      });

      // TODO:
      // Listen for a special private message on any connected that allows the server
      // to set the environment (giving us 100% certainty that we guessed right)
      // However, note that the `console.log`s called before and after connection
      // are still forced to rely on our existing heuristics (to disable, tack #production
      // onto the URL used to fetch this file.)
    }//</SailsSocket>


    /**
     * `SailsSocket.prototype._connect()`
     *
     * Begin connecting this socket to the server.
     *
     * @api private
     */
    SailsSocket.prototype._connect = function (){
      var self = this;

      self.isConnecting = true;

      // Apply `io.sails` config as defaults
      // (now that at least one tick has elapsed)
      // See https://sailsjs.org/reference/websockets/sails.io.js/SailsSocket/properties.md
      // for description of options and default values
      SOCKET_OPTIONS.forEach(function(option) {
        if ('undefined' == typeof self[option]) {
          self[option] = io.sails[option];
        }
      });

      // Headers that will be sent with the initial request to /socket.io (Node.js only)
      self.extraHeaders = self.initialConnectionHeaders || {};

      // Log a warning if non-Node.js platform attempts to use `initialConnectionHeaders`
      if (self.initialConnectionHeaders && SDK_INFO.platform !== 'node') {
        if (typeof console === 'object' && typeof console.warn === 'function') {
          console.warn('initialConnectionHeaders option available in Node.js only!');
        }
      }

      // Ensure URL has no trailing slash
      self.url = self.url ? self.url.replace(/(\/)$/, '') : undefined;

      // Mix the current SDK version into the query string in
      // the connection request to the server:
      if (typeof self.query !== 'string') self.query = SDK_INFO.versionString;
      else self.query += '&' + SDK_INFO.versionString;

      // Determine whether this is a cross-origin socket by examining the
      // hostname and port on the `window.location` object.  If it's cross-origin,
      // we'll attempt to get a cookie for the domain so that a Sails session can
      // be established.
      var isXOrigin = (function (){

        // If `window` doesn't exist (i.e. being used from Node.js), then
        // we won't bother attempting to get a cookie.  If you're using sockets
        // from Node.js and find you need to share a session between multiple
        // socket connections, you'll need to make an HTTP request to the /__getcookie
        // endpoint of the Sails server (or any endpoint that returns a set-cookie header)
        // and then use the cookie value in the `initialConnectionHeaders` option to
        // io.sails.connect()
        if (typeof window === 'undefined' || typeof window.location === 'undefined') {
          return false;
        }

        // If `self.url` (aka "target") is falsy, then we don't need to worry about it.
        if (typeof self.url !== 'string') { return false; }

        // Get information about the "target" (`self.url`)
        var targetProtocol = (function (){
          try {
            targetProtocol = self.url.match(/^([a-z]+:\/\/)/i)[1].toLowerCase();
          }
          catch (e) {}
          targetProtocol = targetProtocol || 'http://';
          return targetProtocol;
        })();
        var isTargetSSL = !!self.url.match('^https');
        var targetPort = (function (){
          try {
            return self.url.match(/^[a-z]+:\/\/[^:]*:([0-9]*)/i)[1];
          }
          catch (e){}
          return isTargetSSL ? '443' : '80';
        })();
        var targetAfterProtocol = self.url.replace(/^([a-z]+:\/\/)/i, '');


        // If target protocol is different than the actual protocol,
        // then we'll consider this cross-origin.
        if (targetProtocol.replace(/[:\/]/g, '') !== window.location.protocol.replace(/[:\/]/g,'')) {
          return true;
        }


        // If target hostname is different than actual hostname, we'll consider this cross-origin.
        var hasSameHostname = targetAfterProtocol.search(window.location.hostname) === 0;
        if (!hasSameHostname) {
          return true;
        }

        // If no actual port is explicitly set on the `window.location` object,
        // we'll assume either 80 or 443.
        var isLocationSSL = window.location.protocol.match(/https/i);
        var locationPort = (window.location.port+'') || (isLocationSSL ? '443' : '80');

        // Finally, if ports don't match, we'll consider this cross-origin.
        if (targetPort !== locationPort) {
          return true;
        }

        // Otherwise, it's the same origin.
        return false;

      })();


      // Prepare to start connecting the socket
      (function selfInvoking (cb){

        // If this is an attempt at a cross-origin or cross-port
        // socket connection via a browswe, send a JSONP request
        // first to ensure that a valid cookie is available.
        // This can be disabled by setting `io.sails.useCORSRouteToGetCookie`
        // to false.
        //
        // Otherwise, skip the stuff below.
        //
        if (!(self.useCORSRouteToGetCookie && isXOrigin)) {
          return cb();
        }

        // Figure out the x-origin CORS route
        // (Sails provides a default)
        var xOriginCookieURL = self.url;
        if (typeof self.useCORSRouteToGetCookie === 'string') {
          xOriginCookieURL += self.useCORSRouteToGetCookie;
        }
        else {
          xOriginCookieURL += '/__getcookie';
        }

        // Make the AJAX request (CORS)
        jsonp({
          url: xOriginCookieURL,
          method: 'GET'
        }, cb);

      })(function goAheadAndActuallyConnect() {

        // Now that we're ready to connect, create a raw underlying Socket
        // using Socket.io and save it as `_raw` (this will start it connecting)
        self._raw = io(self.url, self);

        // Replay event bindings from the eager socket
        self.replay();


        /**
         * 'connect' event is triggered when the socket establishes a connection
         *  successfully.
         */
        self.on('connect', function socketConnected() {
          self.isConnecting = false;
          consolog.noPrefix(
            '\n' +
            '\n' +
            // '    |>    ' + '\n' +
            // '  \\___/  '+️
            // '\n'+
             '  |>    Now connected to Sails.' + '\n' +
            '\\___/   For help, see: http://bit.ly/1DmTvgK' + '\n' +
             '        (using sails.io.js '+io.sails.sdk.platform+' SDK @v'+io.sails.sdk.version+')'+ '\n' +
            '\n'+
            '\n'+
            // '\n'+
            ''
            // ' ⚓︎ (development mode)'
            // 'e.g. to send a GET request to Sails via WebSockets, run:'+ '\n' +
            // '`io.socket.get("/foo", function serverRespondedWith (body, jwr) { console.log(body); })`'+ '\n' +
          );
        });

        self.on('disconnect', function() {
          self.connectionLostTimestamp = (new Date()).getTime();
          consolog('====================================');
          consolog('Socket was disconnected from Sails.');
          consolog('Usually, this is due to one of the following reasons:' + '\n' +
            ' -> the server ' + (self.url ? self.url + ' ' : '') + 'was taken down' + '\n' +
            ' -> your browser lost internet connectivity');
          consolog('====================================');
        });

        self.on('reconnecting', function(numAttempts) {
          consolog(
            '\n'+
            '        Socket is trying to reconnect to Sails...\n'+
            '_-|>_-  (attempt #' + numAttempts + ')'+'\n'+
            '\n'
          );
        });

        self.on('reconnect', function(transport, numAttempts) {
          if (!self.isConnecting) {
            self.on('connect', runRequestQueue.bind(self, self));
          }
          var msSinceConnectionLost = ((new Date()).getTime() - self.connectionLostTimestamp);
          var numSecsOffline = (msSinceConnectionLost / 1000);
          consolog(
            '\n'+
             '  |>    Socket reconnected successfully after'+'\n'+
            '\\___/   being offline for ~' + numSecsOffline + ' seconds.'+'\n'+
            '\n'
          );
        });

        // 'error' event is triggered if connection can not be established.
        // (usually because of a failed authorization, which is in turn
        // usually due to a missing or invalid cookie)
        self.on('error', function failedToConnect(err) {
          self.isConnecting = false;
          ////////////////////////////////////////////////////////////////////////////////////
          // Note:
          // In the future, we could provide a separate event for when a socket cannot connect
          // due to a failed `beforeConnect` (aka "authorization" if you're old school).
          // this could probably be implemented by emitting a special event from the server.
          ////////////////////////////////////////////////////////////////////////////////////

          consolog(
            'Failed to connect socket (possibly due to failed `beforeConnect` on server)',
            'Error:', err
          );
        });
      });

    };

    /**
     * Reconnect the underlying socket.
     *
     * @api public
     */
    SailsSocket.prototype.reconnect = function (){
      if (this.isConnecting) {
        throw new Error('Cannot connect- socket is already connecting');
      }
      if (this.isConnected()) {
        throw new Error('Cannot connect- socket is already connected');
      }
      return this._connect();
    };

    /**
     * Disconnect the underlying socket.
     *
     * @api public
     */
    SailsSocket.prototype.disconnect = function (){
      this.isConnecting = false;
      if (!this.isConnected()) {
        throw new Error('Cannot disconnect- socket is already disconnected');
      }
      return this._raw.disconnect();
    };



    /**
     * isConnected
     *
     * @api private
     * @return {Boolean} whether the socket is connected and able to
     *                           communicate w/ the server.
     */

    SailsSocket.prototype.isConnected = function () {
      if (!this._raw) {
        return false;
      }

      return !!this._raw.connected;
    };



    /**
     * [replay description]
     * @return {[type]} [description]
     */
    SailsSocket.prototype.replay = function (){
      var self = this;

      // Pass events and a reference to the request queue
      // off to the self._raw for consumption
      for (var evName in self.eventQueue) {
        for (var i in self.eventQueue[evName]) {
          self._raw.on(evName, self.eventQueue[evName][i]);
        }
      }

      // Bind a one-time function to run the request queue
      // when the self._raw connects.
      if ( !self.isConnected() ) {
        self._raw.once('connect', runRequestQueue.bind(self, self));
      }
      // Or run it immediately if self._raw is already connected
      else {
        runRequestQueue(self);
      }

      return self;
    };


    /**
     * Chainable method to bind an event to the socket.
     *
     * @param  {String}   evName [event name]
     * @param  {Function} fn     [event handler function]
     * @return {SailsSocket}
     */
    SailsSocket.prototype.on = function (evName, fn){

      // Bind the event to the raw underlying socket if possible.
      if (this._raw) {
        this._raw.on(evName, fn);
        return this;
      }

      // Otherwise queue the event binding.
      if (!this.eventQueue[evName]) {
        this.eventQueue[evName] = [fn];
      }
      else {
        this.eventQueue[evName].push(fn);
      }

      return this;
    };

    /**
     * Chainable method to unbind an event from the socket.
     *
     * @param  {String}   evName [event name]
     * @param  {Function} fn     [event handler function]
     * @return {SailsSocket}
     */
    SailsSocket.prototype.off = function (evName, fn){

      // Bind the event to the raw underlying socket if possible.
      if (this._raw) {
        this._raw.off(evName, fn);
        return this;
      }

      // Otherwise queue the event binding.
      if (this.eventQueue[evName] && this.eventQueue[evName].indexOf(fn) > -1) {
        this.eventQueue[evName].splice(this.eventQueue[evName].indexOf(fn), 1);
      }

      return this;
    };


    /**
     * Chainable method to unbind all events from the socket.
     *
     * @return {SailsSocket}
     */
    SailsSocket.prototype.removeAllListeners = function (){

      // Bind the event to the raw underlying socket if possible.
      if (this._raw) {
        this._raw.removeAllListeners();
        return this;
      }

      // Otherwise queue the event binding.
      this.eventQueue = {};

      return this;
    };

    /**
     * Simulate a GET request to sails
     * e.g.
     *    `socket.get('/user/3', Stats.populate)`
     *
     * @api public
     * @param {String} url    ::    destination URL
     * @param {Object} data   ::    parameters to send with the request [optional]
     * @param {Function} cb   ::    callback function to call when finished [optional]
     */

    SailsSocket.prototype.get = function(url, data, cb) {

      // `data` is optional
      if (typeof data === 'function') {
        cb = data;
        data = {};
      }

      return this.request({
        method: 'get',
        params: data,
        url: url
      }, cb);
    };



    /**
     * Simulate a POST request to sails
     * e.g.
     *    `socket.post('/event', newMeeting, $spinner.hide)`
     *
     * @api public
     * @param {String} url    ::    destination URL
     * @param {Object} data   ::    parameters to send with the request [optional]
     * @param {Function} cb   ::    callback function to call when finished [optional]
     */

    SailsSocket.prototype.post = function(url, data, cb) {

      // `data` is optional
      if (typeof data === 'function') {
        cb = data;
        data = {};
      }

      return this.request({
        method: 'post',
        data: data,
        url: url
      }, cb);
    };



    /**
     * Simulate a PUT request to sails
     * e.g.
     *    `socket.post('/event/3', changedFields, $spinner.hide)`
     *
     * @api public
     * @param {String} url    ::    destination URL
     * @param {Object} data   ::    parameters to send with the request [optional]
     * @param {Function} cb   ::    callback function to call when finished [optional]
     */

    SailsSocket.prototype.put = function(url, data, cb) {

      // `data` is optional
      if (typeof data === 'function') {
        cb = data;
        data = {};
      }

      return this.request({
        method: 'put',
        params: data,
        url: url
      }, cb);
    };



    /**
     * Simulate a DELETE request to sails
     * e.g.
     *    `socket.delete('/event', $spinner.hide)`
     *
     * @api public
     * @param {String} url    ::    destination URL
     * @param {Object} data   ::    parameters to send with the request [optional]
     * @param {Function} cb   ::    callback function to call when finished [optional]
     */

    SailsSocket.prototype['delete'] = function(url, data, cb) {

      // `data` is optional
      if (typeof data === 'function') {
        cb = data;
        data = {};
      }

      return this.request({
        method: 'delete',
        params: data,
        url: url
      }, cb);
    };



    /**
     * Simulate an HTTP request to sails
     * e.g.
     * ```
     * socket.request({
     *   url:'/user',
     *   params: {},
     *   method: 'POST',
     *   headers: {}
     * }, function (responseBody, JWR) {
     *   // ...
     * });
     * ```
     *
     * @api public
     * @option {String} url    ::    destination URL
     * @option {Object} params ::    parameters to send with the request [optional]
     * @option {Object} headers::    headers to send with the request [optional]
     * @option {Function} cb   ::    callback function to call when finished [optional]
     * @option {String} method ::    HTTP request method [optional]
     */

    SailsSocket.prototype.request = function(options, cb) {

      var usage =
      'Usage:\n'+
      'socket.request( options, [fnToCallWhenComplete] )\n\n'+
      'options.url :: e.g. "/foo/bar"'+'\n'+
      'options.method :: e.g. "get", "post", "put", or "delete", etc.'+'\n'+
      'options.params :: e.g. { emailAddress: "mike@sailsjs.org" }'+'\n'+
      'options.headers :: e.g. { "x-my-custom-header": "some string" }';
      // Old usage:
      // var usage = 'Usage:\n socket.'+(options.method||'request')+'('+
      //   ' destinationURL, [dataToSend], [fnToCallWhenComplete] )';


      // Validate options and callback
      if (typeof options !== 'object' || typeof options.url !== 'string') {
        throw new Error('Invalid or missing URL!\n' + usage);
      }
      if (options.method && typeof options.method !== 'string') {
        throw new Error('Invalid `method` provided (should be a string like "post" or "put")\n' + usage);
      }
      if (options.headers && typeof options.headers !== 'object') {
        throw new Error('Invalid `headers` provided (should be a dictionary with string values)\n' + usage);
      }
      if (options.params && typeof options.params !== 'object') {
        throw new Error('Invalid `params` provided (should be a dictionary with JSON-serializable values)\n' + usage);
      }
      if (options.data && typeof options.data !== 'object') {
        throw new Error('Invalid `data` provided (should be a dictionary with JSON-serializable values)\n' + usage);
      }
      if (cb && typeof cb !== 'function') {
        throw new Error('Invalid callback function!\n' + usage);
      }

      // Accept either `params` or `data` for backwards compatibility (but not both!)
      if (options.data && options.params) {
        throw new Error('Cannot specify both `params` and `data`!  They are aliases of each other.\n' + usage);
      }
      else if (options.data) {
        options.params = options.data;
        delete options.data;
      }


      // If this socket is not connected yet, queue up this request
      // instead of sending it.
      // (so it can be replayed when the socket comes online.)
      if ( ! this.isConnected() ) {

        // If no queue array exists for this socket yet, create it.
        this.requestQueue = this.requestQueue || [];
        this.requestQueue.push([options, cb]);
        return;
      }

      // Otherwise, our socket is connected, so continue prepping
      // the request.

      // Default headers to an empty object
      options.headers = options.headers || {};

      // Build a simulated request object
      // (and sanitize/marshal options along the way)
      var requestCtx = {

        method: options.method.toLowerCase() || 'get',

        headers: options.headers,

        data: options.params || options.data || {},

        // Remove trailing slashes and spaces to make packets smaller.
        url: options.url.replace(/^(.+)\/*\s*$/, '$1'),

        cb: cb
      };

      // Merge global headers in
      if (this.headers && 'object' == typeof this.headers) {
        for (var header in this.headers) {
          if (!options.headers.hasOwnProperty(header)) {
            options.headers[header] = this.headers[header];
          }
        }
      }

      // Send the request.
      _emitFrom(this, requestCtx);
    };



    /**
     * Socket.prototype._request
     *
     * Simulate HTTP over Socket.io.
     *
     * @api private
     * @param  {[type]}   options [description]
     * @param  {Function} cb      [description]
     */
    SailsSocket.prototype._request = function(options, cb) {
      throw new Error('`_request()` was a private API deprecated as of v0.11 of the sails.io.js client. Use `.request()` instead.');
    };







    //  ██╗ ██████╗    ███████╗ █████╗ ██╗██╗     ███████╗
    //  ██║██╔═══██╗   ██╔════╝██╔══██╗██║██║     ██╔════╝
    //  ██║██║   ██║   ███████╗███████║██║██║     ███████╗
    //  ██║██║   ██║   ╚════██║██╔══██║██║██║     ╚════██║
    //  ██║╚██████╔╝██╗███████║██║  ██║██║███████╗███████║
    //  ╚═╝ ╚═════╝ ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
    //
    // Set an `io.sails` object that may be used for configuration before the
    // first socket connects (i.e. to allow auto-connect behavior to be
    // prevented by setting `io.sails.autoConnect` in an inline script
    // directly after the script tag which loaded this file).


    //  ┌─┐┌─┐┌┬┐  ┬ ┬┌─┐  ╔╦╗╔═╗╔═╗╔═╗╦ ╦╦ ╔╦╗╔═╗  ┌─┐┌─┐┬─┐  ┬┌─┐ ┌─┐┌─┐┬┬  ┌─┐
    //  └─┐├┤  │   │ │├─┘   ║║║╣ ╠╣ ╠═╣║ ║║  ║ ╚═╗  ├┤ │ │├┬┘  ││ │ └─┐├─┤││  └─┐
    //  └─┘└─┘ ┴   └─┘┴    ═╩╝╚═╝╚  ╩ ╩╚═╝╩═╝╩ ╚═╝  └  └─┘┴└─  ┴└─┘o└─┘┴ ┴┴┴─┘└─┘
    io.sails = {

      // Whether to automatically connect a socket and save it as `io.socket`.
      autoConnect: true,

      // The route (path) to hit to get a x-origin (CORS) cookie
      // (or true to use the default: '/__getcookie')
      useCORSRouteToGetCookie: true,

      // The environment we're running in.
      // (logs are not displayed when this is set to 'production')
      //
      // Defaults to development unless this script was fetched from a URL
      // that ends in `*.min.js` or '#production' (may also be manually overridden.)
      //
      environment: urlThisScriptWasFetchedFrom.match(/(\#production|\.min\.js)/g) ? 'production' : 'development',

      // The version of this sails.io.js client SDK
      sdk: SDK_INFO,

      // Transports to use when communicating with the server, in the order they will be tried
      transports: ['polling', 'websocket']
    };



    //  ┌─┐─┐ ┬┌┬┐┌─┐┌┐┌┌┬┐  ┬┌─┐ ┌─┐┌─┐┬┬  ┌─┐  ┌┬┐┌─┐┌─┐┌─┐┬ ┬┬ ┌┬┐┌─┐
    //  ├┤ ┌┴┬┘ │ ├┤ │││ ││  ││ │ └─┐├─┤││  └─┐   ││├┤ ├┤ ├─┤│ ││  │ └─┐
    //  └─┘┴ └─ ┴ └─┘┘└┘─┴┘  ┴└─┘o└─┘┴ ┴┴┴─┘└─┘  ─┴┘└─┘└  ┴ ┴└─┘┴─┘┴ └─┘
    //  ┬ ┬┬┌┬┐┬ ┬  ┌┬┐┬ ┬┌─┐  ╦ ╦╔╦╗╔╦╗╦    ╔═╗╔╦╗╔╦╗╦═╗╦╔╗ ╦ ╦╔╦╗╔═╗╔═╗
    //  ││││ │ ├─┤   │ ├─┤├┤   ╠═╣ ║ ║║║║    ╠═╣ ║  ║ ╠╦╝║╠╩╗║ ║ ║ ║╣ ╚═╗
    //  └┴┘┴ ┴ ┴ ┴   ┴ ┴ ┴└─┘  ╩ ╩ ╩ ╩ ╩╩═╝  ╩ ╩ ╩  ╩ ╩╚═╩╚═╝╚═╝ ╩ ╚═╝╚═╝
    //  ┌─┐┬─┐┌─┐┌┬┐  ┌┬┐┬ ┬┌─┐  ┌─┐┌─┐┬─┐┬┌─┐┌┬┐  ┌┬┐┌─┐┌─┐
    //  ├┤ ├┬┘│ ││││   │ ├─┤├┤   └─┐│  ├┬┘│├─┘ │    │ ├─┤│ ┬
    //  └  ┴└─└─┘┴ ┴   ┴ ┴ ┴└─┘  └─┘└─┘┴└─┴┴   ┴    ┴ ┴ ┴└─┘
    //
    // Now fold in config provided as HTML attributes on the script tag:
    // (note that if `io.sails.*` is changed after this script, those changes
    //  will still take precedence)
    CONFIGURABLE_VIA_HTML_ATTR.forEach(function (configKey){
      if (typeof scriptTagConfig[configKey] !== 'undefined') {
        io.sails[configKey] = scriptTagConfig[configKey];
      }
    });
    //////////////////////////////////////////////////////////////////////////////
    // Note that the new HTML attribute configuration style may eventually
    // completely replace the original approach of setting `io.sails` properties,
    // since the new strategy is easier to reason about.  Also, it would allow us
    // to remove the timeout below someday.
    //////////////////////////////////////////////////////////////////////////////




    //  ┬┌─┐ ┌─┐┌─┐┬┬  ┌─┐ ╔═╗╔═╗╔╗╔╔╗╔╔═╗╔═╗╔╦╗  /  \
    //  ││ │ └─┐├─┤││  └─┐ ║  ║ ║║║║║║║║╣ ║   ║  /   /
    //  ┴└─┘o└─┘┴ ┴┴┴─┘└─┘o╚═╝╚═╝╝╚╝╝╚╝╚═╝╚═╝ ╩  \  /

    /**
     * Add `io.sails.connect` function as a wrapper for the built-in `io()` aka `io.connect()`
     * method, returning a SailsSocket. This special function respects the configured io.sails
     * connection URL, as well as sending other identifying information (most importantly, the
     * current version of this SDK).
     *
     * @param  {String} url  [optional]
     * @param  {Object} opts [optional]
     * @return {Socket}
     */
    io.sails.connect = function(url, opts) {

      // Make URL optional
      if ('object' === typeof url) {
        opts = url;
        url = null;
      }

      // Default opts to empty object
      opts = opts || {};

      // If explicit connection url is specified, save it to options
      opts.url = url || opts.url || undefined;

      // Instantiate and return a new SailsSocket- and try to connect immediately.
      var socket = new SailsSocket(opts);
      socket._connect();
      return socket;
    };






    //  ██╗ ██████╗    ███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
    //  ██║██╔═══██╗   ██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
    //  ██║██║   ██║   ███████╗██║   ██║██║     █████╔╝ █████╗     ██║
    //  ██║██║   ██║   ╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║
    //  ██║╚██████╔╝██╗███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║
    //  ╚═╝ ╚═════╝ ╚═╝╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝
    //
    // io.socket
    //
    // The eager instance of Socket which will automatically try to connect
    // using the host that this js file was served from.
    //
    // This can be disabled or configured by setting properties on `io.sails.*` within the
    // first cycle of the event loop.
    //


    // Build `io.socket` so it exists
    // (note that this DOES NOT start the connection process)
    io.socket = new SailsSocket();
    //
    // This socket is not connected yet, and has not even _started_ connecting.
    //
    // But in the mean time, this eager socket will be queue events bound by the user
    // before the first cycle of the event loop (using `.on()`), which will later
    // be rebound on the raw underlying socket.


    //  ┌─┐┌─┐┌┬┐  ┌─┐┬ ┬┌┬┐┌─┐   ┌─┐┌─┐┌┐┌┌┐┌┌─┐┌─┐┌┬┐  ┌┬┐┬┌┬┐┌─┐┬─┐
    //  └─┐├┤  │   ├─┤│ │ │ │ │───│  │ │││││││├┤ │   │    │ ││││├┤ ├┬┘
    //  └─┘└─┘ ┴   ┴ ┴└─┘ ┴ └─┘   └─┘└─┘┘└┘┘└┘└─┘└─┘ ┴    ┴ ┴┴ ┴└─┘┴└─
    // If configured to do so, start auto-connecting after the first cycle of the event loop
    // has completed (to allow time for this behavior to be configured/disabled
    // by specifying properties on `io.sails`)
    setTimeout(function() {

      // If autoConnect is disabled, delete the eager socket (io.socket) and bail out.
      if (io.sails.autoConnect === false || io.sails.autoconnect === false) {
        delete io.socket;
        return;
      }

      // consolog('Eagerly auto-connecting socket to Sails... (requests will be queued in the mean-time)');
      io.socket._connect();


    }, 0); // </setTimeout>


    // Return the `io` object.
    return io;
  } //</SailsIOClient>

  //
  /////////////////////////////////////////////////////////////////////////////////
  ///// </bunches of private function definitions, constructors, and methods>
  /////////////////////////////////////////////////////////////////////////////////




  //  ███████╗██╗  ██╗██████╗  ██████╗ ███████╗███████╗    ███████╗██████╗ ██╗  ██╗
  //  ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔════╝██╔════╝    ██╔════╝██╔══██╗██║ ██╔╝
  //  █████╗   ╚███╔╝ ██████╔╝██║   ██║███████╗█████╗      ███████╗██║  ██║█████╔╝
  //  ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║╚════██║██╔══╝      ╚════██║██║  ██║██╔═██╗
  //  ███████╗██╔╝ ██╗██║     ╚██████╔╝███████║███████╗    ███████║██████╔╝██║  ██╗
  //  ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚══════╝╚══════╝    ╚══════╝╚═════╝ ╚═╝  ╚═╝
  //


  // Add CommonJS support to allow this client SDK to be used from Node.js.
  if (SDK_INFO.platform === 'node') {
    module.exports = SailsIOClient;
  }
  // Add AMD support, registering this client SDK as an anonymous module.
  else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return SailsIOClient;
    });
  }
  else {
    // Otherwise, try to instantiate the client using the global `io`:
    SailsIOClient();

    // Note:
    // If you are modifying this file manually to wrap an existing socket.io client
    // (e.g. to prevent pollution of the global namespace), you can replace the global
    // `io` with your own `io` instance above.
  }

})();
