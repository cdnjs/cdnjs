angular.module('textAngular.taBind', ['textAngular.factories', 'textAngular.DOM'])
.service('_taBlankTest', [function(){
	var INLINETAGS_NONBLANK = /<(a|abbr|acronym|bdi|bdo|big|cite|code|del|dfn|img|ins|kbd|label|map|mark|q|ruby|rp|rt|s|samp|time|tt|var)[^>]*(>|$)/i;
	return function(_defaultTest){
		return function(_blankVal){
			if(!_blankVal) return true;
			// find first non-tag match - ie start of string or after tag that is not whitespace
			var _firstMatch = /(^[^<]|>)[^<]/i.exec(_blankVal);
			var _firstTagIndex;
			if(!_firstMatch){
				// find the end of the first tag removing all the
				// Don't do a global replace as that would be waaayy too long, just replace the first 4 occurences should be enough
				_blankVal = _blankVal.toString().replace(/="[^"]*"/i, '').replace(/="[^"]*"/i, '').replace(/="[^"]*"/i, '').replace(/="[^"]*"/i, '');
				_firstTagIndex = _blankVal.indexOf('>');
			}else{
				_firstTagIndex = _firstMatch.index;
			}
			_blankVal = _blankVal.trim().substring(_firstTagIndex, _firstTagIndex + 100);
			// check for no tags entry
			if(/^[^<>]+$/i.test(_blankVal)) return false;
			// this regex is to match any number of whitespace only between two tags
			if (_blankVal.length === 0 || _blankVal === _defaultTest || /^>(\s|&nbsp;)*<\/[^>]+>$/ig.test(_blankVal)) return true;
			// this regex tests if there is a tag followed by some optional whitespace and some text after that
			else if (/>\s*[^\s<]/i.test(_blankVal) || INLINETAGS_NONBLANK.test(_blankVal)) return false;
			else return true;
		};
	};
}])
.directive('taButton', [function(){
	return {
		link: function(scope, element, attrs){
			element.attr('unselectable', 'on');
			element.on('mousedown', function(e, eventData){
				/* istanbul ignore else: this is for catching the jqLite testing*/
				if(eventData) angular.extend(e, eventData);
				// this prevents focusout from firing on the editor when clicking toolbar buttons
				e.preventDefault();
				return false;
			});
		}
	};
}])
.directive('taBind', [
		'taSanitize', '$timeout', '$window', '$document', 'taFixChrome', 'taBrowserTag',
		'taSelection', 'taSelectableElements', 'taApplyCustomRenderers', 'taOptions',
		'_taBlankTest', '$parse', 'taDOM', 'textAngularManager',
		function(
			taSanitize, $timeout, $window, $document, taFixChrome, taBrowserTag,
			taSelection, taSelectableElements, taApplyCustomRenderers, taOptions,
			_taBlankTest, $parse, taDOM, textAngularManager){
	// Uses for this are textarea or input with ng-model and ta-bind='text'
	// OR any non-form element with contenteditable="contenteditable" ta-bind="html|text" ng-model
	return {
		priority: 2, // So we override validators correctly
		require: ['ngModel','?ngModelOptions'],
		link: function(scope, element, attrs, controller){
			var ngModel = controller[0];
			var ngModelOptions = controller[1] || {};
			// the option to use taBind on an input or textarea is required as it will sanitize all input into it correctly.
			var _isContentEditable = element.attr('contenteditable') !== undefined && element.attr('contenteditable');
			var _isInputFriendly = _isContentEditable || element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input';
			var _isReadonly = false;
			var _focussed = false;
			var _skipRender = false;
			var _disableSanitizer = attrs.taUnsafeSanitizer || taOptions.disableSanitizer;
			var _lastKey;
			// see http://www.javascripter.net/faq/keycodes.htm for good information
			// NOTE Mute On|Off 173 (Opera MSIE Safari Chrome) 181 (Firefox)
			// BLOCKED_KEYS are special keys...
			// Tab, pause/break, CapsLock, Esc, Page Up, End, Home,
			// Left arrow, Up arrow, Right arrow, Down arrow, Insert, Delete,
			// f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12
			// NumLock, ScrollLock
			var BLOCKED_KEYS = /^(9|19|20|27|33|34|35|36|37|38|39|40|45|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/i;
			// UNDO_TRIGGER_KEYS - spaces, enter, delete, backspace, all punctuation
			// Backspace, Enter, Space, Delete, (; :) (Firefox), (= +) (Firefox),
			// Numpad +, Numpad -, (; :), (= +),
			// (, <), (- _), (. >), (/ ?), (` ~), ([ {), (\ |), (] }), (' ")
			// NOTE - Firefox: 173 = (- _) -- adding this to UNDO_TRIGGER_KEYS
			var UNDO_TRIGGER_KEYS = /^(8|13|32|46|59|61|107|109|173|186|187|188|189|190|191|192|219|220|221|222)$/i;
			var _pasteHandler;

			// defaults to the paragraph element, but we need the line-break or it doesn't allow you to type into the empty element
			// non IE is '<p><br/></p>', ie is '<p></p>' as for once IE gets it correct...
			var _defaultVal, _defaultTest;

			var _CTRL_KEY = 0x0001;
			var _META_KEY = 0x0002;
			var _ALT_KEY = 0x0004;
			var _SHIFT_KEY = 0x0008;
			// map events to special keys...
			// mappings is an array of maps from events to specialKeys as declared in textAngularSetup
			var _keyMappings = [
				//		ctrl/command + z
				{
					specialKey: 'UndoKey',
					forbiddenModifiers: _ALT_KEY + _SHIFT_KEY,
					mustHaveModifiers: [_META_KEY + _CTRL_KEY],
					keyCode: 90
				},
				//		ctrl/command + shift + z
				{
					specialKey: 'RedoKey',
					forbiddenModifiers: _ALT_KEY,
					mustHaveModifiers: [_META_KEY + _CTRL_KEY, _SHIFT_KEY],
					keyCode: 90
				},
				//		ctrl/command + y
				{
					specialKey: 'RedoKey',
					forbiddenModifiers: _ALT_KEY + _SHIFT_KEY,
					mustHaveModifiers: [_META_KEY + _CTRL_KEY],
					keyCode: 89
				},
				//		TabKey
				{
					specialKey: 'TabKey',
					forbiddenModifiers: _META_KEY + _SHIFT_KEY + _ALT_KEY + _CTRL_KEY,
					mustHaveModifiers: [],
					keyCode: 9
				},
				//		shift + TabKey
				{
					specialKey: 'ShiftTabKey',
					forbiddenModifiers: _META_KEY + _ALT_KEY + _CTRL_KEY,
					mustHaveModifiers: [_SHIFT_KEY],
					keyCode: 9
				}
			];
			function _mapKeys(event) {
				var specialKey;
				_keyMappings.forEach(function (map){
					if (map.keyCode === event.keyCode) {
						var netModifiers = (event.metaKey ? _META_KEY: 0) +
							(event.ctrlKey ? _CTRL_KEY: 0) +
							(event.shiftKey ? _SHIFT_KEY: 0) +
							(event.altKey ? _ALT_KEY: 0);
						if (map.forbiddenModifiers & netModifiers) return;
						if (map.mustHaveModifiers.every(function (modifier) { return netModifiers & modifier; })){
							specialKey = map.specialKey;
						}
					}
				});
				return specialKey;
			}

			// set the default to be a paragraph value
			if(attrs.taDefaultWrap === undefined) attrs.taDefaultWrap = 'p';
			/* istanbul ignore next: ie specific test */
			if(attrs.taDefaultWrap === ''){
				_defaultVal = '';
				_defaultTest = (_browserDetect.ie === undefined)? '<div><br></div>' : (_browserDetect.ie >= 11)? '<p><br></p>' : (_browserDetect.ie <= 8)? '<P>&nbsp;</P>' : '<p>&nbsp;</p>';
			}else{
				_defaultVal = (_browserDetect.ie === undefined || _browserDetect.ie >= 11)?
					'<' + attrs.taDefaultWrap + '><br></' + attrs.taDefaultWrap + '>' :
					(_browserDetect.ie <= 8)?
						'<' + attrs.taDefaultWrap.toUpperCase() + '></' + attrs.taDefaultWrap.toUpperCase() + '>' :
						'<' + attrs.taDefaultWrap + '></' + attrs.taDefaultWrap + '>';
				_defaultTest = (_browserDetect.ie === undefined || _browserDetect.ie >= 11)?
					'<' + attrs.taDefaultWrap + '><br></' + attrs.taDefaultWrap + '>' :
					(_browserDetect.ie <= 8)?
						'<' + attrs.taDefaultWrap.toUpperCase() + '>&nbsp;</' + attrs.taDefaultWrap.toUpperCase() + '>' :
						'<' + attrs.taDefaultWrap + '>&nbsp;</' + attrs.taDefaultWrap + '>';
			}

			/* istanbul ignore else */
			if(!ngModelOptions.$options) ngModelOptions.$options = {}; // ng-model-options support

			var _blankTest = _taBlankTest(_defaultTest);

			var _ensureContentWrapped = function(value){
				if(_blankTest(value)) return value;
				var domTest = angular.element("<div>" + value + "</div>");
				if(domTest.children().length === 0){
					value = "<" + attrs.taDefaultWrap + ">" + value + "</" + attrs.taDefaultWrap + ">";
				}else{
					var _children = domTest[0].childNodes;
					var i;
					var _foundBlockElement = false;
					for(i = 0; i < _children.length; i++){
						if(_foundBlockElement = _children[i].nodeName.toLowerCase().match(BLOCKELEMENTS)) break;
					}
					if(!_foundBlockElement){
						value = "<" + attrs.taDefaultWrap + ">" + value + "</" + attrs.taDefaultWrap + ">";
					}else{
						value = "";
						for(i = 0; i < _children.length; i++){
							if(!_children[i].nodeName.toLowerCase().match(BLOCKELEMENTS)){
								var _subVal = (_children[i].outerHTML || _children[i].nodeValue);
								/* istanbul ignore else: Doesn't seem to trigger on tests, is tested though */
								if(_subVal.trim() !== '')
									value += "<" + attrs.taDefaultWrap + ">" + _subVal + "</" + attrs.taDefaultWrap + ">";
								else value += _subVal;
							}else{
								value += _children[i].outerHTML;
							}
						}
					}
				}
				return value;
			};

			if(attrs.taPaste) _pasteHandler = $parse(attrs.taPaste);

			element.addClass('ta-bind');

			var _undoKeyupTimeout;

			scope['$undoManager' + (attrs.id || '')] = ngModel.$undoManager = {
				_stack: [],
				_index: 0,
				_max: 1000,
				push: function(value){
					if((typeof value === "undefined" || value === null) ||
						((typeof this.current() !== "undefined" && this.current() !== null) && value === this.current())) return value;
					if(this._index < this._stack.length - 1){
						this._stack = this._stack.slice(0,this._index+1);
					}
					this._stack.push(value);
					if(_undoKeyupTimeout) $timeout.cancel(_undoKeyupTimeout);
					if(this._stack.length > this._max) this._stack.shift();
					this._index = this._stack.length - 1;
					return value;
				},
				undo: function(){
					return this.setToIndex(this._index-1);
				},
				redo: function(){
					return this.setToIndex(this._index+1);
				},
				setToIndex: function(index){
					if(index < 0 || index > this._stack.length - 1){
						return undefined;
					}
					this._index = index;
					return this.current();
				},
				current: function(){
					return this._stack[this._index];
				}
			};

			var _redoUndoTimeout;
			var _undo = scope['$undoTaBind' + (attrs.id || '')] = function(){
				/* istanbul ignore else: can't really test it due to all changes being ignored as well in readonly */
				if(!_isReadonly && _isContentEditable){
					var content = ngModel.$undoManager.undo();
					if(typeof content !== "undefined" && content !== null){
						_setInnerHTML(content);
						_setViewValue(content, false);
						if(_redoUndoTimeout) $timeout.cancel(_redoUndoTimeout);
						_redoUndoTimeout = $timeout(function(){
							element[0].focus();
							taSelection.setSelectionToElementEnd(element[0]);
						}, 1);
					}
				}
			};

			var _redo = scope['$redoTaBind' + (attrs.id || '')] = function(){
				/* istanbul ignore else: can't really test it due to all changes being ignored as well in readonly */
				if(!_isReadonly && _isContentEditable){
					var content = ngModel.$undoManager.redo();
					if(typeof content !== "undefined" && content !== null){
						_setInnerHTML(content);
						_setViewValue(content, false);
						/* istanbul ignore next */
						if(_redoUndoTimeout) $timeout.cancel(_redoUndoTimeout);
						_redoUndoTimeout = $timeout(function(){
							element[0].focus();
							taSelection.setSelectionToElementEnd(element[0]);
						}, 1);
					}
				}
			};

			// in here we are undoing the converts used elsewhere to prevent the < > and & being displayed when they shouldn't in the code.
			var _compileHtml = function(){
				if(_isContentEditable) return element[0].innerHTML;
				if(_isInputFriendly) return element.val();
				throw ('textAngular Error: attempting to update non-editable taBind');
			};

			var _setViewValue = function(_val, triggerUndo, skipRender){
				_skipRender = skipRender || false;
				if(typeof triggerUndo === "undefined" || triggerUndo === null) triggerUndo = true && _isContentEditable; // if not contentEditable then the native undo/redo is fine
				if(typeof _val === "undefined" || _val === null) _val = _compileHtml();
				if(_blankTest(_val)){
					// this avoids us from tripping the ng-pristine flag if we click in and out with out typing
					if(ngModel.$viewValue !== '') ngModel.$setViewValue('');
					if(triggerUndo && ngModel.$undoManager.current() !== '') ngModel.$undoManager.push('');
				}else{
					_reApplyOnSelectorHandlers();
					if(ngModel.$viewValue !== _val){
						ngModel.$setViewValue(_val);
						if(triggerUndo) ngModel.$undoManager.push(_val);
					}
				}
				ngModel.$render();
			};

			//used for updating when inserting wrapped elements
			scope['updateTaBind' + (attrs.id || '')] = function(){
				if(!_isReadonly) _setViewValue(undefined, undefined, true);
			};

			// catch DOM XSS via taSanitize
			// Sanitizing both ways is identical
			var _sanitize = function(unsafe){
				return (ngModel.$oldViewValue = taSanitize(taFixChrome(unsafe), ngModel.$oldViewValue, _disableSanitizer));
			};

			// trigger the validation calls
			if(element.attr('required')) ngModel.$validators.required = function(modelValue, viewValue) {
				return !_blankTest(modelValue || viewValue);
			};
			// parsers trigger from the above keyup function or any other time that the viewValue is updated and parses it for storage in the ngModel
			ngModel.$parsers.push(_sanitize);
			ngModel.$parsers.unshift(_ensureContentWrapped);
			// because textAngular is bi-directional (which is awesome) we need to also sanitize values going in from the server
			ngModel.$formatters.push(_sanitize);
			ngModel.$formatters.unshift(_ensureContentWrapped);
			ngModel.$formatters.unshift(function(value){
				return ngModel.$undoManager.push(value || '');
			});

			//this code is used to update the models when data is entered/deleted
			if(_isInputFriendly){
				scope.events = {};
				if(!_isContentEditable){
					// if a textarea or input just add in change and blur handlers, everything else is done by angulars input directive
					element.on('change blur', scope.events.change = scope.events.blur = function(){
						if(!_isReadonly) ngModel.$setViewValue(_compileHtml());
					});

					element.on('keydown', scope.events.keydown = function(event, eventData){
						/* istanbul ignore else: this is for catching the jqLite testing*/
						if(eventData) angular.extend(event, eventData);
						// Reference to http://stackoverflow.com/questions/6140632/how-to-handle-tab-in-textarea
						/* istanbul ignore else: otherwise normal functionality */
						if(event.keyCode === 9){ // tab was pressed
							// get caret position/selection
							var start = this.selectionStart;
							var end = this.selectionEnd;

							var value = element.val();
							if(event.shiftKey){
								// find \t
								var _linebreak = value.lastIndexOf('\n', start), _tab = value.lastIndexOf('\t', start);
								if(_tab !== -1 && _tab >= _linebreak){
									// set textarea value to: text before caret + tab + text after caret
									element.val(value.substring(0, _tab) + value.substring(_tab + 1));

									// put caret at right position again (add one for the tab)
									this.selectionStart = this.selectionEnd = start - 1;
								}
							}else{
								// set textarea value to: text before caret + tab + text after caret
								element.val(value.substring(0, start) + "\t" + value.substring(end));

								// put caret at right position again (add one for the tab)
								this.selectionStart = this.selectionEnd = start + 1;
							}
							// prevent the focus lose
							event.preventDefault();
						}
					});

					var _repeat = function(string, n){
						var result = '';
						for(var _n = 0; _n < n; _n++) result += string;
						return result;
					};

					var recursiveListFormat = function(listNode, tablevel){
						var _html = '', _children = listNode.childNodes;
						tablevel++;
						_html += _repeat('\t', tablevel-1) + listNode.outerHTML.substring(0, listNode.outerHTML.indexOf('<li'));
						for(var _i = 0; _i < _children.length; _i++){
							/* istanbul ignore next: browser catch */
							if(!_children[_i].outerHTML) continue;
							if(_children[_i].nodeName.toLowerCase() === 'ul' || _children[_i].nodeName.toLowerCase() === 'ol')
								_html += '\n' + recursiveListFormat(_children[_i], tablevel);
							else
								_html += '\n' + _repeat('\t', tablevel) + _children[_i].outerHTML;
						}
						_html += '\n' + _repeat('\t', tablevel-1) + listNode.outerHTML.substring(listNode.outerHTML.lastIndexOf('<'));
						return _html;
					};
					ngModel.$formatters.unshift(function(htmlValue){
						// tabulate the HTML so it looks nicer
						var _children = angular.element('<div>' + htmlValue + '</div>')[0].childNodes;
						if(_children.length > 0){
							htmlValue = '';
							for(var i = 0; i < _children.length; i++){
								/* istanbul ignore next: browser catch */
								if(!_children[i].outerHTML) continue;
								if(htmlValue.length > 0) htmlValue += '\n';
								if(_children[i].nodeName.toLowerCase() === 'ul' || _children[i].nodeName.toLowerCase() === 'ol')
									htmlValue += '' + recursiveListFormat(_children[i], 0);
								else htmlValue += '' + _children[i].outerHTML;
							}
						}

						return htmlValue;
					});
				}else{
					// all the code specific to contenteditable divs
					var _processingPaste = false;
					/* istanbul ignore next: phantom js cannot test this for some reason */
					var processpaste = function(text) {
						/* istanbul ignore else: don't care if nothing pasted */
						if(text && text.trim().length){
							// test paste from word/microsoft product
							if(text.match(/class=["']*Mso(Normal|List)/i)){
								var textFragment = text.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);
								if(!textFragment) textFragment = text;
								else textFragment = textFragment[1];
								textFragment = textFragment.replace(/<o:p>[\s\S]*?<\/o:p>/ig, '').replace(/class=(["']|)MsoNormal(["']|)/ig, '');
								var dom = angular.element("<div>" + textFragment + "</div>");
								var targetDom = angular.element("<div></div>");
								var _list = {
									element: null,
									lastIndent: [],
									lastLi: null,
									isUl: false
								};
								_list.lastIndent.peek = function(){
									var n = this.length;
									if (n>0) return this[n-1];
								};
								var _resetList = function(isUl){
									_list.isUl = isUl;
									_list.element = angular.element(isUl ? "<ul>" : "<ol>");
									_list.lastIndent = [];
									_list.lastIndent.peek = function(){
										var n = this.length;
										if (n>0) return this[n-1];
									};
									_list.lastLevelMatch = null;
								};
								for(var i = 0; i <= dom[0].childNodes.length; i++){
									if(!dom[0].childNodes[i] || dom[0].childNodes[i].nodeName === "#text" || dom[0].childNodes[i].tagName.toLowerCase() !== "p") continue;
									var el = angular.element(dom[0].childNodes[i]);
									var _listMatch = (el.attr('class') || '').match(/MsoList(Bullet|Number|Paragraph)(CxSp(First|Middle|Last)|)/i);

									if(_listMatch){
										if(el[0].childNodes.length < 2 || el[0].childNodes[1].childNodes.length < 1){
											continue;
										}
										var isUl = _listMatch[1].toLowerCase() === "bullet" || (_listMatch[1].toLowerCase() !== "number" && !(/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(el[0].childNodes[1].innerHTML) || /^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(el[0].childNodes[1].childNodes[0].innerHTML)));
										var _indentMatch = (el.attr('style') || '').match(/margin-left:([\-\.0-9]*)/i);
										var indent = parseFloat((_indentMatch)?_indentMatch[1]:0);
										var _levelMatch = (el.attr('style') || '').match(/mso-list:l([0-9]+) level([0-9]+) lfo[0-9+]($|;)/i);
										// prefers the mso-list syntax

										if(_levelMatch && _levelMatch[2]) indent = parseInt(_levelMatch[2]);

										if ((_levelMatch && (!_list.lastLevelMatch || _levelMatch[1] !== _list.lastLevelMatch[1])) || !_listMatch[3] || _listMatch[3].toLowerCase() === "first" || (_list.lastIndent.peek() === null) || (_list.isUl !== isUl && _list.lastIndent.peek() === indent)) {
											_resetList(isUl);
											targetDom.append(_list.element);
										} else if (_list.lastIndent.peek() != null && _list.lastIndent.peek() < indent){
											_list.element = angular.element(isUl ? "<ul>" : "<ol>");
											_list.lastLi.append(_list.element);
										} else if (_list.lastIndent.peek() != null && _list.lastIndent.peek() > indent){
											while(_list.lastIndent.peek() != null && _list.lastIndent.peek() > indent){
												if(_list.element.parent()[0].tagName.toLowerCase() === 'li'){
													_list.element = _list.element.parent();
													continue;
												}else if(/[uo]l/i.test(_list.element.parent()[0].tagName.toLowerCase())){
													_list.element = _list.element.parent();
												}else{ // else it's it should be a sibling
													break;
												}
												_list.lastIndent.pop();
											}
											_list.isUl = _list.element[0].tagName.toLowerCase() === "ul";
											if (isUl !== _list.isUl) {
												_resetList(isUl);
												targetDom.append(_list.element);
											}
										}

										_list.lastLevelMatch = _levelMatch;
										if(indent !== _list.lastIndent.peek()) _list.lastIndent.push(indent);
										_list.lastLi = angular.element("<li>");
										_list.element.append(_list.lastLi);
										_list.lastLi.html(el.html().replace(/<!(--|)\[if !supportLists\](--|)>[\s\S]*?<!(--|)\[endif\](--|)>/ig, ''));
										el.remove();
									}else{
										_resetList(false);
										targetDom.append(el);
									}
								}
								var _unwrapElement = function(node){
									node = angular.element(node);
									for(var _n = node[0].childNodes.length - 1; _n >= 0; _n--) node.after(node[0].childNodes[_n]);
									node.remove();
								};

								angular.forEach(targetDom.find('span'), function(node){
									node.removeAttribute('lang');
									if(node.attributes.length <= 0) _unwrapElement(node);
								});
								angular.forEach(targetDom.find('font'), _unwrapElement);
								text = targetDom.html();
							}else{
								// remove unnecessary chrome insert
								text = text.replace(/<(|\/)meta[^>]*?>/ig, '');
								if(text.match(/<[^>]*?(ta-bind)[^>]*?>/)){
									// entire text-angular or ta-bind has been pasted, REMOVE AT ONCE!!
									if(text.match(/<[^>]*?(text-angular)[^>]*?>/)){
										var _el = angular.element("<div>" + text + "</div>");
										_el.find('textarea').remove();
										var binds = taDOM.getByAttribute(_el, 'ta-bind');
										for(var _b = 0; _b < binds.length; _b++){
											var _target = binds[_b][0].parentNode.parentNode;
											for(var _c = 0; _c < binds[_b][0].childNodes.length; _c++){
												_target.parentNode.insertBefore(binds[_b][0].childNodes[_c], _target);
											}
											_target.parentNode.removeChild(_target);
										}
										text = _el.html().replace('<br class="Apple-interchange-newline">', '');
									}
								}else if(text.match(/^<span/)){
									// in case of pasting only a span - chrome paste, remove them. THis is just some wierd formatting
									text = text.replace(/<(|\/)span[^>]*?>/ig, '');
								}
								// Webkit on Apple tags
								text = text.replace(/<br class="Apple-interchange-newline"[^>]*?>/ig, '').replace(/<span class="Apple-converted-space">( |&nbsp;)<\/span>/ig, '&nbsp;');
							}

							if (/<li(\s.*)?>/i.test(text) && /(<ul(\s.*)?>|<ol(\s.*)?>).*<li(\s.*)?>/i.test(text) === false) {
								// insert missing parent of li element
								text = text.replace(/<li(\s.*)?>.*<\/li(\s.*)?>/i, '<ul>$&</ul>');
							}

							if(_pasteHandler) text = _pasteHandler(scope, {$html: text}) || text;

							text = taSanitize(text, '', _disableSanitizer);

							taSelection.insertHtml(text, element[0]);
							$timeout(function(){
								ngModel.$setViewValue(_compileHtml());
								_processingPaste = false;
								element.removeClass('processing-paste');
							}, 0);
						}else{
							_processingPaste = false;
							element.removeClass('processing-paste');
						}
					};

					element.on('paste', scope.events.paste = function(e, eventData){
						/* istanbul ignore else: this is for catching the jqLite testing*/
						if(eventData) angular.extend(e, eventData);
						if(_isReadonly || _processingPaste){
							e.stopPropagation();
							e.preventDefault();
							return false;
						}

						// Code adapted from http://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser/6804718#6804718
						_processingPaste = true;
						element.addClass('processing-paste');
						var pastedContent;
						var clipboardData = (e.originalEvent || e).clipboardData;
						if (clipboardData && clipboardData.getData && clipboardData.types.length > 0) {// Webkit - get data from clipboard, put into editdiv, cleanup, then cancel event
							var _types = "";
							for(var _t = 0; _t < clipboardData.types.length; _t++){
								_types += " " + clipboardData.types[_t];
							}
							/* istanbul ignore next: browser tests */
							if (/text\/html/i.test(_types)) {
								pastedContent = clipboardData.getData('text/html');
							} else if (/text\/plain/i.test(_types)) {
								pastedContent = clipboardData.getData('text/plain');
							}

							processpaste(pastedContent);
							e.stopPropagation();
							e.preventDefault();
							return false;
						} else {// Everything else - empty editdiv and allow browser to paste content into it, then cleanup
							var _savedSelection = $window.rangy.saveSelection(),
								_tempDiv = angular.element('<div class="ta-hidden-input" contenteditable="true"></div>');
							$document.find('body').append(_tempDiv);
							_tempDiv[0].focus();
							$timeout(function(){
								// restore selection
								$window.rangy.restoreSelection(_savedSelection);
								processpaste(_tempDiv[0].innerHTML);
								element[0].focus();
								_tempDiv.remove();
							}, 0);
						}
					});
					element.on('cut', scope.events.cut = function(e){
						// timeout to next is needed as otherwise the paste/cut event has not finished actually changing the display
						if(!_isReadonly) $timeout(function(){
							ngModel.$setViewValue(_compileHtml());
						}, 0);
						else e.preventDefault();
					});

					element.on('keydown', scope.events.keydown = function(event, eventData){
						/* istanbul ignore else: this is for catching the jqLite testing*/
						if(eventData) angular.extend(event, eventData);
						event.specialKey = _mapKeys(event);
						var userSpecialKey;
						/* istanbul ignore next: difficult to test */
						taOptions.keyMappings.forEach(function (mapping) {
							if (event.specialKey === mapping.commandKeyCode) {
								// taOptions has remapped this binding... so
								// we disable our own
								event.specialKey = undefined;
							}
							if (mapping.testForKey(event)) {
								userSpecialKey = mapping.commandKeyCode;
							}
							if ((mapping.commandKeyCode === 'UndoKey') || (mapping.commandKeyCode === 'RedoKey')) {
								// this is necessary to fully stop the propagation.
								if (!mapping.enablePropagation) {
									event.preventDefault();
								}
							}
						});
						/* istanbul ignore next: difficult to test */
						if (typeof userSpecialKey !== 'undefined') {
							event.specialKey = userSpecialKey;
						}
						/* istanbul ignore next: difficult to test as can't seem to select */
						if ((typeof event.specialKey !== 'undefined') && (
								event.specialKey !== 'UndoKey' || event.specialKey !== 'RedoKey'
							)) {
							event.preventDefault();
							textAngularManager.sendKeyCommand(scope, event);
						}
						/* istanbul ignore else: readonly check */
						if(!_isReadonly){
							if (event.specialKey==='UndoKey') {
								_undo();
								event.preventDefault();
							}
							if (event.specialKey==='RedoKey') {
								_redo();
								event.preventDefault();
							}
							/* istanbul ignore next: difficult to test as can't seem to select */
							if(event.keyCode === 13 && !event.shiftKey){
								var $selection;
								var selection = taSelection.getSelectionElement();
								if(!selection.tagName.match(VALIDELEMENTS)) return;
								var _new = angular.element(_defaultVal);
								if (/^<br(|\/)>$/i.test(selection.innerHTML.trim()) && selection.parentNode.tagName.toLowerCase() === 'blockquote' && !selection.nextSibling) {
									// if last element in blockquote and element is blank, pull element outside of blockquote.
									$selection = angular.element(selection);
									var _parent = $selection.parent();
									_parent.after(_new);
									$selection.remove();
									if(_parent.children().length === 0) _parent.remove();
									taSelection.setSelectionToElementStart(_new[0]);
									event.preventDefault();
								}else if (/^<[^>]+><br(|\/)><\/[^>]+>$/i.test(selection.innerHTML.trim()) && selection.tagName.toLowerCase() === 'blockquote'){
									$selection = angular.element(selection);
									$selection.after(_new);
									$selection.remove();
									taSelection.setSelectionToElementStart(_new[0]);
									event.preventDefault();
								}
							}
						}
					});
					var _keyupTimeout;
					element.on('keyup', scope.events.keyup = function(event, eventData){
						/* istanbul ignore else: this is for catching the jqLite testing*/
						if(eventData) angular.extend(event, eventData);
						/* istanbul ignore next: FF specific bug fix */
						if (event.keyCode === 9) {
							var _selection = taSelection.getSelection();
							if(_selection.start.element === element[0] && element.children().length) taSelection.setSelectionToElementStart(element.children()[0]);
							return;
						}
						if(_undoKeyupTimeout) $timeout.cancel(_undoKeyupTimeout);
						if(!_isReadonly && !BLOCKED_KEYS.test(event.keyCode)){
							// if enter - insert new taDefaultWrap, if shift+enter insert <br/>
							if(_defaultVal !== '' && event.keyCode === 13){
								if(!event.shiftKey){
									// new paragraph, br should be caught correctly
									var selection = taSelection.getSelectionElement();
									while(!selection.tagName.match(VALIDELEMENTS) && selection !== element[0]){
										selection = selection.parentNode;
									}

									if(selection.tagName.toLowerCase() !== attrs.taDefaultWrap && selection.tagName.toLowerCase() !== 'li' && (selection.innerHTML.trim() === '' || selection.innerHTML.trim() === '<br>')){
										var _new = angular.element(_defaultVal);
										angular.element(selection).replaceWith(_new);
										taSelection.setSelectionToElementStart(_new[0]);
									}
								}
							}
							var val = _compileHtml();
							if(_defaultVal !== '' && val.trim() === ''){
								_setInnerHTML(_defaultVal);
								taSelection.setSelectionToElementStart(element.children()[0]);
							}else if(val.substring(0, 1) !== '<' && attrs.taDefaultWrap !== ''){
								var _savedSelection = $window.rangy.saveSelection();
								val = _compileHtml();
								val = "<" + attrs.taDefaultWrap + ">" + val + "</" + attrs.taDefaultWrap + ">";
								_setInnerHTML(val);
								$window.rangy.restoreSelection(_savedSelection);
							}
							var triggerUndo = _lastKey !== event.keyCode && UNDO_TRIGGER_KEYS.test(event.keyCode);
							if(_keyupTimeout) $timeout.cancel(_keyupTimeout);
							_keyupTimeout = $timeout(function() {
								_setViewValue(val, triggerUndo, true);
							}, ngModelOptions.$options.debounce || 400);
							if(!triggerUndo) _undoKeyupTimeout = $timeout(function(){ ngModel.$undoManager.push(val); }, 250);
							_lastKey = event.keyCode;
						}
					});

					element.on('blur', scope.events.blur = function(){
						_focussed = false;
						/* istanbul ignore else: if readonly don't update model */
						if(!_isReadonly){
							_setViewValue(undefined, undefined, true);
						}else{
							_skipRender = true; // don't redo the whole thing, just check the placeholder logic
							ngModel.$render();
						}
					});

					// Placeholders not supported on ie 8 and below
					if(attrs.placeholder && (_browserDetect.ie > 8 || _browserDetect.ie === undefined)){
						var rule;
						if(attrs.id) rule = addCSSRule('#' + attrs.id + '.placeholder-text:before', 'content: "' + attrs.placeholder + '"');
						else throw('textAngular Error: An unique ID is required for placeholders to work');

						scope.$on('$destroy', function(){
							removeCSSRule(rule);
						});
					}

					element.on('focus', scope.events.focus = function(){
						_focussed = true;
						element.removeClass('placeholder-text');
						_reApplyOnSelectorHandlers();
					});

					element.on('mouseup', scope.events.mouseup = function(){
						var _selection = taSelection.getSelection();
						if(_selection.start.element === element[0] && element.children().length) taSelection.setSelectionToElementStart(element.children()[0]);
					});

					// prevent propagation on mousedown in editor, see #206
					element.on('mousedown', scope.events.mousedown = function(event, eventData){
						/* istanbul ignore else: this is for catching the jqLite testing*/
						if(eventData) angular.extend(event, eventData);
						event.stopPropagation();
					});
				}
			}

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
					$timeout(function(){
						dropFired = false;
						_setViewValue(undefined, undefined, true);
					}, 100);
				}
			};

			//used for updating when inserting wrapped elements
			var _reApplyOnSelectorHandlers = scope['reApplyOnSelectorHandlers' + (attrs.id || '')] = function(){
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
			var _renderTimeout;
			var _renderInProgress = false;
			// changes to the model variable from outside the html/text inputs
			ngModel.$render = function(){
				/* istanbul ignore if: Catches rogue renders, hard to replicate in tests */
				if(_renderInProgress) return;
				else _renderInProgress = true;
				// catch model being null or undefined
				var val = ngModel.$viewValue || '';
				// if the editor isn't focused it needs to be updated, otherwise it's receiving user input
				if(!_skipRender){
					/* istanbul ignore else: in other cases we don't care */
					if(_isContentEditable && _focussed){
						// update while focussed
						element.removeClass('placeholder-text');
						if(_renderTimeout) $timeout.cancel(_renderTimeout);
						_renderTimeout = $timeout(function(){
							/* istanbul ignore if: Can't be bothered testing this... */
							if(!_focussed){
								element[0].focus();
								taSelection.setSelectionToElementEnd(element.children()[element.children().length - 1]);
							}
							_renderTimeout = undefined;
						}, 1);
					}
					if(_isContentEditable){
						// WYSIWYG Mode
						if(attrs.placeholder){
							if(val === ''){
								// blank
								_setInnerHTML(_defaultVal);
							}else{
								// not-blank
								_setInnerHTML(val);
							}
						}else{
							_setInnerHTML((val === '') ? _defaultVal : val);
						}
						// if in WYSIWYG and readOnly we kill the use of links by clicking
						if(!_isReadonly){
							_reApplyOnSelectorHandlers();
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
				}
				if(_isContentEditable && attrs.placeholder){
					if(val === ''){
						if(_focussed) element.removeClass('placeholder-text');
						else element.addClass('placeholder-text');
					}else{
						element.removeClass('placeholder-text');
					}
				}
				_renderInProgress = _skipRender = false;
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
					if(_browserDetect.webkit) { // detect webkit
						globalContentEditableBlur = true;
					}
				});
			}
		}
	};
}]);
