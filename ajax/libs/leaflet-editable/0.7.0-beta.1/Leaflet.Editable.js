'use strict';
(function (factory, window) {
    /*globals define, module, require*/

    // define an AMD module that relies on 'leaflet'
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);


    // define a Common JS module that relies on 'leaflet'
    } else if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    }

    // attach your plugin to the global 'L' variable
    if(typeof window !== 'undefined' && window.L){
        factory(window.L);
    }

}(function (L) {
    L.Editable = L.Evented.extend({

        statics: {
            FORWARD: 1,
            BACKWARD: -1
        },

        options: {
            zIndex: 1000,
            polygonClass: L.Polygon,
            polylineClass: L.Polyline,
            markerClass: L.Marker,
            drawingCSSClass: 'leaflet-editable-drawing',
            drawingCursor: 'crosshair'
        },

        initialize: function (map, options) {
            L.setOptions(this, options);
            this._lastZIndex = this.options.zIndex;
            this.map = map;
            this.editLayer = this.createEditLayer();
            this.featuresLayer = this.createFeaturesLayer();
            this.forwardLineGuide = this.createLineGuide();
            this.backwardLineGuide = this.createLineGuide();
        },

        fireAndForward: function (type, e) {
            e = e || {};
            e.editTools = this;
            this.fire(type, e);
            this.map.fire(type, e);
        },

        createLineGuide: function () {
            var options = L.extend({dashArray: '5,10', weight: 1}, this.options.lineGuideOptions);
            return L.polyline([], options);
        },

        createVertexIcon: function (options) {
            return L.Browser.touch ? new L.Editable.TouchVertexIcon(options) : new L.Editable.VertexIcon(options);
        },

        createEditLayer: function () {
            return this.options.editLayer || new L.LayerGroup().addTo(this.map);
        },

        createFeaturesLayer: function () {
            return this.options.featuresLayer || new L.LayerGroup().addTo(this.map);
        },

        moveForwardLineGuide: function (latlng) {
            if (this.forwardLineGuide._latlngs.length) {
                this.forwardLineGuide._latlngs[1] = latlng;
                this.forwardLineGuide._bounds.extend(latlng);
                this.forwardLineGuide.redraw();
            }
        },

        moveBackwardLineGuide: function (latlng) {
            if (this.backwardLineGuide._latlngs.length) {
                this.backwardLineGuide._latlngs[1] = latlng;
                this.backwardLineGuide._bounds.extend(latlng);
                this.backwardLineGuide.redraw();
            }
        },

        anchorForwardLineGuide: function (latlng) {
            this.forwardLineGuide._latlngs[0] = latlng;
            this.forwardLineGuide._bounds.extend(latlng);
            this.forwardLineGuide.redraw();
        },

        anchorBackwardLineGuide: function (latlng) {
            this.backwardLineGuide._latlngs[0] = latlng;
            this.backwardLineGuide._bounds.extend(latlng);
            this.backwardLineGuide.redraw();
        },

        attachForwardLineGuide: function () {
            this.editLayer.addLayer(this.forwardLineGuide);
        },

        attachBackwardLineGuide: function () {
            this.editLayer.addLayer(this.backwardLineGuide);
        },

        detachForwardLineGuide: function () {
            this.forwardLineGuide._latlngs = [];
            this.editLayer.removeLayer(this.forwardLineGuide);
        },

        detachBackwardLineGuide: function () {
            this.backwardLineGuide._latlngs = [];
            this.editLayer.removeLayer(this.backwardLineGuide);
        },

        registerForDrawing: function (editor) {
            this.map.on('mousemove touchmove', editor.onMouseMove, editor);
            if (this._drawingEditor) this.unregisterForDrawing(this._drawingEditor);
            this._drawingEditor = editor;
            this.map.on('mousedown', this.onMousedown, this);
            this.map.on('mouseup', this.onMouseup, this);
            L.DomUtil.addClass(this.map._container, this.options.drawingCSSClass);
            this.defaultMapCursor = this.map._container.style.cursor;
            this.map._container.style.cursor = this.options.drawingCursor;
        },

        unregisterForDrawing: function (editor) {
            L.DomUtil.removeClass(this.map._container, this.options.drawingCSSClass);
            this.map._container.style.cursor = this.defaultMapCursor;
            editor = editor || this._drawingEditor;
            if (!editor) return;
            this.map.off('mousemove touchmove', editor.onMouseMove, editor);
            this.map.off('mousedown', this.onMousedown, this);
            this.map.off('mouseup', this.onMouseup, this);
            if (editor !== this._drawingEditor) return;
            delete this._drawingEditor;
            if (editor._drawing) editor.cancelDrawing();
        },

        onMousedown: function (e) {
            this._mouseDown = e;
        },

        onMouseup: function (e) {
            if (this._mouseDown) {
                var origin = L.point(this._mouseDown.originalEvent.clientX, this._mouseDown.originalEvent.clientY);
                var distance = L.point(e.originalEvent.clientX, e.originalEvent.clientY)
                    .distanceTo(origin);
                if (Math.abs(distance) < 9 * (window.devicePixelRatio || 1)) {
                    this._drawingEditor.onDrawingClick(e);
                }
            }
            this._mouseDown = null;
        },

        drawing: function () {
            return this._drawingEditor && this._drawingEditor.drawing();
        },

        stopDrawing: function () {
            this.unregisterForDrawing();
        },

        commitDrawing: function (e) {
            if (!this._drawingEditor) return;
            this._drawingEditor.commitDrawing(e);
        },

        connectCreatedToMap: function (layer) {
            return this.featuresLayer.addLayer(layer);
        },

        startPolyline: function (latlng, options) {
            var line = this.createPolyline([], options);
            this.connectCreatedToMap(line);
            line.enableEdit().newShape(latlng);
            return line;
        },

        startPolygon: function (latlng, options) {
            var polygon = this.createPolygon([], options);
            this.connectCreatedToMap(polygon);
            polygon.enableEdit().newShape(latlng);
            return polygon;
        },

        startMarker: function (latlng, options) {
            latlng = latlng || this.map.getCenter();
            var marker = this.createMarker(latlng, options);
            this.connectCreatedToMap(marker);
            var editor = marker.enableEdit();
            editor.startDrawing();
            return marker;
        },

        startHole: function (editor, latlng) {
            editor.newHole(latlng);
        },

        createPolyline: function (latlngs, options) {
            options = L.Util.extend({editOptions: {editTools: this}}, options);
            var line = new this.options.polylineClass(latlngs, options);
            this.fireAndForward('editable:created', {layer: line});
            return line;
        },

        createPolygon: function (latlngs, options) {
            options = L.Util.extend({editOptions: {editTools: this}}, options);
            var polygon = new this.options.polygonClass(latlngs, options);
            this.fireAndForward('editable:created', {layer: polygon});
            return polygon;
        },

        createMarker: function (latlng, options) {
            options = L.Util.extend({editOptions: {editTools: this}}, options);
            var marker = new this.options.markerClass(latlng, options);
            this.fireAndForward('editable:created', {layer: marker});
            return marker;
        }

    });

    L.extend(L.Editable, {

        makeCancellable: function (e) {
            e.cancel = function () {
                e._cancelled = true;
            };
        }

    });

    L.Map.mergeOptions({
        editToolsClass: L.Editable
    });

    L.Map.addInitHook(function () {

        this.whenReady(function () {
            if (this.options.editable) {
                this.editTools = new this.options.editToolsClass(this, this.options.editOptions);
            }
        });

    });

    L.Editable.VertexIcon = L.DivIcon.extend({

        options: {
            iconSize: new L.Point(8, 8)
        }

    });

    L.Editable.TouchVertexIcon = L.Editable.VertexIcon.extend({

        options: {
            iconSize: new L.Point(20, 20)
        }

    });


    L.Editable.VertexMarker = L.Marker.extend({

        options: {
            draggable: true,
            className: 'leaflet-div-icon leaflet-vertex-icon'
        },

        initialize: function (latlng, latlngs, editor, options) {
            this.latlng = latlng;
            this.latlngs = latlngs;
            this.editor = editor;
            L.Marker.prototype.initialize.call(this, latlng, options);
            this.options.icon = this.editor.tools.createVertexIcon({className: this.options.className});
            this.latlng.__vertex = this;
            this.editor.editLayer.addLayer(this);
            this.setZIndexOffset(editor.tools._lastZIndex + 1);
        },

        onAdd: function (map) {
            L.Marker.prototype.onAdd.call(this, map);
            this.on('drag', this.onDrag);
            this.on('dragstart', this.onDragStart);
            this.on('dragend', this.onDragEnd);
            this.on('mouseup', this.onMouseup);
            this.on('click', this.onClick);
            this.on('contextmenu', this.onContextMenu);
            this.on('mousedown touchstart', this.onMouseDown);
            this.addMiddleMarkers();
        },

        onRemove: function (map) {
            if (this.middleMarker) this.middleMarker.delete();
            delete this.latlng.__vertex;
            this.off('drag', this.onDrag);
            this.off('dragstart', this.onDragStart);
            this.off('dragend', this.onDragEnd);
            this.off('mouseup', this.onMouseup);
            this.off('click', this.onClick);
            this.off('contextmenu', this.onContextMenu);
            this.off('mousedown touchstart', this.onMouseDown);
            L.Marker.prototype.onRemove.call(this, map);
        },

        onDrag: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerDrag(e);
            var iconPos = L.DomUtil.getPosition(this._icon),
                latlng = this._map.layerPointToLatLng(iconPos);
            this.latlng.lat = latlng.lat;
            this.latlng.lng = latlng.lng;
            this.editor.refresh();
            if (this.middleMarker) {
                this.middleMarker.updateLatLng();
            }
            var next = this.getNext();
            if (next && next.middleMarker) {
                next.middleMarker.updateLatLng();
            }
        },

        onDragStart: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerDragStart(e);
        },

        onDragEnd: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerDragEnd(e);
        },

        onClick: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerClick(e);
        },

        onMouseup: function (e) {
            L.DomEvent.stop(e);
            e.vertex = this;
            this.editor.map.fire('mouseup', e);
        },

        onContextMenu: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerContextMenu(e);
        },

        onMouseDown: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerMouseDown(e);
        },

        delete: function () {
            var next = this.getNext();  // Compute before changing latlng
            this.latlngs.splice(this.latlngs.indexOf(this.latlng), 1);
            this.editor.editLayer.removeLayer(this);
            this.editor.onVertexDeleted({latlng: this.latlng, vertex: this});
            if (!this.latlngs.length) this.editor.deleteShape(this.latlngs);
            if (next) next.resetMiddleMarker();
            this.editor.refresh();
        },

        getIndex: function () {
            return this.latlngs.indexOf(this.latlng);
        },

        getLastIndex: function () {
            return this.latlngs.length - 1;
        },

        getPrevious: function () {
            if (this.latlngs.length < 2) return;
            var index = this.getIndex(),
                previousIndex = index - 1;
            if (index === 0 && this.editor.CLOSED) previousIndex = this.getLastIndex();
            var previous = this.latlngs[previousIndex];
            if (previous) return previous.__vertex;
        },

        getNext: function () {
            if (this.latlngs.length < 2) return;
            var index = this.getIndex(),
                nextIndex = index + 1;
            if (index === this.getLastIndex() && this.editor.CLOSED) nextIndex = 0;
            var next = this.latlngs[nextIndex];
            if (next) return next.__vertex;
        },

        addMiddleMarker: function (previous) {
            if (this.editor.tools.options.skipMiddleMarkers) return;
            previous = previous || this.getPrevious();
            if (previous && !this.middleMarker) this.middleMarker = this.editor.addMiddleMarker(previous, this, this.latlngs, this.editor);
        },

        addMiddleMarkers: function () {
            if (this.editor.tools.options.skipMiddleMarkers) return;
            var previous = this.getPrevious();
            if (previous) {
                this.addMiddleMarker(previous);
            }
            var next = this.getNext();
            if (next) {
                next.resetMiddleMarker();
            }
        },

        resetMiddleMarker: function () {
            if (this.middleMarker) this.middleMarker.delete();
            this.addMiddleMarker();
        },

        split: function () {
            if (!this.editor.splitShape) return;  // Only for PolylineEditor
            this.editor.splitShape(this.latlngs, this.getIndex());
        },

        continue: function () {
            if (!this.editor.continueBackward) return;  // Only for PolylineEditor
            var index = this.getIndex();
            if (index === 0) this.editor.continueBackward(this.latlngs);
            else if (index === this.getLastIndex()) this.editor.continueForward(this.latlngs);
        }

    });

    L.Editable.mergeOptions({
        vertexMarkerClass: L.Editable.VertexMarker
    });

    L.Editable.MiddleMarker = L.Marker.extend({

        options: {
            opacity: 0.5,
            className: 'leaflet-div-icon leaflet-middle-icon',
            draggable: true
        },

        initialize: function (left, right, latlngs, editor, options) {
            this.left = left;
            this.right = right;
            this.editor = editor;
            this.latlngs = latlngs;
            L.Marker.prototype.initialize.call(this, this.computeLatLng(), options);
            this._opacity = this.options.opacity;
            this.options.icon = this.editor.tools.createVertexIcon({className: this.options.className});
            this.editor.editLayer.addLayer(this);
            this.setVisibility();
        },

        setVisibility: function () {
            var leftPoint = this._map.latLngToContainerPoint(this.left.latlng),
                rightPoint = this._map.latLngToContainerPoint(this.right.latlng),
                size = L.point(this.options.icon.options.iconSize);
            if (leftPoint.distanceTo(rightPoint) < size.x * 3) {
                this.hide();
            } else {
                this.show();
            }
        },

        show: function () {
            this.setOpacity(this._opacity);
        },

        hide: function () {
            this.setOpacity(0);
        },

        updateLatLng: function () {
            this.setLatLng(this.computeLatLng());
            this.setVisibility();
        },

        computeLatLng: function () {
            var leftPoint = this.editor.map.latLngToContainerPoint(this.left.latlng),
                rightPoint = this.editor.map.latLngToContainerPoint(this.right.latlng),
                y = (leftPoint.y + rightPoint.y) / 2,
                x = (leftPoint.x + rightPoint.x) / 2;
            return this.editor.map.containerPointToLatLng([x, y]);
        },

        onAdd: function (map) {
            L.Marker.prototype.onAdd.call(this, map);
            L.DomEvent.on(this._icon, 'mousedown touchstart', this.onMouseDown, this);
            map.on('zoomend', this.setVisibility, this);
        },

        onRemove: function (map) {
            delete this.right.middleMarker;
            L.DomEvent.off(this._icon, 'mousedown touchstart', this.onMouseDown, this);
            map.off('zoomend', this.setVisibility, this);
            L.Marker.prototype.onRemove.call(this, map);
        },

        onMouseDown: function (e) {
            var iconPos = L.DomUtil.getPosition(this._icon),
                latlng = this.editor.map.layerPointToLatLng(iconPos);
            e = {
                originalEvent: e,
                latlng: latlng
            };
            if (this.options.opacity === 0) return;
            L.Editable.makeCancellable(e);
            this.editor.onMiddleMarkerMouseDown(e);
            if (e._cancelled) return;
            this.latlngs.splice(this.index(), 0, e.latlng);
            this.editor.refresh();
            var icon = this._icon;
            var marker = this.editor.addVertexMarker(e.latlng, this.latlngs);
            /* Hack to workaround browser not firing touchend when element is no more on DOM */
            var parent = marker._icon.parentNode;
            parent.removeChild(marker._icon);
            marker._icon = icon;
            parent.appendChild(marker._icon);
            marker._initIcon();
            marker._initInteraction();
            marker.setOpacity(1);
            /* End hack */
            // Transfer ongoing dragging to real marker
            L.Draggable._dragging = false;
            marker.dragging._draggable._onDown(e.originalEvent);
            this.delete();
        },

        delete: function () {
            this.editor.editLayer.removeLayer(this);
        },

        index: function () {
            return this.latlngs.indexOf(this.right.latlng);
        }

    });

    L.Editable.mergeOptions({
        middleMarkerClass: L.Editable.MiddleMarker
    });

    L.Editable.BaseEditor = L.Class.extend({

        initialize: function (map, feature, options) {
            L.setOptions(this, options);
            this.map = map;
            this.feature = feature;
            this.feature.editor = this;
            this.editLayer = new L.LayerGroup();
            this.tools = this.options.editTools || map.editTools;
        },

        enable: function () {
            if (this._enabled) return this;
            this.tools.editLayer.addLayer(this.editLayer);
            this.onEnable();
            this._enabled = true;
            this.feature.on('remove', this.disable, this);
            return this;
        },

        disable: function () {
            this.feature.off('remove', this.disable, this);
            this.editLayer.clearLayers();
            this.tools.editLayer.removeLayer(this.editLayer);
            this.onDisable();
            delete this._enabled;
            if (this._drawing) this.cancelDrawing();
            return this;
        },

        drawing: function () {
            return !!this._drawing;
        },

        fireAndForward: function (type, e) {
            e = e || {};
            e.layer = this.feature;
            this.feature.fire(type, e);
            this.tools.fireAndForward(type, e);
        },

        onEnable: function () {
            this.fireAndForward('editable:enable');
        },

        onDisable: function () {
            this.fireAndForward('editable:disable');
        },

        onEditing: function () {
            this.fireAndForward('editable:editing');
        },

        onStartDrawing: function () {
            this.fireAndForward('editable:drawing:start');
        },

        onEndDrawing: function () {
            this.fireAndForward('editable:drawing:end');
        },

        onCancelDrawing: function () {
            this.fireAndForward('editable:drawing:cancel');
        },

        onCommitDrawing: function (e) {
            this.fireAndForward('editable:drawing:commit', e);
        },

        startDrawing: function () {
            if (!this._drawing) this._drawing = L.Editable.FORWARD;
            this.tools.registerForDrawing(this);
            this.onStartDrawing();
        },

        commitDrawing: function (e) {
            this.onCommitDrawing(e);
            this.endDrawing();
        },

        cancelDrawing: function () {
            this.onCancelDrawing();
            this.endDrawing();
        },

        endDrawing: function () {
            this._drawing = false;
            this.tools.unregisterForDrawing(this);
            this.onEndDrawing();
        },

        onDrawingClick: function (e) {
            if (!this.drawing) return;
            L.Editable.makeCancellable(e);
            this.fireAndForward('editable:drawing:click', e);
            if (e._cancelled) return;
            this.processDrawingClick(e);
        },

        onMove: function (e) {
            this.fireAndForward('editable:drawing:move', e);
        },

        onMouseMove: function (e) {
            this.onMove(e);
        }

    });

    L.Editable.MarkerEditor = L.Editable.BaseEditor.extend({

        enable: function () {
            if (this._enabled) return this;
            L.Editable.BaseEditor.prototype.enable.call(this);
            this.feature.dragging.enable();
            this.feature.on('dragstart', this.onEditing, this);
            this.feature.on('drag', this.onMove, this);
            return this;
        },

        disable: function () {
            L.Editable.BaseEditor.prototype.disable.call(this);
            this.feature.dragging.disable();
            this.feature.off('dragstart', this.onEditing, this);
            this.feature.off('drag', this.onMove, this);
            return this;
        },

        onMouseMove: function (e) {
            L.Editable.BaseEditor.prototype.onMouseMove.call(this, e);
            if (this._drawing) {
                this.feature.setLatLng(e.latlng);
            }
        },

        processDrawingClick: function (e) {
            this.fireAndForward('editable:drawing:clicked', e);
            this.commitDrawing(e);
        }

    });

    L.Editable.PathEditor = L.Editable.BaseEditor.extend({

        CLOSED: false,
        MIN_VERTEX: 2,

        enable: function () {
            if (this._enabled) return this;
            L.Editable.BaseEditor.prototype.enable.call(this);
            if (this.feature) {
                this.initVertexMarkers();
            }
            return this;
        },

        disable: function () {
            return L.Editable.BaseEditor.prototype.disable.call(this);
        },

        initVertexMarkers: function (latlngs) {
            latlngs = latlngs || this.getLatLngs();
            if (L.Polyline._flat(latlngs)) {
                this.addVertexMarkers(latlngs);
            } else {
                for (var i = 0; i < latlngs.length; i++) {
                    this.initVertexMarkers(latlngs[i]);
                }
            }
        },

        getLatLngs: function () {
            return this.feature.getLatLngs();
        },

        reset: function () {
            this.editLayer.clearLayers();
            this.initVertexMarkers();
        },

        addVertexMarker: function (latlng, latlngs) {
            return new this.tools.options.vertexMarkerClass(latlng, latlngs, this);
        },

        addVertexMarkers: function (latlngs) {
            for (var i = 0; i < latlngs.length; i++) {
                this.addVertexMarker(latlngs[i], latlngs);
            }
        },

        addMiddleMarker: function (left, right, latlngs) {
            return new this.tools.options.middleMarkerClass(left, right, latlngs, this);
        },

        onVertexMarkerClick: function (e) {
            L.Editable.makeCancellable(e);
            this.fireAndForward('editable:vertex:click', e);
            if (e._cancelled) return;
            if (this.tools.drawing() && this.tools._drawingEditor !== this) return;
            var index = e.vertex.getIndex(), commit;
            if (e.originalEvent.ctrlKey) {
                this.onVertexMarkerCtrlClick(e);
            } else if (e.originalEvent.altKey) {
                this.onVertexMarkerAltClick(e);
            } else if (e.originalEvent.shiftKey) {
                this.onVertexMarkerShiftClick(e);
            } else if (e.originalEvent.metaKey) {
                this.onVertexMarkerMetaKeyClick(e);
            } else if (index === e.vertex.getLastIndex() && this._drawing === L.Editable.FORWARD) {
                if (index >= this.MIN_VERTEX - 1) commit = true;
            } else if (index === 0 && this._drawing === L.Editable.BACKWARD && this._drawnLatLngs.length >= this.MIN_VERTEX) {
                commit = true;
            } else if (index === 0 && this._drawing === L.Editable.FORWARD && this._drawnLatLngs.length >= this.MIN_VERTEX && this.CLOSED) {
                commit = true;  // Allow to close on first point also for polygons
            } else {
                this.onVertexRawMarkerClick(e);
            }
            this.fireAndForward('editable:vertex:clicked', e);
            if (commit) this.commitDrawing(e);
        },

        onVertexRawMarkerClick: function (e) {
            this.fireAndForward('editable:vertex:rawclick', e);
            if (e._cancelled) return;
            if (!this.vertexCanBeDeleted(e.vertex)) return;
            e.vertex.delete();
        },

        vertexCanBeDeleted: function (vertex) {
            return vertex.latlngs.length > this.MIN_VERTEX;
        },

        onVertexDeleted: function (e) {
            this.fireAndForward('editable:vertex:deleted', e);
        },

        onVertexMarkerCtrlClick: function (e) {
            this.fireAndForward('editable:vertex:ctrlclick', e);
        },

        onVertexMarkerShiftClick: function (e) {
            this.fireAndForward('editable:vertex:shiftclick', e);
        },

        onVertexMarkerMetaKeyClick: function (e) {
            this.fireAndForward('editable:vertex:metakeyclick', e);
        },

        onVertexMarkerAltClick: function (e) {
            this.fireAndForward('editable:vertex:altclick', e);
        },

        onVertexMarkerContextMenu: function (e) {
            this.fireAndForward('editable:vertex:contextmenu', e);
        },

        onVertexMarkerMouseDown: function (e) {
            this.fireAndForward('editable:vertex:mousedown', e);
        },

        onMiddleMarkerMouseDown: function (e) {
            this.fireAndForward('editable:middlemarker:mousedown', e);
        },

        onVertexMarkerDrag: function (e) {
            this.onMove(e);
            this.feature._bounds.extend(e.vertex._latlng);
            this.fireAndForward('editable:vertex:drag', e);
        },

        onVertexMarkerDragStart: function (e) {
            this.fireAndForward('editable:vertex:dragstart', e);
        },

        onVertexMarkerDragEnd: function (e) {
            this.fireAndForward('editable:vertex:dragend', e);
        },

        setDrawnLatLngs: function (latlngs) {
            this._drawnLatLngs = latlngs || this.getDefaultLatLngs();
        },

        startDrawing: function () {
            if (!this._drawnLatLngs) this.setDrawnLatLngs();
            L.Editable.BaseEditor.prototype.startDrawing.call(this);
        },

        startDrawingForward: function () {
            this.startDrawing();
            this.tools.attachForwardLineGuide();
        },

        endDrawing: function () {
            this.tools.detachForwardLineGuide();
            this.tools.detachBackwardLineGuide();
            if (this._drawnLatLngs && this._drawnLatLngs.length < this.MIN_VERTEX) this.deleteShape(this._drawnLatLngs);
            L.Editable.BaseEditor.prototype.endDrawing.call(this);
            delete this._drawnLatLngs;
        },

        addLatLng: function (latlng) {
            if (this._drawing === L.Editable.FORWARD) this._drawnLatLngs.push(latlng);
            else this._drawnLatLngs.unshift(latlng);
            this.feature._bounds.extend(latlng);
            this.addVertexMarker(latlng, this._drawnLatLngs);
            this.refresh();
        },

        newPointForward: function (latlng) {
            this.addLatLng(latlng);
            this.tools.anchorForwardLineGuide(latlng);
            if (!this.tools.backwardLineGuide._latlngs[0]) {
                this.tools.anchorBackwardLineGuide(latlng);
            }
        },

        newPointBackward: function (latlng) {
            this.addLatLng(latlng);
            this.tools.anchorBackwardLineGuide(latlng);
        },

        push: function (latlng) {
            if (!latlng) return console.error('L.Editable.PathEditor.push expect a vaild latlng as parameter');
            if (this._drawing === L.Editable.FORWARD) this.newPointForward(latlng);
            else this.newPointBackward(latlng);
        },

        removeLatLng: function (latlng) {
            latlng.__vertex.delete();
            this.refresh();
        },

        pop: function () {
            if (this._drawnLatLngs.length <= 1) return;
            var latlng;
            if (this._drawing === L.Editable.FORWARD) latlng = this._drawnLatLngs[this._drawnLatLngs.length - 1];
            else latlng = this._drawnLatLngs[0];
            this.removeLatLng(latlng);
            if (this._drawing === L.Editable.FORWARD) this.tools.anchorForwardLineGuide(this._drawnLatLngs[this._drawnLatLngs.length - 1]);
            else this.tools.anchorForwardLineGuide(this._drawnLatLngs[0]);
            return latlng;
        },

        processDrawingClick: function (e) {
            if (e.vertex && e.vertex.editor === this) return;
            if (this._drawing === L.Editable.FORWARD) this.newPointForward(e.latlng);
            else this.newPointBackward(e.latlng);
            this.fireAndForward('editable:drawing:clicked', e);
        },

        onMouseMove: function (e) {
            L.Editable.BaseEditor.prototype.onMouseMove.call(this, e);
            if (this._drawing) {
                this.tools.moveForwardLineGuide(e.latlng);
                this.tools.moveBackwardLineGuide(e.latlng);
            }
        },

        refresh: function () {
            this.feature.redraw();
            this.onEditing();
        },

        newShape: function (latlng) {
            var shape = this.addNewEmptyShape();
            if (!shape) return;
            this.setDrawnLatLngs(shape[0] || shape);  // Polygon or polyline
            this.startDrawingForward();
            this.fireAndForward('editable:shape:new', {shape: shape});
            if (latlng) this.newPointForward(latlng);
        },

        deleteShape: function (shape, latlngs) {
            latlngs = latlngs || this.getLatLngs();
            if (!latlngs.length) return;
            var e, self = this,
                inplaceDelete = function (latlngs, shape) {
                    // Called when deleting a flat latlngs
                    shape = latlngs.splice(0, Number.MAX_VALUE);
                    return shape;
                },
                spliceDelete = function (latlngs, shape) {
                    // Called when removing a latlngs inside an array
                    latlngs.splice(latlngs.indexOf(shape), 1);
                    return shape;
                },
                doDelete = function (callback, shape) {
                    e = {shape: shape};
                    L.Editable.makeCancellable(e);
                    self.fireAndForward('editable:shape:delete', e);
                    if (e._cancelled) return;
                    shape = callback(latlngs, shape);
                    if (self.ensureNotFlat) self.ensureNotFlat();  // Polygon
                    self.refresh();
                    self.reset();
                    self.fireAndForward('editable:shape:deleted', {shape: shape});
                    return shape;
                };
            if (latlngs === shape) return doDelete(inplaceDelete, shape);
            for (var i = 0; i < latlngs.length; i++) {
                if (latlngs[i] === shape) return doDelete(spliceDelete, shape);
                else if (L.Util.indexOf(latlngs[i], shape) !== -1) return doDelete(spliceDelete, latlngs[i]);
            }
        },

        deleteShapeAt: function (latlng) {
            var shape = this.feature.shapeAt(latlng);
            if (shape) return this.deleteShape(shape);
        },

        appendShape: function (shape) {
            this.insertShape(shape);
        },

        prependShape: function (shape) {
            this.insertShape(shape, 0);
        },

        insertShape: function (shape, index) {
            this.ensureMulti();
            shape = this.formatShape(shape);
            if (typeof index === 'undefined') index = this.feature._latlngs.length;
            this.feature._latlngs.splice(index, 0, shape);
            this.feature.redraw();
            if (this._enabled) this.reset();
        }

    });

    L.Editable.PolylineEditor = L.Editable.PathEditor.extend({

        startDrawingBackward: function (latlngs) {
            this._drawing = L.Editable.BACKWARD;
            this.startDrawing(latlngs);
            this.tools.attachBackwardLineGuide();
        },

        continueBackward: function (latlngs) {
            latlngs = latlngs || this.getDefaultLatLngs();
            this.setDrawnLatLngs(latlngs);
            this.tools.anchorBackwardLineGuide(latlngs[0]);
            this.startDrawingBackward();
        },

        continueForward: function (latlngs) {
            latlngs = latlngs || this.getDefaultLatLngs();
            this.setDrawnLatLngs(latlngs);
            this.tools.anchorForwardLineGuide(latlngs[latlngs.length - 1]);
            this.startDrawingForward();
        },

        getDefaultLatLngs: function (latlngs) {
            latlngs = latlngs || this.feature._latlngs;
            if (!latlngs.length || latlngs[0] instanceof L.LatLng) return latlngs;
            else return this.getDefaultLatLngs(latlngs[0]);
        },

        ensureMulti: function () {
            if (this.feature._latlngs.length && L.Polyline._flat(this.feature._latlngs)) {
                this.feature._latlngs = [this.feature._latlngs];
            }
        },

        addNewEmptyShape: function () {
            if (this.feature._latlngs.length) {
                var shape = [];
                this.appendShape(shape);
                return shape;
            } else {
                return this.feature._latlngs;
            }
        },

        formatShape: function (shape) {
            if (L.Polyline._flat(shape)) return shape;
            else if (shape[0]) return this.formatShape(shape[0]);
        },

        splitShape: function (shape, index) {
            if (!index || index >= shape.length - 1) return;
            this.ensureMulti();
            var shapeIndex = this.feature._latlngs.indexOf(shape);
            if (shapeIndex === -1) return;
            var first = shape.slice(0, index + 1),
                second = shape.slice(index);
            // We deal with reference, we don't want twice the same latlng around.
            second[0] = L.latLng(second[0].lat, second[0].lng, second[0].alt);
            this.feature._latlngs.splice(shapeIndex, 1, first, second);
            this.refresh();
            this.reset();
        }

    });

    L.Editable.PolygonEditor = L.Editable.PathEditor.extend({

        CLOSED: true,
        MIN_VERTEX: 3,

        startDrawingForward: function () {
            L.Editable.PathEditor.prototype.startDrawingForward.call(this);
            this.tools.attachBackwardLineGuide();
        },

        addNewEmptyHole: function (latlng) {
            this.ensureNotFlat();
            var latlngs = this.feature.shapeAt(latlng);
            if (!latlngs) return;
            var holes = [];
            latlngs.push(holes);
            return holes;
        },

        newHole: function (latlng) {
            var holes = this.addNewEmptyHole(latlng);
            if (!holes) return;
            this.setDrawnLatLngs(holes);
            this.startDrawingForward();
            if (latlng) this.newPointForward(latlng);
        },

        addNewEmptyShape: function () {
            if (this.feature._latlngs.length && this.feature._latlngs[0].length) {
                var shape = [];
                this.appendShape(shape);
                return shape;
            } else {
                return this.feature._latlngs;
            }
        },

        ensureMulti: function () {
            if (this.feature._latlngs.length && L.Polyline._flat(this.feature._latlngs[0])) {
                this.feature._latlngs = [this.feature._latlngs];
            }
        },

        ensureNotFlat: function () {
            if (!this.feature._latlngs.length || L.Polyline._flat(this.feature._latlngs)) this.feature._latlngs = [this.feature._latlngs];
        },

        vertexCanBeDeleted: function (vertex) {
            if (vertex.latlngs === this.getLatLngs()) return L.Editable.PathEditor.prototype.vertexCanBeDeleted.call(this, vertex);
            else return true;  // Holes can be totally deleted without removing the layer itself
        },

        getDefaultLatLngs: function () {
            if (!this.feature._latlngs.length) this.feature._latlngs.push([]);
            return this.feature._latlngs[0];
        },

        formatShape: function (shape) {
            // [[1, 2], [3, 4]] => must be nested
            // [] => must be nested
            // [[]] => is already nested
            if (L.Polyline._flat(shape) && (!shape[0] || shape[0].length !== 0)) return [shape];
            else return shape;
        }

    });


    var EditableMixin = {

        createEditor: function (map) {
            map = map || this._map;
            var Klass = this.options.editorClass || this.getEditorClass(map);
            return new Klass(map, this, this.options.editOptions);
        },

        enableEdit: function () {
            if (!this.editor) this.createEditor();
            return this.editor.enable();
        },

        editEnabled: function () {
            return this.editor && this.editor._enabled;
        },

        disableEdit: function () {
            if (this.editor) {
                this.editor.disable();
                delete this.editor;
            }
        },

        toggleEdit: function () {
            if (this.editEnabled()) {
                this.disableEdit();
            } else {
                this.enableEdit();
            }
        }

    };

    L.Polyline.include(EditableMixin);
    L.Polygon.include(EditableMixin);
    L.Marker.include(EditableMixin);

    L.Polyline.include({

        getEditorClass: function (map) {
            return (map && map.options.polylineEditorClass) ? map.options.polylineEditorClass : L.Editable.PolylineEditor;
        },

        shapeAt: function (latlng, latlngs) {
            // We can have those cases:
            // - latlngs are just a flat array of latlngs, use this
            // - latlngs is an array of arrays of latlngs, loop over
            var shape = null;
            latlngs = latlngs || this._latlngs;
            if (!latlngs.length) return shape;
            else if (L.Polyline._flat(latlngs) && this.isInLatLngs(latlng, latlngs)) shape = latlngs;
            else for (var i = 0; i < latlngs.length; i++) if (this.isInLatLngs(latlng, latlngs[i])) return latlngs[i];
            return shape;
        },

        isInLatLngs: function (l, latlngs) {
            if (!latlngs) return false;
            var i, k, len, part = [], p,
                w = this._clickTolerance();
            this._projectLatlngs(latlngs, part);
            part = part[0];
            p = this._map.latLngToLayerPoint(l);

            if (!this._pxBounds.contains(p)) { return false; }
            for (i = 1, len = part.length, k = 0; i < len; k = i++) {

                if (L.LineUtil.pointToSegmentDistance(p, part[k], part[i]) <= w) {
                    return true;
                }
            }
            return false;
        }

    });

    L.Polygon.include({

        getEditorClass: function (map) {
            return (map && map.options.polygonEditorClass) ? map.options.polygonEditorClass : L.Editable.PolygonEditor;
        },

        shapeAt: function (latlng, latlngs) {
            // We can have those cases:
            // - latlngs are just a flat array of latlngs, use this
            // - latlngs is an array of arrays of latlngs, this is a simple polygon (maybe with holes), use the first
            // - latlngs is an array of arrays of arrays, this is a multi, loop over
            var shape = null;
            latlngs = latlngs || this._latlngs;
            if (!latlngs.length) return shape;
            else if (L.Polyline._flat(latlngs) && this.isInLatLngs(latlng, latlngs)) shape = latlngs;
            else if (L.Polyline._flat(latlngs[0]) && this.isInLatLngs(latlng, latlngs[0])) shape = latlngs;
            else for (var i = 0; i < latlngs.length; i++) if (this.isInLatLngs(latlng, latlngs[i][0])) return latlngs[i];
            return shape;
        },

        isInLatLngs: function (l, latlngs) {
            var inside = false, l1, l2, j, k, len2;

            for (j = 0, len2 = latlngs.length, k = len2 - 1; j < len2; k = j++) {
                l1 = latlngs[j];
                l2 = latlngs[k];

                if (((l1.lat > l.lat) !== (l2.lat > l.lat)) &&
                        (l.lng < (l2.lng - l1.lng) * (l.lat - l1.lat) / (l2.lat - l1.lat) + l1.lng)) {
                    inside = !inside;
                }
            }

            return inside;
        }

    });

    L.Marker.include({

        getEditorClass: function (map) {
            return (map && map.options.markerEditorClass) ? map.options.markerEditorClass : L.Editable.MarkerEditor;
        }

    });

}, window));
