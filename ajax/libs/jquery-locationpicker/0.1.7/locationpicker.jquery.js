(function ( $ ) {

    /**
     * Holds google map object and related utility entities.
     * @constructor
     */
    function GMapContext(domElement, options) {
        var _map = new google.maps.Map(domElement, options);
        var _marker = new google.maps.Marker({
            position: new google.maps.LatLng(54.19335, -3.92695),
            map: _map,
            title: "Drag Me",
            draggable: true
        });
        return {
            map: _map,
            marker: _marker,
            circle: null,
            location: _marker.position,
            radius: options.radius,
            locationName: options.locationName,
            settings: options.settings,
            domContainer: domElement,
            geodecoder: new google.maps.Geocoder()
        }
    }

    // Utility functions for Google Map Manipulations
    var GmUtility = {
        /**
         * Draw a circle over the the map. Returns circle object.
         * Also writes new circle object in gmapContext.
         *
         * @param center - LatLng of the center of the circle
         * @param radius - radius in meters
         * @param gmapContext - context
         * @param options
         */
        drawCircle: function(gmapContext, center, radius, options) {
            if (gmapContext.circle != null) {
                gmapContext.circle.setMap(null);
            }
            if (radius > 0) {
                radius *= 1;
                options = $.extend({
                    strokeColor: "#0000FF",
                    strokeOpacity: 0.35,
                    strokeWeight: 2,
                    fillColor: "#0000FF",
                    fillOpacity: 0.20
                }, options);
                options.map = gmapContext.map;
                options.radius = radius;
                options.center = center;
                gmapContext.circle = new google.maps.Circle(options);
                return gmapContext.circle;
            }
            return null;
        },
        /**
         *
         * @param gMapContext
         * @param location
         * @param callback
         */
        setPosition: function(gMapContext, location, callback) {
            gMapContext.location = location;
            gMapContext.marker.setPosition(location);
            gMapContext.map.panTo(location);
            this.drawCircle(gMapContext, location, gMapContext.radius, {});
            if (gMapContext.settings.enableReverseGeocode) {
                gMapContext.geodecoder.geocode({latLng: gMapContext.location}, function(results, status){
                    if (status == google.maps.GeocoderStatus.OK && results.length > 0){
                        gMapContext.locationName = results[0].formatted_address;
                    }
                    if (callback) {
                        callback.call(this, gMapContext);
                    }
                });
            } else {
                if (callback) {
                    callback.call(this, gmapContext);
                }
            }

        },
        locationFromLatLng: function(lnlg) {
            return {latitude: lnlg.lat(), longitude: lnlg.lng()}
        }
    }

    function isPluginApplied(domObj) {
        return getContextForElement(domObj) != undefined;
    }

    function getContextForElement(domObj) {
        return $(domObj).data("locationpicker");
    }

    function updateInputValues(inputBinding, gmapContext){
        if (!inputBinding) return;
        var currentLocation = GmUtility.locationFromLatLng(gmapContext.location);
        if (inputBinding.latitudeInput) {
            inputBinding.latitudeInput.val(currentLocation.latitude);
        }
        if (inputBinding.longitudeInput) {
            inputBinding.longitudeInput.val(currentLocation.longitude);
        }
        if (inputBinding.radiusInput) {
            inputBinding.radiusInput.val(gmapContext.radius);
        }
        if (inputBinding.locationNameInput) {
            inputBinding.locationNameInput.val(gmapContext.locationName);
        }
    } 
 
    function setupInputListenersInput(inputBinding, gmapContext) {
        if (inputBinding) {
            if (inputBinding.radiusInput){
		          inputBinding.radiusInput.on("change", function() {
		              gmapContext.radius = $(this).val();
		              GmUtility.setPosition(gmapContext, gmapContext.location, function(context){
		              	context.settings.onchanged(GmUtility.locationFromLatLng(context.location), context.radius, false);
		              });
		          });
            }
            if (inputBinding.locationNameInput && gmapContext.settings.enableAutocomplete) {
                gmapContext.autocomplete = new google.maps.places.Autocomplete(inputBinding.locationNameInput.get(0));
                google.maps.event.addListener(gmapContext.autocomplete, 'place_changed', function() {
                    var place = gmapContext.autocomplete.getPlace();
                    if (!place.geometry) {
                        gmapContext.onlocationnotfound();
                        return;
                    }
                    GmUtility.setPosition(gmapContext, place.geometry.location, function(context) {		                    
                        updateInputValues(inputBinding, context);
                        context.settings.onchanged(GmUtility.locationFromLatLng(context.location), context.radius, false);
                    });
                });
				// Prevent form from being submitted if user hit enter.
		        inputBinding.locationNameInput.keypress(function(event){
		            if (event.keyCode === 13){ return false; }
		        });
            }
            if (inputBinding.latitudeInput) {
            	inputBinding.latitudeInput.on("change", function() {
            		GmUtility.setPosition(gmapContext, new google.maps.LatLng($(this).val(), gmapContext.location.lng()), function(context){
		              	context.settings.onchanged(GmUtility.locationFromLatLng(context.location), context.radius, false);
		            });
            	});
            }
            if (inputBinding.longitudeInput) {
            	inputBinding.longitudeInput.on("change", function() {
            		GmUtility.setPosition(gmapContext, new google.maps.LatLng(gmapContext.location.lat(), $(this).val()), function(context){
		              	context.settings.onchanged(GmUtility.locationFromLatLng(context.location), context.radius, false);
		            });
            	});
            }
        }
    }

    /**
     * Initialization:
     *  $("#myMap").locationpicker(options);
     * @param options
     * @param params
     * @returns {*}
     */
    $.fn.locationpicker = function( options, params ) {
        if (typeof options == 'string') { // Command provided
            var _targetDomElement = this.get(0);
            // Plug-in is not applied - nothing to do.
            if (!isPluginApplied(_targetDomElement)) return;
            var gmapContext = getContextForElement(_targetDomElement);
            switch (options) {
                case "location":
                    if (params == undefined) { // Getter
                        var location = GmUtility.locationFromLatLng(gmapContext.location);
                        location.radius = gmapContext.radius;
                        location.name = gmapContext.locationName;
                        return location;
                    } else { // Setter
                        if (params.radius) {
                            gmapContext.radius = params.radius;
                        }
                        GmUtility.setPosition(gmapContext, new google.maps.LatLng(params.latitude, params.longitude), function(gmapContext) {
                            updateInputValues(gmapContext.settings.inputBinding, gmapContext);
                        });
                    }
                    break;
                case "subscribe":
                    /**
                     * Provides interface for subscribing for GoogleMap events.
                     * See Google API documentation for details.
                     * Parameters:
                     * - event: string, name of the event
                     * - callback: function, callback function to be invoked
                     */
                    if (options == undefined) { // Getter is not available
                        return null;
                    } else {
                        var event = params.event;
                        var callback = params.callback;
                        if (!event || ! callback) {
                            console.error("LocationPicker: Invalid arguments for method \"subscribe\"")
                            return null;
                        }
                        google.maps.event.addListener(gmapContext.map, event, callback);
                    }

                    break;
            }
            return null;
        }
        return this.each(function() {
            var $target = $(this);
            // If plug-in hasn't been applied before - initialize, otherwise - skip
            if (isPluginApplied(this)) return;
            // Plug-in initialization is required
            // Defaults
            var settings = $.extend({}, $.fn.locationpicker.defaults, options );
            // Initialize
            var gmapContext = new GMapContext(this, {
                zoom: settings.zoom,
                center: new google.maps.LatLng(settings.location.latitude, settings.location.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                disableDoubleClickZoom: false,
                scrollwheel: settings.scrollwheel,
                streetViewControl: false,
                radius: settings.radius,
                locationName: settings.locationName,
                settings: settings
            });
            $target.data("locationpicker", gmapContext);
            // Subscribe GMap events
            google.maps.event.addListener(gmapContext.marker, "dragend", function(event) {
                GmUtility.setPosition(gmapContext, gmapContext.marker.position, function(context){
                    var currentLocation = GmUtility.locationFromLatLng(gmapContext.location);
                    context.settings.onchanged(currentLocation, context.radius, true);
                    updateInputValues(gmapContext.settings.inputBinding, gmapContext);
                });
            });
            GmUtility.setPosition(gmapContext, new google.maps.LatLng(settings.location.latitude, settings.location.longitude), function(context){
                updateInputValues(settings.inputBinding, gmapContext);
                context.settings.oninitialized($target);
            });
            // Set up input bindings if needed
            setupInputListenersInput(settings.inputBinding, gmapContext);
        });
    };
    $.fn.locationpicker.defaults = {
        location: {latitude: 40.7324319, longitude: -73.82480799999996},
        locationName: "",
        radius: 500,
        zoom: 15,
        scrollwheel: true,
        inputBinding: {
            latitudeInput: null,
            longitudeInput: null,
            radiusInput: null,
            locationNameInput: null
        },
        enableAutocomplete: false,
        enableReverseGeocode: true,
        onchanged: function(currentLocation, radius, isMarkerDropped) {},
        onlocationnotfound: function(locationName) {},
        oninitialized: function (component) {}

    }

}( jQuery ));
