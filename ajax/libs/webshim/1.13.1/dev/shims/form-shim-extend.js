webshims.register('form-shim-extend', function($, webshims, window, document, undefined, options){
"use strict";
webshims.inputTypes = webshims.inputTypes || {};
//some helper-functions
var cfg = webshims.cfg.forms;
var bugs = webshims.bugs;
var splitReg = /\s*,\s*/g;
var typeModels = webshims.inputTypes,
	checkTypes = {
		radio: 1,
		checkbox: 1
	},
	getType = function(){
		var elem = this;
		var type = (elem.getAttribute('type') || '').toLowerCase();
		return (webshims.inputTypes[type]) ? type : elem.type;
	},
	cacheType = function(cache, input){
		if(!('type' in cache)){
			cache.type = getType.call(input);
		}
	}
;

(function(){
	if('querySelector' in document){
		try {
			bugs.findRequired = !($('<form action="#" style="width: 1px; height: 1px; overflow: hidden;"><select name="b" required="" /></form>')[0].querySelector('select:required'));
		} catch(er){
			bugs.findRequired = false;
		}
		
		if (bugs.bustedValidity || bugs.findRequired) {
			(function(){
				var find = $.find;
				var matchesSelector = $.find.matchesSelector;

				var regExp = /(\:valid|\:invalid|\:optional|\:required)(?=[\s\[\~\.\+\>\:\#*]|$)/ig;
				var regFn = function(sel){
					return sel + '-element';
				};
				
				$.find = (function(){
					var slice = Array.prototype.slice;
					var fn = function(sel){
						var ar = arguments;
						ar = slice.call(ar, 1, ar.length);
						ar.unshift(sel.replace(regExp, regFn));
						return find.apply(this, ar);
					};
					for (var i in find) {
						if(find.hasOwnProperty(i)){
							fn[i] = find[i];
						}
					}
					return fn;
				})();
				if(!Modernizr.prefixed || Modernizr.prefixed("matchesSelector", document.documentElement)){
					$.find.matchesSelector = function(node, expr){
						expr = expr.replace(regExp, regFn);
						return matchesSelector.call(this, node, expr);
					};
				}
				
			})();
		}
	}
})();

//API to add new input types
webshims.addInputType = function(type, obj){
	typeModels[type] = obj;
};

//contsrain-validation-api
var validityPrototype = {
	customError: false,

	typeMismatch: false,
	badInput: false,
	rangeUnderflow: false,
	rangeOverflow: false,
	stepMismatch: false,
	tooLong: false,
	tooShort: false,
	patternMismatch: false,
	valueMissing: false,
	
	valid: true
};

var isPlaceholderOptionSelected = function(select){
	if(select.type == 'select-one' && select.size < 2){
		var option = $('> option:first-child', select);
		return !!option.prop('selected');
	} 
	return false;
};

var emptyJ = $([]);
var getGroupElements = function(elem){
	elem = $(elem);
	var name, form;
	var ret = emptyJ;
	if(elem[0].type == 'radio'){
		name = elem[0].name;
		if(!name){
			ret = elem;
		} else {
			form = elem.prop('form');
			ret = $(document.getElementsByName(name)).filter(function(){
				return this.type == 'radio' && this.name == name && $.prop(this, 'form') == form;
			});
		}
	}
	return ret;
};
var patternTypes = {url: 1, email: 1, text: 1, search: 1, tel: 1, password: 1};
var lengthTypes = $.extend({textarea: 1}, patternTypes);

var validityRules = {
		valueMissing: function(input, val, cache){
			if(!input.prop('required')){return false;}
			var ret = false;
			cacheType(cache, input[0]);
			if(cache.nodeName == 'select'){
				ret = (!val && (input[0].selectedIndex < 0 || isPlaceholderOptionSelected(input[0]) ));
			} else if(checkTypes[cache.type]){
				ret = (cache.type == 'checkbox') ? !input.is(':checked') : !getGroupElements(input).filter(':checked')[0];
			} else {
				ret = !(val);
			}
			return ret;
		},
		patternMismatch: function(input, val, cache) {
			var i;
			var ret = false;
			if(val === '' || cache.nodeName == 'select'){return ret;}

			cacheType(cache, input[0]);

			if(!patternTypes[cache.type]){return ret;}
			var pattern = input.attr('pattern');
			if(!pattern){return ret;}
			try {
				pattern = new RegExp('^(?:' + pattern + ')$');
			} catch(er){
				webshims.error('invalid pattern value: "'+ pattern +'" | '+ er);
				pattern = ret;
			}
			if(!pattern){return ret;}

			val = cache.type == 'email' && input.prop('multiple') ? val.split(splitReg) : [val];

			for(i = 0; i < val.length; i++){
				if(!pattern.test(val[i])){
					ret = true;
					break;
				}
			}
			return ret;
		}
	}
;

$.each({tooShort: ['minLength', -1], tooLong: ['maxLength', 1]}, function(name, props){
	validityRules[name] = function(input, val, cache){
		//defaultValue is not the same as dirty flag, but very similiar
		if(cache.nodeName == 'select' || input.prop('defaultValue') == val){return false;}

		cacheType(cache, input[0]);

		if(!lengthTypes[cache.type]){return false;}
		var prop = input.prop(props[0]);
		
		return ( prop > 0 && prop * props[1] < val.length * props[1] );
	};
});

$.each({typeMismatch: 'mismatch', badInput: 'bad'}, function(name, fn){
	validityRules[name] = function (input, val, cache){
		if(val === '' || cache.nodeName == 'select'){return false;}
		var ret = false;

		cacheType(cache, input[0]);
		
		if(typeModels[cache.type] && typeModels[cache.type][fn]){
			ret = typeModels[cache.type][fn](val, input);
		} else if('validity' in input[0] && ('name' in input[0].validity)){
			ret = input[0].validity[name] || false;
		}
		return ret;
	};
});

webshims.addValidityRule = function(type, fn){
	validityRules[type] = fn;
};

$.event.special.invalid = {
	add: function(){
		$.event.special.invalid.setup.call(this.form || this);
	},
	setup: function(){
		var form = this.form || this;
		if( $.data(form, 'invalidEventShim') ){
			form = null;
			return;
		}
		$(form)
			.data('invalidEventShim', true)
			.on('submit', $.event.special.invalid.handler)
		;
		webshims.moveToFirstEvent(form, 'submit');
		if(webshims.bugs.bustedValidity && $.nodeName(form, 'form')){
			(function(){
				var noValidate = form.getAttribute('novalidate');
				form.setAttribute('novalidate', 'novalidate');
				webshims.data(form, 'bustedNoValidate', (noValidate == null) ? null : noValidate);
			})();
		}
		form = null;
	},
	teardown: $.noop,
	handler: function(e, d){
		
		if( e.type != 'submit' || e.testedValidity || !e.originalEvent || !$.nodeName(e.target, 'form') || $.prop(e.target, 'noValidate') ){return;}
		
		e.testedValidity = true;
		var notValid = !($(e.target).callProp('reportValidity'));
		if(notValid){
			e.stopImmediatePropagation();
			if(!options.noFormInvalid){
				$(e.target).trigger('invalid');
			}
			return false;
		}
	}
};

$.event.special.submit = $.event.special.submit || {setup: function(){return false;}};
var submitSetup = $.event.special.submit.setup;
$.extend($.event.special.submit, {
	setup: function(){
		if($.nodeName(this, 'form')){
			$(this).on('invalid', $.noop);
		} else {
			$('form', this).on('invalid', $.noop);
		}
		return submitSetup.apply(this, arguments);
	}
});

webshims.ready('form-shim-extend2 WINDOWLOAD', function(){
	$(window).on('invalid', $.noop);
});


webshims.addInputType('email', {
	mismatch: (function(){
		//taken from http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
		var test = cfg.emailReg || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		return function(val, input){
			var i;
			var ret = false;
			if(val){
				val = input.prop('multiple') ? val.split(splitReg) : [val];
				for(i = 0; i < val.length; i++){
					if(!test.test(val[i])){
						ret = true;
						break;
					}
				}
			}
			return ret;
		};
	})()
});

webshims.addInputType('url', {
	mismatch: (function(){
		//taken from scott gonzales
		var test = cfg.urlReg || /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
		return function(val){
			return val && !test.test(val);
		};
	})()
});

webshims.defineNodeNameProperty('input', 'type', {
	prop: {
		get: getType
	}
});

// IDLs for constrain validation API
//ToDo: add object to this list
webshims.defineNodeNamesProperties(['button', 'fieldset', 'output'], {
	checkValidity: {
		value: function(){return true;}
	},
	reportValidity: {
		value: function(){return true;}
	},
	willValidate: {
		value: false
	},
	setCustomValidity: {
		value: $.noop
	},
	validity: {
		writeable: false,
		get: function(){
			return $.extend({}, validityPrototype);
		}
	}
}, 'prop');

var baseCheckValidity = function(elem, type){
	var e,
		v = $.prop(elem, 'validity')
	;
	if(v){
		$.data(elem, 'cachedValidity', v);
	} else {
		return true;
	}
	if( !v.valid ){
		e = $.Event('invalid');
		var jElm = $(elem).trigger(e);
		if(type == 'reportValidity' && !baseCheckValidity.unhandledInvalids && !e.isDefaultPrevented()){
			webshims.validityAlert.showFor(jElm);
			baseCheckValidity.unhandledInvalids = true;
		}
	}
	$.removeData(elem, 'cachedValidity');
	return v.valid;
};
var rsubmittable = /^(?:select|textarea|input)/i;

['checkValidity', 'reportValidity'].forEach(function(name){
	webshims.defineNodeNameProperty('form', name, {
		prop: {
			value: function(){
				
				var ret = true,
					elems = $($.prop(this, 'elements')).filter(function(){
						if(!rsubmittable.test(this.nodeName)){return false;}
						var shadowData = webshims.data(this, 'shadowData');
						return !shadowData || !shadowData.nativeElement || shadowData.nativeElement === this;
					})
				;
				
				baseCheckValidity.unhandledInvalids = false;
				for(var i = 0, len = elems.length; i < len; i++){
					if( !baseCheckValidity(elems[i], name) ){
						ret = false;
					}
				}
				return ret;
			}
		}
	});
});




['input', 'textarea', 'select'].forEach(function(nodeName){
	var inputValidationAPI = {
		setCustomValidity: {
			value: function(error){
				$.removeData(this, 'cachedValidity');
				webshims.data(this, 'customvalidationMessage', ''+error);
				if(bugs.bustedValidity && inputValidationAPI.setCustomValidity.prop._supvalue){
					inputValidationAPI.setCustomValidity.prop._supvalue.apply(this, arguments);
				}
			}
		},
		willValidate: {
			writeable: false,
			get: (function(){
				var types = {
						button: 1,
						reset: 1,
						hidden: 1,
						image: 1
					}
				;
				return function(){
					var elem = $(this).getNativeElement()[0];
					return !!(!elem.readOnly && !types[elem.type] && !$(elem).is(':disabled') );
				};
			})()
		},
		validity: {
			writeable: false,
			get: function(){
				var jElm = $(this).getNativeElement();
				var elem = jElm[0];
				var validityState = $.data(elem, 'cachedValidity');
				if(validityState){
					return validityState;
				}
				validityState = $.extend({}, validityPrototype);
				
				if( !$.prop(elem, 'willValidate') || elem.type == 'submit' ){
					return validityState;
				}
				var val = jElm.val();
				var cache = {nodeName: elem.nodeName.toLowerCase()};
				
				validityState.customError = !!(webshims.data(elem, 'customvalidationMessage'));
				if( validityState.customError ){
					validityState.valid = false;
				}
								
				$.each(validityRules, function(rule, fn){
					if (fn(jElm, val, cache)) {
						validityState[rule] = true;
						validityState.valid = false;
					}
				});
				$(this).getShadowFocusElement().attr('aria-invalid',  validityState.valid ? 'false' : 'true');
				jElm = null;
				elem = null;
				return validityState;
			}
		}
	};
	
	['checkValidity', 'reportValidity'].forEach(function(name){
		inputValidationAPI[name] = {
			value: function(){
				baseCheckValidity.unhandledInvalids = false;
				return baseCheckValidity($(this).getNativeElement()[0], name);
			}
		};
	});
	
	webshims.defineNodeNameProperties(nodeName, inputValidationAPI, 'prop');
});


webshims.defineNodeNamesBooleanProperty(['input', 'textarea', 'select'], 'required', {
	set: function(value){
		$(this).getShadowFocusElement().attr('aria-required', !!(value)+'');
	},
	initAttr: true
});
webshims.defineNodeNamesBooleanProperty(['input'], 'multiple');

if(bugs.bustedValidity){
	
	webshims.defineNodeNameProperty('form', 'novalidate', {
		attr: {
			set: function(val){
				webshims.data(this, 'bustedNoValidate', ''+val);
			},
			get: function(){
				var ret = webshims.data(this, 'bustedNoValidate');
				return ret == null ? undefined : ret;
			}
		},
		removeAttr: {
			value: function(){
				webshims.data(this, 'bustedNoValidate', null);
			}
		}
	});
	
	$.each(['rangeUnderflow', 'rangeOverflow', 'stepMismatch'], function(i, name){
		validityRules[name] = function(elem){
			return (elem[0].validity || {})[name] || false;
		};
	});
	
}

webshims.defineNodeNameProperty('form', 'noValidate', {
	prop: {
		set: function(val){
			val = !!val;
			if(val){
				$.attr(this, 'novalidate', 'novalidate');
			} else {
				$(this).removeAttr('novalidate');
			}
		},
		get: function(){
			return $.attr(this, 'novalidate') != null;
		}
	}
});

['minlength', 'minLength'].forEach(function(propName){
	webshims.defineNodeNamesProperty(['input', 'textarea'], propName, {
			prop: {
				set: function(val){
					val *= 1;
					if(val < 0){
						throw('INDEX_SIZE_ERR');
					}
					this.setAttribute('minlength', val || 0);
				},
				get: function(){
					var val = this.getAttribute('minlength');
					return val == null ? -1 : (val * 1) || 0;
				}
			}
	});
});

if(Modernizr.inputtypes.date && /webkit/i.test(navigator.userAgent)){
	(function(){
		
		var noInputTriggerEvts = {updateInput: 1, input: 1},
			fixInputTypes = {
				date: 1,
				time: 1,
				month: 1,
				week: 1,
				"datetime-local": 1
			},
			noFocusEvents = {
				focusout: 1,
				blur: 1
			},
			changeEvts = {
				updateInput: 1,
				change: 1
			},
			observe = function(input){
				var timer,
					focusedin = true,
					lastInputVal = input.prop('value'),
					lastChangeVal = lastInputVal,
					trigger = function(e){
						//input === null
						if(!input){return;}
						var newVal = input.prop('value');
						
						if(newVal !== lastInputVal){
							lastInputVal = newVal;
							if(!e || !noInputTriggerEvts[e.type]){
								input.trigger('input');
							}
						}
						if(e && changeEvts[e.type]){
							lastChangeVal = newVal;
						}
						if(!focusedin && newVal !== lastChangeVal){
							input.trigger('change');
						}
					},
					extraTimer,
					extraTest = function(){
						clearTimeout(extraTimer);
						extraTimer = setTimeout(trigger, 9);
					},
					unbind = function(e){
						clearInterval(timer);
						setTimeout(function(){
							if(e && noFocusEvents[e.type]){
								focusedin = false;
							}
							if(input){
								input.off('focusout blur', unbind).off('input change updateInput', trigger);
								trigger();
							}
							input = null;
						}, 1);
						
					}
				;
				
				clearInterval(timer);
				timer = setInterval(trigger, 160);
				extraTest();
				input
					.off({
						'focusout blur': unbind,
						'input change updateInput': trigger
					})
					.on({
						'focusout blur': unbind,
						'input updateInput change': trigger
					})
				;
			}
		;
		
		
		$(document)
			.on('focusin', function(e){
				if( e.target && fixInputTypes[e.target.type] && !e.target.readOnly && !e.target.disabled ){
					observe($(e.target));
				}
			})
		;
		
		
	})();
}

webshims.addReady(function(context, contextElem){
	//start constrain-validation
	var focusElem;
	$('form', context)
		.add(contextElem.filter('form'))
		.on('invalid', $.noop)
	;
	
	try {
		if(context == document && !('form' in (document.activeElement || {}))) {
			focusElem = $(context.querySelector('input[autofocus], select[autofocus], textarea[autofocus]')).eq(0).getShadowFocusElement()[0];
			if (focusElem && focusElem.offsetHeight && focusElem.offsetWidth) {
				focusElem.focus();
			}
		}
	} 
	catch (er) {}
	
});

if(!Modernizr.input.list){
	webshims.defineNodeNameProperty('datalist', 'options', {
		prop: {
			writeable: false,
			get: function(){
				var elem = this;
				var select = $('select', elem);
				var options;
				if(select[0]){
					options = $.makeArray(select[0].options || []);
				} else {
					options = elem.getElementsByTagName('option');
					if(options.length){
						webshims.warn('you should wrap your option-elements for a datalist in a select element to support IE and other old browsers.');
					}
				}
				return options;
			}
		}
	});
}



var submitterTypes = {submit: 1, button: 1, image: 1};
var formSubmitterDescriptors = {};
[
	{
		name: "enctype",
		limitedTo: {
			"application/x-www-form-urlencoded": 1,
			"multipart/form-data": 1,
			"text/plain": 1
		},
		defaultProp: "application/x-www-form-urlencoded",
		proptype: "enum"
	},
	{
		name: "method",
		limitedTo: {
			"get": 1,
			"post": 1
		},
		defaultProp: "get",
		proptype: "enum"
	},
	{
		name: "action",
		proptype: "url"
	},
	{
		name: "target"
	},
	{
		name: "novalidate",
		propName: "noValidate",
		proptype: "boolean"
	}
].forEach(function(desc){
	var propName = 'form'+ (desc.propName || desc.name).replace(/^[a-z]/, function(f){
		return f.toUpperCase();
	});
	var attrName = 'form'+ desc.name;
	var formName = desc.name;
	var eventName = 'click.webshimssubmittermutate'+formName;
	
	var changeSubmitter = function(){
		var elem = this;
		if( !('form' in elem) || !submitterTypes[elem.type] ){return;}
		var form = $.prop(elem, 'form');
		if(!form){return;}
		var attr = $.attr(elem, attrName);
		if(attr != null && ( !desc.limitedTo || attr.toLowerCase() === $.prop(elem, propName))){
			
			var oldAttr = $.attr(form, formName);
			
			$.attr(form, formName, attr);
			setTimeout(function(){
				if(oldAttr != null){
					$.attr(form, formName, oldAttr);
				} else {
					try {
						$(form).removeAttr(formName);
					} catch(er){
						form.removeAttribute(formName);
					}
				}
			}, 9);
		}
	};
	
	

switch(desc.proptype) {
		case "url":
			var urlForm = document.createElement('form');
			formSubmitterDescriptors[propName] = {
				prop: {
					set: function(value){
						$.attr(this, attrName, value);
					},
					get: function(){
						var value = $.attr(this, attrName);
						if(value == null){return '';}
						urlForm.setAttribute('action', value);
						return urlForm.action;
					}
				}
			};
			break;
		case "boolean":
			formSubmitterDescriptors[propName] = {
				prop: {
					set: function(val){
						val = !!val;
						if(val){
							$.attr(this, 'formnovalidate', 'formnovalidate');
						} else {
							$(this).removeAttr('formnovalidate');
						}
					},
					get: function(){
						return $.attr(this, 'formnovalidate') != null;
					}
				}
			};
			break;
		case "enum":
			formSubmitterDescriptors[propName] = {
				prop: {
					set: function(value){
						$.attr(this, attrName, value);
					},
					get: function(){
						var value = $.attr(this, attrName);
						return (!value || ( (value = value.toLowerCase()) && !desc.limitedTo[value] )) ? desc.defaultProp : value;
					}
				}
		};
		break;
		default:
			formSubmitterDescriptors[propName] = {
				prop: {
					set: function(value){
						$.attr(this, attrName, value);
					},
					get: function(){
						var value = $.attr(this, attrName);
						return (value != null) ? value : "";
					}
				}
			};
	}


	if(!formSubmitterDescriptors[attrName]){
		formSubmitterDescriptors[attrName] = {};
	}
	formSubmitterDescriptors[attrName].attr = {
		set: function(value){
			formSubmitterDescriptors[attrName].attr._supset.call(this, value);
			$(this).off(eventName).on(eventName, changeSubmitter);
		},
		get: function(){
			return formSubmitterDescriptors[attrName].attr._supget.call(this);
		}
	};
	formSubmitterDescriptors[attrName].initAttr = true;
	formSubmitterDescriptors[attrName].removeAttr = {
		value: function(){
			$(this).off(eventName);
			formSubmitterDescriptors[attrName].removeAttr._supvalue.call(this);
		}
	};
});

webshims.defineNodeNamesProperties(['input', 'button'], formSubmitterDescriptors);

}); //webshims.ready end
