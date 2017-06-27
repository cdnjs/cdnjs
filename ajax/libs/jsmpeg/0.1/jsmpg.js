(function(window){ "use strict";

// jsmpeg by Dominic Szablewski - phoboslab.org, github.com/phoboslab
//
// Consider this to be under MIT license. It's largely based an an Open Source
// Decoder for Java under GPL, while I looked at another Decoder from Nokia 
// (under no particular license?) for certain aspects.
// I'm not sure if this work is "derivative" enough to have a different license
// but then again, who still cares about MPEG1?
//
// Based on "Java MPEG-1 Video Decoder and Player" by Korandi Zoltan:
// http://sourceforge.net/projects/javampeg1video/
//
// Inspired by "MPEG Decoder in Java ME" by Nokia:
// http://www.developer.nokia.com/Community/Wiki/MPEG_decoder_in_Java_ME


var requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
})();
		
var jsmpeg = window.jsmpeg = function( url, opts ) {
	opts = opts || {};
	this.benchmark = !!opts.benchmark;
	this.canvas = opts.canvas || document.createElement('canvas');
	this.autoplay = !!opts.autoplay;
	this.loop = !!opts.loop;
	this.seekable = !!opts.seekable;
	this.externalLoadCallback = opts.onload || null;
	this.externalDecodeCallback = opts.ondecodeframe || null;
	this.externalFinishedCallback = opts.onfinished || null;

	this.customIntraQuantMatrix = new Uint8Array(64);
	this.customNonIntraQuantMatrix = new Uint8Array(64);
	this.blockData = new Int32Array(64);
	this.zeroBlockData = new Int32Array(64);
	this.fillArray(this.zeroBlockData, 0);
	
	// use WebGL for YCbCrToRGBA conversion if possible (much faster)
	if( !opts.forceCanvas2D && this.initWebGL() ) {
		this.renderFrame = this.renderFrameGL;
	} else {
		this.canvasContext = this.canvas.getContext('2d');
		this.renderFrame = this.renderFrame2D;
	}

	if( url instanceof WebSocket ) {
		this.client = url;
		this.client.onopen = this.initSocketClient.bind(this);
	} 
	else {
		this.load(url);
	}
};



// ----------------------------------------------------------------------------
// Streaming over WebSockets

jsmpeg.prototype.waitForIntraFrame = true;
jsmpeg.prototype.socketBufferSize = 512 * 1024; // 512kb each

jsmpeg.prototype.initSocketClient = function( client ) {
	this.buffer = new BitReader(new ArrayBuffer(this.socketBufferSize));

	this.nextPictureBuffer = new BitReader(new ArrayBuffer(this.socketBufferSize));
	this.nextPictureBuffer.writePos = 0;
	this.nextPictureBuffer.chunkBegin = 0;
	this.nextPictureBuffer.lastWriteBeforeWrap = 0;

	this.client.binaryType = 'arraybuffer';
	this.client.onmessage = this.receiveSocketMessage.bind(this);
};

jsmpeg.prototype.decodeSocketHeader = function( data ) {
	// Custom header sent to all newly connected clients when streaming
	// over websockets:
	// struct { char magic[4] = "jsmp"; unsigned short width, height; };
	if( 
		data[0] == SOCKET_MAGIC_BYTES.charCodeAt(0) && 
		data[1] == SOCKET_MAGIC_BYTES.charCodeAt(1) && 
		data[2] == SOCKET_MAGIC_BYTES.charCodeAt(2) && 
		data[3] == SOCKET_MAGIC_BYTES.charCodeAt(3)
	) {
		this.width = (data[4] * 256 + data[5]);
		this.height = (data[6] * 256 + data[7]);
		this.initBuffers();
	}
};

jsmpeg.prototype.receiveSocketMessage = function( event ) {
	var messageData = new Uint8Array(event.data);

	if( !this.sequenceStarted ) {
		this.decodeSocketHeader(messageData);
	}

	var current = this.buffer;
	var next = this.nextPictureBuffer;

	if( next.writePos + messageData.length > next.length ) {
		next.lastWriteBeforeWrap = next.writePos;
		next.writePos = 0;
		next.index = 0;
	}
	
	next.bytes.set( messageData, next.writePos );
	next.writePos += messageData.length;

	var startCode = 0;
	while( true ) {
		startCode = next.findNextMPEGStartCode();
		if( 
			startCode == BitReader.NOT_FOUND ||
			((next.index >> 3) > next.writePos)
		) {
			// We reached the end with no picture found yet; move back a few bytes
			// in case we are at the beginning of a start code and exit.
			next.index = Math.max((next.writePos-3), 0) << 3;
			return;
		}
		else if( startCode == START_PICTURE ) {
			break;
		}
	}

	// If we are still here, we found the next picture start code!

	
	// Skip picture decoding until we find the first intra frame?
	if( this.waitForIntraFrame ) {
		next.advance(10); // skip temporalReference
		if( next.getBits(3) == PICTURE_TYPE_I ) {
			this.waitForIntraFrame = false;
			next.chunkBegin = (next.index-13) >> 3;
		}
		return;
	}

	// Last picture hasn't been decoded yet? Decode now but skip output
	// before scheduling the next one
	if( !this.currentPictureDecoded ) {
		this.decodePicture(DECODE_SKIP_OUTPUT);
	}

	
	// Copy the picture chunk over to 'this.buffer' and schedule decoding.
	var chunkEnd = ((next.index) >> 3);

	if( chunkEnd > next.chunkBegin ) {
		// Just copy the current picture chunk
		current.bytes.set( next.bytes.subarray(next.chunkBegin, chunkEnd) );
		current.writePos = chunkEnd - next.chunkBegin;
	}
	else {
		// We wrapped the nextPictureBuffer around, so we have to copy the last part
		// till the end, as well as from 0 to the current writePos
		current.bytes.set( next.bytes.subarray(next.chunkBegin, next.lastWriteBeforeWrap) );
		var written = next.lastWriteBeforeWrap - next.chunkBegin;
		current.bytes.set( next.bytes.subarray(0, chunkEnd), written );
		current.writePos = chunkEnd + written;
	}

	current.index = 0;
	next.chunkBegin = chunkEnd;

	// Decode!
	this.currentPictureDecoded = false;
	requestAnimFrame( this.scheduleDecoding.bind(this), this.canvas );
};

jsmpeg.prototype.scheduleDecoding = function() {
	this.decodePicture();
	this.currentPictureDecoded = true;
};



// ----------------------------------------------------------------------------
// Recording from WebSockets

jsmpeg.prototype.isRecording = false;
jsmpeg.prototype.recorderWaitForIntraFrame = false;
jsmpeg.prototype.recordedFrames = 0;
jsmpeg.prototype.recordedSize = 0;
jsmpeg.prototype.didStartRecordingCallback = null;

jsmpeg.prototype.recordBuffers = [];

jsmpeg.prototype.canRecord = function(){
	return (this.client && this.client.readyState == this.client.OPEN);
};

jsmpeg.prototype.startRecording = function(callback) {
	if( !this.canRecord() ) {
		return;
	}
	
	// Discard old buffers and set for recording
	this.discardRecordBuffers();
	this.isRecording = true;
	this.recorderWaitForIntraFrame = true;
	this.didStartRecordingCallback = callback || null;

	this.recordedFrames = 0;
	this.recordedSize = 0;
	
	// Fudge a simple Sequence Header for the MPEG file
	
	// 3 bytes width & height, 12 bits each
	var wh1 = (this.width >> 4),
		wh2 = ((this.width & 0xf) << 4) | (this.height >> 8),
		wh3 = (this.height & 0xff);
	
	this.recordBuffers.push(new Uint8Array([
		0x00, 0x00, 0x01, 0xb3, // Sequence Start Code
		wh1, wh2, wh3, // Width & height
		0x13, // aspect ratio & framerate
		0xff, 0xff, 0xe1, 0x58, // Meh. Bitrate and other boring stuff
		0x00, 0x00, 0x01, 0xb8, 0x00, 0x08, 0x00, // GOP
		0x00, 0x00, 0x00, 0x01, 0x00 // First Picture Start Code
	]));
};

jsmpeg.prototype.recordFrameFromCurrentBuffer = function() {
	if( !this.isRecording ) { return; }
	
	if( this.recorderWaitForIntraFrame ) {
		// Not an intra frame? Exit.
		if( this.pictureCodingType != PICTURE_TYPE_I ) { return; }
	
		// Start recording!
		this.recorderWaitForIntraFrame = false;
		if( this.didStartRecordingCallback ) {
			this.didStartRecordingCallback( this );
		}
	}
	
	this.recordedFrames++;
	this.recordedSize += this.buffer.writePos;
	
	// Copy the actual subrange for the current picture into a new Buffer
	this.recordBuffers.push(new Uint8Array(this.buffer.bytes.subarray(0, this.buffer.writePos)));
};

jsmpeg.prototype.discardRecordBuffers = function() {
	this.recordBuffers = [];
	this.recordedFrames = 0;
};

jsmpeg.prototype.stopRecording = function() {
	var blob = new Blob(this.recordBuffers, {type: 'video/mpeg'});
	this.discardRecordBuffers();
	this.isRecording = false;
	return blob;
};



// ----------------------------------------------------------------------------
// Loading via Ajax

jsmpeg.prototype.intraFrames = [];
jsmpeg.prototype.currentFrame = -1;
jsmpeg.prototype.currentTime = 0;
jsmpeg.prototype.frameCount = 0;
jsmpeg.prototype.duration = 0;
	
jsmpeg.prototype.load = function( url ) {
	this.url = url;

	var request = new XMLHttpRequest();
	var that = this;
	request.onreadystatechange = function() {		
		if( request.readyState == request.DONE && request.status == 200 ) {
			that.loadCallback(request.response);
		}
	};

	request.onprogress = this.gl 
		? this.updateLoaderGL.bind(this) 
		: this.updateLoader2D.bind(this);

	request.open('GET', url);
	request.responseType = "arraybuffer";
	request.send();
};

jsmpeg.prototype.updateLoader2D = function( ev ) {
	var 
		p = ev.loaded / ev.total,
		w = this.canvas.width,
		h = this.canvas.height,
		ctx = this.canvasContext;

	ctx.fillStyle = '#222';
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, h - h*p, w, h*p);
};

