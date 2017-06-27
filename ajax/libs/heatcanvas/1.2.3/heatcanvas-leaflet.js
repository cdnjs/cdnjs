/**
 * Copyright 2010 Sun Ning <classicning@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

L.TileLayer.HeatCanvas = L.Class.extend({

    initialize: function(options, heatCanvasOptions){
        this.heatCanvasOptions = heatCanvasOptions;
        this.data= [];
        this._onRenderingStart = null;
        this._onRenderingEnd = null;
    },

    onRenderingStart: function(cb){
        this._onRenderingStart = cb;
    },

    onRenderingEnd: function(cb) {
        this._onRenderingEnd = cb;
    },

    onAdd: function(map) {
        this.map = map;
        this._initHeatCanvas(this.map, this.heatCanvasOptions);
        map.on("viewreset", this._redraw, this);
        map.on("moveend", this._redraw, this);
        map.on("dragend", this._redraw, this);
        map.on("zoomend", this._redraw, this);
        this._redraw();
    },

    onRemove: function(map) {
        map.getPanes().overlayPane.removeChild(this._div);
        map.off("viewreset", this._redraw, this);
        map.off("moveend", this._redraw, this);
        map.off("dragend", this._redraw, this);
        map.off("zoomend", this._redraw, this);
    },

    _initHeatCanvas: function(map, options){
        options = options || {};                        
        this._step = options.step || 1;
        this._degree = options.degree || HeatCanvas.LINEAR;
        this._opacity = options.opacity || 0.6;
        this._colorscheme = options.colorscheme || null;

        var container = L.DomUtil.create('div', 'leaflet-heatmap-container');
        container.style.position = 'absolute';
        container.style.width = this.map.getSize().x+"px";
        container.style.height = this.map.getSize().y+"px";

        var canv = document.createElement("canvas");
        canv.style.width = this.map.getSize().x+"px";
        canv.style.height = this.map.getSize().y+"px";
        canv.width = parseInt(canv.style.width);
        canv.height = parseInt(canv.style.height);
        canv.style.opacity = this._opacity;
        container.appendChild(canv);

        this.heatmap = new HeatCanvas(canv);
        this.heatmap.onRenderingStart = this._onRenderingStart;
        this.heatmap.onRenderingEnd = this._onRenderingEnd;
        this._div = container;
        this.map.getPanes().overlayPane.appendChild(this._div);
    },

    pushData: function(lat, lon, value) {
        this.data.push({"lon":lon, "lat":lat, "v":value});
    },
    
    _resetCanvasPosition: function() {
        var bounds = this.map.getBounds();
        var topLeft = this.map.latLngToLayerPoint(bounds.getNorthWest());
        //topLeft = this.map.layerPointToContainerPoint(topLeft);

        L.DomUtil.setPosition(this._div, topLeft);
    },

    _redraw: function() {
        this._resetCanvasPosition();
        this.heatmap.clear();
        if (this.data.length > 0) {
            for (var i=0, l=this.data.length; i<l; i++) {
                var lonlat = new L.LatLng(this.data[i].lat, this.data[i].lon);
                var localXY = this.map.latLngToLayerPoint(lonlat);
                localXY = this.map.layerPointToContainerPoint(localXY);
                this.heatmap.push(
                        Math.floor(localXY.x), 
                        Math.floor(localXY.y), 
                        this.data[i].v);
            }

            this.heatmap.render(this._step, this._degree, this._colorscheme);
        }
        return this;
    },

    clear: function(){
        this.heatmap.clear();
    },

    redraw: function(){
        this._redraw();
    }

});
