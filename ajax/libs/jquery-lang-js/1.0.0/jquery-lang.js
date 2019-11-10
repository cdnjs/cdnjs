/**
 * jQuery Multi-Language Plugin  
 * 
 * This plugin provides multi language support across all common browsers and 
 * does not require a page reload. It can be used to change simple text 
 * containers content (i.e. <span>, <p>, <div>, ...) as well as input values
 * (i.e. type is button or submit) and placeholder (i.e. type is email, password 
 * or text) and title attribues of any tag.
 * 
 * Please see the source page on how to use this.
 * 
 * Changelog:
 *  - Added support for title attribute and input types email and password
 * 
 * Source: http://www.isogenicengine.com/documentation/jquery-multi-language-site-plugin/
**/

var IgeEventsLite = function () {}

IgeEventsLite.prototype.on = function (evtName, fn) {
	if (evtName && fn) {
		this.eventList[evtName] = this.eventList[evtName] || [];
		this.eventList[evtName].push(fn);
	}
}
	
IgeEventsLite.prototype.emit = function (evtName) {
	if (evtName) {
		this.eventList = this.eventList || [];
		var args = [];
		for (var i = 1; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		if (evtName) {
			var fnList = this.eventList[evtName];
			for (var i in fnList) {
				if (typeof fnList[i] == 'function') {
					fnList[i].apply(this, args);
				}
			}
		}
	}
}

var jquery_lang_js = function () {
	this.events = new IgeEventsLite();
	
	this.on = this.events.on;
	this.emit = this.events.emit;
	
	return this;
}

jquery_lang_js.prototype.lang = {};
jquery_lang_js.prototype.defaultLang = 'en';
jquery_lang_js.prototype.currentLang = 'en';

jquery_lang_js.prototype.run = function () {
	var langElems = $('[lang]');
	var elemsLength = langElems.length;
	
	while (elemsLength--) {
		var elem = langElems[elemsLength];
		var elemType = elem.tagName;
		if(elemType!='HTML'){
			var langElem = $(elem);
			
			if (langElem.attr('lang') == this.defaultLang) {
				var titleText = langElem.attr('title');
				if (titleText || langElem.is("input")) {
					if (titleText) {
						langElem.data('deftexttitle', titleText);
					}
					if (langElem.is("input")) {
						// An input element
						switch (langElem.attr('type')) {
							case 'button':
							case 'submit':
							case 'reset':
								langElem.data('deftext', langElem.val());
							break;

							case 'email':
							case 'password':
							case 'text':
								// Check for a placeholder text value
								var plText = langElem.attr('placeholder');
								if (plText) {
									langElem.data('deftext', plText);
								}
							break;
						}
					}
				} else {
					// Not an input element
					langElem.data('deftext', langElem.html());
				}
			}
		}
	}
	
	
	// Now that the language system is setup, check
	// if there is a default language and switch to it
	if (localStorage) {
		var lsLang = localStorage.getItem('langJs_currentLang');
		if (lsLang) {
			this.change(lsLang);
		}
		else
			this.change(this.currentLang);			
	}
}

jquery_lang_js.prototype.loadPack = function (packPath) {
	$('<script type="text/javascript" charset="utf-8" src="' + packPath + '" />').appendTo("head");
}
	
jquery_lang_js.prototype.change = function (lang) {
	//console.log('Changing language to ' + lang);
	if (this.currentLang != lang) { this.update(lang); }
	this.currentLang = lang;
	
	// Get the page HTML
	var langElems = $('[lang]');
		
	if (lang != this.defaultLang) {
		if (this.lang[lang]) {
			var elemsLength = langElems.length;
			while (elemsLength--) {
				var elem = langElems[elemsLength];
				var langElem = $(elem);
				if (langElem.data('deftexttitle')) {
					if (langElem.attr('title')) {
						// Check for a title attribute
						var currentText = langElem.attr('title');
						var defaultLangText = langElem.data('deftexttitle');
				
						var newText = this.lang[lang][defaultLangText] || currentText;
						var newHtml = currentText.replace(currentText, newText);
						langElem.attr('title', newHtml);
						if (currentText != newHtml) {
							langElem.attr('lang', lang);
						}
					}
				}
				if (langElem.data('deftext')) {
					if (langElem.is("input")) {
						// An input element
						switch (langElem.attr('type')) {
							case 'button':
							case 'submit':
							case 'reset':
								// A button or submit, change the value attribute
								var currentText = langElem.val();
								var defaultLangText = langElem.data('deftext');
								
								var newText = this.lang[lang][defaultLangText] || currentText;
								var newHtml = currentText.replace(currentText, newText);
								langElem.val(newHtml);
								
								if (currentText != newHtml) {
									langElem.attr('lang', lang);
								}
							break;

							case 'email':
							case 'password':
							case 'text':
								// Check for a placeholder text value
								var currentText = langElem.attr('placeholder');
								var defaultLangText = langElem.data('deftext');
								
								var newText = this.lang[lang][defaultLangText] || currentText;
								var newHtml = currentText.replace(currentText, newText);
								langElem.attr('placeholder', newHtml);
								
								if (currentText != newHtml) {
									langElem.attr('lang', lang);
								}
							break;
						}
					} else {
						// Not an input element
						var currentText = langElem.html();
						var defaultLangText = langElem.data('deftext');
						
						var newText = this.lang[lang][defaultLangText] || currentText;
						var newHtml = currentText.replace(currentText, newText);
						langElem.html(newHtml);
						
						if (currentText != newHtml) {
							langElem.attr('lang', lang);
						}
					}
				} else {
					//console.log('No language data for element... have you executed .run() first?');
				}
			}
		} else {
			console.log('Cannot switch language, no language pack defined for "' + lang + '"');
		}
	} else {
		// Restore the deftext data
		langElems.each(function () {
			var langElem = $(this);
			if (langElem.data('deftexttitle')) {
				// handle title attribute
				if (langElem.attr('title')) {
					langElem.attr('title', langElem.data('deftexttitle'));
				}
			}
			if (langElem.data('deftext')) {
				if (langElem.is("input")) {
					// An input element
					switch (langElem.attr('type')) {
						case 'button':
						case 'submit':
						case 'reset':
							langElem.val(langElem.data('deftext'));
						break;
						
						case 'email':
						case 'password':
						case 'text':
							// Check for a placeholder text value
							langElem.attr('placeholder', langElem.data('deftext'));
						break;
					}
				} else {
					langElem.html(langElem.data('deftext'));
				}
			}
		});
	}
}
// if text does not in language data???
jquery_lang_js.prototype.convert = function (text, lang) {
	if (lang) {
		if (lang != this.defaultLang) {
			return this.lang[lang][text] || text;
		} else {
			return text;
		}
	} else {
		if (this.currentLang != this.defaultLang) {
			return this.lang[this.currentLang][text] || text;
		} else {
			return text;
		}
	}
}

jquery_lang_js.prototype.update = function (lang) {
	if (localStorage) {
		localStorage.setItem('langJs_currentLang', lang);
	}
	this.emit('update', lang);
}
