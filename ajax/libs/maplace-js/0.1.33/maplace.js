;(function ($, window, google, undefined) {
    'use strict';

    /**
    * Maplace.js 0.1.33
    *
    * Copyright (c) 2013 Daniele Moraschi
    * Licensed under the MIT license
    * For all details and documentation:
    * http://maplacejs.com
    *
    * @version  0.1.33
    */


    var html_dropdown,
        html_ullist,
        Maplace;


    //dropdown menu type
    html_dropdown = {
        activateCurrent: function (index) {
            this.html_element.find('select').val(index);
        },

        getHtml: function () {
            var self = this,
                html = '',
                title,
                a;

            if (this.ln > 1) {
                html += '<select class="dropdown controls ' + this.o.controls_cssclass + '">';

                if (this.ShowOnMenu(this.view_all_key)) {
                    html += '<option value="' + this.view_all_key + '">' + this.o.view_all_text + '</option>';
                }

                for (a = 0; a < this.ln; a += 1) {
                    if (this.ShowOnMenu(a)) {
                        html += '<option value="' + (a + 1) + '">' + (this.o.locations[a].title || ('#' + (a + 1))) + '</option>';
                    }
                }
                html += '</select>';

                html = $(html).bind('change', function () {
                    self.ViewOnMap(this.value);
                });
            }

            title = this.o.controls_title;
            if (this.o.controls_title) {
                title = $('<div class="controls_title"></div>').css(this.o.controls_applycss ? {
                    fontWeight: 'bold',
                    fontSize: this.o.controls_on_map ? '12px' : 'inherit',
                    padding: '3px 10px 5px 0'
                } : {}).append(this.o.controls_title);
            }

            this.html_element = $('<div class="wrap_controls"></div>').append(title).append(html);

            return this.html_element;
        }
    };


    //ul list menu type
    html_ullist = {
        html_a: function (i, hash, ttl) {
            var self = this,
                index = hash || (i + 1),
                title = ttl || this.o.locations[i].title,
                el_a = $('<a data-load="' + index + '" id="ullist_a_' + index + '" href="#' + index + '" title="' + title + '"><span>' + (title || ('#' + (i + 1))) + '</span></a>');
            
            el_a.css(this.o.controls_applycss ? {
                color: '#666',
                display: 'block',
                padding: '5px',
                fontSize: this.o.controls_on_map ? '12px' : 'inherit',
                textDecoration: 'none'
            } : {});

            el_a.on('click', function (e) {
                e.preventDefault();
                var i = $(this).attr('data-load');
                self.ViewOnMap(i);
            });

            return el_a;
        },

        activateCurrent: function (index) {
            this.html_element.find('li').removeClass('active');
            this.html_element.find('#ullist_a_' + index).parent().addClass('active');
        },

        getHtml: function () {
            var html = $("<ul class='ullist controls " + this.o.controls_cssclass + "'></ul>").css(this.o.controls_applycss ? {
                margin: 0,
                padding: 0,
                listStyleType: 'none'
            } : {}),
                title, a;

            if (this.ShowOnMenu(this.view_all_key)) {
                html.append($('<li></li>').append(html_ullist.html_a.call(this, false, this.view_all_key, this.o.view_all_text)));
            }

            for (a = 0; a < this.ln; a++) {
                if (this.ShowOnMenu(a)) {
                    html.append($('<li></li>').append(html_ullist.html_a.call(this, a)));
                }
            }

            title = this.o.controls_title;
            if (this.o.controls_title) {
                title = $('<div class="controls_title"></div>').css(this.o.controls_applycss ? {
                    fontWeight: 'bold',
                    padding: '3px 10px 5px 0',
                    fontSize: this.o.controls_on_map ? '12px' : 'inherit'
                } : {}).append(this.o.controls_title);
            }

            this.html_element = $('<div class="wrap_controls"></div>').append(title).append(html);

            return this.html_element;
        }
    };


    Maplace = (function () {

        /**
        * Create a new instance
        * @class Maplace
        * @constructor  
        */
        function Maplace(args) {
            this.VERSION = '0.1.33';
            this.loaded = false;
            this.markers = [];
            this.circles = [];
            this.oMap = false;
            this.view_all_key = 'all';

            this.infowindow = null;
            this.maxZIndex = 0;
            this.ln = 0;
            this.oMap = false;
            this.oBounds = null;
            this.map_div = null;
            this.canvas_map = null;
            this.controls_wrapper = null;
            this.current_control = null;
            this.current_index = null;
            this.Polyline = null;
            this.Polygon = null;
            this.Fusion = null;
            this.directionsService = null;
            this.directionsDisplay = null;

            //default options
            this.o = {
                debug: false,
                map_div: '#gmap',
                controls_div: '#controls',
                generate_controls: true,
                controls_type: 'dropdown',
                controls_cssclass: '',
                controls_title: '',
                controls_on_map: true,
                controls_applycss: true,
                controls_position: google.maps.ControlPosition.RIGHT_TOP,
                type: 'marker',
                view_all: true,
                view_all_text: 'View All',
                pan_on_click: true,
                start: 0,
                locations: [],
                shared: {},
                map_options: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                stroke_options: {
                    strokeColor: '#0000FF',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#0000FF',
                    fillOpacity: 0.4
                },
                directions_options: {
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    optimizeWaypoints: false,
                    provideRouteAlternatives: false,
                    avoidHighways: false,
                    avoidTolls: false
                },
                circle_options: {
                    radius: 100,
                    visible: true
                },
                styles: {},
                fusion_options: {},
                directions_panel: null,
                draggable: false,
                editable: false,
                show_infowindows: true,
                show_markers: true,
                infowindow_type: 'bubble',
                listeners: {},

                //events
                beforeViewAll: function () {},
                afterViewAll: function () {},
                beforeShow: function (index, location, marker) {},
                afterShow: function (index, location, marker) {},
                afterCreateMarker: function (index, location, marker) {},

                beforeCloseInfowindow: function (index, location) {},
                afterCloseInfowindow: function (index, location) {},
                beforeOpenInfowindow: function (index, location, marker) {},
                afterOpenInfowindow: function (index, location, marker) {},

                afterRoute: function (distance, status, result) {},
                onPolylineClick: function (obj) {},
                onPolygonClick: function (obj) {},

                circleRadiusChanged: function (index, circle, marker) {},
                circleCenterChanged: function (index, circle, marker) {},

                drag: function (index, location, marker) {},
                dragEnd: function (index, location, marker) {},
                dragStart: function (index, location, marker) {}
            };

            //default menu types
            this.AddControl('dropdown', html_dropdown);
            this.AddControl('list', html_ullist);

            if (args && args.type === 'directions') {
                !args.show_markers && (args.show_markers = false);
                !args.show_infowindows && (args.show_infowindows = false);
            }

            //init
            $.extend(true, this.o, args);
        }

        //where to store the menu types
        Maplace.prototype.controls = {};

        //initialize google map object
        Maplace.prototype.create_objMap = function () {
            var self = this,
                count = 0,
                i;

            //if styled
            for (i in this.o.styles) {
                if (this.o.styles.hasOwnProperty(i)) {
                    if (count === 0) {
                        this.o.map_options.mapTypeControlOptions = {
                            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
                        };
                    }
                    count++;
                    this.o.map_options.mapTypeControlOptions.mapTypeIds.push('map_style_' + count);
                }
            }

            //if init
            if (!this.loaded) {
                try {
                    this.map_div.css({
                        position: 'relative',
                        overflow: 'hidden'
                    });
                    
                    //create the container div into map_div
                    this.canvas_map = $('<div>').addClass('canvas_map').css({
                        width: '100%',
                        height: '100%'
                    }).appendTo(this.map_div);

                    this.oMap = new google.maps.Map(this.canvas_map.get(0), this.o.map_options);

                } catch (err) {
                    this.debug('create_objMap::' + this.map_div.selector, err.toString());
                }

            //else loads the new optionsl
            } else {
                self.oMap.setOptions(this.o.map_options);
            }

            //if styled
            count = 0;
            for (i in this.o.styles) {
                if (this.o.styles.hasOwnProperty(i)) {
                    count++;
                    this.oMap.mapTypes.set('map_style_' + count, new google.maps.StyledMapType(this.o.styles[i], {
                        name: i
                    }));
                    this.oMap.setMapTypeId('map_style_' + count);
                }
            }
        };

        //adds markers to the map
        Maplace.prototype.add_markers_to_objMap = function () {
            var a,
                point,
                type = this.o.type || 'marker';

            //switch how to display the locations
            switch (type) {
                case 'marker':
                    for (a = 0; a < this.ln; a++) {
                        point = this.create_objPoint(a);
                        this.create.marker.call(this, a, point);
                    }
                    break;
                default:
                    this.create[type].apply(this);
                    break;
            }
        };

        //create the main object point
        Maplace.prototype.create_objPoint = function (index) {
            var point = $.extend({}, this.o.locations[index]),
                visibility = point.visible === undefined ? undefined : point.visible;

            !point.type && (point.type = this.o.type);

            //set obj map
            point.map = this.oMap;
            point.position = new google.maps.LatLng(point.lat, point.lon);
            point.zIndex = point.zIndex === undefined ? 10000 : (point.zIndex + 100);
            point.visible = visibility === undefined  ? this.o.show_markers : visibility;

            this.o.maxZIndex = point.zIndex > this.maxZIndex ? point.zIndex : this.maxZIndex;

            if (point.image) {
                point.icon = new google.maps.MarkerImage(
                    point.image,
                    new google.maps.Size(point.image_w || 32, point.image_h || 32),
                    new google.maps.Point(0, 0),
                    new google.maps.Point((point.image_w || 32) / 2, (point.image_h || 32)  / 2)
                );
            }

            return point;
        };

        //create the main object circle
        Maplace.prototype.create_objCircle = function (point) {
            var def_stroke_opz,
                def_circle_opz,
                circle;
            
            circle = $.extend({}, point);
            def_stroke_opz = $.extend({}, this.o.stroke_options);
            def_circle_opz = $.extend({}, this.o.circle_options);

            $.extend(def_stroke_opz, point.stroke_options || {});
            $.extend(circle, def_stroke_opz);
            
            $.extend(def_circle_opz, point.circle_options || {});
            $.extend(circle, def_circle_opz);

            circle.center = point.position;
            circle.draggable = false;
            circle.zIndex = point.zIndex > 0 ? point.zIndex - 10 : 1;

            return circle;
        };

        //create the main object point
        Maplace.prototype.add_markerEv = function (index, point, marker) {
            var self = this;

            google.maps.event.addListener(marker, 'click', function (ev) {
                self.o.beforeShow(index, point, marker);

                //show infowindow?
                if (self.o.show_infowindows && (point.show_infowindow === false ? false : true)) {
                    self.open_infowindow(index, marker, ev);
                }

                //pan and zoom the map
                if (self.o.pan_on_click && (point.pan_on_click === false ? false : true)) {
                    self.oMap.panTo(point.position);
                    point.zoom && self.oMap.setZoom(point.zoom);
                }

                //activate related menu link
                if (self.current_control && self.o.generate_controls && self.current_control.activateCurrent) {
                    self.current_control.activateCurrent.call(self, index + 1);
                }

                //update current location index
                self.current_index = index;

                self.o.afterShow(index, point, marker);
            });

            if (point.draggable) {
                this.add_dragEv(index, point, marker);
            }
        };

        //add events to circles objs
        Maplace.prototype.add_circleEv = function (index, circle, marker) {
            var self = this;

            google.maps.event.addListener(marker, 'click', function () {
                self.ViewOnMap(index + 1);
            });

            google.maps.event.addListener(marker, 'center_changed', function() {
                self.o.circleCenterChanged(index, circle, marker);
            });

            google.maps.event.addListener(marker, 'radius_changed', function() {
                self.o.circleRadiusChanged(index, circle, marker);
            });

            if (circle.draggable) {
                this.add_dragEv(index, circle, marker);
            }
        };

        //add drag events
        Maplace.prototype.add_dragEv = function (index, obj, marker) {
            var self = this;

            google.maps.event.addListener(marker, 'drag', function (ev) {
                var pos,
                    extraType;

                if (marker.getPosition) {
                    pos = marker.getPosition();
                } else if (marker.getCenter) {
                    pos = marker.getCenter();
                } else {
                    return;
                }

                //update circle position
                if (self.circles[index]) {
                    self.circles[index].setCenter(pos);
                }

                //update polygon or polyline if defined
                if (self.Polyline) {
                    extraType = 'Polyline';
                } else if (self.Polygon) {
                    extraType = 'Polygon';
                }

                if (extraType) {
                    var path = self[extraType].getPath(),
                        pathArray = path.getArray(),
                        arr = [],
                        i = 0;

                    for(; i < pathArray.length; ++i) {
                        arr[i] = index === i
                            ? new google.maps.LatLng(pos.lat(), pos.lng())
                            : new google.maps.LatLng(pathArray[i].lat(), pathArray[i].lng());
                    }

                    self[extraType].setPath(new google.maps.MVCArray(arr));
                    self.add_polyEv(extraType);
                }

                //fire drag event
                self.o.drag(index, obj, marker);
            });

            google.maps.event.addListener(marker, 'dragend', function() {
                self.o.dragEnd(index, obj, marker);
            });

            google.maps.event.addListener(marker, 'dragstart', function() {
                self.o.dragStart(index, obj, marker);
            });

            google.maps.event.addListener(marker, 'center_changed', function() {
                //update marker position
                if (self.markers[index] && marker.getCenter) {
                    self.markers[index].setPosition(marker.getCenter());
                }

                self.o.drag(index, obj, marker);
            });
        };

        //add events to poly objs
        Maplace.prototype.add_polyEv = function (typeName) {
            var self = this;

            google.maps.event.addListener(this[typeName].getPath(), 'set_at', function(index, obj) {
                var item = self[typeName].getPath().getAt(index),
                    newPos = new google.maps.LatLng(item.lat(), item.lng());

                self.markers[index] && self.markers[index].setPosition(newPos);
                self.circles[index] && self.circles[index].setCenter(newPos);

                self.o['on' + typeName + 'Changed'](index, obj, self[typeName].getPath().getArray());
            });
        };

        //wrapper for the map types
        Maplace.prototype.create = {

            //single marker
            marker: function (index, point, marker) {
                var self = this,
                    circle;

                //allow mix circles with markers
                if (point.type == 'circle' && !marker) {
                    circle = this.create_objCircle(point);

                    if (!point.visible) {
                        circle.draggable = point.draggable;
                    }

                    marker = new google.maps.Circle(circle);
                    this.add_circleEv(index, circle, marker);

                    //store the new circle
                    this.circles[index] = marker;
                }

                point.type = 'marker';

                //create the marker and add click event
                marker = new google.maps.Marker(point);
                this.add_markerEv(index, point, marker);
                
                //extends bounds with this location
                this.oBounds.extend(point.position);

                //store the new marker
                this.markers[index] = marker;

                this.o.afterCreateMarker(index, point, marker);

                return marker;
            },


            //circle mode
            circle: function () {
                var self = this,
                    a,
                    point,
                    circle,
                    marker;

                for (a = 0; a < this.ln; a++) {
                    point = this.create_objPoint(a);

                    //allow mix markers with circles
                    if (point.type == 'circle') {
                        circle = this.create_objCircle(point);

                        if (!point.visible) {
                            circle.draggable = point.draggable;
                        }

                        marker = new google.maps.Circle(circle);
                        this.add_circleEv(a, circle, marker);

                        //store the new circle
                        this.circles[a] = marker;
                    }

                    point.type = 'marker';
                    this.create.marker.call(this, a, point, marker);
                }
            },


            //polyline mode
            polyline: function () {
                var self = this,
                    a,
                    point,
                    stroke = $.extend({}, this.o.stroke_options);
                
                stroke.path = [];
                stroke.draggable = this.o.draggable;
                stroke.editable = this.o.editable;
                stroke.map = this.oMap;
                stroke.zIndex = this.o.maxZIndex + 100;

                //create the path and location marker
                for (a = 0; a < this.ln; a++) {
                    point = this.create_objPoint(a);
                    this.create.marker.call(this, a, point);

                    stroke.path.push(point.position);
                }

                this.Polyline
                    ? this.Polyline.setOptions(stroke)
                    : this.Polyline = new google.maps.Polyline(stroke);

                this.add_polyEv('Polyline');
            },


            //polygon mode
            polygon: function () {
                var self = this,
                    a,
                    point,
                    stroke = $.extend({}, this.o.stroke_options);
                
                stroke.path = [];
                stroke.draggable = this.o.draggable;
                stroke.editable = this.o.editable;
                stroke.map = this.oMap;
                stroke.zIndex = this.o.maxZIndex + 100;

                //create the path and location marker
                for (a = 0; a < this.ln; a++) {
                    point = this.create_objPoint(a);
                    this.create.marker.call(this, a, point);

                    stroke.path.push(point.position);
                }

                this.Polygon
                    ? this.Polygon.setOptions(stroke)
                    : this.Polygon = new google.maps.Polygon(stroke);

                google.maps.event.addListener(this.Polygon, 'click', function (obj) {
                    self.o.onPolygonClick(obj);
                });

                this.add_polyEv('Polygon');
            },


            //fusion tables
            fusion: function () {
                this.o.fusion_options.styles = [this.o.stroke_options];
                this.o.fusion_options.map = this.oMap;

                this.Fusion
                    ? this.Fusion.setOptions(this.o.fusion_options)
                    : this.Fusion = new google.maps.FusionTablesLayer(this.o.fusion_options);
            },


            //directions mode
            directions: function () {
                var self = this,
                    a,
                    point,
                    stopover,
                    origin,
                    destination,
                    waypoints = [],
                    distance = 0;

                //create the waypoints and location marker
                for (a = 0; a < this.ln; a++) {
                    point = this.create_objPoint(a);

                    //first location start point
                    if (a === 0) {
                        origin = point.position;

                    //last location end point
                    } else if (a === (this.ln - 1)) {
                        destination = point.position;

                    //waypoints in the middle
                    } else {
                        stopover = this.o.locations[a].stopover === true ? true : false;
                        waypoints.push({
                            location: point.position,
                            stopover: stopover
                        });
                    }

                    this.create.marker.call(this, a, point);
                }

                this.o.directions_options.origin = origin;
                this.o.directions_options.destination = destination;
                this.o.directions_options.waypoints = waypoints;

                this.directionsService || (this.directionsService = new google.maps.DirectionsService());
                this.directionsDisplay 
                    ? this.directionsDisplay.setOptions({ draggable: this.o.draggable })
                    : this.directionsDisplay = new google.maps.DirectionsRenderer({ draggable: this.o.draggable });

                this.directionsDisplay.setMap(this.oMap);

                //show the directions panel
                if (this.o.directions_panel) {
                    this.o.directions_panel = $(this.o.directions_panel);
                    this.directionsDisplay.setPanel(this.o.directions_panel.get(0));
                }

                if (this.o.draggable) {
                    google.maps.event.addListener(this.directionsDisplay, 'directions_changed', function () {
                        distance = self.compute_distance(self.directionsDisplay.directions);
                        self.o.afterRoute(distance);
                    });
                }

                this.directionsService.route(this.o.directions_options, function (result, status) {
                    //directions found
                    if (status === google.maps.DirectionsStatus.OK) {
                        distance = self.compute_distance(result);
                        self.directionsDisplay.setDirections(result);
                    }
                    self.o.afterRoute(distance, status, result);
                });
            }
        };

        //route distance
        Maplace.prototype.compute_distance = function (result) {
            var total = 0,
                i,
                myroute = result.routes[0],
                rlen = myroute.legs.length;

            for (i = 0; i < rlen; i++) {
                total += myroute.legs[i].distance.value;
            }

            return total;
        };

        //wrapper for the infowindow types
        Maplace.prototype.type_to_open = {
            //google default infowindow
            bubble: function (location) {
                this.infowindow = new google.maps.InfoWindow({
                    content: location.html || ''
                });
            }
        };

        //open the infowindow
        Maplace.prototype.open_infowindow = function (index, marker, ev) {
            //close if any open
            this.CloseInfoWindow();
            var point = this.o.locations[index],
                type = this.o.infowindow_type;

            //show if content and valid infowindow type provided
            if (point.html && this.type_to_open[type]) {
                this.o.beforeOpenInfowindow(index, point, marker);
                this.type_to_open[type].call(this, point);
                this.infowindow.open(this.oMap, marker);
                this.o.afterOpenInfowindow(index, point, marker);
            }
        };

        //gets the html for the menu
        Maplace.prototype.get_html_controls = function () {
            if (this.controls[this.o.controls_type] && this.controls[this.o.controls_type].getHtml) {
                this.current_control = this.controls[this.o.controls_type];

                return this.current_control.getHtml.apply(this);
            }
            return '';
        };

        //creates the controls menu
        Maplace.prototype.generate_controls = function () {
            //append menu on the div container
            if (!this.o.controls_on_map) {
                this.controls_wrapper.empty();
                this.controls_wrapper.append(this.get_html_controls());
                return;
            }

            //else 
            //controls in map
            var cntr = $('<div class="on_gmap ' + this.o.controls_type + ' gmap_controls"></div>')
                .css(this.o.controls_applycss ? { margin: '5px' } : {}),

                inner = $(this.get_html_controls()).css(this.o.controls_applycss ? {
                    background: '#fff',
                    padding: '5px',
                    border: '1px solid rgb(113,123,135)',
                    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px',
                    maxHeight: this.map_div.find('.canvas_map').outerHeight() - 80,
                    minWidth: 100,
                    overflowY: 'auto',
                    overflowX: 'hidden'
                } : {});

            cntr.append(inner);

            //attach controls
            this.oMap.controls[this.o.controls_position].push(cntr.get(0));
        };

        //resets obj map, markers, bounds, listeners, controllers
        Maplace.prototype.init_map = function () {
            var self = this;

            this.Polyline && this.Polyline.setMap(null);
            this.Polygon && this.Polygon.setMap(null);
            this.Fusion && this.Fusion.setMap(null);
            this.directionsDisplay && this.directionsDisplay.setMap(null);

            for (var i = this.markers.length - 1; i >= 0; i -= 1) {
                try { 
                    this.markers[i] && this.markers[i].setMap(null);
                } catch (err) {
                    self.debug('init_map::markers::setMap', err.stack);
                }
            }

            this.markers.length = 0;
            this.markers = [];

            for (var i = this.circles.length - 1; i >= 0; i -= 1) {
                try { 
                    this.circles[i] && this.circles[i].setMap(null);
                } catch (err) {
                    self.debug('init_map::circles::setMap', err.stack);
                }
            }

            this.circles.length = 0;
            this.circles = [];

            if (this.o.controls_on_map && this.oMap.controls) {
                this.oMap.controls[this.o.controls_position].forEach(function (element, index) {
                    try {
                        self.oMap.controls[this.o.controls_position].removeAt(index);
                    } catch (err) { 
                        self.debug('init_map::removeAt', err.stack);
                    }
                });
            }

            this.oBounds = new google.maps.LatLngBounds();
        };

        //perform the first view of the map
        Maplace.prototype.perform_load = function () {
            //one location
            if (this.ln === 1) {
                if (this.o.map_options.set_center) {
                    this.oMap.setCenter(new google.maps.LatLng(this.o.map_options.set_center[0], this.o.map_options.set_center[1]));
                
                } else {
                    this.oMap.fitBounds(this.oBounds);
                    this.ViewOnMap(1);
                }

                this.o.map_options.zoom && this.oMap.setZoom(this.o.map_options.zoom);

            //no locations
            } else if (this.ln === 0) {
                if (this.o.map_options.set_center) {
                    this.oMap.setCenter(new google.maps.LatLng(this.o.map_options.set_center[0], this.o.map_options.set_center[1]));
                
                } else {
                    this.oMap.fitBounds(this.oBounds);
                }

                this.oMap.setZoom(this.o.map_options.zoom || 1);

            //n+ locations
            } else {
                this.oMap.fitBounds(this.oBounds);
                
                //check the start option
                if (typeof (this.o.start - 0) === 'number' && this.o.start > 0 && this.o.start <= this.ln) {
                    this.ViewOnMap(this.o.start);
                
                //check if set_center exists
                } else if (this.o.map_options.set_center) {
                    this.oMap.setCenter(new google.maps.LatLng(this.o.map_options.set_center[0], this.o.map_options.set_center[1]));
                
                //view all
                } else {
                    this.ViewOnMap(this.view_all_key);
                }

                this.o.map_options.zoom && this.oMap.setZoom(this.o.map_options.zoom);
            }
        };

        Maplace.prototype.debug = function (code, msg) {
            this.o.debug && console.log(code, msg);
            return this;
        };


        /////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////


        //adds a custom menu to the class
        Maplace.prototype.AddControl = function (name, func) {
            if (!name || !func) {
                self.debug('AddControl', 'Missing "name" and "func" callback.');
                return false;
            }
            this.controls[name] = func;
            return this;
        };

        //close the infowindow
        Maplace.prototype.CloseInfoWindow = function () {
            if (this.infowindow && (this.current_index || this.current_index === 0)) {
                this.o.beforeCloseInfowindow(this.current_index, this.o.locations[this.current_index]);
                this.infowindow.close();
                this.infowindow = null;
                this.o.afterCloseInfowindow(this.current_index, this.o.locations[this.current_index]);
            }
            return this;
        };

        //checks if a location has to be in menu
        Maplace.prototype.ShowOnMenu = function (index) {
            if (index === this.view_all_key && this.o.view_all && this.ln > 1) {
                return true;
            }

            index = parseInt(index, 10);
            if (typeof (index - 0) === 'number' && index >= 0 && index < this.ln) {
                var on_menu = this.o.locations[index].on_menu === false ? false : true;
                if (on_menu) {
                    return true;
                }
            }

            return false;
        };

        //triggers to show a location in map
        Maplace.prototype.ViewOnMap = function (index) {
            //view all
            if (index === this.view_all_key) {
                this.o.beforeViewAll();
                this.current_index = index;
                if (this.o.locations.length > 0 && this.o.generate_controls && this.current_control && this.current_control.activateCurrent) {
                    this.current_control.activateCurrent.apply(this, [index]);
                }
                this.oMap.fitBounds(this.oBounds);
                this.CloseInfoWindow();
                this.o.afterViewAll();

            //specific location
            } else {
                index = parseInt(index, 10);
                if (typeof (index - 0) === 'number' && index > 0 && index <= this.ln) {
                    try {
                        google.maps.event.trigger(this.markers[index - 1], 'click');
                    } catch (err) {
                        this.debug('ViewOnMap::trigger', err.stack);
                    }
                }
            }
            return this;
        };

        //replace current locations
        Maplace.prototype.SetLocations = function (locs, reload) {
            this.o.locations = locs;
            reload && this.Load();
            return this;
        };

        //adds one or more locations to the end of the array
        Maplace.prototype.AddLocations = function (locs, reload) {
            var self = this;

            if ($.isArray(locs)) {
                $.each(locs, function (index, value) {
                    self.o.locations.push(value);
                });
            }

            if ($.isPlainObject(locs)) {
                this.o.locations.push(locs);
            }

            reload && this.Load();
            return this;
        };

        //adds a location at the specific index
        Maplace.prototype.AddLocation = function (location, index, reload) {
            var self = this;

            if ($.isPlainObject(location)) {
                this.o.locations.splice(index, 0, location);
            }

            reload && this.Load();
            return this;
        };

        //remove one or more locations
        Maplace.prototype.RemoveLocations = function (locs, reload) {
            var self = this,
                k = 0;

            if ($.isArray(locs)) {
                $.each(locs, function (index, value) {
                    if ((value - k) < self.ln) {
                        self.o.locations.splice(value-k, 1);
                    }
                    k++;
                });
            } else {
                if (locs < this.ln) {
                    this.o.locations.splice(locs, 1);
                }
            }

            reload && this.Load();
            return this;
        };

        //check if already initialized with a Load()
        Maplace.prototype.Loaded = function () {
            return this.loaded;
        };

        //loads the options
        Maplace.prototype._init = function () {
            //store the locations length
            this.ln = this.o.locations.length;

            //update all locations with shared
            for (var i = 0; i < this.ln; i++) {
                var common = $.extend({}, this.o.shared);
                this.o.locations[i] = $.extend(common, this.o.locations[i]);
                if (this.o.locations[i].html) {
                    this.o.locations[i].html = this.o.locations[i].html.replace('%index', i + 1);
                    this.o.locations[i].html = this.o.locations[i].html.replace('%title', (this.o.locations[i].title || ''));
                }
            }

            //store dom references
            this.map_div = $(this.o.map_div);
            this.controls_wrapper = $(this.o.controls_div);
            return this;
        };

        //creates the map and menu
        Maplace.prototype.Load = function (args) {
            $.extend(true, this.o, args);
            args && args.locations && (this.o.locations = args.locations);
            this._init();

            //reset/init google map objects
            this.o.visualRefresh === false ? (google.maps.visualRefresh = false) : (google.maps.visualRefresh = true);
            this.init_map();
            this.create_objMap();

            //add markers
            this.add_markers_to_objMap();
            
            //generate controls
            if ((this.ln > 1 && this.o.generate_controls) || this.o.force_generate_controls)  {
                this.o.generate_controls = true;
                this.generate_controls();
            } else {
                this.o.generate_controls = false;
            }

            var self = this;

            //first call
            if (!this.loaded) {
                google.maps.event.addListenerOnce(this.oMap, 'idle', function () {
                    self.perform_load();
                });

                //adapt the div size on resize
                google.maps.event.addListener(this.oMap, 'resize', function () {
                    self.canvas_map.css({
                        width: self.map_div.width(),
                        height: self.map_div.height()
                    });
                });

                //add custom listeners
                var i;
                for (i in this.o.listeners) {
                    var map = this.oMap,
                        myListener = this.o.listeners[i];

                    if (this.o.listeners.hasOwnProperty(i)) {
                        google.maps.event.addListener(this.oMap, i, function (event) {
                            myListener(map, event);
                        });
                    }
                }
            //all other calls
            } else {
                this.perform_load();
            }

            this.loaded = true;

            return this;
        };


        return Maplace;

    })();


    if (typeof define == 'function' && define.amd) {
        define(function() { return Maplace; });
    } else {
        window.Maplace = Maplace;
    }

})(jQuery, this, google);