jsmpeg.prototype.updateLoaderGL = function( ev ) {
	var gl = this.gl;
	gl.uniform1f(gl.getUniformLocation(this.loadingProgram, 'loaded'), (ev.loaded / ev.total));
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
	
jsmpeg.prototype.loadCallback = function(file) {
	this.buffer = new BitReader(file);

	if( this.seekable ) {
		this.collectIntraFrames();
		this.buffer.index = 0;
	}
	
	this.findStartCode(START_SEQUENCE);
	this.firstSequenceHeader = this.buffer.index;
	this.decodeSequenceHeader();

	// Calculate the duration. This only works if the video is seekable and we have a frame count
	this.duration = this.frameCount / this.pictureRate;

	// Load the first frame
	this.nextFrame();
	
	if( this.autoplay ) {
		this.play();
	}

	if( this.externalLoadCallback ) {
		this.externalLoadCallback(this);
	}
};

jsmpeg.prototype.collectIntraFrames = function() {
	// Loop through the whole buffer and collect all intraFrames to build our seek index.
	// We also keep track of total frame count here
	var frame;
	for( frame = 0; this.findStartCode(START_PICTURE) !== BitReader.NOT_FOUND; frame++ ) {

		// Check if the found picture is an intra frame and remember the position
		this.buffer.advance(10); // skip temporalReference
		if( this.buffer.getBits(3) == PICTURE_TYPE_I ) {
			// Remember index 13 bits back, before temporalReference and picture type
			this.intraFrames.push({frame: frame, index: this.buffer.index - 13});
		}
	}

	this.frameCount = frame;
};

jsmpeg.prototype.seekToFrame = function(seekFrame, seekExact) {
	if( seekFrame < 0 || seekFrame >= this.frameCount || !this.intraFrames.length ) {
		return false;
	}

	// Find the last intra frame before or equal to seek frame
	var target = null;
	for( var i = 0; i < this.intraFrames.length && this.intraFrames[i].frame <= seekFrame; i++ ) {
		target = this.intraFrames[i];
	}

	this.buffer.index = target.index;
	this.currentFrame = target.frame-1;

	// If we're seeking to the exact frame, we may have to decode some more frames before
	// the one we want
	if( seekExact ) {
		for( var frame = target.frame; frame < seekFrame; frame++ ) {
			this.decodePicture(DECODE_SKIP_OUTPUT);
			this.findStartCode(START_PICTURE);
		}
		this.currentFrame = seekFrame-1;
	}

	// Decode and display the picture we have seeked to
	this.decodePicture();
	return true;
};

jsmpeg.prototype.seekToTime = function(time, seekExact) {
	this.seekToFrame( (time * this.pictureRate)|0, seekExact );
};

jsmpeg.prototype.play = function(file) {
	if( this.playing ) { return; }
	this.targetTime = this.now();
	this.playing = true;
	this.scheduleNextFrame();
};

jsmpeg.prototype.pause = function(file) {
	this.playing = false;
};

jsmpeg.prototype.stop = function(file) {
	this.currentFrame = -1;
	if( this.buffer ) {
		this.buffer.index = this.firstSequenceHeader;
	}
	this.playing = false;
	if( this.client ) {
		this.client.close();
		this.client = null;
	}
};



// ----------------------------------------------------------------------------
// Utilities

jsmpeg.prototype.readCode = function(codeTable) {
	var state = 0;
	do {
		state = codeTable[state + this.buffer.getBits(1)];
	} while( state >= 0 && codeTable[state] != 0 );
	return codeTable[state+2];
};

jsmpeg.prototype.findStartCode = function( code ) {
	var current = 0;
	while( true ) {
		current = this.buffer.findNextMPEGStartCode();
		if( current == code || current == BitReader.NOT_FOUND ) {
			return current;
		}
	}
	return BitReader.NOT_FOUND;
};

jsmpeg.prototype.fillArray = function(a, value) {
	for( var i = 0, length = a.length; i < length; i++ ) {
		a[i] = value;
	}
};



// ----------------------------------------------------------------------------
// Sequence Layer

jsmpeg.prototype.pictureRate = 30;
jsmpeg.prototype.lateTime = 0;
jsmpeg.prototype.firstSequenceHeader = 0;
jsmpeg.prototype.targetTime = 0;

jsmpeg.prototype.benchmark = false;
jsmpeg.prototype.benchFrame = 0;
jsmpeg.prototype.benchDecodeTimes = 0;
jsmpeg.prototype.benchAvgFrameTime = 0;

jsmpeg.prototype.now = function() {
	return window.performance 
		? window.performance.now() 
		: Date.now();
}

jsmpeg.prototype.nextFrame = function() {
	if( !this.buffer ) { return; }

	var frameStart = this.now();
	while(true) {
		var code = this.buffer.findNextMPEGStartCode();
		
		if( code == START_SEQUENCE ) {
			this.decodeSequenceHeader();
		}
		else if( code == START_PICTURE ) {
			if( this.playing ) {
				this.scheduleNextFrame();
			}
			this.decodePicture();
			this.benchDecodeTimes += this.now() - frameStart;
			return this.canvas;
		}
		else if( code == BitReader.NOT_FOUND ) {
			this.stop(); // Jump back to the beginning

			if( this.externalFinishedCallback ) {
				this.externalFinishedCallback(this);
			}

			// Only loop if we found a sequence header
			if( this.loop && this.sequenceStarted ) {
				this.play();
			}
			return null;
		}
		else {
			// ignore (GROUP, USER_DATA, EXTENSION, SLICES...)
		}
	}
};

jsmpeg.prototype.scheduleNextFrame = function() {
	this.lateTime = this.now() - this.targetTime;
	var wait = Math.max(0, (1000/this.pictureRate) - this.lateTime);
	this.targetTime = this.now() + wait;

	if( this.benchmark ) {
		this.benchFrame++;
		if( this.benchFrame >= 120 ) {
			this.benchAvgFrameTime = this.benchDecodeTimes / this.benchFrame;
			this.benchFrame = 0;
			this.benchDecodeTimes = 0;
			if( window.console ) { console.log("Average time per frame:", this.benchAvgFrameTime, 'ms'); }
		}
		setTimeout( this.nextFrame.bind(this), 0);
	}
	else if( wait < 18) {
		this.scheduleAnimation();
	}
	else {
		setTimeout( this.scheduleAnimation.bind(this), wait );
	}
};

jsmpeg.prototype.scheduleAnimation = function() {
	requestAnimFrame( this.nextFrame.bind(this), this.canvas );
};
	
jsmpeg.prototype.decodeSequenceHeader = function() {
	this.width = this.buffer.getBits(12);
	this.height = this.buffer.getBits(12);
	this.buffer.advance(4); // skip pixel aspect ratio
	this.pictureRate = PICTURE_RATE[this.buffer.getBits(4)];
	this.buffer.advance(18 + 1 + 10 + 1); // skip bitRate, marker, bufferSize and constrained bit

	this.initBuffers();

	if( this.buffer.getBits(1) ) { // load custom intra quant matrix?
		for( var i = 0; i < 64; i++ ) {
			this.customIntraQuantMatrix[ZIG_ZAG[i]] = this.buffer.getBits(8);
		}
		this.intraQuantMatrix = this.customIntraQuantMatrix;
	}
	
	if( this.buffer.getBits(1) ) { // load custom non intra quant matrix?
		for( var i = 0; i < 64; i++ ) {
			this.customNonIntraQuantMatrix[ZIG_ZAG[i]] = this.buffer.getBits(8);
		}
		this.nonIntraQuantMatrix = this.customNonIntraQuantMatrix;
	}
};

jsmpeg.prototype.initBuffers = function() {	
	this.intraQuantMatrix = DEFAULT_INTRA_QUANT_MATRIX;
	this.nonIntraQuantMatrix = DEFAULT_NON_INTRA_QUANT_MATRIX;
	
	this.mbWidth = (this.width + 15) >> 4;
	this.mbHeight = (this.height + 15) >> 4;
	this.mbSize = this.mbWidth * this.mbHeight;
	
	this.codedWidth = this.mbWidth << 4;
	this.codedHeight = this.mbHeight << 4;
	this.codedSize = this.codedWidth * this.codedHeight;
	
	this.halfWidth = this.mbWidth << 3;
	this.halfHeight = this.mbHeight << 3;
	this.quarterSize = this.codedSize >> 2;
	
	// Sequence already started? Don't allocate buffers again
	if( this.sequenceStarted ) { return; }
	this.sequenceStarted = true;
	
	
	// Manually clamp values when writing macroblocks for shitty browsers
	// that don't support Uint8ClampedArray
	var MaybeClampedUint8Array = window.Uint8ClampedArray || window.Uint8Array;
	if( !window.Uint8ClampedArray ) {
		this.copyBlockToDestination = this.copyBlockToDestinationClamp;
		this.addBlockToDestination = this.addBlockToDestinationClamp;
	}
	
	// Allocated buffers and resize the canvas
	this.currentY = new MaybeClampedUint8Array(this.codedSize);
	this.currentY32 = new Uint32Array(this.currentY.buffer);

	this.currentCr = new MaybeClampedUint8Array(this.codedSize >> 2);
	this.currentCr32 = new Uint32Array(this.currentCr.buffer);

	this.currentCb = new MaybeClampedUint8Array(this.codedSize >> 2);
	this.currentCb32 = new Uint32Array(this.currentCb.buffer);
	

	this.forwardY = new MaybeClampedUint8Array(this.codedSize);
	this.forwardY32 = new Uint32Array(this.forwardY.buffer);

	this.forwardCr = new MaybeClampedUint8Array(this.codedSize >> 2);
	this.forwardCr32 = new Uint32Array(this.forwardCr.buffer);

	this.forwardCb = new MaybeClampedUint8Array(this.codedSize >> 2);
	this.forwardCb32 = new Uint32Array(this.forwardCb.buffer);
	
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	
	if( this.gl ) {
		this.gl.useProgram(this.program);
		this.gl.viewport(0, 0, this.width, this.height);
	}
	else {
		this.currentRGBA = this.canvasContext.getImageData(0, 0, this.width, this.height);
		this.fillArray(this.currentRGBA.data, 255);
	}
};




// ----------------------------------------------------------------------------
// Picture Layer

jsmpeg.prototype.currentY = null;
jsmpeg.prototype.currentCr = null;
jsmpeg.prototype.currentCb = null;

jsmpeg.prototype.currentRGBA = null;

jsmpeg.prototype.pictureCodingType = 0;

// Buffers for motion compensation
jsmpeg.prototype.forwardY = null;
jsmpeg.prototype.forwardCr = null;
jsmpeg.prototype.forwardCb = null;

jsmpeg.prototype.fullPelForward = false;
jsmpeg.prototype.forwardFCode = 0;
jsmpeg.prototype.forwardRSize = 0;
jsmpeg.prototype.forwardF = 0;


jsmpeg.prototype.decodePicture = function(skipOutput) {
	this.currentFrame++;
	this.currentTime = this.currentFrame / this.pictureRate;

	this.buffer.advance(10); // skip temporalReference
	this.pictureCodingType = this.buffer.getBits(3);
	this.buffer.advance(16); // skip vbv_delay
	
	// Skip B and D frames or unknown coding type
	if( this.pictureCodingType <= 0 || this.pictureCodingType >= PICTURE_TYPE_B ) {
		return;
	}
	
	// full_pel_forward, forward_f_code
	if( this.pictureCodingType == PICTURE_TYPE_P ) {
		this.fullPelForward = this.buffer.getBits(1);
		this.forwardFCode = this.buffer.getBits(3);
		if( this.forwardFCode == 0 ) {
			// Ignore picture with zero forward_f_code
			return;
		}
		this.forwardRSize = this.forwardFCode - 1;
		this.forwardF = 1 << this.forwardRSize;
	}
	
	var code = 0;
	do {
		code = this.buffer.findNextMPEGStartCode();
	} while( code == START_EXTENSION || code == START_USER_DATA );
	
	
	while( code >= START_SLICE_FIRST && code <= START_SLICE_LAST ) {
		this.decodeSlice( (code & 0x000000FF) );
		code = this.buffer.findNextMPEGStartCode();
	}
	
	// We found the next start code; rewind 32bits and let the main loop handle it.
	this.buffer.rewind(32);

	// Record this frame, if the recorder wants it
	this.recordFrameFromCurrentBuffer();
	
	
	if( skipOutput != DECODE_SKIP_OUTPUT ) {
		this.renderFrame();

		if(this.externalDecodeCallback) {
			this.externalDecodeCallback(this, this.canvas);
		}
	}
	
	// If this is a reference picutre then rotate the prediction pointers
	if( this.pictureCodingType == PICTURE_TYPE_I || this.pictureCodingType == PICTURE_TYPE_P ) {
		var 
			tmpY = this.forwardY,
			tmpY32 = this.forwardY32,
			tmpCr = this.forwardCr,
			tmpCr32 = this.forwardCr32,
			tmpCb = this.forwardCb,
			tmpCb32 = this.forwardCb32;

		this.forwardY = this.currentY;
		this.forwardY32 = this.currentY32;
		this.forwardCr = this.currentCr;
		this.forwardCr32 = this.currentCr32;
		this.forwardCb = this.currentCb;
		this.forwardCb32 = this.currentCb32;

		this.currentY = tmpY;
		this.currentY32 = tmpY32;
		this.currentCr = tmpCr;
		this.currentCr32 = tmpCr32;
		this.currentCb = tmpCb;
		this.currentCb32 = tmpCb32;
	}
};

jsmpeg.prototype.YCbCrToRGBA = function() {	
	var pY = this.currentY;
	var pCb = this.currentCb;
	var pCr = this.currentCr;
	var pRGBA = this.currentRGBA.data;

	// Chroma values are the same for each block of 4 pixels, so we proccess
	// 2 lines at a time, 2 neighboring pixels each.
	// I wish we could use 32bit writes to the RGBA buffer instead of writing
	// each byte separately, but we need the automatic clamping of the RGBA
	// buffer.

	var yIndex1 = 0;
	var yIndex2 = this.codedWidth;
	var yNext2Lines = this.codedWidth + (this.codedWidth - this.width);

	var cIndex = 0;
	var cNextLine = this.halfWidth - (this.width >> 1);

	var rgbaIndex1 = 0;
	var rgbaIndex2 = this.width * 4;
	var rgbaNext2Lines = this.width * 4;
	
	var cols = this.width >> 1;
	var rows = this.height >> 1;

	var y, cb, cr, r, g, b;

	for( var row = 0; row < rows; row++ ) {
		for( var col = 0; col < cols; col++ ) {
			cb = pCb[cIndex];
			cr = pCr[cIndex];
			cIndex++;
			
			r = (cr + ((cr * 103) >> 8)) - 179;
			g = ((cb * 88) >> 8) - 44 + ((cr * 183) >> 8) - 91;
			b = (cb + ((cb * 198) >> 8)) - 227;
			
			// Line 1
			var y1 = pY[yIndex1++];
			var y2 = pY[yIndex1++];
			pRGBA[rgbaIndex1]   = y1 + r;
			pRGBA[rgbaIndex1+1] = y1 - g;
			pRGBA[rgbaIndex1+2] = y1 + b;
			pRGBA[rgbaIndex1+4] = y2 + r;
			pRGBA[rgbaIndex1+5] = y2 - g;
			pRGBA[rgbaIndex1+6] = y2 + b;
			rgbaIndex1 += 8;

			// Line 2
			var y3 = pY[yIndex2++];
			var y4 = pY[yIndex2++];
			pRGBA[rgbaIndex2]   = y3 + r;
			pRGBA[rgbaIndex2+1] = y3 - g;
			pRGBA[rgbaIndex2+2] = y3 + b;
			pRGBA[rgbaIndex2+4] = y4 + r;
			pRGBA[rgbaIndex2+5] = y4 - g;
			pRGBA[rgbaIndex2+6] = y4 + b;
			rgbaIndex2 += 8;
		}
		
		yIndex1 += yNext2Lines;
		yIndex2 += yNext2Lines;
		rgbaIndex1 += rgbaNext2Lines;
		rgbaIndex2 += rgbaNext2Lines;
		cIndex += cNextLine;
	}
};

jsmpeg.prototype.renderFrame2D = function() {
	this.YCbCrToRGBA();
	this.canvasContext.putImageData(this.currentRGBA, 0, 0);
};


// ----------------------------------------------------------------------------
// Accelerated WebGL YCbCrToRGBA conversion

jsmpeg.prototype.gl = null;
jsmpeg.prototype.program = null;
jsmpeg.prototype.YTexture = null;
jsmpeg.prototype.CBTexture = null;
jsmpeg.prototype.CRTexture = null;

jsmpeg.prototype.createTexture = function(index, name) {
	var gl = this.gl;
	var texture = gl.createTexture();
	
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.uniform1i(gl.getUniformLocation(this.program, name), index);
	
	return texture;
};

jsmpeg.prototype.compileShader = function(type, source) {
	var gl = this.gl;
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	
	if( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
		throw new Error(gl.getShaderInfoLog(shader));
	}
		
	return shader;
};

jsmpeg.prototype.initWebGL = function() {
	// attempt to get a webgl context
	try {
		var gl = this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
	} catch (e) {
		return false;
	}
	
	if (!gl) {
		return false;
	}

	// init buffers
	this.buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);

	// The main YCbCrToRGBA Shader
	this.program = gl.createProgram();
	gl.attachShader(this.program, this.compileShader(gl.VERTEX_SHADER, SHADER_VERTEX_IDENTITY));
	gl.attachShader(this.program, this.compileShader(gl.FRAGMENT_SHADER, SHADER_FRAGMENT_YCBCRTORGBA));
	gl.linkProgram(this.program);
	
	if( !gl.getProgramParameter(this.program, gl.LINK_STATUS) ) {
		throw new Error(gl.getProgramInfoLog(this.program));
	}
	
	gl.useProgram(this.program);
	
	// setup textures
	this.YTexture = this.createTexture(0, 'YTexture');
	this.CBTexture = this.createTexture(1, 'CBTexture');
	this.CRTexture = this.createTexture(2, 'CRTexture');
	
	var vertexAttr = gl.getAttribLocation(this.program, 'vertex');
	gl.enableVertexAttribArray(vertexAttr);
	gl.vertexAttribPointer(vertexAttr, 2, gl.FLOAT, false, 0, 0);


	// Shader for the loading screen
	this.loadingProgram = gl.createProgram();
	gl.attachShader(this.loadingProgram, this.compileShader(gl.VERTEX_SHADER, SHADER_VERTEX_IDENTITY));
	gl.attachShader(this.loadingProgram, this.compileShader(gl.FRAGMENT_SHADER, SHADER_FRAGMENT_LOADING));
	gl.linkProgram(this.loadingProgram);

	gl.useProgram(this.loadingProgram);

	vertexAttr = gl.getAttribLocation(this.loadingProgram, 'vertex');
	gl.enableVertexAttribArray(vertexAttr);
	gl.vertexAttribPointer(vertexAttr, 2, gl.FLOAT, false, 0, 0);
	
	return true;
};

