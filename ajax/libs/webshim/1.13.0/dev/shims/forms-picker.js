(function($){
	
(function () {
if($.event.special.mousewheel){return;}
    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        version: '3.1.6',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.on('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.off('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
          deltaY = orgEvent.deltaY * -1;
          delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
          deltaX = orgEvent.deltaX;
          if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );
        if ( !lowestDelta || absDelta < lowestDelta ) {
          lowestDelta = absDelta;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
      lowestDelta = null;
    }

})();



(function(){
if($.event.special.mwheelIntent){return;}
var mwheelI = {
			pos: [-260, -260]
		},
	minDif 	= 3,
	doc 	= document,
	root 	= doc.documentElement,
	body 	= doc.body,
	longDelay, shortDelay
;
if(!body){
	$(function(){
		body = doc.body;
	});
}
function unsetPos(){
	if(this === mwheelI.elem){
		mwheelI.pos = [-260, -260];
		mwheelI.elem = false;
		minDif = 3;
	}
}

$.event.special.mwheelIntent = {
	setup: function(){
		var jElm = $(this).on('mousewheel', $.event.special.mwheelIntent.handler);
		if( this !== doc && this !== root && this !== body ){
			jElm.on('mouseleave', unsetPos);
		}
		jElm = null;
		return true;
	},
	teardown: function(){
		$(this)
			.off('mousewheel', $.event.special.mwheelIntent.handler)
			.off('mouseleave', unsetPos)
		;
		return true;
	},
	handler: function(e, d){
		var pos = [e.clientX, e.clientY];
		if( this === mwheelI.elem || Math.abs(mwheelI.pos[0] - pos[0]) > minDif || Math.abs(mwheelI.pos[1] - pos[1]) > minDif ){
			mwheelI.elem = this;
			mwheelI.pos = pos;
			minDif = 250;
			
			clearTimeout(shortDelay);
			shortDelay = setTimeout(function(){
				minDif = 10;
			}, 200);
			clearTimeout(longDelay);
			longDelay = setTimeout(function(){
				minDif = 3;
			}, 1500);
			e = $.extend({}, e, {type: 'mwheelIntent'});
			return ($.event.dispatch || $.event.handle).apply(this, arguments);
		}
	}
};
$.fn.extend({
	mwheelIntent: function(fn) {
		return fn ? this.on("mwheelIntent", fn) : this.trigger("mwheelIntent");
	},
	
	unmwheelIntent: function(fn) {
		return this.off("mwheelIntent", fn);
	}
});

$(function(){
	body = doc.body;
	//assume that document is always scrollable, doesn't hurt if not
	$(doc).on('mwheelIntent.mwheelIntentDefault', $.noop);
});
})();


(function(){
	if($.event.special.mousepress){return;}
	var removeTimer = function(elem, full){
		var timer = elem.data('mousepresstimer');
		if(timer){
			clearTimeout(timer);
		}
		if(full){
			elem.off('mouseup.mousepressext mouseleave.mousepressext');
		}
		elem = null;
	};
	$.event.special.mousepress = {
		setup: function(){
			var timer;
			$(this).on('mousedown.mousepressext', function(e){
				var elem = $(this);
				
				var startIntervall = function(delay){
					var steps = 0;
					removeTimer(elem);
					elem.data('mousepresstimer', setInterval(function(){
						$.event.special.mousepress.handler(elem[0], e);
						steps++;
						if(steps > 3 && delay > 45){
							startIntervall(delay - 40);
						}
					}, delay));
				};
				var target = $(e.target).trigger('mousepressstart', [e]);
				
				removeTimer(elem);
				elem.data('mousepresstimer', setTimeout(function(){
					startIntervall(180);
				}, 200));
				
				elem.on('mouseup.mousepressext mouseleave.mousepressext', function(e){
					removeTimer(elem, true);
					target.trigger('mousepressend', [e]);
					elem = null;
					target = null;
				});
			});
		},
		teardown: function(){
			removeTimer($(this).off('.mousepressext'), true);
		},
		handler: function(elem, e){
			return $.event.dispatch.call(elem, {type: 'mousepress', target: e.target, pageX: e.pageX, pageY: e.pageY});
		}
	};
	
})();

})(webshims.$);


