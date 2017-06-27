/**
*
* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
* by Sumit Kumar (@TweetsOfSumit)
* Github Repo: https://github.com/codeofsumit/leaflet.pm
*/

L.PM = L.PM || {
    initialize: function() {

        var initLayerGroup = function() {
            this.pm = new L.PM.Edit.LayerGroup(this);
        };
        L.LayerGroup.addInitHook(initLayerGroup);


        var initPolygon = function() {
            this.pm = new L.PM.Edit.Poly(this);
        };
        L.Polygon.addInitHook(initPolygon);


        var initMap = function() {
            this.pm = new L.PM.Draw(this);
        };
        L.Map.addInitHook(initMap);

    },
    Edit: {}
};

// initialize leaflet.pm
L.PM.initialize();

L.PM.Draw = L.Class.extend({

    initialize: function(map) {

        // save the map
        this._map = map;

        // define all possible shapes that can be drawn
        this.shapes = ['Poly'];

        // initiate drawing class for our shapes
        for(var i=0; i<this.shapes.length; i++) {
            var shape = this.shapes[i];
            this[shape] = new L.PM.Draw[shape](this._map);
        }

    },
    getShapes: function() {
        // if somebody wants to know what shapes are available
        return this.shapes;
    },
    enableDraw: function(shape) {

        if(!shape) {
            throw 'Error: Please pass a shape as a parameter. Possible shapes are: ' + this.getShapes().join(',');
        }

        // disable drawing for all shapes
        this.disableDraw();

        // enable draw for a shape
        this[shape].enable();

    },
    disableDraw: function() {

        // there can only be one drawing mode active at a time on a map
        // so it doesn't matter which one should be disabled.
        // just disable all of them
        for(var i=0; i<this.shapes.length; i++) {
            var shape = this.shapes[i];
            this[shape].disable();
        }

    },
    addControls: function() {
        // add control buttons for our shapes
        for(var i=0; i<this.shapes.length; i++) {
            var shape = this.shapes[i];
            this[shape].addButton();
        }
    }
});

L.Control.PMButton = L.Control.extend({
    options: {
        position: 'topleft'
    },
    initialize: function (options) {
        this._button = {};
        this.setButton(options);
    },

    onAdd: function (map) {

        this._map = map;
        var container = L.DomUtil.create('div', 'leaflet-control-button');

        this._container = container;

        this._makeButton(this._button);
        return this._container;
    },

    onRemove: function (map) {
    },

    setButton: function (options) {
        var button = {
            'className': options.className,
            'iconUrl': options.iconUrl,
            'onClick': options.onClick,
            'afterClick': options.afterClick,
            'doToggle': options.doToggle,
            'toggleStatus': options.toggleStatus
        };

        this._button = button;
    },

    getText: function () {
        return this._button.text;
    },

    getIconUrl: function () {
        return this._button.iconUrl;
    },

    destroy: function () {
        this._button = {};
        this._update();
    },

    toggle: function (e) {
        if(typeof e === 'boolean'){
            this._button.toggleStatus = e;
        }
        else{
            this._button.toggleStatus = !this._button.toggleStatus;
        }
    },
    toggled: function () {
        return this._button.toggleStatus;
    },
    onCreate: function() {
        this.toggle(false);
    },
    _makeButton: function(button) {

        var newButton = L.DomUtil.create('div', 'leaflet-buttons-control-button', this._container);
        if(button.toggleStatus)
            L.DomUtil.addClass(newButton,'active');

        var image = L.DomUtil.create('img', 'control-icon', newButton);
        if (button.iconUrl) {
            image.setAttribute('src', button.iconUrl);
        }
        if (button.className) {
            L.DomUtil.addClass(image, button.className);
        }

        L.DomEvent
            .addListener(newButton, 'click', button.onClick, this)
            .addListener(newButton, 'click', this._clicked, this)
            .addListener(newButton, 'click', button.afterClick, this);

        L.DomEvent.disableClickPropagation(newButton);
        return newButton;

    },

    _clicked: function () {

        if(this._button.doToggle){

            if(this._button.toggleStatus) {
                L.DomUtil.removeClass(this._container.childNodes[0],'active');
            }
            else {
                L.DomUtil.addClass(this._container.childNodes[0],'active');
            }
            this.toggle();
        }
        return;
    }

});