jsmpeg.prototype.renderFrameGL = function() {
	var gl = this.gl;

	// WebGL doesn't like Uint8ClampedArrays, so we have to create a Uint8Array view for 
	// each plane
	var uint8Y = new Uint8Array(this.currentY.buffer),
		uint8Cr = new Uint8Array(this.currentCr.buffer),
		uint8Cb = new Uint8Array(this.currentCb.buffer);
	
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.YTexture);

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, this.codedWidth, this.height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Y);
	
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, this.CBTexture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, this.halfWidth, this.height/2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Cr);
	
	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, this.CRTexture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, this.halfWidth, this.height/2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Cb);
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};


// ----------------------------------------------------------------------------
// Slice Layer

jsmpeg.prototype.quantizerScale = 0;
jsmpeg.prototype.sliceBegin = false;

jsmpeg.prototype.decodeSlice = function(slice) {	
	this.sliceBegin = true;
	this.macroblockAddress = (slice - 1) * this.mbWidth - 1;
	
	// Reset motion vectors and DC predictors
	this.motionFwH = this.motionFwHPrev = 0;
	this.motionFwV = this.motionFwVPrev = 0;
	this.dcPredictorY  = 128;
	this.dcPredictorCr = 128;
	this.dcPredictorCb = 128;
	
	this.quantizerScale = this.buffer.getBits(5);
	
	// skip extra bits
	while( this.buffer.getBits(1) ) {
		this.buffer.advance(8);
	}

	do {
		this.decodeMacroblock();
		// We may have to ignore Video Stream Start Codes here (0xE0)!?
	} while( !this.buffer.nextBytesAreStartCode() );
}


// ----------------------------------------------------------------------------
// Macroblock Layer

jsmpeg.prototype.macroblockAddress = 0;
jsmpeg.prototype.mbRow = 0;
jsmpeg.prototype.mbCol = 0;
	
jsmpeg.prototype.macroblockType = 0;
jsmpeg.prototype.macroblockIntra = false;
jsmpeg.prototype.macroblockMotFw = false;
	
jsmpeg.prototype.motionFwH = 0;
jsmpeg.prototype.motionFwV = 0;
jsmpeg.prototype.motionFwHPrev = 0;
jsmpeg.prototype.motionFwVPrev = 0;

jsmpeg.prototype.decodeMacroblock = function() {
	// Decode macroblock_address_increment
	var 
		increment = 0,
		t = this.readCode(MACROBLOCK_ADDRESS_INCREMENT);
	
	while( t == 34 ) {
		// macroblock_stuffing
		t = this.readCode(MACROBLOCK_ADDRESS_INCREMENT);
	}
	while( t == 35 ) {
		// macroblock_escape
		increment += 33;
		t = this.readCode(MACROBLOCK_ADDRESS_INCREMENT);
	}
	increment += t;

	// Process any skipped macroblocks
	if( this.sliceBegin ) {
		// The first macroblock_address_increment of each slice is relative
		// to beginning of the preverious row, not the preverious macroblock
		this.sliceBegin = false;
		this.macroblockAddress += increment;
	}
	else {
		if( this.macroblockAddress + increment >= this.mbSize ) {
			// Illegal (too large) macroblock_address_increment
			return;
		}
		if( increment > 1 ) {
			// Skipped macroblocks reset DC predictors
			this.dcPredictorY  = 128;
			this.dcPredictorCr = 128;
			this.dcPredictorCb = 128;
			
			// Skipped macroblocks in P-pictures reset motion vectors
			if( this.pictureCodingType == PICTURE_TYPE_P ) {
				this.motionFwH = this.motionFwHPrev = 0;
				this.motionFwV = this.motionFwVPrev = 0;
			}
		}
		
		// Predict skipped macroblocks
		while( increment > 1) {
			this.macroblockAddress++;
			this.mbRow = (this.macroblockAddress / this.mbWidth)|0;
			this.mbCol = this.macroblockAddress % this.mbWidth;
			this.copyMacroblock(this.motionFwH, this.motionFwV, this.forwardY, this.forwardCr, this.forwardCb);
			increment--;
		}
		this.macroblockAddress++;
	}
	this.mbRow = (this.macroblockAddress / this.mbWidth)|0;
	this.mbCol = this.macroblockAddress % this.mbWidth;

	// Process the current macroblock
	this.macroblockType = this.readCode(MACROBLOCK_TYPE_TABLES[this.pictureCodingType]);
	this.macroblockIntra = (this.macroblockType & 0x01);
	this.macroblockMotFw = (this.macroblockType & 0x08);

	// Quantizer scale
	if( (this.macroblockType & 0x10) != 0 ) {
		this.quantizerScale = this.buffer.getBits(5);
	}

	if( this.macroblockIntra ) {
		// Intra-coded macroblocks reset motion vectors
		this.motionFwH = this.motionFwHPrev = 0;
		this.motionFwV = this.motionFwVPrev = 0;
	}
	else {
		// Non-intra macroblocks reset DC predictors
		this.dcPredictorY = 128;
		this.dcPredictorCr = 128;
		this.dcPredictorCb = 128;
		
		this.decodeMotionVectors();
		this.copyMacroblock(this.motionFwH, this.motionFwV, this.forwardY, this.forwardCr, this.forwardCb);
	}

	// Decode blocks
	var cbp = ((this.macroblockType & 0x02) != 0) 
		? this.readCode(CODE_BLOCK_PATTERN) 
		: (this.macroblockIntra ? 0x3f : 0);

	for( var block = 0, mask = 0x20; block < 6; block++ ) {
		if( (cbp & mask) != 0 ) {
			this.decodeBlock(block);
		}
		mask >>= 1;
	}
};


jsmpeg.prototype.decodeMotionVectors = function() {
	var code, d, r = 0;
	
	// Forward
	if( this.macroblockMotFw ) {
		// Horizontal forward
		code = this.readCode(MOTION);
		if( (code != 0) && (this.forwardF != 1) ) {
			r = this.buffer.getBits(this.forwardRSize);
			d = ((Math.abs(code) - 1) << this.forwardRSize) + r + 1;
			if( code < 0 ) {
				d = -d;
			}
		}
		else {
			d = code;
		}
		
		this.motionFwHPrev += d;
		if( this.motionFwHPrev > (this.forwardF << 4) - 1 ) {
			this.motionFwHPrev -= this.forwardF << 5;
		}
		else if( this.motionFwHPrev < ((-this.forwardF) << 4) ) {
			this.motionFwHPrev += this.forwardF << 5;
		}
		
		this.motionFwH = this.motionFwHPrev;
		if( this.fullPelForward ) {
			this.motionFwH <<= 1;
		}
		
		// Vertical forward
		code = this.readCode(MOTION);
		if( (code != 0) && (this.forwardF != 1) ) {
			r = this.buffer.getBits(this.forwardRSize);
			d = ((Math.abs(code) - 1) << this.forwardRSize) + r + 1;
			if( code < 0 ) {
				d = -d;
			}
		}
		else {
			d = code;
		}
		
		this.motionFwVPrev += d;
		if( this.motionFwVPrev > (this.forwardF << 4) - 1 ) {
			this.motionFwVPrev -= this.forwardF << 5;
		}
		else if( this.motionFwVPrev < ((-this.forwardF) << 4) ) {
			this.motionFwVPrev += this.forwardF << 5;
		}
		
		this.motionFwV = this.motionFwVPrev;
		if( this.fullPelForward ) {
			this.motionFwV <<= 1;
		}
	}
	else if( this.pictureCodingType == PICTURE_TYPE_P ) {
		// No motion information in P-picture, reset vectors
		this.motionFwH = this.motionFwHPrev = 0;
		this.motionFwV = this.motionFwVPrev = 0;
	}
};