webshims.register('forms-picker', function($, webshims, window, document, undefined, options){
	"use strict";
	var picker = webshims.picker;
	var actions = picker._actions;
	var moduleOpts = options;
	
	var getDateArray = function(date){
		var ret = [date.getFullYear(), moduleOpts.addZero(date.getMonth() + 1), moduleOpts.addZero(date.getDate())];
		ret.month = ret[0]+'-'+ret[1];
		ret.date = ret[0]+'-'+ret[1]+'-'+ret[2];
		ret.time = moduleOpts.addZero(date.getHours()) +':'+ moduleOpts.addZero(date.getMinutes());
		
		ret['datetime-local'] = ret.date +'T'+ ret.time;
		return ret;
	};
	var today = getDateArray(new Date());
	
	
	var _setFocus = function(element, _noFocus){
		
		element = $(element || this.activeButton);
		this.activeButton.attr({tabindex: '-1', 'aria-selected': 'false'});
		this.activeButton = element.attr({tabindex: '0', 'aria-selected': 'true'});
		this.index = this.buttons.index(this.activeButton[0]);
		
		clearTimeout(this.timer);
		
		picker._genericSetFocus.apply(this, arguments);
		
	};
	
	var _initialFocus = function(){
		var sel;
		if(this.popover.navedInitFocus){
			sel = this.popover.navedInitFocus.sel || this.popover.navedInitFocus;
			if((!this.activeButton || !this.activeButton[0]) && this.buttons[sel]){
				this.activeButton = this.buttons[sel]();
			} else if(sel){
				this.activeButton = $(sel, this.element);
			}
			
			if(!this.activeButton[0] && this.popover.navedInitFocus.alt){
				this.activeButton = this.buttons[this.popover.navedInitFocus.alt]();
			}
		}
		
		if(!this.activeButton || !this.activeButton[0]){
			this.activeButton = this.buttons.filter('.checked-value');
		}
		
		if(!this.activeButton[0]){
			this.activeButton = this.buttons.filter('.this-value');
		}
		if(!this.activeButton[0]){
			this.activeButton = this.buttons.eq(0);
		}
		
		this.setFocus(this.activeButton, this.opts.noFocus);
	};
	var formcfg = webshims.formcfg;
	var curCfg = formcfg.__active || formcfg[''];
	var stopPropagation = function(e){
		e.stopImmediatePropagation();
	};
	var steps = options.steps;
	
	var mousePress = function(e){
		$(this)[e.type == 'mousepressstart' ? 'addClass' : 'removeClass']('mousepress-ui');
	};
	var getMonthNameHTML = function(index, year, prefix){
		var dateCfg = curCfg.date;
		var str = [];
		if(!prefix){
			prefix = '';
		}
		$.each({monthNames: 'monthname', monthDigits: 'month-digit', monthNamesShort: 'monthname-short'}, function(prop, cName){
			var name = [prefix + dateCfg[prop][index]];
			if(year){
				name.push(year);
				if(dateCfg.showMonthAfterYear){
					name.reverse();
				}
			}
			str.push('<span class="'+ cName +'">'+ name.join(' ') +'</span>');
		});
		return str.join('');
	};
	
	var widgetProtos = {
		_addBindings: function(){
			var isFocused;
			
			var that = this;
			var o = this.options;
			
			var eventTimer = (function(){
				var events = {};
				return {
					init: function(name, curVal, fn){
						if (!events[name]) {
							events[name] = {
								fn: fn
							};
							$(that.orig).on(name, function(){
								events[name].val = $.prop(that.orig, 'value');
							});
						}
						events[name].val = curVal;
					},
					call: function(name, val){
						if (events[name] && events[name].val != val) {
							clearTimeout(events[name].timer);
							events[name].val = val;
							events[name].fn(val, that);
						}
					}
				};
			})();
			var initChangeEvents = function(){
				eventTimer.init('input', $.prop(that.orig, 'value'), that.options.input);
				eventTimer.init('change', $.prop(that.orig, 'value'), that.options.change);
			};
			
			var step = {};
			
			var preventBlur = function(e){
				if (preventBlur.prevent) {
					e.preventDefault();
					$(isFocused || that.element.getShadowFocusElement()).trigger('focus');
					stopPropagation(e);
					return true;
				}
			};
			(function(){
				var timer;
				
				var call = function(e){
					var val;
					clearTimeout(timer);
					val = that.parseValue();
					if (that.type == 'color') {
						that.inputElements.val(val);
					}
					$.prop(that.orig, 'value', val);
					eventTimer.call('input', val);
					if (!e || e.type != 'wsupdatevalue') {
						eventTimer.call('change', val);
					}
				};
				
				var onFocus = function(e){
					clearTimeout(timer);
					$(e.target).trigger('wswidgetfocusin');
				};
				var onBlur = function(e){
					clearTimeout(timer);
					timer = setTimeout(call, 0);
					$(e.target).trigger('wswidgetfocusout');
					if (e.type == 'ws__change') {
						stopPropagation(e);
						if (!o.splitInput) {
							call();
						}
					}
				};
				
				that.element.on('wsupdatevalue', call);
				
				that.inputElements.add(that.buttonWrapper).add(that.element).on({
					'ws__focusin': onFocus,
					'ws__blur ws__focusout ws__change': onBlur
				});
				setTimeout(function(){
					if (that.popover) {
						that.popover.element.on('wspopoverhide', onBlur);
						that.popover.element.children().on({
							'focusin': onFocus,
							'focusout': onBlur
						});
					}
				}, 0);
			})();
			
			var spinEvents = {};
			var spinElement = o.splitInput ? this.inputElements.filter('.ws-spin') : this.inputElements.eq(0);
			var elementEvts = {
				ws__blur: function(e){
					if (!preventBlur(e) && !o.disabled && !o.readonly) {
						if (!preventBlur.prevent) {
							isFocused = false;
						}
					}
					stopPropagation(e);
				},
				ws__focus: function(e){
					if (!isFocused) {
						initChangeEvents();
						isFocused = this;
					}
				},
				keypress: function(e){
					if (e.isDefaultPrevented()) {
						return;
					}
					var chr;
					var stepped = true;
					var code = e.keyCode;
					if (!e.ctrlKey && !e.metaKey && curCfg[that.type + 'Signs']) {
						chr = String.fromCharCode(e.charCode == null ? code : e.charCode);
						stepped = !(chr < " " || (curCfg[that.type + 'Signs'] + '0123456789').indexOf(chr) > -1);
					}
					else {
						stepped = false;
					}
					if (stepped) {
						e.preventDefault();
					}
				},
				ws__input: (this.type == 'color' && this.isValid) ? $.noop : (function(){
					var timer;
					var delay = that.type == 'number' && !o.nogrouping ? 99 : 199;
					var check = function(){
						var val = that.parseValue(true);
						if (val && that.isValid(val)) {
							that.setInput(val, true);
						}
						
					};

					return function(){
						clearTimeout(timer);
						timer = setTimeout(check, delay);
					};
				})(),
				'ws__input keydown keypress': (function(){
					var timer;
					var isStopped = false;
					var releaseTab = function(){
						if (isStopped === true) {
							isStopped = 'semi';
							timer = setTimeout(releaseTab, 250);
						}
						else {
							isStopped = false;
						}
					};
					var stopTab = function(){
						isStopped = true;
						clearTimeout(timer);
						timer = setTimeout(releaseTab, 300);
					};
					var select = function(){
						var elem = this;
						setTimeout(function(){
							elem.focus();
							if(elem.select){
								elem.select();
							}
						}, 4);
						
						stopTab();
					};
					
					return function(e){
						if (o.splitInput && o.jumpInputs) {
							if (e.type == 'ws__input') {
								if ($.prop(this, 'value').length === $.prop(this, 'maxLength')) {
									try {
										$(this).next().next('input, select').each(select);
									} 
									catch (er) {}
								}
							}
							else 
								if (!e.shiftKey && !e.crtlKey && e.keyCode == 9 && (isStopped === true || (isStopped && !$.prop(this, 'value')))) {
									e.preventDefault();
								}
						}
					};
				})()
			};
			var mouseDownInit = function(){
				if (!o.disabled && !isFocused) {
					that.element.getShadowFocusElement().trigger('focus');
				}
				preventBlur.set();
				
				return false;
			};
			
			preventBlur.set = (function(){
				var timer;
				var reset = function(){
					preventBlur.prevent = false;
				};
				return function(){
					clearTimeout(timer);
					preventBlur.prevent = true;
					setTimeout(reset, 9);
				};
			})();
			
			if(o.splitInput && o.jumpInputs == null){
				o.jumpInputs = true;
			}
			
			this.buttonWrapper.on('mousedown', mouseDownInit);
			
			this.setInput = function(value, isLive){
				that.value(value, false, isLive);
				eventTimer.call('input', value);
			};
			this.setChange = function(value){
				that.setInput(value);
				eventTimer.call('change', value);
			};
			
			
			
			this.inputElements.on(elementEvts);
			
			if (steps[this.type]) {
				['stepUp', 'stepDown'].forEach(function(name){
					step[name] = function(factor){
						if (!o.disabled && !o.readonly) {
							if (!isFocused) {
								mouseDownInit();
							}
							var ret = false;

							if (!factor) {
								factor = 1;
							}
							if(o.stepfactor){
								factor *= o.stepfactor;
							}

							if(factor > 0 && !isNaN(that.minAsNumber) && (isNaN(that.valueAsNumber) || that.valueAsNumber < that.minAsNumber) && that.elemHelper.prop('valueAsNumber') <= that.minAsNumber){
								ret = that.asValue(that.minAsNumber);
							} else if(factor < 0 && !isNaN(that.maxAsNumber) && (isNaN(that.valueAsNumber) || that.valueAsNumber > that.minAsNumber) && that.elemHelper.prop('valueAsNumber') <= that.maxAsNumber){
								ret = that.asValue(that.maxAsNumber);
							}

							if(ret === false){
								try {
									that.elemHelper[name](factor);
									ret = that.elemHelper.prop('value');
								} catch (er) {
									if (!o.value && that.maxAsNumber >= that.minAsNumber) {
										ret = o.defValue;
									}
								}
							}
							if (ret !== false && o.value != ret) {
								that.value(ret);
								if(o.toFixed && o.type == 'number'){
									that.element[0].value = that.toFixed(that.element[0].value, true);
								}
								eventTimer.call('input', ret);
							}
							return ret;
						}
					};
				});
				if (!o.noSpinbtn) {
					spinEvents.mwheelIntent = function(e, delta){
						if (delta && isFocused && !o.disabled) {
							step[delta > 0 ? 'stepUp' : 'stepDown']();
							e.preventDefault();
						}
					};
					spinEvents.keydown = function(e){
						if (o.list || e.isDefaultPrevented() || (e.altKey && e.keyCode == 40) || $.attr(this, 'list')) {
							return;
						}
						var stepped = true;
						var code = e.keyCode;
						if (code == 38) {
							step.stepUp();
						}
						else 
							if (code == 40) {
								step.stepDown();
							}
							else {
								stepped = false;
							}
						if (stepped) {
							e.preventDefault();
						}
					};
					
					spinElement.on(spinEvents);
				}
				$(this.buttonWrapper)
					.on('mousepressstart mousepressend', '.step-up, .step-down', mousePress)
					.on('mousedown mousepress', '.step-up', function(e){
						step.stepUp();
					})
					.on('mousedown mousepress', '.step-down', function(e){
						step.stepDown();
					})
				;
				initChangeEvents();
			}
		},
		_getSelectionEnd: function(val){
			var oldVal, selectionEnd;
			if((oldVal = this.element[0].value) && this.element.is(':focus') && (selectionEnd = this.element.prop('selectionEnd')) < oldVal.length){
				if(this.type == 'number'){
					oldVal = oldVal.substr(0, selectionEnd).split(curCfg.numberFormat[',']);
					val = val.substr(0, selectionEnd).split(curCfg.numberFormat[',']);
					if(oldVal.length < val.length){
						selectionEnd++;
					} else if(oldVal.length > val.length){
						selectionEnd--;
					}
				}
				return selectionEnd;
			}
		},
		initDataList: function(){
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
			
			$(this.orig).onTrigger('listdatalistchange', updateList);
		},
		getOptions: function(){
			var options = {};
			var datalist = $(this.orig).jProp('list');
			datalist.find('option').each(function(){
				options[$.prop(this, 'value')] = $.prop(this, 'label');
			});
			return [options, datalist.data('label')];
		}
	};
	
	$.extend($.fn.wsBaseWidget.wsProto, widgetProtos);
	$.extend($.fn.spinbtnUI.wsProto, widgetProtos);
	
	
	$(formcfg).on('change', function(e, data){
		curCfg = formcfg.__active;
	});
	
	
	webshims.ListBox = function (element, popover, opts){
		this.element = $('ul', element);
		this.popover = popover;
		this.opts = opts || {};
		this.buttons = $('button:not(:disabled)', this.element);
		
		
		this.ons(this);
		this._initialFocus();
	};
	
	webshims.ListBox.prototype = {
		setFocus: _setFocus,
		_initialFocus: _initialFocus,
		prev: function(){
			var index = this.index - 1;
			if(index < 0){
				if(this.opts.prev){
					this.popover.navedInitFocus = 'last';
					this.popover.actionFn(this.opts.prev);
					this.popover.navedInitFocus = false;
				}
			} else {
				this.setFocus(this.buttons.eq(index));
			}
		},
		next: function(){
			var index = this.index + 1;
			if(index >= this.buttons.length){
				if(this.opts.next){
					this.popover.navedInitFocus = 'first';
					this.popover.actionFn(this.opts.next);
					this.popover.navedInitFocus = false;
				}
			} else {
				this.setFocus(this.buttons.eq(index));
			}
		},
		ons: function(that){
			this.element
				.on({
					'keydown': function(e){
						var handled;
						var key = e.keyCode;
						if(e.ctrlKey){return;}
						if(key == 36 || key == 33){
							that.setFocus(that.buttons.eq(0));
							handled = true;
						} else if(key == 34 || key == 35){
							that.setFocus(that.buttons.eq(that.buttons.length - 1));
							handled = true;
						} else if(key == 38 || key == 37){
							that.prev();
							handled = true;
						} else if(key == 40 || key == 39){
							that.next();
							handled = true;
						}
						if(handled){
							return false;
						}
					}
				})
			;
		}
	};
	
	webshims.Grid = function (element, popover, opts){
		this.element = $('tbody', element);
		this.popover = popover;
		this.opts = opts || {};
		this.buttons = $('button:not(:disabled):not(.othermonth)', this.element);
		
		this.ons(this);
		
		this._initialFocus();
		if(this.popover.openedByFocus){
			this.popover.activeElement = this.activeButton;
		}
	};
	
	
	
	webshims.Grid.prototype = {
		setFocus: _setFocus,
		_initialFocus: _initialFocus,
		
		first: function(){
			this.setFocus(this.buttons.eq(0));
		},
		last: function(){
			this.setFocus(this.buttons.eq(this.buttons.length - 1));
		},
		upPage: function(){
			$('.ws-picker-header > button:not(:disabled)', this.popover.element).trigger('click');
		},
		downPage: function(){
			this.activeButton.filter(':not([data-action="changeInput"])').trigger('click');
		},
		ons: function(that){
			this.element
				.on({
					'keydown': function(e){
						var handled, sKey;
						var key = e.keyCode;
						if(e.shiftKey){return;}
						sKey = e.ctrlKey || e.altKey; //|| e.metaKey
						if((sKey && key == 40)){
							handled = 'downPage';
						} else if((sKey && key == 38)){
							handled = 'upPage';
						} else if(key == 33 || (sKey && key == 37)){
							handled = 'prevPage';
						} else if(key == 34 || (sKey && key == 39)){
							handled = 'nextPage';
						} else if(e.keyCode == 36 || e.keyCode == 33){
							handled = 'first';
						} else if(e.keyCode == 35){
							handled = 'last';
						} else if(e.keyCode == 38){
							handled = 'up';
						} else if(e.keyCode == 37){
							handled = 'prev';
						} else if(e.keyCode == 40){
							handled = 'down';
						} else if(e.keyCode == 39){
							handled = 'next';
						}
						if(handled){
							that[handled]();
							return false;
						}
					}
				})
			;
		}
	};
	$.each({
		prevPage: {get: 'last', action: 'prev'}, 
		nextPage: {get: 'first', action: 'next'}
	}, function(name, val){
		webshims.Grid.prototype[name] = function(){
			if(this.opts[val.action]){
				this.popover.navedInitFocus = {
					sel: 'button[data-id="'+ this.activeButton.attr('data-id') +'"]:not(:disabled,.othermonth)',
					alt: val.get
				};
				this.popover.actionFn(this.opts[val.action]);
				this.popover.navedInitFocus = false;
			}
		};
	});
	
	$.each({
		up: {traverse: 'prevAll', get: 'last', action: 'prev', reverse: true}, 
		down: {traverse: 'nextAll', get: 'first', action: 'next'}
	}, function(name, val){
		webshims.Grid.prototype[name] = function(){
			var cellIndex = this.activeButton.closest('td').prop('cellIndex');
			var sel = 'td:nth-child('+(cellIndex + 1)+') button:not(:disabled,.othermonth)';
			var button = this.activeButton.closest('tr')[val.traverse]();
			
			if(val.reverse){
				button = $(button.get().reverse());
			}
			button = button.find(sel)[val.get]();
			
			if(!button[0]){
				if(this.opts[val.action]){
					this.popover.navedInitFocus = sel+':'+val.get;
					this.popover.actionFn(this.opts[val.action]);
					this.popover.navedInitFocus = false;
				}
			} else {
				this.setFocus(button.eq(0));
			}
		};
	});
	
	$.each({
		prev: {traverse: 'prevAll',get: 'last', reverse: true}, 
		next: {traverse: 'nextAll', get: 'first'}
	}, function(name, val){
		webshims.Grid.prototype[name] = function(){
			var sel = 'button:not(:disabled,.othermonth)';
			var button = this.activeButton.closest('td')[val.traverse]('td');
			if(val.reverse){
				button = $(button.get().reverse());
			}
			button = button.find(sel)[val.get]();
			if(!button[0]){
				button = this.activeButton.closest('tr')[val.traverse]('tr');
				if(val.reverse){
					button = $(button.get().reverse());
				}
				button = button.find(sel)[val.get]();
			}
			
			if(!button[0]){
				if(this.opts[name]){
					this.popover.navedInitFocus = val.get;
					this.popover.actionFn(this.opts[name]);
					this.popover.navedInitFocus = false;
				}
			} else {
				this.setFocus(button.eq(0));
			}
		};
	});
	
	//taken from jquery ui
	picker.getWeek = function(date){
		var time;
		var checkDate = new Date(date.getTime());

		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

		time = checkDate.getTime();
		checkDate.setMonth(0);
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	};
	
	picker.getYearList = function(value, data){
		var j, i, val, disabled, lis, prevDisabled, nextDisabled, classStr, classArray, start;
		
		var o = data.options;
		var size = o.size;
		var max = o.max.split('-');
		var min = o.min.split('-');
		var cols = o.cols || 4;
		var currentValue = o.value.split('-');
		var xthCorrect = 0;
		var enabled = 0;
		var str = '';
		var rowNum = 0;
		var triggerValueValidation = (data.orig && ('valuevalidation' in $.data(data.orig)));

		if(!data.options.useDecadeBase){
			if(!max[0] && min[0]){
				data.options.useDecadeBase = 'min';
			} else if(max[0] && !min[0]){
				data.options.useDecadeBase = 'max';
			}
		}
		
		if(data.options.useDecadeBase == 'max' && max[0]){
			xthCorrect = 11 - (max[0] % 12);
		} else if(data.options.useDecadeBase == 'min' && min[0]){
			xthCorrect = 0 - (min[0] % 12);
		}
		
		value = value[0] * 1;
		start = value - ((value + xthCorrect) % (12 * size));
		
		
		
		for(j = 0; j < size; j++){
			if(j){
				start += 12;
			}  else {
				prevDisabled = picker.isInRange([start-1], max, min) ? {'data-action': 'setYearList','value': start-1} : false;
			}
			
			str += '<div class="year-list picker-list ws-index-'+ j +'"><div class="ws-picker-header"><select data-action="setYearList" class="decade-select">'+ picker.createYearSelect(value, max, min, '', {start: start, step: 12 * size, label: start+' – '+(start + 11)}).join('') +'</select><button disabled="disabled"><span>'+ start +' – '+(start + 11)+'</span></button></div>';
			lis = [];
			for(i = 0; i < 12; i++){
				val = start + i ;
				classArray = [];
				if( !picker.isInRange([val], max, min) || (triggerValueValidation && $(data.orig).triggerHandler('valuevalidation', [{value: val, valueAsDate: null, isPartial: [val]}]))){
					disabled = ' disabled=""';
				} else {
					disabled = '';
					enabled++;
				}
				
				if(val == today[0]){
					classArray.push('this-value');
				}
				
				if(currentValue[0] == val){
					classArray.push('checked-value');
				}
				
				classStr = classArray.length ? ' class="'+ (classArray.join(' ')) +'"' : '';
				
				if(i && !(i % cols)){
					rowNum++;
					lis.push('</tr><tr class="ws-row-'+ rowNum +'">');
				}
				lis.push('<td class="ws-item-'+ i +'" role="presentation"><button  data-id="year-'+ i +'" type="button"'+ disabled + classStr +' data-action="setMonthList" value="'+val+'" tabindex="-1" role="gridcell">'+val+'</button></td>');
			}
			if(j == size - 1){
				nextDisabled = picker.isInRange([val+1], max, min) ? {'data-action': 'setYearList','value': val+1} : false;
			}
			str += '<div class="picker-grid"><table role="grid" aria-label="'+ start +' – '+(start + 11)+'"><tbody><tr class="ws-row-0">'+ (lis.join(''))+ '</tr></tbody></table></div></div>';
		}
		
		return {
			enabled: enabled,
			main: str,
			next: nextDisabled,
			prev: prevDisabled,
			type: 'Grid'
		};
	};
	
	
	picker.getMonthList = function(value, data){
		
		var j, i, name, val, disabled, lis, prevDisabled, nextDisabled, classStr, classArray;
		var o = data.options;
		var size = o.size;
		var max = o.maxS;
		var min = o.minS;
		var cols = o.cols || 4;
		var currentValue = o.value.split('-');
		var enabled = 0;
		var rowNum = 0;
		var str = '';
		var action = data.type == 'month' ? 'changeInput' : 'setDayList' ;
		var triggerValueValidation = (data.orig && ('valuevalidation' in $.data(data.orig)));
		var isPartial = action != 'changeInput';
		
		value = value[0] - Math.floor((size - 1) / 2);
		for(j = 0; j < size; j++){
			if(j){
				value++;
			} else {
				prevDisabled = picker.isInRange([value-1], max, min) ? {'data-action': 'setMonthList','value': value-1} : false;
			}
			
			if(j == size - 1){
				nextDisabled = picker.isInRange([value+1], max, min) ? {'data-action': 'setMonthList','value': value+1} : false;
			}
			lis = [];
			
			if( !picker.isInRange([value, '01'], max, min) && !picker.isInRange([value, '12'], max, min)){
				disabled = ' disabled=""';
			} else {
				disabled = '';
			}
			
			if(o.minView >= 1){
				disabled = ' disabled=""';
			}
			
			str += '<div class="month-list picker-list ws-index-'+ j +'"><div class="ws-picker-header">';
			
			str += '<select data-action="setMonthList" class="year-select">'+ picker.createYearSelect(value, max, min).join('') +'</select> <button data-action="setYearList"'+disabled+' value="'+ value +'" tabindex="-1"><span>'+ value +'</span></button>';
			str += '</div>';
			
			for(i = 0; i < 12; i++){
				val = curCfg.date.monthkeys[i+1];
				name = getMonthNameHTML(i);
				classArray = [];
				if(!picker.isInRange([value, val], max, min) || (triggerValueValidation  && $(data.orig).triggerHandler('valuevalidation', [{value: value+'-'+val, valueAsDate: data.asDate(value+'-'+val), isPartial: isPartial && [value, val]}]))){
					disabled = ' disabled=""';
				} else {
					disabled = '';
					enabled++;
				}
				
				if(value == today[0] && today[1] == val){
					classArray.push('this-value');
				}
				
				if(currentValue[0] == value && currentValue[1] == val){
					classArray.push('checked-value');
				}
				
				classStr = (classArray.length) ? ' class="'+ (classArray.join(' ')) +'"' : '';
				if(i && !(i % cols)){
					rowNum++;
					lis.push('</tr><tr class="ws-row-'+ rowNum +'">');
				}

				lis.push('<td class="ws-item-'+ i +'" role="presentation"><button data-id="month-'+ i +'" type="button"'+ disabled + classStr +' data-action="'+ action +'" value="'+value+'-'+val+'" tabindex="-1" role="gridcell" aria-label="'+ curCfg.date.monthNames[i] +'">'+name+'</button></td>');
				
			}
			
			str += '<div class="picker-grid"><table role="grid" aria-label="'+value+'"><tbody><tr class="ws-row-0">'+ (lis.join(''))+ '</tr></tbody></table></div></div>';
		}
		
		return {
			enabled: enabled,
			main: str,
			prev: prevDisabled,
			next: nextDisabled,
			type: 'Grid'
		};
	};
	
	
	
	picker.getDayList = function(value, data){
		
		var j, i, k, day, nDay, disabled, prevDisabled, nextDisabled, yearNext, yearPrev, addTr, week, rowNum;
		
		var lastMonth, curMonth, otherMonth, dateArray, monthName, fullMonthName, buttonStr, date2, classArray;
		
		var o = data.options;
		var size = o.size;
		var max = o.maxS;
		var min = o.minS;
		var currentValue = o.value.split('T')[0].split('-');
		var dateCfg = curCfg.date;
		var str = [];
		var date = new Date(value[0], value[1] - 1, 1);
		var action = (data.type == 'datetime-local') ? 'setTimeList' : 'changeInput';
		var triggerValueValidation = (data.orig && ('valuevalidation' in $.data(data.orig)));
		var isPartial = action != 'changeInput';
		
		date.setMonth(date.getMonth()  - Math.floor((size - 1) / 2));
		
		yearNext = [ (value[0] * 1) + 1, value[1] ];
		yearNext = picker.isInRange(yearNext, max, min) ? {'data-action': 'setDayList','value': yearNext.join('-')} : false;
		
		yearPrev = [ (value[0] * 1) - 1, value[1] ];
		yearPrev = picker.isInRange(yearPrev, max, min) ? {'data-action': 'setDayList','value': yearPrev.join('-')} : false;
		
		for(j = 0;  j < size; j++){
			date.setDate(1);
			lastMonth = date.getMonth();
			rowNum = 0;
			if(!j){
				date2 = new Date(date.getTime());
				date2.setDate(-1);
				dateArray = getDateArray(date2);
				prevDisabled = picker.isInRange(dateArray, max, min) ? {'data-action': 'setDayList','value': dateArray[0]+'-'+dateArray[1]} : false;
			}
			
			dateArray = getDateArray(date);
			
			
			
			str.push('<div class="day-list picker-list ws-index-'+ j +'"><div class="ws-picker-header">');
			monthName = ['<select data-action="setDayList" class="month-select" tabindex="0">'+ picker.createMonthSelect(dateArray, max, min).join('') +'</select>', '<select data-action="setDayList" class="year-select" tabindex="0">'+ picker.createYearSelect(dateArray[0], max, min, '-'+dateArray[1]).join('') +'</select>'];
			if(curCfg.date.showMonthAfterYear){
				monthName.reverse();
			}
			str.push( monthName.join(' ') );
			
			fullMonthName = [dateCfg.monthNames[(dateArray[1] * 1) - 1], dateArray[0]];
			
			if(dateCfg.showMonthAfterYear){
				fullMonthName.reverse();
			}
			
			str.push(  
				'<button data-action="setMonthList"'+ (o.minView >= 2 ? ' disabled="" ' : '') +' value="'+ dateArray.date +'" tabindex="-1">'+ getMonthNameHTML((dateArray[1] * 1) - 1, dateArray[0]) +'</button>'
			);
			
			
			str.push('</div><div class="picker-grid"><table role="grid" aria-label="'+ fullMonthName.join(' ')  +'"><thead><tr>');
			
			str.push('<th class="week-header ws-week">'+ dateCfg.weekHeader +'</th>');
			
			for(k = dateCfg.firstDay; k < dateCfg.dayNamesShort.length; k++){
				str.push('<th class="day-'+ k +'"><abbr title="'+ dateCfg.dayNames[k] +'">'+ dateCfg.dayNamesShort[k] +'</abbr></th>');
			}
			k = dateCfg.firstDay;
			while(k--){
				str.push('<th class="day-'+ k +'"><abbr title="'+ dateCfg.dayNames[k] +'">'+ dateCfg.dayNamesShort[k] +'</abbr></th>');
			}
			str.push('</tr></thead><tbody><tr class="ws-row-0">');
			
			week = picker.getWeek(date);
			str.push('<td class="week-cell ws-week" role="gridcell" aria-disabled="true">'+ week +'</td>');
			
			for (i = 0; i < 99; i++) {
				addTr = (i && !(i % 7));
				curMonth = date.getMonth();
				otherMonth = lastMonth != curMonth;
				day = date.getDay();
				classArray = [];
				
				if(addTr && otherMonth && rowNum >= 5){
					
					str.push('</tr>');
					break;
				}
				if(addTr){
					rowNum++;
					str.push('</tr><tr class="ws-row-'+ rowNum + ((otherMonth) ? ' other-month-row' : '')+'">');
					week++;
					if(week > 52){
						week =  picker.getWeek(date);
					}
					str.push('<td class="week-cell ws-week" role="gridcell" aria-disabled="true">'+ week +'</td>');
				}
				
				if(!i){
					
					if(day != curCfg.date.firstDay){
						nDay = day - curCfg.date.firstDay;
						if(nDay < 0){
							nDay += 7;
						}
						date.setDate(date.getDate() - nDay);
						day = date.getDay();
						curMonth = date.getMonth();
						otherMonth = lastMonth != curMonth;
					}
				}
				
				dateArray = getDateArray(date);
				buttonStr = '<td role="presentation" class="day-'+ day +'"><button data-id="day-'+ date.getDate() +'" role="gridcell" data-action="'+action+'" value="'+ (dateArray.join('-')) +'" type="button"';
				
				if(otherMonth){
					classArray.push('othermonth');
				} else {
					classArray.push('day-'+date.getDate());
				}
				
				if(dateArray[0] == today[0] && today[1] == dateArray[1] && today[2] == dateArray[2]){
					classArray.push('this-value');
				}
				
				if(currentValue[0] == dateArray[0] && dateArray[1] == currentValue[1] && dateArray[2] == currentValue[2]){
					classArray.push('checked-value');
				}
				
				if(classArray.length){
					buttonStr += ' class="'+ classArray.join(' ') +'"';
				}
				
				if(!picker.isInRange(dateArray, max, min) || (triggerValueValidation && $(data.orig).triggerHandler('valuevalidation', [{value: dateArray.join('-'), valueAsDate: date, isPartial: isPartial && dateArray}]))){
					buttonStr += ' disabled=""';
				}
				
				str.push(buttonStr+' tabindex="-1">'+ date.getDate() +'</button></td>');
				
				date.setDate(date.getDate() + 1);
			}
			str.push('</tbody></table></div></div>');
			if(j == size - 1){
				dateArray = getDateArray(date);
				dateArray[2] = 1;
				nextDisabled = picker.isInRange(dateArray, max, min) ? {'data-action': 'setDayList','value': dateArray.date} : false;
			}
		}
				
		
		return {
			enabled: 9,
			main: str.join(''),
			prev: prevDisabled,
			next: nextDisabled,
			yearPrev: yearPrev,
			yearNext: yearNext,
			type: 'Grid'
		};
	};
	
//	var createDatimeValue = 
	
	
	picker.getTimeList = function(value, data){
		var label, tmpValue, iVal, hVal, valPrefix;
		var str = '<div class="time-list picker-list ws-index-0">';
		var i = 0;
		var rowNum = 0;
		var len = 23;
		var attrs = {
			min: $.prop(data.orig, 'min'),
			max: $.prop(data.orig, 'max'),
			step: $.prop(data.orig, 'step')
		};
		var triggerValueValidation = (data.orig && ('valuevalidation' in $.data(data.orig)));
		var gridLabel = '';
		
		if(data.type == 'time'){
			label = '<button type="button" disabled="">'+ $.trim($(data.orig).jProp('labels').text() || '').replace(/[\:\*]/g, '')+'</button>';
		} else {
			tmpValue = value[2].split('T');
			value[2] = tmpValue[0];
			if(tmpValue[1]){
				value[3] = tmpValue[1];
			}
			gridLabel = ' aria-label="'+ value[2] +'. '+ (curCfg.date.monthNames[(value[1] * 1) - 1]) +' '+ value[0] +'"';
			label = getMonthNameHTML((value[1] * 1) - 1, value[0], value[2] +'. ');
			label = '<button tabindex="-1" data-action="setDayList" value="'+value[0]+'-'+value[1]+'-'+value[2]+'" type="button">'+label+'</button>';
			valPrefix = value[0] +'-'+value[1]+'-'+value[2]+'T';
		}
		
		str += '<div class="ws-picker-header">'+label+'</div>';
		
		str += '<div class="picker-grid"><table role="grid"'+ gridLabel +'><tbody><tr>';
		for(; i <= len; i++){
			iVal = moduleOpts.addZero(''+i) +':00';
			hVal = valPrefix ? 
				valPrefix+iVal :
				iVal
			;
				
			if(i && !(i % 4)){
				rowNum++;
				str += '</tr><tr class="ws-row-'+ rowNum +'">';
			}
			str += '<td role="presentation"><button role="gridcell" data-action="changeInput" value="'+ hVal +'" type="button" tabindex="-1"';
			
			if(!data.isValid(hVal, attrs) || (triggerValueValidation && $(data.orig).triggerHandler('valuevalidation', [{value: hVal, valueAsDate: data.asDate(hVal), partial: false}]))){
				str += ' disabled=""';
			}
			if(value == iVal){
				str += ' class="checked-value"';
			}
			str += '>'+ data.formatValue(iVal) +'</button></td>';
		}
		
		
		str += '</tr></tbody></table></div></div>';
		
		return {
			enabled: 9,
			main: str,
			prev: false,
			next: false,
			type: 'Grid'
		};
	};
	
	picker.isInRange = function(values, max, min){
		var i;
		var ret = true;
		for(i = 0; i < values.length; i++){
			
			if(min[i] && min[i] > values[i]){
				ret = false;
				break;
			} else if( !(min[i] && min[i] == values[i]) ){
				break;
			}
		}
		if(ret){
			for(i = 0; i < values.length; i++){
				
				if((max[i] && max[i] < values[i])){
					ret = false;
					break;
				} else if( !(max[i] && max[i] == values[i]) ){
					break;
				}
			}
		}
		return ret;
	};
	
	picker.createMonthSelect = function(value, max, min, monthNames){
		if(!monthNames){
			monthNames = curCfg.date.monthNames;
		}
		
		var selected;
		var i = 0;
		var options = [];
		var tempVal = value[1]-1;
		for(; i < monthNames.length; i++){
			selected = tempVal == i ? ' selected=""' : '';
			if(selected || picker.isInRange([value[0], i+1], max, min)){
				options.push('<option value="'+ value[0]+'-'+moduleOpts.addZero(i+1) + '"'+selected+'>'+ monthNames[i] +'</option>');
			}
		}
		return options;
	};
		
	(function(){
		var retNames = function(name){
			return 'get'+name+'List';
		};
		var retSetNames = function(name){
			return 'set'+name+'List';
		};
		var stops = {
			date: 'Day',
			week: 'Day',
			month: 'Month',
			'datetime-local': 'Time',
			time: 'Time'
		};
		var setDirButtons = function(content, popover, dir){
			if(content[dir]){
				//set content and idl attribute (content for css + idl for IE8-) 
				popover[dir+'Element']
					.attr(content[dir])
					.prop({disabled: false})
					.prop(content[dir])
				;
			} else {
				popover[dir+'Element']
					.removeAttr('data-action')
					.prop({disabled: true})
				;
			}
		};
		
		$.each({'setYearList' : ['Year', 'Month', 'Day', 'Time'], 'setMonthList': ['Month', 'Day', 'Time'], 'setDayList': ['Day', 'Time'], 'setTimeList': ['Time']}, function(setName, names){
			var getNames = names.map(retNames);
			var setNames = names.map(retSetNames);
			actions[setName] = function(val, popover, data, startAt){
				val = ''+val;
				var o = data.options;
				var values = val.split('-');
				if(!startAt){
					startAt = 0;
				}
				$.each(getNames, function(i, item){
					if(i >= startAt){
						var content = picker[item](values, data);
						
						if( values.length < 2 || content.enabled > 1 || content.prev || content.next || stops[data.type] === names[i]){
							popover.element
								.attr({'data-currentview': setNames[i]})
								.addClass('ws-size-'+o.size)
								.data('pickercontent', {
									data: data,
									content: content,
									values: values
								})
							;
							popover.bodyElement.html(content.main);
							
							setDirButtons(content, popover, 'prev');
							setDirButtons(content, popover, 'next');
							
							setDirButtons(content, popover, 'yearPrev');
							setDirButtons(content, popover, 'yearNext');
							$(o.orig).trigger('pickerchange');
							
							if(webshims[content.type]){
								new webshims[content.type](popover.bodyElement.children(), popover, content);
							}
							
							popover.element
								.filter('[data-vertical="bottom"]')
								.triggerHandler('pospopover')
							;
							return false;
						}
					}
				});
			};
		});
	})();
	
	picker.showPickerContent = function(data, popover){
		var options = data.options;
		var init = data._popoverinit;
		
		data._popoverinit = true;
		
		if(!init){
			picker.commonInit(data, popover);
			picker.commonDateInit(data, popover);
		}

		popover.element.triggerHandler('updatepickercontent');

		if(!init || options.restartView) {
			actions.setYearList( options.defValue || options.value, popover, data, options.startView);
		} else {
			actions[popover.element.attr('data-currentview') || 'setYearList']( options.defValue || options.value, popover, data, 0);
		}
		data._popoverinit = true;
	};
	
	
	picker.commonDateInit = function(data, popover){
		if(data._commonDateInit){return;}
		data._commonDateInit = true;
		var o = data.options;
		var actionfn = function(e){
			if(!$(this).is('.othermonth') || $(this).css('cursor') == 'pointer'){
				popover.actionFn({
					'data-action': $.attr(this, 'data-action'),
					value: $(this).val() || $.attr(this, 'value')
				});
			}
			return false;
		};
		var id = new Date().getTime();
		
		var generateList = function(o, max, min){
			var options = [];
			var label = '';
			var labelId = '';
			o.options = data.getOptions() || {};
			$('div.ws-options', popover.contentElement).remove();
			$.each(o.options[0], function(val, label){
				var disabled = picker.isInRange(val.split('-'), o.maxS, o.minS) ?
					'' :
					' disabled="" '
				;
				if(label){
					label = ' <span class="ws-label">'+ label +'</span>';
				}
				options.push('<li role="presentation"><button value="'+ val +'" '+disabled+' data-action="changeInput" tabindex="-1"  role="option"><span class="ws-value">'+ data.formatValue(val, false) +'</span>'+ label +'</button></li>');
			});
			if(options.length){
				id++;
				if(o.options[1]){
					labelId = 'datalist-'+id;
					label = '<h5 id="'+labelId+'">'+ o.options[1] +'</h5>';
					labelId = ' aria-labelledbyid="'+ labelId +'" ';
				}
				new webshims.ListBox($('<div class="ws-options">'+label+'<ul role="listbox" '+ labelId +'>'+ options.join('') +'</div>').insertAfter(popover.bodyElement)[0], popover, {noFocus: true});
			}
		};
		var updateContent = function(){
			var tmpMinMax;

			if(popover.isDirty){
				popover.isDirty = false;
				tmpMinMax = o.max.split('T');
				o.maxS = tmpMinMax[0].split('-');
				if(tmpMinMax[1]){
					o.maxS.push(tmpMinMax[1]);
				}
				
				tmpMinMax = o.min.split('T');
				o.minS = tmpMinMax[0].split('-');
				if(tmpMinMax[1]){
					o.minS.push(tmpMinMax[1]);
				}
				
				$('button', popover.buttonRow).each(function(){
					var text;
					if($(this).is('.ws-empty')){
						text = curCfg.date.clear;
						if(!text){
							text = formcfg[''].date.clear || 'clear';
							webshims.warn("could not get clear text from form cfg");
						}
					} else if($(this).is('.ws-current')){
						text = (curCfg[data.type] || {}).currentText;
						if(!text){
							text = (formcfg[''][[data.type]] || {}).currentText || (curCfg.date || {}).currentText || 'current';
							webshims.warn("could not get currentText from form cfg for "+data.type);
						}

						if(today[data.type] && data.type != 'time'){
							$.prop(this, 'disabled', (!picker.isInRange(today[data.type].split('-'), o.maxS, o.minS) || !!$(data.orig).triggerHandler('valuevalidation', [{value: today[data.type], valueAsDate: new Date(), isPartial: false}])));
						}
					}
					if(text){
						$(this).text(text).attr({'aria-label': text});
					}
					
				});
				popover.nextElement
					.attr({'aria-label': curCfg.date.nextText})
				;
				popover.prevElement
					.attr({'aria-label': curCfg.date.prevText})
				;
				popover.yearNextElement
					.attr({'aria-label': curCfg.date.nextText})
				;
				popover.yearPrevElement
					.attr({'aria-label': curCfg.date.prevText})
				;
				popover.contentElement.attr({
					dir: curCfg.date.isRTL ? 'rtl' : 'ltr',
					lang: webshims.formcfg.__activeName
				});

				generateList(o, o.maxS, o.minS);
				
				if(popover.isVisible){
					picker.showPickerContent(data, popover);
				}
				
			}
			$('button.ws-empty', popover.buttonRow).prop('disabled', $.prop(data.orig, 'required'));
			popover.isDirty = false;
		};
		
		if(data.type == 'time'){
			o.minView = 3;
			o.startView = 3;
		}
		if(!o.minView){
			o.minView = 0;
		}
		if(o.startView < o.minView){
			o.startView = o.minView;
			webshims.warn("wrong config for minView/startView.");
		}
		if(!o.size){
			o.size = 1;
		}
		
		
		popover.actionFn = function(obj){
			if(actions[obj['data-action']]){
				actions[obj['data-action']](obj.value, popover, data, 0);
			} else {
				webshims.warn('no action for '+ obj['data-action']);
			}
		};
		
		
		
		popover.contentElement.html('<div class="prev-controls ws-picker-controls"><button class="ws-super-prev ws-year-btn" tabindex="0" type="button"></button><button class="ws-prev" tabindex="0" type="button"></button></div> <div class="next-controls ws-picker-controls"><button class="ws-next" tabindex="0" type="button"></button><button class="ws-super-next ws-year-btn" tabindex="0" type="button"></button></div><div class="ws-picker-body"></div><div class="ws-button-row"><button type="button" class="ws-current" data-action="changeInput" value="'+today[data.type]+'" tabindex="0"></button> <button type="button" data-action="changeInput" value="" class="ws-empty" tabindex="0"></button></div>');
		popover.nextElement = $('button.ws-next', popover.contentElement);
		popover.prevElement = $('button.ws-prev', popover.contentElement);
		popover.yearNextElement = $('button.ws-super-next', popover.contentElement);
		popover.yearPrevElement = $('button.ws-super-prev', popover.contentElement);
		popover.bodyElement = $('div.ws-picker-body', popover.contentElement);
		popover.buttonRow = $('div.ws-button-row', popover.contentElement);
		popover.element.on('updatepickercontent', updateContent);

		popover.contentElement
			.wsTouchClick('button[data-action]', actionfn)
			.on('change', 'select[data-action]', actionfn)
		;
		
		
		$(o.orig).on('input', function(){
			var currentView;
			if(o.updateOnInput && popover.isVisible && o.value && (currentView = popover.element.attr('data-currentview'))){
				actions[currentView]( data.options.value , popover, data, 0);
			}
		});
		$(document).onTrigger('wslocalechange', data._propertyChange);
		if(o.updateOnInput == null && (o.inlinePicker || o.noChangeDismiss)){
			o.updateOnInput = true;
		}
		if(o.inlinePicker){
			popover.element.attr('data-class', $.prop(data.orig, 'className'));
			popover.element.attr('data-id', $.prop(data.orig, 'id'));
		}
		
		$(o.orig).trigger('pickercreated');
	};
		
});
