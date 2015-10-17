YUI.add('dial', function(Y) {

	var supportsVML = false;
	if(Y.config.doc.namespaces && Y.config.doc.namespaces.add){
		Y.config.doc.namespaces.add(
			'v', // vml namespace
			'urn:schemas-microsoft-com:vml',
			'#default#VML' // required for IE8
		);	
		if(Y.config.doc.createElement('v:oval').strokeColor){
			supportsVML = true;
		}
	}

    var Lang = Y.Lang,
        Widget = Y.Widget,
        Node = Y.Node;

    /* Dial class constructor */
    function Dial(config) {
        Dial.superclass.constructor.apply(this, arguments);
    }

    /* 
     * Required NAME static field, to identify the Widget class and 
     * used as an event prefix, to generate class names etc. (set to the 
     * class name in camel case). 
	 * Jeff says, "Camel doesn't seem to work for me. spinWheel didn't work."
     */
    Dial.NAME = "dial";

    /*
     * The attribute configuration for the Dial widget. Attributes can be
     * defined with default values, get/set functions and validator functions
     * as with any other class extending Base.
     */
    Dial.ATTRS = {
        // The minimum value for the dial.
        min : {
            value:-220
        },

        // The maximum value for the dial.
        max : {
            value:220
        },

		// The diameter of the dial
		diameter : {
			value:100
		},

        // The current value of the dial.
        value : {
            value:0,
            validator: function(val) {
                return this._validateValue(val);
            }
        },
		
        // Amount to increment/decrement the dial when the buttons or arrow up/down keys are pressed.
        minorStep : {
            value:1
        },

        // Amount to increment/decrement the dial when the page up/down keys are pressed.
        majorStep : {
            value:10
        },

		// The value increments in 360 degrees of rotation
		stepsPerRev : {
			value:100
		},

        // The strings for the dial UI. This attribute is 
        // defined by the base Widget class but has an empty value. The
        // dial is simply providing a default value for the attribute.
        strings: {
			value: {label: 'My label',
				resetStr: 'Reset',
				tooltipHandle: 'Press the arrow up/down/left/right keys for minor increments, page up/down for major increments, home for reset.'
			}
        },
		
		// The distance from the center of the dial to the resting place of the center of the handle and marker.
		// The value is a percent of the radius of the dial
		handleDist:{
			value:0.75
		}
    };

    /* Static constant used to identify the classname applied to the spinwheels value field */
	function makeClassName(str) {
		return Y.ClassNameManager.getClassName(Dial.NAME, str);
	}
	Dial.CSS_CLASSES = {
		input : Dial.INPUT_CLASS = makeClassName("value"),
		label : Dial.LABEL_CLASS = makeClassName("label"),
		valueString : Dial.LABEL_CLASS = makeClassName("value-string"),
		northMark : Dial.NORTH_MARK_CLASS = makeClassName("north-mark"),
		ring : Dial.RING_CLASS = makeClassName('ring'),
		ringVml : Dial.RING_CLASS = makeClassName('ring-vml'),
		marker : Dial.MARKER_CLASS = makeClassName("marker"),
		markerUser : Dial.MARKER_USER_CLASS = makeClassName("marker-user"),
		centerButton : Dial.CENTER_BUTTON_CLASS = makeClassName("center-button"),
		centerButtonVml : Dial.RING_CLASS = makeClassName('center-button-vml'),
		resetString : Dial.RESET_STRING_CLASS = makeClassName("reset-str"),
		handle : Dial.HANDLE_CLASS = makeClassName("handle"),
		handleUser : Dial.HANDLE_USER_CLASS = makeClassName("handle-user")
	};
    
	
    /* Static constants used to define the markup templates used to create Dial DOM elements */
	//var strs = this.get('strings');
	var strs = Dial.ATTRS.strings.value, //('strings');
	labelId = Dial.CSS_CLASSES.label + Y.guid();

	Dial.LABEL_TEMPLATE = '<div id="' + labelId + '" class="' + Dial.CSS_CLASSES.label + '">' + Y.substitute('{label}', strs) + ':<span class="' + Dial.CSS_CLASSES.valueString + '"></span></div>';
    Dial.INPUT_TEMPLATE = '<input type="text" class="' + Dial.CSS_CLASSES.input + '">';



	if(supportsVML === false){
		Dial.RING_TEMPLATE = '<div class="' + Dial.CSS_CLASSES.ring + '"><div class="' + Dial.CSS_CLASSES.northMark + '"></div></div>';
		Dial.MARKER_TEMPLATE = '<div class="' + Dial.CSS_CLASSES.marker + ' marker-hidden"><div class="' + Dial.CSS_CLASSES.markerUser + '"></div></div>';
		Dial.CENTER_BUTTON_TEMPLATE = '<div class="' + Dial.CSS_CLASSES.centerButton + '"><div class="' + Dial.CSS_CLASSES.resetString + '">' + Y.substitute('{resetStr}', Dial.ATTRS.strings.value) + '</div></div>';
		Dial.HANDLE_TEMPLATE = '<div class="' + Dial.CSS_CLASSES.handle + '"><div class="' + Dial.CSS_CLASSES.handleUser + '" aria-labelledby="' + labelId + '" aria-valuetext="" aria-valuemax="" aria-valuemin="" aria-valuenow="" role="slider"  tabindex="0"></div></div>';// title="' + Y.substitute('{tooltipHandle}', strs) + '"
	
	}else{ // VML case
		Dial.RING_TEMPLATE = '<div class="' + Dial.CSS_CLASSES.ring + '">'+
								'<div class="' + Dial.CSS_CLASSES.northMark + '"></div>'+
									'<v:oval strokecolor="#ceccc0" strokeweight="1px" class="' + Dial.CSS_CLASSES.ringVml + '"><v:fill type=gradient color="#8B8A7F" color2="#EDEDEB" angle="45"/></v:oval>'+
									'<v:oval></v:oval>'+
								'</div>'+
								'';
		Dial.MARKER_TEMPLATE = '<div class="' + Dial.CSS_CLASSES.marker + ' marker-hidden">'+
									'<v:oval stroked="false" class="' + Dial.CSS_CLASSES.markerUser + '">'+
										'<v:fill opacity="20%" color="#000"/>'+
									'</v:oval>'+
									'<v:oval></v:oval>'+
								'</div>'+
								'';
		Dial.CENTER_BUTTON_TEMPLATE = '<div class="' + Dial.CSS_CLASSES.centerButton + '">'+
											'<v:oval strokecolor="#ceccc0" strokeweight="1px" class="' + Dial.CSS_CLASSES.centerButtonVml + '">'+
												'<v:fill type=gradient color="#C7C5B9" color2="#fefcf6" colors="35% #d9d7cb, 65% #fefcf6" angle="45"/>'+
												'<v:shadow on="True" color="#000" opacity="10%" offset="2px, 2px"/>'+
											'</v:oval>'+
											'<v:oval></v:oval>'+
											'<div class="' + Dial.CSS_CLASSES.resetString + '">' + Y.substitute('{resetStr}', Dial.ATTRS.strings.value) + '</div>'+
									'</div>'+
									'';
		Dial.HANDLE_TEMPLATE = '<div class="' + Dial.CSS_CLASSES.handle + '">'+
									'<v:oval stroked="false" class="' + Dial.CSS_CLASSES.handleUser + '"'+
									' aria-labelledby="' + labelId + '" aria-valuetext="" aria-valuemax="" aria-valuemin="" aria-valuenow="" role="slider"  tabindex="0" >'+ //title="' + Y.substitute('{tooltipHandle}', strs) + '"
										'<v:fill opacity="20%" color="#6C3A3A"/>'+
									'</v:oval>'+
									'<v:oval></v:oval>'+
								'</div>'+
								'';
	}

    /* 
     * The HTML_PARSER static constant is used by the Widget base class to populate 
     * the configuration for the dial instance from markup already on the page.
     *
     * The Dial class attempts to set the value of the dial widget if it
     * finds the appropriate input element on the page.
     */
    Dial.HTML_PARSER = {
        value: function (srcNode) {
            var val = parseInt(srcNode.get("value"),10); 
            return Y.Lang.isNumber(val) ? val : null;
        }
    };

    /* Dial extends the base Widget class */
    Y.extend(Dial, Widget, {

        /*
         * renderUI is part of the lifecycle introduced by the
         * Widget class. Widget's renderer method invokes:
         *
         *     renderUI()
         *     bindUI()
         *     syncUI()
         *
         * renderUI is intended to be used by the Widget subclass
         * to create or insert new elements into the DOM. 
         *
         * For dial the method adds the input (if it's not already 
         * present in the markup), and creates the inc/dec buttons
         */
        renderUI : function() {
			this._renderLabel();
			this._renderInput();
			this._renderRing();
			this._renderMarker();
			this._renderCenterButton();
			this._renderHandle();


			// object handles
			this.contentBox = this.get("contentBox");
			
			// constants
			this._centerX = this.get('diameter') / 2;
			this._centerY = this.get('diameter') / 2;
			this._centerYOnPage = (this._ringNode.getY() + this._centerY);
			this._centerXOnPage = (this._ringNode.getX() + this._centerX);
			this._handleDist = this._centerX * this.get('handleDist');
			this._originalValue = this.get('value');

			// variables
			this._timesWrapped = 0;
			this._angle = 0;
			this._setTimesWrapedFromValue(this.get('value'));
			
			// init Aria
			this._handleUserNode.set('aria-valuemin', this.get('min'));
			this._handleUserNode.set('aria-valuemax', this.get('max'));

        },

        /*
         * bindUI is intended to be used by the Widget subclass 
         * to bind any event listeners which will drive the Widget UI.
         * 
         * It will generally bind event listeners for attribute change
         * events, to update the state of the rendered UI in response 
         * to attribute value changes, and also attach any DOM events,
         * to activate the UI.
         * 
         * For dial, the method:
         *
         * - Sets up the attribute change listener for the "value" attribute
         *
         * - Binds key listeners for the arrow/page keys
         * - Binds mouseup/down listeners on the boundingBox, document respectively.
         * - Binds a simple change listener on the input box.
         */
        bindUI : function() {
            this.after("valueChange", this._afterValueChange);

            var boundingBox = this.get("boundingBox"),

            // Looking for a key event which will fire continously across browsers while the key is held down.  
			// 37 , 39 = arrow left/right, 38, 40 = arrow up/down, 33, 34 = page up/down,  35 , 36 = end/home
            keyEventSpec = (!Y.UA.opera) ? "down:" : "press:";
            keyEventSpec += "37, 39, 38, 40, 33, 34, 35, 36";

            Y.on("key", Y.bind(this._onDirectionKey, this), boundingBox, keyEventSpec);
            Y.on("keyup", Y.bind(this._numberKey, this), this._inputNode);

			Y.on('mouseenter', Y.bind(this._dialCenterOver, this), this._centerButtonNode);
			Y.on('mouseleave', Y.bind(this._dialCenterOut, this), this._centerButtonNode);
			Y.on('click', Y.bind(this._resetDial, this), this._centerButtonNode);			
			
			var dd1 = new Y.DD.Drag({
				node: this._handleNode,
				on : {
					'drag:drag' : Y.bind(this._handleDrag, this),
					'drag:start' : Y.bind(this._handleDragStart, this),
					'drag:end' : Y.bind(this._handleDragEnd, this)
				}
			});
		},
		_setTimesWrapedFromValue : function(val){
			if(val % this.get('stepsPerRev') === 0){
				this._timesWrapped = (val / this.get('stepsPerRev')) -1;
			}else{
				this._timesWrapped = Math.floor(val / this.get('stepsPerRev'));
			}
		},
		_dialCenterOver : function(e){
			this._resetString.setContent(Y.substitute('{resetStr}', Dial.ATTRS.strings.value));
		},
		_dialCenterOut : function(e){
			this._resetString.setContent(''); 
		},
		/*
		 * Reset all to zero and set dial and handle positions
		 */
		_resetDial : function(){
			this.set('value', this._originalValue);
			this._setTimesWrapedFromValue(this.get('value'));
			this._prevX = this._handleNode.getX();
			//this._inputNode.focus();
		},
		_handleDrag : function(e){
			var ang = Math.atan( (this._centerYOnPage - e.pageY)  /  (this._centerXOnPage - e.pageX)  ) * (180 / Math.PI), 
			deltaX = (this._centerXOnPage - e.pageX);
			if(deltaX < 0){
				ang = (ang + 90);
			}else{
				ang = (ang - 90);
			}
			// check for need to set timesWrapped
			if(e.pageY < this._centerYOnPage){ //if handle is above the middle of the dial...
				if((this._prevX <= this._centerXOnPage) && (e.pageX > this._centerXOnPage)){ // If wrapping, clockwise
					this._timesWrapped = (this._timesWrapped + 1);
				}else if((this._prevX > this._centerXOnPage) && (e.pageX <= this._centerXOnPage)){ // if un-wrapping, counter-clockwise
					this._timesWrapped = (this._timesWrapped - 1);
				}
			}
			this._prevX = e.pageX;
			var newValue = this._getValueFromAngle(ang); // This function needs the current _timesWrapped value
			// handle hitting max and min and going beyond, stops at max or min 
			//if((newValue > this.get('min')) && (newValue < this.get('max'))) {
			if((newValue > this.get('min')) && (newValue < this.get('max'))) {
				this.set('value', newValue);
			}else if(newValue > this.get('max')){
				this.set('value', this.get('max'));
			}else if(newValue < this.get('min')){
				this.set('value', this.get('min'));
			}
		},
		_handleDragStart : function(e){
			this._markerNode.removeClass('marker-hidden');
			if(!this._prevX){
				this._prevX = this._handleNode.getX();
			}
		},

		/*
		 * When handle is handleDragEnd, this animates the return to the fixed dial
		 */		
		_handleDragEnd : function(){
			var node = this._handleNode;			
				node.transition({
					duration: 0.08, // seconds
					easing: 'ease-in',
					left: this._setNodeToFixedRadius()[0] + 'px',
					top: this._setNodeToFixedRadius()[1] + 'px'
				}, Y.bind(function(){
						this._markerNode.addClass('marker-hidden');
						this._prevX = this._handleNode.getX(); //makes us ready for next drag.
					}, this)
				);
			this._setTimesWrapedFromValue(this.get('value'));
//			this._inputNode.focus();
//			this._inputNode.select();
		},

		/*
		 * Sets the XY of the node to the fixed dial within the control (resting position)
		 * Sets it according to the angle related to the current value
		 * In the case of handle drag:end, no obj is passed so
		 * this just returns [X,Y] for style transform 
		 */
		 _setNodeToFixedRadius : function(obj){
			var thisAngle = (this._angle - 90),
			rad = (Math.PI / 180);
			var newY = Math.round(Math.sin(thisAngle * rad) * this._handleDist);
			var newX = Math.round(Math.cos(thisAngle * rad) * this._handleDist);
			if(obj){
		//		obj.setXY([(this._centerXOnPage + newX), (this._centerYOnPage + newY)]);
				obj.setXY([(this._ringNode.getX() + this._centerX + newX), (this._ringNode.getY() + this._centerY + newY)]);
			}else{ // just need the style for css transform left and top to animate the handle drag:end
				return [this._centerX + newX, this._centerX + newY];
			}
		 },

        /*
         * syncUI is intended to be used by the Widget subclass to
         * update the UI to reflect the current state of the widget.
         * 
         * For dial, the method sets the value of the input field,
         * to match the current state of the value attribute.
         */
        syncUI : function() {
            this._uiSetValue(this.get("value"));
        },

        /*
         * Creates the input control for the dial and adds it to
         * the widget's content box, if not already in the markup.
         */
        _renderInput : function() {
            var contentBox = this.get("contentBox"),
                input = contentBox.one("." + Dial.CSS_CLASSES.input);
            if (!input) {
                input = Node.create(Dial.INPUT_TEMPLATE);
                contentBox.append(input);
            }
            this._inputNode = input;
        },
        _renderLabel : function() {
            var contentBox = this.get("contentBox"),
                label = contentBox.one("." + Dial.CSS_CLASSES.label);
            if (!label) {
                label = Node.create(Dial.LABEL_TEMPLATE);
                contentBox.append(label);
            }
            this._labelNode = label;
			this._valueStringNode = this._labelNode.one("." + Dial.CSS_CLASSES.valueString);
        },
        _renderRing : function() {
            var contentBox = this.get("contentBox"),
                ring = contentBox.one("." + Dial.CSS_CLASSES.ring);
            if (!ring) {
                ring = Node.create(Dial.RING_TEMPLATE);
                contentBox.append(ring);
				ring.setStyles({width:this.get('diameter') + 'px', height:this.get('diameter') + 'px'});
            }
            this._ringNode = ring;
        },
        _renderMarker : function() {
            var contentBox = this.get("contentBox"),
			marker = contentBox.one("." + Dial.CSS_CLASSES.marker);
            if (!marker) {
                marker = Node.create(Dial.MARKER_TEMPLATE);
                contentBox.one('.' + Dial.CSS_CLASSES.ring).append(marker);
            }
            this._markerNode = marker;
			this._markerUserNode = this._markerNode.one('.' + Dial.CSS_CLASSES.markerUser);

        },
        _renderCenterButton : function() {
            var contentBox = this.get("contentBox"),
                centerButton = contentBox.one("." + Dial.CSS_CLASSES.centerButton);
            if (!centerButton) {
                centerButton = Node.create(Dial.CENTER_BUTTON_TEMPLATE);
                contentBox.one('.' + Dial.CSS_CLASSES.ring).append(centerButton);
            }
            this._centerButtonNode = centerButton;
			this._resetString = this._centerButtonNode.one('.' + Dial.CSS_CLASSES.resetString);
			// centering the reset string in the button
			this._resetString.setStyle('top', (this._centerButtonNode.get('region').height / 2) - (this._resetString.get('region').height / 2) + 'px');
			this._resetString.setStyle('left', (this._centerButtonNode.get('region').width / 2) - (this._resetString.get('region').width / 2) + 'px');
			this._resetString.setContent('');
			var offset = this._ringNode.get('region').width * 0.25;
			this._centerButtonNode.setXY([(this._ringNode.getX() + offset), (this._ringNode.getY() + offset)]);
			
        },
        _renderHandle : function() {
            var contentBox = this.get("contentBox"),
                handle = contentBox.one("." + Dial.CSS_CLASSES.handle);
            if (!handle) {
                handle = Node.create(Dial.HANDLE_TEMPLATE);
                contentBox.one('.' + Dial.CSS_CLASSES.ring).append(handle);
            }
            this._handleNode = handle;
			this._handleUserNode = this._handleNode.one('.' + Dial.CSS_CLASSES.handleUser);
        },


        /*
         * Override the default content box value, since we don't want the srcNode
         * to be the content box for dial.
         */
        _defaultCB : function() {
            return null;
        },

        /*
         * Bounding box Arrow up/down, Page up/down key listener.
         *
         * Increments/Decrement the dial value, based on the key pressed.
         */
        _onDirectionKey : function(e) {
            e.preventDefault();
            var currVal = this.get("value"),
                newVal = currVal,
                minorStep = this.get("minorStep"),
                majorStep = this.get("majorStep");

            switch (e.charCode) { //37 , 39 = arrow left/right, 38, 40 = arrow up/down, 33, 34 = page up/down,  35 , 36 = end/home
                case 38: // up
                    newVal += minorStep;
                    newVal = Math.min(newVal, this.get("max"));
                    break;
                case 40: // down
                    newVal -= minorStep;
                    newVal = Math.max(newVal, this.get("min"));
                    break;
                case 37: // left
                    newVal -= minorStep;
                    newVal = Math.max(newVal, this.get("min"));
                    break;
                case 39: // right
                    newVal += minorStep;
                    newVal = Math.min(newVal, this.get("max"));
                    break;
                case 36: // home
                    newVal = this._originalValue;
                    break;
                case 35: // end
                    newVal = this.get('max');
                    break;
                case 33: // page up
                    newVal += majorStep;
                    newVal = Math.min(newVal, this.get("max"));
                    break;
                case 34: // page down
                    newVal -= majorStep;
                    newVal = Math.max(newVal, this.get("min"));
                    break;
            }

            if (newVal !== currVal) {
				this.set('value', newVal);
				this._prevX = this._handleNode.getX();
				this._setTimesWrapedFromValue(this.get('value'));            }
//			also IE seems to require 2 tab keystrokes to start responding to arrow keys etc. to modify value
//			screen reader having trouble with IE6?
//			alert("aria-valuenow: " + Y.one('.' + Dial.CSS_CLASSES.handleUser).get('aria-valuenow'));
//			alert("aria-valuetext: " + Y.one('.' + Dial.CSS_CLASSES.handleUser).get('aria-valuetext'));
        },
		_getAngleFromValue : function(newVal){
			var nonWrapedPartOfValue = newVal % this.get('stepsPerRev');
			var angleFromValue = nonWrapedPartOfValue / this.get('stepsPerRev') * 360;
			return angleFromValue; 
		},
		
		_getValueFromAngle : function(angle){
			if(angle < 0){
				angle = (360 + angle);
			}else if(angle === 0){
				angle = 360;
			}
			var value = Math.round((angle / 360) * this.get('stepsPerRev'));
			return (value + (this._timesWrapped * this.get('stepsPerRev'))  );
		},
		_numberKey : function(e){
			var val = parseInt(e.target.get('value'),10);
			if(this._validateValue(val)){
				this.set('value', Math.round(val));
			}
		},

        /*
         * value attribute change listener. Updates the 
         * value in the rendered input box, whenever the 
         * attribute value changes.
         */
        _afterValueChange : function(e) {
            this._uiSetValue(e.newVal);
        },

        /*
         * Updates the value of the input box to reflect 
         * the value passed in.
		 * Makes all other needed UI display changes
         */
        _uiSetValue : function(val) {
            this._inputNode.set("value", val);
			this._valueStringNode.setContent(val); 
			this._angle = this._getAngleFromValue(val);
			this._handleUserNode.set('aria-valuenow', val);
			this._handleUserNode.set('aria-valuetext', val);
			this._setNodeToFixedRadius(this._handleNode);
			this._setNodeToFixedRadius(this._markerNode);
			if((val === this.get('max')) || (val === this.get('min'))){
				if(this._markerUserNode.hasClass('marker-max-min') === false){
					this._markerUserNode.addClass('marker-max-min');
					if(supportsVML === true){
						this._markerUserNode.one('fill').set('color', '#AB3232');
					}
				}
			}else{
				if(supportsVML === true){
					this._markerUserNode.one('fill').set('color', '#000');
				}
				if(this._markerUserNode.hasClass('marker-max-min') === true){
					this._markerUserNode.removeClass('marker-max-min');
				}
			}
        },

        /*
         * value attribute default validator. Verifies that
         * the value being set lies between the min/max value
         */
        _validateValue: function(val) {
            var min = this.get("min"),
                max = this.get("max");
            return (Lang.isNumber(val) && val >= min && val <= max);
        }
    });
	Y.Dial = Dial;



}, '@VERSION@' ,{requires:['widget', 'dd-drag', 'substitute', 'event-mouseenter', 'transition'], skinnable:true });