jsmpeg.prototype.copyMacroblock = function(motionH, motionV, sY, sCr, sCb ) {
	var 
		width, scan, 
		H, V, oddH, oddV,
		src, dest, last;

	// We use 32bit writes here
	var dY = this.currentY32;
	var dCb = this.currentCb32;
	var dCr = this.currentCr32;

	// Luminance
	width = this.codedWidth;
	scan = width - 16;
	
	H = motionH >> 1;
	V = motionV >> 1;
	oddH = (motionH & 1) == 1;
	oddV = (motionV & 1) == 1;
	
	src = ((this.mbRow << 4) + V) * width + (this.mbCol << 4) + H;
	dest = (this.mbRow * width + this.mbCol) << 2;
	last = dest + (width << 2);

	var y1, y2, y;
	if( oddH ) {
		if( oddV ) {
			while( dest < last ) {
				y1 = sY[src] + sY[src+width]; src++;
				for( var x = 0; x < 4; x++ ) {
					y2 = sY[src] + sY[src+width]; src++;
					y = (((y1 + y2 + 2) >> 2) & 0xff);

					y1 = sY[src] + sY[src+width]; src++;
					y |= (((y1 + y2 + 2) << 6) & 0xff00);
					
					y2 = sY[src] + sY[src+width]; src++;
					y |= (((y1 + y2 + 2) << 14) & 0xff0000);

					y1 = sY[src] + sY[src+width]; src++;
					y |= (((y1 + y2 + 2) << 22) & 0xff000000);

					dY[dest++] = y;
				}
				dest += scan >> 2; src += scan-1;
			}
		}
		else {
			while( dest < last ) {
				y1 = sY[src++];
				for( var x = 0; x < 4; x++ ) {
					y2 = sY[src++];
					y = (((y1 + y2 + 1) >> 1) & 0xff);
					
					y1 = sY[src++];
					y |= (((y1 + y2 + 1) << 7) & 0xff00);
					
					y2 = sY[src++];
					y |= (((y1 + y2 + 1) << 15) & 0xff0000);
					
					y1 = sY[src++];
					y |= (((y1 + y2 + 1) << 23) & 0xff000000);

					dY[dest++] = y;
				}
				dest += scan >> 2; src += scan-1;
			}
		}
	}
	else {
		if( oddV ) {
			while( dest < last ) {
				for( var x = 0; x < 4; x++ ) {
					y = (((sY[src] + sY[src+width] + 1) >> 1) & 0xff); src++;
					y |= (((sY[src] + sY[src+width] + 1) << 7) & 0xff00); src++;
					y |= (((sY[src] + sY[src+width] + 1) << 15) & 0xff0000); src++;
					y |= (((sY[src] + sY[src+width] + 1) << 23) & 0xff000000); src++;
					
					dY[dest++] = y;
				}
				dest += scan >> 2; src += scan;
			}
		}
		else {
			while( dest < last ) {
				for( var x = 0; x < 4; x++ ) {
					y = sY[src]; src++;
					y |= sY[src] << 8; src++;
					y |= sY[src] << 16; src++;
					y |= sY[src] << 24; src++;

					dY[dest++] = y;
				}
				dest += scan >> 2; src += scan;
			}
		}
	}

	// Chrominance
	
	width = this.halfWidth;
	scan = width - 8;
	
	H = (motionH/2) >> 1;
	V = (motionV/2) >> 1;
	oddH = ((motionH/2) & 1) == 1;
	oddV = ((motionV/2) & 1) == 1;
	
	src = ((this.mbRow << 3) + V) * width + (this.mbCol << 3) + H;
	dest = (this.mbRow * width + this.mbCol) << 1;
	last = dest + (width << 1);
	
	var cr1, cr2, cr;
	var cb1, cb2, cb;
	if( oddH ) {
		if( oddV ) {
			while( dest < last ) {
				cr1 = sCr[src] + sCr[src+width];
				cb1 = sCb[src] + sCb[src+width];
				src++;
				for( var x = 0; x < 2; x++ ) {
					cr2 = sCr[src] + sCr[src+width];
					cb2 = sCb[src] + sCb[src+width]; src++;
					cr = (((cr1 + cr2 + 2) >> 2) & 0xff);
					cb = (((cb1 + cb2 + 2) >> 2) & 0xff);

					cr1 = sCr[src] + sCr[src+width];
					cb1 = sCb[src] + sCb[src+width]; src++;
					cr |= (((cr1 + cr2 + 2) << 6) & 0xff00);
					cb |= (((cb1 + cb2 + 2) << 6) & 0xff00);

					cr2 = sCr[src] + sCr[src+width];
					cb2 = sCb[src] + sCb[src+width]; src++;
					cr |= (((cr1 + cr2 + 2) << 14) & 0xff0000);
					cb |= (((cb1 + cb2 + 2) << 14) & 0xff0000);

					cr1 = sCr[src] + sCr[src+width];
					cb1 = sCb[src] + sCb[src+width]; src++;
					cr |= (((cr1 + cr2 + 2) << 22) & 0xff000000);
					cb |= (((cb1 + cb2 + 2) << 22) & 0xff000000);

					dCr[dest] = cr;
					dCb[dest] = cb;
					dest++;
				}
				dest += scan >> 2; src += scan-1;
			}
		}
		else {
			while( dest < last ) {
				cr1 = sCr[src];
				cb1 = sCb[src];
				src++;
				for( var x = 0; x < 2; x++ ) {
					cr2 = sCr[src];
					cb2 = sCb[src++];
					cr = (((cr1 + cr2 + 1) >> 1) & 0xff);
					cb = (((cb1 + cb2 + 1) >> 1) & 0xff);

					cr1 = sCr[src];
					cb1 = sCb[src++];
					cr |= (((cr1 + cr2 + 1) << 7) & 0xff00);
					cb |= (((cb1 + cb2 + 1) << 7) & 0xff00);

					cr2 = sCr[src];
					cb2 = sCb[src++];
					cr |= (((cr1 + cr2 + 1) << 15) & 0xff0000);
					cb |= (((cb1 + cb2 + 1) << 15) & 0xff0000);

					cr1 = sCr[src];
					cb1 = sCb[src++];
					cr |= (((cr1 + cr2 + 1) << 23) & 0xff000000);
					cb |= (((cb1 + cb2 + 1) << 23) & 0xff000000);

					dCr[dest] = cr;
					dCb[dest] = cb;
					dest++;
				}
				dest += scan >> 2; src += scan-1;
			}
		}
	}
	else {
		if( oddV ) {
			while( dest < last ) {
				for( var x = 0; x < 2; x++ ) {
					cr = (((sCr[src] + sCr[src+width] + 1) >> 1) & 0xff);
					cb = (((sCb[src] + sCb[src+width] + 1) >> 1) & 0xff); src++;

					cr |= (((sCr[src] + sCr[src+width] + 1) << 7) & 0xff00);
					cb |= (((sCb[src] + sCb[src+width] + 1) << 7) & 0xff00); src++;

					cr |= (((sCr[src] + sCr[src+width] + 1) << 15) & 0xff0000);
					cb |= (((sCb[src] + sCb[src+width] + 1) << 15) & 0xff0000); src++;

					cr |= (((sCr[src] + sCr[src+width] + 1) << 23) & 0xff000000);
					cb |= (((sCb[src] + sCb[src+width] + 1) << 23) & 0xff000000); src++;
					
					dCr[dest] = cr;
					dCb[dest] = cb;
					dest++;
				}
				dest += scan >> 2; src += scan;
			}
		}
		else {
			while( dest < last ) {
				for( var x = 0; x < 2; x++ ) {
					cr = sCr[src];
					cb = sCb[src]; src++;

					cr |= sCr[src] << 8;
					cb |= sCb[src] << 8; src++;

					cr |= sCr[src] << 16;
					cb |= sCb[src] << 16; src++;

					cr |= sCr[src] << 24;
					cb |= sCb[src] << 24; src++;

					dCr[dest] = cr;
					dCb[dest] = cb;
					dest++;
				}
				dest += scan >> 2; src += scan;
			}
		}
	}
};


// ----------------------------------------------------------------------------
// Block layer

jsmpeg.prototype.dcPredictorY;
jsmpeg.prototype.dcPredictorCr;
jsmpeg.prototype.dcPredictorCb;

jsmpeg.prototype.blockData = null;
jsmpeg.prototype.decodeBlock = function(block) {
	
	var
		n = 0,
		quantMatrix;
		
	// Decode DC coefficient of intra-coded blocks
	if( this.macroblockIntra ) {
		var 
			predictor,
			dctSize;
		
		// DC prediction
		
		if( block < 4 ) {
			predictor = this.dcPredictorY;
			dctSize = this.readCode(DCT_DC_SIZE_LUMINANCE);
		}
		else {
			predictor = (block == 4 ? this.dcPredictorCr : this.dcPredictorCb);
			dctSize = this.readCode(DCT_DC_SIZE_CHROMINANCE);
		}
		
		// Read DC coeff
		if( dctSize > 0 ) {
			var differential = this.buffer.getBits(dctSize);
			if( (differential & (1 << (dctSize - 1))) != 0 ) {
				this.blockData[0] = predictor + differential;
			}
			else {
				this.blockData[0] = predictor + ((-1 << dctSize)|(differential+1));
			}
		}
		else {
			this.blockData[0] = predictor;
		}
		
		// Save predictor value
		if( block < 4 ) {
			this.dcPredictorY = this.blockData[0];
		}
		else if( block == 4 ) {
			this.dcPredictorCr = this.blockData[0];
		}
		else {
			this.dcPredictorCb = this.blockData[0];
		}
		
		// Dequantize + premultiply
		this.blockData[0] <<= (3 + 5);
		
		quantMatrix = this.intraQuantMatrix;
		n = 1;
	}
	else {
		quantMatrix = this.nonIntraQuantMatrix;
	}
	
	// Decode AC coefficients (+DC for non-intra)
	var level = 0;
	while( true ) {
		var 
			run = 0,
			coeff = this.readCode(DCT_COEFF);
		
		if( (coeff == 0x0001) && (n > 0) && (this.buffer.getBits(1) == 0) ) {
			// end_of_block
			break;
		}
		if( coeff == 0xffff ) {
			// escape
			run = this.buffer.getBits(6);
			level = this.buffer.getBits(8);
			if( level == 0 ) {
				level = this.buffer.getBits(8);
			}
			else if( level == 128 ) {
				level = this.buffer.getBits(8) - 256;
			}
			else if( level > 128 ) {
				level = level - 256;
			}
		}
		else {
			run = coeff >> 8;
			level = coeff & 0xff;
			if( this.buffer.getBits(1) ) {
				level = -level;
			}
		}
		
		n += run;
		var dezigZagged = ZIG_ZAG[n];
		n++;
		
		// Dequantize, oddify, clip
		level <<= 1;
		if( !this.macroblockIntra ) {
			level += (level < 0 ? -1 : 1);
		}
		level = (level * this.quantizerScale * quantMatrix[dezigZagged]) >> 4;
		if( (level & 1) == 0 ) {
			level -= level > 0 ? 1 : -1;
		}
		if( level > 2047 ) {
			level = 2047;
		}
		else if( level < -2048 ) {
			level = -2048;
		}

		// Save premultiplied coefficient
		this.blockData[dezigZagged] = level * PREMULTIPLIER_MATRIX[dezigZagged];
	};
	
	// Move block to its place
	var
		destArray,
		destIndex,
		scan;
	
	if( block < 4 ) {
		destArray = this.currentY;
		scan = this.codedWidth - 8;
		destIndex = (this.mbRow * this.codedWidth + this.mbCol) << 4;
		if( (block & 1) != 0 ) {
			destIndex += 8;
		}
		if( (block & 2) != 0 ) {
			destIndex += this.codedWidth << 3;
		}
	}
	else {
		destArray = (block == 4) ? this.currentCb : this.currentCr;
		scan = (this.codedWidth >> 1) - 8;
		destIndex = ((this.mbRow * this.codedWidth) << 2) + (this.mbCol << 3);
	}

	if( this.macroblockIntra ) {
		// Overwrite (no prediction)
		if (n == 1) {
			this.copyValueToDestination((this.blockData[0] + 128) >> 8, destArray, destIndex, scan);
			this.blockData[0] = 0;
		} else {
			this.IDCT();
			this.copyBlockToDestination(this.blockData, destArray, destIndex, scan);
			this.blockData.set(this.zeroBlockData);	
		}
	}
	else {
		// Add data to the predicted macroblock
		if (n == 1) {
			this.addValueToDestination((this.blockData[0] + 128) >> 8, destArray, destIndex, scan);
			this.blockData[0] = 0;
		} else {
			this.IDCT();
			this.addBlockToDestination(this.blockData, destArray, destIndex, scan);	
			this.blockData.set(this.zeroBlockData);	
		}
	}
	
	n = 0;
};

