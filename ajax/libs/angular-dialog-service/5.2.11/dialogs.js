/**
 * angular-dialog-service - A service to handle common dialog types in a web application.  Built on top of Angular-Bootstrap's modal
 * @version v5.2.11
 * @author Michael Conroy, michael.e.conroy@gmail.com
 * @license MIT, http://www.opensource.org/licenses/MIT
 */
(function(){
"use strict";
//== Translate Substitute Module =============================================//

/**
 * For those not using Angular-Translate (pascalprecht.translate), this will sub
 * in for it so we don't have to include Angular-Translate if we don't want to.
 */

var translateSubMod = angular.module('translate.sub',[]);

	/**
	 * $translate Service
	 * Sets up a $translateProvider service to use in your module's config
	 * function.  $translate.Provider syntax is the same as Angular-Translate,
	 * use $translate.Provider.translations(lang,obj) to change the defaults
	 * for modal button, header and message text.
	 */
	translateSubMod.provider('$translate',[function(){
		var _translations = []; // object of key/value translation pairs
		var _current = 'en-US'; // default language

		/**
		 * Translations
		 * Set the internal object of translation key/value pairs.
		 */
		this.translations = function(lang,obj){
			if(angular.isDefined(lang) && angular.isDefined(obj)){
				_translations[lang] = angular.copy(obj);
				_current = lang;
			}
		}; // end translations

		this.$get = [function(){
			return {
				/**
				 * Instant
				 * Retrieve the translation for the given key, if key not found
				 * return an empty string.
				 * Example: $translate.instant('DIALOGS_OK');
				 */
				instant : function(what){
					if(angular.isDefined(what) && angular.isDefined(_translations[_current][what]))
						return _translations[_current][what];
					else
						return '';
				} // end instant
			}; // end return 
		}]; // end $get

	}]); // end $translate

	/**
	 * Translate Filter
	 * For use in an Angular template.  
	 * Example: {{"DIALOGS_CLOSE" | translate}}
	 */
	translateSubMod.filter('translate',['$translate',function($translate){
		return function(what){
			return $translate.instant(what);
		};
	}]); // end translate / translate.sub
//== Controllers =============================================================//

var ctrlrs; // will be dialogs.controllers module

// determine if Angular-Translate is available, if not use the substitute
try{
	angular.module('pascalprecht.translate'); // throws error if module not loaded
	// console.log('Dialogs (Angular-Translate): OK');
	
	// dialogs.controllers: module declaration
	ctrlrs = angular.module('dialogs.controllers',['ui.bootstrap.modal','pascalprecht.translate']);
}catch(err){
	// console.log('Dialogs: (Angular-Translate): ' + err.message);
	// console.log('Dialogs: Attempting to use translate.sub module.');

	// dialogs.controllers: module declaration
	ctrlrs = angular.module('dialogs.controllers',['ui.bootstrap.modal','translate.sub']);
} // end try/catch

// angular.module('dialogs.controllers',['ui.bootstrap.modal','pascalprecht.translate'])

/**
 * Error Dialog Controller 
 */
ctrlrs.controller('errorDialogCtrl',['$scope','$uibModalInstance','$translate','data',function($scope,$uibModalInstance,$translate,data){
	//-- Variables -----//

	$scope.header = (angular.isDefined(data.header)) ? data.header : $translate.instant('DIALOGS_ERROR');
	$scope.msg = (angular.isDefined(data.msg)) ? data.msg : $translate.instant('DIALOGS_ERROR_MSG');
	$scope.icon = (angular.isDefined(data.fa) && angular.equals(data.fa,true)) ? 'fa fa-warning' : 'glyphicon glyphicon-warning-sign';

	//-- Methods -----//
	
	$scope.close = function(){
		$uibModalInstance.close();
		$scope.$destroy();
	}; // end close
}]); // end ErrorDialogCtrl
	
/**
 * Wait Dialog Controller 
 */
ctrlrs.controller('waitDialogCtrl',['$scope','$uibModalInstance','$translate','$timeout','data',function($scope,$uibModalInstance,$translate,$timeout,data){
	//-- Variables -----//

	$scope.header = (angular.isDefined(data.header)) ? data.header : $translate.instant('DIALOGS_PLEASE_WAIT_ELIPS');
	$scope.msg = (angular.isDefined(data.msg)) ? data.msg : $translate.instant('DIALOGS_PLEASE_WAIT_MSG');
	$scope.progress = (angular.isDefined(data.progress)) ? data.progress : 100;
	$scope.icon = (angular.isDefined(data.fa) && angular.equals(data.fa,true)) ? 'fa fa-clock-o' : 'glyphicon glyphicon-time';

	//-- Listeners -----//
	
	// Note: used $timeout instead of $scope.$apply() because I was getting a $$nextSibling error
	
	// close wait dialog
	$scope.$on('dialogs.wait.complete',function(){
		$timeout(function(){ $uibModalInstance.close(); $scope.$destroy(); });
	}); // end on(dialogs.wait.complete)
	
	// update the dialog's message
	$scope.$on('dialogs.wait.message',function(evt,args){
		$scope.msg = (angular.isDefined(args.msg)) ? args.msg : $scope.msg;
	}); // end on(dialogs.wait.message)
	
	// update the dialog's progress (bar) and/or message
	$scope.$on('dialogs.wait.progress',function(evt,args){
		$scope.msg = (angular.isDefined(args.msg)) ? args.msg : $scope.msg;
		$scope.progress = (angular.isDefined(args.progress)) ? args.progress : $scope.progress;
	}); // end on(dialogs.wait.progress)
	
	//-- Methods -----//

	$scope.getProgress = function(){
		return {'width': $scope.progress + '%'};
	}; // end getProgress
	
}]); // end WaitDialogCtrl

/**
 * Notify Dialog Controller 
 */
ctrlrs.controller('notifyDialogCtrl',['$scope','$uibModalInstance','$translate','data',function($scope,$uibModalInstance,$translate,data){
	//-- Variables -----//

	$scope.header = (angular.isDefined(data.header)) ? data.header : $translate.instant('DIALOGS_NOTIFICATION');
	$scope.msg = (angular.isDefined(data.msg)) ? data.msg : $translate.instant('DIALOGS_NOTIFICATION_MSG');
	$scope.icon = (angular.isDefined(data.fa) && angular.equals(data.fa,true)) ? 'fa fa-info' : 'glyphicon glyphicon-info-sign';

	//-- Methods -----//
	
	$scope.close = function(){
		$uibModalInstance.close();
		$scope.$destroy();
	}; // end close
}]); // end WaitDialogCtrl

/**
 * Confirm Dialog Controller 
 */
ctrlrs.controller('confirmDialogCtrl',['$scope','$uibModalInstance','$translate','data',function($scope,$uibModalInstance,$translate,data){
	//-- Variables -----//

	$scope.header = (angular.isDefined(data.header)) ? data.header : $translate.instant('DIALOGS_CONFIRMATION');
	$scope.msg = (angular.isDefined(data.msg)) ? data.msg : $translate.instant('DIALOGS_CONFIRMATION_MSG');
	$scope.icon = (angular.isDefined(data.fa) && angular.equals(data.fa,true)) ? 'fa fa-check' : 'glyphicon glyphicon-check';

	//-- Methods -----//
	
	$scope.no = function(){
		$uibModalInstance.dismiss('no');
	}; // end close
	
	$scope.yes = function(){
		$uibModalInstance.close('yes');
	}; // end yes
}]); // end ConfirmDialogCtrl / dialogs.controllers
//== Services ================================================================//

angular.module('dialogs.services',['ui.bootstrap.modal','dialogs.controllers'])

	.provider('dialogs',[function(){
		var _b = true; // backdrop
		var _k = true; // keyboard
		var _w = 'dialogs-default'; // windowClass
		var _bdc = 'dialogs-backdrop-default'; // backdropClass
		var _copy = true; // controls use of angular.copy
		var _wTmpl = null; // window template
		var _wSize = 'lg'; // large modal window default
		var _animation = false; // true/false to use animation

		var _fa = false; // fontawesome flag

		var _setOpts = function(opts){
			var _opts = {};
			opts = opts || {};
			_opts.kb = (angular.isDefined(opts.keyboard)) ? !!opts.keyboard : _k; // values: true,false
			_opts.bd = (angular.isDefined(opts.backdrop)) ? opts.backdrop : _b; // values: 'static',true,false
			_opts.bdc = (angular.isDefined(opts.backdropClass)) ? opts.backdropClass : _bdc; // additional CSS class(es) to be added to the modal backdrop
			_opts.ws = (angular.isDefined(opts.size) && ((opts.size === 'sm') || (opts.size === 'lg') || (opts.size === 'md'))) ? opts.size : _wSize; // values: 'sm', 'lg', 'md'
			_opts.wc = (angular.isDefined(opts.windowClass)) ? opts.windowClass : _w; // additional CSS class(es) to be added to a modal window
			_opts.anim = (angular.isDefined(opts.animation)) ? !!opts.animation : _animation; // values: true,false
			return _opts;
		}; // end _setOpts

		/**
		 * Use Backdrop
		 *
		 * Sets the use of the modal backdrop.  Either to have one or not and
		 * whether or not it responds to mouse clicks ('static' sets the
		 * backdrop to true and does not respond to mouse clicks).
		 *
		 * @param	val 	mixed	(true, false, 'static')
		 */
		this.useBackdrop = function(val){ // possible values : true, false, 'static'
			if(angular.isDefined(val))
				_b = val;
		}; // end useStaticBackdrop

		/**
		 * Use ESC Close
		 *
		 * Sets the use of the ESC (escape) key to close modal windows.
		 *
		 * @param	val 	boolean
		 */
		this.useEscClose = function(val){ // possible values : true, false
			if(angular.isDefined(val))
				_k = (!angular.equals(val,0) && !angular.equals(val,'false') && !angular.equals(val,'no') && !angular.equals(val,null) && !angular.equals(val,false)) ? true : false;
		}; // end useESCClose

		/**
		 * Use Class
		 *
		 * Sets the additional CSS window class of the modal window template.
		 *
		 * @param	val 	string
		 */
		this.useClass = function(val){
			if(angular.isDefined(val))
				_w = val;
		}; // end useClass

		/**
		 * Use Copy
		 *
		 * Determines the use of angular.copy when sending data to the modal controller.
		 *
		 * @param	val 	boolean
		 */
		this.useCopy = function(val){
			if(angular.isDefined(val))
				_copy = (!angular.equals(val,0) && !angular.equals(val,'false') && !angular.equals(val,'no') && !angular.equals(val,null) && !angular.equals(val,false)) ? true : false;
		}; // end useCopy

		/**
		 * Set Window Template
		 *
		 * Sets a path to a template to use overriding modal's window template.
		 *
		 * @param	val 	string
		 */
		this.setWindowTmpl = function(val){
			if(angular.isDefined(val))
				_wTmpl = val;
		}; // end setWindowTmpl

		/**
		 * Set Size
		 *
		 * Sets the modal size to use (sm,lg,md)
		 *
		 * @param	val 	string (sm,lg,md)
		 */
		this.setSize = function(val){
			if(angular.isDefined(val))
				_wSize = (angular.equals(val,'sm') || angular.equals(val,'lg') || angular.equals(val,'md')) ? val : _wSize;
		}; // end setSize

		/**
		 * Use Animations
		 *
		 * Sets the use of animations to true
		 */
		 this.useAnimation = function(){
		 	_animation = true;
		 }; // end useAnimation

		/**
		 * Use Font-Awesome.
		 *
		 * Sets Font-Awesome flag to true and substitutes font-awesome icons for
		 * Bootstrap's glyphicons.
		 */
		this.useFontAwesome = function(){
			_fa = true;
		}; // end useFontAwesome


		this.$get = ['$uibModal',function ($uibModal){

			return {
				/**
				 * Error Dialog
				 *
				 * @param	header 	string
				 * @param	msg 	string
				 * @param	opts	object
				 */
				error : function(header,msg,opts){
					opts = _setOpts(opts);

					return $uibModal.open({
						templateUrl : '/dialogs/error.html',
						controller : 'errorDialogCtrl',
						backdrop: opts.bd,
						backdropClass: opts.bdc,
						keyboard: opts.kb,
						windowClass: opts.wc,
						size: opts.ws,
						animation: opts.anim,
						resolve : {
							data : function(){
								return {
									header : angular.copy(header),
									msg : angular.copy(msg),
									fa : _fa
								};
							}
						}
					}); // end modal.open
				}, // end error

				/**
				 * Wait Dialog
				 *
				 * @param	header 		string
				 * @param	msg 		string
				 * @param	progress 	int
				 * @param	opts	object
				 */
				wait : function(header,msg,progress,opts){
					opts = _setOpts(opts);

					return $uibModal.open({
						templateUrl : '/dialogs/wait.html',
						controller : 'waitDialogCtrl',
						backdrop: opts.bd,
						backdropClass: opts.bdc,
						keyboard: opts.kb,
						windowClass: opts.wc,
						size: opts.ws,
						animation: opts.anim,
						resolve : {
							data : function(){
								return {
									header : angular.copy(header),
									msg : angular.copy(msg),
									progress : angular.copy(progress),
									fa : _fa
								};
							}
						}
					}); // end modal.open
				}, // end wait

				/**
				 * Notify Dialog
				 *
				 * @param	header 		string
				 * @param	msg 		string
				 * @param	opts	object
				 */
				notify : function(header,msg,opts){
					opts = _setOpts(opts);

					return $uibModal.open({
						templateUrl : '/dialogs/notify.html',
						controller : 'notifyDialogCtrl',
						backdrop: opts.bd,
						backdropClass: opts.bdc,
						keyboard: opts.kb,
						windowClass: opts.wc,
						size: opts.ws,
						animation: opts.anim,
						resolve : {
							data : function(){
								return {
									header : angular.copy(header),
									msg : angular.copy(msg),
									fa : _fa
								};
							}
						}
					}); // end modal.open
				}, // end notify

				/**
				 * Confirm Dialog
				 *
				 * @param	header 	string
				 * @param	msg 	string
				 * @param	opts	object
				 */
				confirm : function(header,msg,opts){
					opts = _setOpts(opts);

					return $uibModal.open({
						templateUrl : '/dialogs/confirm.html',
						controller : 'confirmDialogCtrl',
						backdrop: opts.bd,
						backdropClass: opts.bdc,
						keyboard: opts.kb,
						windowClass: opts.wc,
						size: opts.ws,
						animation: opts.anim,
						resolve : {
							data : function(){
								return {
									header : angular.copy(header),
									msg : angular.copy(msg),
									fa : _fa
								};
							}
						}
					}); // end modal.open
				}, // end confirm

				/**
				 * Create Custom Dialog
				 *
				 * @param	url 	string
				 * @param	ctrlr 	string
				 * @param	data 	object
				 * @param	opts	object
				 */
				create : function(url,ctrlr,data,opts,ctrlAs){
					var copy = (opts && angular.isDefined(opts.copy)) ? opts.copy : _copy;
					opts = _setOpts(opts);

					return $uibModal.open({
						templateUrl : url,
						controller : ctrlr,
						controllerAs : ctrlAs,
						keyboard : opts.kb,
						backdrop : opts.bd,
						backdropClass: opts.bdc,
						windowClass: opts.wc,
						size: opts.ws,
						animation: opts.anim,
						resolve : {
							data : function() {
								if(copy)
									return angular.copy(data);
								else
									return data;
							}
						}
					}); // end modal.open
				} // end create

			}; // end return

		}]; // end $get
	}]); // end provider dialogs
//== Dialogs.Main Module =====================================================//

/**
 * Include this module 'dialogs.main' in your module's dependency list where you
 * intend to use it.  Then inject the 'dialogs' service in your controllers that
 * need it.
 */

angular.module('dialogs.main',['dialogs.services','ngSanitize']) // requires angular-sanitize.min.js (ngSanitize) //code.angularjs.org/1.2.1/angular-sanitize.min.js
		
	.config(['$translateProvider','dialogsProvider',function($translateProvider,dialogsProvider){
		/** 
		 * if Angular-Translate is not loaded, use the translate substitute
		 * module and create default translations to use as default modal texts
		 */
		try{
			angular.module('pascalprecht.translate');
		}catch(err){
			// console.log('Dialogs: Creating default translations for use without Angular-Translate.');

			// This will set default modal buttons, header and message text
			$translateProvider.translations('en-US',{
	            DIALOGS_ERROR: "Error",
	            DIALOGS_ERROR_MSG: "An unknown error has occurred.",
	            DIALOGS_CLOSE: "Close",
	            DIALOGS_PLEASE_WAIT: "Please Wait",
	            DIALOGS_PLEASE_WAIT_ELIPS: "Please Wait...",
	            DIALOGS_PLEASE_WAIT_MSG: "Waiting on operation to complete.",
	            DIALOGS_PERCENT_COMPLETE: "% Complete",
	            DIALOGS_NOTIFICATION: "Notification",
	            DIALOGS_NOTIFICATION_MSG: "Unknown application notification.",
	            DIALOGS_CONFIRMATION: "Confirmation",
	            DIALOGS_CONFIRMATION_MSG: "Confirmation required.",
	            DIALOGS_OK: "OK",
	            DIALOGS_YES: "Yes",
	            DIALOGS_NO: "No"
        	});
		} // end try/catch

		/**
		 * Attempt to ascertain if page is using Font Awesome instead of the
		 * regular Bootstrap Icons.  If you are changing the stylesheet name or
		 * not including it from a CDN or have included Font-Awesome as a 
		 * concatentation of CSS sheets together, then you will have to manually
		 * set Font-Awesome usage in your Angular Module's config by including
		 * the $dialogsProvider and calling the method $dialogsProvider.useFontAwesome().
		 */
		 try{
		 	var _sheets = document.styleSheets;

		 	sheetLoop:
		 	for(var i = (_sheets.length - 1);i >= 0;i--){
		 		var _matches = null;
		 		var _rules = null;

		 		if(!_sheets[i].disabled){
			 		// check href of style sheet first
			 		if(_sheets[i].href !== null)
			 			_matches = _sheets[i].href.match(/font\-*awesome/i);

			 		if(angular.isArray(_matches)){
			 			dialogsProvider.useFontAwesome();
			 			break; // done, leave the style sheet for loop
			 		}else{
			 			// try to find css rule .fa, in case style sheet has been concatenated
			 			_rules = _sheets[i].cssRules;
			 			for(var x = (_rules.length - 1);x >= 0;x--){
			 				if(_rules[x].selectorText.toLowerCase() == '.fa'){
			 					dialogsProvider.useFontAwesome();
			 					break sheetLoop; // done, exit both for loops
			 				}
			 			}
			 		}
			 	} // end if(disabled)
		 	} // end for
		 }catch(err){
		 	// console.log('Error Message: ' + err);
		 }
	}]) // end config

	// Add default templates via $templateCache
	.run(['$templateCache','$interpolate',function($templateCache,$interpolate){
    
    	// get interpolation symbol (possible that someone may have changed it in their application instead of using '{{}}')
    	var startSym = $interpolate.startSymbol();
    	var endSym = $interpolate.endSymbol();
    
    	$templateCache.put('/dialogs/error.html','<div class="modal-header dialog-header-error"><button type="button" class="close" ng-click="close()">&times;</button><h4 class="modal-title text-danger"><span class="'+startSym+'icon'+endSym+'"></span> <span ng-bind-html="header"></span></h4></div><div class="modal-body text-danger" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="close()">'+startSym+'"DIALOGS_CLOSE" | translate'+endSym+'</button></div>');
    	$templateCache.put('/dialogs/wait.html','<div class="modal-header dialog-header-wait"><h4 class="modal-title"><span class="'+startSym+'icon'+endSym+'"></span> '+startSym+'header'+endSym+'</h4></div><div class="modal-body"><p ng-bind-html="msg"></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" ng-style="getProgress()"></div><span class="sr-only">'+startSym+'progress'+endSym+''+startSym+'"DIALOGS_PERCENT_COMPLETE" | translate'+endSym+'</span></div></div>');
    	$templateCache.put('/dialogs/notify.html','<div class="modal-header dialog-header-notify"><button type="button" class="close" ng-click="close()" class="pull-right">&times;</button><h4 class="modal-title text-info"><span class="'+startSym+'icon'+endSym+'"></span> '+startSym+'header'+endSym+'</h4></div><div class="modal-body text-info" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="close()">'+startSym+'"DIALOGS_OK" | translate'+endSym+'</button></div>');
    	$templateCache.put('/dialogs/confirm.html','<div class="modal-header dialog-header-confirm"><button type="button" class="close" ng-click="no()">&times;</button><h4 class="modal-title"><span class="'+startSym+'icon'+endSym+'"></span> '+startSym+'header'+endSym+'</h4></div><div class="modal-body" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="yes()">'+startSym+'"DIALOGS_YES" | translate'+endSym+'</button><button type="button" class="btn btn-primary" ng-click="no()">'+startSym+'"DIALOGS_NO" | translate'+endSym+'</button></div>');
	}]); // end run / dialogs.main

})();