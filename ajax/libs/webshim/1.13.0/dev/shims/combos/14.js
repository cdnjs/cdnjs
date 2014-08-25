webshims.register('form-native-extend', function($, webshims, window, doc, undefined, options){
	"use strict";
	var Modernizr = window.Modernizr;
	var modernizrInputTypes = Modernizr.inputtypes;
	if(!Modernizr.formvalidation || webshims.bugs.bustedValidity){return;}
	var typeModels = webshims.inputTypes;
	var runTest = false;
	var validityRules = {};
	var updateValidity = (function(){
		var timer;
		var getValidity = function(){
			$(this).prop('validity');
		};
		var update = function(){
			$('input').each(getValidity);
		};
		return function(){
			clearTimeout(timer);
			timer = setTimeout(update, 9);
		};
	})();
	webshims.addInputType = function(type, obj){
		typeModels[type] = obj;
		runTest = true;
		//update validity of all implemented input types
		if($.isDOMReady && Modernizr.formvalidation && !webshims.bugs.bustedValidity){
			updateValidity();
		}
	};
	
	webshims.addValidityRule = function(type, fn){
		validityRules[type] = fn;
	};
	
	$.each({typeMismatch: 'mismatch', badInput: 'bad'}, function(name, fn){
		webshims.addValidityRule(name, function (input, val, cache, validityState){
			if(val === ''){return false;}
			var ret = validityState[name];
			if(!('type' in cache)){
				cache.type = (input[0].getAttribute('type') || '').toLowerCase();
			}
			
			if(typeModels[cache.type] && typeModels[cache.type][fn]){
				ret = typeModels[cache.type][fn](val, input);
			}
			return ret || false;
		});
	});
	
	var formsExtModule = webshims.modules['form-number-date-api'];
	var overrideValidity = formsExtModule.loaded && !formsExtModule.test();
	var validityProps = ['customError', 'badInput','typeMismatch','rangeUnderflow','rangeOverflow','stepMismatch','tooLong', 'tooShort','patternMismatch','valueMissing','valid'];
	
	var validityChanger = ['value'];
	var validityElements = [];
	var testValidity = function(elem, init){
		if(!elem && !runTest){return;}
		var type = (elem.getAttribute && elem.getAttribute('type') || elem.type || '').toLowerCase();
		if(typeModels[type]){
			$.prop(elem, 'validity');
		}
	};
	
	var oldSetCustomValidity = {};
	['input', 'textarea', 'select'].forEach(function(name){
		var desc = webshims.defineNodeNameProperty(name, 'setCustomValidity', {
			prop: {
				value: function(error){
					error = error+'';
					var elem = (name == 'input') ? $(this).getNativeElement()[0] : this;
					desc.prop._supvalue.call(elem, error);
					
					
					if(overrideValidity){
						webshims.data(elem, 'hasCustomError', !!(error));
						testValidity(elem);
					}
				}
			}
		});
		oldSetCustomValidity[name] = desc.prop._supvalue;
	});
		
	
	if(overrideValidity){
		validityChanger.push('min');
		validityChanger.push('max');
		validityChanger.push('step');
		validityElements.push('input');
	}
	
	
	if(overrideValidity){
		var stopValidity;
		validityElements.forEach(function(nodeName){
			
			var oldDesc = webshims.defineNodeNameProperty(nodeName, 'validity', {
				prop: {
					get: function(){
						if(stopValidity){return;}
						var elem = (nodeName == 'input') ? $(this).getNativeElement()[0] : this;
						
						var validity = oldDesc.prop._supget.call(elem);
						
						if(!validity){
							return validity;
						}
						var validityState = {};
						validityProps.forEach(function(prop){
							validityState[prop] = validity[prop] || false;
						});
						
						if( !$.prop(elem, 'willValidate') ){
							return validityState;
						}
						stopValidity = true;
						var jElm 			= $(elem),
							cache 			= {type: (elem.getAttribute && elem.getAttribute('type') || elem.type || '').toLowerCase(), nodeName: (elem.nodeName || '').toLowerCase()},
							val				= jElm.val(),
							customError 	= !!(webshims.data(elem, 'hasCustomError')),
							setCustomMessage
						;
						stopValidity = false;
						validityState.customError = customError;
						
						if( validityState.valid && validityState.customError ){
							validityState.valid = false;
						} else if(!validityState.valid) {
							var allFalse = true;
							$.each(validityState, function(name, prop){
								if(prop){
									allFalse = false;
									return false;
								}
							});
							
							if(allFalse){
								validityState.valid = true;
							}
							
						}
						
						$.each(validityRules, function(rule, fn){
							validityState[rule] = fn(jElm, val, cache, validityState);
							if( validityState[rule] && (validityState.valid || !setCustomMessage) && ((typeModels[cache.type])) ) {
								oldSetCustomValidity[nodeName].call(elem, webshims.createValidationMessage(elem, rule));
								validityState.valid = false;
								setCustomMessage = true;
							}
						});
						if(validityState.valid){
							oldSetCustomValidity[nodeName].call(elem, '');
							webshims.data(elem, 'hasCustomError', false);
						}
						return validityState;
					},
					writeable: false
					
				}
			});
		});

		validityChanger.forEach(function(prop){
			webshims.onNodeNamesPropertyModify(validityElements, prop, function(s){
				testValidity(this);
			});
		});
		
		if(doc.addEventListener){
			var inputThrottle;
			var testPassValidity = function(e){
				if(!('form' in e.target)){return;}
				clearTimeout(inputThrottle);
				testValidity(e.target);
			};
			
			doc.addEventListener('change', testPassValidity, true);
			
			
			doc.addEventListener('input', function(e){
				clearTimeout(inputThrottle);
				inputThrottle = setTimeout(function(){
					testValidity(e.target);
				}, 290);
			}, true);
		}
		
		var validityElementsSel = validityElements.join(',');	
		
		webshims.addReady(function(context, elem){
			if(runTest){
				$(validityElementsSel, context).add(elem.filter(validityElementsSel)).each(function(){
					testValidity(this);
				});
			}
		});
		
		
	} //end: overrideValidity
	
	webshims.defineNodeNameProperty('input', 'type', {
		prop: {
			get: function(){
				var elem = this;
				var type = (elem.getAttribute && elem.getAttribute('type') || '').toLowerCase();
				return (webshims.inputTypes[type]) ? type : elem.type;
			}
		}
	});
	
	
});;webshims.register('form-message', function($, webshims, window, document, undefined, options){
	"use strict";
	if(options.lazyCustomMessages){
		options.customMessages = true;
	}
	var validityMessages = webshims.validityMessages;
	
	var implementProperties = options.customMessages ? ['customValidationMessage'] : [];
	
	validityMessages.en = $.extend(true, {
		typeMismatch: {
			defaultMessage: 'Please enter a valid value.',
			email: 'Please enter an email address.',
			url: 'Please enter a URL.'
		},
		badInput: {
			defaultMessage: 'Please enter a valid value.',
			number: 'Please enter a number.',
			date: 'Please enter a date.',
			time: 'Please enter a time.',
			range: 'Invalid input.',
			month: 'Please enter a valid value.',
			"datetime-local": 'Please enter a datetime.'
		},
		rangeUnderflow: {
			defaultMessage: 'Value must be greater than or equal to {%min}.'
		},
		rangeOverflow: {
			defaultMessage: 'Value must be less than or equal to {%max}.'
		},
		stepMismatch: 'Invalid input.',
		tooLong: 'Please enter at most {%maxlength} character(s). You entered {%valueLen}.',
		tooShort: 'Please enter at least {%minlength} character(s). You entered {%valueLen}.',
		patternMismatch: 'Invalid input. {%title}',
		valueMissing: {
			defaultMessage: 'Please fill out this field.',
			checkbox: 'Please check this box if you want to proceed.'
		}
	}, (validityMessages.en || validityMessages['en-US'] || {}));
	
	if(typeof validityMessages['en'].valueMissing == 'object'){
		['select', 'radio'].forEach(function(type){
			validityMessages.en.valueMissing[type] = validityMessages.en.valueMissing[type] || 'Please select an option.';
		});
	}
	if(typeof validityMessages.en.rangeUnderflow == 'object'){
		['date', 'time', 'datetime-local', 'month'].forEach(function(type){
			validityMessages.en.rangeUnderflow[type] = validityMessages.en.rangeUnderflow[type] || 'Value must be at or after {%min}.';
		});
	}
	if(typeof validityMessages.en.rangeOverflow == 'object'){
		['date', 'time', 'datetime-local', 'month'].forEach(function(type){
			validityMessages.en.rangeOverflow[type] = validityMessages.en.rangeOverflow[type] || 'Value must be at or before {%max}.';
		});
	}
	if(!validityMessages['en-US']){
		validityMessages['en-US'] = $.extend(true, {}, validityMessages.en);
	}
	if(!validityMessages['en-GB']){
		validityMessages['en-GB'] = $.extend(true, {}, validityMessages.en);
	}
	if(!validityMessages['en-AU']){
		validityMessages['en-AU'] = $.extend(true, {}, validityMessages.en);
	}
	validityMessages[''] = validityMessages[''] || validityMessages['en-US'];
	
	validityMessages.de = $.extend(true, {
		typeMismatch: {
			defaultMessage: '{%value} ist in diesem Feld nicht zulässig.',
			email: '{%value} ist keine gültige E-Mail-Adresse.',
			url: '{%value} ist kein(e) gültige(r) Webadresse/Pfad.'
		},
		badInput: {
			defaultMessage: 'Geben Sie einen zulässigen Wert ein.',
			number: 'Geben Sie eine Nummer ein.',
			date: 'Geben Sie ein Datum ein.',
			time: 'Geben Sie eine Uhrzeit ein.',
			month: 'Geben Sie einen Monat mit Jahr ein.',
			range: 'Geben Sie eine Nummer.',
			"datetime-local": 'Geben Sie ein Datum mit Uhrzeit ein.'
		},
		rangeUnderflow: {
			defaultMessage: '{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen können.'
		},
		rangeOverflow: {
			defaultMessage: '{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen können.'
		},
		stepMismatch: 'Der Wert {%value} ist in diesem Feld nicht zulässig. Hier sind nur bestimmte Werte zulässig. {%title}',
		tooLong: 'Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.',
		tooShort: 'Der eingegebene Text ist zu kurz! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%minlength} das Minimum.',
		patternMismatch: '{%value} hat für dieses Eingabefeld ein falsches Format. {%title}',
		valueMissing: {
			defaultMessage: 'Bitte geben Sie einen Wert ein.',
			checkbox: 'Bitte aktivieren Sie das Kästchen.'
		}
	}, (validityMessages.de || {}));
	
	if(typeof validityMessages.de.valueMissing == 'object'){
		['select', 'radio'].forEach(function(type){
			validityMessages.de.valueMissing[type] = validityMessages.de.valueMissing[type] || 'Bitte wählen Sie eine Option aus.';
		});
	}
	if(typeof validityMessages.de.rangeUnderflow == 'object'){
		['date', 'time', 'datetime-local', 'month'].forEach(function(type){
			validityMessages.de.rangeUnderflow[type] = validityMessages.de.rangeUnderflow[type] || '{%value} ist zu früh. {%min} ist die früheste Zeit, die Sie benutzen können.';
		});
	}
	if(typeof validityMessages.de.rangeOverflow == 'object'){
		['date', 'time', 'datetime-local', 'month'].forEach(function(type){
			validityMessages.de.rangeOverflow[type] = validityMessages.de.rangeOverflow[type] || '{%value} ist zu spät. {%max} ist die späteste Zeit, die Sie benutzen können.';
		});
	}
	
	var currentValidationMessage =  validityMessages[''];
	var getMessageFromObj = function(message, elem){
		if(message && typeof message !== 'string'){
			message = message[ $.prop(elem, 'type') ] || message[ (elem.nodeName || '').toLowerCase() ] || message[ 'defaultMessage' ];
		}
		return message || '';
	};
	var lReg = /</g;
	var gReg = />/g;
	var valueVals = {
		value: 1,
		min: 1,
		max: 1
	};
	var toLocale = (function(){
		var monthFormatter;
		var transforms = {
			number: function(val){
				var num = val * 1;
				if(num.toLocaleString && !isNaN(num)){
					val = num.toLocaleString() || val;
				}
				return val;
			}
		};
		var _toLocale = function(val, elem, attr){
			var type, widget;
			if(valueVals[attr]){
				type = $.prop(elem, 'type');
				widget = $(elem).getShadowElement().data('wsWidget'+ type );
				if(widget && widget.formatValue){
					val = widget.formatValue(val, false);
				} else if(transforms[type]){
					val = transforms[type](val);
				}
			}
			return val;
		};

		[{n: 'date', f: 'toLocaleDateString'}, {n: 'time', f: 'toLocaleTimeString'}, {n: 'datetime-local', f: 'toLocaleString'}].forEach(function(desc){
			transforms[desc.n] = function(val){
				var date = new Date(val);
				if(date && date[desc.f]){
					val = date[desc.f]() || val;
				}
				return val;
			};
		});

		if(window.Intl && Intl.DateTimeFormat){
			monthFormatter = new Intl.DateTimeFormat(navigator.browserLanguage || navigator.language, {year: "numeric", month: "2-digit"}).format(new Date());
			if(monthFormatter && monthFormatter.format){
				transforms.month = function(val){
					var date = new Date(val);
					if(date){
						val = monthFormatter.format(date) || val;
					}
					return val;
				};
			}
		}

		webshims.format =  {};

		['date', 'number', 'month', 'time', 'datetime-local'].forEach(function(name){
			webshims.format[name] = function(val, opts){
				if(opts && opts.nodeType){
					return _toLocale(val, opts, name);
				}
				if(name == 'number' && opts && opts.toFixed ){
					val = (val * 1);
					if(!opts.fixOnlyFloat || val % 1){
						val = val.toFixed(opts.toFixed);
					}
				}
				if(webshims._format && webshims._format[name]){
					return webshims._format[name](val, opts);
				}
				return transforms[name](val);
			};
		});

		return _toLocale;
	})();

	webshims.replaceValidationplaceholder = function(elem, message, name){
		var val = $.prop(elem, 'title');
		if(message){
			if(name == 'patternMismatch' && !val){
				webshims.error('no title for patternMismatch provided. Always add a title attribute.');
			}
			if(val){
				val = '<span class="ws-titlevalue">'+ val.replace(lReg, '&lt;').replace(gReg, '&gt;') +'</span>';
			}

			if(message.indexOf('{%title}') != -1){
				message = message.replace('{%title}', val);
			} else if(val) {
				message = message+' '+val;
			}
		}

		if(message && message.indexOf('{%') != -1){
			['value', 'min', 'max', 'maxlength', 'minlength', 'label'].forEach(function(attr){
				if(message.indexOf('{%'+attr) === -1){return;}
				var val = ((attr == 'label') ? $.trim($('label[for="'+ elem.id +'"]', elem.form).text()).replace(/\*$|:$/, '') : $.prop(elem, attr)) || '';
				val = ''+val;


				val = toLocale(val, elem, attr);

				message = message.replace('{%'+ attr +'}', val.replace(lReg, '&lt;').replace(gReg, '&gt;'));
				if('value' == attr){
					message = message.replace('{%valueLen}', val.length);
				}

			});
		}
		return message;
	};
	
	webshims.createValidationMessage = function(elem, name){

		var message = getMessageFromObj(currentValidationMessage[name], elem);
		if(!message && name == 'badInput'){
			message = getMessageFromObj(currentValidationMessage.typeMismatch, elem);
		}
		if(!message && name == 'typeMismatch'){
			message = getMessageFromObj(currentValidationMessage.badInput, elem);
		}
		if(!message){
			message = getMessageFromObj(validityMessages[''][name], elem) || $.prop(elem, 'validationMessage');
			if(name != 'customError'){
				webshims.info('could not find errormessage for: '+ name +' / '+ $.prop(elem, 'type') +'. in language: '+webshims.activeLang());
			}
		}
		message = webshims.replaceValidationplaceholder(elem, message, name);
		
		return message || '';
	};
	
	
	if(!Modernizr.formvalidation || webshims.bugs.bustedValidity){
		implementProperties.push('validationMessage');
	}
	
	currentValidationMessage = webshims.activeLang(validityMessages);
		
	$(validityMessages).on('change', function(e, data){
		currentValidationMessage = validityMessages.__active;
	});
	
	implementProperties.forEach(function(messageProp){
		
		webshims.defineNodeNamesProperty(['fieldset', 'output', 'button'], messageProp, {
			prop: {
				value: '',
				writeable: false
			}
		});
		['input', 'select', 'textarea'].forEach(function(nodeName){
			var desc = webshims.defineNodeNameProperty(nodeName, messageProp, {
				prop: {
					get: function(){
						var elem = this;
						var message = '';
						if(!$.prop(elem, 'willValidate')){
							return message;
						}
						
						var validity = $.prop(elem, 'validity') || {valid: 1};
						
						if(validity.valid){return message;}
						message = webshims.getContentValidationMessage(elem, validity);
						
						if(message){return message;}
						
						if(validity.customError && elem.nodeName){
							message = (Modernizr.formvalidation && !webshims.bugs.bustedValidity && desc.prop._supget) ? desc.prop._supget.call(elem) : webshims.data(elem, 'customvalidationMessage');
							if(message){return message;}
						}
						$.each(validity, function(name, prop){
							if(name == 'valid' || !prop){return;}
							
							message = webshims.createValidationMessage(elem, name);
							if(message){
								return false;
							}
						});
						
						return message || '';
					},
					writeable: false
				}
			});
		});
		
	});
});
;webshims.register('form-number-date-api', function($, webshims, window, document, undefined, options){
	"use strict";
	if(!webshims.addInputType){
		webshims.error("you can not call forms-ext feature after calling forms feature. call both at once instead: $.webshims.polyfill('forms forms-ext')");
	}
	
	if(!webshims.getStep){
		webshims.getStep = function(elem, type){
			var step = $.attr(elem, 'step');
			if(step === 'any'){
				return step;
			}
			type = type || getType(elem);
			if(!typeModels[type] || !typeModels[type].step){
				return step;
			}
			step = typeProtos.number.asNumber(step);
			return ((!isNaN(step) && step > 0) ? step : typeModels[type].step) * (typeModels[type].stepScaleFactor || 1);
		};
	}
	if(!webshims.addMinMaxNumberToCache){
		webshims.addMinMaxNumberToCache = function(attr, elem, cache){
			if (!(attr+'AsNumber' in cache)) {
				cache[attr+'AsNumber'] = typeModels[cache.type].asNumber(elem.attr(attr));
				if(isNaN(cache[attr+'AsNumber']) && (attr+'Default' in typeModels[cache.type])){
					cache[attr+'AsNumber'] = typeModels[cache.type][attr+'Default'];
				}
			}
		};
	}
	
	var nan = parseInt('NaN', 10),
		doc = document,
		typeModels = webshims.inputTypes,
		isNumber = function(string){
			return (typeof string == 'number' || (string && string == string * 1));
		},
		supportsType = function(type){
			return ($('<input type="'+type+'" />').prop('type') === type);
		},
		getType = function(elem){
			return (elem.getAttribute('type') || '').toLowerCase();
		},
		isDateTimePart = function(string){
			return (string && !(isNaN(string * 1)));
		},
		addMinMaxNumberToCache = webshims.addMinMaxNumberToCache,
		addleadingZero = function(val, len){
			val = ''+val;
			len = len - val.length;
			for(var i = 0; i < len; i++){
				val = '0'+val;
			}
			return val;
		},
		EPS = 1e-7,
		typeBugs = webshims.bugs.bustedValidity
	;
	
	webshims.addValidityRule('stepMismatch', function(input, val, cache, validityState){
		if(val === ''){return false;}
		if(!('type' in cache)){
			cache.type = getType(input[0]);
		}
		if(cache.type == 'week'){return false;}
		var base, attrVal;
		var ret = (validityState || {}).stepMismatch || false;
		if(typeModels[cache.type] && typeModels[cache.type].step){
			if( !('step' in cache) ){
				cache.step = webshims.getStep(input[0], cache.type);
			}
			
			if(cache.step == 'any'){return false;}
			
			if(!('valueAsNumber' in cache)){
				cache.valueAsNumber = typeModels[cache.type].asNumber( val );
			}
			if(isNaN(cache.valueAsNumber)){return false;}
			
			addMinMaxNumberToCache('min', input, cache);
			base = cache.minAsNumber;
			
			if(isNaN(base) && (attrVal = input.prop('defaultValue'))){
				base = typeModels[cache.type].asNumber( attrVal );
			}
			
			if(isNaN(base)){
				base = typeModels[cache.type].stepBase || 0;
			}
			
			ret =  Math.abs((cache.valueAsNumber - base) % cache.step);
							
			ret = !(  ret <= EPS || Math.abs(ret - cache.step) <= EPS  );
		}
		return ret;
	});
	
	
	
	[{name: 'rangeOverflow', attr: 'max', factor: 1}, {name: 'rangeUnderflow', attr: 'min', factor: -1}].forEach(function(data, i){
		webshims.addValidityRule(data.name, function(input, val, cache, validityState) {
			var ret = (validityState || {})[data.name] || false;
			if(val === ''){return ret;}
			if (!('type' in cache)) {
				cache.type = getType(input[0]);
			}
			if (typeModels[cache.type] && typeModels[cache.type].asNumber) {
				if(!('valueAsNumber' in cache)){
					cache.valueAsNumber = typeModels[cache.type].asNumber( val );
				}
				if(isNaN(cache.valueAsNumber)){
					return false;
				}
				
				addMinMaxNumberToCache(data.attr, input, cache);
				
				if(isNaN(cache[data.attr+'AsNumber'])){
					return ret;
				}
				ret = ( cache[data.attr+'AsNumber'] * data.factor <  cache.valueAsNumber * data.factor - EPS );
			}
			return ret;
		});
	});
	
	webshims.reflectProperties(['input'], ['max', 'min', 'step']);
	
	
	//IDLs and methods, that aren't part of constrain validation, but strongly tight to it
	var valueAsNumberDescriptor = webshims.defineNodeNameProperty('input', 'valueAsNumber', {
		prop: {
			get: function(){
				var elem = this;
				var type = getType(elem);
				var ret = (typeModels[type] && typeModels[type].asNumber) ? 
					typeModels[type].asNumber($.prop(elem, 'value')) :
					(valueAsNumberDescriptor.prop._supget && valueAsNumberDescriptor.prop._supget.apply(elem, arguments));
				if(ret == null){
					ret = nan;
				}
				return ret;
			},
			set: function(val){
				var elem = this;
				var type = getType(elem);
				if(typeModels[type] && typeModels[type].numberToString){
					//is NaN a number?
					if(isNaN(val)){
						$.prop(elem, 'value', '');
						return;
					}
					var set = typeModels[type].numberToString(val);
					if(set !==  false){
						$.prop(elem, 'value', set);
					} else {
						webshims.error('INVALID_STATE_ERR: DOM Exception 11');
					}
				} else if(valueAsNumberDescriptor.prop._supset) {
					 valueAsNumberDescriptor.prop._supset.apply(elem, arguments);
				}
			}
		}
	});
	
	var valueAsDateDescriptor = webshims.defineNodeNameProperty('input', 'valueAsDate', {
		prop: {
			get: function(){
				var elem = this;
				var type = getType(elem);
				return (typeModels[type] && typeModels[type].asDate && !typeModels[type].noAsDate) ? 
					typeModels[type].asDate($.prop(elem, 'value')) :
					valueAsDateDescriptor.prop._supget && valueAsDateDescriptor.prop._supget.call(elem) || null;
			},
			set: function(value){
				var elem = this;
				var type = getType(elem);
				if(typeModels[type] && typeModels[type].dateToString && !typeModels[type].noAsDate){
					
					if(value === null){
						$.prop(elem, 'value', '');
						return '';
					}
					var set = typeModels[type].dateToString(value);
					if(set !== false){
						$.prop(elem, 'value', set);
						return set;
					} else {
						webshims.error('INVALID_STATE_ERR: DOM Exception 11');
					}
				} else {
					return valueAsDateDescriptor.prop._supset && valueAsDateDescriptor.prop._supset.apply(elem, arguments) || null;
				}
			}
		}
	});
	
	$.each({stepUp: 1, stepDown: -1}, function(name, stepFactor){
		var stepDescriptor = webshims.defineNodeNameProperty('input', name, {
			prop: {
				value: function(factor){
					var step, val, valModStep, alignValue, cache, base, attrVal;
					var type = getType(this);
					if(typeModels[type] && typeModels[type].asNumber){
						cache = {type: type};
						if(!factor){
							factor = 1;
							webshims.warn("you should always use a factor for stepUp/stepDown");
						}
						factor *= stepFactor;
						

						

						
						step = webshims.getStep(this, type);
						
						if(step == 'any'){
							webshims.info("step is 'any' can't apply stepUp/stepDown");
							throw('invalid state error');
						}
						
						webshims.addMinMaxNumberToCache('min', $(this), cache);
						webshims.addMinMaxNumberToCache('max', $(this), cache);

						val = $.prop(this, 'valueAsNumber');

						if(factor > 0 && !isNaN(cache.minAsNumber) && (isNaN(val) || cache.minAsNumber > val)){
							$.prop(this, 'valueAsNumber', cache.minAsNumber);
							return;
						} else if(factor < 0 && !isNaN(cache.maxAsNumber) && (isNaN(val) || cache.maxAsNumber < val)){
							$.prop(this, 'valueAsNumber', cache.maxAsNumber);
							return;
						}

						if(isNaN(val)){
							val = 0;
						}

						base = cache.minAsNumber;
						
						if(isNaN(base) && (attrVal = $.prop(this, 'defaultValue'))){
							base = typeModels[type].asNumber( attrVal );
						}
						
						if(!base){
							base = 0;
						}
						
						step *= factor;
						
						val = (val + step).toFixed(5) * 1;
						
						valModStep = (val - base) % step;
						
						if ( valModStep && (Math.abs(valModStep) > EPS) ) {
							alignValue = val - valModStep;
							alignValue += ( valModStep > 0 ) ? step : ( -step );
							val = alignValue.toFixed(5) * 1;
						}
						
						if( (!isNaN(cache.maxAsNumber) && val > cache.maxAsNumber) || (!isNaN(cache.minAsNumber) && val < cache.minAsNumber) ){
							webshims.info("max/min overflow can't apply stepUp/stepDown");
							return;
						}
						
						$.prop(this, 'valueAsNumber', val);
						
					} else if(stepDescriptor.prop && stepDescriptor.prop._supvalue){
						return stepDescriptor.prop._supvalue.apply(this, arguments);
					} else {
						webshims.info("no step method for type: "+ type);
						throw('invalid state error');
					}
				}
			}
		});
	});
	
	/*
	 * ToDO: WEEK
	 */
//	var getWeek = function(date){
//		var time;
//		var checkDate = new Date(date.getTime());
//
//		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
//
//		time = checkDate.getTime();
//		checkDate.setMonth(0);
//		checkDate.setDate(1);
//		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
//	};
//	
//	var setWeek = function(year, week){
//		var date = new Date(year, 0, 1);
//		
//		week = (week - 1) * 86400000 * 7;
//		date = new Date(date.getTime() + week);
//		date.setDate(date.getDate() + 1 - (date.getDay() || 7));
//		return date;
//	};
	
	var typeProtos = {
		
		number: {
			bad: function(val){
				return !(isNumber(val));
			},
			step: 1,
			//stepBase: 0, 0 = default
			stepScaleFactor: 1,
			asNumber: function(str){
				return (isNumber(str)) ? str * 1 : nan;
			},
			numberToString: function(num){
				return (isNumber(num)) ? num : false;
			}
		},
		
		range: {
			minDefault: 0,
			maxDefault: 100
		},
		color: {
			bad: (function(){
				var cReg = /^\u0023[a-f0-9]{6}$/;
				return function(val){
					return (!val || val.length != 7 || !(cReg.test(val)));
				};
			})()
		},
		date: {
			bad: function(val){
				if(!val || !val.split || !(/\d$/.test(val))){return true;}
				var i;
				var valA = val.split(/\u002D/);
				if(valA.length !== 3){return true;}
				var ret = false;
				
				
				if(valA[0].length < 4 || valA[1].length != 2 || valA[1] > 12 || valA[2].length != 2 || valA[2] > 33){
					ret = true;
				} else {
					for(i = 0; i < 3; i++){
						if(!isDateTimePart(valA[i])){
							ret = true;
							break;
						}
					}
				}
				
				return ret || (val !== this.dateToString( this.asDate(val, true) ) );
			},
			step: 1,
			//stepBase: 0, 0 = default
			stepScaleFactor:  86400000,
			asDate: function(val, _noMismatch){
				if(!_noMismatch && this.bad(val)){
					return null;
				}
				return new Date(this.asNumber(val, true));
			},
			asNumber: function(str, _noMismatch){
				var ret = nan;
				if(_noMismatch || !this.bad(str)){
					str = str.split(/\u002D/);
					ret = Date.UTC(str[0], str[1] - 1, str[2]);
				}
				return ret;
			},
			numberToString: function(num){
				return (isNumber(num)) ? this.dateToString(new Date( num * 1)) : false;
			},
			dateToString: function(date){
				return (date && date.getFullYear) ? addleadingZero(date.getUTCFullYear(), 4) +'-'+ addleadingZero(date.getUTCMonth()+1, 2) +'-'+ addleadingZero(date.getUTCDate(), 2) : false;
			}
		},
		/*
		 * ToDO: WEEK
		 */
//		week: {
//			bad: function(val){
//				if(!val || !val.split){return true;}
//				var valA = val.split('-W');
//				var ret = true;
//				if(valA.length == 2 && valA[0].length > 3 && valA.length == 2){
//					ret = this.dateToString(setWeek(valA[0], valA[1])) != val;
//				}
//				return ret;
//			},
//			step: 1,
//			stepScaleFactor: 604800000,
//			stepBase: -259200000,
//			asDate: function(str, _noMismatch){
//				var ret = null;
//				if(_noMismatch || !this.bad(str)){
//					ret = str.split('-W');
//					ret = setWeek(ret[0], ret[1]);
//				}
//				return ret;
//			},
//			asNumber: function(str, _noMismatch){
//				var ret = nan;
//				var date = this.asDate(str, _noMismatch);
//				if(date && date.getUTCFullYear){
//					ret = date.getTime();
//				}
//				return ret;
//			},
//			dateToString: function(date){
//				var week, checkDate;
//				var ret = false;
//				if(date && date.getFullYear){
//					week = getWeek(date);
//					if(week == 1){
//						checkDate = new Date(date.getTime());
//						checkDate.setDate(checkDate.getDate() + 7);
//						date.setUTCFullYear(checkDate.getUTCFullYear());
//					}
//					ret = addleadingZero(date.getUTCFullYear(), 4) +'-W'+addleadingZero(week, 2);
//				}
//				return ret;
//			},
//			numberToString: function(num){
//				return (isNumber(num)) ? this.dateToString(new Date( num * 1)) : false;
//			}
//		},
		time: {
			bad: function(val, _getParsed){
				if(!val || !val.split || !(/\d$/.test(val))){return true;}
				val = val.split(/\u003A/);
				if(val.length < 2 || val.length > 3){return true;}
				var ret = false,
					sFraction;
				if(val[2]){
					val[2] = val[2].split(/\u002E/);
					sFraction = parseInt(val[2][1], 10);
					val[2] = val[2][0];
				}
				$.each(val, function(i, part){
					if(!isDateTimePart(part) || part.length !== 2){
						ret = true;
						return false;
					}
				});
				if(ret){return true;}
				if(val[0] > 23 || val[0] < 0 || val[1] > 59 || val[1] < 0){
					return true;
				}
				if(val[2] && (val[2] > 59 || val[2] < 0 )){
					return true;
				}
				if(sFraction && isNaN(sFraction)){
					return true;
				}
				if(sFraction){
					if(sFraction < 100){
						sFraction *= 100;
					} else if(sFraction < 10){
						sFraction *= 10;
					}
				}
				return (_getParsed === true) ? [val, sFraction] : false;
			},
			step: 60,
			stepBase: 0,
			stepScaleFactor:  1000,
			asDate: function(val){
				val = new Date(this.asNumber(val));
				return (isNaN(val)) ? null : val;
			},
			asNumber: function(val){
				var ret = nan;
				val = this.bad(val, true);
				if(val !== true){
					ret = Date.UTC('1970', 0, 1, val[0][0], val[0][1], val[0][2] || 0);
					if(val[1]){
						ret += val[1];
					}
				}
				return ret;
			},
			dateToString: function(date){
				if(date && date.getUTCHours){
					var str = addleadingZero(date.getUTCHours(), 2) +':'+ addleadingZero(date.getUTCMinutes(), 2),
						tmp = date.getSeconds()
					;
					if(tmp != "0"){
						str += ':'+ addleadingZero(tmp, 2);
					}
					tmp = date.getUTCMilliseconds();
					if(tmp != "0"){
						str += '.'+ addleadingZero(tmp, 3);
					}
					return str;
				} else {
					return false;
				}
			}
		},
		month: {
			bad: function(val){
				return typeProtos.date.bad(val+'-01');
			},
			step: 1,
			stepScaleFactor:  false,
			//stepBase: 0, 0 = default
			asDate: function(val){
				return new Date(typeProtos.date.asNumber(val+'-01'));
			},
			asNumber: function(val){
				//1970-01
				var ret = nan;
				if(val && !this.bad(val)){
					val = val.split(/\u002D/);
					val[0] = (val[0] * 1) - 1970;
					val[1] = (val[1] * 1) - 1;
					ret = (val[0] * 12) + val[1];
				}
				return ret;
			},
			numberToString: function(num){
				var mod;
				var ret = false;
				if(isNumber(num)){
					mod = (num % 12);
					num = ((num - mod) / 12) + 1970;
					mod += 1;
					if(mod < 1){
						num -= 1;
						mod += 12;
					}
					ret = addleadingZero(num, 4)+'-'+addleadingZero(mod, 2);
					
				}
				
				return ret;
			},
			dateToString: function(date){
				if(date && date.getUTCHours){
					var str = typeProtos.date.dateToString(date);
					return (str.split && (str = str.split(/\u002D/))) ? str[0]+'-'+str[1] : false;
				} else {
					return false;
				}
			}
		}
		,'datetime-local': {
			bad: function(val, _getParsed){
				if(!val || !val.split || (val+'special').split(/\u0054/).length !== 2){return true;}
				val = val.split(/\u0054/);
				return ( typeProtos.date.bad(val[0]) || typeProtos.time.bad(val[1], _getParsed) );
			},
			noAsDate: true,
			asDate: function(val){
				val = new Date(this.asNumber(val));
				
				return (isNaN(val)) ? null : val;
			},
			asNumber: function(val){
				var ret = nan;
				var time = this.bad(val, true);
				if(time !== true){
					val = val.split(/\u0054/)[0].split(/\u002D/);
					
					ret = Date.UTC(val[0], val[1] - 1, val[2], time[0][0], time[0][1], time[0][2] || 0);
					if(time[1]){
						ret += time[1];
					}
				}
				return ret;
			},
			dateToString: function(date, _getParsed){
				return typeProtos.date.dateToString(date) +'T'+ typeProtos.time.dateToString(date, _getParsed);
			}
		}
	};
	
	if(typeBugs || !supportsType('range') || !supportsType('time') || !supportsType('month') || !supportsType('datetime-local')){
		typeProtos.range = $.extend({}, typeProtos.number, typeProtos.range);
		typeProtos.time = $.extend({}, typeProtos.date, typeProtos.time);
		typeProtos.month = $.extend({}, typeProtos.date, typeProtos.month);
		typeProtos['datetime-local'] = $.extend({}, typeProtos.date, typeProtos.time, typeProtos['datetime-local']);
	}
	
	//
	['number', 'month', 'range', 'date', 'time', 'color', 'datetime-local'].forEach(function(type){
		if(typeBugs || !supportsType(type)){
			webshims.addInputType(type, typeProtos[type]);
		}
	});
	
	if($('<input />').prop('labels') == null){
		webshims.defineNodeNamesProperty('button, input, keygen, meter, output, progress, select, textarea', 'labels', {
			prop: {
				get: function(){
					if(this.type == 'hidden'){return null;}
					var id = this.id;
					var labels = $(this)
						.closest('label')
						.filter(function(){
							var hFor = (this.attributes['for'] || {});
							return (!hFor.specified || hFor.value == id);
						})
					;
					
					if(id) {
						labels = labels.add('label[for="'+ id +'"]');
					}
					return labels.get();
				},
				writeable: false
			}
		});
	}
	
});