jsmpeg.prototype.copyBlockToDestination = function(blockData, destArray, destIndex, scan) {
	for( var n = 0; n < 64; n += 8, destIndex += scan+8 ) {
		destArray[destIndex+0] = blockData[n+0];
		destArray[destIndex+1] = blockData[n+1];
		destArray[destIndex+2] = blockData[n+2];
		destArray[destIndex+3] = blockData[n+3];
		destArray[destIndex+4] = blockData[n+4];
		destArray[destIndex+5] = blockData[n+5];
		destArray[destIndex+6] = blockData[n+6];
		destArray[destIndex+7] = blockData[n+7];
	}
};

jsmpeg.prototype.addBlockToDestination = function(blockData, destArray, destIndex, scan) {
	for( var n = 0; n < 64; n += 8, destIndex += scan+8 ) {
		destArray[destIndex+0] += blockData[n+0];
		destArray[destIndex+1] += blockData[n+1];
		destArray[destIndex+2] += blockData[n+2];
		destArray[destIndex+3] += blockData[n+3];
		destArray[destIndex+4] += blockData[n+4];
		destArray[destIndex+5] += blockData[n+5];
		destArray[destIndex+6] += blockData[n+6];
		destArray[destIndex+7] += blockData[n+7];
	}
};

jsmpeg.prototype.copyValueToDestination = function(value, destArray, destIndex, scan) {
	for( var n = 0; n < 64; n += 8, destIndex += scan+8 ) {
		destArray[destIndex+0] = value;
		destArray[destIndex+1] = value;
		destArray[destIndex+2] = value;
		destArray[destIndex+3] = value;
		destArray[destIndex+4] = value;
		destArray[destIndex+5] = value;
		destArray[destIndex+6] = value;
		destArray[destIndex+7] = value;
	}
};

jsmpeg.prototype.addValueToDestination = function(value, destArray, destIndex, scan) {
	for( var n = 0; n < 64; n += 8, destIndex += scan+8 ) {
		destArray[destIndex+0] += value;
		destArray[destIndex+1] += value;
		destArray[destIndex+2] += value;
		destArray[destIndex+3] += value;
		destArray[destIndex+4] += value;
		destArray[destIndex+5] += value;
		destArray[destIndex+6] += value;
		destArray[destIndex+7] += value;
	}
};

// Clamping version for shitty browsers (IE) that don't support Uint8ClampedArray
jsmpeg.prototype.copyBlockToDestinationClamp = function(blockData, destArray, destIndex, scan) {
	var n = 0;
	for( var i = 0; i < 8; i++ ) {
		for( var j = 0; j < 8; j++ ) {
			var p = blockData[n++];
			destArray[destIndex++] = p > 255 ? 255 : (p < 0 ? 0 : p);
		}
		destIndex += scan;
	}
};

jsmpeg.prototype.addBlockToDestinationClamp = function(blockData, destArray, destIndex, scan) {
	var n = 0;
	for( var i = 0; i < 8; i++ ) {
		for( var j = 0; j < 8; j++ ) {
			var p = blockData[n++] + destArray[destIndex];
			destArray[destIndex++] = p > 255 ? 255 : (p < 0 ? 0 : p);
		}
		destIndex += scan;
	}
};

jsmpeg.prototype.IDCT = function() {
	// See http://vsr.informatik.tu-chemnitz.de/~jan/MPEG/HTML/IDCT.html
	// for more info.
	
	var 
		b1, b3, b4, b6, b7, tmp1, tmp2, m0,
		x0, x1, x2, x3, x4, y3, y4, y5, y6, y7,
		i,
		blockData = this.blockData;
	
	// Transform columns
	for( i = 0; i < 8; ++i ) {
		b1 =  blockData[4*8+i];
		b3 =  blockData[2*8+i] + blockData[6*8+i];
		b4 =  blockData[5*8+i] - blockData[3*8+i];
		tmp1 = blockData[1*8+i] + blockData[7*8+i];
		tmp2 = blockData[3*8+i] + blockData[5*8+i];
		b6 = blockData[1*8+i] - blockData[7*8+i];
		b7 = tmp1 + tmp2;
		m0 =  blockData[0*8+i];
		x4 =  ((b6*473 - b4*196 + 128) >> 8) - b7;
		x0 =  x4 - (((tmp1 - tmp2)*362 + 128) >> 8);
		x1 =  m0 - b1;
		x2 =  (((blockData[2*8+i] - blockData[6*8+i])*362 + 128) >> 8) - b3;
		x3 =  m0 + b1;
		y3 =  x1 + x2;
		y4 =  x3 + b3;
		y5 =  x1 - x2;
		y6 =  x3 - b3;
		y7 = -x0 - ((b4*473 + b6*196 + 128) >> 8);
		blockData[0*8+i] =  b7 + y4;
		blockData[1*8+i] =  x4 + y3;
		blockData[2*8+i] =  y5 - x0;
		blockData[3*8+i] =  y6 - y7;
		blockData[4*8+i] =  y6 + y7;
		blockData[5*8+i] =  x0 + y5;
		blockData[6*8+i] =  y3 - x4;
		blockData[7*8+i] =  y4 - b7;
	}
	
	// Transform rows
	for( i = 0; i < 64; i += 8 ) {
		b1 =  blockData[4+i];
		b3 =  blockData[2+i] + blockData[6+i];
		b4 =  blockData[5+i] - blockData[3+i];
		tmp1 = blockData[1+i] + blockData[7+i];
		tmp2 = blockData[3+i] + blockData[5+i];
		b6 = blockData[1+i] - blockData[7+i];
		b7 = tmp1 + tmp2;
		m0 =  blockData[0+i];
		x4 =  ((b6*473 - b4*196 + 128) >> 8) - b7;
		x0 =  x4 - (((tmp1 - tmp2)*362 + 128) >> 8);
		x1 =  m0 - b1;
		x2 =  (((blockData[2+i] - blockData[6+i])*362 + 128) >> 8) - b3;
		x3 =  m0 + b1;
		y3 =  x1 + x2;
		y4 =  x3 + b3;
		y5 =  x1 - x2;
		y6 =  x3 - b3;
		y7 = -x0 - ((b4*473 + b6*196 + 128) >> 8);
		blockData[0+i] =  (b7 + y4 + 128) >> 8;
		blockData[1+i] =  (x4 + y3 + 128) >> 8;
		blockData[2+i] =  (y5 - x0 + 128) >> 8;
		blockData[3+i] =  (y6 - y7 + 128) >> 8;
		blockData[4+i] =  (y6 + y7 + 128) >> 8;
		blockData[5+i] =  (x0 + y5 + 128) >> 8;
		blockData[6+i] =  (y3 - x4 + 128) >> 8;
		blockData[7+i] =  (y4 - b7 + 128) >> 8;
	}
};


// ----------------------------------------------------------------------------
// VLC Tables and Constants

