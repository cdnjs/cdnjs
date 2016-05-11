/*! jQuery-ui-Slider-Pips - v1.5.7 - 2014-08-03
* Copyright (c) 2014 Simon Goellner <simey.me@gmail.com>; Licensed  */

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
                    // [array], false

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

            // when we click on a label, we want to make sure the
            // slider's handle actually goes to that label!
            // - without this code the label is just treated like a part
            // - of the slider and there's no accuracy in the selected value
            function labelClick( label ) {

                var val = $(label).data("value"),
                    $thisSlider = $(slider.element),
                    handleWhichMoved = 0;

                if ( true === slider.options.range ) {

                    var sliderVals = $thisSlider.slider("values");

                    // If the handles are together when we click a label...
                    if (sliderVals[0] === sliderVals[1]) {

                        // ...and the label we clicked on is less,
                        // then move first handle to the label...
                        if (val < sliderVals[0]) {

                            $thisSlider.slider("values", [ val , sliderVals[1] ]);

                        // ...otherwise move the second handle to the label
                        } else {

                            $thisSlider.slider("values", [ sliderVals[0] , val ]);
                            handleWhichMoved = 1;

                        }

                    // if both handles are equidistant from the label we clicked on then
                    // we bring them together at the label...
                    } else if (Math.abs(sliderVals[0] - val) === Math.abs(sliderVals[1] - val)) {

                        $thisSlider.slider("values", [ val , val ] );

                    // ...or if the second handle is closest to our label, bring second
                    // handle to the label...
                    } else if ( Math.abs( sliderVals[0] - val ) < Math.abs( sliderVals[1] - val ) ) {

                        $thisSlider.slider("values", [ val , sliderVals[1] ] );

                    // ...or if the first handle is closest to our label, bring that handle.
                    } else {

                         $thisSlider.slider("values", [ sliderVals[0], val ] );
                         handleWhichMoved = 1;

                    }

                } else {

                    $thisSlider.slider("value", val );

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

                // the actual visible label should be based on teh array if possible
                label = ( options.labels ) ? options.labels[number] : labelValue;
                if ( "undefined" === typeof(label) ) { label = ""; }

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

                classes += " ui-slider-pip-"+classLabel;

                css = ( slider.options.orientation === "horizontal" ) ?
                    "left: "+ percent :
                    "bottom: "+ percent;


                // add this current pip to the collection
                collection +=
                    "<span class=\""+classes+"\" style=\""+css+"\">"+
                        "<span class=\"ui-slider-line\"></span>"+
                        "<span class=\"ui-slider-label\" data-value=\""+labelValue+"\">"+ options.formatLabel(label) +"</span>"+
                    "</span>";

            }





            // we don't want the step ever to be a decimal.
            slider.options.pipStep = Math.round( slider.options.pipStep );

            // create our first pip
            createPip("first");

            // for every stop in the slider; we create a pip.
            for( var i = 1; i < pips; i++ ) {
                if( 0 === i % slider.options.pipStep ) {
                    createPip( i );
                }
            }

            // create our last pip
            createPip("last");





            // append the collection of pips.
            slider.element.append( collection );

            slider.element.on( "mouseup", ".ui-slider-label", function() {

                labelClick( this );

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
                vals = [],
                val;

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

            // apply handle tip if settings allows.
            if ( options.handle ) {

                // if this is a range slider
                if ( slider.options.values ) {

                    if ( options.labels ) {

                        vals[0] = options.labels[ slider.options.values[0] - slider.options.min ];
                        vals[1] = options.labels[ slider.options.values[1] - slider.options.min ];

                        if ( typeof(vals[0]) === "undefined" ) {
                            vals[0] = slider.options.values[0];
                        }

                        if ( typeof(vals[1]) === "undefined" ) {
                            vals[1] = slider.options.values[1];
                        }

                    } else {

                        vals[0] = slider.options.values[0];
                        vals[1] = slider.options.values[1];

                    }

                    $tip = [
                        $("<span class=\"ui-slider-tip\">"+ options.formatLabel(vals[0]) +"</span>"),
                        $("<span class=\"ui-slider-tip\">"+ options.formatLabel(vals[1]) +"</span>")
                    ];

                // else if its just a normal slider
                } else {


                    if ( options.labels ) {

                        val = options.labels[ slider.options.value - slider.options.min ];

                        if ( typeof(val) === "undefined" ) {
                            val = slider.options.value;
                        }

                    } else {

                        val = slider.options.value;

                    }


                    // create a tip element
                    $tip = $("<span class=\"ui-slider-tip\">"+ options.formatLabel(val) +"</span>");

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


                    if( typeof options.labels[ val ] !== "undefined" ) {

                        label = options.labels[ val ];

                    }

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

                var val;
                if ( options.labels ) {

                    val = options.labels[ui.value-slider.options.min];

                    if ( typeof(val) === "undefined" ) {
                        val = ui.value;
                    }

                } else {

                    val = ui.value;

                }

                $(ui.handle).find(".ui-slider-tip").html( options.formatLabel(val) );

            });


        }


    };

    $.extend(true, $.ui.slider.prototype, extensionMethods);


})(jQuery);
