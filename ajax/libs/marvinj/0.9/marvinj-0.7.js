
function MarvinColorModelConverter(){}

MarvinColorModelConverter.rgbToBinary = function(img, threshold){		
	var resultImage = new MarvinImage(img.getWidth(), img.getHeight(), MarvinImage.COLOR_MODEL_BINARY);

	for(var y=0; y<img.getHeight(); y++){
		for(var x=0; x<img.getWidth(); x++){
			var gray = Math.ceil(((img.getIntComponent0(x, y)*0.3)+(img.getIntComponent1(x, y)*0.59)+(img.getIntComponent2(x, y)*0.11)));
			
			if(gray <= threshold){
				resultImage.setBinaryColor(x, y, true);
			}
			else{
				resultImage.setBinaryColor(x, y, false);
			}
		}
	}
	return resultImage;
};

MarvinColorModelConverter.binaryToRgb = function(img){
	var resultImage = new MarvinImage(img.getWidth(), img.getHeight(), MarvinImage.COLOR_MODEL_RGB);

	for(var y=0; y<img.getHeight(); y++){
		for(var x=0; x<img.getWidth(); x++){
			if(img.getBinaryColor(x, y)){
				resultImage.setIntColor(x, y, 255, 0,0,0);
			}
			else{
				resultImage.setIntColor(x, y, 255, 255,255,255);
			}
		}
	}
	return resultImage;
};
	
MarvinColorModelConverter.rgbToHsv = function(rgbArray){
	var hsvArray = new Array(rgbArray.length*3);
	
	var red,green,blue;
	for(var i=0; i<rgbArray.length; i++){
		red = (rgbArray[i] & 0xFF0000) >>> 16;
		green = (rgbArray[i] & 0x00FF00) >>> 8;
		blue = (rgbArray[i] & 0x0000FF);
		
		red /=255.0;
		green /=255.0;
		blue /=255.0;
		
		var max = Math.max(Math.max(red, green), blue);
		var min = Math.min(Math.min(red, green), blue);
		var c = max-min;
		
		// H 
		var h,s,v;
		if(c !=0 ){
			if(max == red){
				if(green >= blue){
					h = 60 * ((green-blue)/c);
				} else{
					h = 60 * ((green-blue)/c) + 360;
				}
			} else if(max == green){
				h = 60 * ((blue-red)/c) + 120;
			} else{
				h = 60 * ((red-green)/c) + 240;
			}
		} else{
			h = 0;
		}
		
		
		// V
		v = max;
		
		// S
		s = (c!=0? c/v : 0);
		
		hsvArray[(i*3)] = h;
		hsvArray[(i*3)+1] = s;
		hsvArray[(i*3)+2] = v;
		
	}
	return hsvArray;
};
	
MarvinColorModelConverter.hsvToRgb = function(hsvArray){
	var rgbArray = new Array(hsvArray.length/3);
	
	for(var i=0, j=0; i<hsvArray.length; i+=3, j++){
		var h = hsvArray[i];
		var s = hsvArray[i+1];
		var v = hsvArray[i+2];
		
		// HSV to RGB
		var hi = Math.ceil(h/60 % 6);
		var f = (h/60) - hi;
		var p = v * (1-s);
		var q = v * (1 - f*s);
		var t = v * (1 - (1 - f) * s);
		
		var iHi = Math.ceil(hi);
		
		var r=0,g=0,b=0;
		
		switch(iHi){
			case 0:	r = Math.ceil(v*255);	g = Math.ceil(t*255);	b = Math.ceil(p*255);	break;
			case 1:	r = Math.ceil(q*255);	g = Math.ceil(v*255);	b = Math.ceil(p*255);	break; 
			case 2:	r = Math.ceil(p*255);	g = Math.ceil(v*255);	b = Math.ceil(t*255);	break; 
			case 3:	r = Math.ceil(p*255);	g = Math.ceil(q*255);	b = Math.ceil(v*255);	break; 
			case 4:	r = Math.ceil(t*255);	g = Math.ceil(p*255);	b = Math.ceil(v*255);	break;
			case 5:	r = Math.ceil(v*255);	g = Math.ceil(p*255);	b = Math.ceil(q*255);	break;
		}
		
		rgbArray[j] = 0xFF000000 + (r << 16) + (g << 8) + b; 
		
	}
	
	return rgbArray;
};
function MarvinImage(width, height, colorModel){
	// properties
	this.image = null;
	this.canvas = null;
	this.ctx=null;
	this.data = null;
	
	if(colorModel == null){
		this.colorModel = MarvinImage.COLOR_MODEL_RGB;
	} else{
		this.colorModel = colorModel;
	}
	
	if(width != null){
		this.create(width, height);
	}
	
	if(colorModel == MarvinImage.COLOR_MODEL_BINARY){
		this.arrBinaryColor = new Array(width*height);
	}
}

MarvinImage.COLOR_MODEL_RGB = 0;
MarvinImage.COLOR_MODEL_BINARY = 1;

MarvinImage.prototype.create = function(width, height){
	this.canvas = document.createElement('canvas');
	this.canvas.width = width;
	this.canvas.height = height;
	this.ctx = this.canvas.getContext("2d");
	this.imageData = this.ctx.getImageData(0, 0, width, height);
	this.width = width;
	this.height = height;
};

MarvinImage.prototype.setDimension = function(width, height){
	this.create(width, height);
};

MarvinImage.prototype.load = function(url, callback){
	this.onload = callback;
	this.image = new Image();
	var ref = this;
	this.image.onload = function(){ref.callbackImageLoaded(ref)};
	this.image.crossOrigin="anonymous";
	this.image.src = url;
};

// WARN: the callback "this" object is the reference to js Image object. 
MarvinImage.prototype.callbackImageLoaded = function(marvinImage){
	marvinImage.width = marvinImage.image.width;
	marvinImage.height = marvinImage.image.height;
	marvinImage.canvas = document.createElement('canvas');
	marvinImage.canvas.width = marvinImage.image.width;
	marvinImage.canvas.height = marvinImage.image.height;
	
	
	marvinImage.ctx = marvinImage.canvas.getContext("2d");
	marvinImage.ctx.drawImage(marvinImage.image, 0, 0);
	
	this.imageData = marvinImage.ctx.getImageData(0, 0, marvinImage.getWidth(), marvinImage.getHeight());
	
	if(marvinImage.onload!=null){
		marvinImage.onload();
	}
};

MarvinImage.prototype.clone = function(){
	var image = new MarvinImage(this.getWidth(), this.getHeight(), this.colorModel);
	MarvinImage.copyColorArray(this, image);
	return image;
};

MarvinImage.prototype.clear = function(color){
	for(var y=0; y<this.getHeight(); y++){
		for(var x=0; x<this.getWidth(); x++){
			this.setIntColor(x,y,color);
		}
	}
};

MarvinImage.prototype.getColorModel = function(){
	return this.colorModel;
};

MarvinImage.prototype.getAlphaComponent = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start+3];
};

MarvinImage.prototype.getIntComponent0 = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start];
};

MarvinImage.prototype.getIntComponent1 = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start+1];
};

MarvinImage.prototype.getIntComponent2 = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start+2];
};

MarvinImage.prototype.setIntColor = function(x,y, a1, a2, a3, a4){
	if(a2 == null){
		this.setIntColor1(x,y,a1);
	} else if(a3 == null && a4 == null){ 
		this.setIntColor2(x,y,a1,a2);
	}
	else if(a4 == null){
		this.setIntColor3(x,y,a1,a2,a3);
	}
	else{
		this.setIntColor4(x,y,a1,a2,a3,a4);
	}
};

MarvinImage.prototype.getIntColor = function(x,y){
	var start = ((y*this.getWidth())+x)*4;
	
	return 	0x100000000 + 
			(this.imageData.data[start+3] << 24) + 
			(this.imageData.data[start] << 16) +
			(this.imageData.data[start+1] << 8) +
			(this.imageData.data[start+2]);
};

MarvinImage.prototype.setIntColor1 = function(x,y, color){
	var a = (color & 0xFF000000) >>> 24;
	var r = (color & 0x00FF0000) >> 16;
	var g = (color & 0x0000FF00) >> 8;
	var b = color & 0x000000FF;
	this.setIntColor4(x,y,a,r,g,b);
};

MarvinImage.prototype.setBinaryColor = function(x,y,value){
	var pos = ((y*this.getWidth())+x);
	this.arrBinaryColor[pos] = value;
};

