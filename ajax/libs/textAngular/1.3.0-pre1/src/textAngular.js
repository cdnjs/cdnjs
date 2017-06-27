/*
textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.2.2

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/

(function(){ // encapsulate all variables so they don't become global vars
	"Use Strict";

	// fix a webkit bug, see: https://gist.github.com/shimondoodkin/1081133
	// this is set true when a blur occurs as the blur of the ta-bind triggers before the click
	var globalContentEditableBlur = false;
	/* istanbul ignore next: Browser Un-Focus fix for webkit */
	if(/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)) { // detect webkit
		document.addEventListener("click", function(_event){
			var e = _event || window.event;
			var curelement = e.target;
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
		angular.element(document).ready(function () {
			angular.element(document.body).append(angular.element('<input id="textAngular-editableFix-010203040506070809" style="width:1px;height:1px;border:none;margin:0;padding:0;position:absolute; top: -10000px; left: -10000px;" unselectable="on" tabIndex="-1">'));
		});
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

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Compatibility
	/* istanbul ignore next: trim shim for older browsers */
	if (!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g, '');
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
	var sheet, addCSSRule, removeCSSRule, _addCSSRule, _removeCSSRule;
	/* istanbul ignore else: IE <8 test*/
	if(ie > 8 || ie === undefined){
		var _sheets = document.styleSheets, _lastValidSheet;
		/* istanbul ignore next: preference for stylesheet loaded externally */
		for(var i = 0; i < _sheets.length; i++){
			if(_sheets[i].media.length === 0 || _sheets[i].media.mediaText.match(/(all|screen)/ig)){
				if(_sheets[i].href){
					if(_sheets[i].href.match(/textangular\.(min\.|)css/ig)){
						sheet = _sheets[i];
						break;
					} else _lastValidSheet = _sheets[i];
				}
			}
		}
		/* istanbul ignore next: preference for stylesheet loaded externally */
		if(!sheet && _lastValidSheet){
			sheet = _lastValidSheet;
		}else if(!sheet){
			// this sheet is used for the placeholders later on.
			sheet = (function() {
				// Create the <style> tag
				var style = document.createElement("style");
				/* istanbul ignore else : WebKit hack :( */
				if(/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)) style.appendChild(document.createTextNode(""));
	
				// Add the <style> element to the page, add as first so the styles can be overridden by custom stylesheets
				document.head.appendChild(style);
	
				return style.sheet;
			})();
		}

		// use as: addCSSRule("header", "float: left");
		addCSSRule = function(selector, rules) {
			_addCSSRule(sheet, selector, rules);
		};
		_addCSSRule = function(sheet, selector, rules){
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
			_removeCSSRule(sheet, index);
		};
		_removeCSSRule = function(sheet, index){
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
	var textAngular = angular.module("textAngular", ['ngSanitize', 'textAngularSetup']); //This makes ngSanitize required

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
					Optional, an HTML element to be displayed as the button. The `scope` of the button is the tool definition object with some additional functions
					If set this will cause buttontext and iconclass to be ignored
			buttontext: [string]?
					if this is defined it will replace the contents of the element contained in the `display` element
			iconclass: [string]?
					if this is defined an icon (<i>) will be appended to the `display` element with this string as it's class
			tooltiptext: [string]?
					Optional, a plain text description of the action, used for the title attribute of the action button in the toolbar by default.
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

	textAngular.constant('taRegisterTool', registerTextAngularTool);
	textAngular.value('taTools', taTools);

	textAngular.config([function(){
		// clear taTools variable. Just catches testing and any other time that this config may run multiple times...
		angular.forEach(taTools, function(value, key){ delete taTools[key];	});
	}]);

	textAngular.directive("textAngular", [
		'$compile', '$timeout', 'taOptions', 'taSelection', 'taExecCommand', 'textAngularManager', '$window', '$document', '$animate', '$log',
		function($compile, $timeout, taOptions, taSelection, taExecCommand, textAngularManager, $window, $document, $animate, $log){
			return {
				require: '?ngModel',
				scope: {},
				restrict: "EA",
				link: function(scope, element, attrs, ngModel){
					// all these vars should not be accessable outside this directive
					var _keydown, _keyup, _keypress, _mouseup, _mousedown, _focusin, _focusout,
						_originalContents, _toolbars,
						_serial = (attrs.serial) ? attrs.serial : Math.floor(Math.random() * 10000000000000000),
						_name = (attrs.name) ? attrs.name : 'textAngularEditor' + _serial,
						_taExecCommand;

					var oneEvent = function(_element, event, action){
						$timeout(function(){
							// shim the .one till fixed
							var _func = function(){
								_element.off(event, _func);
								action();
							};
							_element.on(event, _func);
						}, 100);
					};
					_taExecCommand = taExecCommand(attrs.taDefaultWrap);
					// get the settings from the defaults and add our specific functions that need to be on the scope
					angular.extend(scope, angular.copy(taOptions), {
						// wraps the selection in the provided tag / execCommand function. Should only be called in WYSIWYG mode.
						wrapSelection: function(command, opt, isSelectableElementTool){
							// catch errors like FF erroring when you try to force an undo with nothing done
							_taExecCommand(command, false, opt);
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
						scrollWindow: angular.element("<div class='ta-scroll-window'></div>"),
						popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),
						popoverArrow: angular.element('<div class="arrow"></div>'),
						popoverContainer: angular.element('<div class="popover-content"></div>'),
						resize: {
							overlay: angular.element('<div class="ta-resizer-handle-overlay"></div>'),
							background: angular.element('<div class="ta-resizer-handle-background"></div>'),
							anchors: [
								angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'),
								angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'),
								angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'),
								angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')
							],
							info: angular.element('<div class="ta-resizer-handle-info"></div>')
						}
					};

					// Setup the popover
					scope.displayElements.popover.append(scope.displayElements.popoverArrow);
					scope.displayElements.popover.append(scope.displayElements.popoverContainer);
					scope.displayElements.scrollWindow.append(scope.displayElements.popover);

					scope.displayElements.popover.on('mousedown', function(e, eventData){
						/* istanbul ignore else: this is for catching the jqLite testing*/
						if(eventData) angular.extend(e, eventData);
						// this prevents focusout from firing on the editor when clicking anything in the popover
						e.preventDefault();
						return false;
					});

					// define the popover show and hide functions
					scope.showPopover = function(_el){
						scope.displayElements.popover.css('display', 'block');
						scope.reflowPopover(_el);
						$animate.addClass(scope.displayElements.popover, 'in');
						oneEvent(element, 'click keyup', function(){scope.hidePopover();});
					};
					scope.reflowPopover = function(_el){
						/* istanbul ignore if: catches only if near bottom of editor */
						if(scope.displayElements.text[0].offsetHeight - 51 > _el[0].offsetTop){
							scope.displayElements.popover.css('top', _el[0].offsetTop + _el[0].offsetHeight + 'px');
							scope.displayElements.popover.removeClass('top').addClass('bottom');
						}else{
							scope.displayElements.popover.css('top', _el[0].offsetTop - 54 + 'px');
							scope.displayElements.popover.removeClass('bottom').addClass('top');
						}
						var _maxLeft = scope.displayElements.text[0].offsetWidth - scope.displayElements.popover[0].offsetWidth;
						var _targetLeft = _el[0].offsetLeft + (_el[0].offsetWidth / 2.0) - (scope.displayElements.popover[0].offsetWidth / 2.0);
						scope.displayElements.popover.css('left', Math.max(0, Math.min(_maxLeft, _targetLeft)) + 'px');
						scope.displayElements.popoverArrow.css('margin-left', (Math.min(_targetLeft, (Math.max(0, _targetLeft - _maxLeft))) - 11) + 'px');
					};
					scope.hidePopover = function(){
						$animate.removeClass(scope.displayElements.popover, 'in', /* istanbul ignore next: dosen't test with mocked animate */ function(){
							scope.displayElements.popover.css('display', '');
							scope.displayElements.popoverContainer.attr('style', '');
							scope.displayElements.popoverContainer.attr('class', 'popover-content');
						});
					};

					// setup the resize overlay
					scope.displayElements.resize.overlay.append(scope.displayElements.resize.background);
					angular.forEach(scope.displayElements.resize.anchors, function(anchor){ scope.displayElements.resize.overlay.append(anchor);});
					scope.displayElements.resize.overlay.append(scope.displayElements.resize.info);
					scope.displayElements.scrollWindow.append(scope.displayElements.resize.overlay);

					// define the show and hide events
					scope.reflowResizeOverlay = function(_el){
						_el = angular.element(_el)[0];
						scope.displayElements.resize.overlay.css({
							'display': 'block',
							'left': _el.offsetLeft - 5 + 'px',
							'top': _el.offsetTop - 5 + 'px',
							'width': _el.offsetWidth + 10 + 'px',
							'height': _el.offsetHeight + 10 + 'px'
						});
						scope.displayElements.resize.info.text(_el.offsetWidth + ' x ' + _el.offsetHeight);
					};
					/* istanbul ignore next: pretty sure phantomjs won't test this */
					scope.showResizeOverlay = function(_el){
						var resizeMouseDown = function(event){
							var startPosition = {
								width: parseInt(_el.attr('width')),
								height: parseInt(_el.attr('height')),
								x: event.clientX,
								y: event.clientY
							};
							if(startPosition.width === undefined) startPosition.width = _el[0].offsetWidth;
							if(startPosition.height === undefined) startPosition.height = _el[0].offsetHeight;
							scope.hidePopover();
							var ratio = startPosition.height / startPosition.width;
							var mousemove = function(event){
								// calculate new size
								var pos = {
									x: Math.max(0, startPosition.width + (event.clientX - startPosition.x)),
									y: Math.max(0, startPosition.height + (event.clientY - startPosition.y))
								};
								var applyImageSafeCSS = function(_el, css){
									_el = angular.element(_el);
									if(_el[0].tagName.toLowerCase() === 'img'){
										if(css.height){
											_el.attr('height', css.height);
											delete css.height;
										}
										if(css.width){
											_el.attr('width', css.width);
											delete css.width;
										}
									}
									_el.css(css);
								};
								if(event.shiftKey){
									// keep ratio
									var newRatio = pos.y / pos.x;
									applyImageSafeCSS(_el, {
										width: ratio > newRatio ? pos.x : pos.y / ratio,
										height: ratio > newRatio ? pos.x * ratio : pos.y
									});
								}else{
									applyImageSafeCSS(_el, {
										width: pos.x,
										height: pos.y
									});
								}
								// reflow the popover tooltip
								scope.reflowResizeOverlay(_el);
							};
							$document.find('body').on('mousemove', mousemove);
							oneEvent(scope.displayElements.resize.overlay, 'mouseup', function(){
								$document.find('body').off('mousemove', mousemove);
								scope.showPopover(_el);
							});
							event.stopPropagation();
							event.preventDefault();
						};

						scope.displayElements.resize.anchors[3].on('mousedown', resizeMouseDown);

						scope.reflowResizeOverlay(_el);
						oneEvent(element, 'click', function(){scope.hideResizeOverlay();});
					};
					/* istanbul ignore next: pretty sure phantomjs won't test this */
					scope.hideResizeOverlay = function(){
						scope.displayElements.resize.overlay.css('display', '');
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
						'ta-bind': 'ta-bind',
						'ng-model': 'html'
					});
					scope.displayElements.scrollWindow.attr({'ng-hide': 'showHtml'});
					if(attrs.taDefaultWrap) scope.displayElements.text.attr('ta-default-wrap', attrs.taDefaultWrap);
					
					if(attrs.taUnsafeSanitizer){
						scope.displayElements.text.attr('ta-unsafe-sanitizer', attrs.taUnsafeSanitizer);
						scope.displayElements.html.attr('ta-unsafe-sanitizer', attrs.taUnsafeSanitizer);
					}
					
					// add the main elements to the origional element
					scope.displayElements.scrollWindow.append(scope.displayElements.text);
					element.append(scope.displayElements.scrollWindow);
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
					$compile(scope.displayElements.scrollWindow)(scope);
					$compile(scope.displayElements.html)(scope);

					scope.updateTaBindtaTextElement = scope['updateTaBindtaTextElement' + _serial];
					scope.updateTaBindtaHtmlElement = scope['updateTaBindtaHtmlElement' + _serial];

					// add the classes manually last
					element.addClass("ta-root");
					scope.displayElements.scrollWindow.addClass("ta-text ta-editor " + scope.classes.textEditor);
					scope.displayElements.html.addClass("ta-html ta-editor " + scope.classes.htmlEditor);

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
						// $document[0].queryCommandValue('formatBlock') errors in Firefox if we call this when focussed on the textarea
						return !scope.showHtml && command.toLowerCase() === $document[0].queryCommandValue('formatBlock').toLowerCase();
					};
					scope.queryCommandState = function(command){
						// $document[0].queryCommandValue('formatBlock') errors in Firefox if we call this when focussed on the textarea
						return (!scope.showHtml) ? $document[0].queryCommandState(command) : '';
					};
					scope.switchView = function(){
						scope.showHtml = !scope.showHtml;
						$animate.enabled(false, scope.displayElements.html);
						$animate.enabled(false, scope.displayElements.text);
						//Show the HTML view
						if(scope.showHtml){
							//defer until the element is visible
							$timeout(function(){
								$animate.enabled(true, scope.displayElements.html);
								$animate.enabled(true, scope.displayElements.text);
								// [0] dereferences the DOM object from the angular.element
								return scope.displayElements.html[0].focus();
							}, 100);
						}else{
							//Show the WYSIWYG view
							//defer until the element is visible
							$timeout(function(){
								$animate.enabled(true, scope.displayElements.html);
								$animate.enabled(true, scope.displayElements.text);
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
						// trigger the validation calls
						var _validity = function(value){
							if(attrs.required) ngModel.$setValidity('required', !(!value || value.trim() === ''));
							return value;
						};
						ngModel.$parsers.push(_validity);
						ngModel.$formatters.push(_validity);
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
						if((_selection = taSelection.getSelectionElement()) !== undefined && _selection.parentNode !== scope.displayElements.text[0]){
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
	]).factory('taBrowserTag', [function(){
		return function(tag){
			/* istanbul ignore next: ie specific test */
			if(!tag) return (ie <= 8)? 'P' : 'p';
			else if(tag === '') return (ie === undefined)? 'div' : (ie <= 8)? 'P' : 'p';
			else return (ie <= 8)? tag.toUpperCase() : tag;
		};
	}]).factory('taExecCommand', ['taSelection', 'taBrowserTag', '$document', function(taSelection, taBrowserTag, $document){
		var BLOCKELEMENTS = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/ig;
		var LISTELEMENTS = /^(ul|li|ol)$/ig;
		var listToDefault = function(listElement, defaultWrap){
			var $target, i;
			// if all selected then we should remove the list
			// grab all li elements and convert to taDefaultWrap tags
			var children = listElement.find('li');
			for(i = children.length - 1; i >= 0; i--){
				$target = angular.element('<' + defaultWrap + '>' + children[i].innerHTML + '</' + defaultWrap + '>');
				listElement.after($target);
			}
			listElement.remove();
			taSelection.setSelectionToElementEnd($target[0]);
		};
		var listToList = function(listElement, newListTag){
			var $target = angular.element('<' + newListTag + '>' + listElement[0].innerHTML + '</' + newListTag + '>');
			listElement.after($target);
			listElement.remove();
			taSelection.setSelectionToElementEnd($target.find('li')[0]);
		};
		var childElementsToList = function(elements, listElement, newListTag){
			var html = '';
			for(var i = 0; i < elements.length; i++){
				html += '<' + taBrowserTag('li') + '>' + elements[i].innerHTML + '</' + taBrowserTag('li') + '>';
			}
			var $target = angular.element('<' + newListTag + '>' + html + '</' + newListTag + '>');
			listElement.after($target);
			listElement.remove();
			taSelection.setSelectionToElementEnd($target.find('li')[0]);
		};
		return function(taDefaultWrap){
			taDefaultWrap = taBrowserTag(taDefaultWrap);
			return function(command, showUI, options){
				var i, $target, html, _nodes, next, optionsTagName;
				var defaultWrapper = angular.element('<' + taDefaultWrap + '>');
				var selectedElement = taSelection.getSelectionElement();
				var $selected = angular.element(selectedElement);
				if(selectedElement !== undefined){
					var tagName = selectedElement.tagName.toLowerCase();
					if(command.toLowerCase() === 'insertorderedlist' || command.toLowerCase() === 'insertunorderedlist'){
						var selfTag = taBrowserTag((command.toLowerCase() === 'insertorderedlist')? 'ol' : 'ul');
						if(tagName === selfTag){
							// if all selected then we should remove the list
							// grab all li elements and convert to taDefaultWrap tags
							return listToDefault($selected, taDefaultWrap);
						}else if(tagName === 'li' && $selected.parent()[0].tagName.toLowerCase() === selfTag && $selected.parent().children().length === 1){
							// catch for the previous statement if only one li exists
							return listToDefault($selected.parent(), taDefaultWrap);
						}else if(tagName === 'li' && $selected.parent()[0].tagName.toLowerCase() !== selfTag && $selected.parent().children().length === 1){
							// catch for the previous statement if only one li exists
							return listToList($selected.parent(), selfTag);
						}else if(tagName.match(BLOCKELEMENTS) && !$selected.hasClass('ta-bind')){
							// if it's one of those block elements we have to change the contents
							// if it's a ol/ul we are changing from one to the other
							if(tagName === 'ol' || tagName === 'ul'){
								return listToList($selected, selfTag);
							}else{
								var childBlockElements = false;
								angular.forEach($selected.children(), function(elem){
									if(elem.tagName.match(BLOCKELEMENTS)) {
										childBlockElements = true;
									}
								});
								if(childBlockElements){
									return childElementsToList($selected.children(), $selected, selfTag);
								}else{
									return childElementsToList([angular.element('<div>' + selectedElement.innerHTML + '</div>')[0]], $selected, selfTag);
								}
							}
						}else if(tagName.match(BLOCKELEMENTS)){
							// if we get here then all the contents of the ta-bind are selected
							_nodes = taSelection.getOnlySelectedElements();
							if(_nodes.length === 1 && (_nodes[0].tagName.toLowerCase() === 'ol' || _nodes[0].tagName.toLowerCase() === 'ul')){
								if(_nodes[0].tagName.toLowerCase() === selfTag){
									// remove
									return listToDefault(angular.element(_nodes[0]), taDefaultWrap);
								}else{
									return listToList(angular.element(_nodes[0]), selfTag);
								}
							}else{
								html = '';
								var $nodes = [];
								for(i = 0; i < _nodes.length; i++){
									/* istanbul ignore else: catch for real-world can't make it occur in testing */
									if(_nodes[i].nodeType !== 3){
										var $n = angular.element(_nodes[i]);
										html += '<' + taBrowserTag('li') + '>' + $n[0].innerHTML + '</' + taBrowserTag('li') + '>';
										$nodes.unshift($n);
									}
								}
								$target = angular.element('<' + selfTag + '>' + html + '</' + selfTag + '>');
								$nodes.pop().replaceWith($target);
								angular.forEach($nodes, function($node){ $node.remove(); });
							}
							taSelection.setSelectionToElementEnd($target[0]);
							return;
						}
					}else if(command.toLowerCase() === 'formatblock'){
						optionsTagName = options.toLowerCase().replace(/[<>]/ig, '');
						if(tagName === 'li') $target = $selected.parent();
						else $target = $selected;
						// find the first blockElement
						while(!$target[0].tagName.match(BLOCKELEMENTS)){
							$target = $target.parent();
							tagName = $target[0].tagName.toLowerCase();
						}
						if(tagName === optionsTagName){
							// $target is wrap element
							_nodes = $target.children();
							var hasBlock = false;
							for(i = 0; i < _nodes.length; i++){
								hasBlock = hasBlock || _nodes[i].tagName.match(BLOCKELEMENTS);
							}
							if(hasBlock){
								$target.after(_nodes);
								next = $target.next();
								$target.remove();
								$target = next;
							}else{
								defaultWrapper.append($target[0].childNodes);
								$target.after(defaultWrapper);
								$target.remove();
								$target = defaultWrapper;
							}
						}else if($target.parent()[0].tagName.toLowerCase() === optionsTagName && !$target.parent().hasClass('ta-bind')){
							//unwrap logic for parent
							var blockElement = $target.parent();
							var contents = blockElement.contents();
							for(i = 0; i < contents.length; i ++){
								/* istanbul ignore next: can't test - some wierd thing with how phantomjs works */
								if(blockElement.parent().hasClass('ta-bind') && contents[i].nodeType === 3){
									defaultWrapper = angular.element('<' + taDefaultWrap + '>');
									defaultWrapper[0].innerHTML = contents[i].outerHTML;
									contents[i] = defaultWrapper[0];
								}
								blockElement.parent()[0].insertBefore(contents[i], blockElement[0]);
							}
							blockElement.remove();
						}else if(tagName.match(LISTELEMENTS)){
							// wrapping a list element
							$target.wrap(options);
						}else{
							// default wrap behaviour
							_nodes = taSelection.getOnlySelectedElements();
							if(_nodes.length === 0) _nodes = [$target[0]];
							// find the parent block element if any of the nodes are inline or text
							var inlineNodePresent = false;
							angular.forEach(_nodes, function(node){
								if(node.nodeType === 3 || !node.tagName.match(BLOCKELEMENTS)){
									inlineNodePresent = true;
								}
							});
							if(inlineNodePresent){
								while(_nodes[0].nodeType === 3 || !_nodes[0].tagName.match(BLOCKELEMENTS)){
									_nodes = [_nodes[0].parentNode];
								}
							}
							if(angular.element(_nodes[0]).hasClass('ta-bind')){
								$target = angular.element(options);
								$target[0].innerHTML = _nodes[0].innerHTML;
								_nodes[0].innerHTML = $target[0].outerHTML;
							}else if(optionsTagName === 'blockquote'){
								// blockquotes wrap other block elements
								html = '';
								for(i = 0; i < _nodes.length; i++){
									html += _nodes[i].outerHTML;
								}
								$target = angular.element(options);
								$target[0].innerHTML = html;
								_nodes[0].parentNode.insertBefore($target[0],_nodes[0]);
								angular.forEach(_nodes, function(node){
									node.parentNode.removeChild(node);
								});
							}
							else {
								// regular block elements replace other block elements
								for(i = 0; i < _nodes.length; i++){
									$target = angular.element(options);
									$target[0].innerHTML = _nodes[i].innerHTML;
									_nodes[i].parentNode.insertBefore($target[0],_nodes[i]);
									_nodes[i].parentNode.removeChild(_nodes[i]);
								}
							}
						}
						taSelection.setSelectionToElementEnd($target[0]);
						return;
					}else if(command.toLowerCase() === 'createlink'){
						var _selection = taSelection.getSelection();
						if(_selection.collapsed){
							// insert text at selection, then select then just let normal exec-command run
							taSelection.insertHtml('<a href="' + options + '">' + options + '</a>');
							return;
						}
					}
				}
				try{
					$document[0].execCommand(command, showUI, options);
				}catch(e){}
			};
		};
	}]).directive('taBind', ['taSanitize', '$timeout', '$window', '$document', 'taFixChrome', 'taBrowserTag', 'taSelection', 'taSelectableElements', 'taApplyCustomRenderers', 'taOptions',
					function(taSanitize, $timeout, $window, $document, taFixChrome, taBrowserTag, taSelection, taSelectableElements, taApplyCustomRenderers, taOptions){
		// Uses for this are textarea or input with ng-model and ta-bind='text'
		// OR any non-form element with contenteditable="contenteditable" ta-bind="html|text" ng-model
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel){
				// the option to use taBind on an input or textarea is required as it will sanitize all input into it correctly.
				var _isContentEditable = element.attr('contenteditable') !== undefined && element.attr('contenteditable');
				var _isInputFriendly = _isContentEditable || element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input';
				var _isReadonly = false;
				var _focussed = false;
				var _disableSanitizer = attrs.taUnsafeSanitizer || taOptions.disableSanitizer;
				var BLOCKED_KEYS = /^(9|19|20|27|33|34|35|36|37|38|39|40|45|46|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/;
				
				// defaults to the paragraph element, but we need the line-break or it doesn't allow you to type into the empty element
				// non IE is '<p><br/></p>', ie is '<p></p>' as for once IE gets it correct...
				var _defaultVal, _defaultTest, _trimTest;
				// set the default to be a paragraph value
				if(attrs.taDefaultWrap === undefined) attrs.taDefaultWrap = 'p';
				/* istanbul ignore next: ie specific test */
				if(attrs.taDefaultWrap === ''){
					_defaultVal = '';
					_defaultTest = (ie === undefined)? '<div><br></div>' : (ie >= 11)? '<p><br></p>' : (ie <= 8)? '<P>&nbsp;</P>' : '<p>&nbsp;</p>';
					_trimTest = (ie === undefined)? /^<div>(\s|&nbsp;)*<\/div>$/ig : /^<p>(\s|&nbsp;)*<\/p>$/ig;
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
					_trimTest = new RegExp('^<' + attrs.taDefaultWrap + '>(\\s|&nbsp;)*<\\/' + attrs.taDefaultWrap + '>$', 'ig');
				}
				
				element.addClass('ta-bind');

				// in here we are undoing the converts used elsewhere to prevent the < > and & being displayed when they shouldn't in the code.
				var _compileHtml = function(){
					if(_isContentEditable) return element[0].innerHTML;
					if(_isInputFriendly) return element.val();
					throw ('textAngular Error: attempting to update non-editable taBind');
				};
				
				var _setViewValue = function(val){
					if(!val) val = _compileHtml();
					if(val === _defaultTest || val.match(_trimTest)){
						// this avoids us from tripping the ng-pristine flag if we click in and out with out typing
						if(ngModel.$viewValue !== '') ngModel.$setViewValue('');
					}else{
						if(ngModel.$viewValue !== val) ngModel.$setViewValue(val);
					}
				};
				
				//used for updating when inserting wrapped elements
				scope['updateTaBind' + (attrs.id || '')] = function(){
					if(!_isReadonly) _setViewValue();
				};
				
				//this code is used to update the models when data is entered/deleted
				if(_isInputFriendly){
					element.on('paste', function(e, eventData){
						/* istanbul ignore else: this is for catching the jqLite testing*/
						if(eventData) angular.extend(e, eventData);
						var text;
						// for non-ie
						if(e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData)){
							text = (e.originalEvent || e).clipboardData.getData('text/html');
							/* istanbul ignore next: special catch case */
							if(!text) text = (e.originalEvent || e).clipboardData.getData('text/plain');
						// for ie
						}else if($window.clipboardData)
							text = $window.clipboardData.getData('Text');
						// if theres non text data and we aren't in read-only do default
						if(!text && !_isReadonly) return true;
						// prevent the default paste command
						e.preventDefault();
						if(!_isReadonly){
							text = taSanitize(text);
							if ($document[0].selection){
								var range = $document[0].selection.createRange();
								range.pasteHTML(text);
							}
							else{
								$document[0].execCommand('insertHtml', false, text);
							}
						}
					});
					element.on('paste cut', function(e){
						// timeout to next is needed as otherwise the paste/cut event has not finished actually changing the display
						if(!_isReadonly) $timeout(function(){
							ngModel.$setViewValue(_compileHtml());
						}, 0);
						else e.preventDefault();
					});
					if(!_isContentEditable){
						// if a textarea or input just add in change and blur handlers, everything else is done by angulars input directive
						element.on('change blur', function(){
							if(!_isReadonly) ngModel.$setViewValue(_compileHtml());
						});
					}else{
						// all the code specific to contenteditable divs
						element.on('keyup', function(event, eventData){
							/* istanbul ignore else: this is for catching the jqLite testing*/
							if(eventData) angular.extend(event, eventData);
							if(!_isReadonly && !BLOCKED_KEYS.test(event.keyCode)){
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
								_setViewValue(val);
							}
						});

						element.on('blur', function(){
							_focussed = false;
							/* istanbul ignore else: if readonly don't update model */
							if(!_isReadonly){
								_setViewValue();
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
						
						// prevent propagation on mousedown in editor, see #206
						element.on('mousedown', function(event, eventData){
							/* istanbul ignore else: this is for catching the jqLite testing*/
							if(eventData) angular.extend(event, eventData);
							event.stopPropagation(); 
						});
					}
				}
				
				// catch DOM XSS via taSanitize
				// Sanitizing both ways is identical
				var _sanitize = function(unsafe){
					return (ngModel.$oldViewValue = taSanitize(taFixChrome(unsafe), ngModel.$oldViewValue, _disableSanitizer));
				};
				
				// trigger the validation calls
				var _validity = function(value){
					if(attrs.required) ngModel.$setValidity('required', !(!value || value.trim() === _defaultTest || value.trim().match(_trimTest) || value.trim() === ''));
					return value;
				};
				// parsers trigger from the above keyup function or any other time that the viewValue is updated and parses it for storage in the ngModel
				ngModel.$parsers.push(_sanitize);
				ngModel.$parsers.push(_validity);
				// because textAngular is bi-directional (which is awesome) we need to also sanitize values going in from the server
				ngModel.$formatters.push(_sanitize);
				ngModel.$formatters.push(_validity);

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
				scope['reApplyOnSelectorHandlers' + (attrs.id || '')] = function(){
					/* istanbul ignore else */
					if(!_isReadonly) angular.forEach(taSelectableElements, function(selector){
							// check we don't apply the handler twice
							element.find(selector)
								.off('click', selectorClickHandler)
								.on('click', selectorClickHandler);
						});
				};
				
				var _setInnerHTML = function(newval){
					element[0].innerHTML = newval;
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
									_setInnerHTML(_defaultVal);
								}else{
									// not-blank
									element.removeClass('placeholder-text');
									_setInnerHTML(val);
								}
							}else{
								_setInnerHTML((val === '') ? _defaultVal : val);
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
							_setInnerHTML(taApplyCustomRenderers(val));
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
					_isReadonly = scope.$eval(attrs.taReadonly);
					if(_isReadonly){
						element.addClass('ta-readonly');
						// we changed to readOnly mode (taReadonly='true')
						if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input'){
							element.attr('disabled', 'disabled');
						}
						if(element.attr('contenteditable') !== undefined && element.attr('contenteditable')){
							element.removeAttr('contenteditable');
						}
					}else{
						element.removeClass('ta-readonly');
						// we changed to NOT readOnly mode (taReadonly='false')
						if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input'){
							element.removeAttr('disabled');
						}else if(_isContentEditable){
							element.attr('contenteditable', 'true');
						}
					}
					// taReadonly only has an effect if the taBind element is an input or textarea or has contenteditable='true' on it.
					// Otherwise it is readonly by default
					scope.$watch(attrs.taReadonly, function(newVal, oldVal){
						if(oldVal === newVal) return;
						if(newVal){
							element.addClass('ta-readonly');
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
							element.removeClass('ta-readonly');
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
	}).directive('taMinText', function(){
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attrs, ctrl){
				var min = parseInt(scope.$eval(attrs.taMinText));
				if (isNaN(min)){
					throw('Min text must be an integer');
				}
				attrs.$observe('taMinText', function(value){
					min = parseInt(value);
					if (isNaN(min)){
						throw('Min text must be an integer');
					}
					if (ctrl.$dirty){
						ctrl.$setViewValue(ctrl.$viewValue);
					}
				});
				function validator (viewValue){
					var source = angular.element('<div/>');
					source.html(viewValue);
					var length = source.text().length;
					if (!length || length >= min){
						ctrl.$setValidity('taMinText', true);
						return viewValue;
					}
					else{
						ctrl.$setValidity('taMinText', false);
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
		return function taSanitize(unsafe, oldsafe, ignore){
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
			var safe;
			unsafe = unsafeElement[0].innerHTML;
			try {
				safe = $sanitize(unsafe);
				// do this afterwards, then the $sanitizer should still throw for bad markup
				if(ignore) safe = unsafe;
			} catch (e){
				safe = oldsafe || '';
			}
			safe = safe.replace(/(&#9;)|(&#10;)/ig, ''); // remove odd unicode chars
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

						if (toolDefinition && toolDefinition.tooltiptext) {
							toolElement.attr('title', toolDefinition.tooltiptext);
						}

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
						queryFormatBlockState: function(){ return false; },
						queryCommandState: function(){ return false; }
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
							// Run the actions on the first visible filtered tool only
							if(workerTools.length > 0){
								for(var _i = 0; _i < workerTools.length; _i++){
									var tool = workerTools[_i].tool;
									var name = workerTools[_i].name;
									for(var _t = 0; _t < _toolbars.length; _t++){
										if(_toolbars[_t].tools[name] !== undefined){
											tool.onElementSelect.action.call(_toolbars[_t].tools[name], event, element, scope);
											result = true;
											break;
										}
									}
									if(result) break; 
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
	}]).service('taSelection', ['$window', '$document',
	/* istanbul ignore next: all browser specifics and PhantomJS dosen't seem to support half of it */
	function($window, $document){
		// need to dereference the document else the calls don't work correctly
		var _document = $document[0];
		var nextNode = function(node) {
			if (node.hasChildNodes()) {
				return node.firstChild;
			} else {
				while (node && !node.nextSibling) {
					node = node.parentNode;
				}
				if (!node) {
					return null;
				}
				return node.nextSibling;
			}
		};
		var getRangeSelectedNodes = function(range) {
			var node = range.startContainer;
			var endNode = range.endContainer;

			// Special case for a range that is contained within a single node
			if (node === endNode) {
				return [node];
			}
			// Iterate nodes until we hit the end container
			var rangeNodes = [];
			while (node && node !== endNode) {
				node = nextNode(node);
				if(node.parentNode === range.commonAncestorContainer) rangeNodes.push(node);
			}
			// Add partially selected nodes at the start of the range
			node = range.startContainer;
			while (node && node !== range.commonAncestorContainer) {
				if(node.parentNode === range.commonAncestorContainer) rangeNodes.unshift(node);
				node = node.parentNode;
			}
			return rangeNodes;
		};
		return {
			getSelection: function(){
				var range, sel, container;
				if (_document.selection && _document.selection.createRange) {
					// IE case
					range = _document.selection.createRange();
					container = range.parentElement();
					sel = {isCollapsed: range.text.length === 0};
				} else if ($window.getSelection) {
					sel = $window.getSelection();
					if (sel.getRangeAt) {
						if (sel.rangeCount > 0) {
							range = sel.getRangeAt(0);
						}
					} else {
						// Old WebKit selection object has no getRangeAt, so
						// create a range from other selection properties
						range = _document.createRange();
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
						container = container.nodeType === 3 ? container.parentNode : container;
					}
				}
				if (range) return {
					start: {
						element: range.startContainer,
						offset: range.startOffset
					},
					end: {
						element: range.endContainer,
						offset: range.endOffset
					},
					container: container,
					collapsed: sel.isCollapsed
					
				};
				else return {
					start: {
						offset: 0
					},
					end: {
						offset: 0
					},
					container: undefined,
					collapsed: true
				};
			},
			getOnlySelectedElements: function(){
				if (window.getSelection) {
					var sel = $window.getSelection();
					if (!sel.isCollapsed) {
						return getRangeSelectedNodes(sel.getRangeAt(0));
					}
				}
				return [];
			},
			// Some basic selection functions
			getSelectionElement: function () {
				return this.getSelection().container;
			},
			setSelection: function(el, start, end){
				if (_document.createRange && $window.getSelection) {
					var range = _document.createRange();
					range.selectNodeContents(el);
					range.setStart(el, start);
					range.setEnd(el, end);

					var sel = $window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				} else if (_document.selection && _document.body.createTextRange) {
					var textRange = _document.body.createTextRange();
					textRange.moveToElementText(el);
					textRange.moveEnd("character", start);
					textRange.moveStart("character", end);
					textRange.select();
				}
			},
			setSelectionToElementStart: function (el){
				if (_document.createRange && $window.getSelection) {
					var range = _document.createRange();
					range.selectNodeContents(el);
					range.setStart(el, 0);
					range.setEnd(el, 0);

					var sel = $window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				} else if (_document.selection && _document.body.createTextRange) {
					var textRange = _document.body.createTextRange();
					textRange.moveToElementText(el);
					textRange.collapse(true);
					textRange.moveEnd("character", 0);
					textRange.moveStart("character", 0);
					textRange.select();
				}
			},
			setSelectionToElementEnd: function (el){
				if (_document.createRange && $window.getSelection) {
					var range = _document.createRange();
					range.selectNodeContents(el);
					range.collapse(false);

					var sel = $window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				} else if (_document.selection && _document.body.createTextRange) {
					var textRange = _document.body.createTextRange();
					textRange.moveToElementText(el);
					textRange.collapse(false);
					textRange.select();
				}
			},
			// from http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
			insertHtml: function(html){
				var sel, range;
				if (window.getSelection) {
					// IE9 and non-IE
					sel = window.getSelection();
					if (sel.getRangeAt && sel.rangeCount) {
						range = sel.getRangeAt(0);
						range.deleteContents();
			
						// Range.createContextualFragment() would be useful here but is
						// only relatively recently standardized and is not supported in
						// some browsers (IE9, for one)
						var el = document.createElement("div");
						el.innerHTML = html;
						var frag = document.createDocumentFragment(), node, lastNode;
						while ( (node = el.firstChild) ) {
							lastNode = frag.appendChild(node);
						}
						range.insertNode(frag);
			
						// Preserve the selection
						if (lastNode) {
							range = range.cloneRange();
							range.setStartAfter(lastNode);
							range.collapse(true);
							sel.removeAllRanges();
							sel.addRange(range);
						}
					}
				} else if (document.selection && document.selection.type !== "Control") {
					// IE < 9
					document.selection.createRange().pasteHTML(html);
				}
			}
		};
	}]);
})();
