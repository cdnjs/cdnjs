
/*
	qwest, ajax library with promises and XHR2 support

	Author
		Aurélien Delogu (dev@dreamysource.fr)
*/

(function(def){
	if(typeof define=='function'){
		define(def);
	}
	else if(typeof module!='undefined'){
		module.exports=def;
	}
	else{
		this.qwest=def;
	}
}(function(){
	
	var win=window,
		// Variables for limit mechanism
		limit=null,
		requests=0,
		request_stack=[],
		// Get XMLHttpRequest object
		getXHR=function(){
			return win.XMLHttpRequest?
					new XMLHttpRequest():
					new ActiveXObject('Microsoft.XMLHTTP');
			},
		// Guess XHR version
		version2=(getXHR().responseType===''),
		
	// Core function
	qwest=function(method,url,data,options,before){

		// Format
		data=data || null;
		options=options || {};

		var typeSupported=false,
			xhr=getXHR(),
			async=options.async===undefined?true:!!options.async,
			cache=options.cache,
			type=options.type?options.type.toLowerCase():'json',
			user=options.user || '',
			password=options.password || '',
			headers={'X-Requested-With':'XMLHttpRequest'},
			accepts={
				xml : 'application/xml, text/xml',
				html: 'text/html',
				//text: 'text/plain',
				json: 'application/json, text/javascript',
				js  : 'application/javascript, text/javascript'
			},
			toUpper=function(match,p1,p2){return p1+p2.toUpperCase();},
			vars='',
			i,j,
			parseError='parseError',
			serialized,
			success_stack=[],
			error_stack=[],
			complete_stack=[],
			response,
			success,
			error,
			func,
			// Define promises
			promises={
				success:function(func){
					if(async){
						success_stack.push(func);
					}
					else if(success){
						func.apply(xhr,[response]);
					}
					return promises;
				},
				error:function(func){
					if(async){
						error_stack.push(func);
					}
					else if(error){
						func.apply(xhr,[response]);
					}
					return promises;
				},
				complete:function(func){
					if(async){
						complete_stack.push(func);
					}
					else{
						func.apply(xhr);
					}
					return promises;
				}
			},
			promises_limit={
				success:function(func){
					request_stack[request_stack.length-1].success.push(func);
					return promises_limit;
				},
				error:function(func){
					request_stack[request_stack.length-1].error.push(func);
					return promises_limit;
				},
				complete:function(func){
					request_stack[request_stack.length-1].complete.push(func);
					return promises_limit;
				}
			},
			// Handle the response
			handleResponse=function(){
				// Prepare
				var i,req,p;
				--requests;
				// Launch next stacked request
				if(request_stack.length){
					req=request_stack.shift();
					p=qwest(req.method,req.url,req.data,req.options,req.before);
					for(i=0;func=req.success[i];++i){
						p.success(func);
					}
					for(i=0;func=req.error[i];++i){
						p.error(func);
					}
					for(i=0;func=req.complete[i];++i){
						p.complete(func);
					}
				}
				// Handle response
				try{
					// Verify status code
					if(!/^2/.test(xhr.status)){
						throw xhr.status+' ('+xhr.statusText+')';
					}
					// Init
					var responseText='responseText',
						responseXML='responseXML';
					// Process response
					/*if(type=='text' || type=='html'){
						response=xhr[responseText];
					}
					else */if(typeSupported && xhr.response!==undefined){
						response=xhr.response;
					}
					else{
						switch(type){
							case 'json':
								try{
									if(win.JSON){
										response=win.JSON.parse(xhr[responseText]);
									}
									else{
										response=eval('('+xhr[responseText]+')');
									}
								}
								catch(e){
									throw "Error while parsing JSON body";
								}
								break;
							case 'js':
								response=eval(xhr[responseText]);
								break;
							case 'xml':
								if(!xhr[responseXML] || (xhr[responseXML][parseError] && xhr[responseXML][parseError].errorCode && xhr[responseXML][parseError].reason)){
									throw "Error while parsing XML body";
								}
								else{
									response=xhr[responseXML];
								}
								break;
							default:
								//throw "Unsupported "+type+" type";
								response=xhr[responseText];
						}
					}
					// Execute success stack
					success=true;
					if(async){
						for(i=0;func=success_stack[i];++i){
							func.apply(xhr,[response]);
						}
					}
				}
				catch(e){
					error=true;
					response="Request to '"+url+"' aborted: "+e;
					// Execute error stack
					if(async){
						for(i=0;func=error_stack[i];++i){
							func.apply(xhr,[response]);
						}
					}
				}
				// Execute complete stack
				if(async){
					for(i=0;func=complete_stack[i];++i){
						func.apply(xhr);
					}
				}
			},
			// Recursively build the query string
			buildData = function(data, key) {
				var res = [],
					enc = encodeURIComponent;
				if(typeof data === 'object' && data != null) {
					for(var p in data) {
						if(data.hasOwnProperty(p)) {
							res = res.concat(buildData(data[p], key ? key + '[' + p + ']' : p));
						}
					}
				} else if(data != null && key != null) {
					res.push(enc(key) + '=' + enc(data));
				}
				return res.join('&');
			};
		//Copy options headers to headers
		if(options.headers){
            for(i in options.headers){
                headers[i] = options.headers[i];
            }
        }		
		// Limit requests
		if(limit && requests==limit){
			// Stock current request
			request_stack.push({
				method      : method,
				url         : url,
				data        : data,
				options     : options,
				before      : before,
				success     : [],
				error       : [],
				complete    : []
			});
			// Return promises
			return promises_limit;
		}
		// New request
		++requests;
		// Prepare data
		if(
			win.ArrayBuffer && 
			(data instanceof ArrayBuffer ||
			data instanceof Blob ||
			data instanceof Document ||
			data instanceof FormData)
		){
			if(method=='GET'){
				data=null;
			}
		}
		else if(/\/json$/.test(headers['Content-Type'])){
			data=JSON.stringify(data);		
		}
		else{
			data = buildData(data);
			serialized=true;
		}
		
		// Prepare URL
		if(method=='GET'){
			vars+=data;
		}
		if(cache==null){
			cache=(method=='POST');
		}
		if(!cache){
			if(vars){
				vars+='&';
			}
			vars+='__t='+Date.now();
		}
		if(vars){
			url+=(/\?/.test(url)?'&':'?')+vars;
		}
		// Open connection
		xhr.open(method,url,async,user,password);
		// Identify supported XHR version
		if(type && version2){
			try{
				xhr.responseType=type;
				typeSupported=(xhr.responseType==type);
			}
			catch(e){}
		}
		// Plug response handler
		if(version2){
			xhr.onload=handleResponse;
		}
		else{
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4){
					handleResponse();
				}
			};
		}
		// Prepare headers
		for(i in headers){
			j=i.replace(/(^|-)([^-])/g,toUpper);
			if(j != i){
				headers[j]=headers[i];
				delete headers[i];
			}
			xhr.setRequestHeader(j,headers[j]);
		}
		if(!headers['Content-Type'] && serialized && method=='POST'){
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		}
		if(!headers.Accept){
			xhr.setRequestHeader('Accept',accepts[type]);
		}
		// Before
		if(before){
			before.apply(xhr);
		}
		// Send request
		xhr.send(method=='POST'?data:null);
		// Return promises
		return promises;
		
	};

	// Return final qwest object
	return {
		get:function(url,data,options,before){
			return qwest('GET',url,data,options,before);
		},
		post:function(url,data,options,before){
			return qwest('POST',url,data,options,before);
		},
		xhr2:version2,
		limit:function(by){
			limit=by;
		}
	};
	
}()));
