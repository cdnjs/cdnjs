/**!
 * AngularJS file upload/drop directive and service with progress and abort
 * @author  Danial  <danial.farid@gmail.com>
 * @version 3.0.6
 */
(function() {
	
function patchXHR(fnName, newFn) {
	window.XMLHttpRequest.prototype[fnName] = newFn(window.XMLHttpRequest.prototype[fnName]);
}

if (window.XMLHttpRequest && !window.XMLHttpRequest.__isFileAPIShim) {
	patchXHR('setRequestHeader', function(orig) {
		return function(header, value) {
			if (header === '__setXHR_') {
				var val = value(this);
				// fix for angular < 1.2.0
				if (val instanceof Function) {
					val(this);
				}
			} else {
				orig.apply(this, arguments);
			}
		}
	});
}
	
var angularFileUpload = angular.module('angularFileUpload', []);

angularFileUpload.version = '3.0.6';
angularFileUpload.service('$upload', ['$http', '$q', '$timeout', function($http, $q, $timeout) {
	function sendHttp(config) {
		config.method = config.method || 'POST';
		config.headers = config.headers || {};
		config.transformRequest = config.transformRequest || function(data, headersGetter) {
			if (window.ArrayBuffer && data instanceof window.ArrayBuffer) {
				return data;
			}
			return $http.defaults.transformRequest[0](data, headersGetter);
		};
		var deferred = $q.defer();
		var promise = deferred.promise;

		config.headers['__setXHR_'] = function() {
			return function(xhr) {
				if (!xhr) return;
				config.__XHR = xhr;
				config.xhrFn && config.xhrFn(xhr);
				xhr.upload.addEventListener('progress', function(e) {
					e.config = config;
					deferred.notify ? deferred.notify(e) : promise.progress_fn && $timeout(function(){promise.progress_fn(e)});
				}, false);
				//fix for firefox not firing upload progress end, also IE8-9
				xhr.upload.addEventListener('load', function(e) {
					if (e.lengthComputable) {
						e.config = config;
						deferred.notify ? deferred.notify(e) : promise.progress_fn && $timeout(function(){promise.progress_fn(e)});
					}
				}, false);
			};
		};

		$http(config).then(function(r){deferred.resolve(r)}, function(e){deferred.reject(e)}, function(n){deferred.notify(n)});
		
		promise.success = function(fn) {
			promise.then(function(response) {
				fn(response.data, response.status, response.headers, config);
			});
			return promise;
		};

		promise.error = function(fn) {
			promise.then(null, function(response) {
				fn(response.data, response.status, response.headers, config);
			});
			return promise;
		};

		promise.progress = function(fn) {
			promise.progress_fn = fn;
			promise.then(null, null, function(update) {
				fn(update);
			});
			return promise;
		};
		promise.abort = function() {
			if (config.__XHR) {
				$timeout(function() {
					config.__XHR.abort();
				});
			}
			return promise;
		};
		promise.xhr = function(fn) {
			config.xhrFn = (function(origXhrFn) {
				return function() {
					origXhrFn && origXhrFn.apply(promise, arguments);
					fn.apply(promise, arguments);
				}
			})(config.xhrFn);
			return promise;
		};
		
		return promise;
	}

	this.upload = function(config) {
		config.headers = config.headers || {};
		config.headers['Content-Type'] = undefined;
		var origTransformRequest = config.transformRequest;
		config.transformRequest = config.transformRequest ? 
				(Object.prototype.toString.call(config.transformRequest) === '[object Array]' ? 
						config.transformRequest : [config.transformRequest]) : [];
		config.transformRequest.push(function(data, headerGetter) {
			var formData = new FormData();
			var allFields = {};
			for (var key in config.fields) allFields[key] = config.fields[key];
			if (data) allFields['data'] = data;
			
			if (config.formDataAppender) {
				for (var key in allFields) {
					config.formDataAppender(formData, key, allFields[key]);
				}
			} else {
				for (var key in allFields) {
					var val = allFields[key];
					if (val !== undefined) {
						if (Object.prototype.toString.call(val) === '[object String]') {
							formData.append(key, val);
						} else {
							if (config.sendObjectsAsJsonBlob && typeof val === 'object') {
								formData.append(key, new Blob([val], { type: 'application/json' }));
							} else {
								formData.append(key, JSON.stringify(val));
							}
						}
					}
				}
			}

			if (config.file != null) {
				var fileFormName = config.fileFormDataName || 'file';

				if (Object.prototype.toString.call(config.file) === '[object Array]') {
					var isFileFormNameString = Object.prototype.toString.call(fileFormName) === '[object String]';
					for (var i = 0; i < config.file.length; i++) {
						formData.append(isFileFormNameString ? fileFormName : fileFormName[i], config.file[i], 
								(config.fileName && config.fileName[i]) || config.file[i].name);
					}
				} else {
					formData.append(fileFormName, config.file, config.fileName || config.file.name);
				}
			}
			return formData;
		});

		return sendHttp(config);
	};

	this.http = function(config) {
		return sendHttp(config);
	};
}]);

angularFileUpload.directive('ngFileSelect', [ '$parse', '$timeout', '$compile', 
                                              function($parse, $timeout, $compile) { return {
	restrict: 'AEC',
	require:'?ngModel',
	link: function(scope, elem, attr, ngModel) {
		handleFileSelect(scope, elem, attr, ngModel, $parse, $timeout, $compile);
	}
}}]);

function handleFileSelect(scope, elem, attr, ngModel, $parse, $timeout, $compile) {
	function isInputTypeFile() {
		return elem[0].tagName.toLowerCase() === 'input' && elem.attr('type') && elem.attr('type').toLowerCase() === 'file'; 
	}
	
	var watchers = [];

	function watch(attrVal) {
		$timeout(function() {
			if (elem.parent().length) {
				watchers.push(scope.$watch(attrVal, function(val, oldVal) {
					if (val != oldVal) {
						recompileElem();
					}
				}));
			}
		});
	}

	function recompileElem() {
		var clone = elem.clone();
		if (elem.attr('__afu_gen__')) {
			angular.element(document.getElementById(elem.attr('id').substring(1))).remove();
		}
		if (elem.parent().length) {
			for (var i = 0; i < watchers.length; i++) {
				watchers[i]();
			}
			elem.replaceWith(clone);
			$compile(clone)(scope);
		}
		return clone;
	}
	
	function bindAttr(bindAttr, attrName) {
		if (bindAttr) {
			watch(bindAttr);
			var val = $parse(bindAttr)(scope);
			if (val) {
				elem.attr(attrName, val);
				attr[attrName] = val;
			} else {
				elem.attr(attrName, null);
				delete attr[attrName];				
			}
		}
	}
	
	bindAttr(attr.ngMultiple, 'multiple');
	bindAttr(attr.ngAccept, 'accept');
	bindAttr(attr.ngCapture, 'capture');
	
	if (attr['ngFileSelect'] != '') {
		attr.ngFileChange = attr.ngFileSelect;
	}
	
	function onChangeFn(evt) {
		var files = [], fileList, i;
		fileList = evt.__files_ || (evt.target && evt.target.files);
		updateModel(fileList, attr, ngModel, scope, evt);
	};
	
	var fileElem = elem;
	if (!isInputTypeFile()) {
		fileElem = angular.element('<input type="file">')
		if (attr['multiple']) fileElem.attr('multiple', attr['multiple']);
		if (attr['accept']) fileElem.attr('accept', attr['accept']);
		if (attr['capture']) fileElem.attr('capture', attr['capture']);
		for (var key in attr) {
			if (key.indexOf('inputFile') == 0) {
				var name = key.substring('inputFile'.length);
				name = name[0].toLowerCase() + name.substring(1);
				fileElem.attr(name, attr[key]);
			}
		}

		fileElem.css('width', '0px').css('height', '0px').css('position', 'absolute').css('padding', 0).css('margin', 0)
				.css('overflow', 'hidden').attr('tabindex', '-1').css('opacity', 0).attr('__afu_gen__', true);
		elem.attr('__refElem__', true);
		fileElem[0].__refElem__ = elem[0];
		elem.parent()[0].insertBefore(fileElem[0], elem[0])
		elem.css('overflow', 'hidden');
		elem.bind('click', function(e) {
			if (!resetAndClick(e)) {
				fileElem[0].click();
			}
		});
	} else {
		elem.bind('click', resetAndClick);
	}
	
	function resetAndClick(evt) {
		var isChanged = fileElem[0].value != null && fileElem[0].value != '';
		// reset the value to allow selecting the same file again
		fileElem[0].value = null;
		// chrome fires change event on popup cancel so no need for special handling but for others
		// we cannot detect the user clicking cancel on file select popup and it doesn't fire change event, 
		// so we fire a null change event before the popup opens for these browsers so if the user 
		// clicks cancel the previous file value will be removed and model will be notified. 
		if (navigator.userAgent.indexOf("Chrome") === -1) {
			// if this is manual click trigger we don't need to reset again 
			if (!elem.attr('__afu_clone__')) {
				if (isChanged) {
					onChangeFn({target: {files: []}});
				}
				// fix for IE10 cannot set the value of the input to null programmatically by cloning and replacing input
				if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
					var clone = recompileElem();
					clone.attr('__afu_clone__', true);
					clone[0].click();
					evt.preventDefault();
					evt.stopPropagation();
					return true;
				}
			} else {
				elem.attr('__afu_clone__', null);
			}
		}
	}
	
	fileElem.bind('change', onChangeFn);
	
    elem.on('$destroy', function() {
		for (var i = 0; i < watchers.length; i++) {
			watchers[i]();
		}
		if (elem[0] != fileElem[0]) fileElem.remove();
    });
	
	watchers.push(scope.$watch(attr.ngModel, function(val, oldVal) {
		if (val != oldVal && (val == null || !val.length)) {
			if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
				recompileElem();
			} else {
				fileElem[0].value = null;
			}
		}
	}));
	
	function updateModel(fileList, attr, ngModel, scope, evt) {
		var files = [], rejFiles = [];
		var regexp = attr['accept'] ? new RegExp(globStringToRegex(attr['accept']), 'gi') : null;

		for (var i = 0; i < fileList.length; i++) {
			var file = fileList.item(i);
			if (!regexp || file.type.match(regexp) || (file.name != null && file.name.match(regexp))) {
				files.push(file);
			} else {
				rejFiles.push(file);
			}
		}
		if (ngModel) {
			$timeout(function() {
				$parse(attr.ngModel).assign(scope, files);
				ngModel && ngModel.$setViewValue(files != null && files.length == 0 ? '' : files);
				if (attr.ngModelRejected) {
					$parse(attr.ngModelRejected).assign(scope, rejFiles);
				}
			});
		}
		if (attr.ngFileChange && attr.ngFileChange != "") {
			$timeout(function() {
				$parse(attr.ngFileChange)(scope, {
					$files: files,
					$rejectedFiles: rejFiles,
					$event: evt
				});
			});
		}
	}
}

