/**!
 * AngularJS file upload/drop directive with http post and progress
 * @author  Danial  <danial.farid@gmail.com>
 * @version 1.4.0
 */
(function() {
	
var angularFileUpload = angular.module('angularFileUpload', []);

angularFileUpload.service('$upload', ['$http', '$timeout', function($http, $timeout) {
	function sendHttp(config) {
		config.method = config.method || 'POST';
		config.headers = config.headers || {};
		config.transformRequest = config.transformRequest || function(data, headersGetter) {
			if (window.ArrayBuffer && data instanceof window.ArrayBuffer) {
				return data;
			}
			return $http.defaults.transformRequest[0](data, headersGetter);
		};

		if (window.XMLHttpRequest.__isShim) {
			config.headers['__setXHR_'] = function() {
				return function(xhr) {
					if (!xhr) return;
					config.__XHR = xhr;
					config.xhrFn && config.xhrFn(xhr);
					xhr.upload.addEventListener('progress', function(e) {
						if (config.progress) {
							$timeout(function() {
								if(config.progress) config.progress(e);
							});
						}
					}, false);
					//fix for firefox not firing upload progress end, also IE8-9
					xhr.upload.addEventListener('load', function(e) {
						if (e.lengthComputable) {
							if(config.progress) config.progress(e);
						}
					}, false);
				};
			};
		}

		var promise = $http(config);

		promise.progress = function(fn) {
			config.progress = fn;
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
			config.xhrFn = fn;
			return promise;
		};
		promise.then = (function(promise, origThen) {
			return function(s, e, p) {
				config.progress = p || config.progress;
				var result = origThen.apply(promise, [s, e, p]);
				result.abort = promise.abort;
				result.progress = promise.progress;
				result.xhr = promise.xhr;
				result.then = promise.then;
				return result;
			};
		})(promise, promise.then);
		
		return promise;
	}

	this.upload = function(config) {
		config.headers = config.headers || {};
		config.headers['Content-Type'] = undefined;
		config.transformRequest = config.transformRequest || $http.defaults.transformRequest;
		var formData = new FormData();
		var origTransformRequest = config.transformRequest;
		var origData = config.data;
		config.transformRequest = function(formData, headerGetter) {
			if (origData) {
				if (config.formDataAppender) {
					for (var key in origData) {
						var val = origData[key];
						config.formDataAppender(formData, key, val);
					}
				} else {
					for (var key in origData) {
						var val = origData[key];
						if (typeof origTransformRequest == 'function') {
							val = origTransformRequest(val, headerGetter);
						} else {
							for (var i = 0; i < origTransformRequest.length; i++) {
								var transformFn = origTransformRequest[i];
								if (typeof transformFn == 'function') {
									val = transformFn(val, headerGetter);
								}
							}
						}
						formData.append(key, val);
					}
				}
			}

			if (config.file != null) {
				var fileFormName = config.fileFormDataName || 'file';

				if (Object.prototype.toString.call(config.file) === '[object Array]') {
					var isFileFormNameString = Object.prototype.toString.call(fileFormName) === '[object String]'; 
					for (var i = 0; i < config.file.length; i++) {
						formData.append(isFileFormNameString ? fileFormName + i : fileFormName[i], config.file[i], config.file[i].name);
					}
				} else {
					formData.append(fileFormName, config.file, config.file.name);
				}
			}
			return formData;
		};

		config.data = formData;

		return sendHttp(config);
	};

	this.http = function(config) {
		return sendHttp(config);
	}
}]);

angularFileUpload.directive('ngFileSelect', [ '$parse', '$timeout', function($parse, $timeout) {
	return function(scope, elem, attr) {
		var fn = $parse(attr['ngFileSelect']);
		elem.bind('change', function(evt) {
			var files = [], fileList, i;
			fileList = evt.target.files;
			if (fileList != null) {
				for (i = 0; i < fileList.length; i++) {
					files.push(fileList.item(i));
				}
			}
			$timeout(function() {
				fn(scope, {
					$files : files,
					$event : evt
				});
			});
		});
		// removed this since it was confusing if the user click on browse and then cancel #181
//		elem.bind('click', function(){
//			this.value = null;
//		});
		
		// touch screens
		if (('ontouchstart' in window) ||
				(navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
			elem.bind('touchend', function(e) {
				e.preventDefault();
				e.target.click();
			});
		}
	};
} ]);

angularFileUpload.directive('ngFileDropAvailable', [ '$parse', '$timeout', function($parse, $timeout) {
	return function(scope, elem, attr) {
		if ('draggable' in document.createElement('span')) {
			var fn = $parse(attr['ngFileDropAvailable']);
			$timeout(function() {
				fn(scope);
			});
		}
	};
} ]);

angularFileUpload.directive('ngFileDrop', [ '$parse', '$timeout', function($parse, $timeout) {
	return function(scope, elem, attr) {		
		if ('draggable' in document.createElement('span')) {
			var cancel = null;
			var fn = $parse(attr['ngFileDrop']);
			elem[0].addEventListener("dragover", function(evt) {
				$timeout.cancel(cancel);
				evt.stopPropagation();
				evt.preventDefault();
				elem.addClass(attr['ngFileDragOverClass'] || "dragover");
			}, false);
			elem[0].addEventListener("dragleave", function(evt) {
				cancel = $timeout(function() {
					elem.removeClass(attr['ngFileDragOverClass'] || "dragover");
				});
			}, false);
			
			var processing = 0;
			function traverseFileTree(files, item) {
				if (item.isDirectory) {
					var dirReader = item.createReader();
					processing++;
					dirReader.readEntries(function(entries) {
						for (var i = 0; i < entries.length; i++) {
							traverseFileTree(files, entries[i]);
						}
						processing--;
					});
				} else {
					processing++;
		    	    item.file(function(file) {
		    	    	processing--;
		    	    	files.push(file);
		    	    });
	    	  }
			}
			
			elem[0].addEventListener("drop", function(evt) {
				evt.stopPropagation();
				evt.preventDefault();
				elem.removeClass(attr['ngFileDragOverClass'] || "dragover");
				var files = [], items = evt.dataTransfer.items;
				if (items && items.length > 0 && items[0].webkitGetAsEntry) {
					for (var i = 0; i < items.length; i++) {
						traverseFileTree(files, items[i].webkitGetAsEntry());
					}
				} else {
					var fileList = evt.dataTransfer.files;
					if (fileList != null) {
						for (var i = 0; i < fileList.length; i++) {
							files.push(fileList.item(i));
						}
					}
				}
				(function callback(delay) {
					$timeout(function() {
						if (!processing) {
							fn(scope, {
								$files : files,
								$event : evt
							});
						} else {
							callback(10);
						}
					}, delay || 0)
				})();
			}, false);
		}
	};
} ]);

})();
