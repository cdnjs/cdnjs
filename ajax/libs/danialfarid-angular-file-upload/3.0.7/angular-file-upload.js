/**!
 * AngularJS file upload/drop directive and service with progress and abort
 * @author  Danial  <danial.farid@gmail.com>
 * @version 3.0.7
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

angularFileUpload.version = '3.0.7';
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
		if (fileElem[0].value != null && fileElem[0].value != '') {
			fileElem[0].value = null;
			// IE 11 already fires change event when you set the value to null
			if (navigator.userAgent.indexOf("Trident/7") === -1) {
				onChangeFn({target: {files: []}});
			}
		}
		// if this is manual click trigger we don't need to reset again 
		if (!elem.attr('__afu_clone__')) {
			// fix for IE10 cannot set the value of the input to null programmatically by cloning and replacing input
			// IE 11 setting the value to null event will be fired after file change clearing the selected file so 
			// we just recreate the element for IE 11 as well
			if (navigator.appVersion.indexOf("MSIE 10") !== -1 || navigator.userAgent.indexOf("Trident/7") !== -1) {
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
		$timeout(function() {
			if (ngModel) {
				$parse(attr.ngModel).assign(scope, files);
				ngModel && ngModel.$setViewValue(files != null && files.length == 0 ? '' : files);
				if (attr.ngModelRejected) {
					$parse(attr.ngModelRejected).assign(scope, rejFiles);
				}
			}
			if (attr.ngFileChange && attr.ngFileChange != "") {
				$parse(attr.ngFileChange)(scope, {
					$files: files,
					$rejectedFiles: rejFiles,
					$event: evt
				});
			}
		});
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