L.PM.Draw.Poly = L.PM.Draw.extend({

    initialize: function(map) {
        this._map = map;
        this._shape = 'Poly';
    },
    enable: function(options) {
        // enable draw mode

        this._enabled = true;

        // create a new layergroup
        this._layerGroup = new L.LayerGroup();
        this._layerGroup.addTo(this._map);

        // this is the polyLine that'll make up the polygon
        this._polyline = L.polyline([], {color: 'red'});
        this._layerGroup.addLayer(this._polyline);

        // this is the hintline from the mouse cursor to the last marker
        this._hintline = L.polyline([], {
            color: 'red',
            dashArray: [5, 5]
        });
        this._layerGroup.addLayer(this._hintline);


        // change map cursor
        this._map._container.style.cursor = 'crosshair';

        // create a polygon-point on click
        this._map.on('click', this._createPolygonPoint, this);

        // sync the hintline on mousemove
        this._map.on('mousemove', this._syncHintLine, this);

        // fire drawstart event
        this._map.fire('pm:drawstart', {shape: this._shape});

    },
    disable: function() {
        // disable draw mode

        // cancel, if drawing mode isn't even enabled
        if(!this._enabled) {
            return;
        }

        this._enabled = false;

        // reset cursor
        this._map._container.style.cursor = 'default';

        // unbind listeners
        this._map.off('click', this._createPolygonPoint);
        this._map.off('mousemove', this._syncHintLine);

        // remove layer
        this._map.removeLayer(this._layerGroup);

        // fire drawend event
        this._map.fire('pm:drawend', {shape: this._shape});

    },
    enabled: function() {
        return this._enabled;
    },
    toggle: function() {

        if(this.enabled()) {
            this.disable();
        } else {
            this.enable();
        }

    },
    addButton: function(map) {

        var self = this;

        var drawPolyButton = {
              'className': 'icon-polygon',
              'onClick': function() {

              },
              'afterClick': function(e) {
                  self.toggle();
              },
              'doToggle': true,
              'toggleStatus': false
        };

        this._drawButton = new L.Control.PMButton(drawPolyButton).addTo(this._map);

        this._map.on('pm:drawstart', function(e) {
            if(e.shape === self._shape && !self._drawButton.toggled()) {
                self._drawButton._clicked();
            }
        });

        this._map.on('pm:drawend', function(e) {
            if(e.shape === self._shape && self._drawButton.toggled()) {
                self._drawButton._clicked();
            }
        });

        return this._drawButton;

    },
    _syncHintLine: function(e) {

        var polyPoints = this._polyline.getLatLngs();

        if(polyPoints.length > 0) {
            var lastPolygonPoint = polyPoints[polyPoints.length - 1];
            this._hintline.setLatLngs([lastPolygonPoint, e.latlng]);
        }



    },
    _createPolygonPoint: function(e) {

        // is this the first point?
        var first = this._polyline.getLatLngs().length === 0 ? true : false;

        this._polyline.addLatLng(e.latlng);
        this._createMarker(e.latlng, first);


        this._hintline.setLatLngs([e.latlng, e.latlng]);

    },
    _finishPolygon: function() {

        var coords = this._polyline.getLatLngs();
        var polygonLayer = L.polygon(coords).addTo(this._map);

        polygonLayer.pm.toggleEdit();

        this.disable();

        this._map.fire('pm:create', {
            shape: this._shape,
            layer: polygonLayer
        });
    },
    _createMarker: function(latlng, first) {

        var marker = new L.Marker(latlng, {
            draggable: false,
            icon: L.divIcon({className: 'marker-icon'})
        });

        this._layerGroup.addLayer(marker);

        if(first) {
            marker.on('click', this._finishPolygon, this);
        }

        return marker;

    },
});

