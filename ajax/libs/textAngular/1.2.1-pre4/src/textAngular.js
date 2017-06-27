/*
textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.2.1-pre4

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/

(function(){ // encapsulate all variables so they don't become global vars
	"Use Strict";
	
	// fix a webkit bug, see: https://gist.github.com/shimondoodkin/1081133
	// this is set true when a blur occurs as the blur of the ta-bind triggers before the click
	var globalContentEditableBlur = false;
	/* istanbul ignore next: Browser Un-Focus fix for webkit */
	if(/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)) { // detect webkit
		document.addEventListener("click", function(){
			var curelement = window.event.target;
			if(globalContentEditableBlur && curelement !== null){
				var isEditable = false;
				var tempEl = curelement;
				while(tempEl !== null && tempEl.tagName.toLowerCase() !== 'html' && !isEditable){
					isEditable = tempEl.contentEditable === 'true';
					tempEl = tempEl.parentNode;
				}
				if(!isEditable){
					document.getElementById('textAngular-editableFix-010203040506070809').setSelectionRange(0, 0); // set caret focus to an element that handles caret focus correctly.
					curelement.focus(); // focus the wanted element.
				}
			}
			globalContentEditableBlur = false;
		}, false); // add global click handler
		document.body.innerHTML += '<input id="textAngular-editableFix-010203040506070809" style="width:1px;height:1px;border:none;margin:0;padding:0;position:absolute; top: -10000; left: -10000;" unselectable="on" tabIndex="-1">';
	}
	
	// IE version detection - http://stackoverflow.com/questions/4169160/javascript-ie-detection-why-not-use-simple-conditional-comments
	// We need this as IE sometimes plays funny tricks with the contenteditable.
	// ----------------------------------------------------------
	// If you're not in IE (or IE version is less than 5) then:
	// ie === undefined
	// If you're in IE (>=5) then you can determine which version:
	// ie === 7; // IE7
	// Thus, to detect IE:
	// if (ie) {}
	// And to detect the version:
	// ie === 6 // IE6
	// ie > 7 // IE8, IE9, IE10 ...
	// ie < 9 // Anything less than IE9
	// ----------------------------------------------------------
	/* istanbul ignore next: untestable browser check */
	var ie = (function(){
		var undef,rv = -1; // Return value assumes failure.
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		var trident = ua.indexOf('Trident/');
		
		if (msie > 0) {
			// IE 10 or older => return version number
			rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		} else if (trident > 0) {
			// IE 11 (or newer) => return version number
			var rvNum = ua.indexOf('rv:');
			rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
		}
		
		return ((rv > -1) ? rv : undef);
	}());
	
	// Thanks to answer in http://stackoverflow.com/questions/2308134/trim-in-javascript-not-working-in-ie
	/* istanbul ignore next: trim shim for older browsers */
	if(typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function() {
			return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); 
		};
	}
	
	// tests against the current jqLite/jquery implementation if this can be an element
	function validElementString(string){
		try{
			return angular.element(string).length !== 0;
		}catch(any){
			return false;
		}
	}
	
	/*
		Custom stylesheet for the placeholders rules.
		Credit to: http://davidwalsh.name/add-rules-stylesheets
	*/
	var sheet, addCSSRule, removeCSSRule;
	/* istanbul ignore else: IE <8 test*/
	if(ie > 8 || ie === undefined){
		sheet = (function() {
			// Create the <style> tag
			var style = document.createElement("style");
			
			// Add a media (and/or media query) here if you'd like!
			// style.setAttribute("media", "screen")
			// style.setAttribute("media", "@media only screen and (max-width : 1024px)")
			
			/* istanbul ignore else : WebKit hack :( */
			if(/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)) style.appendChild(document.createTextNode(""));
			
			// Add the <style> element to the page
			document.head.appendChild(style);
			
			return style.sheet;
		})();
		
		// use as: addCSSRule(document.styleSheets[0], "header", "float: left");
		addCSSRule = function(selector, rules) {
			var insertIndex;
			/* istanbul ignore else: firefox catch */
			if(sheet.rules) insertIndex = Math.max(sheet.rules.length - 1, 0);
			else if(sheet.cssRules) insertIndex = Math.max(sheet.cssRules.length - 1, 0);
			/* istanbul ignore else: untestable IE option */
			if(sheet.insertRule) {
				sheet.insertRule(selector + "{" + rules + "}", insertIndex);
			}
			else {
				sheet.addRule(selector, rules, insertIndex);
			}
			// return the index of the stylesheet rule
			return insertIndex;
		};
		
		removeCSSRule = function(index){
			/* istanbul ignore else: untestable IE option */
			if(sheet.removeRule){
				sheet.removeRule(index);
			}else{
				sheet.deleteRule(index);
			}
		};
	}
	
	// recursive function that returns an array of angular.elements that have the passed attribute set on them
	function getByAttribute(element, attribute){
		var resultingElements = [];
		var childNodes = element.children();
		if(childNodes.length){
			angular.forEach(childNodes, function(child){
				resultingElements = resultingElements.concat(getByAttribute(angular.element(child), attribute));
			});
		}
		if(element.attr(attribute) !== undefined) resultingElements.push(element);
		return resultingElements;
	}
	
	// this global var is used to prevent multiple fires of the drop event. Needs to be global to the textAngular file.
	var dropFired = false;
	var textAngular = angular.module("textAngular", ['ngSanitize']); //This makes ngSanitize required
	
	/* istanbul ignore next: untestable in Karma due to loading patterns */
	if(textAngularSetup === undefined){
		throw('textAngular Error: Setup Options are not defined, see textAngularSetup.js for example.');
	}
	
	// Here we set up the global display defaults, to set your own use a angular $provider#decorator.
	textAngular.value('taOptions', textAngularSetup.options);
	
	// This is the element selector string that is used to catch click events within a taBind, prevents the default and $emits a 'ta-element-select' event
	// these are individually used in an angular.element().find() call. What can go here depends on whether you have full jQuery loaded or just jQLite with angularjs.
	// div is only used as div.ta-insert-video caught in filter.
	textAngular.value('taSelectableElements', textAngularSetup.selectableElements);
	
	// This is an array of objects with the following options:
	//				selector: <string> a jqLite or jQuery selector string
	//				customAttribute: <string> an attribute to search for
	//				renderLogic: <function(element)>
	// Both or one of selector and customAttribute must be defined.
	textAngular.value('taCustomRenderers', textAngularSetup.customDisplayRenderers);
	
	// setup the global contstant functions for setting up the toolbar

	// all tool definitions
	var taTools = {};
	/*
		A tool definition is an object with the following key/value parameters:
			action: [function(deferred, restoreSelection)]
					a function that is executed on clicking on the button - this will allways be executed using ng-click and will
					overwrite any ng-click value in the display attribute.
					The function is passed a deferred object ($q.defer()), if this is wanted to be used `return false;` from the action and
					manually call `deferred.resolve();` elsewhere to notify the editor that the action has finished.
					restoreSelection is only defined if the rangy library is included and it can be called as `restoreSelection()` to restore the users
					selection in the WYSIWYG editor.
			display: [string]?
					Optional, an HTML element to be displayed as the buton. The `scope` of the button is the tool definition object with some additional functions
					If set this will cause buttontext and iconclass to be ignored
			buttontext: [string]?
					if this is defined it will replace the contents of the element contained in the `display` element
			iconclass: [string]?
					if this is defined an icon (<i>) will be appended to the `display` element with this string as it's class
			activestate: [function(commonElement)]?
					this function is called on every caret movement, if it returns true then the class taOptions.classes.toolbarButtonActive
					will be applied to the `display` element, else the class will be removed
			disabled: [function()]?
					if this function returns true then the tool will have the class taOptions.classes.disabled applied to it, else it will be removed
		Other functions available on the scope are:
			name: [string]
					the name of the tool, this is the first parameter passed into taRegisterTool
			isDisabled: [function()]
					returns true if the tool is disabled, false if it isn't
			displayActiveToolClass: [function(boolean)]
					returns true if the tool is 'active' in the currently focussed toolbar
			onElementSelect: [Object]
					This object contains the following key/value pairs and is used to trigger the ta-element-select event
					element: [String]
						an element name, will only trigger the onElementSelect action if the tagName of the element matches this string
					filter: [function(element)]?
						an optional filter that returns a boolean, if true it will trigger the onElementSelect.
					action: [function(event, element, editorScope)]
						the action that should be executed if the onElementSelect function runs
	*/
	// name and toolDefinition to add into the tools available to be added on the toolbar
	function registerTextAngularTool(name, toolDefinition){
		if(!name || name === '' || taTools.hasOwnProperty(name)) throw('textAngular Error: A unique name is required for a Tool Definition');
		if(
			(toolDefinition.display && (toolDefinition.display === '' || !validElementString(toolDefinition.display))) ||
			(!toolDefinition.display && !toolDefinition.buttontext && !toolDefinition.iconclass)
		)
			throw('textAngular Error: Tool Definition for "' + name + '" does not have a valid display/iconclass/buttontext value');
		taTools[name] = toolDefinition;
	}

	textAngular.constant('taTranslations', textAngularSetup.translationStrings);

	textAngular.constant('taRegisterTool', registerTextAngularTool);
	textAngular.value('taTools', taTools);

	// configure initial textAngular tools here via taRegisterTool
	textAngular.run(['taRegisterTool', '$window', 'taTranslations', 'taSelection', function(taRegisterTool, $window, taTranslations, taSelection){
		// clear taTools variable. Just catches testing and any other time that this config may run multiple times...
		angular.forEach(taTools, function(value, key){ delete taTools[key];	});
		textAngularSetup.registerToolsFunction(taRegisterTool, $window, taTranslations, taSelection);
	}]);

	textAngular.directive("textAngular", [
		'$compile', '$timeout', 'taOptions', 'taSanitize', 'taSelection', 'textAngularManager', '$window', '$document', '$animate', '$log',
		function($compile, $timeout, taOptions, taSanitize, taSelection, textAngularManager, $window, $document, $animate, $log){
			return {
				require: '?ngModel',
				scope: {},
				restrict: "EA",
				link: function(scope, element, attrs, ngModel){
					// all these vars should not be accessable outside this directive
					var _keydown, _keyup, _keypress, _mouseup, _focusin, _focusout,
						_originalContents, _toolbars,
						_serial = Math.floor(Math.random() * 10000000000000000),
						_name = (attrs.name) ? attrs.name : 'textAngularEditor' + _serial;
					// get the settings from the defaults and add our specific functions that need to be on the scope
					angular.extend(scope, angular.copy(taOptions), {
						// wraps the selection in the provided tag / execCommand function. Should only be called in WYSIWYG mode.
						wrapSelection: function(command, opt, isSelectableElementTool){
							// catch errors like FF erroring when you try to force an undo with nothing done
							try{
								$document[0].execCommand(command, false, opt);
							}catch(e){}
							if(isSelectableElementTool){
								// re-apply the selectable tool events
								scope['reApplyOnSelectorHandlerstaTextElement' + _serial]();
							}
							// refocus on the shown display element, this fixes a display bug when using :focus styles to outline the box.
							// You still have focus on the text/html input it just doesn't show up
							scope.displayElements.text[0].focus();
						},
						showHtml: false
					});
					// setup the options from the optional attributes
					if(attrs.taFocussedClass)			scope.classes.focussed = attrs.taFocussedClass;
					if(attrs.taTextEditorClass)			scope.classes.textEditor = attrs.taTextEditorClass;
					if(attrs.taHtmlEditorClass)			scope.classes.htmlEditor = attrs.taHtmlEditorClass;
					// optional setup functions
					if(attrs.taTextEditorSetup)			scope.setup.textEditorSetup = scope.$parent.$eval(attrs.taTextEditorSetup);
					if(attrs.taHtmlEditorSetup)			scope.setup.htmlEditorSetup = scope.$parent.$eval(attrs.taHtmlEditorSetup);
					// optional fileDropHandler function
					if(attrs.taFileDrop)				scope.fileDropHandler = scope.$parent.$eval(attrs.taFileDrop);
					else								scope.fileDropHandler = scope.defaultFileDropHandler;
					
					_originalContents = element[0].innerHTML;
					// clear the original content
					element[0].innerHTML = '';

					// Setup the HTML elements as variable references for use later
					scope.displayElements = {
						// we still need the hidden input even with a textarea as the textarea may have invalid/old input in it,
						// wheras the input will ALLWAYS have the correct value.
						forminput: angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),
						html: angular.element("<textarea></textarea>"),
						text: angular.element("<div></div>"),
						// other toolbased elements
						popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"><div class="arrow"></div></div>'),
						popoverContainer: angular.element('<div class="popover-content"></div>')
					};
					
					// Setup the link/image/video edit toolbar
					scope.displayElements.popover.append(scope.displayElements.popoverContainer);
					element.append(scope.displayElements.popover);
					
					scope.displayElements.popover.on('mousedown', function(e, eventData){
						/* istanbul ignore else: this is for catching the jqLite testing*/
						if(eventData) angular.extend(e, eventData);
						// this prevents focusout from firing on the editor when clicking anything in the popover
						e.preventDefault();
						return false;
					});
					
					// define the popover show and hide functions
					scope.showPopover = function(_el){
						scope.displayElements.popover.css('top', _el[0].offsetTop + _el[0].offsetHeight + 'px');
						scope.displayElements.popover.css('left', _el[0].offsetLeft + (_el[0].offsetWidth / 2.0) - 152.5 + 'px');
						scope.displayElements.popover.css('display', 'block');
						$animate.addClass(scope.displayElements.popover, 'in');
						$timeout(function(){
							// shim the .one till fixed
							var _func = function(){
								element.off('click', _func);
								scope.hidePopover();
							};
							element.on('click', _func);
						}, 100);
					};
					scope.hidePopover = function(){
						$animate.removeClass(scope.displayElements.popover, 'in', /* istanbul ignore next: dosen't test with mocked animate */ function(){
							scope.displayElements.popover.css('display', '');
							scope.displayElements.popoverContainer.attr('style', '');
							scope.displayElements.popoverContainer.attr('class', 'popover-content');
						});
					};

					// allow for insertion of custom directives on the textarea and div
					scope.setup.htmlEditorSetup(scope.displayElements.html);
					scope.setup.textEditorSetup(scope.displayElements.text);
					scope.displayElements.html.attr({
						'id': 'taHtmlElement' + _serial,
						'ng-show': 'showHtml',
						'ta-bind': 'ta-bind',
						'ng-model': 'html'
					});
					scope.displayElements.text.attr({
						'id': 'taTextElement' + _serial,
						'contentEditable': 'true',
						'ng-hide': 'showHtml',
						'ta-bind': 'ta-bind',
						'ng-model': 'html'
					});
					if(attrs.taDefaultWrap) scope.displayElements.text.attr('ta-default-wrap', attrs.taDefaultWrap);

					// add the main elements to the origional element
					element.append(scope.displayElements.text);
					element.append(scope.displayElements.html);

					scope.displayElements.forminput.attr('name', _name);
					element.append(scope.displayElements.forminput);

					if(attrs.tabindex){
						element.removeAttr('tabindex');
						scope.displayElements.text.attr('tabindex', attrs.tabindex);
						scope.displayElements.html.attr('tabindex', attrs.tabindex);
					}

					if (attrs.placeholder) {
						scope.displayElements.text.attr('placeholder', attrs.placeholder);
						scope.displayElements.html.attr('placeholder', attrs.placeholder);
					}

					if(attrs.taDisabled){
						scope.displayElements.text.attr('ta-readonly', 'disabled');
						scope.displayElements.html.attr('ta-readonly', 'disabled');
						scope.disabled = scope.$parent.$eval(attrs.taDisabled);
						scope.$parent.$watch(attrs.taDisabled, function(newVal){
							scope.disabled = newVal;
							if(scope.disabled){
								element.addClass(scope.classes.disabled);
							}else{
								element.removeClass(scope.classes.disabled);
							}
						});
					}

					// compile the scope with the text and html elements only - if we do this with the main element it causes a compile loop
					$compile(scope.displayElements.text)(scope);
					$compile(scope.displayElements.html)(scope);
					
					scope.updateTaBindtaTextElement = scope['updateTaBindtaTextElement' + _serial];
					scope.updateTaBindtaHtmlElement = scope['updateTaBindtaHtmlElement' + _serial];
					
					// add the classes manually last
					element.addClass("ta-root");
					scope.displayElements.text.addClass("ta-text ta-editor " + scope.classes.textEditor);
					scope.displayElements.html.addClass("ta-html ta-editor " + scope.classes.textEditor);

					// used in the toolbar actions
					scope._actionRunning = false;
					var _savedSelection = false;
					scope.startAction = function(){
						scope._actionRunning = true;
						// if rangy library is loaded return a function to reload the current selection
						if($window.rangy && $window.rangy.saveSelection){
							_savedSelection = $window.rangy.saveSelection();
							return function(){
								if(_savedSelection) $window.rangy.restoreSelection(_savedSelection);
							};
						}
					};
					scope.endAction = function(){
						scope._actionRunning = false;
						if(_savedSelection) $window.rangy.removeMarkers(_savedSelection);
						_savedSelection = false;
						scope.updateSelectedStyles();
						// only update if in text or WYSIWYG mode
						if(!scope.showHtml) scope['updateTaBindtaTextElement' + _serial]();
					};

					// note that focusout > focusin is called everytime we click a button - except bad support: http://www.quirksmode.org/dom/events/blurfocus.html
					// cascades to displayElements.text and displayElements.html automatically.
					_focusin = function(){
						element.addClass(scope.classes.focussed);
						_toolbars.focus();
					};
					scope.displayElements.html.on('focus', _focusin);
					scope.displayElements.text.on('focus', _focusin);
					_focusout = function(e){
						// if we are NOT runnig an action and have NOT focussed again on the text etc then fire the blur events
						if(!scope._actionRunning && $document[0].activeElement !== scope.displayElements.html[0] && $document[0].activeElement !== scope.displayElements.text[0]){
							element.removeClass(scope.classes.focussed);
							_toolbars.unfocus();
							// to prevent multiple apply error defer to next seems to work.
							$timeout(function(){ element.triggerHandler('blur'); }, 0);
						}
						e.preventDefault();
						return false;
					};
					scope.displayElements.html.on('blur', _focusout);
					scope.displayElements.text.on('blur', _focusout);

					// Setup the default toolbar tools, this way allows the user to add new tools like plugins.
					// This is on the editor for future proofing if we find a better way to do this.
					scope.queryFormatBlockState = function(command){
						return command.toLowerCase() === $document[0].queryCommandValue('formatBlock').toLowerCase();
					};
					scope.switchView = function(){
						scope.showHtml = !scope.showHtml;
						//Show the HTML view
						if(scope.showHtml){
							//defer until the element is visible
							$timeout(function(){
								// [0] dereferences the DOM object from the angular.element
								return scope.displayElements.html[0].focus();
							}, 100);
						}else{
							//Show the WYSIWYG view
							//defer until the element is visible
							$timeout(function(){
								// [0] dereferences the DOM object from the angular.element
								return scope.displayElements.text[0].focus();
							}, 100);
						}
					};

					// changes to the model variable from outside the html/text inputs
					// if no ngModel, then the only input is from inside text-angular
					if(attrs.ngModel){
						var _firstRun = true;
						ngModel.$render = function(){
							if(_firstRun){
								// we need this firstRun to set the originalContents otherwise it gets overrided by the setting of ngModel to undefined from NaN
								_firstRun = false;
								// if view value is null or undefined initially and there was original content, set to the original content
								var _initialValue = scope.$parent.$eval(attrs.ngModel);
								if((_initialValue === undefined || _initialValue === null) && (_originalContents && _originalContents !== '')){
									// on passing through to taBind it will be sanitised
									ngModel.$setViewValue(_originalContents);
								}
							}
							scope.displayElements.forminput.val(ngModel.$viewValue);
							// if the editors aren't focused they need to be updated, otherwise they are doing the updating
							/* istanbul ignore else: don't care */
							if(!scope._elementSelectTriggered && $document[0].activeElement !== scope.displayElements.html[0] && $document[0].activeElement !== scope.displayElements.text[0]){
								// catch model being null or undefined
								scope.html = ngModel.$viewValue || '';
							}
						};
					}else{
						// if no ngModel then update from the contents of the origional html.
						scope.displayElements.forminput.val(_originalContents);
						scope.html = _originalContents;
					}
					
					// changes from taBind back up to here
					scope.$watch('html', function(newValue, oldValue){
						if(newValue !== oldValue){
							if(attrs.ngModel && ngModel.$viewValue !== newValue) ngModel.$setViewValue(newValue);
							scope.displayElements.forminput.val(newValue);
						}
					});

					if(attrs.taTargetToolbars) _toolbars = textAngularManager.registerEditor(_name, scope, attrs.taTargetToolbars.split(','));
					else{
						var _toolbar = angular.element('<div text-angular-toolbar name="textAngularToolbar' + _serial + '">');
						// passthrough init of toolbar options
						if(attrs.taToolbar)						_toolbar.attr('ta-toolbar', attrs.taToolbar);
						if(attrs.taToolbarClass)				_toolbar.attr('ta-toolbar-class', attrs.taToolbarClass);
						if(attrs.taToolbarGroupClass)			_toolbar.attr('ta-toolbar-group-class', attrs.taToolbarGroupClass);
						if(attrs.taToolbarButtonClass)			_toolbar.attr('ta-toolbar-button-class', attrs.taToolbarButtonClass);
						if(attrs.taToolbarActiveButtonClass)	_toolbar.attr('ta-toolbar-active-button-class', attrs.taToolbarActiveButtonClass);
						if(attrs.taFocussedClass)				_toolbar.attr('ta-focussed-class', attrs.taFocussedClass);

						element.prepend(_toolbar);
						$compile(_toolbar)(scope.$parent);
						_toolbars = textAngularManager.registerEditor(_name, scope, ['textAngularToolbar' + _serial]);
					}

					scope.$on('$destroy', function(){
						textAngularManager.unregisterEditor(_name);
					});
					
					// catch element select event and pass to toolbar tools
					scope.$on('ta-element-select', function(event, element){
						_toolbars.triggerElementSelect(event, element);
					});
					
					scope.$on('ta-drop-event', function(event, element, dropEvent, dataTransfer){
						scope.displayElements.text[0].focus();
						if(dataTransfer && dataTransfer.files && dataTransfer.files.length > 0){
							angular.forEach(dataTransfer.files, function(file){
								// taking advantage of boolean execution, if the fileDropHandler returns true, nothing else after it is executed
								// If it is false then execute the defaultFileDropHandler if the fileDropHandler is NOT the default one
								try{
									return scope.fileDropHandler(file, scope.wrapSelection) ||
										(scope.fileDropHandler !== scope.defaultFileDropHandler &&
										scope.defaultFileDropHandler(file, scope.wrapSelection));
								}catch(error){
									$log.error(error);
								}
							});
							dropEvent.preventDefault();
							dropEvent.stopPropagation();
						}
					});
					
					// the following is for applying the active states to the tools that support it
					scope._bUpdateSelectedStyles = false;
					// loop through all the tools polling their activeState function if it exists
					scope.updateSelectedStyles = function(){
						var _selection;
						// test if the common element ISN'T the root ta-text node
						if((_selection = taSelection.getSelectionElement().parentNode) !== scope.displayElements.text[0]
						){
							_toolbars.updateSelectedStyles(angular.element(_selection));
						}else _toolbars.updateSelectedStyles();
						// used to update the active state when a key is held down, ie the left arrow
						if(scope._bUpdateSelectedStyles) $timeout(scope.updateSelectedStyles, 200);
					};
					// start updating on keydown
					_keydown = function(){
						/* istanbul ignore else: don't run if already running */
						if(!scope._bUpdateSelectedStyles){
							scope._bUpdateSelectedStyles = true;
							scope.$apply(function(){
								scope.updateSelectedStyles();
							});
						}
					};
					scope.displayElements.html.on('keydown', _keydown);
					scope.displayElements.text.on('keydown', _keydown);
					// stop updating on key up and update the display/model
					_keyup = function(){
						scope._bUpdateSelectedStyles = false;
					};
					scope.displayElements.html.on('keyup', _keyup);
					scope.displayElements.text.on('keyup', _keyup);
					// stop updating on key up and update the display/model
					_keypress = function(event, eventData){
						/* istanbul ignore else: this is for catching the jqLite testing*/
						if(eventData) angular.extend(event, eventData);
						scope.$apply(function(){
							if(_toolbars.sendKeyCommand(event)){
								/* istanbul ignore else: don't run if already running */
								if(!scope._bUpdateSelectedStyles){
									scope.updateSelectedStyles();
								}
								event.preventDefault();
								return false;
							}
						});
					};
					scope.displayElements.html.on('keypress', _keypress);
					scope.displayElements.text.on('keypress', _keypress);
					// update the toolbar active states when we click somewhere in the text/html boxed
					_mouseup = function(){
						// ensure only one execution of updateSelectedStyles()
						scope._bUpdateSelectedStyles = false;
						scope.$apply(function(){
							scope.updateSelectedStyles();
						});
					};
					scope.displayElements.html.on('mouseup', _mouseup);
					scope.displayElements.text.on('mouseup', _mouseup);
				}
			};
		}
	]).directive('taBind', ['taSanitize', '$timeout', '$window', '$document', 'taFixChrome', 'taSelection', 'taSelectableElements', 'taApplyCustomRenderers',
					function(taSanitize, $timeout, $window, $document, taFixChrome, taSelection, taSelectableElements, taApplyCustomRenderers){
		// Uses for this are textarea or input with ng-model and ta-bind='text'
		// OR any non-form element with contenteditable="contenteditable" ta-bind="html|text" ng-model
		return {
			require: 'ngModel',
			scope: {},
			link: function(scope, element, attrs, ngModel){
				// the option to use taBind on an input or textarea is required as it will sanitize all input into it correctly.
				var _isContentEditable = element.attr('contenteditable') !== undefined && element.attr('contenteditable');
				var _isInputFriendly = _isContentEditable || element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input';
				var _isReadonly = false;
				var _focussed = false;
				
				// defaults to the paragraph element, but we need the line-break or it doesn't allow you to type into the empty element
				// non IE is '<p><br/></p>', ie is '<p></p>' as for once IE gets it correct...
				var _defaultVal, _defaultTest;
				// set the default to be a paragraph value
				if(attrs.taDefaultWrap === undefined) attrs.taDefaultWrap = 'p';
				/* istanbul ignore next: ie specific test */
				if(attrs.taDefaultWrap === ''){
					_defaultVal = '';
					_defaultTest = (ie === undefined)? '<div><br></div>' : (ie >= 11)? '<p><br></p>' : (ie <= 8)? '<P>&nbsp;</P>' : '<p>&nbsp;</p>';
				}else{
					_defaultVal = (ie === undefined || ie >= 11)?
						'<' + attrs.taDefaultWrap + '><br></' + attrs.taDefaultWrap + '>' :
						(ie <= 8)?
							'<' + attrs.taDefaultWrap.toUpperCase() + '></' + attrs.taDefaultWrap.toUpperCase() + '>' :
							'<' + attrs.taDefaultWrap + '></' + attrs.taDefaultWrap + '>';
					_defaultTest = (ie === undefined || ie >= 11)?
						'<' + attrs.taDefaultWrap + '><br></' + attrs.taDefaultWrap + '>' :
						(ie <= 8)?
							'<' + attrs.taDefaultWrap.toUpperCase() + '>&nbsp;</' + attrs.taDefaultWrap.toUpperCase() + '>' :
							'<' + attrs.taDefaultWrap + '>&nbsp;</' + attrs.taDefaultWrap + '>';
				}
				
				// in here we are undoing the converts used elsewhere to prevent the < > and & being displayed when they shouldn't in the code.
				var _compileHtml = function(){
					if(_isContentEditable) return element[0].innerHTML;
					if(_isInputFriendly) return element.val();
					throw ('textAngular Error: attempting to update non-editable taBind');
				};

				//used for updating when inserting wrapped elements
				scope.$parent['updateTaBind' + (attrs.id || '')] = function(){
					if(!_isReadonly) ngModel.$setViewValue(_compileHtml());
				};

				//this code is used to update the models when data is entered/deleted
				if(_isInputFriendly){
					if(!_isContentEditable){
						element.on('paste cut', function(){
							// timeout to next is needed as otherwise the paste/cut event has not finished actually changing the display
							if(!_isReadonly) $timeout(function(){
								ngModel.$setViewValue(_compileHtml());
							}, 0);
						});
						// if a textarea or input just add in change and blur handlers, everything else is done by angulars input directive
						element.on('change blur', function(){
							if(!_isReadonly) ngModel.$setViewValue(_compileHtml());
						});
					}else{
						element.on('cut', function(e){
							// timeout to next is needed as otherwise the paste/cut event has not finished actually changing the display
							if(!_isReadonly)
								$timeout(function(){
									ngModel.$setViewValue(_compileHtml());
								}, 0);
							else e.preventDefault();
						});
						element.on('paste', function(e, eventData){
							/* istanbul ignore else: this is for catching the jqLite testing*/
							if(eventData) angular.extend(e, eventData);
							var text;
							// for non-ie
							if(e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData))
								text = (e.originalEvent || e).clipboardData.getData('text/plain');
							// for ie
							else if($window.clipboardData)
								text = $window.clipboardData.getData('Text');
							// if theres non text data and we aren't in read-only do default
							if(!text && !_isReadonly) return true;
							// prevent the default paste command
							e.preventDefault();
							if(!_isReadonly){
								var _working = angular.element('<div></div>');
								_working[0].innerHTML = text;
								// this strips out all HTML tags
								text = _working.text();
								if ($document[0].selection){
									var range = $document[0].selection.createRange();
									range.pasteHTML(text);
								}
								else{
									$document[0].execCommand('insertText', false, text);
								}
								ngModel.$setViewValue(_compileHtml());
							}
						});
						
						// all the code specific to contenteditable divs
						element.on('keyup', function(event, eventData){
							/* istanbul ignore else: this is for catching the jqLite testing*/
							if(eventData) angular.extend(event, eventData);
							if(!_isReadonly){
								// if enter - insert new taDefaultWrap, if shift+enter insert <br/>
								if(_defaultVal !== '' && event.keyCode === 13){
									if(!event.shiftKey){
										// new paragraph, br should be caught correctly
										var selection = taSelection.getSelectionElement();
										if(selection.tagName.toLowerCase() !== attrs.taDefaultWrap && selection.tagName.toLowerCase() !== 'li' && (selection.innerHTML.trim() === '' || selection.innerHTML.trim() === '<br>')){
											var _new = angular.element(_defaultVal);
											angular.element(selection).replaceWith(_new);
											taSelection.setSelectionToElementStart(_new[0]);
										}
									}
								}
								var val = _compileHtml();
								if(_defaultVal !== '' && val.trim() === ''){
									element[0].innerHTML = _defaultVal;
									taSelection.setSelectionToElementStart(element.children()[0]);
								}
								ngModel.$setViewValue(val);
							}
						});

						element.on('blur', function(){
							_focussed = false;
							var val = _compileHtml();
							/* istanbul ignore else: if readonly don't update model */
							if(!_isReadonly){
								if(val === _defaultTest) ngModel.$setViewValue('');
								else ngModel.$setViewValue(_compileHtml());
							}
							ngModel.$render();
						});
						
						// Placeholders not supported on ie 8 and below
						if(attrs.placeholder && (ie > 8 || ie === undefined)){
							var ruleIndex;
							if(attrs.id) ruleIndex = addCSSRule('#' + attrs.id + '.placeholder-text:before', 'content: "' + attrs.placeholder + '"');
							else throw('textAngular Error: An unique ID is required for placeholders to work');
							
							scope.$on('$destroy', function(){
								removeCSSRule(ruleIndex);
							});
						}
						
						element.on('focus', function(){
							_focussed = true;
							ngModel.$render();
						});
					}
				}

				// catch DOM XSS via taSanitize
				// Sanitizing both ways is identical
				var _sanitize = function(unsafe){
					return (ngModel.$oldViewValue = taSanitize(taFixChrome(unsafe), ngModel.$oldViewValue));
				};

				// parsers trigger from the above keyup function or any other time that the viewValue is updated and parses it for storage in the ngModel
				ngModel.$parsers.push(_sanitize);
				// because textAngular is bi-directional (which is awesome) we need to also sanitize values going in from the server
				ngModel.$formatters.push(_sanitize);
				
				var selectorClickHandler = function(event){
					// emit the element-select event, pass the element
					scope.$emit('ta-element-select', this);
					event.preventDefault();
					return false;
				};
				var fileDropHandler = function(event, eventData){
					/* istanbul ignore else: this is for catching the jqLite testing*/
					if(eventData) angular.extend(event, eventData);
					// emit the drop event, pass the element, preventing should be done elsewhere
					if(!dropFired && !_isReadonly){
						dropFired = true;
						var dataTransfer;
						if(event.originalEvent) dataTransfer = event.originalEvent.dataTransfer;
						else dataTransfer = event.dataTransfer;
						scope.$emit('ta-drop-event', this, event, dataTransfer);
						$timeout(function(){dropFired = false;}, 100);
					}
				};
				
				//used for updating when inserting wrapped elements
				scope.$parent['reApplyOnSelectorHandlers' + (attrs.id || '')] = function(){
					/* istanbul ignore else */
					if(!_isReadonly) angular.forEach(taSelectableElements, function(selector){
							// check we don't apply the handler twice
							element.find(selector)
								.off('click', selectorClickHandler)
								.on('click', selectorClickHandler);
						});
				};
				
				// changes to the model variable from outside the html/text inputs
				ngModel.$render = function(){
					// catch model being null or undefined
					var val = ngModel.$viewValue || '';
					// if the editor isn't focused it needs to be updated, otherwise it's receiving user input
					if($document[0].activeElement !== element[0]){
						// Not focussed
						if(_isContentEditable){
							// WYSIWYG Mode
							if(attrs.placeholder){
								if(val === ''){
									// blank
									if(_focussed) element.removeClass('placeholder-text');
									else element.addClass('placeholder-text');
									element[0].innerHTML = _defaultVal;
								}else{
									// not-blank
									element.removeClass('placeholder-text');
									element[0].innerHTML = val;
								}
							}else{
								if(val === '') element[0].innerHTML = _defaultVal;
								else element[0].innerHTML = val;
							}
							// if in WYSIWYG and readOnly we kill the use of links by clicking
							if(!_isReadonly){
								angular.forEach(taSelectableElements, function(selector){
									element.find(selector).on('click', selectorClickHandler);
								});
								element.on('drop', fileDropHandler);
							}else{
								element.off('drop', fileDropHandler);
							}
						}else if(element[0].tagName.toLowerCase() !== 'textarea' && element[0].tagName.toLowerCase() !== 'input'){
							// make sure the end user can SEE the html code as a display. This is a read-only display element
							element[0].innerHTML = taApplyCustomRenderers(val);
						}else{
							// only for input and textarea inputs
							element.val(val);
						}
					}else{
						/* istanbul ignore else: in other cases we don't care */
						if(_isContentEditable){
							// element is focussed, test for placeholder
							element.removeClass('placeholder-text');
						}
					}
				};

				if(attrs.taReadonly){
					//set initial value
					_isReadonly = scope.$parent.$eval(attrs.taReadonly);
					if(_isReadonly){
						// we changed to readOnly mode (taReadonly='true')
						if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input'){
							element.attr('disabled', 'disabled');
						}
						if(element.attr('contenteditable') !== undefined && element.attr('contenteditable')){
							element.removeAttr('contenteditable');
						}
					}else{
						// we changed to NOT readOnly mode (taReadonly='false')
						if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input'){
							element.removeAttr('disabled');
						}else if(_isContentEditable){
							element.attr('contenteditable', 'true');
						}
					}
					// taReadonly only has an effect if the taBind element is an input or textarea or has contenteditable='true' on it.
					// Otherwise it is readonly by default
					scope.$parent.$watch(attrs.taReadonly, function(newVal, oldVal){
						if(oldVal === newVal) return;
						if(newVal){
							// we changed to readOnly mode (taReadonly='true')
							if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input'){
								element.attr('disabled', 'disabled');
							}
							if(element.attr('contenteditable') !== undefined && element.attr('contenteditable')){
								element.removeAttr('contenteditable');
							}
							// turn ON selector click handlers
							angular.forEach(taSelectableElements, function(selector){
								element.find(selector).on('click', selectorClickHandler);
							});
							element.off('drop', fileDropHandler);
						}else{
							// we changed to NOT readOnly mode (taReadonly='false')
							if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input'){
								element.removeAttr('disabled');
							}else if(_isContentEditable){
								element.attr('contenteditable', 'true');
							}
							// remove the selector click handlers
							angular.forEach(taSelectableElements, function(selector){
								element.find(selector).off('click', selectorClickHandler);
							});
							element.on('drop', fileDropHandler);
						}
						_isReadonly = newVal;
					});
				}
				
				// Initialise the selectableElements
				// if in WYSIWYG and readOnly we kill the use of links by clicking
				if(_isContentEditable && !_isReadonly){
					angular.forEach(taSelectableElements, function(selector){
						element.find(selector).on('click', selectorClickHandler);
					});
					element.on('drop', fileDropHandler);
					element.on('blur', function(){
						/* istanbul ignore next: webkit fix */
						if(/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)) { // detect webkit
							globalContentEditableBlur = true;
						}
					});
				}
			}
		};
	}]).factory('taApplyCustomRenderers', ['taCustomRenderers', function(taCustomRenderers){
		return function(val){
			var element = angular.element('<div></div>');
			element[0].innerHTML = val;
			
			angular.forEach(taCustomRenderers, function(renderer){
				var elements = [];
				// get elements based on what is defined. If both defined do secondary filter in the forEach after using selector string
				if(renderer.selector && renderer.selector !== '')
					elements = element.find(renderer.selector);
				/* istanbul ignore else: shouldn't fire, if it does we're ignoring everything */
				else if(renderer.customAttribute && renderer.customAttribute !== '')
					elements = getByAttribute(element, renderer.customAttribute);
				// process elements if any found
				angular.forEach(elements, function(_element){
					_element = angular.element(_element);
					if(renderer.selector && renderer.selector !== '' && renderer.customAttribute && renderer.customAttribute !== ''){
						if(_element.attr(renderer.customAttribute) !== undefined) renderer.renderLogic(_element);
					} else renderer.renderLogic(_element);
				});
			});
			
			return element[0].innerHTML;
		};
	}]).directive('taMaxText', function(){
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attrs, ctrl){
				var max = parseInt(scope.$eval(attrs.taMaxText));
				if (isNaN(max)){
					throw('Max text must be an integer');
				}
				attrs.$observe('taMaxText', function(value){
					max = parseInt(value);
					if (isNaN(max)){
						throw('Max text must be an integer');
					}
					if (ctrl.$dirty){
						ctrl.$setViewValue(ctrl.$viewValue);
					}
				});
				function validator (viewValue){
					var source = angular.element('<div/>');
					source.html(viewValue);
					var length = source.text().length;
					if (length <= max){
						ctrl.$setValidity('taMaxText', true);
						return viewValue;
					}
					else{
						ctrl.$setValidity('taMaxText', false);
						return undefined;
					}
				}
				ctrl.$parsers.unshift(validator);
			}
		};
	}).factory('taFixChrome', function(){
		// get whaterever rubbish is inserted in chrome
		// should be passed an html string, returns an html string
		var taFixChrome = function(html){
			// default wrapper is a span so find all of them
			var $html = angular.element('<div>' + html + '</div>');
			var spans = angular.element($html).find('span');
			for(var s = 0; s < spans.length; s++){
				var span = angular.element(spans[s]);
				// chrome specific string that gets inserted into the style attribute, other parts may vary. Second part is specific ONLY to hitting backspace in Headers
				if(span.attr('style') && span.attr('style').match(/line-height: 1.428571429;|color: inherit; line-height: 1.1;/i)){
					span.attr('style', span.attr('style').replace(/( |)font-family: inherit;|( |)line-height: 1.428571429;|( |)line-height:1.1;|( |)color: inherit;/ig, ''));
					if(!span.attr('style') || span.attr('style') === ''){
						if(span.next().length > 0 && span.next()[0].tagName === 'BR') span.next().remove();
						span.replaceWith(span[0].innerHTML);
					}
				}
			}
			// regex to replace ONLY offending styles - these can be inserted into various other tags on delete
			var result = $html[0].innerHTML.replace(/style="[^"]*?(line-height: 1.428571429;|color: inherit; line-height: 1.1;)[^"]*"/ig, '');
			// only replace when something has changed, else we get focus problems on inserting lists
			if(result !== $html[0].innerHTML) $html[0].innerHTML = result;
			return $html[0].innerHTML;
		};
		return taFixChrome;
	}).factory('taSanitize', ['$sanitize', function taSanitizeFactory($sanitize){
		return function taSanitize(unsafe, oldsafe){
			// unsafe and oldsafe should be valid HTML strings
			// any exceptions (lets say, color for example) should be made here but with great care
			// setup unsafe element for modification
			var unsafeElement = angular.element('<div>' + unsafe + '</div>');
			// replace all align='...' tags with text-align attributes
			angular.forEach(getByAttribute(unsafeElement, 'align'), function(element){
				element.css('text-align', element.attr('align'));
				element.removeAttr('align');
			});

			// get the html string back
			unsafe = unsafeElement[0].innerHTML;
			var safe;
			try {
				safe = $sanitize(unsafe);
			} catch (e){
				safe = oldsafe || '';
			}
			return safe;
		};
	}]).directive('textAngularToolbar', [
		'$compile', 'textAngularManager', 'taOptions', 'taTools', 'taToolExecuteAction', '$window',
		function($compile, textAngularManager, taOptions, taTools, taToolExecuteAction, $window){
			return {
				scope: {
					name: '@' // a name IS required
				},
				restrict: "EA",
				link: function(scope, element, attrs){
					if(!scope.name || scope.name === '') throw('textAngular Error: A toolbar requires a name');
					angular.extend(scope, angular.copy(taOptions));
					if(attrs.taToolbar)						scope.toolbar = scope.$parent.$eval(attrs.taToolbar);
					if(attrs.taToolbarClass)				scope.classes.toolbar = attrs.taToolbarClass;
					if(attrs.taToolbarGroupClass)			scope.classes.toolbarGroup = attrs.taToolbarGroupClass;
					if(attrs.taToolbarButtonClass)			scope.classes.toolbarButton = attrs.taToolbarButtonClass;
					if(attrs.taToolbarActiveButtonClass)	scope.classes.toolbarButtonActive = attrs.taToolbarActiveButtonClass;
					if(attrs.taFocussedClass)				scope.classes.focussed = attrs.taFocussedClass;

					scope.disabled = true;
					scope.focussed = false;
					scope._$element = element;
					element[0].innerHTML = '';
					element.addClass("ta-toolbar " + scope.classes.toolbar);

					scope.$watch('focussed', function(){
						if(scope.focussed) element.addClass(scope.classes.focussed);
						else element.removeClass(scope.classes.focussed);
					});
					
					var setupToolElement = function(toolDefinition, toolScope){
						var toolElement;
						if(toolDefinition && toolDefinition.display){
							toolElement = angular.element(toolDefinition.display);
						}
						else toolElement = angular.element("<button type='button'>");

						toolElement.addClass(scope.classes.toolbarButton);
						toolElement.attr('name', toolScope.name);
						// important to not take focus from the main text/html entry
						toolElement.attr('unselectable', 'on');
						toolElement.attr('ng-disabled', 'isDisabled()');
						toolElement.attr('tabindex', '-1');
						toolElement.attr('ng-click', 'executeAction()');
						toolElement.attr('ng-class', 'displayActiveToolClass(active)');
						toolElement.on('mousedown', function(e, eventData){
							/* istanbul ignore else: this is for catching the jqLite testing*/
							if(eventData) angular.extend(e, eventData);
							// this prevents focusout from firing on the editor when clicking toolbar buttons
							e.preventDefault();
							return false;
						});
						if(toolDefinition && !toolDefinition.display && !toolScope._display){
							// first clear out the current contents if any
							toolElement[0].innerHTML = '';
							// add the buttonText
							if(toolDefinition.buttontext) toolElement[0].innerHTML = toolDefinition.buttontext;
							// add the icon to the front of the button if there is content
							if(toolDefinition.iconclass){
								var icon = angular.element('<i>'), content = toolElement[0].innerHTML;
								icon.addClass(toolDefinition.iconclass);
								toolElement[0].innerHTML = '';
								toolElement.append(icon);
								if(content && content !== '') toolElement.append('&nbsp;' + content);
							}
						}

						toolScope._lastToolDefinition = angular.copy(toolDefinition);

						return $compile(toolElement)(toolScope);
					};

					// Keep a reference for updating the active states later
					scope.tools = {};
					// create the tools in the toolbar
					// default functions and values to prevent errors in testing and on init
					scope._parent = {
						disabled: true,
						showHtml: false,
						queryFormatBlockState: function(){ return false; }
					};
					var defaultChildScope = {
						$window: $window,
						$editor: function(){
							// dynamically gets the editor as it is set
							return scope._parent;
						},
						isDisabled: function(){
							// to set your own disabled logic set a function or boolean on the tool called 'disabled'
							return ( // this bracket is important as without it it just returns the first bracket and ignores the rest
								// when the button's disabled function/value evaluates to true
								this.$eval('disabled') || this.$eval('disabled()') ||
								// all buttons except the HTML Switch button should be disabled in the showHtml (RAW html) mode
								(this.name !== 'html' && this.$editor().showHtml) ||
								// if the toolbar is disabled
								this.$parent.disabled ||
								// if the current editor is disabled
								this.$editor().disabled
							);
						},
						displayActiveToolClass: function(active){
							return (active)? scope.classes.toolbarButtonActive : '';
						},
						executeAction: taToolExecuteAction
					};

					angular.forEach(scope.toolbar, function(group){
						// setup the toolbar group
						var groupElement = angular.element("<div>");
						groupElement.addClass(scope.classes.toolbarGroup);
						angular.forEach(group, function(tool){
							// init and add the tools to the group
							// a tool name (key name from taTools struct)
							//creates a child scope of the main angularText scope and then extends the childScope with the functions of this particular tool
							// reference to the scope and element kept
							scope.tools[tool] = angular.extend(scope.$new(true), taTools[tool], defaultChildScope, {name: tool});
							scope.tools[tool].$element = setupToolElement(taTools[tool], scope.tools[tool]);
							// append the tool compiled with the childScope to the group element
							groupElement.append(scope.tools[tool].$element);
						});
						// append the group to the toolbar
						element.append(groupElement);
					});

					// update a tool
					// if a value is set to null, remove from the display
					// when forceNew is set to true it will ignore all previous settings, used to reset to taTools definition
					// to reset to defaults pass in taTools[key] as _newTool and forceNew as true, ie `updateToolDisplay(key, taTools[key], true);`
					scope.updateToolDisplay = function(key, _newTool, forceNew){
						var toolInstance = scope.tools[key];
						if(toolInstance){
							// get the last toolDefinition, then override with the new definition
							if(toolInstance._lastToolDefinition && !forceNew) _newTool = angular.extend({}, toolInstance._lastToolDefinition, _newTool);
							if(_newTool.buttontext === null && _newTool.iconclass === null && _newTool.display === null)
								throw('textAngular Error: Tool Definition for updating "' + key + '" does not have a valid display/iconclass/buttontext value');

							// if tool is defined on this toolbar, update/redo the tool
							if(_newTool.buttontext === null){
								delete _newTool.buttontext;
							}
							if(_newTool.iconclass === null){
								delete _newTool.iconclass;
							}
							if(_newTool.display === null){
								delete _newTool.display;
							}

							var toolElement = setupToolElement(_newTool, toolInstance);
							toolInstance.$element.replaceWith(toolElement);
							toolInstance.$element = toolElement;
						}
					};
					
					// we assume here that all values passed are valid and correct
					scope.addTool = function(key, _newTool, groupIndex, index){
						scope.tools[key] = angular.extend(scope.$new(true), taTools[key], defaultChildScope, {name: key});
						scope.tools[key].$element = setupToolElement(taTools[key], scope.tools[key]);
						var group;
						if(groupIndex === undefined) groupIndex = scope.toolbar.length - 1;
						group = angular.element(element.children()[groupIndex]);
						
						if(index === undefined){
							group.append(scope.tools[key].$element);
							scope.toolbar[groupIndex][scope.toolbar[groupIndex].length - 1] = key;
						}else{
							group.children().eq(index).after(scope.tools[key].$element);
							scope.toolbar[groupIndex][index] = key;
						}
					};
					
					textAngularManager.registerToolbar(scope);

					scope.$on('$destroy', function(){
						textAngularManager.unregisterToolbar(scope.name);
					});
				}
			};
		}
	]).service('taToolExecuteAction', ['$q', function($q){
		// this must be called on a toolScope or instance
		return function(editor){
			if(editor !== undefined) this.$editor = function(){ return editor; };
			var deferred = $q.defer(),
				promise = deferred.promise,
				_editor = this.$editor();
			promise['finally'](function(){
				_editor.endAction.call(_editor);
			});
			// pass into the action the deferred function and also the function to reload the current selection if rangy available
			var result;
			try{
				result = this.action(deferred, _editor.startAction());
			}catch(any){}
			if(result || result === undefined){
				// if true or undefined is returned then the action has finished. Otherwise the deferred action will be resolved manually.
				deferred.resolve();
			}
		};
	}]).service('textAngularManager', ['taToolExecuteAction', 'taTools', 'taRegisterTool', function(taToolExecuteAction, taTools, taRegisterTool){
		// this service is used to manage all textAngular editors and toolbars.
		// All publicly published functions that modify/need to access the toolbar or editor scopes should be in here
		// these contain references to all the editors and toolbars that have been initialised in this app
		var toolbars = {}, editors = {};
		// when we focus into a toolbar, we need to set the TOOLBAR's $parent to be the toolbars it's linked to.
		// We also need to set the tools to be updated to be the toolbars...
		return {
			// register an editor and the toolbars that it is affected by
			registerEditor: function(name, scope, targetToolbars){
				// targetToolbars are optional, we don't require a toolbar to function
				if(!name || name === '') throw('textAngular Error: An editor requires a name');
				if(!scope) throw('textAngular Error: An editor requires a scope');
				if(editors[name]) throw('textAngular Error: An Editor with name "' + name + '" already exists');
				// _toolbars is an ARRAY of toolbar scopes
				var _toolbars = [];
				angular.forEach(targetToolbars, function(_name){
					if(toolbars[_name]) _toolbars.push(toolbars[_name]);
					// if it doesn't exist it may not have been compiled yet and it will be added later
				});
				editors[name] = {
					scope: scope,
					toolbars: targetToolbars,
					_registerToolbar: function(toolbarScope){
						// add to the list late
						if(this.toolbars.indexOf(toolbarScope.name) >= 0) _toolbars.push(toolbarScope);
					},
					// this is a suite of functions the editor should use to update all it's linked toolbars
					editorFunctions: {
						disable: function(){
							// disable all linked toolbars
							angular.forEach(_toolbars, function(toolbarScope){ toolbarScope.disabled = true; });
						},
						enable: function(){
							// enable all linked toolbars
							angular.forEach(_toolbars, function(toolbarScope){ toolbarScope.disabled = false; });
						},
						focus: function(){
							// this should be called when the editor is focussed
							angular.forEach(_toolbars, function(toolbarScope){
								toolbarScope._parent = scope;
								toolbarScope.disabled = false;
								toolbarScope.focussed = true;
							});
						},
						unfocus: function(){
							// this should be called when the editor becomes unfocussed
							angular.forEach(_toolbars, function(toolbarScope){
								toolbarScope.disabled = true;
								toolbarScope.focussed = false;
							});
						},
						updateSelectedStyles: function(selectedElement){
							// update the active state of all buttons on liked toolbars
							angular.forEach(_toolbars, function(toolbarScope){
								angular.forEach(toolbarScope.tools, function(toolScope){
									if(toolScope.activeState){
										toolScope.active = toolScope.activeState(selectedElement);
									}
								});
							});
						},
						sendKeyCommand: function(event){
							// we return true if we applied an action, false otherwise
							var result = false;
							if(event.ctrlKey || event.metaKey) angular.forEach(taTools, function(tool, name){
								if(tool.commandKeyCode && tool.commandKeyCode === event.which){
									for(var _t = 0; _t < _toolbars.length; _t++){
										if(_toolbars[_t].tools[name] !== undefined){
											taToolExecuteAction.call(_toolbars[_t].tools[name], scope);
											result = true;
											break;
										}
									}
								}
							});
							return result;
						},
						triggerElementSelect: function(event, element){
							// search through the taTools to see if a match for the tag is made.
							// if there is, see if the tool is on a registered toolbar and not disabled.
							// NOTE: This can trigger on MULTIPLE tools simultaneously.
							var elementHasAttrs = function(_element, attrs){
								var result = true;
								for(var i = 0; i < attrs.length; i++) result = result && _element.attr(attrs[i]);
								return result;
							};
							var workerTools = [];
							var unfilteredTools = {};
							var result = false;
							element = angular.element(element);
							// get all valid tools by element name, keep track if one matches the 
							var onlyWithAttrsFilter = false;
							angular.forEach(taTools, function(tool, name){
								if(
									tool.onElementSelect &&
									tool.onElementSelect.element &&
									tool.onElementSelect.element.toLowerCase() === element[0].tagName.toLowerCase() &&
									(!tool.onElementSelect.filter || tool.onElementSelect.filter(element))
								){
									// this should only end up true if the element matches the only attributes
									onlyWithAttrsFilter = onlyWithAttrsFilter ||
										(angular.isArray(tool.onElementSelect.onlyWithAttrs) && elementHasAttrs(element, tool.onElementSelect.onlyWithAttrs));
									if(!tool.onElementSelect.onlyWithAttrs || elementHasAttrs(element, tool.onElementSelect.onlyWithAttrs)) unfilteredTools[name] = tool;
								}
							});
							// if we matched attributes to filter on, then filter, else continue
							if(onlyWithAttrsFilter){
								angular.forEach(unfilteredTools, function(tool, name){
									if(tool.onElementSelect.onlyWithAttrs && elementHasAttrs(element, tool.onElementSelect.onlyWithAttrs)) workerTools.push({'name': name, 'tool': tool});
								});
								// sort most specific (most attrs to find) first
								workerTools.sort(function(a,b){
									return b.tool.onElementSelect.onlyWithAttrs.length - a.tool.onElementSelect.onlyWithAttrs.length;
								});
							}else{
								angular.forEach(unfilteredTools, function(tool, name){
									workerTools.push({'name': name, 'tool': tool});
								});
							}
							// Run the actions on the first filtered tool only
							if(workerTools.length > 0){
								var tool = workerTools[0].tool;
								var name = workerTools[0].name;
								for(var _t = 0; _t < _toolbars.length; _t++){
									if(_toolbars[_t].tools[name] !== undefined){
										tool.onElementSelect.action.call(_toolbars[_t].tools[name], event, element, scope);
										result = true;
										break;
									}
								}
							}
							return result;
						}
					}
				};
				return editors[name].editorFunctions;
			},
			// retrieve editor by name, largely used by testing suites only
			retrieveEditor: function(name){
				return editors[name];
			},
			unregisterEditor: function(name){
				delete editors[name];
			},
			// registers a toolbar such that it can be linked to editors
			registerToolbar: function(scope){
				if(!scope) throw('textAngular Error: A toolbar requires a scope');
				if(!scope.name || scope.name === '') throw('textAngular Error: A toolbar requires a name');
				if(toolbars[scope.name]) throw('textAngular Error: A toolbar with name "' + scope.name + '" already exists');
				toolbars[scope.name] = scope;
				angular.forEach(editors, function(_editor){
					_editor._registerToolbar(scope);
				});
			},
			// retrieve toolbar by name, largely used by testing suites only
			retrieveToolbar: function(name){
				return toolbars[name];
			},
			// retrieve toolbars by editor name, largely used by testing suites only
			retrieveToolbarsViaEditor: function(name){
				var result = [], _this = this;
				angular.forEach(this.retrieveEditor(name).toolbars, function(name){
					result.push(_this.retrieveToolbar(name));
				});
				return result;
			},
			unregisterToolbar: function(name){
				delete toolbars[name];
			},
			// functions for updating the toolbar buttons display
			updateToolsDisplay: function(newTaTools){
				// pass a partial struct of the taTools, this allows us to update the tools on the fly, will not change the defaults.
				var _this = this;
				angular.forEach(newTaTools, function(_newTool, key){
					_this.updateToolDisplay(key, _newTool);
				});
			},
			// this function resets all toolbars to their default tool definitions
			resetToolsDisplay: function(){
				var _this = this;
				angular.forEach(taTools, function(_newTool, key){
					_this.resetToolDisplay(key);
				});
			},
			// update a tool on all toolbars
			updateToolDisplay: function(toolKey, _newTool){
				var _this = this;
				angular.forEach(toolbars, function(toolbarScope, toolbarKey){
					_this.updateToolbarToolDisplay(toolbarKey, toolKey, _newTool);
				});
			},
			// resets a tool to the default/starting state on all toolbars
			resetToolDisplay: function(toolKey){
				var _this = this;
				angular.forEach(toolbars, function(toolbarScope, toolbarKey){
					_this.resetToolbarToolDisplay(toolbarKey, toolKey);
				});
			},
			// update a tool on a specific toolbar
			updateToolbarToolDisplay: function(toolbarKey, toolKey, _newTool){
				if(toolbars[toolbarKey]) toolbars[toolbarKey].updateToolDisplay(toolKey, _newTool);
				else throw('textAngular Error: No Toolbar with name "' + toolbarKey + '" exists');
			},
			// reset a tool on a specific toolbar to it's default starting value
			resetToolbarToolDisplay: function(toolbarKey, toolKey){
				if(toolbars[toolbarKey]) toolbars[toolbarKey].updateToolDisplay(toolKey, taTools[toolKey], true);
				else throw('textAngular Error: No Toolbar with name "' + toolbarKey + '" exists');
			},
			// removes a tool from all toolbars and it's definition
			removeTool: function(toolKey){
				delete taTools[toolKey];
				angular.forEach(toolbars, function(toolbarScope){
					delete toolbarScope.tools[toolKey];
					for(var i = 0; i < toolbarScope.toolbar.length; i++){
						var toolbarIndex;
						for(var j = 0; j < toolbarScope.toolbar[i].length; j++){
							if(toolbarScope.toolbar[i][j] === toolKey){
								toolbarIndex = {
									group: i,
									index: j
								};
								break;
							}
							if(toolbarIndex !== undefined) break;
						}
						if(toolbarIndex !== undefined){
							toolbarScope.toolbar[toolbarIndex.group].slice(toolbarIndex.index, 1);
							toolbarScope._$element.children().eq(toolbarIndex.group).children().eq(toolbarIndex.index).remove();
						}
					}
				});
			},
			// toolkey, toolDefinition are required. If group is not specified will pick the last group, if index isnt defined will append to group
			addTool: function(toolKey, toolDefinition, group, index){
				taRegisterTool(toolKey, toolDefinition);
				angular.forEach(toolbars, function(toolbarScope){
					toolbarScope.addTool(toolKey, toolDefinition, group, index);
				});
			},
			// adds a Tool but only to one toolbar not all
			addToolToToolbar: function(toolKey, toolDefinition, toolbarKey, group, index){
				taRegisterTool(toolKey, toolDefinition);
				toolbars[toolbarKey].addTool(toolKey, toolDefinition, group, index);
			},
			// this is used when externally the html of an editor has been changed and textAngular needs to be notified to update the model.
			// this will call a $digest if not already happening
			refreshEditor: function(name){
				if(editors[name]){
					editors[name].scope.updateTaBindtaTextElement();
					/* istanbul ignore else: phase catch */
					if(!editors[name].scope.$$phase) editors[name].scope.$digest();
				}else throw('textAngular Error: No Editor with name "' + name + '" exists');
			}
		};
	}]).service('taSelection', ['$window', '$document', function($window, $document){
		/* istanbul ignore next: all browser specifics and PhantomJS dosen't seem to support half of it */
		return {
			// Some basic selection functions
			getSelectionElement: function () {
				var range, sel, container;
				if ($document.selection && $document.selection.createRange) {
					// IE case
					range = $document.selection.createRange();
					return range.parentElement();
				} else if ($window.getSelection) {
					sel = $window.getSelection();
					if (sel.getRangeAt) {
						if (sel.rangeCount > 0) {
							range = sel.getRangeAt(0);
						}
					} else {
						// Old WebKit selection object has no getRangeAt, so
						// create a range from other selection properties
						range = $document.createRange();
						range.setStart(sel.anchorNode, sel.anchorOffset);
						range.setEnd(sel.focusNode, sel.focusOffset);
			
						// Handle the case when the selection was selected backwards (from the end to the start in the document)
						if (range.collapsed !== sel.isCollapsed) {
							range.setStart(sel.focusNode, sel.focusOffset);
							range.setEnd(sel.anchorNode, sel.anchorOffset);
						}
					}
			
					if (range) {
						container = range.commonAncestorContainer;
			
						// Check if the container is a text node and return its parent if so
						return container.nodeType === 3 ? container.parentNode : container;
					}   
				}
			},
			setSelectionToElementStart: function (el){
				if ($document.createRange && $window.getSelection) {
					var range = $document.createRange();
					range.selectNodeContents(el);
					range.setStart(el, 0);
					range.setEnd(el, 0);
					
					var sel = $window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				} else if ($document.selection && $document.body.createTextRange) {
					var textRange = $document.body.createTextRange();
					textRange.moveToElementText(el);
					textRange.collapse(true);
					textRange.moveEnd("character", 0);
					textRange.moveStart("character", 0);
					textRange.select();
				}
			}
		};
	}]);
})();
