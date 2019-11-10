webshims.register('form-validation', function($, webshims, window, document, undefined, options){
	"use strict";

	var isWebkit = 'webkitURL' in window;
	var support = webshims.support;
	var hasNative = support.formvalidation && !webshims.bugs.bustedValidity;
	var chromeBugs = isWebkit && hasNative;
	var ua = navigator.userAgent;
	var isIE = ua.indexOf('MSIE') != -1;
	var webkitVersion = chromeBugs && parseFloat((ua.match(/Safari\/([\d\.]+)/) || ['', '999999'])[1], 10);

	var iVal = options.iVal;

	var invalidClass = iVal.errorClass || (iVal.errorClass = 'user-error');
	var validClass = iVal.successClass || (iVal.successClass = 'user-success');
	var markedClases = '.'+validClass+', .'+invalidClass;

	var invalidWrapperClass = iVal.errorWrapperClass || (iVal.errorWrapperClass = 'ws-invalid');
	var successWrapperClass = iVal.successWrapperClass || (iVal.successWrapperClass = 'ws-success');
	var errorBoxClass = iVal.errorBoxClass || (iVal.errorBoxClass = 'ws-errorbox');
	var errorMessageClass = iVal.errorMessageClass || (iVal.errorMessageClass = 'ws-errormessage');
	var errorBoxWrapper = iVal.errorBoxWrapper || (iVal.errorBoxWrapper = 'div');
	var errorMessageWrapper = iVal.errorMessageWrapper || (iVal.errorMessageWrapper = 'p');

	var checkTypes = {checkbox: 1, radio: 1};

	var loader = webshims.loader;
	var addModule = loader.addModule;

	var emptyJ = $([]);

	var nonFormFilter = function(){
		return !$.prop(this, 'form');
	};
	var modules = webshims.modules;
	var getGroupElements = modules["form-core"].getGroupElements || function(elem){
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
		text: 1,
		password: 1,
		search: 1,
		email: 1,
		tel: 1,
		url: 1
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
	var updateValidationEvents = {
		refreshvalidityui: 1,
		updatevalidation: 1
	};
	var iValClasses = '.'+ iVal.errorClass +', .'+iVal.successClass;
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
				(chromeBugs && (e.type == 'change' || webkitVersion < 537.36) && noFocusWidgets[shadowType] && $.find.matchesSelector(e.target, ':focus')) ||
				(e.type == 'focusout' && elem.type == 'radio' && isInGroup(elem.name))
				){
					return;
			}
			if(webshims.refreshCustomValidityRules(elem) == 'async'){
				$(elem).one('updatevalidation.webshims', switchValidityClass);
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
				});
			}
			if(generaltrigger){
				setTimeout(function(){
					$(elem).trigger(generaltrigger);
				});
			}

			$.removeData(elem, 'webshimsswitchvalidityclass');
		};
		if(shadowElem.triggerHandler('wsallowinstantvalidation', [e]) !== false){
			if(timer){
				clearTimeout(timer);
			}
			if(updateValidationEvents[e.type]){
				if(e.type == 'refreshvalidityui'){
					webshims.error('refreshvalidityui was renamed to updatevalidation');
				}
				switchClass();
			} else {
				$.data(elem, 'webshimsswitchvalidityclass', setTimeout(switchClass));
			}
		}
	};
	var eachReset = function(){
		webshims.errorbox.reset(this);
	};

	if('validityUIEvents' in options){
		webshims.error('validityUIEvents was renamed to iVal.events');
		iVal.events = options.validityUIEvents;
	}
	if('events' in iVal){
		iVal.events = iVal.events || '';
	} else {
		iVal.events = 'focusout change';
	}

	if(iVal.events){
		iVal.events += ' ';
	}

	if(!iVal.fieldWrapper){
		iVal.fieldWrapper = ':not(span):not(label):not(em):not(strong):not(p):not(.ws-custom-file)';
	}

	if(!modules["form-core"].getGroupElements){
		modules["form-core"].getGroupElements = getGroupElements;
	}

	$(document.body || 'html')
		.on(iVal.events+'refreshvalidityui updatevalidation.webshims invalid', switchValidityClass)
		.on('refreshvalidationui.webshims', function(e){
			if($(e.target).getShadowElement().is(markedClases)){
				switchValidityClass({type: 'updatevalidation', target: e.target});
			}
		})
		.on('reset resetvalidation.webshims resetvalui', function(e){
			var noIValTrigger;
			var elems = $(e.target);
			if(e.type == 'resetvalui'){
				webshims.error('resetvalui was renamed to resetvalidation');
			}
			if(elems.is('form, fieldset')){
				if(elems[0].nodeName.toLowerCase() == 'form'){
					noIValTrigger = !elems.is(iVal.sel);
				}
				elems = elems.jProp('elements');
			}
			elems = elems
				.filter(iValClasses)
				.removeAttr('aria-invalid')
				.removeClass(iVal.errorClass +' '+ iVal.successClass)
				.getNativeElement()
				.each(function(){
					$.removeData(this, 'webshimsinvalidcause');
				})
			;

			if(!noIValTrigger){
				if(noIValTrigger === false){
					elems.each(eachReset);
				} else {
					elems.trigger('resetvalidityui.webshims');
				}
			}
		})
	;

	var setRoot = function(){
		if(document.scrollingElement){
			webshims.scrollRoot = $(document.scrollingElement);
		} else {
			webshims.scrollRoot = (isWebkit || document.compatMode == 'BackCompat') ?
				$(document.body) :
				$(document.documentElement)
			;
		}
	};
	var hasTransition = ('transitionDelay' in document.documentElement.style);
	var resetPos = {display: 'inline-block', left: 0, top: 0, marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 0};
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
			var showAction;
			if(this.isVisible){return;}
			var e = $.Event('wspopoverbeforeshow');
			this.element.trigger(e);
			if(e.isDefaultPrevented()){return;}
			this.isVisible = true;

			if(!this._shadowAdded && webshims.shadowClass){
				this.element.addClass(webshims.shadowClass);
				this._shadowAdded = true;
			}

			element = $(element || this.options.prepareFor).getNativeElement();

			var that = this;
			var closeOnOutSide = function(e){
				if(that.options.hideOnBlur && !that.stopBlur && !that.isInElement([that.lastElement[0], element[0], that.element[0]], e.target)){
					that.hide();
				}
			};
			var visual = $(element).getShadowElement();
			var delayedRepos = function(e){
				clearTimeout(that.timers.repos);
				that.timers.repos = setTimeout(function(){
					that.position(visual);
				}, e && e.type == 'pospopover' ? 4 : 200);
			};

			this.clear();
			this.element.css('display', 'none');

			this.prepareFor(element, visual);

			this.position(visual);

			if(this.options.inline){
				showAction = (fx[this.options.inline] || fx.slide).show;
				that.element[showAction]().trigger('wspopovershow');
			} else {
				this.element.removeClass('ws-po-visible');
				that.timers.show = setTimeout(function(){
					that.element.css('display', '');
					that.timers.show = setTimeout(function(){
						that.element.addClass('ws-po-visible').trigger('wspopovershow');
					}, 14);
				}, 4);
			}


			$(document.body)
				.on('focusin'+this.eventns+' mousedown'+this.eventns, closeOnOutSide)
				//http://www.quirksmode.org/m/tests/eventdelegation2.html
				.children(':not(script), :not(iframe), :not(noscript)')
				.on('mousedown'+this.eventns, closeOnOutSide)
			;

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
					if(appendElement && $.css(parent, 'overflow') != 'visible' && $.css(parent, 'position') != 'static'){
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
				if(opts.appendTo == 'element' || (opts.inline && opts.appendTo == 'auto')){
					parentElem = visual.parent();
				} else if(opts.appendTo == 'auto'){
					parentElem = this._getAutoAppendElement(visual);
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

			if(opts.constrainWidth){
				this.element.addClass('ws-popover-constrained-width');
				css.minWidth = visual.outerWidth();
			} else {
				this.element.removeClass('ws-popover-constrained-width');
				css.minWidth = '';
			}

			if(opts.inline){
				this.element.addClass('ws-popinline ws-po-visible');
			} else {
				this.element.removeClass('ws-popinline');
			}

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
			$(document.body)
				.off(this.eventns)
				.children(':not(script), :not(iframe), :not(noscript)')
				.off(this.eventns)
			;
			this.element.off('transitionend'+this.eventns);
			this.stopBlur = false;
			this.lastOpts = false;
			$.each(this.timers, function(timerName, val){
				clearTimeout(val);
			});
		},
		hide: function(){
			var hideAction;
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

			if(this.options.inline){
				hideAction = (fx[this.options.inline] || fx.slide).hide;
				this.element[hideAction]();
			} else {
				this.element.removeClass('ws-po-visible');
				$(window).on('resize'+this.eventns, forceHide);
				if(hasTransition){
					this.element.off('transitionend'+this.eventns).on('transitionend'+this.eventns, forceHide);
				}

				that.timers.forcehide = setTimeout(forceHide, hasTransition ? 600 : 40);
			}
			this.element.trigger('wspopoverhide');

		},
		position: function(element){
			var offset;
			var opts = this.lastOpts || this.options;
			if(!opts.inline){
				offset = webshims.getRelOffset(this.element.removeAttr('hidden'), element, (this.lastOpts || this.options).position);

				this.element.css(offset);
			}
		}
	});



	/* some extra validation UI */
	webshims.validityAlert = (function(){

		options.messagePopover.position = $.extend({}, {
			at: 'left bottom',
			my: 'left top',
			collision: 'none'
		}, options.messagePopover.position || {});

		var api = webshims.objectCreate(webshims.wsPopover, undefined, options.messagePopover);
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
						webshims.warn('invalid element seems to be hidden. Make element either visible or use disabled/readonly to bar elements from validation. With fieldset[disabled] a group of elements can be ignored! In case of select replacement see shims/form-combat.js to fix issue.');
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
			var errorBox = $('.'+errorBoxClass, fieldWrapper);

			if(!errorBox.length){
				errorBox = $('<'+errorBoxWrapper+' class="'+ errorBoxClass +'" hidden="hidden" style="display: none;" />');
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
						if($.find.matchesSelector(elem, cNames)){
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
			var form;
			if(iVal.sel && (form = $.prop(elem, 'form')) && $.find.matchesSelector(form, iVal.sel)){
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
			var invalid, errorBox, afterHide;
			var fieldWrapper = this.getFieldWrapper(elem);

			if(!reset){
				invalid = $('input:invalid, select:invalid, textarea:invalid', fieldWrapper);
			}
			if(fieldWrapper.hasClass(invalidWrapperClass)){
				$(elem).filter('input').off('.recheckinvalid');
				if(!reset && invalid && invalid[0]){
					$(invalid).trigger('updatevalidation.webshims');
				} else {
					errorBox = this.get(elem, fieldWrapper);
					fieldWrapper.removeClass(invalidWrapperClass);
					errorBox.message = '';
					afterHide = function(){
						if(this.id == elem.getAttribute('aria-describedby')){
							elem.removeAttribute('aria-describedby');
						}
						$(this).attr({hidden: 'hidden'});
					};
					if(iVal.fx != 'no'){
						errorBox[fx[iVal.fx].hide](afterHide);
					} else {
						errorBox[fx[iVal.fx].hide]().each(afterHide);
					}
				}

			}
			if(!reset && (!invalid || !invalid.length)){
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
					.filter('input:not([type="checkbox"]):not([type="radio"]), textarea')
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
				box.html('<'+ errorMessageWrapper +' class="'+ errorMessageClass +'">'+ message +'</'+ errorMessageWrapper +'>');
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
			if($.find.matchesSelector(elem, ':invalid')){
				this.showError(elem);
			} else {
				this.hideError(elem);
			}
		}
	};

	$(document.body)
		.on({
			'changedvaliditystate': function(e){
				var form;
				if(iVal.sel && (form = $.prop(e.target, 'form')) && $.find.matchesSelector(form, iVal.sel)){
					webshims.errorbox.toggle(e.target);
				}
			},
			'resetvalidityui.webshims': function(e){
				var form;
				if(iVal.sel && (form = $.prop(e.target, 'form')) && $.find.matchesSelector(form, iVal.sel)){
					webshims.errorbox.reset(e.target);
				}
			},
			firstinvalid: function(e){
				var form;
				if(iVal.sel && iVal.handleBubble){
					if(iVal.sel && (form = $.prop(e.target, 'form')) && $.find.matchesSelector(form, iVal.sel)){
						e.preventDefault();
						if(iVal.handleBubble != 'none'){
							webshims.validityAlert.showFor( e.target, false, false, iVal.handleBubble == 'hide' );
						}
					}
				}
			},
			submit: function(e){
				if(iVal.sel && iVal.submitCheck && $.find.matchesSelector(e.target, iVal.sel) && $.prop(e.target, 'noValidate') && !$(e.target).checkValidity()){
					e.stopImmediatePropagation();
					return false;
				}
			}
		})
	;



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


			if(!firstEvent && !$.find.matchesSelector(e.target, 'form, fieldset') ){
				//trigger firstinvalid
				firstEvent = $.Event('firstinvalid');
				jElm.addClass('first-invalid').trigger(firstEvent);
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
				invalids = [];
				stop = true;
				$(e.target).trigger(lastEvent, [lastEvent]);
				$(firstEvent.target).removeClass('first-invalid');
				firstEvent = false;
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

	function getFileNames(file){
		return file.name;
	}

	function customFile(){
		if($.data(this, 'wsCustomFile')){return;}

		var map = Array.prototype.map;
		var $module = $(this);
		var $file = $('input[type="file"]', $module);
		var $valueDisplay = $('.ws-file-value', $module);
		var emptyHtml = $.trim($valueDisplay.html()) || '&#160;';

		var showSelected = function(){
			var files = $file.prop('files') || [];
			var names = map.call(files, getFileNames).join(', ') || $file.val();
			if(names){
				$valueDisplay.text(names);
			} else {
				$valueDisplay.html(emptyHtml);
			}
		};


		$.data(this, 'wsCustomFile', {showSelected: showSelected});
		$('button:not(.ws-capture-button)', $module).attr('tabindex', '-1');

		$file
			.on('change.webshim', showSelected)
			.each(showSelected)
			.jProp('form')
			.on('reset', function(){
				setTimeout(showSelected);
			})
		;
		if(isIE){
			$('<div class="ws-coverfile" />')
				.insertAfter($file)
				.on('click.webshim', function(e){
					e.stopImmediatePropagation();
					$file.trigger('click');
				})
			;
		}

	}

	$(function(){
		var fileReaderReady = ('FileReader' in window && 'FormData' in window);
		if(!fileReaderReady){
			webshims.addReady(function(context){
				if(!fileReaderReady && modules['filereader-xhr'] && !modules['filereader-xhr'].loaded && context.querySelector('input.ws-filereader')){
					webshims.reTest(['filereader']);
					fileReaderReady = true;
				}
			});
		}
	});

	webshims.addReady(function(context, contextElem){
		$(context.querySelectorAll('.ws-custom-file')).add($(contextElem).filter('.ws-custom-file')).each(customFile);
	});

	addModule('form-fixrangechange', {
		test: !(!$.event.special.change && !$.event.special.input && support.inputtypes.range && options.fixRangeChange)
	});

	addModule('form-inputmode', {
		test: !(!options.noInputmodeFix && document.addEventListener && support.inputtypes.number && ua.indexOf('Mobile') != -1 && !('inputMode' in document.createElement('input') && !('inputmode' in document.createElement('input'))) )
	});

	addModule('form-combat', {
		d: ['dom-support'],
		test: !(($.mobile && ($.mobile.selectmenu || $.mobile.checkboxradio)) || ($.ui && $.ui.selectmenu) || $.fn.select2 || $.fn.chosen || $.fn.selectpicker || $.fn.selectBoxIt)
	});

	addModule('position', {
		src: 'plugins/jquery.ui.position.js',
		test: !!($.position && $.position.getScrollInfo)
	});

	loader.loadList(['form-combat', 'position', 'form-fixrangechange', 'form-inputmode']);
});
