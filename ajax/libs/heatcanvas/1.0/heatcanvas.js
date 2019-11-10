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
    
    this.worker = new Worker('heatcanvas-worker.js');
    
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.onRenderingStart = null;
    this.onRenderingEnd = null;
    
    this.data = {};
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
    
    // reader background as black
    ctx.fillStyle = this.bgcolor || "rgb(0,0,0)";
    ctx.fillRect(0, 0, this.width, this.height);
    
    // maximum 
    var maxValue = 0;
    for(var id in this.value){
        maxValue = Math.max(this.value[id], maxValue);
    }
    
    for(var pos in this.value){
        var x = Math.floor(pos%this.width);
        var y = Math.floor(pos/this.width);
        
        var color = f_value_color(this.value[pos] / maxValue);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
            
        
    }
    
};

HeatCanvas.prototype.clear = function(){
	this.data = {};
	this.value = {};
	
	this.canvas.getContext("2d").clearRect(0, 0, this.width, this.height);
};

HeatCanvas.defaultValue2Color = function(value){
    var hue = (1 - value) * 240;
    var light = value *60;
    return "hsl("+hue+", 80%, "+light+"%)";
}

HeatCanvas.LINEAR = 1;
HeatCanvas.QUAD = 2;
HeatCanvas.CUBIC = 3;

