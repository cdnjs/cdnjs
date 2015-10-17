webshim.register('form-inputmode', function($, webshims, window, document, undefined, options){
	"use strict";
	var ua = navigator.userAgent;
	var removeListener = function(elem){
		elem.removeEventListener('blur', switchBack, true);
	};
	var needsPattern = (/iphone|ipod/i).test(ua);
	var regPattern = /^[\\d\*|\[0\-9\]]*[\+|\{\d*\,\d*\}|*]*$/;
	var stopPatterns = needsPattern || (/ipad|ios/i).test(ua) ?
		{
			'[0-9]*': 1,
			'\\d*': 1
		} :
			false
		;
	var switchBack = function(e){
		removeListener(e.target);
		e.target.type = 'text';
	};
	var removeDocListener = function(){
		document.removeEventListener('focus', addFix, true);
		document.removeEventListener('touchstart', addFix, true);
	};
	var allowSwitchByPattern = function(elem){
		var pattern;
		var switchAllowed = true;

		if(stopPatterns){
			pattern = elem.getAttribute('pattern') || '';
			if(stopPatterns[pattern] || (needsPattern && (!pattern || !regPattern.test(pattern)))){
				switchAllowed = false;
			}
		}

		return switchAllowed;
	};

	var addFix = function(e){
		if(e.target.type == 'text' && e.target.getAttribute('inputmode') == 'numeric' && allowSwitchByPattern(e.target)){
			try{
				removeListener(e.target);
				e.target.addEventListener('blur', switchBack, true);
				e.target.type = 'tel';
			} catch (er){
				removeDocListener();
			}
		}
	};

	document.addEventListener('focus', addFix, true);
	document.addEventListener('touchstart', addFix, true);
});
