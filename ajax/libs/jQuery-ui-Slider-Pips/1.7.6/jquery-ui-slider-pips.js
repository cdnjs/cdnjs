/*! jQuery-ui-Slider-Pips - v1.7.6 - 2015-02-22
* Copyright (c) 2015 Simon Goellner <simey.me@gmail.com>; Licensed MIT */

// PIPS

(function($) {

    "use strict";

    var extensionMethods = {

        pips: function( settings ) {

            var slider = this,
                collection = "",
                pips = ( slider.options.max - slider.options.min ) / slider.options.step,
                options = {

                    first: "label",
                    // "label", "pip", false

                    last: "label",
                    // "label", "pip", false

                    rest: "pip",
                    // "label", "pip", false

                    labels: false,
                    // [array], { first: "string", rest: [array], last: "string" }, false

                    prefix: "",
                    // "", string

                    suffix: "",
                    // "", string

                    step: ( pips > 100 ) ? Math.floor( pips * 0.05 ) : 1,
                    // number

                    formatLabel: function(value) {
                        return this.prefix + value + this.suffix;
                    }
                    // function
                    // must return a value to display in the pip labels

                };

            $.extend( options, settings );

            slider.options.pipStep = options.step;

            // get rid of all pips that might already exist.
            slider.element
                .addClass("ui-slider-pips")
                .find(".ui-slider-pip")
                .remove();

            // small object with functions for marking pips as selected.

            var selectPip = {

                single: function(value) {

                    var $pips = this.resetClasses();

                    $pips
                        .filter(".ui-slider-pip-" + value )
                        .addClass("ui-slider-pip-selected");

                },

                range: function(values) {

                    var $pips = this.resetClasses();

                    $pips
                        .filter(".ui-slider-pip-" + values[0] )
                        .addClass("ui-slider-pip-selected-first");

                    $pips
                        .filter(".ui-slider-pip-" + values[1] )
                        .addClass("ui-slider-pip-selected-second");


                },

                resetClasses: function() {

                    var $pips = 
                        slider.element
                            .find(".ui-slider-pip")
                            .removeClass("ui-slider-pip-selected ui-slider-pip-selected-first ui-slider-pip-selected-second");
                    
                    return $pips;

                }

            };

            // when we click on a label, we want to make sure the
            // slider's handle actually goes to that label!
            // - without this code the label is just treated like a part
            // - of the slider and there's no accuracy in the selected value
            function labelClick( label ) {

                if (slider.option("disabled")) {
                    return;
                }

                var val = $(label).data("value"),
                    $thisSlider = slider.element;

                if ( slider.options.values ) {

                    var sliderVals = $thisSlider.slider("values");
                    var finalVals;

                    // If the handles are together when we click a label...
                    if (sliderVals[0] === sliderVals[1]) {

                        // ...and the label we clicked on is less,
                        // then move first handle to the label...
                        if (val < sliderVals[0]) {

                            finalVals = [ val , sliderVals[1] ];

                        // ...otherwise move the second handle to the label
                        } else {

                           finalVals = [ sliderVals[0] , val ];

                        }

                    // if both handles are equidistant from the label we clicked on then
                    // we bring them together at the label...
                    } else if (Math.abs(sliderVals[0] - val) === Math.abs(sliderVals[1] - val)) {

                        finalVals = [ val , val ];

                    // ...or if the second handle is closest to our label, bring second
                    // handle to the label...
                    } else if ( Math.abs( sliderVals[0] - val ) < Math.abs( sliderVals[1] - val ) ) {

                       finalVals = [ val , sliderVals[1] ];

                    // ...or if the first handle is closest to our label, bring that handle.
                    } else {

                         finalVals = [ sliderVals[0], val ];

                    }

                    $thisSlider.slider("values", finalVals);
                    selectPip.range( finalVals );

                } else {

                    $thisSlider.slider("value", val );
                    selectPip.single( val );

                }

            }

            function createPip( which ) {

                var label,
                    percent,
                    number = which,
                    classes = "ui-slider-pip",
                    css = "";

                if ( "first" === which ) { number = 0; }
                else if ( "last" === which ) { number = pips; }

                // labelValue is the actual value of the pip based on the min/step
                var labelValue = slider.options.min + ( slider.options.step * number );

                // classLabel replaces any decimals with hyphens
                var classLabel = labelValue.toString().replace(".","-");

                // We need to set the human-readable label to either the
                // corresponding element in the array, or the appropriate
                // item in the object... or an empty string.

                if( $.type(options.labels) === "array" ) {
                    label = options.labels[number] || "";
                }

                else if( $.type( options.labels ) === "object" ) {

                    // set first label
                    if( "first" === which ) {
                        label = options.labels.first || "";
                    }

                    // set last label
                    else if( "last" === which ) {
                        label = options.labels.last || "";
                    }

                    // set other labels, but our index should start at -1
                    // because of the first pip.
                    else if( $.type( options.labels.rest ) === "array" ) {
                        label = options.labels.rest[ number - 1 ] || "";
                    } 

                    // urrggh, the options must be f**ked, just show nothing.
                    else {
                        label = labelValue;
                    }
                }

                else {

                    label = labelValue;

                }



                // First Pip on the Slider
                if ( "first" === which ) {

                    percent = "0%";

                    classes += " ui-slider-pip-first";
                    classes += ( "label" === options.first ) ? " ui-slider-pip-label" : "";
                    classes += ( false === options.first ) ? " ui-slider-pip-hide" : "";

                // Last Pip on the Slider
                } else if ( "last" === which ) {

                    percent = "100%";

                    classes += " ui-slider-pip-last";
                    classes += ( "label" === options.last ) ? " ui-slider-pip-label" : "";
                    classes += ( false === options.last ) ? " ui-slider-pip-hide" : "";

                // All other Pips
                } else {

                    percent = ((100/pips) * which).toFixed(4) + "%";

                    classes += ( "label" === options.rest ) ? " ui-slider-pip-label" : "";
                    classes += ( false === options.rest ) ? " ui-slider-pip-hide" : "";

                }

                classes += " ui-slider-pip-" + classLabel;


                // add classes for the initial-selected values.
                if ( slider.options.values && slider.options.values.length ) {
                    if ( labelValue === slider.options.values[0] ) {
                        classes += " ui-slider-pip-selected-initial-first";
                    }
                    if ( labelValue === slider.options.values[1] ) {
                        classes += " ui-slider-pip-selected-initial-second";
                    }
                } else {
                    if ( labelValue === slider.options.value ) {
                        classes += " ui-slider-pip-selected-initial";
                    }
                }



                css = ( slider.options.orientation === "horizontal" ) ?
                    "left: "+ percent :
                    "bottom: "+ percent;


                // add this current pip to the collection
                return  "<span class=\""+classes+"\" style=\""+css+"\">"+
                            "<span class=\"ui-slider-line\"></span>"+
                            "<span class=\"ui-slider-label\" data-value=\""+labelValue+"\">"+ options.formatLabel(label) +"</span>"+
                        "</span>";

            }

            // we don't want the step ever to be a floating point.
            slider.options.pipStep = Math.round( slider.options.pipStep );

            // create our first pip
            collection += createPip("first");

            // for every stop in the slider; we create a pip.
            for( var i = 1; i < pips; i++ ) {
                if( 0 === i % slider.options.pipStep ) {
                    collection += createPip( i );
                }
            }

            // create our last pip
            collection += createPip("last");

            // append the collection of pips.
            slider.element.append( collection );

            slider.element.on( "mouseup", ".ui-slider-label", function() {
                labelClick( this );
            });

            slider.element.on( "slide.selectPip slidechange.selectPip", function(e,ui) {

                var value, values,
                    $slider = $(this);

                if ( !ui ) {

                    value = $slider.slider("value");
                    values = $slider.slider("values");

                    if ( values.length ) {
                        selectPip.range( values );
                    } else {
                        selectPip.single( value );
                    }

                } else {

                    if ( ui.values ) {
                        selectPip.range( ui.values );
                    } else if ( ui.value ) {
                        selectPip.single( ui.value );
                    }

                }

            });

        }

    };

    $.extend(true, $.ui.slider.prototype, extensionMethods);

})(jQuery);