MarvinImage.prototype.getBinaryColor = function(x,y){
	var pos = ((y*this.getWidth())+x);
	return this.arrBinaryColor[pos];
};

MarvinImage.copyColorArray = function(imgSource, imgDestine){
		
	if(imgSource.getColorModel() == imgDestine.getColorModel()){
		switch(imgSource.getColorModel()){
			case MarvinImage.COLOR_MODEL_RGB:
				for(var i=0; i<imgSource.imageData.data.length; i++){
					imgDestine.imageData.data[i] = imgSource.imageData.data[i];
				}
				break;
			case MarvinImage.COLOR_MODEL_BINARY:
				for(var i=0; i<imgSource.arrBinaryColor.length; i++){
					imgDestine.arrBinaryColor[i] = imgSource.arrBinaryColor[i];
				}
				break;
		}
	}
};

MarvinImage.prototype.drawRect = function(x,y, width, height, color){
	for(var i=x; i<x+width; i++){
		this.setIntColor(i, y, color);
		this.setIntColor(i, y+(height-1), color);
	}
	
	for(var i=y; i<y+height; i++){
		this.setIntColor(x, i, color);
		this.setIntColor(x+(width-1), i, color);
	}
};

MarvinImage.prototype.fillRect = function(x,y, width, height, color){
	for(var i=x; i<x+width; i++){
		for(var j=y; j<y+height; j++){
			if(i < this.getWidth() && j < this.getHeight()){
				this.setIntColor(i,j,color);
			}
		}
	}
};

MarvinImage.prototype.setIntColor2 = function(x,y, alpha, color){
	var r = (color & 0x00FF0000) >> 16;
	var g = (color & 0x0000FF00) >> 8;
	var b = color & 0x000000FF;
	this.setIntColor4(x,y,alpha,r,g,b);
};

MarvinImage.prototype.setIntColor3 = function(x,y, r, g, b){
	this.setIntColor4(x,y,255,r,g,b);
};

MarvinImage.prototype.setIntColor4 = function(x,y, alpha, r, g, b){
	var start = ((y*this.getWidth())+x)*4;
	this.imageData.data[start] = r;
	this.imageData.data[start+1] = g;
	this.imageData.data[start+2] = b;
	this.imageData.data[start+3] = alpha;
};

MarvinImage.prototype.getWidth = function(){
	return this.width;
};

MarvinImage.prototype.getHeight = function(){
	return this.height;
};

MarvinImage.prototype.isValidPosition = function(x, y){
	if(x >= 0 && x < this.width && y >= 0 && y < this.height){
		return true;
	}
	return false;
};

MarvinImage.prototype.draw = function(canvas, x, y){
	if(x == null){x=0;}
	if(y == null){y=0;}
	canvas.getContext("2d").putImageData(this.imageData, x,y);
};

	
	function MarvinImageMask (w, h){
		this.width = w;
		this.height = h;
		
		if(w != 0 && h != 0){
			this.arrMask = MarvinJSUtils.createMatrix2D(width, height);
		} else{
			this.arrMask = null;
		}
	};
	
	MarvinImageMask.prototype.getWidth = function(){
		return this.width;
	};
	
	MarvinImageMask.prototype.getHeight = function(){
		return this.height;
	};
	
	MarvinImageMask.prototype.addPixel = function(x, y){
		this.arrMask[x][y] = true;
	};
	
	MarvinImageMask.prototype.removePixel = function(x, y){
		this.arrMask[x][y] = false;
	};
	
	MarvinImageMask.prototype.clear = function(){
		if(this.arrMask != null){
			for(var y=0; y<height; y++){
				for(var x=0; x<width; x++){
					this.arrMask[x][y] = false;
				}
			}
		}
	};
	
	MarvinImageMask.prototype.getMask = function(){
		return this.arrMask;
	};
	
	MarvinImageMask.prototype.addRectRegion = function(startX, startY, regionWidth, regionHeight){
		for(var x=startX; x<startX+regionWidth; x++){
			for(var y=startY; y<startY+regionHeight; y++){
				this.arrMask[x][y] = true;
			}
		}
	};
	
	MarvinImageMask.createNullMask = function(){
		return new MarvinImageMask(0,0);
	};

	MarvinImageMask.NULL_MASK = MarvinImageMask.createNullMask();


	function MarvinSegment(x1, y1, x2, y2){
		this.x1 = -1;
		this.x2 = -1;
		this.y1 = -1;
		this.y2 = -1;
		
		if(x1 != -1 && y1 != -1 && x2 != -1 && y2 != -1){
			this.width = (x2-x1)+1;
			this.height = (y2-y1)+1;
			this.area = this.width*this.height;
		}
	}
	
	MarvinSegment.segmentMinDistance = function(segments, minDistance){
		var s1,s2;
		for(var i=0; i<segments.size()-1; i++){
			for(var j=i+1; j<segments.size(); j++){
				s1 = segments[i];
				s2 = segments[j];
				
				if(MarvinMath.euclidianDistance( (s1.x1+s1.x2)/2, (s1.y1+s1.y2)/2, (s2.x1+s2.x2)/2, (s2.y1+s2.y2)/2 ) < minDistance){
					segments.splice(j, 1);
					j--;
				}
			}
		}
	}



function MarvinColor(red, green, blue){
	this.red = red;
	this.green = green;
	this.blue = blue;
	return this;
}

MarvinColor.prototype.setId = function(id){
	this.id = id;
};

MarvinColor.prototype.getId = function(){
	return this.id;
};

MarvinColor.prototype.setName = function(name){
	this.name = name;
};

MarvinColor.prototype.getName = function(){
	return this.name;
};
var MarvinJSUtils = new Object();

MarvinJSUtils.createMatrix2D = function(rows, cols, value){
	var arr = new Array(rows);
	for(var i=0; i<arr.length; i++){
		arr[i] = new Array(cols);
		arr[i].fill(value)
	}
	return arr;
};

MarvinJSUtils.createMatrix3D = function(rows, cols, depth, value){
	var arr = new Array(rows);
	for(var i=0; i<arr.length; i++){
		arr[i] = new Array(cols);
		for(var j=0; j<arr[i].length; j++){
			arr[i][j] = new Array(depth);
			arr[i][j].fill(value)
		}
	}
	return arr;
};
var MarvinMath = new Object();

MarvinMath.getTrueMatrix = function(rows, cols){
	var ret = MarvinJSUtils.createMatrix2D(rows, cols);
	
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			ret[i][j]  = true;
		}
	}
	return ret;
};

MarvinMath.scaleMatrix = function(matrix, scale){
	var ret = MarvinJSUtils.createMatrix2D(matrix.length, matrix.length);
	
	for(var i=0; i<matrix.length; i++){
		for(var j=0; j<matrix.length; j++){
			ret[i][j] = matrix[i][j] * scale;
		}
	}
	return ret;
};

MarvinMath.euclideanDistance = function(p1, p2, p3, p4, p5, p6){
	if(p6 != null){
		return MarvinMath.euclideanDistance3D(p1, p2, p3, p4, p5, p6);
	} else{
		return MarvinMath.euclideanDistance3D(p1, p2, p3, p4);
	}
};

MarvinMath.euclideanDistance2D = function(x1, y1, x2, y2){
	var dx = (x1-x2);
	var dy = (y1-y2);
	return Math.sqrt( dx*dx + dy*dy);
};

