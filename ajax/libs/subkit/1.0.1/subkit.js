'use strict';
var Subkit = function(config){
	var self = this;
	this.__proto__.self = self;
	
	self.UUID = function () {
		// http://www.ietf.org/rfc/rfc4122.txt
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
		    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";

		var uuid = s.join("");
		return uuid;
	};
	var getXhr = function (callback) {
		if (window.XMLHttpRequest) {
		  return callback(null, new XMLHttpRequest());
		} else if (window.ActiveXObject) {
		  try {
		    return callback(null, new ActiveXObject("Msxml2.XMLHTTP"));
		  } catch (e) {
		    return callback(null, new ActiveXObject("Microsoft.XMLHTTP"));
		  }
		}
		return callback(new Error());
	};
	var encodeUsingUrlEncoding = function (data) {
		if(typeof data === 'string') {
		  return data;
		}

		var result = [];
		for(var dataItem in data) {
		  if(data.hasOwnProperty(dataItem)) {
		    result.push(encodeURIComponent(dataItem) + '=' + encodeURIComponent(data[dataItem]));
		  }
		}

		return result.join('&');
	};
	var utf8 = function (text) {
		text = text.replace(/\r\n/g, '\n');
		var result = '';

		for(var i = 0; i < text.length; i++) {
		  var c = text.charCodeAt(i);

		  if(c < 128) {
		      result += String.fromCharCode(c);
		  } else if((c > 127) && (c < 2048)) {
		      result += String.fromCharCode((c >> 6) | 192);
		      result += String.fromCharCode((c & 63) | 128);
		  } else {
		      result += String.fromCharCode((c >> 12) | 224);
		      result += String.fromCharCode(((c >> 6) & 63) | 128);
		      result += String.fromCharCode((c & 63) | 128);
		  }
		}

		return result;
	};
	var base64 = function (text) {
		var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

		text = utf8(text);
		var result = '',
		    chr1, chr2, chr3,
		    enc1, enc2, enc3, enc4,
		    i = 0;

		do {
		  chr1 = text.charCodeAt(i++);
		  chr2 = text.charCodeAt(i++);
		  chr3 = text.charCodeAt(i++);

		  enc1 = chr1 >> 2;
		  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		  enc4 = chr3 & 63;

		  if(isNaN(chr2)) {
		    enc3 = enc4 = 64;
		  } else if(isNaN(chr3)) {
		    enc4 = 64;
		  }

		  result +=
		    keyStr.charAt(enc1) +
		    keyStr.charAt(enc2) +
		    keyStr.charAt(enc3) +
		    keyStr.charAt(enc4);
		  chr1 = chr2 = chr3 = '';
		  enc1 = enc2 = enc3 = enc4 = '';
		} while(i < text.length);

		return result;
	};
	var mergeHeaders = function () {
		var result = arguments[0];
		for(var i = 1; i < arguments.length; i++) {
		  var currentHeaders = arguments[i];
		  for(var header in currentHeaders) {
		    if(currentHeaders.hasOwnProperty(header)) {
		      result[header] = currentHeaders[header];
		    }
		  }
		}
		return result;
	};
	var ajax = function (method, url, options, callback, logCallback) {
		if(typeof options === 'function') {
		  callback = options;
		  options = {};
		}
		options.cache = options.cache || true;
		options.headers = options.headers || {};
		options.jsonp = options.jsonp || false;

		var headers = mergeHeaders({
		  'accept': '*/*',
		  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		  'x-auth-token': options.apiKey
		}, ajax.headers, options.headers);

		if(options.data) {
			var payload;
			if ((method === 'GET') && (headers['Content-Type'] === 'application/json')) {
			  payload = encodeUsingUrlEncoding(options.data);
			} 
			else if (headers['Content-Type'] === 'application/json') {
			  payload = JSON.stringify(options.data);
			} 
			else if(headers['Content-Type'].indexOf('application/octed-stream') !== -1){
			  payload = options.data;
			}
			else {
			  payload = encodeUsingUrlEncoding(options.data);      
			}
		}

		if(method === 'GET') {
		  var queryString = [];
		  if(payload) {
		    queryString.push(payload);
		    payload = null;
		  }

		  if(!options.cache) {
		    queryString.push('_=' + (new Date()).getTime());
		  }

		  if(options.jsonp) {
		    queryString.push('callback=' + options.jsonp);
		    queryString.push('jsonp=' + options.jsonp);
		  }

		  queryString = '?' + queryString.join('&');
		  url += queryString !== '?' ? queryString : '';

		  if(options.jsonp) {
		    var head = document.getElementsByTagName('head')[0];
		    var script = document.createElement('script');
		    script.type = 'text/javascript';
		    script.src = url;
		    head.appendChild(script);        
		    return;
		  }
		}
		var xhrRef = null;
		getXhr(function (err, xhr) {
			xhrRef = xhr;
		  if(err) return callback(err);
		  xhr.open(method, url, options.async || true);
		  for(var header in headers) {
		    if(headers.hasOwnProperty(header)) {
		      xhr.setRequestHeader(header, headers[header]);
		    }
		  }
		  xhr.onerror = function(){
			callback(xhr.status, {
				text: function () {
				  return xhr.statusText;
				}
			});
		  };
		  xhr.onreadystatechange = function () {
		    if(xhr.readyState === 4 && xhr.status !== 0) {
				var log = this.getResponseHeader('subkit-log');
				if(logCallback) logCallback(log);	

				if(!callback) return;
				var data = xhr.responseText || '';
				callback(xhr.status, {
					text: function () {
					  return data;
					},
					json: function () {
						if(data) return JSON.parse(data);
						return {};
					},
					headers: function(){
 						return xhr.getAllResponseHeaders();
  					}
				});
		    };
		  };

		  xhr.send(payload);
		});
		return xhrRef;
	};
	var httpRequest = {
		authBasic: function (username, password) {
		  httpRequest.headers({});
		  ajax.headers['Authorization'] = 'Basic ' + base64(username + ':' + password);
		},
		connect: function (url, options, callback, logCallback) {
		  return ajax('CONNECT', url, options, callback, logCallback);      
		},
		del: function (url, options, callback, logCallback) {
		  return ajax('DELETE', url, options, callback, logCallback);      
		},
		get: function (url, options, callback, logCallback) {
		  return ajax('GET', url, options, callback, logCallback);
		},
		head: function (url, options, callback, logCallback) {
		  return ajax('HEAD', url, options, callback, logCallback);
		},
		headers: function (headers) {
		  ajax.headers = headers || {};
		},
		isAllowed: function (url, verb, callback, logCallback) {
		  this.options(url, function (status, data) {
		    callback(data.text().indexOf(verb) !== -1);
		  }, logCallback);
		},
		options: function (url, options, callback, logCallback) {
		  return ajax('OPTIONS', url, options, callback, logCallback);
		},
		patch: function (url, options, callback, logCallback) {
		  return ajax('PATCH', url, options, callback, logCallback);      
		},
		post: function (url, options, callback, logCallback) {
		  return ajax('POST', url, options, callback, logCallback);      
		},
		put: function (url, options, callback, logCallback) {
		  return ajax('PUT', url, options, callback, logCallback);      
		},
		trace: function (url, options, callback, logCallback) {
		  return ajax('TRACE', url, options, callback, logCallback);
		}
	};

	var _init = function(clientId){
		var clientId = window.sessionStorage.getItem("clientId");
		if(!clientId) {
			clientId = self.UUID();
			window.sessionStorage.setItem("clientId", clientId);
		}
		return clientId;
	};
	self.clientId = config.clientId || _init();
	self.baseUrl = config.baseUrl || ((window.location.origin.indexOf('http') !== -1) ? window.location.origin : 'https://localhost:8080');
    self.options = { 
    	apiKey: config.apiKey || "",
    	username: config.username || "",
    	password: config.password || "",
    	headers : {
    		'Content-Type': 'application/json'
    	}
    };
	var statusListeners = [];
	self.subscribed = {};
	
	var _changeStatus = function(status){
		if(status.json) status = status.json();
		
		statusListeners.forEach(function(listener){
			listener(status);
		});
	};

	self.manage = {
		login: function(callback){
			var url = self.baseUrl + "/manage/login";
			httpRequest.authBasic(self.options.username, self.options.password);
			httpRequest.post(url, self.options, function(status, result){
				if(status !== 200){
					if(callback) callback({message:"authentication failed"});
				}
				else {
					self.options.apiKey = result.json().api.apiKey;
					var result = {
						apiKey: self.options.apiKey,
						username: self.options.username,
						password: self.options.password,
						baseUrl: self.baseUrl,
						devCenterUrl: self.baseUrl + "/devcenter/index"
					}
					if(callback) callback(null, result);
				}
			});
		},
		import: function(file, callback){
			var msg = JSON.parse(JSON.stringify(self.options));
			msg.headers = {
			  'Content-Type': 'application/octed-stream',
			  apiKey: config.apiKey
			};
			msg["data"] = file;
			var url = self.baseUrl + '/manage/import';
			httpRequest.post(url, msg, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 201) return callback(result.json());
				callback(null, result.json());
			});
		},
		export: function(callback){
			var url = self.baseUrl + '/manage/export';
			httpRequest.get(url, self.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 200) return callback(result.json());
				callback(null, 'data:application/octet-stream,' + result.text());
			});
		},
		backup: function(callback){
		},
		restore: function(name, callback){
		},
		acl:{
			list: function(identity, callback){
				var url = self.baseUrl + '/shares/';
				
				if(typeof identity === 'function'){
					url += 'identities';
					callback = identity;
				} else {
					url += identity;
				}

				httpRequest.get(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200) return callback(result.json());
					console.log(result.json());
					callback(null, result.json());
				});
			},
			set: function(key, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key);
				httpRequest.post(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 201) return callback(result.json());
					callback(null, result.json());
				});
			},
			remove: function(key, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key);
				httpRequest.del(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			grantWrite: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/grantwrite/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			grantDelete: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/grantdelete/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			grantRead: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/grantread/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			revokeWrite: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/revokewrite/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			revokeDelete: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/revokedelete/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			revokeRead: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/revokeread/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			}
		},
		password: {
			set: function(oldPassword, newPassword, verifyPassword, callback){
				var url = self.baseUrl + '/manage/password/actions/reset';
				var msg = JSON.parse(JSON.stringify(self.options));
				msg["data"] = {
					password: oldPassword,
					newPassword: newPassword,
					newPasswordValidation: verifyPassword
				};
				httpRequest.put(url, msg, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200 &&  status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			}
		},
		user: {
			set: function(username, callback){
				var url = self.baseUrl + '/manage/user';
				var msg = JSON.parse(JSON.stringify(self.options));
				msg["data"] = {
					username: username
				};
				httpRequest.put(url, msg, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200 &&  status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			}
		},
		apikey: {
			reset: function(callback){
				var url = self.baseUrl + '/manage/apikey/actions/reset';
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200 &&  status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			}
		},
		certificate:{
			get: function(callback){
				var url = self.baseUrl + '/manage/certificate';
				httpRequest.get(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200) return callback(result.json());
					callback(null, result.json());
				});
			},
			set: function(certificate, key, callback){
				var url = self.baseUrl + '/manage/certificate/actions/change';
				var msg = JSON.parse(JSON.stringify(self.options));
				msg["data"] = {
					certificate: certificate,
					key: key
				};
				httpRequest.put(url, msg, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200 &&  status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			}
		},
		status: {
			get: function(callback){
				var url = self.baseUrl + '/manage/os';
				httpRequest.get(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200) return callback(result.json());
					callback(null, result.json());
				});
			}
		},
		run: function(taskName,value,callback){
			var url = self.baseUrl + "/task/run/"+taskName;
			var msg = JSON.parse(JSON.stringify(self.options));
			msg['data'] = value;
			httpRequest.get(url, self.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "No network connection."});
				if(status !== 200) return callback(result.json());
				callback(null, result.json());
			});
  		}
	};
	self.store = function(store){
		var _prepareUrl = function(key){
			if(store && !key) return self.baseUrl + '/stores/' + store;
			if(store && key) return self.baseUrl + '/stores/' + store + '/' + key;
			if(!store && key && key.indexOf('!') !== -1) {
				key = key.replace(/^[a-zA-z0-9]\/\//, '!');
				return self.baseUrl + '/stores/' + key;
			}
			if(!store && key) return self.baseUrl + '/stores/' + key;
			return self.baseUrl + '/stores';
		};
		var Continuation = function(){
			var self = this;
			self.doneResult = function(){};
			self.errorResult = function(){};
			self.done = function(callback){
				self.doneResult = callback;
				return self;
			};
			self.error = function(callback){
				self.errorResult = callback;
				return self;
			};
		};
		var pollingRequestRef = null;

		var ref = {
			key: function(){
				return self.UUID();
			},
			import: function(file, callback){
				var msg = JSON.parse(JSON.stringify(self.options));
				msg.headers = {
					'Content-Type': 'application/octed-stream',
					apiKey: config.apiKey
				};
				msg["data"] = file;
				var url = self.baseUrl + '/manage/import/' + store;
				httpRequest.post(url, msg, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 201) return callback(result.json());
					callback(null, result.json());
				});
			},
			export: function(callback){
				var url = self.baseUrl + '/manage/export/' + store;
				httpRequest.get(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200) return callback(result.json());
					callback(null, 'data:application/octet-stream,' + result.text());
				});
			},
			set: function(key, value, callback){
				var key = arguments[0];
				var value = arguments[1];

				if(arguments.length == 1 && key instanceof Object){
					value = key;
					key = self.UUID()
				}
				var url = _prepareUrl(key);
				var continueWith = new Continuation();
				var msg = JSON.parse(JSON.stringify(self.options));
				msg['data'] = value;
				
				httpRequest.post(url, msg, function(status, result){
					if(status!==200 && status!==201) {
						continueWith.errorResult(result.text());
						_changeStatus(result.text());
						if(callback) callback(result.text());
					}else{
						continueWith.doneResult(result.json());
						if(callback) callback(null, result.json());
					}
				});
				return continueWith;
			},
			get: function(key, callback){
				var continueWith = new Continuation();
				httpRequest.get(_prepareUrl(key), self.options, function(status, result){
					if(status===0 && status!==200) {
						continueWith.errorResult(result.text());
						_changeStatus(result.text());
						if(callback) callback(result.text());
					}else{
						continueWith.doneResult(result.json());
						if(callback) callback(null, result.json());
					}
				});
				return continueWith;
			},
			remove: function(key, callback){
				var continueWith = new Continuation();
				httpRequest.del(_prepareUrl(key), self.options, function(status, result){
					if(status!==200 && status!==202) {
						continueWith.errorResult(result.text());
						_changeStatus(result.text());
						if(callback) callback(result.text());
					}else{
						continueWith.doneResult(result.json());
						if(callback) callback(null, result.json());
					}
				});
				return continueWith;
			},
			history: function(callback){
				var continueWith = new Continuation();
				var result = [];
				continueWith.doneResult(result);
				if(callback) callback(null, result);
				return ref;
			},
			on: function(callback){
				if(self.subscribed[store] && pollingRequestRef) {
					pollingRequestRef().abort();
				}
				self.subscribed[store] = true;
				pollingRequestRef = _poll(store, self.clientId, callback);
				_changeStatus("subscribed to " + store);	
				return ref;
			},
			off: function(){
				delete self.subscribed[store];
				if(pollingRequestRef) pollingRequestRef().abort();
				_changeStatus("unsubscribed from " + store);	
				return ref;
			}
		};
		return ref;
	};
	self.notify = {
		upload: function(provider, env, file, callback){
			var msg = JSON.parse(JSON.stringify(self.options));
			msg.headers = {
			  'Content-Type': 'application/octed-stream',
			  apiKey: config.apiKey
			};
			msg["data"] = file;
			var url = self.baseUrl + "/push/upload/" + provider + "/" + env;
			httpRequest.post(url, msg, function(status, result){
				if(status!==201) {
					if(callback) _changeStatus(result);
				}else{
					if(callback) callback();
				}
			});
		},
		send: function(value, callback){
			var url = self.baseUrl + "/push/send";
			var msg = JSON.parse(JSON.stringify(self.options));
			msg["data"] = value;
			httpRequest.post(url, msg, function(status, result){
				if(status!==200 && status!==201) {
					if(callback) _changeStatus(result);
				}else{
					if(callback) callback(null, result.json());
				}
			});
		},
		settings: {
			load: function(callback){
				_get("/push/settings", callback);
			},
			save: function(value, callback){
				var url = self.baseUrl + "/push/settings";
				var msg = JSON.parse(JSON.stringify(self.options));
				msg["data"] = value;
				httpRequest.put(url, msg, function(status, result){
					if(status!==200 && status!==201) {
						if(callback) _changeStatus(result);
					}else{
						if(callback) callback(null, result.json());
					}
				});
			}
		}
	};
	self.pubsub = {
		channels: function(callback){
			var url = self.baseUrl + "/pubsub/channels";
			httpRequest.get(url, self.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "No network connection."});
				if(status !== 200) return callback(result.json());
				callback(null, result.json());
			});
		},
		push: function(channel, value, callback){
			var url = self.baseUrl + "/pubsub/channel/publish/" + channel;
			var msg = JSON.parse(JSON.stringify(self.options));
			msg["data"] = value;
			httpRequest.post(url, msg, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "No network connection."});
				if(status !== 200) return callback(result.json());
				callback(null, result.json());
			});
		},
		on: function(channel, callback) {
			channel = channel.replace("/", "_");
			self.subscribed[channel] = true;
			_changeStatus("subscribed to " + channel);
			var pollingRequestRef = _poll(channel, self.clientId, callback);
			return {
				off: function(){
					delete self.subscribed[channel];
					if(pollingRequestRef) pollingRequestRef().abort();
					_changeStatus("unsubscribed from " + channel);	
				},
				push: function(value, callback){
					self.pubsub.push(channel, value, callback);
				}
			}
		}
	};
	self.statistics = {
		minutes: function(callback){
			var url = self.baseUrl + "/statistics/minutes";
			httpRequest.get(url, self.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "No network connection."});
				if(status !== 200) return callback(result.json());
				callback(null, result.json());
			});
		},
		summary: function(callback){
			var url = self.baseUrl + "/statistics/summary";
			httpRequest.get(url, self.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "No network connection."});
				if(status !== 200) return callback(result.json());
				callback(null, result.json());
			});
		}
	};
	self.plugin = {
		list: function(callback){
			var url = self.baseUrl + '/plugin';
			httpRequest.get(url, self.options, function(status, result){
				if(status !== 200) {
					if(callback) callback(result.json());
				}else{
					if(callback) callback(null, result.json());
				}
			});
		}
	};
	if(!self.task){
		self.task = {
			run: function(taskName,value,callback){
				var url = self.baseUrl + "/task/run/"+taskName;
				var msg = JSON.parse(JSON.stringify(self.options));
				msg['data'] = value;
				httpRequest.get(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: "No network connection."});
					if(status !== 200) return callback(result.json());
					callback(null, result.json());
				});
			}
		};
	}
	self.httpRequest = httpRequest;
	
	var _get = function(path, callback){
		var url = self.baseUrl + path;
		httpRequest.get(url, self.options, function(status, result){
			if(!callback) return;
			if(status === 0) return callback({message: "No network connection."});
			if(status !== 200) return callback(result.json());
			callback(null, result.json());
		});		
	};
	var _poll = function(channel, clientId, callback) {
		var subscribeUrl = self.baseUrl + "/pubsub/subscribe/" + channel + "/" + clientId;
		var request = null;
		var count = 1;

		(function _pollRef(){
			request = httpRequest.get(subscribeUrl, self.options, function(status, result){
				if(status !== 200) {
					if(self.subscribed[channel]){
						callback({message: "subscription error - retry"});
						setTimeout(function(){_pollRef(channel, clientId, callback);},300*count++);
					}
				}else{
					count = 1;
					result.json().forEach(function(item){
						callback(null, item.value);
					});
					if(self.subscribed[channel]) _pollRef(channel, clientId, callback);
				}
			});
		})();

		return function(){
			return request;
		};
	};
};