var
	SOCKET_MAGIC_BYTES = 'jsmp',
	DECODE_SKIP_OUTPUT = 1,
	PICTURE_RATE = [
		0.000, 23.976, 24.000, 25.000, 29.970, 30.000, 50.000, 59.940,
		60.000,  0.000,  0.000,  0.000,  0.000,  0.000,  0.000,  0.000
	],
	ZIG_ZAG = new Uint8Array([
		 0,  1,  8, 16,  9,  2,  3, 10,
		17, 24, 32, 25, 18, 11,  4,  5,
		12, 19, 26, 33, 40, 48, 41, 34,
		27, 20, 13,  6,  7, 14, 21, 28,
		35, 42, 49, 56, 57, 50, 43, 36,
		29, 22, 15, 23, 30, 37, 44, 51,
		58, 59, 52, 45, 38, 31, 39, 46,
		53, 60, 61, 54, 47, 55, 62, 63
	]),
	DEFAULT_INTRA_QUANT_MATRIX = new Uint8Array([
		 8, 16, 19, 22, 26, 27, 29, 34,
		16, 16, 22, 24, 27, 29, 34, 37,
		19, 22, 26, 27, 29, 34, 34, 38,
		22, 22, 26, 27, 29, 34, 37, 40,
		22, 26, 27, 29, 32, 35, 40, 48,
		26, 27, 29, 32, 35, 40, 48, 58,
		26, 27, 29, 34, 38, 46, 56, 69,
		27, 29, 35, 38, 46, 56, 69, 83
	]),
	DEFAULT_NON_INTRA_QUANT_MATRIX = new Uint8Array([
		16, 16, 16, 16, 16, 16, 16, 16,
		16, 16, 16, 16, 16, 16, 16, 16,
		16, 16, 16, 16, 16, 16, 16, 16,
		16, 16, 16, 16, 16, 16, 16, 16,
		16, 16, 16, 16, 16, 16, 16, 16,
		16, 16, 16, 16, 16, 16, 16, 16,
		16, 16, 16, 16, 16, 16, 16, 16,
		16, 16, 16, 16, 16, 16, 16, 16
	]),
	
	PREMULTIPLIER_MATRIX = new Uint8Array([
		32, 44, 42, 38, 32, 25, 17,  9,
		44, 62, 58, 52, 44, 35, 24, 12,
		42, 58, 55, 49, 42, 33, 23, 12,
		38, 52, 49, 44, 38, 30, 20, 10,
		32, 44, 42, 38, 32, 25, 17,  9,
		25, 35, 33, 30, 25, 20, 14,  7,
		17, 24, 23, 20, 17, 14,  9,  5,
		 9, 12, 12, 10,  9,  7,  5,  2
	]),
	
	// MPEG-1 VLC
	
	//  macroblock_stuffing decodes as 34.
	//  macroblock_escape decodes as 35.
	
	MACROBLOCK_ADDRESS_INCREMENT = new Int16Array([
		 1*3,  2*3,  0, //   0
		 3*3,  4*3,  0, //   1  0
		   0,    0,  1, //   2  1.
		 5*3,  6*3,  0, //   3  00
		 7*3,  8*3,  0, //   4  01
		 9*3, 10*3,  0, //   5  000
		11*3, 12*3,  0, //   6  001
		   0,    0,  3, //   7  010.
		   0,    0,  2, //   8  011.
		13*3, 14*3,  0, //   9  0000
		15*3, 16*3,  0, //  10  0001
		   0,    0,  5, //  11  0010.
		   0,    0,  4, //  12  0011.
		17*3, 18*3,  0, //  13  0000 0
		19*3, 20*3,  0, //  14  0000 1
		   0,    0,  7, //  15  0001 0.
		   0,    0,  6, //  16  0001 1.
		21*3, 22*3,  0, //  17  0000 00
		23*3, 24*3,  0, //  18  0000 01
		25*3, 26*3,  0, //  19  0000 10
		27*3, 28*3,  0, //  20  0000 11
		  -1, 29*3,  0, //  21  0000 000
		  -1, 30*3,  0, //  22  0000 001
		31*3, 32*3,  0, //  23  0000 010
		33*3, 34*3,  0, //  24  0000 011
		35*3, 36*3,  0, //  25  0000 100
		37*3, 38*3,  0, //  26  0000 101
		   0,    0,  9, //  27  0000 110.
		   0,    0,  8, //  28  0000 111.
		39*3, 40*3,  0, //  29  0000 0001
		41*3, 42*3,  0, //  30  0000 0011
		43*3, 44*3,  0, //  31  0000 0100
		45*3, 46*3,  0, //  32  0000 0101
		   0,    0, 15, //  33  0000 0110.
		   0,    0, 14, //  34  0000 0111.
		   0,    0, 13, //  35  0000 1000.
		   0,    0, 12, //  36  0000 1001.
		   0,    0, 11, //  37  0000 1010.
		   0,    0, 10, //  38  0000 1011.
		47*3,   -1,  0, //  39  0000 0001 0
		  -1, 48*3,  0, //  40  0000 0001 1
		49*3, 50*3,  0, //  41  0000 0011 0
		51*3, 52*3,  0, //  42  0000 0011 1
		53*3, 54*3,  0, //  43  0000 0100 0
		55*3, 56*3,  0, //  44  0000 0100 1
		57*3, 58*3,  0, //  45  0000 0101 0
		59*3, 60*3,  0, //  46  0000 0101 1
		61*3,   -1,  0, //  47  0000 0001 00
		  -1, 62*3,  0, //  48  0000 0001 11
		63*3, 64*3,  0, //  49  0000 0011 00
		65*3, 66*3,  0, //  50  0000 0011 01
		67*3, 68*3,  0, //  51  0000 0011 10
		69*3, 70*3,  0, //  52  0000 0011 11
		71*3, 72*3,  0, //  53  0000 0100 00
		73*3, 74*3,  0, //  54  0000 0100 01
		   0,    0, 21, //  55  0000 0100 10.
		   0,    0, 20, //  56  0000 0100 11.
		   0,    0, 19, //  57  0000 0101 00.
		   0,    0, 18, //  58  0000 0101 01.
		   0,    0, 17, //  59  0000 0101 10.
		   0,    0, 16, //  60  0000 0101 11.
		   0,    0, 35, //  61  0000 0001 000. -- macroblock_escape
		   0,    0, 34, //  62  0000 0001 111. -- macroblock_stuffing
		   0,    0, 33, //  63  0000 0011 000.
		   0,    0, 32, //  64  0000 0011 001.
		   0,    0, 31, //  65  0000 0011 010.
		   0,    0, 30, //  66  0000 0011 011.
		   0,    0, 29, //  67  0000 0011 100.
		   0,    0, 28, //  68  0000 0011 101.
		   0,    0, 27, //  69  0000 0011 110.
		   0,    0, 26, //  70  0000 0011 111.
		   0,    0, 25, //  71  0000 0100 000.
		   0,    0, 24, //  72  0000 0100 001.
		   0,    0, 23, //  73  0000 0100 010.
		   0,    0, 22  //  74  0000 0100 011.
	]),
	
	//  macroblock_type bitmap:
	//    0x10  macroblock_quant
	//    0x08  macroblock_motion_forward
	//    0x04  macroblock_motion_backward
	//    0x02  macrobkock_pattern
	//    0x01  macroblock_intra
	//
	
	MACROBLOCK_TYPE_I = new Int8Array([
		 1*3,  2*3,     0, //   0
		  -1,  3*3,     0, //   1  0
		   0,    0,  0x01, //   2  1.
		   0,    0,  0x11  //   3  01.
	]),
	
	MACROBLOCK_TYPE_P = new Int8Array([
		 1*3,  2*3,     0, //  0
		 3*3,  4*3,     0, //  1  0
		   0,    0,  0x0a, //  2  1.
		 5*3,  6*3,     0, //  3  00
		   0,    0,  0x02, //  4  01.
		 7*3,  8*3,     0, //  5  000
		   0,    0,  0x08, //  6  001.
		 9*3, 10*3,     0, //  7  0000
		11*3, 12*3,     0, //  8  0001
		  -1, 13*3,     0, //  9  00000
		   0,    0,  0x12, // 10  00001.
		   0,    0,  0x1a, // 11  00010.
		   0,    0,  0x01, // 12  00011.
		   0,    0,  0x11  // 13  000001.
	]),
	
	MACROBLOCK_TYPE_B = new Int8Array([
		 1*3,  2*3,     0,  //  0
		 3*3,  5*3,     0,  //  1  0
		 4*3,  6*3,     0,  //  2  1
		 8*3,  7*3,     0,  //  3  00
		   0,    0,  0x0c,  //  4  10.
		 9*3, 10*3,     0,  //  5  01
		   0,    0,  0x0e,  //  6  11.
		13*3, 14*3,     0,  //  7  001
		12*3, 11*3,     0,  //  8  000
		   0,    0,  0x04,  //  9  010.
		   0,    0,  0x06,  // 10  011.
		18*3, 16*3,     0,  // 11  0001
		15*3, 17*3,     0,  // 12  0000
		   0,    0,  0x08,  // 13  0010.
		   0,    0,  0x0a,  // 14  0011.
		  -1, 19*3,     0,  // 15  00000
		   0,    0,  0x01,  // 16  00011.
		20*3, 21*3,     0,  // 17  00001
		   0,    0,  0x1e,  // 18  00010.
		   0,    0,  0x11,  // 19  000001.
		   0,    0,  0x16,  // 20  000010.
		   0,    0,  0x1a   // 21  000011.
	]),
	
	CODE_BLOCK_PATTERN = new Int16Array([
		  2*3,   1*3,   0,  //   0
		  3*3,   6*3,   0,  //   1  1
		  4*3,   5*3,   0,  //   2  0
		  8*3,  11*3,   0,  //   3  10
		 12*3,  13*3,   0,  //   4  00
		  9*3,   7*3,   0,  //   5  01
		 10*3,  14*3,   0,  //   6  11
		 20*3,  19*3,   0,  //   7  011
		 18*3,  16*3,   0,  //   8  100
		 23*3,  17*3,   0,  //   9  010
		 27*3,  25*3,   0,  //  10  110
		 21*3,  28*3,   0,  //  11  101
		 15*3,  22*3,   0,  //  12  000
		 24*3,  26*3,   0,  //  13  001
		    0,     0,  60,  //  14  111.
		 35*3,  40*3,   0,  //  15  0000
		 44*3,  48*3,   0,  //  16  1001
		 38*3,  36*3,   0,  //  17  0101
		 42*3,  47*3,   0,  //  18  1000
		 29*3,  31*3,   0,  //  19  0111
		 39*3,  32*3,   0,  //  20  0110
		    0,     0,  32,  //  21  1010.
		 45*3,  46*3,   0,  //  22  0001
		 33*3,  41*3,   0,  //  23  0100
		 43*3,  34*3,   0,  //  24  0010
		    0,     0,   4,  //  25  1101.
		 30*3,  37*3,   0,  //  26  0011
		    0,     0,   8,  //  27  1100.
		    0,     0,  16,  //  28  1011.
		    0,     0,  44,  //  29  0111 0.
		 50*3,  56*3,   0,  //  30  0011 0
		    0,     0,  28,  //  31  0111 1.
		    0,     0,  52,  //  32  0110 1.
		    0,     0,  62,  //  33  0100 0.
		 61*3,  59*3,   0,  //  34  0010 1
		 52*3,  60*3,   0,  //  35  0000 0
		    0,     0,   1,  //  36  0101 1.
		 55*3,  54*3,   0,  //  37  0011 1
		    0,     0,  61,  //  38  0101 0.
		    0,     0,  56,  //  39  0110 0.
		 57*3,  58*3,   0,  //  40  0000 1
		    0,     0,   2,  //  41  0100 1.
		    0,     0,  40,  //  42  1000 0.
		 51*3,  62*3,   0,  //  43  0010 0
		    0,     0,  48,  //  44  1001 0.
		 64*3,  63*3,   0,  //  45  0001 0
		 49*3,  53*3,   0,  //  46  0001 1
		    0,     0,  20,  //  47  1000 1.
		    0,     0,  12,  //  48  1001 1.
		 80*3,  83*3,   0,  //  49  0001 10
		    0,     0,  63,  //  50  0011 00.
		 77*3,  75*3,   0,  //  51  0010 00
		 65*3,  73*3,   0,  //  52  0000 00
		 84*3,  66*3,   0,  //  53  0001 11
		    0,     0,  24,  //  54  0011 11.
		    0,     0,  36,  //  55  0011 10.
		    0,     0,   3,  //  56  0011 01.
		 69*3,  87*3,   0,  //  57  0000 10
		 81*3,  79*3,   0,  //  58  0000 11
		 68*3,  71*3,   0,  //  59  0010 11
		 70*3,  78*3,   0,  //  60  0000 01
		 67*3,  76*3,   0,  //  61  0010 10
		 72*3,  74*3,   0,  //  62  0010 01
		 86*3,  85*3,   0,  //  63  0001 01
		 88*3,  82*3,   0,  //  64  0001 00
		   -1,  94*3,   0,  //  65  0000 000
		 95*3,  97*3,   0,  //  66  0001 111
		    0,     0,  33,  //  67  0010 100.
		    0,     0,   9,  //  68  0010 110.
		106*3, 110*3,   0,  //  69  0000 100
		102*3, 116*3,   0,  //  70  0000 010
		    0,     0,   5,  //  71  0010 111.
		    0,     0,  10,  //  72  0010 010.
		 93*3,  89*3,   0,  //  73  0000 001
		    0,     0,   6,  //  74  0010 011.
		    0,     0,  18,  //  75  0010 001.
		    0,     0,  17,  //  76  0010 101.
		    0,     0,  34,  //  77  0010 000.
		113*3, 119*3,   0,  //  78  0000 011
		103*3, 104*3,   0,  //  79  0000 111
		 90*3,  92*3,   0,  //  80  0001 100
		109*3, 107*3,   0,  //  81  0000 110
		117*3, 118*3,   0,  //  82  0001 001
		101*3,  99*3,   0,  //  83  0001 101
		 98*3,  96*3,   0,  //  84  0001 110
		100*3,  91*3,   0,  //  85  0001 011
		114*3, 115*3,   0,  //  86  0001 010
		105*3, 108*3,   0,  //  87  0000 101
		112*3, 111*3,   0,  //  88  0001 000
		121*3, 125*3,   0,  //  89  0000 0011
		    0,     0,  41,  //  90  0001 1000.
		    0,     0,  14,  //  91  0001 0111.
		    0,     0,  21,  //  92  0001 1001.
		124*3, 122*3,   0,  //  93  0000 0010
		120*3, 123*3,   0,  //  94  0000 0001
		    0,     0,  11,  //  95  0001 1110.
		    0,     0,  19,  //  96  0001 1101.
		    0,     0,   7,  //  97  0001 1111.
		    0,     0,  35,  //  98  0001 1100.
		    0,     0,  13,  //  99  0001 1011.
		    0,     0,  50,  // 100  0001 0110.
		    0,     0,  49,  // 101  0001 1010.
		    0,     0,  58,  // 102  0000 0100.
		    0,     0,  37,  // 103  0000 1110.
		    0,     0,  25,  // 104  0000 1111.
		    0,     0,  45,  // 105  0000 1010.
		    0,     0,  57,  // 106  0000 1000.
		    0,     0,  26,  // 107  0000 1101.
		    0,     0,  29,  // 108  0000 1011.
		    0,     0,  38,  // 109  0000 1100.
		    0,     0,  53,  // 110  0000 1001.
		    0,     0,  23,  // 111  0001 0001.
		    0,     0,  43,  // 112  0001 0000.
		    0,     0,  46,  // 113  0000 0110.
		    0,     0,  42,  // 114  0001 0100.
		    0,     0,  22,  // 115  0001 0101.
		    0,     0,  54,  // 116  0000 0101.
		    0,     0,  51,  // 117  0001 0010.
		    0,     0,  15,  // 118  0001 0011.
		    0,     0,  30,  // 119  0000 0111.
		    0,     0,  39,  // 120  0000 0001 0.
		    0,     0,  47,  // 121  0000 0011 0.
		    0,     0,  55,  // 122  0000 0010 1.
		    0,     0,  27,  // 123  0000 0001 1.
		    0,     0,  59,  // 124  0000 0010 0.
		    0,     0,  31   // 125  0000 0011 1.
	]),
	
	MOTION = new Int16Array([
		  1*3,   2*3,   0,  //   0
		  4*3,   3*3,   0,  //   1  0
		    0,     0,   0,  //   2  1.
		  6*3,   5*3,   0,  //   3  01
		  8*3,   7*3,   0,  //   4  00
		    0,     0,  -1,  //   5  011.
		    0,     0,   1,  //   6  010.
		  9*3,  10*3,   0,  //   7  001
		 12*3,  11*3,   0,  //   8  000
		    0,     0,   2,  //   9  0010.
		    0,     0,  -2,  //  10  0011.
		 14*3,  15*3,   0,  //  11  0001
		 16*3,  13*3,   0,  //  12  0000
		 20*3,  18*3,   0,  //  13  0000 1
		    0,     0,   3,  //  14  0001 0.
		    0,     0,  -3,  //  15  0001 1.
		 17*3,  19*3,   0,  //  16  0000 0
		   -1,  23*3,   0,  //  17  0000 00
		 27*3,  25*3,   0,  //  18  0000 11
		 26*3,  21*3,   0,  //  19  0000 01
		 24*3,  22*3,   0,  //  20  0000 10
		 32*3,  28*3,   0,  //  21  0000 011
		 29*3,  31*3,   0,  //  22  0000 101
		   -1,  33*3,   0,  //  23  0000 001
		 36*3,  35*3,   0,  //  24  0000 100
		    0,     0,  -4,  //  25  0000 111.
		 30*3,  34*3,   0,  //  26  0000 010
		    0,     0,   4,  //  27  0000 110.
		    0,     0,  -7,  //  28  0000 0111.
		    0,     0,   5,  //  29  0000 1010.
		 37*3,  41*3,   0,  //  30  0000 0100
		    0,     0,  -5,  //  31  0000 1011.
		    0,     0,   7,  //  32  0000 0110.
		 38*3,  40*3,   0,  //  33  0000 0011
		 42*3,  39*3,   0,  //  34  0000 0101
		    0,     0,  -6,  //  35  0000 1001.
		    0,     0,   6,  //  36  0000 1000.
		 51*3,  54*3,   0,  //  37  0000 0100 0
		 50*3,  49*3,   0,  //  38  0000 0011 0
		 45*3,  46*3,   0,  //  39  0000 0101 1
		 52*3,  47*3,   0,  //  40  0000 0011 1
		 43*3,  53*3,   0,  //  41  0000 0100 1
		 44*3,  48*3,   0,  //  42  0000 0101 0
		    0,     0,  10,  //  43  0000 0100 10.
		    0,     0,   9,  //  44  0000 0101 00.
		    0,     0,   8,  //  45  0000 0101 10.
		    0,     0,  -8,  //  46  0000 0101 11.
		 57*3,  66*3,   0,  //  47  0000 0011 11
		    0,     0,  -9,  //  48  0000 0101 01.
		 60*3,  64*3,   0,  //  49  0000 0011 01
		 56*3,  61*3,   0,  //  50  0000 0011 00
		 55*3,  62*3,   0,  //  51  0000 0100 00
		 58*3,  63*3,   0,  //  52  0000 0011 10
		    0,     0, -10,  //  53  0000 0100 11.
		 59*3,  65*3,   0,  //  54  0000 0100 01
		    0,     0,  12,  //  55  0000 0100 000.
		    0,     0,  16,  //  56  0000 0011 000.
		    0,     0,  13,  //  57  0000 0011 110.
		    0,     0,  14,  //  58  0000 0011 100.
		    0,     0,  11,  //  59  0000 0100 010.
		    0,     0,  15,  //  60  0000 0011 010.
		    0,     0, -16,  //  61  0000 0011 001.
		    0,     0, -12,  //  62  0000 0100 001.
		    0,     0, -14,  //  63  0000 0011 101.
		    0,     0, -15,  //  64  0000 0011 011.
		    0,     0, -11,  //  65  0000 0100 011.
		    0,     0, -13   //  66  0000 0011 111.
	]),
	
	DCT_DC_SIZE_LUMINANCE = new Int8Array([
		  2*3,   1*3, 0,  //   0
		  6*3,   5*3, 0,  //   1  1
		  3*3,   4*3, 0,  //   2  0
		    0,     0, 1,  //   3  00.
		    0,     0, 2,  //   4  01.
		  9*3,   8*3, 0,  //   5  11
		  7*3,  10*3, 0,  //   6  10
		    0,     0, 0,  //   7  100.
		 12*3,  11*3, 0,  //   8  111
		    0,     0, 4,  //   9  110.
		    0,     0, 3,  //  10  101.
		 13*3,  14*3, 0,  //  11  1111
		    0,     0, 5,  //  12  1110.
		    0,     0, 6,  //  13  1111 0.
		 16*3,  15*3, 0,  //  14  1111 1
		 17*3,    -1, 0,  //  15  1111 11
		    0,     0, 7,  //  16  1111 10.
		    0,     0, 8   //  17  1111 110.
	]),
	
	DCT_DC_SIZE_CHROMINANCE = new Int8Array([
		  2*3,   1*3, 0,  //   0
		  4*3,   3*3, 0,  //   1  1
		  6*3,   5*3, 0,  //   2  0
		  8*3,   7*3, 0,  //   3  11
		    0,     0, 2,  //   4  10.
		    0,     0, 1,  //   5  01.
		    0,     0, 0,  //   6  00.
		 10*3,   9*3, 0,  //   7  111
		    0,     0, 3,  //   8  110.
		 12*3,  11*3, 0,  //   9  1111
		    0,     0, 4,  //  10  1110.
		 14*3,  13*3, 0,  //  11  1111 1
		    0,     0, 5,  //  12  1111 0.
		 16*3,  15*3, 0,  //  13  1111 11
		    0,     0, 6,  //  14  1111 10.
		 17*3,    -1, 0,  //  15  1111 111
		    0,     0, 7,  //  16  1111 110.
		    0,     0, 8   //  17  1111 1110.
	]),
	
	//  dct_coeff bitmap:
	//    0xff00  run
	//    0x00ff  level
	
	//  Decoded values are unsigned. Sign bit follows in the stream.
	
	//  Interpretation of the value 0x0001
	//    for dc_coeff_first:  run=0, level=1
	//    for dc_coeff_next:   If the next bit is 1: run=0, level=1
	//                         If the next bit is 0: end_of_block
	
	//  escape decodes as 0xffff.
	
	DCT_COEFF = new Int32Array([
		  1*3,   2*3,      0,  //   0
		  4*3,   3*3,      0,  //   1  0
		    0,     0, 0x0001,  //   2  1.
		  7*3,   8*3,      0,  //   3  01
		  6*3,   5*3,      0,  //   4  00
		 13*3,   9*3,      0,  //   5  001
		 11*3,  10*3,      0,  //   6  000
		 14*3,  12*3,      0,  //   7  010
		    0,     0, 0x0101,  //   8  011.
		 20*3,  22*3,      0,  //   9  0011
		 18*3,  21*3,      0,  //  10  0001
		 16*3,  19*3,      0,  //  11  0000
		    0,     0, 0x0201,  //  12  0101.
		 17*3,  15*3,      0,  //  13  0010
		    0,     0, 0x0002,  //  14  0100.
		    0,     0, 0x0003,  //  15  0010 1.
		 27*3,  25*3,      0,  //  16  0000 0
		 29*3,  31*3,      0,  //  17  0010 0
		 24*3,  26*3,      0,  //  18  0001 0
		 32*3,  30*3,      0,  //  19  0000 1
		    0,     0, 0x0401,  //  20  0011 0.
		 23*3,  28*3,      0,  //  21  0001 1
		    0,     0, 0x0301,  //  22  0011 1.
		    0,     0, 0x0102,  //  23  0001 10.
		    0,     0, 0x0701,  //  24  0001 00.
		    0,     0, 0xffff,  //  25  0000 01. -- escape
		    0,     0, 0x0601,  //  26  0001 01.
		 37*3,  36*3,      0,  //  27  0000 00
		    0,     0, 0x0501,  //  28  0001 11.
		 35*3,  34*3,      0,  //  29  0010 00
		 39*3,  38*3,      0,  //  30  0000 11
		 33*3,  42*3,      0,  //  31  0010 01
		 40*3,  41*3,      0,  //  32  0000 10
		 52*3,  50*3,      0,  //  33  0010 010
		 54*3,  53*3,      0,  //  34  0010 001
		 48*3,  49*3,      0,  //  35  0010 000
		 43*3,  45*3,      0,  //  36  0000 001
		 46*3,  44*3,      0,  //  37  0000 000
		    0,     0, 0x0801,  //  38  0000 111.
		    0,     0, 0x0004,  //  39  0000 110.
		    0,     0, 0x0202,  //  40  0000 100.
		    0,     0, 0x0901,  //  41  0000 101.
		 51*3,  47*3,      0,  //  42  0010 011
		 55*3,  57*3,      0,  //  43  0000 0010
		 60*3,  56*3,      0,  //  44  0000 0001
		 59*3,  58*3,      0,  //  45  0000 0011
		 61*3,  62*3,      0,  //  46  0000 0000
		    0,     0, 0x0a01,  //  47  0010 0111.
		    0,     0, 0x0d01,  //  48  0010 0000.
		    0,     0, 0x0006,  //  49  0010 0001.
		    0,     0, 0x0103,  //  50  0010 0101.
		    0,     0, 0x0005,  //  51  0010 0110.
		    0,     0, 0x0302,  //  52  0010 0100.
		    0,     0, 0x0b01,  //  53  0010 0011.
		    0,     0, 0x0c01,  //  54  0010 0010.
		 76*3,  75*3,      0,  //  55  0000 0010 0
		 67*3,  70*3,      0,  //  56  0000 0001 1
		 73*3,  71*3,      0,  //  57  0000 0010 1
		 78*3,  74*3,      0,  //  58  0000 0011 1
		 72*3,  77*3,      0,  //  59  0000 0011 0
		 69*3,  64*3,      0,  //  60  0000 0001 0
		 68*3,  63*3,      0,  //  61  0000 0000 0
		 66*3,  65*3,      0,  //  62  0000 0000 1
		 81*3,  87*3,      0,  //  63  0000 0000 01
		 91*3,  80*3,      0,  //  64  0000 0001 01
		 82*3,  79*3,      0,  //  65  0000 0000 11
		 83*3,  86*3,      0,  //  66  0000 0000 10
		 93*3,  92*3,      0,  //  67  0000 0001 10
		 84*3,  85*3,      0,  //  68  0000 0000 00
		 90*3,  94*3,      0,  //  69  0000 0001 00
		 88*3,  89*3,      0,  //  70  0000 0001 11
		    0,     0, 0x0203,  //  71  0000 0010 11.
		    0,     0, 0x0104,  //  72  0000 0011 00.
		    0,     0, 0x0007,  //  73  0000 0010 10.
		    0,     0, 0x0402,  //  74  0000 0011 11.
		    0,     0, 0x0502,  //  75  0000 0010 01.
		    0,     0, 0x1001,  //  76  0000 0010 00.
		    0,     0, 0x0f01,  //  77  0000 0011 01.
		    0,     0, 0x0e01,  //  78  0000 0011 10.
		105*3, 107*3,      0,  //  79  0000 0000 111
		111*3, 114*3,      0,  //  80  0000 0001 011
		104*3,  97*3,      0,  //  81  0000 0000 010
		125*3, 119*3,      0,  //  82  0000 0000 110
		 96*3,  98*3,      0,  //  83  0000 0000 100
		   -1, 123*3,      0,  //  84  0000 0000 000
		 95*3, 101*3,      0,  //  85  0000 0000 001
		106*3, 121*3,      0,  //  86  0000 0000 101
		 99*3, 102*3,      0,  //  87  0000 0000 011
		113*3, 103*3,      0,  //  88  0000 0001 110
		112*3, 116*3,      0,  //  89  0000 0001 111
		110*3, 100*3,      0,  //  90  0000 0001 000
		124*3, 115*3,      0,  //  91  0000 0001 010
		117*3, 122*3,      0,  //  92  0000 0001 101
		109*3, 118*3,      0,  //  93  0000 0001 100
		120*3, 108*3,      0,  //  94  0000 0001 001
		127*3, 136*3,      0,  //  95  0000 0000 0010
		139*3, 140*3,      0,  //  96  0000 0000 1000
		130*3, 126*3,      0,  //  97  0000 0000 0101
		145*3, 146*3,      0,  //  98  0000 0000 1001
		128*3, 129*3,      0,  //  99  0000 0000 0110
		    0,     0, 0x0802,  // 100  0000 0001 0001.
		132*3, 134*3,      0,  // 101  0000 0000 0011
		155*3, 154*3,      0,  // 102  0000 0000 0111
		    0,     0, 0x0008,  // 103  0000 0001 1101.
		137*3, 133*3,      0,  // 104  0000 0000 0100
		143*3, 144*3,      0,  // 105  0000 0000 1110
		151*3, 138*3,      0,  // 106  0000 0000 1010
		142*3, 141*3,      0,  // 107  0000 0000 1111
		    0,     0, 0x000a,  // 108  0000 0001 0011.
		    0,     0, 0x0009,  // 109  0000 0001 1000.
		    0,     0, 0x000b,  // 110  0000 0001 0000.
		    0,     0, 0x1501,  // 111  0000 0001 0110.
		    0,     0, 0x0602,  // 112  0000 0001 1110.
		    0,     0, 0x0303,  // 113  0000 0001 1100.
		    0,     0, 0x1401,  // 114  0000 0001 0111.
		    0,     0, 0x0702,  // 115  0000 0001 0101.
		    0,     0, 0x1101,  // 116  0000 0001 1111.
		    0,     0, 0x1201,  // 117  0000 0001 1010.
		    0,     0, 0x1301,  // 118  0000 0001 1001.
		148*3, 152*3,      0,  // 119  0000 0000 1101
		    0,     0, 0x0403,  // 120  0000 0001 0010.
		153*3, 150*3,      0,  // 121  0000 0000 1011
		    0,     0, 0x0105,  // 122  0000 0001 1011.
		131*3, 135*3,      0,  // 123  0000 0000 0001
		    0,     0, 0x0204,  // 124  0000 0001 0100.
		149*3, 147*3,      0,  // 125  0000 0000 1100
		172*3, 173*3,      0,  // 126  0000 0000 0101 1
		162*3, 158*3,      0,  // 127  0000 0000 0010 0
		170*3, 161*3,      0,  // 128  0000 0000 0110 0
		168*3, 166*3,      0,  // 129  0000 0000 0110 1
		157*3, 179*3,      0,  // 130  0000 0000 0101 0
		169*3, 167*3,      0,  // 131  0000 0000 0001 0
		174*3, 171*3,      0,  // 132  0000 0000 0011 0
		178*3, 177*3,      0,  // 133  0000 0000 0100 1
		156*3, 159*3,      0,  // 134  0000 0000 0011 1
		164*3, 165*3,      0,  // 135  0000 0000 0001 1
		183*3, 182*3,      0,  // 136  0000 0000 0010 1
		175*3, 176*3,      0,  // 137  0000 0000 0100 0
		    0,     0, 0x0107,  // 138  0000 0000 1010 1.
		    0,     0, 0x0a02,  // 139  0000 0000 1000 0.
		    0,     0, 0x0902,  // 140  0000 0000 1000 1.
		    0,     0, 0x1601,  // 141  0000 0000 1111 1.
		    0,     0, 0x1701,  // 142  0000 0000 1111 0.
		    0,     0, 0x1901,  // 143  0000 0000 1110 0.
		    0,     0, 0x1801,  // 144  0000 0000 1110 1.
		    0,     0, 0x0503,  // 145  0000 0000 1001 0.
		    0,     0, 0x0304,  // 146  0000 0000 1001 1.
		    0,     0, 0x000d,  // 147  0000 0000 1100 1.
		    0,     0, 0x000c,  // 148  0000 0000 1101 0.
		    0,     0, 0x000e,  // 149  0000 0000 1100 0.
		    0,     0, 0x000f,  // 150  0000 0000 1011 1.
		    0,     0, 0x0205,  // 151  0000 0000 1010 0.
		    0,     0, 0x1a01,  // 152  0000 0000 1101 1.
		    0,     0, 0x0106,  // 153  0000 0000 1011 0.
		180*3, 181*3,      0,  // 154  0000 0000 0111 1
		160*3, 163*3,      0,  // 155  0000 0000 0111 0
		196*3, 199*3,      0,  // 156  0000 0000 0011 10
		    0,     0, 0x001b,  // 157  0000 0000 0101 00.
		203*3, 185*3,      0,  // 158  0000 0000 0010 01
		202*3, 201*3,      0,  // 159  0000 0000 0011 11
		    0,     0, 0x0013,  // 160  0000 0000 0111 00.
		    0,     0, 0x0016,  // 161  0000 0000 0110 01.
		197*3, 207*3,      0,  // 162  0000 0000 0010 00
		    0,     0, 0x0012,  // 163  0000 0000 0111 01.
		191*3, 192*3,      0,  // 164  0000 0000 0001 10
		188*3, 190*3,      0,  // 165  0000 0000 0001 11
		    0,     0, 0x0014,  // 166  0000 0000 0110 11.
		184*3, 194*3,      0,  // 167  0000 0000 0001 01
		    0,     0, 0x0015,  // 168  0000 0000 0110 10.
		186*3, 193*3,      0,  // 169  0000 0000 0001 00
		    0,     0, 0x0017,  // 170  0000 0000 0110 00.
		204*3, 198*3,      0,  // 171  0000 0000 0011 01
		    0,     0, 0x0019,  // 172  0000 0000 0101 10.
		    0,     0, 0x0018,  // 173  0000 0000 0101 11.
		200*3, 205*3,      0,  // 174  0000 0000 0011 00
		    0,     0, 0x001f,  // 175  0000 0000 0100 00.
		    0,     0, 0x001e,  // 176  0000 0000 0100 01.
		    0,     0, 0x001c,  // 177  0000 0000 0100 11.
		    0,     0, 0x001d,  // 178  0000 0000 0100 10.
		    0,     0, 0x001a,  // 179  0000 0000 0101 01.
		    0,     0, 0x0011,  // 180  0000 0000 0111 10.
		    0,     0, 0x0010,  // 181  0000 0000 0111 11.
		189*3, 206*3,      0,  // 182  0000 0000 0010 11
		187*3, 195*3,      0,  // 183  0000 0000 0010 10
		218*3, 211*3,      0,  // 184  0000 0000 0001 010
		    0,     0, 0x0025,  // 185  0000 0000 0010 011.
		215*3, 216*3,      0,  // 186  0000 0000 0001 000
		    0,     0, 0x0024,  // 187  0000 0000 0010 100.
		210*3, 212*3,      0,  // 188  0000 0000 0001 110
		    0,     0, 0x0022,  // 189  0000 0000 0010 110.
		213*3, 209*3,      0,  // 190  0000 0000 0001 111
		221*3, 222*3,      0,  // 191  0000 0000 0001 100
		219*3, 208*3,      0,  // 192  0000 0000 0001 101
		217*3, 214*3,      0,  // 193  0000 0000 0001 001
		223*3, 220*3,      0,  // 194  0000 0000 0001 011
		    0,     0, 0x0023,  // 195  0000 0000 0010 101.
		    0,     0, 0x010b,  // 196  0000 0000 0011 100.
		    0,     0, 0x0028,  // 197  0000 0000 0010 000.
		    0,     0, 0x010c,  // 198  0000 0000 0011 011.
		    0,     0, 0x010a,  // 199  0000 0000 0011 101.
		    0,     0, 0x0020,  // 200  0000 0000 0011 000.
		    0,     0, 0x0108,  // 201  0000 0000 0011 111.
		    0,     0, 0x0109,  // 202  0000 0000 0011 110.
		    0,     0, 0x0026,  // 203  0000 0000 0010 010.
		    0,     0, 0x010d,  // 204  0000 0000 0011 010.
		    0,     0, 0x010e,  // 205  0000 0000 0011 001.
		    0,     0, 0x0021,  // 206  0000 0000 0010 111.
		    0,     0, 0x0027,  // 207  0000 0000 0010 001.
		    0,     0, 0x1f01,  // 208  0000 0000 0001 1011.
		    0,     0, 0x1b01,  // 209  0000 0000 0001 1111.
		    0,     0, 0x1e01,  // 210  0000 0000 0001 1100.
		    0,     0, 0x1002,  // 211  0000 0000 0001 0101.
		    0,     0, 0x1d01,  // 212  0000 0000 0001 1101.
		    0,     0, 0x1c01,  // 213  0000 0000 0001 1110.
		    0,     0, 0x010f,  // 214  0000 0000 0001 0011.
		    0,     0, 0x0112,  // 215  0000 0000 0001 0000.
		    0,     0, 0x0111,  // 216  0000 0000 0001 0001.
		    0,     0, 0x0110,  // 217  0000 0000 0001 0010.
		    0,     0, 0x0603,  // 218  0000 0000 0001 0100.
		    0,     0, 0x0b02,  // 219  0000 0000 0001 1010.
		    0,     0, 0x0e02,  // 220  0000 0000 0001 0111.
		    0,     0, 0x0d02,  // 221  0000 0000 0001 1000.
		    0,     0, 0x0c02,  // 222  0000 0000 0001 1001.
		    0,     0, 0x0f02   // 223  0000 0000 0001 0110.
	]),
	
	PICTURE_TYPE_I = 1,
	PICTURE_TYPE_P = 2,
	PICTURE_TYPE_B = 3,
	PICTURE_TYPE_D = 4,
	
	START_SEQUENCE = 0xB3,
	START_SLICE_FIRST = 0x01,
	START_SLICE_LAST = 0xAF,
	START_PICTURE = 0x00,
	START_EXTENSION = 0xB5,
	START_USER_DATA = 0xB2,

	// Shaders for accelerated WebGL YCbCrToRGBA conversion
	SHADER_FRAGMENT_YCBCRTORGBA = [
		'precision mediump float;',
		'uniform sampler2D YTexture;',
		'uniform sampler2D CBTexture;',
		'uniform sampler2D CRTexture;',
		'varying vec2 texCoord;',
	
		'void main() {',
			'float y = texture2D(YTexture, texCoord).r;',
			'float cr = texture2D(CBTexture, texCoord).r - 0.5;',
			'float cb = texture2D(CRTexture, texCoord).r - 0.5;',
			
			'gl_FragColor = vec4(',
				'y + 1.4 * cr,',
				'y + -0.343 * cb - 0.711 * cr,',
				'y + 1.765 * cb,',
				'1.0',
			');',
		'}'
	].join('\n'),

	SHADER_FRAGMENT_LOADING = [
		'precision mediump float;',
		'uniform float loaded;',
		'varying vec2 texCoord;',

		'void main() {',
			'float c = ceil(loaded-(1.0-texCoord.y));',
			//'float c = ceil(loaded-(1.0-texCoord.y) +sin((texCoord.x+loaded)*16.0)*0.01);', // Fancy wave anim
			'gl_FragColor = vec4(c,c,c,1);',
		'}'
	].join('\n'),
	
	SHADER_VERTEX_IDENTITY = [
		'attribute vec2 vertex;',
		'varying vec2 texCoord;',
		
		'void main() {',
			'texCoord = vertex;',
			'gl_Position = vec4((vertex * 2.0 - 1.0) * vec2(1, -1), 0.0, 1.0);',
		'}'
	].join('\n');
	
