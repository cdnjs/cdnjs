/**!
 * AngularJS dropzone directive
 * @author Uday Hiwarale <uhiwarale@gmail.com>
 * https://www.github.com/thatisuday/ngDropzone
 */
 
 
(function(){
    'use strict';

	angular.module('thatisuday.dropzone', []).provider('dropzoneOps', function(){
		/*
		 *	Add default options here
		**/
		var defOps = {
			
		};
		
		return {
			setOptions : function(newOps){
				angular.extend(defOps, newOps);
			},
			$get : function(){
				return defOps;
			}
		}
	}).directive('ngDropzone', ['$timeout', 'dropzoneOps', function($timeout, dropzoneOps){
		return {
			restrict : 'AE',
			template : '<div></div>',
			replace : true,
			scope : {
				options : '=?', //http://www.dropzonejs.com/#configuration-options
				callbacks : '=?', //http://www.dropzonejs.com/#events
				controls : '=?' //http://www.dropzonejs.com/#enqueuing-file-uploads
			},
			link : function(scope, iElem, iAttr){
				//Set options for dropzone {override from dropzone options provider}
				scope.options = scope.options || {};
				var initOps = angular.extend({}, dropzoneOps, scope.options);
				
				
				//Instantiate dropzone with initOps
				var dropzone = new Dropzone(iElem[0], initOps);
				
				
				//Control dropzone
				scope.controls = scope.controls || {};
				scope.controls.processQueue = function(){
					dropzone.processQueue();
				}
				
				
				//Set invents (callbacks)
				if(scope.callbacks){
					var callbackMethods = [
						'drop', 'dragstart', 'dragend',
						'dragenter', 'dragover', 'dragleave', 'addedfile', 'removedfile',
						'thumbnail', 'error', 'processing', 'uploadprogress',
						'sending', 'success', 'complete', 'canceled', 'maxfilesreached',
						'maxfilesexceeded', 'processingmultiple', 'sendingmultiple', 'successmultiple',
						'completemultiple', 'canceledmultiple', 'totaluploadprogress', 'reset', 'queuecomplete'
					];
					angular.forEach(callbackMethods, function(method){
						var callback = (scope.callbacks[method] || angular.noop);
						dropzone.on(method, function(){
							callback.apply(null, arguments);
							if(!scope.$$phase && !scope.$root.$$phase){
								scope.$apply();
							}
						});
					});
				}
			}
		}
	}]);
})();
