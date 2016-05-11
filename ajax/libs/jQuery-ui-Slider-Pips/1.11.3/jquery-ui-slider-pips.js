/*! jQuery-ui-Slider-Pips - v1.11.3 - 2016-03-15
* Copyright (c) 2016 Simon Goellner <simey.me@gmail.com>; Licensed MIT */

/*! jQuery-ui-Slider-Pips - v1.11.1 - 2015-11-30
* Copyright (c) 2015 Simon Goellner <simey.me@gmail.com>; Licensed MIT */



(function($) {

    "use strict";

    var extensionMethods = {





        // pips

        pips: function( settings ) {

            var slider = this,
                i, j, p,
                collection = "",
                mousedownHandlers,
                min = slider._valueMin(),
                max = slider._valueMax(),
                pips = ( max - min ) / slider.options.step,
                $handles = slider.element.find(".ui-slider-handle"),
                $pips;

            var options = {

                first: "label",
                /* "label", "pip", false */

                last: "label",
                /* "label", "pip", false */

                rest: "pip",
                /* "label", "pip", false */

                labels: false,
                /* [array], { first: "string", rest: [array], last: "string" }, false */

                prefix: "",
                /* "", string */

                suffix: "",
                /* "", string */

                step: ( pips > 100 ) ? Math.floor( pips * 0.05 ) : 1,
                /* number */

                formatLabel: function(value) {
                    return this.prefix + value + this.suffix;
                }
                /* function
                    must return a value to display in the pip labels */

            };

            if ( $.type( settings ) === "object" || $.type( settings ) === "undefined" ) {

                $.extend( options, settings );
                slider.element.data("pips-options", options );

            } else {

                if ( settings === "destroy" ) {

                    destroy();

                } else if ( settings === "refresh" ) {

                    slider.element.slider( "pips", slider.element.data("pips-options") );

                }

                return;

            }


            // we don't want the step ever to be a floating point or negative
            // (or 0 actually, so we'll set it to 1 in that case).
            slider.options.pipStep = Math.abs( Math.round( options.step ) ) || 1;

            // get rid of all pips that might already exist.
            slider.element
                .off( ".selectPip" )
                .addClass("ui-slider-pips")
                .find(".ui-slider-pip")
                .remove();

            // small object with functions for marking pips as selected.

            var selectPip = {

                single: function(value) {

                    this.resetClasses();

                    $pips
                        .filter(".ui-slider-pip-" + this.classLabel(value) )
                        .addClass("ui-slider-pip-selected");

                    if ( slider.options.range ) {

                        $pips.each(function(k, v) {

                            var pipVal = $(v).children(".ui-slider-label").data("value");

                            if (( slider.options.range === "min" && pipVal < value ) ||
                                ( slider.options.range === "max" && pipVal > value )) {

                                $(v).addClass("ui-slider-pip-inrange");

                            }

                        });

                    }

                },

                range: function(values) {

                    this.resetClasses();

                    for ( i = 0; i < values.length; i++ ) {

                        $pips
                            .filter(".ui-slider-pip-" + this.classLabel(values[i]) )
                            .addClass("ui-slider-pip-selected-" + ( i + 1 ) );

                    }

                    if ( slider.options.range ) {

                        $pips.each(function(k, v) {

                            var pipVal = $(v).children(".ui-slider-label").data("value");

                            if ( pipVal > values[0] && pipVal < values[1] ) {

                                $(v).addClass("ui-slider-pip-inrange");

                            }

                        });

                    }

                },

                classLabel: function(value) {

                    return value.toString().replace(".", "-");

                },

                resetClasses: function() {

                    var regex = /(^|\s*)(ui-slider-pip-selected|ui-slider-pip-inrange)(-{1,2}\d+|\s|$)/gi;

                    $pips.removeClass( function(index, css) {
                        return ( css.match(regex) || [] ).join(" ");
                    });

                }

            };

            function getClosestHandle( val ) {

                var h, k,
                    sliderVals,
                    comparedVals,
                    closestVal,
                    tempHandles = [],
                    closestHandle = 0;

                if ( slider.values() && slider.values().length ) {

                    // get the current values of the slider handles
                    sliderVals = slider.values();

                    // find the offset value from the `val` for each
                    // handle, and store it in a new array
                    comparedVals = $.map( sliderVals, function(v) {
                        return Math.abs( v - val );
                    });

                    // figure out the closest handles to the value
                    closestVal = Math.min.apply( Math, comparedVals );

                    // if a comparedVal is the closestVal, then
                    // set the value accordingly, and set the closest handle.
                    for ( h = 0; h < comparedVals.length; h++ ) {
                        if ( comparedVals[h] === closestVal ) {
                            tempHandles.push(h);
                        }
                    }

                    // set the closest handle to the first handle in array,
                    // just incase we have no _lastChangedValue to compare to.
                    closestHandle = tempHandles[0];

                    // now we want to find out if any of the closest handles were
                    // the last changed handle, if so we specify that handle to change
                    for ( k = 0; k < tempHandles.length; k++ ) {
                        if ( slider._lastChangedValue === tempHandles[k] ) {
                            closestHandle = tempHandles[k];
                        }
                    }

                    if ( slider.options.range && tempHandles.length === 2 ) {

                        if ( val > sliderVals[1] ) {

                            closestHandle = tempHandles[1];

                        } else if ( val < sliderVals[0] ) {

                            closestHandle = tempHandles[0];

                        }

                    }

                }

                return closestHandle;

            }

            function destroy() {

                slider.element
                    .off(".selectPip")
                    .on("mousedown.slider", slider.element.data("mousedown-original") )
                    .removeClass("ui-slider-pips")
                    .find(".ui-slider-pip")
                    .remove();

            }

            // when we click on a label, we want to make sure the
            // slider's handle actually goes to that label!
            // so we check all the handles and see which one is closest
            // to the label we clicked. If 2 handles are equidistant then
            // we move both of them. We also want to trigger focus on the
            // handle.

            // without this method the label is just treated like a part
            // of the slider and there's no accuracy in the selected value

            function labelClick( label, e ) {

                if (slider.option("disabled")) {
                    return;
                }

                var val = $(label).data("value"),
                    indexToChange = getClosestHandle( val );

                if ( slider.values() && slider.values().length ) {

                    slider.options.values[ indexToChange ] = slider._trimAlignValue( val );

                } else {

                    slider.options.value = slider._trimAlignValue( val );

                }

                slider._refreshValue();
                slider._change( e, indexToChange );

            }

            // method for creating a pip. We loop this for creating all
            // the pips.

            function createPip( which ) {

                var label,
                    percent,
                    number = which,
                    classes = "ui-slider-pip",
                    css = "",
                    value = slider.value(),
                    values = slider.values(),
                    labelValue,
                    classLabel,
                    labelIndex;

                if ( which === "first" ) {

                    number = 0;

                } else if ( which === "last" ) {

                    number = pips;

                }

                // labelValue is the actual value of the pip based on the min/step
                labelValue = min + ( slider.options.step * number );

                // classLabel replaces any decimals with hyphens
                classLabel = labelValue.toString().replace(".", "-");

                // get the index needed for selecting labels out of the array
                labelIndex = Math.round( ( number - min ) / options.step );

                // we need to set the human-readable label to either the
                // corresponding element in the array, or the appropriate
                // item in the object... or an empty string.

                if ( $.type(options.labels) === "array" ) {

                    label = options.labels[ labelIndex ] || "";

                } else if ( $.type( options.labels ) === "object" ) {

                    if ( which === "first" ) {

                        // set first label
                        label = options.labels.first || "";

                    } else if ( which === "last" ) {

                        // set last label
                        label = options.labels.last || "";

                    } else if ( $.type( options.labels.rest ) === "array" ) {

                        // set other labels, but our index should start at -1
                        // because of the first pip.
                        label = options.labels.rest[ labelIndex - 1 ] || "";

                    } else {

                        // urrggh, the options must be f**ked, just show nothing.
                        label = labelValue;

                    }

                } else {

                    label = labelValue;

                }




                if ( which === "first" ) {

                    // first Pip on the Slider
                    percent = "0%";

                    classes += " ui-slider-pip-first";
                    classes += ( options.first === "label" ) ? " ui-slider-pip-label" : "";
                    classes += ( options.first === false ) ? " ui-slider-pip-hide" : "";

                } else if ( which === "last" ) {

                    // last Pip on the Slider
                    percent = "100%";

                    classes += " ui-slider-pip-last";
                    classes += ( options.last === "label" ) ? " ui-slider-pip-label" : "";
                    classes += ( options.last === false ) ? " ui-slider-pip-hide" : "";

                } else {

                    // all other Pips
                    percent = (( 100 / pips ) * which ).toFixed(4) + "%";

                    classes += ( options.rest === "label" ) ? " ui-slider-pip-label" : "";
                    classes += ( options.rest === false ) ? " ui-slider-pip-hide" : "";

                }

                classes += " ui-slider-pip-" + classLabel;


                // add classes for the initial-selected values.
                if ( values && values.length ) {

                    for ( i = 0; i < values.length; i++ ) {

                        if ( labelValue === values[i] ) {

                            classes += " ui-slider-pip-initial-" + ( i + 1 );
                            classes += " ui-slider-pip-selected-" + ( i + 1 );

                        }

                    }

                    if ( slider.options.range ) {

                        if ( labelValue > values[0] && 
                            labelValue < values[1] ) {

                            classes += " ui-slider-pip-inrange";

                        }

                    }

                } else {

                    if ( labelValue === value ) {

                        classes += " ui-slider-pip-initial";
                        classes += " ui-slider-pip-selected";

                    }

                    if ( slider.options.range ) {

                        if (( slider.options.range === "min" && labelValue < value ) ||
                            ( slider.options.range === "max" && labelValue > value )) {

                            classes += " ui-slider-pip-inrange";

                        }

                    }

                }



                css = ( slider.options.orientation === "horizontal" ) ?
                    "left: " + percent :
                    "bottom: " + percent;


                // add this current pip to the collection
                return "<span class=\"" + classes + "\" style=\"" + css + "\">" +
                            "<span class=\"ui-slider-line\"></span>" +
                            "<span class=\"ui-slider-label\" data-value=\"" +
                                labelValue + "\">" + options.formatLabel(label) + "</span>" +
                        "</span>";

            }

            // create our first pip
            collection += createPip("first");

            // for every stop in the slider where we need a pip; create one.
            for ( p = slider.options.pipStep; p < pips; p += slider.options.pipStep ) {
                collection += createPip( p );
            }

            // create our last pip
            collection += createPip("last");

            // append the collection of pips.
            slider.element.append( collection );

            // store the pips for setting classes later.
            $pips = slider.element.find(".ui-slider-pip");



            // store the mousedown handlers for later, just in case we reset
            // the slider, the handler would be lost!

            if ( $._data( slider.element.get(0), "events").mousedown &&
                $._data( slider.element.get(0), "events").mousedown.length ) {

                mousedownHandlers = $._data( slider.element.get(0), "events").mousedown;

            } else {

                mousedownHandlers = slider.element.data("mousedown-handlers");

            }

            slider.element.data("mousedown-handlers", mousedownHandlers.slice() );

            // loop through all the mousedown handlers on the slider,
            // and store the original namespaced (.slider) event handler so
            // we can trigger it later.
            for ( j = 0; j < mousedownHandlers.length; j++ ) {
                if ( mousedownHandlers[j].namespace === "slider" ) {
                    slider.element.data("mousedown-original", mousedownHandlers[j].handler );
                }
            }

            // unbind the mousedown.slider event, because it interferes with
            // the labelClick() method (stops smooth animation), and decide
            // if we want to trigger the original event based on which element
            // was clicked.
            slider.element
                .off("mousedown.slider")
                .on("mousedown.selectPip", function(e) {

                    var $target = $(e.target),
                        closest = getClosestHandle( $target.data("value") ),
                        $handle = $handles.eq( closest );

                    $handle.addClass("ui-state-active");

                    if ( $target.is(".ui-slider-label") ) {

                        labelClick( $target, e );

                        slider.element
                            .one("mouseup.selectPip", function() {

                                $handle
                                    .removeClass("ui-state-active")
                                    .focus();

                            });

                    } else {

                        var originalMousedown = slider.element.data("mousedown-original");
                        originalMousedown(e);

                    }

                });




            slider.element.on( "slide.selectPip slidechange.selectPip", function(e, ui) {

                var $slider = $(this),
                    value = $slider.slider("value"),
                    values = $slider.slider("values");

                if ( ui ) {

                    value = ui.value;
                    values = ui.values;

                }

                if ( slider.values() && slider.values().length ) {

                    selectPip.range( values );

                } else {

                    selectPip.single( value );

                }

            });




        },








        // floats

        float: function( settings ) {

            var i,
                slider = this,
                min = slider._valueMin(),
                max = slider._valueMax(),
                value = slider._value(),
                values = slider._values(),
                tipValues = [],
                $handles = slider.element.find(".ui-slider-handle");

            var options = {

                handle: true,
                /* false */

                pips: false,
                /* true */

                labels: false,
                /* [array], { first: "string", rest: [array], last: "string" }, false */

                prefix: "",
                /* "", string */

                suffix: "",
                /* "", string */

                event: "slidechange slide",
                /* "slidechange", "slide", "slidechange slide" */

                formatLabel: function(value) {
                    return this.prefix + value + this.suffix;
                }
                /* function
                    must return a value to display in the floats */

            };

            if ( $.type( settings ) === "object" || $.type( settings ) === "undefined" ) {

                $.extend( options, settings );
                slider.element.data("float-options", options );

            } else {

                if ( settings === "destroy" ) {

                    destroy();

                } else if ( settings === "refresh" ) {

                    slider.element.slider( "float", slider.element.data("float-options") );

                }

                return;

            }




            if ( value < min ) {
                value = min;
            }

            if ( value > max ) {
                value = max;
            }

            if ( values && values.length ) {

                for ( i = 0; i < values.length; i++ ) {

                    if ( values[i] < min ) {
                        values[i] = min;
                    }

                    if ( values[i] > max ) {
                        values[i] = max;
                    }

                }

            }

            // add a class for the CSS
            slider.element
                .addClass("ui-slider-float")
                .find(".ui-slider-tip, .ui-slider-tip-label")
                .remove();



            function destroy() {

                slider.element
                    .off(".sliderFloat")
                    .removeClass("ui-slider-float")
                    .find(".ui-slider-tip, .ui-slider-tip-label")
                    .remove();

            }


            function getPipLabels( values ) {

                // when checking the array we need to divide
                // by the step option, so we store those values here.

                var vals = [],
                    steppedVals = $.map( values, function(v) {
                        return Math.ceil(( v - min ) / slider.options.step);
                    });

                // now we just get the values we need to return
                // by looping through the values array and assigning the
                // label if it exists.

                if ( $.type( options.labels ) === "array" ) {

                    for ( i = 0; i < values.length; i++ ) {

                        vals[i] = options.labels[ steppedVals[i] ] || values[i];

                    }

                } else if ( $.type( options.labels ) === "object" ) {

                    for ( i = 0; i < values.length; i++ ) {

                        if ( values[i] === min ) {

                            vals[i] = options.labels.first || min;

                        } else if ( values[i] === max ) {

                            vals[i] = options.labels.last || max;

                        } else if ( $.type( options.labels.rest ) === "array" ) {

                            vals[i] = options.labels.rest[ steppedVals[i] - 1 ] || values[i];

                        } else {

                            vals[i] = values[i];

                        }

                    }

                } else {

                    for ( i = 0; i < values.length; i++ ) {

                        vals[i] = values[i];

                    }

                }

                return vals;

            }

            // apply handle tip if settings allows.
            if ( options.handle ) {

                // we need to set the human-readable label to either the
                // corresponding element in the array, or the appropriate
                // item in the object... or an empty string.

                tipValues = ( slider.values() && slider.values().length ) ?
                    getPipLabels( values ) :
                    getPipLabels( [ value ] );

                for ( i = 0; i < tipValues.length; i++ ) {

                    $handles
                        .eq( i )
                        .append( $("<span class=\"ui-slider-tip\">"+ options.formatLabel(tipValues[i]) +"</span>") );

                }

            }

            if ( options.pips ) {

                // if this slider also has pip-labels, we make those into tips, too.
                slider.element.find(".ui-slider-label").each(function(k, v) {

                    var $this = $(v),
                        val = [ $this.data("value") ],
                        label,
                        $tip;


                    label = options.formatLabel( getPipLabels( val )[0] );

                    // create a tip element
                    $tip =
                        $("<span class=\"ui-slider-tip-label\">" + label + "</span>")
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
            slider.element
                .off(".sliderFloat")
                .on( options.event + ".sliderFloat", function( e, ui ) {

                    var uiValue = ( $.type( ui.value ) === "array" ) ? ui.value : [ ui.value ],
                        val = options.formatLabel( getPipLabels( uiValue )[0] );

                    $(ui.handle)
                        .find(".ui-slider-tip")
                        .html( val );

                });

        }

    };

    $.extend(true, $.ui.slider.prototype, extensionMethods);

})(jQuery);