angularFileUpload.directive('ngFileDrop', [ '$parse', '$timeout', '$location', function($parse, $timeout, $location) { return {
	restrict: 'AEC',
	require:'?ngModel',
	link: function(scope, elem, attr, ngModel) {
		handleDrop(scope, elem, attr, ngModel, $parse, $timeout, $location);
	}
}}]);

angularFileUpload.directive('ngNoFileDrop', function() { 
	return function(scope, elem, attr) {
		if (dropAvailable()) elem.css('display', 'none')
	}
});

//for backward compatibility
angularFileUpload.directive('ngFileDropAvailable', [ '$parse', '$timeout', function($parse, $timeout) { 
	return function(scope, elem, attr) {
		if (dropAvailable()) {
			var fn = $parse(attr['ngFileDropAvailable']);
			$timeout(function() {
				fn(scope);
			});
		}
	}
}]);

function handleDrop(scope, elem, attr, ngModel, $parse, $timeout, $location) {
	var available = dropAvailable();
	if (attr['dropAvailable']) {
		$timeout(function() {
			scope.dropAvailable ? scope.dropAvailable.value = available : scope.dropAvailable = available;
		});
	}
	if (!available) {
		if ($parse(attr.hideOnDropNotAvailable)(scope) != false) {
			elem.css('display', 'none');
		}
		return;
	}
	var leaveTimeout = null;
	var stopPropagation = $parse(attr.stopPropagation)(scope);
	var dragOverDelay = 1;
	var accept = $parse(attr.ngAccept)(scope) || attr.accept;
	var regexp = accept ? new RegExp(globStringToRegex(accept), 'gi') : null;
	var actualDragOverClass;
	elem[0].addEventListener('dragover', function(evt) {
		evt.preventDefault();
		if (stopPropagation) evt.stopPropagation();
		// handling dragover events from the Chrome download bar
		if (navigator.userAgent.indexOf("Chrome") > -1) {
			var b = evt.dataTransfer.effectAllowed;
			evt.dataTransfer.dropEffect = ('move' === b || 'linkMove' === b) ? 'move' : 'copy';
		}
		$timeout.cancel(leaveTimeout);
		if (!scope.actualDragOverClass) {
			actualDragOverClass = calculateDragOverClass(scope, attr, evt);
		}
		elem.addClass(actualDragOverClass);
	}, false);
	elem[0].addEventListener('dragenter', function(evt) {
		evt.preventDefault();
		if (stopPropagation) evt.stopPropagation();
	}, false);
	elem[0].addEventListener('dragleave', function(evt) {
		leaveTimeout = $timeout(function() {
			elem.removeClass(actualDragOverClass);
			actualDragOverClass = null;
		}, dragOverDelay || 1);
	}, false);
	if (attr['ngFileDrop'] != '') {
		attr.ngFileChange = scope.ngFileDrop;
	}
	elem[0].addEventListener('drop', function(evt) {
		evt.preventDefault();
		if (stopPropagation) evt.stopPropagation();
		elem.removeClass(actualDragOverClass);
		actualDragOverClass = null;
		extractFiles(evt, function(files, rejFiles) {
			$timeout(function() {
				if (ngModel) {
					$parse(attr.ngModel).assign(scope, files);
					ngModel && ngModel.$setViewValue(files != null && files.length == 0 ? '' : files);
				}
				if (attr['ngModelRejected']) {
					if (scope[attr.ngModelRejected]) {
						$parse(attr.ngModelRejected).assign(scope, rejFiles);
					}
				}
			});
			$timeout(function() {
				$parse(attr.ngFileChange)(scope, {
					$files: files,
					$rejectedFiles: rejFiles,
					$event: evt
				});
			});
		}, $parse(attr.allowDir)(scope) != false, attr.multiple || $parse(attr.ngMultiple)(scope));
	}, false);
	
	function calculateDragOverClass(scope, attr, evt) {
		var valid = true;
		if (regexp) {
			var items = evt.dataTransfer.items;
			if (items != null) {
				for (var i = 0 ; i < items.length && valid; i++) {
					valid = valid && (items[i].kind == 'file' || items[i].kind == '') && 
						(items[i].type.match(regexp) != null || (items[i].name != null && items[i].name.match(regexp) != null));
				}
			}
		}
		var clazz = $parse(attr.dragOverClass)(scope, {$event : evt});
		if (clazz) {
			if (clazz.delay) dragOverDelay = clazz.delay; 
			if (clazz.accept) clazz = valid ? clazz.accept : clazz.reject;
		}
		return clazz || attr['dragOverClass'] || 'dragover';
	}
				
	function extractFiles(evt, callback, allowDir, multiple) {
		var files = [], rejFiles = [], items = evt.dataTransfer.items, processing = 0;
		
		function addFile(file) {
			if (!regexp || file.type.match(regexp) || (file.name != null && file.name.match(regexp))) {
				files.push(file);
			} else {
				rejFiles.push(file);
			}
		}
		
		if (items && items.length > 0 && $location.protocol() != 'file') {
			for (var i = 0; i < items.length; i++) {
				if (items[i].webkitGetAsEntry && items[i].webkitGetAsEntry() && items[i].webkitGetAsEntry().isDirectory) {
					var entry = items[i].webkitGetAsEntry();
					if (entry.isDirectory && !allowDir) {
						continue;
					}
					if (entry != null) {
						traverseFileTree(files, entry);
					}
				} else {
					var f = items[i].getAsFile();
					if (f != null) addFile(f);
				}
				if (!multiple && files.length > 0) break;
			}
		} else {
			var fileList = evt.dataTransfer.files;
			if (fileList != null) {
				for (var i = 0; i < fileList.length; i++) {
					addFile(fileList.item(i));
					if (!multiple && files.length > 0) break;
				}
			}
		}
		var delays = 0;
		(function waitForProcess(delay) {
			$timeout(function() {
				if (!processing) {
					if (!multiple && files.length > 1) {
						var i = 0;
						while (files[i].type == 'directory') i++;
						files = [files[i]];
					}
					callback(files, rejFiles);
				} else {
					if (delays++ * 10 < 20 * 1000) {
						waitForProcess(10);
					}
				}
			}, delay || 0)
		})();
		
		function traverseFileTree(files, entry, path) {
			if (entry != null) {
				if (entry.isDirectory) {
					var filePath = (path || '') + entry.name;
					addFile({name: entry.name, type: 'directory', path: filePath});
					var dirReader = entry.createReader();
					var entries = [];
					processing++;
					var readEntries = function() {
						dirReader.readEntries(function(results) {
							try {
								if (!results.length) {
									for (var i = 0; i < entries.length; i++) {
										traverseFileTree(files, entries[i], (path ? path : '') + entry.name + '/');
									}
									processing--;
								} else {
									entries = entries.concat(Array.prototype.slice.call(results || [], 0));
									readEntries();
								}
							} catch (e) {
								processing--;
								console.error(e);
							}
						}, function() {
							processing--;
						});
					};
					readEntries();
				} else {
					processing++;
					entry.file(function(file) {
						try {
							processing--;
							file.path = (path ? path : '') + file.name;
							addFile(file);
						} catch (e) {
							processing--;
							console.error(e);
						}
					}, function(e) {
						processing--;
					});
				}
			}
		}
	}
}

