/**
 * Copyright 2010-2011 Sun Ning <classicning@gmail.com>
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

/**
 * Heatmap api based on canvas
 *
 */
var HeatCanvas = function(canvas){
    if (typeof(canvas) == "string") {
        this.canvas = document.getElementById(canvas);
    } else {
        this.canvas = canvas;
    }
    if(this.canvas == null){
        return null;
    }
    
    this.worker = new Worker(HeatCanvas.getPath()+'heatcanvas-worker.js');
    
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.onRenderingStart = null;
    this.onRenderingEnd = null;
    
    this.data = {};
};

HeatCanvas.prototype.resize = function( w, h ) {
  this.width = this.canvas.width = w;
  this.height = this.canvas.height = h;

  this.canvas.style.width = w + 'px';
  this.canvas.style.height = h + 'px';
};

HeatCanvas.prototype.push = function(x, y, data){
    // ignore all data out of extent
    if (x < 0 || x > this.width) {
        return ;
    }
    if (y < 0 || y > this.height) {
        return;
    }

    var id = x+y*this.width;
    if(this.data[id]){
        this.data[id] = this.data[id] + data;           
    } else {
        this.data[id] = data;
    }
};

HeatCanvas.prototype.render = function(step, degree, f_value_color){
    step = step || 1;
    degree = degree || HeatCanvas.LINEAR ;

    var self = this;
    this.worker.onmessage = function(e){
        self.value = e.data.value;
        self.data = {};
        self._render(f_value_color);
        if (self.onRenderingEnd){
            self.onRenderingEnd();
        }
    }
    var msg = {
        'data': self.data,
        'width': self.width,
        'height': self.height,
        'step': step,
        'degree': degree,
        'value': self.value
    };
    this.worker.postMessage(msg);
    if (this.onRenderingStart){
        this.onRenderingStart();
    }
};


HeatCanvas.prototype._render = function(f_value_color){
    f_value_color = f_value_color || HeatCanvas.defaultValue2Color;

    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.width, this.height);

    defaultColor = this.bgcolor || [0, 0, 0, 255];
    var canvasData = ctx.createImageData(this.width, this.height);
    for (var i=0; i<canvasData.data.length; i+=4){
        canvasData.data[i] = defaultColor[0]; // r
        canvasData.data[i+1] = defaultColor[1];
        canvasData.data[i+2] = defaultColor[2];
        canvasData.data[i+3] = defaultColor[3];
    }
    
    // maximum 
    var maxValue = 0;
    for(var id in this.value){
        maxValue = Math.max(this.value[id], maxValue);
    }
    
    for(var pos in this.value){
        var x = Math.floor(pos%this.width);
        var y = Math.floor(pos/this.width);

        // MDC ImageData:
        // data = [r1, g1, b1, a1, r2, g2, b2, a2 ...]
        var pixelColorIndex = y*this.width*4+x*4;
        
        var color = HeatCanvas.hsla2rgba.apply(
          null, f_value_color(this.value[pos] / maxValue));
        canvasData.data[pixelColorIndex] = color[0]; //r
        canvasData.data[pixelColorIndex+1] = color[1]; //g
        canvasData.data[pixelColorIndex+2] = color[2]; //b
        canvasData.data[pixelColorIndex+3] = color[3]; //a
        }

    ctx.putImageData(canvasData, 0, 0);
    
};

HeatCanvas.prototype.clear = function(){
    this.data = {};
    this.value = {};
	
    this.canvas.getContext("2d").clearRect(0, 0, this.width, this.height);
};

HeatCanvas.prototype.exportImage = function() {
    return this.canvas.toDataURL();
};

HeatCanvas.defaultValue2Color = function(value){
    var h = (1 - value);
    var l = value * 0.6;
    var s = 0.8;
    var a = 1;
    return [h, s, l, a];
}

// function copied from:
// http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
HeatCanvas.hsla2rgba = function(h, s, l, a){
    var r, g, b;

    if(s == 0){
        r = g = b = l;
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255, a * 255];
}

HeatCanvas.LINEAR = 1;
HeatCanvas.QUAD = 2;
HeatCanvas.CUBIC = 3;

HeatCanvas.getPath = function() {
    var scriptTags = document.getElementsByTagName("script");
    for (var i=0; i<scriptTags.length; i++) {
        var src = scriptTags[i].src;
        var pos = src.indexOf("heatcanvas.js");
        if (pos > 0) {
            return src.substring(0, pos);
        }
    }
    return "";
}

