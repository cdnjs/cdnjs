webshims.register('form-native-extend', function($, webshims, window, doc, undefined, options){
	"use strict";
	var support = webshims.support;
	if(!support.formvalidation || webshims.bugs.bustedValidity){return;}
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
		if($.isDOMReady && support.formvalidation && !webshims.bugs.bustedValidity){
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
;(function($){
	"use strict";

	var isNumber = function(string){
		return (typeof string == 'number' || (string && string == string * 1));
	};
	var retDefault = function(val, def){
		if(!(typeof val == 'number' || (val && val == val * 1))){
			return def;
		}
		return val * 1;
	};
	var createOpts = ['step', 'min', 'max', 'readonly', 'title', 'disabled', 'tabindex'];
	var normalizeTouch = (function(){
		var types = {
			touchstart: 1,
			touchend: 1,
			touchmove: 1
		};
		var normalize = ['pageX', 'pageY'];
		return function(e){
			if(types[e.type] && e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length){
				for(var i = 0; i < normalize.length; i++){
					e[normalize[i]] = e.originalEvent.touches[0][normalize[i]];
				}

			}
			return e;
		};
	})();
	var rangeProto = {
		_create: function(){
			var i;
			
			this.element.addClass(this.options.baseClass || 'ws-range ws-input').attr({role: 'slider'}).append('<span class="ws-range-rail ws-range-track"><span class="ws-range-min ws-range-progress" /><span class="ws-range-thumb"><span><span data-value="" data-valuetext="" /></span></span></span>');
			this.trail = $('.ws-range-track', this.element);
			this.range = $('.ws-range-progress', this.element);
			this.thumb = $('.ws-range-thumb', this.trail);
			this.thumbValue = $('span[data-value]', this.thumb);
			
			this.updateMetrics();
			
			this.orig = this.options.orig;
			
			for(i = 0; i < createOpts.length; i++){
				this[createOpts[i]](this.options[createOpts[i]]);
			}
			
			this.value = this._value;
			this.value(this.options.value);
			this.initDataList();
			this.element.data('rangeUi', this);
			this.addBindings();
			this._init = true;
		},
		value: $.noop,
		_value: function(val, _noNormalize, animate){
			var left, posDif;
			var o = this.options;
			var oVal = val;
			var thumbStyle = {};
			var rangeStyle = {};
			
			if(!_noNormalize && parseFloat(val, 10) != val){
				val = o.min + ((o.max - o.min) / 2);
			}
			
			if(!_noNormalize){
				val = this.normalizeVal(val);
			}
			left =  100 * ((val - o.min) / (o.max - o.min));
			
			if(this._init && val == o.value && oVal == val){return;}
			o.value = val;
			
			if($.fn.stop){
				this.thumb.stop();
				this.range.stop();
			}
			
			rangeStyle[this.dirs.width] = left+'%';
			
			if(this.vertical){
				left = Math.abs(left - 100);
			}
			thumbStyle[this.dirs.left] = left+'%';
			
			
			if(!animate || !$.fn.animate){
				this.thumb[0].style[this.dirs.left] = thumbStyle[this.dirs.left];
				this.range[0].style[this.dirs.width] = rangeStyle[this.dirs.width];
			} else {
				if(typeof animate != 'object'){
					animate = {};
				} else {
					animate = $.extend({}, animate);
				}
				if(!animate.duration){
					posDif = Math.abs(left - parseInt(this.thumb[0].style[this.dirs.left] || 50, 10));
					animate.duration = Math.max(Math.min(999, posDif * 5), 99);
				}
				this.thumb.animate(thumbStyle, animate);
				this.range.animate(rangeStyle, animate);
			}
			if(this.orig && (oVal != val || (!this._init && this.orig.value != val)) ){
				this.options._change(val);
			}
			
			this._setValueMarkup();
		},
		_setValueMarkup: function(){
			var o = this.options;
			var textValue = o.textValue ? o.textValue(this.options.value) : o.options[o.value] || o.value;

			this.element[0].setAttribute('aria-valuenow', this.options.value);
			this.element[0].setAttribute('aria-valuetext', textValue);

			this.thumbValue[0].setAttribute('data-value', this.options.value);
			this.thumbValue[0].setAttribute('data-valuetext', textValue);

			if(o.selectedOption){
				$(o.selectedOption).removeClass('ws-selected-option');
				o.selectedOption = null;
			}
			if(o.value in o.options){
				o.selectedOption = $('[data-value="'+o.value+'"].ws-range-ticks', this.trail).addClass('ws-selected-option');
			}
		},
		initDataList: function(){
			if(this.orig){
				var listTimer;
				var that = this;
				var updateList = function(){
					$(that.orig)
						.jProp('list')
						.off('updateDatalist', updateList)
						.on('updateDatalist', updateList)
					;
					clearTimeout(listTimer);
					listTimer = setTimeout(function(){
						if(that.list){
							that.list();
						}
					}, 9);
					
				};
				
				$(this.orig).on('listdatalistchange', updateList);
				this.list();
			}
		},
		list: function(opts){
			var o = this.options;
			var min = o.min;
			var max = o.max;
			var trail = this.trail;
			var that = this;
			
			this.element.attr({'aria-valuetext': o.options[o.value] || o.value});
			$('.ws-range-ticks', trail).remove();
			
			
			$(this.orig).jProp('list').find('option:not([disabled])').each(function(){
				o.options[$.prop(this, 'value')] = $.prop(this, 'label') || '';
			});
			
			$.each(o.options, function(val, label){
				if(!isNumber(val) || val < min || val > max){return;}
				var left = 100 * ((val - min) / (max - min));
				var attr = 'data-value="'+val+'"';
				if(label){
					attr += ' data-label="'+label+'"';
					if(o.showLabels){
						attr += ' title="'+label+'"';
					}
				}
				if(that.vertical){
					left = Math.abs(left - 100);
				}
				
				that.posCenter(
					$('<span class="ws-range-ticks"'+ attr +' style="'+(that.dirs.left)+': '+left+'%;" />').appendTo(trail)
				);
			});
			if(o.value in o.options){
				this._setValueMarkup();
			}
		},
		readonly: function(val){
			val = !!val;
			this.options.readonly = val;
			this.element.attr('aria-readonly', ''+val);
			if(this._init){
				this.updateMetrics();
			}
		},
		disabled: function(val){
			val = !!val;
			this.options.disabled = val;
			if(val){
				this.element.attr({tabindex: -1, 'aria-disabled': 'true'});
			} else {
				this.element.attr({tabindex: this.options.tabindex, 'aria-disabled': 'false'});
			}
			if(this._init){
				this.updateMetrics();
			}
		},
		tabindex: function(val){
			this.options.tabindex = val;
			if(!this.options.disabled){
				this.element.attr({tabindex: val});
			}
		},
		title: function(val){
			this.element.prop('title', val);
		},
		min: function(val){
			this.options.min = retDefault(val, 0);
			this.element.attr('aria-valuemin', this.options.min);
			this.value(this.options.value, true);
		},
		max: function(val){
			this.options.max = retDefault(val, 100);
			this.element.attr('aria-valuemax', this.options.max);
			this.value(this.options.value, true);
		},
		step: function(val){
			var o = this.options;
			var step = val == 'any' ? 'any' : retDefault(val, 1);
			
			if(o.stepping){
				webshims.error('stepping was removed. Use stepfactor instead.');
			}

			if(o.stepfactor && step != 'any'){
				step *= o.stepfactor;
			}

			o.step = step;
			this.value(this.options.value);
		},
		
		normalizeVal: function(val){
			var valModStep, alignValue, step;
			var o = this.options;
			
			if(val <= o.min){
				val = o.min;
			} else if(val >= o.max) {
				val = o.max;
			} else if(o.step != 'any'){
				step = o.step;
				valModStep = (val - o.min) % step;
				alignValue = val - valModStep;
				
				if ( Math.abs(valModStep) * 2 >= step ) {
					alignValue += ( valModStep > 0 ) ? step : ( -step );
				}
				val = alignValue.toFixed(5) * 1;
			}
			return val;
		},
		doStep: function(factor, animate){
			var step = retDefault(this.options.step, 1);
			if(this.options.step == 'any'){
				step = Math.min(step, (this.options.max - this.options.min) / 10);
			}
			this.value( this.options.value + (step * factor), false, animate );
			
		},
		 
		getStepedValueFromPos: function(pos){
			var val, valModStep, alignValue, step;
			
			if(pos <= 0){
				val = this.options[this.dirs[this.isRtl ? 'max' : 'min']];
			} else if(pos > 100) {
				val = this.options[this.dirs[this.isRtl ? 'min' : 'max']];
			} else {
				if(this.vertical || this.isRtl){
					pos = Math.abs(pos - 100);
				}
				val = ((this.options.max - this.options.min) * (pos / 100)) + this.options.min;
				step = this.options.step;
				if(step != 'any'){
					valModStep = (val - this.options.min) % step;
					alignValue = val - valModStep;
					
					if ( Math.abs(valModStep) * 2 >= step ) {
						alignValue += ( valModStep > 0 ) ? step : ( -step );
					}
					val = ((alignValue).toFixed(5)) * 1;
					
				}
			}
			
			return val;
		},
		addRemoveClass: function(cName, add){
			var isIn = this.element.prop('className').indexOf(cName) != -1;
			var action;
			if(!add && isIn){
				action = 'removeClass';
				this.element.removeClass(cName);
				this.updateMetrics();
			} else if(add && !isIn){
				action = 'addClass';
				
			}
			if(action){
				this.element[action](cName);
				if(this._init){
					this.updateMetrics();
				}
			}
		},
		addBindings: function(){
			var leftOffset, widgetUnits, hasFocus, isActive;
			var that = this;
			var o = this.options;
			
			var eventTimer = (function(){
				var events = {};
				return {
					init: function(name, curVal, fn){
						if(!events[name]){
							events[name] = {fn: fn};
							if(that.orig){
								$(that.orig).on(name, function(){
									events[name].val = $.prop(that.orig, 'value');
								});
							}
							
						}
						events[name].val = curVal;
					},
					call: function(name, val){
						if(events[name].val != val){
							clearTimeout(events[name].timer);
							events[name].val = val;
							events[name].timer = setTimeout(function(){
								events[name].fn(val, that);
							}, 0);
						}
					}
				};
			})();

			var updateValue = function(val, animate){
				if(val != o.value){
					that.value(val, false, animate);
					eventTimer.call('input', val);
				}
			};
			var setValueFromPos = function(e, animate){
				if(e.type == 'touchmove'){
					e.preventDefault();
					normalizeTouch(e);
				}
				
				updateValue(that.getStepedValueFromPos((e[that.dirs.mouse] - leftOffset) * widgetUnits), animate);
				
				if(e && e.type == 'mousemove'){
					e.preventDefault();
				}
			};
			var remove = function(e){
				if(e && (e.type == 'mouseup' || e.type == 'touchend')){
					eventTimer.call('input', o.value);
					eventTimer.call('change', o.value);
				}
				that.addRemoveClass('ws-active');
				$(document).off('mousemove touchmove', setValueFromPos).off('mouseup touchend', remove);
				$(window).off('blur', removeWin);
				isActive = false;
			};
			var removeWin = function(e){
				if(e.target == window){remove();}
			};
			var add = function(e){
				if(isActive || (e.type == 'touchstart' && (!e.originalEvent || !e.originalEvent.touches || e.originalEvent.touches.length != 1))){
					return;
				}
				e.preventDefault();
				
				$(document).off('mousemove touchmove', setValueFromPos).off('mouseup touchend', remove);
				$(window).off('blur', removeWin);
				if(!o.readonly && !o.disabled){
					eventTimer.init('input', o.value);
					eventTimer.init('change', o.value);
					normalizeTouch(e);
					that.element.trigger('focus');
					that.addRemoveClass('ws-active', true);
					leftOffset = that.element.offset();
					widgetUnits = that.element[that.dirs.innerWidth]();
					if(!widgetUnits || !leftOffset){return;}
					leftOffset = leftOffset[that.dirs.pos];
					widgetUnits = 100 / widgetUnits;

					if(e.target.className == 'ws-range-ticks'){
						updateValue(e.target.getAttribute('data-value'), o.animate);
					} else {
						setValueFromPos(e, o.animate);
					}
					isActive = true;
					$(document)
						.on(e.type == 'touchstart' ?
							{
								touchend: remove,
								touchmove: setValueFromPos
							} :
							{
								mouseup: remove,
								mousemove: setValueFromPos
							}
						)
					;
					$(window).on('blur', removeWin);
					e.stopPropagation();
				}
			};
			var elementEvts = {
				'touchstart mousedown': add,
				focus: function(e){
					if(!o.disabled && !hasFocus){
						if(!isActive){
							eventTimer.init('input', o.value);
							eventTimer.init('change', o.value);
						}
						that.addRemoveClass('ws-focus', true);
						that.updateMetrics();
					}
					hasFocus = true;
				},
				blur: function(e){
					that.element.removeClass('ws-focus ws-active');
					that.updateMetrics();
					hasFocus = false;
					eventTimer.init('input', o.value);
					eventTimer.call('change', o.value);
				},
				keyup: function(){
					that.addRemoveClass('ws-active');
					eventTimer.call('input', o.value);
					eventTimer.call('change', o.value);
				},
				
				keydown: function(e){
					var step = true;
					var code = e.keyCode;
					if(!o.readonly && !o.disabled){
						if(that.isRtl){
							if(code == 39){
								code = 37;
							} else if(code == 37){
								code = 39;
							}
						}
						if (code == 39 || code == 38) {
							that.doStep(1);
						} else if (code == 37 || code == 40) {
							that.doStep(-1);
						} else if (code == 33) {
							that.doStep(10, o.animate);
						} else if (code == 34) {
							that.doStep(-10, o.animate);
						} else if (code == 36) {
							that.value(that.options.max, false, o.animate);
						} else if (code == 35) {
							that.value(that.options.min, false, o.animate);
						} else {
							step = false;
						}
						if (step) {
							that.addRemoveClass('ws-active', true);
							eventTimer.call('input', o.value);
							e.preventDefault();
						}
					}
				}
			};
			
			eventTimer.init('input', o.value, this.options.input);
			eventTimer.init('change', o.value, this.options.change);
			
			elementEvts[$.fn.mwheelIntent ? 'mwheelIntent' : 'mousewheel'] = function(e, delta){
				if(delta && hasFocus && !o.readonly && !o.disabled){
					that.doStep(delta);
					e.preventDefault();
					eventTimer.call('input', o.value);
				}
			};
			this.element.on(elementEvts);
			this.thumb.on({
				mousedown: add
			});
			
			if(this.orig){
				$(this.orig).jProp('form').on('reset', function(){
					var val = $.prop(that.orig, 'value');
					that.value(val);
					setTimeout(function(){
						var val2 = $.prop(that.orig, 'value');
						if(val != val2){
							that.value(val2);
						}
					}, 4);
				});
			}
			
			if (window.webshims) {
				webshims.ready('WINDOWLOAD', function(){
					webshims.ready('dom-support', function(){
						if ($.fn.onWSOff) {
							var timer;
							var update = function(){
								that.updateMetrics();
							};
							that.element.onWSOff('updateshadowdom', function(){
								clearTimeout(timer);
								timer = setTimeout(update, 100);
							});
						}
					});
					if (!$.fn.onWSOff && webshims._polyfill) {
						webshims._polyfill(['dom-support']);
					}
				});
			}
		},
		posCenter: function(elem, outerWidth){
			var temp, eS;

			if(this.options.calcCenter && (!this._init || this.element[0].offsetWidth)){
				if(!elem){
					elem = this.thumb;
				}
				eS = elem[0].style;
				if(!outerWidth){
					outerWidth = elem[this.dirs.outerWidth]();
				}
				outerWidth = outerWidth / -2;
				eS[this.dirs.marginLeft] = outerWidth +'px';

				if(this.options.calcTrail && elem[0] == this.thumb[0]){
					temp = this.element[this.dirs.innerHeight]();
					eS[this.dirs.marginTop] = ((elem[this.dirs.outerHeight]() - temp) / -2) + 'px';
					this.range[0].style[this.dirs.marginTop] = ((this.range[this.dirs.outerHeight]() - temp) / -2 ) +'px';

					this.range[0].style[this.dirs.posLeft] = outerWidth +'px';

					outerWidth *= -1;

					this.range[0].style[this.dirs.paddingRight] = outerWidth +'px';
					this.trail[0].style[this.dirs.left] = outerWidth +'px';
					this.trail[0].style[this.dirs.right] = outerWidth +'px';


				}
			}
		},
		updateMetrics: function(){
			var width = this.element.innerWidth();
			this.vertical = (width && this.element.innerHeight() - width  > 10);
			
			this.dirs = this.vertical ? 
				{mouse: 'pageY', pos: 'top', posLeft: 'bottom', paddingRight: 'paddingTop', min: 'max', max: 'min', left: 'top', right: 'bottom', width: 'height', innerWidth: 'innerHeight', innerHeight: 'innerWidth', outerWidth: 'outerHeight', outerHeight: 'outerWidth', marginTop: 'marginLeft', marginLeft: 'marginTop'} :
				{mouse: 'pageX', pos: 'left', posLeft: 'left', paddingRight: 'paddingRight', min: 'min', max: 'max', left: 'left', right: 'right', width: 'width', innerWidth: 'innerWidth', innerHeight: 'innerHeight', outerWidth: 'outerWidth', outerHeight: 'outerHeight', marginTop: 'marginTop', marginLeft: 'marginLeft'}
			;
			if(!this.vertical && this.element.css('direction') == 'rtl'){
				this.isRtl = true;
				this.dirs.left = 'right';
				this.dirs.right = 'left';
				this.dirs.marginLeft = 'marginRight';
				this.dirs.posLeft = 'right';
			}
			this.element
				[this.vertical ? 'addClass' : 'removeClass']('vertical-range')
				[this.isRtl ? 'addClass' : 'removeClass']('ws-is-rtl')
			;
			this.updateMetrics = this.posCenter;
			this.posCenter();
		}
	};
	
	var oCreate = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
	
	$.fn.rangeUI = function(opts){
		opts = $.extend({
			readonly: false, 
			disabled: false, 
			tabindex: 0, 
			min: 0, 
			step: 1, 
			max: 100, 
			value: 50, 
			input: $.noop, 
			change: $.noop, 
			_change: $.noop,
			showLabels: true, 
			options: {},
			calcCenter: true,
			calcTrail: true
		}, opts);
		return this.each(function(){
			var obj = $.extend(oCreate(rangeProto), {element: $(this)});
			obj.options = opts;
			obj._create.call(obj);
		});
	};
	$.fn.rangeUI.normalizeTouch = normalizeTouch;
	if(window.webshims && webshims.isReady){
		webshims.isReady('range-ui', true);
	}
})(window.webshims ? webshims.$ : jQuery);
;webshims.register('form-number-date-ui', function($, webshims, window, document, undefined, options){
	"use strict";
	var curCfg;
	var formcfg = webshims.formcfg;
	var hasFormValidation = webshims.support.formvalidation && !webshims.bugs.bustedValidity;
	var monthDigits = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	var stopPropagation = function(e){
		e.stopImmediatePropagation();
	};
	var getMonthOptions = function(opts){
		var selectName = 'monthSelect'+opts.monthNames;
		if(!curCfg[selectName]){
			var labels = curCfg.date[opts.monthNames] || monthDigits;
			curCfg[selectName] = ('<option value=""></option>')+$.map(monthDigits, function(val, i){
				return '<option value="'+val+'">'+labels[i]+'</option>';
			}).join('');
		}
		return curCfg[selectName];
	};
	var daySelect = '<select class="dd"><option value=""></option>'+ (function(){
		var i = 1;
		var opts = [];
		while(i < 32){
			opts.push('<option>'+ ((i < 10) ? '0'+ i : i) +'</option>' );
			i++;
		}
		return opts.join('');
	})() +'</select>';
	var createFormat = function(name){
		if(!curCfg.patterns[name+'Obj']){
			var obj = {};
			$.each(curCfg.patterns[name].split(curCfg[name+'Format']), function(i, name){
				obj[name] = i;
			});
			curCfg.patterns[name+'Obj'] = obj;
		}
	};
	var createYearSelect = function(obj, opts){
		var options, nowY, max, min;
		if(opts.yearSelect){
			nowY = parseInt(opts.value.split('-')[0], 10);
			max = opts.max.split('-');
			min = opts.min.split('-');
			options = webshims.picker.createYearSelect(nowY || parseInt(min[0], 10) || parseInt(max[0], 10) || nowYear, max, min);
			options.unshift('<option />');
			$(obj.elements)
				.filter('select.yy')
				.html(options.join(''))
				.each(function(){
					if(!nowY){
						$('option[selected]', this).removeAttr('selected');
						$(this).val();
					}
				})
			;
		}
	};
	var numericType = webshims.support.inputtypes.tel && navigator.userAgent.indexOf('Mobile') != -1 && !('inputMode' in document.createElement('input') && !('inputmode' in document.createElement('input'))) ?
		'tel' : 'text';
	var splitInputs = {
		date: {
			_create: function(opts){
				var obj = {
					splits: [] 
				};
				
				if(opts.yearSelect){
					obj.splits.push($('<select class="yy"></select>')[0]);
				} else {
					obj.splits.push($('<input type="'+ numericType +'" class="yy" size="4" inputmode="numeric" maxlength="4" />')[0]);
				}
				
				if(opts.monthSelect){
					obj.splits.push($('<select class="mm">'+getMonthOptions(opts)+'</select>')[0]);
				} else {
					obj.splits.push($('<input type="'+ numericType +'" class="mm" inputmode="numeric" maxlength="2" size="2" />')[0]);
				}
				if(opts.daySelect){
					obj.splits.push($(daySelect)[0]);
				} else {
					obj.splits.push($('<input type="'+ numericType +'" class="dd ws-spin" inputmode="numeric" maxlength="2" size="2" />')[0]);
				}
				
				obj.elements = [obj.splits[0], $('<span class="ws-input-seperator" />')[0], obj.splits[1], $('<span class="ws-input-seperator" />')[0], obj.splits[2]];
				createYearSelect(obj, opts);
				return obj;
			},
			sort: function(element){
				createFormat('d');
				var i = 0;
				var seperators = $('.ws-input-seperator', element).html(curCfg.dFormat);
				var inputs = $('input, select', element);
				$.each(curCfg.patterns.dObj, function(name, value){
					var input = inputs.filter('.'+ name);
					if(input[0]){
						
						input.appendTo(element);
						if(i < seperators.length){
							seperators.eq(i).insertAfter(input);
						}
						i++;
					}
				});
			}
		},
		month: {
			_create: function(opts){
				
				var obj = {
					splits: [] 
				};
				
				if(opts.yearSelect){
					obj.splits.push($('<select class="yy"></select>')[0]);
				} else {
					obj.splits.push($('<input type="'+ numericType +'" class="yy" size="4" inputmode="numeric" maxlength="4" />')[0]);
				}
				
				if(opts.monthSelect){
					obj.splits.push($('<select class="mm">'+getMonthOptions(opts)+'</select>')[0]);
				} else {
					obj.splits.push($('<input type="text" class="mm ws-spin" />')[0]);
					if(opts.onlyMonthDigits){
						$().attr({inputmode: 'numeric', size: 2, maxlength: 2});
						try {
							obj.splits[1].setAttribute('type', numericType);
						} catch(e){}
					}
				}
				
				obj.elements = [obj.splits[0], $('<span class="ws-input-seperator" />')[0], obj.splits[1]];
				createYearSelect(obj, opts);
				return obj;
			},
			sort: function(element){
				var seperator = $('.ws-input-seperator', element).html(curCfg.dFormat);
				var mm = $('input.mm, select.mm', element);
				var action;
				if(curCfg.date.showMonthAfterYear){
					mm.appendTo(element);
					action = 'insertBefore';
				} else {
					mm.prependTo(element);
					action = 'insertAfter';
				}
				seperator[action](mm);
			}
		}
	};

	var nowDate = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000 ));
	var nowYear = nowDate.getFullYear();
	nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours()).getTime();
	var steps = {
		number: {
			step: 1
		},
//		week: {
//			step: 1,
//			start: new Date(nowDate)
//		},
		'datetime-local': {
			step: 60,
			start: new Date(nowDate).getTime()
		},
		time: {
			step: 60
		},
		month: {
			step: 1,
			start: new Date(nowDate)
		},
		date: {
			step: 1,
			start: new Date(nowDate)
		}
	};
	var labelWidth = (function(){
		var getId = function(){
			return webshims.getID(this);
		};
		return function(element, labels, noFocus){
			$(element).attr({'aria-labelledby': labels.map(getId).get().join(' ')});
			if(!noFocus){
				labels.on('click', function(e){
					if(!e.isDefaultPrevented()){
						element.getShadowFocusElement().focus();
						e.preventDefault();
						return false;
					}
				});
			}
		};
	})();
	var addZero = function(val){
		if(!val){return "";}
		val = val+'';
		return val.length == 1 ? '0'+val : val;
	};
	
	var loadPicker = function(type, name){
		type = (type == 'color' ? 'color' : 'forms')+'-picker';
		if(!loadPicker[name+'Loaded'+type]){
			loadPicker[name+'Loaded'+type] = true;
			webshims.ready(name, function(){
				webshims.loader.loadList([type]);
				
			});
		}
		return type;
	};
	

	options.addZero = addZero;
	webshims.loader.addModule('forms-picker', {
		noAutoCallback: true,
		css: 'styles/forms-picker.css',
		options: options
	});
	webshims.loader.addModule('color-picker', {
		noAutoCallback: true, 
		css: 'jpicker/jpicker.css',
		options: options,
		d: ['forms-picker']
	});
	
	options.steps = steps;
		
	(function(){
		
		formcfg.de = $.extend(true, {
			numberFormat: {
				",": ".",
				".": ","
			},
			timeSigns: ":. ",
			numberSigns: ',',
			dateSigns: '.',
			dFormat: ".",
			patterns: {
				d: "dd.mm.yy"
			},
			month:  {
				currentText: 'Aktueller Monat'
			},
			time:  {
				currentText: 'Jetzt'
			},
			date: {
				close: 'schließen',
				clear: 'Löschen',
				prevText: 'Zurück',
				nextText: 'Vor',
				currentText: 'Heute',
				monthNames: ['Januar','Februar','März','April','Mai','Juni',
				'Juli','August','September','Oktober','November','Dezember'],
				monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
				'Jul','Aug','Sep','Okt','Nov','Dez'],
				dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
				dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
				dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
				weekHeader: 'KW',
				firstDay: 1,
				isRTL: false,
				showMonthAfterYear: false,
				yearSuffix: ''
			}
		}, formcfg.de || {});
		
		formcfg.en = $.extend(true, {
			numberFormat: {
				".": ".",
				",": ","
			},
			numberSigns: '.',
			dateSigns: '/',
			timeSigns: ":. ",
			dFormat: "/",
			patterns: {
				d: "mm/dd/yy"
			},
			meridian: ['AM', 'PM'],
			month:  {
				currentText: 'This month'
			},
			time: {
				"currentText": "Now"
			},
			date: {
				"closeText": "Done",
				clear: 'Clear',
				"prevText": "Prev",
				"nextText": "Next",
				"currentText": "Today",
				"monthNames": ["January","February","March","April","May","June","July","August","September","October","November","December"],
				"monthNamesShort": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
				"dayNames": ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
				"dayNamesShort": ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
				"dayNamesMin": ["Su","Mo","Tu","We","Th","Fr","Sa"],
				"weekHeader": "Wk",
				"firstDay": 0,
				"isRTL": false,
				"showMonthAfterYear": false,
				"yearSuffix": ""
			}
		}, formcfg.en || {});
		
		if(!formcfg['en-US']){
			formcfg['en-US'] = $.extend(true, {}, formcfg['en']);
		}
		if(!formcfg['en-GB']){
			formcfg['en-GB'] = $.extend(true, {}, formcfg.en, {
				date: {firstDay: 1}, 
				patterns: {d: "dd/mm/yy"}
			});
		}
		if(!formcfg['en-AU']){
			formcfg['en-AU'] = $.extend(true, {}, formcfg['en-GB']);
		}
		if(!formcfg['']){
			formcfg[''] = formcfg['en-US'];
		}
		
		curCfg = formcfg[''];
		
		var processLangCFG = function(langCfg){
			if(!langCfg.date.monthkeys){
				var create = function(i, name){
					var strNum;
					var num = i + 1;
					strNum = (num < 10) ? '0'+num : ''+num;
					langCfg.date.monthkeys[num] = strNum;
					langCfg.date.monthkeys[name] = strNum;
					langCfg.date.monthkeys[name.toLowerCase()] = strNum;
				};
				langCfg.date.monthkeys = {};
				langCfg.date.monthDigits = monthDigits;
				langCfg.numberSigns += '-';
				if(langCfg.meridian){
					langCfg.timeSigns += langCfg.meridian[0] + langCfg.meridian[1] + langCfg.meridian[0].toLowerCase() + langCfg.meridian[1].toLowerCase();
				}
				$.each(langCfg.date.monthNames, create);
				$.each(langCfg.date.monthNamesShort, create);
			}
			if(!langCfg.colorSigns){
				langCfg.colorSigns = '#abcdefABCDEF';
			}
			if(!langCfg['datetime-localSigns']){
				langCfg['datetime-localSigns'] = langCfg.dateSigns+langCfg.timeSigns;
			}
			if(!langCfg['datetime-local']){
				langCfg['datetime-local'] = {};
			}
			if(!langCfg.time){
				langCfg.time = {};
			}
			if(!langCfg['datetime-local'].currentText && langCfg.time.currentText){
				langCfg['datetime-local'].currentText = langCfg.time.currentText;
			}
		};
		var triggerLocaleChange = function(){
			processLangCFG(curCfg);
			$(document).triggerHandler('wslocalechange');
		};
		
		curCfg = webshims.activeLang(formcfg);
		
		triggerLocaleChange();
			
		$(formcfg).on('change', function(){
			curCfg = formcfg.__active;
			triggerLocaleChange();
		});
		
	})();
		
	
	
	(function(){
		
		var retDefault = function(val, def){
			if(!(typeof val == 'number' || (val && val == val * 1))){
				return def;
			}
			return val * 1;
		};
		
		
		var formatVal = {
			number: function(val, o, noCorrect){
				var parts, len, i, isNegative;
				if(o && o.nogrouping){
					return (val+'').replace(/\,/g, '').replace(/\./, curCfg.numberFormat['.']);
				}

				val += '';

				if(val.charAt(0) == '-'){
					isNegative = true;
					val = val.replace('-', '');
				}
				parts = val.split('.');
				len = parts[0].length;
				i = len - 1;

				val = "";
				while(i >= 0) {
					val = parts[0].charAt(i) + val;
					if (i > 0 && (len - i) % 3 === 0) {
						val = curCfg.numberFormat[','] + val;
					}
					--i;
				}
				if(parts[1] != null){
					if(!noCorrect){
						parts[1] = parts[1].replace(/\-/g, '0');
					}
					val += curCfg.numberFormat['.'] + parts[1];
				}
				if(isNegative){
					val = '-'+val;
				}
				return val;
			},
			time: function(val, o, noCorrect){
				var fVal, i;
				if(val){

					val = val.split(':');
					if(curCfg.meridian){
						fVal = (val[0] * 1);
						if(fVal && fVal >= 12){
							val[0] = addZero(fVal - 12+'');
							fVal = 1;
						} else {
							fVal = 0;
						}
						if(val[0] === '00'){
							val[0] = '12';
						}
					}
					if(!noCorrect){
						for(i = 0; i < val.length; i++){
							val[i] = addZero(val[i]);
						}

						if(!val[1]){
							val[1] = '00';
						}
					}
					val = $.trim(val.join(':'));
					if(fVal != null && curCfg.meridian){
						val += ' '+curCfg.meridian[fVal];
					}
				}
				return val;
			},
			'datetime-local': function(val, o){
				var fVal = $.trim(val || '').split('T');
				if(fVal.length == 2){
					val = this.date(fVal[0], o) +' '+this.time(fVal[1], o);
				}
				return val;
			},
//			week: function(val){
//				return val;
//			},
			//todo empty val for month/split
			month: function(val, options){
				var names;
				var p = val.split('-');
				if(p[0] && p[1]){

					if(!options || !options.monthSelect){
						names = curCfg.date[options.monthNames] || curCfg.date.monthNames;
						p[1] = names[(p[1] * 1) - 1];
					}

					if(options && options.splitInput){
						val = [p[0] || '', p[1] || ''];
					} else if(p[1]){
						val = curCfg.date.showMonthAfterYear ? p.join(' ') : p[1]+' '+p[0];
					}
				} else if(options && options.splitInput){
					val = [p[0] || '', p[1] || ''];
				}
				return val;
			},
			date: function(val, opts){
				var p = (val+'').split('-');
				if(p[2] && p[1] && p[0]){
					if(opts && opts.splitInput){
						val = p;
					} else {
						val = curCfg.patterns.d.replace('yy', p[0] || '');
						val = val.replace('mm', p[1] || '');
						val = val.replace('dd', p[2] || '');
					}
				} else if(opts && opts.splitInput){
					val = [p[0] || '', p[1] || '', p[2] || ''];
				}
				
				return val;
			},
			color: function(val, opts){
				var ret = '#000000';
				if(val){
					val = val.toLowerCase();
					if(val.length == 7 && createHelper('color').isValid(val)) {
						ret = val;
					}
				}
				return ret;
			}
		};

		var parseVal = {
			number: function(val){
				return (val+'').split(curCfg.numberFormat[',']).join('').replace(curCfg.numberFormat['.'], '.');
			},
//			week: function(val){
//				return val;
//			},
			'datetime-local': function(val, o){
				var tmp;
				var fVal = $.trim(val || '').split(/\s+/);
				if(fVal.length == 2){
					if(fVal[0].indexOf(':') != -1 && fVal[1].indexOf(':') == -1){
						tmp = fVal[1];
						fVal[1] = fVal[0];
						fVal[0] = tmp;
					}
					val = this.date(fVal[0], o) +'T'+ this.time(fVal[1], o);
				} else if (fVal.length == 3) {
					val = this.date(fVal[0], o) +'T'+ this.time(fVal[1]+fVal[2], o);
				}
				return val;
			},
			time: function(val){
				var fVal;
				if(val && curCfg.meridian){
					val = val.toUpperCase();
					if(val.substr(0,2) === "12"){
						val = "00" + val.substr(2);
					}

					if(val.indexOf(curCfg.meridian[1]) != -1){

						val = val.split(':');
						fVal = (val[0].replace(curCfg.meridian[1], '') * 1);

						if(!isNaN(fVal)){
							val[0] = fVal + 12;
						}
						val = val.join(':');
					}
					val = $.trim(val.replace(curCfg.meridian[0], '').replace(curCfg.meridian[1], ''));
				}
				return val;
			},
			month: function(val, opts, noCorrect){
				
				var p = (!opts.splitInput) ? val.trim().split(/[\.\s-\/\\]+/) : val;
				
				if(p.length == 2 && p[0] && p[1]){
					p[0] = !noCorrect && curCfg.date.monthkeys[p[0]] || p[0];
					p[1] = !noCorrect && curCfg.date.monthkeys[p[1]] || p[1];
					if(p[1].length == 2 && p[0].length > 3){
						val = p[0]+'-'+p[1];
					} else if(p[0].length == 2  && p[1].length > 3){
						val = p[1]+'-'+p[0];
					} else {
						val = '';
					}
				} else if(opts.splitInput) {
					val = '';
				}
				return val;
			},
			date: function(val, opts, noCorrect){
				createFormat('d');
				var tmp, obj;
				var ret = '';
				if(opts.splitInput){
					obj = {yy: 0, mm: 1, dd: 2};
				} else {
					obj = curCfg.patterns.dObj;
					val = val.split(curCfg.dFormat);
				}
				if(val.length == 3 && val[0] && val[1] && val[2] && (!noCorrect || (val[obj.yy].length > 3 && val[obj.mm].length == 2 && val[obj.dd].length == 2))){
					if(!opts.noDayMonthSwitch && val[obj.mm] > 12 && val[obj.dd] < 13){
						tmp = val[obj.dd];
						val[obj.dd] = val[obj.mm];
						val[obj.mm] = tmp;
					}
					if(val[obj.yy].length < 4){
						tmp = ((new Date()).getFullYear() +'').substr(0, 4 - val[obj.yy].length);
						if(val[obj.yy] > 50){
							tmp--;
						}
						val[obj.yy] = tmp + val[obj.yy];
					}
					ret = ([addZero(val[obj.yy]), addZero(val[obj.mm]), addZero(val[obj.dd])]).join('-');
				}
				return ret
				;
			},
			color: function(val, opts){
				var ret = '#000000';
				if(val){
					val = val.toLowerCase();
					if (val.indexOf('#') !== 0) {
						val = '#' + val;
					}
					if(val.length == 4){
						val = '#' + val.charAt(1) + val.charAt(1) + val.charAt(2) + val.charAt(2) + val.charAt(3) + val.charAt(3);
					}
					if(val.length == 7 && createHelper('color').isValid(val)) {
						ret = val;
					}
				}
				return ret;
			}
		};
		
		var placeholderFormat = {
			date: function(val, opts){
				var hintValue = (val || '').split('-');
				if(hintValue.length == 3){
					hintValue = opts.splitInput ? 
						hintValue : 
						curCfg.patterns.d.replace('yy', hintValue[0]).replace('mm', hintValue[1]).replace('dd', hintValue[2]);
				} else {
					hintValue = opts.splitInput ?
						[val, val, val] :
						val;
				}
				return hintValue;
			},
			month: function(val, opts){
				var hintValue = (val || '').split('-');
				
				if(hintValue.length == 2){
					hintValue = opts.splitInput ? 
						hintValue : 
						curCfg.date.showMonthAfterYear ?
							hintValue[0] +' '+hintValue[1] :
							
							hintValue[1] +' '+ hintValue[0];
				} else {
					hintValue = opts.splitInput ?
						[val, val] :
						val;
				}
				return hintValue;
			}
		};
		
		var createHelper = (function(){
			var types = {};
			return function(type){
				var input;
				if(!types[type]){
					input = $('<input type="'+type+'" step="any" />');
					types[type] = {
						asNumber: function(val){
							var type = (typeof val == 'object') ? 'valueAsDate' : 'value';
							return input.prop(type, val).prop('valueAsNumber');
						},
						asValue: function(val){
							var type = (typeof val == 'object') ? 'valueAsDate' : 'valueAsNumber';
							return input.prop(type, val).prop('value');
						},
						asDate: function(val){
							var type = (typeof val == 'number') ? 'valueAsNumber' : 'value';
							return input.prop(type, val).prop('valueAsDate');
						},
						isValid: function(val, attrs){
							if(attrs && (attrs.nodeName || attrs.jquery)){
								attrs = {
									min: $(attrs).prop('min') || '',
									max: $(attrs).prop('max') || '',
									step: $(attrs).prop('step') || 'any'
								};
							}
							attrs = $.extend({step: 'any', min: '', max: ''}, attrs || {});
							return input.attr(attrs).prop('value', val).is(':valid') && input.prop('value') == val;
						}
					};
				}
				return types[type];
			};
		})();
		
		steps.range = steps.number;
		
		var wsWidgetProto = {
			_create: function(){
				var i, that, timedMirror;
				var o = this.options;
				var createOpts = this.createOpts;
				
				this.type = o.type;
				this.orig = o.orig;
				
				this.buttonWrapper = $('<span class="input-buttons '+this.type+'-input-buttons"></span>').insertAfter(this.element);
				this.options.containerElements.push(this.buttonWrapper[0]);
				
				o.mirrorValidity = o.mirrorValidity && this.orig && hasFormValidation;
				
				if(o.splitInput && this._addSplitInputs){
					if(o.monthSelect){
						this.element.addClass('ws-month-select');
					}
					this._addSplitInputs();
				} else {
					this.inputElements = this.element;
				}
				
				if( steps[this.type] && typeof steps[this.type].start == 'object'){
					steps[this.type].start = this.asNumber(steps[this.type].start);
				}

				for(i = 0; i < createOpts.length; i++){
					if(o[createOpts[i]] != null){
						this[createOpts[i]](o[createOpts[i]], o[createOpts[i]]);
					}
				}
				if(this.type == 'color'){
					this.inputElements.prop('maxLength', 7);
				}
				this.addBindings();
				$(this.element).data('wsWidget'+o.type, this);
				
				
				if(o.buttonOnly){
					this.inputElements.prop({readOnly: true});
				}
				
				this._init = true;
				
				if(o.mirrorValidity){
					that = this;
					timedMirror = function(){
						clearTimeout(timedMirror._timerDealy);
						timedMirror._timerDealy = setTimeout(timedMirror._wsexec, 9);
					};
					timedMirror._wsexec = function(){
						clearTimeout(timedMirror._timerDealy);
						that.mirrorValidity(true);
					};
					
					timedMirror();
					$(this.orig).on('change input', function(e){
						if(e.type == 'input'){
							timedMirror();
						} else {
							timedMirror._wsexec();
						}
					});
				}
			},
			mirrorValidity: function(_noTest){
				//
				if(this._init && this.options.mirrorValidity){
					if(!_noTest){
						$.prop(this.orig, 'validity');
					}
					var message = $(this.orig).getErrorMessage();
					if(message !== this.lastErrorMessage){
						this.inputElements.prop('setCustomValidity', function(i, val){
							if(val._supvalue){
								val._supvalue.call(this, message);
							}
						});
						this.lastErrorMessage = message;
					}
				}
			},
			addBindings: function(){
				var that = this;
				var o = this.options;
				var run = function(){
					that._addBindings();
				};
				if(this._addBindings){
					run();
				} else {
					webshims.ready('forms-picker', run);
					loadPicker(this.type, 'WINDOWLOAD');
				}
				
				this.inputElements
					.add(this.buttonWrapper)
					.add(this.element)
					.one('mousedown focusin', function(e){
						loadPicker(that.type, 'DOM');
					})
					.on({
						'change input focus focusin blur focusout': function(e){
							var oVal, nVal;
							$(e.target).trigger('ws__'+e.type);
							if(o.toFixed && o.type == 'number' && e.type == 'change'){
								oVal = that.element.prop('value');
								nVal = that.toFixed(oVal, true);
								if(oVal != nVal){
									that.element[0].value = nVal;
								}
							}
						}
					})
					
				;
				
				if(this.type != 'color'){
					(function(){
						var localeChange, select, selectVal;
						if(!o.splitInput){
							localeChange = function(){
								
								if(o.value){
									that.value(o.value, true);
								}
		
								if(placeholderFormat[that.type] && o.placeholder){
									that.placeholder(o.placeholder);
								}
							};
						} else {
							localeChange = function(){
								that.reorderInputs();
								if(o.monthSelect){
									select = that.inputElements.filter('select.mm');
									selectVal = select.prop('value');
									select.html(getMonthOptions(o));
									select.prop('value', selectVal);
								}
							};
							that.reorderInputs();
						}
						$(that.orig).onWSOff('wslocalechange', localeChange);
					})();
				}
			},
			required: function(val, boolVal){
				this.inputElements.attr({'aria-required': ''+boolVal});
				this.mirrorValidity();
			},
			parseValue: function(noCorrect){
				var value = this.inputElements.map(function(){
					return $.prop(this, 'value');
				}).get();
				if(!this.options.splitInput){
					value = value[0];
				}
				return parseVal[this.type](value, this.options, noCorrect);
			},
			formatValue: function(val, noSplit){
				return formatVal[this.type](val, noSplit === false ? false : this.options);
			},
			createOpts: ['readonly', 'title', 'disabled', 'tabindex', 'placeholder', 'defaultValue', 'value', 'required'],
			placeholder: function(val){
				var options = this.options;
				options.placeholder = val;
				var placeholder = val;
				if(placeholderFormat[this.type]){
					placeholder = placeholderFormat[this.type](val, this.options);
				}
				if(options.splitInput && typeof placeholder == 'object'){
					$.each(this.splits, function(i, elem){
						if($.nodeName(elem, 'select')){
							$(elem).children('option:first-child').text(placeholder[i]);
						} else {
							$.prop(elem, 'placeholder', placeholder[i]);
						}
					});
				} else {
					this.element.prop('placeholder', placeholder);
				}
			},
			list: function(val){
				if(this.type == 'number'){
					this.element.attr('list', $.attr(this.orig, 'list'));
				}
				this.options.list = val;
				this._propertyChange('list');
			},
			_propertyChange: $.noop,
			tabindex: function(val){
				this.options.tabindex = val;
				this.inputElements.prop('tabindex', this.options.tabindex);
				$('button', this.buttonWrapper).prop('tabindex', this.options.tabindex);
			},
			title: function(val){
				if(!val && this.orig && $.attr(this.orig, 'title') == null){
					val = null;
				}
				this.options.title = val;
				if(val == null){
					this.inputElements.removeAttr('title');
				} else {
					this.inputElements.prop('title', this.options.title);
				}
			}
		};
		
		['defaultValue', 'value'].forEach(function(name){
			wsWidgetProto[name] = function(val, force){
				if(!this._init || force || val !== this.options[name]){
					this.element.prop(name, this.formatValue(val));
					this.options[name] = val;
					this._propertyChange(name);
					this.mirrorValidity();
				}
			};
		});
		
		['readonly', 'disabled'].forEach(function(name){
			var isDisabled = name == 'disabled';
			wsWidgetProto[name] = function(val, boolVal){
				var options = this.options;
				if(options[name] != boolVal || !this._init){
					options[name] = !!boolVal;
					
					if(!isDisabled && options.buttonOnly){
						this.inputElements.attr({'aria-readonly': options[name]});
					} else {
						this.inputElements.prop(name, options[name]);
					}
					this.buttonWrapper[options[name] ? 'addClass' : 'removeClass']('ws-'+name);
					if(isDisabled){
						$('button', this.buttonWrapper).prop('disabled', options[name]);
					}
				}
			};
		});
		
		var spinBtnProto = $.extend({}, wsWidgetProto, {
			_create: function(){
				var o = this.options;
				var helper = createHelper(o.type);
				
				this.elemHelper = $('<input type="'+ o.type+'" />');
				this.asNumber = helper.asNumber;
				this.asValue = helper.asValue;
				this.isValid = helper.isValid;
				this.asDate = helper.asDate;
				
				
				wsWidgetProto._create.apply(this, arguments);
				this._init = false;
				
				this.buttonWrapper.html('<span unselectable="on" class="step-controls"><span class="step-up step-control"></span><span class="step-down step-control"></span></span>');
				
				if(this.type == 'number'){
					this.inputElements.attr('inputmode', 'numeric');
				}
				
				if((!o.max && typeof o.relMax == 'number') || (!o.min && typeof o.relMin == 'number')){
					webshims.error('relMax/relMin are not supported anymore calculate at set it your own.');
				}

				if(this.options.relDefaultValue){
					webshims.warn('relDefaultValue was removed use startValue instead!');
				}

				this._init = true;
			},
			createOpts: ['step', 'min', 'max', 'readonly', 'title', 'disabled', 'tabindex', 'placeholder', 'defaultValue', 'value', 'required'],
			_addSplitInputs: function(){
				if(!this.inputElements){
					var create = splitInputs[this.type]._create(this.options);
					this.splits = create.splits;
					this.inputElements = $(create.elements).prependTo(this.element).filter('input, select');
				}
			},
			addZero: addZero,
			_setStartInRange: function(){
				var start = this.options.startValue && this.asNumber( this.options.startValue ) || steps[this.type].start || 0;
				if(!isNaN(this.minAsNumber) && start < this.minAsNumber){
					start = this.minAsNumber;
				} else if(!isNaN(this.maxAsNumber) && start > this.maxAsNumber){
					start = this.maxAsNumber;
				}
				try {
					this.elemHelper.prop('valueAsNumber', start);
				} catch(e){
					webshims.warn('valueAsNumber set: '+e);
				}
				this.options.defValue = this.elemHelper.prop('value');
			},
			reorderInputs: function(){
				if(splitInputs[this.type]){
					var element = this.element.attr('dir', curCfg.date.isRTL ? 'rtl' : 'ltr');
					splitInputs[this.type].sort(element, this.options);
					setTimeout(function(){
						var data = webshims.data(element);
						if(data && data.shadowData){
							data.shadowData.shadowFocusElement = element.find('input, select')[0] || element[0];
						}
					}, 9);
				}
			},
			step: function(val){
				var defStep = steps[this.type];
				this.options.step = val;
				this.elemHelper.prop('step', retDefault(val, defStep.step));
				this.mirrorValidity();
			},
			_beforeValue: function(val){
				this.valueAsNumber = this.asNumber(val);
				this.options.value = val;

				if(isNaN(this.valueAsNumber) || (!isNaN(this.minAsNumber) && this.valueAsNumber < this.minAsNumber) || (!isNaN(this.maxAsNumber) && this.valueAsNumber > this.maxAsNumber)){
					this._setStartInRange();
				} else {
					this.elemHelper.prop('value', val);
					this.options.defValue = "";
				}
			},
			toFixed: function(val, force){
				var o = this.options;
				if(o.toFixed && o.type == 'number' && val && !isNaN(this.valueAsNumber) && (force || !this.element.is(':focus')) && (!o.fixOnlyFloat || (this.valueAsNumber % 1))){
					val = formatVal[this.type](this.valueAsNumber.toFixed(o.toFixed), this.options);
				}
				return val;
			}
		});
		
		['defaultValue', 'value'].forEach(function(name){
			var isValue = name == 'value';
			spinBtnProto[name] = function(val, force, isLive){
				var selectionEnd;
				if(!this._init || force || this.options[name] !== val){
					if(isValue){
						this._beforeValue(val);
					} else {
						this.elemHelper.prop(name, val);
					}

					val = formatVal[this.type](val, this.options);
					if(this.options.splitInput){
						$.each(this.splits, function(i, elem){
							var setOption;
							if(!(name in elem) && !isValue && $.nodeName(elem, 'select')){
								$('option[value="'+ val[i] +'"]', elem).prop('defaultSelected', true);
							} else {
								$.prop(elem, name, val[i]);
							}
						});
					} else {
						val = this.toFixed(val);
						if(isLive && this._getSelectionEnd){
							selectionEnd = this._getSelectionEnd(val);
						}
						this.element.prop(name, val);
						if(selectionEnd != null){
							this.element.prop('selectionEnd', selectionEnd);
						}
					}
					this._propertyChange(name);
					this.mirrorValidity();
				}
			};
		});
		
		$.each({min: 1, max: -1}, function(name, factor){
			var numName = name +'AsNumber';
			spinBtnProto[name] = function(val){
				this.elemHelper.prop(name, val);
				this[numName] = this.asNumber(val);

				if(this.valueAsNumber != null && (isNaN(this.valueAsNumber) || (!isNaN(this[numName]) && (this.valueAsNumber * factor) < (this[numName] * factor)))){
					this._setStartInRange();
				}
				this.options[name] = val;
				if(this._init){
					createYearSelect({elements: this.inputElements}, this.options);
				}
				this._propertyChange(name);
				this.mirrorValidity();
			};
		});
		
		$.fn.wsBaseWidget = function(opts){
			opts = $.extend({}, opts);
			return this.each(function(){
				webshims.objectCreate(wsWidgetProto, {
					element: {
						value: $(this)
					}
				}, opts);
			});
		};
		
		$.fn.wsBaseWidget.wsProto = wsWidgetProto;
		
		$.fn.spinbtnUI = function(opts){
			opts = $.extend({
				monthNames: 'monthNamesShort'
			}, opts);
			return this.each(function(){
				webshims.objectCreate(spinBtnProto, {
					element: {
						value: $(this)
					}
				}, opts);
			});
		};
		
		$.fn.spinbtnUI.wsProto = spinBtnProto;

		webshims._format = formatVal;
		
	})();



	if(!$.fn.wsTouchClick){

		$.fn.wsTouchClick = (function(){
			var supportsTouchaction = ('touchAction' in document.documentElement.style);
			var addTouch = !supportsTouchaction && ('ontouchstart' in window) && document.addEventListener;
			return function(target, handler){
				var touchData, touchEnd, touchStart, stopClick, allowClick;
				var runHandler = function(){
					if(!stopClick){
						return handler.apply(this, arguments);
					}
				};
				if($.isFunction(target)){
					handler = target;
					target = false;
					this.on('click', runHandler);
				} else {
					this.on('click', target, runHandler);
				}
				if(addTouch){
					allowClick = function(){
						stopClick = false;
					};
					touchEnd = function(e){
						var ret, touch;
						e = e.originalEvent || {};
						$(this).off('touchend touchcancel', touchEnd);
						var changedTouches = e.changedTouches || e.touches;
						if(e.type == 'touchcancel' || !touchData || !changedTouches || changedTouches.length != 1){
							return;
						}

						touch = changedTouches[0];
						if(Math.abs(touchData.x - touch.pageX) > 40 || Math.abs(touchData.y - touch.pageY) > 40 || Date.now() - touchData.now > 300){
							return;
						}

						e.preventDefault();
						stopClick = true;
						setTimeout(allowClick, 400);

						ret = handler.apply(this, arguments);

						return ret;
					};

					touchStart = function(e){
						var touch, elemTarget;
						if((!e || e.touches.length != 1)){
							return;
						}
						touch = e.touches[0];
						elemTarget = target ? $(touch.target).closest(target) : $(this);
						if(!elemTarget.length){
							return;
						}
						touchData = {
							x: touch.pageX,
							y: touch.pageY,
							now: Date.now()
						};
						elemTarget.on('touchend touchcancel', touchEnd);
					};

					this.each(function(){
						this.addEventListener('touchstart', touchStart, true);
					});
				} else if(supportsTouchaction && !target){
					this.css('touch-action', 'manipulation');
				}


				return this;
			};
		})();
	}

	(function(){
		var picker = {};
		var modern = window.Modernizr;
		var assumeVirtualKeyBoard = (modern && (modern.touchevents || modern.touch)) || (/android|iphone|ipad|ipod|blackberry|iemobile/i.test(navigator.userAgent.toLowerCase()));
		webshims.inlinePopover = {
			_create: function(){
				this.element = $('<div class="ws-inline-picker"><div class="ws-po-box" /></div>').data('wspopover', this);
				this.contentElement = $('.ws-po-box', this.element);
				this.element.insertAfter(this.options.prepareFor);
			},
			show: $.noop,
			hide: $.noop,
			preventBlur: $.noop,
			isVisible: true
		};
		
		picker.isInRange = function(value, max, min){
			return !((min[0] && min[0] > value[0]) || (max[0] && max[0] < value[0]));
		};
		
		
		picker.createYearSelect = function(value, max, min, valueAdd, stepper){
			if(!stepper){
				stepper = {start: value, step: 1, label: value};
			}
			var temp;
			var goUp = true;
			var goDown = true;
			var options = ['<option selected="">'+ stepper.label + '</option>'];
			var i = 0;
			var createOption = function(value, add){
				var value2, label;
				if(stepper.step > 1){
					value2 = value + stepper.step - 1;
					label = value+' – '+value2;
				} else {
					label = value;
				}
				
				if(picker.isInRange([value], max, min) || (value2 && picker.isInRange([value2], max, min))){
					options[add]('<option value="'+ (value+valueAdd) +'">'+ label +'</option>');
					return true;
				}
			};
			if(!valueAdd){
				valueAdd = '';
			}
			while(i < 18 && (goUp || goDown)){
				i++;
				if(goUp){
					temp = stepper.start - (i * stepper.step);
					goUp = createOption(temp, 'unshift');
				}
				if(goDown){
					temp = stepper.start + (i * stepper.step);
					goDown = createOption(temp, 'push');
				}
				
			}
			
			return options;
		};
		
		picker._genericSetFocus = function(element, _noFocus){
			element = $(element || this.activeButton);
			
			if(!this.popover.openedByFocus && !_noFocus){
				var that = this;
				var setFocus = function(noTrigger){
					clearTimeout(that.timer);
					that.timer = setTimeout(function(){
						if(element[0]){
							element.trigger('focus');
							if(noTrigger !== true && !element.is(':focus')){
								setFocus(true);
							}
						}
					}, that.popover.isVisible ? 0 : 360);
				};
				this.popover.activateElement(element);
				setFocus();
			}
		};
		
		picker._actions = {
			changeInput: function(val, popover, data){
				if(!data.options.noChangeDismiss){
					picker._actions.cancel(val, popover, data);
				}
				data.setChange(val);
			},
			cancel: function(val, popover, data){
				if(!data.options.inlinePicker){
					popover.stopOpen = true;
					if(!popover.openedByFocus && assumeVirtualKeyBoard){
						$('button', data.buttonWrapper).trigger('focus');
					} else {
						data.element.getShadowFocusElement().trigger('focus');
					}
					setTimeout(function(){
						popover.stopOpen = false;
					}, 9);
					popover.hide();
				}
			}
		};
		
		
		picker.commonInit = function(data, popover){
			if(data._commonInit){return;}
			data._commonInit = true;
			var tabbable;
			
			popover.isDirty = true;

			popover.element.on('updatepickercontent pickerchange', function(){
				tabbable = false;
			});
			
			if(!data.options.inlinePicker){
				popover.contentElement.on({
					keydown: function(e){
						if(e.keyCode == 9){
							if(!tabbable){
								tabbable = $('input:not(:disabled), [tabindex="0"]:not(:disabled)', this).filter(':visible');
							}
							var index = tabbable.index(e.target);
							if(e.shiftKey && index <= 0){
								tabbable.last().focus();
								return false;
							}
							if(!e.shiftKey && index >= tabbable.length - 1){
								tabbable.first().focus();
								return false;
							}
						} else if(e.keyCode == 27){
							data.element.getShadowFocusElement().focus();
							popover.hide();
							return false;
						}
					}
				});
			}
			
			data._propertyChange = (function(){
				var timer;
				var update = function(){
					if(popover.isVisible){
						popover.element.triggerHandler('updatepickercontent');
					}
				};
				return function(prop){
					if(prop == 'value' && (!data.options.inlinePicker || data._handledValue )){return;}
					popover.isDirty = true;
					
					if(popover.isVisible){
						clearTimeout(timer);
						timer = setTimeout(update, 9);
					}
				};
			})();
			
			popover.activeElement = $([]);
			
			popover.activateElement = function(element){
				element = $(element);
				if(element[0] != popover.activeElement[0]){
					popover.activeElement.removeClass('ws-focus');
					element.addClass('ws-focus');
				}
				popover.activeElement = element;
			};
			popover.element.on({
				wspopoverbeforeshow: function(){
					data.element.triggerHandler('wsupdatevalue');
					popover.element.triggerHandler('updatepickercontent');
				}
			});
			
			
			$(data.orig).on('remove', function(e){
				if(!e.originalEvent){
					$(document).off('wslocalechange', data._propertyChange);
				}
			});
		};
		
		
		picker._common = function(data){
			if(data.options.nopicker){return;}
			var options = data.options;
			var popover = webshims.objectCreate(options.inlinePicker ? webshims.inlinePopover : webshims.wsPopover, {}, $.extend(options.popover || {}, {prepareFor: options.inlinePicker ? data.buttonWrapper : data.element}));
			var opener = $('<button type="button" class="ws-popover-opener"><span /></button>').appendTo(data.buttonWrapper);
			
			var showPickerContent = function(){
				(picker[data.type].showPickerContent || picker.showPickerContent)(data, popover);
			};
			var show = function(){
				var type = loadPicker(data.type, 'DOM');
				if(!options.disabled && !options.readonly && (options.inlinePicker || !popover.isVisible)){
					webshims.ready(type, showPickerContent);
					popover.show(data.element);
				}
			};
			var open = function(){
				if((options.inlinePicker || popover.isVisible) && popover.activeElement){
					popover.openedByFocus = false;
					popover.activeElement.focus();
				}
				show();
			};
			var toogle = function(){
				if(popover.openedByFocus || !popover.isVisible){
					open();
				} else {
					popover.hide();
				}
			}
			
			
			options.containerElements.push(popover.element[0]);
			
			popover.element
				.addClass(data.type+'-popover input-picker')
				.attr({role: 'application'})
				.on({
					wspopoverhide: function(){
						popover.openedByFocus = false;
					},
					focusin: function(e){
						if(popover.activateElement){
							popover.openedByFocus = false;
							popover.activateElement(e.target);
						}
					},
					focusout: function(){
						if(popover.activeElement){
							popover.activeElement.removeClass('ws-focus');
						}
						if(options.inlinePicker){
							popover.openedByFocus = true;
						}
					}
				})
			;
			
			labelWidth(popover.element.children('div.ws-po-outerbox').attr({role: 'group'}), options.labels, true);
			labelWidth(opener, options.labels, true);
			
			if(options.tabindex != null){
				opener.attr({tabindex: options.tabindex});
			}
			
			if(options.disabled){
				opener.prop({disabled: true});
			}
			
			
			opener.wsTouchClick(toogle);
			
			if(options.inlinePicker){
				popover.openedByFocus = true;
			} else {
				opener
					.on({
						mousedown: function(){
							stopPropagation.apply(this, arguments);
							popover.preventBlur();
						},
						keydown: function(e){
							if(e.keyCode == 40 && e.altKey){
								open();
							}
						},
						'focus mousedown': (function(){
							var allowClose = true;
							var reset = function(){
								allowClose = true;
							};
							return function(e){
								if(e.type  == 'mousedown'){
									allowClose = false;
									setTimeout(reset);
								}
								if(e.type == 'focus' && allowClose && options.openOnFocus && popover.openedByFocus && (popover.options.appendTo == 'auto' || popover.options.appendTo == 'element')){
									popover.hide();
								} else {
									popover.preventBlur();
								}
							};
						})()
					})
				;
				
				(function(){
					var mouseFocus = false;
					var resetMouseFocus = function(){
						mouseFocus = false;
					};
					data.inputElements.on({
						keydown: function(e){
							if(e.keyCode == 40 && e.altKey && !$.nodeName(e.target, 'select')){
								open();
							}
						},
						focus: function(e){
							if(!popover.stopOpen && (options.buttonOnly || options.openOnFocus || (mouseFocus && options.openOnMouseFocus)) && !$.nodeName(e.target, 'select')){
								popover.openedByFocus = options.buttonOnly ? false : !options.noInput;
								show();
							} else {
								popover.preventBlur();
							}
						},
						mousedown: function(e){
							mouseFocus = true;
							setTimeout(resetMouseFocus, 9);
							if(options.buttonOnly && popover.isVisible && popover.activeElement){
								popover.openedByFocus = false;
								setTimeout(function(){
									popover.openedByFocus = false;
									popover.activeElement.focus();
								}, 4);
							}
							if(data.element.is(':focus')  && !$.nodeName(e.target, 'select')){
								popover.openedByFocus = options.buttonOnly ? false : !options.noInput;
								show();
							}
							popover.preventBlur();
						}
					});
				})();
			}
			
			data.popover = popover;
			data.opener = opener;
			$(data.orig).on('remove', function(e){
				if(!e.originalEvent){
					setTimeout(function(){
						opener.remove();
						popover.element.remove();
					}, 4);
				}
			});
			if(options.inlinePicker){
				show();
			}
		};
		
		picker.month = picker._common;
		picker.date = picker._common;
		picker.time = picker._common;
		picker['datetime-local'] = picker._common;
//		picker.week = picker._common;
		picker.color = function(data){
			var ret = picker._common.apply(this, arguments);
			var alpha = $(data.orig).data('alphacontrol');
			var colorIndicator = data.opener
				.prepend('<span class="ws-color-indicator-bg"><span class="ws-color-indicator" /></span>')
				.find('.ws-color-indicator')
			;
			var showColor = function(){
				colorIndicator.css({backgroundColor: $.prop(this, 'value') || '#000000'});
			};
			var showOpacity = (function(){
				var timer;
				var show = function(){
					try {
						var value = data.alpha.prop('valueAsNumber') / (data.alpha.prop('max') || 1);
						if(!isNaN(value)){
							colorIndicator.css({opacity: value});
						}
					} catch(er){}
					
				};
				return function(e){
					clearTimeout(timer);
					timer = setTimeout(show, !e || e.type == 'change' ? 4: 40);
				};
			})();
			data.alpha = (alpha) ? $('#'+alpha) : $([]);
			
			$(data.orig).on('wsupdatevalue change', showColor).each(showColor);
			data.alpha.on('wsupdatevalue change input', showOpacity).each(showOpacity);
			return ret;
		};
		
		webshims.picker = picker;
	})();
	
	(function(){
		
		var stopCircular, isCheckValidity;
		
		var supportInputTypes = webshims.support.inputtypes;
		var inputTypes = {
			
		};
		var boolAttrs = {disabled: 1, required: 1, readonly: 1};
		var copyProps = [
			'disabled',
			'readonly',
			'value',
			'defaultValue',
			'min',
			'max',
			'step',
			'title',
			'required',
			'placeholder'
		];
		
		//
		var copyAttrs = ['data-placeholder', 'tabindex'];
			
		$.each(copyProps.concat(copyAttrs), function(i, name){
			var fnName = name.replace(/^data\-/, '');
			webshims.onNodeNamesPropertyModify('input', name, function(val, boolVal){
				if(!stopCircular){
					var shadowData = webshims.data(this, 'shadowData');
					if(shadowData && shadowData.data && shadowData.nativeElement === this && shadowData.data[fnName]){
						if(boolAttrs[fnName]){
							shadowData.data[fnName](val, boolVal);
						} else {
							shadowData.data[fnName](val);
						}
					}
				}
			});
		});
		
		if(options.replaceUI && 'valueAsNumber' in document.createElement('input')){
			var reflectFn = function(){
				if(webshims.data(this, 'hasShadow')){
					$.prop(this, 'value', $.prop(this, 'value'));
				}
			};
			
			webshims.onNodeNamesPropertyModify('input', 'valueAsNumber', reflectFn);
			webshims.onNodeNamesPropertyModify('input', 'valueAsDate', reflectFn);
			$.each({stepUp: 1, stepDown: -1}, function(name, stepFactor){
				var stepDescriptor = webshims.defineNodeNameProperty('input', name, {
					prop: {
						value: function(){
							var ret;
							if(stepDescriptor.prop && stepDescriptor.prop._supvalue){
								ret = stepDescriptor.prop._supvalue.apply(this, arguments);
								reflectFn.apply(this, arguments);
							}
							return ret;
						}
					}
				});
			});
		}
		
		var extendType = (function(){
			return function(name, data){
				inputTypes[name] = data;
				data.attrs = $.merge([], copyAttrs, data.attrs);
				data.props = $.merge([], copyProps, data.props);
			};
		})();
		
		var isVisible = function(){
			return $.css(this, 'display') != 'none';
		};
		var sizeInput = function(data){
			var init, parent, lastWidth, left, right, isRtl, hasButtons;
			var oriStyleO = data.orig.style;
			var styleO = data.element[0].style;
			if($.support.boxSizing == null){
				$(function(){
					parent = data.orig.parentNode;
				});
			} else {
				parent = data.orig.parentNode;
			}
			var updateStyles = function(){
				var curWidth, marginR, marginL, assignWidth;
				var correctWidth = 0.8;

				if(parent){
					curWidth = parent.offsetWidth;
				}

				if(!init || (curWidth && curWidth != lastWidth)){
					lastWidth = curWidth;
					oriStyleO.display = '';
					styleO.display = 'none';

					if(!init){
						hasButtons = data.buttonWrapper && data.buttonWrapper.filter(isVisible).length;
						isRtl = hasButtons && data.buttonWrapper.css('direction') == 'rtl';
						if(isRtl){
							left = 'Right';
							right = 'Left';
						} else {
							left = 'Left';
							right = 'Right';
						}
						if(hasButtons){
							data.buttonWrapper[isRtl ? 'addClass' : 'removeClass']('ws-is-rtl');
						}
					}

					marginR = $.css( data.orig, 'margin'+right);

					styleO['margin'+left] = $.css( data.orig, 'margin'+left);
					styleO['margin'+right] = hasButtons ? '0px' : marginR;

					
					if(hasButtons){

						marginL = (parseInt(data.buttonWrapper.css('margin'+left), 10) || 0);
						styleO['padding'+right] = '';

						if(marginL < 0){
							marginR = (parseInt(marginR, 10) || 0) + ((data.buttonWrapper.outerWidth() + marginL) * -1);
							data.buttonWrapper[0].style['margin'+right] = marginR+'px';

							styleO['padding'+right] = ((parseInt( data.element.css('padding'+right), 10) || 0) + data.buttonWrapper.outerWidth()) +'px';

						} else {
							data.buttonWrapper[0].style['margin'+right] = marginR;
							correctWidth = data.buttonWrapper.outerWidth(true) + correctWidth;
						}
					}

					assignWidth = $(data.orig).outerWidth() - correctWidth;

					styleO.display = '';
					data.element.outerWidth(assignWidth);
					oriStyleO.display = 'none';
					init = true;
				}

			};
			oriStyleO.webkitAppearance = 'none';
			data.element.onWSOff('updateshadowdom', updateStyles, true);
		};
		
		
		var implementType = function(){
			
			var type = $.prop(this, 'type');
			var i, opts, data, optsName, labels, cNames, hasInitialFocus;

			if(inputTypes[type] && webshims.implement(this, 'inputwidgets') && (!supportInputTypes[type] || !$(this).hasClass('ws-noreplace'))){
				data = {};
				optsName = type;
				hasInitialFocus = $(this).is(':focus');
				labels = $(this).jProp('labels');

				opts = $.extend(webshims.getOptions(this, type, [options.widgets, options[type], $($.prop(this, 'form')).data(type)]), {
					orig: this,
					type: type,
					labels: labels,
					options: {},
					input: function(val){
						opts._change(val, 'input');
					},
					change: function(val){
						opts._change(val, 'change');
					},
					_change: function(val, trigger){
						stopCircular = true;
						$.prop(opts.orig, 'value', val);
						stopCircular = false;
						if(trigger){
							$(opts.orig).trigger(trigger);
						}
					},
					containerElements: []
				});
				
				for(i = 0; i < copyProps.length; i++){
					opts[copyProps[i]] = $.prop(this, copyProps[i]);
				}
				
				for(i = 0; i < copyAttrs.length; i++){
					optsName = copyAttrs[i].replace(/^data\-/, '');
					if(optsName == 'placeholder' || !opts[optsName]){
						opts[optsName] = $.attr(this, copyAttrs[i]) || opts[optsName];
					}
				}

				if(opts.formatMonthNames){
					webshims.error('formatMonthNames was renamded to monthNames');
				}
				if(opts.onlyMonthDigits){
					opts.monthNames = 'monthDigits';
				}
				data.shim = inputTypes[type]._create(opts);

				webshims.addShadowDom(this, data.shim.element, {
					data: data.shim || {}
				});
				
				data.shim.options.containerElements.push(data.shim.element[0]);
				cNames = $.prop(this, 'className');
				if(opts.classes){
					cNames += ' '+opts.classes;
					$(this).addClass(opts.classes);
				}
				
				if(opts.splitInput || type == 'range'){
					cNames = cNames.replace('form-control', '');
				}
				
				data.shim.element.on('change input', stopPropagation).addClass(cNames+' '+webshims.shadowClass);

				if(data.shim.buttonWrapper){

					data.shim.buttonWrapper.addClass('input-button-size-'+(data.shim.buttonWrapper.children().filter(isVisible).length)+' '+webshims.shadowClass);
					
					if(data.shim.buttonWrapper.filter(isVisible).length){
						data.shim.element.addClass('has-input-buttons');
					}
				}
				
				labelWidth($(this).getShadowFocusElement(), labels);
				
				$(this).on('change', function(e){
					if(!stopCircular){
						data.shim.value($.prop(this, 'value'));
					}
				});
				
				(function(){
					var has = {
						focusin: true,
						focus: true
					};
					var timer;
					var hasFocusTriggered = false;
					var hasFocus = false;
					
					$(data.shim.options.containerElements)
						.on({
							'focusin focus focusout blur': function(e){
								e.stopImmediatePropagation();
								hasFocus = has[e.type];
								clearTimeout(timer);
								timer = setTimeout(function(){
									if(hasFocus != hasFocusTriggered){
										hasFocusTriggered = hasFocus;
										$(opts.orig).triggerHandler(hasFocus ? 'focus' : 'blur');
										$(opts.orig).trigger(hasFocus ? 'focusin' : 'focusout');
									}
									hasFocusTriggered = hasFocus;
								}, 9);
							}
						})
					;
				})();
				
				
				
				if(hasFormValidation){
					$(opts.orig).on('firstinvalid', function(e){
						if(!webshims.fromSubmit && isCheckValidity){return;}
						$(opts.orig).off('invalid.replacedwidgetbubble').on('invalid.replacedwidgetbubble', function(evt){
							if(!evt.isDefaultPrevented()){
								webshims.validityAlert.showFor( e.target );
								e.preventDefault();
								evt.preventDefault();
							}
							$(opts.orig).off('invalid.replacedwidgetbubble');
						});
					});
				}

				if(opts.calculateWidth){
					sizeInput(data.shim);
				} else {
					$(this).css('display', 'none');
				}
				if(hasInitialFocus){
					$(this).getShadowFocusElement().trigger('focus');
				}
			}
			
		};
		
		
		if(hasFormValidation){
			['input', 'form'].forEach(function(name){
				var desc = webshims.defineNodeNameProperty(name, 'checkValidity', {
					prop: {
						value: function(){
							isCheckValidity = true;
							var ret = desc.prop._supvalue.apply(this, arguments);
							isCheckValidity = false;
							return ret;
						}
					}
				});
			});
		}
		
		var replace = {};

		if(options.replaceUI){
			$.each($.extend(replace, $.isPlainObject(options.replaceUI) ? options.replaceUI : {
				'range': 1,
				'number': 1,
				'time': 1,
				'month': 1,
				'date': 1,
				'color': 1,
				'datetime-local': 1
			}), function(name, val){
				if(supportInputTypes[name] && val == 'auto'){
					replace[name] = webshims._getAutoEnhance(val);
				}
			});
		}

		if(supportInputTypes.number && navigator.userAgent.indexOf('Touch') == -1 && ((/MSIE 1[0|1]\.\d/.test(navigator.userAgent)) || (/Trident\/7\.0/.test(navigator.userAgent)))){
			replace.number = 1;
		}
		
		if(replace.range !== false && (!supportInputTypes.range || replace.range)){
			extendType('range', {
				_create: function(opts, set){
					var data = $('<span />').insertAfter(opts.orig).rangeUI(opts).data('rangeUi');
					return data;
				}
			});
		}
		
		
		['number', 'time', 'month', 'date', 'color', 'datetime-local'].forEach(function(name){
			if(replace[name] !== false && (!supportInputTypes[name] || replace[name])){
				extendType(name, {
					_create: function(opts, set){
						if(opts.monthSelect || opts.daySelect || opts.yearSelect){
							opts.splitInput = true;
						}

						if(opts.splitInput && !splitInputs[name]){
							webshims.warn('splitInput not supported for '+ name);
							opts.splitInput = false;
						}
						var markup = opts.splitInput ?
								'<span class="ws-'+name+' ws-input ws-inputreplace" role="group"></span>' :
								'<input class="ws-'+name+' ws-inputreplace" type="text" />';
						var data = $(markup).insertAfter(opts.orig);
						if(steps[name]){
							data = data.spinbtnUI(opts).data('wsWidget'+name);
						} else {
							data = data.wsBaseWidget(opts).data('wsWidget'+name);
						}
						if(webshims.picker && webshims.picker[name]){
							webshims.picker[name](data);
						}
						return data;
					}
				});
			}
		});
		
		var init =  function(){
			webshims.addReady(function(context, contextElem){
				$('input', context)
					.add(contextElem.filter('input'))
					.each(implementType)
				;
			});
		};


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

		if(formcfg._isLoading){
			$(formcfg).one('change', init);
		} else {
			init();
		}
		
	})();
});

