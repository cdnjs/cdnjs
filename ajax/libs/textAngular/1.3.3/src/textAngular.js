/*
@license textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.3.3

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/

(function(){ // encapsulate all variables so they don't become global vars
"Use Strict";					
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
var _browserDetect = {
	ie: (function(){
		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');
		
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);
		
		return v > 4 ? v : undef;
	}()),
	webkit: /AppleWebKit\/([\d.]+)/i.test(navigator.userAgent)
};

// fix a webkit bug, see: https://gist.github.com/shimondoodkin/1081133
// this is set true when a blur occurs as the blur of the ta-bind triggers before the click
var globalContentEditableBlur = false;
/* istanbul ignore next: Browser Un-Focus fix for webkit */
if(_browserDetect.webkit) {
	document.addEventListener("mousedown", function(_event){
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
				if (curelement.select) {
					curelement.select(); // use select to place cursor for input elements.
				}
			}
		}	
		globalContentEditableBlur = false;
	}, false); // add global click handler
	angular.element(document).ready(function () {
		angular.element(document.body).append(angular.element('<input id="textAngular-editableFix-010203040506070809" style="width:1px;height:1px;border:none;margin:0;padding:0;position:absolute; top: -10000px; left: -10000px;" unselectable="on" tabIndex="-1">'));
	});
}

// Gloabl to textAngular REGEXP vars for block and list elements.

