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



    },
    enableDraw: function(options) {

        L.PM.Draw.Poly.enable(options.map);

    },
    addControls: function(map) {

        var drawPolyButton = {
              'iconUrl': 'assets/icons/polygon.png',
              'onClick': function() {

              },
              'afterClick': function(e) {

                  if(this.toggled()) {
                      L.PM.enableDraw({
                          map: map
                      });
                  } else {
                     map.disableDraw();
                  }
              },
              'doToggle': true,
              'toggleStatus': false
        };

        var myButton = new L.Control.PMButton(drawPolyButton).addTo(map);

        map.on('pm:create', function() {
            // fire button click to toggle / disable
            myButton._clicked();
        });

        return [myButton];

    },
    Edit: {},
    Draw: {}
};

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
            'iconUrl': options.iconUrl,
            'onClick': options.onClick,
            'afterClick': options.afterClick,
            'doToggle': options.doToggle,
            'toggleStatus': false
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
    _makeButton: function (button) {

        var newButton = L.DomUtil.create('div', 'leaflet-buttons-control-button', this._container);
        if(button.toggleStatus)
            L.DomUtil.addClass(newButton,'active');

        var image = L.DomUtil.create('img', 'control-icon', newButton);

        L.DomEvent
            .addListener(newButton, 'click', L.DomEvent.stop)
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

L.PM.Draw.Poly = {

    enable: function(map) {

        var self = this;

        this._map = map;

        this._layerGroup = new L.LayerGroup();
        this._layerGroup.addTo(this._map);

        this._polyline = L.polyline([], {color: 'red'});
        this._layerGroup.addLayer(this._polyline);

        this._map._container.style.cursor = 'crosshair';

        this._map.on('click', this._createPolygonPoint, this);

        this._map.disableDraw = function() {
            self.disable();
        };

    },
    disable: function() {

        this._map._container.style.cursor = 'default';

        this._map.off('click', this._createPolygonPoint);

        this._map.removeLayer(this._layerGroup);

    },
    _createPolygonPoint: function(e) {

        // is this the first point?
        var first = this._polyline.getLatLngs().length === 0 ? true : false;

        this._polyline.addLatLng(e.latlng);
        this._createMarker(e.latlng, first);

    },
    _finishPolygon: function() {

        var coords = this._polyline.getLatLngs();
        var polygonLayer = L.polygon(coords).addTo(this._map);

        polygonLayer.pm.toggleEdit();

        this.disable();

        this._map.fireEvent('pm:create', polygonLayer);
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
};

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

        if(!this.enabled()) {
            this._enabled = true;

            if(!this._markerGroup) {
                this._markerGroup = new L.LayerGroup();

                // init dragable markers
                this._initMarkers();
            }

            this._poly._map.addLayer(this._markerGroup);
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

    _createMiddleMarker: function(leftM, rightM) {
        var self = this;
        var latlng = this._calcMiddleLatLng(leftM, rightM);

        var middleMarker = this._createMarker(latlng);
        var icon = L.divIcon({className: 'marker-icon marker-icon-middle'})
        middleMarker.setIcon(icon);

        // save middle markers to the other markers
        leftM._middleMarkerRight = middleMarker;
        rightM._middleMarkerLeft = middleMarker;


        middleMarker.on('dragstart', function() {
            self._addMarker(middleMarker, leftM, rightM);
        });
        middleMarker.on('click', function() {
            self._addMarker(middleMarker, leftM, rightM);
        });


    },

    _addMarker: function(newM, leftM, rightM) {

        // first, make this middlemarker a regular marker
        var icon = L.divIcon({className: 'marker-icon'})
        newM.setIcon(icon);
        newM.off('dragstart');
        newM.off('click');

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
        this._poly.fireEvent('pm:edit');
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

        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].on('pm:edit', this._fireEdit, this);
        }
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