L.PM.Edit.Poly = L.Class.extend({

    initialize: function(poly) {
        this._poly = poly;
        this._enabled = false;
    },

    toggleEdit: function() {
        if(!this.enabled()) {
            this.enable();
        } else {
            this.disable();
        }
    },

    enable: function() {

        var self = this;

        if(!this.enabled()) {
            this._enabled = true;

            if(!this._markerGroup) {
                this._markerGroup = new L.LayerGroup();

                // init dragable markers
                this._initMarkers();
            }

            this._poly._map.addLayer(this._markerGroup);

            this._poly.on('remove', function() {
                self.disable();
            });
        }

    },

    enabled: function() {
        return this._enabled;
    },

    disable: function() {
        this._enabled = false;
        this._poly._map.removeLayer(this._markerGroup);
    },

    _initMarkers: function() {

        this._markers = [];

        var coords = this._poly._latlngs[0];

        for(var i = 0; i < coords.length; i++) {
            var marker = this._createMarker(coords[i], i);
            this._markers.push(marker);
        }

        for(var k = 0; k < coords.length; k++) {

            var nextIndex = k+1 >= coords.length ? 0 : k+1;

            this._createMiddleMarker(
                this._markers[k], this._markers[nextIndex]
            );
        }

    },

    // creates initial markers for coordinates
    _createMarker: function(latlng, index) {

        var marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({className: 'marker-icon'})
        });

        marker._origLatLng = latlng;
        marker._index = index;

        marker.on('drag', this._onMarkerDrag, this);
        marker.on('dragend', this._onMarkerDragEnd, this);
        marker.on('contextmenu', this._removeMarker, this);

        this._markerGroup.addLayer(marker);

        return marker;

    },

    // creates the middle markes between coordinates
    _createMiddleMarker: function(leftM, rightM) {
        var self = this;
        var latlng = this._calcMiddleLatLng(leftM, rightM);

        var middleMarker = this._createMarker(latlng);
        var icon = L.divIcon({className: 'marker-icon marker-icon-middle'})
        middleMarker.setIcon(icon);

        // save middle markers to the other markers
        leftM._middleMarkerRight = middleMarker;
        rightM._middleMarkerLeft = middleMarker;

        middleMarker.on('click', function() {
            self._addMarker(middleMarker, leftM, rightM);
        });
        middleMarker.on('movestart', function() {
            self._addMarker(middleMarker, leftM, rightM);
        });


    },

    // adds a new marker from a middlemarker
    _addMarker: function(newM, leftM, rightM) {

        // first, make this middlemarker a regular marker
        newM.off('movestart');
        newM.off('click');

        // TODO: This is a workaround. Remove this event do the callback right here when when this issue is fixed:
        // https://github.com/Leaflet/Leaflet/issues/4484
        newM.on('moveend', function() {
            var icon = L.divIcon({className: 'marker-icon'})
            newM.setIcon(icon);
        });

        // now, create the polygon coordinate point for that marker
        var latlng = newM.getLatLng();
        var coords = this._poly._latlngs[0];
        var index = leftM._index + 1;

        coords.splice(index, 0, latlng);

        // associate polygon coordinate with marker coordinate
        newM._origLatLng = coords[index];

        // push into marker array update the indexes for every marker
        this._markers.splice(index, 0, newM);
        for(var i=0;i<this._markers.length;i++) {
            this._markers[i]._index = i;
        }

        // create the new middlemarkers
        this._createMiddleMarker(leftM, newM);
        this._createMiddleMarker(newM, rightM);

        // fire edit event
        this._fireEdit();


    },

    _removeMarker: function(e) {
        var marker = e.target;

        // only continue if this is NOT a middle marker (those can't be deleted)
        if(marker._index !== undefined) {

            // remove polygon coordinate from this marker
            var coords = this._poly._latlngs[0];
            var index = marker._index;

            coords.splice(index, 1);
            this._poly.redraw();

            // remove the marker and the middlemarkers next to it from the map
            this._markerGroup.removeLayer(marker._middleMarkerLeft);
            this._markerGroup.removeLayer(marker._middleMarkerRight);
            this._markerGroup.removeLayer(marker);


            // create the new middlemarker
            var leftMarkerIndex = index - 1 < 0 ? this._markers.length - 1 : index - 1;
            var rightMarkerIndex = index + 1 >= this._markers.length ? 0 : index + 1;

            var leftM = this._markers[leftMarkerIndex];
            var rightM = this._markers[rightMarkerIndex];
            this._createMiddleMarker(leftM, rightM);


            // remove the marker from the markers array
            this._markers.splice(index, 1);

            // update the remaining markers indexes
            for(var i=0;i<this._markers.length;i++) {
                this._markers[i]._index = i;
            }

            // fire edit event
            this._fireEdit();

        }


    },

    _onMarkerDrag: function(e) {

        // dragged marker
        var marker = e.target;

        // the dragged markers neighbors
        var nextMarkerIndex = marker._index + 1 >= this._markers.length ? 0 : marker._index + 1;
        var prevMarkerIndex = marker._index - 1 < 0 ? this._markers.length - 1 : marker._index - 1;

        // update marker coordinates which will update polygon coordinates
        L.extend(marker._origLatLng, marker._latlng);
        this._poly.redraw();

        // update middle markers on the left and right
        // be aware that "left" and "right" might be interchanged, depending on the geojson array
        // TODO rename "left" and "right" to "prev" and "next"
        var middleMarkerRightLatLng = this._calcMiddleLatLng(marker, this._markers[nextMarkerIndex]);
        marker._middleMarkerRight.setLatLng(middleMarkerRightLatLng);

        var middleMarkerLeftLatLng = this._calcMiddleLatLng(marker, this._markers[prevMarkerIndex]);
        marker._middleMarkerLeft.setLatLng(middleMarkerLeftLatLng);

    },

    _onMarkerDragEnd: function(e) {

        var marker = e.target;

        this._fireEdit();

    },

    _fireEdit: function () {
        this._poly.edited = true;
        this._poly.fire('pm:edit');
    },

    _calcMiddleLatLng: function(leftM, rightM) {
        var map = this._poly._map,
            p1 = map.project(leftM.getLatLng()),
            p2 = map.project(rightM.getLatLng());

        var latlng = map.unproject(p1._add(p2)._divideBy(2));

        return latlng;
    }

});


L.PM.Edit.LayerGroup = L.Class.extend({
    initialize: function(layerGroup) {
        var self = this;
        this._layerGroup = layerGroup;
        this._layers = layerGroup.getLayers();

        // listen to the edit event of the layers in this group
        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].on('pm:edit', this._fireEdit, this);
        }

        // if a new layer is added to the group, reinitialize
        this._layerGroup.on('layeradd', function(e) {
            self.initialize(layerGroup);

            // if editing was already enabled for this group, enable it again
            // so the new layers are enabled
            if(e.target.pm.enabled()) {
                self.enable();
            }
        });
    },
    _fireEdit: function() {
        this._layerGroup.fireEvent('pm:edit');
    },
    toggleEdit: function() {

        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.toggleEdit();
        }
    },
    enable: function() {
        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.enable();
        }
    },
    disable: function() {
        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.disable();
        }
    },
    enabled: function() {

        var enabled = false;

        for(var i=0; i<this._layers.length; i++) {
            enabled = this._layers[i].pm.enabled();
            if(enabled) {
                break;
            }
        }

        return enabled;
    }
});