var MACROBLOCK_TYPE_TABLES = [
	null,
	MACROBLOCK_TYPE_I,
	MACROBLOCK_TYPE_P,
	MACROBLOCK_TYPE_B
];



// ----------------------------------------------------------------------------
// Bit Reader 

var BitReader = function(arrayBuffer) {
	this.bytes = new Uint8Array(arrayBuffer);
	this.length = this.bytes.length;
	this.writePos = this.bytes.length;
	this.index = 0;
};

BitReader.NOT_FOUND = -1;

BitReader.prototype.findNextMPEGStartCode = function() {	
	for( var i = (this.index+7 >> 3); i < this.writePos; i++ ) {
		if(
			this.bytes[i] == 0x00 &&
			this.bytes[i+1] == 0x00 &&
			this.bytes[i+2] == 0x01
		) {
			this.index = (i+4) << 3;
			return this.bytes[i+3];
		}
	}
	this.index = (this.writePos << 3);
	return BitReader.NOT_FOUND;
};

BitReader.prototype.nextBytesAreStartCode = function() {
	var i = (this.index+7 >> 3);
	return (
		i >= this.writePos || (
			this.bytes[i] == 0x00 && 
			this.bytes[i+1] == 0x00 &&
			this.bytes[i+2] == 0x01
		)
	);
};

BitReader.prototype.nextBits = function(count) {
	var 
		byteOffset = this.index >> 3,
		room = (8 - this.index % 8);

	if( room >= count ) {
		return (this.bytes[byteOffset] >> (room - count)) & (0xff >> (8-count));
	}

	var 
		leftover = (this.index + count) % 8, // Leftover bits in last byte
		end = (this.index + count -1) >> 3,
		value = this.bytes[byteOffset] & (0xff >> (8-room)); // Fill out first byte

	for( byteOffset++; byteOffset < end; byteOffset++ ) {
		value <<= 8; // Shift and
		value |= this.bytes[byteOffset]; // Put next byte
	}

	if (leftover > 0) {
		value <<= leftover; // Make room for remaining bits
		value |= (this.bytes[byteOffset] >> (8 - leftover));
	}
	else {
		value <<= 8;
		value |= this.bytes[byteOffset];
	}
	
	return value;
};

BitReader.prototype.getBits = function(count) {
	var value = this.nextBits(count);
	this.index += count;
	return value;
};

BitReader.prototype.advance = function(count) {
	return (this.index += count);
};

BitReader.prototype.rewind = function(count) {
	return (this.index -= count);
};
	
})(window);

