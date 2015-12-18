/*! jQuery-ui-Slider-Pips - v1.5.3 - 2014-05-03
* Copyright (c) 2014 ; Licensed  */
    
    // PIPS

    (function($) {
        
        var extensionMethods = {
            
            pips: function( settings ) {
                
                var slider = this,
                    $pip,
                    pips = ( slider.options.max - slider.options.min ) / slider.options.step;

                var options = {
                    
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

                    step: ( pips > 100 ) ? Math.floor( pips * 0.1 ) : 1,
                    // number

                    formatLabel: function(value) {
                        return this.prefix + value + this.suffix;
                    }
                    // function
                    // must return a value to display in the pip labels
                    
                };
                
                $.extend( options, settings );

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
                        $thisSlider = $(slider.element);

                    if( slider.options.range ) {

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

                        }

                    } else {

                        $thisSlider.slider("value", val );

                    }

                }

                var $collection = $();
                 
                // for every stop in the slider; we create a pip.
                for( var i=0; i<=pips; i++ ) {

                    if( 0 === i || pips === i || (i * slider.options.step) % options.step === 0 ) {

                        // create the label name, it's either the item in the array, or a number.
                        var label,
                            labelValue = slider.options.min + ( slider.options.step * i );

                        if(options.labels) {
                            label = options.labels[i];
                        } else {
                            label = labelValue;
                        }

                        if( typeof(label) === "undefined" ) { 
                            label = ""; 
                        }
                        
                        // hold a span element for the pip
                        var pipHtml = 
                            "<span class=\"ui-slider-pip ui-slider-pip-"+labelValue+"\">"+
                                "<span class=\"ui-slider-line\"></span>"+
                                "<span class=\"ui-slider-label\">"+ options.formatLabel(label) +"</span>"+
                            "</span>";
                        
                        $pip = $(pipHtml).data("value", labelValue );

                        // first pip
                        if( 0 === i ) {

                            $pip.addClass("ui-slider-pip-first");
                            if( "label" === options.first ) { $pip.addClass("ui-slider-pip-label"); }
                            if( false === options.first ) { $pip.addClass("ui-slider-pip-hide"); }
                        
                        // last pip
                        } else if ( pips === i ) {

                            $pip.addClass("ui-slider-pip-last");
                            if( "label" === options.last ) { $pip.addClass("ui-slider-pip-label"); }
                            if( false === options.last ) { $pip.addClass("ui-slider-pip-hide"); }
                        
                        // all other pips
                        } else {

                            if( "label" === options.rest ) { $pip.addClass("ui-slider-pip-label"); }
                            if( false === options.rest ) { $pip.addClass("ui-slider-pip-hide"); }
                        
                        }
                        
                        // if it's a horizontal slider we'll set the left offset,
                        // and the top if it's vertical.
                        if( slider.options.orientation === "horizontal" ) {
                            
                            $pip.css({ left: "" + (100/pips)*i + "%"  });
                        
                        } else {
                            
                            $pip.css({ bottom: "" + (100/pips)*i + "%"  });
                        
                        }

                        // add this current pip to the collection
                        $collection = $collection.add( $pip );

                    }
                
                }

                // add events for clicking labels.. basically we dont
                // want the slider to move unless we click on a pip
                $collection
                    .on("mousedown", function(e) {
                        e.stopPropagation();
                        labelClick( this );
                    });

                // append the collection of pips.
                slider.element.append( $collection );
                
            }
            
            
        };
    
        $.extend(true, $["ui"]["slider"].prototype, extensionMethods);
    
    })(jQuery);
    
    








    // FLOATS
        
    (function($) {

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

                if( slider.options.value < slider.options.min ) { slider.options.value = slider.options.min; }
                if( slider.options.value > slider.options.max ) { slider.options.value = slider.options.max; }

                if( slider.options.values ) {
                    if( slider.options.values[0] < slider.options.min ) { slider.options.values[0] = slider.options.min; }
                    if( slider.options.values[1] < slider.options.min ) { slider.options.values[1] = slider.options.min; }
                    if( slider.options.values[0] > slider.options.max ) { slider.options.values[0] = slider.options.max; }
                    if( slider.options.values[1] > slider.options.max ) { slider.options.values[1] = slider.options.max; }
                }

                // add a class for the CSS
                slider.element
                    .addClass("ui-slider-float")
                    .find(".ui-slider-tip, .ui-slider-tip-label")
                    .remove();
        
                // apply handle tip if settings allows.
                if( options.handle ) {
                    
                    // if this is a range slider
                    if( slider.options.values ) {
                        
                        if( options.labels ) {

                            vals[0] = options.labels[ slider.options.values[0] - slider.options.min ];
                            vals[1] = options.labels[ slider.options.values[1] - slider.options.min ];

                            if( typeof(vals[0]) === "undefined" ) {
                                vals[0] = slider.options.values[0];
                            }

                            if( typeof(vals[1]) === "undefined" ) {
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


                        if( options.labels ) {

                            val = options.labels[ slider.options.value - slider.options.min ];

                            if( typeof(val) === "undefined" ) {
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
                    
                    
                if( options.pips ) {
                        
                    // if this slider also has pip-labels, we"ll make those into tips, too; by cloning and changing class.
                    slider.element.find(".ui-slider-label").each(function(k,v) {
                        var $e = $(v).clone().removeClass("ui-slider-label").addClass("ui-slider-tip-label");
                        $e.insertAfter($(v));
                    });
                    
                }


                if( options.event !== "slide" && 
                    options.event !== "slidechange" && 
                    options.event !== "slide slidechange" && 
                    options.event !== "slidechange slide" ) {

                    options.event = "slidechange slide";
                
                }
                
                // when slider changes, update handle tip label.
                slider.element.on( options.event , function( e, ui ) {

                    var val;
                    if( options.labels ) {

                        val = options.labels[ui.value-slider.options.min];

                        if( typeof(val) === "undefined" ) {
                            val = ui.value;
                        }

                    } else {

                        val = ui.value;

                    }
                    
                    $(ui.handle).find(".ui-slider-tip").html( options.formatLabel(val) );

                });
            

            }


        };

        $.extend(true, $["ui"]["slider"].prototype, extensionMethods);


    })(jQuery);