MarvinMath.euclideanDistance3D = function(x1, y1, z1, x2, y2, z2){
	var dx = (x1-x2);
	var dy = (y1-y2);
	var dz = (z1-z2);
	return Math.sqrt( dx*dx + dy*dy + dz*dz);
};


	function GaussianBlur(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	GaussianBlur.prototype.load = function(){
		
		this.RED = 0;
		this.GREEN = 1;
		this.BLUE = 2;

		this.kernelMatrix = null;
		this.resultMatrix = null;
		this.appiledkernelMatrix = null;
		this.radius = null;
		
		this.setAttribute("radius",3);
	}
	
	GaussianBlur.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		this.radius = this.getAttribute("radius");

		var l_imageWidth = imageIn.getWidth();
		var l_imageHeight = imageIn.getHeight();

		var l_pixelColor;
		this.kernelMatrix = this.getGaussianKernel();
		this.resultMatrix = MarvinJSUtils.createMatrix3D(l_imageWidth, l_imageHeight, 3, 0);
		this.appiledkernelMatrix = MarvinJSUtils.createMatrix2D(l_imageWidth, l_imageHeight, 0);
		
		var l_arrMask = mask.getMask();
		
		for (var x = 0; x < l_imageWidth; x++) {
			for (var y = 0; y < l_imageHeight; y++) {	
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				l_pixelColor = imageIn.getIntColor(x,y);
				this.applyKernel(x,y,l_pixelColor,imageOut);
			}
		}
		
		for (var x = 0; x < l_imageWidth; x++) {
			for (var y = 0; y < l_imageHeight; y++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				this.resultMatrix[x][y][this.RED] = ((this.resultMatrix[x][y][0]/this.appiledkernelMatrix[x][y])%256);
				this.resultMatrix[x][y][this.GREEN] = ((this.resultMatrix[x][y][1]/this.appiledkernelMatrix[x][y])%256);
				this.resultMatrix[x][y][this.BLUE] = ((this.resultMatrix[x][y][2]/this.appiledkernelMatrix[x][y])%256);
				imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x, y), Math.floor(this.resultMatrix[x][y][0]), Math.floor(this.resultMatrix[x][y][1]), Math.floor(this.resultMatrix[x][y][2]));
			}		
		}
	}

	/*
	 * Calc Gaussian Matrix.
	 */
	 GaussianBlur.prototype.getGaussianKernel = function(){
		var l_matrix = MarvinJSUtils.createMatrix2D((this.radius*2)+1, (this.radius*2)+1);
		var l_q=this.radius/3.0;
		var l_distance;
		var l_x;
		var l_y;
		
		for(var x=1; x<=(this.radius*2)+1; x++){
			for(var y=1; y<=(this.radius*2)+1; y++){
				l_x = Math.abs(x-(this.radius+1));
				l_y = Math.abs(y-(this.radius+1));
				l_distance = Math.sqrt((l_x*l_x)+(l_y*l_y));
				l_matrix[y-1][x-1] = ( (1.0/(2.0*Math.PI*l_q*l_q))* Math.exp( (-(l_distance*l_distance)) / (2.0*l_q*l_q) ) );
			}
		}
		return l_matrix;
	}

	/*
	 * Apply the blur matrix on a image region. 
	 */
	GaussianBlur.prototype.applyKernel = function(centerPixel_X, centerPixel_Y, pixelColor, image)
	{
		for(var y=centerPixel_Y; y<centerPixel_Y+(this.radius*2); y++){
			for(var x=centerPixel_X; x<centerPixel_X+(this.radius*2); x++){
				if(x-this.radius >= 0 && x-this.radius < image.getWidth() && y-this.radius >= 0 && y-this.radius < image.getHeight()){
					this.resultMatrix[x-this.radius][y-this.radius][this.RED]+= (((pixelColor & 0x00FF0000) >>> 16)*this.kernelMatrix[x-centerPixel_X][y-centerPixel_Y]);
					this.resultMatrix[x-this.radius][y-this.radius][this.GREEN]+= (((pixelColor & 0x0000FF00) >>> 8)*this.kernelMatrix[x-centerPixel_X][y-centerPixel_Y]);
					this.resultMatrix[x-this.radius][y-this.radius][this.BLUE]+= ((pixelColor & 0x000000FF)*this.kernelMatrix[x-centerPixel_X][y-centerPixel_Y]);
					this.appiledkernelMatrix[x-this.radius][y-this.radius] += this.kernelMatrix[x-centerPixel_X][y-centerPixel_Y];
				}
			}
		}
	}
	function AlphaBoundary(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	AlphaBoundary.prototype.load = function(){
		this.setAttribute("radius", 5);
	};
	
	AlphaBoundary.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var neighborhood = getAttribute("radius");
		for(var y=0; y<imageOut.getHeight(); y++){
			for(var x=0; x<imageOut.getWidth(); x++){
				this.alphaRadius(imageOut, x, y, neighborhood);
			}
		}
	};
	
	AlphaBoundary.prototype.alphaRadius = function(image, x, y, radius){
		
		var oldAlpha = image.getAlphaComponent(x, y);
		var newAlpha;
		var totalAlpha=0;
		var totalPixels=0;
		var hn = radius/2;
		
		for(var j=y-hn; j<y+hn; j++){
			for(var i=x-hn; i<x+hn; i++){
				
				if(i >= 0 && i< image.getWidth() && j >= 0 && j < image.getHeight()){
					totalAlpha += image.getAlphaComponent(i, j);
					totalPixels++;
				}
			}
		}
		
		newAlpha = totalAlpha/totalPixels;
		
		if(newAlpha < oldAlpha)
		image.setAlphaComponent(x, y, newAlpha);
	};



	function BlackAndWhite(){
		MarvinAbstractImagePlugin.super(this);
		this.MAX_RLEVEL = 0.03;
		this.load();
	}
	
	BlackAndWhite.prototype.load = function() {
		this.grayScale = new GrayScale();
		this.setAttribute("level", 10);
	}
	
	BlackAndWhite.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		this.grayScale.process(imageIn, imageOut);
		var level = this.getAttribute("level");
		var rlevel = (level/100.0)*this.MAX_RLEVEL;
		
		var c=0;
		var gray;
		for(var y=0; y<imageOut.getHeight(); y++){
			for(var x=0; x<imageOut.getWidth(); x++){
				gray = imageIn.getIntComponent0(x, y);
				
				
				if(gray <= 127){
					gray = Math.max((gray * (1 - ((127-gray)*rlevel))),0);
				}
				else{
					gray = Math.min(gray* (1+((gray-127)*rlevel)), 255);
				}
				
				if(c++ < 1){
					console.log("gray:"+gray);
					console.log("level:"+level);
					console.log("rlevel:"+rlevel);
					
				}
				
				imageOut.setIntColor(x, y, 255, Math.floor(gray), Math.floor(gray), Math.floor(gray));
			}
		}
	}

	function BrightnessAndContrast(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	BrightnessAndContrast.prototype.load = function(){
		// Attributes
		this.setAttribute("brightness", 0);
		this.setAttribute("contrast", 0);
	}

	BrightnessAndContrast.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var r,g,b;
		var l_brightness = this.getAttribute("brightness");
		var l_contrast = this.getAttribute("contrast");
		l_contrast = Math.pow((127 + l_contrast)/127, 2);

		// Brightness
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				r = imageIn.getIntComponent0(x, y);
				g = imageIn.getIntComponent1(x, y);
				b = imageIn.getIntComponent2(x, y);

				r+= (1-(r/255))*l_brightness;
				g+= (1-(g/255))*l_brightness;
				b+= (1-(b/255))*l_brightness;
				if(r < 0) r=0;
				if(r > 255) r=255;
				if(g < 0) g=0;
				if(g > 255) g=255;
				if(b < 0) b=0;
				if(b > 255) b=255;

				imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x, y), Math.floor(r),Math.floor(g),Math.floor(b));
			}
		}

		// Contrast
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				r = imageOut.getIntComponent0(x, y);
				g = imageOut.getIntComponent1(x, y);
				b = imageOut.getIntComponent2(x, y);

				
				r /= 255.0;
				r -= 0.5;
				r *= l_contrast;
				r += 0.5;
				r *= 255.0;

				g /= 255.0;
				g -= 0.5;
				g *= l_contrast;
				g += 0.5;
				g *= 255.0;

				b /= 255.0;
				b -= 0.5;
				b *= l_contrast;
				b += 0.5;
				b *= 255.0;
				

				if(r < 0) r=0;
				if(r > 255) r=255;
				if(g < 0) g=0;
				if(g > 255) g=255;
				if(b < 0) b=0;
				if(b > 255) b=255;

				imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x, y), Math.floor(r),Math.floor(g),Math.floor(b));
			}
		}
	};


	function ColorChannel(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	ColorChannel.prototype.load = function() {
		this.setAttribute("red", 0);
		this.setAttribute("green", 0);
		this.setAttribute("blue", 0);
	}
	
	ColorChannel.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		
		var vr = this.getAttribute("red");
		var vg = this.getAttribute("green");
		var vb = this.getAttribute("blue");
		
		var mr = 1+Math.abs((vr/100.0)*2.5);
		var mg = 1+Math.abs((vg/100.0)*2.5);
		var mb = 1+Math.abs((vb/100.0)*2.5);
		
		mr = (vr > 0? mr : 1.0/mr);
		mg = (vg > 0? mg : 1.0/mg);
		mb = (vb > 0? mb : 1.0/mb);
		
		var red,green,blue;
		for(var y=0; y<imageIn.getHeight(); y++){
			for(var x=0; x<imageIn.getWidth(); x++){
				red = imageIn.getIntComponent0(x, y);
				green = imageIn.getIntComponent1(x, y);
				blue = imageIn.getIntComponent2(x, y);
				
				red 	= Math.min(red * mr, 255);
				green 	= Math.min(green * mg, 255);
				blue	= Math.min(blue * mb, 255);
				
				imageOut.setIntColor(x, y, 255, red, green, blue);
			}
		}
	}


	function Emboss(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	Emboss.prototype.load = function(){}
	
	Emboss.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var l_arrMask = mask.getMask();
		
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					imageOut.setIntColor(x, y, 255, imageIn.getIntColor(x, y));
					continue;
				}
				             
				var rDiff=0; 
				var gDiff=0;
				var bDiff=0;
				
	             if (y > 0 && x > 0){
     
		             // Red component difference between the current and the upperleft pixels
	            	 rDiff = imageIn.getIntComponent0(x, y) - imageIn.getIntComponent0(x-1, y-1);
		             
		             // Green component difference between the current and the upperleft pixels
	            	 gDiff = imageIn.getIntComponent1(x, y) - imageIn.getIntComponent1(x-1, y-1);
		             
		             // Blue component difference between the current and the upperleft pixels
	            	 bDiff = imageIn.getIntComponent2(x, y) - imageIn.getIntComponent2(x-1, y-1);
		             
	             }
	             else{
	            	 rDiff = 0;
	            	 gDiff = 0;
	            	 bDiff = 0;
	             }
		    
		         var diff = rDiff;
		         if (Math.abs (gDiff) > Math.abs (diff))
		              diff = gDiff;
		         if (Math.abs (bDiff) > Math.abs (diff))
		              diff = bDiff;
	
		         var grayLevel = Math.max (Math.min (128 + diff, 255),0);
	
		        imageOut.setIntColor(x, y, 255, grayLevel, grayLevel, grayLevel);
			}
		}
	}

	function GrayScale(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	GrayScale.prototype.load = function(){};
	
	GrayScale.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		// Mask
		var l_arrMask;
		if(mask != null){
			l_arrMask = mask.getMask();
		}
		
		var r,g,b,finalColor;
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				//Red - 30% / Green - 59% / Blue - 11%
				r = imageIn.getIntComponent0(x, y);
				g = imageIn.getIntComponent1(x, y);
				b = imageIn.getIntComponent2(x, y);
				finalColor = Math.ceil((r*0.3)+(g*0.59)+(b*0.11));
				imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x, y), finalColor,finalColor,finalColor);
								
			}
		}
	};


	function Invert(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	Invert.prototype.load = function(){}
	
	Invert.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var l_arrMask = mask.getMask();
		
		var r, g, b;
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				r = (255-imageIn.getIntComponent0(x, y));
				g = (255-imageIn.getIntComponent1(x, y));
				b = (255-imageIn.getIntComponent2(x, y));

				imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x, y), r,g,b);
			}
		}
	}
	function Sepia(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}	
	
	Sepia.prototype.load = function() {
		this.setAttribute("txtValue", "20");
		this.setAttribute("intensity", 20);
	}

	Sepia.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var r, g, b, depth, corfinal;
		
		//Define a intensidade do filtro...
		depth = this.getAttribute("intensity");
		
		var width    = imageIn.getWidth();
		var height   = imageIn.getHeight();
		
		var l_arrMask = mask.getMask();
		
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				//Captura o RGB do ponto...
				r = imageIn.getIntComponent0(x, y);
				g = imageIn.getIntComponent1(x, y);
				b = imageIn.getIntComponent2(x, y);
				
				//Define a cor como a média aritmética do pixel...
				corfinal = (r + g + b) / 3;
				r = g = b = corfinal;
				 
				r = this.truncate(r + (depth * 2));
				g = this.truncate(g + depth);
			
				//Define a nova cor do ponto...
				imageOut.setIntColor(x, y, imageIn.getAlphaComponent(x, y), r, g, b);
			}
		}
	}

	/**
	 * Sets the RGB between 0 and 255
	 * @param a
	 * @return
	 */
	Sepia.prototype.truncate = function(a) {
		if      (a <   0) return 0;
		else if (a > 255) return 255;
		else              return a;
	}

	function Thresholding(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
		
		this.threshold = null;
		this.thresholdRange = null;
		this.neighborhood = null;
		this.range = null;
	}

	Thresholding.prototype.load = function(){
		
		// Attributes
		this.setAttribute("threshold", 125);
		this.setAttribute("thresholdRange", -1);
		this.setAttribute("neighborhood", -1);
		this.setAttribute("range", -1);
		
		this.pluginGray = new GrayScale();
	}
	
	Thresholding.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		this.threshold = this.getAttribute("threshold");
		this.thresholdRange = this.getAttribute("thresholdRange");
		this.neighborhood = this.getAttribute("neighborhood");
		this.range = this.getAttribute("range");
		
		if(this.thresholdRange == -1){
			this.thresholdRange = 255-threshold;
		}
		
		this.pluginGray.process(imageIn, imageOut, attributesOut, mask, previewMode);
		
		var bmask = mask.getMask();
		
		if(this.neighborhood == -1 && this.range == -1){
			this.hardThreshold(imageIn, imageOut, bmask);
		}
		else{
			this.contrastThreshold(imageIn, imageOut);
		}
				
	}
	
	Thresholding.prototype.hardThreshold = function(imageIn, imageOut, mask){
		for(var y=0; y<imageIn.getHeight(); y++){
			for(var x=0; x<imageIn.getWidth(); x++){
				if(mask != null && !mask[x][y]){
					continue;
				}
				
				var gray = imageIn.getIntComponent0(x,y); 
				if(gray < this.threshold || gray > this.threshold+this.thresholdRange){
					imageOut.setIntColor(x, y, imageIn.getAlphaComponent(x,y), 0,0,0);
				}
				else{
					imageOut.setIntColor(x, y, imageIn.getAlphaComponent(x,y), 255,255,255);
				}				
			}
		}	
	}
	
	Thresholding.prototype.contrastThreshold = function(imageIn, imageOut){
		this.range = 1;
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				if(checkNeighbors(x,y, neighborhood, neighborhood, imageIn)){
					imageOut.setIntColor(x,y,0,0,0);
				}
				else{
					imageOut.setIntColor(x,y,255,255,255);
				}
			}
		}
	}
	
	Thresholding.prototype.checkNeighbors = function(x, y, neighborhoodX, neighborhoodY, img){
		
		var color;
		var z=0;
		
		color = img.getIntComponent0(x, y);
		
		for(var i=0-neighborhoodX; i<=neighborhoodX; i++){
			for(var j=0-neighborhoodY; j<=neighborhoodY; j++){
				if(i == 0 && j == 0){
					continue;
				}
				
				if(color < getSafeColor(x+i,y+j, img)-range && getSafeColor(x+i,y+j, img) != -1){
					z++;
				}
			}
		}
		
		if(z > (neighborhoodX*neighborhoodY)*0.5){
			return true;
		}
		
		return false;
	};
	
	Thresholding.prototype.getSafeColor = function(x, y, img){
		
		if(x >= 0 && x < img.getWidth() && y >= 0 && y < img.getHeight()){
			return img.getIntComponent0(x, y);
		}
		return -1;
	};

	function ThresholdingNeighborhood(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	ThresholdingNeighborhood.prototype.load = function() {
		this.setAttribute("neighborhoodSide", 10);
		this.setAttribute("samplingPixelDistance", 1);
		this.setAttribute("thresholdPercentageOfAverage", 1.0);
	}

	ThresholdingNeighborhood.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var neighborhoodSide = getAttribute("neighborhoodSide");
		var samplingPixelDistance = getAttribute("samplingPixelDistance");
		var thresholdPercentageOfAverage = getAttribute("thresholdPercentageOfAverage");
		
		for(var y=0; y<imageIn.getHeight(); y++){
			for(var x=0; x<imageIn.getWidth(); x++){
				this.theshold(imageIn, imageOut, x, y, thresholdPercentageOfAverage, neighborhoodSide, samplingPixelDistance);
			}
		}
	}
	
	ThresholdingNeighborhood.prototype.theshold = function(image, imageOut, x, y, thresholdPercentageOfAverage, side, neighborhoodDistance){
		
		var min=-1;
		var max=-1;
		var pixels=0;
		var average=0;
		
		var inc = neighborhoodDistance;
		
		
		for(var j=y-(side/2); j<y+(inc+side/2); j+=inc){
			for(var i=x-(side/2); i<x+(side/2); i+=inc){
				
				if(i >= 0 && j>= 0 && i < image.getWidth() && j < image.getHeight()){
					
					var color = image.getIntComponent0(i,j);
					
					if(min == -1 || color < min){
						min = color;
					}
					if(max == -1 || color > max){
						max = color;
					}
						
					average+=color;
					pixels++;
				}
			}
		}
		
		average /= pixels;
			
		var color = image.getIntComponent0(x,y);
		
		if(color < average*thresholdPercentageOfAverage || (max-min) <= 30){
			imageOut.setIntColor(x, y, 255, 0, 0, 0);
		} else{
			imageOut.setIntColor(x, y, 255, 255, 255, 255);
		}
	};

	function Convolution(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	Convolution.prototype.load = function(){
		this.setAttribute("matrix", null);
	}
	
	Convolution.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var matrix = this.getAttribute("matrix");
		
		if(matrix != null && matrix.length > 0){
			
			for(var y=0; y<imageIn.getHeight(); y++){
				for(var x=0; x<imageIn.getWidth(); x++){
					
					if(y >= matrix.length/2 && y < imageIn.getHeight()-matrix.length/2 && x >= matrix[0].length/2 && x < imageIn.getWidth()-matrix[0].length/2){
						this.applyMatrix(x, y, matrix, imageIn, imageOut);
					}
					else{
						imageOut.setIntColor(x, y, 0xFF000000);
					}
				}
			}
		}
	};
	
	Convolution.prototype.applyMatrix = function
	(
		x,
		y,
		matrix,
		imageIn,
		imageOut
	){
		
		var nx,ny;
		var resultRed=0;
		var resultGreen=0;
		var resultBlue=0;
		
		var xC=Math.ceil(matrix[0].length/2);
		var yC=Math.ceil(matrix.length/2);
		
		for(var i=0; i<matrix.length; i++){
			for(var j=0; j<matrix[0].length; j++){
					
				if(matrix[i][j] != 0){		
					nx = x + (j-xC);
					ny = y + (i-yC);
					
					if(nx >= 0 && nx < imageOut.getWidth() && ny >= 0 && ny < imageOut.getHeight()){
						
						resultRed	+=	(matrix[i][j]*(imageIn.getIntComponent0(nx, ny)));
						resultGreen += 	(matrix[i][j]*(imageIn.getIntComponent1(nx, ny)));
						resultBlue	+=	(matrix[i][j]*(imageIn.getIntComponent2(nx, ny)));
					}
					
					
				}
				
				
				
			}
		}
		
		resultRed 	= Math.abs(resultRed);
		resultGreen = Math.abs(resultGreen);
		resultBlue = Math.abs(resultBlue);
		
		// allow the combination of multiple applications
		resultRed 	+= imageOut.getIntComponent0(x,y);
		resultGreen += imageOut.getIntComponent1(x,y);
		resultBlue 	+= imageOut.getIntComponent2(x,y);
		
		resultRed 	= Math.min(resultRed, 255);
		resultGreen = Math.min(resultGreen, 255);
		resultBlue 	= Math.min(resultBlue, 255);
		
		resultRed 	= Math.max(resultRed, 0);
		resultGreen = Math.max(resultGreen, 0);
		resultBlue 	= Math.max(resultBlue, 0);
		
		imageOut.setIntColor(x, y, imageIn.getAlphaComponent(x, y), Math.floor(resultRed), Math.floor(resultGreen), Math.floor(resultBlue));
	};

	function Moravec(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	Moravec.prototype.load = function(){
		this.setAttribute("matrixSize", 3);
		this.setAttribute("threshold", 0);
	}

	Moravec.prototype.process = function
	(
		imageIn, 
		imageOut,
		attrOut,
		mask, 
		previewMode
	)
	{
		var matrixSize = this.getAttribute("matrixSize");
		var threshold = this.getAttribute("threshold");
		
		var tempImage = new MarvinImage(imageIn.getWidth(), imageIn.getHeight());
		Marvin.grayScale(imageIn, tempImage);
		
		var cornernessMap = MarvinJSUtils.createMatrix2D(tempImage.getWidth(), tempImage.getHeight(), 0);
		var cornernessMapOut = MarvinJSUtils.createMatrix2D(tempImage.getWidth(), tempImage.getHeight(), 0);
		
		for(var y=0; y<tempImage.getHeight(); y++){
			for(var x=0; x<tempImage.getWidth(); x++){
				cornernessMap[x][y] = this.c(x,y,matrixSize,tempImage);
				
				if(cornernessMap[x][y] < threshold){
					cornernessMap[x][y] = 0;
				}
			}
		}
		
		for(var x=0; x<cornernessMap.length; x++){
			for(var y=0; y<cornernessMap[x].length; y++){
				cornernessMapOut[x][y] = this.nonmax(x,y,matrixSize,cornernessMap);
				
				if(cornernessMapOut[x][y] > 0){
					cornernessMapOut[x][y] = 1;
				}
			}
		}
		
		if(attrOut != null){
			attrOut.set("cornernessMap", cornernessMapOut);
		}
	}
	
	Moravec.prototype.nonmax = function(x, y, matrixSize, matrix){
		var s = Math.floor(matrixSize/2);
		if(x-(s+1) >= 0 && x+(s+1) < matrix.length && y-(s+1) >= 0 && y+(s+1) < matrix[0].length){
			for(var i=-s; i<=s; i++){
				for(var j=-s; j<=s; j++){
					if(i != 0 || j != 0){
						if(matrix[x][y] < matrix[x+i][y+j]){
							return 0;
						}
					}
				}
			}
		}
		return matrix[x][y];
	}
	
	Moravec.directions = [[1,0], [-1, 0], [0, 1], [0,-1], [-1,-1], [1, -1], [-1, 1], [1,1]];
	
	Moravec.prototype.c = function(x, y, matrixSize, image){
		
		var ret = -1;
		var temp;
		var s = Math.floor(matrixSize/2);
		if(x-(s+1) >= 0 && x+(s+1) < image.getWidth() && y-(s+1) >= 0 && y+(s+1) < image.getHeight()){
			
			for(var d=0; d<Moravec.directions.length; d++){
				temp=0;
				for(var i=-s; i<=s; i++){
					for(var j=-s; j<=s; j++){
						temp += Math.pow(image.getIntComponent0(x+i, y+j)-image.getIntComponent0(x+i+Moravec.directions[d][0],y+j+Moravec.directions[d][1]), 2);
					}
				}
				if(ret == -1 || temp < ret){
					ret = temp;
				}
			}
			
		}
		return ret;
	}





/**
 * @author Gabriel Ambrósio Archanjo
 */
	function Prewitt(){
		MarvinAbstractImagePlugin.super(this);
	
	
		// Definitions
		this.matrixPrewittX = [
				[1,		0,		-1],
				[1,		0,		-1],
				[1,		0,		-1]
		];
		
		this.matrixPrewittY = [
				[1,		1,		1],
				[0,		0,		0],
				[-1,	-1,		-1]
		];
		
		this.load();
		
	}
	
	Prewitt.prototype.load = function(){
		this.convolution = new Convolution();
		this.setAttribute("intensity", 1.0);
	};
	
	Prewitt.prototype.process = function
	(
		imageIn, 
		imageOut,
		attrOut,
		mask, 
		previewMode
	)
    {
		var intensity = this.getAttribute("intensity");
		
		if(intensity == 1){
			this.convolution.setAttribute("matrix", this.matrixPrewittX);
			this.convolution.process(imageIn, imageOut, null, mask, this.previewMode);
			this.convolution.setAttribute("matrix", this.matrixPrewittY);
			this.convolution.process(imageIn, imageOut, null, mask, this.previewMode);
		} else{
			this.convolution.setAttribute("matrix", MarvinMath.scaleMatrix(this.matrixPrewittX, intensity));
			this.convolution.process(imageIn, imageOut, null, mask, previewMode);
			this.convolution.setAttribute("matrix", MarvinMath.scaleMatrix(this.matrixPrewittY, intensity));
			this.convolution.process(imageIn, imageOut, null, mask, previewMode);
		}
    };

	function BoundaryFill(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	BoundaryFill.prototype.load = function(){
		this.setAttribute("x", 0);
		this.setAttribute("y", 0);
		this.setAttribute("color", 0xFFFF0000);
		this.setAttribute("tile", null);
		this.setAttribute("threshold", 0);
	};

	BoundaryFill.prototype.process = function
	(
		imgIn, 
		imgOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var l_list = new Array();
    	var 	l_point,
    			l_pointW,
    			l_pointE;
    
    	//MarvinImage.copyColorArray(imgIn, imgOut);
    	
    	var x = this.getAttribute("x");
    	var y = this.getAttribute("y");
    	var tileImage = this.getAttribute("tile");
    	this.threshold = this.getAttribute("threshold");
    	
    	if(!imgOut.isValidPosition(x, y)){
    		return;
    	}
    	
    	var targetColor = imgIn.getIntColor(x, y);
    	var targetRed = imgIn.getIntComponent0(x, y);
    	var targetGreen = imgIn.getIntComponent1(x, y);
    	var targetBlue = imgIn.getIntComponent2(x, y);
    	var color = this.getAttribute("color");
    	var newColor = color;
    	
    	var fillMask = MarvinJSUtils.createMatrix2D(imgOut.getWidth(), imgOut.getHeight, false);
    	fillMask[x][y] = true;
    	
    	
    	l_list.push(new MarvinPoint(x, y));
    	
    	//for(var l_i=0; l_i<l_list.size(); l_i++){
    	while(l_list.length > 0){
			l_point = l_list.splice(0,1)[0];	// list poll
    		l_pointW = new MarvinPoint(l_point.x, l_point.y);
    		l_pointE = new MarvinPoint(l_point.x, l_point.y);
    		
    		// west
    		while(true){
    			if(l_pointW.x-1 >= 0 && this.match(imgIn, l_pointW.x-1, l_pointW.y, targetRed, targetGreen, targetBlue, this.threshold) && !fillMask[l_pointW.x-1][l_pointW.y]){
    				l_pointW.x--;
    			}
    			else{
    				break;
    			}
    		 }
    		
    		// east
    		while(true){
    			if(l_pointE.x+1 < imgIn.getWidth() && this.match(imgIn, l_pointE.x+1, l_pointE.y, targetRed, targetGreen, targetBlue, this.threshold) && !fillMask[l_pointE.x+1][l_pointE.y]){
    				l_pointE.x++;
    			}
    			else{
    				break;
    			}
    		 }
    		
    		// set color of pixels between pointW and pointE
    		for(var l_px=l_pointW.x; l_px<=l_pointE.x; l_px++){
    			//imgOut.setIntColor(l_px, l_point.y, -1);
    			//drawPixel(imgOut, l_px, l_point.y, newColor, tileImage);
    			fillMask[l_px][l_point.y] = true;
    			
    			if(l_point.y-1 >= 0 && this.match(imgIn, l_px, l_point.y-1, targetRed, targetGreen, targetBlue, this.threshold) && !fillMask[l_px][l_point.y-1]){
    				l_list.push(new MarvinPoint(l_px, l_point.y-1));
    			}
    			if(l_point.y+1 < imgOut.getHeight() && this.match(imgIn, l_px, l_point.y+1, targetRed, targetGreen, targetBlue, this.threshold) && !fillMask[l_px][l_point.y+1]){
    				l_list.push(new MarvinPoint(l_px, l_point.y+1));
    			}
    		}
    	}    
    	
    	if(tileImage != null){
			/* Plugin not ported yet. */
			/*
    		var p = MarvinPluginLoader.loadImagePlugin("org.marvinproject.image.texture.tileTexture.jar");
    		p.setAttribute("lines", (int)(Math.ceil((double)imgOut.getHeight()/tileImage.getHeight())));
    		p.setAttribute("columns", (int)(Math.ceil((double)imgOut.getWidth()/tileImage.getWidth())));
    		p.setAttribute("tile", tileImage);
    		MarvinImageMask newMask = new MarvinImageMask(fillMask);    		
    		p.process(imgOut, imgOut, null, newMask, false);
			*/
    	}
    	else{
    		for(var j=0; j<imgOut.getHeight(); j++){
    			for(var i=0; i<imgOut.getWidth(); i++){
    				if(fillMask[i][j]){
    					imgOut.setIntColor(i, j, newColor);
    				}
    			}
    		}
    	}
    };
	
	BoundaryFill.prototype.match = function(image, x, y, targetRed, targetGreen, targetBlue, threshold){
		var diff = Math.abs(image.getIntComponent0(x, y) - targetRed) + Math.abs(image.getIntComponent1(x, y) - targetGreen) + Math.abs(image.getIntComponent2(x, y) - targetBlue);
		return (diff <= threshold);
	};

	function ErrorDiffusion(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	ErrorDiffusion.prototype.load = function(){
		this.threshold = 128;
	}
	
	ErrorDiffusion.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var color;
		var dif;

		Marvin.grayScale(imageIn, imageOut, attributesOut, mask, previewMode);
		
		// Mask
		var l_arrMask;
		if(mask != null){
			l_arrMask = mask.getMask();
		}
		
		for (var y = 0; y < imageOut.getHeight(); y++) {
			for (var x = 0; x < imageOut.getWidth(); x++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				
				var color = imageOut.getIntComponent0(x, y);
				if(color > this.threshold){
					imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x,y), 255,255,255);
					dif = -(255-color);
				}
				else{
					imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x,y), 0,0,0);
					dif = color;
				}

				// Pixel Right
				if(x+1 < imageOut.getWidth()){
					color = imageOut.getIntComponent0(x+1,y);
					color+= Math.floor(0.4375*dif);
					color = this.getValidGray(color); 
					imageOut.setIntColor(x+1,y,imageIn.getAlphaComponent(x+1,y), color,color,color);

					// Pixel Right Down
					if(y+1 < imageOut.getHeight()){
						color = imageOut.getIntComponent0(x+1,y+1);
						color+=Math.floor(0.0625*dif);
						color = this.getValidGray(color); 
						imageOut.setIntColor(x+1,y+1,imageIn.getAlphaComponent(x+1,y+1), color,color,color);
					}
				}

				// Pixel Down
				if(y+1 < imageOut.getHeight()){
					color = imageOut.getIntComponent0(x,y+1);
					color+=Math.floor(0.3125*dif);
					color = this.getValidGray(color); 
					imageOut.setIntColor(x,y+1,imageIn.getAlphaComponent(x,y+1), color,color,color);

					// Pixel Down Left
					if(x-1 >= 0){
						color = imageOut.getIntComponent0(x-1,y+1);
						color+=Math.floor(0.1875*dif);
						color = this.getValidGray(color); 
						imageOut.setIntColor(x-1,y+1,imageIn.getAlphaComponent(x-1,y+1), color,color,color);
					}
				}
			}
		}
	}

	ErrorDiffusion.prototype.getValidGray = function(a_value){
		if(a_value < 0) return 0;
		if(a_value > 255) return 255;
		return a_value;
	}

