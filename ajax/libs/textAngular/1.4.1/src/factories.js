angular.module('textAngular.factories', [])
.factory('taBrowserTag', [function(){
	return function(tag){
		/* istanbul ignore next: ie specific test */
		if(!tag) return (_browserDetect.ie <= 8)? 'P' : 'p';
		else if(tag === '') return (_browserDetect.ie === undefined)? 'div' : (_browserDetect.ie <= 8)? 'P' : 'p';
		else return (_browserDetect.ie <= 8)? tag.toUpperCase() : tag;
	};
}]).factory('taApplyCustomRenderers', ['taCustomRenderers', 'taDOM', function(taCustomRenderers, taDOM){
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
				elements = taDOM.getByAttribute(element, renderer.customAttribute);
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
		if(!html || !angular.isString(html) || html.length <= 0) return html;
		// grab all elements with a style attibute
		var spanMatch = /<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/ig;
		var match, styleVal, newTag, finalHtml = '', lastIndex = 0;
		while(match = spanMatch.exec(html)){
			// one of the quoted values ' or "
			/* istanbul ignore next: quotations match */
			styleVal = match[3] || match[4];
			// test for chrome inserted junk
			if(styleVal && styleVal.match(/line-height: 1.[0-9]{3,12};|color: inherit; line-height: 1.1;/i)){
				// replace original tag with new tag
				styleVal = styleVal.replace(/( |)font-family: inherit;|( |)line-height: 1.[0-9]{3,12};|( |)color: inherit;/ig, '');
				newTag = '<' + match[1].trim();
				if(styleVal.trim().length > 0) newTag += ' style=' + match[2].substring(0,1) + styleVal + match[2].substring(0,1);
				newTag += match[5].trim() + ">";
				finalHtml += html.substring(lastIndex, match.index) + newTag;
				lastIndex = match.index + match[0].length;
			}
		}
		finalHtml += html.substring(lastIndex);
		// only replace when something has changed, else we get focus problems on inserting lists
		if(lastIndex > 0){
			// replace all empty strings
			return finalHtml.replace(/<span\s?>(.*?)<\/span>(<br(\/|)>|)/ig, '$1');
		} else return html;
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
	
	var styleMatch = [];
	for(var i = 0; i < convert_infos.length; i++){
		var _partialStyle = '(' + convert_infos[i].property + ':\\s*(';
		for(var j = 0; j < convert_infos[i].values.length; j++){
			/* istanbul ignore next: not needed to be tested yet */
			if(j > 0) _partialStyle += '|';
			_partialStyle += convert_infos[i].values[j];
		}
		_partialStyle += ');)';
		styleMatch.push(_partialStyle);
	}
	var styleRegexString = '(' + styleMatch.join('|') + ')';
	
	function wrapNested(html, wrapTag) {
		var depth = 0;
		var lastIndex = 0;
		var match;
		var tagRegex = /<[^>]*>/ig;
		while(match = tagRegex.exec(html)){
			lastIndex = match.index;
			if(match[0].substr(1, 1) === '/'){
				if(depth === 0) break;
				else depth--;
			}else depth++;
		}
		return wrapTag +
			html.substring(0, lastIndex) +
			// get the start tags reversed - this is safe as we construct the strings with no content except the tags
			angular.element(wrapTag)[0].outerHTML.substring(wrapTag.length) +
			html.substring(lastIndex);
	}
	
	function transformLegacyStyles(html){
		if(!html || !angular.isString(html) || html.length <= 0) return html;
		var i;
		var styleElementMatch = /<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/ig;
		var match, subMatch, styleVal, newTag, lastNewTag = '', newHtml, finalHtml = '', lastIndex = 0;
		while(match = styleElementMatch.exec(html)){
			// one of the quoted values ' or "
			/* istanbul ignore next: quotations match */
			styleVal = match[3] || match[4];
			var styleRegex = new RegExp(styleRegexString, 'i');
			// test for style values to change
			if(angular.isString(styleVal) && styleRegex.test(styleVal)){
				// remove build tag list
				newTag = '';
				// init regex here for exec
				var styleRegexExec = new RegExp(styleRegexString, 'ig');
				// find relevand tags and build a string of them
				while(subMatch = styleRegexExec.exec(styleVal)){
					for(i = 0; i < convert_infos.length; i++){
						if(!!subMatch[(i*2) + 2]){
							newTag += '<' + convert_infos[i].tag + '>';
						}
					}
				}
				// recursively find more legacy styles in html before this tag and after the previous match (if any)
				newHtml = transformLegacyStyles(html.substring(lastIndex, match.index));
				// build up html
				if(lastNewTag.length > 0){
					finalHtml += wrapNested(newHtml, lastNewTag);
				}else finalHtml += newHtml;
				// grab the style val without the transformed values
				styleVal = styleVal.replace(new RegExp(styleRegexString, 'ig'), '');
				// build the html tag
				finalHtml += '<' + match[1].trim();
				if(styleVal.length > 0) finalHtml += ' style="' + styleVal + '"';
				finalHtml += match[5] + '>';
				// update the start index to after this tag
				lastIndex = match.index + match[0].length;
				lastNewTag = newTag;
			}
		}
		if(lastNewTag.length > 0){
			finalHtml += wrapNested(html.substring(lastIndex), lastNewTag);
		}
		else finalHtml += html.substring(lastIndex);
		return finalHtml;
	}
	
	function transformLegacyAttributes(html){
		if(!html || !angular.isString(html) || html.length <= 0) return html;
		// replace all align='...' tags with text-align attributes
		var attrElementMatch = /<([^>\/]+?)align=("([^"]+)"|'([^']+)')([^>]*)>/ig;
		var match, finalHtml = '', lastIndex = 0;
		// match all attr tags
		while(match = attrElementMatch.exec(html)){
			// add all html before this tag
			finalHtml += html.substring(lastIndex, match.index);
			// record last index after this tag
			lastIndex = match.index + match[0].length;
			// construct tag without the align attribute
			var newTag = '<' + match[1] + match[5];
			// add the style attribute
			if(/style=("([^"]+)"|'([^']+)')/ig.test(newTag)){
				/* istanbul ignore next: quotations match */
				newTag = newTag.replace(/style=("([^"]+)"|'([^']+)')/i, 'style="$2$3 text-align:' + (match[3] || match[4]) + ';"');
			}else{
				/* istanbul ignore next: quotations match */
				newTag += ' style="text-align:' + (match[3] || match[4]) + ';"';
			}
			newTag += '>';
			// add to html
			finalHtml += newTag;
		}
		// return with remaining html
		return finalHtml + html.substring(lastIndex);
	}
	
	return function taSanitize(unsafe, oldsafe, ignore){
		// unsafe html should NEVER built into a DOM object via angular.element. This allows XSS to be inserted and run.
		if ( !ignore ) {
			try {
				unsafe = transformLegacyStyles(unsafe);
			} catch (e) {
			}
		}

		// unsafe and oldsafe should be valid HTML strings
		// any exceptions (lets say, color for example) should be made here but with great care
		// setup unsafe element for modification
		unsafe = transformLegacyAttributes(unsafe);
		
		var safe;
		try {
			safe = $sanitize(unsafe);
			// do this afterwards, then the $sanitizer should still throw for bad markup
			if(ignore) safe = unsafe;
		} catch (e){
			safe = oldsafe || '';
		}
		
		// Do processing for <pre> tags, removing tabs and return carriages outside of them
		
		var _preTags = safe.match(/(<pre[^>]*>.*?<\/pre[^>]*>)/ig);
		var processedSafe = safe.replace(/(&#(9|10);)*/ig, '');
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
		// pass into the action the deferred function and also the function to reload the current selection if rangy available
		var result;
		try{
			result = this.action(deferred, _editor.startAction());
			// We set the .finally callback here to make sure it doesn't get executed before any other .then callback.
			promise['finally'](function(){
				_editor.endAction.call(_editor);
			});
		}catch(exc){
			$log.error(exc);
		}
		if(result || result === undefined){
			// if true or undefined is returned then the action has finished. Otherwise the deferred action will be resolved manually.
			deferred.resolve();
		}
	};
}]);