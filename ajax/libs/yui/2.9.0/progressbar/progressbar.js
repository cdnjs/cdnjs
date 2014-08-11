/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 *
 * @module progressbar
 * @requires yahoo, dom, event, element
 * @optional animation
 * @title ProgressBar Widget
 */

(function () {
	var Dom = YAHOO.util.Dom,
		Lang = YAHOO.lang,
		// ClassNames
		CLASS_PROGBAR = 'yui-pb',
		CLASS_MASK = CLASS_PROGBAR + '-mask',
		CLASS_BAR = CLASS_PROGBAR + '-bar',
		CLASS_ANIM = CLASS_PROGBAR + '-anim',
		CLASS_TL = CLASS_PROGBAR + '-tl',
		CLASS_TR = CLASS_PROGBAR + '-tr',
		CLASS_BL = CLASS_PROGBAR + '-bl',
		CLASS_BR = CLASS_PROGBAR + '-br',
		
		// Configuration attributes
		WIDTH = 'width',
		HEIGHT = 'height',
		MIN_VALUE = 'minValue',
		MAX_VALUE = 'maxValue',
		VALUE = 'value',
		ANIM = 'anim',
		DIRECTION = 'direction',
		DIRECTION_LTR = 'ltr',
		DIRECTION_RTL = 'rtl',
		DIRECTION_TTB = 'ttb',
		DIRECTION_BTT = 'btt',
		BAR_EL = 'barEl',
		MASK_EL = 'maskEl',
		ARIA_TEXT_TEMPLATE = 'ariaTextTemplate',
		ACC = 'animAcceleration',
		BG_POSITION = 'background-position',
		PX = 'px',
		// Events
		START = 'start',
		PROGRESS = 'progress',
		COMPLETE = 'complete';
	
	/**
	 * The ProgressBar widget provides an easy way to draw a bar depicting progress of an operation,
	 * a level meter, rating or any such simple linear measure.
	 * It allows for highly customized styles including animation, vertical or horizontal and forward or reverse.
	 * @namespace YAHOO.widget
	 * @class ProgressBar
	 * @extends YAHOO.util.Element
	 * @param oConfigs {object} An object containing any configuration attributes to be set 
	 * @constructor
	 */        
	var Prog = function(oConfigs) {
        
		Prog.superclass.constructor.call(this, document.createElement('div') , oConfigs);
		this._init(oConfigs);
		
	};
	
	YAHOO.widget.ProgressBar = Prog;

    /**
     * String containing the HTML string which is the basis for the Progress
     * Bar. Value is inserted into the DOM with innerHTML.
     *
     * @property ProgressBar.MARKUP
     * @type HTML
     * @static
     * @final
     * @default (too long)
     */
	Prog.MARKUP = [
		'<div class="',
		CLASS_BAR,
		'"></div><div class="',
		CLASS_MASK,
		'"><div class="',
		CLASS_TL,
		'"></div><div class="',
		CLASS_TR,
		'"></div><div class="',
		CLASS_BL,
		'"></div><div class="',
		CLASS_BR,
		'"></div></div>'
	].join('');

	
	Lang.extend(Prog, YAHOO.util.Element, {
		/**
		 * Initialization code for the widget, separate from the constructor to allow for overriding/patching.
		 * It is called after <a href="#method_initAttributes">initAttributes</a>
		 *
		 * @method _init
		 * @param oConfigs {Object} (Optional) Object literal definition of configuration values.  
		 * @protected
		 */	
		 _init: function (oConfigs) {
			/**
			 * Fires when the value is about to change.  It reports the starting value
			 * @event start
			 * @type CustomEvent
			 * @param value {Number} the current (initial) value
			 */
			// No actual creation required, event will be created when subscribed to
			//this.createEvent(START);
			/**
			 * If animation is active, it will trigger several times during the animation providing intermediate values
			 * If animation is not active, it will fire only once providing the end value
			 * @event progress
			 * @type CustomEvent
			 * @param  value{Number} the current, changing value
			 */
			// No actual creation required, event will be created when subscribed to
			//this.createEvent(PROGRESS);
			/**
			 * Fires at the end of the animation or immediately upon changing values if animation is not loaded
			 * @event complete
			 * @type CustomEvent
			 * @param value {Number} the current (final)  value
			 */
			// No actual creation required, event will be created when listened to
			//this.createEvent(COMPLETE);
			

		},
		/**
		 * Implementation of Element's abstract method. Sets up config values.
		 *
		 * @method initAttributes
		 * @param oConfigs {Object} (Optional) Object literal definition of configuration values.
		 * @private
		 */	
		initAttributes: function (oConfigs) {

		    Prog.superclass.initAttributes.call(this, oConfigs);
			this.set('innerHTML',Prog.MARKUP);
			this.addClass(CLASS_PROGBAR);
			
			// I need to apply at least the following styles, if present in oConfigs, 
			// to the ProgressBar so when it later reads the width and height, 
			// they are already set to the correct values.
			// id is important because it can be used as a CSS selector.
			var key, presets = ['id',WIDTH,HEIGHT,'class','style'];
			while((key = presets.pop())) {
				if (key in oConfigs) {
					this.set(key,oConfigs[key]);
				}
			}
			

			/**
			 * @attribute barEl
			 * @description Reference to the HTML object that makes the moving bar (read-only)
			 * @type HTMLElement (div)
			 * @readonly
			 */			
		    this.setAttributeConfig(BAR_EL, {
		        readOnly: true,
		        value: this.getElementsByClassName(CLASS_BAR)[0]
		    });
			/**
			 * @attribute maskEl
			 * @description Reference to the HTML object that overlays the bar providing the mask. (read-only)
			 * @type HTMLElement (table)
			 * @readonly
			 */			
		    this.setAttributeConfig(MASK_EL, {
		        readOnly: true,
		        value: this.getElementsByClassName(CLASS_MASK)[0]
		    });
			
			
			/**
			 * @attribute direction
			 * @description Direction of movement of the bar.  
			 *    It can be any of 'ltr' (left to right), 'rtl' (the reverse) , 'ttb' (top to bottom) or 'btt'.
			 *    Can only be set before rendering.
			 * @default 'ltr'
			 * @type String (any of "ltr", "rtl", "ttb" or "btt")
			 */			
			this.setAttributeConfig(DIRECTION, {
				value:DIRECTION_LTR,
				validator:function(value) {
					if (this._rendered) { return false; }
					switch (value) {
						case DIRECTION_LTR:
						case DIRECTION_RTL:
						case DIRECTION_TTB:
						case DIRECTION_BTT:
							return true;
						default:
							return false;
					}
				}
			});
			
			/**
			 * @attribute maxValue
			 * @description Represents the top value for the bar. 
			 *   The bar will be fully extended when reaching this value.  
			 *   Values higher than this will be ignored. 
			 * @default 100
			 * @type Number
			 */				    
		    this.setAttributeConfig(MAX_VALUE, {
		        value: 100,
				validator: Lang.isNumber,
				method: function (value) {
					this.get('element').setAttribute('aria-valuemax',value);
					if (this.get(VALUE) > value) { this.set(VALUE,value); }
				}
		    });
			
			/**
			 * @attribute minValue
			 * @description Represents the lowest value for the bar. 
			 *   The bar will be totally collapsed when reaching this value.  
			 *    Values lower than this will be ignored. 
			 * @default 0
			 * @type Number
			 */				

		    this.setAttributeConfig(MIN_VALUE, {
		        value: 0,
				validator: Lang.isNumber,
				method: function (value) {
					this.get('element').setAttribute('aria-valuemin',value);
					if (this.get(VALUE) < value) { this.set(VALUE,value); }
				}
		    });
			/**
			 * @attribute width
			 * @description Pixel width of the ProgressBar, i.e., 200 or "200px".
			 *     It will always be returned as a string including units.
			 * @default "200px"
			 * @type Number or String
			 */				

		    this.setAttributeConfig(WIDTH, {
				getter: function() {
					return this.getStyle(WIDTH);
				},
				method: this._widthChange
		    });
		

			/**
			 * @attribute height
			 * @description Pixel height of the ProgressBar, i.e., 200 or "200px".
			 *     It will always be returned as a string including units.
			 * @default "20px"
			 * @type Number or String
			 */				
		    this.setAttributeConfig(HEIGHT, {
				getter:function() {
					return this.getStyle(HEIGHT);
				},
				method: this._heightChange
		    });
			
			
	
			/**
			 * @attribute ariaTextTemplate 
			 * @description Text to be voiced by screen readers.
			 *     The text is processed by <a href="YAHOO.lang.html#method_substitute">YAHOO.lang.substitute</a>.  
			 *     It can use the placeholders {value}, {minValue} and {maxValue}
			 * @default "{value}"
			 * @type String
			 */				
			this.setAttributeConfig(ARIA_TEXT_TEMPLATE, {
				value:'{value}'
			});
			
			/**
			 * @attribute value
			 * @description The value for the bar.  
			 *     Valid values are in between the minValue and maxValue attributes.
			 * @default 0
			 * @type Number
			 */			
			this.setAttributeConfig(VALUE, {
				value: 0,
				validator: function(value) {
					return Lang.isNumber(value) && value >= this.get(MIN_VALUE) && value <= this.get(MAX_VALUE);
				},
				method: this._valueChange
		    });
			
			/**
			 * @attribute anim
			 * @description It accepts either a boolean (recommended) or an instance of <a href="YAHOO.util.Anim.html">YAHOO.util.Anim</a>.
			 *   If a boolean, it will enable/disable animation creating its own instance of the animation utility.  
			 *   If given an instance of <a href="YAHOO.util.Anim.html">YAHOO.util.Anim</a> it will use that instance.
			 *   The <a href="YAHOO.util.Anim.html">animation</a> utility needs to be loaded.
			 *   When read, it returns the instance of the animation utility in use or null if none.  
			 *   It can be used to set the animation parameters such as easing methods or duration.
			 * @default null
			 * @type {boolean} or {instance of YAHOO.util.Anim}
			 */						
			this.setAttributeConfig(ANIM, {
				validator: function(value) {
					return !!YAHOO.util.Anim;
				},
				setter: this._animSetter
			});
			
			/**
			 * @attribute animAcceleration
			 * @description It accepts a number or null to cancel.  
			 * If a number, it is how fast the background image for the bar will move in the 
			 * opposite direction to the bar itself. null or 0 means the background won't move.
			 * Negative values will make the background move along the bar.
			 * Only valid with animation active and it requires a suitable background image to make it evident.
			 * @default null
			 * @type {number} or {null}
			 */
			
			this.setAttributeConfig(ACC, {
				value:null,
				validator: function(value) {
					return Lang.isNumber(value) || Lang.isNull(value);
				},
				method: function(value) {
					this._fixAnim(this.get(ANIM),value);
				}
			});
			
		},
		/** 
		 *  Renders the ProgressBar into the given container.  
		 *  If the container has other content, the ProgressBar will be appended to it.
		 *  If the second argument is provided, the ProgressBar will be inserted before the given child.
		 * The method is chainable since it returns a reference to this instance.
		 * @method render
		 * @param el {HTML Element}  HTML element that will contain the ProgressBar
		 * @param before {HTML Element}  (optional) If present, the ProgressBar will be inserted before this element.
		 * @return {YAHOO.widget.ProgressBar}
		 * @chainable
		 */
		render: function(parent, before) {

			if (this._rendered) { return; }
			this._rendered = true;
			
			var direction = this.get(DIRECTION);

			// If the developer set a className attribute on initialization, 
			// Element would have wiped out my own classNames
			// So I need to insist on them, plus add the one for direction.
			this.addClass(CLASS_PROGBAR);
			this.addClass(CLASS_PROGBAR + '-' + direction);

			var container = this.get('element');
			container.tabIndex = 0;
			container.setAttribute('role','progressbar');
			container.setAttribute('aria-valuemin',this.get(MIN_VALUE));
			container.setAttribute('aria-valuemax',this.get(MAX_VALUE));

			this.appendTo(parent,before);
			
					
			this.redraw(false);
			this._previousValue = this.get(VALUE);
			this._fixEdges();

			this.on('minValueChange',this.redraw);
			this.on('maxValueChange',this.redraw);

			return this;
		},

		/** 
		 * Recalculates the bar size and position and redraws it
		 * @method redraw
		 * @param noAnim {boolean} Don't use animation to redraw
		 * @return  void
		 */
		redraw: function (noAnim) {
			this._recalculateConstants();
			this._valueChange(this.get(VALUE), noAnim);
		},
			
		/** 
		 * Destroys the ProgressBar, related objects and unsubscribes from all events
		 * @method destroy
		 * @return  void
		 */
		destroy: function() {
			this.set(ANIM,false);
			this.unsubscribeAll();
			var el = this.get('element');
			if (el.parentNode) { el.parentNode.removeChild(el); }
		},
		/**
		 * The previous value setting for the bar.  Used mostly as information to event listeners
		 * @property _previousValue
		 * @type Number
		 * @private
		 * @default  0
		 */
		_previousValue:0,
		/**
		 * The actual space (in pixels) available for the bar within the mask (excludes margins)
		 * @property _barSpace
		 * @type Number
		 * @private
		 * @default  100
		 */
		_barSpace:100,
		/**
		 * The factor to convert the actual value of the bar into pixels
		 * @property _barSpace
		 * @type Number
		 * @private
		 * @default  1
		 */
		_barFactor:1,
		
		/**
		 * A flag to signal that rendering has already happened
		 * @property _rendered
		 * @type boolean
		 * @private
		 * @default  false
		 */
		_rendered:false,
		
		
		/** 
		 * Method called when the height attribute is changed
		 * @method _heightChange
		 * @param {int or string} value New height, in pixels if int or string including units
		 * @return void
		 * @private
		 */
		_heightChange: function(value) {
			if (Lang.isNumber(value)) {
				value += PX;
			}
			this.setStyle(HEIGHT,value);
			this._fixEdges();
			this.redraw(false);
		},

		/** 
		 * Method called when the height attribute is changed
		 * @method _widthChange
		 * @param {int or string} value New width, in pixels if int or string including units
		 * @return void
		 * @private
		 */
		_widthChange: function(value) {
			if (Lang.isNumber(value)) {
				value += PX;
			}
			this.setStyle(WIDTH,value);
			this._fixEdges();
			this.redraw(false);
		},
		
		/** 
		 * Due to rounding differences, some browsers fail to cover the whole area 
		 * with the mask quadrants when the width or height is odd.  This method
		 * stretches the lower and/or right quadrants to make the difference.
		 * @method _fixEdges
		 * @return void
		 * @private
		 */
		_fixEdges:function() {
			if (!this._rendered || YAHOO.env.ua.ie || YAHOO.env.ua.gecko ) { return; }
			var maskEl = this.get(MASK_EL),
				tlEl = Dom.getElementsByClassName(CLASS_TL,undefined,maskEl)[0],
				trEl = Dom.getElementsByClassName(CLASS_TR,undefined,maskEl)[0],
				blEl = Dom.getElementsByClassName(CLASS_BL,undefined,maskEl)[0],
				brEl = Dom.getElementsByClassName(CLASS_BR,undefined,maskEl)[0],
				newSize = (parseInt(Dom.getStyle(maskEl,HEIGHT),10) -
				parseInt(Dom.getStyle(tlEl,HEIGHT),10)) + PX;
				
			Dom.setStyle(blEl,HEIGHT,newSize);
			Dom.setStyle(brEl,HEIGHT,newSize);
			newSize = (parseInt(Dom.getStyle(maskEl,WIDTH),10) -
				parseInt(Dom.getStyle(tlEl,WIDTH),10)) + PX;
			Dom.setStyle(trEl,WIDTH,newSize);
			Dom.setStyle(brEl,WIDTH,newSize);
		},
					
				
		
		/** 
		 * Calculates some auxiliary values to make the rendering faster
		 * @method _recalculateConstants
		 * @return  void
		 * @private
		 */		
		_recalculateConstants: function() {
			var barEl = this.get(BAR_EL);

			switch (this.get(DIRECTION)) {
				case DIRECTION_LTR:
				case DIRECTION_RTL:
					this._barSpace = parseInt(this.get(WIDTH),10) - 
						(parseInt(Dom.getStyle(barEl,'marginLeft'),10) || 0) -
						(parseInt(Dom.getStyle(barEl,'marginRight'),10) || 0);
					break;
				case DIRECTION_TTB:
				case DIRECTION_BTT:
					this._barSpace = parseInt(this.get(HEIGHT),10) -
						(parseInt(Dom.getStyle(barEl,'marginTop'),10) || 0)-
						(parseInt(Dom.getStyle(barEl,'marginBottom'),10) || 0); 
					break;
			}
			this._barFactor = this._barSpace / (this.get(MAX_VALUE) - (this.get(MIN_VALUE) || 0))  || 1;
		},
		
		/** 
		 * Called in response to a change in the <a href="#config_anim">anim</a> attribute.
		 * It creates and sets up or destroys the instance of the animation utility that will move the bar
		 * @method _animSetter
		 * @param value {boolean ,YAHOO.util.Anim} Enable animation or set to specific instance
		 * @return  void
		 * @private
		 */		
		_animSetter: function (value) {
			var anim, barEl = this.get(BAR_EL);
			if (value) {
				if (value instanceof YAHOO.util.Anim) {
					anim = value;
				} else {
					anim = new YAHOO.util.Anim(barEl);
				}
				anim.onTween.subscribe(this._animOnTween,this,true);
				anim.onComplete.subscribe(this._animComplete,this,true);
				
				this._fixAnim(anim,this.get(ACC));
				
			} else {
				anim = this.get(ANIM);
				if (anim) {
					anim.onTween.unsubscribeAll();
					anim.onComplete.unsubscribeAll();
				}
				anim = null;
			}
			return anim;
		},
		/** 
		 * Temporary solution until http://yuilibrary.com/projects/yui2/ticket/2528222 gets solved.
		 * Also fixes: http://yuilibrary.com/projects/yui2/ticket/2528919.
		 * It also handles moving the background as per the animAcceleration configuration attribute
		 * since it turned out to be the best place to handle it.
		 * @method _fixAnim
		 * @param anim {YAHOO.util.Anim} Instance of Animation to fix
		 * @param acc {number} Value of animAcceleration attribute
		 * @return  void
		 * @private
		 */	
		_fixAnim: function(anim, acc) {


			if (anim) {
				if (!this._oldSetAttribute) {
					this._oldSetAttribute = anim.setAttribute;
				}
				var	pb = this;
				switch(this.get(DIRECTION)) {
					case DIRECTION_LTR:
						anim.setAttribute = function(attr , val , unit) {
							val = Math.round(val);
							pb._oldSetAttribute.call(this,attr,val,unit);
							if (attr == WIDTH) {
								pb._oldSetAttribute.call(this,BG_POSITION,-val * acc,PX);
							}
						};
						break;
					case DIRECTION_RTL:
						anim.setAttribute = function(attr , val , unit) {
							val = Math.round(val);
							pb._oldSetAttribute.call(this,attr,val,unit);
							if (attr == WIDTH) {
								var left = pb._barSpace - val;
								pb._oldSetAttribute.call(this,'left',left, PX);
								pb._oldSetAttribute.call(this, BG_POSITION, -left +  val * acc, PX);
							}
						};
						break;
					case DIRECTION_TTB:
						anim.setAttribute = function(attr , val , unit) {
							val = Math.round(val);
							pb._oldSetAttribute.call(this,attr,val,unit);
							if (attr == HEIGHT) {
								pb._oldSetAttribute.call(this,BG_POSITION,'center ' + (- val * acc),PX);
							}
						};
						break;
					
					case DIRECTION_BTT:
						anim.setAttribute = function(attr , val , unit) {
							val = Math.round(val);
							pb._oldSetAttribute.call(this,attr,val,unit);
							if (attr == HEIGHT) {
								var top = pb._barSpace - val;
								pb._oldSetAttribute.call(this,'top',top, PX);
								pb._oldSetAttribute.call(this, BG_POSITION,'center ' + (val * acc - top), PX);
							}
						};
						break;
				}
				// up to here
			}
		},
		/** 
		 * Called when the animation signals it has completed.
		 * @method _animComplete
		 * @return  void
		 * @private
		 */			
		_animComplete: function() {
			var value = this.get(VALUE);
			this._previousValue = value;
			this.fireEvent(PROGRESS,value);
			this.fireEvent(COMPLETE, value);
			Dom.removeClass(this.get(BAR_EL),CLASS_ANIM);
		},
		/** 
		 * Called for each onTween event of the animation instance.
		 * @method _animComplete
		 * @param name {string} Name of the event fired
		 * @param oArgs {object} Arguments provided by the Anim instance
		 * @return  void
		 * @private
		 */			
		_animOnTween:function (name,oArgs) {
			var value = Math.floor(this._tweenFactor * oArgs[0].currentFrame + this._previousValue);
			this.fireEvent(PROGRESS,value);
		},
		
		/** 
		 * Called in response to a change in the <a href="#config_value">value</a> attribute.
		 * Moves the bar to reflect the new value
		 * @method _valueChange
		 * @param value {number} New value to be set
		 * @param noAnim {boolean} Disable animation for this redraw
		 * @return  void
		 * @private
		 */		
		_valueChange: function (value, noAnim) {
			var anim = this.get(ANIM),
				pixelValue = Math.floor((value - this.get(MIN_VALUE)) * this._barFactor);
			
			this._setAriaText(value);
			if (this._rendered) {
				if (anim) {
					anim.stop();
					if (anim.isAnimated()) { anim._onComplete.fire(); } // see: http://yuilibrary.com/projects/yui2/ticket/2528217
				}
				this.fireEvent(START,this._previousValue);
				Prog._barSizeFunctions[((noAnim !== false) && anim)?1:0][this.get(DIRECTION)].call(this, value, pixelValue, this.get(BAR_EL), anim);
			}
		},

		/** 
		 * Utility method to set the ARIA value attributes
		 * @method _setAriaText
		 * @param value {number} Value to be voiced
		 * @return  void
		 * @private
		 */
		 _setAriaText: function(value) {

			var container = this.get('element'),
				text = Lang.substitute(this.get(ARIA_TEXT_TEMPLATE),{
					value:value,
					minValue:this.get(MIN_VALUE),
					maxValue:this.get(MAX_VALUE)
				});
			container.setAttribute('aria-valuenow',value);
			container.setAttribute('aria-valuetext',text);
		}
	});
	/**
	 * Collection of functions used to calculate the size of the bar.
	 * One of this will be used depending on direction and whether animation is active.
	 * @property _barSizeFunctions
	 * @type {collection of functions}
	 * @private
	 * @static
	 */
	var b = [{},{}];
	Prog._barSizeFunctions = b;
	
	b[0][DIRECTION_LTR] = function(value, pixelValue, barEl, anim) {
		Dom.setStyle(barEl,WIDTH,  pixelValue + PX);
		this.fireEvent(PROGRESS,value);
		this.fireEvent(COMPLETE,value);
	};
	b[0][DIRECTION_RTL] = function(value, pixelValue, barEl, anim) {
		Dom.setStyle(barEl,WIDTH,  pixelValue + PX);
		Dom.setStyle(barEl,'left',(this._barSpace - pixelValue) + PX);
		this.fireEvent(PROGRESS,value);
		this.fireEvent(COMPLETE,value);
	};
	b[0][DIRECTION_TTB] = function(value, pixelValue, barEl, anim) {
		Dom.setStyle(barEl,HEIGHT,  pixelValue + PX);
		this.fireEvent(PROGRESS,value);
		this.fireEvent(COMPLETE,value);
	};
	b[0][DIRECTION_BTT] = function(value, pixelValue, barEl, anim) {
		Dom.setStyle(barEl,HEIGHT,  pixelValue + PX);
		Dom.setStyle(barEl,'top',  (this._barSpace - pixelValue) + PX);
		this.fireEvent(PROGRESS,value);
		this.fireEvent(COMPLETE,value);
	};
	b[1][DIRECTION_LTR] = function(value, pixelValue, barEl, anim) {
		Dom.addClass(barEl,CLASS_ANIM);
		this._tweenFactor = (value - this._previousValue) / anim.totalFrames  / anim.duration;
		anim.attributes = {width:{ to: pixelValue }}; 
		anim.animate();
	};
	b[1][DIRECTION_RTL] = b[1][DIRECTION_LTR]; 
	b[1][DIRECTION_TTB] = function(value, pixelValue, barEl, anim) {
		Dom.addClass(barEl,CLASS_ANIM);
		this._tweenFactor = (value - this._previousValue) / anim.totalFrames  / anim.duration;
		anim.attributes = {height:{to: pixelValue}};
		anim.animate();
	};
	b[1][DIRECTION_BTT] = b[1][DIRECTION_TTB]; 
				
})();

YAHOO.register("progressbar", YAHOO.widget.ProgressBar, {version: "2.9.0", build: "2800"});