var BLOCKELEMENTS = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/ig;
var LISTELEMENTS = /^(ul|li|ol)$/ig;
var VALIDELEMENTS = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video|li)$/ig;

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
if(_browserDetect.ie > 8 || _browserDetect.ie === undefined){
	var _sheets = document.styleSheets;
	/* istanbul ignore next: preference for stylesheet loaded externally */
	for(var i = 0; i < _sheets.length; i++){
		if(_sheets[i].media.length === 0 || _sheets[i].media.mediaText.match(/(all|screen)/ig)){
			if(_sheets[i].href){
				if(_sheets[i].href.match(/textangular\.(min\.|)css/ig)){
					sheet = _sheets[i];
					break;
				}
			}
		}
	}
	/* istanbul ignore next: preference for stylesheet loaded externally */
	if(!sheet){
		// this sheet is used for the placeholders later on.
		sheet = (function() {
			// Create the <style> tag
			var style = document.createElement("style");
			/* istanbul ignore else : WebKit hack :( */
			if(_browserDetect.webkit) style.appendChild(document.createTextNode(""));

			// Add the <style> element to the page, add as first so the styles can be overridden by custom stylesheets
			document.head.appendChild(style);

			return style.sheet;
		})();
	}

	// use as: addCSSRule("header", "float: left");
	addCSSRule = function(selector, rules) {
		return _addCSSRule(sheet, selector, rules);
	};
	_addCSSRule = function(_sheet, selector, rules){
		var insertIndex;
		
		// This order is important as IE 11 has both cssRules and rules but they have different lengths - cssRules is correct, rules gives an error in IE 11
		/* istanbul ignore else: firefox catch */
		if(_sheet.cssRules) insertIndex = Math.max(_sheet.cssRules.length - 1, 0);
		else if(_sheet.rules) insertIndex = Math.max(_sheet.rules.length - 1, 0);
		
		/* istanbul ignore else: untestable IE option */
		if(_sheet.insertRule) {
			_sheet.insertRule(selector + "{" + rules + "}", insertIndex);
		}
		else {
			_sheet.addRule(selector, rules, insertIndex);
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
angular.module('textAngular.factories', [])
.factory('taBrowserTag', [function(){
	return function(tag){
		/* istanbul ignore next: ie specific test */
		if(!tag) return (_browserDetect.ie <= 8)? 'P' : 'p';
		else if(tag === '') return (_browserDetect.ie === undefined)? 'div' : (_browserDetect.ie <= 8)? 'P' : 'p';
		else return (_browserDetect.ie <= 8)? tag.toUpperCase() : tag;
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
}]).factory('taFixChrome', function(){
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

	var convert_infos = [
		{
			property: 'font-weight',
			values: [ 'bold' ],
			tag: 'b'
		},
		{
			property: 'font-style',
			values: [ 'italic' ],
			tag: 'i'
		}
	];

	function fixChildren( jq_elm ) {
		var children = jq_elm.children();
		if ( !children.length ) {
			return;
		}
		angular.forEach( children, function( child ) {
			var jq_child = angular.element(child);
			fixElement( jq_child );
			fixChildren( jq_child );
		});
	}

	function fixElement( jq_elm ) {
		var styleString = jq_elm.attr('style');
		if ( !styleString ) {
			return;
		}
		angular.forEach( convert_infos, function( convert_info ) {
			var css_key = convert_info.property;
			var css_value = jq_elm.css(css_key);
			if ( convert_info.values.indexOf(css_value) >= 0 && styleString.toLowerCase().indexOf(css_key) >= 0 ) {
				jq_elm.css( css_key, '' );
				var inner_html = jq_elm.html();
				var tag = convert_info.tag;
				inner_html = '<'+tag+'>' + inner_html + '</'+tag+'>';
				jq_elm.html( inner_html );
			}
		});
	}

	return function taSanitize(unsafe, oldsafe, ignore){

		if ( !ignore ) {
			try {
				var jq_container = angular.element('<div>' + unsafe + '</div>');
				fixElement( jq_container );
				fixChildren( jq_container );
				unsafe = jq_container.html();
			} catch (e) {
			}
		}

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
		
		// Do processing for <pre> tags, removing tabs and return carriages outside of them
		
		var _preTags = safe.match(/(<pre[^>]*>.*?<\/pre[^>]*>)/ig);
		processedSafe = safe.replace(/(&#(9|10);)*/ig, '');
		var re = /<pre[^>]*>.*?<\/pre[^>]*>/ig;
		var index = 0;
		var lastIndex = 0;
		var origTag;
		safe = '';
		while((origTag = re.exec(processedSafe)) !== null && index < _preTags.length){
			safe += processedSafe.substring(lastIndex, origTag.index) + _preTags[index];
			lastIndex = origTag.index + origTag[0].length;
			index++;
		}
		return safe + processedSafe.substring(lastIndex);
	};
}]).factory('taToolExecuteAction', ['$q', '$log', function($q, $log){
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
		}catch(exc){
			$log.error(exc);
		}
		if(result || result === undefined){
			// if true or undefined is returned then the action has finished. Otherwise the deferred action will be resolved manually.
			deferred.resolve();
		}
	};
}]);
angular.module('textAngular.DOM', ['textAngular.factories'])
.factory('taExecCommand', ['taSelection', 'taBrowserTag', '$document', function(taSelection, taBrowserTag, $document){
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
	var selectLi = function(liElement){
		if(/(<br(|\/)>)$/i.test(liElement.innerHTML.trim())) taSelection.setSelectionBeforeElement(angular.element(liElement).find("br")[0]);
		else taSelection.setSelectionToElementEnd(liElement);
	};
	var listToList = function(listElement, newListTag){
		var $target = angular.element('<' + newListTag + '>' + listElement[0].innerHTML + '</' + newListTag + '>');
		listElement.after($target);
		listElement.remove();
		selectLi($target.find('li')[0]);
	};
	var childElementsToList = function(elements, listElement, newListTag){
		var html = '';
		for(var i = 0; i < elements.length; i++){
			html += '<' + taBrowserTag('li') + '>' + elements[i].innerHTML + '</' + taBrowserTag('li') + '>';
		}
		var $target = angular.element('<' + newListTag + '>' + html + '</' + newListTag + '>');
		listElement.after($target);
		listElement.remove();
		selectLi($target.find('li')[0]);
	};
	return function(taDefaultWrap, topNode){
		taDefaultWrap = taBrowserTag(taDefaultWrap);
		return function(command, showUI, options){
			var i, $target, html, _nodes, next, optionsTagName, selectedElement;
			var defaultWrapper = angular.element('<' + taDefaultWrap + '>');
			try{
				selectedElement = taSelection.getSelectionElement();
			}catch(e){}
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
						if(_nodes.length === 0){
							// here is if there is only text in ta-bind ie <div ta-bind>test content</div>
							$target = angular.element('<' + selfTag + '><li>' + selectedElement.innerHTML + '</li></' + selfTag + '>');
							$selected.html('');
							$selected.append($target);
						}else if(_nodes.length === 1 && (_nodes[0].tagName.toLowerCase() === 'ol' || _nodes[0].tagName.toLowerCase() === 'ul')){
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
									/* istanbul ignore if: browser check only, phantomjs doesn't return children nodes but chrome at least does */
									if(_nodes[i].tagName.toLowerCase() === 'li') continue;
									else if(_nodes[i].tagName.toLowerCase() === 'ol' || _nodes[i].tagName.toLowerCase() === 'ul'){
										html += $n[0].innerHTML; // if it's a list, add all it's children
									}else if(_nodes[i].tagName.toLowerCase() === 'span' && (_nodes[i].childNodes[0].tagName.toLowerCase() === 'ol' || _nodes[i].childNodes[0].tagName.toLowerCase() === 'ul')){
										html += $n[0].childNodes[0].innerHTML; // if it's a list, add all it's children
									}else{
										html += '<' + taBrowserTag('li') + '>' + $n[0].innerHTML + '</' + taBrowserTag('li') + '>';
									}
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
					if(optionsTagName.trim() === 'default') {
						optionsTagName = taDefaultWrap;
						options = '<' + taDefaultWrap + '>';
					}
					if(tagName === 'li') $target = $selected.parent();
					else $target = $selected;
					// find the first blockElement
					while(!$target[0].tagName || !$target[0].tagName.match(BLOCKELEMENTS) && !$target.parent().attr('contenteditable')){
						$target = $target.parent();
						/* istanbul ignore next */
						tagName = ($target[0].tagName || '').toLowerCase();
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
						for(i = 0; i < _nodes.length; i++){
							if(_nodes[i].nodeType === 3 || !_nodes[i].tagName.match(BLOCKELEMENTS)){
								while(_nodes[i].nodeType === 3 || !_nodes[i].tagName || !_nodes[i].tagName.match(BLOCKELEMENTS)){
									_nodes[i] = _nodes[i].parentNode;
								}
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
							for(i = _nodes.length - 1; i >= 0; i--){
								/* istanbul ignore else:  */
								if(_nodes[i].parentNode) _nodes[i].parentNode.removeChild(_nodes[i]);
							}
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
						taSelection.insertHtml('<a href="' + options + '">' + options + '</a>', topNode);
						return;
					}
				}else if(command.toLowerCase() === 'inserthtml'){
					taSelection.insertHtml(options, topNode);
					return;
				}
			}
			try{
				$document[0].execCommand(command, showUI, options);
			}catch(e){}
		};
	};
}]).service('taSelection', ['$window', '$document',
/* istanbul ignore next: all browser specifics and PhantomJS dosen't seem to support half of it */
function($window, $document){
	// need to dereference the document else the calls don't work correctly
	var _document = $document[0];
	var rangy = $window.rangy;
	var api = {
		getSelection: function(){
			var range = rangy.getSelection().getRangeAt(0);
			var container = range.commonAncestorContainer;
			// Check if the container is a text node and return its parent if so
			container = container.nodeType === 3 ? container.parentNode : container;
			return {
				start: {
					element: range.startContainer,
					offset: range.startOffset
				},
				end: {
					element: range.endContainer,
					offset: range.endOffset
				},
				container: container,
				collapsed: range.collapsed
				
			};
		},
		getOnlySelectedElements: function(){
			var range = rangy.getSelection().getRangeAt(0);
			var container = range.commonAncestorContainer;
			// Check if the container is a text node and return its parent if so
			container = container.nodeType === 3 ? container.parentNode : container;
			return range.getNodes([1], function(node){
				return node.parentNode === container;
			});
		},
		// Some basic selection functions
		getSelectionElement: function () {
			return api.getSelection().container;
		},
		setSelection: function(el, start, end){
			var range = rangy.createRange();
			
			range.setStart(el, start);
			range.setEnd(el, end);
			
			rangy.getSelection().setSingleRange(range);
		},
		setSelectionBeforeElement: function (el){
			var range = rangy.createRange();
			
			range.selectNode(el);
			range.collapse(true);
			
			rangy.getSelection().setSingleRange(range);
		},
		setSelectionAfterElement: function (el){
			var range = rangy.createRange();
			
			range.selectNode(el);
			range.collapse(false);
			
			rangy.getSelection().setSingleRange(range);
		},
		setSelectionToElementStart: function (el){
			var range = rangy.createRange();
			
			range.selectNodeContents(el);
			range.collapse(true);
			
			rangy.getSelection().setSingleRange(range);
		},
		setSelectionToElementEnd: function (el){
			var range = rangy.createRange();
			
			range.selectNodeContents(el);
			range.collapse(false);
			
			rangy.getSelection().setSingleRange(range);
		},
		// from http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
		// topNode is the contenteditable normally, all manipulation MUST be inside this.
		insertHtml: function(html, topNode){
			var parent, secondParent, _childI, nodes, startIndex, startNodes, endNodes, i, lastNode;
			var element = angular.element("<div>" + html + "</div>");
			var range = rangy.getSelection().getRangeAt(0);
			var frag = _document.createDocumentFragment();
			var children = element[0].childNodes;
			var isInline = true;
			if(children.length > 0){
				// NOTE!! We need to do the following:
				// check for blockelements - if they exist then we have to split the current element in half (and all others up to the closest block element) and insert all children in-between.
				// If there are no block elements, or there is a mixture we need to create textNodes for the non wrapped text (we don't want them spans messing up the picture).
				nodes = [];
				for(_childI = 0; _childI < children.length; _childI++){
					if(!(
						(children[_childI].nodeName.toLowerCase() === 'p' && children[_childI].innerHTML.trim() === '') || // empty p element
						(children[_childI].nodeType === 3 && children[_childI].nodeValue.trim() === '') // empty text node
					)){
						isInline = isInline && !BLOCKELEMENTS.test(children[_childI].nodeName);
						nodes.push(children[_childI]);
					}
				}
				for(var _n = 0; _n < nodes.length; _n++) lastNode = frag.appendChild(nodes[_n]);
				if(!isInline && range.collapsed && /^(|<br(|\/)>)$/i.test(range.startContainer.innerHTML)) range.selectNode(range.startContainer);
			}else{
				isInline = true;
				// paste text of some sort
				lastNode = frag = _document.createTextNode(html);
			}
			
			// Other Edge case - selected data spans multiple blocks.
			if(isInline){
				range.deleteContents();
			}else{ // not inline insert
				if(range.collapsed && range.startContainer !== topNode && range.startContainer.parentNode !== topNode){
					// split element into 2 and insert block element in middle
					if(range.startContainer.nodeType === 3){ // if text node
						parent = range.startContainer.parentNode;
						nodes = parent.childNodes;
						// split the nodes into two lists - before and after, splitting the node with the selection into 2 text nodes.
						startNodes = [];
						endNodes = [];
						for(startIndex = 0; startIndex < nodes.length; startIndex++){
							startNodes.push(nodes[startIndex]);
							if(nodes[startIndex] === range.startContainer) break;
						}
						endNodes.push(_document.createTextNode(range.startContainer.nodeValue.substring(range.startOffset)));
						range.startContainer.nodeValue = range.startContainer.nodeValue.substring(0, range.startOffset);
						for(i = startIndex + 1; i < nodes.length; i++) endNodes.push(nodes[i]);
						
						secondParent = parent.cloneNode();
						parent.childNodes = startNodes;
						secondParent.childNodes = endNodes;
					}else{
						parent = range.startContainer;
						secondParent = parent.cloneNode();
						secondParent.innerHTML = parent.innerHTML.substring(range.startOffset);
						parent.innerHTML = parent.innerHTML.substring(0, range.startOffset);
					}
					angular.element(parent).after(secondParent);
					// put cursor to end of inserted content
					range.setStartAfter(parent);
					range.setEndAfter(parent);
					if(/^(|<br(|\/)>)$/i.test(parent.innerHTML.trim())){
						range.setStartBefore(parent);
						range.setEndBefore(parent);
						angular.element(parent).remove();
					}
					if(/^(|<br(|\/)>)$/i.test(secondParent.innerHTML.trim())) angular.element(secondParent).remove();
				}else{
					range.deleteContents();
				}
			}
			range.insertNode(frag);
			if(lastNode){
				api.setSelectionToElementEnd(lastNode);
			}
		}
	};
	return api;
}]);
angular.module('textAngular.validators', [])
.directive('taMaxText', function(){
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
});
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
.directive('taBind', ['taSanitize', '$timeout', '$window', '$document', 'taFixChrome', 'taBrowserTag', 'taSelection', 'taSelectableElements', 'taApplyCustomRenderers', 'taOptions', '_taBlankTest',
				function(taSanitize, $timeout, $window, $document, taFixChrome, taBrowserTag, taSelection, taSelectableElements, taApplyCustomRenderers, taOptions, _taBlankTest){
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
			var _lastKey;
			var BLOCKED_KEYS = /^(9|19|20|27|33|34|35|36|37|38|39|40|45|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/i;
			var UNDO_TRIGGER_KEYS = /^(8|13|32|46|59|61|107|109|186|187|188|189|190|191|192|219|220|221|222)$/i; // spaces, enter, delete, backspace, all punctuation
			
			// defaults to the paragraph element, but we need the line-break or it doesn't allow you to type into the empty element
			// non IE is '<p><br/></p>', ie is '<p></p>' as for once IE gets it correct...
			var _defaultVal, _defaultTest;
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
			
			var _blankTest = _taBlankTest(_defaultTest);
			
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
			
			var _undo = scope['$undoTaBind' + (attrs.id || '')] = function(){
				/* istanbul ignore else: can't really test it due to all changes being ignored as well in readonly */
				if(!_isReadonly && _isContentEditable){
					var content = ngModel.$undoManager.undo();
					if(typeof content !== "undefined" && content !== null){
						_setInnerHTML(content);
						_setViewValue(content, false);
						/* istanbul ignore else: browser catch */
						if(element[0].childNodes.length) taSelection.setSelectionToElementEnd(element[0].childNodes[element[0].childNodes.length-1]);
						else taSelection.setSelectionToElementEnd(element[0]);
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
						/* istanbul ignore else: browser catch */
						if(element[0].childNodes.length) taSelection.setSelectionToElementEnd(element[0].childNodes[element[0].childNodes.length-1]);
						else taSelection.setSelectionToElementEnd(element[0]);
					}
				}
			};
			
			// in here we are undoing the converts used elsewhere to prevent the < > and & being displayed when they shouldn't in the code.
			var _compileHtml = function(){
				if(_isContentEditable) return element[0].innerHTML;
				if(_isInputFriendly) return element.val();
				throw ('textAngular Error: attempting to update non-editable taBind');
			};
			
			var _setViewValue = function(_val, triggerUndo){
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
			};
			
			//used for updating when inserting wrapped elements
			scope['updateTaBind' + (attrs.id || '')] = function(){
				if(!_isReadonly) _setViewValue();
			};
			
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
					
					ngModel.$formatters.push(function(htmlValue){
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
					var waitforpastedata = function(savedcontent, _savedSelection, cb) {
						if (element[0].childNodes && element[0].childNodes.length > 0) {
							cb(savedcontent, _savedSelection);
						} else {
							that = {
								s: savedcontent,
								_: _savedSelection,
								cb: cb
							};
							that.callself = function () {
								waitforpastedata(that.s, that._, that.cb);
							};
							setTimeout(that.callself, 5);
						}
					};
					var _processingPaste = false;
					/* istanbul ignore next: phantom js cannot test this for some reason */
					var processpaste = function(savedcontent, _savedSelection) {
						text = element[0].innerHTML;
						element[0].innerHTML = savedcontent;
						
						// restore selection
						$window.rangy.restoreSelection(_savedSelection);
						/* istanbul ignore else: don't care if nothing pasted */
						if(text.trim().length){
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
										var binds = getByAttribute(_el, 'ta-bind');
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
								text = text.replace(/<br class="Apple-interchange-newline"[^>]*?>/ig, '');
							}
							
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
						var _savedSelection = $window.rangy.saveSelection();
						_processingPaste = true;
						element.addClass('processing-paste');
						var savedcontent = element[0].innerHTML;
						var clipboardData = (e.originalEvent || e).clipboardData;
						if (clipboardData && clipboardData.getData) {// Webkit - get data from clipboard, put into editdiv, cleanup, then cancel event
							var _types = "";
							for(var _t = 0; _t < clipboardData.types.length; _t++){
								_types += " " + clipboardData.types[_t];
							}
							/* istanbul ignore next: browser tests */
							if (/text\/html/i.test(_types)) {
								element[0].innerHTML = clipboardData.getData('text/html');
							} else if (/text\/plain/i.test(_types)) {
								element[0].innerHTML = clipboardData.getData('text/plain');
							} else {
								element[0].innerHTML = "";
							}
							waitforpastedata(savedcontent, _savedSelection, processpaste);
							e.stopPropagation();
							e.preventDefault();
							return false;
						} else {// Everything else - empty editdiv and allow browser to paste content into it, then cleanup
							element[0].innerHTML = "";
							waitforpastedata(savedcontent, _savedSelection, processpaste);
							return true;
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
						/* istanbul ignore else: readonly check */
						if(!_isReadonly){
							if(event.metaKey || event.ctrlKey){
								// covers ctrl/command + z
								if((event.keyCode === 90 && !event.shiftKey)){
									_undo();
									event.preventDefault();
								// covers ctrl + y, command + shift + z
								}else if((event.keyCode === 90 && event.shiftKey) || (event.keyCode === 89 && !event.shiftKey)){
									_redo();
									event.preventDefault();
								}
							/* istanbul ignore next: difficult to test as can't seem to select */
							}else if(event.keyCode === 13 && !event.shiftKey){
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
					
					element.on('keyup', scope.events.keyup = function(event, eventData){
						/* istanbul ignore else: this is for catching the jqLite testing*/
						if(eventData) angular.extend(event, eventData);
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
							_setViewValue(val, triggerUndo);
							if(!triggerUndo) _undoKeyupTimeout = $timeout(function(){ ngModel.$undoManager.push(val); }, 250);
							_lastKey = event.keyCode;
						}
					});

					element.on('blur', scope.events.blur = function(){
						_focussed = false;
						/* istanbul ignore else: if readonly don't update model */
						if(!_isReadonly){
							_setViewValue();
						}
						ngModel.$render();
					});

					// Placeholders not supported on ie 8 and below
					if(attrs.placeholder && (_browserDetect.ie > 8 || _browserDetect.ie === undefined)){
						var ruleIndex;
						if(attrs.id) ruleIndex = addCSSRule('#' + attrs.id + '.placeholder-text:before', 'content: "' + attrs.placeholder + '"');
						else throw('textAngular Error: An unique ID is required for placeholders to work');

						scope.$on('$destroy', function(){
							removeCSSRule(ruleIndex);
						});
					}

					element.on('focus', scope.events.focus = function(){
						_focussed = true;
						ngModel.$render();
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
			
			// catch DOM XSS via taSanitize
			// Sanitizing both ways is identical
			var _sanitize = function(unsafe){
				return (ngModel.$oldViewValue = taSanitize(taFixChrome(unsafe), ngModel.$oldViewValue, _disableSanitizer));
			};
			
			// trigger the validation calls
			var _validity = function(value){
				if(attrs.required) ngModel.$setValidity('required', !_blankTest(value));
				return value;
			};
			// parsers trigger from the above keyup function or any other time that the viewValue is updated and parses it for storage in the ngModel
			ngModel.$parsers.push(_sanitize);
			ngModel.$parsers.push(_validity);
			// because textAngular is bi-directional (which is awesome) we need to also sanitize values going in from the server
			ngModel.$formatters.push(_sanitize);
			ngModel.$formatters.push(function(value){
				if(_blankTest(value)) return value;
				var domTest = angular.element("<div>" + value + "</div>");
				if(domTest.children().length === 0){
					value = "<" + attrs.taDefaultWrap + ">" + value + "</" + attrs.taDefaultWrap + ">";
				}
				return value;
			});
			ngModel.$formatters.push(_validity);
			ngModel.$formatters.push(function(value){
				return ngModel.$undoManager.push(value || '');
			});

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
						_setViewValue();
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
					if(_browserDetect.webkit) { // detect webkit
						globalContentEditableBlur = true;
					}
				});
			}
		}
	};
}]);
// this global var is used to prevent multiple fires of the drop event. Needs to be global to the textAngular file.
var dropFired = false;
var textAngular = angular.module("textAngular", ['ngSanitize', 'textAngularSetup', 'textAngular.factories', 'textAngular.DOM', 'textAngular.validators', 'textAngular.taBind']); //This makes ngSanitize required

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
		class: [string]?
				Optional, if set will override the taOptions.classes.toolbarButton class.
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

textAngular.run([function(){
	/* istanbul ignore next: not sure how to test this */
	// Require Rangy and rangy savedSelection module.
	if(!window.rangy){
		throw("rangy-core.js and rangy-selectionsaverestore.js are required for textAngular to work correctly, rangy-core is not yet loaded.");
	}else{
		window.rangy.init();
		if(!window.rangy.saveSelection){
			throw("rangy-selectionsaverestore.js is required for textAngular to work correctly.");
		}
	}
}]);

textAngular.directive("textAngular", [
	'$compile', '$timeout', 'taOptions', 'taSelection', 'taExecCommand', 'textAngularManager', '$window', '$document', '$animate', '$log', '$q',
	function($compile, $timeout, taOptions, taSelection, taExecCommand, textAngularManager, $window, $document, $animate, $log, $q){
		return {
			require: '?ngModel',
			scope: {},
			restrict: "EA",
			link: function(scope, element, attrs, ngModel){
				// all these vars should not be accessable outside this directive
				var _keydown, _keyup, _keypress, _mouseup, _focusin, _focusout,
					_originalContents, _toolbars,
					_serial = (attrs.serial) ? attrs.serial : Math.floor(Math.random() * 10000000000000000),
					_taExecCommand, _resizeMouseDown;
				
				scope._name = (attrs.name) ? attrs.name : 'textAngularEditor' + _serial;

				var oneEvent = function(_element, event, action){
					$timeout(function(){
						// shim the .one till fixed
						var _func = function(){
							_element.off(event, _func);
							action.apply(this, arguments);
						};
						_element.on(event, _func);
					}, 100);
				};
				_taExecCommand = taExecCommand(attrs.taDefaultWrap);
				// get the settings from the defaults and add our specific functions that need to be on the scope
				angular.extend(scope, angular.copy(taOptions), {
					// wraps the selection in the provided tag / execCommand function. Should only be called in WYSIWYG mode.
					wrapSelection: function(command, opt, isSelectableElementTool){
						if(command.toLowerCase() === "undo"){
							scope['$undoTaBindtaTextElement' + _serial]();
						}else if(command.toLowerCase() === "redo"){
							scope['$redoTaBindtaTextElement' + _serial]();
						}else{
							// catch errors like FF erroring when you try to force an undo with nothing done
							_taExecCommand(command, false, opt);
							if(isSelectableElementTool){
								// re-apply the selectable tool events
								scope['reApplyOnSelectorHandlerstaTextElement' + _serial]();
							}
							// refocus on the shown display element, this fixes a display bug when using :focus styles to outline the box.
							// You still have focus on the text/html input it just doesn't show up
							scope.displayElements.text[0].focus();
						}
					},
					showHtml: scope.$eval(attrs.taShowHtml) || false
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
					oneEvent($document.find('body'), 'click keyup', function(){scope.hidePopover();});
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
					/* istanbul ignore next: dosen't test with mocked animate */
					var doneCb = function(){
						scope.displayElements.popover.css('display', '');
						scope.displayElements.popoverContainer.attr('style', '');
						scope.displayElements.popoverContainer.attr('class', 'popover-content');
					};
					$q.when($animate.removeClass(scope.displayElements.popover, 'in', doneCb)).then(doneCb);
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
					var _body = $document.find('body');
					_resizeMouseDown = function(event){
						var startPosition = {
							width: parseInt(_el.attr('width')),
							height: parseInt(_el.attr('height')),
							x: event.clientX,
							y: event.clientY
						};
						if(startPosition.width === undefined || isNaN(startPosition.width)) startPosition.width = _el[0].offsetWidth;
						if(startPosition.height === undefined || isNaN(startPosition.height)) startPosition.height = _el[0].offsetHeight;
						scope.hidePopover();
						var ratio = startPosition.height / startPosition.width;
						var mousemove = function(event){
							// calculate new size
							var pos = {
								x: Math.max(0, startPosition.width + (event.clientX - startPosition.x)),
								y: Math.max(0, startPosition.height + (event.clientY - startPosition.y))
							};
							
							if(event.shiftKey){
								// keep ratio
								var newRatio = pos.y / pos.x;
								pos.x = ratio > newRatio ? pos.x : pos.y / ratio;
								pos.y = ratio > newRatio ? pos.x * ratio : pos.y;
							}
							el = angular.element(_el);
							el.attr('height', Math.max(0, pos.y));
							el.attr('width', Math.max(0, pos.x));
							
							// reflow the popover tooltip
							scope.reflowResizeOverlay(_el);
						};
						_body.on('mousemove', mousemove);
						oneEvent(_body, 'mouseup', function(event){
							event.preventDefault();
							event.stopPropagation();
							_body.off('mousemove', mousemove);
							scope.showPopover(_el);
						});
						event.stopPropagation();
						event.preventDefault();
					};

					scope.displayElements.resize.anchors[3].on('mousedown', _resizeMouseDown);

					scope.reflowResizeOverlay(_el);
					oneEvent(_body, 'click', function(){scope.hideResizeOverlay();});
				};
				/* istanbul ignore next: pretty sure phantomjs won't test this */
				scope.hideResizeOverlay = function(){
					scope.displayElements.resize.anchors[3].off('mousedown', _resizeMouseDown);
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

				scope.displayElements.forminput.attr('name', scope._name);
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
					_savedSelection = $window.rangy.saveSelection();
					return function(){
						if(_savedSelection) $window.rangy.restoreSelection(_savedSelection);
					};
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
					scope.focussed = true;
					element.addClass(scope.classes.focussed);
					_toolbars.focus();
					element.triggerHandler('focus');
				};
				scope.displayElements.html.on('focus', _focusin);
				scope.displayElements.text.on('focus', _focusin);
				_focusout = function(e){
					// if we are NOT runnig an action and have NOT focussed again on the text etc then fire the blur events
					if(!scope._actionRunning && $document[0].activeElement !== scope.displayElements.html[0] && $document[0].activeElement !== scope.displayElements.text[0]){
						element.removeClass(scope.classes.focussed);
						_toolbars.unfocus();
						// to prevent multiple apply error defer to next seems to work.
						$timeout(function(){
							scope._bUpdateSelectedStyles = false;
							element.triggerHandler('blur');
							scope.focussed = false;
						}, 0);
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

				if(attrs.taTargetToolbars) _toolbars = textAngularManager.registerEditor(scope._name, scope, attrs.taTargetToolbars.split(','));
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
					_toolbars = textAngularManager.registerEditor(scope._name, scope, ['textAngularToolbar' + _serial]);
				}

				scope.$on('$destroy', function(){
					textAngularManager.unregisterEditor(scope._name);
				});

				// catch element select event and pass to toolbar tools
				scope.$on('ta-element-select', function(event, element){
					if(_toolbars.triggerElementSelect(event, element)){
						scope['reApplyOnSelectorHandlerstaTextElement' + _serial]();
					}
				});

				scope.$on('ta-drop-event', function(event, element, dropEvent, dataTransfer){
					scope.displayElements.text[0].focus();
					if(dataTransfer && dataTransfer.files && dataTransfer.files.length > 0){
						angular.forEach(dataTransfer.files, function(file){
							// taking advantage of boolean execution, if the fileDropHandler returns true, nothing else after it is executed
							// If it is false then execute the defaultFileDropHandler if the fileDropHandler is NOT the default one
							// Once one of these has been executed wrap the result as a promise, if undefined or variable update the taBind, else we should wait for the promise
							try{
								$q.when(scope.fileDropHandler(file, scope.wrapSelection) ||
									(scope.fileDropHandler !== scope.defaultFileDropHandler &&
									$q.when(scope.defaultFileDropHandler(file, scope.wrapSelection)))).then(function(){
										scope['updateTaBindtaTextElement' + _serial]();
									});
							}catch(error){
								$log.error(error);
							}
						});
						dropEvent.preventDefault();
						dropEvent.stopPropagation();
					/* istanbul ignore else, the updates if moved text */
					}else{
						$timeout(function(){
							scope['updateTaBindtaTextElement' + _serial]();
						}, 0);
					}
				});

				// the following is for applying the active states to the tools that support it
				scope._bUpdateSelectedStyles = false;
				/* istanbul ignore next: browser window/tab leave check */
				angular.element(window).on('blur', function(){
					scope._bUpdateSelectedStyles = false;
					scope.focussed = false;
				});
				// loop through all the tools polling their activeState function if it exists
				scope.updateSelectedStyles = function(){
					var _selection;
					// test if the common element ISN'T the root ta-text node
					if((_selection = taSelection.getSelectionElement()) !== undefined && _selection.parentNode !== scope.displayElements.text[0]){
						_toolbars.updateSelectedStyles(angular.element(_selection));
					}else _toolbars.updateSelectedStyles();
					// used to update the active state when a key is held down, ie the left arrow
					/* istanbul ignore else: browser only check */
					if(scope._bUpdateSelectedStyles) $timeout(scope.updateSelectedStyles, 200);
				};
				// start updating on keydown
				_keydown = function(){
					/* istanbul ignore next: ie catch */
					if(!scope.focussed){
						scope._bUpdateSelectedStyles = false;
						return;
					}
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
]);
textAngular.service('textAngularManager', ['taToolExecuteAction', 'taTools', 'taRegisterTool', function(taToolExecuteAction, taTools, taRegisterTool){
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
							scope.focussed = true;
						});
					},
					unfocus: function(){
						// this should be called when the editor becomes unfocussed
						angular.forEach(_toolbars, function(toolbarScope){
							toolbarScope.disabled = true;
							toolbarScope.focussed = false;
						});
						scope.focussed = false;
					},
					updateSelectedStyles: function(selectedElement){
						// update the active state of all buttons on liked toolbars
						angular.forEach(_toolbars, function(toolbarScope){
							angular.forEach(toolbarScope.tools, function(toolScope){
								if(toolScope.activeState){
									toolbarScope._parent = scope;
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
}]);
textAngular.directive('textAngularToolbar', [
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
					
					if(toolDefinition && toolDefinition["class"]) toolElement.addClass(toolDefinition["class"]);
					else toolElement.addClass(scope.classes.toolbarButton);
					
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
							(typeof this.$eval('disabled') !== 'function' && this.$eval('disabled')) || this.$eval('disabled()') ||
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
]);})();