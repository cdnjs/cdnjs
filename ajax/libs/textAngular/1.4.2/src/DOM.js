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
		return function(command, showUI, options, defaultTagAttributes){
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
					var tagBegin = '<a href="' + options + '" target="' +
							(defaultTagAttributes.a.target ? defaultTagAttributes.a.target : '') +
							'">',
						tagEnd = '</a>',
						_selection = taSelection.getSelection();
					if(_selection.collapsed){
						// insert text at selection, then select then just let normal exec-command run
						taSelection.insertHtml(tagBegin + options + tagEnd, topNode);
					}else if(rangy.getSelection().getRangeAt(0).canSurroundContents()){
						var node = angular.element(tagBegin + tagEnd)[0];
						rangy.getSelection().getRangeAt(0).surroundContents(node);
					}
					return;
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
}]).service('taSelection', ['$window', '$document', 'taDOM',
/* istanbul ignore next: all browser specifics and PhantomJS dosen't seem to support half of it */
function($window, $document, taDOM){
	// need to dereference the document else the calls don't work correctly
	var _document = $document[0];
	var rangy = $window.rangy;
	var brException = function (element, offset) {
		/* check if selection is a BR element at the beginning of a container. If so, get
		* the parentNode instead.
		* offset should be zero in this case. Otherwise, return the original
		* element.
		*/
		if (element.tagName && element.tagName.match(/^br$/i) && offset === 0 && !element.previousSibling) {
            return {
                element: element.parentNode,
                offset: 0
            };
		} else {
			return {
				element: element,
				offset: offset
			};
		}
	};
	var api = {
		getSelection: function(){
			var range = rangy.getSelection().getRangeAt(0);
			var container = range.commonAncestorContainer;
			var selection = {
				start: brException(range.startContainer, range.startOffset),
				end: brException(range.endContainer, range.endOffset),
				collapsed: range.collapsed
			};
			// Check if the container is a text node and return its parent if so
			container = container.nodeType === 3 ? container.parentNode : container;
			if (container.parentNode === selection.start.element ||
				container.parentNode === selection.end.element) {
				selection.container = container.parentNode;
			} else {
				selection.container = container;
			}
			return selection;
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
			if(el.childNodes && el.childNodes[el.childNodes.length - 1] && el.childNodes[el.childNodes.length - 1].nodeName === 'br'){
				range.startOffset = range.endOffset = range.startOffset - 1;
			}
			rangy.getSelection().setSingleRange(range);
		},
		// from http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
		// topNode is the contenteditable normally, all manipulation MUST be inside this.
		insertHtml: function(html, topNode){
			var parent, secondParent, _childI, nodes, i, lastNode, _tempFrag;
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
				if(range.collapsed && range.startContainer !== topNode){
					if(range.startContainer.innerHTML && range.startContainer.innerHTML.match(/^<[^>]*>$/i)){
						// this log is to catch when innerHTML is something like `<img ...>`
						parent = range.startContainer;
						if(range.startOffset === 1){
							// before single tag
							range.setStartAfter(parent);
							range.setEndAfter(parent);
						}else{
							// after single tag
							range.setStartBefore(parent);
							range.setEndBefore(parent);
						}
					}else{
						// split element into 2 and insert block element in middle
						if(range.startContainer.nodeType === 3 && range.startContainer.parentNode !== topNode){ // if text node
							parent = range.startContainer.parentNode;
							secondParent = parent.cloneNode();
							// split the nodes into two lists - before and after, splitting the node with the selection into 2 text nodes.
							taDOM.splitNodes(parent.childNodes, parent, secondParent, range.startContainer, range.startOffset);
							
							// Escape out of the inline tags like b
							while(!VALIDELEMENTS.test(parent.nodeName)){
								angular.element(parent).after(secondParent);
								parent = parent.parentNode;
								var _lastSecondParent = secondParent;
								secondParent = parent.cloneNode();
								// split the nodes into two lists - before and after, splitting the node with the selection into 2 text nodes.
								taDOM.splitNodes(parent.childNodes, parent, secondParent, _lastSecondParent);
							}
						}else{
							parent = range.startContainer;
							secondParent = parent.cloneNode();
							taDOM.splitNodes(parent.childNodes, parent, secondParent, undefined, undefined, range.startOffset);
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
						if(parent.nodeName.toLowerCase() === 'li'){
							_tempFrag = _document.createDocumentFragment();
							for(i = 0; i < frag.childNodes.length; i++){
								element = angular.element('<li>');
								taDOM.transferChildNodes(frag.childNodes[i], element[0]);
								taDOM.transferNodeAttributes(frag.childNodes[i], element[0]);
								_tempFrag.appendChild(element[0]);
							}
							frag = _tempFrag;
							if(lastNode){
								lastNode = frag.childNodes[frag.childNodes.length - 1];
								lastNode = lastNode.childNodes[lastNode.childNodes.length - 1];
							}
						}
					}
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
}]).service('taDOM', function(){
	var taDOM = {
		// recursive function that returns an array of angular.elements that have the passed attribute set on them
		getByAttribute: function(element, attribute){
			var resultingElements = [];
			var childNodes = element.children();
			if(childNodes.length){
				angular.forEach(childNodes, function(child){
					resultingElements = resultingElements.concat(taDOM.getByAttribute(angular.element(child), attribute));
				});
			}
			if(element.attr(attribute) !== undefined) resultingElements.push(element);
			return resultingElements;
		},
		
		transferChildNodes: function(source, target){
			// clear out target
			target.innerHTML = '';
			while(source.childNodes.length > 0) target.appendChild(source.childNodes[0]);
			return target;
		},
		
		splitNodes: function(nodes, target1, target2, splitNode, subSplitIndex, splitIndex){
			if(!splitNode && isNaN(splitIndex)) throw new Error('taDOM.splitNodes requires a splitNode or splitIndex');
			var startNodes = document.createDocumentFragment();
			var endNodes = document.createDocumentFragment();
			var index = 0;
			
			while(nodes.length > 0 && (isNaN(splitIndex) || splitIndex !== index) && nodes[0] !== splitNode){
				startNodes.appendChild(nodes[0]); // this removes from the nodes array (if proper childNodes object.
				index++;
			}
			
			if(!isNaN(subSplitIndex) && subSplitIndex >= 0 && nodes[0]){
				startNodes.appendChild(document.createTextNode(nodes[0].nodeValue.substring(0, subSplitIndex)));
				nodes[0].nodeValue = nodes[0].nodeValue.substring(subSplitIndex);
			}
			while(nodes.length > 0) endNodes.appendChild(nodes[0]);
			
			taDOM.transferChildNodes(startNodes, target1);
			taDOM.transferChildNodes(endNodes, target2);
		},
		
		transferNodeAttributes: function(source, target){
			for(var i = 0; i < source.attributes.length; i++) target.setAttribute(source.attributes[i].name, source.attributes[i].value);
			return target;
		}
	};
	return taDOM;
});