function dropAvailable() {
    var div = document.createElement('div');
    return ('draggable' in div) && ('ondrop' in div);
}

function globStringToRegex(str) {
	if (str.length > 2 && str[0] === '/' && str[str.length -1] === '/') {
		return str.substring(1, str.length - 1);
	}
	var split = str.split(','), result = '';
	if (split.length > 1) {
		for (var i = 0; i < split.length; i++) {
			result += '(' + globStringToRegex(split[i]) + ')';
			if (i < split.length - 1) {
				result += '|'
			}
		}
	} else {
		if (str.indexOf('.') == 0) {
			str= '*' + str;
		}
		result = '^' + str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + '-]', 'g'), '\\$&') + '$';
		result = result.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
	}
	return result;
}

var ngFileUpload = angular.module('ngFileUpload', []);

for (var key in angularFileUpload) {
	ngFileUpload[key] = angularFileUpload[key];
}

})();

/**!
 * AngularJS file upload/drop directive and service with progress and abort
 * FileAPI Flash shim for old browsers not supporting FormData 
 * @author  Danial  <danial.farid@gmail.com>
 * @version 3.0.6
 */

(function() {

var hasFlash = function() {
	try {
	  var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	  if (fo) return true;
	} catch(e) {
	  if (navigator.mimeTypes['application/x-shockwave-flash'] != undefined) return true;
	}
	return false;
}

function patchXHR(fnName, newFn) {
	window.XMLHttpRequest.prototype[fnName] = newFn(window.XMLHttpRequest.prototype[fnName]);
};

if ((window.XMLHttpRequest && !window.FormData) || (window.FileAPI && FileAPI.forceLoad)) {
	var initializeUploadListener = function(xhr) {
		if (!xhr.__listeners) {
			if (!xhr.upload) xhr.upload = {};
			xhr.__listeners = [];
			var origAddEventListener = xhr.upload.addEventListener;
			xhr.upload.addEventListener = function(t, fn, b) {
				xhr.__listeners[t] = fn;
				origAddEventListener && origAddEventListener.apply(this, arguments);
			};
		}
	}
	
	patchXHR('open', function(orig) {
		return function(m, url, b) {
			initializeUploadListener(this);
			this.__url = url;
			try {
				orig.apply(this, [m, url, b]);
			} catch (e) {
				if (e.message.indexOf('Access is denied') > -1) {
					this.__origError = e;
					orig.apply(this, [m, '_fix_for_ie_crossdomain__', b]);
				}
			}
		}
	});

	patchXHR('getResponseHeader', function(orig) {
		return function(h) {
			return this.__fileApiXHR && this.__fileApiXHR.getResponseHeader ? this.__fileApiXHR.getResponseHeader(h) : (orig == null ? null : orig.apply(this, [h]));
		};
	});

	patchXHR('getAllResponseHeaders', function(orig) {
		return function() {
			return this.__fileApiXHR && this.__fileApiXHR.getAllResponseHeaders ? this.__fileApiXHR.getAllResponseHeaders() : (orig == null ? null : orig.apply(this));
		}
	});

	patchXHR('abort', function(orig) {
		return function() {
			return this.__fileApiXHR && this.__fileApiXHR.abort ? this.__fileApiXHR.abort() : (orig == null ? null : orig.apply(this));
		}
	});

	patchXHR('setRequestHeader', function(orig) {
		return function(header, value) {
			if (header === '__setXHR_') {
				initializeUploadListener(this);
				var val = value(this);
				// fix for angular < 1.2.0
				if (val instanceof Function) {
					val(this);
				}
			} else {
				this.__requestHeaders = this.__requestHeaders || {};
				this.__requestHeaders[header] = value;
				orig.apply(this, arguments);
			}
		}
	});
	
	function redefineProp(xhr, prop, fn) {
		try {
			Object.defineProperty(xhr, prop, {get: fn});
		} catch (e) {/*ignore*/}
	}

	patchXHR('send', function(orig) {
		return function() {
			var xhr = this;
			if (arguments[0] && arguments[0].__isFileAPIShim) {
				var formData = arguments[0];
				var config = {
					url: xhr.__url,
					jsonp: false, //removes the callback form param
					cache: true, //removes the ?fileapiXXX in the url
					complete: function(err, fileApiXHR) {
						xhr.__completed = true;
						if (!err && xhr.__listeners['load']) 
							xhr.__listeners['load']({type: 'load', loaded: xhr.__loaded, total: xhr.__total, target: xhr, lengthComputable: true});
						if (!err && xhr.__listeners['loadend']) 
							xhr.__listeners['loadend']({type: 'loadend', loaded: xhr.__loaded, total: xhr.__total, target: xhr, lengthComputable: true});
						if (err === 'abort' && xhr.__listeners['abort']) 
							xhr.__listeners['abort']({type: 'abort', loaded: xhr.__loaded, total: xhr.__total, target: xhr, lengthComputable: true});
						if (fileApiXHR.status !== undefined) redefineProp(xhr, 'status', function() {return (fileApiXHR.status == 0 && err && err !== 'abort') ? 500 : fileApiXHR.status});
						if (fileApiXHR.statusText !== undefined) redefineProp(xhr, 'statusText', function() {return fileApiXHR.statusText});
						redefineProp(xhr, 'readyState', function() {return 4});
						if (fileApiXHR.response !== undefined) redefineProp(xhr, 'response', function() {return fileApiXHR.response});
						var resp = fileApiXHR.responseText || (err && fileApiXHR.status == 0 && err !== 'abort' ? err : undefined);
						redefineProp(xhr, 'responseText', function() {return resp});
						redefineProp(xhr, 'response', function() {return resp});
						if (err) redefineProp(xhr, 'err', function() {return err});
						xhr.__fileApiXHR = fileApiXHR;
						if (xhr.onreadystatechange) xhr.onreadystatechange();
						if (xhr.onload) xhr.onload();
					},
					fileprogress: function(e) {
						e.target = xhr;
						xhr.__listeners['progress'] && xhr.__listeners['progress'](e);
						xhr.__total = e.total;
						xhr.__loaded = e.loaded;
						if (e.total === e.loaded) {
							// fix flash issue that doesn't call complete if there is no response text from the server  
							var _this = this
							setTimeout(function() {
								if (!xhr.__completed) {
									xhr.getAllResponseHeaders = function(){};
									_this.complete(null, {status: 204, statusText: 'No Content'});
								}
							}, FileAPI.noContentTimeout || 10000);
						}
					},
					headers: xhr.__requestHeaders
				}
				config.data = {};
				config.files = {}
				for (var i = 0; i < formData.data.length; i++) {
					var item = formData.data[i];
					if (item.val != null && item.val.name != null && item.val.size != null && item.val.type != null) {
						config.files[item.key] = item.val;
					} else {
						config.data[item.key] = item.val;
					}
				}

				setTimeout(function() {
					if (!hasFlash()) {
						throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
					}
					xhr.__fileApiXHR = FileAPI.upload(config);
				}, 1);
			} else {
				if (this.__origError) {
					throw this.__origError;
				}
				orig.apply(xhr, arguments);
			}
		}
	});
	window.XMLHttpRequest.__isFileAPIShim = true;

	var addFlash = function(elem) {
		if (!hasFlash()) {
			throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
		}
		var el = angular.element(elem);
		if (!el.attr('disabled')) {
			var hasFileSelect = false;
			for (var i = 0; i < el[0].attributes.length; i++) {
				var attrib = el[0].attributes[i];
				if (attrib.name.indexOf('file-select') !== -1) {
					hasFileSelect = true;
					break;
				}
			}
			if (!el.hasClass('js-fileapi-wrapper') && (hasFileSelect || el.attr('__afu_gen__') != null)) {
				
				el.addClass('js-fileapi-wrapper');
				if (el.attr('__afu_gen__') != null) {
					var ref = (el[0].__refElem__ && angular.element(el[0].__refElem__)) || el;
					while (ref && !ref.attr('__refElem__')) {
						ref = angular.element(ref[0].nextSibling);
					}
					ref.bind('mouseover', function() {
						if (el.parent().css('position') === '' || el.parent().css('position') === 'static') {
							el.parent().css('position', 'relative');
						}
						el.css('position', 'absolute').css('top', ref[0].offsetTop + 'px').css('left', ref[0].offsetLeft + 'px')
							.css('width', ref[0].offsetWidth + 'px').css('height', ref[0].offsetHeight + 'px')
							.css('padding', ref.css('padding')).css('margin', ref.css('margin')).css('filter', 'alpha(opacity=0)');
						ref.attr('onclick', '');
						el.css('z-index', '1000');
					});
				}
			}
		}
	};
	var changeFnWrapper = function(fn) {
		return function(evt) {
			var files = FileAPI.getFiles(evt);
			//just a double check for #233
			for (var i = 0; i < files.length; i++) {
				if (files[i].size === undefined) files[i].size = 0;
				if (files[i].name === undefined) files[i].name = 'file';
				if (files[i].type === undefined) files[i].type = 'undefined';
			}
			if (!evt.target) {
				evt.target = {};
			}
			evt.target.files = files;
			// if evt.target.files is not writable use helper field
			if (evt.target.files != files) {
				evt.__files_ = files;
			}
			(evt.__files_ || evt.target.files).item = function(i) {
				return (evt.__files_ || evt.target.files)[i] || null;
			}
			if (fn) fn.apply(this, [evt]);
		};
	};
	var isFileChange = function(elem, e) {
		return (e.toLowerCase() === 'change' || e.toLowerCase() === 'onchange') && elem.getAttribute('type') == 'file';
	}
	if (HTMLInputElement.prototype.addEventListener) {
		HTMLInputElement.prototype.addEventListener = (function(origAddEventListener) {
			return function(e, fn, b, d) {
				if (isFileChange(this, e)) {
					addFlash(this);
					origAddEventListener.apply(this, [e, changeFnWrapper(fn), b, d]);
				} else {
					origAddEventListener.apply(this, [e, fn, b, d]);
				}
			}
		})(HTMLInputElement.prototype.addEventListener);
	}
	if (HTMLInputElement.prototype.attachEvent) {
		HTMLInputElement.prototype.attachEvent = (function(origAttachEvent) {
			return function(e, fn) {
				if (isFileChange(this, e)) {
					addFlash(this);
					if (window.jQuery) {
						// fix for #281 jQuery on IE8
						angular.element(this).bind('change', changeFnWrapper(null));
					} else {
						origAttachEvent.apply(this, [e, changeFnWrapper(fn)]);
					}
				} else {
					origAttachEvent.apply(this, [e, fn]);
				}
			}
		})(HTMLInputElement.prototype.attachEvent);
	}

	window.FormData = FormData = function() {
		return {
			append: function(key, val, name) {
				if (val.__isFileAPIBlobShim) {
					val = val.data[0];
				}
				this.data.push({
					key: key,
					val: val,
					name: name
				});
			},
			data: [],
			__isFileAPIShim: true
		};
	};

	window.Blob = Blob = function(b) {
		return {
			data: b,
			__isFileAPIBlobShim: true
		};
	};

	(function () {
		//load FileAPI
		if (!window.FileAPI) {
			window.FileAPI = {};
		}
		if (FileAPI.forceLoad) {
			FileAPI.html5 = false;
		}
		
		if (!FileAPI.upload) {
			var jsUrl, basePath, script = document.createElement('script'), allScripts = document.getElementsByTagName('script'), i, index, src;
			if (window.FileAPI.jsUrl) {
				jsUrl = window.FileAPI.jsUrl;
			} else if (window.FileAPI.jsPath) {
				basePath = window.FileAPI.jsPath;
			} else {
				for (i = 0; i < allScripts.length; i++) {
					src = allScripts[i].src;
					index = src.search(/\/angular\-file\-upload[\-a-zA-z0-9\.]*\.js/)
					if (index > -1) {
						basePath = src.substring(0, index + 1);
						break;
					}
				}
			}

			if (FileAPI.staticPath == null) FileAPI.staticPath = basePath;
			script.setAttribute('src', jsUrl || basePath + 'FileAPI.min.js');
			document.getElementsByTagName('head')[0].appendChild(script);
			FileAPI.hasFlash = hasFlash();
		}
	})();
	FileAPI.disableFileInput = function(elem, disable) {
		if (disable) {
			elem.removeClass('js-fileapi-wrapper')
		} else {
			elem.addClass('js-fileapi-wrapper');
		}
	}
}


if (!window.FileReader) {
	window.FileReader = function() {
		var _this = this, loadStarted = false;
		this.listeners = {};
		this.addEventListener = function(type, fn) {
			_this.listeners[type] = _this.listeners[type] || [];
			_this.listeners[type].push(fn);
		};
		this.removeEventListener = function(type, fn) {
			_this.listeners[type] && _this.listeners[type].splice(_this.listeners[type].indexOf(fn), 1);
		};
		this.dispatchEvent = function(evt) {
			var list = _this.listeners[evt.type];
			if (list) {
				for (var i = 0; i < list.length; i++) {
					list[i].call(_this, evt);
				}
			}
		};
		this.onabort = this.onerror = this.onload = this.onloadstart = this.onloadend = this.onprogress = null;

		var constructEvent = function(type, evt) {
			var e = {type: type, target: _this, loaded: evt.loaded, total: evt.total, error: evt.error};
			if (evt.result != null) e.target.result = evt.result;
			return e;
		};
		var listener = function(evt) {
			if (!loadStarted) {
				loadStarted = true;
				_this.onloadstart && _this.onloadstart(constructEvent('loadstart', evt));
			}
			if (evt.type === 'load') {
				_this.onloadend && _this.onloadend(constructEvent('loadend', evt));
				var e = constructEvent('load', evt);
				_this.onload && _this.onload(e);
				_this.dispatchEvent(e);
			} else if (evt.type === 'progress') {
				var e = constructEvent('progress', evt);
				_this.onprogress && _this.onprogress(e);
				_this.dispatchEvent(e);
			} else {
				var e = constructEvent('error', evt);
				_this.onerror && _this.onerror(e);
				_this.dispatchEvent(e);
			}
		};
		this.readAsArrayBuffer = function(file) {
			FileAPI.readAsBinaryString(file, listener);
		}
		this.readAsBinaryString = function(file) {
			FileAPI.readAsBinaryString(file, listener);
		}
		this.readAsDataURL = function(file) {
			FileAPI.readAsDataURL(file, listener);
		}
		this.readAsText = function(file) {
			FileAPI.readAsText(file, listener);
		}
	}
}
})();
