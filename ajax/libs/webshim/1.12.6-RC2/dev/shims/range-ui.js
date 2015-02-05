(function($){
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
	var rangeProto = {
		_create: function(){
			var i;
			
			this.element.addClass(this.options.baseClass || 'ws-range').attr({role: 'slider'}).append('<span class="ws-range-rail ws-range-track"><span class="ws-range-min ws-range-progress" /><span class="ws-range-thumb"><span><span data-value="" data-valuetext="" /></span></span></span>');
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
				if(e && e.type == 'mouseup'){
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
						eventTimer.init('input', o.value);
						eventTimer.init('change', o.value);
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
	if(window.webshims && webshims.isReady){
		webshims.isReady('range-ui', true);
	}
})(window.webshims ? webshims.$ : jQuery);
