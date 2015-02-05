webshims.register('form-validators', function($, webshims, window, document, undefined, options){
"use strict";

(function(){
	if(webshims.refreshCustomValidityRules){
		webshims.error("form-validators already included. please remove custom-validity.js");
	}
	
	var customValidityRules = {};
	var formReady = false;
	var blockCustom;
	var initTest;
	var onEventTest = function(e){
		webshims.refreshCustomValidityRules(e.target);
	};
	var noValidate = function(){
		return !noValidate.types[this.type];
	};
	noValidate.types = {
		hidden: 1,
		image: 1,
		button: 1,
		reset: 1,
		submit: 1
	};
	
	webshims.customErrorMessages = {};
	webshims.addCustomValidityRule = function(name, test, defaultMessage){
		customValidityRules[name] = test;
		if(!webshims.customErrorMessages[name]){
			webshims.customErrorMessages[name] = [];
			webshims.customErrorMessages[name][''] = defaultMessage || name;
		}
		if(formReady){
			$('input, select, textarea')
				.filter(noValidate)
				.each(function(){
					testValidityRules(this);
				})
			;
		}
	};
	webshims.refreshCustomValidityRules = function(elem){
		if(!initTest){return;}
		
		var data = $(elem).data() || $.data(elem, {});
		var customMismatchedRule = data.customMismatchedRule;
		var validity = $.prop(elem, 'validity') || {};
		var message = '';
		var setMessage = function(message, errorType){
			blockCustom = true;
			
			
			if(message){
				data.customMismatchedRule = errorType;
				
				if(typeof message != 'string'){
					message = webshims.getContentValidationMessage(elem, false, errorType); 
					
					if(message && typeof message == 'object'){
						message = message[errorType];
					}
					
					if(!message || typeof message != 'string'){
						message = webshims.customErrorMessages[errorType][webshims.activeLang()] || webshims.customErrorMessages[errorType]['']  || message.customError || message.defaultMessage || '';
					}
				}
			} else {
				message = '';
				data.customMismatchedRule = '';
			}
			
			
			
			$(elem).setCustomValidity(message);
			blockCustom = false;
		};
		if(customMismatchedRule || validity.valid || (data.dependentValidation && !data.dependentValidation._init)){
			var val = $(elem).val();
			$.each(customValidityRules, function(name, test){
				message = test(elem, val, data, setMessage) || '';
				customMismatchedRule = name;
				if(message){
					return false;
				}
			});
			if(message != 'async' && (message || !validity.valid)){
				setMessage(message, customMismatchedRule);
			}
		}
		return message;
	};
	var testValidityRules = webshims.refreshCustomValidityRules;
	
	webshims.ready('forms form-validation', function(){
		
		$.propHooks.setCustomValidity = {
			get: function(elem){
				if(!blockCustom){
					$.data(elem, 'customMismatchedRule', '');
				}
				return null;
			}
		};
		
		
		setTimeout(function(){
			webshims.addReady(function(context, selfElement){
				initTest = true;
				$('input, select, textarea', context).add(selfElement.filter('input, select, textarea'))
					.filter(noValidate)
					.each(function(){
						testValidityRules(this);
					})
				;
				
				formReady = true;
			});
			$(document).on('refreshCustomValidityRules', onEventTest);
		}, 9);
		
	});
	
})();

/*
 * adds support for HTML5 constraint validation
 * 	- partial pattern: <input data-partial-pattern="RegExp" />
 *  - creditcard-validation: <input class="creditcard-input" />
 *  - several dependent-validation patterns (examples):
 *  	- <input type="email" id="mail" /> <input data-dependent-validation='mail' />
 *  	- <input type="date" id="start" data-dependent-validation='{"from": "end", "prop": "max"}' /> <input type="date" id="end" data-dependent-validation='{"from": "start", "prop": "min"}' />
 *  	- <input type="checkbox" id="check" /> <input data-dependent-validation='checkbox' />
 */
(function(){
	var formCFG = webshims.cfg.forms;
	var addCustomValidityRule = webshims.addCustomValidityRule;
	var getId = function(name){
		return document.getElementById(name);
	};
	addCustomValidityRule('partialPattern', function(elem, val, pattern){
		pattern = pattern.partialPattern;
		if(!val || !pattern){return;}
		return !(new RegExp('(' + pattern + ')', 'i').test(val));
	}, 'This format is not allowed here.');
	
	
	addCustomValidityRule('tooShort', function(elem, val, data){
		if(!val || !data.minlength){return;}
		return data.minlength > val.length;
	}, 'Entered value is too short.');
	
	var groupTimer = {};
	addCustomValidityRule('group-required', function(elem, val){
		var name = elem.name;
		if(!name || elem.type !== 'checkbox' || !$(elem).hasClass('group-required')){return;}
		var checkboxes = $( (elem.form && elem.form[name]) || document.getElementsByName(name));
		var isValid = checkboxes.filter(':checked:enabled');
		if(groupTimer[name]){
			clearTimeout(groupTimer[name]);
		}
		groupTimer[name] = setTimeout(function(){
			checkboxes
				.addClass('group-required')
				.off('click.groupRequired')
				.on('click.groupRequired', function(){
					checkboxes.filter('.group-required').each(function(){
						webshims.refreshCustomValidityRules(this);
					});
				})
			;
		}, 9);
		
		return !(isValid[0]);
	}, 'Please check one of these checkboxes.');
	
	// based on https://sites.google.com/site/abapexamples/javascript/luhn-validation
	addCustomValidityRule('creditcard', function(elem, value){
		if(!value || !$(elem).hasClass('creditcard-input')){return;}
		value = value.replace(/\-/g, "");
		//if it's not numeric return true >- for invalid
		if(value != value * 1){return true;}
		var len = value.length;
		var sum = 0;
		var mul = 1;
		var ca;
	
		while (len--) {
			ca = parseInt(value.charAt(len),10) * mul;
			sum += ca - (ca>9)*9;// sum += ca - (-(ca>9))|9
			// 1 <--> 2 toggle.
			mul ^= 3; // (mul = 3 - mul);
		}
		return !((sum%10 === 0) && (sum > 0));
	}, 'Please enter a valid credit card number');
	
	var dependentDefaults = {
		//"from": "IDREF || UniqueNAMEREF", //required property: element 
		"prop": "value", //default: value||disabled	(last if "from-prop" is checked)
		"from-prop": "value", //default: value||checked (last if element checkbox or radio)
		"toggle": false
	};
	
	var getGroupElements = function(elem) {
		return $(elem.form[elem.name]).filter('[type="radio"]');
	};
	webshims.ready('form-validation', function(){
		if(webshims.modules){
			getGroupElements = webshims.modules["form-core"].getGroupElements || getGroupElements;
		}
	});
	
	addCustomValidityRule('dependent', function(elem, val, data){
		data = data.dependentValidation;
		if( !data ){return;}
		var specialVal;
		var depFn = function(e){
			var val = $.prop(data.masterElement, data["from-prop"]);
			if(specialVal){
				val = $.inArray(val, specialVal) !== -1;
			}
			if(data.toggle){
				val = !val;
			}
			$.prop( elem, data.prop, val);
			if(e){
				$(elem).getShadowElement().filter('.user-error, .user-success').trigger('refreshvalidityui');
			}
		};
		
		if(!data._init || !data.masterElement){
			
			if(typeof data == 'string'){
				data = {"from": data};
			}
			
			
			data.masterElement = document.getElementById(data["from"]) || (document.getElementsByName(data["from"] || [])[0]);
			
			if (!data.masterElement || !data.masterElement.form) {return;}
			
			if(/radio|checkbox/i.test(data.masterElement.type)){
				if(!data["from-prop"]){
					data["from-prop"] = 'checked';
				}
				if(!data.prop && data["from-prop"] == 'checked'){
					data.prop = 'disabled';
				}
			} else if(!data["from-prop"]){
				data["from-prop"] = 'value';
			}
			
			if(data["from-prop"].indexOf('value:') === 0){
				specialVal = data["from-prop"].replace('value:', '').split('||');
				data["from-prop"] = 'value';
				
			}
			
			data = $.data(elem, 'dependentValidation', $.extend({_init: true}, dependentDefaults, data));

			if(data.prop !== "value" || specialVal){
				$(data.masterElement.type === 'radio' && getGroupElements(data.masterElement) || data.masterElement).bind('change', depFn);
			} else {
				$(data.masterElement).bind('change', function(){
					webshims.refreshCustomValidityRules(elem);
					$(elem).getShadowElement().filter('.user-error, .user-success').trigger('refreshvalidityui');
				});
			}
		}

		if(data.prop == "value" && !specialVal){
			return ($.prop(data.masterElement, 'value') != val);
		} else {
			depFn();
			return '';
		}
		
	}, 'The value of this field does not repeat the value of the other field');
	
	
	if(window.JSON){
		addCustomValidityRule('ajaxvalidate', function(elem, val, data){
			if(!val || !data.ajaxvalidate){return;}
			var opts;
			if(!data.remoteValidate){
				if(typeof data.ajaxvalidate == 'string'){
					data.ajaxvalidate = {url: data.ajaxvalidate, depends: $([])};
				} else {
					data.ajaxvalidate.depends = data.ajaxvalidate.depends ? $(data.ajaxvalidate.depends).map(getId) : $([]);
				}
				
				data.ajaxvalidate.depends.on('refreshCustomValidityRules', function(){
					webshims.refreshCustomValidityRules(elem);
				});
				
				opts = data.ajaxvalidate;
				
				var remoteValidate = {
					ajaxLoading: false,
					restartAjax: false,
					message: 'async',
					cache: {},
					update: function(remoteData){
						if(this.ajaxLoading){
							this.restartAjax = remoteData;
						} else {
							this.restartAjax = false;
							this.ajaxLoading = true;
							$.ajax(
									$.extend({}, opts, {
										url: opts.url,
										dataType: 'json',
										depData: remoteData,
										data: formCFG.fullRemoteForm || opts.fullForm ? 
											$(elem).jProp('form').serializeArray() : 
											remoteData,
										success: this.getResponse,
										complete: this._complete
									})
							);
						}
					},
					_complete: function(){
						remoteValidate.ajaxLoading = false;
						if(remoteValidate.restartAjax){
							this.update(remoteValidate.restartAjax);
						}
						remoteValidate.restartAjax = false;
					},
					getResponse: function(data){
						if(!data){
							data = {message: '', valid: true};
						} else if(typeof data == 'string'){
							data = JSON.parse(data);
						}
						
						remoteValidate.message = ('message' in data) ? data.message : !data.valid;
						remoteValidate.lastMessage = remoteValidate.message;
						remoteValidate.blockUpdate = true;
						$(elem).triggerHandler('refreshvalidityui');
						remoteValidate.message = 'async';
						remoteValidate.blockUpdate = false;
					},
					getData: function(){
						var data;
						data = {};
						data[$.prop(elem, 'name') || $.prop(elem, 'id')] = $(elem).val();
						opts.depends.each(function(){
							if($(this).is(':invalid')){
								data = false;
								return false;
							}
							data[$.prop(this, 'name') || $.prop(this, 'id')] = $(this).val();
						});
						return data;
					},
					getTempMessage: function(){
						var message = 'async';
						var remoteData, dataStr;
						if(!data.remoteValidate.blockUpdate){
							remoteData = this.getData();
							if(!remoteData){
								message = '';
							} else {
								try {
									dataStr = JSON.stringify(remoteData);
								} catch(er){}
								
								if(dataStr === this.lastString){
									message = this.ajaxLoading ? 'async' : this.lastMessage;
								} else {
									this.lastString = dataStr;
									this.lastMessage = 'async';
									clearTimeout(data.remoteValidate.timer);
									data.remoteValidate.timer = setTimeout(function(){
										data.remoteValidate.update(remoteData);
									}, 9);
								}
								
							}
						} else {
							message = remoteValidate.message;
						}
						return message;
					}
				};
				data.remoteValidate = remoteValidate;
			}
			
			return data.remoteValidate.getTempMessage();
		}, 'remote error');
	}
})();

});
