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
	
	
});