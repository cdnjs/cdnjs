/**
 * Copyright 2011 Ni Huajie <lbt05@gmail.com>
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

function HeatCanvasBaiduLayer(map,options){
    options = options || {};
    this._map = map;
    this.heatmap = null;
    this.setp = options.step || 1;
    this.degree = options.degree || HeatCanvas.LINEAR;
    this.opacity = options.opacity || 0.6;
    this.colorscheme = options.colorscheme || null;
    this.data = [];
    var self = this;
    this._map.addEventListener('dragend',function(){self.draw();});
    this._map.addEventListener('dbclick',function(){self.draw();});
    }

HeatCanvasBaiduLayer.prototype= new BMap.Overlay();

HeatCanvasBaiduLayer.prototype.initialize = function(map) {
     var container = document.createElement("div");
     var size =this._map.getSize();
     container.style.cssText = "position:absolute;top:0;left:0;border:0";
     container.style.width  = "100%";
     container.style.height = "100%";
    
     var canvas = document.createElement("canvas");
     canvas.style.width  = size.width + 'px';
     canvas.style.height = size.height + 'px';
     canvas.width = size.width;
     canvas.height= size.height;
     canvas.style.opacity = this.opacity;
     container.appendChild(canvas);

     this.heatmap = new HeatCanvas(canvas);
     var panes = this._map.getPanes();
     panes.markerPane.appendChild(container);
     this._div = container;
}

HeatCanvasBaiduLayer.prototype.pushData = function (lat, lon,value) {
     this.data.push({"lon":lon, "lat": lat, "v": value});
}

HeatCanvasBaiduLayer.prototype.draw = function() {
     var div = this._div;
     var size = this._map.getSize();
     var sw = this._map.pointToOverlayPixel(this._map.getBounds().getSouthWest());
     var ne = this._map.pointToOverlayPixel(this._map.getBounds().getNorthEast());
     var center= this._map.pointToOverlayPixel(this._map.getCenter());
     div.style.left = sw.x+'px';
     div.style.top  = ne.y+'px';
     div.style.width = size.width+'px';
     div.style.height = size.height +'px';
     this.heatmap.clear();
     if(this.data.length>0) {
        for(var i=0 , l=this.data.length;i<l;i++) {
            latlon = new  BMap.Point(this.data[i].lat, this.data[i].lon);
            localXY = this._map.pointToOverlayPixel(latlon);
            this.heatmap.push(
                    Math.floor(localXY.x-sw.x),
                    Math.floor(localXY.y-ne.y),
                    this.data[i].v);
            }
        }
        this.heatmap.render(this.step, this.degree, this.colorscheme);
    }

