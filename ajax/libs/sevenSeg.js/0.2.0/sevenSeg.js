(function($) {

var c_aNumberSegments = [0x3F,0x06,0x5B,0x4F,0x66,0x6D,0x7D,0x07,0x7F,0x6F]; //http://en.wikipedia.org/wiki/Seven-segment_display
var c_sClassSvg = "sevenSeg-svg";
var c_sClassSegOn = "sevenSeg-segOn";

// Default CSS styles. If you don't specify your own CSS or discrete color options, this is what gets used.
// 
$("<style type='text/css'>" 
    + "." + c_sClassSvg + "{fill: #320000; overflow: hidden; stroke-width: 0; height: 100%; width: 100%; background-color: Black}"
    + "." + c_sClassSegOn + "{fill: Red}"
    + "</style>")
    .prependTo("head");

$.widget("bw.sevenSegDigit", {

options: {
    /**
    This option controls the display value on the 7seg.  Set this to the numeric digit you
    want displayed.
    */
    value: null,

    /**
    Override the default segment on color (Red).  
    Note: You can alternatively define a CSS style for the class.sevenSeg-segOn that specifies a 'fill' color.
    */
    colorOn: null,

    /**
    Override the default segment off color (#320000).  
    Note: You can alternatively define a CSS style for the class .sevenSeg-svg that specifies a 'fill' color.
    */
    colorOff: null,

    /**
    Override the default background color of the display (Black).  
    Note: You can alternatively define a CSS style for the class .sevenSeg-svg that specifies a 'background-color' color.
    */
    colorBackground: null,
    
    /**
    This option allows skewing the segments to create a slant effect.
    Note: Setting "transform: skew()" in CSS is problematic for SVG. Would be nice to have, but browser support just 
    isn't there yet. So, setting the slant must be done through options.
    */
    slant: 0,  

    /**
    This flag controls the appearance of the decimal point 'dot' in the display.
    The default is to display it (true), but you can set to false to omit it.
    */
    decimalPoint: true
},		

/**
Widget factory creation handler.
*/
_create: function () {
    this.jqSvgElement = $("<svg/>", {
        class: c_sClassSvg,
        viewBox: "0 0 57 80",
        version: "1.1", 
        xmlns: "http://www.w3.org/2000/svg", 
        "xmlns:xlink":"http://www.w3.org/1999/xlink"
    })
    .css({fill: this.options.colorOff, "background-color": this.options.colorBackground})    ;

    $("<defs/>")
        .append($("<polyline/>", {id: "h-seg", points:"11 0, 37 0, 42 5, 37 10, 11 10, 6 5"}))
        .append($("<polyline/>", {id: "v-seg", points:"0 11, 5 6, 10 11, 10 34, 5 39, 0 39"}))
        .appendTo(this.jqSvgElement);
    
    this.jqSegments = $("<g/>", {class: this.widgetName + "-segGroup"})
        .append($("<use/>", {"xlink:href": "#h-seg", x: "0", y: "0"}))                                  //Segment A
        .append($("<use/>", {"xlink:href": "#v-seg", x: "-48", y: "0", transform: "scale(-1,1)"}))      //Segment B
        .append($("<use/>", {"xlink:href": "#v-seg", x: "-48", y: "-80", transform: "scale(-1,-1)"}))   //Segment C
        .append($("<use/>", {"xlink:href": "#h-seg", x: "0", y: "70"}))                                 //Segment D
        .append($("<use/>", {"xlink:href": "#v-seg", x: "0", y: "-80", transform: "scale(1,-1)"}))      //Segment E
        .append($("<use/>", {"xlink:href": "#v-seg", x: "0", y: "0"}))                                  //Segment F
        .append($("<use/>", {"xlink:href": "#h-seg", x: "0", y: "35"}))                                 //Segment G
        .appendTo(this.jqSvgElement);

    if(this.options.slant) {
        this.jqSegments.attr("transform", "skewX(" + -this.options.slant + ")");
    }

    if(this.options.decimalPoint) {
        $("<circle/>", {cx:"52", cy:"75", r:"5"}).appendTo(this.jqSvgElement);
    }
    
    this.jqSvgElement.appendTo(this.element);
    
    // http://stackoverflow.com/a/13654655/390906
    //
    this.element.html(this.element.html());
    this.jqSvgElement = this.element.find("svg");
    this.jqSegments = this.jqSvgElement.find("." + this.widgetName + "-segGroup");

    if(this.options.value) {
        this.displayValue(this.options.value);
    }
},

_destroy: function() {
    this.jqSvgElement.remove();
},

_setOption: function(key, value){
	this.options[key] = value;

	switch(key){
		case "value":
			this.displayValue(value);
			break;
	}
},

/**
This is the method to set the digit displayed.
@param value The numeric digit to display.  Call with null to blank out the display.
@param bDecimalPoint Set to true or false to drive the illumination state of the decimal point
(does not apply if decimal point display is disabled)
*/
displayValue: function(value, bDecimalPoint) {
    var self = this;
    if (value >= c_aNumberSegments.length) return;
    self.options.value = value;
    var segments = self._getSegments(value);
    self.jqSegments.children().each(function(index, element) {                     
        self._setSvgElementFill($(element), segments & (1 << index));        
    });
    
    self._setSvgElementFill(self.jqSvgElement.find("circle"), bDecimalPoint);
},

/**
Return the bitfield mask for the segments to illuminate for the argumen numeric digit value.    
*/
_getSegments: function(value) {
    if(value === "-") return 0x40;
    return c_aNumberSegments[value];
},

_setSvgElementFill: function(jqElement, bOn) {
    // jQuery addClass/removeClass doesn't work with svg <use> elements. So we have to do it the old way.
    //
    jqElement.attr("class", bOn && c_sClassSegOn);
    
    // Set the fill style if options.colorOn is defined. This overrides CSS definitions.
    //
    jqElement.css("fill", (bOn && this.options.colorOn) || "");
}

});

/**
This widget creates a group comprised of any number of discrete sevenSegDigits.
*/
$.widget("bw.sevenSeg", {

options: {
    /**
    This option controls the display value on the 7seg array.  Set this to the numeric value you
    want displayed.
    */
    value: null,

    /**
    Defines the number of digits that comprise the array.
    */
    digits: 1,

    /**
    Set this to true to allow sevenSeg to respond to the mousewheel event, which
    will allow you to change the display value by spinning the mousewheel up or down.
    (The default step is +/- 1, but you can set that in the step option).
    */
    allowInput: false,

    /**
    This setting controls the +/- delta value whenever the sevenSeg is incremented up or down (via mousewheel).
    The allowInput option must be true for this setting to be of use.
    */
    step: 1,

    /**
    This controls the number of decimal places displayed.  The default -1 results in no rounding and displays the value
    as-is.  A value of 0 or more defines the number of fixed decimal places that the numeric value will be rounded to.
    
    If you intend to set display values that are the result of floating point operations, including the
    use of allowInput=true and a fractional step size, then you most definitely want to set this to a specific value to
    avoid overflowing the display from floating point inaccuracies.
    */
    decimalPlaces: -1
},		

/**
Widget factory creation handler. This will create N number of sevenSegDigit widgets, one for each digit.
*/
_create: function () {
    this.aJqDigits = [];
    var sDigitWidth = this.options.digits && (100 / this.options.digits + "%");

    for(var iDigit = 0; iDigit < this.options.digits; ++iDigit) {
        this.aJqDigits[iDigit] = $("<div/>", {style: "display: inline-block; height: 100%;"})
            .css("width", sDigitWidth) 
            .sevenSegDigit(this.options)
            .appendTo(this.element);
    }

    this.aJqDigits.reverse();
    this._displayValue(this.options.value);
    this._bindMouseWheel();
},

_destroy: function() {
    $.each(this.aJqDigits, function(index, jqDigit) {
        jqDigit.sevenSegDigit("destroy");
        jqDigit.remove();
    });
},

/**
Setup event handler for mousewheel spins, if options.allowInput is set.
This will inc/dec the display value in response to spinning the wheel up or down.
*/
_bindMouseWheel: function () {
    var self = this;

    // Chrome and IE use the "mousewheel" event while FF uses "wheel".
    //
    var sEventName = "onwheel" in document ? "wheel" : "mousewheel";

    self._off(self.element, sEventName);
    if (!self.options.allowInput) return;
    
    var eventHandler = {};
    eventHandler[sEventName] = function (eventInfo) {
        var step = self.options.step;

        // Chrome and IE specify wheelDelta while FF uses deltaY (with reverse polarity).
        //
        var delta = eventInfo.originalEvent.wheelDelta || -eventInfo.originalEvent.deltaY;
        if (delta < 0) step = -step;

        self.option("value", parseFloat(self.options.value, 10) + step);
        eventInfo.preventDefault();
    };

    self._on(eventHandler);
},

_setOption: function(key, value){
	this.options[key] = value;
 
	switch(key){
		case "value":
			this._displayValue(value);
			break;
        
        // TODO BW : Add other options.
	}    
},

/**
Set the value of the digits to display.  You simply call this with a number and the respective
digits will be set.  Whatever digits that fit will be displayed, any additional will just be omitted.
@param value The numeric value to display.  Call with null to blank out the display.
*/
_displayValue: function(value) {
    var self = this;
    var sValue = self._createValueString(value);
    var iDecimalIdx = sValue.indexOf('.');
    var iDigitIdx = sValue.length - 1;

    $.each(self.aJqDigits, function(index, jqDigit) {
        var bDecimal = iDecimalIdx >= 0 && iDigitIdx === iDecimalIdx;
        if(bDecimal) {
            --iDigitIdx;
        }

        var sDigitValue = sValue[iDigitIdx];        
        jqDigit.sevenSegDigit("displayValue", sDigitValue, bDecimal);
        
        --iDigitIdx;
    });

    self._trigger("change", null, value);
},

/**
Given a value that can be a string, numeric, or null, form and return a string to use for driving the display.
If the value is null, then an empty string is returned.  Otherwise, the value is rounded to options.decimalPlaces
and returned in string form.
*/
_createValueString: function (value) {
    if (!value) return "";
    if (this.options.decimalPlaces < 0) return value.toString();

    var fValue = parseFloat(value, 10);
    return fValue.toFixed(this.options.decimalPlaces);
}

});

// Plugin the Knockout binding handler for sevenSeg if KO is defined.
//
if(ko && ko.bindingHandlers) {
	ko.bindingHandlers.sevenSeg = {
	    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	        var bindingValue = valueAccessor();
	        $(element).sevenSeg(ko.toJS(bindingValue));

	        // Setup event handler to mutate value observable whenever sevenSeg's value changes.
            // 
	        if (ko.isWriteableObservable(bindingValue.value)) {
	            $(element).on("sevensegchange", function (event, value) {
	                bindingValue.value(value);
	            });
	        }
	    },

	    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$(element).sevenSeg(ko.toJS(valueAccessor()));
		}
	};
}

})(jQuery);