// FLOATS

(function($) {

    "use strict";

    var extensionMethods = {

        float: function( settings ) {

            var slider = this,
                $tip,
                vals = [];

            var options = {

                handle: true,
                // false

                pips: false,
                // true

                labels: false,
                // array

                prefix: "",
                // "", string

                suffix: "",
                // "", string

                event: "slidechange slide",
                // "slidechange", "slide", "slidechange slide"

                formatLabel: function(value) {
                    return this.prefix + value + this.suffix;
                }
                // function
                // must return a value to display in the floats

            };

            $.extend( options, settings );

            if ( slider.options.value < slider.options.min ) { slider.options.value = slider.options.min; }
            if ( slider.options.value > slider.options.max ) { slider.options.value = slider.options.max; }

            if ( slider.options.values ) {
                if ( slider.options.values[0] < slider.options.min ) { slider.options.values[0] = slider.options.min; }
                if ( slider.options.values[1] < slider.options.min ) { slider.options.values[1] = slider.options.min; }
                if ( slider.options.values[0] > slider.options.max ) { slider.options.values[0] = slider.options.max; }
                if ( slider.options.values[1] > slider.options.max ) { slider.options.values[1] = slider.options.max; }
            }

            // add a class for the CSS
            slider.element
                .addClass("ui-slider-float")
                .find(".ui-slider-tip, .ui-slider-tip-label")
                .remove();

            function getPipLabels( val, val2 ) {

                // when checking the array we need to divide
                // by the step option, so we store those values here.

                var vals = [],
                    stepVal = Math.ceil(( val - slider.options.min ) / slider.options.step),
                    stepVal2 = Math.ceil(( val2 - slider.options.min ) / slider.options.step);

                // now we just get the values we need to return

                if( $.type( options.labels ) === "array" ) {

                    vals[0] = options.labels[ stepVal ] || val;

                    if( val2 ) {
                        vals[1] = options.labels[ stepVal2 ] || val2;
                    }

                }

                else if( $.type( options.labels ) === "object" ) {

                    // first handle

                    if( slider.options.min === val ) {
                        vals[0] = options.labels.first || slider.options.min;
                    }

                    else if( slider.options.max === val ) {
                        vals[0] = options.labels.last || slider.options.max;
                    }

                    else if( $.type( options.labels.rest ) === "array" ) {
                        vals[0] = options.labels.rest[ stepVal - 1 ] || val;
                    } 

                    else {
                        vals[0] = val;
                    }



                    if( val2 ) {

                        // second handle

                        if( slider.options.min === val2 ) {
                            vals[1] = options.labels.first || slider.options.min;
                        }

                        else if( slider.options.max === val2 ) {
                            vals[1] = options.labels.last || slider.options.max;
                        }

                        else if( $.type( options.labels.rest ) === "array" ) {
                            vals[1] = options.labels.rest[ stepVal2 - 1] || val2;
                        } 

                        else {
                            vals[1] = val2;
                        }

                    }

                }

                else {

                    vals[0] = val;

                    if( val2 ) {
                        vals[1] = val2;
                    }

                }

                return vals;

            }

            // apply handle tip if settings allows.
            if ( options.handle ) {

                // if this is a range slider
                if ( slider.options.values ) {

                    // We need to set the human-readable label to either the
                    // corresponding element in the array, or the appropriate
                    // item in the object... or an empty string.

                    vals = getPipLabels( slider.options.values[0] , slider.options.values[1] );

                    $tip = [
                        $("<span class=\"ui-slider-tip\">"+ options.formatLabel(vals[0]) +"</span>"),
                        $("<span class=\"ui-slider-tip\">"+ options.formatLabel(vals[1]) +"</span>")
                    ];

                // else if its just a normal slider
                } else {
                   
                    vals = getPipLabels( slider.options.value );

                    // create a tip element
                    $tip = $("<span class=\"ui-slider-tip\">"+ options.formatLabel(vals[0]) +"</span>");

                }


                // now we append it to all the handles
                slider.element.find(".ui-slider-handle").each( function(k,v) {
                    $(v).append($tip[k]);
                });

            }

            if ( options.pips ) {

                // if this slider also has pip-labels, we"ll make those into tips, too.
                slider.element.find(".ui-slider-label").each(function(k,v) {

                    var $this = $(v),
                        val = $this.data("value"),
                        label = $this.data("value"),
                        $tip;


                    label = getPipLabels( val )[0];

                    // create a tip element
                    $tip =
                        $("<span class=\"ui-slider-tip-label\">" + options.formatLabel( label ) + "</span>")
                            .insertAfter( $this );

                });

            }

            // check that the event option is actually valid against our
            // own list of the slider's events.
            if ( options.event !== "slide" &&
                options.event !== "slidechange" &&
                options.event !== "slide slidechange" &&
                options.event !== "slidechange slide" ) {

                options.event = "slidechange slide";

            }

            // when slider changes, update handle tip label.
            slider.element.on( options.event , function( e, ui ) {

                var val = getPipLabels( ui.value );
                $(ui.handle).find(".ui-slider-tip").html( options.formatLabel( val[0] ) );

            });

        }

    };

    $.extend(true, $.ui.slider.prototype, extensionMethods);

})(jQuery);
