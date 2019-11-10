/*! jQuery-ui-Slider-Pips - v1.4.1 - 2014-04-15
* Copyright (c) 2014 ; Licensed  */
    (function($) {
        
        var extensionMethods = {
            
            pips: function( settings ) {
                
                var options = {
                    
                    first: "label",
                    // "label", "pip", false

                    last: "label",
                    // "label", "pip", false

                    rest: "pip",
                    // "label", "pip", false

                    labels: false,
                    // [array]

                    prefix: "",
                    // "", string

                    suffix: "",
                    // "", string

                    formatLabel: function(value) {
                        return this.prefix + value + this.suffix;
                    }
                    // function
                    // must return a value to display in the pip labels
                    
                };
                
                $.extend( options, settings );

                var slider = this;
                                
                // get rid of all pips that might already exist.
                slider.element
                    .addClass("ui-slider-pips")
                    .find(".ui-slider-pip")
                    .remove();
                
                // we need the amount of pips to create.
                var pips = ( slider.options.max - slider.options.min ) / slider.options.step;
                 
                // for every stop in the slider; we create a pip.
                for( var i=0; i<=pips; i++ ) {

                    // create the label name, it's either the item in the array, or a number.
                    var label;

                    if(options.labels) {
                        label = options.labels[i];
                    } else {
                        label = slider.options.min + ( slider.options.step * i );
                    }

                    if( typeof(label) === "undefined" ) { 
                        label = ""; 
                    }
                    
                    // hold a span element for the pip
                    var pipHtml = 
                        "<span class=\"ui-slider-pip ui-slider-pip-"+i+"\">"+
                            "<span class=\"ui-slider-line\"></span>"+
                            "<span class=\"ui-slider-label\">"+ options.formatLabel(label) +"</span>"+
                        "</span>";
                    
                    var $pip = $(pipHtml);

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
                    
                    // append the span to the slider.
                    slider.element.append( $pip );
                
                }
                
            }
            
            
        };
    
        $.extend(true, $["ui"]["slider"].prototype, extensionMethods);
    
    })(jQuery);
    
    

        
    (function($) {

        var extensionMethods = {

            float: function( settings ) {

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

                    formatLabel: function(value) {
                        return this.prefix + value + this.suffix;
                    }
                    // function
                    // must return a value to display in the floats

                };

                $.extend( options, settings );
                
                var slider = this;
                var $tip;
                var vals = [];
                var val;


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


                    
                // when slider changes, update handle tip label.
                slider.element.on("slidechange slide", function( e, ui ) {

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