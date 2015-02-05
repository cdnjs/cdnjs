webshims.register('form-validation', function($, webshims, window, document, undefined, options){
	"use strict";
	
	var isWebkit = 'webkitURL' in window;
	var hasNative = Modernizr.formvalidation && !webshims.bugs.bustedValidity;
	var chromeBugs = isWebkit && hasNative;
	var webkitVersion = chromeBugs && parseFloat((navigator.userAgent.match(/Safari\/([\d\.]+)/) || ['', '999999'])[1], 10);
	
	var iVal = options.iVal;
	if(!iVal.fieldWrapper){
		iVal.fieldWrapper = ':not(span), :not(label), :not(em), :not(strong), :not(p)'; 
	}
	var invalidClass = iVal.errorClass || (iVal.errorClass = 'user-error');
	var validClass = iVal.successClass || 'user-success';
	
	var invalidWrapperClass = iVal.errorWrapperClass || (iVal.errorWrapperClass = 'ws-invalid');
	var successWrapperClass = iVal.successWrapperClass || (iVal.successWrapperClass = 'ws-success');
	var errorBoxClass = iVal.errorBoxClass || (iVal.errorBoxClass = 'ws-errorbox');
	var errorMessageClass = iVal.errorMessageClass || (iVal.errorMessageClass = 'ws-errormessage');
	
	var checkTypes = {checkbox: 1, radio: 1};
	
	var loader = webshims.loader;
	var addModule = loader.addModule;
	
	var emptyJ = $([]);
	var isValid = function(elem){
		return ($.prop(elem, 'validity') || {valid: 1}).valid;
	};
	
	var nonFormFilter = function(){
		return !$.prop(this, 'form');
	};
	var getGroupElements = function(elem){
		elem = $(elem);
		var name;
		var form;
		var ret = emptyJ;
		if(elem[0].type == 'radio'){
			form = elem.prop('form');
			name = elem[0].name;
			if(!name){
				ret = elem;
			} else if(form){
				ret = $(form).jProp(name);
			} else {
				ret = $(document.getElementsByName(name)).filter(nonFormFilter);
			}
			ret = ret.filter('[type="radio"]');
		}
		return ret;
	};
	
	
	var returnValidityCause = function(validity, elem){
		var ret;
		$.each(validity, function(name, value){
			if(value){
				ret = name + $.prop(elem, 'validationMessage');
				return false;
			}
		});
		return ret;
	};
	
	var isInGroup = function(name){
		var ret;
		try {
			ret = document.activeElement.name === name;
		} catch(e){}
		return ret;
	};
	//actually we could always use the change event, but chrome messed it up and does not respect the commit action definition of the html spec
	//see: http://code.google.com/p/chromium/issues/detail?id=155747
	var changeTypes = {
		radio: 1,
		checkbox: 1,
		'select-one': 1,
		'select-multiple': 1,
		file: 1,
		date: 1,
		month: 1,
		week: 1,
		text: 1
	};
	//see: http://code.google.com/p/chromium/issues/detail?id=179708 and bug above
	var noFocusWidgets = {
		time: 1,
		date: 1,
		month: 1,
		datetime: 1,
		week: 1,
		'datetime-local': 1
	};
	var switchValidityClass = function(e){
		if(!iVal.sel){return;}
		var elem, timer, shadowElem, shadowType;
		if(!e.target){return;}
		elem = $(e.target).getNativeElement()[0];
		shadowElem = $(elem).getShadowElement();
		if(elem.type == 'submit' || !$.prop(elem, 'willValidate') || (e.type == 'change' && (shadowType = shadowElem.prop('type')) && !changeTypes[shadowType])){return;}
		timer = $.data(elem, 'webshimsswitchvalidityclass');
		var switchClass = function(){
			if(!shadowType){
				shadowType = shadowElem.prop('type');
			}
			if(
				(chromeBugs && (e.type == 'change' || webkitVersion < 537.36) && noFocusWidgets[shadowType] && $(e.target).is(':focus')) ||
				(e.type == 'focusout' && elem.type == 'radio' && isInGroup(elem.name))
				){
					return;
			}
			if(webshims.refreshCustomValidityRules && webshims.refreshCustomValidityRules(elem) == 'async'){
				$(elem).one('refreshvalidityui', switchValidityClass);
				return;
			}
			
			var validity = $.prop(elem, 'validity');
			
			var addClass, removeClass, trigger, generaltrigger, validityCause;
			
			
			
			if(validity.valid){
				if(!shadowElem.hasClass(validClass)){
					addClass = validClass;
					removeClass = invalidClass;
					generaltrigger = 'changedvaliditystate';
					trigger = 'changedvalid';
					if(checkTypes[elem.type] && elem.checked){
						getGroupElements(elem).not(elem).removeClass(removeClass).addClass(addClass).removeAttr('aria-invalid');
					}
					shadowElem.removeAttr('aria-invalid');
					$.removeData(elem, 'webshimsinvalidcause');
				}
			} else {
				validityCause = returnValidityCause(validity, elem);
				if($.data(elem, 'webshimsinvalidcause') != validityCause){
					$.data(elem, 'webshimsinvalidcause', validityCause);
					generaltrigger = 'changedvaliditystate';
				}
				if(!shadowElem.hasClass(invalidClass)){
					addClass = invalidClass;
					removeClass = validClass;
					if (checkTypes[elem.type] && !elem.checked) {
						getGroupElements(elem).not(elem).removeClass(removeClass).addClass(addClass).attr('aria-invalid', 'true');
					}
					shadowElem.attr('aria-invalid', 'true');
					trigger = 'changedinvalid';
				}
			}
			
			if(addClass){
				shadowElem.addClass(addClass).removeClass(removeClass);
				//jQuery 1.6.1 IE9 bug (doubble trigger bug)
				setTimeout(function(){
					$(elem).trigger(trigger);
				}, 0);
			}
			if(generaltrigger){
				setTimeout(function(){
					$(elem).trigger(generaltrigger);
				}, 0);
			}
			
			$.removeData(elem, 'webshimsswitchvalidityclass');
		};
		if(shadowElem.triggerHandler('wsallowinstantvalidation', [e]) !== false){
			if(timer){
				clearTimeout(timer);
			}
			if(e.type == 'refreshvalidityui'){
				switchClass();
			} else {
				$.data(elem, 'webshimsswitchvalidityclass', setTimeout(switchClass, 9));
			}
		}
	};
	
	$(document.body || 'html')
		.on(options.validityUIEvents || 'focusout change refreshvalidityui invalid', switchValidityClass)
		.on('reset resetvalui', function(e){
			var elems = $(e.target);
			if(elems.is('form, fieldset')){
				elems = elems.jProp('elements');
			}
			elems
				.filter('.user-error, .user-success')
				.removeAttr('aria-invalid')
				.removeClass('user-error')
				.removeClass('user-success')
				.getNativeElement()
				.each(function(){
					$.removeData(this, 'webshimsinvalidcause');
				})
				.trigger('resetvalidityui')
			;
		})
	;
	
	var setRoot = function(){
		webshims.scrollRoot = (isWebkit || document.compatMode == 'BackCompat') ?
			$(document.body) : 
			$(document.documentElement)
		;
	};
	var minWidth = (Modernizr.boxSizing || Modernizr['display-table'] || $.support.getSetAttribute || $.support.boxSizing) ?
		'minWidth' :
		'width'
	;
	var hasTransition = ('transitionDelay' in document.documentElement.style);
	var resetPos = {display: 'inline-block', left: 0, top: 0, marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 0};
	
	setRoot();
	webshims.ready('DOM', setRoot);
	
	var rtlReg = /right|left/g;
	var rtlReplace = function(ret){
		return ret == 'left' ? 'right' : 'left';
	};
	webshims.getRelOffset = function(posElem, relElem, opts){
		var offset, bodyOffset, dirs;
		posElem = $(posElem);
		$.swap(posElem[0], resetPos, function(){
			var isRtl;
			if($.position && opts && $.position.getScrollInfo){
				if(!opts.of){
					opts.of = relElem;
				}
				
				isRtl = $(opts.of).css('direction') == 'rtl';
				if(!opts.isRtl){
					opts.isRtl = false;
				}
				if(opts.isRtl != isRtl){
					opts.my = (opts.my || 'center').replace(rtlReg, rtlReplace);
					opts.at = (opts.at || 'center').replace(rtlReg, rtlReplace);
					opts.isRtl = isRtl;
				}
				
				posElem[opts.isRtl ? 'addClass' : 'removeClass']('ws-is-rtl');
				
				opts.using = function(calced, data){
					posElem.attr({'data-horizontal': data.horizontal, 'data-vertical': data.vertical});
					offset = calced;
				};
				
				posElem.attr({
					'data-horizontal': '', 
					'data-vertical': '',
					'data-my': opts.my,
					'data-at': opts.at
				});
				posElem.position(opts);
				
			} else {
				offset = $(relElem).offset();
				bodyOffset = posElem.offset();
				offset.top -= bodyOffset.top;
				offset.left -= bodyOffset.left;
				
				offset.top += relElem.outerHeight();
			}
			
		});
		
		return offset;
	};
	
	$.extend(webshims.wsPopover, {
		
		
		isInElement: function(containers, contained){
			if(!$.isArray(containers)){
				containers = [containers];
			}
			var i, len, container;
			var ret = false;
			for(i = 0, len = containers.length; i < len; i++){
				container = containers[i];
				if(container && container.jquery){
					container = container[0];
				}
				if(container && (container == contained || $.contains(container, contained))){
					ret = true;
					break;
				}
			}
			return ret;
		},
		show: function(element){
			if(this.isVisible){return;}
			var e = $.Event('wspopoverbeforeshow');
			this.element.trigger(e);
			if(e.isDefaultPrevented()){return;}
			this.isVisible = true;
			element = $(element || this.options.prepareFor).getNativeElement() ;
			
			var that = this;
			var visual = $(element).getShadowElement();
			var delayedRepos = function(e){
				clearTimeout(that.timers.repos);
				that.timers.repos = setTimeout(function(){
					that.position(visual);
				}, e && e.type == 'pospopover' ? 4 : 200);
			};

			this.clear();
			this.element.removeClass('ws-po-visible').css('display', 'none');
			
			this.prepareFor(element, visual);
			
			this.position(visual);
			that.timers.show = setTimeout(function(){
				that.element.css('display', '');
				that.timers.show = setTimeout(function(){
					that.element.addClass('ws-po-visible').trigger('wspopovershow');
				}, 14);
			}, 4);
			
			$(document.body || document).on('focusin'+this.eventns+' mousedown'+this.eventns, function(e){
				if(that.options.hideOnBlur && !that.stopBlur && !that.isInElement([that.lastElement[0], element[0], that.element[0]], e.target)){
					that.hide();
				}
			});
			
			this.element.off('pospopover').on('pospopover', delayedRepos);
			$(window).on('resize'+this.eventns + ' pospopover'+this.eventns, delayedRepos);
		},
		_getAutoAppendElement: (function(){
			var invalidParent = /^(?:span|i|label|b|p|tr|thead|tbody|table|strong|em|ul|ol|dl|html)$/i;
			return function(element){
			
				var appendElement;
				var parent = element[0];
				var body = document.body;
				while((parent = parent[appendElement ? 'offsetParent' : 'parentNode']) && parent.nodeType == 1  && parent != body){
					if(!appendElement && !invalidParent.test(parent.nodeName)){
						appendElement = parent;
					} 
					if(appendElement && $.css(parent, 'overflow') == 'hidden' && $.css(parent, 'position') != 'static'){
						appendElement = false;
					}
				}
				return $(appendElement || body);
			};
		})(),
		prepareFor: function(element, visual){
			var onBlur, parentElem;
			var that = this;
			var css = {};
			var opts = $.extend(true, {}, this.options, element.jProp('form').data('wspopover') || {}, element.data('wspopover'));
			this.lastOpts = opts;
			this.lastElement = $(element).getShadowFocusElement();
			if(!this.prepared || !this.options.prepareFor){
				if(opts.appendTo == 'element'){
					parentElem = element.parent();
				} else if(opts.appendTo == 'auto'){
					parentElem = this._getAutoAppendElement(element);
				} else {
					parentElem = $(opts.appendTo);
				}
				if(!this.prepared || parentElem[0] != this.element[0].parentNode){
					this.element.appendTo(parentElem);
				}
			}
			
			this.element.attr({
				'data-class': element.prop('className'),
				'data-id': element.prop('id')
			});
			
			css[minWidth] = opts.constrainWidth ? visual.outerWidth() : '';
			
			this.element.css(css);
			
			if(opts.hideOnBlur){
				onBlur = function(e){
					if(that.stopBlur){
						e.stopImmediatePropagation();
					} else {
						that.hide();
					}
				};
				
				that.timers.bindBlur = setTimeout(function(){
					that.lastElement.off(that.eventns).on('focusout'+that.eventns + ' blur'+that.eventns, onBlur);
					that.lastElement.getNativeElement().off(that.eventns);
				}, 10);
				
				
			}
			
			this.prepared = true;
		},
		clear: function(){
			$(window).off(this.eventns);
			$(document).off(this.eventns);
			$(document.body).off(this.eventns);
			this.element.off('transitionend'+this.eventns);
			this.stopBlur = false;
			this.lastOpts = false;
			$.each(this.timers, function(timerName, val){
				clearTimeout(val);
			});
		},
		hide: function(){
			var e = $.Event('wspopoverbeforehide');
			this.element.trigger(e);
			if(e.isDefaultPrevented() || !this.isVisible){return;}
			this.isVisible = false;
			var that = this;
			var forceHide = function(e){
				if(!(e && e.type == 'transitionend' && (e = e.originalEvent) && e.target == that.element[0] && that.element.css('visibility') == 'hidden')){
					that.element.off('transitionend'+that.eventns).css('display', 'none').attr({'data-id': '', 'data-class': '', 'hidden': 'hidden'});
					clearTimeout(that.timers.forcehide);
					$(window).off('resize'+that.eventns);
				}
			};
			this.clear();
			this.element.removeClass('ws-po-visible').trigger('wspopoverhide');
			$(window).on('resize'+this.eventns, forceHide);
			if(hasTransition){
				this.element.off('transitionend'+this.eventns).on('transitionend'+this.eventns, forceHide);
			}
			
			that.timers.forcehide = setTimeout(forceHide, hasTransition ? 600 : 40);
		},
		position: function(element){
			var offset = webshims.getRelOffset(this.element.removeAttr('hidden'), element, (this.lastOpts || this.options).position);
			
			this.element.css(offset);
		}
	});
	
	
	
	/* some extra validation UI */
	webshims.validityAlert = (function(){
		
		options.messagePopover.position = $.extend({}, {
			at: 'left bottom',
			my: 'left top',
			collision: 'none'
		}, options.messagePopover.position || {});
			
		var focusTimer = false;
		
		var api = webshims.objectCreate(webshims.wsPopover, {}, options.messagePopover);
		var boundHide = api.hide.bind(api);
		
		api.element.addClass('validity-alert').attr({role: 'alert'});
		$.extend(api, {
			hideDelay: 5000,
			showFor: function(elem, message, noFocusElem, noBubble){
				
				elem = $(elem).getNativeElement();
				this.clear();
				this.hide();
				if(!noBubble){
					this.getMessage(elem, message);
					
					this.show(elem);
					if(this.hideDelay){
						this.timers.delayedHide = setTimeout(boundHide, this.hideDelay);
					}
					
				}
				
				if(!noFocusElem){
					this.setFocus(elem);
				}
			},
			setFocus: function(element){
				var focusElem = $(element).getShadowFocusElement();
				var scrollTop = webshims.scrollRoot.scrollTop() + (options.viewportOffset || 0);
				var elemTop = focusElem.offset().top - (options.scrollOffset || 30);
				var focus = function(){
					try {
						focusElem[0].focus();
					} catch(e){}
					if(!focusElem[0].offsetWidth && !focusElem[0].offsetHeight){
						webshims.warn('invalid element seems to be hidden. Make element either visible or use disabled/readonly to bar elements from validation. With fieldset[disabled] a group of elements can be ignored.');
					}
					api.element.triggerHandler('pospopover');
				};
				
				if(scrollTop > elemTop){
					webshims.scrollRoot.animate(
						{scrollTop: elemTop - 5 - (options.viewportOffset || 0)}, 
						{
							queue: false, 
							duration: Math.max( Math.min( 600, (scrollTop - elemTop) * 1.5 ), 80 ),
							complete: focus
						}
					);
					
				} else {
					focus();
				}
				
			},
			getMessage: function(elem, message){
				if (!message) {
					message = elem.getErrorMessage();
				}
				if (message) {
					api.contentElement.html(message);
				} else {
					this.hide();
				}
			}
		});
		
		
		return api;
	})();
	
	var fx = {
		slide: {
			show: 'slideDown',
			hide: 'slideUp'
		},
		fade: {
			show: 'fadeIn',
			hide: 'fadeOut'
		},
		no: {
			show: 'show',
			hide: 'hide'
		}
	};
	if(!iVal.fx || !fx[iVal.fx]){
		iVal.fx = 'slide';
	}
	
	if(!$.fn[fx[iVal.fx].show]){
		iVal.fx = 'no';
	}
	var errorBoxId = 0;
	webshims.errorbox = {
		create: function(elem, fieldWrapper){
			if(!fieldWrapper){
				fieldWrapper = this.getFieldWrapper(elem);
			}
			var errorBox = $('div.'+errorBoxClass, fieldWrapper);
			
			if(!errorBox.length){
				errorBox = $('<div class="'+ errorBoxClass +'" hidden="hidden" style="display: none;">');
				fieldWrapper.append(errorBox);
			}
			if(!errorBox.prop('id')){
				errorBoxId++;
				errorBox.prop('id', 'errorbox-'+errorBoxId);
			}
			fieldWrapper.data('errorbox', errorBox);
			return errorBox;
		},
		getFieldWrapper: function(elem){
			var fieldWrapper;
			fieldWrapper = (typeof iVal.fieldWrapper == "function") ? iVal.fieldWrapper.apply(this, arguments) : $(elem).parent().closest(iVal.fieldWrapper);
			if(!fieldWrapper.length){
				webshims.error("could not find fieldwrapper: "+ iVal.fieldWrapper);
			}
			return fieldWrapper;
		},
		_createContentMessage: (function(){
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
			var fields = {};
			var deCamelCase = function(c){
				return '-'+(c).toLowerCase();
			};
			var getErrorName = function(elem){
				var ret = $(elem).data('errortype');
				if(!ret){
					$.each(fields, function(errorName, cNames){
						if($(elem).is(cNames)){
							ret = errorName;
							return false;
						}
					});
				}
				return ret || 'defaultMessage';
			};
			$.each(["customError","badInput","typeMismatch","rangeUnderflow","rangeOverflow","stepMismatch","tooLong","tooShort","patternMismatch","valueMissing"], function(i, name){
				var cName = name.replace(/[A-Z]/, deCamelCase);
				fields[name] = '.'+cName+', .'+name+', .'+(name).toLowerCase()+', [data-errortype="'+ name +'"]';
			});
			return function(elem, errorBox, fieldWrapper){
				var extended = false;
				var descriptiveMessages = {};

				$(errorBox).children().each(function(){
					var name = getErrorName(this);
					descriptiveMessages[name] = $(this).html();
				});

				$('input, select, textarea', fieldWrapper).filter(noValidate).each(function(i, elem){
					var errorMessages = $(elem).data('errormessage') || {};
					if(typeof errorMessages == 'string'){
						errorMessages = {defaultMessage: errorMessages};
					}

					$.each(descriptiveMessages, function(name, val){
						if(!errorMessages[name]){
							extended = true;
							errorMessages[name] = val;
						}
					});

					if(extended){
						$(elem).data('errormessage', errorMessages);
					}
					if(webshims.getOptions){
						webshims.getOptions(elem, 'errormessage', false, true);
					}
				});

			};
		})(),
		initIvalContentMessage: function(elem){
			if($(elem).jProp('form').is(iVal.sel)){
				this.get(elem);
			}
		},
		get: function(elem, fieldWrapper){
			if(!fieldWrapper){
				fieldWrapper = this.getFieldWrapper(elem);
			}
			var type;
			var errorBox = fieldWrapper.data('errorbox');
			if((type = typeof errorBox) != 'object'){
				if(!errorBox){
					errorBox = this.create(elem, fieldWrapper);
				} else if(type == 'string'){
					errorBox = $('#'+errorBox);
					fieldWrapper.data('errorbox', errorBox, fieldWrapper);
				}
				this._createContentMessage(elem, errorBox, fieldWrapper);
			}
			return errorBox;
		},
		addSuccess: function(elem, fieldWrapper){
			var type = $.prop(elem, 'type');
			var check = function(){
				var hasVal = checkTypes[type] ? $.prop(elem, 'checked') : $(elem).val();
				fieldWrapper[hasVal ? 'addClass' : 'removeClass'](successWrapperClass);
			};
			var evt = changeTypes[type] ? 'change' : 'blur';
			
			$(elem).off('.recheckvalid').on(evt+'.recheckinvalid', check);
			check();
		},
		hideError: function(elem, reset){
			var invalid, errorBox;
			var fieldWrapper = this.getFieldWrapper(elem);

			if(fieldWrapper.hasClass(invalidWrapperClass)){
				$(elem).filter('input').off('.recheckinvalid');
				if(!reset && (invalid = $('input:invalid, select:invalid, textarea:invalid', fieldWrapper)[0])){
					$(invalid).trigger('refreshvalidityui');
				} else {
					errorBox = this.get(elem, fieldWrapper);
					fieldWrapper.removeClass(invalidWrapperClass);
					errorBox.message = '';
					errorBox[fx[iVal.fx].hide](function(){
						if(this.id == elem.getAttribute('aria-describedby')){
							elem.removeAttribute('aria-describedby');
						}
						$(this).attr({hidden: 'hidden'});
					});
				}
				
			}
			if(!reset && !invalid){
				this.addSuccess(elem, fieldWrapper);
			}
			return fieldWrapper;
		},
		recheckInvalidInput: function(input){
			if(iVal.recheckDelay && iVal.recheckDelay > 90){
				var timer;
				var throttle = function(){
					switchValidityClass({type: 'input', target: input});
				};
				$(input)
					.filter('input:not([type="checkbox"]):not([type="radio"])')
					.off('.recheckinvalid')
					.on('input.recheckinvalid', function(){
						clearTimeout(timer);
						timer = setTimeout(throttle, iVal.recheckDelay); 
					})
					.on('focusout.recheckinvalid', function(){
						clearTimeout(timer);
					})
				;
			}
		},
		showError: function(elem){
			var fieldWrapper = this.getFieldWrapper(elem);
			var box = this.get(elem, fieldWrapper);
			var message = $(elem).getErrorMessage();

			if(box.message != message){
				if(box.stop){
					box.stop(true, true);
				}
				box.html('<p class="'+ errorMessageClass +'">'+ message +'</p>');
				box.message = message;
				fieldWrapper.addClass(invalidWrapperClass).removeClass(successWrapperClass);
				this.recheckInvalidInput(elem);
				if(box.is('[hidden]') || box.css('display') == 'none'){
					if(!elem.getAttribute('aria-describedby')){
						elem.setAttribute('aria-describedby', box.prop('id'));
					}
					box
						.css({display: 'none'})
						.removeAttr('hidden')
						[fx[iVal.fx].show]()
					;
					
				}
			}
			fieldWrapper.removeClass(successWrapperClass);
			$(elem).off('.recheckvalid');
			
			return fieldWrapper;
		},
		reset: function(elem){
			this.hideError(elem, true).removeClass(successWrapperClass);
		},
		toggle: function(elem){
			if($(elem).is(':invalid')){
				this.showError(elem);
			} else {
				this.hideError(elem);
			}
		}
	};
	
	$(document.body)
		.on({
			'changedvaliditystate': function(e){
				if(iVal.sel){
					var form = $(e.target).jProp('form');
					if(form.is(iVal.sel)){
						webshims.errorbox.toggle(e.target);
					}
				}
			},
			resetvalidityui: function(e){
				if (iVal.sel) {
					var form = $(e.target).jProp('form');
					if (form.is(iVal.sel)) {
						webshims.errorbox.reset(e.target);
					}
				}
			},
			firstinvalid: function(e){
				if(iVal.sel && iVal.handleBubble){
					var form = $(e.target).jProp('form');
					if(form.is(iVal.sel)){
						e.preventDefault();
						if(iVal.handleBubble != 'none'){
							webshims.validityAlert.showFor( e.target, false, false, iVal.handleBubble == 'hide' ); 
						}
					}
				}
			},
			submit: function(e){
				if(iVal.sel && iVal.submitCheck && $(e.target).is(iVal.sel) && $.prop(e.target, 'noValidate') && !$(e.target).checkValidity()){
					e.stopImmediatePropagation();
					return false;
				}
			}
		})
	;
	
	webshims.modules["form-core"].getGroupElements = getGroupElements;
	
	if(/[\s\:\>\~\+]/.test(iVal.sel || '')){
		webshims.error('please use a simple selector for iVal.sel: for example .validate');
	}
	
	if(options.replaceValidationUI){
		$(document).on('firstinvalid', function(e){
			if(!e.isDefaultPrevented()){
				e.preventDefault();
				
				setTimeout(function(){
					webshims.validityAlert.showFor( e.target ); 
				}, 4);
			}
		});
	}
	
	/* extension, but also used to fix native implementation workaround/bugfixes */
	(function(){
		var firstEvent,
			invalids = [],
			stopSubmitTimer,
			stop
		;
		
		$(document).on('invalid', function(e){
			if(e.wrongWebkitInvalid || stop){return;}
			var jElm = $(e.target);
			
			
			if(!firstEvent){
				//trigger firstinvalid
				firstEvent = $.Event('firstinvalid');
				jElm.trigger(firstEvent);
			}

			//if firstinvalid was prevented all invalids will be also prevented
			if( firstEvent && firstEvent.isDefaultPrevented() ){
				e.preventDefault();
			}
			invalids.push(e.target);
			e.extraData = 'fix'; 
			clearTimeout(stopSubmitTimer);
			stopSubmitTimer = setTimeout(function(){
				var lastEvent = {type: 'lastinvalid', cancelable: false, invalidlist: $(invalids)};
				//reset firstinvalid
				firstEvent = false;
				invalids = [];
				stop = true;
				$(e.target).trigger(lastEvent, [lastEvent]);
				/*
				if(hasNative && !$.nodeName(e.target, 'form')){
					$(e.target).jProp('form').triggerHandler('invalid');
				}
				*/
				stop = false;
			}, 9);
			jElm = null;
		});
	})();
	
	
	if(!$.event.special.change && !$.event.special.input && Modernizr.inputtypes && options.fixRangeChange){
		var rangeChange = {
			
			trigger: function(e){
				if(rangeChange.blockElement){
					rangeChange.blockElement = false;
					setTimeout(function(){
						if(rangeChange.requestedChange && rangeChange.value != rangeChange.requestedChange.value){
							$(rangeChange.requestedChange).trigger('change');
						}
						rangeChange.value = false;
					}, 9);
				}
				
			},
			lastValue: false,
			updateInputValue: function(e){
				rangeChange.lastValue = e.target.value;
			},
			triggerInput: function(e){
				if(rangeChange.lastValue !== false && rangeChange.lastValue != e.target.value){
					$(e.target).trigger('input');
				}
			},
			inputTeardown: function(e){
				$(e.target)
					.off('input', rangeChange.updateInputValue)
					.off('blur', rangeChange.inputTeardown)
				;
				rangeChange.lastValue = false;
			},
			inputSetup: function(e){
				
				if(e.target.type == 'range'){
					rangeChange.inputTeardown(e);
					rangeChange.lastValue = e.target.value;
					$(e.target)
						.on('input', rangeChange.updateInputValue)
						.on('blur', rangeChange.inputTeardown)
					;
				}
			}
		};
		
		
		$.each([{name: 'key', evt: 'keyup'}, {name: 'mouse', evt: 'mouseup'}, {name: 'touch', evt: 'touchend'}], function(i, obj){
			var setup = obj.name + 'Setup';
			var commit = obj.name + 'Commit';
			rangeChange[obj.name+'Block'] = function(e){
				
				if(!rangeChange.blockElement && e.target.type == 'range'){
					
					rangeChange.blockElement = e.target;
					rangeChange.value = e.target.value;
					$(rangeChange.blockElement)
						.off('blur', rangeChange.trigger)
						.on('blur', rangeChange.trigger)
					;
					
					$(document.body)
						.off(obj.evt, rangeChange[commit])
						.on(obj.evt, rangeChange[commit])
					;
				}
			};
			
			rangeChange[commit] = function(e){
				$(document.body).off(obj.evt, rangeChange[commit]);
				rangeChange.trigger();
			};
			
		});
		
		$(document.body || 'html').on({
			mousedown: rangeChange.mouseBlock,
			'keydown kepress': function(e){
				if(e.keyCode < 45 && e.keyCode > 30){
					rangeChange.keyBlock(e);
				}
			},
			'touchstart': rangeChange.touchBlock,
			focusin: rangeChange.inputSetup
		});
		
		$.extend(true, $.event.special, {
			change: {
				handle: function(e){
					
					if(!e.isTrigger && rangeChange.blockElement == e.target){
						rangeChange.requestedChange = e.target;
						rangeChange.triggerInput(e);
						return false;
					} else if(rangeChange.requestedChange == e.target){
						rangeChange.requestedChange = false;
					}
					e.handleObj.handler.apply(this, arguments);
				}
			},
			input: {
				handle: (function(){
					var lastValue, lastElement;
					
					var remove = function(){
						if(lastElement){
							$(lastElement).off('change', remove);
						}
						lastValue = false;
						lastElement = false;
					};
					
					var setup = function(e){
						remove(e);
						lastElement = e.target;
						lastValue = e.target.value;
						$(e.target).on('change', remove);
					};
					
					return function(e){
						var value;
						if(!e.isTrigger && e.target.type == 'range'){
							
							if(lastElement != e.target){
								setup(e);
							} else if(lastElement == e.target){
								if(lastValue == (value = e.target.value)){
									return false;
								}
								lastValue = e.target.value;
							}
						}
						e.handleObj.handler.apply(this, arguments);
					};
				})()
			}
		});
	}
	if(webshims.cfg.debug !== false && iVal.sel != '.ws-instantvalidation'){
		$(function(){
			if($('form.ws-instantvalidation').length){
				webshims.error('.ws-instantvalidation was renamed to .ws-validate');
			}
		});
	}
	addModule('form-combat', {
		d: ['dom-support'],
		test: !(($.mobile && ($.mobile.selectmenu || $.mobile.checkboxradio)) || $.fn.select2 || $.fn.chosen || $.fn.selectpicker || $.fn.selectBoxIt)
	});
	
	addModule('position', {
		src: 'plugins/jquery.ui.position.js',
		test: !!($.position && $.position.getScrollInfo)
	});
	
	loader.loadList(['form-combat', 'position']);
});