var MarvinAbstractImagePlugin = new Object();

MarvinAbstractImagePlugin.super = function(ref){
	ref.attributes = {};
	ref["setAttribute"] = MarvinAbstractImagePlugin.setAttribute;
	ref["getAttribute"] = MarvinAbstractImagePlugin.getAttribute;
};

MarvinAbstractImagePlugin.setAttribute = function(label, value){
	this.attributes[label] = value;
};

MarvinAbstractImagePlugin.getAttribute = function(label, value){
	return this.attributes[label];
};
	function Closing(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	Closing.prototype.load = function(){
		this.matrix = MarvinJSUtils.createMatrix2D(3,3,true);
		this.setAttribute("matrix",3);
	};

	
	Closing.prototype.process = function
	(
		imgIn, 
		imgOut,
		attributesOut,
		mask, 
		previewMode
	)
	{	
		var matrix = this.getAttribute("matrix");
		
		if(imgIn.getColorModel() == MarvinImage.COLOR_MODEL_BINARY && matrix != null){

			Marvin.morphologicalDilation(imgIn, imgOut, matrix);
			MarvinImage.copyColorArray(imgOut, imgIn);
			Marvin.morphologicalErosion(imgIn, imgOut, matrix);
		}
	};

	function Dilation(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	Dilation.prototype.load = function(){
		
		this.matrix = MarvinJSUtils.createMatrix2D(3,3,true);
		this.setAttribute("matrix",3);
	}

	Dilation.prototype.process = function
	(
		imgIn, 
		imgOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var matrix = this.getAttribute("matrix");
		
		if(imgIn.getColorModel() == MarvinImage.COLOR_MODEL_BINARY && matrix != null){
			
			MarvinImage.copyColorArray(imgIn, imgOut);
			
			for(var y=0; y<imgIn.getHeight(); y++){
				for(var x=0; x<imgIn.getWidth(); x++){
					this.applyMatrix(x, y, matrix, imgIn, imgOut);
				}
			}
		}
	}
	
	Dilation.prototype.applyMatrix = function
	(
		x,
		y,
		matrix,
		imgIn,
		imgOut
	){
		
		var nx,ny;
		var xC=matrix[0].length/2;
		var yC=matrix.length/2;
		
		if(imgIn.getBinaryColor(x, y)){
			for(var i=0; i<matrix.length; i++){
				for(var j=0; j<matrix.length; j++){
					
					if((i != yC || j != xC) && matrix[i][j]){
						
						nx = x + (j-xC);
						ny = y + (i-yC);
						
						if(nx > 0 && nx < imgOut.getWidth() && ny > 0 && ny < imgOut.getHeight()){
							imgOut.setBinaryColor(nx, ny, true);
						}
					}
				}
			}
		}
	}


	function Erosion(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	Erosion.prototype.load = function(){
		
		this.matrix = MarvinJSUtils.createMatrix2D(3,3,true);
		this.setAttribute("matrix",3);
	}
	
	Erosion.prototype.process = function
	(
		imgIn, 
		imgOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var matrix = this.getAttribute("matrix");
		
		if(imgIn.getColorModel() == MarvinImage.COLOR_MODEL_BINARY && matrix != null){
			
			MarvinImage.copyColorArray(imgIn, imgOut);
			
			for(var y=0; y<imgIn.getHeight(); y++){
				for(var x=0; x<imgIn.getWidth(); x++){
					this.applyMatrix(x, y, matrix, imgIn, imgOut);
				}
			}
		}
	}
	
	Erosion.prototype.applyMatrix = function
	(
		x,
		y,
		matrix,
		imgIn,
		imgOut
	){
		
		var nx,ny;
		
		var xC=Math.floor(matrix[0].length/2);
		var yC=Math.floor(matrix.length/2);
		
		if(!imgIn.getBinaryColor(x, y)){
			for(var i=0; i<matrix.length; i++){
				for(var j=0; j<matrix[0].length; j++){
					
					if((i != yC || j != xC) && matrix[i][j]){
						
						nx = x + (j-xC);
						ny = y + (i-yC);
						
						if(nx >= 0 && nx < imgOut.getWidth() && ny >= 0 && ny < imgOut.getHeight()){
							imgOut.setBinaryColor(nx, ny, false);
						}
					}
				}
			}
		}
	}


	function Crop(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	Crop.prototype.load = function(){
		this.setAttribute("x", 0);
		this.setAttribute("y", 0);
		this.setAttribute("width", 0);
		this.setAttribute("height", 0);
	};
	
	Crop.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
    {
		var x = this.getAttribute("x");
		var y = this.getAttribute("y");
		var width = this.getAttribute("width");
		var height = this.getAttribute("height");
		
		imageOut.setDimension(width, height);
		
		for(var i=x; i<x+width; i++){
			for(var j=y; j<y+height; j++){
				imageOut.setIntColor(i-x, j-y, imageIn.getIntColor(i, j));
			}
		}
    };


	function FloodfillSegmentation(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	FloodfillSegmentation.prototype.load = function(){
		this.setAttribute("returnType", "MarvinSegment");
	};
	
	FloodfillSegmentation.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		if(attributesOut != null){
			var returnType = this.getAttribute("returnType");
			var fillBuffer = imageIn.clone();
			var segments = this.floodfillSegmentation(imageIn, fillBuffer);
			
			switch(returnType){
				case "MarvinSegment":
					attributesOut.set("segments", segments);
					break;
				case "MarvinBlobSegment":
					attributesOut.set("blobSegments", blobSegments(fillBuffer, segments));
					break;
			}
		}
	};
	
	FloodfillSegmentation.prototype.floodfillSegmentation = function(image, fillBuffer){
		fillBuffer.clear(0xFF000000);
		
		var currentColor=1;
		for(var y=0; y<image.getHeight(); y++){
			for(var x=0; x<image.getWidth(); x++){
				
				var color = fillBuffer.getIntColor(x, y);
				
				if((color & 0x00FFFFFF) == 0 && image.getAlphaComponent(x, y) > 0){
					var c = 0xFF000000 | (currentColor++);
					Marvin.boundaryFill(image, fillBuffer, x, y, c);
				}
			}
		}
		
		var segments = new Array(currentColor-1);
		var seg;
		for(var y=0; y<fillBuffer.getHeight(); y++){
			for(var x=0; x<fillBuffer.getWidth(); x++){
				var color = (fillBuffer.getIntColor(x, y) & 0x00FFFFFF);
				
				if(color != 0x00FFFFFF && color > 0){
					
					seg = segments[color-1];
					
					if(seg == null){
						seg = new MarvinSegment();
						segments[color-1] = seg;
					}
					
					// x and width
					if(seg.x1 == -1 || x < seg.x1)	{		seg.x1 = x;		}
					if(seg.x2 == -1 || x > seg.x2)	{		seg.x2 = x;		}
					seg.width = (seg.x2-seg.x1)+1;
					
					// y and height;
					if(seg.y1 == -1 || y < seg.y1)	{		seg.y1 = y;		}
					if(seg.y2 == -1 || y > seg.y2)	{		seg.y2 = y;		}
					seg.height = (seg.y2-seg.y1)+1;
					
					seg.area++;
				}
			}
		}
		
		return segments;
	}
	
	FloodfillSegmentation.prototype.blobSegments = function(image, segments){
		
		var blobSegments = new Array(segments.length);
		
		var colorSegment;
		var seg;
		for(var i=0; i<segments.length; i++){
			seg = segments[i];
			colorSegment = 0xFF000000 + (i+1);
			
			blobSegments[i] = new MarvinBlobSegment(seg.x1, seg.y1);
			var tempBlob = new MarvinBlob(seg.width, seg.height);
			blobSegments[i].setBlob(tempBlob);
			
			for(var y=seg.y1; y<=seg.y2; y++){
				for(var x=seg.x1; x<=seg.x2; x++){
					if(image.getIntColor(x,y) == colorSegment){
						tempBlob.setValue(x-seg.x1, y-seg.y1, true);
					}
				}
			}
			
		}
		return blobSegments;
	};

	function Scale(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	};
	
	Scale.prototype.load = function(){
		// Attributes
		this.setAttribute("newWidth", 0);
		this.setAttribute("newHeight", 0);
	};
			
	Scale.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		
		if(!previewMode){
			var width = imageIn.getWidth();
			var height = imageIn.getHeight();
			var newWidth = this.getAttribute("newWidth");
			var newHeight = this.getAttribute("newHeight");
			
			if(imageOut.getWidth() != newWidth || imageOut.getHeight() != newHeight){
				imageOut.setDimension(newWidth, newHeight);
			}
			
		    var x_ratio = Math.floor((width<<16)/newWidth) ;
		    var y_ratio = Math.floor((height<<16)/newHeight) ;
		    var x2, y2 ;
		    for (var i=0;i<newHeight;i++) {
		        for (var j=0;j<newWidth;j++) {
		            x2 = Math.floor((j*x_ratio)>>16) ;
		            y2 = Math.floor((i*y_ratio)>>16) ;
		            imageOut.setIntColor(j,i, imageIn.getAlphaComponent(x2,y2), imageIn.getIntColor(x2,y2));
		        }                
		    }	    
		}
	};
	
	
	function MarvinAttributes(){
		this.hashAttributes = new Object();
	}

	MarvinAttributes.prototype.set = function(name, value){
		this.hashAttributes[name] = value;
	};
	
	MarvinAttributes.prototype.get = function(name, defaultValue){
		var ret = this.hashAttributes[name];
		
		if(ret != null){
			return ret;
		}
		return defaultValue;
	};
	
	MarvinAttributes.prototype.clone = function(){
		var attrs = new MarvinAttributes();
		
		for(var key in this.hashAttributes){
			attrs.set(key, this.hashAttributes[key]);
		}
		return attrs;
	};
function MarvinPoint(x,y){
	this.x = x;
	this.y = y;
}

MarvinPoint.prototype.setX = function(x){
	this.x = x;
};

MarvinPoint.prototype.getX = function(){
	return this.x;
};

MarvinPoint.prototype.setY = function(x){
	this.y = y;
};

MarvinPoint.prototype.getY = function(){
	return this.y;
};var marvinLoadPluginMethods = function(callback){
	Marvin.plugins = new Object();
	
	// Alpha Boundary
	Marvin.plugins.alphaBoundary = new AlphaBoundary();
	Marvin.alphaBoundary = function(imageIn, imageOut, radius){
		Marvin.plugins.alphaBoundary.setAttribute(radius)
		Marvin.plugins.alphaBoundary.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Black And White
	Marvin.plugins.blackAndWhite = new BlackAndWhite();
	Marvin.blackAndWhite = function(imageIn, imageOut, level){
		Marvin.plugins.blackAndWhite.setAttribute("level", level);
		Marvin.plugins.blackAndWhite.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// BoundaryFill
	Marvin.plugins.boundaryFill = new BoundaryFill();
	Marvin.boundaryFill = function(imageIn, imageOut, x, y, color, threshold){
		Marvin.plugins.boundaryFill.setAttribute("x", x);
		Marvin.plugins.boundaryFill.setAttribute("y", y);
		Marvin.plugins.boundaryFill.setAttribute("color", color);
		if(threshold != null){	Marvin.plugins.boundaryFill.setAttribute("threshold", threshold);	}
		
		Marvin.plugins.boundaryFill.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Brightness and Contrast
	Marvin.plugins.brightnessAndContrast = new BrightnessAndContrast();
	Marvin.brightnessAndContrast = function(imageIn, imageOut, brightness, contrast){
		Marvin.plugins.brightnessAndContrast.setAttribute("brightness", brightness);
		Marvin.plugins.brightnessAndContrast.setAttribute("contrast", contrast);
		Marvin.plugins.brightnessAndContrast.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Color Channel
	Marvin.plugins.colorChannel = new ColorChannel();
	Marvin.colorChannel = function(imageIn, imageOut, red, green, blue){
		Marvin.plugins.colorChannel.setAttribute("red", red);
		Marvin.plugins.colorChannel.setAttribute("green", green);
		Marvin.plugins.colorChannel.setAttribute("blue", blue);
		Marvin.plugins.colorChannel.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Color Channel
	Marvin.plugins.crop = new Crop();
	Marvin.crop = function(imageIn, imageOut, x, y, width, height){
		Marvin.plugins.crop.setAttribute("x", x);
		Marvin.plugins.crop.setAttribute("y", y);
		Marvin.plugins.crop.setAttribute("width", width);
		Marvin.plugins.crop.setAttribute("height", height);
		Marvin.plugins.crop.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Emboss
	Marvin.plugins.emboss = new Emboss();
	Marvin.emboss = function(imageIn, imageOut){
		Marvin.plugins.emboss.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Emboss
	Marvin.plugins.halftoneErrorDiffusion = new ErrorDiffusion();
	Marvin.halftoneErrorDiffusion = function(imageIn, imageOut){
		Marvin.plugins.halftoneErrorDiffusion.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Floodfill Segmentation
	Marvin.plugins.floodfillSegmentation = new FloodfillSegmentation();
	Marvin.floodfillSegmentation = function(imageIn){
		var attrOut = new MarvinAttributes();
		Marvin.plugins.floodfillSegmentation.setAttribute("returnType", "MarvinSegment");
		Marvin.plugins.floodfillSegmentation.process(imageIn, null, attrOut, MarvinImageMask.NULL_MASK, false);
		return attrOut.get("segments");
	};
	
	// Gaussian Blur
	Marvin.plugins.gaussianBlur = new GaussianBlur();
	Marvin.gaussianBlur = function(imageIn, imageOut, radius){
		Marvin.plugins.gaussianBlur.setAttribute("radius", Marvin.getValue(radius, 3.0));
		Marvin.plugins.gaussianBlur.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Invert
	Marvin.plugins.invertColors = new Invert();
	Marvin.invertColors = function(imageIn, imageOut){
		Marvin.plugins.invertColors.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// GrayScale
	Marvin.plugins.grayScale = new GrayScale();
	Marvin.grayScale = function(imageIn, imageOut){
		Marvin.plugins.grayScale.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Moravec
	Marvin.plugins.moravec = new Moravec();
	Marvin.moravec = function(imageIn, imageOut, matrixSize, threshold){
		var attrOut = new MarvinAttributes();
		Marvin.plugins.moravec.setAttribute("matrixSize", matrixSize);
		Marvin.plugins.moravec.setAttribute("threshold", threshold);
		Marvin.plugins.moravec.process(imageIn, imageOut, attrOut, MarvinImageMask.NULL_MASK, false);
		return attrOut.get("cornernessMap");
	};
	
	// Morphological Dilation
	Marvin.plugins.morphologicalDilation = new Dilation();
	Marvin.morphologicalDilation = function(imageIn, imageOut, matrix){
		Marvin.plugins.morphologicalDilation.setAttribute("matrix", matrix);
		Marvin.plugins.morphologicalDilation.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Morphological Erosion
	Marvin.plugins.morphologicalErosion = new Erosion();
	Marvin.morphologicalErosion = function(imageIn, imageOut, matrix){
		Marvin.plugins.morphologicalErosion.setAttribute("matrix", matrix);
		Marvin.plugins.morphologicalErosion.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Morphological Closing
	Marvin.plugins.morphologicalClosing = new Closing();
	Marvin.morphologicalClosing = function(imageIn, imageOut, matrix){
		Marvin.plugins.morphologicalClosing.setAttribute("matrix", matrix);
		Marvin.plugins.morphologicalClosing.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Prewitt
	Marvin.plugins.prewitt = new Prewitt();
	Marvin.prewitt = function(imageIn, imageOut, intensity){
		Marvin.plugins.prewitt.setAttribute("intensity", Marvin.getValue(intensity, 1.0));
		Marvin.plugins.prewitt.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Scale
	Marvin.plugins.scale = new Scale();
	Marvin.scale = function(imageIn, imageOut, newWidth, newHeight){
	
		if(newHeight == null){
			var factor = imageIn.getHeight() / imageIn.getWidth();
			newHeight = Math.floor(factor * newWidth);
		}
	
		Marvin.plugins.scale.setAttribute("newWidth", newWidth);
		Marvin.plugins.scale.setAttribute("newHeight", newHeight);
		Marvin.plugins.scale.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Sepia
	Marvin.plugins.sepia = new Sepia();
	Marvin.sepia = function(imageIn, imageOut, intensity){
		Marvin.plugins.sepia.setAttribute("intensity", intensity);
		Marvin.plugins.sepia.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Thresholding
	Marvin.plugins.thresholding = new Thresholding();
	Marvin.thresholding = function(imageIn, imageOut, threshold, thresholdRange){
		Marvin.plugins.thresholding.setAttribute("threshold", threshold);
		Marvin.plugins.thresholding.setAttribute("thresholdRange", thresholdRange);
		Marvin.plugins.thresholding.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// ThresholdingNeighborhood
	Marvin.plugins.thresholdingNeighborhood = new ThresholdingNeighborhood();
	Marvin.thresholdingNeighborhood = function(imageIn, imageOut, thresholdPercentageOfAverage, neighborhoodSide, samplingPixelDistance){
		Marvin.plugins.thresholdingNeighborhood.setAttribute("thresholdPercentageOfAverage", thresholdPercentageOfAverage);
		Marvin.plugins.thresholdingNeighborhood.setAttribute("neighborhoodSide", neighborhoodSide);
		Marvin.plugins.thresholdingNeighborhood.setAttribute("samplingPixelDistance", samplingPixelDistance);
		Marvin.plugins.thresholdingNeighborhood.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
}

var Marvin = new Object();

Marvin.getValue = function(value, defaultValue){
	if(value != null){
		return value;
	} else {
		return defaultValue;
	}
}

marvinLoadPluginMethods();
